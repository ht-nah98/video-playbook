// g2 · Putting it together (p2, câu 131–134). DNA: ba ô kính tròn 1·2·3 của a0 QUAY LẠI — cùng roundel, cùng chữ, cùng
// toạ độ (QX/QY/QR/QUESTIONS chép đúng từ a0-open.js; cảnh không import cảnh khác) — mỗi câu một hình thu nhỏ:
// (1) ô cửa nhỏ tô Phistomefel, nhấc kính đôi → "ring = corners"; (2) 5² − 4² = 9 · x² − y² → x − y = 1; (3) "17".
import { C, prog, lookup, must, outCubic, ground, window9, it, label, eq, num, sectionTag, roundel, PHI, X, Y,
  SQ_SMALL, SQ_BIG } from '../kit.js';

// ── ba câu hỏi: ĐÚNG như a0-open.js ──
const QX = [480, 960, 1440], QY = 320, QR = 130;
const QUESTIONS = [['Why does the', 'hidden ring exist?'], ['How far does the trick go?', 'What does it have', 'to do with algebra?'],
  ['How few clues', 'can a sudoku have?', 'How do you prove', 'one fewer is impossible?']];
function question(g, i, k, kl) {
  roundel(g, QX[i], QY, QR, i + 1, [], k);
  QUESTIONS[i].forEach((s, j) => it(g, s, QX[i], QY + QR + 60 + j * 42, 36, C.ink, { align: 'center', k: kl(j) }));
}

export default class Together {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    this.T = {
      three: w(131, 'three'), questions: w(131, 'questions'), end131: L(131).end,
      ring: w(132, 'ring'), rows: w(132, 'rows'), columns: w(132, 'columns'), overlap: w(132, 'overlap'), equal: w(132, 'equal'),
      algebra: w(133, 'algebra'), five: w(133, 'five'), set: w(133, 'set'), x: w(133, 'x'), y: w(133, 'y'), end133: L(133).end,
      seventeen: w(134, 'seventeen'), hopeless: w(134, 'hopeless'), year: w(134, 'year'), end: L(134).end,
    };
    this.START = L(131).start;
    this.FROM = Math.max(this.START - 1.2, L(130).end + 0.5);
    must('5^2 − 4^2', 9);
    must(`${SQ_BIG.length} − ${SQ_SMALL.length}`, 9);
    must(`${X} − ${Y}`, 1);
    must(`${X}^2 − ${Y}^2`, X + Y);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.rows + 0.3, kind: 'chip' }, { t: T.overlap, kind: 'snap' }, { t: T.five, kind: 'pen' },
      { t: T.x, kind: 'pen' }, { t: T.seventeen, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'ACT VI · PUTTING IT TOGETHER', prog(t, this.FROM + 0.3, this.FROM + 0.9));

    // ba ô kính tròn trồi lại; chữ khắc lại nhanh ở "the three questions"
    for (let i = 0; i < 3; i++) {
      const k = prog(t, this.FROM + 0.3 + i * 0.15, this.FROM + 0.9 + i * 0.15);
      question(g, i, k, j => prog(t, T.three - 0.2 + i * 0.2 + j * 0.08, T.questions + 0.2 + i * 0.2 + j * 0.08));
    }

    // (1) ô cửa thu nhỏ: kính trong → đỏ (hàng + khối) → xanh (cột), ô chung = kính đôi → nhấc ra
    const kin = outCubic(prog(t, T.ring - 0.2, T.ring + 0.4));
    if (kin > 0) {
      g.save(); g.translate(0, (1 - kin) * 420);
      const cs = 24, gx = QX[0] - 4.5 * cs, gy = 700;
      const ir = r => prog(t, T.rows - 0.1 + r * 0.04, T.rows + 0.25 + r * 0.04), ic = c => prog(t, T.columns - 0.1 + c * 0.04, T.columns + 0.25 + c * 0.04);
      const lift = prog(t, T.overlap, T.overlap + 0.35);
      const st = (r, c) => {
        const red = PHI.red(r, c), blue = PHI.blue(r, c);
        if (red && blue) { if (lift > 0) return ['hole', 1]; if (ic(c) > 0) return ['dbl', ic(c)]; return ir(r) > 0 ? ['red', ir(r)] : ['clear', 1]; }
        if (red) return ir(r) > 0 ? ['red', ir(r)] : ['clear', 1];
        if (blue) return ic(c) > 0 ? ['blue', ic(c)] : ['clear', 1];
        return ['clear', 1];
      };
      window9(g, gx, gy, cs, { kindOf: (r, c) => st(r, c)[0], kOf: (r, c) => st(r, c)[1], digits: () => null, shadow: false });
      g.restore();
    }
    eq(g, [['ring', C.redT], [' = '], ['corners', C.blueT]], QX[0], 990, 44, { align: 'center', k: prog(t, T.equal - 0.2, T.equal + 0.4) });

    // (2) hiệu hai bình phương — "turn the grid into algebra" trước
    label(g, 'grid → algebra', QX[1], 708, { align: 'center', k: prog(t, T.algebra - 0.5, T.algebra + 0.4) });
    eq(g, [['5²', C.blueT], [' − '], ['4²', C.redT], [' = 9']], QX[1], 780, 60, { align: 'center', k: prog(t, T.five, T.five + 1.2) });
    label(g, 'one full set of digits', QX[1], 826, { align: 'center', k: prog(t, T.set - 0.3, T.set + 0.4) });
    eq(g, [['x²', C.blueT], [' − '], ['y²', C.redT]], QX[1], 912, 60, { align: 'center', k: prog(t, T.x, T.y + 0.4) });
    it(g, 'x − y = 1', QX[1], 970, 44, C.dim, { align: 'center', k: prog(t, T.end133 - 0.2, T.end133 + 0.4) });

    // (3) mười bảy
    num(g, '17', QX[2], 840, 120, C.ink, { align: 'center', k: prog(t, T.seventeen, T.seventeen + 0.3) });
    label(g, 'hopeless search', QX[2], 906, { align: 'center', k: prog(t, T.hopeless - 0.1, T.hopeless + 0.4) });
    label(g, '→ one year of computing', QX[2], 950, { align: 'center', k: prog(t, T.year - 0.3, T.end) });
  }
}
