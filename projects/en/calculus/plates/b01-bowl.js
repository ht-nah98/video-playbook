// b01 · A bowl (ACT ONE — Two points) · câu p2 0–3 · G1. Mở từ kit.bare() (= khung cuối p1), thẻ hồi ACT ONE, rồi cái chén vẽ dần
// theo "comes down / flattens out / climbs again": nét lục phác trước (curve), đất đổ theo sau. Người đi bộ leo vào ở "walker", điểm
// sáng (1, 1) bật ở "x", thẻ (1, 1) ở "one, one"; "How steep… right here?" → sào lơ lửng chưa hạ + dấu ?. Mascot pointer từ câu 3.
import { H, C, AR, lerp, prog, lookup, outCubic, bare, ground, hill, plot, spot, rod, card, secTag, actTitle, VIEWS } from '../kit.js';
import { mascotAt, walker, qMark, pw } from './g1-common.js';

export default class Bowl {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');
    this.T = {
      curve: w(0, 'curve'), y: w(0, 'y'),
      bowl: w(1, 'bowl'), comes: w(1, 'comes'), bottom: w(1, 'bottom'), climbs: w(1, 'climbs'), again: w(1, 'again'),
      walker: w(2, 'walker'), x: w(2, 'x'), one4: w(2, 'one', 4),
      l3: L(3).start, steep: w(3, 'steep'), right: w(3, 'right'), here: w(3, 'here'),
    };
    this.START = L(0).start;
    this.FROM = -3.0;
  }
  sfx() {
    const T = this.T, S = this.START, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.curve + 0.5, 'pen'), c(T.y, 'card'), c(T.bowl, 'pen'), c(T.bottom, 'tick'), c(T.walker + 0.75, 'wood'),
      c(T.x, 'pop'), c(T.one4, 'card'), c(T.right, 'question')];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.bowl;
    if (t <= this.START - 2.45) { bare(g, t); return; }            // khung nối p1 → p2: ĐÚNG bare, không vật nào khác
    ground(g, 'field', t);
    // nét phác lục (đường cong) chạy trước, đất đổ theo sau
    plot(g, V, u => u * u, -3, 3.6, { color: C.curve, w: 6, k: prog(t, this.START + 0.5, T.bowl), dash: [16, 12] });
    const kHill = pw(t, [[T.bowl, 0], [T.comes, 0.2], [T.bottom, 0.4545], [T.climbs, 0.5], [T.again + 0.5, 1]]);
    if (kHill > 0) hill(g, V, { a: -3, b: 3.6, rise: kHill, t });

    // người đi bộ leo lên (1, 1) bên phải, đứng lại; điểm sáng bật ở "x"
    const wk = prog(t, T.walker, T.x - 0.2), u = lerp(0.2, 1, outCubic(wk));
    spot(g, V.X(1), V.Y(1), { k: prog(t, T.x, T.x + 0.3), pulse: prog(t, T.one4, T.one4 + 0.4) });
    if (t >= T.walker) walker(g, V, u, 1.3, { step: wk > 0 && wk < 1 ? t * 1.8 : 0 });

    // sào lơ lửng chưa hạ (dấu ?): trượt vào từ phía trời ở "steep", bập bềnh
    const lift = 1 - prog(t, T.steep, T.steep + 0.8);
    if (lift < 1) rod(g, V, 1, { d0: -0.5, d1: 0.6, k: 0.1 + 0.012 * Math.sin(t * 3), hover: 230, lift });
    qMark(g, t, prog(t, T.right, T.right + 0.3));

    // chữ: thẻ y = x² (ở "y"), thẻ (1, 1) (ở "one, one")
    card(g, 'y = x²', 560, 330, { size: 60, isMath: true, mono: false, color: C.curveInk, edge: C.curve, k: prog(t, T.y, T.y + 0.35) });
    card(g, '(1, 1)', 1385, 905, { size: 44, color: C.poleInk, edge: C.pole, k: prog(t, T.one4, T.one4 + 0.3) });
    mascotAt(g, t, 'pointer', T.l3 - 0.3, 99);
    actTitle(g, t, this.START, 'ACT ONE', 'Two points');
    secTag(g, 'A bowl', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
