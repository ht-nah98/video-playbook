# exp-log — Kế hoạch 5: 5 tư thế mới + bridge, rap cuối, điệp khúc cuối, outro (P21–P27, 155.70 → 239.65) + ghép trọn bài

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kế hoạch này có ba phần.
- Tách nền 5 tư thế người dùng gửi lượt 2 (2026-10-01): trầm tư, chỉ lên trời, chỉ xuống, giơ tay chặn, thầy cầm phấn.
- Dựng 8 cảnh cuối bài: P21 bridge, P22 rap cuối, P23 + P23b điệp khúc cuối, P24 FROM SCRATCH, P25 hook, P26 về 99%, P27 outro.
- Render 155.70 → 239.65 rồi ghép với `out/exp-log-0-155.mp4` thành bài trọn vẹn.

**Architecture:**
- Mỗi cảnh là một plate trong `projects/mv/exp-log/plates/`. Hình dùng chung nằm ở module của project, không plate nào import plate khác:
  - `duet.js`: mặt cận và ảnh của nó trong gương đứng; ghép thành mặt đối xứng.
  - `chorus2.js` (thêm): `neonGrid`, `graph`, là đồ thị của hệ G dùng chung từ P22 tới P23b.
  - `finale.js`: đoàn diễu hành vật cũ dọc gương, mặt trời phương trình, sao chổi, dây nối, thẻ lật, thẻ rơi bật khỏi gương, `FACE`, `EQUATIONS`.
  - `loading.js`: khung sách kết bài (quét CRT, thanh loading, chuỗi 99.999…, CRT tắt).
- Khung đông cứng (P23b ở 207.44, P27 ở 227.3) dùng t đông cho thế giới. Nền chung trả `false` và cảnh tự vẽ nền ở mốc đông, để nền cũng đứng im.

**Tech Stack:** như Kế hoạch 4 (Canvas 2D, `engine/render/shoot.js`, Node test, venv `tools/cutout/.venv`).

**Spec:**
- `projects/mv/exp-log/TREATMENT.md` §P21–P27, § Nhịp & chuyển cảnh (8 cú cắt cứng), § Bản đồ năng lượng, § Nhân vật — luật bằng số.
- `docs/character/CHARACTER-V2.md`.
- Người dùng 2026-10-01: "tôi vừa bổ xung thêm 1 vài tư thế nữa … bạn xem rồi lập kế hoạch triển khai kế hoạch 5". Người dùng giao toàn quyền đạo diễn hình ảnh (memory `story-world-over-rules`).

**Bằng chứng đã đo ở bản nháp (bản sao repo, mọi code dưới đây đã chạy):**
- Mỗi câu hát từ 155.7 tới 239.3 có ít nhất một ảnh chụp và đã được nhìn.
- Tất định: 18 mốc trải P21–P27 chụp xuôi và ngược cho md5 trùng 18/18.
- Chỗ nối, đo PSNR giữa khung cuối cảnh trước và khung đầu cảnh sau:

  | chỗ nối | PSNR (dB) |
  |---|---|
  | 155.70 | 27.2 |
  | 186.88 | 21.3 |
  | 196.86 | 20.8 |
  | 211.48 | 30.6 |
  | 219.09 | 42.8 |
  | 221.22 | 58.0 |

  168.58 có loé cymbal (7.3, có chủ ý: P21 đã vỡ hết về nền tối).
- Hai chỗ nối cứng tìm thấy và đã sửa trong code dưới đây: sàn ký hiệu bật ra ở 186.88; dây nối tắt cứng ở 196.86.
- Test 62/62 qua (58 cũ + 4 mới).

**Code trong kế hoạch này đã chạy thật ở bản sao repo. Chép đúng nguyên văn.**

## Global Constraints

- Kế thừa Global Constraints của Kế hoạch 2–4:
  - Hàm thuần của t, dùng `hash()` chứ không `Math.random`.
  - Mốc lời qua `tl`.
  - Chữ không fade.
  - Nhân vật không cắt cứng, luôn vào/ra bằng ký hiệu.
  - Camera liền mạch.
  - Plate không import plate.
  - `shatter()` không lồng nhau, cửa sổ không chồng nhau.
- Cắt cứng chỉ ở các mốc trong danh sách của TREATMENT: 208.60, 209.54, 210.58 (FROM SCRATCH), 227.3 (nhạc ngắt), 238.6 (hard stop). Riêng 168.58 không phải cắt cứng: P21 đã vỡ hết thành ký hiệu trước đó, P22 vào bằng loé cymbal.
- Tư thế khung trung (`POSES_V2_MID`) đặt chân ảnh ở y ≥ 1180. `pose-sky` vươn tay phải sát mép nên x ≤ 1520.
- Cảnh hát (P21, P23, P23b, P25) hát nhép bằng `mouthAt(t, words, this.vox)` với bộ miệng B. Phần rap (P22) nhân vật diễn bằng tư thế.

## Review Focus

1. **Không vật/chữ nào tắt cứng ở các chỗ nối 168.58 · 186.88 · 196.86 · 211.48 · 219.09 · 221.22.** Chụp cặp khung `round(B·60−1)/60` và `round(B·60)/60` → Task 7.
2. **Khung đông cứng thật sự đứng im** ở 207.44–208.60 và 227.3–238.6: nền (sàn ký hiệu, quầng sáng) không trôi, chỉ nhân vật bước ra và chữ số 9 còn sống → Task 4, Task 6.
3. **Mặt đối xứng P21** (165.6–166.4) liền ở đường gương, không lệch trục (trục mũi 222/418) → Task 2.
4. **Chữ đọc được**: cung xanh P25 hiện đúng thứ tự đọc; câu "Why does it work?" không bị đầu nhân vật che; chuỗi 9 không tràn vào nhân vật cầm trà → Task 4–6.
5. **Phần cũ không đổi pixel**: sửa `chorus2.js` (thêm hàm) và `mascot.js` (thêm pose) không đổi P17 → Task 3 so md5 trước/sau.

---

## File Structure

| file | trách nhiệm |
|---|---|
| `assets/character-v2/src/*.png` (thêm, ảnh người dùng) | 5 tư thế mới |
| `tools/cutout/cutout.py` (sửa) | ALIAS cho 5 tên Việt |
| `assets/character-v2/cut/pose-{ponder,sky,down,halt,chalk}.png`, `cut.json` (sinh) | ảnh đã tách nền |
| `engine/mascot.js` (sửa) | `POSES_V2_MID` thêm 5 pose |
| `docs/character/CHARACTER-V2.md` (sửa) | mục v2.2 |
| `projects/mv/exp-log/duet.js` (mới) | mặt + ảnh gương đứng, mặt đối xứng |
| `projects/mv/exp-log/chorus2.js` (sửa) | `neonGrid`, `graph` |
| `projects/mv/exp-log/finale.js` (mới) | thế giới điệp khúc cuối + màn chào |
| `projects/mv/exp-log/loading.js` (mới) | CRT, thanh loading, 99.999…, CRT tắt |
| `projects/mv/exp-log/plates/p21…p27` (mới, 8 file) | 8 cảnh |
| `projects/mv/exp-log/index.html` (sửa) | nối 8 cảnh |
| `tools/test/finale.test.mjs` (mới) | hình học diễu hành, dây nối, thẻ bật, đẳng thức trên tia |
| `projects/mv/exp-log/TREATMENT.md` (sửa) | ghi chú thực hiện P21–P27, bảng pose |

Thứ tự cảnh cuối cùng trong `index.html` (mỗi task thêm phần của mình):
```js
            [tl.at('X becomes Y.'), P20],
            [tl.at('What does this exponent produce?'), P21],
            [tl.at('And if the curve'), P22],
            [tl.at('Run it forward,', 3), P23],
            [tl.at('No tricks.'), P23b],
            [tl.at('From scratch!'), P24],
            [tl.at('Forward—'), P25],
            [tl.at('Ninety-nine percent...', 2), P26],
            [tl.line('Loading.', 2).end + 0.12, P27]], beat, end: SONG.duration,
```
Cách nối một cảnh: chạy `python3 <scratchpad>/addscene.py <Tên> <file.js> "<mốc>"` (thêm dòng import sau import cảnh cuối và thêm một mục vào cuối `order`), hoặc sửa tay đúng như trên. Riêng mục P27 phải sửa tay thành `tl.line('Loading.', 2).end + 0.12`.

---

### Task 1: Tách nền 5 tư thế mới

**Files:** Add `assets/character-v2/src/` (5 ảnh người dùng); Modify `tools/cutout/cutout.py`, `engine/mascot.js`, `docs/character/CHARACTER-V2.md`; Generate `assets/character-v2/cut/pose-{ponder,sky,down,halt,chalk}.png`, `cut.json`

**Interfaces:** Produces pose `'ponder' | 'sky' | 'down' | 'halt' | 'chalk'` trong `POSES_V2_MID`, dùng ở Task 3, 4 và 6.

- [ ] **Step 1: ALIAS** — trong `tools/cutout/cutout.py`, chèn vào bảng `ALIAS` ngay trước dòng `"Bảng chín biểu cảm miệng anime": "visemes-b",`:
```python
    # bộ 2026-10-01 (lượt 2): tư thế cho bridge → finale (Kế hoạch 5)
    "Chàng trai anime trầm tư trong áo blouse trắng": "pose-ponder",   # tay chống cằm
    "Chàng trai áo blouse chỉ lên trời": "pose-sky",                   # tay phải chỉ lên, miệng mở
    "Chàng trai áo blouse chỉ xuống": "pose-down",                     # tay phải chỉ xuống đất
    "Chàng trai áo blouse giơ tay dừng lại": "pose-halt",              # lòng bàn tay chặn, miệng mở
    "Thầy giáo tóc rối cầm phấn": "pose-chalk",                        # cầm phấn, tay kia ngửa
```

- [ ] **Step 2: Tách**

Run: `tools/cutout/.venv/bin/python tools/cutout/cutout.py --only pose-ponder,pose-sky,pose-down,pose-halt,pose-chalk`
Expected: 5 dòng báo cáo:

| pose | size | alpha_cover |
|---|---|---|
| pose-ponder | [864, 1448] | 0.687 |
| pose-sky | [1073, 1428] | 0.651 |
| pose-down | [931, 1446] | 0.676 |
| pose-halt | [991, 1448] | 0.633 |
| pose-chalk | [1085, 1448] | 0.611 |

Ghép lên nền navy rồi nhìn. Mép phải sạch, không còn vạch chuyển động quanh tay giơ.

- [ ] **Step 3: Đăng ký pose** — `engine/mascot.js`:
```js
export const POSES_V2_MID = ['notebook','offer','stand','pointer','pockets','pockets2','invite','tea',
                             'ponder','sky','down','halt','chalk'];
```

- [ ] **Step 4: Tài liệu** — trong `docs/character/CHARACTER-V2.md`, thêm mục sau ngay trước `## Áp dụng phân tích video mẫu`:
```md
## Bản v2.2 (2026-10-01): tư thế cho bridge → finale

Lượt ảnh thứ hai (5 ảnh mới; "chìa tay mời gọi" trùng `pose-invite` đã có). Cũng khung trung:

| file | nội dung | dùng cho (Kế hoạch 5) |
|---|---|---|
| `pose-ponder.png` | tay chống cằm, trầm tư | "Why does it work?" 207.44 — bước ra trước khung đông |
| `pose-sky.png` | chỉ lên trời, miệng mở | "No rules falling from the sky" 198.44 (tay phải vươn sát mép — đặt x ≤ 1520) |
| `pose-down.png` | chỉ xuống đất | "One height / crossing / exponent there" 173.6 |
| `pose-halt.png` | giơ lòng bàn tay chặn | "No second answer" 175.94, "No tricks / No guessing" 196.86 |
| `pose-chalk.png` | thầy giáo cầm phấn, tay kia ngửa | "That's why the question had an answer…" — bảng đen 177.91 |

**Mặt đối xứng** (`projects/mv/exp-log/duet.js`): trục mũi của ô viseme nằm ở x = 222/418, không
ở giữa ô. Lật ngang quanh trục mũi và mỗi bên chỉ vẽ nửa phía mình → một gương mặt đối xứng
tuyệt đối (P21 "they become the same"). Ánh viền sẵn có của ảnh: vàng bên trái, xanh bên phải.
```

- [ ] **Step 5: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS 58/58.
```bash
git add tools/cutout/cutout.py engine/mascot.js docs/character/CHARACTER-V2.md assets/character-v2/src assets/character-v2/cut/pose-ponder.png assets/character-v2/cut/pose-sky.png assets/character-v2/cut/pose-down.png assets/character-v2/cut/pose-halt.png assets/character-v2/cut/pose-chalk.png assets/character-v2/cut/cut.json
git commit -m "feat(character): five more mid-shot poses (ponder, sky, down, halt, chalk)"
```

---

### Task 2: P21 `facing` — mặt và ảnh gương đứng (155.70 → 168.58)

**Files:** Create `projects/mv/exp-log/duet.js`, `projects/mv/exp-log/plates/p21-facing.js`; Modify `projects/mv/exp-log/index.html`

**Interfaces:**
- Consumes `s.face` (Face bộ B), `s.vox`, `s.mascot` (pose giả `'face'`).
- Produces `duetFace(g, s, A, y, h, mouth, { mirror, side, seam, tr, t })`, `tinted(g, fn, col, a)`, `AXIS`.

