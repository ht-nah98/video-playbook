// b09b · Góc đặc biệt đọc trên đường tròn · p2 câu 52–54. 30 → 60 (đổi chỗ across/up) → 45 (bằng nhau).
import { must } from '../kit.js';
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, lerp, D2R, card } from './common.js';
const CX = 1180, CY = 520, R = 360, ROWS = [['30°', '0.866', '0.5'], ['60°', '0.5', '0.866'], ['45°', '√2/2', '√2/2']];
export default class Famous {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b09b', 52); this.START = START; this.FROM = FROM; this.T = { a: L(53).start, sixty: w(53, 'sixty'), f: L(54).start, end: L(54).end };
    must(`Math.abs(Math.sin(60*${D2R})-0.866) < 0.0005`, true); must(`Math.abs(Math.cos(60*${D2R})-0.5) < 1e-9`, true); must(`Math.abs(Math.sin(45*${D2R})-Math.SQRT2/2) < 1e-12`, true); }
  sfx() { const T = this.T; return [cue(T.a, 'tick'), cue(T.sixty, 'tick'), cue(T.f, 'tick')]; }
  render(g, t) {
    const T = this.T; bg(g); unit(g, CX, CY, R); let d = lerp(50, 30, ease(prog(t, T.a - .6, T.a))); d = lerp(d, 60, ease(prog(t, T.sixty, T.sixty + .8))); d = lerp(d, 45, ease(prog(t, T.f, T.f + .8)));
    const th = d * D2R, [mx, my] = onCircle(CX, CY, R, th); seg(g, mx, CY, mx, my, C.sin, 10); seg(g, CX, CY, mx, CY, C.cos, 10); seg(g, CX, CY, mx, my, C.dim, 3); dot(g, mx, my, 18, C.ink);
    if (t > T.sixty) { const [gx, gy] = onCircle(CX, CY, R, 30 * D2R); g.save(); g.globalAlpha = t > T.f ? .3 : .55; dot(g, gx, gy, 12, C.dim); g.restore(); seg(g, CX, CY, CX + R * Math.SQRT1_2, CY - R * Math.SQRT1_2, C.faint, 3, 1, [12, 12]); }
    card(g, 90, 150, 640, 460, C.faint, prog(t, T.a, T.a + .3)); const hk = prog(t, T.a, T.a + .3); txt(g, 'angle', 120, 205, FONT.mono(34), C.dim, 'left', hk); txt(g, 'across', 380, 205, FONT.mono(34), C.cos, 'center', hk); txt(g, 'up', 610, 205, FONT.mono(34), C.sin, 'center', hk);
    ROWS.forEach(([a, c, s], i) => { const k = prog(t, [T.a, T.sixty, T.f][i], [T.a, T.sixty, T.f][i] + .3), y = 300 + i * 115; txt(g, a, 120, y, FONT.head(58), C.ink, 'left', k); txt(g, c, 380, y, FONT.mono(50), C.cos, 'center', k); txt(g, s, 610, y, FONT.mono(50), C.sin, 'center', k); });
  }
}
