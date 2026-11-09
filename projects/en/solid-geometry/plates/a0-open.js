// a0 · Cold open (trang p1) — 0–5 s LÀ thumbnail đang chuyển động (PACKAGING §0b/§4): từ khung đầu, chóp giấy đầy nước
// đứng cạnh hộp giấy rỗng CÙNG đáy vuông, CÙNG chiều cao, dưới đèn. Câu 0: chóp nghiêng rót vào hộp → mực nước dừng ở
// đúng ⅓ (vạch + ⅓). Câu 1: thêm hai chóp đầy, rót #2 (⅔) và #3 (đầy, "× 3") rơi đúng "need exactly three". Câu 2: cặp
// thứ hai (cao, hẹp) cũng dừng ở ⅓ — "always ⅓". Câu 3: bi trong ống trụ (cao = đường kính), thể tích trụ πr²·2r; nước
// bằng thể tích bi dâng tới ⅔ ống bên cạnh. Câu 4: mọi vật gấp bẹp xuống bàn → ba trục mực "three dimensions".
// Câu 5–8: ba thẻ chữ A 1·2·3 → câu 9 treo: chấm mực, sợi chỉ, tờ giấy → đèn tắt về ĐEN KÍN hết câu 9 + tail (p2 mở từ đen).
// Mọi thể tích / mực nước tính trong code (must). Xuất thêm: STOOL / drawStool / CARDS / drawCards / miniRoom — k1, k3,
// k4 vẽ lại ĐÚNG như vậy (DNA §11); a0 không còn vẽ ghế / phòng / cầu vượt (lời mới không nhắc).
import { W, H, C, prog, lookup, must, outCubic, outBack, smooth, ground, pool, camLerp, sheet, sheetShadow, shadow, shadowPt, solid,
  thread, dot3, lamp, line, it, label, frac, formula, sectionTag, tentCard, room, ROOM, revolve, sphere, pyramid, prism, ngon, xf,
  hull, poly, add, sub, mul, lerp3, dark, clamp } from '../kit.js';

// ── ghế đẩu ba chân (dựng cục bộ — báo đạo diễn gom vào kit): mặt ghế tròn + 3 chân choãi; ab = tâm chân ghế [x,y] ──
const SEAT_R = 0.46, SEAT_Z = 0.86, SEAT_T = 0.1;
const SEAT = revolve(SEAT_R, SEAT_T, SEAT_R, 28), LEG = prism(ngon(6, 0.055), [0, 0, 1]);
export const STOOL = { seat: SEAT, leg: LEG, legAng: [90, 210, 330].map(a => a * Math.PI / 180) };
/** Đỉnh 3D các phần của ghế: kz = gấp lên (0 → nằm bẹp, 1 → đứng). Trả về [{m, P3}] (mặt ghế cuối). */
export function stoolParts(ab, kz = 1) {
  const z = p => [p[0], p[1], p[2] * kz];
  const legs = STOOL.legAng.map(a => {
    const foot = [ab[0] + 0.5 * Math.cos(a), ab[1] + 0.5 * Math.sin(a)], top = [ab[0] + 0.3 * Math.cos(a), ab[1] + 0.3 * Math.sin(a), SEAT_Z];
    const dir = [top[0] - foot[0], top[1] - foot[1], SEAT_Z];
    return { m: LEG, P3: LEG.V.map(v => z(v[2] > 0.5 ? add([foot[0] + v[0], foot[1] + v[1], 0], dir) : [foot[0] + v[0], foot[1] + v[1], 0])) };
  });
  return [...legs, { m: SEAT, P3: SEAT.V.map(v => z([v[0] + ab[0], v[1] + ab[1], v[2] + SEAT_Z])) }];
}
/** Vẽ ghế: bóng mọi phần trước, rồi chân xa → gần, mặt ghế sau cùng. */
export function drawStool(g, cam, ab, L, kz = 1, { k = 1 } = {}) {
  if (kz <= 0) return null;
  const parts = stoolParts(ab, kz);
  parts.forEach(p => shadow(g, cam, p.P3, L, { a: 0.3 * k, spread: 0.1 }));
  const legs = parts.slice(0, 3).sort((a, b) => cam.P(b.P3[0])[2] - cam.P(a.P3[0])[2]);
  legs.forEach(p => solid(g, cam, p.m, p.P3, L, { k, edgeW: 2.5, hidden: false }));
  return solid(g, cam, parts[3].m, parts[3].P3, L, { k, edgeW: 3 });
}

