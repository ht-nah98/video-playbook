# exp-log — Kế hoạch 1: nền móng engine + lát cắt 0–35.68s

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây 6 năng lực engine mà MV "Ninety-nine percent" cần, rồi dựng hoàn chỉnh 35.68 giây đầu (P01–P08) để người dùng duyệt chất lượng trước khi làm 19 cảnh còn lại.

**Architecture:** Engine canvas-2D sẵn có (`engine/`), mỗi khung là hàm thuần của `t`, render bằng Chrome headless (`engine/render/shoot.js`). Phần LOGIC của mỗi năng lực (tra lời, xáo ký tự, lịch chuyển chất liệu, khẩu hình, toán phản chiếu, xếp chữ lấp ruột) viết thành hàm thuần, test bằng `node --test`. Phần VẼ gọi các hàm thuần đó và được kiểm bằng **nhìn ảnh chụp** từ trang lab. Dữ liệu bài hát đọc từ `projects/mv/exp-log/data/timeline.json` và `music.json` — không gõ mốc tay.

**Tech Stack:** JavaScript ES modules (không build step), Canvas 2D, Node 22 (`node --test`, `node:assert`), Chrome headless qua CDP, ffmpeg.

**Spec:** `projects/mv/exp-log/TREATMENT.md` (đã duyệt 2026-09-30). Đọc kèm `docs/character/CHARACTER-V2.md`, `docs/mv/REFERENCE-TEARDOWN.md` §2–3, `docs/LESSONS.md`.

**Kế hoạch 2** (viết sau khi người dùng duyệt lát cắt): gấp giấy 3D, bút vẽ trên giấy, P09–P27, render toàn bài.

## Global Constraints

- Khung 1920×1080, 60fps (`engine/lib.js` `W`, `H`).
- Mọi hàm vẽ và hàm thuần là **hàm thuần của `t`**: CẤM `Math.random`, `Date.now`, `performance.now` trong engine và plate. Ngẫu nhiên dùng `hash(n)` của `engine/lib.js`.
- Mốc thời gian lấy từ `timeline.json` qua `engine/timeline.js`; chỉ các mốc nhạc cụ không có trong lời (12.52 drop, nốt keyboard) được khai báo một lần trong `projects/mv/exp-log/song.js` kèm nguồn (`data/stems.json`).
- Bảng màu bài này (TREATMENT § Bảng màu): nền `#0B0F1E`, quầng `#16203A`, xuôi `#FFB547` / lõi `#FFE3A3`, ngược `#3FB8FF` / lõi `#BDE8FF`, gương `#F4F1EA`, cản trở `#FF4D5E`. Chỉ vàng và xanh được bloom.
- Chữ **không fade**: hiện bằng decode, mất bằng vỡ thành ký hiệu toán.
- Nhân vật **không cắt cứng vào/ra**; khi đứng alpha = 1.
- Cảnh KHÔNG tô nền toàn khung (`fillRect(0,0,W,H)`); cần nền riêng thì `backdrop = false`.
- Nạp đủ MỌI họ + cỡ font bằng `Promise.all` trước `show.init()` (`LESSONS.md`, memory font-race).
- Trang render phải tắt vòng rAF khi headless.
- Ảnh nhân vật: `assets/character-v2/cut/` (pose-*.png, viseme-1.png, mouth-1…9.png, cut.json).

## Review Focus

1. **Dòng lời lặp lại** ("Run it forward" ×3, "different track" ×3, "From scratch!" ×3): tra theo chữ phải chỉ định lần thứ mấy; tra sai/thiếu phải **ném lỗi có tên dòng**, không trả `null` rồi cảnh trống im lặng (`LESSONS.md` §7). → test ở Task 2.
2. **Gọi `t` không theo thứ tự** (motion blur, render song song): xáo ký tự và lịch chuyển chất liệu phải cho cùng kết quả bất kể thứ tự gọi. → test ở Task 3, Task 6.
3. **Từ không có nguyên âm hoặc có ký tự lạ** (`"x"`, `"y"`, `"99"`, `"—"`, từ rỗng) trong bộ khẩu hình: không được crash hay trả khẩu hình ngoài 1–9. → test ở Task 7.
4. **Đường gương suy biến** (hai điểm trùng nhau) và điểm nằm đúng trên gương: không NaN. → test ở Task 8.
5. **Tóc tối trên nền navy**: nhân vật phải tách khỏi nền — đo chênh sáng giữa vùng tóc và nền ngay cạnh ≥ 25 (thang 0–255) trên ảnh chụp. → kiểm ở Task 11.

---

## File Structure

| file | trách nhiệm |
|---|---|
| `engine/timeline.js` (mới) | tra dòng/từ/section theo thời gian hoặc theo chữ — thuần |
| `engine/glyphs.js` (mới) | bộ ký hiệu toán; xáo-rồi-chốt (decode) và vỡ (burst) — thuần |
| `engine/lyric.js` (sửa) | thêm `decodeLine()` vẽ một dòng lời bằng decode/burst |
| `engine/transit.js` (mới) | lịch chuyển chất liệu (thuần) + vẽ nhân vật đang vào/ra bằng ký hiệu |
| `engine/visemes.js` (mới) | chữ → khẩu hình theo thời gian — thuần |
| `engine/face.js` (mới) | vẽ mặt cận: viseme-1 + mảng miệng |
| `engine/mirror.js` (mới) | toán phản chiếu qua đường thẳng (thuần) + vẽ đường gương, vẽ bản phản chiếu nhuộm màu |
| `engine/fill.js` (mới) | chữ khổng lồ lấp ruột bằng chữ nhỏ |
| `engine/mascot.js` (sửa) | nạp danh sách pose tuỳ chọn; mosaic tô màu theo ảnh |
| `engine/mosaic.js` (sửa) | `drawMosaic` thêm `colorMode: 'image'` |
| `engine/main.js` (sửa) | `Show` nhận `poses`, `bg`, `backdrop` từ project |
| `tools/test/*.test.mjs` (mới) | test `node --test` cho các module thuần |
| `tools/lab/*.html` (mới) | trang thử từng năng lực — chụp ảnh để NHÌN |
| `projects/mv/exp-log/song.js` (mới) | nạp timeline/music, beat, bảng màu, mốc nhạc cụ, đường gương |
| `projects/mv/exp-log/backdrop.js` (mới) | nền riêng bài này (navy + quầng thở theo beat) |
| `projects/mv/exp-log/index.html` (mới) | trang render |
| `projects/mv/exp-log/kit.js` (mới, Task 12b) | đồ nghề chung từ P05: luỹ thừa vẽ tay, trục số mũ, nhân vật vào/ra, lời chân khung |
| `projects/mv/exp-log/plates/p01-boot.js` … `p08-extend.js` (mới) | 8 cảnh đầu |

---

### Task 1: Đưa mascot-mv vào git

Repo hiện KHÔNG phải git repo (đã phải sao lưu tay ở `docs/.backup-2026-09-30/`). Mọi task sau cần commit.

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Tạo `.gitignore`**

```gitignore
out/
projects/*/audio/stems/
tools/cutout/.venv/
node_modules/
*.log
```

- [ ] **Step 2: Khởi tạo và commit trạng thái hiện có**

```bash
cd <repo>
git init -b main
git add -A
git commit -m "chore: import mascot-mv as it stands on 2026-09-30"
```

- [ ] **Step 3: Kiểm**

Run: `git status --short | wc -l && du -sh .git`
Expected: `0`, và `.git` dưới ~150MB (stem 552MB phải bị bỏ qua — nếu `.git` > 400MB là `.gitignore` sai, `git rm -r --cached projects/mv/exp-log/audio/stems` rồi commit lại).

---

### Task 2: `engine/timeline.js` — tra lời theo thời gian và theo chữ

**Files:**
- Create: `engine/timeline.js`
- Test: `tools/test/timeline.test.mjs`

**Interfaces:**
- Produces:
  - `makeTimeline(json) → TL` với `json = {sections:[{name,start,end}], lines:[{section,text,start,end,words:[{w,start,end}]}]}`
  - `TL.lines`, `TL.sections`
  - `TL.line(text, nth = 1) → line` — so khớp `text` sau khi bỏ dấu câu, không phân biệt hoa thường; **ném `Error`** nếu không có
  - `TL.lineAt(t) → line | null` — dòng có `start ≤ t < next.start` và `t < end + 0.6`
  - `TL.sectionAt(t) → section | null`
  - `TL.wordsOf(line) → [{w,start,end}]` (bản sao)
  - `TL.at(text, nth = 1) → number` — `line(text, nth).start`

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/timeline.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTimeline } from '../../../engine/timeline.js';

const J = {
  sections: [{ name: 'Chorus', start: 10, end: 14 }, { name: 'Verse', start: 14, end: 20 }],
  lines: [
    { section: 'Chorus', text: 'Run it forward,', start: 10, end: 11, words: [{ w: 'run', start: 10, end: 10.3 }] },
    { section: 'Chorus', text: 'run it back.', start: 11.2, end: 12, words: [{ w: 'run', start: 11.2, end: 11.4 }] },
    { section: 'Verse', text: 'Run it forward,', start: 15, end: 16, words: [{ w: 'run', start: 15, end: 15.3 }] },
  ],
};

test('line() tra theo chữ, bỏ dấu câu và hoa thường', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.line('run it forward').start, 10);
  assert.equal(tl.line('RUN IT BACK').start, 11.2);
});

test('line() chọn lần thứ nth của dòng lặp lại', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.line('Run it forward,', 2).start, 15);
});

test('line() ném lỗi có tên dòng khi không có', () => {
  const tl = makeTimeline(J);
  assert.throws(() => tl.line('Run it forward,', 3), /Run it forward.*lần 3/);
  assert.throws(() => tl.line('không có dòng này'), /không có dòng này/);
});

test('lineAt() biên trái đóng, biên phải mở, hết hạn sau end + 0.6', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.lineAt(9.99), null);
  assert.equal(tl.lineAt(10).text, 'Run it forward,');
  assert.equal(tl.lineAt(11.2).text, 'run it back.');
  assert.equal(tl.lineAt(12.5).text, 'run it back.');
  assert.equal(tl.lineAt(12.7), null);
});

test('sectionAt() và at()', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.sectionAt(14).name, 'Verse');
  assert.equal(tl.at('run it back'), 11.2);
});

