// P01 boot — "Máy khởi động" · 0.00 → 4.78 (TREATMENT P01)
import { W, H, clamp, prog } from '../../../../engine/lib.js';
import { decodeLine, burstText } from '../../../../engine/lyric.js';
import { drawTransit } from '../../../../engine/transit.js';
import { PAL, CUE } from '../song.js';
import { burstChars } from '../../../../engine/glyphs.js';
import { drawCubes } from './p02-easy.js';

// Ô mặt 418×418 (viseme-1) phóng lên 760px; P02 dùng đúng các hằng này.
const FACE_X = 1240, FACE_Y = 900, FACE_H = 760;
const T_BURST = 4.50, BURST_DUR = 0.28;            // chữ + thanh vỡ thành ký hiệu trước khi P02 vào (4.78)
const BAR_X = 144, BAR_Y = 524, BAR_W = 552, BAR_CELLS = 24;

export default class P01 {
  backdrop = { glow: 0.6, haloX: FACE_X, haloY: 520 };
  async init(s) {
    this.m = s.mascot; this.beat = s.beat; this.tl = s.tl;
    this.l99 = s.tl.line('Ninety-nine percent...'); this.lLoad = s.tl.line('Loading.', 1);
  }
  render(g, t) {
    const on = prog(t, CUE.fx0 - 0.08, CUE.fx0 + 0.12);        // màn CRT bật
    if (on <= 0) return this.caret(g, t, 140, 540);
    // chân dung in theo nốt keyboard: k của pha "in" dừng ở 0.6 (toàn ký hiệu, chưa cháy trắng)
    const printed = CUE.keysPrint.filter(x => t >= x).length / CUE.keysPrint.length;
    const k = 0.6 * clamp(printed + prog(t, CUE.keysPrint.at(-1), CUE.keysPrint.at(-1) + 0.3) * 0.02);
    drawTransit(g, this.m, 'face', FACE_X, FACE_Y, FACE_H, 'rows', 'in', Math.max(0.001, k), { t, cell: 7, seed: 1 });
    // đường quét CRT
    g.save(); g.globalAlpha = 0.08 * on; g.fillStyle = PAL.truth;
    for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);
    g.restore();
    // "Ninety-nine percent..." + thanh loading kẹt ở 99%
    const F = '500 34px "IBM Plex Mono"', B = { dur: BURST_DUR };
    if (t >= this.l99.start) {
      decodeLine(g, this.tl.wordsOf(this.l99), t, 140, 460, { font: F, colBase: PAL.truth, colKey: PAL.fwd, keys: ['ninety', 'nine'], burstAt: T_BURST, burstDur: BURST_DUR });
      const fill = 0.99 * prog(t, this.l99.start, this.l99.end);
      this.bar(g, t, fill);
      burstText(g, `${Math.floor(fill * 100)}%`, t, T_BURST, 720, 548, F, PAL.truth, { ...B, seed: 7 });
    }
    if (t >= this.lLoad.start) {
      const blink = this.beat.onBeat(t, 0.3) > 0.2 ? 1 : 0.35;
      burstText(g, 'LOADING', t, T_BURST, 140, 620, F, PAL.truth, { ...B, seed: 8, alpha: blink });
    }
    drawCubes(g, t, [0, 1]);       // hai khối đầu rơi trước mốc P02 (4.54, 4.83)
    this.caret(g, t, 140 + (t >= this.lLoad.start ? 170 : 0), t >= this.lLoad.start ? 608 : 540);
  }
  // Thanh loading: khung + ô lấp đầy; từ T_BURST khung co lại, các ô vỡ thành ký hiệu.
  bar(g, t, fill) {
    const k = prog(t, T_BURST, T_BURST + BURST_DUR), cw = BAR_W / BAR_CELLS;
    g.save();
    g.strokeStyle = PAL.truth; g.lineWidth = 2;
    g.strokeRect(BAR_X - 4, BAR_Y - 4, (BAR_W + 8) * (1 - k), 34);
    const bs = burstChars('#'.repeat(BAR_CELLS), t, T_BURST, { dur: BURST_DUR, seed: 6 });
    g.fillStyle = PAL.fwd; g.font = '500 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 0; i < BAR_CELLS; i++) {
      const f = clamp(fill * BAR_W / cw - i);                 // phần ô thứ i đã đầy
      if (f <= 0) continue;
      const b = bs[i];
      if (t < T_BURST) g.fillRect(BAR_X + i * cw, BAR_Y, cw * f + (f >= 1 ? 0.5 : 0), 26);
      else if (b.alpha > 0) { g.globalAlpha = b.alpha; g.fillText(b.ch, BAR_X + (i + 0.5) * cw + b.dx * 34, BAR_Y + 13 + b.dy * 34); }
    }
    g.restore();
  }
  caret(g, t, x, y) {
    if (t >= T_BURST) return;
    if (this.beat.onBeat(t, 0.3) > 0.15) { g.fillStyle = PAL.fwd; g.fillRect(x, y - 16, 16, 30); }
  }
}
