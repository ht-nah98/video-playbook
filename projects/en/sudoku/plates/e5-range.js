// e5 · Two ones, and a range — cùng ô cửa câu đố (X 120, Y 168, cs 84) như e4; cột phải nối "x − y = 1" của e4.
// "ones" → hai ô x − y hiện 1; "bottom row" → viền hàng 9, lồng y → y ≥ 2 + 3 = 5; lồng y²: phần cột, phần hàng
// (renban ba ô, ≤ 7 + 8 + 9 = 24), ô góc r4c4 ≤ 6 → y² ≤ 54 < 64 → y ≤ 7 → y = 5, 6 hoặc 7, x = y + 1.
import { C, prog, lookup, must, outBack, clamp, ground, window9, lens, puzzle, outline, it, label, eq, text, sectionTag,
  CAGES, X, Y, Y2_MAX, MONO, ARC } from '../kit.js';

const X0 = 120, Y0 = 168, CS = 84, R = 1036;
const kindOf = (r, c) => { for (const k of CAGES) if (k.set && k.ce.some(([a, b]) => a === r && b === c)) return k.set; return 'clear'; };
const bgOf = k => (k.set === 'red' ? C.red : k.set === 'blue' ? C.blue : C.clear);
const credit = g => text(g, 'Difference of Squares · puzzle by MathGuy_12 · SudokuPad', X0, 1008, `500 18px ${MONO}`, C.dim);
const LABEL_CELLS = CAGES.map(k => k.ce.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])[0]);
/** Số trong ô câu đố: viền kính trong để đọc được trên renban/mũi tên; ô có nhãn lồng → số nhỏ, lùi xuống (khung lab 1). */
function cellDigit(g, r, c, v, k) {
  if (k <= 0) return; const lab = LABEL_CELLS.some(([a, b]) => a === r && b === c), size = lab ? 42 : 46;
  const x = X0 + c * CS + CS / 2, y = Y0 + r * CS + CS / 2 + (lab ? CS * 0.14 : 0) + size * 0.36, s = outBack(clamp(k));
  g.save(); g.translate(x, y - size * 0.36); g.scale(s, s); g.font = `600 ${size}px ${ARC}`; g.textAlign = 'center';
  g.lineJoin = 'round'; g.strokeStyle = C.clear; g.lineWidth = 7; g.strokeText(String(v), 0, size * 0.36);
  g.fillStyle = C.digit; g.fillText(String(v), 0, size * 0.36); g.restore();
}
const XY = CAGES.filter(k => k.v === 'x − y').map(k => k.ce[0]);
const YC = CAGES[1].ce, Y2 = CAGES[2].ce, COLP = Y2.filter(([r, c]) => c === 3 && r <= 2),
  ROWP = Y2.filter(([r, c]) => r === 3 && c <= 2), CORNER = [[3, 3]], ROW9 = [...Array(9)].map((_, c) => [8, c]);

