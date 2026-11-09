// c2 · Put in a zero (p2) — hỏi quy tắc về A^0: A^M × A^0 = A^M+0 = A^M · dòng gọn A^M × [A^0] = A^M → "×A^0 CHANGES
//   NOTHING" · dòng khung chấm "A^M ≠ 0 → DIVIDE" (d2 gọi lại ĐÚNG chữ này) · kết A^0 = 1 lam. Câu "hold on": khung chấm
//   đậm lên + "IT MATTERS LATER". Mascot chalk (bên phải) quanh câu quy tắc.
import { C, smooth, prog, ground, ink, card, dm, dmW, dots, annunciators, figure, lookup, must } from '../kit.js';

const X = 132;
/** Một dòng ma trận điểm ghép từ nhiều khúc, mỗi khúc gõ vào trong [a, b] (bám từ đọc). Trả về mảng x bắt đầu từng khúc + .w. */
function seq(d, parts, x, y, p, t, color = C.ink) {
  let cx = x; const xs = [];
  for (const [s, a, b] of parts) {
    const r = typeof s === 'string' ? [[s, color]] : s;
    xs.push(cx);
    dm(d, r, cx, y, p, color, { k: prog(t, a, Math.max(a + 0.12, b)) });
    cx += dmW(r, p) + p;
  }
  xs.push(cx); xs.w = cx - x - p; return xs;
}
/** Khung chấm chữ nhật (ô chờ / khung nhớ). k vẽ dần cả bốn cạnh. */
function dotBox(d, x0, y0, x1, y1, col, { step = 12, size = 5, k = 1 } = {}) {
  const per = 2 * (x1 - x0 + y1 - y0); let left = per * k;
  for (const [a, b, c, e] of [[x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]]) {
    const L = Math.hypot(c - a, e - b), kk = Math.min(1, left / L); left -= L;
    if (kk > 0) dots(d, a, b, c, e, col, { step, size, k: kk });
  }
}

export const FRAME_TEXT = 'A^M^ ≠ 0 → DIVIDE';   // d2 gọi lại đúng dòng này

