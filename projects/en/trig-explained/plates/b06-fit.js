// b06 · 120° không vừa tam giác · p2 câu 25–28. Cạnh huyền tự mở tới 120°, cạnh đứng không còn gặp.
import { must } from '../kit.js';
import { bg, ground, calculator } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, prog, ease, D2R } from './common.js';
const GY = 860, AX = 760, CX = 1200, HYP = 660;
export default class Fit {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b06', 25); this.START = START; this.FROM = FROM; this.T = { q: L(25).start, w0: L(26).start + 1.2, w1: L(26).end - 1.9, fit: w(26, 'fit'), calc: w(27, 'calculator') }; }
  sfx() { const T = this.T; return [cue(T.w0, 'whoosh'), cue(T.fit, 'error'), cue(T.calc, 'pop')]; }
  render(g, t) {
    const T = this.T; bg(g); ground(g, GY, 420, 1860); const th = 30 + 90 * ease(prog(t, T.w0, T.w1)), hx = AX + HYP * Math.cos(th * D2R), hy = GY - HYP * Math.sin(th * D2R), meet = th < 88 ? GY - (CX - AX) * Math.tan(th * D2R) : 260;
    seg(g, AX, GY, CX, GY, C.cos, 8); seg(g, CX, GY, CX, Math.max(100, meet), C.sin, 10); seg(g, AX, GY, hx, hy, C.ink, 8); g.strokeStyle = C.dim; g.lineWidth = 4; g.strokeRect(CX - 26, GY - 26, 26, 26);
    g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(AX, GY, 90, -th * D2R, 0); g.stroke(); txt(g, `${Math.round(th)}°`, AX + 130 * Math.cos(th / 2 * D2R) + 20, GY - 130 * Math.sin(th / 2 * D2R), FONT.head(46), th > 90 ? C.neg : C.ink);
    if (th > 90) txt(g, 'they never meet', CX + 30, 200, FONT.head(52), C.neg, 'left', prog(th, 92, 110)); txt(g, 'sin 120° = ?', 460, 120, FONT.black(72), C.sin, 'left', prog(t, T.q, T.q + .3));
    if (t > T.calc - .1) { calculator(g, 1570, 520, 'DEG', '0.866', C.sin, .9, prog(t, T.calc - .1, T.calc + .1), 'sin 120'); must(`Math.abs(Math.sin(120*${D2R})-0.866) < 0.0005`, true); }
  }
}
