// f3 · A line and a plane (câu 89–96). Thang của f1 trong hộp-phòng (cùng hình học, plates/f1-between.js).
// Thang dựng đứng = vuông góc → 90°; trượt về: góc với BÓNG của nó (đèn thẳng xuống, bóng cam đậm).
// Công thức: chấm M trên thang → dây dọi xuống sàn (chân H) → tam giác vuông F·M·H cam đất → góc ≈ 53° (tính).
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, room, ROOM, shadow, line, dot3, rightMark, angleArc,
  goalTriangle, pool, lamp, it, label, sectionTag, add, sub, mul, dot, norm, lerp3 } from '../kit.js';
import { LADDER, ladderAxis, drawLadder } from './f1-between.js';

const DEG = 180 / Math.PI;
export const F3 = (() => {
  const A = ladderAxis(LADDER.phi0), M = lerp3(A.F, A.T, 0.7), Hh = [M[0], M[1], 0];
  return { ...A, M, H: Hh, S: [A.T[0], A.T[1], 0] };   // S = chân bóng của đỉnh thang
})();
// góc trên hình: từ tam giác F·M·H (toạ độ) — trạng thái xong
const u = norm(sub(F3.H, F3.F)), v = norm(sub(F3.M, F3.F));
export const F3_ANGLE = Math.round(Math.acos(dot(u, v)) * DEG);
must(`${F3_ANGLE}`, 53);
must(`${dot(sub(F3.M, F3.H), sub(F3.F, F3.H))}`, 0);   // góc vuông ở H

