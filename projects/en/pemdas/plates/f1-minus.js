// ACT FIVE mở hồi · "Minus two squared" (p2, câu 82–89) — cảnh MÀN HÌNH duy nhất: bảng điều khiển của máy dẫn đường.
//   ô MATHS (trái trên)      −2² = −(2²) = −4
//   ô Excel (giữa trên)      ô bảng tính chung chung, không logo: =-2^2 → 4; rồi (−2)² = 4, "−" giữ chặt hơn "^"
//   ô Python (trái dưới)     >>> -2**2  →  -4
//   ô JavaScript (dưới phải) > -2**2  →  SyntaxError … (đúng nguyên văn CONTENT.md, đỏ)
//   cột phải: mascot crossed lúc "Excel gives you plus four"; sau đó bảng "ai đi trước" bằng biển theo cấp; dấu CHOSEN
// Nền loang từ ổ gà cuối e3-honest (màn hình thế giới (1000, 540)).
import { W, H, clamp, prog, smooth, outCubic, outBack, ERA, ROAD, ground, sign, figure, card, actTitle, typed, ring, stamp,
  must, lookup, typeCues } from '../kit.js';

const E = ERA.screen, MONO = (n) => `500 ${n}px "IBM Plex Mono"`;
const PANEL = '#161A20', EDGE = '#2C333D', ERR = '#F0645A';   // đỏ sáng hơn ROAD.red cho chữ nhỏ trên nền đen (đo ~5:1)
const fmt = v => (v < 0 ? '−' : '') + Math.abs(v);
const BOX = { math: [96, 236, 634, 364], xl: [770, 236, 630, 364], py: [96, 636, 634, 290], js: [770, 636, 1054, 290], rank: [1440, 236, 384, 364] };
const ERRMSG = 'SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence';
const ERR1 = 'SyntaxError: Unary operator used immediately before exponentiation', ERR2 = 'expression. Parenthesis must be used to disambiguate operator precedence';
if (ERR1 + ' ' + ERR2 !== ERRMSG) throw new Error('f1: câu lỗi node bị ngắt sai');

