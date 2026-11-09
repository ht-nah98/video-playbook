// b08 · Quy tắc đầy đủ: độ dài nhân, góc cộng. (1 + i)² = 2i.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 560, CY = 800, U = 280;
export default class Rule {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'And it works'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { mul: at('When you multiply').start, take: at('Take one').start, sq: at('Square it').start, chk: at('Check with').start, end: at('Check with').end };
    must('Math.hypot(1,1)**2', 2.0000000000000004); must('1-1', 0); must('45+45', 90); }
  sfx() { const T = this.T; return [cue(T.mul, 'card'), cue(T.take, 'pop'), cue(T.sq, 'whoosh'), cue(T.sq + 2.4, 'correct'), cue(T.chk, 'tick'), cue(T.end - .6, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g); plane(g, CX, CY, U, 1.2, 2.3, { marks: true });
    const q = ease(prog(t, T.sq + .3, T.sq + 2.2)), len = t < T.take ? 1.3 : lerp(Math.SQRT2, 2, q), deg = t < T.take ? 30 : lerp(45, 90, q), r = deg * D2R, x = CX + U * len * Math.cos(r), y = CY - U * len * Math.sin(r);
    arrow(g, CX, CY, x, y, t > T.sq ? I : C.cos, 14, 42); turn(g, CX, CY, 110, 0, deg, C.a, 8); txt(g, Math.round(deg) + '°', CX + 180, CY - 50, FONT.mono(38), C.a);
    if (t < T.take) { txt(g, 'length + angle', x + 40, y - 40, FONT.head(54), C.cos, 'left'); }
    else if (q <= 0 || q >= 1) { txt(g, q < 1 ? '1 + i' : '2i', x + 60, y - 30, FONT.black(70), q < 1 ? C.cos : I, 'left'); }
    if (t > T.mul) { const k = prog(t, T.mul, T.mul + .3); card(g, 1020, 130, 800, 220, C.a, k); txt(g, 'lengths multiply', 1420, 195, FONT.black(62), C.ink, 'center', k); txt(g, 'angles add', 1420, 285, FONT.black(62), C.a, 'center', prog(t, T.mul + 1.2, T.mul + 1.5)); }
    if (t > T.sq) { const k = prog(t, T.sq + 2.2, T.sq + 2.5); txt(g, '45° + 45° = 90°', 1420, 450, FONT.head(62), C.ink, 'center', k); txt(g, '√2 × √2 = 2', 1420, 550, FONT.head(62), C.ink, 'center', k); }
    if (t > T.chk) { const k = prog(t, T.chk, T.chk + .3); card(g, 1020, 640, 800, 210, I, k); txt(g, '(1 + i)² = 1 + 2i + i²', 1420, 705, FONT.head(52), C.ink, 'center', k); txt(g, '= 2i  ✓', 1420, 790, FONT.black(72), I, 'center', prog(t, T.chk + 2.6, T.chk + 2.9)); }
  }
}