- [ ] **Step 1: `duet.js`**
```js
// Mặt cận và ẢNH CỦA NÓ trong gương đứng (bridge P21, hook P25). Ảnh mặt viseme có trục mũi ở x = 222/418
// (không phải giữa ô) và sẵn ánh viền vàng bên trái, xanh bên phải — đúng hai nửa thế giới của bài.
// Ảnh phản chiếu = lật ngang quanh trục ĐỨNG của chính nó, nhuộm xanh; khi hai trục trùng nhau tại
// đường gương mà mỗi bên chỉ vẽ nửa phía mình, ta được một gương mặt đối xứng tuyệt đối: "become the same".
import { drawTransit } from '../../../engine/transit.js';
import { PAL } from './song.js';

export const AXIS = 222 / 418;                        // trục mũi trong ô viseme (đo trên viseme-b-1)
const AX = (A, h) => A - (AXIS - 0.5) * h;            // x tâm ảnh để trục mũi nằm ở A

let tb = null;
/** Vẽ fn vào bộ đệm riêng (giữ biến đổi hiện hành của g), nhuộm col ở alpha a rồi dán lại. */
export function tinted(g, fn, col = PAL.back, a = 0.38) {
  const W = g.canvas.width, H = g.canvas.height;
  tb ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
  const b = tb.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.setTransform(g.getTransform()); fn(b); b.restore();
  b.save(); b.globalCompositeOperation = 'source-atop'; b.globalAlpha = a; b.fillStyle = col; b.fillRect(0, 0, W, H); b.restore();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(tb, 0, 0); g.restore();
}

/**
 * Mặt có trục mũi ở A (y = cằm, h = cao). side: −1 chỉ vẽ phần x < seam, +1 phần x > seam, 0 cả mặt.
 * mirror: lật ngang quanh A và nhuộm xanh. tr = { kind, dir, k, seed } → đang vào/ra bằng ký hiệu.
 */
export function duetFace(g, s, A, y, h, mouth, { mirror = false, side = 0, seam = 960, tr = null, t = 0 } = {}) {
  const paint = (c) => {
    c.save();
    if (side) { c.beginPath(); side < 0 ? c.rect(-4000, -4000, seam + 4000, 9000) : c.rect(seam, -4000, 9000, 9000); c.clip(); }
    if (mirror) { c.translate(2 * A, 0); c.scale(-1, 1); }
    if (tr) drawTransit(c, s.mascot, 'face', AX(A, h), y, h, tr.kind, tr.dir, tr.k, { t, cell: 7, seed: tr.seed });
    else s.face.draw(c, AX(A, h), y, h, mouth);
    c.restore();
  };
  if (mirror) tinted(g, paint); else paint(g);
}
```
- [ ] **Step 2: `plates/p21-facing.js`**
```js
// P21 facing — "Hai câu hỏi đối mặt" · 155.70 → 168.58 (TREATMENT P21, bridge half-time — hát)
// Tối nhất, chậm nhất, ít vật nhất. Trang giấy P20 vừa vỡ về nền tối; một tấm gương ĐỨNG mọc giữa khung.
// Mặt cận bên trái hỏi "What does this exponent produce?" (2³ = ? vàng); ảnh của nó trong gương (lật ngang,
// nhuộm xanh) hỏi ngược "What exponent produced this?" (2^? = 8, chữ viết gương). "One moves forward": mặt
// bước tới, mũi tên vàng →. "One comes back": ảnh bước tới, mũi tên xanh ←. "Meet them at the mirror": hai
// mặt áp vào gương — mỗi bên chỉ còn nửa phía mình. "and they become": hai trục mũi trùng ở gương → MỘT gương
// mặt đối xứng. "the same": loé trắng, gương tan thành ký hiệu, còn lại một mặt thật; 2³ = 8 ở giữa.
import { clamp, prog, smooth, lerp, outBack, outExpo, hash } from '../../../../engine/lib.js';
import { drawMirrorLine, line } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { shatter, drawMorph } from '../../../../engine/morph.js';
import { PAL } from '../song.js';
import { footer, powText } from '../kit.js';
import { duetFace } from '../duet.js';

const SEAM = line(960, 40, 960, 960);                 // gương đứng
const Y = 945, H = 600;                               // cằm mặt, cao mặt
const EQ_Y = 215;

export default class P21 {
  async init(s) {
    this.s = s; this.tl = s.tl; this.vox = s.vox;
    const L = (x) => s.tl.line(x);
    this.q1 = L('What does this exponent produce?'); this.q2 = L('What exponent produced this?');
    this.two = L('Two questions'); this.fwd = L('One moves forward.'); this.back = L('One comes back.');
    this.meet = L('Meet them at the mirror—'); this.become = L('and they become'); this.same = L('the same.');
    this.next = s.tl.at('And if the curve');
  }
  backdropAt(t) {
    const f = smooth(prog(t, this.same.start, this.same.start + 0.25)) * (1 - 0.4 * smooth(prog(t, this.same.start + 0.25, this.same.start + 1.2)));
    return { glow: 0.38 + 0.6 * f, haloX: 960, haloY: 640, haloR: 560 + 300 * f };
  }
  camera(t) {
    const drift = smooth(prog(t, this.t0, this.meet.start)), push = smooth(prog(t, this.meet.start, this.same.start));
    return { s: 1 + 0.03 * drift + 0.1 * push, x: 10 * Math.sin((t - this.t0) * 0.35) * (1 - push), cy: lerp(540, 640, push), bg: 0 };
  }
  /** Trục mũi hai bên theo lời: bước tới, lùi về, gặp nhau ở gương. */
  axes(t) {
    const f = smooth(prog(t, this.fwd.start, this.fwd.end)), b = smooth(prog(t, this.back.start, this.back.end));
    const m = smooth(prog(t, this.meet.start, this.become.start));
    return [lerp(lerp(560, 700, f), 960, m), lerp(lerp(1360, 1220, b), 960, m)];
  }
  render(g, t) {
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 31 });
    // loé trắng 0.2s khi hai nửa thành một
    const fl = 1 - prog(t, this.same.start, this.same.start + 0.2);
    if (t >= this.same.start && fl > 0) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(244,241,234,${0.55 * fl})`; g.fillRect(0, 0, 1920, 1080); g.restore(); }
    footer(g, this.tl, t, ['exponent', 'produce', 'produced', 'questions', 'forward', 'back', 'mirror', 'same'], { from: this.t0, carry: true });
  }
  paint(g, t) {
    const one = t >= this.same.start, l = this.tl.lineAt(t);
    const mouth = l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1;
    // gương đứng: vạch xuống từ trên trong 0.8s đầu; "the same" → tan thành ký hiệu
    if (!one) drawMirrorLine(g, SEAM, smooth(prog(t, this.t0, this.t0 + 0.8)), { width: 4, glow: 26 });
    drawMorph(g, SEAM_PTS, BURST_PTS, prog(t, this.same.start, this.same.start + 0.9), t, { colA: PAL.truth, colB: PAL.back, spread: 160 });
    const [AL, AR] = this.axes(t);
    if (one) duetFace(g, this.s, 960, Y, H, mouth);
    else {
      const inL = prog(t, this.t0, this.t0 + 0.4), tIn = this.q2.start - 0.3, inR = prog(t, tIn, tIn + 0.4);
      duetFace(g, this.s, AL, Y, H, mouth, { side: -1, tr: inL < 1 ? { kind: 'rows', dir: 'in', k: Math.max(0.001, inL), seed: 31 } : null, t });
      if (t >= tIn) duetFace(g, this.s, AR, Y, H, mouth, { mirror: true, side: 1, tr: inR < 1 ? { kind: 'columns', dir: 'in', k: Math.max(0.001, inR), seed: 32 } : null, t });
    }
    this.equations(g, t);
  }
  /** 2³ = ? (vàng, đọc xuôi) và 2^? = 8 (xanh, viết gương); "the same" → cả hai bay vào giữa thành 2³ = 8. */
  equations(g, t) {
    const m = smooth(prog(t, this.become.start, this.same.start));
    if (t >= this.same.start) {
      const s = 1 + 0.25 * (1 - outBack(prog(t, this.same.start, this.same.start + 0.25)));
      g.save(); g.translate(960, EQ_Y); g.scale(s, s); powText(g, [['2', '3'], ' = 8'], 0, 0, 110, { col: PAL.truth, expCol: PAL.fwd }); g.restore();
      return;
    }
    const pa = outBack(clamp((t - this.q1.start - 0.1) / 0.2)), pb = outBack(clamp((t - this.q2.start - 0.1) / 0.2));
    const xl = lerp(520, 960, m), xr = lerp(1400, 960, m);       // đứng yên phía trên hai mặt tới "and they become"
    if (pa > 0) { g.save(); g.translate(xl, EQ_Y); g.scale(pa, pa); powText(g, [['2', '3'], ' = ?'], 0, 0, 96, { col: PAL.fwd, expCol: PAL.fwdCore }); g.restore(); }
    if (pb > 0) {   // viết gương: lật ngang quanh tâm, lật dần về xuôi khi hai bên nhập lại
      g.save(); g.translate(xr, EQ_Y); g.scale(-pb * Math.cos(Math.PI * m) || -0.001, pb); powText(g, [['2', '?'], ' = 8'], 0, 0, 96, { col: PAL.back, expCol: PAL.backCore }); g.restore();
    }
    // mũi tên: vàng tiến (One moves forward), xanh lùi (One comes back)
    this.arrow(g, prog(t, this.fwd.start, this.fwd.start + 0.45, outExpo), xl - 150, EQ_Y + 70, 300, PAL.fwd, 1 - m);
    this.arrow(g, prog(t, this.back.start, this.back.start + 0.45, outExpo), xr + 150, EQ_Y + 70, -300, PAL.back, 1 - m);
  }
  arrow(g, k, x, y, len, col, a) {
    if (k <= 0 || a <= 0) return;
    const x1 = x + len * k, d = Math.sign(len);
    g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = 8; g.lineCap = 'round'; g.shadowColor = col; g.shadowBlur = 18;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x1, y); g.moveTo(x1, y); g.lineTo(x1 - 26 * d, y - 18); g.moveTo(x1, y); g.lineTo(x1 - 26 * d, y + 18); g.stroke();
    g.restore();
  }
}

const SEAM_PTS = Array.from({ length: 70 }, (_, i) => [960, 40 + i * 13]);
const BURST_PTS = SEAM_PTS.map(([x, y], i) => [x + (hash(i * 4.1) - 0.5) * 1700, y + (hash(i * 9.3) - 0.5) * 500]);
```
- [ ] **Step 3: Nối** P21 ở `'What does this exponent produce?'` (xem File Structure).

- [ ] **Step: Chụp và NHÌN**

Run: `<scratchpad>/shoot.sh 155.9,157.0,158.6,160.5,162.6,164.0,164.9,165.8,166.5,167.3,168.3 out/check/p21`
Kỳ vọng theo từng mốc:
- 157.0: mặt vàng bên trái, gương đứng, phía trên là `2³ = ?`.
- 158.6: ảnh nhuộm xanh bên phải, `2^? = 8` viết gương.
- 162.6: mũi tên vàng →.
- 164.0: mũi tên xanh ←.
- 164.9: hai mặt áp vào gương, mỗi bên còn nửa phía mình.
- 165.8: một mặt đối xứng ghép từ nửa trái và nửa phải nhuộm xanh.
- 166.5: loé, `2³ = 8` ở giữa.
- 168.3: cả cảnh vỡ thành ký hiệu.
- [ ] **Step: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS (tất cả).
```bash
git add projects/mv/exp-log/duet.js projects/mv/exp-log/plates/p21-facing.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P21 facing — a face and its reflection meet at a standing mirror and become one symmetric face"
```

---

### Task 3: P22 `unique` — rap cuối (168.58 → 186.88)

**Files:** Modify `projects/mv/exp-log/chorus2.js` (thay cả file); Create `projects/mv/exp-log/plates/p22-unique.js`; Modify `index.html`

**Interfaces:** Produces `neonGrid(g, a)` và `graph(g, { k, kl, km, a })` trong `chorus2.js`; P23 và P23b dùng lại.

- [ ] **Step 1: Chụp P17 TRƯỚC khi sửa** (Review Focus 5): `<scratchpad>/shoot.sh 99.2,100.2,105.0,110.0,112.6 out/check/p17-before`
- [ ] **Step 2: `chorus2.js`** — thay cả file. Chỉ khác ở: dòng import `drawMirrorLine` và `MIRROR`, cùng hai hàm thêm ở cuối file.
```js
// Hình của điệp khúc 2 (P17): đồ thị trong hệ toạ độ mà đường y = x TRÙNG đường gương MIRROR của màn hình,
// nên ảnh qua gương của đường cong mũ đúng là đường cong log. Thêm gương thứ hai vuông góc, mảnh kính vỡ,
// và "sảnh gương" (khung lồng nhau lùi vào sâu) — thế giới của cú bùng nổ.
import { clamp, hash, outExpo } from '../../../engine/lib.js';
import { line, drawMirrorLine } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';
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


/** Lưới neon của hệ G (trang sổ P19 trên nền tối). */
export function neonGrid(g, a = 1) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = 0.11 * a; g.strokeStyle = PAL.backCore; g.lineWidth = 2; g.beginPath();
  for (let i = -8; i <= 14; i++) { g.moveTo(OX + S * i, -600); g.lineTo(OX + S * i, 1700); }
  for (let j = -8; j <= 12; j++) { g.moveTo(-800, OY - S * j); g.lineTo(2700, OY - S * j); }
  g.stroke(); g.restore();
}

/** Đồ thị trọn: lưới, trục, đường mũ (k), đường log (kl), gương (km). */
export function graph(g, { k = 1, kl = 0, km = 0, a = 1 } = {}) {
  neonGrid(g, a); axes(g, 1, { alpha: 0.55 * a });
  drawMirrorLine(g, MIRROR, km, { width: 4, glow: 22 });
  curve(g, kl, { log: true, alpha: a }); curve(g, k, { alpha: a });
}
```
- [ ] **Step 3: `plates/p22-unique.js`**
```js
// P22 unique — "Đúng một đáp án" · 168.58 → 186.88 (TREATMENT P22, final rap)
// 168.58 cymbal: sáng lại. Lưới toạ độ của trang sổ P19 giờ là lưới neon trên nền tối, cùng hệ G của điệp khúc 2.
// "And if the curve never turns around": camera NGỒI trên đường mũ như tàu lượn, đường cong vạch ra dưới bánh xe.
// "every positive target gets exactly one way found": tia laser ngang quét lên — mỗi độ cao chạm đường cong đúng
// MỘT điểm. "One height / One crossing / One exponent there": ba con dấu ở v = 4, điểm (2, 4), u = 2 — nhân vật chỉ
// xuống. "No second answer waiting anywhere": nhánh ma đỏ thử quay đầu để cắt lần hai — nhân vật giơ tay chặn, gạch
// chéo, nhánh ma rút về. "That's why the question had an answer from the start": thầy cầm phấn, bảng đen viết lời
// giải. "Not because a textbook declared that part": sách giáo khoa mở ra, đóng sập ở "declared", vỡ thành ký hiệu.
// "Follow the curve / the law / the reason": ba cú tăng tốc, sao chổi chạy dọc đường cong mỗi lần nhanh hơn.
// "What looked like two ideas — was one idea seen from two views": hai khung (mũ | log) trượt vào nhập làm một
// đồ thị có cả hai đường và gương — đúng khung mở P23.
import { clamp, prog, smooth, lerp, outBack, outExpo, hash } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { figure, footer } from '../kit.js';
import { presence } from '../../../../engine/transit.js';
import { G, OY, curve, graph } from '../chorus2.js';
import { hand } from '../paper.js';

