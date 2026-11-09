// j4 · The sphere (câu 186–189). Nửa hình tròn bìa quay quanh đường kính → cầu; cầu mờ đi để thấy tâm: tám điểm trên
// mặt cầu, chỉ đứt từ tâm tới từng điểm — cùng một khoảng r; mặt cầu tô xanh ngọc ở "surface area" (A = 4πr²); "volume"
// → mặt về màu bìa, ruột cầu gạch mực (V = ⁴⁄₃πr³).
import { C, prog, lookup, must, outCubic, smooth, ground, camLerp, solid, shadow, thread, dot3, lamp, line, it, label,
  formula, sectionTag, sphere, add, sub, mul, dot, cross3, norm, centroid, poly, hull, clamp } from '../kit.js';

const R = 1.3, Z0 = [0, 0, R], NH = 16;
const L = [-1.4, 3.0, 8];
const CAM0 = { yaw: -26, pitch: 18, dist: 10.5, target: [0, 0, 1.25], cx: 1260, cy: 600 };
const SPH = sphere(R, 48, 24), P3 = SPH.V.map(v => add(v, Z0));
const ROT = (p, a) => [p[0] * Math.cos(a), p[0] * Math.sin(a), p[1]];
const mix = (a, b, u) => a.map((v, i) => v + (b[i] - v) * u);
const HALF = Array.from({ length: NH + 1 }, (_, i) => { const b = Math.PI * i / NH; return [R * Math.sin(b), R - R * Math.cos(b)]; });
// tám điểm trên nửa cầu phía người xem (góc phương vị, góc cao — độ)
const PTS = [[-170, 10], [-150, 42], [-122, -22], [-100, 28], [-78, 4], [-58, 44], [-132, 66], [-92, -40]].map(([a, e]) => {
  const A = a * Math.PI / 180, E = e * Math.PI / 180; return add(Z0, [R * Math.cos(E) * Math.cos(A), R * Math.cos(E) * Math.sin(A), R * Math.sin(E)]); });

function skin(g, cam, items) {
  items.map(o => ({ ...o, z: cam.P(centroid(o.q))[2] })).sort((a, b) => b.z - a.z).forEach(o => {
    const q = o.q, c = centroid(q); let n = norm(cross3(sub(q[2], q[0]), sub(q[q.length - 1], q[1])));
    if (dot(n, sub(cam.pos, c)) < 0) n = mul(n, -1);
    const lit = Math.max(0, dot(n, norm(sub(L, c)))), k = 0.82 + 0.24 * lit, b = o.base || C.card;
    g.save(); g.globalAlpha = o.alpha ?? 1;
    g.fillStyle = `rgb(${Math.min(255, b[0] * k)},${Math.min(255, b[1] * k ** 1.25)},${Math.min(255, b[2] * k ** 1.6)})`;
    poly(g, q.map(cam.P)); g.fill(); g.strokeStyle = g.fillStyle; g.lineWidth = 1; g.stroke(); g.restore();
    (o.edges || []).forEach(([a, e]) => line(g, cam.P(a), cam.P(e), C.ink, o.ew || 3));
  });
}
function sweep(prof, th, alpha) {
  const n = Math.max(1, Math.ceil(48 * th / (2 * Math.PI))), out = [];
  for (let j = 0; j + 1 < prof.length; j++) for (let i = 0; i < n; i++) { const a = th * i / n, b = th * (i + 1) / n;
    out.push({ q: [ROT(prof[j], a), ROT(prof[j], b), ROT(prof[j + 1], b), ROT(prof[j + 1], a)], alpha }); }
  return out;
}

