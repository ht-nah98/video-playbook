// b09c · Tan = độ dốc · p2 câu 55–57. Đường từ tâm dốc dần, 90° đứng thẳng: không có độ dốc.
import { bg, unit, onCircle, calculator } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, lerp, D2R, card } from './common.js';
const CX = 1180, CY = 520, R = 360;
export default class Slope {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b09c', 55); this.START = START; this.FROM = FROM; this.T = { tan: L(55).start, tn: w(55, 'slope'), nin: L(56).start, ok: L(57).start }; }
  sfx() { const T = this.T; return [cue(T.tan, 'whoosh'), cue(T.nin + 2, 'error'), cue(T.ok, 'beep')]; }
  render(g, t) {
    const T = this.T; bg(g); unit(g, CX, CY, R); const d = lerp(40, 90, ease(prog(t, T.tan + .4, T.nin + 1.8))), th = d * D2R, [mx, my] = onCircle(CX, CY, R, th), far = 480;
    seg(g, CX, CY, CX + far * Math.cos(th), CY - far * Math.sin(th), C.tan, 8); if (d < 89.5) seg(g, mx, CY, mx, my, C.sin, 8); seg(g, CX, CY, mx, CY, C.cos, 8); dot(g, mx, my, 18, C.ink);
    card(g, 90, 140, 650, 290, C.tan, prog(t, T.tan + .5, T.tan + .9)); txt(g, 'tan θ = up ÷ across', 110, 190, FONT.black(56), C.tan, 'left', prog(t, T.tan + .6, T.tan + 1)); txt(g, 'the slope of this line', 110, 262, FONT.mono(36), C.ink, 'left', prog(t, T.tn, T.tn + .3));
    const none = d >= 89.5; txt(g, none ? 'no slope' : Math.tan(th).toFixed(2), 110, 360, FONT.black(84), none ? C.neg : C.tan, 'left'); if (t > T.ok - .2) calculator(g, 380, 690, 'DEG', 'ERROR', C.neg, .8, prog(t, T.ok - .2, T.ok), 'tan 90');
  }
}
