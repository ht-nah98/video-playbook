// d3 · Two directions lock a plane — tờ P (chứa hai chỉ a, b cắt nhau) nằm trên tờ Q, song song. "One line isn't
// enough": b rút đi, P xoay quanh a như cánh cửa trên bản lề tới khi chạm Q → dải xé "ONE LINE" → "TWO CROSSING LINES";
// b trở lại, P xoay về, khoá cứng (snap). Hệ quả: mặt thứ ba R cắt cả hai theo hai nét song song.
import { C, prog, lookup, outCubic, smooth, ground, camLerp, sheet, sheetShadow, dot3, lamp, line, it, label, formula,
  sectionTag, poly, clamp, tornStrip, angleArc, measure, MONO, must } from '../kit.js';

const QS = [[-2.8, -1.8, 0], [2.8, -1.8, 0], [2.8, 2.6, 0], [-2.8, 2.6, 0]];
const ZP = 1.1, YA = 1.0, PX = 2.0, PY0 = -0.8, PY1 = 2.0;           // P: x ∈ [−2, 2], y ∈ [−0.8, 2], z = 1.1; bản lề a ở y = 1
const O = [0.2, YA, ZP], BA = 55 * Math.PI / 180, BD = [Math.cos(BA), Math.sin(BA), 0], TB0 = -1.7, TB1 = 1.1;
const TH = Math.asin(ZP / (YA - PY0));                                // góc cửa chạm Q: mép gần hạ xuống z = 0
const RY = z => -1.1 + z * (1.3 / ZP), RZ0 = -0.35, RZ1 = 1.75, RX0 = -1.6, RX1 = 1.9;   // mặt thứ ba R (chứa hướng x)
const CAM0 = { yaw: -34, pitch: 24, dist: 11.4, target: [0, 0.5, 0.55], cx: 1250, cy: 610 };
const CAM1 = { yaw: -18, pitch: 21, dist: 11.4, target: [0, 0.4, 0.6], cx: 1250, cy: 620 };
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));
const reveal = (t, segs, n) => segs.reduce((s, [a, b, c]) => s + prog(t, a, b) * c, 0) / n;
function chev(g, a, b, k, color = C.ink, u = 0.5) {
  if (k <= 0) return; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), ex = dx / l, ey = dy / l;
  [-9, 9].forEach(o => { const cx = a[0] + dx * u + ex * o, cy = a[1] + dy * u + ey * o;
    line(g, [cx - ex * 12 - ey * 11, cy - ey * 12 + ex * 11], [cx, cy], color, 3, [], k);
    line(g, [cx - ex * 12 + ey * 11, cy - ey * 12 - ex * 11], [cx, cy], color, 3, [], k); });
}

export default class Lock {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.START = L(52).start;
    this.FROM = Math.max(this.START - 1.2, L(51).end + 0.5);
    this.T = {
      parallel52: w(52, 'parallel'), planes52: w(52, 'planes'),
      plane53: w(53, 'plane', 1), crossing: w(53, 'crossing'), lines53: w(53, 'lines'), both: w(53, 'both'), par53: w(53, 'parallel', 1),
      second: w(53, 'second'), plane53b: w(53, 'plane', 2), then53: w(53, 'then'), par53b: w(53, 'parallel', 2),
      notice: w(54, 'notice'), cross: w(54, 'cross'),
      one: w(55, 'one'), isnt: w(55, "isn't"), swing: w(55, 'swing'), door: w(55, 'door'), hinge: w(55, 'hinge'), hits: w(55, 'hits'),
      two56: w(56, 'two'), different: w(56, 'different'), directions: w(56, 'directions'), both56: w(56, 'both'), locked: w(56, 'locked'),
      once: w(57, 'once'), consequence: w(57, 'consequence'),
      third: w(58, 'third'), both58: w(58, 'both'), cuts1: w(58, 'cuts', 1), cuts2: w(58, 'cuts', 2), two58: w(58, 'two'), par58: w(58, 'parallel'), end: L(58).end,
    };
    this.T.tear = this.T.hits + 0.3;
    // R cắt Q ở y = RY(0), cắt P ở y = RY(ZP): hai nét cùng hướng x (song song); cửa chạm Q đúng lúc θ = TH
    must(`${ZP - (YA - PY0) * Math.sin(TH)}`, 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.crossing, kind: 'pen' }, { t: T.swing, kind: 'flap' },
      { t: T.tear, kind: 'tear' }, { t: T.locked, kind: 'snap' }, { t: T.consequence, kind: 'flap' }, { t: T.cuts2, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const turn = smooth(prog(t, T.once, T.third + 0.4)), drift = clamp((t - this.FROM) * 0.22, 0, 5);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAM1, turn), P = cam.P;

