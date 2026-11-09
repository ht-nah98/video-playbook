# exp-log — Kế hoạch 3: verse 2 trong "Ngân hàng của số mũ" + cú bùng nổ điệp khúc 2 (64.32 → 112.80)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng P13–P17. Verse 2 (đoạn lặng) diễn ra trong một sảnh két sắt có các vật nối nhau qua từng cảnh. Pre-chorus 2 đặt sau tấm kính quầy giao dịch, kính rạn theo trống dồn. Cú bùng nổ 98.88 gồm kính vỡ, hai gương, sảnh gương và đồ thị mũ ⇄ log. Giao video 0 → 112.80.

**Architecture:**
- `projects/mv/exp-log/bank.js`: thế giới ngân hàng dùng chung cho P13–P16. Gồm tường ô két và cửa két tròn, chồng xu ×1.07 theo beat, tờ lịch, vạch ×2, ô □, phương trình 1.07^□ = 2, nhãn log₁.₀₇ 2 và mốc 10.2.
- `projects/mv/exp-log/glass.js`: kính quầy, vết rạn theo beat, chữ khắc, dùng cho P16–P17.
- `projects/mv/exp-log/chorus2.js`: dùng cho P17. Gồm đồ thị trong hệ toạ độ có u = v trùng gương, gương thứ hai, mảnh kính và sảnh gương.
- Con dấu của P12 được tách thành `nameStamp` trong `chorus.js` để P13 phá vỡ nó.
- Sàn ký hiệu nhận chữ của chính lời bài (`glyphs`).
- Video: render đoạn 64.32 → 112.80 rồi ghép tiếp sau `out/exp-log-part2.mp4` bằng `tools/stitch.mjs`.

**Tech Stack:** như Kế hoạch 2: JS ES modules, Canvas 2D, Node 22 `node --test`, Chrome headless `engine/render/shoot.js`, ffmpeg/ffprobe, ImageMagick.

**Spec:**
- `projects/mv/exp-log/TREATMENT.md` §P13–P17 và § Bản đồ năng lượng.
- `docs/mv/UPGRADE-NOTES.md`:
  - §0 khách chốt: đoạn lặng thì trôi nhẹ; lúc bùng nổ thì dùng hiệu ứng, camera và đổi phong cách; background là THẾ GIỚI có liên kết; mọi thứ linh hoạt theo lời và câu chuyện.
  - §2: nền làm bằng chính lời bài.
  - §5: hai loài chữ cùng khung.
- Đo năng lượng stem 2026-10-01 (RMS 2s):
  - 64–81: trống + bass, synth tắt (đoạn lặng).
  - 82–90: synth vào lại.
  - 90–94: tắt hẳn.
  - 94–98.8: trống dồn, không có bass.
  - **98.88: bass, percussion và bè vọng cùng vào = bùng nổ.**
  - 112.8–114: ngắt.

**Lệch có chủ ý so với TREATMENT** (đạo diễn quyết; Task 8 sửa TREATMENT cho khớp):
- P15 "already in the game": dùng đường cong tiền của P13 cắt vạch ×2 ở tháng 10.2, thay cho bàn cờ của P04 (P04 đã dựng không có bàn cờ).
- P16: "tấm kính" là kính quầy giao dịch của chính ngân hàng.
- P17: kể điệp khúc 2 bằng đồ thị, không lặp mũi tên và cỗ máy của điệp khúc 1. "Turn it around" gập qua gương như P11b (|c|, chữ không bị ngược).
- P18 (112.80 → 125.66) chuyển sang Kế hoạch 4, cùng với đoạn giấy.

**Code trong kế hoạch này đã chạy thật trên bản sao repo. Chép đúng nguyên văn.** Đã kiểm:
- Ảnh chụp từng cảnh đã được nhìn.
- 52/52 test qua.
- Tất định xuôi/ngược trùng md5 trên 16 mốc.
- P12 trùng md5 sau khi tách `nameStamp`.
- PSNR khung trước/sau mỗi ranh giới cảnh ≥ 25 dB, trừ 98.88 là cú vỡ có chủ ý.

## Global Constraints

- Kế thừa toàn bộ Global Constraints của Kế hoạch 2 (`docs/superpowers/plans/2026-09-30-exp-log-chorus1.md`):
  - Khung 1920×1080, 60fps.
  - Mọi hàm vẽ là hàm thuần của t; CẤM `Math.random`, `Date.now`, `performance.now`.
  - Mốc lời lấy qua `tl.line`/`tl.at`. Lần hát thứ 2 của điệp khúc dùng `tl.line(text, 2)`.
  - Màu lấy từ bảng `PAL`.
  - Chữ không fade.
  - Nhân vật không cắt cứng vào/ra; alpha 1 khi đứng.
  - Cảnh không tô nền đặc toàn khung. Được phép nhuộm ≤ 0.1 alpha theo nửa gương.
  - Camera khai báo bằng `camera(t)`; giá trị ở khung cuối cảnh trước phải bằng khung đầu cảnh sau.
  - Plate không import plate khác.
- Không thêm cú cắt cứng nào trong kế hoạch này.
- Mốc nhạc cụ, nguồn `data/stems.json` hoặc đo RMS stem:
  - `KACHING = [64.49, 64.85]` (percussion).
  - Trống vào lại ở `94.0`.
  - Bè vọng ở `72.0–73.5` và `101.0–114.0`.
- Các hàm thế giới (`vault`, `stacks`, `doubleLine`, `growthCurve`, `doubleMarker`) **tự đặt `globalAlpha`**. Muốn làm mờ thì truyền `alpha` vào từng hàm; bọc `globalAlpha` bên ngoài không có tác dụng.
- `shatter()` không được lồng nhau. Trong một cảnh, các khoảng `shatter` không được chồng thời gian.

## Review Focus

1. **P12 phải trùng từng pixel** sau khi tách `nameStamp` (kiểm ở 63.84, 64.2, 61.8) → Task 2.
2. **Thế giới phải liền qua các ranh giới** 72.46, 81.78, 90.47: chồng xu, lịch, vạch ×2 cùng trạng thái ở hai phía; camera khớp → bước PSNR ở Task 8.
3. **Mốc lời của điệp khúc 2** phải lấy lần hát thứ 2 (`tl.line(text, 2)`), không phải điệp khúc 1 → ảnh P17 ở 99.4/103.9 có đường cong hiện đúng lúc.
4. **Chữ không bị ngược sau cú gập** (P17, 108.9) và **không lộ mép khung** khi camera xoay ở "everywhere" (112.0).
5. **Lối vào P13:** con dấu P12 không tắt cứng ở 64.32 mà vỡ trong 0.32s đầu của P13.

---

## File Structure

| file | trách nhiệm |
|---|---|
| `engine/stage.js` (sửa) | `floorPoint`/`glyphFloor` nhận `glyphs` |
| `projects/mv/exp-log/backdrop.js` (sửa) | tham số `floorGlyphs` |
| `projects/mv/exp-log/chorus.js` (sửa) | thêm `nameStamp(g, t, cut)` |
| `projects/mv/exp-log/plates/p12-name.js` (sửa) | `stamp()` gọi `nameStamp` |
| `projects/mv/exp-log/bank.js` (mới) | thế giới ngân hàng P13–P16 |
| `projects/mv/exp-log/glass.js` (mới) | kính quầy, vết rạn, chữ khắc |
| `projects/mv/exp-log/chorus2.js` (mới) | đồ thị mũ ⇄ log, gương 2, mảnh kính, sảnh gương |
| `projects/mv/exp-log/plates/p13-bank.js` … `p17-mirror2.js` (mới) | 5 cảnh |
| `projects/mv/exp-log/index.html` (sửa) | thêm cảnh vào `order` |
| `tools/test/stage.test.mjs` (sửa) | test `glyphs` |

---

### Task 1: Sàn ký hiệu bằng chữ của lời (`glyphs`)

**Files:** Modify `engine/stage.js`, `projects/mv/exp-log/backdrop.js`, `tools/test/stage.test.mjs`

**Interfaces:**
- Produces:
  - `floorPoint(i, t, { …, glyphs = GLYPHS })` và `glyphFloor(g, t, { …, glyphs = GLYPHS })`.
  - Tham số nền `floorGlyphs`; để `undefined` thì dùng mặc định.
  - Mặc định không đổi gì, nên mọi khung cũ giữ nguyên.

- [ ] **Step 1: Chụp chuẩn trên HEAD (trước khi sửa)**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,23.0,36.9,47.7,57.4,63.9 --outdir out/check/p3-base-before`

- [ ] **Step 2: Thêm test vào cuối `tools/test/stage.test.mjs`**

```js
test('floorPoint: glyphs riêng của cảnh — chỉ lấy chữ trong danh sách', () => {
  const G = ['$', '%', '×1.07'];
  for (let i = 0; i < 200; i++) assert.ok(G.includes(floorPoint(i, 12.3, { glyphs: G }).glyph));
});
```

- [ ] **Step 3: Chạy — phải FAIL.** Lệnh `node --test tools/test/stage.test.mjs` báo lỗi vì glyph vẫn là ký hiệu toán, không thuộc G.

- [ ] **Step 4: `engine/stage.js` — thay toàn bộ file**

```js
// engine/stage.js
// Sân khấu nhiều lớp độ sâu (REFERENCE-TEARDOWN §4): sàn ký hiệu toán phản chiếu ở
// nửa dưới, đường chân trời sáng, vòng chữ đồng tâm, bokeh. Hàm thuần của t.
// Bài học từ engine/backdrop.js reflection(): nền "sống" nhờ ĐIỂM TƯƠNG PHẢN CAO
// nhấp nháy độc lập — không phải một lớp mờ trượt.
import { W, H, hash, clamp } from './lib.js';
import { GLYPHS } from './glyphs.js';
import { arcText } from './typeobj.js';
import { side } from './mirror.js';

/** Điểm thứ i của sàn ký hiệu. v: 0 = chân trời, 1 = sát camera; trôi về phía camera. */
export function floorPoint(i, t, { horizon = 660, speed = 0.06, sway = 16, glyphs = GLYPHS } = {}) {
  const u = hash(i * 3.7), ph = hash(i * 12.3 + 9);
  const v = (hash(i * 8.1 + 5) + t * speed * (0.6 + ph * 0.8)) % 1;
  const d = v * v;                                            // phối cảnh: dồn về chân trời
  const y = horizon + (H - horizon) * (0.02 + 0.98 * d);
  const spread = 0.35 + 1.25 * d;
  const x = W / 2 + (u - 0.5) * 2 * W * spread + Math.sin(t * 0.5 + ph * 9) * sway * spread;   // rộng gấp đôi khung: camera dịch/xoay không lộ mép
  const tw = 0.3 + 0.7 * Math.pow(Math.abs(Math.sin(t * (1.1 + ph * 2.4) + ph * 6.3)), 2.4);
  const edge = clamp(Math.min(v / 0.08, (1 - v) / 0.08));     // sinh/tắt mềm ở hai đầu → không giật khi quấn
  return { x, y, size: 9 + 25 * d, a: tw * edge * (0.35 + 0.65 * d), glyph: glyphs[Math.floor(ph * glyphs.length)] };
}

/**
 * Sàn ký hiệu. colA/colB: hai màu; nếu truyền `mirror` (đường gương) thì màu theo
 * phía của điểm (side > 0 → colA), không thì xen kẽ theo i. `glyphs`: chữ của sàn —
 * mặc định ký hiệu toán; cảnh truyền từ khoá của chính lời đang hát ($, %, ×1.07 …).
 */
export function glyphFloor(g, t, { horizon = 660, n = 760, beat = null, colA = '#FFB547', colB = '#3FB8FF',
  mirror = null, alpha = 1, speed = 0.06, glyphs = GLYPHS } = {}) {
  if (alpha <= 0) return;
  const b = beat ? beat.onBeat(t, 0.3) : 0;
  g.save();
  g.globalCompositeOperation = 'lighter'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const p = floorPoint(i, t, { horizon, speed, glyphs });
    if (p.a <= 0.01) continue;
    g.globalAlpha = clamp(alpha * p.a * (0.85 + 0.3 * b));
    g.fillStyle = mirror ? (side([p.x, p.y], mirror) > 0 ? colA : colB) : (i % 3 === 0 ? colB : colA);
    g.font = `500 ${Math.round(p.size)}px "IBM Plex Mono"`;
    g.fillText(p.glyph, p.x, p.y);
  }
  g.restore();
}

