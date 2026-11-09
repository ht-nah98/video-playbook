// engine/face.js
// Mặt cận hát nhép: vẽ viseme-1 làm nền, đè mảng miệng mouth-N tại cut.json.mouth.box.
// KHÔNG thay cả ô viseme — AI vẽ lại mọi nét nên viền rung 1–2px giữa các ô.
import { toCanvas } from './mascot.js';

export class Face {
  /** set 'a' = visemes-3x3 (bộ đầu), 'b' = bảng miệng thứ hai (lưới đều hơn: lệch 0–3px). */
  async load(base = '../../assets/character-v2/cut', { set = 'a' } = {}) {
    const img = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error(`face: thiếu ${src}`)); i.src = src; });
    const meta = await (await fetch(`${base}/cut.json`)).json();
    const k = set === 'b' ? '-b' : '';
    this.box = meta[`mouth${k}`].box;                 // [x0, y0, x1, y1] trong ô 418px
    this.base = toCanvas(await img(`${base}/viseme${k}-1.png`));   // canvas: cũng là pose giả 'face' để lấy mẫu ký hiệu
    this.mouth = await Promise.all([1,2,3,4,5,6,7,8,9].map(async i => toCanvas(await img(`${base}/mouth${k}-${i}.png`))));
    return this;
  }
  draw(g, x, y, h, mouthId, { alpha = 1 } = {}) {
    const s = h / this.base.height, w = this.base.width * s, x0 = x - w / 2, y0 = y - h;
    g.save(); g.globalAlpha = alpha;
    g.drawImage(this.base, x0, y0, w, h);
    const m = this.mouth[Math.min(9, Math.max(1, mouthId)) - 1], [bx, by] = this.box;
    g.drawImage(m, x0 + bx * s, y0 + by * s, m.width * s, m.height * s);
    g.restore();
  }
}
