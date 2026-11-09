#!/usr/bin/env python3
"""Cắt ĐẦU từ ảnh tư liệu để ghép lên thân vẽ: tách nền (rembg) + dò mặt (Haar) → bỏ vai/cổ áo, cằm bo tròn,
chuẩn hoá cỡ MẶT (mọi nhân vật cùng bề rộng mặt), ghi mốc cằm để thân vẽ nối đúng cổ.

    python3 tools/hist/headcut.py <ảnh> <out.png> --lm cx,eyeY,chinY,jaw [--unit 200] [--border 10] [--debug dbg.jpg]

--lm: 4 mốc ĐO TAY trên ảnh gốc (px): tâm mặt x, đường mắt y, cằm y, nửa bề rộng hàm. Dò mặt tự động (Haar) đã thử:
khung lệch cỡ giữa các ảnh (Sophie chặt, FF rộng) → mặt to nhỏ không đều, cằm dính cổ áo — nên đo tay (mỗi nhân vật một lần).
Chuẩn hoá: √(mắt→cằm × nửa hàm) = --unit px ở MỌI nhân vật (bản đầu chỉ theo mắt→cằm: FF mặt dài ra nhỏ hơn Sophie — người dùng 10-27).
Ra <out.png> + <out>.json {chin:[x,y], unit, jaw, eyeY, w, h}.
"""
import argparse, json
import numpy as np, cv2
from PIL import Image, ImageFilter
from rembg import remove, new_session
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--lm', required=True); ap.add_argument('--unit', type=int, default=170)
ap.add_argument('--border', type=int, default=10); ap.add_argument('--debug')
a = ap.parse_args()

im = Image.open(a.src).convert('RGB'); arr = np.array(im)
cx, eyeY, chinY, jaw = map(float, a.lm.split(','))

al = np.array(remove(im, session=new_session('u2net')))[..., 3] > 128
yy, xx = np.mgrid[:al.shape[0], :al.shape[1]]
rx, ry = jaw, chinY - eyeY
E = lambda cy, ex, ey: ((xx - cx) / ex) ** 2 + ((yy - cy) / ey) ** 2 <= 1
row = np.flatnonzero(al[int(eyeY - 0.5 * ry)]); hair = max(abs(row[0] - cx), abs(row[-1] - cx)) if len(row) else rx
rc = max(1.25 * rx, min(hair + 2, 2.2 * rx))             # vòm tóc đo theo tóc THẬT của người này (Princip tóc bù xù → rộng hơn)
keep = (E(eyeY, rx, ry)                                  # hàm: bầu dục mắt → cằm
        | E(eyeY - 0.5 * ry, rc, 1.2 * ry)               # vòm sọ + tóc: vuốt dần xuống tới miệng (không bậc "cây nấm" ở đường mắt)
        | (yy < eyeY - 1.4 * ry))                        # mũ / vương miện / búi tóc cao: giữ trọn
al = ndimage.binary_fill_holes(al & keep)
lab, n = ndimage.label(al); al = lab == (np.bincount(lab.ravel())[1:].argmax() + 1)

ys, xs = np.where(al); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
al, rgb = al[y0:y1, x0:x1], arr[y0:y1, x0:x1]
rgb = np.repeat(np.array(Image.fromarray(rgb).convert('L'))[..., None], 3, 2)
s = a.unit / np.sqrt(ry * jaw)                          # cỡ theo DIỆN TÍCH mặt (cao × rộng) — mặt dài / mặt bầu cân nhau
size = (round(al.shape[1] * s), round(al.shape[0] * s))
rgb = np.array(Image.fromarray(rgb).resize(size, Image.LANCZOS))
al = np.array(Image.fromarray((al * 255).astype(np.uint8)).resize(size, Image.LANCZOS)) > 127
b = a.border; P = b + 2
al = np.pad(al, P); rgb = np.pad(rgb, ((P, P), (P, P), (0, 0)))
ky, kx = np.ogrid[-b:b + 1, -b:b + 1]
ring = ndimage.binary_dilation(al, structure=(kx * kx + ky * ky) <= b * b)
out = np.zeros((*al.shape, 4), np.uint8); out[ring] = 255; out[al, :3] = rgb[al]; out[al, 3] = 255
img = Image.fromarray(out); img.putalpha(img.split()[3].filter(ImageFilter.GaussianBlur(0.8))); img.save(a.out)

T = lambda x, y: [round((x - x0) * s + P), round((y - y0) * s + P)]
meta = {'chin': T(cx, chinY), 'unit': a.unit, 'jaw': round(jaw * s), 'eyeY': T(cx, eyeY)[1], 'w': img.width, 'h': img.height}
json.dump(meta, open(a.out.rsplit('.', 1)[0] + '.json', 'w')); print(a.out, meta)
if a.debug:
    d = arr.copy()
    cv2.ellipse(d, (int(cx), int(eyeY)), (int(rx), int(ry)), 0, 0, 180, (0, 200, 0), 3); cv2.line(d, (0, int(eyeY)), (d.shape[1], int(eyeY)), (0, 200, 0), 2)
    Image.fromarray(d).save(a.debug)
