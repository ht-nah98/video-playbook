// f4 · Two planes (câu 97–104). Cuốn sách mở (bìa dưới nằm trên bàn, bìa trên nâng α quanh gáy) → điểm O trên gáy,
// hai nét ⊥ gáy trong hai bìa → góc 70° (tính). Quy ước 0°–90°. Laptop giấy mở 120° → dải xé "120°" → "60°"
// (180 − 120 = 60, must). Mái nhà: hộp-phòng 12 × 4 × 3 thu nhỏ có mái — góc mái là góc giữa hai mặt phẳng.
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, sheet, shadow, solid, convex, ROOM, thread, dot3,
  line, rightMark, angleArc, hash, lamp, it, label, tornStrip, sectionTag, add, sub, mul, dot, norm, poly } from '../kit.js';

const DEG = 180 / Math.PI;
export const BOOK = { half: 1.35, W: 1.55, open: 70, O: [0.35, 0, 0], arm: 1.15 };
export const LIGHT4 = [-1.5, 3, 13];
/** Hướng bìa trên khi mở góc a (độ): quanh gáy (trục x), từ bìa dưới (hướng −y) lên. */
export const coverDir = a => [0, -Math.cos(a / DEG), Math.sin(a / DEG)];
const D1 = [0, -1, 0];
export const BOOK_ANGLE = Math.round(Math.acos(dot(D1, coverDir(BOOK.open))) * DEG);
must(`${BOOK_ANGLE}`, 70);
const quadAlong = (d, Wd, z0 = 0) => { const h = BOOK.half; return [[-h, 0, z0], [h, 0, z0], add([h, 0, z0], mul(d, Wd)), add([-h, 0, z0], mul(d, Wd))]; };
/** Vẽ sách mở góc a; trả về nothing. Bóng bìa trên đổ lên bìa dưới/bàn (mềm). */
export function drawBook(g, cam, a, { k = 1 } = {}) {
  if (k <= 0) return;
  const bottom = quadAlong(D1, BOOK.W), top = quadAlong(coverDir(a), BOOK.W);
  shadow(g, cam, bottom.map(p => add(p, [0, 0, 0.06])), LIGHT4, { a: 0.3 * k, spread: 0.3 });
  sheet(g, cam, bottom, { k, thick: 0.1 });
  shadow(g, cam, top, LIGHT4, { a: 0.28 * k, spread: 0.3, z0: 0.07 });
  // dòng chữ in trên hai trang (dấu hiệu "sách"), vẽ ngay trên mặt bìa
  const textLines = (d, z0) => { g.save(); g.globalAlpha = 0.4 * k;
    for (let i = 0; i < 8; i++) { const wv = 0.3 + i * 0.14, x1 = 1.05 - 0.5 * hash(i * 3.1 + z0);
      line(g, cam.P(add([-1.1, 0, 0], mul(d, wv))), cam.P(add([x1, 0, 0], mul(d, wv))), C.lead, 2); } g.restore(); };
  textLines(D1, 1);
  sheet(g, cam, top, { k });
}
// laptop: bàn phím 2.8 × 1.9 × 0.08 (bản lề ở y = 0, mặt trước ở y = −1.9), màn hình mở 120°
export const LAPTOP = { w: 2.8, d: 1.9, t: 0.08, open: 120, sh: 1.75, st: 0.06 };
const KB = convex([[-1.4, -1.9, 0], [1.4, -1.9, 0], [1.4, 0, 0], [-1.4, 0, 0], [-1.4, -1.9, 0.08], [1.4, -1.9, 0.08], [1.4, 0, 0.08], [-1.4, 0, 0.08]]);
const SD = coverDir(LAPTOP.open), SN = [0, -SD[2], SD[1]]; // pháp tuyến mặt trước của màn (về phía bàn phím)
const HINGE = [0, 0, 0.08];
const SCR = convex([[-1.4, 0, 0], [1.4, 0, 0], ...[[-1.4, 0, 0], [1.4, 0, 0]].map(p => add(p, mul(SD, LAPTOP.sh)))]
  .flatMap(p => [add(p, HINGE), add(add(p, HINGE), mul(SN, -LAPTOP.st))]));
