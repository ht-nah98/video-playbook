// e4 · Two planes at a right angle — sàn Q, tờ P gấp đứng lên theo giao tuyến m (dấu vuông, 90°); P chứa d ⊥ Q → P ⊥ Q;
// hộp-phòng: vách chứa các nét dọc ⊥ sàn. Hệ quả: kẻ e trong P, xoay tới khi e ⊥ m → e ⊥ cả Q (dấu vuông kép);
// đỉnh e là một điểm, đoạn e = khoảng cách tới Q (gợi hồi VI).
import { C, prog, lookup, outCubic, smooth, ground, pool, camLerp, sheet, sheetShadow, thread, dot3, rightMark, lamp, line,
  it, label, formula, sectionTag, poly, clamp, shadow, add, dot, room, ROOM, must } from '../kit.js';

const QS = [[-2.4, -1.4, 0], [2.4, -1.4, 0], [2.4, 2.2, 0], [-2.4, 2.2, 0]];
const YM = 1.0, PX = 2.2, PH = 2.3, LP = [-3, -4, 8];             // P đứng trên giao tuyến m (y = YM, z = 0)
const XD = 0.9, HD = 2.0, H = [-0.7, YM, 0], HE = 1.9;             // d (câu 74) ở x = XD; e (câu 77) chân H
const RA = 0.42, RAT = [7.5, -0.5, 0], RW = p => add(p.map(v => v * RA), RAT);   // hộp-phòng = e1
const CAM4 = { yaw: -32, pitch: 22, dist: 10.8, target: [0, 0.6, 0.9], cx: 1250, cy: 600 };
const CAMR = { yaw: -24, pitch: 30, dist: 9.4, target: add(RW([ROOM.a / 2, ROOM.b / 2, 0]), [0, 0, 0.5]), cx: 1250, cy: 600 };
const UP = [0, 0, 1], TOWARD = [0, -1, 0], ALONG = [1, 0, 0];
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));

