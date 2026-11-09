"""Tách nền mascot v2 (assets/character-v2/src → assets/character-v2/cut).

Model: isnet-anime (rembg). Đã so với u2net trên pose-wave/pose-jump: u2net để
lại quầng trắng dày quanh tay/áo; isnet-anime sạch mép và xoá luôn vạch chuyển
động vẽ sẵn quanh nhân vật.

Sau khi tách, khử nhiễm màu nền ở pixel bán trong suốt:
    C = (I - (1 - a) * BG) / a
để viền sáng của nền trắng/xám không thành quầng trên nền tối.

- pose-*, head-turnaround: cắt sát bbox + đệm, giữ nguyên tỉ lệ.
- visemes-3x3: chia 9 ô BẰNG NHAU và KHÔNG cắt bbox từng ô, để thay miệng
  không bị giật (mọi ô cùng khung, cùng tâm mặt).

- Ảnh nguồn đặt tên tiếng Việt (bộ 2026-10-01) → tên pose ASCII theo bảng ALIAS.
- "Bảng chín biểu cảm miệng anime" = bảng miệng thứ hai (lưới đều hơn: lệch 0–3px
  thay vì 12px) → viseme-b-1…9 + mouth-b-1…9 (mảng miệng MOUTH_B đo bằng mắt).

Chạy:  tools/cutout/.venv/bin/python tools/cutout/cutout.py --all | --only tên1,tên2   (không tham số: chỉ in cách dùng)

Dùng: python3 tools/cutout/cutout.py --all | --only tên1,tên2    (không tham số: in dòng này, không ghi gì)
"""
import sys as _sys
if _sys.argv[1:2] in (['-h'], ['--help']) or len(_sys.argv) == 1: print(__doc__.strip()); raise SystemExit(0)
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from rembg import remove, new_session

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "assets/character-v2/src"
OUT = ROOT / "assets/character-v2/cut"
PAD = 12

# Ảnh nguồn tên tiếng Việt → tên pose (bộ khung trung 2026-10-01: cắt ở giữa đùi)
ALIAS = {
    "Chàng trai anime với sổ tay trắng": "pose-notebook",
    "Chàng trai áo blouse ánh viền xanh cam": "pose-offer",        # chìa tay phải, cười nhếch
    "Chàng trai áo blouse ánh viền xanh vàng": "pose-stand",
    "Chàng trai áo blouse cầm que chỉ dẫn": "pose-pointer",
    "Chàng trai áo blouse trắng lạnh lùng": "pose-pockets",
    "Chàng trai áo blouse trắng lạnh lùng (1)": "pose-pockets2",
    "Chàng trai tóc rối chìa tay mời gọi": "pose-invite",          # chìa tay trái
    "Chàng trai tóc rối và tách trà nóng": "pose-tea",
    # bộ 2026-10-01 (lượt 2): tư thế cho bridge → finale (Kế hoạch 5)
    "Chàng trai anime trầm tư trong áo blouse trắng": "pose-ponder",   # tay chống cằm
    "Chàng trai áo blouse chỉ lên trời": "pose-sky",                   # tay phải chỉ lên, miệng mở
    "Chàng trai áo blouse chỉ xuống": "pose-down",                     # tay phải chỉ xuống đất
    "Chàng trai áo blouse giơ tay dừng lại": "pose-halt",              # lòng bàn tay chặn, miệng mở
    "Thầy giáo tóc rối cầm phấn": "pose-chalk",                        # cầm phấn, tay kia ngửa
    "Bảng chín biểu cảm miệng anime": "visemes-b",
    # bộ 2026-10-01 (lượt 3): chọn cho add-it-up
    "Chàng trai anime và mặt dây chuyền +C": "pose-plusc",            # cầm mặt dây chuyền +C
    "Chàng trai anime giơ ba ngón tay": "pose-three",                # giơ ba ngón, tay kia đút túi
    "Chàng trai anime giơ nắm đấm chiến thắng": "pose-fist",         # nắm đấm lên trời, miệng hét
    "Chàng trai anime tóc rối giơ dấu hòa bình": "pose-peace-back",  # quay lưng, giơ chữ V
    # bộ 2026-10-05: chọn cho zero-div
    "Chàng trai áo blouse trắng kính tròn (1)": "pose-idle",         # đứng thẳng, tay đút túi, mặt trung tính
    "Chàng trai nhún vai với đôi tay trống rỗng": "pose-shrug",       # nhún vai, hai tay ngửa trống
    "Nam chính áo blouse tạo dấu OK": "pose-ok",                      # dấu OK (ngón cái + trỏ thành vòng tròn)
    "Nhà Khoa Học Chỉ Hướng Hờ Hững": "pose-twoways",                # một tay chỉ lên, một tay chỉ xuống (khung giữa đùi)
    # bộ 2026-10-06: chọn cho fifty-percent (khung giữa đùi)
    "Nhà khoa học trẻ với nụ cười tinh quái": "pose-coin-cover",      # úp tay lên mu bàn tay (đồng xu giấu dưới), cười bí ẩn
    "Tung đồng xu giữa ánh sáng tương phản": "pose-coin-flip",        # ngón cái vừa búng, đồng xu bay trên đầu, mắt dõi theo
    "Trộm Coin Kín Đáo Trong Áo Blouse": "pose-coin-peek",            # cầm đồng xu sát ngực, cúi nhìn lén
    "Nhà khoa học trẻ nhìn điện thoại đầy nghi ngờ": "pose-phone",    # giơ điện thoại, liếc nghi ngờ
    # bộ 2026-10-07: chọn cho pi
    "Nhà Khoa Học Anime Ngầu Lòi": "pose-spin",                       # TOÀN THÂN: ngón trỏ chỉ lên (vẽ vòng quay bằng code), tay kia chống hông
    "Chàng trai áo blouse vẽ bằng compa": "pose-compass",             # khung giữa đùi: giơ compa gỗ, nhìn xuống đầu kim
    "Cậu học sinh với máy tính đáng ngờ": "pose-calculator",          # khung giữa đùi: giơ máy tính cầm tay (màn trống), liếc nghi ngờ, giọt mồ hôi
    # bộ 2026-10-09: chọn cho solid-geometry
    "Nhà khoa học và khối đa diện xanh lam": "pose-icosa",            # khung giữa đùi: tay phải giơ khối 20 mặt xanh lam, liếc nhìn nó, tay kia đút túi
    "Chàng trai tóc rối trên ghế gỗ": "pose-stool",                   # TOÀN THÂN ngồi ghế đẩu gỗ BA CHÂN, cười nhếch — ghế là đạo cụ (mở bài / lần sau)
}

