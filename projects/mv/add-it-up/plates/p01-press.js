// P01 press — "Máy in khởi động" (TREATMENT §8). Bookend: dải tải in hồng từng lượt, kẹt ở 99%; ô 1% vàng = thứ còn thiếu.
import { W, H, clamp, smooth, outCubic, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';
import { CUE } from '../song.js';

export const BAR = { x: 360, y: 560, w: 1200, h: 70, n: 100 };   // dùng lại ở P24 (cùng số, khai lại ở đó)

export default class P01 {
  feed = 0;
  async init(s) {
    this.s = s;
    this.l99 = s.tl.line('Ninety-nine percent...'); this.lLoad = s.tl.line('Loading.');
    this.end = s.tl.at('Same speed.');
  }
  render(g, t) {
    sheet(g, t, this.s, () => this.page(t), { amp: 0.5, chrome: t >= CUE.kbIntro[0], pass: 1 });
  }
  page(t) {
    const { x, y, w, h, n } = BAR;
    // dải tải: mỗi 1% một vạch hồng in vào, chạy 1.18 → 2.0, dừng ở 99
    const fill = Math.floor(99 * outCubic(prog(t, this.l99.start, this.l99.end)));
    if (t >= CUE.kbIntro[1]) {
      R.ink('key', c => { c.lineWidth = 4; c.strokeRect(x, y, w, h); });
      // ô 1% cuối: vàng (gần vô hình) + viền key đứt — chỗ trống chờ C
      R.ink('yellow', c => c.fillRect(x + w * 0.99, y, w * 0.01, h));
      R.ink('key', c => { c.lineWidth = 2; c.setLineDash([6, 6]); c.strokeRect(x + w * 0.99, y + 4, w * 0.01 - 2, h - 8); });
    }
    if (fill > 0) R.ink('pink', c => { for (let i = 0; i < fill; i++) c.fillRect(x + 6 + i * (w - 12) / n, y + 6, (w - 12) / n - 3, h - 12); });
    if (fill > 0) R.ink('key', c => {
      c.font = '900 260px "Archivo"'; c.textAlign = 'right'; c.fillText(`${fill}`, x + w - 230, y - 60);
      c.font = '900 120px "Archivo"'; c.textAlign = 'left'; c.fillText('%', x + w - 220, y - 60);
    });
    lyrics(this.s, t, 0, this.end, (l) => ({ x: x, y: y + h + 90, px: 40 }));
  }
}
