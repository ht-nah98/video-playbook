// h2 · Prisms — lăng trụ xiên (hai đáy, hai mặt phẳng song song, mặt bên hình bình hành) → co về đáy rồi ĐÙN theo một
// hướng cố định (vệt mờ) → hướng dựng đứng (lăng trụ đứng, mặt bên chữ nhật) → đáy thành ngũ giác đều → hộp → lập phương
// → CĂN PHÒNG 12 × 4 × 3 (kit ROOM): đường chéo 13, d² = a² + b² + c², tam giác vuông cam đất = Pythagoras trong không gian.
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, pool, camera, camLerp, solid, shadow, prism, box, ngon, xf, room,
  ROOM, goalTriangle, centroid, lamp, line, it, label, sectionTag, rightMark, add, sub, mul, norm, lerp3 } from '../kit.js';

const CAM0 = { yaw: -24, pitch: 24, dist: 12, target: [0.4, 0.3, 1.0], cx: 1240, cy: 600 };
const CAMR = { yaw: -30, pitch: 30, dist: 12.5, target: [0, 0, 0.6], cx: 1240, cy: 640 };
const LW = [-1.4, 3.2, 5.2];
const B0 = [[1.3, 0], [0.45, 1.1], [-1.0, 0.85], [-1.25, -0.45], [0.15, -1.15]];   // ngũ giác lệch (lồi)
const BR = ngon(5, 1.25, 0);                                                         // ngũ giác đều
const D0 = [0.9, 0.55, 2.0], D1 = [0, 0, 2.1];                                       // hướng đùn: xiên → đứng
const BOX0 = [2.7, 1.6, 1.3], CUBE = [1.6, 1.6, 1.6];
const RS = 0.4, RAT = [-ROOM.a * RS / 2, -ROOM.b * RS / 2, 0];                       // căn phòng thu 0.4, tâm ở gốc
const R = p => add(mul(p, RS), RAT);

const tri = (g, a, b, size, k = 1) => {     // vạch "bằng nhau" ở giữa đoạn (màn hình)
  if (k <= 0) return; const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = [-(b[1] - a[1]) / d, (b[0] - a[0]) / d];
  line(g, [m[0] - n[0] * size, m[1] - n[1] * size], [m[0] + n[0] * size, m[1] + n[1] * size], C.ink, 3, [], k);
};
const tint = (g, pts, k, a = 0.16) => { if (k <= 0) return; g.save(); g.globalAlpha = a * k; g.fillStyle = C.ink; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill(); g.restore(); };

