#!/usr/bin/env python3
"""Ghép mọi PNG/JPG trong thư mục thành một tờ xem có nhãn thời gian (để NHÌN nhanh nhiều khung).
  python3 tools/qa/sheet.py <dir> <out.jpg> [cột=3] [rộng ô=640]"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import glob, sys
from PIL import Image, ImageDraw

def sheet(d, out, cols=3, w=640):
    stem = lambda f: f.rsplit('_', 1)[-1].rsplit('.', 1)[0]
    fs = sorted(glob.glob(d + '/*.png') + glob.glob(d + '/*.jpg'), key=lambda f: float(stem(f)) if stem(f).replace('.', '').isdigit() else 0)
    if not fs:
        sys.exit(f'sheet: không có ảnh .png/.jpg trong {d}')  # trước đây im lặng ra tờ đen ~11 KB (LESSONS §106)
    h = w * 9 // 16; rows = (len(fs) + cols - 1) // cols
    s = Image.new('RGB', (cols * w, max(1, rows) * h), 'black'); dr = ImageDraw.Draw(s)
    for i, f in enumerate(fs):
        x, y = (i % cols) * w, (i // cols) * h
        s.paste(Image.open(f).convert('RGB').resize((w, h)), (x, y))
        dr.rectangle([x, y, x + 90, y + 22], fill='black'); dr.text((x + 4, y + 4), stem(f), fill='yellow')
    s.save(out, quality=82)

if __name__ == '__main__':
    a = sys.argv
    sheet(a[1], a[2], int(a[3]) if len(a) > 3 else 3, int(a[4]) if len(a) > 4 else 640)
