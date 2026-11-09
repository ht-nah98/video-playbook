// P18 climb — "Chiều cao → diện tích → thể tích": một vạch quét thành mặt, mặt quét theo chiều sâu thành chồng giấy;
// lùi ra thấy cỗ máy ∫ với thẻ nạp đổi: không gì đổi bên trong máy, chỉ thứ ta nạp vào.
import { W, H, clamp, smooth, prog, lerp } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';
import { press, flow } from '../press.js';

const f = u => 0.5 + 0.5 * Math.sqrt(u), BX = 200, BY = 760, BW = 560, BH = 300, CARDS = ['HEIGHT', 'AREA', 'SLICE'];

export default class P18 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('And suddenly—'); this.tArea = L('height became area.'); this.tVol = L('Area became volume.');
    this.tSame = L('Nothing changed'); this.tFeed = L('Only what'); this.end = L('A rate');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 2, pass: 4 }); }
  page(t) {
    const sw = smooth(prog(t, this.tArea, this.tArea + 1.2)), dep = smooth(prog(t, this.tVol, this.tVol + 1.4));
    const top = u => BY - f(u) * BH;
    // chiều sâu: các lớp mặt lệch chéo lên phải (chồng giấy)
    const L = Math.round(dep * 12);
    for (let j = L; j >= 1; j--) R.ink(j % 2 ? 'blue' : 'pink', c => { c.translate(j * 16, -j * 12);
      c.beginPath(); c.moveTo(BX, BY); for (let u = 0; u <= 1.0001; u += 0.02) c.lineTo(BX + u * BW, top(u)); c.lineTo(BX + BW, BY); c.closePath(); c.fillStyle = R.tint(j % 2 ? 'blue' : 'pink', 0.35, 8); c.fill(); });
    // mặt: phần đã quét
    if (sw > 0) R.ink('blue', c => { c.beginPath(); c.moveTo(BX, BY); for (let u = 0; u <= sw + 1e-9; u += 0.01) c.lineTo(BX + u * BW, top(u)); c.lineTo(BX + sw * BW, BY); c.closePath(); c.fill(); });
    // vạch chiều cao đang quét
    if (t >= this.t0 + 0.2) R.ink('pink', c => c.fillRect(BX + sw * BW - 6, top(sw), 12, BY - top(sw)));
    R.ink('key', c => { c.lineWidth = 4; c.beginPath(); c.moveTo(BX - 30, BY); c.lineTo(BX + BW + 260, BY); c.stroke();
      c.font = '800 40px "Archivo"';
      if (t >= this.t0 + 0.2) c.fillText('height', BX, 300);
      if (t >= this.tArea) c.fillText('→ area', BX + 160, 300);
      if (t >= this.tVol) c.fillText('→ volume', BX + 340, 300); });
    // cỗ máy: lùi ra
    const mk = smooth(prog(t, this.tSame, this.tSame + 0.6));
    if (mk > 0) {
      const i = Math.max(0, this.s.beat.beatIndex(t) - this.s.beat.beatIndex(this.tFeed));
      press({ x: lerp(2300, 1430, mk), y: 230, h: 720 }, { card: t >= this.tFeed ? CARDS[i % 3] : 'HEIGHT', out: 'TOTAL', strips: flow(t, this.tSame).map(x => ({ ...x, ink: 'pink' })) });
    }
    lyrics(this.s, t, this.t0, this.end);
  }
}
