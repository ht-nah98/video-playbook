// P09 truth — "Đi theo điều phải đúng" · 35.68 → 37.78 (TREATMENT P09)
// Sân khấu nhiều lớp bật lần đầu: sàn ký hiệu + chân trời. Các lá bài "định nghĩa" bị gạt
// khỏi bàn; sợi chỉ vàng; nhân vật đi dọc sợi chỉ; TRUE trắng sắc.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';

const CARDS = [['aⁿ =', 'a·a·…·a'], ['n =', '1, 2, 3 …'], ['a⁰ =', '?'], ['a⁻¹ =', '?'], ['a^½ =', '?']];
const THREAD = [[-60, 780], [600, 700], [1300, 720], [1980, 560]];   // bézier bậc ba, trên mặt sàn
const bez = (u) => {
  const [a, b, c, d] = THREAD, v = 1 - u;
  return [0, 1].map(k => v * v * v * a[k] + 3 * v * v * u * b[k] + 3 * v * u * u * c[k] + u * u * u * d[k]);
};

export default class P09 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.l1 = s.tl.line("We didn't pick the meaning.");
    this.l2 = s.tl.line('We followed');
    this.l3 = s.tl.line('what had to stay true.');
    this.pick = this.l1.words[2].start;           // "pick": gạt bài
    this.tTrue = this.l3.words[4].start;          // "true"
    this.next = s.tl.at('Keep the rule alive,');
  }
  backdropAt(t) {                                  // sàn hiện dần khi vào cảnh — P10 nhận sàn đầy
    return { glow: 0.8, floor: smooth(prog(t, this.t0, this.t0 + 0.6)), horizon: 700 };
  }
  camera(t) { return { s: 1 + 0.04 * smooth(prog(t, this.t0, this.next)), bg: 0.3 }; }
  render(g, t) {
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 9 });
    footer(g, this.tl, t, ['meaning', 'followed', 'true'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  card(g, i, x, y, rot) {
    g.save(); g.translate(x, y); g.rotate(rot);
    g.fillStyle = PAL.paper; g.fillRect(-140, -90, 280, 180);
    g.strokeStyle = PAL.fwd; g.lineWidth = 4; g.strokeRect(-140, -90, 280, 180);
    g.fillStyle = PAL.block; g.font = '500 20px "IBM Plex Mono"'; g.textAlign = 'left'; g.fillText(`DEF #${i + 1}`, -122, -58);
    g.fillStyle = PAL.ink; g.textAlign = 'center';
    g.font = '800 44px "Archivo"'; g.fillText(CARDS[i][0], 0, -2);
    g.font = '500 34px "IBM Plex Mono"'; g.fillText(CARDS[i][1], 0, 52);
    g.restore();
  }
  paint(g, t) {
    // 1) năm lá bài chia ra thành hình quạt, rồi bị gạt sang trái ở "pick"
    CARDS.forEach((_, i) => {
      const inK = outBack(clamp((t - this.t0 - 0.05 * i) / 0.3));
      if (inK <= 0) return;
      const sw = smooth(prog(t, this.pick + 0.06 * (4 - i), this.pick + 0.06 * (4 - i) + 0.45));
      if (sw >= 1) return;
      const x = 560 + i * 200 - 2400 * sw * sw, y = 430 + (1 - inK) * 500 - 160 * sw;
      this.card(g, i, x, y, (i - 2) * 0.08 - 1.4 * sw);
    });
    // 2) sợi chỉ vàng vạch từ trái sang phải
    const draw = smooth(prog(t, this.l2.start, this.l2.start + 0.7));
    if (draw > 0) {
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 6; g.shadowColor = PAL.fwd; g.shadowBlur = 26; g.lineCap = 'round';
      g.beginPath();
      for (let u = 0; u <= draw + 1e-9; u += 0.01) { const [x, y] = bez(Math.min(u, draw)); u === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke(); g.restore();
    }
    // 3) nhân vật đi dọc sợi chỉ (chân đặt trên chỉ), vào bằng hàng, ra bằng cột ký hiệu
    const walk = prog(t, this.l2.start, this.next);
    const [fx, fy] = bez(0.18 + 0.22 * walk);
    const p = presence(t, this.l2.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'wave', fx, fy + 6, 420, p.state === 'out' ? 'columns' : 'rows', p, { t, seed: 9 });
    // 4) TRUE: giải mã từng chữ từ "what", chốt đúng chữ "true", gạch vàng chạy dưới chân
    if (t >= this.l3.start) {
      const chars = decodeChars('TRUE', t, this.l3.start, this.tTrue, { scramble: 0.3, seed: 9 });
      g.save(); g.font = '900 210px "Archivo"'; g.textAlign = 'left'; g.fillStyle = PAL.truth;
      const ws = [...'TRUE'].map(c => g.measureText(c).width), total = ws.reduce((a, b) => a + b, 0);
      let x = 1330 - total / 2;
      chars.forEach((c, i) => { if (c.state !== 'hidden') g.fillText(c.ch, x, 380); x += ws[i]; });
      const u = smooth(clamp((t - this.tTrue) / 0.2));
      g.fillStyle = PAL.fwd; g.fillRect(1330 - total / 2, 410, total * u, 10);
      g.restore();
    }
  }
}
