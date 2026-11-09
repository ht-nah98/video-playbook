#!/usr/bin/env python3
"""Ghép ảnh mỗi 5 s (frames/f0001.jpg …) thành bảng 6×5 có nhãn giờ: <frames_dir> <prefix> → prefix0.jpg …"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import glob, sys
from PIL import Image, ImageDraw

src, prefix = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(f'{src}/*.jpg'))
if not fs:
    sys.exit(f'không có ảnh trong {src}')
W, H, STEP = 320, 180, 5
for k in range(0, len(fs), 30):
    sh = Image.new('RGB', (W * 6, H * 5), 'black'); dr = ImageDraw.Draw(sh)
    for i, p in enumerate(fs[k:k + 30]):
        x, y = (i % 6) * W, (i // 6) * H
        sh.paste(Image.open(p).resize((W, H)), (x, y))
        t = (k + i) * STEP
        dr.rectangle([x, y, x + 60, y + 16], fill='black'); dr.text((x + 3, y + 2), f'{t // 60}:{t % 60:02d}', fill='yellow')
    sh.save(f'{prefix}{k // 30}.jpg', quality=80)
