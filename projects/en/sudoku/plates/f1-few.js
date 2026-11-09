// f1 · How few? — MỞ HỒI V (thẻ "ACT FIVE · Seventeen clues · ANSWERS 3"), câu 96–101.
// Ô cửa (X 712, Y 132, cs 80) trồi lên theo thẻ hồi; 25 ô kính trong = gợi ý báo in (một câu đố THẬT, duy nhất lời giải:
// python tham lam bỏ ô trên SOL, kiểm bằng bộ giải — 25 gợi ý tối thiểu). "fewest" → nhấc dần 8 kính → 17; "sixteen" →
// nhấc thêm một → "16?"; "more than one answer" → "?" vào các ô đã nhấc; "not finding … proof" → tấm kính khắc
// "never found = proof?" NỨT (kính nứt thứ hai của bài, DNA §1).
import { C, clamp, prog, lookup, must, outCubic, ground, dark, window9, crack, it, label, num, sectionTag, actCard, actFlash } from '../kit.js';

/** 25 gợi ý (câu đố duy nhất lời giải của SOL). Trùng ở f4 (MASK16) và f5 (CLUE17) — đáng gom vào kit. */
const CLUE25 = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 2], [1, 6], [2, 0], [2, 3], [3, 2], [3, 3], [3, 7], [3, 8], [4, 4], [4, 7],
  [5, 0], [5, 1], [5, 2], [6, 7], [6, 8], [7, 0], [7, 1], [7, 3], [7, 4], [7, 6], [8, 8]];
const DROP = [[8, 8], [0, 1], [4, 4], [7, 4], [2, 3], [5, 1], [6, 7], [3, 3]];   // 25 → 17
const DROP16 = [1, 6];                                                           // 17 → 16
const key = ([r, c]) => r * 9 + c;
const IS_CLUE = new Set(CLUE25.map(key));
const X0 = 712, Y0 = 132, CS = 80;

