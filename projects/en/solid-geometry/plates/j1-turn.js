// j1 · Turning a flat shape — MỞ HỒI IX "Solids that spin". Một que (trục) cắm trên bàn, một hình giấy phẳng (nửa
// mặt cắt bình) dán vào que; "spins" → hình quay một vòng quanh trục, để lại vệt quét (đường viền mờ mỗi 30°);
// "solid" → khối tròn xoay gấp vào (lưới tiện cục bộ `lathe`). Không mascot.
import { C, prog, lookup, outCubic, smooth, ground, pool, camera, sheet, shadow, solid, thread, dot3, lamp, line, it, label,
  sectionTag, actCard, dark, clamp } from '../kit.js';

const LAMP = [-3.2, -3.4, 10];
const CAM = { yaw: -18, pitch: 20, dist: 10.5, target: [0, 0, 1.35], cx: 1240, cy: 600 };
// mặt cắt (r, z) của bình — hình phẳng sẽ quay
const PROF = [[1.0, 0], [1.22, 0.4], [1.08, 0.95], [0.66, 1.55], [0.5, 2.0], [0.74, 2.4]];
const AX = 2.95;                                       // que cao hơn miệng bình

/** Lưới tiện: quay mặt cắt (r, z) quanh trục z, n nấc. Vành đáy/miệng là cạnh thật; còn lại "smooth". Đáng gom vào kit. */
function lathe(prof, n = 48) {
  const V = [], faces = [], m = prof.length;
  prof.forEach(([r, z]) => { for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n; V.push([r * Math.cos(a), r * Math.sin(a), z]); } });
  const id = (j, i) => j * n + (i % n);
  faces.push([...Array(n).keys()].map(i => id(0, i)).reverse(), [...Array(n).keys()].map(i => id(m - 1, i)));
  for (let j = 0; j < m - 1; j++) for (let i = 0; i < n; i++) faces.push([id(j, i), id(j, i + 1), id(j + 1, i + 1), id(j + 1, i)]);
  const E = new Map();
  faces.forEach((f, fi) => f.forEach((a, k) => { const b = f[(k + 1) % f.length], key = Math.min(a, b) + '-' + Math.max(a, b);
    (E.get(key) ?? E.set(key, { a: Math.min(a, b), b: Math.max(a, b), f: [] }).get(key)).f.push(fi); }));
  const edges = [...E.values()];
  edges.forEach(e => { const ja = Math.floor(e.a / n), jb = Math.floor(e.b / n); e.smooth = !(ja === jb && (ja === 0 || ja === m - 1)); });
  return { V, faces, edges, round: true };
}
const VASE = lathe(PROF);
const flicker = (t, tF) => 1 - 0.9 * clamp(1 - Math.abs(t - tF) / 0.15);
/** Hình phẳng ở góc a: trục (0,0,0) → mép mặt cắt → trục (0,0,zTop). */
const flat = a => [[0, 0, 0], ...PROF.map(([r, z]) => [r * Math.cos(a), r * Math.sin(a), z]), [0, 0, PROF.at(-1)[1]]];