/** Đường chân trời sáng: dải quầng + một nét mảnh. */
export function horizonGlow(g, { y = 660, color = '#FFB547', alpha = 1 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createLinearGradient(0, y - 90, 0, y + 90);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.globalAlpha = 0.16 * alpha; g.fillStyle = gr; g.fillRect(-W, y - 90, 3 * W, 180);     // rộng gấp ba: camera không lộ mép
  g.globalAlpha = 0.55 * alpha; g.fillStyle = color; g.fillRect(-W, y - 1, 3 * W, 2);
  g.restore();
}

/** Vòng chữ đồng tâm quay ngược chiều nhau (mặt trời/vòng sau lưng nhân vật của video mẫu). */
export function textRings(g, t, cx, cy, { texts = ['2³ = 8'], r0 = 300, gap = 64, n = 4, spin = 0.12,
  colors = ['#FFB547', '#3FB8FF'], alpha = 1, font = '500 26px "IBM Plex Mono"' } = {}) {
  if (alpha <= 0) return;
  g.save(); g.font = font;
  for (let k = 0; k < n; k++) {
    const r = r0 + k * gap, txt = texts[k % texts.length] + '  ·  ';
    const reps = Math.max(1, Math.floor((2 * Math.PI * r) / g.measureText(txt).width));
    const a0 = t * spin * (k % 2 ? -1 : 1) / (1 + k * 0.3);
    arcText(g, txt.repeat(reps), cx, cy, r, a0, { font, color: colors[k % colors.length], alpha: alpha * (0.75 - k * 0.12) });
  }
  g.restore();
}

/** Bokeh: đĩa sáng mềm trôi chậm lên trên. */
export function bokeh(g, t, { n = 14, colors = ['#FFB547', '#3FB8FF'], alpha = 1, seed = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const h1 = hash(i * 4.3 + seed), h2 = hash(i * 9.7 + seed + 1), h3 = hash(i * 2.9 + seed + 2);
    const r = 30 + h3 * 90;
    const x = h1 * W + Math.sin(t * 0.2 + i) * 40;
    const y = ((h2 * (H + 2 * r) - t * (8 + h3 * 14)) % (H + 2 * r) + H + 2 * r) % (H + 2 * r) - r;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, colors[i % colors.length]); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.globalAlpha = alpha * (0.06 + 0.08 * h1);
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}
```

- [ ] **Step 5: `projects/mv/exp-log/backdrop.js` — thay toàn bộ file**

```js
// Nền exp-log: navy (không đen tuyền — tóc nhân vật tối) + quầng sáng thở theo beat.
// Bám BEAT, không bám lời (29% từ rơi gần beat).
// Từ Kế hoạch 2: các lớp sân khấu (engine/stage.js) bật theo cảnh — mặc định TẮT,
// nên P01–P08 giữ nguyên từng pixel.
import { W, H } from '../../../engine/lib.js';
import { glyphFloor, horizonGlow, textRings, bokeh as bokehLayer } from '../../../engine/stage.js';
import { PAL, MIRROR } from './song.js';

export function backdrop(g, t, { beat, haloX = 960, haloY = 600, haloR = 620, glow = 1,
  floor = 0, floorA = PAL.fwd, floorB = PAL.back, mirror = false, horizon = 660,
  rings = null, bokeh = 0, floorGlyphs = undefined } = {}) {
  const p = beat ? beat.beatPulse(t, 0.18) : 0;
  g.save();
  const r = haloR * (1 + 0.04 * p);
  const gr = g.createRadialGradient(haloX, haloY, 0, haloX, haloY, r);
  gr.addColorStop(0, PAL.halo); gr.addColorStop(1, 'rgba(22,32,58,0)');
  g.globalAlpha = glow * (0.85 + 0.15 * p);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.restore();
  if (bokeh > 0) bokehLayer(g, t, { alpha: bokeh, colors: [floorA, floorB] });
  if (rings) textRings(g, t, rings.cx ?? 960, rings.cy ?? 540, { ...rings, colors: rings.colors ?? [floorA, floorB] });
  if (floor > 0) {
    horizonGlow(g, { y: horizon, color: floorA, alpha: floor });
    glyphFloor(g, t, { horizon, beat, colA: floorA, colB: floorB, mirror: mirror ? MIRROR : null, alpha: floor, glyphs: floorGlyphs });
  }
}
```

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Kiểm bản cũ không đổi**

```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,23.0,36.9,47.7,57.4,63.9 --outdir out/check/p3-base-after
diff <(cd out/check/p3-base-before && md5sum *.png) <(cd out/check/p3-base-after && md5sum *.png) && echo "CŨ KHÔNG ĐỔI"
```
Expected: `CŨ KHÔNG ĐỔI`.

- [ ] **Step: Commit**

```bash
git add engine/stage.js projects/mv/exp-log/backdrop.js tools/test/stage.test.mjs
git commit -m "feat(engine): glyph floor takes the words of the lyric"
```

---

### Task 2: Con dấu LOGARITHM thành hàm dùng chung (`nameStamp`)

**Files:** Modify `projects/mv/exp-log/chorus.js`, `projects/mv/exp-log/plates/p12-name.js`

**Interfaces:**
- Produces: `nameStamp(g, t, cut)` trong `chorus.js`.
  - Vẽ đúng con dấu P12: loé 2 khung, gương, chữ LOGARITHM có ruột lấp, khung log₂ 8 = [3].
  - P13 gọi hàm này bên trong `shatter` để phá con dấu.

- [ ] **Step 1: Chụp chuẩn P12 trước khi sửa**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 61.8,63.84,64.2 --outdir out/check/p12-before`

- [ ] **Step 2: `projects/mv/exp-log/chorus.js` — thay toàn bộ file**

```js
// Hình dùng chung của điệp khúc 1 (P11a, P11b, P12): cặp 3 → 8 / 8 → 3 hai bên gương,
// cỗ máy hai khe, kính vạn hoa. Các cảnh gọi CÙNG hàm với cùng t → nối liền qua ranh giới cảnh.
// Toạ độ đặt sao cho ảnh qua gương MIRROR (x + y = 1500) vẫn trong khung:
// điểm phía vàng cần 420 ≤ x ≤ 1500 và x + y > 1500.
import { fillWord } from '../../../engine/fill.js';
import { clamp, prog, outBack, outExpo, smooth, hash } from '../../../engine/lib.js';
import { reflectPoint, drawMirrorLine } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';

export const FWD_AT = [1330, 890];                           // hàng vàng "3 → 8" (nửa dưới-phải)
export const BACK_AT = reflectPoint(FWD_AT, MIRROR);          // hàng xanh "8 → 3" = ảnh của nó qua gương

/** Một hàng "a → b": a hiện ở t0, mũi tên bắn ra ở tShoot, b bật ra khi mũi tên tới. */
export function arrowRow(g, t, [cx, cy], a, b, t0, tShoot, col, { size = 80, alpha = 1 } = {}) {
  if (t < t0) return;
  g.save(); g.globalAlpha = alpha;
  g.font = `900 ${size}px "Archivo"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col;
  const gap = size * 1.9, pa = outBack(clamp((t - t0) / 0.18));
  g.save(); g.translate(cx - gap, cy); g.scale(pa, pa); g.fillText(a, 0, 0); g.restore();
  const e = outExpo(prog(t, tShoot, tShoot + 0.3));
  if (e > 0) {
    const x0 = cx - gap * 0.6, x1 = x0 + gap * 1.2 * e;
    g.strokeStyle = col; g.lineWidth = size * 0.1; g.lineCap = 'round'; g.shadowColor = col; g.shadowBlur = 20;
    g.beginPath(); g.moveTo(x0, cy); g.lineTo(x1, cy);
    g.moveTo(x1, cy); g.lineTo(x1 - size * 0.25, cy - size * 0.2); g.moveTo(x1, cy); g.lineTo(x1 - size * 0.25, cy + size * 0.2);
    g.stroke(); g.shadowBlur = 0;
    const pb = outBack(clamp((t - tShoot - 0.25) / 0.18));
    if (pb > 0) { g.save(); g.translate(cx + gap, cy); g.scale(pb, pb); g.fillText(b, 0, 0); g.restore(); }
  }
  g.restore();
}

/** Bánh răng z răng, bán kính r, góc a. */
function gear(g, x, y, r, z, a, col) {
  g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = col; g.beginPath();
  for (let i = 0; i < z * 2; i++) {
    const rr = i % 2 ? r : r * 1.18, a0 = (i / (z * 2)) * Math.PI * 2, a1 = ((i + 1) / (z * 2)) * Math.PI * 2;
    g.lineTo(Math.cos(a0) * rr, Math.sin(a0) * rr); g.lineTo(Math.cos(a1) * rr, Math.sin(a1) * rr);
  }
  g.closePath(); g.fill();
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(0, 0, r * 0.35, 0, Math.PI * 2); g.fill();
  g.restore();
}

/**
 * Cỗ máy hai khe giữa khung. spin(t) = góc bánh răng (âm = chạy ngược).
 * inCh/outCh: ký tự bay vào khe trái / bật ra khe phải (khi rev = true thì vào phải, ra trái).
 * inFrom: khoảng cách từ tâm nơi ký tự vào đang nằm chờ (P11b: số 8 P11a vừa nhả ra ở 460).
 */
export function machine(g, t, { tIn, spin, rev = false, inCh, inAt, inFrom = 720, outCh, outAt, col }) {
  const k = outBack(clamp((t - tIn) / 0.3));
  if (k <= 0) return;
  g.save(); g.translate(960, 560); g.scale(k, k);
  g.fillStyle = PAL.halo; g.strokeStyle = col; g.lineWidth = 6;
  g.fillRect(-300, -170, 600, 340); g.strokeRect(-300, -170, 600, 340);
  gear(g, -70, -10, 70, 10, spin, col); gear(g, 70, 40, 52, 8, -spin * 1.35 + 0.3, PAL.truth);
  // hai khe: trái = SỐ MŨ, phải = GIÁ TRỊ
  g.font = '500 24px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillStyle = PAL.truth;
  g.fillText('EXPONENT', -380, -110); g.fillText('VALUE', 380, -110);
  g.fillStyle = col; g.fillRect(-318, -60, 18, 120); g.fillRect(300, -60, 18, 120);
  g.font = '900 110px "Archivo"'; g.textBaseline = 'middle';
  const sideIn = rev ? 1 : -1;
  const fin = smooth(prog(t, inAt - 0.35, inAt));              // ký tự bay vào khe
  if (fin < 1 && (fin > 0 || inFrom < 720)) g.fillText(inCh, sideIn * (inFrom - (inFrom - 340) * fin), 0);
  if (t >= outAt) g.fillText(outCh, -sideIn * (340 + 120 * outBack(clamp((t - outAt) / 0.3))), 0);   // bật ra khe kia
  g.restore();
}

/** Tâm các ô kính vạn hoa phía vàng: lưới dọc theo gương (u) và vuông góc về phía vàng (n). */
export function kaleidoCells() {
  const u = [Math.SQRT1_2, -Math.SQRT1_2], n = [Math.SQRT1_2, Math.SQRT1_2], out = [];
  for (let j = 1; j <= 3; j++) for (let i = -3; i <= 3; i++)
    out.push({ p: [960 + i * 320 * u[0] + j * 230 * n[0], 540 + i * 320 * u[1] + j * 230 * n[1]], ring: Math.abs(i) + j });
  return out;
}

/** Kính vạn hoa: mỗi ô là "3→8" vàng phía này và ảnh "8→3" xanh phía kia, nở dần từ gương ra mép. */
export function kaleido(g, t, t0) {
  g.save(); g.font = '900 54px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (const { p, ring } of kaleidoCells()) {
    const k = outBack(clamp((t - t0 - ring * 0.12) / 0.3));
    if (k <= 0) continue;
    const q = reflectPoint(p, MIRROR), wob = 0.08 * Math.sin(t * 2 + ring);
    for (const [[x, y], s, col] of [[p, '3→8', PAL.fwd], [q, '8→3', PAL.back]]) {
      g.save(); g.translate(x, y); g.rotate(wob); g.scale(k, k); g.fillStyle = col; g.fillText(s, 0, 0); g.restore();
    }
  }
  g.restore();
}

/** Mọi điểm của kính vạn hoa (hai phía) — nguồn cho morph co về ô □ ở P12. */
export function kaleidoPoints() {
  return kaleidoCells().flatMap(({ p }) => [p, reflectPoint(p, MIRROR)])
    .flatMap(([x, y], i) => [0, 1, 2, 3].map(j => [x - 50 + 33 * j + 6 * hash(i + j), y]));
}

