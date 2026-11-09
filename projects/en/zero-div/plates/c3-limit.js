// HỒI 2 · "Getting closer to zero" (SCRIPT.md, p2 câu 67–86) — trang giấy kẻ ô; gốc đồ thị = LỖ ở nhà (960, 640).
//   67–68  trục toạ độ vẽ ra từ lỗ; các điểm x trượt dần về lỗ ("closer and closer")
//   69–72  bảng 1 ÷ 0.1 = 10 … viết từng dòng (tính bằng code), nhánh phải y = 1/x leo lên theo bảng → "+∞ ?"
//   73–75  phía âm: 1 ÷ −0.1 = −10 … ĐỎ, nhánh trái lặn xuống → "−∞ ?"
//   76–78  mascot twoways (phải); hai mũi tên ngược chiều; "no single place where they both arrive"
//   79–80  lim 1/x as x → 0 : DOES NOT EXIST (dấu đỏ); ±∞ bị gạch đỏ — "it simply isn't there"
//   81–86  đồ thị 1/x trượt đi; x/x, 2x/x, x²/x tính bằng hàm, mỗi đường một LỖ nhỏ tại x = 0 (x²/x: chính lỗ lớn) → INDETERMINATE FORM
import { ERA, W, H, clamp, hash, outCubic, prog, ground, hand, seg, typed, lookup, hole, strike, ring, arrow, stamp, card, figure, lens } from '../kit.js';

const E = ERA.page;
const OX = 960, OY = 640, HR = 60;
const U = 70, U2 = 120;                                   // px / đơn vị: đồ thị 1/x và đồ thị 0/0
const XL = 600, XR = 1330, YT = 250, YB = 1035;           // khung trục
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;
const MINUS = '−';
const num = v => (v < 0 ? MINUS : '') + String(Math.abs(v));

// ── toán: bảng 1/x tính và kiểm ──
const ROWS = [1, 2, 3].map(k => {
  const x = Number((10 ** -k).toFixed(k)), v = 1 / x, want = 10 ** k;
  if (Math.abs(v - want) > 1e-9 * want) throw new Error(`c3: 1 ÷ ${x} = ${v} ≠ ${want}`);
  const vn = 1 / -x; if (Math.abs(vn + want) > 1e-9 * want) throw new Error(`c3: 1 ÷ −${x} = ${vn}`);
  return { x, pos: `1 ÷ ${x}`, neg: `1 ÷ ${MINUS}${x}`, vp: num(Math.round(v)), vn: num(Math.round(vn)) };
});
const f = x => 1 / x;
const yMax = (OY - YT) / U;                               // nhánh phải bị cắt ở mép trên khung
const xMin = 1 / yMax, xMax = (XR - 20 - OX) / U;
// nhánh: lấy mẫu hình học (dày gần tiệm cận), từ x = xMax vào x = xMin
const SN = 90, branch = sgn => Array.from({ length: SN + 1 }, (_, i) => { const x = xMax * Math.pow(xMin / xMax, i / SN) * sgn; return [OX + x * U, OY - f(x) * U]; });
const BR = branch(1), BL = branch(-1);
const sOf = x => Math.log(x / xMax) / Math.log(xMin / xMax);          // phần nhánh đã vẽ khi tới x
// 0/0: ba hàm, giá trị tại x → 0 (kiểm số), x = 0 bị loại (0/0)
const G = [
  { f: x => x / x, lim: 1, name: 'x / x', c: 'x / x  → 1' },
  { f: x => 2 * x / x, lim: 2, name: '2x / x', c: '2x / x  → 2' },
  { f: x => x * x / x, lim: 0, name: 'x² / x', c: 'x² / x  → 0' },
];
for (const q of G) {
  if (!Number.isNaN(q.f(0))) throw new Error('c3: ' + q.name + ' tại 0 phải là 0/0');
  for (const x of [1e-3, -1e-3, 1e-6]) if (Math.abs(q.f(x) - q.lim) > 2e-3) throw new Error('c3: ' + q.name + ' không tiến về ' + q.lim);
}
const X3 = (XR - 10 - OX) / U2;                            // ±3 đơn vị
const curve = (q, sgn) => Array.from({ length: 41 }, (_, i) => { const x = sgn * X3 * (1 - i / 40 * 0.999); return [OX + x * U2, OY - q.f(x) * U2]; });

