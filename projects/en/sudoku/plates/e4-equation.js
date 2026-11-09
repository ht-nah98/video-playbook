// e4 · The equation — ĐÚNG KHUNG LAB 1 (tools/lab/glass.html). Câu đố ở X 120, Y 168, cs 84 (như e1–e3).
// Đầu cảnh chỉ còn lồng x² (kính xanh) và y², x, y (kính đỏ) — CAGES, khớp DOS sau ba mũi tên triệt nhau.
// Lời gọi tên lồng nào → viền sáng lồng đó; phương trình khắc từng dòng ở cột phải theo lời:
// x² = y² + x + y → x² − y² = x + y → (x − y)(x + y) = x + y → x − y = 1. Mascot `ok` nhỏ góc phải dưới, NÓI.
import { W, H, C, prog, lookup, must, ground, window9, lens, puzzle, outline, it, label, eq, text, figure, sectionTag,
  CAGES, DOS, X, Y, MONO } from '../kit.js';

const X0 = 120, Y0 = 168, CS = 84, R = 1036;                    // ô cửa câu đố + cột phương trình
const kindOf = (r, c) => { for (const k of CAGES) if (k.set && k.ce.some(([a, b]) => a === r && b === c)) return k.set; return 'clear'; };
const bgOf = k => (k.set === 'red' ? C.red : k.set === 'blue' ? C.blue : C.clear);
const [CX, CY, CY2, CX2] = [0, 1, 2, 3].map(i => CAGES[i]);     // x, y, y², x²
const credit = g => text(g, 'Difference of Squares · puzzle by MathGuy_12 · SudokuPad', X0, 1008, `500 18px ${MONO}`, C.dim);

