# exp-log — Kế hoạch 4: nhân vật v2.1 (hát nhép theo giọng, bộ miệng B, 8 tư thế khung trung) + P18 động cơ + đoạn giấy P19–P20 (112.80 → 155.70)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kế hoạch này có ba phần.
- Nâng nhân vật bằng bộ ảnh người dùng gửi 2026-10-01:
  - Hát nhép theo đường bao giọng thật, dùng bảng miệng B có lưới đều hơn.
  - Thêm 8 tư thế khung trung.
  - Sửa lỗi tất định do trạng thái giải mã ảnh.
- Dựng P18 (động cơ × → +) và đoạn đảo nền giấy P19–P20.
- Render lại trọn 0 → 155.70, để các cảnh hát cũ hưởng lip-sync mới.

**Architecture:**
- `tools/vox_env.py` sinh `data/vox.json`, chứa đường bao giọng 60fps lượng tử 0..255. `engine/visemes.js` có `makeEnv` + `mouthAt(t, words, env)`: nguyên âm quyết định hình miệng, mức giọng quyết định độ mở. Khi không có env thì y hệt v1.
- `engine/face.js` chọn được bộ miệng (`set: 'b'`).
- `engine/mascot.js` chép mọi ảnh sang canvas CPU khi nạp (`toCanvas`), để việc lấy mẫu lưới ký hiệu không còn phụ thuộc thứ tự khung.
- `tools/cutout/cutout.py` xử lý ảnh nguồn tên tiếng Việt qua bảng `ALIAS`, và tách bảng miệng thứ hai (`visemes-b`).
- Thế giới mới:
  - `projects/mv/exp-log/gear.js`: động cơ, chính là cửa két của sảnh ngân hàng.
  - `projects/mv/exp-log/paper.js`: trang sổ kẻ ô, mực đậm, phép gập/lật/xé tờ giấy theo gương với phép phản xạ thật.

**Tech Stack:** như Kế hoạch 3, cộng Python 3 (numpy, soundfile) cho `vox_env.py` và venv `tools/cutout/.venv` (rembg isnet-anime).

**Spec:**
- `projects/mv/exp-log/TREATMENT.md` §P18–P20, § Nhân vật — luật bằng số.
- `docs/character/CHARACTER-V2.md`.
- `docs/mv/UPGRADE-NOTES.md` §0 và §8: nhân vật đi quanh chữ; crop khung trung ở góc.
- LESSONS §13: trên giấy thì nhân vật có viền mực + bóng; màu sáng của nền tối bị chìm trên giấy.
- Đo stem 2026-10-01:
  - 112.9–116.4: gần như chỉ còn giọng.
  - **116.42: trống + bass + synth cùng vào lại = cú nổ thứ hai.**
  - 118.87: bass nhấn.
  - 125.66: lặng → giấy.
  - Percussion 128.28 · 130.42 · 132.51 · 134.66 · 136.80 · 138.94 là các nét bút.
- Người dùng 2026-10-01: "cung cấp thêm các hình ảnh liên quan đến mascot và facemount để lipsync chuẩn hơn… nâng cấp nhân vật cũng như các effect".

**Bằng chứng đã đo ở bản nháp:**
- Bảng miệng B: các ô lệch 0–3px, bảng cũ lệch 0/7/12px. Sai số dải mắt sau khi căn ~5.4, bảng cũ ~6.3.
- Hát nhép A/B ở P11a 47.0–48.6s: bản mới khép miệng ở chỗ ngắt hơi, há to ở chỗ ngân; bản cũ đứng im nhiều khung.
- Tất định: khung 35.50 chụp lẻ = chụp sau 34.5 (trước đây khác).
- 58/58 test qua; tất định xuôi/ngược trùng 17/17 mốc.
- Chỗ nối 140.09 và 155.70 ≥ 25 dB.
- Ở 112.8, P17 vỡ toàn bộ thế giới rồi P18 tụ từ ký hiệu.

**Code trong kế hoạch này đã chạy thật ở bản sao repo. Chép đúng nguyên văn.**

## Global Constraints

- Kế thừa Global Constraints của Kế hoạch 2 và 3: hàm thuần của t; mốc lời qua `tl`; chữ không fade; nhân vật không cắt cứng; camera liền mạch; plate không import plate.
- **Ngoại lệ có chủ đích (TREATMENT đảo nền):** P19 và P20 khai báo `backdrop = false` và tự tô trang giấy toàn khung. Cắt cứng ở 125.66 đã nằm trong danh sách 8 cú cắt cứng của TREATMENT.
- Trên giấy:
  - Mực `INK` (`paper.js`).
  - Nhân vật vẽ bằng `m.draw(..., { ring: 3, ringColor: PAL.ink, shadow: true })`.
  - Lời chân khung dùng `footer(..., { colBase: PAL.ink, colKey: INK.gold })`.
- Tư thế khung trung (`POSES_V2_MID`) cắt ở giữa đùi, nên luôn đặt chân ảnh dưới mép khung (y ≥ 1180).
- `data/vox.json` là dữ liệu sinh ra, có commit; engine chỉ đọc file này, không đọc audio.

## Review Focus

1. **Cảnh hát cũ không lệch mặt** khi đổi sang bộ miệng B (P02 7.0, P11a 47.5/50.0, P16 96.0, P17 100.2) → Task 2.
2. **Tất định sau `toCanvas`**: chụp lẻ 35.50 phải trùng chụp sau 34.5 → Task 2.
3. **Lối ra 112.80**: không còn vật/chữ nào của P17 tắt cứng (sảnh gương, gương, vòng chữ) → Task 3.
4. **Gập giấy là phép phản xạ thật**: ở 140.5 nét vàng thấm qua giấy nằm đúng lên đường xanh; khi lật/gập/nghiêng, không lộ mép giấy → Task 6.
5. **Chữ trên giấy đọc được** (mực, không trắng/vàng sáng) và nhân vật trên giấy có viền mực → Task 5–6.

---

## File Structure

| file | trách nhiệm |
|---|---|
| `tools/cutout/cutout.py` (sửa) | ALIAS tên Việt → pose; bảng miệng B; `--only` |
| `assets/character-v2/src/*.png` (thêm, ảnh người dùng) | 8 tư thế khung trung + bảng chín miệng |
| `assets/character-v2/cut/` (sinh) | `pose-{notebook,offer,stand,pointer,pockets,pockets2,invite,tea}.png`, `viseme-b-*`, `mouth-b-*`, `cut.json` |
| `tools/vox_env.py` (mới) | đường bao giọng → `data/vox.json` |
| `engine/visemes.js` (sửa) | `makeEnv`, `mouthAt(t, words, env)` |
| `engine/face.js` (sửa) | `load(base, { set })`; nền là canvas |
| `engine/mascot.js` (sửa) | `POSES_V2_MID`, `toCanvas` khi nạp |
| `projects/mv/exp-log/index.html` (sửa) | bộ miệng B, `vox`, pose khung trung, P18–P20 |
| `projects/mv/exp-log/plates/p11a,p16,p17` (sửa) | truyền `this.vox` cho `mouthAt`; P17 vỡ cả thế giới ở lối ra |
| `projects/mv/exp-log/kit.js` (sửa) | `footer` nhận `colBase`/`colKey` |
| `projects/mv/exp-log/gear.js`, `paper.js` (mới) | động cơ; trang sổ |
| `projects/mv/exp-log/plates/p18-engine.js`, `p19-axes.js`, `p20-fold.js` (mới) | 3 cảnh |

---

### Task 1: Tách nền bộ ảnh mới (`cutout.py`: ALIAS + bảng miệng B)

**Files:** Modify `tools/cutout/cutout.py`; Add `assets/character-v2/src/` (9 ảnh mới của người dùng); Generate `assets/character-v2/cut/…`

- [ ] **Step 1: `tools/cutout/cutout.py` — thay toàn bộ file**

```python
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

Chạy:  tools/cutout/.venv/bin/python tools/cutout/cutout.py [--only tên1,tên2]
"""
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
    "Bảng chín biểu cảm miệng anime": "visemes-b",
}

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
        rgba, box = trim(rgba)
        Image.fromarray(rgba).save(OUT / f"{name}.png")
        report[name] = {"src_size": [rgb.shape[1], rgb.shape[0]], "bbox": box,
                        "size": [rgba.shape[1], rgba.shape[0]], "bg": bg.round().tolist(),
                        "alpha_cover": round(float((rgba[..., 3] > 8).mean()), 3)}
        print(name, report[name], flush=True)
    path.write_text(json.dumps(report, indent=1))

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Chạy chỉ các ảnh mới**

```bash
tools/cutout/.venv/bin/python tools/cutout/cutout.py --only pose-notebook,pose-offer,pose-stand,pose-pointer,pose-pockets,pose-pockets2,pose-invite,pose-tea,visemes-b
```
Expected:
- In ra `viseme-b-1…9 shift` với dx trong khoảng 0–3, dy trong khoảng 0–1.
- In ra 8 dòng `pose-…` có `alpha_cover` khoảng 0.6–0.68.
- `cut.json` có khoá `mouth-b` với `box: [184, 251, 260, 311]`.
- Các file cũ trong `cut/` không đổi: `git status` chỉ báo `cut.json` sửa và các file mới.

- [ ] **Step 3: NHÌN** 8 tư thế trên nền navy (ghép tay bằng `convert … -gravity south -composite`): mép tóc/tay sạch, không quầng trắng.

- [ ] **Step 4: Commit**

```bash
git add tools/cutout/cutout.py assets/character-v2/src assets/character-v2/cut
git commit -m "assets(character-v2): eight mid-shot poses and a second, better-registered mouth chart"
```
---

### Task 2: Hát nhép theo giọng + bộ miệng B + sửa tất định ảnh

**Files:** Create `tools/vox_env.py`, `projects/mv/exp-log/data/vox.json`; Modify `engine/visemes.js`, `tools/test/visemes.test.mjs`, `engine/face.js`, `engine/mascot.js`, `projects/mv/exp-log/index.html` (dòng Face/vox/poses), `projects/mv/exp-log/plates/p11a-mirror.js`, `p16-otherside.js`, `p17-mirror2.js` (chỉ `this.vox` + `mouthAt(…, this.vox)`)

**Interfaces:**
- Produces:
  - `makeEnv({ fps, t0, q }) → { fps, at(t) }`.
  - `mouthAt(t, words, env = null)`.
  - `Face.load(base, { set: 'a' | 'b' })`.
  - `toCanvas(im)` và `POSES_V2_MID` (`engine/mascot.js`).
  - Plate nhận `s.vox`.

- [ ] **Step 1: Thêm test vào cuối `tools/test/visemes.test.mjs`**, đổi dòng import thành `import { V, syllablesOf, mouthAt, makeEnv } from '../../../engine/visemes.js';`

```js
// ── v2: độ mở theo giọng thật (đường bao stem lead-vocals, 0..1 mỗi khung 1/60s) ──
const ENV = (level) => ({ fps: 60, at: () => level });