/** Con dấu "Nó có tên": LOGARITHM khổng lồ + log₂ 8 = [3] (P12 đóng ở 63.82, P13 phá vỡ nó). */
export function nameStamp(g, t, cut) {
  const dt = t - cut;
  // loé 2 khung ở cú cắt (luật video mẫu: cắt cứng đi kèm vật đập xuống hoặc loé trắng)
  if (dt < 0.05) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(244,241,234,0.3)'; g.fillRect(0, 0, 1920, 1080); g.restore(); }
  drawMirrorLine(g, MIRROR, 1, { width: 6, glow: 30 });
  // LOGARITHM khổng lồ, ruột lấp chữ nhỏ
  const sw = outBack(clamp(dt / 0.18));
  g.save(); g.font = '900 230px "Archivo"';
  const w = g.measureText('LOGARITHM').width;
  g.translate(960, 250); g.scale(sw, sw);
  fillWord(g, 'LOGARITHM', -w / 2, 0, { font: '900 230px "Archivo"', color: PAL.back, innerColor: PAL.backCore,
    inner: ['log₂8 = 3', 'log₂16 = 4', 'log₁₀1000 = 3', 'log₂2 = 1', 'log₂1 = 0'], drift: t * 80 });
  g.restore();
  // con dấu log₂ 8 = 3 đập xuống, nghiêng; ô □ giờ xanh, ôm số 3
  const s = 1 + 0.6 * (1 - outBack(clamp(dt / 0.18)));
  g.save(); g.translate(960, 640); g.rotate(-0.06); g.scale(s, s);
  g.strokeStyle = PAL.truth; g.lineWidth = 10; g.strokeRect(-470, -150, 940, 300);
  g.fillStyle = PAL.truth; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.font = '900 170px "Archivo"'; g.fillText('log', -420, 60);
  g.font = '900 90px "Archivo"'; g.fillText('2', -140, 110);
  g.font = '900 170px "Archivo"'; g.fillText('8 =', -60, 60);
  g.fillStyle = PAL.back; g.fillText('3', 250, 60);
  g.strokeStyle = PAL.back; g.lineWidth = 12; g.strokeRect(225, -85, 150, 170);
  g.restore();
}
```

- [ ] **Step 3: `projects/mv/exp-log/plates/p12-name.js` — thay toàn bộ file**

```js
// P12 name — "Nó có tên rồi" · 60.20 → 64.32 ✂ 63.82 (TREATMENT P12, post-chorus)
// Kính vạn hoa co về một ô □ (ký hiệu nổ rồi tụ). Bass tắt: chỉ còn `2^□` đỏ lơ lửng.
// "Now it has a name": ba chữ l-o-g bay vào ô. 63.82 CẮT CỨNG + con dấu: log₂ 8 = 3, ô chuyển xanh,
// chữ LOGARITHM khổng lồ ruột lấp log₂8=3 · log₂16=4 · log₁₀1000=3 …
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { drawMirrorLine, clipSide } from '../../../../engine/mirror.js';
import { drawMorph, squarePoints, shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { kaleido, kaleidoPoints, nameStamp } from '../chorus.js';

const BOX = [1030, 430], BS = 130;                // ô số mũ, cạnh ô
const LETTERS = [['l', [-400, 200]], ['o', [2300, 120]], ['g', [1100, 1300]]];   // chữ bay từ ba phía

export default class P12 {
  async init(s) {
    this.tl = s.tl;
    this.q = s.tl.line('Backward question.');
    this.kal = s.tl.at('Forward and backward—');     // kính vạn hoa của P11b nở từ mốc này
    this.miss = s.tl.at('Missing exponent.');
    this.named = s.tl.line('Now it has a name—');
    this.cut = s.tl.at('logarithm.');
    this.src = kaleidoPoints(); this.dst = squarePoints(BOX[0], BOX[1], BS, 120);
  }
  backdropAt(t) {
    if (t >= this.cut) return { glow: 1, horizon: 760, floor: 1, mirror: true, bokeh: 0.8 };   // sau cú cắt: sân khấu bừng lại
    const k = smooth(prog(t, this.t0, this.miss));              // bass tắt 59.5–64.4: sân khấu tắt dần, chỉ còn ô □
    return { glow: 0.7 * (1 - 0.6 * k), horizon: 760, floor: 1 - k, mirror: true, bokeh: 0.8 * (1 - k) };
  }
  camera(t) {
    if (t >= this.cut) return { s: 1 + 0.1 * (1 - smooth(prog(t, this.cut, this.cut + 0.45))), bg: 0 };   // cú đập ở con dấu
    const back = smooth(prog(t, this.t0, this.t0 + 1.0));      // từ đúng khung cuối P11b về thẳng
    return { s: lerp(1.08, 1, back), r: lerp(0.25, 0, back), bg: 0 };
  }
  render(g, t) {
    if (t >= this.cut) return this.stamp(g, t);
    const fade = 1 - smooth(prog(t, this.t0, this.miss));       // gương và hai nửa màu tắt dần cùng bass
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07 * fade; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    drawMirrorLine(g, MIRROR, fade, { width: 6, glow: 30 });
    // kính vạn hoa vỡ, các ký hiệu tụ về chu vi ô □
    if (t < this.t0 + 0.3) shatter(g, c => kaleido(c, t, this.kal), prog(t, this.t0, this.t0 + 0.3), t, { seed: 13 });
    drawMorph(g, this.src, this.dst, prog(t, this.t0 + 0.1, this.miss - 0.1), t, { colA: PAL.fwd, colB: PAL.block, n: 240 });
    // 2^□: ô đỏ lơ lửng ở chỗ số mũ, chữ 2 hiện khi "Missing exponent"
    const box = t >= this.miss - 0.1;
    if (box) this.box(g, t, PAL.block);
    if (t >= this.miss) {
      const s = outBack(clamp((t - this.miss) / 0.2));
      g.save(); g.translate(880, 640); g.scale(s, s);
      g.font = '900 300px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'right'; g.fillText('2', 0, 0); g.restore();
    }
    // l-o-g bay vào ô từ ba phía, đáp đúng chữ "name"
    const land = this.named.words[4].start;
    LETTERS.forEach(([ch, [x0, y0]], i) => {
      const k = smooth(prog(t, this.named.start + 0.08 * i, land));
      if (k <= 0) return;
      const x = lerp(x0, BOX[0] - 34 + 34 * i, k), y = lerp(y0, BOX[1] + 14, k);
      g.save(); g.font = '800 52px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = PAL.truth;
      g.fillText(ch, x, y); g.restore();
    });
    footer(g, this.tl, t, ['backward', 'missing', 'exponent', 'name'], { from: this.t0, carry: true });
  }
  box(g, t, col) {
    const bob = Math.sin(t * 3) * 8;
    g.save(); g.translate(BOX[0], BOX[1] + bob);
    g.strokeStyle = col; g.lineWidth = 12; g.shadowColor = col; g.shadowBlur = 24;
    g.strokeRect(-BS / 2, -BS / 2, BS, BS); g.restore();
  }
  stamp(g, t) {
    nameStamp(g, t, this.cut);
    footer(g, this.tl, t, ['logarithm'], { from: this.t0 });
  }
}
```

- [ ] **Step 4: P12 trùng từng pixel (Review Focus #1)**

```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 61.8,63.84,64.2 --outdir out/check/p12-after
diff <(cd out/check/p12-before && md5sum *.png) <(cd out/check/p12-after && md5sum *.png) && echo "P12 SAME"
```
Expected: `P12 SAME`.
- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/chorus.js projects/mv/exp-log/plates/p12-name.js
git commit -m "refactor(exp-log): LOGARITHM stamp is shared (nameStamp) so P13 can break it"
```

---

### Task 3: Thế giới ngân hàng (`bank.js`) + P13 `bank` (64.32 → 72.46)

**Files:** Create `projects/mv/exp-log/bank.js`, `projects/mv/exp-log/plates/p13-bank.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`bank.js`):
  - Hằng số và toạ độ: `BASE, U, RATE, colX(n), valY(v), DOUBLE_AT, KACHING, BANK_GLYPHS, CAL_Q, EQ, EQ_BOX, EQ_BS`.
  - Thời gian theo tháng: `monthTimes(kaching, every, last=12)`, `monthAt(times, t)`.
  - Thế giới: `vault(g, t, {alpha, doorSpin})`, `stacks(g, t, times, {alpha})`, `growthCurve(g, v1, {alpha, col, width})`, `doubleLine(g, t, k, {alpha})`, `calendar(g, t, month, flipAt, {x, y, label, labelCol, appear})`.
  - Phương trình và nhãn: `unknownBox(g, t, x, y, s, {col, lid, bob})`, `hiddenEq(g, t, {k2, box, boxCol, lid, alpha, eqX})`, `logLabel(g, x, y, k, {size, text})`, `doubleMarker(g, t, k, {alpha})`.
- Consumes:
  - `nameStamp` (Task 2) và `floorGlyphs` (Task 1).
  - `shatter`, `presence`, `figure`, `footer`, `powText`.
  - `decodeChars`: trả về mảng `{ch, state}`, nên phải lọc `state !== 'hidden'` rồi nối `ch`.
- Camera cuối P13: `{ s: 1.05, cy: 500, bg: 0 }`.
- Nền cuối P13: `glow 0.425, floor 0.3825, floorB = PAL.fwd`.

**Spec (TREATMENT P13 + bản đồ năng lượng):**
- 64.32 "Money in the bank"; 64.49 ka-ching.
- "same percent every month": mỗi beat thêm một chồng xu ×1.07.
- "One little multiplier": nhãn ×1.07.
- "How much after ten?": câu hỏi bị gạch đỏ.
- "Ask the harder question": khung tối lại, chỉ còn vạch ×2.
- "When will it double?": tờ lịch lật tìm tháng, dừng ở "?".
- Đây là đoạn lặng: chỉ trôi nhẹ (tường ô két trôi, sàn chữ $ %), chỉ nhấn ở cú ka-ching.

- [ ] **Step 1: `projects/mv/exp-log/bank.js`**

```js
// "Ngân hàng của số mũ" — thế giới dùng chung của verse 2 (P13 → P15, cửa két quay lại ở P18).
// Một sảnh két sắt: tường ô két trôi chậm phía sau, cửa két tròn, các chồng xu đứng trên chân trời,
// mỗi tháng một chồng cao gấp 1.07 chồng trước → đỉnh các chồng vạch đúng đường cong mũ.
// Các cảnh gọi CÙNG hàm với cùng t → thế giới nối liền qua ranh giới cảnh.
import { clamp, prog, outBack, smooth, hash } from '../../../engine/lib.js';
import { PAL, beat } from './song.js';

export const BASE = 760;                  // chân các chồng xu = đường chân trời của sân khấu
export const U = 150;                     // px cho giá trị 1
export const RATE = 1.07;
export const colX = (n) => 400 + n * 88;  // tháng n → x
export const valY = (v) => BASE - v * U;  // giá trị → y
export const KACHING = [64.49, 64.85];   // data/stems.json: percussion — máy tính tiền (TREATMENT § Mốc nhạc cụ)
export const BANK_GLYPHS = ['$', '%', '$', '¢', '%', '$', '1.07'];   // sàn sảnh: chữ của chính lời (UPGRADE-NOTES §2)
export const DOUBLE_AT = Math.log(2) / Math.log(RATE);   // 10.24 tháng: log₁.₀₇ 2

/** Mốc tháng n hiện ra: tháng 0 ở cú ka-ching, tháng 1… mỗi beat một tháng kể từ `every`. */
export function monthTimes(kaching, every, last = 12) {
  const k0 = Math.ceil((every - beat.T0) / beat.BEAT);
  return [kaching, ...Array.from({ length: last }, (_, i) => beat.beatT(k0 + i))];
}

/** Tháng đã hiện tới lúc t (−1 nếu chưa có). */
export const monthAt = (times, t) => times.reduce((m, tm, n) => (t >= tm ? n : m), -1);

/** Tường ô két + cửa két tròn: thế giới phía sau, trôi chậm theo t (không bám beat). */
export function vault(g, t, { alpha = 1, doorSpin = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalAlpha = alpha;
  g.strokeStyle = '#22305A'; g.lineWidth = 2;
  const off = -((t * 9) % 160);
  for (let y = 70; y < 700; y += 106) for (let x = -320 + off; x < 2240; x += 160) {
    const r = hash(Math.round((x - off) / 160) * 7.1 + y * 0.37);
    g.strokeRect(x, y, 150, 96);
    g.beginPath(); g.arc(x + 75, y + 48, 7, 0, Math.PI * 2); g.stroke();
    if (r > 0.86) { g.fillStyle = 'rgba(255,181,71,0.10)'; g.fillRect(x + 2, y + 2, 146, 92); }   // vài ô đang sáng đèn
  }
  // cửa két tròn: vành, bu-lông, tay quay — chính nó là "động cơ" ở P18
  const cx = 1380, cy = 330, R = 230;
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(cx, cy, R + 14, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#2C3D6B'; g.lineWidth = 6;
  for (const r of [R, R - 34, 70]) { g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
  g.fillStyle = '#2C3D6B';
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; g.beginPath(); g.arc(cx + Math.cos(a) * (R - 17), cy + Math.sin(a) * (R - 17), 6, 0, Math.PI * 2); g.fill(); }
  const a0 = doorSpin + t * 0.08;
  g.lineWidth = 10; g.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const a = a0 + i * Math.PI / 3;
    g.beginPath(); g.moveTo(cx - Math.cos(a) * 150, cy - Math.sin(a) * 150); g.lineTo(cx + Math.cos(a) * 150, cy + Math.sin(a) * 150); g.stroke();
  }
  g.restore();
}

/** Một chồng xu cao h px, chân (x, BASE). */
function stack(g, x, h, { col = PAL.fwd, core = PAL.fwdCore, w = 56 } = {}) {
  if (h <= 0) return;
  const top = BASE - h;
  g.fillStyle = col; g.fillRect(x - w / 2, top, w, h);
  g.strokeStyle = 'rgba(11,15,30,0.45)'; g.lineWidth = 2;
  g.beginPath();
  for (let y = BASE - 11; y > top + 4; y -= 11) { g.moveTo(x - w / 2, y); g.lineTo(x + w / 2, y); }
  g.stroke();
  g.fillStyle = core; g.beginPath(); g.ellipse(x, top, w / 2, 8, 0, 0, Math.PI * 2); g.fill();
}

/**
 * Các chồng xu tới tháng hiện tại. times = monthTimes(...); mỗi chồng mọc lên (outBack) ở mốc của nó.
 * Trả toạ độ đỉnh chồng mới nhất (cho token ×1.07 nhảy theo).
 */
export function stacks(g, t, times, { alpha = 1 } = {}) {
  g.save(); g.globalAlpha = alpha;
  times.forEach((tm, n) => {
    if (t < tm) return;
    const k = outBack(clamp((t - tm) / 0.25));
    stack(g, colX(n), RATE ** n * U * k);
  });
  // nhãn tháng dưới chân (mono nhỏ) — trục thời gian của thế giới
  g.font = '500 22px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = PAL.fwdCore;
  times.forEach((tm, n) => { if (t >= tm) g.fillText(String(n), colX(n), BASE + 14); });
  g.restore();
}

/** Đường cong mũ qua đỉnh các chồng (vàng) — vạch tới tháng v1. */
export function growthCurve(g, v1, { alpha = 1, col = PAL.fwd, width = 5 } = {}) {
  if (v1 <= 0 || alpha <= 0) return;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.shadowColor = col; g.shadowBlur = 18;
  g.beginPath();
  for (let v = 0; v <= v1; v += 0.05) { const x = colX(v), y = valY(RATE ** v); v === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
  g.stroke(); g.restore();
}

/** Vạch ×2 nằm ngang: mục tiêu "gấp đôi". k = tiến độ vạch từ trái sang phải. */
export function doubleLine(g, t, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  const y = valY(2), x0 = colX(-0.6), x1 = colX(-0.6) + (colX(12.8) - colX(-0.6)) * k;
  g.save(); g.globalAlpha = alpha;
  g.setLineDash([18, 12]); g.lineDashOffset = -t * 40; g.strokeStyle = PAL.truth; g.lineWidth = 4;
  g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); g.setLineDash([]);
  if (k >= 1) { g.font = '900 54px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('×2', colX(12.8) + 18, y); }
  g.restore();
}

/** Tờ lịch treo tường: tháng hiện tại; lật trang (co dọc) mỗi lần đổi. `label` thay số (vd. '?'). */
export function calendar(g, t, month, flipAt, { x = 200, y = 120, label = null, labelCol = PAL.block, appear = 1 } = {}) {
  if (appear <= 0) return;
  const f = clamp((t - flipAt) / 0.14), sy = f < 1 ? Math.abs(Math.cos(Math.PI * f)) : 1;
  g.save(); g.translate(x + 115, y); g.scale(appear, appear * Math.max(sy, 0.05));
  g.fillStyle = PAL.paper; g.fillRect(-115, 0, 230, 250);
  g.fillStyle = PAL.block; g.fillRect(-115, 0, 230, 52);
  g.fillStyle = PAL.paper; g.font = '600 24px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('MONTH', 0, 27);
  const txt = label ?? String(month);
  g.fillStyle = label ? labelCol : PAL.ink; g.font = `900 ${txt.length > 2 ? 92 : 140}px "Archivo"`;   // "10.2" vừa tờ lịch
  g.fillText(txt, 0, 158);
  g.restore();
}

// ── Ô □ và phương trình 1.07^□ = 2 (P14 dựng, P15 mở hộp, P16 khắc lên kính) ──
export const CAL_Q = [315, 278];                                // dấu "?" trên tờ lịch (toạ độ khung)
export const EQ = { x: 880, y: 380, size: 170 };                 // "1.07" lớn, căn giữa tại x
export const EQ_BOX = [1140, 232], EQ_BS = 92;                  // chỗ số mũ

/** Ô □ đỏ: cạnh s, nhấp nhô theo t. lid ∈ [0,1]: nắp mở (P15). */
export function unknownBox(g, t, x, y, s, { col = PAL.block, lid = 0, bob = 1 } = {}) {
  const yy = y + Math.sin(t * 3) * 6 * bob;
  g.save(); g.translate(x, yy);
  g.strokeStyle = col; g.lineWidth = Math.max(4, s * 0.09); g.shadowColor = col; g.shadowBlur = 22;
  g.beginPath(); g.moveTo(-s / 2, -s / 2); g.lineTo(-s / 2, s / 2); g.lineTo(s / 2, s / 2); g.lineTo(s / 2, -s / 2); g.stroke();
  if (lid > 0) {                                     // mở nắp: lòng hộp trống trơn, một luồng sáng trắng đi lên
    const gr = g.createLinearGradient(0, -s / 2, 0, -s / 2 - 260 * lid);
    gr.addColorStop(0, 'rgba(244,241,234,0.32)'); gr.addColorStop(1, 'rgba(244,241,234,0)');
    g.save(); g.shadowBlur = 0; g.fillStyle = gr;
    g.beginPath(); g.moveTo(-s / 2, -s / 2); g.lineTo(s / 2, -s / 2); g.lineTo(s * 1.1, -s / 2 - 260 * lid); g.lineTo(-s * 1.1, -s / 2 - 260 * lid); g.fill();
    g.restore();
  }
  // nắp: bản lề ở góc trên-phải, mở tới 110°
  g.translate(s / 2, -s / 2); g.rotate(-lid * 1.92);
  g.beginPath(); g.moveTo(0, 0); g.lineTo(-s, 0); g.stroke();
  g.restore();
}

/** "1.07" lớn + ô □ ở số mũ + "= 2" (k2: tiến độ "= 2", 0 → không có). */
export function hiddenEq(g, t, { k2 = 0, box = true, boxCol = PAL.block, lid = 0, alpha = 1, eqX = 1330 } = {}) {
  g.save(); g.globalAlpha = alpha;
  g.font = `900 ${EQ.size}px "Archivo"`; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  g.shadowColor = PAL.bg; g.shadowBlur = 24; g.fillText('1.07', EQ.x, EQ.y); g.shadowBlur = 0;
  if (k2 > 0) {
    const s = outBack(clamp(k2));
    g.save(); g.translate(eqX, EQ.y - 60); g.scale(s, s); g.textBaseline = 'middle';
    g.fillText('=', -70, 0); g.fillStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 30; g.fillText('2', 60, 0);
    g.restore();
  }
  g.restore();
  if (box) unknownBox(g, t, EQ_BOX[0], EQ_BOX[1], EQ_BS, { col: boxCol, lid });
}

/** Nhãn log₁.₀₇ 2 trong khung xanh — tên của số mũ. (x, y) = tâm trái của khung; k = tỉ lệ hiện. Trả bề rộng. */
export function logLabel(g, x, y, k, { size = 58, text = null } = {}) {
  if (k <= 0) return 0;
  g.save(); g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  const big = `900 ${size}px "Archivo"`, sub = `900 ${Math.round(size * 0.5)}px "Archivo"`;
  g.font = big; const w1 = g.measureText('log').width, w3 = g.measureText(' 2').width;
  g.font = sub; const w2 = g.measureText('1.07').width;
  const w = w1 + w2 + w3 + 36;
  g.translate(x + w / 2, y); g.scale(k, k); g.translate(-w / 2, 0);
  g.strokeStyle = PAL.back; g.lineWidth = 7; g.shadowColor = PAL.back; g.shadowBlur = 22;
  g.beginPath(); g.roundRect(0, -size * 0.78, w, size * 1.56, 14); g.stroke(); g.shadowBlur = 0;
  g.fillStyle = PAL.backCore;
  g.font = big; g.fillText('log', 18, size * 0.32);
  g.font = sub; g.fillText('1.07', 18 + w1, size * 0.62);
  g.font = big; g.fillText(text ?? ' 2', 18 + w1 + w2, size * 0.32);
  g.restore();
  return w;
}

/** Mốc "gấp đôi": vạch xanh từ chỗ đường cong cắt ×2 rơi xuống trục tháng, nhãn ≈ 10.2. */
export function doubleMarker(g, t, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  const x = colX(DOUBLE_AT), y0 = valY(2), y1 = y0 + (BASE - y0) * k;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = PAL.back; g.lineWidth = 6; g.shadowColor = PAL.back; g.shadowBlur = 20;
  g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
  g.fillStyle = PAL.backCore; g.beginPath(); g.arc(x, y0, 11, 0, Math.PI * 2); g.fill();
  if (k >= 1) {
    g.shadowBlur = 0; g.font = '900 40px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = PAL.backCore;
    g.fillText('≈ 10.2', x, BASE + 44);
  }
  g.restore();
}
```

- [ ] **Step 2: `projects/mv/exp-log/plates/p13-bank.js`**

```js
// P13 bank — "Tiền trong ngân hàng" · 64.32 → 72.46 (TREATMENT P13, verse 2 mở)
// Con dấu LOGARITHM của P12 vỡ ra; bên dưới là sảnh két. 64.49 ka-ching: chồng xu tháng 0.
// "same percent every month": mỗi beat một chồng cao ×1.07, tờ lịch lật theo tháng.
// "One little multiplier": token ×1.07 nhảy từ đỉnh chồng này sang chồng sau — lặp mãi.
// "How much after ten?": câu hỏi treo trên chồng tháng 10 còn rỗng → gạch đỏ, vỡ.
// "Ask the harder question": đèn sảnh tối lại, chỉ còn vạch ×2. "When will it double?": lịch quay, dừng ở "?".
// Đoạn LẶNG (synth tắt): mọi lớp trôi nhẹ, chỉ nhấn ở ka-ching. Thế giới nối sang P14.
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { mix } from '../../../../engine/draw.js';
import { PAL } from '../song.js';
import { figure, footer, powText } from '../kit.js';
import { nameStamp } from '../chorus.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, monthAt, colX, valY, RATE, U } from '../bank.js';


export default class P13 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.cut = s.tl.at('logarithm.');
    this.every = s.tl.at('same percent every month.');
    this.mult = s.tl.at('One little multiplier,');
    this.ten = s.tl.line('“How much after ten?”');
    this.harder = s.tl.at('Ask the harder question—');
    this.dbl = s.tl.line('“When will it double?”');
    this.next = s.tl.at("Now the unknown");
    this.times = monthTimes(KACHING[0], this.every);
  }
  dim(t) { return smooth(prog(t, this.harder, this.harder + 0.6)); }   // đèn sảnh tối lại
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.6)), d = this.dim(t);
    return { glow: lerp(1, 0.85, k) * (1 - 0.5 * d), horizon: 760, floor: 0.85 * (1 - 0.55 * d), mirror: true,
      floorB: mix(PAL.back, PAL.fwd, k), bokeh: 0.8 * (1 - k), floorGlyphs: BANK_GLYPHS };
  }
  camera(t) { return { s: 1 + 0.05 * smooth(prog(t, this.t0, this.next)), cy: 500, bg: 0 }; }   // đẩy chậm về vạch ×2
  render(g, t) {
    const d = this.dim(t);
    vault(g, t, { alpha: 0.9 * (1 - 0.6 * d) });
    // con dấu của P12 vỡ thành ký hiệu ngay khi tiền vào
    if (t < this.t0 + 0.32) shatter(g, c => nameStamp(c, t, this.cut), prog(t, this.t0, this.t0 + 0.32), t, { seed: 14 });
    // ka-ching: hai vòng sáng ở chồng tháng 0
    KACHING.forEach((tk, i) => {
      const r = prog(t, tk, tk + 0.4);
      if (r <= 0 || r >= 1) return;
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 8 * (1 - r); g.shadowColor = PAL.fwd; g.shadowBlur = 24;
      g.beginPath(); g.arc(colX(0), valY(1), 30 + (110 + 60 * i) * r, 0, Math.PI * 2); g.stroke(); g.restore();
    });
    // cột tháng 10 còn rỗng: khung nét đứt chờ sẵn từ lúc hỏi "after ten?"
    if (t >= this.ten.start && t < this.times[10]) {
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.6; g.lineWidth = 3;
      g.strokeRect(colX(10) - 28, valY(RATE ** 10), 56, RATE ** 10 * U); g.restore();
    }
    stacks(g, t, this.times, { alpha: 1 - 0.45 * d });
    doubleLine(g, t, prog(t, this.harder + 0.1, this.harder + 0.8, smooth));
    this.token(g, t);
    // "How much after ten?" — treo trên tháng 10, gạch đỏ ở cuối câu, rồi vỡ
    const q0 = this.ten.start, strike = this.ten.end - 0.1, gone = this.harder + 0.15;
    if (t >= q0 && t < gone + 0.3)
      shatter(g, c => this.question(c, t, strike), prog(t, gone, gone + 0.3), t, { seed: 15 });
    // lịch: lật theo tháng; "When will it double?" quay số rồi dừng ở "?"
    const m = monthAt(this.times, t), spin = t >= this.dbl.start;
    const stopAt = this.dbl.words[2].start;              // dừng ở "?" trước "double" — dấu ? sẽ thành ô □ của P14
    let label = null, flipAt = this.times[Math.max(m, 0)];
    if (spin && t < stopAt) { const step = Math.floor((t - this.dbl.start) * 14); label = String(1 + ((step * 7) % 24)); flipAt = -1; }   // quay số: không co trang từng bước
    else if (spin) { label = '?'; flipAt = stopAt; }
    calendar(g, t, Math.max(m, 0), flipAt, { label, labelCol: label === '?' ? PAL.block : PAL.ink,
      appear: outBack(clamp((t - this.every) / 0.3)) });
    // nhân vật: khoanh tay tự tin ("tiền trong ngân hàng"), vào bằng cột ký hiệu
    const p = presence(t, this.times[0] + 0.15, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'crossed', 1735, 1050, 610, p.state === 'out' ? 'digits' : 'columns', p, { t, seed: 13 });
    footer(g, this.tl, t, ['money', 'percent', 'multiplier', 'again', 'ten', 'harder', 'double'],
      { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  /** Token ×1.07: nhảy theo cung từ đỉnh chồng trước sang đỉnh chồng vừa mọc. */
  token(g, t) {
    if (t < this.mult) return;
    const m = monthAt(this.times, t);
    if (m < 0) return;
    const tm = this.times[m], k = smooth(clamp((t - Math.max(tm, this.mult)) / 0.28));
    const from = m > 0 && tm > this.mult ? m - 1 : m;
    const x = lerp(colX(from), colX(m), k), y = lerp(valY(RATE ** from), valY(RATE ** m), k) - 46 - Math.sin(Math.PI * k) * 60;
    const shown = decodeChars('×1.07', t, this.mult, this.mult + 0.25, { seed: 3 }).filter(c => c.state !== 'hidden').map(c => c.ch).join('');
    const pop = outBack(clamp((t - this.mult) / 0.25));
    g.save(); g.translate(x, y); g.scale(pop, pop);
    g.fillStyle = PAL.bg; g.strokeStyle = PAL.fwd; g.lineWidth = 3;
    g.beginPath(); g.roundRect(-62, -24, 124, 48, 24); g.fill(); g.stroke();
    g.fillStyle = PAL.fwdCore; g.font = '600 28px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(shown, 0, 2);
    g.restore();
  }
  question(g, t, strike) {
    const x = colX(10), y = valY(RATE ** 10) - 120;
    const w = powText(g, [['1.07', '10'], ' = ?'], x, y, 64);
    const s = smooth(prog(t, strike, strike + 0.2));
    if (s > 0) {
      g.save(); g.strokeStyle = PAL.block; g.lineWidth = 9; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 16;
      g.beginPath(); g.moveTo(x - w / 2 - 14, y - 18); g.lineTo(x - w / 2 - 14 + (w + 28) * s, y - 26); g.stroke(); g.restore();
    }
  }
}
```

- [ ] **Step: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P13 from './plates/p13-bank.js';
```
Thay phần cuối khối `order` (từ `[tl.at('Backward question.'), P12]` tới hết `end: SONG.duration,`) bằng:
```js
            [tl.at('Backward question.'), P12],
            [tl.at('Money in the bank,'), P13]], beat, end: SONG.duration,
```

- [ ] **Step: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 64.40,64.60,65.4,67.3,68.4,69.9,70.3,71.0,72.1 --outdir out/check/p13`
Expected:
- 64.40: con dấu LOGARITHM đang vỡ thành ký hiệu; phía sau là tường ô két và cửa két tròn.
- 64.60: chồng xu tháng 0 có vòng sáng ka-ching; sàn chữ `$ % 1.07`.
- 65.4 / 67.3:
  - Nhân vật khoanh tay ở bên phải.
  - Tờ lịch MONTH lật theo số chồng xu.
  - Token `×1.07` (không phải "[object Object]") nằm trên đỉnh chồng mới nhất.
- 69.9: `1.07¹⁰ = ?` treo trên khung nét đứt của tháng 10, có gạch đỏ.
- 70.3: sảnh tối lại; có vạch ×2 nét đứt màu trắng.
- 71.0: tờ lịch quay số, không bị co dẹt ở từng bước.
- 72.1: tờ lịch dừng ở dấu `?` màu đỏ.

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/bank.js projects/mv/exp-log/plates/p13-bank.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P13 bank — the stamp breaks into a vault hall, coins grow ×1.07 a month"
```

---

### Task 4: P14 `hiding` (72.46 → 81.78)

**Files:** Create `projects/mv/exp-log/plates/p14-hiding.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes: `bank.js` (Task 3).
- Camera: đầu cảnh bằng cuối P13 `{ s: 1.05, cy: 500 }`; cuối cảnh `{ s: 1, cy: 500 }`.
- Cuối cảnh:
  - `hiddenEq` vẽ đủ `1.07^□ = 2`. P15 vẽ tiếp, không cho vỡ.
  - Các dấu dưới sàn (+ − × ÷) vỡ trong 0.3s cuối.

**Spec (TREATMENT P14):**
- □ không nằm trong dấu +, cũng không nằm cạnh dấu ×.
- ÷ mọc chân chạy tới, không với tới □ và ngã; nhân vật ở tư thế slump.
- □ bay lên chỗ số mũ, thành `1.07^□ = 2`.
- Bè vọng ở 72.0–73.5.

- [ ] **Step 1: `projects/mv/exp-log/plates/p14-hiding.js`**

```js
// P14 hiding — "Ẩn trong số mũ" · 72.46 → 81.78 (TREATMENT P14)
// Dấu "?" trên tờ lịch bật ra thành ô □ đỏ. "isn't sitting in a sum": hàng 1.07 + ⬚, ghế trống, □ lắc đầu.
// "isn't multiplying": dấu + xoay 45° thành × (đúng hình học — báo trước P18). "division cannot run":
// ÷ mọc chân chạy tới, nhảy, không với tới, ngã sấp. "hiding in the exponent": 1.07 bay lên thành
// cơ số lớn, □ chui vào chỗ số mũ. "out of reach of what we knew": + − × ÷ dưới sàn nhảy với, không tới.
// "this base into two?": = 2, vạch ×2 của sảnh sáng lên. Sảnh vẫn tối (đoạn lặng, năng lượng tụt 70.9–73).
import { clamp, prog, outBack, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, unknownBox, hiddenEq, CAL_Q, EQ, EQ_BOX, EQ_BS } from '../bank.js';

const ROW = { y: 640, num: 640, op: 830, seat: 950, size: 110 };   // hàng "1.07 + ⬚"
const HOVER = [950, 470];                                          // □ lơ lửng trên ghế trống
const FLOOR = 742;                                                 // mặt sàn cho các dấu ngã
const ECHO = [72.0, 73.5];                                         // data/stems.json: backing vocals

export default class P14 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.every = s.tl.at('same percent every month.');
    this.times = monthTimes(KACHING[0], this.every);
    this.sum = s.tl.line("isn't sitting in a sum.");
    this.mul = s.tl.line("It isn't multiplying,");
    this.div = s.tl.line('so division cannot run.');
    this.hide = s.tl.line("It's hiding in the exponent,");
    this.reach = s.tl.line('out of reach of what we knew.');
    this.what = s.tl.line('What exponent turns');
    this.two = s.tl.line('this base into two?');
    this.next = s.tl.at("That's the whole question.");
  }
  backdropAt() { return { glow: 0.425, horizon: 760, floor: 0.3825, mirror: true, floorB: PAL.fwd, bokeh: 0, floorGlyphs: BANK_GLYPHS }; }
  camera(t) { return { s: 1.05 - 0.05 * smooth(prog(t, this.t0, this.next)), cy: 500, bg: 0 }; }
  render(g, t) {
    const two = this.two.words[3].start;
    vault(g, t, { alpha: 0.36 });
    stacks(g, t, this.times, { alpha: 0.55 - 0.27 * smooth(prog(t, this.sum.start, this.sum.start + 0.5)) });   // lùi ra sau khi hàng phép tính hiện
    doubleLine(g, t, 1, { alpha: 1 });
    if (t >= two) {                                                // "two": vạch ×2 loé lên — đích của câu hỏi
      const f = 1 - prog(t, two, two + 0.6);
      g.save(); g.globalAlpha = 0.6 * f; g.strokeStyle = PAL.fwd; g.lineWidth = 10; g.shadowColor = PAL.fwd; g.shadowBlur = 30;
      g.beginPath(); g.moveTo(400 - 53, 460); g.lineTo(1526, 460); g.stroke(); g.restore();
    }
    calendar(g, t, 12, -1, { label: t < this.t0 + 0.12 ? '?' : ' ', appear: 1 });
    // dưới sàn: những gì ta đã biết, vỡ khi sang P15
    if (t < this.next) shatter(g, c => this.ground(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 16 });
    this.row(g, t);
    // □: bật ra từ dấu ? → lơ lửng trên ghế (lắc đầu) → né cú nhảy của ÷ → chui vào chỗ số mũ
    const fly = smooth(prog(t, this.t0, this.t0 + 0.7));
    let [bx, by] = [lerp(CAL_Q[0], HOVER[0], fly), lerp(CAL_Q[1], HOVER[1], fly) - Math.sin(Math.PI * fly) * 160];
    const shake = Math.sin((t - this.sum.words[1].start) * 30) * 18 * (1 - prog(t, this.sum.words[1].start, this.sum.words[1].start + 0.6)) * (t >= this.sum.words[1].start ? 1 : 0);
    const dodge = smooth(prog(t, this.div.words[2].start - 0.1, this.div.words[2].start + 0.15));
    bx += shake; by -= dodge * 110;
    const go = smooth(prog(t, this.hide.start + 0.2, this.hide.words[4].start));
    bx = lerp(bx, EQ_BOX[0], go); by = lerp(by, EQ_BOX[1], go);
    const bs = lerp(lerp(40, 100, fly), EQ_BS, go);
    const pulse = t >= this.what.words[1].start ? 1 + 0.12 * Math.max(0, 1 - (t - this.what.words[1].start) / 0.3) : 1;
    const k2 = prog(t, two, two + 0.25);
    if (t >= this.hide.start + 0.6) hiddenEq(g, t, { k2, box: false });   // cơ số đã tới chỗ (row() thôi vẽ)
    unknownBox(g, t, bx, by, bs * pulse, { bob: 1 - go });
    // bè vọng: lời lật gương, xanh, góc trên-phải
    const l = this.tl.lineAt(t);
    if (l && t >= ECHO[0] && t < ECHO[1])
      decodeLine(g, this.tl.wordsOf(l), t, 1300, 150, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75, burstAt: Math.min(ECHO[1], l.end) - 0.3, burstDur: 0.3 });
    // nhân vật: "cannot run" — gục vai
    const p = presence(t, this.div.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'slump', 1740, 1050, 600, p.state === 'out' ? 'burn' : 'rows', p, { t, seed: 14 });
    footer(g, this.tl, t, ['unknown', 'sum', 'multiplying', 'division', 'cannot', 'exponent', 'reach', 'two'], { from: this.t0, carry: true });
  }
  /** Hàng 1.07 + ⬚ (ghế trống). + xoay thành ×. Từ "hiding": 1.07 bay lên thành cơ số lớn. */
  row(g, t) {
    const a = this.sum.start;
    if (t < a) return;
    const up = smooth(prog(t, this.hide.start, this.hide.start + 0.6));
    if (up >= 1) return;
    const sz = lerp(ROW.size, EQ.size, up), x = lerp(ROW.num, EQ.x, up), y = lerp(ROW.y, EQ.y, up);
    const s = outBack(clamp((t - a) / 0.25));
    g.save(); g.translate(x, y); g.scale(s, s);
    g.font = `900 ${sz}px "Archivo"`; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.shadowColor = PAL.bg; g.shadowBlur = 24; g.fillText('1.07', 0, 0); g.restore();
    if (t >= this.hide.start) return;                              // dấu và ghế rơi xuống sàn (vẽ ở ground)
    this.op(g, t, ROW.op, ROW.y - 38, s, 0);
    g.save(); g.translate(ROW.seat, ROW.y - 38); g.scale(s, s);
    g.setLineDash([12, 9]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.7; g.lineWidth = 5;
    g.strokeRect(-50, -50, 100, 100); g.restore();
  }
  /** Dấu + xoay 45° ở "multiplying" → ×. */
  op(g, t, x, y, s, lie) {
    const r = Math.PI / 4 * smooth(prog(t, this.mul.words[2].start, this.mul.words[2].start + 0.3));
    g.save(); g.translate(x, y); g.rotate(r + lie); g.scale(s, s);
    g.strokeStyle = PAL.truth; g.lineWidth = 16; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-42, 0); g.lineTo(42, 0); g.moveTo(0, -42); g.lineTo(0, 42); g.stroke(); g.restore();
  }
  /** Sàn: ÷ chạy-nhảy-ngã; từ "hiding" ×, ghế rơi; từ "reach" + − ÷ × nhảy với lên □. */
  ground(g, t) {
    const d0 = this.div.words[1].start, jump = this.div.words[2].start, fall = this.div.words[3].start;
    if (t >= d0) {
      const run = smooth(prog(t, d0, jump)), j = prog(t, jump, fall);
      const x = lerp(260, ROW.seat - 20, run), lift = Math.sin(Math.PI * Math.min(j, 1)) * 230;
      const lie = smooth(prog(t, fall - 0.1, fall + 0.15)) * Math.PI / 2;
      const y = FLOOR - 60 - lift + lie * 30 + this.hop(t, 0);
      this.divide(g, t, x, y, lie, t < jump);
    }
    if (t >= this.hide.start) {                                     // × và ghế rơi xuống sàn
      const f = smooth(prog(t, this.hide.start, this.hide.start + 0.4));
      this.op(g, t, lerp(ROW.op, 700, f), lerp(ROW.y - 38, FLOOR - 45, f) + this.hop(t, 1), 1, 0);
      g.save(); g.translate(lerp(ROW.seat, 1180, f), lerp(ROW.y - 38, FLOOR - 50, f) + this.hop(t, 2)); g.rotate(0.3 * f);
      g.setLineDash([12, 9]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.7; g.lineWidth = 5; g.strokeRect(-50, -50, 100, 100); g.restore();
    }
    if (t >= this.reach.start) {                                    // + và − trồi lên từ sàn ký hiệu
      const k = outBack(clamp((t - this.reach.start) / 0.3));
      g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 16; g.lineCap = 'round';
      for (const [x, plus, i] of [[520, true, 3], [1340, false, 4]]) {
        g.save(); g.translate(x, FLOOR - 45 + this.hop(t, i)); g.scale(k, k);
        g.beginPath(); g.moveTo(-40, 0); g.lineTo(40, 0); if (plus) { g.moveTo(0, -40); g.lineTo(0, 40); } g.stroke(); g.restore();
      }
      g.restore();
    }
  }
  /** "out of reach": mỗi beat một dấu nhảy lên với □ (cao ≤ 150px, không tới). */
  hop(t, i) {
    if (t < this.reach.start) return 0;
    const sb = beat.sinceBeat(t), n = beat.beatIndex(t);
    if ((n + i) % 3 !== 0) return 0;
    return -Math.sin(Math.PI * clamp(sb / beat.BEAT)) * (110 + 40 * hash(i * 7.7 + n));
  }
  divide(g, t, x, y, lie, running) {
    g.save(); g.translate(x, y); g.rotate(lie);
    g.fillStyle = PAL.truth; g.strokeStyle = PAL.truth; g.lineCap = 'round';
    g.lineWidth = 14; g.beginPath(); g.moveTo(-42, 0); g.lineTo(42, 0); g.stroke();
    for (const dy of [-30, 30]) { g.beginPath(); g.arc(0, dy, 9, 0, Math.PI * 2); g.fill(); }
    if (running) {                                                   // hai chân guồng theo t
      const ph = t * 18; g.lineWidth = 7;
      for (const s of [0, Math.PI]) { g.beginPath(); g.moveTo(0, 40); g.lineTo(Math.sin(ph + s) * 26, 72); g.stroke(); }
    }
    g.restore();
  }
}
```

- [ ] **Step: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P14 from './plates/p14-hiding.js';
```
Thay phần cuối khối `order` (từ `[tl.at('Backward question.'), P12]` tới hết `end: SONG.duration,`) bằng:
```js
            [tl.at('Backward question.'), P12],
            [tl.at('Money in the bank,'), P13],
            [tl.at('Now the unknown'), P14]], beat, end: SONG.duration,
```

