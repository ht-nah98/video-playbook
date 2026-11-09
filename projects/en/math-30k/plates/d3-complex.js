// Hồi 4 · "1799 to 1831 — the complex plane" (SCRIPT.md) — giấy in. Câu 116–128 của p2.
//   116–117 i = √−1, Cardano 1545, dấu "A TRICK"   ·  118 nét vạch thành trục số
//   119 Wessel 1799 · Argand 1806 (chỉ tên — không có chân dung) · i lơ lửng trên trục
//   120 chân dung Gauss (khắc) · 121 trục số QUAY 90° quanh 0 thành trục ảo (DNA §7), lưới mặt phẳng
//   122 nhãn thực / ảo · 123 mọi điểm là một số phức, 3 + 2i · 124 nhân i = quay 1/4: 3 + 2i → −2 + 3i (tính)
//   125 i · i = −1: hai lần quay 1/4 · 126 điểm quay trên vòng tròn vẽ ra sóng sin · 127 iℏ ∂ψ/∂t = Ĥψ, chữ i màu nhấn
//   128 bỏ số phức đi: vòng tròn co về một điểm, sóng duỗi thẳng thành một nét vạch (cảnh sau mở bằng "draw a straight line")
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, portrait, stamp, lookup } from '../kit.js';

const E = ERA.paper;
const O = [900, 680], S = 72;
const P = (re, im) => [O[0] + re * S, O[1] - im * S];
const mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];      // nhân số phức
const Z = [3, 2], IZ = mul([0, 1], Z);                                // i · (3 + 2i) = −2 + 3i
const cstr = ([a, b]) => `${a < 0 ? '−' : ''}${Math.abs(a)} ${b < 0 ? '−' : '+'} ${Math.abs(b)}i`;
const DOTS = [[-4, 1], [-3, -2], [-1, 2], [1, -3], [2, 1], [4, -1], [-2, -3], [4, 3], [-4, -3], [1, 3], [-1, -1], [3, -3], [-3, 2], [5, -2]];
const ring = (cx, cy, r, a0, a1, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; });
function arrowHead(g, x, y, ang, color, sz = 16) {
  g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = color; g.beginPath(); g.moveTo(0, 0); g.lineTo(-sz, -sz * 0.45); g.lineTo(-sz, sz * 0.45); g.fill(); g.restore();
}
// ψ và ℏ không có trong Cormorant: vẽ bằng nét, nghiêng theo chữ nghiêng
function psi(g, x, y, F, color) {
  g.save(); g.translate(x, y); g.transform(1, 0, -0.2, 1, 0, 0); g.strokeStyle = color; g.lineWidth = F * 0.052; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0.04 * F, -0.40 * F); g.bezierCurveTo(0.02 * F, -0.12 * F, 0.12 * F, 0.02 * F, 0.30 * F, 0.02 * F);
  g.bezierCurveTo(0.48 * F, 0.02 * F, 0.58 * F, -0.16 * F, 0.56 * F, -0.42 * F); g.stroke();
  g.beginPath(); g.moveTo(0.31 * F, -0.68 * F); g.lineTo(0.30 * F, 0.26 * F); g.stroke(); g.restore();
  return 0.66 * F;
}
function hbar(g, x, y, F, color, font) {
  g.save(); g.font = font; g.fillStyle = color; g.fillText('h', x, y); const w = g.measureText('h').width;
  g.strokeStyle = color; g.lineWidth = F * 0.045; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 0.06 * F, y - 0.50 * F); g.lineTo(x + 0.40 * F, y - 0.60 * F); g.stroke(); g.restore();
  return w;
}

