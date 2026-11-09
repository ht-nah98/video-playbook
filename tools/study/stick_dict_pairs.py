#!/usr/bin/env python3
"""Ghép từng dáng trong engine/stick-dict.js với khung mẫu cùng mốc (ref) → out/_lab/stick-dict/pairs.png.

  node engine/render/shoot.js stills --page tools/lab/stick-dict.html --t 0.1 --outdir out/_lab/stick-dict
  python3 tools/study/stick_dict_pairs.py            # cần video mẫu ở chỗ ghi trong VIDEOS (docs/stick/REFERENCE.md)

Ô của ta cắt từ bảng tools/lab/stick-dict.html (9 cột, thứ tự khai báo); ô mẫu cắt hộp bao nhân vật (mặt nạ màu).
"""
import re, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd

ROOT = Path(__file__).resolve().parents[2]
VIDEOS = {  # video mẫu: đường dẫn + màu nhân vật (tools/study/stick_ref.py COLORS)
    'coding': (Path.home() / 'Downloads/Animation vs. Coding.mp4', 'yellow'),
    'math': (Path.home() / 'Downloads/becker-ref/Animation vs. Math.mp4', 'orange'),
}
sys.path.insert(0, str(ROOT / 'tools/study'))
from stick_ref import COLORS, probe, grab  # noqa: E402

def main():
    src = (ROOT / 'engine/stick-dict.js').read_text()
    ents = re.findall(r"^\s+(\w+):\s+E\('([^']+)', '(\w+)@([\d.]+)'", src, re.M)
    sheet = Image.open(ROOT / 'out/_lab/stick-dict/t_0.10.png').convert('RGB')
    cols, n = 9, len(ents); rows = -(-n // cols); cw, ch = 1920 / cols, 1080 / rows
    S = 260; out = Image.new('RGB', (S * 2 * 6, (S + 24) * -(-n // 6)), (24, 27, 32)); d = ImageDraw.Draw(out)
    for i, (name, group, vid, t) in enumerate(ents):
        cx, cy = (i % cols) * cw, (i // cols) * ch
        ours = sheet.crop((int(cx), int(cy), int(cx + cw), int(cy + ch * 0.8))); ours.thumbnail((S, S))
        path, col = VIDEOS[vid]; ref = Image.new('RGB', (S, S))
        if path.exists():
            W, H, _ = probe(str(path)); f = grab(str(path), float(t), W, H)
            if f is not None:
                m = COLORS[col](f.astype(int)); lab, k = nd.label(m)
                if k:
                    big = np.argmax(nd.sum(m, lab, range(1, k + 1))) + 1; ys, xs = np.nonzero(lab == big)
                    p = 20; im = Image.fromarray(f).crop((max(0, xs.min() - p), max(0, ys.min() - p), min(W, xs.max() + p), min(H, ys.max() + p)))
                    im.thumbnail((S, S)); ref.paste(im, ((S - im.width) // 2, (S - im.height) // 2))
        x, y = (i % 6) * S * 2, (i // 6) * (S + 24)
        out.paste(ref, (x, y + 24)); bg = Image.new('RGB', (S, S), (244, 241, 232)); bg.paste(ours, ((S - ours.width) // 2, (S - ours.height) // 2)); out.paste(bg, (x + S, y + 24))
        d.text((x + 6, y + 5), f'{name}  ·  {vid}@{t}', fill=(240, 240, 240))
    o = ROOT / 'out/_lab/stick-dict/pairs.png'; out.save(o); print(o)

if __name__ == '__main__':
    main()
