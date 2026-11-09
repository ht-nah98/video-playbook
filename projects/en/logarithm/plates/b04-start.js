// b04 · Standing at the start — câu p2 13–17. Một CON ĐƯỜNG = tấm ván bạch dương ngang giữa khung; khối mộc "1" ở gốc (origin).
//  câu 13 log 1 = 0: khối "1" rơi lên ván; thẻ "log 1 = 0" gõ dần; sticker tím 0 dán lên khối; thẻ "ANY BASE" ở "whatever the base" (ponder)
//  câu 14 "haven't multiplied at all": ô nét đứt của khối ×2 hiện rồi bị dấu × navy gạch; "starting line": thẻ START + vạch navy; thẻ MULTIPLICATION STARTS AT 1
//  câu 15 "smaller than one": ô treo ngược dưới ván; thẻ log₂ 1/8 = −3 gõ dần; sticker −3
//  câu 16 "minus sign … divide by two three times": thẻ MINUS = DIVIDE; ba khối ÷2 TREO NGƯỢC dưới ván (đếm −1 −2 −3); "instead of multiplying" → ô nét đứt tháp ×2 bên phải
//  câu 17 "a road": khoanh ván, khoanh gốc; "bigger numbers" → mũi tên phải + tháp ×2 dương 1 2 3 + thẻ BIGGER → POSITIVE; "smaller ones" → mũi tên trái + thẻ SMALLER → NEGATIVE
import { C, BASE_Y, ground, block, tower, sticker, tag, secTag, prog, lookup, must, clamp, num, line } from '../kit.js';
import { nudge, scaled, slots, eqCard, ring, arrow, mascot } from './g1-util.js';

