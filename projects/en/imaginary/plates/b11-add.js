// b11 · 3 V + 4 V lệch ¼ chu kỳ: đỉnh 5 V, không phải 7. Mũi tên giải trong một phép cộng; rồi nơi dùng.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const X0 = 860, X1 = 1810, CY = 430, A = 38, CX = 330, Y = 700, U = 80;
export default class Add {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Here\'s why that'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { pk: at('What\'s the peak').start, arr: at('With arrows').start, sum: at('Add them').start, wo: at('Without').start, sc: at('Scale').start, ee: at('Electrical').start, rad: at('Radio').start, end: at('Radio').end };
    must('Math.hypot(3,4)', 5); must('3+4', 7); }
  sfx() { const T = this.T; return [cue(T.pk, 'question'), cue(T.pk + 3, 'error'), cue(T.arr + 1.2, 'whoosh'), cue(T.sum + .4, 'correct'), cue(T.wo, 'page'), cue(T.ee, 'card'), cue(T.rad, 'card')]; }
  render(g, t) {
    const T = this.T; bg(g); const f = x => (x - X0) / 80, th = t * 1.4;
    if (t < T.wo) { seg(g, X0, CY, X1, CY, C.dim, 3); const s = t > T.sum ? 1 - prog(t, T.sum, T.sum + .6) * .55 : 1; g.save(); g.globalAlpha = s; wave(g, X0, X1, CY, 3 * A, x => Math.sin(th - f(x)), C.cos, 6); wave(g, X0, X1, CY, 4 * A, x => Math.sin(th - f(x) - Math.PI / 2), C.sin, 6); g.restore();
      txt(g, '3 V', X0, 115, FONT.black(58), C.cos, 'left'); txt(g, '4 V, ¼ cycle behind', X0 + 130, 118, FONT.head(48), C.sin, 'left');
      if (t > T.pk) { const k = prog(t, T.pk + .3, T.pk + .6); txt(g, '3 + 4 = 7 ?', 330, 200, FONT.black(84), C.ink, 'center', k); strike(g, 110, 200, 550, prog(t, T.pk + 2.6, T.pk + 3)); }
      if (t > T.arr) { const k = prog(t, T.arr + 1.2, T.arr + 2); plane(g, CX, Y, U, 3, 4, { k: prog(t, T.arr, T.arr + .4), marks: false }); arrow(g, CX, Y, CX + 3 * U * Math.min(1, k * 2), Y, C.cos, 12, 34); txt(g, '3', CX + 120, Y + 44, FONT.black(52), C.cos); if (k > .5) { arrow(g, CX + 3 * U, Y, CX + 3 * U, Y - 4 * U * (k - .5) * 2, C.sin, 12, 34); txt(g, '4i', CX + 3 * U + 54, Y - 160, FONT.black(52), C.sin); } }
      if (t > T.sum) { const k = prog(t, T.sum + .1, T.sum + 1); arrow(g, CX, Y, CX + 3 * U * k, Y - 4 * U * k, I, 14, 38); if (k >= 1) txt(g, '5', CX + 80, Y - 190, FONT.black(72), I); wave(g, X0, X1, CY, 5 * A * prog(t, T.sum + .3, T.sum + 1.2), x => 0.6 * Math.sin(th - f(x)) + 0.8 * Math.sin(th - f(x) - Math.PI / 2), C.ink, 10); txt(g, 'peak = 5 V', 1340, 800, FONT.black(72), C.ink, 'center', prog(t, T.sum + 1, T.sum + 1.3)); }
      return; }
    if (t < T.sc) { const a = prog(t, T.wo, T.wo + .3); card(g, 110, 130, 840, 760, C.faint, a); for (let i = 0; i < 9; i++) txt(g, ['3 sin ωt + 4 sin(ωt − π/2)', '= 3 sin ωt − 4 cos ωt', '= R sin(ωt − φ)', '= R sin ωt cos φ − R cos ωt sin φ', 'R cos φ = 3', 'R sin φ = 4', 'R²(cos²φ + sin²φ) = 9 + 16', 'R² = 25', 'R = 5'][i], 530, 190 + i * 76, FONT.mono(32), C.dim, 'center', a); card(g, 1020, 340, 790, 300, I, prog(t, T.wo + 2, T.wo + 2.3)); txt(g, '|3 + 4i| = 5', 1415, 490, FONT.black(100), I, 'center', prog(t, T.wo + 2, T.wo + 2.3)); return; }
    if (t < T.ee) { const k = prog(t, T.sc + .2, T.sc + 1.4), Y2 = 500; seg(g, 240, Y2, 1680, Y2, C.ink, 7, k); [[560, 'coil'], [960, 'capacitor'], [1360, 'wave shifts']].forEach(([x, s], i) => { const a = prog(t, T.sc + .5 + i * .8, T.sc + .9 + i * .8); card(g, x - 150, Y2 - 90, 300, 180, i < 2 ? C.cos : C.sin, a); txt(g, s, x, Y2, FONT.head(i < 2 ? 54 : 42), C.ink, 'center', a); }); return; }
    if (t < T.rad) { const k = prog(t, T.ee, T.ee + .3); txt(g, 'engineers write', 960, 280, FONT.head(60), C.ink, 'center', k); txt(g, 'j', 960, 500, FONT.black(280), I, 'center', k); txt(g, 'because i already means current', 960, 760, FONT.head(56), C.dim, 'center', prog(t, T.ee + 2.4, T.ee + 2.7)); return; }
    ['radio', 'audio', 'quantum'].forEach((s, i) => { const x = 360 + i * 600, k = prog(t, T.rad + i * .9, T.rad + .35 + i * .9), r = (t * 2.2 + i), cy = 410; card(g, x - 270, 180, 540, 560, [C.cos, C.sin, I][i], k); if (k <= 0) return; g.save(); g.globalAlpha = k; g.strokeStyle = C.faint; g.lineWidth = 5; g.beginPath(); g.arc(x, cy, 130, 0, 7); g.stroke(); arrow(g, x, cy, x + 130 * Math.cos(r), cy - 130 * Math.sin(r), [C.cos, C.sin, I][i], 12, 34); g.restore(); txt(g, s, x, 640, FONT.black(70), C.ink, 'center', k); }); if (t > T.rad + 4) txt(g, 'things that oscillate are things that turn', 960, 860, FONT.black(58), C.ink, 'center', prog(t, T.rad + 4, T.rad + 4.3));
  }
}
