// P08 forgot — "Có lẽ chỉ cần phần thay đổi" (pre 1, hát). Điểm xuất phát vàng mờ dần (tram thưa dần — không alpha);
// đi ngược tách thành chùm; cột a, b; chỉ đoạn a→b in đậm; 5 cú trống dồn hút 5 dải hồng lên máy.
import { W, H, clamp, smooth, prog, lerp } from '../../../../engine/lib.js';
import { R, sheet, lyrics, plot } from '../kit.js';
import { CUE } from '../song.js';

const P = u => [lerp(300, 1600, u), lerp(640, 360, u) - 90 * Math.sin(u * Math.PI * 2.2)];   // đường hành trình, u ∈ [0,1]
const A = 0.3, B = 0.78;

export default class P08 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('If the rate forgot'); this.tBack = L('maybe going backward'); this.tNeed = L("But maybe we don't need");
    this.tAll = L('Maybe all we need'); this.end = L('Add it up,');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 1 + 2 * prog(t, CUE.build[0], this.end), pass: 3 }); }
  page(t) {
    const path = (c, a, b) => { c.beginPath(); for (let u = a; u <= b + 1e-9; u += 0.005) { const [x, y] = P(u); u === a ? c.moveTo(x, y) : c.lineTo(x, y); } };
    const draw = smooth(prog(t, this.t0, this.t0 + 1.2));
    R.ink('blue', c => { c.lineWidth = 8; c.setLineDash([2, 14]); c.lineCap = 'round'; path(c, 0, draw); c.stroke(); });
    // điểm xuất phát: tram vàng thưa dần tới hết (quên nơi bắt đầu)
    const fade = 1 - smooth(prog(t, this.t0 + 1.2, this.tBack));
    const [sx, sy] = P(0);
    if (fade > 0) R.ink('yellow', c => { c.fillStyle = R.tint('yellow', 0.85 * fade, 8); c.beginPath(); c.arc(sx, sy, 46, 0, 7); c.fill(); });
    R.ink('key', c => { c.lineWidth = 3; c.setLineDash([6, 8]); c.beginPath(); c.arc(sx, sy, 46, 0, 7); c.stroke();
      c.setLineDash([]); c.font = '500 24px "IBM Plex Mono"'; c.fillText(fade > 0.05 ? 'start' : 'start = ?', sx - 50, sy + 84); });
    const [ex, ey] = P(1);
    R.ink('key', c => { c.beginPath(); c.arc(ex, ey, 14, 0, 7); c.fill(); });
    // đi ngược: chùm 5 đường đứt về 5 điểm xuất phát khác nhau
    const fk = smooth(prog(t, this.tBack, this.tBack + 0.8));
    if (fk > 0) for (let i = 0; i < 5; i++) {
      const dy = (i - 2) * 95;
      R.ink('key', c => { c.lineWidth = 3; c.setLineDash([12, 10]); c.beginPath();
        for (let u = 1; u >= 1 - fk - 1e-9; u -= 0.01) { const [x, y] = P(u); const yy = y + dy * (1 - u); u === 1 ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke(); });
      if (fk >= 1) R.ink('yellow', c => { c.beginPath(); c.arc(sx, sy + dy, 18, 0, 7); c.fill(); });
    }
    // cột a, b
    for (const [u, nm, i] of [[A, 'a', 0], [B, 'b', 1]]) {
      const k = clamp((t - this.tNeed - i * 0.25) / 0.15); if (k <= 0) continue;
      const [x] = P(u);
      R.ink('key', c => { c.lineWidth = 5; c.beginPath(); c.moveTo(x, 120 + (1 - k) * -200); c.lineTo(x, 820); c.stroke();
        c.font = '900 64px "Archivo"'; c.textAlign = 'center'; c.fillText(nm, x, 110); });
    }
    // chỉ phần thay đổi giữa a và b: in đậm + ngoặc
    const ck = smooth(prog(t, this.tAll, this.tAll + 0.8));
    if (ck > 0) {
      R.ink('blue', c => { c.lineWidth = 18; c.lineCap = 'round'; path(c, A, A + (B - A) * ck); c.stroke(); });
      if (ck >= 1) { const [ax, ay] = P(A), [bx, by] = P(B);
        R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.moveTo(bx + 40, ay); c.lineTo(bx + 60, ay); c.lineTo(bx + 60, by); c.lineTo(bx + 40, by); c.stroke();
          c.font = '800 40px "Archivo"'; c.fillText('F(b) − F(a)', bx + 80, (ay + by) / 2 + 14); }); }
    }
    // trống dồn: mỗi cú hút một dải hồng lên khỏi mép trên
    CUE.build.forEach((tb, i) => {
      const p = clamp((t - tb) / 0.4); if (p <= 0 || p >= 1) return;
      R.ink('pink', c => c.fillRect(380 + i * 280, lerp(1150, -400, p * p), 70, 320));
    });
    lyrics(this.s, t, this.t0, this.end);
  }
}
