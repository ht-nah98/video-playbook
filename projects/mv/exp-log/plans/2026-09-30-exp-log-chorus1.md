# exp-log — Kế hoạch 2: sân khấu nhiều lớp + P09–P12 (35.68 → 64.32)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp thị giác sau lát cắt 1 bằng sân khấu nhiều lớp độ sâu và camera theo cảnh (chỉ ở cảnh giàu vật thể), dựng P09–P12 (pre-chorus 1, chorus 1 — TẤM GƯƠNG, post-chorus tới con dấu LOGARITHM), và giao video 0 → 64.32 ghép từ bản cũ + đoạn mới mà không render lại phần cũ.

**Architecture:** Engine thêm ba năng lực thuần theo `t`: `engine/stage.js` (sàn ký hiệu phản chiếu, chân trời, vòng chữ, bokeh), `engine/morph.js` (hạt nổ-rồi-tụ, và `shatter()` — cả cảnh vỡ thành ký hiệu lấy màu từ chính hình, lối ra mặc định của cảnh), và camera/tham số nền theo từng cảnh trong `Show` (`plate.camera(t)`, `plate.backdropAt(t)`). Các lớp sân khấu mặc định TẮT nên P01–P08 giữ nguyên từng pixel (trừ 0.35s cuối P08 nay vỡ ra). Hình dùng chung của điệp khúc nằm ở `projects/mv/exp-log/chorus.js` để P11a → P11b → P12 nối liền. Video giao bằng `tools/stitch.mjs`: chép luồng hình (không mã hoá lại), cắt ở khung khoá, gắn audio cả bài một lần.

**Tech Stack:** JavaScript ES modules (không build step), Canvas 2D, Node 22 (`node --test`), Chrome headless (`engine/render/shoot.js`), ffmpeg/ffprobe, ImageMagick `montage`/`compare`.

**Spec:** `projects/mv/exp-log/TREATMENT.md` §P09–P12, § Nhịp & chuyển cảnh, § Bản đồ năng lượng, § Mốc nhạc cụ; `docs/mv/REFERENCE-TEARDOWN.md` §4 (nền ≥ 2 lớp độ sâu), §5 (chuyển cảnh). Góp ý người dùng sau lát cắt 1 (2026-09-30): nền navy trống thì camera CỐ ĐỊNH; camera chỉ dùng khi có vật thể lớn / nền giàu.

**Code trong kế hoạch này đã chạy thật** trên bản sao repo (ảnh chụp từng cảnh đã được nhìn, 50/50 test qua, tất định xuôi/ngược trùng md5, P01–P08 trùng md5 với bản cũ). Chép đúng nguyên văn.

## Global Constraints

- Khung 1920×1080, 60fps (`engine/lib.js` `W`, `H`).
- Mọi hàm vẽ là **hàm thuần của `t`**: CẤM `Math.random`, `Date.now`, `performance.now` trong engine và plate. Ngẫu nhiên dùng `hash(n)`.
- Mốc lời lấy bằng `tl.line(...)`/`tl.at(...)` (`engine/timeline.js`); chỉ mốc nhạc cụ khai báo trong `song.js` hoặc hằng có ghi nguồn `data/stems.json`.
- Bảng màu `PAL` (`projects/mv/exp-log/song.js`). Chỉ vàng và xanh được bloom.
- Chữ **không fade**: hiện bằng decode/đập, mất bằng vỡ thành ký hiệu (`burstText`, `decodeLine` `burstAt`, `footer` burst, `shatter`).
- Nhân vật không cắt cứng vào/ra (`drawTransit`/`figure`); đứng thì alpha 1, `shadow: false`.
- Cảnh không tô nền đặc toàn khung. Được phép: lớp nhuộm trong suốt ≤ 0.1 alpha theo nửa gương, loé ≤ 0.35 alpha ở cú cắt cứng.
- Cắt cứng chỉ ở 63.82 trong kế hoạch này (con dấu LOGARITHM).
- **Camera** chỉ ở cảnh có vật thể lớn/nền giàu, khai báo bằng `camera(t)` trên class cảnh; giá trị camera ở khung cuối cảnh trước phải bằng khung đầu cảnh sau.
- **Lối ra của cảnh**: `shatter()` 0.3–0.35s cuối, `footer(..., { from: this.t0, at: next − 0.3 })`; cảnh nối liền (P11a→P11b→P12) không vỡ mà vẽ tiếp cùng hàm trong `chorus.js`, cảnh sau dùng `footer(..., { from: this.t0, carry: true })`.
- Plate không import plate khác; hình dùng chung đặt ở `projects/mv/exp-log/*.js`.
- Nạp đủ font bằng `Promise.all` trước `init()` — kế hoạch này chỉ dùng Archivo 800/900 và IBM Plex Mono 500/600 đã nạp sẵn trong `index.html`.

## Review Focus

1. **Bản cũ phải trùng từng pixel** cho t < 35.33 sau mọi thay đổi engine (Show, backdrop, mirror): so md5 với ảnh chuẩn chụp ở Task 1 Step 1 → kiểm ở cuối Task 1, 2, 3.
2. **Camera liền mạch qua ranh giới cảnh** (35.68, 37.78, 46.52, 53.24, 60.20): khung t0 − 1/60 và t0 gần như giống nhau (PSNR ≥ 20 dB) — trừ 63.82 là cắt cứng có chủ đích → kiểm ở Task 9 Step 4.
3. **Sai số dấu phẩy động của `outBack(0)`** (ra ~2e-16 > 0): điều kiện hiện vật phải so theo `t >= mốc`, không theo `outBack(...) > 0` → `chorus.js machine()` đã sửa; kiểm ảnh 51.0 (chưa có số 8 ở khe VALUE).
4. **Phản chiếu dưới camera**: `drawReflected` phải giữ biến đổi hiện hành → Task 1.
5. **Ghép video**: điểm vào không phải khung khoá, hoặc hở/chồng một khung giữa hai đoạn → `stitch.mjs` phải dừng với thông báo rõ → test ở Task 9.

---

## File Structure

| file | trách nhiệm |
|---|---|
| `engine/main.js` (sửa) | camera theo cảnh `plate.camera(t)` + tham số nền theo thời gian `plate.backdropAt(t)` |
| `engine/mirror.js` (sửa) | `foldMatrix(L, c)` lật khung quanh gương; `drawReflected` giữ biến đổi hiện hành |
| `engine/stage.js` (mới) | sàn ký hiệu, chân trời, vòng chữ, bokeh |
| `engine/morph.js` (mới) | `morphPoint`, `squarePoints`, `drawMorph`, `shatter` |
| `projects/mv/exp-log/backdrop.js` (sửa) | bật lớp sân khấu theo tham số cảnh (mặc định tắt) |
| `projects/mv/exp-log/kit.js` (sửa) | `footer` thêm `carry` |
| `projects/mv/exp-log/chorus.js` (mới) | hình dùng chung điệp khúc 1: hàng mũi tên, cỗ máy, kính vạn hoa |
| `projects/mv/exp-log/plates/p08-extend.js` (sửa) | lối ra bằng `shatter` |
| `projects/mv/exp-log/plates/p09-truth.js` … `p12-name.js` (mới) | 5 cảnh |
| `projects/mv/exp-log/index.html` (sửa) | thêm cảnh vào `order` |
| `tools/stitch.mjs` (mới) | ghép đoạn render, audio một lần |
| `tools/test/{mirror,stage,morph,stitch}.test.mjs` | test thuần |

---

### Task 1: Camera theo cảnh, nền theo thời gian, lật quanh gương

**Files:**
- Modify: `engine/main.js`, `engine/mirror.js`, `tools/test/mirror.test.mjs`

**Interfaces:**
- Produces (`Show`): mỗi khung, nếu cảnh có `camera(t) → { s=1, x=0, y=0, r=0, cx=960, cy=540, bg=0 }` thì áp lên cảnh: `translate(cx+x, cy+y) · rotate(r) · scale(s) · translate(−cx, −cy)`; lớp nền nhận cùng camera nhân hệ số `bg` (0 = nền đứng yên). Nếu cảnh có `backdropAt(t)` thì dùng giá trị đó thay cho trường `backdrop`. `cfg.camera` của project vẫn là mặc định khi cảnh không khai báo.
- Produces (`engine/mirror.js`): `foldMatrix(L, c) → [a, b, c, d, e, f]` (dùng với `ctx.transform`): c = 1 đơn vị, c = −1 trùng `mirrorMatrix(L)`, c = 0 ép mọi điểm lên gương. `drawReflected` giờ đúng dưới camera.

