// Outro (SCRIPT.md § Outro, p2 câu 130) + đuôi trang ~2 s — trang trống, chỉ còn lỗ.
//   130   mascot peace-back trồi lên bên phải ("thank you"), rồi bước đi (trượt ngang + lặn) ở "see you in the next video";
//         "99% from scratch" viết vào lề dưới; số "0" trong lỗ viết lại (đóng vòng với đầu mục Looking back)
//   đuôi  máy quay nhích nhẹ về phía lỗ — KHÔNG về đen: khung cuối là trang sạch + lỗ
import { ERA, H, outCubic, prog, ground, typed, lookup, hole, figure } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640, HR = 64;
const M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

export default class Outro {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = ['peace-back'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd4');
    this.T = { thank: w(130, 'thank'), end: w(130, 'end'), see: w(130, 'see'), next: w(130, 'next'), video: w(130, 'video'), e130: L(130).end };
    this.START = L(130).start;
    this.FROM = this.START - 1.0;
    this.END = L(130).end + 2.0;                                   // p2.html: DUR = LEAD + cuối câu cuối + TAIL (2.0)
  }
  sfx() { return [{ t: this.T.end - 0.3, kind: 'pen' }]; }       // "99% FROM SCRATCH" viết vào lề dưới
  render(g, t) {
    const T = this.T;
    const drift = 1 + 0.05 * outCubic(prog(t, T.e130 + 0.4, this.END));   // nhích về lỗ, dừng đúng khung cuối
    g.save(); g.translate(HX, HY); g.scale(drift, drift); g.translate(-HX, -HY);
    ground(g, 'page');
    hole(g, HX, HY, HR, (r) => typed(g, '0', 0, r * 0.42, prog(t, T.thank - 0.2, T.thank + 0.3), I(120), ERA.void.ink, { align: 'center' }), { seed: 5 });
    typed(g, '99% FROM SCRATCH', HX, 990, prog(t, T.end - 0.3, T.end + 0.5), M(22), E.dim, { align: 'center' });
    g.restore();
    // mascot: trồi lên trước "thank you", bước đi ở "see you" (trượt sang phải + lặn), không về giữa khung
    const kIn = prog(t, T.thank - 0.45, T.thank - 0.05), go = prog(t, T.see + 0.1, T.video + 0.8);
    if (kIn > 0 && go < 1) {
      const e = go * go * (3 - 2 * go), bob = Math.abs(Math.sin(go * Math.PI * 3)) * 10;
      figure(g, 'peace-back', 1640 + e * 520, H + e * 380 - bob, 720, 'page', kIn);
    }
  }
}
