// Cỗ máy ∫ của bài: đường giấy hình chữ S kéo dài (∫ = summa của Leibniz). Dải vào khe trên (đầu vào, hồng), chạy
// dọc chữ S, đáp xuống khay dưới thành tổng (xanh). Dùng ở P09b, P13, P18, P20, P23 — cảnh chỉ đổi thẻ nạp.
import { clamp, smooth, hash, lerp } from '../../../engine/lib.js';
import { R } from './kit.js';

// chữ S kéo dài, toạ độ chuẩn hoá theo chiều cao (0 = đầu trên, 1 = đáy); cong phải ở trên, cong trái ở dưới
const CP = [[0.46, 0.04], [0.36, -0.02], [0.24, 0.02], [0.16, 0.14], [0.11, 0.34], [0.06, 0.56], [0.01, 0.76], [-0.05, 0.92], [-0.15, 1.0], [-0.28, 1.0], [-0.36, 0.95]];
const crom = (p0, p1, p2, p3, u) => {
  const u2 = u * u, u3 = u2 * u;
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
};
const RAW = []; for (let i = 0; i < CP.length - 1; i++) for (let k = 0; k < 24; k++) {
  const a = CP[Math.max(0, i - 1)], b = CP[i], c = CP[i + 1], d = CP[Math.min(CP.length - 1, i + 2)], u = k / 24;
  RAW.push([crom(a[0], b[0], c[0], d[0], u), crom(a[1], b[1], c[1], d[1], u)]);
}
RAW.push(CP[CP.length - 1]);
const LEN = [0]; for (let i = 1; i < RAW.length; i++) LEN.push(LEN[i - 1] + Math.hypot(RAW[i][0] - RAW[i - 1][0], RAW[i][1] - RAW[i - 1][1]));
const TOT = LEN[LEN.length - 1];
/** Điểm trên đường giấy theo độ dài cung s ∈ [0,1] → [x, y, góc] (chuẩn hoá). */
export function pathAt(s) {
  const L = clamp(s) * TOT; let i = 1; while (i < LEN.length - 1 && LEN[i] < L) i++;
  const u = (L - LEN[i - 1]) / (LEN[i] - LEN[i - 1] || 1), a = RAW[i - 1], b = RAW[i];
  return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), Math.atan2(b[1] - a[1], b[0] - a[0])];
}

/**
 * Vẽ cỗ máy. M = { x, y, h } (x = trục chữ S, y = đỉnh). card: nhãn thẻ nạp ở khe vào; out: nhãn khay.
 * strips: [{ s ∈ [0,1] vị trí trên đường giấy, len (px), ink }] — dải đang chạy.
 */
export function press(M, { card = null, out = null, strips = [], a = 'a', b = 'b', cardInk = 'pink' } = {}) {
  const P = s => { const [u, v, ang] = pathAt(s); return [M.x + u * M.h, M.y + v * M.h, ang]; };
  const band = c => { c.beginPath(); for (let s = 0; s <= 1.0001; s += 0.01) { const [x, y] = P(s); s === 0 ? c.moveTo(x, y) : c.lineTo(x, y); } };
  const bw = M.h * 0.085;
  R.ink('blue', c => { c.strokeStyle = R.tint('blue', 0.22, 8); c.lineWidth = bw; c.lineCap = 'round'; band(c); c.stroke(); });
  R.ink('key', c => {
    c.lineCap = 'round'; c.lineWidth = bw + 8; band(c); c.stroke();
    c.globalCompositeOperation = 'destination-out'; c.lineWidth = bw; band(c); c.stroke(); c.globalCompositeOperation = 'source-over';
    for (const s of [0.18, 0.4, 0.62, 0.84]) { const [x, y] = P(s); c.beginPath(); c.arc(x, y, bw * 0.16, 0, 7); c.fill(); }   // con lăn dẫn giấy
    // giới hạn như ký hiệu thật: b ở đầu trên, a ở đầu dưới
    c.font = `800 ${Math.round(M.h * 0.07)}px "Archivo"`;
    const [tx, ty] = P(0), [ex, ey] = P(1);
    c.fillText(b, tx + bw * 0.9, ty - bw * 0.2); c.fillText(a, ex - bw * 1.6, ey + bw * 1.1);
    c.font = `500 ${Math.round(M.h * 0.024)}px "IBM Plex Mono"`; c.fillText('∫ = summa', M.x + M.h * 0.14, M.y + M.h * 0.5);
  });
  // thẻ nạp ở khe vào
  if (card) {
    const [tx, ty] = P(0), w = M.h * 0.3, h = M.h * 0.11, cx = tx + w * 0.25, cy = ty - h * 1.35;
    R.ink(cardInk, c => c.fillRect(cx - w / 2, cy - h / 2, w, h));
    R.ink('key', c => { c.lineWidth = 3; c.strokeRect(cx - w / 2, cy - h / 2, w, h);
      c.font = `800 ${Math.round(h * 0.55)}px "Archivo"`; c.textAlign = 'center'; c.fillText(card, cx, cy + h * 0.2);
      c.font = `500 ${Math.round(h * 0.2)}px "IBM Plex Mono"`; c.fillText('INPUT', cx, cy - h * 0.62); });
  }
  if (out) {
    const [ex, ey] = P(1);
    R.ink('key', c => { c.font = `500 ${Math.round(M.h * 0.024)}px "IBM Plex Mono"`; c.fillText('OUTPUT', ex - M.h * 0.05, ey + M.h * 0.1);
      c.font = `800 ${Math.round(M.h * 0.06)}px "Archivo"`; c.fillText(out, ex - M.h * 0.05, ey + M.h * 0.17); });
  }
  for (const st of strips) {
    if (st.s < 0 || st.s > 1) continue;
    const [x, y, ang] = P(st.s);
    R.ink(st.ink || 'pink', c => { c.translate(x, y); c.rotate(ang); c.fillRect(-st.len / 2, -bw * 0.32, st.len, bw * 0.64); });
  }
  return P;
}
/** Dòng dải chạy liên tục: một dải mỗi `every` giây từ t0, mỗi dải đi hết đường giấy trong `dur` giây. */
export function flow(t, t0, every = 0.155, dur = 1.1, t1 = Infinity) {
  const out = []; if (t < t0) return out;
  const n1 = Math.floor((Math.min(t, t1) - t0) / every);
  for (let n = Math.max(0, n1 - Math.ceil(dur / every) - 1); n <= n1; n++) {
    const s = (t - (t0 + n * every)) / dur; if (s >= 0 && s <= 1) out.push({ n, s, len: 50 + hash(n * 1.7) * 70 });
  }
  return out;
}
