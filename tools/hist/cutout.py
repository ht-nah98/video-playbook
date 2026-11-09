#!/usr/bin/env python3
"""Cắt người khỏi ảnh tư liệu THEO DÁNG (kiểu Thanh Pahm: đầu + mũ + vai, viền trắng sticker) bằng rembg.

    python3 tools/hist/cutout.py <ảnh> <out.png> [--cut 0.62] [--border 12] [--h 700] [--color]

--cut: giữ phần trên tới tỉ lệ này của chiều cao người (0.62 ≈ tới ngực); 1 = cả người.
Mặc định khử màu (ảnh 1914 vốn đen trắng, ảnh tô màu lệch tông nhau); --color giữ màu.
"""
import sys, argparse
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--cut', type=float, default=0.62); ap.add_argument('--border', type=int, default=12)
ap.add_argument('--h', type=int, default=700); ap.add_argument('--color', action='store_true')
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
cut = remove(im, session=new_session('u2net'))                     # RGBA
al = np.array(cut)[..., 3] > 128
lab, n = ndimage.label(al)
if n: al = lab == (np.bincount(lab.ravel())[1:].argmax() + 1)      # giữ khối lớn nhất (bỏ mảnh vụn nền)
al = ndimage.binary_fill_holes(al)
ys = np.where(al.any(1))[0]; top, bot = ys[0], ys[-1]
al[int(top + (bot - top) * a.cut):] = False                        # cắt ngang ngực
ys, xs = np.where(al); al = al[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
rgb = np.array(im)[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
if not a.color: rgb = np.repeat(np.array(Image.fromarray(rgb).convert('L'))[..., None], 3, 2)

s = a.h / al.shape[0]; size = (max(1, round(al.shape[1] * s)), a.h)
rgb = np.array(Image.fromarray(rgb).resize(size, Image.LANCZOS))
al = np.array(Image.fromarray((al * 255).astype(np.uint8)).resize(size, Image.LANCZOS)) > 127
b = a.border; P = b + 2
al = np.pad(al, P); rgb = np.pad(rgb, ((P, P), (P, P), (0, 0)))
yy, xx = np.ogrid[-b:b + 1, -b:b + 1]
ring = ndimage.binary_dilation(al, structure=(xx * xx + yy * yy) <= b * b)
out = np.zeros((*al.shape, 4), np.uint8)
out[ring] = (255, 255, 255, 255); out[al, :3] = rgb[al]; out[al, 3] = 255
img = Image.fromarray(out)
a4 = img.split()[3].filter(ImageFilter.GaussianBlur(0.8)); img.putalpha(a4)   # mép mềm 1 px (lúc cắt, không phải lúc render)
img.save(a.out); print(a.out, img.size)
