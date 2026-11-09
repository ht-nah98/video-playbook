// f5 · Every road leads to a triangle (câu 105–107). Ba bài vừa rồi thu nhỏ trên ba tấm thẻ (vẽ lại ĐÚNG hình f2 / f3 / f4
// từ chính hằng số của chúng); ở "road" mỗi thẻ hiện tam giác của nó và tam giác ấy CHẢY xuống tờ bìa giữa → một tam giác
// vuông cam đất nằm phẳng trong mặt phẳng; "build" + "THEN: TRIGONOMETRY".
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, room, ROOM, sheet, sheetShadow, thread, dot3, line,
  rightMark, angleArc, goalTriangle, lamp, it, label, sectionTag, add, sub, mul, dot, norm, lerp3, poly, rgb, clamp } from '../kit.js';
import { drawLadder, LADDER } from './f1-between.js';
import { F2, bSeg } from './f2-lines.js';
import { F3 } from './f3-lineplane.js';
import { BOOK, coverDir, drawBook } from './f4-planes.js';

const CARDS = [{ x: 470, label: 'line · line' }, { x: 910, label: 'line · plane' }, { x: 1350, label: 'plane · plane' }];
const CW = 400, CH = 270, CY = 280;  // thẻ: góc trên trái (x, CY), rộng CW, cao CH
// tam giác lớn trên tờ bìa giữa: vuông ở B
const TA = [-1.5, -0.75, 0], TB = [1.3, -0.75, 0], TC = [1.3, 0.85, 0];
must(`${dot(sub(TA, TB), sub(TC, TB))}`, 0);
const BIG = { yaw: -18, pitch: 42, dist: 10.5, target: [0, 0, 0], cx: 1190, cy: 805 };
const SHEET = [[-2.3, -1.3, 0], [2.3, -1.3, 0], [2.3, 1.3, 0], [-2.3, 1.3, 0]];

