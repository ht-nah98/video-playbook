// b07 · Định nghĩa mới · p2 câu 29–38. Cạnh huyền = 1 → tam giác đứng vào đường tròn → M trượt → toạ độ.
import { must } from '../kit.js';
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, lerp, D2R, card } from './common.js';
const CX = 1150, CY = 540, R = 360;
export default class Circle {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b07', 29); this.START = START; this.FROM = FROM;
    this.T = { one: L(30).start, lab: L(31).start, stand: L(32).start, m: L(33).start, slide: L(34).start, read: L(35).start, def: L(36).start, same: L(37).start, stop: L(38).start, end: L(38).end }; }
  sfx() { const T = this.T; return [cue(T.one, 'card'), cue(T.stand, 'whoosh'), cue(T.m, 'pop'), cue(T.def, 'card'), cue(T.stop, 'tick')]; }
  th(t) { const T = this.T; let d = 40;
    d = lerp(d, 72, ease(prog(t, T.slide, T.slide + 1.6))); d = lerp(d, 25, ease(prog(t, T.slide + 1.7, T.slide + 3.2))); d = lerp(d, 40, ease(prog(t, T.slide + 3.3, T.read)));
    d = lerp(d, 30, ease(prog(t, T.same, T.same + .8))); d = lerp(d, 90, ease(prog(t, T.stop - .1, T.stop + 1.4))); return d; }
  render(g, t) {
    const T = this.T; bg(g); const d = this.th(t), th = d * D2R, ks = ease(prog(t, T.stand, T.stand + 1.2));
    // trước khi đứng vào: tam giác trái, sau đó tịnh tiến tới tâm
    const ox = lerp(360, CX, ks), oy = lerp(760, CY, ks), [mx, my] = onCircle(ox, oy, R, th);
    if (ks > 0) { g.save(); g.globalAlpha = ks; unit(g, CX, CY, R, { k: prog(t, T.stand + .1, T.stand + 1.3), axis: prog(t, T.stand, T.stand + .4) }); g.restore(); }
    seg(g, ox, oy, mx, oy, C.cos, 10); if (d < 89.5) seg(g, mx, oy, mx, my, C.sin, 10); seg(g, ox, oy, mx, my, C.ink, 8);
    if (t > T.one) { g.save(); g.translate((ox + mx) / 2 - 26, (oy + my) / 2 - 26); g.rotate(-th); txt(g, '1', 0, 0, FONT.black(60), C.ink, 'center', prog(t, T.one, T.one + .3) * (1 - prog(t, T.read, T.read + .3))); g.restore(); }
    if (t > T.lab && ks < .25) { txt(g, 'height = sine', mx + 26, (oy + my) / 2, FONT.head(50), C.sin, 'left', prog(t, T.lab, T.lab + .3)); txt(g, 'width = cosine', (ox + mx) / 2, oy + 54, FONT.head(50), C.cos, 'center', prog(t, T.lab + 2.2, T.lab + 2.5)); }
    if (t > T.m) { dot(g, mx, my, 18, C.ink); txt(g, 'M', mx + 48, my - 34, FONT.head(52), C.ink, 'center', prog(t, T.m, T.m + .2)); }
    if (t > T.read) { const c = Math.cos(th), s = Math.sin(th), k = prog(t, T.read, T.read + .3); card(g, 90, 285, 420, 345, C.faint, k);
      txt(g, 'across', 110, 330, FONT.mono(40), C.cos, 'left', k); txt(g, c.toFixed(3), 110, 396, FONT.black(84), C.cos, 'left', k); txt(g, 'up', 110, 510, FONT.mono(40), C.sin, 'left', k); txt(g, s.toFixed(3), 110, 576, FONT.black(84), C.sin, 'left', k); }
    if (t > T.def) { card(g, 90, 80, 560, 180, C.a, prog(t, T.def, T.def + .3)); txt(g, 'cos θ = across', 110, 130, FONT.black(58), C.cos, 'left', prog(t, T.def, T.def + .3)); txt(g, 'sin θ = up', 110, 205, FONT.black(58), C.sin, 'left', prog(t, T.def + .5, T.def + .8)); }
    if (t >= T.same + .8 && t < T.stop - .1) { must(`Math.abs(Math.sin(30*${D2R})-0.5) < 1e-9`, true); txt(g, '30°: same numbers as the triangle', 110, 700, FONT.mono(32), C.ink, 'left', prog(t, T.same + .8, T.same + 1.1)); }
  }
}
