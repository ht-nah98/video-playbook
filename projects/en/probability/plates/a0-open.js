// a0 · Cold open câu p1 0–9 — DNA vở nháp. Khung 0.5 s (trang) = THUMBNAIL: hai thẻ cược, 51.8% (vòng xanh) | 49.1% (gạch sóng đỏ),
// SAME ODDS? trên dạ vàng, người que dân cược nhún vai giữa hai thẻ, mascot ponder góc trái.
//  câu 0–1  thumbnail đứng yên + người que quay ra chỉ người xem ở "you".   cuối câu 1: hai số % thu về, thẻ trở về trống (dấu ?).
//  câu 2    thẻ 1: xúc xắc lăn 4 lần (đếm 1…4), "six" → mặt 6; "× 4" + "at least one 6" viết vào.
//  câu 3    thẻ 2: hai xúc xắc lăn, bộ đếm chạy tới 24; "× 24" + "at least one double 6".
//  câu 4–5  lý lẽ của ông viết bút bi: "4 × 1/6 = 2/3" (ở "four sixths" → "two thirds"), rồi "24 × 1/36 = 2/3"; "again" → dấu "=" lớn
//           giữa hai thẻ, người que đẩy hai thẻ lại gần (push).
//  câu 6–7  "ten thousand games": thanh + % chạy hội tụ ở cả hai thẻ; "fifty-one" → 51.8% xanh + vòng; "forty-nine" → 49.1% đỏ + gạch sóng.
//  câu 8    "money" mũi tên xanh lên; "loses" mũi tên đỏ xuống.
//  câu 9    "luck" / "rounding" hai chữ nháp bị gạch; "counting" → dấu "=" bị gạch thành ≠, người que ôm mặt.
// Mascot ponder suốt cảnh (≤ 260 px, góc trái dưới).
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, paper, write, calc, strike, gambler, POSE } from '../kit.js';
import { CARD, betPanel, sameOdds, bigEquals, pose, mascot } from './g-common.js';

