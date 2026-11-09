// b16 · Why 72, not 69.3 (câu 73–78) — DNA blocks. Quay lại 「72」 của cold open (big72 330, 0.82): khối 69.3 (bạch dương) ↔ 72 gỗ;
// câu 74 hàng khối ÷2 ÷3 ÷4 ÷6 ÷8 ÷9 ÷12; câu 75 bảng treo: lãi nhập mỗi năm (bậc thang xu) chậm hơn lãi liên tục (đường mượt ở 8%);
// câu 76 khối 69.3 + mẩu "+2.7" → khối 72; câu 77 "72 ÷ 8 = 9 YEARS" + "9 YEARS + 2 DAYS"; câu 78 lệch ở lãi cực đoan, tốt với tiết kiệm thường.
// Mascot pose-ok (talk: false) quanh câu 77.
import { H, C, AR, W, clamp, prog, lookup, must, outCubic, ground, block, tag, secTag, text, line, rr, shadowRR, big72, figure,
  R8, DAYS8, RULE, fix, BASE_Y } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const gold = { color: C.goldInk, edge: C.gold };
const DIV = [2, 3, 4, 6, 8, 9, 12];
const CX = 1000, CS = 76, CB = 560, CH = 330 / 1.2;          // đồ thị: X(năm), đáy, px mỗi đơn vị giá trị
const X = yr => CX + yr * CS, Y = v => CB - (v - 1) * CH;

