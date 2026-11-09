// P16 area — "Một đường cong trên mặt đất" · ✂ 143.67 (trống về). √x trên [0, 4]; dải dập; một mảnh √x·dx; các dải
// liền lại thành mặt diện tích 16/3. Cùng cỗ máy — đầu vào giờ là CHIỀU CAO.
import { W, H, clamp, smooth, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics, stamp } from '../kit.js';

export const SOL = { ox: 220, gy: 820, sx: 240, sy: 200 };   // dùng chung số với P17 (khai lại ở đó)
const X = u => SOL.ox + u * SOL.sx, f = u => Math.sqrt(Math.max(0, u));

export default class P16 {
  feed = 0;
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Now take a curve'); this.tStrips = L('Thin little strips'); this.tAround = L('all the way around.');
    this.tHw = L('Height times width—'); this.tPiece = L('one little piece.'); this.tAdd = L('Add every piece'); this.tSurf = L('and the surface appears.');
    this.end = L('Now take a solid.');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1.6, pass: 4 }); }
  page(t) {
    const Y = v => SOL.gy - v * SOL.sy;
    // mặt đất
    R.ink('key', c => { c.lineWidth = 6; c.beginPath(); c.moveTo(0, SOL.gy); c.lineTo(W, SOL.gy); c.stroke(); c.lineWidth = 2;
      for (let x = -40; x < W; x += 36) { c.beginPath(); c.moveTo(x, SOL.gy + 6); c.lineTo(x + 24, SOL.gy + 30); c.stroke(); }
      c.font = '500 24px "IBM Plex Mono"'; c.fillText('ground', W - 200, SOL.gy + 60); c.fillText('0', X(0) - 8, SOL.gy + 44); c.fillText('4', X(4) - 8, SOL.gy + 44); });
    const n = t >= this.tAround ? 32 : 16, w = 4 / n * SOL.sx, merge = smooth(prog(t, this.tAdd, this.tAdd + 0.8));
    const gap = Math.min(4, w * 0.25) * (1 - merge);
    if (t >= this.tStrips) R.ink('pink', c => { for (let i = 0; i < n; i++) { const ts = this.tStrips + i * 0.04 * (16 / n); if (t < ts) continue; const h = f(4 * (i + 0.5) / n) * SOL.sy; c.fillRect(X(4 * i / n) + gap / 2, SOL.gy - h, w - gap, h); } });
    if (merge > 0) R.ink('blue', c => { c.fillStyle = R.tint('blue', 0.4 + 0.6 * merge, 8); c.beginPath(); c.moveTo(X(0), SOL.gy); for (let u = 0; u <= 4.0001; u += 0.02) c.lineTo(X(u), Y(f(u))); c.lineTo(X(4), SOL.gy); c.closePath(); c.fill(); });
    // đường cong vẽ vào
    const ck = smooth(prog(t, this.t0 + 0.55, this.t0 + 1.2));
    R.ink('blue', c => { c.lineWidth = 10; c.beginPath(); for (let u = 0; u <= 4 * ck + 1e-9; u += 0.02) u === 0 ? c.moveTo(X(u), Y(f(u))) : c.lineTo(X(u), Y(f(u))); c.stroke(); });
    if (ck >= 1) R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText('y = √x', X(3.3), Y(2.05) - 10); });
    // một mảnh
    if (t >= this.tHw && t < this.tAdd + 0.45) {
      const i = Math.round(0.62 * n), h = f(4 * (i + 0.5) / n) * SOL.sy, x0 = X(4 * i / n), fy = -smooth(prog(t, this.tAdd, this.tAdd + 0.45)) * 1000;
      R.ink('blue', c => { c.translate(0, fy); c.fillRect(x0 + gap / 2, SOL.gy - h, w - gap, h); });
      R.ink('key', c => { c.translate(0, fy); c.lineWidth = 3; c.strokeRect(x0, SOL.gy - h, w, h); c.font = '800 40px "Archivo"';
        c.fillText('√x', x0 + w + 14, SOL.gy - h / 2); c.fillText('dx', x0 - 4, SOL.gy - h - 18);
        if (t >= this.tPiece) { c.font = '500 30px "IBM Plex Mono"'; c.fillText('one piece = √x · dx', x0 - 380, SOL.gy - h - 70); } });
    }
    if (t >= this.tSurf) stamp('∫₀⁴ √x dx = 16/3', X(0.15), 230, '900 76px "Archivo"', { k: (t - this.tSurf) / 0.15, shadow: 'pink' });
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 1150, y: 990 }));
  }
}
