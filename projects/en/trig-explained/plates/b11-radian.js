// b11 · Radian · p2 câu 61–71. 360 vạch là lựa chọn; cung tự vẽ đúng một bán kính = 1 radian; 2π; đổi đơn vị; cung = góc × bán kính.
import { must } from '../kit.js';
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, D2R, card } from './common.js';
const CX = 1240, CY = 540, R = 300;
export default class Radian {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b11', 61); this.START = START; this.FROM = FROM;
    this.T = { deg: L(61).start, choose: L(62).start, walk: L(64).start, w1: L(64).end - .2, one: L(65).start, any: L(66).start, full: L(67).start, two: L(67).start + 3, half: L(68).start, qtr: w(68, 'quarter'), conv: L(69).start, six: w(69, 'sixth'), arc: L(70).start, dist: L(71).start, end: L(71).end }; }
  sfx() { const T = this.T; return [cue(T.deg, 'tick'), cue(T.walk + .3, 'pen'), cue(T.one, 'card'), cue(T.two, 'correct'), cue(T.half, 'tick'), cue(T.qtr, 'tick'), cue(T.conv, 'card'), cue(T.arc, 'card')]; }
  render(g, t) {
    const T = this.T; bg(g); const phase = t < T.walk - .4 ? 0 : t < T.any ? 1 : t < T.full ? 2 : 3;
    if (phase === 0) { unit(g, CX, CY, R); const n = Math.round(360 * ease(prog(t, T.deg, T.deg + 2))); g.strokeStyle = C.dim; g.lineWidth = 2; g.beginPath(); for (let i = 0; i < n; i++) { const a = i * D2R, l = i % 30 ? 12 : 30; g.moveTo(CX + R * Math.cos(a), CY - R * Math.sin(a)); g.lineTo(CX + (R + l) * Math.cos(a), CY - (R + l) * Math.sin(a)); } g.stroke(); txt(g, `${n}`, 110, 340, FONT.black(150), C.ink, 'left'); txt(g, 'parts in a turn', 110, 440, FONT.mono(40), C.dim, 'left'); txt(g, 'someone chose this', 110, 540, FONT.head(62), C.neg, 'left', prog(t, T.choose + 2, T.choose + 2.4)); return; }
    if (phase === 2) { const u = (x, y, r, lab) => { g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.strokeStyle = C.sin; g.lineWidth = 12; g.beginPath(); g.arc(x, y, r, 0, -1, true); g.stroke(); seg(g, x, y, x + r, y, C.cos, 5); seg(g, x, y, x + r * Math.cos(1), y - r * Math.sin(1), C.dim, 3); txt(g, lab, x, y + r + 60, FONT.mono(38), C.ink); }; u(480, 560, 90, 'a coin'); u(1240, 490, 340, 'the whole Earth'); txt(g, 'same 1 radian', 480, 300, FONT.head(56), C.sin); return; }
    unit(g, CX, CY, R);
    if (phase === 1) { const th = ease(prog(t, T.walk + .3, T.w1)), [mx, my] = onCircle(CX, CY, R, th); seg(g, CX, CY, CX + R, CY, C.cos, 8); txt(g, 'radius', CX + R / 2, CY + 44, FONT.mono(36), C.cos); g.strokeStyle = C.sin; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, R, 0, -th, true); g.stroke(); seg(g, CX, CY, mx, my, C.dim, 3); dot(g, mx, my, 16, C.ink);
      if (t > T.one) { card(g, 90, 205, 500, 250, C.sin, prog(t, T.one, T.one + .3)); must(`Math.abs(180/Math.PI-57.2958) < 0.001`, true); txt(g, '1 radian', 110, 280, FONT.black(100), C.sin, 'left', prog(t, T.one, T.one + .3)); txt(g, '≈ 57.3°', 110, 390, FONT.head(70), C.ink, 'left', prog(t, T.one + 2, T.one + 2.3)); } return; }
    const sw = ease(prog(t, T.full + .6, T.two)) * 2 * Math.PI; g.strokeStyle = C.sin; g.lineWidth = 12; g.lineCap = 'round'; if (sw > 0) { g.beginPath(); g.arc(CX, CY, R, 0, -sw, true); g.stroke(); }
    const lab = (a, s, k, dx, dy) => { const [x, y] = onCircle(CX, CY, R, a); dot(g, x, y, 12, C.ink); txt(g, s, x + dx, y + dy, FONT.head(52), C.ink, 'center', k); };
    if (t > T.half) lab(Math.PI, 'π', prog(t, T.half, T.half + .3), -50, 0); if (t > T.qtr) lab(Math.PI / 2, 'π/2', prog(t, T.qtr, T.qtr + .3), 0, -46);
    if (t > T.two) { must(`Math.abs(2*Math.PI-6.28) < 0.01`, true); txt(g, 'full turn = 2π ≈ 6.28', 110, 170, FONT.black(66), C.sin, 'left'); }
    if (t > T.conv) { const k = prog(t, T.conv, T.conv + .3); card(g, 90, 240, 720, 200, C.a, k); txt(g, '180° = π', 120, 300, FONT.black(70), C.ink, 'left', k); txt(g, '30° = π/6', 120, 385, FONT.black(70), C.a, 'left', prog(t, T.six, T.six + .3)); must(`Math.abs(30/180-1/6) < 1e-12`, true); }
    if (t > T.arc) { const k = prog(t, T.arc + 1.5, T.arc + 1.9); card(g, 90, 480, 720, 130, C.cos, k); txt(g, 'arc = angle × radius', 120, 545, FONT.head(52), C.cos, 'left', k); }
    if (t > T.dist) txt(g, 'radians = how far M walked', 110, 700, FONT.head(48), C.cos, 'left', prog(t, T.dist + 2, T.dist + 2.4));
  }
}
