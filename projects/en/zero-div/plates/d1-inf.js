// HỒI BA · "Why not just call it infinity?" (SCRIPT.md, p2 câu 87–102).
//   87      thẻ hồi · "1 ÷ 0 = ∞" viết ra, ∞ đỏ
//   88      "starts to crack" → giấy NỨT thật, toả ra từ lỗ
//   89      luật "nếu a ÷ b = c thì c × b = a" đóng khung
//   90–92   1 ÷ 0 = ∞ → ∞ × 0 = 1 · 2 ÷ 0 = ∞ → ∞ × 0 = 2 · "one expression" khoanh · "1 = 2" đỏ, gạch chéo; nứt thêm
//   93–96   ∞ như số thường: 1 + ∞ = ∞, 2 + ∞ = ∞ → 1 + ∞ = 2 + ∞ → gạch ∞ hai vế → "1 = 2" đỏ, gạch; nứt thêm
//   97–98   "and yet" vết nứt LIỀN lại · mặt cầu Riemann ngồi trên lỗ (chiếu nổi từ đỉnh, TÍNH), đỉnh = ∞ (mực, hợp lệ)
//   99–101  cái giá: ∞ không dấu (± gạch), không > 5, không < −5 (khoanh 5, −5 trên trục) · 0 × ∞, ∞ − ∞, 0 / 0 đỏ
//   102     "you can't" bị gạch · hoá đơn viết tay · camera lao vào lỗ → d2 loang từ lỗ
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, actTitle, lookup, hole, diveInto, strike, cross, ring, arrow } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640, HR = 60;                                  // lỗ ở "nhà"
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

// ── mặt cầu Riemann (mặt cắt): đường tròn tiếp xúc trục số tại 0 (= tâm lỗ), chiếu từ đỉnh N ──
const RR = 220, CX = HX, CY = HY - RR, NX = HX, NY = HY - 2 * RR, SU = 110;   // SU px / đơn vị trên trục
/** Điểm u trên trục → giao điểm thứ hai của đoạn N→P với đường tròn (phép chiếu nổi). */
function stereo(u) {
  const px = HX + u * SU, py = HY, dx = px - NX, dy = py - NY;
  const s = -2 * ((NX - CX) * dx + (NY - CY) * dy) / (dx * dx + dy * dy);
  return [NX + s * dx, NY + s * dy];
}
{ // kiểm: mọi ảnh nằm trên đường tròn; 0 → đáy; u lớn → gần đỉnh; ±1 → hai đầu đường kính ngang khi SU = 2R? (không) — chỉ kiểm hình học
  for (const u of [-3, -2, -1, 0, 0.5, 1, 2, 3, 50]) { const [x, y] = stereo(u);
    if (Math.abs(Math.hypot(x - CX, y - CY) - RR) > 1e-6) throw new Error('d1: chiếu nổi lệch khỏi đường tròn tại ' + u); }
  const [x0, y0] = stereo(0); if (Math.abs(x0 - HX) > 1e-9 || Math.abs(y0 - HY) > 1e-9) throw new Error('d1: 0 không ở đáy');
  const [, yb] = stereo(1e6); if (yb - NY > 1e-3) throw new Error('d1: vô cực không về đỉnh');
  // phép chiếu giữ thứ tự hai phía: u > 0 sang phải trục đối xứng, u < 0 sang trái
  if (!(stereo(1)[0] > HX && stereo(-1)[0] < HX)) throw new Error('d1: chiếu nổi sai phía');
}
// ── số học trên hình: kiểm luật a ÷ b = c ⇔ c × b = a bằng phép tính thật cho ví dụ hữu hạn (12 ÷ 3) ──
if (12 / 3 !== 4 || 4 * 3 !== 12) throw new Error('d1: luật chia/nhân');
// với số máy: Infinity × 0 không ra 1 cũng không ra 2 — đúng ý "một biểu thức, hai đáp án" là mâu thuẫn
if (!Number.isNaN(Infinity * 0) || 1 + Infinity !== 2 + Infinity) throw new Error('d1: tiền đề về ∞ sai');

