#!/usr/bin/env python3
"""Ảnh chuẩn cả bài cho VIDEO BÀI HỌC — lưới an toàn khi refactor engine/kit: code đổi mà hình không được đổi.

    python3 tools/qa/lesson_golden.py record <p> [--step 2]   # → projects/<p>/golden.json (commit cùng thay đổi CÓ CHỦ Ý)
    python3 tools/qa/lesson_golden.py check  <p>              # chạy lại, so băm; khác → in mốc, thoát 1

Mỗi trang trong build.json `parts` (p1/p2, math-30k: part1a/part1b/part2) chạy `shoot.js check --hash <step>`:
chạy khô MỌI khung (bắt lỗi JS / must — LESSONS §70), băm canvas mỗi <step> giây, chụp lại vài mốc theo thứ tự ngược
(tất định). Các trang chạy song song. Bản MV dùng tools/qa/golden.sh (ảnh PNG theo song.js).
"""
import argparse, json, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools'))
from channel import qa_dir  # noqa: E402


def pages(p):
    cfg = json.loads((ROOT / 'projects' / p / 'build.json').read_text(encoding='utf-8'))
    return [pt['page'] for pt in cfg['parts'] if not pt.get('intro')]


def shoot(p, page, step):
    out = qa_dir(p) / 'golden' / f'{page}.json'                   # qa của bài nằm trong out/<kênh>/<p>/qa/
    out.parent.mkdir(parents=True, exist_ok=True); out.unlink(missing_ok=True)
    r = subprocess.run(['node', 'engine/render/shoot.js', 'check', '--page', f'projects/{p}/{page}.html', '--hash', str(step),
                        '--out', str(out)], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    log = out.with_suffix('.log'); log.write_text(r.stdout + r.stderr, encoding='utf-8')
    if r.returncode != 0 or not out.exists():
        sys.stderr.write(f'✗ {p}/{page}: shoot.js check thất bại (mã {r.returncode}) — {log.relative_to(ROOT)}\n'
                         + ''.join(l + '\n' for l in (r.stdout + r.stderr).splitlines() if 'LỖI' in l or 'TẤT ĐỊNH' in l))
        return None
    return json.loads(out.read_text(encoding='utf-8'))


def run_all(p, step):
    pg = pages(p)
    with ThreadPoolExecutor(len(pg)) as ex: res = list(ex.map(lambda x: shoot(p, x, step), pg))
    if any(r is None for r in res): sys.exit(1)
    return {x: {'dur': r['dur'], 'fps': r['fps'], 'frames_checked': r['frames_checked'], 'hashes': r['hashes']} for x, r in zip(pg, res)}


def diff(gold, now):
    """[(page, t, giải thích)] — mốc khác băm, thiếu trang, khác thời lượng."""
    bad = []
    for page, g in gold['parts'].items():
        n = now.get(page)
        if n is None: bad.append((page, '-', 'trang không còn trong build.json')); continue
        if abs(n['dur'] - g['dur']) > 1e-6: bad.append((page, '-', f"thời lượng {g['dur']} → {n['dur']}"))
        for t, h in g['hashes'].items():
            if n['hashes'].get(t) != h: bad.append((page, t, f"{h} → {n['hashes'].get(t)}"))
    bad += [(page, '-', 'trang mới, chưa có golden') for page in now if page not in gold['parts']]
    return bad


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('cmd', choices=['record', 'check']); ap.add_argument('project')
    ap.add_argument('--step', type=float, default=2.0)
    o = ap.parse_args()
    f = ROOT / 'projects' / o.project / 'golden.json'
    if o.cmd == 'record':
        now = run_all(o.project, o.step)
        f.write_text(json.dumps({'step': o.step, 'parts': now}, indent=1) + '\n', encoding='utf-8')
        print(f"golden {o.project}: " + ', '.join(f"{k} {v['frames_checked']} khung chạy khô / {len(v['hashes'])} băm" for k, v in now.items())
              + f' → {f.relative_to(ROOT)}')
        return
    if not f.exists(): sys.exit(f'chưa có {f.relative_to(ROOT)} — chạy record trước')
    gold = json.loads(f.read_text(encoding='utf-8'))
    bad = diff(gold, run_all(o.project, gold['step']))
    n = sum(len(v['hashes']) for v in gold['parts'].values())
    if not bad: print(f'GOLDEN SAME {o.project} ({n} mốc)'); return
    print(f'GOLDEN DIFF {o.project}: {len(bad)}/{n}')
    for page, t, why in bad: print(f'  {page} t={t}: {why}')
    sys.exit(1)


if __name__ == '__main__':
    main()
