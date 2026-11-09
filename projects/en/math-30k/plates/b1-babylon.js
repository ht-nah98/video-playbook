// Hồi 1 · "About 1800 to 1600 BC — Babylon and Egypt" (SCRIPT.md). Câu 0–10 của p2. Nền đất sét → giấy cói (câu 3).
//   L0 dấu nêm 60 + hàng giá trị vị trí kéo sang phân số · L1 x² + x = ¾ (BM 13901) hoàn thành bình phương + bảng nhân
//   L2 ảnh YBC 7289 thật, 1;24,51,10 = 1.41421296… vs √2 · L3 giấy cói loang tròn: Egypt · L4 ảnh Rhind, d = 9 vs 8 → 256/81
//   L5 kim tự tháp · L6 "WHY?" đóng dấu · L7–L8 ba thẻ công thức ✓ nhưng ? · L9 sổ công thức vs chuỗi (chưa có)
//   L10 chuỗi nối liền; cát bò vào từ mép phải (cảnh sau là cát)
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, photo, wedge, stamp, lookup } from '../kit.js';

const C = ERA.clay, P = ERA.papyrus;
const poly = (pts, n = 10) => pts.slice(1).flatMap((q, i) => { const s = seg(...pts[i], ...q, n); return i ? s.slice(1) : s; });
const rect = (x, y, w, h, n = 10) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], n);
const circ = (cx, cy, r, n = 72) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(-Math.PI / 2 + i / n * 2 * Math.PI), cy + r * Math.sin(-Math.PI / 2 + i / n * 2 * Math.PI)]);
const ell = (cx, cy, rx, ry, n = 60) => Array.from({ length: n + 1 }, (_, i) => [cx + rx * Math.cos(Math.PI + i / n * 2 * Math.PI), cy + ry * Math.sin(Math.PI + i / n * 2 * Math.PI)]);
const sup = n => String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('');
// số cơ số 60 kiểu bảng nhân Babylon: 63 → "1,03"
const sx = v => v < 60 ? String(v) : `${Math.floor(v / 60)},${String(v % 60).padStart(2, '0')}`;

// ── toán tính trong code ──
const QX = (-1 + Math.sqrt(1 + 4 * 0.75)) / 2;                 // x² + x = ¾ → x = ½ (BM 13901: area + side = 0;45)
if (Math.abs(QX * QX + QX - 0.75) > 1e-12) throw new Error('b1: nghiệm BM 13901 sai');
const YBC = 1 + 24 / 60 + 51 / 3600 + 10 / 216000;             // 1;24,51,10
const YBC_S = YBC.toFixed(8) + '…', R2_S = Math.SQRT2.toFixed(8) + '…';
let SAME = 0; while (YBC_S[SAME] === R2_S[SAME]) SAME++;
const DIFF = Math.SQRT2 - YBC, DEXP = Math.floor(Math.log10(DIFF)), DMAN = Math.round(DIFF / 10 ** DEXP);
const DIFF_S = `DIFFERENCE ≈ ${(DMAN * Math.pow(10, DEXP)).toFixed(-DEXP)}`;   // font không có ⁻
const D = 9, SQ = D - D / 9;                                    // Rhind: hình vuông cạnh 8/9 của đường kính
const PI_EG = SQ * SQ / ((D / 2) ** 2);                          // = 256/81
const PI_NUM = Math.round(PI_EG * 81);
const SQ_AREA = SQ * SQ, CIRC_AREA = Math.PI * (D / 2) ** 2;
const TABLE = 9, ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
const RECIPES = [['RECIPE · EGYPT', `π ≈ ${PI_NUM}/81`], ['RECIPE · BABYLON', 'x² + x = ¾   →   x = ½'], ['RECIPE · BABYLON', '√2 ≈ 1 ; 24 , 51 , 10']];

/** chữ viết vào theo hai nhịp: phần đầu (n ký tự) theo k1, phần sau theo k2 */
function typed2(g, s, n, x, y, k1, k2, font, color) {
  const m = Math.round(n * clamp(k1)) + Math.round((s.length - n) * clamp(k2));
  if (m) typed(g, s.slice(0, m), x, y, 1, font, color);
}

