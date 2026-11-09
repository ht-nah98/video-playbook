// BÓNG MỜ TẤT ĐỊNH cho bài học (LESSONS §127): không dùng shadowBlur / ctx.filter khi render — Chrome cache mặt nạ mờ
// trên GPU nên khung đổi theo THỨ TỰ chụp (lệch ≤ 6/255), mối nối giữa các đoạn render song song có thể nhảy.
// Bóng hình chữ nhật bo góc = sprite 9 mảnh vẽ MỘT lần trên canvas CPU (willReadFrequently → Skia phần mềm) theo
// (bo góc, độ mờ, màu), rồi kéo giãn tới cỡ cần. Hào quang = gradient tròn. Rút từ projects/en/trig/kit.js (2026-10-21);
// kit trig / logarithm giữ bản chép của mình (không đổi pixel bài đã xong). Màu mặc định là của trig — truyền col theo DNA.
const TAU = Math.PI * 2;
const SPR = {};
const cpu = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return [c, c.getContext('2d', { willReadFrequently: true })]; };
function shadowSprite(r, blur, col) {
  const id = `${r}|${blur}|${col}`; if (SPR[id]) return SPR[id];
  const m = r + 2 * blur, n = 2 * m + 1, [c, x] = cpu(n, n), OFF = 4 * n;
  x.shadowColor = col; x.shadowBlur = blur; x.shadowOffsetX = OFF; x.fillStyle = '#000';
  const p = new Path2D(); p.roundRect(2 * blur - OFF, 2 * blur, 2 * r + 1, 2 * r + 1, r); x.fill(p);
  return (SPR[id] = { c, m });
}
/** Bóng mờ của hình chữ nhật bo góc (x, y, w, h, r) trong hệ toạ độ hiện tại, lệch (ox, oy). */
export function shadowRR(g, x, y, w, h, r = 14, { col = 'rgba(60,70,90,0.20)', blur = 16, ox = 0, oy = 6 } = {}) {
  if (w <= 0 || h <= 0) return;
  r = Math.round(Math.max(0, Math.min(r, w / 2, h / 2))); blur = Math.round(blur);
  const { c, m } = shadowSprite(r, blur, col), X = x - 2 * blur + ox, Y = y - 2 * blur + oy, TW = w + 4 * blur, TH = h + 4 * blur, mid = TW - 2 * m, midh = TH - 2 * m;
  const xs = [[0, m, X, m], [m, 1, X + m, mid], [m + 1, m, X + m + mid, m]], ys = [[0, m, Y, m], [m, 1, Y + m, midh], [m + 1, m, Y + m + midh, m]];
  for (const [sx, sw, dx, dw] of xs) for (const [sy, sh, dy, dh] of ys) if (dw > 0 && dh > 0) g.drawImage(c, sx, sy, sw, sh, dx, dy, dw, dh);
}
/** Vật có bóng: box = [x, y, w, h, r] (hệ toạ độ hiện tại) → bóng sprite, rồi fn() vẽ vật. Không box → không bóng. */
export function shade(g, fn, { col = 'rgba(60,70,90,0.20)', blur = 16, ox = 0, oy = 6, box = null } = {}) {
  if (box) shadowRR(g, box[0], box[1], box[2], box[3], box[4] ?? 14, { col, blur, ox, oy });
  g.save(); fn(); g.restore();
}
/** Hào quang tròn (thay shadowBlur cho bóng đèn, vật phát sáng). rgb = 'r,g,b'. */
export function glow(g, x, y, r, rgb, a = 0.6) {
  if (a <= 0.01 || r <= 0) return;
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.save(); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
}
