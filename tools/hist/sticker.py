#!/usr/bin/env python3
"""Cắt nhân vật từ tấm thiết kế nền giấy phẳng → PNG nền trong + viền trắng kiểu sticker (study 15 §2).

  python3 tools/hist/sticker.py <tấm.png> <boxes.json> <thư mục ra> [--border 10] [--sheet kiểm.jpg]

boxes.json: {"tên": [x0, y0, x1, y1], …} (toạ độ ảnh gốc). Nền = vùng gần màu góc ảnh NỐI với mép ô cắt (mắt / răng trắng
nằm trong nét viền nên giữ lại); chỉ giữ mảng lớn nhất (bỏ vương miện / tia doodle quanh nhân vật).
"""
import argparse, json, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument('sheet'); ap.add_argument('boxes'); ap.add_argument('out')
ap.add_argument('--border', type=int, default=10); ap.add_argument('--tol', type=float, default=16); ap.add_argument('--sheet-out')
a = ap.parse_args()
src = np.asarray(Image.open(a.sheet).convert('RGB')).astype(np.float32)
bg = np.median(np.concatenate([src[:8, :8].reshape(-1, 3), src[-8:, -8:].reshape(-1, 3)]), axis=0)
out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True); made = []
for name, (x0, y0, x1, y1) in json.load(open(a.boxes)).items():
    c = src[y0:y1, x0:x1]; near = np.linalg.norm(c - bg, axis=2) < a.tol
    lab, _ = ndimage.label(near); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(edge))
    lab2, n = ndimage.label(fg)
    if n: fg = lab2 == (np.argmax(ndimage.sum(fg, lab2, range(1, n + 1))) + 1)
    fg = ndimage.binary_fill_holes(fg)
    pad = a.border + 2; H, W = fg.shape
    big = np.zeros((H + 2 * pad, W + 2 * pad), bool); big[pad:-pad, pad:-pad] = fg
    yy, xx = np.ogrid[-a.border:a.border + 1, -a.border:a.border + 1]
    ring = ndimage.binary_dilation(big, structure=(xx * xx + yy * yy) <= a.border ** 2)
    rgba = np.zeros((H + 2 * pad, W + 2 * pad, 4), np.uint8); rgba[ring] = [255, 255, 255, 255]
    rgba[pad:-pad, pad:-pad][fg, :3] = c[fg].astype(np.uint8); rgba[pad:-pad, pad:-pad][fg, 3] = 255
    ys, xs = np.nonzero(rgba[..., 3]); im = Image.fromarray(rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    im.save(out / f'{name}.png'); made.append((name, im)); print(name, im.size)
if a.sheet_out:
    cw = max(m.size[0] for _, m in made) + 20; ch = max(m.size[1] for _, m in made) + 20; C = 6
    sh = Image.new('RGB', (cw * C, ch * ((len(made) + C - 1) // C)), (120, 160, 120))
    for i, (_, m) in enumerate(made): sh.paste(m, ((i % C) * cw + 10, (i // C) * ch + 10), m)
    sh.save(a.sheet_out)
