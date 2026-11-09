// a0 · Lát cắt mở bài · p1. Khung 0.5 s = thumbnail đang chuyển động + mascot người dẫn ở góc; ba lát từ thân bài, không nhân vật trên hình; hình cuối giữ ≥ 2 s (§242, §244, §247).
import { must, figure } from '../kit.js';
import { bg, ground, unit, onCircle, calculator } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, D2R, rightTri, ratioReadout } from './common.js';
import { tree } from './b01-tree.js';
const GY = 860, AX = 200, L0 = 280, L1 = 1050, CX = 1180, CY = 520, R = 340;
export default class Open {
  static ERA = 'night'; static IMAGES = {}; static POSES = ['pointer'];
  init({ tl }) { const { L, w, START } = span(tl, 'a0', 0); this.START = START; this.FROM = -9;
    const T = this.T = { zero: w(0, 'zero'), set: w(1, 'small'), neg: w(1, 'minus'), same: L(2).start, both: w(2, 'both'), build: L(3).start, one: L(4).start, point: w(4, 'point'), meas: w(4, 'measurement'), obvious: L(4).end, read: L(5).start, tree: L(6).start, end: L(6).end };
    this.a0 = T.meas + .1; this.a1 = T.obvious - 2.2; must(`Math.abs(Math.sin(30)+0.988) < 0.0005`, true); }
  sfx() { const T = this.T; return [cue(T.zero, 'tick'), cue(T.set, 'tick'), cue(T.neg, 'error'), cue(T.one, 'whoosh'), cue(T.point, 'whoosh'), cue(T.meas, 'whoosh'), cue(this.a1, 'impact'), cue(T.read + 1.8, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.build + .9) { calculator(g, 900, 380, 'DEG', '0.5', C.sin, 1.1); const rad = t > T.neg - .1; if (t > T.set) calculator(g, 1450, 380, 'RAD', rad ? '−0.988' : '…', C.neg, 1.1 + (rad ? .1 * (1 - prog(t, T.neg, T.neg + .4)) : 0), prog(t, T.set, T.set + .4));
      txt(g, 'same keys', 1175, 680, FONT.head(62), C.ink, 'center', prog(t, T.same, T.same + .2)); txt(g, 'both correct', 1175, 770, FONT.black(72), C.sin, 'center', prog(t, T.both, T.both + .2)); figure(g, 'pointer', 210, 1080, 470, 'night', 1, { t }); return; }
    if (t < T.point - .05) { ground(g); const L = L0 + (L1 - L0) * ease(prog(t, T.build + .9, T.point - .2)), u = L / L0 * 2; rightTri(g, AX, GY, L, 30, { arc: 110, label: '30°' }); ratioReadout(g, u, 2 * u); return; }
    if (t < T.meas) { unit(g, 960, 540, 360); const th = (t - T.point) * 1.7, [mx, my] = onCircle(960, 540, 360, th), s = Math.sin(th), c = Math.cos(th); seg(g, mx, 540, mx, my, s < 0 ? C.neg : C.sin, 10); seg(g, 960, 540, mx, 540, c < 0 ? C.neg : C.cos, 10); dot(g, mx, my, 20, C.ink); return; }
    if (t < T.read) { unit(g, CX, CY, R); const th = 30 * ease(prog(t, this.a0, this.a1)), [mx, my] = onCircle(CX, CY, R, th), done = t > this.a1; txt(g, `walked  ${th.toFixed(1)}`, 110, 200, FONT.mono(52), C.ink, 'left');
      if (!done) { const tail = Math.min(th, 1.5); g.strokeStyle = C.sin; g.lineWidth = 12; g.lineCap = 'round'; if (tail > 0) { g.beginPath(); g.arc(CX, CY, R, -th, -th + tail); g.stroke(); } } else { seg(g, mx, CY, mx, my, C.neg, 10); txt(g, '−0.988', 110, 420, FONT.black(130), C.neg, 'left', prog(t, this.a1, this.a1 + .3)); } dot(g, mx, my, 20, C.ink); return; }
    if (t < T.tree) { const c = [1180, 500], r = 340; unit(g, c[0], c[1], r); const d = 60 + 30 * Math.sin((t - T.read) * .9), th = d * D2R, [mx, my] = onCircle(c[0], c[1], r, th); seg(g, mx, c[1], mx, my, C.sin, 10); seg(g, c[0], c[1], mx, c[1], C.cos, 10); dot(g, mx, my, 18, C.ink); txt(g, `cos  ${Math.cos(th).toFixed(2)}`, 420, 170, FONT.black(66), C.cos, 'left', prog(t, T.read + .5, T.read + .8)); txt(g, `sin  ${Math.sin(th).toFixed(2)}`, 420, 260, FONT.black(66), C.sin, 'left', prog(t, T.read + .9, T.read + 1.2)); figure(g, 'pointer', 200, 1080, 480, 'night', prog(t, T.read, T.read + .3), { t }); return; }
    ground(g, 880); tree(g, 1420, 880, 488);
  }
}
