// Hồi 4 · "1637 — Descartes: coordinates" (SCRIPT.md) — giấy in, khắc đồng. Câu 89–99 của p2. MỞ HỒI.
//   89 thẻ hồi → thẻ mốc · chân dung Descartes (khắc) + trang La Géométrie
//   90 nét vạch nằm ngang thành trục x, chạy dài ra ("endless")
//   91–94 mascot chỉ; điểm (3, 4) → trục y → cặp số → đường tròn x² + y² = 25 (gạch chéo) → 12 điểm nguyên trên nó
//   95–96 hai nửa: compa Hy Lạp | cân al-jabr · al-muqabala (đại số Hồi giáo viết bằng LỜI — CONTENT §1) trượt khớp
//   97–98 hình → phép tính, phương trình → hình ·  99 nét nền dài, tiếp tuyến trên y = x²: cái Newton và Leibniz xây tiếp
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, photo, portrait, stamp, actTitle, lookup } from '../kit.js';

const E = ERA.paper;
const O = [560, 690], S = 52;                       // gốc toạ độ và 1 đơn vị (px)
const P = (x, y) => [O[0] + x * S, O[1] - y * S];
// mọi điểm nguyên trên x² + y² = 25 (tính, không gõ tay)
const LATTICE = [];
for (let x = -5; x <= 5; x++) for (let y = -5; y <= 5; y++) if (x * x + y * y === 25) LATTICE.push([x, y]);
LATTICE.sort((a, b) => Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]));
const ring = (cx, cy, r, a0 = 0, n = 96) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(a0 + i / n * Math.PI * 2), cy + r * Math.sin(a0 + i / n * Math.PI * 2)]);
// Euclid I.1: C tính từ A, B
const EA = [-100, 90], EB = [100, 90], ER = 200, EC = [0, 90 - ER * Math.sqrt(3) / 2];

function arrowHead(g, x, y, ang, color, s = 16) {
  g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = color; g.beginPath(); g.moveTo(0, 0); g.lineTo(-s, -s * 0.45); g.lineTo(-s, s * 0.45); g.fill(); g.restore();
}

