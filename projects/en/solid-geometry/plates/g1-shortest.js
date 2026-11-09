// g1 · The shortest way — MỞ HỒI VI "Distance".
// Tờ bìa P nằm trên bàn, một hạt mực A treo trên P (cao 3); đèn rọi thẳng trên A → bóng A rơi đúng chân H.
// Ba sợi chỉ xiên từ A xuống P, độ dài tính bằng code; sợi thẳng đứng AH ngắn nhất → dấu vuông.
import { W, H, C, prog, lookup, must, fix, outCubic, smooth, ground, camLerp, sheet, sheetShadow, thread, dot3, rightMark,
  lamp, line, it, label, formula, sectionTag, actCard, dark, shadow, solid, sphere, shadowPt, pool, add, sub, len, norm } from '../kit.js';

const HT = 3, A = [0, 0, HT], FOOT = [0, 0, 0], LMP = [0, 0, 9];
// ba chân xiên: khoảng cách ngang d, hướng φ (độ)
const SLANT = [{ d: 4, phi: 245 }, { d: 3, phi: 330 }, { d: 2, phi: 165 }].map(s => {
  const r = s.phi * Math.PI / 180, F = [s.d * Math.cos(r), s.d * Math.sin(r), 0];
  return { ...s, F, L: len(sub(F, A)) };
});
const CARD = [[-5, -3.4, 0], [5, -3.4, 0], [5, 3.4, 0], [-5, 3.4, 0]];
const CAM0 = { yaw: -24, pitch: 24, dist: 19.5, target: [0, 0.2, 1.2], cx: 1240, cy: 600 };
const BEAD = sphere(0.16, 20, 10);
const bump = (t, c, w) => Math.max(0, 1 - Math.abs(t - c) / w);

