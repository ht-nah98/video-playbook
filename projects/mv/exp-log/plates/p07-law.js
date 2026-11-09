// P07 law — "Giữ luật sống" · 25.38 → 29.24 (TREATMENT P07)
// Hai cột 2 nhập một → nhãn 2³·2² thành 2⁵ → phương trình đập như tim → số mũ rơi xuống thành trục số.
// Khung cuối khớp từng điểm với đầu P08 (cùng AXIS); phương trình và điện tim vỡ ra ngay trước P08.
import { W, clamp, prog, hash, outBack, smooth } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { PAL } from '../song.js';
import { powText, footer, AXIS, axisX, markLabel } from '../kit.js';

const ROW = 110, TOP = 330;                     // cột chữ 2 xếp dọc
const BURST_DUR = 0.3;
const EQ = '2³ · 2² = 2⁵';

export default class P07 {
  backdrop = { glow: 0.9 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('Same base multiplying,');
    this.l2 = s.tl.line('exponents combine.');
    this.l3 = s.tl.line('Keep that rule alive');
    this.l4 = s.tl.line('and the rest falls into line.');
    this.next = s.tl.at('Zero has no choice.');
    this.tB = this.next - BURST_DUR;            // phương trình + điện tim vỡ trước P08
  }
  render(g, t) {
    const { l1, l2, l3, l4 } = this;
    const tSwap = l2.start + 0.45;              // 2³ và 2² chạm nhau → thành 2⁵
    const tEq = l3.start - 0.1;                 // cột co xong → phương trình bật ra, cột và 2⁵ vỡ
    // 1) hai cột 2·2·2 và 2·2 sát lại, nhập thành một cột năm chữ 2
    const join = smooth(prog(t, l1.start + 0.2, l1.end));
    const shrink = smooth(prog(t, l2.end - 0.2, tEq));        // cột co vào giữa phương trình
    if (t < tEq + BURST_DUR) {
      g.save(); g.textAlign = 'center';
      for (let i = 0; i < 5; i++) {
        const left = i < 3;
        const x0 = left ? 760 : 1160, y0 = TOP + (left ? i : i - 3) * ROW;
        let x = x0 + (960 - x0) * join, y = y0 + (left ? 0 : 3 * ROW) * join;
        x += (960 + (i - 2) * 70 - x) * shrink; y += (520 - y) * shrink;   // xếp thành hàng ngang, không dồn thành một cục
        const font = `900 ${(100 - 20 * shrink).toFixed(0)}px "Archivo"`;
        if (t < tEq) { g.font = font; g.fillStyle = PAL.truth; g.fillText('2', x, y); }
        else burstText(g, '2', t, tEq, x, y, font, PAL.truth, { dur: BURST_DUR, seed: 30 + i, align: 'center' });
      }
      // dấu · giữa các chữ 2 (dấu giữa hai cột chỉ có khi đã nhập), vỡ khi cột bắt đầu co
      const dots = [[0, 1], [1, 1], [3, 1], [2, join]];
      for (const [i, k] of dots) {
        const left = i < 3;
        const x0 = left ? 760 : 1160, y0 = TOP + (left ? i : i - 3) * ROW;
        let x = x0 + (960 - x0) * join, y = y0 + (left ? 0 : 3 * ROW) * join + ROW / 2 - 6;
        if (k <= 0.05 || shrink > 0.5) continue;
        x += (960 - x) * shrink; y += (520 - y) * shrink;
        g.font = `900 ${(80 * k).toFixed(0)}px "Archivo"`; g.fillStyle = PAL.fwd; g.fillText('·', x, y);
      }
      g.restore();
      // nhãn 2³ và 2² trên đầu mỗi cột (nảy ra khi cột đã dựng); "exponents combine": trượt vào nhau rồi thành 2⁵
      const pop = outBack(clamp((t - l1.start - 0.15) / 0.3));
      const c = smooth(prog(t, l2.start, tSwap));
      if (pop > 0 && t < tSwap) {
        for (const [sx, e, dir] of [[760, '3', 1], [1160, '2', -1]]) {
          g.save(); g.translate(sx + 100 * dir * c, TOP - 150 - 40 * c); g.scale(pop, pop);
          powText(g, [['2', e]], 0, 0, 90); g.restore();
        }
      } else if (t >= tSwap && t < tEq) {
        const burstOld = clamp((t - tSwap) / BURST_DUR);
        if (burstOld < 1) for (const [sx, e, dir] of [[860, '3', 1], [1060, '2', -1]])
          burstText(g, `2${e === '3' ? '³' : '²'}`, t, tSwap, sx, TOP - 190, '900 90px "Archivo"', PAL.truth, { dur: BURST_DUR, seed: 40 + dir, align: 'center' });
        const s = outBack(clamp((t - tSwap - 0.1) / 0.25));    // chờ đám vỡ của nhãn cũ tan bớt
        g.save(); g.translate(960, TOP - 120); g.scale(s, s);
        powText(g, [['2', '5']], 0, 0, 120); g.restore();
      } else if (t >= tEq) {
        burstText(g, '2⁵', t, tEq, 960, TOP - 120, '900 120px "Archivo"', PAL.truth, { dur: BURST_DUR, seed: 45, align: 'center' });
      }
    }
    // 2) "Keep that rule alive": phương trình đập như nhịp tim trên beat, kèm đường điện tim
    if (t >= tEq && t < this.tB) {
      const beat = this.beat.beatPulse(t, 0.12);
      const s = outBack(clamp((t - tEq) / 0.25)) * (1 + 0.1 * beat);
      g.save(); g.translate(960, 520); g.scale(s, s);
      powText(g, [['2', '3'], ' · ', ['2', '2'], ' = ', ['2', '5']], 0, 40, 130);
      g.restore();
    } else if (t >= this.tB) {
      burstText(g, EQ, t, this.tB, 960, 560, '900 130px "Archivo"', PAL.truth, { dur: BURST_DUR, seed: 50, align: 'center' });
    }
    if (t >= l3.start) {
      // điện tim: chạy từ trái sang, gai nhọn đúng mỗi beat; mờ đi cùng lúc phương trình vỡ
      g.save(); g.globalAlpha = 1 - smooth(prog(t, this.tB, this.next));
      g.strokeStyle = PAL.fwd; g.lineWidth = 5; g.shadowColor = PAL.fwd; g.shadowBlur = 18;
      g.beginPath();
      const head = W * smooth(prog(t, l3.start, l3.start + 0.7));
      for (let x = 0; x <= head; x += 6) {
        const tx = t - (head - x) / 900;                     // thời điểm điểm này được vẽ
        const ph = this.beat.sinceBeat(tx) / this.beat.BEAT;
        const y = 700 - (ph < 0.08 ? Math.sin(ph / 0.08 * Math.PI) * 110 : ph < 0.14 ? -Math.sin((ph - 0.08) / 0.06 * Math.PI) * 40 : 0);
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke(); g.restore();
    }
    // 3) "the rest falls into line": số mũ rải rác rơi xuống, xếp hàng thành trục số
    if (t >= l4.start) {
      const line = smooth(prog(t, l4.start + 0.5, l4.end));
      g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4;
      g.beginPath(); g.moveTo(axisX(-2.5), AXIS.y); g.lineTo(axisX(-2.5) + (axisX(3.4) - axisX(-2.5)) * line, AXIS.y); g.stroke();
      g.textAlign = 'center'; g.font = '900 64px "Archivo"';
      AXIS.marks.forEach((v, i) => {
        const ti = l4.start + hash(i + 21) * 0.35, f = clamp((t - ti) / 0.5);
        if (t < ti) return;
        const sx = 200 + hash(i + 5) * 1520, sy = -60;                 // rơi từ chỗ rải rác trên trời
        const x = sx + (axisX(v) - sx) * smooth(f), y = sy + (AXIS.y + 70 - sy) * outBack(f);
        g.fillStyle = v < 0 ? PAL.back : PAL.fwd;
        g.save(); g.translate(x, y); g.rotate((1 - f) * (hash(i + 9) - 0.5) * 3); g.fillText(markLabel(v), 0, 0); g.restore();
      });
      g.restore();
    }
    footer(g, this.tl, t, ['same', 'combine', 'rule', 'line'], { at: this.next - 0.3, dur: BURST_DUR, from: this.t0 });
  }
}