const U0 = -5.8, U1 = 2.75;
const kOf = (u) => (u - U0) / (U1 - U0);              // tiến độ curve() tới u
const MID = [1660, 1230, 900];                         // nhân vật khung trung, góc phải dưới
const BOARD = { x: 110, y: 80, w: 1000, h: 470 };
// nhánh ma: rời đường mũ ở u = 2.2, vồng lên rồi quay đầu cắt lại v = 4 (điều mà đường mũ không bao giờ làm)
const ghostV = (s) => 2 ** 2.2 + 1.2 * Math.sin(Math.PI * s) - 1.6 * s;
const GHOST = Array.from({ length: 40 }, (_, i) => G(2.2 + 1.6 * i / 39, ghostV(i / 39)));
const GHOST_X = (() => { let s = 0.5; while (ghostV(s) > 4) s += 0.005; return G(2.2 + 1.6 * s, 4); })();

export default class P22 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    const L = (x) => s.tl.line(x);
    this.ride = L('And if the curve'); this.never = L('never turns around,'); this.every = L('every positive target');
    this.gets = L('gets exactly one way found.'); this.h1 = L('One height.'); this.c1 = L('One crossing.'); this.e1 = L('One exponent there.');
    this.no2 = L('No second answer'); this.wait = L('waiting anywhere.'); this.why = L("That's why the question");
    this.had = L('had an answer from the start.'); this.notb = L('Not because a textbook'); this.decl = L('declared that part.');
    this.fc = L('Follow the curve.'); this.fl = L('Follow the law.'); this.fr = L('Follow the reason through.');
    this.two = L('What looked like two ideas—'); this.one = L('was one idea'); this.views = L('seen from two views.');
    this.next = s.tl.at('Run it forward,', 3);
    this.kicks = [this.fc.start, this.fl.start, this.fr.start];
    this.slam = this.decl.start;                                   // sách đóng sập
  }
  backdropAt(t) {
    const on = smooth(prog(t, this.t0, this.t0 + 0.3));
    return { glow: lerp(0.45, 1, on), haloX: 960, haloY: 480, bokeh: 0.5 * on };
  }
  /** Tàu lượn: u của toa trên đường cong. */
  uRide(t) { return lerp(-4.2, 2.2, smooth(prog(t, this.t0, this.never.end + 0.3))); }
  camera(t) {
    const u = this.uRide(t), [px, py] = G(u, 2 ** u), e = smooth(prog(t, this.never.end, this.every.start + 0.55));
    const ride = { s: 2.1, x: 960 - px, y: 600 - py, r: 0.5 * Math.atan(Math.LN2 * 2 ** u), cx: px, cy: py };
    let kick = 0, rk = 0;
    this.kicks.forEach((k, i) => { const d = 1 - smooth(prog(t, k, k + 0.45)); if (t >= k) { kick += 0.1 * (1 + 0.5 * i) * d; rk += (i % 2 ? -1 : 1) * 0.025 * d; } });
    return { s: lerp(ride.s, 1, e) + kick, x: lerp(ride.x, 0, e), y: lerp(ride.y, 0, e), r: lerp(ride.r, 0, e) + rk,
      cx: lerp(px, 960, e), cy: lerp(py, 540, e), bg: 0 };
  }
  render(g, t) {
    // cymbal 168.58: loé trắng ngắn
    const fl = 1 - prog(t, this.t0, this.t0 + 0.18);
    if (t < this.two.start) {
      graph(g, { k: Math.max(kOf(this.uRide(t)), t >= this.never.end ? 1 : 0) });
      this.cart(g, t); this.laser(g, t); this.stamps(g, t); this.ghost(g, t); this.comets(g, t);
      this.board(g, t); this.book(g, t); this.follow(g, t);
    } else this.split(g, t);
    // nhân vật: chỉ xuống → giơ tay chặn → cầm phấn → mời đi theo
    const P = (a, b) => presence(t, a, b, { inDur: 0.25, outDur: 0.35 });
    figure(g, this.m, 'down', ...MID, 'rows', P(this.h1.start - 0.15, this.no2.start - 0.2), { t, seed: 41 });
    figure(g, this.m, 'halt', ...MID, 'burn', P(this.no2.start - 0.05, this.why.start - 0.2), { t, seed: 42 });
    figure(g, this.m, 'chalk', ...MID, 'columns', P(this.why.start - 0.05, this.fc.start - 0.25), { t, seed: 43 });
    figure(g, this.m, 'invite', ...MID, 'digits', P(this.fc.start - 0.05, this.two.start - 0.1), { t, seed: 44 });
    if (fl > 0) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(244,241,234,${0.5 * fl})`; g.fillRect(0, 0, 1920, 1080); g.restore(); }
    footer(g, this.tl, t, ['curve', 'never', 'positive', 'one', 'height', 'crossing', 'exponent', 'second', 'question', 'answer', 'start', 'textbook', 'declared', 'follow', 'law', 'reason', 'two', 'ideas', 'views'],
      { from: this.t0, carry: true });
  }
  /** Toa tàu lượn: chấm sáng + vệt, mũi tên chỉ hướng đi (không bao giờ quay đầu). */
  cart(g, t) {
    if (t >= this.every.start + 0.6) return;
    const u = this.uRide(t), [x, y] = G(u, 2 ** u), a = Math.atan2(-Math.LN2 * 2 ** u, 1);
    g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 30;
    g.beginPath(); g.moveTo(34, 0); g.lineTo(-18, -22); g.lineTo(-8, 0); g.lineTo(-18, 22); g.closePath(); g.fill(); g.restore();
  }
  /** Laser ngang quét lên: v = 2^w, w từ −2 tới 2; giao điểm duy nhất loé "1". Dừng ở v = 4. */
  laser(g, t) {
    const k = prog(t, this.every.start, this.gets.end - 0.05, smooth);
    if (k <= 0 || t >= this.why.start) return;
    const v = 2 ** lerp(-2, 2, k), u = Math.log2(v), [px, py] = G(u, v);
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4; g.shadowColor = PAL.fwdCore; g.shadowBlur = 24;
    g.beginPath(); g.moveTo(-600, py); g.lineTo(2600, py); g.stroke();
    g.fillStyle = PAL.fwdCore; g.beginPath(); g.arc(px, py, 16, 0, Math.PI * 2); g.fill();
    const one = t >= this.gets.words[2].start, pop = one ? outBack(clamp((t - this.gets.words[2].start) / 0.2)) : 1;
    g.font = '900 64px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowBlur = 0;
    g.save(); g.translate(px - 60, py - 60); g.scale(one ? 1 + 0.5 * pop * (1 - prog(t, this.gets.words[2].start + 0.2, this.gets.words[2].start + 0.5)) : 1, one ? 1 : 1);
    g.fillStyle = one ? PAL.fwd : PAL.truth; g.fillText('1', 0, 0); g.restore();
    // "One exponent there": đường thả xuống trục, nhãn 2
    const d = prog(t, this.e1.start, this.e1.start + 0.35, outExpo);
    if (d > 0) {
      g.setLineDash([14, 10]); g.strokeStyle = PAL.fwd; g.lineWidth = 4; g.shadowBlur = 0;
      g.beginPath(); g.moveTo(px, py); g.lineTo(px, lerp(py, OY, d)); g.stroke(); g.setLineDash([]);
      if (d >= 1) { g.fillStyle = PAL.fwd; g.font = '900 72px "Archivo"'; g.fillText('2', px, OY + 56); }
    }
    g.restore();
  }
  /** Ba con dấu đúng ba từ "One", vỡ thành ký hiệu khi bảng đen vào. */
  stamps(g, t) {
    const out = this.why.start;
    const S3 = [[this.h1, 'ONE HEIGHT', 330, 250, -0.08], [this.c1, 'ONE CROSSING', 1150, 130, 0.06], [this.e1, 'ONE EXPONENT', 600, 890, -0.05]];
    S3.forEach(([l, txt, x, y, rot], i) => {
      if (t < l.start) return;
      const pop = 1 + 0.6 * (1 - smooth(prog(t, l.start, l.start + 0.12))), s = pop * (1 - smooth(prog(t, out, out + 0.3)));
      g.save(); g.translate(x, y); g.rotate(rot);
      if (s > 0.01) { g.save(); g.scale(s, s); g.strokeStyle = PAL.fwd; g.lineWidth = 7; g.strokeRect(-200, -48, 400, 96); g.restore(); }
      burstText(g, txt, t, out, 0, 22 * Math.max(s, 0.3), '900 56px "Archivo"', PAL.fwd, { dur: 0.3, seed: 50 + i, align: 'center' });
      g.restore();
    });
  }
  /** Nhánh ma: đường cong thử quay đầu để cắt v = 4 lần hai; gạch chéo đỏ ở "anywhere", rồi rút về. */
  ghost(g, t) {
    const grow = prog(t, this.no2.start, this.no2.end + 0.3, smooth), back = prog(t, this.wait.end - 0.1, this.why.start + 0.2, smooth);
    const k = grow * (1 - back);
    if (k <= 0) return;
    const pts = GHOST;
    const n = Math.max(2, Math.ceil(pts.length * k));
    g.save(); g.strokeStyle = PAL.block; g.lineWidth = 6; g.setLineDash([16, 12]); g.globalAlpha = 0.9;
    g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < n; i++) g.lineTo(...pts[i]); g.stroke(); g.setLineDash([]);
    const q = GHOST_X;
    if (k > 0.95) { g.font = '900 64px "Archivo"'; g.fillStyle = PAL.block; g.textAlign = 'center'; g.fillText('?', q[0], q[1] - 40); }
    const x = outBack(clamp((t - this.wait.words[1].start) / 0.18));
    if (x > 0) {
      g.lineWidth = 16; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 24;
      g.save(); g.translate(q[0], q[1]); g.scale(x, x); g.beginPath(); g.moveTo(-70, -70); g.lineTo(70, 70); g.moveTo(70, -70); g.lineTo(-70, 70); g.stroke(); g.restore();
    }
    g.restore();
  }
  /** Sao chổi chạy dọc đường mũ ở mỗi "Follow", mỗi lần nhanh hơn. */
  comets(g, t) {
    this.kicks.forEach((k0, i) => {
      const dur = 0.9 / (1 + 0.6 * i), k = prog(t, k0, k0 + dur);
      if (k <= 0 || k >= 1) return;
      for (let j = 0; j < 8; j++) {
        const u = lerp(-3.5, 2.7, clamp(k - j * 0.025)), [x, y] = G(u, 2 ** u);
        g.save(); g.globalAlpha = 1 - j / 8; g.fillStyle = j ? PAL.fwd : PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 26;
        g.beginPath(); g.arc(x, y, 16 - j * 1.5, 0, Math.PI * 2); g.fill(); g.restore();
      }
    });
  }
  /** Bảng đen trượt vào từ trái; phấn viết lời giải; trượt ra ở "Follow the curve". */
  board(g, t) {
    const inK = prog(t, this.why.start, this.why.start + 0.35, outExpo), outK = prog(t, this.fc.start - 0.15, this.fc.start + 0.2, smooth);
    if (inK <= 0 || outK >= 1) return;
    const { x, y, w, h } = BOARD, dx = -(1 - inK) * 1300 - outK * 1300;
    g.save(); g.translate(dx, 0);
    g.fillStyle = '#16241F'; g.fillRect(x, y, w, h); g.strokeStyle = '#8A6B3E'; g.lineWidth = 14; g.strokeRect(x, y, w, h);
    const c = '#EDEBE3', w1 = this.why.words, w2 = this.had.words;
    hand(g, 'aˣ = y  (y > 0)', x + 60, y + 100, prog(t, w1[1].start, w1[3].start + 0.2), { col: c, size: 74 });
    hand(g, '→ exactly one x', x + 60, y + 220, prog(t, w1[3].start, w2[2].start + 0.2), { col: PAL.fwdCore, size: 74 });
    hand(g, 'x = logₐ y', x + 60, y + 350, prog(t, w2[2].start, w2[5].start + 0.3), { col: PAL.backCore, size: 90 });
    g.restore();
  }
  /** Sách giáo khoa: mở ra ở "Not because", đóng sập ở "declared", vỡ thành ký hiệu. */
  book(g, t) {
    const a = this.notb.words[3].start - 0.25;
    if (t < a) return;
    shatter(g, c => this.bookShape(c, t, a), prog(t, this.slam + 0.45, this.slam + 0.8), t, { seed: 45, cell: 10 });
  }
  bookShape(g, t, a) {
    const app = outBack(clamp((t - a) / 0.25)), shut = smooth(prog(t, this.slam - 0.05, this.slam + 0.12));
    g.save(); g.translate(760, 760); g.scale(app, app); g.rotate(-0.05);
    const W = 250, Hh = 300;
    g.fillStyle = '#7A2230'; g.fillRect(-W - 14, -Hh / 2 - 12, 2 * W + 28, Hh + 24);   // bìa
    g.fillStyle = PAL.paper; g.fillRect(-W, -Hh / 2, W, Hh);                             // trang trái
    g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('DEFINITION', -W / 2, -Hh / 2 + 40);
    g.font = '500 22px "IBM Plex Mono"'; ['logₐ y = x', 'iff aˣ = y.', '', 'Memorize.'].forEach((s, i) => g.fillText(s, -W / 2, -40 + i * 40));
    // trang phải lật sang trái (đóng sập): bề rộng cos
    const cs = Math.cos(Math.PI * shut);
    g.save(); g.scale(cs, 1);
    g.fillStyle = cs > 0 ? PAL.paper : '#7A2230'; g.fillRect(0, -Hh / 2, W, Hh);
    if (cs > 0) { g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.fillText('RULE 7.3', W / 2, -Hh / 2 + 40); g.font = '500 22px "IBM Plex Mono"'; g.fillText('log xy = log x + log y', W / 2, -10); }
    else { g.fillStyle = PAL.paper; g.font = '900 40px "Archivo"'; g.save(); g.scale(-1, 1); g.fillText('TEXTBOOK', -W / 2, 0); g.restore(); }
    g.restore();
    g.restore();
  }
  /** Ba chữ khổng lồ theo ba "Follow": CURVE · LAW · REASON (chữ mới giải mã, chữ cũ vỡ). */
  follow(g, t) {
    const W3 = [[this.fc, 'CURVE', PAL.fwd], [this.fl, 'LAW', PAL.truth], [this.fr, 'REASON', PAL.back]];
    W3.forEach(([l, s, col], i) => {
      const end = (W3[i + 1]?.[0].start) ?? this.two.start;   // hiện từ chữ "Follow", vỡ khi chữ sau vào
      if (t < l.start) return;
      const p = 1 + 0.4 * (1 - outBack(clamp((t - l.start) / 0.2)));
      g.save(); g.translate(960, 330); g.scale(p, p);
      burstText(g, s, t, end, 0, 90, '900 250px "Archivo"', col, { dur: 0.3, seed: 60 + i, align: 'center', alpha: 0.9 });
      g.restore();
    });
  }
  /** Nhãn hai đường (cùng chỗ trong mọi khung → nhập lại không nhảy); vỡ ở 0.3s cuối cảnh. */
  labels(g, t, e, l) {
    const F = '900 110px "Archivo"', tb = this.next - 0.3;
    if (e) burstText(g, '2ˣ', t, tb, 560, 260, F, PAL.fwd, { seed: 71 });
    if (l) burstText(g, 'log₂ x', t, tb, 1180, 690, F, PAL.back, { seed: 72 });
  }
  /** Hai khung (mũ | log) trượt vào giữa, nhập làm một đồ thị có gương, nở ra toàn khung. */
  split(g, t) {
    const inK = prog(t, this.two.start, this.two.start + 0.35, outExpo), m = smooth(prog(t, this.one.start, this.one.words[2].start + 0.2));
    const grow = smooth(prog(t, this.views.start, this.views.end + 0.2));
    const sc = lerp(0.46, 1, grow), panel = (cx, fn) => {
      g.save(); g.translate(cx, 540); g.scale(sc, sc); g.translate(-960, -540);
      g.save(); g.beginPath(); g.rect(0, 0, 1920, 1080); g.clip(); fn(); g.restore();
      g.strokeStyle = PAL.truth; g.lineWidth = 6 / sc; g.globalAlpha = 1 - grow; g.strokeRect(0, 0, 1920, 1080);
      g.restore();
    };
    const off = lerp(470, 0, m), drop = (1 - inK) * 1100;
    if (m < 1) {
      panel(960 - off, () => { g.translate(0, -drop); graph(g, { k: 1 }); this.labels(g, t, 1, 0); });
      panel(960 + off, () => { g.translate(0, drop); graph(g, { k: 0, kl: 1 }); this.labels(g, t, 0, 1); });
    } else panel(960, () => { graph(g, { k: 1, kl: 1, km: smooth(prog(t, this.views.start, this.views.start + 0.4)) }); this.labels(g, t, 1, 1); });
  }
}
```
- [ ] **Step 4: Nối** P22 ở `'And if the curve'`.
- [ ] **Step 5: P17 không đổi**: `<scratchpad>/shoot.sh 99.2,100.2,105.0,110.0,112.6 out/check/p17-after && <scratchpad>/same.sh out/check/p17-before out/check/p17-after` → `SAME (5 ảnh)`.

- [ ] **Step: Chụp và NHÌN**

Run: `<scratchpad>/shoot.sh 168.62,169.4,170.4,171.3,172.6,173.9,174.5,175.5,176.6,177.3,178.6,179.8,180.6,181.3,181.8,182.7,183.4,184.2,184.8,185.6,186.5 out/check/p22`
Kỳ vọng theo từng mốc:
- 168.62: loé.
- 169.4–170.4: camera ngồi trên đường mũ, nghiêng theo dốc.
- 171.3–172.6: laser ngang, giao điểm duy nhất có nhãn `1`.
- 173.9 / 174.5 / 175.5: ONE HEIGHT, ONE CROSSING, ONE EXPONENT, không đè lên đường cong hay nhân vật; tư thế chỉ xuống.
- 176.6–177.3: nhánh ma đỏ, `?`, gạch chéo; tư thế chặn.
- 178.6–179.8: bảng đen, chữ phấn; tư thế cầm phấn.
- 180.6 → 181.3 → 181.8: sách mở, đóng sập, vỡ.
- 182.7 / 183.4 / 184.2: CURVE, LAW, REASON và sao chổi; tư thế mời.
- 184.8 → 186.5: hai khung trượt vào, nhập làm một đồ thị có gương.
- [ ] **Step: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS (tất cả).
```bash
git add projects/mv/exp-log/chorus2.js projects/mv/exp-log/plates/p22-unique.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P22 unique — roller-coaster curve, one crossing per height, the ghost second answer, chalk vs textbook"
```

---

### Task 4: `finale.js` + P23 `finale` (186.88 → 196.86) + P23b `alive` (196.86 → 208.60)

**Files:** Create `tools/test/finale.test.mjs`, `projects/mv/exp-log/finale.js`, `projects/mv/exp-log/plates/p23-finale.js`, `projects/mv/exp-log/plates/p23b-alive.js`; Modify `index.html`

**Interfaces:**
- Consumes `graph` từ Task 3, `RULE_CARDS` từ `gear.js`, `backdrop` từ `backdrop.js`.
- Produces from `finale.js`:
  - `FACE`
  - `along(s, d)`
  - `BADGES`
  - `parade(g, t, { k, d, speed, pulse, scale, reflect })`
  - `EQUATIONS`
  - `sun(g, t, x, y, R, { reach, bloom, spin })`
  - `comet(g, k, a, b, { log, col, core, r })`
  - `ties(g, k, { us, glow })`
  - `flipCard(...)`
  - `skyCard(...)`

  P24–P27 dùng `FACE`, `parade` và `EQUATIONS`.

- [ ] **Step 1: Test viết trước**
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { along, EQUATIONS } from '../../../projects/mv/exp-log/finale.js';
import { G } from '../../../projects/mv/exp-log/chorus2.js';
import { MIRROR } from '../../../projects/mv/exp-log/song.js';
import { reflectPoint, mirrorMatrix } from '../../../engine/mirror.js';

const near = (a, b, e = 1e-9) => a.every((v, i) => Math.abs(v - b[i]) < e);

test('along: d > 0 nằm phía vàng (x + y < 1500), cách gương đúng d', () => {
  for (const s of [-0.3, 0, 0.5, 1.2]) {
    const [x, y] = along(s, 330), dist = (1500 - (x + y)) / Math.SQRT2;
    assert.ok(Math.abs(dist - 330) < 1e-9, `s=${s}: ${dist}`);
  }
  assert.ok(near(along(0.5), [960, 540]));                         // giữa gương = tâm khung
});

test('dây nối: ảnh của (u, 2^u) qua gương màn hình là (2^u, u) — đường log', () => {
  for (const u of [-2, -0.5, 0, 1, 2]) assert.ok(near(reflectPoint(G(u, 2 ** u), MIRROR), G(2 ** u, u), 1e-6));
});

test('thẻ rơi chạm gương bật ngang sang trái: (0, 1) → (−1, 0)', () => {
  const [a, b, c, d] = mirrorMatrix(MIRROR), v = [0, 1];
  assert.ok(near([a * v[0] + c * v[1], b * v[0] + d * v[1]], [-1, 0], 1e-9));
});

test('tia mặt trời: các đẳng thức số đều đúng', () => {
  const close = (x, y, e) => Math.abs(x - y) < e;
  assert.ok(EQUATIONS.includes('2^√2 ≈ 2.665') && close(2 ** Math.SQRT2, 2.665, 5e-4));
  assert.ok(EQUATIONS.includes('1.07¹⁰·² ≈ 2') && close(1.07 ** 10.2, 2, 0.01));
  assert.ok(EQUATIONS.includes('log₁.₀₇ 2 ≈ 10.2') && close(Math.log(2) / Math.log(1.07), 10.2, 0.05));
  assert.ok(EQUATIONS.includes('2¹⁰ = 1024') && 2 ** 10 === 1024);
});
```
- [ ] **Step 2: Chạy, phải ĐỎ**: `node --test tools/test/finale.test.mjs` → FAIL (`Cannot find module …/finale.js`).
- [ ] **Step 3: `finale.js`**
```js
// Thế giới điệp khúc cuối (P23, P23b) và màn chào (P27): mọi vật của bài quay lại DỌC GƯƠNG.
// Mỗi vật là một huy hiệu nhỏ vẽ quanh gốc toạ độ; đoàn diễu hành trôi dọc đường gương ở phía VÀNG (trên-trái,
// x + y < 1500 — phía đường mũ), và ảnh của nó qua gương (nhuộm xanh) trôi ở phía kia: cùng một chuyện, hai chiều.
import { clamp, hash, lerp, outBack, smooth } from '../../../engine/lib.js';
import { drawReflected } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';
import { G } from './chorus2.js';

const MA = [420, 1080], MB = [1500, 0], NG = [-Math.SQRT1_2, -Math.SQRT1_2];   // gương; pháp tuyến về phía vàng

export const FACE = [960, 870, 560];                   // = P16/P17: mặt cận trên gương (P23, P23b, P25)

/** Điểm trên gương ở tham số s (0 = mép dưới, 1 = mép trên), lệch d px về phía vàng. */
export const along = (s, d = 0) => [lerp(MA[0], MB[0], s) + NG[0] * d, lerp(MA[1], MB[1], s) + NG[1] * d];

// ——— huy hiệu: mỗi cái vẽ quanh (0, 0), cỡ ~150 px ———
function cubes(g) {                                   // 2³: tám khối lập phương (P02)
  const c = 38;
  for (let i = 0; i < 8; i++) {
    const x = (i & 1) * c + ((i >> 1) & 1) * c * 0.5 - 50, y = -((i >> 2) & 1) * c - ((i >> 1) & 1) * c * 0.5 + 30;
    g.fillStyle = PAL.fwd; g.strokeStyle = PAL.bg; g.lineWidth = 2; g.fillRect(x, y - c, c, c); g.strokeRect(x, y - c, c, c);
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 44px "Archivo"'; g.textAlign = 'center'; g.fillText('2³', 0, 86);
}
function sunBadge(g) {                                // mặt trời phương trình (P06)
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, 80);
  gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.6, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 80, 0, Math.PI * 2); g.fill();
  g.strokeStyle = PAL.fwd; g.lineWidth = 4;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * 64, Math.sin(a) * 64); g.lineTo(Math.cos(a) * 96, Math.sin(a) * 96); g.stroke(); }
  g.fillStyle = PAL.bg; g.font = '900 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('aᵐ⁺ⁿ', 0, 2);
}
function engineBadge(g, t) {                          // cửa két = động cơ × → + (P13, P18)
  g.strokeStyle = PAL.fwd; g.lineWidth = 8;
  for (const r of [70, 50]) { g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke(); }
  g.lineWidth = 7; g.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = t * 0.6 + i / 8 * Math.PI * 2;
    g.save(); g.translate(Math.cos(a) * 92, Math.sin(a) * 92); g.rotate(a);
    g.beginPath(); g.moveTo(-12, 0); g.lineTo(12, 0); g.moveTo(0, -12); g.lineTo(0, 12); g.stroke(); g.restore();
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 34px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('×→+', 0, 2);
}
function coins(g) {                                   // chồng xu 1.07 (P13)
  for (let i = 0; i < 4; i++) {
    const h = 30 + i * 22, x = -66 + i * 44;
    g.fillStyle = PAL.fwd; g.fillRect(x - 18, 40 - h, 36, h);
    g.fillStyle = PAL.fwdCore; g.beginPath(); g.ellipse(x, 40 - h, 18, 6, 0, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 40px "Archivo"'; g.textAlign = 'center'; g.fillText('×1.07', 0, 96);
}
function stamp(g) {                                   // con dấu LOGARITHM (P12)
  g.rotate(-0.08); g.strokeStyle = PAL.fwd; g.lineWidth = 6; g.strokeRect(-120, -44, 240, 88);
  g.fillStyle = PAL.fwd; g.font = '900 34px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('LOGARITHM', 0, 2);
}
function sheetBadge(g) {                              // tờ giấy gập (P19–P20)
  g.fillStyle = PAL.paper; g.beginPath(); g.moveTo(-80, -70); g.lineTo(40, -70); g.lineTo(80, -30); g.lineTo(80, 70); g.lineTo(-80, 70); g.closePath(); g.fill();
  g.fillStyle = '#C9C2B2'; g.beginPath(); g.moveTo(40, -70); g.lineTo(40, -30); g.lineTo(80, -30); g.closePath(); g.fill();
  g.strokeStyle = '#B87410'; g.lineWidth = 5; g.beginPath();
  for (let i = 0; i <= 20; i++) { const u = -3 + i * 0.25, x = -60 + i * 6, y = 50 - 2 ** u * 14; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
}
export const BADGES = [cubes, sunBadge, engineBadge, coins, stamp, sheetBadge];

/**
 * Đoàn diễu hành: n huy hiệu trôi dọc gương (tốc độ speed tham số/giây), cách gương d px về phía vàng; ảnh qua
 * gương nhuộm xanh ở phía kia. k: 0 → 1 các huy hiệu nảy vào lần lượt (outBack, không fade). pulse: nhịp beat.
 */
export function parade(g, t, { k = 1, d = 330, speed = 0.018, pulse = 0, scale = 1, reflect = true } = {}) {
  if (k <= 0) return;
  const draw = (c) => BADGES.forEach((fn, i) => {
    const s = ((i / BADGES.length + t * speed) % 1) * 1.65 - 0.35, [x, y] = along(s, d);
    const pop = outBack(clamp((k - i * 0.1) / 0.4));
    if (pop <= 0) return;
    c.save(); c.translate(x, y); c.scale(scale * pop * (1 + 0.08 * pulse), scale * pop * (1 + 0.08 * pulse)); fn(c, t); c.restore();
  });
  draw(g);
  if (reflect) drawReflected(g, MIRROR, draw, { tint: PAL.back, tintAlpha: 0.55 });
}

// Tia của mặt trời cuối: mọi đẳng thức của bài — "the reason comes alive".
export const EQUATIONS = ['2³ = 8', 'log₂ 8 = 3', '2^√2 ≈ 2.665', 'aᵐ·aⁿ = aᵐ⁺ⁿ', '1.07¹⁰·² ≈ 2', 'log₁.₀₇ 2 ≈ 10.2',
  'a⁰ = 1', '2⁻¹ = ½', 'y = 2ˣ ⇔ x = log₂ y', 'log xy = log x + log y', '2¹⁰ = 1024', 'log₂ 1 = 0'];

/** Mặt trời phương trình: lõi bán kính R, tia chữ dài reach ∈ [0,1], bloom ∈ [0,1] (loé tràn khung). */
export function sun(g, t, x, y, R, { reach = 1, bloom = 0, spin = 0 } = {}) {
  if (R <= 0) return;
  g.save();
  const gr = g.createRadialGradient(x, y, 0, x, y, R * 1.6);
  gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.55, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * 1.6, 0, Math.PI * 2); g.fill();
  if (bloom > 0) {
    const b = g.createRadialGradient(x, y, R, x, y, R + 1400 * bloom);
    b.addColorStop(0, `rgba(255,227,163,${0.75 * bloom})`); b.addColorStop(1, 'rgba(255,181,71,0)');
    g.fillStyle = b; g.fillRect(-500, -500, 2920, 2080);
  }
  g.font = '500 30px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.textAlign = 'left';
  EQUATIONS.forEach((s, i) => {
    const a = (i / EQUATIONS.length) * Math.PI * 2 - Math.PI / 2 + spin, n = Math.ceil(s.length * clamp(reach * 1.4 - (i % 3) * 0.2));
    if (n <= 0) return;
    g.save(); g.translate(x, y); g.rotate(a);
    g.fillStyle = i % 2 ? PAL.fwdCore : PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 12;
    g.fillText(s.slice(0, n), R * 1.4, 0); g.restore();
  });
  g.restore();
}

/** Sao chổi chạy trên đường cong: u từ a tới b theo k; log = chạy trên ảnh qua gương (xanh). */
export function comet(g, k, a, b, { log = false, col = log ? PAL.back : PAL.fwd, core = log ? PAL.backCore : PAL.fwdCore, r = 18 } = {}) {
  if (k <= 0 || k >= 1) return;
  for (let j = 0; j < 10; j++) {
    const u = lerp(a, b, clamp(k - j * 0.022)), v = 2 ** u, [x, y] = log ? G(v, u) : G(u, v);
    g.save(); g.globalAlpha = 1 - j / 10; g.fillStyle = j ? col : core; g.shadowColor = col; g.shadowBlur = 30;
    g.beginPath(); g.arc(x, y, r - j * 1.4, 0, Math.PI * 2); g.fill(); g.restore();
  }
}

/** Dây nối vuông góc gương giữa điểm (u, 2^u) và ảnh (2^u, u) — "one connection"; k: số dây đã nối. */
export function ties(g, k, { us = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], glow = 0 } = {}) {
  us.forEach((u, i) => {
    const e = smooth(clamp(k * us.length - i));
    if (e <= 0) return;
    const a = G(u, 2 ** u), b = G(2 ** u, u), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    g.save(); g.lineWidth = 4 + 4 * glow; g.lineCap = 'round'; g.shadowBlur = 16 + 20 * glow;
    g.strokeStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.beginPath(); g.moveTo(...m); g.lineTo(lerp(m[0], a[0], e), lerp(m[1], a[1], e)); g.stroke();
    g.strokeStyle = PAL.back; g.shadowColor = PAL.back; g.beginPath(); g.moveTo(...m); g.lineTo(lerp(m[0], b[0], e), lerp(m[1], b[1], e)); g.stroke();
    g.fillStyle = PAL.truth; g.beginPath(); g.arc(...m, 8, 0, Math.PI * 2); g.fill();
    g.restore();
  });
}

/**
 * Thẻ lật quanh trục ngang: mặt trước (front, colF) → mặt sau (back, colB) theo flip ∈ [0,1]. pop: nảy vào.
 * Chữ mặt sau đọc xuôi (lật lại bằng |cos| — LESSONS: chữ phải đọc được).
 */
export function flipCard(g, x, y, front, back, flip, pop, { colF = PAL.fwd, colB = PAL.back, w = 900, h = 130 } = {}) {
  if (pop <= 0) return;
  const c = Math.cos(Math.PI * flip), face = c >= 0, col = face ? colF : colB;
  g.save(); g.translate(x, y); g.scale(pop, pop * Math.max(Math.abs(c), 0.02));
  g.fillStyle = PAL.bg; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = col; g.lineWidth = 8; g.shadowColor = col; g.shadowBlur = 24; g.strokeRect(-w / 2, -h / 2, w, h);
  g.shadowBlur = 0; g.fillStyle = col; g.font = '900 84px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(face ? front : back, 0, 4);
  g.restore();
}

/** Thẻ công thức rơi từ trời: rơi thẳng tới gương (y = 1500 − x), bật ngang sang trái ra khỏi khung. */
export function skyCard(g, text, x, t, t0, { col = PAL.fwd, seed = 0 } = {}) {
  if (t < t0) return;
  const y0 = -120, yHit = 1500 - x, vy = 1900, tHit = (yHit - y0) / vy, dt = t - t0;
  let px = x, py, rot = (hash(seed) - 0.5) * 0.4;
  if (dt < tHit) py = y0 + vy * dt;
  else { const d = dt - tHit; py = yHit - 60 * d; px = x - 2300 * d; rot += -3 * d; }   // vận tốc (0, v) qua gương x + y = c → (−v, 0)
  if (px < -400) return;
  g.save(); g.translate(px, py); g.rotate(rot);
  g.fillStyle = PAL.paper; g.fillRect(-130, -34, 260, 68); g.strokeStyle = col; g.lineWidth = 4; g.strokeRect(-130, -34, 260, 68);
  g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 0, 2);
  g.restore();
  // tia lửa ở điểm chạm
  const sp = (dt - tHit) / 0.25;
  if (sp > 0 && sp < 1) {
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4; g.globalAlpha = 1 - sp;
    for (let i = 0; i < 8; i++) { const a = hash(seed * 3 + i) * Math.PI * 2, r0 = 20 + 60 * sp, r1 = r0 + 40; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, yHit + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, yHit + Math.sin(a) * r1); g.stroke(); }
    g.restore();
  }
}
```
- [ ] **Step 4: Chạy, phải XANH**: `node --test tools/test/finale.test.mjs` → PASS 4/4.
- [ ] **Step 5: `plates/p23-finale.js`**
```js
// P23 finale — "Tất cả qua gương" · 186.88 → 196.86 (TREATMENT P23 nửa đầu, final chorus — ĐỈNH)
// Đồ thị P22 vừa nhập làm một (mũ + log + gương) giờ là sân khấu. Mọi vật của bài quay lại thành đoàn diễu hành
// dọc gương — phía vàng là vật, phía xanh là ảnh của nó. Sàn ký hiệu, bokeh, camera nảy theo beat.
// "Run it forward, run it back": mặt cận hát nhép; sao chổi vàng tiến trên đường mũ, xanh lùi trên đường log.
// "Fold the graph — watch them match": nửa vàng gập qua gương, đường mũ đè khít đường log — rồi NỔ thành ký hiệu.
// "Exponential goes forward": nhân vật nhảy giữa khung, đồ thị tụ lại từ ký hiệu, sao chổi lớn. "Logarithm comes
// back": sao chổi xanh. "Two directions — one connection": mặt cận trở lại; dây nối vuông góc gương nối từng điểm
// với ảnh của nó, loé ở "connection".
import { clamp, prog, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { foldMatrix, clipSide } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { shatter, drawMorph } from '../../../../engine/morph.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { G, graph } from '../chorus2.js';
import { parade, comet, ties, FACE } from '../finale.js';

const CURVE_PTS = Array.from({ length: 60 }, (_, i) => { const u = -4 + i * 0.11, v = 2 ** u; return i % 2 ? G(v, u) : G(u, v); });
const SCATTER = CURVE_PTS.map((_, i) => [960 + (hash(i * 3.7) - 0.5) * 2200, 540 + (hash(i * 5.3) - 0.5) * 1300]);

export default class P23 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x, n = 1) => s.tl.line(x, n);
    this.fwd = L('Run it forward,', 3); this.back = L('run it back.', 3); this.fold = L('Fold the graph—'); this.match = L('watch them match.');
    this.exp = L('Exponential goes forward.'); this.log = L('Logarithm comes back.'); this.two = L('Two directions—'); this.conn = L('one connection.');
    this.next = s.tl.at('No tricks.');
    this.boom = this.match.words[2].start - 0.05;                  // "match": nổ
    this.rebuilt = this.exp.start + 0.55;
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.3));              // sàn + bokeh dâng lên cùng cú vào điệp khúc (như P17)
    return { glow: 1, horizon: 780, floor: 0.75 * k, mirror: true, bokeh: 0.7 * k };
  }
  camera(t) {
    const p = beat.beatPulse(t, 0.16), punch = t >= this.exp.start ? 1 - smooth(prog(t, this.exp.start, this.exp.start + 0.6)) : 0;
    return { s: 1.02 + 0.02 * p + 0.14 * punch, r: 0.02 * Math.sin((t - this.t0) * 0.5) + 0.05 * punch, bg: 0 };
  }
  render(g, t) {
    parade(g, t, { k: prog(t, this.t0, this.t0 + 1.2), pulse: beat.beatPulse(t, 0.16) });
    // đồ thị: gập ở "Fold the graph", nổ ở "match", tụ lại khi "Exponential" vào
    if (t < this.exp.start) shatter(g, c => this.folded(c, t), prog(t, this.boom, this.exp.start), t, { seed: 47 });
    else {
      const k = prog(t, this.exp.start + 0.1, this.rebuilt);
      drawMorph(g, SCATTER, CURVE_PTS, prog(t, this.exp.start - 0.1, this.rebuilt), t, { spread: 200 });
      graph(g, { k: smooth(k), kl: smooth(k), km: 1, a: 0.85 });
    }
    // sao chổi
    comet(g, prog(t, this.fwd.start, this.fwd.end + 0.3), -4, 2.7);
    comet(g, prog(t, this.back.start, this.back.end + 0.25), 2.7, -4, { log: true });
    comet(g, prog(t, this.rebuilt, this.exp.end + 0.2), -4.5, 2.75, { r: 26 });
    comet(g, prog(t, this.log.start, this.log.end + 0.1), 2.75, -4.5, { log: true, r: 26 });
    ties(g, prog(t, this.two.start, this.two.end) * (1 - prog(t, this.next - 0.35, this.next)), {   // rút về theo thứ tự trước P23b
      glow: Math.max(0, 1 - Math.abs(t - this.conn.words[1].start) / 0.25) });
    // nhân vật: mặt cận → nhảy → mặt cận
    this.faceAt(g, t, this.t0, this.fold.start - 0.1, 'burn', 'grid', 48);
    figure(g, this.m, 'jump', 960, 1080, 700, t < this.two.start - 0.3 ? 'burn' : 'digits',
      presence(t, this.exp.start - 0.05, this.two.start - 0.3, { inDur: 0.25, outDur: 0.4 }), { t, seed: 49 });
    this.faceAt(g, t, this.two.start + 0.05, this.next - 0.4, 'rows', 'digits', 50);
    footer(g, this.tl, t, ['forward', 'back', 'fold', 'match', 'exponential', 'logarithm', 'directions', 'connection'], { from: this.t0, carry: true });
  }
  faceAt(g, t, a, b, kin, kout, seed) {
    const [FX, FY, FH] = FACE, p = presence(t, a, b, { inDur: 0.3, outDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, kin, 'in', p.k, { t, cell: 7, seed });
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, kout, 'out', p.k, { t, cell: 7, seed });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
  }
  /** Đồ thị với nửa vàng (trên-trái) gập qua gương: c = 1 phẳng → −1 đè khít lên nửa xanh. */
  folded(g, t) {
    const c = lerp(1, -1, smooth(prog(t, this.fold.start, this.fold.words[2].start + 0.35)));
    g.save(); clipSide(g, MIRROR, 1); graph(g, { k: 1, kl: 1, km: 1, a: 0.85 }); g.restore();
    g.save(); g.transform(...foldMatrix(MIRROR, c)); clipSide(g, MIRROR, -1);
    graph(g, { k: 1, kl: 1, km: 0, a: 0.85 });
    if (c < 1) { g.fillStyle = `rgba(11,15,30,${0.3 * (1 - Math.abs(c))})`; g.fillRect(-600, -600, 3120, 2280); }
    g.restore();
  }
}
```
- [ ] **Step 6: `plates/p23b-alive.js`**
```js
// P23b alive — "Lý lẽ sống dậy" · 196.86 → 208.60 (TREATMENT P23 nửa sau, final chorus)
// Cùng sân khấu P23 (đồ thị, gương, đoàn diễu hành). "No tricks." / "No guessing.": nhân vật giơ tay chặn; thẻ
// TRICK, GUESS bị gạch đỏ. "No rules falling from the sky": nhân vật chỉ lên trời — thẻ công thức rơi xuống, chạm
// gương thì BẬT ngang ra khỏi khung (vận tốc thẳng đứng phản xạ qua đường x + y = c thành nằm ngang).
// "Follow what must stay true and the reason comes alive": mặt cận trở lại, sau đầu là mặt trời làm bằng MỌI đẳng
// thức của bài, bừng sáng tràn khung ở "alive". "Same law / Different direction / Same curve / Different
// reflection": hai thẻ lật trên bốn beat, vàng ⇄ xanh. "Why does it work?": MỌI THỨ ĐỨNG IM (thế giới đông ở
// mốc câu hỏi), câu hỏi của kênh trắng giữa khung, không hiệu ứng; chỉ nhân vật trầm tư hiện vào.
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { decodeLine, burstText } from '../../../../engine/lyric.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { graph } from '../chorus2.js';
import { RULE_CARDS } from '../gear.js';
import { parade, sun, flipCard, skyCard, FACE } from '../finale.js';
import { backdrop } from '../backdrop.js';

