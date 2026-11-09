"""Ảnh thử thumbnail — MỘT lệnh thay cho code PIL viết tay mỗi lần (docs/lesson/PACKAGING.md §2).

  python3 tools/thumb/check.py <mới.png> [<cũ.png> …] -o out/<p>/youtube/thumb-tests/check.jpg

Mỗi ảnh một cột: đủ khung · thử 50% TV (che nửa dưới) · 250 px · 168 px · góc phải dưới (vùng nhãn thời lượng).
Ghi --jpg <đường> để xuất bản đăng 1280×720 q95 của ảnh ĐẦU TIÊN.

Thumbnail KHÔNG giao một mình — luôn kèm title đi cặp (LESSONS §297, CRAFT §11):
  python3 tools/thumb/check.py --pair "SAME KEYS? 0.5 -0.988" "Why Your Calculator Is Right Both Times | Trigonometry Explained" [--pair …]
→ đo độ dài title (≤ 100, lời hứa trong 50 ký tự đầu) + từ khoá chung giữa chữ trên thumbnail và title; mã 1 nếu trùng / quá dài.
"""
import argparse
import re
from pathlib import Path

from PIL import Image, ImageDraw

W, H = 640, 360


def column(im, name):
    a = im.resize((W, H), Image.LANCZOS)
    tv = a.copy()
    ImageDraw.Draw(tv).rectangle([0, H // 2, W, H], fill='#111')
    corner = im.resize((1280, 720), Image.LANCZOS).crop((896, 468, 1280, 720))  # 30% × 35%
    col = Image.new('RGB', (W, 20 + H * 2 + 30 + 141 + 20 + 252), '#222')
    d = ImageDraw.Draw(col)
    d.text((4, 4), name, fill='yellow')
    y = 20
    col.paste(a, (0, y)); y += H + 6
    col.paste(tv, (0, y)); d.text((4, y + H // 2 + 4), 'TV 50%', fill='#888'); y += H + 6
    col.paste(im.resize((250, 141), Image.LANCZOS), (0, y))
    col.paste(im.resize((168, 94), Image.LANCZOS), (260, y)); y += 141 + 6
    d.text((4, y), 'bottom-right 30x35%', fill='#888'); y += 14
    col.paste(corner, (0, y))
    return col


STOP = {'a', 'an', 'the', 'is', 'it', 'of', 'to', 'in', 'on', 'and', 'or', 'you', 'your', 'why', 'how', 'what', 'its', 'for', 'at', 'be'}


def pairs(items):
    bad = 0
    for words, title in items:
        tw = {w for w in re.findall(r'[a-z0-9]+', words.lower()) if w not in STOP}
        ti = {w for w in re.findall(r'[a-z0-9]+', title.lower()) if w not in STOP}
        common = sorted(tw & ti)
        ok = not common and len(title) <= 100
        bad += not ok
        print(f"{'✓' if ok else '✗'} {len(title):3d} ký tự | 50 đầu: {title[:50]!r} | chung: {', '.join(common) or 'không'}")
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('images', nargs='*')
    ap.add_argument('-o', '--out')
    ap.add_argument('--jpg')
    ap.add_argument('--pair', nargs=2, action='append', metavar=('CHỮ_THUMB', 'TITLE'))
    a = ap.parse_args()
    if a.pair:
        bad = pairs(a.pair)
        if not a.images:
            raise SystemExit(1 if bad else 0)
    if not a.images or not a.out:
        ap.error('cần ảnh + -o (hoặc chỉ --pair)')
    cols = []
    for p in a.images:
        im = Image.open(p).convert('RGB')
        print(f'{Path(p).name}: {im.size[0]}×{im.size[1]}')
        cols.append(column(im, Path(p).stem))
    sheet = Image.new('RGB', (len(cols) * (W + 10), cols[0].height), '#222')
    for i, c in enumerate(cols):
        sheet.paste(c, (i * (W + 10), 0))
    Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    sheet.save(a.out, quality=88)
    print('→', a.out)
    if a.jpg:
        Image.open(a.images[0]).convert('RGB').resize((1280, 720), Image.LANCZOS).save(a.jpg, quality=95)
        print('→', a.jpg, f'{Path(a.jpg).stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
