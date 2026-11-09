// Hồi 5 · "1874 — Cantor: sizes of infinity" (SCRIPT.md) — bảng đen. Câu 159–174 của p2.
//   Cantor · ∞ ? ∞ → ∞ < ∞ · số đếm (chấm rời) và trục số thực (liền, π, √2) · |ℝ| > |ℕ|
//   đường chéo 1891: danh sách, đổi chữ số thứ n của số thứ n ((d + 1) mod 10, tính trong code), khác mọi hàng
//   "corrupter of youth" (dấu, gọi lại mở bài) · lý thuyết tập hợp: { } — số, hàm, hình đều là tập hợp
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, stamp, lookup } from '../kit.js';

const E = ERA.chalk;
function chalk(g, pts, { w = 4, color = E.ink, seed = 1, k = 1, jit = 2.2 } = {}) {
  hand(g, pts, { w, color, jit, seed, k });
  g.save(); g.globalAlpha = 0.3; hand(g, pts, { w: w * 0.6, color, jit: jit * 1.6, seed: seed + 50, k }); g.restore();
}
function ctext(g, s, x, y, k, font, color, opt = {}) {
  typed(g, s, x, y, k, font, color, opt);
  g.save(); g.globalAlpha = 0.28; typed(g, s, x + 1.5, y - 1.2, k, font, color, opt); g.restore();
}
const ring = (cx, cy, r, n = 36) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(i / n * Math.PI * 2 - 1), cy + r * Math.sin(i / n * Math.PI * 2 - 1)]);
function away(g, k, dx, dy, draw) { if (k >= 1) return; g.save(); g.translate(outCubic(k) * dx, outCubic(k) * dy); draw(); g.restore(); }
function brace(x, y0, y1, dir) {   // dấu ngoặc nhọn vẽ tay; dir = 1 mở sang phải ({), −1 sang trái (})
  const m = (y0 + y1) / 2, d = 26 * dir, pts = [];
  const q = (a, b, c, n = 10) => { for (let i = 0; i <= n; i++) { const s = i / n; pts.push([(1 - s) ** 2 * a[0] + 2 * s * (1 - s) * b[0] + s * s * c[0], (1 - s) ** 2 * a[1] + 2 * s * (1 - s) * b[1] + s * s * c[1]]); } };
  q([x + d, y0], [x, y0], [x, y0 + 40]); q([x, y0 + 40], [x, m - 10], [x - d, m]); q([x - d, m], [x, m + 10], [x, y1 - 40]); q([x, y1 - 40], [x, y1], [x + d, y1]);
  return pts;
}

// danh sách thử: các số thực quen (phần thập phân), chữ số mới = (d + 1) mod 10 trên đường chéo
const ROWS = ['1415926', '3333333', '7182818', '4142135', '0000000', '6180339'];
const NEW = ROWS.map((r, i) => String((+r[i] + 1) % 10));
for (let i = 0; i < ROWS.length; i++) if (NEW[i] === ROWS[i][i]) throw new Error('e3: chữ số mới trùng đường chéo');
const DX = 46, X0 = 400, Y0 = 440, DY = 60;   // hàng "new" ≤ y 950 (vùng an toàn)