export default class Minus {
  static ERA = 'screen';
  static POSES = ['crossed'];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      example: w(82, 'example'), usual: w(83, 'usual'), minus: w(83, 'minus'), square: w(83, 'square'), attach: w(83, 'attach'),
      four: w(83, 'minus', 3), type: w(84, 'type'), excel: w(84, 'excel'), plus: w(84, 'plus'), excel3: w(85, 'excel'),
      tighter: w(85, 'tighter'), power: w(85, 'power'), takes: w(85, 'takes'), squares: w(85, 'squares'), end85: L(85).end,
      python: w(86, 'python'), pyAns: w(86, 'minus'), js: w(87, 'javascript'), refuses: w(87, 'refuses'), stops: w(87, 'stops'),
      add: w(87, 'add'), same: w(88, 'same'), answers: w(88, 'different', 2), each: w(88, 'each'), truth: w(89, 'truth'),
      l89: L(89).start, built: w(89, 'built'), chosen: w(89, 'chosen'), end: L(89).end,
    };
    this.math = must('−(2^2)', -4); this.xl = must('(−2)^2', 4); this.py = must('−(2^2)', -4);
    this.START = L(82).start; this.FROM = this.START - 2.6;
    this.WIPE = [1000, 540];                               // ổ gà cuối e3-honest
    const T = this.T;
    this.TY = { xl: [T.type + 0.05, T.excel - 0.1], py: [T.python + 0.05, T.python + 0.85], js: [T.js + 0.05, T.js + 0.75] };
  }
  sfx() {
    const T = this.T, Y = this.TY;
    return [{ t: T.example, kind: 'pop' }, { t: T.four, kind: 'snap' }, ...typeCues('=-2^2', ...Y.xl), { t: T.plus, kind: 'beep' },
      { t: T.squares, kind: 'snap' }, ...typeCues('-2**2', ...Y.py), { t: T.pyAns, kind: 'beep' }, ...typeCues('-2**2', ...Y.js),
      { t: T.stops, kind: 'error' }, { t: T.each, kind: 'pop' }, { t: T.chosen, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, TY = this.TY;
    ground(g, 'screen');
    // câu 89 (dài ~7 s, không có vật mới): camera đẩy vào rất chậm 1 → 1.04 quanh tâm khung
    const zoom = 1 + 0.04 * smooth(prog(t, T.l89 - 0.4, T.end + 1.4));
    g.save(); g.translate(W / 2, H / 2); g.scale(zoom, zoom); g.translate(-W / 2, -H / 2);
    // khung máy dẫn đường: viền màn hình + lưới mảnh
    g.save(); g.strokeStyle = EDGE; g.lineWidth = 3; g.beginPath(); g.roundRect(40, 30, W - 80, H - 60, 28); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.025)'; g.lineWidth = 1;
    for (let x = 60; x < W - 40; x += 48) { g.beginPath(); g.moveTo(x, 40); g.lineTo(x, H - 40); g.stroke(); }
    g.restore();
    actTitle(g, 'screen', t, this.START, 'ACT FIVE', 'So, natural, or agreed?');

    // ── MATHS ──
    const km = prog(t, T.example - 0.2, T.example + 0.2), [mx, my] = BOX.math;
    panel(g, BOX.math, km, 'MATHS · usual convention', prog(t, T.usual - 0.1, T.usual + 0.6));
    if (km > 0) {
      typed(g, '−2²', mx + 40, my + 150, prog(t, T.example, T.example + 0.3), '800 92px "Archivo"', E.ink);
      if (t > T.minus) ring(g, mx + 112, my + 118, 112, 74, prog(t, T.minus, T.minus + 0.6), { color: E.accent, w: 4 });
      const ks = prog(t, T.square - 0.1, T.square + 0.5);
      if (ks > 0) {                                        // = −(2²): bình phương trước, dấu trừ gắn sau (đổi màu lúc "attach")
        g.save(); g.font = '800 64px "Archivo"'; g.textBaseline = 'alphabetic';
        const parts = [['= ', E.ink], ['−', t > T.attach ? E.accent : E.ink], ['(2²)', E.ink]], n = Math.round(7 * ks);
        let x = mx + 40, used = 0;
        for (const [s, c] of parts) { const m = clamp(n - used, 0, s.length); g.fillStyle = c; g.fillText(s.slice(0, m), x, my + 245); x += g.measureText(s).width; used += s.length; }
        g.restore();
      }
      typed(g, '= ' + fmt(this.math), mx + 40, my + 335, prog(t, T.four - 0.05, T.four + 0.25), '800 72px "Archivo"', E.accent);
    }

    // ── Excel: ô bảng tính chung chung ──
    const kx = prog(t, T.type - 0.4, T.type), [xx, xy] = BOX.xl;
    panel(g, BOX.xl, kx, 'Excel', 1);
    if (kx > 0) {
      const kt = prog(t, ...TY.xl), shown = t >= T.plus;
      g.save(); g.fillStyle = '#0F1216'; g.fillRect(xx + 24, xy + 56, 582, 40); g.strokeStyle = EDGE; g.lineWidth = 2; g.strokeRect(xx + 24, xy + 56, 582, 40);
      g.fillStyle = E.dim; g.font = 'italic 600 40px "Cormorant Garamond"'; g.fillText('fx', xx + 36, xy + 86); g.restore();
      typed(g, '=-2^2', xx + 90, xy + 84, kt, MONO(24), E.ink);
      const gx = xx + 24, gy = xy + 112, cw = 132, rh = 42;   // lưới: cột A–D, hàng 1–3
      g.save(); g.font = MONO(18); g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = '#1D232B'; g.fillRect(gx, gy, 54 + cw * 4, rh); g.fillRect(gx, gy, 54, rh * 4);
      g.fillStyle = E.dim; ['A', 'B', 'C', 'D'].forEach((c, i) => g.fillText(c, gx + 54 + cw * i + cw / 2, gy + rh / 2 + 1));
      [1, 2, 3].forEach(r => g.fillText(String(r), gx + 27, gy + rh * r + rh / 2 + 1));
      g.strokeStyle = EDGE; g.lineWidth = 1.5;
      for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(gx + 54 + cw * i, gy); g.lineTo(gx + 54 + cw * i, gy + rh * 4); g.stroke(); }
      for (let r = 0; r <= 4; r++) { g.beginPath(); g.moveTo(gx, gy + rh * r); g.lineTo(gx + 54 + cw * 4, gy + rh * r); g.stroke(); }
      g.strokeStyle = E.accent; g.lineWidth = 3; g.strokeRect(gx + 54, gy + rh, cw, rh);   // ô A1 đang chọn
      g.restore();
      if (!shown) typed(g, '=-2^2', gx + 62, gy + rh + 29, kt, MONO(24), E.ink);
      else { g.save(); g.font = MONO(26); g.textAlign = 'right'; g.fillStyle = E.ink; g.fillText(String(this.xl), gx + 54 + cw - 10, gy + rh + 30); g.restore(); }
      // vì sao: "−" giữ chặt hơn "^" → (−2)² = 4
      const kr = prog(t, T.tighter - 0.1, T.tighter + 0.3);
      if (kr > 0) { const sy = xy + 318;
        sign(g, 'AS', '−', xx + 440, sy, 36, kr);
        g.save(); g.font = MONO(28); g.fillStyle = E.dim; g.textAlign = 'center'; g.textBaseline = 'middle'; if (kr >= 1) g.fillText('>', xx + 500, sy); g.restore();
        sign(g, 'E', '^', xx + 562, sy + 6, 37.5, prog(t, T.power - 0.1, T.power + 0.3)); }
      typed(g, '(−2)²', xx + 30, xy + 340, prog(t, T.takes, T.takes + 0.9), '800 64px "Archivo"', E.ink);
      typed(g, '= ' + this.xl, xx + 210, xy + 340, prog(t, T.squares - 0.05, T.squares + 0.25), '800 64px "Archivo"', E.accent);
    }

    // ── Python ──
    const kp = prog(t, T.python - 0.4, T.python), [px, py] = BOX.py;
    panel(g, BOX.py, kp, 'Python', 1);
    if (kp > 0) {
      typed(g, '>>> ', px + 30, py + 110, 1, MONO(28), E.dim);
      typed(g, '-2**2', px + 30 + 4 * 16.8, py + 110, prog(t, ...TY.py), MONO(28), E.ink);
      if (t >= T.pyAns) typed(g, String(this.py).replace('−', '-'), px + 30, py + 160, 1, MONO(28), E.ink);
      if (t >= T.pyAns + 0.4) typed(g, '>>> ', px + 30, py + 210, 1, MONO(28), E.dim);
    }

    // ── JavaScript ──
    const kj = prog(t, T.js - 0.4, T.js), [jx, jy] = BOX.js;
    panel(g, BOX.js, kj, 'JavaScript', 1);
    if (kj > 0) {
      typed(g, '> ', jx + 30, jy + 110, 1, MONO(28), E.dim);
      typed(g, '-2**2', jx + 30 + 2 * 16.8, jy + 110, prog(t, ...TY.js), MONO(28), E.ink);
      typed(g, ERR1, jx + 30, jy + 165, prog(t, T.stops - 0.05, T.stops + 0.35), MONO(22), ERR);
      typed(g, ERR2, jx + 30, jy + 200, prog(t, T.stops + 0.3, T.stops + 0.7), MONO(22), ERR);
      const ku = prog(t, T.add - 0.1, T.add + 0.4);          // "asks you to add brackets"
      if (ku > 0) { g.save(); g.font = MONO(22); const a = g.measureText('expression. ').width, b = g.measureText('Parenthesis must be used').width;
        g.fillStyle = E.accent; g.fillRect(jx + 30 + a, jy + 210, b * outCubic(ku), 4); g.restore(); }
    }

    // ── "same expression … different answers": vàng khoanh đầu vào, rồi đáp số ──
    const ki = prog(t, T.same, T.same + 0.5), ka = prog(t, T.answers, T.answers + 0.5);
    if (ki > 0) { g.save(); g.fillStyle = E.accent;
      for (const [x, y, w] of [[mx + 40, my + 168, 150 * ki], [xx + 90, xy + 92, 84 * ki], [px + 97, py + 122, 84 * ki], [jx + 63, jy + 122, 84 * ki]]) g.fillRect(x, y, w, 4);
      g.restore(); }
    if (ka > 0) { g.save(); g.strokeStyle = E.accent; g.lineWidth = 4; g.beginPath();   // khung vàng quanh câu lỗi (không đè chữ)
      g.roundRect(jx + 18, jy + 136, (ERR2.length * 13.2 + 26) * outCubic(ka), 80, 10); g.stroke(); g.restore(); }
    if (ka > 0) for (const [x, y, rx, ry] of [[mx + 120, my + 312, 110, 44], [xx + 54 + 24 + 110, xy + 112 + 42 + 20, 34, 30], [px + 52, py + 150, 46, 30]])
      ring(g, x, y, rx, ry, ka, { color: E.accent, w: 4 });

    // ── cột phải: ai đi trước (biển theo cấp DNA) ──
    const kk = prog(t, T.each - 0.3, T.each + 0.1), [rx, ry] = BOX.rank;
    panel(g, BOX.rank, kk, 'who goes first', 1);
    if (kk > 0) {
      const rows = [['maths', 'E', 'AS'], ['Excel', 'AS', 'E'], ['Python', 'E', 'AS'], ['JS', 'P', null]];
      rows.forEach(([name, a, b], i) => {
        const k = prog(t, T.each + i * 0.3, T.each + i * 0.3 + 0.35), y = ry + 118 + i * 74; if (k <= 0) return;
        typed(g, name, rx + 24, y + 8, k * 2, MONO(22), E.ink);
        const s = (kind, x) => { g.save(); g.translate(x, y); g.scale(0.78, 0.78);   // cỡ chữ biển vẫn là cỡ đã nạp, thu cả biển
          kind === 'E' ? sign(g, 'E', '^', 0, 10, 37.5, k) : kind === 'AS' ? sign(g, 'AS', '−', 0, 0, 28.6, k) : sign(g, 'P', '( )', 0, 0, 29, k); g.restore(); };
        s(a, rx + 200);
        if (b) { s(b, rx + 310); typed(g, '>', rx + 255, y + 10, k * 2, MONO(28), E.dim, { align: 'center' }); }
        else typed(g, 'or error', rx + 248, y + 8, k * 2 - 0.5, MONO(20), ERR);
      });
      // các hệ chọn KHÁC (Excel, JS) nhấp nháy khung vàng suốt câu 89, đứng yên từ "chosen"
      const on = t > T.chosen || (t > T.l89 + 0.3 && Math.floor((t - T.l89) * 2.4) % 2 === 0);
      if (on && t > T.l89 + 0.3) for (const i of [1, 3]) { const y = ry + 118 + i * 74;   // vạch vàng bên trái + tên vàng
        g.save(); g.fillStyle = E.accent; g.fillRect(rx + 8, y - 20, 6, 40); g.restore();
        typed(g, rows[i][0], rx + 24, y + 8, 1, MONO(22), E.accent); }
    }
    // dòng trạng thái + dấu CHOSEN
    typed(g, 'if it were a truth of mathematics: one answer everywhere', W / 2, 986, prog(t, T.truth - 0.3, T.truth + 1.6), MONO(28), E.ink, { align: 'center' });
    if (t > T.built - 0.1) { const kb = prog(t, T.built - 0.1, T.built + 0.4); g.save(); g.strokeStyle = E.accent; g.lineWidth = 4;
      for (const b of [BOX.xl, BOX.py, BOX.js]) { g.beginPath(); g.roundRect(b[0] - 6, b[1] - 6, (b[2] + 12) * kb, b[3] + 12, 16); g.stroke(); } g.restore(); }
    stamp(g, 'CHOSEN', 1600, 712, prog(t, T.chosen - 0.05, T.chosen + 0.3), '800 56px "Archivo"', E.accent, { rot: -0.05 });

    // mascot: khoanh tay lúc Excel cho +4 (cột phải, trước khi bảng xếp hạng hiện)
    const kc = Math.min(prog(t, T.type - 0.4, T.type), 1 - prog(t, T.excel3 + 1.2, T.excel3 + 1.6));
    figure(g, 'crossed', 1700, H, 720, 'screen', kc);
    g.restore();
    card(g, 'screen', prog(t, this.START - 0.2, this.START + 1.0), 'ACT FIVE · AGREED', 'Minus two squared');
  }
}

// ô màn hình: bật vào theo chiều dọc; tiêu đề Plex nhỏ viết vào
function panel(g, [x, y, w, h], k, title, kt) {
  if (k <= 0) return;
  const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(1, p); g.fillStyle = PANEL; g.beginPath(); g.roundRect(0, 0, w, h, 14); g.fill();
  g.strokeStyle = EDGE; g.lineWidth = 2; g.stroke(); g.restore();
  if (k >= 1) typed(g, title, x + 24, y + 38, kt, MONO(20), ERA.screen.dim);
}
