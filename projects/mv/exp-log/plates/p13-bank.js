// P13 bank — "Tiền trong ngân hàng" · 64.32 → 72.46 (TREATMENT P13, verse 2 mở)
// Con dấu LOGARITHM của P12 vỡ ra; bên dưới là sảnh két. 64.49 ka-ching: chồng xu tháng 0.
// "same percent every month": mỗi beat một chồng cao ×1.07, tờ lịch lật theo tháng.
// "One little multiplier": token ×1.07 nhảy từ đỉnh chồng này sang chồng sau — lặp mãi.
// "How much after ten?": câu hỏi treo trên chồng tháng 10 còn rỗng → gạch đỏ, vỡ.
// "Ask the harder question": đèn sảnh tối lại, chỉ còn vạch ×2. "When will it double?": lịch quay, dừng ở "?".
// Đoạn LẶNG (synth tắt): mọi lớp trôi nhẹ, chỉ nhấn ở ka-ching. Thế giới nối sang P14.
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { mix } from '../../../../engine/draw.js';
import { PAL } from '../song.js';
import { figure, footer, powText } from '../kit.js';
import { nameStamp } from '../chorus.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, monthAt, colX, valY, RATE, U } from '../bank.js';


export default class P13 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.cut = s.tl.at('logarithm.');
    this.every = s.tl.at('same percent every month.');
    this.mult = s.tl.at('One little multiplier,');
    this.ten = s.tl.line('“How much after ten?”');
    this.harder = s.tl.at('Ask the harder question—');
    this.dbl = s.tl.line('“When will it double?”');
    this.next = s.tl.at("Now the unknown");
    this.times = monthTimes(KACHING[0], this.every);
  }
  dim(t) { return smooth(prog(t, this.harder, this.harder + 0.6)); }   // đèn sảnh tối lại
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.6)), d = this.dim(t);
    return { glow: lerp(1, 0.85, k) * (1 - 0.5 * d), horizon: 760, floor: 0.85 * (1 - 0.55 * d), mirror: true,
      floorB: mix(PAL.back, PAL.fwd, k), bokeh: 0.8 * (1 - k), floorGlyphs: BANK_GLYPHS };
  }
  camera(t) { return { s: 1 + 0.05 * smooth(prog(t, this.t0, this.next)), cy: 500, bg: 0 }; }   // đẩy chậm về vạch ×2
  render(g, t) {
    const d = this.dim(t);
    vault(g, t, { alpha: 0.9 * (1 - 0.6 * d) });
    // con dấu của P12 vỡ thành ký hiệu ngay khi tiền vào
    if (t < this.t0 + 0.32) shatter(g, c => nameStamp(c, t, this.cut), prog(t, this.t0, this.t0 + 0.32), t, { seed: 14 });
    // ka-ching: hai vòng sáng ở chồng tháng 0
    KACHING.forEach((tk, i) => {
      const r = prog(t, tk, tk + 0.4);
      if (r <= 0 || r >= 1) return;
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 8 * (1 - r); g.shadowColor = PAL.fwd; g.shadowBlur = 24;
      g.beginPath(); g.arc(colX(0), valY(1), 30 + (110 + 60 * i) * r, 0, Math.PI * 2); g.stroke(); g.restore();
    });
    // cột tháng 10 còn rỗng: khung nét đứt chờ sẵn từ lúc hỏi "after ten?"
    if (t >= this.ten.start && t < this.times[10]) {
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.6; g.lineWidth = 3;
      g.strokeRect(colX(10) - 28, valY(RATE ** 10), 56, RATE ** 10 * U); g.restore();
    }
    stacks(g, t, this.times, { alpha: 1 - 0.45 * d });
    doubleLine(g, t, prog(t, this.harder + 0.1, this.harder + 0.8, smooth));
    if (t < this.next) shatter(g, c => this.token(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 20 });   // token vỡ trước khi sang P14
    // "How much after ten?" — treo trên tháng 10, gạch đỏ ở cuối câu, rồi vỡ
    const q0 = this.ten.start, strike = this.ten.end - 0.1, gone = this.harder + 0.15;
    if (t >= q0 && t < gone + 0.3)
      shatter(g, c => this.question(c, t, strike), prog(t, gone, gone + 0.3), t, { seed: 15 });
    // lịch: lật theo tháng; "When will it double?" quay số rồi dừng ở "?"
    const m = monthAt(this.times, t), spin = t >= this.dbl.start;
    const stopAt = this.dbl.words[2].start;              // dừng ở "?" trước "double" — dấu ? sẽ thành ô □ của P14
    let label = null, flipAt = this.times[Math.max(m, 0)];
    if (spin && t < stopAt) { const step = Math.floor((t - this.dbl.start) * 14); label = String(1 + ((step * 7) % 24)); flipAt = -1; }   // quay số: không co trang từng bước
    else if (spin) { label = '?'; flipAt = stopAt; }
    calendar(g, t, Math.max(m, 0), flipAt, { label, labelCol: label === '?' ? PAL.block : PAL.ink,
      appear: outBack(clamp((t - this.every) / 0.3)) });
    // nhân vật: khoanh tay tự tin ("tiền trong ngân hàng"), vào bằng cột ký hiệu
    const p = presence(t, this.times[0] + 0.15, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'crossed', 1735, 1050, 610, p.state === 'out' ? 'digits' : 'columns', p, { t, seed: 13 });
    footer(g, this.tl, t, ['money', 'percent', 'multiplier', 'again', 'ten', 'harder', 'double'], { from: this.t0 });   // P14 carry vỡ hộ
  }
  /** Token ×1.07: nhảy theo cung từ đỉnh chồng trước sang đỉnh chồng vừa mọc. */
  token(g, t) {
    if (t < this.mult) return;
    const m = monthAt(this.times, t);
    if (m < 0) return;
    const tm = this.times[m], k = smooth(clamp((t - Math.max(tm, this.mult)) / 0.28));
    const from = m > 0 && tm > this.mult ? m - 1 : m;
    const x = lerp(colX(from), colX(m), k), y = lerp(valY(RATE ** from), valY(RATE ** m), k) - 46 - Math.sin(Math.PI * k) * 60;
    const shown = decodeChars('×1.07', t, this.mult, this.mult + 0.25, { seed: 3 }).filter(c => c.state !== 'hidden').map(c => c.ch).join('');
    const pop = outBack(clamp((t - this.mult) / 0.25));
    g.save(); g.translate(x, y); g.scale(pop, pop);
    g.fillStyle = PAL.bg; g.strokeStyle = PAL.fwd; g.lineWidth = 3;
    g.beginPath(); g.roundRect(-62, -24, 124, 48, 24); g.fill(); g.stroke();
    g.fillStyle = PAL.fwdCore; g.font = '600 28px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(shown, 0, 2);
    g.restore();
  }
  question(g, t, strike) {
    const x = colX(10), y = valY(RATE ** 10) - 120;
    const w = powText(g, [['1.07', '10'], ' = ?'], x, y, 64);
    const s = smooth(prog(t, strike, strike + 0.2));
    if (s > 0) {
      g.save(); g.strokeStyle = PAL.block; g.lineWidth = 9; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 16;
      g.beginPath(); g.moveTo(x - w / 2 - 14, y - 18); g.lineTo(x - w / 2 - 14 + (w + 28) * s, y - 26); g.stroke(); g.restore();
    }
  }
}
