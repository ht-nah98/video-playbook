// b21 ★ · Putting it together (ACT SEVEN; câu p2 80–82) — ERA field. Ba thẻ lời hứa ①②③ vẽ lại ĐÚNG kit.promiseCard (cùng PROMISE.xs, base,
// hình trên trang như a0 S2), mỗi thẻ rơi đúng lúc lời nói tới và thêm MỘT thẻ giấy trả lời bên dưới.
// câu 80 → ①: thẻ dốc + sào; ở "shorter and shorter secants" một dây xanh xoay khép vào sào (cát tuyến co lại); trả lời "NEVER AT THE POINT".
// câu 81 → ②: 0/0 + đường thủng một lỗ; "around it" hai chấm lần tới lỗ (ap); trả lời "IGNORE THE HOLE".
// câu 82 → ③: đồng xu hai mặt lật ở "sides" / "cuts" / "adds"; trả lời "CUT, THEN ADD BACK".
import { H, C, AR, clamp, lerp, prog, lookup, must, outCubic, ground, card, text, line, view, secTag, actTitle, figure, promiseCard, PROMISE,
  PROMISE_CAP, tanAt, sq, secSlope } from '../kit.js';

const ANS = [['NEVER AT THE POINT', C.pole], ['IGNORE THE HOLE', C.ink], ['CUT, THEN ADD BACK', C.soil]];

export default class Together {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b21');
    this.T = {
      point: w(80, 'point', 1), steep: w(80, 'steepness'), never: w(80, 'never'), measure: w(80, 'measure'), slopes: w(80, 'slopes'),
      shorter1: w(80, 'shorter', 1), shorter2: w(80, 'shorter', 2), secants: w(80, 'secants'), heading1: w(80, 'heading'),
      where: w(81, 'where'), limit: w(81, 'limit'), hole: w(81, 'hole'), zero1: w(81, 'zero', 1), around: w(81, 'around'), it81: w(81, 'it', 2),
      deriv: w(82, 'derivatives'), integ: w(82, 'integrals'), two: w(82, 'two'), sides: w(82, 'sides'), idea: w(82, 'idea'),
      cuts: w(82, 'cuts'), instants1: w(82, 'instants', 1), adds: w(82, 'adds'), whole: w(82, 'whole'),
    };
    this.START = L(80).start; this.END = L(82).end;
    this.FROM = Math.max(this.START - 2.6, tl.lines[79 - 0].end + 0.5);   // KẾT = end câu 79 (b20)
    must(`${secSlope(1, 1.001)} > 2`, true);
  }
  sfx() {
    const T = this.T, S = this.START, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(S + 0.35, 'card'), c(T.never, 'pen'), c(T.secants, 'snap'), c(T.limit, 'card'), c(T.hole, 'pen'), c(T.deriv, 'card'), c(T.cuts, 'coin'), c(T.adds, 'coin')];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'field', t, { pan: 900 });
    actTitle(g, t, S, 'ACT SEVEN', 'Putting it together');
    secTag(g, 'Putting it together', { k: prog(t, S + 0.4, S + 0.8), t });

    const start = [S + 0.35, T.limit - 0.2, T.deriv - 0.1];           // lúc ba thẻ rơi
    const kp = [prog(t, T.steep, T.steep + 0.6), prog(t, T.limit + 0.1, T.limit + 0.7), prog(t, T.sides, T.sides + 0.6)];
    const cap = [prog(t, T.steep, T.steep + 0.3), prog(t, T.limit, T.limit + 0.3), prog(t, T.sides - 0.1, T.sides + 0.3)];
    const flip = prog(t, T.sides, T.sides + 0.5) + prog(t, T.cuts - 0.1, T.cuts + 0.5) + prog(t, T.adds - 0.1, T.adds + 0.5);
    const ap = prog(t, T.around - 0.1, T.it81 + 0.3);
    [0, 1, 2].forEach(i => {
      const k = prog(t, start[i], start[i] + 0.6);
      promiseCard(g, i, { k, kp: kp[i], cap: cap[i], flip: i === 2 ? flip : 0, ap: i === 1 ? ap : 0 });
    });

    // ① dây xanh co lại về sào: cát tuyến qua (0.6, 0.36) với điểm thứ hai tiến về điểm đó
    const ks = prog(t, T.shorter1, T.secants + 0.5);
    if (ks > 0 && kp[0] >= 1) {
      const { xs, base, h } = PROMISE, cx = xs[0], fy = base - h, V = view(0.5, 0.5, cx + 6, fy + h * 0.56, 150 * 1.25, 150 * 1.25), x0 = 0.6;
      const d = lerp(0.7, 0.06, outCubic(prog(t, T.shorter1, T.heading1))), m = secSlope(x0, x0 + d), a = 1 - prog(t, T.heading1, T.heading1 + 0.4) * 0.0;
      g.save(); g.globalAlpha = a * clamp(ks * 3); g.beginPath(); g.rect(cx - 170, fy + 8, 340, h - 16); g.clip();
      line(g, V.X(x0 - 0.45), V.Y(sq(x0) + m * -0.45), V.X(x0 + 0.5), V.Y(sq(x0) + m * 0.5), C.sec, 6); g.restore();
    }
    // trả lời: thẻ giấy dưới chú thích
    const AT = [T.never, T.hole, T.instants1];
    ANS.forEach(([s, col], i) => card(g, s, PROMISE.xs[i], 905, { size: 30, mono: false, wt: 800, edge: col, k: prog(t, AT[i], AT[i] + 0.3) }));

    // ── mascot: pointer quanh câu 80 ──
    const kIn = prog(t, T.point, T.point + 0.5), kOut = prog(t, T.heading1 + 0.4, T.heading1 + 0.9);
    if (kIn > 0 && kOut < 1) figure(g, 'pointer', 205, H, 262, Math.min(kIn, 1 - kOut), { t });
  }
}
