// Nền chung: CHỖ TRỐNG — viết lại theo DNA.md §7 của bài này. Bản dưới là nền của exp-log (quầng thở theo beat
// + sàn ký hiệu/bokeh bật theo cảnh), giữ để khung chạy được.
// Cảnh chỉnh bằng `backdrop = {…}` / `backdropAt(t)`, tắt bằng `backdrop = false`. Cảnh KHÔNG tô nền toàn khung.
import { W, H } from '../../engine/lib.js';
import { glyphFloor, horizonGlow, textRings, bokeh as bokehLayer } from '../../engine/stage.js';
import { PAL } from './song.js';

export function backdrop(g, t, { beat, haloX = 960, haloY = 600, haloR = 620, glow = 1,
  floor = 0, floorA = PAL.fwd, floorB = PAL.back, mirror = null, horizon = 660,
  rings = null, bokeh = 0, floorGlyphs = undefined } = {}) {
  const p = beat ? beat.beatPulse(t, 0.18) : 0;
  g.save();
  const gr = g.createRadialGradient(haloX, haloY, 0, haloX, haloY, haloR * (1 + 0.04 * p));
  gr.addColorStop(0, PAL.halo); gr.addColorStop(1, 'rgba(22,32,58,0)');
  g.globalAlpha = glow * (0.85 + 0.15 * p);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.restore();
  if (bokeh > 0) bokehLayer(g, t, { alpha: bokeh, colors: [floorA, floorB] });
  if (rings) textRings(g, t, rings.cx ?? 960, rings.cy ?? 540, { ...rings, colors: rings.colors ?? [floorA, floorB] });
  if (floor > 0) {
    horizonGlow(g, { y: horizon, color: floorA, alpha: floor });
    glyphFloor(g, t, { horizon, beat, colA: floorA, colB: floorB, mirror, alpha: floor, glyphs: floorGlyphs });
  }
}
