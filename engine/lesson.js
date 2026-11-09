// Ống nối chung của kit BÀI HỌC — chỉ phần KHÔNG mang DNA (tra mốc, kiểm toán, nạp ảnh, canvas, prog ném lỗi).
// Phong cách (ERA, chất liệu, figure, thẻ, chuyển cảnh) vẫn ở projects/<p>/kit.js — mỗi video một DNA (docs/DNA.md).
// Dùng bởi templates/lesson/kit.js. Kit đã xong (projects/*/kit.js) giữ bản chép của mình để không đổi pixel.
import { W, H, clamp } from './lib.js';
import { toCanvas } from './mascot.js';

export { CROP } from '../assets/character-v2/crop.js';
export { typeCues } from './sfx.js'; // sfx() { return typeCues(chữ, a, b) } — gõ khớp chữ hiện dần

/** Canvas w × h (làm tròn lên, tối thiểu 1 — cỡ lẻ/0 từ phép đo chữ không làm hỏng drawImage). */
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };

/** Tiến độ 0→1 của t trong [a, b]. b < a là lỗi im lặng (pi a0: w(4,'is') lấy nhầm chữ "is" đầu câu) → ném.
 *  (engine/lib.js có prog(t, a, b, ease) KHÔNG ném — dùng cho MV.) */
export const prog = (t, a, b) => {
  if (b < a) throw new Error(`prog: b < a (${a} → ${b})`);
  if (a === b) return t >= a ? 1 : 0;
  const v = (t - a) / (b - a);
  if (v !== v) throw new Error(`prog: NaN (${a} → ${b}) — mốc vô hạn/không phải số (LESSONS §97)`);
  return clamp(v);
};

/** Tra mốc theo chữ: L(i) = câu i của timeline phần này; w(i, "từ", n) = lúc bắt đầu lần thứ n của từ trong câu. */
export function lookup(tl, tag) {
  const L = i => { const l = tl.lines[i]; if (!l) throw new Error(`${tag}: không có câu ${i}`); return l; };
  const w = (i, word, n = 1) => { let c = 0; for (const x of L(i).words) if (x.w === word && ++c === n) return x.start;
    throw new Error(`${tag}: không có "${word}" (${n}) ở câu ${i}: ${L(i).text}`); };
  return { L, w };
}

/** Ký hiệu của video → JS: ÷ × − ^ (^ → **, kết hợp phải như toán). */
const toJs = expr => expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');

/** Kiểm toán trên hình: tính biểu thức, ném lỗi nếu khác giá trị chờ (số: sai số 1e-9; chuỗi/khác: ===).
 *  Mọi số hiện lên hình đi qua đây — chỉ ở trạng thái đã xong (LESSONS §70). CHÚ Ý: 0^0 của JS ra 1. */
export function must(expr, want) {
  let v; try { v = Function(`return (${toJs(expr)})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message}) — −2^2 phải viết (−2)^2 hoặc −(2^2)`); }
  const bad = typeof want === 'number' ? Math.abs(v - want) > 1e-9 : v !== want;
  if (bad) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
/** Làm tròn hiển thị: fix(biểu thức, số chữ số) → chuỗi; ném lỗi nếu biểu thức không tính được. */
export const fix = (expr, d) => Function(`return (${toJs(expr)})`)().toFixed(d);

/** Nạp ảnh {key: url} vào IM[key] qua toCanvas (canvas CPU, tất định — LESSONS §16). opts.toCanvas để thay khi thử. */
export function loadImages(images, IM, { toCanvas: tc = toCanvas } = {}) {
  return Promise.all(Object.entries(images).map(([k, u]) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => { IM[k] = tc(im); res(); }; im.onerror = () => rej(new Error('kit: không nạp được ' + u)); im.src = u;
  })));
}