# Mảng nền sót mà isnet-anime giữ đục (toạ độ ẢNH NGUỒN x0,y0,x1,y1): trong hộp, pixel gần màu nền (≤ 14) → alpha 0.
# Không xoá theo màu cả ảnh được: áo blouse trắng cùng màu nền.
ERASE = {
    "pose-stool": [(0, 0, 1024, 170), (815, 1075, 880, 1200)],   # sợi nền sau đỉnh tóc; khe nền giữa quần và vạt áo
    "pose-icosa": [(0, 0, 1024, 170)],                             # sợi nền sau đỉnh tóc
}

def erase(rgba, rgb, bg, boxes):
    for x0, y0, x1, y1 in boxes:
        near = np.abs(rgb[y0:y1, x0:x1].astype(float) - bg).max(-1) <= 14
        rgba[y0:y1, x0:x1, 3][near] = 0
    return rgba

def border_bg(rgb):
    """Màu nền = trung vị viền ảnh."""
    b = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    return np.median(b, axis=0)

def cut(session, rgb):
    """rgb: HxWx3 uint8 → HxWx4 uint8, đã khử nhiễm nền."""
    bg = border_bg(rgb)
    rgba = np.asarray(remove(Image.fromarray(rgb), session=session)).astype(np.float32)
    a = rgba[..., 3:4] / 255.0
    src = rgb.astype(np.float32)
    safe = np.maximum(a, 1e-3)
    dec = (src - (1 - a) * bg) / safe
    col = np.where(a > 0.98, src, np.clip(dec, 0, 255))
    col = np.where(a < 0.02, 0, col)
    return np.dstack([col, rgba[..., 3]]).astype(np.uint8), bg

def trim(rgba):
    ys, xs = np.nonzero(rgba[..., 3] > 8)
    y0, y1 = max(ys.min() - PAD, 0), min(ys.max() + PAD + 1, rgba.shape[0])
    x0, x1 = max(xs.min() - PAD, 0), min(xs.max() + PAD + 1, rgba.shape[1])
    return rgba[y0:y1, x0:x1], [int(x0), int(y0), int(x1), int(y1)]

def register(ref, img, y0=60, y1=300):
    """Độ lệch (dy, dx) nguyên pixel để img khớp ref, đo bằng tương quan pha
    trên dải mắt/kính (y0..y1) — vùng giống nhau ở mọi khẩu hình."""
    def lum(x):
        a = x[..., 3:4] / 255.0
        return (x[..., :3].astype(np.float32).mean(-1, keepdims=True) * a)[y0:y1, :, 0]
    A, B = np.fft.fft2(lum(ref)), np.fft.fft2(lum(img))
    R = A * np.conj(B); R /= np.abs(R) + 1e-9
    c = np.fft.ifft2(R).real
    dy, dx = np.unravel_index(np.argmax(c), c.shape)
    if dy > c.shape[0] // 2: dy -= c.shape[0]
    if dx > c.shape[1] // 2: dx -= c.shape[1]
    return int(dy), int(dx)

def shift(img, dy, dx):
    out = np.zeros_like(img)
    h, w = img.shape[:2]
    ys, yd = (slice(0, h - dy), slice(dy, h)) if dy >= 0 else (slice(-dy, h), slice(0, h + dy))
    xs, xd = (slice(0, w - dx), slice(dx, w)) if dx >= 0 else (slice(-dx, w), slice(0, w + dx))
    out[yd, xd] = img[ys, xs]
    return out

