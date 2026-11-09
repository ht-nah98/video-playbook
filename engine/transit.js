// Luật video mẫu (REFERENCE-TEARDOWN §2.3): nhân vật KHÔNG cắt cứng vào/ra.
// Vào: ký hiệu hiện theo một thứ tự → cháy trắng → ảnh màu.
// Ra: ảnh đổi hết sang ký hiệu trong ~3 khung → ký hiệu tan theo kiểu.
// Ký hiệu lấy MÀU từ chính ảnh (grid.col). Mọi thứ thuần theo t.
import { hash, clamp, smooth } from './lib.js';
import { RAMP } from './mosaic.js';

export const KINDS = ['rows', 'columns', 'grid', 'burn', 'digits'];

export function presence(t, tIn, tOut, { inDur = 0.25, outDur = 0.6 } = {}) {
  if (t < tIn) return { state: 'before', k: 0 };
  if (t < tIn + inDur) return { state: 'in', k: (t - tIn) / inDur };
  if (t < tOut) return { state: 'hold', k: 1 };
  if (t < tOut + outDur) return { state: 'out', k: (t - tOut) / outDur };
  return { state: 'gone', k: 1 };
}

export function order(kind, r, c, rows, cols) {
  const j = hash(r * 131.7 + c * 7.31);
  switch (kind) {
    case 'rows': return clamp(r / Math.max(1, rows - 1) * 0.94 + j * 0.06);
    case 'columns': return clamp(hash(c * 19.1) * 0.85 + (r / Math.max(1, rows - 1)) * 0.15);
    case 'burn': {
      const dx = c / Math.max(1, cols - 1) - 0.5, dy = r / Math.max(1, rows - 1) - 0.45;
      return clamp(Math.hypot(dx, dy) / 0.72 * 0.9 + j * 0.1);
    }
    default: return j;          // 'grid', 'digits'
  }
}

export function cellIn(k, o) {
  if (k <= 0) return { glyph: 0, png: 0 };
  if (k >= 1) return { glyph: 0, png: 1 };
  if (k < 0.6) return { glyph: k / 0.6 >= o ? 1 : 0, png: 0 };
  const f = (k - 0.6) / 0.2;                               // 0→1 trong [0.6, 0.8]
  if (k < 0.8) return { glyph: 1 - smooth(f), png: smooth(f) };
  return { glyph: 0, png: 1 };
}

export function cellOut(kind, k, o, seed = 0) {
  if (k <= 0) return { glyph: 0, png: 1, dx: 0, dy: 0 };
  if (k >= 1) return { glyph: 0, png: 0, dx: 0, dy: 0 };
  if (k < 0.1) return { glyph: k / 0.1 >= o ? 1 : 0, png: 1 - k / 0.1, dx: 0, dy: 0 };
  const u = (k - 0.1) / 0.9;                               // 0→1 pha tan
  const local = clamp((u - o * 0.45) / 0.55);              // ô sau tan muộn hơn
  const a = 1 - smooth(local);
  const h = hash(seed * 17 + o * 1000);
  switch (kind) {
    case 'columns': return { glyph: a, png: 0, dx: 0, dy: local * local * 0.35 };
    case 'rows':    return { glyph: a, png: 0, dx: (h - 0.5) * local * 0.3, dy: 0 };
    case 'digits': {
      const ang = h * Math.PI * 2;
      return { glyph: a, png: 0, dx: Math.cos(ang) * local * 0.6, dy: Math.sin(ang) * local * 0.6 };
    }
    default:        return { glyph: a, png: 0, dx: 0, dy: -local * 0.08 };
  }
}

function glyphFor(v, i, t) {
  const k = Math.min(RAMP.length - 2, Math.max(0, Math.round(v * (RAMP.length - 2))));
  return (Math.floor(t * 12) + i) % 7 === 0 ? RAMP[(k + 1) % (RAMP.length - 1)] : RAMP[k];
}

export function drawTransit(g, mascot, pose, x, y, hpx, kind, dir, k, { t = 0, cell = 9, seed = 0 } = {}) {
  const gr = mascot.grid(pose, cell, hpx), im = mascot.im[pose];
  if (!gr || !im) return;
  const w = im.width * (hpx / im.height), x0 = x - w / 2, y0 = y - hpx;
  const cw = w / gr.cols, ch = hpx / gr.rows;
  // ảnh: một alpha chung cho cả thân (khi đứng alpha = 1 — luật DNA)
  let pngA = 0;
  if (dir === 'in') pngA = k < 0.6 ? 0 : k < 0.8 ? smooth((k - 0.6) / 0.2) : 1;
  else pngA = k < 0.1 ? 1 - k / 0.1 : 0;
  if (pngA > 0) {
    g.save();
    // cháy trắng: ảnh hiện ra từ trắng bão hoà
    if (dir === 'in' && k < 0.8) g.filter = `contrast(${pngA.toFixed(2)}) brightness(${(1 + 2 * (1 - pngA)).toFixed(2)})`;
    mascot.draw(g, pose, x, y, hpx, { alpha: pngA, ring: 0, shadow: false });
    g.restore();
  }
  g.save();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${(ch * 0.96).toFixed(2)}px "IBM Plex Mono", monospace`;
  for (let r = 0; r < gr.rows; r++) for (let c = 0; c < gr.cols; c++) {
    const i = r * gr.cols + c;
    if (gr.alp[i] < 0.35) continue;
    const o = order(kind, r, c, gr.rows, gr.cols);
    const s = dir === 'in' ? { ...cellIn(k, o), dx: 0, dy: 0 } : cellOut(kind, k, o, seed + i);
    if (s.glyph <= 0.01) continue;
    const R = Math.min(255, gr.col[i*3] * 1.15), G = Math.min(255, gr.col[i*3+1] * 1.15), B = Math.min(255, gr.col[i*3+2] * 1.15);
    g.fillStyle = `rgb(${R|0},${G|0},${B|0})`;
    g.globalAlpha = s.glyph;
    g.fillText(glyphFor(gr.lum[i], i, t), x0 + (c + 0.5) * cw + s.dx * hpx, y0 + (r + 0.5) * ch + s.dy * hpx);
  }
  g.restore();
}

/** Nhân vật theo presence(): vào bằng ký hiệu → đứng đặc (alpha 1, không bóng) → ra bằng ký hiệu. Không cắt cứng.
 *  m = Mascot; p = presence(t, tIn, tOut); flip: lật quanh trục đứng qua x (vd. chỉ sang trái). */
export function figure(g, m, pose, x, y, h, kind, p, { t, seed = 0, flip = false } = {}) {
  g.save();
  if (flip) { g.translate(2 * x, 0); g.scale(-1, 1); }           // lật quanh trục đứng qua x (vd. chỉ sang trái)
  if (p.state === 'in') drawTransit(g, m, pose, x, y, h, kind, 'in', p.k, { t, seed });
  else if (p.state === 'hold') m.draw(g, pose, x, y, h, { ring: 0, shadow: false });   // khớp drawTransit: không bóng
  else if (p.state === 'out') drawTransit(g, m, pose, x, y, h, kind, 'out', p.k, { t, seed });
  g.restore();
}
