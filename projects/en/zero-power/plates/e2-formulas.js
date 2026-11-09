// e2 · Formulas that need it (p2). Màn như máy đồ thị: ba dòng Y1 / Y2 / Y3 cuộn lên theo lời.
//   Y1 đa thức P(X) = 3 + 2X + X² = 3·X⁰ + 2·X¹ + 1·X² → P(0) = 3·0⁰ + 2·0 + 0² = 3
//   Y2 nhị thức (X + Y)^N = 1·X⁰·Y^N + … (Newton, ảnh điểm) → X = 0: = Y^N; kiểm (0 + 5)³ = 125
//   Y3 chuỗi E^X = X⁰/0! + X¹/1! + … → 0! = 1, E⁰ = 0⁰/0! + 0 + … = 1
//   Mỗi chỗ 0⁰ (X⁰ tại x = 0) tô lam khi nó phải đóng vai 1, kèm dòng "NEEDS 0^0 = 1".
import { W, C, smooth, prog, ground, ink, dm, dmW, annunciators, card, dots, portrait, lookup, must } from '../kit.js';

const B = 760, TOP = 330;                     // khoảng cách khối, đỉnh khối đầu
/** pw(b, e) với 0⁰ := 1 viết rõ (không dựa vào JS) — đây chính là giả định mà công thức cần. */
const pw = (b, e) => (e === 0 ? 1 : b ** e);
const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };

export default class Formulas {
  static ERA = 'lcd';
  static IMAGES = { newton: './assets/history/newton.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      algebra: w(67, 'algebra'), formulas: w(67, 'formulas'), assume: w(67, 'assume'),
      take: w(68, 'take'), three68: w(68, 'three'), squared: w(68, 'squared'),
      sum: w(69, 'sum'), power69: w(69, 'power'), first69: w(69, 'first'), zero69: w(69, 'zero'),
      put70: w(70, 'put'), zero70: w(70, 'zero'), three70: w(70, 'three'), only70: w(70, 'only'), zz70: w(70, 'zero', 3), e70: L(70).end,
      binomial: w(71, 'binomial'), n71: w(71, 'n'), newton: w(71, 'newton'),
      first72: w(72, 'first'), n72: w(72, 'n'), put72: w(72, 'put'), whole: w(72, 'whole'), n72b: w(72, 'n', 2),
      only72: w(72, 'only'), zz72: w(72, 'zero', 3), e72: L(72).end,
      series: w(73, 'series'), defines: w(73, 'defines'), x0_73: w(73, 'x', 2), fact73: w(73, 'factorial'),
      zf: w(73, 'zero', 3), one73: w(73, 'one'), hold: w(73, 'hold'),
      x74: w(74, 'x'), e74: w(74, 'e'), one74: w(74, 'one', 1), once: w(74, 'once'), need: w(74, 'need'), one74b: w(74, 'one', 2),
    };
    this.START = L(67).start; this.FROM = this.START - 1.2;
    this.PAN = [L(70).end - 0.1, L(72).end - 0.05];
    // toán trên hình: P(0) = 3 với 0⁰ = 1; (0 + 5)³ khai triển = 125; E⁰ = 1; 0! = 1
    const P0 = 3 * pw(0, 0) + 2 * pw(0, 1) + 1 * pw(0, 2);
    let bin = 0; for (let k = 0; k <= 3; k++) bin += choose(3, k) * pw(0, k) * pw(5, 3 - k);
    let ex = 0, f = 1; for (let k = 0; k < 12; k++) { if (k) f *= k; ex += pw(0, k) / f; }
    this.V = { p0: must(String(P0), 3), p0b: must('3 + 2 × 0 + 0^2', 3), bin: must(String(bin), 125), b5: must('(0 + 5)^3', 125),
      y3: must('5^3', 125), e0: must(String(ex), 1), f0: 1 };
    if (choose(3, 0) !== 1) throw new Error('e2: hệ số đầu của nhị thức phải là 1');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.three68, kind: 'beep' }, { t: T.sum, kind: 'tick' }, { t: T.first69, kind: 'tick' }, { t: T.three70, kind: 'beep' },
      { t: T.binomial, kind: 'beep' }, { t: T.newton + 0.6, kind: 'chip' }, { t: T.n72 - 0.3, kind: 'tick' }, { t: T.n72b, kind: 'beep' },
      { t: T.defines, kind: 'beep' }, { t: T.zf, kind: 'tick' }, { t: T.one74, kind: 'beep' },
    ];
  }
  cam(t) { return this.PAN.reduce((y, a) => y + B * smooth(prog(t, a, a + 0.9)), 0); }
  render(g, t) {
    const cy = this.cam(t);
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 0.9), 'ACT IV', 'FORMULAS THAT NEED IT');
      d.save(); d.beginPath(); d.rect(0, 130, W, 1080 - 130); d.clip(); d.translate(0, -cy);
      this.intro(d, t); this.poly(d, t, TOP); this.binom(d, t, TOP + B); this.series(d, t, TOP + 2 * B);
      d.restore();
    });
  }
  /** "NEEDS 0^0 = 1" — 1 lam. */
  needs(d, x, y, k) { dm(d, [['NEEDS ', C.ink], ['0^0^ = ', C.ink], ['1', C.one]], x, y, 7, C.ink, { k }); }
  /** Gạch chân mực dưới một đoạn [x0, x1]. */
  under(d, x0, x1, y, k) { if (k > 0) { d.fillStyle = C.ink; d.fillRect(x0, y, (x1 - x0) * k, 5); } }

  intro(d, t) {
    const T = this.T, X = 132;
    dm(d, 'ALGEBRA LEANS ON THE SAME ANSWER', X, 160, 5, C.dim, { k: prog(t, T.algebra - 0.1, T.algebra + 1.0) });
    dm(d, [['MANY FORMULAS QUIETLY ASSUME ', C.ink], ['0^0^ = ', C.ink], ['1', C.one]], X, 220, 6, C.ink, { k: prog(t, T.formulas - 0.6, T.assume + 0.3) });
  }

  // ── Y1: đa thức ──
  poly(d, t, Y) {
    const T = this.T, X = 132, V = this.V;
    dm(d, 'Y1 · A POLYNOMIAL', X, Y, 5, C.dim, { k: prog(t, T.take - 0.1, T.take + 0.4) });
    dm(d, 'P(X) = 3 + 2X + X^2^', X, Y + 80, 10, C.ink, { k: prog(t, T.take + 0.2, T.squared + 0.3) });
    const l2 = '= 3·X^0^ + 2·X^1^ + 1·X^2^';
    dm(d, l2, X + dmW('P(X) ', 10), Y + 210, 10, C.ink, { k: prog(t, T.sum - 0.1, T.power69 + 0.3) });
    // "the first term is three times x to the zero" — gạch chân mực dưới 3·X⁰
    const x0 = X + dmW('P(X) = ', 10), x1 = x0 + dmW('3·X^0^', 10);
    this.under(d, x0, x1, Y + 292, prog(t, T.first69, T.zero69 + 0.2));
    if (t > T.first69 + 0.3) dm(d, 'FIRST TERM', x0, Y + 312, 3, C.dim, { k: prog(t, T.first69 + 0.3, T.zero69 + 0.3) });
    // P(0) = 3·0⁰ + 2·0 + 0² = 3 — 0⁰ tô lam khi "zero to the zero is one"
    const blue = t >= T.zz70 - 0.1, zc = blue ? C.one : C.ink;
    dm(d, [['P(0) = 3·', C.ink], ['0^0^', zc], [' + 2·0 + 0^2^', C.ink], [t >= T.three70 - 0.1 ? ` = ${V.p0}` : '', C.ink]],
      X, Y + 385, 10, C.ink, { k: prog(t, T.put70 - 0.1, T.zero70 + 0.8) });
    this.needs(d, X, Y + 505, prog(t, T.only70 - 0.1, T.zz70 + 0.2));
    dots(d, X, Y + 600, 1824, Y + 600, `rgba(${C.inkRGB},0.25)`, { step: 12 });
  }

  // ── Y2: nhị thức Newton ──
  binom(d, t, Y) {
    const T = this.T, X = 132, V = this.V;
    dm(d, 'Y2 · THE BINOMIAL THEOREM', X, Y, 5, C.dim, { k: prog(t, T.binomial - 0.1, T.binomial + 0.6) });
    dm(d, '(X + Y)^N^ =', X, Y + 80, 9, C.ink, { k: prog(t, T.binomial + 1.0, T.n71 + 0.2) });
    const first = '1·X^0^·Y^N^', rest = ' + N·X^1^·Y^N−1^ + ...';
    dm(d, first, X, Y + 190, 9, C.ink, { k: prog(t, T.first72 - 0.1, T.n72 + 0.2) });
    dm(d, rest, X + dmW(first, 9), Y + 190, 9, C.ink, { k: prog(t, T.n72 + 0.2, T.n72 + 0.7) });
    this.under(d, X, X + dmW(first, 9), Y + 268, prog(t, T.first72, T.n72));
    // X = 0: 1·0⁰·Y^N + 0 = Y^N (mọi hạng sau có thừa số 0)
    const blue = t >= T.zz72 - 0.1;
    dm(d, [['X = 0:  1·', C.ink], ['0^0^', blue ? C.one : C.ink], ['·Y^N^ + 0', C.ink], [t >= T.n72b - 0.2 ? ' = Y^N^' : '', C.ink]],
      X, Y + 310, 8, C.ink, { k: prog(t, T.put72 - 0.1, T.whole) });
    dm(d, [[`CHECK: (0 + 5)^3^ = 1·`, C.dim], ['0^0^', blue ? C.one : C.dim], [`·5^3^ + 0 = ${V.bin}`, C.dim]], X, Y + 400, 5, C.dim,
      { k: prog(t, T.whole + 0.3, T.n72b + 0.4) });
    this.needs(d, X, Y + 480, prog(t, T.only72 - 0.1, T.zz72 + 0.2));
    // Newton (ảnh điểm) bên phải khi lời nhắc tên
    portrait(d, 'newton', 1370, Y + 10, 380, prog(t, T.newton - 0.15, T.newton + 0.6),
      { label: { name: 'ISAAC NEWTON', note: 'PORTRAIT: GODFREY KNELLER' } });
    if (t < T.newton - 0.15) { d.strokeStyle = `rgba(${C.inkRGB},0.18)`; d.lineWidth = 3; d.strokeRect(1360, Y, 336, 400); }
    dots(d, X, Y + 600, 1824, Y + 600, `rgba(${C.inkRGB},0.25)`, { step: 12 });
  }

  // ── Y3: chuỗi E^X ──
  series(d, t, Y) {
    const T = this.T, X = 132, V = this.V;
    dm(d, 'Y3 · THE SERIES FOR E^X^', X, Y, 5, C.dim, { k: prog(t, T.series - 0.1, T.series + 0.5) });
    const head = 'E^X^ = X^0^/0!', tail = ' + X^1^/1! + X^2^/2! + ...';
    dm(d, head, X, Y + 80, 9, C.ink, { k: prog(t, T.defines, T.fact73 + 0.3) });
    dm(d, tail, X + dmW(head, 9) + 9, Y + 80, 9, C.ink, { k: prog(t, T.fact73 + 0.3, T.fact73 + 0.9) });
    this.under(d, X + dmW('E^X^ = ', 9), X + dmW(head, 9), Y + 158, prog(t, T.x0_73, T.fact73 + 0.3));
    dm(d, [['0! = ', C.ink], [String(V.f0), C.one]], X, Y + 200, 9, C.ink, { k: prog(t, T.zf - 0.1, T.one73) });
    dm(d, 'HOLD THAT THOUGHT', X + 460, Y + 216, 5, C.dim, { k: prog(t, T.hold - 0.1, T.hold + 0.5) });
    const blue = t >= T.one74b - 0.6;
    dm(d, [['X = 0:  E^0^ = ', C.ink], ['0^0^', blue ? C.one : C.ink], ['/0! + 0 + 0 + ...', C.ink], [t >= T.one74 - 0.1 ? ' = ' : '', C.ink],
      [t >= T.one74 - 0.1 ? String(V.e0) : '', C.one]], X, Y + 320, 7, C.ink, { k: prog(t, T.x74 - 0.1, T.e74 + 0.6) });
    this.needs(d, X, Y + 430, prog(t, T.need - 0.1, T.one74b + 0.1));
  }
}