export default class Zero {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['chalk'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      ask: w(19, 'ask'), zero19: w(19, 'zero'),
      take: w(20, 'take'), a20: w(20, 'a'), isnt20: w(20, "isn't"), zero20: w(20, 'zero'), any2: w(20, 'any', 2), m20: w(20, 'm'),
      says: w(21, 'says'), a21: w(21, 'a'), m21: w(21, 'm'), times21: w(21, 'times'), a21b: w(21, 'a', 2), zero21: w(21, 'zero'),
      eq21: w(21, 'equals'), a21c: w(21, 'a', 3), zero21b: w(21, 'zero', 2), and21: w(21, 'and'), just: w(21, 'just'), m21e: w(21, 'm', 4),
      a22: w(22, 'a'), m22: w(22, 'm'), times22: w(22, 'times'), a22b: w(22, 'a', 2), zero22: w(22, 'zero'), gives: w(22, 'gives'),
      a22c: w(22, 'a', 3), m22b: w(22, 'm', 2),
      whatever: w(23, 'whatever'), multiplying: w(23, 'multiplying'), nothing: w(23, 'nothing'),
      because: w(24, 'because'), a24: w(24, 'a'), divide: w(24, 'divide'), both: w(24, 'both'), it24: w(24, 'it'),
      whats: w(24, "what's"), a24b: w(24, 'a', 2), zero24: w(24, 'zero', 2), eq24: w(24, 'equals'), one24: w(24, 'one'),
      hold: w(25, 'hold'), step: w(25, 'step'), going: w(25, 'going'), later: w(25, 'later'),
    };
    this.START = L(19).start;
    this.FROM = this.START - 1.2;
    this.V = { one: must('7^3 / 7^3', 1), m: must('5 + 0', 5) };
    this.FIG = [this.T.says - 0.2, this.T.gives + 1.0];         // chalk quanh câu quy tắc (≈ 7.6 s)
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.zero19, kind: 'beep' },        // A^0 vào câu hỏi
      { t: T.a21, kind: 'beep' },           // dòng quy tắc với số mũ 0
      { t: T.m21e, kind: 'beep' },          // … = A^M
      { t: T.whatever, kind: 'tick' },      // khoanh × A^0
      { t: T.because, kind: 'tick' },       // khung chấm "A^M ≠ 0 → DIVIDE"
      { t: T.one24, kind: 'correct' },      // A^0 = 1
      { t: T.going, kind: 'tick' },         // "IT MATTERS LATER"
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT II', 'PUT IN A ZERO');
      // câu 19: hỏi quy tắc về A^0 (ô chờ có sẵn từ FROM + 0.3)
      if (t < this.START - 0.1) dots(d, X, 214, X + 700, 214, `rgba(${C.inkRGB},0.22)`, { step: 12, k: prog(t, this.FROM + 0.3, this.FROM + 0.9) });
      else seq(d, [['ASK THE RULE ABOUT ', T.ask - 0.15, T.zero19 - 0.25], ['A^0^', T.zero19 - 0.2, T.zero19 + 0.1]], X, 156, 6, t);
      // câu 20: điều kiện
      if (t > T.take - 0.2) seq(d, [['ANY A', T.take, T.a20 + 0.1], [' ≠ 0', T.isnt20, T.zero20 + 0.1], [' · ANY EXPONENT M', T.any2, T.m20 + 0.15]],
        X, 236, 5, t, C.dim);
      // câu 21: A^M × A^0 = A^M+0 = A^M
      if (t > T.says - 0.3) seq(d, [['A^M^', T.a21, T.m21 + 0.1], [' × ', T.times21, T.times21 + 0.2], ['A^0^', T.a21b, T.zero21 + 0.1],
        [' = ', T.eq21, T.eq21 + 0.2], ['A^M+0^', T.a21c, T.zero21b + 0.15], [' = A^M^', T.and21, T.m21e + 0.1]], X, 334, 10, t);
      // câu 22: dòng gọn A^M × A^0 = A^M; câu 23: khoanh "× A^0" (mực) + CHANGES NOTHING
      if (t > T.a22 - 0.3) {
        const xs = seq(d, [['A^M^', T.a22, T.m22 + 0.1], [' × ', T.times22, T.times22 + 0.2], ['A^0^', T.a22b, T.zero22 + 0.1],
          [' = ', T.gives, T.gives + 0.3], ['A^M^', T.a22c, T.m22b + 0.1]], X, 464, 10, t);
        const kk = prog(t, T.whatever, T.whatever + 0.45);
        if (kk > 0) {
          const x0 = xs[1] + 20, x1 = xs[3] + 22;
          d.strokeStyle = C.ink; d.lineWidth = 4; d.strokeRect(x0, 464 - 46, (x1 - x0) * kk, 70 + 64);
        }
        if (t > T.multiplying - 0.2) dm(d, [['× A^0^', C.ink], [' CHANGES NOTHING', C.ink]], X, 600, 6, C.ink,
          { k: prog(t, T.multiplying - 0.1, T.nothing + 0.3) });
      }
      // câu 24: khung chấm "A^M ≠ 0 → DIVIDE" → ÷ hai vế → A^0 = 1 lam
      const fy = 708, fp = 6, fw = dmW(FRAME_TEXT, fp);
      if (t > T.because - 0.1) {
        const bold = prog(t, T.hold - 0.05, T.hold + 0.4);
        dotBox(d, X - 26, fy - 44, X + fw + 26, fy + 42 + 26, bold > 0 ? C.ink : `rgba(${C.inkRGB},0.55)`,
          { step: 12, size: 5 + 2 * bold, k: prog(t, T.because - 0.1, T.because + 0.5) });
        dm(d, FRAME_TEXT, X, fy, fp, C.ink, { k: prog(t, T.a24, T.divide + 0.3) });
        const nx = X + fw + 70;
        dm(d, 'DIVIDE BOTH SIDES BY A^M^', nx, fy - 10, 4, C.dim, { k: prog(t, T.divide, T.it24 + 0.2) });
        if (t > T.going - 0.2) dm(d, 'IT MATTERS LATER', nx, fy + 42, 4, C.ink, { k: prog(t, T.going - 0.1, T.later + 0.3) });
      }
      if (t > T.whats - 0.2) seq(d, [['A^0^', T.a24b, T.zero24 + 0.1], [' = ', T.eq24, T.eq24 + 0.15], [[[String(V.one), C.one]], T.one24 - 0.04, T.one24 + 0.05]],
        X, 860, 12, t);
    });
    // chalk bên phải (phấn hướng vào bảng) — vào trồi lên, ra chìm xuống đáy
    const [a, b] = this.FIG;
    if (t > a - 0.2 && t < b + 0.6) {
      const out = smooth(prog(t, b, b + 0.5));
      figure(g, 'chalk', 1650, 1080 + out * 820, 760, prog(t, a - 0.2, a + 0.15));
    }
  }
}