export default class Complex {
  static ERA = 'paper';
  static IMAGES = { gauss: './assets/history/Carl_Friedrich_Gauss_1840_by_Jensen.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      s116: L(116).start, imaginary: w(116, 'imaginary'),
      cardano: w(117, 'cardano'), trick: w(117, 'trick'),
      idea: w(118, 'idea'), simple: w(118, 'simple'),
      ninety: w(119, 'ninety-nine'), wessel: w(119, 'wessel'), six: w(119, 'six'), argand: w(119, 'argand'), picture: w(119, 'picture'),
      gauss: w(120, 'gauss'), standard: w(120, 'standard'),
      one: w(121, 'one-dimensional'), widen: w(121, 'widen'), two: w(121, 'two-dimensional'), plane: w(121, 'plane'),
      horizontal: w(122, 'horizontal'), real: w(122, 'real'), vertical: w(122, 'vertical'), imag2: w(122, 'imaginary'),
      point: w(123, 'point'), complex: w(123, 'complex'),
      multiplying: w(124, 'multiplying'), quarter: w(124, 'quarter'), turn: w(124, 'turn'),
      s125: L(125).start, mystery: w(125, 'mystery'), gone: w(125, 'gone'),
      s126: L(126).start, waves: w(126, 'waves'), vibrations: w(126, 'vibrations'), alternating: w(126, 'alternating'), quantum: w(126, 'quantum'),
      schrodinger: w(127, 'schrödinger'), equation: w(127, 'equation'), letter: w(127, 'letter'), i: w(127, 'i'),
      complex3: w(128, 'complex'), physics: w(128, 'physics'),
    };
    this.START = this.T.s116;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');
    card(g, 'paper', prog(t, this.FROM, this.START + 1.4), 'ACT FOUR · THE LANGUAGE OF CHANGE', '1799–1831', 'The complex plane');
    ruler(g, 'paper', 1806, prog(t, this.FROM + 0.4, this.START + 0.8));

