// P12 whole — "Gom mảnh thành tổng" (pre 2, hát). Một khoảnh khắc không kể được toàn bộ; mảnh tụ về; chiếc xe P04 chạy
// qua và vệt sau nó LÀ diện tích. "accumulation is the key" = LƯỢT IN KEY: trước đó tờ chỉ có màu (chữ in xanh),
// tới câu này mọi nét key in cùng lúc — K của CMYK là key plate.
import { W, H, clamp, smooth, prog, lerp, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, stamp } from '../kit.js';

const O = { x: 300, y: 820, sx: 600, sy: 52 }, X = u => O.x + u * O.sx, Y = v => O.y - v * O.sy, f = u => 3 * u * u, N = 24;

export default class P12 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('No single moment'); this.tWhole = L('can tell us the whole.'); this.tGather = L('So gather every change');
    this.tForm = L('and let the pieces form the total.'); this.tMotion = L('What looked like motion'); this.tSee = L('becomes something we can see.');
    this.tPiece = L('Piece by piece—', 2); this.tKey = L('accumulation is the key.'); this.end = L('Add it up,', 2);
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1.2, pass: t >= this.tKey ? 4 : 3, chrome: true }); }
  page(t) {
    const K = t >= this.tKey ? 'key' : 'blue';                 // trước lượt key: nét in bằng xanh, mảnh
    const kk = clamp((t - this.tKey) / 0.12);
    const line = (c, w) => { c.lineWidth = K === 'key' ? w : Math.max(1, w * 0.4); };
    // trục
    R.ink(K, c => { line(c, 4); c.beginPath(); c.moveTo(O.x - 30, O.y); c.lineTo(X(2.2), O.y); c.moveTo(O.x, O.y + 30); c.lineTo(O.x, Y(13)); c.stroke(); });
    // một khoảnh khắc: vạch mảnh tại t = 1.3
    if (t < this.tGather) {
      R.ink('pink', c => { c.fillRect(X(1.3) - 3, Y(f(1.3)), 6, f(1.3) * O.sy); });
      R.ink(K, c => { c.font = '500 28px "IBM Plex Mono"'; c.fillText('one moment: 3t² = 5.07', X(1.3) + 16, Y(f(1.3)) - 12); });
      if (t >= this.tWhole) R.ink(K, c => { line(c, 3); c.setLineDash([12, 10]); c.beginPath(); c.moveTo(X(0), O.y); for (let u = 0; u <= 2.0001; u += 0.02) c.lineTo(X(u), Y(f(u))); c.lineTo(X(2), O.y); c.stroke();
        c.setLineDash([]); c.font = '500 28px "IBM Plex Mono"'; c.fillText('the whole = ?', X(1.5), Y(4)); });
    }
    // gom mảnh: 24 dải bay về chỗ; chiếc xe quét qua biến dải thành vùng đặc
    if (t >= this.tGather) {
      const carU = 3.1 * smooth(prog(t, this.tMotion, this.tSee + 0.9));   // xe chạy hẳn ra khỏi khung
      R.ink('pink', c => {
        for (let i = 0; i < N; i++) {
          const p = smooth(clamp((t - this.tGather - i * 0.05) / 0.7)), u0 = 2 * i / N, h = f(2 * (i + 0.5) / N) * O.sy;
          if (u0 + 2 / N < carU) continue;
          const hx = hash(i * 3.1) * W, hy = hash(i * 5.7) * H * 0.6;
          c.fillRect(lerp(hx, X(u0) + 2, p), lerp(hy, O.y - h, p), 2 / N * O.sx - 4, h);
        }
      });
      if (carU > 0) R.ink('blue', c => { c.beginPath(); c.moveTo(X(0), O.y); for (let u = 0; u <= Math.min(2, carU) + 1e-9; u += 0.01) c.lineTo(X(u), Y(f(u))); c.lineTo(X(Math.min(2, carU)), O.y); c.closePath(); c.fill(); });
      if (t >= this.tMotion && carU < 3.1) R.ink('pink', c => { const x = X(carU); c.beginPath(); c.roundRect(x - 70, O.y + 26, 140, 40, 10); c.fill(); c.beginPath(); c.roundRect(x - 36, O.y - 2, 70, 32, 10); c.fill(); });
      if (t >= this.tForm) R.ink(K, c => { c.font = '900 72px "Archivo"'; c.fillText('TOTAL = 8', X(0.1), Y(10)); });
    }
    // lượt KEY: chữ K khổng lồ dập + đường cong viền + nhãn tích phân
    if (t >= this.tKey) {
      R.ink('key', c => { c.lineWidth = 6; c.beginPath(); for (let u = 0; u <= 2.0001; u += 0.01) u === 0 ? c.moveTo(X(u), Y(f(u))) : c.lineTo(X(u), Y(f(u))); c.stroke();
        c.font = '800 48px "Archivo"'; c.fillText('∫₀² 3t² dt = 8', X(1.05), Y(12.5)); });
      stamp('K', 1360, 720, '900 600px "Archivo"', { k: kk, ink: 'key', shadow: 'yellow', off: [16, 12] });
      R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText('K = KEY PLATE', 1370, 800); });
    }
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 130, y: 170, px: 80, key: K }));
  }
}
