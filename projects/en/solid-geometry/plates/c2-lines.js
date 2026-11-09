// c2 · Two lines — ba bối cảnh nối nhau bằng trượt (vật rời khung bằng chuyển động):
//  A. trang phẳng: cắt / song song → "in space" camera ngả xuống, sợi thứ hai nhấc lên và xoay → CHÉO NHAU; bóng hai sợi
//     cắt nhau mà sợi không chạm (vạch hở thẳng đứng); bóng ma song song lệch hướng; tờ bìa xoay quanh sợi 1 không
//     bao giờ chứa được sợi 2 (chỉ xuyên qua một điểm).
//  B. hộp-phòng: ROOM.edges.topFront (mực) + nearVertical (ngọc) = chéo; "careful": farVertical → "skew?" bị dải xé
//     dán lên → "THEY MEET" (tear ×1), chấm ở góc lb1; "that pair crosses" (snap).
//  C. cầu vượt: đường dưới + mặt cầu trên trụ; hai tim đường chéo nhau; hai xe giấy chạy qua nhau.
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, sheet, sheetShadow, shadow, solid, thread, dot3,
  lamp, line, it, label, sectionTag, tornStrip, room, ROOM, box, rgb, poly, shadowPt, add, sub, mul, dot, norm, cross3, len,
  lerp3, measure, MONO } from '../kit.js';

// ── A: trang phẳng ──
const PAGE = [[-3.2, -2.1, 0], [3.2, -2.1, 0], [3.2, 2.1, 0], [-3.2, 2.1, 0]];
const A1 = [-2.8, -0.9, 0], B1 = [2.8, 0.9, 0], D1 = norm(sub(B1, A1));
const CROSS2 = [[-1.3, 1.8, 0], [1.3, -1.8, 0]];
const PAR2 = [[-2.4, 0.2, 0], [2.0, 0.2 + 4.4 * 0.9 / 2.8, 0]];
const ZS = 1.5, SKEW2 = [[-1.0, 1.9, ZS], [1.4, -1.7, ZS]];
const LA = [0.6, 1.0, 9];
const CAMA0 = { yaw: -18, pitch: 52, dist: 13, target: [0, 0, 0.3], cx: 1220, cy: 610 };
const CAMA1 = { yaw: 16, pitch: 22, dist: 13.5, target: [0, 0, 0.7], cx: 1220, cy: 600 };
// ── B: hộp-phòng ──
const LB = [5, 5, 30];
const CAMB = { yaw: 24, pitch: 27, dist: 26, target: [6, 2, 1.2], cx: 1190, cy: 640 };
const ROOMV = [ROOM.corners.lf0, ROOM.corners.rf0, ROOM.corners.rb0, ROOM.corners.lb0, ROOM.corners.lf1, ROOM.corners.rf1, ROOM.corners.rb1, ROOM.corners.lb1];
// ── C: cầu vượt ──
const LC = [1.5, 2.5, 10], DZ = 1.2;
const CAMC = { yaw: -32, pitch: 30, dist: 15.5, target: [0, 0, 0.5], cx: 1210, cy: 640 };
const ROAD = [[-5, -0.8, 0.005], [5, -0.8, 0.005], [5, 0.8, 0.005], [-5, 0.8, 0.005]];
const DECK = z => [[-0.75, -4.2, z], [0.75, -4.2, z], [0.75, 4.2, z], [-0.75, 4.2, z]];
const PILLARS = [-3.6, -1.6, 1.6, 3.6];
const CAR = box(0.62, 0.34, 0.26), CARV = box(0.34, 0.62, 0.26);

/** khoảng cách gần nhất giữa hai đường (điểm, hướng) */
const skewGap = (p, u, q, v) => { const n = cross3(u, v); return Math.abs(dot(sub(q, p), n)) / len(n); };
/** mũi tên phẳng ở đầu b, hướng a→b */
function arrowHead(g, a, b, color, s = 18) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  g.save(); g.fillStyle = color; g.beginPath(); g.moveTo(b[0], b[1]);
  g.lineTo(b[0] - s * Math.cos(ang - 0.4), b[1] - s * Math.sin(ang - 0.4)); g.lineTo(b[0] - s * Math.cos(ang + 0.4), b[1] - s * Math.sin(ang + 0.4)); g.closePath(); g.fill(); g.restore();
}
/** bóng mềm của sợi chỉ (không phải hình chiếu đang nói → cam nhạt) */
function threadShadow(g, cam, a, b, L, k = 1, z0 = 0) {
  if (k <= 0) return; const pa = cam.P(shadowPt(a, L, z0)), pb = cam.P(shadowPt(b, L, z0));
  for (let i = 0; i < 4; i++) line(g, pa, pb, C.terraA(0.07 * k), 16 - i * 4);
}
const TEAL = rgb(C.teal);

