// P11b around — "TẤM GƯƠNG" (nửa sau) · 53.24 → 60.20 (TREATMENT P11, chorus 1)
// Cỗ máy của P11a chạy NGƯỢC: giá trị 8 vào khe phải, số mũ 3 bật ra khe trái (xanh).
// "Turn it around": cả khung lật qua gương như lật tấm bìa — mặt sau đổi vàng ⇄ xanh.
// "Forward and backward — same idea, everywhere": kính vạn hoa nở từ gương ra mép khung.
// Bè vọng (backing vocals 53–56, 59–61): lời vọng lật gương, xanh, ở nửa trên-trái.
import { prog, smooth } from '../../../../engine/lib.js';
import { mix } from '../../../../engine/draw.js';
import { drawMirrorLine, clipSide, foldMatrix } from '../../../../engine/mirror.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { footer } from '../kit.js';
import { FWD_AT, BACK_AT, arrowRow, machine, kaleido } from '../chorus.js';

const ECHO = [[53.0, 56.0], [59.0, 61.0]];        // data/stems.json: backing vocals

export default class P11b {
  async init(s) {
    this.tl = s.tl;
    this.fwd = s.tl.line('Run it forward,'); this.back = s.tl.line('run it back.');
    this.give = s.tl.line('Give me the exponent—');
    this.l1 = s.tl.line('Give me the value—'); this.l2 = s.tl.line('find the exponent.');
    this.turn = s.tl.line('Turn it around,');
    this.kal = s.tl.at('Forward and backward—');
    this.next = s.tl.at('Backward question.');
  }
  backdropAt(t) {
    return { glow: 0.7, horizon: 760, floor: 1, mirror: true, bokeh: 0.8,
      rings: { cx: 960, cy: 540, r0: 330, gap: 58, n: 4, alpha: 0.8 * (1 - smooth(prog(t, this.kal, this.kal + 0.5))),
        texts: ['RUN IT FORWARD', 'RUN IT BACK', '3 → 8', '8 → 3'] } };
  }
  camera(t) {                                     // kính vạn hoa xoay chậm và đẩy vào — P12 nhận đúng giá trị cuối
    const k = smooth(prog(t, this.kal, this.next));
    return { s: 1 + 0.08 * k, r: 0.25 * k, bg: 0 };
  }
  render(g, t) {
    // lật qua gương: c = cos(πk); qua nửa đường (c < 0) vẽ mặt sau (đổi màu) với |c| để chữ không bị ngược
    const k = smooth(prog(t, this.turn.start, this.turn.end));
    const c = Math.cos(Math.PI * k), swap = c < 0;
    g.save(); g.transform(...foldMatrix(MIRROR, Math.max(Math.abs(c), 0.001)));
    const A = swap ? PAL.back : PAL.fwd, B = swap ? PAL.fwd : PAL.back;
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {             // nền hai nửa giữ nguyên: vàng xuôi, xanh ngược
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    drawMirrorLine(g, MIRROR, 1, { width: 6, glow: 30 });          // dưới cỗ máy, như P11a (không nhảy lớp khi sang cảnh)
    if (t < this.kal + 0.3) shatter(g, cx => this.stage(cx, t, A, B), prog(t, this.kal - 0.2, this.kal + 0.3), t, { seed: 12 });
    g.restore();
    kaleido(g, t, this.kal);
    // bè vọng: lời đang hát lặp lại lật gương, xanh, ở nửa trên-trái
    // không tắt cứng: vỡ thành ký hiệu trước khi hết cửa sổ vọng, hết dòng, hoặc hết cảnh (P12 không vẽ bè vọng)
    const l = this.tl.lineAt(t), win = ECHO.find(([a, b]) => t >= a && t < Math.min(b, this.next));
    if (l && win)
      decodeLine(g, this.tl.wordsOf(l), t, 620, 210, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75,
        burstAt: Math.min(win[1], this.next, l.end) - 0.3, burstDur: 0.3 });
    footer(g, this.tl, t, ['value', 'exponent', 'around', 'forward', 'backward', 'everywhere'], { from: this.t0, carry: true });
  }
  stage(g, t, A, B) {                              // hai hàng mũi tên + cỗ máy chạy ngược (màu theo mặt đang hiện)
    arrowRow(g, t, FWD_AT, '3', '8', this.fwd.start, this.fwd.words[2].start, A);
    arrowRow(g, t, BACK_AT, '8', '3', this.back.start, this.back.words[2].start, B);
    const rev = t >= this.l1.start;
    const col = mix(A, B, smooth(prog(t, this.l1.words[3].start - 0.05, this.l1.words[3].start + 0.3)));   // đổi màu khi 8 vào khe
    const spin = rev ? (this.l1.start - this.give.start) * 2.2 - (t - this.l1.start) * 2.2 : (t - this.give.start) * 2.2;
    machine(g, t, rev
      ? { tIn: this.give.start, spin, rev: true, inCh: '8', inAt: this.l1.words[3].start + 0.3, inFrom: 460,
          outCh: '3', outAt: this.l2.words[2].start, col }
      : { tIn: this.give.start, spin, inCh: '3', inAt: this.give.words[3].start + 0.3, outCh: '8', outAt: 1e9, col: A });
  }
}
