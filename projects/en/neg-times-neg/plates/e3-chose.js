// e3 · What we chose (hồi IV, câu 99–103) — chỗ DUY NHẤT của video gạch hiểu lầm (DNA §1):
//   giấy nhớ "IT'S JUST A CONVENTION" (như a0 vùng 1) → gạch xanh băng → "FORCED BY THE RULES WE KEPT" viết ngà ngay dưới;
//   "There was one choice" → thẻ "NEGATIVES OBEY THE SAME RULES"; ba mũi tên ép đúng lời:
//   0 × b = 0 → (−a) × b = −ab → (−a) × (−b) = ab (vàng ở kết luận), mỗi bước kèm ví dụ số 3 và 2 của hồi III.
import { C, ARC, MONO, clamp, prog, ground, drift, card, typed, label, eq, mid, stickyNote, strike, line, arrow, ring,
  num, par, lookup, must, typeCues } from '../kit.js';

export default class Chose {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.T = {
      honest: w(99, 'honest'), convention: w(99, 'convention'), e99: L(99).end,
      one: w(100, 'one'), choice: w(100, 'choice'), neg: w(100, 'negative'), same: w(100, 'same'), number: w(100, 'number'),
      nothing: w(101, 'nothing'), choice2: w(101, 'choice', 2), distributive: w(101, 'distributive'), zero1: w(101, 'zero'),
      zero2: w(101, 'zero', 2), e101: L(101).end,
      opposite: w(102, 'opposite'), neg2: w(102, 'negative'), positive2: w(102, 'positive'), neg2b: w(102, 'negative', 2), e102: L(102).end,
      together: w(103, 'together'), neg3: w(103, 'negative'), neg3b: w(103, 'negative', 2), positive3: w(103, 'positive'),
      there: w(103, 'there'), other: w(103, 'other'), out: w(103, 'out'),
    };
    this.START = L(99).start; this.FROM = this.START - 1.2;
    // ví dụ số của hồi III (d2–d4), tính bằng code
    this.V = { z: must('0 × 2', 0), np: must('(−3) × 2', -6), nn: must('(−3) × (−2)', 6) };
  }
  sfx() {
    const T = this.T, fixed = 'FORCED BY THE RULES WE KEPT';
    return [
      { t: T.convention, kind: 'tick' },                               // CONVENTION viết vào
      { t: T.neg, kind: 'tick' },                                      // thẻ "the one choice" viết vào
      { t: T.nothing + 0.05, kind: 'error' },                          // gạch băng lên hiểu lầm
      ...typeCues(fixed, T.nothing + 0.45, T.distributive + 0.1),
      { t: T.zero1 + 0.3, kind: 'tick' },                              // 0 × b = 0
      { t: T.neg2 + 0.1, kind: 'tick' },                               // (−a) × b = −ab
      { t: T.positive3, kind: 'correct' },                             // (−a) × (−b) = ab
    ];
  }
  render(g, t) {
    const T = this.T, cam = drift(t, this.FROM, { vx: 2, vy: 1, max: 36 });
    ground(g, 'mat', cam.x, cam.y);
    g.save(); g.translate(-cam.x, -cam.y);
    this.choiceCard(g, t);
    this.note(g, t);
    this.chain(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.5, this.FROM + 1.9), 'ACT IV', 'WHAT WE CHOSE');
  }
  choiceCard(g, t) {                                   // "there was one choice": thẻ khung ngà, chữ viết vào theo lời
    const T = this.T, x = 140, y = 240, w = 780, h = 200, k = prog(t, T.one - 0.25, T.choice + 0.35);
    if (k <= 0) return;
    g.save(); g.fillStyle = 'rgba(14,21,30,0.45)'; g.globalAlpha = clamp(k * 3); g.fillRect(x, y, w, h); g.restore();
    line(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], C.ink, 2.6, { k });
    label(g, 'the one choice', x + 32, y + 46, prog(t, T.one, T.choice + 0.4));
    typed(g, 'NEGATIVES OBEY', x + 32, y + 112, prog(t, T.neg - 0.1, T.same - 0.1), `800 46px ${ARC}`, C.ink, { ls: 1 });
    typed(g, 'THE SAME RULES', x + 32, y + 170, prog(t, T.same - 0.1, T.number + 0.3), `800 46px ${ARC}`, C.ink, { ls: 1 });
  }
  note(g, t) {                                         // giấy nhớ của mở bài → gạch băng → ý đúng viết ngay dưới
    const T = this.T, x = 1100, y = 230, w = 620, h = 200;
    const inNote = stickyNote(g, x, y, w, h, prog(t, this.FROM + 0.3, this.FROM + 0.8), { rot: -0.03 });
    let cw = 0;
    inNote(() => {
      typed(g, "IT'S JUST A", 36, 72, prog(t, this.FROM + 0.7, this.FROM + 1.2), `500 26px ${MONO}`, C.noteDim, { ls: 2 });
      typed(g, 'CONVENTION', 36, 146, prog(t, T.convention - 0.2, T.e99), `800 60px ${ARC}`, C.noteInk, { ls: 1 });
      g.save(); g.font = `800 60px ${ARC}`; g.letterSpacing = '1px'; cw = g.measureText('CONVENTION').width; g.restore();
      const ks = prog(t, T.nothing - 0.05, T.nothing + 0.4);
      strike(g, 24, 64, 236, 58, clamp(ks * 2), { w: 5, seed: 3 });
      strike(g, 22, 132, 50 + cw, 124, clamp(ks * 2 - 1), { w: 7, seed: 9 });
    });
    typed(g, 'FORCED BY THE RULES WE KEPT', x, y + h + 86, prog(t, T.nothing + 0.45, T.distributive + 0.1),
      `800 40px ${ARC}`, C.ink, { ls: 1 });
  }
  chain(g, t) {                                        // ba bước ép: mỗi bước một mũi tên, kèm ví dụ số nhỏ bên dưới
    const T = this.T, V = this.V, y = 800, S = 54;
    // ba ô đích viền đứt có sẵn từ đầu: chỗ của ba bước sẽ bị ép ra
    const kb = prog(t, this.FROM + 0.3, this.FROM + 1.1);
    if (kb > 0) [[[['0'], [' × b = '], ['0']], 290], [[['(−a)'], [' × b = '], ['−ab']], 900],
      [[['(−a)'], [' × '], ['(−b)'], [' = '], ['ab']], 1520]].forEach(([p, cx], i) => {
      const r = eq(g, p, cx, y, S, 0, { align: 'center' }), x0 = r[0][0] - 28, x1 = r.at(-1)[1] + 28;
      g.save(); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([10, 8]); g.globalAlpha = clamp(kb * 3 - i);
      g.beginPath(); g.roundRect(x0, y - 66, x1 - x0, 156, 12); g.stroke(); g.restore();
    });
    const k1 = prog(t, T.zero1 - 0.1, T.zero2 + 0.2), k2 = prog(t, T.neg2 - 0.1, T.neg2b + 0.4), k3 = prog(t, T.neg3 - 0.1, T.positive3 + 0.2);
    const r1 = eq(g, [['0'], [' × b = '], ['0']], 290, y, S, k1, { align: 'center' });
    const r2 = eq(g, [['(−a)', C.negT], [' × b = '], ['−ab', C.negT]], 900, y, S, k2, { align: 'center' });
    const r3 = eq(g, [['(−a)', C.negT], [' × '], ['(−b)', C.negT], [' = '], ['ab', C.posT]], 1520, y, S, k3, { align: 'center' });
    // ví dụ số (hồi III): dương vàng, âm đỏ
    const sz = 30, yn = 880;
    eq(g, [[num(0)], [' × '], [num(2), C.posT], [' = '], [num(V.z)]], 290, yn, sz, prog(t, T.zero2 - 0.2, T.zero2 + 0.4), { align: 'center' });
    eq(g, [[par(-3), C.negT], [' × '], [num(2), C.posT], [' = '], [num(V.np), C.negT]], 900, yn, sz, prog(t, T.neg2b - 0.2, T.neg2b + 0.5), { align: 'center' });
    eq(g, [[par(-3), C.negT], [' × '], [par(-2), C.negT], [' = '], [num(V.nn), C.posT]], 1520, yn, sz, prog(t, T.positive3 - 0.2, T.positive3 + 0.5), { align: 'center' });
    // mũi tên 1: lựa chọn (thẻ) → 0 × b = 0, nhãn luật phân phối
    arrow(g, 290, 462, 290, 720, prog(t, T.distributive - 0.2, T.zero1), { w: 3.5, bend: 0 });
    label(g, 'distributive law', 320, 600, prog(t, T.distributive, T.zero1 + 0.2), { size: 20 });
    // mũi tên 2: 0 × b = 0 → (−a) × b = −ab, nhãn số đối
    const a2 = [r1.at(-1)[1] + 26, r2[0][0] - 26];
    arrow(g, a2[0], y - 18, a2[1], y - 18, prog(t, T.opposite - 0.2, T.neg2 - 0.1), { w: 3.5 });
    label(g, 'opposites', (a2[0] + a2[1]) / 2, y - 52, prog(t, T.opposite - 0.1, T.neg2), { size: 18, align: 'center' });
    // mũi tên 3: "together they force" — từ bước 2 sang và một cung vòng từ bước 1
    const a3 = [r2.at(-1)[1] + 22, r3[0][0] - 22];
    arrow(g, a3[0], y - 18, a3[1], y - 18, prog(t, T.together - 0.1, T.neg3), { w: 3.5 });
    arrow(g, mid(r1[0]) + 130, y - 70, mid(r3[0]), y - 70, prog(t, T.together, T.neg3 + 0.3), { w: 2.5, bend: -260, color: C.dim, seed: 5 });
    label(g, 'together', (mid(r1[0]) + mid(r3[0])) / 2, 560, prog(t, T.together, T.neg3), { size: 18, align: 'center' });
    // kết luận: khoanh, "no other way"
    ring(g, mid([r3[0][0], r3.at(-1)[1]]), y - 18, (r3.at(-1)[1] - r3[0][0]) / 2 + 40, 50, prog(t, T.positive3, T.positive3 + 0.6), { color: C.ink, w: 3.5 });
    label(g, 'no other way for it to come out', 1520, 950, prog(t, T.there - 0.1, T.other + 0.4), { color: C.ink, size: 20, align: 'center' });
  }
}

