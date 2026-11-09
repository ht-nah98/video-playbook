// b02 · Không có phép nào làm hai lần mà ra lật. Mũi tên thật chạy qua hai lần nhân.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 960, CY = 620, U = 150;
export default class None {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Now here'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { q: at('Is there a number').start, mv: at('In other words').start, pos: at('Try it').start, posE: at('Try it').end, neg: at('A negative number').start, res: at('Either way').start, long: at('For a long').start, eq: at('And it would').start, end: at('And it would').end };
    must('(-1)*(-1)', 1); }
  sfx() { const T = this.T; return [cue(T.q, 'question'), cue(T.pos + 1.5, 'whoosh'), cue(T.pos + 3, 'whoosh'), cue(T.neg + .5, 'whoosh'), cue(T.neg + 2, 'whoosh'), cue(T.res + 1.5, 'error')]; }
  v(t) { const T = this.T; if (t < T.neg) { let v = 1; v = lerp(v, 2, ease(prog(t, T.pos + 1.5, T.pos + 2.5))); v = lerp(v, 4, ease(prog(t, T.pos + 3, T.pos + 4))); return v; } let v = 1; v = lerp(v, -1, ease(prog(t, T.neg + .5, T.neg + 1.5))); v = lerp(v, 1, ease(prog(t, T.neg + 2, T.neg + 3))); return v; }
  render(g, t) {
    const T = this.T; bg(g); const k = prog(t, this.START, this.START + .3);
    txt(g, '?  ×  ?  =  −1', 960, 210, FONT.black(120), C.ink, 'center', k);
    if (t > T.mv && t < T.pos) txt(g, 'a move that, done twice, is a flip', 960, 350, FONT.head(62), C.neg, 'center', prog(t, T.mv, T.mv + .3));
    if (t > T.pos - .3) { line(g, CX, CY, U, 5); const v = this.v(t), goal = t > T.pos; if (goal) { g.strokeStyle = C.neg; g.lineWidth = 7; g.beginPath(); g.arc(CX - U, CY, 36, 0, 7); g.stroke(); txt(g, 'target', CX - U, CY - 72, FONT.mono(34), C.neg); }
      if (t < T.res + .4) arrow(g, CX, CY, CX + v * U, CY, t < T.neg ? C.cos : C.neg, 14, 40);
      txt(g, t < T.neg ? 'a positive number: stays on its side' : 'a negative number: swaps, then swaps back', 960, 400, FONT.head(56), t < T.neg ? C.cos : C.neg, 'center', t < T.res ? 1 : 1 - prog(t, T.res, T.res + .2));
      if (t > T.res + .2) { const c = prog(t, T.res + 1.5, T.res + 1.8); seg(g, CX - U - 46, CY - 46, CX - U + 46, CY + 46, C.neg, 12, c); seg(g, CX - U + 46, CY - 46, CX - U - 46, CY + 46, C.neg, 12, c); txt(g, 'no number on this line squares to −1', 960, 400, FONT.head(56), C.ink, 'center', prog(t, T.res + .2, T.res + .5)); } }
    if (t > T.long) { card(g, 560, 760, 800, 150, C.neg, prog(t, T.long, T.long + .3)); txt(g, t < T.eq ? '√−1 : a badly posed question' : 'unless an equation forced it…', 960, 835, FONT.head(52), C.ink, 'center', prog(t, T.long, T.long + .3)); }
  }
}
