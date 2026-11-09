// Hồi 4 · "1665 to 1684 — Newton and Leibniz: calculus" (SCRIPT.md) — giấy in. Câu 100–115 của p2.
//   100–101 hai chân dung khắc, một vạch ngăn ("independently") · ký hiệu của Leibniz dy/dx, ∫
//   102 hai bảng trống: I · II
//   103–106 I: vị trí s = t³/3; vật chạy trên đường cong, dừng ở t = 1.5; cát tuyến co về tiếp tuyến: 4.53 → 2.25
//   107–109 II: v = t², tổng N lát 4 → 8 → 32 → 128 tiến về ∫₀³ t² dt = 9 (tính trong code)
//   110–112 s(3) = 9 = diện tích: d/dt sang phải, ∫ về trái — định lý cơ bản
//   113–115 Newton · Maxwell · Einstein trên một nét; mô phỏng quỹ đạo từng bước (F = ma)
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, portrait, stamp, lookup } from '../kit.js';

const E = ERA.paper;
const s = t => t * t * t / 3, v = t => t * t;               // v = s′
const T0 = 1.5, H0 = 1.2;                                   // khoảnh khắc và bước cát tuyến ban đầu
const slope = h => h < 1e-9 ? v(T0) : (s(T0 + h) - s(T0)) / h;
const leftSum = N => { let a = 0; for (let i = 0; i < N; i++) a += v(3 * i / N) * 3 / N; return a; };
const EXACT = s(3) - s(0);                                   // = 9
const NS = [4, 8, 32, 128];
const A = { x: 200, y: 900 }, B = { x: 1140, y: 900 }, SX = 200, SY = 55;
const pA = (t, y) => [A.x + t * SX, A.y - y * SY], pB = (t, y) => [B.x + t * SX, B.y - y * SY];
// quỹ đạo: Euler–Cromer, GM = 1 — "mô phỏng chạy trên giải tích" (tất định, tính một lần)
const ORBIT = (() => { let x = 1, y = 0, vx = 0, vy = 1.1; const out = [];
  for (let i = 0; i < 470; i++) { const r3 = Math.pow(x * x + y * y, 1.5); vx -= x / r3 * 0.02; vy -= y / r3 * 0.02; x += vx * 0.02; y += vy * 0.02; out.push([x, y]); }
  return out; })();

function arrowHead(g, x, y, ang, color, sz = 16) {
  g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = color; g.beginPath(); g.moveTo(0, 0); g.lineTo(-sz, -sz * 0.45); g.lineTo(-sz, sz * 0.45); g.fill(); g.restore();
}
function axes(g, o, k, xl, yl, seed) {
  hand(g, seg(o.x - 10, o.y, o.x + 3.3 * SX, o.y, 30), { w: 3, color: E.ink, jit: 0.7, seed, k });
  hand(g, seg(o.x, o.y + 10, o.x, o.y - 9.6 * SY, 30), { w: 3, color: E.ink, jit: 0.7, seed: seed + 1, k });
  if (k < 1) return;
  arrowHead(g, o.x + 3.3 * SX + 6, o.y, 0, E.ink); arrowHead(g, o.x, o.y - 9.6 * SY - 6, -Math.PI / 2, E.ink);
  g.save(); g.strokeStyle = E.ink; g.lineWidth = 2; g.font = '500 18px "IBM Plex Mono"'; g.fillStyle = E.dim; g.textAlign = 'center';
  for (let i = 1; i <= 3; i++) { g.beginPath(); g.moveTo(o.x + i * SX, o.y - 7); g.lineTo(o.x + i * SX, o.y + 7); g.stroke(); g.fillText(String(i), o.x + i * SX, o.y + 30); }
  g.textAlign = 'right'; for (const j of [3, 6, 9]) { g.beginPath(); g.moveTo(o.x - 7, o.y - j * SY); g.lineTo(o.x + 7, o.y - j * SY); g.stroke(); g.fillText(String(j), o.x - 14, o.y - j * SY + 6); }
  g.restore();
  typed(g, xl, o.x + 3.3 * SX - 2, o.y - 22, 1, 'italic 600 44px "Cormorant Garamond"', E.ink);
  typed(g, yl, o.x - 46, o.y - 9.6 * SY + 6, 1, 'italic 600 44px "Cormorant Garamond"', E.ink);
}
const curve = (f, P, a = 0, b = 3, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const x = a + (b - a) * i / n; return P(x, f(x)); });
function label(g, x, y, name, life, note, k, extra) {
  typed(g, name, x, y, k * 1.6, 'italic 600 44px "Cormorant Garamond"', E.ink);
  if (life) typed(g, life, x, y + 32, k * 2 - 0.5, '500 20px "IBM Plex Mono"', E.dim);
  if (note) typed(g, note, x, y + 60, k * 2 - 0.8, '500 18px "IBM Plex Mono"', E.dim);
  if (extra) typed(g, extra[0], x, y + extra[2], extra[1], '500 22px "IBM Plex Mono"', E.accent);
}

