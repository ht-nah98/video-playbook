// P05 rootwall — "Không nhân 1.414 lần được" · 16.50 → 20.62 (TREATMENT P05)
import { clamp, prog, hash, outBack, smooth } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { presence } from '../../../../engine/transit.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';

const DIGITS = '1.41421356237309504880168872420969807856967187537694';
const CHAIN = ['2', '×', '2', '×', '2'];         // phần tử 3 (× thứ hai) sẽ gãy
const CX = 200, CY = 820, CSTEP = 140;
const BURST_DUR = 0.3;

export default class P05 {
  backdrop = { glow: 0.8, haloX: 760, haloY: 480 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.l1 = s.tl.line('But root two on top—');
    this.l2 = s.tl.line('how many times is that?');
    this.l3 = s.tl.line("Can't repeat multiplication");
    this.l4 = s.tl.line('one-point-four-one-four like that.');
    this.snap = this.l3.words[2].start;           // "multiplication": dấu × thứ hai gãy đôi
    this.next = s.tl.at('So maybe the meaning');
    this.tB = this.next - BURST_DUR;              // mọi phần tử vỡ thành ký hiệu trước khi lao vào hầm
  }
  // số lần nhân đang đếm: 1 → 1.4 → 1.41 → … không bao giờ dừng
  count(t) { return DIGITS.slice(0, Math.min(DIGITS.length, 1 + Math.floor(Math.max(0, t - this.l2.start) / 0.14))); }
  render(g, t) {
    const { l1, l2, l3, l4, tB } = this;
    const bt = (str, x, y, font, col, seed, align = 'left') =>
      burstText(g, str, t, tB, x, y, font, col, { dur: BURST_DUR, seed, align });
    g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    // cơ số 2 khổng lồ
    // khung đầu = đúng 2³ cuối P04 (2 ở 900,560 cỡ 300; ³ cam ở 1080,380 cỡ 150), rồi 2 trượt về chỗ của nó
    const mv = smooth(prog(t, l1.start, l1.start + 0.3));
    bt('2', 900 - 340 * mv, 560 + 60 * mv, `900 ${(300 + 60 * mv).toFixed(1)}px "Archivo"`, PAL.truth, 40);
    // ³ cũ bị hất khỏi ghế số mũ, rơi xoay ra khỏi khung
    const fall = prog(t, l1.start + 0.12, l1.start + 0.9);
    if (fall < 1) {
      g.save(); g.translate(160 * fall, 900 * fall * fall); g.translate(1080, 380); g.rotate(fall * 2.4); g.translate(-1080, -380);
      g.font = '900 150px "Archivo"'; g.fillStyle = PAL.fwd; g.fillText('3', 1080, 380); g.restore();
    }
    // √2 leo lên ngồi vào chỗ số mũ
    const up = outBack(clamp((t - l1.start) / 0.45));
    bt('√2', 800, 340 + (1 - up) * 480, '900 170px "Archivo"', t >= this.snap ? PAL.block : PAL.fwd, 41);
    // bộ đếm số lần nhân, góc trên phải — chạy mãi; tới "one-point-four…" chữ số rơi, nhãn vỡ, khung co lại
    const shrink = clamp((t - l4.start) / 0.25);
    if (t >= l2.start && shrink < 1) {
      const col = t >= this.snap ? PAL.block : PAL.fwd, k = 1 - smooth(shrink);
      g.save(); g.strokeStyle = col; g.lineWidth = 4; g.translate(1500, 205); g.scale(k, k); g.rotate(shrink * 0.4);
      g.strokeRect(-340, -75, 680, 150); g.restore();
      burstText(g, '× how many times?', t, l4.start, 1180, 120, '500 30px "IBM Plex Mono"', PAL.truth, { dur: 0.25, seed: 42 });
      if (t < l4.start) {
        const s = this.count(t), shown = s.length > 14 ? '…' + s.slice(-13) : s;
        g.font = '500 72px "IBM Plex Mono"'; g.fillStyle = t >= this.snap ? PAL.block : PAL.fwdCore; g.fillText(shown, 1190, 232);
      }
    }
    // chuỗi 2 × 2 × 2 cố lặp lại; dấu × thứ hai gãy đôi, màu đỏ
    CHAIN.forEach((c, i) => {
      const ti = l3.start + i * 0.08;
      if (t < ti) return;
      const x = CX + i * CSTEP, drop = outBack(clamp((t - ti) / 0.16));
      g.font = '900 120px "Archivo"'; g.textAlign = 'center';
      if (i === 3 && t >= this.snap) {
        const k = outBack(clamp((t - this.snap) / 0.35));
        const ex = t >= tB ? clamp((t - tB) / BURST_DUR) : 0;   // hai nửa gãy bay tiếp ra ngoài khi vỡ
        for (const side of [-1, 1]) {
          g.save(); g.globalAlpha = 1 - ex;
          g.translate(x + side * (50 * k + 160 * ex), CY - 40 + 90 * k * k + 200 * ex * ex); g.rotate(side * (0.5 * k + 2 * ex)); g.translate(-x, -(CY - 40));
          g.beginPath(); g.rect(side < 0 ? x - 80 : x, CY - 130, 80, 170); g.clip();
          g.fillStyle = PAL.block; g.fillText('×', x, CY); g.restore();
        }
      } else {
        bt(c, x, CY - (1 - drop) * 120, '900 120px "Archivo"', c === '×' ? PAL.fwd : PAL.truth, 50 + i, 'center');
      }
    });
    // "one-point-four-one-four": chữ số của bộ đếm rơi lả tả như mảnh vỡ
    if (t >= l4.start) {
      const s = this.count(l4.start), dt = t - l4.start;
      const fade = 1 - clamp((t - tB) / BURST_DUR);
      g.font = '500 72px "IBM Plex Mono"'; g.textAlign = 'center';
      for (let i = 0; i < Math.min(s.length, 14); i++) {
        const vx = (hash(i + 3) - 0.5) * 500, vy = -200 - hash(i + 11) * 300;
        g.save(); g.globalAlpha = fade; g.translate(1215 + i * 43 + vx * dt, 210 + vy * dt + 1500 * dt * dt);
        g.rotate((hash(i + 7) - 0.5) * 8 * dt);
        g.fillStyle = i % 3 === 0 ? PAL.block : PAL.fwdCore; g.fillText(s[i], 0, 0); g.restore();
      }
    }
    g.restore();
    // nhân vật gục xuống khi "Can't", vào bằng rows; tan trước khi sang P06
    const p = presence(t, l3.start, this.next - 0.5, { inDur: 0.3, outDur: 0.45 });
    figure(g, this.m, 'slump', 1560, 1060, 700, 'rows', p, { t, seed: 5 });
    footer(g, this.tl, t, ['root', 'times', 'repeat'], { at: tB, dur: BURST_DUR, from: this.t0 });
  }
}
