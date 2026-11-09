// Đồ dùng chung của nhóm G4 (b14–b19). Không phải cảnh (không nằm trong p2-order). Hàm thuần của tham số.
import { W, H, C, AR, CG, TAU, clamp, outBack, outCubic, shade, rr, line, text, measure, fits, ticket, wheel } from '../kit.js';

export const lerp = (a, b, u) => a + (b - a) * u;
export const inC = u => u * u * u;
/** Bóng đèn vành chạy vòng (vật khác chuyển động khi vòng đứng yên). */
export const chase = t => a => Math.max(0, Math.sin(a * 6 - t * 5)) ** 3;
export const WC = { x: 700, y: 540, R: 290 };
export const EQ_IT = size => `italic 600 ${size}px ${CG}`;

/** Một dòng gồm nhiều mảnh [{ s, font?, color?, k?, g? }] căn giữa cx; draw=false chỉ đo. Trả về { x, w }. */
export function runLine(g, parts, cx, y, size, { gap = 16, draw = true } = {}) {
  const ps = parts.map(p => { const font = p.font || `800 ${size}px ${AR}`; return { ...p, font, w: measure(g, p.s, font) }; });
  const tot = ps.reduce((a, p, i) => a + p.w + (i ? (p.g ?? gap) : 0), 0);
  let x = cx - tot / 2; const x0 = x;
  if (draw) ps.forEach((p, i) => { if (i) x += p.g ?? gap; text(g, p.s, x, y, { font: p.font, color: p.color || C.ink, k: p.k ?? 1 }); x += p.w; });
  return { x: x0, w: tot };
}
/** Tấm trắng bo tròn (nền cho công thức) giữa (cx, cy); k: bật vào; edge: màu vạch hai đầu; ring: viền navy chốt (0..1). */
export function plate(g, cx, cy, w, h, { k = 1, edge = C.ink, ring = 0 } = {}) {
  if (k <= 0) return;
  const e = outBack(clamp(k), 1.4);
  g.save(); g.translate(cx, cy); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.fill(rr(-w / 2, -h / 2, w, h, 20)); });
  g.fillStyle = edge; g.fillRect(-w / 2 + 14, -h / 2 + 12, 6, h - 24); g.fillRect(w / 2 - 20, -h / 2 + 12, 6, h - 24);
  if (ring > 0) { g.strokeStyle = C.ink; g.lineWidth = 6; g.setLineDash([]); g.stroke(rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 26)); }
  g.restore();
}
/** Nhiều dòng vé-chữ trong ≤ maxW: chọn cỡ lớn nhất 36 → 30 vừa; không vừa → ném. */
export function capLine(g, s, cx, y, { k = 1, color = C.ink, maxW = 390, max = 36, weight = 800, tag = 'cap' } = {}) {
  let sz = max; while (sz > 30 && measure(g, s, `${weight} ${sz}px ${AR}`) > maxW) sz--;
  fits(g, s, `${weight} ${sz}px ${AR}`, maxW, tag);
  text(g, s, cx, y, { font: `${weight} ${sz}px ${AR}`, color, align: 'center', k });
}
export function arrow(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 6 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = lerp(x0, x1, e), ye = lerp(y0, y1, e), a = Math.atan2(y1 - y0, x1 - x0);
  line(g, x0, y0, xe, ye, color, w);
  if (k > 0.5) { g.save(); g.translate(xe, ye); g.rotate(a); g.fillStyle = color; g.beginPath(); g.moveTo(0, 0); g.lineTo(-22, -12); g.lineTo(-22, 12); g.closePath(); g.fill(); g.restore(); }
}
/** Biểu tượng đĩa trắng thêm (kit.icon chỉ có loa / đèn / ổ điện). kind: radio phone mri tides seasons ripple swing string thumb. */
export function disc(g, kind, x, y, r = 54, k = 1, t = 0) {
  if (k <= 0) return;
  const e = outBack(clamp(k), 1.4), q = r / 54;
  g.save(); g.translate(x, y); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); });
  g.scale(q, q); g.strokeStyle = C.ink; g.fillStyle = C.ink; g.lineWidth = 5; g.lineCap = g.lineJoin = 'round';
  if (kind === 'radio') {
    line(g, 0, 26, 0, -6, C.ink, 5); g.beginPath(); g.arc(0, -10, 6, 0, TAU); g.fill();
    for (const rr2 of [18, 32]) for (const sg of [-1, 1]) { g.beginPath(); g.arc(0, -10, rr2, sg < 0 ? Math.PI - 0.7 : -0.7, sg < 0 ? Math.PI + 0.7 : 0.7); g.stroke(); }
  } else if (kind === 'phone') {
    g.stroke(rr(-17, -32, 34, 64, 8)); line(g, -5, 22, 5, 22, C.ink, 4);
    g.beginPath(); g.arc(-4, 8, 5, 0, TAU); g.fill(); line(g, 1, 8, 1, -14, C.ink, 4); line(g, 1, -14, 10, -10, C.ink, 4);
  } else if (kind === 'mri') {
    g.beginPath(); g.arc(0, -4, 28, 0, TAU); g.stroke(); g.beginPath(); g.arc(0, -4, 14, 0, TAU); g.stroke(); line(g, -34, 30, 34, 30, C.ink, 6);
  } else if (kind === 'tides') {
    for (const dy of [-12, 6, 24]) { g.beginPath(); for (let i = 0; i <= 20; i++) { const xx = -30 + i * 3, yy = dy + 6 * Math.sin(i * 0.8 + t * 2 + dy); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); }
  } else if (kind === 'seasons') {
    ['#8FD6C1', '#FFD36B', '#F7B48A', '#A9C8F2'].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 32, i * TAU / 4 - Math.PI / 2, (i + 1) * TAU / 4 - Math.PI / 2); g.closePath(); g.fill(); });
    g.beginPath(); g.arc(0, 0, 32, 0, TAU); g.stroke();
  } else if (kind === 'ripple') {
    for (const rr2 of [8, 18, 28]) { g.globalAlpha = 1 - rr2 / 40; g.beginPath(); g.ellipse(0, 4, rr2 * 1.2, rr2 * 0.6, 0, 0, TAU); g.stroke(); } g.globalAlpha = 1;
  } else if (kind === 'swing') {
    const a = 0.5 * Math.sin(t * 2.4); g.save(); g.translate(0, -30); g.rotate(a); line(g, 0, 0, 0, 44, C.ink, 4); g.fill(rr(-14, 42, 28, 8, 3)); g.restore(); line(g, -26, -32, 26, -32, C.ink, 6);
  } else if (kind === 'string') {
    g.beginPath(); for (let i = 0; i <= 24; i++) { const xx = -32 + i * 64 / 24, yy = 14 * Math.sin(i / 24 * Math.PI * 2) * Math.cos(t * 9); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
    g.beginPath(); g.arc(-32, 0, 5, 0, TAU); g.arc(32, 0, 5, 0, TAU); g.fill();
  } else if (kind === 'thumb') {
    g.fill(rr(-30, -4, 14, 32, 3)); g.beginPath(); g.moveTo(-10, 26); g.lineTo(-10, -2); g.lineTo(4, -26); g.quadraticCurveTo(14, -26, 12, -10); g.lineTo(12, -4); g.lineTo(26, -4); g.quadraticCurveTo(32, -4, 30, 4); g.lineTo(26, 22); g.quadraticCurveTo(24, 26, 18, 26); g.closePath(); g.fill();
  } else if (kind === 'eye') {
    g.beginPath(); g.moveTo(-32, 0); g.quadraticCurveTo(0, -34, 32, 0); g.quadraticCurveTo(0, 34, -32, 0); g.stroke(); g.beginPath(); g.arc(0, 0, 10, 0, TAU); g.fill();
  } else throw new Error(`disc: không có "${kind}"`);
  g.restore();
}
/** Vòng đu quay nhỏ trong ô (không chân): trả về { P } như wheel(). */
export function miniWheel(g, cx, cy, R, theta, o = {}) {
  return wheel(g, cx, cy, R, { theta, legs: false, n: 8, ...o });
}