export default class Shortest {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    this.START = L(108).start;
    this.FROM = Math.max(this.START - 2.6, L(107).end + 0.5);
    this.T = {
      dist108: w(108, 'distance'), core: w(109, 'core'), dist109: w(109, 'distance'), length: w(109, 'length'),
      short1: w(109, 'shortest', 1), short2: w(109, 'shortest', 2), always: w(109, 'always'), perp: w(109, 'perpendicular'),
      end: L(109).end,
    };
    // toán trên hình (trạng thái xong): độ dài từng sợi, sợi đứng ngắn nhất
    this.LAB = SLANT.map(s => '≈ ' + fix(`Math.hypot(${s.d}, ${HT})`, 1));
    must(`Math.hypot(4, 3)`, 5); this.LAB[0] = '5';
    must(`${len(sub(FOOT, A))}`, 3);
    SLANT.forEach(s => must(`${s.L} > ${HT}`, true));
  }
  sfx() {
    const T = this.T;
    return [{ t: Math.max(this.START - 2.3, this.FROM + 0.45), kind: 'shimmer' }, { t: T.core, kind: 'pen' },
      { t: T.length, kind: 'tick' }, { t: T.perp + 0.2, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const drift = Math.max(0, t - S) * 0.3;
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAM0, 0), P = cam.P;
    // đèn chớp tắt–bật quanh lúc thẻ hồi vào
    const tf = Math.max(S - 2.4, this.FROM + 0.35), on = 1 - bump(t, tf, 0.15);

    // tờ bìa P gấp vào ngay khi thẻ hồi trượt đi
    const kS = outCubic(prog(t, S - 0.4, S + 0.5));
    const corners = CARD.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    if (kS > 0) {
      sheetShadow(g, cam, corners.map(p => [p[0], p[1], -0.6]), { a: 0.18 * kS });
      const cs = sheet(g, cam, corners, { k: kS });
      // vũng sáng của đèn quanh chân H
      g.save(); g.beginPath(); cs.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip();
      const pf = P(FOOT); pool(g, pf[0], pf[1], 380, 0.6 * kS); g.restore();
      const q = P([-4.5, -3.0, 0]);
      it(g, 'P', q[0] + 6, q[1] - 14, 64, C.ink, { k: prog(t, S + 0.4, S + 0.8) });
    }

    const kA = prog(t, T.dist108, T.dist108 + 0.35);
    const dim = 1 - 0.6 * prog(t, T.short2, T.short2 + 0.6);
    // bóng các sợi chỉ (đèn thẳng trên A: bóng sợi xiên = đoạn chân H → chân F)
    SLANT.forEach((s, i) => {
      const k = prog(t, T.core + i * 0.45, T.core + i * 0.45 + 0.7);
      if (k > 0) line(g, P(shadowPt(A, LMP, 0.001)), P(shadowPt(s.F, LMP, 0.001)), `rgba(150,74,38,${0.16 * dim})`, 9, [], k);
    });
    // bóng hạt A = đúng chân đường vuông góc
    if (kA > 0) shadow(g, cam, BEAD.V.map(v => add(v, A)), LMP, { a: 0.4 * kA, spread: 0.05, z0: 0.001 });

    // sợi chỉ xiên + nhãn độ dài
    SLANT.forEach((s, i) => {
      const k = outCubic(prog(t, T.core + i * 0.45, T.core + i * 0.45 + 0.7));
      thread(g, cam, A, s.F, { w: 4, k, color: C.inkA(dim) });
      dot3(g, cam, s.F, { r: 6, color: C.inkA(dim), k: prog(t, T.core + i * 0.45 + 0.6, T.core + i * 0.45 + 0.9) });
      // nhãn cạnh điểm 48% đường A → F, đẩy ra theo pháp tuyến màn hình (phía xa sợi đứng)
      const pa = P(A), pf = P(s.F), m = [pa[0] + 0.48 * (pf[0] - pa[0]), pa[1] + 0.48 * (pf[1] - pa[1])];
      let nx = -(pf[1] - pa[1]), ny = pf[0] - pa[0]; const nl = Math.hypot(nx, ny); nx /= nl; ny /= nl;
      if (Math.sign(nx) !== Math.sign(pf[0] - pa[0])) { nx = -nx; ny = -ny; }
      const lx = m[0] + nx * 34, ly = m[1] + ny * 34 + 14;
      it(g, this.LAB[i], lx, ly, 44, C.inkA(Math.max(dim, 0.55)), { align: nx < 0 ? 'right' : 'left', wt: 600, k: prog(t, T.length + i * 0.2, T.length + i * 0.2 + 0.5) });
    });
    // sợi thẳng đứng: kẻ ở "shortest" thứ nhất, đậm lên ở "perpendicular"
    const kV = outCubic(prog(t, T.short1, T.short1 + 0.7)), kP = prog(t, T.perp, T.perp + 0.4);
    thread(g, cam, A, FOOT, { w: 5 + 2 * kP, k: kV });
    dot3(g, cam, FOOT, { r: 7, k: prog(t, T.short1 + 0.6, T.short1 + 0.9) });
    rightMark(g, cam, FOOT, [0, 0, 1], norm([1, -0.2, 0]), 0.42, { k: kP, w: 3.5 });
    rightMark(g, cam, FOOT, [0, 0, 1], norm([-0.2, -1, 0]), 0.42, { k: prog(t, T.perp + 0.25, T.perp + 0.65), w: 3.5 });
    const pm = P([0, 0, HT / 2]);
    it(g, '3', pm[0] + 22, pm[1] + 12, 54, C.ink, { k: prog(t, T.short1 + 0.5, T.short1 + 0.9) });
    // hạt A
    if (kA > 0) { solid(g, cam, BEAD, BEAD.V.map(v => add(v, A)), LMP, { base: C.card, k: kA, edgeW: 0, hidden: false });
      dot3(g, cam, A, { r: 9, k: kA }); const pa = P(A); it(g, 'A', pa[0] + 22, pa[1] - 14, 60, C.ink, { k: kA }); }
    const ph = P(FOOT); it(g, 'H', ph[0] + 18, ph[1] + 50, 48, C.ink, { k: prog(t, T.short1 + 0.6, T.short1 + 1.0) });

    // đèn treo trên A
    lamp(g, P([0, 0, 7])[0], 150, { on });

    // chữ: định nghĩa viết theo lời
    if (t > S) sectionTag(g, 'Act VI · the shortest way', prog(t, S, S + 0.8));
    it(g, 'distance', 96, 250, 72, C.ink, { k: prog(t, T.dist109, T.dist109 + 0.5) });
    it(g, '= the shortest path', 96, 330, 54, C.ink, { k: prog(t, T.short1 - 0.2, T.short1 + 0.6) });
    formula(g, ['shortest', { gap: 0.25 }, '=', { gap: 0.25 }, { perp: true }], 96, 430, 54, C.ink, prog(t, T.perp, T.perp + 0.7));

    // thẻ hồi + chớp đèn
    actCard(g, t, S, 'ACT SIX', 'Distance');
    dark(g, on);
  }
}
