// b08 ★ · Where it's heading (ACT THREE — The hole; câu 27–31, G2). Mở bằng thẻ hồi; sườn đồi zoom còn sào + người đi bộ
// ("heading": ba dây mờ + mũi tên navy; "spot": vòng bút; "limit": thẻ LIMIT), rồi đồi chìm, ĐƯỜNG MÒN y = x + 5 (VIEWS.trail) trồi lên.
// Biểu thức (x² − 25) / (x − 5) ghi dần; thay x = 5: tử 25 − 25 = 0, mẫu 5 − 5 = 0; 「0 / 0」 + "= ?"; "no value" → hố cọc rỗng + cờ.
import { H, C, AR, prog, lookup, must, outCubic, ground, hill, secant, rod, spot, hiker, card, frac, text, secTag, actTitle, hole, flag, arrow,
  VIEWS, view, tanAt, sq } from '../kit.js';
import { lifted, sinkY, typed, trailGround, ring, mascots } from './g2-util.js';
import { plot } from '../kit.js';

export default class Heading {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b08');
    this.T = {
      asking27: w(27, 'asking'), where27: w(27, 'where'), heading27: w(27, 'heading'), spot27: w(27, 'spot'), limit27: w(27, 'limit'),
      l28: L(28).start,
      x29a: w(29, 'x', 1), minus29a: w(29, 'minus', 1), tf29: w(29, 'twenty-five'), divided29: w(29, 'divided'), x29b: w(29, 'x', 2), minus29b: w(29, 'minus', 2), five29: w(29, 'five'),
      five30a: w(30, 'five', 1), tf30a: w(30, 'twenty-five', 1), minus30a: w(30, 'minus', 1), tf30b: w(30, 'twenty-five', 2), zero30a: w(30, 'zero', 1),
      five30b: w(30, 'five', 2), minus30b: w(30, 'minus', 2), five30c: w(30, 'five', 3), zero30b: w(30, 'zero', 2),
      zero30c: w(30, 'zero', 3), over30: w(30, 'over'), zero30d: w(30, 'zero', 4), again30: w(30, 'again'),
      five31: w(31, 'five'), no31: w(31, 'no'), value31: w(31, 'value'),
    };
    this.START = L(27).start; this.FROM = Math.max(this.START - 2.6, L(26).end + 0.5);
    this.TV = VIEWS.trail;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.asking27 + 0.27, 'tick'), c(T.limit27, 'card'), c(T.x29a, 'pen'), c(T.five30a, 'pen'), c(T.zero30a, 'tick'), c(T.again30, 'question'),
    ];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.zoom, TV = this.TV;
    ground(g, 'field', t, { pan: 420 });
    const hr = 1 - prog(t, T.l28, T.l28 + 0.9), tr = prog(t, T.l28 + 0.2, T.l28 + 1.3), dyH = sinkY(hr);
    // ── sườn đồi zoom (sào đã hạ từ b07) ──
    if (hr > 0) {
      hill(g, V, { a: -1.2, b: 3.6, t, rise: hr });
      g.save(); g.translate(0, 0);
      const al = prog(t, T.asking27, T.asking27 + 0.4);
      [[1.5, 0], [1.1, 0.25], [1.01, 0.5]].forEach(([x, d]) => secant(g, V, 1, x, { k: prog(t, T.asking27 + d, T.asking27 + d + 0.22), a: 0.5, poles: false, ext: 0.3, ext0: 0.03, lift: 1 - hr }));
      rod(g, V, 1, { d0: -0.55, d1: 0.7, lift: 1 - hr });
      if (al > 0 && hr >= 1) { const A = [V.X(1.45), V.Y(tanAt(1, 1.45)) - 85], B = [V.X(1.12), V.Y(tanAt(1, 1.12)) - 85]; arrow(g, A[0], A[1], B[0], B[1], prog(t, T.heading27, T.heading27 + 0.5)); }
      g.save(); g.translate(0, dyH);
      spot(g, V.X(1), V.Y(1), { pulse: prog(t, T.spot27, T.spot27 + 0.5) });
      ring(g, V.X(1), V.Y(1), 40, prog(t, T.spot27 + 0.05, T.spot27 + 0.5));
      hiker(g, V.X(0.78) - 7.8, V.Y(sq(0.78)) - 6, 1.3);
      g.restore(); g.restore();
      card(g, 'LIMIT', 360, 330, { size: 80, mono: false, wt: 900, k: prog(t, T.limit27, T.limit27 + 0.3), lift: prog(t, T.l28 + 0.3, T.l28 + 0.85) });
    }
    // ── đường mòn y = x + 5 ──
    if (tr > 0) {
      trailGround(g, TV, { rise: tr });
      const dy = sinkY(tr); g.save(); g.translate(0, dy);
      plot(g, TV, u => u + 5, TV.u(-20), TV.u(1940), { color: C.soilInk, w: 14 }); plot(g, TV, u => u + 5, TV.u(-20), TV.u(1940), { color: '#E2C792', w: 8 });
      g.restore();
      const hx = TV.X(5), hy = TV.Y(10) + dy;
      hole(g, hx, hy, { k: prog(t, T.value31, T.value31 + 0.3) });
      flag(g, hx, hy - 12, { k: prog(t, T.five31, T.five31 + 0.4), t, color: C.pole });
    }
    // ── biểu thức + thay x = 5 ──
    const e = [{ s: '(x² ', at: T.x29a }, { s: '− ', at: T.minus29a }, { s: '25)', at: T.tf29 }, { s: ' / ', at: T.divided29 }, { s: '(x ', at: T.x29b }, { s: '− ', at: T.minus29b }, { s: '5)', at: T.five29 }];
    if (t >= T.x29a) typed(g, t, e, 120, 270, { px: 76 });
    if (t >= T.five30a) typed(g, t, [{ s: 'x = 5', at: T.five30a, dur: 0.3 }], 120, 355, { px: 56 });
    if (t >= T.tf30a) typed(g, t, [{ s: '25 ', at: T.tf30a }, { s: '− ', at: T.minus30a }, { s: '25 ', at: T.tf30b }, { s: '= 0', at: T.zero30a - 0.15, dur: 0.3 }], 120, 440, { px: 56 });
    if (t >= T.five30b) typed(g, t, [{ s: '5 ', at: T.five30b }, { s: '− ', at: T.minus30b }, { s: '5 ', at: T.five30c }, { s: '= 0', at: T.zero30b, dur: 0.3 }], 120, 520, { px: 56 });
    const kf = prog(t, T.zero30c, T.zero30d + 0.1);
    if (kf > 0) { frac(g, '0', '0', 690, 470, { px: 110, k: kf }); text(g, '= ?', 770, 500, { font: `900 96px ${AR}`, k: prog(t, T.again30, T.again30 + 0.4) }); }
    card(g, 'NO VALUE', 1190, 740, { size: 56, mono: false, wt: 800, k: prog(t, T.no31, T.no31 + 0.3) });
    secTag(g, "Where it's heading", { k: prog(t, this.START + 0.4, this.START + 0.8), t });
    actTitle(g, t, this.START, 'ACT THREE', 'The hole');
    mascots(g, t, [{ pose: 'ponder', a: T.zero30c - 0.3, b: 999 }]);
  }
}
