// j2 · The cylinder (câu 173–178). Chữ nhật bìa cắm trên trục quay 360° → vệt quét thành trụ; V = πr²h; trụ = lăng
// trụ đáy tròn (đáy lục giác → tròn dần); mặt cong tô xanh ngọc = NHÃN LON; bóc nhãn (tear) duỗi thẳng thành tờ chữ
// nhật đứng rồi đặt nằm trên bàn: cạnh dài 2πr (= vòng đáy), cạnh ngắn h.
import { C, prog, lookup, must, outCubic, smooth, ground, camLerp, solid, shadow, thread, dot3, lamp, line, it, label,
  sectionTag, revolve, add, sub, mul, dot, cross3, norm, centroid, poly, clamp } from '../kit.js';

const R = 1, Hc = 2.2, NS = 60, RL = R * 1.012, S = 2 * Math.PI * RL;
const L = [-1.4, 3.0, 8];
const CAM0 = { yaw: -28, pitch: 20, dist: 11, target: [0, 0, 1.0], cx: 1260, cy: 610 };
const CAM1 = { yaw: -20, pitch: 30, dist: 15.5, target: [2.7, -1.5, 0.4], cx: 1180, cy: 600 };
const CYL = revolve(R, Hc, R, NS);
const ROT = (p, a) => [p[0] * Math.cos(a), p[0] * Math.sin(a), p[1]];

/** Mặt tạm (quad/tam giác 3D) vẽ xa → gần, tô hai mặt theo đèn L; edges = đoạn mực vẽ ngay sau mặt đó. */
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
/** Vệt quét của profile [[ρ, z]…] quanh trục z từ 0 tới th. */
function sweep(prof, th, alpha) {
  const n = Math.max(1, Math.ceil(48 * th / (2 * Math.PI))), out = [];
  for (let j = 0; j + 1 < prof.length; j++) { if (prof[j][0] === 0 && prof[j + 1][0] === 0) continue;
    for (let i = 0; i < n; i++) { const a = th * i / n, b = th * (i + 1) / n;
      out.push({ q: [ROT(prof[j], a), ROT(prof[j], b), ROT(prof[j + 1], b), ROT(prof[j + 1], a)], alpha }); } }
  return out;
}
/** Vòng tròn tâm trục, cao z: cung thấy liền, cung khuất (sau thân) nét đứt; k vẽ dần từ phía trước. */
function ring(g, cam, r, z, { color = C.ink, w = 3, k = 1, hide = true, a0 = -Math.PI / 2 } = {}) {
  if (k <= 0) return; const n = 72, m = Math.ceil(n * clamp(k));
  for (let i = 0; i < m; i++) { const a = a0 + 2 * Math.PI * i / n, b = a0 + 2 * Math.PI * Math.min(i + 1, n * k) / n;
    const p = [r * Math.cos(a), r * Math.sin(a), z], q = [r * Math.cos(b), r * Math.sin(b), z];
    const vis = !hide || dot([Math.cos(a), Math.sin(a), 0], sub(cam.pos, p)) > 0;
    line(g, cam.P(p), cam.P(q), vis ? color : C.inkA(0.5), vis ? w : 2.2, vis ? [] : [9, 9]); }
}
/** Bán kính đa giác n cạnh (đỉnh ở góc 0) theo góc a; n ≥ NS = tròn. */
const rho = (a, n) => n >= NS ? R : R * Math.cos(Math.PI / n) / Math.cos(((a % (2 * Math.PI / n)) + 2 * Math.PI / n) % (2 * Math.PI / n) - Math.PI / n);
/** Nhãn lon tại cung s, cao z: u = duỗi (0 quấn quanh lon → 1 phẳng đứng), f = đặt nằm (0 đứng → 1 nằm trên bàn). */
function lab(s, z, u, f) {
  let x, y; if (u >= 0.9999) { x = s; y = -RL; } else { const Rr = RL / (1 - u), ph = s / Rr; x = Rr * Math.sin(ph); y = -RL + 2 * Rr * Math.sin(ph / 2) ** 2; }
  const a = f * Math.PI / 2; return [x, y - z * Math.sin(a), z * Math.cos(a)];
}

