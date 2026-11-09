// d1 · The staircase stops (p2) — MỞ HỒI III. Thẻ hồi "WHEN THE BASE IS ZERO · ANSWERS 3"; "TIDY SO FAR" (2⁰ = 1,
// 10⁰ = 1) → "PUT 0 IN PLACE OF A"; cầu thang 0³ = 0, 0² = 0, 0¹ = 0 (0 gỉ) bấm vào theo lời; bậc kế 0⁰ = 0 ÷ 0 = [ ]
// → chỉ báo ERR + "DIVIDE BY 0: NOT ALLOWED" (phép bị CẤM, không phải câu sai → KHÔNG wrong()); thanh chặn dưới 0¹,
// bậc 0⁰ mờ đi: "STOPS ONE STEP EARLY". Mascot startled (CROP 1) lúc "divide by zero".
import { C, prog, ground, ink, card, actTitle, annunciators, dm, row, dots, figure, lookup, must } from '../kit.js';

const X = 132, RH = 96, RY = [350, 480, 610, 740];       // cột cầu thang: 0³, 0², 0¹, 0⁰
const GONE = 'rgba(24,33,27,0.30)';                      // bậc không tới được (sau "stops")

export default class Stops {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      tidy: w(42, 'tidy'), far: w(42, 'far'), put: w(42, 'put'), zeroA: w(42, 'zero'), a: w(42, 'a'),
      stair: w(43, 'staircase'),
      z3: w(43, 'zero', 1), r3: w(43, 'zero', 2), z2: w(43, 'zero', 3), r2: w(43, 'zero', 4), z1: w(43, 'zero', 5), r1: w(43, 'zero', 6),
      next: w(44, 'next'), down: w(44, 'down'), divide: w(44, 'divide'), byz: w(44, 'zero', 1),
      dividing: w(44, 'dividing'), allowed: w(44, 'allowed'),
      stops: w(45, 'stops'), one: w(45, 'one'), early: w(45, 'early'), end: L(45).end,
    };
    this.START = L(42).start;
    this.FROM = Math.max(this.START - 2.6, L(41).end + 0.5);
    this.V = { p3: must('0^3', 0), p2: must('0^2', 0), p1: must('0^1', 0), t2: must('2^0', 1), t10: must('10^0', 1) };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.zeroA, kind: 'beep' }, { t: T.r3, kind: 'beep' }, { t: T.byz, kind: 'error' }, { t: T.stops, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.byz ? ['×', 'ERR'] : ['×']);
      actTitle(d, t, this.START, 'III', 'WHEN THE BASE IS ZERO', 'ANSWERS 3');
      card(d, prog(t, this.START + 0.2, this.START + 1.0), 'ACT III', 'THE STAIRCASE STOPS');
      if (t < this.START + 0.2) return;
      // gọn gàng tới giờ: a ≠ 0 thì a⁰ = 1
      dm(d, [['TIDY SO FAR:  2^0^ = ', C.dim], [String(V.t2), C.one], ['  ·  10^0^ = ', C.dim], [String(V.t10), C.one]],
        X, 150, 5, C.dim, { k: prog(t, T.tidy - 0.1, T.far + 0.4) });
      if (t > T.put - 0.1) dm(d, [['NOW PUT ', C.ink], ['0', C.zero], [' IN PLACE OF A', C.ink]], X, 214, 7, C.ink,
        { k: prog(t, T.put - 0.1, T.a + 0.25) });
      // cầu thang: ô chờ (đường chấm) có sẵn khi "the staircase" được gọi
      const kS = prog(t, T.stair - 0.1, T.stair + 0.5);
      if (kS > 0) {
        dm(d, 'THE STAIRCASE', X, 304, 4, C.dim, { k: kS * 1.5 });
        RY.forEach(y => dots(d, X, y + RH + 14, X + 620, y + RH + 14, 'rgba(24,33,27,0.20)', { step: 12, k: kS }));
      }
      const steps = [[3, T.z3, T.r3, V.p3], [2, T.z2, T.r2, V.p2], [1, T.z1, T.r1, V.p1]];
      let end3 = X;
      steps.forEach(([n, a, r, v], i) => {
        const k = prog(t, a - 0.1, a + 0.3) * 0.75 + (t >= r - 0.05 ? 0.25 : 0);
        const B = row(d, [{ c: '0' }, { c: String(n), sup: true }, { c: '=' }, { c: String(v), col: C.zero }], X, RY[i], RH, { k });
        end3 = B.at(-1)[1];
      });
      // bậc kế: 0⁰ = 0¹ ÷ 0 = 0 ÷ 0 — chia cho 0
      const gone = t >= T.stops, col = gone ? GONE : null;
      const tk = [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: '0', col: C.zero }, { c: '÷' }, { c: '0', col: C.zero }, { c: '=' }, { c: 'X' }]
        .map(o => (col ? { ...o, col } : o));
      const k4 = prog(t, T.next - 0.05, T.down + 0.1) * 3 / 8 + prog(t, T.divide - 0.05, T.byz + 0.1) * 3 / 8 + prog(t, T.byz + 0.2, T.byz + 0.5) * 2 / 8;
      if (k4 > 0) row(d, tk, X, RY[3], RH, { k: k4 });
      if (t > T.divide - 0.1) dm(d, '↓ ÷0', end3 + 56, RY[2] + 30, 5, C.ink, { k: prog(t, T.divide - 0.1, T.byz + 0.2) });
      // phép bị cấm: chỉ báo ERR (dải trên) + chữ — KHÔNG âm bản
      if (t > T.dividing - 0.1) dm(d, 'DIVIDE BY 0: NOT ALLOWED', X, 896, 6, C.ink, { k: prog(t, T.dividing - 0.1, T.allowed + 0.35) });
      // cầu thang dừng: thanh chặn dưới bậc 0¹
      if (gone) {
        const kb = prog(t, T.stops - 0.05, T.stops + 0.35), by = RY[2] + RH + 10;
        d.fillStyle = C.ink; d.fillRect(X - 22, by, (end3 - X + 44) * kb, 9);
        dm(d, 'STOPS ONE STEP EARLY', 640, RY[2] + 26, 6, C.ink, { k: prog(t, T.one - 0.1, T.early + 0.4) });
      }
    });
    figure(g, 'startled', 1650, 1080, 760, prog(t, T.divide - 0.05, T.divide + 0.3));
  }
}
