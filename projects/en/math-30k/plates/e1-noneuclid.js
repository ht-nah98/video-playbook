// Hồi 5 mở · "1829 — non-Euclidean geometry" (SCRIPT.md) — bảng đen, phấn. Câu 129–151 của p2.
//   tờ giấy: một đường, một điểm, MỘT đường song song (tiên đề 5, phấn vàng) · bốn tiên đề ngắn, cái thứ năm dài
//   hai nghìn năm chứng minh bị gạch · Lobachevsky: 1–4 không suy ra 5 · ba thế giới phẳng / yên ngựa / cầu → 1 · ∞ · 0
//   Bolyai (chỉ tên — chân dung lưu hành là giả) · Gauss giấu · tiên đề là LỰA CHỌN
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, stamp, actTitle, lookup } from '../kit.js';

const E = ERA.chalk;
const AX = ['two points → a line', 'a line extends', 'a centre, a circle', 'right angles are equal'];
const AX5 = 'if a line falling on two lines makes the interior angles on one side less than two right angles, the two lines, if produced indefinitely, meet on that side';

// ── phấn: nét đôi (nét chính + bụi phấn lệch), chữ hai lượt ──
function chalk(g, pts, { w = 4, color = E.ink, seed = 1, k = 1, jit = 2.2 } = {}) {
  hand(g, pts, { w, color, jit, seed, k });
  g.save(); g.globalAlpha = 0.3; hand(g, pts, { w: w * 0.6, color, jit: jit * 1.6, seed: seed + 50, k }); g.restore();
}
function ctext(g, s, x, y, k, font, color, opt = {}) {
  typed(g, s, x, y, k, font, color, opt);
  g.save(); g.globalAlpha = 0.28; typed(g, s, x + 1.5, y - 1.2, k, font, color, opt); g.restore();
}
const ell = (cx, cy, rx, ry, a0 = 0, a1 = Math.PI * 2, n = 64) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
// vật rời khung bằng chuyển động: k ∈ [0,1] → trượt (dx, dy)
const tick = (g, x, y, k, seed = 1) => chalk(g, [[x, y], [x + 10, y + 12], [x + 30, y - 16]], { w: 4, color: E.ink, seed, k, jit: 1 });
function away(g, k, dx, dy, draw) { if (k >= 1) return; g.save(); g.translate(outCubic(k) * dx, outCubic(k) * dy); draw(); g.restore(); }

// ── ba thế giới: cùng một phép chiếu xiên (u ngang, v vào sâu, z lên) ──
const proj = (cx, cy, S) => (u, v, z) => [cx + S * (u + 0.25 * v), cy - S * (0.9 * z + 0.42 * v)];
const C = 0.45, KS = 0.3, FAN = [-0.5, -0.25, 0, 0.25, 0.5];
const sad = (u, v) => 0.55 * (u * u - v * v);
// hình học yên ngựa (sơ đồ): đường thứ nhất v = −C − K u², các đường qua P = (0, C): v = C + m u + K u².
// Khoảng cách 2C + m u + 2K u² > 0 với mọi u ⇔ m² < 16·K·C — kiểm bằng số, không bao giờ cắt nhau.
for (const m of FAN) if (m * m >= 16 * KS * C) throw new Error('e1: đường qua P cắt đường thứ nhất');
function curve(P, f, n = 40) { const out = []; for (let i = 0; i <= n; i++) { const u = -1 + 2 * i / n, v = f(u); if (Math.abs(v) <= 1) out.push(P(u, v, sad(u, v))); } return out; }