// ── vết nứt: đường gấp khúc từ mép lỗ, hướng a, mọc theo k; nhóm 0/1/2 mọc ở ba lúc khác nhau ──
const CRACKS = [[12, 0, 620], [168, 0, 560], [78, 0, 380], [126, 0, 330], [-28, 1, 520], [208, 1, 640], [52, 1, 360],
  [-148, 2, 520], [100, 2, 340], [-62, 2, 420], [148, 2, 300]].map(([deg, grp, len], i) => {
  let a = deg * Math.PI / 180, x = HX + Math.cos(a) * HR * 0.9, y = HY + Math.sin(a) * HR * 0.9;
  const P = [[x, y]], n = Math.round(len / 26);
  for (let j = 0; j < n; j++) { a += (hash(i * 31 + j * 7.7) - 0.5) * 0.9; x += Math.cos(a) * 26; y += Math.sin(a) * 26; P.push([x, y]); }
  const bj = Math.floor(n * 0.4), B = [P[bj]]; let ba = deg * Math.PI / 180 + (hash(i * 5.1) > 0.5 ? 0.8 : -0.8), [bx, by] = P[bj];
  for (let j = 0; j < Math.round(n * 0.35); j++) { ba += (hash(i * 17 + j * 3.3) - 0.5) * 0.9; bx += Math.cos(ba) * 22; by += Math.sin(ba) * 22; B.push([bx, by]); }
  return { P, B, grp };
});
function crack(g, P, k, w0) {
  if (k <= 0) return;
  const m = (P.length - 1) * clamp(k), n = Math.floor(m);
  for (const [col, ox, oy, wf] of [['#FFFDF6', -1.6, -1.6, 0.55], [ERA.void.bg, 0, 0, 1]]) {
    g.strokeStyle = col; g.lineCap = 'round';
    for (let i = 0; i < Math.ceil(m); i++) {
      const f = i < n ? 1 : m - n, [x0, y0] = P[i], [x1, y1] = P[i + 1];
      g.lineWidth = Math.max(1, (w0 * (1 - i / (P.length - 1)) + 1) * wf);
      g.beginPath(); g.moveTo(x0 + ox, y0 + oy); g.lineTo(x0 + (x1 - x0) * f + ox, y0 + (y1 - y0) * f + oy); g.stroke();
    }
  }
}
/** Chữ đỏ/mực đan xen trong một dòng: parts = [[chữ, màu], …], viết dần theo k; trả về độ rộng. */
function mixed(g, parts, x, y, k, font, { align = 'left', halo = 12 } = {}) {
  g.save(); g.font = font; g.lineJoin = 'round'; g.lineWidth = halo; g.strokeStyle = E.bg;
  const ws = parts.map(([s]) => g.measureText(s).width), tw = ws.reduce((a, b) => a + b, 0);
  let cx = align === 'center' ? x - tw / 2 : x;
  const total = parts.reduce((a, [s]) => a + s.length, 0); let left = Math.round(total * clamp(k));
  parts.forEach(([s, c], i) => { const n = Math.min(s.length, left); left -= n;
    if (n > 0) { g.textAlign = 'left'; if (halo) g.strokeText(s.slice(0, n), cx, y); g.fillStyle = c; g.fillText(s.slice(0, n), cx, y); } cx += ws[i]; });
  g.restore();
  return { x0: align === 'center' ? x - tw / 2 : x, w: tw, ws };
}

