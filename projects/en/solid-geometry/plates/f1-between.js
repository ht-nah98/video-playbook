// f1 · In between — MỞ HỒI V "ACT FIVE · Angles · ANSWERS 2" (câu 80–82).
// Hộp-phòng (ROOM 12 × 4 × 3): song song (mép sàn ∥ mép trên tường), vuông góc (góc tường dọc ⊥ sàn), quạt "ở giữa";
// THANG dựa tường trước mặt (y = 4) trượt chân ra rồi đứng yên; góc ở chân "?"; ba thẻ chữ A: ba loại góc.
// Thang + hàm vẽ được f3 (thang trong phòng) và f5 (thu nhỏ) dùng lại — CÙNG hình học (DNA §11).
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, room, ROOM, solid, shadow, box, thread, line,
  rightMark, angleArc, lamp, dark, it, label, formula, tentCard, actCard, sectionTag, add, sub, mul, cross3, len, norm,
  lerp3, centroid } from '../kit.js';

// ── thang (vật cục bộ — báo đạo diễn gom vào kit) ──
const BEAM = box(1, 1, 1);
/** Thanh gỗ/bìa hộp chữ nhật từ a tới b, tiết diện w × h (đỉnh theo topo của BEAM, dùng với solid(BEAM, …)). */
export function beam(a, b, w, h, up = [0, 0, 1]) {
  const e = sub(b, a); let s = cross3(e, up); if (len(s) < 1e-9) s = cross3(e, [1, 0, 0]);
  s = mul(norm(s), w); const n = mul(norm(cross3(s, e)), h);
  return BEAM.V.map(([x, y, z]) => add(add(add(a, mul(e, x)), mul(s, y - 0.5)), mul(n, z - 0.5)));
}
/** Thang dựa TƯỜNG BÊN (x = 0) của hộp-phòng: dài 2.5, rộng 0.56, ở y = 1.6. φ = góc với sàn; đỉnh luôn chạm tường. */
export const LADDER = { y: 1.6, wall: 0.04, len: 2.5, width: 0.56, rungs: 7, phi0: Math.atan2(2.0, 1.5) };
must(`Math.hypot(1.5, 2.0)`, LADDER.len);
export const ladderAxis = (phi = LADDER.phi0) => {
  const { y, wall, len: l } = LADDER;
  return { F: [wall + l * Math.cos(phi), y, 0], T: [wall, y, l * Math.sin(phi)], dir: [-Math.cos(phi), 0, Math.sin(phi)] };
};
/** Đèn của các cảnh trong phòng: cao, lệch về phía tường bên (bóng đổ ra xa tường, gần như thẳng xuống). */
export const ROOM_LIGHT = [-3, 1.2, 16];
/** Vẽ thang (bóng mềm trước, rồi thanh xa → gần). k = độ đặc (vào), sh = độ đậm bóng mềm. */
export function drawLadder(g, cam, phi, { k = 1, sh = 0.32, L = ROOM_LIGHT } = {}) {
  if (k <= 0) return ladderAxis(phi);
  const A = ladderAxis(phi), hw = LADDER.width / 2, ey = [0, 1, 0], parts = [];
  for (const s of [-1, 1]) parts.push(beam(add(A.F, mul(ey, s * hw)), add(A.T, mul(ey, s * hw)), 0.075, 0.075, ey));
  for (let i = 0; i < LADDER.rungs; i++) { const c = lerp3(A.F, A.T, 0.1 + i * 0.13); parts.push(beam(add(c, mul(ey, -hw)), add(c, mul(ey, hw)), 0.05, 0.05)); }
  parts.forEach(P3 => shadow(g, cam, P3, L, { a: sh * k, spread: 0.18 }));
  parts.map(P3 => ({ P3, z: cam.P(centroid(P3))[2] })).sort((a, b) => b.z - a.z)
    .forEach(({ P3 }) => solid(g, cam, BEAM, P3, L, { k, edgeW: 2, hidden: false }));
  return A;
}
const DEG = 180 / Math.PI;