const MID = [1660, 1230, 900];
const SUN = [960, 520];
const KEYS = ['tricks', 'guessing', 'rules', 'sky', 'true', 'reason', 'alive', 'law', 'direction', 'curve', 'reflection'];

export default class P23b {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x) => s.tl.line(x);
    this.tricks = L('No tricks.'); this.guess = L('No guessing.'); this.rules = L('No rules falling from the sky.');
    this.follow = L('Follow what must stay true'); this.alive = L('and the reason comes alive.');
    this.law = L('Same law.'); this.dir = L('Different direction.'); this.curve = L('Same curve.'); this.refl = L('Different reflection.');
    this.why = L('Why does it work?');
    this.freeze = this.why.start;
  }
  bd() { return { glow: 1, horizon: 780, floor: 0.75, mirror: true, bokeh: 0.7, haloX: SUN[0], haloY: SUN[1] }; }
  backdropAt(t) { return t < this.freeze ? this.bd() : false; }    // đông cứng: cảnh tự vẽ nền ở mốc câu hỏi
  camera(t) {
    const tf = Math.min(t, this.freeze), p = beat.beatPulse(tf, 0.16), a = smooth(prog(tf, this.alive.words[4].start - 0.1, this.alive.words[4].start + 0.6));
    return { s: 1.02 + 0.02 * p + 0.08 * Math.sin(Math.PI * a), r: 0.02 * Math.sin((tf - 186.88) * 0.5), bg: 0 };
  }
  render(g, t) {
    const tf = Math.min(t, this.freeze);                          // "Why does it work?": thế giới đông cứng
    if (t >= this.freeze) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); backdrop(g, tf, { beat, ...this.bd() }); g.restore(); }
    this.world(g, tf);
    // nhân vật: chặn → chỉ trời → mặt cận (hào quang mặt trời)
    const P = (a, b) => presence(tf, a, b, { inDur: 0.25, outDur: 0.35 });
    figure(g, this.m, 'halt', ...MID, 'burn', P(this.t0 - 0.05, this.rules.start - 0.25), { t: tf, seed: 51 });
    figure(g, this.m, 'sky', 1520, MID[1], MID[2], 'columns', P(this.rules.start - 0.15, this.follow.start - 0.3), { t: tf, seed: 52 });
    this.faceAt(g, tf, this.follow.start - 0.1, 1e9);
    if (t >= this.freeze) this.question(g, t);
    else footer(g, this.tl, t, KEYS, { from: this.t0, carry: true });
  }
  world(g, t) {
    parade(g, t, { pulse: beat.beatPulse(t, 0.16) });
    graph(g, { k: 1, kl: 1, km: 1, a: 0.85 });
    // mặt trời phương trình sau đầu nhân vật
    const R = 230 * outBack(clamp((t - this.follow.start) / 0.6)), bl = smooth(prog(t, this.alive.words[4].start - 0.1, this.alive.words[4].start + 0.3)) * (1 - smooth(prog(t, this.alive.end + 0.1, this.law.start + 0.4)));
    sun(g, t, ...SUN, R, { reach: prog(t, this.follow.start + 0.3, this.follow.end + 0.4), bloom: bl, spin: 0.1 * (t - this.follow.start) });
    // TRICK, GUESS: thẻ nảy vào rồi bị gạch chéo; vỡ khi thẻ công thức rơi
    [[this.tricks, 'TRICK', 420, 300], [this.guess, 'GUESS?', 470, 520]].forEach(([l, s, x, y], i) => {
      if (t < l.start) return;
      const pop = outBack(clamp((t - l.start) / 0.18)), cross = outBack(clamp((t - l.words[1].start - 0.1) / 0.16)), out = this.rules.start;
      const shrink = 1 - smooth(prog(t, out, out + 0.3));
      g.save(); g.translate(x, y); g.rotate(i ? 0.05 : -0.06);
      if (shrink > 0.01) { g.save(); g.scale(pop * shrink, pop * shrink); g.strokeStyle = PAL.truth; g.lineWidth = 7; g.strokeRect(-170, -60, 340, 120); g.restore(); }
      burstText(g, s, t, out, 0, 26, '900 76px "Archivo"', PAL.truth, { dur: 0.3, seed: 80 + i, align: 'center', alpha: pop > 0 ? 1 : 0 });
      if (cross > 0 && shrink > 0.01) {
        g.save(); g.scale(cross * shrink, cross * shrink); g.strokeStyle = PAL.block; g.lineWidth = 14; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 20;
        g.beginPath(); g.moveTo(-190, -70); g.lineTo(190, 70); g.moveTo(190, -70); g.lineTo(-190, 70); g.stroke(); g.restore();
      }
      g.restore();
    });
    // thẻ công thức rơi từ trời, bật khỏi gương
    const w = this.rules.words;
    RULE_CARDS.forEach((s, i) => skyCard(g, s, 640 + i * 130, t, w[1].start + i * 0.17, { seed: 90 + i, col: i % 2 ? PAL.back : PAL.fwd }));
    // bốn thẻ lật: Same law ⇄ Different direction; Same curve ⇄ Different reflection
    const card2 = this.curve.start;
    if (t >= this.law.start) {
      const pop1 = outBack(clamp((t - this.law.start) / 0.2)) * (1 - smooth(prog(t, card2 - 0.12, card2 + 0.05)));
      flipCard(g, 960, 150, 'SAME LAW', 'DIFFERENT DIRECTION', smooth(prog(t, this.dir.start, this.dir.start + 0.3)), pop1, { w: 1100 });
      if (t >= card2) flipCard(g, 960, 150, 'SAME CURVE', 'DIFFERENT REFLECTION', smooth(prog(t, this.refl.start, this.refl.start + 0.3)), outBack(clamp((t - card2) / 0.2)), { w: 1180 });
    }
  }
  faceAt(g, t, a, b) {
    const [FX, FY, FH] = FACE, p = presence(t, a, b, { inDur: 0.3 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'burn', 'in', p.k, { t, cell: 7, seed: 53 });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
  }
  /** Câu hỏi của kênh: thế giới đông + màn tối, chữ trắng giữa khung không hiệu ứng; nhân vật trầm tư hiện vào. */
  question(g, t) {
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(11,15,30,0.62)'; g.fillRect(0, 0, 1920, 1080);
    g.font = '900 120px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Why does it work?', 820, 330);                    // tránh đầu nhân vật trầm tư (góc phải)
    g.restore();
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
    figure(g, this.m, 'ponder', 1660, 1230, 900, 'burn', presence(t, this.freeze + 0.05, 1e9, { inDur: 0.3 }), { t, seed: 54 });
    // dòng lời trước vỡ (không tắt cứng); câu hỏi đã ở giữa khung nên chân khung không lặp lại
    const prev = this.refl;
    decodeLine(g, this.tl.wordsOf(prev), t, 960, 1000, { align: 'center', font: '800 56px "Archivo"', colBase: PAL.truth, colKey: PAL.fwd, keys: KEYS, burstAt: this.freeze, burstDur: 0.3 });
    g.restore();
  }
}
```
- [ ] **Step 7: Nối** P23 ở `'Run it forward,', 3` và P23b ở `'No tricks.'`.

- [ ] **Step: Chụp và NHÌN**

Run: `<scratchpad>/shoot.sh 187.1,187.9,189.0,189.8,190.4,190.6,191.0,191.6,193.8,195.3,196.4,197.3,198.2,199.0,199.6,200.6,201.6,202.6,203.4,204.8,205.9,207.1,207.6,208.4 out/check/p23`
Kỳ vọng theo từng mốc:
- 187.1–187.9: đoàn huy hiệu dọc gương (vàng phía trên-trái, ảnh xanh phía kia), mặt cận hát, sao chổi vàng rồi xanh.
- 189.0–190.4: nửa vàng gập; ở 189.8 đường vàng nằm đúng lên đường xanh.
- 190.6: nổ thành ký hiệu.
- 191.0–193.8: tư thế nhảy, đồ thị tụ lại.
- 195.3–196.4: mặt cận, dây nối vuông góc gương.
- 197.3–198.2: TRICK, rồi GUESS? bị gạch; tư thế chặn.
- 199.0–199.6: thẻ rơi, chạm gương, bay ngang sang trái; tư thế chỉ trời, tay không bị cắt.
- 200.6–202.6: mặt trời đẳng thức sau đầu, bừng ở 202.6.
- 203.4 → 204.8 → 205.9 → 207.1: thẻ lật vàng ⇄ xanh.
- 207.6–208.4: khung đông + màn tối; "Why does it work?" ở (820, 330) không bị che; nhân vật trầm tư ở phải.
- [ ] **Step 8: Khung đông đứng im**: `<scratchpad>/shoot.sh 207.50,208.20 out/check/freeze` rồi so hai ảnh trong vùng x < 1200. Mọi khác biệt chỉ đến từ dòng lời trước đang vỡ ở chân khung (y > 940).
- [ ] **Step: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS (tất cả).
```bash
git add tools/test/finale.test.mjs projects/mv/exp-log/finale.js projects/mv/exp-log/plates/p23-finale.js projects/mv/exp-log/plates/p23b-alive.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P23/P23b final chorus — the whole song parades along the mirror, fold-and-explode, rules bounce off the mirror, the equation sun, freeze on the question"
```

---

### Task 5: P24 `chant` (208.60 → 211.48) + P25 `hook` (211.48 → 219.09)

**Files:** Create `projects/mv/exp-log/plates/p24-chant.js`, `projects/mv/exp-log/plates/p25-hook.js`; Modify `index.html`

**Interfaces:**
- Consumes `EQUATIONS` và `FACE` (Task 4).
- Produces `RING` (P25); không cảnh nào dùng lại.

- [ ] **Step 1: `plates/p24-chant.js`**
```js
// P24 chant — "FROM SCRATCH" · 208.60 → 211.48 ✂✂✂ (TREATMENT P24)
// Lead hát BA lần (lời gốc ghi hai): 208.60 · 209.54 · 210.58 — ba cú cắt cứng (danh sách 8 cú cắt của TREATMENT),
// mỗi cú một con dấu FROM SCRATCH đập xuống, lần sau to gấp đôi lần trước; ruột chữ lấp MỌI đẳng thức của bài.
// Bè vang 209–213 → từ con dấu thứ hai có bản gương xanh qua đường y = x. Con dấu cuối vỡ thành ký hiệu vào P25.
import { clamp, prog, smooth, outBack } from '../../../../engine/lib.js';
import { fillWord } from '../../../../engine/fill.js';
import { drawReflected } from '../../../../engine/mirror.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { EQUATIONS } from '../finale.js';

