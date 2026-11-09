// h4 · Only five — ĐÚNG khung lab 1 (tools/lab/shadowbox.html): năm khối Platon giấy (kit PLATONIC), nhãn tên + số mặt,
// "V − E + F = 2", mascot icosa bên phải. Trước đó: trên trang phẳng đa giác đều nối nhau mãi. Rồi VÌ SAO chỉ 5: các mặt
// quanh MỘT đỉnh — còn hở thì gập lên được, đủ 360° thì nằm phẳng; bảng tổng góc tính bằng code (CONTENT §Lấp 1).
// Euclid, Elements quyển XIII; năm khối thu nhỏ lăn thành bộ xúc xắc d4…d20 (dice).
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, pool, camera, solid, shadow, rest, PLATONIC, centroid, sheet,
  sheetShadow, ngon, lamp, line, it, label, figure, sectionTag, poly, xf, add, sub, mul, dot, cross3, norm } from '../kit.js';

const CAM = { yaw: 0, pitch: 24, dist: 13.5, target: [0, 0, 0.7], cx: 690, cy: 470 };    // khung lab 1 (dịch trái 100 px chừa mascot)
const LW = [0, 1.8, 4.6];
const ROW = [[-4.0, 0.3, 0.92, 18], [-2.0, 0.0, 0.74, 24], [0, 0.0, 0.84, 14], [2.0, 0.0, 0.8, 8], [4.0, 0.3, 0.76, 21]];
const BASES = [C.card, C.card, C.card, C.card, C.teal];
// các cách xếp quanh một đỉnh: m cạnh mỗi mặt, n mặt; tổng góc phải khớp bảng CONTENT
const CASES = [[3, 3, 180], [3, 4, 240], [3, 5, 300], [3, 6, 360], [4, 3, 270], [4, 4, 360], [5, 3, 324], [6, 3, 360]];
const NAMES = { '3,3': 'tetrahedron', '3,4': 'octahedron', '3,5': 'icosahedron', '4,3': 'cube', '5,3': 'dodecahedron' };
const FAN = [2.6, -0.1];                       // tâm của "đỉnh" đang xét trên bàn
const SFAN = [1.9, 1.9, 1.5, 1.05, 1.25, 1.25, 1.0, 0.85];   // cạnh mặt (thế giới) theo từng cách

// n mặt đều m cạnh quanh một đỉnh; f = 0 nằm phẳng (còn hở nếu tổng < 360°), f = 1 gập thành góc khối
function fan(m, n, s, f) {
  const a = (m - 2) * Math.PI / m, c = Math.cos(2 * Math.PI / n), sum = n * a;
  const fit = sum < 2 * Math.PI - 1e-9, th = fit ? Math.acos(Math.sqrt((Math.cos(a) - c) / (1 - c))) : Math.PI / 2;
  const g0 = -Math.PI / 2;                       // khe hở quay về phía người xem
  const e = i => { const fl = g0 + Math.PI + (i - n / 2) * a, fo = g0 + Math.PI + (i - n / 2) * 2 * Math.PI / n;
    const p = [Math.cos(fl), Math.sin(fl), 0], q = [Math.sin(th) * Math.cos(fo), Math.sin(th) * Math.sin(fo), -Math.cos(th)];
    return norm(add(mul(p, 1 - (fit ? f : 0)), mul(q, fit ? f : 0))); };
  const ext = 2 * Math.PI / m, polys = [];
  for (let j = 0; j < n; j++) {
    const u1 = e(j), e2 = e(j + 1), u2 = norm(sub(e2, mul(u1, dot(e2, u1)))), pts = [[0, 0, 0]];
    for (let k = 0; k < m - 1; k++) pts.push(add(pts[k], mul(add(mul(u1, Math.cos(k * ext)), mul(u2, Math.sin(k * ext))), s)));
    polys.push(pts);
  }
  const z0 = Math.min(...polys.flat().map(p => p[2]));
  return { polys: polys.map(P => P.map(p => [p[0] + FAN[0], p[1] + FAN[1], p[2] - z0 + 0.02])), fit, a, gap: [e(0), e(n)] };
}
// mảnh giấy rời (painter), sáng theo đèn
function pieces(g, cam, polys, L) {
  polys.map(p => ({ p, z: cam.P(centroid(p))[2] })).sort((a, b) => b.z - a.z).forEach(({ p }) => {
    let N = norm(cross3(sub(p[1], p[0]), sub(p[2], p[0]))); if (dot(N, sub(cam.pos, centroid(p))) < 0) N = mul(N, -1);
    const lit = Math.max(0, dot(N, norm(sub(L, centroid(p))))), q = 0.82 + 0.24 * lit, s = p.map(cam.P);
    g.save(); g.fillStyle = `rgb(${Math.min(255, C.card[0] * q)},${Math.min(255, C.card[1] * q ** 1.25)},${Math.min(255, C.card[2] * q ** 1.6)})`;
    poly(g, s); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineJoin = 'round'; g.stroke(); g.restore();
  });
}

