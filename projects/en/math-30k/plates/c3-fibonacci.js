// Hồi 3 · "1202 — Fibonacci, and a ban" (SCRIPT.md) — giấy chép tay. Câu 52–62 của p2.
//   L52 thế giới Hồi giáo: chữ số Ấn Độ | châu Âu: chữ số La Mã (1202 = MCCII) · L53–54 chân dung tưởng tượng + trang Liber Abaci,
//   chữ số Ấn-Ả Rập + nhân tay · L55 sổ cái: cùng phép cộng hai cột La Mã | Ấn-Ả Rập · L56 sách đi theo thương nhân
//   L57–59 1299 · FLORENCE — dấu BANNED (gọi lại mở bài) · không phải tôn giáo: FRAUD
//   L60–61 sửa số: 10 → 100 (thêm 0), 1 → 7 (thêm một nét) · L62 thế kỷ 16 trên nét vạch thời gian
import { ERA, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, stamp, portrait, photo, lookup } from '../kit.js';

const E = ERA.parchment;
const ROM = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const roman = n => ROM.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, '');
const SUM = [347, 225], MUL = [12, 13];                                  // sổ cái: tính bằng số
const DIG = 'italic 600 96px "Cormorant Garamond"', MID = 'italic 600 64px "Cormorant Garamond"';
const yx = y => 200 + (y - 1150) / 500 * 1500;                          // L62: năm 1150–1650 → x

function text(g, s, x, y, font, color, align = 'left') { g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.fillText(s, x, y); g.restore(); }
function width(g, s, font) { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; }
/** quyển sách đóng (bìa có chữ), vẽ ở (x, y) */
function book(g, x, y, k, rot = 0) {
  if (k <= 0) return;
  g.save(); g.translate(x, y + (1 - outCubic(k)) * 500); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-100, -126, 210, 266);
  g.fillStyle = E.accent; g.fillRect(-110, -140, 210, 266);
  g.fillStyle = E.bg; g.fillRect(-90, -100, 170, 90);
  g.font = '500 22px "IBM Plex Mono"'; g.fillStyle = E.ink; g.textAlign = 'center'; g.fillText('LIBER', -5, -66); g.fillText('ABACI', -5, -34);
  g.restore();
}

