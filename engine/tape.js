// engine/tape.js — lời để ĐỌC theo ba giọng, in bằng mực riso (engine/riso.js). Dùng lần đầu ở add-it-up.
//   rap    : chữ in hoa, ĐẶC, trên một BĂNG GIẤY một mực; cả câu in vào cùng lúc (lệch khuôn → khớp trong 0.12s)
//   sung   : chữ nghiêng có chân, in TỪNG TỪ đúng lúc hát, bóng lệch một mực
//   spoken : chữ máy, GÕ từng ký tự theo mốc từ
// Ra: DAO XÉN — dòng bị cắt thành dải ngang trượt lệch nhau ra khỏi khung (không bao giờ fade).
import { clamp, smooth, hash } from './lib.js';

export const FONTS = {
  rap: px => `800 ${px}px "Archivo"`,
  sung: px => `italic 600 ${px}px "Cormorant Garamond"`,
  spoken: px => `500 ${px}px "IBM Plex Mono"`,
};
const STRETCH = { rap: 'condensed', sung: 'normal', spoken: 'normal' };
const caps = (v, s) => v === 'rap' ? s.toUpperCase() : s;

/** Dao xén: vẽ `draw(x)` qua `n` dải ngang trong hộp [bx, by, bw, bh], mỗi dải trượt ngang ±, e ∈ [0,1]. */
export function sliced(x, [bx, by, bw, bh], e, seed, draw, n = 6) {
  if (e <= 0) { draw(x); return; }
  if (e >= 1) return;
  const ee = smooth(e);
  for (let j = 0; j < n; j++) {
    const y0 = by + bh * j / n, dir = j % 2 ? 1 : -1, dx = dir * ee * (600 + hash(j + seed) * 700);
    x.save(); x.beginPath(); x.rect(bx - 2000, y0, bw + 4000, bh / n + 0.5); x.clip();
    x.translate(dx, (hash(j * 2.3 + seed) - 0.5) * 8 * ee); draw(x); x.restore();
  }
}

/** Đo bề rộng chữ theo giọng (chỉ đo, không vẽ). */
function measure(x, voice, px, s) {
  x.save(); x.font = FONTS[voice](px); x.fontStretch = STRETCH[voice]; const w = x.measureText(s).width; x.restore(); return w;
}

/**
 * Vẽ MỘT dòng lời.
 *   line: dòng của timeline ({ text, start, end, words })
 *   o: { voice, x, y, px, rot, align, bg (mực băng rap), shadow (mực bóng chữ hát), key (mực chữ), exit (giây bắt đầu xén) }
 */
export function drawLine(R, line, t, o) {
  const { voice = 'rap', x = 120, y = 980, px = 70, rot = -2.2, align = 'left', bg = 'yellow', shadow = 'pink',
          key = 'key', exit = Infinity, exitDur = 0.25, seed = 1 } = o;
  const t0 = line.start - 0.04; if (t < t0) return;
  const e = clamp((t - exit) / exitDur); if (e >= 1) return;
  const text = caps(voice, line.text);
  const tw = measure(R.ctx[key], voice, px, text), ax = align === 'center' ? -tw / 2 : align === 'right' ? -tw : 0;
  const box = [ax - 30, -px * 0.95, tw + 60, px * 1.3];
  const place = (c) => { c.translate(x, y); c.rotate(rot * Math.PI / 180); c.font = FONTS[voice](px); c.fontStretch = STRETCH[voice]; };

  if (voice === 'rap') {
    const p = clamp((t - t0) / 0.12), off = (1 - smooth(p)) * 14;
    if (bg) R.ink(bg, c => { place(c); sliced(c, box, e, seed, c2 => c2.fillRect(box[0], box[1], box[2], box[3])); });
    R.ink(key, c => { place(c); sliced(c, box, e, seed, c2 => c2.fillText(text, ax + off, -off * 0.4)); });
    return;
  }
  // sung / spoken: hiện dần theo từ (sung) hoặc ký tự (spoken)
  const words = line.words?.length ? line.words : [{ w: line.text, start: line.start, end: line.end }];
  const toks = text.split(/(\s+)/);          // giữ khoảng trắng để đo đúng vị trí
  let wi = 0, shown = '';
  for (const tk of toks) {
    if (/^\s+$/.test(tk) || !tk) { shown += tk; continue; }
    const w = words[Math.min(wi, words.length - 1)]; wi++;
    if (voice === 'sung') { if (t >= w.start - 0.03) shown += tk; else break; }
    else {
      const dur = Math.min(Math.max(0.08, w.end - w.start), tk.length / 18);   // gõ ≤ 18 ký tự/giây
      const n = Math.floor(clamp((t - w.start + 0.02) / dur) * tk.length + (t >= w.start - 0.02 ? 1 : 0));
      shown += tk.slice(0, Math.min(tk.length, n)); if (n < tk.length) break;
    }
  }
  if (!shown.trim()) return;
  if (voice === 'sung' && shadow) R.ink(shadow, c => { place(c); sliced(c, box, e, seed, c2 => c2.fillText(shown, ax + px * 0.07, px * 0.06)); });
  R.ink(key, c => { place(c); sliced(c, box, e, seed, c2 => c2.fillText(shown, ax, 0)); });
  if (voice === 'spoken' && shown.length < text.length && e <= 0) {   // con trỏ gõ
    const cw = measure(R.ctx[key], voice, px, shown);
    R.ink(key, c => { place(c); c.fillRect(ax + cw + 4, -px * 0.78, px * 0.55, px * 0.95); });
  }
}

/**
 * Lời của một cảnh: mọi dòng bắt đầu trong [from, to). Dòng đang hát ở lại tới khi dòng sau bắt đầu thì bị xén
 * (dòng sau in vào cùng lúc). Dòng cuối ở lại tới hết cảnh (nạp giấy mang nó đi) trừ khi `lastExit`.
 *   style(line, i) → tuỳ chọn drawLine (voice, x, y, px, …) cho từng dòng
 */
export function lyricTrack(R, tl, t, { from, to, style, lastExit = Infinity, keep = 0 }) {
  const ls = tl.lines.filter(l => l.start >= from - 1e-6 && l.start < to);
  ls.forEach((l, i) => {
    const next = ls[i + 1 + keep];
    const exit = next ? next.start : lastExit;
    drawLine(R, l, t, { seed: i + 1, ...style(l, i), exit: Math.min(exit, style(l, i).exit ?? Infinity) });
  });
}

/** Giọng theo tag section của lời gốc. */
export function voiceOf(section = '') {
  if (/hook/i.test(section)) return 'rap';                 // "Final Hook — Half Sung / Half Spoken": nhịp rap
  if (/spoken|digital|pause|^break$/i.test(section)) return 'spoken';
  if (/rap|hook/i.test(section) && !/fully sung/i.test(section)) return 'rap';
  return 'sung';
}
