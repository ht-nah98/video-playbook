// b3 · Three ways to pin a plane — ba ô trên bàn: 3 chấm (không thẳng hàng) · đường + chấm ngoài · 2 đường cắt nhau;
// trên mỗi ô một tờ bìa lơ lửng, hạ xuống đặt khít lên đúng lúc lời gọi tên cách đó.
import { C, prog, lookup, must, outCubic, outBack, smooth, clamp, ground, pool, camLerp, sheet, thread, dot3, shadow,
  lamp, line, poly, it, label, sectionTag, quad, shadowPt, add, sub, mul, len, cross3 } from '../kit.js';

const LT = [1.5, 2.5, 9], LAMP_X = 1250, LAMP_Y = 150;
const CAM = { yaw: -10, pitch: 32, dist: 14.5, target: [0, 0, 0.6], cx: 1230, cy: 600 };
const SX = [-3.0, 0, 3.0], ZE = 0.75, NAMES = ['3 points', 'line + point', '2 crossing lines'];
// phần tử của từng ô (toạ độ tương đối tâm ô, z = ZE)
const D1 = [[-0.7, -0.4], [0.6, -0.3], [-0.1, 0.5]];
const L2 = [[-0.95, -0.45], [0.95, -0.1]], D2 = [0.05, 0.5];
const L3 = [[[-0.9, -0.5], [0.9, 0.5]], [[0.7, -0.6], [-0.7, 0.6]]];

function dotShadow(g, cam, p, k = 1) {
  if (k <= 0) return; const q = cam.P(shadowPt(p, LT));
  g.save(); g.fillStyle = `rgba(150,74,38,${0.22 * clamp(k)})`; g.beginPath(); g.ellipse(q[0], q[1], 11, 5, 0, 0, 7); g.fill(); g.restore();
}
function threadShadow(g, cam, a, b, k = 1) {
  if (k <= 0) return; line(g, cam.P(shadowPt(a, LT)), cam.P(shadowPt(b, LT)), 'rgba(150,74,38,0.2)', 6, [], k);
}
const at = (sx, [x, y]) => [sx + x, y, ZE];

