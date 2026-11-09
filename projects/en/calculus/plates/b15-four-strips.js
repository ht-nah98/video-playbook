// b15 · Four strips (câu p2 58–61) — G3, ERA sheet. VIEWS.area.
// câu 58: bốn cột mọc ('strips'), chạm đường cong ở mép PHẢI (chấm navy ở "right edge").  câu 59: thẻ tím "≈ 0.47", phần thừa tím hiện ở "sticks out above".
// câu 60: cột phải lặn, bốn cột mép TRÁI (nét đứt) mọc ở "left edge", thẻ navy "≈ 0.22", "TOO LITTLE".  câu 61: thẻ lên, thanh khoảng [0.22, 0.47] kẹp diện tích thật ("TRUE AREA = ?").
import { C, MO, H, clamp, lerp, ground, hill, columns, card, secTag, figure, text, line, interval, outCubic, VIEWS, prog, lookup, must, fmt, sq, RIEMANN, upper, lower, view } from '../kit.js';

export default class FourStrips {
  static ERA = 'sheet';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b15');
    this.START = L(58).start;
    this.FROM = +Math.max(this.START - 1.2, L(57).end + 0.5).toFixed(3);
    this.T = {
      cut: w(58, 'cut'), strips: w(58, 'strips'), right: w(58, 'right'), edge: w(58, 'edge'), e58: L(58).end,
      l59: L(59).start, zero59: w(59, 'zero'), too59: w(59, 'too'), sticks: w(59, 'sticks'), e59: L(59).end,
      l60: L(60).start, left: w(60, 'left'), zero60: w(60, 'zero'), little: w(60, 'little'), e60: L(60).end,
      l61: L(61).start, true: w(61, 'true'), trapped: w(61, 'trapped'), some: w(61, 'somewhere'), between: w(61, 'between'), e61: L(61).end,
    };
    const T = this.T;
    for (const [a, b] of [['strips', 'right'], ['right', 'edge'], ['zero59', 'sticks'], ['left', 'zero60'], ['true', 'trapped'], ['trapped', 'between']]) if (!(T[a] < T[b])) throw new Error(`b15: mốc ${a} ≥ ${b}`);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.strips, 'tick'), c(T.right, 'tick'), c(T.zero59, 'card'), c(T.sticks, 'pop'), c(T.left, 'tick'), c(T.zero60, 'pen'), c(T.true, 'card')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, V = VIEWS.area;
    ground(g, 'sheet', t);
    hill(g, V, { a: -1.2, b: 3.6, t });
    secTag(g, 'Four strips', { k: prog(t, F + 0.2, F + 0.6), t });
    const swap = prog(t, T.left - 0.1, T.left + 0.5);

    // ── bốn cột mép phải (tổng trên) → bốn cột mép trái (tổng dưới) ──
    const kR = prog(t, T.strips, T.strips + 1.2) * (1 - swap), kL = prog(t, T.left + 0.1, T.left + 1.2);
    if (kR > 0) columns(g, V, 4, { side: 'right', k: kR, excess: prog(t, T.sticks, T.sticks + 0.5) * (1 - swap), a_: 1 });
    if (kL > 0) columns(g, V, 4, { side: 'left', k: kL });
    if (kR >= 1 && t < T.left - 0.1) must(`${fmt(upper(4))}`, 0.46875);
    // chấm navy nơi cột chạm đường cong: mép phải (câu 58), mép trái (câu 60)
    const dots = (a, side) => { for (let i = 0; i < 4; i++) { const u = side === 'right' ? (i + 1) / 4 : i / 4, k = prog(t, a + i * 0.12, a + i * 0.12 + 0.2); if (k <= 0) continue;
      const px = V.X(u), py = V.Y(sq(u)), r = 11 * outCubic(k); g.save(); g.fillStyle = C.ink; g.strokeStyle = C.white; g.lineWidth = 4; g.beginPath(); g.arc(px, py, r, 0, 7); g.fill(); g.stroke(); g.restore(); } };
    if (t >= T.right) { if (swap < 1) g.save(), g.globalAlpha = 1 - swap, dots(T.right, 'right'), g.restore(); if (t >= T.left) dots(T.left + 0.2, 'left'); }

    // ── thẻ số ──
    const lf = prog(t, T.l61 + 0.05, T.l61 + 0.5), lm = prog(t, T.l60 + 0.3, T.l60 + 0.8);
    card(g, `≈ ${RIEMANN[4].hi}`, 700, 260, { size: 52, color: C.badInk, edge: C.bad, k: prog(t, T.zero59, T.zero59 + 0.3), lift: lf });
    card(g, 'TOO MUCH', 1030, 260, { size: 44, mono: false, wt: 800, color: C.badInk, edge: C.bad, k: prog(t, T.too59, T.too59 + 0.3), lift: lm });
    card(g, `≈ ${RIEMANN[4].lo}`, 700, 380, { size: 52, color: C.ink, edge: C.ink, k: prog(t, T.zero60, T.zero60 + 0.3), lift: lf });
    card(g, 'TOO LITTLE', 1040, 380, { size: 44, mono: false, wt: 800, k: prog(t, T.little, T.little + 0.3), lift: lf });

    // ── câu 61: bị kẹp giữa ──
    if (t >= T.true) {
      const ki = prog(t, T.trapped, T.trapped + 0.6), X0 = 560, X1 = 1000, y = 520;
      card(g, 'TRUE AREA = ?', 775, 400, { size: 44, mono: false, wt: 800, color: C.soilInk, edge: C.soil, k: prog(t, T.true, T.true + 0.3) });
      const S = interval(g, X0, X1, y, +RIEMANN[4].lo, +RIEMANN[4].hi, { range: [0.2, 0.5], k: ki, third: false });
      for (const v of [+RIEMANN[4].lo, +RIEMANN[4].hi]) { const k = prog(t, T.trapped + 0.2, T.trapped + 0.5); if (k > 0) line(g, S(v), y - 34 * k, S(v), y + 34 * k, C.ink, 6); }
      text(g, RIEMANN[4].lo, S(+RIEMANN[4].lo), 590, { font: `500 36px ${MO}`, align: 'center', k: prog(t, T.trapped + 0.3, T.trapped + 0.6) });
      text(g, RIEMANN[4].hi, S(+RIEMANN[4].hi), 590, { font: `500 36px ${MO}`, color: C.badInk, align: 'center', k: prog(t, T.trapped + 0.3, T.trapped + 0.6) });
    }

    // ── mascot pointer: câu 58–59 ──
    const mIn = prog(t, T.cut - 0.3, T.cut + 0.3), mOut = prog(t, T.e59 + 0.1, T.e59 + 0.6);
    if (mIn > 0 && mOut < 1) { g.save(); g.translate(0, outCubic(mOut) * 300); figure(g, 'pointer', 205, H, 262, mIn, { t }); g.restore(); }
  }
}