export default class Fibonacci {
  static ERA = 'parchment';
  static IMAGES = { fibonacci: './assets/history/Fibonacci.jpg', liberabaci: './assets/history/Liber_abbaci_magliab_f124r.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      islamic: w(52, 'islamic'), indian52: w(52, 'indian'), europe52: w(52, 'europe'), roman52: w(52, 'roman'), centuries: w(52, 'centuries'),
      l53: L(53).start, italian53: w(53, 'italian'), merchant: w(53, "merchant's"), leonardo: w(53, 'leonardo'), pisa: w(53, 'pisa'),
      fibonacci: w(53, 'fibonacci'), liber: w(53, 'liber'),
      l54: L(54).start, ha54: w(54, 'hindu-arabic'), methods: w(54, 'methods'), hand54: w(54, 'hand'),
      l55: L(55).start, adding: w(55, 'adding'), multiplying: w(55, 'multiplying'), accounts: w(55, 'accounts'), clearer: w(55, 'clearer'),
      l56: L(56).start, merchants56: w(56, 'merchants'), carried: w(56, 'carried'), around: w(56, 'around'), manual: w(56, 'manual'),
      l57: L(57).start, everyone: w(57, 'everyone'),
      twelve58: w(58, 'twelve'), florence: w(58, 'florence'), banned: w(58, 'banned'), commercial: w(58, 'commercial'),
      religion: w(59, 'religion'), fraud: w(59, 'fraud'),
      l60: L(60).start, hard: w(60, 'hard'), alter: w(60, 'alter'), arabic60: w(60, 'arabic'), easy: w(60, 'easy'),
      l61: L(61).start, zero61: w(61, 'zero'), hundred: w(61, 'hundred'), add2: w(61, 'add', 2), stroke: w(61, 'stroke'), one2: w(61, 'one', 2), seven: w(61, 'seven'),
      l62: L(62).start, sixteenth: w(62, 'sixteenth'), ha62: w(62, 'hindu-arabic'), replace: w(62, 'replace'), europe62: w(62, 'europe'),
    };
    this.START = L(52).start;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'parchment');
    card(g, 'parchment', prog(t, S - 1.4, S + 0.8), 'ACT THREE · THE NUMBERS GROW', '1202', 'Fibonacci, Liber Abaci');
    ruler(g, 'parchment', 1202, prog(t, S - 0.6, S + 0.4));

    // ── L52: hai thế giới — chữ số Ấn Độ | chữ số La Mã ──
    const o52 = outCubic(prog(t, T.italian53 - 0.3, T.italian53 + 0.4));
    if (t >= T.islamic - 0.1 && o52 < 1) {
      g.save(); g.translate(0, o52 * 900);
      typed(g, 'THE ISLAMIC WORLD', 150, 440, prog(t, T.islamic, T.islamic + 0.5), '500 26px "IBM Plex Mono"', E.accent);
      typed(g, '1 2 3 4 5 6 7 8 9 0', 150, 540, prog(t, T.indian52, T.indian52 + 0.7), MID, E.ink);
      hand(g, seg(940, 400, 940, 720, 16), { w: 2.5, color: E.dim, jit: 1, seed: 5, k: prog(t, T.europe52 - 0.3, T.europe52 + 0.2) });
      typed(g, 'EUROPE', 1010, 440, prog(t, T.europe52, T.europe52 + 0.4), '500 26px "IBM Plex Mono"', E.ink);
      typed(g, 'I  V  X  L  C  D  M', 1010, 540, prog(t, T.roman52, T.roman52 + 0.6), MID, E.ink);
      typed(g, 'FOR CENTURIES', 1010, 600, prog(t, T.centuries, T.centuries + 0.4), '500 22px "IBM Plex Mono"', E.dim);
      // cùng một năm, hai cách viết (năm của mốc này)
      typed(g, '1202', 150, 680, prog(t, T.centuries - 0.2, T.centuries + 0.2), MID, E.accent);
      typed(g, roman(1202), 1010, 680, prog(t, T.centuries, T.centuries + 0.6), MID, E.ink);
      g.restore();
    }

    // ── L53–54: Leonardo of Pisa (chân dung tưởng tượng) · trang Liber Abaci · chữ số + nhân tay ──
    const o54 = outCubic(prog(t, T.l55 - 0.3, T.l55 + 0.4));
    if (t >= T.merchant - 0.1 && o54 < 1) {
      g.save(); g.translate(-o54 * 1300, 0);
      typed(g, "AN ITALIAN MERCHANT'S SON", 150, 420, prog(t, T.merchant - 0.1, T.merchant + 0.6), '500 24px "IBM Plex Mono"', E.dim);
      const kl = prog(t, T.liber - 0.2, T.liber + 0.3);
      photo(g, 'liberabaci', 'parchment', 160, 470, 470, kl, { rot: -0.012 });
      typed(g, 'Liber Abaci', 540, 540, prog(t, T.liber, T.liber + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, '1202', 540, 600, prog(t, T.liber + 0.3, T.liber + 0.6), '500 26px "IBM Plex Mono"', E.accent);
      // L54: chữ số Ấn-Ả Rập + phép nhân tay 12 × 13
      typed(g, 'HINDU-ARABIC NUMERALS', 540, 700, prog(t, T.ha54, T.ha54 + 0.6), '500 24px "IBM Plex Mono"', E.accent);
      typed(g, '1 2 3 4 5 6 7 8 9 0', 540, 780, prog(t, T.ha54 + 0.2, T.methods), MID, E.ink);
      const [a, b] = MUL, mx = 1600;
      const rows = [[String(a), 560], [`× ${b}`, 640], [String(a * b), 740]];
      if (t >= T.methods - 0.1) {
        typed(g, 'BY HAND', 1240, 560, prog(t, T.hand54, T.hand54 + 0.4), '500 22px "IBM Plex Mono"', E.dim);
        rows.forEach(([s, y], r) => { const at = T.methods + r * 0.45;
          typed(g, s, mx, y, prog(t, at, at + 0.3), MID, r === 2 ? E.accent : E.ink, { align: 'right' }); });
        hand(g, seg(mx - 170, 668, mx + 10, 668, 10), { w: 3, color: E.ink, jit: 0.8, seed: 61, k: prog(t, T.methods + 0.7, T.methods + 0.9) });
      }
      g.restore();
    }
    const oPor = outCubic(prog(t, T.l54 - 0.2, T.l54 + 0.4));
    if (t >= T.leonardo - 0.2 && oPor < 1) {
      g.save(); g.translate(oPor * 900, 0);
      portrait(g, 'fibonacci', 'parchment', 1430, 340, 420, prog(t, T.leonardo - 0.2, T.leonardo + 0.3),
        { style: 'print', label: { name: 'Leonardo of Pisa', note: 'IMAGINED · NO LIKENESS SURVIVES' } });
      typed(g, '“Fibonacci”', 1430, 950, prog(t, T.fibonacci, T.fibonacci + 0.4), 'italic 600 54px "Cormorant Garamond"', E.accent);
      g.restore();
    }

    // ── L55: sổ cái — cùng phép cộng, hai cách viết (cột La Mã viết chậm) ──
    const o55 = outCubic(prog(t, T.l56 - 0.2, T.l56 + 0.5));
    if (t >= T.l55 - 0.2 && o55 < 1) {
      g.save(); g.translate(-o55 * 1600, 0);
      const kr = prog(t, T.l55 - 0.2, T.l55 + 0.4);
      hand(g, seg(1020, 400, 1020, 960, 20), { w: 3, color: E.dim, jit: 1, seed: 70, k: kr });
      hand(g, seg(200, 470, 1700, 470, 40), { w: 3, color: E.ink, jit: 1, seed: 71, k: kr });
      typed(g, 'ROMAN', 260, 440, kr * 2, '500 26px "IBM Plex Mono"', E.ink);
      typed(g, 'HINDU-ARABIC', 1080, 440, kr * 2, '500 26px "IBM Plex Mono"', E.ink);
      const [p, q] = SUM, rx = 900, ax = 1600, A0 = T.adding;
      // Hindu-Arabic: viết nhanh
      typed(g, String(p), ax, 560, prog(t, A0, A0 + 0.25), MID, E.ink, { align: 'right' });
      typed(g, `+ ${q}`, ax, 640, prog(t, A0 + 0.25, A0 + 0.5), MID, E.ink, { align: 'right' });
      hand(g, seg(ax - 200, 668, ax + 10, 668, 10), { w: 3, color: E.ink, jit: 0.8, seed: 72, k: prog(t, A0 + 0.5, A0 + 0.6) });
      typed(g, String(p + q), ax, 740, prog(t, A0 + 0.6, A0 + 0.85), MID, E.accent, { align: 'right' });
      // La Mã: cùng phép cộng, viết chậm
      typed(g, roman(p), rx, 560, prog(t, A0, A0 + 1.0), MID, E.ink, { align: 'right' });
      typed(g, `+ ${roman(q)}`, rx, 640, prog(t, A0 + 1.0, A0 + 1.9), MID, E.ink, { align: 'right' });
      hand(g, seg(rx - 330, 668, rx + 10, 668, 14), { w: 3, color: E.ink, jit: 0.8, seed: 73, k: prog(t, A0 + 1.9, A0 + 2.1) });
      typed(g, roman(p + q), rx, 740, prog(t, A0 + 2.1, A0 + 3.0), MID, E.ink, { align: 'right' });
      // phép nhân
      const [a, b] = MUL;
      typed(g, `${a} × ${b} = ${a * b}`, ax, 860, prog(t, T.multiplying, T.multiplying + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink, { align: 'right' });
      typed(g, `${roman(a)} × ${roman(b)} = ${roman(a * b)}`, rx, 860, prog(t, T.multiplying, T.multiplying + 1.6), 'italic 600 54px "Cormorant Garamond"', E.ink, { align: 'right' });
      // "far clearer": dấu tích son đỏ cho cột Ấn-Ả Rập
      hand(g, [[1660, 620], [1690, 660], [1760, 560]], { w: 7, color: E.accent, jit: 1, seed: 74, k: prog(t, T.clearer - 0.1, T.clearer + 0.3) });
      typed(g, 'FASTER · CLEARER', 1080, 940, prog(t, T.accounts, T.clearer + 0.3), '500 22px "IBM Plex Mono"', E.accent);
      g.restore();
    }

    // ── L56: sách đi theo thương nhân ──
    const o56 = outCubic(prog(t, T.l57 - 0.3, T.l57 + 0.4));
    if (t >= T.l56 - 0.2 && o56 < 1) {
      g.save(); g.translate(0, o56 * 900);
      [[T.merchants56, 360], [T.carried, 900], [T.around, 1440]].forEach(([a, x], i) => {
        const k = prog(t, a - 0.2, a + 0.3), drift = Math.max(0, t - a) * 30, bob = Math.sin((t - a) * 5 + i) * 6 * (k >= 1 ? 1 : 0);
        book(g, x + drift, 650 + bob, k, (hash(i + 3) - 0.5) * 0.12);
      });
      typed(g, 'LIKE A MANUAL', 900, 900, prog(t, T.manual, T.manual + 0.5), '500 26px "IBM Plex Mono"', E.ink, { align: 'center' });
      g.restore();
    }

    // ── L57–59: 1299 · FLORENCE — BANNED (như mở bài) · không phải tôn giáo: FRAUD ──
    const o59 = outCubic(prog(t, T.l60 - 0.3, T.l60 + 0.4));
    if (t >= T.l57 && o59 < 1) {
      g.save(); g.translate(-o59 * 1900, 0);
      for (let d = 0; d < 10; d++) { const a = T.everyone - 0.3 + d * 0.06; typed(g, String(d), 150 + d * 78, 580, prog(t, a, a + 0.1), DIG, E.ink); }
      typed(g, '1299 · FLORENCE', 150, 450, prog(t, T.twelve58, T.florence + 0.3), '800 64px "Archivo"', E.ink);
      stamp(g, 'BANNED', 1120, 548, prog(t, T.banned, T.banned + 0.25), '800 64px "Archivo"', E.accent, { rot: -0.1 });
      typed(g, 'IN COMMERCIAL BOOKS', 150, 680, prog(t, T.commercial, T.commercial + 0.5), '500 24px "IBM Plex Mono"', E.dim);
      typed(g, 'RELIGION', 1150, 760, prog(t, T.religion, T.religion + 0.4), '800 64px "Archivo"', E.dim);
      const wr = width(g, 'RELIGION', '800 64px "Archivo"');
      hand(g, seg(1135, 742, 1165 + wr, 730, 12), { w: 7, color: E.accent, jit: 1.5, seed: 80, k: prog(t, T.religion + 0.4, T.religion + 0.7) });
      stamp(g, 'FRAUD', 1300, 890, prog(t, T.fraud, T.fraud + 0.25), '800 64px "Archivo"', E.accent, { rot: 0.06 });
      g.restore();
    }

    // ── L60–61: La Mã khó sửa | chữ số Ả Rập dễ sửa: 10 → 100, 1 → 7 ──
    const o61 = outCubic(prog(t, T.l62 - 0.3, T.l62 + 0.4));
    if (t >= T.l60 - 0.1 && o61 < 1) {
      g.save(); g.translate(-o61 * 1900, 0);
      typed(g, 'ROMAN · HARD TO ALTER', 150, 430, prog(t, T.hard - 0.2, T.alter + 0.3), '500 24px "IBM Plex Mono"', E.ink);
      typed(g, 'X', 200, 610, prog(t, T.l60, T.l60 + 0.2), DIG, E.ink, { align: 'center' });
      typed(g, 'I', 200, 830, prog(t, T.l60 + 0.2, T.l60 + 0.4), DIG, E.ink, { align: 'center' });
      typed(g, 'ten', 300, 600, prog(t, T.hard, T.hard + 0.3), 'italic 500 46px "Cormorant Garamond"', E.dim);
      typed(g, 'one', 300, 820, prog(t, T.hard + 0.2, T.hard + 0.5), 'italic 500 46px "Cormorant Garamond"', E.dim);
      hand(g, seg(940, 400, 940, 900, 20), { w: 2.5, color: E.dim, jit: 1, seed: 90, k: prog(t, T.arabic60 - 0.3, T.arabic60 + 0.2) });
      typed(g, 'ARABIC · EASY TO ALTER', 1020, 430, prog(t, T.arabic60, T.easy + 0.3), '500 24px "IBM Plex Mono"', E.accent);
      // 10 → 100: thêm một số 0 ở cuối (son đỏ = nét gian)
      const x10 = 1080;
      typed(g, '10', x10, 610, prog(t, T.easy, T.easy + 0.3), DIG, E.ink);
      const w10 = width(g, '10', DIG);
      typed(g, '0', x10 + w10, 610, prog(t, T.zero61, T.zero61 + 0.2), DIG, E.accent);
      typed(g, `${10} → ${10 * 10}`, 1420, 600, prog(t, T.hundred, T.hundred + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink);
      // 1 → 7: chữ 1 viết tay, thêm một nét ngang ở đầu
      const k1 = prog(t, T.easy + 0.2, T.easy + 0.5);
      hand(g, [[1112, 710], [1100, 760], [1090, 820]], { w: 11, color: E.ink, jit: 0.5, seed: 91, k: k1 });
      hand(g, [[1112, 710], [1096, 724]], { w: 9, color: E.ink, jit: 0.3, seed: 92, k: k1 });
      hand(g, seg(1056, 710, 1114, 708, 6), { w: 11, color: E.accent, jit: 0.6, seed: 93, k: prog(t, T.stroke - 0.1, T.stroke + 0.25) });
      typed(g, '1 → 7', 1420, 790, prog(t, T.seven, T.seven + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink);
      g.restore();
    }

    // ── L62: thế kỷ 16 — Hindu-Arabic thay La Mã khắp châu Âu ──
    if (t >= T.l62 - 0.1) {
      const k = prog(t, T.l62, T.l62 + 0.8);
      hand(g, seg(200, 700, 1700, 700, 50), { w: 4, color: E.ink, jit: 1, seed: 100, k });
      [[1202, 'LIBER ABACI'], [1299, 'FLORENCE BAN']].forEach(([y, s], i) => {
        const kk = prog(t, T.l62 + 0.4 + i * 0.3, T.l62 + 0.7 + i * 0.3);
        hand(g, seg(yx(y), 680, yx(y), 720, 4), { w: 4, color: E.ink, jit: 0.5, seed: 101 + i, k: kk });
        typed(g, String(y), yx(y), 770, kk, '500 24px "IBM Plex Mono"', E.ink, { align: 'center' });
        typed(g, s, yx(y), 806, kk, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
      });
      const kb = prog(t, T.sixteenth - 0.1, T.sixteenth + 0.6);
      hand(g, [[yx(1500), 660], ...seg(yx(1500), 650, yx(1600), 650, 20), [yx(1600), 660]], { w: 6, color: E.accent, jit: 1, seed: 105, k: kb });
      typed(g, '16TH CENTURY', (yx(1500) + yx(1600)) / 2, 620, kb, '500 26px "IBM Plex Mono"', E.accent, { align: 'center' });
      typed(g, 'ACROSS EUROPE', (yx(1500) + yx(1600)) / 2, 770, prog(t, T.europe62 - 0.2, T.europe62 + 0.4), '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
      // thay chữ: CCCXLVII gạch đi, 347 viết bên cạnh
      const p = SUM[0];
      typed(g, roman(p), 260, 520, prog(t, T.ha62 - 0.3, T.ha62 + 0.4), MID, E.ink);
      const wr = width(g, roman(p), MID);
      hand(g, seg(250, 505, 270 + wr, 495, 14), { w: 6, color: E.accent, jit: 1.2, seed: 106, k: prog(t, T.replace - 0.1, T.replace + 0.3) });
      typed(g, `→ ${p}`, 300 + wr, 520, prog(t, T.replace + 0.2, T.replace + 0.6), MID, E.accent);
    }
  }
}
