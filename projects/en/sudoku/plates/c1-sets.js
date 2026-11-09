// c1 · Counting without knowing — MỞ HỒI II (thẻ "ACT TWO · The ring · ANSWERS 1").
// Ô cửa (712, 132, 80) lắp kính trong sau thẻ hồi; "any row" → viền một hàng; "don't know where" → số trong hàng thành "?";
// "which digits" → dãy chip 1–9 đã sắp; "one full set"; "column" / "box" → viền + "?"; "rows, columns, boxes" → viền nhấp;
// "without solving anything" → mọi ô thành "?"; "set equivalence" khắc lớn. Không đỏ/xanh (DNA §2: chỉ cho hai tập hợp).
import { C, prog, lookup, must, outCubic, ground, window9, outline, chip, it, label, sectionTag, actCard, actFlash, dark,
  D, CELLS, boxOf, sortedDigits } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const ROW = 1, COL = 5, BOX = 6;                                   // "any row / column / box" — hàng 2, cột 6, khối 7
const rowCells = [...Array(9)].map((_, c) => [ROW, c]);
const colCells = [...Array(9)].map((_, r) => [r, COL]);
const boxCells = CELLS.filter(([r, c]) => boxOf(r, c) === BOX);
const ROW_SORTED = sortedDigits(rowCells);

export default class Sets {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      key: w(14, 'key'), row: w(15, 'row'), dont: w(15, "don't"), which: w(15, 'which'),
      one: w(16, 'one'), once: w(16, 'once'), full: w(16, 'full'),
      column: w(17, 'column'), box: w(17, 'box'),
      colour: w(18, 'colour'), rows: w(18, 'rows'), columns: w(18, 'columns'), boxes: w(18, 'boxes'),
      total: w(18, 'total'), without: w(18, 'without'), anything: w(18, 'anything'),
      puzzle: w(19, 'puzzle'), set: w(19, 'set'),
    };
    this.START = L(14).start;
    this.FROM = Math.max(this.START - 2.6, L(13).end + 0.5);
    must(`'${ROW_SORTED.join('')}'`, '123456789');                   // hàng đã chọn = đúng một bộ 1–9
    must(`${rowCells.length + colCells.length + boxCells.length}`, 27);
  }
  sfx() {
    const T = this.T;
    return [{ t: actFlash(this.FROM), kind: 'shimmer' }, { t: T.row, kind: 'tick' },
      ...ROW_SORTED.map((_, i) => ({ t: T.which + i * 0.07, kind: 'tick', db: -6 })).filter((_, i) => i % 3 === 0),
      { t: T.full, kind: 'pen' }, { t: T.box, kind: 'tick' }, { t: T.total, kind: 'pen' }, { t: T.set, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, cardOut = Math.max(this.FROM + 1.0, this.START - 0.35);
    ground(g);

    // ô cửa: trồi lên từ đáy khi thẻ hồi trượt lên (trước đó thẻ hồi một mình), rồi lắp kính trong theo đường chéo
    if (t >= cardOut) {
      const rise = Math.round((1 - outCubic(prog(t, cardOut, cardOut + 0.6))) * 760), g0 = cardOut + 0.35;
      const glaze = (r, c) => { const p = prog(t, g0 + (r + c) * 0.045, g0 + (r + c) * 0.045 + 0.45); return p > 0 ? 0.35 + 0.65 * p : 0; };
      const qRow = (r, c) => r === ROW && t >= T.dont + c * 0.06;
      const qCol = (r, c) => c === COL && t >= T.column + r * 0.05;
      const qBox = (r, c) => boxOf(r, c) === BOX && t >= T.box + ((r % 3) * 3 + (c % 3)) * 0.04;
      const qAll = (r, c) => t >= T.without + (r + c) * 0.035;
      g.save(); g.translate(0, rise);
      const P = window9(g, X0, Y0, CS, {
        kOf: glaze, digitK: (r, c) => (glaze(r, c) >= 0.8 ? 1 : 0),
        digits: (r, c) => (qRow(r, c) || qCol(r, c) || qBox(r, c) || qAll(r, c) ? '?' : D(r, c)),
      });
      // viền vùng đang nói: chì đậm + sợi sáng (một màu trung tính — đỏ/xanh chỉ cho hai tập hợp)
      const hl = (cells, a, b) => { const k = prog(t, a - 0.1, a + 0.4), wd = 4 * Math.sin(Math.PI * prog(t, b, b + 0.45));
        outline(g, P, cells, C.lead, k, 13 + wd); outline(g, P, cells, '#FFF6DE', k, 4 + wd / 2); };
      hl(rowCells, T.row, T.rows); hl(colCells, T.column, T.columns); hl(boxCells, T.box, T.boxes);
      g.restore();
    }

    // trái: dãy chip 1–9 của hàng (đã sắp) → "one full set"
    const s = 48, pitch = 58, y0 = 196;
    ROW_SORTED.forEach((v, i) => chip(g, 100 + i * pitch, y0, s, 'clear', v, outCubic(prog(t, T.which + i * 0.07, T.which + i * 0.07 + 0.35))));
    label(g, '1–9, once each', 96, 292, { size: 22, k: prog(t, T.once - 0.3, T.once + 0.3) });
    it(g, '= one full set', 96, 372, 60, C.ink, { k: prog(t, T.full - 0.1, T.full + 0.6) });
    const lst = 'row · column · box', cut = [3, 12, lst.length];
    const kl = t < T.column ? prog(t, T.row, T.row + 0.3) * cut[0] : t < T.box ? cut[0] + prog(t, T.column, T.column + 0.3) * (cut[1] - cut[0]) : cut[1] + prog(t, T.box, T.box + 0.3) * (cut[2] - cut[1]);
    label(g, lst, 96, 456, { size: 26, color: C.ink, k: kl / lst.length });

    it(g, 'colour whole regions,', 96, 560, 44, C.ink, { k: prog(t, T.colour, T.boxes + 0.4) });
    it(g, 'and you know the total —', 96, 614, 44, C.ink, { k: prog(t, T.total - 0.3, T.total + 0.5) });
    it(g, 'without solving anything', 96, 664, 36, C.dim, { k: prog(t, T.without, T.anything + 0.3) });
    label(g, 'puzzle solvers call this', 96, 800, { size: 20, k: prog(t, T.puzzle, T.puzzle + 0.5) });
    it(g, 'set equivalence', 96, 880, 72, C.ink, { k: prog(t, T.set, T.set + 0.7) });

    sectionTag(g, 'ACT II · COUNTING WITHOUT KNOWING', prog(t, cardOut, cardOut + 0.6));
    const on = actCard(g, t, this.FROM, this.START, 'ACT TWO', 'The ring', 'ANSWERS 1');
    dark(g, on);
  }
}