const SIZE = [150, 300, 600], ROT = [-0.06, 0.05, -0.04];

export default class P24 {
  backdrop = { glow: 1, haloX: 960, haloY: 540, haloR: 760 };
  async init(s) {
    this.hits = [1, 2, 3].map(n => s.tl.at('From scratch!', n));
    this.next = s.tl.at('Forward—');
  }
  idx(t) { return this.hits.filter(h => t >= h).length - 1; }
  camera(t) {
    const i = Math.max(0, this.idx(t)), d = 1 - smooth(prog(t, this.hits[i], this.hits[i] + 0.3));
    return { s: 1 + 0.04 * d, x: 16 * d * Math.sin(t * 95), y: 10 * d * Math.cos(t * 83), bg: 0.5 };
  }
  render(g, t) {
    const i = Math.max(0, this.idx(t));
    shatter(g, c => this.stamp(c, t, i), prog(t, this.next - 0.36, this.next), t, { seed: 61, cell: 14 });
    // loé 3 khung ở mỗi cú cắt (cắt cứng đi kèm cú đập)
    const dt = t - this.hits[i];
    if (dt < 0.05) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(244,241,234,0.35)'; g.fillRect(0, 0, 1920, 1080); g.restore(); }
  }
  stamp(g, t, i) {
    const draw = (c) => {
      const dt = t - this.hits[i], s = 1 + 0.5 * (1 - outBack(clamp(dt / 0.15))), F = SIZE[i];
      c.save(); c.translate(960, 560); c.rotate(ROT[i]); c.scale(s, s);
      c.font = `900 ${F}px "Archivo"`; const w = c.measureText('SCRATCH').width;
      c.font = `900 ${F * 0.42}px "Archivo"`; const wf = c.measureText('FROM').width;
      fillWord(c, 'FROM', -wf / 2, -F * 0.62, { font: `900 ${F * 0.42}px "Archivo"`, color: PAL.truth, innerColor: PAL.fwd, inner: EQUATIONS, drift: t * 90, innerFont: '500 18px "IBM Plex Mono"', lineH: 20 });
      fillWord(c, 'SCRATCH', -w / 2, F * 0.18, { font: `900 ${F}px "Archivo"`, color: PAL.fwd, innerColor: PAL.fwdCore, inner: EQUATIONS, drift: t * 120,
        innerFont: `500 ${Math.round(14 + F * 0.03)}px "IBM Plex Mono"`, lineH: Math.round(16 + F * 0.033) });
      c.strokeStyle = PAL.fwd; c.lineWidth = Math.max(6, F * 0.05); c.strokeRect(-w / 2 - F * 0.2, -F * 1.1, w + F * 0.4, F * 1.75);
      c.restore();
    };
    if (i >= 1) drawReflected(g, MIRROR, draw, { tint: PAL.back, tintAlpha: 0.65, alpha: 0.55 });   // bè vang: bản gương xanh
    draw(g);
  }
}
```
- [ ] **Step 2: `plates/p25-hook.js`**
```js
// P25 hook — "Hai chiều, một chuyện" · 211.48 → 219.09 (TREATMENT P25, final hook — hát)
// Ký hiệu của con dấu FROM SCRATCH tụ thành mặt cận trên gương, hát nhép. Quanh mặt là một vòng tròn CHƯA KHÉP:
// "Forward —": cung vàng chạy theo chiều kim đồng hồ qua ĐỈNH, từ 9 giờ tới 3 giờ; "exponential" uốn theo cung.
// "Backward —": cung xanh cũng xuất phát ở 9 giờ nhưng chạy NGƯỢC chiều qua ĐÁY; "logarithm" uốn theo cung.
// "Two directions": hai chấm sáng chạy trên hai cung theo hai chiều. "One story": hai mũi tên gặp nhau ở 3 giờ —
// vòng khép, loé trắng: hai chiều là một vòng tròn.
import { clamp, prog, smooth, lerp, outExpo } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { arcText } from '../../../../engine/typeobj.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, beat } from '../song.js';
import { footer } from '../kit.js';
import { FACE } from '../finale.js';

