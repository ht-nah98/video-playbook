// b06 · Bốn phần tư vòng về nhà; i¹⁰⁰ = 1. Tên "imaginary" chỉ là một hướng.
import { scene, cue, C, FONT, bg, txt, seg, dot, card, prog, ease, lerp, D2R, I, arrow, line, plane, xy, turn, strike, wave, popped } from './common.js';
import { must } from '../kit.js';
const CX = 1180, CY = 530, R = 320, P = [['1', 0, C.cos], ['i', 90, I], ['−1', 180, C.neg], ['−i', 270, I]];
export default class Cycle {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const s = scene(tl, 'Keep multiplying'), { at, wd } = s; this.START = s.START; this.FROM = s.FROM; this.T = { one: at('One, then').start, oneE: at('One, then').end, q: at('So a question').start, name: at('The name').start, dir: at('Minus one isn').start, end: at('Minus one isn').end };
    must('100%4', 0); must('100/4', 25); }
  sfx() { const T = this.T, d = (T.oneE - T.one) * .62 / 4; return [0, 1, 2, 3].map(i => cue(T.one + .3 + i * d, 'tick')).concat([cue(T.q + 2.4, 'whoosh-long'), cue(T.name, 'page')]); }
  deg(t) { const T = this.T; if (t < T.q) { const d = (T.oneE - T.one) * .62 / 4; let a = 0; for (let i = 0; i < 4; i++) a += 90 * ease(prog(t, T.one + .3 + i * d, T.one + .3 + i * d + d * .7)); return a; } return 360 + 360 * 25 * ease(prog(t, T.q + 2.4, T.q + 5.2)); }
  render(g, t) {
    const T = this.T; bg(g);
    if (t > T.name) { const k = prog(t, T.name, T.name + .3); txt(g, 'imaginary', 960, 280, FONT.black(120), I, 'center', k); strike(g, 620, 280, 1300, prog(t, T.dir - 1.5, T.dir - 1)); if (t > T.dir) { const X = 960, Y = 750; seg(g, X - 480, Y, X + 480, Y, C.dim, 6); arrow(g, X, Y, X - 300, Y, C.neg, 14, 40); txt(g, '−1', X - 360, Y - 55, FONT.black(62), C.neg); arrow(g, X, Y, X, Y - 230, I, 14, 40); txt(g, 'i', X + 56, Y - 210, FONT.black(72), I); txt(g, 'just two directions', 1320, Y - 130, FONT.head(50), C.ink, 'left', prog(t, T.dir + 3, T.dir + 3.3)); } return; }
    const a = this.deg(t), r = a * D2R; g.strokeStyle = C.faint; g.lineWidth = 6; g.beginPath(); g.arc(CX, CY, R, 0, 7); g.stroke(); seg(g, CX - R - 40, CY, CX + R + 40, CY, C.dim, 3); seg(g, CX, CY - R - 40, CX, CY + R + 40, C.dim, 3);
    P.forEach(([s, d, c]) => { const x = CX + R * Math.cos(d * D2R), y = CY - R * Math.sin(d * D2R); dot(g, x, y, 18, c); txt(g, s, x + 96 * Math.cos(d * D2R), y - 72 * Math.sin(d * D2R), FONT.black(68), c); });
    arrow(g, CX, CY, CX + R * Math.cos(r), CY - R * Math.sin(r), I, 16, 46); txt(g, '× i', 340, 200, FONT.black(120), I);
    if (t < T.q) ['i¹ = i', 'i² = −1', 'i³ = −i', 'i⁴ = 1'].forEach((s, i) => { const d = (T.oneE - T.one) * .62 / 4; txt(g, s, 340, 360 + i * 100, FONT.head(64), C.ink, 'center', prog(t, T.one + .3 + i * d, T.one + .6 + i * d)); });
    else { const k = prog(t, T.q + .4, T.q + .7), laps = Math.min(25, Math.floor((a - 360) / 360 + 1e-6)); txt(g, 'i¹⁰⁰ = ?', 340, 360, FONT.black(90), C.ink, 'center', k); if (t > T.q + 2.4) txt(g, laps + ' / 25 circles', 340, 490, FONT.mono(44), C.dim); if (t > T.q + 5.2) txt(g, '= 1', 340, 620, FONT.black(130), C.b, 'center', prog(t, T.q + 5.2, T.q + 5.5)); }
  }
}
