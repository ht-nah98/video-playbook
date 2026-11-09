#!/usr/bin/env python3
"""Nạp ảnh chụp mới nhất của mỗi kênh (analytics/raw/<ch>/<ngày>/) → analytics/yt.sqlite (dựng lại từ đầu mỗi lần).

  python3 tools/yt/db.py                     # dựng lại sqlite
  python3 tools/yt/db.py --sql "select …"    # truy vấn nhanh

Bảng: video (ch, video, published, title, duration_s, kind, project, lang, views_total, privacy, publish_at) · ch_<báo cáo> (ch, snapshot, cột API)
· v_<báo cáo> (ch, video, snapshot, cột API) — tên báo cáo theo tools/yt/pull.py (daily, source, retention, detail_YT_SEARCH…).
"""
import argparse, json, pathlib, re, sqlite3, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import video_map

ROOT = pathlib.Path(__file__).resolve().parents[2]
A = ROOT / 'analytics'
DB = A / 'yt.sqlite'


def seconds(iso):
    m = re.match(r'P(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', iso or '')
    return sum(int(g or 0) * k for g, k in zip(m.groups(), (3600, 60, 1))) if m else 0


def slug(t):
    t = t.lower().replace('%', 'pct').replace('(', ' ').replace(')', ' ')
    return re.sub(r'[^0-9a-z]+', '_', t).strip('_') or 'col'


def cell(x):
    """Ô CSV Studio → số (int / float / 'h:mm:ss' → giây) hoặc chuỗi."""
    x = (x or '').strip()
    if re.fullmatch(r'-?\d+', x):
        return int(x)
    if re.fullmatch(r'-?\d*\.\d+', x):
        return float(x)
    m = re.fullmatch(r'(\d+):(\d\d):(\d\d)', x)
    if m:
        return int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3])
    return x or None


def load_studio(con, chd, ch):
    """Mọi export CSV của Studio (analytics/raw/<ch>/studio/export-*/csv/<chiều>/{Table data,Chart data,Totals}.csv)
    → bảng studio_<chiều>_<table|chart|totals> (ch, export, cột đã slug). Export mới hơn nạp sau; giữ hết, truy vấn
    lọc theo export. Dòng 'Total' của Table data giữ nguyên (cột đầu = 'Total')."""
    import csv
    n = 0
    for ex in sorted((chd / 'studio').glob('export-*')):
        for d in sorted((ex / 'csv').glob('*')):
            for fname, kind in (('Table data.csv', 'table'), ('Chart data.csv', 'chart'), ('Totals.csv', 'totals')):
                f = d / fname
                if not f.exists():
                    continue
                rows = list(csv.reader(f.open(encoding='utf-8-sig')))
                if not rows:
                    continue
                cols, seen = [], set()
                for h in rows[0]:
                    c = slug(h)
                    while c in seen:
                        c += '_2'
                    seen.add(c); cols.append(c)
                t = f'studio_{slug(d.name)}_{kind}'
                con.execute(f'create table if not exists "{t}" (ch, export, {", ".join(f"[{c}]" for c in cols)})')
                have = [r[1] for r in con.execute(f'pragma table_info("{t}")')]
                for c in cols:
                    if c not in have:
                        con.execute(f'alter table "{t}" add column [{c}]')
                con.executemany(f'insert into "{t}" (ch, export, {", ".join(f"[{c}]" for c in cols)}) values ({",".join("?" * (len(cols) + 2))})',
                                [[ch, ex.name] + [cell(x) for x in r] for r in rows[1:] if r])
                n += 1
    return n


def put(con, table, fixed, rep):
    if 'error' in rep or not rep.get('rows'):
        return
    cols = list(fixed) + rep['cols']
    con.execute(f'create table if not exists "{table}" ({", ".join(f"[{c}]" for c in cols)})')
    con.executemany(f'insert into "{table}" values ({",".join("?" * len(cols))})',
                    [list(fixed.values()) + r for r in rep['rows']])


def build():
    DB.unlink(missing_ok=True)
    con = sqlite3.connect(DB)
    con.execute('create table video (ch, video, published, title, duration_s, kind, project, lang, views_total, privacy, publish_at)')
    for chd in sorted((A / 'raw').glob('*')):
        snaps = sorted(d for d in chd.iterdir() if d.is_dir() and re.fullmatch(r'\d{4}-\d\d-\d\d', d.name))
        if not snaps:
            continue
        s = snaps[-1]; ch = chd.name; pmap = video_map(ch, shorts=True)
        for v in json.loads((s / 'videos.json').read_text()):
            dur = seconds(v['contentDetails']['duration'])
            con.execute('insert into video values (?,?,?,?,?,?,?,?,?,?,?)', (
                ch, v['id'], v['snippet']['publishedAt'][:10], v['snippet']['title'], dur,
                'short' if dur <= 180 and '#short' in (v['snippet']['title'] + v['snippet'].get('description', '')).lower()
                or dur <= 60 else 'long',
                pmap.get(v['id']), v['snippet'].get('defaultAudioLanguage'),
                int(v['statistics'].get('viewCount', 0)), v['status']['privacyStatus'], v['status'].get('publishAt')))
        for f in s.glob('ch_*.json'):
            put(con, f.stem, {'ch': ch, 'snapshot': s.name}, json.loads(f.read_text()))
        for f in (s / 'video').glob('*.json'):
            for name, rep in json.loads(f.read_text()).items():
                put(con, f'v_{name}', {'ch': ch, 'video': f.stem, 'snapshot': s.name}, rep)
        ns = load_studio(con, chd, ch)
        print(f'{ch}: {s.name}' + (f' · studio {ns} file' if ns else ''))
    con.commit()
    return con


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--sql')
    a = ap.parse_args()
    if a.sql:
        con = sqlite3.connect(DB)
        cur = con.execute(a.sql)
        print(' | '.join(d[0] for d in cur.description))
        for r in cur:
            print(' | '.join(str(x) for x in r))
        return
    con = build()
    for (t,) in con.execute("select name from sqlite_master where type='table' order by name"):
        print(f'  {t}: {con.execute(f"select count(*) from [{t}]").fetchone()[0]}')


if __name__ == '__main__':
    main()
