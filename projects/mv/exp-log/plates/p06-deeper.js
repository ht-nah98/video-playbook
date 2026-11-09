// P06 deeper — "Luật nằm sâu hơn" · 20.62 → 25.38 (TREATMENT P06)
// Đường hầm chữ COUNT lao qua camera → dưới đáy là mặt trời làm bằng phương trình.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { PAL } from '../song.js';
import { powText, footer } from '../kit.js';

const RING = 'COUNT · IIII · COUNT · 1 · 2 · 3 · ';
// tia sáng: mỗi tia là một đẳng thức cùng luật aᵐ·aⁿ = aᵐ⁺ⁿ
const RAYS = ['2³·2² = 2⁵', '2¹·2⁰ = 2¹', '3²·3² = 3⁴', '2⁴·2¹ = 2⁵', '5¹·5¹ = 5²', '2²·2² = 2⁴',
  '10²·10¹ = 10³', '2³·2³ = 2⁶', '7¹·7² = 7³', '2⁵·2² = 2⁷', '3¹·3³ = 3⁴', '2⁰·2⁰ = 2⁰'];
const SX = 960, SY = 470;
const BURST_DUR = 0.3;

export default class P06 {
  backdrop = { glow: 0.5, haloX: SX, haloY: SY };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.dive = s.tl.at('So maybe the meaning');
    this.sun = s.tl.at('Maybe there is one deeper law');
    this.out = s.tl.at('that everything comes out from.');
    this.next = s.tl.at('Same base multiplying,');
    this.tB = this.next - BURST_DUR;            // mặt trời và tia vỡ thành ký hiệu trước P07
  }
  // một vòng hầm: khung chữ nhật chữ COUNT ở độ sâu z (z nhỏ = gần camera)
  ring(g, z, i) {
    const sc = 1 / z, hw = 1000 * sc, hh = 560 * sc, size = Math.max(6, 46 * sc);
    g.save(); g.translate(SX, SY);
    g.font = `800 ${size.toFixed(1)}px "Archivo"`; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillStyle = i % 2 ? PAL.fwd : PAL.truth;
    const s = RING.repeat(8), sides = [[0, -hh, hw * 2], [Math.PI / 2, -hw, hh * 2], [Math.PI, -hh, hw * 2], [-Math.PI / 2, -hw, hh * 2]];
    for (const [a, off, len] of sides) {
      g.save(); g.rotate(a); g.translate(-len / 2, off);
      g.beginPath(); g.rect(0, -size, len, size * 2); g.clip();
      g.fillText(s, -((i * 97) % 300) * sc, 0); g.restore();
    }
    g.restore();
  }
  render(g, t) {
    // 1) lao xuống: vòng sinh ở z = 8, lao về camera ngày càng nhanh; ngừng sinh trước mặt trời
    // vòng hầm bay tiếp cho tới khi ra khỏi khung, nhưng bị khoét chỗ mặt trời (không lọt qua đĩa)
    const disc = t >= this.sun ? 210 * 1.6 * outBack(clamp((t - this.sun) / 0.5)) : 0;
    g.save();
    if (disc > 0) { g.beginPath(); g.rect(0, 0, 1920, 1080); g.arc(SX, SY, disc, 0, Math.PI * 2, true); g.clip('evenodd'); }
    for (let i = 0; i < 40; i++) {
      const born = this.dive + i * 0.1;
      if (born > this.sun - 0.2 || t < born) continue;
      const z = 8 - 5.5 * (t - born) - 1.5 * (t - born) ** 2;
      if (z > 0.18) this.ring(g, z, i);
    }
    g.restore();
    const burst = { at: this.tB, dur: BURST_DUR, from: this.t0 };
    if (t < this.sun) return footer(g, this.tl, t, ['meaning', 'count', 'law', 'everything'], burst);
    // 2) mặt trời: lõi vàng bloom + phương trình, bung ra bằng outBack; vỡ ở tB
    const grow = outBack(clamp((t - this.sun) / 0.5));
    const pulse = t >= this.out ? this.beat.beatPulse(t, 0.16) : 0;
    const gone = smooth(prog(t, this.tB, this.tB + BURST_DUR));
    const R = 210 * grow * (1 + 0.08 * pulse);
    if (gone < 1) {
      g.save(); g.globalAlpha = 1 - gone;
      const gr = g.createRadialGradient(SX, SY, 0, SX, SY, R * 1.6);
      gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.55, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
      g.fillStyle = gr; g.shadowColor = PAL.fwd; g.shadowBlur = 60;
      g.beginPath(); g.arc(SX, SY, R * 1.6, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    if (grow > 0.3 && t < this.tB) powText(g, [['a', 'm'], ' · ', ['a', 'n'], ' = ', ['a', 'm+n']], SX, SY + 28, 84 * grow, { col: PAL.bg, expCol: PAL.bg });
    else if (t >= this.tB) burstText(g, 'aᵐ · aⁿ = aᵐ⁺ⁿ', t, this.tB, SX, SY + 28, '900 84px "Archivo"', PAL.bg, { dur: BURST_DUR, seed: 60, align: 'center' });
    // 3) tia sáng là dòng chữ nhỏ, mọc dần từ lõi ra; từ "everything comes out" thì dài ra theo beat
    const reach = smooth(prog(t, this.sun + 0.2, this.sun + 0.9));
    g.save(); g.font = '500 30px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.textAlign = 'left';
    RAYS.forEach((s, i) => {
      const a = (i / RAYS.length) * Math.PI * 2 - Math.PI / 2 + 0.12 * Math.sin(t * 0.6);
      const n = Math.ceil(s.length * reach);
      if (n <= 0) return;
      g.save(); g.translate(SX, SY); g.rotate(a);
      g.fillStyle = i % 2 ? PAL.fwdCore : PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 12;
      if (t >= this.tB) {
        burstText(g, s, t, this.tB, R * 1.35 + 40 * pulse, 0, '500 30px "IBM Plex Mono"', i % 2 ? PAL.fwdCore : PAL.fwd, { dur: BURST_DUR, seed: 70 + i });
      } else {
        g.fillText(s.slice(0, n), R * 1.35 + 40 * pulse, 0);
        // chùm phát ra theo beat: một bản sao chạy dọc tia rồi ra khỏi khung
        if (t >= this.out) {
          const run = (t - this.out) * 520 + (i % 3) * 180;
          g.fillStyle = PAL.fwdCore; g.fillText(s, R * 1.35 + 360 + (run % 900), 0);
        }
      }
      g.restore();
    });
    g.restore();
    footer(g, this.tl, t, ['meaning', 'count', 'law', 'everything'], burst);
  }
}