export const LAPTOP_ANGLE = Math.round(Math.acos(dot(D1, SD)) * DEG);
export const PLANES_ANGLE = 180 - LAPTOP_ANGLE;
must(`${LAPTOP_ANGLE}`, 120); must(`180 − ${LAPTOP_ANGLE}`, 60); must(`${PLANES_ANGLE}`, 60);
export function drawLaptop(g, cam, { k = 1 } = {}) {
  if (k <= 0) return;
  shadow(g, cam, KB.V, LIGHT4, { a: 0.3 * k, spread: 0.3 });
  shadow(g, cam, SCR.V, LIGHT4, { a: 0.3 * k, spread: 0.3 });
  solid(g, cam, KB, KB.V, LIGHT4, { k });
  // phím: lưới ô nhỏ trên mặt bàn phím + bàn di chuột
  g.save(); g.globalAlpha = k; g.strokeStyle = C.inkA(0.5); g.lineWidth = 1.5;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 11; c++) {
    const x0 = -1.22 + c * 0.222, y0 = -0.32 - r * 0.2; poly(g, [[x0, y0, 0.081], [x0 + 0.18, y0, 0.081], [x0 + 0.18, y0 - 0.16, 0.081], [x0, y0 - 0.16, 0.081]].map(cam.P)); g.stroke(); }
  poly(g, [[-0.45, -1.2, 0.081], [0.45, -1.2, 0.081], [0.45, -1.75, 0.081], [-0.45, -1.75, 0.081]].map(cam.P)); g.stroke(); g.restore();
  solid(g, cam, SCR, SCR.V, LIGHT4, { k });
  // khung màn hình (tấm tối nhạt trong mặt trước)
  const c0 = add(HINGE, mul(SD, 0.12)), c1 = add(HINGE, mul(SD, LAPTOP.sh - 0.1)), e = 0.01;
  g.save(); g.globalAlpha = 0.14 * k; g.fillStyle = C.ink;
  poly(g, [[-1.28, 0, 0], [1.28, 0, 0]].flatMap((p, i) => [add(add(p, c0), mul(SN, e))]).concat([[1.28, 0, 0], [-1.28, 0, 0]].map(p => add(add(p, c1), mul(SN, e)))).map(cam.P)); g.fill(); g.restore();
}
// hộp-phòng có mái (thu nhỏ 0.15): 12 × 4 × 3 → mái hai dốc theo chiều sâu, cao 0.35·b
const RS = 0.15, ra = ROOM.a * RS, rb = ROOM.b * RS, rc = ROOM.c * RS, rr = 0.45 * rb;
const HOUSE = convex([[0, 0, 0], [ra, 0, 0], [ra, rb, 0], [0, rb, 0], [0, 0, rc], [ra, 0, rc], [ra, rb, rc], [0, rb, rc]].map(p => sub(p, [ra / 2, rb / 2, 0])));
const ROOF = convex([[0, 0, rc], [ra, 0, rc], [ra, rb, rc], [0, rb, rc], [0, rb / 2, rc + rr], [ra, rb / 2, rc + rr]].map(p => sub(p, [ra / 2, rb / 2, 0])));

