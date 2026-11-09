// b10 · Thirty là gì · p2 câu 58–60. Sin = độ cao; 30° ở độ cao 1/2; đường −0.988 chưa ai giải thích.
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, D2R } from './common.js';
const CX = 1240, CY = 540, R = 360;
export default class Thirty {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b10', 58); this.START = START; this.FROM = FROM; this.T = { a: L(58).start, neg: L(59).start + 2.2, w: L(60).start, end: L(60).end }; }
  sfx() { const T = this.T; return [cue(T.neg, 'pop'), cue(T.w, 'question')]; }
  render(g, t) {
    const T = this.T; bg(g); unit(g, CX, CY, R); const [mx, my] = onCircle(CX, CY, R, 30 * D2R);
    seg(g, mx, CY, mx, my, C.sin, 10); seg(g, CX, CY, mx, my, C.dim, 3); dot(g, mx, my, 18, C.ink); txt(g, '1/2', mx + 64, my + 40, FONT.head(52), C.sin);
    txt(g, 'sine = height', 110, 240, FONT.black(84), C.sin, 'left', prog(t, T.a, T.a + .4)); txt(g, 'on a circle', 110, 330, FONT.head(60), C.ink, 'left', prog(t, T.a + 1, T.a + 1.3));
    const yn = CY + R * .988; seg(g, CX - R - 70, yn, CX + R + 70, yn, C.neg, 5, prog(t, T.neg, T.neg + .5), [14, 14]); txt(g, '−0.988 ?', CX - R - 100, yn - 4, FONT.head(54), C.neg, 'right', prog(t, T.neg + .3, T.neg + .6));
    txt(g, '“30” of what?', 110, 620, FONT.black(92), C.ink, 'left', prog(t, T.w + .3, T.w + .7));
  }
}