export default class Five {
  static ERA = 'desk';
  static POSES = ['icosa'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h4');
    this.T = {
      fact: w(145, 'fact'), surprises: w(145, 'surprises'),
      flat: w(146, 'flat'), page: w(146, 'page'), infinitely: w(146, 'infinitely'), triangle: w(146, 'triangle'), square: w(146, 'square'),
      pentagon: w(146, 'pentagon'), hexagon: w(146, 'hexagon'), onon: w(146, 'on', 2), end146: L(146).end,
      space: w(147, 'space'), only: w(147, 'only'), five: w(147, 'five'), platonic: w(147, 'platonic'),
      names: [w(148, 'tetrahedron'), w(148, 'cube'), w(148, 'octahedron'), w(148, 'dodecahedron'), w(148, 'icosahedron')],
      twelve: w(148, 'twelve'), twenty: w(148, 'twenty'), end148: L(148).end,
      why: w(149, 'why'), sixth: w(149, 'sixth'),
      corner: w(150, 'corner', 1), three150: w(150, 'three'), angles: w(150, 'angles'), add: w(150, 'add'), full: w(150, 'full'),
      lies: w(150, 'lies'), flat150: w(150, 'flat'), fold: w(150, 'fold'),
      c: [w(151, 'three'), w(151, 'four'), w(151, 'five'), w(151, 'six'), w(152, 'three', 1), w(152, 'four'), w(152, 'three', 2), w(152, 'three', 3)],
      lie151: w(151, 'lie'), five153: w(153, 'five'), ways: w(153, 'ways'),
      ancient: w(154, 'ancient'), greeks: w(154, 'greeks'), thousand: w(154, 'thousand'), euclid: w(154, 'euclid'), final: w(154, 'final'), elements: w(154, 'elements'),
      hold: w(155, 'hold'), dice: w(155, 'dice'), tabletop: w(155, 'tabletop'), games: w(155, 'games'), end: L(155).end,
    };
    this.START = L(145).start;
    this.FROM = Math.max(this.START - 1.2, L(144).end + 0.5);
    // toán: góc trong, tổng quanh đỉnh (bảng CONTENT), đúng 5 cách gập được, Euler mọi khối
    this.ROWS = CASES.map(([m, n, want]) => { const a = must(`(${m} - 2) * 180 / ${m}`, [0, 0, 0, 60, 90, 108, 120][m]);
      return { m, n, a, sum: must(`${n} * ${a}`, want), fit: n * a < 360 }; });
    must(`${this.ROWS.filter(r => r.fit).length}`, 5);
    this.FIT = this.ROWS.filter(r => r.fit).length;
    PLATONIC.forEach(S => must(`${S.counts.V} - ${S.counts.E} + ${S.counts.F}`, 2));
    must(`${PLATONIC[3].counts.F}`, 12); must(`${PLATONIC[4].counts.F}`, 20);
    this.REST = PLATONIC.map((S, i) => rest(S, [ROW[i][0], ROW[i][1]], ROW[i][2], ROW[i][3]));
    this.DIE = PLATONIC.map((S, i) => rest(S, [ROW[i][0] * 0.78 - 0.2, ROW[i][1] - 1.3], ROW[i][2] * 0.72, ROW[i][3] + 40));
  }
  sfx() {
    const T = this.T, out = [];
    [T.triangle, T.square, T.pentagon, T.hexagon].forEach(t => out.push({ t, kind: 'tick' }));
    out.push({ t: T.only + 0.2, kind: 'flap' }, { t: T.full, kind: 'pen' }, { t: T.fold, kind: 'flap' });
    T.c.slice(3, 7).forEach(t => out.push({ t, kind: 'tick' }));   // c[0..2] sát tiếng gập (flap), c[7] sát snap
    out.push({ t: T.five153, kind: 'snap' }, { t: T.euclid, kind: 'pen' }, { t: T.dice, kind: 'dice' });
    return out;
  }
  // vị trí năm khối ở thời điểm t (null = không vẽ)
  solids(t) {
    const T = this.T, inA = smooth(prog(t, T.only - 0.05, T.five + 0.5)), outA = smooth(prog(t, T.sixth - 0.2, T.sixth + 0.5));
    const inD = smooth(prog(t, T.greeks, T.greeks + 0.7));
    if (t < T.space + 0.2) return null;
    if (t < T.greeks) { if (outA >= 1) return null;
      return this.REST.map((V, i) => { const k = smooth(prog(t, T.space + 0.2 + i * 0.1, T.only + 0.6 + i * 0.1));
        const hop = 0.35 * Math.sin(Math.PI * prog(t, T.names[i], T.names[i] + 0.45));
        return V.map(p => [p[0], p[1] - 8 * outA, p[2] + 1.2 * (1 - k) + hop]); }); }
    // trở lại (câu 154), rồi lăn thành xúc xắc (câu 155)
    return this.REST.map((V, i) => {
      const e = prog(t, T.dice - 0.15 + i * 0.09, T.dice + 1.3 + i * 0.09);
      if (e <= 0) return V.map(p => [p[0], p[1], p[2] + 1.2 * (1 - inD)]);
      const D = this.DIE[i], c0 = centroid(V), c1 = centroid(D), u = smooth(e);
      const s = 1 + (0.72 - 1) * u, rel = (e >= 1 ? D.map(p => sub(p, c1)) : xf(V.map(p => sub(p, c0)), { s, ry: -360 * u * (i % 2 ? 1 : -1) * 1, rx: 180 * u }));
      if (e >= 1) return D;
      // nửa sau: trộn dần về tư thế nằm yên của xúc xắc
      const mix = smooth(prog(e, 0.75, 1)), rr = rel.map((p, j) => add(mul(p, 1 - mix), mul(sub(D[j], c1), mix)));
      const at = add(c0, mul(sub(c1, c0), u)), P3 = rr.map(p => add(p, at)), z0 = Math.min(...P3.map(p => p[2]));
      const hop = 0.35 * Math.sin(Math.PI * Math.min(1, e * 1.3)) * (1 - e);
      return P3.map(p => [p[0], p[1], p[2] - z0 + hop]);
    });
  }
  render(g, t) {
    const T = this.T, cam = camera({ ...CAM, yaw: CAM.yaw + 0.15 * Math.max(0, Math.min(t, T.why) - this.START) - 0.15 * Math.max(0, t - T.ancient) }), P = cam.P;
    ground(g);
    const pc = P([0, 0.3, 0]); pool(g, pc[0], pc[1], 760, 0.65);

    // ── A (145–146): trang phẳng, đa giác đều nối nhau mãi ──
    const outPage = smooth(prog(t, T.space - 0.1, T.space + 0.6));
    if (outPage < 1) {
      const kS = outCubic(prog(t, this.FROM + 0.3, T.fact + 0.6)), dy = -8 * outPage;
      const cs = [[-5.2, -1.4, 0.03], [5.4, -1.4, 0.03], [5.4, 1.5, 0.03], [-5.2, 1.5, 0.03]].map(p => [p[0] * kS, p[1] * kS + dy, p[2]]);
      sheetShadow(g, cam, cs.map(p => [p[0], p[1], 0]), { a: 0.12 * kS });
      sheet(g, cam, cs, { k: kS, thick: 0.03 });
      const polys = [[3, -4.0, 0.72, T.triangle], [4, -2.3, 0.72, T.square], [5, -0.6, 0.72, T.pentagon], [6, 1.1, 0.72, T.hexagon],
        [7, 2.55, 0.55, T.onon - 0.3], [8, 3.6, 0.44, T.onon - 0.1], [10, 4.4, 0.34, T.onon + 0.1], [12, 5.0, 0.26, T.onon + 0.25]];
      polys.forEach(([m, x, r, tw]) => {
        const v = ngon(m, r, -Math.PI / 2 + Math.PI / m).map(([a, b]) => P([x + a, b + dy, 0.04])), k = prog(t, tw, tw + 0.35) * m;
        for (let i = 0; i < m; i++) line(g, v[i], v[(i + 1) % m], C.ink, 4, [], k - i);
      });
      const q = P([-4.9, -1.15 + dy, 0.04]);
      label(g, 'flat page', q[0] + 10, q[1] - 14, { size: 24, k: prog(t, T.flat, T.page + 0.4) * (1 - outPage) });
    }

    // ── C (149–153): một đỉnh — gập lên hay nằm phẳng ──
    const inC = smooth(prog(t, T.sixth, T.corner + 0.2)), outC = smooth(prog(t, T.ancient - 0.2, T.ancient + 0.5));
    if (inC > 0 && outC < 1) {
      let ci = 0; T.c.forEach((tc, i) => { if (t >= tc) ci = i; });
      const [m, n] = CASES[ci], fit = this.ROWS[ci].fit, tc = t < T.c[0] ? T.fold : T.c[ci];
      const f = !fit ? 0 : t < T.c[0] ? smooth(prog(t, T.fold, T.fold + 0.6)) : smooth(prog(t, tc - 0.05, tc + 0.3));
      const F = fan(m, n, SFAN[ci], f), sc = outCubic(inC);
      const polys = F.polys.map(p => p.map(q => [FAN[0] + (q[0] - FAN[0]) * sc, FAN[1] + (q[1] - FAN[1]) * sc - 8 * outC, q[2] * sc]));
      shadow(g, cam, polys.flat(), LW, { a: 0.3 });
      // câu 150: vòng tròn trọn 360° quanh đỉnh (nét đứt) khi còn phẳng
      const V0 = [FAN[0], FAN[1] - 8 * outC, 0.03], pV = P(V0);
      const kCirc = prog(t, T.full, T.full + 0.7) * (1 - prog(t, T.fold, T.fold + 0.3));
      if (kCirc > 0) { const R = 1.0, pts = Array.from({ length: 49 }, (_, i) => P(add(V0, [R * Math.cos(i * Math.PI / 24 * kCirc * 1), R * Math.sin(i * Math.PI / 24 * kCirc), 0])));
        g.save(); g.strokeStyle = C.lead; g.lineWidth = 2.5; g.setLineDash([6, 8]); g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore();
        label(g, '360° = a full turn', pts[36][0], pts[36][1] + 44, { size: 24, align: 'center', k: prog(t, T.full + 0.3, T.full + 0.9) * (1 - prog(t, T.fold, T.fold + 0.3)) }); }
      pieces(g, cam, polys, LW);
      // câu 150: góc ở đỉnh — cung trên từng mặt (khi còn phẳng)
      const kAng = prog(t, T.angles, T.angles + 0.5) * (1 - prog(t, T.fold, T.fold + 0.3));
      if (kAng > 0 && t < T.c[0]) polys.forEach(p => { const a = norm(sub(p[1], p[0])), b = norm(sub(p[p.length - 1], p[0])), th = Math.acos(dot(a, b)), b2 = norm(sub(b, mul(a, dot(a, b))));
        const arc = Array.from({ length: 13 }, (_, i) => P(add(p[0], add(mul(a, 0.42 * Math.cos(th * i / 12 * kAng)), mul(b2, 0.42 * Math.sin(th * i / 12 * kAng))))));
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); arc.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore(); });
      if (t < T.c[0]) label(g, '60° + 60° + 60° = 180°', pV[0], pV[1] + 200, { color: C.ink, size: 26, align: 'center', k: prog(t, T.add, T.add + 0.8) * (1 - prog(t, T.fold, T.fold + 0.3)) });
      // khe hở / nằm phẳng
      const top = Math.min(...polys.flat().map(q => P(q)[1]));
      const tag = !fit ? 'lies flat' : f > 0.9 ? 'folds up' : '';
      const kTag = !fit ? prog(t, tc + 0.15, tc + 0.6) : prog(f, 0.9, 1);
      if (tag && t >= T.c[0] - 0.5) label(g, tag, pV[0], Math.min(top - 30, pV[1] - 120), { color: fit ? C.ink : C.lead, size: 28, align: 'center', k: kTag });
      if (t >= T.fold && t < T.c[0]) label(g, 'folds up', pV[0], top - 30, { color: C.ink, size: 28, align: 'center', k: prog(f, 0.9, 1) });
    }

