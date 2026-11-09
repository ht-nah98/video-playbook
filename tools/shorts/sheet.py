#!/usr/bin/env python3
"""Ảnh soi cho Shorts (docs/lesson/SHORTS.md).

    python3 tools/shorts/sheet.py src <p> <ra.jpg> 145.9-157.8 870-887 …   # khung GỐC (4 / dải giây), lưới x/y mỗi 240 px
    python3 tools/shorts/sheet.py out <p> <ra.jpg> [tên…]                   # 9 khung mỗi Short đã cắt + khung cuối (CTA)

`src`: đọc toạ độ trên lưới để đặt "crop" trong shorts.json (số xanh = x, số cam = y của khung 1920×1080).
`out`: mỗi hàng một Short; cột cuối = 1.2 s trước hết — soi thẻ hồi / cảnh sau lấn vào.
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import io, json, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from channel import final_mp4, out_dir  # noqa: E402
from common import ROOT, duration  # noqa: E402



def frame(f, t, w, sseof=False):
    seek = ['-sseof', f'-{t:.2f}'] if sseof else ['-ss', f'{t:.2f}']
    png = subprocess.run(['ffmpeg', '-v', 'error', *seek, '-i', str(f), '-frames:v', '1', '-vf', f'scale={w}:-1',
                          '-f', 'image2pipe', '-vcodec', 'png', '-'], capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGB')


def src(p, out, ranges):
    f, cells = final_mp4(p), []
    for r in ranges:
        a, b = map(float, r.split('-'))
        for k in range(4):
            t = a + (b - a) * (k + 0.5) / 4
            im = frame(f, t, 640); d = ImageDraw.Draw(im)
            for x in range(240, 1920, 240): d.line([(x / 3, 0), (x / 3, 360)], fill=(0, 160, 255)); d.text((x / 3 + 2, 2), str(x), fill=(0, 120, 255))
            for y in range(240, 1080, 240): d.line([(0, y / 3), (640, y / 3)], fill=(255, 120, 0)); d.text((2, y / 3 + 2), str(y), fill=(255, 90, 0))
            d.text((560, 340), f'{t:.1f}s', fill='red'); cells.append(im)
    sheet = Image.new('RGB', (640 * 4, 360 * len(ranges)), 'white')
    for i, c in enumerate(cells): sheet.paste(c, ((i % 4) * 640, (i // 4) * 360))
    sheet.save(out, quality=80)


def shorts(p, out, names):
    names = names or [s['name'] for s in json.loads((ROOT / f'projects/{p}/shorts.json').read_text(encoding='utf-8'))['shorts']]
    cells = []
    for n in names:
        f = out_dir(p) / 'shorts' / f'{n}.mp4'; d = duration(f)
        cells += [frame(f, 0.3 + (d - 2.0) * k / 8, 240) for k in range(9)] + [frame(f, 1.2, 240, sseof=True)]
    sheet = Image.new('RGB', (240 * 10, 427 * len(names)))
    for i, c in enumerate(cells): sheet.paste(c, ((i % 10) * 240, (i // 10) * 427))
    sheet.save(out, quality=82)


if __name__ == '__main__':
    mode, p, out, *rest = sys.argv[1:]
    (src if mode == 'src' else shorts)(p, out, rest)
