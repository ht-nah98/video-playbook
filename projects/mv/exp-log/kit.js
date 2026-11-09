// Đồ nghề dùng chung của các cảnh exp-log từ P05: luỹ thừa vẽ tay, trục số mũ,
// nhân vật vào/ra, lời ở chân khung. Thuần theo t như mọi hàm vẽ khác.
import { footerLine } from '../../../engine/lyric.js';
import { PAL } from './song.js';

// Luỹ thừa vẽ tay: số mũ là chữ nhỏ nâng lên — không dựa vào glyph ᵐ ⁿ của font.
// parts: chuỗi thường hoặc [cơ số, số mũ]. Trả về bề rộng đã vẽ.
export function powText(g, parts, x, y, size, { col = PAL.truth, expCol = PAL.fwd, align = 'center' } = {}) {
  const big = `900 ${Math.round(size)}px "Archivo"`, small = `900 ${Math.round(size * 0.55)}px "Archivo"`;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  const segs = []; let w = 0;
  for (const p of parts) {
    const [b, e] = typeof p === 'string' ? [p, ''] : p;
    g.font = big; const wb = g.measureText(b).width;
    g.font = small; const we = e ? g.measureText(e).width + size * 0.06 : 0;
    segs.push({ b, e, x: w, wb }); w += wb + we;
  }
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  for (const s of segs) {
    g.font = big; g.fillStyle = col; g.fillText(s.b, x0 + s.x, y);
    if (s.e) { g.font = small; g.fillStyle = expCol; g.fillText(s.e, x0 + s.x + s.wb + size * 0.03, y - size * 0.42); }
  }
  g.restore();
  return w;
}

// Trục số mũ dùng chung P07 (số mũ rơi xuống xếp hàng) và P08 (cột 2ⁿ).
// Tỉ lệ THẬT theo x để đường cong 2ˣ ở P08 đi qua đúng đỉnh cột.
export const AXIS = { y: 840, x0: 780, ux: 260, uy: 80, marks: [-2, -1, 0, 0.5, 1, 2, 3] };
export const axisX = (v) => AXIS.x0 + v * AXIS.ux;
export const axisY = (h) => AXIS.y - h * AXIS.uy;             // h = chiều cao cột theo đơn vị
export const markLabel = (v) => (v === 0.5 ? '½' : v < 0 ? `−${-v}` : `${v}`);

// Nhân vật vào/ra bằng ký hiệu: engine/transit.js figure(). Lời chân khung: engine/lyric.js footerLine() —
// ở đây chỉ gắn bảng màu của bài. burst = { from, carry, at, dur, colBase, colKey } (xem footerPlan).
export { figure } from '../../../engine/transit.js';
export const footer = (g, tl, t, keys, burst = {}) => footerLine(g, tl, t, keys, { colBase: PAL.truth, colKey: PAL.fwd, ...burst });
