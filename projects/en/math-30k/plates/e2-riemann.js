// Hồi 5 · "1854 — Riemann: curved space" (SCRIPT.md) — bảng đen. Câu 152–158 của p2.
//   Riemann (Göttingen) · lưới phấn phẳng → cong bất kỳ: vòm (cầu), yên ngựa · nhãn 4 chiều, 11 chiều
//   "trừu tượng thuần tuý" → lưới phẳng lại · Einstein: một khối nặng ấn lõm lưới (hấp dẫn làm cong không gian)
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, portrait, lookup } from '../kit.js';

const E = ERA.chalk;
function chalk(g, pts, { w = 4, color = E.ink, seed = 1, k = 1, jit = 2.2 } = {}) {
  hand(g, pts, { w, color, jit, seed, k });
  g.save(); g.globalAlpha = 0.3; hand(g, pts, { w: w * 0.6, color, jit: jit * 1.6, seed: seed + 50, k }); g.restore();
}
function ctext(g, s, x, y, k, font, color, opt = {}) {
  typed(g, s, x, y, k, font, color, opt);
  g.save(); g.globalAlpha = 0.28; typed(g, s, x + 1.5, y - 1.2, k, font, color, opt); g.restore();
}
function away(g, k, dx, dy, draw) { if (k >= 1) return; g.save(); g.translate(outCubic(k) * dx, outCubic(k) * dy); draw(); g.restore(); }

// lưới u, v ∈ [−1, 1], độ cao z = tổ hợp các dạng cong; chiếu xiên (v vào sâu, z lên)
const GX = 1230, GY = 700, GS = 330;
const P = (u, v, z) => [GX + GS * (u + 0.3 * v), GY - GS * (0.9 * z + 0.4 * v)];
const SHAPES = {
  wave: (u, v) => 0.12 * Math.sin(2.4 * u + 0.6) * Math.cos(2 * v),
  dome: (u, v) => 0.5 * Math.exp(-(u * u + v * v) / 0.45) - 0.1,        // cong dương (như mặt cầu)
  saddle: (u, v) => 0.3 * (u * u - v * v),                               // cong âm
  well: (u, v) => -0.55 * Math.exp(-(u * u + v * v) / 0.16),             // khối nặng ấn lõm
};

