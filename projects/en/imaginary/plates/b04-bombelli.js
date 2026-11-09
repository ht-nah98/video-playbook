// b04 · 1572 Bombelli tính tiếp: 2 + √−1 và 2 − √−1 cộng lại ra 4. Rồi tên gọi "imaginary".
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must, archive } from '../kit.js';
export default class Bombelli {
  static ERA = 'night'; static IMAGES = { geometrie: 'assets/history/geometrie.png' }; static POSES = [];
  init({ tl }) { const s = scene(tl, 'In fifteen seventy-two'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { rule: at('He treated').start, roots: at('The formula then').start, add: at('Now add').start, four: at('Four.').start, nob: at('So nobody').start, des: at('In sixteen').start, sym: at('The symbol').start, end: at('The symbol').end };
    must('(2+0)+(2+0)', 4); must('2^3-3*2', 2); must('3*4-1', 11); }
  sfx() { const T = this.T; return [cue(T.rule, 'card'), cue(T.roots + 2, 'card'), cue(T.add + 1, 'whoosh'), cue(T.four, 'correct'), cue(T.des + 1.5, 'impact'), cue(T.sym + 3, 'question')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.nob) { const k = prog(t, T.rule - 1.5, T.rule - 1.2); txt(g, '1572', 960, 120, FONT.black(90), C.a, 'center', 1); txt(g, 'Rafael Bombelli keeps calculating', 960, 215, FONT.head(56), C.ink, 'center', 1);
      if (t > T.rule) { const r = prog(t, T.rule, T.rule + .3); card(g, 560, 290, 800, 130, I, r); txt(g, '√−1 × √−1 = −1', 960, 355, FONT.black(64), I, 'center', r); }
      if (t > T.roots && t < T.add) txt(g, 'two cube roots', 960, 500, FONT.mono(44), C.dim, 'center', prog(t, T.roots + .6, T.roots + 1));
      if (t > T.roots) { const a = ease(prog(t, T.add + 1, T.add + 2.4)), c = prog(t, T.roots + 2, T.roots + 2.4), xl = lerp(560, 780, a), xr = lerp(1360, 1140, a); if (t < T.four) { txt(g, '2', xl - 100, 640, FONT.black(120), C.cos, 'center', c); txt(g, '2', xr - 100, 640, FONT.black(120), C.cos, 'center', c); const f = 1 - prog(t, T.add + 2.8, T.add + 3.4); txt(g, '+ √−1', xl + 90, 640, FONT.black(84), I, 'center', c * f); txt(g, '− √−1', xr + 90, 640, FONT.black(84), I, 'center', c * f); if (a <= 0) txt(g, '+', 960, 640, FONT.black(100), C.ink, 'center', c); if (f <= 0) txt(g, '+', 860, 640, FONT.black(100), C.ink, 'center'); }
        else { popped(g, 960, 650, prog(t, T.four, T.four + .3), () => txt(g, '4', 960, 650, FONT.black(300), C.b)); txt(g, 'the impossible part vanished', 960, 860, FONT.head(56), C.ink, 'center', prog(t, T.four + 1, T.four + 1.3)); } }
      return; }
    if (t < T.des) { txt(g, 'It kept giving correct results.', 960, 430, FONT.black(84), C.b, 'center', prog(t, T.nob, T.nob + .3)); txt(g, 'Nobody could say what it was.', 960, 570, FONT.black(84), C.neg, 'center', prog(t, T.nob + 2.4, T.nob + 2.7)); return; }
    if (t < T.sym) { archive(g, 'geometrie', 200, 100, 640, 780, prog(t, T.des, T.des + .35), prog(t, T.des, T.sym), { fy: .05, caption: 'La Géométrie, 1637' }); txt(g, 'René Descartes', 1360, 280, FONT.head(60), C.ink, 'center', prog(t, T.des, T.des + .3)); popped(g, 1360, 530, prog(t, T.des + 1.5, T.des + 1.8), () => { g.save(); g.translate(1360, 530); g.rotate(-.05); g.strokeStyle = I; g.lineWidth = 9; g.strokeRect(-370, -80, 740, 160); txt(g, 'IMAGINARY', 0, 4, FONT.black(112), I); g.restore(); }); txt(g, 'not a compliment', 1360, 730, FONT.mono(46), C.dim, 'center', prog(t, T.des + 3, T.des + 3.3)); return; }
    popped(g, 960, 420, prog(t, T.sym, T.sym + .3), () => txt(g, 'i', 960, 420, FONT.black(320), I)); txt(g, '= √−1', 1180, 440, FONT.black(90), C.ink, 'left', prog(t, T.sym + .6, T.sym + .9)); txt(g, 'A rule isn’t an explanation. What IS it?', 960, 740, FONT.head(62), C.ink, 'center', prog(t, T.sym + 3, T.sym + 3.3));
  }
}
