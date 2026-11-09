// b07 · The tangent (câu 22–26, G2) — DNA survey. Mở ở ĐÚNG VIEWS.zoom, nối từ b06: dây cuối "settles" quay nốt vài px rồi mờ;
// "special" sào HẠ xuống áp đúng MỘT điểm (touchesOnce) → "point" correct; "ruler… bowl" camera lùi nhẹ cho thấy cái chén;
// "tangent" thẻ đỏ TANGENT, "slope" thẻ đỏ slope = 2 + mũi tên navy tới điểm; "never… on top" cọc thứ hai trượt về cọc đầu,
// kính lúp soi hai cọc CHỒNG nhau → "zero over zero" 「0 ÷ 0」 nứt (halt); "slopes… heading" ba dây mờ khép về sào + mũi tên navy.
import { H, C, AR, prog, lookup, must, outCubic, smooth, ground, hill, secant, rod, spot, hiker, rangingPole, loupe, card, text, secTag,
  line, arrow, plot, VIEWS, lerpView, view, D2X, touchesOnce, tanAt, sq } from '../kit.js';
import { lifted, mascots, crackLine, track } from './g2-util.js';

const BIG = `900 150px ${AR}`;
export default class Tangent {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer', 'halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b07');
    this.T = {
      special: w(22, 'special'), ruler: w(22, 'ruler'), bowl: w(22, 'bowl'), point22: w(22, 'point'),
      tangent23: w(23, 'tangent'),
      slope24: w(24, 'slope'), steep24: w(24, 'steepness'), single24: w(24, 'single'),
      did25: w(25, 'did'), never25: w(25, 'never', 2), put25: w(25, 'put'), top25: w(25, 'top'), zeroA25: w(25, 'zero', 1), zeroB25: w(25, 'zero', 2),
      asked26: w(26, 'asked'), where26: w(26, 'where'), slopes26: w(26, 'slopes'), heading26: w(26, 'heading'),
    };
    this.START = L(22).start;
    this.FROM = Math.max(this.START - 1.2, L(21).end + 0.5);
    touchesOnce(1);
    this.LOUPE = [1330, 420, 190];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.special + 0.55, 'wood'), c(T.point22, 'correct'), c(T.tangent23, 'card'), c(T.slope24, 'card'), c(T.steep24, 'pen'), c(T.single24, 'tick'),
      c(T.put25 + 0.2, 'wood'), c(T.zeroB25, 'crack'), c(T.heading26, 'snap'),
    ];
  }
  cam(t) {
    const T = this.T, d = 0.4 * smooth(prog(t, T.ruler, T.bowl + 0.6)) * (1 - prog(t, T.never25 - 0.3, T.never25 + 0.8));
    return lerpView(VIEWS.zoom, VIEWS.bowl, d);
  }
  render(g, t) {
    const T = this.T, V = this.cam(t), P = [V.X(1), V.Y(1)];
    ground(g, 'field', t, { pan: (VIEWS.zoom.X(0) - V.X(0)) * 0.1 });
    hill(g, V, { a: -1.2, b: 3.6, t });

    // dây cuối của b06 quay nốt rồi mờ khi sào hạ xuống
    const secA = 1 - prog(t, T.special - 0.1, T.special + 0.5);
    if (secA > 0) secant(g, V, 1, 1.0015 + 0.12 * (1 - outCubic(prog(t, this.FROM, this.FROM + 1.7))), { poles: false, a: secA, ext: 1.1, ext0: 0.6 });

    // ba dây mờ khép về sào ("where the slopes were heading")
    [[1.5, T.asked26], [1.1, T.where26], [1.01, T.slopes26]].forEach(([x, at]) =>
      secant(g, V, 1, x, { k: prog(t, at, at + 0.22), a: 0.5, poles: false, ext: 0.3, ext0: 0.03 }));

    // cọc thứ hai trượt về cọc đầu ("never put the second point on top")
    const slide = prog(t, T.put25, T.top25 + 0.15), x2 = 1.0 + 0.45 * (1 - smooth(slide)) + 0.0015, out2 = prog(t, T.asked26 - 0.3, T.asked26 + 0.4);
    if (t >= T.put25 - 0.3 && out2 < 1) secant(g, V, 1, x2, { k: 1, a: 0.9 * (1 - out2), poleK: prog(t, T.put25 - 0.3, T.put25 + 0.1), lift: out2, ext: 0.3, ext0: 0.03 });

    // sào hạ xuống áp một điểm (đặt SAU đồi, dây; TRƯỚC điểm sáng, người đi bộ)
    const kRod = prog(t, T.special - 0.1, T.special + 0.55);
    if (kRod > 0) rod(g, V, 1, { d0: -0.55, d1: 0.7, k: kRod, hover: 130 });

    spot(g, P[0], P[1], { pulse: prog(t, T.point22, T.point22 + 0.5) + prog(t, T.single24, T.single24 + 0.4) });
    const hs = 1.3 * (V.sx / 760) ** 0.6;
    hiker(g, V.X(0.78) - 6 * hs, V.Y(sq(0.78)) - 6, hs);

    // mũi tên navy "heading": song song với sào, hướng về điểm
    const ka = prog(t, T.heading26, T.heading26 + 0.5);
    if (ka > 0) { const A = [V.X(1.45), V.Y(tanAt(1, 1.45)) - 85], B = [V.X(1.12), V.Y(tanAt(1, 1.12)) - 85]; arrow(g, A[0], A[1], B[0], B[1], ka); }

    // ── chữ / thẻ ──
    const lc = prog(t, T.did25, T.did25 + 0.55);
    card(g, 'TANGENT', 330, 235, { size: 56, mono: false, wt: 900, color: C.poleInk, edge: C.pole, k: prog(t, T.tangent23, T.tangent23 + 0.3), lift: lc });
    if (t >= T.slope24) {
      const done = t > T.slope24 + 0.4;
      card(g, `slope = ${D2X[1]}`, 330, 335, { size: 52, isMath: true, mono: false, color: C.poleInk, edge: C.pole, k: prog(t, T.slope24, T.slope24 + 0.3), lift: lc });
      if (done && lc <= 0) must(`(2 * 1)`, D2X[1]);
      lifted(g, lc, () => { const kk = prog(t, T.steep24, T.steep24 + 0.45); if (kk > 0) arrow(g, 520, 345, P[0] - 34, P[1] - 30, kk); });
    }

    // kính lúp: hai cọc CHỒNG nhau ("never put… on top") → 0 ÷ 0 nứt
    const lk = prog(t, T.put25 - 0.1, T.put25 + 0.35) * (1 - prog(t, T.asked26 - 0.3, T.asked26 + 0.2));
    if (lk > 0) loupe(g, ...this.LOUPE, () => this.inLoupe(g, t), { k: lk });
    if (t >= T.zeroA25) {
      const crack = prog(t, T.zeroB25, T.zeroB25 + 0.4), col = crack >= 0.5 ? C.dim : C.ink, up = prog(t, T.asked26 - 0.1, T.asked26 + 0.5);
      lifted(g, up, () => { text(g, '0 ÷ 0', 120, 330, { font: BIG, color: col, k: prog(t, T.zeroA25, T.zeroB25 + 0.2) });
        crackLine(g, [[150, 215], [230, 270], [205, 305], [330, 345], [300, 375], [450, 300], [500, 335], [610, 255]], crack); });
    }
    secTag(g, 'The tangent', { k: prog(t, this.START + 0.4, this.START + 0.8), t });

    // mascot: pointer → halt ("never put… on top") → pointer
    mascots(g, t, [{ pose: 'pointer', a: T.tangent23, b: T.did25 }, { pose: 'halt', a: T.never25 - 0.25, b: T.asked26 - 0.5 }, { pose: 'pointer', a: T.asked26 - 0.1, b: 999 }]);
  }
  /** Trong kính lúp (phóng 40 lần quanh (1, 1)): hai cọc chồng khít, dây xanh co lại thành điểm. */
  inLoupe(g, t) {
    const T = this.T, [cx, cy, r] = this.LOUPE, X0 = cx - 20, Y0 = cy + 90, sx = 760 * 40, sy = 420 * 40;
    const e = smooth(prog(t, T.put25, T.top25 + 0.15)), off = 150 * (1 - e) ** 1.3;
    const yAt = px => Y0 - (((1 + (px - X0) / sx) ** 2) - 1) * sy;
    g.beginPath(); g.moveTo(cx - r - 10, H + 50); for (let px = cx - r - 10; px <= cx + r + 10; px += 8) g.lineTo(px, yAt(px)); g.lineTo(cx + r + 10, H + 50); g.closePath(); g.fillStyle = C.face; g.fill();
    g.strokeStyle = C.curve; g.lineWidth = 10; g.beginPath(); for (let px = cx - r - 10; px <= cx + r + 10; px += 8) px === cx - r - 10 ? g.moveTo(px, yAt(px)) : g.lineTo(px, yAt(px)); g.stroke();
    const Q = [X0 + off, yAt(X0 + off)];
    if (off > 2) { g.save(); g.globalAlpha = Math.min(1, off / 14); const d = [Q[0] - X0, Q[1] - Y0], n = Math.hypot(...d);
      line(g, X0 - d[0] / n * 260, Y0 - d[1] / n * 260, Q[0] + d[0] / n * 260, Q[1] + d[1] / n * 260, C.sec, 6); g.restore(); }
    rangingPole(g, Q[0], Q[1], { h: 150, w: 12 });
    rangingPole(g, X0, Y0, { h: 150, w: 12 });
  }
}
