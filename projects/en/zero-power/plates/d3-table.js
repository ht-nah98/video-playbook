// d3 · Two patterns, one square (p2) — bảng xʸ đúng lab khung 1 (tools/lab/lcd.html): x = 0, 1/2, 2, 5 · y = 0..3.
//   hai ứng viên 1 (lam) · 0 (gỉ) chờ ở trái "TWO CANDIDATES · FROM TWO PATTERNS" → bảng hiện ("picture a table"),
//   ô thường điền mờ; hàng y = 0 nhuộm lam, 5⁰ 2⁰ (1/2)⁰ được gọi tên rồi "1, 1, 1"; cột x = 0 nhuộm gỉ, 0³ 0² 0¹ rồi
//   "0, 0, 0"; hai đường chấm đổ vào cùng ô, hai ứng viên bay vào → ô 0⁰ `contested` (KHÔNG in 0 ** 0 của JS), chỉ báo E;
//   chú thích ROW / COLUMN; "ONE SQUARE: 1 OR 0 ?" · "DEPENDS ON THE MATHEMATICS". Mascot twoways (trái) lúc "one
//   pattern says one, the other says zero".
import { C, prog, outCubic, ground, ink, card, annunciators, dm, dmW, row, rowW, seg7, contested, figure, lookup, must } from '../kit.js';

const XS = [0, 0.5, 2, 5], YS = [0, 1, 2, 3], XL = ['0', '1/2', '2', '5'];
const tx = 652, cw = 222, hw = 168, ty = 168, hh = 92, rh = 156, x1 = tx + hw + 4 * cw, y1 = ty + hh + 4 * rh;
const ox0 = tx + hw, oy0 = ty + hh;                        // ô 0⁰
const CAND = { one: [176, 400], zero: [336, 400], h: 150 };  // hai ứng viên chờ bên trái

