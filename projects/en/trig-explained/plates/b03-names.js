// b03 · Ba cái tên · p2 câu 12–16. Mỗi tỉ số sáng đúng hai cạnh; câu 16 đổi nhãn sang tên chuẩn + soh cah toa.
import { bg } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, prog, rightTri, card } from './common.js';
const AX = 340, GY = 860, LEN = 720, DEG = 34;
export default class Names {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b03', 12); this.START = START; this.FROM = FROM; this.T = { s: L(13).start, c: L(14).start, n: L(15).start, std: L(16).start }; }
  sfx() { const T = this.T; return [cue(T.s, 'card'), cue(T.c, 'card'), cue(T.n, 'card'), cue(T.std, 'tick')]; }
  render(g, t) {
    const T = this.T; bg(g); const on = t < T.s ? 0 : t < T.c ? 1 : t < T.n ? 2 : t < T.std ? 3 : 0, std = t >= T.std, col = (n, c) => ({ s: on !== 2, a: on !== 1, h: on !== 3 }[n] ? c : C.faint);
    const r = rightTri(g, AX, GY, LEN, DEG, { opp: col('s', C.sin), adj: col('a', C.cos), hyp: col('h', C.ink), arc: 120, label: 'our angle', labelDx: 130 });
    txt(g, std ? 'opposite' : 'across', r.ex + 30, (GY + r.ey) / 2, FONT.mono(38), col('s', C.sin), 'left'); txt(g, std ? 'adjacent' : 'next to', AX + LEN / 2, GY + 50, FONT.mono(38), col('a', C.cos));
    g.save(); g.translate(AX + LEN * .46, GY - LEN * .46 * Math.tan(DEG * Math.PI / 180) - 44); g.rotate(-DEG * Math.PI / 180); txt(g, std ? 'hypotenuse' : 'longest', 0, 0, FONT.mono(38), col('h', C.ink)); g.restore();
    [['sine', 'across ÷ longest', C.sin, T.s, 200], ['cosine', 'next to ÷ longest', C.cos, T.c, 410], ['tangent', 'across ÷ next to', C.tan, T.n, 620]].forEach(([n, f, c, a, y]) => { const k = prog(t, a, a + .3); card(g, 1300, y - 62, 530, 180, c, k); txt(g, n, 1330, y, FONT.black(64), c, 'left', k); txt(g, f, 1330, y + 66, FONT.mono(38), C.ink, 'left', k); });
    if (std) txt(g, 'soh cah toa', 1565, 815, FONT.head(52), C.ink, 'center', prog(t, T.std + 2.2, T.std + 2.6));
  }
}
