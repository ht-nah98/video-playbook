// b19 · Check it (câu p2 75–76) — ERA sheet, VIEWS.area → VIEWS.bowl.
// Mở bằng ĐÚNG khung cuối b18 (đất 0 … 0.64, nhãn x) rồi mép đất chạy sang x = 1 ("area from zero to x"): "x cubed over three" ghi dần;
// "x equals one" → thẻ x = 1, ⅓ (frac, nâu đất — là DIỆN TÍCH); "derivative" → mũi tên navy từ x³/3 sang x², thẻ x² xanh lục;
// "the very bowl we started with" → camera lùi về VIEWS.bowl, thẻ y = x².
import { H, C, AR, MO, clamp, lerp, prog, lookup, must, outCubic, smooth, ground, hill, areaFill, card, text, math, frac, measure, pen,
  arrow, secTag, figure, lerpView, VIEWS, AREA, sq, fmt } from '../kit.js';

export default class Check {
  static ERA = 'sheet';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b19');
    this.T = {
      area: w(75, 'area'), zero: w(75, 'zero'), x75: w(75, 'x', 1), turns: w(75, 'turns'), cubed: w(75, 'cubed'), three: w(75, 'three'),
      equals: w(75, 'equals'), one: w(75, 'one', 1), third: w(75, 'third'), found: w(75, 'found'),
      deriv: w(76, 'derivative'), squared: w(76, 'squared'), very: w(76, 'very'), bowl: w(76, 'bowl'), started: w(76, 'started'),
    };
    this.START = L(75).start; this.END = L(76).end;
    this.FROM = Math.max(this.START - 1.2, tl.lines[74].end + 0.5);   // KẾT = end câu 74 (b18)
    must(`${fmt(AREA(1))}`, 1 / 3); must('3 * 1 ** 2 / 3', 1);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.turns, 'pen'), c(T.third, 'shimmer'), c(T.squared, 'correct')];
  }
  render(g, t) {
    const T = this.T, S = this.START, FROM = this.FROM;
    ground(g, 'sheet', t, { pan: 300 });
    const kc = smooth(prog(t, T.bowl - 0.2, T.started + 0.1)), V = lerpView(VIEWS.area, VIEWS.bowl, kc);
    hill(g, V, { a: -3, b: 3.6, t });
    // mép đất chạy 0.64 → 1 ("from zero to x"), dừng ở 1 khi nói "x equals one"
    const xa = lerp(0.64, 1, smooth(prog(t, FROM + 0.4, T.equals + 0.2)));
    areaFill(g, V, 0, xa, { k: 1, seed: 7, outline: false });
    g.save(); g.strokeStyle = C.soilInk; g.lineWidth = 4; g.beginPath(); g.moveTo(V.X(xa), V.Y(0)); g.lineTo(V.X(xa), V.Y(sq(xa))); g.stroke(); g.restore();
    if (kc < 1) card(g, 'x', V.X(xa) - 62, 972, { size: 36, isMath: true, mono: false, wt: 700, edge: C.ink, k: 1, lift: kc });

    // ── hàng 1: area = x³/3 ──
    const out1 = prog(t, T.deriv - 0.5, T.deriv - 0.1);
    const k1 = prog(t, T.area, T.three + 0.1);
    if (k1 > 0 && out1 < 1) {
      const dy = -(outCubic(out1) ** 1.4) * 500;
      const w0 = text(g, 'area = ', 130, 330 + dy, { font: `800 64px ${AR}`, color: C.soilInk, k: prog(t, T.area, T.zero) });
      math(g, 'x³/3', 130 + w0, 330 + dy, { px: 88, color: C.soilInk, k: prog(t, T.turns, T.three + 0.1), wt: 800 });
      // hàng 2: x = 1 → ⅓
      const k2 = prog(t, T.equals, T.one + 0.2), k3 = prog(t, T.third, T.third + 0.4);
      if (k2 > 0) {
        const w2 = math(g, 'x = 1  →', 130, 500 + dy, { px: 64, color: C.ink, k: k2, wt: 800 });
        if (k3 > 0) { frac(g, '1', '3', 130 + w2 + 90, 485 + dy, { px: 100, color: C.soilInk, k: k3 }); if (k3 >= 1) must(`${fmt(AREA(1))}`, 1 / 3); }
      }
    }
    // ── hàng 3: x³/3 → derivative → x² ──
    const kr = prog(t, T.deriv - 0.1, T.deriv + 0.3), lift3 = prog(t, T.very - 0.3, T.very + 0.3);
    if (kr > 0 && lift3 < 1) {
      const dy = -(outCubic(lift3) ** 1.4) * 520;
      card(g, 'x³/3', 330, 400, { size: 64, isMath: true, mono: false, wt: 800, color: C.soilInk, edge: C.soil, k: kr, lift: lift3 });
      arrow(g, 500, 400 + dy, 740, 400 + dy, prog(t, T.deriv + 0.1, T.deriv + 0.6), { w: 7 });
      text(g, 'derivative', 620, 366 + dy, { font: `700 34px ${AR}`, align: 'center', k: prog(t, T.deriv, T.deriv + 0.5) });
      card(g, 'x²', 920, 400, { size: 64, isMath: true, mono: false, wt: 800, color: C.curveInk, edge: C.curve, k: prog(t, T.squared, T.squared + 0.3), lift: lift3 });
    }
    // ── "the very bowl we started with" ──
    const kb = prog(t, T.very, T.bowl + 0.3);
    if (kb > 0) card(g, 'y = x²', 740, 300, { size: 64, isMath: true, mono: false, wt: 800, color: C.curveInk, edge: C.curve, k: kb });

    secTag(g, 'Check it', { k: prog(t, S + 0.1, S + 0.5), t });
    // ── mascot: pointer ──
    const kIn = prog(t, T.one, T.one + 0.5), kOut = prog(t, this.END + 0.2, this.END + 0.6);
    if (kIn > 0 && kOut < 1) figure(g, 'pointer', 205, H, 262, Math.min(kIn, 1 - kOut), { t });
  }
}
