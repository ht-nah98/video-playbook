// b13 · Tóm tắt, bài tập, hẹn sóng, biển kênh · p2 câu 85–92.
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, D2R, rightTri, card } from './common.js';
export default class Sum {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, START, FROM } = span(tl, 'b13', 85); this.START = START; this.FROM = FROM; this.T = { a: L(85).start, b: L(86).start, c: L(87).start, try: L(88).start, next: L(90).start, wave: L(91).start, end: L(92).start, last: L(92).end }; }
  sfx() { const T = this.T; return [cue(T.a, 'card'), cue(T.b, 'card'), cue(T.c, 'card'), cue(T.try, 'question'), cue(T.wave, 'whoosh'), cue(T.end, 'card')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.try - .4) { [[0, 'proportions', T.a], [1, 'coordinates', T.b], [2, 'the walk', T.c]].forEach(([i, s, a]) => { const x = 340 + i * 620, k = prog(t, a, a + .4); if (k <= 0) return; card(g, x - 270, 240, 540, 620, C.faint, k); g.save(); g.globalAlpha = k; if (i === 0) rightTri(g, x - 180, 620, 360, 30, { w: 7, arc: 60 }); if (i >= 1) { unit(g, x, 480, 170); const th = i === 1 ? 120 * D2R : 30, [mx, my] = onCircle(x, 480, 170, th); seg(g, mx, 480, mx, my, i === 1 ? C.sin : C.neg, 8); if (i === 1) seg(g, x, 480, mx, 480, C.neg, 8); dot(g, mx, my, 12, C.ink); } g.restore(); txt(g, s, x, 780, FONT.head(56), C.ink, 'center', k); }); return; }
    if (t < T.next - .2) { unit(g, 1180, 520, 340); const [mx, my] = onCircle(1180, 520, 340, 30 * D2R); seg(g, mx, 520, mx, my, C.sin, 10); dot(g, mx, my, 16, C.ink); seg(g, 760, my, 1600, my, C.sin, 4, prog(t, T.try + 3, T.try + 3.7), [14, 14]); txt(g, 'sin ? = 1/2', 370, 240, FONT.black(84), C.sin, 'left'); txt(g, 'a second angle', 370, 330, FONT.mono(40), C.ink, 'left'); return; }
    if (t < T.wave - .2) { const f = FONT.mono(30); for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) txt(g, ['sin(−x)', 'cos(π−x)', 'tan(x+π)', 'cos(π/2−x)'][(r + c) % 4], 280 + c * 300, 200 + r * 80, f, C.dim, 'center'); txt(g, 'a whole page → 4 pictures', 1600, 860, FONT.head(52), C.sin, 'right', prog(t, T.next + 3, T.next + 3.4)); return; }
    if (t < T.end - .2) { // đường tròn trải thành sóng: điểm trên vành, độ cao vẽ theo thời gian
      const cx = 330, cy = 520, r = 210, u = prog(t, T.wave + .2, T.end - .3), th = u * 4 * Math.PI + .2, [mx, my] = onCircle(cx, cy, r, th), x0 = 640, W = 1180; unit(g, cx, cy, r); seg(g, x0, cy, x0 + W, cy, C.dim, 3); g.strokeStyle = C.sin; g.lineWidth = 8; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); for (let i = 0; i <= 240 * u; i++) { const a = i / 240 * 4 * Math.PI + .2, x = x0 + W * i / 240, y = cy - r * Math.sin(a); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); seg(g, mx, my, x0 + W * u, my, C.sin, 3, 1, [10, 10]); dot(g, mx, my, 16, C.ink); return; }
    txt(g, '99% from scratch', 960, 430, FONT.black(120), C.ink); txt(g, 'Trigonometry · Part 1', 960, 540, FONT.mono(44), C.cos); g.fillStyle = C.neg; g.beginPath(); g.roundRect(760, 610, 400, 100, 16); g.fill(); txt(g, 'SUBSCRIBE', 960, 662, FONT.head(52), '#FFFFFF');
  }
}