export default class Descartes {
  static ERA = 'paper';
  static IMAGES = {
    descartes: './assets/history/Frans_Hals_-_Portret_van_René_Descartes.jpg',
    geometrie: './assets/history/GeometryDescartes.JPG',
  };
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      s89: L(89).start, descartes: w(89, 'descartes'), geom: w(89, 'géométrie'),
      idea: w(90, 'idea'), simple: w(90, 'simple'), consequences: w(90, 'consequences'), endless: w(90, 'endless'),
      here: L(91).start,
      point: w(92, 'point'), plane: w(92, 'plane'), pair: w(92, 'pair'), numbers: w(92, 'numbers'), x: w(92, 'x'), y: w(92, 'y'),
      circle: w(93, 'circle'), written: w(93, 'written'), equation: w(93, 'equation'), e93: L(93).end,
      round: w(94, 'round'), drawn: w(94, 'drawn'), shape2: w(94, 'shape'),
      s95: L(95).start, branches: w(95, 'branches'), apart: w(95, 'apart'), greeks: w(95, 'greeks'), algebra: w(95, 'algebra'), islamic: w(95, 'islamic'),
      one: w(96, 'one'), language: w(96, 'language'), analytic: w(96, 'analytic'),
      s97: L(97).start, changed: w(97, 'changed'),
      geometry2: w(98, 'geometry'), calculation: w(98, 'calculation'), algebra2: w(98, 'algebra'), picture: w(98, 'picture'),
      foundation: w(99, 'foundation'), newton: w(99, 'newton'), leibniz: w(99, 'leibniz'), calculus: w(99, 'calculus'), decades: w(99, 'decades'),
    };
    this.START = this.T.s89;
    this.FROM = this.START - 2.3;
    this.WIPE = O;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');
    actTitle(g, 'paper', t, this.START, 'ACT FOUR', 'The language of change');
    card(g, 'paper', prog(t, T.s89 - 0.2, T.s89 + 1.6), 'ACT FOUR · THE LANGUAGE OF CHANGE', '1637', 'Descartes, La Géométrie');
    ruler(g, 'paper', 1637, prog(t, T.s89 + 0.3, T.s89 + 1.3));

    // ── chân dung + trang sách: vào khi tên được đọc, trượt ra phải ở "consequences" ──
    const pOut = outCubic(prog(t, T.consequences - 0.1, T.consequences + 0.5));
    if (t >= T.descartes - 0.2 && pOut < 1) {
      g.save(); g.translate(pOut * 1000, 0);
      photo(g, 'geometrie', 'paper', 1450, 410, 340, prog(t, T.geom - 0.1, T.geom + 0.4), { rot: 0.035 });
      typed(g, 'LA GÉOMÉTRIE, 1637', 1452, 812, prog(t, T.geom + 0.3, T.geom + 0.9), '500 18px "IBM Plex Mono"', E.dim);
      portrait(g, 'descartes', 'paper', 1000, 360, 440, prog(t, T.descartes - 0.2, T.descartes + 0.4),
        { style: 'engrave', rot: -0.015, label: { name: 'René Descartes', life: '1596–1650', note: 'PORTRAIT AFTER FRANS HALS' } });
      g.restore();
    }

    // ── phần 1: hệ toạ độ, xây từng từ (khung phong cách frameEngrave) ──
    const aOut = outCubic(prog(t, T.s95 - 0.25, T.s95 + 0.45));
    if (t >= T.idea - 0.1 && aOut < 1) {
      g.save(); g.translate(-aOut * 1600, 0);
      // trục x: nét vạch ngắn ở "idea", kéo dài ra hai phía ở "endless"
      const kx = prog(t, T.idea - 0.1, T.simple + 0.2), ke = outCubic(prog(t, T.endless - 0.1, T.endless + 0.6));
      const xl = 200 + 230 * ke, xr = 200 + 160 * ke;
      hand(g, seg(O[0] - xl, O[1], O[0] + xr, O[1], 40), { w: 3, color: E.ink, jit: 0.8, seed: 11, k: kx });
      if (ke > 0) { arrowHead(g, O[0] + xr + 6, O[1], 0, E.ink); arrowHead(g, O[0] - xl - 6, O[1], Math.PI, E.ink); }
      for (let i = -5; i <= 5; i++) if (i && Math.abs(i * S) < (i < 0 ? xl : xr) - 10 && kx >= 1) {
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 2; g.beginPath(); g.moveTo(O[0] + i * S, O[1] - 8); g.lineTo(O[0] + i * S, O[1] + 8); g.stroke(); g.restore(); }
      // trục y ở "plane"
      const ky = prog(t, T.plane - 0.15, T.plane + 0.45);
      hand(g, seg(O[0], O[1] + 300, O[0], O[1] - 330, 40), { w: 3, color: E.ink, jit: 0.8, seed: 12, k: ky });
      if (ky >= 1) { arrowHead(g, O[0], O[1] - 336, -Math.PI / 2, E.ink);
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 2; for (let i = -5; i <= 5; i++) if (i) { g.beginPath(); g.moveTo(O[0] - 8, O[1] - i * S); g.lineTo(O[0] + 8, O[1] - i * S); g.stroke(); } g.restore(); }
      typed(g, 'x', O[0] + 400, O[1] + 14, prog(t, T.x, T.x + 0.15), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, 'y', O[0] + 18, O[1] - 314, prog(t, T.y, T.y + 0.15), 'italic 600 44px "Cormorant Garamond"', E.ink);

      // đường tròn bán kính 5 qua (3, 4): nét vẽ từ chính điểm đó, gạch chéo khắc theo sau
      const p = P(3, 4), a0 = Math.atan2(p[1] - O[1], p[0] - O[0]);
      const kc = prog(t, T.circle - 0.1, T.written + 0.2), kh = prog(t, T.circle + 0.2, T.equation + 0.3);
      if (kh > 0) {
        g.save(); g.beginPath(); g.moveTo(O[0], O[1]); g.arc(O[0], O[1], 5 * S + 4, a0, a0 + kh * Math.PI * 2); g.closePath(); g.clip();
        g.beginPath(); g.arc(O[0], O[1], 5 * S, 0, 7); g.clip();
        g.strokeStyle = E.ink; g.lineWidth = 1.4;
        for (let k = -560; k < 560; k += 9) { g.beginPath(); g.moveTo(O[0] + k - 300, O[1] - 300); g.lineTo(O[0] + k + 300, O[1] + 300); g.stroke(); }
        g.restore();
        // trục vẽ lại phía trên lớp gạch cho rõ
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(O[0] - 5 * S, O[1]); g.lineTo(O[0] + 5 * S, O[1]); g.moveTo(O[0], O[1] - 5 * S); g.lineTo(O[0], O[1] + 5 * S); g.stroke(); g.restore();
      }
      hand(g, ring(O[0], O[1], 5 * S, a0, 120), { w: 5, color: E.ink, jit: 0.8, seed: 13, k: kc });

      // cặp số (3, 4): gióng xuống hai trục ở "pair"
      const kp = prog(t, T.pair - 0.05, T.numbers + 0.2);
      if (kp > 0) {
        g.save(); g.setLineDash([8, 8]); g.strokeStyle = E.ink; g.lineWidth = 2; g.beginPath();
        const d1 = Math.min(1, kp * 2), d2 = clamp(kp * 2 - 1);
        g.moveTo(p[0], p[1]); g.lineTo(p[0], p[1] + (O[1] - p[1]) * d1);
        if (d2 > 0) { g.moveTo(p[0], p[1]); g.lineTo(p[0] + (O[0] - p[0]) * d2, p[1]); }
        g.stroke(); g.restore();
      }
      const kn = prog(t, T.numbers - 0.1, T.numbers + 0.1);
      if (kn > 0) { g.save(); g.fillStyle = E.bg; g.fillRect(p[0] - 14, O[1] + 22, 28, 30); g.fillRect(O[0] - 42, p[1] - 14, 28, 30); g.restore(); }
      typed(g, '3', p[0], O[1] + 44, prog(t, T.numbers - 0.1, T.numbers + 0.1), '500 24px "IBM Plex Mono"', E.accent, { align: 'center' });
      typed(g, '4', O[0] - 22, p[1] + 8, prog(t, T.numbers + 0.1, T.numbers + 0.3), '500 24px "IBM Plex Mono"', E.accent, { align: 'right' });
      // 12 điểm nguyên khác trên đường tròn ("an equation can be drawn as a shape")
      LATTICE.forEach(([x, y], i) => { if (x === 3 && y === 4) return; const a = T.drawn + i * 0.07, k = prog(t, a, a + 0.18); if (k <= 0) return;
        const q = P(x, y); g.save(); g.fillStyle = E.ink; g.beginPath(); g.arc(q[0], q[1], 7 * outBack(k), 0, 7); g.fill(); g.restore(); });
      // điểm (3, 4): cái MỚI — màu nhấn
      const kd = prog(t, T.point - 0.05, T.point + 0.2);
      if (kd > 0) {
        g.save(); g.fillStyle = E.accent; g.beginPath(); g.arc(p[0], p[1], 11 * outBack(kd), 0, 7); g.fill(); g.restore();
      }
      typed(g, '(3, 4)', p[0] + 22, p[1] - 16, prog(t, T.numbers, T.y + 0.3), 'italic 600 44px "Cormorant Garamond"', E.ink);

      // phương trình, viết theo từng từ
      typed(g, 'x² + y² = 25', 1000, 520, 0.58 * prog(t, T.written - 0.1, T.written + 0.4) + 0.42 * prog(t, T.equation, T.equation + 0.35),
        'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, '3² + 4² = 9 + 16 = 25', 1006, 566, prog(t, T.equation + 0.4, T.e93 + 0.2), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'a shape is an equation', 1006, 650, prog(t, T.round - 0.1, T.round + 0.7), 'italic 500 40px "Cormorant Garamond"', E.accent);
      typed(g, 'an equation is a shape', 1006, 700, prog(t, T.drawn - 0.2, T.shape2 + 0.3), 'italic 500 40px "Cormorant Garamond"', E.accent);
      g.restore();
    }
    // mascot: vào ở "Here is the idea", chỉ vào phương trình; trượt ra phải khi sang hai nửa
    const mOut = outCubic(prog(t, T.s95 - 0.3, T.s95 + 0.4));
    if (t >= T.here - 0.1 && mOut < 1) {
      g.save(); g.translate(mOut * 700, 0);
      figure(g, 'point', 1680, 1060, 700, 'paper', prog(t, T.here - 0.1, T.here + 0.3), { flip: true });
      g.restore();
    }

    // ── phần 2: hai nửa đã lớn lên tách nhau → trượt khớp thành một trang ──
    const bOut = outCubic(prog(t, T.s97 - 0.25, T.s97 + 0.45));
    if (t >= T.branches - 0.2 && bOut < 1) {
      g.save(); g.translate(0, -bOut * 1100);
      const join = outCubic(prog(t, T.one - 0.2, T.language + 0.3));
      const inL = outCubic(prog(t, T.branches - 0.2, T.branches + 0.5)), inR = outCubic(prog(t, T.branches + 0.1, T.branches + 0.8));
      const cxL = -400 + (440 - -400) * inL + 200 * join, cxR = 2300 + (1480 - 2300) * inR - 200 * join, cy = 640;
      // nửa trái: Euclid I.1 bằng compa
      g.save(); g.translate(cxL, cy);
      const kg = prog(t, T.branches - 0.1, T.apart + 0.3);
      hand(g, ring(EA[0], EA[1], ER, 0, 90), { w: 3, color: E.ink, jit: 1, seed: 21, k: clamp(kg * 1.6) });
      hand(g, ring(EB[0], EB[1], ER, Math.PI, 90), { w: 3, color: E.ink, jit: 1, seed: 22, k: clamp(kg * 1.6 - 0.4) });
      hand(g, [EA, EB, EC, EA].flatMap((q, i, a) => i ? seg(a[i - 1][0], a[i - 1][1], q[0], q[1], 10).slice(1) : [q]), { w: 4, color: E.ink, jit: 0.8, seed: 23, k: clamp(kg * 2 - 0.9) });
      [[EA, 'A', -40, 40], [EB, 'B', 18, 40], [EC, 'C', -12, -22]].forEach(([q, s, dx, dy]) => {
        if (kg > 0.7) { g.fillStyle = E.ink; g.beginPath(); g.arc(q[0], q[1], 6, 0, 7); g.fill(); }
        typed(g, s, q[0] + dx, q[1] + dy, kg * 3 - 2, 'italic 600 40px "Cormorant Garamond"', E.ink); });
      typed(g, 'GEOMETRY · THE GREEKS', 0, 340, prog(t, T.greeks - 0.1, T.greeks + 0.5), '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
      g.restore();
      // nửa phải: cân thăng bằng — al-jabr (bù) · al-muqabala (cân), viết bằng lời, không ký hiệu
      g.save(); g.translate(cxR, cy);
      const kb = prog(t, T.apart + 0.1, T.algebra + 0.2);
      hand(g, seg(0, 290, 0, -60, 20), { w: 5, color: E.ink, jit: 0.6, seed: 31, k: clamp(kb * 2) });
      hand(g, seg(-110, 290, 110, 290, 12), { w: 5, color: E.ink, jit: 0.6, seed: 32, k: clamp(kb * 2) });
      hand(g, seg(-200, -60, 200, -60, 24), { w: 5, color: E.ink, jit: 0.6, seed: 33, k: clamp(kb * 2 - 0.5) });
      if (kb > 0.6) {
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 2.5; const kk = clamp(kb * 2.5 - 1.5);
        for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(sx * 200, -60); g.lineTo(sx * 200 - 70, -60 + 140 * kk); g.moveTo(sx * 200, -60); g.lineTo(sx * 200 + 70, -60 + 140 * kk); g.stroke();
          if (kk >= 1) { g.lineWidth = 4; g.beginPath(); g.moveTo(sx * 200 - 90, 80); g.quadraticCurveTo(sx * 200, 130, sx * 200 + 90, 80); g.stroke(); g.lineWidth = 2.5; } }
        g.restore();
        if (kb >= 1) { g.fillStyle = E.ink; g.fillRect(-235, 22, 70, 62); for (let i = 0; i < 3; i++) g.fillRect(170 + i * 0, 64 - i * 22, 60, 18);
          g.beginPath(); g.arc(0, -60, 10, 0, 7); g.fill(); }
      }
      typed(g, 'al-jabr · al-muqabala', 0, -120, prog(t, T.algebra, T.algebra + 0.7), 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
      typed(g, 'ALGEBRA · THE ISLAMIC WORLD', 0, 340, prog(t, T.islamic - 0.1, T.islamic + 0.6), '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
      g.restore();
      // khớp lại: một khung chung bao cả hai, rồi đóng dấu tên ngành mới
      const kf = prog(t, T.language, T.language + 0.6);
      if (kf > 0) { const x0 = cxL - 330, x1 = cxR + 260, y0 = cy - 290, y1 = cy + 380;
        hand(g, [...seg(x0, y0, x1, y0, 30), ...seg(x1, y0, x1, y1, 20).slice(1), ...seg(x1, y1, x0, y1, 30).slice(1), ...seg(x0, y1, x0, y0, 20).slice(1)], { w: 3, color: E.accent, jit: 1, seed: 41, k: kf }); }
      stamp(g, 'ANALYTIC GEOMETRY', 1380, 190, prog(t, T.analytic - 0.05, T.analytic + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.04 });
      g.restore();
    }

    // ── phần 3: "So what changed?" — hình thành phép tính, phương trình thành hình; rồi nét nền cho giải tích ──
    if (t >= T.s97 - 0.1) {
      const ROW1 = 520, ROW2 = 790;
      // hai mũi tên đổi chiều — câu hỏi "what changed"
      [[ROW1, T.s97], [ROW2, T.changed]].forEach(([y, a], i) => {
        const k = prog(t, a - 0.1, a + 0.4);
        hand(g, seg(680, y - 20, 1020, y - 20, 16), { w: 4, color: E.ink, jit: 0.8, seed: 50 + i, k });
        if (k >= 1) arrowHead(g, 1034, y - 20, 0, E.ink, 22);
      });
      // hàng 1: đường tròn (hình) → x² + y² = 25 (phép tính)
      const kc = prog(t, T.geometry2 - 0.2, T.geometry2 + 0.5), c1 = [400, ROW1 - 20], r1 = 120, q1 = [c1[0] + 3 / 5 * r1, c1[1] - 4 / 5 * r1];
      if (kc > 0) { g.save(); g.strokeStyle = E.dim; g.lineWidth = 2; g.beginPath(); g.moveTo(c1[0] - 150, c1[1]); g.lineTo(c1[0] + 150, c1[1]); g.moveTo(c1[0], c1[1] + 150); g.lineTo(c1[0], c1[1] - 150); g.stroke(); g.restore(); }
      hand(g, ring(c1[0], c1[1], r1, 0, 80), { w: 4, color: E.ink, jit: 0.8, seed: 61, k: kc });
      if (kc >= 1) { g.fillStyle = E.accent; g.beginPath(); g.arc(q1[0], q1[1], 8, 0, 7); g.fill(); }
      typed(g, 'GEOMETRY', 400, ROW1 + 150, kc, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
      typed(g, 'x² + y² = 25', 1110, ROW1, prog(t, T.calculation - 0.2, T.calculation + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'CALCULATION', 1112, ROW1 + 44, prog(t, T.calculation, T.calculation + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      // hàng 2: y = x² (đại số) → parabol (hình), điểm tính từ công thức
      typed(g, 'y = x²', 300, ROW2, prog(t, T.algebra2 - 0.1, T.algebra2 + 0.4), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'ALGEBRA', 400, ROW2 + 50, prog(t, T.algebra2, T.algebra2 + 0.4), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
      const o2 = [1330, ROW2 + 140], sx = 70, sy = 46, kq = prog(t, T.picture - 0.2, T.picture + 0.6);
      if (kq > 0) { g.save(); g.strokeStyle = E.dim; g.lineWidth = 2; g.beginPath(); g.moveTo(o2[0] - 2.4 * sx, o2[1]); g.lineTo(o2[0] + 2.4 * sx, o2[1]); g.moveTo(o2[0], o2[1] + 10); g.lineTo(o2[0], o2[1] - 4.3 * sy); g.stroke(); g.restore(); }
      hand(g, Array.from({ length: 61 }, (_, i) => { const x = -2 + i / 15; return [o2[0] + x * sx, o2[1] - x * x * sy]; }), { w: 4, color: E.ink, jit: 0.6, seed: 62, k: kq });
      typed(g, 'PICTURE', 1520, ROW2 + 50, prog(t, T.picture, T.picture + 0.4), '500 20px "IBM Plex Mono"', E.dim);
      // 99: nét nền dài; tiếp tuyến tại x = 1 (hệ số góc 2x = 2) — viên gạch đầu tiên của giải tích
      hand(g, seg(150, 980, 1780, 980, 60), { w: 4, color: E.ink, jit: 1, seed: 71, k: prog(t, T.foundation - 0.2, T.foundation + 0.8) });
      typed(g, 'NEWTON · LEIBNIZ', 150, 1012, 0.4 * prog(t, T.newton - 0.05, T.newton + 0.3) + 0.6 * prog(t, T.leibniz - 0.05, T.leibniz + 0.3), '500 20px "IBM Plex Mono"', E.ink);
      typed(g, '1637 → 1665–1684', 1780, 1012, prog(t, T.decades - 0.2, T.decades + 0.4), '500 20px "IBM Plex Mono"', E.dim, { align: 'right' });
      const kt = prog(t, T.calculus - 0.1, T.calculus + 0.4);
      if (kt > 0) { const x0 = 1, y0 = x0 * x0, m = 2 * x0, dl = y0 / m, dr = 1;   // tiếp tuyến y = 2x − 1, cắt từ trục x tới x = 2
        hand(g, seg(o2[0] + (x0 - dl * kt) * sx, o2[1] - (y0 - m * dl * kt) * sy, o2[0] + (x0 + dr * kt) * sx, o2[1] - (y0 + m * dr * kt) * sy, 12), { w: 3, color: E.accent, jit: 0.4, seed: 72 });
        g.fillStyle = E.accent; g.beginPath(); g.arc(o2[0] + x0 * sx, o2[1] - y0 * sy, 8, 0, 7); g.fill();
        typed(g, 'slope 2', o2[0] + x0 * sx + 24, o2[1] - y0 * sy + 26, prog(t, T.calculus + 0.2, T.calculus + 0.6), '500 20px "IBM Plex Mono"', E.accent); }
    }
  }
}
