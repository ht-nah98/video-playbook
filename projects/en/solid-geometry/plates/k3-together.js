// k3 · Putting it together. Ba thẻ chữ A của a0 QUAY LẠI (vẽ y như a0: CARDS / drawCards), mỗi thẻ "lật ra" câu trả
// lời: trên thẻ là hình đầu tiên giải thích nó (thu nhỏ, cùng đèn): 1 · chấm/chỉ/bìa + 4 thẻ luật; 2 · tam giác cam
// đất trong một mặt (que vuông góc + bóng) → nhìn thẳng xuống "flat geometry again"; 3 · lăng trụ tam giác TÁCH thành
// 3 chóp bằng nhau (thể tích tính bằng định thức) + nón.
import { C, prog, lookup, outCubic, outBack, smooth, ground, pool, camera, camLerp, sheet, sheetShadow, shadow, solid,
  thread, dot3, lamp, line, it, label, mono, frac, sectionTag, convex, revolve, add, sub, mul, centroid, clamp, goalTriangle,
  rightMark, must, norm } from '../kit.js';
import { CARDS, CARD_W, drawCards } from './a0-open.js';

const L0 = [0.6, 1.4, 9];
const MINI = { yaw: -24, pitch: 30, dist: 15, target: [0, 0.2, 0.35], cy: 330 };
// lăng trụ tam giác đứng và 3 chóp: A′ABC · A′BCB′ · A′CB′C′ (ba sắc giấy)
const PA = [-0.65, -0.35, 0], PB = [0.7, -0.35, 0], PC = [-0.1, 0.55, 0], HZ = [0, 0, 1.0];
const [PA1, PB1, PC1] = [PA, PB, PC].map(p => add(p, HZ));
const TETS = [[PA1, PA, PB, PC], [PA1, PB, PC, PB1], [PA1, PC, PB1, PC1]];
const TINT = [C.card, [236, 226, 205], [222, 212, 192]];
const det3 = (a, b, c) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
const vol = ([p, q, r, s]) => Math.abs(det3(sub(q, p), sub(r, p), sub(s, p))) / 6;
const CONE = revolve(0.42, 0.9, 0, 40);

