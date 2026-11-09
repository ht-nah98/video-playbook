// h3 · Pyramids — đáy ngũ giác + một đỉnh NGOÀI mặt đáy (dây dọi xuống bàn) → mặt bên tam giác gập lên chung đỉnh →
// kim tự tháp đáy vuông tỉ lệ Giza (146.6 / 230.33, CONTENT §Lấp 2): đáy đều, dây dọi từ đỉnh xuống TÂM đáy, cạnh bên bằng
// nhau, mặt bên cân → tứ diện (kit PLATONIC[0]) với 4 mặt · 4 đỉnh · 6 cạnh từ counts.
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, pool, camera, solid, shadow, pyramid, rest, PLATONIC, centroid,
  lamp, line, it, label, photo, sectionTag, rightMark, poly, add, sub, mul, norm, len } from '../kit.js';

const CAM0 = { yaw: -20, pitch: 22, dist: 12, target: [0.2, 0.3, 1.0], cx: 1240, cy: 600 };
const LW = [-1.4, 3.2, 5.2];
const B5 = [[1.4, 0.1], [0.5, 1.2], [-1.0, 0.9], [-1.3, -0.5], [0.2, -1.2]], AP5 = [0.8, 0.5, 2.3];
const S = 2.6, HG = S * 146.6 / 230.33, SQ = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => [x * S / 2, y * S / 2]);
const TET = PLATONIC[0];

const ticks = (g, a, b, n, k = 1) => {      // n vạch "bằng nhau" giữa đoạn (màn hình)
  if (k <= 0) return; const d = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / d, (b[1] - a[1]) / d], nn = [-u[1], u[0]];
  for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 8, m = [(a[0] + b[0]) / 2 + u[0] * o, (a[1] + b[1]) / 2 + u[1] * o];
    line(g, [m[0] - nn[0] * 10, m[1] - nn[1] * 10], [m[0] + nn[0] * 10, m[1] + nn[1] * 10], C.ink, 3, [], k); }
};
const tint = (g, pts, k) => { if (k <= 0) return; g.save(); g.globalAlpha = 0.16 * k; g.fillStyle = C.ink; poly(g, pts); g.fill(); g.restore(); };
const dotAt = (g, p, r, k = 1) => { if (k <= 0) return; g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(p[0], p[1], r * outCubic(Math.min(1, k)), 0, 7); g.fill(); g.restore(); };
const mv = (V, d) => V.map(p => add(p, d));

