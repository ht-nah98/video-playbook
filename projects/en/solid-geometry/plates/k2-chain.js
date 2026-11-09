// k2 · A chain, not a list. Bảy vòng giấy rời "one by one" → trượt lại MÓC NHAU thành chuỗi ("link together into a
// chain") → mỗi vòng một tên theo lời: POSITIONS → PARALLEL · PERPENDICULAR → ANGLES · DISTANCE → HEIGHT → VOLUME.
// Vòng giấy: dải bìa vẽ theo từng đoạn cung, sắp xa → gần (painter) để hai vòng lồng vào nhau thật; bóng từ đèn.
import { C, prog, lookup, outCubic, outBack, smooth, ground, pool, camera, lamp, line, it, label, sectionTag, shadowPt,
  clamp, add } from '../kit.js';

const L0 = [0.3, 2.4, 9];
const CAM0 = { yaw: -12, pitch: 26, dist: 8.0, target: [0, 0.4, 0.4], cx: 1050, cy: 700 };
const N = 7, A = 0.62, B = 0.36, GAP = 0.86;                     // bán trục vòng (dọc x, ngang), khoảng tâm
const NAMES = ['positions', 'parallel', 'perpendicular', 'angles', 'distance', 'height', 'volume'];
const SEG = 40;

/** Điểm thứ j trên vòng i (tâm c): vòng chẵn đứng (mặt xz), vòng lẻ nằm (mặt xy, ở độ cao tâm vòng đứng). */
const ringPt = (c, i, j) => { const a = j * 2 * Math.PI / SEG, x = A * Math.cos(a), s = B * Math.sin(a);
  return i % 2 ? [c[0] + x, c[1] + s, c[2]] : [c[0] + x, c[1], c[2] + s]; };

export default class Chain {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'k2');
    this.T = {
      stop: w(199, 'stop'), theorems: w(199, 'theorems'), one: w(199, 'one', 1), link: w(199, 'link'), chain: w(199, 'chain'),
      n: [w(200, 'where'), w(200, 'parallel'), w(200, 'perpendicular'), w(201, 'angles'), w(201, 'distances'), w(202, 'height'), w(202, 'volume')],
      perp2: w(201, 'perpendicular'), dist2: w(202, 'distance'), end: L(202).end,
    };
    this.START = L(199).start;
    this.FROM = Math.max(this.START - 1.2, L(198).end + 0.5);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.theorems, kind: 'pen' }, { t: T.chain, kind: 'snap' }, { t: T.n[2], kind: 'pen' }, { t: T.n[5], kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const cam = camera({ ...CAM0, yaw: CAM0.yaw + 0.3 * clamp(t - this.FROM, 0, 20) });
    const P = cam.P, L = L0, lp = P(L);
    pool(g, lp[0], 660, 820, 0.45);

    // vị trí: rời (tán ra, so le) → chuỗi (móc nhau)
    const kJoin = smooth(prog(t, T.link - 0.1, T.chain + 0.2));
    const centers = Array.from({ length: N }, (_, i) => {
      const xc = (i - (N - 1) / 2) * GAP, zc = B + 0.02;
      const loose = [(i - (N - 1) / 2) * 1.12, (i % 2 ? -0.7 : 0.7) + 0.2 * Math.sin(i * 2.1), zc];
      return add(loose, [(xc - loose[0]) * kJoin, (0 - loose[1]) * kJoin, 0]);
    });
    const kIn = i => outBack(prog(t, this.FROM + 0.3 + i * 0.32, this.FROM + 0.75 + i * 0.32));

    // bóng các vòng trên bàn
    centers.forEach((c, i) => { const k = kIn(i); if (k <= 0) return;
      const pts = Array.from({ length: SEG + 1 }, (_, j) => P(shadowPt(scale(ringPt(c, i, j), c, k), L)));
      g.save(); g.strokeStyle = 'rgba(150,74,38,0.16)'; g.lineWidth = 16; g.lineJoin = 'round'; g.beginPath();
      pts.forEach((p, j) => j ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); g.restore(); });
    // mỗi vòng cắt 4 cung; mọi cung sắp xa → gần (painter) → hai vòng lồng vào nhau thật
    const arcs = [];
    centers.forEach((c, i) => { const k = kIn(i); if (k <= 0) return;
      for (let q = 0; q < 4; q++) { const pts = []; for (let j = q * SEG / 4 - 1; j <= (q + 1) * SEG / 4 + 1; j++) pts.push(P(scale(ringPt(c, i, j), c, k)));
        arcs.push({ pts, z: pts.reduce((s, p) => s + p[2], 0) / pts.length, lit: i % 2 ? 1 : 0.93 }); } });
    arcs.sort((p, q) => q.z - p.z).forEach(a => {
      g.save(); g.lineCap = 'butt'; g.lineJoin = 'round'; const path = pts => { g.beginPath(); pts.forEach((p, j) => j ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); };
      path(a.pts.slice(1, -1)); g.strokeStyle = C.ink; g.lineWidth = 21; g.stroke(); path(a.pts);
      g.strokeStyle = `rgb(${C.card.map(v => Math.round(v * a.lit)).join(',')})`; g.lineWidth = 15; g.stroke(); g.restore();
    });

    // tên từng mắt xích, phẳng, so le trên / dưới
    centers.forEach((c, i) => {
      const p = P(c), up = i % 2 === 0, k = prog(t, T.n[i], T.n[i] + 0.6);
      label(g, NAMES[i], p[0], up ? p[1] - 118 : p[1] + 132, { size: 24, align: 'center', color: C.ink, k });
    });
    // "perpendicular gives…", "distance becomes…": vạch nối dưới tên mắt xích đang nói (mực)
    const hi = (i, a) => { const p = P(centers[i]), w0 = NAMES[i].length * 9, y = i % 2 === 0 ? p[1] - 108 : p[1] + 142;
      line(g, [p[0] - w0, y], [p[0] + w0, y], C.ink, 3, [], prog(t, a, a + 0.4)); };
    hi(2, T.perp2); hi(4, T.dist2);

    it(g, 'a chain, not a list', 96, 260, 72, C.ink, { k: prog(t, T.link, T.chain + 0.5) });
    label(g, 'not one by one', 96, 330, { size: 26, k: prog(t, T.one, T.one + 0.6) });
    lamp(g, lp[0], 150);
    sectionTag(g, 'Act X · a chain, not a list', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
const scale = (p, c, k) => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k, c[2] + (p[2] - c[2]) * k];