export default class LinePlane {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.START = L(89).start;
    this.FROM = Math.max(this.START - 1.2, L(88).end + 0.5);
    this.T = {
      second: w(89, 'second'), line89: w(89, 'line'), plane89: w(89, 'plane'),
      ladder: w(90, 'ladder'), wall: w(90, 'wall'), steep: w(90, 'steep'), ground: w(90, 'ground'),
      perp: w(91, 'perpendicular'), plane91: w(91, 'plane'), ninety: w(91, 'ninety'),
      otherwise: w(92, 'otherwise'), angle92: w(92, 'angle'), shadow92: w(92, 'shadow'), plane92: w(92, 'plane'),
      recipe: w(93, 'recipe'),
      point: w(94, 'point'), drop: w(94, 'drop'), plane94: w(94, 'plane'), lands: w(94, 'lands'), shadow94: w(94, 'shadow'),
      right: w(95, 'right'), triangle: w(95, 'triangle'), angle95: w(95, 'angle'),
      again: w(96, 'again'), shadow96: w(96, 'shadow'), center: w(96, 'center'), end: L(96).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ninety, kind: 'tick' }, { t: T.drop, kind: 'pen' }, { t: T.triangle + 0.8, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const yaw = 22 + Math.min(Math.max(0, t - this.FROM) * 0.3, 9);
    const cam = camera({ yaw, pitch: 17, dist: 8.0, target: [1.2, 1.5, 1.0], cx: 1260, cy: 620 });
    const P = cam.P;

    // hộp-phòng (đã có từ f1) — bóng mềm của hộp + hộp
    const kR = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.0));
    shadow(g, cam, [...ROOM.floor, ...ROOM.ceiling], [-2, 8, 40], { a: 0.16 * kR, spread: 0.8 });
    room(g, cam, { k: kR });

    // thang: φ0 → dựng đứng ở "perpendicular" → trượt về ở "otherwise"
    const upK = smooth(prog(t, T.perp, T.plane91 + 0.3)) - smooth(prog(t, T.otherwise, T.angle92 + 0.2));
    const phi = LADDER.phi0 + (Math.PI / 2 - LADDER.phi0) * upK;
    const A = ladderAxis(phi);
    const kLight = prog(t, T.shadow92 - 0.4, T.shadow92 + 0.2);
    // vũng sáng trên sàn quanh bóng (đèn thẳng xuống)
    if (kLight > 0) { g.save(); g.globalAlpha = kLight; const c = P(lerp3(F3.F, F3.S, 0.5)); pool(g, c[0], c[1], 300, 0.6); g.restore(); }
    // bóng thang = hình chiếu (cam đậm) — CHỈ khi đèn thẳng xuống
    const kSh = outCubic(prog(t, T.shadow92 - 0.1, T.shadow92 + 0.6));
    const pulse = 1 + 0.6 * Math.sin(Math.PI * prog(t, T.shadow96, T.shadow96 + 1.0));
    if (kSh > 0) {
      const pf = P(F3.F), ps = P(lerp3(F3.F, F3.S, kSh));
      for (let i = 0; i < 6; i++) line(g, pf, ps, C.terraA(0.10), (24 - i * 3.4) * pulse);
      line(g, pf, ps, C.terra, 6 * pulse + 3 * prog(t, T.shadow94, T.shadow94 + 0.4));
    }
    drawLadder(g, cam, phi, { k: kR, sh: 0.32 * (1 - kLight) });
    // đường thẳng = trục thang (chỉ mực, kéo dài nhẹ)
    const kLine = prog(t, T.line89, T.line89 + 0.6);
    line(g, P(A.F), P(add(A.T, mul(A.dir, 0.25))), C.ink, 4, [], kLine);
    // mặt phẳng = sàn: viền mực đậm lên ở "plane"
    const kPl = prog(t, T.plane89, T.plane89 + 0.6);
    if (kPl > 0) { g.save(); g.globalAlpha = kPl; g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath();
      ROOM.floor.map(P).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.stroke(); g.restore(); }
    const fl = P([3.2, 1.0, 0]);
    label(g, 'plane: the floor', fl[0], fl[1] + 4, { size: 26, align: 'right', color: C.ink, k: kPl });
    const tp = P(add(A.T, mul(A.dir, 0.25)));
    label(g, 'line', tp[0] + 22, tp[1] + 10, { size: 26, color: C.ink, k: kLine });

    // "how steep?" ở chân thang (câu 90) → 90° (câu 91)
    const kQ = prog(t, T.steep, T.steep + 0.4) * (1 - prog(t, T.perp, T.perp + 0.3));
    if (kQ > 0) { const m = angleArc(g, cam, A.F, [-1, 0, 0], A.dir, 0.6, { color: C.ink, k: kQ, fill: false }); it(g, '?', m[0] + 4, m[1] + 14, 60, C.ink, { k: kQ }); }
    const k90 = prog(t, T.ninety, T.ninety + 0.3) * (1 - prog(t, T.otherwise, T.otherwise + 0.3));
    if (k90 > 0) {
      rightMark(g, cam, A.F, [1, 0, 0], [0, 0, 1], 0.3, { k: k90, w: 3.5 });
      const q = P(add(A.F, [0.55, 0, 0.45])); it(g, '90°', q[0] + 6, q[1], 54, C.ink, { k: k90 });
    }
    // góc giữa thang và bóng
    const kA92 = prog(t, T.plane92, T.plane92 + 0.4) * (1 - prog(t, T.triangle, T.triangle + 0.4));
    if (kA92 > 0) { const m = angleArc(g, cam, F3.F, [-1, 0, 0], F3.dir, 0.6, { color: C.ink, k: kA92, fill: false }); it(g, '?', m[0] - 34, m[1] - 6, 60, C.ink, { k: kA92 }); }
    if (kSh > 0) { const s = P(lerp3(F3.F, F3.S, 0.5)); label(g, 'shadow', s[0] - 30, s[1] + 64, { align: 'center', size: 26, color: C.terraT, k: prog(t, T.shadow92 + 0.2, T.shadow92 + 0.8) }); }

    // công thức: chấm M → dây dọi → chân H → tam giác vuông
    goalTriangle(g, cam, F3.F, F3.M, F3.H, { k: prog(t, T.triangle, T.triangle + 0.8) });
    dot3(g, cam, F3.M, { r: 8, k: prog(t, T.point, T.point + 0.3) });
    const kDrop = outCubic(prog(t, T.drop, T.plane94 + 0.2));
    if (kDrop > 0) {
      const tip = lerp3(F3.M, F3.H, kDrop), pm = P(F3.M), pt = P(tip);
      line(g, pm, pt, C.ink, 2.5);
      g.save(); g.fillStyle = C.ink; g.beginPath(); g.moveTo(pt[0], pt[1] + 4); g.lineTo(pt[0] - 7, pt[1] - 12); g.lineTo(pt[0] + 7, pt[1] - 12); g.closePath(); g.fill(); g.restore();
    }
    dot3(g, cam, F3.H, { r: 7, k: prog(t, T.lands, T.lands + 0.3) });
    rightMark(g, cam, F3.H, [0, 0, 1], [1, 0, 0], 0.16, { k: prog(t, T.lands + 0.2, T.lands + 0.5), color: C.ink });
    const pM = P(F3.M), pH = P(F3.H), pF = P(F3.F);
    it(g, 'M', pM[0] - 100, pM[1] + 4, 48, C.ink, { k: prog(t, T.point, T.point + 0.3) });
    it(g, 'H', pH[0] - 46, pH[1] + 36, 48, C.ink, { k: prog(t, T.lands, T.lands + 0.3) });
    const kAng = prog(t, T.angle95, T.angle95 + 0.5);
    if (kAng > 0) { const m = angleArc(g, cam, F3.F, [-1, 0, 0], F3.dir, 0.5, { color: C.terra, w: 3.5, k: kAng, fill: false });
      it(g, `≈ ${F3_ANGLE}°`, pF[0] + 44, pF[1] + 18, 54, C.terraT, { k: kAng }); }

    // lời bên trái: tiêu đề, rồi công thức 3 bước
    it(g, 'line · plane', 96, 250, 64, C.ink, { k: prog(t, T.second, T.plane89 + 0.3) });
    label(g, 'the recipe', 96, 350, { size: 26, color: C.lead, k: prog(t, T.recipe, T.recipe + 0.5) });
    it(g, '1  a point on the line', 96, 412, 44, C.ink, { k: prog(t, T.point - 0.2, T.point + 0.8) });
    it(g, '2  drop a perpendicular', 96, 470, 44, C.ink, { k: prog(t, T.drop, T.plane94 + 0.3) });
    it(g, '3  solve the right triangle', 96, 528, 44, C.ink, { k: prog(t, T.right, T.triangle + 0.9) });
    it(g, 'the shadow, at the center again', 96, 620, 40, C.terraT, { wt: 500, k: prog(t, T.shadow96, T.center + 0.5) });

    lamp(g, 1240, 96, { s: 0.8, on: 0.35 + 0.65 * kLight });
    if (kLight > 0) label(g, 'light, straight down', 1190, 190, { size: 22, align: 'right', k: prog(t, T.shadow92 - 0.2, T.shadow92 + 0.5) });
    sectionTag(g, 'Act V · a line and a plane', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
