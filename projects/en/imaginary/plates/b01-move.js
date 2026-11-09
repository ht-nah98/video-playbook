// b01 · Nhân là một chuyển động: ×2 kéo dài, ×(−1) lật qua 0.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 960, CY = 560, U = 118, PTS = [-2, -1, 1, 3, 5];
export default class Move {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Draw the number line'), { at, wd } = s; this.START = s.START; this.FROM = s.START - .5; this.T = { x2: wd('Now multiply', 'two'), land: wd('Now multiply', 'three'), so: at('So multiplying').start, q: at('What move').start, go: at('Three goes').start, sw: at('Everything').start, tw: at('And flip').start, end: at('And flip').end };
    must('3*2', 6); must('-1*2', -2); must('-1*-1', 1); }
  sfx() { const T = this.T; return [cue(T.x2, 'whoosh'), cue(T.q, 'question'), cue(T.go, 'whoosh'), cue(T.tw, 'whoosh'), cue(T.tw + 2.2, 'correct')]; }
  m(t) { const T = this.T; let v = 1; v = lerp(v, 2, ease(prog(t, T.x2, T.x2 + 1.3))); v = lerp(v, 1, ease(prog(t, T.q - .6, T.q))); v = lerp(v, -1, ease(prog(t, T.go, T.go + 1.3))); v = lerp(v, 1, ease(prog(t, T.tw + .6, T.tw + 1.9))); return v; }
  render(g, t) {
    const T = this.T, v = this.m(t); bg(g); line(g, CX, CY, U, 7, { labels: true });
    PTS.forEach(p => { const x = CX + p * v * U, c = p < 0 ? C.neg : C.cos; dot(g, x, CY, 18, c); });
    arrow(g, CX, CY - 80, CX + 3 * v * U, CY - 80, C.cos, 12, 36); arrow(g, CX, CY - 140, CX - v * U, CY - 140, C.neg, 12, 36); if (Math.abs(v * 2 - Math.round(v * 2)) < .02 && Math.abs(v) >= .98) { txt(g, String(Math.round(3 * v)).replace('-', '−'), CX + 3 * v * U + 44 * Math.sign(v), CY - 80, FONT.black(52), C.cos); txt(g, String(Math.round(-v)).replace('-', '−'), CX - v * U - 44 * Math.sign(v), CY - 140, FONT.black(52), C.neg); }
    const f = t < T.q - .3 ? ['× 2', C.ink, 'a stretch'] : t < T.tw + .3 ? ['× (−1)', C.neg, 'a flip through zero'] : ['× (−1)  × (−1)', C.neg, 'back where you started'];
    if (t > T.x2 - .2) { const k = prog(t, t < T.q - .3 ? T.x2 - .2 : t < T.tw + .3 ? T.q - .2 : T.tw, (t < T.q - .3 ? T.x2 - .2 : t < T.tw + .3 ? T.q - .2 : T.tw) + .25); txt(g, f[0], 960, 190, FONT.black(110), f[1], 'center', k); }
    if (t > T.so) txt(g, f[2], 960, 300, FONT.head(62), C.ink, 'center', prog(t, Math.max(T.so, t < T.q - .3 ? T.so : t < T.tw + .3 ? T.sw : T.tw + 1), Math.max(T.so, t < T.q - .3 ? T.so : t < T.tw + .3 ? T.sw : T.tw + 1) + .3));
    if (t > T.tw + 2.2) { card(g, 640, 700, 640, 170, C.b, prog(t, T.tw + 2.2, T.tw + 2.5)); txt(g, '(−) × (−) = (+)', 960, 785, FONT.black(72), C.b, 'center', prog(t, T.tw + 2.2, T.tw + 2.5)); }
  }
}
