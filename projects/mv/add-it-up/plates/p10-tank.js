// P10 tank — "Bồn đầy, dòng đổi": lưu lượng 3t², bồn đầy tới t³ = 8. Một hình chữ nhật (12 × 2 = 24) thì sai:
// phần thừa in hồng + vàng (màu sai lệch), ước lượng 24 tràn bồn.
import { W, H, clamp, smooth, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics, figure, stamp } from '../kit.js';
import { G, X, Y, f, F, tank, rateGraph } from '../tank.js';

export default class P10 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Now the tank fills up,'); this.tFlow = L('but the flow keeps changing.'); this.tThree = L('Three t squared,');
    this.tEvery = L('every second rearranging.'); this.tRect = L('One rate times time'); this.tWrong = L("won't get it right.");
    this.tBig = L('One big rectangle'); this.end = L('So break it down.');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: t >= this.tBig ? 2.6 : 1.2, pass: 3 }); }
  sim(t) { return 2 * smooth(prog(t, this.t0 + 0.3, this.tRect - 0.2)); }       // thời gian trong bài toán, 0 → 2
  page(t) {
    const u = this.sim(t);
    tank({ level: F(u), flow: f(u) / 12, ghost: t >= this.tWrong ? 24 : null });
    if (t >= this.tThree) rateGraph(Math.max(0.01, u));
    if (t >= this.tEvery) R.ink('key', c => { c.beginPath(); c.arc(X(u), Y(f(u)), 12, 0, 7); c.fill(); });
    if (t >= this.tRect) {                                   // một hình chữ nhật cao f(2) = 12, rộng 2
      const k = smooth(prog(t, this.tRect, this.tRect + 0.3));
      R.ink('pink', c => { c.fillStyle = R.tint('pink', 0.55, 9); c.fillRect(X(0), Y(12 * k), 2 * G.sx, 12 * k * G.sy); });
      if (t >= this.tWrong) R.ink('yellow', c => { c.beginPath(); c.moveTo(X(0), Y(12)); for (let v = 0; v <= 2.0001; v += 0.02) c.lineTo(X(v), Y(f(v))); c.lineTo(X(2), Y(12)); c.closePath(); c.fill(); });
      R.ink('key', c => { c.lineWidth = 4; c.strokeRect(X(0), Y(12 * k), 2 * G.sx, 12 * k * G.sy); });
    }
    if (t >= this.tWrong) stamp('12 × 2 = 24 ≠ 8', X(0.08), Y(10.4), '900 64px "Archivo"', { k: (t - this.tWrong) / 0.15, shadow: 'pink' });
    figure(this.s, 'three', t, this.tThree + 0.05, this.end - 0.55, 1700, H + 20, 820, { shadow: 'yellow' });
    lyrics(this.s, t, this.t0, this.end);
  }
}
