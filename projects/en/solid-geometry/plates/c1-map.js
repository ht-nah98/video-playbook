// c1 · The map — MỞ HỒI II "Where things can be". Thẻ hồi (đèn chớp), rồi chấm · chỉ · tờ bìa ("points, lines, planes")
// đứng trên bàn; "how can they sit" → chúng trượt đi, tấm BẢN ĐỒ gấp ba nếp mở ra: ba cột LINE–LINE · LINE–PLANE ·
// PLANE–PLANE, ba hàng CROSS · PARALLEL · (SKEW / INSIDE). "the map for everything that comes after" → các ô vẽ vào.
// drawMap + MAPCAM được c4-planes import lại: quay về bản đồ thì vẽ Y NHƯ ở đây.
import { W, H, C, prog, lookup, outCubic, smooth, ground, camera, sheet, sheetShadow, thread, dot3, shadow, lamp, line, it,
  label, actCard, dark, sectionTag, add, mul, box, rest, solid } from '../kit.js';

// ── bản đồ: 3 tấm (cột) PW × PD, nằm trên bàn, tâm ở gốc ──
const PW = 3.1, PD = 4.3, X0 = -1.5 * PW, Y0 = -PD / 2;
export const MAPCAM = { yaw: -6, pitch: 54, dist: 16.2, target: [0, 0.1, 0], cx: 1200, cy: 640 };
export const MAP_L = [1.0, 2.5, 9];
const HEAD = ['line – line', 'line – plane', 'plane – plane'];
export const ROWS = ['cross', 'parallel', 'other'];
const ROWY = [1.05, -0.2, -1.45]; // tâm hàng (y thế giới)
// ô: [cột][hàng] → { word, strokes: [[u0,v0,u1,v1, dash?]…] } trong hệ toạ độ ô (u ngang, v sâu, đơn vị thế giới)
const pg = (cu, cv, w, h, sk) => { const a = [cu - w + sk, cv + h], b = [cu + w + sk, cv + h], c = [cu + w - sk, cv - h], d = [cu - w - sk, cv - h];
  return [[...a, ...b], [...b, ...c], [...c, ...d], [...d, ...a]]; };
const CELLS = [
  [{ word: 'cross', s: [[-0.55, -0.35, 0.35, 0.35], [-0.55, 0.35, 0.35, -0.35]] },
   { word: 'parallel', s: [[-0.6, 0.18, 0.4, 0.42], [-0.6, -0.32, 0.4, -0.08]] },
   { word: 'skew', s: [[-0.6, 0.0, -0.18, 0.0], [-0.02, 0.0, 0.4, 0.0], [-0.1, 0.42, -0.1, -0.42]] }],
  [{ word: 'cuts', s: [...pg(-0.1, -0.05, 0.42, 0.22, 0.12), [-0.1, 0.5, -0.1, 0.1], [-0.1, 0.1, -0.1, -0.2, true], [-0.1, -0.27, -0.1, -0.5]] },
   { word: 'parallel', s: [...pg(-0.1, -0.15, 0.42, 0.2, 0.12), [-0.55, 0.42, 0.35, 0.42]] },
   { word: 'inside', s: [...pg(-0.1, 0, 0.42, 0.26, 0.12), [-0.4, -0.08, 0.2, 0.1]] }],
  [{ word: 'cross', s: [...pg(-0.1, 0, 0.45, 0.16, 0.12), [-0.1, 0.45, -0.1, 0.16], [-0.1, 0.16, -0.1, -0.16, true], [-0.1, -0.16, -0.1, -0.45], [-0.3, 0.45, 0.1, 0.45], [-0.3, -0.45, 0.1, -0.45], [-0.3, 0.45, -0.3, 0.16], [0.1, 0.45, 0.1, 0.16], [-0.3, -0.16, -0.3, -0.45], [0.1, -0.16, 0.1, -0.45]] },
   { word: 'parallel', s: [...pg(-0.1, 0.24, 0.42, 0.14, 0.1), ...pg(-0.1, -0.24, 0.42, 0.14, 0.1)] },
   null],
];
/** Ô (cột c, hàng r) của bản đồ phẳng: tâm thế giới. */
export const cellAt = (c, r) => [X0 + PW * (c + 0.5), ROWY[r], 0];

