// d4 · A negative times a negative (p2 câu 65–74) — bước 3, CONTINUES từ d3, dựng theo khung lab t_0.50.png:
//   (−3) × (2 + (−2)) = (−3) × 0 = 0 (hai zero pair) = (−3) × 2 + (−3) × (−2): chữ nhật −6 (đỏ) và 6 (vàng), sáu cặp nối;
//   −6 + (−3) × (−2) = 0 → sáu zero pair úp và biến → số đối của −6 là 6 → (−3) × (−2) = 6 (`chalk`, `correct`).
//   Câu 73–74: 3 → a, 2 → b, mỗi dòng có bản chữ ở cột phải → (−a) × (−b) = a × b.
import { H, C, CG, smooth, prog, ground, card, typed, label, mono, eq, mid, zeroPair, footprint, mulRect, line, arrowHead,
  figure, ring, num, par, lookup, must } from '../kit.js';
import { OX, SLOT, LS, LX, DIV, RX, ACT, run, chain, span, ledger, ringAt, fly, typeOf } from './d2-zero.js';
import NegPos from './d3-negpos.js';

export default class NegNeg {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = ['chalk'];
  static NAME = 'A NEGATIVE TIMES A NEGATIVE';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd4');
    this.prev = new NegPos(); this.prev.init({ tl });
    this.CONTINUES = true;
    this.T = {
      step: w(65, 'step'), minus: w(65, 'minus', 1), two: w(65, 'two'),
      minus66: w(66, 'minus', 1), two66: w(66, 'two', 2), e66: L(66).end,
      inside: w(67, 'inside'), zero: w(67, 'zero', 1), whole: w(67, 'whole'), zero2: w(67, 'zero', 2), step67: w(67, 'step'), zero3: w(67, 'zero', 3),
      distributive: w(68, 'distributive'), same: w(68, 'same'), minus68: w(68, 'minus', 1), minus68b: w(68, 'minus', 2), two68: w(68, 'two', 2),
      step69: w(69, 'step'), minus69: w(69, 'minus', 2), six69: w(69, 'six', 1), minus69c: w(69, 'minus', 3), equals: w(69, 'equals'), zero69: w(69, 'zero'),
      two70: w(70, 'two', 1), add: w(70, 'add'), zero70: w(70, 'zero'), opposites: w(70, 'opposites'), so70: w(70, 'so'), six70: w(70, 'six'), e70: L(70).end,
      and71: w(71, 'and'), six71: w(71, 'six', 2), e71: L(71).end,
      minus72: w(72, 'minus', 1), six72: w(72, 'six'), e72: L(72).end,
      nothing: w(73, 'nothing'), steps: w(73, 'steps'), three73: w(73, 'three'), put: w(73, 'put'), b73: w(73, 'b'), every: w(73, 'every'), holds: w(73, 'holds'),
      minus74: w(74, 'minus', 1), equals74: w(74, 'equals'), e74: L(74).end,
    };
    this.START = L(65).start; this.FROM = this.START - 1.2;
    const a = -3, b = 2, nb = must('-2', -2);
    const V = this.V = { a, b, nb, zero: must('2 + (-2)', 0), p0: must('(-3) * 0', 0), ab: must('(-3) * 2', -6), x: must('0 - (-6)', 6),
      chk: must('-6 + 6', 0), opp: must('-(-6)', 6) };
    if (must('(-3) * (-2)', V.x) !== V.opp || must('-6 + (-3) * (-2)', V.chk) !== 0) throw new Error('d4: chứng minh lệch');
    const P = this.P = {}, NA = [par(a), C.negT], B = [num(b), C.posT], NB = [par(nb), C.negT];
    P.q = [NA, [' × '], NB, [' = ']];
    P.ans = [[num(V.x), C.posT]];
    P.l1a = [NA, [' × ('], B, [' + '], NB, [')']];
    P.l1b = [[' = '], NA, [' × '], [num(V.zero)]];
    P.l1c = [[' = '], [num(V.p0)]];
    P.l2 = [['= '], NA, [' × '], B, [' + '], NA, [' × '], NB];
    P.r1 = [[num(V.ab), C.negT], [' + '], NA, [' × '], NB];
    P.r1b = [[' = '], [num(V.chk)]];
    P.it = [['so '], NA, [' × '], NB, [' is the opposite of '], [num(V.ab), C.negT]];
    P.opp = [['the opposite of '], [num(V.ab), C.negT], [' is '], [num(V.opp), C.posT]];
    P.sub = [[num(3), C.posT], [' → a,  '], [num(2), C.posT], [' → b']];
    P.law = [['(−a) × (−b) = a × b']];
    this.RES = { x: RX, y: 860, size: 76 };
  }
  sfx() {
    const T = this.T, P = this.P;
    return [
      ...typeOf(P.q, T.minus, T.two + 0.2),
      ...typeOf(P.l1a, T.minus66, T.e66), { t: T.zero - 0.05, kind: 'pop' },
      ...typeOf(P.l1b, T.whole, T.zero2 + 0.2), { t: T.step67, kind: 'tick' }, ...typeOf(P.l1c, T.zero3 - 0.1, T.zero3 + 0.25),
      ...typeOf(P.l2, T.same, T.two68 + 0.2), { t: T.minus68 + 0.1, kind: 'chip' }, { t: T.step69, kind: 'tick' },
      ...typeOf(P.r1, T.minus69c, T.equals - 0.1), ...typeOf(P.r1b, T.equals - 0.05, T.zero69 + 0.15),
      { t: T.zero70 + 0.15, kind: 'pop' }, ...typeOf(P.it, T.so70, T.e70),
      ...typeOf(P.opp, T.and71, T.e71),
      ...typeOf(P.ans, T.six72 - 0.3, T.six72), { t: T.six72, kind: 'correct' },
      ...typeOf(P.sub, T.three73, T.b73 + 0.3), ...typeOf(P.law, T.minus74, T.e74), { t: T.equals74, kind: 'tick' },
    ];
  }
  cam(t) { return OX + OX * smooth(prog(t, this.FROM + 0.1, this.FROM + 1.3)); }
  body(g, t) {
    const T = this.T, P = this.P, V = this.V;
    // 65 · bước 3: (−3) × (−2) = ?
    label(g, 'step 3 · the one we came for', RX, 545, prog(t, T.step, T.minus - 0.1), { color: C.ink });
    const q = eq(g, P.q, RX, this.RES.y, this.RES.size, prog(t, T.minus, T.two + 0.2));
    const lift = smooth(prog(t, T.minus72, T.minus72 + 0.4));
    if (lift < 1) { g.save(); g.globalAlpha = 1 - lift; typed(g, '?', q.at(-1)[1] + 14, this.RES.y - lift * 70, prog(t, T.two, T.two + 0.2), `italic 600 96px ${CG}`, C.ink); g.restore(); }
    eq(g, P.ans, q.at(-1)[1], this.RES.y, this.RES.size, prog(t, T.six72 - 0.3, T.six72));
    // 66–67 · (−3) × (2 + (−2)) = (−3) × 0 = 0 — hai zero pair dưới 2 + (−2), dấu chân dưới số 0
    const S = 64, y1 = 240, l1 = chain(g, [[P.l1a, prog(t, T.minus66, T.e66)], [P.l1b, prog(t, T.whole, T.zero2 + 0.2)],
      [P.l1c, prog(t, T.zero3 - 0.1, T.zero3 + 0.25)]], 96, y1, S);
    const zs = 48, zstep = 108, n0 = V.b, zx = mid(span(l1[0], 2, 4)) - ((n0 - 1) * zstep + zs) / 2;
    for (let i = 0; i < n0; i++) zeroPair(g, zx + i * zstep, y1 + 34, zs, prog(t, T.inside + 0.2 + i * 0.08, T.zero + 0.3 + i * 0.08),
      { show: prog(t, T.two66 - 0.1 + i * 0.1, T.two66 + 0.3 + i * 0.1) });
    label(g, `${n0} zero pairs`, zx, y1 + 140, prog(t, T.zero, T.zero + 0.6));
    const fx = mid(l1[1][3]) - (n0 * zs + (n0 - 1) * 12) / 2, ka = prog(t, T.zero2 - 0.1, T.zero2 + 0.4);
    if (ka > 0) {
      line(g, [[zx + (n0 - 1) * zstep + 2.25 * zs + 12, y1 + 58], [fx - 22, y1 + 58]], C.dim, 2, { dash: [2, 8], k: ka });
      if (ka >= 1) arrowHead(g, fx - 12, y1 + 58, 0, C.dim, 14);
      for (let i = 0; i < n0; i++) footprint(g, fx + i * (zs + 12), y1 + 34, zs, ka, { zero: false });
    }
    // 68 · = (−3) × 2 + (−3) × (−2): 3 hàng đỏ × 2 cột vàng → lòng đỏ; 3 hàng đỏ × 2 cột đỏ → lòng vàng
    const l2 = eq(g, P.l2, 96, 470, S, prog(t, T.same, T.two68 + 0.2));
    label(g, 'distributive law', l2.at(-1)[1] + 36, 462, prog(t, T.distributive, T.distributive + 0.8), { size: 18 });
    const s = 52, wR = 2 * (s + 7) + 18 + s, rows = -V.a;
    const R1 = mulRect(g, mid(span(l2, 1, 3)) - wR / 2, 505, s, rows, V.b, 'n', 'p', 'n', prog(t, T.minus68, T.minus68b + 0.3));
    const R2 = mulRect(g, mid(span(l2, 5, 7)) - wR / 2, 505, s, rows, -V.nb, 'n', 'n', 'p', prog(t, T.minus68b, T.two68 + 0.5));
    label(g, `= ${num(V.ab)}`, mid([R1.X, R1.x1]), R1.y1 + 44, prog(t, T.minus69, T.six69 + 0.3), { color: C.negT, align: 'center', size: 24 });
    label(g, `= ${num(V.x)}`, mid([R2.X, R2.x1]), R2.y1 + 44, prog(t, T.six71, T.six71 + 0.3), { color: C.posT, align: 'center', size: 24 });
    // 69 · −6 + (−3) × (−2) = 0; sáu cặp nối hàng đỏ ↔ hàng vàng
    const r1 = eq(g, P.r1, RX, 620, 50, prog(t, T.minus69c, T.equals - 0.1));
    eq(g, P.r1b, r1.at(-1)[1], 620, 50, prog(t, T.equals - 0.05, T.zero69 + 0.15));
    for (let i = 0; i < rows; i++) {
      const yy = R1.Y + i * R1.p + s / 2;
      line(g, [[R1.x1 + 14, yy], [R2.x0 - 14, yy]], 'rgba(242,236,221,0.6)', 2, { dash: [3, 7], k: prog(t, T.equals + i * 0.15, T.equals + 0.5 + i * 0.15) });
    }
    // 70 · "add up to zero" → sáu zero pair úp và biến; (−3) × (−2) là số đối của −6
    const bY = R1.y1 + 70, n = -V.ab;
    line(g, [[R1.X, bY], [R1.X, bY + 14], [R2.x1, bY + 14], [R2.x1, bY]], C.dim, 2, { k: prog(t, T.two70, T.add) });
    const ps = 32, pstep = 74, px = mid([R1.X, R2.x1]) - ((n - 1) * pstep + ps) / 2;
    for (let i = 0; i < n; i++) zeroPair(g, px + i * pstep, bY + 34, ps, prog(t, T.add + i * 0.05, T.zero70 + 0.5 + i * 0.05),
      { show: prog(t, T.two70 + 0.3 + i * 0.05, T.two70 + 0.6 + i * 0.05) });
    label(g, `${n} zero pairs → ${num(V.chk)}`, mid([R1.X, R2.x1]), bY + 116, prog(t, T.opposites - 0.1, T.so70), { color: C.ink, align: 'center', size: 22 });
    run(g, P.it.map(([s, c]) => [s, c || C.dim]), RX, 692, `italic 600 40px ${CG}`, prog(t, T.so70, T.e70));
    // 71 · số đối của −6 là 6
    run(g, P.opp.map(([s, c]) => [s, c || C.dim]), RX, 762, `italic 600 40px ${CG}`, prog(t, T.and71, T.e71));
    // 73–74 · 3 và 2 không có gì đặc biệt: cột chữ, mỗi dòng một bản a, b → (−a) × (−b) = a × b
    const kc = prog(t, T.three73 - 0.4, T.three73);
    if (kc > 0) line(g, [[DIV, 196], [DIV, 1000]], `rgba(${C.grid},0.55)`, 2, { dash: [4, 10], k: kc });
    run(g, P.sub, LX, 760, `500 24px "IBM Plex Mono"`, prog(t, T.three73, T.b73 + 0.3), 2);
    const Lt = (s, y, a, b) => mono(g, s, LX, y, prog(t, a, b), C.dim, 24);
    Lt('(−a)·(b + (−b)) = 0', y1, T.every - 0.1, T.every + 0.5);
    Lt('= (−a)·b + (−a)·(−b)', 470, T.every + 0.3, T.holds);
    Lt('−ab + (−a)·(−b) = 0', 620, T.holds - 0.2, T.holds + 0.5);
    mono(g, P.law[0][0], LX, this.RES.y, prog(t, T.minus74, T.e74), C.ink, 30);
    ring(g, LX + 186, this.RES.y - 10, 222, 40, prog(t, T.equals74, T.e74 + 0.4), { color: C.ink, w: 3, seed: 41 });
  }
  render(g, t) {
    const T = this.T, x = this.cam(t), f = prog(t, this.FROM + 0.15, this.FROM + 1.25), pr = this.prev;
    ground(g, 'mat', x, 0);
    g.save(); g.translate(-x, 0);
    if (x < 2 * OX) { g.save(); g.translate(OX, 0); pr.body(g, t, f > 0); g.restore(); }
    g.translate(2 * OX, 0); this.body(g, t);
    g.restore();
    // toạ độ MÀN HÌNH: thẻ mục đổi tên, sổ bước (bước 2 bay lên), vòng "by step one" / "from step two", nhân vật
    card(g, 1 - prog(t, this.FROM + 0.1, this.FROM + 0.6), ACT, NegPos.NAME);
    card(g, prog(t, this.FROM + 0.7, this.FROM + 1.7), ACT, NegNeg.NAME);
    const r0 = ledger(g, 0, pr.prev.P.res, 1), R = pr.RES;
    ringAt(g, span(r0, 0, 4), SLOT[0][1], LS, prog(t, T.step67 - 0.2, T.step67 + 0.3) - prog(t, T.distributive - 0.3, T.distributive + 0.2), { color: C.ink, w: 3, seed: 31 });
    if (f > 0 && f < 1) fly(g, f, [R.x + 2 * OX - x, R.y, R.size], [...SLOT[1], LS], () => pr.result(g, 0, 0));
    let r1 = null;
    if (f >= 1) {
      const r = r1 = ledger(g, 1, pr.P.res, prog(t, this.FROM + 1.25, this.FROM + 1.6));
      ringAt(g, span(r, 0, 4), SLOT[1][1], LS, prog(t, T.step69 - 0.2, T.step69 + 0.3) - prog(t, T.minus69c - 0.3, T.minus69c + 0.2), { color: C.ink, w: 3, seed: 37 });
    }
    // "nothing in those steps…": gạch chân cả hai mục sổ bước
    const ku = prog(t, T.steps - 0.2, T.steps + 0.5);
    if (ku > 0) for (const [i, r] of [[0, r0], [1, r1]]) if (r) line(g, [[r[0][0], SLOT[i][1] + 16], [r.at(-1)[1], SLOT[i][1] + 16]], C.dim, 2, { k: ku });
    figure(g, 'chalk', 1660, H, 760, prog(t, T.and71 - 0.4, T.and71 - 0.05) - prog(t, T.three73 - 0.75, T.three73 - 0.4));
  }
}
