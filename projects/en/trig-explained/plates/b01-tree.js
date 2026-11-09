// b01 · Cái cây · p2 câu 0–7. Thước tự kéo 20 m, đường ngắm 35°, mô hình trên giấy, ra 14 m. Không nhân vật trên hình toán (§247).
import { must, fix } from '../kit.js';
import { bg, ground } from '../../_kit/system.js';
import { span, cue, C, FONT, txt, seg, dot, prog, D2R, rightTri, ease } from './common.js';
const GY = 880, TX = 1420, PX = 28, X0 = TX - 20 * PX, K = Math.tan(35 * D2R);
export function tree(g, TX, GY, topY) { seg(g, TX, GY, TX, topY + 110, C.ink, 14); const blobs = [[0, 80, 80], [-62, 130, 60], [62, 130, 60]]; g.strokeStyle = C.ink; g.lineWidth = 12; g.fillStyle = C.panel; for (const [dx, dy, r] of blobs) { g.beginPath(); g.arc(TX + dx, topY + dy, r, 0, 7); g.stroke(); } for (const [dx, dy, r] of blobs) { g.beginPath(); g.arc(TX + dx, topY + dy, r, 0, 7); g.fill(); } }
export default class Tree {
  static ERA = 'night'; static IMAGES = {}; static POSES = [];
  init({ tl }) { const { L, w, START, FROM } = span(tl, 'b01', 0); this.START = START; this.FROM = FROM;
    this.T = { walk0: L(1).start + .2, walk1: L(1).end - .2, twenty: w(1, 'twenty'), up: w(2, 'look'), ang: w(2, 'angle'), tri: L(3).start, paper: L(4).start, seven: w(6, 'zero'), real: L(7).start, four: w(7, 'fourteen'), end: L(7).end }; }
  sfx() { const T = this.T; return [cue(T.twenty, 'tick'), cue(T.ang, 'pen'), cue(T.tri, 'pen'), cue(T.paper, 'page'), cue(T.seven, 'tick'), cue(T.four, 'correct')]; }
  render(g, t) {
    const T = this.T, topY = GY - 20 * PX * K; bg(g); ground(g, GY); tree(g, TX, GY, topY);
    const k = ease(prog(t, T.walk0, T.walk1)); seg(g, TX, GY + 26, TX - 20 * PX * k, GY + 26, C.cos, 8);
    if (t > T.twenty) txt(g, '20 m', (TX + X0) / 2, GY + 72, FONT.head(52), C.cos);
    if (k >= 1) { dot(g, X0, GY, 13, C.ink); txt(g, 'you', X0 - 60, GY - 26, FONT.mono(36), C.ink); }
    const sight = prog(t, T.up, T.ang); seg(g, X0, GY, TX, topY, C.ink, 5, sight, sight < 1 ? [14, 12] : undefined);
    if (t > T.ang) { g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(X0, GY, 120, -35 * D2R, 0); g.stroke(); txt(g, '35°', X0 + 190, GY - 48, FONT.head(44), C.ink); }
    if (t > T.tri) { seg(g, TX + 24, GY, TX + 24, topY, C.sin, 10, prog(t, T.tri, T.tri + .6)); txt(g, t > T.four ? `≈ ${fix('20*' + K, 0)} m` : '?', TX + 60, GY - 110, FONT.black(t > T.four ? 60 : 96), C.sin, 'left', prog(t, T.tri + .3, T.tri + .6)); }
    const pk = ease(prog(t, T.paper, T.paper + .6));
    if (pk > 0) { const px = 110, py = 90 - (1 - pk) * 500, b = 290; g.fillStyle = C.panel; g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.roundRect(px, py, 640, 400, 18); g.fill(); g.stroke();
      rightTri(g, px + 60, py + 300, b, 35, { w: 6, arc: 54, label: '35°' });
      if (t > T.seven) { txt(g, 'height ≈ 0.7 × base', px + 40, py + 350, FONT.mono(36), C.sin, 'left'); must(`Math.abs(Math.tan(35*${D2R})-0.7) < 0.01`, true); }
      if (t > T.real) { txt(g, '0.7 × 20 m', px + 620, py + 80, FONT.mono(38), C.ink, 'right'); txt(g, '≈ 14 m', px + 620, py + 150, FONT.black(64), C.sin, 'right', prog(t, T.four, T.four + .2)); must('Math.round(0.7*20)', 14); } }
  }
}