- [ ] **Step: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 72.44,72.48,74.2,75.6,76.3,76.7,77.6,78.7,81.6 --outdir out/check/p14`
Expected:
- 72.44 → 72.48: hai khung giống nhau (lịch còn `?`, chồng xu, vạch ×2).
- 74.2: hàng `1.07 + ⬚` với ghế nét đứt trống; □ đỏ lơ lửng phía trên; chồng xu lùi tối.
- 75.6: dấu + đã xoay thành ×.
- 76.3 / 76.7: ÷ có chân đang chạy rồi nhảy dưới □; □ né lên.
- 77.6:
  - `1.07` lớn ở trên, □ ở chỗ số mũ.
  - Trong 76.88–77.83 KHÔNG có khung nào thiếu `1.07`.
  - ×, ÷ và ghế nằm dưới sàn.
- 78.7: + − × ÷ nhảy với lên theo beat.
- 81.6: `1.07^□ = 2`, chữ 2 màu vàng, vạch ×2 loé vàng.

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/plates/p14-hiding.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P14 hiding — the unknown escapes + and ×, division cannot reach the exponent"
```

---

### Task 5: P15 `sentence` (81.78 → 90.47)

**Files:** Create `projects/mv/exp-log/plates/p15-sentence.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes từ `bank.js`:
  - `hiddenEq` với `eqX`, `unknownBox` với `lid`.
  - `logLabel`, `doubleMarker`, `growthCurve`.
  - `calendar`; nhãn dài thì tự co chữ.
- Camera cuối: `{ s: 0.95, cx: EQ_BOX[0], cy: EQ_BOX[1] + 40 }`. P16 bắt đầu đúng giá trị này.
- Tiền cảnh vỡ trong 0.3s cuối.
- Thế giới nối sang P16: chồng xu, đường cong, vạch ×2, mốc 10.2, lịch "10.2".
- Lưu ý: căn chỉnh lời dồn cả câu "A logarithm isn't magic." về 87.94, nên dùng `line.start/end`, không dùng mốc từng chữ.

**Spec (TREATMENT P15, đã chỉnh):**
- Mở hộp □: bên trong trống trơn.
- Câu "the power of 1.07 that gives 2" không vừa ô, tràn ra ngoài (slump).
- Câu nén lại thành `log₁.₀₇ 2`.
- Đũa thần xuất hiện rồi vỡ.
- "already in the game":
  - Đèn sảnh bật lại.
  - Đường cong tiền cắt vạch ×2 ở tháng 10.2.
  - Tờ lịch trả lời 10.2; nhân vật giơ ngón cái (thumb).

- [ ] **Step 1: `projects/mv/exp-log/plates/p15-sentence.js`**

```js
// P15 sentence — "Nói được mà không viết được" · 81.78 → 90.47 (TREATMENT P15)
// "That's the whole question": camera lao vào ô □. "Nothing strange inside": nắp mở — trống trơn, chỉ có ánh sáng.
// "We could say it in a sentence": gõ "the power of 1.07 that gives 2". "couldn't write it right": câu nhét
// vào □ không vừa, chữ tràn ra rơi xuống sàn (đỏ). "a symbol and a name": mọi chữ tụ lại thành log₁.₀₇ 2 —
// ngồi đúng chỗ số mũ. "isn't magic": đũa thần chạm vào rồi vỡ vụn. "already in the game": đèn sảnh bật lại,
// đường cong tiền của P13 cắt vạch ×2 đúng ở tháng 10.2 — câu trả lời nằm sẵn trong thế giới từ đầu.
import { clamp, prog, outBack, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { mix } from '../../../../engine/draw.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker,
  hiddenEq, logLabel, unknownBox, EQ_BOX, EQ_BS } from '../bank.js';

