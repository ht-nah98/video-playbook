// Hệ hình cố định của video toán kênh Anh (người dùng duyệt 2026-11-02, LESSONS §245): nền sáng + lưới (đổi 11-02 sau khi xem MathVis), thẻ viền màu, dải chữ câu chốt, Archivo / IBM Plex Mono,
// sin vàng đậm, cos xanh, tan tím, số âm đỏ, cặp nhân vật 99 (_kit/nine.js). Sáng tạo nằm ở hình minh hoạ từng ý, không đổi các thứ dưới đây.

export const C = { bg: '#F3F5FA', grid: 'rgba(60,80,130,.07)', ink: '#1E2A44', dim: 'rgba(30,42,68,.6)', faint: 'rgba(30,42,68,.14)',
  sin: '#D98A00', cos: '#1C7FC4', tan: '#7A4FD0', neg: '#D93A4A', panel: '#FFFFFF', a: '#EE8A2E', b: '#1FA67A' };
export const FONT = { head: w => `800 ${w}px "Archivo"`, black: w => `900 ${w}px "Archivo"`, mono: w => `500 ${w}px "IBM Plex Mono"` };

export function bg(g, ox = 0, oy = 0) {
  g.fillStyle = C.bg; g.fillRect(0, 0, 1920, 1080);
  g.strokeStyle = C.grid; g.lineWidth = 2; g.beginPath();
  const dx = ((ox % 60) + 60) % 60, dy = ((oy % 60) + 60) % 60;
  for (let x = dx; x <= 1920; x += 60) { g.moveTo(x, 0); g.lineTo(x, 1080); }
  for (let y = dy; y <= 1080; y += 60) { g.moveTo(0, y); g.lineTo(1920, y); }
  g.stroke();
}
export function txt(g, s, x, y, font, col, al = 'center', a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = font; g.fillStyle = col; g.textAlign = al; g.textBaseline = 'middle'; g.fillText(s, x, y); g.restore();
}
export function seg(g, a, b, c, d, col, w = 6, k = 1, dash) {
  if (k <= 0) return; g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(a, b); g.lineTo(a + (c - a) * k, b + (d - b) * k); g.stroke(); g.restore();
}
export function dot(g, x, y, r, col) { g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
export const popK = k => { k = Math.max(0, Math.min(1, k)); const e = u => u * u * (3 - 2 * u); return k < .6 ? 1.25 * e(k / .6) : 1.25 - .25 * e((k - .6) / .4); };
export function popped(g, x, y, k, fn) { if (k <= 0) return; const s = popK(k); g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); }
/** Dấu ? ! phía trên người que: một ký tự, vàng. */
export function mark(g, ch, x, y, k, col = C.sin, size = 110) { popped(g, x, y, k, () => txt(g, ch, x, y, FONT.black(size), col)); }
export function ground(g, y = 860, x0 = 60, x1 = 1860) { seg(g, x0, y, x1, y, C.dim, 4); }
/** Thẻ bo góc viền màu: mọi kết quả quan trọng nằm trong thẻ. */
export function card(g, x, y, w, h, edge = C.ink, a = 1) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = C.panel; g.strokeStyle = edge; g.lineWidth = 5; g.beginPath(); g.roundRect(x, y, w, h, 20); g.fill(); g.stroke(); g.restore(); }
/** Đường tròn đơn vị: trục + vành; k vẽ dần. */
export function unit(g, cx, cy, r, { k = 1, axis = 1 } = {}) {
  if (axis > 0) { seg(g, cx - r - 70, cy, cx + r + 70, cy, C.dim, 3, axis); seg(g, cx, cy + r + 50, cx, cy - r - 50, C.dim, 3, axis); }
  if (k > 0) { g.strokeStyle = C.ink; g.lineWidth = 7; g.beginPath(); g.arc(cx, cy, r, 0, -Math.min(1, k) * 2 * Math.PI, true); g.stroke(); }
}
/** Điểm trên đường tròn; th tính bằng radian, ngược chiều kim đồng hồ từ bên phải. */
export const onCircle = (cx, cy, r, th) => [cx + r * Math.cos(th), cy - r * Math.sin(th)];
/** Khung máy tính với chế độ DEG/RAD; val tô col. */
export function calculator(g, x, y, mode, val, col, s = 1, a = 1, expr = 'sin 30') {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
  g.fillStyle = C.panel; g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.roundRect(-230, -150, 460, 300, 26); g.fill(); g.stroke();
  txt(g, mode, -196, -104, FONT.mono(32), C.dim, 'left'); txt(g, expr, 196, -40, FONT.mono(56), C.ink, 'right'); txt(g, val, 196, 62, FONT.head(92), col, 'right'); g.restore();
}
