// c3 · A line and a plane — ba ô (ba tờ bìa trên bàn), mỗi câu một ô:
//  1 chỉ mực nằm trong tờ bìa ("inside") · 2 kim khâu xuyên tờ giấy, phần dưới nét đứt, chấm ở điểm xuyên ("one point")
//  · 3 sợi cáp căng trên dải đường, bóng của nó song song ("parallel", "no common point"); cột cáp dựng ở "cable".
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, sheet, sheetShadow, shadow, solid, thread, dot3,
  lamp, line, it, label, sectionTag, box, shadowPt, add, sub, mul, norm, cross3, len } from '../kit.js';

const CX = [-4.0, 0, 4.0], HW = 1.75, HD = 1.3;
const card = c => [[c - HW, -HD, 0], [c + HW, -HD, 0], [c + HW, HD, 0], [c - HW, HD, 0]];
const LP = [0.8, 2.0, 9];
const CAM = { yaw: -10, pitch: 38, dist: 17.5, target: [0, 0.2, 0.5], cx: 1150, cy: 600 };
// 1: đường trong mặt
const IN = [[-5.3, -0.75, 0], [-2.7, 0.75, 0]];
// 2: kim xuyên tại O, trục u
const O2 = [0, -0.1, 0], U2 = norm([0.35, 0.45, 1]), NL = 2.6;
// 3: cáp ∥ mặt, cao ZC
const ZC = 1.25, CAB = [[2.55, -0.2, ZC], [5.45, -0.2, ZC]];

