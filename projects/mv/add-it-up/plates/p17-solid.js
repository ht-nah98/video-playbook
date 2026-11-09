// P17 solid — "Lát cắt": mặt diện tích P16 QUAY quanh trục x thành khối — 26 đĩa giấy xếp chồng (chỗ chồng nhiều thì
// đậm hơn: cộng dồn nhìn thấy được). Dao xén lộ khe; rút một lát: A(x) = π(√x)² = πx; cộng từ trái sang phải → 8π.
import { W, H, clamp, smooth, prog, lerp, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, figure, stamp } from '../kit.js';

const SOL = { ox: 220, gy: 820, sx: 240, sy: 200 };     // = P16
const X = u => SOL.ox + u * SOL.sx, f = u => Math.sqrt(Math.max(0, u)), N = 26, PULL = 9;

export default class P17 {
  feed = 0;   // nối liền P16
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('Now take a solid.'); this.tCut = L('Cut it thin.'); this.tLook = L('Look at the slice,'); this.tSec = L('Every cross-section');
    this.tAdd = L('Add those areas'); this.end = L('And suddenly—');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1.6, pass: 4 }); }
  page(t) {
    const rev = smooth(prog(t, this.t0, this.t0 + 1.1));                  // quay: 0 = mặt phẳng trên đất, 1 = khối
    const ay = lerp(SOL.gy, 560, rev), ry = 0.55 * rev;                    // trục lên giữa khung, đĩa mở dần
    const gapK = smooth(prog(t, this.tCut, this.tCut + 0.6));
    const pull = smooth(prog(t, this.tLook, this.tLook + 0.5)) * (1 - smooth(prog(t, this.tAdd + 1.2, this.tAdd + 1.6)));
    const count = prog(t, this.tAdd, this.end - 0.4);
    // trục quay
    R.ink('key', c => { c.lineWidth = 3; c.setLineDash([16, 10]); c.beginPath(); c.moveTo(80, ay); c.lineTo(lerp(80, X(4.6), rev), ay); c.stroke(); c.setLineDash([]);
      if (rev >= 1) { c.font = '500 26px "IBM Plex Mono"'; c.fillText('x', X(4.6) + 12, ay + 9); } });
    // tiếp đúng khung cuối P16: mặt diện tích (hồng + xanh = tím than), mặt đất, nhãn — rời đi trong lúc quay
    const away = smooth(prog(t, this.t0 + 0.2, this.t0 + 0.8));
    R.ink('key', c => { c.translate(0, (ay - SOL.gy) + away * 500); c.lineWidth = 6; c.beginPath(); c.moveTo(0, SOL.gy); c.lineTo(W, SOL.gy); c.stroke(); c.lineWidth = 2;
      for (let x = -40; x < W; x += 36) { c.beginPath(); c.moveTo(x, SOL.gy + 6); c.lineTo(x + 24, SOL.gy + 30); c.stroke(); }
      c.font = '500 24px "IBM Plex Mono"'; c.fillText('ground', W - 200, SOL.gy + 60); c.fillText('0', X(0) - 8, SOL.gy + 44); c.fillText('4', X(4) - 8, SOL.gy + 44); });
    if (away < 1) { stamp('∫₀⁴ √x dx = 16/3', X(0.15), 230 - away * 400, '900 76px "Archivo"', { shadow: 'pink' });
      R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText('y = √x', X(3.3), ay - 2.05 * SOL.sy - 10 - away * 600); }); }
    if (rev < 1) R.ink('blue', c => { c.lineWidth = 10; c.beginPath(); for (let u = 0; u <= 4.0001; u += 0.02) u === 0 ? c.moveTo(X(u), ay - f(u) * SOL.sy) : c.lineTo(X(u), ay - f(u) * SOL.sy); c.stroke(); });   // nét √x của P16
    if (rev < 1) for (const ink of ['pink', 'blue']) R.ink(ink, c => { c.beginPath(); c.moveTo(X(0), ay); for (let u = 0; u <= 4.0001; u += 0.02) c.lineTo(X(u), ay - f(u) * SOL.sy); c.lineTo(X(4), ay); c.closePath(); c.fill(); });
    // đĩa: vẽ từ phải (to, xa) sang trái — in chồng nên chỗ chồng đậm
    for (let i = N - 1; i >= 0; i--) {
      const u = (i + 0.5) * 4 / N, r = f(u) * SOL.sy, px = X(u) + (i - N / 2) * 6 * gapK, isP = i === PULL;
      // lát rút ra: bay lên góc trên-trái (trên đầu nhỏ của khối), quay mặt ra, thu 0.75
      const ox = isP ? (X(0.5) - px) * pull : 0, oy = isP ? (250 - ay) * pull : 0, rs = isP ? lerp(1, 0.72, pull) : 1;
      const rx = isP ? lerp(r * ry * 0.55, r * 0.62 * rs, pull) : r * ry * 0.55, rr = r * rs;
      if (rev <= 0) break;
      const lit = count > 0 && i / N < count;
      const disc = c => { c.beginPath(); c.ellipse(px + ox, ay + oy, Math.max(1, rx), rr, 0, Math.PI, 2 * Math.PI); c.ellipse(px + ox, ay + oy, Math.max(1, rx), Math.max(0.5, rr * (isP ? Math.max(rev, pull) : rev)), 0, 0, Math.PI); };
      R.ink(isP && pull > 0.05 ? 'pink' : lit ? 'pink' : 'blue', c => { disc(c); c.fill(); });
      R.ink('key', c => { c.lineWidth = isP && pull > 0.05 ? 5 : 2; disc(c); c.stroke(); });
      if (isP && pull > 0.05) R.ink('key', c => { c.lineWidth = 3; c.setLineDash([8, 8]); c.beginPath(); c.ellipse(px, ay, r * ry * 0.55, r, 0, 0, 7); c.stroke(); });
      if (isP && t >= this.tSec && pull > 0.9) R.ink('key', c => { c.font = '800 44px "Archivo"'; c.fillText('A(x) = π(√x)² = πx', px + ox + rr * 0.7, 140); });
    }
    if (count > 0) R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText(`V ≈ Σ A(x)·dx · ${Math.round(clamp(count) * N)}/${N} slices`, X(0), 1000 - 70); });
    if (t >= this.end - 0.9) stamp('V = ∫₀⁴ πx dx = 8π', X(0.1), 170, '900 76px "Archivo"', { k: (t - this.end + 0.9) / 0.15, shadow: 'yellow' });
    figure(this.s, 'pointer', t, this.tLook + 0.05, this.end - 0.5, 1660, H + 20, 760, { shadow: 'pink' });
    lyrics(this.s, t, this.s.tl.at('and the surface appears.'), this.end, (l, i) => i === 0 ? { x: 1150, y: 990 } : { x: 1100, y: 1000 });   // dòng cuối của P16 ở đúng chỗ cũ, bị xén ra
  }
}
