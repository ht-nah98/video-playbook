// b02 · The secant · câu p2 4–7 · G1. Mở giống HỆT khung cuối b01 (chén, người đi bộ, (1, 1), sào lơ lửng + ?) để thước dây không
// nhảy; ở "handle a single point" sào nhấc đi. Cọc thứ hai rơi xuống (2, 4) ở "two", dây đo xanh căng ở "join", thẻ SECANT ở "secant";
// tam giác navy RISE = 3 / RUN = 1 như a0; thẻ "slope = 3" xanh ở "slope".
import { C, prog, lookup, must, ground, hill, secant, spot, rod, card, secTag, VIEWS } from '../kit.js';
import { mascotAt, walker, qMark, triangle, scaled, nudge } from './g1-common.js';

export default class Secant {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b02');
    this.T = {
      handle: w(4, 'handle'), take: w(4, 'take'), two: w(4, 'two', 1), four: w(4, 'four'),
      join: w(5, 'join'), line: w(5, 'line', 1), cuts: w(5, 'cuts'), secant: w(5, 'secant'),
      one6: w(6, 'one', 1), two6: w(6, 'two', 1), rise: w(6, 'rise'), three6: w(6, 'three'), run: w(6, 'run'), one6c: w(6, 'one', 3),
      three7: w(7, 'three', 1), slope7: w(7, 'slope'), end: L(7).end,
    };
    this.START = L(4).start;
    this.FROM = Math.max(this.START - 1.2, L(3).end + 0.5);
    this.SEC = 3;                                           // dốc cát tuyến (rise ÷ run), kiểm trong render ở trạng thái xong
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.handle - 0.2, 'pop'), c(T.two + 0.1, 'wood'), c(T.join + 0.45, 'snap'), c(T.cuts, 'tick'), c(T.secant, 'card'),
      c(T.one6, 'tick'), c(T.rise, 'pen'), c(T.run, 'tick'), c(T.slope7, 'card')];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.bowl, P = [V.X(1), V.Y(1)], Q = [V.X(2), V.Y(4)];
    ground(g, 'field', t);
    hill(g, V, { a: -3, b: 3.6, t });

    // dây đo + cọc thứ hai: cọc rơi xuống ở "two"; dây căng từ (1, 1) ra tới cọc ở "join"
    secant(g, V, 1, 2, { k: prog(t, T.join, T.join + 0.5), poleK: prog(t, T.take + 0.1, T.two + 0.25), ext: 0.3, ext0: 0.1, w: 6 });
    const flash = Math.sin(Math.PI * prog(t, T.cuts, T.cuts + 0.5));                        // "cuts through": dây lóe
    if (flash > 0) { g.save(); g.globalAlpha = 0.55 * flash; secant(g, V, 1, 2, { poles: false, ext: 0.3, ext0: 0.1, w: 14 }); g.restore(); }

    // tam giác navy: RUN rồi RISE (như a0)
    const lift = 0;
    triangle(g, V, 2, {
      kRun: prog(t, T.run, T.run + 0.4), kRise: prog(t, T.rise, T.rise + 0.45), lift,
      riseTxt: t >= T.rise ? (t >= T.three6 ? 'RISE = 3' : 'RISE') : null, runTxt: t >= T.run ? (t >= T.one6c ? 'RUN = 1' : 'RUN') : null,
      riseK: t >= T.three6 ? 1 : prog(t, T.rise, T.rise + 0.3), runK: t >= T.one6c ? 1 : prog(t, T.run, T.run + 0.3),
    });

    spot(g, P[0], P[1], { k: 1, pulse: prog(t, T.one6, T.one6 + 0.5) });
    walker(g, V, 1, 1.3);

    // sào lơ lửng + ? (như cuối b01) nhấc đi ở "handle a single point"
    const rl = prog(t, T.handle - 0.2, T.handle + 0.6);
    if (rl < 1) rod(g, V, 1, { d0: -0.5, d1: 0.6, k: 0.1 + 0.012 * Math.sin(t * 3), hover: 230, lift: rl });
    qMark(g, t, 1, rl);

    // thẻ
    card(g, 'y = x²', 560, 330, { size: 60, isMath: true, mono: false, color: C.curveInk, edge: C.curve, k: 1 - prog(t, T.handle, T.handle + 0.5) });
    card(g, '(1, 1)', 1385, 905, { size: 44, color: C.poleInk, edge: C.pole, k: 1 });
    if (t >= T.two + 0.3) scaled(g, Q[0] - 175, Q[1] + 85, nudge(t, T.two6), () => card(g, '(2, 4)', Q[0] - 175, Q[1] + 85, { size: 44, edge: C.sec, k: prog(t, T.two + 0.3, T.four + 0.2) }));
    card(g, 'SECANT', 1010, 380, { size: 56, mono: false, wt: 800, color: C.secInk, edge: C.sec, k: prog(t, T.secant, T.secant + 0.3) });
    card(g, 'slope = 3', 1010, 490, { size: 52, mono: false, wt: 800, color: C.secInk, edge: C.sec, k: prog(t, T.slope7, T.slope7 + 0.3) });
    if (t >= T.slope7 + 0.3) must(`(${4} - ${1}) / (${2} - ${1})`, this.SEC);
    mascotAt(g, t, 'pointer', 0, T.handle + 3.2);
    secTag(g, 'The secant', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