export default class Limit {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = ['twoways'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      l67: L(67).start, e67: L(67).end, l68: L(68).start, closer: w(68, 'closer', 1), e68: L(68).end,
      r1: w(69, 'ten'), r1a: w(69, 'one', 2), r2: w(70, 'hundred'), r2a: w(70, 'one', 2), r3: w(71, 'thousand'), r3a: w(71, 'one', 2),
      smaller: w(72, 'smaller'), bigger: w(72, 'bigger'), inf72: w(72, 'infinity'),
      other: w(73, 'other'),
      n1a: w(74, 'tenth'), n1: w(74, 'ten'), n2a: w(74, 'hundredth'), n2: w(74, 'hundred'), n3a: w(74, 'thousandth'), n3: w(74, 'thousand'),
      negative: w(75, 'negative'), inf75: w(75, 'infinity'),
      l76: L(76).start, plus: w(76, 'plus'), minus76: w(76, 'minus'),
      depends: w(77, 'depends'), side: w(77, 'side'), e77: L(77).end,
      roads: w(78, 'roads'), opposite: w(78, 'opposite'), single: w(78, 'single'), arrive: w(78, 'arrive'),
      limit: w(79, 'limit'), goes: w(79, 'goes'), exist: w(79, 'exist'),
      exotic: w(80, 'exotic'), simply: w(80, 'simply'), there: w(80, 'there'),
      l81: L(81).start, slippery: w(81, 'slippery'),
      take82: w(82, 'take'), shrinks: w(82, 'shrinks'), zero82: w(82, 'zero'), one82: w(82, 'one'),
      take83: w(83, 'take'), two83: w(83, 'two', 2),
      take84: w(84, 'take'), slides: w(84, 'slides'), zero84: w(84, 'zero'),
      zero85: w(85, 'zero'), anything: w(85, 'anything'), depending: w(85, 'depending'),
      indeterminate: w(86, 'indeterminate'),
    };
    this.START = L(67).start;
    this.FROM = this.START - 1.2;
    this.LENS = ((T, F) => [[F, 960, 540, 1], [T.r1a - 0.6, 960, 540, 1], [T.r1a + 0.4, 760, 460, 1.45], [T.bigger, 760, 460, 1.45], [T.inf72 + 0.2, 800, 420, 1.4], [T.other, 800, 420, 1.4], [T.n1a + 0.4, 760, 700, 1.45], [T.inf75 + 0.3, 760, 700, 1.45], [T.l76 + 0.6, 960, 540, 1]])(this.T, this.FROM);
  }

  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.l67 + 0.2, kind: 'pen' },           // trục vẽ ra từ lỗ
      { t: T.r1a - 0.2, kind: 'pen' },           // bảng phía dương, mỗi dòng một nét
      { t: T.r2a - 0.2, kind: 'pen' },
      { t: T.r3a - 0.2, kind: 'pen' },
      { t: T.inf72 - 0.2, kind: 'question' },    // "+∞ ?"
      { t: T.n1a - 0.6, kind: 'pen' },           // bảng phía âm (đỏ)
      { t: T.n2a - 0.6, kind: 'pen' },
      { t: T.n3a - 0.6, kind: 'pen' },
      { t: T.inf75 - 0.2, kind: 'question' },    // "−∞ ?"
      { t: T.limit - 0.1, kind: 'pen' },         // lim 1/x
      { t: T.exist - 0.15, kind: 'error' },      // dấu DOES NOT EXIST
      { t: T.l81 + 0.3, kind: 'pen' },           // "0 / 0 ?"
      { t: T.take82, kind: 'pen' },              // x/x vẽ ra
      { t: T.take83, kind: 'pen' },              // 2x/x
      { t: T.take84, kind: 'pen' },              // x²/x
      { t: T.indeterminate - 0.15, kind: 'error' }, // dấu INDETERMINATE FORM
    ];
  }
  render(g, t) {
    const T = this.T;
    g.save(); lens(g, this.LENS, t);                         // camera đẩy vào chỗ đang đọc (bản 2)
    ground(g, 'page');
    card(g, 'page', prog(t, this.FROM, this.FROM + 1.4), 'ACT TWO · THE BROKEN OPERATION', 'Getting closer to zero');

    // ── trục: vẽ ra từ lỗ (câu 67) ──
    const ka = prog(t, T.l67 + 0.2, T.e67);
    hand(g, seg(OX, OY, XR, OY, 20), { w: 4, color: E.ink, seed: 2, k: ka });
    hand(g, seg(OX, OY, XL, OY, 20), { w: 4, color: E.ink, seed: 3, k: ka });
    hand(g, seg(OX, OY, OX, YT - 10, 20), { w: 4, color: E.ink, seed: 4, k: ka });
    hand(g, seg(OX, OY, OX, YB, 20), { w: 4, color: E.ink, seed: 5, k: ka });
    if (ka >= 1) {
      hand(g, [[XR - 18, OY - 12], [XR + 2, OY], [XR - 18, OY + 12]], { w: 4, color: E.ink, seed: 6 });
      hand(g, [[OX - 12, YT + 8], [OX, YT - 12], [OX + 12, YT + 8]], { w: 4, color: E.ink, seed: 7 });
      typed(g, 'x', XR + 14, OY + 32, 1, M(28), E.dim);
    }

    // ═══ phần 1/x (trượt lên khỏi khung ở câu 81) ═══
    const out1 = outCubic(prog(t, T.l81 - 0.2, T.l81 + 0.6));
    if (out1 < 1) {
      g.save(); g.translate(0, -out1 * 1000);
      // "closer and closer": điểm x trượt về lỗ trên trục
      const kc = prog(t, T.closer - 0.4, T.e68 + 0.4);
      if (kc > 0 && kc < 1) for (let i = 0; i < 5; i++) {
        const x0 = 4.6 - i * 0.55, x = x0 * Math.pow(1 - kc, 1.4) + 0.9 * kc * 0;
        const px = OX + Math.max(x, 0) * U; if (px < OX + HR + 6) continue;
        dot(g, px, OY, 8, E.ink);
      }
      typed(g, 'x → 0', OX + 140, OY + 52, prog(t, T.closer, T.closer + 0.5) * (1 - prog(t, T.r1a - 0.3, T.r1a)), M(28), E.dim);
      // nhánh phải leo lên theo bảng
      const sR = T.r1a - 0.2;
      const kR = lerpK(t, [[sR, 0], [T.r1 + 0.2, sOf(1)], [T.r2 + 0.2, sOf(0.4)], [T.r3 + 0.2, 1]]);
      hand(g, BR, { w: 5, color: E.ink, seed: 12, k: kR, jit: 1 });
      const kL = lerpK(t, [[T.n1a - 0.3, 0], [T.n1 + 0.2, sOf(1)], [T.n2 + 0.2, sOf(0.4)], [T.n3 + 0.2, 1]]);
      hand(g, BL, { w: 5, color: E.accent, seed: 13, k: kL, jit: 1 });

      // bảng (trái)
      typed(g, 'x → 0 FROM THE RIGHT', 200, 290, prog(t, T.r1a - 0.6, T.r1a), M(22), E.dim);
      typed(g, 'x → 0 FROM THE LEFT', 200, 545, prog(t, T.other - 0.2, T.other + 0.5), M(22), E.accent);
      const f34 = M(34);
      ROWS.forEach((r, i) => {
        const ta = [T.r1a, T.r2a, T.r3a][i], tv = [T.r1, T.r2, T.r3][i];
        tok(g, r.pos, 200, 350 + i * 56, prog(t, ta - 0.2, ta + 0.4), f34, E.ink);
        tok(g, '= ' + r.vp, 420, 350 + i * 56, prog(t, tv - 0.1, tv + 0.3), f34, E.ink);
        const na = [T.n1a, T.n2a, T.n3a][i], nv = [T.n1, T.n2, T.n3][i];
        tok(g, r.neg, 200, 605 + i * 56, prog(t, na - 0.6, na + 0.2), f34, E.accent);
        tok(g, '= ' + r.vn, 420, 605 + i * 56, prog(t, nv - 0.1, nv + 0.3), f34, E.accent);
      });
      typed(g, 'smaller divisor → bigger result', 200, 800, prog(t, T.smaller, T.bigger + 0.4), I(44), E.dim);

      // ±∞ ? — mũi tên ở đầu hai nhánh
      const ax = OX + 52, kup = prog(t, T.inf72 - 0.2, T.inf72 + 0.3), kdn = prog(t, T.inf75 - 0.2, T.inf75 + 0.3);
      const thick = prog(t, T.opposite - 0.1, T.opposite + 0.3);
      arrow(g, ax, OY - 230, ax, YT + 6, kup, { w: 4 + thick * 3, seed: 31 });
      typed(g, '+∞ ?', ax + 26, YT + 30, prog(t, T.inf72, T.inf72 + 0.3), A(46), E.ink);
      arrow(g, OX - 52, OY + 230, OX - 52, YB - 70, kdn, { color: E.accent, w: 4 + thick * 3, seed: 33 });
      typed(g, '−∞ ?', OX - 78, YB - 58, prog(t, T.inf75, T.inf75 + 0.3), A(46), E.accent, { align: 'right' });
      // "plus infinity, or minus infinity?" — khoanh
      ring(g, ax + 82, YT + 14, 78, 38, prog(t, T.plus, T.plus + 0.45), { color: E.ink, w: 4, seed: 35 });
      ring(g, OX - 135, YB - 74, 78, 38, prog(t, T.minus76, T.minus76 + 0.45), { seed: 36 });
      // "it isn't some strange, exotic number": ±∞ bị gạch đỏ
      strike(g, ax + 18, YT + 26, ax + 150, YT + 2, prog(t, T.exotic - 0.1, T.exotic + 0.25), { seed: 37 });
      strike(g, OX - 200, YB - 62, OX - 66, YB - 86, prog(t, T.exotic + 0.15, T.exotic + 0.45), { seed: 38 });
      // "depends on which side": hai mũi tên dọc trục tiến vào lỗ
      arrow(g, OX + 330, OY + 40, OX + 90, OY + 40, prog(t, T.side - 0.5, T.side), { w: 3, seed: 41 });
      arrow(g, OX - 330, OY - 40, OX - 90, OY - 40, prog(t, T.side - 0.3, T.side + 0.2), { color: E.accent, w: 3, seed: 42 });
      typed(g, 'FROM THE RIGHT', OX + 110, OY + 82, prog(t, T.side - 0.2, T.side + 0.4), M(22), E.dim);
      typed(g, 'FROM THE LEFT', OX - 110, OY - 62, prog(t, T.side, T.side + 0.5), M(22), E.accent, { align: 'right' });
      // "no single place where they both arrive"
      typed(g, 'TWO ROADS, OPPOSITE SIGNS', OX + 90, OY + 180, prog(t, T.roads - 0.1, T.opposite + 0.4), M(22), E.ink);
      typed(g, 'NO SINGLE PLACE TO ARRIVE', OX + 90, OY + 215, prog(t, T.single - 0.1, T.arrive + 0.3), M(22), E.accent);

      // lim … does not exist (right, after mascot)
      typed(g, 'lim  1/x', 1420, 380, prog(t, T.limit - 0.1, T.limit + 0.5), A(56), E.ink);
      typed(g, 'as x → 0 :', 1420, 432, prog(t, T.goes - 0.2, T.goes + 0.4), M(28), E.ink);
      stamp(g, 'DOES NOT EXIST', 1600, 510, prog(t, T.exist - 0.15, T.exist + 0.25), A(46), E.accent, { rot: -0.06 });
      typed(g, "it simply isn't there", 1420, 610, prog(t, T.simply - 0.1, T.there + 0.4), I(44), E.ink);
      g.restore();
    }

    // ═══ 0/0: ba đường, mỗi đường một lỗ nhỏ tại x = 0 ═══
    const in2 = t >= T.l81 + 0.3;
    const kc = [prog(t, T.take82, T.take82 + 0.8), prog(t, T.take83, T.take83 + 0.8), prog(t, T.take84, T.take84 + 0.8)];
    if (in2) G.forEach((q, i) => {
      hand(g, curve(q, 1), { w: 5, color: E.ink, seed: 50 + i, k: kc[i], jit: 1 });
      hand(g, curve(q, -1), { w: 5, color: E.ink, seed: 60 + i, k: kc[i], jit: 1 });
    });

    // lỗ lớn = gốc; đường x²/x đi thẳng vào nó
    hole(g, OX, OY, HR, null, { seed: 5 });

    if (in2) {
      typed(g, '0 / 0 ?', 200, 300, prog(t, T.l81 + 0.3, T.slippery + 0.3), A(72), E.ink);
      typed(g, 'even more slippery', 200, 352, prog(t, T.slippery - 0.1, T.slippery + 0.6), I(44), E.dim);
      const tc = [T.take82, T.take83, T.take84], tr = [T.one82, T.two83, T.zero84];
      G.forEach((q, i) => {
        if (kc[i] <= 0) return;
        const yEnd = OY - q.f(X3) * U2;
        typed(g, q.name, XR + 16, yEnd + 10, prog(t, tc[i] + 0.5, tc[i] + 0.9), M(28), E.ink);
        // lỗ nhỏ (chấm rỗng) tại x = 0 — x²/x dùng chính lỗ lớn
        if (q.lim !== 0) hole(g, OX, OY - q.lim * U2, 15 * clamp(kc[i] * 3), null, { seed: 70 + i });
        typed(g, q.c, 200, 450 + i * 72, prog(t, tr[i] - 0.2, tr[i] + 0.4), A(46), E.ink);
      });
      // điểm trượt dọc đường về x → 0
      const slide = [[T.shrinks - 0.3, T.zero82 + 0.3], [T.take83 + 0.8, T.two83 + 0.2], [T.slides - 0.2, T.zero84 + 0.3]];
      G.forEach((q, i) => {
        const u = prog(t, slide[i][0], slide[i][1]);
        if (u <= 0 || (i < 2 && t > T.zero85 + 0.5)) return;
        const x = 2.6 * Math.pow(1 - u, 1.3) + (q.lim === 0 ? 0 : 0.16 * u), px = OX + x * U2, py = OY - q.f(x) * U2;
        if (q.lim === 0 && Math.hypot(px - OX, py - OY) < HR) return;      // rơi vào lỗ
        dot(g, px, py, 10, E.ink);
      });
      // "every one of them looks like zero over zero"
      const k0 = prog(t, T.zero85 - 0.1, T.zero85 + 0.5);
      typed(g, '0/0', OX - 26, OY - U2 - 20, k0, M(22), E.accent, { align: 'right' });
      typed(g, '0/0', OX - 26, OY - 2 * U2 - 20, k0, M(22), E.accent, { align: 'right' });
      typed(g, '0/0', OX + 66, OY + 70, k0, M(22), E.accent);
      typed(g, 'same 0/0 — answer: anything', 200, 700, prog(t, T.anything - 0.4, T.anything + 0.8), I(44), E.ink);
      typed(g, 'depends on the road', 200, 752, prog(t, T.depending - 0.1, T.depending + 0.7), I(44), E.dim);
      stamp(g, 'INDETERMINATE FORM', 370, 880, prog(t, T.indeterminate - 0.15, T.indeterminate + 0.3), A(38), E.accent, { rot: -0.05 });
    }

    // mascot twoways — bên phải, không che đồ thị
    const fk = prog(t, T.l76 - 0.3, T.l76 + 0.3) - prog(t, T.e77 + 0.9, T.e77 + 1.3);
    if (fk > 0) figure(g, 'twoways', 1650, H, 660, 'page', fk);
    g.restore();
  }
}

function dot(g, x, y, r, c) { g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore(); }
/** k nội suy tuyến tính theo các mốc [[t, k], …] */
function lerpK(t, P) {
  if (t <= P[0][0]) return P[0][1];
  for (let i = 1; i < P.length; i++) if (t <= P[i][0]) { const [a, ka] = P[i - 1], [b, kb] = P[i]; return ka + (kb - ka) * outCubic(clamp((t - a) / (b - a))); }
  return P.at(-1)[1];
}
/** chữ viết vào theo TỪNG CỤM (cách bởi dấu cách) — không bao giờ lộ một số dở dang (10 → "1") */
function tok(g, s, x, y, k, font, color) {
  const parts = s.split(' '), n = Math.round(parts.length * clamp(k)); if (!n) return;
  typed(g, parts.slice(0, n).join(' '), x, y, 1, font, color);
}