export default class Together {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'k3');
    this.T = {
      three: w(203, 'three'), q: w(203, 'questions'),
      ideas: w(204, 'three'), defined: w(204, 'defined'), four: w(204, 'four'), rules: w(204, 'rules'), behave: w(204, 'behave'),
      build: w(205, 'build'), tri: w(205, 'triangle'), plane: w(205, 'plane'), perp: w(205, 'perpendicular'), shadow: w(205, 'shadow'),
      flat: w(205, 'flat'), m205: L(205).start,
      third: w(206, 'third'), prism: w(206, 'prism'), three3: w(206, 'three'), pyr: w(206, 'pyramids'), cone: w(206, 'cone'),
      m206: L(206).start, end: L(206).end,
    };
    this.START = L(203).start;
    this.FROM = Math.max(this.START - 1.2, L(202).end + 0.5);
    // toán trên hình: ba chóp bằng nhau, cộng lại đúng lăng trụ (đáy × cao) → mỗi chóp = ⅓ lăng trụ
    const base = Math.abs(det3(sub(PB, PA), sub(PC, PA), [0, 0, 1])) / 2, V = TETS.map(vol);
    V.forEach(v => must(`${v} * 3`, base * HZ[2]));
    must(`${V[0]} + ${V[1]} + ${V[2]}`, base * HZ[2]);
    this.TET = TETS.map(P => convex(P));
  }
  sfx() {
    const T = this.T;
    return [{ t: T.three + 0.1, kind: 'flap' }, { t: T.four, kind: 'pen' }, { t: T.tri, kind: 'pen' }, { t: T.three3 + 0.3, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    pool(g, 1720, 520, 900, 0.4);
    const kc = [0, 1, 2].map(i => prog(t, this.FROM + 0.3 + i * 0.18, this.FROM + 0.9 + i * 0.18));
    const kq = [0, 1, 2].map(i => prog(t, T.three + i * 0.15, T.q + 0.5 + i * 0.15));
    const tops = drawCards(g, kc, kq);
    // ⅓ trên thẻ 3 — như a0, hiện lại ở "one third"
    if (t >= T.third) frac(g, '1', '3', CARDS[2].x + CARD_W - 120, tops[2].top + 290, 90, C.ink);
    // câu trả lời viết vào thẻ (dòng 3)
    const ans = [['3 ideas + 4 rules', T.defined], ['a triangle in a plane', T.flat], ['3 pyramids', T.pyr]];
    ans.forEach(([s, a], i) => it(g, s, CARDS[i].x + 30, tops[i].top + 268, 40, C.ink, { k: prog(t, a, a + 0.9) }));

    const camAt = i => camera({ ...MINI, yaw: MINI.yaw + 0.3 * clamp(t - this.START, 0, 25), cx: CARDS[i].x + CARD_W / 2 });
    const L = L0;
    // ── 1 · ba ý không định nghĩa + bốn thẻ luật ──
    {
      const cam = camAt(0), P = cam.P;
      const kD = outBack(prog(t, T.ideas, T.ideas + 0.4)), kT = prog(t, T.ideas + 0.2, T.ideas + 0.7), kS = outCubic(prog(t, T.ideas + 0.4, T.ideas + 1.0));
      if (kS > 0) { const sc = [[0.4, 0.5, 0.25], [1.5, 0.5, 0.25], [1.5, 1.3, 0.25], [0.4, 1.3, 0.25]].map(p => [0.95 + (p[0] - 0.95) * kS, 0.9 + (p[1] - 0.9) * kS, p[2]]);
        sheetShadow(g, cam, sc.map(p => [p[0], p[1], 0]), { a: 0.2 * kS }); sheet(g, cam, sc, { k: kS, thick: 0.04 }); }
      if (kT > 0) { line(g, P([-0.75, 0.35, 0]), P([0.2, 1.25, 0]), 'rgba(150,74,38,0.2)', 5, [], kT); thread(g, cam, [-0.7, 0.45, 0.2], [0.25, 1.35, 0.2], { w: 4, k: kT }); }
      if (kD > 0) dot3(g, cam, [-1.35, 0.9, 0.02], { r: 9, k: kD });
      for (let i = 0; i < 4; i++) {
        const k = outBack(prog(t, T.four + i * 0.15, T.four + 0.45 + i * 0.15)); if (k <= 0) continue;
        const x0 = -1.65 + i * 0.85, c = [[x0, -0.9, 0], [x0 + 0.65, -0.9, 0], [x0 + 0.65, -0.35, 0], [x0, -0.35, 0]].map(p => [p[0], p[1], 0.06 * k]);
        sheetShadow(g, cam, c.map(p => [p[0], p[1], 0]), { a: 0.18 });
        sheet(g, cam, c, { k: clamp(k), thick: 0.03 });
        const m = P([x0 + 0.33, -0.62, 0.06]); mono(g, String(i + 1), m[0] - 8, m[1] + 10, { size: 28, k: k >= 1 ? 1 : 0 });
      }
    }
    // ── 2 · tam giác trong một mặt: que vuông góc AH, điểm B, bóng HB; rồi nhìn thẳng xuống ──
    {
      const flatU = smooth(prog(t, T.flat - 0.2, T.flat + 0.6));
      const cam = camAt(1);
      const P = cam.P;
      const kS = outCubic(prog(t, T.build, T.build + 0.6));
      const Hh = [-0.5, 0.25, 0], B = [0.95, -0.1, 0], u = norm(sub(B, Hh)), nIn = [u[1], -u[0], 0];
      // "flat geometry again": tam giác gập quanh HB, nằm phẳng xuống tờ bìa
      const th = flatU * Math.PI / 2, up = add([0, 0, Math.cos(th)], mul(nIn, Math.sin(th))), A = add(Hh, mul(up, 1.1));
      if (kS > 0) { const sc = [[-1.3, -1.2, 0], [1.4, -1.2, 0], [1.4, 0.9, 0], [-1.3, 0.9, 0]].map(p => [p[0] * kS, 0.1 + (p[1] - 0.1) * kS, 0]);
        sheetShadow(g, cam, sc.map(p => [p[0], p[1], 0]), { a: 0.15 * kS, dx: -0.06, dy: -0.06 }); sheet(g, cam, sc, { k: kS }); }
      const kTri = prog(t, T.tri, T.tri + 0.7), kPerp = prog(t, T.perp, T.perp + 0.4), kSh = prog(t, T.shadow - 0.1, T.shadow + 0.5);
      if (kSh > 0) line(g, P(Hh), P(B), C.terra, 7, [], kSh);
      goalTriangle(g, cam, A, Hh, B, { k: kTri });
      const kA = prog(t, T.build + 0.3, T.build + 0.8);
      line(g, P(Hh), P(A), C.ink, 5, [], kA);
      line(g, P(A), P(B), C.ink, 4, [], prog(t, T.tri, T.tri + 0.5));
      rightMark(g, cam, Hh, u, up, 0.2, { color: C.ink, k: kPerp });
      if (kA > 0) dot3(g, cam, A, { r: 6, k: kA });
      if (kTri > 0) dot3(g, cam, B, { r: 6, k: kTri });
      if (kSh > 0) { const m = P(B); label(g, 'shadow', m[0] + 22, m[1] + 10, { size: 22, color: C.terraT, k: kSh }); }
    }
    // ── 3 · lăng trụ tam giác → 3 chóp bằng nhau (tách ra) → nón ──
    {
      const cam = camAt(2);
      const kP = outBack(prog(t, T.prism - 0.15, T.prism + 0.45)), kX = smooth(prog(t, T.three3, T.pyr + 0.4));
      const ctr = centroid([PA, PB, PC, PA1, PB1, PC1]), kCone = outBack(prog(t, T.cone - 0.15, T.cone + 0.35));
      const shift = [-0.35 * kCone, 0, 0];
      if (kP > 0) {
        const parts = TETS.map((V, i) => { const d = sub(centroid(V), ctr), off = add(mul([d[0], d[1], 0], 2.4 * kX), shift);
          return { i, P3: V.map(p => add([p[0], p[1], p[2] * kP], off)) }; });
        parts.forEach(p => shadow(g, cam, p.P3, L, { a: 0.3 }));
        parts.sort((a, b) => cam.P(centroid(b.P3))[2] - cam.P(centroid(a.P3))[2])
          .forEach(p => solid(g, cam, this.TET[p.i], p.P3, L, { base: TINT[p.i], k: clamp(kP * 2), hidden: kX > 0.5 }));
      }
      if (kCone > 0) { const V = CONE.V.map(v => [v[0] + 1.55, v[1] + 0.2, v[2] * kCone]); shadow(g, cam, V, L, { a: 0.3 }); solid(g, cam, CONE, V, L, { k: clamp(kCone * 2) }); }
    }

    lamp(g, 1720, 150);
    sectionTag(g, 'Act X · putting it together', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
