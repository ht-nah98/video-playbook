// f3 · Families of grids — câu 107–112.
// Ô cửa lưới đã giải (X 712, Y 132, cs 80) biến hình NỐI TIẾP theo lời: đổi hàng 1↔2 (trong băng 1) → đổi băng 1↔2 →
// đổi cột 1↔2 → xoay 90° → đổi nhãn 3↔5. Hàng/cột đang đổi trượt qua nhau như dải kính rời; mỗi phép khắc vào danh sách
// bên trái kèm ✓ (code kiểm 27 ràng buộc sau MỖI phép). "families" → sáu ô cửa nhỏ = sáu lưới vừa tạo (một họ);
// "one grid from each family" → khoanh một; "6.7 × 10²¹ → ≈ 5.5 billion" (5,472,730,538 — CONTENT.md).
import { C, clamp, prog, lookup, must, outCubic, outBack, ground, window9, pane, outline, it, label, num, eq, sectionTag, D } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const G0 = [...Array(9)].map((_, r) => [...Array(9)].map((_, c) => D(r, c)));
const valid = G => {
  const full = a => a.slice().sort().join('') === '123456789';
  for (let i = 0; i < 9; i++) {
    if (!full(G[i]) || !full(G.map(row => row[i]))) return false;
    const b = []; for (let k = 0; k < 9; k++) b.push(G[3 * ((i / 3) | 0) + ((k / 3) | 0)][3 * (i % 3) + (k % 3)]);
    if (!full(b)) return false;
  }
  return true;
};
const permRows = (G, map) => G.map((_, r) => G[map(r)].slice());
const permCols = (G, map) => G.map(row => row.map((_, c) => row[map(c)]));
const sw = (a, b) => x => (x === a ? b : x === b ? a : x);
// các phép (nối tiếp) — mảng a[i] ↔ b[i] cho hàng/cột
const OPS = [
  { kind: 'rows', a: [0], b: [1], name: 'swap two rows in a band', f: G => permRows(G, sw(0, 1)) },
  { kind: 'rows', a: [0, 1, 2], b: [3, 4, 5], name: 'swap two bands', f: G => permRows(G, r => (r < 3 ? r + 3 : r < 6 ? r - 3 : r)) },
  { kind: 'cols', a: [0], b: [1], name: 'swap two columns', f: G => permCols(G, sw(0, 1)) },
  { kind: 'rot', name: 'turn it on its side', f: G => G.map((row, r) => row.map((_, c) => G[8 - c][r])) },
  { kind: 'relabel', name: 'relabel 3 ↔ 5', f: G => G.map(row => row.map(sw(3, 5))) },
];
const GS = [G0]; OPS.forEach(o => GS.push(o.f(GS.at(-1))));

