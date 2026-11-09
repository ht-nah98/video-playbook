#!/usr/bin/env python3
"""Cắt dáng người que từ một video mẫu → bảng tra có mốc giờ (hệ reference người que, docs/stick/).

  python3 tools/study/stick_ref.py <video> --slug coding [--color yellow] [--every 3] [--t0 0 --t1 0]
  python3 tools/study/stick_ref.py <video> --slug coding --at 61.5,63,100     # cắt đúng các mốc (khung gốc, không thu)

Tìm nhân vật bằng mặt nạ màu (mặc định vàng Becker), cắt hộp bao + lề, xếp ô 300×300 kèm mốc giờ.
Ra out/_lab/stick-ref/<slug>/sheet-NN.png (48 ô / bảng) + index.json (mốc → hộp bao). Không ghi gì vào repo:
video mẫu là của người khác — repo chỉ giữ mốc giờ + mô tả (docs/stick/REFERENCE.md), ảnh dựng lại bằng lệnh này.
"""
import argparse, json, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
COLORS = {  # (điều kiện trên mảng RGB int) — thêm màu khi gặp mẫu mới
    'yellow': lambda a: (a[..., 0] > 200) & (a[..., 1] > 150) & (a[..., 1] < 225) & (a[..., 2] < 90),
    'orange': lambda a: (a[..., 0] > 200) & (a[..., 1] > 70) & (a[..., 1] < 175) & (a[..., 2] < 80),
    'dark':   lambda a: a.sum(-1) < 150,
    'light':  lambda a: a.sum(-1) > 690,
}

def probe(src):
    out = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration',
                          '-of', 'json', src], capture_output=True, text=True).stdout
    j = json.loads(out); s = j['streams'][0]
    return s['width'], s['height'], float(j['format']['duration'])

def grab(src, t, W, H):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', src, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(H, W, 3) if len(raw) >= W * H * 3 else None

def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('video'); ap.add_argument('--slug', required=True)
    ap.add_argument('--color', default='yellow', choices=COLORS); ap.add_argument('--every', type=float, default=3.0)
    ap.add_argument('--t0', type=float, default=0); ap.add_argument('--t1', type=float, default=0)
    ap.add_argument('--at', default='', help='mốc giờ, phẩy ngăn: cắt khung gốc từng mốc')
    ap.add_argument('--min', type=int, default=1200, help='số điểm ảnh tối thiểu của nhân vật')
    a = ap.parse_args()
    W, H, dur = probe(a.video)
    out = ROOT / 'out' / '_lab' / 'stick-ref' / a.slug; out.mkdir(parents=True, exist_ok=True)
    mask = COLORS[a.color]
    if a.at:
        for t in [float(x) for x in a.at.split(',')]:
            f = grab(a.video, t, W, H)
            if f is not None: Image.fromarray(f).save(out / f'f_{t:07.2f}.png')
        print(out); return
    t1 = a.t1 or dur - 0.5
    cells, index = [], {}
    for t in np.arange(a.t0, t1, a.every):
        f = grab(a.video, float(t), W, H)
        if f is None: continue
        m = mask(f.astype(int))
        n = int(m.sum())
        if n < a.min or n > 0.08 * W * H: continue
        ys, xs = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
        if y1 - y0 > 0.8 * H or x1 - x0 > 0.8 * W or y1 - y0 < 40: continue      # cả màn một màu / quá nhỏ
        p = 14; box = (max(0, x0 - p), max(0, y0 - p), min(W, x1 + p), min(H, y1 + p))
        im = Image.fromarray(f).crop(box); im.thumbnail((300, 300))
        c = Image.new('RGB', (300, 300)); c.paste(im, ((300 - im.width) // 2, (300 - im.height) // 2))
        ImageDraw.Draw(c).text((4, 4), f'{t:.1f}', fill=(255, 80, 80))
        cells.append(c); index[f'{t:.1f}'] = [int(v) for v in box]
    for k in range(0, len(cells), 48):
        part = cells[k:k + 48]; sheet = Image.new('RGB', (300 * 8, 300 * ((len(part) + 7) // 8)))
        for i, c in enumerate(part): sheet.paste(c, ((i % 8) * 300, (i // 8) * 300))
        sheet.save(out / f'sheet-{k // 48 + 1:02d}.png')
    (out / 'index.json').write_text(json.dumps({'video': Path(a.video).name, 'every': a.every, 'crops': index}, indent=1))
    print(f'{len(cells)} dáng → {out}')

if __name__ == '__main__':
    sys.exit(main())
