// c3 · What the dots mean (p2, hồi hai) — dựng lại ĐÚNG khung lab 1 (tools/lab/gameshow.html):
//   bảng lật hai cột THE LIST 0.9 → 0.99 → 0.999 … / GAP TO 1 0.1 → 0.01 → 0.001 …, hàng chờ khuất dần ở đáy;
//   bảng đèn phải "0.999…" → "?" (bóng đèn) ở "what does it mean" → "IN THE REAL NUMBERS" → "= WHERE THIS / IS HEADING ="
//   → "?" tắt, số "1" bằng bóng đèn bật ở "heading is one" (correct); thẻ "STILL A LITTLE SHORT" (KHÔNG X, chưa dán nhãn —
//   nhãn là việc của c6) giữa đáy; câu cuối: sân khấu trượt phải, mascot `crossed` trồi lên trái, khoanh mực quanh số 1.
import { W, H, C, smooth, outCubic, prog, ground, reflect, bulbs, bulbText, flap, flapW, flapSpin, gutCard, label, text,
  card, figure, lookup, must } from '../kit.js';

const F = 760, SPOTS = [[1000, 380, 700, 0.14], [270, 640, 380, 0.13]];   // phông lab khung 1
const CW = 38, CHh = 62, GP = 4, PITCH = CW + GP, RP = 76, NCOL = 7, SP = 1;   // ô lật: chữ 46 px
const BWD = (2 * NCOL + SP) * PITCH - GP, LMW = BWD + 100, NR = 5;
const LMY = 64, BY0 = 150, LMH = 130 + NR * RP + 70;
const SW = 460, SY = 126, SH = 600, BGAP = 24;
const X0 = Math.round((W - (LMW + BGAP + SW)) / 2), SHIFT = 610 - X0;     // trượt phải khi nhân vật trồi lên