export default class Triangle {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f5');
    this.START = L(105).start;
    this.FROM = Math.max(this.START - 1.2, L(104).end + 0.5);
    this.T = {
      lesson: w(105, 'lesson'), angles: w(105, 'angles'), every: w(105, 'every'), road: w(105, 'road'), tri: w(105, 'triangle'),
      right: w(106, 'right'), lying: w(106, 'lying'), plane: w(106, 'plane'),
      build: w(107, 'build'), after: w(107, 'after'), trig: w(107, 'trigonometry'), end: L(107).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.tri + 0.35, kind: 'correct' }, { t: T.build, kind: 'pen' }];
  }
  /** Vẽ một thẻ thu nhỏ i; trả về 3 điểm màn hình của tam giác của bài đó. */
  card(g, t, i, k, dim) {
    const c = CARDS[i], x = c.x, y = CY + (1 - outCubic(k)) * -420;
    g.save(); g.fillStyle = 'rgba(120,80,50,0.16)'; g.fillRect(x + 12, y + 16, CW, CH);
    g.fillStyle = rgb(C.card); g.fillRect(x, y, CW, CH); g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(x, y, CW, CH);
    g.beginPath(); g.rect(x, y, CW, CH); g.clip();
    let tri;
    if (i === 0) {          // f2: a trên bìa, bóng ma c trên không, c đã trượt, góc tại PM
      const cam = camera({ yaw: 50, pitch: 30, dist: 31, target: [0.3, 0.3, 0.55], cx: x + CW / 2, cy: y + CH / 2 + 10 });
      sheetShadow(g, cam, F2.CARD.map(p => [p[0], p[1], -0.9]), { a: 0.2 }); sheet(g, cam, F2.CARD);
      const [g0, g1] = bSeg(F2.LIFT); line(g, cam.P(g0), cam.P(g1), C.inkA(0.4), 2, [6, 6]);
      thread(g, cam, F2.A0, F2.A1, { w: 3 }); const [m0, m1] = bSeg(F2.MEET); line(g, cam.P(m0), cam.P(m1), C.ink, 3);
      angleArc(g, cam, F2.PM, F2.UA, F2.UB, 0.75, { color: C.ink, w: 2, fill: false });
      tri = [F2.PM, add(F2.PM, mul(F2.UA, 1.6)), add(F2.PM, mul(F2.UB, 1.6))].map(cam.P);
    } else if (i === 1) {   // f3: góc phòng, thang, bóng, M–H
      const cam = camera({ yaw: 26, pitch: 17, dist: 19, target: [1.0, 1.6, 1.1], cx: x + CW / 2, cy: y + CH / 2 + 6 });
      room(g, cam, {}); drawLadder(g, cam, LADDER.phi0, { sh: 0.2 });
      line(g, cam.P(F3.F), cam.P(F3.S), C.terra, 4); line(g, cam.P(F3.M), cam.P(F3.H), C.ink, 2);
      tri = [F3.F, F3.M, F3.H].map(cam.P);
    } else {                // f4: sách 70°, O, hai nét ⊥ gáy
      const cam = camera({ yaw: 60, pitch: 24, dist: 25, target: [0, -0.5, 0.55], cx: x + CW / 2, cy: y + CH / 2 + 8 });
      drawBook(g, cam, BOOK.open);
      const d2 = coverDir(BOOK.open);
      thread(g, cam, [-BOOK.half - 0.35, 0, 0], [BOOK.half + 0.35, 0, 0], { w: 3 });
      thread(g, cam, BOOK.O, add(BOOK.O, mul([0, -1, 0], BOOK.arm)), { w: 3 }); thread(g, cam, BOOK.O, add(BOOK.O, mul(d2, BOOK.arm)), { w: 3 });
      tri = [BOOK.O, add(BOOK.O, mul([0, -1, 0], BOOK.arm)), add(BOOK.O, mul(d2, BOOK.arm))].map(cam.P);
    }
    // nhạt đi khi tam giác đã rời thẻ
    if (dim > 0) { g.fillStyle = `rgba(251,246,236,${0.45 * dim})`; g.fillRect(x, y, CW, CH); }
    g.restore();
    label(g, c.label, x + CW / 2, y + CH + 44, { size: 24, align: 'center', color: C.ink, k: k * 1.4 - 0.4 });
    return tri;
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const fly = smooth(prog(t, T.road + 0.1, T.tri));
    // ba thẻ rơi vào lần lượt
    const tris = [0, 1, 2].map(i => this.card(g, t, i, prog(t, this.FROM + 0.3 + 0.35 * i, this.FROM + 1.1 + 0.35 * i), fly));

    // tờ bìa giữa (mặt phẳng chứa tam giác)
    const cam = camera({ ...BIG, yaw: BIG.yaw + Math.min(Math.max(0, t - this.START) * 0.4, 4) });
    const kS = outCubic(prog(t, T.every - 0.4, T.road + 0.3));
    const corners = SHEET.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    sheetShadow(g, cam, corners.map(p => [p[0], p[1], -0.9]), { a: 0.2 * kS });
    const cs = sheet(g, cam, corners, { k: kS, edge: kS > 0 ? C.ink : null });
    // "inside some plane": mép tờ bìa đậm lên
    const kPl = prog(t, T.plane, T.plane + 0.5);
    if (kPl > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3 + 3 * kPl; poly(g, cs); g.stroke(); g.restore();
      const q = cam.P([-2.0, 0.75, 0]); label(g, 'some plane', q[0], q[1], { size: 26, color: C.ink, k: kPl }); }

    // tam giác mỗi thẻ: hiện ở "road", rồi chảy về tam giác lớn (đường mực nét đứt = con đường)
    const big = [TA, TB, TC].map(cam.P), kRoad = prog(t, T.road - 0.2, T.road + 0.2);
    if (kRoad > 0 && fly < 1) {
      tris.forEach((tr, i) => {
        const from = tr.map(p => [p[0], p[1]]);
        const c0 = [(from[0][0] + from[1][0] + from[2][0]) / 3, (from[0][1] + from[1][1] + from[2][1]) / 3];
        const c1 = [(big[0][0] + big[1][0] + big[2][0]) / 3, (big[0][1] + big[1][1] + big[2][1]) / 3];
        line(g, c0, c1, C.inkA(0.45), 2.5, [6, 10], prog(t, T.road, T.road + 0.6));
        const pts = from.map((p, j) => [p[0] + (big[j][0] - p[0]) * fly, p[1] + (big[j][1] - p[1]) * fly]);
        g.save(); g.globalAlpha = kRoad; g.fillStyle = C.terraA(0.32); poly(g, pts); g.fill(); g.strokeStyle = C.terra; g.lineWidth = 3; g.lineJoin = 'round'; poly(g, pts); g.stroke(); g.restore();
      });
    }
    // tam giác lớn cam đất, phẳng trên tờ bìa
    if (fly >= 1) goalTriangle(g, cam, TA, TB, TC, { k: 1 });
    rightMark(g, cam, TB, norm(sub(TA, TB)), norm(sub(TC, TB)), 0.32, { color: C.terraT, w: 3.5, k: prog(t, T.right, T.right + 0.3) });
    const kAng = prog(t, T.lying, T.lying + 0.5);
    if (kAng > 0) angleArc(g, cam, TA, norm(sub(TB, TA)), norm(sub(TC, TA)), 0.8, { color: C.terraT, w: 3, k: kAng, fill: false });

    // lời
    it(g, 'every road leads to a triangle', 96, 230, 64, C.ink, { k: prog(t, T.every, T.tri + 0.4) });
    it(g, 'usually a right one, flat in a plane', 96, 760, 40, C.lead, { wt: 500, k: prog(t, T.right, T.plane + 0.4) });
    it(g, 'build the triangle', 96, 850, 54, C.ink, { k: prog(t, T.build, T.build + 0.8) });
    label(g, 'then: trigonometry', 96, 920, { size: 30, color: C.ink, k: prog(t, T.trig - 0.2, T.trig + 0.6) });

    lamp(g, 1150, 96, { s: 0.7, on: 0.5 });
    sectionTag(g, 'Act V · every road leads to a triangle', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