- [ ] **Step 1: Chụp ảnh chuẩn TRƯỚC khi sửa gì (Review Focus #1)**

```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,12.6,16.5,23.0,26.5,30.8,34.5,35.2 --outdir out/check/baseline
```
Không commit (thư mục `out/` bị ignore). Giữ thư mục này tới hết kế hoạch.

- [ ] **Step 2: Viết test `foldMatrix` (thêm vào cuối `tools/test/mirror.test.mjs`)**

Sửa dòng import thành:
```js
import { line, reflectPoint, mirrorMatrix, side, foldMatrix } from '../../../engine/mirror.js';
```
Thêm:
```js
test('foldMatrix: c = 1 là đơn vị, c = −1 trùng mirrorMatrix', () => {
  const S = line(420, 1080, 1500, 0);
  assert.ok(near(foldMatrix(S, 1), [1, 0, 0, 1, 0, 0]));
  assert.ok(near(foldMatrix(S, -1), mirrorMatrix(S)));
});

test('foldMatrix: c = 0 ép mọi điểm lên gương; điểm trên gương đứng yên', () => {
  const S = line(420, 1080, 1500, 0);
  const [a, b, c, d, e, f] = foldMatrix(S, 0);
  const ap = ([x, y]) => [a * x + c * y + e, b * x + d * y + f];
  assert.equal(side(ap([300, 200]), S), 0);
  assert.ok(near(ap([960, 540]), [960, 540]));
});

test('foldMatrix: gương suy biến → đơn vị, không NaN', () => {
  assert.ok(near(foldMatrix(line(5, 5, 5, 5), 0), [1, 0, 0, 1, 0, 0]));
});
```

- [ ] **Step 3: Chạy — phải FAIL**

Run: `node --test tools/test/mirror.test.mjs`
Expected: FAIL — `foldMatrix` is not exported.

- [ ] **Step 4: `engine/mirror.js`**

Thêm ngay trước `export function reflectPoint`:
```js
/**
 * Lật khung quanh đường gương như lật tấm bìa: thành phần vuông góc với gương nhân c.
 * c = 1 → giữ nguyên; c = 0 → dẹt thành đường gương; c = −1 → đúng bằng mirrorMatrix.
 * Dùng c = cos(πk) để lật từ k = 0 tới k = 1.
 */
export function foldMatrix(L, c) {
  const u = unit(L);
  if (!u) return [1, 0, 0, 1, 0, 0];
  const [ux, uy] = u, q = c - 1;                     // A = I + (c − 1)·n·nᵀ, n = (−uy, ux)
  const a = 1 + q * uy * uy, b = -q * ux * uy, d = 1 + q * ux * ux;
  return [a, b, b, d, L.x0 - (a * L.x0 + b * L.y0), L.y0 - (b * L.x0 + d * L.y0)];
}
```
Trong `drawReflected`, thay dòng `b.save(); b.transform(...mirrorMatrix(L)); fn(b); b.restore();` bằng:
```js
  b.save(); b.setTransform(g.getTransform()); b.transform(...mirrorMatrix(L)); fn(b); b.restore();   // giữ camera/biến đổi hiện hành của g
```

- [ ] **Step 5: `engine/main.js` — thay toàn bộ file**

```js
// Điều phối cảnh — KHÔNG biết gì về một bài hát cụ thể.
// Project truyền vào danh sách cảnh; engine lo thứ tự, lớp nền và render.
import { W, H, C } from './lib.js';
import { Mascot } from './mascot.js';
import { backdrop } from './backdrop.js';

export class Show {
  /**
   * @param {object} cfg
   * @param {Array<[number, class]>} cfg.order  [mốc bắt đầu, lớp cảnh]
   * @param {object} cfg.beat   từ makeBeat() — lớp nền bám nhịp này
   * @param {number} cfg.end    thời lượng bài (giây)
   * @param {string} cfg.assets đường dẫn tới assets/character/cut
   * @param {string[]} [cfg.poses] danh sách pose (mặc định POSES_V1)
   * @param {string} [cfg.bg] màu nền
   * @param {Function} [cfg.backdrop] thay nền mặc định
   * @param {object} [cfg.extra] trộn vào đối số plate.init
   * @param {Function} [cfg.camera] (t, {idx, t0, t1}) → {s, x, y, r, cx, cy, bg}: camera mặc định (cảnh có camera(t) thì dùng của cảnh)
   */
  constructor(cfg) {
    this.cfg = cfg;
    this.order = [...cfg.order].sort((a, b) => a[0] - b[0]);  // luôn theo thời gian
  }

  async init() {
    this.mascot = await new Mascot().load(this.cfg.assets, this.cfg.poses);
    this.plates = [];
    for (const [t0, Cls] of this.order) {
      const pl = new Cls();
      pl.t0 = t0;                                   // mốc vào cảnh — kit.footer dùng để không lôi dòng của cảnh trước về
      await pl.init({ mascot: this.mascot, beat: this.cfg.beat, ...(this.cfg.extra || {}) });
      this.plates.push([t0, pl]);
    }
  }

  render(g, t) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
    g.fillStyle = this.cfg.bg || C.navy;
    g.fillRect(0, 0, W, H);

    // cảnh đang hoạt động = cảnh có mốc LỚN NHẤT mà ≤ t
    let cur = null, best = -Infinity, idx = 0;
    for (let i = 0; i < this.plates.length; i++) {
      const [t0, pl] = this.plates[i];
      if (t >= t0 && t0 > best) { best = t0; cur = pl; idx = i; }
    }

    // Lớp nền dùng chung, bám BEAT (không bám lời — giọng rap chạy tự do).
    // Cảnh nào cần nền riêng thì đặt `backdrop = false` trên class.
    // LƯU Ý: cảnh KHÔNG được tô nền toàn khung, nếu không lớp này bị xoá sạch.
    // Camera: cảnh tự khai báo `camera(t) → {s, x, y, r, cx, cy, bg}` (ưu tiên), không thì cfg.camera của project.
    // bg ∈ [0,1] = phần camera áp lên lớp nền (0: nền đứng yên, 1: nền đi cùng cảnh).
    const cam = cur?.camera ? cur.camera(t)
      : this.cfg.camera ? this.cfg.camera(t, { idx, t0: best, t1: this.plates[idx + 1]?.[0] ?? this.cfg.end }) : null;
    const applyCam = (f) => {
      if (!cam || f <= 0) return;
      const { s = 1, x = 0, y = 0, r = 0, cx = W / 2, cy = H / 2 } = cam;
      const ss = 1 + (s - 1) * f;
      g.translate(cx + x * f, cy + y * f); g.rotate(r * f); g.scale(ss, ss); g.translate(-cx, -cy);
    };

    // Lớp nền dùng chung, bám BEAT (không bám lời — giọng rap chạy tự do).
    // Cảnh cần nền riêng: `backdrop = false`; tham số nền đổi theo t: khai báo backdropAt(t).
    // LƯU Ý: cảnh KHÔNG được tô nền toàn khung, nếu không lớp này bị xoá sạch.
    const bd = cur?.backdropAt ? cur.backdropAt(t) : cur?.backdrop;
    if (bd !== false) {
      g.save(); applyCam(cam?.bg ?? 0);
      (this.cfg.backdrop || backdrop)(g, t, {
        scene: idx + 1, total: this.plates.length, beat: this.cfg.beat, ...(bd || {}),
      });
      g.restore();
    }

    if (cur) {
      g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.globalAlpha = 1;
      applyCam(1);
      cur.render(g, t);
      g.restore();
    }
  }
}
```

- [ ] **Step 6: Test và kiểm bản cũ không đổi**

Run: `node --test tools/test/*.test.mjs`
Expected: PASS toàn bộ (40 test: 37 cũ + 3 mới).
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,12.6,16.5,23.0,26.5,30.8,34.5,35.2 --outdir out/check/base-now
diff <(cd out/check/baseline && md5sum *.png) <(cd out/check/base-now && md5sum *.png) && echo "CŨ KHÔNG ĐỔI"
```
Expected: `CŨ KHÔNG ĐỔI` (không cảnh cũ nào khai báo `camera`/`backdropAt`).

- [ ] **Step 7: Commit**

```bash
git add engine/main.js engine/mirror.js tools/test/mirror.test.mjs
git commit -m "feat(engine): per-scene camera and backdrop, fold across the mirror"
```

---

### Task 2: Sân khấu nhiều lớp (`engine/stage.js`) + nền exp-log bật theo cảnh

**Files:**
- Create: `engine/stage.js`, `tools/test/stage.test.mjs`
- Modify: `projects/mv/exp-log/backdrop.js`

**Interfaces:**
- Produces (`engine/stage.js`): `floorPoint(i, t, { horizon=660, speed=0.06, sway=16 }) → { x, y, size, a, glyph }` (thuần); `glyphFloor(g, t, { horizon, n=760, beat, colA, colB, mirror, alpha, speed })`; `horizonGlow(g, { y, color, alpha })`; `textRings(g, t, cx, cy, { texts, r0, gap, n, spin, colors, alpha, font })`; `bokeh(g, t, { n, colors, alpha, seed })`.
- Produces (`projects/mv/exp-log/backdrop.js`): tham số mới `floor` (alpha sàn, mặc định 0 = tắt), `floorA`, `floorB`, `mirror` (tô sàn theo nửa gương), `horizon`, `rings` (object cho `textRings` hoặc null), `bokeh` (alpha, mặc định 0).
- Consumes: `GLYPHS` (`engine/glyphs.js`), `arcText` (`engine/typeobj.js`), `side` (`engine/mirror.js`), `MIRROR` (`song.js`).

- [ ] **Step 1: Viết test `tools/test/stage.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPoint } from '../../../engine/stage.js';

test('floorPoint: nằm giữa chân trời và mép dưới, alpha trong [0, 1]', () => {
  for (let i = 0; i < 300; i++) for (const t of [0, 3.3, 47.1, 200]) {
    const p = floorPoint(i, t, { horizon: 660 });
    assert.ok(p.y >= 660 && p.y <= 1080, `y=${p.y}`);
    assert.ok(p.a >= 0 && p.a <= 1, `a=${p.a}`);
    assert.ok(Number.isFinite(p.x) && p.size > 0);
  }
});

test('floorPoint: thuần — cùng (i, t) cùng kết quả bất kể thứ tự gọi', () => {
  const ts = [50, 1, 30, 2.5, 49.9];
  const a = ts.map(t => floorPoint(7, t)), b = [...ts].reverse().map(t => floorPoint(7, t)).reverse();
  assert.deepEqual(a, b);
});

test('floorPoint: gần lúc quấn vòng (v ≈ 0 hoặc 1) gần như tắt → không giật', () => {
  // quét t mịn: mỗi lần y nhảy ngược (quấn) thì alpha hai phía đều nhỏ
  let prev = floorPoint(3, 0);
  for (let t = 0.01; t < 40; t += 0.01) {
    const p = floorPoint(3, t);
    if (p.y < prev.y - 50) assert.ok(prev.a < 0.08 && p.a < 0.08, `quấn ở t=${t.toFixed(2)} a=${prev.a},${p.a}`);
    prev = p;
  }
});
```

- [ ] **Step 2: Chạy — phải FAIL** (`Cannot find module .../engine/stage.js`)

Run: `node --test tools/test/stage.test.mjs`

- [ ] **Step 3: `engine/stage.js`**

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
export function floorPoint(i, t, { horizon = 660, speed = 0.06, sway = 16 } = {}) {
  const u = hash(i * 3.7), ph = hash(i * 12.3 + 9);
  const v = (hash(i * 8.1 + 5) + t * speed * (0.6 + ph * 0.8)) % 1;
  const d = v * v;                                            // phối cảnh: dồn về chân trời
  const y = horizon + (H - horizon) * (0.02 + 0.98 * d);
  const spread = 0.35 + 1.25 * d;
  const x = W / 2 + (u - 0.5) * 2 * W * spread + Math.sin(t * 0.5 + ph * 9) * sway * spread;   // rộng gấp đôi khung: camera dịch/xoay không lộ mép
  const tw = 0.3 + 0.7 * Math.pow(Math.abs(Math.sin(t * (1.1 + ph * 2.4) + ph * 6.3)), 2.4);
  const edge = clamp(Math.min(v / 0.08, (1 - v) / 0.08));     // sinh/tắt mềm ở hai đầu → không giật khi quấn
  return { x, y, size: 9 + 25 * d, a: tw * edge * (0.35 + 0.65 * d), glyph: GLYPHS[Math.floor(ph * GLYPHS.length)] };
}

/**
 * Sàn ký hiệu. colA/colB: hai màu; nếu truyền `mirror` (đường gương) thì màu theo
 * phía của điểm (side > 0 → colA), không thì xen kẽ theo i.
 */
export function glyphFloor(g, t, { horizon = 660, n = 760, beat = null, colA = '#FFB547', colB = '#3FB8FF',
  mirror = null, alpha = 1, speed = 0.06 } = {}) {
  if (alpha <= 0) return;
  const b = beat ? beat.onBeat(t, 0.3) : 0;
  g.save();
  g.globalCompositeOperation = 'lighter'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const p = floorPoint(i, t, { horizon, speed });
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

- [ ] **Step 4: `projects/mv/exp-log/backdrop.js` — thay toàn bộ file**

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
  rings = null, bokeh = 0 } = {}) {
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
    glyphFloor(g, t, { horizon, beat, colA: floorA, colB: floorB, mirror: mirror ? MIRROR : null, alpha: floor });
  }
}
```