test('mức giọng gần 0 trong từ → khép miệng (nghỉ hơi giữa âm tiết)', () => {
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.05)), V.CLOSE);
});

test('cùng nguyên âm a: giọng lớn → WIDE, vừa → OPEN, nhỏ → E (hé)', () => {
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.9)), V.WIDE);
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.5)), V.OPEN);
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.25)), V.E);
});

test('nguyên âm o: giọng lớn → O, nhỏ → U', () => {
  assert.equal(mouthAt(1.5, W('go', 1, 2), ENV(0.8)), V.O);
  assert.equal(mouthAt(1.5, W('go', 1, 2), ENV(0.3)), V.U);
});

test('ngân quá cuối từ (giọng còn lớn) → giữ miệng mở, không khép theo 15% cuối', () => {
  assert.equal(mouthAt(1.95, W('go', 1, 2), ENV(0.8)), V.O);
  assert.equal(mouthAt(2.2, W('go', 1, 2), ENV(0.7)), V.O);      // ngoài từ nhưng còn ngân: giữ nguyên âm cuối
  assert.equal(mouthAt(2.2, W('go', 1, 2), ENV(0.05)), V.REST);
});

test('không có đường bao → y hệt v1 (các cảnh cũ không đổi)', () => {
  for (const [w, t] of [['back', 1.5], ['run', 1.95], ['same', 1.05], ['go', 1.5]])
    assert.equal(mouthAt(t, W(w, 1, 2)), mouthAt(t, W(w, 1, 2), null));
});

test('makeEnv: tra theo khung, ngoài khoảng → 0, giá trị trong [0,1]', () => {
  const e = makeEnv({ fps: 60, t0: 0, q: [0, 128, 255] });
  assert.equal(e.at(0), 0); assert.ok(Math.abs(e.at(1 / 60) - 128 / 255) < 1e-9); assert.equal(e.at(2 / 60), 1);
  assert.equal(e.at(-1), 0); assert.equal(e.at(99), 0);
});
```

- [ ] **Step 2: Chạy — phải FAIL** (`does not provide an export named 'makeEnv'`)

- [ ] **Step 3: `engine/visemes.js` — thay toàn bộ file**

```js
// engine/visemes.js
// Chữ → khẩu hình theo thời gian, cho mặt cận (docs/character/CHARACTER-V2.md § Hát nhép).
// Đơn giản có chủ đích: chia đều thời lượng từ cho các âm tiết; nguyên âm quyết
// định khẩu hình, phụ âm đầu chiếm 20% đầu âm tiết, 15% cuối từ khép miệng.
export const V = { REST: 1, CLOSE: 2, TEETH: 3, OPEN: 4, WIDE: 5, O: 6, U: 7, EE: 8, E: 9 };

export function syllablesOf(word) {
  let w = String(word).toLowerCase().replace(/[^a-z]/g, '');
  if (w.length > 3 && /[^aeiouy]e$/.test(w)) w = w.slice(0, -1);   // e câm: same, name, rule
  const out = []; let onset = '';
  for (const m of w.matchAll(/[aeiouy]+|[^aeiouy]+/g)) {
    if (/^[aeiouy]/.test(m[0])) { out.push({ onset, vowel: m[0] }); onset = ''; }
    else onset = m[0];
  }
  return out;
}

function vowelMouth(v, sylDur) {
  if (/oo|u|w/.test(v)) return V.U;
  if (v.includes('o')) return V.O;
  if (/ee|i|y/.test(v)) return V.EE;
  if (v.includes('a')) return sylDur >= 0.22 ? V.WIDE : V.OPEN;
  if (v.includes('e')) return V.E;
  return V.OPEN;
}

function onsetMouth(o) {
  const c = o.slice(-1);
  if ('mbp'.includes(c) && c) return V.REST;
  if ('sztdcjx'.includes(c) && c) return V.TEETH;
  return null;
}

/**
 * Đường bao giọng (stem lead-vocals) đã lượng tử 0..255 mỗi khung: { fps, t0, q }.
 * Sinh một lần bằng tools/vox_env.py → data/vox.json, nên vẫn là hàm thuần của t.
 */
export function makeEnv({ fps, t0 = 0, q }) {
  return { fps, at(t) { const i = Math.round((t - t0) * fps); return i >= 0 && i < q.length ? q[i] / 255 : 0; } };
}

/** v2: chỉnh độ mở theo mức giọng thật — nguyên âm vẫn quyết định hình. */
function byLevel(m, lv) {
  if (m === V.WIDE || m === V.OPEN) return lv >= 0.7 ? V.WIDE : lv >= 0.38 ? V.OPEN : V.E;
  if (m === V.O || m === V.U) return lv >= 0.55 ? V.O : V.U;
  if (m === V.E) return lv >= 0.7 ? V.OPEN : V.E;
  return m;
}

function shapeOf(wd, f, held) {
  const dur = Math.max(0.01, wd.end - wd.start);
  const syl = syllablesOf(wd.w);
  if (!syl.length) return V.OPEN;                       // "x", "99", "—": miệng hé
  if (f > 0.85 && !held) return V.CLOSE;
  const n = syl.length, si = Math.min(n - 1, Math.floor(f * n)), sf = f * n - si;
  const s = syl[si];
  if (sf < 0.2 && !held) { const om = onsetMouth(s.onset); if (om) return om; }
  // 'e' đứng cuối từ ngắn (me, be, we) đọc là /i:/
  if (s.vowel === 'e' && si === n - 1 && /e$/i.test(wd.w)) return V.EE;
  return vowelMouth(s.vowel, dur / n);
}

/**
 * Khẩu hình tại t. `env` (tuỳ chọn, từ makeEnv): khi có, giọng gần tắt → khép miệng giữa âm tiết,
 * giọng lớn → há to hơn, và nốt ngân quá mốc cuối từ vẫn giữ miệng mở. Không có env → y hệt v1.
 */
export function mouthAt(t, words, env = null) {
  const lv = env ? env.at(t) : null;
  for (const wd of words) {
    if (t < wd.start || t >= wd.end) continue;
    const f = (t - wd.start) / Math.max(0.01, wd.end - wd.start);
    if (lv === null) return shapeOf(wd, f, false);
    if (lv < 0.12) return V.CLOSE;
    return byLevel(shapeOf(wd, f, lv >= 0.4), lv);
  }
  if (lv !== null && lv >= 0.4) {                       // ngân sau mốc cuối từ: giữ nguyên âm cuối
    const last = [...words].reverse().find(w => w.end <= t && t - w.end < 0.6);
    if (last) return byLevel(shapeOf(last, 0.99, true), lv);
  }
  return V.REST;
}
```

- [ ] **Step 4: Chạy test** → `node --test tools/test/*.test.mjs` PASS (58).

- [ ] **Step 5: `tools/vox_env.py` rồi sinh dữ liệu**

```python
"""Đường bao giọng hát cho hát nhép → projects/<tên>/data/vox.json  ({fps, t0, q: 0..255 mỗi khung}).

Năng lượng dải 300–3400 Hz của stem lead-vocals (không đo RMS toàn dải — ghi nhớ
"đo giọng, không đo RMS"), cửa sổ 2048 mẫu căn giữa mỗi khung 1/60s. Chuẩn hoá theo
phân vị của các khung có giọng: p15 → 0, p92 → 1. Làm mượt 3 khung để miệng không nháy.
Chạy một lần; engine chỉ đọc file → vẫn tất định.

Dùng: python3 tools/vox_env.py projects/mv/exp-log
"""
import json, sys
from pathlib import Path
import numpy as np
import soundfile as sf

proj = Path(sys.argv[1]); fps = 60
x, sr = sf.read(proj / "audio/stems/lead-vocals.wav", dtype="float32")
if x.ndim > 1: x = x.mean(1)
N = 2048; win = np.hanning(N); f = np.fft.rfftfreq(N, 1 / sr); band = (f >= 300) & (f <= 3400)
n = int(len(x) / sr * fps)
e = np.zeros(n)
pad = np.pad(x, (N // 2, N // 2))
for i in range(n):
    c = int(i / fps * sr)
    seg = pad[c:c + N] * win
    e[i] = np.sqrt(np.sum(np.abs(np.fft.rfft(seg))[band] ** 2) / N)
db = 20 * np.log10(e + 1e-7)
voiced = db[db > np.percentile(db, 30)]
lo, hi = np.percentile(voiced, 15), np.percentile(voiced, 92)
lv = np.clip((db - lo) / (hi - lo), 0, 1)
lv = np.convolve(lv, np.ones(3) / 3, mode="same")
q = np.round(lv * 255).astype(int).tolist()
(proj / "data/vox.json").write_text(json.dumps({"fps": fps, "t0": 0, "src": "lead-vocals 300–3400Hz",
                                                 "lo_db": round(float(lo), 1), "hi_db": round(float(hi), 1), "q": q}, separators=(",", ":")))
print(f"vox.json: {n} khung, lo {lo:.1f} dB, hi {hi:.1f} dB")
```

Run: `python3 tools/vox_env.py projects/mv/exp-log`
Expected: `vox.json: 14378 khung, lo -2.4 dB, hi 5.9 dB`.

- [ ] **Step 6: `engine/face.js` — thay toàn bộ file**

```js
// engine/face.js
// Mặt cận hát nhép: vẽ viseme-1 làm nền, đè mảng miệng mouth-N tại cut.json.mouth.box.
// KHÔNG thay cả ô viseme — AI vẽ lại mọi nét nên viền rung 1–2px giữa các ô.
import { toCanvas } from './mascot.js';

export class Face {
  /** set 'a' = visemes-3x3 (bộ đầu), 'b' = bảng miệng thứ hai (lưới đều hơn: lệch 0–3px). */
  async load(base = '../../../assets/character-v2/cut', { set = 'a' } = {}) {
    const img = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error(`face: thiếu ${src}`)); i.src = src; });
    const meta = await (await fetch(`${base}/cut.json`)).json();
    const k = set === 'b' ? '-b' : '';
    this.box = meta[`mouth${k}`].box;                 // [x0, y0, x1, y1] trong ô 418px
    this.base = toCanvas(await img(`${base}/viseme${k}-1.png`));   // canvas: cũng là pose giả 'face' để lấy mẫu ký hiệu
    this.mouth = await Promise.all([1,2,3,4,5,6,7,8,9].map(i => img(`${base}/mouth${k}-${i}.png`)));
    return this;
  }
  draw(g, x, y, h, mouthId, { alpha = 1 } = {}) {
    const s = h / this.base.height, w = this.base.width * s, x0 = x - w / 2, y0 = y - h;
    g.save(); g.globalAlpha = alpha;
    g.drawImage(this.base, x0, y0, w, h);
    const m = this.mouth[Math.min(9, Math.max(1, mouthId)) - 1], [bx, by] = this.box;
    g.drawImage(m, x0 + bx * s, y0 + by * s, m.width * s, m.height * s);
    g.restore();
  }
}
```

- [ ] **Step 7: `engine/mascot.js`**
  - Ngay sau dòng `export const POSES_V2 = …`, thêm khối dưới đây.
  - Trong `load()`, đổi `im.onload = () => { this.im[p] = im; res(); };` thành `im.onload = () => { this.im[p] = toCanvas(im); res(); };`.

```js
// Bộ khung trung 2026-10-01 (cắt ở giữa đùi): đặt sát mép dưới khung hoặc crop góc.
export const POSES_V2_MID = ['notebook','offer','stand','pointer','pockets','pockets2','invite','tea'];

