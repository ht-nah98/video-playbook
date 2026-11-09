// b09 · Vì sao mẹo 1572 đúng: (2 ± i)³ = 2 ± 11i, cộng hai mũi tên đối xứng còn lại đúng 4 trên trục thực.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 720, CY = 540;
export default class Why {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'That rule finally'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { arr: at('Bombelli').start, mir: at('Its mirror').start, add: at('Now add the').start, why: at('That\'s why').start, end: at('That\'s why').end };
    must('Math.round(Math.atan2(1,2)*1800/Math.PI)', 266); must('Math.round(Math.atan2(11,2)*180/Math.PI)', 80); must('2^3-3*2*1', 2); must('3*4*1-1', 11); must('11*11', 121); }
  sfx() { const T = this.T; return [cue(T.arr, 'pop'), cue(T.arr + 3.4, 'whoosh'), cue(T.mir + .4, 'whoosh'), cue(T.add + 1.4, 'whoosh'), cue(T.add + 3.2, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g); const c = ease(prog(t, T.arr + 3.4, T.arr + 5.6)), U = lerp(150, 40, c); plane(g, CX, CY, U, Math.round(lerp(4, 12, c)), Math.round(lerp(3, 11, c)), { marks: false, k: prog(t, T.arr - .4, T.arr) });
    if (t < T.arr) { txt(g, 'So why did 1572 work?', 960, 500, FONT.black(96), C.ink, 'center', prog(t, this.START, this.START + .3)); return; } const a0 = Math.atan2(1, 2), L0 = Math.hypot(2, 1), p = 1 + 2 * c, L = Math.pow(L0, p), a = a0 * p; const [x, y] = [CX + U * L * Math.cos(a), CY - U * L * Math.sin(a)];
    const slide = ease(prog(t, T.add + 1.4, T.add + 3)); const my = ease(prog(t, T.mir + .2, T.mir + 1.4));
    if (slide < 1) { arrow(g, CX, CY, x, y, I, 12, 36); turn(g, CX, CY, c > 0 ? 70 : 110, 0, a / D2R, C.a, 7); txt(g, c < 1 ? '2 + i' : '2 + 11i', x + 26, y - 26, FONT.black(c < 1 ? 58 : 50), I, 'left'); }
    if (my > 0) { const X = CX + U * 2 + slide * U * 2 - U * 2 * (1 - slide) * 0; const sx = CX + slide * U * 2, sy = CY - slide * U * 11; arrow(g, sx, sy, sx + U * 2, sy + U * 11, C.cos, 12, 36); if (slide <= 0) txt(g, '2 − 11i', CX + U * 2 + 26, CY + U * 11 - 10, FONT.black(50), C.cos, 'left'); if (slide > 0) { g.globalAlpha = 1; arrow(g, CX, CY, x, y, I, 12, 36); } }
    if (slide >= 1) { seg(g, CX, CY, CX + U * 4, CY, C.b, 14); dot(g, CX + U * 4, CY, 20, C.b); txt(g, '4', CX + U * 4 + 20, CY + 64, FONT.black(100), C.b); }
    const k = prog(t, T.arr + .2, T.arr + .5); card(g, 1260, 150, 560, 340, C.faint, k); txt(g, 'angle of 2 + i', 1540, 205, FONT.mono(36), C.dim, 'center', k); txt(g, '≈ 26.6°', 1540, 275, FONT.black(70), C.a, 'center', k); if (c > .9) { txt(g, '× 3  ≈ 79.7°', 1540, 360, FONT.head(52), C.ink); txt(g, '(2 + i)³ = 2 + 11i', 1540, 435, FONT.head(44), I); }
    if (t > T.mir + 2.4) { const j = prog(t, T.mir + 2.4, T.mir + 2.7); card(g, 1260, 520, 560, 130, C.neg, j); txt(g, '11i = √−121', 1540, 585, FONT.black(62), C.neg, 'center', j); }
    if (t > T.why) { const j = prog(t, T.why + 2, T.why + 2.4); card(g, 1260, 690, 560, 190, C.b, j); txt(g, 'it left the line', 1540, 750, FONT.head(50), C.ink, 'center', j); txt(g, 'and came back', 1540, 820, FONT.head(50), C.ink, 'center', j); }
  }
}
