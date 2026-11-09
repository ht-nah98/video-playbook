// P02 twins — "Cùng tốc độ, khác chỗ": hai bản in CÙNG một bản khắc, lệch dọc (gieo trước + C của Verse 1).
import { clamp, smooth, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';
import { CUE } from '../song.js';

const ROWS = [{ y: 400, x0: 470 }, { y: 690, x0: 900 }];   // cùng tốc độ, khác chỗ xuất phát
const TRACK = [300, 1650], V = 95;                          // px/s — như nhau ở hai hàng

export default class P02 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.tSpeed = L('Same speed.'); this.tPlace = L('Different place.'); this.tChange = L('Same change.');
    this.tPast = L('Different past.'); this.end = L('What did we lose?');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 0.5, pass: 2 }); }
  page(t) {
    const ticks = CUE.kbTwins.filter(n => t >= n).length;          // mỗi nốt keyboard in thêm một lượt vạch
    for (const { y, x0 } of ROWS) {
      const x = x0 + V * Math.max(0, t - this.tSpeed);
      R.ink('key', c => {
        c.lineWidth = 3; c.beginPath(); c.moveTo(TRACK[0], y); c.lineTo(TRACK[1], y); c.stroke();
        for (let i = 0; i < ticks * 2; i++) { const tx = TRACK[0] + i * 82; c.beginPath(); c.moveTo(tx, y - 12); c.lineTo(tx, y + 12); c.stroke(); }
      });
      if (t >= this.tPast) {                                   // quá khứ: vệt vàng từ đầu đường tới chấm (dài ngắn khác nhau)
        const k = smooth(prog(t, this.tPast, this.tPast + 0.5));
        R.ink('yellow', c => c.fillRect(TRACK[0], y - 30, (x - TRACK[0]) * k, 60));
        R.ink('key', c => { c.lineWidth = 2; c.setLineDash([8, 8]); c.strokeRect(TRACK[0], y - 30, (x - TRACK[0]) * k, 60); });
      }
      if (t >= this.tSpeed) R.ink('pink', c => {                // tốc độ: mũi tên hồng giống hệt nhau
        const ax = x + 40; c.fillRect(ax, y - 78, 150, 16); c.beginPath(); c.moveTo(ax + 190, y - 70); c.lineTo(ax + 145, y - 98); c.lineTo(ax + 145, y - 42); c.fill();
        c.font = '800 34px "Archivo"'; c.fillText('v', ax + 60, y - 96);
      });
      if (t >= this.tPlace) R.ink('blue', c => { c.beginPath(); c.arc(x, y, 30, 0, 7); c.fill(); });
      if (t >= this.tChange) {                                  // cùng thay đổi: ngoặc Δ bằng nhau trên hai hàng
        const k = smooth(prog(t, this.tChange, this.tChange + 0.3));
        R.ink('key', c => {
          c.lineWidth = 3; const a = x - 2 * V, b = x;
          c.beginPath(); c.moveTo(a, y + 52); c.lineTo(a, y + 66); c.lineTo(a + (b - a) * k, y + 66); if (k >= 1) c.lineTo(b, y + 52); c.stroke();
          if (k >= 1) { c.font = '500 26px "IBM Plex Mono"'; c.fillText('Δ = 2v', a + 30, y + 104); }
        });
      }
    }
    lyrics(this.s, t, this.tSpeed, this.end, () => ({ x: 300, y: 920, px: 44 }));
  }
}
