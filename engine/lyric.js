// Hiện lời hát — gõ theo KÝ TỰ, không phải cả từ.
//
// Đo trên video mẫu ở độ phân giải 1/6s: chữ hiện dần từng ký tự,
// 7.6 ký tự/giây (131 ms/ký tự), và tốc độ bám theo thời lượng hát từ đó.
// Hiện cả từ một lúc là lỗi dễ thấy nhất khi so với video chuyên nghiệp.
// Xem docs/mv/SYNC.md § 1.
import { C, clamp, prog } from './lib.js';

/**
 * Vẽ một dòng lời, gõ dần theo ký tự.
 *
 * @param words  [{w, start, end, key?}]  — key=true thì từ đó là TỪ KHOÁ
 * @param opts.trail  giây giữ sáng sau khi gõ xong một từ (mặc định 0.42)
 * @param opts.slide  true thì dòng trượt sang trái để từ đang gõ luôn ở x
 * @returns {x, y, done} vị trí con trỏ sau ký tự cuối
 */
export function typeLine(g, words, t, x, y, {
  font = '400 30px "IBM Plex Mono", monospace',
  gap = 10, alpha = 1, slide = false, anchorX = null,
  colBase = C.bone, colKey = C.goldHot, colHot = C.gold,
} = {}) {
  g.save();
  g.font = font;
  g.textBaseline = 'middle';
  g.textAlign = 'left';

  // dựng danh sách phần hiển thị trước, để biết tổng bề rộng (cho slide)
  const parts = [];
  for (const wd of words) {
    if (t < wd.start) break;
    const dur = Math.max(0.04, wd.end - wd.start);
    const k = clamp((t - wd.start) / dur);
    const n = Math.max(1, Math.ceil(wd.w.length * k));
    const shown = wd.w.slice(0, n);
    const done = t >= wd.end;
    parts.push({ s: shown, wd, done, typing: !done });
  }
  if (!parts.length) { g.restore(); return { x, y, done: false }; }

  let total = 0;
  for (const p of parts) total += g.measureText(p.s).width + gap;

  // Dòng trượt sang trái khi dài ra — từ đang gõ luôn ở vị trí dễ đọc.
  let cx = x;
  if (slide && anchorX !== null) cx = anchorX - total;

  for (const p of parts) {
    const hot = p.typing || (t - p.wd.end) < 0.42;
    g.globalAlpha = alpha;
    g.fillStyle = p.wd.key ? (p.done ? colKey : colHot)
                           : (hot ? colKey : colBase);
    g.fillText(p.s, cx, y);
    cx += g.measureText(p.s).width + gap;
  }
  g.restore();
  return { x: cx, y, done: parts.length === words.length && parts.at(-1).done };
}

/**
 * Con trỏ nhấp nháy sau ký tự cuối — dấu hiệu "đang gõ".
 * Nhấp nháy theo BEAT, không theo thời gian tự do.
 */
export function caret(g, x, y, t, beat, { h = 26, alpha = 1 } = {}) {
  const on = beat ? beat.onBeat(t, 0.30) > 0.15 : (t * 2 % 1) < 0.5;
  if (!on) return;
  g.save();
  g.globalAlpha = alpha * 0.85;
  g.fillStyle = C.goldHot;
  g.fillRect(x + 2, y - h / 2, 3, h);
  g.restore();
}

/** Lấy các từ của một câu từ music.json, kèm cờ từ khoá. */
export function lineWords(music, lineIdx, keys = []) {
  const ln = music.lines[lineIdx];
  if (!ln) return [];
  const K = new Set(keys.map(s => s.toLowerCase()));
  return ln.words.map(i => ({ ...music.words[i], key: K.has(music.words[i].w) }));
}

import { decodeChars, burstChars } from './glyphs.js';

/**
 * Một dòng lời theo luật video mẫu: mỗi từ DECODE trong khoảng hát của nó,
 * cả dòng VỠ thành ký hiệu toán tại burstAt. Không fade.
 */
