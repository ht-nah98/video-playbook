// P26 loading — "Trở về 99%" · 219.09 → 221.22 (TREATMENT P26, khung sách: kết như P01 mở)
// "Ninety-nine percent…": mặt cận của P25 tan NGƯỢC thành chân dung ký hiệu (cháy trắng → ký hiệu) và trượt về đúng
// chỗ chân dung của P01; đường quét CRT trở lại; thanh loading gõ lên 99% như lúc mở bài. "Loading.": giọng máy,
// LOADING nhấp theo beat, con trỏ. Cả màn vỡ thành ký hiệu khi màn chào P27 loé lên.
import { prog, smooth, lerp } from '../../../../engine/lib.js';
import { drawTransit } from '../../../../engine/transit.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, beat } from '../song.js';
import { FACE } from '../finale.js';
import { scanlines, loadBar, caret, BAR } from '../loading.js';

const PORTRAIT = [1240, 900, 760];                    // = P01 FACE_X, FACE_Y, FACE_H
const F = '500 34px "IBM Plex Mono"';

export default class P26 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.l99 = s.tl.line('Ninety-nine percent...', 2); this.lLoad = s.tl.line('Loading.', 2);
    this.next = this.lLoad.end + 0.12;                 // 221.22: màn chào P27
    const hook = s.tl.at('Forward—');
    this.r0 = 0.012 * Math.sin((this.t0 - hook) * 0.7);            // = góc camera P25 ở khung cuối
  }
  backdropAt(t) {
    const e = smooth(prog(t, this.t0, this.t0 + 0.6));
    return { glow: lerp(0.9, 0.6, e), haloX: lerp(960, PORTRAIT[0], e), haloY: lerp(550, 520, e), floor: 0.45 * (1 - e), horizon: 780, mirror: true, bokeh: 0.3 * (1 - e) };
  }
  camera(t) { const e = smooth(prog(t, this.t0, this.t0 + 0.6)); return { s: lerp(1.05, 1, e), r: lerp(this.r0, 0, e), bg: 0 }; }
  render(g, t) {
    const k = prog(t, this.next - 0.32, this.next);
    shatter(g, c => this.paint(c, t), k, t, { seed: 71 });
    scanlines(g, smooth(prog(t, this.t0 + 0.3, this.t0 + 0.8)) * (1 - k));   // ngoài shatter: vạch quá mờ, shatter bỏ qua
  }
  paint(g, t) {
    // mặt màu → chân dung ký hiệu (k của pha "in" chạy lùi 1 → 0.599), trượt về chỗ của P01
    const e = smooth(prog(t, this.t0, this.t0 + 0.7)), k = lerp(1, 0.599, e);
    const [x, y, h] = FACE.map((v, i) => lerp(v, PORTRAIT[i], e));
    drawTransit(g, this.m, 'face', x, y, h, 'rows', 'in', k, { t, cell: 7, seed: 1 });
    decodeLine(g, this.tl.wordsOf(this.l99), t, 140, 640, { font: F, colBase: PAL.truth, colKey: PAL.fwd, keys: ['ninety', 'nine'] });
    const fill = 0.99 * prog(t, this.l99.start, this.l99.end);
    loadBar(g, fill, { open: smooth(prog(t, this.l99.start, this.l99.start + 0.25)) });
    g.save(); g.font = F; g.fillStyle = PAL.truth; g.fillText(`${Math.floor(fill * 100)}%`, BAR.x + BAR.w + 24, BAR.y + 24); g.restore();
    const on = t >= this.lLoad.start;
    if (on) decodeLine(g, this.tl.wordsOf(this.lLoad), t, 140, 790, { font: F, colBase: PAL.truth, colKey: PAL.fwd, keys: ['loading'], alpha: beat.onBeat(t, 0.3) > 0.2 ? 1 : 0.35 });
    caret(g, on ? 310 : 140, on ? 790 : 860, beat.onBeat(t, 0.3) > 0.15);
  }
}
