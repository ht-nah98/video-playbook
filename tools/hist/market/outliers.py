#!/usr/bin/env python3
"""Điểm vượt trội từng video dài của đối thủ (từ pull.py) → channels/hist/market/<ngày>/outliers.csv.

    python3 tools/hist/market/outliers.py [ngày, mặc định mới nhất] [--top 40]

score = views / trung vị views các video dài KHÁC cùng kênh có tuổi trong [tuổi/2, tuổi×2] (≥ 5 video; thiếu → trung vị cả
kênh, cột base='channel'). Video dài = > 180 s và title không có #shorts. Tuổi < 7 ngày bỏ (còn sớm, market/METHOD.md §5).
"""
import argparse, csv, datetime, json, re, statistics
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
RAW = ROOT / 'out' / 'hist' / 'market' / 'raw'


def secs(iso):
    m = re.fullmatch(r'P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', iso)
    d, h, mi, s = (int(x or 0) for x in m.groups()) if m else (0, 0, 0, 0)
    return d * 86400 + h * 3600 + mi * 60 + s


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('day', nargs='?'); ap.add_argument('--top', type=int, default=40)
    a = ap.parse_args()
    day = a.day or sorted(p.name for p in RAW.iterdir())[-1]
    chans = json.loads((RAW / day / 'channels.json').read_text())
    snap = json.loads((RAW / day / 'videos.json').read_text())
    now = datetime.datetime.fromisoformat(snap['snapshot'])
    rows = []
    for vid, v in snap['videos'].items():
        dur = secs(v['duration'])
        if dur <= 180 or '#short' in v['title'].lower(): continue
        age = (now - datetime.datetime.fromisoformat(v['published'].replace('Z', '+00:00'))).total_seconds() / 86400
        rows.append({**v, 'id': vid, 'dur_min': round(dur / 60, 1), 'age_d': round(age)})
    by = {}
    for r in rows: by.setdefault(r['channel'], []).append(r)
    for cid, rs in by.items():
        allmed = statistics.median(x['views'] for x in rs)
        for r in rs:
            peers = [x['views'] for x in rs if x is not r and r['age_d'] / 2 <= x['age_d'] <= r['age_d'] * 2]
            base, kind = (statistics.median(peers), 'age') if len(peers) >= 5 else (allmed, 'channel')
            r.update(score=round(r['views'] / max(base, 1), 2), base=kind, median=round(base),
                     handle=chans[cid]['handle'], group=chans[cid]['group'], subs=chans[cid]['subs'])
    rows = [r for r in rows if r['age_d'] >= 7]
    rows.sort(key=lambda r: -r['score'])
    out = ROOT / 'channels' / 'hist' / 'market' / day; out.mkdir(parents=True, exist_ok=True)
    cols = ['id', 'handle', 'group', 'subs', 'title', 'published', 'age_d', 'dur_min', 'views', 'median', 'score', 'base',
            'likes', 'comments', 'thumb']
    with open(out / 'outliers.csv', 'w', newline='') as f:
        w = csv.DictWriter(f, cols, extrasaction='ignore'); w.writeheader(); w.writerows(rows)
    print(f'✓ {out / "outliers.csv"} — {len(rows)} video dài')
    for r in rows[:a.top]:
        print(f"{r['score']:6.1f}× {r['views']:>10,} {r['age_d']:>4}d {r['dur_min']:>5}m {r['handle'][:18]:18} {r['title'][:80]}")


if __name__ == '__main__':
    main()
