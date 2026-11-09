// d1 · The rules you already use (câu 44–52) — MỞ HỒI III. Đích chứng minh viết ở đầu thảm; bốn ô trống chờ luật
// (lúc "prove"), tên luật viết vào lúc "giving them names"; mỗi thẻ dán đúng câu của nó:
//   1 DISTRIBUTIVE a × (b + c) = … + 23 × 7 = 20 × 7 + 3 × 7 = 140 + 21 = 161 (chữ nhật 23 × 7 tách 20 | 3)
//   2 OPPOSITES 3 + (−3) = 0 bằng một zero pair thật · "ONLY ONE OPPOSITE" + zero pair thứ hai ("add up to zero")
//   3 ZERO a + 0 = a: ba viên + dấu chân 0 = ba viên · 4 ORDER & GROUPING, 2 × 3 = 3 × 2 bằng hai chữ nhật nhân.
// "= A RING" nhỏ dưới ngoặc; "agree" → bốn dấu ✓ vẽ tay. d5 nhắc lại bốn thẻ này.
import { C, ARC, clamp, prog, outCubic, ground, card, actTitle, typed, label, mono, eq, num, par, tile, zeroPair,
  footprint, mulRect, line, check, must, lookup, typeCues } from '../kit.js';

const CW = 840, CH = 290, R = [[96, 290], [984, 290], [96, 610], [984, 610]];
const NAMES = ['1 · distributive', '2 · opposites', '3 · zero', '4 · order & grouping'];
// k tổng của một chuỗi viết theo từng đoạn [số ký tự, bắt đầu, kết thúc] (eq lộ theo ký tự)
const seqK = (t, segs) => segs.reduce((a, [n, s, e]) => a + n * prog(t, s, e), 0) / segs.reduce((a, [n]) => a + n, 0);