/** Hộp-phòng thu nhỏ (ROOM × s, góc lf0 ở at), gấp lên theo kz (camera ép z). Trả về Pp (điểm phòng → màn hình). */
export function miniRoom(g, cam, at, s, L, kz = 1) {
  const sq = { ...cam, P: p => cam.P([p[0], p[1], p[2] * kz]) };
  const P8 = Object.values(ROOM.corners).map(p => add(mul(p, s), at)).map(p => [p[0], p[1], p[2] * kz]);
  shadow(g, cam, P8, L, { a: 0.3 * clamp(kz * 3), spread: 0.12 });
  room(g, sq, { scale: s, at, k: clamp(kz * 4) });
  return p => sq.P(add(mul(p, s), at));
}

// ── ba thẻ chữ A (mục lục lời hứa) — k3 vẽ lại y như vậy ──
export const CARDS = [
  { x: 270, num: '1', q: ['What is it all', 'built on?'] },
  { x: 750, num: '2', q: ['Measuring things', 'that never touch'] },
  { x: 1230, num: '3', q: ['Where volume', 'formulas come from'] },
];
export const CARD_W = 400, CARD_H = 330, CARD_Y = 840;
/** k[i] = thẻ dựng lên, q[i] = câu hỏi viết vào (0..1); dy = dời cả hàng (trượt ra). Trả về toạ độ đỉnh thẻ. */
export function drawCards(g, k, q, dy = 0) {
  return CARDS.map((c, i) => {
    tentCard(g, c.x, CARD_Y + dy, CARD_W, CARD_H, c.num, [], k[i]);
    const top = CARD_Y + dy - CARD_H * (k[i] >= 1 ? 1 : outBack(clamp(k[i])));
    c.q.forEach((s, j) => it(g, s, c.x + 30, top + 132 + j * 44, 36, C.ink, { k: q[i] * 2 - j }));
    return { x: c.x, top, y: CARD_Y + dy };
  });
}


// ── cảnh: bốn "trạm" trên một bàn dài; camera trượt giữa các trạm (vật cũ rời khung bằng chuyển động) ──
const A1 = 2.0, H1 = 2.4;                 // cặp 1: đáy vuông A1 × A1, cao H1 (chóp và hộp)
const A2 = 1.2, H2 = 3.3;                 // cặp 2: cao hơn, hẹp hơn
const X2 = 10, X3 = 20, X4 = 37;          // tâm trạm 2 (cặp 2), trạm 3 (bi–trụ, ba trục), trạm 4 (thẻ, câu treo)
const BOX1 = [1.45, 0.5], PYR1 = [-1.55, 0.5], PYR1b = [-4.1, 1.3], PYR1c = [-3.6, 2.9];
const BOX2 = [X2 + 1.0, 0.6], PYR2 = [X2 - 1.3, 0.6];
const R = 1, CYL1 = [X3 - 1.4, 0.6], CYL2 = [X3 + 1.4, 0.6];   // bi bán kính R trong trụ R × 2R; trụ thứ hai nhận nước
const AX0 = [X3 - 1.2, 1.6, 0];           // gốc ba trục
const STATION = [
  { yaw: -16, pitch: 20, dist: 11.2, target: [-0.8, 0.9, 1.9], cx: 960, cy: 620 },
  { yaw: -16, pitch: 20, dist: 12.6, target: [X2 - 0.2, 0.9, 2.4], cx: 960, cy: 620 },
  { yaw: -16, pitch: 22, dist: 10.2, target: [X3, 0.8, 1.3], cx: 1060, cy: 640 },
  { yaw: -20, pitch: 34, dist: 12.2, target: [X4 + 0.1, 0.5, 0.3], cx: 960, cy: 640 },   // = camera thẻ của bản cũ
];
const WATER = a => C.inkA(a);             // nước = mực xanh nhạt (như i1)
const TH = 128;                            // góc nghiêng lúc rót (độ, quanh trục y): đỉnh chóp chúc xuống vào hộp