/**
 * Chép ảnh sang canvas CPU một lần khi nạp. Lý do (đã đo, 2026-09-30): drawImage-thu-nhỏ một <img>
 * cho pixel khác nhau tuỳ ảnh đã từng được vẽ lên canvas GPU hay chưa (trạng thái giải mã của Chrome),
 * nên lưới ký hiệu dựng lần đầu phụ thuộc thứ tự khung → ảnh chụp lẻ ≠ render tuần tự.
 */
export function toCanvas(im) {
  const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
  c.getContext('2d', { willReadFrequently: true }).drawImage(im, 0, 0);
  return c;
}
```

- [ ] **Step 8: Nối dây**
  - `index.html`:
    - Thêm `import { makeEnv } from '../../../engine/visemes.js';`.
    - Đổi import mascot thành `import { POSES_V2, POSES_V2_MID } from '../../../engine/mascot.js';`.
    - Thay dòng tạo `face` bằng:
      ```js
      const face = await new Face().load('../../../assets/character-v2/cut', { set: 'b' });
      const vox = makeEnv(await (await fetch('./data/vox.json')).json());   // đường bao giọng: tools/vox_env.py
      ```
    - Đổi `extra: { tl, face }` thành `extra: { tl, face, vox }`, và `poses: POSES_V2` thành `poses: [...POSES_V2, ...POSES_V2_MID]`.
  - Trong `p11a-mirror.js`, `p16-otherside.js`, `p17-mirror2.js`:
    - Đổi `this.face = s.face;` thành `this.face = s.face; this.vox = s.vox;`.
    - Đổi `mouthAt(t, this.tl.wordsOf(l))` thành `mouthAt(t, this.tl.wordsOf(l), this.vox)`.

- [ ] **Step 9: Kiểm (Review Focus #1, #2)**

```bash
S=/tmp/shoot; # dùng lệnh chụp trực tiếp, KHÔNG để lệnh trong biến (zsh không tách từ)
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 7.0,47.5,50.0,96.0,100.2 --outdir out/check/faceB
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 35.5 --outdir out/check/d1
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 34.5,35.5 --outdir out/check/d2
ls out/check/faceB/*.png | wc -l      # phải 5
md5sum out/check/d1/t_35.50.png out/check/d2/t_35.50.png
```
Expected:
- Có 5 ảnh, mặt cận đúng chỗ như trước (so với ảnh cũ cùng mốc).
- Hai md5 ở 35.50 **trùng nhau**.

- [ ] **Step 10: Commit**

```bash
git add tools/vox_env.py projects/mv/exp-log/data/vox.json engine/visemes.js tools/test/visemes.test.mjs engine/face.js engine/mascot.js projects/mv/exp-log/index.html projects/mv/exp-log/plates/p11a-mirror.js projects/mv/exp-log/plates/p16-otherside.js projects/mv/exp-log/plates/p17-mirror2.js
git commit -m "feat(engine): lip-sync follows the real vocal envelope; mouth chart B; sprites sampled from CPU canvases (order-independent)"
```
---

### Task 3: P17 vỡ toàn bộ thế giới ở lối ra (112.80)

**Files:** Modify `projects/mv/exp-log/plates/p17-mirror2.js`

**Interfaces:** vòng chữ chuyển từ `backdropAt` vào cảnh (`textRings` của `engine/stage.js`); `world(g, t)` = sảnh gương + nhuộm + hai gương + vòng chữ + đồ thị, vỡ chung trong `[next − 0.35, next)`.

- [ ] **Step 1: `projects/mv/exp-log/plates/p17-mirror2.js` — thay toàn bộ file** (đã gồm `this.vox` của Task 2)

```js
// P17 mirror2 — "Gương nhân đôi" · 98.88 → 112.80 (TREATMENT P17, chorus 2 — CÚ BÙNG NỔ)
// 98.88 cú trống lớn + bass + bè vọng cùng vào: kính quầy giao dịch vỡ tung về phía camera, lộ HAI gương giao
// nhau, sảnh ngân hàng nhường chỗ cho sảnh gương sâu hun hút. Điệp khúc 1 kể bằng đại số (mũi tên, cỗ máy);
// điệp khúc 2 kể bằng ĐỒ THỊ: hệ toạ độ đặt sao cho u = v trùng gương, nên ảnh của đường cong mũ (vàng)
// đúng là đường cong log (xanh). "Same connection, different track": vạch nối vuông góc gương giữa hai đường.
// "Give me the exponent…": điểm chạy 2 → 4 trên đường mũ; "…find the exponent": 4 → 2 trên đường log.
// "Turn it around": cả đồ thị gập qua gương — vàng ⇄ xanh. "Forward and backward… everywhere": nhân vật nhảy,
// kính vạn hoa 8 nhánh đường cong tràn khung, camera xoay. Bè vọng 101–114: lời lật gương ở nửa trên-trái.
import { clamp, prog, smooth, lerp, outExpo } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine, clipSide, foldMatrix, reflectPoint, line } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { textRings } from '../../../../engine/stage.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { G, curve, axes, shards, mirrorHall, trace } from '../chorus2.js';
import { KACHING, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker } from '../bank.js';
import { glassAnswer } from '../glass.js';

const FACE = [960, 870, 560];                    // = P16: mặt nối liền qua cú vỡ
const ECHO = [101.0, 114.0];                     // data/stems.json: backing vocals
const LONG1 = line(-1740, 3240, 3660, -2160);     // = MIRROR (x + y = 1500), kéo dài
const LONG2 = line(-1740, -2160, 3660, 3240);     // = MIRROR2 (y = x − 420), kéo dài

export default class P17 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (txt) => s.tl.line(txt, 2);
    this.fwd = L('Run it forward,'); this.back = L('run it back.'); this.same = L('Same connection,');
    this.give = L('Give me the exponent—'); this.value = L("I'll give you the value.");
    this.gv = L('Give me the value—'); this.find = L('find the exponent.');
    this.turn = L('Turn it around,'); this.fb = L('Forward and backward—'); this.every = L('everywhere.');
    this.next = s.tl.at('Same old laws');
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.found = s.tl.line('and the answer can be found.').words[2].start;
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.3)), e = smooth(prog(t, this.fb.start, this.fb.start + 0.5));
    return { glow: lerp(0.7, 1, k), horizon: 760, floor: lerp(0.65, 1, k), mirror: true, bokeh: 0.8 * k };   // vòng chữ vẽ trong cảnh: vỡ cùng thế giới ở lối ra
  }
  camera(t) {
    const p = prog(t, this.t0, this.t0 + 0.5), punch = 1 - smooth(p);
    const kick = Math.sin(Math.PI * prog(t, this.turn.start, this.turn.end)) * 0.3;
    const e = smooth(prog(t, this.fb.start, this.every.start)), spin = Math.max(0, t - this.every.start) * 0.9;
    return { s: 1 + 0.12 * punch + 0.06 * e, r: 0.07 * Math.sin(p * Math.PI * 3) * punch + kick + 0.22 * e + spin, bg: 0.25 * e };
  }
  render(g, t) {
    // thế giới điệp khúc 2 (sảnh gương, hai gương, vòng chữ, đồ thị) — vỡ CÙNG NHAU ở 0.35s cuối, không tắt cứng
    if (t < this.next) shatter(g, c => this.world(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 19 });
    if (t < this.t0 + 0.3) shatter(g, c => this.bank(c, t), prog(t, this.t0, this.t0 + 0.3), t, { seed: 23 });   // sảnh + chữ trên kính vỡ theo kính
    // mặt cận nối từ P16, hát nhép tới hết "different track", ra bằng lưới khi đồ thị làm việc
    const [FX, FY, FH] = FACE, p = presence(t, this.t0 - 1, this.give.start - 0.3, { outDur: 0.35 });
    if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'out', p.k, { t, cell: 7, seed: 22 });
    // "Forward and backward": nhảy lên giữa hai gương
    const pj = presence(t, this.fb.start, this.next - 0.45, { inDur: 0.25, outDur: 0.4 });
    figure(g, this.m, 'jump', 960, 1060, 640, pj.state === 'out' ? 'digits' : 'burn', pj, { t, seed: 17 });
    shards(g, prog(t, this.t0, this.t0 + 0.75));
    // bè vọng: lời lật gương, xanh, nửa trên-trái
    const l = this.tl.lineAt(t);
    if (l && t >= ECHO[0] && t < Math.min(ECHO[1], this.next))
      decodeLine(g, this.tl.wordsOf(l), t, 600, 200, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75, burstAt: Math.min(this.next, l.end) - 0.3, burstDur: 0.3 });
    footer(g, this.tl, t, ['forward', 'back', 'connection', 'exponent', 'value', 'around', 'everywhere'], { from: this.t0, carry: true });
  }
  /** Đồ thị: hai đường cong + nối + điểm chạy; gập qua gương ở "Turn it around"; kính vạn hoa ở "everywhere". */
  graph(g, t) {
    const k = smooth(prog(t, this.turn.start, this.turn.end)), c = Math.cos(Math.PI * k), swap = c < 0;
    const A = swap ? PAL.back : PAL.fwd, B = swap ? PAL.fwd : PAL.back;
    const kal = smooth(prog(t, this.fb.words[2].start, this.every.start + 0.3));
    for (let m = 1; m < 8 && kal > 0; m++) {                     // kính vạn hoa: 7 bản xoay quanh tâm
      g.save(); g.translate(960, 540); g.rotate(m * Math.PI / 4 * kal); g.translate(-960, -540);
      curve(g, 1, { col: A, alpha: 0.5 * kal, width: 5 }); curve(g, 1, { log: true, col: B, alpha: 0.5 * kal, width: 5 });
      g.restore();
    }
    g.save(); g.transform(...foldMatrix(MIRROR, Math.max(Math.abs(c), 0.001)));   // |c| như P11b: qua nửa đường đổi màu, chữ không bị ngược
    axes(g, smooth(prog(t, this.give.start - 0.3, this.give.start)), { alpha: 0.35 });
    curve(g, prog(t, this.fwd.words[2].start - 0.1, this.fwd.words[2].start + 0.5, smooth), { col: A });
    curve(g, prog(t, this.back.words[2].start - 0.1, this.back.words[2].start + 0.5, smooth), { log: true, col: B });
    this.links(g, t);
    trace(g, 2, prog(t, this.give.words[3].start, this.give.words[3].start + 0.35), prog(t, this.value.words[4].start, this.value.words[4].start + 0.3),
      { inLabel: '2', outLabel: '4', col: A });
    trace(g, 2, prog(t, this.gv.words[3].start, this.gv.words[3].start + 0.35), prog(t, this.find.words[2].start, this.find.words[2].start + 0.3),
      { log: true, inLabel: '4', outLabel: '2', col: B });
    g.restore();
  }
  world(g, t) {
    const pulse = beat.onBeat(t, 0.25), e = smooth(prog(t, this.fb.start, this.fb.start + 0.5));
    mirrorHall(g, t, { alpha: smooth(prog(t, this.t0, this.t0 + 0.4)), pulse, spin: Math.max(0, t - this.every.start) * 0.6 });
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {                 // hai nửa nhuộm theo gương thứ nhất
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    // gương kéo dài gấp 5 lần: camera xoay (kick 0.3 rad, spin ở "everywhere") không làm lộ đầu gương trong khung
    drawMirrorLine(g, LONG1, 1, { width: 6, glow: 30 });
    drawMirrorLine(g, LONG2, outExpo(prog(t, this.t0 + 0.05, this.t0 + 0.4)), { width: 4, glow: 20 });   // gương thứ hai xé ra
    if (e > 0) textRings(g, t, 960, 540, { r0: 300, gap: 62, n: 5, alpha: 0.85 * e, spin: 0.3, colors: [PAL.fwd, PAL.back],
      texts: ['FORWARD', 'BACKWARD', '2ᵘ', 'log₂', 'EVERYWHERE'] });
    this.graph(g, t);
  }
  /** Trạng thái cuối của P16 (sảnh lạnh sau kính alpha 0.32 + chữ trả lời trên kính) — để vỡ cùng mảnh kính. */
  bank(g, t) {
    const a = 0.32;
    vault(g, t, { alpha: 0.9 * a }); stacks(g, t, this.times, { alpha: a }); doubleLine(g, t, 1, { alpha: a });
    growthCurve(g, 12.6, { alpha: a }); doubleMarker(g, t, 1, { alpha: a });
    g.save(); g.globalAlpha = a; calendar(g, t, 12, -1, { label: '10.2', labelCol: PAL.back }); g.restore();
    glassAnswer(g, t, this.found);
  }
  /** "Same connection, different track": vạch nối đứt nét giữa điểm trên đường mũ và ảnh của nó trên đường log. */
  links(g, t) {
    const k = smooth(prog(t, this.same.start, this.same.start + 0.6));
    if (k <= 0) return;
    g.save(); g.setLineDash([12, 10]); g.lineDashOffset = -t * 60; g.strokeStyle = PAL.truth; g.lineWidth = 3; g.globalAlpha = 0.75 * k;
    for (const u of [-1, 0, 1, 1.8]) {
      const a = G(u, 2 ** u), b = reflectPoint(a, MIRROR);
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); g.stroke();
    }
    g.restore();
  }
}
```

- [ ] **Step 2: NHÌN** `110.5, 112.55, 112.78, 112.82`. Expected:
  - 112.55: cả sảnh gương, hai gương và vòng chữ đang vỡ thành ký hiệu.
  - 112.78: chỉ còn hạt thưa.
  - Không có khung nào sảnh/vòng chữ đứng nguyên rồi mất.

- [ ] **Step 3: Commit** — `git commit -am "fix(exp-log): P17 shatters its whole world (hall, mirrors, rings) before the beat switch"` (chỉ file P17).
---

### Task 4: Động cơ (`gear.js`) + P18 `engine` (112.80 → 125.66)

**Files:** Create `projects/mv/exp-log/gear.js`, `projects/mv/exp-log/plates/p18-engine.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces: `GEAR`, `rimPoints(n)`, `gear(g, t, {angle, plus, lit, col, labels, mono, alpha})`, `ruleBag(g, k, {x, y})`, `flashcards(g, k, cut, {x, y})`, `RULE_CARDS`.
- P18: camera đầu cảnh = cuối P17 `{ s: 1.06, r: 0.22 + (112.80 − everywhere₂)·0.9, bg: 0.25 }`, rồi về đơn vị trong 1.3s.

