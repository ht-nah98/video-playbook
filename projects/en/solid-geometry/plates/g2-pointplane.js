// g2 · A point and a plane — hộp-phòng 12 × 4 × 3 (ROOM). Đèn trần → sàn: dây dọi dài ROOM.c = 3 m.
// "where the foot lands": điểm Q trên tường sau → dùng hệ quả e4 (tường ⊥ sàn; trong tường kẻ ⊥ giao tuyến → ⊥ sàn).
// Mascot `compass` bên phải, compa chĩa sang trái vào hình.
import { W, H, C, prog, lookup, must, outCubic, ground, camLerp, room, ROOM, thread, dot3, rightMark, lamp, line, poly,
  it, label, formula, figure, sectionTag, shadow, solid, revolve, xf, pool, add, sub, len } from '../kit.js';

const HOOK = [ROOM.a / 2, ROOM.b / 2, ROOM.c], FOOT = [ROOM.a / 2, ROOM.b / 2, 0];
const Q = [9.6, ROOM.b, 2.1], QF = [9.6, ROOM.b, 0];
const CAM0 = { yaw: -20, pitch: 30, dist: 19.5, target: [6, 2, 1.2], cx: 740, cy: 700 };
const SHADE = revolve(0.5, 0.34, 0, 32), SHADE_V = xf(SHADE.V, { at: [HOOK[0], HOOK[1], ROOM.c - 0.42] });
const BOB = revolve(0.13, 0.32, 0, 24), BOB_V0 = xf(BOB.V, { rx: 180 });
const DESK_L = [3, -8, 30];
const C8 = Object.values(ROOM.corners);

