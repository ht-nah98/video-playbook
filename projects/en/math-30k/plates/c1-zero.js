// Hồi 3 · "628 — Brahmagupta and zero" (SCRIPT.md) — giấy chép tay, mực nâu sắt, son đỏ. Câu 24–37 của p2.
//   L24 Greece · Rome — chưa có 0 · L25–27 bảng HUNDREDS|TENS|ONES: 3 ở hàng chục (30) và hàng trăm (300), cộng theo cột
//   L28–31 số La Mã: XXX · CCC · một X luôn là mười · ô trống "?" (CCCV = 305) · cộng vụng · bàn tính đá cuội
//   L32–34 bản thảo Bakhshali · luật của 0 (a + 0, a − 0, a × 0) · 0 vào ô trống, tham gia phép tính
//   L35–37 0 + hệ vị trí = hệ số hôm nay (628 trong bảng) · cùng chữ 3 trượt giữa các cột, giá trị đổi theo chỗ đứng
import { ERA, W, clamp, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, actTitle, portrait, lookup } from '../kit.js';

const E = ERA.parchment;
const ROM = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const roman = n => ROM.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, '');
const digits = n => String(n).padStart(3, ' ').split('');               // [trăm, chục, đơn vị]; ' ' = ô trống
// bảng hàng: HUNDREDS | TENS | ONES
const TB = { x: 920, cw: 220, top: 400, head: 440, rule: 462, r: [570, 690, 830], bot: 880, val: 1610 };
const cx = c => TB.x + TB.cw * (c + 0.5);
const DIG = 'italic 600 96px "Cormorant Garamond"', VAL = 'italic 600 64px "Cormorant Garamond"';
const ADD = [27, 14], B = 300;                                       // La Mã 27 + 14; L27: 30 + 300 — tính bằng số

/** chữ nhiều màu viết dần: parts = [[chuỗi, màu], …] */
function typedParts(g, parts, x, y, k, font) {
  const total = parts.reduce((a, [s]) => a + s.length, 0); let n = Math.round(total * clamp(k)); if (!n) return;
  g.save(); g.font = font; g.textAlign = 'left';
  for (const [s, c] of parts) { if (n <= 0) break; const p = s.slice(0, n); g.fillStyle = c; g.fillText(p, x, y); x += g.measureText(s).width; n -= s.length; }
  g.restore();
}
function text(g, s, x, y, font, color, align = 'left') { g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.fillText(s, x, y); g.restore(); }
function ellipse(cx0, cy0, rx, ry, n = 48) { return Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + i / n * Math.PI * 2; return [cx0 + rx * Math.cos(a), cy0 + ry * Math.sin(a)]; }); }
function dashedRect(g, x, y, w, h, k, color = E.dim) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = 3; g.setLineDash([12, 10]); g.beginPath();
  const p = 2 * (w + h) * clamp(k), pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]; let left = p; g.moveTo(x, y);
  for (let i = 1; i < pts.length && left > 0; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], L = Math.hypot(bx - ax, by - ay), f = Math.min(1, left / L);
    g.lineTo(ax + (bx - ax) * f, ay + (by - ay) * f); left -= L; }
  g.stroke(); g.restore();
}
/** khung bảng hàng: viền + tiêu đề cột viết vào theo k, kh */
function table(g, k, kh) {
  if (k <= 0) return;
  for (let c = 0; c <= 3; c++) hand(g, seg(TB.x + c * TB.cw, TB.top, TB.x + c * TB.cw, TB.bot, 12), { w: 2.5, color: E.dim, jit: 1, seed: 40 + c, k });
  hand(g, seg(TB.x - 10, TB.rule, TB.x + 3 * TB.cw + 10, TB.rule, 20), { w: 2.5, color: E.ink, jit: 1, seed: 44, k });
  ['HUNDREDS', 'TENS', 'ONES'].forEach((s, c) => typed(g, s, cx(c), TB.head, kh * 3 - c, '500 24px "IBM Plex Mono"', E.ink, { align: 'center' }));
}