export default class Few {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      news: w(96, 'newspaper'), tf: w(96, 'twenty-five'), clues: w(96, 'clues'), fewest: w(97, 'fewest'), only: w(97, 'only'),
      sev: w(98, 'seventeen'), tens: w(98, 'tens'), nobody: w(99, 'nobody'), six: w(99, 'sixteen'), every: w(100, 'every'),
      more: w(100, 'more'), hint: w(101, 'hint'), not: w(101, 'not'), some: w(101, 'something'), isnt: w(101, "isn't"), end: L(101).end,
    };
    this.START = L(96).start;
    this.FROM = Math.max(this.START - 2.6, L(95).end + 0.5);
    const T = this.T;
    must(`${IS_CLUE.size}`, 25);
    must(`${DROP.filter(d => IS_CLUE.has(key(d))).length} + ${IS_CLUE.has(key(DROP16)) && !DROP.some(d => key(d) === key(DROP16))}`, 9);
    must(`${IS_CLUE.size} - ${new Set(DROP.map(key)).size}`, 17);
    must(`${IS_CLUE.size} - ${new Set(DROP.map(key)).size} - 1`, 16);
    // mốc: gợi ý lắp so le từ "newspaper" tới "clues"; nhấc 8 kính từ "fewest" tới ngay trước "seventeen"
    this.fitAt = new Map(CLUE25.map((p, i) => [key(p), T.news + (T.clues - T.news) * i / CLUE25.length]));
    this.dropAt = new Map(DROP.map((p, i) => [key(p), T.fewest + (T.sev - 0.5 - T.fewest) * i / (DROP.length - 1)]));
    this.dropAt.set(key(DROP16), T.six);
  }
  sfx() {
    const T = this.T;
    return [{ t: actFlash(this.FROM), kind: 'shimmer' }, { t: T.tf, kind: 'chip' },
      ...[...this.dropAt.values()].map(t => ({ t: t + 0.2, kind: 'tick' })),
      { t: T.more, kind: 'pen' }, { t: T.isnt, kind: 'error' }];
  }
  kOf(t, r, c) {
    const k = key([r, c]); if (!IS_CLUE.has(k)) return 0;
    const fit = outCubic(prog(t, this.fitAt.get(k), this.fitAt.get(k) + 0.35));
    const d = this.dropAt.get(k); return d == null ? fit : fit * (1 - prog(t, d, d + 0.45));
  }
  render(g, t) {
    const T = this.T, a = this.FROM + 0.4;
    ground(g);
    // ô cửa trồi lên cùng nhịp thẻ hồi trượt đi (cùng công thức actCard)
    const rise = 1 - outCubic(prog(t, Math.max(a + 0.6, this.START - 0.35), Math.max(a + 1.2, this.START + 0.25)));
    g.save(); g.translate(0, rise * 760);
    const kk = (r, c) => this.kOf(t, r, c);
    const P = window9(g, X0, Y0, CS, { kindOf: (r, c) => (kk(r, c) > 0 ? 'clear' : this.dropAt.has(r * 9 + c) && t > this.dropAt.get(r * 9 + c) ? 'hole' : 'empty'), kOf: kk, digitK: (r, c) => (kk(r, c) >= 0.9 ? 1 : 0) });
    // "more than one answer": dấu hỏi vào các ô vừa nhấc
    [...DROP, DROP16].forEach(([r, c], i) => {
      const [cx, cy] = P.ctr(r, c); it(g, '?', cx, cy + 16, 52, C.holeT, { align: 'center', k: prog(t, T.more + i * 0.08, T.more + i * 0.08 + 0.2) });
    });
    // phải: bộ đếm gợi ý
    const n = CLUE25.filter(([r, c]) => kk(r, c) >= 0.5).length, cx = 1642, on = prog(t, this.START, this.START + 0.4);
    label(g, 'clues', cx, 200, { align: 'center', k: on });
    if (on > 0) num(g, n === 16 ? '16?' : String(n), cx, 330, 120, C.ink, { align: 'center' });
    label(g, 'newspaper: around 25', cx, 400, { align: 'center', size: 18, k: prog(t, T.tf, T.tf + 0.6) });
    label(g, '17: found', cx, 450, { align: 'center', size: 18, k: prog(t, T.sev, T.sev + 0.4) });
    label(g, 'tens of thousands', cx, 480, { align: 'center', size: 18, k: prog(t, T.tens, T.tens + 0.6) });
    label(g, '16: never found', cx, 540, { align: 'center', size: 18, color: C.ink, k: prog(t, T.every, T.every + 0.5) });
    label(g, 'more than one answer', cx, 570, { align: 'center', size: 18, k: prog(t, T.more, T.more + 0.6) });
    g.restore();

    // trái: lời dẫn
    sectionTag(g, 'ACT V · HOW FEW?', prog(t, this.START, this.START + 0.6));
    it(g, 'a newspaper sudoku', 96, 230, 52, C.ink, { k: prog(t, T.news, T.news + 0.8) });
    it(g, 'how few clues can it have,', 96, 360, 52, C.ink, { k: prog(t, T.fewest - 0.2, T.fewest + 0.8) });
    it(g, 'and still have one answer?', 96, 420, 44, C.dim, { k: prog(t, T.only - 0.2, T.only + 0.6) });
    it(g, 'sixteen?', 96, 540, 60, C.ink, { k: prog(t, T.six - 0.1, T.six + 0.4) });
    it(g, 'a strong hint …', 96, 630, 44, C.dim, { k: prog(t, T.hint - 0.2, T.hint + 0.4) });
    // tấm kính khắc câu sai → nứt ("isn't a proof")
    const pk = prog(t, T.not - 0.1, T.not + 0.2);
    if (pk > 0) {
      g.save(); g.globalAlpha = clamp(pk * 2); g.fillStyle = C.lead; g.beginPath(); g.roundRect(84, 690, 572, 112, 10); g.fill();
      g.fillStyle = C.clear; g.beginPath(); g.roundRect(92, 698, 556, 96, 6); g.fill(); g.restore();
      it(g, 'never found = proof?', 116, 766, 60, C.ink, { k: prog(t, T.not, T.some + 0.4) });
      crack(g, 370, 750, 360, 40, prog(t, T.isnt, T.isnt + 0.35), 5);
    }

    dark(g, actCard(g, t, this.FROM, this.START, 'ACT FIVE', 'Seventeen clues', 'ANSWERS 3'));
  }
}
