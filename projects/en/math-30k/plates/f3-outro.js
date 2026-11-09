// "Outro" (SCRIPT.md) — giấy in. Câu 225–226 của p2 (+ 2 s đuôi video).
//   tên kênh 99% FROM SCRATCH · dấu SUBSCRIBE · nét vạch dài thành con đường: các mốc + thứ được phát minh
//   "videos to come": bốn khung trống, "deeper, more detail" điền ký hiệu · người dẫn đường quay lưng đi xa dọc con đường
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, figure, stamp, lookup } from '../kit.js';

const E = ERA.paper;
const STOPS = [-30000, -3000, -1700, -300, 628, 820, 1202, 1545, 1585, 1637, 1670, 1806, 1829, 1854, 1874, 1901, 1931, 1936];
const GLYPH = [['|||', -30000], ['60', -3000], ['0', 628], ['x', 1637], ['∫', 1670], ['i', 1806], ['∞', 1874]];
// con đường: P(u), u ∈ [0, 0.5] là quá khứ (thang log như thước), sau 0.5 là phía trước (nét đứt)
const P = u => [120 + 1640 * u, 1000 - 380 * u];
const uy = y => { const a = Math.log(2030 + 30000), b = Math.log(2030 - 1936); return 0.5 * (a - Math.log(2030 - y)) / (a - b); };

export default class Outro {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['peace-back'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      s225: L(225).start, enjoyed: w(225, 'enjoyed'), subscribe: w(225, 'subscribe'), walk: w(225, 'walk'), each: w(225, 'each'),
      inventions: w(225, 'inventions'), videos: w(225, 'videos'), come: w(225, 'come'), deeper: w(225, 'deeper'), detail: w(225, 'detail'),
      thanks: w(226, 'thanks'), watching: w(226, 'watching'), end: L(226).end,
    };
    this.START = this.T.s225;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');
    // tên kênh — thẻ sạch
    g.save(); g.font = '800 92px "Archivo"'; g.fontStretch = 'condensed'; g.fillStyle = E.ink;
    const s = '99% FROM SCRATCH', n = Math.round(s.length * prog(t, this.FROM + 0.3, this.START + 0.4)); if (n) g.fillText(s.slice(0, n), 128, 210); g.restore();
    hand(g, seg(130, 236, 700, 236, 30), { w: 4, color: E.accent, jit: 1, seed: 3, k: prog(t, this.START, this.START + 0.6) });
    stamp(g, 'SUBSCRIBE', 400, 340, prog(t, T.subscribe, T.subscribe + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.07 });

    // con đường: quá khứ đậm, phía trước nét đứt
    const kr = prog(t, this.START - 0.4, this.START + 0.8);
    const past = Array.from({ length: 41 }, (_, i) => P(0.5 * i / 40)), ahead = Array.from({ length: 31 }, (_, i) => P(0.5 + 0.48 * i / 30));
    hand(g, past, { w: 4, color: E.ink, jit: 1, seed: 7, k: kr });
    g.save(); g.setLineDash([14, 12]); hand(g, ahead, { w: 3, color: E.dim, jit: 0, seed: 9, k: prog(kr, 0.6, 1) }); g.restore();
    STOPS.forEach((y, i) => { const [x, yy] = P(uy(y)), a = T.walk + i * 0.05; hand(g, seg(x, yy - 16, x, yy + 6, 3), { w: 3, color: E.ink, jit: 0.4, seed: 20 + i, k: prog(t, a, a + 0.15) }); });
    GLYPH.forEach(([gl, y], i) => { const [x, yy] = P(uy(y)), a = T.each + i * 0.12;
      typed(g, gl, x, yy - 36 - (i % 2) * 44, prog(t, a, a + 0.12), 'italic 600 44px "Cormorant Garamond"', E.accent, { align: 'center' }); });
    const [tx, ty] = P(0.5);
    typed(g, 'TODAY', tx - 10, ty + 44, kr, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
    typed(g, '30,000 YEARS AGO', 130, 1000, kr, '500 20px "IBM Plex Mono"', E.dim);

    // "videos to come": bốn khung trống phía trước; "deeper, in more detail": ký hiệu được điền vào
    [['|||', 0], ['60', 1], ['∫', 2], ['∞', 3]].forEach(([gl, i]) => {
      const a = T.videos + i * 0.12, k = prog(t, a, a + 0.3); if (k <= 0) return;
      const x = 1250 + i * 140, sc = outBack(k);
      g.save(); g.translate(x + 60, 165); g.scale(sc, sc); g.setLineDash([8, 6]); g.strokeStyle = E.ink; g.lineWidth = 3; g.strokeRect(-60, -45, 120, 90); g.restore();
      const b = (i < 2 ? T.deeper : T.detail) + (i % 2) * 0.15;
      typed(g, gl, x + 60, 182, prog(t, b, b + 0.2), 'italic 600 52px "Cormorant Garamond"', E.ink, { align: 'center' });
    });
    typed(g, 'NEXT', 1250, 240, prog(t, T.come, T.come + 0.3), '500 20px "IBM Plex Mono"', E.dim);

    typed(g, 'Thanks for watching!', 130, 560, prog(t, T.thanks - 0.05, T.watching + 0.4), 'italic 500 72px "Cormorant Garamond"', E.ink);

    // người dẫn đường quay lưng (ảnh cắt ngang hông → đứng ở tiền cảnh, mép dưới khuất khỏi khung),
    // đi chậm theo hướng con đường rồi ra khỏi khung bên phải trong đuôi video
    const kf = prog(t, this.START - 0.2, this.START + 0.2);
    if (kf > 0) {
      const wk = prog(t, T.walk, T.end + 2.0), go = Math.pow(prog(t, T.thanks, T.end + 1.9), 2);
      const x = 1470 + 220 * prog(t, T.walk, T.thanks) + 900 * go, h = 780 - 90 * wk;
      const bob = wk > 0 && wk < 1 ? Math.abs(Math.sin((t - T.walk) * 5.5)) * 8 : 0;
      figure(g, 'peace-back', x, 1190 - bob, h, 'paper', kf);
    }
  }
}