- [ ] **Step 1: `projects/mv/exp-log/gear.js`**

```js
// Động cơ luật số mũ (P18): chính là cánh cửa két tròn ở cuối sảnh ngân hàng (bank.js vault),
// giờ ra giữa khung. Răng là dấu ×; "Multiplication turns to addition" — mỗi răng xoay 45° thành +
// (đúng hình học: × xoay 45° là +). Hai khe vào hai bên, lõi giữa, khe ra ở dưới.
import { clamp, hash } from '../../../engine/lib.js';
import { mix } from '../../../engine/draw.js';
import { PAL } from './song.js';

export const GEAR = { cx: 960, cy: 470, R: 250 };
const DIM = '#2C3D6B';

/** Điểm đều trên vành (cho morph ký hiệu tụ thành động cơ). */
export function rimPoints(n = 160) {
  return Array.from({ length: n }, (_, i) => {
    const a = i / n * Math.PI * 2, r = GEAR.R + (i % 4 === 0 ? 40 : 0);
    return [GEAR.cx + Math.cos(a) * r, GEAR.cy + Math.sin(a) * r];
  });
}

/** Một răng: hai thanh chéo; plus ∈ [0,1] xoay thanh 45° → dấu +. */
function tooth(g, x, y, a, plus, col) {
  g.save(); g.translate(x, y); g.rotate(a + Math.PI / 4 * (1 - plus));
  g.strokeStyle = col; g.lineWidth = 15; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-28, 0); g.lineTo(28, 0); g.moveTo(0, -28); g.lineTo(0, 28); g.stroke();
  g.restore();
}

/**
 * Động cơ. angle: góc quay; plus: × → +; lit: 0 tối (cửa két) → 1 sáng; col: màu khi sáng.
 * labels: { core, left, right, top, bottom } (chuỗi); mono: 0 Archivo → 1 Plex Mono ("different script").
 */
export function gear(g, t, { angle = 0, plus = 0, lit = 1, col = PAL.fwd, labels = {}, mono = 0, alpha = 1 } = {}) {
  const { cx, cy, R } = GEAR, c = mix(DIM, col, lit);
  g.save(); g.globalAlpha = alpha;
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(cx, cy, R + 12, 0, Math.PI * 2); g.fill();
  g.shadowColor = col; g.shadowBlur = 30 * lit;
  g.strokeStyle = c; g.lineWidth = 16;
  for (const r of [R, R - 40]) { g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
  for (let i = 0; i < 12; i++) {                                 // răng ×/+ quay theo vành
    const a = angle + i / 12 * Math.PI * 2;
    tooth(g, cx + Math.cos(a) * (R + 46), cy + Math.sin(a) * (R + 46), a, plus, c);
  }
  g.lineWidth = 9; g.lineCap = 'round';                           // tay quay của cửa két = nan hoa động cơ
  for (let i = 0; i < 3; i++) {
    const a = angle * 0.5 + i * Math.PI / 3;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * 130, cy + Math.sin(a) * 130); g.lineTo(cx + Math.cos(a) * (R - 52), cy + Math.sin(a) * (R - 52)); g.stroke();
    g.beginPath(); g.moveTo(cx - Math.cos(a) * 130, cy - Math.sin(a) * 130); g.lineTo(cx - Math.cos(a) * (R - 52), cy - Math.sin(a) * (R - 52)); g.stroke();
  }
  g.shadowBlur = 0;
  g.fillStyle = PAL.bg; g.strokeStyle = c; g.lineWidth = 8;       // lõi
  g.beginPath(); g.arc(cx, cy, 128, 0, Math.PI * 2); g.fill(); g.stroke();
  // khe vào hai bên, khe ra ở dưới
  for (const [x, y, w, h] of [[cx - R - 290, cy - 60, 250, 120], [cx + R + 40, cy - 60, 250, 120], [cx - 120, cy + R + 70, 240, 100]]) {
    g.strokeRect(x, y, w, h);
  }
  const font = (px) => mono > 0.5 ? `600 ${Math.round(px * 0.82)}px "IBM Plex Mono"` : `900 ${px}px "Archivo"`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const put = (s, x, y, px, fill) => { if (!s) return; g.font = font(s.length > 5 ? px * 0.66 : px); g.fillStyle = fill; g.fillText(s, x, y); };   // chữ dài co lại cho vừa khe
  put(labels.core, cx, cy, 58, PAL.backCore);
  put(labels.left, cx - R - 165, cy, 62, PAL.fwdCore);
  put(labels.right, cx + R + 165, cy, 62, PAL.fwdCore);
  put(labels.bottom, cx, cy + R + 120, 62, PAL.fwdCore);
  put(labels.top, cx, cy - R - 120, 64, PAL.truth);
  g.restore();
}

/** Túi công thức: thẻ công thức rơi tung ra (k: 0 → 1). */
export const RULE_CARDS = ['aᵐ·aⁿ = aᵐ⁺ⁿ', '(aᵐ)ⁿ = aᵐⁿ', 'a⁻ⁿ = 1/aⁿ', 'a⁰ = 1', 'aᵐ/aⁿ = aᵐ⁻ⁿ', '(ab)ⁿ = aⁿbⁿ'];
export function ruleBag(g, k, { x = 330, y = 300 } = {}) {
  if (k <= 0) return;
  g.save(); g.translate(x, y - 500 * (1 - clamp(k * 3)));        // túi rơi xuống trong 1/3 đầu
  g.fillStyle = '#C9B48A'; g.strokeStyle = PAL.ink; g.lineWidth = 4;
  g.beginPath(); g.moveTo(-90, -40); g.lineTo(90, -40); g.lineTo(110, 130); g.lineTo(-110, 130); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = PAL.ink; g.font = '600 28px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillText('RULES', 0, 60);
  const spill = clamp((k - 0.3) / 0.7);
  RULE_CARDS.forEach((s, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.45, d = 60 + 260 * spill * (0.6 + 0.4 * hash(i * 3.3));
    g.save(); g.translate(Math.cos(a) * d, -40 + Math.sin(a) * d + 300 * spill * spill * 0.3); g.rotate((hash(i) - 0.5) * 1.4 * spill);
    g.fillStyle = PAL.paper; g.fillRect(-120, -32, 240, 64); g.strokeStyle = PAL.fwd; g.lineWidth = 3; g.strokeRect(-120, -32, 240, 64);
    g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.fillText(s, 0, 2);
    g.restore();
  });
  g.restore();
}

/** Xấp thẻ học thuộc bị cắt vụn: cut ∈ [0,1] — lưỡi đỏ chém, các dải rơi. */
export function flashcards(g, k, cut, { x = 1600, y = 330 } = {}) {
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(clamp(k * 4), clamp(k * 4));
  const strips = 6, w = 300, h = 190;
  for (let i = 0; i < strips; i++) {
    const fall = cut * cut * (500 + 300 * hash(i * 1.7)), rot = (hash(i * 5.1) - 0.5) * 1.2 * cut;
    g.save(); g.translate(-w / 2 + (i + 0.5) * w / strips, fall); g.rotate(rot);
    g.beginPath(); g.rect(-w / strips / 2, -h / 2, w / strips, h); g.clip();
    g.translate(w / 2 - (i + 0.5) * w / strips, 0);
    g.fillStyle = PAL.paper; g.fillRect(-w / 2, -h / 2, w, h);
    g.fillStyle = PAL.block; g.fillRect(-w / 2, -h / 2, w, 34);
    g.fillStyle = PAL.paper; g.font = '600 22px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('MEMORIZE!', 0, -h / 2 + 18);
    g.fillStyle = PAL.ink; g.font = '600 30px "IBM Plex Mono"'; g.fillText('log xy = ?', 0, 30);
    g.restore();
  }
  if (cut > 0 && cut < 0.4) {                                     // vệt chém đỏ
    g.strokeStyle = PAL.block; g.lineWidth = 8; g.shadowColor = PAL.block; g.shadowBlur = 20;
    for (let i = 1; i < strips; i++) { const xx = -w / 2 + i * w / strips; g.beginPath(); g.moveTo(xx, -h / 2 - 40); g.lineTo(xx, h / 2 + 40); g.stroke(); }
  }
  g.restore();
}
```