export default class Open {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      you1: w(1, 'you'), e1: E(1),
      l2: S(2), die2: w(2, 'die'), times2: w(2, 'times'), six2: w(2, 'six'), once2: w(2, 'once'),
      l3: S(3), dice3: w(3, 'dice'), times3: w(3, 'times'), double3: w(3, 'double'), once3: w(3, 'once'),
      l4: S(4), oneTime4: w(4, 'time'), four4: w(4, 'four', 2), thirds4: w(4, 'thirds'), e4: E(4),
      l5: S(5), oneTime5: w(5, 'time'), tw5: w(5, 'twenty-four', 2), thirds5: w(5, 'thirds'), again5: w(5, 'again'), e5: E(5),
      l6: S(6), games6: w(6, 'games'), watch6: w(6, 'watch'),
      fifty7: w(7, 'fifty-one'), percent7: w(7, 'percent'), second7: w(7, 'second'), forty7: w(7, 'forty-nine'), e7: E(7),
      money8: w(8, 'money'), loses8: w(8, 'loses'),
      luck9: w(9, 'luck'), rounding9: w(9, 'rounding'), counting9: w(9, 'counting'), wrong9: w(9, 'wrong'), e9: E(9),
    };
    this.START = S(0);
    this.FROM = -0.6;                                    // trang p1 có LEAD 0.6: khung 0 của video = cảnh này
    this.END = S(10);
    const T = this.T;
    if (T.e1 + 0.2 > T.l2) throw new Error('a0: hết câu 1 sát câu 2');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.you1, 'tick'), c(T.die2, 'dice'), c(T.six2, 'pop'), c(T.dice3, 'dice'), c(T.double3, 'pop'),
      c(T.four4, 'pen'), c(T.thirds4, 'pen'), c(T.tw5, 'pen'), c(T.again5, 'snap'), c(T.games6, 'whoosh'),
      c(T.fifty7, 'correct'), c(T.forty7, 'error'), c(T.money8, 'coin'), c(T.luck9, 'pen'), c(T.counting9, 'crack')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    const thumb = t < T.e1 + 0.1;                         // giai đoạn thumbnail (câu 0–1)
    const clear = prog(t, T.e1 + 0.1, T.e1 + 0.6);        // số % thu về
    for (let i = 0; i < 2; i++) {
      const s = { k: 1 };
      if (thumb || clear < 1) Object.assign(s, { times: 1, want: 1, naive: 1, pct: 1 - clear, mark: 1 - clear });
      else {
        const l = i ? T.l3 : T.l2, rollEnd = i ? T.double3 : T.six2;
        s.roll = t < rollEnd ? { k: prog(t, l + 0.1, rollEnd), seed: i } : null;
        s.dice = prog(t, l, l + 0.3);
        if (t < l) { s.dice = 0; s.roll = null; }
        s.count = t >= l && t < (i ? T.e5 : T.e4) ? Math.min(i ? 24 : 4, Math.max(1, Math.ceil(prog(t, l + 0.1, rollEnd) * (i ? 24 : 4)))) : null;
        s.times = prog(t, i ? T.times3 : T.times2, (i ? T.times3 : T.times2) + 0.35);
        s.want = prog(t, i ? T.double3 - 0.5 : T.six2 - 0.4, i ? T.once3 : T.once2);
        s.naive = i ? prog(t, T.oneTime5, T.thirds5 + 0.3) : prog(t, T.oneTime4, T.thirds4 + 0.3);
        s.naiveHi = prog(t, T.again5, T.again5 + 0.4);
        if (t >= T.l6) s.sim = prog(t, T.games6, i ? T.forty7 : T.fifty7);
        s.pct = prog(t, i ? T.forty7 : T.fifty7, (i ? T.forty7 : T.fifty7) + 0.3);
        s.mark = prog(t, (i ? T.forty7 : T.fifty7) + 0.3, (i ? T.forty7 : T.fifty7) + 0.9);
        s.trend = prog(t, i ? T.loses8 : T.money8, (i ? T.loses8 : T.money8) + 0.4);
      }
      betPanel(g, i, s, t);
    }
    sameOdds(g, 1);
    bigEquals(g, thumb ? 0 : prog(t, T.again5, T.again5 + 0.4), prog(t, T.counting9, T.counting9 + 0.4));
    // nháp "bad luck?" / "rounding?" dưới thẻ, bị gạch
    if (t >= T.luck9) { calc(g, 'bad luck?', 300, 900, prog(t, T.luck9 - 0.2, T.luck9 + 0.3), { size: 40, color: C.ink2 }); strike(g, 292, 888, 520, 884, prog(t, T.luck9 + 0.4, T.luck9 + 0.7)); }
    if (t >= T.rounding9) { calc(g, 'rounding?', 1090, 900, prog(t, T.rounding9 - 0.2, T.rounding9 + 0.3), { size: 40, color: C.ink2 }); strike(g, 1082, 888, 1320, 884, prog(t, T.rounding9 + 0.5, T.rounding9 + 0.8)); }
    // người que dân cược: nhún vai → chỉ người xem ("you") → đẩy hai thẻ ("again") → ngồi đếm (sim) → ôm mặt ("counting")
    let p = POSE.shrug, dir = 1;
    if (t >= T.you1 && t < T.e1 + 0.2) p = pose('shrug', 'point', prog(t, T.you1 - 0.2, T.you1 + 0.2));
    if (t >= T.again5 - 0.4 && t < T.l6) p = pose('stand', 'push', prog(t, T.again5 - 0.4, T.again5));
    if (t >= T.l6 && t < T.e7) p = POSE.think;
    if (t >= T.e7) p = POSE.shrug;
    if (t >= T.counting9 - 0.3) p = pose('shrug', 'facepalm', prog(t, T.counting9 - 0.3, T.counting9 + 0.2));
    gambler(g, 960, 1050, 220, p, { dir });
    mascot(g, t, 'ponder', -1);
  }
}
