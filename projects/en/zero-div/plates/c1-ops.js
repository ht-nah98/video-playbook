// Hồi 2 · "Everything works, except division" (SCRIPT.md) — p2 câu 34–47. MỞ HỒI (thẻ ACT TWO). LỖ ở nhà (960, 640).
//   34     ba hàng phép tính: + − × viết vào đúng lúc đọc tên phép
//   35–36  a + 0 = a · 7 + 0 = 7 ✓(mực) · NEUTRAL ELEMENT · mũi tên 7 → 7 ("as it found it")
//   37     7 − 0 = 7 · 7 − 7 = 0 · ✓ lúc "fits"
//   38–40  a × 0 = 0 ✓ · 7 × 0 = 0: BẢY rổ rỗng (đếm bằng code) · 0 × 7 = 0: rổ trượt khỏi trang, chỉ còn nhãn,
//          bảy quả táo rơi vào LỖ
//   41     "black hole": lỗ phình, các tích "… × 0" xoáy vào lỗ
//   42     hàng phép tính trượt lên · "7 ÷ 0 =" viết ra · giấy quanh lỗ NỨT đỏ
//   43–44  0 ÷ 0 = 0 (BRAHMAGUPTA · 628) · a ÷ 0 = ∞ · khahara (BHASKARA · c. 1150)
//   45–46  cả hai bị gạch đỏ · ghi chú "neither definition fits"
//   47     mascot `ponder` bên phải · "?" đỏ sau "7 ÷ 0 ="
import { ERA, W, H, clamp, hash, smooth, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, strike, arrow, card, actTitle, figure } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640;
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

// ── toán TÍNH bằng code (DNA §9) ──
const eq = (a, op, b) => {
  const v = op === '+' ? a + b : op === '−' ? a - b : a * b;
  return `${a} ${op === '*' ? '×' : op} ${b} = ${v}`;
};
const R1 = eq(7, '+', 0), R2a = eq(7, '−', 0), R2b = eq(7, '−', 7), R3a = eq(7, '*', 0), R3b = eq(0, '*', 7);
if (R1 !== '7 + 0 = 7' || R2a !== '7 − 0 = 7' || R2b !== '7 − 7 = 0' || R3a !== '7 × 0 = 0' || R3b !== '0 × 7 = 0') throw new Error('c1: phép tính sai');
const NB = 7, NA = 0;                                           // 7 rổ × 0 táo
if (NB * NA !== 0 || 0 * 7 !== 0) throw new Error('c1: đếm táo sai');
const PULL = [[12, 520, 730], [5, 610, 890], [1000, 1330, 890], [3, 1420, 730]];   // các tích × 0 bị hút vào lỗ
for (const [n] of PULL) if (n * 0 !== 0) throw new Error('c1: × 0');
if (Math.abs(1150 - 628 - 500) > 50) throw new Error('c1: "about five hundred years later"');
const tick = (g, x, y, k, seed) => hand(g, [[x - 16, y], [x - 4, y + 14], [x + 22, y - 18]], { w: 5, color: E.ink, seed, k });
const ROW = [300, 420, 540], X1 = 300, X2 = 690, X3 = 1080;

