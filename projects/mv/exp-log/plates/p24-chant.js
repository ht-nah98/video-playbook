// P24 chant — "FROM SCRATCH" · 208.60 → 211.48 ✂✂✂ (TREATMENT P24)
// Lead hát BA lần (lời gốc ghi hai): 208.60 · 209.54 · 210.58 — ba cú cắt cứng (danh sách 8 cú cắt của TREATMENT),
// mỗi cú một con dấu FROM SCRATCH đập xuống, lần sau to gấp đôi lần trước; ruột chữ lấp MỌI đẳng thức của bài.
// Bè vang 209–213 → từ con dấu thứ hai có bản gương xanh qua đường y = x. Con dấu cuối vỡ thành ký hiệu vào P25.
import { clamp, prog, smooth, outBack } from '../../../../engine/lib.js';
import { fillWord } from '../../../../engine/fill.js';
import { drawReflected } from '../../../../engine/mirror.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { EQUATIONS } from '../finale.js';

const SIZE = [150, 300, 600], ROT = [-0.06, 0.05, -0.04];

export default class P24 {
  backdrop = { glow: 1, haloX: 960, haloY: 540, haloR: 760 };
  async init(s) {
    this.hits = [1, 2, 3].map(n => s.tl.at('From scratch!', n));
    this.next = s.tl.at('Forward—');
  }
  idx(t) { return this.hits.filter(h => t >= h).length - 1; }
  camera(t) {
    const i = Math.max(0, this.idx(t)), d = 1 - smooth(prog(t, this.hits[i], this.hits[i] + 0.3));
    return { s: 1 + 0.04 * d, x: 16 * d * Math.sin(t * 95), y: 10 * d * Math.cos(t * 83), bg: 0.5 };
  }
  render(g, t) {
    const i = Math.max(0, this.idx(t));
    shatter(g, c => this.stamp(c, t, i), prog(t, this.next - 0.36, this.next), t, { seed: 61, cell: 14 });
    // loé 3 khung ở mỗi cú cắt (cắt cứng đi kèm cú đập)
    const dt = t - this.hits[i];
    if (dt < 0.05) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(244,241,234,0.35)'; g.fillRect(0, 0, 1920, 1080); g.restore(); }
  }
  stamp(g, t, i) {
    const draw = (c) => {
      const dt = t - this.hits[i], s = 1 + 0.5 * (1 - outBack(clamp(dt / 0.15))), F = SIZE[i];
      c.save(); c.translate(960, 560); c.rotate(ROT[i]); c.scale(s, s);
      c.font = `900 ${F}px "Archivo"`; const w = c.measureText('SCRATCH').width;
      c.font = `900 ${F * 0.42}px "Archivo"`; const wf = c.measureText('FROM').width;
      fillWord(c, 'FROM', -wf / 2, -F * 0.62, { font: `900 ${F * 0.42}px "Archivo"`, color: PAL.truth, innerColor: PAL.fwd, inner: EQUATIONS, drift: t * 90, innerFont: '500 18px "IBM Plex Mono"', lineH: 20 });
      fillWord(c, 'SCRATCH', -w / 2, F * 0.18, { font: `900 ${F}px "Archivo"`, color: PAL.fwd, innerColor: PAL.fwdCore, inner: EQUATIONS, drift: t * 120,
        innerFont: `500 ${Math.round(14 + F * 0.03)}px "IBM Plex Mono"`, lineH: Math.round(16 + F * 0.033) });
      c.strokeStyle = PAL.fwd; c.lineWidth = Math.max(6, F * 0.05); c.strokeRect(-w / 2 - F * 0.2, -F * 1.1, w + F * 0.4, F * 1.75);
      c.restore();
    };
    if (i >= 1) drawReflected(g, MIRROR, draw, { tint: PAL.back, tintAlpha: 0.65, alpha: 0.55 });   // bè vang: bản gương xanh
    draw(g);
  }
}
