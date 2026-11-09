// P12 name — "Nó có tên rồi" · 60.20 → 64.32 ✂ 63.82 (TREATMENT P12, post-chorus)
// Kính vạn hoa co về một ô □ (ký hiệu nổ rồi tụ). Bass tắt: chỉ còn `2^□` đỏ lơ lửng.
// "Now it has a name": ba chữ l-o-g bay vào ô. 63.82 CẮT CỨNG + con dấu: log₂ 8 = 3, ô chuyển xanh,
// chữ LOGARITHM khổng lồ ruột lấp log₂8=3 · log₂16=4 · log₁₀1000=3 …
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { drawMirrorLine, clipSide } from '../../../../engine/mirror.js';
import { drawMorph, squarePoints, shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { kaleido, kaleidoPoints, nameStamp } from '../chorus.js';

const BOX = [1030, 430], BS = 130;                // ô số mũ, cạnh ô
const LETTERS = [['l', [-400, 200]], ['o', [2300, 120]], ['g', [1100, 1300]]];   // chữ bay từ ba phía

export default class P12 {
  async init(s) {
    this.tl = s.tl;
    this.q = s.tl.line('Backward question.');
    this.kal = s.tl.at('Forward and backward—');     // kính vạn hoa của P11b nở từ mốc này
    this.miss = s.tl.at('Missing exponent.');
    this.named = s.tl.line('Now it has a name—');
    this.cut = s.tl.at('logarithm.');
    this.src = kaleidoPoints(); this.dst = squarePoints(BOX[0], BOX[1], BS, 120);
  }
  backdropAt(t) {
    if (t >= this.cut) return { glow: 1, horizon: 760, floor: 1, mirror: true, bokeh: 0.8 };   // sau cú cắt: sân khấu bừng lại
    const k = smooth(prog(t, this.t0, this.miss));              // bass tắt 59.5–64.4: sân khấu tắt dần, chỉ còn ô □
    return { glow: 0.7 * (1 - 0.6 * k), horizon: 760, floor: 1 - k, mirror: true, bokeh: 0.8 * (1 - k) };
  }
  camera(t) {
    if (t >= this.cut) return { s: 1 + 0.1 * (1 - smooth(prog(t, this.cut, this.cut + 0.45))), bg: 0 };   // cú đập ở con dấu
    const back = smooth(prog(t, this.t0, this.t0 + 1.0));      // từ đúng khung cuối P11b về thẳng
    return { s: lerp(1.08, 1, back), r: lerp(0.25, 0, back), bg: 0 };
  }
  render(g, t) {
    if (t >= this.cut) return this.stamp(g, t);
    const fade = 1 - smooth(prog(t, this.t0, this.miss));       // gương và hai nửa màu tắt dần cùng bass
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07 * fade; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    drawMirrorLine(g, MIRROR, fade, { width: 6, glow: 30 });
    // kính vạn hoa vỡ, các ký hiệu tụ về chu vi ô □
    if (t < this.t0 + 0.3) shatter(g, c => kaleido(c, t, this.kal), prog(t, this.t0, this.t0 + 0.3), t, { seed: 13 });
    drawMorph(g, this.src, this.dst, prog(t, this.t0 + 0.1, this.miss - 0.1), t, { colA: PAL.fwd, colB: PAL.block, n: 240 });
    // 2^□: ô đỏ lơ lửng ở chỗ số mũ, chữ 2 hiện khi "Missing exponent"
    const box = t >= this.miss - 0.1;
    if (box) this.box(g, t, PAL.block);
    if (t >= this.miss) {
      const s = outBack(clamp((t - this.miss) / 0.2));
      g.save(); g.translate(880, 640); g.scale(s, s);
      g.font = '900 300px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'right'; g.fillText('2', 0, 0); g.restore();
    }
    // l-o-g bay vào ô từ ba phía, đáp đúng chữ "name"
    const land = this.named.words[4].start;
    LETTERS.forEach(([ch, [x0, y0]], i) => {
      const k = smooth(prog(t, this.named.start + 0.08 * i, land));
      if (k <= 0) return;
      const x = lerp(x0, BOX[0] - 34 + 34 * i, k), y = lerp(y0, BOX[1] + 14, k);
      g.save(); g.font = '800 52px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = PAL.truth;
      g.fillText(ch, x, y); g.restore();
    });
    footer(g, this.tl, t, ['backward', 'missing', 'exponent', 'name'], { from: this.t0, carry: true });
  }
  box(g, t, col) {
    const bob = Math.sin(t * 3) * 8;
    g.save(); g.translate(BOX[0], BOX[1] + bob);
    g.strokeStyle = col; g.lineWidth = 12; g.shadowColor = col; g.shadowBlur = 24;
    g.strokeRect(-BS / 2, -BS / 2, BS, BS); g.restore();
  }
  stamp(g, t) {
    nameStamp(g, t, this.cut);
    footer(g, this.tl, t, ['logarithm'], { from: this.t0 });
  }
}
