// e2 · Red, blue, and one box — nối thẳng từ e1 (CONTINUES: cùng ô cửa câu đố X 120, Y 168, cs 84; số ẩn).
// "red … top four rows" lắp kính đỏ từng hàng; "blue … five columns" kính xanh gân từng cột (ô chung thành kính đôi);
// "overlap" nhấc kính đôi; "five by five" / "four by four" viền hai vuông; "top left box out of red" gỡ kính đỏ khối 1
// → "+2 SETS"; "y squared cage" viền sáng đúng lồng y² (code kiểm phần đỏ còn lại = lồng y²).
import { C, prog, lookup, must, outCubic, ground, window9, outline, pane, puzzle, text, MONO, it, eq, sectionTag,
  CELLS, SQ, SQ_SMALL, SQ_BIG, CAGES } from '../kit.js';

const GX = 120, GY = 168, CS = 84, RX = 1000;
const CREDIT = 'Difference of Squares · puzzle by MathGuy_12 · SudokuPad';
const spaced = (cues, gap) => { const out = []; for (const c of cues.sort((a, b) => a.t - b.t)) if (!out.length || c.t - out.at(-1).t >= gap) out.push(c); return out; };
const key = cells => cells.map(([r, c]) => r * 9 + c).sort((a, b) => a - b).join();

/** Kính từng ô theo thời gian: set(cells, t0, kind | prev → kind, step) — lắp (thêm lớp) hay nhấc (bớt lớp) tự suy từ hạng. */
const RANK = { hole: 0, clear: 1, red: 2, blue: 2, dbl: 3 };
function glass(init, dur = 0.45) {
  const ch = CELLS.map(([r, c]) => [[-1e9, init(r, c), dur]]);
  const now = i => ch[i].at(-1)[1];
  return {
    set(cells, t0, kind, step = 0.03, d = dur) {
      cells.forEach(([r, c], i) => { const j = r * 9 + c, k = typeof kind === 'function' ? kind(now(j)) : kind; ch[j].push([t0 + (typeof step === 'function' ? step(r, c, i) : i * step), k, d]); });
    },
    cells: kind => CELLS.filter(([r, c]) => now(r * 9 + c) === kind),       // trạng thái SAU mọi set đã gọi
    at(r, c, t) {
      const a = ch[r * 9 + c]; let j = 0; for (let n = 1; n < a.length; n++) if (t >= a[n][0]) j = n;
      const [t0, k1, d] = a[j], k0 = j ? a[j - 1][1] : k1, p = j ? prog(t, t0, t0 + d) : 1;
      if (p >= 1 || k0 === k1) return { base: k1 };
      return RANK[k1] > RANK[k0] ? { base: k0, over: k1, k: p } : { base: k1, over: k0, k: 1 - p };
    },
  };
}
/** Ô cửa + lớp kính đang lắp/nhấc vẽ đè đúng hình học ô của window9. */
function drawWindow(g, G, t) {
  const P = window9(g, GX, GY, CS, { kindOf: (r, c) => G.at(r, c, t).base, digits: () => null });
  const thin = Math.max(4, CS * 0.07), thick = thin * 2.1;
  for (const [r, c] of CELLS) { const s = G.at(r, c, t); if (!s.over) continue;
    const l = c % 3 ? thin / 2 : thick / 2, tp = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2;
    pane(g, GX + c * CS + l, GY + r * CS + tp, CS - l - rg, s.over, r * 9 + c + 1, s.k); }
  return P;
}
const BG = { red: C.red, blue: C.blue, clear: C.clear, dbl: C.clear, hole: C.hole };

export default class Colour {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    const T = this.T = {
      same: w(61, 'same'), red: w(62, 'red'), rows: w(62, 'rows'), blue: w(62, 'blue'), right: w(62, 'right'),
      overlap: w(63, 'overlap'), five: w(63, 'five', 1), holds: w(63, 'holds'), four: w(63, 'four', 1), sq2: w(63, 'square', 2),
      now: w(64, 'now'), box: w(64, 'box'), gone: w(64, 'gone'),
      blue2: w(65, 'blue'), two: w(65, 'two'), exactly: w(66, 'exactly'), y: w(66, 'y'), cage: w(66, 'cage'), end: L(66).end,
    };
    this.START = L(61).start;
    this.FROM = Math.max(this.START - 1.2, L(60).end + 0.5);
    this.NEXT = Math.max(L(67).start - 1.2, L(66).end + 0.5);          // FROM của e3 — cột phải trượt ra trước đó
    this.CONTINUES = true;                                            // e1 kết đúng ô cửa này (kính trong, câu đố đủ)

