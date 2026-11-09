// P06 family — "Cả một họ": chạy ngược qua trục lăn, máy không biết đặt khuôn ở đâu → in cùng bản khắc 7 lần lệch dọc.
// Đồ thị chung với P07: F(x) = x³/3 − x, F′ = x² − 1 (FAM ở dưới, P07 khai lại cùng số).
import { W, H, clamp, smooth, prog, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, axes, plot, roller } from '../kit.js';

export const FAM = { ox: 260, oy: 600, sx: 150, sy: 34, a: -1.6, b: 2.6, Cs: [-9, -6, -3, 0, 3, 6, 9] };
const F = x => x * x * x / 3 - x, f = x => x * x - 1;
const X = u => FAM.ox + u * FAM.sx, Y = v => FAM.oy - v * FAM.sy;

export default class P06 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Run it backward,'); this.tWhat = L('what comes through?'); this.tFam = L('Not just one curve—');
    this.tYou = L('a family of you.'); this.end = L('F of x plus C,');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: t >= this.tYou ? 2.4 : 1, pass: 3 }); }
  page(t) {
    axes(FAM.ox - 240, FAM.oy, 900 + 240, 0, { lx: 'x' });
    R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.moveTo(X(0), 1000); c.lineTo(X(0), 90); c.stroke(); });
    // tốc độ hồng (đầu vào) ở dải trên
    R.ink('pink', c => { c.lineWidth = 8; plot(c, u => f(u) * 0.6 + 10.5, FAM.a, FAM.b, X, Y); c.stroke(); });
    R.ink('key', c => { c.font = '500 26px "IBM Plex Mono"'; c.fillText("rate  f(x) = x² − 1", X(FAM.b) + 20, Y(f(FAM.b) * 0.6 + 10.5) + 8); });
    // con lăn chạy NGƯỢC (phải → trái), in ra một đường xanh phía sau nó
    const rk = smooth(prog(t, this.t0, this.tWhat + 0.4)), rx = X(FAM.b + 0.3 - (FAM.b - FAM.a + 0.6) * rk);
    R.ink('blue', c => { c.beginPath(); c.rect(rx, 0, W, H); c.clip(); c.lineWidth = 14; plot(c, F, FAM.a, FAM.b, X, Y); c.stroke(); });
    if (rk < 1) roller(rx, 120, 900, '∫ ?');
    // "what comes through?" — dấu hỏi vàng: máy không biết khuôn đặt ở độ cao nào
    if (t >= this.tWhat && t < this.tFam) R.ink('key', c => { c.font = '900 120px "Archivo"'; c.fillText('?', X(-1.4), Y(4)); });
    // họ: in lại 7 lần lệch dọc, mỗi bản một lượt 0.12s
    FAM.Cs.forEach((C, i) => {
      if (C === 0) return;
      const p = clamp((t - this.tFam - i * 0.12) / 0.1); if (p <= 0) return;
      const ink = i % 2 ? 'pink' : 'blue', j = (1 - p) * 40;
      R.ink(ink, c => { c.translate((hash(C) - 0.5) * 10, j); c.lineWidth = 9; plot(c, x => F(x) + C, FAM.a, FAM.b, X, Y); c.stroke(); });
    });
    if (t >= this.tYou) R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText('F(x) + C', X(FAM.b) + 20, Y(F(FAM.b)) + 10); });
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 1150, y: 990 }));
  }
}