export default class Cylinder {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L: Ln, w } = lookup(tl, 'j2');
    this.T = {
      cyl: w(173, 'cylinder'), rect: w(173, 'rectangle'), spins: w(173, 'spins'), sides: w(173, 'sides'),
      vol: w(174, 'volume'), base: w(174, 'base'), h1: w(174, 'height', 1), pi: w(174, 'pi'), rad: w(174, 'radius'), h2: w(174, 'height', 2),
      prism: w(175, 'prism', 1), prism2: w(175, 'prism', 2), really: w(175, 'really'), round: w(175, 'round'), base175: w(175, 'base'),
      curved: w(176, 'curved'), around: w(176, 'around'), h3: w(176, 'height', 1), two: w(176, 'two'), h4: w(176, 'height', 2),
      quick: w(177, 'quickest'), peel: w(177, 'peel'), soda: w(177, 'soda'),
      laid: w(178, 'laid'), flat: w(178, 'flat'), rectangle: w(178, 'rectangle'), dist: w(178, 'distance'), h5: w(178, 'height'),
      end: Ln(178).end,
    };
    this.START = Ln(173).start;
    this.FROM = Math.max(this.START - 1.2, Ln(172).end + 0.5);
    // toán trên hình (trạng thái xong): nhãn duỗi ra dài đúng chu vi đáy, diện tích nhãn = 2πrh
    must(`${S / RL}`, 2 * Math.PI);
    must(`${(S / RL) * R * Hc}`, 2 * Math.PI * R * Hc);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.rect, kind: 'flap' }, { t: T.prism, kind: 'snap' }, { t: T.curved, kind: 'pen' },
      { t: T.peel, kind: 'tear' }, { t: T.flat + 1.15, kind: 'flap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const move = smooth(prog(t, T.quick, T.flat + 0.6)), drift = Math.min((t - this.FROM) * 0.35, 7);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAM1, yaw: CAM1.yaw + drift }, move), P = cam.P;

    // ── trạng thái ──
    const th = 2 * Math.PI * smooth(prog(t, T.spins, T.sides + 0.4)), built = th >= 2 * Math.PI - 1e-9;
    const kCard = outCubic(prog(t, T.rect, T.rect + 0.5));
    const mHex = smooth(prog(t, T.prism, T.prism + 0.45)), steps = [6, 10, 12, 20, 30, 60];
    const sides = mHex <= 0 ? NS : t < T.round - 0.1 ? 6 : steps[Math.min(5, Math.floor(prog(t, T.round - 0.1, T.base175 + 0.5) * 6))];
    const kWrap = outCubic(prog(t, T.curved, T.curved + 0.8));
    const u = smooth(prog(t, T.peel + 0.1, T.flat)), f = smooth(prog(t, T.flat, T.flat + 1.1));

    // khối trụ (hình học theo trạng thái đa giác)
    // trước "round": tròn → lục giác theo mHex; từ "round": 6 → 10 → 12 → 20 → 30 → tròn
    const P3 = CYL.V.map((v, i) => { const a = (i % NS) * 2 * Math.PI / NS, rr = sides >= NS ? R : R + (rho(a, sides) - R) * (sides === 6 ? mHex : 1);
      return [rr * Math.cos(a), rr * Math.sin(a), v[2]]; });
    CYL.edges.forEach(e => { const vert = e.a % NS === e.b % NS; e.smooth = vert && !(sides < NS && mHex > 0.5 && (e.a % NS) % (NS / sides) === 0); });

    // nhãn lon (xanh ngọc): quấn vào từ phía trước theo kWrap, rồi bóc + duỗi + đặt nằm
    const lb = [], NL = 60;
    if (kWrap > 0) {
      const sMax = S * kWrap;
      for (let i = 0; i < NL; i++) {
        const s0 = sMax * i / NL, s1 = sMax * (i + 1) / NL, a = lab(s0, 0, u, f), b = lab(s1, 0, u, f), c = lab(s1, Hc, u, f), d = lab(s0, Hc, u, f);
        const ed = [[a, b], [d, c]]; if (i === 0) ed.push([a, d]); if (i === NL - 1 && kWrap >= 1) ed.push([b, c]);
        lb.push({ q: [a, b, c, d], base: C.teal, edges: ed, ew: 2.5 });
      }
    }
    const zC = P([0, 0, Hc / 2])[2], back = lb.filter(o => P(centroid(o.q))[2] > zC), front = lb.filter(o => P(centroid(o.q))[2] <= zC);

    // ── bóng (đèn L, mép mềm) ──
    if (built) shadow(g, cam, P3, L, { a: 0.42 });
    else if (kCard > 0) shadow(g, cam, [...sweep([[0, 0], [R, 0], [R, Hc * kCard], [0, Hc * kCard]], Math.max(th, 0.05), 1).flatMap(o => o.q)], L, { a: 0.3 });
    if (lb.length && u > 0.05) shadow(g, cam, lb.flatMap(o => o.q), L, { a: 0.25 * u });

    // ── trục quay (que mực) — rút vào trong lon sau câu 174 ──
    const axTop = Hc + 0.9 * (1 - smooth(prog(t, T.h2 + 0.6, T.h2 + 1.2)));
    const kAx = prog(t, this.FROM + 0.3, this.FROM + 0.9);
    if (!built) thread(g, cam, [0, 0, 0], [0, 0, axTop], { w: 4, k: kAx });

    // ── quét: vệt mờ dần đặc + tấm bìa chữ nhật ở góc th ──
    if (!built) {
      const items = th > 0 ? sweep([[0, 0], [R, 0], [R, Hc], [0, Hc]], th, 0.3 + 0.7 * th / (2 * Math.PI)) : [];
      if (kCard > 0) { const pr = [[0, 0], [R, 0], [R, Hc * kCard], [0, Hc * kCard]].map(p => ROT(p, th));
        items.push({ q: pr, edges: [[pr[0], pr[1]], [pr[1], pr[2]], [pr[2], pr[3]]] }); }
      skin(g, cam, items);
      if (th > 0) { ring(g, cam, R, 0, { k: th / (2 * Math.PI), a0: 0, hide: false, w: 2.5, color: C.inkA(0.8) });
        ring(g, cam, R, Hc, { k: th / (2 * Math.PI), a0: 0, hide: false, w: 2.5, color: C.inkA(0.8) }); }
      if (kCard > 0) dot3(g, cam, ROT([R, Hc], th), { r: 6 });
    } else {
      skin(g, cam, back);
      solid(g, cam, CYL, P3, L);
      skin(g, cam, front);
      // đường viền hai bên của nhãn đang quấn (cạnh thân trụ bị nhãn che)
      if (lb.length && u < 0.3) for (let i = 1; i < lb.length; i++) {
        const fa = o => { const [a, b] = [o.q[0], o.q[1]], T3 = sub(b, a), n = [T3[1], -T3[0], 0]; return dot(n, sub(cam.pos, a)) > 0; };
        if (fa(lb[i - 1]) !== fa(lb[i])) line(g, P(lb[i].q[0]), P(lb[i].q[3]), C.ink, 3);
      }
      // trục: phần trong lon khuất, phần nhô lên liền
      if (axTop > Hc + 0.01) { line(g, P([0, 0, Hc]), P([0, 0, 0]), C.inkA(0.5), 2.2, [9, 9]); thread(g, cam, [0, 0, Hc], [0, 0, axTop], { w: 4 }); }
      // nắp lon (vành trong) ở "soda can"
      ring(g, cam, R * 0.82, Hc, { k: prog(t, T.soda, T.soda + 0.5), hide: false, w: 2.5 });
    }

    // ── kích thước: h cạnh lon, r trên nắp, vòng đáy (2πr) ──
    // thước h cạnh lon: kẻ ra ở "height" (174), cuộn lại (rút về chân) khi bắt đầu bóc nhãn
    const kH = prog(t, T.h1, T.h1 + 0.5) * (1 - prog(t, T.quick - 0.3, T.quick + 0.3)), hx = -(R + 0.5);
    if (kH > 0) {
      const a = P([hx, 0, 0]), b = P([hx, 0, Hc]);
      line(g, a, b, C.ink, 3, [], kH); line(g, [a[0] - 12, a[1]], [a[0] + 12, a[1]], C.ink, 3);
      if (kH >= 1) line(g, [b[0] - 12, b[1]], [b[0] + 12, b[1]], C.ink, 3);
      it(g, 'h', (a[0] + b[0]) / 2 - 52, (a[1] + b[1]) / 2 + 18, 60, C.ink, { k: kH });
    }
    const kR = prog(t, T.rad, T.rad + 0.4) * (1 - prog(t, T.quick - 0.4, T.quick));
    if (kR > 0 && built) { const e = [R * Math.cos(-0.6), R * Math.sin(-0.6), Hc]; thread(g, cam, [0, 0, Hc], e, { w: 3, k: kR });
      dot3(g, cam, [0, 0, Hc], { r: 5, k: kR }); const m = P(mul(add([0, 0, Hc], e), 0.5)); it(g, 'r', m[0] - 6, m[1] - 16, 54, C.ink, { k: kR }); }
    // vòng quanh đáy = "distance around": câu 176 (trên lon) và câu 178 (sau khi bóc nhãn)
    const kC1 = prog(t, T.around - 0.1, T.around + 0.7) * (1 - prog(t, T.quick, T.quick + 0.3));
    const kC2 = prog(t, T.dist, T.dist + 0.8);
    if (built) { const kc = Math.max(kC1, kC2); if (kc > 0) ring(g, cam, RL, 0.01, { k: kc, w: 5 });
      if (kC1 > 0 && kC2 <= 0) { const p = P([0, -RL, 0]); it(g, '2πr', p[0] - 20, p[1] + 62, 54, C.ink, { k: kC1 }); } }

    // ── tờ nhãn nằm trên bàn: 2πr × h ──
    if (f > 0.9) {
      const k1 = prog(t, T.dist, T.dist + 0.6), k2 = prog(t, T.h5, T.h5 + 0.4);
      const a = P([0, -RL - Hc - 0.25, 0]), b = P([S, -RL - Hc - 0.25, 0]);
      line(g, a, b, C.ink, 3, [], k1);
      it(g, '2πr', (a[0] + b[0]) / 2 - 40, (a[1] + b[1]) / 2 + 62, 60, C.ink, { k: k1 });
      label(g, 'distance around the can', (a[0] + b[0]) / 2 + 60, (a[1] + b[1]) / 2 + 58, { size: 28, k: k1 });
      const c = P([S + 0.3, -RL, 0]), d = P([S + 0.3, -RL - Hc, 0]);
      line(g, c, d, C.ink, 3, [], k2); it(g, 'h', (c[0] + d[0]) / 2 + 20, (c[1] + d[1]) / 2 + 16, 60, C.ink, { k: k2 });
    }

    // ── đèn ──
    lamp(g, clamp(P(L)[0], 640, 1700), 150, { on: 1 });

    // ── chữ (cột trái) ──
    sectionTag(g, 'Act IX · the cylinder', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'cylinder', 96, 250, 92, C.ink, { k: prog(t, T.cyl, T.cyl + 0.6) });
    it(g, 'volume = base × height', 96, 340, 46, C.lead, { wt: 500, k: prog(t, T.vol, T.h1 + 0.3) });
    it(g, 'V = πr²h', 96, 450, 104, C.ink, { k: prog(t, T.pi, T.h2 + 0.2) });
    label(g, 'a prism with a round base', 100, 510, { size: 28, k: prog(t, T.really, T.base175 + 0.2) });
    it(g, 'curved area = around × height', 96, 610, 46, C.lead, { wt: 500, k: prog(t, T.curved, T.h3 + 0.3) });
    it(g, 'A = 2πrh', 96, 720, 104, C.ink, { k: prog(t, T.two, T.h4 + 0.2) });
  }
}
