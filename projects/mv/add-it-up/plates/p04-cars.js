// P04 cars — "Hai xe": hai làn giấy, hai con tem xe, đồng hồ tốc độ giống hệt, đồng hồ quãng đường 012 / 112.
import { W, H, clamp, smooth, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';
import { CUE } from '../song.js';

const LANES = [{ y: 300, odo: 12, ink: 'pink' }, { y: 590, odo: 112, ink: 'blue' }];
const SCROLL = 260;   // px/s: giấy cuộn sang trái = xe chạy sang phải

function car(c, x, y) {   // con tem xe: thân + hai bánh
  c.beginPath(); c.roundRect(x - 120, y - 46, 240, 62, 14); c.fill();
  c.beginPath(); c.roundRect(x - 64, y - 92, 120, 52, 16); c.fill();
}
export default class P04 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0l = L('Two cars moving down the same straight line,'); this.tSame = L('same speed every second,');
    this.tA = L('One reads twelve,'); this.tB = L('one reads one-twelve.'); this.end = L('Same motion on the meter—');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1, pass: 3 }); }
  page(t) {
    const run = Math.max(0, t - CUE.drumsIn), off = (run * SCROLL) % 160;   // trống vào 15.00 → giấy bắt đầu cuộn
    LANES.forEach(({ y, odo, ink }, i) => {
      R.ink('key', c => {
        c.lineWidth = 4; c.strokeRect(-20, y - 110, W + 40, 220);
        c.lineWidth = 6; c.setLineDash([60, 100]); c.lineDashOffset = off; c.beginPath(); c.moveTo(0, y + 70); c.lineTo(1250, y + 70); c.stroke();
      });
      const k = smooth(prog(t, this.t0l + i * 0.3, this.t0l + i * 0.3 + 0.25));
      if (k > 0) {
        R.ink(ink, c => car(c, 620 - (1 - k) * 700, y + 30));
        R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.arc(620 - (1 - k) * 700 - 70, y + 30 + 18, 22, 0, 7); c.arc(620 - (1 - k) * 700 + 70, y + 30 + 18, 22, 0, 7); c.fill(); });
      }
      // đồng hồ tốc độ — giống hệt hai làn
      if (t >= this.tSame) {
        const gx = 1450, gy = y + 40, ang = Math.PI * (1.15 + 0.55 * smooth(prog(t, this.tSame, this.tSame + 0.4)));
        R.ink('key', c => {
          c.lineWidth = 4; c.beginPath(); c.arc(gx, gy, 92, Math.PI, 2 * Math.PI); c.stroke();
          for (let j = 0; j <= 8; j++) { const a = Math.PI + j * Math.PI / 8; c.beginPath(); c.moveTo(gx + 78 * Math.cos(a), gy + 78 * Math.sin(a)); c.lineTo(gx + 92 * Math.cos(a), gy + 92 * Math.sin(a)); c.stroke(); }
          c.lineWidth = 7; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + 80 * Math.cos(ang), gy + 80 * Math.sin(ang)); c.stroke();
          c.font = '500 22px "IBM Plex Mono"'; c.fillText('SPEED', gx - 36, gy + 32);
        });
      }
      // đồng hồ quãng đường: máy đánh số lăn
      const tShow = i === 0 ? this.tA : this.tB;
      if (t >= tShow) {
        const v = odo + Math.max(0, t - tShow) * 0.9, s = String(Math.floor(v)).padStart(3, '0');
        const roll = v - Math.floor(v), k2 = smooth(prog(t, tShow, tShow + 0.15));
        R.ink('yellow', c => c.fillRect(1640, y - 70, 210, 96));
        R.ink('key', c => {
          c.lineWidth = 3; c.strokeRect(1640, y - 70, 210, 96);
          c.save(); c.beginPath(); c.rect(1640, y - 70, 210, 96); c.clip();
          c.font = '800 76px "Archivo"'; c.fontStretch = 'condensed'; c.fillText(s, 1668, y + 6 - (1 - k2) * 90 - roll * 6);
          c.restore(); c.font = '500 20px "IBM Plex Mono"'; c.fillText('ODO', 1640, y + 52);
        });
      }
    });
    lyrics(this.s, t, this.t0l, this.end);
  }
}
