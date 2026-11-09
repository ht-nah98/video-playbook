// b03 · A few more — câu p2 9–12. Ba cột trên bàn, mỗi cột một ví dụ: thẻ công thức GÕ DẦN theo lời, ô chờ nét đứt + sticker tím báo "số tầng",
// rồi khối cơ số (đỏ, chữ ×10 / ×3 / ×5) rơi đúng chữ "ten / ten / ten", "four threes", "a single five"; sticker đếm 1 2 3 … theo từng khối.
//  câu 9  "Let's try a few": ba ô nét đứt bật ở "let's", "try", "few"
//  câu 10 log₁₀ 1000 = 3: ba khối ×10 rơi ở ba chữ "ten" sau "because"
//  câu 11 log₃ 81 = 4: bốn khối ×3 rơi ở "four threes multiplied together"; khoanh navy "81" ở "eighty-one"
//  câu 12 log₅ 5 = 1: một khối ×5 ở "a single five". Mascot pointer 47 → 55.
import { C, BASE_Y, ground, block, tower, sticker, secTag, prog, lookup, must, clamp } from '../kit.js';
import { slots, eqCard, ring, mascot } from './g1-util.js';

export default class FewMore {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b03');
    this.START = L(9).start;
    this.FROM = Math.max(this.START - 1.2, L(8).end + 0.5);
    this.T = {
      lets9: w(9, "let's"), try9: w(9, 'try'), few9: w(9, 'few'),
      log10: w(10, 'log'), ten10: w(10, 'ten'), thousand10: w(10, 'thousand'), is10: w(10, 'is'), three10: w(10, 'three'),
      tenb10: w(10, 'ten', 2), tenc10: w(10, 'ten', 3), tend10: w(10, 'ten', 4), end10: L(10).end,
      log11: w(11, 'log'), three11: w(11, 'three'), e811: w(11, 'eighty-one'), is11: w(11, 'is'), four11: w(11, 'four'),
      four11b: w(11, 'four', 2), threes11: w(11, 'threes'), mult11: w(11, 'multiplied'), tog11: w(11, 'together'), make11: w(11, 'make'), e811b: w(11, 'eighty-one', 2),
      log12: w(12, 'log'), five12: w(12, 'five'), fiveb12: w(12, 'five', 2), is12: w(12, 'is'), one12: w(12, 'one'), single12: w(12, 'single'), end12: L(12).end,
    };
    const T = this.T;
    this.B1 = [T.tenb10, T.tenc10, T.tend10];                                                       // khối ×10 rơi ở từng "ten"
    this.B2 = [T.four11b + 0.1, T.threes11 + 0.2, T.mult11 + 0.2, T.tog11 + 0.1];                   // khối ×3
    this.B3 = [T.single12];                                                                         // khối ×5
  }
  sfx() {
    const T = this.T, FR0 = this.FROM, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(FR0 + 0.5, 'pop'), c(T.log10, 'card'), c(T.three10, 'pop'), ...this.B1.map(a => c(a, 'wood')),
      c(T.log11, 'card'), c(T.is11, 'pop'), ...this.B2.map(a => c(a, 'wood')), c(T.e811b, 'tick'),
      c(T.log12, 'card'), c(T.one12, 'pop'), c(T.single12, 'wood')];
  }
  render(g, t) {
    const T = this.T, base = BASE_Y, s = 110, FR = this.FROM;
    ground(g, 'table');
    secTag(g, 'A few more', { k: prog(t, FR + 0.3, FR + 0.7), t });
    const land = (a, i) => prog(t, a - 0.3, a + 0.1);
    const cols = [
      { x: 560, n: 3, label: '×10', B: this.B1, ans: T.three10, ansTxt: '3', fade: this.B1[2] + 0.4, k0: FR + 0.5,
        segs: [{ s: 'log', at: T.log10, color: C.logInk }, { s: '₁₀', at: T.ten10, color: C.baseInk }, { s: ' 1000', at: T.thousand10, color: C.ink }, { s: ' = ', at: T.is10, color: C.ink }, { s: '3', at: T.three10, color: C.logInk }] },
      { x: 960, n: 4, label: '×3', B: this.B2, ans: T.four11, ansTxt: '4', fade: this.B2[3] + 0.5, k0: FR + 0.7,
        segs: [{ s: 'log', at: T.log11, color: C.logInk }, { s: '₃', at: T.three11, color: C.baseInk }, { s: ' 81', at: T.e811, color: C.ink }, { s: ' = ', at: T.is11, color: C.ink }, { s: '4', at: T.four11, color: C.logInk }] },
      { x: 1360, n: 1, label: '×5', B: this.B3, ans: T.one12, ansTxt: '1', fade: this.B3[0] + 0.5, k0: FR + 0.9,
        segs: [{ s: 'log', at: T.log12, color: C.logInk }, { s: '₅', at: T.five12, color: C.baseInk }, { s: ' 5', at: T.fiveb12, color: C.ink }, { s: ' = ', at: T.is12, color: C.ink }, { s: '1', at: T.one12, color: C.logInk }] },
    ];
    const cards = cols.map((c, ci) => {
      const kk = c.B.map(a => land(a)), placed = kk.filter(v => v >= 1).length, sum = kk.reduce((a, b) => a + b, 0);
      const ka = prog(t, c.ans, c.ans + 0.3), k0 = prog(t, c.k0, c.k0 + 0.3);
      slots(g, c.x, base, c.n, { s, k: Array.from({ length: c.n }, (_, i) => i ? ka : Math.max(k0, ka)), placed });
      tower(g, c.x, base, c.n, { s, label: c.label, k: sum, count: sum });
      sticker(g, c.ansTxt, c.x + 170, base - 70, { r: 40, k: ka - prog(t, c.fade - 0.2, c.fade + 0.1) });
      const top = base - c.n * s - 15;
      return eqCard(g, t, c.x, Math.min(top - 110, 600), c.segs, { size: 44, edge: C.log, k: prog(t, c.segs[0].at - 0.1, c.segs[0].at + 0.25) });
    });
    if (cards[1]) { const p81 = cards[1].parts[2]; ring(g, p81.x + 14, cards[1].cy - 34, p81.w - 14, 68, prog(t, T.e811b, T.e811b + 0.4)); }
    if (t >= this.B1[2] + 0.5) must('Math.log10(1000)', 3);
    if (t >= this.B2[3] + 0.5) { must('3 * 3 * 3 * 3', 81); must('Math.log(81) / Math.log(3)', 4); }
    if (t >= this.B3[0] + 0.5) must('5 ** 1', 5);
    mascot(g, t, 'pointer', T.three10 - 0.2, T.log12 + 0.5);
  }
}
