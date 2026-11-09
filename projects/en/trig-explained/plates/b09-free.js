// b09 · Quà miễn phí · p2 câu 48–51. Pythagoras = M nằm trên vành; M chạy một vòng, tổng vẫn 1.
import { must } from '../kit.js';
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, D2R, card } from './common.js';
const CX = 1180, CY = 520, R = 360;
export default class Free {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b09', 48); this.START = START; this.FROM = FROM; this.T = { py: L(49).start, sq: L(50).start, run: L(51).start }; }
  sfx() { const T = this.T; return [cue(T.sq, 'card')]; }
  render(g, t) {
    const T = this.T; bg(g); unit(g, CX, CY, R); const d = 50 + 360 * ease(prog(t, T.run + .3, T.run + 4.6)), th = d * D2R, [mx, my] = onCircle(CX, CY, R, th), cs = Math.cos(th), sn = Math.sin(th);
    seg(g, mx, CY, mx, my, sn < 0 ? C.neg : C.sin, 10); seg(g, CX, CY, mx, CY, cs < 0 ? C.neg : C.cos, 10); seg(g, CX, CY, mx, my, C.ink, 6); dot(g, mx, my, 18, C.ink);
    card(g, 90, 140, 650, 290, C.sin, prog(t, T.py, T.py + .3)); txt(g, 'across² + up² = 1', 110, 190, FONT.mono(46), C.ink, 'left', prog(t, T.py, T.py + .3)); txt(g, 'sin²θ + cos²θ = 1', 110, 300, FONT.black(66), C.sin, 'left', prog(t, T.sq, T.sq + .3));
    if (t > T.run) { const v = sn * sn + cs * cs; must(`Math.abs(${v}-1) < 1e-9`, true); txt(g, `at ${Math.round(d) % 360}°:  ${v.toFixed(3)}`, 110, 385, FONT.mono(44), C.ink, 'left', prog(t, T.run, T.run + .3)); }
  }
}