export default class Start {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b04');
    this.START = L(13).start;
    this.FROM = Math.max(this.START - 1.2, L(12).end + 0.5);
    this.T = {
      fun13: w(13, 'fun'), log13: w(13, 'log'), one13: w(13, 'one', 2), always13: w(13, 'always'), zero13: w(13, 'zero'), what13: w(13, 'whatever'),
      mult14: w(14, 'multiplied'), all14: w(14, 'all'), standing14: w(14, 'standing'), starting14: w(14, 'starting'), line14: w(14, 'line'), mpl14: w(14, 'multiplication'), is14: w(14, 'is'),
      S15: L(15).start, smaller15: w(15, 'smaller'), log15: w(15, 'log'), two15: w(15, 'two'), eighth15: w(15, 'eighth'), is15: w(15, 'is'), minus15: w(15, 'minus'), three15: w(15, 'three'),
      minus16: w(16, 'minus'), sign16: w(16, 'sign'), divide16: w(16, 'divide'), two16: w(16, 'two'), times16: w(16, 'times'), instead16: w(16, 'instead'),
      S17: L(17).start, road17: w(17, 'road'), one17: w(17, 'one'), origin17: w(17, 'origin'), walk17: w(17, 'walk'), bigger17: w(17, 'bigger'), numbers17: w(17, 'numbers'),
      and17: w(17, 'and'), positive17: w(17, 'positive'), walk17b: w(17, 'walk', 2), smaller17: w(17, 'smaller'), and17b: w(17, 'and', 2), negative17: w(17, 'negative'), end17: L(17).end,
    };
    const T = this.T;
    this.HANG = [T.divide16, T.two16 + 0.1, T.times16];      // ba khối ÷2 treo ngược
    this.POS = [T.bigger17, T.numbers17 + 0.05, T.and17];     // ba khối ×2 dương
  }
  sfx() {
    const T = this.T, FR = this.FROM, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(FR + 0.3, 'wood'), c(T.fun13, 'wood'), c(T.log13, 'card'), c(T.zero13, 'pop'), c(T.what13, 'card'),
      c(T.standing14, 'card'), c(T.starting14 + 0.1, 'pen'), c(T.mpl14, 'card'),
      c(T.log15, 'card'), c(T.three15, 'pop'), c(T.minus16, 'card'), c(this.HANG[0], 'snap'), c(this.HANG[1], 'wood'), c(this.HANG[2], 'wood'),
      c(T.road17, 'pen'), c(T.origin17, 'pop'), ...this.POS.map(a => c(a, 'wood')), c(T.positive17, 'card'), c(T.smaller17, 'card'), c(T.negative17, 'pop')];
  }
  render(g, t) {
    const T = this.T, FR = this.FROM, X0 = 960, TOP = 600, PB = 644;
    ground(g, 'table');
    secTag(g, 'Standing at the start', { k: prog(t, FR + 0.3, FR + 0.7), t });
    // con đường: ván bạch dương ngang, mặt trên ở y 600
    block(g, 980, PB, 0, { w: 1440, h: 44, d: 20, color: C.birch, k: prog(t, FR + 0.3, FR + 0.7), shadow: false, from: 500 });
    // gốc: khối mộc "1" + sticker tím 0
    block(g, X0, TOP, 96, { color: C.birch, label: '1', k: prog(t, T.fun13 - 0.3, T.fun13 + 0.1), shadow: false });
    const k0 = prog(t, T.zero13, T.zero13 + 0.3);
    scaled(g, X0 + 30, TOP - 165, nudge(t, T.mult14) * nudge(t, T.standing14) * nudge(t, T.origin17), () => sticker(g, '0', X0 + 30, TOP - 165, { r: 30, k: k0 }));
    // câu 13: thẻ log 1 = 0, ANY BASE
    const l13 = prog(t, T.all14 + 1.0, T.all14 + 1.5);
    eqCard(g, t, X0, 370, [{ s: 'log', at: T.log13, color: C.logInk }, { s: ' 1', at: T.one13, color: C.ink }, { s: ' = ', at: T.always13, color: C.ink }, { s: '0', at: T.zero13, color: C.logInk }],
      { size: 56, edge: C.log, k: prog(t, T.log13 - 0.1, T.log13 + 0.25), lift: prog(t, T.standing14 - 0.3, T.standing14 + 0.2), string: [X0 - 60, -20] });
    eqCard(g, t, 1400, 380, [{ s: 'ANY BASE', at: T.what13, color: C.ink }], { size: 40, edge: C.ink, k: prog(t, T.what13 - 0.05, T.what13 + 0.3), lift: prog(t, T.standing14 - 0.3, T.standing14 + 0.2), string: [1360, -20] });
    // câu 14: ô chờ ×2 bị gạch ×, START + vạch, MULTIPLICATION STARTS AT 1
    const kg = prog(t, T.mult14, T.mult14 + 0.3), kx = prog(t, T.all14, T.all14 + 0.3), k3 = prog(t, T.instead16, T.instead16 + 0.4);
    const gx = 1450, placed = this.POS.filter(a => prog(t, a - 0.3, a + 0.1) >= 1).length;
    slots(g, gx, TOP, 3, { s: 96, k: [kg, k3, k3], placed });
    if (kx > 0 && prog(t, this.POS[0] - 0.3, this.POS[0] + 0.1) <= 0) { const e = clamp(kx), cy = TOP - 48;
      line(g, gx - 34 * e, cy - 34 * e, gx + 34 * e, cy + 34 * e, C.ink, 7); line(g, gx - 34 * e, cy + 34 * e, gx + 34 * e, cy - 34 * e, C.ink, 7); }
    const kst = prog(t, T.standing14, T.standing14 + 0.3);
    if (kst > 0) { const lk = prog(t, T.starting14, T.line14 + 0.2), bottom = 280 + 32 + (TOP + 44 - 312) * lk;
      g.save(); g.setLineDash([14, 10]); line(g, 905, 312, 905, bottom, C.ink, 5, 'butt'); g.restore();
      tag(g, 'START', 905, 280, { size: 36, k: kst, edge: C.ink, string: [880, -20] }); }
    eqCard(g, t, 1330, 250, [{ s: 'MULTIPLICATION', at: T.mpl14, color: C.ink }, { s: ' STARTS AT 1', at: T.is14, color: C.ink }], { size: 40, edge: C.ink, k: prog(t, T.mpl14 - 0.05, T.mpl14 + 0.3), lift: prog(t, T.S15 - 0.1, T.S15 + 0.4), string: [1100, -20] });
    // câu 15–16: tháp treo ngược dưới ván, thẻ log₂ 1/8 = −3, MINUS = DIVIDE
    const hx = 480, kh = prog(t, T.smaller15, T.smaller15 + 0.3), hk = this.HANG.map(a => prog(t, a - 0.3, a + 0.1)), hsum = hk[0] + hk[1] + hk[2];
    slots(g, hx, PB, 3, { s: 80, h: 80, k: [kh, kh, kh], hang: true, placed: Math.floor(hsum + 1e-9) });
    tower(g, hx, PB, 3, { s: 80, label: '÷2', k: hsum, count: hsum, hang: true });
    const l17 = prog(t, T.S17, T.S17 + 0.5);
    eqCard(g, t, hx, 340, [{ s: 'log', at: T.log15, color: C.logInk }, { s: '₂', at: T.two15, color: C.baseInk }, { s: ' 1/8', at: T.eighth15, color: C.ink }, { s: ' = ', at: T.is15, color: C.ink }, { s: num(-3), at: T.minus15, color: C.logInk }],
      { size: 50, edge: C.log, k: prog(t, T.log15 - 0.1, T.log15 + 0.25), lift: l17, string: [800, -20] });
    sticker(g, num(-3), 640, 760, { r: 40, k: prog(t, T.three15, T.three15 + 0.3) - prog(t, T.S17, T.S17 + 0.4) });
    eqCard(g, t, hx, 480, [{ s: 'MINUS', at: T.minus16, color: C.ink }, { s: ' = ', at: T.sign16, color: C.ink }, { s: 'DIVIDE', at: T.divide16, color: C.ink }], { size: 40, edge: C.ink, k: prog(t, T.minus16 - 0.05, T.minus16 + 0.3), lift: prog(t, T.instead16, T.instead16 + 0.4) });
    // câu 17: khoanh con đường + gốc, tháp ×2 dương, mũi tên + thẻ
    ring(g, 980 - 720, TOP - 4, 1440, 52, prog(t, T.road17, T.road17 + 0.6) - prog(t, T.one17 - 0.1, T.one17 + 0.2), { pad: 8 });
    ring(g, X0 - 48, TOP - 96 - 12, 96 + 12, 96 + 12, prog(t, T.one17, T.one17 + 0.4), { pad: 8 });
    const pk = this.POS.map(a => prog(t, a - 0.3, a + 0.1)), psum = pk[0] + pk[1] + pk[2];
    tower(g, gx, TOP, 3, { s: 96, label: '×2', k: psum, count: psum });
    arrow(g, 1010, 915, 1680, 915, prog(t, T.walk17, T.bigger17 + 0.4));
    arrow(g, 930, 915, 280, 915, prog(t, T.walk17b, T.smaller17 + 0.4));
    eqCard(g, t, 1400, 975, [{ s: 'BIGGER', at: T.bigger17, color: C.ink }, { s: ' → ', at: T.and17, color: C.ink }, { s: 'POSITIVE', at: T.positive17, color: C.logInk }], { size: 40, edge: C.log, k: prog(t, T.bigger17 - 0.05, T.bigger17 + 0.3) });
    eqCard(g, t, 600, 975, [{ s: 'SMALLER', at: T.smaller17, color: C.ink }, { s: ' → ', at: T.and17b, color: C.ink }, { s: 'NEGATIVE', at: T.negative17, color: C.logInk }], { size: 40, edge: C.log, k: prog(t, T.smaller17 - 0.05, T.smaller17 + 0.3) });
    if (t >= T.zero13 + 0.6) must('Math.log2(1)', 0);
    if (t >= T.three15 + 0.6) { must('Math.log2(1 / 8)', -3); must('2 ** -3', 0.125); }
    if (t >= this.POS[2] + 0.5) must('2 * 2 * 2', 8);
    mascot(g, t, 'ponder', T.fun13, T.mpl14);
  }
}
