// P23 finale — "Tất cả qua gương" · 186.88 → 196.86 (TREATMENT P23 nửa đầu, final chorus — ĐỈNH)
// Đồ thị P22 vừa nhập làm một (mũ + log + gương) giờ là sân khấu. Mọi vật của bài quay lại thành đoàn diễu hành
// dọc gương — phía vàng là vật, phía xanh là ảnh của nó. Sàn ký hiệu, bokeh, camera nảy theo beat.
// "Run it forward, run it back": mặt cận hát nhép; sao chổi vàng tiến trên đường mũ, xanh lùi trên đường log.
// "Fold the graph — watch them match": nửa vàng gập qua gương, đường mũ đè khít đường log — rồi NỔ thành ký hiệu.
// "Exponential goes forward": nhân vật nhảy giữa khung, đồ thị tụ lại từ ký hiệu, sao chổi lớn. "Logarithm comes
// back": sao chổi xanh. "Two directions — one connection": mặt cận trở lại; dây nối vuông góc gương nối từng điểm
// với ảnh của nó, loé ở "connection".
import { clamp, prog, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { foldMatrix, clipSide } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { shatter, drawMorph } from '../../../../engine/morph.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { G, graph } from '../chorus2.js';
import { parade, comet, ties, FACE } from '../finale.js';

const CURVE_PTS = Array.from({ length: 60 }, (_, i) => { const u = -4 + i * 0.11, v = 2 ** u; return i % 2 ? G(v, u) : G(u, v); });
const SCATTER = CURVE_PTS.map((_, i) => [960 + (hash(i * 3.7) - 0.5) * 2200, 540 + (hash(i * 5.3) - 0.5) * 1300]);

export default class P23 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x, n = 1) => s.tl.line(x, n);
    this.fwd = L('Run it forward,', 3); this.back = L('run it back.', 3); this.fold = L('Fold the graph—'); this.match = L('watch them match.');
    this.exp = L('Exponential goes forward.'); this.log = L('Logarithm comes back.'); this.two = L('Two directions—'); this.conn = L('one connection.');
    this.next = s.tl.at('No tricks.');
    this.boom = this.match.words[2].start - 0.05;                  // "match": nổ
    this.rebuilt = this.exp.start + 0.55;
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.3));              // sàn + bokeh dâng lên cùng cú vào điệp khúc (như P17)
    return { glow: 1, horizon: 780, floor: 0.75 * k, mirror: true, bokeh: lerp(0.5, 0.7, k) };   // bokeh nối từ P22 (0.5)
  }
  camera(t) {
    const e = smooth(prog(t, this.t0, this.t0 + 0.3));              // P22 kết ở s = 1: nảy theo beat dâng dần
    const p = beat.beatPulse(t, 0.16), punch = t >= this.exp.start ? 1 - smooth(prog(t, this.exp.start, this.exp.start + 0.6)) : 0;
    return { s: 1 + e * (0.02 + 0.02 * p) + 0.14 * punch, r: 0.02 * Math.sin((t - this.t0) * 0.5) + 0.05 * punch, bg: 0 };
  }
  /** Độ đậm đồ thị: P22 vẽ đủ (1) → sân khấu điệp khúc (0.85). */
  ga(t) { return lerp(1, 0.85, smooth(prog(t, this.t0, this.t0 + 0.3))); }
  render(g, t) {
    parade(g, t, { k: prog(t, this.t0, this.t0 + 1.2), pulse: beat.beatPulse(t, 0.16) });
    // đồ thị: gập ở "Fold the graph", nổ ở "match", tụ lại khi "Exponential" vào
    if (t < this.exp.start) shatter(g, c => this.folded(c, t), prog(t, this.boom, this.exp.start), t, { seed: 47 });
    else {
      const k = prog(t, this.exp.start + 0.1, this.rebuilt);
      drawMorph(g, SCATTER, CURVE_PTS, prog(t, this.exp.start - 0.1, this.rebuilt), t, { spread: 200 });
      graph(g, { k: smooth(k), kl: smooth(k), km: smooth(k), a: 0.85 * smooth(prog(t, this.exp.start, this.exp.start + 0.3)) });   // lưới, trục, gương tụ lại cùng đường cong
    }
    // sao chổi
    comet(g, prog(t, this.fwd.start, this.fwd.end + 0.3), -4, 2.7);
    comet(g, prog(t, this.back.start, this.back.end + 0.25), 2.7, -4, { log: true });
    comet(g, prog(t, this.rebuilt, this.exp.end + 0.2), -4.5, 2.75, { r: 26 });
    comet(g, prog(t, this.log.start, this.log.end + 0.1), 2.75, -4.5, { log: true, r: 26 });
    ties(g, prog(t, this.two.start, this.two.end) * (1 - prog(t, this.next - 0.35, this.next)), {   // rút về theo thứ tự trước P23b
      glow: Math.max(0, 1 - Math.abs(t - this.conn.words[1].start) / 0.25) });
    // nhân vật: mặt cận → nhảy → mặt cận
    this.faceAt(g, t, this.t0, this.fold.start - 0.1, 'burn', 'grid', 48);
    figure(g, this.m, 'jump', 960, 1080, 700, t < this.two.start - 0.3 ? 'burn' : 'digits',
      presence(t, this.exp.start - 0.05, this.two.start - 0.3, { inDur: 0.25, outDur: 0.4 }), { t, seed: 49 });
    this.faceAt(g, t, this.two.start + 0.05, this.next - 0.4, 'rows', 'digits', 50);
    footer(g, this.tl, t, ['forward', 'back', 'fold', 'match', 'exponential', 'logarithm', 'directions', 'connection'], { from: this.t0, carry: true });
  }
  faceAt(g, t, a, b, kin, kout, seed) {
    const [FX, FY, FH] = FACE, p = presence(t, a, b, { inDur: 0.3, outDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, kin, 'in', p.k, { t, cell: 7, seed });
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, kout, 'out', p.k, { t, cell: 7, seed });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
  }
  /** Đồ thị với nửa vàng (trên-trái) gập qua gương: c = 1 phẳng → −1 đè khít lên nửa xanh. */
  folded(g, t) {
    const c = lerp(1, -1, smooth(prog(t, this.fold.start, this.fold.words[2].start + 0.35)));
    const a = this.ga(t);
    g.save(); clipSide(g, MIRROR, 1); graph(g, { k: 1, kl: 1, km: 1, a }); g.restore();
    g.save(); g.transform(...foldMatrix(MIRROR, c)); clipSide(g, MIRROR, -1);
    graph(g, { k: 1, kl: 1, km: 0, a });
    if (c < 1) { g.fillStyle = `rgba(11,15,30,${0.3 * (1 - Math.abs(c))})`; g.fillRect(-600, -600, 3120, 2280); }
    g.restore();
  }
}