# Mảng miệng (toạ độ trong ô 418px đã căn theo viseme-1). Đo bằng mắt trên
# 9 ô: miệng há lớn nhất (ô 5) chiếm x 208–249, y 276–308; cằm ở y ≈ 320–338.
MOUTH = dict(cx=229, cy=292, rx=36, ry=26, feather=6)
# Bảng miệng thứ hai: đo trên ô 5 (há to nhất) và ô 9 — miệng x 200–245, y 260–300; cằm ở y ≈ 320.
# (Thử đo tự động bằng độ biến thiên giữa 9 ô: không được — AI vẽ lại cả tóc, viền áo.)
MOUTH_B = dict(cx=222, cy=281, rx=32, ry=24, feather=6)

def mouth_patches(m=None, prefix="viseme", out="mouth"):
    """Cả ô viseme vẽ lại mọi nét 1–2px khác nhau → thay cả ô làm viền rung.
    Chỉ giữ ô 1 làm mặt nền, xuất riêng mảng miệng có mép mềm."""
    from PIL import ImageFilter, ImageDraw
    m = m or MOUTH
    x0, y0 = m["cx"] - m["rx"] - m["feather"], m["cy"] - m["ry"] - m["feather"]
    x1, y1 = m["cx"] + m["rx"] + m["feather"], m["cy"] + m["ry"] + m["feather"]
    mask = Image.new("L", (x1 - x0, y1 - y0), 0)
    ImageDraw.Draw(mask).ellipse([m["feather"], m["feather"],
                                  x1 - x0 - m["feather"], y1 - y0 - m["feather"]], fill=255)
    mask = np.asarray(mask.filter(ImageFilter.GaussianBlur(m["feather"] / 2))).astype(np.float32) / 255
    for i in range(1, 10):
        v = np.asarray(Image.open(OUT / f"{prefix}-{i}.png")).astype(np.float32)
        patch = v[y0:y1, x0:x1].copy()
        patch[..., 3] *= mask
        Image.fromarray(patch.astype(np.uint8)).save(OUT / f"{out}-{i}.png")
    return {"box": [x0, y0, x1, y1], "base": f"{prefix}-1.png", **m}

def grid_cells(s, rgb, prefix, report):
    """Lưới 3×3: chia đều, căn mọi ô theo ô 1 (tương quan pha trên dải mắt)."""
    h, w = rgb.shape[0] // 3, rgb.shape[1] // 3
    ref, cells = None, []
    for i in range(9):
        r, c = divmod(i, 3)
        rgba, bg = cut(s, rgb[r*h:(r+1)*h, c*w:(c+1)*w])
        dy, dx = (0, 0) if ref is None else register(ref, rgba)
        rgba = shift(rgba, dy, dx)
        if ref is None:
            ref = rgba
        cells.append(rgba)
        Image.fromarray(rgba).save(OUT / f"{prefix}-{i+1}.png")
        report[f"{prefix}-{i+1}"] = {"size": [w, h], "bg": bg.round().tolist(), "shift": [dy, dx],
                                     "alpha_cover": round(float((rgba[..., 3] > 8).mean()), 3)}
        print(f"{prefix}-{i+1} shift dy={dy} dx={dx}", flush=True)
    return cells

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    only = None
    if "--only" in sys.argv:
        only = set(sys.argv[sys.argv.index("--only") + 1].split(","))
    s = new_session("isnet-anime")
    path = OUT / "cut.json"
    report = json.loads(path.read_text()) if path.exists() else {}
    for p in sorted(SRC.glob("*.png")):
        name = ALIAS.get(p.stem, p.stem)
        if name.startswith("keyart") or (only and name not in only):
            continue  # keyart: ảnh bìa tham chiếu, không phải nhân vật để cắt
        rgb = np.asarray(Image.open(p).convert("RGB"))
        if name == "visemes-3x3":
            # Lưới 3x3 không đều: mặt trượt ~6px mỗi cột. Căn mọi ô theo ô 1.
            grid_cells(s, rgb, "viseme", report)
            report["mouth"] = mouth_patches()
            continue
        if name == "visemes-b":
            grid_cells(s, rgb, "viseme-b", report)
            report["mouth-b"] = mouth_patches(MOUTH_B, prefix="viseme-b", out="mouth-b")
            continue
        rgba, bg = cut(s, rgb)
        rgba = erase(rgba, rgb, bg, ERASE.get(name, []))
        rgba, box = trim(rgba)
        Image.fromarray(rgba).save(OUT / f"{name}.png")
        report[name] = {"src_size": [rgb.shape[1], rgb.shape[0]], "bbox": box,
                        "size": [rgba.shape[1], rgba.shape[0]], "bg": bg.round().tolist(),
                        "alpha_cover": round(float((rgba[..., 3] > 8).mean()), 3)}
        print(name, report[name], flush=True)
    path.write_text(json.dumps(report, indent=1))

if __name__ == "__main__":
    main()