export default class Range {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e5');
    this.T = {
      both: w(85, 'both'), ones: w(85, 'ones'), one: w(86, 'one'), bottom: w(86, 'bottom'), ycage: w(86, 'y'),
      two: w(86, 'two', 2), five: w(86, 'five'), y2: w(87, 'y'), big: w(87, 'big'), column: w(88, 'column'), row: w(88, 'row'),
      nine: w(88, 'nine'), each: w(88, 'each'), corner: w(88, 'corner'), them: w(88, 'them'), so: w(89, 'so'),
      f54: w(89, 'fifty-four'), f64: w(89, 'sixty-four'), seven: w(89, 'seven'), y: w(90, 'y'), more: w(90, 'more'), end: L(90).end,
    };
    this.START = L(85).start;
    this.FROM = Math.max(this.START - 1.2, L(84).end + 0.5);
    // trạng thái đã xong (CONTENT.md "Khoảng"): y ≥ 2 + 3; phần cột/hàng ≤ 7 + 8 + 9; góc ≤ 6; y² ≤ 54 < 64
    must('2 + 3', 5); must('7 + 8 + 9', 24); must(`24 + 24 + 6`, Y2_MAX); must(`${Y2_MAX} < 8^2 && ${Y2_MAX} >= 7^2`, true);
    must(`${COLP.length === 3 && ROWP.length === 3 && Y2.length === 7}`, true);
    this.yMin = 2 + 3; this.yMax = [...Array(10).keys()].filter(v => v * v <= Y2_MAX).at(-1);
    must(`${this.yMin}`, 5); must(`${this.yMax}`, 7);
    this.ys = [...Array(this.yMax - this.yMin + 1)].map((_, i) => this.yMin + i); must(`'${this.ys.join()}'`, '5,6,7');
    must(`${Y} >= ${this.yMin} && ${Y} <= ${this.yMax} && ${X} − ${Y} === 1`, true);   // lời giải thật nằm trong khoảng
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ones, kind: 'tick' }, { t: T.two, kind: 'pen' }, { t: T.column, kind: 'tick' }, { t: T.corner, kind: 'tick' },
      { t: T.f54, kind: 'pen' }, { t: T.y + 0.1, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera: hai ô x − y → lồng y ở hàng 9 → lồng y² (phần cột, phần hàng, ô góc) → lùi về toàn ô cửa khi ra khoảng y
    const cam = [[T.ones - 0.5, 7, 5, 1.5], [T.ycage - 0.3, 8, 0.5, 1.8], [T.y2 - 0.3, 2, 1.5, 1.55], [T.corner - 0.3, 3, 3, 1.9],
      [T.so - 0.2, 2, 1.5, 1.4], [T.y - 0.3, 4, 4, 1]];
    lens(g, t, { X: X0, Y: Y0, cs: CS }, cam, [0, 120, 990, 860], () => {
    const P = window9(g, X0, Y0, CS, { kindOf, digits: () => null });
    puzzle(g, P, { bgOf });
    // hai ô x − y hiện 1 (so le nhẹ)
    XY.forEach(([r, c], i) => cellDigit(g, r, c, 1, prog(t, T.ones - 0.15 + i * 0.2, T.ones + 0.2 + i * 0.2)));
    // hàng 9 có 1 → lồng y ≥ 5
    const offA = 1 - prog(t, T.y2 - 0.3, T.y2 + 0.2);
    outline(g, P, ROW9, C.ink, prog(t, T.bottom, T.bottom + 0.35) * offA, 5);
    outline(g, P, YC, C.redT, prog(t, T.ycage, T.ycage + 0.35) * offA, 6);
    // lồng y²: cả lồng → phần cột → phần hàng → ô góc
    outline(g, P, Y2, C.redT, prog(t, T.y2 - 0.1, T.y2 + 0.3) * (1 - prog(t, T.column - 0.2, T.column + 0.1)) + prog(t, T.so, T.so + 0.4), 6);
    const parts = 1 - prog(t, T.so - 0.2, T.so + 0.2);
    outline(g, P, COLP, C.redT, prog(t, T.column, T.column + 0.3) * parts, 7);
    outline(g, P, ROWP, C.redT, prog(t, T.row, T.row + 0.3) * parts, 7);
    outline(g, P, CORNER, C.ink, prog(t, T.corner, T.corner + 0.3) * parts, 7);
    });
    credit(g);

    sectionTag(g, 'ACT IV · TWO ONES, AND A RANGE', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    eq(g, [['x − y = '], ['1']], R, 196, 60, { k: prog(t, this.FROM + 0.3, this.FROM + 0.8) });
    label(g, 'row 9 already has a 1', R, 268, { k: prog(t, T.one, T.one + 0.6) });
    eq(g, [['y', C.redT], [' ≥ 2 + 3'], [` = ${this.yMin}`]], R, 360, 84, { k: prog(t, T.two, T.five + 0.2) });
    it(g, 'column  ≤ 7 + 8 + 9 = 24', R, 456, 36, C.ink, { k: prog(t, T.column, T.nine + 0.3) });
    it(g, 'row  ≤ 7 + 8 + 9 = 24', R, 504, 36, C.ink, { k: prog(t, T.row, T.each + 0.2) });
    it(g, 'corner ≠ all six  →  ≤ 6', R, 552, 36, C.ink, { k: prog(t, T.corner, T.them + 0.2) });
    eq(g, [['y²', C.redT], [' ≤ 24 + 24 + 6'], [` = ${Y2_MAX}`]], R, 664, 72, { k: prog(t, T.so, T.f54 + 0.3) });
    eq(g, [[`${Y2_MAX} < 64 = 8²`], ['   so  '], ['y', C.redT], [` ≤ ${this.yMax}`]], R, 752, 60, { k: prog(t, T.f64, T.seven + 0.2) });
    const E = eq(g, [['y', C.redT], [` = ${this.ys.slice(0, -1).join(', ')} or ${this.ys.at(-1)}`], ['   ·   '], ['x', C.redT], [' = y + 1']], R, 880, 72, { k: prog(t, T.y, T.more + 0.1) });
    const bx = prog(t, T.more, T.more + 0.4);
    if (bx > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.globalAlpha = bx; g.beginPath();
      g.roundRect(R - 24, 880 - 62, E[4][1] - R + 48, 88, 10); g.stroke(); g.restore(); }
    must(`${E[4][1] + 24 < 1824}`, true);
  }
}
