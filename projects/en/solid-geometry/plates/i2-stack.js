// i2 · Stacking cubes — CĂN PHÒNG 12 × 4 × 3 xếp khối đơn vị: một khối "each one unit on a side", lớp đáy 12 × 4 = 48,
// 3 lớp → 144 (một tiếng chip mỗi lớp). Rồi phòng trượt ra, lăng trụ ngũ giác trượt vào: V = base area × height;
// "careful" → lăng trụ xiên: cạnh bên (xanh ngọc) ≠ cao; dây dọi từ đỉnh trên xuống mặt đáy; dải xé "HEIGHT = SIDE EDGE".
import { C, prog, lookup, must, outCubic, smooth, ground, pool, camLerp, room, ROOM, shadow, solid, sheet, thread, dot3,
  rightMark, lamp, line, it, label, sectionTag, tornStrip, prism, ngon, add, mul, sub, dot, norm, cross3, centroid,
  poly, clamp, measure } from '../kit.js';

const LAMP = [4.5, -3.5, 16];
const CAM0 = { yaw: -6, pitch: 36, dist: 21, target: [6, 2, 1.1], cx: 1225, cy: 620 };
const CAM1 = { yaw: -16, pitch: 22, dist: 19.5, target: [6.6, 1.6, 2.0], cx: 1225, cy: 610 };
const PC = [5.6, 1.6], PR = 2.3, PH = 4, SHEAR = 2.3;      // lăng trụ ngũ giác: tâm đáy, bán kính, cao, độ xiên (theo x)
const BASE = ngon(5, PR).map(([x, y]) => [x + PC[0], y + PC[1]]);
const CUBE_PAPER = [238, 228, 208];
const FACES = [[[0, 1, 5, 4], [0, -1, 0]], [[1, 2, 6, 5], [1, 0, 0]], [[2, 3, 7, 6], [0, 1, 0]], [[3, 0, 4, 7], [-1, 0, 0]], [[4, 5, 6, 7], [0, 0, 1]]];
const UNIT = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];

/** Khối đơn vị bìa (chỉ mặt thấy; trong lưới xếp khít cạnh khuất không vẽ). Hàm cục bộ — đáng gom vào kit. */
function unitCube(g, cam, o, L) {
  const V = UNIT.map(v => add(o, v)), scr = V.map(cam.P);
  FACES.forEach(([f, N]) => {
    const c = centroid(f.map(i => V[i])); if (dot(N, sub(cam.pos, c)) <= 0) return;
    const lit = Math.max(0, dot(N, norm(sub(L, c)))), q = 0.8 + 0.26 * lit, pts = f.map(i => scr[i]);
    g.fillStyle = `rgb(${Math.min(255, CUBE_PAPER[0] * q)},${Math.min(255, CUBE_PAPER[1] * q ** 1.2)},${Math.min(255, CUBE_PAPER[2] * q ** 1.5)})`;
    poly(g, pts); g.fill(); g.strokeStyle = C.inkA(0.8); g.lineWidth = 1.6; g.lineJoin = 'round'; g.stroke();
  });
}