/** Rổ nét tay (hình thang, nan đan, quai); k vẽ dần. */
function basket(g, x, y, w, h, k, seed) {
  if (k <= 0) return;
  const b = w * 0.78, P = [[x - w / 2, y], [x - b / 2, y + h], [x + b / 2, y + h], [x + w / 2, y], [x - w / 2, y]];
  hand(g, P, { w: 4, color: E.ink, seed, k: clamp(k * 2) });
  for (let i = 1; i < 3; i++) { const v = i / 3, hw = (w + (b - w) * v) / 2;
    hand(g, seg(x - hw, y + h * v, x + hw, y + h * v, 8), { w: 2, color: E.ink, seed: seed + i, k: clamp(k * 3 - 1 - i * 0.3) }); }
  for (let i = 1; i < 4; i++) { const u = i / 4 - 0.5;
    hand(g, seg(x + u * w, y, x + u * b, y + h, 4), { w: 2, color: E.ink, seed: seed + 9 + i, k: clamp(k * 3 - 1.4 - i * 0.1) }); }
  const H2 = Array.from({ length: 21 }, (_, i) => { const a = Math.PI + i / 20 * Math.PI; return [x + Math.cos(a) * w * 0.4, y + Math.sin(a) * h * 0.8]; });
  hand(g, H2, { w: 4, color: E.ink, seed: seed + 20, k: clamp(k * 2 - 1) });
}
/** Quả táo nét mực (tâm 0,0), tô giấy để che lưới. */
function apple(g, r, seed) {
  g.fillStyle = E.bg; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  const P = Array.from({ length: 33 }, (_, i) => { const a = -Math.PI / 2 + i / 32 * Math.PI * 2, d = 1 - 0.18 * Math.pow(Math.cos((a + Math.PI / 2) / 2), 40); return [Math.cos(a) * r * d, Math.sin(a) * r * d * 0.95]; });
  hand(g, P, { w: 3, color: E.ink, seed, jit: 1 });
  hand(g, [[0, -r * 0.8], [2, -r * 1.25]], { w: 3, color: E.ink, seed: seed + 1 });
  hand(g, [[3, -r * 1.05], [14, -r * 1.3], [6, -r * 1.0]], { w: 2, color: E.ink, seed: seed + 2 });
}
/** Vết nứt đỏ từ mép lỗ: đường gãy khúc tất định theo hash. */
function crack(g, ang, len, k, seed) {
  if (k <= 0) return;
  const n = 9, P = [];
  for (let i = 0; i <= n; i++) {
    const d = 66 + len * i / n, a = ang + (i ? (hash(seed + i * 1.7) - 0.5) * 0.22 : 0);
    P.push([HX + Math.cos(a) * d, HY + Math.sin(a) * d]);
  }
  hand(g, P, { w: 4, color: E.accent, jit: 1, seed, k });
  const j = 4, b = P[j], ba = ang + (hash(seed * 3.3) > 0.5 ? 0.6 : -0.6);       // một nhánh
  hand(g, [b, [b[0] + Math.cos(ba) * len * 0.3, b[1] + Math.sin(ba) * len * 0.3]], { w: 3, color: E.accent, seed: seed + 5, k: clamp(k * 2 - 1) });
}
const CRACKS = [[-150, 220], [-38, 260], [-12, 330], [16, 300], [45, 300], [80, 280], [118, 200], [160, 200]];