    // cánh cửa: θ 0 → TH ("swing" … "hits"), rồi về 0 ("different" … "both"); P hạ xuống vị trí lúc mở cảnh
    const th = TH * (smooth(prog(t, T.swing, T.hits)) - smooth(prog(t, T.different, T.both56)));
    const lift = 1.6 * (1 - outCubic(prog(t, T.parallel52 - 0.2, T.planes52 + 0.6)));
    const PP = ([x, y]) => { const dy = y - YA; return [x, YA + dy * Math.cos(th), ZP + lift + dy * Math.sin(th)]; };
    const Pc = [[-PX, PY0], [PX, PY0], [PX, PY1], [-PX, PY1]].map(PP);
    const kQ = outCubic(prog(t, this.FROM + 0.3, S + 0.5)), kP = outCubic(prog(t, T.parallel52 - 0.2, T.planes52 + 0.2));

    // Q (mặt dưới) + bóng P trên Q
    sheetShadow(g, cam, QS.map(p => [p[0] * kQ, p[1], 0]), { a: 0.16 * kQ });
    const qc = sheet(g, cam, QS.map(p => [p[0] * kQ, p[1], 0]), { k: kQ });
    if (kQ >= 1 && bump(t, T.second) > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3 + 3 * bump(t, T.second); poly(g, qc); g.stroke(); g.restore(); }
    if (kP > 0) { g.save(); poly(g, qc); g.clip(); sheetShadow(g, cam, Pc.map(p => [p[0], p[1], 0]), { a: 0.22 * kP, dx: -0.2, dy: 0.15 }); g.restore(); }
    const pq = P([-2.6, -1.55, 0]); it(g, 'Q', pq[0] - 4, pq[1] + 20, 64, C.ink, { k: kQ });

