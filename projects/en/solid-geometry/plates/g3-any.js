// g3 · Any point will do — tờ bìa P trên bàn; một hạt (điểm → mặt) kéo dài thành chỉ a ∥ P; dây dọi từ nhiều điểm của a
// cùng dài d; rồi tờ bìa Q ∥ P gấp lên chứa a: dây dọi từ nhiều điểm của Q, cùng d; một hạt trượt dọc a ("pick any point").
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camLerp, sheet, sheetShadow, thread, dot3, rightMark,
  lamp, line, it, label, formula, sectionTag, shadow, shadowPt, solid, sphere, pool, add, sub, len } from '../kit.js';

const D = 2.2;                                      // khoảng cách hai mặt (đơn vị hình)
const P0 = [[-5, -2.6, 0], [5, -2.6, 0], [5, 2.6, 0], [-5, 2.6, 0]];
const Q0 = [[-4.6, -2.0, D], [4.6, -2.0, D], [4.6, 2.2, D], [-4.6, 2.2, D]];
const AY = -1.5, AX = [-4.0, 4.0];                  // chỉ a: y = AY, z = D, x ∈ AX
const LINE_PTS = [-1.2, 1.0, 3.2];                 // dây dọi từ a (câu 115)
const PLANE_PTS = [[-3.6, 1.3], [0.9, 1.6], [3.7, 0.4]]; // dây dọi từ Q (câu 116)
const CAM0 = { yaw: -26, pitch: 20, dist: 17.5, target: [0, 0, 1.1], cx: 1240, cy: 640 };
const LMP = [0, -1, 14];
const BEAD = sphere(0.14, 20, 10);