export default class Planes {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e4');
    this.START = L(73).start;
    this.FROM = Math.max(this.START - 1.2, L(72).end + 0.5);
    this.T = {
      planes73: w(73, 'planes'), perp73: w(73, 'perpendicular'), angle: w(73, 'angle'), ninety: w(73, 'ninety'), degrees: w(73, 'degrees'),
      contains74: w(74, 'contains'), line74: w(74, 'line'), perp74: w(74, 'perpendicular', 1), plane74: w(74, 'plane', 2), then74: w(74, 'then'), perp74b: w(74, 'perpendicular', 2),
      wall: w(75, 'wall', 1), vertical: w(75, 'vertical'), each: w(75, 'each'), perp75b: w(75, 'perpendicular', 2), floor75: w(75, 'floor', 2),
      one76: w(76, 'one'), consequence: w(76, 'consequence'),
      draw: w(77, 'draw'), perp77b: w(77, 'perpendicular', 2), inter: w(77, 'intersection'),
      perp78: w(78, 'perpendicular'), whole: w(78, 'whole'), second: w(78, 'second'), plane78: w(78, 'plane'),
      shortcut: w(79, 'shortcut'), distance: w(79, 'distance'), problems: w(79, 'problems'), end: L(79).end,
    };
    // 90° tính từ hai hướng trong hai mặt, vuông với giao tuyến; e ⊥ m và e ⊥ hướng thứ hai trong Q
    this.DEG = Math.round(Math.acos(dot(TOWARD, UP)) * 180 / Math.PI);
    must(`${this.DEG}`, 90); must(`${dot(UP, ALONG)}`, 0); must(`${dot(UP, TOWARD)}`, 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.perp73, kind: 'flap' }, { t: T.line74, kind: 'pen' }, { t: T.wall + 0.2, kind: 'flap' }, { t: T.perp75b, kind: 'tick' },
      { t: T.draw, kind: 'pen' }, { t: T.inter + 0.1, kind: 'snap' }, { t: T.second, kind: 'tick' }, { t: T.distance, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const toRoom = smooth(prog(t, T.wall - 0.3, T.wall + 1.0)) * (1 - smooth(prog(t, T.one76 - 0.3, T.consequence + 0.5)));
    const drift = clamp((t - this.FROM) * 0.22, 0, 7);
    const cam = camLerp({ ...CAM4, yaw: CAM4.yaw + drift }, CAMR, toRoom), P = cam.P;

    // Q (sàn) gấp vào; P gấp ĐỨNG lên quanh m
    const kQ = outCubic(prog(t, this.FROM + 0.3, S + 0.6));
    const al = (8 + 82 * outCubic(prog(t, T.planes73, T.perp73 + 0.6))) * Math.PI / 180, kP = prog(t, T.planes73 - 0.2, T.planes73 + 0.2);
    const Pp = (x, s) => [x, YM + s * Math.cos(al), s * Math.sin(al)];
    const Pc = [Pp(-PX, 0), Pp(PX, 0), Pp(PX, PH), Pp(-PX, PH)];
    const qc0 = QS.map(p => [p[0] * kQ, p[1], 0]);
    sheetShadow(g, cam, qc0, { a: 0.16 * kQ });
    const qc = sheet(g, cam, qc0, { k: kQ });
    if (kP > 0) shadow(g, cam, Pc, LP, { a: 0.2 * kP, spread: 0.2 });
    const kGQ = prog(t, T.whole, T.whole + 0.6) * (1 - prog(t, T.shortcut, T.shortcut + 0.8));
    if (kGQ > 0) { g.save(); poly(g, qc); g.clip(); g.globalAlpha = kGQ * 0.85; const c = P([0, 0, 0]); pool(g, c[0], c[1], 520, 0.75); g.restore(); }
    const pq = P([-2.2, -1.15, 0]); it(g, 'Q', pq[0] - 6, pq[1] + 20, 64, C.ink, { k: kQ });

    // dấu vuông kép trên Q (vẽ trước P vì nằm phía trước m): d (câu 74) rồi e (câu 78)
    const kD = prog(t, T.line74, T.line74 + 0.6) * (1 - outCubic(prog(t, T.one76, T.consequence + 0.4)));
    rightMark(g, cam, [XD, YM, 0], TOWARD, UP, 0.32, { k: prog(t, T.perp74, T.perp74 + 0.3) * (kD > 0.5 ? 1 : 0) });
    const kE2 = prog(t, T.perp78, T.perp78 + 0.3);
    rightMark(g, cam, H, TOWARD, UP, 0.36, { k: kE2, w: 3.5 });
    // P (tờ thứ nhất) — đứng trên m
    if (kP > 0) {
      sheet(g, cam, Pc, { k: kP, fill: [244, 237, 222] });
      const pp = P(Pp(-PX + 0.25, PH - 0.3)); it(g, 'P', pp[0] + 4, pp[1] + 44, 64, C.ink, { k: kP });
    }
    // giao tuyến m (sáng lên khi lời nhắc "intersection")
    const ma = P([-PX, YM, 0]), mb = P([PX, YM, 0]);
    line(g, ma, mb, C.ink, 4 + 4 * bump(t, T.inter, 1.0) + 2 * prog(t, T.draw - 1.4, T.draw - 0.8), [], kP);
    it(g, 'm', mb[0] + 14, mb[1] + 26, 54, C.ink, { k: prog(t, T.draw - 1.4, T.draw - 0.8) });
    // dấu vuông giữa hai mặt + "90°"
    const H0 = [-1.75, YM, 0], kA = prog(t, T.angle, T.angle + 0.4) * (1 - prog(t, T.contains74, T.contains74 + 0.4));
    if (kA > 0) { rightMark(g, cam, H0, TOWARD, UP, 0.4, { k: kA, w: 3.5 });
      const p = P(add(H0, [0, -0.45, 0.45])); it(g, `${this.DEG}°`, p[0] - 110, p[1] - 6, 54, C.ink, { k: prog(t, T.ninety, T.degrees + 0.3) }); }
    // d trong P (xanh ngọc = vật đang xét), ⊥ Q; dấu vuông với m
    if (kD > 0) {
      thread(g, cam, [XD, YM, 0], [XD, YM, HD * kD], { color: `rgb(${C.teal.join(',')})`, w: 6 });
      rightMark(g, cam, [XD, YM, 0], ALONG, UP, 0.3, { k: prog(t, T.perp74, T.perp74 + 0.3) * (kD > 0.5 ? 1 : 0) });
      const p = P([XD, YM, HD * kD]); it(g, 'd', p[0] + 14, p[1] + 10, 60, C.tealT, { k: kD });
    }
    // e: kẻ xiên trong P, xoay tới khi ⊥ m
    const kE = prog(t, T.draw, T.draw + 0.6), be = (45 + 45 * smooth(prog(t, T.perp77b, T.inter + 0.2))) * Math.PI / 180;
    if (kE > 0) {
      const e1 = [H[0] + HE * Math.cos(be) * kE, YM, HE * Math.sin(be) * kE];
      thread(g, cam, H, e1, { color: `rgb(${C.teal.join(',')})`, w: 6 });
      rightMark(g, cam, H, ALONG, UP, 0.32, { k: prog(t, T.inter, T.inter + 0.3) });
      dot3(g, cam, H, { r: 6 });
      const p = P(e1); it(g, 'e', p[0] + 14, p[1] + 8, 60, C.tealT);
      const kDist = prog(t, T.distance, T.distance + 0.5);
      if (kDist > 0) { dot3(g, cam, e1, { r: 9, k: kDist }); label(g, 'distance to Q', p[0] + 50, p[1] + 60, { size: 24, color: C.ink, k: kDist }); }
    }

    // hộp-phòng (= e1): vách sau chứa các nét dọc, mỗi nét ⊥ sàn
    if (toRoom > 0) {
      sheetShadow(g, cam, ROOM.floor.map(RW), { a: 0.2 });
      room(g, cam, { scale: RA, at: RAT });
      [2, 4, 6, 8, 10].forEach((x, i) => {
        const a = RW([x, ROOM.b, 0]), b = RW([x, ROOM.b, ROOM.c]);
        line(g, P(a), P(b), C.ink, 3.5, [], prog(t, T.vertical + i * 0.12, T.vertical + i * 0.12 + 0.5));
        rightMark(g, cam, a, TOWARD, UP, 0.24, { k: prog(t, T.each + i * 0.18, T.each + i * 0.18 + 0.3), w: 2.5 });
      });
      const wt = P(RW([0.5, ROOM.b, ROOM.c]));
      formula(g, ['wall', { perp: true }, 'floor'], wt[0] - 20, wt[1] - 30, 44, C.ink, prog(t, T.wall, T.wall + 1.2));
    }

    lamp(g, 1250, 150, { on: 1 });

    // chữ
    sectionTag(g, 'Act IV · two planes at a right angle', prog(t, this.FROM + 0.3, this.FROM + 1));
    formula(g, ['P', { perp: true }, 'Q'], 96, 240, 72, C.ink, prog(t, T.perp73, T.perp73 + 0.6));
    label(g, `angle = ${this.DEG}°`, 96, 300, { size: 26, color: C.ink, k: prog(t, T.ninety, T.degrees + 0.4) });
    const F1 = ['d', { gap: 0.2 }, 'in P,', { gap: 0.4 }, 'd', { perp: true }, 'Q'];
    formula(g, F1, 96, 400, 64, C.ink, prog(t, T.contains74, T.plane74 + 0.4));
    formula(g, ['→', { gap: 0.25 }, 'P', { perp: true }, 'Q'], 96, 480, 64, C.ink, prog(t, T.then74, T.perp74b + 0.5));
    formula(g, ['e', { gap: 0.2 }, 'in P,', { gap: 0.4 }, 'e', { perp: true }, 'm'], 96, 590, 64, C.ink, prog(t, T.draw, T.inter + 0.5));
    formula(g, ['→', { gap: 0.25 }, 'e', { perp: true }, 'Q'], 96, 670, 64, C.ink, prog(t, T.perp78, T.plane78 + 0.4));
    label(g, 'a shortcut for perpendiculars', 96, 760, { size: 24, k: prog(t, T.shortcut, T.shortcut + 1.2) });
    label(g, 'needed again for distance', 96, 800, { size: 24, k: prog(t, T.distance, T.problems + 0.6) });
  }
}
