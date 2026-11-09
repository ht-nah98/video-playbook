// Nền exp-log: navy (không đen tuyền — tóc nhân vật tối) + quầng sáng thở theo beat.
// Bám BEAT, không bám lời (29% từ rơi gần beat).
// Từ Kế hoạch 2: các lớp sân khấu (engine/stage.js) bật theo cảnh — mặc định TẮT,
// nên P01–P08 giữ nguyên từng pixel.
import { W, H } from '../../../engine/lib.js';
import { glyphFloor, horizonGlow, textRings, bokeh as bokehLayer } from '../../../engine/stage.js';
import { PAL, MIRROR } from './song.js';

export function backdrop(g, t, { beat, haloX = 960, haloY = 600, haloR = 620, glow = 1,
  floor = 0, floorA = PAL.fwd, floorB = PAL.back, mirror = false, horizon = 660,
  rings = null, bokeh = 0, floorGlyphs = undefined } = {}) {
  const p = beat ? beat.beatPulse(t, 0.18) : 0;
  g.save();
  const r = haloR * (1 + 0.04 * p);
  const gr = g.createRadialGradient(haloX, haloY, 0, haloX, haloY, r);
  gr.addColorStop(0, PAL.halo); gr.addColorStop(1, 'rgba(22,32,58,0)');
  g.globalAlpha = glow * (0.85 + 0.15 * p);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.restore();
  if (bokeh > 0) bokehLayer(g, t, { alpha: bokeh, colors: [floorA, floorB] });
  if (rings) textRings(g, t, rings.cx ?? 960, rings.cy ?? 540, { ...rings, colors: rings.colors ?? [floorA, floorB] });
  if (floor > 0) {
    horizonGlow(g, { y: horizon, color: floorA, alpha: floor });
    glyphFloor(g, t, { horizon, beat, colA: floorA, colB: floorB, mirror: mirror ? MIRROR : null, alpha: floor, glyphs: floorGlyphs });
  }
}