export default class Rules {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      prove: w(44, 'prove'), minus44: w(44, 'minus', 1), b44: w(44, 'b', 2), for: w(44, 'for'), b44c: w(44, 'b', 3),
      few: w(45, 'few'), rules: w(45, 'rules'), since: w(45, 'since'), school: w(45, 'school'), giving: w(45, 'giving'), names: w(45, 'names'),
      first: w(46, 'first'), distributive: w(46, 'distributive'), a46: w(46, 'a', 1), c46: w(46, 'c', 2),
      multiply: w(47, 'multiply'), head: w(47, 'head'), t23: w(47, 'twenty-three'), seven1: w(47, 'seven', 1), is47: w(47, 'is'),
      twenty: w(47, 'twenty'), seven2: w(47, 'seven', 2), plus1: w(47, 'plus', 1), three47: w(47, 'three'), seven3: w(47, 'seven', 3),
      one1: w(47, 'one', 1), forty: w(47, 'forty'), plus2: w(47, 'plus', 2), t21: w(47, 'twenty-one'), one2: w(47, 'one', 2), s61: w(47, 'sixty-one'),
      second: w(48, 'second'), opposites: w(48, 'opposites'), every: w(48, 'every'), a48: w(48, 'a', 1), zero48: w(48, 'zero', 1),
      three1: w(48, 'three', 1), minus48: w(48, 'minus'), zero48b: w(48, 'zero', 2), negative: w(48, 'negative'), e48: L(48).end,
      only: w(49, 'only'), opp49: w(49, 'opposite', 1), two49: w(49, 'two'), add: w(49, 'add'), zero49: w(49, 'zero'), each: w(49, 'each'),
      opp49b: w(49, 'opposite', 2),
      third: w(50, 'third'), adding: w(50, 'adding'), zero50: w(50, 'zero', 2), number50: w(50, 'number'), leaves: w(50, 'leaves'), unchanged: w(50, 'unchanged'),
      finally: w(51, 'finally'), order: w(51, 'order'), grouping: w(51, 'grouping'), product: w(51, 'product'),
      two1: w(51, 'two', 1), three51: w(51, 'three', 1), three51b: w(51, 'three', 2), two2: w(51, 'two', 2),
      together: w(52, 'together'), ring: w(52, 'ring'), name: w(52, 'name'), agree: w(52, 'agree'), use: w(52, 'use'),
    };
    this.V = {
      d: [23, 7, 20, 3].map(v => must(String(v), v)), p20: must('20 * 7', 140), p3: must('3 * 7', 21), p: must('23 * 7', 161),
      sum: must('140 + 21', 161), split: must('20 + 3', 23), opp: must('3 + (-3)', 0), ord: must('2 * 3', 6) && must('3 * 2', 6),
    };
    this.START = L(44).start; this.FROM = this.START - 2.6;
  }
  sfx() {
    const T = this.T;
    return [
      ...typeCues('(−a) × (−b) = a × b', T.minus44, T.b44 + 0.3),
      { t: T.first, kind: 'snap' },                     // thẻ 1
      { t: T.twenty, kind: 'tick' },                    // chữ nhật tách 20 | 3
      { t: T.second, kind: 'snap' },                    // thẻ 2
      { t: T.zero48b, kind: 'pop' },                    // zero pair 3 + (−3) biến
      { t: T.zero49 + 0.1, kind: 'pop' },               // zero pair "add up to zero"
      { t: T.adding, kind: 'chip' },                    // ba viên của thẻ ZERO
      { t: T.order, kind: 'snap' },                     // thẻ 4
      { t: T.three51 + 0.3, kind: 'snap' },             // chữ nhật 2 × 3 khép
      { t: T.ring, kind: 'tick' },                      // = A RING
      { t: T.agree, kind: 'tick' },                     // bốn dấu ✓
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mat', 0, 0);
    actTitle(g, t, this.START, 'III', 'The proof', 'answers question 3');
    if (t >= this.START) this.board(g, t);
    card(g, prog(t, this.START + 0.25, this.START + 1.6), 'ACT III', 'THE RULES YOU ALREADY USE');
  }
  board(g, t) {
    const T = this.T;
    // đích: (−a) × (−b) = a × b, for any numbers a and b
    label(g, 'to prove', 96, 236, prog(t, T.prove - 0.2, T.prove + 0.3), { size: 20 });
    eq(g, [['(−a)', C.negT], [' × '], ['(−b)', C.negT], [' = '], ['a × b', C.posT]], 250, 244, 52, prog(t, T.minus44, T.b44 + 0.3));
    mono(g, 'for any numbers a and b', 790, 240, prog(t, T.for, T.b44c + 0.3), C.dim, 22);
    mono(g, 'since primary school', 1824, 240, prog(t, T.since, T.school + 0.4), C.dim, 22, 'right');

    const snap = [T.first, T.second, T.third, T.order];
    R.forEach(([x, y], i) => {
      const kd = prog(t, T.prove + i * 0.15, T.prove + 0.6 + i * 0.15), ks = prog(t, snap[i] - 0.1, snap[i] + 0.25);
      if (ks < 1) line(g, [[x, y], [x + CW, y], [x + CW, y + CH], [x, y + CH], [x, y]], C.dim, 2, { dash: [10, 8], k: kd });
      if (ks > 0) this.panel(g, x, y, ks);
      label(g, NAMES[i], x + 28, y + 46, prog(t, T.giving + i * 0.2, T.names + 0.3 + i * 0.2), { size: 22, color: ks > 0 ? C.ink : C.dim });
      check(g, x + CW - 46, y + 38, 18, prog(t, T.agree + i * 0.2, T.agree + 0.3 + i * 0.2), { color: C.ink, w: 5 });
    });
    if (t > T.first) this.distributive(g, t, ...R[0]);
    if (t > T.second) this.opposites(g, t, ...R[1]);
    if (t > T.third) this.zero(g, t, ...R[2]);
    if (t > T.order - 0.1) this.order(g, t, ...R[3]);

    // ngoặc dưới bốn thẻ: "= A RING" (nhỏ — tên không cần nhớ)
    const kb = prog(t, T.together, T.together + 0.8);
    line(g, [[96, 925], [96, 940], [1824, 940], [1824, 925]], C.dim, 2, { k: kb });
    label(g, '= a ring', 960, 984, prog(t, T.ring - 0.1, T.ring + 0.4), { align: 'center', size: 22, color: C.ink });
    mono(g, '(just a name)', 1060, 984, prog(t, T.name - 0.2, T.name + 0.4), C.dim, 20);
  }
  panel(g, x, y, k) {                                 // thẻ luật dán thảm: hơi to → đúng cỡ, bóng thu lại
    const e = outCubic(k), sc = 1 + (1 - e) * 0.04;
    g.save(); g.translate(x + CW / 2, y + CH / 2); g.scale(sc, sc); g.translate(-CW / 2, -CH / 2); g.globalAlpha = clamp(k * 3);
    g.shadowColor = 'rgba(5,10,18,0.5)'; g.shadowBlur = 18 + (1 - e) * 20; g.shadowOffsetY = 8 + (1 - e) * 14;
    g.fillStyle = 'rgba(14,21,30,0.55)'; g.beginPath(); g.roundRect(0, 0, CW, CH, 14); g.fill();
    g.shadowColor = 'transparent'; g.strokeStyle = 'rgba(242,236,221,0.6)'; g.lineWidth = 2; g.stroke();
    g.restore();
  }
  distributive(g, t, x, y) {
    const T = this.T, V = this.V, [a23, a7, a20, a3] = V.d, P = C.posT;
    eq(g, [['a × (b + c) = a × b + a × c']], x + 28, y + 108, 40, prog(t, T.a46, T.c46 + 0.3));
    const l1 = [[num(a23), P], [' × '], [num(a7), P], [' = '], [num(a20), P], [' × '], [num(a7), P], [' + '], [num(a3), P], [' × '], [num(a7), P]];
    eq(g, l1, x + 28, y + 186, 36, seqK(t, [[6, T.t23, T.seven1 + 0.2], [9, T.is47, T.seven2 + 0.2], [8, T.plus1, T.seven3 + 0.2]]));
    const l2 = [[' = '], [num(V.p20), P], [' + '], [num(V.p3), P], [' = '], [num(V.p), P]];
    eq(g, l2, x + 28 + 100, y + 248, 36, seqK(t, [[6, T.one1, T.forty + 0.3], [5, T.plus2, T.t21 + 0.3], [6, T.one2, T.s61 + 0.3]]));
    label(g, 'in your head', x + 28 + 330, y + 46, prog(t, T.multiply, T.head + 0.4), { size: 18 });
    // chữ nhật 23 × 7 (ô lưới vàng = dương), tách 20 | 3 lúc "twenty"
    const u = 10.4, rx = x + 560, ry = y + 140, rw = a23 * u, rh = a7 * u, kr = prog(t, T.t23, T.seven1 + 0.3);
    if (kr <= 0) return;
    g.save(); g.beginPath(); g.rect(rx, ry, rw * outCubic(kr), rh); g.clip();
    g.fillStyle = 'rgba(244,196,48,0.22)'; g.fillRect(rx, ry, rw, rh);
    g.strokeStyle = 'rgba(244,196,48,0.35)'; g.lineWidth = 1; g.beginPath();
    for (let i = 1; i < a23; i++) { g.moveTo(rx + i * u, ry); g.lineTo(rx + i * u, ry + rh); }
    for (let j = 1; j < a7; j++) { g.moveTo(rx, ry + j * u); g.lineTo(rx + rw, ry + j * u); }
    g.stroke(); g.strokeStyle = C.pos; g.lineWidth = 2.5; g.strokeRect(rx, ry, rw, rh); g.restore();
    typed(g, num(a23), rx + rw / 2, ry - 12, prog(t, T.t23, T.t23 + 0.3) - prog(t, T.twenty - 0.2, T.twenty), `600 22px ${ARC}`, P, { align: 'center' });
    typed(g, num(a7), rx - 10, ry + rh / 2 + 8, prog(t, T.seven1, T.seven1 + 0.2), `600 22px ${ARC}`, P, { align: 'right' });
    const ksp = prog(t, T.twenty, T.twenty + 0.35);
    line(g, [[rx + a20 * u, ry - 6], [rx + a20 * u, ry + rh + 6]], C.ink, 3, { k: ksp });
    typed(g, num(a20), rx + a20 * u / 2, ry - 12, prog(t, T.twenty, T.twenty + 0.3), `600 22px ${ARC}`, P, { align: 'center' });
    typed(g, num(a3), rx + (a20 + a3 / 2) * u, ry - 12, prog(t, T.three47, T.three47 + 0.3), `600 22px ${ARC}`, P, { align: 'center' });
    typed(g, num(V.p20), rx + a20 * u / 2, ry + rh + 32, prog(t, T.forty, T.forty + 0.3), `600 24px ${ARC}`, P, { align: 'center' });
    typed(g, num(V.p3), rx + (a20 + a3 / 2) * u, ry + rh + 32, prog(t, T.t21, T.t21 + 0.3), `600 24px ${ARC}`, P, { align: 'center' });
  }
  opposites(g, t, x, y) {
    const T = this.T;
    eq(g, [['a + '], ['(−a)', C.negT], [' = 0']], x + 28, y + 108, 40, prog(t, T.a48, T.zero48 + 0.3));
    const r = eq(g, [[num(3), C.posT], [' + '], [par(-3), C.negT], [' = '], [num(this.V.opp)]], x + 28, y + 186, 40, prog(t, T.three1, T.zero48b + 0.3));
    line(g, [[r[2][0] + 4, y + 204], [r[2][1] - 4, y + 204]], C.negT, 3, { k: prog(t, T.negative, T.negative + 0.4) });   // "what a negative number is"
    // zero pair 1: 3 + (−3) — úp và biến lúc "is zero"
    zeroPair(g, x + 600, y + 66, 60, prog(t, T.minus48, T.zero48b + 0.45), { show: prog(t, T.three1 - 0.2, T.three1 + 0.25) });
    // chỉ một số đối: x + y = 0 → y = −x; zero pair 2 lúc "add up to zero"
    label(g, 'only one opposite', x + 28, y + 240, prog(t, T.only, T.opp49 + 0.3), { size: 20, color: C.ink });
    mono(g, 'x + y = 0 → y = −x', x + 28, y + 274, prog(t, T.two49, T.each + 0.2), C.dim, 20);
    zeroPair(g, x + 600, y + 166, 60, prog(t, T.add, T.zero49 + 0.45), { show: prog(t, T.two49 - 0.2, T.two49 + 0.25) });
  }
  zero(g, t, x, y) {
    const T = this.T, s = 56, ty = y + 150;
    eq(g, [['a + 0 = a']], x + 28, y + 108, 40, prog(t, T.adding, T.number50 + 0.3));
    for (let j = 0; j < 3; j++) tile(g, x + 28 + j * 66, ty, s, 'p', { k: prog(t, T.adding - 0.2 + j * 0.08, T.adding + 0.2 + j * 0.08) });
    typed(g, '+', x + 246, ty + 40, prog(t, T.zero50, T.zero50 + 0.15), `600 44px ${ARC}`, C.ink, { align: 'center' });
    footprint(g, x + 276, ty, s, prog(t, T.zero50, T.zero50 + 0.4), { color: C.ink });
    typed(g, '=', x + 370, ty + 40, prog(t, T.leaves, T.leaves + 0.15), `600 44px ${ARC}`, C.ink, { align: 'center' });
    for (let j = 0; j < 3; j++) tile(g, x + 406 + j * 66, ty, s, 'p', { k: prog(t, T.leaves + j * 0.08, T.leaves + 0.35 + j * 0.08) });
    label(g, 'unchanged', x + 28, y + 262, prog(t, T.unchanged, T.unchanged + 0.4), { size: 20, color: C.ink });
  }
  order(g, t, x, y) {
    const T = this.T, P = C.posT;
    mono(g, 'a + b = b + a', x + 28, y + 100, prog(t, T.order, T.order + 0.35), C.ink, 22);
    mono(g, 'a × b = b × a', x + 28, y + 134, prog(t, T.order + 0.2, T.grouping), C.ink, 22);
    mono(g, '(a + b) + c = a + (b + c)', x + 28, y + 168, prog(t, T.grouping, T.product + 0.3), C.ink, 22);
    eq(g, [[num(2), P], [' × '], [num(3), P], [' = '], [num(3), P], [' × '], [num(2), P]], x + 28, y + 250, 40, prog(t, T.two1, T.two2 + 0.25));
    mulRect(g, x + 470, y + 104, 22, 2, 3, 'p', 'p', 'p', prog(t, T.two1, T.three51 + 0.5));
    typed(g, '=', x + 645, y + 190, prog(t, T.three51b - 0.1, T.three51b + 0.1), `600 40px ${ARC}`, C.ink, { align: 'center' });
    mulRect(g, x + 690, y + 104, 22, 3, 2, 'p', 'p', 'p', prog(t, T.three51b, T.two2 + 0.5));
  }
}
