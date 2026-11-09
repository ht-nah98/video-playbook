// b01 · Forwards (ACT ONE) — câu p2 0–3. Nối từ p1: t ≤ −2.45 chỉ có bàn trơn (kit.bare); thẻ hồi "ACT ONE" rơi từ START − 2.45,
// nhấc đi, rồi khối ×2 đầu tiên rơi xuống bàn ĐÚNG hình học a0 S5 (tháp 960, s 120).
//  câu 0  "multiplying again and again": khối ×2 đầu rơi; ô chờ nét đứt của khối 2, 3 hiện ở "multiplying", "again" (rung ở "again" 2)
//  câu 1  "Begin at one": khối mộc "1" (vạch xuất phát) rơi cạnh trái; mỗi "two" một khối ×2 (khối đầu nhún ở "two" 1); "land on eight" → thẻ 2×2×2 = 8
//  câu 2  "two to the power of three equals eight" → thẻ 2³ = 8; "the three tells you how many times" → sticker 3 + đếm tầng 1 2 3 trên tháp
//  câu 3  "a power answers a forward question": thẻ POWER: A FORWARD QUESTION; khoanh navy từng khối ở "multiply by two three times";
//         "where do you end up" → thẻ "?" treo trên tháp; "At eight" → chữ "?" đổi thành 8 (cùng thẻ). Mascot pointer 11.6 → 20.4.
import { C, BASE_Y, ground, block, tower, sticker, tag, secTag, actTitle, prog, lookup, must, clamp } from '../kit.js';
import { nudge, scaled, slots, eqCard, ring, mascot } from './g1-util.js';

