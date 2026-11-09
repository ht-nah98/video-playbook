// b03 · "The condition everyone forgets" (b) · câu p2 14–19 — lưới 36 ô (vật xuyên suốt, DNA §1).
//  câu 14  "red" → cột đầu hàng 6 xúc xắc đỏ; "blue" → hàng đầu cột 6 xúc xắc xanh; "six ways" ×2.
//  câu 15  "grid" → lưới kẻ bút chì; "thirty-six" → 36 tổng điền vào; "every square" → ô nhấp nháy đều.
//  câu 16  "sevens" → đường chéo 6 ô tô dạ vàng lần lượt ("one and six", "two and five", …).
//  câu 17  "6 / 36 = 1/6" bên phải.    câu 18  "twelve" → ô (6,6) khoanh cam; "1 / 36".
//  câu 19  "six times" → "7 is 6× as likely as 12" ; danh sách 11 tổng thu nhỏ bên trái, ô 7 và 12 cùng cỡ (đều 1 mục).
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, paper, write, calc, big, frac, hi, ring, grid36, N, must } from '../kit.js';
import { mascot } from './g-common.js';

export const G = { x: 760, y: 200, c: 108 };

export default class Grid {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b03');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l14: S(14), red14: w(14, 'red'), blue14: w(14, 'blue'), e14: E(14),
      grid15: w(15, 'grid'), thirty15: w(15, 'thirty-six'), every15: w(15, 'every', 1), e15: E(15),
      sevens16: w(16, 'sevens'), e16: E(16),
      l17: S(17), one17: w(17, 'one'), e17: E(17),
      twelve18: w(18, 'twelve'), only18: w(18, 'only'), one18: w(18, 'one', 2), e18: E(18),
      six19: w(19, 'six'), totals19: w(19, 'totals'), e19: E(19),
    };
    this.START = S(14);
    this.FROM = S(14) - 0.5;
    must(`${N.sevens} / 36`, 1 / 6); must(`${N.twelves}`, 1);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.red14, 'dice'), c(T.blue14, 'dice'), c(T.grid15, 'pen'), c(T.thirty15, 'tick'), c(T.sevens16, 'pen'), c(T.l17, 'pen'), c(T.twelve18, 'pop'), c(T.six19, 'correct')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    const heads = prog(t, T.red14 - 0.2, T.e14);
    grid36(g, G.x, G.y, G.c, {
      k: prog(t, T.grid15 - 0.2, T.grid15 + 0.8), heads, sums: prog(t, T.thirty15 - 0.3, T.e15),
      seven: prog(t, T.sevens16, T.e16), twelve: prog(t, T.twelve18, T.twelve18 + 0.5),
    });
    // phải: 6/36 = 1/6, rồi 1/36
    const RX = 1560;
    if (t >= T.l17) { frac(g, 6, 36, RX + 20, 320, prog(t, T.l17, T.l17 + 0.8), { size: 80 }); write(g, '= 1/6', RX + 110, 350, prog(t, T.one17, T.one17 + 0.4), { font: `800 64px ${AR}`, color: C.ink }); }
    if (t >= T.only18) { frac(g, 1, 36, RX + 20, 600, prog(t, T.only18, T.one18 + 0.4), { size: 80, color: C.orangeInk }); }
    // trái: danh sách 11 tổng thu nhỏ — 7 và 12 cùng là một mục
    const kl = prog(t, T.six19, T.six19 + 0.6);
    if (kl > 0) {
      write(g, '6×', RX + 20, 790, kl, { font: `800 110px ${AR}`, color: C.ink });
      write(g, 'as likely', RX + 24, 840, kl, { font: `700 36px ${AR}`, color: C.ink2 });
      for (let s = 2; s <= 12; s++) { const y = 200 + (s - 2) * 70, k = prog(t, T.totals19 - 0.4 + (s - 2) * 0.03, T.totals19 + (s - 2) * 0.03);
        if (s === 7) hi(g, 196, y - 50, 90, 64, k); if (s === 12) ring(g, 240, y - 18, 52, 38, k);
        write(g, String(s), 240, y, k, { font: `800 52px ${AR}`, color: C.ink, align: 'center' }); }
    }
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
