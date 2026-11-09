// f4 · Patterns that must be broken — câu 113–118.
// Lưới D KHÔNG có hình chữ nhật 7/9 nào (code đã tìm: chỉ có các cặp 1/3, 3/8, 4/5, 6/9, 8/9) → dùng lưới D ĐỔI NHÃN 7↔8
// (phép đổi nhãn của f3, vẫn hợp lệ — ghi chú dưới lưới). Code TÌM hình chữ nhật 7/9: 2 hàng (ưu tiên khác băng, "a few
// rows down"), 2 cột, đúng 2 khối. Bốn ô sáng theo từng TỪ; "swap" → 7 và 9 trượt đổi chỗ (code: vẫn hợp lệ), "so" →
// trượt về; "at least one clue here"; "unavoidable set"; "find enough" → mọi hình chữ nhật khác (code) viền mờ;
// "placing sixteen clues" → 16 gợi ý của f1 (nhấc các kính còn lại) — đúng tập này không có gợi ý nào → hỏng ngay.
import { C, clamp, prog, lookup, must, outCubic, ground, window9, outline, it, label, num, sectionTag, D } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const swap78 = v => (v === 7 ? 8 : v === 8 ? 7 : v);
const G = [...Array(9)].map((_, r) => [...Array(9)].map((_, c) => swap78(D(r, c))));
const box = (r, c) => 3 * ((r / 3) | 0) + ((c / 3) | 0);
const valid = M => {
  const full = a => a.slice().sort().join('') === '123456789';
  for (let i = 0; i < 9; i++) {
    if (!full(M[i]) || !full(M.map(row => row[i]))) return false;
    const b = []; for (let k = 0; k < 9; k++) b.push(M[3 * ((i / 3) | 0) + ((k / 3) | 0)][3 * (i % 3) + (k % 3)]);
    if (!full(b)) return false;
  }
  return true;
};
/** Mọi hình chữ nhật hai số (a ↔ b đổi được) nằm trong đúng 2 khối. */
const rects = M => {
  const out = [];
  for (let r1 = 0; r1 < 9; r1++) for (let r2 = r1 + 1; r2 < 9; r2++) for (let c1 = 0; c1 < 9; c1++) for (let c2 = c1 + 1; c2 < 9; c2++) {
    const p = M[r1][c1], q = M[r1][c2];
    if (p !== q && M[r2][c1] === q && M[r2][c2] === p && new Set([box(r1, c1), box(r1, c2), box(r2, c1), box(r2, c2)]).size === 2)
      out.push({ r1, r2, c1, c2, d: [p, q].sort().join('/') });
  }
  return out;
};
/** 16 gợi ý = 25 gợi ý của f1 bớt 9 kính (cùng tập "16?" ở f1). */
const MASK16 = [[0, 0], [0, 2], [0, 3], [1, 2], [2, 0], [3, 2], [3, 7], [3, 8], [4, 7], [5, 0], [5, 2], [6, 8], [7, 0], [7, 1], [7, 3], [7, 6]];
const inMask = new Set(MASK16.map(([r, c]) => r * 9 + c));

