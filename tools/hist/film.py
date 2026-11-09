#!/usr/bin/env python3
"""Cắt phim tư liệu PD đã tải thành dãy khung cho trang canvas (tất định, không dùng thẻ <video>).

    python3 tools/hist/film.py hist/<tập> <khoá> <phim nguồn> <giây bắt đầu> <dài s> [--fps 12] [--w 800] [--speed 0.85]
    # → projects/hist/<tập>/assets/film/<khoá>/NN.jpg + cập nhật assets/film/index.json {khoá: số khung}; in độ lệch lớn nhất giữa hai khung

Trang nạp index.json vào IM.film[khoá][i], cảnh lấy khung theo floor(u * fps) (mẫu projects/hist/berlin/episode.html + scenes/life.js).
Lệch > 20 ở khung liền kề = có thể dính cắt cảnh gốc. Trailer dùng 24 fps; chèn dài dùng 12 fps cho nhẹ. Quy trình: channels/hist/EDITING.md "Phim tư liệu".
"""
import argparse, json, shutil, subprocess
from pathlib import Path
import numpy as np
from PIL import Image
ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('p'); ap.add_argument('key'); ap.add_argument('src'); ap.add_argument('t', type=float); ap.add_argument('dur', type=float); ap.add_argument('--fps', type=int, default=12); ap.add_argument('--w', type=int, default=800); ap.add_argument('--speed', type=float, default=1, help='<1: phim chậm để một cú máy đủ dài cho câu; <dài s> tính theo giờ phim gốc')
a = ap.parse_args()
base = ROOT / 'projects' / a.p / 'assets' / 'film'; out = base / a.key; shutil.rmtree(out, ignore_errors=True); out.mkdir(parents=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(a.t), '-t', str(a.dur), '-i', a.src, '-vf', f'setpts=PTS/{a.speed},fps={a.fps},scale={a.w}:-2', '-q:v', '4', str(out / '%02d.jpg')], check=True, stdin=subprocess.DEVNULL)
fs = sorted(out.glob('*.jpg')); A = [np.array(Image.open(f).convert('L').resize((80, 60)), dtype=int) for f in fs]
jump = max((float(np.abs(A[i] - A[i - 1]).mean()) for i in range(1, len(A))), default=0)
ix = {k.name: len(list(k.glob('*.jpg'))) for k in sorted(base.iterdir()) if k.is_dir()}; (base / 'index.json').write_text(json.dumps(ix))
print(f'✓ {out.relative_to(ROOT)} — {len(fs)} khung, lệch lớn nhất {jump:.1f}' + ('  ⚠ có thể dính cắt cảnh' if jump > 20 else ''))
