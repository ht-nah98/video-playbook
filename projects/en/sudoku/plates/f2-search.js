// f2 · Too big to search — câu 102–106.
// Một ô cửa đứng trước; "every possible grid" → cả bức tường ô cửa hiện ra, lùi xa vô tận (các lớp trôi ra xa theo t);
// "keep just sixteen clues" → mỗi ô cửa nhấp nháy một cách chọn 16 ô (đúng 16, hash tất định); số lớn khắc dưới:
// 6.7 × 10²¹ lưới · × 3.4 × 10¹⁶ cách = C(81, 16) (BigInt, must); "supercomputer" → tường trôi nhanh; "hopeless."
import { W, C, clamp, hash, prog, lookup, must, outBack, ground, it, label, eq, sectionTag } from '../kit.js';

const HY = 200, Y0 = 470, S0 = 150, STEP = 190, VX = 960, R = 0.8, CLIP = 690;

export default class Search {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      check: w(102, 'check'), every: w(102, 'everything'), take: w(103, 'take'), try: w(103, 'try'), whether: w(103, 'whether'),
      six: w(104, 'six'), grids: w(104, 'grids'), three: w(105, 'three'), sixteen: w(105, 'sixteen', 1), choose: w(105, 'choose'),
      cells: w(105, 'cells'), sup: w(106, 'supercomputer'), hope: w(106, 'hopeless'), end: L(106).end,
    };
    this.T.answerEnd = this.T.whether + 1.6;
    this.START = L(102).start;
    this.FROM = Math.max(this.START - 1.2, L(101).end + 0.5);
    let c = 1n; for (let i = 0n; i < 16n; i++) c = c * (81n - i) / (i + 1n);   // C(81, 16), chia hết từng bước
    must(`'${c}'`, '33594090947249085');                                           // CONTENT.md
    must(`(${Number(c)} / 1e16).toFixed(1)`, '3.4');
    must(`(6670903752021072936960 / 1e21).toFixed(1)`, '6.7');
    this.CBIG = BigInt(c).toLocaleString('en-US');
    must(`'${this.CBIG}'`, '33,594,090,947,249,085');
  }
  sfx() {
    const T = this.T;
    return [...[0, 1, 2, 3, 4, 5].map(i => ({ t: T.take + 0.1 + i * 0.15, kind: 'tick', db: -4 })),
      { t: T.six, kind: 'pen' }, { t: T.three, kind: 'pen' }, { t: T.hope, kind: 'pen' }];
  }
  /** Một ô cửa nhỏ: khung chì + 81 ô (trong / tường = gợi ý đang chọn). */
  mini(g, x, y, s, id, t) {
    g.fillStyle = C.lead; g.fillRect(x - s * 0.03, y - s * 0.03, s * 1.06, s * 1.06);
    if (s < 9) return;
    const T = this.T, c = s / 9, gap = Math.max(0.7, c * 0.12), on = t >= T.try;
    let pick = null;
    if (on) {                                                 // đúng 16 ô, đổi mỗi 0.16 s (chậm dần về sau)
      const step = Math.floor((t - T.try) / (t < T.answerEnd ? 0.16 : 0.32));
      pick = new Set([...Array(81).keys()].sort((a, b) => hash(id * 977 + step * 131 + a) - hash(id * 977 + step * 131 + b)).slice(0, 16));
    }
    for (let i = 0; i < 81; i++) {
      const r = (i / 9) | 0, q = i % 9, bx = (q % 3 === 0 ? gap : 0), by = (r % 3 === 0 ? gap : 0);
      g.fillStyle = !pick || pick.has(i) ? C.clear : '#BDB5A7';
      g.fillRect(x + q * c + gap / 2 + bx * 0.5, y + r * c + gap / 2 + by * 0.5, c - gap - bx * 0.5, c - gap - by * 0.5);
    }
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // bức tường ô cửa lùi xa: lớp m ở độ sâu m + D (D tăng theo t → trôi ra xa)
    const D = (t - this.FROM) * 0.22 + 1.4 * prog(t, T.sup, T.hope + 1.2) ** 2;
    g.save(); g.beginPath(); g.rect(0, 0, W, CLIP); g.clip();
    for (let m = Math.floor(15 - D); m >= Math.ceil(-1 - D); m--) {
      const z = m + D, sc = R ** z, s = S0 * sc, y = HY + (Y0 - HY) * sc, step = STEP * sc;
      if (s < 2.5) continue;
      const n = Math.ceil((W / 2 + step) / step);
      for (let j = -n; j <= n; j++) {
        const id = m * 101 + j + 5000;
        const at = m === 0 && j === 0 ? this.FROM + 0.3 : T.take + 0.05 * Math.abs(j) + 0.1 * Math.max(0, m) + 0.2 * hash(id);
        const e = outBack(prog(t, at, at + 0.3)); if (e <= 0) continue;
        const ss = s * e, cx = VX + j * step;
        this.mini(g, cx - ss / 2, y + (s - ss) / 2, ss, id, t);
      }
    }
    g.restore();

    sectionTag(g, 'ACT V · TOO BIG TO SEARCH', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    // phải dưới: ý; trái dưới: số
    it(g, 'check everything?', 1824, 790, 60, C.ink, { align: 'right', k: prog(t, T.check - 0.2, T.every + 0.5) });
    label(g, 'every grid × every 16-clue choice', 1824, 840, { align: 'right', k: prog(t, T.try, T.try + 0.9) });
    label(g, 'any with only one answer?', 1824, 876, { align: 'right', k: prog(t, T.whether, T.whether + 0.7) });
    eq(g, [['6.7 × 10²¹'], [' grids', C.dim]], 96, 800, 72, { k: prog(t, T.six, T.grids + 0.3) });
    eq(g, [['× 3.4 × 10¹⁶'], [' ways', C.dim]], 96, 900, 72, { k: prog(t, T.three, T.sixteen + 0.3) });
    label(g, `C(81, 16) = ${this.CBIG} ways to choose 16 cells`, 96, 950, { size: 18, k: prog(t, T.choose, T.cells + 0.6) });
    it(g, 'hopeless.', 1824, 990, 92, C.ink, { align: 'right', k: prog(t, T.hope, T.hope + 0.5) });
  }
}