export default class Pyramids {
  static ERA = 'desk';
  static POSES = [];
  static IMAGES = { giza: './assets/history/giza.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'h3');
    this.T = {
      pyramid: w(139, 'pyramid'), polygon: w(139, 'polygon'), apex: w(139, 'apex', 1), outside: w(139, 'outside'), plane: w(139, 'plane'),
      sides: w(139, 'sides'), triangles: w(139, 'triangles'), share: w(139, 'share'), apex2: w(139, 'apex', 2),
      great: w(140, 'great'), famous: w(140, 'famous'),
      regular: w(141, 'regular', 1), apex141: w(141, 'apex'), above: w(141, 'above'), center: w(141, 'center'), regular2: w(141, 'regular', 2),
      side: w(142, 'side', 1), equal: w(142, 'equal'), faces: w(142, 'faces'), isosceles: w(142, 'isosceles'),
      s143: L(143).start, tetra: w(143, 'tetrahedron'), triangle: w(143, 'triangle'),
      four1: w(144, 'four', 1), faces144: w(144, 'faces'), four2: w(144, 'four', 2), vertices: w(144, 'vertices'), six: w(144, 'six'), edges: w(144, 'edges'),
    };
    this.START = L(139).start;
    this.FROM = Math.max(this.START - 1.2, L(138).end + 0.5);
    this.P5 = pyramid(B5, AP5); this.PG = pyramid(SQ, [0, 0, HG]);
    // cạnh bên của chóp đều bằng nhau (tính từ toạ độ)
    const se = SQ.map(([x, y]) => len(sub([0, 0, HG], [x, y, 0])));
    se.forEach(l => must(`${l}`, se[0]));
    // tứ diện: 4 mặt, 4 đỉnh, 6 cạnh (kit PLATONIC đã kiểm Euler)
    this.N = { F: must(`${TET.counts.F}`, 4), V: must(`${TET.counts.V}`, 4), E: must(`${TET.counts.E}`, 6) };
    this.TV = rest(TET, [0, 0], 1.75, 25);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.polygon, kind: 'pen' }, { t: T.triangles, kind: 'flap' }, { t: T.above, kind: 'pen' }, { t: T.equal, kind: 'tick' },
      { t: T.tetra, kind: 'flap' }, { t: T.faces144, kind: 'tick' }, { t: T.vertices, kind: 'tick' }, { t: T.edges, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min(Math.max(t - this.START, 0), T.regular - this.START) * 0.2 + Math.max(0, t - T.s143) * 0.15;
    const cam = camera({ ...CAM0, yaw: CAM0.yaw + drift }), P = cam.P;
    const pc = P([0, 0.3, 0]); pool(g, pc[0], pc[1], 800, 0.55);

    // ── chóp ngũ giác (câu 139) — lùi ra xa ở "great" ──
    const out5 = smooth(prog(t, T.great - 0.3, T.great + 0.6));
    if (out5 < 1) {
      const d = [10 * out5, -5 * out5, 0], B3 = B5.map(([x, y]) => add([x, y, 0], d)), A = add(AP5, d), sb = B3.map(P), pa = P(A);
      const kB = outCubic(prog(t, this.FROM + 0.3, T.polygon + 0.5)), kF = prog(t, T.triangles, T.triangles + 0.7);
      if (kF > 0) shadow(g, cam, [...B3, A], LW, { a: 0.32 * kF });
      // đáy: tờ ngũ giác trên bàn (kéo ra từ tâm)
      const c = centroid(B3), q = B3.map(p => P(add(c, mul(sub(p, c), kB))));
      if (kF < 1) { g.save(); g.fillStyle = `rgb(${C.card.join(',')})`; poly(g, q); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineJoin = 'round'; g.stroke(); g.restore(); }
      // mặt phẳng đáy kéo dài (nét đứt) + dây dọi từ đỉnh: đỉnh ở NGOÀI mặt đáy
      const kPl = prog(t, T.plane, T.plane + 0.6) * (1 - prog(t, T.triangles, T.triangles + 0.5));
      if (kPl > 0) { const r = [[-2.6, -2.2], [2.8, -2.2], [2.8, 2.2], [-2.6, 2.2]].map(([x, y]) => P(add([x, y, 0], d)));
        g.save(); g.strokeStyle = C.inkA(0.45 * kPl); g.lineWidth = 2; g.setLineDash([10, 10]); poly(g, r); g.stroke(); g.restore(); }
      const foot = P([A[0], A[1], 0]);
      line(g, pa, foot, C.inkA(0.6), 2.5, [4, 9], prog(t, T.outside, T.outside + 0.6) * (1 - prog(t, T.triangles, T.triangles + 0.5)));
      // cạnh bên kẻ dần ở "sides", mặt tam giác gập lên ở "triangles"
      if (kF > 0) solid(g, cam, this.P5, [...B3, A], LW, { k: kF });
      else B3.forEach((p, i) => line(g, sb[i], pa, C.ink, 3, [], prog(t, T.sides + i * 0.06, T.sides + 0.4 + i * 0.06)));
      dotAt(g, pa, 9, prog(t, T.apex, T.apex + 0.3) * (1 + 0.5 * Math.sin(Math.PI * prog(t, T.share, T.apex2 + 0.4))));
      if (t >= T.share) B3.forEach((p, i) => line(g, sb[i], pa, C.ink, 6, [], prog(t, T.share + i * 0.06, T.share + 0.35 + i * 0.06)));
      label(g, 'apex', pa[0] + 24, pa[1] - 16, { color: C.ink, size: 26, k: prog(t, T.apex, T.apex + 0.4) * (out5 > 0.02 ? 0 : 1) });
      label(g, 'base', q[0][0] + 26, q[0][1] + 34, { color: C.ink, size: 26, k: prog(t, T.polygon, T.polygon + 0.4) * kB * (out5 > 0.02 ? 0 : 1) });
    }

    // ── chóp đều đáy vuông (câu 140–142) — vào từ phải ở "great", lùi ra ở "tetrahedron" ──
    const inG = smooth(prog(t, T.great - 0.1, T.famous)), outG = smooth(prog(t, T.tetra - 0.3, T.tetra + 0.5));
    if (inG > 0 && outG < 1) {
      const d = [10 * outG, -5 * outG, 6 * (1 - inG)], V = mv(this.PG.V, d), s = V.map(P), pa = s[4];
      if (inG > 0.8) shadow(g, cam, V, LW, { a: 0.32 * (inG - 0.8) / 0.2 });
      solid(g, cam, this.PG, V, LW);
      // đáy đều: 4 cạnh vạch bằng nhau
      [0, 1, 2, 3].forEach(i => ticks(g, s[i], s[(i + 1) % 4], 1, prog(t, T.regular + i * 0.08, T.regular + 0.3 + i * 0.08)));
      // tâm đáy: hai đường chéo + chấm; dây dọi đỉnh → tâm
      const O = add([0, 0, 0], d), pO = P(O);
      const kC = prog(t, T.apex141, T.apex141 + 0.5);
      line(g, s[0], s[2], C.inkA(0.5), 2, [6, 8], kC); line(g, s[1], s[3], C.inkA(0.5), 2, [6, 8], kC);
      line(g, pa, pO, C.ink, 3, [4, 8], prog(t, T.above - 0.3, T.center + 0.2));
      dotAt(g, pO, 7, prog(t, T.center, T.center + 0.3));
      rightMark(g, cam, O, norm(sub(V[1], V[0])), [0, 0, 1], 0.22, { k: prog(t, T.center + 0.3, T.center + 0.6) });
      // câu 142: cạnh bên bằng nhau (hai vạch), một mặt bên cân
      const kS = prog(t, T.side, T.side + 0.5);
      [0, 1, 2, 3].forEach(i => { line(g, s[i], pa, C.ink, 5, [], kS); ticks(g, s[i], pa, 2, prog(t, T.equal + i * 0.08, T.equal + 0.3 + i * 0.08)); });
      // mặt trước nhất: mặt có tâm gần camera nhất
      const fi = [0, 1, 2, 3].reduce((a, i) => P(centroid([V[i], V[(i + 1) % 4], V[4]]))[2] < P(centroid([V[a], V[(a + 1) % 4], V[4]]))[2] ? i : a, 0);
      const fpts = [s[fi], s[(fi + 1) % 4], pa];
      tint(g, fpts, prog(t, T.faces, T.faces + 0.4) * (1 - outG));
      const fc = [(fpts[0][0] + fpts[1][0] + fpts[2][0]) / 3, (fpts[0][1] + fpts[1][1] + fpts[2][1]) / 3];
      label(g, 'isosceles', fc[0], fc[1] + 14, { color: C.ink, size: 22, align: 'center', k: prog(t, T.isosceles, T.isosceles + 0.5) * (outG > 0.02 ? 0 : 1) });
      label(g, 'center', pO[0] + 18, pO[1] + 34, { color: C.ink, size: 22, k: prog(t, T.center, T.center + 0.4) * (1 - prog(t, T.side - 0.2, T.side)) });
    }

    // ── tứ diện (câu 143–144) ──
    const inT = smooth(prog(t, T.tetra - 0.1, T.tetra + 0.7));
    if (inT > 0) {
      const V = mv(this.TV, [0, 0, 6 * (1 - inT)]), s = V.map(P);
      if (inT > 0.8) shadow(g, cam, V, LW, { a: 0.32 * (inT - 0.8) / 0.2 });
      solid(g, cam, TET, V, LW);
      const base = V.map((p, i) => [p, i]).filter(([p]) => p[2] < 1e-6).map(([, i]) => i);
      const kTr = prog(t, T.triangle, T.triangle + 0.5) * (1 - prog(t, T.four1, T.four1 + 0.3));
      base.forEach((a, i) => line(g, s[a], s[base[(i + 1) % 3]], C.ink, 7, [], kTr));
      // đếm: mặt (tô lần lượt), đỉnh (chấm), cạnh (nét đậm)
      const vis = TET.faces.map((f, i) => i).filter(i => { const c = centroid(TET.faces[i].map(q => V[q])), N = sub(c, centroid(V)); return N[0] * (cam.pos[0] - c[0]) + N[1] * (cam.pos[1] - c[1]) + N[2] * (cam.pos[2] - c[2]) > 0; });
      const kF = prog(t, T.faces144 - 0.2, T.faces144 + 0.3) * (1 - prog(t, T.four2, T.four2 + 0.3));
      vis.forEach((fi, j) => tint(g, TET.faces[fi].map(q => s[q]), prog(t, T.faces144 - 0.2 + j * 0.12, T.faces144 + j * 0.12) * kF));
      s.forEach((p, i) => dotAt(g, p, 9, prog(t, T.vertices + i * 0.08, T.vertices + 0.25 + i * 0.08)));
      TET.edges.forEach((e, i) => line(g, s[e.a], s[e.b], C.ink, 6, [], prog(t, T.edges + i * 0.05, T.edges + 0.25 + i * 0.05)));
    }

    lamp(g, P([LW[0], LW[1], 3])[0], 150, { on: 1 });

    // ── chữ trái ──
    sectionTag(g, 'Act VII · pyramids', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'Pyramid', 96, 250, 92, C.ink, { k: prog(t, T.pyramid, T.pyramid + 0.5) });
    it(g, 'one base, one apex outside it', 96, 316, 40, C.lead, { wt: 500, k: prog(t, T.apex, T.plane + 0.5) });
    // ảnh Giza (câu 140), trượt xuống khỏi khung ở câu 141
    if (t >= T.great - 0.05) {
      g.save(); g.translate(0, outCubic(prog(t, T.regular - 0.3, T.regular + 0.4)) * 900);
      photo(g, 'giza', 110, 400, 250, prog(t, T.great - 0.05, T.great + 0.55), { rot: 0.02, credit: 'PHOTO: NINA · CC BY 2.5' });
      g.restore();
    }
    const rows = [['regular pyramid', 'apex above the center', T.regular2], ['tetrahedron', 'a pyramid on a triangle', T.tetra]];
    rows.forEach(([a, b, tw], i) => { const y = 430 + i * 104, cur = i === rows.length - 1 ? t >= tw : t < rows[i + 1][2];
      it(g, a, 96, y, 54, cur ? C.ink : C.lead, { k: prog(t, tw, tw + 0.5) }); label(g, b, 96, y + 40, { size: 22, k: prog(t, tw + 0.3, tw + 1.0) }); });
    // câu 144: 4 · 4 · 6
    const cnt = [[`${this.N.F} faces`, T.four1], [`${this.N.V} vertices`, T.four2], [`${this.N.E} edges`, T.six]];
    cnt.forEach(([s, tw], i) => it(g, s, 96, 690 + i * 80, 64, C.ink, { k: prog(t, tw, tw + 0.5) }));
  }
}
