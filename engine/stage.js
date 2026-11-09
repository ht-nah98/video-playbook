// engine/stage.js
// Sân khấu nhiều lớp độ sâu (REFERENCE-TEARDOWN §4): sàn ký hiệu toán phản chiếu ở
// nửa dưới, đường chân trời sáng, vòng chữ đồng tâm, bokeh. Hàm thuần của t.
// Bài học từ engine/backdrop.js reflection(): nền "sống" nhờ ĐIỂM TƯƠNG PHẢN CAO
// nhấp nháy độc lập — không phải một lớp mờ trượt.
import { W, H, hash, clamp } from './lib.js';
import { GLYPHS } from './glyphs.js';
import { arcText } from './typeobj.js';
import { side } from './mirror.js';

/** Điểm thứ i của sàn ký hiệu. v: 0 = chân trời, 1 = sát camera; trôi về phía camera. */
export function floorPoint(i, t, { horizon = 660, speed = 0.06, sway = 16, glyphs = GLYPHS } = {}) {
  const u = hash(i * 3.7), ph = hash(i * 12.3 + 9);
  const v = (hash(i * 8.1 + 5) + t * speed * (0.6 + ph * 0.8)) % 1;
  const d = v * v;                                            // phối cảnh: dồn về chân trời
  const y = horizon + (H - horizon) * (0.02 + 0.98 * d);
  const spread = 0.35 + 1.25 * d;
  const x = W / 2 + (u - 0.5) * 2 * W * spread + Math.sin(t * 0.5 + ph * 9) * sway * spread;   // rộng gấp đôi khung: camera dịch/xoay không lộ mép
  const tw = 0.3 + 0.7 * Math.pow(Math.abs(Math.sin(t * (1.1 + ph * 2.4) + ph * 6.3)), 2.4);
  const edge = clamp(Math.min(v / 0.08, (1 - v) / 0.08));     // sinh/tắt mềm ở hai đầu → không giật khi quấn
  return { x, y, size: 9 + 25 * d, a: tw * edge * (0.35 + 0.65 * d), glyph: glyphs[Math.floor(ph * glyphs.length)] };
}

/**
 * Sàn ký hiệu. colA/colB: hai màu; nếu truyền `mirror` (đường gương) thì màu theo
 * phía của điểm (side > 0 → colA), không thì xen kẽ theo i. `glyphs`: chữ của sàn —
 * mặc định ký hiệu toán; cảnh truyền từ khoá của chính lời đang hát ($, %, ×1.07 …).
 */
export function glyphFloor(g, t, { horizon = 660, n = 760, beat = null, colA = '#FFB547', colB = '#3FB8FF',
  mirror = null, alpha = 1, speed = 0.06, glyphs = GLYPHS } = {}) {
  if (alpha <= 0) return;
  const b = beat ? beat.onBeat(t, 0.3) : 0;
  g.save();
  g.globalCompositeOperation = 'lighter'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const p = floorPoint(i, t, { horizon, speed, glyphs });
    if (p.a <= 0.01) continue;
    g.globalAlpha = clamp(alpha * p.a * (0.85 + 0.3 * b));
    g.fillStyle = mirror ? (side([p.x, p.y], mirror) > 0 ? colA : colB) : (i % 3 === 0 ? colB : colA);
    g.font = `500 ${Math.round(p.size)}px "IBM Plex Mono"`;
    g.fillText(p.glyph, p.x, p.y);
  }
  g.restore();
}

/** Đường chân trời sáng: dải quầng + một nét mảnh. */
export function horizonGlow(g, { y = 660, color = '#FFB547', alpha = 1 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createLinearGradient(0, y - 90, 0, y + 90);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.globalAlpha = 0.16 * alpha; g.fillStyle = gr; g.fillRect(-W, y - 90, 3 * W, 180);     // rộng gấp ba: camera không lộ mép
  g.globalAlpha = 0.55 * alpha; g.fillStyle = color; g.fillRect(-W, y - 1, 3 * W, 2);
  g.restore();
}

/** Vòng chữ đồng tâm quay ngược chiều nhau (mặt trời/vòng sau lưng nhân vật của video mẫu). */
export function textRings(g, t, cx, cy, { texts = ['2³ = 8'], r0 = 300, gap = 64, n = 4, spin = 0.12,
  colors = ['#FFB547', '#3FB8FF'], alpha = 1, font = '500 26px "IBM Plex Mono"' } = {}) {
  if (alpha <= 0) return;
  g.save(); g.font = font;
  for (let k = 0; k < n; k++) {
    const r = r0 + k * gap, txt = texts[k % texts.length] + '  ·  ';
    const reps = Math.max(1, Math.floor((2 * Math.PI * r) / g.measureText(txt).width));
    const a0 = t * spin * (k % 2 ? -1 : 1) / (1 + k * 0.3);
    arcText(g, txt.repeat(reps), cx, cy, r, a0, { font, color: colors[k % colors.length], alpha: alpha * (0.75 - k * 0.12) });
  }
  g.restore();
}

/** Bokeh: đĩa sáng mềm trôi chậm lên trên. */
export function bokeh(g, t, { n = 14, colors = ['#FFB547', '#3FB8FF'], alpha = 1, seed = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const h1 = hash(i * 4.3 + seed), h2 = hash(i * 9.7 + seed + 1), h3 = hash(i * 2.9 + seed + 2);
    const r = 30 + h3 * 90;
    const x = h1 * W + Math.sin(t * 0.2 + i) * 40;
    const y = ((h2 * (H + 2 * r) - t * (8 + h3 * 14)) % (H + 2 * r) + H + 2 * r) % (H + 2 * r) - r;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, colors[i % colors.length]); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.globalAlpha = alpha * (0.06 + 0.08 * h1);
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}
