// Màn CRT: đường quét và cú TẮT MÀN HÌNH (ép dẹt → vạch → chấm → đen). Dùng ở khung sách của 99-intro/exp-log —
// một lựa chọn phong cách, MV khác dùng hay không tuỳ DNA.
// Hàm thuần của k/t; mỗi hàm có bộ đệm riêng.
import { W, H, clamp, smooth } from './lib.js';

/** Đường quét CRT. */
export function scanlines(g, a = 1, { col = '#F4F1EA' } = {}) {
  if (a <= 0) return;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 0.08 * a; g.fillStyle = col;
  for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);
  g.restore();
}

let cb = null;
/**
 * CRT tắt: paint(c) vẽ cả khung; k ∈ [0,1]. 0–0.45 ép dẹt theo chiều đứng (sáng lên) → một vạch;
 * 0.45–0.8 vạch co lại thành một chấm; 0.8–1 chấm tắt. k ≥ 1: đen.
 */
export function crtOff(g, paint, k, { bg = '#0B0F1E', line = '#F4F1EA' } = {}) {
  if (k <= 0) { paint(g); return; }
  const tr = g.getTransform();                       // camera của cảnh: vẽ vào bộ đệm với đúng biến đổi này
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  if (k < 1) {
    cb ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
    const b = cb.getContext('2d');
    b.setTransform(1, 0, 0, 1, 0, 0); b.fillStyle = bg; b.fillRect(0, 0, W, H);
    b.save(); b.setTransform(tr); paint(b); b.restore();
    const sy = k < 0.45 ? Math.max(0.004, 1 - smooth(k / 0.45)) : 0.004, sx = k < 0.45 ? 1 : Math.max(0.004, 1 - smooth((k - 0.45) / 0.35));
    g.translate(W / 2, H / 2); g.scale(sx, sy);
    g.filter = `brightness(${(1 + 3 * clamp(k / 0.45)).toFixed(2)})`;
    g.globalAlpha = k < 0.8 ? 1 : 1 - (k - 0.8) / 0.2;
    g.drawImage(cb, -W / 2, -H / 2);
    if (k >= 0.45) { g.filter = 'none'; g.fillStyle = line; g.fillRect(-W / 2, -3 / sy, W, 6 / sy); }   // vạch trắng 6px còn lại (co theo sx)
  }
  g.restore();
}
