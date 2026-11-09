// c4 · What's left — CẢNH MẪU CỦA ĐẠO DIỄN (khung lab 0, tools/lab/glass.html).
// Nối thẳng từ c3 (CONTINUES): ô cửa ở X 712, Y 132, cs 80, kính theo PHI, 20 ô kính đôi ĐÃ nhấc ('hole').
// "red … ring" → viền sáng vòng; "blue … corners" → viền góc; "same digits" → hai dãy chip sắp xếp khớp từng số;
// "Phistomefel ring" khắc lớn; mascot `point` nói (miệng theo lời đọc) lúc giới thiệu tên; câu cuối "we only counted".
import { W, H, C, prog, lookup, must, outCubic, ground, window9, outline, chip, it, label, eq, figure, sectionTag,
  PHI, RING, CORNERS, sortedDigits } from '../kit.js';

const kindOf = (r, c) => (PHI.red(r, c) && PHI.blue(r, c) ? 'hole' : PHI.red(r, c) ? 'red' : PHI.blue(r, c) ? 'blue' : 'clear');
const RS = sortedDigits(RING), CS = sortedDigits(CORNERS);

export default class Left {
  static ERA = 'glass';
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      remains: w(29, 'remains'), red: w(30, 'red'), ring: w(30, 'ring'), blue: w(31, 'blue'), corners: w(31, 'corners'),
      same: w(32, 'same'), digits: w(32, 'digits'), phi: w(33, 'phistomefel'), german: w(33, 'german'),
      check: w(34, 'check'), every: w(34, 'every'), solved: w(35, 'solved'), counted: w(35, 'counted'), end: L(35).end,
    };
    this.START = L(29).start;
    this.FROM = Math.max(this.START - 1.2, L(28).end + 0.5);
    this.CONTINUES = true;                                  // c3 kết đúng khung này (cùng ô cửa, kính đôi đã nhấc)
    must(`'${RS.join('')}' === '${CS.join('')}'`, true);         // đa tập vòng = góc trên chính lưới
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ring, kind: 'tick' }, { t: T.corners, kind: 'tick' },
      ...RS.map((_, i) => ({ t: T.same + i * 0.09, kind: 'tick', db: -6 })).filter((_, i) => i % 4 === 0),
      { t: T.digits + 0.6, kind: 'correct' }, { t: T.phi, kind: 'pen' }, { t: T.counted, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ô cửa: kính nguyên trạng cuối c3; "remains" → ô trong mờ đi một chút để vòng và góc nổi lên
    const P = window9(g, 712, 132, 80, { kindOf });
    const dim = prog(t, T.remains, T.remains + 0.6);
    if (dim > 0) { g.save(); g.globalAlpha = 0.28 * dim; g.fillStyle = '#E4DCCD';
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (kindOf(r, c) === 'clear' || kindOf(r, c) === 'hole') g.fillRect(712 + c * 80, 132 + r * 80, 80, 80);
      g.restore(); }
    outline(g, P, RING, C.redT, prog(t, T.ring - 0.1, T.ring + 0.4), 6);
    outline(g, P, CORNERS, C.blueT, prog(t, T.corners - 0.1, T.corners + 0.4), 6);

    // phải: hai dãy chip đã sắp, khớp từng số (đúng khung lab 0)
    const cx0 = 1542, cx1 = 1714, cs = 42, top = 166, pitch = 52;
    label(g, 'ring', cx0 + cs / 2, 150, { color: C.redT, align: 'center', k: prog(t, T.same - 0.3, T.same) });
    label(g, 'corners', cx1 + cs / 2, 150, { color: C.blueT, align: 'center', k: prog(t, T.same - 0.3, T.same) });
    RS.forEach((v, i) => {
      const k = outCubic(prog(t, T.same + i * 0.09, T.same + i * 0.09 + 0.35)), y = top + i * pitch;
      chip(g, cx0, y, cs, 'red', v, k); chip(g, cx1, y, cs, 'blue', CS[i], k);
      if (k >= 1) it(g, '=', (cx0 + cs + cx1) / 2, y + cs * 0.75, 36, C.dim, { align: 'center', k: prog(t, T.digits, T.digits + 0.4) });
    });

    // trái: tiêu đề, tên, ghi chú
    sectionTag(g, "ACT II · WHAT'S LEFT", prog(t, this.FROM, this.FROM + 0.6));
    eq(g, [['ring', C.redT], [' = '], ['corners', C.blueT]], 96, 230, 92, { k: Math.max(prog(t, T.ring, T.corners + 0.3) * 0.34, prog(t, T.corners, T.corners + 0.6)) });
    it(g, 'the Phistomefel ring', 96, 330, 52, C.ink, { k: prog(t, T.phi, T.phi + 0.8) });
    label(g, 'named after a German puzzle setter', 96, 376, { k: prog(t, T.german, T.german + 0.7) });
    it(g, 'works on every sudoku', 96, 450, 36, C.dim, { k: prog(t, T.every, T.every + 0.6) });
    it(g, 'we never solved anything —', 96, 520, 36, C.ink, { k: prog(t, T.solved - 0.2, T.solved + 0.5) });
    it(g, 'we only counted.', 96, 566, 44, C.redT, { k: prog(t, T.counted, T.counted + 0.5) });

    // mascot chỉ tay sang ô cửa, NÓI theo lời đọc (5–8 s quanh lúc giới thiệu tên)
    const kf = prog(t, T.phi - 0.6, T.phi - 0.2) * (1 - prog(t, T.counted + 0.6, T.counted + 0.95));
    figure(g, 'point', 250, H, 500, kf, { t });
  }
}