    // ── B / D / E: năm khối Platon ──
    const SV = this.solids(t);
    if (SV) {
      SV.forEach(V => { const lift = Math.min(...V.map(p => p[2])); if (lift < 1.2) shadow(g, cam, V, LW, { a: 0.5 * (1 - lift / 1.2) }); });
      const scr = PLATONIC.map((S, i) => solid(g, cam, S, SV[i], LW, { base: BASES[i] }));
      const named = t < T.sixth;                   // pha B: nhãn tên + số mặt; D: tên lại; E: d4…d20
      const kOutA = t < T.greeks ? 1 - smooth(prog(t, T.sixth - 0.2, T.sixth + 0.2)) : 1;
      PLATONIC.forEach((S, i) => {
        const xs = scr[i].map(p => p[0]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, by = 742;
        const isI = S.name === 'icosahedron';
        if (named) {
          it(g, S.name, cx, by, 44, C.ink, { align: 'center', k: prog(t, T.names[i], T.names[i] + 0.5) * kOutA });
          const tf = i === 3 ? T.twelve : i === 4 ? T.twenty : T.names[i] + 0.2;
          label(g, `${S.counts.F} faces`, cx, by + 46, { color: isI ? C.tealT : C.lead, align: 'center', size: 26, k: prog(t, tf, tf + 0.5) * kOutA });
        } else if (t >= T.greeks && t < T.dice) {
          it(g, S.name, cx, by, 44, C.ink, { align: 'center', k: prog(t, T.greeks + 0.6 + i * 0.1, T.greeks + 1.1 + i * 0.1) });
        } else if (t >= T.dice) {
          const y = Math.max(...scr[i].map(p => p[1])) + 60;
          it(g, `d${S.counts.F}`, cx, y, 54, isI ? C.tealT : C.ink, { align: 'center', k: prog(t, T.tabletop + i * 0.12, T.tabletop + 0.4 + i * 0.12) });
        }
      });
      if (named) label(g, 'every one: V − E + F = 2', 96, 930, { size: 26, k: prog(t, T.twenty + 0.2, T.twenty + 1.0) * kOutA });
    }

    // đèn
    lamp(g, P(LW)[0], 150, { on: 1 });

    // ── chữ trái ──
    sectionTag(g, 'Act VII · regular polyhedra', prog(t, this.FROM + 0.3, this.FROM + 1));
    const outA = outCubic(prog(t, T.space - 0.1, T.space + 0.5)) * -900;
    g.save(); g.translate(outA, 0);
    it(g, 'A surprise.', 96, 230, 104, C.ink, { k: prog(t, T.surprises, T.surprises + 0.6) });
    it(g, 'on a flat page: infinitely many', 96, 310, 46, C.lead, { wt: 500, k: prog(t, T.infinitely, T.end146) });
    g.restore();
    it(g, 'Only five.', 96, 230, 104, C.ink, { k: prog(t, T.only, T.five + 0.4) });
    label(g, 'the platonic solids', 96, 290, { size: 26, k: prog(t, T.platonic, T.platonic + 0.6) * (1 - prog(t, T.why - 0.2, T.why)) });
    // C: bảng tổng góc (viết theo lời), tên khối ở câu 153
    const outT = outCubic(prog(t, T.ancient - 0.2, T.ancient + 0.4)) * -900;
    if (t >= T.why - 0.2 && outT > -900) {
      g.save(); g.translate(outT, 0);
      it(g, 'why not a sixth?', 96, 310, 46, C.lead, { wt: 500, k: prog(t, T.why, T.sixth + 0.5) });
      label(g, 'at one corner: less than 360°', 96, 370, { size: 24, k: prog(t, T.add, T.full + 0.6) });
      this.ROWS.forEach((r, i) => {
        const y = 440 + i * 62, tw = T.c[i], k = prog(t, tw, tw + 0.4);
        const cur = t >= tw && (i === 7 ? t < T.five153 : t < T.c[i + 1]);
        g.save(); if (cur) { g.fillStyle = 'rgba(255,238,198,0.8)'; g.fillRect(84, y - 40, 560, 54); } g.restore();
        it(g, `${r.n} × ${r.a}° = ${r.sum}°`, 96, y, 44, r.fit ? C.ink : C.lead, { k });
        label(g, r.fit ? 'folds' : 'flat', 400, y - 6, { color: r.fit ? C.ink : C.lead, size: 22, k: prog(t, tw + 0.2, tw + 0.6) });
        if (r.fit) label(g, NAMES[`${r.m},${r.n}`], 500, y - 6, { color: C.ink, size: 22, k: prog(t, T.ways + i * 0.08, T.ways + 0.5 + i * 0.08) });
        else if (t >= T.five153) line(g, [96, y - 14], [96 + 280 * prog(t, T.five153, T.five153 + 0.4), y - 14], C.lead, 2);
      });
      it(g, `${this.FIT} ways — no more`, 96, 440 + 8 * 62 + 20, 54, C.ink, { k: prog(t, T.five153, T.ways + 0.6) });
      g.restore();
    }
    // D: Euclid
    label(g, 'more than 2000 years ago', 96, 310, { size: 26, k: prog(t, T.thousand, T.thousand + 0.8) });
    it(g, 'Euclid, Elements, Book XIII', 96, 380, 54, C.ink, { k: prog(t, T.euclid, T.elements + 0.4) });
    label(g, 'the final book', 96, 430, { size: 24, k: prog(t, T.final, T.final + 0.6) });

    // mascot icosa bên phải: lúc gọi tên năm khối, và lúc "hold all five … dice"
    const kf = prog(t, T.platonic - 0.2, T.platonic + 0.15) * (1 - prog(t, T.end148 + 0.3, T.end148 + 0.65)) + prog(t, T.hold - 0.2, T.hold + 0.15);
    figure(g, 'icosa', 1660, H, 760, Math.min(1, kf));
  }
}