export default class Table {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['twoways'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      those: w(54, 'those'), cands: w(54, 'candidates'), two2: w(54, 'two', 2), patterns: w(54, 'patterns'), both: w(54, 'both'), natural: w(54, 'natural'),
      picture: w(55, 'picture'), table: w(55, 'table'), y55: w(55, 'y'), row: w(55, 'row'), exponent: w(55, 'exponent'), zero55: w(55, 'zero'),
      five: w(55, 'five'), two: w(55, 'two'), half: w(55, 'a', 2), o1: w(55, 'one', 2), o2: w(55, 'one', 3), o3: w(55, 'one', 4),
      column: w(56, 'column'), base: w(56, 'base'), zero56: w(56, 'zero', 1),
      c3: w(56, 'zero', 3), c2: w(56, 'zero', 4), c1: w(56, 'zero', 5), r3: w(56, 'zero', 6), r2: w(56, 'zero', 7), r1: w(56, 'zero', 8),
      lines: w(57, 'lines'), same: w(57, 'same'), square: w(57, 'square'), zz: w(57, 'zero'),
      says1: w(58, 'says'), other: w(58, 'other'), says0: w(58, 'zero'),
      which: w(59, 'which'), wins: w(59, 'wins'), depends: w(59, 'depends'), doing: w(59, 'doing'),
    };
    this.START = L(54).start;
    this.FROM = this.START - 1.2;
    // mọi ô trừ (0, 0): tính và kiểm; hàng y = 0 toàn 1, cột x = 0 toàn 0
    this.V = YS.map((y, i) => XS.map((x, j) => {
      if (i === 0 && j === 0) return null;                    // ô 0⁰ — KHÔNG lấy kết quả của JS
      const v = must(`${x} ^ ${y}`, x ** y);
      if (i === 0 && v !== 1) throw new Error('hàng y=0 phải là 1');
      if (j === 0 && v !== 0) throw new Error('cột x=0 phải là 0');
      return v;
    }));
  }
  sfx() {
    const T = this.T;
    return [{ t: T.table, kind: 'tick' }, { t: T.o1, kind: 'beep' },
      { t: T.square, kind: 'snap' }, { t: T.wins, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.square ? ['×', 'E'] : ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT III', 'TWO PATTERNS');
      this.table(d, t);
      this.left(d, t);
      this.captions(d, t);
    });
    figure(g, 'twoways', 300, 1080, 760, prog(t, T.says1 - 0.4, T.says1 - 0.05));
  }

  // bên trái: hai ứng viên chờ, rồi bay vào ô 0⁰
  left(d, t) {
    const T = this.T, out = outCubic(prog(t, T.square - 0.1, T.square + 0.45));
    if (t < T.those - 0.1) return;
    d.save(); d.translate(-760 * out, 0);
    dm(d, 'TWO CANDIDATES', 132, 330, 4, C.dim, { k: prog(t, T.those - 0.1, T.cands + 0.3) });
    dm(d, 'FROM TWO PATTERNS', 132, 600, 4, C.ink, { k: prog(t, T.two2 - 0.1, T.patterns + 0.4) });
    dm(d, 'BOTH FEEL NATURAL', 132, 650, 4, C.dim, { k: prog(t, T.both - 0.1, T.natural + 0.3) });
    d.restore();
    const u = outCubic(prog(t, T.square - 0.05, T.square + 0.45));
    if (u >= 1 || t < T.cands - 0.1) return;
    const kin = prog(t, T.cands - 0.1, T.cands + 0.25);
    // đích = chỗ "1?" / "0?" của contested (size 70)
    const sz = 70, gap = sz * 0.5 + 44, cyT = oy0 + (rh - sz) / 2 + 6;
    const to = { one: [ox0 + cw / 2 - gap - sz * 0.25, cyT], zero: [ox0 + cw / 2 + 14, cyT] };
    const h = CAND.h + (sz - CAND.h) * u;
    for (const key of ['one', 'zero']) {
      if (key === 'zero' && kin < 0.5) continue;
      const [ax, ay] = CAND[key], [bx, by] = to[key];
      seg7(d, key === 'one' ? '1' : '0', ax + (bx - ax) * u, ay + (by - ay) * u, h, key === 'one' ? C.one : C.zero);
    }
  }

  table(d, t) {
    const T = this.T, V = this.V;
    // lưới chấm: có sẵn từ đầu cảnh (ô chờ)
    const kg = prog(t, this.FROM + 0.3, this.FROM + 1.1), lg = `rgba(${C.inkRGB},0.42)`;
    if (kg <= 0) return;
    // dải màu: hàng y = 0 lam (theo "row"), cột x = 0 gỉ (theo "column")
    const kr = prog(t, T.row - 0.1, T.row + 0.6), kc = prog(t, T.column - 0.1, T.column + 0.6);
    if (kr > 0) { d.fillStyle = `rgba(${C.oneRGB},0.085)`; d.fillRect(tx + hw, oy0, 4 * cw * kr, rh); }
    if (kc > 0) { d.fillStyle = `rgba(${C.zeroRGB},0.075)`; d.fillRect(tx + hw, oy0, cw, 4 * rh * kc); }
    d.fillStyle = lg;
    for (let i = 0; i <= 4; i++) { const yy = oy0 + i * rh; for (let xx = tx; xx < tx + (x1 - tx) * kg; xx += 8) d.fillRect(xx, yy - 1.5, 4, 3); }
    for (let j = 0; j <= 4; j++) { const xx = tx + hw + j * cw; for (let yy = ty; yy < ty + (y1 - ty) * kg; yy += 8) d.fillRect(xx - 1.5, yy, 3, 4); }
    // tiêu đề: "picture a table of x to the power of y"
    const kh = prog(t, T.picture - 0.1, T.y55 + 0.3);
    if (kh > 0) {
      dm(d, 'X^Y^', tx + hw / 2, ty + 30, 6, C.ink, { align: 'center', k: kh * 3 });
      XS.forEach((x, j) => dm(d, 'X=' + XL[j], tx + hw + j * cw + cw / 2, ty + 32, 5, j === 0 && t >= T.zero56 ? C.zero : C.ink,
        { align: 'center', k: kh * 2 - 0.25 * j }));
      YS.forEach((y, i) => dm(d, 'Y=' + y, tx + hw / 2, oy0 + i * rh + rh / 2 - 17, 5, i === 0 && t >= T.zero55 ? C.one : C.ink,
        { align: 'center', k: kh * 2 - 0.25 * i }));
    }
    // gọi tên ô (nhãn nhỏ đầu ô) đúng lúc lời đọc
    const tags = [[0, 3, '5^0^', T.five], [0, 2, '2^0^', T.two], [0, 1, '(1/2)^0^', T.half], [3, 0, '0^3^', T.c3], [2, 0, '0^2^', T.c2], [1, 0, '0^1^', T.c1]];
    for (const [i, j, s, at] of tags) if (t > at - 0.1)
      dm(d, s, tx + hw + j * cw + cw / 2, oy0 + i * rh + 16, 3, C.ink, { align: 'center', k: prog(t, at - 0.1, at + 0.3), ghost: false });
    // giá trị: ô thường điền mờ khi bảng hiện; hàng 0 lúc "one, one, one"; cột 0 lúc "zero, zero, zero"
    const rowAt = [null, T.o3, T.o2, T.o1], colAt = [null, T.r1, T.r2, T.r3];
    const sh = 74;
    YS.forEach((y, i) => XS.forEach((x, j) => {
      if (i === 0 && j === 0) return;                        // ô 0⁰ vẽ riêng (contested)
      const at = i === 0 ? rowAt[j] : j === 0 ? colAt[i] : T.table + 0.25 + ((i - 1) * 3 + (j - 1)) * 0.12;
      if (t < at - 0.05) return;
      const v = V[i][j], col = i === 0 ? C.one : j === 0 ? C.zero : C.dim, cx = tx + hw + j * cw + cw / 2, cy = oy0 + i * rh + (rh - sh) / 2 + 8;
      const toks = [...String(v)].map(c => ({ c, col }));
      let h2 = sh, w = rowW(toks, h2);
      if (w > cw - 56) { h2 = sh * (cw - 56) / w; w = cw - 56; }
      row(d, toks, cx - w / 2, cy + (sh - h2) / 2, h2);
    }));
    // hai đường đổ vào cùng một ô
    const ka = prog(t, T.lines - 0.1, T.same);
    if (ka > 0) {
      const ay = oy0 + rh - 22;
      d.fillStyle = C.one; for (let xx = x1 - 12; xx > x1 - 12 - (x1 - 12 - (ox0 + cw + 22)) * ka; xx -= 10) d.fillRect(xx, ay, 6, 4);
      const ax = ox0 + cw - 24;
      d.fillStyle = C.zero; for (let yy = y1 - 12; yy > y1 - 12 - (y1 - 12 - (oy0 + rh + 26)) * ka; yy -= 10) d.fillRect(ax, yy, 4, 6);
      if (ka >= 1) { dm(d, '←', ox0 + cw + 2, ay - 12, 4, C.one, { ghost: false }); dm(d, '↑', ax - 10, oy0 + rh + 4, 4, C.zero, { ghost: false }); }
    }
    // ô 0⁰: chờ dấu "?" mờ; tranh chấp khi hai ứng viên bay tới
    const u = prog(t, T.square - 0.05, T.square + 0.45);
    if (u <= 0) dm(d, '?', ox0 + cw / 2, oy0 + rh / 2 - 21, 6, `rgba(${C.inkRGB},0.25)`, { align: 'center', ghost: false });
    else contested(d, ox0, oy0, cw, rh, u < 1 ? Math.min(u, 0.49) : 1);
    if (t > T.zz - 0.1) dm(d, '0^0^', ox0 + cw / 2, oy0 + 16, 3, C.ink, { align: 'center', k: prog(t, T.zz - 0.1, T.zz + 0.3), ghost: false });
  }

  captions(d, t) {
    const T = this.T;
    if (t > T.says1 - 0.3) dm(d, [['ROW:    X^0^ = ', C.ink], ['1', C.one]], tx, y1 + 20, 5, C.ink, { k: prog(t, T.says1 - 0.3, T.says1 + 0.5) });
    if (t > T.other - 0.2) dm(d, [['COLUMN: 0^Y^ = ', C.ink], ['0', C.zero]], tx, y1 + 86, 5, C.ink, { k: prog(t, T.other - 0.2, T.says0 + 0.3) });
    if (t > T.which - 0.1) {
      const runs = [['ONE SQUARE: ', C.ink], ['1', C.one], [' OR ', C.ink], ['0', C.zero], [' ?', C.ink]];
      const wr = dm(d, runs, 1824, y1 + 20, 5, C.ink, { align: 'right', k: prog(t, T.which - 0.1, T.wins + 0.3) });
      if (tx + dmW('COLUMN: 0^Y^ = 0', 5) + 60 > 1824 - wr) throw new Error('chú thích dưới bảng chồng nhau');
    }
    if (t > T.depends - 0.1) dm(d, 'DEPENDS ON THE MATHEMATICS', 1824, y1 + 90, 4, C.ink, { align: 'right', k: prog(t, T.depends - 0.1, T.doing + 0.2) });
  }
}
