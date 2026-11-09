// b03 · An average · câu p2 8–11 · G1. Mở như cuối b02 (dây, cọc (2, 4), tam giác, SECANT, slope = 3); "isn't our answer" → bút navy gạch
// "slope = 3"; "average" → thẻ AVERAGE; "whole stretch" → đoạn 1…2 trên sườn đánh dấu navy; "getting steeper" → sào nhỏ trượt dọc đoạn;
// "steep part, far up" → nửa trên đoạn đậm + thẻ STEEP PART; "shorter stretch" → đoạn co lại.
import { C, prog, lookup, outCubic, ground, hill, plot, secant, spot, rod, card, pen, secTag, VIEWS } from '../kit.js';
import { mascotAt, walker, triangle } from './g1-common.js';

export default class Average {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b03');
    this.T = {
      but: w(8, 'but'), isnt: w(8, "isn't"), average: w(9, 'average'), whole: w(9, 'whole'), curve: w(9, 'curve'), steeper: w(9, 'steeper'),
      steep: w(10, 'steep'), mixed: w(10, 'mixed'), rid: w(11, 'rid'), shorter: w(11, 'shorter'), end: L(11).end,
    };
    this.START = L(8).start;
    this.FROM = Math.max(this.START - 1.2, L(7).end + 0.5);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.isnt, 'pen'), c(T.average, 'card'), c(T.whole, 'pen'), c(T.curve, 'tick'), c(T.steep + 0.3, 'pop'), c(T.shorter, 'tick')];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.bowl, P = [V.X(1), V.Y(1)];
    ground(g, 'field', t);
    hill(g, V, { a: -3, b: 3.6, t });
    // đoạn 1…2 đánh dấu navy (nửa trên đậm hơn); co lại ở "shorter"
    const shrink = outCubic(prog(t, T.shorter, T.shorter + 0.8)), end = 2 - 0.6 * shrink;
    plot(g, V, u => u * u, 1, end, { color: C.ink, w: 9, k: prog(t, T.whole, T.whole + 0.9) });
    const up = prog(t, T.steep, T.steep + 0.7) * (1 - prog(t, T.rid, T.rid + 0.4));
    if (up > 0) plot(g, V, u => u * u, 1.5, 2, { color: C.ink, w: 18, k: up });
    // dây + cọc (2, 4)
    secant(g, V, 1, 2, { ext: 0.3, ext0: 0.1, w: 6 });
    triangle(g, V, 2, { lift: prog(t, T.but + 0.1, T.but + 0.8), riseTxt: 'RISE = 3', runTxt: 'RUN = 1' });
    // sào nhỏ trượt dọc đoạn: dốc tăng dần
    const xr = 1 + 1 * outCubic(prog(t, T.curve, T.steeper + 0.4)), rl = 1 - prog(t, T.curve - 0.2, T.curve + 0.2) + prog(t, T.steep, T.steep + 0.5);
    if (rl < 1) rod(g, V, xr, { d0: -0.14, d1: 0.14, k: 1, w: 14, lift: rl });
    spot(g, P[0], P[1], { k: 1 });
    walker(g, V, 1, 1.3);
    card(g, '(1, 1)', 1385, 905, { size: 44, color: C.poleInk, edge: C.pole });
    card(g, 'SECANT', 1010, 380, { size: 56, mono: false, wt: 800, color: C.secInk, edge: C.sec });
    // slope = 3 bị gạch rồi bay đi; AVERAGE thế chỗ
    const sl = prog(t, T.average - 0.15, T.average + 0.3);
    if (sl < 1) { const b = card(g, 'slope = 3', 1010, 490, { size: 52, mono: false, wt: 800, color: C.secInk, edge: C.sec, lift: sl });
      if (sl <= 0) pen(g, b.x - 8, b.y + b.h * 0.7, b.x + b.w + 8, b.y + b.h * 0.3, prog(t, T.isnt, T.isnt + 0.35), { w: 8 }); }
    const al = prog(t, T.rid, T.rid + 0.5);
    card(g, 'AVERAGE', 1010, 490, { size: 56, mono: false, wt: 800, k: prog(t, T.average, T.average + 0.3), lift: al });
    card(g, 'STEEP PART', 1640, 470, { size: 40, mono: false, wt: 800, k: prog(t, T.steep, T.steep + 0.3), lift: prog(t, T.shorter - 0.2, T.shorter + 0.3) });
    card(g, 'SHORTER', 1010, 490, { size: 56, mono: false, wt: 800, k: prog(t, T.shorter, T.shorter + 0.3) });
    mascotAt(g, t, 'pointer', this.START + 0.6, T.average + 6);
    secTag(g, 'An average', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
