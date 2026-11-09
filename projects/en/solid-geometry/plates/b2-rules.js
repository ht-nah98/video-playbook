// b2 · Four rules — bốn thẻ luật đánh số bên trái; bên phải mỗi luật một hình 3D có bóng:
// (1) 2 chấm → 1 sợi chỉ, hạ xuống "flat paper"; (2) 3 chấm (không thẳng hàng) → 1 tờ bìa; ghế đẩu ba chân đứng vững
// trên sàn gồ ghề, ghế bốn chân cập kênh (`wood`), chân máy ảnh; (3) hai chấm trong P → cả đường; thước kẻ áp xuống bàn;
// (4) hai tờ bìa cắt nhau theo một nếp = giao tuyến → góc tường–trần của hộp-phòng (ROOM.edges.wallCeiling).
import { W, H, C, prog, lookup, must, outCubic, outBack, smooth, clamp, ground, pool, camLerp, sheet, thread, dot3, shadow,
  solid, box, revolve, lamp, line, poly, rgb, it, label, sectionTag, quad, shadowPt, add, sub, mul, dot, cross3, norm, len,
  lerp3, centroid, room, ROOM, xf } from '../kit.js';

const LT = [1.5, 2.5, 9], LAMP_X = 1250, LAMP_Y = 150;
const CAM = { yaw: -26, pitch: 27, dist: 11, target: [0, 0, 0.9], cx: 1260, cy: 610 };
const CAMR = { yaw: -18, pitch: 24, dist: 10.8, target: [0, 0.2, 0.55], cx: 1290, cy: 640 };   // hộp-phòng
const RULES = ['two points → one line', 'three points → one plane', 'two points in → whole line in', 'two planes meet → a line'];
const SEAT = revolve(0.62, 0.12, 0.62, 32), CSEAT = box(1.4, 1.4, 0.1), CAMBOX = box(0.55, 0.3, 0.32), RULER = box(3.6, 0.34, 0.05);
const SHIM = box(0.42, 0.42, 1);

// ── hàm cục bộ ──
const rodr = (v, k, a) => add(add(mul(v, Math.cos(a)), mul(cross3(k, v), Math.sin(a))), mul(k, dot(k, v) * (1 - Math.cos(a))));
/** xoay v sao cho trục z → n */
function alignZ(v, n) { const z = [0, 0, 1], ax = cross3(z, n), s = len(ax); if (s < 1e-9) return v; return rodr(v, mul(ax, 1 / s), Math.acos(clamp(dot(z, n), -1, 1))); }
/** xoay điểm p quanh đường (a, b) góc ang */
const rotLine = (p, a, b, ang) => add(a, rodr(sub(p, a), norm(sub(b, a)), ang));
function dotShadow(g, cam, p, k = 1, z0 = 0) {
  if (k <= 0) return; const q = cam.P(shadowPt(p, LT, z0));
  g.save(); g.fillStyle = `rgba(150,74,38,${0.22 * clamp(k)})`; g.beginPath(); g.ellipse(q[0], q[1], 12, 6, 0, 0, 7); g.fill(); g.restore();
}
function threadShadow(g, cam, a, b, k = 1, w = 7, z0 = 0) {
  if (k <= 0) return; line(g, cam.P(shadowPt(a, LT, z0)), cam.P(shadowPt(b, LT, z0)), 'rgba(150,74,38,0.2)', w, [], k);
}
/** tờ bìa đi qua ba điểm (mặt phẳng ABC), nửa cạnh su, sv quanh trọng tâm */
function planeThrough(A, B, Cc, su, sv) {
  const u = norm(sub(B, A)), n = norm(cross3(sub(B, A), sub(Cc, A))), v = cross3(n, u);
  return { corners: quad(centroid([A, B, Cc]), mul(u, su), mul(v, sv)), n: n[2] < 0 ? mul(n, -1) : n };
}
/** cục kê (sàn gồ ghề) cao h, tâm [x, y] */
const shimV = (x, y, h) => SHIM.V.map(v => [v[0] - 0.21 + x, v[1] - 0.21 + y, v[2] * Math.max(h, 0.02)]);
/** trượt vào từ phải lúc tin, trượt ra trái lúc tout */
const slide = (t, tin, tout) => 10 * (1 - outCubic(prog(t, tin - 0.55, tin + 0.25))) - 13 * smooth(prog(t, tout - 0.45, tout + 0.45));

