// P03 wait — "2^√2 — kẹt" · 8.00 → 11.80 (TREATMENT P03)
import { W, clamp, prog, hash, smooth } from '../../../../engine/lib.js';
import { decodeLine, burstText } from '../../../../engine/lyric.js';
import { drawTransit, presence } from '../../../../engine/transit.js';
import { PAL } from '../song.js';

const DIGITS = '1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157';
const BURST_DUR = 0.3;
const DIGIT_STEP = 42, DIGIT_RATE = 60, DIGIT_Y = 100;    // chữ số gõ nhanh từ trái sang phải, tràn ra khỏi mép phải, phía trên đầu nhân vật

export default class P03 {
  backdrop = { glow: 0.7 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.beat = s.beat;
    this.q = s.tl.line('Two to the root two?'); this.wait = s.tl.line('Wait.');
    this.verse = s.tl.at('Two times two times two,');
    this.tB = this.verse - BURST_DUR;                           // dấu ? vỡ thành ký hiệu trước khi P04 vào
    this.tE = this.wait.end;                                    // hết "Wait.": mọi thứ vỡ, chỉ còn dấu ?
  }
  render(g, t) {
    const frozen = t >= this.wait.start;
    const tt = frozen ? this.wait.start : t;                   // "Wait." đông cứng mọi chuyển động
    const hot = frozen ? PAL.block : PAL.fwd;
    const B = { dur: BURST_DUR };
    decodeLine(g, this.tl.wordsOf(this.q), t, 180, 200, { font: '500 34px "IBM Plex Mono"', colBase: PAL.truth, colKey: hot, keys: ['root'], burstAt: this.tE, burstDur: BURST_DUR });
    burstText(g, '2', t, this.tE, 180, 400, '900 150px "Archivo"', PAL.truth, { ...B, seed: 6 });
    burstText(g, '√2', t, this.tE, 270, 330, '900 80px "Archivo"', hot, { ...B, seed: 7 });
    // khối 1 đặc, khối thứ hai chỉ hiện một phần 0.41 → 0.041 → 0.0041 rồi vỡ; hết cảnh cả hai co lại
    const shrink = 1 - smooth(prog(t, this.tE, this.tE + BURST_DUR));
    if (shrink > 0.01) {
      g.save(); g.translate(350, 640); g.scale(shrink, shrink); g.translate(-350, -640);
      g.fillStyle = PAL.fwd; g.fillRect(180, 560, 160, 160);
      const stage = Math.min(2, Math.floor(prog(tt, this.q.start + 0.4, this.q.end + 0.2) * 3));
      const frac = [0.41, 0.041, 0.0041][stage];
      g.fillStyle = hot; g.fillRect(360, 560, 160 * frac, 160);
      for (let i = 0; i < 24 && stage === 2; i++) {             // vụn
        const f = prog(tt, this.q.end, this.q.end + 0.6);
        g.globalAlpha = 1 - f; g.fillRect(362 + hash(i) * 30, 560 + hash(i + 9) * 160 + f * 200 * hash(i + 3), 5, 5);
      }
      g.restore();
    }
    g.globalAlpha = 1;
    // chữ số của √2 gõ nhanh từ trái sang phải (1.41421356…), tràn ra khỏi mép phải khung
    g.save(); g.font = '500 34px "IBM Plex Mono"'; g.fillStyle = hot; g.textBaseline = 'middle'; g.textAlign = 'center';
    const b = t >= this.tE ? 1 - clamp((t - this.tE) / BURST_DUR) : 1;
    for (let i = 0; i < DIGITS.length && b > 0; i++) {
      const x = 180 + i * DIGIT_STEP;
      if (x > W + 30 || tt < this.q.start + 0.3 + i / DIGIT_RATE) continue;
      const dj = (1 - b) * 60 * (hash(i + 5) - 0.5);
      g.globalAlpha = b; g.fillText(DIGITS[i], x, DIGIT_Y + dj);
    }
    g.restore();
    // "Wait." — nhân vật startled vào bằng rows; sau hết câu chỉ còn '?' rung
    if (frozen) {
      const p = presence(t, this.wait.start, this.tE, { inDur: 0.3, outDur: 0.3 });
      if (p.state === 'in') drawTransit(g, this.m, 'startled', 1400, 1060, 820, 'rows', 'in', p.k, { t, seed: 3 });
      else if (p.state === 'hold') this.m.draw(g, 'startled', 1400, 1060, 820, { ring: 0, shadow: false });
      else if (p.state === 'out') drawTransit(g, this.m, 'startled', 1400, 1060, 820, 'rows', 'out', p.k, { t, seed: 3 });
      const waitWords = this.tl.wordsOf(this.wait).map(w => ({ ...w, w: w.w.toUpperCase(), end: w.start + 0.15 }));
      decodeLine(g, waitWords, t, 1000, 230, { font: '900 120px "Archivo"', colBase: PAL.block, colKey: PAL.block, burstAt: this.tE, burstDur: BURST_DUR });
      if (t >= this.wait.end) {
        const j = Math.sin(t * 40) * 3;
        burstText(g, '?', t, this.tB, 900 + j, 640, '900 220px "Archivo"', PAL.block, { ...B, seed: 8 });
      }
    }
  }
}
