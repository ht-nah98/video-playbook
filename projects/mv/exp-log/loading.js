// Khung sách của bài: màn CRT + thanh loading kẹt ở 99% (P01 mở, P26–P27 kết).
// P01 giữ bản vẽ riêng của nó (không đổi pixel cảnh cũ); bản này dùng cho phần kết.
import { clamp } from '../../../engine/lib.js';
import { scanlines as crtScanlines, crtOff as crtOffBase } from '../../../engine/crt.js';
import { PAL } from './song.js';

// Màn CRT (engine/crt.js) với màu của bài.
export const scanlines = (g, a = 1) => crtScanlines(g, a, { col: PAL.truth });
export const crtOff = (g, paint, k) => crtOffBase(g, paint, k, { bg: PAL.bg, line: PAL.truth });

export const BAR = { x: 144, y: 700, w: 552, cells: 24 };

/** Thanh loading: khung mở ra theo open ∈ [0,1], các ô đầy tới fill ∈ [0,1]. */
export function loadBar(g, fill, { open = 1, x = BAR.x, y = BAR.y, w = BAR.w, cells = BAR.cells } = {}) {
  if (open <= 0) return;
  const cw = w / cells;
  g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 2; g.strokeRect(x - 4, y - 4, (w + 8) * open, 34);
  g.fillStyle = PAL.fwd;
  for (let i = 0; i < cells; i++) {
    const f = clamp(fill * w / cw - i);
    if (f > 0 && (i + 1) * cw <= w * open + 0.5) g.fillRect(x + i * cw, y, cw * f + (f >= 1 ? 0.5 : 0), 26);
  }
  g.restore();
}

/** Con trỏ khối nhấp nháy (on: đang sáng). */
export function caret(g, x, y, on) { if (on) { g.save(); g.fillStyle = PAL.fwd; g.fillRect(x, y - 16, 16, 30); g.restore(); } }

/** "99.999…%": n chữ số 9 sau dấu phẩy, xuống dòng khi chạm mép phải (chữ số không bao giờ đủ — vọng P03). */
export function nines(g, n, x, y, { font = '500 34px "IBM Plex Mono"', right = 1780, left = 140, lineH = 46, col = PAL.truth } = {}) {
  g.save(); g.font = font; g.fillStyle = col; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  const cw = g.measureText('9').width, s = n > 0 ? `99.${'9'.repeat(n)}%` : '99%';
  let px = x, py = y;
  for (const ch of s) {
    if (px + cw > right) { px = left; py += lineH; }
    g.fillStyle = ch === '%' ? PAL.fwd : col; g.fillText(ch, px, py); px += cw;
  }
  g.restore();
  return { x: px, y: py };
}
