// Hồi 3 · "1545 — Cardano: negative and imaginary" (SCRIPT.md) — da thuộc. Câu 63–79 của p2.
//   A (63–66) Cardano + trang bìa Ars Magna · bậc 3, bậc 4 · del Ferro / Tartaglia / Ferrari → Cardano công bố · hai ô "?"
//   B (67–71) trục số mọc sang TRÁI qua 0 · x³ = 15x + 4 có hai nghiệm âm · dấu FICTITIOUS · "smaller than nothing?"
//             (mascot ponder) · cãi nhau nhiều thế kỷ · nợ / dưới 0 độ / hướng → được chấp nhận (gạch dấu)
//   C (72–79) √−15 của Cardano (tổng 10, tích 40) · USELESS · Bombelli 1572: x³ = 15x + 4 → hai căn "bất khả" triệt
//             tiêu → x = 4, thử lại 4³ = 15·4 + 4 · √−1 = i (chữ i lớn, màu nhấn) · dấu IMAGINARY · "just a trick"
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, stamp, lookup } from '../kit.js';

const E = ERA.parchment;

// ── toán: tính bằng số, sai thì ném lỗi lúc init ──
// (a + b·√−1)³ với số phức (re, im)
const cmul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const cube = z => cmul(cmul(z, z), z);
function checkMath() {
  const f = x => x ** 3 - 15 * x - 4;                         // Bombelli: x³ = 15x + 4
  if (f(4) !== 0 || 4 ** 3 !== 64 || 15 * 4 + 4 !== 64) throw new Error('c4: 4 không là nghiệm của x³ = 15x + 4');
  const neg = [-2 - Math.sqrt(3), -2 + Math.sqrt(3)];        // x³ − 15x − 4 = (x − 4)(x² + 4x + 1)
  for (const r of neg) if (Math.abs(f(r)) > 1e-9 || r >= 0) throw new Error('c4: nghiệm âm sai');
  for (const s of [1, -1]) {                                 // (2 ± √−1)³ = 2 ± 11√−1 = 2 ± √−121
    const [re, im] = cube([2, s]);
    if (re !== 2 || im !== 11 * s || 11 * 11 !== 121) throw new Error('c4: ∛(2 ± √−121) ≠ 2 ± √−1');
  }
  if ((2 + 2) !== 4) throw new Error('c4: tổng');
  // Cardano (CONTENT.md): chia 10 thành hai phần có tích 40 → 5 ± √−15
  const p = cmul([5, Math.sqrt(15)], [5, -Math.sqrt(15)]);
  if (Math.abs(p[0] - 40) > 1e-9 || Math.abs(p[1]) > 1e-9 || 5 + 5 !== 10) throw new Error('c4: 5 ± √−15');
  return { neg, check: `4³ = ${4 ** 3} = 15·4 + 4  ✓` };
}
const M = checkMath();

// trục số (phần B)
const NX0 = 1040, NU = 120, NY = 660, nx = v => NX0 + v * NU;

// chữ có các mảnh; trả về [x0, x1] của từng mảnh để gạch
function pieces(g, parts, x, y, font, color, k = 1) {
  g.save(); g.font = font; g.fillStyle = color;
  const total = parts.join('').length, n = Math.round(total * clamp(k)); let used = 0, cx = x; const box = [];
  for (const s of parts) { const w = g.measureText(s).width, take = clamp(n - used, 0, s.length);
    if (take > 0) g.fillText(s.slice(0, take), cx, y); box.push([cx, cx + w]); cx += w; used += s.length; }
  g.restore(); return box;
}
const strike = (g, x0, x1, y, k, color, seed) => hand(g, seg(x0 - 6, y + 4, x1 + 6, y - 10, 8), { w: 5, color, jit: 1.2, seed, k });
const slide = (g, dx, dy, fn) => { if (Math.abs(dx) >= 2000 || Math.abs(dy) >= 1300) return; g.save(); g.translate(dx, dy); fn(); g.restore(); };