export default class Why72 {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b16');
    this.START = L(73).start;
    this.FROM = Math.max(this.START - 1.2, L(72).end + 0.5);
    this.END = L(78).end;
    this.T = {
      s72: w(73, 'seventy-two'), divides: w(74, 'divides'), div: [w(74, 'two'), w(74, 'three'), w(74, 'four'), w(74, 'six'), w(74, 'eight'), w(74, 'nine'), w(74, 'twelve')],
      l75: L(75).start, reason: w(75, 'reason'), banks: w(75, 'banks'), once: w(75, 'once'), cont: w(75, 'continuously'), that: w(75, 'that'),
      eight: w(76, 'eight'), delay: w(76, 'delay'), pushes: w(76, 'pushes'), s72b: w(76, 'seventy-two'),
      nine: w(77, 'nine'), almost: w(77, 'almost'), l77: L(77).start,
      drifts: w(78, 'drifts'), extreme: w(78, 'extreme'), ordinary: w(78, 'ordinary'), its: w(78, "it's"), l78: L(78).start,
    };
    const T = this.T;
    this.DIVOUT = T.l75 - 0.1;                                      // hàng ước bay đi
    this.CARD = [T.banks - 0.3, T.banks + 0.3];
    this.CUP = [T.drifts + 0.2, T.drifts + 0.95];                    // bảng treo bay lên
    this.A = [T.extreme + 0.2, T.ordinary + 0.5];                    // hai thẻ lệch: sống tới đây rồi bay
    this.UP77 = [this.A[1], this.A[1] + 0.7];
    this.MASC = [T.l77 - 0.4, T.l77 + 3.6];
    must('69.3 + 2.7', 72);
    for (const d of DIV) must(`72 % ${d}`, 0);
    must(`Math.round(${R8})`, RULE[8]); must(`${DAYS8}`, 2);
    must('Math.round(1.08 ** 9 * 1000)', 1999);
    this.X36 = must('Math.floor(Math.log(2) / Math.log(1.36) * 100) / 100', 2.25);
    this.X72 = must('Math.round(Math.log(2) / Math.log(1.72) * 100) / 100', 1.28);
    this.CROSS = Math.log(2) / 0.08;                                  // 8.66 năm (liên tục)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'wood'), c(T.s72 + 0.02, 'wood'), c(T.divides + 0.05, 'card'), c(T.div[0] + 0.02, 'wood'), c(T.div[3] + 0.02, 'wood'), c(T.div[6] + 0.02, 'wood'),
      c(T.reason + 0.05, 'card'), c(T.banks + 0.1, 'page'), c(T.once + 0.1, 'tick'), c(T.cont + 0.25, 'pen'), c(T.that + 0.05, 'pop'),
      c(T.delay + 0.05, 'wood'), c(T.pushes + 0.05, 'wood'), c(T.s72b + 0.05, 'shimmer'), c(T.nine + 0.05, 'correct'), c(T.almost + 0.45, 'card'),
      c(this.A[0] + 0.05, 'pop'), c(T.ordinary + 0.05, 'card'), c(T.its + 0.1, 'pop')];
  }
  /** Bảng treo có đồ thị: bậc thang (lãi mỗi năm) + đường mượt (liên tục) ở 8%. */
  chart(g, t) {
    const T = this.T, k = prog(t, ...this.CARD); if (k <= 0) return;
    const e = outCubic(k), dy = -(1 - e) * 700, x0 = 940, y0 = 170, cw = 860, ch = 450;
    g.save(); g.translate(0, dy);
    for (const sx of [1010, 1730]) line(g, sx, -10, sx, y0 + 20, C.string, 2.5);
    shadowRR(g, x0, y0, cw, ch, 14, { col: 'rgba(40,60,80,0.25)', blur: 14, oy: 8 });
    g.fillStyle = C.card; g.fill(rr(x0, y0, cw, ch, 14));
    g.fillStyle = C.birchDk; g.fillRect(x0, y0, cw, 8);
    for (const sx of [1010, 1730]) { g.fillStyle = C.white; g.strokeStyle = C.birchDk; g.lineWidth = 2; g.beginPath(); g.arc(sx, y0 + 4, 5, 0, Math.PI * 2); g.fill(); g.stroke(); }
    line(g, X(0), CB, X(10) + 10, CB, C.ink, 4, 'butt'); line(g, X(0), CB, X(0), Y(2.2), C.ink, 4, 'butt');
    text(g, 'YEARS →', X(10) + 6, CB + 36, { font: `700 28px ${AR}`, color: C.dim, align: 'right' });
    text(g, '×2', x0 + 14, Y(2), { font: `800 30px ${AR}`, base: 'middle' });
    g.save(); g.setLineDash([12, 10]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(0), Y(2)); g.lineTo(X(10), Y(2)); g.stroke(); g.restore();
    text(g, 'AT 8% A YEAR', X(0) + 14, y0 + 44, { font: `800 30px ${AR}`, color: C.goldInk, k: prog(t, T.eight, T.eight + 0.6) });
    // bậc thang: giá trị 1.08^n trên [n, n+1)
    const ks = prog(t, T.once, T.once + 1.6), ts = 10 * ks;
    if (ks > 0) { g.save(); g.strokeStyle = C.gold; g.lineWidth = 10; g.lineJoin = 'round'; g.beginPath();
      for (let n = 0; n < 10 && n < ts; n++) { const xa = X(n), xb = X(Math.min(n + 1, ts)), v = Y(1.08 ** n); n ? g.lineTo(xa, v) : g.moveTo(xa, v); g.lineTo(xb, v); } g.stroke(); g.restore(); }
    // đường mượt e^(0.08 t)
    const kc = prog(t, T.cont, T.cont + 1.5), tc = 10 * kc;
    if (kc > 0) { g.save(); g.setLineDash([2, 10]); g.lineCap = 'round'; g.strokeStyle = C.goldInk; g.lineWidth = 7; g.beginPath();
      for (let s = 0; s <= 100; s++) { const yr = tc * s / 100; s ? g.lineTo(X(yr), Y(Math.exp(0.08 * yr))) : g.moveTo(X(yr), Y(Math.exp(0.08 * yr))); } g.stroke(); g.restore(); }
    tag(g, 'ONCE A YEAR', 1500, 500, { size: 32, ...gold, k: prog(t, T.once, T.once + 0.3) });
    tag(g, 'CONTINUOUSLY', 1260, 330, { size: 32, ...gold, k: prog(t, T.cont, T.cont + 0.3) });
    // hai điểm cắt ×2: 8.66 (liên tục) và 9 (mỗi năm) — khoảng cách = "chậm một chút"
    const kg = prog(t, T.that, T.that + 0.5);
    if (kg > 0) { for (const [yr, col] of [[this.CROSS, C.goldInk], [9, C.gold]]) { g.save(); g.setLineDash([6, 8]); g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(X(yr), Y(2)); g.lineTo(X(yr), CB); g.stroke(); g.restore();
        g.fillStyle = col; g.beginPath(); g.arc(X(yr), Y(2), 9, 0, Math.PI * 2); g.fill(); } }
    g.restore();
    if (kg > 0) tag(g, 'SLOWER', 1560, 660, { size: 36, k: kg });
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y;
    ground(g, 'table');
    secTag(g, 'Why 72, not 69.3', { k: prog(t, S, S + 0.4), t });
    // 「72」 gỗ cắt: rơi ở "seventy-two", lắc nhẹ ở "drifts"
    const sway = 0.05 * Math.sin((t - T.drifts) * 5) * prog(t, T.drifts, T.drifts + 0.3) * (1 - prog(t, this.A[1], this.A[1] + 0.5));
    big72(g, 330, base, 0.82, { k: prog(t, T.s72 - 0.35, T.s72 + 0.15), rot: sway });
    // khối 69.3: mở cảnh, bay đi ở câu 74, về lại ở câu 76 (+ mẩu +2.7 → khối 72)
    const open = prog(t, this.FROM + 0.3, this.FROM + 0.75), gone1 = prog(t, T.divides - 0.1, T.divides + 0.5);
    if (t < T.delay) block(g, 1080, base, 130, { w: 300, color: C.birch, label: '69.3', k: open, lift: gone1 });
    const merged = prog(t, T.s72b, T.s72b + 0.5), back = prog(t, T.delay - 0.3, T.delay + 0.1);
    if (t >= T.delay && merged < 1) {
      block(g, 1080, base, 130, { w: 300, color: C.birch, label: '69.3', k: back, lift: merged });
      block(g, 1285, base, 130, { w: 110, color: C.gold, label: '+2.7', k: prog(t, T.pushes - 0.3, T.pushes + 0.1), lift: merged });
    }
    if (merged > 0) { block(g, 1135, base, 130, { w: 410, color: C.s72, label: '72', k: merged }); if (t >= T.s72b + 0.6) must('69.3 + 2.7', 72); }
    // câu 74: hàng ước
    if (t >= T.divides && t < this.DIVOUT + 0.8) {
      DIV.forEach((d, i) => block(g, 960 + i * 104, base, 86, { color: C.birch, label: `÷${d}`, k: prog(t, T.div[i] - 0.3, T.div[i] + 0.1), lift: prog(t, this.DIVOUT + i * 0.06, this.DIVOUT + 0.6 + i * 0.06) }));
      const kd = prog(t, T.divides, T.divides + 0.3) - prog(t, T.reason - 0.7, T.reason - 0.2);
      tag(g, 'DIVIDES NEATLY', 1270, 700, { size: 40, k: clamp(kd) });
    }
    // câu 75: "A BETTER REASON" rồi đồ thị
    const kr = prog(t, T.reason, T.reason + 0.3) - prog(t, T.once + 1.0, T.once + 1.6);
    if (kr > 0) tag(g, 'A BETTER REASON', 1180, 700, { size: 40, k: clamp(kr) });
    const upC = outCubic(prog(t, ...this.CUP)) ** 1.4 * 900;
    if (t < this.CUP[1]) { g.save(); g.translate(0, -upC); this.chart(g, t); g.restore(); }
    // câu 77: 72 ÷ 8 = 9 YEARS, 9 YEARS + 2 DAYS
    const dn77 = outCubic(prog(t, T.ordinary - 0.5, T.ordinary + 0.1)) ** 1.4 * 500;   // hai thẻ câu 77 rơi xuống trước khi thẻ câu 78 vào
    const kn = prog(t, T.nine, T.nine + 0.3), ka = prog(t, T.almost, T.almost + 0.3);
    if (t < T.ordinary + 0.2) {
      if (kn > 0) tag(g, '72 ÷ 8 = 9 YEARS', 1600, 780 + dn77, { size: 34, ...gold, k: kn });
      if (ka > 0) tag(g, `${RULE[8]} YEARS + ${DAYS8} DAYS`, 1600, 870 + dn77, { size: 34, ...gold, k: ka });
    }
    // câu 78: lệch ở lãi cực đoan, tốt ở tiết kiệm thường
    const kx = prog(t, this.A[0], this.A[0] + 0.3), upA = outCubic(prog(t, ...this.UP77)) ** 1.4 * 900;
    if (kx > 0 && t < this.UP77[1]) {
      tag(g, `36%: RULE 2 · REAL ≈ ${this.X36}`, 1400, 300 - upA, { size: 36, k: kx });
      tag(g, `72%: RULE 1 · REAL ≈ ${this.X72}`, 1400, 390 - upA, { size: 36, k: kx });
    }
    tag(g, 'ORDINARY SAVINGS', 1400, 520, { size: 40, ...gold, k: prog(t, T.ordinary, T.ordinary + 0.3) });
    tag(g, 'REMARKABLY GOOD', 1400, 610, { size: 44, ...gold, k: prog(t, T.its, T.its + 0.3) });
    // mascot ok (không nói)
    const km = prog(t, this.MASC[0], this.MASC[0] + 0.5) - prog(t, this.MASC[1], this.MASC[1] + 0.5);
    if (km > 0) figure(g, 'ok', 150, H, 262, km, { t, talk: false });
  }
}