export default class Pin {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      these: w(18, 'these'), three18: w(18, 'three'), plane18: w(18, 'plane'), place: w(18, 'place'),
      three19: w(19, 'three'), points19: w(19, 'points'), arent: w(19, "aren't"), line19: w(19, 'line'),
      line20: w(20, 'line'), point20: w(20, 'point'), isnt: w(20, "isn't"), it20: w(20, 'it'),
      two21: w(21, 'two'), lines21: w(21, 'lines'), cross21: w(21, 'cross'), other21: w(21, 'other'),
      end: L(21).end,
    };
    this.START = L(18).start;
    this.FROM = Math.max(this.START - 1.2, L(17).end + 0.5);
    const T = this.T;
    this.LAND = [T.line19, T.it20, T.other21];
    // ô 1: ba chấm không thẳng hàng (diện tích ≠ 0); ô 2: chấm nằm ngoài đường
    const ar = (a, b, c) => len(cross3(sub([...b, 0], [...a, 0]), sub([...c, 0], [...a, 0])));
    must(`${ar(D1[0], D1[1], D1[2]) > 0.3 ? 1 : 0}`, 1); must(`${ar(L2[0], L2[1], D2) > 0.3 ? 1 : 0}`, 1);
  }
  sfx() { return [{ t: this.LAND[0], kind: 'flap' }, { t: this.LAND[2], kind: 'snap' }]; }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const sway = 2.5 * Math.sin((t - S) * 0.15), cam = camLerp({ ...CAM, yaw: CAM.yaw + sway }, CAM, 0), P = cam.P;
    pool(g, 1250, 640, 860, 0.35);

    SX.forEach((sx, i) => {
      // ô: khung nét đứt trên bàn + số
      const kSl = outCubic(prog(t, this.FROM + 0.3 + 0.15 * i, this.FROM + 0.9 + 0.15 * i));
      const slot = quad([sx, 0, 0.005], [1.36 * kSl, 0, 0], [0, 1.0 * kSl, 0]).map(P);
      if (kSl > 0) { g.save(); g.strokeStyle = C.inkA(0.5); g.lineWidth = 2; g.setLineDash([8, 9]); poly(g, slot); g.stroke(); g.restore(); }
      const nq = P([sx - 1.36, -1.0, 0]);
      it(g, `${i + 1}`, nq[0] - 6, nq[1] + 50, 48, C.ink, { k: prog(t, T.three18 + 0.12 * i, T.three18 + 0.12 * i + 0.3) });
      const lq = P([sx, -1.05, 0]);
      label(g, NAMES[i], lq[0], lq[1] + 96, { size: 24, color: C.ink, align: 'center', k: prog(t, [T.three19, T.line20, T.two21][i], [T.line19, T.isnt, T.cross21][i]) });

      // phần tử
      const els = [];   // {draw, shadow}
      if (i === 0) D1.forEach((d, j) => { const p = at(sx, d), k = prog(t, T.three19 + 0.12 * j, T.three19 + 0.12 * j + 0.3);
        els.push({ sh: () => dotShadow(g, cam, p, k), dr: () => dot3(g, cam, p, { r: 11, k }) }); });
      if (i === 0) { const a = at(sx, D1[0]), b = at(sx, D1[1]), u = sub(b, a), k = prog(t, T.arent, T.line19);
        els.push({ sh: () => {}, dr: () => line(g, P(add(a, mul(u, -0.3))), P(add(a, mul(u, 1.3))), C.inkA(0.55), 2.5, [9, 9], k) }); }
      if (i === 1) { const a = at(sx, L2[0]), b = at(sx, L2[1]), p = at(sx, D2), kL = prog(t, T.line20 - 0.05, T.line20 + 0.4), kD = prog(t, T.point20, T.point20 + 0.3);
        els.push({ sh: () => { threadShadow(g, cam, a, b, kL); dotShadow(g, cam, p, kD); }, dr: () => { thread(g, cam, a, b, { w: 6, k: kL }); dot3(g, cam, p, { r: 11, k: kD }); } }); }
      if (i === 2) L3.forEach(([a0, b0], j) => { const a = at(sx, a0), b = at(sx, b0), k = prog(t, [T.two21, T.lines21][j], [T.two21, T.lines21][j] + 0.4);
        els.push({ sh: () => threadShadow(g, cam, a, b, k), dr: () => thread(g, cam, a, b, { w: 6, k }) }); });
      if (i === 2) { const o = at(sx, [0, 0]); els.push({ sh: () => {}, dr: () => dot3(g, cam, o, { r: 9, k: prog(t, T.cross21, T.cross21 + 0.3) }) }); }

      // tờ bìa: hiện lơ lửng ở "plane", hạ xuống khít đúng lúc gọi xong tên cách đó
      const kIn = outBack(prog(t, T.plane18 + 0.15 * i, T.plane18 + 0.15 * i + 0.5)), land = this.LAND[i];
      const u = prog(t, land - 0.45, land), z = ZE + 0.02 + 1.05 * (1 - u * u), landed = t >= land;
      const card = quad([sx, 0.02, z], [1.3 * clamp(kIn), 0, 0], [0, 0.95 * clamp(kIn), 0]);
      els.forEach(e => e.sh());
      if (kIn > 0) shadow(g, cam, card, LT, { a: (landed ? 0.26 : 0.16) * clamp(kIn) });
      if (!landed) els.forEach(e => e.dr());
      if (kIn > 0) sheet(g, cam, card, { thick: 0.03, alpha: landed ? 1 : 0.62 });
      if (landed) {
        els.forEach(e => e.dr());
        const kr = prog(t, land, land + 0.5);   // vòng "khít" nở ra quanh tờ bìa
        if (kr < 1) { const c = P([sx, 0.02, z]); g.save(); g.strokeStyle = C.inkA(0.6 * (1 - kr)); g.lineWidth = 3; g.beginPath(); g.ellipse(c[0], c[1], 150 + 60 * kr, 60 + 24 * kr, 0, 0, 7); g.stroke(); g.restore(); }
      }
    });

    it(g, 'three ways to pin a plane', 96, 250, 54, C.ink, { k: prog(t, T.these, T.place + 0.3) });
    label(g, 'each fixes exactly one', 96, 316, { size: 24, k: prog(t, T.plane18, T.place + 0.4) });
    sectionTag(g, 'Act I · three ways to pin a plane', prog(t, this.FROM + 0.3, this.FROM + 1));
    lamp(g, LAMP_X, LAMP_Y, { on: 1 });
  }
}
