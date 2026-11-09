#!/usr/bin/env python3
"""Render một trang thành video câm bằng N tiến trình shoot.js song song, rồi ghép và kiểm số khung.

    python3 tools/render/par.py --page projects/hist/<p>/episode.html --out out/hist/<p>/silent.mp4 [--parts 4] -- --raw --nvenc
    python3 tools/render/par.py --page projects/hist/<p>/short.html --out out/hist/<p>/silent.mp4 -- --w 1080 --h 1920 --gpu --raw
    python3 tools/render/par.py --page … --out out/hist/<p>/fix-a3.mp4 --t0 120 --t1 180 -- --raw   # chỉ một đoạn

Sau `--` là cờ chuyển nguyên cho shoot.js (`--w/--h` khung dọc, `--gpu` WebGL card thật, `--raw` đọc pixel thô thay PNG,
`--nvenc` mã hoá bằng card, `--fps`, `--crf`). Phần cắt đúng ranh giới khung (n/fps) nên ghép `-c copy` không hụt / trùng khung.
Đo trên RTX 4070 Ti (2026-11-03, LESSONS §260): Short 3D dọc, 4 phần + --raw --nvenc ≈ 123 khung/s; PNG một luồng 4,2 khung/s.
Phần + nhật ký ở <thư mục out>/parts/ (giữ lại khi lỗi để xem).
"""
import argparse, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SHOOT = str(ROOT / 'engine/render/shoot.js')


def split(dur, fps, parts):
    """[(from, to)] theo giây, mỗi mốc là bội số 1/fps: n0 = round(from*fps) khớp đúng n1 của phần trước."""
    total = round(dur * fps)
    cuts = [round(total * i / parts) for i in range(parts + 1)]
    return [(a / fps, b / fps) for a, b in zip(cuts, cuts[1:]) if b > a]


def frames(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries',
                        'stream=nb_read_packets', '-of', 'csv=p=0', str(f)], capture_output=True, text=True)
    return int(r.stdout.strip() or 0)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--page', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--parts', type=int, default=4); ap.add_argument('--fps', type=int, default=60)
    ap.add_argument('--t0', type=float, default=0, help='chỉ render đoạn [t0, t1) — sửa đoạn yếu, không render lại cả bài')
    ap.add_argument('--t1', type=float, default=None)
    ap.add_argument('rest', nargs=argparse.REMAINDER)
    a = ap.parse_args()
    extra = [x for x in a.rest if x != '--']
    view = [x for i, x in enumerate(extra) if x in ('--gpu',) or x in ('--w', '--h') or (i and extra[i - 1] in ('--w', '--h'))]
    r = subprocess.run(['node', SHOOT, 'dur', '--page', a.page, *view], capture_output=True, text=True, cwd=ROOT, stdin=subprocess.DEVNULL)
    line = [l for l in r.stdout.splitlines() if l.startswith('DUR ')]
    if not line: sys.exit(f'không đọc được DUR của {a.page}:\n{r.stdout}\n{r.stderr}')
    dur = float(line[0].split()[1])
    out = (ROOT / a.out).resolve(); pd = out.parent / 'parts'; pd.mkdir(parents=True, exist_ok=True)
    t1 = min(dur, a.t1) if a.t1 is not None else dur
    segs = [(a.t0 + f, a.t0 + t) for f, t in split(t1 - a.t0, a.fps, a.parts)]
    want = round(t1 * a.fps) - round(a.t0 * a.fps)
    print(f'{a.page}: {a.t0:.3f}–{t1:.3f} s × {a.fps} = {want} khung, {len(segs)} phần')
    procs = []
    for i, (f, t) in enumerate(segs):
        log = open(pd / f'par{i}.log', 'w')
        cmd = ['node', SHOOT, 'video', '--page', a.page, '--fps', str(a.fps), '--silent', '--from', repr(f), '--to', repr(t),
               '--dur', repr(dur), '--out', str(pd / f'par{i}.mp4'), *extra]
        procs.append((subprocess.Popen(cmd, cwd=ROOT, stdout=log, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL), log))
    bad = [i for i, (p, log) in enumerate(procs) if p.wait() != 0]
    for _, log in procs: log.close()
    if bad: sys.exit(f'LỖI phần {bad} — xem {pd}/par<i>.log')
    # ghép CHỈ hình: phần còn tiếng câm AAC thì concat đẩy hình trễ 21 ms (độ trễ mồi AAC, LESSONS §260) — tiếng thêm ở mix.py
    for i in range(len(segs)):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(pd / f'par{i}.mp4'), '-map', '0:v', '-c', 'copy', str(pd / f'par{i}.v.mp4')], check=True)
    # độ dài CHÍNH XÁC từng phần (số khung / fps): concat tự đọc độ dài làm tròn ms → mốc giờ trôi 0,33 ms mỗi mối nối
    (pd / 'par.txt').write_text(''.join(f"file 'par{i}.v.mp4'\nduration {(round(t * a.fps) - round(f * a.fps)) / a.fps!r}\n" for i, (f, t) in enumerate(segs)))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(pd / 'par.txt'), '-c', 'copy',
                    '-movflags', '+faststart', str(out)], check=True)
    n = frames(out)
    if n != want: sys.exit(f'LỖI số khung {n} ≠ {want} ({out})')
    st = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=start_time', '-of', 'csv=p=0', str(out)],
                        capture_output=True, text=True).stdout.strip()
    if abs(float(st or 0)) > 1e-3: sys.exit(f'LỖI hình bắt đầu ở {st} s, không phải 0 ({out}) — tiếng sẽ lệch')
    print(f'✓ {out} — {n} khung')


if __name__ == '__main__':
    main()