const SENT = 'the power of 1.07 that gives 2', SY = 600, FLOOR = 742, FIT = 5;
const LABEL_X = 1098;                                  // mép trái nhãn log₁.₀₇ 2 (ngay sau "1.07")

export default class P15 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.strange = s.tl.line('Nothing strange inside.');
    this.say = s.tl.line('We could say it in a sentence—');
    this.wr = s.tl.line("we just couldn't write it right.");
    this.give = s.tl.line('So give that exponent');
    this.name = s.tl.line('a symbol and a name.');
    this.magic = s.tl.line("A logarithm isn't magic.");     // căn chỉnh dồn cả câu về 87.94 → dùng khoảng của dòng
    this.game = s.tl.line('It was already');
    this.next = s.tl.at('We already knew the question,');
  }
  lights(t) { return smooth(prog(t, this.game.start, this.game.start + 0.6)); }
  backdropAt(t) {
    const L = this.lights(t);
    return { glow: lerp(0.425, 0.9, L), horizon: 760, floor: lerp(0.3825, 0.8, L), mirror: true, floorB: PAL.fwd, bokeh: 0, floorGlyphs: BANK_GLYPHS };
  }
  camera(t) {
    const zin = smooth(prog(t, this.t0 + 0.1, this.strange.start)), zout = smooth(prog(t, this.say.start - 0.1, this.say.start + 0.5));
    const z = zin * (1 - zout), wide = smooth(prog(t, this.game.start, this.game.start + 0.8));
    return { s: 1 + 1.1 * z - 0.05 * wide, cx: EQ_BOX[0], cy: EQ_BOX[1] + 40, x: (960 - EQ_BOX[0]) * z, y: (540 - EQ_BOX[1] - 40) * z, bg: 0 };
  }
  render(g, t) {
    const L = this.lights(t);
    vault(g, t, { alpha: lerp(0.36, 0.9, L) });
    stacks(g, t, this.times, { alpha: lerp(0.28, 1, L) });
    doubleLine(g, t, 1);
    growthCurve(g, 12.6 * smooth(prog(t, this.game.start, this.game.start + 0.6)));
    const ans = this.game.words[2].start + 0.45;              // tờ lịch hỏi "?" ở P13 — giờ tự trả lời
    calendar(g, t, 12, t >= ans ? ans : -1, { label: t >= ans ? '10.2' : ' ', labelCol: PAL.back, appear: 1 });
    if (t < this.next) shatter(g, c => this.fg(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 17 });
    if (t >= this.magic.start && t < this.magic.end) shatter(g, c => this.wand(c, t), prog(t, this.magic.end - 0.4, this.magic.end - 0.1), t, { seed: 18 });
    // nhân vật: gục vai lúc "couldn't write it right", giơ ngón cái lúc "already in the game"
    const p1 = presence(t, this.wr.start - 0.15, this.give.start + 0.3, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'slump', 1740, 1050, 600, p1.state === 'out' ? 'columns' : 'rows', p1, { t, seed: 15 });
    const p2 = presence(t, this.game.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'thumb', 1740, 1050, 600, p2.state === 'out' ? 'digits' : 'grid', p2, { t, seed: 16 });
    footer(g, this.tl, t, ['question', 'strange', 'sentence', 'write', 'symbol', 'name', 'magic', 'already', 'game'],
      { from: this.t0, carry: true, at: this.next - 0.3, dur: 0.3 });
  }
  /** Tiền cảnh: phương trình, ô □ / nhãn log, câu chữ, mốc 10.2 — vỡ cùng nhau khi sang P16. */
  fg(g, t) {
    const named = smooth(prog(t, this.name.words[1].start, this.name.end - 0.05));   // □ co lại, nhãn log nở ra
    const lid = smooth(prog(t, this.strange.words[1].start, this.strange.words[1].start + 0.35)) * (1 - smooth(prog(t, this.say.start, this.say.start + 0.3)));
    hiddenEq(g, t, { k2: 1, box: false, eqX: lerp(1330, 1470, named) });
    if (named < 1) unknownBox(g, t, EQ_BOX[0], EQ_BOX[1], EQ_BS * (1 - named), { lid });
    logLabel(g, LABEL_X, EQ_BOX[1], named);
    this.sentence(g, t);
    doubleMarker(g, t, smooth(prog(t, this.game.words[2].start, this.game.words[2].start + 0.45)));
  }
  /** Câu dài: gõ → nhét vào □ → tràn, rơi sàn → tụ về nhãn log. */
  sentence(g, t) {
    if (t < this.say.start) return;
    g.save(); g.font = '500 44px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const cw = g.measureText('m').width, x0 = 960 - (SENT.length * cw) / 2;
    const typed = Math.floor(SENT.length * prog(t, this.say.start, this.say.end));
    const squeeze = smooth(prog(t, this.wr.start, this.wr.words[3].start));
    const eject = this.wr.words[3].start, gather = smooth(prog(t, this.give.words[1].start, this.name.words[1].start + 0.25));
    const red = smooth(prog(t, this.wr.words[2].start, this.wr.words[2].start + 0.2)) * (1 - gather);
    const lab = [LABEL_X + 120, EQ_BOX[1]];
    for (let i = 0; i < typed; i++) {
      const ch = SENT[i];
      if (ch === ' ') continue;
      let x = x0 + (i + 0.5) * cw, y = SY, s = 1, r = 0;
      const ins = [EQ_BOX[0] + ((i % FIT) - 2) * 11, EQ_BOX[1] + (hash(i) - 0.5) * 30];
      x = lerp(x, ins[0], squeeze); y = lerp(y, ins[1], squeeze); s = lerp(1, 0.45, squeeze);
      if (i >= FIT && t >= eject) {                     // không vừa: bật ra, rơi xuống sàn, nằm đó
        const dt = t - eject, a = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.6, v = 520 + 260 * hash(i * 5.7);
        const tLand = this.landT(i, a, v);
        const tt = Math.min(dt, tLand);
        x = ins[0] + Math.cos(a) * v * tt; y = ins[1] + Math.sin(a) * v * tt + 900 * tt * tt;
        s = lerp(0.45, 1, clamp(dt / 0.3)); r = (hash(i * 9.1) - 0.5) * 6 * tt;
      }
      x = lerp(x, lab[0], gather); y = lerp(y, lab[1], gather); s *= 1 - gather;
      if (s <= 0.01) continue;
      g.save(); g.translate(x, y); g.rotate(r); g.scale(s, s);
      g.fillStyle = mix(PAL.truth, PAL.block, red); g.fillText(ch, 0, 0); g.restore();
    }
    if (typed < SENT.length && squeeze <= 0) {          // con trỏ khối
      g.fillStyle = PAL.fwd; g.fillRect(x0 + typed * cw + 2, SY - 24, cw * 0.8, 48);
    }
    g.restore();
  }
  /** Lúc chữ i chạm sàn (y = FLOOR): giải ins.y + sin(a)·v·τ + 900τ² = FLOOR. */
  landT(i, a, v) {
    const y0 = EQ_BOX[1] + (hash(i) - 0.5) * 30, b = Math.sin(a) * v, c = y0 - FLOOR;
    return (-b + Math.sqrt(b * b - 4 * 900 * c)) / (2 * 900);
  }
  /** Đũa thần: bay vào, chạm nhãn log — rồi vỡ (shatter ở render). */
  wand(g, t) {
    const k = smooth(prog(t, this.magic.start, this.magic.start + 0.35));
    const tip = [lerp(1900, 1290, k), lerp(-80, 140, k)], ang = lerp(-0.2, 0.6, k);
    g.save(); g.translate(tip[0], tip[1]); g.rotate(ang);
    g.strokeStyle = PAL.truth; g.lineWidth = 12; g.lineCap = 'round';
    g.beginPath(); g.moveTo(0, 0); g.lineTo(230, -160); g.stroke();
    g.fillStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 26; g.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 22 : 52, a = i / 10 * Math.PI * 2 - Math.PI / 2; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    g.closePath(); g.fill();
    g.restore();
  }
}
```

- [ ] **Step: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P15 from './plates/p15-sentence.js';
```
Thay phần cuối khối `order` (từ `[tl.at('Backward question.'), P12]` tới hết `end: SONG.duration,`) bằng:
```js
            [tl.at('Backward question.'), P12],
            [tl.at('Money in the bank,'), P13],
            [tl.at('Now the unknown'), P14],
            [tl.at("That's the whole question."), P15]], beat, end: SONG.duration,
```