export default class Equation {
  static ERA = 'glass';
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e4');
    this.T = {
      survives: w(76, 'survives'), blue: w(77, 'blue'), x2: w(77, 'x'), red: w(78, 'red'), y2: w(78, 'y'), xc: w(78, 'x'),
      yc: w(78, 'y', 2), e1: w(79, 'so'), e1z: L(79).end, algebra: w(80, 'algebra'), move: w(81, 'move'), e2: w(81, 'x'),
      e2z: L(81).end, diff: w(82, 'difference'), e3: w(82, 'so'), e3z: L(82).end, isnt: w(83, 'isn\'t'), e4: w(83, 'so'),
      one: w(83, 'one'), title: w(84, 'title'), grid: w(84, 'grid'), and: w(84, 'and'), equation: w(84, 'equation'), end: L(84).end,
    };
    this.START = L(76).start;
    this.FROM = Math.max(this.START - 1.2, L(75).end + 0.5);
    this.CONTINUES = true;                                  // khung đầu = khung cuối e3 (cùng ô cửa, chỉ còn x² xanh / y² + x + y đỏ) — §50
    // trạng thái đã xong: lồng còn lại đúng là phần DOS; phương trình đúng với x, y của lời giải; x + y ≠ 0 → x − y = 1
    const inS = (a, S) => a.every(([r, c]) => S.some(([p, q]) => p === r && q === c));
    must(`${inS(CX2.ce, DOS.blue) && inS([...CY2.ce, ...CX.ce, ...CY.ce], DOS.red)}`, true);
    must(`${X}^2 === ${Y}^2 + ${X} + ${Y}`, true);
    must(`(${X} − ${Y})*(${X} + ${Y}) === ${X} + ${Y} && ${X} + ${Y} !== 0`, true);
    must(`${X} − ${Y}`, 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.x2, kind: 'tick' }, { t: T.e1, kind: 'pen' }, { t: T.e2, kind: 'pen' }, { t: T.e3, kind: 'pen' },
      { t: T.one, kind: 'correct' }, { t: T.grid + 0.8, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera: theo tên lồng (x², y², x, y) → lùi ở "algebra" → đẩy chậm vào lồng y² suốt lúc giải → toàn ô cửa ở "grid"
    const cam = [[T.x2 - 0.4, 5.5, 5.5, 1.45], [T.y2 - 0.3, 2, 1.5, 1.5], [T.xc - 0.3, 0.5, 8, 1.7], [T.yc - 0.3, 8, 0.5, 1.7],
      [T.algebra - 0.2, 4, 4, 1], [T.move, 3.5, 3.5, 1.15, Math.max(0.7, T.one - T.move)], [T.grid - 0.3, 4, 4, 1]];
    lens(g, t, { X: X0, Y: Y0, cs: CS }, cam, [0, 120, 990, 860], () => {
    const P = window9(g, X0, Y0, CS, { kindOf, digits: () => null });
    puzzle(g, P, { bgOf });
    // gọi tên lồng → viền sáng; "the grid itself is a difference of squares" → hai lồng vuông sáng lại
    const back = 1 - prog(t, T.algebra, T.algebra + 0.6), sq = prog(t, T.grid, T.grid + 0.4);
    outline(g, P, CX2.ce, C.blueT, Math.max(prog(t, T.x2 - 0.1, T.x2 + 0.3) * back, sq), 6);
    outline(g, P, CY2.ce, C.redT, Math.max(prog(t, T.y2 - 0.1, T.y2 + 0.3) * back, sq), 6);
    outline(g, P, CX.ce, C.redT, prog(t, T.xc - 0.1, T.xc + 0.3) * back, 6);
    outline(g, P, CY.ce, C.redT, prog(t, T.yc - 0.1, T.yc + 0.3) * back, 6);
    });
    credit(g);

    sectionTag(g, 'ACT IV · THE EQUATION', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    // cột phải: nhãn kính theo lời, rồi phương trình từng dòng
    label(g, 'what survives', R, 180, { k: prog(t, T.survives - 0.2, T.survives + 0.4) });
    const E1 = eq(g, [['x²', C.blueT], [' = '], ['y² + x + y', C.redT]], R, 330, 104, { k: prog(t, T.e1, T.e1z) });
    label(g, 'blue glass', (E1[0][0] + E1[0][1]) / 2, 236, { color: C.blueT, align: 'center', k: prog(t, T.blue, T.blue + 0.4) });
    label(g, 'red glass', E1[2][0], 236, { color: C.redT, k: prog(t, T.red, T.red + 0.4) });
    must(`${(E1[0][0] + E1[0][1]) / 2 + 80 < E1[2][0]}`, true);
    it(g, 'that is algebra — finish it', R, 386, 32, C.dim, { k: prog(t, T.algebra - 0.2, T.algebra + 0.6) });
    const E2 = eq(g, [['x² − y²'], [' = x + y']], R, 470, 84, { k: prog(t, T.move, T.e2z) });
    // "difference of squares" → gạch chân x² − y²
    const u = prog(t, T.diff, T.diff + 0.5);
    if (u > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(E2[0][0], 492);
      g.lineTo(E2[0][0] + (E2[0][1] - E2[0][0]) * u, 492); g.stroke(); g.restore(); }
    label(g, 'difference of squares', E2[0][0], 524, { k: prog(t, T.diff, T.diff + 0.6) });
    eq(g, [['(x − y)'], ['(x + y)'], [' = x + y']], R, 620, 84, { k: prog(t, T.e3, T.e3z) });
    it(g, 'x + y ≠ 0, so divide by it', R, 676, 32, C.dim, { k: prog(t, T.isnt - 0.2, T.e4) });
    const E4 = eq(g, [['x − y =  '], ['1']], R, 820, 132, { k: prog(t, T.e4, T.one + 0.1) });
    const bx = prog(t, T.one, T.one + 0.4);
    if (bx > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.globalAlpha = bx; g.beginPath();
      g.roundRect(E4[1][0] - 22, 820 - 108, E4[1][1] - E4[1][0] + 44, 134, 10); g.stroke(); g.restore(); }
    it(g, 'the grid is a difference of squares —', R, 920, 36, C.ink, { k: prog(t, T.grid, T.and) });
    it(g, 'and so is the equation.', R, 966, 36, C.ink, { k: prog(t, T.and, T.equation + 0.3) });

    // mascot `ok` nhỏ góc phải dưới, nói quanh "x − y must be one" (≈ 7 s)
    const kf = prog(t, T.isnt - 0.6, T.isnt - 0.2) * (1 - prog(t, T.equation, T.equation + 0.35));
    const f = figure(g, 'ok', 1740, H, 430, kf, { t, crop: 1 });
    if (f && kf >= 1) { must(`${E4[1][1] + 22 < f.x + f.w * 0.2}`, true); }
  }
}