export default class Stack {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'i2');
    this.START = L(158).start;
    this.FROM = Math.max(this.START - 1.2, L(157).end + 0.5);
    const T = this.T = {
      vol158: w(158, 'volume'), len158: w(158, 'length'), wid158: w(158, 'width'), hgt158: w(158, 'height'), end158: L(158).end,
      little: w(159, 'little'), unit: w(159, 'unit'),
      bottom: w(160, 'bottom'), len160: w(160, 'length'), cubes160: w(160, 'cubes'), end160: L(160).end,
      hgt161: w(161, 'height'), layers: w(161, 'layers'), end161: L(161).end,
      multiply: w(162, 'multiply'), vol162: w(162, 'volume'),
      s163: L(163).start, prism: w(163, 'prism'), vol163: w(163, 'volume'), base163: w(163, 'base'), hgt163: w(163, 'height'),
      careful: w(164, 'careful'), dist: w(164, 'distance'), planes: w(164, 'planes'), bases: w(164, 'bases'), end164: L(164).end,
      slanted: w(165, 'slanted'), not: w(165, 'not'), side: w(165, 'side'), edge: w(165, 'edge'), end: L(165).end,
    };
    // lớp: [bắt đầu, xong] — lớp 1 ở "bottom … cubes", lớp 2–3 trong câu 161
    this.LAYER = [[T.bottom, T.cubes160 + 0.35], [T.hgt161 - 0.1, T.layers + 0.05], [T.layers + 0.1, Math.max(T.end161 + 0.35, T.layers + 0.9)]];
    // thứ tự rơi trong lớp: sau → trước, trái → phải; khối (0,0) của lớp 1 rơi riêng ở "little"
    this.ORDER = [];
    for (let j = ROOM.b - 1; j >= 0; j--) for (let i = 0; i < ROOM.a; i++) this.ORDER.push([i, j]);
    this.N1 = ROOM.a * ROOM.b;
    this.nums = {
      layer: must(`${ROOM.a} × ${ROOM.b}`, 48), all: must(`${ROOM.a * ROOM.b} × ${ROOM.c}`, 144),
      vol: must(`${ROOM.a} × ${ROOM.b} × ${ROOM.c}`, 144),
    };
    const T0 = this.T;
    this.DROP = this.LAYER.map(([a, b], l) => {
      const ord = l === 0 ? this.ORDER.filter(([x, y]) => x || y) : this.ORDER, D = [...Array(ROOM.b)].map(() => Array(ROOM.a));
      ord.forEach(([x, y], r) => { D[y][x] = a + (b - a - 0.3) * r / (ord.length - 1); });
      if (l === 0) D[0][0] = T0.little;
      return D;
    });
    // số khối thực sự xếp = 144 (đếm lưới)
    must(`${this.ORDER.length * ROOM.c}`, 144);
  }
  sfx() {
    const T = this.T, L = this.LAYER;
    return [{ t: this.START + 0.1, kind: 'flap' }, { t: T.len158, kind: 'pen' },
      ...L.map(([, b]) => ({ t: b - 0.05, kind: 'chip' })),
      { t: T.multiply + 0.1, kind: 'pen' }, { t: T.prism, kind: 'flap' }, { t: T.careful + 0.2, kind: 'pen' }, { t: T.not, kind: 'tear' }];
  }
  /** Thời điểm khối (i, j, lớp l) bắt đầu rơi — dựng sẵn một lần. */
  drop(i, j, l) { return this.DROP[l][j][i]; }
  render(g, t) {
    const T = this.T;
    ground(g);
    // đổi vật: phòng trượt ra trái, lăng trụ trượt vào từ phải (đèn, camera của cảnh giữ nguyên; camera hạ nhẹ)
    const sw = prog(t, T.s163 - 0.3, T.prism + 0.1), out = sw * sw, inn = outCubic(sw);
    const uc = smooth(sw), drift = Math.min(Math.max(0, t - this.FROM) * 0.12, 3.5);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAM1, yaw: CAM1.yaw + drift }, uc), P = cam.P;
    const roomDX = -30 * out, prDX = 30 * (1 - inn);
    pool(g, P([6, 2, 0])[0], P([6, 2, 0])[1] - 60, 760, 0.5);

    // ── căn phòng + khối đơn vị ──
    if (roomDX > -29) {
      const kR = outCubic(prog(t, this.FROM + 0.3, this.START + 0.4)), s = 0.86 + 0.14 * kR, at = [6 * (1 - s) + roomDX, 2 * (1 - s), 0];
      const RC = Object.values(ROOM.corners).map(p => add(mul(p, s), at));
      shadow(g, cam, RC, LAMP, { a: 0.38 * kR });
      room(g, cam, { k: kR, scale: s, at });
      const cubes = [];
      for (let l = 0; l < ROOM.c; l++) for (let j = 0; j < ROOM.b; j++) for (let i = 0; i < ROOM.a; i++) {
        const t0 = this.drop(i, j, l); if (t < t0) continue;
        const z = l + 1.4 * (1 - outCubic(prog(t, t0, t0 + 0.3)));
        cubes.push([i + roomDX, j, z]);
      }
      cubes.map(o => { const q = sub(add(o, [0.5, 0.5, 0.5]), cam.pos); return { o, d: dot(q, q) }; }).sort((a, b) => b.d - a.d).forEach(({ o }) => unitCube(g, cam, o, LAMP));
      // ba kích thước: kẻ đậm cạnh + số, theo từ "length / width / height"
      const E = (a, b, tw) => thread(g, cam, add(a, [roomDX, 0, 0]), add(b, [roomDX, 0, 0]), { w: 6, k: prog(t, tw, tw + 0.45) });
      const c = ROOM.corners;
      E(c.lf0, c.rf0, T.len158); E(c.rf1, c.rb1, T.wid158); E(c.rf0, c.rf1, T.hgt158);
      const mL = P(add([ROOM.a / 2, 0, 0], [roomDX, 0, 0])), mW = P(add([ROOM.a, ROOM.b / 2, ROOM.c], [roomDX, 0, 0])), mH = P(add([ROOM.a, 0, ROOM.c / 2], [roomDX, 0, 0]));
      it(g, `${ROOM.a}`, mL[0], mL[1] + 58, 54, C.ink, { align: 'center', k: prog(t, T.len158, T.len158 + 0.4) });
      it(g, `${ROOM.b}`, mW[0] + 26, mW[1] - 10, 54, C.ink, { k: prog(t, T.wid158, T.wid158 + 0.4) });
      it(g, `${ROOM.c}`, mH[0] + 22, mH[1] + 18, 54, C.ink, { k: prog(t, T.hgt158, T.hgt158 + 0.4) });
      // khối đầu tiên: "each one unit on a side"
      const u1 = P([0.5 + roomDX, 0, 0]);
      it(g, '1', u1[0], u1[1] + 50, 44, C.tealT, { align: 'center', k: prog(t, T.unit, T.unit + 0.3) });
    }

    // ── lăng trụ (đứng → xiên ở "careful") ──
    if (prDX < 29) {
      const kP = prog(t, T.prism - 0.6, T.prism + 0.3);
      const sh = SHEAR * smooth(prog(t, T.careful, T.careful + 0.9)), dir = [sh, 0, PH];
      const base = BASE.map(([x, y]) => [x + prDX, y]), m = prism(base, dir), V = m.V;
      // mặt phẳng đáy (tờ bìa lăng trụ đứng trên) — rộng hơn đáy để chân dây dọi rơi trên nó
      const x0 = PC[0] - PR - 0.9 + prDX, x1 = PC[0] + PR + SHEAR + 1.0 + prDX, y0 = PC[1] - PR - 0.5, y1 = PC[1] + PR + 0.4;
      const bottom = [[x0, y0, 0.001], [x1, y0, 0.001], [x1, y1, 0.001], [x0, y1, 0.001]];
      sheet(g, cam, bottom, { k: kP, thick: 0.05 });
      shadow(g, cam, V, LAMP, { a: 0.42 * kP, z0: 0.002 });
      solid(g, cam, m, V, LAMP, { k: kP });
      // "area of the base": tô mặt đáy trên (cũng là một đáy)
      const top = V.slice(5).map(P);
      const kB = prog(t, T.base163, T.base163 + 0.5);
      if (kB > 0) { g.save(); g.globalAlpha = kB; g.fillStyle = C.inkA(0.14); poly(g, top); g.fill(); g.restore();
        const ct = P(centroid(V.slice(5)));
        it(g, 'base', ct[0], ct[1] + 14, 44, C.ink, { align: 'center', k: kB }); }
      // cạnh bên (xanh ngọc) từ đỉnh đáy 0 lên đỉnh trên 5
      const vA = V[0], vT = V[5], kE = prog(t, T.careful + 0.1, T.careful + 0.6);
      thread(g, cam, vA, vT, { color: rgbT(), w: 6, k: kE });
      // dây dọi: từ đỉnh trên thẳng xuống mặt đáy (đứng → trùng cạnh bên; xiên → rời ra)
      const foot = [vT[0], vT[1], 0], kH = prog(t, T.hgt163, T.hgt163 + 0.6);
      const pT = P(vT), pF = P(foot);
      if (kH > 0) {
        line(g, pT, pF, C.ink, 3, [], kH);
        if (kH >= 1) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.moveTo(pF[0], pF[1] - 4); g.lineTo(pF[0] - 10, pF[1] - 30); g.lineTo(pF[0] + 10, pF[1] - 30); g.closePath(); g.fill(); g.restore(); }
        rightMark(g, cam, foot, [0, 0, 1], [-1, 0, 0], 0.4, { k: prog(t, T.dist, T.dist + 0.4) });
        const mid = [(pT[0] + pF[0]) / 2, (pT[1] + pF[1]) / 2];
        it(g, 'h', mid[0] + 22, mid[1] + 14, 60, C.ink, { k: kH });
      }
      // mặt phẳng của đáy trên: viền đứt + phủ nhạt, ở "planes"
      const kPl = prog(t, T.planes - 0.2, T.planes + 0.5);
      if (kPl > 0) {
        const tp = bottom.map(p => P([p[0] + 0, p[1], PH]));
        g.save(); g.globalAlpha = kPl; g.fillStyle = 'rgba(251,246,236,0.16)'; poly(g, tp); g.fill();
        g.strokeStyle = C.inkA(0.6); g.lineWidth = 2.5; g.setLineDash([12, 10]); poly(g, tp); g.stroke(); g.restore();
      }
    }

    lamp(g, P([LAMP[0], LAMP[1], 5])[0], 150);

    // ── cột chữ trái: phần phòng trượt ra cùng phòng ──
    sectionTag(g, 'Act VIII · volume', prog(t, this.FROM + 0.3, this.FROM + 1));
    g.save(); g.translate(-900 * out, 0);
    it(g, 'V = length × width × height', 96, 250, 60, C.ink, { k: prog(t, T.vol158, T.hgt158 + 0.35) });
    it(g, `= ${ROOM.a} × ${ROOM.b} × ${ROOM.c} = ${this.nums.vol}`, 132, 330, 60, C.ink, { k: prog(t, T.vol162, T.vol162 + 0.8) });
    label(g, 'bottom layer', 96, 470, { size: 24, k: prog(t, T.bottom, T.bottom + 0.4) });
    it(g, `${ROOM.a} × ${ROOM.b} = ${this.nums.layer}`, 96, 540, 60, C.ink, { k: prog(t, T.len160, T.cubes160 + 0.3) });
    label(g, 'layers', 96, 620, { size: 24, k: prog(t, T.hgt161, T.hgt161 + 0.3) });
    it(g, `× ${ROOM.c}`, 96, 690, 60, C.ink, { k: prog(t, T.layers, T.layers + 0.3) });
    it(g, `${this.nums.layer} × ${ROOM.c} = ${this.nums.all}`, 96, 790, 60, C.ink, { k: prog(t, T.multiply, T.multiply + 0.8) });
    g.restore();

    // ── phần lăng trụ ──
    it(g, 'V = base area × height', 96, 250, 60, C.ink, { k: prog(t, T.vol163, T.hgt163 + 0.3) });
    const wrong = 'height = side edge', kW = prog(t, T.careful + 0.1, T.careful + 0.7);
    label(g, wrong, 96, 400, { size: 28, color: C.ink, k: kW });
    if (kW >= 1) { const wd = measure(g, wrong.toUpperCase(), '500 28px "IBM Plex Mono"') + wrong.length * 3;
      tornStrip(g, 84, 400, 96 + wd + 14, 378, outCubic(prog(t, T.not - 0.05, T.not + 0.4)), { seed: 8 }); }
    it(g, 'height = distance between', 96, 500, 54, C.ink, { k: prog(t, T.dist - 0.2, T.planes) });
    it(g, 'the two base planes', 96, 562, 54, C.ink, { k: prog(t, T.planes - 0.1, T.bases + 0.3) });
    it(g, 'slanted: the side edge is longer', 96, 660, 40, C.tealT, { wt: 500, k: prog(t, T.slanted, T.edge + 0.3) });
  }
}
function rgbT() { return `rgb(${C.teal.join(',')})`; }
