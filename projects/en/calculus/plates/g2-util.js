// Đồ dùng chung của nhóm G2 (b07–b11) — hàm cục bộ, KHÔNG sửa kit.js. Báo đạo diễn: nếu nhóm khác cần thì đưa vào kit.
import { W, H, C, clamp, lerp, smooth, outCubic, prog, line, math, measureMath, figure, STRATA, TAU, rr } from '../kit.js';

/** Bay lên khỏi khung (lift 0 → 1) — cho chữ / mũi tên không phải thẻ. */
export const lifted = (g, lift, fn) => { if (lift >= 1) return; g.save(); g.translate(0, -(outCubic(clamp(lift)) ** 1.4) * 700); fn(); g.restore(); };
/** Độ chìm của đồi / đường mòn khi rise 1 → 0. */
export const sinkY = rise => (1 - outCubic(clamp(rise))) * 700;

/** Nội suy mượt qua các mốc [[t, v], …] (t tăng dần). */
export function track(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
    if (t1 < t0) throw new Error('track: mốc không tăng');
    if (t < t1) return lerp(v0, v1, smooth(clamp((t - t0) / Math.max(1e-6, t1 - t0))));
  }
  return keys.at(-1)[1];
}

/** Viết công thức theo từng mảnh, mỗi mảnh hiện dần từ mốc `at` (ghi sổ). parts = [{ s, at, dur, color }]. Trả về bề rộng cả dòng. */
export function typed(g, t, parts, x, y, { px = 56, color = C.ink, wt = 700 } = {}) {
  let cx = x;
  for (const p of parts) {
    const w = measureMath(g, p.s, px, { wt }), k = prog(t, p.at, p.at + (p.dur ?? 0.25));
    if (k > 0) math(g, p.s, cx, y, { px, color: p.color || color, k, wt });
    cx += w;
  }
  return cx - x;
}

/** Đồi cỏ của đường mòn y = x + 5 (VIEWS.trail): đất dưới đường, lớp đất song song với đường. rise: trồi từ dưới; k: vẽ dần từ trái. */
export function trailGround(g, V, { k = 1, rise = 1 } = {}) {
  if (k <= 0 || rise <= 0) return;
  const dy = sinkY(rise), x0 = -60, x1 = W + 60, y0 = V.Y(V.u(x0) + 5), y1 = V.Y(V.u(x1) + 5);
  const poly = off => { const p = new Path2D(); p.moveTo(x0, y0 + off); p.lineTo(x1, y1 + off); p.lineTo(x1, H + 900); p.lineTo(x0, H + 900); p.closePath(); return p; };
  g.save(); g.translate(0, dy);
  if (k < 1) { g.beginPath(); g.rect(-100, -2000, 100 + x0 + (x1 - x0) * clamp(k), 6000); g.clip(); }
  g.fillStyle = C.face; g.fill(poly(0));
  g.save(); g.clip(poly(0));
  const lg = g.createLinearGradient(0, 200, 0, H); lg.addColorStop(0, 'rgba(255,255,230,0.18)'); lg.addColorStop(1, 'rgba(40,80,30,0.10)'); g.fillStyle = lg; g.fillRect(0, -400, W, H + 800);
  g.strokeStyle = 'rgba(62,122,58,0.26)'; g.lineWidth = 2;
  for (const off of [10, 22]) { g.beginPath(); g.moveTo(x0, y0 + off); g.lineTo(x1, y1 + off); g.stroke(); }
  [[40, 0], [104, 1], [190, 2], [310, 3]].forEach(([off, i]) => {
    g.fillStyle = STRATA[i]; g.fill(poly(off));
    g.strokeStyle = 'rgba(110,74,28,0.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y0 + off); g.lineTo(x1, y1 + off); g.stroke(); });
  g.restore();
  g.save(); g.lineCap = 'round'; g.strokeStyle = C.grass; g.lineWidth = 22; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
  g.strokeStyle = C.curve; g.lineWidth = 8; g.stroke(); g.restore();
  g.restore();
}

/** Thước dây vàng nằm ngang từ x0 tới x1 (đã kéo ra theo k) tại y: vạch đen, chiều rộng tối thiểu 6 px. */
export function tapeBar(g, x0, x1, y, { k = 1, th = 18 } = {}) {
  if (k <= 0) return; const xe = x0 + (x1 - x0) * outCubic(clamp(k)), a = Math.min(x0, xe), w = Math.max(6, Math.abs(xe - x0));
  g.save();
  g.fillStyle = 'rgba(40,50,40,0.25)'; g.fill(rr(a + 3, y - th / 2 + 5, w, th, 3));
  g.fillStyle = C.tape; g.fill(rr(a, y - th / 2, w, th, 3));
  g.save(); g.clip(rr(a, y - th / 2, w, th, 3)); for (let px = a + 6; px < a + w; px += 12) line(g, px, y + th / 2, px, y + th / 2 - (((px - a - 6) / 12) % 5 === 0 ? 11 : 6), '#2B2622', 1.5, 'butt'); g.restore();
  g.strokeStyle = '#8A6A1A'; g.lineWidth = 2; g.stroke(rr(a, y - th / 2, w, th, 3));
  g.restore();
}

/** Vòng bút navy vẽ dần quanh (cx, cy). */
export function ring(g, cx, cy, r, k, { w = 6, color = C.ink } = {}) {
  if (k <= 0) return; g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, -2.2, -2.2 + TAU * outCubic(clamp(k)) * 1.02); g.stroke(); g.restore();
}

/** Vết nứt navy chạy qua chữ (cho 0 ÷ 0): pts theo toạ độ màn hình, dy = độ dời. */
export function crackLine(g, pts, k, dy = 0, color = C.ink) {
  if (k <= 0) return; const n = Math.max(2, Math.round(pts.length * clamp(k)));
  g.save(); g.strokeStyle = color; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath();
  pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y + dy) : g.moveTo(x, y + dy)); g.stroke(); g.restore();
}

/** Mascot vào / ra bằng trồi / lặn: list = [{ pose, a (bắt đầu vào), b (bắt đầu ra) }]. */
export function mascots(g, t, list) {
  for (const m of list) {
    const kIn = prog(t, m.a, m.a + 0.5), kOut = prog(t, m.b, m.b + 0.4); if (kIn <= 0 || kOut >= 1) continue;
    g.save(); g.translate(0, outCubic(kOut) * 300); figure(g, m.pose, 205, H, 262, kIn, { t }); g.restore();
  }
}