export default class Dots {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['crossed'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      place: w(73, 'place'), zero73: w(73, 'zero'), repeating73: w(73, 'repeating'), mean: w(73, 'mean'),
      nines74: w(74, 'nines'), list74: w(74, 'list'), longer: w(74, 'longer'),
      v: [w(75, 'zero'), w(75, 'zero', 2), w(75, 'zero', 3), w(75, 'and'), w(75, 'on')],
      gap76: w(76, 'gap'), g: [w(76, 'tenth'), w(76, 'hundredth'), w(76, 'thousandth'), w(77, 'keeps'), w(77, 'closing')],
      push: w(77, 'push'),
      real: w(78, 'real'), every: w(78, 'every'), symbol: w(78, 'symbol'), defined: w(78, 'defined'), heading78: w(78, 'heading'),
      where79: w(79, 'where'), one79: w(79, 'one'),
      so80: w(80, 'so'), hover: w(80, 'hover'), sits: w(80, 'sits'), one80: w(80, 'one', 2),
    };
    this.START = L(73).start; this.FROM = this.START - 1.2;
    // THE LIST: 0.9, 0.99, … ; GAP TO 1: 1 − 0.9…9 = 10^−k (CONTENT: 0,1 / 0,01 / 0,001)
    this.ROWS = Array.from({ length: NR }, (_, i) => {
      const k = i + 1, v = '0.' + '9'.repeat(k), gap = (1 - Number(v)).toFixed(k);
      must(`Number((1 - ${v}).toFixed(${k})) === 10 ** -${k}`, true); must(`Number('${v}') + Number('${gap}')`, 1);
      return [v, gap];
    });
    must(`'${this.ROWS[2][1]}'`, '0.001');
    this.V = { one: must('Number(\'0.999\') + Number(\'0.001\')', 1) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.place, kind: 'shimmer' },                         // bảng đèn bật
      ...T.v.slice(0, 4).map(t => ({ t, kind: 'flap' })),      // hàng 4–5 lật chung một cụm ("and so on")
      ...T.g.slice(0, 4).map(t => ({ t, kind: 'flap' })),
      { t: T.one79, kind: 'correct' },                         // số 1 sáng đèn
    ];
  }

  render(g, t) {
    const T = this.T, sx0 = X0 + SHIFT * smooth(prog(t, T.so80 - 0.4, T.so80 + 0.4));
    ground(g, 'stage', { floor: F, spots: SPOTS });
    const bx = sx0 + 50, gx = bx + (NCOL + SP) * PITCH, sx = sx0 + LMW + BGAP, cx = sx + SW / 2;
    const glow = 'rgba(255,170,40,0.75)';
    const kin = outCubic(prog(t, this.FROM + 0.3, this.FROM + 0.9)), drop = (1 - kin) * -720;
    reflect(g, F, d => {
      d.save(); d.translate(0, drop);
      // ── bảng lật THE LIST / GAP TO 1 (khung đèn bật ở "nines") ──
      bulbs(d, sx0, LMY, LMW, LMH, t, { lit: t >= T.nines74 });
      this.ROWS.forEach(([v, gp], i) => {
        const y = BY0 + i * RP, last = i === NR - 1;
        const kv = prog(t, T.v[i], T.v[i] + (last ? 0.5 : 0.7)), kg = prog(t, T.g[i], T.g[i] + (last ? 0.5 : 0.7));
        flap(d, v.padEnd(NCOL), bx, y, CW, kv, { gap: GP, h: CHh });
        flap(d, gp.padEnd(NCOL), gx, y, CW, kg, { gap: GP, h: CHh });
        if (last && t > T.push) {                            // "push it as close as you like": ô cuối lật mãi
          flapSpin(d, '9', bx + (v.length - 1) * PITCH, y, CW, t - T.push, { h: CHh, per: 0.7 });
          flapSpin(d, '1', gx + (gp.length - 1) * PITCH, y, CW, t - T.push + 0.25, { h: CHh, per: 0.7 });
        }
      });
      // hàng chờ khuất dần (bảng dài ra) — trượt xuống ở "keeps getting longer"
      const gy = BY0 + NR * RP - 18 * (1 - smooth(prog(t, T.longer, T.longer + 0.6)));
      d.save(); d.globalAlpha = 0.45 * (0.4 + 0.6 * smooth(prog(t, T.longer, T.longer + 0.6)));
      flap(d, ' '.repeat(NCOL), bx, gy, CW, 1, { gap: GP, h: CHh * 0.5 }); flap(d, ' '.repeat(NCOL), gx, gy, CW, 1, { gap: GP, h: CHh * 0.5 });
      d.restore();
      // ── bảng đèn: câu hỏi → đáp ──
      bulbs(d, sx, SY, SW, SH, t + 0.37, { step: 36, lit: t >= T.place });
      label(d, 'in the real numbers', cx, SY + 74, C.dim, 'center', 20, prog(t, T.real, T.every + 0.3));
      const pulse = Math.sin(Math.PI * prog(t, T.symbol + 0.2, T.symbol + 1.0));
      text(d, '0.999…', cx, SY + 170, 100, C.amber, { align: 'center', glow, blur: 22 + 30 * pulse, k: prog(t, T.zero73, T.repeating73 + 0.3) * 1.15 });
      text(d, '= WHERE THIS', cx, SY + 238, 46, C.amber, { align: 'center', glow, blur: 14, ls: 1, k: prog(t, T.defined, T.defined + 1.1) });
      text(d, 'IS HEADING =', cx, SY + 292, 46, C.amber, { align: 'center', glow, blur: 14, ls: 1, k: prog(t, T.defined + 1.0, T.heading78 + 0.3) });
      const oy = SY + 240, ko = prog(t, T.where79 - 0.1, T.one79 - 0.2);   // "?" tắt dần (trên → dưới đèn tắt trước)
      const kq = t < T.where79 ? prog(t, T.mean - 0.1, T.mean + 0.5) : 1 - ko;
      if (kq > 0) bulbText(d, '?', cx, oy, 330, kq, { align: 'center', pitch: 25, r: 9, off: false });
      const k1 = prog(t, T.one79 - 0.3, T.one79 + 0.25);
      if (k1 > 0) bulbText(d, String(this.V.one), cx, oy, 330, k1, { align: 'center', pitch: 25, r: 9, off: false });
      d.restore();
    });
    label(g, 'the list', bx, LMY + 64 + drop, C.ink, 'left', 20, prog(t, T.list74, T.list74 + 0.4));
    label(g, 'gap to 1', gx, LMY + 64 + drop, C.ink, 'left', 20, prog(t, T.gap76, T.gap76 + 0.4));
    // "sits exactly on one": khoanh mực quanh số 1 bằng bóng đèn
    const kc = prog(t, T.sits, T.one80 + 0.2);
    if (kc > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.ellipse(cx + 4, SY + 240 + 198, 105, 120, 0.03, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2.06 * kc); g.stroke(); g.restore();
    }
    // nhân vật khoanh tay (vẫn chưa tin) — trồi lên khi sân khấu trượt phải
    const km = prog(t, T.so80 + 0.1, T.so80 + 0.5);
    if (km > 0) figure(g, 'crossed', 292, 1080, 760, km);
    // thẻ trả lời: KHÔNG gạch; lắc ở "hover"
    const wob = t > T.hover && t < T.hover + 1.2 ? Math.sin((t - T.hover) * 14) * 0.05 * (1 - (t - T.hover) / 1.2) : 0;
    gutCard(g, 'STILL A\nLITTLE SHORT', bx + 340, 868, 580, 270, 1, { rise: prog(t, this.FROM + 0.4, this.FROM + 0.9), rot: 0.035 + wob, seed: 47 });
    card(g, prog(t, this.FROM + 0.4, this.FROM + 1.2), 'ACT TWO', 'WHAT THE DOTS MEAN');
  }
}