export function decodeLine(g, words, t, x, y, {
  font = '800 64px "Archivo"', gap = 14, colBase = '#F4F1EA', colKey = '#FFB547',
  keys = [], burstAt = null, burstDur = 0.5, align = 'left', alpha = 1, mirror = false,
} = {}) {
  const K = new Set(keys.map(s => s.toLowerCase()));
  g.save();
  g.font = font; g.textBaseline = 'middle'; g.textAlign = 'left';
  const widths = words.map(w => g.measureText(w.w).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, words.length - 1);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  if (mirror) { g.translate(cx + total / 2, 0); g.scale(-1, 1); g.translate(-(cx + total / 2), 0); }
  const size = parseFloat(font.match(/(\d+(?:\.\d+)?)px/)[1]);
  words.forEach((wd, wi) => {
    const col = K.has(wd.w.toLowerCase()) ? colKey : colBase;
    const dec = decodeChars(wd.w, t, wd.start, Math.max(wd.end, wd.start + 0.05), { seed: wi + 1 });
    const bst = burstAt !== null && t >= burstAt ? burstChars(wd.w, t, burstAt, { dur: burstDur, seed: wi + 11 }) : null;
    let px = cx;
    for (let i = 0; i < wd.w.length; i++) {
      const d = dec[i];
      const cw = g.measureText(wd.w[i]).width;
      if (d.state !== 'hidden') {
        const b = bst ? bst[i] : null;
        g.globalAlpha = alpha * (b ? b.alpha : 1);
        g.fillStyle = d.state === 'scramble' || b ? colKey : col;
        g.fillText(b ? b.ch : d.ch, px + (b ? b.dx * size : 0), y + (b ? b.dy * size : 0));
      }
      px += cw;
    }
    cx += widths[wi] + gap;
  });
  g.restore();
  return { width: total };
}

// Chữ đặt theo baseline; từ tb trở đi từng ký tự vỡ thành ký hiệu bay đi (thuần theo t).
export function burstText(g, str, t, tb, x, y, font, col, { dur = 0.3, seed = 1, align = 'left', alpha = 1 } = {}) {
  g.save(); g.font = font; g.fillStyle = col; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  const size = parseFloat(font.match(/(\d+(?:\.\d+)?)px/)[1]);
  const bs = burstChars(str, t, tb, { dur, seed });
  const ws = [...str].map(c => g.measureText(c).width), total = ws.reduce((a, b) => a + b, 0);
  let px = align === 'center' ? x - total / 2 : x;
  bs.forEach((b, i) => {
    if (b.alpha > 0) { g.globalAlpha = alpha * b.alpha; g.fillText(b.ch, px + b.dx * size, y + b.dy * size); }
    px += ws[i];
  });
  g.restore();
}

// ——— Lời ở chân khung (dùng ở mọi cảnh từ exp-log) ———
// Mỗi cảnh tự vẽ lời của nó. Khi sang dòng mới, dòng trước VỠ thành ký hiệu trong FOOT_BURST giây trong lúc
// dòng mới giải mã — chữ không bao giờ tắt cứng. Hai cảnh liền nhau không được cùng vỡ một dòng:
//   from  = mốc vào cảnh (this.t0): dòng trước bắt đầu TRƯỚC from thuộc cảnh trước — cảnh trước đã tự vỡ nó;
//   carry = true: cảnh trước KHÔNG vỡ dòng của nó (cảnh nối liền) → cảnh này vỡ hộ;
//   at/dur = cảnh này vỡ dòng ĐANG hát ở mốc `at` (lối ra của cảnh).
export const FOOT_BURST = 0.3;

/** Các dòng cần vẽ ở t: [{ line, burstAt, burstDur }]. Thuần — test ở tools/test/footer.test.mjs. */
export function footerPlan(tl, t, { from, carry = false, at = null, dur } = {}) {
  from ??= Infinity; dur ??= 0.3;                      // null cũng là "mặc định" (như kit.footer cũ)
  const l = tl.lineAt(t);
  if (!l) return [];
  const i = tl.lines.indexOf(l), prev = i > 0 ? tl.lines[i - 1] : null, out = [];
  if (prev && t < l.start + FOOT_BURST && (carry || prev.start >= from) && l.start < prev.end + 0.6)
    out.push({ line: prev, burstAt: l.start, burstDur: FOOT_BURST });
  out.push({ line: l, burstAt: at, burstDur: dur });
  return out;
}

/** Vẽ lời chân khung, đứng yên trên màn hình (camera không đẩy nó ra mép). keys: từ khoá tô colKey.
 *  Mặc định màu/font/vị trí là của exp-log — project truyền giá trị theo DNA của bài (kit.js). */
export function footerLine(g, tl, t, keys, { colBase, colKey, font, x = 960, y = 1000, ...plan } = {}) {
  colBase ??= '#F4F1EA'; colKey ??= '#FFB547'; font ??= '800 56px "Archivo"';
  const rows = footerPlan(tl, t, plan);
  if (!rows.length) return;
  const opt = { align: 'center', font, colBase, colKey, keys };
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  for (const r of rows) decodeLine(g, tl.wordsOf(r.line), t, x, y, { ...opt, burstAt: r.burstAt, burstDur: r.burstDur });
  g.restore();
}