- [ ] **Step 5: Test và kiểm bản cũ không đổi**

Run: `node --test tools/test/*.test.mjs` → PASS (43).
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,12.6,16.5,23.0,26.5,30.8,34.5,35.2 --outdir out/check/base-now
diff <(cd out/check/baseline && md5sum *.png) <(cd out/check/base-now && md5sum *.png) && echo "CŨ KHÔNG ĐỔI"
```
Expected: `CŨ KHÔNG ĐỔI`.

- [ ] **Step 6: Commit**

```bash
git add engine/stage.js tools/test/stage.test.mjs projects/mv/exp-log/backdrop.js
git commit -m "feat(engine): layered stage — glyph floor, horizon, text rings, bokeh"
```

---

### Task 3: Nổ-rồi-tụ (`engine/morph.js`) + P08 thoát bằng `shatter`

**Files:**
- Create: `engine/morph.js`, `tools/test/morph.test.mjs`
- Modify: `projects/mv/exp-log/plates/p08-extend.js`

**Interfaces:**
- Produces: `morphPoint(a, b, k, i, { spread=240, swirl=0.5 }) → [x, y, u]` (k=0 → a, k=1 → b, phình ra giữa đường); `squarePoints(cx, cy, s, n=80) → [[x,y]…]`; `drawMorph(g, A, B, k, t, { n, font, colA, colB, spread, alpha })` (không vẽ gì khi k ≤ 0 hoặc k ≥ 1); `shatter(g, paint, k, t, { cell=12, seed=0, spread=0.35 })` — k ≤ 0: gọi `paint(g)` như thường; 0 < k < 1: vẽ `paint` vào bộ đệm (giữ biến đổi hiện hành), mỗi ô 12px có nội dung thành một ký hiệu màu của ô đó bay ra, mờ dần; k ≥ 1: không vẽ. **Không gọi `shatter` lồng nhau** (một bộ đệm chung).
- P08: nội dung chuyển sang `paint(g, t)`; `render` = `shatter` trong 0.35s cuối + `footer` vỡ ở `next − 0.3`.

- [ ] **Step 1: Viết test `tools/test/morph.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { morphPoint, squarePoints } from '../../../engine/morph.js';

const near = (a, b, e = 1e-9) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;

test('morphPoint: k = 0 ở nguồn, k = 1 ở đích, với mọi hạt', () => {
  for (let i = 0; i < 200; i++) {
    assert.ok(near(morphPoint([10, 20], [900, 500], 0, i), [10, 20]));
    assert.ok(near(morphPoint([10, 20], [900, 500], 1, i), [900, 500]));
  }
});

test('morphPoint: giữa đường hạt phình ra (nổ) chứ không đi thẳng', () => {
  let off = 0;
  for (let i = 0; i < 100; i++) {
    const [x, y] = morphPoint([0, 0], [1000, 0], 0.5, i);
    off += Math.abs(y);
  }
  assert.ok(off / 100 > 40, `lệch trung bình ${off / 100}`);
});

test('squarePoints: nằm trên chu vi hình vuông', () => {
  for (const [x, y] of squarePoints(500, 400, 100, 40)) {
    const onX = Math.abs(Math.abs(x - 500) - 50) < 1e-9, onY = Math.abs(Math.abs(y - 400) - 50) < 1e-9;
    assert.ok(onX || onY, `${x},${y}`);
  }
});
```

- [ ] **Step 2: Chạy — phải FAIL** (`Cannot find module`)

Run: `node --test tools/test/morph.test.mjs`

- [ ] **Step 3: `engine/morph.js`**

```js
// engine/morph.js
// Ký hiệu nổ ra rồi tụ lại thành hình sau (TREATMENT § Nhịp & chuyển cảnh; TEARDOWN §5).
// Tập điểm nguồn A → tập điểm đích B; mỗi hạt lệch pha riêng và phình ra giữa đường
// (nổ), rồi co về đích (tụ). Hàm thuần của k và t.
import { hash, clamp } from './lib.js';
import { GLYPHS } from './glyphs.js';

const LAG = 0.35;                                   // lệch pha tối đa giữa các hạt

/** Vị trí hạt i ở tiến độ k ∈ [0,1]: k=0 → a, k=1 → b. Trả [x, y, u] với u là tiến độ riêng của hạt. */
export function morphPoint(a, b, k, i, { spread = 240, swirl = 0.5 } = {}) {
  const u = clamp((k - hash(i * 7.3) * LAG) / (1 - LAG));
  const e = u * u * (3 - 2 * u);
  const ang = hash(i * 3.1) * Math.PI * 2 + swirl * e * 6;
  const bulge = Math.sin(Math.PI * e) * spread * (0.5 + hash(i * 5.9));
  return [a[0] + (b[0] - a[0]) * e + Math.cos(ang) * bulge, a[1] + (b[1] - a[1]) * e + Math.sin(ang) * bulge, u];
}

/** Điểm đều trên chu vi hình vuông tâm (cx, cy), cạnh s. */
export function squarePoints(cx, cy, s, n = 80) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = (i / n) * 4, e = Math.floor(p), f = p - e, h = s / 2;
    const [x, y] = [[-h + f * s, -h], [h, -h + f * s], [h - f * s, h], [-h, h - f * s]][e];
    out.push([cx + x, cy + y]);
  }
  return out;
}

/** Vẽ đám hạt đang biến hình. n hạt; A, B lặp vòng nếu ngắn hơn n. Màu nội suy colA → colB theo u. */
export function drawMorph(g, A, B, k, t, { n = Math.max(A.length, B.length), font = '500 22px "IBM Plex Mono"',
  colA = '#FFB547', colB = '#3FB8FF', spread = 240, alpha = 1 } = {}) {
  if (!A.length || !B.length || k <= 0 || k >= 1) return;
  g.save(); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const [x, y, u] = morphPoint(A[i % A.length], B[i % B.length], k, i, { spread });
    g.globalAlpha = alpha;
    g.fillStyle = u < 0.5 ? colA : colB;
    g.fillText(GLYPHS[Math.floor(hash(i * 1.7 + Math.floor(t * 20)) * GLYPHS.length)], x, y);
  }
  g.restore();
}

/**
 * Cả cảnh vỡ thành ký hiệu (lối ra mặc định của cảnh — chữ không bao giờ tắt cứng).
 * paint(ctx) vẽ nội dung cảnh; k ∈ [0,1]: 0 = vẽ nguyên, 1 = tan hết. Mỗi ô `cell` px có
 * nội dung thành MỘT ký hiệu mang màu của chính ô đó, bay ra xa dần và mờ đi.
 * Đắt (đọc pixel) — chỉ gọi trong ~0.3–0.4s chuyển cảnh.
 */
