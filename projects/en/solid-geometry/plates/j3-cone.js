// j3 · The cone (câu 179–185). Tam giác vuông bìa quay quanh cạnh góc vuông → nón; ba cái nón giấy (ốc quế, cọc giao
// thông, mũ sinh nhật) trồi lên rồi lún xuống; V = ⅓πr²h; nón = chóp đáy tròn (đáy vuông → tròn dần); đường sinh l
// (xanh ngọc) chạy quanh "any point"; A = πrl; mặt nón mở ra thành hình quạt bán kính l, góc 360°·r/l (tính ở init).
import { C, CG, prog, lookup, must, outCubic, outBack, smooth, ground, camLerp, solid, shadow, sheet, thread, dot3, rightMark,
  lamp, line, it, label, mono, formula, measure, sectionTag, revolve, sphere, box, ngon, add, sub, mul, dot, cross3, norm, centroid, poly, clamp } from '../kit.js';

const R = 1.2, Hc = 1.6, LS = Math.hypot(R, Hc), NS = 60, SECT = 360 * R / LS;
const L = [-1.4, 3.0, 8];
const CAM0 = { yaw: -24, pitch: 22, dist: 10.5, target: [0, 0, 0.8], cx: 1260, cy: 620 };
const CAMS = { yaw: -24, pitch: 22, dist: 15, target: [4.4, -0.3, 0.6], cx: 1170, cy: 620 };
const CAMU = { yaw: -24, pitch: 36, dist: 11.5, target: [-0.7, 0.5, 0], cx: 1260, cy: 600 };
const CONE = revolve(R, Hc, 0, NS);
const ROT = (p, a) => [p[0] * Math.cos(a), p[0] * Math.sin(a), p[1]];
const mix = (a, b, u) => a.map((v, i) => v + (b[i] - v) * u);
// ba cái nón đời thường (cục bộ — báo đạo diễn gom nếu cảnh khác cần)
const ICE = revolve(0.4, 1.1, 0, 32), SCOOP = sphere(0.44, 24, 12), TCONE = revolve(0.38, 1.25, 0, 32), PLATE = box(0.95, 0.95, 0.08);
const HAT = revolve(0.42, 1.1, 0, 32), POM = sphere(0.13, 16, 8);
const SPOT = [[3.0, -0.3], [5.3, -0.3], [7.6, -0.3]];

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
  for (let j = 0; j + 1 < prof.length; j++) { if (prof[j][0] === 0 && prof[j + 1][0] === 0) continue;
    for (let i = 0; i < n; i++) { const a = th * i / n, b = th * (i + 1) / n;
      out.push({ q: [ROT(prof[j], a), ROT(prof[j], b), ROT(prof[j + 1], b), ROT(prof[j + 1], a)], alpha }); } }
  return out;
}
/** Cung tròn tâm c (trên mặt z = c[2]) bán kính r, từ góc a0 tới a1; vis(p, a) quyết định liền/đứt. */
function arc(g, cam, c, r, a0, a1, { color = C.ink, w = 3, k = 1, dash = [], vis = null } = {}) {
  if (k <= 0) return; const n = 64, m = Math.ceil(n * clamp(k));
  for (let i = 0; i < m; i++) { const a = a0 + (a1 - a0) * i / n, b = a0 + (a1 - a0) * Math.min(i + 1, n * k) / n;
    const p = add(c, [r * Math.cos(a), r * Math.sin(a), 0]), q = add(c, [r * Math.cos(b), r * Math.sin(b), 0]), v = vis ? vis(p, a) : true;
    line(g, cam.P(p), cam.P(q), v ? color : C.inkA(0.5), v ? w : 2.2, v ? dash : [9, 9]); }
}
const rho = (a, n) => n >= NS ? R : R * Math.cos(Math.PI / n) / Math.cos(((a % (2 * Math.PI / n)) + 2 * Math.PI / n) % (2 * Math.PI / n) - Math.PI / n);
const place = (m, at, z0 = 0, kz = 1, flip = false, zTop = 0) => m.V.map(([x, y, z]) => [x + at[0], y + at[1], ((flip ? zTop - z : z) + z0) * kz]);

