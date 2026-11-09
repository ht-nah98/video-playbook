// b12 · Every point at once (câu p2 47–49) — G3. VIEWS.bowl; sau "three" camera lùi (WIDE) để thấy x = 3.
// câu 47: một điểm trượt tới "any point x", dây đo (x, x + h) + thẻ "2x + h"; "shrink": h co lại; "left with two x": bút gạch "+ h", thẻ "2x";
//   dây khép thành SÀO. câu 48: sào quét cả chén ("every point at once"), rồi đứng ở x = 1 (dốc 2), x = 3 (dốc 6), x = 0 (nằm ngang, pose-ok).
// câu 49: thẻ "DERIVATIVE" + "x² → 2x"; sào quét chậm lần nữa.
import { C, AR, H, smooth, clamp, lerp, ground, hill, mound, secant, rod, spot, card, secTag, figure, pen, measureMath, view, VIEWS, lerpView, prog, lookup, D2X, fmt, outCubic } from '../kit.js';

const WIDE = view(0, 0, 900, 960, 190, 80);   // x = 3 ở (1470, 240), x = ±3 vẫn trong khung

export default class EveryPoint {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer', 'ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b12');
    this.START = L(47).start;
    this.FROM = +Math.max(this.START - 1.2, L(46).end + 0.5).toFixed(3);
    this.END = L(49).end;
    this.T = {
      any: w(47, 'any'), plus: w(47, 'plus'), two1: w(47, 'two', 1), shrink: w(47, 'shrink'), left: w(47, 'left'),
      l48: L(48).start, every: w(48, 'every'), once: w(48, 'once'), one: w(48, 'one'), three: w(48, 'three'), six: w(48, 'six'),
      bottom: w(48, 'bottom'), zero: w(48, 'zero', 1), flat: w(48, 'flat'), e48: L(48).end,
      l49: L(49).start, deriv1: w(49, 'derivative', 1), every49: w(49, 'every'), called: w(49, 'called'), deriv2: w(49, 'derivative', 2), sq49: w(49, 'squared'), two49: w(49, 'two'),
    };
    const T = this.T;
    for (const [a, b] of [['any', 'plus'], ['shrink', 'left'], ['one', 'three'], ['three', 'bottom'], ['deriv2', 'two49']]) if (!(T[a] < T[b])) throw new Error(`b12: mốc ${a} ≥ ${b}`);
  }
  sfx() {
    const T = this.T, F = this.FROM, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(F + 0.75, 'snap'), c(T.two1, 'card'), c(T.shrink + (T.left - T.shrink) * 0.62, 'pen'), c(T.left + 0.15, 'correct'),
      c(T.one, 'tick'), c(T.zero, 'tick'), c(T.flat, 'pen'), c(T.deriv1, 'card'), c(T.two49 + 0.2, 'shimmer')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'field', t, { pan: 300 });
    const ck = prog(t, T.three - 0.6, T.three + 0.4), V = lerpView(VIEWS.bowl, WIDE, ck);
    hill(g, V, { a: -14, b: 14, t });
    mound(g, t, 1);
    secTag(g, 'Every point at once', { k: prog(t, F + 0.2, F + 0.6), t });

    // ── vị trí điểm / sào ──
    const xa = lerp(-1.3, -1.15, prog(t, F, T.any)), x1 = lerp(xa, 1, smooth(prog(t, T.any, T.plus + 0.2)));
    const sweep = prog(t, T.every - 0.1, T.once + 0.4), sweep2 = prog(t, T.every49 - 0.2, T.deriv2 + 0.9);
    const e1 = smooth(prog(t, T.three - 0.2, T.three + 0.9)), e2 = smooth(prog(t, T.bottom - 0.1, T.bottom + 1.3));
    const xr = 1 - 2.4 * Math.sin(Math.PI * sweep) + 2 * e1 - 3 * e2 + 1.6 * Math.sin(2 * Math.PI * sweep2);
    const rodOn = t >= T.left, xs = rodOn ? xr : x1, P = [V.X(xs), V.Y(xs * xs)];

    // ── câu 47: dây đo (x, x + h) → h co → sào ──
    const h = 0.7 - 0.67 * smooth(prog(t, T.shrink, T.left)), sLift = prog(t, T.left, T.left + 0.6);
    if (sLift < 1) secant(g, V, x1, x1 + h, { k: prog(t, F + 0.55, F + 1.05), poleK: prog(t, F + 0.5, F + 0.9), ext: 0.4, ext0: 0.25, lift: sLift, a: clamp(1 - sLift * 2) });
    if (rodOn) rod(g, V, xr, { d0: -0.55, d1: lerp(0.7, 0.3, ck), k: prog(t, T.left, T.left + 0.5), hover: 90, lift: 0 });
    spot(g, P[0], P[1], { k: prog(t, F + 0.3, F + 0.7) });
    const lx = prog(t, T.l48, T.l48 + 0.4);
    if (lx < 1) card(g, 'x', P[0], P[1] - 112, { size: 44, isMath: true, mono: false, color: C.poleInk, edge: C.pole, k: prog(t, T.any, T.any + 0.3), lift: lx });

    // ── thẻ công thức (câu 47) ──
    const mid = T.shrink + (T.left - T.shrink) * 0.62, k1 = prog(t, T.two1, T.two1 + 0.3), l1 = prog(t, T.left + 0.05, T.left + 0.5);
    const box = card(g, '2x + h', 900, 330, { size: 64, isMath: true, mono: false, color: C.secInk, edge: C.sec, k: k1, lift: l1 });
    if (k1 >= 1 && l1 <= 0) { const tw = measureMath(g, '2x + h', 64), left = 904 - tw / 2, x0 = left + measureMath(g, '2x ', 64);
      pen(g, x0 - 4, 345, left + tw + 6, 318, prog(t, mid, mid + 0.3), { w: 7 }); }
    const l2 = prog(t, T.l48, T.l48 + 0.45);
    card(g, '2x', 900, 330, { size: 84, isMath: true, mono: false, color: C.poleInk, edge: C.pole, k: prog(t, T.left + 0.4, T.left + 0.7), lift: l2 });

    // ── câu 48: thẻ đọc số ──
    const st = [[1, T.one, T.three], [3, T.three, T.zero], [0, T.zero, T.e48 + 0.4]];
    for (const [x, a, b] of st) {
      if (t < a) continue;
      const lf = b > t ? 0 : prog(t, b, b + 0.4);
      const bx = card(g, `x = ${x} → slope ${fmt(D2X[x])}`, 900, 230, { size: 48, isMath: true, mono: false, color: C.poleInk, edge: C.pole, k: prog(t, a, a + 0.3), lift: lf });
      if (x === 0 && lf <= 0) pen(g, bx.x + 40, bx.y + bx.h + 12, bx.x + bx.w - 30, bx.y + bx.h + 12, prog(t, T.flat, T.flat + 0.35), { w: 6 });
    }

    // ── câu 49: DERIVATIVE + x² → 2x ──
    card(g, 'DERIVATIVE', 1030, 190, { size: 52, mono: false, wt: 900, color: C.poleInk, edge: C.pole, k: prog(t, T.deriv1, T.deriv1 + 0.3), rot: -0.02 });
    card(g, 'x² → 2x', 940, 345, { size: 84, isMath: true, mono: false, color: C.poleInk, edge: C.pole, k: prog(t, T.deriv2, T.deriv2 + 0.3) });

    // ── mascot: pointer (câu 47) → ok ("zero… perfectly flat") ──
    const pOut = prog(t, T.bottom - 0.5, T.bottom - 0.1), pIn = prog(t, F + 0.5, F + 1.1);
    if (pOut < 1) { g.save(); g.translate(0, outCubic(pOut) * 300); figure(g, 'pointer', 205, H, 262, pIn, { t }); g.restore(); }
    const oIn = prog(t, T.bottom - 0.1, T.bottom + 0.4), oOut = prog(t, T.e48 + 0.1, T.e48 + 0.6);
    if (oIn > 0 && oOut < 1) { g.save(); g.translate(0, outCubic(oOut) * 300); figure(g, 'ok', 205, H, 262, oIn, { t }); g.restore(); }
  }
}