export default class Riemann {
  static ERA = 'chalk';
  static IMAGES = {
    riemann: './assets/history/Georg_Friedrich_Bernhard_Riemann.jpeg',
    einstein: './assets/history/einstein.jpeg',
  };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      s0: L(152).start, riemann: w(152, 'riemann'), lecture: w(152, 'lecture'), gottingen: w(152, 'göttingen'), further: w(152, 'further'),
      s153: L(153).start, parallel: w(153, 'parallel'), axiom: w(153, 'axiom'),
      framework: w(154, 'framework'), curved: w(154, 'curved'), dimensions: w(154, 'dimensions'),
      sphere: w(155, 'sphere'), saddle: w(155, 'saddle'), four: w(155, 'four'), eleven: w(155, 'eleven'),
      s156: L(156).start, abstraction: w(156, 'abstraction'),
      s157: L(157).start, sixty: w(157, 'sixty'), einstein: w(157, 'einstein'), gravity: w(157, 'gravity'), curves: w(157, 'curves'),
      general: w(158, 'general'), relativity: w(158, 'relativity'), fifth: w(158, 'fifth'), e158: L(158).end,
    };
    this.START = this.T.s0;
    this.FROM = this.START - 1.2;
  }
  // trọng số các dạng cong theo t (mỗi dạng vào/ra bằng chuyển động mượt, không nhảy)
  weights(t) {
    const T = this.T, on = (a, b) => outCubic(prog(t, a, b));
    const flatAgain = on(T.s156, T.s156 + 1.2);
    return {
      wave: on(T.curved - 0.1, T.curved + 0.8) * (1 - on(T.sphere - 0.2, T.sphere + 0.5)),
      dome: on(T.sphere - 0.2, T.sphere + 0.5) * (1 - on(T.saddle - 0.2, T.saddle + 0.5)),
      saddle: on(T.saddle - 0.2, T.saddle + 0.5) * (1 - flatAgain),
      well: on(T.gravity, T.gravity + 0.9) * (0.6 + 0.4 * on(T.curves, T.curves + 0.7)),
    };
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'chalk');
    card(g, 'chalk', prog(t, T.s0 - 1.2, T.s0 + 0.8), 'ACT FIVE · QUESTIONING THE FOUNDATIONS', '1854', 'Riemann, curved space');
    ruler(g, 'chalk', 1854, prog(t, T.s0 - 0.4, T.s0 + 0.5));

    // ── Riemann, bài giảng ở Göttingen (ra ở "pure abstraction") ──
    if (t > T.riemann - 0.6) away(g, prog(t, T.s156 - 0.2, T.s156 + 0.4), -700, 0, () => {
      portrait(g, 'riemann', 'chalk', 170, 400, 360, prog(t, T.riemann - 0.4, T.riemann + 0.3), { style: 'pin', rot: -0.02, label: { name: 'Bernhard Riemann', life: '1826–1866' } });
      ctext(g, 'LECTURE · GÖTTINGEN · 1854', 170, 878, prog(t, T.gottingen - 0.3, T.gottingen + 0.6), '500 20px "IBM Plex Mono"', E.accent);
    });

    // ── lưới phấn: vẽ ở "much further", cong theo lời ──
    const wt = this.weights(t), z = (u, v) => Object.keys(SHAPES).reduce((a, s) => a + wt[s] * SHAPES[s](u, v), 0);
    const kg = prog(t, T.lecture, T.further + 0.6), N = 14;
    for (let j = 0; j <= N; j++) {
      const c = -1 + 2 * j / N;
      const row = Array.from({ length: 41 }, (_, i) => { const u = -1 + i / 20; return P(u, c, z(u, c)); });
      const col = Array.from({ length: 41 }, (_, i) => { const v = -1 + i / 20; return P(c, v, z(c, v)); });
      chalk(g, row, { w: 2, color: E.dim, seed: 10 + j, k: prog(kg, j * 0.03, j * 0.03 + 0.55), jit: 1 });
      chalk(g, col, { w: 2, color: E.dim, seed: 40 + j, k: prog(kg, 0.3 + j * 0.03, 0.3 + j * 0.03 + 0.55), jit: 1 });
    }
    // khối nặng: rơi xuống tâm lưới ở "gravity"
    const kb = prog(t, T.gravity - 0.5, T.gravity + 0.1);
    if (kb > 0) {
      const [bx, by] = P(0, 0, z(0, 0)), r = 46, y = by - r + 10 - (1 - outCubic(kb)) * 600;
      g.save(); g.fillStyle = E.accent; g.beginPath(); g.arc(bx, y, r, 0, 7); g.fill(); g.restore();
      chalk(g, Array.from({ length: 41 }, (_, i) => [bx + r * Math.cos(i / 40 * 7), y + r * Math.sin(i / 40 * 7)]), { w: 3, color: E.ink, seed: 90, jit: 1 });
      ctext(g, 'MASS', bx + 70, y - 64, prog(t, T.gravity, T.gravity + 0.4), '500 22px "IBM Plex Mono"', E.accent);
    }

    // ── nhãn trên lưới: "không chỉ tiên đề 5" · mọi không gian cong · cầu / yên ngựa / 4 chiều / 11 chiều ──
    away(g, prog(t, T.s156 - 0.2, T.s156 + 0.4), 0, -1200, () => {
      ctext(g, 'NOT JUST AXIOM 5', 780, 420, prog(t, T.parallel - 0.1, T.axiom + 0.3), '500 24px "IBM Plex Mono"', E.accent);
      ctext(g, '→  ANY CURVED SPACE', 1080, 420, prog(t, T.curved - 0.1, T.curved + 0.6), '500 24px "IBM Plex Mono"', E.ink);
      ctext(g, 'ANY NUMBER OF DIMENSIONS', 1080, 456, prog(t, T.dimensions - 0.2, T.dimensions + 0.6), '500 20px "IBM Plex Mono"', E.dim);
      ctext(g, 'sphere', 780, 1000, prog(t, T.sphere - 0.1, T.sphere + 0.3), 'italic 600 44px "Cormorant Garamond"', E.ink);
      ctext(g, 'saddle', 960, 1000, prog(t, T.saddle - 0.1, T.saddle + 0.3), 'italic 600 44px "Cormorant Garamond"', E.ink);
      ctext(g, '4 dimensions', 1140, 1000, prog(t, T.four - 0.1, T.four + 0.4), 'italic 600 44px "Cormorant Garamond"', E.accent);
      ctext(g, '11', 1420, 1000, prog(t, T.eleven - 0.05, T.eleven + 0.2), 'italic 600 44px "Cormorant Garamond"', E.accent);
    });
    ctext(g, 'pure abstraction?', 780, 430, prog(t, T.abstraction - 0.4, T.abstraction + 0.3), 'italic 600 52px "Cormorant Garamond"', E.dim);

    // ── Einstein: sáu mươi năm sau, hấp dẫn làm cong không gian ──
    if (t > T.s157 - 0.4) {
      ctext(g, 'SIXTY YEARS LATER', 170, 420, prog(t, T.sixty - 0.1, T.sixty + 0.6), '500 22px "IBM Plex Mono"', E.dim);
      portrait(g, 'einstein', 'chalk', 170, 470, 330, prog(t, T.einstein - 0.4, T.einstein + 0.3), { style: 'pin', rot: 0.02, label: { name: 'Albert Einstein', life: '1879–1955' } });
      ctext(g, 'GRAVITY CURVES SPACE', 1180, 1000, prog(t, T.curves - 0.2, T.curves + 0.6), '500 24px "IBM Plex Mono"', E.accent);
      ctext(g, 'GENERAL RELATIVITY', 780, 500, prog(t, T.general - 0.1, T.relativity + 0.4), '800 46px "Archivo"', E.ink);
      ctext(g, "← because someone questioned Euclid's axiom 5", 780, 548, prog(t, T.fifth - 0.6, T.e158 + 0.2), 'italic 500 40px "Cormorant Garamond"', E.accent);
    }
  }
}
