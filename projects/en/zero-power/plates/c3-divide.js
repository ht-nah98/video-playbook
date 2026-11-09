// c3 · Or divide (p2) — hai đường cùng về một ô: đường 1 (trái) "ANY N ≠ 0: N ÷ N = 1" → A^M ÷ A^M = 1; đường 2 (phải) luật chia
//   lũy thừa A^M ÷ A^M = A^M−M = A^0; hai đường chấm lam đổ xuống cùng ô "A^0 = 1" ("TWO ROADS, SAME PLACE"). Không mascot.
import { C, prog, ground, ink, card, dm, dmW, dots, annunciators, lookup, must } from '../kit.js';

/** Một dòng ma trận điểm ghép từ nhiều khúc, mỗi khúc gõ vào trong [a, b] (bám từ đọc). Trả về mảng x bắt đầu từng khúc. */
function seq(d, parts, x, y, p, t, color = C.ink) {
  let cx = x; const xs = [];
  for (const [s, a, b] of parts) {
    const r = typeof s === 'string' ? [[s, color]] : s;
    xs.push(cx);
    dm(d, r, cx, y, p, color, { k: prog(t, a, Math.max(a + 0.12, b)) });
    cx += dmW(r, p) + p;
  }
  xs.push(cx); return xs;
}
/** Khung chấm chữ nhật. k vẽ dần cả bốn cạnh. */
function dotBox(d, x0, y0, x1, y1, col, { step = 12, size = 5, k = 1 } = {}) {
  const per = 2 * (x1 - x0 + y1 - y0); let left = per * k;
  for (const [a, b, c, e] of [[x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]]) {
    const L = Math.hypot(c - a, e - b), kk = Math.min(1, left / L); left -= L;
    if (kk > 0) dots(d, a, b, c, e, col, { step, size, k: kk });
  }
}
const one = s => [[s, C.one]];