export default class Cantor {
  static ERA = 'chalk';
  static IMAGES = { cantor: './assets/history/Georg_Cantor-_colorized.jpg' };
  static POSES = ['chalk'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.T = {
      s0: L(159).start, cantor: w(159, 'cantor'), accept: w(159, 'accept'),
      compared: w(160, 'compared'), infinities: w(160, 'infinities'),
      before: w(161, 'before'), single: w(161, 'single'), divided: w(161, 'divided'),
      opposite: w(162, 'opposite'), sizes: w(162, 'sizes'), bigger: w(162, 'bigger'),
      s163: L(163).start, counting: w(163, 'counting'), one: w(163, 'one'), two: w(163, 'two'), three: w(163, 'three'), so: w(163, 'so'), forever: w(163, 'forever'),
      real: w(164, 'real'), pi: w(164, 'pi'), root: w(164, 'root'), endless: w(164, 'endless'), forever2: w(164, 'forever'),
      larger: w(165, 'larger'), genuinely: w(165, 'genuinely'),
      s166: L(166).start, ninety: w(166, 'ninety-one'), proof: w(166, 'proof'), diagonal: w(166, 'diagonal'),
      list: w(167, 'list'), counting2: w(167, 'counting'), e167: L(167).end,
      build: w(168, 'build'), newn: w(168, 'new'), first: w(168, 'first', 1), second: w(168, 'second', 1), so168: w(168, 'so'), diag168: w(168, 'diagonal'),
      different: w(169, 'different'), every: w(169, 'every'), list169: w(169, 'list'),
      pair: w(170, 'pair'), left: w(170, 'left'), e170: L(170).end,
      s171: L(171).start, furious: w(171, 'furious'), corrupter: w(171, 'corrupter'),
      s172: L(172).start, set: w(172, 'set'), theory: w(172, 'theory'), language: w(172, 'language'),
      numbers: w(173, 'numbers'), functions: w(173, 'functions'), shapes: w(173, 'shapes'),
      modern: w(174, 'modern'), foundation: w(174, 'foundation'), sets174: w(174, 'sets'),
    };
    this.START = this.T.s0;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'chalk');
    card(g, 'chalk', prog(t, T.s0 - 1.2, T.s0 + 0.8), 'ACT FIVE · QUESTIONING THE FOUNDATIONS', '1874', 'Cantor, sizes of infinity');
    ruler(g, 'chalk', 1874, prog(t, T.s0 - 0.4, T.s0 + 0.5));

