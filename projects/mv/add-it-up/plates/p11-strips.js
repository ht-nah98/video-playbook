// P11 strips — "Cắt nhỏ": 2 · 4 · 8 dải ĐÚNG chữ, rồi 16 · 32 · 64 · 128 trên beat; tổng Riemann → 8. Dải mỏng sinh
// moiré với lưới tram (mảnh đã nhỏ hơn mắt phân biệt). Phóng một dải: dt × 3t². Cộng dải từ trái sang phải vào bồn.
import { W, H, clamp, smooth, prog, lerp, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, stamp } from '../kit.js';
import { G, X, Y, f, tank, rateGraph, strips, riemann } from '../tank.js';

export default class P11 {
  feed = 0;   // nối liền P10 (cùng đồ thị, cùng bồn)
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('So break it down.'); this.t2 = L('Two strips.'); this.t4 = L('Four strips.'); this.t8 = L('Eight, then more.');
    this.tSmall = L('Smaller and smaller,'); this.tWidth = L('Every little width,'); this.tAdd = L('add them together');
    this.tFade = L('And as the pieces'); this.tSame = L('the staircase and the curve'); this.end = L('No single moment');
    const b = s.beat, i0 = b.beatIndex(this.t8 + 0.5) + 1;
    this.more = [16, 32, 64].map((n, j) => [b.beatT(i0 + j), n]);              // "then more": mỗi beat gấp đôi
    this.fine = [32, 64, 128, 256, 512].map((n, j) => [lerp(this.tFade, this.tSame + 0.6, j / 4), n]);
  }
  n(t) {
    if (t < this.t2) return 1;
    let n = t < this.t4 ? 2 : t < this.t8 ? 4 : 8;
    for (const [tb, m] of this.more) if (t >= tb) n = m;
    if (t >= this.tWidth) n = 16;                                               // đếm từng dải: quay về 16 để nhìn thấy
    if (t >= this.tFade) for (const [tb, m] of this.fine) if (t >= tb) n = m;
    return n;
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 2.6 - 1.2 * smooth(prog(t, this.t0, this.t0 + 0.3)), pass: 3 }); }   // P10 kết ở 2.6
  page(t) {
    const n = this.n(t), sum = riemann(n);
    rateGraph(2);
    // dao xén: một nhát ở giữa khi "break it down"
    const cut = prog(t, this.t0, this.t0 + 0.3);
    if (t < this.t2) {
      R.ink('pink', c => { c.fillStyle = R.tint('pink', 0.55, 9); c.fillRect(X(0), Y(12), 2 * G.sx, 12 * G.sy); });
      // tiếp đúng khung cuối P10: phần thừa (hồng + vàng) và con dấu sai còn đó tới khi dao xén xong
      R.ink('yellow', c => { c.beginPath(); c.moveTo(X(0), Y(12)); for (let v = 0; v <= 2.0001; v += 0.02) c.lineTo(X(v), Y(f(v))); c.lineTo(X(2), Y(12)); c.closePath(); c.fill(); });
      stamp('12 × 2 = 24 ≠ 8', X(0.08), Y(10.4), '900 64px "Archivo"', { shadow: 'pink' });
      R.ink('key', c => { c.beginPath(); c.arc(X(2), Y(12), 12, 0, 7); c.fill(); });   // chấm của P10
      R.ink('key', c => { c.lineWidth = 4; c.strokeRect(X(0), Y(12), 2 * G.sx, 12 * G.sy); c.lineWidth = 6; c.beginPath(); c.moveTo(X(1), Y(13.5)); c.lineTo(X(1), Y(13.5) + (G.oy - Y(13.5) + 20) * cut); c.stroke(); });
    } else strips(n, { stair: n <= 128 });
    // bộ đếm
    if (t >= this.t2) {
      R.ink('key', c => { c.font = '900 150px "Archivo"'; c.fillText(String(n), X(0.12), 300); const w = c.measureText(String(n)).width;
        c.font = '800 44px "Archivo"'; c.fillText(n === 1 ? 'STRIP' : 'STRIPS', X(0.12) + w + 16, 300);
        c.font = '500 34px "IBM Plex Mono"'; c.fillText(`sum = ${sum.toFixed(4)}`, X(0.12), 360); });
    }
    // phóng một dải: dt × 3t²
    if (t >= this.tWidth && t < this.tAdd + 0.4) {
      const i = 11, u0 = 2 * i / 16, u1 = 2 * (i + 1) / 16, k = smooth(prog(t, this.tWidth, this.tWidth + 0.3)), fly = smooth(prog(t, this.tAdd, this.tAdd + 0.4)) * -900;
      strips(16, { ink: 'blue', stair: false, only: i });
      const bx = 400, by = 380 + fly, s = 2.2 * k, w = (u1 - u0) * G.sx * s, h = f(u1) * G.sy * 0.5 * s;
      R.ink('blue', c => c.fillRect(bx, by + 330 - h, w, h));
      R.ink('key', c => { c.lineWidth = 3; c.strokeRect(bx, by + 330 - h, w, h);
        if (k >= 1) { c.font = '800 40px "Archivo"'; c.fillText('dt', bx + w / 2 - 18, by + 380); c.fillText('3t²', bx + w + 16, by + 330 - h / 2);
          c.font = '500 26px "IBM Plex Mono"'; c.fillText('one piece = 3t² · dt', bx - 60, by + 430); } });
    }
    // cộng từ trái sang phải: từng dải bay vào bồn
    let lvl = 8;
    if (t >= this.tAdd) {
      lvl = 8 * (1 - smooth(prog(t, this.tAdd, this.tAdd + 0.3)));   // bồn rút trong 0.3s rồi mảnh đổ vào lại
      for (let i = 0; i < 16; i++) {
        const ts = this.tAdd + i * 0.14, p = clamp((t - ts) / 0.35);
        const a = f(2 * (i + 1) / 16) * 2 / 16;
        if (p >= 1) { lvl += a; continue; }
        if (p <= 0) continue;
        const sx = X(2 * i / 16), sy = G.oy - f(2 * (i + 1) / 16) * G.sy, tx = 1230, ty = 160;
        const x = lerp(sx, tx, p), y = lerp(sy, ty, p) - Math.sin(p * Math.PI) * 160;
        R.ink('pink', c => { c.translate(x, y); c.rotate(p * 2); c.fillRect(-12, -30, 24, 60); });
      }
      if (t >= this.tFade) lvl = riemann(n);                    // dải mỏng dần: bồn → 8
    }
    tank({ level: t >= this.tAdd ? Math.min(lvl, 16) : 8, ghost: t < this.tFade ? sum : null, flow: 1 });   // ống vào giữ nguyên như P10 (dòng ở t = 2)
    if (t >= this.tSame) stamp('→ 8', X(0.12), 480, '900 90px "Archivo"', { k: (t - this.tSame) / 0.15, shadow: 'yellow' });
    lyrics(this.s, t, this.s.tl.at("doesn't fit the line."), this.end);   // từ dòng cuối của P10: xén nó ra
  }
}