export default class Any {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g3');
    this.START = L(114).start;
    this.FROM = Math.max(this.START - 1.2, L(113).end + 0.5);
    this.T = {
      idea: w(114, 'idea'), other: w(114, 'other'), follow: w(114, 'follow'),
      line115: w(115, 'line', 1), par115: w(115, 'parallel'), any115: w(115, 'any'), plane115: w(115, 'plane', 2),
      two: w(116, 'two'), par116: w(116, 'parallel'), any116: w(116, 'any'), other116: w(116, 'other'),
      pick: w(117, 'pick'), guarantees: w(117, 'guarantees'), every: w(117, 'every'), same: w(117, 'same'), end: L(117).end,
    };
    // toán trên hình: mọi dây dọi (từ a, từ Q) dài đúng D
    [...LINE_PTS.map(x => [x, AY]), ...PLANE_PTS].forEach(([x, y]) => must(`${len(sub([x, y, D], [x, y, 0]))}`, D));
  }
  sfx() {
    const T = this.T;
    return [{ t: T.idea, kind: 'pen' }, { t: T.line115, kind: 'pen' },
      ...LINE_PTS.map((_, i) => ({ t: T.any115 + i * 0.35, kind: 'tick' })),
      { t: T.par116, kind: 'flap' }, ...PLANE_PTS.map((_, i) => ({ t: T.any116 + i * 0.35, kind: 'tick' })),
      { t: T.same, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min(Math.max(0, t - this.FROM) * 0.25, 5);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAM0, 0), P = cam.P;

    // tờ bìa P
    const kP = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.1));
    const pc = P0.map(p => [p[0] * kP, p[1] * (0.3 + 0.7 * kP), 0]);
    sheetShadow(g, cam, pc.map(p => [p[0], p[1], -0.5]), { a: 0.18 * kP });
    const cs = sheet(g, cam, pc, { k: kP });
    g.save(); g.beginPath(); cs.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip();
    const pp = P([0, -1, 0]); pool(g, pp[0], pp[1], 520, 0.5 * kP); g.restore();
    const lp = P([-4.6, -2.3, 0]); it(g, 'P', lp[0] + 20, lp[1] - 14, 64, C.ink, { k: kP });

    // tờ bìa Q ∥ P gấp lên ở "parallel" (câu 116) — từ mép a nâng lên
    const kQ = outCubic(prog(t, T.par116 - 0.2, T.par116 + 0.8));
    const qc = Q0.map(p => [p[0], AY + (p[1] - AY) * kQ, D]);
    // bóng của Q rơi lên P (đèn trên cao) — vẽ trước dây dọi và chỉ
    if (kQ > 0) { g.save(); g.beginPath(); cs.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip();
      g.fillStyle = `rgba(150,74,38,${0.08 * kQ})`; g.beginPath(); qc.map(p => P(shadowPt(p, LMP, 0.001))).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill(); g.restore(); }

    // hạt đầu tiên (một điểm → mặt) ở "idea", kéo thành chỉ a ở "line"
    const kB = prog(t, T.idea, T.idea + 0.35), kL = outCubic(prog(t, T.line115, T.line115 + 0.8));
    const x0 = -3.0;
    const aL = [x0 + (AX[0] - x0) * kL, AY, D], aR = [x0 + (AX[1] - x0) * kL, AY, D];
    // bóng của chỉ a trên P
    if (kL > 0) line(g, P(shadowPt(aL, LMP, 0.001)), P(shadowPt(aR, LMP, 0.001)), 'rgba(150,74,38,0.2)', 8);
    // hạt trượt (câu 117): vị trí theo t
    const slide = smooth(prog(t, T.pick, T.every + 0.6)), xs = -3.0 + 6.4 * slide - 2.5 * smooth(prog(t, T.every + 0.6, T.end));
    const bx = t < T.pick ? x0 : xs, beadP = [bx, AY, D];
    if (kB > 0) shadow(g, cam, BEAD.V.map(v => add(v, beadP)), LMP, { a: 0.35 * kB, spread: 0.05, z0: 0.001 });

    // dây dọi: hạt đầu (câu 114) → từ ba điểm của a (115) → từ ba điểm của Q (116) → hạt trượt (117)
    const kEvery = prog(t, T.every, T.every + 0.5);
    const plumb = (x, y, k, lab, kl) => {
      if (k <= 0) return;
      thread(g, cam, [x, y, D], [x, y, D * (1 - k)], { w: 3.5 });
      if (k >= 1) { dot3(g, cam, [x, y, 0], { r: 6 }); rightMark(g, cam, [x, y, 0], [0, 0, 1], [1, 0, 0], 0.32, { w: 2.5 }); }
      const m = P([x, y, D * 0.5]); it(g, 'd', m[0] + 14, m[1] + 14, 48, C.ink, { k: Math.max(kl, kEvery) * (lab ? 1 : 0) });
    };
    // Q vẽ SAU dây dọi phía sau (y lớn hơn a), TRƯỚC những gì ở mép trước
    plumb(x0, AY, t < T.pick ? outCubic(prog(t, T.idea + 0.2, T.idea + 0.9)) : 0, true, prog(t, T.idea + 0.8, T.idea + 1.1));
    PLANE_PTS.forEach(([x, y], i) => { const k = outCubic(prog(t, T.any116 + i * 0.35, T.any116 + i * 0.35 + 0.6));
      plumb(x, y, k, true, prog(t, T.any116 + i * 0.35 + 0.5, T.any116 + i * 0.35 + 0.8)); });
    if (kQ > 0) {
      sheet(g, cam, qc, { k: kQ, alpha: 0.82 });
      const qp = P(Q0[3]); it(g, 'Q', qp[0] - 20, qp[1] - 16, 64, C.ink, { k: kQ, align: 'right' });
    }
    // dây dọi từ a (mép trước của Q → nằm trước Q)
    LINE_PTS.forEach((x, i) => { const k = outCubic(prog(t, T.any115 + i * 0.35, T.any115 + i * 0.35 + 0.6));
      plumb(x, AY, k, true, prog(t, T.any115 + i * 0.35 + 0.5, T.any115 + i * 0.35 + 0.8)); });
    // chỉ a
    thread(g, cam, aL, aR, { w: 6, k: kL > 0 ? 1 : 0 });
    if (kL > 0) { const pa = P(aR); it(g, 'a', pa[0] + 16, pa[1] + 16, 60, C.ink, { k: prog(t, T.line115 + 0.5, T.line115 + 0.9) }); }
    // hạt + dây dọi trượt
    if (t >= T.pick) plumb(bx, AY, 1, false, 0);
    if (kB > 0) { solid(g, cam, BEAD, BEAD.V.map(v => add(v, beadP)), LMP, { k: kB, edgeW: 0, hidden: false }); dot3(g, cam, beadP, { r: 9, k: kB }); }

    // đèn
    lamp(g, P([0, -1, 7])[0], 150, { on: 1 });

    // chữ
    sectionTag(g, 'Act VI · any point will do', prog(t, this.FROM + 0.3, this.FROM + 1));
    label(g, 'point → plane', 96, 220, { size: 28, color: C.ink, k: prog(t, T.idea, T.idea + 0.6) });
    formula(g, ['a', { gap: 0.15 }, { para: true }, { gap: 0.1 }, 'P'], 96, 320, 72, C.ink, prog(t, T.par115, T.par115 + 0.6));
    it(g, 'any point of a', 300, 316, 40, C.lead, { wt: 500, k: prog(t, T.any115, T.any115 + 0.6) });
    formula(g, ['Q', { gap: 0.15 }, { para: true }, { gap: 0.1 }, 'P'], 96, 420, 72, C.ink, prog(t, T.par116, T.par116 + 0.6));
    it(g, 'any point of Q', 300, 416, 40, C.lead, { wt: 500, k: prog(t, T.any116, T.any116 + 0.6) });
    it(g, 'every point: the same d', 96, 510, 54, C.ink, { k: prog(t, T.guarantees, T.every + 0.4) });
  }
}