- [ ] **Step: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 81.80,82.5,83.5,84.6,85.4,85.9,86.8,87.7,88.2,88.7,89.3,90.0 --outdir out/check/p15`
Expected:
- 82.5 / 83.5: camera lao vào □; nắp mở, luồng sáng trắng đi lên, trong hộp trống.
- 84.6: câu chữ mono đang được gõ, có con trỏ khối màu vàng.
- 85.4 / 85.9: chữ nhỏ dồn vào □ và chuyển đỏ; phần thừa bật ra, rơi xuống sàn.
- 86.8 / 87.7: nhãn xanh `log₁.₀₇ 2` ở chỗ số mũ; `= 2` dời sang phải.
- 88.2 / 88.7: đũa thần (cán trắng, sao vàng) chạm nhãn rồi vỡ thành ký hiệu.
- 89.3 / 90.0:
  - Sảnh sáng lại; đường cong vàng đi qua đỉnh các chồng xu.
  - Vạch xanh rơi xuống ở tháng 10.2, có nhãn `≈ 10.2`.
  - Tờ lịch hiện `10.2` màu xanh; nhân vật giơ ngón cái.

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/plates/p15-sentence.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P15 sentence — the box is empty, the sentence compresses into log₁.₀₇ 2 ≈ 10.2"
```

---

### Task 6: Kính quầy giao dịch (`glass.js`) + P16 `otherside` (90.47 → 98.88)

**Files:** Create `projects/mv/exp-log/glass.js`, `projects/mv/exp-log/plates/p16-otherside.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`glass.js`): `GLASS = {x0, y0, x1, y1}`, `crackHits(t0, t1, roll) → [{t, x, y, seed}]`, `glassPane(g, t, {alpha, hits, strain})`, `etch(g, text, x, y, font, k, {col})`.
- Produces (P16): `FACE = [960, 870, 560]` là mặt cận hát nhép; P17 vẽ tiếp ở đúng vị trí này.
- Camera cuối: `{ s: 1.12, cx: 960, cy: 540 }`.
- Nền cuối: `glow 0.7, floor 0.65, floorA fwd, floorB back, mirror`.

**Spec (TREATMENT P16 + năng lượng):**
- 90–94 nhạc tắt: lạnh, đứng yên.
- Câu hỏi hiện trên kính; "Turn the language backward" thì chữ lật.
- Sau kính, đường gương chờ sẵn.
- Trống dồn 94–98.8: kính rạn theo từng cú trống.

- [ ] **Step 1: `projects/mv/exp-log/glass.js`**

```js
// Tấm kính quầy giao dịch của ngân hàng — P16 khắc câu hỏi lên kính và cho nó rạn theo trống dồn,
// P17 (98.88) đập vỡ nó. Vết rạn là hàm thuần của (danh sách cú đập, t): mỗi cú một chùm tia gãy khúc.
import { clamp, prog, smooth, hash } from '../../../engine/lib.js';
import { PAL, beat } from './song.js';

export const GLASS = { x0: 150, y0: 64, x1: 1770, y1: 936 };

/** Các cú đập: mỗi beat trong [t0, t1); ô nhịp cuối dồn nửa beat. Điểm đập dồn dần về tâm khung. */
export function crackHits(t0, t1, roll) {
  const hits = [];
  for (let k = Math.ceil((t0 - beat.T0) / beat.BEAT); ; k++) {
    const tk = beat.beatT(k);
    if (tk >= t1) break;
    hits.push(tk);
    if (tk >= roll && tk + beat.BEAT / 2 < t1) hits.push(tk + beat.BEAT / 2);
  }
  return hits.map((tk, i) => {
    const c = i / Math.max(1, hits.length - 1);                  // về sau: gần tâm hơn
    const r = (1 - 0.75 * c) * 620, a = hash(i * 4.7 + 1) * Math.PI * 2;
    return { t: tk, x: 960 + Math.cos(a) * r * hash(i * 2.3), y: 500 + Math.sin(a) * r * 0.55 * hash(i * 6.1), seed: i };
  });
}

/** Một chùm rạn: 6–9 tia gãy khúc + nhánh, dài ra trong 0.12s. */
function crack(g, h, t) {
  const grow = smooth(clamp((t - h.t) / 0.12));
  if (grow <= 0) return;
  const n = 6 + Math.floor(hash(h.seed * 3.3) * 4);
  g.beginPath();
  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2 + hash(h.seed * 9.1 + i) * 0.7, x = h.x, y = h.y;
    const L = (140 + 260 * hash(h.seed * 5.3 + i * 1.7)) * grow;
    g.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      a += (hash(h.seed * 13 + i * 7 + s) - 0.5) * 0.7;
      x += Math.cos(a) * L / 4; y += Math.sin(a) * L / 4; g.lineTo(x, y);
      if (s === 1 && hash(h.seed + i * 3 + s) > 0.5) {           // nhánh
        const b = a + (hash(h.seed * 2 + i) > 0.5 ? 0.8 : -0.8);
        g.moveTo(x, y); g.lineTo(x + Math.cos(b) * L * 0.3, y + Math.sin(b) * L * 0.3); g.moveTo(x, y);
      }
    }
  }
  // vòng vỡ quanh điểm đập
  const R = 26 + 20 * hash(h.seed * 8.8);
  for (let i = 0; i < 7; i++) {
    const a0 = i / 7 * Math.PI * 2, a1 = a0 + Math.PI * 2 / 7;
    g.moveTo(h.x + Math.cos(a0) * R * grow, h.y + Math.sin(a0) * R * grow);
    g.lineTo(h.x + Math.cos(a1) * R * grow * 1.15, h.y + Math.sin(a1) * R * grow * 1.15);
  }
  g.stroke();
}

