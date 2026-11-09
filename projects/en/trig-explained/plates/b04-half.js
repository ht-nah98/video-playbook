// b04 · Không phải độ dài; vì sao sin 30° = 1/2 · p2 câu 17–21. Gạch hiểu lầm → số thuần → tam giác đều bổ đôi.
import { must } from '../kit.js';
import { bg } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, prog, ease, D2R } from './common.js';
export default class Half {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b04', 17); this.START = START; this.FROM = FROM;
    this.T = { len: w(17, 'length'), kind: w(17, 'kind'), num: L(18).start, q: L(19).start, eq: L(20).start, cut: w(20, 'cut'), half: L(21).start, thirty: w(21, 'thirty'), res: w(21, 'sine'), end: L(21).end }; }
  sfx() { const T = this.T; return [cue(T.len + .4, 'error'), cue(T.kind + .4, 'error'), cue(T.num, 'card'), cue(T.cut, 'tear'), cue(T.res, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.eq) { const a = 1 - prog(t, T.eq - .4, T.eq);
      if (t < T.q) { [['a length', T.len, 280, 620], ['a kind of angle', T.kind, 420, 760]].forEach(([s, s0, y, wd]) => { txt(g, s, 960, y, FONT.head(84), C.dim, 'center', prog(t, s0, s0 + .2)); seg(g, 960 - wd / 2, y, 960 + wd / 2, y, C.neg, 10, prog(t, s0 + .4, s0 + .7)); });
        txt(g, 'sine is a plain number', 960, 640, FONT.black(92), C.sin, 'center', prog(t, T.num, T.num + .3)); txt(g, 'a ratio · no units', 960, 740, FONT.mono(44), C.ink, 'center', prog(t, T.num + 1.2, T.num + 1.5)); }
      else { txt(g, 'sin 30° = 1/2', 960, 480, FONT.black(150), C.sin, 'center', a); txt(g, 'why?', 960, 640, FONT.head(72), C.ink, 'center', a * prog(t, T.q + 1.5, T.q + 1.9)); }
      return; }
    // tam giác đều cạnh S, đỉnh trên; bổ đôi rồi tách nửa phải ra xa
    const S = 620, Ht = S * Math.sqrt(3) / 2, cx = 760, by = 900, ty = by - Ht, k = ease(prog(t, T.cut + .6, T.half + .4)), dx = 330 * k;
    const dr = prog(t, T.eq, T.eq + .6);
    g.strokeStyle = C.ink; g.lineWidth = 8; g.lineJoin = 'round';
    g.save(); g.globalAlpha = 1 - .75 * k; g.beginPath(); g.moveTo(cx, ty); g.lineTo(cx - S / 2, by); g.lineTo(cx, by); g.stroke(); g.restore();
    const n = g.globalAlpha; g.globalAlpha = dr; g.beginPath(); g.moveTo(cx + dx, ty); g.lineTo(cx + dx + S / 2, by); g.lineTo(cx + dx, by); g.stroke(); g.globalAlpha = n;
    seg(g, cx, ty, cx, by, C.ink, 8, prog(t, T.cut, T.cut + .5));
    if (t > T.half - .3) { const q = cx + dx;
      seg(g, q, by, q + S / 2, by, C.sin, 12, prog(t, T.half, T.half + .4)); txt(g, 'short side = 1/2', q + S / 4, by + 56, FONT.mono(36), C.sin);
      g.save(); g.translate(q + S / 4 + 118, (ty + by) / 2 - 40); g.rotate(60 * D2R); txt(g, 'long side = 1', 0, 0, FONT.mono(36), C.ink); g.restore();
      g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(q, ty, 90, 60 * D2R, 90 * D2R); g.stroke();
      if (t > T.thirty) txt(g, '30°', q + 40, ty + 124, FONT.head(40), C.ink); }
    if (t > T.res) { txt(g, 'sin 30° = 1/2', 1430, 170, FONT.black(78), C.sin, 'center', prog(t, T.res, T.res + .3)); must(`Math.abs(Math.sin(30*${D2R})-1/2) < 1e-9`, true); }
    txt(g, 'all sides equal', cx, 90, FONT.mono(36), C.dim, 'center', dr * (1 - prog(t, T.cut, T.cut + .4)));
  }
}
