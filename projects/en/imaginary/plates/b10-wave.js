// b10 · Sóng là bóng của mũi tên quay.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must, archive } from '../kit.js';
const CX = 400, CY = 500, R = 230, X0 = 760, X1 = 1810;
export default class Wave {
  static ERA = 'night'; static IMAGES = { tower: 'assets/history/tower.jpg', scope: 'assets/history/scope.jpg' }; static POSES = [];
  init({ tl }) { const s = scene(tl, 'So why does the power'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { el: at('The electricity').start, arr: at('Picture').start, so: at('So every').start, end: at('So every').end }; }
  sfx() { const T = this.T; return [cue(T.el, 'whoosh'), cue(T.arr, 'pop'), cue(T.so, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g); const th = (t - T.el) * 2.2, h = prog(t, T.arr, T.arr + .5), f = x => Math.sin(th - (x - X0) / 75);
    if (t < T.el) { archive(g, 'tower', 960 - 620, 90, 1240, 650, prog(t, this.FROM + .2, this.FROM + .6), prog(t, this.FROM, T.el), { fy: .35 }); txt(g, 'Why would a power grid care?', 960, 860, FONT.black(72), C.ink, 'center', prog(t, this.FROM + .4, this.FROM + .8)); return; }
    if (t < T.arr) archive(g, 'scope', 110, 330, 610, 330, prog(t, T.el, T.el + .3) , prog(t, T.el, T.arr), { fx: 0, fy: 0, zoom: .1, caption: 'Real waves on an oscilloscope' }); seg(g, X0, CY, X1, CY, C.dim, 3); wave(g, X0, X1, CY, R, f, C.sin, 9); if (t < T.arr) txt(g, 'mains: 50 or 60 cycles a second', 1285, 830, FONT.head(52), C.ink, 'center', prog(t, T.el + 2, T.el + 2.4));
    if (h > 0) { g.save(); g.globalAlpha = h; g.strokeStyle = C.faint; g.lineWidth = 6; g.beginPath(); g.arc(CX, CY, R, 0, 7); g.stroke(); seg(g, CX - R - 30, CY, CX + R + 30, CY, C.dim, 3); const mx = CX + R * Math.cos(th), my = CY - R * Math.sin(th); arrow(g, CX, CY, mx, my, I, 14, 42); seg(g, mx, CY, mx, my, C.sin, 10); seg(g, mx, my, X0, my, C.dim, 3, 1, [12, 12]); dot(g, X0, my, 14, C.sin); g.restore(); }
    if (t > T.so) txt(g, 'the height of a turning arrow', 1285, 830, FONT.black(58), C.sin, 'center', prog(t, T.so, T.so + .3));
  }
}