export default class Rules {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      r1: L(7).start, two7: w(7, 'two'), diff7: w(7, 'different'), pts7: w(7, 'points'), line7: w(7, 'line'), flat7: w(7, 'flat'),
      r2: L(8).start, three8: w(8, 'three'), dont8: w(8, "don't"), line8: w(8, 'line'), plane8: w(8, 'plane'),
      why9: L(9).start, legged9: w(9, 'three-legged'), stool9: w(9, 'stool'), wob9: w(9, 'wobbles'), uneven9: w(9, 'uneven'),
      tips10: w(10, 'tips'), pin10: w(10, 'pin'), plane10: w(10, 'plane'), touch10: w(10, 'touch'), ground10: w(10, 'ground'),
      four11: w(11, 'four-legged'), chair11: w(11, 'chair', 1), fourth11: w(11, 'fourth'), off11: w(11, 'off'), plane11: w(11, 'plane'),
      rocks11: w(11, 'rocks'),
      cam12: w(12, 'camera'), tripod12: w(12, 'tripod'), three12: w(12, 'three'), four12: w(12, 'four'),
      r3: L(13).start, two13: w(13, 'two'), pts13: w(13, 'points'), line13: w(13, 'line', 1), plane13: w(13, 'plane', 1), whole13: w(13, 'whole'),
      ruler14: w(14, 'ruler', 1), both14: w(14, 'both'), touch14: w(14, 'touch'), entire14: w(14, 'entire'), flat14: w(14, 'flat'),
      r4: L(15).start, diff15: w(15, 'different'), planes15: w(15, 'planes'), point15: w(15, 'point', 1), whole15: w(15, 'whole'),
      line15: w(15, 'line', 1), inter15: w(15, 'intersection'),
      look16: L(16).start, corner16: w(16, 'corner'), wall16: w(16, 'wall'), ceil16: w(16, 'ceiling'),
      edge17: w(17, 'edge'), inter17: w(17, 'intersection'), planes17: w(17, 'planes'), wall17: w(17, 'wall'), ceil17: w(17, 'ceiling'),
      end: L(17).end,
    };
    this.START = L(7).start;
    this.FROM = Math.max(this.START - 1.2, L(6).end + 0.5);
    // (2) ba chấm KHÔNG thẳng hàng: diện tích tam giác ≠ 0; ghế: chân thứ tư hở khỏi mặt phẳng của ba chân kia
    must(`${len(cross3(sub(P2[1], P2[0]), sub(P2[2], P2[0]))) > 0.5 ? 1 : 0}`, 1);
    must(`${CH.gap > 0.15 ? 1 : 0}`, 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.line7, kind: 'pen' }, { t: T.stool9, kind: 'wood' }, { t: T.touch10, kind: 'tick' }, { t: T.rocks11, kind: 'wood' },
      { t: T.whole13 + 0.2, kind: 'pen' }, { t: T.touch14, kind: 'snap' }, { t: T.whole15 + 0.2, kind: 'pen' }, { t: T.edge17, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const sway = 3 * Math.sin((t - S) * 0.12), ur = smooth(prog(t, T.look16 - 0.3, T.corner16 + 0.3));
    const cam = camLerp({ ...CAM, yaw: CAM.yaw + sway }, { ...CAMR, yaw: CAMR.yaw + sway * 0.6 }, ur), P = cam.P;
    pool(g, 1220, 640, 820, 0.35);

    // ── (1) hai chấm → một sợi chỉ; hạ xuống tờ giấy phẳng ──
    if (t < T.r2 + 0.5) {
      const dx = slide(t, this.FROM + 0.55, T.r2), fl = smooth(prog(t, T.flat7 - 0.1, T.flat7 + 0.7));
      const card = quad([dx, 0, 0.02], [2.6, 0, 0], [0, 1.6, 0]);
      shadow(g, cam, card.map(p => add(p, [0, 0, 0.04])), LT, { a: 0.18 });
      sheet(g, cam, card, { thick: 0.03 });
      const A = [dx - 1.3, -0.4, 1.0 - 0.95 * fl], B = [dx + 1.2, 0.5, 1.6 - 1.55 * fl];
      const u = sub(B, A), E0 = add(A, mul(u, -0.55)), E1 = add(B, mul(u, 0.5));
      const kA = prog(t, T.two7, T.two7 + 0.3), kB = prog(t, T.diff7, T.diff7 + 0.3), kL = prog(t, T.line7 - 0.15, T.line7 + 0.6);
      dotShadow(g, cam, A, kA * (1 - fl)); dotShadow(g, cam, B, kB * (1 - fl));
      threadShadow(g, cam, lerp3(A, E0, 1), lerp3(B, E1, 1), kL * (1 - fl));
      if (kL > 0) { const M = lerp3(A, B, 0.5); thread(g, cam, M, E0, { w: 5, k: kL }); thread(g, cam, M, E1, { w: 5, k: kL }); }
      dot3(g, cam, A, { r: 11, k: kA }); dot3(g, cam, B, { r: 11, k: kB });
      const q = P([dx + 2.6, -1.6, 0]);
      label(g, 'like flat paper', q[0] - 20, q[1] + 56, { size: 24, align: 'right', k: prog(t, T.flat7, T.flat7 + 0.6) });
    }

    // ── (2a) ba chấm không thẳng hàng → đúng một tờ bìa ──
    if (t > T.r2 - 0.6 && t < T.why9 + 0.5) {
      const dx = slide(t, T.r2, T.why9), D = P2.map(p => add(p, [dx, 0, 0]));
      const kk = [0, 1, 2].map(i => prog(t, T.three8 + 0.15 * i, T.three8 + 0.15 * i + 0.3));
      const kD = prog(t, T.dont8, T.line8 + 0.4), kP = outCubic(prog(t, T.plane8 - 0.25, T.plane8 + 0.5));
      const pl = planeThrough(D[0], D[1], D[2], 2.3, 1.5);
      if (kP > 0) { const cs = pl.corners.map(p => lerp3(centroid(D), p, kP)); shadow(g, cam, cs, LT, { a: 0.16 * kP }); sheet(g, cam, cs, { k: kP, thick: 0.03, alpha: 0.92 }); }
      D.forEach((p, i) => dotShadow(g, cam, p, kk[i] * (1 - kP)));
      // "don't lie on one line": đường qua hai chấm đầu trượt khỏi chấm thứ ba
      line(g, P(add(D[0], mul(sub(D[1], D[0]), -0.5))), P(add(D[0], mul(sub(D[1], D[0]), 1.6))), C.inkA(0.55), 3, [10, 10], kD);
      D.forEach((p, i) => dot3(g, cam, p, { r: 11, k: kk[i] }));
      const q = P(add(pl.corners[2], [0, 0, 0]));
      label(g, 'exactly one plane', q[0] + 10, q[1] - 30, { size: 24, color: C.ink, align: 'right', k: prog(t, T.plane8, T.plane8 + 0.6) });
    }

    // ── (2b) ghế đẩu ba chân · ghế bốn chân cập kênh · chân máy ảnh ──
    if (t > T.why9 - 0.6 && t < T.r3 + 0.5) {
      const out = smooth(prog(t, T.r3 - 0.45, T.r3 + 0.45));
      const sx = slide(t, T.why9, 1e9) - 2.2 * smooth(prog(t, T.four11 - 0.3, T.four11 + 0.5)) - 13 * out;
      // sàn gồ ghề: cục kê dưới từng chân
      const kSh = outBack(prog(t, T.why9, T.why9 + 0.5));
      const tips = ST.tips.map(p => add(p, [sx, 0, 0]));
      const shims = ST.tips.map(p => shimV(p[0] + sx, p[1], p[2] * kSh));
      shims.forEach(V => { if (p0(V)) shadow(g, cam, V, LT, { a: 0.3 }); });
      // ghế đẩu: rơi xuống đúng chữ "stool" (tiếng wood)
      const kSt = prog(t, T.legged9 + 0.1, T.stool9), drop = 2.4 * (1 - kSt * kSt), sOn = t >= T.legged9 + 0.1;
      const lift = [sx, 0, drop], seatV = ST.seat.map(p => add(p, lift)), rims = ST.rims.map(p => add(p, lift)), legT = ST.tips.map(p => add(p, lift));
      if (sOn) { shadow(g, cam, seatV, LT, { a: 0.3 }); legT.forEach((p, i) => threadShadow(g, cam, p, rims[i], 1, 8)); }
      shims.forEach(V => solid(g, cam, SHIM, V, LT, { edgeW: 2.5 }));
      if (sOn) { legT.forEach((p, i) => thread(g, cam, p, rims[i], { w: 9 })); solid(g, cam, SEAT, seatV, LT); }
      // ba đầu chân ghim đúng một mặt phẳng
      const kTip = [0, 1, 2].map(i => prog(t, T.tips10 + 0.12 * i, T.tips10 + 0.12 * i + 0.3)), kPl = prog(t, T.pin10, T.plane10 + 0.4) * (1 - prog(t, T.four11 - 0.3, T.four11));
      if (kPl > 0) { const pl = planeThrough(tips[0], tips[1], tips[2], 1.25, 0.95);
        sheet(g, cam, pl.corners.map(p => lerp3(centroid(tips), p, outCubic(kPl))), { k: kPl, alpha: 0.5, thick: 0.01 });
        const q = P(pl.corners[2]); label(g, 'one plane', q[0] + 24, q[1] - 10, { size: 24, color: C.ink, k: prog(t, T.plane10, T.plane10 + 0.5) }); }
      tips.forEach((p, i) => { dot3(g, cam, p, { r: 9, k: kTip[i] * (1 - out) });
        const kr = prog(t, T.touch10 + 0.08 * i, T.touch10 + 0.08 * i + 0.4); if (kr > 0 && kr < 1) { const q = P(p); g.save(); g.strokeStyle = C.inkA(1 - kr); g.lineWidth = 3; g.beginPath(); g.ellipse(q[0], q[1], 12 + 34 * kr, 6 + 15 * kr, 0, 0, 7); g.stroke(); g.restore(); } });
      const ls = P([sx, -1.0, 0]);
      label(g, '3 legs', ls[0], ls[1] + 60, { size: 26, color: C.ink, align: 'center', k: prog(t, T.wob9, T.wob9 + 0.5) });
      const us = P(add(tips[1], [0, -0.3, 0]));
      if (t < T.tips10) label(g, 'uneven floor', us[0] - 30, us[1] + 50, { size: 24, align: 'right', k: prog(t, T.uneven9, T.uneven9 + 0.6) });

      // ghế bốn chân (bên phải): vào ở "four-legged", cập kênh ở "rocks", ra phải khi chân máy ảnh vào
      if (t > T.four11 - 0.6) {
        const cx = slide(t, T.four11, 1e9) + 1.9 + 11 * smooth(prog(t, T.cam12 - 0.4, T.tripod12 + 0.2));
        const ph = rockAngle(t, T.rocks11), off = [cx, 0, 0];
        const R = p => add(rotLine(p, CH.tips[0], CH.tips[2], ph * CH.sign), off);
        const cshims = CH.floor.map(([x, y, h]) => shimV(x + cx, y, h));
        const V = { tips: CH.tips.map(R), tops: CH.tops.map(R), seat: CH.seat.map(R), back: CH.back.map(R) };
        cshims.forEach(Vs => { if (p0(Vs)) shadow(g, cam, Vs, LT, { a: 0.3 }); });
        shadow(g, cam, [...V.seat, ...V.back], LT, { a: 0.3 }); V.tips.forEach((p, i) => threadShadow(g, cam, p, V.tops[i], 1, 8));
        cshims.forEach(Vs => { if (p0(Vs)) solid(g, cam, SHIM, Vs, LT, { edgeW: 2.5 }); });
        // chân xa trước, rồi mặt ghế, lưng ghế, chân gần
        const order = [3, 2, 0, 1];
        order.slice(0, 2).forEach(i => thread(g, cam, V.tips[i], V.tops[i], { w: 9, color: i === 3 && t >= T.fourth11 ? rgb(C.teal) : C.ink }));
        sheet(g, cam, V.back, { thick: 0.04 });
        solid(g, cam, CSEAT, V.seat, LT);
        order.slice(2).forEach(i => thread(g, cam, V.tips[i], V.tops[i], { w: 9 }));
        // mặt phẳng của ba chân kia + khe hở của chân thứ tư
        const kO = prog(t, T.off11 - 0.1, T.plane11 + 0.4) * (1 - prog(t, T.rocks11 - 0.4, T.rocks11 - 0.05));
        if (kO > 0) { const pl = planeThrough(V.tips[0], V.tips[1], V.tips[2], 1.2, 1.0);
          sheet(g, cam, pl.corners, { k: kO, alpha: 0.45, thick: 0.01 });
          const fD = add([CH.floor[3][0] + cx, CH.floor[3][1], 0], [0, 0, 0]);
          line(g, P(V.tips[3]), P(fD), C.inkA(0.8), 2.5, [5, 7], kO);
          const q = P(V.tips[3]); label(g, 'off the plane', q[0] - 26, q[1] - 34, { size: 24, color: C.tealT, align: 'right', k: prog(t, T.off11, T.plane11 + 0.3) }); }
        if (t >= T.fourth11) dot3(g, cam, V.tips[3], { r: 10, color: rgb(C.teal), k: prog(t, T.fourth11, T.fourth11 + 0.3) });
        const lq = P([cx, -1.0, 0]);
        label(g, '4 legs', lq[0], lq[1] + 60, { size: 26, color: C.ink, align: 'center', k: prog(t, T.chair11, T.chair11 + 0.5) });
        if (t >= T.rocks11 - 0.1) label(g, 'it rocks', lq[0], lq[1] + 100, { size: 24, color: C.tealT, align: 'center', k: prog(t, T.rocks11, T.rocks11 + 0.4) });
      }
      // chân máy ảnh: ba chân, đầu máy ảnh
      if (t > T.cam12 - 0.3) {
        const tx = 10 * (1 - outCubic(prog(t, T.cam12 - 0.1, T.tripod12 + 0.4))) + 1.9 - 13 * out;
        const tshims = TR.tips.map(p => shimV(p[0] + tx, p[1], p[2]));
        const tip = TR.tips.map(p => add(p, [tx, 0, 0])), head = add(TR.head, [tx, 0, 0]), cb = CAMBOX.V.map(v => add(v, [tx - 0.275, -0.15, TR.head[2] + 0.05]));
        tshims.forEach(V => { if (p0(V)) shadow(g, cam, V, LT, { a: 0.3 }); });
        shadow(g, cam, cb, LT, { a: 0.3 }); tip.forEach(p => threadShadow(g, cam, p, head, 1, 6));
        tshims.forEach(V => { if (p0(V)) solid(g, cam, SHIM, V, LT, { edgeW: 2.5 }); });
        tip.forEach(p => thread(g, cam, p, head, { w: 6 }));
        solid(g, cam, CAMBOX, cb, LT);
        tip.forEach((p, i) => dot3(g, cam, p, { r: 9, k: prog(t, T.three12 + 0.1 * i, T.three12 + 0.1 * i + 0.3) }));
        const lq = P([tx, -1.0, 0]);
        label(g, 'tripod · 3 legs', lq[0], lq[1] + 60, { size: 26, color: C.ink, align: 'center', k: prog(t, T.three12, T.four12 + 0.3) });
      }
    }

    // ── (3) hai điểm trong P → cả đường; thước kẻ áp xuống bàn ──
    if (t > T.r3 - 0.6 && t < T.r4 + 0.5) {
      const dx = slide(t, T.r3, T.r4), c = [dx + 0.2, 0.2, 0.05], card = quad(c, [3.0, 0, 0], [0, 1.9, 0]);
      shadow(g, cam, card, LT, { a: 0.22 }); sheet(g, cam, card, { thick: 0.04 });
      const pq = P(add(card[0], [0.25, 0.25, 0])); it(g, 'P', pq[0] + 4, pq[1] - 4, 60, C.ink, { k: prog(t, T.plane13, T.plane13 + 0.3) });
      const A = [dx - 0.8, -0.1, 0.06], B = [dx + 0.7, 0.7, 0.06], u = sub(B, A);
      const dim = 1 - 0.5 * smooth(prog(t, T.ruler14, T.ruler14 + 0.5));
      const kSeg = prog(t, T.line13, T.line13 + 0.35), kW = prog(t, T.whole13, T.whole13 + 0.8);
      g.save(); g.globalAlpha = dim;
      thread(g, cam, A, B, { w: 6, k: kSeg });
      if (kW > 0) { thread(g, cam, A, add(A, mul(u, -1.25)), { w: 6, k: kW }); thread(g, cam, B, add(A, mul(u, 2.15)), { w: 6, k: kW }); }
      dot3(g, cam, A, { r: 11, k: prog(t, T.two13, T.two13 + 0.3) }); dot3(g, cam, B, { r: 11, k: prog(t, T.pts13, T.pts13 + 0.3) });
      g.restore();
      const wq = P(add(A, mul(u, 2.15)));
      label(g, 'whole line in P', wq[0] + 18, wq[1] - 20, { size: 24, color: C.inkA(dim), k: prog(t, T.whole13, T.whole13 + 0.6) });
      // thước: lơ lửng nghiêng → hai đầu chạm bàn đúng "touch" → nằm áp
      if (t >= T.ruler14 - 0.3) {
        const kIn = outCubic(prog(t, T.ruler14 - 0.3, T.ruler14 + 0.3)), lo = smooth(prog(t, T.both14 - 0.2, T.touch14));
        const ang = 14 * (1 - lo), z = 0.09 + (1.1 + 1.5 * (1 - kIn)) * (1 - lo);
        const V = xf(RULER.V.map(v => [v[0] - 1.8, v[1] - 0.17, v[2]]), { ry: ang, at: [dx - 0.2, -1.05, z] });
        shadow(g, cam, V, LT, { a: 0.35 * (1 - lo * 0.6), z0: 0.05 });
        solid(g, cam, RULER, V, LT, { edgeW: 2.5 });
        // vạch thước trên mặt trên
        for (let i = 1; i < 18; i++) { const s0 = xf([[i * 0.2 - 1.8, 0.17, 0.05], [i * 0.2 - 1.8, i % 5 ? 0.06 : -0.02, 0.05]], { ry: ang, at: [dx - 0.2, -1.05, z] });
          line(g, P(s0[0]), P(s0[1]), C.inkA(0.75), 1.6); }
        const e0 = xf([[-1.8, 0, 0]], { ry: ang, at: [dx - 0.2, -1.05, z] })[0], e1 = xf([[1.8, 0, 0]], { ry: ang, at: [dx - 0.2, -1.05, z] })[0];
        const kE = prog(t, T.both14, T.both14 + 0.3);
        dot3(g, cam, e0, { r: 9, k: kE }); dot3(g, cam, e1, { r: 9, k: kE });
        const q = P([dx - 0.2, -1.05, 0.06]);
        label(g, 'flat against it', q[0], q[1] + 96, { size: 24, color: C.ink, align: 'center', k: prog(t, T.flat14 - 0.3, T.flat14 + 0.4) });
      }
    }

    // ── (4) hai tờ bìa chung một điểm → chung cả một đường: giao tuyến ──
    if (t > T.r4 - 0.6 && t < T.look16 + 0.5) {
      const dx = slide(t, T.r4, T.look16), zP = 1.0;
      const kP = outCubic(prog(t, T.diff15 - 0.1, T.diff15 + 0.4)), kQ = outBack(prog(t, T.planes15 - 0.05, T.planes15 + 0.5));
      const Pc = quad([dx, 0, zP], [2.4 * kP, 0, 0], [0, 2.0 * kP, 0]);
      const qUp = 1.1 * kQ, qDn = 0.9 * kQ, X0 = dx - 2.0, X1 = dx + 2.0;
      const QU = [[X0, 0, zP], [X1, 0, zP], [X1, 0, zP + qUp], [X0, 0, zP + qUp]], QD = [[X0, 0, zP - qDn], [X1, 0, zP - qDn], [X1, 0, zP], [X0, 0, zP]];
      if (kP > 0) shadow(g, cam, Pc, LT, { a: 0.28 * kP });
      if (kQ > 0) { shadow(g, cam, [...QU, ...QD], LT, { a: 0.22 * kQ }); sheet(g, cam, QD, { thick: 0.03, k: clamp(kQ) }); }
      if (kP > 0) sheet(g, cam, Pc, { thick: 0.04, k: kP });
      if (kQ > 0) { g.save(); g.strokeStyle = C.inkA(0.5); g.lineWidth = 2.2; g.setLineDash([9, 9]); poly(g, QD.map(P)); g.stroke(); g.restore();
        sheet(g, cam, QU, { thick: 0.03, k: clamp(kQ) }); }
      const O = [dx - 0.5, 0, zP], kO = prog(t, T.point15, T.point15 + 0.3), kL = prog(t, T.whole15, T.line15 + 0.7);
      if (kL > 0) { thread(g, cam, O, [X0, 0, zP], { w: 7, k: kL }); thread(g, cam, O, [X1, 0, zP], { w: 7, k: kL }); }
      dot3(g, cam, O, { r: 11, k: kO });
      const pq = P(Pc[0]), qq = P(QU[3]), iq = P([X1, 0, zP]);
      if (kP > 0) it(g, 'P', pq[0] + 30, pq[1] - 14, 60, C.ink, { k: prog(t, T.diff15, T.diff15 + 0.4) });
      if (kQ > 0) it(g, 'Q', qq[0] + 18, qq[1] + 56, 60, C.ink, { k: prog(t, T.planes15, T.planes15 + 0.4) });
      label(g, 'intersection', iq[0] + 22, iq[1] + 10, { size: 24, color: C.ink, k: prog(t, T.inter15, T.inter15 + 0.6) });
    }

    // ── góc tường–trần của hộp-phòng (ROOM, thu nhỏ) ──
    if (t > T.look16 - 0.6) {
      const sc = 0.4, dx = 10 * (1 - outCubic(prog(t, T.look16 - 0.55, T.corner16 + 0.2))), at = [-ROOM.a * sc / 2 + dx, -ROOM.b * sc / 2, 0];
      const T3 = p => add(mul(p, sc), at);
      const cn = Object.values(ROOM.corners).map(T3);
      shadow(g, cam, cn, LT, { a: 0.3 });
      room(g, cam, { scale: sc, at });
      // tường trước mặt (tường sau của hộp) sáng lên ở "wall"
      const kW = prog(t, T.wall16, T.wall16 + 0.4);
      if (kW > 0) { g.save(); g.globalAlpha = 0.5 * kW; g.fillStyle = 'rgba(255,238,198,0.9)'; poly(g, ROOM.back.map(T3).map(P)); g.fill(); g.restore(); }
      // trần: tấm bìa bản lề ở mép trên tường, gập xuống ở "ceiling"
      const kC = prog(t, T.ceil16 - 0.25, T.ceil16 + 0.15), fold = smooth(prog(t, T.ceil16, T.ceil16 + 0.7)), depth = 2.6 * sc;
      if (kC > 0) {
        const [h0, h1] = ROOM.edges.wallCeiling.map(T3), a = (Math.PI / 2) * (1 - fold), dv = [0, -Math.cos(a) * depth, Math.sin(a) * depth * clamp(kC)];
        const CE = [h0, h1, add(h1, dv), add(h0, dv)];
        sheet(g, cam, CE, { thick: 0.03 });
      }
      // giao tuyến: nét mực dọc mép gấp, kéo dài nét đứt hai đầu (một ĐƯỜNG)
      const [e0, e1] = ROOM.edges.wallCeiling.map(T3), kE = prog(t, T.edge17 - 0.1, T.edge17 + 0.7);
      line(g, P(e0), P(e1), C.ink, 7, [], kE);
      line(g, P(e1), P(add(e1, [1.3, 0, 0])), C.inkA(0.7), 3, [8, 10], prog(t, T.inter17, T.inter17 + 0.5));
      line(g, P(e0), P(add(e0, [-0.5, 0, 0])), C.inkA(0.7), 3, [8, 10], prog(t, T.inter17, T.inter17 + 0.5));
      const m = P(lerp3(e0, e1, 0.5));
      label(g, 'intersection', m[0], m[1] - 40, { size: 26, color: C.ink, align: 'center', k: prog(t, T.inter17, T.inter17 + 0.6) });
      const wq = P(T3([ROOM.a * 0.7, ROOM.b, ROOM.c * 0.45])), cq = P(T3([ROOM.a * 0.3, ROOM.b - 2.6 * 0.5, ROOM.c]));
      label(g, 'wall', wq[0], wq[1], { size: 26, color: C.ink, align: 'center', k: prog(t, T.wall16, T.wall16 + 0.4) });
      label(g, 'ceiling', cq[0], cq[1] + 10, { size: 26, color: C.ink, align: 'center', k: prog(t, T.ceil16 + 0.3, T.ceil16 + 0.8) });
      if (t >= T.wall17 - 0.1) { line(g, [wq[0] - 40, wq[1] + 12], [wq[0] + 40, wq[1] + 12], C.ink, 3, [], prog(t, T.wall17, T.wall17 + 0.3)); }
      if (t >= T.ceil17 - 0.1) { line(g, [cq[0] - 66, cq[1] + 22], [cq[0] + 66, cq[1] + 22], C.ink, 3, [], prog(t, T.ceil17, T.ceil17 + 0.3)); }
    }

    // ── bốn thẻ luật bên trái ──
    const rs = [T.r1, T.r2, T.r3, T.r4];
    rs.forEach((r, i) => {
      const y = 250 + i * 84, kc = outBack(prog(t, this.FROM + 0.3 + 0.1 * i, this.FROM + 0.75 + 0.1 * i)), act = t >= r && (i === 3 || t < rs[i + 1]);
      if (kc <= 0) return;
      g.save(); g.translate(96, y); g.scale(1, kc);
      g.fillStyle = 'rgba(120,80,50,0.16)'; g.fillRect(6, -28, 56, 62);
      g.fillStyle = rgb(C.card); g.fillRect(0, -34, 56, 62); g.strokeStyle = act ? C.ink : C.inkA(0.5); g.lineWidth = act ? 3 : 2; g.strokeRect(0, -34, 56, 62);
      g.restore();
      it(g, `${i + 1}`, 124, y + 14, 44, act ? C.ink : C.lead, { align: 'center', k: kc });
      label(g, RULES[i], 178, y + 8, { size: 26, color: act ? C.ink : C.lead, k: prog(t, r, r + 0.9) });
    });

    sectionTag(g, 'Act I · four rules', prog(t, this.FROM + 0.3, this.FROM + 1));
    lamp(g, LAMP_X, LAMP_Y, { on: 1 });
  }
}

