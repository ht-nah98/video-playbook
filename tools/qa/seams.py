#!/usr/bin/env python3
"""Kiểm chỗ nối cảnh: chụp cặp khung (khung cuối cảnh trước, khung đầu cảnh sau) quanh mỗi mốc, in PSNR,
ghép tờ xem. PSNR thấp KHÔNG tự là lỗi (loé, cú cắt có chủ ý) — NHÌN tờ xem: tìm vật/chữ có ở khung trước mà
mất hẳn ở khung sau, nền/camera nhảy.  Mốc lấy đúng biên khung: cảnh vào ở t0 thì khung đầu là ceil(t0·fps).

  python3 tools/qa/seams.py <project> <t1,t2,…> [--fps 60]     → out/_lab/seams-<p>/ + sheet.jpg
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import math, subprocess, sys, glob, os
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__)); from sheet import sheet
p, ts = sys.argv[1], [float(x) for x in sys.argv[2].split(',')]
fps = float(sys.argv[sys.argv.index('--fps') + 1]) if '--fps' in sys.argv else 60.0
pairs = [((math.ceil(b * fps - 1e-6) - 1) / fps, math.ceil(b * fps - 1e-6) / fps) for b in ts]
out = f'out/_lab/seams-{p}'
times = ','.join(f'{x:.4f}' for a in pairs for x in a)
root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
subprocess.run(['bash', '-c', 'source tools/qa/_lib.sh && shoot "$1" "$2" "$3"', '_', p, times, out], cwd=root, check=True)
for b, (a, c) in zip(ts, pairs):
    A = np.asarray(Image.open(f'{root}/{out}/t_{a:.2f}.png').convert('L'), float)
    C = np.asarray(Image.open(f'{root}/{out}/t_{c:.2f}.png').convert('L'), float)
    mse = ((A - C) ** 2).mean()
    print(f'{b:8.2f}  psnr {10 * math.log10(255 ** 2 / max(mse, 1e-9)):5.1f} dB')
sheet(f'{root}/{out}', f'{root}/{out}/sheet.jpg', cols=4, w=480)
print(f'tờ xem: {out}/sheet.jpg')