/** Chóp đáy vuông a, cao h (đáy ở z = 0, đỉnh [0,0,h]). */
const pyr = (a, h) => pyramid([[-a / 2, -a / 2], [a / 2, -a / 2], [a / 2, a / 2], [-a / 2, a / 2]], [0, 0, h]);
const MESH1 = pyr(A1, H1), MESH2 = pyr(A2, H2);
const CYL = revolve(R, 2 * R, R, 60), BALL = sphere(R, 40, 20);

/** Chóp lúc rót: u = đi (0 ở nhà → 1 tới chỗ rót), back = quay về (0 → 1). Trả về đỉnh 3D (4 đáy + đỉnh). */
function pyrPose(m, a, h, home, box, hb, dy, u, back) {
  const Q = [0, 0, h / 3], th = TH * smooth(u) * (1 - smooth(back)), r = TH * Math.PI / 180;
  const apex = [box[0] - 0.2, box[1] + dy, hb + 0.3];   // đỉnh chóp (miệng rót) ngay trên lòng hộp
  const at = [apex[0] - (2 * h / 3) * Math.sin(r), apex[1], apex[2] - (2 * h / 3) * Math.cos(r)];
  const h0 = [home[0], home[1], h / 3], s = smooth(u) * (1 - smooth(back));
  const pos = add(lerp3(h0, at, s), [0, 0, 0.9 * Math.sin(Math.PI * s)]);
  return xf(m.V.map(v => sub(v, Q)), { ry: th, at: pos });
}
/** Vẽ chóp giấy (mờ để thấy nước) + nước bên trong: khối chóp con chung đỉnh, tỉ lệ ∛(phần còn lại). kz = dựng lên. */
function drawPyr(g, cam, m, P3, L, fill, { kz = 1, k = 1 } = {}) {
  if (kz <= 0.01) return;
  const Pz = P3.map(p => [p[0], p[1], p[2] * kz]);
  const lift = Math.min(...Pz.map(p => p[2]));   // vật nhấc cao: bóng dài và nhạt đi
  shadow(g, cam, Pz, L, { a: 0.32 * k * clamp(1 - lift / 1.2), spread: 0.12 });
  solid(g, cam, m, Pz, L, { alpha: 0.62, k });
  if (fill > 0.002) {
    const ap = Pz[4], s = Math.cbrt(fill), Wv = Pz.map(p => lerp3(ap, p, s));
    g.save(); g.fillStyle = WATER(0.3 * k); poly(g, hull(Wv.map(cam.P))); g.fill(); g.restore();
  }
}
/** Hộp giấy mở nắp: đáy a × a tâm c, cao h, nước tới mực lv. kz = gấp bẹp (1 đứng, 0 nằm). Trả về đỉnh màn hình. */
function drawBox(g, cam, c, a, h, lv, L, { kz = 1 } = {}) {
  if (kz <= 0.01) return null;
  const x0 = c[0] - a / 2, x1 = c[0] + a / 2, y0 = c[1] - a / 2, y1 = c[1] + a / 2, hz = h * kz, lz = lv * kz;
  const F = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const walls = F.map((p, i) => { const q = F[(i + 1) % 4], n = [[0, -1], [1, 0], [0, 1], [-1, 0]][i];
    return { p, q, near: n[0] * (cam.pos[0] - (p[0] + q[0]) / 2) + n[1] * (cam.pos[1] - (p[1] + q[1]) / 2) > 0 }; });
  const wall = (W, z0, z1) => [[W.p[0], W.p[1], z0], [W.q[0], W.q[1], z0], [W.q[0], W.q[1], z1], [W.p[0], W.p[1], z1]];
  shadow(g, cam, [...F.map(p => [p[0], p[1], 0]), ...F.map(p => [p[0], p[1], hz])], L, { a: 0.36, spread: 0.12 });
  sheet(g, cam, F.map(p => [p[0], p[1], 0.002]), { thick: 0.03 });
  walls.filter(W => !W.near).forEach(W => sheet(g, cam, wall(W, 0, hz), { thick: 0.03, fill: [240, 233, 218] }));
  if (lz > 0.004) {
    g.save();
    walls.filter(W => !W.near).forEach(W => { g.fillStyle = WATER(0.16); poly(g, wall(W, 0, lz).map(cam.P)); g.fill(); });
    const top = F.map(p => cam.P([p[0], p[1], lz])); g.fillStyle = WATER(0.2); poly(g, top); g.fill();
    g.restore();
  }
  walls.filter(W => W.near).forEach(W => sheet(g, cam, wall(W, 0, hz), { thick: 0.03, alpha: 0.55 }));
  if (lz > 0.004) {
    g.save(); walls.filter(W => W.near).forEach(W => { g.fillStyle = WATER(0.2); poly(g, wall(W, 0, lz).map(cam.P)); g.fill(); });
    const top = F.map(p => cam.P([p[0], p[1], lz])); g.strokeStyle = WATER(0.6); g.lineWidth = 2.5; poly(g, top); g.stroke(); g.restore();
  }
  return { fr: [x1, y0] };   // góc trước-phải (vạch mực nước kẻ ở đây)
}
/** Vạch mực trên cạnh dọc (x, y) ở cao z, nhãn phân số bên phải. Trả về toạ độ màn hình của vạch. */
function tick(g, cam, x, y, z, k, w = 34) {
  const p = cam.P([x, y, z]); if (k > 0) line(g, [p[0] - 10, p[1]], [p[0] + w, p[1]], C.ink, 4, [], k); return p;
}
/** Dòng nước rót: từ miệng (màn hình a) thẳng xuống mặt nước (b), gợn theo t. */
function stream(g, a, b, t, k) {
  if (k <= 0) return; const n = 14;
  g.save(); g.strokeStyle = WATER(0.42 * k); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= n; i++) { const u = i / n, x = a[0] + (b[0] - a[0]) * u + 2.5 * Math.sin(t * 23 + u * 9), y = a[1] + (b[1] - a[1]) * u; i ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke(); g.strokeStyle = 'rgba(255,250,236,0.6)'; g.lineWidth = 2.5; g.stroke(); g.restore();
}
/** Thân nước hình trụ (tâm c, bán kính r, cao z0 → z1): hull hai vòng + viền mặt nước. */
function waterCyl(g, cam, c, r, z1, a = 0.26) {
  if (z1 <= 0.004) return; const ring = z => Array.from({ length: 40 }, (_, i) => cam.P([c[0] + r * Math.cos(i * Math.PI / 20), c[1] + r * Math.sin(i * Math.PI / 20), z]));
  g.save(); g.fillStyle = WATER(a); poly(g, hull([...ring(0), ...ring(z1)])); g.fill();
  g.strokeStyle = WATER(0.6); g.lineWidth = 2.5; poly(g, ring(z1)); g.stroke(); g.restore();
}

