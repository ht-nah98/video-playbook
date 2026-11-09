// P24 loading — "Trở về 99%": dải tải của P01 in lại, kẹt 99%; ô 1% vẫn vàng (luôn còn 1% để học tiếp).
// Band chạy tới 233.20 → hết file: DỪNG CỨNG, không fade.
import { W, H, clamp, outCubic, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';

const BAR = { x: 360, y: 560, w: 1200, h: 70, n: 100 };   // = P01

export default class P24 {
  async init(s) { this.s = s; this.l99 = s.tl.line('Ninety-nine percent...', 2); }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1.5, pass: 4 }); }
  page(t) {
    const { x, y, w, h, n } = BAR, fill = Math.floor(99 * outCubic(prog(t, this.l99.start, this.l99.end)));
    R.ink('key', c => { c.lineWidth = 4; c.strokeRect(x, y, w, h); });
    R.ink('yellow', c => c.fillRect(x + w * 0.99, y, w * 0.01, h));
    R.ink('key', c => { c.lineWidth = 2; c.setLineDash([6, 6]); c.strokeRect(x + w * 0.99, y + 4, w * 0.01 - 2, h - 8); });
    if (fill > 0) R.ink('pink', c => { for (let i = 0; i < fill; i++) c.fillRect(x + 6 + i * (w - 12) / n, y + 6, (w - 12) / n - 3, h - 12); });
    if (fill > 0) R.ink('key', c => { c.font = '900 260px "Archivo"'; c.textAlign = 'right'; c.fillText(`${fill}`, x + w - 230, y - 60);
      c.font = '900 120px "Archivo"'; c.textAlign = 'left'; c.fillText('%', x + w - 220, y - 60); });
    lyrics(this.s, t, this.l99.start, 999, () => ({ voice: 'spoken', x, y: y + h + 90, px: 40, rot: 0 }));
  }
}
