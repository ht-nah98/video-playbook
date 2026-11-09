// d3 · A negative times a positive (p2 câu 60–64) — bước 2, CONTINUES từ d2: camera trượt sang khung thảm kế bên,
//   "0 × 2 = 0" bay lên sổ bước. (3 + (−3)) × 2 = 0 × 2 = 0 (ba zero pair) = 3 × 2 + (−3) × 2: chữ nhật 3 × 2 vàng (6)
//   và 3 hàng ĐỎ × 2 cột vàng → lòng đỏ; "add up to zero" → sáu zero pair úp và biến → (−3) × 2 = −6. Cột chữ: (−a)·b = −ab.
import { C, CG, ARC, smooth, prog, ground, card, typed, label, mono, eq, mid, zeroPair, footprint, mulRect, line, arrowHead,
  num, par, lookup, must } from '../kit.js';
import Zero, { OX, SLOT, LS, LX, DIV, RX, ACT, run, chain, span, ledger, ringAt, fly, typeOf } from './d2-zero.js';

export default class NegPos {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  static NAME = 'A NEGATIVE TIMES A POSITIVE';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.prev = new Zero(); this.prev.init({ tl });
    this.CONTINUES = true;
    this.T = {
      step: w(60, 'step'), minus: w(60, 'minus'), two: w(60, 'two', 2),
      three: w(61, 'three', 1), three2: w(61, 'three', 2), that: w(61, 'that'), zero: w(61, 'zero', 1), times: w(61, 'times', 1),
      zero2: w(61, 'zero', 2), two61: w(61, 'two', 2), showed: w(61, 'showed'), zero3: w(61, 'zero', 3),
      distributive: w(62, 'distributive'), same: w(62, 'same'), three62: w(62, 'three', 1), minus62: w(62, 'minus', 1),
      two62: w(62, 'two', 2), six: w(62, 'six'), two62c: w(62, 'two', 3),
      so63: w(63, 'so'), equals: w(63, 'equals'), zero63: w(63, 'zero'),
      two64: w(64, 'two', 1), add: w(64, 'add'), zero64: w(64, 'zero'), opposites: w(64, 'opposites'), so64: w(64, 'so'),
      six64: w(64, 'six', 1), which: w(64, 'which'), minus64: w(64, 'minus', 2), six64b: w(64, 'six', 2), e64: L(64).end,
    };
    this.START = L(60).start; this.FROM = this.START - 1.2;
    const a = 3, b = 2, na = must('-3', -a);
    this.V = { a, b, na, z: must('3 + (-3)', 0), p0: must('0 * 2', 0), six: must('3 * 2', 6), r: must('(-3) * 2', -6), chk: must('6 + (-6)', 0) };
    if (must('6 + (-3) * 2', this.V.chk) !== 0 || this.V.r !== -this.V.six) throw new Error('d3: chứng minh lệch');
    const V = this.V, P = this.P = {}, A = [num(a), C.posT], B = [num(b), C.posT], NA = [par(na), C.negT];
    P.q = [NA, [' × '], B, [' = ']];
    P.res = [NA, [' × '], B, [' = '], [num(V.r), C.negT]];
    P.l1a = [['('], A, [' + '], NA, [')']];
    P.l1b = [[' × '], B, [' = '], [num(V.z)], [' × '], B];
    P.l1c = [[' = '], [num(V.p0)]];
    P.l2 = [['= '], A, [' × '], B, [' + '], NA, [' × '], B];
    P.r1 = [[num(V.six), C.posT], [' + '], NA, [' × '], B];
    P.r1b = [[' = '], [num(V.chk)]];
    P.it = [['so '], [par(na), C.negT], [' × '], B, [' is the opposite of '], [num(V.six), C.posT]];
    this.RES = { x: RX, y: 860, size: 76 };
  }
  sfx() {
    const T = this.T, P = this.P;
    return [
      ...typeOf(P.q, T.minus, T.two + 0.25),
      ...typeOf(P.l1a, T.three, T.three2 + 0.25), { t: T.zero, kind: 'pop' },
      ...typeOf(P.l1b, T.times - 0.1, T.two61 + 0.15), { t: T.showed, kind: 'tick' }, ...typeOf(P.l1c, T.zero3 - 0.05, T.zero3 + 0.3),
      ...typeOf(P.l2, T.same, T.two62 + 0.2), { t: T.three62 + 0.1, kind: 'chip' },
      ...typeOf(P.r1, T.six, T.two62c + 0.1), { t: T.two62c, kind: 'snap' }, ...typeOf(P.r1b, T.equals - 0.05, T.zero63 + 0.15),
      { t: T.zero64 + 0.15, kind: 'pop' }, ...typeOf(P.it, T.so64, T.which - 0.05),
      { t: T.six64b, kind: 'correct' },
    ];
  }
  cam(t) { return OX * smooth(prog(t, this.FROM + 0.1, this.FROM + 1.3)); }
  /** Kết luận "(−3) × 2 = −6" ở gốc (x, y), cỡ RES.size; k = viết "−6". */
  result(g, x, y, kq = 1, ka = 1) {
    const r = eq(g, this.P.q, x, y, this.RES.size, kq);
    eq(g, [this.P.res[4]], r.at(-1)[1], y, this.RES.size, ka);
    return r;
  }
  body(g, t, noRes = false) {
    const T = this.T, P = this.P, V = this.V;
    line(g, [[DIV, 196], [DIV, 1000]], `rgba(${C.grid},0.55)`, 2, { dash: [4, 10] });
    // 60 · bước 2: (−3) × 2 = ?   (ô kết luận chờ sẵn; "?" nhấc đi khi có đáp số)
    label(g, 'step 2', RX, this.RES.y - 80, prog(t, T.step, T.step + 0.5), { color: C.ink });
    if (!noRes) {
      const r = this.result(g, RX, this.RES.y, prog(t, T.minus, T.two + 0.25), prog(t, T.minus64 + 0.1, T.six64b + 0.15));
      const lift = smooth(prog(t, T.which, T.minus64 + 0.15));
      if (lift < 1) { g.save(); g.globalAlpha = 1 - lift; typed(g, '?', r.at(-1)[1] + 14, this.RES.y - lift * 70, prog(t, T.two + 0.2, T.two + 0.4), `italic 600 96px ${CG}`, C.ink); g.restore(); }
    }
    // 61 · (3 + (−3)) × 2 = 0 × 2 = 0 — ba zero pair dưới 3 + (−3)
    const S = 64, y1 = 240, l1 = chain(g, [[P.l1a, prog(t, T.three, T.three2 + 0.25)], [P.l1b, prog(t, T.times - 0.1, T.two61 + 0.15)],
      [P.l1c, prog(t, T.zero3 - 0.05, T.zero3 + 0.3)]], 96, y1, S);
    const zs = 44, zstep = 104, zx = mid(span(l1[0], 1, 3)) - (2 * zstep + zs) / 2;
    for (let i = 0; i < V.a; i++) zeroPair(g, zx + i * zstep, y1 + 34, zs, prog(t, T.that + i * 0.08, T.zero + 0.4 + i * 0.08),
      { show: prog(t, T.three2 - 0.2 + i * 0.1, T.three2 + 0.2 + i * 0.1) });
    label(g, `${V.a} zero pairs`, zx, y1 + 134, prog(t, T.zero, T.zero + 0.6));
    const fx = mid(l1[1][3]) - (3 * zs + 2 * 10) / 2, ka = prog(t, T.zero2 - 0.15, T.zero2 + 0.35);
    if (ka > 0) {
      line(g, [[zx + 2 * zstep + 2.25 * zs + 10, y1 + 56], [fx - 22, y1 + 56]], C.dim, 2, { dash: [2, 8], k: ka });
      if (ka >= 1) arrowHead(g, fx - 12, y1 + 56, 0, C.dim, 14);
      for (let i = 0; i < V.a; i++) footprint(g, fx + i * (zs + 10), y1 + 34, zs, ka, { zero: false });
    }
    // 62 · = 3 × 2 + (−3) × 2: hai chữ nhật gạch dưới đúng hai số hạng
    const l2 = eq(g, P.l2, 96, 470, S, prog(t, T.same, T.two62 + 0.2));
    label(g, 'distributive law', l2.at(-1)[1] + 36, 462, prog(t, T.distributive, T.distributive + 0.8), { size: 18 });
    const s = 52, wR = 2 * (s + 7) + 18 + s;
    const R1 = mulRect(g, mid(span(l2, 1, 3)) - wR / 2, 505, s, V.a, V.b, 'p', 'p', 'p', prog(t, T.three62, T.six));
    const R2 = mulRect(g, mid(span(l2, 5, 7)) - wR / 2, 505, s, V.a, V.b, 'n', 'p', 'n', prog(t, T.minus62, T.two62c));
    label(g, `= ${num(V.six)}`, mid([R1.X, R1.x1]), R1.y1 + 44, prog(t, T.six, T.six + 0.3), { color: C.posT, align: 'center', size: 24 });
    label(g, `= ${num(V.r)}`, mid([R2.X, R2.x1]), R2.y1 + 44, prog(t, T.minus64, T.six64b + 0.1), { color: C.negT, align: 'center', size: 24 });
    // 63 · 6 + (−3) × 2 = 0; từng hàng vàng nối với một hàng đỏ
    const r1 = eq(g, P.r1, RX, 620, 50, prog(t, T.six, T.two62c + 0.1));
    eq(g, P.r1b, r1.at(-1)[1], 620, 50, prog(t, T.equals - 0.05, T.zero63 + 0.15));
    for (let i = 0; i < V.a; i++) {
      const yy = R1.Y + i * R1.p + s / 2;
      line(g, [[R1.x1 + 14, yy], [R2.x0 - 14, yy]], 'rgba(242,236,221,0.6)', 2, { dash: [3, 7], k: prog(t, T.so63 + i * 0.15, T.so63 + 0.5 + i * 0.15) });
    }
    // 64 · "add up to zero" → sáu zero pair úp và biến; (−3) × 2 là số đối của 6
    const bY = R1.y1 + 70, kb = prog(t, T.two64, T.add);
    line(g, [[R1.X, bY], [R1.X, bY + 14], [R2.x1, bY + 14], [R2.x1, bY]], C.dim, 2, { k: kb });
    const ps = 32, pstep = 74, n = -V.r, px = mid([R1.X, R2.x1]) - ((n - 1) * pstep + ps) / 2;
    for (let i = 0; i < n; i++) zeroPair(g, px + i * pstep, bY + 34, ps, prog(t, T.add + i * 0.05, T.zero64 + 0.5 + i * 0.05),
      { show: prog(t, T.two64 + 0.3 + i * 0.05, T.two64 + 0.6 + i * 0.05) });
    label(g, `${n} zero pairs → ${num(V.chk)}`, mid([R1.X, R2.x1]), bY + 116, prog(t, T.opposites - 0.1, T.so64), { color: C.ink, align: 'center', size: 22 });
    run(g, P.it.map(([s, c]) => [s, c || C.dim]), RX, 692, `italic 600 40px ${CG}`, prog(t, T.so64, T.which - 0.05));
    // cột chữ
    const Lt = (s, y, a, b, col = C.dim, size = 24) => mono(g, s, LX, y, prog(t, a, b), col, size);
    Lt('(a + (−a))·b = 0', y1, T.zero3, T.zero3 + 0.7);
    Lt('= ab + (−a)·b', 470, T.two62, T.two62 + 0.6);
    Lt('ab + (−a)·b = 0', 620, T.zero63, T.zero63 + 0.6);
    Lt('(−a)·b = −ab', 860, T.six64b, T.six64b + 0.45, C.ink, 30);
  }
  render(g, t) {
    const T = this.T, x = this.cam(t), f = prog(t, this.FROM + 0.15, this.FROM + 1.25), pr = this.prev;
    ground(g, 'mat', x, 0);
    g.save(); g.translate(-x, 0);
    if (x < OX) pr.body(g, t, f > 0);
    g.translate(OX, 0); this.body(g, t);
    g.restore();
    // toạ độ MÀN HÌNH: thẻ mục đổi tên, sổ bước (bước 1 bay lên), vòng "which we just showed"
    card(g, 1 - prog(t, this.FROM + 0.1, this.FROM + 0.6), ACT, Zero.NAME);
    card(g, prog(t, this.FROM + 0.7, this.FROM + 1.7), ACT, NegPos.NAME);
    const R = pr.RES;
    if (f > 0 && f < 1) fly(g, f, [R.x - x, R.y, R.size], [...SLOT[0], LS], () => pr.result(g, 0, 0, 1, 1 - prog(f, 0, 0.5)));
    if (f >= 1) {
      const r = ledger(g, 0, pr.P.res, prog(t, this.FROM + 1.25, this.FROM + 1.6));
      ringAt(g, span(r, 0, 4), SLOT[0][1], LS, prog(t, T.showed - 0.2, T.showed + 0.3) - prog(t, T.distributive - 0.3, T.distributive + 0.2), { color: C.ink, w: 3, seed: 31 });
    }
  }
}
