// i3 · The one third — chóp vuông + "V = ⅓ × B × h"; lăng trụ tam giác giấy cắt thành 3 chóp ba sắc giấy, thể tích
// bằng nhau (định thức, must); Giza: ảnh kẹp bìa + chóp tỉ lệ thật trong hộp cùng đáy cùng cao; hai thanh giấy
// ≈ 2.59 / ≈ 7.78 triệu m³ (tính từ 230.33 m, 146.6 m — CONTENT.md). Vật vào/ra bằng trượt trên bàn; đèn, camera cố định.
import { C, prog, lookup, must, fix, outCubic, smooth, ground, pool, camera, shadow, solid, convex, pyramid, box, thread,
  lamp, line, it, label, sectionTag, frac, photo, measure, add, sub, mul, centroid, cross3, dot, CG } from '../kit.js';

const LAMP = [-3, -5, 13];
const CAM = { yaw: -22, pitch: 22, dist: 13.5, target: [0.6, 0.2, 1.25], cx: 1260, cy: 600 };
const SLIDE = 22;                                          // vào từ +x, ra về −x (đơn vị thế giới)
// chóp vuông (166)
const SQ = [[-1.25, -1.25], [1.25, -1.25], [1.25, 1.25], [-1.25, 1.25]];
// lăng trụ tam giác ABC–A′B′C′ (167) và ba chóp: A′ABC, A′BCC′, A′BB′C′
const TB = [[-1.4, -1.0], [1.7, -0.9], [-0.3, 1.4]], TH = 2.6;
const [A, B, Cc] = TB.map(([x, y]) => [x, y, 0]), [A1, B1, C1] = TB.map(([x, y]) => [x, y, TH]);
const TETS = [[A1, A, B, Cc], [A1, B, Cc, C1], [A1, B, B1, C1]];
const SHADES = [[251, 246, 236], [236, 224, 200], [214, 199, 172]];      // ba sắc giấy (cùng họ bìa ngà)
const vol6 = ([p, q, r, s]) => Math.abs(dot(sub(q, p), cross3(sub(r, p), sub(s, p)))) / 6;
// Giza (CONTENT.md): cạnh đáy 230.33 m, cao gốc 146.6 m → chóp tỉ lệ thật, cạnh 2.9 trên hình
const GB = 230.33, GH = 146.6, GS = 2.9, GZ = GS * GH / GB;