export default class LinePlane {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      line: w(34, 'line'), plane: w(34, 'plane'), three: w(34, 'three'),
      lie: w(35, 'lie'), inside: w(35, 'inside'),
      cut: w(36, 'cut'), plane36: w(36, 'plane'), one: w(36, 'one'), point: w(36, 'point'), needle: w(36, 'needle'), paper: w(36, 'paper'),
      par: w(37, 'parallel'), no: w(37, 'no'), common: w(37, 'common'), cable: w(37, 'cable'), stretched: w(37, 'stretched'), road: w(37, 'road'),
    };
    this.START = L(34).start;
    this.FROM = Math.max(this.START - 1.2, L(33).end + 0.5);
    // trạng thái xong: cáp ∥ mặt (z hai đầu bằng nhau, > 0) → không điểm chung; bóng cáp cùng hướng với cáp
    must(`${CAB[0][2]} - ${CAB[1][2]}`, 0);
    const s0 = shadowPt(CAB[0], LP), s1 = shadowPt(CAB[1], LP);
    must(`${len(cross3(norm(sub(s1, s0)), norm(sub(CAB[1], CAB[0]))))} < 1e-9`, true);
    // kim cắt mặt đúng một điểm: trục không song song mặt (thành phần z ≠ 0)
    must(`${U2[2]} > 0`, true);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.lie, kind: 'pen' }, { t: T.point, kind: 'tick' }, { t: T.cable, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    lamp(g, 1260, 150, { on: 1 });
    const cam = camera({ ...CAM, yaw: CAM.yaw + Math.min(Math.max(0, t - this.FROM) * 0.25, 4) }), P = cam.P;
    // ba tờ bìa gấp vào lần lượt
    const kc = CX.map((_, i) => outCubic(prog(t, this.FROM + 0.3 + 0.25 * i, this.FROM + 1.1 + 0.25 * i)));
    const cards = CX.map((c, i) => card(c).map(p => [c + (p[0] - c) * kc[i], p[1] * (0.3 + 0.7 * kc[i]), 0]));
    cards.forEach((q, i) => { if (kc[i] > 0) sheetShadow(g, cam, q, { a: 0.2 * kc[i] }); });
    cards.forEach((q, i) => sheet(g, cam, q, { k: kc[i] }));
    // ô 3: vạch đường (mép đường) ở "road"
    const kRd = prog(t, T.road, T.road + 0.5);
    [-1.0, 1.0].forEach(y => line(g, P([2.4, y, 0]), P([5.6, y, 0]), C.inkA(0.45), 3, [], kRd));
    line(g, P([2.4, 0.4, 0]), P([5.6, 0.4, 0]), C.inkA(0.45), 3, [14, 12], kRd);

    // ô 1: chỉ nằm trong mặt
    const kIn = prog(t, T.lie, T.lie + 0.6);
    thread(g, cam, IN[0], IN[1], { w: 6, k: kIn });

    // ô 2: kim đi xuống theo trục, xuyên tờ giấy ở "cut through"
    const kN = smooth(prog(t, T.cut - 0.3, T.plane36 + 0.3)), kNin = prog(t, T.cut - 0.6, T.cut - 0.2);
    if (kNin > 0) {
      const tipS = 1.6 - 2.5 * kN, tip = add(O2, mul(U2, tipS)), top = add(O2, mul(U2, tipS + NL));
      // bóng kim (phần trên giấy) — mềm
      const above = tipS > 0 ? tip : O2, sa = P(shadowPt(above, LP)), sb = P(shadowPt(top, LP));
      for (let i = 0; i < 3; i++) line(g, sa, sb, C.terraA(0.08 * kNin), 12 - i * 4);
      if (tipS < 0) line(g, P(tip), P(O2), C.inkA(0.55 * kNin), 4, [8, 8]);
      const pTop = P(top), pFrom = P(tipS < 0 ? O2 : tip);
      g.save(); g.globalAlpha = kNin; line(g, pFrom, pTop, C.lead, 6);
      // lỗ kim
      const ang = Math.atan2(pTop[1] - pFrom[1], pTop[0] - pFrom[0]), e = P(add(top, mul(U2, -0.22)));
      g.strokeStyle = C.lead; g.lineWidth = 3; g.beginPath(); g.ellipse(e[0], e[1], 13, 5, ang, 0, 7); g.stroke(); g.restore();
    }
    const kPt = prog(t, T.one, T.one + 0.3);
    dot3(g, cam, O2, { r: 10, k: kPt });

    // ô 3: cáp ∥ mặt + bóng song song; cột dựng ở "cable"
    const kCb = prog(t, T.par, T.par + 0.6), kPo = outCubic(prog(t, T.cable - 0.1, T.stretched + 0.2));
    if (kPo > 0) [CAB[0], CAB[1]].forEach(p => { const V = box(0.16, 0.16, ZC * kPo).V.map(q => add(q, [p[0] - 0.08, p[1] - 0.08, 0]));
      shadow(g, cam, V, LP, { a: 0.25, spread: 0.2 }); });
    if (kCb > 0) { const s0 = P(shadowPt(CAB[0], LP)), s1 = P(shadowPt(CAB[1], LP));
      for (let i = 0; i < 4; i++) line(g, s0, s1, C.terraA(0.1), 16 - i * 4, [], kCb);
      line(g, s0, s1, C.terraA(0.55), 3, [], kCb); }
    if (kPo > 0) [CAB[0], CAB[1]].forEach(p => { const m = box(0.16, 0.16, ZC * kPo); solid(g, cam, m, m.V.map(q => add(q, [p[0] - 0.08, p[1] - 0.08, 0])), LP, { edgeW: 2.5 }); });
    thread(g, cam, CAB[0], CAB[1], { w: 6, k: kCb });

    // nhãn dưới mỗi ô (phẳng, sát mép trước của tờ)
    const under = (c, s, k, dy = 0, col = C.ink) => { const q = P([c, -HD, 0]); label(g, s, q[0], q[1] + 58 + dy, { size: 28, color: col, align: 'center', k }); };
    under(CX[0], 'inside', prog(t, T.inside, T.inside + 0.4));
    under(CX[1], 'one point', prog(t, T.one, T.point + 0.4));
    under(CX[2], 'parallel', prog(t, T.par, T.par + 0.5));
    under(CX[2], 'no common point', prog(t, T.no, T.common + 0.4), 44, C.lead);
    const pc = P(CAB[1]); it(g, 'cable', pc[0] - 20, pc[1] - 26, 48, C.ink, { k: prog(t, T.cable, T.cable + 0.4), align: 'right' });
    const pn = P(add(O2, mul(U2, 1.6 - 2.5 + NL))); it(g, 'needle', pn[0] + 24, pn[1] + 8, 48, C.ink, { k: prog(t, T.needle, T.needle + 0.4) });

    // chữ trái
    sectionTag(g, 'Act II · a line and a plane', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'a line & a plane', 96, 250, 64, C.ink, { k: prog(t, T.line, T.plane + 0.4) });
    label(g, '3 options', 96, 320, { size: 28, color: C.ink, k: prog(t, T.three, T.three + 0.4) });
  }
}