export default class Open {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      pour: w(0, 'pour'), box0: w(0, 'box'), height: w(0, 'height'),
      s1: L(1).start, need: w(1, 'need'), exactly: w(1, 'exactly'), three1: w(1, 'three'),
      s2: L(2).start, always: w(2, 'always'), third2: w(2, 'third'),
      s3: L(3).start, ball: w(3, 'ball'), snugly: w(3, 'snugly'), cyl: w(3, 'cylinder'), fills: w(3, 'fills'), two: w(3, 'two'), thirds: w(3, 'thirds'),
      s4: L(4).start, why: w(4, 'why'), three4: w(4, 'three'), simpler: w(4, 'simpler'),
      by: w(5, 'by'), q1: w(6, 'what'), q2: w(7, 'how'), q3: w(8, 'where'), third: w(8, 'third'),
      s9: L(9).start, dot: w(9, 'three'), thr: w(9, 'ideas'), pl: w(9, 'simple'), doesnt: w(9, "doesn't"), tryy: w(9, 'try'),
      define: w(9, 'define'), end: L(9).end,
    };
    const T = this.T;
    // các lần rót: [đi, bắt đầu chảy, hết chảy (= mốc lời), về]
    this.P1 = [T.pour - 0.05, T.pour + 0.55, T.height - 0.2, T.height + 0.3];
    this.P2 = [T.s1 + 0.45, T.s1 + 0.85, T.need + 0.05, T.need + 0.3];
    this.P3 = [T.need - 0.05, T.exactly + 0.15, T.three1 + 0.05, T.three1 + 0.55];
    this.P4 = [T.s2 + 0.55, T.s2 + 0.95, T.always + 0.05, T.third2 + 0.4];
    this.START = L(0).start;
    this.FROM = -0.6;
    // ── toán trên hình (must) ──
    const Vp1 = A1 * A1 * H1 / 3, Vb1 = A1 * A1 * H1, Vp2 = A2 * A2 * H2 / 3, Vb2 = A2 * A2 * H2;
    must(`${Vp1 / Vb1}`, 1 / 3); must(`${3 * Vp1}`, Vb1); must(`${Vp2 / Vb2}`, 1 / 3);
    this.LV1 = Vp1 / (A1 * A1); this.LV2 = Vp2 / (A2 * A2);      // mỗi chóp nâng mực nước thêm …
    must(`${this.LV1}`, H1 / 3); must(`${this.LV2}`, H2 / 3);
    const Vball = 4 / 3 * Math.PI * R ** 3, Vcyl = Math.PI * R ** 2 * (2 * R);
    must(`${Vcyl}`, 2 * Math.PI); must(`${Vball / Vcyl}`, 2 / 3);
    this.LVC = Vball / (Math.PI * R * R);                         // nước bằng thể tích bi trong trụ cùng cỡ
    must(`${this.LVC / (2 * R)}`, 2 / 3);
    this.Vp1 = Vp1; this.Vp2 = Vp2;
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FROM + 0.2, kind: 'shimmer' }, { t: this.P1[0], kind: 'flap' }, { t: this.P1[2], kind: 'tick' },
      { t: T.s1 + 0.05, kind: 'flap' }, { t: this.P2[2], kind: 'tick' }, { t: this.P3[2], kind: 'snap' },
      { t: this.P4[2], kind: 'tick' }, { t: T.snugly + 0.3, kind: 'snap' }, { t: T.thirds, kind: 'tick' },
      { t: T.why + 0.1, kind: 'flap' }, { t: T.three4, kind: 'pen' }, { t: T.by + 0.75, kind: 'flap' },
      { t: T.q1, kind: 'pen' }, { t: T.q2, kind: 'pen' }, { t: T.q3, kind: 'pen' }, { t: T.third, kind: 'tick' }, { t: T.dot, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ── camera: trạm 1 → 2 → 3 → 4, trượt ở đầu câu 2, câu 3, "by" (câu 5) ──
    const m1 = smooth(prog(t, T.s2 - 0.25, T.s2 + 0.55)), m2 = smooth(prog(t, T.s3 - 0.3, T.s3 + 0.45)), m3 = smooth(prog(t, T.by - 0.1, T.by + 1.0));
    const [ca, cb, u] = m3 > 0 ? [STATION[2], STATION[3], m3] : m2 > 0 ? [STATION[1], STATION[2], m2] : [STATION[0], STATION[1], m1];
    const d = 0.1 * Math.min(t, T.by);   // trôi chậm ≤ 0.1°/s
    const C3 = camLerp({ ...ca, yaw: ca.yaw + d }, { ...cb, yaw: cb.yaw + d }, u);
    const tx = ca.target[0] + (cb.target[0] - ca.target[0]) * u;
    const P = C3.P, Lp = [tx + 0.2, 1.6, 9];
    const lampOn = 1 - prog(t, T.define - 0.2, T.end + 0.3);
    const lp = P(Lp);
    pool(g, lp[0], 640, 780, 0.5 * lampOn);

    // ── trạm 1: chóp + hộp (thumbnail), rót 3 lần ──
    if (m1 < 1) {
      const r1 = this.P1, r2 = this.P2, r3 = this.P3;
      const flow = r => smooth(prog(t, r[1], r[2]));
      const f1 = flow(r1), f2 = flow(r2), f3 = flow(r3);
      const lv = this.LV1 * (f1 + f2 + f3);
      const kz23 = outBack(prog(t, T.s1 - 0.1, T.s1 + 0.4));
      const poses = [
        { home: PYR1, r: r1, f: f1, dy: 0, kz: 1 }, { home: PYR1b, r: r2, f: f2, dy: -0.35, kz: kz23 }, { home: PYR1c, r: r3, f: f3, dy: 0.35, kz: kz23 },
      ].map(o => ({ ...o, P3: pyrPose(MESH1, A1, H1, o.home, BOX1, H1, o.dy, prog(t, o.r[0], o.r[1]), prog(t, o.r[2] + 0.05, o.r[3])) }));
      // chóp ở xa (y lớn) vẽ trước; chóp đang ở trên hộp vẽ SAU hộp
      const over = o => t > o.r[0] + 0.15 && t < o.r[3] - 0.1;
      poses.filter(o => !over(o)).sort((a, b) => b.home[1] - a.home[1]).forEach(o => drawPyr(g, C3, MESH1, o.P3, Lp, 1 - o.f, { kz: o.kz }));
      const bx = drawBox(g, C3, BOX1, A1, H1, lv, Lp);
      poses.filter(over).forEach(o => {
        drawPyr(g, C3, MESH1, o.P3, Lp, 1 - o.f);
        const kS = prog(t, o.r[1] - 0.1, o.r[1] + 0.05) * (1 - prog(t, o.r[2] - 0.08, o.r[2] + 0.05));
        stream(g, C3.P(o.P3[4]), C3.P([o.P3[4][0], o.P3[4][1], lv]), t, kS);
      });
      // vạch ⅓ ⅔ và "× 3" ở cạnh trước-phải
      const [xr, yr] = bx.fr, kT1 = prog(t, r1[2] - 0.1, r1[2] + 0.3), kT2 = prog(t, r2[2] - 0.1, r2[2] + 0.3), kT3 = prog(t, r3[2] - 0.05, r3[2] + 0.35);
      const p1 = tick(g, C3, xr, yr, H1 / 3, kT1), p2 = tick(g, C3, xr, yr, 2 * H1 / 3, kT2), p3 = tick(g, C3, xr, yr, H1, kT3);
      if (kT1 >= 1) frac(g, '1', '3', p1[0] + 48, p1[1] + 30, 96, C.ink);
      if (kT2 >= 1) frac(g, '2', '3', p2[0] + 48, p2[1] + 30, 96, C.ink);
      it(g, '× 3', p3[0] + 52, p3[1] + 30, 92, C.ink, { k: kT3 * 1.5 });
    }

    // ── trạm 2: cặp cao–hẹp, rót một lần → ⅓ "always" ──
    if (m1 > 0 && m2 < 1) {
      const r = this.P4, f = smooth(prog(t, r[1], r[2])), lv = this.LV2 * f;
      const P3 = pyrPose(MESH2, A2, H2, PYR2, BOX2, H2, 0, prog(t, r[0], r[1]), prog(t, r[2] + 0.05, r[3]));
      const over = t > r[0] + 0.15 && t < r[3] - 0.1;
      if (!over) drawPyr(g, C3, MESH2, P3, Lp, 1 - f);
      const bx = drawBox(g, C3, BOX2, A2, H2, lv, Lp);
      if (over) { drawPyr(g, C3, MESH2, P3, Lp, 1 - f);
        stream(g, C3.P(P3[4]), C3.P([P3[4][0], P3[4][1], lv]), t, prog(t, r[1] - 0.1, r[1] + 0.05) * (1 - prog(t, r[2] - 0.08, r[2] + 0.05))); }
      const kT = prog(t, r[2] - 0.1, r[2] + 0.3), p = tick(g, C3, bx.fr[0], bx.fr[1], H2 / 3, kT);
      const pTop = C3.P([bx.fr[0], bx.fr[1], H2]); tick(g, C3, bx.fr[0], bx.fr[1], H2, kT, 20);
      if (kT >= 1) frac(g, '1', '3', p[0] + 48, p[1] + 30, 96, C.ink);
      const kA = prog(t, T.always - 0.05, T.third2 + 0.3);
      const wA = it(g, 'always', pTop[0] + 70, pTop[1] + 90, 72, C.ink, { k: kA * 1.4 });
      if (kA >= 0.75) frac(g, '1', '3', pTop[0] + 70 + wA + 20, pTop[1] + 90, 92, C.ink);
    }

    // ── trạm 3: bi trong trụ (câu 3), gấp bẹp (câu 4) → ba trục ──
    if (m2 > 0 && m3 < 1) {
      const kz = 1 - smooth(prog(t, T.why, T.why + 0.8));
      const zs = p => [p[0], p[1], p[2] * kz];
      if (kz > 0.01) {
        // bi rơi vào ống ở "snugly"
        const drop = smooth(prog(t, T.ball + 0.2, T.snugly + 0.35)), bz = R + 1.9 * (1 - drop);
        const ball = BALL.V.map(v => zs(add(v, [CYL1[0], CYL1[1], bz])));
        const cyl1 = CYL.V.map(v => zs(add(v, [CYL1[0], CYL1[1], 0]))), cyl2 = CYL.V.map(v => zs(add(v, [CYL2[0], CYL2[1], 0])));
        shadow(g, C3, ball, Lp, { a: 0.3, spread: 0.12 }); shadow(g, C3, cyl1, Lp, { a: 0.22 }); shadow(g, C3, cyl2, Lp, { a: 0.22 });
        if (drop < 1) thread(g, C3, [CYL1[0], CYL1[1], bz + R + 6], [CYL1[0], CYL1[1], bz + R], { w: 1.5, color: C.inkA(0.6) });
        solid(g, C3, BALL, ball, Lp);
        solid(g, C3, CYL, cyl1, Lp, { alpha: 0.45 });
        // trụ 2: nước bằng thể tích bi, dâng ở "fills … two thirds"
        const lvc = this.LVC * smooth(prog(t, T.fills, T.thirds));
        waterCyl(g, C3, CYL2, R, lvc * kz);
        solid(g, C3, CYL, cyl2, Lp, { alpha: 0.45 });
        // vạch ⅔ trên trụ 2 (cạnh phải), nhãn trụ: πr²·2r
        const kT = prog(t, T.thirds - 0.1, T.thirds + 0.3) * kz;
        const p = tick(g, C3, CYL2[0] + R, CYL2[1], this.LVC * kz, kT), pt = C3.P([CYL2[0] + R, CYL2[1], 2 * R * kz]);
        tick(g, C3, CYL2[0] + R, CYL2[1], 2 * R * kz, kT, 20);
        if (kT >= 1) frac(g, '2', '3', p[0] + 48, p[1] + 30, 96, C.ink);
        it(g, '1', pt[0] + 50, pt[1] + 22, 54, C.lead, { k: kT * 2 });
      }
      // chữ trái: thể tích trụ (ở "cylinder"), bi = ⅔ trụ (ở "two"); trượt lên rời khung ở "why"
      const up = -560 * outCubic(prog(t, T.why - 0.1, T.why + 0.5));
      if (up > -550) {
        it(g, 'cylinder = πr² · 2r = 2πr³', 96, 250 + up, 54, C.ink, { k: prog(t, T.cyl, T.cyl + 1.0) });
        const kF = prog(t, T.two - 0.15, T.thirds + 0.3);
        formula(g, ['ball = ', { frac: ['4', '3'] }, 'πr³ = ', { frac: ['2', '3'] }, ' cylinder'], 96, 345 + up, 54, C.ink, kF);
      }
      // ba trục mực "three dimensions"
      const kAx = prog(t, T.three4, T.three4 + 0.9);
      if (kAx > 0) {
        const ends = [[3.8, 0, 0], [0, -2.8, 0], [0, 0, 3.0]];
        // bóng trục đứng trên bàn (từ đèn)
        line(g, C3.P(AX0), C3.P(shadowPt(add(AX0, [0, 0, 3.0 * prog(kAx, 0.5, 1)]), Lp)), C.terraA(0.35), 6, [], prog(kAx, 0.5, 1));
        ends.forEach((e, i) => thread(g, C3, AX0, add(AX0, e), { w: 6, k: prog(kAx, i * 0.25, i * 0.25 + 0.5) }));
        dot3(g, C3, AX0, { r: 9, k: kAx * 3 });
      }
    }

    // ── chữ câu 4: "Why those numbers?" / "three dimensions" / "simpler than it looks"; trượt lên ở câu 5 ──
    const up4 = -620 * outCubic(prog(t, T.by - 0.2, T.by + 0.5));
    if (up4 > -600) {
      it(g, 'Why those numbers?', 96, 250 + up4, 72, C.ink, { k: prog(t, T.why + 0.2, T.why + 1.1) });
      it(g, 'three dimensions', 96, 350 + up4, 72, C.ink, { k: prog(t, T.three4, T.three4 + 0.8) });
      it(g, 'simpler than it looks', 96, 420 + up4, 44, C.lead, { wt: 500, k: prog(t, T.simpler, T.simpler + 0.8) });
    }

    // ── câu 5–8: ba thẻ chữ A, câu hỏi viết vào; ⅓ trên thẻ 3 ở "third" ──
    const kc = [0, 1, 2].map(i => prog(t, T.by + 0.7 + i * 0.18, T.by + 1.3 + i * 0.18));
    const dyC = 760 * outCubic(prog(t, T.s9 - 0.15, T.s9 + 0.6));
    if (kc[0] > 0 && dyC < 750) {
      const tops = drawCards(g, kc, [prog(t, T.q1, T.q1 + 1.6), prog(t, T.q2, T.q2 + 1.6), prog(t, T.q3, T.q3 + 1.6)], dyC);
      if (t >= T.third) frac(g, '1', '3', CARDS[2].x + CARD_W - 120, tops[2].top + 290, 90, C.ink);
    }

    // ── câu 9: ba ý không định nghĩa: chấm mực · sợi chỉ · tờ giấy; "never defined" ──
    const cx = X4 + 0.2;
    const kD = prog(t, T.dot, T.dot + 0.3), kT = prog(t, T.thr, T.thr + 0.6), kP = outCubic(prog(t, T.pl, T.pl + 0.7));
    if (kD > 0) { dot3(g, C3, [cx - 3.6, 0.4, 0.3], { r: 4, color: 'rgba(120,80,50,0.25)', k: 1 }); }
    if (kP > 0) {
      const sc = [[cx + 1.6, -0.6, 0.35], [cx + 4.4, -0.6, 0.35], [cx + 4.4, 1.6, 0.35], [cx + 1.6, 1.6, 0.35]].map(p => [cx + 3 + (p[0] - cx - 3) * kP, 0.5 + (p[1] - 0.5) * kP, p[2]]);
      sheetShadow(g, C3, sc.map(p => [p[0], p[1], 0]), { a: 0.22 * kP, dx: -0.15, dy: -0.18 });
      sheet(g, C3, sc, { k: kP });
    }
    if (kT > 0) {
      const a = [cx - 1.7, -0.5, 0.25], b = [cx + 0.9, 1.4, 0.25];
      line(g, P([a[0] - 0.1, a[1] - 0.15, 0]), P([b[0] - 0.1, b[1] - 0.15, 0]), 'rgba(120,80,50,0.22)', 6, [], kT);
      thread(g, C3, a, b, { w: 5, k: kT });
    }
    if (kD > 0) dot3(g, C3, [cx - 3.5, 0.45, 0.3], { r: 12, k: kD });
    it(g, 'never defined', 96, 300, 72, C.ink, { k: prog(t, T.doesnt, T.doesnt + 0.8) });

    // đèn treo; biển mục chỉ từ câu 4 (0–14 s không chữ thừa); mở từ đen nhanh, kết về đen kín hết câu 9 + tail
    lamp(g, lp[0], 150, { on: lampOn });
    sectionTag(g, 'Solid geometry from scratch', prog(t, T.s4, T.s4 + 0.7));
    dark(g, prog(t, this.FROM, this.FROM + 0.4) * (1 - prog(t, T.tryy, T.end + 0.85)));
  }
}
