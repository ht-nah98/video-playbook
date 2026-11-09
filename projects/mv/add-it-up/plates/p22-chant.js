// P22 chant — "FROM SCRATCH!" ×4 (lời gốc ghi 2; nghe được 4 — data/overrides.json). Mỗi tiếng hô một CON DẤU cắt cứng:
// phủ hồng · xanh · vàng · hồng+xanh; chữ khổng lồ nghiêng khác nhau; nhân vật nắm đấm mỗi lần to hơn.
import { W, H, clamp, smooth } from '../../../../engine/lib.js';
import { R, sheet, art } from '../kit.js';
import { printImage } from '../../../../engine/riso.js';

const LOOK = [
  { flood: ['pink'], text: 'key', sh: 'blue', rot: -0.07, h: 640 },
  { flood: ['blue'], text: 'key', sh: 'pink', rot: 0.05, h: 780 },
  { flood: ['yellow'], text: 'key', sh: 'pink', rot: -0.04, h: 920 },
  { flood: ['pink', 'blue'], text: null, sh: 'yellow', rot: 0, h: 1080 },
];

export default class P22 {
  feed = 0;
  async init(s) { this.s = s; this.ls = s.tl.lines.filter(l => l.section === 'Group Chant'); this.end = s.tl.at('Reverse it.'); }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 3.5, pass: 4 }); }
  page(t) {
    let i = 0; for (let j = 0; j < this.ls.length; j++) if (t >= this.ls[j].start) i = j;
    const L = LOOK[i], k = clamp((t - this.ls[i].start) / 0.1);
    for (const ink of L.flood) R.ink(ink, c => c.fillRect(-100, -100, W + 200, H + 200));
    const put = c => { c.translate(760, 520); c.rotate(L.rot); c.font = '900 250px "Archivo"'; c.textAlign = 'center'; };
    R.ink(L.sh, c => { put(c); c.fillText('FROM', 14 - (1 - k) * 40, -40 + 12); c.fillText('SCRATCH!', 14, 210 + 12); });
    if (L.text) R.ink(L.text, c => { put(c); c.fillText('FROM', (1 - k) * 40, -40); c.fillText('SCRATCH!', 0, 210); });
    else R.knock(c => { put(c); c.fillText('FROM', (1 - k) * 40, -40); c.fillText('SCRATCH!', 0, 210); });
    printImage(R, art(this.s.mascot, 'fist'), 1580, H + 40, L.h, { k: clamp((t - this.ls[i].start) / 0.12), shadow: L.sh, seed: i + 3, kick: 40 });
  }
}
