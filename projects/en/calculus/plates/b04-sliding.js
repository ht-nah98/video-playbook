// b04 · Sliding in (ACT TWO — Closer and closer) ★ · câu p2 12–16 · G1. Thẻ hồi ACT TWO; camera bowl → zoom ở "slide"; cọc thứ hai
// dời 2 → 1.5 → 1.1 → 1.01 → 1.001 mỗi câu; sổ BOOK ghi từng ô đúng chữ được đọc (x, y, rise, run, slope); 1.01 / 1.001 soi kính lúp.
import { C, prog, lookup, must, outCubic, ground, hill, secant, spot, card, secTag, actTitle, ledger, lerpView, lerp, VIEWS, BOOK, STEP_COLS, STEP_ROWS, STEPS } from '../kit.js';
import { mascotAt, walker, zoomLoupe } from './g1-common.js';

export default class Sliding {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b04');
    this.START = L(12).start;
    this.FROM = Math.max(this.START - 2.6, L(11).end + 0.5);
    const T = this.T = {
      slide: w(12, 'slide'), l14: L(14).start, l15: L(15).start, l16: L(16).start,
      // ô sổ của từng hàng (x, y, rise, run, slope): giờ bắt đầu ghi
      rows: [
        [w(13, 'x'), w(13, 'y'), w(13, 'rise'), w(13, 'run'), w(13, 'slope')],
        [w(14, 'at'), w(14, 'y'), w(14, 'rise'), w(14, 'run'), w(14, 'slope')],
        [w(15, 'at'), w(15, 'at') + 0.45, w(15, 'at') + 0.7, w(15, 'at') + 0.95, w(15, 'slope')],
        [w(16, 'at'), w(16, 'at') + 0.45, w(16, 'at') + 0.7, w(16, 'at') + 0.95, w(16, "it's")],
      ],
    };
    T.end = L(16).end;
    this.X2 = [[T.slide, 2], [T.slide + 2.2, 1.5], [T.l14, 1.5], [T.l14 + 0.6, 1.1], [T.l15, 1.1], [T.l15 + 0.6, 1.01], [T.l16, 1.01], [T.l16 + 0.5, 1.001]];
    this.STEP = [1, 1.5, 1.1, 1.01, 1.001];
    must(`'${STEPS[4].slope}'`, '2.001');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.slide, 'tick'), c(T.slide + 2.25, 'wood'), c(T.rows[0][2], 'pen'), c(T.rows[0][4], 'pen'), c(T.l14 + 0.6, 'wood'), c(T.rows[1][2], 'pen'), c(T.rows[1][4], 'tick'), c(T.l15 + 0.6, 'wood'), c(T.l16 + 0.5, 'wood')];
  }
  // x2 của cọc thứ hai theo giờ: dời êm giữa các mốc
  x2(t) {
    const P = this.X2; let x = P[0][1];
    for (let i = 1; i < P.length; i += 2) { const [a, xa] = P[i - 1], [b, xb] = P[i]; if (t >= a) x = lerp(xa, xb, outCubic(prog(t, a, b))); if (t >= b && i + 1 < P.length) x = xb; }
    return x;
  }
  render(g, t) {
    const T = this.T, camK = prog(t, T.slide, T.slide + 2.6), V = lerpView(VIEWS.bowl, VIEWS.zoom, camK);
    ground(g, 'field', t, { pan: (VIEWS.bowl.X(0) - V.X(0)) * 0.1 });
    hill(g, V, { a: -1.2 - 1.8 * (1 - camK), b: 3.6, t });
    const x2 = this.x2(t);
    secant(g, V, 1, x2, { ext: 0.3, ext0: 0.03, w: 6 });
    spot(g, V.X(1), V.Y(1), { k: 1 });
    const hw = prog(t, T.slide + 0.3, T.slide + 2.8), hu = lerp(1, 0.78, hw), hs = 1.3;
    walker(g, V, hu, hs, { step: hw > 0 && hw < 1 ? t * 1.8 : 0, flip: hw > 0 && hw < 1 });

    // sổ BOOK: hàng 0 (x = 2) đã ghi; mỗi ô các hàng sau hiện đúng chữ được đọc
    const rowsK = T.rows.map(r => r.map((a, j) => prog(t, a, a + Math.min(0.55, (j < 4 ? r[j + 1] - a : 0.7) - 0.02)))), shown = 1 + rowsK.flat().reduce((s, v) => s + v, 0) / 5;
    const cur = T.rows.findIndex((r, i) => t >= r[0] && (i === 3 || t < T.rows[i + 1][0])) + 1;
    ledger(g, BOOK.x, BOOK.y, BOOK.w, BOOK.h, { cols: STEP_COLS, rows: STEP_ROWS, shown, k: prog(t, T.slide + 1.6, T.slide + 2.4), hi: cur > 0 && t < T.end ? cur : -1 });
    if (t >= T.rows[3][4] + 0.6) must(`'${STEPS[4].slope}'`, '2.001');

    // kính lúp: 1.01 (câu 15) rồi 1.001 (câu 16)
    const k1 = t < T.l16 - 0.4 ? prog(t, T.rows[2][0], T.rows[2][0] + 0.4) : (t < T.l16 ? 1 - prog(t, T.l16 - 0.4, T.l16) : prog(t, T.rows[3][0], T.rows[3][0] + 0.4));
    if (k1 > 0) { const big = t >= T.l16 - 0.4;
      zoomLoupe(g, big ? 1.001 : 1.01, k1);
      card(g, big ? 'x = 1.001' : 'x = 1.01', 1470, 560, { size: 44, isMath: true, mono: false, edge: C.sec, k: k1 }); }
    mascotAt(g, t, 'calculator', T.rows[0][0] - 0.5, T.rows[0][4] + 1.4);
    actTitle(g, t, this.START, 'ACT TWO', 'Closer and closer');
    secTag(g, 'Sliding in', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