export default class Forwards {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');
    this.START = L(0).start;
    this.FROM = -3.0;                                         // khung 0 của p2 (LEAD 3.0) = bàn trơn
    this.T = {
      multiplying0: w(0, 'multiplying'), again0: w(0, 'again'), again0b: w(0, 'again', 2),
      one1: w(1, 'one'), two1: w(1, 'two'), two1b: w(1, 'two', 2), two1c: w(1, 'two', 3), land1: w(1, 'land'), eight1: w(1, 'eight'),
      two2: w(2, 'two'), three2: w(2, 'three', 2), how2: w(2, 'how'), mult2: w(2, 'multiplied'), eight2: w(2, 'eight'),
      power3: w(3, 'power'), forward3: w(3, 'forward'), mul3: w(3, 'multiply'), by3: w(3, 'by'), three3: w(3, 'three'), times3: w(3, 'times'),
      where3: w(3, 'where'), eight3: w(3, 'eight'), end3: L(3).end,
    };
    const T = this.T;
    this.DROP1 = this.START + 0.5;                            // khối đầu rơi ngay khi thẻ hồi nhấc đi
  }
  sfx() {
    const T = this.T, S = this.START, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(S - 2.25, 'wood'), c(S - 1.3, 'card'), c(this.DROP1 + 0.3, 'wood'), c(T.one1, 'wood'), c(T.two1b, 'wood'), c(T.two1c, 'wood'),
      c(T.land1 + 0.1, 'pop'), c(T.two2, 'card'), c(T.three2, 'pop'), c(T.how2 + 0.1, 'tick'), c(T.how2 + 0.6, 'tick'), c(T.how2 + 1.1, 'tick'),
      c(T.power3 + 0.3, 'card'), c(T.mul3 + 0.1, 'tick'), c(T.three3 - 0.1, 'tick'), c(T.where3 + 0.1, 'pop'), c(T.eight3, 'correct')];
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y, X = 960;
    ground(g, 'table');
    if (t <= S - 2.45) return;                                // khung nối: bàn trơn, không vật nào khác
    actTitle(g, t, S, 'ACT ONE', 'The question, backwards');
    secTag(g, 'Forwards', { k: prog(t, S, S + 0.4), t });
    // vạch xuất phát "1"
    block(g, 700, base, 100, { color: C.birch, label: '1', k: prog(t, T.one1 - 0.3, T.one1 + 0.1) });
    // tháp ×2: khối đầu rơi sau thẻ hồi; khối 2, 3 ở "two" 2, 3 của câu 1
    const d = [this.DROP1, T.two1b - 0.3, T.two1c - 0.3];
    const kk = d.map(a => prog(t, a, a + 0.4)), n = kk[0] + kk[1] + kk[2];
    const wig = t > T.again0b && t < T.again0b + 0.5 ? t : 0;
    slots(g, X, base, 3, { s: 120, k: [0, prog(t, T.multiplying0, T.multiplying0 + 0.3), prog(t, T.again0, T.again0 + 0.3)], placed: kk[0] >= 1 ? (kk[1] >= 1 ? (kk[2] >= 1 ? 3 : 2) : 1) : 0, wig });
    const count = 3 * prog(t, T.how2 + 0.1, T.how2 + 1.4) - 3 * prog(t, T.power3 - 0.1, T.power3 + 0.4);
    const nd = t > T.two1 - 0.2 && t < T.two1 + 0.6 ? nudge(t, T.two1) : 1;
    g.save(); g.translate(X, base); g.scale(1, nd); g.translate(-X, -base);
    tower(g, X, base, 3, { s: 120, label: '×2', k: n, count });
    g.restore();
    // thẻ 2 × 2 × 2 = 8 (câu 1) → nhấc đi, thẻ 2³ = 8 (câu 2) → nhấc đi ở câu 3
    const c1 = eqCard(g, t, 1370, 560, [{ s: '2 × 2 × 2 = 8', at: T.land1, color: C.ink }], { size: 52, k: prog(t, T.land1 - 0.05, T.land1 + 0.3), lift: prog(t, T.two2 - 0.1, T.two2 + 0.4), string: [X + 80, 520] });
    const c2 = eqCard(g, t, 1370, 560, [{ s: '2³ = 8', at: T.two2, color: C.ink }], { size: 64, k: prog(t, T.two2 - 0.05, T.two2 + 0.3), lift: prog(t, T.power3 - 0.1, T.power3 + 0.5), string: [X + 80, 520] });
    if (c2 && prog(t, T.three2, T.three2 + 0.3) > 0) sticker(g, '3', c2.x + c2.w - 6, c2.y - 16, { r: 40, k: prog(t, T.three2, T.three2 + 0.3) * (1 - prog(t, T.power3 - 0.1, T.power3 + 0.4)) });
    // câu 3: thẻ POWER: A FORWARD QUESTION, khoanh navy từng khối, thẻ ? → 8
    const kf = prog(t, T.power3, T.power3 + 0.3);
    eqCard(g, t, 1380, 300, [{ s: 'POWER:', at: T.power3, color: C.ink }, { s: ' A FORWARD QUESTION', at: T.forward3, color: C.ink }], { size: 44, k: kf, string: [X + 100, -20] });
    for (let i = 0; i < 3; i++) { const a = [T.mul3, T.by3 + 0.2, T.three3][i];
      ring(g, X - 60, base - (i + 1) * 120 - 10, 120 + 17, 120, prog(t, a, a + 0.3) - prog(t, T.end3 - 0.8, T.end3 - 0.4), { pad: 8 }); }
    const kq = prog(t, T.where3, T.where3 + 0.3), top = base - 3 * 120 - 17;
    if (kq > 0) {
      const ans = t >= T.eight3;
      scaled(g, X, top - 100, ans ? nudge(t, T.eight3) : 1, () => tag(g, ans ? '8' : '?', X, top - 100, { size: 64, k: kq, string: [X - 36, -20] }));
    }
    if (t >= T.eight3 + 0.6) { must('2 ** 3', 8); must('2 * 2 * 2', 8); }
    mascot(g, t, 'pointer', T.how2 - 0.5, T.end3 + 0.5);
  }
}