export default class Calculus {
  static ERA = 'paper';
  static IMAGES = {
    newton: './assets/history/Portrait_of_Sir_Isaac_Newton,_1689.jpg',
    leibniz: './assets/history/Gottfried_Wilhelm_von_Leibniz.jpg',
    maxwell: './assets/history/James-Clerk-Maxwell-1831-1879.jpg',
    einstein: './assets/history/einstein.jpeg',
  };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      s100: L(100).start, two: w(100, 'two'), independently: w(100, 'independently'), calculus: w(100, 'calculus'), e100: L(100).end,
      isaac: w(101, 'isaac'), england: w(101, 'england'), gottfried: w(101, 'gottfried'), germany: w(101, 'germany'),
      s102: L(102).start, two2: w(102, 'two'), problems: w(102, 'problems'),
      rate: w(103, 'rate'), instant: w(103, 'instant'),
      object: w(104, 'object'), exactly: w(104, 'exactly'),
      average: w(105, 'average'), stretch: w(105, 'stretch'), speed2: w(105, 'speed', 2), now: w(105, 'now'),
      derivative: w(106, 'derivative'),
      adding: w(107, 'adding'), pieces: w(107, 'pieces'),
      area: w(108, 'area'), slices: w(108, 'slices'), thin: w(108, 'thin'),
      integral: w(109, 'integral'),
      beautiful: w(110, 'beautiful'), operations: w(111, 'operations'), undo: w(111, 'undo'), other: w(111, 'other'),
      fundamental: w(112, 'fundamental'),
      s113: L(113).start, language: w(113, 'language'), newton2: w(113, 'newton'), motion: w(113, 'motion'), gravity: w(113, 'gravity'),
      maxwell: w(114, 'maxwell'), electromagnetism: w(114, 'electromagnetism'), einstein: w(114, 'einstein'), relativity: w(114, 'relativity'),
      simulation: w(115, 'simulation'), today: w(115, 'today'), end: L(115).end,
    };
    this.START = this.T.s100;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');
    card(g, 'paper', prog(t, this.FROM, this.START + 1.4), 'ACT FOUR · THE LANGUAGE OF CHANGE', '1665–1684', 'Newton and Leibniz');
    ruler(g, 'paper', 1670, prog(t, this.FROM + 0.4, this.START + 0.8));

    // ── 100–101: hai người, độc lập ──
    const pOut = outCubic(prog(t, T.s102 - 0.2, T.s102 + 0.45));
    if (t >= T.two - 0.2 && pOut < 1) {
      g.save(); g.translate(pOut * 1000, 0);
      portrait(g, 'newton', 'paper', 1000, 340, 420, prog(t, T.two - 0.2, T.two + 0.35), { style: 'engrave', rot: -0.012 });
      portrait(g, 'leibniz', 'paper', 1440, 340, 420, prog(t, T.two + 0.1, T.two + 0.65), { style: 'engrave', rot: 0.012 });
      hand(g, seg(1395, 330, 1395, 960, 24), { w: 3, color: E.ink, jit: 1, seed: 5, k: prog(t, T.independently - 0.1, T.independently + 0.5) });
      label(g, 1000, 830, 'Isaac Newton', '1643–1727', 'PORTRAIT BY KNELLER, 1689', prog(t, T.isaac - 0.1, T.isaac + 0.6), ['ENGLAND', prog(t, T.england, T.england + 0.3), 120]);
      label(g, 1440, 830, 'Gottfried Leibniz', '1646–1716', null, prog(t, T.gottfried - 0.1, T.gottfried + 0.6), ['GERMANY', prog(t, T.germany, T.germany + 0.3), 120]);
      g.restore();
    }
    const nOut = outCubic(prog(t, T.s102 - 0.2, T.s102 + 0.45));
    if (t >= T.calculus - 0.2 && nOut < 1) {
      g.save(); g.translate(-nOut * 900, 0);
      typed(g, 'dy/dx', 170, 590, prog(t, T.calculus - 0.1, T.calculus + 0.4), 'italic 600 96px "Cormorant Garamond"', E.accent);
      typed(g, '∫ y dx', 170, 760, prog(t, T.calculus + 0.3, T.e100 + 0.6), 'italic 600 96px "Cormorant Garamond"', E.accent);
      typed(g, 'CALCULUS', 176, 850, prog(t, T.calculus + 0.2, T.calculus + 0.7), '500 22px "IBM Plex Mono"', E.ink);
      g.restore();
    }

    // ── 102–112: hai bảng ──
    const qOut = outCubic(prog(t, T.s113 - 0.2, T.s113 + 0.5));
    if (t >= T.two2 - 0.2 && qOut < 1) {
      g.save(); g.translate(0, -qOut * 1100);
      axes(g, A, prog(t, T.two2 - 0.2, T.two2 + 0.4), 't', 's', 10);
      axes(g, B, prog(t, T.problems - 0.2, T.problems + 0.4), 't', 'v', 20);
      typed(g, 'I', A.x + 3.3 * SX - 20, 420, prog(t, T.problems - 0.1, T.problems + 0.1), '800 46px "Archivo"', E.dim);
      typed(g, 'II', B.x + 3.3 * SX - 30, 420, prog(t, T.problems + 0.1, T.problems + 0.3), '800 46px "Archivo"', E.dim);

      // I · đạo hàm
      typed(g, 'I · RATE OF CHANGE', 250, 400, prog(t, T.rate - 0.1, T.rate + 0.5), '500 22px "IBM Plex Mono"', E.ink);
      hand(g, curve(s, pA), { w: 4, color: E.ink, jit: 0.6, seed: 31, k: prog(t, T.rate, T.instant + 0.2) });
      typed(g, 's = t³/3', 560, 640, prog(t, T.instant - 0.3, T.instant + 0.2), 'italic 600 44px "Cormorant Garamond"', E.ink);
      const ki = prog(t, T.instant - 0.1, T.instant + 0.3), q0 = pA(T0, s(T0));
      if (ki > 0) { g.save(); g.setLineDash([7, 7]); g.strokeStyle = E.dim; g.lineWidth = 2; g.beginPath(); g.moveTo(q0[0], A.y); g.lineTo(q0[0], A.y - (A.y - q0[1]) * ki); g.stroke(); g.restore(); }
      // vật chạy theo s(t), chậm dần, dừng đúng t = 1.5
      const kr = prog(t, T.object - 0.1, T.exactly + 0.4);
      if (kr > 0) { const tau = T0 * (1 - Math.pow(1 - kr, 2)), q = pA(tau, s(tau));
        g.fillStyle = E.ink; g.beginPath(); g.arc(q[0], q[1], 10, 0, 7); g.fill(); }
      // cát tuyến → tiếp tuyến
      const ka = prog(t, T.average - 0.1, T.average + 0.3);
      if (ka > 0) {
        const hs = H0 * (1 - outCubic(prog(t, T.speed2 - 0.1, T.now + 0.3))), m = slope(hs);
        const a = T0 - 0.55, b = Math.min(3.1, T0 + Math.max(hs, 0) + 0.55);
        const L0 = pA(a, s(T0) + m * (a - T0)), L1 = pA(b, s(T0) + m * (b - T0));
        g.save(); g.beginPath(); g.rect(A.x, A.y - 9.6 * SY, 3.3 * SX, 9.6 * SY); g.clip();
        g.strokeStyle = E.accent; g.lineWidth = 3; g.beginPath(); g.moveTo(L0[0], L0[1]); g.lineTo(L0[0] + (L1[0] - L0[0]) * ka, L0[1] + (L1[1] - L0[1]) * ka); g.stroke();
        const q1 = pA(T0 + hs, s(T0 + hs));
        g.fillStyle = E.accent; g.beginPath(); g.arc(q1[0], q1[1], 7, 0, 7); g.fill();
        // "a stretch of time": đoạn [t, t + h] trên trục
        const ks = prog(t, T.stretch - 0.1, T.stretch + 0.3);
        if (ks > 0 && hs > 0.01) { g.lineWidth = 6; g.beginPath(); g.moveTo(q0[0], A.y); g.lineTo(q0[0] + hs * SX * ks, A.y); g.stroke(); }
        g.restore();
        const lab = hs > 0.005 ? `h = ${hs.toFixed(2)}   average speed = ${m.toFixed(2)}` : `h → 0     speed right now = ${v(T0).toFixed(2)}`;
        typed(g, lab, 250, 440, ka, '500 22px "IBM Plex Mono"', E.ink);
      }
      if (t >= T.object - 0.1) { g.fillStyle = E.ink; g.beginPath(); g.arc(q0[0], q0[1], kr >= 1 ? 10 : 0, 0, 7); g.fill(); }
      typed(g, 'DERIVATIVE   s′(1.5) = 2.25', 250, 482, prog(t, T.derivative - 0.2, T.derivative + 0.5), '500 22px "IBM Plex Mono"', E.accent);

      // II · tích phân
      typed(g, 'II · AREA', 1190, 400, prog(t, T.area - 0.1, T.area + 0.4), '500 22px "IBM Plex Mono"', E.ink);
      const ni = [T.pieces, T.area, T.slices, T.thin].reduce((n, a, i) => t >= a - 0.1 ? i : n, -1);
      if (ni >= 0) {
        const tc = [T.pieces, T.area, T.slices, T.thin][ni], N = NS[ni], Nprev = ni ? NS[ni - 1] : 0, km = outCubic(prog(t, tc - 0.1, tc + 0.35));
        const rh = (n, x) => n ? v(Math.floor(x * n / 3 + 1e-9) * 3 / n) : 0;
        g.save(); g.fillStyle = 'rgba(155,45,36,0.30)'; g.strokeStyle = E.ink; g.lineWidth = N > 32 ? 0 : 1.5;
        for (let i = 0; i < N; i++) {
          const x0 = 3 * i / N, x1 = 3 * (i + 1) / N, hgt = rh(Nprev, (x0 + x1) / 2) * (1 - km) + v(x0) * km;
          const [px0, py] = pB(x0, hgt), px1 = pB(x1, 0)[0];
          g.fillRect(px0, py, px1 - px0, B.y - py); if (N <= 32) g.strokeRect(px0, py, px1 - px0, B.y - py);
        }
        g.restore();
        typed(g, `N = ${N}   sum = ${leftSum(N).toFixed(3)}`, 1190, 440, prog(t, tc - 0.1, tc + 0.2), '500 22px "IBM Plex Mono"', E.ink);
      }
      hand(g, curve(v, pB), { w: 4, color: E.ink, jit: 0.6, seed: 41, k: prog(t, T.adding - 0.1, T.adding + 0.7) });
      typed(g, 'v = t²', 1520, 520, prog(t, T.adding + 0.4, T.adding + 0.8), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, `INTEGRAL   ∫₀³ t² dt = ${EXACT}`, 1190, 482, prog(t, T.integral - 0.2, T.integral + 0.5), '500 22px "IBM Plex Mono"', E.accent);

      // 110: hai con số 9 — vị trí lúc t = 3 và diện tích dưới v
      const kb = prog(t, T.beautiful - 0.2, T.beautiful + 0.4);
      if (kb > 0) { const q = pA(3, s(3));
        g.fillStyle = E.accent; g.beginPath(); g.arc(q[0], q[1], 10 * outBack(kb), 0, 7); g.fill();
        typed(g, `s(3) = ${s(3)}`, 822, 512, kb, 'italic 600 44px "Cormorant Garamond"', E.accent);
        typed(g, `area = ${EXACT}`, 1240, 700, kb, 'italic 600 44px "Cormorant Garamond"', E.ink); }
      // 111: d/dt sang phải, ∫ về trái
      const kd = prog(t, T.operations - 0.1, T.operations + 0.5), kn = prog(t, T.undo - 0.1, T.undo + 0.5);
      hand(g, seg(880, 610, 1100, 610, 16), { w: 4, color: E.ink, jit: 0.8, seed: 51, k: kd });
      if (kd >= 1) arrowHead(g, 1114, 610, 0, E.ink, 20);
      typed(g, 'd/dt', 990, 590, kd, 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
      hand(g, seg(1100, 730, 880, 730, 16), { w: 4, color: E.accent, jit: 0.8, seed: 52, k: kn });
      if (kn >= 1) arrowHead(g, 866, 730, Math.PI, E.accent, 20);
      typed(g, '∫', 990, 800, kn, 'italic 600 64px "Cormorant Garamond"', E.accent, { align: 'center' });
      stamp(g, 'THE FUNDAMENTAL THEOREM OF CALCULUS', 960, 968, prog(t, T.fundamental - 0.05, T.fundamental + 0.25), '800 30px "Archivo"', E.accent, { rot: -0.015 });
      g.restore();
    }

    // ── 113–115: một ngôn ngữ, ba người, một nét ──
    if (t >= T.s113 - 0.1) {
      hand(g, seg(150, 930, 1780, 930, 60), { w: 4, color: E.ink, jit: 1, seed: 61, k: prog(t, T.language - 0.3, T.language + 0.6) });
      if (t >= T.today) arrowHead(g, 1796, 930, 0, E.ink, 20);
      typed(g, 'TODAY', 1780, 970, prog(t, T.today - 0.1, T.today + 0.3), '500 20px "IBM Plex Mono"', E.ink, { align: 'right' });
      [['newton', 230, T.newton2, 'Isaac Newton', '1643–1727', 'MOTION & GRAVITY', T.motion, T.gravity],
       ['maxwell', 810, T.maxwell, 'James Clerk Maxwell', '1831–1879', 'ELECTROMAGNETISM', T.electromagnetism, T.electromagnetism + 0.4],
       ['einstein', 1390, T.einstein, 'Albert Einstein', '1879–1955', 'RELATIVITY', T.relativity, T.relativity + 0.3]]
        .forEach(([key, x, a, name, life, cap, c0, c1], i) => {
          const k = prog(t, a - 0.2, a + 0.4); if (k <= 0) return;
          const { w } = portrait(g, key, 'paper', x, 400, 340, k, { style: 'engrave', rot: (i - 1) * 0.012 });
          hand(g, seg(x + w / 2, 930, x + w / 2, 900, 3), { w: 4, color: E.ink, jit: 0.4, seed: 70 + i, k });
          typed(g, name, x, 802, k * 1.6, 'italic 600 44px "Cormorant Garamond"', E.ink);
          typed(g, life, x, 834, k * 2 - 0.6, '500 18px "IBM Plex Mono"', E.dim);
          typed(g, cap, x, 878, prog(t, c0 - 0.1, c1 + 0.2), '500 22px "IBM Plex Mono"', E.accent);
        });
      // mô phỏng: quỹ đạo tính từng bước, mỗi bước một chấm
      const ks = prog(t, T.simulation - 0.2, T.end + 1.6);
      if (ks > 0) {
        const n = Math.max(1, Math.floor(ORBIT.length * ks)), cx = 1450, cy = 196, sc = 88;
        g.fillStyle = E.ink; g.beginPath(); g.arc(cx, cy, 9, 0, 7); g.fill();
        for (let i = 0; i < n; i += 6) { const [x, y] = ORBIT[i]; g.beginPath(); g.arc(cx + x * sc, cy - y * sc, 2.6, 0, 7); g.fill(); }
        const [x, y] = ORBIT[n - 1]; g.fillStyle = E.accent; g.beginPath(); g.arc(cx + x * sc, cy - y * sc, 9, 0, 7); g.fill();
        typed(g, 'F = ma', 1564, 180, prog(t, T.simulation, T.simulation + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink);
        typed(g, 'SIMULATED STEP BY STEP', 1564, 214, prog(t, T.simulation + 0.2, T.simulation + 0.8), '500 18px "IBM Plex Mono"', E.dim);
      }
    }
  }
}