/** Ba tấm theo độ mở: u1, u2 ∈ [0,1] (0 = gấp chồng lên tấm 1, 1 = phẳng). Trả về 3 tấm (4 góc) + lớp nâng. */
function panels(u1, u2, lift = 0) {
  const d = a => [Math.cos(a), 0, Math.sin(a)];
  const H1 = [X0 + PW, 0, 0], a1 = Math.PI * (1 - u1), E1 = add(H1, mul(d(a1), PW)), a2 = a1 - Math.PI * (1 - u2);
  const quadAlong = (p, q, dz) => [[p[0], Y0, p[2] + dz], [q[0], Y0, q[2] + dz], [q[0], Y0 + PD, q[2] + dz], [p[0], Y0 + PD, p[2] + dz]];
  const z1 = 0.03 * (1 - u1), z2 = 0.06 * (1 - u2 * u1);
  return [quadAlong([X0, 0, 0], H1, 0), quadAlong(H1, E1, z1), quadAlong(E1, add(E1, mul(d(a2), PW)), z2)]
    .map(q => q.map(p => [p[0], p[1], p[2] + lift]));
}

/**
 * Vẽ bản đồ. o.u1/o.u2 = độ mở; o.kHead viết tiêu đề cột; o.kCells ∈ [0,1] vẽ lần lượt 8 ô; o.hl = {hàng: k} tô sáng hàng;
 * o.lift nhấc khỏi bàn (trượt vào/ra dùng g.translate ngoài). Trả về toạ độ màn hình góc trên-trái/ dưới để đặt chữ.
 */
export function drawMap(g, cam, { u1 = 1, u2 = 1, kHead = 1, kCells = 1, hl = {}, k = 1 } = {}) {
  if (k <= 0) return;
  const P = cam.P, pans = panels(u1, u2);
  pans.forEach(q => sheetShadow(g, cam, q, { a: 0.18, z0: 0 }));
  pans.map((q, i) => ({ q, i, z: P(q.reduce((s, p) => add(s, mul(p, 0.25)), [0, 0, 0]))[2] })).sort((a, b) => b.z - a.z)
    .forEach(({ q }) => sheet(g, cam, q, { thick: 0.04 }));
  if (u1 < 1 || u2 < 1) return;
  // nếp gấp (mép giữa hai tấm) — nét chì mảnh
  [1, 2].forEach(c => line(g, P([X0 + PW * c, Y0, 0]), P([X0 + PW * c, Y0 + PD, 0]), C.inkA(0.35), 2, [6, 8]));
  // hàng sáng (DNA: quầng đèn) — tô dưới nét
  ROWS.forEach((name, r) => { const kk = hl[name] ?? 0; if (kk <= 0) return;
    const y0 = ROWY[r] - 0.58, y1 = ROWY[r] + 0.58, x0 = X0 + 0.12, x1 = X0 + 3 * PW - 0.12;
    const pts = [[x0, y0, 0], [x0 + (x1 - x0) * kk, y0, 0], [x0 + (x1 - x0) * kk, y1, 0], [x0, y1, 0]].map(P);
    g.save(); g.fillStyle = 'rgba(255,214,140,0.55)'; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill();
    g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke(); g.restore(); });
  // tiêu đề cột: nhãn phẳng ngay trên mép xa của cột
  HEAD.forEach((s, c) => { const q = P([X0 + PW * (c + 0.5), Y0 + PD, 0]);
    label(g, s, q[0], q[1] - 22, { size: 28, color: C.ink, align: 'center', k: prog(kHead, c * 0.25, c * 0.25 + 0.5) }); });
  // ô: hình vẽ mực trên giấy (chiếu theo mặt bản đồ) + chữ phẳng bên phải hình
  let n = 0;
  CELLS.forEach((col, c) => col.forEach((cell, r) => { if (!cell) return; const i = n++, kk = prog(kCells, i / 8, (i + 1) / 8);
    if (kk <= 0) return; const [cx, cy] = cellAt(c, r), ox = cx - 0.62;
    cell.s.forEach(([u0, v0, u1_, v1, dash]) => line(g, P([ox + u0, cy + v0, 0]), P([ox + u1_, cy + v1, 0]), C.ink, 3.2, dash ? [5, 6] : [], Math.min(1, kk * 1.6)));
    const q = P([ox + 0.55, cy, 0]); label(g, cell.word, q[0] + 8, q[1] + 10, { size: 28, color: C.ink, k: prog(kk, 0.35, 1) });
  }));
}

