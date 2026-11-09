// Bồn mực + đồ thị lưu lượng 3t² trên [0, 2] — vật sống qua Verse 2 (P10, P11) và trở lại ở P13/P14/P15.
// Toán: lượng trong bồn = ∫₀ᵗ 3s² ds = t³; ở t = 2 → 8. Tổng Riemann phải: n=1 → 24, 2 → 15, 4 → 11.25, 8 → 9.5625 …
import { clamp } from '../../../engine/lib.js';
import { R } from './kit.js';

export const G = { ox: 150, oy: 880, sx: 380, sy: 50 };          // t ∈ [0, 2] → 760px, f ∈ [0, 12] → 600px
export const X = u => G.ox + u * G.sx, Y = v => G.oy - v * G.sy;
import { rate as f, amount as F, riemann } from './math.js';
export { f, F, riemann };
export const TANK = { x: 1080, y: 200, w: 300, h: 680, cap: 16 };   // dung tích 16 đơn vị: vạch 8 ở giữa
const unit = TANK.h / TANK.cap;

/** Bồn: mực xanh tới `level`; `ghost` = ước lượng (viền đứt, có thể tràn); `flow` ∈ [0,1] kim đồng hồ ống vào. */
export function tank({ level = 0, ghost = null, flow = null, marks = true } = {}) {
  const { x, y, w, h } = TANK, ly = y + h - level * unit;
  if (level > 0) {
    R.ink('blue', c => { c.fillStyle = R.tint('blue', 0.55, 8); c.fillRect(x, Math.max(y, ly), w, Math.min(h, level * unit)); });
    R.ink('blue', c => c.fillRect(x, Math.max(y, ly) - 3, w, 7));
  }
  R.ink('key', c => {
    c.lineWidth = 6; c.beginPath(); c.moveTo(x, y - 20); c.lineTo(x, y + h); c.lineTo(x + w, y + h); c.lineTo(x + w, y - 20); c.stroke();
    if (marks) { c.font = '500 24px "IBM Plex Mono"'; c.lineWidth = 2;
      for (let i = 2; i <= TANK.cap; i += 2) { const yy = y + h - i * unit; c.beginPath(); c.moveTo(x + w, yy); c.lineTo(x + w + 18, yy); c.stroke(); c.fillText(String(i), x + w + 26, yy + 8); } }
    c.lineWidth = 3; c.setLineDash([12, 8]); const y8 = y + h - 8 * unit; c.beginPath(); c.moveTo(x - 30, y8); c.lineTo(x + w + 18, y8); c.stroke(); c.setLineDash([]);
    c.font = '800 34px "Archivo"'; c.fillText('8', x - 60, y8 + 12);
  });
  if (ghost != null) {
    const gy = y + h - ghost * unit;
    R.ink('key', c => { c.lineWidth = 4; c.setLineDash([14, 10]); c.strokeRect(x + 8, gy, w - 16, y + h - gy); c.setLineDash([]);
      c.font = '800 40px "Archivo"'; c.fillText(ghost.toFixed(ghost % 1 ? (ghost * 100 % 1 ? 4 : 2) : 0), x + 24, gy - 14); });
    if (ghost > TANK.cap) R.ink('pink', c => {          // tràn: ước lượng vượt bồn
      for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(x + w + 30 + i * 22, y + 40 + i * 70, 16, 34, 0, 0, 7); c.fill(); }
    });
  }
  if (flow != null) {                                   // ống vào từ bên phải + đồng hồ lưu lượng trên ống
    const px = x + w - 90;
    R.ink('key', c => { c.lineWidth = 5; c.beginPath(); c.moveTo(x + w + 330, y - 110); c.lineTo(px, y - 110); c.lineTo(px, y + 10);
      c.moveTo(x + w + 330, y - 70); c.lineTo(px + 40, y - 70); c.lineTo(px + 40, y + 10); c.stroke(); });
    R.ink('pink', c => { c.fillRect(px + 8, y - 102, x + w + 322 - px, 24); c.fillRect(px + 8, y - 102, 24, 112 + 60 * clamp(flow)); });
    const gx = x + w + 200, gy = y - 120, a = Math.PI * (1.1 + 0.8 * clamp(flow));
    R.ink('key', c => { c.lineWidth = 4; c.beginPath(); c.arc(gx, gy, 50, Math.PI, 2 * Math.PI); c.stroke();
      c.lineWidth = 6; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + 44 * Math.cos(a), gy + 44 * Math.sin(a)); c.stroke();
      c.font = '500 20px "IBM Plex Mono"'; c.fillText('FLOW', gx - 26, gy - 60); });
  }
}
/** Trục + đường cong 3t² (vẽ tới u1). */
export function rateGraph(u1 = 2, { curve = true, label = true } = {}) {
  R.ink('key', c => {
    c.lineWidth = 3; c.beginPath(); c.moveTo(G.ox - 30, G.oy); c.lineTo(X(2.25), G.oy); c.moveTo(G.ox, G.oy + 30); c.lineTo(G.ox, Y(13)); c.stroke();
    c.font = '500 26px "IBM Plex Mono"'; c.fillText('t', X(2.25) + 12, G.oy + 9); c.fillText('0', G.ox - 8, G.oy + 40); c.fillText('2', X(2) - 8, G.oy + 40);
    c.fillText('12', G.ox - 56, Y(12) + 8); c.lineWidth = 2; c.beginPath(); c.moveTo(G.ox - 12, Y(12)); c.lineTo(G.ox, Y(12)); c.stroke();
    if (label && u1 > 1) c.fillText('f(t) = 3t²', X(1.35), Y(12) + 8);
  });
  if (curve) R.ink('blue', c => { c.lineWidth = 9; c.beginPath(); for (let u = 0; u <= u1 + 1e-9; u += 0.01) { u === 0 ? c.moveTo(X(u), Y(f(u))) : c.lineTo(X(u), Y(f(u))); } c.stroke(); });
}
/** n dải phải (đầu phải) dưới 3t². gap ≤ 3px (dải mỏng → moiré với lưới tram, cố ý). */
export function strips(n, { ink = 'pink', stair = true, only = null } = {}) {
  const w = 2 / n * G.sx, gap = Math.min(3, w * 0.25);
  R.ink(ink, c => { for (let i = 0; i < n; i++) { if (only != null && i !== only) continue; const h = f(2 * (i + 1) / n) * G.sy; c.fillRect(X(2 * i / n) + gap / 2, G.oy - h, w - gap, h); } });
  if (stair) R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.moveTo(X(0), G.oy);
    for (let i = 0; i < n; i++) { const yy = Y(f(2 * (i + 1) / n)); c.lineTo(X(2 * i / n), yy); c.lineTo(X(2 * (i + 1) / n), yy); } c.stroke(); });
}