export default class Divide {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      another: w(26, 'another'), thing: w(26, 'thing'),
      any: w(27, 'any'), number: w(27, 'number'), divided: w(27, 'divided'), by27: w(27, 'by'), itself: w(27, 'itself'), is27: w(27, 'is'), one27: w(27, 'one'),
      a27: w(27, 'a'), m27: w(27, 'm'), divided2: w(27, 'divided', 2), a27b: w(27, 'a', 2), m27b: w(27, 'm', 2), is27b: w(27, 'is', 2), one27b: w(27, 'one', 2),
      division: w(28, 'division'), powers: w(28, 'powers'), a28: w(28, 'a'), m28: w(28, 'm'), divided28: w(28, 'divided'),
      a28b: w(28, 'a', 2), m28b: w(28, 'm', 2), is28: w(28, 'is'), a28c: w(28, 'a', 3), minus: w(28, 'minus'), m28d: w(28, 'm', 4),
      thats: w(28, "that's"), a28d: w(28, 'a', 4), zero28: w(28, 'zero'),
      two: w(29, 'two'), roads: w(29, 'roads'), same: w(29, 'same'), place: w(29, 'place'), a29: w(29, 'a'), zero29: w(29, 'zero'),
      is29: w(29, 'is'), one29: w(29, 'one'), e29: L(29).end,
    };
    this.START = L(26).start;
    this.FROM = this.START - 1.2;
    this.V = { nn: must('7 ÷ 7', 1), mm: must('2^3 ÷ 2^3', 1), mm0: must('2^(3−3)', 1), z: must('3 − 3', 0) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.divided, kind: 'beep' },     // đường 1: N ÷ N
      { t: T.one27b, kind: 'beep' },      // A^M ÷ A^M = 1
      { t: T.minus, kind: 'beep' },       // đường 2: A^M−M
      { t: T.one29, kind: 'beep' },       // hai đường về ô A^0 = 1 (correct đã hết trần cả video)
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT II', 'OR DIVIDE');
      const X1 = 132, X2 = 1010, p = 9, ya = 268, yb = 352, yc = 462;
      const box = [600, 640, 1320, 824];                 // ô đích (x0, y0, x1, y1)
      // ô chờ: hai cột đường + ô đích (viền đứt mờ) có sẵn từ FROM + 0.3
      const k0 = prog(t, this.FROM + 0.3, this.FROM + 0.9), faint = `rgba(${C.inkRGB},0.2)`;
      if (t < T.a27) dots(d, X1, 430, X1 + 640, 430, faint, { step: 12, k: k0 });
      if (t < T.a28) dots(d, X2, 430, X2 + 680, 430, faint, { step: 12, k: k0 });
      const sure = prog(t, T.same - 0.05, T.place + 0.2);
      dotBox(d, ...box, sure > 0 ? C.ink : faint, { step: 12, size: sure > 0 ? 6 : 4, k: k0 });
      // câu 26: cách khác, cùng một điều
      if (t > T.another - 0.3) dm(d, 'ANOTHER WAY · SAME THING', X1, 156, 6, C.dim, { k: prog(t, T.another - 0.2, T.thing + 0.3) });
      // câu 27: đường 1
      let end1 = null, end2 = null;
      if (t > T.any - 0.2) {
        seq(d, [['ANY N ≠ 0: N', T.any, T.number + 0.2], [' ÷ ', T.divided, T.by27 + 0.1], ['N', T.itself, T.itself + 0.2],
          [' = ', T.is27, T.is27 + 0.1], [one(String(this.V.nn)), T.one27 - 0.04, T.one27 + 0.05]], X1, ya - 4, 5, t, C.dim);
        if (t > T.a27 - 0.2) {
          const xs = seq(d, [['A^M^', T.a27, T.m27 + 0.1], [' ÷ ', T.divided2, T.divided2 + 0.25], ['A^M^', T.a27b, T.m27b + 0.1],
            [' = ', T.is27b, T.is27b + 0.06], [one(String(this.V.mm)), T.one27b - 0.04, T.one27b + 0.05]], X1, yb, p, t);
          end1 = [xs[4] + 2.5 * p, yb + 7 * p + 22];
        }
      }
      // câu 28: đường 2 — luật chia lũy thừa
      if (t > T.division - 0.2) {
        dm(d, 'DIVISION RULE FOR POWERS', X2, ya, 5, C.dim, { k: prog(t, T.division - 0.1, T.powers + 0.3) });
        if (t > T.a28 - 0.2) {
          const xs = seq(d, [['A^M^', T.a28, T.m28 + 0.1], [' ÷ ', T.divided28, T.divided28 + 0.25], ['A^M^', T.a28b, T.m28b + 0.1],
            [' = ', T.is28, T.is28 + 0.1], ['A^M−M^', T.a28c, T.m28d + 0.15]], X2, yb, p, t);
          if (t > T.thats - 0.2) {
            const x2 = seq(d, [['= ', T.thats, T.thats + 0.2], ['A^0^', T.a28d, T.zero28 + 0.1]],
              xs[3] + p * 6, yc, p, t);
            end2 = [x2[1] + 3 * p, yc + 7 * p + 22];
          }
        }
      }
      // câu 29: hai đường chấm lam đổ về cùng ô → A^0 = 1
      if (t > T.two - 0.1 && end1 && end2) {
        const kr = prog(t, T.two - 0.05, T.place + 0.1);
        dots(d, end1[0], end1[1], box[0] + 70, box[1] - 18, C.one, { step: 14, size: 7, k: kr });
        dots(d, end2[0], end2[1], box[2] - 70, box[1] - 18, C.one, { step: 14, size: 7, k: kr });
        const cx = (box[0] + box[2]) / 2, s = [['A^0^', C.ink], [' = ', C.ink], [String(this.V.mm0), C.one]], P = 12;
        const w = dmW(s, P);
        seq(d, [['A^0^', T.a29, T.zero29 + 0.1], [' = ', T.is29, T.is29 + 0.08], [one(String(this.V.mm0)), T.one29 - 0.04, T.one29 + 0.05]],
          cx - w / 2, (box[1] + box[3]) / 2 - 3.5 * P + 30, P, t);
        dm(d, 'TWO ROADS, SAME PLACE', 960, 870, 6, C.ink, { align: 'center', k: prog(t, T.two - 0.05, T.place + 0.4) });
      }
    });
  }
}