export default class Third {
  static ERA = 'desk';
  static POSES = [];
  static IMAGES = { giza: './assets/history/giza.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'i3');
    this.START = L(166).start;
    this.FROM = Math.max(this.START - 1.2, L(165).end + 0.5);
    this.T = {
      pyr: w(166, 'pyramids'), vol166: w(166, 'volume'), third166: w(166, 'third'), base166: w(166, 'base'), hgt166: w(166, 'height'),
      tri: w(167, 'triangular'), cut: w(167, 'cut'), three: w(167, 'three'), equal: w(167, 'equal'), vols: w(167, 'volumes'), third167: w(167, 'third'),
      reveals: w(168, 'reveals'), fun: w(168, 'fun'),
      same: w(169, 'same', 1), same2: w(169, 'same', 2), hgt169: w(169, 'height'), great: w(169, 'great'), third169: w(169, 'third'),
      box169: w(169, 'box'), end169: L(169).end,
      s170: L(170).start, two: w(170, 'two'), half: w(170, 'half'), mil1: w(170, 'million', 1), box170: w(170, 'box'), eight: w(170, 'eight'), mil2: w(170, 'million', 2), end: L(170).end,
    };
    // toán: ba chóp cùng thể tích = ⅓ lăng trụ (định thức)
    const area = Math.abs((TB[1][0] - TB[0][0]) * (TB[2][1] - TB[0][1]) - (TB[2][0] - TB[0][0]) * (TB[1][1] - TB[0][1])) / 2, PV = area * TH;
    TETS.forEach(T4 => must(`${vol6(T4)} × 3`, PV));
    must(`${TETS.map(vol6).reduce((a, b) => a + b)}`, PV);
    // Giza: 2.59 / 7.78 triệu m³
    this.VP = must(`'${fix(`${GB}^2 × ${GH} / 3 / 1e6`, 2)}'`, '2.59');
    this.VB = must(`'${fix(`${GB}^2 × ${GH} / 1e6`, 2)}'`, '7.78');
    // chóp tỉ lệ = ⅓ hộp cùng đáy cùng cao
    must(`${GS * GS * GZ / 3} × 3`, GS * GS * GZ);
    this.M = {
      sq: pyramid(SQ, [0, 0, 2.3]), prism: convex([A, B, Cc, A1, B1, C1]), tets: TETS.map(convex),
      giza: pyramid(SQ.map(([x, y]) => [x * GS / 2.5, y * GS / 2.5]), [0, 0, GZ]),
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.pyr, kind: 'flap' }, { t: T.third166 + 0.1, kind: 'pen' }, { t: T.tri + 0.1, kind: 'flap' }, { t: T.cut + 0.1, kind: 'snap' },
      { t: T.vols, kind: 'correct' }, { t: T.fun - 0.1, kind: 'flap' }, { t: T.box169, kind: 'pen' },
      { t: T.mil1, kind: 'tick' }, { t: T.mil2, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, M = this.M;
    ground(g);
    const drift = Math.min(Math.max(0, t - this.FROM) * 0.14, 4.2);
    const cam = camera({ ...CAM, yaw: CAM.yaw + drift }), P = cam.P;
    const pc = P([0.6, 0.2, 0]); pool(g, pc[0] - 80, pc[1] - 40, 720, 0.55);
    // trượt: vào trong [a, a + 0.8] từ +x, ra trong [b, b + 0.6] về −x
    const dx = (a, b) => SLIDE * (1 - outCubic(prog(t, a, a + 0.8))) - SLIDE * prog(t, b, b + 0.6) ** 2;
    const live = d => Math.abs(d) < SLIDE - 0.5;
    const mv = (V, d) => V.map(p => add(p, [d, 0, 0]));

    // ── 166: chóp vuông ──
    const d0 = dx(T.pyr - 0.6, T.tri - 0.8);
    if (live(d0)) {
      const V = mv(M.sq.V, d0);
      shadow(g, cam, V, LAMP);
      solid(g, cam, M.sq, V, LAMP);
      const ap = P(V[4]), fo = P([d0, 0, 0]), kH = prog(t, T.hgt166, T.hgt166 + 0.5);
      line(g, ap, fo, C.ink, 3, [10, 9], kH);
      it(g, 'h', (ap[0] + fo[0]) / 2 + 16, (ap[1] + fo[1]) / 2 + 10, 54, C.ink, { k: kH });
      const fb = P([d0, -1.25, 0]);
      it(g, 'B', fb[0] - 10, fb[1] + 62, 54, C.ink, { k: prog(t, T.base166, T.base166 + 0.3) });
    }

    // ── 167: lăng trụ tam giác → ba chóp ──
    const d1 = dx(T.tri - 0.4, T.reveals - 0.2);
    if (live(d1)) {
      const e = outCubic(prog(t, T.cut, T.cut + 0.9)), ctr = centroid([A, B, Cc, A1, B1, C1]);
      if (e <= 0) {
        const V = mv(M.prism.V, d1);
        shadow(g, cam, V, LAMP);
        solid(g, cam, M.prism, V, LAMP);
      } else {
        const parts = M.tets.map((m, i) => { const c = centroid(m.V), off = mul(sub([c[0], c[1], 0], [ctr[0], ctr[1], 0]), 0.75 * e);
          const lift = [0, 0, 0.25 * Math.sin(Math.PI * e)]; return { m, i, V: m.V.map(p => add(add(p, off), add(lift, [d1, 0, 0]))) }; });
        parts.forEach(p => shadow(g, cam, p.V, LAMP, { a: 0.3 }));
        parts.map(p => ({ ...p, z: P(centroid(p.V))[2] })).sort((a, b) => b.z - a.z)
          .forEach(p => solid(g, cam, p.m, p.V, LAMP, { base: SHADES[p.i] }));
        // ⅓ trên từng chóp (ở "third")
        const k3 = prog(t, T.third167 - 0.2, T.third167 + 0.3);
        if (t >= T.third167 - 0.1) parts.forEach(p => { const q = P(p.V.reduce((a, b) => (P(b)[1] < P(a)[1] ? b : a)));
          frac(g, '1', '3', q[0] - 18, q[1] - 26, 64, C.ink); });
      }
      const kT = prog(t, T.tri, T.tri + 0.5), a1 = P(add(A1, [d1, 0, 0]));
      if (e <= 0) label(g, 'triangular prism', a1[0] - 30, a1[1] - 34, { size: 24, align: 'right', k: kT });
    }

    // ── 169: chóp Giza tỉ lệ thật trong hộp cùng đáy cùng cao ──
    const d2 = dx(T.same - 0.5, T.s170 - 0.35);
    if (live(d2)) {
      const V = mv(M.giza.V, d2);
      shadow(g, cam, V, LAMP);
      solid(g, cam, M.giza, V, LAMP, { base: C.teal });
      const kBx = prog(t, T.box169 - 0.2, T.box169 + 0.6);
      if (kBx > 0) { const bx = box(GS, GS, GZ), BV = bx.V.map(p => add(p, [-GS / 2 + d2, -GS / 2, 0]));
        g.save(); g.globalAlpha = kBx; solid(g, cam, bx, BV, LAMP, { k: 0, edgeW: 2.5 }); g.restore(); }
      const kS = prog(t, T.same2, T.hgt169 + 0.3), fb = P([d2, -GS / 2, 0]);
      label(g, 'same base · same height', fb[0], fb[1] + 74, { size: 24, align: 'center', k: kS });
    }

    // ── 170: hai thanh giấy (triệu m³), chiều cao theo số đã tính ──
    const d3 = dx(T.s170 - 0.3, 1e9), sc = 0.45;
    if (live(d3)) {
      const bars = [{ x: -0.9, v: +this.VP, a: T.two - 0.1, b: T.half + 0.2, base: C.teal, name: 'pyramid', txt: `≈ ${this.VP} million m³` },
        { x: 0.9, v: +this.VB, a: T.box170 - 0.1, b: T.eight + 0.2, base: C.card, name: 'box', txt: `≈ ${this.VB} million m³` }];
      bars.forEach(o => {
        const k = smooth(prog(t, o.a, o.b)), hgt = Math.max(0.02, o.v * sc * k), m = box(0.95, 0.95, hgt), V = m.V.map(p => add(p, [o.x - 0.475 + d3, -0.475, 0]));
        shadow(g, cam, V, LAMP, { a: 0.4 });
        solid(g, cam, m, V, LAMP, { base: o.base });
        const tp = P([o.x + d3, 0, hgt]), ft = P([o.x + d3, -0.475, 0]), yTop = Math.min(...V.map(p => P(p)[1]));
        label(g, o.name, ft[0], ft[1] + 46, { size: 24, align: 'center', k: prog(t, o.a, o.a + 0.4) });
        if (k >= 1) it(g, o.txt, tp[0], yTop - 26, 44, C.ink, { align: 'center', k: prog(t, o.b, o.b + 0.5) });
      });
    }

    lamp(g, 1060, 150);

    // ── cột chữ trái ──
    sectionTag(g, 'Act VIII · volume', prog(t, this.FROM + 0.3, this.FROM + 1));
    // V = ⅓ × B × h (104 px; ⅓ vẽ bằng frac — font thiếu ⅓)
    const S = 104, f0 = `italic 600 ${S}px ${CG}`;
    it(g, 'V =', 96, 260, S, C.ink, { k: prog(t, T.vol166, T.vol166 + 0.4) });
    let x = 96 + measure(g, 'V =', f0) + 22;
    if (t >= T.third166) x += frac(g, '1', '3', x, 260, S, C.ink) + 12; else x += 60;
    it(g, '× B × h', x, 260, S, C.ink, { k: prog(t, T.base166 - 0.1, T.hgt166 + 0.3) });
    it(g, 'B = base area,  h = height', 96, 336, 40, C.lead, { wt: 500, k: prog(t, T.base166, T.hgt166 + 0.6) });
    // 167: ba chóp bằng nhau — trượt ra cùng lăng trụ
    const o1 = -900 * prog(t, T.reveals - 0.2, T.reveals + 0.4) ** 2;
    g.save(); g.translate(o1, 0);
    it(g, 'prism = 3 equal pyramids', 96, 450, 54, C.ink, { k: prog(t, T.three, T.vols + 0.3) });
    if (t >= T.third167) { let x2 = 96 + it(g, 'each = ', 96, 530, 54, C.ink) + 4; x2 += frac(g, '1', '3', x2, 530, 64, C.ink) + 10; it(g, 'of the prism', x2, 530, 54, C.ink, { k: prog(t, T.third167, T.third167 + 0.6) }); }
    g.restore();
    // 169: kim tự tháp = ⅓ hộp (ảnh Giza kẹp bìa, credit)
    if (t >= T.third169) { let x3 = 96 + it(g, 'pyramid = ', 96, 450, 54, C.ink) + 4; x3 += frac(g, '1', '3', x3, 450, 64, C.ink) + 10; it(g, 'of the box', x3, 450, 54, C.ink, { k: prog(t, T.third169, T.third169 + 0.6) }); }
    photo(g, 'giza', 110, 570, 270, prog(t, T.fun - 0.2, T.fun + 0.6), { rot: -0.02, credit: 'Photo: Nina · CC BY 2.5' });
    it(g, 'the Great Pyramid', 110, 536, 40, C.lead, { wt: 500, k: prog(t, T.great, T.great + 0.6) });
  }
}