    // ── 116–125: mặt phẳng phức (cả trang trượt lên ở câu 126) ──
    const up = outCubic(prog(t, T.s126 - 0.2, T.s126 + 0.5));
    if (up < 1) {
      g.save(); g.translate(0, -up * 1100);
      // √−1, "a trick" — khối bên phải, trượt ra khi Gauss vào
      const bOut = outCubic(prog(t, T.gauss - 0.5, T.gauss + 0.1));
      if (bOut < 1) {
        g.save(); g.translate(bOut * 700, 0);
        typed(g, 'i = √−1', 1380, 520, prog(t, T.imaginary - 0.1, T.imaginary + 0.5), 'italic 600 96px "Cormorant Garamond"', E.ink);
        typed(g, '√−1: CARDANO, 1545 · i: EULER, 1777', 1384, 584, prog(t, T.cardano - 0.1, T.cardano + 0.5), '500 22px "IBM Plex Mono"', E.dim);
        stamp(g, 'A TRICK', 1560, 680, prog(t, T.trick - 0.05, T.trick + 0.25), '800 46px "Archivo"', E.ink, { rot: -0.07 });
        g.restore();
      }
      // Wessel · Argand — tên, không chân dung
      typed(g, '1799', 110, 450, prog(t, T.ninety - 0.3, T.ninety + 0.2), '800 46px "Archivo"', E.ink);
      typed(g, 'Caspar Wessel', 110, 496, prog(t, T.wessel - 0.1, T.wessel + 0.5), 'italic 600 40px "Cormorant Garamond"', E.ink);
      typed(g, '1806', 110, 580, prog(t, T.six - 0.3, T.six + 0.2), '800 46px "Archivo"', E.ink);
      typed(g, 'Jean-Robert Argand', 110, 626, prog(t, T.argand - 0.1, T.argand + 0.6), 'italic 600 40px "Cormorant Garamond"', E.ink);
      // Gauss
      const gOut = outCubic(prog(t, T.widen - 0.1, T.widen + 0.5));
      if (t >= T.gauss - 0.3 && gOut < 1) {
        g.save(); g.translate(gOut * 800, 0);
        portrait(g, 'gauss', 'paper', 1420, 370, 420, prog(t, T.gauss - 0.3, T.gauss + 0.4),
          { style: 'engrave', rot: 0.012, label: { name: 'Carl Friedrich Gauss', life: '1777–1855' } });
        g.restore();
      }
      // lưới mặt phẳng ("two-dimensional plane")
      const kg = prog(t, T.two - 0.1, T.plane + 0.5);
      if (kg > 0) {
        g.save(); g.strokeStyle = 'rgba(133,122,102,0.35)'; g.lineWidth = 1;
        for (let i = -5; i <= 5; i++) if (i) { g.beginPath(); g.moveTo(O[0] + i * S, O[1] - 4.3 * S); g.lineTo(O[0] + i * S, O[1] - 4.3 * S + 8.6 * S * kg); g.stroke(); }
        for (let j = -4; j <= 4; j++) if (j) { g.beginPath(); g.moveTo(O[0] - 5.3 * S, O[1] - j * S); g.lineTo(O[0] - 5.3 * S + 10.6 * S * kg, O[1] - j * S); g.stroke(); }
        g.restore();
      }
      // trục số: nét vạch ở "idea", vạch chia ở "simple"
      const kl = prog(t, T.idea - 0.1, T.idea + 0.6);
      hand(g, seg(O[0] - 5.5 * S, O[1], O[0] + 5.5 * S, O[1], 40), { w: 3, color: E.ink, jit: 0.7, seed: 3, k: kl });
      if (kl >= 1) { arrowHead(g, O[0] + 5.5 * S + 6, O[1], 0, E.ink); arrowHead(g, O[0] - 5.5 * S - 6, O[1], Math.PI, E.ink); }
      const kt = prog(t, T.simple - 0.2, T.simple + 0.4);
      g.save(); g.strokeStyle = E.ink; g.lineWidth = 2;
      for (let i = -5; i <= 5; i++) { if (prog(t, T.simple - 0.2 + (i + 5) * 0.03, T.simple + (i + 5) * 0.03) <= 0) continue;
        g.beginPath(); g.moveTo(O[0] + i * S, O[1] - 8); g.lineTo(O[0] + i * S, O[1] + 8); g.stroke(); }
      g.restore();
      // số thực ghi dưới trục; 0 ghi từ đầu (gốc quay)
      typed(g, '0', O[0] - 10, O[1] + 30, kt, '500 20px "IBM Plex Mono"', E.ink, { align: 'right' });
      for (let i = -5; i <= 5; i++) if (i) typed(g, (i < 0 ? '−' : '') + Math.abs(i), O[0] + i * S, O[1] + 34, prog(t, T.real - 0.1 + (i + 5) * 0.03, T.real + 0.1 + (i + 5) * 0.03), '500 20px "IBM Plex Mono"', E.ink, { align: 'center' });
      typed(g, 'REAL', O[0] + 5.5 * S + 24, O[1] + 8, prog(t, T.horizontal - 0.1, T.real + 0.3), '500 22px "IBM Plex Mono"', E.ink);
      // trục ảo: CHÍNH trục số quay 90° quanh 0
      const kw = outCubic(prog(t, T.widen - 0.1, T.widen + 0.9));
      if (kw > 0) {
        const a = -Math.PI / 2 * kw;
        g.save(); g.translate(O[0], O[1]); g.rotate(a); g.strokeStyle = E.accent; g.lineWidth = 3;
        g.beginPath(); g.moveTo(-4.3 * S, 0); g.lineTo(4.5 * S, 0); g.stroke();
        g.lineWidth = 2; for (let i = -4; i <= 4; i++) if (i) { g.beginPath(); g.moveTo(i * S, -8); g.lineTo(i * S, 8); g.stroke(); }
        if (kw >= 1) arrowHead(g, 4.5 * S + 6, 0, 0, E.accent);
        g.restore();
        if (kw < 1) { g.save(); g.strokeStyle = E.accent; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.arc(O[0], O[1], 2.2 * S, -Math.PI / 2 * kw, 0); g.stroke(); g.restore(); }
      }
      ['−4i', '−3i', '−2i', '−i', '', '', '2i', '3i', '4i'].forEach((s, j) => { const im = j - 4; if (!s) return;
        typed(g, s, O[0] - 16, O[1] - im * S + 7, prog(t, T.imag2 - 0.2 + j * 0.04, T.imag2 + j * 0.04), '500 20px "IBM Plex Mono"', E.accent, { align: 'right' }); });
      typed(g, 'IMAGINARY', O[0] + 22, O[1] - 4.5 * S + 6, prog(t, T.vertical - 0.1, T.imag2 + 0.4), '500 22px "IBM Plex Mono"', E.accent);
      // i hiện lên PHÍA TRÊN trục số ("showed how to picture them")
      const ki = prog(t, T.picture - 0.1, T.picture + 0.25), pi = P(0, 1);
      if (ki > 0) { g.fillStyle = E.accent; g.beginPath(); g.arc(pi[0], pi[1], 9 * outBack(ki), 0, 7); g.fill(); }
      typed(g, 'i', pi[0] - 16, pi[1] + 7, prog(t, T.picture, T.picture + 0.2), 'italic 600 44px "Cormorant Garamond"', E.accent, { align: 'right' });
      // mọi điểm là một số phức
      DOTS.forEach(([a, b], i) => { const at = T.point + i * 0.05, k = prog(t, at, at + 0.2); if (k <= 0) return;
        const q = P(a, b); g.fillStyle = E.dim; g.beginPath(); g.arc(q[0], q[1], 5 * outBack(k), 0, 7); g.fill(); });
      // 3 + 2i, rồi nhân i: quay 1/4 quanh 0 → −2 + 3i
      const kz = prog(t, T.complex - 0.1, T.complex + 0.3);
      if (kz > 0) {
        const th = Math.PI / 2 * outCubic(prog(t, T.quarter - 0.1, T.turn + 0.5));
        const z = [Z[0] * Math.cos(th) - Z[1] * Math.sin(th), Z[0] * Math.sin(th) + Z[1] * Math.cos(th)], q = P(...z), q0 = P(...Z);
        if (th === 0) { g.save(); g.setLineDash([7, 7]); g.strokeStyle = E.ink; g.lineWidth = 2; g.beginPath(); g.moveTo(q0[0], O[1]); g.lineTo(q0[0], q0[1]); g.lineTo(O[0], q0[1]); g.stroke(); g.restore(); }
        if (th > 0) { // cung quay + vết điểm cũ
          const r = Math.hypot(...Z) * S, a0 = Math.atan2(Z[1], Z[0]);
          hand(g, ring(O[0], O[1], r, a0, a0 + th, 40), { w: 3, color: E.accent, jit: 0.5, seed: 9 });
          g.strokeStyle = E.ink; g.lineWidth = 2.5; g.beginPath(); g.arc(q0[0], q0[1], 9, 0, 7); g.stroke();
        }
        const kv = prog(t, T.multiplying - 0.1, T.multiplying + 0.4);
        if (kv > 0) { g.save(); g.strokeStyle = E.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(O[0], O[1]); g.lineTo(O[0] + (q[0] - O[0]) * kv, O[1] + (q[1] - O[1]) * kv); g.stroke(); g.restore(); }
        g.fillStyle = E.accent; g.beginPath(); g.arc(q[0], q[1], 11 * outBack(kz), 0, 7); g.fill();
        typed(g, cstr(Z), q0[0] + 20, q0[1] - 16, kz, 'italic 600 44px "Cormorant Garamond"', E.ink);
        typed(g, cstr(IZ), P(...IZ)[0] - 20, P(...IZ)[1] - 18, prog(t, T.turn + 0.3, T.turn + 0.7), 'italic 600 44px "Cormorant Garamond"', E.accent, { align: 'right' });
      }
      typed(g, `i · (${cstr(Z)}) = ${cstr(IZ)}`, 1370, 470, prog(t, T.multiplying - 0.1, T.turn + 0.6), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, '× i = A QUARTER TURN', 1374, 510, prog(t, T.quarter - 0.1, T.turn + 0.3), '500 20px "IBM Plex Mono"', E.accent);
      // i · i = −1: 1 → i → −1, hai lần quay 1/4
      const km = prog(t, T.s125 - 0.1, T.gone + 0.2);
      if (km > 0) {
        hand(g, ring(O[0], O[1], S, 0, Math.PI * km, 40), { w: 4, color: E.accent, jit: 0.4, seed: 17 });
        const q = P(Math.cos(Math.PI * km), Math.sin(Math.PI * km)); g.fillStyle = E.accent; g.beginPath(); g.arc(q[0], q[1], 8, 0, 7); g.fill();
      }
      typed(g, 'i · i = −1', 1370, 830, prog(t, T.mystery - 0.2, T.mystery + 0.4), 'italic 600 64px "Cormorant Garamond"', E.accent);
      typed(g, 'TWO QUARTER TURNS = A HALF TURN', 1374, 874, prog(t, T.gone - 0.2, T.gone + 0.6), '500 18px "IBM Plex Mono"', E.ink);
      g.restore();
    }

