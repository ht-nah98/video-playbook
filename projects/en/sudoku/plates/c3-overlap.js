// c3 · Take away the overlap — ô cửa (712, 132, 80) ở trạng thái cuối c2 (đỏ, xanh gân, 20 ô kính đôi).
// "both red and blue" → viền sáng 20 ô kính đôi; "take one … out" → nhấc MỘT ô (snap) bay sang trái thành vật trưng,
// "whatever digit" → "?" trên kính; "removed it from both sides" → "red − ? = blue − ?"; "still … same digits" khắc;
// "every cell" → nhấc hết 19 ô còn lại (một snap cho cả cụm), bộ đếm 19 → 0. Kết: mọi chữ/vật trượt khỏi khung
// xong lúc c4.FROM − 0.3 → khung cuối TRÙNG khung đầu c4 (CONTINUES, cắt thẳng).
import { W, C, prog, lookup, must, outCubic, outBack, ground, window9, pane, outline, it, label, num, eq, sectionTag,
  PHI, PHI_DBL } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const kindBase = (r, c) => (PHI.red(r, c) && PHI.blue(r, c) ? 'dbl' : PHI.red(r, c) ? 'red' : PHI.blue(r, c) ? 'blue' : 'clear');
const FIRST = [2, 0];                                                // ô kính đôi nhấc đầu tiên: hàng 3, cột 1
const REST = PHI_DBL.filter(([r, c]) => !(r === FIRST[0] && c === FIRST[1]))
  .sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));                   // sóng nhấc trái → phải
const EX = [96, 340, 120];                                           // vật trưng: x, y, cạnh

export default class Overlap {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      both: w(25, 'both'), cells: w(25, 'cells'), out: w(26, 'out'), digit: w(26, 'digit'), removed: w(26, 'removed'), sides: w(26, 'sides'),
      still: w(27, 'still'), same: w(27, 'same'), every: w(28, 'every'), balance: w(28, 'balance'), end: L(28).end,
    };
    this.START = L(25).start;
    this.FROM = Math.max(this.START - 1.2, L(24).end + 0.5);
    const c4From = Math.max(L(29).start - 1.2, L(28).end + 0.5);    // c4-left.js FROM (cắt thẳng vào đó)
    this.CLEAN = c4From - 0.3;                                       // từ đây khung = khung đầu c4
    this.lift = new Map([[FIRST[0] * 9 + FIRST[1], this.T.out]]);
    REST.forEach(([r, c], i) => this.lift.set(r * 9 + c, this.T.every + i * 0.07));
    must(`${PHI_DBL.length}`, 20); must(`${REST.length}`, 19);
    must(`${this.T.every + (REST.length - 1) * 0.07 + 0.6 < this.CLEAN}`, true);   // sóng nhấc xong trước khi dọn khung
    must(`${PHI.red(...FIRST) && PHI.blue(...FIRST)}`, true);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.both, kind: 'tick' }, { t: T.out, kind: 'snap' }, { t: T.removed, kind: 'pen' }, { t: T.still, kind: 'pen' },
      { t: T.every, kind: 'snap' }, ...REST.map((_, i) => ({ t: T.every + i * 0.07, kind: 'tick', db: -8 })).filter((_, i) => i % 5 === 4)];
  }
  render(g, t) {
    const T = this.T, lifted = (r, c) => this.lift.has(r * 9 + c) && t >= this.lift.get(r * 9 + c);
    ground(g);
    const kindOf = (r, c) => (lifted(r, c) ? 'hole' : kindBase(r, c));
    const P = window9(g, X0, Y0, CS, { kindOf });

    // viền sáng quanh các ô kính đôi CÒN trong khung
    const left = PHI_DBL.filter(([r, c]) => !lifted(r, c));
    outline(g, P, left, C.clear, prog(t, T.both - 0.1, T.both + 0.4) * (1 - prog(t, T.balance - 0.3, T.balance)), 5);

    // sóng nhấc: ô kính đôi bật lên rồi thu nhỏ bay khỏi khung (19 ô còn lại)
    REST.forEach(([r, c]) => {
      const a = this.lift.get(r * 9 + c), p = prog(t, a, a + 0.6);
      if (p <= 0 || p >= 1) return;
      const s = (CS - 10) * (1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2))) * (1 - outCubic(prog(p, 0.4, 1)));
      const cx = X0 + c * CS + CS / 2 - outCubic(p) * 40, cy = Y0 + r * CS + CS / 2 - outCubic(p) * 110;
      if (s > 2) pane(g, cx - s / 2, cy - s / 2, s, 'dbl', r * 9 + c + 1, 1);
    });

    // chữ + vật trưng (trượt sang trái khỏi khung trước CLEAN)
    const gone = outCubic(prog(t, this.CLEAN - 0.4, this.CLEAN));
    if (gone >= 1) return;
    g.save(); g.translate(-gone * (W * 0.45), 0);
    sectionTag(g, "ACT II · TAKE AWAY THE OVERLAP", prog(t, this.FROM + 0.3, this.FROM + 0.9));
    eq(g, [['both ', C.ink], ['red', C.redT], [' and ', C.ink], ['blue', C.blueT]], 96, 220, 60, { k: prog(t, T.both - 0.3, T.both + 0.6) });
    label(g, `${PHI_DBL.length} cells · two layers of glass`, 96, 270, { size: 20, k: prog(t, T.cells, T.cells + 0.5) });

    // MỘT ô nhấc ra: bay từ ô (hàng 3, cột 1) sang chỗ trưng bên trái
    const pf = outCubic(prog(t, T.out, T.out + 0.7));
    if (t >= T.out) {
      const [r, c] = FIRST, x0 = X0 + c * CS + 5, y0 = Y0 + r * CS + 5, s0 = CS - 10;
      const bob = 40 * Math.sin(Math.PI * pf);
      const x = x0 + (EX[0] - x0) * pf, y = y0 + (EX[1] - y0) * pf - bob, s = s0 + (EX[2] - s0) * outBack(prog(t, T.out, T.out + 0.7));
      g.fillStyle = C.lead; g.beginPath(); g.roundRect(x - 6, y - 6, s + 12, s + 12, 9); g.fill();
      pane(g, x, y, s, 'dbl', 19, 1);
      if (t >= T.digit) num(g, '?', x + s / 2, y + s * 0.72, 72, C.digit, { align: 'center' });
    }
    label(g, 'any digit', EX[0] + EX[2] + 30, EX[1] + 70, { size: 22, k: prog(t, T.digit, T.digit + 0.4) });
    eq(g, [['red − ?', C.redT], [' = '], ['blue − ?', C.blueT]], 96, 580, 60, { k: prog(t, T.removed, T.sides + 0.3) });
    it(g, 'still the same digits', 96, 650, 44, C.ink, { k: prog(t, T.still, T.same + 0.4) });

    // bộ đếm ô kính đôi còn lại (tính bằng code)
    if (t >= T.both) {
      label(g, 'double cells left', 96, 760, { size: 20, k: prog(t, T.both, T.both + 0.4) });
      num(g, left.length, 96, 840, 60, C.ink);
    }
    g.restore();
  }
}
