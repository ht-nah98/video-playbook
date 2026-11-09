// c4 · Two planes — cuốn sách mở (hai trang gặp ở gáy = giao tuyến, kẻ ngọc kéo dài) → hộp-phòng: sàn và trần (nắp hạ
// xuống) song song → quay lại BẢN ĐỒ của c1 (drawMap, vẽ y như c1): ba cột gạch chân ở "three groups", "NEXT: TWO OF
// THESE CASES" viết trước câu cuối, hai hàng CROSS · PARALLEL sáng ở "two of the cases" (hồi III song song, hồi IV
// vuông góc = một kiểu cắt nhau).
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, sheet, sheetShadow, shadow, solid, thread, dot3,
  lamp, line, it, label, sectionTag, room, ROOM, rgb, poly, add, mul, dot, cross3, len, norm, sub } from '../kit.js';
import { drawMap, MAPCAM } from './c1-map.js';

const LBK = [0.3, 0.8, 22];
const CAMK = { yaw: -28, pitch: 26, dist: 11.5, target: [0, 0, 0.9], cx: 1230, cy: 620 };
const SP0 = [0, -1.6, 0], SP1 = [0, 1.6, 0], PWK = 2.4;
// hộp-phòng: CÙNG camera với c2 (vật chung — cùng hình, cùng góc nhìn)
const LB = [5, 5, 30];
const CAMB = { yaw: 24, pitch: 27, dist: 26, target: [6, 2, 1.2], cx: 1190, cy: 640 };
const ROOMV = [ROOM.corners.lf0, ROOM.corners.rf0, ROOM.corners.rb0, ROOM.corners.lb0, ROOM.corners.lf1, ROOM.corners.rf1, ROOM.corners.rb1, ROOM.corners.lb1];
const TEAL = rgb(C.teal);

/** trang sách: từ gáy, nghiêng β (độ, so với mặt bàn) về phía side (−1 trái, +1 phải) */
const page = (beta, side) => { const b = beta * Math.PI / 180, d = [side * Math.cos(b) * PWK, 0, Math.sin(b) * PWK];
  return [SP0, SP1, add(SP1, d), add(SP0, d)]; };