- [ ] **Step 2: `projects/mv/exp-log/plates/p18-engine.js`**

```js
// P18 engine — "× xoay thành +" · 112.80 → 125.66 (TREATMENT P18, beat switch)
// 112.8–116.4 gần như chỉ còn giọng (đo stem): khung xoay của P17 từ từ dừng, ký hiệu tụ thành cánh cửa két
// tròn của sảnh ngân hàng — hoá ra là một ĐỘNG CƠ, răng hình ×. "Multiply the values": 8 và 16 vào hai khe;
// "exponents add within": trong lõi 3 + 4. 116.42 band vào lại = CÚ NỔ THỨ HAI: động cơ bừng sáng, quay theo
// beat. "read it backward / language shift": nhãn chuyển sang ngôn ngữ log. 118.87 (bass nhấn):
// "Multiplication turns to addition" — mọi răng × xoay 45° thành +. "different script": chữ đổi sang mono.
// "Not a bag of rules": túi thẻ công thức rơi, vỡ. "Not a trick to memorize": thẻ học thuộc bị chém vụn (angry).
// "seen from the other side": camera vòng ra sau động cơ — mặt sau là cùng cỗ máy, đọc bằng log.
// 125.66 cắt cứng sang giấy (P19).
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { drawMorph } from '../../../../engine/morph.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { foldMatrix, line } from '../../../../engine/mirror.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { kaleidoPoints } from '../chorus.js';
import { gear, rimPoints, ruleBag, flashcards, GEAR } from '../gear.js';

export const BAND_BACK = 116.42;                  // đo stem: trống + bass + synth cùng vào lại sau quãng chỉ còn giọng
const HIT = 118.87;                               // bass nhấn đúng "Multiplication"
const AXIS = line(GEAR.cx, -2000, GEAR.cx, 3000); // trục đứng để vòng ra sau động cơ

const dec = (s, t, t0) => decodeChars(s, t, t0, t0 + 0.3, { seed: s.length }).filter(c => c.state !== 'hidden').map(c => c.ch).join('');

export default class P18 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.mult = s.tl.line('Multiply the values—'); this.add = s.tl.line('exponents add within.');
    this.read = s.tl.at('Now read it backward,'); this.shift = s.tl.at('watch the language shift.');
    this.same = s.tl.at('same engine,'); this.script = s.tl.line('different script.');
    this.bag = s.tl.line('Not a bag of rules.'); this.trick = s.tl.line('Not a trick to memorize.');
    this.just = s.tl.at('Just the old exponent laws'); this.other = s.tl.line('seen from the other side.');
    this.next = s.tl.at('Put them on the axes.');
    this.r0 = 0.22 + (this.t0 - s.tl.line('everywhere.', 2).start) * 0.9;   // góc camera ở khung cuối P17
    this.src = kaleidoPoints(); this.dst = rimPoints();
  }
  live(t) { return smooth(prog(t, BAND_BACK, BAND_BACK + 0.25)); }
  backdropAt(t) {
    const L = this.live(t), q = smooth(prog(t, this.t0, this.t0 + 0.8));
    return { glow: lerp(lerp(1, 0.35, q), 1, L), horizon: 760, floor: lerp(lerp(1, 0.15, q), 1, L), mirror: false, bokeh: 0.6 * L * 0,
      floorA: PAL.fwd, floorB: PAL.back, floorGlyphs: t >= HIT ? ['+', '+', 'log', '+'] : ['×', '×', 'log', '×'] };
  }
  camera(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 1.3));            // khung xoay của P17 dừng lại
    const punch = (t >= BAND_BACK ? 1 - smooth(prog(t, BAND_BACK, BAND_BACK + 0.45)) : 0) + (t >= HIT ? 1 - smooth(prog(t, HIT, HIT + 0.4)) : 0);
    return { s: lerp(1.06, 1, k) + 0.08 * punch, r: lerp(this.r0, 0, k), bg: lerp(0.25, 0, k) };
  }
  render(g, t) {
    const L = this.live(t);
    // ký hiệu của P17 tụ thành vành động cơ trong quãng chỉ còn giọng
    drawMorph(g, this.src, this.dst, prog(t, this.t0, this.t0 + 0.9), t, { colA: PAL.back, colB: PAL.truth, n: 200 });
    const appear = smooth(prog(t, this.t0 + 0.7, this.t0 + 1.0));
    if (appear > 0) {
      // vòng ra sau: lật quanh trục đứng (|c| như P11b — mặt sau vẽ nội dung log, chữ không ngược)
      const o = smooth(prog(t, this.other.start, this.next - 0.1)), c = Math.cos(Math.PI * o), back = c < 0;
      g.save(); g.transform(...foldMatrix(AXIS, Math.max(Math.abs(c), 0.02)));
      gear(g, t, this.state(t, back, L, appear));
      g.restore();
    }
    // 116.42 / 118.87: vòng loé từ tâm động cơ
    for (const [h, col] of [[BAND_BACK, PAL.fwd], [HIT, PAL.truth]]) {
      const r = prog(t, h, h + 0.5);
      if (r <= 0 || r >= 1) continue;
      g.save(); g.strokeStyle = col; g.lineWidth = 14 * (1 - r); g.shadowColor = col; g.shadowBlur = 30;
      g.beginPath(); g.arc(GEAR.cx, GEAR.cy, GEAR.R + 60 + 600 * r, 0, Math.PI * 2); g.stroke(); g.restore();
    }
    // "Not a bag of rules": túi rơi, thẻ tung ra rồi vỡ
    if (t >= this.bag.start && t < this.trick.start + 0.3)
      shatter(g, c => ruleBag(c, prog(t, this.bag.start, this.bag.end)), prog(t, this.trick.start, this.trick.start + 0.3), t, { seed: 24 });
    // "Not a trick to memorize": xấp thẻ học thuộc bị chém, dải rơi khỏi khung
    if (t >= this.trick.start) flashcards(g, prog(t, this.trick.start, this.trick.start + 0.25), prog(t, this.trick.words[4].start, this.trick.words[4].start + 0.6));
    // nhân vật: que chỉ dẫn giảng về động cơ (khung trung, góc trái dưới) → giận dữ với thẻ học thuộc
    const p1 = presence(t, this.mult.start, this.bag.start - 0.2, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'pointer', 300, 1180, 820, p1.state === 'out' ? 'grid' : 'rows', p1, { t, seed: 25 });
    const p2 = presence(t, this.trick.start - 0.1, this.other.start, { inDur: 0.25, outDur: 0.4 });
    figure(g, this.m, 'angry', 1640, 1060, 560, p2.state === 'out' ? 'digits' : 'burn', p2, { t, seed: 26 });
    footer(g, this.tl, t, ['laws', 'multiply', 'add', 'backward', 'shift', 'addition', 'engine', 'script', 'rules', 'memorize', 'other'],
      { from: this.t0, carry: true });
  }
  /** Trạng thái động cơ theo lời. back = mặt sau (đọc bằng log). */
  state(t, back, L, appear) {
    const sp = t < BAND_BACK ? (t - this.t0) * 0.15 : (BAND_BACK - this.t0) * 0.15 + (t - BAND_BACK) * 0.9 + 0.25 * beat.beatPulse(t, 0.12);
    const plus = smooth(prog(t, HIT, HIT + 0.35)), mono = t >= this.script.words[1].start ? 1 : 0;
    const logs = t >= this.shift;
    const v = (s, t0) => (t >= t0 ? dec(s, t, t0) : '');
    const labels = back ? { top: 'log xy = log x + log y', left: 'log 8', right: 'log 16', core: '3 + 4', bottom: '7' } : {
      left: v(logs ? 'log 8 = 3' : '8', logs ? this.shift : this.mult.words[0].start),
      right: v(logs ? 'log 16 = 4' : '16', logs ? this.shift : this.mult.words[2].start),
      core: v('3 + 4', this.add.words[1].start),
      bottom: v(logs ? '7' : '128', logs ? this.shift : this.add.words[2].start),
      top: t >= HIT ? dec('log 8 + log 16', t, HIT) : v(logs ? 'log(8 × 16)' : '8 × 16', logs ? this.shift : this.mult.words[2].start),
    };
    if (t >= this.just && !back) labels.top = dec('aᵐ · aⁿ = aᵐ⁺ⁿ', t, this.just);
    return { angle: sp, plus, lit: appear * (0.35 + 0.65 * L), col: back ? PAL.back : PAL.fwd, labels, mono, alpha: appear };
  }
}
```

- [ ] **Step 3: Nối vào `index.html`**: thêm `import P18 from './plates/p18-engine.js';` và mục `[tl.at('Same old laws'), P18]` cuối `order`.

- [ ] **Step 4: NHÌN** `112.82,113.3,114.2,115.4,116.6,117.5,118.5,119.2,120.0,121.0,121.9,122.4,123.3,124.2,125.0,125.6`. Expected:
  - 112.82–113.3: ký hiệu tụ thành vành.
  - 114.2: động cơ tối (cửa két), răng ×.
  - 115.4: 8 và 16 vào khe; lõi `3 + 4`.
  - 116.6: bừng sáng vàng, vòng loé, có 128.
  - 118.5: nhãn log (`log 8 = 3` vừa khe).
  - 119.2: răng thành +, có `log 8 + log 16`.
  - 121.0: chữ mono.
  - 121.9–122.4: túi RULES rơi, thẻ tung, rồi vỡ.
  - 123.3: thẻ MEMORIZE bị chém, nhân vật giận.
  - 125.0: động cơ ép dẹt (vòng ra sau).
  - 125.6: mặt sau xanh, `log xy = log x + log y`.

