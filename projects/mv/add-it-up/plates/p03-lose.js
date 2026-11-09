// P03 lose — "Ta đã mất gì?": câu hỏi máy chữ, ô vàng rỗng; 9 nốt guitar → 9 dải dựng tít ADD IT UP.
import { W, H, clamp, smooth, prog, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, figure } from '../kit.js';
import { CUE } from '../song.js';

export default class P03 {
  async init(s) { this.s = s; this.q = s.tl.at('What did we lose?'); this.end = s.tl.at('Two cars moving down the same straight line,'); }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 0.5, pass: 2 }); }
  page(t) {
    // ô vàng rỗng: thứ đã mất (vàng = C, gần vô hình — viền key đứt để đọc được)
    const k = smooth(prog(t, this.q + 0.6, this.q + 0.9));
    if (k > 0) {
      R.ink('yellow', c => c.fillRect(160, 340, 220 * k, 220));
      R.ink('key', c => { c.lineWidth = 3; c.setLineDash([10, 8]); c.strokeRect(160, 340, 220 * k, 220);
        if (k >= 1) { c.setLineDash([]); c.font = '900 170px "Archivo"'; c.textAlign = 'center'; c.fillText('?', 270, 515); } });
    }
    // tít: chữ in thành 9 dải dọc, mỗi nốt guitar một dải rơi vào chỗ
    const tx = 150, ty = 880, font = '900 250px "Archivo"', tw = 1150, n = CUE.guitar.length, sw = tw / n;
    CUE.guitar.forEach((tn, i) => {
      const p = clamp((t - tn) / 0.18); if (p <= 0) return;
      const dy = (1 - smooth(p)) * (hash(i) > 0.5 ? -60 : 60);
      const clip = c => { c.beginPath(); c.rect(tx + i * sw, ty - 260, sw + 1, 320); c.clip(); c.translate(0, dy); c.font = font; };
      R.ink('pink', c => { clip(c); c.fillText('ADD IT UP', tx + 12, ty + 10); });
      R.ink('blue', c => { clip(c); c.fillText('ADD IT UP', tx, ty); });
    });
    figure(this.s, 'ponder', t, this.q + 0.15, this.end - 0.7, 1530, H + 30, 980, { shadow: 'blue' });
    lyrics(this.s, t, this.q, this.end, () => ({ x: 160, y: 270, px: 60 }));
  }
}