export default class PointPlane {
  static ERA = 'desk';
  static POSES = ['compass'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    this.START = L(110).start;
    this.FROM = Math.max(this.START - 1.2, L(109).end + 0.5);
    this.T = {
      point1: w(110, 'point', 1), plane1: w(110, 'plane', 1), perp: w(110, 'perpendicular'), point2: w(110, 'point', 2),
      ceiling: w(111, 'ceiling'), three: w(111, 'three'), high: w(111, 'high'), dist111: w(111, 'distance'),
      exercises: w(112, 'exercises'), construction: w(112, 'construction'), where: w(112, 'where'), foot: w(112, 'foot'), lands: w(112, 'lands'),
      perp113: w(113, 'perpendicular'), planes: w(113, 'planes'), earlier: w(113, 'earlier'), tools: w(113, 'tools'),
      end: L(113).end,
    };
    // toán trên hình: trần cao = độ dài dây dọi = ROOM.c = 3; QH ⊥ giao tuyến tường–sàn và ⊥ sàn
    this.H3 = must(`${len(sub(HOOK, FOOT))}`, 3); must(`${ROOM.c}`, 3);
    must(`${sub(Q, QF)[0]} + ${sub(Q, QF)[1]}`, 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.perp, kind: 'pen' }, { t: T.three, kind: 'tick' }, { t: T.where, kind: 'pen' }, { t: T.earlier, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min(Math.max(0, t - this.FROM) * 0.22, 5);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAM0, 0), P = cam.P;

    // hộp-phòng gấp vào + bóng trên bàn
    const kR = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.2));
    shadow(g, cam, C8, DESK_L, { a: 0.28 * kR, spread: 0.8 });
    room(g, cam, { k: kR });
    // sàn = mặt phẳng: tô nhạt + nhãn ở "plane"
    const kFl = prog(t, T.plane1, T.plane1 + 0.5);
    if (kFl > 0) { g.save(); g.fillStyle = C.inkA(0.07 * kFl); poly(g, ROOM.floor.map(P)); g.fill(); g.restore(); }
    // vũng đèn trần trên sàn
    const fl = ROOM.floor.map(P), pf = P(FOOT);
    g.save(); poly(g, fl); g.clip(); pool(g, pf[0], pf[1], 300, 0.55 * kR); g.restore();
    const pl = P([0.6, 0.5, 0]);
    label(g, 'floor', pl[0] + 10, pl[1] - 14, { size: 24, color: C.ink, k: kFl });
    // tường sau ⊥ sàn: tô nhạt ở "perpendicular planes"
    const kW = prog(t, T.perp113, T.perp113 + 0.5);
    if (kW > 0) { g.save(); g.fillStyle = C.inkA(0.06 * kW); poly(g, ROOM.back.map(P)); g.fill(); g.restore(); }

    // trần (mở) — nét đứt kẻ dần ở "ceiling"
    const kC = prog(t, T.ceiling, T.ceiling + 0.8);
    if (kC > 0) { const cs = ROOM.ceiling.map(P); for (let i = 0; i < 4; i++) line(g, cs[i], cs[(i + 1) % 4], C.inkA(0.55), 2.5, [8, 10], prog(kC, i / 4, (i + 1) / 4)); }

    // dây dọi từ móc đèn xuống sàn (ở "perpendicular … dropped")
    const kD = outCubic(prog(t, T.perp, T.perp + 1.3)), endZ = ROOM.c - ROOM.c * kD;
    const bobV = BOB_V0.map(v => add(v, [HOOK[0], HOOK[1], Math.max(endZ, 0) + 0.34]));
    if (kD > 0) shadow(g, cam, bobV, [HOOK[0] + 0.5, HOOK[1] - 0.5, 6], { a: 0.35, spread: 0.08, z0: 0.001 });
    // chao đèn trần
    thread(g, cam, HOOK, [HOOK[0], HOOK[1], ROOM.c - 0.1], { w: 3, k: kR });
    if (kR > 0) solid(g, cam, SHADE, SHADE_V, [HOOK[0] + 2, HOOK[1] - 3, 6], { k: kR, edgeW: 2.5 });
    if (kD > 0) {
      thread(g, cam, HOOK, [HOOK[0], HOOK[1], Math.max(endZ, 0) + 0.34], { w: 4 });
      solid(g, cam, BOB, bobV, [HOOK[0] + 2, HOOK[1] - 3, 6], { base: [192, 168, 130], k: 1, edgeW: 2, hidden: false });
    }
    dot3(g, cam, HOOK, { r: 8, k: prog(t, T.point1, T.point1 + 0.3) });
    const ph = P(HOOK);
    it(g, 'A', ph[0] + 18, ph[1] - 10, 54, C.ink, { k: prog(t, T.point1, T.point1 + 0.3) });
    // chân H + dấu vuông + "3 m"
    const kFt = prog(t, T.point2 + 0.3, T.point2 + 0.6);
    dot3(g, cam, FOOT, { r: 7, k: kFt });
    rightMark(g, cam, FOOT, [0, 0, 1], [1, 0, 0], 0.5, { k: kFt });
    const pm = P([HOOK[0], HOOK[1], 1.3]);
    it(g, `${this.H3} m`, pm[0] + 26, pm[1] + 10, 60, C.ink, { k: prog(t, T.three, T.three + 0.5) });

    // điểm Q trên tường sau — chân ở đâu? → trong tường kẻ ⊥ giao tuyến tường–sàn
    const kQ = prog(t, T.construction, T.construction + 0.3), pq = P(Q), pqf = P(QF);
    const kSure = prog(t, T.earlier, T.earlier + 0.8);
    if (kQ > 0) {
      // đoán chân: dây dọi nét đứt, dấu hỏi ở sàn (trước khi có công cụ)
      const kGuess = prog(t, T.where, T.where + 0.6) * (1 - kSure);
      line(g, pq, pqf, C.inkA(0.6 * (1 - kSure)), 3, [8, 10], kGuess);
      it(g, '?', pqf[0] - 14, pqf[1] + 54, 64, C.inkA(1 - kSure), { k: prog(t, T.foot, T.foot + 0.3) });
      // giao tuyến tường–sàn sáng lên, rồi QH ⊥ nó (trong tường) → ⊥ sàn
      line(g, P(ROOM.corners.lb0), P(ROOM.corners.rb0), C.ink, 5, [], prog(t, T.planes, T.planes + 0.7));
      line(g, pq, pqf, C.ink, 5, [], kSure);
      rightMark(g, cam, QF, [0, 0, 1], [1, 0, 0], 0.45, { k: prog(t, T.earlier + 0.6, T.earlier + 0.9) });
      rightMark(g, cam, QF, [0, 0, 1], [0, -1, 0], 0.45, { k: prog(t, T.tools, T.tools + 0.4) });
      dot3(g, cam, QF, { r: 7, k: prog(t, T.earlier + 0.7, T.earlier + 1.0) });
      dot3(g, cam, Q, { r: 8, k: kQ });
      it(g, 'Q', pq[0] + 16, pq[1] - 10, 54, C.ink, { k: kQ });
      it(g, 'H', pqf[0] + 16, pqf[1] + 52, 48, C.ink, { k: prog(t, T.earlier + 0.7, T.earlier + 1.1) });
    }

    // đèn bàn
    lamp(g, P([6, 2, 9])[0], 150, { on: 1 });

    // chữ trái-trên
    sectionTag(g, 'Act VI · a point and a plane', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'point → plane', 96, 250, 64, C.ink, { k: prog(t, T.point1, T.plane1 + 0.4) });
    it(g, '= length of the perpendicular', 96, 316, 46, C.ink, { wt: 500, k: prog(t, T.perp, T.point2 + 0.2) });
    it(g, `ceiling: ${this.H3} m`, 96, 388, 54, C.ink, { k: prog(t, T.high, T.high + 0.6) });
    label(g, 'where is the foot?', 1000, 250, { size: 28, color: C.ink, k: prog(t, T.foot, T.foot + 0.7) });
    formula(g, ['wall', { gap: 0.2 }, { perp: true }, 'floor'], 1000, 330, 54, C.ink, prog(t, T.perp113, T.planes + 0.4));

    // mascot compass bên phải, quanh câu 112
    const kf = prog(t, T.exercises - 0.2, T.exercises + 0.15) * (1 - prog(t, T.end - 4.2, T.end - 3.85));
    figure(g, 'compass', 1650, H, 720, kf);
  }
}
