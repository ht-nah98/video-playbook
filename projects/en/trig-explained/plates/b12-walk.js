// b12 · Giải đáp (signature) · p2 câu 72–84. DEG 30 = 1/12 vòng; RAD 30 = M tự đi 30 đơn vị: 4 vòng về chỗ cũ, dư 4.87, dừng gần đáy, −0.988.
import { must } from '../kit.js';
import { bg, unit, onCircle, calculator } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, lerp, D2R, card } from './common.js';
const CX = 1180, CY = 520, R = 340, TURN4 = 8 * Math.PI, END = 30;
export default class Walk {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b12', 72); this.START = START; this.FROM = FROM;
    this.T = { back: L(72).start, deg: L(73).start, rad: L(74).start, walk: L(75).start, a0: L(75).start + .6, four: L(76).start, a1: L(77).end, left: L(78).start, b0: L(79).start, b1: L(79).end - .2, bot: L(80).start, h: L(81).start, same: L(82).start, conf: L(83).start, chk: L(84).start, end: L(84).end };
    must(`Math.abs(${END}-${TURN4}-4.87) < 0.01`, true); must(`Math.abs(Math.sin(30)+0.988) < 0.0005`, true); }
  sfx() { const T = this.T, c = [cue(T.deg, 'pop'), cue(T.rad, 'pop'), cue(T.a0, 'whoosh'), cue(T.h, 'impact'), cue(T.chk, 'tick')]; for (let k = 1; k <= 4; k++) c.push(cue(this.tTurn(k), 'tick')); return c; }
  thetaAt(t) { const T = this.T; if (t < T.a0) return 0; if (t < T.a1) return TURN4 * ease(prog(t, T.a0, T.a1)); if (t < T.b0) return TURN4; return lerp(TURN4, END, ease(prog(t, T.b0, T.b1))); }
  tTurn(k) { const T = this.T; let a = T.a0, b = T.a1, v = k * 2 * Math.PI; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (this.thetaAt(m) < v) a = m; else b = m; } return a; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.walk - .4) { calculator(g, 420, 240, 'DEG', '0.5', C.sin, .9, prog(t, T.back, T.back + .3)); calculator(g, 420, 620, 'RAD', '−0.988', C.neg, .9, prog(t, T.rad, T.rad + .3)); unit(g, CX, CY, R); const degOn = t < T.rad, [mx, my] = onCircle(CX, CY, R, 30 * D2R);
      if (degOn && t > T.deg) { g.strokeStyle = C.sin; g.lineWidth = 12; g.beginPath(); g.arc(CX, CY, R, 0, -30 * D2R, true); g.stroke(); seg(g, mx, CY, mx, my, C.sin, 9); dot(g, mx, my, 16, C.ink); txt(g, '1/12 of a turn', CX, CY + R + 70, FONT.mono(40), C.ink); }
      if (!degOn) { txt(g, 'walk 30 units', CX, CY + R + 70, FONT.head(64), C.cos, 'center', prog(t, T.rad + 2, T.rad + 2.4)); dot(g, CX + R, CY, 16, C.ink); } return; }
    unit(g, CX, CY, R); const th = this.thetaAt(t), [mx, my] = onCircle(CX, CY, R, th), turns = Math.floor((th + 1e-6) / (2 * Math.PI)), tail = Math.min(th, 1.5);
    g.strokeStyle = C.sin; g.lineWidth = 12; g.lineCap = 'round'; if (tail > 0 && t < T.h - .1) { g.beginPath(); g.arc(CX, CY, R, -th, -th + tail); g.stroke(); }
    card(g, 90, 110, 560, 180, C.faint); txt(g, `walked  ${th.toFixed(1)}`, 110, 170, FONT.mono(52), C.ink, 'left'); txt(g, `full turns  ${turns}`, 110, 240, FONT.mono(52), C.cos, 'left');
    if (t > T.four + 3 && t < T.h) txt(g, 'whole turns change nothing', 110, 330, FONT.mono(34), C.dim, 'left', prog(t, T.four + 3, T.four + 3.3));
    if (t > T.left && t < T.b0 + .3) txt(g, '4.87 left', 110, 430, FONT.black(84), C.sin, 'left', prog(t, T.left, T.left + .3)); if (t > T.bot - 3) txt(g, 'nearly 279°', 110, 430, FONT.black(64), C.ink, 'left', prog(t, T.bot - 3, T.bot - 2.7));
    if (t > T.h) { const k = prog(t, T.h, T.h + .3), s = t < T.h + .5 ? 1 + .15 * (1 - k) : 1; seg(g, mx, CY, mx, my, C.neg, 10); card(g, 90, 480, 560, 220, C.neg, k); g.save(); g.translate(110, 570); g.scale(s, s); txt(g, '−0.988', 0, 0, FONT.black(130), C.neg, 'left', k); g.restore(); txt(g, 'its height', 110, 660, FONT.mono(38), C.dim, 'left', k); }
    if (t > T.same) { const [ax, ay] = onCircle(CX, CY, R, 30 * D2R), k = prog(t, T.same, T.same + .4); g.save(); g.globalAlpha = k; seg(g, ax, CY, ax, ay, C.sin, 10); dot(g, ax, ay, 16, C.sin); txt(g, '30°', ax + 54, ay - 26, FONT.head(44), C.sin); g.restore(); txt(g, 'same keys, two points', 110, 760, FONT.head(52), C.ink, 'left', k); }
    dot(g, mx, my, 20, C.ink);
  }
}
