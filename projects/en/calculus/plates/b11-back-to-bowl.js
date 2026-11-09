// b11 ★ · Back to the bowl (ACT FOUR — The derivative; câu 41–46, G2). Từ đường mòn về lại cái chén (VIEWS.bowl, đồi trồi lên dưới thẻ hồi),
// camera lùi → VIEWS.zoom ở "call the gap". Khoảng h giữa hai cọc = thước dây vàng; đại số rise = (1 + h)² − 1 → = 2h + h² → slope = (2h + h²) / h → = 2 + h
// ghi từng mảnh theo lời; h = 0.1 → 2.1, h = 0.01 → 2.01 (STEPS); "never set h to zero" (halt) → h co mà không chạm 0; sào hạ xuống ở (1, 1) — kết ở VIEWS.zoom.
import { H, C, AR, prog, lookup, must, outCubic, lerp, ground, hill, secant, rod, spot, hiker, card, secTag, actTitle, line, pen, VIEWS, lerpView, STEPS, sq, touchesOnce, fmt } from '../kit.js';
import { lifted, track, typed, tapeBar, mascots } from './g2-util.js';

export default class BackToBowl {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer', 'halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b11');
    this.T = {
      slope41: w(41, 'slope'), stuck41: w(41, 'stuck'), anymore41: w(41, 'anymore'),
      call42: w(42, 'call'), gap42: w(42, 'gap'), h42a: w(42, 'h', 1), second42: w(42, 'second'), point42: w(42, 'point'), plus42: w(42, 'plus'),
      rise43: w(43, 'rise'), one43a: w(43, 'one', 1), plus43a: w(43, 'plus', 1), h43a: w(43, 'h', 1), minus43: w(43, 'minus'), one43b: w(43, 'one', 2),
      multiply43: w(43, 'multiply'), two43: w(43, 'two'), h43b: w(43, 'h', 2), plus43b: w(43, 'plus', 2), h43c: w(43, 'h', 3),
      divide44: w(44, 'divide'), by44: w(44, 'by'), run44: w(44, 'run'), simply44: w(44, 'simply'), two44: w(44, 'two'), plus44: w(44, 'plus'), h44b: w(44, 'h', 2),
      check45: w(45, 'check'), when45a: w(45, 'when', 1), tenth45: w(45, 'tenth'), when45b: w(45, 'when', 2), hundredth45: w(45, 'hundredth'),
      never46: w(46, 'never'), shrink46: w(46, 'shrink'), two46a: w(46, 'two', 1), plus46: w(46, 'plus'), h46b: w(46, 'h', 2), heads46: w(46, 'heads'), two46b: w(46, 'two', 2),
      end: L(46).end,
    };
    this.START = L(41).start; this.FROM = Math.max(this.START - 2.6, L(40).end + 0.5);
    must('1.1 ** 2 - 1', 0.21);
    must(`${STEPS[2].run}`, 0.1); must(`${STEPS[3].run}`, 0.01); must(`${STEPS[2].slope}`, 2.1); must(`${STEPS[3].slope}`, 2.01);
    touchesOnce(1);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.slope41, 'card'), c(T.h42a, 'card'), c(T.rise43, 'pen'), c(T.multiply43, 'tick'), c(T.divide44, 'pen'), c(T.simply44, 'tick'),
      c(T.when45a, 'card'), c(T.hundredth45, 'tick'), c(T.shrink46, 'card'), c(T.two46b - 0.12, 'snap'),
    ];
  }
  cam(t) { const T = this.T; return lerpView(VIEWS.bowl, VIEWS.zoom, prog(t, T.call42, T.h42a + 0.5)); }
  render(g, t) {
    const T = this.T, V = this.cam(t), P = [V.X(1), V.Y(1)];
    ground(g, 'field', t, { pan: (VIEWS.bowl.X(0) - V.X(0)) * 0.1 + 200 });
    hill(g, V, { a: -3, b: 3.6, t, rise: prog(t, this.FROM + 0.1, this.FROM + 1.6) });

    // h giữa hai cọc: 0.35 (tổng quát) → 0.1 → 0.01 → 0.0015 (không bao giờ bằng 0)
    const h = track([[T.second42, 0.35], [T.tenth45 - 0.5, 0.35], [T.tenth45 + 0.2, 0.1], [T.hundredth45 - 0.4, 0.1], [T.hundredth45 + 0.3, 0.01], [T.shrink46, 0.01], [T.shrink46 + 1.5, 0.0015]], t), x2 = 1 + h;
    const Q = [V.X(x2), V.Y(sq(x2))];
    const kRod = prog(t, T.two46b - 1.2, T.two46b + 0.05);
    if (kRod > 0) rod(g, V, 1, { d0: -0.55, d1: 0.7, k: kRod, hover: 130 });
    if (t >= T.second42) {
      secant(g, V, 1, x2, { k: prog(t, T.point42, T.point42 + 0.35), poleK: prog(t, T.second42, T.second42 + 0.35), ext: 0.3, ext0: 0.03 });
      const kt = prog(t, T.gap42, T.gap42 + 0.4); if (kt > 0 && t >= T.point42) tapeBar(g, P[0], Q[0], P[1], { k: kt });
      const kr = prog(t, T.rise43, T.rise43 + 0.5); if (kr > 0) line(g, Q[0], P[1], Q[0], P[1] + (Q[1] - P[1]) * outCubic(kr), C.ink, 6);
    }
    spot(g, P[0], P[1], { k: prog(t, T.slope41 - 0.3, T.slope41), pulse: prog(t, T.stuck41, T.stuck41 + 0.4) });
    const hw = prog(t, T.call42, T.h42a + 0.5), hu = lerp(1, 0.78, hw), hs = lerp(0.95, 1.3, outCubic(hw));
    hiker(g, V.X(hu) - 6 * hs, V.Y(sq(hu)) - 6, hs);

    // 0 ÷ 0 bị gạch → "stuck anymore"
    const lc = prog(t, T.anymore41 + 0.2, T.anymore41 + 0.8);
    if (t >= T.slope41 && lc < 1) {
      const b = card(g, '0 ÷ 0', 330, 300, { size: 64, mono: false, wt: 900, color: C.dim, k: prog(t, T.slope41, T.slope41 + 0.3), lift: lc });
      const ks = prog(t, T.stuck41, T.stuck41 + 0.3);
      lifted(g, lc, () => pen(g, b.x - 8, b.y + b.h * 0.6, b.x + b.w + 8, b.y + b.h * 0.4, ks, { w: 7 }));
    }
    // nhãn h và 1 + h
    const l12 = prog(t, T.check45 - 0.3, T.check45 + 0.4);
    card(g, 'h', (P[0] + Q[0]) / 2, P[1] + 72, { size: 44, isMath: true, mono: false, k: prog(t, T.h42a, T.h42a + 0.3) });
    card(g, '1 + h', Q[0], Q[1] - 175, { size: 44, isMath: true, mono: false, color: C.secInk, edge: C.sec, k: prog(t, T.plus42, T.plus42 + 0.3), lift: l12 });
    // đại số
    const l34 = prog(t, T.never46 - 0.5, T.never46 + 0.1);
    lifted(g, l12, () => {
      typed(g, t, [{ s: 'rise = ', at: T.rise43 }, { s: '(1 ', at: T.one43a, dur: 0.2 }, { s: '+ ', at: T.plus43a, dur: 0.15 }, { s: 'h)² ', at: T.h43a }, { s: '− ', at: T.minus43, dur: 0.15 }, { s: '1', at: T.one43b, dur: 0.15 }], 120, 215, { px: 52 });
      typed(g, t, [{ s: '= ', at: T.multiply43 + 0.25, dur: 0.2 }, { s: '2', at: T.two43, dur: 0.15 }, { s: 'h ', at: T.h43b, dur: 0.15 }, { s: '+ ', at: T.plus43b, dur: 0.15 }, { s: 'h²', at: T.h43c, dur: 0.25 }], 120, 288, { px: 52 });
    });
    lifted(g, l34, () => {
      typed(g, t, [{ s: 'slope = ', at: T.divide44, dur: 0.25 }, { s: '(2h + h²) ', at: T.divide44 + 0.2, dur: 0.35 }, { s: '/ ', at: T.by44, dur: 0.15 }, { s: 'h', at: T.run44, dur: 0.15 }], 120, 365, { px: 52, color: C.secInk });
      typed(g, t, [{ s: '= ', at: T.simply44, dur: 0.2 }, { s: '2 ', at: T.two44, dur: 0.15 }, { s: '+ ', at: T.plus44, dur: 0.15 }, { s: 'h', at: T.h44b, dur: 0.15 }], 120, 440, { px: 52, color: C.secInk });
    });
    card(g, `h = ${STEPS[2].run} → ${STEPS[2].slope}`, 500, 540, { size: 44, isMath: true, mono: false, color: C.secInk, edge: C.sec, k: prog(t, T.when45a, T.when45a + 0.3), lift: l34 });
    card(g, `h = ${STEPS[3].run} → ${STEPS[3].slope}`, 520, 622, { size: 44, isMath: true, mono: false, color: C.secInk, edge: C.sec, k: prog(t, T.when45b, T.when45b + 0.3), lift: l34 });
    // kết: h → 0, 2 + h → 2
    card(g, 'h → 0', 330, 500, { size: 56, isMath: true, mono: false, k: prog(t, T.shrink46, T.shrink46 + 0.3) });
    typed(g, t, [{ s: '2 ', at: T.two46a, dur: 0.15 }, { s: '+ ', at: T.plus46, dur: 0.12 }, { s: 'h ', at: T.h46b - 0.05, dur: 0.15 }, { s: '→ ', at: T.heads46 + 0.1, dur: 0.15 }, { s: '2', at: T.two46b - 0.35, dur: 0.3, color: C.poleInk }], 120, 340, { px: 84, wt: 900 });
    if (t > T.two46b + 0.4) must(`${STEPS[3].slope} - 2`, +fmt(+STEPS[3].run));
    secTag(g, 'Back to the bowl', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
    actTitle(g, t, this.START, 'ACT FOUR', 'The derivative');
    mascots(g, t, [{ pose: 'pointer', a: -99, b: T.rise43 }, { pose: 'halt', a: T.never46 - 0.25, b: T.shrink46 - 0.4 }, { pose: 'pointer', a: T.shrink46 - 0.1, b: 999 }]);
  }
}
