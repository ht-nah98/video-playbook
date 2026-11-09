// P05 erase — "Đạo hàm xoá hằng số": hai đường quãng đường song song cách nhau +100 (vàng); trục lăn d/dx đi qua để
// lại MỘT đường tốc độ hồng; mảng vàng +100 bị lột ra ở "gets erased".
import { W, H, clamp, smooth, prog } from '../../../../engine/lib.js';
import { R, sheet, lyrics, axes, roller } from '../kit.js';

const O = { x: 200, y: 860 }, SX = 1100 / 10, SY = 640 / 200;          // t ∈ [0,10], quãng đường ∈ [0,200]
const X = u => O.x + u * SX, Y = v => O.y - v * SY, V = 9;              // x(t) = 12 + 9t và 112 + 9t

export default class P05 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Same motion on the meter—'); this.tDiff = L('Take the position,'); this.tConst = L('Anything constant');
    this.tErase = L('gets erased.'); this.end = L('Run it backward,');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1, pass: 3 }); }
  page(t) {
    axes(O.x, O.y, 1150, 690, { lx: 't', ly: 'position' });
    const rx = X(17 * smooth(prog(t, this.tDiff, this.tConst + 0.6)));   // con lăn đi hẳn ra mép phải        // trục lăn đi từ trái sang phải
    const passed = t >= this.tDiff;
    // mảng vàng giữa hai đường (+100), bị lột khi "gets erased"
    const pe = prog(t, this.tErase, this.tErase + 0.6);
    if (pe < 1) {
      const dy = pe * pe * 900, rot = pe * 0.5;
      const poly = c => { c.translate(X(5), Y(110) + dy); c.rotate(rot); c.translate(-X(5), -Y(110));
        c.beginPath(); c.moveTo(X(0), Y(12)); c.lineTo(X(10), Y(102)); c.lineTo(X(10), Y(202)); c.lineTo(X(0), Y(112)); c.closePath(); };
      R.ink('yellow', c => { poly(c); c.fill(); });
      R.ink('key', c => { poly(c); c.setLineDash([10, 8]); c.lineWidth = 2; c.stroke(); c.setLineDash([]);
        c.font = '900 64px "Archivo"'; c.fillText('+100', X(1.2), Y(100)); });
    }
    // hai đường xanh — phía sau con lăn thì bị xoá
    R.ink('blue', c => {
      if (passed) { c.beginPath(); c.rect(rx, 0, W, H); c.clip(); }
      c.lineWidth = 12; for (const b of [12, 112]) { c.beginPath(); c.moveTo(X(0), Y(b)); c.lineTo(X(10), Y(b + 10 * V)); c.stroke(); }
    });
    // đồ thị tốc độ hồng: hai xe in TRÙNG một nét (in chồng hai lần cùng chỗ)
    if (passed) R.ink('pink', c => { c.beginPath(); c.rect(0, 0, rx, H); c.clip(); c.lineWidth = 12;
      for (let k = 0; k < 2; k++) { c.beginPath(); c.moveTo(X(0), Y(V * 4)); c.lineTo(X(10), Y(V * 4)); c.stroke(); } });
    if (passed && rx > X(2)) R.ink('key', c => { c.font = '800 34px "Archivo"'; c.fillText('speed = 9  (both cars)', X(0.3), Y(V * 4) - 24); });
    if (passed && rx < W + 60) roller(rx, Y(215), O.y + 20);
    // ô đồng hồ: hai kim trùng nhau
    if (t >= this.t0) R.ink('key', c => { c.font = '500 26px "IBM Plex Mono"'; c.fillText('meter: 9 | 9', 1450, 200); });
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 1000, y: 1000 }));
  }
}