export default class Planes {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      planes: w(38, 'planes'), two: w(38, 'two', 2), options: w(38, 'options'),
      cross: w(39, 'cross'), line: w(39, 'line'), pages: w(39, 'pages'), open: w(39, 'open'), spine: w(39, 'spine'),
      or: L(40).start, par: w(40, 'parallel'), nothing: w(40, 'nothing'), floor: w(40, 'floor'), ceiling: w(40, 'ceiling'), room: w(40, 'room'),
      once: L(41).start, three: w(41, 'three'), groups: w(41, 'groups'), next: w(41, 'next'), easier: w(41, 'easier'),
      two42: w(42, 'two'), cases: w(42, 'cases'), map: w(42, 'map'),
    };
    this.START = L(38).start;
    this.FROM = Math.max(this.START - 1.2, L(37).end + 0.5);
    // trạng thái xong: hai trang mở cắt nhau theo gáy (pháp tuyến không cùng phương); sàn ∥ trần, cách nhau ROOM.c
    const nL = cross3(sub(page(38, -1)[1], SP0), sub(page(38, -1)[3], SP0)), nR = cross3(sub(page(38, 1)[1], SP0), sub(page(38, 1)[3], SP0));
    must(`${len(cross3(norm(nL), norm(nR)))} > 0.5`, true);
    must(`${ROOM.ceiling[0][2] - ROOM.floor[0][2]}`, ROOM.c);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.cross, kind: 'flap' }, { t: T.spine, kind: 'pen' }, { t: T.ceiling, kind: 'flap' }, { t: T.next, kind: 'pen' },
      { t: T.cases, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    lamp(g, 1260, 150, { on: 1 });
    sectionTag(g, 'Act II · two planes', prog(t, this.FROM + 0.3, this.FROM + 1));
    const bookOut = -outCubic(prog(t, T.or, T.or + 0.8)) * 1500;
    const roomX = t < T.once ? (1 - outCubic(prog(t, T.or + 0.2, T.or + 1.0))) * 1400 : -outCubic(prog(t, T.once, T.once + 0.8)) * 1600;
    const mapX = (1 - outCubic(prog(t, T.once + 0.15, T.once + 0.95))) * 1400;
    if (bookOut > -1500) { g.save(); g.translate(bookOut, 0); this.book(g, t); g.restore(); }
    if (t > T.or + 0.2 && roomX > -1600) { g.save(); g.translate(roomX, 0); this.room(g, t); g.restore(); }
    if (t > T.once + 0.15) { g.save(); g.translate(mapX, 0); this.map(g, t); g.restore(); }
    // tiêu đề trái: rời khung cùng hộp-phòng
    g.save(); g.translate(t < T.once ? 0 : roomX, 0);
    it(g, 'two planes', 96, 250, 64, C.ink, { k: prog(t, this.START, T.planes + 0.4) });
    label(g, '2 options', 96, 320, { size: 28, color: C.ink, k: prog(t, T.two, T.options + 0.4) });
    g.restore();
  }
  book(g, t) {
    const T = this.T, cam = camera({ ...CAMK, yaw: CAMK.yaw + Math.min(Math.max(0, t - this.FROM) * 0.5, 4) }), P = cam.P;
    const kIn = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.0));
    const beta = 88 - 50 * smooth(prog(t, T.cross, T.cross + 0.9));
    const pl = page(beta * kIn + 0 * (1 - kIn), -1).map(p => [p[0], p[1], p[2] * kIn]), pr = page(beta, 1).map(p => [p[0], p[1], p[2] * kIn]);
    shadow(g, cam, [...pl, ...pr], LBK, { a: 0.16 * kIn, spread: 0.3 });
    // trang xa trước (painter)
    const pages = [pl, pr].map(q => ({ q, z: P(q.reduce((s, p) => add(s, mul(p, 0.25)), [0, 0, 0]))[2] })).sort((a, b) => b.z - a.z);
    pages.forEach(({ q }) => {
      sheet(g, cam, q, { k: kIn, thick: 0.05 });
      // dòng chữ in mờ trên trang
      for (let i = 1; i <= 4; i++) { const u = 0.25 + 0.15 * i; line(g, P(add(add(q[0], mul(sub(q[3], q[0]), u)), [0, 0.35, 0])), P(add(add(q[1], mul(sub(q[2], q[1]), u)), [0, -0.35, 0])), C.inkA(0.18 * kIn), 3); }
    });
    // giao tuyến = gáy, kéo dài ra ngoài cuốn sách (nét đứt)
    const kL = prog(t, T.line, T.line + 0.6);
    line(g, P([0, -3.4, 0]), P(SP0), TEAL, 3, [10, 10], kL); line(g, P(SP1), P([0, 3.4, 0]), TEAL, 3, [10, 10], kL);
    thread(g, cam, SP0, SP1, { color: TEAL, w: 7, k: kL });
    // nhãn
    const kPg = prog(t, T.pages, T.pages + 0.4), a = P(add(pl[3], mul(sub(pl[2], pl[3]), 0.5))), b = P(add(pr[3], mul(sub(pr[2], pr[3]), 0.5)));
    label(g, 'page', a[0] - 20, a[1] - 22, { size: 28, color: C.ink, align: 'right', k: kPg });
    label(g, 'page', b[0] + 20, b[1] - 22, { size: 28, color: C.ink, k: kPg });
    const s = P([0, -3.4, 0]); label(g, 'spine = the line', s[0] - 10, s[1] + 52, { size: 28, color: C.tealT, align: 'center', k: prog(t, T.spine, T.spine + 0.6) });
    // chữ trái (thuộc phần sách: trượt đi cùng)
    it(g, '1  cross', 96, 400, 60, C.ink, { k: prog(t, T.cross, T.cross + 0.4) });
    label(g, 'along a line', 96, 450, { size: 28, color: C.ink, k: prog(t, T.line, T.line + 0.5) });
  }
  room(g, t) {
    const T = this.T, cam = camera({ ...CAMB, yaw: CAMB.yaw + Math.min(Math.max(0, t - T.or) * 0.35, 4) }), P = cam.P;
    shadow(g, cam, ROOMV, LB, { a: 0.16, spread: 0.6 });
    room(g, cam);
    // sàn: viền đậm + tô ấm ở "floor"
    const kF = prog(t, T.floor, T.floor + 0.5);
    if (kF > 0) { g.save(); g.fillStyle = `rgba(255,214,140,${0.45 * kF})`; poly(g, ROOM.floor.map(P)); g.fill(); g.restore();
      const f = ROOM.floor.map(P); for (let i = 0; i < 4; i++) line(g, f[i], f[(i + 1) % 4], C.ink, 5, [], kF); }
    // trần: nắp bìa hạ xuống ở "ceiling", đậy lơ lửng (trong suốt một phần để thấy sàn)
    const kC = outCubic(prog(t, T.ceiling - 0.2, T.ceiling + 0.6));
    if (kC > 0) { const z = ROOM.c + 2.2 * (1 - kC), q = ROOM.ceiling.map(p => [p[0], p[1], z]);
      sheet(g, cam, q, { alpha: 0.55 * kC, thick: 0.05, fill: [255, 236, 200] }); }
    const pf = P(ROOM.corners.rf0), pc = P(ROOM.corners.lf1);
    label(g, 'floor', pf[0] + 24, pf[1] + 10, { size: 28, color: C.ink, k: prog(t, T.floor, T.floor + 0.4) });
    label(g, 'ceiling', pc[0] - 22, pc[1] + 4, { size: 28, color: C.ink, align: 'right', k: prog(t, T.ceiling + 0.3, T.ceiling + 0.8) });
    it(g, '2  parallel', 96, 400, 60, C.ink, { k: prog(t, T.par, T.par + 0.5) });
    label(g, 'nothing in common', 96, 450, { size: 28, color: C.ink, k: prog(t, T.nothing, T.nothing + 0.6) });
  }
  map(g, t) {
    const T = this.T;
    // camera như cuối c1 (MAPCAM, đã trôi ~6°), trôi tiếp rất chậm
    const cam = camera({ ...MAPCAM, yaw: MAPCAM.yaw + 6 + Math.max(0, t - T.once) * 0.5 });
    drawMap(g, cam, { hl: { cross: outCubic(prog(t, T.two42, T.cases + 0.4)), parallel: outCubic(prog(t, T.two42 + 0.25, T.cases + 0.65)) } });
    // "three groups": gạch chân ba tiêu đề cột lần lượt
    [0, 1, 2].forEach(c => { const x = -4.65 + 3.1 * (c + 0.5), q0 = cam.P([x - 1.1, 2.15, 0]), q1 = cam.P([x + 1.1, 2.15, 0]);
      line(g, [q0[0], q0[1] - 12], [q1[0], q1[1] - 12], C.ink, 3, [], prog(t, T.three + 0.25 * c, T.three + 0.25 * c + 0.4)); });
    it(g, 'the map', 96, 250, 64, C.ink, { k: prog(t, T.once + 0.3, T.three + 0.4) });
    label(g, 'next: two of these cases', 96, 320, { size: 28, color: C.ink, k: prog(t, T.next, T.easier + 0.3) });
  }
}