export default class Turn {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'j1');
    this.START = L(171).start;
    this.FROM = Math.max(this.START - 2.6, L(170).end + 0.5);
    this.tF = Math.max(this.START - 2.4, this.FROM + 0.95);
    this.T = {
      second: w(171, 'second'), family: w(171, 'family'), rotation: w(171, 'rotation'),
      flat: w(172, 'flat'), spins: w(172, 'spins'), axis: w(172, 'axis'), sweeps: w(172, 'sweeps'), solid: w(172, 'solid'),
      revolution: w(172, 'revolution'), end: L(172).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: this.tF + 0.1, kind: 'shimmer' }, { t: this.START + 0.15, kind: 'flap' }, { t: T.solid + 0.05, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, st = this.START;
    ground(g);
    const on = flicker(t, this.tF);
    const drift = Math.min(Math.max(0, t - st) * 0.5, 4);
    const cam = camera({ ...CAM, yaw: CAM.yaw + drift }), P = cam.P;
    const pc = P([0, 0, 0]);
    g.save(); g.globalAlpha = on; pool(g, pc[0] - 50, pc[1] - 60, 640, 0.55); g.restore();

    const kStick = outCubic(prog(t, st - 0.2, st + 0.5)), kShape = outCubic(prog(t, st + 0.2, st + 1.0));
    // góc quay: một vòng từ "spins" tới "sweeps"; lắc nhẹ ở "rotation" (báo trước)
    const turn = smooth(prog(t, T.spins - 0.05, T.sweeps + 0.35));
    const hint = 0.35 * Math.sin(Math.PI * prog(t, T.rotation - 0.1, T.rotation + 0.9));
    const ang = -0.55 + hint + turn * 2 * Math.PI;
    const kSolid = outCubic(prog(t, T.solid - 0.2, T.solid + 0.7));

    if (kStick > 0) {
      // bóng: khối (khi đã hiện) hoặc hình phẳng
      if (kSolid > 0) shadow(g, cam, VASE.V, LAMP, { a: 0.42 * kSolid });
      if (kShape > 0) shadow(g, cam, flat(ang).map(p => [p[0], p[1], p[2] * kShape]), LAMP, { a: 0.32 * (1 - kSolid) });
      // vệt quét: viền mặt cắt mỗi 30° đã đi qua
      if (turn > 0 && kSolid < 1) {
        const n = Math.floor(turn * 12);
        for (let i = 0; i <= n; i++) { const a = -0.55 + i * Math.PI / 6, pts = PROF.map(([r, z]) => P([r * Math.cos(a), r * Math.sin(a), z]));
          g.save(); g.strokeStyle = C.inkA(0.28 * (1 - kSolid)); g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath();
          pts.forEach(([x, y], q) => (q ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.restore(); }
        // vòng tròn mép đáy/miệng đi theo góc
        [0, PROF.length - 1].forEach(j => { const [r, z] = PROF[j], N = 40, m = Math.max(1, Math.round(N * turn));
          g.save(); g.strokeStyle = C.inkA(0.45 * (1 - kSolid)); g.lineWidth = 2.5; g.beginPath();
          for (let q = 0; q <= m; q++) { const a = -0.55 + (turn * 2 * Math.PI) * q / m, p = P([r * Math.cos(a), r * Math.sin(a), z]); q ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }
          g.stroke(); g.restore(); });
      }
      // que (trục): phần dưới khối nét đứt khi khối đã hiện
      if (kSolid > 0.5) thread(g, cam, [0, 0, 0], [0, 0, PROF.at(-1)[1]], { w: 4, dash: [10, 9], color: C.inkA(0.6) });
      if (kSolid < 1) {
        const F = flat(ang).map(p => [p[0], p[1], p[2] * kShape]);
        if (kShape > 0) sheet(g, cam, F, { k: kShape * (1 - kSolid), thick: 0.03, fill: C.teal, edge: C.ink });
        thread(g, cam, [0, 0, 0], [0, 0, AX * kStick], { w: 5 });
      }
      if (kSolid > 0) { solid(g, cam, VASE, VASE.V, LAMP, { k: kSolid, base: C.card });
        thread(g, cam, [0, 0, PROF.at(-1)[1]], [0, 0, AX], { w: 5 }); }
      dot3(g, cam, [0, 0, AX], { r: 7, k: kStick });
    }
    lamp(g, 860, 150, { on: on * (0.6 + 0.4 * prog(t, this.tF, this.tF + 0.3)) });

    // nhãn phẳng cạnh điểm chiếu
    const top = P([0, 0, AX]);
    label(g, 'axis', top[0] + 22, top[1] - 6, { size: 26, color: C.ink, k: prog(t, T.axis - 0.1, T.axis + 0.4) });
    const pr = P([PROF[2][0] * Math.cos(ang) * 1.0, PROF[2][0] * Math.sin(ang), PROF[2][1]]);
    if (kSolid < 0.3) label(g, 'flat shape', pr[0] + 40, pr[1] + 8, { size: 24, color: C.tealT, k: prog(t, T.flat - 0.1, T.flat + 0.4) * (t < T.spins ? 1 : 0) });

    // cột chữ trái
    sectionTag(g, 'Act IX · solids that spin', prog(t, st, st + 0.6));
    it(g, 'born from rotation', 96, 270, 60, C.ink, { k: prog(t, T.family, T.rotation + 0.5) });
    it(g, 'flat shape + spin', 96, 380, 54, C.ink, { k: prog(t, T.flat, T.spins + 0.5) });
    label(g, 'around a fixed axis', 96, 440, { size: 26, k: prog(t, T.axis - 0.3, T.axis + 0.4) });
    it(g, '= a solid of revolution', 96, 540, 60, C.ink, { k: prog(t, T.sweeps, T.solid + 0.5) });

    actCard(g, t, st, 'ACT NINE', 'Solids that spin');
    dark(g, on);
  }
}