- [ ] **Step 5: Commit** (`gear.js`, `p18-engine.js`, `index.html`): `feat(exp-log): P18 — the vault door is the engine; × teeth turn into +`
---

### Task 5: Trang sổ (`paper.js`) + `footer` màu mực + P19 `axes` (125.66 → 140.09)

**Files:** Create `projects/mv/exp-log/paper.js`, `projects/mv/exp-log/plates/p19-axes.js`; Modify `projects/mv/exp-log/kit.js`, `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`paper.js`):
  - Hằng số: `INK`, `MARGIN`, `AXES`, `EXP_PTS`, `LOG_PTS`, `AXIS_X`, `AXIS_Y`, `FOLD_HOLD`, `STROKES`.
  - Vẽ: `page`, `inkPath`, `arrowHead`, `hand`, `nib`, `ruler`, `splat`, `inkAll(g, t, T, {alpha, labels})`, `sheet(g, t, T, {flap, whole, tear, labels, extra})`.
  - Mốc: `paperTimes(tl)`.
- `kit.js`: `footer(…, { colBase, colKey })`.

- [ ] **Step 1: `kit.js`**
  - Trong `footer`, đổi `colBase: PAL.truth, colKey: PAL.fwd` thành `colBase: burst.colBase ?? PAL.truth, colKey: burst.colKey ?? PAL.fwd`.
  - Thêm dòng chú thích `// burst.colBase / colKey: màu chữ (trên nền giấy dùng mực).` trước dòng `// burst.carry`.
- [ ] **Step 2: `projects/mv/exp-log/paper.js`**

```js
// Trang sổ của nhân vật — đoạn đảo nền giấy (P19–P20, 125.66 → 155.70). TREATMENT § Bảng màu: giấy
// #F2EEE4, mực #1E2230 + mực màu. Vàng/xanh sáng của nền tối CHÌM trên giấy (LESSONS §13) → dùng mực
// đậm cùng họ màu. Đồ thị dùng đúng hệ toạ độ của điệp khúc 2 (chorus2.js G): u = v trùng gương
// MIRROR, nên gập tờ giấy theo y = x thì đường mũ đè khít lên đường log — phép gập là phép toán thật.
import { clamp, hash, prog, smooth, lerp } from '../../../engine/lib.js';
import { PAL, MIRROR } from './song.js';
import { foldMatrix, clipSide } from '../../../engine/mirror.js';
import { G, OX, OY } from './chorus2.js';

export const INK = { ink: PAL.ink, gold: '#B87410', blue: '#1F6FBF', red: '#C8323F', back: 'rgba(227,220,203,0.84)' };   // mặt sau hơi trong: thấy nét của nửa bên dưới
export const MARGIN = 150;

/** Trang giấy kẻ ô: ô 40px xanh rất nhạt, lề đỏ, lỗ gáy sổ bên trái. `back`: mặt sau (không kẻ, tối hơn). */
export function page(g, { back = false, x0 = -1600, y0 = -1600, x1 = 3500, y1 = 2700 } = {}) {   // đủ rộng: lật/gập/nghiêng không lộ mép
  g.save();
  g.fillStyle = back ? INK.back : PAL.paper; g.fillRect(x0, y0, x1 - x0, y1 - y0);
  if (!back) {
    g.strokeStyle = 'rgba(31,111,191,0.10)'; g.lineWidth = 1.5;
    g.beginPath();
    for (let x = -400; x <= 2320; x += 40) { g.moveTo(x, y0); g.lineTo(x, y1); }
    for (let y = -400; y <= 1480; y += 40) { g.moveTo(x0, y); g.lineTo(x1, y); }
    g.stroke();
    g.strokeStyle = 'rgba(200,50,63,0.35)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(MARGIN, y0); g.lineTo(MARGIN, y1); g.stroke();
    g.fillStyle = '#C9C2B2';
    for (let y = 60; y < 1080; y += 90) { g.beginPath(); g.arc(60, y, 13, 0, Math.PI * 2); g.fill(); }
  }
  g.restore();
}

/** Nét mực vạch dần theo danh sách điểm; trả về đầu bút. */
export function inkPath(g, pts, k, { col = INK.ink, width = 6, dash = null, alpha = 1 } = {}) {
  if (k <= 0 || pts.length < 2) return pts[0];
  const n = Math.max(2, Math.ceil(pts.length * clamp(k)));
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round';
  if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(...pts[0]);
  for (let i = 1; i < n; i++) g.lineTo(...pts[i]);
  g.stroke(); g.restore();
  return pts[n - 1];
}

export const AXES = { h: [[MARGIN + 40, OY], [1600, OY]], v: [[OX, 1040], [OX, 50]] };
export const EXP_PTS = Array.from({ length: 215 }, (_, i) => { const u = -5.4 + i * 0.04; return G(u, 2 ** u); });
export const LOG_PTS = EXP_PTS.map(([x, y]) => [1500 - y, 1500 - x]);      // ảnh qua x + y = 1500

/** Mũi tên đầu trục. */
export function arrowHead(g, [x, y], dir, { col = INK.ink, k = 1 } = {}) {
  if (k < 1) return;
  g.save(); g.translate(x, y); g.rotate(dir); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-26, -16); g.lineTo(0, 0); g.lineTo(-26, 16); g.stroke(); g.restore();
}

/** Chữ viết tay (Cormorant nghiêng) hiện dần từ trái sang. */
export function hand(g, text, x, y, k, { col = INK.ink, size = 64, align = 'left' } = {}) {
  if (k <= 0) return;
  g.save(); g.font = `italic 600 ${size}px "Cormorant Garamond"`; g.textBaseline = 'middle';
  const w = g.measureText(text).width, x0 = align === 'center' ? x - w / 2 : x;
  g.beginPath(); g.rect(x0 - 6, y - size, (w + 12) * clamp(k), size * 2); g.clip();
  g.fillStyle = col; g.textAlign = 'left'; g.fillText(text, x0, y);
  g.restore();
}

/** Ngòi bút ở đầu nét. */
export function nib(g, [x, y], { col = INK.ink } = {}) {
  g.save(); g.translate(x, y); g.rotate(-0.7);
  g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.lineTo(10, -30); g.lineTo(-10, -30); g.closePath(); g.fill();
  g.fillStyle = '#3A3F52'; g.fillRect(-12, -150, 24, 120);
  g.restore();
}

/** Thước kẻ trong suốt đặt dọc gương (k: trượt vào), vạch chia mỗi 40px. */
export function ruler(g, k, { lift = 0 } = {}) {
  if (k <= 0 || lift >= 1) return;
  const a = -Math.PI / 4, L = 1500, off = (1 - k) * 700 + lift * 400;
  g.save(); g.translate(960 + Math.cos(a + Math.PI / 2) * (60 + off), 540 + Math.sin(a + Math.PI / 2) * (60 + off)); g.rotate(a);
  g.globalAlpha = 1 - lift;
  g.fillStyle = 'rgba(31,111,191,0.12)'; g.strokeStyle = 'rgba(30,34,48,0.55)'; g.lineWidth = 2;
  g.fillRect(-L / 2, -10, L, 70); g.strokeRect(-L / 2, -10, L, 70);
  g.beginPath(); for (let i = -L / 2; i <= L / 2; i += 40) { g.moveTo(i, -10); g.lineTo(i, i % 200 === 0 ? 22 : 8); } g.stroke();
  g.restore();
}

/** Vết mực bắn nhỏ quanh điểm (cú loé trên giấy). */
export function splat(g, x, y, k, { col = INK.gold, seed = 0 } = {}) {
  if (k <= 0 || k >= 1) return;
  g.save(); g.fillStyle = col; g.globalAlpha = 1 - k;
  for (let i = 0; i < 14; i++) {
    const a = hash(seed + i * 3.1) * Math.PI * 2, d = (30 + 140 * hash(seed + i * 7.7)) * Math.sqrt(k), r = 3 + 9 * hash(seed + i);
    g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (1 - k * 0.5), 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

const DIAG = Array.from({ length: 50 }, (_, i) => [lerp(470, 1450, i / 49), 1500 - lerp(470, 1450, i / 49)]);

/** Toàn bộ nét mực của trang tại t theo các mốc T (P19 vẽ dần, P20 vẽ đủ với T đã qua). */
export function inkAll(g, t, T, { alpha = 1, labels = true } = {}) {
  const h = inkPath(g, AXES.h, prog(t, T.axes0, T.axes1), { width: 5, alpha });
  arrowHead(g, AXES.h[1], 0, { k: t >= T.axes1 ? 1 : 0 });
  inkPath(g, AXES.v, prog(t, T.axes1, T.axes2), { width: 5, alpha });
  arrowHead(g, AXES.v[1], -Math.PI / 2, { k: t >= T.axes2 ? 1 : 0 });
  if (labels) {
    hand(g, 'x', AXIS_X[0], AXIS_X[1], prog(t, T.axes2, T.axes2 + 0.3), { size: 60 });
    hand(g, 'y', AXIS_Y[0], AXIS_Y[1], prog(t, T.axes2, T.axes2 + 0.3), { size: 60 });
  }
  const e = inkPath(g, EXP_PTS, prog(t, T.exp0, T.exp1, smooth), { col: INK.gold, width: 8, alpha });
  const l = inkPath(g, LOG_PTS, prog(t, T.log0, T.log1, smooth), { col: INK.blue, width: 8, alpha });
  hand(g, 'y = 2ˣ', 960, 110, prog(t, T.lab, T.lab + 0.5), { col: INK.gold, size: 66 });
  hand(g, 'y = log₂ x', 1100, 650, prog(t, T.lab + 0.25, T.lab + 0.75), { col: INK.blue, size: 66 });
  const d = inkPath(g, DIAG, prog(t, T.yx0, T.yx1), { width: 5, dash: [22, 16], alpha });
  hand(g, 'y = x', 1300, 110, prog(t, T.yx1, T.yx1 + 0.4), { size: 66 });
  return { h, e, l, d };
}


export const AXIS_X = [AXES.h[1][0] - 10, 860], AXIS_Y = [AXES.v[1][0] + 26, 70];   // vị trí nhãn trục
export const FOLD_HOLD = 0.12;   // c khi nếp gập "dừng ở 90°" (P19 giữ, P20 gập nốt)
export const STROKES = [128.28, 130.42, 132.51, 134.66, 136.80, 138.94];   // data/stems.json: percussion mỗi ô nhịp

/** Mốc vẽ của trang (P19 vẽ dần; P20 vẽ lại đủ với cùng mốc). */
export function paperTimes(tl) {
  const L = (x) => tl.line(x), put = L('Put them on the axes.');
  return {
    axes0: put.start + 0.15, axes1: put.words[2].start, axes2: put.end,
    exp0: STROKES[0] - 0.6, exp1: STROKES[0] + 1.5, log0: STROKES[1], log1: STROKES[1] + 1.4, lab: STROKES[2],
    ruler: L('Draw one line:').start, yx0: L('y equals x.').start, yx1: STROKES[4] + 0.1,
    fold0: L('Fold the whole picture—').start, hold: L('watch what happens next.').start,
  };
}

/**
 * Tờ giấy tại t: flap = c của nửa trên-trái (gập theo gương), whole = c của cả tờ (lật sang mặt sau),
 * tear = khoảng tách hai nửa dọc pháp tuyến gương (px). Mặt sau: giấy tối hơn, mực thấm ngược 45%.
 * Dùng phép phản xạ thật (c < 0) — nên khi gập hẳn, đường mũ nằm ĐÚNG lên đường log.
 */
export function sheet(g, t, T, { flap = 1, whole = 1, tear = 0, labels = true, extra = null } = {}) {
  const n = [Math.SQRT1_2, Math.SQRT1_2];                      // pháp tuyến về phía nửa dưới-phải
  for (const s of [1, -1]) {
    g.save();
    g.translate(n[0] * tear * s, n[1] * tear * s);
    g.transform(...foldMatrix(MIRROR, whole));
    const c = s === -1 ? flap : 1;
    if (c < 1) g.transform(...foldMatrix(MIRROR, c));
    clipSide(g, MIRROR, s);
    const back = whole * c < 0;
    page(g, { back });
    inkAll(g, t, T, { alpha: back ? 0.45 : 1, labels });
    if (extra) extra(g, back);
    const shade = 1 - Math.abs(whole * c);
    if (shade > 0) { g.fillStyle = `rgba(30,34,48,${0.35 * shade})`; g.fillRect(-400, -300, 2720, 1680); }
    g.restore();
  }
}
```