export default class Planes {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f4');
    this.START = L(97).start;
    this.FROM = Math.max(this.START - 1.2, L(96).end + 0.5);
    this.T = {
      third: w(97, 'third'), planes97: w(97, 'planes'), open97: w(97, 'open'), book: w(97, 'book'),
      wide: w(98, 'wide'), covers: w(98, 'covers'),
      point99: w(99, 'point'), spine99: w(99, 'spine'), line99: w(99, 'line'), meet: w(99, 'meet'),
      draw: w(100, 'draw'), cover: w(100, 'cover'), perp: w(100, 'perpendicular'),
      angle101: w(101, 'angle', 1), planes101: w(101, 'planes'),
      convention: w(102, 'convention'), zero: w(102, 'zero'), ninety: w(102, 'ninety'),
      laptop: w(103, 'laptop'), hundred: w(103, 'hundred'), twenty: w(103, 'twenty'), screen: w(103, 'screen'),
      keyboard: w(103, 'keyboard'), planes103: w(103, 'planes'), sixty: w(103, 'sixty'),
      pitch: w(104, 'pitch'), roof: w(104, 'roof'), tilt: w(104, 'tilt'), laptop104: w(104, 'laptop'), planes104: w(104, 'planes'),
      end: L(104).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.book, kind: 'flap' }, { t: T.perp, kind: 'pen' }, { t: T.hundred, kind: 'pen' }, { t: T.sixty, kind: 'tear' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const yaw = 56 + Math.min(Math.max(0, t - this.FROM) * 0.35, 8);
    const swap = smooth(prog(t, T.laptop - 0.3, T.hundred + 0.2));      // sách ra trái, laptop vào từ phải
    const roofK = smooth(prog(t, T.pitch - 0.3, T.roof + 0.4));          // nhường chỗ cho nhà mái
    const base = { yaw, pitch: 24, dist: 8.4, target: [0, -0.5, 0.55], cy: 640 };
    const camB = camera({ ...base, cx: 1260 - 1700 * swap });
    const camL = camera({ ...base, yaw: yaw - 10, dist: 9.4, target: [0, -0.6, 0.6], cx: 1260 + 1500 * (1 - swap) });

    // ── sách ──
    const kBk = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.0));
    const a = 4 + 36 * smooth(prog(t, T.open97 - 0.2, T.book + 0.4)) + (BOOK.open - 40) * smooth(prog(t, T.wide, T.covers + 0.2));
    if (swap < 1) {
      drawBook(g, camB, a, { k: kBk });
      const P = camB.P, O = BOOK.O, d2 = coverDir(a);
      // gáy = giao tuyến
      const kSp = prog(t, T.spine99, T.spine99 + 0.5);
      thread(g, camB, [-BOOK.half - 0.35, 0, 0], [BOOK.half + 0.35, 0, 0], { w: 5, k: kSp });
      const se = P([BOOK.half + 0.35, 0, 0]);
      label(g, 'spine', se[0] + 18, se[1] + 8, { size: 26, color: C.ink, k: kSp });
      dot3(g, camB, O, { r: 8, k: prog(t, T.point99, T.point99 + 0.3) });
      const pO = P(O); it(g, 'O', pO[0] - 20, pO[1] + 58, 48, C.ink, { k: prog(t, T.point99, T.point99 + 0.3) });
      // hai nét ⊥ gáy, mỗi bìa một nét
      const kL1 = prog(t, T.draw, T.draw + 0.5), kL2 = prog(t, T.cover, T.cover + 0.5);
      thread(g, camB, O, add(O, mul(D1, BOOK.arm)), { w: 5, k: kL1 });
      thread(g, camB, O, add(O, mul(d2, BOOK.arm)), { w: 5, k: kL2 });
      rightMark(g, camB, O, [1, 0, 0], D1, 0.2, { k: prog(t, T.perp, T.perp + 0.3) });
      rightMark(g, camB, O, [1, 0, 0], d2, 0.2, { k: prog(t, T.perp + 0.2, T.perp + 0.5) });
      // góc giữa hai nét = góc giữa hai mặt
      const kA = prog(t, T.angle101, T.angle101 + 0.5);
      if (kA > 0) { const m = angleArc(g, camB, O, D1, d2, 0.55, { color: C.ink, w: 3.5, k: kA, fill: false });
        it(g, `${BOOK_ANGLE}°`, m[0] - 86, m[1] + 4, 54, C.ink, { k: prog(t, T.angle101 + 0.3, T.planes101) }); }
      // "how wide": cung mờ ở mép sách trước khi có O
      const kW = prog(t, T.wide, T.wide + 0.4) * (1 - prog(t, T.point99, T.point99 + 0.3));
      if (kW > 0) angleArc(g, camB, [BOOK.half + 0.02, 0, 0], D1, d2, 1.0, { color: C.inkA(0.6), w: 3, k: kW, fill: false });
    }

    // ── laptop 120° → 60° ──
    if (swap > 0) {
      drawLaptop(g, camL, { k: 1 });
      const P = camL.P, Hn = [LAPTOP.w / 2 + 0.1, 0, LAPTOP.t];
      const k120 = prog(t, T.hundred, T.twenty + 0.3);
      const m1 = angleArc(g, camL, Hn, D1, SD, 0.75, { color: C.ink, w: 3, k: k120, fill: false });
      const lx = m1[0] + 14, ly = m1[1] + 30;
      it(g, `${LAPTOP_ANGLE}°`, lx, ly, 54, C.ink, { k: prog(t, T.twenty, T.twenty + 0.4) });
      // dải xé lên "120°", rồi mặt phẳng bàn phím kéo dài ra sau → góc nhọn 60°
      tornStrip(g, lx - 16, ly - 2, lx + 112, ly - 36, prog(t, T.sixty - 0.1, T.sixty + 0.35), { w: 20, seed: 4 });
      const kx = prog(t, T.keyboard, T.keyboard + 0.6);
      line(g, P(Hn), P(add(Hn, [0, 1.3, 0])), C.inkA(0.6), 3, [10, 10], kx);
      const k60 = prog(t, T.sixty - 0.1, T.sixty + 0.4);
      const pulse = 1 + 0.5 * Math.sin(Math.PI * prog(t, T.tilt, T.laptop104 + 0.6));
      const m2 = angleArc(g, camL, Hn, [0, 1, 0], SD, 0.62, { color: C.ink, w: 4 * pulse, k: k60, fill: false });
      it(g, `${PLANES_ANGLE}°`, m2[0] + 12, m2[1] - 6, 60, C.ink, { k: prog(t, T.sixty, T.sixty + 0.4) });
    }

    // ── nhà mái (hộp-phòng có mái), trượt vào từ trái ──
    if (roofK > 0) {
      const camH = camera({ yaw: yaw - 10, pitch: 18, dist: 9, target: [0, 0, 0.5], cx: -260 + 880 * roofK, cy: 760 });
      const pts = [...HOUSE.V, ...ROOF.V];
      shadow(g, camH, pts, LIGHT4, { a: 0.3, spread: 0.3 });
      solid(g, camH, HOUSE, HOUSE.V, LIGHT4);
      solid(g, camH, ROOF, ROOF.V, LIGHT4);
      // góc mái: giữa mặt mái và mặt trần (nằm ngang), ở mép mái trước
      const E = [ra / 2 + 0.02, -rb / 2, rc], up = norm([0, rb / 2, rr]);
      const m = angleArc(g, camH, E, [0, 1, 0], up, 0.32, { color: C.ink, w: 3, k: prog(t, T.roof, T.roof + 0.5), fill: false });
      line(g, camH.P(E), camH.P(add(E, [0, 0.55, 0])), C.inkA(0.6), 2.5, [8, 8], prog(t, T.roof, T.roof + 0.4));
      label(g, 'roof pitch', m[0] + 60, m[1] + 110, { size: 24, color: C.ink, k: prog(t, T.roof + 0.2, T.roof + 0.8) });
    }

    // ── lời bên trái ──
    it(g, 'plane · plane', 96, 250, 64, C.ink, { k: prog(t, T.third, T.planes97 + 0.3) });
    it(g, 'taken between 0° and 90°', 96, 340, 46, C.ink, { wt: 500, k: prog(t, T.convention, T.ninety + 0.4) });
    const kF = prog(t, T.sixty, T.sixty + 0.9);
    it(g, `180° − ${LAPTOP_ANGLE}° = ${PLANES_ANGLE}°`, 96, 430, 54, C.ink, { k: kF });
    it(g, 'two planes, one angle', 96, 500, 40, C.lead, { wt: 500, k: prog(t, T.planes104 - 0.3, T.end) });

    lamp(g, 1180, 96, { s: 0.8, on: 0.5 });
    sectionTag(g, 'Act V · angle between two planes', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