export default class Families {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      stop: w(107, 'stop'), really: w(107, 'really'), same: w(107, 'same'), rows: w(108, 'rows'), band: w(108, 'band'), valid: w(108, 'valid'),
      bands: w(109, 'bands'), columns: w(109, 'columns'), turn: w(109, 'turn'), side: w(109, 'side'), relabel: w(109, 'relabel'),
      three: w(109, 'three'), five: w(109, 'five'), all: w(110, 'all'), valid2: w(110, 'valid'), keep: w(110, 'keep'), count: w(110, 'count'),
      families: w(111, 'families'), one: w(111, 'one'), family: w(111, 'family'), six: w(112, 'six'), billion: w(112, 'billion'), end: L(112).end,
    };
    this.START = L(107).start;
    this.FROM = Math.max(this.START - 1.2, L(106).end + 0.5);
    const T = this.T;
    [[T.rows, T.rows + 0.8], [T.bands - 0.2, T.bands + 0.6], [T.columns, T.columns + 0.6], [T.turn, T.side + 0.3], [T.five + 0.1, T.five + 0.6]]
      .forEach(([t0, t1], i) => Object.assign(OPS[i], { t0, t1 }));
    GS.forEach((G, i) => must(`${valid(G)}`, true));                                     // mỗi phép vẫn là lưới hợp lệ
    must(`${new Set(GS.map(G => G.join())).size}`, 6);                                    // sáu lưới khác nhau, một họ
    must(`(5472730538 / 1e9).toFixed(1)`, '5.5');
    this.ESS = (5472730538).toLocaleString('en-US'); must(`'${this.ESS}'`, '5,472,730,538');
  }
  sfx() {
    const T = this.T;
    return [{ t: OPS[0].t0, kind: 'flap' }, { t: OPS[1].t0, kind: 'flap' }, { t: OPS[3].t1 - 0.2, kind: 'flap' }, { t: OPS[4].t0, kind: 'flap' },
      { t: T.families, kind: 'pen' }, { t: T.billion - 0.6, kind: 'pen' }];
  }
  /** Một dải kính rời (hàng hoặc cột) của lưới G, đang trượt. */
  strip(g, G, kind, i, x, y) {
    const n = 9, horiz = kind === 'rows', w = horiz ? CS * n : CS, h = horiz ? CS : CS * n;
    g.save(); g.shadowColor = 'rgba(40,32,24,0.35)'; g.shadowBlur = 18; g.shadowOffsetY = 8;
    g.fillStyle = C.lead; g.fillRect(x - 6, y - 6, w + 12, h + 12); g.restore();
    for (let k = 0; k < n; k++) {
      const px = horiz ? x + k * CS : x, py = horiz ? y : y + k * CS, v = horiz ? G[i][k] : G[k][i];
      pane(g, px + 3, py + 3, CS - 6, 'clear', i * 9 + k + 1, 1);
      num(g, v, px + CS / 2, py + CS / 2 + 46 * 0.36, 46, C.digit, { align: 'center' });
    }
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    let s = 0; while (s < OPS.length && t >= OPS[s].t1) s++;
    const op = OPS[s], u = op && t >= op.t0 ? prog(t, op.t0, op.t1) : 0, e = outCubic(u), G = GS[s];
    let P;
    if (op && u > 0 && (op.kind === 'rows' || op.kind === 'cols')) {
      const moving = new Set([...op.a, ...op.b]), horiz = op.kind === 'rows';
      P = window9(g, X0, Y0, CS, { kindOf: (r, c) => (moving.has(horiz ? r : c) ? 'empty' : 'clear'), digits: (r, c) => (moving.has(horiz ? r : c) ? null : G[r][c]) });
      const lift = Math.sin(Math.PI * u) * CS * 0.45;
      [...op.a.map((i, j) => [i, op.b[j], -1]), ...op.b.map((i, j) => [i, op.a[j], 1])].forEach(([i, to, sg]) => {
        const p = i + (to - i) * e;
        if (horiz) this.strip(g, G, 'rows', i, X0 + sg * lift, Y0 + p * CS); else this.strip(g, G, 'cols', i, X0 + p * CS, Y0 + sg * lift);
      });
    } else if (op && u > 0 && op.kind === 'rot') {
      const cx = X0 + 4.5 * CS, cy = Y0 + 4.5 * CS, sc = 1 - 0.3 * Math.sin(Math.PI * u);
      g.save(); g.translate(cx, cy); g.rotate(e * Math.PI / 2); g.scale(sc, sc); g.translate(-cx, -cy);
      P = window9(g, X0, Y0, CS, { digits: (r, c) => G[r][c] }); g.restore();
    } else if (op && u > 0 && op.kind === 'relabel') {
      const hit = (r, c) => G[r][c] === 3 || G[r][c] === 5;
      P = window9(g, X0, Y0, CS, { digits: (r, c) => (hit(r, c) && u >= 0.5 ? sw(3, 5)(G[r][c]) : G[r][c]), kOf: (r, c) => (hit(r, c) ? 1 - 0.45 * Math.sin(Math.PI * u) : 1) });
    } else P = window9(g, X0, Y0, CS, { digits: (r, c) => G[r][c] });

    // viền vùng đang nói: băng ("band of three"), hàng/cột đang đổi, các ô 3 rồi 5 trước khi đổi nhãn
    const cellsOf = (kind, idx) => idx.flatMap(i => [...Array(9).keys()].map(k => (kind === 'rows' ? [i, k] : [k, i])));
    if (t < T.bands - 0.4) outline(g, P, cellsOf('rows', [0, 1, 2]), C.dim, prog(t, T.band - 0.1, T.band + 0.3), 4);
    OPS.slice(0, 3).forEach(o => { if (t > o.t0 - 0.45 && t < o.t1 + 0.4) {
      const k = prog(t, o.t0 - 0.45, o.t0 - 0.1); outline(g, P, cellsOf(o.kind, o.a), C.ink, k, 5); outline(g, P, cellsOf(o.kind, o.b), C.ink, k, 5); } });
    if (t < T.all + 0.4 && s >= 4) {           // "every three … every five": ô khác lùi sáng, ô 3 rồi ô 5 nổi lên
      const G4 = GS[4], off = 1 - prog(t, T.all, T.all + 0.4);
      g.save(); g.fillStyle = C.wall;
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const v = G4[r][c], a = 0.5 * off * (v === 3 ? prog(t, T.relabel, T.three - 0.1) * (1 - prog(t, T.three - 0.1, T.three + 0.2))
          : v === 5 ? prog(t, T.relabel, T.three - 0.1) * (1 - prog(t, T.five - 0.2, T.five + 0.1)) : prog(t, T.relabel, T.three - 0.1));
        if (a > 0) { g.globalAlpha = a; g.fillRect(X0 + c * CS, Y0 + r * CS, CS, CS); } }
      g.restore();
    }

    // trái: tiêu đề + danh sách phép, ✓ khi xong (đã kiểm hợp lệ trong init)
    sectionTag(g, 'ACT V · FAMILIES OF GRIDS', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    it(g, "don't check", 96, 210, 52, C.ink, { k: prog(t, T.stop - 0.2, T.stop + 0.5) });
    it(g, 'the same grid twice', 96, 266, 52, C.ink, { k: prog(t, T.really - 0.2, T.same + 0.4) });
    OPS.forEach((o, i) => {
      const y = 350 + i * 44, wd = label(g, `${i + 1} · ${o.name}`, 96, y, { color: C.ink, k: prog(t, o.t0 - 0.5, o.t0 + 0.1) });
      label(g, '✓', 96 + wd + 14, y, { color: C.ink, k: prog(t, o.t1, o.t1 + 0.15) });
    });
    it(g, 'all valid,', 96, 620, 44, C.ink, { k: prog(t, T.valid2 - 0.3, T.valid2 + 0.3) });
    it(g, 'same clue count', 96, 670, 44, C.dim, { k: prog(t, T.keep - 0.1, T.count + 0.4) });

    // phải: sáu ô cửa nhỏ = sáu lưới vừa tạo = MỘT họ; khoanh một ô ("check one grid")
    GS.forEach((Gm, i) => {
      const k = outBack(prog(t, T.families - 0.3 + i * 0.12, T.families + i * 0.12)); if (k <= 0) return;
      const mx = 1478 + (i % 2) * 176, my = 210 + ((i / 2) | 0) * 180, cx = mx + 72, cy = my + 72;
      g.save(); g.translate(cx, cy); g.scale(k, k); g.translate(-cx, -cy);
      const Q = window9(g, mx, my, 16, { digits: () => null });
      g.fillStyle = C.ink; Gm.forEach((row, r) => row.forEach((v, c) => { if (v === 1) { const [x, y] = Q.ctr(r, c); g.beginPath(); g.arc(x, y, 3.2, 0, 7); g.fill(); } }));
      g.restore();
    });
    label(g, 'one family', 1638, 790, { align: 'center', k: prog(t, T.families, T.families + 0.6) });
    const ck = prog(t, T.one, T.one + 0.35);
    if (ck > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.globalAlpha = clamp(ck * 2); g.strokeRect(1478 - 14, 210 - 14, 172, 172); g.restore(); }
    label(g, 'check one', 1638, 826, { align: 'center', color: C.ink, k: prog(t, T.one, T.family + 0.3) });

    // dưới: con số
    eq(g, [['6.7 × 10²¹'], ['  →  ', C.dim], ['≈ 5.5 billion']], 96, 975, 60, { k: prog(t, T.six, T.billion + 0.3) });
    label(g, `${this.ESS} truly different grids`, 1824, 975, { align: 'right', size: 18, k: prog(t, T.billion, T.billion + 0.6) });
  }
}
