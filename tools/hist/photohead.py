#!/usr/bin/env python3
"""Đầu ảnh tư liệu kiểu meme (study 15 §3): cắt elip quanh mặt + viền trắng sticker → PNG nền trong, cao 420 px.

  python3 tools/hist/photohead.py <ảnh.jpg> <cx> <cy> <rx> <ry> <ra.png>      # toạ độ ảnh gốc
"""
import sys
from PIL import Image, ImageDraw, ImageOps
src, cx, cy, rx, ry, out = sys.argv[1], *map(float, sys.argv[2:6]), sys.argv[6]
im = ImageOps.grayscale(Image.open(src)).convert('RGB')
b = max(rx, ry) * 0.07; box = [cx - rx - b, cy - ry - b, cx + rx + b, cy + ry + b]
c = im.crop([round(v) for v in box]); w, h = c.size
m = Image.new('L', (w, h)); ImageDraw.Draw(m).ellipse([b, b, w - b, h - b], fill=255)
ring = Image.new('L', (w, h)); ImageDraw.Draw(ring).ellipse([0, 0, w - 1, h - 1], fill=255)
o = Image.new('RGBA', (w, h), (0, 0, 0, 0)); o.paste((255, 255, 255, 255), mask=ring); o.paste(c, mask=m)
o = o.resize((round(w * 420 / h), 420), Image.LANCZOS); o.save(out); print(out, o.size)