export default class Inf {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      define: w(87, 'define'), one87: w(87, 'one'), zero87: w(87, 'zero'), inf87: w(87, 'infinity'),
      crack: w(88, 'crack'), rest: w(88, 'rest'),
      rule: w(89, 'rule'), if89: w(89, 'if'), c89: w(89, 'c'), then89: w(89, 'then'), a89: w(89, 'a', 2), e89: L(89).end,
      one90: w(90, 'one'), inf90: w(90, 'infinity'), then90: w(90, 'then'), one90b: w(90, 'one', 2),
      two91: w(91, 'two'), inf91: w(91, 'infinity'), so91: w(91, 'so'), two91b: w(91, 'two', 2),
      expr: w(92, 'expression'), diff: w(92, 'different'), one92: w(92, 'one', 2), two92: w(92, 'two', 2),
      or93: w(93, 'or'), inf93: w(93, 'infinity'), ordinary: w(93, 'ordinary'),
      add1: w(94, 'add'), inf94: w(94, 'infinity', 2), add2: w(94, 'add', 2), inf94b: w(94, 'infinity', 4),
      so95: w(95, 'so'), equals95: w(95, 'equals'), inf95: w(95, 'infinity', 2),
      take: w(96, 'take'), both: w(96, 'both'), one96: w(96, 'one'), two96: w(96, 'two'),
      yet: w(97, 'yet'), forbid: w(97, 'forbid'), defining: w(97, 'defining'), one97: w(97, 'one'), zero97: w(97, 'zero'),
      surface: w(98, 'surface'), riemann: w(98, 'riemann'), sphere: w(98, 'sphere'), one98: w(98, 'one'), inf98: w(98, 'infinity'), legal: w(98, 'legal'),
      costs: w(99, 'costs'), look: w(99, 'look'),
      sign: w(100, 'sign'), five: w(100, 'five'), five2: w(100, 'five', 2), bigger: w(100, 'bigger'), smaller: w(100, 'smaller'),
      zt: w(101, 'times'), im: w(101, 'minus'), zo: w(101, 'over'), still: w(101, 'still'), e101: L(101).end,
      never: w(102, 'never'), cant: w(102, "can't"), ifdo: w(102, 'if'), pay: w(102, 'pay'), giving: w(102, 'giving'), something: w(102, 'something'), up: w(102, 'up'), e102: L(102).end,
    };
    this.START = L(87).start;
    this.FROM = this.START - 2.3;
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.one87, kind: 'pen' },               // 1 ÷ 0 = ∞
      { t: T.crack - 0.1, kind: 'tear' },        // giấy RÁCH toả ra từ lỗ (một lần duy nhất cả video)
      { t: T.if89 - 0.1, kind: 'pen' },          // luật đóng khung
      { t: T.one90b, kind: 'snap' },             // đổi dạng: ∞ × 0 = 1
      { t: T.two91, kind: 'pen' },               // 2 ÷ 0 = ∞
      { t: T.two91b, kind: 'snap' },             // đổi dạng: ∞ × 0 = 2
      { t: T.one92, kind: 'error' },             // "1 = 2" đỏ, nứt thêm
      { t: T.inf93, kind: 'pen' },               // ∞ như một số thường
      { t: T.add1, kind: 'pen' },                // 1 + ∞ = ∞ …
      { t: T.so95, kind: 'snap' },               // gộp: 1 + ∞ = 2 + ∞
      { t: T.one96, kind: 'error' },             // "1 = 2" lần hai
      { t: T.yet - 0.1, kind: 'shimmer' },       // "and yet": vết nứt liền lại
      { t: T.one97, kind: 'pen' },               // 1 ÷ 0 (mực, hợp lệ)
      { t: T.riemann, kind: 'pen' },             // mặt cầu Riemann vẽ ra
      { t: T.legal, kind: 'correct' },           // ✓ LEGAL ON THE SPHERE
      { t: T.pay - 0.25, kind: 'pop' },          // hoá đơn trượt vào
      { t: T.e102 + 0.05, kind: 'whoosh' },      // camera lao vào lỗ → terminal
    ];
  }
  render(g, t) {
    const T = this.T;
    const dive = prog(t, T.e102 + 0.05, T.e102 + 1.45);                 // lao vào lỗ → d2 loang từ lỗ
    g.save(); if (dive > 0) diveInto(g, HX, HY, HR, dive);
    ground(g, 'page');

    // ── vết nứt (dưới chữ): mọc ở "crack", "one equals two" (×2); LIỀN lại ở "and yet" ──
    const heal = 1 - outCubic(prog(t, T.yet - 0.1, T.forbid + 0.3));
    const grow = [prog(t, T.crack - 0.1, T.crack + 1.0), prog(t, T.one92 - 0.05, T.one92 + 0.7), prog(t, T.one96 - 0.05, T.one96 + 0.7)];
    if (heal > 0) {
      g.save();
      CRACKS.forEach(({ P, B, grp }) => { const k = outCubic(grow[grp]) * heal;
        crack(g, P, k, 6); crack(g, B, clamp(k * 2.2 - 1.1), 3.5); });
      g.restore();
    }
    const hr = HR * outBack(prog(t, this.START - 0.15, this.START + 0.35));
    if (hr > 0) hole(g, HX, HY, hr, null, { seed: 5 });

    card(g, 'page', prog(t, this.FROM + 0.2, this.FROM + 1.8), 'ACT THREE · THE PRICE', 'Why not just call it infinity?');
    actTitle(g, 'page', t, this.START, 'ACT THREE', 'The price');

    // ── PHẦN 1 (87–92): định nghĩa ∞, luật chia/nhân, 1 = 2 ──
    const out1 = outCubic(prog(t, T.or93 - 0.2, T.or93 + 0.55));
    if (out1 < 1) {
      g.save(); g.translate(0, -out1 * 1150);
      const LX = 480, RX = 1440, Y1 = 420, Y2 = 560;
      const eq = (a, k, x, y) => mixed(g, a, x, y, k, A(92), { align: 'center' });
      eq([['1 ÷ 0 = ', E.ink], ['∞', E.accent]], prog(t, T.one87, T.inf87 + 0.2), LX, Y1);
      // luật, đóng khung
      const kr = prog(t, T.if89 - 0.1, T.a89 + 0.2);
      const rl = mixed(g, [['if  ', E.dim], ['a ÷ b = c', E.ink], ['   then   ', E.dim], ['c × b = a', E.ink]], HX, 268, kr, A(46), { align: 'center' });
      const kb = prog(t, T.a89 + 0.1, T.e89 + 0.5);
      hand(g, [[rl.x0 - 36, 212], [rl.x0 + rl.w + 36, 212], [rl.x0 + rl.w + 36, 296], [rl.x0 - 36, 296], [rl.x0 - 36, 212]], { w: 3, color: E.ink, seed: 41, k: kb });
      typed(g, 'THE RULE', rl.x0 - 36, 196, prog(t, T.rule - 0.1, T.rule + 0.4), M(20), E.dim);
      // 90: 1 ÷ 0 = ∞  →  ∞ × 0 = 1
      arrow(g, LX + 220, Y1 - 30, RX - 270, Y1 - 30, prog(t, T.then90 - 0.1, T.then90 + 0.3), { bend: -14, seed: 51 });
      const r1 = eq([['∞', E.accent], [' × 0 = 1', E.ink]], prog(t, T.inf90 + 0.9, T.one90b + 0.3), RX, Y1);
      // 91: 2 ÷ 0 = ∞  →  ∞ × 0 = 2
      eq([['2 ÷ 0 = ', E.ink], ['∞', E.accent]], prog(t, T.two91, T.inf91 + 0.25), LX, Y2);
      arrow(g, LX + 220, Y2 - 30, RX - 270, Y2 - 30, prog(t, T.so91 - 0.1, T.so91 + 0.3), { bend: -14, seed: 52 });
      eq([['∞', E.accent], [' × 0 = 2', E.ink]], prog(t, T.so91 + 0.15, T.two91b + 0.3), RX, Y2);
      // 92: "one expression" khoanh hai ∞ × 0 · "two different answers" khoanh 1 và 2 · 1 = 2
      g.save(); g.font = A(92); const wl = g.measureText('∞ × 0').width, wr = g.measureText('1').width; g.restore();
      [Y1, Y2].forEach((y, i) => {                                    // "one expression": cùng một ∞ × 0 (gạch chân) …
        strike(g, r1.x0 - 6, y + 22, r1.x0 + wl + 6, y + 20, prog(t, T.expr - 0.1 + i * 0.2, T.expr + 0.2 + i * 0.2), { seed: 61 + i, w: 5 });
        ring(g, r1.x0 + r1.w - wr / 2 + 4, y - 34, wr / 2 + 16, 56, prog(t, T.diff - 0.1 + i * 0.25, T.diff + 0.25 + i * 0.25), { seed: 63 + i }); }); // … hai đáp án
      mixed(g, [['1 = 2', E.accent]], HX, 880, prog(t, T.one92, T.two92 + 0.15), A(120), { align: 'center', halo: 16 });
      cross(g, HX, 838, 120, prog(t, T.two92 + 0.2, T.two92 + 0.6), { seed: 63 });
      g.restore();
    }

    // ── PHẦN 2 (93–96): ∞ như một số thường ──
    const in2 = prog(t, T.or93 - 0.2, T.or93 + 0.4), out2 = outCubic(prog(t, T.yet - 0.25, T.yet + 0.5));
    if (in2 > 0 && out2 < 1) {
      g.save(); g.translate(0, -out2 * 1150);
      mixed(g, [['∞', E.accent]], 700, 290, prog(t, T.inf93, T.inf93 + 0.3), A(72));
      mixed(g, [['AS AN ORDINARY NUMBER?', E.dim]], 790, 278, prog(t, T.ordinary - 0.1, T.ordinary + 0.6), M(26), { halo: 8 });
      const LX = 480, RX = 1440, Y1 = 430, Y2 = 560;
      mixed(g, [['1 + ', E.ink], ['∞', E.accent], [' = ', E.ink], ['∞', E.accent]], LX, Y1, prog(t, T.add1, T.inf94 + 0.3), A(92), { align: 'center' });
      mixed(g, [['2 + ', E.ink], ['∞', E.accent], [' = ', E.ink], ['∞', E.accent]], RX, Y1, prog(t, T.add2, T.inf94b + 0.3), A(92), { align: 'center' });
      const r = mixed(g, [['1 + ', E.ink], ['∞', E.accent], [' = ', E.ink], ['2 + ', E.ink], ['∞', E.accent]], HX, Y2, prog(t, T.so95, T.inf95 + 0.3), A(92), { align: 'center' });
      // 96: "take infinity away from both sides": gạch "+ ∞" ở hai vế, ghi "− ∞" nhỏ bên dưới
      const xa = r.x0 + r.ws[0] - 52, xb = r.x0 + r.ws[0] + r.ws[1] + r.ws[2] + r.ws[3] - 52;
      [[xa, T.take], [xb, T.both]].forEach(([x, a], i) => {
        strike(g, x - 10, Y2 + 8, x + r.ws[1] + 70, Y2 - 72, prog(t, a, a + 0.35), { seed: 71 + i });
      });
      mixed(g, [['1 = 2', E.accent]], HX, 880, prog(t, T.one96, T.two96 + 0.15), A(120), { align: 'center', halo: 16 });
      cross(g, HX, 838, 120, prog(t, T.two96 + 0.2, T.two96 + 0.6), { seed: 73 });
      g.restore();
    }

    // ── PHẦN 3 (97–102): mặt cầu Riemann ngồi trên lỗ ──
    const in3 = prog(t, T.yet, T.yet + 0.3);
    if (in3 > 0) {
      // trái: 1 ÷ 0 = ∞ viết bằng MỰC (hợp lệ ở đây)
      typed(g, '1 ÷ 0', 210, 340, prog(t, T.one97, T.zero97 + 0.3), A(72), E.ink);
      typed(g, 'NOT FORBIDDEN', 212, 396, prog(t, T.zero97 + 0.3, T.zero97 + 0.9), M(22), E.dim);
      g.save(); g.font = A(72); const w10 = g.measureText('1 ÷ 0').width; g.restore();
      typed(g, ' = ∞', 210 + w10, 340, prog(t, T.inf98 - 0.05, T.inf98 + 0.3), A(72), E.ink);
      g.save(); g.font = A(72); const w1i = g.measureText('1 ÷ 0 = ∞').width; g.restore();
      hand(g, [[210 + w1i + 30, 310], [210 + w1i + 46, 330], [210 + w1i + 82, 278]], { w: 5, color: E.ink, seed: 81, k: prog(t, T.legal, T.legal + 0.35) });
      typed(g, 'LEGAL ON THE SPHERE', 212, 432, prog(t, T.legal, T.legal + 0.6), M(22), E.ink);
      // trục số dưới đường tròn
      const kl = prog(t, T.surface - 0.2, T.riemann + 0.3);
      hand(g, seg(200, HY, 1720, HY, 60), { w: 4, color: E.ink, seed: 82, k: kl });
      for (let u = -6; u <= 6; u++) {
        if (u === 0) continue;
        const x = HX + u * SU, k = prog(t, T.surface + Math.abs(u) * 0.06, T.surface + Math.abs(u) * 0.06 + 0.25);
        hand(g, seg(x, HY - 12, x, HY + 12, 3), { w: 3, color: E.ink, seed: 90 + u, k });
        if (Math.abs(u) <= 5) typed(g, u < 0 ? '−' + -u : String(u), x, HY + 58, k, A(38), E.ink, { align: 'center' });
      }
      typed(g, '0', HX, HY + 110, prog(t, T.surface, T.surface + 0.3), A(38), E.ink, { align: 'center' });
      // cái giá: không lớn hơn 5, không nhỏ hơn −5 → khoanh 5 và −5 trên trục
      ring(g, HX + 5 * SU, HY + 44, 34, 34, prog(t, T.five - 0.05, T.five + 0.35), { seed: 83 });
      ring(g, HX - 5 * SU, HY + 44, 44, 34, prog(t, T.five2 - 0.05, T.five2 + 0.35), { seed: 84 });
      // đường tròn (mặt cắt của mặt cầu) vẽ từ đáy (0) vòng lên
      const kc = prog(t, T.riemann, T.sphere + 0.5);
      if (kc > 0) {
        const P = Array.from({ length: 97 }, (_, i) => { const a = Math.PI / 2 + i / 96 * Math.PI * 2; return [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]; });
        hand(g, P, { w: 4, color: E.ink, seed: 85, k: kc, jit: 1 });
      }
      typed(g, 'RIEMANN SPHERE', CX + RR + 20, CY - RR + 40, prog(t, T.riemann, T.sphere + 0.4), M(22), E.dim);
      // tia chiếu từ đỉnh: điểm u trên trục ↔ điểm trên đường tròn (TÍNH bằng stereo)
      const kp = prog(t, T.sphere + 0.2, T.one98 + 0.6);
      [-3, -2, -1, 1, 2, 3].forEach((u, i) => {
        const k = clamp(kp * 1.6 - i * 0.12); if (k <= 0) return;
        const px = HX + u * SU, [qx, qy] = stereo(u);
        hand(g, seg(NX, NY, NX + (px - NX) * k, NY + (HY - NY) * k, 12), { w: 2, color: E.dim, seed: 100 + i, jit: 0.6 });
        if (k >= 1) { g.fillStyle = E.ink; g.beginPath(); g.arc(qx, qy, 7, 0, 7); g.fill(); g.beginPath(); g.arc(px, HY, 6, 0, 7); g.fill(); }
      });
      // "1 ÷ 0 really is infinity": một điểm chạy ra xa hai phía, ảnh của nó trèo lên đỉnh
      const run = prog(t, T.one98, T.inf98 + 0.3);
      if (run > 0) {
        const u = 8 * outCubic(run), back = 1 - prog(t, T.inf98 + 0.5, T.inf98 + 1.0);   // chạy ra ±8, rồi tia rút về đỉnh
        for (const sgn of [1, -1]) {
          const [qx, qy] = stereo(sgn * u), px = HX + sgn * u * SU;
          g.save(); g.strokeStyle = E.ink; g.lineWidth = 2; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(NX, NY); g.lineTo(NX + (px - NX) * back, NY + (HY - NY) * back); g.stroke(); g.restore();
          g.fillStyle = E.ink; g.beginPath(); g.arc(qx, qy, 9, 0, 7); g.fill();
        }
      }
      // đỉnh = ∞ (MỰC — nơi duy nhất ∞ hợp lệ)
      typed(g, '∞', NX, NY - 26, prog(t, T.inf98 - 0.1, T.inf98 + 0.2), A(64), E.ink, { align: 'center' });
      if (prog(t, T.inf98, T.inf98 + 0.2) > 0) { g.fillStyle = E.ink; g.beginPath(); g.arc(NX, NY, 9, 0, 7); g.fill(); }
      // "no sign": ± bên cạnh ∞ bị gạch
      typed(g, '±', NX + 70, NY - 26, prog(t, T.sign - 0.3, T.sign), A(56), E.ink);
      cross(g, NX + 86, NY - 46, 28, prog(t, T.sign, T.sign + 0.4), { seed: 87 });
      // trái: ∞ > 5 · ∞ < −5, gạch
      typed(g, '∞ > 5', 210, 500, prog(t, T.bigger - 0.1, T.five), A(56), E.ink);
      cross(g, 400, 480, 26, prog(t, T.five + 0.1, T.five + 0.45), { seed: 88 });
      typed(g, '∞ < −5', 210, 580, prog(t, T.smaller - 0.1, T.five2), A(56), E.ink);
      cross(g, 440, 560, 26, prog(t, T.five2 + 0.1, T.five2 + 0.45), { seed: 89 });
      // phải: cái giá — vẫn không có đáp án (đỏ)
      typed(g, 'WHAT IT COSTS', 1320, 340, prog(t, T.look, T.costs + 0.3), M(24), E.ink);
      typed(g, '0 × ∞', 1320, 420, prog(t, T.zt - 0.3, T.zt + 0.3), A(46), E.accent);
      typed(g, '∞ − ∞', 1320, 490, prog(t, T.im - 0.3, T.im + 0.3), A(46), E.accent);
      typed(g, '0 / 0', 1320, 560, prog(t, T.zo - 0.3, T.zo + 0.3), A(46), E.accent);
      typed(g, 'STILL', 1540, 470, prog(t, T.still - 0.1, T.still + 0.3), M(24), E.accent);
      typed(g, 'UNDEFINED', 1540, 502, prog(t, T.still + 0.1, T.still + 0.6), M(24), E.accent);
      hand(g, [[1510, 392], [1524, 392], [1524, 556], [1510, 556]], { w: 3, color: E.accent, seed: 91, k: prog(t, T.still - 0.2, T.still + 0.2) });
      // dưới trái: "you can't" bị gạch → "if you do, you pay"
      typed(g, "you can't", 210, 840, prog(t, T.never, T.cant + 0.3), I(54), E.ink);
      strike(g, 200, 826, 440, 822, prog(t, T.cant + 0.35, T.cant + 0.65), { seed: 92 });
      typed(g, 'you can — if you pay', 210, 920, prog(t, T.ifdo, T.pay + 0.35), I(54), E.ink);
      // dưới phải: hoá đơn viết tay
      const kr = prog(t, T.pay - 0.25, T.pay + 0.35);
      if (kr > 0) {
        const rx = 1330, ry = 740 + (1 - outCubic(kr)) * 360, rw = 430, rh = 270;
        g.save(); g.translate(rx + rw / 2, ry); g.rotate(-0.035); g.translate(-rw / 2, 0);
        g.fillStyle = 'rgba(28,38,64,0.12)'; g.fillRect(8, 10, rw, rh);
        g.fillStyle = '#FBF8F0'; g.beginPath(); g.moveTo(0, 0); g.lineTo(rw, 0); g.lineTo(rw, rh);
        for (let i = 0; i <= 20; i++) g.lineTo(rw - i * rw / 20, rh - (i % 2 ? 12 : 0));
        g.closePath(); g.fill(); g.strokeStyle = 'rgba(28,38,64,.3)'; g.lineWidth = 1.5; g.stroke();
        const rows = [['RECEIPT · 1 ÷ 0 = ∞', E.ink, T.pay - 0.1], ['− its sign (±)', E.ink, T.pay + 0.3], ['− its order (< >)', E.ink, T.giving], ['− 0×∞, ∞−∞, 0/0', E.accent, T.something - 0.1]];
        rows.forEach(([s, c, a], i) => typed(g, s, 26, 50 + i * 46, prog(t, a, a + 0.45), M(22), c));
        hand(g, seg(26, 228, rw - 26, 228, 10), { w: 2, color: E.dim, seed: 93, k: prog(t, T.something + 0.1, T.up - 0.1) });
        typed(g, 'PAID', rw - 26, 258 - 8, prog(t, T.up - 0.25, T.up + 0.02), M(22), E.ink, { align: 'right' });
        g.restore();
      }
    }
    // lỗ vẽ lại TRÊN đường tròn/trục: mặt cầu ngồi trên lỗ (đáy = 0)
    if (in3 > 0 && hr > 0) hole(g, HX, HY, hr, null, { seed: 5 });
    g.restore();
  }
}