// ── hình học dựng một lần ──
const p0 = V => V[0] && Math.max(...V.map(v => v[2])) > 0.03;   // cục kê có cao không
// (2a) ba chấm
const P2 = [[-1.5, -0.5, 0.9], [1.3, -0.4, 1.5], [0.1, 1.0, 1.15]];
// ghế đẩu: đầu chân trên cục kê cao khác nhau; mặt ghế vuông góc pháp tuyến mặt phẳng ba đầu chân
const ST = (() => {
  const H0 = [0.0, 0.24, 0.1], tips = [90, 210, 330].map((a, i) => [0.85 * Math.cos(a * Math.PI / 180), 0.85 * Math.sin(a * Math.PI / 180), H0[i]]);
  const n0 = norm(cross3(sub(tips[1], tips[0]), sub(tips[2], tips[0]))), n = n0[2] < 0 ? mul(n0, -1) : n0, c = add(centroid(tips), mul(n, 1.55));
  const seat = SEAT.V.map(v => add(alignZ(v, n), c));
  const rims = [90, 210, 330].map(a => add(c, alignZ([0.48 * Math.cos(a * Math.PI / 180), 0.48 * Math.sin(a * Math.PI / 180), 0], n)));
  return { tips, seat, rims };
})();
// ghế bốn chân: tựa trên A, B, C (cục kê), chân D hở khỏi sàn; cập kênh = xoay quanh đường AC tới khi D chạm sàn
const CH = (() => {
  const xy = [[-0.62, -0.62], [0.62, -0.62], [0.62, 0.62], [-0.62, 0.62]], hz = [0.12, 0.0, 0.14];
  const A = [...xy[0], hz[0]], B = [...xy[1], hz[1]], Cc = [...xy[2], hz[2]], D = add(A, sub(Cc, B));
  const tips = [A, B, Cc, D], n0 = norm(cross3(sub(B, A), sub(Cc, A))), n = n0[2] < 0 ? mul(n0, -1) : n0;
  const tops = tips.map(p => add(p, mul(n, 1.3)));
  const sc = centroid(tops), seat = CSEAT.V.map(v => add(alignZ([v[0] - 0.7, v[1] - 0.7, v[2]], n), sc));
  const bk = [[-0.7, 0.7, 0.1], [0.7, 0.7, 0.1], [0.7, 0.7, 1.15], [-0.7, 0.7, 1.15]].map(v => add(alignZ(v, n), sc));
  const floor = [[...xy[0], hz[0]], [...xy[1], hz[1]], [...xy[2], hz[2]], [...xy[3], 0]];
  // góc cập kênh: D xuống chạm sàn (z = 0); chọn chiều xoay làm D đi xuống
  const zD = a => rotLine(D, A, Cc, a)[2];
  const sign = zD(0.05) < D[2] ? 1 : -1; let lo = 0, hi = 0.6;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; (zD(m * sign) > 0 ? lo = m : hi = m); }
  return { tips, tops, seat, back: bk, floor, sign, maxA: lo, gap: D[2] };
})();
// góc cập kênh theo thời gian: đổ sang chân D đúng "rocks", nảy lại tắt dần
function rockAngle(t, tr) {
  if (t < tr - 0.35) return 0;
  if (t < tr) { const u = prog(t, tr - 0.35, tr); return CH.maxA * u * u; }
  const s = t - tr; return CH.maxA * (1 - 0.55 * Math.abs(Math.sin(Math.PI * s / 0.75)) * Math.exp(-s * 1.4));
}
// chân máy ảnh
const TR = (() => {
  const H0 = [0.0, 0.2, 0.08], tips = [100, 220, 340].map((a, i) => [0.95 * Math.cos(a * Math.PI / 180), 0.95 * Math.sin(a * Math.PI / 180), H0[i]]);
  return { tips, head: [0, 0, 2.0] };
})();
