#!/usr/bin/env python3
"""Thumbnail A/B/C cho logarithm từ bản người dùng render — chèn nhãn thẻ giấy như cảnh mở đầu video.
    python3 projects/en/logarithm/thumbnail/variants.py [v1|v2]   # mặc định v2 → v2-72-B.png (8% + 9 YEARS), v2-72-C.png (8%)
B: "8%" trên chồng xu thấp + "9 YEARS" trên mũi tên (thời gian) → câu đố "8% thì 9 năm — 72 dính gì?".
C: chỉ "8%". Không chữ nào trùng title ("One Number Tells You When Your Money Doubles").
Màu DNA: thẻ giấy kem, chữ navy #22303C (DNA.md §2–3), Archivo 900.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

D = Path(__file__).resolve().parent
ROOT = D.parents[2]
if sys.argv[1:2] in (['-h'], ['--help']): print(__doc__); sys.exit(0)
NAVY, PAPER = (34, 48, 60), (251, 246, 234)


def font(px, wdth=100):
    f = ImageFont.truetype(str(ROOT / 'assets/fonts/Archivo[wdth,wght].ttf'), px)
    f.set_variation_by_axes([900, wdth]); return f


def tag(im, text, cx, cy, px, rot, pad=(30, 16), wdth=100):
    f = font(px, wdth)
    l, t, r, b = f.getbbox(text)
    w, h = r - l + 2 * pad[0], b - t + 2 * pad[1]
    S = 4                                                       # vẽ to rồi thu nhỏ: viền mịn
    card = Image.new('RGBA', ((w + 60) * S, (h + 60) * S), (0, 0, 0, 0))
    g = ImageDraw.Draw(card)
    box = (30 * S, 30 * S, (30 + w) * S, (30 + h) * S)
    g.rounded_rectangle(box, 14 * S, fill=PAPER + (255,), outline=(205, 190, 160, 255), width=2 * S)
    fs = font(px * S, wdth)
    g.text((30 * S + pad[0] * S - l * S, 30 * S + pad[1] * S - t * S), text, font=fs, fill=NAVY + (255,))
    card = card.resize((w + 60, h + 60), Image.LANCZOS).rotate(rot, resample=Image.BICUBIC, expand=True)
    sh = Image.new('RGBA', card.size, (0, 0, 0, 0)); sh.putalpha(card.getchannel('A').point(lambda a: int(a * 0.35)))
    sh = sh.filter(ImageFilter.GaussianBlur(10))
    x, y = int(cx - card.width / 2), int(cy - card.height / 2)
    im.alpha_composite(sh, (x + 6, y + 12)); im.alpha_composite(card, (x, y))


# chỗ đặt nhãn theo từng ảnh nền (toạ độ ảnh gốc 1672×940): (cx, cy, px, xoay[, pad])
POS = {
    'v1': {'8%': (318, 318, 104, 4), '9y': (492, 168, 68, -5, (24, 12))},
    'v2': {'8%': (300, 400, 100, 4), '9y': (590, 140, 66, -6, (22, 12))},   # 8% trên chồng thấp, 9 YEARS trên mũi tên
}
ver = sys.argv[1] if len(sys.argv) > 1 else 'v2'
base = Image.open(D / f'{ver}-72.png').convert('RGBA')
for name, labels in {'B': ['8%', '9y'], 'C': ['8%']}.items():
    im = base.copy()
    for k in labels:
        cx, cy, px, rot, *pad = POS[ver][k]
        tag(im, '8%' if k == '8%' else '9 YEARS', cx, cy, px, rot, **({'pad': pad[0]} if pad else {}))
    out = D / f'{ver}-72-{name}.png'; im.convert('RGB').save(out)
    print('→', out.relative_to(ROOT))