export default class Babylon {
  static ERA = 'clay';
  static IMAGES = { ybc7289: './assets/history/Ybc7289-bw.jpg', rhind: './assets/history/Rhind_Mathematical_Papyrus.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      babylonians: w(0, 'babylonians'), base: w(0, 'base'), sixty: w(0, 'sixty'), pushed: w(0, 'pushed'), further: w(0, 'further'),
      l1: L(1).start, quadratic: w(1, 'quadratic'), equations: w(1, 'equations'), tables: w(1, 'tables'), mult: w(1, 'multiplication'), l1e: L(1).end,
      l2: L(2).start, clay: w(2, 'clay'), y: w(2, 'y'), nine: w(2, 'nine'), student: w(2, 'student'), wrote: w(2, 'wrote'),
      square: w(2, 'square'), two: w(2, 'two', 2), correct: w(2, 'correct'), one: w(2, 'one'), part: w(2, 'part'), million: w(2, 'million'),
      egyptians: w(3, 'egyptians'), same: w(3, 'same'), skilled: w(3, 'skilled'),
      rhind: w(4, 'rhind'), papyrus: w(4, 'papyrus'), area: w(4, 'area'), circle: w(4, 'circle'), rule: w(4, 'rule'), amounts: w(4, 'amounts'),
      pi: w(4, 'pi'), three: w(4, 'three'), six: w(4, 'six'),
      pyramids: w(5, 'pyramids'), astonishing: w(5, 'astonishing'), precision: w(5, 'precision'),
      l6: L(6).start, missing: w(6, 'missing'), thing: w(6, 'one'),
      rules: [w(7, 'rules', 1), w(7, 'rules', 2), w(7, 'rules', 3)], right: w(7, 'right'),
      didnt: w(8, "didn't"), why: w(8, 'why'), true: w(8, 'true'),
      l9: L(9).start, handbook: w(9, 'handbook'), recipes: w(9, 'recipes'), not: w(9, 'not'), system: w(9, 'system'),
      greeks: w(10, 'greeks'), walk: w(10, 'walk'), end: L(10).end,
    };
    this.START = L(0).start;
    this.FROM = this.START - 1.2;
  }

  // ── Babylon trên đất sét (L0–L2) ──
  clay(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'clay');
    card(g, 'clay', prog(t, S - 1.2, S + 0.8), 'ACT ONE · COUNTING', '≈ 1800–1600 BC', 'Babylon and Egypt');
    ruler(g, 'clay', -1700, prog(t, S - 0.5, S + 0.5));

    // L0: dấu nêm 60; hàng giá trị vị trí kéo sang phân số ("pushed it much further")
    const o0 = outCubic(prog(t, T.l1 - 0.2, T.l1 + 0.35));
    if (o0 < 1) {
      g.save(); g.translate(o0 * 1000, 0);
      wedge(g, 'v', 1120, 520, 1.6, prog(t, T.sixty - 0.1, T.sixty + 0.25));
      typed(g, 'BASE 60', 1240, 560, prog(t, T.base, T.sixty + 0.3), '800 64px "Archivo"', C.ink);
      typed(g, 'INHERITED FROM SUMER', 1244, 600, prog(t, T.babylonians + 0.4, T.base), '500 22px "IBM Plex Mono"', C.dim);
      const cells = ['60²', '60', '1', '1/60', '1/60²'];
      cells.forEach((s, i) => {
        const a = T.pushed + i * 0.22, k = prog(t, a, a + 0.25), x = 1010 + i * 160;
        typed(g, s, x + 60, 790, k, '500 34px "IBM Plex Mono"', i > 2 ? C.accent : C.ink, { align: 'center' });
        hand(g, seg(x + 8, 810, x + 112, 810, 6), { w: 3, color: C.ink, seed: 10 + i, k });
      });
      typed(g, ';', 1010 + 2.5 * 160 + 20, 792, prog(t, T.further, T.further + 0.2), '800 64px "Archivo"', C.accent, { align: 'center' });
      typed(g, 'WHOLE NUMBERS  ·  AND FRACTIONS', 1070, 870, prog(t, T.further, T.further + 0.6), '500 22px "IBM Plex Mono"', C.ink);
      g.restore();
    }

    // L1: x² + x = ¾ — hình vuông x, dải 1 × x, cắt đôi, chuyển nửa xuống dưới, thêm góc ¼ (hoàn thành bình phương)
    const o1 = outCubic(prog(t, T.l2 - 0.25, T.l2 + 0.3));
    if (t >= T.quadratic - 0.1 && o1 < 1) {
      g.save(); g.translate(0, o1 * 900);
      const U = 340, s = QX * U, ox = 150, oy = 480;
      typed(g, 'x² + x = ¾', 150, 410, prog(t, T.quadratic, T.quadratic + 0.45), 'italic 600 54px "Cormorant Garamond"', C.ink);
      typed(g, 'BM 13901 · AREA + SIDE = 0;45', 420, 404, prog(t, T.equations, T.equations + 0.6), '500 20px "IBM Plex Mono"', C.ink);
      const kS = prog(t, T.quadratic + 0.1, T.quadratic + 0.5);
      hand(g, rect(ox, oy, s, s), { w: 4, color: C.ink, seed: 1, k: kS });
      typed(g, 'x²', ox + s / 2, oy + s / 2 + 14, kS * 2 - 1, 'italic 600 44px "Cormorant Garamond"', C.ink, { align: 'center' });
      typed(g, 'x', ox - 34, oy + s / 2 + 12, kS, 'italic 600 44px "Cormorant Garamond"', C.ink);
      const kR = prog(t, T.quadratic + 0.45, T.equations + 0.2);
      // nửa trái của dải (đứng yên)
      hand(g, rect(ox + s, oy, U / 2, s), { w: 4, color: C.ink, seed: 2, k: kR });
      typed(g, '½', ox + s + U / 4, oy - 12, kR * 2 - 1, 'italic 600 44px "Cormorant Garamond"', C.ink, { align: 'center' });
      // nửa phải: xoay 90° và chuyển xuống dưới hình vuông
      const mv = outCubic(prog(t, T.equations + 0.35, T.equations + 0.85));
      const c0 = [ox + s + U / 2 + U / 4, oy + s / 2], c1 = [ox + s / 2, oy + s + U / 4];
      g.save(); g.translate(c0[0] + (c1[0] - c0[0]) * mv, c0[1] + (c1[1] - c0[1]) * mv); g.rotate(-Math.PI / 2 * mv);
      hand(g, rect(-U / 4, -s / 2, U / 2, s), { w: 4, color: C.ink, seed: 3, k: kR });
      typed(g, '½', 0, -s / 2 - 12, kR * 2 - 1, 'italic 600 44px "Cormorant Garamond"', C.ink, { align: 'center' });
      g.restore();
      // góc còn thiếu: ¼
      const kC = prog(t, T.equations + 0.85, T.equations + 1.15);
      if (kC > 0) { g.save(); g.fillStyle = C.accent; g.globalAlpha = 0.45; g.fillRect(ox + s, oy + s, U / 2 * kC, U / 2); g.restore(); }
      typed(g, '¼', ox + s + U / 4, oy + s + U / 4 + 14, kC * 2 - 1, 'italic 600 44px "Cormorant Garamond"', C.accent, { align: 'center' });
      hand(g, rect(ox, oy, s + U / 2, s + U / 2), { w: 5, color: C.accent, seed: 4, k: prog(t, T.equations + 1.0, T.equations + 1.4) });
      // các bước
      const a = T.equations + 1.1;
      typed(g, '(x + ½)² = ¾ + ¼ = 1', 560, 560, prog(t, a, a + 0.6), 'italic 600 44px "Cormorant Garamond"', C.ink);
      typed(g, 'x + ½ = 1', 560, 625, prog(t, a + 0.6, a + 0.9), 'italic 600 44px "Cormorant Garamond"', C.ink);
      typed(g, 'x = ½', 560, 720, prog(t, a + 0.9, a + 1.2), 'italic 600 64px "Cormorant Garamond"', C.accent);
      typed(g, 'CHECK  ¼ + ½ = ¾', 564, 780, prog(t, a + 1.2, a + 1.5), '500 22px "IBM Plex Mono"', C.ink);

      // bảng nhân (cơ số 60), gõ vào từng dòng
      typed(g, `MULTIPLICATION TABLE · × ${TABLE}`, 1130, 420, prog(t, T.tables, T.tables + 0.5), '500 22px "IBM Plex Mono"', C.ink);
      hand(g, seg(1250, 445, 1250, 445 + ROWS.length * 58, 12), { w: 3, color: C.ink, seed: 20, k: prog(t, T.tables, T.tables + 0.4) });
      ROWS.forEach((n, i) => {
        const b = T.tables + 0.1 + i * 0.12, k = prog(t, b, b + 0.2), y = 490 + i * 58;
        typed(g, String(n), 1210, y, k, '500 34px "IBM Plex Mono"', C.ink, { align: 'right' });
        typed(g, sx(n * TABLE), 1290, y, k, '500 34px "IBM Plex Mono"', n * TABLE >= 60 ? C.accent : C.ink);
        hand(g, seg(1150, y + 16, 1420, y + 16, 8), { w: 1.5, color: C.dim, seed: 30 + i, k });
      });
      const first = ROWS.find(n => n * TABLE >= 60);
      typed(g, `${sx(first * TABLE)} = 60 + ${first * TABLE - 60}`, 1450, 490 + ROWS.indexOf(first) * 58, prog(t, T.mult, T.mult + 0.4), '500 22px "IBM Plex Mono"', C.ink);
      g.restore();
    }

    // L2: YBC 7289 — ảnh thật; vòng quanh 1 24 51 10; giá trị tính bằng code
    if (t >= T.clay - 0.2) {
      const ph = photo(g, 'ybc7289', 'clay', 150, 390, 400, prog(t, T.clay - 0.15, T.clay + 0.3), { rot: -0.015 });
      typed(g, 'YBC 7289', 150, 870, prog(t, T.y, T.nine + 0.3), '800 46px "Archivo"', C.ink);
      typed(g, 'SMALL CLAY TABLET · A STUDENT’S WORK', 152, 908, prog(t, T.student, T.student + 0.7), '500 20px "IBM Plex Mono"', C.ink);
      const sc = 400 / 315;                                          // vạch số trên ảnh: (88..250, 140..178) ở ảnh gốc 338×315
      hand(g, ell(150 + 169 * sc, 390 + 159 * sc, 112 * sc, 30 * sc), { w: 4, color: C.accent, jit: 2, seed: 9, k: prog(t, T.wrote, T.wrote + 0.4) });
      typed(g, '1 ; 24 , 51 , 10', 720, 480, prog(t, T.wrote, T.wrote + 0.6), '800 64px "Archivo"', C.accent);
      typed(g, '= 1 + 24/60 + 51/60² + 10/60³', 726, 540, prog(t, T.wrote + 0.4, T.square), '500 26px "IBM Plex Mono"', C.ink);
      const F = 'italic 600 64px "Cormorant Garamond"';
      typed(g, '=', 880, 650, prog(t, T.square, T.square + 0.1), F, C.ink, { align: 'right' });
      typed(g, YBC_S, 900, 650, prog(t, T.square, T.square + 0.6), F, C.ink);
      typed(g, '√2 =', 880, 750, prog(t, T.two - 0.1, T.two + 0.1), F, C.ink, { align: 'right' });
      typed(g, R2_S, 900, 750, prog(t, T.two, T.two + 0.5), F, C.ink);
      typed(g, 'TABLET', 1260, 650, prog(t, T.square + 0.3, T.square + 0.6), '500 22px "IBM Plex Mono"', C.ink);
      typed(g, 'TRUE', 1260, 750, prog(t, T.two + 0.3, T.two + 0.6), '500 22px "IBM Plex Mono"', C.ink);
      // "correct to …": chữ số trùng gạch chân, phần khác tô màu nhấn
      g.save(); g.font = F; const wSame = g.measureText(YBC_S.slice(0, SAME)).width; g.restore();
      const kc = prog(t, T.correct, T.correct + 0.4);
      hand(g, seg(900, 664, 900 + wSame, 664, 12), { w: 3, color: C.ink, seed: 41, k: kc });
      hand(g, seg(900, 764, 900 + wSame, 764, 12), { w: 3, color: C.ink, seed: 42, k: kc });
      typed(g, YBC_S.slice(SAME, -1), 900 + wSame, 650, kc * 2 - 1, F, C.accent);
      typed(g, R2_S.slice(SAME, -1), 900 + wSame, 750, kc * 2 - 1, F, C.accent);
      typed(g, DIFF_S, 726, 840, prog(t, T.one, T.million + 0.3), '500 26px "IBM Plex Mono"', C.accent);
      typed(g, 'ABOUT ONE PART IN A MILLION', 726, 878, prog(t, T.million, T.million + 0.6), '500 20px "IBM Plex Mono"', C.ink);
    }
  }

  // ── Ai Cập trên giấy cói (L3–L10) ──
  papyrus(g, t) {
    const T = this.T;
    ground(g, 'papyrus');
    card(g, 'papyrus', 1, 'ACT ONE · COUNTING', '≈ 1800–1600 BC', 'Babylon and Egypt');
    ruler(g, 'papyrus', -1700, 1);

    // L3: Egypt
    const o3 = outCubic(prog(t, T.area - 0.4, T.area));
    if (o3 < 1) {
      g.save(); g.translate(-o3 * 900, 0);
      typed(g, 'Egypt', 150, 520, prog(t, T.egyptians, T.egyptians + 0.5), 'italic 600 96px "Cormorant Garamond"', P.ink);
      typed(g, 'SAME TIME AS BABYLON', 156, 580, prog(t, T.same - 0.2, T.same + 0.6), '500 24px "IBM Plex Mono"', P.ink);
      typed(g, 'JUST AS SKILLED', 156, 620, prog(t, T.skilled, T.skilled + 0.4), '500 24px "IBM Plex Mono"', P.accent);
      hand(g, seg(150, 545, 380, 540, 16), { w: 4, color: P.accent, jit: 2, seed: 50, k: prog(t, T.skilled, T.skilled + 0.3) });
      g.restore();
    }

    // L4–L5: ảnh Rhind; d = 9 vs cạnh 8; kim tự tháp — rời khung lúc "But both…"
    const o4 = outCubic(prog(t, T.l6 - 0.15, T.l6 + 0.4));
    if (t >= T.rhind - 0.2 && o4 < 1) {
      g.save(); g.translate(0, o4 * 1000);
      photo(g, 'rhind', 'papyrus', 1060, 100, 300, prog(t, T.rhind - 0.15, T.rhind + 0.3), { rot: 0.012 });
      typed(g, 'RHIND PAPYRUS', 1060, 462, prog(t, T.rhind, T.papyrus + 0.4), '800 46px "Archivo"', P.ink);
      const cx = 330, cy = 730, U = 44, r = D / 2 * U, q = SQ * U;
      hand(g, circ(cx, cy, r), { w: 4, color: P.ink, seed: 51, k: prog(t, T.area, T.circle + 0.3) });
      hand(g, seg(cx - r, cy, cx + r, cy, 14), { w: 2.5, color: P.ink, seed: 52, k: prog(t, T.circle, T.circle + 0.35) });
      typed(g, `d = ${D}`, cx, cy - 14, prog(t, T.circle + 0.2, T.circle + 0.5), 'italic 600 44px "Cormorant Garamond"', P.ink, { align: 'center' });
      hand(g, rect(cx - q / 2, cy - q / 2, q, q), { w: 5, color: P.accent, seed: 53, k: prog(t, T.rule - 0.1, T.rule + 0.35) });
      typed(g, String(SQ), cx, cy + q / 2 - 16, prog(t, T.rule + 0.3, T.rule + 0.5), 'italic 600 44px "Cormorant Garamond"', P.accent, { align: 'center' });
      typed(g, `square   ${SQ}² = ${SQ_AREA}`, 600, 620, prog(t, T.rule, T.rule + 0.5), 'italic 600 44px "Cormorant Garamond"', P.accent);
      typed(g, `circle   π · ${D / 2}² ≈ ${CIRC_AREA.toFixed(1)}`, 600, 684, prog(t, T.amounts - 0.2, T.amounts + 0.4), 'italic 600 44px "Cormorant Garamond"', P.ink);
      const s = `π ≈ ${PI_NUM}/81 ≈ ${PI_EG.toFixed(2)}`, n = s.indexOf('81') + 2;
      typed2(g, s, n, 600, 790, prog(t, T.pi, T.pi + 0.6), prog(t, T.three, T.six + 0.25), 'italic 600 64px "Cormorant Garamond"', P.accent);
      typed(g, `RULE: SQUARE ON ${SQ}/${D} OF THE DIAMETER`, 604, 840, prog(t, T.three - 0.4, T.three + 0.4), '500 20px "IBM Plex Mono"', P.ink);
      // kim tự tháp (độ dốc ≈ 51.8°), các hàng đá, trục và góc vuông ở "precision"
      const bx0 = 1150, bx1 = 1750, by = 940, slope = 51.8 * Math.PI / 180, ax = (bx0 + bx1) / 2, ay = by - (bx1 - bx0) / 2 * Math.tan(slope);
      hand(g, poly([[bx0, by], [ax, ay], [bx1, by], [bx0, by]], 16), { w: 4, color: P.ink, seed: 54, k: prog(t, T.pyramids - 0.1, T.pyramids + 0.45) });
      for (let i = 1; i < 6; i++) { const f = i / 6, y = by - (by - ay) * f, hw = (bx1 - bx0) / 2 * (1 - f), b = T.astonishing + i * 0.08;
        hand(g, seg(ax - hw, y, ax + hw, y, 10), { w: 2, color: P.dim, seed: 60 + i, k: prog(t, b, b + 0.25) }); }
      g.save(); g.setLineDash([10, 10]); hand(g, seg(ax, ay, ax, by, 12), { w: 2.5, color: P.accent, jit: 0, seed: 70, k: prog(t, T.precision, T.precision + 0.3) }); g.restore();
      hand(g, [[ax + 26, by], [ax + 26, by - 26], [ax, by - 26]], { w: 3, color: P.accent, jit: 0, seed: 71, k: prog(t, T.precision + 0.3, T.precision + 0.5) });
      for (const x of [(bx0 + ax) / 2, (ax + bx1) / 2]) hand(g, seg(x, by + 10, x, by + 30, 3), { w: 3, color: P.accent, jit: 0, seed: x, k: prog(t, T.precision + 0.4, T.precision + 0.6) });
      g.restore();
    }

    // L6–L8: WHY? — đóng dấu ở "one thing", đập lại ở "why"; L9 trượt lên khỏi khung
    const oW = outCubic(prog(t, T.l9 - 0.1, T.l9 + 0.4));
    if (t >= T.missing - 0.1 && oW < 1) {
      g.save(); g.translate(0, -oW * 1000);
      const bx = 1120, by = 470, bw = 520, bh = 260, kb = prog(t, T.missing, T.missing + 0.4);
      const edges = poly([[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh], [bx, by]], 40);
      g.save(); g.setLineDash([14, 12]); hand(g, edges, { w: 3, color: P.ink, jit: 0, seed: 80, k: kb }); g.restore();
      typed(g, 'MISSING', bx, by - 18, kb, '500 22px "IBM Plex Mono"', P.ink);
      const bump = Math.max(0, 1 - Math.abs(t - T.why - 0.1) / 0.18) * 0.12;
      g.save(); g.translate(bx + bw / 2, by + bh / 2); g.scale(2 + bump, 2 + bump);
      stamp(g, 'WHY?', 0, 0, prog(t, T.thing, T.thing + 0.3), '800 64px "Archivo"', P.accent);
      g.restore();
      // L8: mỗi thẻ công thức một đường hỏi tới ô WHY?
      RECIPES.forEach((_, i) => { const y = 460 + i * 160, b = T.didnt + i * 0.15, k = prog(t, b, b + 0.35);
        g.save(); g.setLineDash([8, 10]); hand(g, seg(780, y, bx - 16, by + bh / 2, 16), { w: 2.5, color: P.dim, jit: 0, seed: 90 + i, k }); g.restore(); });
      typed(g, 'WHY ARE THE RULES TRUE?', bx + bw / 2, by + bh + 60, prog(t, T.why, T.true + 0.4), '500 26px "IBM Plex Mono"', P.ink, { align: 'center' });
      g.restore();
    }

    // L7: ba thẻ công thức trượt vào; ✓ ở "right answers"; L9 dồn thành một xấp "handbook"
    const pile = outCubic(prog(t, T.handbook - 0.1, T.handbook + 0.5));
    RECIPES.forEach(([h, f], i) => {
      const k = prog(t, T.rules[i] - 0.1, T.rules[i] + 0.35); if (k <= 0) return;
      const x0 = 150, y0 = 400 + i * 160, x1 = 170 + i * 26, y1 = 520 + i * 30;
      const x = x0 + (x1 - x0) * pile - (1 - outCubic(k)) * 900, y = y0 + (y1 - y0) * pile;
      g.save(); g.translate(x, y); g.rotate((hash(i + 4) - 0.5) * 0.05 + pile * (i - 1) * 0.04);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(8, 10, 600, 120);
      g.fillStyle = '#E9DBAE'; g.fillRect(0, 0, 600, 120); g.strokeStyle = P.ink; g.lineWidth = 3; g.strokeRect(0, 0, 600, 120);
      typed(g, h, 24, 36, 1, '500 18px "IBM Plex Mono"', P.dim);
      typed(g, f, 24, 94, 1, 'italic 600 44px "Cormorant Garamond"', P.ink);
      const kk = prog(t, T.right + i * 0.15, T.right + i * 0.15 + 0.25);
      hand(g, [[530, 66], [550, 90], [584, 40]], { w: 6, color: P.accent, jit: 0.5, seed: 100 + i, k: kk });
      g.restore();
    });
    typed(g, 'A HANDBOOK OF RECIPES', 170, 760, prog(t, T.handbook, T.recipes + 0.4), '800 46px "Archivo"', P.ink);
    typed(g, 'EACH RULE STANDS ALONE', 174, 800, prog(t, T.recipes + 0.2, T.not), '500 22px "IBM Plex Mono"', P.ink);

    // L9–L10: "not a system" — chuỗi nối (chưa có: nét đứt mờ); "the Greeks walk in" → nối liền bằng màu nhấn
    if (t >= T.not - 0.1) {
      typed(g, 'not a system', 1120, 470, prog(t, T.not, T.system + 0.3), 'italic 600 64px "Cormorant Garamond"', P.ink);
      const solid = prog(t, T.greeks, T.greeks + 0.6);
      for (let i = 0; i < 5; i++) {
        const x = 1150 + i * 140, y = 640, k = prog(t, T.system + i * 0.1, T.system + i * 0.1 + 0.25);
        const on = solid * 5 > i;
        g.save(); if (!on) g.setLineDash([8, 8]);
        hand(g, circ(x, y, 28, 30), { w: on ? 4 : 2.5, color: on ? P.accent : P.dim, jit: 0, seed: 110 + i, k });
        if (i < 4) hand(g, seg(x + 34, y, x + 104, y, 8), { w: on ? 4 : 2.5, color: on ? P.accent : P.dim, jit: 0, seed: 120 + i, k });
        g.restore();
        if (i < 4 && on) { g.save(); g.fillStyle = P.accent; g.beginPath(); g.moveTo(x + 108, y); g.lineTo(x + 94, y - 8); g.lineTo(x + 94, y + 8); g.fill(); g.restore(); }
      }
      typed(g, 'EACH STEP FROM THE LAST', 1124, 730, prog(t, T.greeks, T.greeks + 0.6), '500 22px "IBM Plex Mono"', P.accent);
    }
  }

  render(g, t) {
    const T = this.T;
    const kw = prog(t, T.egyptians - 0.1, T.egyptians + 0.8);
    if (kw < 1) this.clay(g, t);
    if (kw > 0) {
      g.save(); g.beginPath(); g.arc(1420, 640, 2300 * Math.pow(outCubic(kw), 1.3), 0, 7); g.clip();
      this.papyrus(g, t); g.restore();
    }
    // cát (cảnh sau) bò vào từ mép phải trong giây cuối
    const ks = prog(t, T.walk - 0.2, T.end + 0.6);
    if (ks > 0) {
      const wd = 340 * outCubic(ks);
      g.save(); g.beginPath(); g.moveTo(W + 10, -10);
      for (let y = -10; y <= H + 40; y += 40) g.lineTo(W - wd - (hash(y * 0.37) - 0.3) * 50 * Math.min(1, wd / 60), y);
      g.lineTo(W + 10, H + 40); g.closePath(); g.clip(); ground(g, 'sand'); g.restore();
    }
  }
}