    // R (mặt thứ ba) — phần dưới Q nét đứt, phần giữa, (P), phần trên
    const kR = outCubic(prog(t, T.consequence, T.cuts1)), rz = 2.4 * (1 - kR);
    const Rq = (z0, z1) => [[RX0, RY(z0), z0 + rz], [RX1, RY(z0), z0 + rz], [RX1, RY(z1), z1 + rz], [RX0, RY(z1), z1 + rz]];
    if (kR >= 1) { g.save(); g.strokeStyle = C.inkA(0.5); g.lineWidth = 2.2; g.setLineDash([9, 9]);
      poly(g, Rq(RZ0, 0).map(P)); g.stroke(); g.restore(); }
    const kC = prog(t, T.cuts2, T.cuts2 + 0.6), kC2 = prog(t, T.two58, T.two58 + 0.6);
    if (kR > 0) {
      sheet(g, cam, Rq(Math.max(0, -rz), ZP), { k: kR, fill: [236, 229, 214], thick: 0.04, edge: C.inkA(0.85) });
      const a = P([RX0, RY(0), 0]), b = P([RX1, RY(0), 0]);    // nét cắt trên Q
      line(g, a, b, C.ink, 7, [], kC2); chev(g, a, b, prog(t, T.par58, T.par58 + 0.3), C.ink, 0.7);
    }
    // P (mặt trên, chứa a và b)
    if (kP > 0) {
      const pc = sheet(g, cam, Pc, { k: kP });
      if (t >= T.locked) { const e = bump(t, T.locked, 0.7); if (e > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3 + 4 * e; poly(g, pc); g.stroke(); g.restore(); } }
      const pp = P(PP([-1.85, -0.6])); it(g, 'P', pp[0] - 4, pp[1] + 6, 64, C.ink, { k: kP });
    }
    // a (bản lề) và b (cắt a tại O)
    const kA = prog(t, T.crossing, T.crossing + 0.5), wA = 5 + 4 * bump(t, T.hinge);
    const a0 = P(PP([-1.9, YA])), a1 = P(PP([1.9, YA]));
    line(g, a0, a1, C.ink, wA, [], kA); chev(g, a0, a1, prog(t, T.par53, T.par53 + 0.3) * (1 - prog(t, T.one, T.one + 0.3)), C.ink, 0.78);
    const kB = prog(t, T.crossing + 0.25, T.lines53 + 0.2) * (1 - prog(t, T.one + 0.1, T.isnt + 0.3)) + prog(t, T.directions, T.directions + 0.5);
    const bp = u => P(PP([O[0] + BD[0] * u, O[1] + BD[1] * u]));
    const b0 = bp(TB0), b1 = bp(TB1), bo = bp(0);
    if (kB > 0) { const k = clamp(kB); line(g, [bo[0] + (b0[0] - bo[0]) * k, bo[1] + (b0[1] - bo[1]) * k], [bo[0] + (b1[0] - bo[0]) * k, bo[1] + (b1[1] - bo[1]) * k], C.ink, 5);
      chev(g, b0, b1, prog(t, T.par53, T.par53 + 0.3) * (t < T.directions ? 1 : prog(t, T.both56, T.both56 + 0.3)), C.ink, 0.25); }
    if (kA > 0) {
      const ex = th > 0.01 ? 0 : 1, kArc = prog(t, T.notice, T.cross) * (1 - prog(t, T.one, T.one + 0.3)) * ex;
      if (kArc > 0) angleArc(g, cam, PP([O[0], O[1]]), [1, 0, 0], BD, 0.5, { color: C.ink, fill: false, k: kArc });
      dot3(g, cam, PP([O[0], O[1]]), { r: 7 + 4 * bump(t, T.cross), k: kA });
      it(g, 'a', a1[0] + 14, a1[1] + 14, 60, C.ink, { k: kA });
      if (kB > 0.5) it(g, 'b', b1[0] + 12, b1[1] - 6, 60, C.ink);
    }
    // khoá: bốn cột đứt ngắn, bằng nhau, giữa hai mặt
    const kL = prog(t, T.locked, T.locked + 0.5);
    if (kL > 0) [[-1.8, -0.6], [1.8, -0.6], [1.8, 1.8], [-1.8, 1.8]].forEach(([x, y]) => line(g, P([x, y, ZP]), P([x, y, 0]), C.inkA(0.7), 2.5, [5, 7], kL));
    // R phần trên P + nét cắt trên P
    if (kR > 0) {
      sheet(g, cam, Rq(ZP, RZ1), { k: kR, fill: [236, 229, 214], thick: 0.04, edge: C.inkA(0.85) });
      const a = P([RX0, RY(ZP), ZP]), b = P([RX1, RY(ZP), ZP]);
      line(g, a, b, C.ink, 7, [], kC); chev(g, a, b, prog(t, T.par58, T.par58 + 0.3), C.ink, 0.7);
      const pr = P([RX1, RY(RZ1), RZ1 + rz]); it(g, 'R', pr[0] + 14, pr[1] + 10, 60, C.ink, { k: kR });
    }

    lamp(g, 1250, 150, { on: 1 });

    // chữ
    sectionTag(g, 'Act III · two directions lock a plane', prog(t, this.FROM + 0.3, this.FROM + 1));
    const F1 = ['a', { para: true }, 'Q', { gap: 0.4 }, 'b', { para: true }, 'Q'];
    formula(g, F1, 96, 230, 72, C.ink, reveal(t, [[T.both, T.par53 + 0.4, 3], [T.par53 + 0.3, T.plane53b + 0.3, 4]], F1.length));
    const F2 = ['→', { gap: 0.25 }, 'P', { para: true }, 'Q'];
    formula(g, F2, 96, 320, 72, C.ink, prog(t, T.then53, T.par53b + 0.5));
    // ONE LINE → dải xé → TWO CROSSING LINES
    label(g, 'one line', 96, 430, { size: 30, color: C.lead, k: prog(t, T.one, T.isnt + 0.3) });
    const wOne = measure(g, 'ONE LINE', `500 30px ${MONO}`) + 8 * 3;
    tornStrip(g, 82, 424, 112 + wOne, 410, prog(t, T.tear, T.tear + 0.35), { w: 36, seed: 3 });
    label(g, 'two crossing lines', 96, 486, { size: 30, color: C.ink, k: prog(t, T.two56, T.directions + 0.5) });
    // hệ quả
    it(g, 'a third plane cuts both', 96, 590, 46, C.lead, { wt: 500, k: prog(t, T.third, T.both58 + 0.4) });
    it(g, 'along two parallel lines', 96, 650, 46, C.ink, { wt: 500, k: prog(t, T.two58, T.par58 + 0.5) });
  }
}
