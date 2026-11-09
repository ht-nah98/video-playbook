// Chữ trong video mẫu không fade: nó DECODE (ký hiệu nhảy rồi chốt) và VỠ thành
// ký hiệu khi hết lượt. docs/mv/REFERENCE-TEARDOWN.md §3.1. Ở kênh toán, "ký tự
// ngẫu nhiên" là ký hiệu toán. Mọi hàm ở đây thuần theo t (dùng hash, không random).
import { hash, clamp } from './lib.js';

export const GLYPHS = ['0','1','2','3','4','5','6','7','8','9','+','−','×','÷','=','√','Σ','∫','π','θ','∞','^','<','>'];

const pick = (seed, i, slot) => GLYPHS[Math.floor(hash(seed * 997 + i * 131 + slot * 17.3) * GLYPHS.length) % GLYPHS.length];
const slot30 = t => Math.floor(t * 30);

export function decodeChars(text, t, t0, t1, { scramble = 0.09, seed = 0 } = {}) {
  const n = text.length, out = [];
  for (let i = 0; i < n; i++) {
    const ch = text[i];
    const settle = t0 + ((i + 1) / n) * (t1 - t0);
    if (t >= settle) { out.push({ ch, state: 'set' }); continue; }
    if (t >= settle - scramble && t >= t0) {
      out.push({ ch: ch === ' ' ? ' ' : pick(seed, i, slot30(t)), state: 'scramble' });
      continue;
    }
    out.push({ ch, state: 'hidden' });
  }
  return out;
}

export function burstChars(text, t, tb, { dur = 0.5, seed = 0 } = {}) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (t < tb) { out.push({ ch, alpha: 1, dx: 0, dy: 0 }); continue; }
    const k = clamp((t - tb) / dur);
    const a = hash(seed * 31 + i * 7.7) * Math.PI * 2;
    const sp = 0.6 + hash(seed * 13 + i * 3.1) * 1.6;
    const fly = Math.max(0, (t - tb) - 1 / 30) / dur;       // 2 khung đầu: đứng yên, đổi ký tự
    out.push({
      ch: ch === ' ' ? ' ' : pick(seed + 101, i, slot30(t)),
      alpha: k >= 1 ? 0 : 1 - k * k,
      dx: Math.cos(a) * sp * fly * 2.2,
      dy: Math.sin(a) * sp * fly * 2.2 + fly * fly * 1.4,     // rơi nhẹ
    });
  }
  return out;
}
