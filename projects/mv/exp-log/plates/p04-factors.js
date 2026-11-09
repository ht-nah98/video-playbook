// P04 factors — "Ba thừa số" · 11.80 → 16.48, cắt cứng ở 12.52 (TREATMENT P04)
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { drawTransit, presence } from '../../../../engine/transit.js';
import { fillWord } from '../../../../engine/fill.js';
import { PAL, CUE } from '../song.js';
import { footer } from '../kit.js';

const XS = [560, 960, 1360], Y = 640;
const BASE_X = 900, BASE_Y = 560, BASE_SIZE = 300, BIG_SIZE = 360;   // chữ 2 của 2³ và cỡ khi còn là thừa số
const BURST_DUR = 0.3;

export default class P04 {
  backdrop = { glow: 1 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('Two times two times two,');
    this.l2 = s.tl.line('yeah, I know that game.');
    this.l3 = s.tl.line('Three little factors,');
    this.l4 = s.tl.line('power gets the name.');
    const w = this.l1.words;                                    // two times two times two
    this.hits = [w[0].start, CUE.drop, w[4].start];             // chữ 2 thứ hai rơi ĐÚNG drop
    this.timesT = [w[1].start, w[3].start];
    this.next = s.tl.at('But root two on top—');                 // nhân vật tan trước P05
    this.tB = this.next - BURST_DUR;                            // chữ vỡ thành ký hiệu (riêng chữ 2 gốc được cắt: P05 cũng mở bằng chữ 2 khổng lồ)
  }
  render(g, t) {
    // trước drop: chưa có nhạc — nền tối hẳn (backdrop vẫn vẽ, ta phủ mờ lên)
    if (t < CUE.drop) { g.fillStyle = 'rgba(11,15,30,0.7)'; g.fillRect(0, 0, 1920, 1080); }
    // loé khi drop
    const flash = 1 - smooth(prog(t, CUE.drop, CUE.drop + 0.22));
    if (t >= CUE.drop && flash > 0) {                          // loé toả từ chỗ chữ 2 đập xuống — chữ trắng vẫn nổi
      g.save(); g.globalCompositeOperation = 'lighter';
      const fl = g.createRadialGradient(960, 560, 0, 960, 560, 1100);
      fl.addColorStop(0, `rgba(255,181,71,${0.55 * flash})`); fl.addColorStop(1, 'rgba(255,181,71,0)');
      g.fillStyle = fl; g.fillRect(0, 0, 1920, 1080); g.restore();
    }
    // ba chữ 2 bay lên, thu nhỏ, hợp vào chữ 2 của 2³ (up 0→0.6), rồi 2³ đứng thay (không có ảnh đôi)
    const up = smooth(prog(t, this.l3.start, this.l3.start + 0.5));
    g.save(); g.font = `900 ${BASE_SIZE}px "Archivo"`;
    const baseCx = BASE_X + g.measureText('2').width / 2;
    g.restore();
    if (up < 0.6) {
      const conv = smooth(clamp(up / 0.6));
      this.hits.forEach((ht, i) => {
        if (t < ht) return;
        const f = outBack(clamp((t - ht) / 0.14));
        const x = XS[i] + (baseCx - XS[i]) * conv, y = Y + (BASE_Y - Y) * conv;
        const size = (BIG_SIZE + (BASE_SIZE - BIG_SIZE) * conv) * (i === 2 ? 1 : 1 - conv);   // hai chữ 2 kia co về 0, chỉ còn chữ 2 cuối
        g.save(); g.globalAlpha = clamp(f * 2);
        g.font = `900 ${size.toFixed(1)}px "Archivo"`; g.textAlign = 'center'; g.fillStyle = PAL.truth;
        g.fillText('2', x, y - (1 - f) * 300); g.restore();
      });
    }
    // dấu × giữa các chữ 2, rung khi hát "times"; vỡ thành ký hiệu khi các chữ 2 bay lên
    this.timesT.forEach((tt, i) => {
      if (t < tt) return;
      const r = Math.sin((t - tt) * 30) * 6 * (1 - prog(t, tt, tt + 0.3));
      burstText(g, '×', t, this.l3.start, (XS[i] + XS[i + 1]) / 2 + r, Y - 60, '900 140px "Archivo"', PAL.fwd, { dur: 0.25, seed: 20 + i, align: 'center' });
    });
    // 2³: 2 và ³ đứng nguyên qua mốc sang P05 (P05 khung đầu vẽ đúng vị trí này)
    if (up >= 0.6) {
      g.save(); g.font = `900 ${BASE_SIZE}px "Archivo"`; g.fillStyle = PAL.truth; g.textAlign = 'left'; g.fillText('2', BASE_X, BASE_Y); g.restore();
      const s3 = outBack(clamp(prog(up, 0.6, 1)));
      g.save(); g.translate(1080, 380); g.scale(s3, s3); g.translate(-1080, -380);
      burstText(g, '3', t, Infinity, 1080, 380, '900 150px "Archivo"', PAL.fwd, { dur: BURST_DUR, seed: 30 });   // ³ không vỡ: P05 nhận nguyên vẹn
      g.restore();
    }
    // POWER — nhãn dán vào chữ ³
    if (t >= this.l4.start) {
      const s = outBack(clamp((t - this.l4.start) / 0.2));
      g.save(); g.translate(1220, 372); g.scale(s, s); g.rotate(-0.06);
      if (t < this.tB) fillWord(g, 'POWER', 0, 0, { font: '900 130px "Archivo"', inner: ['2·2·2 = 8', '2³ = 8', 'three little factors'], drift: t * 90, innerColor: PAL.bg });
      else burstText(g, 'POWER', t, this.tB, 0, 0, '900 130px "Archivo"', PAL.fwd, { dur: BURST_DUR, seed: 31 });
      g.restore();
    }
    // nhân vật khoanh tay, vào bằng 'grid' khi "yeah, I know that game"
    const p = presence(t, this.l2.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    if (p.state === 'in') drawTransit(g, this.m, 'crossed', 260, 1060, 700, 'grid', 'in', p.k, { t, seed: 4 });
    else if (p.state === 'hold') this.m.draw(g, 'crossed', 260, 1060, 700, { ring: 0, shadow: false });
    else if (p.state === 'out') drawTransit(g, this.m, 'crossed', 260, 1060, 700, 'grid', 'out', p.k, { t, seed: 4 });
    // lời đọc ở chân khung
    footer(g, this.tl, t, ['two', 'three', 'power'], { at: this.tB, dur: BURST_DUR, from: this.t0 });
  }
}