export default class Lines {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      flat: w(24, 'flat'), two: w(24, 'two', 1), cross: w(24, 'cross'), par: w(24, 'parallel'),
      space: w(25, 'space'), third: w(25, 'third'), appears: w(25, 'appears'), skew: w(25, 'skew'),
      dont: w(26, "don't"), cross26: w(26, 'cross'), par26: w(26, 'parallel'), single: w(26, 'single'), both: w(26, 'both'), end26: L(26).end,
      room: w(27, 'room'), find: w(27, 'find'),
      top: w(28, 'top'), edge28: w(28, 'edge', 1), side: w(28, 'side'), nearest: w(28, 'nearest'), meets: w(28, 'meets'), behind: w(28, 'behind'),
      never: w(29, 'never'), par29: w(29, 'parallel'), sideways: w(29, 'sideways'), straight: w(29, 'straight'), up: w(29, 'up'),
      careful: w(30, 'careful'), far: w(30, 'far'), corner: w(30, 'corner', 1), meet30: w(30, 'meet'), right: w(30, 'right'), crosses: w(30, 'crosses'),
      another: L(31).start, highway: w(31, 'highway'), overpass: w(31, 'overpass'),
      line1: w(32, 'line', 1), line2: w(32, 'line', 2), under: w(32, 'underneath'), skew32: w(32, 'skew'),
      thats: L(33).start, cars: w(33, 'cars'), over: w(33, 'over'), colliding: w(33, 'colliding'),
    };
    this.START = L(24).start;
    this.FROM = Math.max(this.START - 1.2, L(23).end + 0.5);
    const T = this.T;
    this.SW = { aOut: T.end26 + 0.25, bIn: T.end26 + 0.4, bOut: L(30).end + 0.15, cIn: L(30).end + 0.35 };
    // toán trên hình (trạng thái xong): sợi 2 nhấc lên cách sợi 1 > 0 (không cắt), hướng khác (không song song);
    // hai cạnh phòng chéo: khoảng cách = 4 (bề sâu phòng); cặp góc xa có điểm chung lb1; hai tim đường cách nhau DZ
    must(`${skewGap(A1, D1, SKEW2[0], norm(sub(SKEW2[1], SKEW2[0])))} > 0.5`, true);
    must(`${len(cross3(D1, norm(sub(SKEW2[1], SKEW2[0]))))} > 0.5`, true);
    const [t0, t1] = ROOM.edges.topFront, [n0, n1] = ROOM.edges.nearVertical, [f0, f1] = ROOM.edges.farVertical;
    must(`${skewGap(t0, norm(sub(t1, t0)), n0, norm(sub(n1, n0)))}`, ROOM.b);
    must(`'${f1.join()}' === '${t0.join()}'`, true);
    must(`${skewGap([0, 0, 0], [1, 0, 0], [0, 0, DZ], [0, 1, 0])}`, DZ);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.cross, kind: 'pen' }, { t: T.single, kind: 'flap' }, { t: T.top, kind: 'pen' }, { t: T.nearest, kind: 'pen' },
      { t: T.sideways, kind: 'pen' }, { t: T.meet30, kind: 'tear' }, { t: T.crosses + 0.45, kind: 'snap' },
      { t: T.overpass + 0.75, kind: 'flap' }, { t: T.skew32, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, SW = this.SW;
    ground(g);
    lamp(g, 1270, 150, { on: 1 });
    sectionTag(g, 'Act II · two lines', prog(t, this.FROM + 0.3, this.FROM + 1));
    const xA = -outCubic(prog(t, SW.aOut, SW.aOut + 0.8)) * 1500;
    if (xA > -1500) { g.save(); g.translate(xA, 0); this.page(g, t); g.restore(); }
    const xB = t < SW.bOut ? (1 - outCubic(prog(t, SW.bIn, SW.bIn + 0.8))) * 1400 : -outCubic(prog(t, SW.bOut, SW.bOut + 0.8)) * 1600;
    if (t > SW.bIn && xB > -1600) { g.save(); g.translate(xB, 0); this.room(g, t); g.restore(); }
    const xC = (1 - outCubic(prog(t, SW.cIn, SW.cIn + 0.8))) * 1400;
    if (t > SW.cIn) { g.save(); g.translate(xC, 0); this.bridge(g, t); g.restore(); }
  }

  // ── A: trang phẳng → không gian ──
  page(g, t) {
    const T = this.T;
    const up = smooth(prog(t, T.space - 0.1, T.space + 1.3)), drift = Math.max(0, t - T.space - 1.3) * 1.2;
    const cam = camLerp2(CAMA0, { ...CAMA1, yaw: CAMA1.yaw + Math.min(drift, 6) }, up, t, this.FROM), P = cam.P;
    const kS = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.1));
    const pageC = PAGE.map(p => [p[0] * (0.4 + 0.6 * kS), p[1] * (0.4 + 0.6 * kS), 0]);
    sheetShadow(g, cam, pageC, { a: 0.2 * kS });
    sheet(g, cam, pageC, { k: kS });
    // sợi 1 (mực, nằm trên trang)
    const k1 = prog(t, T.two, T.two + 0.6);
    thread(g, cam, A1, B1, { w: 6, k: k1 });
    // sợi 2 (ngọc): cắt → song song → nhấc lên & xoay (chéo)
    const kC = prog(t, T.cross, T.cross + 0.45), kP = smooth(prog(t, T.par, T.par + 0.6)), kU = smooth(prog(t, T.space + 0.1, T.appears + 0.5));
    let a2 = lerp3(CROSS2[0], PAR2[0], kP), b2 = lerp3(CROSS2[1], PAR2[1], kP);
    a2 = lerp3(a2, SKEW2[0], kU); b2 = lerp3(b2, SKEW2[1], kU);
    if (kU > 0) threadShadow(g, cam, a2, b2, LA, kU);
    // tờ bìa thử chứa cả hai: bản lề quanh sợi 1, xoay 0 → 165°
    const kQ = prog(t, T.single - 0.1, T.both + 0.3), th = smooth(kQ) * 165 * Math.PI / 180;
    const nA = [-D1[1], D1[0], 0], nT = add(mul(nA, Math.cos(th)), [0, 0, Math.sin(th)]);
    const QW = 2.0, Q = [add(A1, mul(D1, -0.1)), add(B1, mul(D1, 0.1)), add(add(B1, mul(D1, 0.1)), mul(nT, QW)), add(add(A1, mul(D1, -0.1)), mul(nT, QW))];
    const N = cross3(D1, nT), sideCam = Math.sign(dot(N, sub(cam.pos, A1)));
    // điểm xuyên của sợi 2 qua tờ bìa (nếu nằm trong tờ)
    let X = null; if (kQ > 0) { const den = dot(N, sub(b2, a2)); if (Math.abs(den) > 1e-6) { const s = dot(N, sub(A1, a2)) / den;
      const x = lerp3(a2, b2, s), u = dot(sub(x, A1), D1), v = dot(sub(x, A1), nT); if (s > 0 && s < 1 && u > -0.1 && u < 5.97 && v > 0 && v < QW) X = { x, s }; } }
    const draw2 = (p, q, k = 1) => thread(g, cam, p, q, { color: TEAL, w: 6, k });
    if (kC > 0) {
      if (kQ > 0 && kQ < 1.2) {
        const sa = Math.sign(dot(N, sub(a2, A1)));
        const mid = X ? X.x : null;
        // phần sau tờ bìa trước, tờ bìa, phần trước tờ bìa
        if (mid) { if (sa !== sideCam) draw2(a2, mid); else draw2(mid, b2); } else if (sa !== sideCam) draw2(a2, b2);
        sheet(g, cam, Q, { alpha: 0.62, thick: 0.03 });
        if (mid) { if (sa === sideCam) draw2(a2, mid); else draw2(mid, b2); dot3(g, cam, mid, { r: 9, color: C.ink, k: 1 }); }
        else if (sa === sideCam) draw2(a2, b2);
      } else draw2(a2, b2, kC);
    }
    // "don't cross": vạch hở thẳng đứng từ sợi 1 lên sợi 2 (ở chỗ hai hình chiếu cắt nhau)
    const kG = prog(t, T.cross26, T.cross26 + 0.5);
    if (kG > 0 && kU >= 1) {
      const d2 = sub(b2, a2), den = D1[0] * d2[1] - D1[1] * d2[0], s = ((a2[0] - A1[0]) * d2[1] - (a2[1] - A1[1]) * d2[0]) / den;
      const lo = add(A1, mul(D1, s)), r = ((lo[0] - a2[0]) * d2[0] + (lo[1] - a2[1]) * d2[1]) / (d2[0] ** 2 + d2[1] ** 2), hi = lerp3(a2, b2, r);
      line(g, P(lo), P(hi), C.ink, 3, [3, 9], kG);
      const m = P(lerp3(lo, hi, 0.5)); label(g, 'gap', m[0] - 16, m[1] + 8, { align: 'right', size: 28, color: C.ink, k: kG });
      // "aren't parallel": bóng ma của sợi 1 đưa lên cùng độ cao, lệch hướng với sợi 2
      const kH = prog(t, T.par26, T.par26 + 0.6);
      if (kH > 0) line(g, P(add(hi, mul(D1, -2.2))), P(add(hi, mul(D1, 2.2))), C.inkA(0.5), 3, [12, 10], kH);
    }
    // nhãn phẳng cạnh điểm chiếu
    const pB1 = P(B1), pb2 = P(b2), pa2 = P(a2);
    it(g, 'm', pB1[0] + 14, pB1[1] + 14, 54, C.ink, { k: k1 });
    if (kC > 0) it(g, 'n', pa2[0] - 46, pa2[1] + 10, 54, C.tealT, { k: kC });
    void pb2;
    // chữ trái
    label(g, 'on a flat page', 96, 200, { size: 28, k: prog(t, T.flat, T.flat + 0.5) });
    it(g, '1  cross', 96, 280, 60, C.ink, { k: prog(t, T.cross, T.cross + 0.4) });
    it(g, '2  parallel', 96, 350, 60, C.ink, { k: prog(t, T.par, T.par + 0.5) });
    label(g, 'in space', 96, 440, { size: 28, k: prog(t, T.space, T.space + 0.4) });
    it(g, '3  skew', 96, 520, 72, C.tealT, { k: prog(t, T.skew, T.skew + 0.45) });
    label(g, "don't cross", 96, 580, { size: 28, color: C.ink, k: prog(t, T.dont, T.cross26 + 0.3) });
    label(g, 'not parallel', 96, 625, { size: 28, color: C.ink, k: prog(t, T.par26, T.par26 + 0.5) });
    label(g, 'no plane holds both', 96, 670, { size: 28, color: C.ink, k: prog(t, T.single, T.both + 0.2) });
  }

  // ── B: hộp-phòng ──
  room(g, t) {
    const T = this.T, cam = camera({ ...CAMB, yaw: CAMB.yaw + Math.min(Math.max(0, t - this.SW.bIn) * 0.35, 6) }), P = cam.P;
    shadow(g, cam, ROOMV, LB, { a: 0.16, spread: 0.6 });
    room(g, cam);
    // "side wall": tường trái sẫm nhẹ
    const kW = prog(t, T.side, T.side + 0.5);
    if (kW > 0) { g.save(); g.fillStyle = C.inkA(0.07 * kW); poly(g, ROOM.left.map(P)); g.fill(); g.restore(); }
    // tường sau lưng người xem (đã bỏ): viền nét đứt khi "meets the wall behind you"
    const kBh = prog(t, T.meets, T.behind + 0.4);
    line(g, P(ROOM.corners.lf1), P(ROOM.corners.rf1), C.inkA(0.5), 2.5, [8, 10], kBh);
    const [t0, t1] = ROOM.edges.topFront, [n0, n1] = ROOM.edges.nearVertical, [f0, f1] = ROOM.edges.farVertical;
    const dimN = 1 - 0.65 * prog(t, T.careful, T.careful + 0.5);
    const kT = prog(t, T.top, T.top + 0.6), kN = prog(t, T.nearest, T.nearest + 0.5), kF = prog(t, T.far, T.far + 0.5);
    thread(g, cam, t0, t1, { w: 9, k: kT });
    line(g, P(n0), P(n1), `rgba(46,127,122,${dimN})`, 9, [], kN);
    line(g, P(f0), P(f1), TEAL, 9, [], kF);
    // mũi tên hướng: ngang / thẳng đứng
    const kSw = prog(t, T.sideways, T.sideways + 0.4), kUp = prog(t, T.straight, T.up + 0.3);
    if (kSw > 0) { const a = P(lerp3(t0, t1, 0.55)), b = P(lerp3(t0, t1, 0.55 + 0.3 * kSw)); line(g, a, b, C.ink, 4); arrowHead(g, a, b, C.ink, 22); }
    if (kUp > 0) { const a = P([n0[0] + 0.7, n0[1] + 0.4, 0.5]), b = P([n0[0] + 0.7, n0[1] + 0.4, 0.5 + 1.8 * kUp]); line(g, a, b, `rgba(46,127,122,${dimN})`, 4); arrowHead(g, a, b, `rgba(46,127,122,${dimN})`, 22); }
    // nhãn
    const pt = P(lerp3(t0, t1, 0.3)), pn = P(lerp3(n0, n1, 0.5)), pf = P(lerp3(f0, f1, 0.55));
    label(g, 'top edge', pt[0], pt[1] - 22, { size: 28, color: C.ink, k: prog(t, T.edge28, T.edge28 + 0.5) });
    label(g, 'near edge', pn[0] - 26, pn[1], { size: 28, color: dimN < 1 ? C.lead : C.tealT, align: 'right', k: prog(t, T.nearest, T.nearest + 0.5) });
    // careful: "skew?" cạnh góc xa → dải xé → "they meet"
    const sx = pf[0] + 28, sy = pf[1] + 12;
    label(g, 'skew?', sx, sy, { size: 28, color: C.tealT, k: prog(t, T.corner, T.corner + 0.3) });
    const wS = measure(g, 'SKEW?', `500 28px ${MONO}`) + 5 * 3;
    tornStrip(g, sx - 10, sy - 2, sx + wS + 6, sy - 22, prog(t, T.meet30, T.meet30 + 0.35), { w: 30, seed: 7 });
    label(g, 'they meet', sx, sy + 46, { size: 28, color: C.ink, k: prog(t, T.meet30 + 0.2, T.meet30 + 0.9) });
    const kD = prog(t, T.right, T.right + 0.3);
    if (kD > 0) { dot3(g, cam, f1, { r: 11, k: kD }); const q = P(f1), ring = prog(t, T.right, T.right + 0.9);
      g.save(); g.strokeStyle = C.inkA(1 - ring); g.lineWidth = 3; g.beginPath(); g.arc(q[0], q[1], 14 + 30 * ring, 0, 7); g.stroke(); g.restore(); }
    // chữ trái
    it(g, 'in your room', 96, 250, 64, C.ink, { k: prog(t, T.find, T.room + 0.4) });
    label(g, 'never meet', 96, 330, { size: 28, color: C.ink, k: prog(t, T.never, T.never + 0.5) });
    label(g, 'not parallel', 96, 380, { size: 28, color: C.ink, k: prog(t, T.par29, T.par29 + 0.5) });
    it(g, '→ skew', 96, 460, 60, C.tealT, { k: prog(t, T.up, T.up + 0.4) });
  }

  // ── C: cầu vượt ──
  bridge(g, t) {
    const T = this.T, cam = camera({ ...CAMC, yaw: CAMC.yaw + Math.min(Math.max(0, t - this.SW.cIn) * 0.5, 5) }), P = cam.P;
    const kR = outCubic(prog(t, this.SW.cIn + 0.2, T.highway + 0.4));
    const road = ROAD.map(p => [p[0] * kR, p[1], p[2]]);
    sheetShadow(g, cam, road, { a: 0.15 * kR });
    sheet(g, cam, road, { k: kR, thick: 0.02 });
    // tim đường dưới (mực): vẽ ở "line" thứ hai
    const kL2 = prog(t, T.line2, T.line2 + 0.6);
    thread(g, cam, [-4.8, 0, 0.01], [4.8, 0, 0.01], { w: 5, k: kL2 });
    // mặt cầu dâng lên trên trụ
    const kD = outCubic(prog(t, T.overpass - 0.1, T.overpass + 0.75)), z = DZ * kD;
    const cx = carX(t, T), cy = carY(t, T), kCar = prog(t, T.thats, T.thats + 0.4);
    const lowCar = CAR.V.map(p => add(p, [cx - 0.31, -0.55, 0.005]));
    if (kD > 0) { shadow(g, cam, DECK(z), LC, { a: 0.2 * kD, spread: 0.4 });
      PILLARS.forEach(y => shadow(g, cam, box(0.3, 0.3, z).V.map(p => add(p, [-0.15, y - 0.15, 0])), LC, { a: 0.2, spread: 0.3 })); }
    if (kCar > 0) shadow(g, cam, lowCar, LC, { a: 0.3 * kCar, spread: 0.2 });
    const drawLow = () => { if (kCar > 0) solid(g, cam, CAR, lowCar, LC, { k: kCar, alpha: kCar }); };
    if (kD > 0) {
      if (cx > -0.9) drawLow();
      PILLARS.map(y => ({ y, V: box(0.3, 0.3, z).V.map(p => add(p, [-0.15, y - 0.15, 0])) })).sort((a, b) => P([0, b.y, 0])[2] - P([0, a.y, 0])[2])
        .forEach(({ V }) => solid(g, cam, box(0.3, 0.3, z), V, LC, { edgeW: 2.5 }));
      sheet(g, cam, DECK(z), { k: 1, thick: 0.1 });
      // phần tim đường dưới nằm dưới mặt cầu: nét đứt
      if (kL2 > 0) line(g, P([-0.75, 0, 0.01]), P([0.75, 0, 0.01]), C.inkA(0.6), 3, [8, 8], prog(kL2, 0.45, 0.6));
      // tim đường trên cầu (ngọc)
      const kL1 = prog(t, T.line1, T.line1 + 0.6);
      thread(g, cam, [0, -4.05, z + 0.005], [0, 4.05, z + 0.005], { color: TEAL, w: 5, k: kL1 });
      if (cx <= -0.9) drawLow();
      // xe trên cầu
      if (kCar > 0) { const up = CARV.V.map(p => add(p, [0.12, cy - 0.31, z])); shadow(g, cam, up, LC, { a: 0.25 * kCar, spread: 0.2, z0: z });
        solid(g, cam, CARV, up, LC, { k: kCar, alpha: kCar }); }
      const pe = P([0, 4.05, z]), pr = P([4.8, 0, 0]);
      label(g, 'bridge line', pe[0] + 16, pe[1] - 18, { size: 28, color: C.tealT, k: prog(t, T.line1 + 0.3, T.line1 + 0.9) });
      label(g, 'road line', pr[0] + 10, pr[1] - 40, { size: 28, color: C.ink, align: 'right', k: prog(t, T.under, T.under + 0.5) });
    } else drawLow();
    // chữ trái
    it(g, 'highway overpass', 96, 250, 64, C.ink, { k: prog(t, T.highway, T.overpass + 0.5) });
    it(g, '→ skew', 96, 340, 60, C.tealT, { k: prog(t, T.skew32, T.skew32 + 0.4) });
    label(g, 'no collision', 96, 400, { size: 28, color: C.ink, k: prog(t, T.skew32 + 0.3, T.skew32 + 0.9) });
  }
}
// xe dưới chạy theo x, xe trên chạy theo y; gặp nhau (khác tầng) ở "over"
const carX = (t, T) => -4.3 + 4.3 * Math.min(2, Math.max(0, (t - T.thats) / (T.over - T.thats)));
const carY = (t, T) => -3.7 + 3.7 * Math.min(2, Math.max(0, (t - T.thats) / (T.over - T.thats)));
// camera A: chuyển từ nhìn-xuống sang ngả-thấp (smooth ngoài), trôi nhẹ trước đó
function camLerp2(a, b, u, t, from) {
  const d = Math.min(Math.max(0, t - from) * 0.4, 3);
  const m = (x, y) => x + (y - x) * u;
  return camera({ yaw: m(a.yaw + d, b.yaw), pitch: m(a.pitch, b.pitch), dist: m(a.dist, b.dist), target: lerp3(a.target, b.target, u), cx: m(a.cx, b.cx), cy: m(a.cy, b.cy) });
}