    const G = this.G = glass(() => 'clear');
    for (let r = 0; r <= 3; r++) G.set(CELLS.filter(([a]) => a === r), T.red + r * 0.24, 'red');            // 4 hàng đỏ
    for (let c = 4; c <= 8; c++) G.set(CELLS.filter(([, b]) => b === c), T.blue + (c - 4) * 0.2, p => (p === 'red' ? 'dbl' : 'blue'));
    must(`${G.cells('dbl').length}`, 20);                                                            // khối 4×5 chung
    this.DBL = G.cells('dbl');
    G.set(this.DBL, T.overlap, 'hole', 0.02);                                                        // nhấc kính đôi
    must(`'${key(G.cells('red'))}' === '${key(SQ_SMALL)}' && '${key(G.cells('blue'))}' === '${key(SQ_BIG)}'`, true);
    G.set(CELLS.filter(([r, c]) => r <= 2 && c <= 2), T.box, 'clear', 0.04);                        // khối 1 ra khỏi đỏ
    must(`'${key(G.cells('red'))}' === '${key(CAGES[2].ce)}'`, true);                                // đỏ còn = lồng y²
    // số bộ: đỏ 4 hàng, xanh 5 cột; bỏ chung → xanh hơn 1 bộ; bỏ khối 1 khỏi đỏ → hơn 2 bộ
    this.N = { red: 4, blue: 5, one: must('5 − 4', 1), two: must('5 − (4 − 1)', 2) };
    must(`${SQ.red(3, 0)} && ${SQ.blue(0, 4)} && !${SQ.blue(0, 3)}`, true);
  }
  sfx() {
    const T = this.T;
    return spaced([{ t: T.red, kind: 'chip' }, { t: T.blue, kind: 'chip' }, { t: T.overlap + 0.1, kind: 'snap' },
      { t: T.holds, kind: 'pen' }, { t: T.box + 0.1, kind: 'snap' }, { t: T.two, kind: 'pen' }, { t: T.y, kind: 'tick' }], 1.3);
  }
  render(g, t) {
    const T = this.T, N = this.N;
    ground(g);
    sectionTag(g, 'ACT IV · RED, BLUE, AND ONE BOX', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    const P = drawWindow(g, this.G, t);
    puzzle(g, P, { bgOf: cg => { const [r, c] = cg.ce.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])[0]; return BG[this.G.at(r, c, t).base]; } });
    const off = 1 - prog(t, T.now, T.now + 0.4);
    outline(g, P, SQ_BIG, C.blueT, prog(t, T.five - 0.1, T.five + 0.4) * off, 6);
    outline(g, P, SQ_SMALL, C.redT, prog(t, T.four - 0.1, T.four + 0.4) * off, 6);
    outline(g, P, CAGES[2].ce, C.redT, prog(t, T.y - 0.1, T.y + 0.4), 7);
    text(g, CREDIT, GX, 1008, `500 18px ${MONO}`, C.dim);

    const out = outCubic(prog(t, this.NEXT - 0.5, this.NEXT));
    g.save(); g.translate(out * 1000, 0);
    it(g, 'the same colouring', RX, 250, 52, C.ink, { k: prog(t, Math.max(this.FROM + 0.3, T.same - 0.4), T.same + 0.4) });
    eq(g, [['red', C.redT], [` · top ${N.red} rows · ${N.red} sets`]], RX, 340, 44, { k: prog(t, T.red, T.rows + 0.4) });
    eq(g, [['blue', C.blueT], [` · right ${N.blue} columns · ${N.blue} sets`]], RX, 400, 44, { k: prog(t, T.blue, T.right + 0.4) });
    eq(g, [['5×5', C.blueT], [' = '], ['4×4', C.redT], [` + ${N.one} set`]], RX, 500, 60, { k: prog(t, T.holds - 0.3, T.sq2 + 0.3) });
    it(g, 'top-left box out of red: one more set gone', RX, 580, 36, C.ink, { k: prog(t, T.box, T.gone + 0.2) });
    eq(g, [['blue', C.blueT], [' = '], ['red', C.redT], [` + ${N.two} sets`]], RX, 700, 72, { k: prog(t, T.blue2, T.two + 0.5) });
    eq(g, [['red', C.redT], [' = the '], ['y²', C.redT], [' cage']], RX, 810, 60, { k: prog(t, T.exactly - 0.3, T.cage + 0.2) });
    g.restore();
  }
}
