// b05 · Cảnh chữ ký: lật = quay nửa vòng; dừng giữa chừng = i. Trả lời câu mở bài.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must, archive } from '../kit.js';
const CX = 960, CY = 560, U = 138;
export default class Turn {
  static ERA = 'night'; static IMAGES = { argand: 'assets/history/argand.png' }; static POSES = [];
  init({ tl }) { const s = scene(tl, 'The answer turned up'), { at } = s; this.START = s.START; this.FROM = s.FROM; this.T = { leave: at("And it's almost").start, look: at('Look at that').start, rot: at('Rotate').start, mid: at('The result').start, stop: at('Stop halfway').start, your: at('There').start, so: at('So the square').start, ans: at('Now we can').start, ans2: at('Turn from').start, end: at('Turn from').end };
    must('Math.round(Math.cos(Math.PI/2)*1e9)', 0); }
  sfx() { const T = this.T; return [cue(T.look, 'tick'), cue(T.rot, 'whoosh-long'), cue(T.stop + .4, 'whoosh'), cue(T.stop + 2, 'impact'), cue(T.your + 1, 'whoosh'), cue(T.so + 2, 'correct'), cue(T.ans2, 'whoosh')]; }
  th(t) { const T = this.T; let d = 0; d = lerp(d, 180, ease(prog(t, T.rot + .2, T.rot + 2.4))); d = lerp(d, 0, ease(prog(t, T.mid + .1, T.mid + 1.2))); d = lerp(d, 90, ease(prog(t, T.stop + .4, T.stop + 2))); if (t > T.your + .2) { d = 90; d = lerp(90, 180, ease(prog(t, T.your + 1, T.your + 2.4))); d = lerp(d, 90, ease(prog(t, T.so - .4, T.so + .4))); } return d; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.look) { if (t < T.leave + .4) { archive(g, 'argand', 640, 120, 1040, 760, prog(t, this.START, this.START + .4), prog(t, this.START, T.leave + .4), { fx: 1, fy: .25, zoom: .16, caption: 'Argand, essay on imaginary quantities, 1806' }); txt(g, 'around 1800', 340, 330, FONT.black(62), C.a); txt(g, 'Caspar Wessel', 340, 430, FONT.head(44), C.ink); txt(g, 'Jean-Robert Argand', 340, 490, FONT.head(44), C.ink); return; } line(g, CX, 620, U, 5, { labels: false }); seg(g, CX, 620, CX, 330, I, 6, prog(t, T.leave + .6, T.leave + 1.6), [14, 14]); txt(g, 'stop staying on the line', 960, 800, FONT.black(64), I, 'center', prog(t, T.leave + 1, T.leave + 1.4)); return; }
    if (t < T.ans) { const d = this.th(t), r = d * D2R; line(g, CX, CY, U, 3, { labels: false, a: .35 });
      if (t < T.rot) { const k = ease(prog(t, T.look + 1.5, T.look + 3)), v = 1 - 2 * k; dot(g, CX + v * U, CY, 22, C.cos); dot(g, CX - v * U, CY, 22, C.neg); dot(g, CX + 3 * v * U, CY, 22, C.cos); dot(g, CX - 3 * v * U, CY, 22, C.neg); txt(g, 'the flip', 960, 200, FONT.black(90), C.neg); return; }
      line(g, CX, CY, U, 3, { th: r, labels: false, col: C.ink }); [[1, t > T.stop ? I : C.cos], [3, C.cos], [-1, C.neg], [-3, C.neg]].forEach(([p, c]) => { dot(g, CX + p * U * Math.cos(r), CY - p * U * Math.sin(r), 20, c); });
      arrow(g, CX, CY, CX + U * Math.cos(r), CY - U * Math.sin(r), t > T.stop ? I : C.cos, 16, 44); turn(g, CX, CY, U * .6, 0, d, C.a, 8);
      if (t < T.stop) { if (t < T.mid) txt(g, 'half a turn', 110, 210, FONT.black(90), C.ink, 'left'); else { txt(g, 'Same result.', 110, 190, FONT.black(66), C.ink, 'left'); txt(g, 'Now it has a middle.', 110, 275, FONT.black(66), C.a, 'left'); } }
      else { if (t < T.your) { txt(g, 'a quarter turn', 110, 210, FONT.black(84), I, 'left', prog(t, T.stop + 1.8, T.stop + 2.1)); }
        if (t > T.stop + 2) { const top = t < T.your + .9 || t > T.so; if (top) txt(g, 'i', CX + 56, CY - U - 10, FONT.black(90), I); }
        if (t > T.your) { card(g, 1230, 150, 590, 170, C.a, prog(t, T.your, T.your + .3)); txt(g, '¼ turn + ¼ turn = ½ turn', 1525, 200, FONT.head(42), C.ink, 'center', prog(t, T.your, T.your + .3)); txt(g, 'i × i = −1', 1525, 265, FONT.black(62), I, 'center', prog(t, T.your + 2.2, T.your + 2.5)); }
        if (t > T.so + .4) { card(g, 110, 330, 500, 230, I, prog(t, T.so + .4, T.so + .7)); txt(g, '√−1 = i', 360, 400, FONT.black(78), I, 'center', prog(t, T.so + .4, T.so + .7)); txt(g, 'one quarter turn', 360, 490, FONT.head(42), C.ink, 'center', prog(t, T.so + 2, T.so + 2.3)); } }
      return; }
    // câu mở bài, hai đường đi
    const A = 400; seg(g, CX - A, 620, CX + A, 620, C.dim, 6); txt(g, '1', CX + A, 690, FONT.black(70), C.cos); txt(g, '−1', CX - A, 690, FONT.black(70), C.neg); dot(g, CX + A, 620, 20, C.cos); dot(g, CX - A, 620, 20, C.neg); const k = ease(prog(t, T.ans + 2.4, T.ans + 4)); seg(g, CX + A, 620, CX - A, 620, C.ink, 10, k); if (k >= 1) { dot(g, CX, 620, 18, C.ink); txt(g, '0', CX, 690, FONT.black(70), C.ink); txt(g, 'walking', 1440, 620, FONT.mono(38), C.ink, 'left'); }
    if (t > T.ans2) { const a = ease(prog(t, T.ans2 + .2, T.ans2 + 1.8)); turn(g, CX, 620, A, 0, 180 * a, I, 10); if (a > .5) { dot(g, CX, 220, 20, I); txt(g, 'i', CX, 150, FONT.black(90), I); } txt(g, 'turning', 1300, 300, FONT.mono(38), I, 'left', prog(t, T.ans2 + 1, T.ans2 + 1.3)); const b = prog(t, T.ans2 + 2.8, T.ans2 + 4); if (b > 0) { g.save(); g.setLineDash([14, 14]); g.strokeStyle = I; g.lineWidth = 6; g.beginPath(); g.arc(CX, 620, A * .78, 0, Math.PI * b); g.stroke(); g.restore(); if (b > .5) { dot(g, CX, 620 + A * .78, 16, I); txt(g, '−i', CX + 100, 620 + A * .78 + 44, FONT.black(62), I); } } }
  }
}
