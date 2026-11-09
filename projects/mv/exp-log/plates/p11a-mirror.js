// P11a mirror — "TẤM GƯƠNG" (nửa đầu) · 46.52 → 53.24 (TREATMENT P11, chorus 1)
// Đường y = x trắng xé chéo khung; nửa dưới-phải vàng, nửa trên-trái xanh. Mặt cận đứng
// giữa gương hát nhép. "Run it forward" 3 → 8 vàng; "run it back" 8 → 3 xanh ở ảnh qua gương.
// 50.44 cỗ máy hai khe: số mũ vào, giá trị ra. P11b tiếp tục đúng cỗ máy này.
import { clamp, prog, outExpo, smooth } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine, clipSide, reflectPoint } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { FWD_AT, BACK_AT, arrowRow, machine } from '../chorus.js';

const FX = 960, FY = 820, FH = 560;              // mặt cận: tâm trên gương, dưới cằm để trống cho hàng 3 → 8

export default class P11a {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    this.fwd = s.tl.line('Run it forward,'); this.back = s.tl.line('run it back.');
    this.same = s.tl.at('Same connection,');
    this.give = s.tl.line('Give me the exponent—');
    this.value = s.tl.line("I'll give you the value.");
    this.next = s.tl.at('Give me the value—');
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.4));
    return { glow: 0.7, horizon: 760, floor: 0.45 + 0.55 * k, mirror: true, bokeh: 0.8 * k,
      rings: { cx: FX, cy: 540, r0: 330, gap: 58, n: 4, alpha: k * 0.8,
        texts: ['RUN IT FORWARD', 'RUN IT BACK', '3 → 8', '8 → 3'] } };
  }
  camera(t) { return { s: 1 + 0.05 * (1 - smooth(prog(t, this.t0, this.t0 + 0.6))), bg: 0 }; }   // cú đẩy khi gương xé
  render(g, t) {
    // hai nửa nhuộm nhẹ (7%) — vàng xuôi, xanh ngược
    const tint = smooth(prog(t, this.t0, this.t0 + 0.3));
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07 * tint; g.fillStyle = col; g.fillRect(0, 0, 1920, 1080); g.restore();
    }
    drawMirrorLine(g, MIRROR, outExpo(prog(t, this.t0, this.t0 + 0.25)), { width: 6, glow: 30 });
    // mặt cận hát nhép (vào bằng hàng ký hiệu, ra bằng lưới khi cỗ máy tới)
    const p = presence(t, this.t0, this.give.start - 0.4, { inDur: 0.3, outDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'rows', 'in', p.k, { t, cell: 7, seed: 11 });
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'out', p.k, { t, cell: 7, seed: 11 });
    else if (p.state === 'hold') {
      const l = this.tl.lineAt(t);
      this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1);
    }
    // cặp mũi tên hai bên gương + vạch nối vuông góc gương ("same connection")
    arrowRow(g, t, FWD_AT, '3', '8', this.fwd.start, this.fwd.words[2].start, PAL.fwd);
    arrowRow(g, t, BACK_AT, '8', '3', this.back.start, this.back.words[2].start, PAL.back);
    const link = smooth(prog(t, this.same, this.same + 0.5));
    if (link > 0) {
      g.save(); g.setLineDash([14, 12]); g.lineDashOffset = -t * 60; g.strokeStyle = PAL.truth; g.lineWidth = 3;
      g.globalAlpha = 0.7 * link;
      for (const dx of [-190, 190]) {                               // nối "3" với ảnh của nó, "8" với ảnh của nó
        const a = [FWD_AT[0] + dx, FWD_AT[1]], b = reflectPoint(a, MIRROR);
        g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
      }
      g.restore();
    }
    // cỗ máy: số mũ 3 bay vào khe vàng ở "exponent", giá trị 8 bật ra ở "value"
    machine(g, t, { tIn: this.give.start, spin: (t - this.give.start) * 2.2, inCh: '3',
      inAt: this.give.words[3].start + 0.3, outCh: '8', outAt: this.value.words[4].start, col: PAL.fwd });
    footer(g, this.tl, t, ['forward', 'back', 'connection', 'exponent', 'value'], { from: this.t0 });
  }
}
