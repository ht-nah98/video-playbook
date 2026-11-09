// b07 · Mỗi điểm là một số. (3 + 2i)·i = −2 + 3i: đại số tự quay đúng một phần tư vòng.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 660, CY = 590, U = 110;
export default class Plane {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Once there'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { p: at('Three to the right').start, test: at('Now test').start, alg: at('Three times').start, get: at('You get').start, same: at('It').start };
    this.T.same = at('It\'s the same').start; this.T.end = at('It\'s the same').end; must('3*0-2*1', -2); must('3*1+2*0', 3); must('3*3+2*2', 13); must('(-2)*(-2)+3*3', 13); must('3*(-2)+2*3', 0); }
  sfx() { const T = this.T; return [cue(T.p, 'pop'), cue(T.test, 'card'), cue(T.alg, 'tick'), cue(T.get, 'correct'), cue(T.same, 'whoosh')]; }
  render(g, t) {
    const T = this.T; bg(g); plane(g, CX, CY, U, 4, 4, { k: prog(t, this.FROM, this.FROM + .5) });
    if (t < T.p) return; const k = ease(prog(t, T.p, T.p + 1)), [x, y] = xy(CX, CY, U, 3, 2);
    seg(g, CX, CY, x, CY, C.cos, 6, k, [12, 12]); seg(g, x, CY, x, y, I, 6, k, [12, 12]); arrow(g, CX, CY, CX + (x - CX) * k, CY + (y - CY) * k, C.cos, 12, 38); if (k >= 1) txt(g, '3 + 2i', x - 30, y - 56, FONT.black(62), C.cos);
    if (t > T.test) { const c = prog(t, T.test, T.test + .3); card(g, 1160, 150, 660, 500, C.faint, c); txt(g, '(3 + 2i) × i', 1490, 230, FONT.black(64), C.ink, 'center', c); if (t > T.alg) { txt(g, '= 3i + 2i²', 1490, 350, FONT.head(62), C.ink, 'center', prog(t, T.alg, T.alg + .3)); txt(g, 'i² = −1', 1490, 440, FONT.mono(38), I, 'center', prog(t, T.alg + 1.5, T.alg + 1.8)); } if (t > T.get) txt(g, '= −2 + 3i', 1490, 550, FONT.black(72), I, 'center', prog(t, T.get, T.get + .3)); }
    if (t > T.get + .5) { const [a, b] = xy(CX, CY, U, -2, 3), j = ease(prog(t, T.get + .6, T.get + 1.8)), d = Math.atan2(2, 3) / D2R; const R = Math.hypot(3, 2) * U, r = (d + 90 * j) * D2R; arrow(g, CX, CY, CX + R * Math.cos(r), CY - R * Math.sin(r), I, 12, 38); turn(g, CX, CY, 150, d, d + 90 * j, C.a, 8); if (j >= 1) txt(g, '−2 + 3i', a - 70, b - 42, FONT.black(62), I); }
    if (t > T.same) { const c = prog(t, T.same + .4, T.same + .7); card(g, 1160, 690, 660, 150, I, c); txt(g, 'same length, 90° turn', 1490, 765, FONT.head(52), C.ink, 'center', c); }
  }
}
