// Hình của điệp khúc 2 (P17): đồ thị trong hệ toạ độ mà đường y = x TRÙNG đường gương MIRROR của màn hình,
// nên ảnh qua gương của đường cong mũ đúng là đường cong log. Thêm gương thứ hai vuông góc, mảnh kính vỡ,
// và "sảnh gương" (khung lồng nhau lùi vào sâu) — thế giới của cú bùng nổ.
import { clamp, hash, outExpo } from '../../../engine/lib.js';
import { line, drawMirrorLine } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';
import { GLASS } from './glass.js';

// G(u, v) = (OX + S·u, OY − S·v); OX + OY = 1500 ⇒ u = v ↔ đường x + y = 1500 (MIRROR).
export const OX = 700, OY = 800, S = 120;
export const G = (u, v) => [OX + S * u, OY - S * v];
export const MIRROR2 = line(420, 0, 1500, 1080);               // gương thứ hai: vuông góc, qua tâm khung

/** Đường cong mũ v = 2^u (vàng) hoặc ảnh của nó u = 2^v (xanh, log). k = tiến độ vạch. */
export function curve(g, k, { log = false, col = log ? PAL.back : PAL.fwd, width = 7, alpha = 1, u0 = -5.8, u1 = 2.75 } = {}) {
  if (k <= 0 || alpha <= 0) return;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.lineCap = 'round';
  g.shadowColor = col; g.shadowBlur = 24;
  g.beginPath();
  const end = u0 + (u1 - u0) * k;
  for (let u = u0; u <= end + 1e-9; u += 0.04) {
    const v = 2 ** u, [x, y] = log ? G(v, u) : G(u, v);
    u === u0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke(); g.restore();
}

/** Hai trục mờ. */
export function axes(g, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = alpha * k; g.strokeStyle = PAL.truth; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-200, OY); g.lineTo(2120, OY); g.moveTo(OX, -200); g.lineTo(OX, 1280); g.stroke();
  g.restore();
}

/** Mảnh kính: lưới 9×6 ô méo, mỗi ô bay ra từ tâm, xoay, phóng to về phía camera. k ∈ [0,1]. */
export function shards(g, k) {
  if (k <= 0 || k >= 1) return;
  const { x0, y0, x1, y1 } = GLASS, nx = 9, ny = 6, w = (x1 - x0) / nx, h = (y1 - y0) / ny;
  const P = (i, j) => {                                       // đỉnh lưới có rung (mép giữ thẳng)
    const ex = i === 0 || i === nx, ey = j === 0 || j === ny;
    return [x0 + i * w + (ex ? 0 : (hash(i * 7.1 + j * 3.3) - 0.5) * w * 0.7), y0 + j * h + (ey ? 0 : (hash(i * 2.9 + j * 8.7) - 0.5) * h * 0.7)];
  };
  const e = outExpo(k);
  g.save(); g.lineJoin = 'round';
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
    const pts = [P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)];
    const cx = pts.reduce((a, p) => a + p[0], 0) / 4, cy = pts.reduce((a, p) => a + p[1], 0) / 4;
    const dx = cx - 960, dy = cy - 520, d = Math.hypot(dx, dy) || 1, sp = 900 + 900 * hash(i * 5.5 + j);
    const tx = dx / d * sp * e, ty = dy / d * sp * e + 300 * k * k, rot = (hash(i + j * 9.3) - 0.5) * 4 * e, sc = 1 + 1.4 * e;
    g.save(); g.translate(cx + tx, cy + ty); g.rotate(rot); g.scale(sc, sc); g.translate(-cx, -cy);
    g.globalAlpha = 1 - k;
    g.beginPath(); pts.forEach(([x, y], q) => (q ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath();
    g.fillStyle = 'rgba(189,232,255,0.16)'; g.fill();
    g.strokeStyle = PAL.truth; g.lineWidth = 3; g.stroke();
    g.restore();
  }
  g.restore();
}

/** Sảnh gương: khung lồng nhau lùi vào sâu, xoay dần, sáng theo beat — thế giới của điệp khúc 2. */
export function mirrorHall(g, t, { alpha = 1, pulse = 0, spin = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.translate(960, 540);
  for (let k = 0; k < 12; k++) {
    const z = ((k + (t * 0.6) % 1) / 12), sc = 2.2 * Math.pow(0.78, z * 12);   // trôi vào sâu liên tục
    g.save(); g.rotate(spin + z * 1.1 + t * 0.05); g.scale(sc, sc);
    g.globalAlpha = alpha * (0.06 + 0.22 * z * (1 - z) * 4) * (1 + 0.8 * pulse);
    g.strokeStyle = k % 2 ? PAL.back : PAL.truth; g.lineWidth = 4 / sc;
    g.strokeRect(-860, -480, 1720, 960);
    g.restore();
  }
  g.restore();
}

/** Điểm chạy trên đường cong: từ trục ngang lên đường cong rồi sang trục dọc (forward), hoặc ngược lại cho log. */
export function trace(g, u, k1, k2, { log = false, inLabel, outLabel, col = log ? PAL.back : PAL.fwd } = {}) {
  if (k1 <= 0) return;
  const v = 2 ** u, [px, py] = log ? G(v, u) : G(u, v), [ax, ay] = [px, OY], [bx, by] = [OX, py];
  g.save(); g.strokeStyle = col; g.lineWidth = 4; g.setLineDash([14, 10]);
  g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax, ay + (py - ay) * clamp(k1)); g.stroke();
  if (k2 > 0) { g.beginPath(); g.moveTo(px, py); g.lineTo(px + (bx - px) * clamp(k2), py); g.stroke(); }
  g.setLineDash([]); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 20;
  g.font = '900 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(inLabel, ax, ay + 60);
  if (k1 >= 1) { g.beginPath(); g.arc(px, py, 14, 0, Math.PI * 2); g.fill(); }
  if (k2 >= 1) g.fillText(outLabel, bx - 64, by);
  g.restore();
}


/** Lưới neon của hệ G (trang sổ P19 trên nền tối). */
export function neonGrid(g, a = 1) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = 0.11 * a; g.strokeStyle = PAL.backCore; g.lineWidth = 2; g.beginPath();
  for (let i = -8; i <= 14; i++) { g.moveTo(OX + S * i, -600); g.lineTo(OX + S * i, 1700); }
  for (let j = -8; j <= 12; j++) { g.moveTo(-800, OY - S * j); g.lineTo(2700, OY - S * j); }
  g.stroke(); g.restore();
}

/** Đồ thị trọn: lưới, trục, đường mũ (k), đường log (kl), gương (km). */
export function graph(g, { k = 1, kl = 0, km = 0, a = 1 } = {}) {
  neonGrid(g, a); axes(g, 1, { alpha: 0.55 * a });
  drawMirrorLine(g, MIRROR, km, { width: 4, glow: 22 });
  curve(g, kl, { log: true, alpha: a }); curve(g, k, { alpha: a });
}