export default class Cone {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L: Ln, w } = lookup(tl, 'j3');
    this.T = {
      cone: w(179, 'cone'), right: w(179, 'right'), spins: w(179, 'spins'), sides: w(179, 'sides'),
      ice: w(180, 'ice-cream'), traffic: w(180, 'traffic'), party: w(180, 'party'), cones: w(180, 'cones'),
      vol: w(181, 'volume'), third: w(181, 'third'), pi: w(181, 'pi'), rad: w(181, 'radius'), hgt: w(181, 'height'),
      third2: w(182, 'third'), really: w(182, 'really'), pyr: w(182, 'pyramid'), round: w(182, 'round'), base182: w(182, 'base'),
      slant: w(183, 'slant'), tip: w(183, 'tip'), any: w(183, 'any'), edge: w(183, 'edge'), base183: w(183, 'base'),
      curved: w(184, 'curved'), pi184: w(184, 'pi'), h184: w(184, 'height'),
      unroll: w(185, 'unroll'), paper: w(185, 'paper'), sector: w(185, 'sector'), circle: w(185, 'circle'), pizza: w(185, 'pizza'),
      end: Ln(185).end,
    };
    this.START = Ln(179).start;
    this.FROM = Math.max(this.START - 1.2, Ln(178).end + 0.5);
    // toán trên hình: l = √(r² + h²) = 2; góc quạt = 360·r/l = 216°; cung quạt = 2πr (chu vi đáy)
    must(`${LS}`, 2); must(`360 × ${R} / ${LS}`, 216);
    must(`${LS} × ${SECT} × Math.PI / 180`, 2 * Math.PI * R);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.right, kind: 'flap' }, { t: T.ice, kind: 'tick' }, { t: T.traffic, kind: 'tick' }, { t: T.party, kind: 'tick' },
      { t: T.pyr, kind: 'snap' }, { t: T.slant, kind: 'pen' }, { t: T.pi184, kind: 'pen' }, { t: T.paper + 0.3, kind: 'flap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min((t - this.FROM) * 0.3, 6);
    const kSide = smooth(prog(t, T.ice - 0.5, T.ice + 0.3)) * (1 - smooth(prog(t, T.vol - 0.4, T.vol + 0.5)));
    const kUn = smooth(prog(t, T.unroll - 0.3, T.circle));
    const camA = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAMS, yaw: CAMS.yaw + drift }, kSide);
    const cam = kUn > 0 ? camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAMU, yaw: CAMU.yaw + drift }, kUn) : camA, P = cam.P;

    const th = 2 * Math.PI * smooth(prog(t, T.spins, T.sides + 0.3)), built = th >= 2 * Math.PI - 1e-9;
    const kCard = outCubic(prog(t, T.right, T.right + 0.5));
    const mPyr = smooth(prog(t, T.pyr, T.pyr + 0.4)), steps = [4, 6, 10, 20, 30, 60];
    const sides = mPyr <= 0 ? NS : t < T.round - 0.1 ? 4 : steps[Math.min(5, Math.floor(prog(t, T.round - 0.1, T.base182 + 0.5) * 6))];
    const kTeal = smooth(prog(t, T.curved, T.curved + 0.5));
    const u = smooth(prog(t, T.unroll, T.paper + 0.3)), opening = t >= T.unroll;

    // ── nón: hình học theo trạng thái (tròn / chóp vuông / tròn lại) ──
    const P3 = CONE.V.map((v, i) => { if (i === NS) return v; const a = i * 2 * Math.PI / NS, rr = sides >= NS ? R : R + (rho(a, sides) - R) * (sides === 4 ? mPyr : 1);
      return [rr * Math.cos(a), rr * Math.sin(a), 0]; });
    CONE.edges.forEach(e => { const sl = e.b === NS; e.smooth = sl && !(sides < NS && mPyr > 0.5 && e.a % (NS / sides) === 0); });

    // ── ba cái nón đời thường (trồi lên theo từ, lún xuống ở câu 181) ──
    const out = smooth(prog(t, T.vol - 0.4, T.vol + 0.3));
    const kz = [T.ice, T.traffic, T.party].map(w0 => Math.max(0.001, outBack(prog(t, w0, w0 + 0.45)) * (1 - out)));
    const objs = [];
    if (kz[0] > 0.002) { const a = SPOT[0]; objs.push({ d: P([a[0], a[1], 0.6])[2], parts: [[ICE, place(ICE, a, 0, kz[0], true, 1.1)], [SCOOP, place(SCOOP, a, 1.32, kz[0])]], i: 0 }); }
    if (kz[1] > 0.002) { const a = SPOT[1]; objs.push({ d: P([a[0], a[1], 0.6])[2], parts: [[PLATE, place(PLATE, [a[0] - 0.475, a[1] - 0.475], 0, kz[1])], [TCONE, place(TCONE, a, 0.08, kz[1])]], i: 1 }); }
    if (kz[2] > 0.002) { const a = SPOT[2]; objs.push({ d: P([a[0], a[1], 0.6])[2], parts: [[HAT, place(HAT, a, 0, kz[2])], [POM, place(POM, a, 1.2, kz[2])]], i: 2 }); }
    objs.forEach(o => o.parts.forEach(([, p]) => shadow(g, cam, p, L, { a: 0.35 })));

    // ── bóng nón ──
    const surf = [];
    let ru = R, hu = Hc, half = Math.PI;
    if (opening) { ru = R + (LS - R) * u; hu = Math.sqrt(Math.max(0, LS * LS - ru * ru)); half = Math.PI * R / ru; }
    const apex = [0, 0, hu];
    if (opening) for (let i = 0; i < NS; i++) {
      const a = Math.PI / 2 - half + 2 * half * i / NS, b = Math.PI / 2 - half + 2 * half * (i + 1) / NS;
      const pa = [ru * Math.cos(a), ru * Math.sin(a), 0], pb = [ru * Math.cos(b), ru * Math.sin(b), 0];
      const ed = [[pa, pb]]; if (i === 0) ed.push([apex, pa]); if (i === NS - 1) ed.push([apex, pb]);
      surf.push({ q: [apex, pa, pb, apex], base: mix(C.card, C.teal, kTeal), edges: ed, ew: 3, a, b, pa, pb });
    }
    if (built && !opening) shadow(g, cam, P3, L, { a: 0.42 });
    else if (opening && u < 0.97) shadow(g, cam, [apex, ...surf.flatMap(o => [o.pa, o.pb])], L, { a: 0.4 * (1 - u) });
    else if (!built && kCard > 0) shadow(g, cam, sweep([[0, 0], [R, 0], [0, Hc * kCard]], Math.max(th, 0.05), 1).flatMap(o => o.q), L, { a: 0.3 });

    // đáy tròn trượt sang trái khi nón mở ra (tờ bìa tròn)
    if (opening) { const dx = -3.4 * u, disc = ngon(NS, R).map(([x, y]) => [x + dx, y, 0]);
      sheet(g, cam, disc, { thick: 0.04 }); label(g, 'base', P([dx, -R - 0.25, 0])[0] - 40, P([dx, -R - 0.25, 0])[1] + 40, { size: 28, k: prog(t, T.paper, T.paper + 0.5) }); }

    // các nón đời thường, xa → gần
    objs.sort((a, b) => b.d - a.d).forEach(o => {
      o.parts.forEach(([m, p]) => solid(g, cam, m, p, L, { edgeW: 2.5 }));
      const a = SPOT[o.i], kk = kz[o.i];
      if (o.i === 1) [0.42, 0.78].forEach(z => { const rz = 0.38 * (1 - z / 1.25) + 0.012;
        arc(g, cam, [a[0], a[1], (0.08 + z) * kk], rz, 0, 2 * Math.PI, { w: 7, vis: p => dot([p[0] - a[0], p[1] - a[1], 0], sub(cam.pos, p)) > 0, color: C.ink }); });
      if (o.i === 2) [[0.2, -0.95, 0.35], [-0.6, -0.6, 0.55], [0.5, -0.55, 0.7], [-0.1, -0.85, 0.2]].forEach(([dx, dy, z]) => {
        const rz = 0.42 * (1 - z / 1.1), n = norm([dx, dy, 0]); dot3(g, cam, [a[0] + n[0] * rz, a[1] + n[1] * rz, z * kk], { r: 5 }); });
      if (o.i === 0) for (let j = -2; j <= 2; j++) { const ang = -Math.PI / 2 + j * 0.45, z0 = 0.15, z1 = 1.05;
        const p0 = [a[0] + 0.4 * (z0 / 1.1) * Math.cos(ang), a[1] + 0.4 * (z0 / 1.1) * Math.sin(ang), z0 * kk], p1 = [a[0] + 0.4 * (z1 / 1.1) * Math.cos(ang + 0.5), a[1] + 0.4 * (z1 / 1.1) * Math.sin(ang + 0.5), z1 * kk];
        line(g, P(p0), P(p1), C.inkA(0.55), 2); }
      const names = ['ice-cream', 'traffic cone', 'party hat'], q = P([a[0], a[1] - 0.75, 0]), yl = P([SPOT[0][0], a[1] - 0.75, 0])[1];
      label(g, names[o.i], q[0], yl + 50, { size: 28, align: 'center', k: prog(kk, 0.6, 1) * (1 - out) });
    });

    // ── nón: quét / khối / mặt đang mở ──
    if (!built) {
      const items = th > 0 ? sweep([[0, 0], [R, 0], [0, Hc]], th, 0.3 + 0.7 * th / (2 * Math.PI)) : [];
      if (kCard > 0) { const pr = [[0, 0], [R, 0], [0, Hc * kCard]].map(p => ROT(p, th)); items.push({ q: pr, edges: [[pr[0], pr[1]], [pr[1], pr[2]]] }); }
      skin(g, cam, items);
      if (th > 0) arc(g, cam, [0, 0, 0], R, 0, th, { w: 2.5, color: C.inkA(0.8) });
      rightMark(g, cam, [0, 0, 0], ROT([1, 0], th), [0, 0, 1], 0.22, { k: kCard * (1 - prog(t, T.spins, T.spins + 0.3)) });
    } else if (!opening) solid(g, cam, CONE, P3, L, { base: mix(C.card, C.teal, kTeal) });
    else {
      skin(g, cam, surf);
      if (u < 0.95) for (let i = 1; i < surf.length; i++) {
        const fr = o => { const c = centroid([apex, o.pa, o.pb]); let n = cross3(sub(o.pb, o.pa), sub(apex, o.pa)); if (dot(n, [c[0], c[1], 0]) < 0) n = mul(n, -1); return dot(n, sub(cam.pos, c)) > 0; };
        if (fr(surf[i - 1]) !== fr(surf[i])) line(g, P(apex), P(surf[i].pa), C.ink, 3);
      }
    }
    // trục quay (que) trong lúc quét
    if (!built) thread(g, cam, [0, 0, 0], [0, 0, Hc + 0.8], { w: 4, k: prog(t, this.FROM + 0.3, this.FROM + 0.9) });

    // ── h, r (câu 181) và đường sinh l (câu 183) — rút đi khi nón mở ──
    const gone = 1 - prog(t, T.unroll - 0.4, T.unroll);
    const kh = prog(t, T.hgt, T.hgt + 0.4) * gone, kr = prog(t, T.rad, T.rad + 0.4) * gone;
    if (built) {
      line(g, P([0, 0, 0]), P([0, 0, Hc]), C.inkA(0.6), 2.5, [9, 9], kh);
      if (kh > 0) { const m = P([0, 0, Hc * 0.45]); it(g, 'h', m[0] - 44, m[1] + 10, 54, C.ink, { k: kh }); }
      const re = [R * Math.cos(-2.4), R * Math.sin(-2.4), 0];
      line(g, P([0, 0, 0]), P(re), C.inkA(0.6), 2.5, [9, 9], kr);
      if (kr > 0) { const m = P(mul(re, 0.5)); it(g, 'r', m[0] - 10, m[1] + 48, 54, C.ink, { k: kr }); }
      const kl = prog(t, T.slant, T.slant + 0.5) * gone;
      if (kl > 0) {
        const a = -0.55 - 1.0 * smooth(prog(t, T.any, T.base183 + 0.4)), bp = [R * Math.cos(a), R * Math.sin(a), 0], col = kTeal > 0.5 ? C.ink : C.tealT;
        line(g, P([0, 0, Hc]), P(bp), col, 6, [], kl);
        const m = P(mul(add([0, 0, Hc], bp), 0.5)); it(g, 'l', m[0] + 18, m[1] + 4, 60, col, { k: kl });
        dot3(g, cam, [0, 0, Hc], { r: 8, k: prog(t, T.tip, T.tip + 0.3) * gone });
        dot3(g, cam, bp, { r: 8, k: prog(t, T.edge, T.edge + 0.3) * gone });
      }
    }

    // ── quạt: nhãn l, 2πr, phần còn lại của đường tròn, góc quạt ──
    if (opening && u >= 1) {
      const a0 = Math.PI / 2 - half, a1 = Math.PI / 2 + half, k1 = prog(t, T.sector, T.sector + 0.5);
      const e = P([LS * Math.cos(a0) * 0.55, LS * Math.sin(a0) * 0.55, 0]); it(g, 'l', e[0] + 10, e[1] + 52, 60, C.ink, { k: k1 });
      const b = P([0, LS + 0.35, 0]); it(g, '2πr', b[0] - 40, b[1] - 6, 60, C.ink, { k: k1 });
      arc(g, cam, [0, 0, 0], LS, a1, a0 + 2 * Math.PI, { w: 2.5, dash: [10, 10], color: C.inkA(0.7), k: prog(t, T.circle, T.circle + 0.6) });
      const kp = prog(t, T.pizza - 0.3, T.pizza + 0.4);
      arc(g, cam, [0, 0, 0.01], 0.42, a0, a1, { w: 3, k: kp });
      const q = P([0.2, -1.3, 0]); mono(g, 'angle = 360° × r / l', q[0] - 60, q[1] + 40, { size: 28, color: C.ink, k: kp });
      dot3(g, cam, [0, 0, 0], { r: 6, k: k1 });
    }

    lamp(g, clamp(P(L)[0], 640, 1700), 150, { on: 1 });

    // ── chữ (cột trái) ──
    sectionTag(g, 'Act IX · the cone', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'cone', 96, 250, 92, C.ink, { k: prog(t, T.cone, T.cone + 0.5) });
    const kF = t < T.third - 0.2 ? prog(t, T.vol, T.vol + 0.3) / 3 : t < T.pi ? 2 / 3 : 1;
    formula(g, ['V = ', { frac: ['1', '3'] }, 'πr²h'], 96, 420, 104, C.ink, kF);
    const w0 = measure(g, 'V = ', `italic 600 104px ${CG}`), wf = measure(g, '3', `italic 600 64px ${CG}`) + 104 * 0.16;
    line(g, [96 + w0 - 6, 452], [96 + w0 + wf + 6, 452], C.ink, 3, [], prog(t, T.third2 - 0.1, T.third2 + 0.4));
    label(g, 'a pyramid with a round base', 100, 510, { size: 28, k: prog(t, T.really, T.base182 + 0.2) });
    it(g, 'slant height  l', 96, 610, 46, C.lead, { wt: 500, k: prog(t, T.slant, T.slant + 0.7) });
    it(g, 'A = πrl', 96, 720, 104, C.ink, { k: prog(t, T.pi184, T.h184 + 0.2) });
  }
}
