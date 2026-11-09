// b12 · Tóm tắt, bài thử bằng bút, biển kênh. Không dẫn sang video khác.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 1220, CY = 520, U = 135, PT = [[2, 1], [-1, 2], [-2, -1], [1, -2]];
export default class Sum {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Why was anyone'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { a: at('Why was anyone').start, b: at('What is it').start, c: at('Why is it useful').start, tr: at('So try').start, plot: at('Then plot').start, end: at('Thanks').start, last: at('Thanks').end };
    must('2*0-1*1', -1); must('2*1+1*0', 2); }
  sfx() { const T = this.T; return [cue(T.a, 'card'), cue(T.b, 'card'), cue(T.c, 'card'), cue(T.tr, 'pen'), cue(T.plot + 1.4, 'tick'), cue(T.plot + 2.6, 'tick'), cue(T.plot + 3.8, 'tick'), cue(T.end, 'card')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.tr - .3) { [['forced', 'a true answer, 4,', 'went through √−1', T.a, C.neg], ['what', 'a quarter turn;', 'one step above 0', T.b, I], ['useful', 'multiplying rotates;', 'waves are rotations', T.c, C.sin]].forEach(([h, a, b, s, c], i) => { const x = 350 + i * 610, k = prog(t, s, s + .4); card(g, x - 280, 230, 560, 520, c, k); txt(g, h, x, 340, FONT.black(78), c, 'center', k); txt(g, a, x, 490, FONT.head(44), C.ink, 'center', k); txt(g, b, x, 570, FONT.head(44), C.ink, 'center', k); }); return; }
    if (t < T.end - .2) { plane(g, CX, CY, U, 3, 3); const n = t < T.plot ? 1 : 1 + Math.floor(Math.max(0, (t - T.plot - .2)) / 1.2); PT.slice(0, Math.min(4, n)).forEach(([re, im], i) => { const [x, y] = xy(CX, CY, U, re, im); if (i > 0) { const [a, b] = xy(CX, CY, U, PT[i - 1][0], PT[i - 1][1]); seg(g, a, b, x, y, C.a, 5, 1, [14, 12]); } dot(g, x, y, 18, i ? I : C.cos); }); if (n >= 5) { const [a, b] = xy(CX, CY, U, 1, -2), [c, d] = xy(CX, CY, U, 2, 1); seg(g, a, b, c, d, C.a, 5, 1, [14, 12]); }
      const k = prog(t, T.tr, T.tr + .3); card(g, 260, 130, 440, 450, C.a, k); ['2 + i', '× i = −1 + 2i', '× i = −2 − i', '× i = 1 − 2i', '× i = 2 + i'].forEach((s, i) => txt(g, s, 285, 200 + i * 78, FONT.mono(36), i ? I : C.cos, 'left', i === 0 ? k : prog(t, T.tr + 1.6 + i * .5, T.tr + 1.9 + i * .5))); return; }
    txt(g, '99% from scratch', 960, 430, FONT.black(120), C.ink, 'center', prog(t, T.end, T.end + .3)); g.fillStyle = C.neg; g.globalAlpha = prog(t, T.end + .5, T.end + .8); g.beginPath(); g.roundRect(760, 560, 400, 100, 16); g.fill(); g.globalAlpha = 1; txt(g, 'SUBSCRIBE', 960, 610, FONT.head(50), '#FFF', 'center', prog(t, T.end + .5, T.end + .8));
  }
}