export const RING = { cx: 960, cy: 550, r: 380 };
const BL_FONT = '800 40px "Archivo"', BL_A0 = -0.14 * Math.PI;   // chữ xanh: cung phải, trên mép lời chân khung
const A9 = Math.PI, A3 = 2 * Math.PI;                  // 9 giờ, 3 giờ (theo chiều kim: tăng góc)

export default class P25 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x, n = 1) => s.tl.line(x, n);
    this.fwd = L('Forward—'); this.exp = L('exponential.', 2); this.back = L('Backward—'); this.log = L('logarithm.', 2);
    this.two = L('Two directions.', 2); this.story = L('One story.');
    this.next = s.tl.at('Ninety-nine percent...', 2);
  }
  backdropAt(t) { return { glow: 0.9, horizon: 780, floor: 0.45, mirror: true, bokeh: 0.3, haloY: RING.cy }; }
  camera(t) { return { s: 1 + 0.05 * smooth(prog(t, this.t0, this.next)), r: 0.012 * Math.sin((t - this.t0) * 0.7), bg: 0 }; }
  render(g, t) {
    shatter(g, c => this.ring(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 66 });
    // mặt cận: tụ từ ký hiệu, hát nhép; P26 nhận đúng mặt này
    const [FX, FY, FH] = FACE, p = presence(t, this.t0, 1e9, { inDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'in', p.k, { t, cell: 7, seed: 67 });
    else { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
    footer(g, this.tl, t, ['forward', 'exponential', 'backward', 'logarithm', 'directions', 'story'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  /** Hai cung + chữ uốn + chấm chạy; "One story" khép vòng. */
  ring(g, t) {
    const { cx, cy, r } = RING;
    const close = smooth(prog(t, this.story.start, this.story.words[1].start + 0.1));
    const kg = prog(t, this.fwd.start, this.fwd.end + 0.2, outExpo), kb = prog(t, this.back.start, this.back.end + 0.2, outExpo);
    const gEnd = lerp(A9, lerp(A3 - 0.35, A3, close), kg), bEnd = lerp(A9, lerp(0.35, 0, close), kb);   // xanh đi ngược: π → 0
    const white = 1 - prog(t, this.story.words[1].start + 0.1, this.story.words[1].start + 0.5);
    g.save(); g.lineWidth = 12; g.lineCap = 'round';
    for (const [col, a0, a1, ccw] of [[PAL.fwd, A9, gEnd, false], [PAL.back, A9, bEnd, true]]) {
      if (a0 === a1) continue;
      g.strokeStyle = col; g.shadowColor = col; g.shadowBlur = 28;
      g.beginPath(); g.arc(cx, cy, r, a0, a1, ccw); g.stroke();
      if (close < 1) this.head(g, cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, a1 + (ccw ? -Math.PI / 2 : Math.PI / 2), col, 1 - close);
    }
    if (close >= 1 && white > 0) {                                  // vòng khép: loé trắng
      g.strokeStyle = PAL.truth; g.shadowColor = PAL.truth; g.shadowBlur = 50 * white; g.lineWidth = 12 + 14 * white;
      g.globalAlpha = white; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
    }
    g.restore();
    // chữ uốn: vàng phía trên-trái, xanh phía dưới-phải (đọc xuôi: chữ dưới quay mặt ra ngoài, xếp ngược)
    const ew = this.exp.words[0], lw = this.log.words[0];
    arcText(g, 'FORWARD · EXPONENTIAL', cx, cy, r + 48, 1.08 * Math.PI, { font: '800 40px "Archivo"', color: PAL.fwdCore,
      reveal: prog(t, this.fwd.start, ew.end + 0.1) });
    // xếp ngược + quay mặt ra ngoài: chữ ĐẦU nằm ở cuối cung → hiện n chữ đầu = vẽ n ký tự cuối của chuỗi ngược, neo ở cuối cung
    const BL = 'BACKWARD · LOGARITHM', n = Math.ceil(BL.length * prog(t, this.back.start, lw.end + 0.1));
    if (n > 0) {
      const vis = [...BL.slice(0, n)].reverse().join('');
      g.save(); g.font = BL_FONT; const da = (s) => [...s].reduce((a, ch) => a + g.measureText(ch).width, 0) / (r + 70);
      const a0 = BL_A0 + da(BL) - da(vis); g.restore();
      arcText(g, vis, cx, cy, r + 70, a0, { font: BL_FONT, color: PAL.backCore, flip: true });
    }
    // "Two directions": chấm sáng chạy hai chiều
    const run = prog(t, this.two.start, this.story.start);
    if (run > 0 && run < 1) for (const [col, dir] of [[PAL.fwdCore, 1], [PAL.backCore, -1]]) {
      const a = A9 + dir * Math.PI * ((run * 2) % 1);
      g.save(); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 30; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 16, 0, Math.PI * 2); g.fill(); g.restore();
    }
    // nhịp: chấm ở 9 giờ (gốc chung) đập theo beat
    g.save(); g.fillStyle = PAL.truth; g.beginPath(); g.arc(cx - r, cy, 12 + 6 * beat.beatPulse(t, 0.16), 0, Math.PI * 2); g.fill(); g.restore();
  }
  head(g, x, y, a, col, s) {
    g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s); g.fillStyle = col;
    g.beginPath(); g.moveTo(30, 0); g.lineTo(-14, -22); g.lineTo(-14, 22); g.closePath(); g.fill(); g.restore();
  }
}
```
- [ ] **Step 3: Nối** P24 ở `'From scratch!'` và P25 ở `'Forward—'`.

- [ ] **Step: Chụp và NHÌN**

Run: `<scratchpad>/shoot.sh 208.63,208.9,209.6,210.0,210.65,211.2,211.7,212.4,213.5,214.9,215.6,216.6,217.3,218.4,218.9 out/check/p2425`
Kỳ vọng theo từng mốc:
- Ba cú cắt: 208.63 có loé; 209.6 to gấp đôi và có bản xanh; 210.65 tràn khung.
- 211.2: vỡ thành ký hiệu.
- 211.7–213.5: mặt tụ lại; cung vàng qua đỉnh với chữ FORWARD · EXPONENTIAL.
- 214.9–216.6: cung xanh qua đáy; chữ BACKWARD · LOGARITHM hiện từ chữ B trở đi, nằm trên mép lời chân khung.
- 217.3: hai chấm chạy ngược chiều nhau.
- 218.4: vòng khép, loé trắng.
- 218.9: vòng vỡ, mặt còn nguyên.
- [ ] **Step: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS (tất cả).
```bash
git add projects/mv/exp-log/plates/p24-chant.js projects/mv/exp-log/plates/p25-hook.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P24 FROM SCRATCH x3 stamps, P25 hook — two arcs from one point close into one ring"
```

---

### Task 6: `loading.js` + P26 `loading` (219.09 → 221.22) + P27 `outro` (221.22 → 239.65)

**Files:** Create `projects/mv/exp-log/loading.js`, `projects/mv/exp-log/plates/p26-loading.js`, `projects/mv/exp-log/plates/p27-outro.js`; Modify `index.html`

**Interfaces:** Produces `scanlines`, `loadBar`, `caret`, `nines`, `crtOff` và `BAR` trong `loading.js`. P01 KHÔNG đổi: nó giữ bản vẽ riêng để không đổi pixel.

- [ ] **Step 1: `loading.js`**
```js
// Khung sách của bài: màn CRT + thanh loading kẹt ở 99% (P01 mở, P26–P27 kết).
// P01 giữ bản vẽ riêng của nó (không đổi pixel cảnh cũ); bản này dùng cho phần kết.
import { W, H, clamp, smooth } from '../../../engine/lib.js';
import { PAL } from './song.js';

export const BAR = { x: 144, y: 700, w: 552, cells: 24 };

/** Đường quét CRT. */
export function scanlines(g, a = 1) {
  if (a <= 0) return;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 0.08 * a; g.fillStyle = PAL.truth;
  for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);
  g.restore();
}

/** Thanh loading: khung mở ra theo open ∈ [0,1], các ô đầy tới fill ∈ [0,1]. */
export function loadBar(g, fill, { open = 1, x = BAR.x, y = BAR.y, w = BAR.w, cells = BAR.cells } = {}) {
  if (open <= 0) return;
  const cw = w / cells;
  g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 2; g.strokeRect(x - 4, y - 4, (w + 8) * open, 34);
  g.fillStyle = PAL.fwd;
  for (let i = 0; i < cells; i++) {
    const f = clamp(fill * w / cw - i);
    if (f > 0 && (i + 1) * cw <= w * open + 0.5) g.fillRect(x + i * cw, y, cw * f + (f >= 1 ? 0.5 : 0), 26);
  }
  g.restore();
}

/** Con trỏ khối nhấp nháy (on: đang sáng). */
export function caret(g, x, y, on) { if (on) { g.save(); g.fillStyle = PAL.fwd; g.fillRect(x, y - 16, 16, 30); g.restore(); } }

/** "99.999…%": n chữ số 9 sau dấu phẩy, xuống dòng khi chạm mép phải (chữ số không bao giờ đủ — vọng P03). */
export function nines(g, n, x, y, { font = '500 34px "IBM Plex Mono"', right = 1780, left = 140, lineH = 46, col = PAL.truth } = {}) {
  g.save(); g.font = font; g.fillStyle = col; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  const cw = g.measureText('9').width, s = n > 0 ? `99.${'9'.repeat(n)}%` : '99%';
  let px = x, py = y;
  for (const ch of s) {
    if (px + cw > right) { px = left; py += lineH; }
    g.fillStyle = ch === '%' ? PAL.fwd : col; g.fillText(ch, px, py); px += cw;
  }
  g.restore();
  return { x: px, y: py };
}

let cb = null;
/**
 * CRT tắt: paint(c) vẽ cả khung; k ∈ [0,1]. 0–0.45 ép dẹt theo chiều đứng (sáng lên) → một vạch;
 * 0.45–0.8 vạch co lại thành một chấm; 0.8–1 chấm tắt. k ≥ 1: đen.
 */
export function crtOff(g, paint, k) {
  if (k <= 0) { paint(g); return; }
  const tr = g.getTransform();                       // camera của cảnh: vẽ vào bộ đệm với đúng biến đổi này
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  if (k < 1) {
    cb ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
    const b = cb.getContext('2d');
    b.setTransform(1, 0, 0, 1, 0, 0); b.fillStyle = PAL.bg; b.fillRect(0, 0, W, H);
    b.save(); b.setTransform(tr); paint(b); b.restore();
    const sy = k < 0.45 ? Math.max(0.004, 1 - smooth(k / 0.45)) : 0.004, sx = k < 0.45 ? 1 : Math.max(0.004, 1 - smooth((k - 0.45) / 0.35));
    g.translate(W / 2, H / 2); g.scale(sx, sy);
    g.filter = `brightness(${(1 + 3 * clamp(k / 0.45)).toFixed(2)})`;
    g.globalAlpha = k < 0.8 ? 1 : 1 - (k - 0.8) / 0.2;
    g.drawImage(cb, -W / 2, -H / 2);
    if (k >= 0.45) { g.filter = 'none'; g.fillStyle = PAL.truth; g.fillRect(-W / 2, -3 / sy, W, 6 / sy); }   // vạch trắng 6px còn lại (co theo sx)
  }
  g.restore();
}
```
- [ ] **Step 2: `plates/p26-loading.js`**
```js
// P26 loading — "Trở về 99%" · 219.09 → 221.22 (TREATMENT P26, khung sách: kết như P01 mở)
// "Ninety-nine percent…": mặt cận của P25 tan NGƯỢC thành chân dung ký hiệu (cháy trắng → ký hiệu) và trượt về đúng
// chỗ chân dung của P01; đường quét CRT trở lại; thanh loading gõ lên 99% như lúc mở bài. "Loading.": giọng máy,
// LOADING nhấp theo beat, con trỏ. Cả màn vỡ thành ký hiệu khi màn chào P27 loé lên.
import { prog, smooth, lerp } from '../../../../engine/lib.js';
import { drawTransit } from '../../../../engine/transit.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, beat } from '../song.js';
import { FACE } from '../finale.js';
import { scanlines, loadBar, caret, BAR } from '../loading.js';

const PORTRAIT = [1240, 900, 760];                    // = P01 FACE_X, FACE_Y, FACE_H
const F = '500 34px "IBM Plex Mono"';

export default class P26 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.l99 = s.tl.line('Ninety-nine percent...', 2); this.lLoad = s.tl.line('Loading.', 2);
    this.next = this.lLoad.end + 0.12;                 // 221.22: màn chào P27
  }
  backdropAt(t) {
    const e = smooth(prog(t, this.t0, this.t0 + 0.6));
    return { glow: lerp(0.9, 0.6, e), haloX: lerp(960, PORTRAIT[0], e), haloY: lerp(550, 520, e), floor: 0.45 * (1 - e), horizon: 780, mirror: true };
  }
  camera(t) { const e = smooth(prog(t, this.t0, this.t0 + 0.6)); return { s: lerp(1.05, 1, e), bg: 0 }; }
  render(g, t) {
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.32, this.next), t, { seed: 71 });
  }
  paint(g, t) {
    // mặt màu → chân dung ký hiệu (k của pha "in" chạy lùi 1 → 0.599), trượt về chỗ của P01
    const e = smooth(prog(t, this.t0, this.t0 + 0.7)), k = lerp(1, 0.599, e);
    const [x, y, h] = FACE.map((v, i) => lerp(v, PORTRAIT[i], e));
    drawTransit(g, this.m, 'face', x, y, h, 'rows', 'in', k, { t, cell: 7, seed: 1 });
    scanlines(g, smooth(prog(t, this.t0 + 0.3, this.t0 + 0.8)));
    decodeLine(g, this.tl.wordsOf(this.l99), t, 140, 640, { font: F, colBase: PAL.truth, colKey: PAL.fwd, keys: ['ninety', 'nine'] });
    const fill = 0.99 * prog(t, this.l99.start, this.l99.end);
    loadBar(g, fill, { open: smooth(prog(t, this.l99.start, this.l99.start + 0.25)) });
    g.save(); g.font = F; g.fillStyle = PAL.truth; g.fillText(`${Math.floor(fill * 100)}%`, BAR.x + BAR.w + 24, BAR.y + 24); g.restore();
    const on = t >= this.lLoad.start;
    if (on) decodeLine(g, this.tl.wordsOf(this.lLoad), t, 140, 790, { font: F, colBase: PAL.truth, colKey: PAL.fwd, keys: ['loading'], alpha: beat.onBeat(t, 0.3) > 0.2 ? 1 : 0.35 });
    caret(g, on ? 310 : 140, on ? 790 : 860, beat.onBeat(t, 0.3) > 0.15);
  }
}
```
- [ ] **Step 3: `plates/p27-outro.js`**
```js
// P27 outro — "Khải hoàn, rồi 99.999…" · 221.22 → 239.65 ✂ 227.3 ✂ 238.6 (TREATMENT P27)
// Không phải đoạn lặng: đủ band + kèn đồng. 221.49 FX loé — MÀN CHÀO: mọi vật của bài diễu hành dọc gương theo
// beat (to hơn, nhanh hơn P23), nhân vật toàn thân nhảy giữa khung, tên kênh "99% from scratch".
// 227.3 nhạc ngắt → khung ĐÔNG CỨNG (cắt cứng thứ 7): màn tối, đường quét CRT; nhân vật cầm tách trà bước ra trước
// khung đông — người duy nhất còn sống. 229.48 lead vọng "loading": thanh loading hiện lại, con trỏ nhấp một lần.
// 230.02 band vào lại: 99.9 → 99.99 → 99.999… chữ số 9 mọc mãi, xuống dòng (vọng P03: số vô tỉ không bao giờ
// đủ); kèn gỗ dâng từ 234 → mọc nhanh dần. 236.4 trống, bass tắt: mọi thứ đứng im, chỉ chữ số còn mọc.
// 238.6 hợp âm cắt — hard stop: CRT tắt (ép dẹt → vạch → chấm → đen), ngay trước khi thanh chạm 100%.
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { drawMirrorLine } from '../../../../engine/mirror.js';
import { fillWord } from '../../../../engine/fill.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure } from '../kit.js';
import { backdrop } from '../backdrop.js';
import { parade, EQUATIONS } from '../finale.js';
import { scanlines, loadBar, caret, nines, crtOff, BAR } from '../loading.js';

