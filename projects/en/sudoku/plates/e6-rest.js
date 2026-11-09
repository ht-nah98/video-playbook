// e6 · The rest of the grid — cùng ô cửa câu đố (X 120, Y 168, cs 84). "pinning down … many more steps" → các ô điền
// nhanh theo lời giải D, từng khối một (chùm flap); "Cracking the Cryptic … close to an hour" → "≈ 1 HOUR"; "x is eight,
// y is seven" → lồng x, y sáng; 49 · 64 · 64 − 49 = 15 = 8 + 7 (tính từ lời giải, must) — lồng 15 sáng ở "fifteen".
import { C, prog, lookup, must, outBack, clamp, ground, window9, puzzle, outline, label, eq, text, sectionTag,
  CAGES, D, X, Y, sum, boxOf, CELLS, MONO, ARC } from '../kit.js';

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
const isXY = (r, c) => XY.some(([a, b]) => a === r && b === c);
const [CX, CY, CY2, CX2, , , C15] = CAGES;
// thứ tự điền: khối 1 → 9, trong khối theo hàng; ô x − y đã có số 1 từ e5
const ORDER = CELLS.filter(([r, c]) => !isXY(r, c)).sort(([r, c], [p, q]) => boxOf(r, c) - boxOf(p, q) || r - p || c - q);
const BOX_STEP = 0.62, CELL_STEP = 0.05;

export default class Rest {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e6');
    this.T = {
      pin: w(91, 'pinning'), cracking: w(92, 'cracking'), hour: w(92, 'hour'), lands: w(93, 'lands'), eight: w(93, 'eight'),
      seven: w(93, 'seven'), y2: w(94, 'y'), f49: w(94, 'forty-nine'), x2: w(94, 'x'), f64: w(94, 'sixty-four'),
      and: w(95, 'and'), minus: w(95, 'minus'), fifteen: w(95, 'fifteen'), e8: w(95, 'eight'), e7: w(95, 'seven'), end: L(95).end,
    };
    this.START = L(91).start;
    this.FROM = Math.max(this.START - 1.2, L(90).end + 0.5);
    this.at = (r, c) => this.T.pin + boxOf(r, c) * BOX_STEP + (ORDER.filter(([p, q]) => boxOf(p, q) === boxOf(r, c)).findIndex(([p, q]) => p === r && q === c)) * CELL_STEP;
    this.fillEnd = this.T.pin + 8 * BOX_STEP + 8 * CELL_STEP + 0.3;
    // trạng thái đã xong — mọi số tính từ lời giải
    this.Y2s = sum(CY2.ce); this.X2s = sum(CX2.ce); this.F = sum(C15.ce);
    must(`${X}`, 8); must(`${Y}`, 7); must(`${this.Y2s}`, 49); must(`${this.X2s}`, 64);
    must(`${this.X2s} − ${this.Y2s}`, this.F); must(`${this.F}`, 15); must(`${X} + ${Y}`, this.F);
    must(`${XY.every(([r, c]) => D(r, c) === 1)}`, true);
    must(`${this.fillEnd < this.T.lands}`, true);                  // lưới điền xong trước "here is where it lands"
  }
  sfx() {
    const T = this.T;
    return [...[...Array(9)].map((_, b) => ({ t: T.pin + b * BOX_STEP + 0.05, kind: 'flap' })),
      { t: this.fillEnd, kind: 'shimmer' }, { t: T.eight, kind: 'pen' }, { t: T.f64, kind: 'tick' }, { t: T.e8, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const P = window9(g, X0, Y0, CS, { kindOf, digits: () => null });
    puzzle(g, P, { bgOf });
    XY.forEach(([r, c]) => cellDigit(g, r, c, 1, 1));
    for (const [r, c] of ORDER) { const a = this.at(r, c); cellDigit(g, r, c, D(r, c), prog(t, a, a + 0.22)); }
    const off = 1 - prog(t, T.y2 - 0.3, T.y2);
    outline(g, P, CX.ce, C.redT, prog(t, T.eight - 0.1, T.eight + 0.3) * off, 6);
    outline(g, P, CY.ce, C.redT, prog(t, T.seven - 0.1, T.seven + 0.3) * off, 6);
    const off2 = 1 - prog(t, T.minus, T.minus + 0.3);
    outline(g, P, CY2.ce, C.redT, prog(t, T.y2 - 0.1, T.y2 + 0.3) * off2, 6);
    outline(g, P, CX2.ce, C.blueT, prog(t, T.x2 - 0.1, T.x2 + 0.3) * off2, 6);
    outline(g, P, C15.ce, C.ink, prog(t, T.fifteen - 0.1, T.fifteen + 0.3), 6);
    credit(g);

    sectionTag(g, 'ACT IV · THE REST OF THE GRID', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    eq(g, [['x − y = 1']], R, 196, 60, { k: prog(t, this.FROM + 0.3, this.FROM + 0.8) });
    label(g, 'many more steps', R, 268, { k: prog(t, T.pin + 0.4, T.pin + 1.4) });
    label(g, '≈ 1 hour · Cracking the Cryptic', R, 316, { size: 26, color: C.ink, k: prog(t, T.cracking, T.hour + 0.2) });
    eq(g, [['x', C.redT], [` = ${X}`], ['   ·   '], ['y', C.redT], [` = ${Y}`]], R, 460, 104,
      { k: Math.min(prog(t, T.lands, T.eight + 0.15) * 0.4, 0.4) + prog(t, T.seven - 0.2, T.seven + 0.15) * 0.6 });
    eq(g, [['y²', C.redT], [` cage = ${this.Y2s}`]], R, 590, 72, { k: prog(t, T.y2, T.f49 + 0.2) });
    eq(g, [['x²', C.blueT], [` cage = ${this.X2s}`]], R, 680, 72, { k: prog(t, T.x2, T.f64 + 0.2) });
    const E = eq(g, [[`${this.X2s} − ${this.Y2s}`], [` = ${this.F}`], [` = ${X} + ${Y}`]], R, 850, 84,
      { k: Math.max(prog(t, T.and, T.fifteen + 0.15) * 2 / 3, (2 + prog(t, T.e8 - 0.1, T.e7 + 0.1)) / 3 * (t >= T.e8 - 0.1)) });
    must(`${E[2][1] + 24 < 1824}`, true);
    const bx = prog(t, T.e7, T.e7 + 0.3);
    if (bx > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.globalAlpha = bx; g.beginPath();
      g.roundRect(R - 24, 850 - 70, E[2][1] - R + 48, 96, 10); g.stroke(); g.restore(); }
  }
}
