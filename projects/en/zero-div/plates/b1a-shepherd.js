// Hồi 1 · "Why zero came so late" (SCRIPT.md) — nửa đầu, p2 câu 0–9. MỞ HỒI và mở trang p2: từ đen (iris quanh lỗ).
//   0–2  người chăn cừu: ba con cừu, mỗi con một vạch đếm + 1, 2, 3 · "zero sheep": chuồng trống "0 ?" · ponder
//   3–5  "useless" gạch đỏ · I V X L C D M viết đúng lúc đọc, ô sau M trống bị ✗ đỏ · cộng / cầu / sổ sách ✓
//   6–9  ba cột HUNDREDS · TENS · ONES dựng quanh LỖ (lỗ = cột chục trống) · 3 và 5 viết vào · "Leave that
//        something out": hai chữ số nhấc khỏi cột, chập lại → "35" đỏ, "READER SEES"
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, strike, cross, ring, arrow, card, actTitle, figure, iris } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640;                                     // nhà của lỗ
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

// số La Mã — tính, không gõ tay (DNA §9)
const RV = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const roman = s => [...s].reduce((a, c, i, r) => a + (RV[c] < (RV[r[i + 1]] || 0) ? -RV[c] : RV[c]), 0);
const SUM = ['XII', 'VII', 'XIX'];
if (roman(SUM[0]) + roman(SUM[1]) !== roman(SUM[2])) throw new Error('b1a: phép cộng La Mã sai');
if (3 * 100 + 0 * 10 + 5 !== 305 || 3 * 10 + 5 !== 35) throw new Error('b1a: 305 / 35 sai');

/** Con cừu nét tay: thân mây (vòng cung nhỏ), đầu, bốn chân; k vẽ dần. */
function sheep(g, x, y, k, seed) {
  if (k <= 0) return;
  const body = [];
  for (let i = 0; i <= 60; i++) {
    const a = i / 60 * Math.PI * 2, bump = 1 + 0.12 * Math.abs(Math.sin(a * 5));
    body.push([x + Math.cos(a) * 70 * bump, y + Math.sin(a) * 42 * bump]);
  }
  hand(g, body, { w: 4, color: E.ink, seed, k: clamp(k * 1.6) });
  const kh = clamp(k * 3 - 1.4);
  if (kh > 0) {
    g.save(); g.fillStyle = E.ink; g.globalAlpha = 1;
    g.beginPath(); g.ellipse(x + 86, y - 14, 22 * kh, 15 * kh, -0.3, 0, 7); g.fill(); g.restore();
  }
  [-40, -16, 18, 42].forEach((dx, i) => hand(g, seg(x + dx, y + 40, x + dx, y + 72, 3), { w: 4, color: E.ink, seed: seed + i, k: clamp(k * 4 - 2.4 - i * 0.1) }));
}
const tick = (g, x, y, k, seed) => hand(g, [[x - 16, y], [x - 4, y + 14], [x + 22, y - 18]], { w: 5, color: E.ink, seed, k });