export default class Cardano {
  static ERA = 'parchment';
  static IMAGES = {
    cardano: './assets/history/cardano.jpg',
    arsmagna: './assets/history/ArsMagna.jpg',
    tartaglia: './assets/history/Niccolò_Tartaglia.jpg',
  };
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      s63: L(63).start, cardano: w(63, 'cardano'), ars: w(63, 'ars'), great: w(63, 'great'),
      three: w(64, 'three'), four: w(64, 'four'),
      found: w(65, 'found'), ferro: w(65, 'ferro'), tartaglia: w(65, 'tartaglia'), ferrari: w(65, 'ferrari'), public: w(65, 'public'),
      along: w(66, 'along'), two: w(66, 'two'), strange: w(66, 'strange'), things: w(66, 'things'),
      s67: L(67).start, first: w(67, 'first'), negative: w(67, 'negative'),
      cubic: w(68, 'cubic'), solutions: w(68, 'solutions'), fictitious: w(68, 'fictitious'),
      s69: L(69).start, smaller: w(69, 'smaller'), nothing: w(69, 'nothing'),
      s70: L(70).start, centuries: w(70, 'centuries'), arguing: w(70, 'arguing'), s70e: L(70).end,
      accepted: w(71, 'accepted'), eighteenth: w(71, 'eighteenth'), debt: w(71, 'debt'), temperatures: w(71, 'temperatures'),
      direction: w(71, 'direction'), line: w(71, 'line'),
      s72: L(72).start, second: w(72, 'second'), stranger: w(72, 'stranger'),
      square: w(73, 'square'), negnum: w(73, 'negative'), subtle: w(73, 'subtle'), useless: w(73, 'useless'),
      y1572: w(74, 'fifteen'), bombelli: w(74, 'bombelli'), seriously: w(74, 'seriously'),
      impossible: w(75, 'impossible'), calculation: w(75, 'calculation'), cancelled: w(75, 'cancelled'), out: w(75, 'out'),
      real: w(76, 'real'), correct: w(76, 'correct'),
      root77: w(77, 'square'), imaginary: w(77, 'imaginary'), letter: w(77, 'letter'), i: w(77, 'i'),
      centuries2: w(78, 'centuries'), literally: w(78, 'literally'),
      exist: w(79, "didn't"), trick: w(79, 'trick'),
    };
    this.START = this.T.s63;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'parchment');
    card(g, 'parchment', prog(t, this.FROM, T.s63 + 1.0), 'ACT THREE · THE NUMBERS GROW', '1545', 'Cardano, Ars Magna');
    ruler(g, 'parchment', 1545, prog(t, this.FROM + 0.4, T.s63 + 0.4));

    // ═════ A: Cardano, Ars Magna, ai tìm ra công thức ═════
    const aOut = outCubic(prog(t, T.along - 0.1, T.along + 0.55));
    // phải: chân dung + trang bìa (trượt ra phải)
    slide(g, aOut * 1000, 0, () => {
      portrait(g, 'cardano', 'parchment', 1000, 100, 500, prog(t, T.cardano - 0.15, T.cardano + 0.35),
        { style: 'print', label: { name: 'Gerolamo Cardano', life: '1501–1576' } });
      if (t >= T.ars - 0.15) {
        portrait(g, 'arsmagna', 'parchment', 1500, 150, 470, prog(t, T.ars - 0.15, T.ars + 0.35), { style: 'print', rot: 0.015 });
        typed(g, 'ARS MAGNA · 1545', 1500, 700, prog(t, T.ars + 0.1, T.ars + 0.6), '500 20px "IBM Plex Mono"', E.ink);
        typed(g, 'THE GREAT ART', 1500, 730, prog(t, T.great, T.great + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      }
    });
    // trái: bậc 3 · bậc 4 · ba người tìm ra (trượt ra trái)
    slide(g, -aOut * 1100, 0, () => {
      typed(g, 'DEGREE 3 · CUBIC', 110, 410, prog(t, T.three - 0.1, T.three + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'ax³ + bx² + cx + d = 0', 110, 465, prog(t, T.three, T.three + 0.6), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, 'DEGREE 4 · QUARTIC', 110, 520, prog(t, T.four - 0.1, T.four + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'ax⁴ + bx³ + cx² + dx + e = 0', 110, 575, prog(t, T.four, T.four + 0.7), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, 'FOUND BY', 110, 680, prog(t, T.found - 0.1, T.found + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'del Ferro', 110, 770, prog(t, T.ferro - 0.1, T.ferro + 0.35), 'italic 600 54px "Cormorant Garamond"', E.ink);
      if (t >= T.tartaglia - 0.15)
        portrait(g, 'tartaglia', 'parchment', 380, 650, 210, prog(t, T.tartaglia - 0.15, T.tartaglia + 0.3),
          { style: 'print', label: { name: 'Niccolò Tartaglia' } });
      typed(g, 'Ferrari', 650, 770, prog(t, T.ferrari - 0.1, T.ferrari + 0.35), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, "CARDANO'S STUDENT", 650, 805, prog(t, T.ferrari + 0.2, T.ferrari + 0.7), '500 18px "IBM Plex Mono"', E.dim);
      typed(g, 'MADE PUBLIC BY CARDANO, 1545', 110, 990, prog(t, T.public - 0.6, T.public + 0.15), '500 24px "IBM Plex Mono"', E.accent);
    });
    // "two very strange things": hai ô I · II, mỗi ô một dấu hỏi (rơi xuống khi vào phần B)
    if (t >= T.two - 0.2) {
      const down = outCubic(prog(t, T.first - 0.2, T.first + 0.4)) * 900;
      slide(g, 0, down, () => {
        [[560, 'I', T.two, T.strange], [1000, 'II', T.two + 0.15, T.things]].forEach(([x, n, a, b], i) => {
          const kb = prog(t, a - 0.1, a + 0.4);
          hand(g, [[x, 470], [x + 380, 470], [x + 380, 760], [x, 760], [x, 470]], { w: 4, color: E.ink, jit: 1.6, seed: 40 + i, k: kb });
          typed(g, n, x + 20, 505, kb * 2 - 1, '500 26px "IBM Plex Mono"', E.dim);
          const kq = prog(t, b - 0.05, b + 0.2);
          if (kq > 0) { g.save(); g.translate(x + 190, 660); g.scale(outBack(kq), outBack(kq)); g.font = 'italic 600 96px "Cormorant Garamond"';
            g.fillStyle = E.accent; g.textAlign = 'center'; g.fillText('?', 0, 0); g.restore(); }
        });
      });
    }

    // ═════ B: số âm ═════
    const bOut = outCubic(prog(t, T.s72 - 0.15, T.s72 + 0.45)) * 1100;
    if (t >= T.first - 0.2 && bOut < 1100) {
      g.save(); g.translate(0, bOut);
      typed(g, 'I · NEGATIVE NUMBERS', 110, 420, prog(t, T.first, T.negative + 0.4), '500 26px "IBM Plex Mono"', E.accent);
      // trục: phần dương có sẵn, phần âm mọc sang trái ở "negative"
      const kp = prog(t, T.first - 0.1, T.first + 0.4), kn = prog(t, T.negative - 0.05, T.negative + 0.9);
      hand(g, seg(nx(0), NY, nx(2.6), NY, 12), { w: 4, color: E.ink, jit: 1, seed: 7, k: kp });
      hand(g, seg(nx(0), NY, nx(-4.6), NY, 24), { w: 4, color: E.accent, jit: 1, seed: 8, k: kn });
      if (kp >= 1) { g.save(); g.fillStyle = E.ink; g.beginPath(); g.moveTo(nx(2.6) + 18, NY); g.lineTo(nx(2.6) - 4, NY - 10); g.lineTo(nx(2.6) - 4, NY + 10); g.fill(); g.restore(); }
      if (kn >= 1) { g.save(); g.fillStyle = E.accent; g.beginPath(); g.moveTo(nx(-4.6) - 18, NY); g.lineTo(nx(-4.6) + 4, NY - 10); g.lineTo(nx(-4.6) + 4, NY + 10); g.fill(); g.restore(); }
      for (let v = -4; v <= 2; v++) {
        const k = v >= 0 ? prog(t, T.first + v * 0.08, T.first + v * 0.08 + 0.2) : prog(t, T.negative + (-v) * 0.15, T.negative + (-v) * 0.15 + 0.2);
        if (k <= 0) continue; const c = v < 0 ? E.accent : E.ink;
        hand(g, seg(nx(v), NY - 14, nx(v), NY + 14, 2), { w: 3, color: c, jit: 0.5, seed: 20 + v, k });
        typed(g, v < 0 ? '−' + (-v) : String(v), nx(v), NY + 52, k, 'italic 600 44px "Cormorant Garamond"', c, { align: 'center' });
      }
      // x³ = 15x + 4: hai nghiệm âm chấm trên trục
      typed(g, 'x³ = 15x + 4', 110, 525, prog(t, T.cubic - 0.1, T.cubic + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      [['−2 − √3 ≈ ', M.neg[0]], ['−2 + √3 ≈ ', M.neg[1]]].forEach(([s, r], i) => {
        const k = prog(t, T.solutions + i * 0.25 - 0.1, T.solutions + i * 0.25 + 0.25); if (k <= 0) return;
        g.save(); g.fillStyle = E.accent; g.beginPath(); g.arc(nx(r), NY, 11 * outBack(k), 0, 7); g.fill(); g.restore();
        typed(g, s + r.toFixed(2).replace('-', '−'), nx(r), NY + 100, k * 1.5, '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
      });
      // dấu FICTITIOUS (gọi lại mở bài); bị gạch khi số âm được chấp nhận
      stamp(g, 'FICTITIOUS', 770, 540, prog(t, T.fictitious, T.fictitious + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.08 });
      strike(g, 600, 940, 548, prog(t, T.accepted, T.accepted + 0.4), E.ink, 3);
      // "smaller than nothing?": vòng quanh số 0
      const ks = prog(t, T.smaller - 0.1, T.smaller + 0.6), sOut = outCubic(prog(t, T.s70 - 0.1, T.s70 + 0.45)) * -1100;
      slide(g, sOut, 0, () => typed(g, 'smaller than nothing?', 110, 900, ks, 'italic 600 54px "Cormorant Garamond"', E.ink));
      hand(g, Array.from({ length: 41 }, (_, i) => [nx(0) + 34 * Math.cos(i / 40 * 7), NY + 30 + 46 * Math.sin(i / 40 * 7)]),
        { w: 3, color: E.accent, jit: 1.5, seed: 9, k: prog(t, T.nothing - 0.05, T.nothing + 0.4) });
      // "For centuries … kept arguing": 1545 ── yes / no / yes … ── 18th c.
      const ka = prog(t, T.centuries - 0.1, T.centuries + 0.6);
      typed(g, '1545', 110, 905, ka * 3, '500 22px "IBM Plex Mono"', E.dim);
      hand(g, seg(190, 898, 830, 898, 20), { w: 2, color: E.dim, jit: 0.8, seed: 11, k: ka });
      for (let j = 0; j < 6; j++) { const a = T.centuries + 0.3 + (T.s70e - T.centuries) * j / 6;
        typed(g, j % 2 ? 'NO' : 'YES', 230 + j * 100, j % 2 ? 940 : 878, prog(t, a, a + 0.15), '500 20px "IBM Plex Mono"', j % 2 ? E.accent : E.ink); }
      typed(g, '18TH C. · ACCEPTED', 850, 905, prog(t, T.eighteenth - 0.1, T.eighteenth + 0.5), '500 22px "IBM Plex Mono"', E.accent);
      // nợ · dưới 0 độ · hướng
      const icon = (x, a, lab, draw) => { const k = prog(t, a - 0.1, a + 0.25); if (k <= 0) return;
        g.save(); g.translate(x, 850); g.scale(outBack(k), outBack(k)); g.strokeStyle = g.fillStyle = E.ink; g.lineWidth = 4; draw(); g.restore();
        typed(g, lab, x, 975, k * 1.5, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' }); };
      icon(1290, T.debt, 'DEBT', () => {
        g.beginPath(); g.arc(0, 0, 46, 0, 7); g.stroke(); g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke();
        g.fillStyle = E.accent; g.fillRect(-20, -4, 40, 8); });
      icon(1490, T.temperatures, 'BELOW ZERO', () => {
        g.beginPath(); g.roundRect(-10, -60, 20, 92, 10); g.stroke(); g.beginPath(); g.arc(0, 44, 18, 0, 7); g.stroke();
        g.fillStyle = E.accent; g.beginPath(); g.arc(0, 44, 11, 0, 7); g.fill(); g.fillRect(-4, 14, 8, 30);
        g.fillStyle = E.ink; g.fillRect(14, -10, 22, 3); g.font = '500 20px "IBM Plex Mono"'; g.fillText('0', 40, -2);
        g.fillStyle = E.accent; g.fillRect(-46, 18, 22, 6); });
      icon(1690, T.direction, 'DIRECTION', () => {
        g.lineWidth = 5; g.beginPath(); g.moveTo(-56, 0); g.lineTo(56, 0); g.stroke();
        g.fillStyle = E.accent; g.beginPath(); g.moveTo(-64, 0); g.lineTo(-40, -14); g.lineTo(-40, 14); g.fill();
        g.fillStyle = E.ink; g.beginPath(); g.moveTo(64, 0); g.lineTo(40, -14); g.lineTo(40, 14); g.fill();
        g.font = '800 38px "Archivo"'; g.textAlign = 'center'; g.fillStyle = E.accent; g.fillText('−', -40, -24); g.fillStyle = E.ink; g.fillText('+', 40, -24); });
      // "direction on a number line": mũi tên đi sang trái dọc trục
      hand(g, seg(nx(0) - 10, NY - 40, nx(-4.2), NY - 40, 20), { w: 4, color: E.accent, jit: 0.8, seed: 12, k: prog(t, T.direction - 0.1, T.direction + 0.7) });
      if (t >= T.direction + 0.7) { g.save(); g.fillStyle = E.accent; g.beginPath(); g.moveTo(nx(-4.2) - 16, NY - 40); g.lineTo(nx(-4.2) + 4, NY - 50); g.lineTo(nx(-4.2) + 4, NY - 30); g.fill(); g.restore(); }
      g.restore();
    }
    // người dẫn đường: trầm tư ở "smaller than nothing?", lặn xuống khi sang câu sau
    if (t >= T.s69 - 0.3 && t < T.s70 + 0.6) {
      const dn = outCubic(prog(t, T.s70 + 0.05, T.s70 + 0.55)) * 800;
      g.save(); g.translate(0, dn); figure(g, 'ponder', 1640, 1080, 600, 'parchment', prog(t, T.s69 - 0.2, T.s69 + 0.15)); g.restore();
    }

    // ═════ C: căn của số âm → Bombelli → i ═════
    if (t >= T.second - 0.2) {
      typed(g, 'II · ROOTS OF NEGATIVES', 110, 420, prog(t, T.second, T.stranger + 0.3), '500 26px "IBM Plex Mono"', E.accent);
      // Cardano: chia 10 thành hai phần có tích 40
      pieces(g, ['(5 + √−15)(5 − √−15) = 40'], 110, 520, 'italic 600 54px "Cormorant Garamond"', E.ink, prog(t, T.square - 0.1, T.square + 0.8));
      typed(g, 'SUM 10 · PRODUCT 40', 110, 565, prog(t, T.negnum, T.negnum + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'SUBTLE', 110, 640, prog(t, T.subtle - 0.05, T.subtle + 0.3), '500 24px "IBM Plex Mono"', E.ink);
      stamp(g, 'USELESS', 420, 632, prog(t, T.useless, T.useless + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.06 });
      strike(g, 290, 550, 642, prog(t, T.real, T.real + 0.4), E.ink, 5);
      // Bombelli 1572
      typed(g, '1572', 1000, 420, prog(t, T.y1572 - 0.1, T.y1572 + 0.4), '800 64px "Archivo"', E.ink);
      typed(g, 'Rafael Bombelli', 1180, 418, prog(t, T.bombelli - 0.1, T.bombelli + 0.5), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, 'x³ = 15x + 4', 1000, 505, prog(t, T.seriously - 0.2, T.seriously + 0.4), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'x = ³√(2 + √−121) + ³√(2 − √−121)', 1000, 590, prog(t, T.impossible - 0.2, T.impossible + 0.8), 'italic 600 52px "Cormorant Garamond"', E.ink);
      typed(g, '³√(2 ± √−121) = 2 ± √−1', 1000, 670, prog(t, T.calculation - 0.2, T.calculation + 0.6), 'italic 600 52px "Cormorant Garamond"', E.accent);
      typed(g, 'SINCE (2 ± √−1)³ = 2 ± 11√−1 = 2 ± √−121', 1000, 708, prog(t, T.calculation + 0.3, T.calculation + 1.0), '500 18px "IBM Plex Mono"', E.dim);
      const b = pieces(g, ['x = 2 + ', '√−1', ' + 2 − ', '√−1'], 1000, 790, 'italic 600 52px "Cormorant Garamond"', E.ink, prog(t, T.calculation + 0.6, T.cancelled));
      strike(g, b[1][0], b[1][1], 779, prog(t, T.cancelled, T.cancelled + 0.3), E.accent, 13);
      strike(g, b[3][0], b[3][1], 779, prog(t, T.out - 0.2, T.out + 0.15), E.accent, 14);
      typed(g, 'x = 4', 1000, 880, prog(t, T.real - 0.1, T.real + 0.3), 'italic 600 64px "Cormorant Garamond"', E.accent);
      typed(g, 'CHECK  ' + M.check, 1170, 872, prog(t, T.correct - 0.1, T.correct + 0.6), '500 24px "IBM Plex Mono"', E.ink);
      // √−1 = i
      typed(g, '√−1 =', 110, 880, prog(t, T.root77 - 0.1, T.root77 + 0.4), 'italic 600 96px "Cormorant Garamond"', E.ink);
      const ki = prog(t, T.i - 0.1, T.i + 0.25);
      if (ki > 0) { g.save(); g.translate(345, 880); g.scale(2.4 * outBack(ki), 2.4 * outBack(ki)); g.font = 'italic 600 96px "Cormorant Garamond"';
        g.fillStyle = E.accent; g.fillText('i', 0, 0); g.restore(); }
      typed(g, 'imaginary', 480, 735, prog(t, T.imaginary - 0.1, T.imaginary + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, 'FOR 2½ CENTURIES', 480, 785, prog(t, T.centuries2 - 0.3, T.centuries2 + 0.3), '500 22px "IBM Plex Mono"', E.dim);
      stamp(g, 'IMAGINARY', 650, 860, prog(t, T.literally, T.literally + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.06 });
      typed(g, "DIDN'T EXIST", 480, 950, prog(t, T.exist, T.exist + 0.5), '500 24px "IBM Plex Mono"', E.ink);
      typed(g, 'JUST A TRICK FOR CALCULATING', 480, 990, prog(t, T.trick - 0.3, T.trick + 0.6), '500 24px "IBM Plex Mono"', E.accent);
    }
  }
}
