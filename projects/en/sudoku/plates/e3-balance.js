// e3 · Balance the books — nối thẳng từ e2 (CONTINUES: cùng ô cửa X 120, Y 168, cs 84; số ẩn).
// "last column" / "bottom row" lắp kính đỏ (ô xanh thành kính đôi; r9c9 đỏ hai lần → huy hiệu "×2"); "red = blue";
// "remove … one copy at a time" nhấc kính đôi, r9c9 còn đỏ một lần → trạng thái = DOS.red / DOS.blue (code kiểm);
// ba mũi tên ARROWS[0..2] tô nổi đúng lúc nói (thân đỏ ↔ vòng xanh; vòng đỏ r9c9 ↔ thân xanh), mỗi mũi tên một snap.
// "out they go": mọi ô đã nhấc lắp lại kính trong → KHUNG CUỐI = khung đầu e4 (lab 1): chỉ còn lồng x² xanh và
// y² + x + y đỏ, không chữ ở cột phải.
import { C, prog, lookup, must, outCubic, outBack, ground, window9, outline, pane, puzzle, arrow, text, MONO, it, eq, label,
  sectionTag, CELLS, CAGES, ARROWS, DOS } from '../kit.js';

const GX = 120, GY = 168, CS = 84, RX = 1000;
const CREDIT = 'Difference of Squares · puzzle by MathGuy_12 · SudokuPad';
const spaced = (cues, gap) => { const out = []; for (const c of cues.sort((a, b) => a.t - b.t)) if (!out.length || c.t - out.at(-1).t >= gap) out.push(c); return out; };
const key = cells => cells.map(([r, c]) => r * 9 + c).sort((a, b) => a - b).join();

/** Kính từng ô theo thời gian (giống e2 — đáng gom vào kit). */
const RANK = { hole: 0, clear: 1, red: 2, blue: 2, dbl: 3 };
function glass(init, dur = 0.45) {
  const ch = CELLS.map(([r, c]) => [[-1e9, init(r, c), dur]]);
  const now = i => ch[i].at(-1)[1];
  return {
    set(cells, t0, kind, step = 0.03, d = dur) {
      cells.forEach(([r, c], i) => { const j = r * 9 + c, k = typeof kind === 'function' ? kind(now(j)) : kind; ch[j].push([t0 + (typeof step === 'function' ? step(r, c, i) : i * step), k, d]); });
    },
    cells: kind => CELLS.filter(([r, c]) => now(r * 9 + c) === kind),
    at(r, c, t) {
      const a = ch[r * 9 + c]; let j = 0; for (let n = 1; n < a.length; n++) if (t >= a[n][0]) j = n;
      const [t0, k1, d] = a[j], k0 = j ? a[j - 1][1] : k1, p = j ? prog(t, t0, t0 + d) : 1;
      if (p >= 1 || k0 === k1) return { base: k1 };
      return RANK[k1] > RANK[k0] ? { base: k0, over: k1, k: p } : { base: k1, over: k0, k: 1 - p };
    },
  };
}
function drawWindow(g, G, t) {
  const P = window9(g, GX, GY, CS, { kindOf: (r, c) => G.at(r, c, t).base, digits: () => null });
  const thin = Math.max(4, CS * 0.07), thick = thin * 2.1;
  for (const [r, c] of CELLS) { const s = G.at(r, c, t); if (!s.over) continue;
    const l = c % 3 ? thin / 2 : thick / 2, tp = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2;
    pane(g, GX + c * CS + l, GY + r * CS + tp, CS - l - rg, s.over, r * 9 + c + 1, s.k); }
  return P;
}
const BG = { red: C.red, blue: C.blue, clear: C.clear, dbl: C.clear, hole: C.hole };
/** Mũi tên tô nổi hai màu: thân + đầu màu `body`, vòng màu `ring` (k của từng phần). */
function arrow2(g, P, a, body, kb, ring, kr) {
  if (kb > 0) arrow(g, P, a, { color: body, w: 5, k: kb });
  if (kr > 0) { const [x, y] = P.ctr(...a[0]); g.save(); g.globalAlpha = Math.min(1, kr); g.strokeStyle = ring; g.lineWidth = 6;
    g.beginPath(); g.arc(x, y, P.cs * 0.38, 0, 7); g.stroke(); g.restore(); }
}

export default class Balance {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    const T = this.T = {
      ahead: w(67, 'ahead'), give: w(67, 'give'), column: w(68, 'column'), bottom: w(68, 'bottom'), row: w(68, 'row'),
      same: w(69, 'same'), digits: w(69, 'digits'),
      corner: w(70, 'corner'), twice: w(70, 'twice'), blue70: w(70, 'blue'), once: w(70, 'once'),
      remove: w(71, 'remove'), both: w(71, 'both'), copy: w(71, 'copy'), time: w(71, 'time'),
      arrows: w(72, 'arrows'),
      red1: w(73, 'red'), arrow1: w(73, 'arrow'), blue1: w(73, 'blue'), out1: w(73, 'out'),
      here: w(74, 'here'), bottom2: w(74, 'bottom'),
      corner3: w(75, 'corner'), red3: w(75, 'red'), arrow3: w(75, 'arrow'), three: w(75, 'three'), blue3: w(75, 'blue'), out3: w(75, 'out'), end: L(75).end,
    };
    this.START = L(67).start;
    this.FROM = Math.max(this.START - 1.2, L(66).end + 0.5);
    this.NEXT = Math.max(L(76).start - 1.2, L(75).end + 0.5);          // FROM của e4 — khung cuối e3 = khung đầu e4
    this.CONTINUES = true;                                            // e2 kết đúng ô cửa này
    must(`${T.out3 + 0.75} < ${this.NEXT}`, true);                    // lắp kính trong xong trước e4