export default class Zero {
  static ERA = 'parchment';
  static IMAGES = { bakhshali: './assets/history/Bakhshali_manuscript.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      greece: w(24, 'greece'), rome: w(24, 'rome'), zero0: w(24, 'zero'), number0: w(24, 'number'),
      l25: L(25).start, way: w(25, 'way'),
      three1: w(26, 'three', 1), thirty: w(26, 'thirty'), three2: w(26, 'three', 2), hundred: w(26, 'hundred'),
      places26: w(26, 'places'),
      add27: w(27, 'add'), mult27: w(27, 'multiply'), ones: w(27, 'ones'), tens: w(27, 'tens'), hundreds: w(27, 'hundreds'),
      l28: L(28).start, numerals28: w(28, 'numerals'), work28: w(28, 'work'),
      x29: w(29, 'x'), ten29: w(29, 'ten'), wherever: w(29, 'wherever'), stands29: w(29, 'stands'),
      places30: w(30, 'places'), columns30: w(30, 'columns'), empty30: w(30, 'empty'), place30: w(30, 'place'),
      l31: L(31).start, adding31: w(31, 'adding'), awkward: w(31, 'awkward'), fingers: w(31, 'fingers'), counting: w(31, 'counting'), board: w(31, 'board'),
      l32: L(32).start, indian32: w(32, 'indian'), brahma: w(32, 'brahmagupta'), book32: w(32, 'book'), bss: w(32, 'brahmasphutasiddhanta'),
      history: w(33, 'history'), rules: w(33, 'rules'), real: w(33, 'real'),
      adding33: w(33, 'adding'), subtracting: w(33, 'subtracting'), multiplying33: w(33, 'multiplying'),
      l34: L(34).start, empty34: w(34, 'empty'), number34: w(34, 'number'), calc34: w(34, 'calculation'),
      l35: L(35).start, zero35: w(35, 'zero'), baseten: w(35, 'base-ten'), pv: w(35, 'place-value'), built: w(35, 'built'),
      number36: w(36, 'number'), system36: w(36, 'system'), today36: w(36, 'today'),
      symbol37: w(37, 'symbol'), value37: w(37, 'value'), depends: w(37, 'depends'), stands37: w(37, 'stands'),
    };
    this.START = L(24).start;
    this.FROM = this.START - 2.3;
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'parchment');
    actTitle(g, 'parchment', t, S, 'ACT THREE', 'The numbers grow');
    card(g, 'parchment', prog(t, S - 0.3, S + 1.5), 'ACT THREE · THE NUMBERS GROW', '628', 'Brahmagupta and zero');
    ruler(g, 'parchment', 628, prog(t, S + 0.5, S + 1.5));

    // ── L24: Greece, Rome — và cái họ không có: 0 như một con số ──
    const o24 = outCubic(prog(t, T.l25 - 0.2, T.l25 + 0.4));
    if (t >= T.greece - 0.1 && o24 < 1) {
      g.save(); g.translate(o24 * 1100, 0);
      typed(g, 'GREECE', 1000, 500, prog(t, T.greece, T.greece + 0.35), '800 64px "Archivo"', E.ink);
      typed(g, 'ROME', 1000, 600, prog(t, T.rome, T.rome + 0.3), '800 64px "Archivo"', E.ink);
      ['GREECE', 'ROME'].forEach((s, i) => typed(g, 'NO 0', 1310, 500 + i * 100, prog(t, T.zero0 - 0.3 + i * 0.12, T.zero0 - 0.1 + i * 0.12), '500 24px "IBM Plex Mono"', E.dim));
      hand(g, ellipse(1560, 520, 92, 132), { w: 13, color: E.accent, jit: 2, seed: 9, k: prog(t, T.zero0, T.zero0 + 0.5) });
      typed(g, 'AS A NUMBER', 1560, 720, prog(t, T.number0, T.number0 + 0.4), '500 26px "IBM Plex Mono"', E.accent, { align: 'center' });
      g.restore();
    }

    // ── L25–27: bảng hàng; 3 ở hàng chục = 30, ở hàng trăm = 300; cộng theo cột ──
    const o27 = outCubic(prog(t, T.l28 - 0.2, T.l28 + 0.4));
    if (t >= T.l25 && o27 < 1) {
      g.save(); g.translate(o27 * 1200, 0);
      table(g, prog(t, T.l25, T.l25 + 0.7), prog(t, T.way - 0.2, T.way + 0.5));
      // hàng 1: 3 ở cột chục, 0 giữ chỗ cột đơn vị → 30
      typed(g, '3', cx(1), TB.r[0], prog(t, T.three1, T.three1 + 0.2), DIG, E.ink, { align: 'center' });
      typed(g, '0', cx(2), TB.r[0], prog(t, T.thirty, T.thirty + 0.2), DIG, E.accent, { align: 'center' });
      typed(g, '= 30', TB.val, TB.r[0] - 10, prog(t, T.thirty + 0.2, T.thirty + 0.5), VAL, E.ink);
      // hàng 2: chữ 3 trượt từ cột chục (hàng 1) sang cột trăm (hàng 2), hai số 0 giữ chỗ → 300
      const m = outCubic(prog(t, T.three2, T.three2 + 0.6));
      if (t >= T.three2) text(g, '3', cx(1) + (cx(0) - cx(1)) * m, TB.r[0] + (TB.r[1] - TB.r[0]) * m, DIG, E.ink, 'center');
      [1, 2].forEach(c => typed(g, '0', cx(c), TB.r[1], prog(t, T.hundred + (c - 1) * 0.15, T.hundred + (c - 1) * 0.15 + 0.2), DIG, E.accent, { align: 'center' }));
      typed(g, '= 300', TB.val, TB.r[1] - 10, prog(t, T.hundred + 0.3, T.hundred + 0.6), VAL, E.ink);
      // "different places": khoanh hai chữ 3, mỗi cái một chỗ
      [[1, 0], [0, 1]].forEach(([c, r], i) => hand(g, ellipse(cx(c), TB.r[r] - 32, 62, 62, 32), { w: 4, color: E.accent, jit: 1.5, seed: 70 + i, k: prog(t, T.places26 - 0.2 + i * 0.2, T.places26 + 0.2 + i * 0.2) }));
      typed(g, 'ZERO HOLDS THE EMPTY PLACE', cx(1), 960, prog(t, T.places26 + 0.2, T.places26 + 1.0), '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
      // L27: cộng theo cột 30 + 300; × 10 = trượt một cột
      typed(g, '+', TB.x - 60, TB.r[1] - 10, prog(t, T.add27, T.add27 + 0.2), VAL, E.ink);
      hand(g, seg(TB.x - 70, TB.r[1] + 40, TB.x + 3 * TB.cw, TB.r[1] + 40, 20), { w: 4, color: E.ink, jit: 1, seed: 80, k: prog(t, T.add27, T.add27 + 0.5) });
      const arc = Array.from({ length: 25 }, (_, i) => { const a = -Math.PI / 2 + i / 24 * Math.PI; return [TB.x - 100 - 70 * Math.cos(a), (TB.r[0] + TB.r[1]) / 2 - 40 + 62 * Math.sin(a)]; });
      hand(g, arc, { w: 4, color: E.accent, jit: 1, seed: 81, k: prog(t, T.mult27, T.mult27 + 0.45) });
      if (prog(t, T.mult27 + 0.35, T.mult27 + 0.5) > 0) { const [ex, ey] = arc.at(-1); hand(g, [[ex + 16, ey - 12], [ex, ey], [ex + 18, ey + 10]], { w: 4, color: E.accent, jit: 0.5, seed: 82 }); }
      typed(g, '× 10', TB.x - 185, (TB.r[0] + TB.r[1]) / 2 - 22, prog(t, T.mult27 + 0.2, T.mult27 + 0.6), VAL, E.accent, { align: 'right' });
      const sum = digits(30 + B), tw = [T.hundreds, T.tens, T.ones];
      for (let c = 0; c < 3; c++) {
        const a = tw[c], hl = prog(t, a - 0.1, a + 0.1) * (1 - prog(t, a + 0.3, a + 0.45));
        if (hl > 0) { g.save(); g.globalAlpha = 0.16 * hl; g.fillStyle = E.accent; g.fillRect(TB.x + c * TB.cw + 6, TB.rule + 8, TB.cw - 12, TB.bot - TB.rule - 16); g.restore(); }
        typed(g, sum[c], cx(c), TB.r[2], prog(t, a, a + 0.2), DIG, sum[c] === '0' ? E.accent : E.ink, { align: 'center' });
      }
      typed(g, `= ${30 + B}`, TB.val, TB.r[2] - 10, prog(t, T.hundreds + 0.3, T.hundreds + 0.6), VAL, E.ink);
      g.restore();
    }

    // ── L28–31: số La Mã — không có chỗ, không có cột, không có số cho chỗ trống ──
    const o31 = outCubic(prog(t, T.l32 - 0.3, T.l32 + 0.4));
    if (t >= T.l28 - 0.1 && o31 < 1) {
      g.save(); g.translate(0, o31 * 900);
      typed(g, roman(30), 140, 530, prog(t, T.l28, T.l28 + 0.3), DIG, E.ink);
      typed(g, '= 30', 420, 520, prog(t, T.l28 + 0.3, T.l28 + 0.6), VAL, E.dim);
      typed(g, roman(300), 140, 660, prog(t, T.numerals28, T.numerals28 + 0.3), DIG, E.ink);
      typed(g, '= 300', 420, 650, prog(t, T.numerals28 + 0.3, T.numerals28 + 0.6), VAL, E.dim);
      typed(g, 'NO PLACE VALUE', 140, 400, prog(t, T.work28, T.work28 + 0.5), '500 24px "IBM Plex Mono"', E.accent);
      // L31: cộng vụng: 27 + 14 = 41 bằng chữ La Mã (tính bằng số)
      typed(g, `${roman(ADD[0])} + ${roman(ADD[1])} = ${roman(ADD[0] + ADD[1])}`, 140, 800, prog(t, T.adding31, T.adding31 + 0.9), 'italic 600 54px "Cormorant Garamond"', E.ink);
      const wav = Array.from({ length: 40 }, (_, i) => [140 + i * 12, 830 + Math.sin(i * 1.3) * 7]);
      hand(g, wav, { w: 4, color: E.accent, jit: 1, seed: 90, k: prog(t, T.awkward, T.awkward + 0.5) });
      typed(g, 'ON FINGERS', 140, 900, prog(t, T.fingers - 0.1, T.fingers + 0.3), '500 26px "IBM Plex Mono"', E.dim);
      typed(g, '· ON A COUNTING BOARD', 330, 900, prog(t, T.counting - 0.1, T.counting + 0.5), '500 26px "IBM Plex Mono"', E.dim);

      // L29–30 (bên phải): một X trượt đi đâu cũng là mười · ô trống "?"
      const o30 = outCubic(prog(t, T.l31 - 0.2, T.l31 + 0.4));
      if (o30 < 1) {
        g.save(); g.translate(o30 * 1100, 0);
        const kx = prog(t, T.x29 - 0.05, T.x29 + 0.25);
        hand(g, seg(1000, 600, 1700, 600, 30), { w: 2.5, color: E.dim, jit: 1, seed: 91, k: kx });
        if (kx > 0) {
          const p = [1060, 1360, 1640], m1 = outCubic(prog(t, T.wherever, T.wherever + 0.5)), m2 = outCubic(prog(t, T.stands29 - 0.1, T.stands29 + 0.4));
          const x = p[0] + (p[1] - p[0]) * m1 + (p[2] - p[1]) * m2, s = outBack(kx);
          g.save(); g.translate(x, 560); g.scale(s, s); text(g, 'X', 0, 0, DIG, E.ink, 'center'); g.restore();
          typed(g, '= 10', x, 660, prog(t, T.ten29, T.ten29 + 0.3), '500 34px "IBM Plex Mono"', E.accent, { align: 'center' });
        }
        // CCCV = 305: chục trống — không có gì để viết
        const BX = 1040, BW = 210, BY = 740, BH = 130, k305 = prog(t, T.empty30 - 0.6, T.empty30);
        for (let c = 0; c < 3; c++) dashedRect(g, BX + c * BW, BY, BW, BH, prog(t, T.columns30 - 0.2 + c * 0.15, T.columns30 + 0.4 + c * 0.15));
        typed(g, 'NO PLACES · NO COLUMNS', BX, BY - 26, prog(t, T.places30, T.columns30 + 0.3), '500 24px "IBM Plex Mono"', E.ink);
        typed(g, 'CCC', BX + BW / 2, BY + 92, k305 * 2, 'italic 600 64px "Cormorant Garamond"', E.ink, { align: 'center' });
        typed(g, roman(305).slice(3), BX + BW * 2.5, BY + 92, k305 * 2 - 1, 'italic 600 64px "Cormorant Garamond"', E.ink, { align: 'center' });
        const kq = prog(t, T.place30 - 0.1, T.place30 + 0.2);
        if (kq > 0) { g.save(); g.translate(BX + BW * 1.5, BY + 96); g.scale(outBack(kq), outBack(kq)); text(g, '?', 0, 0, DIG, E.accent, 'center'); g.restore(); }
        typed(g, `${roman(305)} = 305`, BX + BW * 1.5, BY + BH + 50, prog(t, T.place30 + 0.3, T.place30 + 0.9), '500 24px "IBM Plex Mono"', E.dim, { align: 'center' });
        g.restore();
      }
      // L31 (bên phải): bàn tính — đá cuội trong rãnh; rãnh X để trống (305)
      const kb = outCubic(prog(t, T.l31, T.l31 + 0.6));
      if (kb > 0) {
        g.save(); g.translate((1 - kb) * 1000, 0);
        g.strokeStyle = E.ink; g.lineWidth = 5; g.strokeRect(1000, 430, 720, 430);
        const groove = [['C', 3], ['X', 0], ['I', 5]];
        groove.forEach(([s, n], r) => {
          const y = 530 + r * 120;
          hand(g, seg(1100, y, 1690, y, 20), { w: 3, color: E.dim, jit: 1, seed: 100 + r });
          text(g, s, 1040, y + 18, 'italic 600 54px "Cormorant Garamond"', E.dim);
          for (let i = 0; i < n; i++) {
            const a = (r === 0 ? T.counting : T.board) + i * 0.12, kp = prog(t, a, a + 0.25); if (kp <= 0) continue;
            g.fillStyle = E.ink; g.beginPath(); g.arc(1150 + i * 64, y - 20 - (1 - outBack(kp)) * 120, 22, 0, 7); g.fill();
          }
        });
        typed(g, 'COUNTING BOARD · 305', 1000, 910, prog(t, T.board + 0.4, T.board + 1.0), '500 24px "IBM Plex Mono"', E.dim);
        g.restore();
      }
      g.restore();
    }

    // ── L32–34: Brahmagupta (không có chân dung) — bản thảo Bakhshali; luật tính với 0 ──
    const o34 = outCubic(prog(t, T.l35 - 0.3, T.l35 + 0.4));
    if (t >= T.l32 - 0.1 && o34 < 1) {
      g.save(); g.translate(-o34 * 1300, 0);
      typed(g, 'INDIA', 140, 420, prog(t, T.indian32, T.indian32 + 0.3), '500 26px "IBM Plex Mono"', E.accent);
      typed(g, 'Brahmagupta', 140, 520, prog(t, T.brahma, T.brahma + 0.5), 'italic 600 96px "Cormorant Garamond"', E.ink);
      typed(g, 'wrote the', 140, 590, prog(t, T.book32 - 0.2, T.book32 + 0.1), 'italic 500 40px "Cormorant Garamond"', E.dim);
      typed(g, 'Brahmasphutasiddhanta', 140, 650, prog(t, T.bss, T.bss + 0.8), 'italic 600 54px "Cormorant Garamond"', E.ink);
      // bản thảo: vào ở "Indian", ra ở "history"
      const oph = outCubic(prog(t, T.history - 0.2, T.history + 0.4));
      if (oph < 1) {
        g.save(); g.translate(oph * 1000, 0);
        portrait(g, 'bakhshali', 'parchment', 1110, 370, 360, prog(t, T.indian32 - 0.1, T.indian32 + 0.4),
          { style: 'print', label: { name: 'Bakhshali manuscript', note: 'INDIA · A DOT FOR AN EMPTY PLACE' } });
        g.restore();
      }
      // luật của 0 (viết lên đúng chữ được đọc); số 0 = son đỏ
      typed(g, 'THE RULES FOR ZERO', 1100, 430, prog(t, T.rules, T.rules + 0.5), '500 26px "IBM Plex Mono"', E.accent);
      typed(g, 'ZERO AS A REAL NUMBER', 1100, 466, prog(t, T.real - 0.1, T.real + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      const F = 'italic 600 96px "Cormorant Garamond"';
      typedParts(g, [['a + ', E.ink], ['0', E.accent], [' = a', E.ink]], 1100, 590, prog(t, T.adding33, T.adding33 + 0.45), F);
      typedParts(g, [['a − ', E.ink], ['0', E.accent], [' = a', E.ink]], 1100, 720, prog(t, T.subtracting, T.subtracting + 0.45), F);
      typedParts(g, [['a × ', E.ink], ['0', E.accent], [' = ', E.ink], ['0', E.accent]], 1100, 850, prog(t, T.multiplying33, T.multiplying33 + 0.45), F);
      // L34: ô trống → 0 vào ô → 0 tham gia phép tính (0 + 7 = 7)
      dashedRect(g, 150, 760, 130, 150, prog(t, T.l34, T.l34 + 0.5));
      typed(g, 'EMPTY SPACE', 150, 950, prog(t, T.empty34, T.empty34 + 0.4), '500 22px "IBM Plex Mono"', E.dim);
      const kz = prog(t, T.number34 - 0.1, T.number34 + 0.25);
      if (kz > 0) { g.save(); g.translate(215, 870 - (1 - outBack(kz)) * 80); text(g, '0', 0, 0, DIG, E.accent, 'center'); g.restore();
        hand(g, [[150, 760], [280, 760], [280, 910], [150, 910], [150, 760]], { w: 4, color: E.accent, jit: 1, seed: 120, k: kz }); }
      typed(g, `+ 7 = ${0 + 7}`, 310, 868, prog(t, T.calc34 - 0.3, T.calc34 + 0.3), VAL, E.ink);
      g.restore();
    }

    // ── L35–37: 0 + hệ vị trí cơ số mười = hệ số hôm nay; cùng chữ 3, giá trị theo chỗ đứng ──
    if (t >= T.l35 - 0.1) {
      const kz = prog(t, T.zero35 - 0.1, T.zero35 + 0.4);
      hand(g, ellipse(200, 600, 46, 66), { w: 9, color: E.accent, jit: 1.5, seed: 130, k: kz });
      typed(g, '+', 300, 622, prog(t, T.baseten - 0.3, T.baseten), VAL, E.ink);
      typed(g, 'BASE TEN', 370, 590, prog(t, T.baseten, T.baseten + 0.4), '500 26px "IBM Plex Mono"', E.ink);
      typed(g, 'PLACE VALUE', 370, 630, prog(t, T.pv, T.pv + 0.4), '500 26px "IBM Plex Mono"', E.ink);
      typed(g, 'BUILT IN INDIA', 370, 670, prog(t, T.built - 0.4, T.built + 0.2), '500 20px "IBM Plex Mono"', E.dim);
      // L36: hệ số hôm nay: mười chữ số; năm 628 viết vào bảng
      typed(g, '= the number system', 140, 780, prog(t, T.number36 - 0.2, T.system36 + 0.3), 'italic 500 46px "Cormorant Garamond"', E.ink);
      typedParts(g, [['0', E.accent], [' 1 2 3 4 5 6 7 8 9', E.ink]], 140, 870, prog(t, T.system36, T.today36 + 0.2), 'italic 600 64px "Cormorant Garamond"');
      typed(g, 'USED TODAY', 140, 930, prog(t, T.today36, T.today36 + 0.4), '500 22px "IBM Plex Mono"', E.dim);
      table(g, prog(t, T.baseten - 0.1, T.baseten + 0.6), prog(t, T.pv, T.pv + 0.6));
      digits(628).forEach((d, c) => typed(g, d, cx(c), TB.r[0], prog(t, T.system36 + c * 0.15, T.system36 + c * 0.15 + 0.2), DIG, E.ink, { align: 'center' }));
      typed(g, '= 628', TB.val, TB.r[0] - 10, prog(t, T.today36 - 0.2, T.today36 + 0.2), VAL, E.ink);
      // L37: chữ 3 trượt ONES → TENS → HUNDREDS; 0 son đỏ giữ chỗ; giá trị = 3 × 10^cột
      const ks = prog(t, T.symbol37 - 0.1, T.symbol37 + 0.2);
      if (ks > 0) {
        const m1 = outCubic(prog(t, T.value37, T.value37 + 0.5)), m2 = outCubic(prog(t, T.depends, T.depends + 0.5));
        const pos = 2 - m1 - m2, x = cx(2) + (cx(0) - cx(2)) * (m1 + m2) / 2, p = Math.round(2 - pos);
        g.save(); g.translate(x, TB.r[1] + 40); g.scale(outBack(ks), outBack(ks)); text(g, '3', 0, 0, 'italic 600 96px "Cormorant Garamond"', E.ink, 'center'); g.restore();
        for (let c = 2; c > 2 - p; c--) { const a = c === 2 ? T.value37 + 0.3 : T.depends + 0.3; typed(g, '0', cx(c), TB.r[1] + 40, prog(t, a, a + 0.15), DIG, E.accent, { align: 'center' }); }
        text(g, `= ${3 * 10 ** p}`, TB.val, TB.r[1] + 30, VAL, E.accent);
        typed(g, 'SAME SYMBOL · VALUE BY PLACE', cx(1), 960, prog(t, T.stands37 - 0.6, T.stands37 + 0.4), '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
      }
    }
  }
}
