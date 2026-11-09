// P25 hook — "Hai chiều, một chuyện" · 211.48 → 219.09 (TREATMENT P25, final hook — hát)
// Ký hiệu của con dấu FROM SCRATCH tụ thành mặt cận trên gương, hát nhép. Quanh mặt là một vòng tròn CHƯA KHÉP:
// "Forward —": cung vàng chạy theo chiều kim đồng hồ qua ĐỈNH, từ 9 giờ tới 3 giờ; "exponential" uốn theo cung.
// "Backward —": cung xanh cũng xuất phát ở 9 giờ nhưng chạy NGƯỢC chiều qua ĐÁY; "logarithm" uốn theo cung.
// "Two directions": hai chấm sáng chạy trên hai cung theo hai chiều. "One story": hai mũi tên gặp nhau ở 3 giờ —
// vòng khép, loé trắng: hai chiều là một vòng tròn.
import { clamp, prog, smooth, lerp, outExpo, outBack } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { arcText } from '../../../../engine/typeobj.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, beat } from '../song.js';
import { footer } from '../kit.js';
import { FACE } from '../finale.js';

export const RING = { cx: 960, cy: 550, r: 380 };
const BL_FONT = '800 40px "Archivo"', BL_A0 = -0.14 * Math.PI;   // chữ xanh: cung phải, trên mép lời chân khung
const A9 = Math.PI, A3 = 2 * Math.PI;                  // 9 giờ, 3 giờ (theo chiều kim: tăng góc)

export default class P25 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x, n = 1) => s.tl.line(x, n);
    this.fwd = L('Forward—'); this.exp = L('exponential.', 2); this.back = L('Backward—'); this.log = L('logarithm.', 2);
    this.two = L('Two directions.', 2); this.story = L('One story.');
    this.next = s.tl.at('Ninety-nine percent...', 2);
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.4));               // P24 không có sàn: sàn + bokeh dâng lên
    return { glow: 0.9, horizon: 780, floor: 0.45 * k, mirror: true, bokeh: 0.3 * k, haloY: RING.cy };
  }
  camera(t) { return { s: 1 + 0.05 * smooth(prog(t, this.t0, this.next)), r: 0.012 * Math.sin((t - this.t0) * 0.7), bg: 0 }; }
  render(g, t) {
    shatter(g, c => this.ring(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 66 });
    // mặt cận: tụ từ ký hiệu, hát nhép; P26 nhận đúng mặt này
    const [FX, FY, FH] = FACE, p = presence(t, this.t0, 1e9, { inDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'in', p.k, { t, cell: 7, seed: 67 });
    else { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
    footer(g, this.tl, t, ['forward', 'exponential', 'backward', 'logarithm', 'directions', 'story'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  /** Hai cung + chữ uốn + chấm chạy; "One story" khép vòng. */
  ring(g, t) {
    const { cx, cy, r } = RING;
    const close = smooth(prog(t, this.story.start, this.story.words[1].start + 0.1));
    const kg = prog(t, this.fwd.start, this.fwd.end + 0.2, outExpo), kb = prog(t, this.back.start, this.back.end + 0.2, outExpo);
    const gEnd = lerp(A9, lerp(A3 - 0.35, A3, close), kg), bEnd = lerp(A9, lerp(0.35, 0, close), kb);   // xanh đi ngược: π → 0
    const white = 1 - prog(t, this.story.words[1].start + 0.1, this.story.words[1].start + 0.5);
    g.save(); g.lineWidth = 12; g.lineCap = 'round';
    for (const [col, a0, a1, ccw] of [[PAL.fwd, A9, gEnd, false], [PAL.back, A9, bEnd, true]]) {
      if (a0 === a1) continue;
      g.strokeStyle = col; g.shadowColor = col; g.shadowBlur = 28;
      g.beginPath(); g.arc(cx, cy, r, a0, a1, ccw); g.stroke();
      if (close < 1) this.head(g, cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, a1 + (ccw ? -Math.PI / 2 : Math.PI / 2), col, 1 - close);
    }
    if (close >= 1 && white > 0) {                                  // vòng khép: loé trắng
      g.strokeStyle = PAL.truth; g.shadowColor = PAL.truth; g.shadowBlur = 50 * white; g.lineWidth = 12 + 14 * white;
      g.globalAlpha = white; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
    }
    g.restore();
    // chữ uốn: vàng phía trên-trái, xanh phía dưới-phải (đọc xuôi: chữ dưới quay mặt ra ngoài, xếp ngược)
    const ew = this.exp.words[0], lw = this.log.words[0];
    arcText(g, 'FORWARD · EXPONENTIAL', cx, cy, r + 48, 1.08 * Math.PI, { font: '800 40px "Archivo"', color: PAL.fwdCore,
      reveal: prog(t, this.fwd.start, ew.end + 0.1) });
    // xếp ngược + quay mặt ra ngoài: chữ ĐẦU nằm ở cuối cung → hiện n chữ đầu = vẽ n ký tự cuối của chuỗi ngược, neo ở cuối cung
    const BL = 'BACKWARD · LOGARITHM', n = Math.ceil(BL.length * prog(t, this.back.start, lw.end + 0.1));
    if (n > 0) {
      const vis = [...BL.slice(0, n)].reverse().join('');
      g.save(); g.font = BL_FONT; const da = (s) => [...s].reduce((a, ch) => a + g.measureText(ch).width, 0) / (r + 70);
      const a0 = BL_A0 + da(BL) - da(vis); g.restore();
      arcText(g, vis, cx, cy, r + 70, a0, { font: BL_FONT, color: PAL.backCore, flip: true });
    }
    // "Two directions": chấm sáng chạy hai chiều
    const run = prog(t, this.two.start, this.story.start);
    if (run > 0 && run < 1) for (const [col, dir] of [[PAL.fwdCore, 1], [PAL.backCore, -1]]) {
      const a = A9 + dir * Math.PI * ((run * 2) % 1);
      g.save(); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 30; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 16, 0, Math.PI * 2); g.fill(); g.restore();
    }
    // nhịp: chấm ở 9 giờ (gốc chung) đập theo beat
    g.save(); g.fillStyle = PAL.truth; g.beginPath(); g.arc(cx - r, cy, (12 + 6 * beat.beatPulse(t, 0.16)) * outBack(clamp((t - this.t0) / 0.3)), 0, Math.PI * 2); g.fill(); g.restore();
  }
  head(g, x, y, a, col, s) {
    g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s); g.fillStyle = col;
    g.beginPath(); g.moveTo(30, 0); g.lineTo(-14, -22); g.lineTo(-14, 22); g.closePath(); g.fill(); g.restore();
  }
}