export default class Between {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.START = L(80).start;
    this.FROM = Math.max(this.START - 2.6, L(79).end + 0.5);
    this.T = {
      para: w(80, 'parallel'), perp: w(80, 'perpendicular'), measure: w(80, 'measure'), between: w(80, 'between'),
      ladder: w(81, 'ladder'), leaning: w(81, 'leaning'), floor: w(81, 'floor'),
      three: w(82, 'three'), kinds: w(82, 'kinds'), angle: w(82, 'angle'), end: L(82).end,
    };
    // đèn chớp tắt–bật 0.3 s: START − 2.4 rơi trước FROM (cảnh trước kết muộn) → ngay sau khi lật tờ xong
    this.T.flick = Math.max(this.START - 2.4, this.FROM + 0.95);
    must(`${Math.round(LADDER.phi0 * DEG)}`, 53);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.flick + 0.1, kind: 'shimmer' }, { t: T.measure, kind: 'pen' },
      { t: T.three, kind: 'tick' }, { t: T.three + 0.3, kind: 'tick' }, { t: T.three + 0.6, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const kR = outCubic(prog(t, this.START - 0.15, this.START + 0.9));
    const up = smooth(prog(t, T.three - 0.5, T.three + 0.4));
    const yaw = 14 + Math.min(Math.max(0, t - this.START) * 0.9, 9);
    const zm = smooth(prog(t, T.ladder - 0.7, T.leaning + 0.6));
    const cam = camera({ yaw, pitch: 28 - 4 * up, dist: 15.5 + 4 * (1 - kR) - 4.5 * zm, target: lerp3([4.4, 2, 1.0], [3.0, 1.8, 1.2], zm), cx: 1240, cy: 600 - 110 * up });
    const P = cam.P;

    // hộp-phòng gấp vào
    if (kR > 0) {
      const R8 = [...ROOM.floor, ...ROOM.ceiling];
      shadow(g, cam, R8, [-2, 8, 40], { a: 0.16 * kR, spread: 0.8 });
      room(g, cam, { k: kR });
      // song song: mép sàn sau ∥ mép trên tường trước mặt
      const kP = prog(t, T.para, T.para + 0.6);
      const [e0, e1] = ROOM.edges.topFront;
      line(g, P(ROOM.corners.lb0), P(ROOM.corners.rb0), C.ink, 6, [], kP);
      line(g, P(e0), P(e1), C.ink, 6, [], kP);
      // vuông góc: cạnh dọc góc xa ⊥ sàn
      const kQ = prog(t, T.perp, T.perp + 0.5);
      const [v0, v1] = ROOM.edges.farVertical;
      line(g, P(v0), P(v1), C.ink, 6, [], kQ);
      rightMark(g, cam, v0, [0, 0, 1], [1, 0, 0], 0.55, { k: prog(t, T.perp + 0.3, T.perp + 0.6) });
      // "everything in between": quạt tia giữa nằm ngang và thẳng đứng, trên tường trước mặt
      const kB = prog(t, T.measure, T.between + 0.5), O = [6.2, ROOM.b - 0.02, 0];
      if (kB > 0) {
        angleArc(g, cam, O, [1, 0, 0], [0, 0, 1], 1.6, { color: C.ink, w: 3, k: kB, fill: false });
        [15, 30, 45, 60, 75].forEach((a, i) => { const r = a / DEG, d = [Math.cos(r), 0, Math.sin(r)];
          line(g, P(O), P(add(O, mul(d, 2.1))), C.inkA(0.55), 2, [6, 8], prog(t, T.measure + 0.12 * i, T.measure + 0.12 * i + 0.4)); });
      }
    }
    // thang: dựng sát tường rồi trượt chân ra tới φ0 (≈ 53°)
    const kL = prog(t, T.ladder - 0.05, T.ladder + 0.25);
    const slide = smooth(prog(t, T.ladder + 0.1, T.leaning + 0.7));
    const phi = Math.PI / 2 - (Math.PI / 2 - LADDER.phi0) * slide;
    const A = drawLadder(g, cam, phi, { k: kL });
    if (t >= T.floor) {
      const mid = angleArc(g, cam, A.F, [-1, 0, 0], A.dir, 0.8, { color: C.ink, w: 3, k: prog(t, T.floor, T.floor + 0.4), fill: false });
      it(g, '?', mid[0] - 10, mid[1] + 18, 60, C.ink, { k: prog(t, T.floor + 0.2, T.floor + 0.5) });
    }

    // lời bên trái: hai chữ đã biết, rồi "ở giữa"
    const ys = [250, 330], kP1 = prog(t, T.para, T.para + 0.6), kP2 = prog(t, T.perp, T.perp + 0.7);
    if (kP1 > 0) { const wp = formula(g, [{ para: true }], 96, ys[0], 54, C.ink, 1); it(g, 'parallel', 96 + wp + 14, ys[0], 54, C.ink, { k: kP1 }); }
    if (kP2 > 0) { const wq = formula(g, [{ perp: true }], 96, ys[1], 54, C.ink, 1); it(g, 'perpendicular', 96 + wq + 14, ys[1], 54, C.ink, { k: kP2 }); }
    it(g, '…and everything in between', 96, 420, 46, C.lead, { wt: 500, k: prog(t, T.measure, T.between + 0.6) });
    it(g, 'how steep?', 96, 500, 54, C.ink, { k: prog(t, T.ladder, T.floor + 0.3) });

    // ba thẻ chữ A: ba loại góc
    const cards = [['1', 'line · line'], ['2', 'line · plane'], ['3', 'plane · plane']];
    cards.forEach(([n, s], i) => tentCard(g, 300 + i * 470, 1010, 400, 190, n, [s], prog(t, T.three + 0.3 * i, T.three + 0.3 * i + 0.55), { size: 40 }));

    // đèn trên cùng; thẻ hồi; biển mục
    const flick = 1 - Math.sin(Math.PI * prog(t, T.flick, T.flick + 0.3));
    lamp(g, 1230, 96, { s: 0.8, on: 0.55 * (t < T.flick ? 0 : flick) });
    actCard(g, t, this.START, 'ACT FIVE', 'Angles', 'ANSWERS 2');
    sectionTag(g, 'Act V · in between', prog(t, this.START, this.START + 0.7));
    dark(g, flick);
  }
}