/** Tấm kính: ánh xanh nhạt + vệt phản chiếu trôi chậm + khung thép + vết rạn đã có tới t. */
export function glassPane(g, t, { alpha = 1, hits = [], strain = 0 } = {}) {
  if (alpha <= 0) return;
  const { x0, y0, x1, y1 } = GLASS;
  g.save(); g.globalAlpha = alpha;
  g.save(); g.beginPath(); g.rect(x0, y0, x1 - x0, y1 - y0); g.clip();
  g.fillStyle = 'rgba(63,184,255,0.05)'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
  for (let i = 0; i < 3; i++) {                                    // vệt phản chiếu chéo trôi theo t
    const x = x0 - 600 + (((t * 22 + i * 640) % 2600));
    const gr = g.createLinearGradient(x, 0, x + 260, 0);
    gr.addColorStop(0, 'rgba(244,241,234,0)'); gr.addColorStop(0.5, `rgba(244,241,234,${0.06 + 0.03 * i})`); gr.addColorStop(1, 'rgba(244,241,234,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x, y1); g.lineTo(x + 260, y1); g.lineTo(x + 560, y0); g.lineTo(x + 300, y0); g.fill();
  }
  g.strokeStyle = `rgba(244,241,234,${0.55 + 0.35 * strain})`; g.lineWidth = 2; g.lineCap = 'round'; g.lineJoin = 'round';
  g.shadowColor = PAL.backCore; g.shadowBlur = 6;
  for (const h of hits) if (t >= h.t) crack(g, h, t);
  g.restore();
  // khung thép quầy giao dịch + khe nói ở dưới
  g.strokeStyle = '#33456F'; g.lineWidth = 22; g.strokeRect(x0, y0, x1 - x0, y1 - y0);
  g.strokeStyle = '#4A5F8E'; g.lineWidth = 3; g.strokeRect(x0 + 13, y0 + 13, x1 - x0 - 26, y1 - y0 - 26);
  g.fillStyle = '#4A5F8E';
  for (const [x, y] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) { g.beginPath(); g.arc(x, y, 9, 0, Math.PI * 2); g.fill(); }
  g.restore();
}

/** Chữ khắc mờ trên kính: viền sáng + ruột rất nhạt. */
export function etch(g, text, x, y, font, k, { col = PAL.truth } = {}) {
  if (k <= 0) return;
  g.save(); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  const w = g.measureText(text).width;
  g.beginPath(); g.rect(x - w / 2 - 10, y - 200, (w + 20) * k, 400); g.clip();          // khắc từ trái sang phải
  g.fillStyle = 'rgba(244,241,234,0.12)'; g.fillText(text, x, y);
  g.strokeStyle = col; g.lineWidth = 2.5; g.shadowColor = col; g.shadowBlur = 10; g.strokeText(text, x, y);
  g.restore();
}
```

- [ ] **Step 2: `projects/mv/exp-log/plates/p16-otherside.js`**

```js
// P16 otherside — "Nghe từ phía bên kia" · 90.47 → 98.88 (TREATMENT P16, pre-chorus 2 — hát)
// Sảnh ngân hàng giờ nằm sau tấm kính quầy giao dịch. 90–94 nhạc tắt hẳn: đèn lạnh, đứng yên, chỉ kính trôi vệt sáng.
// "We already knew the question": 1.07^□ = 2 khắc lên kính. "Turn the language backward": dòng chữ lật như tấm
// bìa — mặt sau là □ = log₁.₀₇ 2; "the answer can be found": □ hoá xanh, 10.2 nằm trong.
// "waiting there all along": sau kính, đường gương y = x sáng lên; mặt cận hiện ra trên gương và hát nhép.
// 94 → 98.88 trống dồn: mỗi beat một cú rạn, ô nhịp cuối dồn nửa beat; camera đẩy vào. P17 đập vỡ kính.
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { mix } from '../../../../engine/draw.js';
import { PAL, MIRROR, beat } from '../song.js';
import { footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker, EQ_BOX } from '../bank.js';
import { glassPane, crackHits, etch } from '../glass.js';

export const FACE = [960, 870, 560];                   // mặt cận sau kính: tâm trên gương, cằm trên dòng lời
export const DRUMS_BACK = 94.0;                        // data/stems.json: trống vào lại sau 4s im (bảng năng lượng)

export default class P16 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face;
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.ans10 = s.tl.line('It was already').words[2].start + 0.45;
    this.knew = s.tl.line('We already knew the question,');
    this.down = s.tl.line("we just couldn't write it down.");
    this.turn = s.tl.line('Turn the language backward,');
    this.found = s.tl.line('and the answer can be found.');
    this.wait = s.tl.line('What looked unfamiliar');
    this.same = s.tl.line('The same idea');
    this.next = s.tl.at('Run it forward,', 2);            // điệp khúc 2
    this.hits = crackHits(DRUMS_BACK, this.next, this.next - beat.BAR);   // ô nhịp cuối: dồn nửa beat
  }
  cold(t) { return smooth(prog(t, this.t0, this.t0 + 0.8)); }
  backdropAt(t) {
    const c = this.cold(t), m = smooth(prog(t, this.wait.start, this.wait.start + 0.6));
    return { glow: lerp(0.9, 0.45, c) + 0.25 * m, horizon: 760, floor: lerp(0.8, 0.35, c) + 0.3 * m, mirror: true,
      floorA: mix(PAL.fwd, PAL.back, c * (1 - m)), floorB: mix(PAL.fwd, PAL.back, c), bokeh: 0, floorGlyphs: BANK_GLYPHS };
  }
  camera(t) {
    const e = smooth(prog(t, this.t0, this.t0 + 1.0)), push = smooth(prog(t, this.same.start, this.next));
    return { s: lerp(0.95, 1, e) + 0.12 * push, cx: lerp(EQ_BOX[0], 960, e), cy: lerp(EQ_BOX[1] + 40, 540, e), bg: 0 };
  }
  render(g, t) {
    const c = this.cold(t);
    // thế giới sau kính: sảnh ngân hàng của P13–P15, lạnh và lùi lại
    const a = lerp(1, 0.32, c);                       // các hàm thế giới tự đặt globalAlpha → truyền alpha vào từng hàm
    vault(g, t, { alpha: 0.9 * a }); stacks(g, t, this.times, { alpha: a }); doubleLine(g, t, 1, { alpha: a }); growthCurve(g, 12.6, { alpha: a });
    doubleMarker(g, t, 1, { alpha: a });
    g.save(); g.globalAlpha = a; calendar(g, t, 12, -1, { label: '10.2', labelCol: PAL.back }); g.restore();
    // đường gương chờ sẵn phía sau kính
    const m = smooth(prog(t, this.wait.start, this.wait.start + 0.5));
    drawMirrorLine(g, MIRROR, m, { width: 6, glow: 30 });
    // mặt cận trên gương, hát nhép (hát: pre-chorus) — P17 nhận đúng mặt này
    const [FX, FY, FH] = FACE;
    const p = presence(t, this.wait.start + 0.1, 1e9, { inDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'rows', 'in', p.k, { t, cell: 7, seed: 21 });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l)) : 1); }
    // kính + chữ khắc + vết rạn
    // kính hạ xuống như cửa chớp quầy giao dịch (0.45s), câu hỏi khắc lên khi kính đã đứng
    const drop = 1 - smooth(prog(t, this.t0, this.t0 + 0.45));
    g.save(); g.translate(0, -1000 * drop);
    glassPane(g, t, { hits: this.hits, strain: smooth(prog(t, this.same.start, this.next)) });
    g.restore();
    this.words(g, t);
    footer(g, this.tl, t, ['question', 'write', 'backward', 'answer', 'unfamiliar', 'waiting', 'same', 'other', 'side'],
      { from: this.t0, carry: true });
  }
  /** Câu hỏi khắc trên kính; lật quanh trục đứng ở "Turn the language backward" → mặt sau là câu trả lời. */
  words(g, t) {
    const etchK = prog(t, this.knew.start + 0.45, this.knew.end + 0.2);
    const k = smooth(prog(t, this.turn.start, this.turn.end)), cs = Math.cos(Math.PI * k);
    g.save(); g.translate(960, 200); g.scale(Math.max(Math.abs(cs), 0.02), 1); g.translate(-960, -200);
    if (cs >= 0) {
      etch(g, '1.07', 820, 210, '900 120px "Archivo"', etchK);
      etch(g, '= 2', 1130, 210, '900 120px "Archivo"', clamp(etchK * 2 - 1));
      const blink = t >= this.down.start && t < this.turn.start ? 0.55 + 0.45 * Math.cos((t - this.down.start) * 14) : 1;
      if (etchK > 0.45) this.box(g, 985, 140, 62, PAL.block, blink);
    } else {
      const found = t >= this.found.words[2].start;
      this.box(g, 700, 200, 112, found ? PAL.back : PAL.block, 1);
      if (found) {
        const s = outBack(clamp((t - this.found.words[2].start) / 0.25));
        g.save(); g.translate(700, 204); g.scale(s, s); g.font = '900 52px "Archivo"'; g.fillStyle = PAL.backCore;
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('10.2', 0, 0); g.restore();
      }
      etch(g, '=', 850, 210, '900 120px "Archivo"', 1);
      etch(g, 'log', 1040, 210, '900 120px "Archivo"', 1, { col: PAL.backCore });
      etch(g, '1.07', 1185, 260, '900 56px "Archivo"', 1, { col: PAL.backCore });
      etch(g, '2', 1295, 210, '900 120px "Archivo"', 1, { col: PAL.backCore });
    }
    g.restore();
  }
  box(g, x, y, s, col, a) {
    g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = Math.max(6, s * 0.09); g.shadowColor = col; g.shadowBlur = 20;
    g.strokeRect(x - s / 2, y - s / 2, s, s); g.restore();
  }
}
```

- [ ] **Step: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P16 from './plates/p16-otherside.js';
```
Thay phần cuối khối `order` (từ `[tl.at('Backward question.'), P12]` tới hết `end: SONG.duration,`) bằng:
```js
            [tl.at('Backward question.'), P12],
            [tl.at('Money in the bank,'), P13],
            [tl.at('Now the unknown'), P14],
            [tl.at("That's the whole question."), P15],
            [tl.at('We already knew the question,'), P16]], beat, end: SONG.duration,
```

- [ ] **Step: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 90.5,90.6,91.4,92.3,93.1,93.4,94.2,95.2,96.2,97.3,98.3,98.85 --outdir out/check/p16`
Expected:
- 90.6: kính đang hạ xuống từ trên, không bật ra trong một khung.
- 91.4 / 92.3:
  - `1.07 □ = 2` khắc mờ trên kính; □ đỏ nhấp nháy.
  - Sảnh phía sau tối và lạnh; chồng xu mờ hẳn.
- 93.1: dòng chữ đang lật (bị ép dẹt).
- 93.4: hiện `□ = log₁.₀₇ 2`.
- 94.2: □ chuyển xanh, chứa `10.2`.
- 95.2: đường gương trắng sau kính; mặt cận hát nhép trên gương.
- 96.2 → 98.85: vết rạn tăng theo beat, ô nhịp cuối dày đặc; camera đẩy vào.

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/glass.js projects/mv/exp-log/plates/p16-otherside.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P16 otherside — the question etched on the teller glass, cracking with the drum build"
```

---

### Task 7: Điệp khúc 2 (`chorus2.js`) + P17 `mirror2` (98.88 → 112.80) — CÚ BÙNG NỔ

**Files:** Create `projects/mv/exp-log/chorus2.js`, `projects/mv/exp-log/plates/p17-mirror2.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`chorus2.js`):
  - Hệ toạ độ: `OX, OY, S, G(u, v)`. Vì OX + OY = 1500 nên đường u = v trùng MIRROR.
  - `MIRROR2`.
  - `curve(g, k, {log, col, width, alpha, u0, u1})`, `axes(g, k, {alpha})`.
  - `shards(g, k)`, `mirrorHall(g, t, {alpha, pulse, spin})`.
  - `trace(g, u, k1, k2, {log, inLabel, outLabel, col})`.
- Consumes:
  - `GLASS` (Task 6).
  - Từ `engine/mirror.js`: `foldMatrix`, `clipSide`, `reflectPoint`, `drawMirrorLine`.
  - `mouthAt`, `decodeLine`, `shatter`.
  - Mốc lời điệp khúc 2 lấy bằng `tl.line(text, 2)`.

**Spec (TREATMENT P17, đã chỉnh):**
- 98.88: kính vỡ, lộ hai gương giao nhau.
- Đường cong tiền phản chiếu thành đường cong log.
- Hát nhép cận mặt.
- 109.62: tư thế jump.
- 111.58: kính vạn hoa tràn khung.
- Bùng nổ = hiệu ứng + camera + đổi phong cách thế giới (UPGRADE-NOTES §0).

- [ ] **Step 1: `projects/mv/exp-log/chorus2.js`**

```js
// Hình của điệp khúc 2 (P17): đồ thị trong hệ toạ độ mà đường y = x TRÙNG đường gương MIRROR của màn hình,
// nên ảnh qua gương của đường cong mũ đúng là đường cong log. Thêm gương thứ hai vuông góc, mảnh kính vỡ,
// và "sảnh gương" (khung lồng nhau lùi vào sâu) — thế giới của cú bùng nổ.
import { clamp, hash, outExpo } from '../../../engine/lib.js';
import { line } from '../../../engine/mirror.js';
import { PAL } from './song.js';
import { GLASS } from './glass.js';