- [ ] **Step 3: `projects/mv/exp-log/plates/p19-axes.js`**

```js
// P19 axes — "Trang sổ: hai đường cong" · 125.66 → 140.09 ✂ (TREATMENT P19, đảo nền giấy)
// 125.66 nhạc lặng → CẮT CỨNG vào trang sổ kẻ ô của chính nhân vật (pose sổ tay, góc phải). Chỉ còn bass/
// percussion đứt quãng: mỗi cú (128.28 · 130.42 · 132.51 · 134.66 · 136.80 · 138.94) là một nét bút.
// "Put them on the axes": hai trục. "Exponential — rising to the right": đường mũ mực vàng đậm.
// "Logarithm beside it": đường log mực xanh. "Draw one line": thước đặt chéo; "y equals x": nét đứt.
// "Fold the whole picture": nửa trên-trái tờ giấy gập theo y = x — chỗ nó nhấc lên lộ mặt bàn tối;
// "watch what happens next": nếp gập dừng gần 90°, chờ. P20 (beat vào lại) gập nốt.
import { prog, smooth, lerp } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { foldMatrix, clipSide } from '../../../../engine/mirror.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { page, inkAll, nib, ruler, INK, paperTimes, FOLD_HOLD } from '../paper.js';

export default class P19 {
  backdrop = false;                                   // trang giấy là nền của cảnh (đảo nền — TREATMENT)
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.T = paperTimes(s.tl);
    this.next = s.tl.at('X becomes Y.');
  }
  camera(t) { return { s: 1 + 0.03 * smooth(prog(t, this.t0, this.T.fold0)), bg: 0 }; }   // trang lặng: đẩy rất chậm
  render(g, t) {
    const T = this.T;
    const c = lerp(1, FOLD_HOLD, smooth(prog(t, T.fold0, T.hold)));
    // nửa dưới-phải đứng yên
    g.save(); if (c < 1) clipSide(g, MIRROR, 1);
    page(g); const tip = inkAll(g, t, T); g.restore();
    // nửa trên-trái: lật quanh gương như tấm bìa
    if (c < 1) {
      g.save(); g.transform(...foldMatrix(MIRROR, c)); clipSide(g, MIRROR, -1);
      page(g); inkAll(g, t, T);
      g.fillStyle = `rgba(30,34,48,${0.35 * (1 - c)})`; g.fillRect(-400, -300, 2720, 1680);   // mặt giấy nghiêng đi → tối lại
      g.restore();
      // bóng nếp gấp trên nửa đứng yên
      g.save(); clipSide(g, MIRROR, 1); g.strokeStyle = `rgba(30,34,48,${0.25 * (1 - c)})`; g.lineWidth = 40; g.filter = 'blur(12px)';
      g.beginPath(); g.moveTo(420, 1080); g.lineTo(1500, 0); g.stroke(); g.restore();
    }
    ruler(g, smooth(prog(t, T.ruler, T.ruler + 0.45)), { lift: smooth(prog(t, T.yx1 + 0.2, T.yx1 + 0.7)) });
    // ngòi bút ở đầu nét đang vẽ
    const drawing = [[T.axes0, T.axes2, tip.h], [T.exp0, T.exp1, tip.e], [T.log0, T.log1, tip.l], [T.yx0, T.yx1, tip.d]].find(([a, b]) => t >= a && t < b);
    if (drawing) nib(g, drawing[2]);
    // nhân vật cầm sổ (khung trung, góc phải dưới), viền mực + bóng như mọi chất liệu trên giấy (LESSONS §13)
    const p = presence(t, this.t0 - 1, T.fold0 - 0.1, { outDur: 0.45 });
    if (p.state === 'hold') this.m.draw(g, 'notebook', 1770, 1250, 960, { ring: 3, ringColor: PAL.ink, shadow: true });
    else if (p.state === 'out') drawTransit(g, this.m, 'notebook', 1770, 1250, 960, 'columns', 'out', p.k, { t, seed: 27 });
    footer(g, this.tl, t, ['axes', 'exponential', 'right', 'logarithm', 'shape', 'line', 'x', 'fold', 'next'],
      { from: this.t0, carry: true, colBase: PAL.ink, colKey: INK.gold });
  }
}
```

- [ ] **Step 4: `index.html`**: thêm `import P19 from './plates/p19-axes.js';` và `[tl.at('Put them on the axes.'), P19]`.
- [ ] **Step 5: NHÌN** `125.6,125.7,126.4,127.4,128.9,130.0,131.3,132.9,134.9,136.6,137.3,138.0,138.8,139.9`. Expected:
  - 125.7: cắt sang trang kẻ ô (lề đỏ, lỗ gáy); nhân vật cầm sổ ở góc phải, có viền mực.
  - Các nét trục, vàng, xanh, nhãn, thước, nét đứt y = x lần lượt hiện theo mốc; ngòi bút ở đầu nét.
  - Nhãn `y = log₂ x` không bị đầu nhân vật che.
  - 138.0–139.9: nửa trên-trái gập lên, lộ mặt bàn tối, dừng ở mép nghiêng.
- [ ] **Step 6: Commit**: `feat(exp-log): P19 — the notebook page, one pen stroke per percussion hit, the page folds on y = x`
---

### Task 6: P20 `fold` (140.09 → 155.70)

**Files:** Create `projects/mv/exp-log/plates/p20-fold.js`; Modify `projects/mv/exp-log/index.html`

- [ ] **Step 1: `projects/mv/exp-log/plates/p20-fold.js`**