export default class Sphere {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L: Ln, w } = lookup(tl, 'j4');
    this.T = {
      sphere: w(186, 'sphere'), half: w(186, 'half-circle'), spins: w(186, 'spins'), diam: w(186, 'diameter'),
      points: w(187, 'points'), same: w(187, 'same'), center: w(187, 'center'), radius: w(187, 'radius'),
      surface: w(188, 'surface'), four: w(188, 'four'), squared: w(188, 'squared'),
      volume: w(189, 'volume'), four2: w(189, 'four'), cubed: w(189, 'cubed'), end: Ln(189).end,
    };
    this.START = Ln(186).start;
    this.FROM = Math.max(this.START - 1.2, Ln(185).end + 0.5);
    // mọi điểm vẽ trên mặt cầu cách tâm đúng r
    PTS.forEach(p => must(`${Math.hypot(...sub(p, Z0)).toFixed(9)}`, R));
  }
  sfx() {
    const T = this.T;
    return [{ t: T.half, kind: 'flap' }, { t: T.points, kind: 'pen' }, { t: T.four, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min((t - this.FROM) * 0.35, 6.5);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAM0, yaw: CAM0.yaw + drift, dist: 9.6 }, smooth(prog(t, T.points - 0.5, T.points + 1))), P = cam.P;

    const th = 2 * Math.PI * smooth(prog(t, T.spins, T.diam + 0.6)), built = th >= 2 * Math.PI - 1e-9;
    const kCard = outCubic(prog(t, T.half, T.half + 0.5));
    const kSee = smooth(prog(t, T.points - 0.3, T.points + 0.3)) * (1 - smooth(prog(t, T.surface - 0.4, T.surface)));
    const kTeal = smooth(prog(t, T.surface, T.surface + 0.5)) * (1 - smooth(prog(t, T.volume, T.volume + 0.5)));

    // bóng
    if (built) shadow(g, cam, P3, L, { a: 0.42 });
    else if (kCard > 0) shadow(g, cam, sweep(HALF.map(([r, z]) => [r, z * kCard]), Math.max(th, 0.05), 1).flatMap(o => o.q), L, { a: 0.3 });

    // trục (que): xuyên qua cầu — phần trong khuất
    const kAx = prog(t, this.FROM + 0.3, this.FROM + 0.9), top = 2 * R + 0.7;
    if (!built) thread(g, cam, [0, 0, 0], [0, 0, top], { w: 4, k: kAx });

    if (!built) {
      const items = th > 0 ? sweep(HALF, th, 0.3 + 0.7 * th / (2 * Math.PI)) : [];
      if (kCard > 0) { const pr = HALF.map(([r, z]) => ROT([r * kCard, z], th)); items.push({ q: pr, edges: pr.slice(1).map((p, i) => [pr[i], p]) }); }
      skin(g, cam, items);
      // vệt của mép nửa tròn: ba vĩ tuyến
      if (th > 0) [4, 8, 12].forEach(j => { const n = 40, m = Math.ceil(n * th / (2 * Math.PI));
        for (let i = 0; i < m; i++) line(g, P(ROT(HALF[j], th * i / m)), P(ROT(HALF[j], th * (i + 1) / m)), C.inkA(0.7), 2.5); });
      // đường kính trên trục
      const kD = prog(t, T.diam - 0.1, T.diam + 0.4);
      if (kD > 0) { line(g, P([0, 0, 0]), P([0, 0, 2 * R]), C.ink, 7, [], kD); const m = P([0, 0, R]); label(g, 'diameter', m[0] - 40, m[1] + 10, { size: 28, color: C.ink, align: 'right', k: kD }); }
    } else {
      // tâm, chỉ từ tâm (khuất trong cầu → vẽ trước, đứt), rồi mặt cầu (mờ khi cần nhìn vào trong)
      const kC = prog(t, T.center, T.center + 0.3) * (1 - prog(t, T.surface - 0.4, T.surface));
      const rays = k => PTS.forEach((p, i) => { const kk = prog(t, T.same + i * 0.12, T.same + i * 0.12 + 0.5) * (1 - prog(t, T.surface - 0.4, T.surface));
        if (kk > 0 && !(i === 4 && t >= T.radius)) line(g, P(Z0), P(p), C.inkA(0.75 * k), 2.5, [8, 8], kk); });
      rays(1);
      dot3(g, cam, Z0, { r: 8, k: kC });
      solid(g, cam, SPH, P3, L, { base: mix(C.card, C.teal, kTeal), alpha: 1 - 0.6 * kSee });
      // gạch mực ruột cầu (thể tích), quét từ trái sang
      const kV = prog(t, T.volume, T.volume + 1.0);
      if (kV > 0) {
        const sil = hull(P3.map(P)), xs = sil.map(p => p[0]), ys = sil.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
        g.save(); poly(g, sil); g.clip(); g.beginPath(); g.rect(x0, y0, (x1 - x0) * kV, y1 - y0); g.clip();
        for (let x = x0 - (y1 - y0); x < x1; x += 16) line(g, [x, y1], [x + (y1 - y0), y0], C.inkA(0.28), 2);
        g.restore();
      }
      // điểm trên mặt (thấy qua lớp bìa mờ)
      PTS.forEach((p, i) => dot3(g, cam, p, { r: 7, k: prog(t, T.points + i * 0.08, T.points + i * 0.08 + 0.3) * (1 - prog(t, T.surface - 0.4, T.surface)) }));
      if (kC > 0) { const c = P(Z0); label(g, 'center', c[0] - 22, c[1] + 44, { size: 28, color: C.ink, align: 'right', k: kC }); }
      // bán kính: một sợi đậm xanh ngọc + r
      const kR = prog(t, T.radius, T.radius + 0.4) * (1 - prog(t, T.surface - 0.4, T.surface));
      if (kR > 0) { line(g, P(Z0), P(PTS[4]), C.tealT, 6, [], kR); dot3(g, cam, PTS[4], { r: 8, color: C.tealT });
        const m = P(mul(add(Z0, PTS[4]), 0.5)); it(g, 'r', m[0] + 6, m[1] - 18, 60, C.tealT, { k: kR }); }
    }

    lamp(g, clamp(P(L)[0], 640, 1700), 150, { on: 1 });

    // ── chữ ──
    sectionTag(g, 'Act IX · the sphere', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'sphere', 96, 250, 92, C.ink, { k: prog(t, T.sphere, T.sphere + 0.5) });
    it(g, 'same distance r from the center', 96, 340, 46, C.lead, { wt: 500, k: prog(t, T.same, T.center + 0.3) });
    it(g, 'A = 4πr²', 96, 480, 104, C.ink, { k: prog(t, T.four, T.squared + 0.2) });
    const kF = t < T.four2 ? prog(t, T.volume, T.volume + 0.3) / 3 : t < T.four2 + 0.5 ? 2 / 3 : 1;
    formula(g, ['V = ', { frac: ['4', '3'] }, 'πr³'], 96, 640, 104, C.ink, kF);
  }
}