test('wordsOf() trả bản sao — sửa không làm hỏng dữ liệu gốc', () => {
  const tl = makeTimeline(J);
  const ws = tl.wordsOf(tl.line('run it back'));
  ws[0].start = 999;
  assert.equal(tl.line('run it back').words[0].start, 11.2);
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `cd <repo> && node --test tools/test/timeline.test.mjs`
Expected: FAIL — `Cannot find module '.../engine/timeline.js'`

- [ ] **Step 3: Viết code**

```js
// engine/timeline.js
// Tra lời hát theo thời gian và theo CHỮ — không bao giờ gõ mốc tay trong cảnh.
// Dữ liệu: projects/<tên>/data/timeline.json (lời gốc ghép vào mốc forced alignment).
// Tra sai phải ném lỗi có tên dòng: cảnh trống im lặng là lỗi đắt nhất đã gặp
// (docs/LESSONS.md §7).

const key = s => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

export function makeTimeline(json) {
  const lines = json.lines.map(l => ({ ...l, words: l.words.map(w => ({ ...w })) }));
  const sections = json.sections.map(s => ({ ...s }));
  return {
    lines, sections,
    line(text, nth = 1) {
      const k = key(text);
      let n = 0;
      for (const l of lines) if (key(l.text) === k && ++n === nth) return l;
      throw new Error(`timeline: không có dòng "${text}" lần ${nth} (tìm thấy ${n} lần)`);
    },
    at(text, nth = 1) { return this.line(text, nth).start; },
    lineAt(t) {
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        if (t >= l.start) return t < l.end + 0.6 ? l : null;
      }
      return null;
    },
    sectionAt(t) {
      for (const s of sections) if (t >= s.start && t < s.end) return s;
      return null;
    },
    wordsOf(line) { return line.words.map(w => ({ ...w })); },
  };
}

/** Nạp trong trình duyệt. */
export async function loadTimeline(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`timeline: không tải được ${url} (${r.status})`);
  return makeTimeline(await r.json());
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/timeline.test.mjs`
Expected: PASS 6/6

- [ ] **Step 5: Kiểm trên dữ liệu thật**

Run:
```bash
node -e "
import('./engine/timeline.js').then(({makeTimeline})=>{
  const tl=makeTimeline(JSON.parse(require('fs').readFileSync('projects/mv/exp-log/data/timeline.json')));
  console.log(tl.at('Run it forward,',1), tl.at('Run it forward,',3), tl.at('From scratch!',3), tl.at('Wait.'));
})"
```
Expected: `46.52 186.876 210.58 9.68`

- [ ] **Step 6: Commit**

```bash
git add engine/timeline.js tools/test/timeline.test.mjs
git commit -m "feat(engine): timeline lookup by time and by lyric text"
```

---

### Task 3: `engine/glyphs.js` — xáo-rồi-chốt và vỡ thành ký hiệu

**Files:**
- Create: `engine/glyphs.js`
- Test: `tools/test/glyphs.test.mjs`

**Interfaces:**
- Consumes: `hash(n)` từ `engine/lib.js`
- Produces:
  - `GLYPHS: string[]` — ký hiệu toán dùng khi xáo/vỡ
  - `decodeChars(text, t, t0, t1, { scramble = 0.09, seed = 0 }) → [{ ch, state }]` — ký tự thứ i chốt tại `t0 + (i+1)/n·(t1−t0)`; trong `scramble` giây trước đó hiện ký hiệu ngẫu nhiên đổi 30 lần/giây; trước đó `state='hidden'`. Khoảng trắng luôn là khoảng trắng, `state='set'` khi tới lượt.
  - `burstChars(text, t, tb, { dur = 0.5, seed = 0 }) → [{ ch, alpha, dx, dy }]` — từ `tb`: 2 khung đầu (≤ 1/30s) ký tự đổi thành ký hiệu, sau đó bay ra (`dx,dy` đơn vị = cỡ chữ) và `alpha` giảm về 0 lúc `tb + dur`. Trước `tb`: ký tự gốc, alpha 1, dx=dy=0.

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/glyphs.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLYPHS, decodeChars, burstChars } from '../../../engine/glyphs.js';

const str = a => a.map(c => c.ch).join('');

test('decode: trước t0 mọi ký tự ẩn', () => {
  assert.ok(decodeChars('two', 0.99, 1, 2).every(c => c.state === 'hidden'));
});

test('decode: sau t1 chữ đã chốt nguyên vẹn', () => {
  const a = decodeChars('Run it', 5, 1, 2);
  assert.equal(str(a), 'Run it');
  assert.ok(a.every(c => c.state === 'set'));
});

test('decode: đang xáo thì là ký hiệu toán, không phải chữ gốc', () => {
  // 'ab' từ 1→2: 'b' chốt ở 2.0, xáo trong [1.91, 2.0)
  const a = decodeChars('ab', 1.95, 1, 2);
  assert.equal(a[1].state, 'scramble');
  assert.ok(GLYPHS.includes(a[1].ch));
});

test('decode: khoảng trắng giữ nguyên', () => {
  assert.equal(decodeChars('a b', 5, 1, 2)[1].ch, ' ');
});

test('decode: thuần — cùng đầu vào, cùng đầu ra, bất kể thứ tự gọi', () => {
  const ts = [1.93, 1.2, 1.97, 1.5];
  const first = ts.map(t => str(decodeChars('forward', t, 1, 2, { seed: 7 })));
  const again = [...ts].reverse().map(t => str(decodeChars('forward', t, 1, 2, { seed: 7 }))).reverse();
  assert.deepEqual(first, again);
});

test('burst: trước tb là chữ gốc, sau tb+dur alpha = 0', () => {
  assert.equal(str(burstChars('back', 0.9, 1)), 'back');
  assert.ok(burstChars('back', 1.6, 1, { dur: 0.5 }).every(c => c.alpha === 0));
});

test('burst: ngay sau tb ký tự đã thành ký hiệu', () => {
  const a = burstChars('back', 1.01, 1);
  assert.ok(a.every(c => GLYPHS.includes(c.ch)));
});

test('burst: thuần', () => {
  assert.deepEqual(burstChars('xy', 1.2, 1, { seed: 3 }), burstChars('xy', 1.2, 1, { seed: 3 }));
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `node --test tools/test/glyphs.test.mjs`
Expected: FAIL — module không tồn tại

- [ ] **Step 3: Viết code**

```js
// engine/glyphs.js
// Chữ trong video mẫu không fade: nó DECODE (ký hiệu nhảy rồi chốt) và VỠ thành
// ký hiệu khi hết lượt. docs/mv/REFERENCE-TEARDOWN.md §3.1. Ở kênh toán, "ký tự
// ngẫu nhiên" là ký hiệu toán. Mọi hàm ở đây thuần theo t (dùng hash, không random).
import { hash, clamp } from './lib.js';

export const GLYPHS = ['0','1','2','3','4','5','6','7','8','9','+','−','×','÷','=','√','Σ','∫','π','θ','∞','^','<','>'];

const pick = (seed, i, slot) => GLYPHS[Math.floor(hash(seed * 997 + i * 131 + slot * 17.3) * GLYPHS.length) % GLYPHS.length];
const slot30 = t => Math.floor(t * 30);

export function decodeChars(text, t, t0, t1, { scramble = 0.09, seed = 0 } = {}) {
  const n = text.length, out = [];
  for (let i = 0; i < n; i++) {
    const ch = text[i];
    const settle = t0 + ((i + 1) / n) * (t1 - t0);
    if (t >= settle) { out.push({ ch, state: 'set' }); continue; }
    if (t >= settle - scramble && t >= t0) {
      out.push({ ch: ch === ' ' ? ' ' : pick(seed, i, slot30(t)), state: 'scramble' });
      continue;
    }
    out.push({ ch, state: 'hidden' });
  }
  return out;
}

export function burstChars(text, t, tb, { dur = 0.5, seed = 0 } = {}) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (t < tb) { out.push({ ch, alpha: 1, dx: 0, dy: 0 }); continue; }
    const k = clamp((t - tb) / dur);
    const a = hash(seed * 31 + i * 7.7) * Math.PI * 2;
    const sp = 0.6 + hash(seed * 13 + i * 3.1) * 1.6;
    const fly = Math.max(0, (t - tb) - 1 / 30) / dur;       // 2 khung đầu: đứng yên, đổi ký tự
    out.push({
      ch: ch === ' ' ? ' ' : pick(seed + 101, i, slot30(t)),
      alpha: k >= 1 ? 0 : 1 - k * k,
      dx: Math.cos(a) * sp * fly * 2.2,
      dy: Math.sin(a) * sp * fly * 2.2 + fly * fly * 1.4,     // rơi nhẹ
    });
  }
  return out;
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/glyphs.test.mjs`
Expected: PASS 8/8

- [ ] **Step 5: Commit**

```bash
git add engine/glyphs.js tools/test/glyphs.test.mjs
git commit -m "feat(engine): deterministic decode/burst glyph text"
```

---

### Task 4: `decodeLine()` — vẽ một dòng lời bằng decode/burst + lab

**Files:**
- Modify: `engine/lyric.js` (thêm hàm cuối file)
- Create: `tools/lab/lyric.html`

**Interfaces:**
- Consumes: `decodeChars`, `burstChars` (Task 3)
- Produces: `decodeLine(g, words, t, x, y, { font, gap = 14, colBase, colKey, keys = [], burstAt = null, burstDur = 0.5, align = 'left', alpha = 1, mirror = false }) → { width }`
  - `words`: `[{w, start, end}]`; từ có `w` thuộc `keys` (so chữ thường) tô `colKey`.
  - `burstAt`: thời điểm cả dòng vỡ; `null` = không vỡ.
  - `mirror: true` → vẽ chữ lật ngang quanh tâm dòng (dùng cho "bè vọng").

- [ ] **Step 1: Thêm hàm vào `engine/lyric.js`**

```js
// --- thêm vào cuối engine/lyric.js ---
import { decodeChars, burstChars } from './glyphs.js';

/**
 * Một dòng lời theo luật video mẫu: mỗi từ DECODE trong khoảng hát của nó,
 * cả dòng VỠ thành ký hiệu toán tại burstAt. Không fade.
 */
export function decodeLine(g, words, t, x, y, {
  font = '800 64px "Archivo"', gap = 14, colBase = '#F4F1EA', colKey = '#FFB547',
  keys = [], burstAt = null, burstDur = 0.5, align = 'left', alpha = 1, mirror = false,
} = {}) {
  const K = new Set(keys.map(s => s.toLowerCase()));
  g.save();
  g.font = font; g.textBaseline = 'middle'; g.textAlign = 'left';
  const widths = words.map(w => g.measureText(w.w).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, words.length - 1);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  if (mirror) { g.translate(cx + total / 2, 0); g.scale(-1, 1); g.translate(-(cx + total / 2), 0); }
  const size = parseFloat(font.match(/(\d+(?:\.\d+)?)px/)[1]);
  words.forEach((wd, wi) => {
    const col = K.has(wd.w.toLowerCase()) ? colKey : colBase;
    const dec = decodeChars(wd.w, t, wd.start, Math.max(wd.end, wd.start + 0.05), { seed: wi + 1 });
    const bst = burstAt !== null && t >= burstAt ? burstChars(wd.w, t, burstAt, { dur: burstDur, seed: wi + 11 }) : null;
    let px = cx;
    for (let i = 0; i < wd.w.length; i++) {
      const d = dec[i];
      const cw = g.measureText(wd.w[i]).width;
      if (d.state !== 'hidden') {
        const b = bst ? bst[i] : null;
        g.globalAlpha = alpha * (b ? b.alpha : 1);
        g.fillStyle = d.state === 'scramble' || b ? colKey : col;
        g.fillText(b ? b.ch : d.ch, px + (b ? b.dx * size : 0), y + (b ? b.dy * size : 0));
      }
      px += cw;
    }
    cx += widths[wi] + gap;
  });
  g.restore();
  return { width: total };
}
```

- [ ] **Step 2: Tạo trang lab `tools/lab/lyric.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Lab — decodeLine</title>
<style>
  @font-face{font-family:"Archivo";src:url("../../../assets/fonts/Archivo[wdth,wght].ttf");font-weight:100 900;}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}
  canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// Chụp: node engine/render/shoot.js stills --page tools/lab/lyric.html \
//   --t 0.95,1.05,1.3,1.6,2.2,3.02,3.2,3.6 --outdir out/lab/lyric
import { decodeLine } from '../../../engine/lyric.js';
const g = document.getElementById('cv').getContext('2d');
const words = [
  { w: 'Run', start: 1.0, end: 1.3 }, { w: 'it', start: 1.3, end: 1.45 },
  { w: 'forward,', start: 1.45, end: 2.1 },
];
let ready = false;
(async () => { await document.fonts.load('800 64px "Archivo"'); await document.fonts.ready; ready = true; })();
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  decodeLine(g, words, t, 960, 420, { align: 'center', keys: ['forward,'], burstAt: 3.0 });
  decodeLine(g, words, t, 960, 660, { align: 'center', keys: ['forward,'], mirror: true, colBase: '#3FB8FF', colKey: '#BDE8FF' });
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 4 };
if (!/headless/i.test(navigator.userAgent)) (function loop(){ if (ready) frame((Date.now()/1000)%4); requestAnimationFrame(loop); })();
</script>
```

- [ ] **Step 3: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/lyric.html --dur 4 --t 0.95,1.05,1.3,1.6,2.2,3.02,3.2,3.6 --outdir out/lab/lyric`
Rồi mở từng ảnh bằng Read.
Expected:
- 0.95: trống.
- 1.05: chữ `R` đang là ký hiệu toán màu vàng (đang xáo).
- 1.6: `Run it` đã chốt màu trắng, `forward,` đang lộ dần.
- 2.2: cả dòng chốt; `forward,` vàng; dòng dưới là bản lật gương màu xanh (đọc ngược).
- 3.02: ký tự đã đổi thành ký hiệu nhưng còn nguyên chỗ.
- 3.2–3.6: ký hiệu bay tán, mờ dần; 3.6 gần như hết.

- [ ] **Step 4: Chạy lại toàn bộ test (không vỡ gì)**

Run: `node --test tools/test/*.test.mjs`
Expected: PASS toàn bộ

- [ ] **Step 5: Commit**

```bash
git add engine/lyric.js tools/lab/lyric.html
git commit -m "feat(engine): decodeLine — lyrics decode in, burst out, mirror echo"
```

---

### Task 5: Nạp mascot v2 và mosaic tô màu theo ảnh

**Files:**
- Modify: `engine/mascot.js:22-35` (danh sách pose), `engine/mascot.js:153-163` (`mosaic`)
- Modify: `engine/mosaic.js:68-120` (`drawMosaic`)
- Create: `tools/lab/mascot-v2.html`

**Interfaces:**
- Produces:
  - `export const POSES_V1 = ['wave','point','thumb','shrug','think','chalk']`
  - `export const POSES_V2 = ['wave','point','crossed','thumb','startled','slump','angry','jump']`
  - `Mascot.load(base, poses = POSES_V1)` — hành vi cũ giữ nguyên khi không truyền `poses`
  - `Mascot.mosaic(g, pose, x, y, hpx, { alpha, reveal, t, cell, colorMode = 'gold' })`
  - `drawMosaic(ctx, grid, x, y, w, h, { ..., colorMode = 'gold' })` — `'image'`: mỗi ký hiệu tô màu trung bình của ô trong ảnh gốc (`grid.col`), sáng lên ×1.15, không vẽ bóng đen sau lưng.

- [ ] **Step 1: Sửa danh sách pose trong `engine/mascot.js`**

Thay dòng `const POSES = ['wave','point','thumb','shrug','think','chalk'];` và hàm `load` bằng:

```js
export const POSES_V1 = ['wave','point','thumb','shrug','think','chalk'];
export const POSES_V2 = ['wave','point','crossed','thumb','startled','slump','angry','jump'];

export class Mascot {
  async load(base = '../../../assets/character/cut', poses = POSES_V1) {
    this.im = {};
    await Promise.all(poses.map(p => new Promise(res => {
      const im = new Image();
      im.onload = () => { this.im[p] = im; res(); };
      im.onerror = () => { console.warn(`mascot: thiếu ${base}/pose-${p}.png`); res(); };
      im.src = `${base}/pose-${p}.png`;
    })));
    this.buf = document.createElement('canvas');
    this.bufG = this.buf.getContext('2d');
    return this;
  }
```

- [ ] **Step 2: Thêm `colorMode` vào `Mascot.mosaic`**

```js
  mosaic(g, pose, x, y, hpx, { alpha = 1, reveal = 1, t = 0, cell = 9, colorMode = 'gold' } = {}) {
    const gr = this.grid(pose, cell, hpx);
    const im = this.im[pose];
    if (!gr || !im || alpha <= 0.004) return;
    const w = im.width * (hpx / im.height);
    drawMosaic(g, gr, x, y, w, hpx, { color: C.gold, color2: C.goldHot, alpha, reveal, t, colorMode });
  }
```

- [ ] **Step 3: Thêm `colorMode` vào `drawMosaic` (`engine/mosaic.js`)**

Thêm `colorMode = 'gold'` vào tham số; bọc khối bóng đen bằng `if (colorMode !== 'image') { ... }`; thay khối chọn `ctx.fillStyle` bằng:

```js
      if (colorMode === 'image') {
        const R = Math.min(255, grid.col[i*3] * 1.15), G = Math.min(255, grid.col[i*3+1] * 1.15), B = Math.min(255, grid.col[i*3+2] * 1.15);
        ctx.fillStyle = `rgb(${R|0},${G|0},${B|0})`;
        ctx.globalAlpha = alpha;
      } else {
        ctx.fillStyle = v > 0.70 ? '#ffffff' : v > 0.46 ? '#ffc94d' : v > 0.26 ? '#d4a017' : '#7a5f12';
        ctx.globalAlpha = alpha * Math.min(1, 0.55 + v * 0.62);
      }
```

Lưu ý: `stretch()` trả `{...grid, lum: out, ...}` nên `grid.col` vẫn còn — đúng dữ liệu màu gốc.

- [ ] **Step 4: Trang lab `tools/lab/mascot-v2.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Lab — mascot v2</title>
<style>
  @font-face{font-family:"IBM Plex Mono";src:url("../../../assets/fonts/IBMPlexMono-Regular.ttf");}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}
  canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// node engine/render/shoot.js stills --page tools/lab/mascot-v2.html --dur 1 --t 0.5 --outdir out/lab/mv2
import { Mascot, POSES_V2 } from '../../../engine/mascot.js';
const g = document.getElementById('cv').getContext('2d');
const m = new Mascot(); let ready = false;
(async () => { await document.fonts.load('400 20px "IBM Plex Mono"'); await m.load('../../../assets/character-v2/cut', POSES_V2); ready = true; })();
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  // hàng trên: 8 pose PNG; hàng dưới: 4 pose mosaic màu ảnh
  POSES_V2.forEach((p, i) => m.draw(g, p, 120 + i * 240, 520, 460, { ring: 0 }));
  ['wave','point','crossed','jump'].forEach((p, i) => m.mosaic(g, p, 240 + i * 480, 1060, 500, { t, cell: 8, colorMode: 'image' }));
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 1 };
</script>
```

- [ ] **Step 5: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/mascot-v2.html --dur 1 --t 0.5 --outdir out/lab/mv2`
Expected: hàng trên đủ 8 pose, không pose nào thiếu (console không có `mascot: thiếu`); hàng dưới 4 nhân vật dựng bằng ký hiệu toán, **nhận ra được** tóc nâu, áo trắng, quần đen bằng màu — không phải toàn vàng. Zoom một mặt (crop 240×135 phóng 4×) để xác nhận là ký hiệu thật.

- [ ] **Step 6: Kiểm lab cũ không vỡ**

Run: `node engine/render/shoot.js stills --page tools/lab/mascot.html --dur 1 --t 0.5 --outdir out/lab/mv1`
Expected: 6 ô như trước (nhân vật cũ, mosaic vàng).

- [ ] **Step 7: Commit**

```bash
git add engine/mascot.js engine/mosaic.js tools/lab/mascot-v2.html
git commit -m "feat(engine): configurable pose set, image-coloured mosaic"
```

---

### Task 6: `engine/transit.js` — nhân vật vào/ra bằng ký hiệu

**Files:**
- Create: `engine/transit.js`
- Test: `tools/test/transit.test.mjs`
- Create: `tools/lab/transit.html`

**Interfaces:**
- Consumes: `Mascot.grid(pose, cell, hpx)`, `Mascot.draw(...)`, `Mascot.im[pose]`, `hash`, `clamp`, `smooth` (lib)
- Produces:
  - `KINDS = ['rows','columns','grid','burn','digits']`
  - `presence(t, tIn, tOut, { inDur = 0.25, outDur = 0.6 }) → { state: 'before'|'in'|'hold'|'out'|'gone', k }` — `k` 0→1 trong pha `in`/`out`.
  - `order(kind, r, c, rows, cols) → number ∈ [0,1]` — thứ tự ô chuyển chất liệu.
  - `cellIn(k, o) → { glyph, png }` — pha vào: ô hiện ký hiệu khi `k/0.6 ≥ o`; `k ∈ [0.6, 0.8]` ký hiệu mờ + ảnh sáng lên; `k ≥ 0.8` chỉ ảnh.
  - `cellOut(kind, k, o, seed) → { glyph, png, dx, dy }` — `k ∈ [0,0.1]` ảnh tắt, ký hiệu hiện; sau đó ký hiệu tan theo kiểu (`dx,dy` đơn vị = chiều cao nhân vật).
  - `drawTransit(g, mascot, pose, x, y, hpx, kind, dir, k, { t = 0, cell = 9, seed = 0 })`

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/transit.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, presence, order, cellIn, cellOut } from '../../../engine/transit.js';

test('presence: đủ 5 pha theo thời gian', () => {
  const p = t => presence(t, 10, 20, { inDur: 0.25, outDur: 0.6 }).state;
  assert.equal(p(9.9), 'before'); assert.equal(p(10.1), 'in'); assert.equal(p(15), 'hold');
  assert.equal(p(20.3), 'out'); assert.equal(p(20.7), 'gone');
});

test('presence: k chạy 0→1 trong pha in', () => {
  assert.equal(presence(10, 10, 20).k, 0);
  assert.ok(Math.abs(presence(10.125, 10, 20).k - 0.5) < 1e-9);
});

test('order: luôn trong [0,1] với mọi kiểu', () => {
  for (const kind of KINDS) for (let r = 0; r < 12; r++) for (let c = 0; c < 9; c++) {
    const o = order(kind, r, c, 12, 9);
    assert.ok(o >= 0 && o <= 1, `${kind} ${r},${c} = ${o}`);
  }
});

test('order: rows quét từ trên xuống', () => {
  assert.ok(order('rows', 0, 4, 12, 9) < order('rows', 11, 4, 12, 9));
});

test('cellIn: số ô hiện ký hiệu không giảm khi k tăng (pha ký hiệu)', () => {
  const os = Array.from({ length: 200 }, (_, i) => order('grid', i % 20, (i / 20) | 0, 20, 10));
  let prev = -1;
  for (let k = 0; k <= 0.6; k += 0.05) {
    const n = os.filter(o => cellIn(k, o).glyph > 0).length;
    assert.ok(n >= prev); prev = n;
  }
});

test('cellIn: k=0 không có gì, k=1 chỉ còn ảnh', () => {
  assert.deepEqual(cellIn(0, 0.5), { glyph: 0, png: 0 });
  assert.deepEqual(cellIn(1, 0.5), { glyph: 0, png: 1 });
});

test('cellOut: k=0 là ảnh nguyên, k=1 là hết sạch', () => {
  for (const kind of KINDS) {
    assert.equal(cellOut(kind, 0, 0.3, 1).png, 1);
    const e = cellOut(kind, 1, 0.3, 1);
    assert.equal(e.glyph, 0); assert.equal(e.png, 0);
  }
});

test('thuần: cùng đầu vào cùng đầu ra', () => {
  assert.deepEqual(cellOut('digits', 0.5, 0.4, 9), cellOut('digits', 0.5, 0.4, 9));
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `node --test tools/test/transit.test.mjs`
Expected: FAIL — module không tồn tại

- [ ] **Step 3: Viết code**

```js
// engine/transit.js
// Luật video mẫu (REFERENCE-TEARDOWN §2.3): nhân vật KHÔNG cắt cứng vào/ra.
// Vào: ký hiệu hiện theo một thứ tự → cháy trắng → ảnh màu.
// Ra: ảnh đổi hết sang ký hiệu trong ~3 khung → ký hiệu tan theo kiểu.
// Ký hiệu lấy MÀU từ chính ảnh (grid.col). Mọi thứ thuần theo t.
import { hash, clamp, smooth } from './lib.js';
import { RAMP } from './mosaic.js';

export const KINDS = ['rows', 'columns', 'grid', 'burn', 'digits'];

export function presence(t, tIn, tOut, { inDur = 0.25, outDur = 0.6 } = {}) {
  if (t < tIn) return { state: 'before', k: 0 };
  if (t < tIn + inDur) return { state: 'in', k: (t - tIn) / inDur };
  if (t < tOut) return { state: 'hold', k: 1 };
  if (t < tOut + outDur) return { state: 'out', k: (t - tOut) / outDur };
  return { state: 'gone', k: 1 };
}

export function order(kind, r, c, rows, cols) {
  const j = hash(r * 131.7 + c * 7.31);
  switch (kind) {
    case 'rows': return clamp(r / Math.max(1, rows - 1) * 0.94 + j * 0.06);
    case 'columns': return clamp(hash(c * 19.1) * 0.85 + (r / Math.max(1, rows - 1)) * 0.15);
    case 'burn': {
      const dx = c / Math.max(1, cols - 1) - 0.5, dy = r / Math.max(1, rows - 1) - 0.45;
      return clamp(Math.hypot(dx, dy) / 0.72 * 0.9 + j * 0.1);
    }
    default: return j;          // 'grid', 'digits'
  }
}

export function cellIn(k, o) {
  if (k <= 0) return { glyph: 0, png: 0 };
  if (k >= 1) return { glyph: 0, png: 1 };
  if (k < 0.6) return { glyph: k / 0.6 >= o ? 1 : 0, png: 0 };
  const f = (k - 0.6) / 0.2;                               // 0→1 trong [0.6, 0.8]
  if (k < 0.8) return { glyph: 1 - smooth(f), png: smooth(f) };
  return { glyph: 0, png: 1 };
}

export function cellOut(kind, k, o, seed = 0) {
  if (k <= 0) return { glyph: 0, png: 1, dx: 0, dy: 0 };
  if (k >= 1) return { glyph: 0, png: 0, dx: 0, dy: 0 };
  if (k < 0.1) return { glyph: k / 0.1 >= o ? 1 : 0, png: 1 - k / 0.1, dx: 0, dy: 0 };
  const u = (k - 0.1) / 0.9;                               // 0→1 pha tan
  const local = clamp((u - o * 0.45) / 0.55);              // ô sau tan muộn hơn
  const a = 1 - smooth(local);
  const h = hash(seed * 17 + o * 1000);
  switch (kind) {
    case 'columns': return { glyph: a, png: 0, dx: 0, dy: local * local * 0.35 };
    case 'rows':    return { glyph: a, png: 0, dx: (h - 0.5) * local * 0.3, dy: 0 };
    case 'digits': {
      const ang = h * Math.PI * 2;
      return { glyph: a, png: 0, dx: Math.cos(ang) * local * 0.6, dy: Math.sin(ang) * local * 0.6 };
    }
    default:        return { glyph: a, png: 0, dx: 0, dy: -local * 0.08 };
  }
}

function glyphFor(v, i, t) {
  const k = Math.min(RAMP.length - 1, Math.max(0, Math.round(v * (RAMP.length - 1))));
  return (Math.floor(t * 12) + i) % 7 === 0 ? RAMP[(k + 1) % RAMP.length] : RAMP[k];
}

export function drawTransit(g, mascot, pose, x, y, hpx, kind, dir, k, { t = 0, cell = 9, seed = 0 } = {}) {
  const gr = mascot.grid(pose, cell, hpx), im = mascot.im[pose];
  if (!gr || !im) return;
  const w = im.width * (hpx / im.height), x0 = x - w / 2, y0 = y - hpx;
  const cw = w / gr.cols, ch = hpx / gr.rows;
  // ảnh: một alpha chung cho cả thân (khi đứng alpha = 1 — luật DNA)
  let pngA = 0;
  if (dir === 'in') pngA = k < 0.6 ? 0 : k < 0.8 ? smooth((k - 0.6) / 0.2) : 1;
  else pngA = k < 0.1 ? 1 - k / 0.1 : 0;
  if (pngA > 0) {
    g.save();
    // cháy trắng: ảnh hiện ra từ trắng bão hoà
    if (dir === 'in' && k < 0.8) g.filter = `brightness(${(1 + 2 * (1 - pngA)).toFixed(2)})`;
    mascot.draw(g, pose, x, y, hpx, { alpha: pngA, ring: 0, shadow: false });
    g.restore();
  }
  g.save();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${(ch * 0.96).toFixed(2)}px "IBM Plex Mono", monospace`;
  for (let r = 0; r < gr.rows; r++) for (let c = 0; c < gr.cols; c++) {
    const i = r * gr.cols + c;
    if (gr.alp[i] < 0.35) continue;
    const o = order(kind, r, c, gr.rows, gr.cols);
    const s = dir === 'in' ? { ...cellIn(k, o), dx: 0, dy: 0 } : cellOut(kind, k, o, seed + i);
    if (s.glyph <= 0.01) continue;
    const R = Math.min(255, gr.col[i*3] * 1.15), G = Math.min(255, gr.col[i*3+1] * 1.15), B = Math.min(255, gr.col[i*3+2] * 1.15);
    g.fillStyle = `rgb(${R|0},${G|0},${B|0})`;
    g.globalAlpha = s.glyph;
    g.fillText(glyphFor(gr.lum[i], i, t), x0 + (c + 0.5) * cw + s.dx * hpx, y0 + (r + 0.5) * ch + s.dy * hpx);
  }
  g.restore();
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/transit.test.mjs`
Expected: PASS 8/8

- [ ] **Step 5: Trang lab `tools/lab/transit.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Lab — transit</title>
<style>
  @font-face{font-family:"IBM Plex Mono";src:url("../../../assets/fonts/IBMPlexMono-Regular.ttf");}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}
  canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// t 0→1: VÀO (k = t), t 1→2: RA (k = t-1). Năm cột = năm kiểu.
// node engine/render/shoot.js stills --page tools/lab/transit.html --dur 2 \
//   --t 0.2,0.5,0.7,0.9,1.05,1.3,1.6,1.9 --outdir out/lab/transit
import { Mascot, POSES_V2 } from '../../../engine/mascot.js';
import { KINDS, drawTransit } from '../../../engine/transit.js';
const g = document.getElementById('cv').getContext('2d');
const m = new Mascot(); let ready = false;
(async () => { await document.fonts.load('400 20px "IBM Plex Mono"'); await m.load('../../../assets/character-v2/cut', POSES_V2); ready = true; })();
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  const dir = t < 1 ? 'in' : 'out', k = t < 1 ? t : t - 1;
  KINDS.forEach((kind, i) => {
    drawTransit(g, m, 'wave', 192 + i * 384, 960, 780, kind, dir, k, { t, cell: 9, seed: i });
    g.fillStyle = '#F4F1EA'; g.font = '400 26px "IBM Plex Mono"'; g.textAlign = 'center';
    g.fillText(`${kind} ${dir} ${k.toFixed(2)}`, 192 + i * 384, 1030);
  });
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 2 };
</script>
```

- [ ] **Step 6: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/transit.html --dur 2 --t 0.2,0.5,0.7,0.9,1.05,1.3,1.6,1.9 --outdir out/lab/transit`
Expected:
- 0.2: mỗi cột một mẫu ký hiệu khác nhau (hàng trên cùng / cột rải / ô rải / từ tâm / ô rải).
- 0.5: phần lớn thân đã là ký hiệu **màu ảnh** (tóc nâu, áo trắng).
- 0.7: ảnh màu hiện ra từ **trắng loá**, ký hiệu mờ dần.
- 0.9: ảnh màu sạch, alpha 1, không còn ký hiệu.
- 1.05: ảnh đã mờ đi nhiều, thân thành ký hiệu.
- 1.3–1.9: `columns` rơi xuống, `digits` bay toả, `rows` trôi ngang; 1.9 gần như trống.
Zoom crop 240×135 phóng 4× tại một mặt ở 0.5 để xác nhận ký hiệu là ký tự thật.

- [ ] **Step 7: Commit**

```bash
git add engine/transit.js tools/test/transit.test.mjs tools/lab/transit.html
git commit -m "feat(engine): glyph material transitions for mascot entry/exit"
```

---

### Task 7: `engine/visemes.js` + `engine/face.js` — hát nhép

**Files:**
- Create: `engine/visemes.js`, `engine/face.js`
- Test: `tools/test/visemes.test.mjs`
- Create: `tools/lab/face.html`

**Interfaces:**
- Produces:
  - `V = { REST:1, CLOSE:2, TEETH:3, OPEN:4, WIDE:5, O:6, U:7, EE:8, E:9 }` (khớp bảng `docs/character/CHARACTER-V2.md` § Hát nhép)
  - `syllablesOf(word) → [{ onset: string, vowel: string }]`
  - `mouthAt(t, words) → 1..9` — `words: [{w,start,end}]`
  - `class Face { async load(base) ; draw(g, x, y, h, mouthId, { alpha = 1 }) }` — `x,y` = tâm-đáy ô mặt (như `Mascot.draw`), `h` = chiều cao ô 418px sau khi scale.

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/visemes.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { V, syllablesOf, mouthAt } from '../../../engine/visemes.js';

const W = (w, s, e) => [{ w, start: s, end: e }];

test('syllablesOf tách âm tiết theo nhóm nguyên âm, bỏ e câm cuối', () => {
  assert.deepEqual(syllablesOf('back'), [{ onset: 'b', vowel: 'a' }]);
  assert.equal(syllablesOf('logarithm').length, 3);
  assert.equal(syllablesOf('same').length, 1);
  assert.equal(syllablesOf('me').length, 1);
});

test('ngoài mọi từ → REST', () => {
  assert.equal(mouthAt(0.5, W('run', 1, 2)), V.REST);
});

test('nguyên âm quyết định khẩu hình giữa âm tiết', () => {
  assert.equal(mouthAt(1.5, W('run', 1, 2)), V.U);
  assert.equal(mouthAt(1.5, W('go', 1, 2)), V.O);
  assert.equal(mouthAt(1.5, W('me', 1, 2)), V.EE);
  assert.equal(mouthAt(1.5, W('back', 1, 2)), V.WIDE);    // a dài (âm tiết ≥ 0.22s)
  assert.equal(mouthAt(1.05, W('back', 1, 1.15)), V.OPEN); // a ngắn — không phải onset vì b→REST chỉ 20% đầu
});

test('phụ âm đầu m/b/p khép môi, s/t/d/z lộ răng', () => {
  assert.equal(mouthAt(1.05, W('map', 1, 2)), V.REST);
  assert.equal(mouthAt(1.05, W('same', 1, 2)), V.TEETH);
});

test('15% cuối từ → CLOSE', () => {
  assert.equal(mouthAt(1.95, W('run', 1, 2)), V.CLOSE);
});

test('từ lạ không làm vỡ: luôn trả 1..9', () => {
  for (const w of ['x', 'y', '99', '—', '', "isn't", 'rhythm'])
    for (const t of [1.0, 1.3, 1.9]) {
      const m = mouthAt(t, W(w, 1, 2));
      assert.ok(Number.isInteger(m) && m >= 1 && m <= 9, `${w}@${t} → ${m}`);
    }
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `node --test tools/test/visemes.test.mjs`
Expected: FAIL — module không tồn tại

- [ ] **Step 3: Viết `engine/visemes.js`**

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

export function mouthAt(t, words) {
  for (const wd of words) {
    if (t < wd.start || t >= wd.end) continue;
    const dur = Math.max(0.01, wd.end - wd.start), f = (t - wd.start) / dur;
    const syl = syllablesOf(wd.w);
    if (!syl.length) return V.OPEN;                       // "x", "99", "—": miệng hé
    if (f > 0.85) return V.CLOSE;
    const n = syl.length, si = Math.min(n - 1, Math.floor(f * n)), sf = f * n - si;
    const s = syl[si];
    if (sf < 0.2) { const om = onsetMouth(s.onset); if (om) return om; }
    // 'e' đứng cuối từ ngắn (me, be, we) đọc là /i:/
    if (s.vowel === 'e' && si === n - 1 && /e$/i.test(wd.w)) return V.EE;
    return vowelMouth(s.vowel, dur / n);
  }
  return V.REST;
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/visemes.test.mjs`
Expected: PASS 6/6. Nếu `back` ngắn trả sai: kiểm `sylDur` = `dur / n` (0.15s < 0.22 → OPEN).

- [ ] **Step 5: Viết `engine/face.js`**

```js
// engine/face.js
// Mặt cận hát nhép: vẽ viseme-1 làm nền, đè mảng miệng mouth-N tại cut.json.mouth.box.
// KHÔNG thay cả ô viseme — AI vẽ lại mọi nét nên viền rung 1–2px giữa các ô.
export class Face {
  async load(base = '../../../assets/character-v2/cut') {
    const img = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error(`face: thiếu ${src}`)); i.src = src; });
    const meta = await (await fetch(`${base}/cut.json`)).json();
    this.box = meta.mouth.box;                       // [x0, y0, x1, y1] trong ô 418px
    this.base = await img(`${base}/viseme-1.png`);
    this.mouth = await Promise.all([1,2,3,4,5,6,7,8,9].map(i => img(`${base}/mouth-${i}.png`)));
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

- [ ] **Step 6: Trang lab `tools/lab/face.html`** — hát nhép câu chorus thật

```html
<!doctype html><meta charset="utf-8">
<title>Lab — face</title>
<style>html,body{margin:0;background:#0B0F1E;overflow:hidden}canvas{display:block;width:100vw;height:100vh;object-fit:contain}</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// Chuỗi 15fps quanh "Run it forward, run it back" (46.4–48.4):
// node engine/render/shoot.js stills --page tools/lab/face.html --dur 240 \
//   --t 46.52,46.7,46.85,47.3,47.5,47.7,48.0,48.25 --outdir out/lab/face
import { Face } from '../../../engine/face.js';
import { mouthAt } from '../../../engine/visemes.js';
import { loadTimeline } from '../../../engine/timeline.js';
const g = document.getElementById('cv').getContext('2d');
let ready = false, face, words;
(async () => {
  face = await new Face().load('../../../assets/character-v2/cut');
  const tl = await loadTimeline('../../../projects/mv/exp-log/data/timeline.json');
  words = tl.lines.flatMap(l => l.words);
  ready = true;
})();
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  const m = mouthAt(t, words);
  face.draw(g, 960, 1060, 1000, m);
  g.fillStyle = '#F4F1EA'; g.font = '30px monospace'; g.fillText(`t=${t.toFixed(2)} mouth=${m}`, 40, 60);
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 240 };
</script>
```

- [ ] **Step 7: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/face.html --dur 240 --t 46.52,46.7,46.85,47.3,47.5,47.7,48.0,48.25 --outdir out/lab/face`
Expected: mặt cận thẳng, miệng đổi theo từ ("run" → tròn nhỏ, "back" → há); không thấy đường nối quanh miệng; tóc/kính **đứng yên** giữa các ảnh (so hai ảnh bất kỳ: `compare -metric AE` trên vùng y 0–250 cho ≤ 50 pixel khác).

Run: `cd out/lab/face && compare -metric AE -crop 1000x400+460+60 t_46.52.png t_47.70.png null: 2>&1; cd -`
Expected: số nhỏ (≤ 50).

- [ ] **Step 8: Commit**

```bash
git add engine/visemes.js engine/face.js tools/test/visemes.test.mjs tools/lab/face.html
git commit -m "feat(engine): letter-driven visemes and mouth-patch face for lip sync"
```

---

### Task 8: `engine/mirror.js` — đường gương y = x

**Files:**
- Create: `engine/mirror.js`
- Test: `tools/test/mirror.test.mjs`
- Create: `tools/lab/mirror.html`

**Interfaces:**
- Produces:
  - `line(x0, y0, x1, y1) → L` (đối tượng `{x0,y0,x1,y1}`)
  - `reflectPoint([x, y], L) → [x', y']`
  - `mirrorMatrix(L) → [a, b, c, d, e, f]` (dùng cho `g.transform(...)`)
  - `side([x, y], L) → -1 | 0 | 1` (dấu tích có hướng; 0 khi trên đường)
  - `drawMirrorLine(g, L, k, { color = '#F4F1EA', width = 4, glow = 24 })` — `k` 0→1 = phần đã "xé" ra từ tâm
  - `drawReflected(g, L, fn, { tint = '#3FB8FF', tintAlpha = 0.55, alpha = 1 })` — vẽ `fn(ctx)` lên canvas phụ, phản chiếu qua `L`, nhuộm màu, ép xuống `g`
  - `clipSide(g, L, s)` — cắt khung còn nửa mặt phẳng có `side = s` (gọi trong `save/restore`)

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/mirror.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { line, reflectPoint, mirrorMatrix, side } from '../../../engine/mirror.js';

const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);
const L = line(0, 0, 1, 1);                       // y = x trong toạ độ toán

test('(0,1) ↔ (1,0) qua y = x', () => {
  assert.ok(near(reflectPoint([0, 1], L), [1, 0]));
});

test('phản chiếu hai lần = giữ nguyên', () => {
  const S = line(420, 1080, 1500, 0);
  const p = [300, 200];
  assert.ok(near(reflectPoint(reflectPoint(p, S), S), p));
});

test('điểm trên gương đứng yên và side = 0', () => {
  const S = line(420, 1080, 1500, 0);
  assert.ok(near(reflectPoint([960, 540], S), [960, 540]));
  assert.equal(side([960, 540], S), 0);
});

test('side: góc dưới-phải là +1 (nửa đi xuôi), góc trên-trái là -1', () => {
  const S = line(420, 1080, 1500, 0);
  assert.equal(side([1900, 1070], S), 1);
  assert.equal(side([20, 20], S), -1);
});

test('mirrorMatrix cho cùng kết quả với reflectPoint', () => {
  const S = line(420, 1080, 1500, 0), [a, b, c, d, e, f] = mirrorMatrix(S), [x, y] = [123, 456];
  assert.ok(near([a * x + c * y + e, b * x + d * y + f], reflectPoint([x, y], S)));
});

test('đường suy biến (hai điểm trùng) không sinh NaN — trả điểm nguyên', () => {
  const D = line(5, 5, 5, 5);
  const r = reflectPoint([1, 2], D);
  assert.ok(r.every(Number.isFinite));
  assert.ok(near(r, [1, 2]));
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `node --test tools/test/mirror.test.mjs`
Expected: FAIL — module không tồn tại

- [ ] **Step 3: Viết code**

```js
// engine/mirror.js
// Tấm gương y = x — mô-típ trung tâm của exp-log (TREATMENT § Ý tưởng).
// Logarit LÀ ảnh của hàm mũ qua y = x: phần toán ở đây là thật, không trang trí.
export const line = (x0, y0, x1, y1) => ({ x0, y0, x1, y1 });

function unit(L) {
  const dx = L.x1 - L.x0, dy = L.y1 - L.y0, n = Math.hypot(dx, dy);
  return n < 1e-9 ? null : [dx / n, dy / n];
}

export function mirrorMatrix(L) {
  const u = unit(L);
  if (!u) return [1, 0, 0, 1, 0, 0];
  const [ux, uy] = u;
  const a = 2 * ux * ux - 1, b = 2 * ux * uy, c = b, d = 2 * uy * uy - 1;
  return [a, b, c, d, L.x0 - (a * L.x0 + c * L.y0), L.y0 - (b * L.x0 + d * L.y0)];
}

export function reflectPoint([x, y], L) {
  const [a, b, c, d, e, f] = mirrorMatrix(L);
  return [a * x + c * y + e, b * x + d * y + f];
}

export function side([x, y], L) {
  const v = (L.x1 - L.x0) * (y - L.y0) - (L.y1 - L.y0) * (x - L.x0);
  return Math.abs(v) < 1e-6 ? 0 : v > 0 ? 1 : -1;
}

export function drawMirrorLine(g, L, k, { color = '#F4F1EA', width = 4, glow = 24 } = {}) {
  if (k <= 0) return;
  const mx = (L.x0 + L.x1) / 2, my = (L.y0 + L.y1) / 2, h = Math.min(1, k) / 2;
  g.save();
  g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round';
  g.shadowColor = color; g.shadowBlur = glow;
  g.beginPath();
  g.moveTo(mx + (L.x0 - mx) * h * 2, my + (L.y0 - my) * h * 2);
  g.lineTo(mx + (L.x1 - mx) * h * 2, my + (L.y1 - my) * h * 2);
  g.stroke();
  g.restore();
}

let buf = null;
export function drawReflected(g, L, fn, { tint = '#3FB8FF', tintAlpha = 0.55, alpha = 1 } = {}) {
  const W = g.canvas.width, H = g.canvas.height;
  buf ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
  const b = buf.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.transform(...mirrorMatrix(L)); fn(b); b.restore();
  b.save(); b.globalCompositeOperation = 'source-atop'; b.globalAlpha = tintAlpha;
  b.fillStyle = tint; b.fillRect(0, 0, W, H); b.restore();
  g.save(); g.globalAlpha = alpha; g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(buf, 0, 0); g.restore();
}

export function clipSide(g, L, s) {
  const u = unit(L); if (!u) return;
  const big = 5000, [ux, uy] = u, nx = -uy * s, ny = ux * s;   // pháp tuyến về phía side = s
  const ax = L.x0 - ux * big, ay = L.y0 - uy * big, bx = L.x0 + ux * big, by = L.y0 + uy * big;
  g.beginPath();
  g.moveTo(ax, ay); g.lineTo(bx, by);
  g.lineTo(bx + nx * big, by + ny * big); g.lineTo(ax + nx * big, ay + ny * big);
  g.closePath(); g.clip();
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/mirror.test.mjs`
Expected: PASS 6/6. Nếu test `side` sai dấu: pháp tuyến `clipSide` cũng phải đổi theo — sửa cả hai cùng lúc.

- [ ] **Step 5: Trang lab `tools/lab/mirror.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Lab — mirror</title>
<style>
  @font-face{font-family:"Archivo";src:url("../../../assets/fonts/Archivo[wdth,wght].ttf");font-weight:100 900;}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// node engine/render/shoot.js stills --page tools/lab/mirror.html --dur 2 --t 0.3,1.0,1.8 --outdir out/lab/mirror
import { line, drawMirrorLine, drawReflected, clipSide } from '../../../engine/mirror.js';
import { Mascot, POSES_V2 } from '../../../engine/mascot.js';
const g = document.getElementById('cv').getContext('2d');
const L = line(420, 1080, 1500, 0), m = new Mascot(); let ready = false;
(async () => { await document.fonts.load('900 150px "Archivo"'); await m.load('../../../assets/character-v2/cut', POSES_V2); ready = true; })();
function forward(ctx) {                          // nửa đi xuôi: "3 → 8" vàng + đường cong mũ
  ctx.fillStyle = '#FFB547'; ctx.font = '900 150px "Archivo"'; ctx.fillText('3 → 8', 1150, 900);
  ctx.strokeStyle = '#FFB547'; ctx.lineWidth = 6; ctx.beginPath();
  for (let x = 0; x <= 1; x += 0.01) { const px = 700 + x * 1100, py = 1060 - (Math.pow(2, x * 4) - 1) / 15 * 700; x ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.stroke();
}
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  g.save(); clipSide(g, L, 1); g.fillStyle = 'rgba(255,181,71,0.06)'; g.fillRect(0,0,1920,1080); g.restore();
  g.save(); clipSide(g, L, -1); g.fillStyle = 'rgba(63,184,255,0.06)'; g.fillRect(0,0,1920,1080); g.restore();
  forward(g);
  if (t > 0.9) drawReflected(g, L, forward, { tintAlpha: 0.85, alpha: Math.min(1, (t - 0.9) * 3) });
  drawMirrorLine(g, L, Math.min(1, t * 2));
  m.draw(g, 'point', 960, 1060, 620, { ring: 0 });
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 2 };
</script>
```

- [ ] **Step 6: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/mirror.html --dur 2 --t 0.3,1.0,1.8 --outdir out/lab/mirror`
Expected:
- 0.3: đường gương trắng mới xé ra một đoạn giữa, loé sáng.
- 1.8: đường gương đi từ góc dưới-trái lên trên-phải; nửa dưới-phải ánh vàng có `3 → 8` + đường cong mũ; nửa trên-trái có **bản phản chiếu xanh** — chữ lật, đường cong thành hình logarit (dốc đứng gần gương rồi thoải). Nhân vật đứng giữa đường: viền cam bên trái, xanh bên phải.

- [ ] **Step 7: Commit**

```bash
git add engine/mirror.js tools/test/mirror.test.mjs tools/lab/mirror.html
git commit -m "feat(engine): y=x mirror — reflection math, line, tinted reflection"
```

---

### Task 9: `engine/fill.js` — chữ khổng lồ lấp ruột bằng chữ nhỏ

**Files:**
- Create: `engine/fill.js`
- Test: `tools/test/fill.test.mjs`
- Create: `tools/lab/fill.html`

**Interfaces:**
- Produces:
  - `innerRows(phrases, rowsNeeded, minChars) → string[]` — thuần: nối các cụm bằng `' · '`, lặp tới đủ `minChars` ký tự mỗi hàng; hàng i xoay vòng bắt đầu từ cụm `i % phrases.length` (để hàng kề nhau không giống hệt).
  - `fillWord(g, word, x, y, { font, inner, innerFont = '500 22px "IBM Plex Mono"', color = '#FFB547', innerColor = '#FFE3A3', lineH = 24, drift = 0, outline = 0 })` — vẽ `word` (canh trái-giữa tại `x,y`) mà ruột là các hàng chữ nhỏ `inner` trôi ngang theo `drift` px.

- [ ] **Step 1: Viết test thất bại**

```js
// tools/test/fill.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { innerRows } from '../../../engine/fill.js';

test('đủ số hàng, mỗi hàng đủ dài', () => {
  const r = innerRows(['2·2·2 = 8', 'POWER'], 5, 60);
  assert.equal(r.length, 5);
  assert.ok(r.every(s => s.length >= 60));
});

test('hàng kề nhau bắt đầu khác cụm', () => {
  const r = innerRows(['A', 'B', 'C'], 3, 10);
  assert.notEqual(r[0].slice(0, 1), r[1].slice(0, 1));
});

test('danh sách rỗng không treo máy', () => {
  assert.deepEqual(innerRows([], 3, 10), ['', '', '']);
});
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: `node --test tools/test/fill.test.mjs`
Expected: FAIL — module không tồn tại

- [ ] **Step 3: Viết code**

```js
// engine/fill.js
// Từ khoá lớn lấp ruột bằng chữ nhỏ CÓ NGHĨA — lớp đùa thứ hai của video mẫu
// (REFERENCE-TEARDOWN §3.2). Ruột: vật thể lớn ít chữ → câu đọc được; chữ
// khổng lồ → kết cấu.
export function innerRows(phrases, rowsNeeded, minChars) {
  if (!phrases.length) return Array(rowsNeeded).fill('');
  const out = [];
  for (let i = 0; i < rowsNeeded; i++) {
    let s = '', j = i % phrases.length;
    while (s.length < minChars) { s += phrases[j % phrases.length] + ' · '; j++; }
    out.push(s);
  }
  return out;
}

let buf = null;
export function fillWord(g, word, x, y, {
  font, inner, innerFont = '500 22px "IBM Plex Mono"', color = '#FFB547',
  innerColor = '#FFE3A3', lineH = 24, drift = 0, outline = 0,
} = {}) {
  g.save(); g.font = font;
  const m = g.measureText(word);
  const w = Math.ceil(m.width) + 8, asc = Math.ceil(m.actualBoundingBoxAscent), desc = Math.ceil(m.actualBoundingBoxDescent);
  const h = asc + desc + 8;
  buf ||= document.createElement('canvas');
  if (buf.width < w) buf.width = w; if (buf.height < h) buf.height = h;
  const b = buf.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, buf.width, buf.height);
  // 1) hàng chữ nhỏ trên nền màu chữ
  b.fillStyle = color; b.fillRect(0, 0, w, h);
  b.font = innerFont; b.fillStyle = innerColor; b.textBaseline = 'top';
  const rows = innerRows(inner, Math.ceil(h / lineH) + 1, Math.ceil(w / 6) + 40);
  rows.forEach((s, i) => b.fillText(s, -((drift * (i % 2 ? 1 : -0.7)) % 400) - 200, i * lineH));
  // 2) giữ lại đúng hình chữ lớn
  b.globalCompositeOperation = 'destination-in';
  b.font = font; b.textBaseline = 'alphabetic'; b.fillStyle = '#000';
  b.fillText(word, 4, asc + 4);
  b.globalCompositeOperation = 'source-over';
  g.drawImage(buf, 0, 0, w, h, x - 4, y - (asc + 4) + (asc - desc) / 2, w, h);
  if (outline > 0) { g.lineWidth = outline; g.strokeStyle = color; g.textBaseline = 'middle'; g.strokeText(word, x, y); }
  g.restore();
}
```

- [ ] **Step 4: Chạy test, xác nhận qua**

Run: `node --test tools/test/fill.test.mjs`
Expected: PASS 3/3

- [ ] **Step 5: Trang lab `tools/lab/fill.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Lab — fill</title>
<style>
  @font-face{font-family:"Archivo";src:url("../../../assets/fonts/Archivo[wdth,wght].ttf");font-weight:100 900;}
  @font-face{font-family:"IBM Plex Mono";src:url("../../../assets/fonts/IBMPlexMono-Medium.ttf");font-weight:500;}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
// node engine/render/shoot.js stills --page tools/lab/fill.html --dur 2 --t 0.5 --outdir out/lab/fill
import { fillWord } from '../../../engine/fill.js';
const g = document.getElementById('cv').getContext('2d'); let ready = false;
(async () => { await Promise.all([document.fonts.load('900 300px "Archivo"'), document.fonts.load('500 22px "IBM Plex Mono"')]); await document.fonts.ready; ready = true; })();
function frame(t) {
  g.setTransform(1,0,0,1,0,0); g.fillStyle = '#0B0F1E'; g.fillRect(0,0,1920,1080);
  fillWord(g, 'POWER', 200, 330, { font: '900 300px "Archivo"', inner: ['2·2·2 = 8', '2³ = 8', 'three little factors'], drift: t * 120 });
  fillWord(g, 'LOGARITHM', 120, 760, { font: '900 250px "Archivo"', inner: ['log₂8 = 3', 'log₂16 = 4', 'log₁₀1000 = 3'], color: '#3FB8FF', innerColor: '#BDE8FF', drift: t * 120 });
}
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: 2 };
</script>
```

- [ ] **Step 6: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page tools/lab/fill.html --dur 2 --t 0.5 --outdir out/lab/fill`
Expected: POWER vàng và LOGARITHM xanh đọc rõ ở cỡ toàn khung; zoom 4× vào ruột thấy các hàng `2·2·2 = 8 · 2³ = 8 …` / `log₂8 = 3 …` đọc được. Không có hình chữ nhật màu tràn ra ngoài hình chữ.

- [ ] **Step 7: Commit**

```bash
git add engine/fill.js tools/test/fill.test.mjs tools/lab/fill.html
git commit -m "feat(engine): big words filled with meaningful small text"
```

---

### Task 10: Dựng project `exp-log` — song.js, nền, trang render

**Files:**
- Modify: `engine/main.js` (Show nhận `poses`, `bg`, `backdrop`, truyền `tl`/`face` cho cảnh)
- Create: `projects/mv/exp-log/song.js`, `projects/mv/exp-log/backdrop.js`, `projects/mv/exp-log/index.html`
- Create: `projects/mv/exp-log/plates/p00-probe.js` (cảnh tạm để kiểm dây — xoá ở Task 11)

**Interfaces:**
- Consumes: `makeBeat` (lib), `loadTimeline` (Task 2), `POSES_V2` (Task 5), `Face` (Task 7), `line` (Task 8)
- Produces (`projects/mv/exp-log/song.js`):
  - `SONG = { title, audio: 'audio/song.m4a', duration: 239.65, fps: 60 }`
  - `PAL = { bg:'#0B0F1E', halo:'#16203A', fwd:'#FFB547', fwdCore:'#FFE3A3', back:'#3FB8FF', backCore:'#BDE8FF', truth:'#F4F1EA', block:'#FF4D5E', paper:'#F2EEE4', ink:'#1E2230' }`
  - `beat = makeBeat({ bpm: 112, t0: 0.184 })`
  - `CUE = { fx0: 1.81, keysPrint: [1.87,2.13,2.40,2.67,2.97,3.24], keysCubes: [4.54,4.83,5.34,5.64,6.14,6.41,6.68,6.99], drop: 12.52 }`
  - `MIRROR = line(420, 1080, 1500, 0)`
  - `async function loadSong() → { tl }`
- Produces (`engine/main.js`): `new Show({ order, beat, end, assets, poses, bg, backdrop, extra })` — `extra` được trộn vào đối tượng truyền cho `plate.init(shared)`; `backdrop(g, t, opts)` thay cho nền mặc định.

- [ ] **Step 1: Sửa `engine/main.js`**

Trong `init()`: `this.mascot = await new Mascot().load(this.cfg.assets, this.cfg.poses);` và `await pl.init({ mascot: this.mascot, beat: this.cfg.beat, ...(this.cfg.extra || {}) });`
Trong `render()`: bọc lời gọi cảnh thành `g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.globalAlpha = 1; cur.render(g, t); g.restore();` — trạng thái chữ của cảnh trước KHÔNG được rò sang cảnh sau (tất định khi gọi `t` không theo thứ tự). Thay `g.fillStyle = C.navy;` bằng `g.fillStyle = this.cfg.bg || C.navy;` và thay lời gọi `backdrop(g, t, {...})` bằng:

```js
      (this.cfg.backdrop || backdrop)(g, t, {
        scene: idx + 1, total: this.plates.length, beat: this.cfg.beat, ...(bd || {}),
      });
```

Import: `import { Mascot } from './mascot.js';` giữ nguyên (không truyền `poses` → `POSES_V1`, 99-intro không đổi).

- [ ] **Step 2: Kiểm 99-intro không vỡ**

Run: `node engine/render/shoot.js stills --page projects/mv/99-intro/index.html --dur 25.968 --t 3,12,22 --outdir out/check/99`
Expected: 3 ảnh giống bản trước (nhân vật cũ, nền lưới vàng-teal).

- [ ] **Step 3: `projects/mv/exp-log/song.js`**

```js
// Dữ liệu RIÊNG của bài "Ninety-nine percent" (luỹ thừa ⇄ logarit).
// Mốc lời: data/timeline.json qua engine/timeline.js — KHÔNG gõ mốc lời ở đây.
// Chỉ mốc NHẠC CỤ (không có trong lời) được khai báo, kèm nguồn.
import { makeBeat } from '../../../engine/lib.js';
import { loadTimeline } from '../../../engine/timeline.js';
import { line } from '../../../engine/mirror.js';

export const SONG = { title: 'Ninety-nine percent', audio: 'audio/song.m4a', duration: 239.65, fps: 60 };

// TREATMENT § Bảng màu
export const PAL = {
  bg: '#0B0F1E', halo: '#16203A', fwd: '#FFB547', fwdCore: '#FFE3A3',
  back: '#3FB8FF', backCore: '#BDE8FF', truth: '#F4F1EA', block: '#FF4D5E',
  paper: '#F2EEE4', ink: '#1E2230',
};

// data/music.json: 112.00 BPM, tin cậy 3.28×, downbeat đầu 0.184s
export const beat = makeBeat({ bpm: 112, t0: 0.184 });

// data/stems.json (TREATMENT § Mốc nhạc cụ cụ thể)
export const CUE = {
  fx0: 1.81,                                           // other: tiếng vút mở màn
  keysPrint: [1.87, 2.13, 2.40, 2.67, 2.97, 3.24],     // keyboard: in chân dung
  keysCubes: [4.54, 4.83, 5.34, 5.64, 6.14, 6.41, 6.68, 6.99], // keyboard: 8 khối
  drop: 12.52,                                         // drums + brass vào cùng lúc
};

// Đường y = x trên màn hình: 45°, qua tâm khung (960, 540).
export const MIRROR = line(420, 1080, 1500, 0);

export async function loadSong() {
  return { tl: await loadTimeline('./data/timeline.json') };
}
```

- [ ] **Step 4: `projects/mv/exp-log/backdrop.js`**

```js
// Nền exp-log: navy (không đen tuyền — tóc nhân vật tối) + quầng sáng thở theo beat.
// Bám BEAT, không bám lời (29% từ rơi gần beat).
import { W, H } from '../../../engine/lib.js';
import { PAL } from './song.js';

export function backdrop(g, t, { beat, haloX = 960, haloY = 600, haloR = 620, glow = 1 } = {}) {
  const p = beat ? beat.beatPulse(t, 0.18) : 0;
  g.save();
  const r = haloR * (1 + 0.04 * p);
  const gr = g.createRadialGradient(haloX, haloY, 0, haloX, haloY, r);
  gr.addColorStop(0, PAL.halo); gr.addColorStop(1, 'rgba(22,32,58,0)');
  g.globalAlpha = glow * (0.85 + 0.15 * p);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.restore();
}
```

- [ ] **Step 5: Cảnh tạm `projects/mv/exp-log/plates/p00-probe.js`**

```js
// Cảnh tạm kiểm dây nối: in dòng lời đang hát + section. Xoá ở Task 11.
import { decodeLine } from '../../../../engine/lyric.js';
export default class P00 {
  async init(s) { this.tl = s.tl; }
  render(g, t) {
    const l = this.tl.lineAt(t);
    g.fillStyle = '#F4F1EA'; g.font = '24px monospace';
    g.fillText(`${t.toFixed(2)}  ${this.tl.sectionAt(t)?.name ?? '-'}`, 40, 50);
    if (l) decodeLine(g, this.tl.wordsOf(l), t, 960, 540, { align: 'center' });
  }
}
```

- [ ] **Step 6: `projects/mv/exp-log/index.html`**

```html
<!doctype html><meta charset="utf-8">
<title>Ninety-nine percent — exp-log</title>
<style>
  @font-face{font-family:"Archivo";src:url("../../../assets/fonts/Archivo[wdth,wght].ttf");font-weight:100 900;}
  @font-face{font-family:"IBM Plex Mono";src:url("../../../assets/fonts/IBMPlexMono-Regular.ttf");font-weight:400;}
  @font-face{font-family:"IBM Plex Mono";src:url("../../../assets/fonts/IBMPlexMono-Medium.ttf");font-weight:500;}
  @font-face{font-family:"Cormorant Garamond";src:url("../../../assets/fonts/CormorantGaramond-Italic[wght].ttf");font-style:italic;font-weight:300 700;}
  html,body{margin:0;background:#0B0F1E;overflow:hidden}
  canvas{display:block;width:100vw;height:100vh;object-fit:contain}
</style>
<canvas id=cv width=1920 height=1080></canvas>
<script type="module">
import { Show } from '../../../engine/main.js';
import { POSES_V2 } from '../../../engine/mascot.js';
import { Face } from '../../../engine/face.js';
import { SONG, PAL, beat, loadSong } from './song.js';
import { backdrop } from './backdrop.js';
import P00 from './plates/p00-probe.js';

const g = document.getElementById('cv').getContext('2d');
let ready = false, show;
(async () => {
  // Nạp ĐỦ mọi họ + cỡ font trước init() — cảnh đo chữ rồi cache (font-race).
  await Promise.all([
    document.fonts.load('900 300px "Archivo"'), document.fonts.load('800 64px "Archivo"'),
    document.fonts.load('700 120px "Archivo"'), document.fonts.load('400 30px "IBM Plex Mono"'),
    document.fonts.load('500 22px "IBM Plex Mono"'), document.fonts.load('500 34px "IBM Plex Mono"'),
    document.fonts.load('italic 500 86px "Cormorant Garamond"'),
  ]);
  await document.fonts.ready;
  const { tl } = await loadSong();
  const face = await new Face().load('../../../assets/character-v2/cut');
  show = new Show({
    order: [[0, P00]], beat, end: SONG.duration,
    assets: '../../../assets/character-v2/cut', poses: POSES_V2,
    bg: PAL.bg, backdrop, extra: { tl, face },
  });
  await show.init();
  // Chân dung ký hiệu (P01) và mặt cận hát nhép (P02…) phải cùng MỘT ảnh, cùng khung:
  // đăng ký viseme-1 làm pose giả 'face' để drawTransit/mosaic dùng được.
  show.mascot.im.face = face.base;
  window.__intro.gl = { plates: show.plates.length, song: SONG.title };
  ready = true;
})();
const frame = t => show.render(g, t);
window.__intro = { get ready(){ return ready; }, still: frame, frame, DUR: SONG.duration };
const PREVIEW = !/headless/i.test(navigator.userAgent);
const t0 = performance.now();
(function loop(){ if (PREVIEW) { if (ready) frame(((performance.now() - t0) / 1000) % SONG.duration); requestAnimationFrame(loop); } })();
</script>
```

- [ ] **Step 7: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 3.0,47.0,64.0,210.0 --outdir out/check/exp`
Expected: nền navy `#0B0F1E` có quầng sáng giữa; góc trên-trái ghi `t` và section đúng (3.0 → Intro, 47.0 → Chorus, 64.0 → Post-Chorus, 210.0 → Group Chant); giữa khung là dòng lời đang hát ("Ninety-nine percent...", "Run it forward," / "run it back.", "logarithm.", "From scratch!").

- [ ] **Step 8: Commit**

```bash
git add engine/main.js projects/mv/exp-log/song.js projects/mv/exp-log/backdrop.js projects/mv/exp-log/index.html projects/mv/exp-log/plates/p00-probe.js
git commit -m "feat(exp-log): project scaffold — song data, backdrop, render page"
```

---

### Task 11: P01 `boot` + P02 `easy` (0.00 → 8.00)

**Files:**
- Create: `projects/mv/exp-log/plates/p01-boot.js`, `projects/mv/exp-log/plates/p02-easy.js`
- Modify: `projects/mv/exp-log/index.html` (thay `P00` bằng P01, P02; xoá `plates/p00-probe.js`)

**Interfaces:**
- Consumes: `shared = { mascot, beat, tl, face }`, `drawTransit`/`presence` (Task 6), `decodeLine` (Task 4), `decodeChars` (Task 3), `CUE`, `PAL` (Task 10)
- Produces: `export default class` có `backdrop`, `async init(shared)`, `render(g, t)` — mốc bắt đầu trong `index.html` lấy từ `tl.at(...)`: P01 = 0, P02 = `tl.at('Two to the three?')`.

**Spec (TREATMENT P01, P02):**
- P01: CRT tối; 1.81 FX → màn bật; mỗi nốt `CUE.keysPrint` in thêm 1/6 chân dung **bằng hàng ký hiệu tô màu ảnh** (từ trên xuống); 2.76 "Ninety-nine percent…" → thanh loading gõ lên `99%` và kẹt; 3.66 "Loading." → chữ LOADING nhấp theo beat.
- P02: 4.78 `2³ = ?` gõ mono; chân dung **cháy trắng** lộ ảnh màu; 8 khối đơn vị (mặt là chữ `2`) rơi đúng `CUE.keysCubes`, xếp 2×2×2; 6.96 "Easy." → `= 8` đóng dấu vàng, mặt cận nhếch mép (`mouth-2`).

- [ ] **Step 1: `p01-boot.js`**

```js
// P01 boot — "Máy khởi động" · 0.00 → 4.78 (TREATMENT P01)
import { W, H, clamp, prog } from '../../../../engine/lib.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { drawTransit } from '../../../../engine/transit.js';
import { PAL, CUE } from '../song.js';

// Ô mặt 418×418 (viseme-1) phóng lên 760px; P02 dùng đúng các hằng này.
const FACE_X = 1240, FACE_Y = 900, FACE_H = 760;

export default class P01 {
  backdrop = { glow: 0.6, haloX: FACE_X, haloY: 520 };
  async init(s) {
    this.m = s.mascot; this.beat = s.beat; this.tl = s.tl;
    this.l99 = s.tl.line('Ninety-nine percent...'); this.lLoad = s.tl.line('Loading.', 1);
  }
  render(g, t) {
    const on = prog(t, CUE.fx0 - 0.08, CUE.fx0 + 0.12);        // màn CRT bật
    if (on <= 0) return this.caret(g, t, 140, 540);
    // chân dung in theo nốt keyboard: k của pha "in" dừng ở 0.6 (toàn ký hiệu, chưa cháy trắng)
    const printed = CUE.keysPrint.filter(x => t >= x).length / CUE.keysPrint.length;
    const k = 0.6 * clamp(printed + prog(t, CUE.keysPrint.at(-1), CUE.keysPrint.at(-1) + 0.3) * 0.02);
    drawTransit(g, this.m, 'face', FACE_X, FACE_Y, FACE_H, 'rows', 'in', Math.max(0.001, k), { t, cell: 7, seed: 1 });
    // đường quét CRT
    g.save(); g.globalAlpha = 0.08 * on; g.fillStyle = PAL.truth;
    for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);
    g.restore();
    // "Ninety-nine percent..." + thanh loading kẹt ở 99%
    if (t >= this.l99.start) {
      decodeLine(g, this.tl.wordsOf(this.l99), t, 140, 460, { font: '500 34px "IBM Plex Mono"', colBase: PAL.truth, colKey: PAL.fwd, keys: ['ninety', 'nine'] });
      const fill = 0.99 * prog(t, this.l99.start, this.l99.end);
      g.strokeStyle = PAL.truth; g.lineWidth = 2; g.strokeRect(140, 520, 560, 34);
      g.fillStyle = PAL.fwd; g.fillRect(144, 524, 552 * fill, 26);
      g.font = '500 34px "IBM Plex Mono"'; g.fillStyle = PAL.truth;
      g.fillText(`${Math.floor(fill * 100)}%`, 720, 548);
    }
    if (t >= this.lLoad.start) {
      const blink = this.beat.onBeat(t, 0.3) > 0.2 ? 1 : 0.35;
      g.globalAlpha = blink; g.font = '500 34px "IBM Plex Mono"'; g.fillStyle = PAL.truth;
      g.fillText('LOADING', 140, 620); g.globalAlpha = 1;
    }
    this.caret(g, t, 140 + (t >= this.lLoad.start ? 170 : 0), t >= this.lLoad.start ? 608 : 540);
  }
  caret(g, t, x, y) {
    if (this.beat.onBeat(t, 0.3) > 0.15) { g.fillStyle = PAL.fwd; g.fillRect(x, y - 16, 16, 30); }
  }
}
```

- [ ] **Step 2: `p02-easy.js`**

```js
// P02 easy — "2³ — dễ ợt" · 4.78 → 8.00 (TREATMENT P02)
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { drawTransit } from '../../../../engine/transit.js';
import { PAL, CUE } from '../song.js';

const FACE_X = 1240, FACE_Y = 900, FACE_H = 760;
const CUBE = 92, OX = 300, OY = 820;              // gốc khối 2×2×2 (góc trước-dưới-trái)

// Vị trí khối đơn vị thứ i trong khối 2×2×2, chiếu isometric đơn giản
const slot = i => {
  const x = i & 1, z = (i >> 1) & 1, y = (i >> 2) & 1;
  return [OX + x * CUBE + z * CUBE * 0.5, OY - y * CUBE - z * CUBE * 0.5];
};

export default class P02 {
  backdrop = { glow: 0.8, haloX: FACE_X, haloY: 520 };
  async init(s) {
    this.m = s.mascot; this.face = s.face; this.tl = s.tl; this.beat = s.beat;
    this.q = s.tl.line('Two to the three?'); this.easy = s.tl.line('Easy.');
  }
  cube(g, x, y, a) {
    g.save(); g.globalAlpha = a;
    g.fillStyle = PAL.fwd; g.strokeStyle = PAL.bg; g.lineWidth = 3;
    g.beginPath(); g.rect(x, y - CUBE, CUBE, CUBE); g.fill(); g.stroke();                  // mặt trước
    g.fillStyle = PAL.fwdCore;
    g.beginPath(); g.moveTo(x, y - CUBE); g.lineTo(x + CUBE * .5, y - CUBE * 1.5); g.lineTo(x + CUBE * 1.5, y - CUBE * 1.5); g.lineTo(x + CUBE, y - CUBE); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = PAL.bg; g.font = '900 64px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('2', x + CUBE / 2, y - CUBE / 2 + 4);
    g.restore();
  }
  render(g, t) {
    // chân dung: từ ký hiệu (P01 để ở k = 0.6) → cháy trắng → ảnh màu, trong 0.3s đầu cảnh
    const k = 0.6 + 0.4 * prog(t, this.q.start, this.q.start + 0.3);
    // cùng ảnh (viseme-1 = pose 'face'), cùng x/y/h → không giật khi đổi từ ký hiệu sang mặt màu
    if (k < 1) drawTransit(g, this.m, 'face', FACE_X, FACE_Y, FACE_H, 'rows', 'in', k, { t, cell: 7, seed: 1 });
    else this.face.draw(g, FACE_X, FACE_Y, FACE_H, t >= this.easy.start && t < this.easy.end + 0.8 ? 2 : 1);
    // 2³ = ?
    decodeLine(g, this.tl.wordsOf(this.q), t, 180, 240, { font: '500 34px "IBM Plex Mono"', colBase: PAL.truth, colKey: PAL.fwd, keys: ['three'] });
    g.font = '900 150px "Archivo"'; g.fillStyle = PAL.truth; g.fillText('2', 180, 440);
    g.font = '900 80px "Archivo"'; g.fillStyle = PAL.fwd; g.fillText('3', 270, 370);
    const eq = t >= this.easy.start ? '= 8' : '= ?';
    g.font = '900 150px "Archivo"'; g.fillStyle = t >= this.easy.start ? PAL.fwd : PAL.truth; g.fillText(eq, 360, 440);
    // 8 khối rơi đúng 8 nốt keyboard; vẽ theo thứ tự sau → trước để che đúng
    const order = [6, 7, 4, 5, 2, 3, 0, 1];
    for (const i of order) {
      const ti = CUE.keysCubes[i];
      if (t < ti - 0.18) continue;
      const f = outBack(clamp((t - (ti - 0.18)) / 0.18));
      const [x, y] = slot(i);
      this.cube(g, x, y - (1 - f) * 260, clamp(f * 1.5));
    }
    // "Easy." — con dấu vàng
    if (t >= this.easy.start) {
      const s = 1 + 0.6 * (1 - smooth(prog(t, this.easy.start, this.easy.start + 0.12)));
      g.save(); g.translate(560, 700); g.scale(s, s); g.rotate(-0.12);
      g.strokeStyle = PAL.fwd; g.lineWidth = 8; g.strokeRect(-150, -60, 300, 120);
      g.fillStyle = PAL.fwd; g.font = '900 90px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('EASY', 0, 6); g.restore();
    }
  }
}
```

- [ ] **Step 3: Nối vào `index.html`**

Thay `import P00 ...` bằng:
```js
import P01 from './plates/p01-boot.js';
import P02 from './plates/p02-easy.js';
```
và trong `new Show({...})`: `order: [[0, P01], [tl.at('Two to the three?'), P02]],`. Xoá `plates/p00-probe.js`.

- [ ] **Step 4: Chụp và NHÌN**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 1.0,1.95,2.5,3.3,4.0,4.95,5.4,6.5,7.2 --outdir out/check/p0102`
Expected:
- 1.0: gần đen, chỉ con trỏ vàng nhấp.
- 1.95 → 3.3: chân dung ký hiệu **màu ảnh** in dần từ trên xuống; đường quét CRT mảnh.
- 3.3: "Ninety-nine percent..." + thanh 99%.
- 4.0: LOADING, thanh kẹt 99%.
- 4.95: chân dung đang cháy trắng; 5.4: mặt màu sạch, `2³ = ?` đã hiện.
- 6.5: đã có 5–6 khối; 7.2: đủ 8 khối thành khối 2×2×2, `= 8` vàng, dấu EASY, mặt nhếch mép.

- [ ] **Step 5: Kiểm Review Focus #5 — tóc tách khỏi nền**

Run:
```bash
python3 - <<'EOF'
from PIL import Image
im = Image.open('out/check/p0102/t_5.40.png').convert('L')
# vùng tóc (đỉnh đầu) và nền ngay cạnh trái — toạ độ theo FACE_X/FACE_Y ở P02
hair = [im.getpixel((x, y)) for x in range(1180, 1300, 4) for y in range(330, 380, 4)]
bg   = [im.getpixel((x, y)) for x in range(900, 960, 4) for y in range(330, 380, 4)]
d = sum(hair)/len(hair) - sum(bg)/len(bg)
print(f'chênh sáng tóc - nền = {d:.1f}'); assert abs(d) >= 25, 'tóc chìm vào nền — tăng quầng sau đầu (backdrop haloY/glow)'
EOF
```
Expected: in chênh ≥ 25. Nếu toạ độ không trúng tóc (nhìn ảnh để chỉnh), sửa toạ độ đo chứ không sửa ngưỡng.

- [ ] **Step 6: Commit**

```bash
git add projects/mv/exp-log/plates/p01-boot.js projects/mv/exp-log/plates/p02-easy.js projects/mv/exp-log/index.html
git rm -q projects/mv/exp-log/plates/p00-probe.js
git commit -m "feat(exp-log): P01 boot + P02 easy"
```

---

### Task 12: P03 `wait` + P04 `factors` (8.00 → 16.48)

**Files:**
- Create: `projects/mv/exp-log/plates/p03-wait.js`, `projects/mv/exp-log/plates/p04-factors.js`
- Modify: `projects/mv/exp-log/index.html` (thêm vào `order`)

**Interfaces:**
- Consumes: như Task 11, cộng `fillWord` (Task 9), `CUE.drop`.
- Mốc cảnh: P03 = `tl.at('Two to the root two?')`, P04 = `tl.at('Two times two times two,')`.

**Spec (TREATMENT P03, P04):**
- P03: `2^√2`; khối thứ hai chỉ hiện 41% → 4.1% → 0.41% và vỡ; chuỗi `1.41421356…` chảy ra khỏi khung. 9.68 "Wait." → đông cứng, đỏ, nhân vật `startled` vào bằng `rows`. 10.98–11.80: chỉ còn `?` đỏ rung nhẹ.
- P04: 11.80 chữ `2` khổng lồ hiện một mình (chưa nhạc); 12.24 `×` rung; **12.52 drop — cắt cứng**: chữ `2` thứ hai đập xuống, khung sáng bừng; 13.18 `2` thứ ba; 13.46 nhân vật `crossed` vào (transit `grid`) bên trái; 14.26 ba chữ 2 thu nhỏ bay lên thành số mũ `2³`; 15.60 nhãn **POWER** (ruột `2·2·2 = 8 · 2³ = 8`) dán vào chữ ³.

- [ ] **Step 1: `p03-wait.js`**

```js
// P03 wait — "2^√2 — kẹt" · 8.00 → 11.80 (TREATMENT P03)
import { W, H, clamp, prog, hash } from '../../../../engine/lib.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { drawTransit, presence } from '../../../../engine/transit.js';
import { PAL } from '../song.js';

const DIGITS = '1.41421356237309504880168872420969807856967187537694';

export default class P03 {
  backdrop = { glow: 0.7 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.q = s.tl.line('Two to the root two?'); this.wait = s.tl.line('Wait.');
    this.verse = s.tl.at('Two times two times two,');
  }
  render(g, t) {
    const frozen = t >= this.wait.start;
    const tt = frozen ? this.wait.start : t;                   // "Wait." đông cứng mọi chuyển động
    const hot = frozen ? PAL.block : PAL.fwd;
    decodeLine(g, this.tl.wordsOf(this.q), t, 180, 200, { font: '500 34px "IBM Plex Mono"', colBase: PAL.truth, colKey: hot, keys: ['root'] });
    g.font = '900 150px "Archivo"'; g.fillStyle = PAL.truth; g.fillText('2', 180, 400);
    g.font = '900 80px "Archivo"'; g.fillStyle = hot; g.fillText('√2', 270, 330);
    // khối 1 đặc, khối thứ hai chỉ hiện một phần 0.41 → 0.041 → 0.0041 rồi vỡ
    g.fillStyle = PAL.fwd; g.fillRect(180, 560, 160, 160);
    const stage = Math.min(2, Math.floor(prog(tt, this.q.start + 0.4, this.q.end + 0.2) * 3));
    const frac = [0.41, 0.041, 0.0041][stage];
    g.fillStyle = hot; g.fillRect(360, 560, 160 * frac, 160);
    for (let i = 0; i < 24 && stage === 2; i++) {             // vụn
      const f = prog(tt, this.q.end, this.q.end + 0.6);
      g.globalAlpha = 1 - f; g.fillRect(362 + hash(i) * 30, 560 + hash(i + 9) * 160 + f * 200 * hash(i + 3), 5, 5);
    }
    g.globalAlpha = 1;
    // chuỗi chữ số của √2 chảy ra khỏi khung
    const n = Math.floor(prog(tt, this.q.start + 0.3, this.wait.start) * DIGITS.length);
    g.font = '500 30px "IBM Plex Mono"'; g.fillStyle = hot;
    g.fillText(DIGITS.slice(0, n), 560 - Math.max(0, n * 18 - 1300), 650);
    // "Wait." — nhân vật startled vào bằng rows; sau hết câu chỉ còn '?' rung
    if (frozen) {
      const p = presence(t, this.wait.start, this.verse - 0.3, { inDur: 0.3, outDur: 0.25 });
      if (p.state === 'in') drawTransit(g, this.m, 'startled', 1400, 1060, 820, 'rows', 'in', p.k, { t, seed: 3 });
      else if (p.state === 'hold') this.m.draw(g, 'startled', 1400, 1060, 820, { ring: 0, shadow: false });
      else if (p.state === 'out') drawTransit(g, this.m, 'startled', 1400, 1060, 820, 'rows', 'out', p.k, { t, seed: 3 });
      decodeLine(g, this.tl.wordsOf(this.wait), t, 1000, 180, { font: '900 120px "Archivo"', colBase: PAL.block, colKey: PAL.block });
      if (t >= this.wait.end) {
        const j = Math.sin(t * 40) * 3;
        g.font = '900 220px "Archivo"'; g.fillStyle = PAL.block; g.fillText('?', 900 + j, 640);
      }
    }
  }
}
```

- [ ] **Step 2: `p04-factors.js`**

```js
// P04 factors — "Ba thừa số" · 11.80 → 16.48, cắt cứng ở 12.52 (TREATMENT P04)
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { drawTransit, presence } from '../../../../engine/transit.js';
import { fillWord } from '../../../../engine/fill.js';
import { PAL, CUE } from '../song.js';

const XS = [560, 960, 1360], Y = 640;

export default class P04 {
  backdrop = { glow: 1 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('Two times two times two,');
    this.l2 = s.tl.line('yeah, I know that game.');
    this.l3 = s.tl.line('Three little factors,');
    this.l4 = s.tl.line('power gets the name.');
    const w = this.l1.words;                                    // two times two times two
    this.hits = [w[0].start, CUE.drop, w[4].start];             // chữ 2 thứ hai rơi ĐÚNG drop
    this.timesT = [w[1].start, w[3].start];
    this.next = s.tl.at('But root two on top—');                 // nhân vật tan trước P05
  }
  render(g, t) {
    // trước drop: chưa có nhạc — nền tối hẳn (backdrop vẫn vẽ, ta phủ mờ lên)
    if (t < CUE.drop) { g.fillStyle = 'rgba(11,15,30,0.7)'; g.fillRect(0, 0, 1920, 1080); }
    // loé khi drop
    const flash = 1 - smooth(prog(t, CUE.drop, CUE.drop + 0.25));
    if (t >= CUE.drop && flash > 0) { g.fillStyle = `rgba(255,227,163,${0.35 * flash})`; g.fillRect(0, 0, 1920, 1080); }
    // ba chữ 2 → thu nhỏ bay lên thành số mũ khi "Three little factors"
    const up = smooth(prog(t, this.l3.start, this.l3.start + 0.5));
    this.hits.forEach((ht, i) => {
      if (t < ht) return;
      const f = outBack(clamp((t - ht) / 0.14));
      const x = XS[i] + (1180 + i * 40 - XS[i]) * up, y = Y + (300 - Y) * up;
      const size = 360 * (1 - up) + 90 * up;
      g.save(); g.globalAlpha = clamp(f * 2);
      g.font = `900 ${size.toFixed(0)}px "Archivo"`; g.textAlign = 'center'; g.fillStyle = PAL.truth;
      g.fillText('2', x, y - (1 - f) * 300); g.restore();
    });
    // dấu × giữa các chữ 2, rung khi hát "times"
    this.timesT.forEach((tt, i) => {
      if (t < tt || up > 0.5) return;
      const r = Math.sin((t - tt) * 30) * 6 * (1 - prog(t, tt, tt + 0.3));
      g.font = '900 140px "Archivo"'; g.fillStyle = PAL.fwd; g.textAlign = 'center';
      g.fillText('×', (XS[i] + XS[i + 1]) / 2 + r, Y - 60);
    });
    // 2³ = 8 khi đã thành số mũ
    if (up > 0.6) {
      g.globalAlpha = smooth(prog(up, 0.6, 1));
      g.font = '900 300px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'left'; g.fillText('2', 900, 560);
      g.font = '900 150px "Archivo"'; g.fillStyle = PAL.fwd; g.fillText('3', 1080, 380);
      g.globalAlpha = 1;
    }
    // POWER — nhãn dán vào chữ ³
    if (t >= this.l4.start) {
      const s = outBack(clamp((t - this.l4.start) / 0.2));
      g.save(); g.translate(1240, 250); g.scale(s, s); g.rotate(-0.06);
      fillWord(g, 'POWER', 0, 0, { font: '900 130px "Archivo"', inner: ['2·2·2 = 8', '2³ = 8', 'three little factors'], drift: t * 90 });
      g.restore();
    }
    // nhân vật khoanh tay, vào bằng 'grid' khi "yeah, I know that game"
    const p = presence(t, this.l2.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    if (p.state === 'in') drawTransit(g, this.m, 'crossed', 260, 1060, 700, 'grid', 'in', p.k, { t, seed: 4 });
    else if (p.state === 'hold') this.m.draw(g, 'crossed', 260, 1060, 700, { ring: 0, shadow: false });
    else if (p.state === 'out') drawTransit(g, this.m, 'crossed', 260, 1060, 700, 'grid', 'out', p.k, { t, seed: 4 });
    // lời đọc ở chân khung
    const l = this.tl.lineAt(t);
    if (l) decodeLine(g, this.tl.wordsOf(l), t, 960, 1000, { align: 'center', font: '800 56px "Archivo"', colBase: PAL.truth, colKey: PAL.fwd, keys: ['two', 'three', 'power'] });
  }
}
```

- [ ] **Step 3: Nối vào `index.html`**

```js
import P03 from './plates/p03-wait.js';
import P04 from './plates/p04-factors.js';
```
`order: [[0, P01], [tl.at('Two to the three?'), P02], [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04]],`

- [ ] **Step 4: Chụp và NHÌN — ảnh tĩnh**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 8.5,9.3,9.9,11.2,11.9,12.53,12.8,13.3,14.0,14.9,15.9 --outdir out/check/p0304`
Expected:
- 8.5–9.3: `2^√2`, khối thứ hai hụt, chữ số √2 chảy dài.
- 9.9: mọi thứ đỏ, đứng im, chữ WAIT, nhân vật startled đang hiện bằng hàng ký hiệu.
- 11.2: `?` đỏ.
- 11.9: tối, một chữ `2` khổng lồ đứng một mình.
- 12.53: loé sáng, chữ `2` thứ hai đập xuống.
- 13.3: ba chữ 2 và hai dấu ×.
- 14.0: nhân vật khoanh tay bên trái (ảnh màu sạch).
- 14.9: các chữ 2 đang bay lên thành số mũ; 15.9: `2³` + nhãn POWER lấp ruột chữ nhỏ.

- [ ] **Step 5: Chụp chuỗi quanh drop, kiểm không có cắt cứng ngoài 12.52**

Run:
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 \
  --t $(python3 -c "print(','.join(f'{9.5+i/6:.2f}' for i in range(30)))") --outdir out/check/seq-drop
montage out/check/seq-drop/t_*.png -tile 6x5 -geometry 320x180+2+2 out/check/seq-drop.jpg
```
Expected (nhìn `seq-drop.jpg`): nhân vật startled vào qua các khung ký hiệu (không bật ra đột ngột); cú đổi cảnh duy nhất đột ngột là quanh 12.5 (drop).

- [ ] **Step 6: Commit**

```bash
git add projects/mv/exp-log/plates/p03-wait.js projects/mv/exp-log/plates/p04-factors.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P03 wait + P04 factors with the true drop at 12.52"
```

---

### Task 12b: đồ nghề `kit.js` + P05 `rootwall` + P06 `deeper` (16.50 → 25.38)

**Files:**
- Create: `projects/mv/exp-log/kit.js`, `projects/mv/exp-log/plates/p05-rootwall.js`, `projects/mv/exp-log/plates/p06-deeper.js`
- Modify: `projects/mv/exp-log/index.html` (thêm vào `order`)

**Interfaces:**
- Consumes: như Task 12 (`decodeLine`, `drawTransit`, `presence`, `PAL`, `beat.beatPulse`).
- Produces (`projects/mv/exp-log/kit.js`): `powText(g, parts, x, y, size, {col, expCol, align}) → width`, `AXIS = { y: 840, x0: 780, ux: 260, uy: 80, marks }`, `axisX(v)`, `axisY(h)`, `markLabel(v)`, `figure(g, m, pose, x, y, h, kind, p, {t, seed})`, `footer(g, tl, t, keys)`.
- Mốc cảnh: P05 = `tl.at('But root two on top—')`, P06 = `tl.at('So maybe the meaning')`.

**Spec (TREATMENT P05, P06):**
- P05: 16.50 `√2` leo lên ghế số mũ, `³` bị hất rơi; 17.42 bộ đếm "× how many times?" chạy 1 → 1.4 → 1.41 → … không dừng; 18.42 chuỗi `2 × 2 × 2` cố lặp, dấu × thứ hai **gãy đôi** màu đỏ; 19.52 chữ số của bộ đếm rơi lả tả như mảnh vỡ. Nhân vật `slump` vào bằng `rows` ở "Can't", tan trước khi sang P06.
- P06: 20.62 camera lao xuyên đường hầm chữ `COUNT · IIII · COUNT`; 22.82 dưới đáy là **mặt trời làm bằng phương trình** — lõi vàng `aᵐ · aⁿ = aᵐ⁺ⁿ`, tia là các dòng chữ nhỏ `2³·2² = 2⁵` …; 23.80 tia toả ra theo beat. Không có nhân vật.

- [ ] **Step 1: `projects/mv/exp-log/kit.js`**

```js
// Đồ nghề dùng chung của các cảnh exp-log từ P05: luỹ thừa vẽ tay, trục số mũ,
// nhân vật vào/ra, lời ở chân khung. Thuần theo t như mọi hàm vẽ khác.
import { decodeLine } from '../../../engine/lyric.js';
import { drawTransit } from '../../../engine/transit.js';
import { PAL } from './song.js';

// Luỹ thừa vẽ tay: số mũ là chữ nhỏ nâng lên — không dựa vào glyph ᵐ ⁿ của font.
// parts: chuỗi thường hoặc [cơ số, số mũ]. Trả về bề rộng đã vẽ.
export function powText(g, parts, x, y, size, { col = PAL.truth, expCol = PAL.fwd, align = 'center' } = {}) {
  const big = `900 ${Math.round(size)}px "Archivo"`, small = `900 ${Math.round(size * 0.55)}px "Archivo"`;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  const segs = []; let w = 0;
  for (const p of parts) {
    const [b, e] = typeof p === 'string' ? [p, ''] : p;
    g.font = big; const wb = g.measureText(b).width;
    g.font = small; const we = e ? g.measureText(e).width + size * 0.06 : 0;
    segs.push({ b, e, x: w, wb }); w += wb + we;
  }
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  for (const s of segs) {
    g.font = big; g.fillStyle = col; g.fillText(s.b, x0 + s.x, y);
    if (s.e) { g.font = small; g.fillStyle = expCol; g.fillText(s.e, x0 + s.x + s.wb + size * 0.03, y - size * 0.42); }
  }
  g.restore();
  return w;
}

// Trục số mũ dùng chung P07 (số mũ rơi xuống xếp hàng) và P08 (cột 2ⁿ).
// Tỉ lệ THẬT theo x để đường cong 2ˣ ở P08 đi qua đúng đỉnh cột.
export const AXIS = { y: 840, x0: 780, ux: 260, uy: 80, marks: [-2, -1, 0, 0.5, 1, 2, 3] };
export const axisX = (v) => AXIS.x0 + v * AXIS.ux;
export const axisY = (h) => AXIS.y - h * AXIS.uy;             // h = chiều cao cột theo đơn vị
export const markLabel = (v) => (v === 0.5 ? '½' : v < 0 ? `−${-v}` : `${v}`);

// Nhân vật: vào bằng ký hiệu → đứng đặc (alpha 1) → ra bằng ký hiệu. Không cắt cứng.
export function figure(g, m, pose, x, y, h, kind, p, { t, seed = 0 } = {}) {
  if (p.state === 'in') drawTransit(g, m, pose, x, y, h, kind, 'in', p.k, { t, seed });
  else if (p.state === 'hold') m.draw(g, pose, x, y, h, { ring: 0, shadow: false });   // khớp drawTransit: không bóng
  else if (p.state === 'out') drawTransit(g, m, pose, x, y, h, kind, 'out', p.k, { t, seed });
}

// Lời đang hát ở chân khung — giống P04.
export function footer(g, tl, t, keys) {
  const l = tl.lineAt(t);
  if (l) decodeLine(g, tl.wordsOf(l), t, 960, 1000, { align: 'center', font: '800 56px "Archivo"', colBase: PAL.truth, colKey: PAL.fwd, keys });
}
```

- [ ] **Step 2: `p05-rootwall.js`**

```js
// P05 rootwall — "Không nhân 1.414 lần được" · 16.50 → 20.62 (TREATMENT P05)
import { clamp, prog, hash, outBack } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';

const DIGITS = '1.41421356237309504880168872420969807856967187537694';
const CHAIN = ['2', '×', '2', '×', '2'];         // phần tử 3 (× thứ hai) sẽ gãy
const CX = 200, CY = 820, CSTEP = 140;

export default class P05 {
  backdrop = { glow: 0.8, haloX: 760, haloY: 480 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('But root two on top—');
    this.l2 = s.tl.line('how many times is that?');
    this.l3 = s.tl.line("Can't repeat multiplication");
    this.l4 = s.tl.line('one-point-four-one-four like that.');
    this.snap = this.l3.words[2].start;           // "multiplication": dấu × thứ hai gãy đôi
    this.next = s.tl.at('So maybe the meaning');
  }
  // số lần nhân đang đếm: 1 → 1.4 → 1.41 → … không bao giờ dừng
  count(t) { return DIGITS.slice(0, Math.min(DIGITS.length, 1 + Math.floor(Math.max(0, t - this.l2.start) / 0.14))); }
  render(g, t) {
    const { l1, l2, l3, l4 } = this;
    g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    // cơ số 2 khổng lồ
    g.font = '900 360px "Archivo"'; g.fillStyle = PAL.truth; g.fillText('2', 560, 620);
    // ³ cũ bị hất khỏi ghế số mũ, rơi xoay ra khỏi khung
    const fall = prog(t, l1.start + 0.12, l1.start + 0.9);
    if (fall < 1) {
      g.save(); g.translate(830 + 160 * fall, 300 + 900 * fall * fall); g.rotate(fall * 2.4);
      g.font = '900 170px "Archivo"'; g.fillStyle = PAL.truth; g.fillText('3', -45, 60); g.restore();
    }
    // √2 leo lên ngồi vào chỗ số mũ
    const up = outBack(clamp((t - l1.start) / 0.45));
    g.font = '900 170px "Archivo"'; g.fillStyle = t >= this.snap ? PAL.block : PAL.fwd;
    g.fillText('√2', 800, 340 + (1 - up) * 480);
    // bộ đếm số lần nhân, góc trên phải — chạy mãi, tới "one-point-four…" thì vỡ
    if (t >= l2.start && t < l4.start) {
      const s = this.count(t), shown = s.length > 14 ? '…' + s.slice(-13) : s;
      g.strokeStyle = t >= this.snap ? PAL.block : PAL.fwd; g.lineWidth = 4; g.strokeRect(1160, 130, 680, 150);
      g.font = '500 30px "IBM Plex Mono"'; g.fillStyle = PAL.truth; g.fillText('× how many times?', 1180, 120);
      g.font = '500 72px "IBM Plex Mono"'; g.fillStyle = t >= this.snap ? PAL.block : PAL.fwdCore;
      g.fillText(shown, 1190, 232);
    }
    // chuỗi 2 × 2 × 2 cố lặp lại; dấu × thứ hai gãy đôi, màu đỏ
    CHAIN.forEach((c, i) => {
      const ti = l3.start + i * 0.08;
      if (t < ti) return;
      const x = CX + i * CSTEP, drop = outBack(clamp((t - ti) / 0.16));
      g.font = '900 120px "Archivo"'; g.textAlign = 'center';
      if (i === 3 && t >= this.snap) {
        const k = outBack(clamp((t - this.snap) / 0.35));
        for (const side of [-1, 1]) {
          g.save();
          g.translate(x + side * 50 * k, CY - 40 + 90 * k * k); g.rotate(side * 0.5 * k); g.translate(-x, -(CY - 40));
          g.beginPath(); g.rect(side < 0 ? x - 80 : x, CY - 130, 80, 170); g.clip();
          g.fillStyle = PAL.block; g.fillText('×', x, CY); g.restore();
        }
      } else {
        g.fillStyle = c === '×' ? PAL.fwd : PAL.truth;
        g.fillText(c, x, CY - (1 - drop) * 120);
      }
    });
    // "one-point-four-one-four": chữ số của bộ đếm rơi lả tả như mảnh vỡ
    if (t >= l4.start) {
      const s = this.count(l4.start), dt = t - l4.start;
      g.font = '500 72px "IBM Plex Mono"'; g.textAlign = 'center';
      for (let i = 0; i < Math.min(s.length, 14); i++) {
        const vx = (hash(i + 3) - 0.5) * 500, vy = -200 - hash(i + 11) * 300;
        g.save(); g.translate(1215 + i * 43 + vx * dt, 210 + vy * dt + 1500 * dt * dt);
        g.rotate((hash(i + 7) - 0.5) * 8 * dt);
        g.fillStyle = i % 3 === 0 ? PAL.block : PAL.fwdCore; g.fillText(s[i], 0, 0); g.restore();
      }
    }
    g.restore();
    // nhân vật gục xuống khi "Can't", vào bằng rows; tan trước khi sang P06
    const p = presence(t, l3.start, this.next - 0.5, { inDur: 0.3, outDur: 0.45 });
    figure(g, this.m, 'slump', 1560, 1060, 700, 'rows', p, { t, seed: 5 });
    footer(g, this.tl, t, ['root', 'times', 'repeat']);
  }
}
```

- [ ] **Step 3: `p06-deeper.js`**

```js
// P06 deeper — "Luật nằm sâu hơn" · 20.62 → 25.38 (TREATMENT P06)
// Đường hầm chữ COUNT lao qua camera → dưới đáy là mặt trời làm bằng phương trình.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { PAL } from '../song.js';
import { powText, footer } from '../kit.js';

const RING = 'COUNT · IIII · COUNT · 1 · 2 · 3 · ';
// tia sáng: mỗi tia là một đẳng thức cùng luật aᵐ·aⁿ = aᵐ⁺ⁿ
const RAYS = ['2³·2² = 2⁵', '2¹·2⁰ = 2¹', '3²·3² = 3⁴', '2⁴·2¹ = 2⁵', '5¹·5¹ = 5²', '2²·2² = 2⁴',
  '10²·10¹ = 10³', '2³·2³ = 2⁶', '7¹·7² = 7³', '2⁵·2² = 2⁷', '3¹·3³ = 3⁴', '2⁰·2⁰ = 2⁰'];
const SX = 960, SY = 470;

export default class P06 {
  backdrop = { glow: 0.5, haloX: SX, haloY: SY };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.dive = s.tl.at('So maybe the meaning');
    this.sun = s.tl.at('Maybe there is one deeper law');
    this.out = s.tl.at('that everything comes out from.');
  }
  // một vòng hầm: khung chữ nhật chữ COUNT ở độ sâu z (z nhỏ = gần camera)
  ring(g, z, i) {
    const sc = 1 / z, hw = 1000 * sc, hh = 560 * sc, size = Math.max(6, 46 * sc);
    g.save(); g.translate(SX, SY);
    g.font = `800 ${size.toFixed(1)}px "Archivo"`; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillStyle = i % 2 ? PAL.fwd : PAL.truth;
    const s = RING.repeat(8), sides = [[0, -hh, hw * 2], [Math.PI / 2, -hw, hh * 2], [Math.PI, -hh, hw * 2], [-Math.PI / 2, -hw, hh * 2]];
    for (const [a, off, len] of sides) {
      g.save(); g.rotate(a); g.translate(-len / 2, off);
      g.beginPath(); g.rect(0, -size, len, size * 2); g.clip();
      g.fillText(s, -((i * 97) % 300) * sc, 0); g.restore();
    }
    g.restore();
  }
  render(g, t) {
    // 1) lao xuống: vòng sinh ở z = 8, lao về camera ngày càng nhanh; ngừng sinh trước mặt trời
    for (let i = 0; i < 40; i++) {
      const born = this.dive + i * 0.1;
      if (born > this.sun - 0.2 || t < born) continue;
      const z = 8 - 5.5 * (t - born) - 1.5 * (t - born) ** 2;
      if (z > 0.18) this.ring(g, z, i);
    }
    if (t < this.sun) return footer(g, this.tl, t, ['meaning', 'count', 'law', 'everything']);
    // 2) mặt trời: lõi vàng bloom + phương trình, bung ra bằng outBack
    const grow = outBack(clamp((t - this.sun) / 0.5));
    const pulse = t >= this.out ? this.beat.beatPulse(t, 0.16) : 0;
    const R = 210 * grow * (1 + 0.08 * pulse);
    g.save();
    const gr = g.createRadialGradient(SX, SY, 0, SX, SY, R * 1.6);
    gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.55, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
    g.fillStyle = gr; g.shadowColor = PAL.fwd; g.shadowBlur = 60;
    g.beginPath(); g.arc(SX, SY, R * 1.6, 0, Math.PI * 2); g.fill();
    g.restore();
    if (grow > 0.3) powText(g, [['a', 'm'], ' · ', ['a', 'n'], ' = ', ['a', 'm+n']], SX, SY + 28, 84 * grow, { col: PAL.bg, expCol: PAL.bg });
    // 3) tia sáng là dòng chữ nhỏ, mọc dần từ lõi ra; từ "everything comes out" thì dài ra theo beat
    const reach = smooth(prog(t, this.sun + 0.2, this.sun + 0.9));
    g.save(); g.font = '500 30px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.textAlign = 'left';
    RAYS.forEach((s, i) => {
      const a = (i / RAYS.length) * Math.PI * 2 - Math.PI / 2 + 0.12 * Math.sin(t * 0.6);
      const n = Math.ceil(s.length * reach);
      if (n <= 0) return;
      g.save(); g.translate(SX, SY); g.rotate(a);
      g.fillStyle = i % 2 ? PAL.fwdCore : PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 12;
      g.fillText(s.slice(0, n), R * 1.35 + 40 * pulse, 0);
      // chùm phát ra theo beat: một bản sao chạy dọc tia rồi ra khỏi khung
      if (t >= this.out) {
        const run = (t - this.out) * 520 + (i % 3) * 180;
        g.fillStyle = PAL.fwdCore; g.fillText(s, R * 1.35 + 360 + (run % 900), 0);
      }
      g.restore();
    });
    g.restore();
    footer(g, this.tl, t, ['meaning', 'count', 'law', 'everything']);
  }
}
```

- [ ] **Step 4: Nối vào `index.html`**

```js
import P05 from './plates/p05-rootwall.js';
import P06 from './plates/p06-deeper.js';
```
`order: [[0, P01], [tl.at('Two to the three?'), P02], [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04], [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06]],`

- [ ] **Step 5: Chụp và NHÌN — ảnh tĩnh**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 16.8,17.9,18.6,19.2,19.9,21.0,22.3,23.2,24.3,25.2 --outdir out/check/p0506`
Expected:
- 16.8: chữ `2` khổng lồ, `√2` vàng ngồi ở chỗ số mũ, `3` đang rơi xoay.
- 17.9: bộ đếm góc trên phải đang chạy chữ số `1.414…`.
- 18.6–19.2: chuỗi `2 × 2 × 2` ở dưới, dấu × thứ hai tách đôi màu đỏ; bộ đếm và `√2` chuyển đỏ; nhân vật gục (slump) bên phải đang hiện/đã đặc.
- 19.9: chữ số rơi lả tả khắp khung.
- 21.0–22.3: đường hầm chữ COUNT nhiều lớp, tâm ở giữa trên, lớp gần to tràn khung.
- 23.2: mặt trời vàng giữa khung, lõi ghi `aᵐ · aⁿ = aᵐ⁺ⁿ` màu tối đọc được, tia chữ nhỏ toả đều 12 hướng.
- 24.3–25.2: tia dài hơn, có bản sao chữ chạy ra ngoài.
Nếu chữ lõi mặt trời không đọc được hoặc hầm chỉ là một mảng: sửa rồi chụp lại — KHÔNG sang bước sau với ảnh xấu.

- [ ] **Step 6: Chuỗi ảnh quanh ranh giới P05→P06**

Run:
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 \
  --t $(python3 -c "print(','.join(f'{18.3+i/6:.2f}' for i in range(30)))") --outdir out/check/seq-p0506
montage out/check/seq-p0506/t_*.png -tile 6x5 -geometry 320x180+2+2 out/check/seq-p0506.jpg
```
Expected (nhìn `seq-p0506.jpg`): nhân vật slump vào và tan bằng ký hiệu (không bật/tắt đột ngột); hầm bắt đầu ngay ở 20.62.

- [ ] **Step 7: Commit**

```bash
git add projects/mv/exp-log/kit.js projects/mv/exp-log/plates/p05-rootwall.js projects/mv/exp-log/plates/p06-deeper.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P05 rootwall + P06 equation sun, shared kit"
```

---

### Task 12c: P07 `law` + P08 `extend` (25.38 → 35.68)

**Files:**
- Create: `projects/mv/exp-log/plates/p07-law.js`, `projects/mv/exp-log/plates/p08-extend.js`
- Modify: `projects/mv/exp-log/song.js` (thêm `brass` vào `CUE`), `projects/mv/exp-log/index.html` (thêm vào `order`)

**Interfaces:**
- Consumes: `kit.js` (Task 12b), `beat.sinceBeat`, `beat.BEAT`, `beat.beatPulse`, `CUE.brass`.
- Mốc cảnh: P07 = `tl.at('Same base multiplying,')`, P08 = `tl.at('Zero has no choice.')`; P08 tan nhân vật trước `tl.at("We didn't pick the meaning.")` (đầu P09, Kế hoạch 2).

**Spec (TREATMENT P07, P08):**
- P07: 25.38 hai cột `2·2·2` và `2·2` sát lại nhập một; 26.38 `³` và `²` trượt vào nhau thành `⁵`; 27.50 phương trình `2³ · 2² = 2⁵` đập như nhịp tim trên beat (kèm đường điện tim vàng); 28.06 các số mũ rải rác rơi xuống và xếp hàng thành trục số `−2 −1 0 ½ 1 2 3`.
- P08: trên trục, cột cao 2ⁿ; 29.24 cột ở 0 đập xuống đúng bằng 1, ổ khoá đóng đúng tiếng brass 29.81; 30.76 cột âm lộn ngược thành ½, ¼ (mũi tên xanh quay đầu); 31.52 cột ½ rút ra dấu √ như rút kiếm; 32.46 con dấu `SAME LAW`; 33.90 **đường cong vàng luồn qua đỉnh mọi cột**, nhân vật `point` vào bằng `rows`.

- [ ] **Step 1: Thêm mốc brass vào `CUE` trong `projects/mv/exp-log/song.js`**

Thêm dòng sau `drop: 12.52,` trong `CUE`:
```js
  brass: 29.81,                                        // brass: nốt nhấn ở "Zero has no choice" — khoá đóng
```

- [ ] **Step 2: `p07-law.js`**

```js
// P07 law — "Giữ luật sống" · 25.38 → 29.24 (TREATMENT P07)
import { W, clamp, prog, hash, outBack, smooth } from '../../../../engine/lib.js';
import { PAL } from '../song.js';
import { powText, footer, AXIS, axisX, markLabel } from '../kit.js';

const ROW = 110, TOP = 330;                     // cột chữ 2 xếp dọc

export default class P07 {
  backdrop = { glow: 0.9 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('Same base multiplying,');
    this.l2 = s.tl.line('exponents combine.');
    this.l3 = s.tl.line('Keep that rule alive');
    this.l4 = s.tl.line('and the rest falls into line.');
  }
  render(g, t) {
    const { l1, l2, l3, l4 } = this;
    // 1) hai cột 2·2·2 và 2·2 sát lại, nhập thành một cột năm chữ 2
    const join = smooth(prog(t, l1.start + 0.2, l1.end));
    const shrink = smooth(prog(t, l2.end - 0.2, l3.start));   // cột co vào phương trình
    if (shrink < 1) {
      g.save(); g.textAlign = 'center'; g.font = '900 100px "Archivo"';
      for (let i = 0; i < 5; i++) {
        const left = i < 3;
        const x0 = left ? 760 : 1160, y0 = TOP + (left ? i : i - 3) * ROW;
        let x = x0 + (960 - x0) * join, y = y0 + (left ? 0 : 3 * ROW) * join;
        x += (960 - x) * shrink; y += (520 - y) * shrink;
        const sz = 100 * (1 - shrink) + 8;
        g.font = `900 ${sz.toFixed(0)}px "Archivo"`;
        g.fillStyle = PAL.truth; g.fillText('2', x, y);
        if (i < 4 && shrink < 0.5) { g.fillStyle = PAL.fwd; g.font = '900 60px "Archivo"'; g.fillText('·', x, y + ROW / 2); }
      }
      g.restore();
      // nhãn 2³ và 2² trên đầu mỗi cột; "exponents combine": ³ và ² trượt vào nhau thành ⁵
      const c = smooth(prog(t, l2.start, l2.start + 0.45));
      if (c < 1) {
        powText(g, [['2', '3']], 760 + 200 * c, TOP - 150 - 40 * c, 90);
        powText(g, [['2', '2']], 1160 - 200 * c, TOP - 150 - 40 * c, 90);
      }
      if (t >= l2.start + 0.45) {
        const s = outBack(clamp((t - l2.start - 0.45) / 0.2));
        g.save(); g.translate(960, TOP - 190); g.scale(s, s);
        powText(g, [['2', '5']], 0, 0, 120); g.restore();
      }
    }
    // 2) "Keep that rule alive": phương trình đập như nhịp tim trên beat, kèm đường điện tim
    if (t >= l3.start - 0.1) {
      const beat = this.beat.beatPulse(t, 0.12);
      const s = outBack(clamp((t - l3.start + 0.1) / 0.25)) * (1 + 0.1 * beat);
      g.save(); g.translate(960, 520); g.scale(s, s);
      powText(g, [['2', '3'], ' · ', ['2', '2'], ' = ', ['2', '5']], 0, 40, 130);
      g.restore();
      // điện tim: chạy từ trái sang, gai nhọn đúng mỗi beat
      g.save(); g.strokeStyle = PAL.fwd; g.lineWidth = 5; g.shadowColor = PAL.fwd; g.shadowBlur = 18;
      g.beginPath();
      const head = W * smooth(prog(t, l3.start, l3.start + 0.7));
      for (let x = 0; x <= head; x += 6) {
        const tx = t - (head - x) / 900;                     // thời điểm điểm này được vẽ
        const ph = this.beat.sinceBeat(tx) / this.beat.BEAT;
        const y = 700 - (ph < 0.08 ? Math.sin(ph / 0.08 * Math.PI) * 110 : ph < 0.14 ? -Math.sin((ph - 0.08) / 0.06 * Math.PI) * 40 : 0);
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke(); g.restore();
    }
    // 3) "the rest falls into line": số mũ rải rác rơi xuống, xếp hàng thành trục số
    if (t >= l4.start) {
      const line = smooth(prog(t, l4.start + 0.5, l4.end));
      g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4;
      g.beginPath(); g.moveTo(axisX(-2.5), AXIS.y); g.lineTo(axisX(-2.5) + (axisX(3.4) - axisX(-2.5)) * line, AXIS.y); g.stroke();
      g.textAlign = 'center'; g.font = '900 64px "Archivo"';
      AXIS.marks.forEach((v, i) => {
        const ti = l4.start + hash(i + 21) * 0.35, f = clamp((t - ti) / 0.5);
        if (t < ti) return;
        const sx = 200 + hash(i + 5) * 1520, sy = -60;                 // rơi từ chỗ rải rác trên trời
        const x = sx + (axisX(v) - sx) * smooth(f), y = sy + (AXIS.y + 70 - sy) * outBack(f);
        g.fillStyle = v < 0 ? PAL.back : PAL.fwd;
        g.save(); g.translate(x, y); g.rotate((1 - f) * (hash(i + 9) - 0.5) * 3); g.fillText(markLabel(v), 0, 0); g.restore();
      });
      g.restore();
    }
    footer(g, this.tl, t, ['same', 'combine', 'rule', 'line']);
  }
}
```

- [ ] **Step 3: `p08-extend.js`**

```js
// P08 extend — "Luật kéo dài" · 29.24 → 35.68 (TREATMENT P08)
// Trục số mũ (tiếp từ P07), trên mỗi mốc một cột cao 2ⁿ; cuối cảnh đường cong 2ˣ luồn qua đỉnh mọi cột.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { PAL, CUE } from '../song.js';
import { powText, figure, footer, AXIS, axisX, axisY, markLabel } from '../kit.js';

const CW = 70;                                   // bề rộng cột

export default class P08 {
  backdrop = { glow: 0.9, haloX: 900, haloY: 560 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.zero = s.tl.line('Zero has no choice.');
    this.neg = s.tl.line('Negative turns around.');
    this.frac = s.tl.line('Fractions pull out roots');
    this.law = s.tl.line('when the same law holds its ground.');
    this.step = s.tl.line('Step by step,');
    this.next = s.tl.at("We didn't pick the meaning.");
  }
  // cột ở mốc v, cao h đơn vị (h < 0: cắm xuống dưới trục)
  col(g, v, h, color, dy = 0) {
    const x = axisX(v) - CW / 2, top = Math.min(AXIS.y, axisY(h)), bot = Math.max(AXIS.y, axisY(h));
    g.fillStyle = color; g.fillRect(x, top + dy, CW, bot - top);
  }
  lock(g, x, y, shut) {                          // ổ khoá: càng khoá hạ xuống khi shut → 1
    g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 10;
    const lift = 34 * (1 - shut), cy = y - 60 - lift;
    g.beginPath(); g.moveTo(x - 26, y - 30 - lift); g.lineTo(x - 26, cy); g.arc(x, cy, 26, Math.PI, 0); g.lineTo(x + 26, y - 30 - lift); g.stroke();
    g.fillStyle = PAL.fwd; g.fillRect(x - 38, y - 30, 76, 58);
    g.fillStyle = PAL.bg; g.fillRect(x - 5, y - 12, 10, 20);
    g.restore();
  }
  render(g, t) {
    const { zero, neg, frac, law, step } = this;
    // trục + nhãn mốc — y hệt khung cuối P07 để hai cảnh nối liền
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4;
    g.beginPath(); g.moveTo(axisX(-2.5), AXIS.y); g.lineTo(axisX(3.4), AXIS.y); g.stroke();
    g.textAlign = 'center'; g.font = '900 64px "Archivo"';
    AXIS.marks.forEach((v) => { g.fillStyle = v < 0 ? PAL.back : PAL.fwd; g.fillText(markLabel(v), axisX(v), AXIS.y + 70); });
    g.restore();
    // cột dương 2¹ 2² 2³ mọc lên ngay đầu cảnh
    [1, 2, 3].forEach((v, i) => {
      const k = outBack(clamp((t - zero.start - 0.1 * i) / 0.4));
      if (k <= 0) return;
      this.col(g, v, 2 ** v * k, PAL.fwd);
      if (k > 0.9) powText(g, [['2', `${v}`]], axisX(v), axisY(2 ** v) - 20, 52);
    });
    // "Zero has no choice": khối cao đúng 1 đập xuống mốc 0, ổ khoá đóng đúng tiếng brass
    const land = outBack(clamp((t - zero.start - 0.2) / 0.3));
    if (land > 0) {
      this.col(g, 0, 1, PAL.truth, -(1 - land) * 900);
      const shut = smooth(prog(t, CUE.brass - 0.18, CUE.brass));
      if (land >= 1) this.lock(g, axisX(0), axisY(1) - 90, shut);
      const ring = prog(t, CUE.brass, CUE.brass + 0.35);
      if (ring > 0 && ring < 1) {
        g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 6 * (1 - ring);
        g.beginPath(); g.arc(axisX(0), axisY(1) - 90, 50 + 140 * ring, 0, Math.PI * 2); g.stroke(); g.restore();
      }
      if (t >= CUE.brass) powText(g, [['2', '0'], ' = 1'], axisX(0) - 50, axisY(1) - 150, 52, { align: 'right' });
    }
    // "Negative turns around": cột âm cắm xuống rồi lộn ngược thành ½, ¼ — mũi tên quay đầu
    if (t >= neg.start) {
      const flip = smooth(prog(t, neg.start + 0.3, neg.start + 0.8));
      [-1, -2].forEach((v, i) => {
        const k = outBack(clamp((t - neg.start - 0.08 * i) / 0.25));
        this.col(g, v, (-(0.8 + 0.5 * i) * (1 - flip) + 2 ** v * flip) * k, PAL.back);
        if (flip >= 1) {
          g.save(); g.textAlign = 'center'; g.font = '900 52px "Archivo"'; g.fillStyle = PAL.backCore;
          g.fillText(v === -1 ? '½' : '¼', axisX(v), axisY(2 ** v) - 22); g.restore();
        }
      });
      const cx = axisX(-1.5), a1 = Math.PI / 2 - Math.PI * flip;         // cung từ dưới vòng lên trên
      g.save(); g.strokeStyle = PAL.back; g.lineWidth = 8; g.shadowColor = PAL.back; g.shadowBlur = 16;
      g.beginPath(); g.arc(cx, AXIS.y, 190, Math.PI / 2, a1, true); g.stroke();
      if (flip > 0.05) {
        const hx = cx + 190 * Math.cos(a1), hy = AXIS.y + 190 * Math.sin(a1);
        g.fillStyle = PAL.back; g.beginPath();
        g.moveTo(hx + 26, hy); g.lineTo(hx - 14, hy - 20); g.lineTo(hx - 14, hy + 20); g.fill();
      }
      g.restore();
    }
    // "Fractions pull out roots": cột ½ cao √2, rút ra một dấu √ như rút kiếm
    if (t >= frac.start) {
      const k = outBack(clamp((t - frac.start) / 0.3));
      this.col(g, 0.5, Math.SQRT2 * k, PAL.fwd);
      const pull = smooth(prog(t, frac.start + 0.3, frac.start + 0.8));
      const top = axisY(Math.SQRT2);
      g.save(); g.textAlign = 'center'; g.font = `900 ${(60 + 60 * pull).toFixed(0)}px "Archivo"`;
      g.fillStyle = PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 30 * pull;
      g.beginPath(); g.rect(axisX(0.5) - 120, 0, 240, top + 4); g.clip();     // lưỡi kiếm mọc lên từ miệng cột
      g.fillText('√', axisX(0.5), top + 70 - 200 * pull);
      g.restore();
      if (pull >= 1) powText(g, [['2', '½'], ' = √2'], axisX(0.5) + 30, top - 190, 48);
    }
    // "the same law holds its ground": con dấu đóng lên góc trái
    if (t >= law.start) {
      const s = 1 + 0.9 * (1 - outBack(clamp((t - law.start) / 0.22)));
      g.save(); g.translate(360, 250); g.rotate(-0.1); g.scale(s, s);
      g.strokeStyle = PAL.fwd; g.lineWidth = 8; g.strokeRect(-250, -95, 500, 190);
      g.font = '500 30px "IBM Plex Mono"'; g.fillStyle = PAL.fwdCore; g.textAlign = 'center'; g.fillText('SAME LAW', 0, -45);
      powText(g, [['a', 'm'], ' · ', ['a', 'n'], ' = ', ['a', 'm+n']], 0, 55, 64);
      g.restore();
    }
    // "Step by step": đường cong vàng luồn qua đỉnh mọi cột — đường cong mũ ra đời
    if (t >= step.start) {
      const k = smooth(prog(t, step.start, step.start + 1.6)), v0 = -2.45, v1 = v0 + (3.05 - v0) * k;
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 8; g.shadowColor = PAL.fwd; g.shadowBlur = 28; g.lineJoin = 'round';
      g.beginPath();
      for (let v = v0; v <= v1; v += 0.02) { const x = axisX(v), y = axisY(2 ** v); v === v0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(axisX(v1), axisY(2 ** v1), 12, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    // nhân vật chỉ theo đường cong, vào bằng rows; tan trước khi sang P09
    const p = presence(t, step.start, this.next - 0.5, { inDur: 0.3, outDur: 0.45 });
    figure(g, this.m, 'point', 1740, 1060, 580, 'rows', p, { t, seed: 8 });   // rộng ~370px: không tràn mép phải
    footer(g, this.tl, t, ['zero', 'negative', 'roots', 'law', 'step']);
  }
}
```

- [ ] **Step 4: Nối vào `index.html`**

```js
import P07 from './plates/p07-law.js';
import P08 from './plates/p08-extend.js';
```
`order: [[0, P01], [tl.at('Two to the three?'), P02], [tl.at('Two to the root two?'), P03], [tl.at('Two times two times two,'), P04], [tl.at('But root two on top—'), P05], [tl.at('So maybe the meaning'), P06], [tl.at('Same base multiplying,'), P07], [tl.at('Zero has no choice.'), P08]],`

- [ ] **Step 5: Chụp và NHÌN — ảnh tĩnh**

Run: `node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 25.9,26.9,27.9,28.9,29.5,30.1,31.3,32.2,33.2,34.6,35.5 --outdir out/check/p0708`
Expected:
- 25.9: hai cột chữ 2 đang sát vào giữa, nhãn `2³` `2²` phía trên.
- 26.9: nhãn `2⁵` vừa đập ra.
- 27.9: phương trình `2³ · 2² = 2⁵` lớn giữa khung, đường điện tim vàng có gai.
- 28.9: nhãn trục `−2 −1 0 ½ 1 2 3` xếp hàng trên một đường trắng.
- 29.5: cột 2¹ 2² 2³ vàng, khối trắng ở 0 cao đúng 1 nấc, ổ khoá còn mở. 30.1: khoá đã đóng, nhãn `2⁰ = 1`.
- 31.3: hai cột xanh bên trái thấp (½, ¼), mũi tên xanh vòng lên.
- 32.2: cột ở ½ có dấu √ sáng mọc lên phía trên, nhãn `2^½ = √2`.
- 33.2: con dấu SAME LAW nghiêng ở góc trái trên.
- 34.6: đường cong vàng phát sáng đi qua đỉnh các cột (đỉnh cột phải CHẠM đường cong); nhân vật point bên phải.
- 35.5: nhân vật đang tan thành ký hiệu.
Không có chữ/nhãn đè lên nhau đến mức không đọc được; nếu có, dời toạ độ nhãn rồi chụp lại.

- [ ] **Step 6: Chuỗi ảnh P06→P08**

Run:
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 \
  --t $(python3 -c "print(','.join(f'{27.8+i/6:.2f}' for i in range(30)))") --outdir out/check/seq-p0708
montage out/check/seq-p0708/t_*.png -tile 6x5 -geometry 320x180+2+2 out/check/seq-p0708.jpg
```
Expected: khung cuối P07 và khung đầu P08 có trục + nhãn ở cùng chỗ (nối liền, không nhảy).

- [ ] **Step 7: Commit**

```bash
git add projects/mv/exp-log/song.js projects/mv/exp-log/plates/p07-law.js projects/mv/exp-log/plates/p08-extend.js projects/mv/exp-log/index.html
git commit -m "feat(exp-log): P07 law heartbeat + P08 exponent axis and the 2^x curve"
```

---

### Task 13: Render lát cắt 0–35.68s, đo, kiểm tất định

**Files:**
- Create: `out/exp-log-slice.mp4` (không commit — `out/` bị ignore)

- [ ] **Step 1: Render có tiếng**

Run:
```bash
node engine/render/shoot.js video --page projects/mv/exp-log/index.html --dur 239.65 --from 0 --to 35.68 \
  --audio projects/mv/exp-log/audio/song.m4a --out out/exp-log-slice.mp4
```
Expected: file ~35.7s, 1920×1080, 60fps, có tiếng. Kiểm: `ffprobe -v error -show_entries stream=width,height,r_frame_rate:format=duration -of compact out/exp-log-slice.mp4`

- [ ] **Step 2: Tự chấm**

Run: `node tools/review.mjs out/exp-log-slice.mp4 projects/mv/exp-log`
Expected: đọc kết quả; YDIF trung vị ≥ 1.5 ở 640×360. Biên độ sáng có thể chưa đạt ở lát cắt này (đảo nền giấy nằm ở 125s) — ghi lại, không sửa.

- [ ] **Step 3: Kiểm tất định (Review Focus #2)**

Run:
```bash
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 2.4,5.9,9.9,12.6,15.9,18.5,23.0,26.5,30.8,34.5 --outdir out/det/a
node engine/render/shoot.js stills --page projects/mv/exp-log/index.html --dur 239.65 --t 34.5,30.8,26.5,23.0,18.5,15.9,12.6,9.9,5.9,2.4 --outdir out/det/b
(cd out/det/a && md5sum *.png) > /tmp/a.md5; (cd out/det/b && md5sum *.png) > /tmp/b.md5; diff /tmp/a.md5 /tmp/b.md5 && echo "TẤT ĐỊNH OK"
```
Expected: `TẤT ĐỊNH OK`. Nếu khác: tìm `Math.random`/`Date.now`/`performance.now` trong `engine/` và `projects/mv/exp-log/plates/` (`grep -rn "Math.random\|Date.now\|performance.now" engine projects/mv/exp-log/plates` — chỉ được phép trong vòng preview của `index.html`).

- [ ] **Step 4: Xem 6fps toàn lát cắt và zoom chất liệu**

Run:
```bash
ffmpeg -v error -y -i out/exp-log-slice.mp4 -vf "fps=6,scale=320:-1,tile=15x15" -frames:v 1 out/check/slice-6fps.jpg
ffmpeg -v error -y -ss 2.5 -i out/exp-log-slice.mp4 -frames:v 1 -vf "crop=240:135:1180:360,scale=960:540:flags=neighbor" out/check/zoom-ascii.png
```
Expected: `slice-6fps.jpg` — mạch cảnh đọc được khi tắt tiếng (máy khởi động → 2³ dễ → 2^√2 kẹt → drop → 2³ POWER → √2 tường chắn → mặt trời định luật → gộp mũ → trục mở rộng + đường cong 2ˣ). `zoom-ascii.png` — ký hiệu toán thật, có màu tóc/da.

- [ ] **Step 5: Chạy toàn bộ test lần cuối và commit mọi thứ còn lại**

Run: `node --test tools/test/*.test.mjs && git status --short`
Expected: PASS toàn bộ; không còn file chưa commit ngoài `out/`.

- [ ] **Step 6: Gửi người dùng**

Báo cáo: đường dẫn `out/exp-log-slice.mp4`, ảnh `out/check/slice-6fps.jpg`, kết quả `review.mjs`, và câu hỏi duyệt trước khi viết Kế hoạch 2.
