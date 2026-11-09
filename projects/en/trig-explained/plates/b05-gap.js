// b05 · Câu hỏi treo · p2 câu 22–24. 0.5 đúng; −0.988 từ đâu? Tỉ số độ dài không âm được.
import { bg, calculator } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, prog } from './common.js';
export default class Gap {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b05', 22); this.START = START; this.FROM = FROM; this.T = { a: L(22).start, b: L(22).start + 2.3, neg: L(23).start }; }
  sfx() { const T = this.T; return [cue(T.b, 'pop'), cue(T.neg, 'error')]; }
  render(g, t) {
    const T = this.T; bg(g); calculator(g, 680, 340, 'DEG', '0.5', C.sin, 1.05, prog(t, T.a, T.a + .3)); calculator(g, 1240, 340, 'RAD', '−0.988', C.neg, 1.05, prog(t, T.b, T.b + .2));
    if (t > T.a + .8) txt(g, '✓', 680, 560, FONT.black(64), C.tan); if (t > T.b + .2) txt(g, '?', 1240, 560, FONT.black(80), C.neg);
    txt(g, 'length ÷ length', 960, 680, FONT.mono(60), C.ink, 'center', prog(t, T.neg, T.neg + .3)); txt(g, 'can never be negative', 960, 770, FONT.head(60), C.neg, 'center', prog(t, T.neg + .4, T.neg + .7));
  }
}