export default class Shepherd {
  static ERA = 'page';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1a');
    this.T = {
      shepherd: w(0, 'shepherd'), counting0: w(0, 'counting'), sheep0: w(0, 'sheep'),
      first: w(1, 'first'), one: w(1, 'one'), two: w(1, 'two'), three: w(1, 'three'),
      zero2: w(2, 'zero'), noSheep: w(2, 'no'), what: w(2, 'what'), exactly: w(2, 'exactly'), e2: L(2).end,
      zero3: w(3, 'zero'), useless: w(3, 'useless'), romans3: w(3, 'romans'), never3: w(3, 'never'),
      roman: w(4, 'roman'), I: w(4, 'i'), V: w(4, 'v'), X: w(4, 'x'), L: w(4, 'l'), C: w(4, 'c'), D: w(4, 'd'), M: w(4, 'm'),
      noSign: w(4, 'no'), zero4: w(4, 'zero'),
      sums: w(5, 'sums'), bridges: w(5, 'bridges'), accounts: w(5, 'accounts'), perfectly: w(5, 'perfectly'),
      trouble: w(6, 'trouble'), write6: w(6, 'write'), position: w(6, 'position'),
      three7: w(7, 'three'), five7: w(7, 'five'), columns7: w(7, 'columns'),
      three8: w(8, 'three'), hundreds: w(8, 'hundreds'), five8: w(8, 'five'), ones: w(8, 'ones'), tens: w(8, 'tens'),
      something: w(8, 'something'), empty: w(8, 'empty'),
      leave: w(9, 'leave'), out: w(9, 'out'), reader: w(9, 'reader'), sees: w(9, 'sees'), thirty5: w(9, 'thirty-five'),
    };
    this.START = L(0).start;
    this.FROM = this.START - 2.3;
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.shepherd + 0.3, kind: 'pop' },      // ba con cừu
      { t: T.one - 0.05, kind: 'pen' },          // vạch đếm 1, 2, 3
      { t: T.zero2 - 0.2, kind: 'pen' },         // chuồng trống kẻ ra
      { t: T.what, kind: 'question' },           // "?" đỏ trong chuồng
      { t: T.useless, kind: 'error' },           // gạch đỏ số 0 — "useless"
      { t: T.I - 0.05, kind: 'pen' },            // I V X L C D M viết ra
      { t: T.sums - 0.35, kind: 'pen' },         // cộng · cầu · sổ sách
      { t: T.perfectly - 0.1, kind: 'correct' }, // ba dấu ✓
      { t: T.write6, kind: 'pen' },              // ba cột quanh lỗ
      { t: T.three8 - 0.05, kind: 'pen' },       // 3 và 5 viết vào cột
      { t: T.out - 0.1, kind: 'snap' },          // hai chữ số chập lại → 35
      { t: T.thirty5 - 0.1, kind: 'error' },     // 35 đỏ, "≠ 305"
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'page');
    card(g, 'page', prog(t, this.START - 0.2, this.START + 1.4), 'ACT ONE · NOTHING', 'Why zero came so late');

    // LỖ ở nhà suốt cảnh; cột chục dựng quanh nó → "empty": lỗ phình nhẹ (r 60 → 70)
    // thẻ HỒI chiếm y 420–610 → lỗ nhỏ (r 34) nằm ngay dưới chữ "Nothing", mở ra r 60 khi thẻ trượt lên
    const hr = 34 + 26 * outBack(prog(t, this.START - 0.35, this.START + 0.4)) + 10 * outBack(prog(t, T.empty - 0.15, T.empty + 0.35));
    hole(g, HX, HY, hr, null, { seed: 3 });

    // ── 0–3: cừu, vạch đếm, chuồng trống — trượt lên khỏi trang ở "Romans" (câu 3) ──
    const up1 = outCubic(prog(t, T.romans3 - 0.1, T.romans3 + 0.6)) * -760;
    if (up1 > -760) {
      g.save(); g.translate(0, up1);
      typed(g, 'A SHEPHERD, THOUSANDS OF YEARS AGO', 200, 250, prog(t, T.shepherd, T.shepherd + 1.0), M(22), E.dim);
      const SX = [300, 520, 740], SY = 380;
      const kTally = [T.one, T.two, T.three];
      SX.forEach((x, i) => {
        sheep(g, x, SY, prog(t, T.shepherd + 0.3 + i * 0.5, T.shepherd + 1.2 + i * 0.5), 100 + i * 10);
        const k = prog(t, kTally[i] - 0.05, kTally[i] + 0.25);
        hand(g, seg(x - 4, 500, x + 4, 572, 4), { w: 6, color: E.ink, seed: 130 + i, k });        // vạch đếm
        typed(g, String(i + 1), x, 690, k * 1.5, A(92), E.ink, { align: 'center' });
      });
      typed(g, 'COUNTING STARTS AT ONE', 200, 770, prog(t, T.first, T.one + 0.4), M(22), E.dim);
      // "zero sheep": chuồng trống — rào nét tay, bên trong "0 ?"
      const kp = prog(t, T.zero2 - 0.2, T.zero2 + 0.5);
      const PX0 = 1020, PX1 = 1360, PY0 = 280, PY1 = 500;
      hand(g, [[PX0, PY0], [PX1, PY0], [PX1, PY1], [PX0, PY1], [PX0, PY0]], { w: 4, color: E.ink, seed: 140, k: kp });
      for (let i = 1; i < 7; i++) { const x = PX0 + (PX1 - PX0) * i / 7; const kk = clamp(kp * 2 - 1 - i * 0.05); hand(g, seg(x, PY0 - 22, x, PY0 + 26, 2), { w: 3, color: E.ink, seed: 150 + i, k: kk }); hand(g, seg(x, PY1 - 26, x, PY1 + 22, 2), { w: 3, color: E.ink, seed: 160 + i, k: kk }); }
      typed(g, 'ZERO SHEEP', PX0, PY1 + 64, prog(t, T.zero2, T.zero2 + 0.5), M(22), E.dim);
      typed(g, 'EMPTY PEN', PX0, PY1 + 96, prog(t, T.noSheep, T.noSheep + 0.5), M(22), E.dim);
      typed(g, '0', (PX0 + PX1) / 2 - 30, 430, prog(t, T.noSheep, T.noSheep + 0.3), A(92), E.ink, { align: 'center' });
      typed(g, '?', (PX0 + PX1) / 2 + 50, 430, prog(t, T.what, T.what + 0.3), A(92), E.accent, { align: 'center' });
      // "Zero is useless for counting": gạch đỏ ngang số 0 trong chuồng
      strike(g, PX0 + 98, 402, PX0 + 182, 396, prog(t, T.useless, T.useless + 0.35), { seed: 161 });
      typed(g, 'USELESS FOR COUNTING', PX0, PY0 - 44, prog(t, T.useless, T.useless + 0.6), M(22), E.accent);
      g.restore();
    }
    // ponder quanh "what exactly are you counting?" — phải khung, chuồng ở giữa
    const kf = prog(t, T.zero2 + 0.3, T.zero2 + 0.75) * (1 - prog(t, T.useless, T.useless + 0.5));
    figure(g, 'ponder', 1690, H, 700, 'page', kf);

    // ── 3–5: số La Mã + Romans làm được mọi thứ — trượt lên ở "trouble" (câu 6) ──
    const in2 = outCubic(prog(t, T.romans3, T.romans3 + 0.6)), up2 = outCubic(prog(t, T.trouble - 0.1, T.trouble + 0.6)) * -800;
    if (in2 > 0 && up2 > -800) {
      g.save(); g.translate(0, (1 - in2) * 700 + up2);
      typed(g, 'ROMAN NUMERALS', 200, 260, prog(t, T.romans3 + 0.2, T.romans3 + 0.8), M(22), E.dim);
      const keys = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
      keys.forEach((c, i) => {
        const x = 300 + i * 170, k = prog(t, T[c] - 0.05, T[c] + 0.15);
        typed(g, c, x, 400, k, A(92), E.ink, { align: 'center' });
        typed(g, String(RV[c]), x, 460, prog(t, T[c] + 0.1, T[c] + 0.5), M(24), E.dim, { align: 'center' });
      });
      // ô thứ tám: không có ký hiệu — ô nét đứt, ✗ đỏ
      const sx = 300 + 7 * 170, ks = prog(t, T.M + 0.1, T.noSign + 0.2);
      if (ks > 0) { g.save(); g.setLineDash([10, 9]); hand(g, [[sx - 55, 315], [sx + 55, 315], [sx + 55, 420], [sx - 55, 420], [sx - 55, 315]], { w: 3, color: E.dim, seed: 170, k: ks }); g.restore(); }
      typed(g, '0', sx, 460, prog(t, T.zero4, T.zero4 + 0.3), M(24), E.accent, { align: 'center' });
      cross(g, sx, 368, 34, prog(t, T.noSign, T.zero4 + 0.1), { seed: 171 });
      typed(g, 'NO SIGN FOR ZERO', sx - 120, 520, prog(t, T.noSign + 0.2, T.zero4 + 0.6), M(22), E.accent);
      // cộng · cầu · sổ sách, mỗi thứ một dấu ✓ mực
      const items = [[T.sums, 'SUMS', 420], [T.bridges, 'BRIDGES', 960], [T.accounts, 'ACCOUNTS', 1500]];
      items.forEach(([tw, lab, cx], i) => {
        const k = prog(t, tw - 0.35, tw + 0.35);
        if (k <= 0) return;
        if (i === 0) typed(g, `${SUM[0]} + ${SUM[1]} = ${SUM[2]}`, cx, 860, k, A(46), E.ink, { align: 'center' });
        if (i === 1) {                                   // cầu vòm: mặt cầu + ba vòm
          hand(g, seg(cx - 170, 800, cx + 170, 800, 20), { w: 4, color: E.ink, seed: 180, k });
          for (let a = 0; a < 3; a++) {
            const ax = cx - 113 + a * 113, P = Array.from({ length: 17 }, (_, j) => [ax - 50 + j * 100 / 16, 880 - Math.sin(j / 16 * Math.PI) * 60]);
            hand(g, P, { w: 4, color: E.ink, seed: 181 + a, k: clamp(k * 1.5 - 0.3 - a * 0.1) });
          }
          hand(g, seg(cx - 170, 880, cx + 170, 880, 20), { w: 3, color: E.dim, seed: 185, k });
        }
        if (i === 2) {                                   // sổ sách: bốn dòng, cột số La Mã
          ['CCL', 'XC', 'LX', 'CCC'].forEach((s, j) => {
            hand(g, seg(cx - 150, 790 + j * 30, cx + 150, 790 + j * 30, 8), { w: 2, color: E.dim, seed: 190 + j, k });
            typed(g, s, cx + 140, 784 + j * 30, clamp(k * 2 - 0.6 - j * 0.15), M(20), E.ink, { align: 'right' });
          });
        }
        typed(g, lab, cx, 950, k, M(22), E.dim, { align: 'center' });
        tick(g, cx + 120 + lab.length * 7, 940, prog(t, T.perfectly - 0.1 + i * 0.12, T.perfectly + 0.15 + i * 0.12), 200 + i);
      });
      typed(g, 'PERFECTLY WELL', 200, 1000, prog(t, T.perfectly, T.perfectly + 0.6), M(22), E.dim);
      g.restore();
    }

    // ── 6–9: viết theo VỊ TRÍ — ba cột quanh lỗ ──
    const in3 = outCubic(prog(t, T.trouble, T.trouble + 0.6));
    if (in3 > 0) {
      g.save(); g.translate(0, (1 - in3) * 700);
      typed(g, 'THE TROUBLE: WRITING NUMBERS BY POSITION', 200, 260, prog(t, T.write6, T.position + 0.6), M(22), E.dim);
      const CW = 220, X0 = HX - 1.5 * CW, Y0 = 470, Y1 = 820;      // cột chục canh giữa lỗ
      const kc = prog(t, T.write6, T.columns7 + 0.3);
      hand(g, [[X0, Y0], [X0 + 3 * CW, Y0], [X0 + 3 * CW, Y1], [X0, Y1], [X0, Y0]], { w: 4, color: E.ink, seed: 210, k: kc });
      [1, 2].forEach(i => hand(g, seg(X0 + i * CW, Y0, X0 + i * CW, Y1, 8), { w: 4, color: E.ink, seed: 211 + i, k: clamp(kc * 2 - 1) }));
      const heads = ['HUNDREDS', 'TENS', 'ONES'], hk = [T.hundreds, T.tens, T.ones];
      heads.forEach((s, i) => typed(g, s, X0 + (i + 0.5) * CW, Y0 - 22, Math.max(prog(t, T.columns7, T.columns7 + 0.6), prog(t, hk[i] - 0.1, hk[i] + 0.3)), M(22), E.dim, { align: 'center' }));
      // "three hundred and five": viết bằng chữ ở trên
      const wOut = outCubic(prog(t, T.leave - 0.3, T.leave + 0.3));               // chữ viết nhường chỗ cho "35": trượt lên khỏi khung
      typed(g, 'three hundred and five', HX, 380 - wOut * 520, prog(t, T.three7, T.five7 + 0.3), I(54), E.ink, { align: 'center' });
      // cột chục được chỉ ra: nét khoanh mực quanh lỗ ở "tens"; "something that says: empty"
      ring(g, HX, HY, 92, 92, prog(t, T.tens - 0.05, T.tens + 0.5) * (1 - prog(t, T.leave - 0.2, T.leave)), { color: E.ink, w: 3, seed: 220 });
      typed(g, 'something that says: empty', HX, 900, prog(t, T.something, T.empty + 0.3), I(44), E.ink, { align: 'center' });
      // 3 và 5: viết vào cột, rồi nhấc lên chập lại → 35 đỏ
      const lift = outCubic(prog(t, T.leave, T.out + 0.4)), join = outCubic(prog(t, T.out - 0.1, T.reader + 0.1));
      const red = prog(t, T.thirty5 - 0.1, T.thirty5 + 0.2);
      const y = 682 + (380 - 682) * lift;
      const x3 = X0 + 0.5 * CW + (HX - 34 - (X0 + 0.5 * CW)) * join, x5 = X0 + 2.5 * CW + (HX + 34 - (X0 + 2.5 * CW)) * join;
      const col = red > 0 ? E.accent : E.ink;
      typed(g, '3', x3, y, prog(t, T.three8 - 0.05, T.three8 + 0.15), A(120), col, { align: 'center' });
      typed(g, '5', x5, y, prog(t, T.five8 - 0.05, T.five8 + 0.15), A(120), col, { align: 'center' });
      typed(g, 'READER SEES', HX - 110, 368, prog(t, T.reader, T.sees + 0.3), M(24), E.accent, { align: 'right' });
      typed(g, '≠ 305', HX + 110, 368, prog(t, T.thirty5 + 0.2, T.thirty5 + 0.6), A(56), E.accent);
      g.restore();
    }

    actTitle(g, 'page', t, this.START, 'ACT ONE', 'Nothing');
    iris(g, HX, HY, prog(t, this.FROM, this.FROM + 1.1));
  }
}