    // ── 126–128: vòng tròn quay vẽ ra sóng; phương trình Schrödinger ──
    if (t >= T.s126 - 0.2) {
      const din = 1 - outCubic(prog(t, T.s126 - 0.2, T.s126 + 0.5));
      g.save(); g.translate(0, din * 1100);
      const cx = 330, cy = 590, x0 = 560, x1 = 1780, lam = 400;
      const amp = 130 * (1 - outCubic(prog(t, T.complex3 - 0.1, T.complex3 + 0.8)));   // "no complex numbers": vòng co lại, sóng duỗi thẳng
      const th = 2 * Math.PI * 0.32 * Math.max(0, t - T.s126);
      g.save(); g.strokeStyle = E.dim; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx - 160, cy); g.lineTo(cx + 160, cy); g.moveTo(cx, cy - 160); g.lineTo(cx, cy + 160); g.stroke(); g.restore();
      if (amp > 0.5) hand(g, ring(cx, cy, amp, 0, Math.PI * 2, 80), { w: 3, color: E.ink, jit: 0.5, seed: 21 });
      const pz = [cx + amp * Math.cos(th), cy - amp * Math.sin(th)];
      g.save(); g.strokeStyle = E.ink; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(pz[0], pz[1]); g.stroke();
      g.setLineDash([6, 8]); g.lineWidth = 1.5; g.beginPath(); g.moveTo(pz[0], pz[1]); g.lineTo(x0, pz[1]); g.stroke(); g.restore();
      const kw = prog(t, T.waves - 0.3, T.waves + 1.4), xe = x0 + (x1 - x0) * kw;
      if (kw > 0) {
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath();
        for (let x = x0; x <= xe; x += 4) { const y = cy - amp * Math.sin(th - 2 * Math.PI * (x - x0) / lam); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); }
        g.stroke(); g.restore();
      }
      g.fillStyle = E.accent; g.beginPath(); g.arc(pz[0], pz[1], 10, 0, 7); g.fill();
      g.beginPath(); g.arc(x0, pz[1], 7, 0, 7); g.fill();
      // waves · vibrations · alternating current · quantum mechanics
      const words = [['WAVES', T.waves], [' · VIBRATIONS', T.vibrations], [' · ALTERNATING CURRENT', T.alternating], [' · QUANTUM MECHANICS', T.quantum]];
      let str = '', n = 0; for (const [s, a] of words) { str += s; n += Math.round(s.length * prog(t, a - 0.1, a + 0.4)); }
      typed(g, str, x0, 800, n / str.length, '500 22px "IBM Plex Mono"', E.ink);
      // iℏ ∂ψ/∂t = Ĥψ — chữ i màu nhấn
      const F = 96, font = `italic 600 ${F}px "Cormorant Garamond"`, ke = prog(t, T.equation - 0.2, T.equation + 0.8);
      if (ke > 0) {
        g.save(); g.font = font;
        const parts = [['i', E.accent], ['ℏ'], [' ∂'], ['ψ'], ['/∂t = Ĥ'], ['ψ']];
        const wid = p => p === 'ψ' ? 0.66 * F : p === 'ℏ' ? g.measureText('h').width : g.measureText(p).width + (p === 'i' ? 14 : 0);
        const total = parts.reduce((a, [p]) => a + wid(p), 0);
        let x = 1170 - total / 2; const y = 960, show = ke * parts.length;
        parts.forEach(([p, c = E.ink], j) => { if (j >= show) return;
          if (p === 'ψ') psi(g, x, y, F, c); else if (p === 'ℏ') hbar(g, x, y, F, c, font); else { g.fillStyle = c; g.fillText(p, x, y); }
          if (j === 0) this._ix = x + wid(p) / 2;
          x += wid(p); });
        g.restore();
        const kc = prog(t, T.letter, T.i + 0.4);
        if (kc > 0) hand(g, ring(this._ix ?? 900, y - 30, 46, Math.PI / 2, Math.PI / 2 + 2 * Math.PI, 50), { w: 3, color: E.accent, jit: 1.5, seed: 27, k: kc });
      }
      typed(g, 'SCHRÖDINGER EQUATION', 110, 950, prog(t, T.schrodinger - 0.1, T.schrodinger + 0.6), '500 22px "IBM Plex Mono"', E.dim);
      g.restore();
    }
  }
}
