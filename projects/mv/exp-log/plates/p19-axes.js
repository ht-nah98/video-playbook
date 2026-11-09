// P19 axes — "Trang sổ: hai đường cong" · 125.66 → 140.09 ✂ (TREATMENT P19, đảo nền giấy)
// 125.66 nhạc lặng → CẮT CỨNG vào trang sổ kẻ ô của chính nhân vật (pose sổ tay, góc phải). Chỉ còn bass/
// percussion đứt quãng: mỗi cú (128.28 · 130.42 · 132.51 · 134.66 · 136.80 · 138.94) là một nét bút.
// "Put them on the axes": hai trục. "Exponential — rising to the right": đường mũ mực vàng đậm.
// "Logarithm beside it": đường log mực xanh. "Draw one line": thước đặt chéo; "y equals x": nét đứt.
// "Fold the whole picture": nửa trên-trái tờ giấy gập theo y = x — chỗ nó nhấc lên lộ mặt bàn tối;
// "watch what happens next": nếp gập dừng gần 90°, chờ. P20 (beat vào lại) gập nốt.
import { prog, smooth, lerp } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { foldMatrix, clipSide } from '../../../../engine/mirror.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { page, inkAll, nib, ruler, crease, INK, paperTimes, FOLD_HOLD } from '../paper.js';

export default class P19 {
  backdrop = false;                                   // trang giấy là nền của cảnh (đảo nền — TREATMENT)
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.T = paperTimes(s.tl);
    this.next = s.tl.at('X becomes Y.');
  }
  camera(t) { return { s: 1 + 0.03 * smooth(prog(t, this.t0, this.T.fold0)), bg: 0 }; }   // trang lặng: đẩy rất chậm
  render(g, t) {
    const T = this.T;
    const c = lerp(1, FOLD_HOLD, smooth(prog(t, T.fold0, T.hold)));
    // nửa dưới-phải đứng yên
    g.save(); if (c < 1) clipSide(g, MIRROR, 1);
    page(g); const tip = inkAll(g, t, T); g.restore();
    // nửa trên-trái: lật quanh gương như tấm bìa
    if (c < 1) {
      g.save(); g.transform(...foldMatrix(MIRROR, c)); clipSide(g, MIRROR, -1);
      page(g); inkAll(g, t, T);
      g.fillStyle = `rgba(30,34,48,${0.35 * (1 - c)})`; g.fillRect(-1600, -1600, 5100, 4300);   // mặt giấy nghiêng đi → tối lại (cả tờ)
      g.restore();
      // bóng nếp gấp trên nửa đứng yên
      g.save(); clipSide(g, MIRROR, 1); crease(g, c); g.restore();
    }
    ruler(g, smooth(prog(t, T.ruler, T.ruler + 0.45)), { lift: smooth(prog(t, T.yx1 + 0.2, T.yx1 + 0.7)) });
    // ngòi bút ở đầu nét đang vẽ
    const drawing = [[T.axes0, T.axes1, tip.h], [T.axes1, T.axes2, tip.v], [T.exp0, T.exp1, tip.e], [T.log0, T.log1, tip.l], [T.yx0, T.yx1, tip.d]].find(([a, b]) => t >= a && t < b);
    if (drawing) nib(g, drawing[2]);
    // nhân vật cầm sổ (khung trung, góc phải dưới), viền mực + bóng như mọi chất liệu trên giấy (LESSONS §13)
    const p = presence(t, this.t0 - 1, T.fold0 - 0.1, { outDur: 0.45 });
    if (p.state === 'hold') this.m.draw(g, 'notebook', 1770, 1250, 960, { ring: 3, ringColor: PAL.ink, shadow: true });
    else if (p.state === 'out') drawTransit(g, this.m, 'notebook', 1770, 1250, 960, 'columns', 'out', p.k, { t, seed: 27 });
    footer(g, this.tl, t, ['axes', 'exponential', 'right', 'logarithm', 'shape', 'line', 'x', 'fold', 'next'],
      { from: this.t0, carry: true, colBase: PAL.ink, colKey: INK.gold });
  }
}