function drawFlat(g, cx, cy, s, kSheet, kLine, kPar) {
  const P = proj(cx, cy, 190 * s), z0 = () => 0;
  if (kSheet > 0) {
    chalk(g, [P(-1, -1, 0), P(1, -1, 0), P(1, 1, 0), P(-1, 1, 0), P(-1, -1, 0)], { w: 3 * s + 1, color: E.dim, seed: 11, k: kSheet });
  }
  chalk(g, seg(...P(-0.95, -C, 0), ...P(0.95, -C, 0), 20), { w: 4 * s + 1, color: E.ink, seed: 12, k: kLine });
  if (kLine > 0.5) { const [x, y] = P(0, C, 0); g.fillStyle = E.ink; g.beginPath(); g.arc(x, y, 8 * s + 2, 0, 7); g.fill(); }
  chalk(g, seg(...P(-0.95, C, 0), ...P(0.95, C, 0), 20), { w: 5 * s + 1, color: E.accent, seed: 13, k: kPar });
  return z0;
}
function drawSaddle(g, cx, cy, s, kWire, kLine, kFan) {
  const P = proj(cx, cy, 190 * s);
  if (kWire > 0) {
    for (let j = 0; j <= 8; j++) { const v = -1 + j / 4;
      chalk(g, Array.from({ length: 21 }, (_, i) => { const u = -1 + i / 10; return P(u, v, sad(u, v)); }), { w: 2 * s + 0.6, color: E.dim, seed: 20 + j, k: prog(kWire, j * 0.05, j * 0.05 + 0.6), jit: 1.2 }); }
    for (let j = 0; j <= 8; j++) { const u = -1 + j / 4;
      chalk(g, Array.from({ length: 21 }, (_, i) => { const v = -1 + i / 10; return P(u, v, sad(u, v)); }), { w: 2 * s + 0.6, color: E.dim, seed: 40 + j, k: prog(kWire, 0.3 + j * 0.05, 0.3 + j * 0.05 + 0.6), jit: 1.2 }); }
  }
  chalk(g, curve(P, u => -C - KS * u * u), { w: 4 * s + 1, color: E.ink, seed: 61, k: kLine });
  FAN.forEach((m, i) => chalk(g, curve(P, u => C + m * u + KS * u * u), { w: 4 * s + 1, color: E.accent, seed: 70 + i, k: prog(kFan, i * 0.15, i * 0.15 + 0.4) }));
  if (kLine > 0.5) { const [x, y] = P(0, C, sad(0, C)); g.fillStyle = E.ink; g.beginPath(); g.arc(x, y, 8 * s + 2, 0, 7); g.fill(); }
}
// mặt cầu, chiếu trực giao: màn hình (x, −y), thấy được khi z > 0. "Đường thẳng" = đường tròn lớn.
const norm = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const N1 = norm([0, 1, 0.38]), PS = norm([0.22, 0.6, 0.77]);
const E1 = norm(cross(PS, [0, 0, 1])), E2 = cross(PS, E1);
const NS = [0.35, 1.0, 1.65].map(a => E1.map((x, i) => Math.cos(a) * x + Math.sin(a) * E2[i]));     // pháp tuyến các vòng qua P
const MEET = NS.map(n => { const X = norm(cross(N1, n)); return X[2] >= 0 ? X : X.map(x => -x); });  // giao điểm thấy được
if (Math.abs(PS[0] * N1[0] + PS[1] * N1[1] + PS[2] * N1[2]) < 0.1) throw new Error('e1: P nằm trên đường thứ nhất');
function great(n, from) {   // đường tròn lớn pháp tuyến n, bắt đầu từ điểm `from` (⊥ n)
  const b = cross(n, from); return Array.from({ length: 97 }, (_, i) => { const f = i / 96 * Math.PI * 2; return from.map((x, j) => Math.cos(f) * x + Math.sin(f) * b[j]); });
}
function sphereCurve(g, pts, cx, cy, R, opt) {   // phần trước nét đậm, phần sau mờ
  const scr = pts.map(([x, y]) => [cx + R * x, cy - R * y]);
  const n = Math.max(1, Math.round(pts.length * opt.k));
  let run = [], front = pts[0][2] >= 0;
  const flush = () => { if (run.length > 1) { if (front) chalk(g, run, { ...opt, k: 1 }); else { g.save(); g.globalAlpha = 0.3; hand(g, run, { w: opt.w * 0.6, color: opt.color, jit: 1, seed: opt.seed, k: 1 }); g.restore(); } } };
  for (let i = 0; i < n; i++) { const f = pts[i][2] >= 0; if (f !== front) { run.push(scr[i]); flush(); run = [scr[i]]; front = f; } else run.push(scr[i]); }
  flush();
}
function drawSphere(g, cx, cy, s, kWire, kLine, kCirc, kMeet) {
  const R = 175 * s;
  if (kWire > 0) {
    chalk(g, ell(cx, cy, R, R, -Math.PI / 2, Math.PI * 1.5, 72), { w: 3 * s + 1, color: E.dim, seed: 81, k: kWire });
    sphereCurve(g, great(norm([1, 0, 0.5]), [0, 1, 0]), cx, cy, R, { w: 2 * s + 0.6, color: E.dim, seed: 82, k: kWire, jit: 1.2 });
  }
  if (kLine > 0) sphereCurve(g, great(N1, norm(cross(N1, [0, 1, 0]))), cx, cy, R, { w: 4 * s + 1, color: E.ink, seed: 83, k: kLine });
  NS.forEach((n, i) => { const k = prog(kCirc, i * 0.2, i * 0.2 + 0.5); if (k > 0) sphereCurve(g, great(n, PS), cx, cy, R, { w: 4 * s + 1, color: E.accent, seed: 90 + i, k }); });
  if (kLine > 0.5) { g.fillStyle = E.ink; g.beginPath(); g.arc(cx + R * PS[0], cy - R * PS[1], 8 * s + 2, 0, 7); g.fill(); }
  MEET.forEach((X, i) => { const k = prog(kMeet, i * 0.2, i * 0.2 + 0.4); if (k <= 0) return; const x = cx + R * X[0], y = cy - R * X[1], r = (16 * s + 4) * outBack(k);
    chalk(g, seg(x - r, y - r, x + r, y + r, 4), { w: 4 * s + 1, color: E.accent, seed: 95 + i, jit: 1 }); chalk(g, seg(x - r, y + r, x + r, y - r, 4), { w: 4 * s + 1, color: E.accent, seed: 99 + i, jit: 1 }); });
}