    // ── 1. Cantor · so sánh các vô cực ──
    away(g, prog(t, T.s163 - 0.35, T.s163 + 0.3), 0, 1000, () => {
      portrait(g, 'cantor', 'chalk', 180, 400, 400, prog(t, T.cantor - 0.4, T.cantor + 0.3), { style: 'pin', rot: -0.02, label: { name: 'Georg Cantor', life: '1845–1918' } });
      ctext(g, 'ALMOST NOBODY WAS READY', 180, 930, prog(t, T.accept - 0.6, T.accept + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      const big = 1 + 0.45 * outBack(prog(t, T.bigger - 0.1, T.bigger + 0.4));
      const inf = (x, sc, k) => { if (k <= 0) return; g.save(); g.translate(x, 680); g.scale(sc, sc); ctext(g, '∞', 0, 0, 1, 'italic 600 96px "Cormorant Garamond"', E.ink, { align: 'center' }); g.restore(); };
      inf(900, 1.6 * outBack(prog(t, T.compared - 0.1, T.compared + 0.3)), 1);
      inf(1440, 1.6 * big * outBack(prog(t, T.infinities - 0.1, T.infinities + 0.3)), 1);
      ctext(g, '?', 1170, 660, prog(t, T.infinities + 0.2, T.infinities + 0.4) * (1 - prog(t, T.opposite - 0.05, T.opposite)), '800 92px "Archivo"', E.accent, { align: 'center' });
      ctext(g, '<', 1170, 660, prog(t, T.sizes - 0.05, T.sizes + 0.2), '800 92px "Archivo"', E.accent, { align: 'center' });
      ctext(g, 'BEFORE CANTOR: ONE INFINITY', 760, 470, prog(t, T.single - 0.4, T.single + 0.5), '500 24px "IBM Plex Mono"', E.dim);
      ctext(g, "CAN'T BE DIVIDED", 760, 506, prog(t, T.divided - 0.3, T.divided + 0.3), '500 24px "IBM Plex Mono"', E.dim);
      chalk(g, seg(750, 494, 1180, 470, 10), { w: 4, color: E.accent, seed: 3, k: prog(t, T.opposite - 0.1, T.opposite + 0.3) });
      ctext(g, 'DIFFERENT SIZES', 760, 860, prog(t, T.sizes, T.sizes + 0.5), '500 28px "IBM Plex Mono"', E.accent);
    });

    // ── 2. số đếm (chấm rời) vs số thực (đường liền) — cùng một thang ──
    const U = 140, OX = 200, xn = v => OX + v * U;
    if (t > T.s163 - 0.4) away(g, prog(t, T.diagonal - 0.6, T.diagonal), 0, -1100, () => {
      ctext(g, 'COUNTING NUMBERS', OX, 450, prog(t, T.counting - 0.1, T.counting + 0.5), '500 24px "IBM Plex Mono"', E.dim);
      const hits = [T.one, T.two, T.three];
      for (let n = 1; n <= 11; n++) {
        const a = n <= 3 ? hits[n - 1] : T.so + (n - 4) * 0.12, k = prog(t, a - 0.05, a + 0.15); if (k <= 0) continue;
        g.fillStyle = E.ink; g.beginPath(); g.arc(xn(n), 540, 9 * outBack(k), 0, 7); g.fill();
        ctext(g, String(n), xn(n), 600, k, '500 28px "IBM Plex Mono"', E.ink, { align: 'center' });
      }
      ctext(g, '…', xn(11) + 34, 550, prog(t, T.forever - 0.1, T.forever + 0.2), '800 46px "Archivo"', E.ink);
      ctext(g, 'REAL NUMBERS', OX, 700, prog(t, T.real - 0.1, T.real + 0.5), '500 24px "IBM Plex Mono"', E.dim);
      chalk(g, seg(OX, 780, xn(11), 780, 60), { w: 5, color: E.ink, seed: 20, k: prog(t, T.real, T.real + 0.8) });
      // "every endless decimal": tick dày đặc
      const nt = Math.floor(260 * prog(t, T.endless - 0.2, T.endless + 1.0));
      g.save(); g.strokeStyle = E.ink; g.globalAlpha = 0.55; g.lineWidth = 1.2;
      for (let i = 0; i < nt; i++) { const x = OX + hash(i * 1.37 + 5) * (xn(11) - OX), h = 6 + hash(i * 2.1) * 10; g.beginPath(); g.moveTo(x, 780 - h); g.lineTo(x, 780 + h); g.stroke(); }
      g.restore();
      chalk(g, [[xn(11) + 40, 780], [xn(11) + 70, 780], [xn(11) + 54, 768], [xn(11) + 70, 780], [xn(11) + 54, 792]], { w: 4, color: E.ink, seed: 21, k: prog(t, T.forever2 - 0.1, T.forever2 + 0.3), jit: 1 });
      for (const [v, s, a] of [[0, '0', T.real + 0.3], [Math.SQRT2, '√2', T.root], [Math.PI, 'π', T.pi]]) {
        const k = prog(t, a - 0.05, a + 0.25); if (k <= 0) continue;
        chalk(g, seg(xn(v), 760, xn(v), 800, 3), { w: 4, color: E.ink, seed: 30 + v, k, jit: 1 });
        ctext(g, s, xn(v), 860, k, v ? 'italic 600 54px "Cormorant Garamond"' : '500 34px "IBM Plex Mono"', E.ink, { align: 'center' });
      }
      ctext(g, 'reals > counting numbers', 1280, 960, prog(t, T.genuinely - 0.1, T.larger + 0.3), 'italic 600 64px "Cormorant Garamond"', E.accent);
    });

    // ── 3. đường chéo (1891) ──
    if (t > T.s166 - 0.4) away(g, prog(t, T.s171 - 0.35, T.s171 + 0.3), 0, 1100, () => {
      ctext(g, '1891', 860, 470, prog(t, T.ninety - 0.4, T.ninety + 0.2), '800 64px "Archivo"', E.ink);
      ctext(g, 'the diagonal argument', 1040, 466, prog(t, T.diagonal - 0.1, T.diagonal + 0.6), 'italic 600 52px "Cormorant Garamond"', E.accent);
      const span = Math.max(1.2, T.e167 - T.list - 0.4);
      ROWS.forEach((r, i) => {
        const a = T.list + span * i / ROWS.length, y = Y0 + 110 + i * DY;
        ctext(g, String(i + 1), X0 - 240, y, prog(t, T.counting2 + i * 0.08, T.counting2 + i * 0.08 + 0.15), '500 34px "IBM Plex Mono"', E.accent);
        ctext(g, '→  0.', X0 - 180, y, prog(t, a, a + 0.2), '500 34px "IBM Plex Mono"', E.ink);
        [...r].forEach((d, j) => ctext(g, d, X0 + j * DX, y, prog(t, a + 0.1 + j * 0.04, a + 0.14 + j * 0.04), '500 34px "IBM Plex Mono"', E.ink));
        ctext(g, '…', X0 + 7 * DX, y, prog(t, a + 0.4, a + 0.5), '500 34px "IBM Plex Mono"', E.ink);
      });
      // n-ème chữ số của số n: khoanh, rồi chữ số mới (d + 1) mod 10 viết bên dưới
      const cAt = i => i === 0 ? T.first : i === 1 ? T.second : T.so168 + (i - 2) * ((T.diag168 - T.so168) / 4);
      const yNew = Y0 + 110 + ROWS.length * DY + 40;
      ROWS.forEach((r, i) => {
        const a = cAt(i), y = Y0 + 110 + i * DY, cx = X0 + i * DX + 10;
        chalk(g, ring(cx, y - 12, 24), { w: 3, color: E.accent, seed: 40 + i, k: prog(t, a - 0.1, a + 0.25), jit: 2.5 });
        ctext(g, NEW[i], X0 + i * DX, yNew, prog(t, a + 0.15, a + 0.3), '500 34px "IBM Plex Mono"', E.accent);
      });
      g.save(); g.globalAlpha = 0.5; chalk(g, seg(X0 - 10, Y0 + 70, X0 + 5 * DX + 40, Y0 + 110 + 5 * DY + 16, 20), { w: 2, color: E.accent, seed: 60, k: prog(t, T.diag168 - 0.1, T.diag168 + 0.5) }); g.restore();
      chalk(g, seg(X0 - 250, yNew - 52, X0 + 8 * DX, yNew - 52, 30), { w: 3, color: E.ink, seed: 61, k: prog(t, T.newn - 0.2, T.newn + 0.3) });
      ctext(g, 'new →  0.', X0 - 277, yNew, prog(t, T.newn, T.newn + 0.3), '500 34px "IBM Plex Mono"', E.accent);
      ctext(g, '…', X0 + 6 * DX, yNew, prog(t, T.diag168 + 0.3, T.diag168 + 0.5), '500 34px "IBM Plex Mono"', E.accent);
      // khác mọi hàng: ≠ ở mỗi hàng, đúng tại chữ số chéo
      ROWS.forEach((r, i) => { const a = T.every + i * ((T.list169 + 0.3 - T.every) / ROWS.length);
        ctext(g, '≠', X0 + 8 * DX + 20, Y0 + 110 + i * DY, prog(t, a, a + 0.2), '500 22px "IBM Plex Mono"', E.accent); });
      ctext(g, 'n-th digit of the n-th number', 860, 540, prog(t, T.first - 0.6, T.first + 0.4), 'italic 500 40px "Cormorant Garamond"', E.ink);
      ctext(g, 'differs from every row', 860, 594, prog(t, T.different - 0.1, T.different + 0.6), 'italic 500 40px "Cormorant Garamond"', E.ink);
      const kl = prog(t, T.left - 0.2, T.left + 0.4);
      if (kl > 0) chalk(g, [[X0 - 290, yNew - 44], [X0 + 7 * DX + 10, yNew - 44], [X0 + 7 * DX + 10, yNew + 18], [X0 - 290, yNew + 18], [X0 - 290, yNew - 44]], { w: 4, color: E.accent, seed: 62, k: kl });
      ctext(g, 'LEFT OVER', X0 + 7 * DX + 30, yNew - 4, prog(t, T.left, T.left + 0.4), '500 28px "IBM Plex Mono"', E.accent);
      // "pair them up": mũi tên số đếm ↔ hàng
      ROWS.forEach((r, i) => { const a = T.pair + i * 0.08, y = Y0 + 98 + i * DY;
        chalk(g, seg(X0 - 210, y, X0 - 190, y, 2), { w: 3, color: E.accent, seed: 70 + i, k: prog(t, a, a + 0.15), jit: 0.5 }); });
    });
    // người dẫn đường: một lần trong lập luận đường chéo, đứng bên phải
    if (t > T.list - 0.5) away(g, prog(t, T.s171 - 0.4, T.s171 + 0.1), 0, 760, () =>
      figure(g, 'chalk', 1620, 1080, 600, 'chalk', prog(t, T.list - 0.3, T.list + 0.1), { flip: true }));

    // ── 4. giận dữ · "corrupter of youth" (gọi lại mở bài) ──
    if (t > T.s171 - 0.4) away(g, prog(t, T.s172 - 0.3, T.s172 + 0.3), 0, -1100, () => {
      for (let i = 0; i < 9; i++) { const a = T.furious + i * 0.08, k = prog(t, a, a + 0.18); if (k <= 0) continue;
        const x = 260 + hash(i * 3.3) * 1400, y = 450 + hash(i * 5.1 + 2) * 480;
        if (Math.abs(x - 960) < 420 && Math.abs(y - 640) < 90) continue;
        g.save(); g.translate(x, y); g.rotate((hash(i) - 0.5) * 0.5); g.scale(outBack(k), outBack(k)); ctext(g, '!', 0, 0, 1, '800 92px "Archivo"', E.dim, { align: 'center' }); g.restore(); }
      stamp(g, 'CORRUPTER OF YOUTH', 960, 640, prog(t, T.corrupter - 0.05, T.corrupter + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.05 });
    });

    // ── 5. lý thuyết tập hợp: { } — số, hàm, hình đều là tập hợp; nền móng ──
    if (t > T.s172 - 0.3) {
      const kb = prog(t, T.set - 0.1, T.set + 0.5);
      chalk(g, brace(300, 470, 860, 1), { w: 6, color: E.accent, seed: 80, k: kb });
      chalk(g, brace(1620, 470, 860, -1), { w: 6, color: E.accent, seed: 81, k: kb });
      ctext(g, 'SET THEORY', 960, 420, prog(t, T.theory - 0.1, T.theory + 0.4), '800 46px "Archivo"', E.ink, { align: 'center' });
      ctext(g, 'A COMMON LANGUAGE', 960, 456, prog(t, T.language - 0.2, T.language + 0.5), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
      [['NUMBERS', '3 = { 0, 1, 2 }', T.numbers], ['FUNCTIONS', 'f(x) = x²  =  { (x, x²) }', T.functions], ['SHAPES', 'circle = { (x, y) : x² + y² = 1 }', T.shapes]].forEach(([lab, s, a], i) => {
        const y = 570 + i * 115;
        ctext(g, lab, 380, y, prog(t, a - 0.1, a + 0.3), '500 24px "IBM Plex Mono"', E.dim);
        ctext(g, s, 620, y + 4, prog(t, a, a + 0.7), 'italic 600 54px "Cormorant Garamond"', E.ink);
      });
      const kf = prog(t, T.foundation - 0.2, T.foundation + 0.6);
      chalk(g, [[300, 905], [1620, 905], [1620, 975], [300, 975], [300, 905]], { w: 4, color: E.ink, seed: 90, k: kf });
      ctext(g, 'SETS', 960, 954, prog(t, T.sets174 - 0.1, T.sets174 + 0.3), '800 38px "Archivo"', E.accent, { align: 'center' });
      ctext(g, 'MODERN MATHEMATICS', 320, 890, prog(t, T.modern - 0.1, T.modern + 0.5), '500 18px "IBM Plex Mono"', E.dim);
    }
  }
}
