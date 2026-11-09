// b02 · Tỉ số bất biến · p2 câu 8–11. Tam giác tự to ra, tỉ số đứng yên; rồi bảng góc → số.
import { must } from '../kit.js';
import { bg, ground } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, prog, D2R, ease, rightTri, ratioReadout } from './common.js';
const AX = 120, L0 = 330, L1 = 1100, GY = 860, ROWS = [[30, '0.50'], [35, '0.57'], [45, '0.71'], [60, '0.87']];
export default class Ratio {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b02', 8); this.START = START; this.FROM = FROM; this.T = { p0: L(9).start, p1: L(10).start + 2.2, dbl: w(10, 'double'), rat: w(10, 'ratio'), tbl: L(11).start, end: L(11).end }; }
  sfx() { const T = this.T; return [cue(T.p0, 'whoosh'), cue(T.rat, 'pop'), ...ROWS.map((_, i) => cue(T.tbl + .3 + i * 1.1, 'tick'))]; }
  render(g, t) {
    const T = this.T; bg(g); ground(g, GY); const L = L0 + (L1 - L0) * ease(prog(t, T.p0, T.p1)), u = L / L0 * 2;
    rightTri(g, AX, GY, L, 30, { arc: 110, label: '30°' }); ratioReadout(g, u, 2 * u, 110, 1 + .1 * Math.sin(Math.PI * prog(t, T.rat, T.rat + .5))); if (t >= T.p1) must(`Math.abs(Math.sin(30*${D2R})-0.5) < 1e-9`, true);
    if (t > T.tbl) { txt(g, 'angle → its number', 1370, 120, FONT.mono(36), C.dim, 'left'); ROWS.forEach(([d, v], i) => { const k = prog(t, T.tbl + .3 + i * 1.1, T.tbl + .6 + i * 1.1); if (k > 0) { txt(g, `${d}°`, 1370, 190 + i * 72, FONT.head(52), C.ink, 'left', k); txt(g, v, 1780, 190 + i * 72, FONT.mono(52), C.sin, 'right', k); must(`Math.abs(Math.sin(${d}*${D2R})-${v}) < 0.006`, true); } }); }
  }
}