export default class Prisms {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2');
    this.T = {
      prism: w(130, 'prism'), bases: w(130, 'bases'), ident: w(130, 'identical'), parallel: w(130, 'parallel'), pgram: w(130, 'parallelograms'),
      imagine: w(131, 'imagine'), polygon: w(131, 'polygon'), pushing: w(131, 'pushing'), direction: w(131, 'direction'), sweeps: w(131, 'sweeps'), prism131: w(131, 'prism'),
      perp: w(132, 'perpendicular'), right: w(132, 'right'), rect: w(132, 'rectangles'),
      regular: w(133, 'regular', 1), base133: w(133, 'base'), regular2: w(133, 'regular', 2),
      rectangular: w(134, 'rectangular'), box: w(134, 'box'), rectangle: w(134, 'rectangle'),
      cube: w(135, 'cube'), six: w(135, 'six'), square: w(135, 'square'),
      box136: w(136, 'box'), formula: w(136, 'formula'),
      diag: w(137, 'diagonal'), equals: w(137, 'equals'), sum: w(137, 'sum'), length: w(137, 'length'), width: w(137, 'width'), height: w(137, 'height'), end137: L(137).end,
      pyth: w(138, 'pythagorean'), three: w(138, 'three'), end: L(138).end,
    };
    this.START = L(130).start;
    this.FROM = Math.max(this.START - 1.2, L(129).end + 0.5);
    // toán trên hình: 13² = 12² + 4² + 3² (kit ROOM), lập phương 6 mặt vuông
    must(`${ROOM.diag}^2`, 169); must(`${ROOM.a}^2 + ${ROOM.b}^2 + ${ROOM.c}^2`, 169);
    this.SIX = must(`${box(...CUBE).faces.length}`, 6);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.prism + 0.1, kind: 'flap' }, { t: T.parallel, kind: 'pen' }, { t: T.pushing, kind: 'pen' }, { t: T.perp, kind: 'snap' },
      { t: T.regular, kind: 'tick' }, { t: T.rectangular, kind: 'flap' }, { t: T.cube, kind: 'snap' }, { t: T.diag, kind: 'pen' }, { t: T.height, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera: trôi chậm khi giảng lăng trụ; chuyển sang góc nhìn căn phòng ở câu 136; đứng khi đọc số
    const drift = Math.min(Math.max(t - this.START, 0), T.box136 - this.START) * 0.15;
    const cR = smooth(prog(t, T.box136, T.formula + 0.6));
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAMR, cR), P = cam.P;
    const pc = P([0, 0.4, 0]); pool(g, pc[0], pc[1], 800, 0.55);

    // ── pha 1 (130–133): lăng trụ ngũ giác ──
    const outP = smooth(prog(t, T.rectangular - 0.4, T.box + 0.3));          // trượt ra phải (xa chữ bên trái)
    if (outP < 1) {
      const kIn = outCubic(prog(t, this.FROM + 0.3, T.prism + 0.5));
      const hh = t < T.pushing ? 1 - smooth(prog(t, T.imagine + 0.1, T.polygon + 0.2)) : smooth(prog(t, T.pushing, T.direction + 0.3));
      const dir = lerp3(D0, D1, smooth(prog(t, T.perp - 0.2, T.perp + 0.8)));
      const base = B0.map((p, i) => { const u = smooth(prog(t, T.regular, T.regular + 0.8)); return [p[0] + (BR[i][0] - p[0]) * u + 10 * outP, p[1] + (BR[i][1] - p[1]) * u - 5 * outP]; });
      const h = Math.max(hh, 0) * kIn, D = mul(dir, h);
      const B3 = base.map(([x, y]) => [x, y, 0]), T3 = B3.map(p => add(p, D));
      if (h > 0.03) {
        const m = prism(base, D);
        shadow(g, cam, m.V, LW, { a: 0.32 });
        // vệt đùn (câu 131): các lát đa giác mờ dọc đường đi
        if (t > T.pushing && t < T.perp) for (let j = 1; j < 5; j++) { const z = j / 5; if (z * 1 > hh - 0.02) break;
          const q = B3.map(p => P(add(p, mul(dir, z * kIn)))); g.save(); g.strokeStyle = C.inkA(0.3); g.lineWidth = 2; g.setLineDash([6, 8]);
          g.beginPath(); q.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.stroke(); g.restore(); }
        solid(g, cam, m, m.V, LW, { k: prog(t, T.prism - 0.2, T.prism + 0.6) });
      } else {
        // chỉ còn đáy: tờ đa giác nằm trên bàn
        const q = B3.map(P); g.save(); g.fillStyle = `rgb(${C.card.join(',')})`; g.beginPath(); q.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill();
        g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke(); g.restore();
      }
      const sb = B3.map(P), st = T3.map(P);
      // câu 130: hai đáy nét đậm, hai mặt phẳng song song (nét đứt), một mặt bên hình bình hành
      const kBase = prog(t, T.bases, T.bases + 0.5) * (1 - prog(t, T.imagine, T.imagine + 0.3));
      if (kBase > 0) [sb, st].forEach(s => s.forEach((p, i) => line(g, p, s[(i + 1) % s.length], C.ink, 6, [], kBase)));
      const kPl = prog(t, T.parallel, T.parallel + 0.6) * (1 - prog(t, T.imagine, T.imagine + 0.3));
      if (kPl > 0) [0, 1].forEach(z => { const c = add([0.2, 0, 0], mul(D, z)), q = [[-2.3, -1.9], [2.6, -1.9], [2.6, 1.9], [-2.3, 1.9]].map(([x, y]) => P(add(c, [x, y, 0])));
        g.save(); g.strokeStyle = C.inkA(0.45 * kPl); g.lineWidth = 2; g.setLineDash([10, 10]); g.beginPath(); q.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.stroke(); g.restore(); });
      // mặt bên được gọi tên: mặt trước nhất (giữa cạnh 4–0 của đáy)
      const area = q => { let a = 0; q.forEach((p, i) => { const r = q[(i + 1) % q.length]; a += p[0] * r[1] - r[0] * p[1]; }); return a; };
      const sides = [0, 1, 2, 3, 4].map(i => [sb[i], sb[(i + 1) % 5], st[(i + 1) % 5], st[i]]), sg = -Math.sign(area(sb.slice().reverse()));
      const face = sides.reduce((a, q) => (area(q) * sg > area(a) * sg ? q : a));
      tint(g, face, prog(t, T.pgram, T.pgram + 0.4) * (1 - prog(t, T.imagine, T.imagine + 0.3)));
      tint(g, face, prog(t, T.rect, T.rect + 0.4) * (1 - prog(t, T.regular - 0.4, T.regular)));
      const fc = centroid(face.map(p => [p[0], p[1], 0]));
      label(g, 'parallelogram', fc[0], fc[1] + 8, { color: C.ink, size: 22, align: 'center', k: prog(t, T.pgram, T.pgram + 0.5) * (t < T.imagine ? 1 : 0) });
      label(g, 'rectangle', fc[0], fc[1] + 8, { color: C.ink, size: 22, align: 'center', k: prog(t, T.rect, T.rect + 0.5) * (t < T.regular - 0.2 ? 1 : 0) });
      // nhãn hai đáy
      const lb = sb.reduce((a, p) => p[0] > a[0] ? p : a), lt = st.reduce((a, p) => p[0] > a[0] ? p : a);
      if (t < T.imagine) { label(g, 'base', lb[0] + 22, lb[1] + 8, { color: C.ink, size: 24, k: prog(t, T.bases, T.bases + 0.4) });
        label(g, 'base', lt[0] + 22, lt[1] + 8, { color: C.ink, size: 24, k: prog(t, T.ident, T.ident + 0.4) }); }
      // hướng cố định (câu 131): mũi tên cạnh lăng trụ
      if (t >= T.pushing && t < T.perp) { const a0 = P(add(B3[0], [0.5, -0.1, 0])), a1 = P(add(add(B3[0], [0.5, -0.1, 0]), mul(D0, 0.9)));
        const k = prog(t, T.direction - 0.2, T.direction + 0.3); line(g, a0, a1, C.lead, 3, [], k);
        if (k >= 1) { const an = Math.atan2(a1[1] - a0[1], a1[0] - a0[0]); g.save(); g.fillStyle = C.lead; g.translate(a1[0], a1[1]); g.rotate(an); g.beginPath(); g.moveTo(6, 0); g.lineTo(-14, -9); g.lineTo(-14, 9); g.closePath(); g.fill(); g.restore();
          label(g, 'one fixed direction', a1[0] + 18, a1[1] - 4, { size: 22, k: prog(t, T.direction, T.direction + 0.6) }); } }
      // câu 132: dấu vuông giữa cạnh bên và đáy
      if (t >= T.perp) rightMark(g, cam, B3[0], norm(sub(B3[4], B3[0])), [0, 0, 1], 0.28, { k: prog(t, T.perp + 0.6, T.perp + 0.9) * (1 - outP) });
      // câu 133: đáy đều — vạch bằng nhau trên các cạnh đáy trên
      if (t >= T.base133) st.forEach((p, i) => tri(g, p, st[(i + 1) % 5], 9, prog(t, T.base133 + i * 0.08, T.base133 + 0.3 + i * 0.08)));
    }

    // ── pha 2 (134–135): hộp → lập phương, trượt vào từ phải; ra trái ở câu 136 ──
    const inB = smooth(prog(t, T.rectangular - 0.1, T.box + 0.6)), outB = smooth(prog(t, T.box136 - 0.2, T.box136 + 0.5));
    if (inB > 0 && outB < 1) {
      const u = smooth(prog(t, T.cube - 0.1, T.cube + 0.6)), d = BOX0.map((v, i) => v + (CUBE[i] - v) * u);
      const m = box(...d), V = xf(m.V, { at: [-d[0] / 2 + 9 * (1 - inB) + 3 * outB, -d[1] / 2 + 14 * outB, 0] });
      if (inB > 0.8) shadow(g, cam, V, LW, { a: 0.32 * (inB - 0.8) / 0.2 });
      solid(g, cam, m, V, LW);
      const s = V.map(P);
      const low = V.map((p, i) => [p, i]).filter(([p]) => p[2] < 1e-6).map(([, i]) => i);
      const c = centroid(low.map(i => V[i])), ord = low.sort((a, b) => Math.atan2(V[a][1] - c[1], V[a][0] - c[0]) - Math.atan2(V[b][1] - c[1], V[b][0] - c[0]));
      const kR = prog(t, T.rectangle, T.rectangle + 0.5) * (1 - prog(t, T.cube - 0.2, T.cube));
      if (kR > 0) ord.forEach((a, i) => line(g, s[a], s[ord[(i + 1) % 4]], C.ink, 6, [], kR));
      const fr = s.reduce((a, p) => p[0] > a[0] ? p : a);
      label(g, 'rectangle base', fr[0] + 24, fr[1] + 30, { color: C.ink, size: 22, k: kR > 0 ? prog(t, T.rectangle, T.rectangle + 0.5) : 0 });
      if (t >= T.six) {
        const top = Math.min(...s.map(p => p[1])), cx = (Math.min(...s.map(p => p[0])) + Math.max(...s.map(p => p[0]))) / 2;
        label(g, `${this.SIX} equal squares`, cx, top - 34, { color: C.ink, size: 26, align: 'center', k: prog(t, T.six, T.square + 0.4) * (outB > 0.02 ? 0 : 1) });
      }
    }

    // ── pha 3 (136–138): CĂN PHÒNG 12 × 4 × 3, đường chéo 13 ──
    const inR = smooth(prog(t, T.box136, T.formula + 0.3));
    if (inR > 0) {
      const at = add(RAT, [0, 0, 6 * (1 - inR)]), Rr = p => add(mul(p, RS), at);
      if (inR > 0.8) shadow(g, cam, Object.values(ROOM.corners).map(Rr), LW, { a: 0.35 * (inR - 0.8) / 0.2 });
      const Pp = room(g, cam, { scale: RS, at });
      const c = ROOM.corners, kd = prog(t, T.diag, T.diag + 0.8);
      const s = { lf0: Pp(c.lf0), rf0: Pp(c.rf0), rb0: Pp(c.rb0), rb1: Pp(c.rb1) };
      // tam giác vuông cam đất (câu 138): lf0 – rb0 – rb1, nằm trong mặt chéo đứng
      goalTriangle(g, cam, Rr(c.rb0), Rr(c.lf0), Rr(c.rb1), { k: prog(t, T.pyth, T.pyth + 0.9) });
      if (t >= T.pyth) { line(g, s.lf0, s.rb0, C.terra, 3, [8, 8], prog(t, T.pyth, T.pyth + 0.5)); rightMark(g, cam, Rr(c.rb0), norm(sub(c.lf0, c.rb0)), [0, 0, 1], 0.22, { color: C.terra, k: prog(t, T.pyth + 0.5, T.pyth + 0.8) }); }
      // ba cạnh a, b, c đậm theo lời "length", "width", "height"
      const kL = prog(t, T.length, T.length + 0.4), kW = prog(t, T.width, T.width + 0.4), kH = prog(t, T.height, T.height + 0.4);
      line(g, s.lf0, s.rf0, C.ink, 7, [], kL); line(g, s.rf0, s.rb0, C.ink, 7, [], kW); line(g, s.rb0, s.rb1, C.ink, 7, [], kH);
      const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const mL = mid(s.lf0, s.rf0), mW = mid(s.rf0, s.rb0), mH = mid(s.rb0, s.rb1), mD = mid(s.lf0, s.rb1);
      it(g, `${ROOM.a}`, mL[0], mL[1] + 54, 54, C.ink, { align: 'center', k: kL * 2 });
      it(g, `${ROOM.b}`, mW[0] + 40, mW[1] + 44, 54, C.ink, { k: kW * 2 });
      it(g, `${ROOM.c}`, mH[0] + 22, mH[1] + 16, 54, C.ink, { k: kH * 2 });
      // đường chéo dài (xanh ngọc = vật đang xét)
      line(g, s.lf0, s.rb1, `rgb(${C.teal.join(',')})`, 6, [], kd);
      it(g, `${must(`${ROOM.diag}`, 13)}`, mD[0] - 20, mD[1] - 26, 60, C.tealT, { align: 'right', k: prog(t, T.diag + 0.6, T.diag + 1.0) * 2 });
    }

    // đèn
    lamp(g, P([LW[0], LW[1], 3])[0], 150, { on: 1 });

    // ── chữ trái ──
    sectionTag(g, 'Act VII · prisms', prog(t, this.FROM + 0.3, this.FROM + 1));
    const outList = outCubic(prog(t, T.box136 - 0.2, T.box136 + 0.5)) * -900;
    g.save(); g.translate(outList, 0);
    it(g, 'Prism', 96, 250, 92, C.ink, { k: prog(t, T.prism, T.prism + 0.5) });
    it(g, 'two bases in parallel planes', 96, 316, 40, C.lead, { wt: 500, k: prog(t, T.bases, T.parallel + 0.5) });
    const rows = [['right prism', '', T.right], ['regular prism', 'regular base', T.regular2], ['box', 'rectangle base', T.box], ['cube', 'six squares', T.cube]];
    rows.forEach(([a, b, tw], i) => {
      const y = 420 + i * 84, cur = i === rows.length - 1 ? t >= tw : t >= tw && t < rows[i + 1][2];
      it(g, a, 96, y, 54, cur ? C.ink : C.lead, { k: prog(t, tw, tw + 0.5) });
      if (i) label(g, b, 430, y - 8, { size: 22, k: prog(t, tw + 0.2, tw + 0.9) });
    });
    // "edges ⟂ base": ⟂ thiếu ở font → vẽ tay
    if (t >= T.right + 0.2) { const k = prog(t, T.right + 0.2, T.right + 0.9); label(g, 'side edges', 430, 412, { size: 22, k });
      if (k >= 0.6) { line(g, [612, 412], [632, 412], C.lead, 2.5); line(g, [622, 412], [622, 394], C.lead, 2.5); label(g, 'base', 646, 412, { size: 22, k: prog(k, 0.6, 1) }); } }
    g.restore();
    // công thức (câu 136–138)
    const fx = 96;
    it(g, 'd² = a² + b² + c²', fx, 300, 92, C.ink, { k: prog(t, T.equals, T.height + 0.3) });
    it(g, `${ROOM.diag}² = ${ROOM.a}² + ${ROOM.b}² + ${ROOM.c}²`, fx, 400, 64, C.ink, { k: prog(t, T.height + 0.2, T.end137 + 0.6) });
    it(g, 'Pythagoras, in three dimensions', fx, 480, 46, C.terraT, { wt: 500, k: prog(t, T.pyth, T.three + 0.5) });
    label(g, 'long diagonal', fx, 200, { size: 24, k: prog(t, T.diag, T.diag + 0.6) });
  }
}