    // khởi đầu = khung cuối e2: đỏ = lồng y², xanh = vuông 5×5 phải dưới, khối 4×5 trên phải đã nhấc
    const y2 = new Set(CAGES[2].ce.map(([r, c]) => r * 9 + c));
    const G = this.G = glass((r, c) => (y2.has(r * 9 + c) ? 'red' : r >= 4 && c >= 4 ? 'blue' : r <= 3 && c >= 4 ? 'hole' : 'clear'));
    const add = p => ({ hole: 'red', clear: 'red', blue: 'dbl', dbl: 'dbl', red: 'red' })[p];   // thêm một lớp đỏ
    G.set(CELLS.filter(([, c]) => c === 8), T.column, add, 0.05);                                  // + cột 9
    G.set(CELLS.filter(([r]) => r === 8), T.bottom, add, 0.05);                                    // + hàng 9
    this.R9C9 = T.bottom + 8 * 0.05;                                                               // r9c9 đỏ lần 2
    // đếm lớp: đỏ 4 hàng − khối 1 + cột 9 + hàng 9 = 5 bộ = xanh 5 cột; r9c9: đỏ ×2, xanh ×1
    this.N = { red: must('4 − 1 + 2', 5), blue: 5 };
    must(`${G.cells('dbl').length}`, 9);                                                           // 4 + 4 + r9c9
    const dbl = G.cells('dbl').filter(([r, c]) => !(r === 8 && c === 8));
    G.set(dbl, T.remove, 'hole', 0.07);                                                            // bỏ chung từng lớp
    G.set([[8, 8]], T.copy, 'red');                                                                // r9c9 còn đỏ một lần
    must(`'${key(G.cells('red'))}' === '${key(DOS.red)}' && '${key(G.cells('blue'))}' === '${key(DOS.blue)}'`, true);
    // ba mũi tên triệt nhau: thân đỏ ↔ vòng xanh (0, 1); vòng đỏ r9c9 ↔ thân xanh (2)
    const isR = ([r, c]) => DOS.red.some(([a, b]) => a === r && b === c), isB = ([r, c]) => DOS.blue.some(([a, b]) => a === r && b === c);
    [0, 1].forEach(i => must(`${isB(ARROWS[i][0]) && ARROWS[i].slice(1).every(isR)}`, true));
    must(`${isR(ARROWS[2][0]) && ARROWS[2].slice(1).every(isB)}`, true);
    G.set(ARROWS[0], T.out1, 'hole', 0.08);
    G.set(ARROWS[1], T.bottom2 + 0.25, 'hole', 0.08);
    G.set(ARROWS[2], T.out3, 'clear', 0.06);                                                       // "out they go"
    G.set(G.cells('hole'), T.out3 + 0.1, 'clear', (r, c) => (r + c) * 0.012, 0.4);                 // lắp lại kính trong
    const want = c => key(c.flatMap(i => CAGES[i].ce));
    must(`'${key(G.cells('red'))}' === '${want([0, 1, 2])}' && '${key(G.cells('blue'))}' === '${want([3])}'`, true);
    must(`${G.cells('hole').length + G.cells('dbl').length}`, 0);
  }
  sfx() {
    const T = this.T;
    return spaced([{ t: T.give, kind: 'pen' }, { t: T.column, kind: 'chip' }, { t: T.bottom, kind: 'chip' }, { t: T.same, kind: 'pen' },
      { t: T.twice, kind: 'tick' }, { t: T.remove + 0.1, kind: 'snap' }, { t: T.arrows, kind: 'tick' }, { t: T.out1, kind: 'snap' },
      { t: T.bottom2 + 0.3, kind: 'snap' }, { t: T.out3, kind: 'snap' }], 1.3);
  }
  render(g, t) {
    const T = this.T, N = this.N;
    ground(g);
    sectionTag(g, 'ACT IV · BALANCE THE BOOKS', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    const P = drawWindow(g, this.G, t);
    puzzle(g, P, { bgOf: cg => { const [r, c] = cg.ce.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])[0]; return BG[this.G.at(r, c, t).base]; } });

    // viền lồng y² mang sang từ e2, tắt khi cột 9 bắt đầu lắp
    outline(g, P, CAGES[2].ce, C.redT, 1 - prog(t, T.give, T.column), 7);
    // r9c9: huy hiệu "×2" (đỏ hai lần) từ lúc hàng 9 phủ tới; thu nhỏ đi khi bỏ một lớp ("one copy")
    const bk = prog(t, this.R9C9, this.R9C9 + 0.35) * (1 - prog(t, T.copy, T.copy + 0.3));
    if (bk > 0) { const [cx, cy] = P.ctr(8, 8), s = outBack(Math.min(1, bk)); g.save(); g.translate(cx + 18, cy - 20); g.scale(s, s);
      g.fillStyle = C.lead; g.beginPath(); g.roundRect(-30, -24, 60, 46, 8); g.fill(); g.fillStyle = C.clear; g.beginPath(); g.roundRect(-26, -20, 52, 38, 6); g.fill();
      it(g, '×2', 0, 10, 34, C.redT, { align: 'center', wt: 700, k: bk >= 0.5 ? 1 : 0 }); g.restore(); }
    outline(g, P, [[8, 8]], C.ink, prog(t, T.corner - 0.1, T.corner + 0.3) * (1 - prog(t, T.once + 0.8, T.once + 1.2)), 6);

    // ba mũi tên: "arrows" → cả ba nổi mực; rồi từng cái tô theo màu tập hợp, nhấc đi cùng ô
    const fadeA = i => 1 - prog(t, [T.out1, T.bottom2 + 0.25, T.out3][i] + 0.2, [T.out1, T.bottom2 + 0.25, T.out3][i] + 0.55);
    const own = [T.red1, T.here, T.corner3];
    ARROWS.slice(0, 3).forEach((a, i) => { const k = prog(t, T.arrows - 0.1, T.arrows + 0.3) * (1 - prog(t, own[i] - 0.3, own[i])) * fadeA(i);
      if (k > 0) arrow(g, P, a, { color: C.ink, w: 5, k }); });
    arrow2(g, P, ARROWS[0], C.redT, prog(t, T.red1 - 0.3, T.red1 + 0.2) * fadeA(0), C.blueT, prog(t, T.blue1 - 0.1, T.blue1 + 0.3) * fadeA(0));
    arrow2(g, P, ARROWS[1], C.redT, prog(t, T.here - 0.3, T.here + 0.2) * fadeA(1), C.blueT, prog(t, T.here, T.here + 0.5) * fadeA(1));
    arrow2(g, P, ARROWS[2], C.blueT, prog(t, T.arrow3, T.blue3 + 0.2) * fadeA(2), C.redT, prog(t, T.red3 - 0.1, T.red3 + 0.3) * fadeA(2));
    text(g, CREDIT, GX, 1008, `500 18px ${MONO}`, C.dim);

    // cột phải — trượt ra hết trước e4 (e4 mở với cột phải trống)
    const out = outCubic(prog(t, this.NEXT - 0.55, this.NEXT - 0.05));
    if (out >= 1) return;
    g.save(); g.translate(out * 1000, 0);
    eq(g, [['blue', C.blueT], [' = '], ['red', C.redT], [' + 2 sets']], RX, 250, 60, { k: prog(t, this.FROM + 0.3, Math.max(this.FROM + 1, T.ahead)) });
    const pr = (a, b) => prog(t, a, b);
    eq(g, [['red', C.redT], [' + column 9'], [' + row 9']], RX, 330, 44, { k: (pr(T.give, T.give + 0.3) + pr(T.column, T.column + 0.4) + pr(T.row, T.row + 0.4)) / 3 });
    eq(g, [['red', C.redT], [' = '], ['blue', C.blueT]], RX, 440, 72, { k: pr(T.same - 0.4, T.digits) });
    label(g, `${N.red} sets = ${N.blue} sets`, RX + 4, 490, { k: pr(T.digits, T.digits + 0.6) });
    eq(g, [['corner cell: '], ['red ×2', C.redT], [' · '], ['blue ×1', C.blueT]], RX, 580, 44,
      { k: (pr(T.corner, T.corner + 0.4) + pr(T.twice, T.twice + 0.3) + pr(T.blue70 - 0.2, T.blue70) + pr(T.blue70, T.once + 0.2)) / 4 });
    it(g, 'remove what is in both — one copy at a time', RX, 660, 36, C.ink, { k: pr(T.remove, T.time) });
    eq(g, [['blue circle', C.blueT], [' = '], ['two red cells', C.redT], ['  → out']], RX, 750, 36,
      { k: (pr(T.red1, T.arrow1) + pr(T.arrow1, T.blue1) + pr(T.blue1, T.blue1 + 0.5) + pr(T.out1, T.out1 + 0.3)) / 4 });
    eq(g, [['the same at the bottom'], ['  → out']], RX, 810, 36, { k: (pr(T.here - 0.3, T.bottom2) + pr(T.bottom2 + 0.2, T.bottom2 + 0.5)) / 2 });
    eq(g, [['red circle', C.redT], [' = '], ['three blue cells', C.blueT], ['  → out']], RX, 870, 36,
      { k: (pr(T.red3 - 0.2, T.red3 + 0.3) + pr(T.arrow3, T.arrow3 + 0.3) + pr(T.three, T.blue3 + 0.3) + pr(T.out3, T.out3 + 0.25)) / 4 });
    g.restore();
  }
}