let sbuf = null;
export function shatter(g, paint, k, t, { cell = 12, seed = 0, spread = 0.35 } = {}) {
  if (k <= 0) { paint(g); return; }
  if (k >= 1) return;
  const W = g.canvas.width, H = g.canvas.height;
  if (!sbuf) { sbuf = document.createElement('canvas'); sbuf.width = W; sbuf.height = H; }
  const b = sbuf.getContext('2d', { willReadFrequently: true });
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.setTransform(g.getTransform()); paint(b); b.restore();
  const d = b.getImageData(0, 0, W, H).data;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  g.font = `600 ${cell + 4}px "IBM Plex Mono"`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let y = cell / 2; y < H; y += cell) for (let x = cell / 2; x < W; x += cell) {
    const p = (Math.floor(y) * W + Math.floor(x)) * 4;
    if (d[p + 3] < 60) continue;
    const o = hash(x * 0.131 + y * 7.17 + seed);
    const u = clamp((k - o * 0.4) / 0.6);                  // ô sau vỡ muộn hơn
    if (u >= 1) continue;
    const ang = hash(x * 3.3 + y * 0.71 + seed) * Math.PI * 2, dist = u * u * spread * W;
    g.globalAlpha = 1 - u;
    g.fillStyle = `rgb(${d[p]},${d[p + 1]},${d[p + 2]})`;
    g.fillText(GLYPHS[Math.floor(o * GLYPHS.length)], x + Math.cos(ang) * dist, y + Math.sin(ang) * dist);
  }
  g.restore();
}
```

- [ ] **Step 4: Sửa `projects/mv/exp-log/plates/p08-extend.js`**

Thêm import sau dòng import `presence`:
```js
import { shatter } from '../../../../engine/morph.js';
```
Thay hai dòng mở đầu `render`:
```js
  render(g, t) {
    const { zero, neg, frac, law, step } = this;
```
bằng:
```js
  render(g, t) {
    // lối ra: cả biểu đồ vỡ thành ký hiệu trong 0.35s cuối, lời chân khung vỡ theo
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 8 });
    footer(g, this.tl, t, ['zero', 'negative', 'roots', 'law', 'step'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  paint(g, t) {
    const { zero, neg, frac, law, step } = this;
```
Xoá dòng `footer(...)` cũ ở cuối (dòng `footer(g, this.tl, t, ['zero', 'negative', 'roots', 'law', 'step'], { from: this.t0 });`).

- [ ] **Step 5: Test, kiểm bản cũ không đổi (t ≤ 35.2), nhìn lối ra P08**

Run: `node --test tools/test/*.test.mjs` → PASS (46).
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,12.6,16.5,23.0,26.5,30.8,34.5,35.2 --outdir out/check/base-now
diff <(cd out/check/baseline && md5sum *.png) <(cd out/check/base-now && md5sum *.png) && echo "CŨ KHÔNG ĐỔI"
```
Expected: `CŨ KHÔNG ĐỔI` (35.2 < 35.33, lúc P08 chưa vỡ).
Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 35.40,35.55,35.66 --outdir out/check/p08-exit`
Expected (NHÌN): 35.40 biểu đồ đang tan thành ký hiệu cùng màu (vàng/xanh/trắng); 35.55 chỉ còn hạt thưa bay ra; 35.66 gần trống. Không có chữ tắt cứng.

- [ ] **Step 6: Commit**

```bash
git add engine/morph.js tools/test/morph.test.mjs projects/mv/exp-log/plates/p08-extend.js
git commit -m "feat(engine): glyph morph and scene shatter; P08 exits by shattering"
```

---

### Task 4: P09 `truth` (35.68 → 37.78)

**Files:**
- Create: `projects/mv/exp-log/plates/p09-truth.js`
- Modify: `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes: `shatter` (Task 3), `decodeChars` (`engine/glyphs.js`), `presence`, `figure`/`footer` (`kit.js`), `backdropAt`/`camera` (Task 1), `floor` (Task 2).
- Mốc cảnh: `tl.at("We didn't pick the meaning.")`. Cảnh sau: `tl.at('Keep the rule alive,')`. Camera cuối cảnh: `{ s: 1.04, bg: 0.3 }` — P10 bắt đầu đúng giá trị này. Sàn cuối cảnh: `floor: 1, horizon: 700`.

**Spec (TREATMENT P09):** các lá bài "định nghĩa" bị gạt khỏi bàn; 36.60 nhân vật đi dọc sợi chỉ vàng; chữ **TRUE** trắng sắc; nhân vật ra bằng **cột ký hiệu dọc**. Sân khấu (sàn ký hiệu + chân trời) bật lần đầu ở cảnh này.

- [ ] **Step 1: `projects/mv/exp-log/plates/p09-truth.js`**

```js
// P09 truth — "Đi theo điều phải đúng" · 35.68 → 37.78 (TREATMENT P09)
// Sân khấu nhiều lớp bật lần đầu: sàn ký hiệu + chân trời. Các lá bài "định nghĩa" bị gạt
// khỏi bàn; sợi chỉ vàng; nhân vật đi dọc sợi chỉ; TRUE trắng sắc.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';

const CARDS = [['aⁿ =', 'a·a·…·a'], ['n =', '1, 2, 3 …'], ['a⁰ =', '?'], ['a⁻¹ =', '?'], ['a^½ =', '?']];
const THREAD = [[-60, 780], [600, 700], [1300, 720], [1980, 560]];   // bézier bậc ba, trên mặt sàn
const bez = (u) => {
  const [a, b, c, d] = THREAD, v = 1 - u;
  return [0, 1].map(k => v * v * v * a[k] + 3 * v * v * u * b[k] + 3 * v * u * u * c[k] + u * u * u * d[k]);
};

export default class P09 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.l1 = s.tl.line("We didn't pick the meaning.");
    this.l2 = s.tl.line('We followed');
    this.l3 = s.tl.line('what had to stay true.');
    this.pick = this.l1.words[2].start;           // "pick": gạt bài
    this.tTrue = this.l3.words[4].start;          // "true"
    this.next = s.tl.at('Keep the rule alive,');
  }
  backdropAt(t) {                                  // sàn hiện dần khi vào cảnh — P10 nhận sàn đầy
    return { glow: 0.8, floor: smooth(prog(t, this.t0, this.t0 + 0.6)), horizon: 700 };
  }
  camera(t) { return { s: 1 + 0.04 * smooth(prog(t, this.t0, this.next)), bg: 0.3 }; }
  render(g, t) {
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 9 });
    footer(g, this.tl, t, ['meaning', 'followed', 'true'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  card(g, i, x, y, rot) {
    g.save(); g.translate(x, y); g.rotate(rot);
    g.fillStyle = PAL.paper; g.fillRect(-140, -90, 280, 180);
    g.strokeStyle = PAL.fwd; g.lineWidth = 4; g.strokeRect(-140, -90, 280, 180);
    g.fillStyle = PAL.block; g.font = '500 20px "IBM Plex Mono"'; g.textAlign = 'left'; g.fillText(`DEF #${i + 1}`, -122, -58);
    g.fillStyle = PAL.ink; g.textAlign = 'center';
    g.font = '800 44px "Archivo"'; g.fillText(CARDS[i][0], 0, -2);
    g.font = '500 34px "IBM Plex Mono"'; g.fillText(CARDS[i][1], 0, 52);
    g.restore();
  }
  paint(g, t) {
    // 1) năm lá bài chia ra thành hình quạt, rồi bị gạt sang trái ở "pick"
    CARDS.forEach((_, i) => {
      const inK = outBack(clamp((t - this.t0 - 0.05 * i) / 0.3));
      if (inK <= 0) return;
      const sw = smooth(prog(t, this.pick + 0.06 * (4 - i), this.pick + 0.06 * (4 - i) + 0.45));
      if (sw >= 1) return;
      const x = 560 + i * 200 - 2400 * sw * sw, y = 430 + (1 - inK) * 500 - 160 * sw;
      this.card(g, i, x, y, (i - 2) * 0.08 - 1.4 * sw);
    });
    // 2) sợi chỉ vàng vạch từ trái sang phải
    const draw = smooth(prog(t, this.l2.start, this.l2.start + 0.7));
    if (draw > 0) {
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 6; g.shadowColor = PAL.fwd; g.shadowBlur = 26; g.lineCap = 'round';
      g.beginPath();
      for (let u = 0; u <= draw + 1e-9; u += 0.01) { const [x, y] = bez(Math.min(u, draw)); u === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke(); g.restore();
    }
    // 3) nhân vật đi dọc sợi chỉ (chân đặt trên chỉ), vào bằng hàng, ra bằng cột ký hiệu
    const walk = prog(t, this.l2.start, this.next);
    const [fx, fy] = bez(0.18 + 0.22 * walk);
    const p = presence(t, this.l2.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'wave', fx, fy + 6, 420, p.state === 'out' ? 'columns' : 'rows', p, { t, seed: 9 });
    // 4) TRUE: giải mã từng chữ từ "what", chốt đúng chữ "true", gạch vàng chạy dưới chân
    if (t >= this.l3.start) {
      const chars = decodeChars('TRUE', t, this.l3.start, this.tTrue, { scramble: 0.3, seed: 9 });
      g.save(); g.font = '900 210px "Archivo"'; g.textAlign = 'left'; g.fillStyle = PAL.truth;
      const ws = [...'TRUE'].map(c => g.measureText(c).width), total = ws.reduce((a, b) => a + b, 0);
      let x = 1330 - total / 2;
      chars.forEach((c, i) => { if (c.state !== 'hidden') g.fillText(c.ch, x, 380); x += ws[i]; });
      const u = smooth(clamp((t - this.tTrue) / 0.2));
      g.fillStyle = PAL.fwd; g.fillRect(1330 - total / 2, 410, total * u, 10);
      g.restore();
    }
  }
}
```

- [ ] **Step 2: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P09 from './plates/p09-truth.js';
```
Thay khối `order:` (tới hết `end: SONG.duration,`) bằng:
```js
    order: [[0, P01], [tl.at('Two to the three?'), P02],
            [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04],
            [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06],
            [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08],
            [tl.at("We didn't pick the meaning."), P09]], beat, end: SONG.duration,
```

- [ ] **Step 3: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 35.9,36.3,36.9,37.3,37.5,37.7 --outdir out/check/p09`
Expected:
- 35.9: năm lá bài giấy trắng viền vàng thành hình quạt (DEF #1…#5, `aⁿ =`, `a⁰ = ?`…); sàn ký hiệu vàng-xanh ở nửa dưới, chân trời vàng mảnh.
- 36.3: các lá bài đang bay sang trái, nghiêng.
- 36.9: sợi chỉ vàng phát sáng vạch từ trái; nhân vật vẫy tay đứng trên sợi chỉ (vào bằng hàng ký hiệu).
- 37.3: chữ TRUE đang giải mã từng chữ (có chữ còn là ký hiệu).
- 37.5: TRUE trắng đủ bốn chữ, gạch vàng chạy dưới; nhân vật đang tan thành cột ký hiệu.
- 37.7: cả cảnh (kể cả TRUE) vỡ thành ký hiệu, lời chân khung vỡ theo.

- [ ] **Step 4: Commit**

```bash
git add projects/mv/exp-log/plates/p09-truth.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P09 truth — cards swept off, golden thread, TRUE"
```

---

### Task 5: P10 `turn` (37.78 → 46.52, pre-chorus 1)

**Files:**
- Create: `projects/mv/exp-log/plates/p10-turn.js`
- Modify: `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes: `mix` (`engine/draw.js`), `shatter`, `powText`/`footer` (`kit.js`), `beat.onBeat`.
- Mốc: đèn lồng sáng ở đầu 4 câu `Keep the rule alive,` · `follow where it goes.` · `Every step reveals` · `something we already know.`; "turn" = từ thứ 2 của `But turn the question round,`; câu hỏi `2^□ = 8` ở `What if the exponent` (ô □ ở từ "exponent"). Cảnh sau: `tl.at('Run it forward,')`.
- Camera: bắt đầu `{ s: 1.04, x: 0, y: 0, r: 0, bg: 0.3 }` (nối P09), kết thúc `{ s: 1, x: 0, y: 0, r: 2π ≡ 0, bg: 1 }`.

**Spec (TREATMENT P10):** camera trượt dọc đường cong, mỗi bước sáng một giá trị đã biết (1, 2, 4, 8 — đèn lồng); 42.08 "turn the question round" — cả khung **xoay 180°**, bảng màu lạnh dần vàng → xanh (bass rút 40–46); 44.20 số mũ bị thay bằng **ô trống □ đỏ** nhấp nháy: `2^□ = 8`; trống dồn 43–46: ô □ rung mạnh dần. Thế giới cũ vỡ khi câu hỏi mới hiện, camera quay nốt vòng về thẳng để chorus bắt đầu từ khung thẳng.

- [ ] **Step 1: `projects/mv/exp-log/plates/p10-turn.js`**

```js
// P10 turn — "Lật câu hỏi" · 37.78 → 46.52 (TREATMENT P10, pre-chorus 1)
// Camera trượt dọc đường cong 2ˣ, mỗi câu thắp một đèn lồng (1, 2, 4, 8). "turn the question
// round": cả khung xoay 180°, vàng nguội dần thành xanh (bass rút 40–46). Thế giới cũ vỡ,
// camera quay nốt vòng về thẳng; còn lại `2^□ = 8` với ô □ đỏ rung mạnh dần theo trống dồn.
import { W, H, clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { mix } from '../../../../engine/draw.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL } from '../song.js';
import { powText, footer } from '../kit.js';

const X = (v) => 620 + v * 420, Y = (h) => 860 - h * 62;       // toạ độ thế giới của đường cong

export default class P10 {
  async init(s) {
    this.tl = s.tl; this.beat = s.beat;
    this.lit = ['Keep the rule alive,', 'follow where it goes.', 'Every step reveals', 'something we already know.']
      .map(l => s.tl.at(l));                      // đèn 2⁰, 2¹, 2², 2³ sáng ở đầu mỗi câu
    this.turn = s.tl.line('But turn the question round,').words[1].start;     // "turn"
    this.what = s.tl.at('What if the exponent');
    this.expo = s.tl.line('What if the exponent').words[3].start;             // "exponent": ô □ hiện
    this.next = s.tl.at('Run it forward,');
  }
  cool(t) { return smooth(prog(t, this.turn, this.what)); }
  backdropAt(t) {
    const c = this.cool(t);
    return { glow: 0.8, horizon: 700, floor: lerp(1, 0.45, smooth(prog(t, 40.0, this.next))),
      floorA: mix(PAL.fwd, PAL.back, c), floorB: PAL.back };
  }
  camera(t) {
    const vc = 3 * smooth(prog(t, this.t0, this.lit[3] + 0.8));
    const back = smooth(prog(t, this.what - 0.2, this.what + 0.7));        // trở về khung thẳng khi thế giới đã vỡ
    const k = 0.55 * smooth(prog(t, this.t0, this.t0 + 0.8)) * (1 - back);
    const s = lerp(1.04, 1, back);
    const r = Math.PI * smooth(prog(t, this.turn, this.turn + 0.9)) + Math.PI * back;   // 0 → π → 2π ≡ 0
    return { s, x: -(X(vc) - W / 2) * s * k, y: -(Y(2 ** vc) - H / 2) * s * k, r,
      bg: lerp(0.3, 1, smooth(prog(t, this.turn - 0.4, this.turn))) };
  }
  render(g, t) {
    if (t < this.what + 0.35) shatter(g, c => this.world(c, t), prog(t, this.what, this.what + 0.35), t, { seed: 10 });
    shatter(g, c => this.question(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 11 });
    footer(g, this.tl, t, ['rule', 'step', 'turn', 'exponent', 'name'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  world(g, t) {
    const c = this.cool(t), gold = mix(PAL.fwd, PAL.back, c), core = mix(PAL.fwdCore, PAL.backCore, c);
    // đường cong vạch trước mặt camera
    const vEnd = lerp(0.2, 3.4, smooth(prog(t, this.t0, this.lit[3] + 0.6)));
    g.save(); g.strokeStyle = core; g.lineWidth = 8; g.shadowColor = gold; g.shadowBlur = 26; g.lineJoin = 'round';
    g.beginPath();
    for (let v = -1.6; v <= vEnd; v += 0.02) { const x = X(v), y = Y(2 ** v); v === -1.6 ? g.moveTo(x, y) : g.lineTo(x, y); }
    g.stroke(); g.restore();
    // đèn lồng: tối (vòng mờ) → sáng (đĩa vàng, số 2ᵛ bên trong, nhãn phía trên)
    this.lit.forEach((tl, v) => {
      const x = X(v), y = Y(2 ** v), on = outBack(clamp((t - tl) / 0.25));
      g.save();
      g.strokeStyle = gold; g.lineWidth = 3; g.globalAlpha = 0.5;
      g.beginPath(); g.arc(x, y, 50, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
      if (on > 0) {
        g.translate(x, y); g.scale(on, on);
        g.fillStyle = gold; g.shadowColor = gold; g.shadowBlur = 40;
        g.beginPath(); g.arc(0, 0, 50, 0, Math.PI * 2); g.fill(); g.shadowBlur = 0;
        g.fillStyle = PAL.bg; g.font = '900 54px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(String(2 ** v), 0, 3);
        g.restore(); g.save();
        powText(g, [['2', String(v)]], x, y - 80, 56, { expCol: gold });
      }
      g.restore();
    });
  }
  question(g, t) {
    if (t < this.what) return;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);                // câu hỏi đứng thẳng trên màn hình
    const s = outBack(clamp((t - this.what) / 0.2));
    g.translate(960, 560); g.scale(s, s);
    g.font = '900 280px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'right'; g.textBaseline = 'alphabetic';
    g.fillText('2', -40, 100);
    g.textAlign = 'left'; g.fillText('= 8', 170, 100);
    // ô □ đỏ ở chỗ số mũ: hiện ở "exponent", nhấp nháy theo beat, rung mạnh dần theo trống dồn
    const bx = outBack(clamp((t - this.expo) / 0.2));
    if (bx > 0) {
      const amp = 3 + 18 * prog(t, this.expo, this.next) ** 2;
      g.translate(60 + Math.sin(t * 71) * amp, -140 + Math.cos(t * 53) * amp); g.scale(bx, bx);
      g.fillStyle = PAL.block; g.globalAlpha = 0.25 + 0.55 * this.beat.onBeat(t, 0.25);
      g.fillRect(-60, -60, 120, 120); g.globalAlpha = 1;
      g.strokeStyle = PAL.block; g.lineWidth = 12; g.strokeRect(-60, -60, 120, 120);
    }
    g.restore();
  }
}
```

- [ ] **Step 2: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P10 from './plates/p10-turn.js';
```
Thay khối `order:` (tới hết `end: SONG.duration,`) bằng:
```js
    order: [[0, P01], [tl.at('Two to the three?'), P02],
            [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04],
            [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06],
            [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08],
            [tl.at("We didn't pick the meaning."), P09],
            [tl.at('Keep the rule alive,'), P10]], beat, end: SONG.duration,
```

- [ ] **Step 3: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 37.80,38.9,40.2,41.5,42.8,43.6,44.2,45.3,46.3 --outdir out/check/p10`
Expected:
- 37.80: sàn đầy như cuối P09; đường cong bắt đầu, đèn 2⁰ vừa bật.
- 38.9 / 40.2 / 41.5: camera đã trượt theo đường cong; đèn 1, 2, 4, 8 lần lượt sáng (đĩa vàng, số tối ở giữa, nhãn `2ⁿ` phía trên); đèn chưa sáng là vòng mờ.
- 42.8: cả khung đang xoay (đường cong, sàn cùng nghiêng); **không lộ mép sàn/chân trời**.
- 43.6: khung lộn ngược, đường cong và đèn đã chuyển xanh.
- 44.2: thế giới đang vỡ thành ký hiệu xanh; `2  = 8` trắng giữa khung.
- 45.3: `2^□ = 8`, ô □ đỏ viền dày ở chỗ số mũ, nhấp nháy/rung.
- 46.3: câu hỏi đang vỡ thành ký hiệu (□ vỡ thành ký hiệu đỏ).

- [ ] **Step 4: Chuỗi quanh xoay 180° — không giật**

```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 \
  --t $(python3 -c "print(','.join(f'{41.9+i/6:.2f}' for i in range(30)))") --outdir out/check/seq-turn
montage $(ls out/check/seq-turn/t_*.png | sort -V) -tile 6x5 -geometry 320x180+2+2 out/check/seq-turn.jpg
```
Expected (nhìn `seq-turn.jpg`): quay mượt từ thẳng → ngược → vỡ → quay nốt về thẳng; không có khung nào sàn/chân trời bị cắt mép.

- [ ] **Step 5: Commit**

```bash
git add projects/mv/exp-log/plates/p10-turn.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P10 turn — lanterns along 2^x, 180° turn, 2^□ = 8"
```

---

### Task 6: Hình điệp khúc dùng chung + P11a `mirror` (46.52 → 53.24)

**Files:**
- Create: `projects/mv/exp-log/chorus.js`, `projects/mv/exp-log/plates/p11a-mirror.js`
- Modify: `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`chorus.js`): `FWD_AT = [1330, 890]`, `BACK_AT = reflectPoint(FWD_AT, MIRROR)`; `arrowRow(g, t, [cx, cy], a, b, t0, tShoot, col, { size=80, alpha=1 })`; `machine(g, t, { tIn, spin, rev, inCh, inAt, inFrom=720, outCh, outAt, col })`; `kaleidoCells()`, `kaleido(g, t, t0)`, `kaleidoPoints()`.
- Consumes: `drawMirrorLine`, `clipSide`, `reflectPoint`, `MIRROR`; `Face` qua `s.face` và pose giả `'face'` (đăng ký trong `index.html`); `mouthAt` (`engine/visemes.js`).
- Mốc: `Run it forward,` (từ "forward" bắn mũi tên), `run it back.` ("back"), `Same connection,`, `Give me the exponent—` ("exponent"), `I'll give you the value.` ("value"). Cảnh sau `tl.at('Give me the value—')` — **không vỡ**: P11b vẽ tiếp cùng cỗ máy.
- Camera: `{ s: 1.05 → 1 trong 0.6s đầu, bg: 0 }` (cú đẩy khi gương xé; khung cuối P10 trống nên không lộ nhảy).

**Spec (TREATMENT P11):** 46.52 đường y = x trắng xé chéo khung; nửa dưới-phải vàng, nửa trên-trái xanh; nhân vật giữa đường gương, cận mặt, hát nhép; "Run it forward" mũi tên vàng `3 → 8`; "run it back" mũi tên xanh `8 → 3` ở nửa kia; "Same connection, different track" hai hàng là ảnh của nhau (vạch nối vuông góc gương); 50.44 cỗ máy hai khe: số mũ vào khe vàng, giá trị ra.

- [ ] **Step 1: `projects/mv/exp-log/chorus.js`**

```js
// Hình dùng chung của điệp khúc 1 (P11a, P11b, P12): cặp 3 → 8 / 8 → 3 hai bên gương,
// cỗ máy hai khe, kính vạn hoa. Các cảnh gọi CÙNG hàm với cùng t → nối liền qua ranh giới cảnh.
// Toạ độ đặt sao cho ảnh qua gương MIRROR (x + y = 1500) vẫn trong khung:
// điểm phía vàng cần 420 ≤ x ≤ 1500 và x + y > 1500.
import { clamp, prog, outBack, outExpo, smooth, hash } from '../../../engine/lib.js';
import { reflectPoint } from '../../../engine/mirror.js';
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
```

- [ ] **Step 2: `projects/mv/exp-log/plates/p11a-mirror.js`**

```js
// P11a mirror — "TẤM GƯƠNG" (nửa đầu) · 46.52 → 53.24 (TREATMENT P11, chorus 1)
// Đường y = x trắng xé chéo khung; nửa dưới-phải vàng, nửa trên-trái xanh. Mặt cận đứng
// giữa gương hát nhép. "Run it forward" 3 → 8 vàng; "run it back" 8 → 3 xanh ở ảnh qua gương.
// 50.44 cỗ máy hai khe: số mũ vào, giá trị ra. P11b tiếp tục đúng cỗ máy này.
import { clamp, prog, outExpo, smooth } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine, clipSide, reflectPoint } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { FWD_AT, BACK_AT, arrowRow, machine } from '../chorus.js';

const FX = 960, FY = 820, FH = 560;              // mặt cận: tâm trên gương, dưới cằm để trống cho hàng 3 → 8

export default class P11a {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face;
    this.fwd = s.tl.line('Run it forward,'); this.back = s.tl.line('run it back.');
    this.same = s.tl.at('Same connection,');
    this.give = s.tl.line('Give me the exponent—');
    this.value = s.tl.line("I'll give you the value.");
    this.next = s.tl.at('Give me the value—');
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.4));
    return { glow: 0.7, horizon: 760, floor: 0.45 + 0.55 * k, mirror: true, bokeh: 0.8 * k,
      rings: { cx: FX, cy: 540, r0: 330, gap: 58, n: 4, alpha: k * 0.8,
        texts: ['RUN IT FORWARD', 'RUN IT BACK', '3 → 8', '8 → 3'] } };
  }
  camera(t) { return { s: 1 + 0.05 * (1 - smooth(prog(t, this.t0, this.t0 + 0.6))), bg: 0 }; }   // cú đẩy khi gương xé
  render(g, t) {
    // hai nửa nhuộm nhẹ (7%) — vàng xuôi, xanh ngược
    const tint = smooth(prog(t, this.t0, this.t0 + 0.3));
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07 * tint; g.fillStyle = col; g.fillRect(0, 0, 1920, 1080); g.restore();
    }
    drawMirrorLine(g, MIRROR, outExpo(prog(t, this.t0, this.t0 + 0.25)), { width: 6, glow: 30 });
    // mặt cận hát nhép (vào bằng hàng ký hiệu, ra bằng lưới khi cỗ máy tới)
    const p = presence(t, this.t0, this.give.start - 0.4, { inDur: 0.3, outDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'rows', 'in', p.k, { t, cell: 7, seed: 11 });
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'out', p.k, { t, cell: 7, seed: 11 });
    else if (p.state === 'hold') {
      const l = this.tl.lineAt(t);
      this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l)) : 1);
    }
    // cặp mũi tên hai bên gương + vạch nối vuông góc gương ("same connection")
    arrowRow(g, t, FWD_AT, '3', '8', this.fwd.start, this.fwd.words[2].start, PAL.fwd);
    arrowRow(g, t, BACK_AT, '8', '3', this.back.start, this.back.words[2].start, PAL.back);
    const link = smooth(prog(t, this.same, this.same + 0.5));
    if (link > 0) {
      g.save(); g.setLineDash([14, 12]); g.lineDashOffset = -t * 60; g.strokeStyle = PAL.truth; g.lineWidth = 3;
      g.globalAlpha = 0.7 * link;
      for (const dx of [-190, 190]) {                               // nối "3" với ảnh của nó, "8" với ảnh của nó
        const a = [FWD_AT[0] + dx, FWD_AT[1]], b = reflectPoint(a, MIRROR);
        g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
      }
      g.restore();
    }
    // cỗ máy: số mũ 3 bay vào khe vàng ở "exponent", giá trị 8 bật ra ở "value"
    machine(g, t, { tIn: this.give.start, spin: (t - this.give.start) * 2.2, inCh: '3',
      inAt: this.give.words[3].start + 0.3, outCh: '8', outAt: this.value.words[4].start, col: PAL.fwd });
    footer(g, this.tl, t, ['forward', 'back', 'connection', 'exponent', 'value'], { from: this.t0 });
  }
}
```

- [ ] **Step 3: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P11a from './plates/p11a-mirror.js';
```
Thay khối `order:` (tới hết `end: SONG.duration,`) bằng:
```js
    order: [[0, P01], [tl.at('Two to the three?'), P02],
            [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04],
            [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06],
            [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08],
            [tl.at("We didn't pick the meaning."), P09],
            [tl.at('Keep the rule alive,'), P10],
            [tl.at('Run it forward,'), P11a]], beat, end: SONG.duration,
```

- [ ] **Step 4: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 46.6,47.0,48.4,49.8,51.0,52.9 --outdir out/check/p11a`
Expected:
- 46.6: đường gương trắng phát sáng xé chéo (dưới-trái → trên-phải); mặt cận đang hiện bằng hàng ký hiệu; số `3` vàng dưới phải.
- 47.0: mặt cận đủ màu, tâm trên gương, vòng chữ RUN IT FORWARD/BACK quanh đầu; hàng `3 → 8` vàng dưới phải **không bị tóc che**.
- 48.4: hàng `8 → 3` xanh ở trên-trái; miệng đổi hình theo lời.
- 49.8: hai vạch đứt trắng nối `3`↔`3`, `8`↔`8` qua gương.
- 51.0: mặt đã tan; cỗ máy (khung navy viền vàng, bánh răng vàng + trắng, nhãn EXPONENT/VALUE); `3` đang bay vào khe trái; **khe VALUE chưa có số 8** (Review Focus #3).
- 52.9: `8` vàng đã bật ra bên phải khe VALUE.

- [ ] **Step 5: Commit**

```bash
git add projects/mv/exp-log/chorus.js projects/mv/exp-log/plates/p11a-mirror.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P11a — the y = x mirror tears in, lip-sync, two-slot machine"
```

---

### Task 7: P11b `around` (53.24 → 60.20) + `footer` carry

**Files:**
- Create: `projects/mv/exp-log/plates/p11b-around.js`
- Modify: `projects/mv/exp-log/kit.js`, `projects/mv/exp-log/index.html`

**Interfaces:**
- Produces (`kit.js`): `footer(g, tl, t, keys, { at, dur, from, carry })` — `carry: true`: cảnh trước không vỡ lời của nó, cảnh này vỡ hộ dòng trước (0.3s đầu dòng mới).
- Consumes: `foldMatrix` (Task 1), `shatter`, `decodeLine` (`mirror: true` cho bè vọng), `machine`/`arrowRow`/`kaleido` (Task 6), `mix`.
- Mốc: `Give me the value—` ("value" = từ thứ 4), `find the exponent.` ("exponent"), `Turn it around,` (lật trong [start, end]), `Forward and backward—` (kính vạn hoa). Bè vọng 53.0–56.0 và 59.0–61.0 (nguồn `data/stems.json`, backing vocals).
- Camera: `{ s: 1 → 1.08, r: 0 → 0.25 }` từ "Forward and backward" tới hết cảnh; P12 bắt đầu đúng `{ s: 1.08, r: 0.25 }`.

**Spec (TREATMENT P11 nửa sau):** 53.24 cỗ máy **chạy ngược**, bánh răng quay chiều kia; 55.32 cả khung **lật qua gương**; 57.10 cặp (3, 8)/(8, 3) nhân bản thành **kính vạn hoa** đối xứng qua gương ra tới mép khung. Luật Bè vọng: chữ gương xanh ở nửa kia.

- [ ] **Step 1: `kit.js` — `footer` carry**

Thêm dòng chú thích sau dòng `// burst.from = mốc vào cảnh: …`:
```js
// burst.carry = true: cảnh trước KHÔNG vỡ lời của nó (cảnh nối liền) — cảnh này vỡ hộ dòng đó.
```
Trong `footer`, thay `prev.start >= (burst.from ?? Infinity)` bằng `(burst.carry || prev.start >= (burst.from ?? Infinity))`.

- [ ] **Step 2: `projects/mv/exp-log/plates/p11b-around.js`**

```js
// P11b around — "TẤM GƯƠNG" (nửa sau) · 53.24 → 60.20 (TREATMENT P11, chorus 1)
// Cỗ máy của P11a chạy NGƯỢC: giá trị 8 vào khe phải, số mũ 3 bật ra khe trái (xanh).
// "Turn it around": cả khung lật qua gương như lật tấm bìa — mặt sau đổi vàng ⇄ xanh.
// "Forward and backward — same idea, everywhere": kính vạn hoa nở từ gương ra mép khung.
// Bè vọng (backing vocals 53–56, 59–61): lời vọng lật gương, xanh, ở nửa trên-trái.
import { prog, smooth } from '../../../../engine/lib.js';
import { mix } from '../../../../engine/draw.js';
import { drawMirrorLine, clipSide, foldMatrix } from '../../../../engine/mirror.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { FWD_AT, BACK_AT, arrowRow, machine, kaleido } from '../chorus.js';

const ECHO = [[53.0, 56.0], [59.0, 61.0]];        // data/stems.json: backing vocals

export default class P11b {
  async init(s) {
    this.tl = s.tl;
    this.fwd = s.tl.line('Run it forward,'); this.back = s.tl.line('run it back.');
    this.give = s.tl.line('Give me the exponent—');
    this.l1 = s.tl.line('Give me the value—'); this.l2 = s.tl.line('find the exponent.');
    this.turn = s.tl.line('Turn it around,');
    this.kal = s.tl.at('Forward and backward—');
    this.next = s.tl.at('Backward question.');
  }
  backdropAt(t) {
    return { glow: 0.7, horizon: 760, floor: 1, mirror: true, bokeh: 0.8,
      rings: { cx: 960, cy: 540, r0: 330, gap: 58, n: 4, alpha: 0.8 * (1 - smooth(prog(t, this.kal, this.kal + 0.5))),
        texts: ['RUN IT FORWARD', 'RUN IT BACK', '3 → 8', '8 → 3'] } };
  }
  camera(t) {                                     // kính vạn hoa xoay chậm và đẩy vào — P12 nhận đúng giá trị cuối
    const k = smooth(prog(t, this.kal, this.next));
    return { s: 1 + 0.08 * k, r: 0.25 * k, bg: 0 };
  }
  render(g, t) {
    // lật qua gương: c = cos(πk); qua nửa đường (c < 0) vẽ mặt sau (đổi màu) với |c| để chữ không bị ngược
    const k = smooth(prog(t, this.turn.start, this.turn.end));
    const c = Math.cos(Math.PI * k), swap = c < 0;
    g.save(); g.transform(...foldMatrix(MIRROR, Math.max(Math.abs(c), 0.001)));
    const A = swap ? PAL.back : PAL.fwd, B = swap ? PAL.fwd : PAL.back;
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {             // nền hai nửa giữ nguyên: vàng xuôi, xanh ngược
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    drawMirrorLine(g, MIRROR, 1, { width: 6, glow: 30 });          // dưới cỗ máy, như P11a (không nhảy lớp khi sang cảnh)
    if (t < this.kal + 0.3) shatter(g, cx => this.stage(cx, t, A, B), prog(t, this.kal - 0.2, this.kal + 0.3), t, { seed: 12 });
    g.restore();
    kaleido(g, t, this.kal);
    // bè vọng: lời đang hát lặp lại lật gương, xanh, ở nửa trên-trái
    const l = this.tl.lineAt(t);
    if (l && ECHO.some(([a, b]) => t >= a && t < b))
      decodeLine(g, this.tl.wordsOf(l), t, 620, 210, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75 });
    footer(g, this.tl, t, ['value', 'exponent', 'around', 'forward', 'backward', 'everywhere'], { from: this.t0, carry: true });
  }
  stage(g, t, A, B) {                              // hai hàng mũi tên + cỗ máy chạy ngược (màu theo mặt đang hiện)
    arrowRow(g, t, FWD_AT, '3', '8', this.fwd.start, this.fwd.words[2].start, A);
    arrowRow(g, t, BACK_AT, '8', '3', this.back.start, this.back.words[2].start, B);
    const rev = t >= this.l1.start;
    const col = mix(A, B, smooth(prog(t, this.l1.words[3].start - 0.05, this.l1.words[3].start + 0.3)));   // đổi màu khi 8 vào khe
    const spin = rev ? (this.l1.start - this.give.start) * 2.2 - (t - this.l1.start) * 2.2 : (t - this.give.start) * 2.2;
    machine(g, t, rev
      ? { tIn: this.give.start, spin, rev: true, inCh: '8', inAt: this.l1.words[3].start + 0.3, inFrom: 460,
          outCh: '3', outAt: this.l2.words[2].start, col }
      : { tIn: this.give.start, spin, inCh: '3', inAt: this.give.words[3].start + 0.3, outCh: '8', outAt: 1e9, col: A });
  }
}
```

- [ ] **Step 3: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P11b from './plates/p11b-around.js';
```
Thay khối `order:` (tới hết `end: SONG.duration,`) bằng:
```js
    order: [[0, P01], [tl.at('Two to the three?'), P02],
            [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04],
            [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06],
            [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08],
            [tl.at("We didn't pick the meaning."), P09],
            [tl.at('Keep the rule alive,'), P10],
            [tl.at('Run it forward,'), P11a],
            [tl.at('Give me the value—'), P11b]], beat, end: SONG.duration,
```

- [ ] **Step 4: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 53.22,53.26,53.9,54.8,55.5,55.75,56.5,57.4,58.3,59.6 --outdir out/check/p11b`
Expected:
- 53.22 → 53.26: cỗ máy, hai hàng, gương, số `8` ở khe VALUE **giống hệt nhau** (nối liền, không đổi màu đột ngột, gương vẫn nằm dưới cỗ máy); lời "I'll give you the value" bắt đầu vỡ.
- 53.9: `8` đang bay vào khe phải; cỗ máy chuyển dần sang xanh; lời vọng lật gương xanh ở trên-trái.
- 54.8: `3` xanh bật ra bên trái khe EXPONENT; bánh răng quay ngược.
- 55.5 / 55.75: cả cỗ máy và hai hàng bị ép xiên về phía gương (đang lật); nửa sau màu đã đổi.
- 56.5: lật xong — cỗ máy vàng, hàng trên vàng `8 → 3`, hàng dưới xanh `3 → 8`, chữ đọc xuôi (không bị ngược).
- 57.4: cỗ máy vỡ thành ký hiệu; các ô `3→8` vàng / `8→3` xanh nở từ gương.
- 58.3 / 59.6: kính vạn hoa phủ tới mép, khung xoay nhẹ và đẩy vào; lời vọng "everywhere" lật gương ở trên-trái.

- [ ] **Step 5: Commit**

```bash
git add projects/mv/exp-log/kit.js projects/mv/exp-log/plates/p11b-around.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P11b — machine runs backward, flip across the mirror, kaleidoscope"
```

---

### Task 8: P12 `name` (60.20 → 64.32, cắt cứng 63.82)

**Files:**
- Create: `projects/mv/exp-log/plates/p12-name.js`
- Modify: `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes: `drawMorph`, `squarePoints`, `shatter` (Task 3), `fillWord` (`engine/fill.js`), `kaleido`/`kaleidoPoints` (Task 6), `clipSide`, `drawMirrorLine`.
- Mốc: `Backward question.`, `Missing exponent.`, `Now it has a name—` (chữ l-o-g đáp ở "name"), `logarithm.` = **cắt cứng** 63.82. Kính vạn hoa nở từ `tl.at('Forward and backward—')` (phải trùng P11b).
- Camera: `{ s: 1.08 → 1, r: 0.25 → 0 }` trong 1s đầu (nối P11b); sau cú cắt `{ s: 1.1 → 1 }` trong 0.45s.
- Lát cắt dừng ở 64.32 (`Money in the bank,` — P13, Kế hoạch 3 lo lối ra của P12).

**Spec (TREATMENT P12):** 60.20 kính vạn hoa co về một ô □; 61.52 □ đỏ lơ lửng ở chỗ số mũ, bass tắt, chỉ còn nó; 63.02 ba chữ cái bay vào ô; **63.82 cắt cứng + con dấu**: `log₂ 8 = 3`, ô □ chuyển xanh; chữ **LOGARITHM** khổng lồ, ruột lấp `log₂8=3 · log₂16=4 · log₁₀1000=3 …`.

- [ ] **Step 1: `projects/mv/exp-log/plates/p12-name.js`**

```js
// P12 name — "Nó có tên rồi" · 60.20 → 64.32 ✂ 63.82 (TREATMENT P12, post-chorus)
// Kính vạn hoa co về một ô □ (ký hiệu nổ rồi tụ). Bass tắt: chỉ còn `2^□` đỏ lơ lửng.
// "Now it has a name": ba chữ l-o-g bay vào ô. 63.82 CẮT CỨNG + con dấu: log₂ 8 = 3, ô chuyển xanh,
// chữ LOGARITHM khổng lồ ruột lấp log₂8=3 · log₂16=4 · log₁₀1000=3 …
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { drawMirrorLine, clipSide } from '../../../../engine/mirror.js';
import { drawMorph, squarePoints, shatter } from '../../../../engine/morph.js';
import { fillWord } from '../../../../engine/fill.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { kaleido, kaleidoPoints } from '../chorus.js';

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
    const dt = t - this.cut;
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
    footer(g, this.tl, t, ['logarithm'], { from: this.t0 });
  }
}
```

- [ ] **Step 2: Nối vào `index.html`**

Thêm import sau dòng import cảnh cuối cùng:
```js
import P12 from './plates/p12-name.js';
```
Thay khối `order:` (tới hết `end: SONG.duration,`) bằng:
```js
    order: [[0, P01], [tl.at('Two to the three?'), P02],
            [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04],
            [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06],
            [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08],
            [tl.at("We didn't pick the meaning."), P09],
            [tl.at('Keep the rule alive,'), P10],
            [tl.at('Run it forward,'), P11a],
            [tl.at('Give me the value—'), P11b],
            [tl.at('Backward question.'), P12]], beat, end: SONG.duration,
```

- [ ] **Step 3: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 60.18,60.22,60.5,60.9,61.8,63.2,63.6,63.84,64.2 --outdir out/check/p12`
Expected:
- 60.18 → 60.22: kính vạn hoa, gương, hai nửa nhuộm, góc xoay **giống nhau** (nối P11b); ở 60.22 các ô bắt đầu vỡ; lời "everywhere" đang vỡ.
- 60.5 / 60.9: ký hiệu vàng → đỏ tụ về quanh chỗ ô □ (trên-phải giữa khung); sàn và gương mờ dần.
- 61.8: nền tối gần như trống; `2` trắng lớn + ô □ đỏ viền phát sáng ở chỗ số mũ, lơ lửng.
- 63.2: ba chữ `l`, `o`, `g` đang bay vào từ ba phía.
- 63.6: `log` nằm trong ô đỏ.
- 63.84: loé nhẹ (không xám đục); LOGARITHM xanh khổng lồ trên cùng; khung dấu trắng nghiêng `log₂ 8 = [3]` với ô xanh ôm số 3; sân khấu bừng lại.
- 64.2: như trên, LOGARITHM ruột là các dòng `log₂8 = 3`, `log₁₀1000 = 3`… đọc được.

- [ ] **Step 4: Commit**

```bash
git add projects/mv/exp-log/plates/p12-name.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P12 name — kaleidoscope collapses to □, LOGARITHM stamp"
```

---

### Task 9: `tools/stitch.mjs`, render đoạn mới, ghép 0 → 64.32, đo và báo cáo

**Files:**
- Create: `tools/stitch.mjs`, `tools/test/stitch.test.mjs`
- Create (không commit, `out/` bị ignore): `out/exp-log-part2.mp4`, `out/exp-log-0-64.mp4`

**Interfaces:**
- Produces: `planStitch(parts, keyframes, frames, fps=60) → { segs: [{ file, ss, n }], t0, dur }` (thuần; ném lỗi khi đoạn rỗng, hai đoạn không liền khung, điểm vào/ra giữa file không phải khung khoá, hoặc lấy quá số khung của file). Mỗi đoạn cắt bằng `-ss ss -frames:v n -c copy` rồi concat — KHÔNG dùng `outpoint` của concat demuxer (đã thử: lấy thừa khung). Audio: từ mốc 0 thì chép nguyên luồng gốc (`song.m4a` là Opus), giữa bài thì mã hoá AAC 256k. CLI: `node tools/stitch.mjs --audio A --out O file@start:from:to …`.
- Consumes: `out/exp-log-slice.mp4` (bản 0 → 35.68 đã render ở Kế hoạch 1, camera cố định).

- [ ] **Step 1: Viết test `tools/test/stitch.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planStitch } from '../stitch.mjs';

const A = { file: 'a.mp4', start: 0, from: 0, to: 33.233333 };
const B = { file: 'b.mp4', start: 33.233333, from: 33.233333, to: 64.32 };
const KF = { 'a.mp4': [0, 29.066667, 33.233333], 'b.mp4': [0, 4.1] }, NF = { 'a.mp4': 2141, 'b.mp4': 1865 };

test('hai đoạn liền khung: số khung mỗi đoạn và tổng đúng', () => {
  const { segs, t0, dur } = planStitch([A, B], KF, NF);
  assert.deepEqual(segs.map(s => s.n), [1994, 1865]);
  assert.equal(segs[1].ss, 0);
  assert.equal(t0, 0);
  assert.equal(Math.round(dur * 60), 3859);
});

test('hở hoặc chồng một khung giữa hai đoạn → ném lỗi', () => {
  assert.throws(() => planStitch([A, { ...B, from: 33.25 }], KF, NF), /liền nhau/);
});

test('điểm vào hoặc điểm ra giữa file không phải khung khoá → ném lỗi kèm khung khoá gần', () => {
  assert.throws(() => planStitch([{ ...A, from: 30 }], KF, NF), /điểm vào.*khung khoá gần.*29\.066667/);
  assert.throws(() => planStitch([{ ...A, to: 31 }], KF, NF), /điểm ra.*khung khoá gần.*29\.066667/);
});

test('đoạn rỗng hoặc lấy quá cuối file → ném lỗi', () => {
  assert.throws(() => planStitch([{ ...A, to: 0 }], KF, NF), /rỗng/);
  assert.throws(() => planStitch([{ ...B, to: 70 }], KF, NF), /chỉ có 1865/);
});
```

- [ ] **Step 2: Chạy — phải FAIL** (`Cannot find module .../tools/stitch.mjs`)

Run: `node --test tools/test/stitch.test.mjs`

- [ ] **Step 3: `tools/stitch.mjs`**

```js
#!/usr/bin/env node
// Ghép các đoạn render riêng thành một video, KHÔNG mã hoá lại hình, gắn audio cả bài MỘT lần.
//
// Vì sao ghép được: mỗi khung là hàm thuần của t và shoot.js đánh số khung round(t·fps),
// nên hai đoạn cắt ở cùng một mốc nối liền nhau, không trùng không hụt khung.
// Hai chỗ dễ sai mà công cụ này chặn:
//   1. audio: mỗi đoạn tự mang audio → chỗ nối có tiếng tách / lệch mồi AAC. Ở đây bỏ audio
//      của các đoạn, cắt audio gốc đúng [đầu, cuối] tổng rồi gắn một lần.
//   2. chép luồng (-c copy) chỉ cắt đúng ở KHUNG KHOÁ: điểm vào của mỗi đoạn (trừ đầu file)
//      phải trùng một keyframe của file đó, không thì dừng và in các keyframe gần nhất.
// Nhớ kiểm trước: code cho khoảng thời gian lấy từ bản cũ không được đổi (so md5 ảnh chụp).
//
// Dùng: node tools/stitch.mjs --audio projects/mv/exp-log/audio/song.m4a --out out/x.mp4 \
//          out/a.mp4@0:0:33.233333  out/b.mp4@33.233333:33.233333:64.32
//       mỗi đoạn = file@<mốc bài lúc file bắt đầu>:<lấy từ>:<lấy tới> (giây, theo thời gian bài)
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

/**
 * Thuần: kiểm các đoạn và lập kế hoạch cắt. keyframes[file] = mốc khung khoá (giây, trong file),
 * frames[file] = tổng số khung của file. Chép luồng chỉ cắt đúng khi cả điểm vào LẪN điểm ra
 * rơi vào khung khoá (hoặc đầu/cuối file): GOP đóng của x264 → các gói trước một IDR theo thứ tự
 * giải mã đúng là các khung đứng trước nó. (outpoint của concat demuxer lấy thừa khung — đã thử.)
 * Trả về { segs: [{ file, ss, n }], t0, dur }: mỗi đoạn = n khung kể từ giây ss của file.
 */
export function planStitch(parts, keyframes, frames, fps = 60) {
  const fr = (s) => Math.round(s * fps);
  if (!parts.length) throw new Error('stitch: không có đoạn nào');
  const segs = parts.map((p, i) => {
    if (fr(p.to) <= fr(p.from)) throw new Error(`stitch: đoạn ${i + 1} rỗng (${p.from} → ${p.to})`);
    if (fr(p.from) < fr(p.start)) throw new Error(`stitch: đoạn ${i + 1} lấy từ ${p.from} trước lúc file bắt đầu ${p.start}`);
    if (i > 0 && fr(p.from) !== fr(parts[i - 1].to))
      throw new Error(`stitch: đoạn ${i} kết thúc khung ${fr(parts[i - 1].to)} nhưng đoạn ${i + 1} bắt đầu khung ${fr(p.from)} — phải liền nhau`);
    const inF = fr(p.from) - fr(p.start), outF = fr(p.to) - fr(p.start), total = frames[p.file];
    if (total !== undefined && outF > total) throw new Error(`stitch: đoạn ${i + 1} lấy tới khung ${outF} nhưng ${p.file} chỉ có ${total}`);
    const keys = (keyframes[p.file] || []).map(fr);
    const near = (f) => keys.filter(k => Math.abs(k - f) < 6 * fps).map(k => ((k + fr(p.start)) / fps).toFixed(6)).join(', ');
    if (inF > 0 && !keys.includes(inF))
      throw new Error(`stitch: điểm vào ${p.from} của ${p.file} không phải khung khoá; khung khoá gần (mốc bài): ${near(inF)}`);
    if (outF !== total && !keys.includes(outF))
      throw new Error(`stitch: điểm ra ${p.to} của ${p.file} không phải khung khoá hay cuối file; khung khoá gần (mốc bài): ${near(outF)}`);
    return { file: p.file, ss: inF / fps, n: outF - inF };
  });
  return { segs, t0: fr(parts[0].from) / fps, dur: (fr(parts.at(-1).to) - fr(parts[0].from)) / fps };
}

function keyframesOf(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'packet=pts_time,flags',
    '-of', 'csv=p=0', file]).toString();
  return out.split('\n').filter(l => l.includes('K')).map(l => +l.split(',')[0]);
}

function framesOf(file) {
  return +execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-count_packets', '-show_entries', 'stream=nb_read_packets',
    '-of', 'csv=p=0', file]).toString().trim();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2), opt = (k) => { const i = args.indexOf(`--${k}`); return i < 0 ? null : args.splice(i, 2)[1]; };
  const audio = opt('audio'), out = opt('out'), fps = +(opt('fps') || 60);
  if (!audio || !out || !args.length) { console.error('dùng: node tools/stitch.mjs --audio A --out O file@start:from:to …'); process.exit(2); }
  const parts = args.map(a => { const [file, rest] = a.split('@'); const [start, from, to] = rest.split(':').map(Number); return { file, start, from, to }; });
  const kf = Object.fromEntries(parts.map(p => [p.file, keyframesOf(p.file)]));
  const nf = Object.fromEntries(parts.map(p => [p.file, framesOf(p.file)]));
  const { segs, t0, dur } = planStitch(parts, kf, nf, fps);
  const dir = mkdtempSync(path.join(tmpdir(), 'stitch-'));
  const files = segs.map((s, i) => {
    const f = path.join(dir, `seg${i}.mp4`);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', s.ss.toFixed(6), '-i', s.file, '-map', '0:v', '-c', 'copy', '-frames:v', String(s.n), f]);
    return f;
  });
  const list = path.join(dir, 'list.txt');
  writeFileSync(list, files.map(f => `file '${f}'`).join('\n') + '\n');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-ss', String(t0), '-t', String(dur), '-i', audio,
    '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    ...(t0 === 0 ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '256k']), '-shortest',   // từ 0: giữ AAC gốc, không nén thế hệ hai
    '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log(`xong: ${out} (${dur.toFixed(3)}s từ mốc ${t0.toFixed(3)})`);
}
```

- [ ] **Step 4: Test toàn bộ + tất định + camera liền mạch**

Run: `node --test tools/test/*.test.mjs` → PASS (50).
```bash
TS=2.4,12.6,23.0,34.5,35.5,36.9,40.2,43.6,47.7,51.0,55.5,57.4,60.5,63.2,63.9
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $TS --outdir out/det2/a
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $(echo $TS | tr ',' '\n' | tac | paste -sd,) --outdir out/det2/b
diff <(cd out/det2/a && md5sum *.png) <(cd out/det2/b && md5sum *.png) && echo "TẤT ĐỊNH OK"
```
Expected: `TẤT ĐỊNH OK`.
Camera liền mạch (Review Focus #2):
```bash
for T in 35.683 37.78 46.52 53.244 60.2; do
  A=$(python3 -c "print(f'{$T-1/60:.4f}')")
  node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $A,$T --outdir out/check/seam-$T
  compare -metric PSNR $(ls out/check/seam-$T/t_*.png | sort -V) null: 2>&1; echo "  ← $T"
done
```
Expected: mỗi dòng ≥ 20 (dB). Riêng 35.683 và 37.78 có thể thấp hơn vì khung trước đã vỡ gần hết và khung sau là cảnh mới hiện dần — chấp nhận nếu NHÌN hai ảnh thấy không có vật nào "nhảy chỗ".

- [ ] **Step 5: Kiểm bản cũ vẫn đúng tới khung khoá dùng để ghép**

```bash
ffprobe -v error -select_streams v:0 -show_entries packet=pts_time,flags -of csv=p=0 out/exp-log-slice.mp4 | grep K
```
Chọn khung khoá K cuối cùng **< 35.33** (lúc P08 bắt đầu vỡ; ở bản đang có là `33.233333`). Kiểm lại: 
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,12.6,16.5,23.0,26.5,30.8,34.5,35.2 --outdir out/check/base-now
diff <(cd out/check/baseline && md5sum *.png) <(cd out/check/base-now && md5sum *.png) && echo "CŨ KHÔNG ĐỔI"
```
Expected: `CŨ KHÔNG ĐỔI` → phần 0 → K của bản cũ dùng lại được.

- [ ] **Step 6: Render đoạn mới từ K và ghép**

```bash
K=33.233333          # khung khoá tìm ở Step 5
node engine/render/shoot.js video --page projects/mv/exp-log/index.html --dur 239.65 --from $K --to 64.32 \
  --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-part2.mp4
node tools/stitch.mjs --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-0-64.mp4 \
  out/exp-log-slice.mp4@0:0:$K  out/exp-log-part2.mp4@$K:$K:64.32
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames,r_frame_rate:format=duration -of compact out/exp-log-0-64.mp4
```
Expected: `nb_read_frames=3859` (= round(64.32·60)), 60/1, duration ≈ 64.32; luồng audio `opus` (chép nguyên).
Kiểm chỗ nối (khung K lấy từ video ghép so với ảnh chụp trực tiếp):
```bash
ffmpeg -v error -y -ss $K -i out/exp-log-0-64.mp4 -frames:v 1 out/check/seam-video.png
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t $K --outdir out/check/seam-still
compare -metric PSNR out/check/seam-video.png $(ls out/check/seam-still/t_*.png) null: 2>&1; echo
```
Expected: PSNR ≥ 35 (chỉ khác do nén).

- [ ] **Step 7: Tự chấm + tờ 6fps**

```bash
node tools/review.mjs out/exp-log-0-64.mp4 projects/mv/exp-log
ffmpeg -v error -y -i out/exp-log-0-64.mp4 -vf "fps=6,scale=320:-1,tile=20x20" -frames:v 1 out/check/0-64-6fps.jpg
```
Expected: ghi lại số (YDIF trung vị kỳ vọng tăng rõ so với 0.22 của lát cắt 1 nhờ sàn ký hiệu nhấp nháy; biên độ sáng vẫn chưa đạt — đảo nền giấy ở 125.66). NHÌN tờ 6fps: mạch cảnh đọc được khi tắt tiếng (… → TRUE → đèn lồng trên đường cong → khung lộn ngược → 2^□ = 8 → GƯƠNG + mặt hát → cỗ máy → lật → kính vạn hoa → □ → LOGARITHM).

- [ ] **Step 8: Commit và báo cáo**

```bash
git add tools/stitch.mjs tools/test/stitch.test.mjs
git commit -m "feat(tools): stitch renders frame-exactly, audio muxed once"
```
Báo cáo người dùng: `out/exp-log-0-64.mp4`, `out/check/0-64-6fps.jpg`, số `review.mjs`, kết quả tất định + chỗ nối, và hỏi duyệt trước khi viết Kế hoạch 3 (P13–P18).
