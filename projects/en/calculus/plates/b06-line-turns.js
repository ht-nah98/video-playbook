// b06 · The line turns · câu p2 19–21 · G1. Khung zoom, kết đúng ở VIEWS.zoom (sườn, (1, 1), dây cuối) để b07 nối. Dây xanh xoay quanh (1, 1):
// mỗi lần cọc thứ hai dời vào (2 → 1.5 → 1.1 → 1.01 → 1.001) vẽ một cung góc navy, cung nhỏ dần; số dốc ghi ở góc; "settles" → dây khép, thẻ ONE ANGLE.
import { C, MO, AR, prog, lookup, must, outCubic, ground, hill, secant, spot, card, text, secTag, VIEWS, STEPS, lerp } from '../kit.js';
import { mascotAt, walker } from './g1-common.js';

const ang = m => Math.atan(m * 420 / 760);                // góc trên màn hình (zoom) của dây dốc m
export default class LineTurns {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b06');
    this.START = L(19).start;
    this.FROM = Math.max(this.START - 1.2, L(18).end + 0.5);
    this.T = { picture: w(19, 'picture'), watch: w(19, 'watch'), turn: [w(20, 'each'), w(20, 'slides'), w(20, 'turns'), w(20, 'around') + 0.4], settles: w(21, 'settles'), less: w(21, 'less', 1), one: w(21, 'one'), l21: L(21).start, end: L(21).end };
    this.X = [2, 1.5, 1.1, 1.01, 1.001];
    for (let i = 1; i < 4; i++) if (this.T.turn[i] < this.T.turn[i - 1] + 0.5) throw new Error('b06: các lần xoay sát nhau');
    must(`'${STEPS.map(s => s.x).join(' ')}'`, '2 1.5 1.1 1.01 1.001');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.turn[0], 'tick'), c(T.turn[3], 'pen'), c(T.settles, 'snap')];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.zoom, P = [V.X(1), V.Y(1)];
    ground(g, 'field', t, { pan: (VIEWS.bowl.X(0) - V.X(0)) * 0.1 });
    hill(g, V, { a: -1.2, b: 3.6, t });
    // x2 hiện tại: dời êm tại từng mốc xoay
    let cur = 0, kk = 0; T.turn.forEach((a, i) => { if (t >= a) { cur = i + 1; kk = prog(t, a, a + 0.7); } });
    const x2 = cur ? lerp(this.X[cur - 1], this.X[cur], outCubic(kk)) : 2;
    // cung góc (một cung mỗi lần xoay, bán kính tăng dần) + dây cũ mờ
    for (let i = 1; i <= cur; i++) {
      const k = i === cur ? outCubic(kk) : 1, a0 = ang(1 + this.X[i - 1]), a1 = ang(1 + this.X[i - 1] + (this.X[i] - this.X[i - 1]) * k), r = 200 + 90 * i;
      g.save(); g.beginPath(); g.moveTo(P[0], P[1]); g.arc(P[0], P[1], r, -a0, -a1, false); g.closePath(); g.fillStyle = 'rgba(34,49,59,0.22)'; g.fill();
      g.strokeStyle = C.ink; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.arc(P[0], P[1], r, -a0, -a1, false); g.stroke(); g.restore();
      if (i < cur) secant(g, V, 1, this.X[i - 1], { poles: false, a: 0.3, ext: 0.3, ext0: 0.4, w: 4 });
    }
    if (cur) secant(g, V, 1, this.X[cur - 1], { poles: false, a: 0.3 * (1 - outCubic(kk)), ext: 0.3, ext0: 0.4, w: 4 });
    secant(g, V, 1, x2, { k: prog(t, this.FROM + 0.3, this.FROM + 0.9), ext: 0.3, ext0: 0.4, w: 7 });
    spot(g, P[0], P[1], { k: 1, pulse: prog(t, T.settles, T.settles + 0.5) });
    walker(g, V, 0.78, 1.3);
    // số dốc hiện tại ghi ở góc trên trái
    const sl = STEPS[cur].slope, kS = cur ? prog(t, T.turn[cur - 1], T.turn[cur - 1] + 0.4) : prog(t, this.START, this.START + 0.4);
    text(g, 'slope', 120, 250, { font: `800 44px ${AR}`, color: C.secInk });
    text(g, sl, 120, 335, { font: `500 84px ${MO}`, color: C.secInk, k: kS });
    const ka = prog(t, T.less, T.less + 0.35);
    if (ka > 0) text(g, '→ 2', 120 + 330, 335, { font: `500 84px ${MO}`, color: C.ink, k: ka });
    card(g, 'ONE ANGLE', 470, 480, { size: 52, mono: false, wt: 800, k: prog(t, T.one, T.one + 0.3) });
    mascotAt(g, t, 'pointer', this.START + 0.5, T.l21 + 0.2);
    secTag(g, 'The line turns', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