export default class NonEuclid {
  static ERA = 'chalk';
  static IMAGES = {
    lobachevsky: './assets/history/Lobachevsky_03_crop.jpg',
    gauss: './assets/history/Carl_Friedrich_Gauss_1840_by_Jensen.jpg',
  };
  static POSES = ['chalk'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      s0: L(129).start, sheet: w(129, 'sheet'), line: w(129, 'line'), point: w(129, 'point'),
      question: w(130, 'question'), lines: w(130, 'lines'), never: w(130, 'never'),
      s131: L(131).start, answer: w(131, 'answer'), one: w(131, 'one'), exactly: w(131, 'exactly'),
      fifth: w(132, 'fifth'), promised: w(132, 'promised'), back: w(132, 'back'), e132: L(132).end,
      odd: w(133, 'odd'),
      s134: L(134).start, first: w(134, 'first'), four: w(134, 'four'), short: w(134, 'short'), obvious: w(134, 'obvious'),
      long: w(135, 'long'), fussy: w(135, 'fussy'), proved: w(135, 'proved'), assumed: w(135, 'assumed'),
      s136: L(136).start, thousand: w(136, 'thousand'), one136: w(136, 'one'), prove: w(136, 'prove'), four136: w(136, 'four'),
      s137: L(137).start, nobody: w(137, 'nobody'), e137: L(137).end,
      s138: L(138).start, lobachevsky: w(138, 'lobachevsky'), russian: w(138, 'russian'),
      cant: w(139, "can't"), follow: w(139, 'follow'), others: w(139, 'others'),
      keep: w(140, 'keep'), opposite: w(140, 'opposite'), contradiction: w(140, 'contradiction'),
      s141: L(141).start, picture: w(141, 'picture'), bend: w(141, 'bend'),
      flat: w(142, 'flat'), one142: w(142, 'one'),
      saddle: w(143, 'saddle'), infinitely: w(143, 'infinitely'), never143: w(143, 'never'),
      sphere: w(144, 'sphere'), none: w(144, 'none'),
      zero: w(145, 'zero'), one145: w(145, 'one'), inf145: w(145, 'infinitely'), worlds: w(145, 'worlds'), right: w(145, 'right'),
      s146: L(146).start, bolyai: w(146, 'bolyai'), hungary: w(146, 'hungary'),
      gauss: w(147, 'gauss'), earlier: w(147, 'earlier'), himself: w(147, 'himself'),
      s148: L(148).start, technical: w(148, 'technical'),
      axioms: w(149, 'axioms'), eternal: w(149, 'eternal'), truths: w(149, 'truths'),
      choices: w(150, 'choices'),
      choose: w(151, 'choose'), diff2: w(151, 'different', 2), universe: w(151, 'universe'),
    };
    this.START = this.T.s0;
    this.FROM = this.START - 2.3;                           // mở HỒI
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'chalk');
    actTitle(g, 'chalk', t, this.START, 'ACT FIVE', 'Questioning the foundations');
    card(g, 'chalk', prog(t, T.s0 - 0.3, T.s0 + 1.1), 'ACT FIVE · QUESTIONING THE FOUNDATIONS', '1829', 'Lobachevsky, a new geometry');
    ruler(g, 'chalk', 1829, prog(t, T.s0 + 0.3, T.s0 + 1.1));

    // ── A. tờ giấy: một đường, một điểm; "bao nhiêu đường không bao giờ gặp?" → một (tiên đề 5) ──
    const Px = 610, Py = 570, LY = 830, X0 = 230, X1 = 1000;
    away(g, prog(t, T.s134 - 0.35, T.s134 + 0.25), 0, 900, () => {
      chalk(g, [[170, 410], [1070, 404], [1064, 970], [176, 966], [170, 410]], { w: 3, color: E.dim, seed: 1, k: prog(t, T.sheet - 0.1, T.sheet + 0.6) });
      chalk(g, seg(X0, LY, X1, LY, 40), { w: 5, color: E.ink, seed: 2, k: prog(t, T.line - 0.1, T.line + 0.5) });
      const kp = prog(t, T.point - 0.05, T.point + 0.15);
      if (kp > 0) { g.fillStyle = E.ink; g.beginPath(); g.arc(Px, Py, 10 * outBack(kp), 0, 7); g.fill(); ctext(g, 'P', Px + 18, Py - 18, kp, 'italic 600 44px "Cormorant Garamond"', E.ink); }
      // la bàn câu hỏi: một đường thử quay quanh P, chấm chỗ nó cắt đường thứ nhất
      const kq = prog(t, T.lines - 0.1, T.lines + 0.2) * (1 - prog(t, T.one - 0.3, T.one));
      if (kq > 0) {
        const ang = 0.55 * Math.sin((t - T.lines) * 1.4) + 0.08, dx = Math.cos(ang), dy = Math.sin(ang);
        const r = 380 * kq;
        g.save(); g.globalAlpha = 0.55; hand(g, seg(Px - dx * r, Py - dy * r, Px + dx * r, Py + dy * r, 12), { w: 3, color: E.ink, jit: 1, seed: 5 }); g.restore();
        if (Math.abs(dy) > 1e-3) { const xi = Px + (LY - Py) * dx / dy; if (xi > X0 && xi < X1 && Math.abs((LY - Py) / dy) < r) {
          chalk(g, ell(xi, LY, 14, 14, 0, Math.PI * 2, 20), { w: 3, color: E.dim, seed: 6, jit: 1 }); } }
      }
      ctext(g, 'how many never meet it?', 220, 470, prog(t, T.never - 0.1, T.never + 0.8), 'italic 500 46px "Cormorant Garamond"', E.dim);
      // "One. Exactly one." — LA song song, phấn vàng
      chalk(g, seg(X0, Py, X1, Py, 40), { w: 6, color: E.accent, seed: 7, k: prog(t, T.one - 0.1, T.one + 0.6) });
      ctext(g, '1', 1010, 610, prog(t, T.exactly, T.exactly + 0.2), '800 92px "Archivo"', E.accent);
      ctext(g, 'AXIOM 5', X0, Py - 24, prog(t, T.fifth, T.fifth + 0.4), '500 22px "IBM Plex Mono"', E.accent);
    });

    // người dẫn đường: chỉ ở câu hỏi, đứng bên phải, rời bằng trượt xuống
    away(g, prog(t, T.answer, T.answer + 0.45), 0, 760, () =>
      figure(g, 'chalk', 1600, 1080, 640, 'chalk', prog(t, T.question - 0.25, T.question + 0.15), { flip: true }));

    // ── tiên đề 5 trọn câu (đúng lời Euclid, như ở Hồi 2), cột phải; vòng "?" ở "odd" ──
    away(g, prog(t, T.s141 - 0.35, T.s141 + 0.3), 0, -1000, () => {
      ctext(g, 'EUCLID · AXIOM 5', 1160, 345, prog(t, T.promised - 0.2, T.promised + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      const kt = prog(t, T.promised, T.e132 + 0.9);
      g.save(); g.font = '500 24px "IBM Plex Mono"';
      const lines = []; let cur = '5. ';
      for (const wd of AX5.split(' ')) { if (g.measureText(cur + wd).width > 630) { lines.push(cur); cur = '   '; } cur += wd + ' '; }
      lines.push(cur); g.restore();
      const total = lines.reduce((a, l) => a + l.length, 0); let shown = Math.round(total * kt);
      lines.forEach((l, i) => { const n = Math.min(l.length, shown); shown -= n; if (n > 0) ctext(g, l, 1160, 450 + i * 34, n / l.length, '500 24px "IBM Plex Mono"', E.accent); });
      const bot = 450 + (lines.length - 1) * 34;
      chalk(g, ell(1450, (420 + bot) / 2 + 8, 390, (bot - 420) / 2 + 66, Math.PI, Math.PI * 3, 70), { w: 3, color: E.ink, seed: 8, k: prog(t, T.odd - 0.1, T.odd + 0.6) });
      ctext(g, '?', 1740, 370, prog(t, T.odd + 0.4, T.odd + 0.6), '800 92px "Archivo"', E.ink);
    });

    // ── B. bốn tiên đề ngắn, cái thứ năm dài: thanh dài theo số ký tự ──
    if (t > T.s134 - 0.4) away(g, prog(t, T.s136 - 0.35, T.s136 + 0.25), 0, 900, () => {
      const PX = 6.2, kk = i => prog(t, T.first + i * 0.3, T.first + i * 0.3 + 0.5);
      AX.forEach((s, i) => { const y = 440 + i * 96;
        ctext(g, `${i + 1}.`, 170, y, kk(i), '500 24px "IBM Plex Mono"', E.ink);
        ctext(g, s, 240, y, kk(i), 'italic 500 40px "Cormorant Garamond"', E.ink);
        chalk(g, seg(240, y + 24, 240 + s.length * PX, y + 24, 6), { w: 8, color: E.ink, seed: 100 + i, k: prog(t, T.short + i * 0.12, T.short + i * 0.12 + 0.3) });
        tick(g, 600, y - 6, prog(t, T.obvious + i * 0.1, T.obvious + i * 0.1 + 0.15), 130 + i);
      });
      const y5 = 440 + 4 * 96;
      ctext(g, '5.', 170, y5, prog(t, T.long - 0.3, T.long), '500 24px "IBM Plex Mono"', E.accent);
      chalk(g, seg(240, y5 + 24 - 40, 240 + AX5.length * PX, y5 + 24 - 40, 60), { w: 8, color: E.accent, seed: 110, k: prog(t, T.long, T.long + 0.9) });
      // "fussy": un khấc ở mỗi dấu phẩy (mỗi mệnh đề phụ)
      [...AX5].forEach((ch, j) => { if (ch !== ',') return; const x = 240 + j * PX, k = prog(t, T.fussy + j * 0.004, T.fussy + j * 0.004 + 0.2);
        chalk(g, seg(x, y5 - 34, x, y5 + 2, 3), { w: 4, color: E.accent, seed: 120 + j, k, jit: 1 }); });
      ctext(g, 'LONG · FUSSY', 240, y5 + 40, prog(t, T.fussy + 0.3, T.fussy + 0.8), '500 20px "IBM Plex Mono"', E.dim);
      ctext(g, 'proved?', 640, y5 + 110, prog(t, T.proved, T.proved + 0.3), 'italic 600 52px "Cormorant Garamond"', E.ink);
      ctext(g, 'or assumed?', 840, y5 + 110, prog(t, T.assumed, T.assumed + 0.4), 'italic 600 52px "Cormorant Garamond"', E.dim);
    });

    // ── C. hai nghìn năm chứng minh — lần lượt bị gạch ──
    if (t > T.s136 - 0.4) away(g, prog(t, T.s138 - 0.35, T.s138 + 0.25), 0, 900, () => {
      ctext(g, '2,000 YEARS OF ATTEMPTS', 170, 410, prog(t, T.thousand, T.thousand + 0.6), '500 22px "IBM Plex Mono"', E.dim);
      const n = 12, a0 = T.one136, a1 = T.four136, c0 = T.prove, c1 = T.e137 - 0.15;
      for (let i = 0; i < n; i++) {
        const x = 170 + (i % 3) * 310, y = 460 + Math.floor(i / 3) * 135, a = a0 + (a1 - a0) * i / (n - 1), k = prog(t, a, a + 0.35);
        if (k <= 0) continue;
        ctext(g, 'proof', x, y + 30, k * 1.6, 'italic 600 40px "Cormorant Garamond"', E.ink);
        ctext(g, `#${i + 1}`, x + 100, y + 30, k * 1.6 - 0.5, '500 18px "IBM Plex Mono"', E.dim);
        for (let r = 0; r < 2; r++) { const len = 150 + hash(i * 7 + r) * 110;
          chalk(g, Array.from({ length: 25 }, (_, j) => [x + j / 24 * len, y + 58 + r * 26 + Math.sin(j * 1.9 + i + r) * 5]), { w: 2.5, color: E.dim, seed: 200 + i * 3 + r, k: prog(k, 0.3 + r * 0.2, 0.8 + r * 0.2), jit: 1 }); }
        const c = Math.max(a + 0.45, c0 + (c1 - c0) * i / (n - 1)), kc = prog(t, c, c + 0.2);
        chalk(g, seg(x - 14, y - 8, x + 270, y + 104, 6), { w: 5, color: E.ink, seed: 300 + i, k: kc });
        chalk(g, seg(x - 14, y + 104, x + 270, y - 8, 6), { w: 5, color: E.ink, seed: 320 + i, k: prog(t, c + 0.1, c + 0.3) });
      }
    });

    // ── D. Lobachevsky: 1–4 không suy ra 5; giữ nó hay thay bằng điều ngược lại — đều không mâu thuẫn ──
    if (t > T.s138 - 0.4) away(g, prog(t, T.s141 - 0.35, T.s141 + 0.3), 0, 1000, () => {
      portrait(g, 'lobachevsky', 'chalk', 180, 400, 380, prog(t, T.lobachevsky - 0.4, T.lobachevsky + 0.3),
        { style: 'pin', rot: -0.02, label: { name: 'Nikolai Lobachevsky', life: '1792–1856' } });
      ctext(g, "CAN'T BE PROVED", 680, 470, prog(t, T.cant, T.cant + 0.4), '500 24px "IBM Plex Mono"', E.accent);
      ctext(g, '1, 2, 3, 4', 680, 570, prog(t, T.follow - 0.5, T.follow), 'italic 600 64px "Cormorant Garamond"', E.ink);
      chalk(g, [...seg(950, 550, 1050, 550, 8), [1032, 536], [1050, 550], [1032, 564]], { w: 4, color: E.ink, seed: 400, k: prog(t, T.follow, T.follow + 0.3) });
      ctext(g, '5', 1072, 570, prog(t, T.follow + 0.2, T.follow + 0.35), 'italic 600 64px "Cormorant Garamond"', E.accent);
      chalk(g, seg(985, 590, 1015, 512, 4), { w: 5, color: E.accent, seed: 401, k: prog(t, T.others - 0.1, T.others + 0.2) });
      ctext(g, 'keep 5', 680, 700, prog(t, T.keep, T.keep + 0.4), 'italic 600 52px "Cormorant Garamond"', E.accent);
      ctext(g, 'its opposite', 680, 780, prog(t, T.opposite - 0.1, T.opposite + 0.4), 'italic 600 52px "Cormorant Garamond"', E.ink);
      ctext(g, '→  a geometry', 930, 700, prog(t, T.opposite + 0.6, T.opposite + 1.0), 'italic 600 52px "Cormorant Garamond"', E.ink);
      ctext(g, '→  a geometry', 930, 780, prog(t, T.opposite + 0.9, T.opposite + 1.3), 'italic 600 52px "Cormorant Garamond"', E.ink);
      ctext(g, 'NO CONTRADICTION EVER FOUND', 680, 860, prog(t, T.contradiction, T.contradiction + 0.6), '500 22px "IBM Plex Mono"', E.dim);
    });

    // ── E. "let the surface bend": phẳng · yên ngựa · cầu → 1 · ∞ · 0 ──
    const XS = [380, 960, 1540], CY = 650;
    if (t > T.s141 - 0.4) away(g, prog(t, T.s146 - 0.35, T.s146 + 0.3), 0, 1000, () => {
      drawFlat(g, XS[0], CY, 1, prog(t, T.picture - 0.1, T.picture + 0.6), prog(t, T.flat - 0.1, T.flat + 0.5), prog(t, T.one142, T.one142 + 0.7));
      drawSaddle(g, XS[1], CY, 1, prog(t, T.bend - 0.1, T.bend + 1.0), prog(t, T.saddle - 0.2, T.saddle + 0.4), prog(t, T.infinitely - 0.1, T.never143 + 0.3));
      drawSphere(g, XS[2], CY, 1, prog(t, T.bend + 0.2, T.bend + 1.0), prog(t, T.sphere - 0.2, T.sphere + 0.5), prog(t, T.sphere + 0.3, T.none + 0.2), prog(t, T.none, T.none + 0.5));
      [['FLAT', T.picture], ['SADDLE', T.bend], ['SPHERE', T.bend + 0.2]].forEach(([s, a], i) =>
        ctext(g, s, XS[i], 420, prog(t, a, a + 0.4), '500 22px "IBM Plex Mono"', E.dim, { align: 'center' }));
      [['1', T.one145, 0], ['∞', T.inf145, 1], ['0', T.zero, 2]].forEach(([s, a, i]) => {
        const k = prog(t, a - 0.05, a + 0.2); if (k <= 0) return;
        g.save(); g.translate(XS[i], 940); g.scale(outBack(k), outBack(k)); ctext(g, s, 0, 0, 1, i === 1 ? 'italic 600 96px "Cormorant Garamond"' : '800 92px "Archivo"', E.accent, { align: 'center' }); g.restore();
        ctext(g, i === 1 ? 'PARALLELS' : i === 0 ? 'PARALLEL' : 'PARALLELS', XS[i], 985, prog(t, T.worlds + i * 0.15, T.worlds + i * 0.15 + 0.4), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
        tick(g, XS[i] + 70, 915, prog(t, T.right + i * 0.15, T.right + i * 0.15 + 0.15), 140 + i);
      });
    });

    // ── F. cùng lúc: Bolyai (chỉ tên — không có chân dung thật) · Gauss đã thấy trước, giữ cho riêng mình ──
    if (t > T.s146 - 0.4) away(g, prog(t, T.s148 - 0.35, T.s148 + 0.3), 0, 1000, () => {
      portrait(g, 'lobachevsky', 'chalk', 200, 420, 330, prog(t, T.s146 - 0.2, T.s146 + 0.4), { style: 'pin', rot: 0.015, label: { name: 'Lobachevsky', life: 'RUSSIA · 1829' } });
      const kb = prog(t, T.bolyai - 0.3, T.bolyai + 0.3);
      if (kb > 0) { g.save(); g.translate(0, (1 - outCubic(kb)) * 300); g.setLineDash([10, 9]);
        chalk(g, [[760, 420], [1020, 420], [1020, 750], [760, 750], [760, 420]], { w: 3, color: E.dim, seed: 500, jit: 1 }); g.setLineDash([]);
        ctext(g, 'NO AUTHENTIC', 890, 575, 1, '500 18px "IBM Plex Mono"', E.dim, { align: 'center' });
        ctext(g, 'PORTRAIT', 890, 602, 1, '500 18px "IBM Plex Mono"', E.dim, { align: 'center' }); g.restore(); }
      ctext(g, 'János Bolyai', 760, 810, prog(t, T.bolyai, T.bolyai + 0.5), 'italic 600 44px "Cormorant Garamond"', E.ink);
      ctext(g, 'HUNGARY · 1832', 760, 842, prog(t, T.hungary, T.hungary + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      portrait(g, 'gauss', 'chalk', 1330, 420, 330, prog(t, T.gauss - 0.35, T.gauss + 0.3), { style: 'pin', rot: -0.02, label: { name: 'Carl Friedrich Gauss', life: '1777–1855' } });
      ctext(g, 'SAW IT EARLIER', 1330, 905, prog(t, T.earlier, T.earlier + 0.5), '500 20px "IBM Plex Mono"', E.accent);
      ctext(g, 'KEPT IT TO HIMSELF', 1330, 935, prog(t, T.himself, T.himself + 0.6), '500 20px "IBM Plex Mono"', E.accent);
    });

    // ── G. tiên đề không phải chân lý vĩnh cửu — là LỰA CHỌN; chọn khác → vũ trụ khác ──
    if (t > T.s148 - 0.4) {
      ctext(g, 'MORE THAN A TECHNICAL RESULT', 180, 430, prog(t, T.technical - 0.2, T.technical + 0.6), '500 22px "IBM Plex Mono"', E.dim);
      ctext(g, 'AXIOMS', 180, 580, prog(t, T.axioms - 0.1, T.axioms + 0.3), '800 92px "Archivo"', E.ink);
      ctext(g, 'eternal truths', 660, 574, prog(t, T.eternal - 0.1, T.truths + 0.3), 'italic 500 72px "Cormorant Garamond"', E.ink);
      chalk(g, seg(648, 552, 1100, 540, 12), { w: 6, color: E.ink, seed: 600, k: prog(t, T.truths + 0.3, T.truths + 0.7) });
      stamp(g, 'CHOICES', 1340, 556, prog(t, T.choices - 0.05, T.choices + 0.25), '800 64px "Archivo"', E.accent, { rot: -0.06 });
      const MX = [420, 960, 1500], MY = 830;
      [[T.choose, 0], [T.diff2, 1], [T.universe, 2]].forEach(([a, i]) => {
        const k = prog(t, a - 0.1, a + 0.35); if (k <= 0) return;
        g.save(); g.translate(0, (1 - outCubic(k)) * 400);
        if (i === 0) drawFlat(g, MX[0], MY, 0.45, 1, 1, 1);
        if (i === 1) drawSaddle(g, MX[1], MY, 0.45, 1, 1, 1);
        if (i === 2) drawSphere(g, MX[2], MY, 0.45, 1, 1, 1, 1);
        ctext(g, ['AXIOM 5 · 1 PARALLEL', 'OPPOSITE · ∞', 'NONE · 0'][i], MX[i], 975, 1, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
        g.restore();
      });
    }
  }
}
