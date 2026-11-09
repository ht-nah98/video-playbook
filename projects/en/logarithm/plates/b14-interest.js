// b14 · Interest on interest (câu 62–68) — DNA blocks. Bernoulli 1683 → $1 trong ngân hàng 100%/năm → một lần (\$2) → hai lần
// (\$2.25) → tháng / ngày / giờ (\$2.61 \$2.71 \$2.72, chồng xu bò sát trần) → trần = e = khối đỏ "×e" nối \$1 với ≈ \$2.72.
// Đơn vị: 1 đô = 4 xu gỗ (xu = một phần tư đô; làm tròn tới xu gần nhất). Hàng nhãn dưới bàn = luật lãi, nhãn trên đỉnh = số tiền.
// Mascot calculator NÓI ở câu 68 ("That limit is e…"). FROM = max(START − 1.2, KẾT b13 + 0.5).
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, block, coinStack, ghostStack, tag, secTag, text, line,
  rr, photoBlock, photoImages, figure, money, fix, COIN_SM, BASE_Y } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const UNIT = 4;                                   // xu mỗi đô
const COL = { one: 700, once: 920, twice: 1240, fine: 1480, lim: 1700 };
const gold = { color: C.goldInk, edge: C.gold };

export default class Interest {
  static ERA = 'table';
  static IMAGES = photoImages('bernoulli');
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b14');
    this.START = L(62).start;
    this.FROM = Math.max(this.START - 1.2, 305.78 + 0.5);       // KẾT b13 = end câu 61
    this.END = L(68).end;
    this.T = {
      growth: w(62, 'growth'), sixteen: w(63, 'sixteen'), asked: w(63, 'asked'), exactly: w(63, 'exactly'),
      one: w(64, 'one'), dollar: w(64, 'dollar'), bank: w(64, 'bank'), hundred: w(64, 'one', 2),
      adds: w(65, 'adds'), once: w(65, 'once'), end: w(65, 'end'), year: w(65, 'year'), two: w(65, 'two'),
      pays: w(66, 'pays'), fifty: w(66, 'fifty'), twice: w(66, 'twice'), yr66: w(66, 'year'), two66: w(66, 'two'),
      monthly: w(67, 'monthly'), daily: w(67, 'daily'), hour: w(67, 'hour'), doesnt: w(67, "doesn't"), creeps: w(67, 'creeps'),
      limit: w(67, 'limit'), about: w(67, 'about'), cents: w(67, 'cents'),
      that: w(68, 'that'), limit2: w(68, 'limit'), e: w(68, 'e'), multiplies: w(68, 'multiplies'), grows: w(68, 'grows'),
      hundred2: w(68, 'one'), cont: w(68, 'continuously'), for_: w(68, 'for'),
    };
    const T = this.T;
    this.PHOTO_OUT = [L(63).end + 0.25, L(63).end + 0.9];
    this.LIFT = [T.that, T.that + 0.7];                          // cột 2, 3 bay đi khi "That limit is e"
    this.MASC = [T.that - 0.3, this.END + 0.4];
    // kiểm toán: 100% một lần = 2, hai lần = 2.25, tháng 2.61, ngày 2.71, giờ 2.72, trần = e
    must('(1 + 1/1) ** 1', 2); must('(1 + 1/2) ** 2', 2.25);
    this.V = { m: fix('(1 + 1/12) ** 12', 2), d: fix('(1 + 1/365) ** 365', 2), h: fix('(1 + 1/8760) ** 8760', 2), e: fix('Math.E', 2) };
    must(`'${this.V.m}'`, '2.61'); must(`'${this.V.d}'`, '2.71'); must(`'${this.V.h}'`, '2.72'); must(`'${this.V.e}'`, '2.72');
    must(`${UNIT} * 2`, 8); must(`${UNIT} * 1.5 * 1.5`, 9);
    must(`Math.round(${UNIT} * (1 + 1/12) ** 12)`, 10); must(`Math.round(${UNIT} * (1 + 1/365) ** 365)`, 11); must(`Math.round(${UNIT} * Math.E)`, 11);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START + 0.15, 'card'), c(T.growth + 0.1, 'coin'), c(T.sixteen + 0.1, 'page'), c(T.dollar - 0.4, 'coin'), c(T.bank + 0.1, 'wood'),
      c(T.hundred + 0.05, 'card'), c(T.year + 0.05, 'coin'), c(T.two + 0.02, 'pop'), c(T.twice, 'coin'), c(T.monthly + 0.05, 'tick'), c(T.daily + 0.05, 'tick'),
      c(T.creeps, 'tick'), c(T.about, 'pop'), c(T.e, 'wood'), c(T.hundred2 + 0.1, 'card'), c(T.for_ + 0.1, 'card')];
  }
  /** Một cột xu (n xu, nhấc lên up px) + nhãn số tiền trên đỉnh + nhãn luật dưới bàn. */
  col(g, x, n, up, { amount, amountK = 1, rule, ruleK = 1, seed = 0 }) {
    const base = BASE_Y - up, top = coinStack(g, x, base, n, { ...COIN_SM, seed });
    if (amount) tag(g, amount, x, top - 62 + 0, { size: 40, ...gold, k: amountK, string: [x - 30, top + 6] });
    if (rule) tag(g, rule, x, base + 72, { size: 32, k: ruleK });
    return top;
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y, ur = prog(t, ...this.LIFT), up = outCubic(ur) ** 1.4 * 1100;
    ground(g, 'table');
    secTag(g, 'Interest on interest', { k: prog(t, S, S + 0.4), t });
    // ô chờ của cột $1 (có từ FROM + 0.3), xu rơi ở "growth"
    const kg = prog(t, this.FROM + 0.3, this.FROM + 0.8);
    if (t < T.growth + 0.9) ghostStack(g, COL.one, base, UNIT, { ...COIN_SM, k: kg, a: 1 - prog(t, T.growth + 0.5, T.growth + 0.9) });
    const n1 = UNIT * prog(t, T.growth, T.growth + 0.8);
    // Bernoulli 1683
    const kp = prog(t, T.sixteen, T.sixteen + 0.7) - prog(t, ...this.PHOTO_OUT);
    if (kp > 0) photoBlock(g, 'bernoulli', 1310, 110, 340, 520, { k: kp, rot: -0.02, zoom: 1 + 0.06 * prog(t, T.sixteen, this.PHOTO_OUT[0]), focus: [0.5, 0.25],
      label: 'JACOB BERNOULLI · 1655–1705' });
    const k83 = prog(t, T.sixteen, T.sixteen + 0.35), out83 = prog(t, this.PHOTO_OUT[0], this.PHOTO_OUT[0] + 0.6);
    if (k83 > 0 && out83 < 1) scaled(g, 960, 380, nudge(t, T.asked), () => tag(g, '1683', 960, 380 - outCubic(out83) * 500, { size: 64, k: k83 }));
    // ngân hàng + $1 + 100%/năm
    const topOne = coinStack(g, COL.one, base, Math.max(n1, 0), { ...COIN_SM, seed: 1 });
    block(g, 430, base, 170, { w: 190, h: 150, color: C.birch, label: 'BANK', k: prog(t, T.bank, T.bank + 0.45) });
    tag(g, '$1', COL.one, topOne - 62, { size: 40, ...gold, k: prog(t, T.dollar, T.dollar + 0.3), string: [COL.one - 30, topOne + 6] });
    const kh = prog(t, T.hundred, T.hundred + 0.35);
    tag(g, '100% A YEAR', 430, 560, { size: 38, ...gold, k: kh, string: [430, 700] });
    // cột 2: một lần mỗi năm → $2
    const k2 = prog(t, T.adds - 0.25, T.adds + 0.2), n2 = UNIT * (1 + prog(t, T.year, T.year + 0.8));
    if (k2 > 0) {
      if (t < T.year + 0.9) ghostStack(g, COL.once, base - up, 2 * UNIT, { ...COIN_SM, k: k2, a: 1 - prog(t, T.year + 0.6, T.year + 0.9) });
      this.col(g, COL.once, UNIT * k2 < UNIT ? UNIT * k2 : n2, up, { amount: t >= T.two ? money(2) : null, amountK: prog(t, T.two, T.two + 0.3),
        rule: 'ONCE A YEAR', ruleK: prog(t, T.adds, T.adds + 0.3), seed: 2 });
    }
    // cột 3: hai lần 50% → $2.25 → tháng / ngày / giờ → creeping
    const k3 = prog(t, T.pays, T.pays + 0.3);
    if (k3 > 0) {
      const n3b = t < T.twice ? UNIT * k3 : lerp(UNIT, 9, prog(t, T.twice, T.yr66 + 0.45));
      const label = t < T.two66 ? null : money(2.25);
      this.col(g, COL.twice, n3b, up, { amount: label, amountK: prog(t, T.two66, T.two66 + 0.3), rule: 'TWICE A YEAR', ruleK: prog(t, T.fifty - 0.35, T.fifty), seed: 3 });
    }
    // cột riêng MONTHLY → DAILY → HOURLY: $2.61 → $2.71 → $2.72 (cột "twice" đứng yên ở $2.25)
    const km4 = prog(t, T.monthly - 0.1, T.monthly + 0.3);
    if (km4 > 0) {
      const n4 = t < T.daily ? lerp(9, 10, prog(t, T.monthly, T.monthly + 0.4)) : lerp(10, 11, prog(t, T.daily, T.daily + 0.4));
      const stage = t < T.daily ? 0 : t < T.hour ? 1 : 2;
      this.col(g, COL.fine, n4 * Math.min(1, km4 * 1.2), up, { amount: ['$' + this.V.m, '$' + this.V.d, '$' + this.V.h][stage], amountK: km4, seed: 5 });
      tag(g, 'MONTHLY → DAILY → HOURLY', COL.fine, 990 - up, { size: 32, k: km4 });
    }
    // trần: nét đứt navy, cột trần ≈ $2.72, nhãn LIMIT
    const topLim = base - 11 * COIN_SM.th - COIN_SM.ry, kl = prog(t, T.doesnt, T.doesnt + 0.8), kg4 = prog(t, T.creeps, T.creeps + 0.8);
    if (kl > 0) { g.save(); g.setLineDash([14, 12]); g.strokeStyle = 'rgba(34,48,60,0.55)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(COL.one + 90, topLim); g.lineTo(lerp(COL.one + 90, COL.lim - 90, outCubic(kl)), topLim); g.stroke(); g.restore(); }
    const filled = prog(t, T.limit2, T.limit2 + 0.9);
    if (kg4 > 0 && filled < 1) ghostStack(g, COL.lim, base, 11, { ...COIN_SM, k: kg4, a: 1 - filled });
    if (filled > 0) coinStack(g, COL.lim, base, 11 * filled, { ...COIN_SM, seed: 4 });
    const kt = prog(t, T.about, T.about + 0.3);
    if (kt > 0) { must(`'${money(Math.round(Math.E * 100) / 100)}'`, '$2.72'); tag(g, '≈ $2.72', COL.lim, topLim - 62, { size: 40, ...gold, k: kt, string: [COL.lim - 30, topLim + 6] }); }
    tag(g, 'LIMIT', COL.lim, base + 72, { size: 32, k: prog(t, T.limit, T.limit + 0.3) });
    // câu 68: khối đỏ ×e giữa $1 và ≈ $2.72
    block(g, 1195, base, 150, { color: C.base, label: '×e', k: prog(t, T.e - 0.3, T.e + 0.15) });
    tag(g, '100%', 740, 440, { size: 34, ...gold, k: prog(t, T.hundred2, T.hundred2 + 0.3) });
    tag(g, 'CONTINUOUSLY', 1170, 440, { size: 34, k: prog(t, T.cont, T.cont + 0.3) });
    tag(g, '1 UNIT OF TIME', 1600, 440, { size: 34, k: prog(t, T.for_, T.for_ + 0.3) });
    // mascot calculator: nói ở câu 68
    const km = prog(t, this.MASC[0], this.MASC[0] + 0.5) - prog(t, this.END + 0.1, this.MASC[1]);
    if (km > 0) figure(g, 'calculator', 150, H, 262, km, { t });
  }
}