// G(u, v) = (OX + S·u, OY − S·v); OX + OY = 1500 ⇒ u = v ↔ đường x + y = 1500 (MIRROR).
export const OX = 700, OY = 800, S = 120;
export const G = (u, v) => [OX + S * u, OY - S * v];
export const MIRROR2 = line(420, 0, 1500, 1080);               // gương thứ hai: vuông góc, qua tâm khung

/** Đường cong mũ v = 2^u (vàng) hoặc ảnh của nó u = 2^v (xanh, log). k = tiến độ vạch. */
export function curve(g, k, { log = false, col = log ? PAL.back : PAL.fwd, width = 7, alpha = 1, u0 = -5.8, u1 = 2.75 } = {}) {
  if (k <= 0 || alpha <= 0) return;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.lineCap = 'round';
  g.shadowColor = col; g.shadowBlur = 24;
  g.beginPath();
  const end = u0 + (u1 - u0) * k;
  for (let u = u0; u <= end + 1e-9; u += 0.04) {
    const v = 2 ** u, [x, y] = log ? G(v, u) : G(u, v);
    u === u0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke(); g.restore();
}

/** Hai trục mờ. */
export function axes(g, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = alpha * k; g.strokeStyle = PAL.truth; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-200, OY); g.lineTo(2120, OY); g.moveTo(OX, -200); g.lineTo(OX, 1280); g.stroke();
  g.restore();
}

/** Mảnh kính: lưới 9×6 ô méo, mỗi ô bay ra từ tâm, xoay, phóng to về phía camera. k ∈ [0,1]. */
export function shards(g, k) {
  if (k <= 0 || k >= 1) return;
  const { x0, y0, x1, y1 } = GLASS, nx = 9, ny = 6, w = (x1 - x0) / nx, h = (y1 - y0) / ny;
  const P = (i, j) => {                                       // đỉnh lưới có rung (mép giữ thẳng)
    const ex = i === 0 || i === nx, ey = j === 0 || j === ny;
    return [x0 + i * w + (ex ? 0 : (hash(i * 7.1 + j * 3.3) - 0.5) * w * 0.7), y0 + j * h + (ey ? 0 : (hash(i * 2.9 + j * 8.7) - 0.5) * h * 0.7)];
  };
  const e = outExpo(k);
  g.save(); g.lineJoin = 'round';
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
    const pts = [P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)];
    const cx = pts.reduce((a, p) => a + p[0], 0) / 4, cy = pts.reduce((a, p) => a + p[1], 0) / 4;
    const dx = cx - 960, dy = cy - 520, d = Math.hypot(dx, dy) || 1, sp = 900 + 900 * hash(i * 5.5 + j);
    const tx = dx / d * sp * e, ty = dy / d * sp * e + 300 * k * k, rot = (hash(i + j * 9.3) - 0.5) * 4 * e, sc = 1 + 1.4 * e;
    g.save(); g.translate(cx + tx, cy + ty); g.rotate(rot); g.scale(sc, sc); g.translate(-cx, -cy);
    g.globalAlpha = 1 - k;
    g.beginPath(); pts.forEach(([x, y], q) => (q ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath();
    g.fillStyle = 'rgba(189,232,255,0.16)'; g.fill();
    g.strokeStyle = PAL.truth; g.lineWidth = 3; g.stroke();
    g.restore();
  }
  g.restore();
}

/** Sảnh gương: khung lồng nhau lùi vào sâu, xoay dần, sáng theo beat — thế giới của điệp khúc 2. */
export function mirrorHall(g, t, { alpha = 1, pulse = 0, spin = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.translate(960, 540);
  for (let k = 0; k < 12; k++) {
    const z = ((k + (t * 0.6) % 1) / 12), sc = 2.2 * Math.pow(0.78, z * 12);   // trôi vào sâu liên tục
    g.save(); g.rotate(spin + z * 1.1 + t * 0.05); g.scale(sc, sc);
    g.globalAlpha = alpha * (0.06 + 0.22 * z * (1 - z) * 4) * (1 + 0.8 * pulse);
    g.strokeStyle = k % 2 ? PAL.back : PAL.truth; g.lineWidth = 4 / sc;
    g.strokeRect(-860, -480, 1720, 960);
    g.restore();
  }
  g.restore();
}

/** Điểm chạy trên đường cong: từ trục ngang lên đường cong rồi sang trục dọc (forward), hoặc ngược lại cho log. */
export function trace(g, u, k1, k2, { log = false, inLabel, outLabel, col = log ? PAL.back : PAL.fwd } = {}) {
  if (k1 <= 0) return;
  const v = 2 ** u, [px, py] = log ? G(v, u) : G(u, v), [ax, ay] = [px, OY], [bx, by] = [OX, py];
  g.save(); g.strokeStyle = col; g.lineWidth = 4; g.setLineDash([14, 10]);
  g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax, ay + (py - ay) * clamp(k1)); g.stroke();
  if (k2 > 0) { g.beginPath(); g.moveTo(px, py); g.lineTo(px + (bx - px) * clamp(k2), py); g.stroke(); }
  g.setLineDash([]); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 20;
  g.font = '900 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(inLabel, ax, ay + 60);
  if (k1 >= 1) { g.beginPath(); g.arc(px, py, 14, 0, Math.PI * 2); g.fill(); }
  if (k2 >= 1) g.fillText(outLabel, bx - 64, by);
  g.restore();
}
```

- [ ] **Step 2: `projects/mv/exp-log/plates/p17-mirror2.js`**

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
import { drawMirrorLine, clipSide, foldMatrix, reflectPoint } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { G, curve, axes, shards, mirrorHall, trace, MIRROR2 } from '../chorus2.js';

const FACE = [960, 870, 560];                    // = P16: mặt nối liền qua cú vỡ
const ECHO = [101.0, 114.0];                     // data/stems.json: backing vocals

export default class P17 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face;
    const L = (txt) => s.tl.line(txt, 2);
    this.fwd = L('Run it forward,'); this.back = L('run it back.'); this.same = L('Same connection,');
    this.give = L('Give me the exponent—'); this.value = L("I'll give you the value.");
    this.gv = L('Give me the value—'); this.find = L('find the exponent.');
    this.turn = L('Turn it around,'); this.fb = L('Forward and backward—'); this.every = L('everywhere.');
    this.next = s.tl.at('Same old laws');
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.3)), e = smooth(prog(t, this.fb.start, this.fb.start + 0.5));
    return { glow: lerp(0.7, 1, k), horizon: 760, floor: lerp(0.65, 1, k), mirror: true, bokeh: 0.8 * k,
      rings: e > 0 ? { cx: 960, cy: 540, r0: 300, gap: 62, n: 5, alpha: 0.85 * e, spin: 0.3,
        texts: ['FORWARD', 'BACKWARD', '2ᵘ', 'log₂', 'EVERYWHERE'] } : null };
  }
  camera(t) {
    const p = prog(t, this.t0, this.t0 + 0.5), punch = 1 - smooth(p);
    const kick = Math.sin(Math.PI * prog(t, this.turn.start, this.turn.end)) * 0.3;
    const e = smooth(prog(t, this.fb.start, this.every.start)), spin = Math.max(0, t - this.every.start) * 0.9;
    return { s: 1 + 0.12 * punch + 0.06 * e, r: 0.07 * Math.sin(p * Math.PI * 3) * punch + kick + 0.22 * e + spin, bg: 0.25 * e };
  }
  render(g, t) {
    const pulse = beat.onBeat(t, 0.25);
    mirrorHall(g, t, { alpha: smooth(prog(t, this.t0, this.t0 + 0.4)), pulse, spin: Math.max(0, t - this.every.start) * 0.6 });
    // hai nửa nhuộm theo gương thứ nhất
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    drawMirrorLine(g, MIRROR, 1, { width: 6, glow: 30 });
    drawMirrorLine(g, MIRROR2, outExpo(prog(t, this.t0 + 0.05, this.t0 + 0.4)), { width: 4, glow: 20 });   // gương thứ hai xé ra
    if (t < this.next) shatter(g, c => this.graph(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 19 });
    // mặt cận nối từ P16, hát nhép tới hết "different track", ra bằng lưới khi đồ thị làm việc
    const [FX, FY, FH] = FACE, p = presence(t, this.t0 - 1, this.give.start - 0.3, { outDur: 0.35 });
    if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l)) : 1); }
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

- [ ] **Step: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P17 from './plates/p17-mirror2.js';
```
Thay phần cuối khối `order` (từ `[tl.at('Backward question.'), P12]` tới hết `end: SONG.duration,`) bằng:
```js
            [tl.at('Backward question.'), P12],
            [tl.at('Money in the bank,'), P13],
            [tl.at('Now the unknown'), P14],
            [tl.at("That's the whole question."), P15],
            [tl.at('We already knew the question,'), P16],
            [tl.at('Run it forward,', 2), P17]], beat, end: SONG.duration,
```

- [ ] **Step: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 98.86,98.92,99.4,100.6,101.5,102.5,103.9,105.5,107.4,108.1,108.9,110.0,111.2,112.0,112.7 --outdir out/check/p17`
Expected:
- 98.86: kính rạn dày, mặt cận ở sau kính.
- 98.92:
  - Mảnh kính văng tứ tung về phía camera.
  - Hiện hai gương chéo và sảnh gương (khung lồng nhau).
  - Mặt vẫn đúng chỗ.
- 99.4 / 100.6: đường cong vàng vạch từ trái sang; đường cong xanh là ảnh của nó qua gương.
- 101.5: vạch nối nét đứt màu trắng, vuông góc gương, nối hai đường cong; lời vọng lật gương màu xanh ở góc trên-trái.
- 103.9 / 105.5: trục mờ; điểm `2` trên trục ngang → đường mũ → `4` trên trục dọc (màu vàng).
- 107.4: `4` → đường log → `2` (màu xanh).
- 108.1: đồ thị đang bị ép dẹt qua gương.
- 108.9: vàng ⇄ xanh đổi chỗ; **chữ số vẫn đọc xuôi**.
- 110.0 / 111.2: nhân vật nhảy giữa hai gương; vòng chữ FORWARD/BACKWARD; kính vạn hoa đường cong.
- 112.0: khung xoay, **không lộ mép**.
- 112.7: tất cả đang vỡ thành ký hiệu.

- [ ] **Step: Test toàn bộ**

Run: `node --test tools/test/*.test.mjs` → PASS (52).

- [ ] **Step: Commit**

```bash
git add projects/mv/exp-log/chorus2.js projects/mv/exp-log/plates/p17-mirror2.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P17 — the glass explodes into two mirrors; chorus 2 told with exp and log graphs"
```

---

### Task 8: Kiểm tất định + chỗ nối, render 64.32 → 112.80, ghép 0 → 112.80, đo, cập nhật TREATMENT

**Files:** Modify `projects/mv/exp-log/TREATMENT.md` (§P15–P17 theo các lệch có chủ ý ở đầu kế hoạch); Create (không commit) `out/exp-log-part3.mp4`, `out/exp-log-0-112.mp4`

- [ ] **Step 1: Tất định xuôi/ngược**

```bash
TS=64.4,67.3,70.3,73.0,76.3,79.0,82.5,85.9,88.7,91.2,95.2,97.9,99.1,103.9,108.1,111.2
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $TS --outdir out/det3/a
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $(echo $TS | tr ',' '\n' | tac | paste -sd,) --outdir out/det3/b
diff <(cd out/det3/a && md5sum *.png) <(cd out/det3/b && md5sum *.png) && echo "TẤT ĐỊNH OK"
```
Expected: `TẤT ĐỊNH OK`.

- [ ] **Step 2: Chỗ nối (Review Focus #2)**

```bash
for T in 64.32 72.46 81.78 90.468 98.88; do
  A=$(LC_ALL=C python3 -c "print(f'{$T-1/60:.4f}')")
  node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $A,$T --outdir out/check/seam3-$T
  echo "$T $(compare -metric PSNR $(ls out/check/seam3-$T/t_*.png | sort -V) null: 2>&1)"
done
```
Expected:
- 64.32, 72.46, 81.78, 90.468: ≥ 20 dB (đo được khoảng 25–27).
- 98.88: thấp (khoảng 15), vì đó là cú vỡ có chủ ý.

- [ ] **Step 3: Render đoạn mới và ghép**

`out/exp-log-part2.mp4` (33.233333 → 64.32) kết thúc đúng ở 64.32, tức cuối file. Vì vậy đoạn 3 bắt đầu đúng 64.32 và không cần khung khoá giữa file.
```bash
node engine/render/shoot.js video --page projects/mv/exp-log/index.html --dur 239.65 --from 64.32 --to 112.80 \
  --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-part3.mp4
node tools/stitch.mjs --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-0-112.mp4 \
  out/exp-log-slice.mp4@0:0:33.233333 out/exp-log-part2.mp4@33.233333:33.233333:64.32 out/exp-log-part3.mp4@64.32:64.32:112.80
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames:format=duration -of compact out/exp-log-0-112.mp4
```
Expected: `nb_read_frames=6768` (= round(112.80·60)), duration ≈ 112.80.

- [ ] **Step 4: Đo + tờ 6fps**

```bash
node tools/review.mjs out/exp-log-0-112.mp4 projects/mv/exp-log
ffmpeg -v error -y -ss 64.32 -i out/exp-log-0-112.mp4 -vf "fps=6,scale=320:-1,tile=20x15" -frames:v 1 out/check/64-112-6fps.jpg
```
Expected: ghi lại các số đo. NHÌN tờ 6fps: mạch cảnh phải đọc được khi tắt tiếng. Thứ tự cần thấy:
1. Con dấu vỡ → sảnh két → chồng xu → token ×1.07 → câu hỏi bị gạch đỏ → ×2 → lịch "?".
2. □ trốn → ÷ ngã → 1.07^□ = 2.
3. Hộp trống → câu tràn → log₁.₀₇ 2 → đũa vỡ → 10.2.
4. Kính → rạn → VỠ → hai gương → đường cong mũ/log → gập → nhảy → kính vạn hoa.

- [ ] **Step 5: Cập nhật TREATMENT §P15–P17** theo mục "Lệch có chủ ý" ở đầu kế hoạch, rồi commit:

```bash
git add projects/mv/exp-log/TREATMENT.md
git commit -m "docs(exp-log): treatment P15–P17 follows the bank world and the graph chorus"
```
