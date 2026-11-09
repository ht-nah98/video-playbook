// b03 · 1545, x³ = 15x + 4: có đáp án 4, nhưng công thức đòi √−121.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must, archive } from '../kit.js';
export default class Cardano {
  static ERA = 'night'; static IMAGES = { 'ars-magna': 'assets/history/ars-magna.jpg', cardano: 'assets/history/cardano.png' }; static POSES = [];
  init({ tl }) { const s = scene(tl, 'In fifteen forty-five'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { prob: at('But the formula').start, eq: at('Take x').start, chk: at('You can check').start, real: at('So there').start, feed: at('But feed').start, think: at('You might think').start, ex: at('But the answer').start, end: at('But the answer').end };
    must('4^3', 64); must('15*4+4', 64); must('2^2-5^3', -121); }
  sfx() { const T = this.T; return [cue(T.eq, 'card'), cue(T.chk + 2, 'tick'), cue(T.chk + 4, 'correct'), cue(T.feed + 3, 'error'), cue(T.ex, 'whoosh')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.eq - .2) { const u = prog(t, this.START, T.eq); archive(g, 'ars-magna', 1180, 90, 560, 800, prog(t, this.START, this.START + .4), u, { fy: .1, caption: 'Ars Magna, 1545. Title page.' }); archive(g, 'cardano', 420, 180, 400, 500, prog(t, this.START + .6, this.START + 1), u, { fy: .3 }); txt(g, '1545', 980, 300, FONT.black(100), C.a); txt(g, 'Gerolamo', 980, 410, FONT.head(50), C.ink); txt(g, 'Cardano', 980, 470, FONT.head(50), C.ink); return; }
    const up = ease(prog(t, T.feed, T.feed + .8)), y = lerp(290, 150, up); txt(g, 'x³ = 15x + 4', 960, y, FONT.black(lerp(130, 84, up)), C.ink, 'center', prog(t, T.eq, T.eq + .3));
    if (t < T.feed) { const k = prog(t, T.chk + 1, T.chk + 1.3), a = prog(t, T.chk + 2.2, T.chk + 2.5); card(g, 460, 440, 1000, 360, C.b, k); txt(g, 'try x = 4', 960, 500, FONT.mono(42), C.dim, 'center', k); txt(g, '4³ = 64', 960, 590, FONT.head(76), C.ink, 'center', k); txt(g, '15 × 4 + 4 = 64', 960, 700, FONT.head(76), C.ink, 'center', a); if (t > T.real) txt(g, '✓', 1370, 640, FONT.black(120), C.b, 'center', prog(t, T.real, T.real + .3)); return; }
    const k = prog(t, T.feed + .6, T.feed + 1), p = prog(t, T.feed + 2.8, T.feed + 3.1); card(g, 150, 250, 1620, 200, C.faint, k); { const P = [['x = ∛(2 + ', 0], ['√−121', 1], [') + ∛(2 − ', 0], ['√−121', 1], [')', 0]], f = q => q && p > 0 ? FONT.black(72) : FONT.head(70); let W = 0; for (const [s, q] of P) { g.font = f(q); W += g.measureText(s).width; } let x = 960 - W / 2; for (const [s, q] of P) { g.font = f(q); const d = g.measureText(s).width; txt(g, s, x, 350, f(q), q && p > 0 ? C.neg : C.ink, 'left', k); x += d; } }
    if (t > T.think) { txt(g, '“The formula doesn’t apply here”', 960, 530, FONT.head(56), C.dim, 'center', prog(t, T.think, T.think + .3)); if (t > T.ex) strike(g, 480, 530, 1440, prog(t, T.ex, T.ex + .4)); }
    if (t > T.ex) { const r = prog(t, T.ex + .6, T.ex + 2), Y = 760; seg(g, 360, Y, 1560, Y, C.dim, 8, r); txt(g, 'x³ = 15x + 4', 360, Y - 70, FONT.head(44), C.ink, 'center', prog(t, T.ex + .6, T.ex + .9)); if (r > .5) { card(g, 860, Y - 70, 200, 140, C.neg); txt(g, '√−121', 960, Y, FONT.head(46), C.neg); } if (r >= 1) { dot(g, 1560, Y, 22, C.b); txt(g, '4', 1560, Y - 80, FONT.black(100), C.b); } }
  }
}