```js
// P20 fold — "X thành Y" · 140.09 → 155.70 (TREATMENT P20, beat vào lại, vẫn trên giấy)
// 140.09 beat vào: nếp gập của P19 đập xuống nốt — đường mũ vàng đè khít lên đường log xanh, mực bắn.
// Mở ra lại. "X becomes Y / Y becomes X": hai nhãn trục bay chéo qua gương đổi chỗ. "Every point switches":
// các chấm trên đường vàng nhảy vuông góc qua gương sang đường xanh. "Zero-one turns into one-zero":
// (0, 1) bay thành (1, 0). "Input becomes output on the other side of the screen": INPUT/OUTPUT đổi chỗ,
// cả tờ giấy lật sang mặt sau (mực thấm ngược); "What went forward now comes back": lật về.
// "Same relationship, different track": hai mũi tên chạy trên hai đường ray. "Two different graphs?":
// tờ giấy xé đôi theo gương, hai nửa trôi ra; "Look again": ghép lại; "One is the other seen through the
// mirror": gập lần nữa — trùng khít — rồi cả trang vỡ thành ký hiệu, về nền tối (P21).
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { reflectPoint } from '../../../../engine/mirror.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR, beat } from '../song.js';
import { footer } from '../kit.js';
import { sheet, paperTimes, hand, splat, INK, FOLD_HOLD, AXIS_X, AXIS_Y, EXP_PTS, LOG_PTS } from '../paper.js';
import { G } from '../chorus2.js';

const DOTS = [-2, -1, 0, 1, 1.6];                    // các điểm trên đường mũ nhảy qua gương

export default class P20 {
  backdrop = false;
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.T = paperTimes(s.tl);
    const L = (x) => s.tl.line(x);
    this.xy = L('X becomes Y.'); this.yx = L('Y becomes X.'); this.every = L('Every point switches');
    this.zero = L('Zero-one turns'); this.clean = L('into one-zero clean.');
    this.input = L('Input becomes output'); this.screen = L('on the other side of the screen.');
    this.fwd = L('What went forward'); this.back = L('now comes back.'); this.rel = L('Same relationship,');
    this.two = L('Two different graphs?'); this.again = L('Look again.'); this.one = L('One is the other');
    this.next = s.tl.at('What does this exponent produce?');
  }
  camera(t) {
    const slam = t >= this.t0 + 0.26 ? 1 - smooth(prog(t, this.t0 + 0.26, this.t0 + 0.7)) : 0;
    return { s: 1.03 + 0.05 * slam + 0.03 * Math.sin((t - this.t0) * 0.6), r: 0.012 * Math.sin((t - this.t0) * 0.8), bg: 0 };
  }
  render(g, t) {
    const t0 = this.t0;
    // 1) gập nốt (đập xuống đúng beat), mở lại; 9) gập lần cuối "One is the other"
    const close1 = smooth(prog(t, t0, t0 + 0.26)), open1 = smooth(prog(t, this.xy.words[2].start + 0.15, this.yx.start - 0.05));
    let flap = t < this.xy.words[2].start + 0.15 ? lerp(FOLD_HOLD, -1, close1) : lerp(-1, 1, open1);
    const close2 = smooth(prog(t, this.one.start, this.one.words[3].start));
    if (t >= this.one.start) flap = lerp(1, -1, close2);
    // 6) cả tờ lật sang mặt sau rồi lật về
    const over = smooth(prog(t, this.screen.words[2].start, this.screen.end)), comeback = smooth(prog(t, this.fwd.start, this.back.end));
    const whole = Math.cos(Math.PI * over * (1 - comeback));
    // 8) xé đôi rồi ghép lại
    const tear = 260 * smooth(prog(t, this.two.start, this.two.end)) * (1 - smooth(prog(t, this.again.start, this.again.end)));
    const paint = (c) => {
      sheet(c, t, this.T, { flap, whole: Math.abs(whole) < 0.02 ? 0.02 * Math.sign(whole || 1) : whole, tear, labels: false,
        extra: (cc, back) => { if (!back) this.marks(cc, t); } });
      this.labels(c, t);
    };
    shatter(g, paint, prog(t, this.next - 0.35, this.next), t, { seed: 28 });   // trang vỡ thành ký hiệu → nền tối
    // mực bắn khi nếp gập đập xuống, và khi trùng khít lần cuối
    splat(g, ...G(2, 1), prog(t, t0 + 0.26, t0 + 0.75), { col: INK.gold, seed: 3 });
    splat(g, ...G(2, 1), prog(t, this.one.words[3].start, this.one.words[3].start + 0.5), { col: INK.blue, seed: 9 });
    // nhân vật: chìa tay giới thiệu (khung trung, viền mực) — rồi mời "Look again"
    this.figure(g, t, 'offer', this.every.start - 0.1, this.input.start + 0.6, 29);
    this.figure(g, t, 'invite', this.again.start - 0.05, this.next - 0.6, 30);
    footer(g, this.tl, t, ['x', 'y', 'point', 'mirror', 'zero', 'one', 'input', 'output', 'other', 'forward', 'back', 'relationship', 'graphs', 'again', 'mirror'],
      { from: t0, carry: true, colBase: PAL.ink, colKey: INK.gold });
  }
  figure(g, t, pose, a, b, seed) {
    const p = presence(t, a, b, { inDur: 0.3, outDur: 0.4 });
    if (p.state === 'hold') this.m.draw(g, pose, 1770, 1250, 960, { ring: 3, ringColor: PAL.ink, shadow: true });
    else if (p.state === 'in' || p.state === 'out') drawTransit(g, this.m, pose, 1770, 1250, 960, p.state === 'in' ? 'rows' : 'grid', p.state, p.k, { t, seed });
  }
  /** Nhãn x/y đổi chỗ bay qua gương (vẽ ngoài tờ giấy để không bị lật cùng). */
  labels(g, t) {
    const kx = smooth(prog(t, this.xy.words[2].start, this.xy.words[2].start + 0.5)), ky = smooth(prog(t, this.yx.words[2].start - 0.3, this.yx.words[2].start + 0.2));
    if (t >= this.screen.words[2].start && t < this.back.end) return;            // đang lật: nhãn nằm trên giấy, lật theo
    const fly = (from, to, k) => { const [x, y] = [lerp(from[0], to[0], k), lerp(from[1], to[1], k) - Math.sin(Math.PI * k) * 120]; return [x, y]; };
    const [xx, xy] = fly(AXIS_X, AXIS_Y, kx), [yx, yy] = fly(AXIS_Y, AXIS_X, ky);
    hand(g, 'x', xx, xy, 1, { size: 60, col: kx > 0 && kx < 1 ? INK.gold : PAL.ink });
    hand(g, 'y', yx, yy, 1, { size: 60, col: ky > 0 && ky < 1 ? INK.blue : PAL.ink });
  }
  /** Dấu trên mặt trước tờ giấy: chấm nhảy qua gương, (0,1) → (1,0), INPUT/OUTPUT, mũi tên hai đường ray. */
  marks(g, t) {
    DOTS.forEach((u, i) => {
      const a = G(u, 2 ** u), b = reflectPoint(a, MIRROR), t1 = this.every.start + i * beat.BEAT * 0.5;
      const k = smooth(prog(t, t1, t1 + 0.35));
      if (t < this.every.start - 0.2) return;
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = 'rgba(30,34,48,0.5)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(...a); g.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); g.stroke(); g.setLineDash([]);
      g.fillStyle = INK.gold; g.beginPath(); g.arc(...a, 11, 0, Math.PI * 2); g.fill();
      if (k > 0) { g.fillStyle = INK.blue; g.beginPath(); g.arc(lerp(a[0], b[0], k), lerp(a[1], b[1], k), 11, 0, Math.PI * 2); g.fill(); }
      g.restore();
    });
    // (0, 1) → (1, 0)
    if (t >= this.zero.start) {
      const a = G(0, 1), b = G(1, 0), k = smooth(prog(t, this.clean.words[1].start, this.clean.words[3].start));
      const p = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
      g.save(); g.fillStyle = PAL.ink; g.beginPath(); g.arc(...p, 13, 0, Math.PI * 2); g.fill(); g.restore();
      hand(g, '(0, 1)', a[0] - 150, a[1] - 40, prog(t, this.zero.start, this.zero.start + 0.4), { col: INK.gold, size: 54 });
      hand(g, '(1, 0)', b[0] + 20, b[1] + 50, prog(t, this.clean.words[3].start, this.clean.words[3].start + 0.4), { col: INK.blue, size: 54 });
    }
    // INPUT / OUTPUT đổi chỗ qua gương
    if (t >= this.input.start) {
      const k = smooth(prog(t, this.input.words[2].start, this.input.words[2].start + 0.35));
      const A = [1240, 920], B = reflectPoint(A, MIRROR);
      const P1 = [lerp(A[0], B[0], k), lerp(A[1], B[1], k)], P2 = [lerp(B[0], A[0], k), lerp(B[1], A[1], k)];
      const s = outBack(clamp((t - this.input.start) / 0.2));
      for (const [txt, [x, y], col] of [['INPUT', P1, INK.gold], ['OUTPUT', P2, INK.blue]]) {
        g.save(); g.translate(x, y); g.scale(s, s); g.font = '600 36px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.strokeStyle = col; g.lineWidth = 3; const w = g.measureText(txt).width + 30; g.strokeRect(-w / 2, -28, w, 56);
        g.fillStyle = col; g.fillText(txt, 0, 2); g.restore();
      }
    }
    // hai đường ray: mũi tên vàng tiến trên đường mũ, mũi tên xanh lùi trên đường log
    if (t >= this.fwd.start) {
      const kf = prog(t, this.fwd.start, this.rel.end), kb = prog(t, this.back.start, this.rel.end + 0.6);
      this.runner(g, EXP_PTS, kf, INK.gold); this.runner(g, LOG_PTS, kb, INK.blue);
    }
  }
  runner(g, pts, k, col) {
    if (k <= 0 || k >= 1) return;
    const i = Math.min(pts.length - 2, Math.floor(k * (pts.length - 1))), [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    g.save(); g.translate(x0, y0); g.rotate(Math.atan2(y1 - y0, x1 - x0)); g.fillStyle = col;
    g.beginPath(); g.moveTo(26, 0); g.lineTo(-14, -16); g.lineTo(-14, 16); g.closePath(); g.fill(); g.restore();
  }
}
```

- [ ] **Step 2: `index.html`**: thêm `import P20 from './plates/p20-fold.js';` và `[tl.at('X becomes Y.'), P20]`.
- [ ] **Step 3: NHÌN** `140.05,140.2,140.5,140.9,141.6,142.7,143.4,145.0,146.0,146.9,147.6,148.4,149.5,150.6,152.4,153.3,154.2,155.0,155.6`. Expected:
  - 140.5: gập xong; mặt sau hơi trong, nét vàng thấm qua nằm đúng lên đường xanh; mực bắn ở chỗ trùng.
  - 140.9–141.6: mở lại; x/y đổi chỗ bay qua gương.
  - 142.7–143.4: các chấm nhảy qua gương.
  - 145.0: (0, 1) → (1, 0).
  - 146.9: INPUT/OUTPUT đổi chỗ.
  - 147.6–148.4: cả tờ lật sang mặt sau, **không lộ mép**.
  - 149.5: lật về.
  - 150.6: hai mũi tên chạy trên hai đường.
  - 152.4: tờ giấy xé đôi theo gương.
  - 153.3: ghép lại; nhân vật chìa tay mời.
  - 154.2: gập lần cuối.
  - 155.6: trang vỡ thành ký hiệu trên nền tối.
- [ ] **Step 4: Test + tất định + chỗ nối**

```bash
node --test tools/test/*.test.mjs        # 58 PASS
TS=7.0,35.5,47.5,96.0,113.3,116.6,119.2,122.4,124.9,126.4,132.9,138.0,140.5,143.4,148.4,152.4,155.0
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $TS --outdir out/det4/a
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $(echo $TS | tr ',' '\n' | tac | paste -sd,) --outdir out/det4/b
ls out/det4/a/*.png | wc -l    # phải 17
diff <(cd out/det4/a && md5sum *.png) <(cd out/det4/b && md5sum *.png) && echo "TẤT ĐỊNH OK"
```
Expected: 17 ảnh, `TẤT ĐỊNH OK`.
- [ ] **Step 5: Commit**: `feat(exp-log): P20 — X becomes Y on paper; the page folds, flips, tears and folds again`
---

### Task 7: Render trọn 0 → 155.70, đo, cập nhật tài liệu

Lip-sync mới và việc sửa tất định làm đổi mọi khung có nhân vật. Vì vậy không ghép với các đoạn cũ nữa mà render liền từ 0.

- [ ] **Step 1: Render**

```bash
node engine/render/shoot.js video --page projects/mv/exp-log/index.html --dur 239.65 --from 0 --to 155.70 \
  --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-0-155.mp4
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames:format=duration -of compact out/exp-log-0-155.mp4
```
Expected: `nb_read_frames=9342` (= round(155.70·60)).

- [ ] **Step 2: Đo + tờ 6fps 112.8 → 155.7** (`tools/review.mjs`; `ffmpeg -ss 112.8 … fps=6,tile=20x13`). Kỳ vọng: "Biên độ độ sáng" và "Thời lượng nền sáng" tăng nhờ đoạn giấy.

- [ ] **Step 3: Tài liệu**
  - `docs/character/CHARACTER-V2.md`: thêm bảng 8 tư thế khung trung và mục "Hát nhép v2" (đường bao giọng, bộ miệng B, `toCanvas`).
  - `projects/mv/exp-log/TREATMENT.md` §P18–P20: ghi các lệch có chủ ý:
    - Động cơ = cửa két; cú nổ dời sang 116.42.
    - Trang giấy là trang sổ của nhân vật.
    - P20 thêm lật/xé.
  - `docs/LESSONS.md`: thêm mục "Trạng thái giải mã ảnh phá tất định" (đo được ở 35.50, sửa bằng `toCanvas`).

```bash
git add docs/character/CHARACTER-V2.md projects/mv/exp-log/TREATMENT.md docs/LESSONS.md
git commit -m "docs: character v2.1 (mid-shot poses, vocal lip-sync), treatment P18–P20, lesson on image decode state"
```
