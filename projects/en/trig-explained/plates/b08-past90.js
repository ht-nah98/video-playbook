// b08 · Qua 90° · p2 câu 39–47. M đi tiếp tới 120°, cùng độ cao với 60°, across âm; rồi bảng dấu đọc bằng mắt.
import { must } from '../kit.js';
import { bg, unit, onCircle } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, ease, lerp, D2R, card } from './common.js';
const CX = 1180, CY = 500, R = 340, GY = 930, HS = 240, X = 240;
export default class Past {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b08', 39); this.START = START; this.FROM = FROM; this.CONTINUES = false;
    const T = this.T = { a: L(39).start, walk: L(40).start, high: L(41).start, same: L(42).start, neg: L(43).start, first: L(44).start, can: L(44).start + 2.6, memo: L(45).start, left: w(46, 'left'), below: w(46, 'below'), table: L(47).start, end: L(47).end }; }
  sfx() { const T = this.T; return [cue(T.high, 'tick'), cue(T.neg + 1.8, 'pop'), cue(T.left, 'whoosh'), cue(T.below, 'whoosh'), cue(T.table, 'correct')]; }
  render(g, t) {
    const T = this.T; bg(g);
    const left = prog(t, T.left, T.left + .4), below = prog(t, T.below, T.below + .4), fin = 1 - prog(t, T.table + 2.4, T.table + 3);
    if (left > 0) { g.save(); g.globalAlpha = .16 * left; g.fillStyle = C.neg; g.beginPath(); g.moveTo(CX, CY - R); g.arc(CX, CY, R, -Math.PI / 2, Math.PI / 2, true); g.fill(); g.restore(); }
    if (below > 0) { g.save(); g.globalAlpha = .16 * below; g.fillStyle = C.neg; g.beginPath(); g.arc(CX, CY, R, 0, Math.PI); g.fill(); g.restore(); }
    unit(g, CX, CY, R);
    let d = lerp(90, 120, ease(prog(t, T.a, T.a + 1.8))); d = lerp(d, 215, ease(prog(t, T.left - .1, T.left + .4))); d = lerp(d, 300, ease(prog(t, T.below - .1, T.below + .4)));
    const th = d * D2R, [mx, my] = onCircle(CX, CY, R, th), cs = Math.cos(th), sn = Math.sin(th);
    seg(g, mx, CY, mx, my, sn < 0 ? C.neg : C.sin, 10); seg(g, CX, CY, mx, CY, cs < 0 ? C.neg : C.cos, 10); seg(g, CX, CY, mx, my, C.dim, 3);
    if (t > T.same && t < T.left - .2) { const [nx, ny] = onCircle(CX, CY, R, 60 * D2R), k = prog(t, T.same, T.same + .5);
      seg(g, mx, my, nx, ny, C.sin, 4, k, [12, 12]); if (k >= 1) { dot(g, nx, ny, 13, C.dim); txt(g, '60°', nx + 54, ny - 22, FONT.head(40), C.dim); } }
    dot(g, mx, my, 18, C.ink); txt(g, 'M', mx + (cs < 0 ? -46 : 46), my + (sn < 0 ? 44 : -34), FONT.head(50), C.ink);
    const kh = prog(t, T.high, T.high + .3), kn = prog(t, T.neg + 1.8, T.neg + 2.1);
    if (t < T.left) { card(g, 90, 100, 420, 345, C.faint, kh); txt(g, 'up', 110, 150, FONT.mono(40), C.sin, 'left', kh); txt(g, sn.toFixed(3), 110, 216, FONT.black(84), C.sin, 'left', kh); txt(g, 'across', 110, 320, FONT.mono(40), C.neg, 'left', kn); txt(g, cs.toFixed(3).replace('-', '−'), 110, 386, FONT.black(84), C.neg, 'left', kn);
      if (t > T.neg + 2.2) { must(`Math.abs(Math.cos(120*${D2R})+0.5) < 1e-9`, true); must(`Math.abs(Math.sin(120*${D2R})-0.866) < 0.0005`, true); }
      txt(g, 'a side can’t be negative', 110, 510, FONT.mono(34), C.dim, 'left', prog(t, T.first + .6, T.first + .9)); txt(g, 'a coordinate can', 110, 562, FONT.head(50), C.sin, 'left', prog(t, T.can, T.can + .3)); }
    else { txt(g, 'M on the left → cosine −', 110, 180, FONT.mono(40), C.neg, 'left', left); txt(g, 'M below → sine −', 110, 244, FONT.mono(40), C.neg, 'left', below); }
    if (t > T.table) { const k = prog(t, T.table, T.table + .4), f = FONT.mono(40); [['cos +  sin +', 1, -1, C.ink], ['cos −  sin +', -1, -1, C.ink], ['cos −  sin −', -1, 1, C.ink], ['cos +  sin −', 1, 1, C.ink]].forEach(([s, a, b, c]) => { const [p, q] = s.split('  '); txt(g, p, CX + a * R * .45, CY + b * R * .45 - 22, FONT.mono(34), c, 'center', k); txt(g, q, CX + a * R * .45, CY + b * R * .45 + 22, FONT.mono(34), c, 'center', k); }); }
  }
}