export default class Unavoidable {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f4');
    this.T = {
      second: w(113, 'second'), clues: w(113, 'clues'), sev: w(114, 'seven', 1), nine: w(114, 'nine', 1), another: w(114, 'another'),
      sev2: w(114, 'seven', 2), nine2: w(114, 'nine', 2), columns: w(114, 'columns'), boxes: w(114, 'boxes'), swap: w(115, 'swap'),
      sevens: w(115, 'sevens'), valid: w(115, 'valid'), so: w(116, 'so'), must: w(116, 'must'), least: w(116, 'least'), cells: w(116, 'cells'),
      unav: w(117, 'unavoidable'), enough: w(118, 'enough'), placing: w(118, 'placing'), fail: w(118, 'fail'), without: w(118, 'without'), end: L(118).end,
    };
    this.START = L(113).start;
    this.FROM = Math.max(this.START - 1.2, L(112).end + 0.5);
    must(`${rects(G0()).filter(x => x.d === '7/9').length}`, 0);                 // lưới D gốc không có 7/9
    must(`${valid(G)}`, true);                                                   // đổi nhãn 7↔8 vẫn hợp lệ
    const all = rects(G), f = all.filter(x => x.d === '7/9').sort((a, b) => (box(b.r2, 0) !== box(b.r1, 0)) - (box(a.r2, 0) !== box(a.r1, 0)))[0];
    must(`${!!f}`, true);
    must(`${new Set([box(f.r1, f.c1), box(f.r1, f.c2), box(f.r2, f.c1), box(f.r2, f.c2)]).size}`, 2);
    // ô của 7 / 9 ở hàng trên, rồi hàng dưới
    const at = (r, v) => [r, G[r][f.c1] === v ? f.c1 : f.c2];
    this.CELLS = [at(f.r1, 7), at(f.r1, 9), at(f.r2, 7), at(f.r2, 9)];
    must(`'${this.CELLS.map(([r, c]) => G[r][c]).join('')}'`, '7979');
    this.SW = G.map((row, r) => row.map((v, c) => ((r === f.r1 || r === f.r2) && (c === f.c1 || c === f.c2) ? (v === 7 ? 9 : 7) : v)));
    must(`${valid(this.SW)} && '${this.SW.join()}' !== '${G.join()}'`, true);     // đổi 7↔9 ở bốn ô: vẫn hợp lệ, lưới khác
    this.F = f;
    this.OTHERS = all.filter(x => x !== f);
    const hits = x => [[x.r1, x.c1], [x.r1, x.c2], [x.r2, x.c1], [x.r2, x.c2]].some(([r, c]) => inMask.has(r * 9 + c));
    must(`${MASK16.length}`, 16);
    must(`${hits(f)}`, false);                                                   // 16 gợi ý này bỏ trống đúng tập 7/9 → hỏng
    this.boxCells = [...new Set([box(f.r1, f.c1), box(f.r1, f.c2)])].flatMap(b => [...Array(9).keys()].map(k => [3 * ((b / 3) | 0) + ((k / 3) | 0), 3 * (b % 3) + (k % 3)]))
      .concat([...new Set([box(f.r2, f.c1), box(f.r2, f.c2)])].flatMap(b => [...Array(9).keys()].map(k => [3 * ((b / 3) | 0) + ((k / 3) | 0), 3 * (b % 3) + (k % 3)])));
    this.nBoxes = new Set(this.boxCells.map(([r, c]) => box(r, c))).size;
    must(`${this.nBoxes}`, 2);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.sev, kind: 'tick' }, { t: T.columns, kind: 'tick' }, { t: T.sevens, kind: 'flap' }, { t: T.valid, kind: 'correct' },
      { t: T.least, kind: 'pen' }, { t: T.unav, kind: 'pen' },
      ...this.OTHERS.map((_, i) => ({ t: T.enough + i * 0.18, kind: 'tick', db: -6 })), { t: T.placing, kind: 'flap' }];
  }
  render(g, t) {
    const T = this.T, f = this.F, four = new Set(this.CELLS.map(([r, c]) => r * 9 + c));
    ground(g);
    // 7 ↔ 9: p = 0 gốc, 1 đã đổi ("swap"), về 0 ở "so"
    const p = outCubic(prog(t, T.sevens, T.sevens + 0.7)) - outCubic(prog(t, T.so, T.so + 0.6)), moving = p > 0 && p < 1;
    const M = p >= 1 ? this.SW : G;
    // "placing sixteen clues": nhấc các kính không thuộc 16 gợi ý
    const liftK = (r, c) => (inMask.has(r * 9 + c) ? 1 : 1 - prog(t, T.placing + 0.7 * ((r * 7 + c * 3) % 11) / 11, T.placing + 0.7 * ((r * 7 + c * 3) % 11) / 11 + 0.3));
    const P = window9(g, X0, Y0, CS, {
      kindOf: (r, c) => (liftK(r, c) > 0 ? 'clear' : 'empty'), kOf: liftK,
      digits: (r, c) => (moving && four.has(r * 9 + c) ? null : M[r][c]), digitK: (r, c) => (liftK(r, c) >= 0.9 ? 1 : 0),
    });
    // ánh sáng: ô ngoài vùng đang nói lùi sáng; cột ("same two columns") rồi hai khối ("same two boxes") sáng hơn;
    // "find enough of them" → các tập khác (code tìm) sáng lên lần lượt; "placing" → hết lùi sáng
    const base = 0.55 * prog(t, T.sev - 0.3, T.sev + 0.3) * (1 - prog(t, T.placing - 0.3, T.placing));
    if (base > 0) {
      const colK = prog(t, T.columns - 0.1, T.columns + 0.3) * (1 - prog(t, T.boxes - 0.3, T.boxes)), boxK = prog(t, T.boxes - 0.3, T.boxes) * (1 - prog(t, T.enough - 0.2, T.enough + 0.2));
      const inBox = new Set(this.boxCells.map(([r, c]) => r * 9 + c));
      const lit = new Map(); this.OTHERS.forEach((x, i) => { const k = prog(t, T.enough + i * 0.18, T.enough + i * 0.18 + 0.25);
        for (const [r, c] of [[x.r1, x.c1], [x.r1, x.c2], [x.r2, x.c1], [x.r2, x.c2]]) lit.set(r * 9 + c, Math.max(lit.get(r * 9 + c) || 0, k)); });
      g.save(); g.fillStyle = C.wall;
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) { const i = r * 9 + c; if (four.has(i)) continue;
        const a = base * (1 - 0.6 * Math.max((c === f.c1 || c === f.c2) ? colK : 0, inBox.has(i) ? boxK : 0, lit.get(i) || 0));
        if (a > 0) { g.globalAlpha = a; g.fillRect(X0 + c * CS, Y0 + r * CS, CS, CS); } }
      g.restore(); }
    // hai số trượt đổi chỗ trong mỗi hàng (một vòng lên, một vòng xuống)
    if (moving) for (const r of [f.r1, f.r2]) for (const [c, to, sg] of [[f.c1, f.c2, -1], [f.c2, f.c1, 1]]) {
      const x = X0 + (c + (to - c) * p) * CS + CS / 2, y = Y0 + r * CS + CS / 2 + sg * Math.sin(Math.PI * p) * CS * 0.42;
      num(g, G[r][c], x, y + 46 * 0.36, 46, C.digit, { align: 'center' });
    }
    // viền bốn ô theo từng từ (dày lên ở "at least one clue"); "fail" → bốn ô trống gợi ý viền nét đứt
    const cw = 5 + 3 * prog(t, T.least - 0.1, T.least + 0.3);
    [T.sev, T.nine, T.sev2, T.nine2].forEach((tt, i) => outline(g, P, [this.CELLS[i]], C.ink, prog(t, tt - 0.1, tt + 0.15), cw));
    if (t >= T.fail - 0.1) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.setLineDash([9, 7]); g.globalAlpha = clamp(prog(t, T.fail - 0.1, T.fail + 0.2));
      for (const [r, c] of this.CELLS) g.strokeRect(X0 + c * CS + 12, Y0 + r * CS + 12, CS - 24, CS - 24);
      g.restore();
    }
    label(g, 'our grid, relabelled 7 ↔ 8 (still valid)', X0, 905, { size: 18, k: prog(t, this.FROM + 0.3, this.FROM + 0.9) });

    // trái
    sectionTag(g, 'ACT V · PATTERNS THAT MUST BE BROKEN', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    it(g, 'step two: fewer clues', 96, 210, 52, C.ink, { k: prog(t, T.second - 0.2, T.clues + 0.3) });
    label(g, 'a 7 and a 9 in one row', 96, 300, { color: C.ink, k: prog(t, T.sev, T.nine + 0.5) });
    label(g, '9 and 7 lower, same columns', 96, 336, { color: C.ink, k: prog(t, T.another, T.columns + 0.3) });
    label(g, 'all in the same two boxes', 96, 372, { color: C.ink, k: prog(t, T.boxes - 0.4, T.boxes + 0.3) });
    it(g, 'swap 7 ↔ 9:', 96, 470, 52, C.ink, { k: prog(t, T.swap - 0.1, T.sevens + 0.4) });
    label(g, '✓ still a valid grid', 96, 516, { color: C.ink, k: prog(t, T.valid - 0.3, T.valid + 0.3) });
    label(g, 'at least one clue here', 96, 610, { size: 26, color: C.ink, k: prog(t, T.must, T.cells) });
    it(g, 'an unavoidable set', 96, 730, 72, C.ink, { k: prog(t, T.unav - 0.2, T.unav + 0.6) });
    label(g, '16 clues, none in this set', 96, 840, { color: C.ink, k: prog(t, T.fail - 0.3, T.fail + 0.4) });
    label(g, '→ fails, no solving needed', 96, 876, { k: prog(t, T.without - 0.2, T.without + 0.6) });
  }
}
function G0() { return [...Array(9)].map((_, r) => [...Array(9)].map((_, c) => D(r, c))); }