export default class Ops {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      addition: w(34, 'addition'), subtraction: w(34, 'subtraction'), multiplication: w(34, 'multiplication'),
      add: w(35, 'add'), nothing: w(35, 'nothing'), seven35: w(35, 'seven'), still: w(35, 'still'), seven35b: w(35, 'seven', 2),
      neutral: w(36, 'neutral'), leaves: w(36, 'leaves'), found: w(36, 'found'),
      seven37: w(37, 'seven'), is37: w(37, 'is'), seven37c: w(37, 'seven', 3), zero37b: w(37, 'zero', 2), fits: w(37, 'fits'),
      dramatic: w(38, 'dramatic'), any: w(38, 'any'), zero38b: w(38, 'zero', 2),
      seven39: w(39, 'seven'), baskets39: w(39, 'baskets'), zero39: w(39, 'zero'), no39: w(39, 'no'), all39: w(39, 'all'),
      zero40: w(40, 'zero'), seven40: w(40, 'seven'), apples40: w(40, 'apples'), each40: w(40, 'each'), none: w(40, 'none'),
      black: w(41, 'black'), everything: w(41, 'everything'), pulled: w(41, 'pulled'), end41: L(41).end,
      but: w(42, 'but'), division: w(42, 'division'), falls: w(42, 'falls'),
      brahma: w(43, 'brahmagupta'), zero43: w(43, 'zero'), zero43c: w(43, 'zero', 3),
      five44: w(44, 'five'), bhaskara: w(44, 'bhaskara'), number44: w(44, 'number'), infinite: w(44, 'infinite'), khahara: w(44, 'khahara'),
      quantity: w(44, 'quantity'), zero44b: w(44, 'zero', 2),
      both: w(45, 'both'), wrong45: w(45, 'wrong'),
      neither: w(46, 'neither'), arithmetic: w(46, 'arithmetic'),
      so: w(47, 'so'), wrong47: w(47, 'wrong'),
    };
    this.START = L(34).start;
    this.FROM = this.START - 2.3;                                 // mở hồi
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.addition, kind: 'pen' },            // + − × viết vào
      { t: T.add, kind: 'pen' },                 // a + 0 = a
      { t: T.seven35b + 0.3, kind: 'correct' },  // ✓ 7 + 0 = 7
      { t: T.seven37, kind: 'pen' },             // 7 − 0 = 7
      { t: T.fits, kind: 'correct' },            // ✓ "everything fits"
      { t: T.any, kind: 'pen' },                 // a × 0 = 0
      { t: T.seven39, kind: 'pop' },             // bảy rổ rỗng
      { t: T.seven40, kind: 'pop' },             // bảy quả táo
      { t: T.each40, kind: 'whoosh' },           // táo rơi vào lỗ
      { t: T.everything - 0.2, kind: 'whoosh' }, // "black hole": các tích × 0 xoáy vào lỗ
      { t: T.division - 0.1, kind: 'pen' },      // "7 ÷ 0 ="
      { t: T.falls - 0.1, kind: 'error' },       // giấy quanh lỗ nứt đỏ
      { t: T.zero43, kind: 'pen' },              // 0 ÷ 0 = 0
      { t: T.number44, kind: 'pen' },            // a ÷ 0 = ∞
      { t: T.both, kind: 'error' },              // cả hai bị gạch đỏ
      { t: T.wrong47, kind: 'question' },        // "?" đỏ sau "7 ÷ 0 ="
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'page');
    actTitle(g, 'page', t, this.START, 'ACT TWO', 'The broken operation');
    card(g, 'page', prog(t, this.START, this.START + 1.0), 'ACT TWO · THE BROKEN OPERATION', 'Everything works, except division');

    // ── LỖ: chưa có trong lúc thẻ hồi (khỏi đè chữ), mở ra ở START; nhịp "dramatic"; phình ở "black hole" ──
    const r = 60 * outBack(prog(t, this.START - 0.3, this.START + 0.3))
      + 10 * Math.sin(Math.PI * prog(t, T.dramatic, T.dramatic + 0.7))
      + 20 * outBack(prog(t, T.black, T.black + 0.5)) * (1 - smooth(prog(t, T.but, T.but + 0.8)));

    // ── PHẦN A (34–41): ba hàng phép tính, trượt lên ở "But" ──
    const up = outCubic(prog(t, T.but - 0.1, T.but + 0.5));
    if (up < 1) {
      g.save(); g.translate(0, -up * 760);
      [['+', T.addition], ['−', T.subtraction], ['×', T.multiplication]].forEach(([s, a], i) =>
        typed(g, s, 220, ROW[i], prog(t, a, a + 0.2), A(72), E.ink, { align: 'center' }));
      // + : a + 0 = a · 7 + 0 = 7 · neutral element · mũi tên
      typed(g, 'a + 0 = a', X1, ROW[0], prog(t, T.add, T.nothing), A(72), E.ink);
      typed(g, R1, X2, ROW[0], prog(t, T.seven35, T.seven35b + 0.3), A(72), E.ink);
      tick(g, 1030, ROW[0] - 28, prog(t, T.seven35b + 0.3, T.seven35b + 0.6), 201);
      typed(g, 'NEUTRAL ELEMENT', 1090, ROW[0] - 18, prog(t, T.neutral, T.neutral + 0.6), M(24), E.ink);
      arrow(g, X2 + 22, ROW[0] - 72, X2 + 262, ROW[0] - 72, prog(t, T.leaves, T.found + 0.3), { bend: -40, seed: 202 });
      typed(g, 'UNCHANGED', X2 + 142, ROW[0] - 118, prog(t, T.found, T.found + 0.4), M(20), E.dim, { align: 'center' });
      // − : 7 − 0 = 7 · 7 − 7 = 0
      typed(g, R2a, X1, ROW[1], prog(t, T.seven37, T.is37 + 0.2), A(72), E.ink);
      typed(g, R2b, X2, ROW[1], prog(t, T.seven37c - 0.3, T.zero37b + 0.2), A(72), E.ink);
      tick(g, 1030, ROW[1] - 28, prog(t, T.fits, T.fits + 0.3), 203);
      typed(g, 'EVERYTHING FITS', 1090, ROW[1] - 18, prog(t, T.fits, T.fits + 0.5), M(24), E.ink);
      // × : a × 0 = 0 · 7 × 0 = 0 · 0 × 7 = 0
      typed(g, 'a × 0 = 0', X1, ROW[2], prog(t, T.any, T.zero38b + 0.2), A(72), E.ink);
      tick(g, X1 + 330, ROW[2] - 28, prog(t, T.zero38b + 0.2, T.zero38b + 0.5), 204);
      typed(g, R3a, X2, ROW[2], prog(t, T.seven39, T.zero39 + 0.3), A(72), E.ink);
      tick(g, X2 + 330, ROW[2] - 28, prog(t, T.all39, T.all39 + 0.3), 205);
      typed(g, R3b, X3, ROW[2], prog(t, T.zero40, T.seven40 + 0.3), A(72), E.ink);
      tick(g, X3 + 330, ROW[2] - 28, prog(t, T.none, T.none + 0.3), 206);
      g.restore();
    }
    hole(g, HX, HY, r, null, { seed: 3 });
    if (up < 1) {
      g.save(); g.translate(0, -up * 760);
      // 39: BẢY rổ rỗng (mỗi rổ ghi 0), trượt xuống khỏi trang ở "Zero baskets"
      const bo = outCubic(prog(t, T.zero40 - 0.2, T.zero40 + 0.4));
      if (bo < 1) {
        g.save(); g.translate(0, bo * 420);
        for (let i = 0; i < NB; i++) {
          const x = 330 + i * 210, a = T.seven39 + i * 0.1;
          basket(g, x, 820, 130, 96, prog(t, a, a + 0.5), 300 + i * 30);
          typed(g, String(NA), x, 885, prog(t, T.zero39 + i * 0.05, T.zero39 + i * 0.05 + 0.1), M(28), E.ink, { align: 'center' });
        }
        typed(g, `${NB} BASKETS × ${NA} APPLES = ${NB * NA} APPLES`, HX, 980, prog(t, T.no39 - 0.2, T.all39 + 0.2), M(24), E.ink, { align: 'center' });
        g.restore();
      }
      // 40: chỉ còn nhãn; bảy quả táo hiện rồi rơi vào lỗ
      const pl = prog(t, T.everything, T.pulled + 0.3);              // 41: mọi thứ quanh lỗ xoáy vào
      const spiral = (x0, y0, u, draw) => {
        if (u >= 1) return;
        const a0 = Math.atan2(y0 - HY, x0 - HX), R0 = Math.hypot(x0 - HX, y0 - HY), e = smooth(clamp(u));
        const a = a0 + e * 2.6, R = R0 * (1 - e), s = 1 - e * 0.95;
        g.save(); g.translate(HX + Math.cos(a) * R, HY + Math.sin(a) * R); g.rotate(e * 2.5); g.scale(s, s); draw(); g.restore();
      };
      const lab = `0 BASKETS × 7 APPLES = ${0 * 7} APPLES`;
      if (t >= T.zero40) spiral(HX, 980, prog(t, T.everything - 0.2, T.everything + 0.9), () =>
        typed(g, lab, 0, 0, prog(t, T.zero40, T.each40), M(24), E.ink, { align: 'center' }));
      for (let i = 0; i < 7; i++) {
        const ka = outBack(prog(t, T.seven40 + i * 0.05, T.seven40 + i * 0.05 + 0.3)), f = prog(t, T.each40 + i * 0.12, T.each40 + i * 0.12 + 0.55);
        if (ka <= 0 || f >= 1) continue;
        const x0 = 600 + i * 120, y0 = 860, e = f * f;
        g.save(); g.translate(x0 + (HX - x0) * e, y0 + (HY - y0) * e - Math.sin(Math.PI * f) * 90); g.scale(ka * (1 - e * 0.9), ka * (1 - e * 0.9)); g.rotate(f * 3);
        apple(g, 24, 400 + i * 7); g.restore();
      }
      // 41: "black hole" + các tích × 0 xoáy vào
      typed(g, 'BLACK HOLE', HX + 110, HY - 60, prog(t, T.black, T.black + 0.5) * (1 - prog(t, T.end41, T.end41 + 0.4)), M(24), E.ink);
      PULL.forEach(([n, x, y], i) => spiral(x, y, prog(t, T.everything + 0.1 + i * 0.15, T.pulled + 0.4 + i * 0.1), () =>
        typed(g, `${n} × 0`, 0, 0, prog(t, T.black + 0.3 + i * 0.12, T.black + 0.6 + i * 0.12), A(56), E.ink, { align: 'center' })));
      g.restore();
    }

    // ── PHẦN B (42–47): 7 ÷ 0 = · giấy nứt · hai định nghĩa cũ, gạch đỏ ──
    if (t > T.but) {
      typed(g, '7 ÷ 0 =', HX, 450, prog(t, T.division - 0.1, T.division + 0.5), A(92), E.ink, { align: 'center' });
      const qx = HX + 200;
      typed(g, '?', qx, 450, prog(t, T.wrong47, T.wrong47 + 0.2), A(92), E.accent);
      CRACKS.forEach(([d, len], i) => crack(g, d * Math.PI / 180, len, prog(t, T.falls - 0.1 + i * 0.06, T.falls + 0.4 + i * 0.06), 500 + i * 13));
      hole(g, HX, HY, r, null, { seed: 3 });
      // Brahmagupta
      typed(g, '0 ÷ 0 = 0', 200, 640, prog(t, T.zero43, T.zero43c + 0.2), A(72), E.ink);
      typed(g, 'BRAHMAGUPTA · 628', 204, 684, prog(t, T.brahma, T.brahma + 0.6), M(22), E.dim);
      arrow(g, 230, 700, 230, 770, prog(t, T.five44, T.five44 + 0.5), { color: E.dim, w: 3, bend: 0, seed: 601 });
      typed(g, 'c. 500 YEARS LATER', 262, 748, prog(t, T.five44, T.five44 + 0.6), M(20), E.dim);
      // Bhaskara
      typed(g, 'a ÷ 0 = ∞', 200, 850, prog(t, T.number44, T.infinite + 0.3), A(72), E.ink);
      typed(g, 'khahara', 600, 850, prog(t, T.khahara, T.khahara + 0.5), I(64), E.ink);
      typed(g, 'BHASKARA · c. 1150', 204, 894, prog(t, T.bhaskara, T.bhaskara + 0.6), M(22), E.dim);
      typed(g, 'THE QUANTITY WHOSE DIVISOR IS ZERO', 204, 926, prog(t, T.quantity, T.zero44b + 0.3), M(20), E.dim);
      // 45: cả hai bị gạch đỏ · 46: ghi chú
      strike(g, 186, 618, 560, 608, prog(t, T.both, T.both + 0.3), { seed: 611 });
      strike(g, 186, 828, 560, 818, prog(t, T.wrong45 - 0.2, T.wrong45 + 0.2), { seed: 612 });
      typed(g, 'NEITHER DEFINITION FITS THE REST OF ARITHMETIC', 204, 990, prog(t, T.neither, T.arithmetic + 0.3), M(22), E.ink);
    }
    // 47: ponder bên phải
    figure(g, 'ponder', 1690, H, 700, 'page', prog(t, T.so - 0.5, T.so - 0.1));
  }
}
