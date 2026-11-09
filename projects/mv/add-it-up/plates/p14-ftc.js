// P14 ftc — "Kiểm hai đầu" (break, nói). Thẻ máy chữ gõ từng dòng bằng chứng; bên phải họ t³ + C, cột a = 0, b = 2,
// F(2) = 8 + C, F(0) = 0 + C, hai mảng vàng C dập theo percussion rồi trượt vào nhau.
import { W, H, clamp, smooth, prog, lerp } from '../../../../engine/lib.js';
import { R, sheet, drawLine, stamp } from '../kit.js';

const O = { x: 1250, y: 760, sx: 230, sy: 50 }, X = u => O.x + u * O.sx, Y = v => O.y - v * O.sy, F = u => u * u * u;

export default class P14 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Take an antiderivative.'); this.tEnds = L('Check both ends.'); this.tFb = L('F of b'); this.tFa = L('minus F of a.');
    this.tCl = L('C on the left.'); this.tCr = L('C on the right.'); this.tSub = L('Subtract—'); this.end = L('and it\'s gone.');
    this.lines = s.tl.lines.filter(l => l.start >= this.t0 - 0.01 && l.start <= this.end);   // gồm "and it's gone." (139.82) tới cú cắt 139.94
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 0.8, pass: 4 }); }
  page(t) {
    // thẻ máy chữ
    R.ink('key', c => { c.lineWidth = 4; c.strokeRect(140, 150, 900, 760); c.font = '500 22px "IBM Plex Mono"'; c.fillText('PROOF CARD · FUNDAMENTAL THEOREM', 170, 190); });
    R.ink('yellow', c => c.fillRect(140, 150, 900, 60));
    this.lines.forEach((l, i) => drawLine(R, l, t, { voice: 'spoken', x: 190, y: 290 + i * 88, px: 46, rot: 0 }));
    // họ t³ + C (mảnh)
    R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.moveTo(X(-0.1), O.y); c.lineTo(X(2.3), O.y); c.moveTo(X(0), O.y + 20); c.lineTo(X(0), Y(12)); c.stroke(); });
    const fk = smooth(prog(t, this.t0, this.t0 + 0.8));
    [-2, 0, 2].forEach((C, i) => R.ink(i === 1 ? 'blue' : 'pink', c => { c.lineWidth = i === 1 ? 8 : 4; c.beginPath();
      for (let u = 0; u <= 2 * fk + 1e-9; u += 0.02) { const px = X(u), py = Y(F(u) + C + 2); u === 0 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke(); }));
    if (t >= this.tEnds) for (const [u, nm] of [[0, 'a = 0'], [2, 'b = 2']]) R.ink('key', c => { c.lineWidth = 4; c.setLineDash([10, 8]); c.beginPath(); c.moveTo(X(u), O.y + 40); c.lineTo(X(u), Y(12.5)); c.stroke(); c.setLineDash([]);
      c.font = '800 34px "Archivo"'; c.fillText(nm, X(u) - 40, O.y + 84); });
    if (t >= this.tFb) stamp('F(2) = 8 + C', X(0.9), Y(12.4), '800 46px "Archivo"', { k: (t - this.tFb) / 0.12, shadow: 'blue' });
    if (t >= this.tFa) stamp('F(0) = 0 + C', X(0.05), Y(4.6), '800 46px "Archivo"', { k: (t - this.tFa) / 0.12, shadow: 'blue' });
    // hai mảng C: dập trái, dập phải, rồi trượt vào nhau
    const m = smooth(prog(t, this.tSub, this.tSub + 0.5)), cy = 870;
    const block = (x0, on) => { if (!on) return; R.ink('yellow', c => c.fillRect(x0 - 70, cy - 60, 140, 110));
      R.ink('key', c => { c.lineWidth = 3; c.strokeRect(x0 - 70, cy - 60, 140, 110); c.font = '900 80px "Archivo"'; c.textAlign = 'center'; c.fillText('C', x0, cy + 28); }); };
    block(lerp(X(0), X(1), m), t >= this.tCl); block(lerp(X(2), X(1), m), t >= this.tCr);
    if (t >= this.tSub) R.ink('key', c => { c.font = '900 80px "Archivo"'; c.textAlign = 'center'; c.fillText('−', X(1), cy + 26 - 80 * (1 - m)); });
  }
}
