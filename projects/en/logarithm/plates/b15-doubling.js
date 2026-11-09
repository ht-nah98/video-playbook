// b15 · Doubling time (câu 69–72) — DNA blocks. ln = khối TÍM (logarit). Câu 69: chồng xu ← "×?" (mũi tên tím hỏi ngược) + "HOW LONG?";
// câu 70: hàng khối ln | 2 | ≈ | 0.693 (số in dần theo từng chữ đọc); câu 71: thanh ván "1 YEAR", chồng xu gấp đôi ở vạch 0.693;
// câu 72: 69.3 ÷ 6 ≈ 11.5 YEARS rồi 6% đổi thành RATE ("69.3 ÷ RATE"). Mascot calculator nói ở câu 70–71 (≈ 8 s).
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, block, coinStack, ghostStack, tag, secTag, text, line,
  figure, LN2, COIN_SM, BASE_Y } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const gold = { color: C.goldInk, edge: C.gold };
const logT = { color: C.logInk, edge: C.log };

export default class Doubling {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b15');
    this.START = L(69).start;
    this.FROM = Math.max(this.START - 1.2, L(68).end + 0.5);
    this.END = L(72).end;
    this.T = {
      natural: w(69, 'natural'), log: w(69, 'log'), back: w(69, 'backwards'), multiply: w(69, 'multiply'), amount: w(69, 'amount'), how: w(69, 'how'),
      l70: L(70).start, two: w(70, 'two'), about: w(70, 'about'), zero: w(70, 'zero'), point: w(70, 'point'), six: w(70, 'six'), nine: w(70, 'nine'), three: w(70, 'three'),
      so: w(71, 'so'), growing: w(71, 'growing'), money: w(71, 'money'), doubles: w(71, 'doubles'), zero71: w(71, 'zero'),
      l72: L(72).start, six72: w(72, 'six'), sn1: w(72, 'sixty-nine'), div1: w(72, 'divided'), about72: w(72, 'about'), eleven: w(72, 'eleven'),
      any: w(72, 'any'), rate1: w(72, 'rate'), sn2: w(72, 'sixty-nine', 2), div2: w(72, 'divided', 2), rate2: w(72, 'rate', 2),
    };
    const T = this.T;
    this.LIFT1 = [L(70).start - 0.25, L(70).start + 0.5];          // câu 69 bay đi
    this.LIFT2 = [T.l72 - 0.05, T.l72 + 0.65];                      // câu 70–71 bay đi
    this.MASC = [L(70).start - 0.1, L(71).end - 0.4];
    must('Math.floor(69.3 / 6 * 2) / 2', 11.5);
    must(`Math.round(${LN2} * 100 * 10) / 10`, 69.3);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.log + 0.05, 'wood'), c(T.back + 0.05, 'pen'), c(T.amount, 'pop'), c(T.how + 0.05, 'question'),
      c(T.two + 0.02, 'wood'), c(T.zero + 0.02, 'wood'), c(T.so + 0.2, 'page'), c(T.money + 0.05, 'coin'), c(T.doubles + 0.2, 'wood'), c(T.zero71 + 0.05, 'pop'),
      c(T.six72 + 0.02, 'wood'), c(T.sn1 + 0.02, 'wood'), c(T.eleven + 0.02, 'wood'), c(T.any - 0.02, 'card'), c(T.rate1 + 0.2, 'wood'), c(T.div2, 'tick')];
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y;
    ground(g, 'table');
    secTag(g, 'Doubling time', { k: prog(t, S, S + 0.4), t });
    const up1 = outCubic(prog(t, ...this.LIFT1)) ** 1.4 * 1100, up2 = outCubic(prog(t, ...this.LIFT2)) ** 1.4 * 1300;
    // ── câu 69: $ ← "×?" ──
    if (up1 < 1100) {
      g.save(); g.translate(0, -up1);
      const k0 = prog(t, this.FROM + 0.3, this.FROM + 0.9), topA = coinStack(g, 800, base, 4 * k0, { ...COIN_SM, seed: 1 });
      const kb = prog(t, T.multiply, T.multiply + 0.5);
      ghostStack(g, 1250, base, 8, { ...COIN_SM, k: kb });
      tag(g, '×?', 1250, base - 8 * COIN_SM.th - COIN_SM.ry - 70, { size: 48, k: prog(t, T.amount, T.amount + 0.3) });
      const ka = prog(t, T.back, T.back + 0.5);
      if (ka > 0) { const x0 = 1150, x1 = lerp(1150, 930, outCubic(ka)); g.save(); g.strokeStyle = C.log; g.fillStyle = C.log; g.lineWidth = 12; g.lineCap = 'round';
        g.beginPath(); g.moveTo(x0, 690); g.lineTo(x1 + 14, 690); g.stroke(); g.beginPath(); g.moveTo(x1 - 8, 690); g.lineTo(x1 + 22, 670); g.lineTo(x1 + 22, 710); g.closePath(); g.fill(); g.restore(); }
      tag(g, 'HOW LONG?', 1000, 440, { size: 48, k: prog(t, T.how, T.how + 0.3) });
      g.restore();
    }
    // ── ln block (từ câu 69, ở lại tới câu 72) ──
    const kl = prog(t, T.log - 0.3, T.log + 0.15), up72 = up2;
    block(g, 480, base - up72, 150, { color: C.log, label: 'ln', k: kl });
    // ── câu 70–71 ──
    if (up2 < 1300) {
      g.save(); g.translate(0, -up2);
      block(g, 640, base, 140, { color: C.birch, label: '2', k: prog(t, T.two - 0.3, T.two + 0.1) });
      text(g, '≈', 760, base - 62, { font: `900 100px ${AR}`, align: 'center', base: 'middle', k: prog(t, T.about, T.about + 0.25) });
      const lab = t < T.zero ? '' : t < T.point ? '0' : t < T.six ? '0.' : t < T.nine ? '0.6' : t < T.three ? '0.69' : `${LN2}`;
      block(g, 980, base, 140, { w: 360, color: C.birch, label: lab || null, k: prog(t, T.zero - 0.3, T.zero + 0.1) });
      if (t >= T.three + 0.3) must(`'${LN2}'`, '0.693');
      // thanh ván 1 YEAR
      const kb = prog(t, T.so, T.so + 0.6), barX = 1250, barL = 550, barY = 890;
      if (kb > 0) {
        block(g, barX + barL / 2, barY, 0, { w: barL, h: 56, d: 14, color: C.birch, k: kb, from: 0, shadow: false });
        if (kb >= 1) text(g, '1 YEAR', barX + 14, barY - 28, { font: `800 28px ${AR}`, base: 'middle' });
        tag(g, '100% CONTINUOUSLY', 1540, 560, { size: 36, ...gold, k: prog(t, T.growing, T.growing + 0.3) });
        const kc = prog(t, T.money, T.money + 0.5), mark = barX + 0.693 * barL, ks = prog(t, T.money, T.money + 0.3);
        if (ks > 0) coinStack(g, 1310, barY - 56, 4 * kc, { ...COIN_SM, seed: 2 });
        block(g, 1470, barY - 56, 70, { color: C.base, label: '×2', k: prog(t, T.doubles - 0.2, T.doubles + 0.2) });
        const kd = prog(t, T.doubles, T.doubles + 0.9);
        if (kd > 0) coinStack(g, mark, barY - 56, 8 * kd, { ...COIN_SM, seed: 3 });
        const kz = prog(t, T.zero71, T.zero71 + 0.5), yb = 912;
        if (kz > 0) { const xe = lerp(barX, mark, outCubic(kz)); line(g, barX, yb, xe, yb, C.log, 6); line(g, barX, yb - 10, barX, yb + 10, C.log, 6); line(g, xe, yb - 10, xe, yb + 10, C.log, 6);
          tag(g, `${LN2} OF A YEAR`, 1440, 975, { size: 40, ...logT, k: kz }); }
      }
      g.restore();
    }
    // ── câu 72: 69.3 ÷ 6 ≈ 11.5 YEARS → 69.3 ÷ RATE ──
    const out6 = prog(t, T.rate1, T.rate1 + 0.5), outR = prog(t, T.rate1 + 0.3, T.rate1 + 0.8), upR = outCubic(outR) ** 1.4 * 1100;
    block(g, 1090, base, 150, { color: C.gold, label: '6', k: prog(t, T.six72 - 0.3, T.six72 + 0.1), lift: out6 });
    block(g, 1090, base, 150, { w: 172, color: C.gold, label: 'RATE', k: prog(t, T.rate1 + 0.05, T.rate1 + 0.45) });
    const k69 = prog(t, T.sn1 - 0.3, T.sn1 + 0.1);
    const pulse = Math.max(nudge(t, T.sn2) - 1, 0) + 1;
    scaled(g, 740, base - 75, pulse, () => block(g, 740, base, 150, { w: 250, color: C.log, label: '69.3', k: k69 }));
    scaled(g, 950, base - 45, nudge(t, T.div2), () => text(g, '÷', 950, base - 66, { font: `900 130px ${AR}`, align: 'center', base: 'middle', k: prog(t, T.div1, T.div1 + 0.25) }));
    text(g, '=', 1232, base - 66 - upR, { font: `900 120px ${AR}`, align: 'center', base: 'middle', k: prog(t, T.about72, T.about72 + 0.25) });
    block(g, 1520, base, 150, { w: 470, color: C.birch, label: '≈ 11.5 YEARS', k: prog(t, T.eleven - 0.3, T.eleven + 0.1), lift: outR });
    tag(g, 'ANY RATE', 1560, 500, { size: 44, k: prog(t, T.any, T.any + 0.3) });
    if (t >= T.eleven + 0.2 && t < T.rate1) must('Math.floor(69.3 / 6 * 2) / 2', 11.5);
    // mascot
    const km = prog(t, this.MASC[0], this.MASC[0] + 0.5) - prog(t, this.MASC[1], this.MASC[1] + 0.5);
    if (km > 0) figure(g, 'calculator', 150, H, 262, km, { t });
  }
}