export default class Map {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      points: w(22, 'points'), lines: w(22, 'lines'), planes: w(22, 'planes'), how: w(22, 'how'), sit: w(22, 'sit'),
      relative: w(22, 'relative'), dry: w(23, 'dry'), map: w(23, 'map'), every: w(23, 'everything'), after: w(23, 'after'),
    };
    this.START = L(22).start;
    this.FROM = Math.max(this.START - 2.6, L(21).end + 0.5);
    // thẻ hồi: đèn chớp 0.3 s — START − 2.4 rơi trước FROM (cảnh trước kết muộn) → chớp ngay sau khi tờ mới vào
    this.FLASH = Math.max(this.START - 2.4, this.FROM + 0.35);
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FLASH + 0.1, kind: 'shimmer' }, { t: T.how + 0.2, kind: 'flap' }, { t: T.every, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    // camera: hạ dần về MAPCAM khi bản đồ mở, rồi trôi chậm (≤ 1.2°/s)
    const kc = smooth(prog(t, T.how, T.relative + 0.6)), drift = Math.max(0, t - T.relative) * 1.0;
    const cam = camera({ ...MAPCAM, yaw: MAPCAM.yaw - 10 * (1 - kc) + drift, pitch: MAPCAM.pitch - 8 * (1 - kc), dist: MAPCAM.dist + 1.2 * (1 - kc) });
    const P = cam.P;
    const on = 1 - 0.85 * Math.max(0, 1 - Math.abs(t - this.FLASH) / 0.15);
    lamp(g, 1290, 150, { on }); // quầng đèn vẽ trước: không phủ lên chữ

    // ba vật "points, lines, planes" đứng bên phải trên bàn; "how" → trượt đi (sang phải, ra khỏi khung)
    const out = outCubic(prog(t, T.how, T.how + 0.8)) * 7;
    const kP = prog(t, T.points, T.points + 0.3), kL = prog(t, T.lines, T.lines + 0.5), kQ = outCubic(prog(t, T.planes, T.planes + 0.6));
    if (out < 7) {
      const ox = out;
      const cardC = [[1.6 + ox, -0.8, 0.6], [3.6 + ox, -0.8, 0.6], [3.6 + ox, 0.9, 0.6], [1.6 + ox, 0.9, 0.6]];
      if (kQ > 0) { const cc = cardC.map(p => [2.6 + ox + (p[0] - 2.6 - ox) * kQ, p[1] * kQ, 0.6]);
        sheetShadow(g, cam, cc.map(p => [p[0], p[1], 0]), { a: 0.2 * kQ }); sheet(g, cam, cc, { k: kQ }); }
      if (kL > 0) { const a = [-1.3 + ox, -1.0, 0.5], b = [0.9 + ox, 1.0, 0.5];
        line(g, P([a[0] + 0.25, a[1] + 0.2, 0]), P([a[0] + 0.25 + (b[0] - a[0]) * kL, a[1] + 0.2 + (b[1] - a[1]) * kL, 0]), C.terraA(0.22), 7);
        thread(g, cam, a, b, { w: 6, k: kL }); }
      if (kP > 0) { dot3(g, cam, [-3.0 + ox, 0.1, 0], { r: 11, k: kP }); }
      const lab = (s, p, k) => { const q = P(p); label(g, s, q[0], q[1] + 56, { size: 28, color: C.ink, align: 'center', k }); };
      lab('point', [-3.0 + ox, 0.1, 0], prog(t, T.points, T.points + 0.4));
      lab('line', [-0.2 + ox, -0.4, 0.5], prog(t, T.lines, T.lines + 0.4));
      lab('plane', [2.6 + ox, -0.9, 0.6], prog(t, T.planes, T.planes + 0.4));
    }

    // bản đồ: trượt vào từ trái lúc vật đi, mở ba nếp ở "sit … relative"
    const kin = outCubic(prog(t, T.how - 0.1, T.how + 0.6));
    if (kin > 0) {
      g.save(); g.translate(-(1 - kin) * 900, 0);
      drawMap(g, cam, { u1: outCubic(prog(t, T.sit - 0.2, T.relative + 0.4)), u2: outCubic(prog(t, T.relative - 0.1, T.relative + 0.75)),
        kHead: prog(t, T.relative + 0.75, T.dry), kCells: prog(t, T.every - 0.1, T.after + 0.25) });
      g.restore();
    }

    // chữ: "the map" ở "map"
    sectionTag(g, 'Act II · the map', prog(t, S, S + 0.8));
    it(g, 'how can they sit?', 96, 250, 72, C.ink, { k: prog(t, T.how, T.relative + 0.4) });
    it(g, 'the map', 96, 340, 64, C.lead, { wt: 600, k: prog(t, T.map, T.map + 0.5) });

    // thẻ hồi II (không ANSWERS — DNA: chỉ hồi 1, 5, 8)
    actCard(g, t, S, 'ACT TWO', 'Where things can be');
    dark(g, on);
  }
}