// data/stems.json (TREATMENT § Bản đồ năng lượng, § Mốc nhạc cụ)
export const FX_A = 221.49, STOP = 227.3, ECHO = 229.48, FX_B = 230.02, WOOD = 234.0, HOLD = 236.4, CUT = 238.6;
const F = '500 34px "IBM Plex Mono"';

export default class P27 {
  async init(s) { this.m = s.mascot; }
  bd() { return { glow: 1, horizon: 780, floor: 0.85, mirror: true, bokeh: 0.9 }; }
  backdropAt(t) {
    if (t >= STOP) return false;                       // đông cứng: cảnh tự vẽ nền ở mốc STOP
    const e = smooth(prog(t, this.t0, FX_A + 0.1));
    return { ...this.bd(), glow: lerp(0.6, 1, e), floor: 0.85 * e, bokeh: 0.9 * e };
  }
  camera(t) {
    const tf = Math.min(t, STOP), p = beat.beatPulse(tf, 0.16), punch = 1 - smooth(prog(tf, FX_A, FX_A + 0.5));
    return { s: 1.02 + 0.025 * p + 0.1 * punch * (tf >= FX_A ? 1 : 0), r: 0.02 * Math.sin((tf - this.t0) * 0.6), bg: 0 };
  }
  /** "Hard stop" ép dẹt cả khung; vẽ cả nền ở đây nên CRT tắt nuốt trọn màn hình. */
  render(g, t) {
    if (t >= CUT) return crtOff(g, (c) => this.paint(c, t), prog(t, CUT, CUT + 0.32));
    this.paint(g, t);
  }
  paint(g, t) {
    const tf = Math.min(t, STOP);
    if (t >= STOP) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = PAL.bg; g.fillRect(0, 0, 1920, 1080); g.restore();
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); backdrop(g, STOP, { beat, ...this.bd() }); g.restore(); }
    this.parade(g, tf);
    if (t >= STOP) {                                     // đông cứng: màn tối + quét CRT
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(11,15,30,0.66)'; g.fillRect(0, 0, 1920, 1080); g.restore();
      scanlines(g, 1);
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
      figure(g, this.m, 'tea', 1640, 1230, 900, 'burn', presence(t, STOP + 0.12, 1e9, { inDur: 0.35 }), { t, seed: 75 });
      this.loading(g, t);
      g.restore();
    }
  }
  /** Màn chào: đoàn diễu hành lớn, gương sáng, nhân vật nhảy, tên kênh. */
  parade(g, t) {
    const k = prog(t, this.t0, FX_A + 0.6);
    drawMirrorLine(g, MIRROR, smooth(prog(t, this.t0, FX_A)), { width: 6, glow: 30 });
    parade(g, t, { k, d: 300, speed: 0.05, scale: 1.3, pulse: beat.beatPulse(t, 0.16) });
    figure(g, this.m, 'jump', 960, 1090, 720, 'burn', presence(t, this.t0 + 0.05, 1e9, { inDur: 0.3 }), { t, seed: 76 });
    if (t >= FX_A) {                                      // tên kênh: con dấu ruột lấp đẳng thức
      const s = 1 + 0.5 * (1 - outBack(clamp((t - FX_A) / 0.2)));
      g.save(); g.translate(380, 120); g.scale(s, s);           // góc trên-trái: ngoài dải diễu hành dọc gương
      g.textAlign = 'left'; g.font = '900 120px "Archivo"';
      const w = g.measureText('99%').width;
      fillWord(g, '99%', -w - 16, 0, { font: '900 120px "Archivo"', color: PAL.fwd, innerColor: PAL.fwdCore, inner: EQUATIONS, drift: t * 60 });
      g.font = 'italic 600 78px "Cormorant Garamond"'; g.fillStyle = PAL.truth; g.textBaseline = 'middle'; g.fillText('from scratch', 8, 4);
      g.restore();
    }
  }
  /** Sau khung đông: "loading" vọng (229.48) → thanh 99%; band vào lại (230.02) → 99.9…9 mọc mãi. */
  loading(g, t) {
    if (t < ECHO) return;
    const open = smooth(prog(t, ECHO, ECHO + 0.25));
    decodeLine(g, [{ w: 'LOADING', start: ECHO, end: ECHO + 0.4 }], t, 140, 640, { font: F, colBase: PAL.truth, colKey: PAL.fwd });
    const n = t < FX_B ? 0 : Math.floor((Math.min(t, CUT) - FX_B) * 2.2 + Math.max(0, Math.min(t, CUT) - WOOD) ** 2 * 9);
    loadBar(g, 0.99 + 0.01 * (1 - 0.6 ** n), { open });
    const end = nines(g, n, BAR.x + BAR.w + 24, BAR.y + 24, { right: 1180 });   // không tràn vào nhân vật cầm trà
    caret(g, end.x + 6, end.y - 10, t < FX_B ? (t - ECHO) % 0.6 < 0.3 : true);   // nhấp một lần, rồi đứng sáng sau chữ số
  }
}
```
- [ ] **Step 4: Nối** P26 ở `'Ninety-nine percent...', 2`. P27 ở `tl.line('Loading.', 2).end + 0.12` (sửa tay).

- [ ] **Step: Chụp và NHÌN**

Run: `<scratchpad>/shoot.sh 219.3,219.8,220.5,221.0,221.4,222.5,225.0,227.2,227.6,229.6,231.0,234.5,236.8,238.5,238.7,238.85,239.3 out/check/p267`
Kỳ vọng theo từng mốc:
- 219.3–220.5: mặt tan ngược thành chân dung ký hiệu ở chỗ của P01; thanh tới 99%; LOADING.
- 221.0: vỡ.
- 221.4–227.2: màn chào. Có đoàn huy hiệu to, nhân vật nhảy; "99% from scratch" ở góc trên-trái, không bị huy hiệu đè.
- 227.6: khung đông, màn tối, nhân vật cầm trà đang vào.
- 229.6: LOADING, thanh 99%, con trỏ.
- 231.0 → 234.5 → 236.8: 99.99…, chữ số dài dần rồi xuống dòng, không tràn qua x = 1180.
- 238.5: vẫn đông.
- 238.7: một vạch dẹt.
- 238.85: một chấm.
- 239.3: đen.
- [ ] **Step: Test + commit**

Run: `node --test tools/test/*.test.mjs` → PASS (tất cả).
```bash
git add projects/mv/exp-log/loading.js projects/mv/exp-log/plates/p26-loading.js projects/mv/exp-log/plates/p27-outro.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P26 back to the 99% portrait, P27 victory parade, freeze with tea, 99.999… forever, CRT off"
```

---

### Task 7: Kiểm chỗ nối, tất định, render + ghép trọn bài, tài liệu

- [ ] **Step 1: Chỗ nối** (Review Focus 1). Chụp từng cặp khung (`round(B·60−1)/60`, `round(B·60)/60`) với B lần lượt là:
  155.70 · 168.58 · 186.88 · 196.86 · 211.48 · 219.09 · 221.22

  Nhìn từng cặp. Kỳ vọng:
  - Không vật hay chữ nào có ở khung trước mà mất hẳn ở khung sau (trừ loé 168.58).
  - PSNR ≈ 27.2 / 7.3 / 21.3 / 20.8 / 30.6 / 42.8 / 58.0 dB.
- [ ] **Step 2: Tất định**. Chụp 18 mốc theo thứ tự xuôi và theo thứ tự ngược:
  158.6, 165.8, 170.4, 176.6, 180.6, 189.8, 191.0, 199.6, 202.6, 207.6, 209.6, 213.5, 218.4, 219.8, 222.5, 231.0, 236.8, 238.7

  Chạy `same.sh` → `SAME (18 ảnh)`.
- [ ] **Step 3: Phần cũ không đổi**. `out/exp-log-0-155.mp4` render ở commit `d9105cb`. Chạy `git diff d9105cb -- projects/mv/exp-log/plates/p0* projects/mv/exp-log/plates/p1* projects/mv/exp-log/plates/p20-fold.js engine/ projects/mv/exp-log/kit.js projects/mv/exp-log/backdrop.js`. Chỉ được thấy dòng `POSES_V2_MID` trong `engine/mascot.js`. Thêm pose vào danh sách nạp không đổi pixel cảnh cũ: chụp 35.5, 100.2, 140.5 và so md5 với ảnh chụp ở `d9105cb` (`git stash`/worktree).
- [ ] **Step 4: Render + ghép**
```bash
node engine/render/shoot.js video --page projects/mv/exp-log/index.html --dur 239.65 --from 155.70 --to 239.65 \
  --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-part5.mp4
node tools/stitch.mjs --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-full.mp4 \
  out/exp-log-0-155.mp4@0:0:155.70  out/exp-log-part5.mp4@155.70:155.70:239.65
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames:format=duration -of compact out/exp-log-full.mp4
```
Expected: `nb_read_frames=14379` (= round(239.65·60)), duration ≈ 239.65.
- [ ] **Step 5: Đo + tờ 6fps 155.7 → 239.65** (`node tools/review.mjs out/exp-log-full.mp4`; `ffmpeg -ss 155.7 -i out/exp-log-full.mp4 -vf fps=6,scale=192:-1,tile=20x26 -frames:v 1 out/check/155-239-6fps.jpg`). Nhìn cả tờ.
- [ ] **Step 6: Tài liệu**. Trong `projects/mv/exp-log/TREATMENT.md`:
  - Bảng pose (§ Nhân vật) thêm các dòng sau:
```md
| notebook · pointer · offer · invite (khung trung) | đoạn giấy P18–P20 |
| down · halt · chalk · invite | rap cuối P22: chỉ xuống · chặn nhánh ma · bảng phấn · "Follow" |
| halt · sky | P23b: "No tricks" · "No rules falling from the sky" |
| ponder | "Why does it work?" — trước khung đông |
| tea | đông cứng 227.3, chờ 99.999… |
```
  - Mỗi mục P21–P27 thêm một đoạn *(Thực hiện, Kế hoạch 5: …)*, chép từ bản nháp:
    - P21: *(Thực hiện, Kế hoạch 5: gương ĐỨNG giữa khung (phép phản xạ ngang, không phải y = x) để hai mặt nhìn nhau. Mặt thật: 2³ = ? vàng; ảnh nhuộm xanh: 2^? = 8 viết gương. "Meet them at the mirror": hai mặt áp vào gương, mỗi bên chỉ còn nửa phía mình; "and they become": hai trục mũi trùng nhau → một gương mặt đối xứng ghép từ nửa trái (`duet.js`); "the same": loé, gương tan thành ký hiệu, 2³ = 8 ở giữa. Cảnh vỡ thành ký hiệu ở 0.35s cuối.)*
    - P22: *(Thực hiện, Kế hoạch 5: lưới neon của hệ G (trang sổ P19 trên nền tối). Camera ngồi trên đường mũ như tàu lượn, nghiêng theo tiếp tuyến. Laser dừng ở v = 4 → ba con dấu ở v = 4, (2, 4), u = 2. Nhánh ma đỏ rời đường cong ở u = 2.2, vồng lên rồi quay đầu cắt lại v = 4 — gạch chéo, rút về. Thầy cầm phấn viết aˣ = y → exactly one x → x = logₐ y; sách giáo khoa (DEFINITION / Memorize.) đóng sập ở "declared", vỡ thành ký hiệu. Ba "Follow": ba cú đẩy camera + sao chổi nhanh dần + chữ CURVE / LAW / REASON. Hai khung mũ | log trượt vào nhập làm một đồ thị có gương — khung mở P23. Tư thế: down → halt → chalk → invite.)*
    - P23: *(Thực hiện, Kế hoạch 5 — tách hai cảnh P23 (186.88 → 196.86) và P23b (196.86 → 208.60). Đoàn diễu hành (`finale.js parade`): khối 2³, mặt trời aᵐ⁺ⁿ, động cơ ×→+, chồng xu ×1.07, con dấu LOGARITHM, tờ giấy gập — trôi dọc gương phía vàng, ảnh nhuộm xanh ở phía kia. "Fold the graph": nửa vàng gập qua gương (phép phản xạ thật) rồi nổ ở "match", tụ lại khi "Exponential" vào, nhân vật nhảy. "one connection": dây nối vuông góc gương giữa (u, 2^u) và (2^u, u). P23b: thẻ TRICK / GUESS? bị gạch (halt); thẻ công thức rơi, chạm gương bật ngang sang trái (sky) — vận tốc (0, v) phản xạ qua x + y = c thành (−v, 0); mặt cận trở lại với mặt trời làm bằng mọi đẳng thức của bài sau đầu, bừng tràn khung ở "alive"; hai thẻ lật vàng ⇄ xanh. "Why does it work?": thế giới và nền đông ở mốc câu hỏi, màn tối, câu hỏi trắng không hiệu ứng, nhân vật trầm tư bước ra trước khung đông.)*
    - P24: *(Thực hiện, Kế hoạch 5: con dấu 150 → 300 → 600 px, ruột lấp mọi đẳng thức của bài (`EQUATIONS`), loé + rung ở mỗi cú cắt; từ con dấu thứ hai có bản gương xanh qua y = x. Không có lời chân khung — con dấu chính là lời.)*
    - P25: *(Thực hiện, Kế hoạch 5: hai cung cùng xuất phát ở 9 giờ — vàng theo chiều kim qua đỉnh (FORWARD · EXPONENTIAL), xanh ngược chiều qua đáy (BACKWARD · LOGARITHM); "Two directions": hai chấm chạy hai chiều; "One story": hai mũi tên gặp ở 3 giờ, vòng khép loé trắng. Không dùng pose-wave: mặt cận giữ tới hết để P26 tan ngược đúng mặt này.)*
    - P26: *(Thực hiện, Kế hoạch 5: mặt cận chạy lùi pha "in" (ảnh → cháy trắng → ký hiệu) và trượt về đúng chỗ chân dung P01 (1240, 900, 760); đường quét CRT, thanh loading, LOADING nhấp — vẽ bằng `loading.js` (P01 giữ bản riêng, không đổi pixel).)*
    - P27: *(Thực hiện, Kế hoạch 5: màn chào — đoàn diễu hành to và nhanh gấp ba, tên kênh "99% from scratch" ở góc trên-trái (ngoài dải diễu hành). 227.3: thế giới + nền đông, màn tối + quét CRT, nhân vật cầm tách trà bước ra. Chữ số 9 mọc 2.2/s, từ 234 thêm (t − 234)²·9, xuống dòng trước nhân vật. 238.6: CRT ép dẹt → vạch → chấm → đen trong 0.32s.)*
```bash
git add projects/mv/exp-log/TREATMENT.md
git commit -m "docs(exp-log): treatment notes for P21–P27 as built"
```
