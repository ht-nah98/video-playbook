// Đồ nghề của bài logarithm — DNA blocks (khối gỗ đồ chơi, projects/en/logarithm/DNA.md). Lõi vẽ chép từ bàn thử người dùng
// đã chọn: tools/lab/blocks.html (khối gỗ vân, xu gỗ, thẻ treo, ván thước, 「72」 gỗ, tường đục lỗ + bàn bạch dương).
// Ống nối không mang DNA (lookup, must, prog ném lỗi, mk, nạp ảnh, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm thuần của tham số (tất định). Vân gỗ, phòng, khối, xu, 「72」 = sprite vẽ MỘT lần trên canvas CPU
// (cache theo tham số); bóng = sprite 9 mảnh / gradient — KHÔNG shadowBlur / ctx.filter trong render (LESSONS §127).
// Tờ thử mọi vật: kit-test.html (DNA §11). Chữ: Archivo 500–900 (đủ × ÷ ≈ − ₂ ¹ ⁰–⁹ $ %; KHÔNG có ①②③ ⅛ — số trong
// vòng = sticker() vẽ tay, phân số viết "1/8").
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, must, loadImages, CROP } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen } from '../../../engine/talk.js';
import { bindMascot, mascot, talkMouth, blinkAt, INK as MINK } from '../../../engine/mascot-line.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

export const TAU = Math.PI * 2;
const lerp = (a, b, u) => a + (b - a) * u;

// ═════════════════════════ màu (DNA §2 — một màu một nghĩa) ═════════════════════════
export const C = {
  ink: '#22303C', dim: '#4E5B66', wall: '#E3EDF1', table: '#EEF2EE', birch: '#EAD7B0', birchDk: '#C9B184',
  gold: '#F2B33D', goldDk: '#C98A1E', goldInk: '#8A5200', s72: '#F6A623',          // TIỀN / tăng trưởng; 「72」
  base: '#C83A26', baseInk: '#A32A18',                                             // CƠ SỐ / viên gạch (×2, ×10)
  log: '#6A45D1', logInk: '#5132B0',                                               // LOGARIT / số tầng
  bad: '#A39E94', badInk: '#5E5A52',                                               // SAI / hiểu lầm / khối mộc
  card: '#FFFBF1', white: '#FFFFFF', string: '#8C7B62',
};
export const ERA = {
  table: { bg: '#E3EDF1', ink: C.ink },    // bàn chơi sáng: tường đục lỗ xanh nhạt + bàn bạch dương tẩy
  photo: { bg: '#D3DEE3', ink: C.ink },    // khối ảnh lịch sử: cùng phòng, tối hơn một bậc (DNA §7)
};
/** Tương phản cặp chữ / nền (WCAG) — đo khi nạp, < 4.5 thì ném (DNA §2). */
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round((x + 0.05) / (y + 0.05) * 10) / 10; };
export const CONTRAST = {};
[['ink/card', C.ink, C.card], ['goldInk/card', C.goldInk, C.card], ['logInk/wall', C.logInk, C.wall], ['logInk/card', C.logInk, C.card],
 ['white/log', C.white, C.log], ['white/base', C.white, C.base], ['ink/birch', C.ink, C.birch], ['ink/wall', C.ink, C.wall],
 ['badInk/card', C.badInk, C.card], ['ink/photoWall', C.ink, ERA.photo.bg], ['baseInk/card', C.baseInk, C.card], ['dim/card', C.dim, C.card]]
  .forEach(([k, a, b]) => { CONTRAST[k] = contrast(a, b); if (CONTRAST[k] < 4.5) throw new Error(`kit: tương phản ${k} = ${CONTRAST[k]} < 4.5`); });
/** Pha màu hex về trắng (k > 0) hoặc đen (k < 0). */
export const mix = (hex, k) => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)), t = k > 0 ? 255 : 0, a = Math.abs(k);
  return '#' + v.map(c => Math.round(c + (t - c) * a).toString(16).padStart(2, '0')).join(''); };

// ═════════════════════════ chữ ═════════════════════════
export const AR = '"Archivo"';
/** Mọi mặt chữ kit dùng — trang Promise.all trước init (đua font, LESSONS §16). */
export const FONTS = ['500', '600', '700', '800', '900'].map(w => `${w} 40px ${AR}`);
export const FONT_SAMPLE = '$1,000 ×÷≈−+=?% ₂₃₅₁₀ ⁰¹²³⁴⁵⁶⁷⁸⁹ ·…→ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789';
/** Chữ "ln": Archivo không phân biệt l thường / I hoa → vẽ bằng Cormorant Garamond Italic (l có đuôi). */
export const LNF = '"CormorantI"';
FONTS.push(`italic 600 40px ${LNF}`);
const LN_RE = /\bln\b/;
function runs(s, font) {
  if (!LN_RE.test(s)) return [{ s, font }];
  const px = +(/(\d+(?:\.\d+)?)px/.exec(font) || [0, 40])[1], wt = /\b([1-9]00)\b/.exec(font);
  return s.split(/(\bln\b)/).filter(Boolean).map(t => t === 'ln' ? { s: t, font: `italic ${wt ? Math.min(+wt[1], 700) : 600} ${Math.round(px * 1.18)}px ${LNF}` } : { s: t, font });
}
/** Đo bề rộng chữ. */
export function measure(g, s, font) { g.save(); let w = 0; for (const r of runs(s, font)) { g.font = r.font; w += g.measureText(r.s).width; } g.restore(); return w; }
/** Viết chữ. k < 1: in dần theo ký tự (chữ in trên khối — không fade). Trả về bề rộng. */
export function text(g, s, x, y, { font = `800 40px ${AR}`, color = C.ink, align = 'left', base = 'alphabetic', k = 1 } = {}) {
  const w = measure(g, s, font);
  if (k <= 0) return w;
  let left = Math.round([...s].length * clamp(k));
  let x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.save(); g.textAlign = 'left'; g.textBaseline = base; g.fillStyle = color;
  for (const r of runs(s, font)) {
    const n = Math.min(left, [...r.s].length); if (n <= 0) break;
    g.font = r.font; g.fillText([...r.s].slice(0, n).join(''), x0, y); x0 += g.measureText(r.s).width; left -= n;
  }
  g.restore();
  return w;
}
/** Chữ quá rộng → ném lỗi (cảnh sửa chữ, không để tràn). */
export function fits(g, s, font, maxW, tag = 'chữ') { const w = measure(g, s, font); if (w > maxW) throw new Error(`${tag}: "${s}" rộng ${Math.round(w)} > ${maxW} px`); return w; }
/** Vùng an toàn chữ theo x (CRAFT §5) — tag() ném khi thẻ đã đứng yên mà tràn. */
export const SAFE = [96, 1824];
/** Chữ của nhãn phải ≥ 28 px (DNA §3). */
const minSize = (px, tag) => { if (px < 28) throw new Error(`${tag}: chữ ${px} px < 28 (DNA §3)`); };

// ═════════════════════════ số (DNA §11 — mọi số qua must) ═════════════════════════
const r3 = s => `Math.round((${s}) * 1000) / 1000`;
/** Năm gấp đôi ở 8%/năm (lãi nhập gốc mỗi năm) = ln 2 / ln 1.08. */
export const R8 = must(r3('Math.log(2) / Math.log(1.08)'), 9.006);
/** Phần lẻ của R8 tính bằng ngày (9 năm + 2 ngày). */
export const DAYS8 = must('Math.floor((Math.log(2) / Math.log(1.08) - 9) * 365)', 2);
/** Quy tắc 72: lãi % → số năm gấp đôi. */
export const RULE = { 3: must('72 / 3', 24), 6: must('72 / 6', 12), 8: must('72 / 8', 9), 12: must('72 / 12', 6) };
export const LN2 = must(r3('Math.log(2)'), 0.693);
export const E = must(r3('Math.E'), 2.718);
export const ANT_MG = 3, WHALE_T = 150;
/** Kiến 3 mg ↔ cá voi 150 t = 10^10.7 ≈ 11 bậc ×10. */
export const STEPS = must(`Math.round(Math.log10(${WHALE_T} * 1e9 / ${ANT_MG}) * 10) / 10`, 10.7);
must(`Math.round(${STEPS})`, 11);
/** Động đất: +1 độ lớn = năng lượng ×10^1.5 ≈ 31.6 ≈ 32. */
export const QUAKE = must('Math.round(10 ** 1.5 * 10) / 10', 31.6);
must(`Math.round(${QUAKE})`, 32);
/** Decibel: ngưỡng nghe → ngưỡng đau (0 → 120 dB) = ×10^12. */
export const DB = must('10 ** (120 / 10)', 1e12);
/** pH nước 7 → chanh 2 = ×10^5. */
export const PH = must('10 ** (7 - 2)', 1e5);
/** Tiền: 1000 → "$1,000". */
export const money = v => '$' + v.toLocaleString('en-US');
must(`'${money(1000)}'`, '$1,000'); must(`'${money(2000)}'`, '$2,000');
/** $1,000 sau y năm ở 8% (lãi năm), làm tròn đô. */
export const grow8 = y => Math.round(1000 * 1.08 ** y);
must(`${grow8(9)}`, 1999);
/** Số → chuỗi hiển thị, dấu trừ thật U+2212. */
export const num = v => (v < 0 ? '−' : '') + String(Math.abs(v));

// ═════════════════════════ tiện ích vẽ ═════════════════════════
export const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export function line(g, x0, y0, x1, y1, col, w, cap = 'round') { g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
const cpu = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return [c, c.getContext('2d', { willReadFrequently: true })]; };
// BÓNG MỜ TẤT ĐỊNH (chép trig): sprite 9 mảnh vẽ MỘT lần trên canvas CPU theo (bo góc, độ mờ, màu), kéo giãn tới cỡ cần.
const SPR = {};
function shadowSprite(r, blur, col) {
  const id = `${r}|${blur}|${col}`; if (SPR[id]) return SPR[id];
  const m = r + 2 * blur, n = 2 * m + 1, [c, x] = cpu(n, n), OFF = 4 * n;
  x.shadowColor = col; x.shadowBlur = blur; x.shadowOffsetX = OFF; x.fillStyle = '#000';
  const p = new Path2D(); p.roundRect(2 * blur - OFF, 2 * blur, 2 * r + 1, 2 * r + 1, r); x.fill(p);
  return (SPR[id] = { c, m });
}
/** Bóng mờ của hình chữ nhật bo góc (x, y, w, h, r), lệch (ox, oy). */
export function shadowRR(g, x, y, w, h, r = 10, { col = 'rgba(40,60,80,0.22)', blur = 14, ox = 0, oy = 6 } = {}) {
  if (w <= 0 || h <= 0) return;
  r = Math.round(Math.max(0, Math.min(r, w / 2, h / 2))); blur = Math.round(blur);
  const { c, m } = shadowSprite(r, blur, col), X = x - 2 * blur + ox, Y = y - 2 * blur + oy, TW = w + 4 * blur, TH = h + 4 * blur, mid = TW - 2 * m, midh = TH - 2 * m;
  const xs = [[0, m, X, m], [m, 1, X + m, mid], [m + 1, m, X + m + mid, m]], ys = [[0, m, Y, m], [m, 1, Y + m, midh], [m + 1, m, Y + m + midh, m]];
  for (const [sx, sw, dx, dw] of xs) for (const [sy, sh, dy, dh] of ys) if (dw > 0 && dh > 0) g.drawImage(c, sx, sy, sw, sh, dx, dy, dw, dh);
}
/** Vật có bóng: box = [x, y, w, h, r] → bóng sprite, rồi fn() vẽ vật. */
export function shade(g, fn, { col, blur, ox, oy, box = null } = {}) {
  if (box) shadowRR(g, box[0], box[1], box[2], box[3], box[4] ?? 10, { col, blur, ox, oy });
  g.save(); fn(); g.restore();
}
/** Hào quang tròn (gradient — thay shadowBlur). */
export function glow(g, x, y, r, rgb, a = 0.6) {
  if (a <= 0.01 || r <= 0) return;
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.save(); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
}
/** Bóng tiếp xúc dưới vật đặt trên bàn: elip gradient. */
export function contact(g, cx, cy, rx, ry, a = 0.28) {
  if (rx <= 0 || a <= 0) return;
  g.save(); g.translate(cx, cy); g.scale(1, ry / rx); const sg = g.createRadialGradient(0, 0, 0, 0, 0, rx);
  sg.addColorStop(0, `rgba(40,60,80,${a})`); sg.addColorStop(0.6, `rgba(40,60,80,${a * 0.45})`); sg.addColorStop(1, 'rgba(40,60,80,0)'); g.fillStyle = sg; g.beginPath(); g.arc(0, 0, rx, 0, TAU); g.fill(); g.restore();
}
const pop = k => outBack(clamp(k), 2.0);
/** Rơi xuống rồi nảy nhẹ (khối đặt lên bàn). 0 → 1. */
export const drop = k => { const u = clamp(k); if (u < 0.7) return (u / 0.7) ** 2; const v = (u - 0.7) / 0.3; return 1 - 0.06 * Math.sin(Math.PI * v); };

// ═════════════════════════ vân gỗ + nền ═════════════════════════
let GRAIN, GRAINL;
function grainSheet(white) {
  const [c, x] = cpu(1200, 1200); if (white) { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1200, 1200); }
  for (let i = 0; i < 150; i++) { const y0 = i * 8 + hash(i * 1.3) * 6, a = 0.05 + hash(i * 2.7) * 0.10, f = 0.004 + hash(i * 3.9) * 0.006, ph = hash(i * 5.1) * 6;
    x.strokeStyle = `rgba(120,85,40,${a})`; x.lineWidth = 1 + hash(i * 7.7) * 2.2; x.beginPath();
    for (let px = 0; px <= 1200; px += 12) { const py = y0 + Math.sin(px * f + ph) * 10 + Math.sin(px * f * 3.1 + ph * 2) * 3; px ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
  for (let k = 0; k < 6; k++) { const kx = hash(k * 9.3) * 1200, ky = hash(k * 4.4) * 1200; x.strokeStyle = 'rgba(120,85,40,0.14)'; x.lineWidth = 2;
    for (let r = 4; r < 26; r += 6) { x.beginPath(); x.ellipse(kx, ky, r * 2.2, r, 0, 0, TAU); x.stroke(); } }
  return c;
}
/** Vân gỗ multiply lên path trên context x (sơn mỏng, vân lộ ra). */
function grainOn(x, path, ox, oy, alpha = 1, rot = 0) {
  x.save(); x.clip(path); x.globalCompositeOperation = 'multiply'; x.globalAlpha = alpha;
  x.translate(ox, oy); x.rotate(rot); x.drawImage(GRAIN, -600, -600); x.restore();
}
/** Mép trên mặt bàn (y) — tường phía trên, bàn phía dưới. */
export const TABLE_Y = 760;
/** Đường đặt vật trên bàn (đáy khối / chồng xu) mặc định. */
export const BASE_Y = 860;
let ROOM = {};
function makeRoom(era) {
  const [c, x] = cpu(W, H), tableY = TABLE_Y, dark = era === 'photo';
  let gr = x.createLinearGradient(0, 0, 0, tableY); gr.addColorStop(0, dark ? '#C3D3DA' : '#D6E6EC'); gr.addColorStop(1, dark ? '#D6E2E6' : '#E8F1F3'); x.fillStyle = gr; x.fillRect(0, 0, W, tableY);
  for (let r = 0; r * 48 + 30 < tableY - 20; r++) for (let k = 0; k * 48 + 24 < W; k++) { const px = 24 + k * 48, py = 30 + r * 48;
    x.fillStyle = 'rgba(70,100,120,0.13)'; x.beginPath(); x.arc(px, py, 4.5, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.arc(px + 1, py + 2, 4.5, 0, Math.PI); x.fill(); }
  const sun = x.createRadialGradient(1500, -80, 0, 1500, -80, 1100); sun.addColorStop(0, `rgba(255,255,255,${dark ? 0.35 : 0.55})`); sun.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = sun; x.fillRect(0, 0, W, tableY);
  gr = x.createLinearGradient(0, tableY, 0, H); gr.addColorStop(0, dark ? '#DCE1DA' : '#E7ECE6'); gr.addColorStop(1, dark ? '#E6E8E0' : '#F4F5EF'); x.fillStyle = gr; x.fillRect(0, tableY, W, H - tableY);
  x.save(); x.globalCompositeOperation = 'multiply'; x.globalAlpha = 0.5; x.translate(0, tableY); x.scale(1.7, 0.28); x.drawImage(GRAIN, 0, 0); x.drawImage(GRAIN, 1200, 0); x.restore();
  x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(0, tableY, W, 3); x.fillStyle = 'rgba(70,90,100,0.12)'; x.fillRect(0, tableY - 10, W, 10);
  if (dark) { const v = x.createRadialGradient(W / 2, H * 0.45, 380, W / 2, H * 0.5, 1250); v.addColorStop(0, 'rgba(30,45,60,0)'); v.addColorStop(1, 'rgba(30,45,60,0.18)'); x.fillStyle = v; x.fillRect(0, 0, W, H); }
  return c;
}
/** Nền theo ERA (cảnh tự tô nền toàn khung trước khi vẽ). */
export function ground(g, era = 'table') { const r = ROOM[era]; if (!r) throw new Error(`ground: ERA lạ "${era}"`); g.drawImage(r, 0, 0); }
/** Khung nối p1 → p2 (DNA §6): mặt bàn bạch dương TRƠN trước tường. p1 kết bằng khung này, p2 mở bằng ĐÚNG khung này. */
export function bare(g) { ground(g, 'table'); }

// ═════════════════════════ KHỐI GỖ (vật xuyên suốt) ═════════════════════════
// Sprite khối (mặt trước + mặt trên + hông, cạnh vát sáng, vân gỗ) cache theo (màu, w, h, d, mẻ góc, biến thể vân).
const BLK = {};
function blockSprite(col, w, h, d, chip, v) {
  const id = `${col}|${w}|${h}|${d}|${chip ? 1 : 0}|${v}`; if (BLK[id]) return BLK[id];
  const dy = Math.round(d * 0.8), [c, x] = cpu(w + d + 2, h + dy + 2), X = 1, Y = dy + 1;
  const P = pts => { const p = new Path2D(); pts.forEach(([a, b], i) => i ? p.lineTo(a, b) : p.moveTo(a, b)); p.closePath(); return p; };
  const top = P([[X, Y], [X + d, Y - dy], [X + w + d, Y - dy], [X + w, Y]]), side = P([[X + w, Y], [X + w + d, Y - dy], [X + w + d, Y + h - dy], [X + w, Y + h]]);
  const face = rr(X, Y, w, h, Math.min(5, w / 6));
  x.fillStyle = mix(col, 0.32); x.fill(top); grainOn(x, top, 300 + v * 97, Y, 0.8, 1.2);
  x.fillStyle = mix(col, -0.22); x.fill(side); grainOn(x, side, X + v * 53, Y, 0.8, 1.57);
  x.fillStyle = col; x.fill(face); grainOn(x, face, 600 + v * 131, 600 + v * 71, 1, (hash(v * 3.7 + w) - 0.5) * 0.2);
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(X + 4, Y + 2, w - 8, 3);
  x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(X + 4, Y + h - 4, w - 8, 3);
  if (chip) { x.fillStyle = mix(col, -0.35); x.beginPath(); x.moveTo(X + w - 26, Y); x.lineTo(X + w, Y); x.lineTo(X + w, Y + 22); x.lineTo(X + w - 12, Y + 8); x.closePath(); x.fill(); }
  return (BLK[id] = { c, dy });
}
/**
 * Khối gỗ sơn (DNA §11). Đáy mặt trước ở giữa (cx, base); mặt trước s × s (hoặc w × h). Mặt trên + hông lệch phải-lên d.
 * color: màu sơn (C.base đỏ = cơ số, C.birch mộc, C.bad xám = sai, C.log tím, C.gold). label: chữ in trên mặt (cỡ tự
 * theo khối). k: rơi xuống bàn (0 = chưa có, 1 = đã nằm yên). rot: nghiêng (rad). chip: mẻ góc (khối "sai").
 * sticker: chữ trên sticker tím tròn giữa mặt (đếm tầng). lift: nhấc lên khỏi khung (0 → 1). shadow: bóng tiếp xúc.
 * Trả về hộp [x, y, w, h] gồm cả mặt trên (toạ độ màn hình, sau rơi).
 */
export function block(g, cx, base, s = 110, { w = s, h = s, d = Math.round(Math.min(w, h) * 0.17), color = C.base, label = null, font = null, ink = null,
  k = 1, rot = 0, chip = false, sticker = null, lift = 0, shadow = true, v = null, from = 420 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  w = Math.round(w); h = Math.round(h); d = Math.round(d);
  const fall = (1 - drop(k)) * from + outCubic(clamp(lift)) ** 1.6 * (base + 200), y = base - fall;
  const vv = v ?? Math.floor(hash(Math.round(cx) * 0.37 + Math.round(base) * 0.11) * 4);
  const S = blockSprite(color, w, h, d, chip, vv);
  if (shadow && fall < 160) contact(g, cx + d * 0.6, base + 4, w * 0.62, Math.max(6, w * 0.08), 0.28 * (1 - fall / 160));
  g.save(); g.translate(cx, y); if (rot) g.rotate(rot);
  g.drawImage(S.c, -w / 2 - 1, -h - S.dy - 1);
  const lightInk = color === C.base || color === C.log || color === C.ink;
  if (label) { const fs = Math.round(Math.min(h * 0.5, w * 0.9 / Math.max(1, label.length * 0.62))); minSize(fs, `block "${label}"`);
    text(g, label, 0, -h / 2 + 2, { font: font || `900 ${fs}px ${AR}`, color: ink || (lightInk ? C.white : C.ink), align: 'center', base: 'middle' }); }
  if (sticker != null) sticker_(g, String(sticker), 0, -h / 2, { r: Math.max(20, Math.min(w, h) * 0.24) });
  g.restore();
  return [cx - w / 2, y - h - S.dy, w + d, h + S.dy];
}
/**
 * Tháp n khối chồng lên nhau ở (cx, base). k (0 … n): số khối đã đặt — khối i rơi khi k đi từ i tới i + 1 (từ dưới lên).
 * hang: treo NGƯỢC dưới đường base (khối đầu ngay dưới mép bàn, xếp xuống). label: chữ mỗi khối (chuỗi hoặc hàm i → chuỗi).
 * count (0 … n): sticker tím đếm tầng dán cạnh phải từng khối (1, 2, 3 …; âm khi hang). lift (0 … n): gỡ khối từ ĐỈNH xuống.
 * Trả về { top: y đỉnh tháp (đã đặt), boxes }.
 */
export function tower(g, cx, base, n, { s = 110, color = C.base, label = null, k = n, hang = false, count = 0, lift = 0, gap = 0, colors = null, ...rest } = {}) {
  const boxes = [], hh = rest.h ?? s, st = hh + gap, order = [...Array(n).keys()];
  // khối nhỏ: chữ trên từng khối < 34 px thì bỏ, ghi MỘT nhãn chung (30 px) trên đỉnh tháp (treo: dưới đáy)
  const lab0 = typeof label === 'string' ? label : null, shared = lab0 && Math.min(hh * 0.5, (rest.w ?? s) * 0.9 / Math.max(1, lab0.length * 0.62)) < 34;
  if (shared) label = null;
  if (hang) order.reverse();                                             // treo: vẽ khối sâu nhất trước (mặt trên bị khối trên che)
  for (const i of order) {
    const ki = clamp(k - i), li = clamp(lift - (n - 1 - i)); if (ki <= 0 || li >= 1) continue;
    const b = hang ? base + (i + 1) * st : base - i * st;
    const lab = typeof label === 'function' ? label(i) : label;
    boxes[i] = block(g, cx, b, s, { color: colors ? colors[i % colors.length] : color, label: lab, k: ki, lift: li, shadow: !hang && i === 0, from: hang ? -420 : 420, ...rest });
  }
  for (let i = 0; i < n; i++) { const kc = clamp(count - i); if (kc <= 0 || clamp(lift - (n - 1 - i)) > 0) continue;
    const b = hang ? base + (i + 1) * st : base - i * st;
    sticker_(g, hang ? num(-(i + 1)) : String(i + 1), cx + (rest.w ?? s) / 2 + 40, hang ? b - hh / 2 : b - hh / 2, { r: 26, k: kc }); }
  const placed = Math.min(n, Math.floor(k));
  if (shared && placed > 0) text(g, lab0 + ' each', cx, hang ? base + placed * st + 44 : base - placed * st - Math.round(Math.min(rest.w ?? s, hh) * 0.14) - 22, { font: `800 30px ${AR}`, color: C.baseInk, align: 'center', k: clamp(k - placed + 1) });
  return { top: hang ? base + placed * st : base - placed * st - Math.round(Math.min(rest.w ?? s, hh) * 0.14), boxes };
}

// ═════════════════════════ sticker tím (LOGARIT / số tầng) ═════════════════════════
function sticker_(g, s, x, y, { r = 26, k = 1, color = C.log, ink = C.white } = {}) {
  if (k <= 0) return;
  const e = pop(k), fs = Math.round(Math.min(r * 1.15, r * 2.3 / Math.max(1, s.length * 0.62)));
  g.save(); g.translate(x, y); g.scale(e, e); g.rotate(-0.06);
  g.fillStyle = 'rgba(30,20,60,0.22)'; g.beginPath(); g.arc(2, 3, r, 0, TAU); g.fill();
  g.fillStyle = color; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, r - 4, 0, TAU); g.stroke();
  text(g, s, 0, 1, { font: `800 ${Math.max(28, fs)}px ${AR}`, color: ink, align: 'center', base: 'middle' });
  g.restore();
}
/** Sticker tròn (mặc định tím = đếm tầng / logarit; ①②③ = sticker('1', …)). k: dán vào (bật). */
export function sticker(g, s, x, y, o = {}) { sticker_(g, String(s), x, y, o); }

// ═════════════════════════ XU GỖ (TIỀN) ═════════════════════════
const COIN = {};
function coinSprites(rx, ry, th) {
  const id = `${rx}|${ry}|${th}`; if (COIN[id]) return COIN[id];
  const [b, x] = cpu(2 * rx + 4, th + 2 * ry + 4), cx = rx + 2, yb = th + ry + 2, yt = yb - th + 3;
  const band = new Path2D(); band.ellipse(cx, yb, rx, ry, 0, 0, Math.PI); band.lineTo(cx - rx, yt); band.ellipse(cx, yt, rx, ry, 0, Math.PI, 0, true); band.closePath();
  let gr = x.createLinearGradient(cx - rx, 0, cx + rx, 0); gr.addColorStop(0, '#D99A28'); gr.addColorStop(0.35, C.gold); gr.addColorStop(0.7, '#E6A332'); gr.addColorStop(1, C.goldDk);
  x.fillStyle = gr; x.fill(band); grainOn(x, band, cx, yb, 0.6, 0);
  x.strokeStyle = 'rgba(140,90,20,0.22)'; x.lineWidth = 2;
  for (let k = 1; k < 14; k++) { const u = k / 14, px = cx - rx + 2 * rx * u, py = yb + ry * Math.sqrt(1 - (2 * u - 1) ** 2); x.beginPath(); x.moveTo(px, py - th + 6); x.lineTo(px, py - 4); x.stroke(); }
  x.strokeStyle = 'rgba(120,75,10,0.45)'; x.lineWidth = 1.5; x.beginPath(); x.ellipse(cx, yb, rx, ry, 0, 0, Math.PI); x.stroke();
  const [t, y] = cpu(2 * rx + 4, 2 * ry + 4), tc = ry + 2, topP = new Path2D(); topP.ellipse(cx, tc, rx, ry, 0, 0, TAU);
  y.fillStyle = '#FFD46E'; y.fill(topP); grainOn(y, topP, cx + 100, tc, 0.7, 0.3);
  y.strokeStyle = 'rgba(150,95,15,0.55)'; y.lineWidth = 3; y.beginPath(); y.ellipse(cx, tc, rx * 0.74, ry * 0.74, 0, 0, TAU); y.stroke();
  y.save(); y.translate(cx, tc); y.scale(1, ry / rx); y.font = `900 ${Math.round(rx * 0.74)}px ${AR}`; y.textAlign = 'center'; y.textBaseline = 'middle'; y.fillStyle = 'rgba(150,95,15,0.55)'; y.fillText('$', 0, 4); y.restore();
  return (COIN[id] = { band: b, top: t, ox: rx + 2, oyb: yb, oyt: ry + 2 });
}
/** Kích thước xu chuẩn (cold open, b14–b16 dùng lại). */
export const COIN_STD = { rx: 124, ry: 34, th: 38 }, COIN_SM = { rx: 66, ry: 18, th: 22 };
/**
 * Chồng xu gỗ sơn vàng ở (cx, base). n có thể lẻ (đang lớn): ⌊n⌋ xu nằm yên + xu kế tiếp đang rơi xuống theo phần lẻ.
 * Trả về y đỉnh chồng (mặt trên xu cao nhất).
 */
export function coinStack(g, cx, base, n, { rx = COIN_STD.rx, ry = COIN_STD.ry, th = COIN_STD.th, seed = 0 } = {}) {
  const S = coinSprites(rx, ry, th), whole = Math.floor(n + 1e-9), frac = n - whole;
  if (n <= 0) return base;
  contact(g, cx + 10, base + 6, rx * 1.35, ry * 1.4, 0.32);
  const m = frac > 0.02 ? whole + 1 : whole;
  for (let i = 0; i < m; i++) {
    const yb = base - i * th - (i === whole ? (1 - drop(frac)) * th * 7 : 0), x = cx + (hash(i * 3.7 + seed) - 0.5) * (rx / 12);
    g.drawImage(S.band, x - S.ox, yb - S.oyb);
    if (i === m - 1 || i === whole - 1) g.drawImage(S.top, x - S.ox, yb - th + 3 - S.oyt);
  }
  return base - whole * th - ry;
}
/** Bóng mờ của một chồng xu n đồng (nét đứt, chưa có) — "chồng gấp đôi ?" (DNA cold open). k: hiện (vẽ dần nét). */
export function ghostStack(g, cx, base, n, { rx = COIN_STD.rx, ry = COIN_STD.ry, th = COIN_STD.th, k = 1, a = 1 } = {}) {
  if (k <= 0 || a <= 0) return base - n * th - ry;
  const top = base - n * th;
  g.save(); g.globalAlpha *= a; g.setLineDash([12, 10]); g.lineDashOffset = 0; g.strokeStyle = 'rgba(138,82,0,0.75)'; g.lineWidth = 4;
  g.fillStyle = 'rgba(242,179,61,0.12)';
  const p = new Path2D(); p.ellipse(cx, base, rx, ry, 0, 0, Math.PI); p.lineTo(cx - rx, top); p.ellipse(cx, top, rx, ry, 0, Math.PI, TAU); p.closePath();
  g.fill(p);
  const L = 2 * (base - top) + 2 * Math.PI * rx; g.setLineDash([12, 10]);
  g.save(); g.beginPath(); g.rect(cx - rx - 10, top - ry - 10 + (1 - clamp(k)) * (base - top + 2 * ry + 20), 2 * rx + 20, base - top + 2 * ry + 20); g.clip();
  g.stroke(p); g.beginPath(); g.ellipse(cx, top, rx, ry, 0, 0, TAU); g.stroke(); g.restore();
  g.restore();
  return top - ry;
}

// ═════════════════════════ thẻ giấy treo + băng keo xám ═════════════════════════
/**
 * Thẻ giấy treo bằng dây (DNA §3). (cx, cy) = tâm thẻ. edge: màu dải trên (nghĩa: C.gold tiền, C.log logarit, C.base cơ số,
 * C.bad sai, C.ink trung tính). string: [x, y] điểm treo (dây nối tới lỗ xỏ bên trái) — null = không dây.
 * k: bật vào (đung đưa). Trả về hộp {x, y, w, h}.
 */
export function tag(g, s, cx, cy, { size = 40, weight = 800, color = C.ink, edge = C.ink, k = 1, rot = 0, string = null, minW = 0 } = {}) {
  minSize(size, `tag "${s}"`);
  const font = `${weight} ${size}px ${AR}`, tw = measure(g, s, font), w = Math.max(minW, tw + 70), h = Math.round(size * 1.55), box = { x: cx - w / 2, y: cy - h / 2, w, h };
  if (k <= 0) return box;
  if (k >= 1 && (box.x < SAFE[0] || box.x + w > SAFE[1])) throw new Error(`tag "${s}": x ${Math.round(box.x)}…${Math.round(box.x + w)} ra ngoài vùng an toàn ${SAFE[0]}–${SAFE[1]} (CRAFT §5)`);
  const e = pop(k), sw = 0.05 * (1 - clamp(k)) * Math.sin(k * 12) + rot;
  if (string) line(g, string[0], string[1], cx - w / 2 + 18, cy, C.string, 2.5);
  g.save(); g.translate(cx, cy); g.rotate(sw); g.scale(e, e);
  shadowRR(g, -w / 2, -h / 2, w, h, 10, { col: 'rgba(40,60,80,0.22)', blur: 10, ox: 3, oy: 6 });
  g.fillStyle = C.card; g.fill(rr(-w / 2, -h / 2, w, h, 10));
  g.save(); g.clip(rr(-w / 2, -h / 2, w, h, 10)); g.fillStyle = edge; g.fillRect(-w / 2, -h / 2, w, 8); g.restore();
  g.fillStyle = C.white; g.strokeStyle = C.birchDk; g.lineWidth = 2; g.beginPath(); g.arc(-w / 2 + 18, 0, 6, 0, TAU); g.fill(); g.stroke();
  text(g, s, 8, 4, { font, color, align: 'center', base: 'middle' });
  g.restore();
  return box;
}
/** Băng keo xám gạch chữ sai (DNA §1: KHÔNG đỏ — đỏ là cơ số). Dán dần theo k từ (x0, y0) tới (x1, y1). */
export function tape(g, x0, y0, x1, y1, k = 1, { w = 30 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), L = Math.hypot(x1 - x0, y1 - y0) * e, a = Math.atan2(y1 - y0, x1 - x0);
  g.save(); g.translate(x0, y0); g.rotate(a);
  shadowRR(g, 0, -w / 2, L, w, 2, { col: 'rgba(40,40,40,0.25)', blur: 6, oy: 3 });
  const p = new Path2D(); p.moveTo(0, -w / 2);
  for (let i = 0; i <= 6; i++) p.lineTo(-4 + (i % 2) * 5, -w / 2 + i * w / 6);                  // mép xé răng cưa đầu băng
  p.lineTo(L, w / 2); for (let i = 6; i >= 0; i--) p.lineTo(L + (k >= 1 ? 4 - (i % 2) * 5 : 0), -w / 2 + i * w / 6); p.closePath();
  g.fillStyle = '#9C9890'; g.fill(p);
  g.save(); g.clip(p); for (let i = 0; i < L; i += 7) { g.fillStyle = 'rgba(255,255,255,0.10)'; g.fillRect(i, -w / 2, 2, w); }
  g.fillStyle = 'rgba(255,255,255,0.22)'; g.fillRect(0, -w / 2 + 3, L, 4); g.restore();
  g.restore();
}

// ═════════════════════════ 「72」 gỗ cắt dày ═════════════════════════
let S72;
function sprite72() {
  const [c, x] = cpu(700, 560), f = `900 500px ${AR}`, depth = 30, by = 500;
  x.font = f; x.textBaseline = 'alphabetic'; x.textAlign = 'left'; x.letterSpacing = '-8px';
  for (let k = depth; k > 0; k--) { x.fillStyle = mix('#C77A0E', -0.12 * (k / depth)); x.fillText('72', 20 + k * 0.9, by - k * 0.7); }
  const gr = x.createLinearGradient(0, 120, 0, by); gr.addColorStop(0, '#FFC94D'); gr.addColorStop(1, C.s72); x.fillStyle = gr; x.fillText('72', 20, by);
  x.globalCompositeOperation = 'source-atop'; x.save(); x.rotate(0.05); x.drawImage(GRAINL, -100, -400); x.restore();
  x.globalCompositeOperation = 'source-over'; x.strokeStyle = 'rgba(255,240,200,0.75)'; x.lineWidth = 5; x.strokeText('72', 20, by);
  return c;
}
/** Bề rộng / cao 「72」 ở s = 1 (đo trên sprite: chữ chiếm x 20 … ~640, đáy chữ = base). */
export const S72_W = 640, S72_H = 370;
/** 「72」 gỗ cắt (vật thumbnail). x = mép trái, base = đáy chữ (đặt trên bàn). k: rơi xuống; lift: nhấc lên khỏi khung. */
export function big72(g, x, base, s = 1, { k = 1, lift = 0, rot = 0 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const fall = (1 - drop(k)) * 700 + outCubic(clamp(lift)) ** 1.4 * (base + 100), y = base - fall;
  if (fall < 200) contact(g, x + S72_W * s * 0.52, base + 6, S72_W * s * 0.5, 28 * s, 0.3 * (1 - fall / 200));
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.drawImage(S72, -20, -500); g.restore();
  return [x, y - S72_H * s, S72_W * s, S72_H * s];
}

// ═════════════════════════ ván thước ×10 (ACT TWO, cold open) ═════════════════════════
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** "10" + số mũ viết bằng ký tự mũ (Archivo có ⁰–⁹). */
export const pow10 = k => '10' + [...String(k)].map(d => SUP[+d]).join('');
export const UNITS = ['1 mg', '10 mg', '100 mg', '1 g', '10 g', '100 g', '1 kg', '10 kg', '100 kg', '1 t', '10 t', '100 t'];
must(`${UNITS.length}`, 12);
/** Hình học ván thước mặc định — vẽ lại ĐÚNG ở a0 và b06 (vật dùng chung). */
export const BOARD = { x0: 300, y: 806, step: 118, len: 1500, bw: 96, bh: 44 };
/**
 * Ván thước 10⁰…10¹¹ (đơn vị mg…t). k: ván trượt vào từ phải. towers (0 … 11): dựng tháp k = k khối ×10 lần lượt (sticker
 * tím = số tầng trên khối đỉnh). Trả về { X(k) = x của vạch 10^k, Y(k) = đỉnh tháp k, PT = mặt ván }.
 */
export function logBoard(g, { x0 = BOARD.x0, y = BOARD.y, step = BOARD.step, k = 1, towers = 11, labels = 1, shift = 0 } = {}) {
  const dx = (1 - outCubic(clamp(k))) * (W - x0 + 200) + shift, X = i => x0 + 82 + i * step + dx, PT = y, Y = i => PT - i * BOARD.bh;
  if (k <= 0) return { X, Y, PT };
  contact(g, x0 + dx + BOARD.len / 2 + 40, PT + 64, BOARD.len * 0.55, 30, 0.25);
  block(g, x0 + dx + BOARD.len / 2, PT + 46, 0, { w: BOARD.len, h: 46, d: 22, color: C.birch, shadow: false });
  for (let i = 0; i <= 11; i++) line(g, X(i), PT + 2, X(i), PT + 18, C.ink, 4, 'butt');
  if (labels > 0) UNITS.forEach((u, i) => { const kl = clamp(labels * 12 - i); if (kl <= 0) return;
    const f1 = `800 36px ${AR}`, f2 = `800 30px ${AR}`, w1 = measure(g, '10', f1), w2 = measure(g, String(i), f2), x1 = X(i) - (w1 + w2) / 2;
    text(g, '10', x1, PT + 86, { font: f1 }); text(g, String(i), x1 + w1, PT + 70, { font: f2 });
    text(g, u, X(i), PT + 128, { font: `700 30px ${AR}`, align: 'center', k: kl }); });
  for (let i = 1; i <= 11; i++) { const kt = clamp(towers - (i - 1)); if (kt <= 0) continue;
    tower(g, X(i), PT, i, { s: BOARD.bw, h: BOARD.bh, d: 12, k: kt * i, colors: [mix(C.base, 0.10), C.base], shadow: false });
    if (kt >= 1) sticker_(g, String(i), X(i), Y(i) + BOARD.bh / 2, { r: 19 }); }
  return { X, Y, PT };
}
/** Ngoặc tím đứng đếm bậc (≈ 11 STEPS) từ y0 tới y1 ở x. k: vẽ dần từ dưới lên. */
export function brace(g, x, y0, y1, k = 1, { color = C.log, w = 7 } = {}) {
  if (k <= 0) return;
  const m = (y0 + y1) / 2, yk = y1 - (y1 - y0) * outCubic(clamp(k));
  g.save(); g.beginPath(); g.rect(x - 40, yk - 4, 80, y1 - yk + 10); g.clip();
  g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x + 22, y0); g.quadraticCurveTo(x, y0, x, y0 + 24); g.lineTo(x, m - 22); g.quadraticCurveTo(x, m, x - 18, m);
  g.quadraticCurveTo(x, m, x, m + 22); g.lineTo(x, y1 - 24); g.quadraticCurveTo(x, y1, x + 22, y1); g.stroke(); g.restore();
}

// ═════════════════════════ thú gỗ cắt (kiến ↔ cá voi; chuột, voi chỉ hình — số của chúng phải ghi "≈") ═════════════════════════
function slab(g, path, col, d = 7) { g.save(); g.translate(d, d * 0.8); g.fillStyle = mix(col, -0.3); g.fill(path); g.restore(); g.fillStyle = col; g.fill(path); grainOn(g, path, 300, 200, 0.7, 0.1); }
const ANIMAL = {
  whale(g) {
    const p = new Path2D();
    p.moveTo(-170, -40); p.bezierCurveTo(-150, -110, 40, -120, 120, -70); p.bezierCurveTo(160, -50, 175, -20, 160, -5); p.bezierCurveTo(100, 8, -60, 6, -150, -20);
    p.lineTo(-215, -50); p.bezierCurveTo(-240, -95, -255, -95, -262, -80); p.bezierCurveTo(-250, -62, -235, -50, -222, -42); p.bezierCurveTo(-245, -30, -258, -10, -250, 2); p.bezierCurveTo(-232, -2, -210, -22, -170, -40); p.closePath();
    slab(g, p, '#5C86C9'); const belly = new Path2D(); belly.moveTo(-60, -2); belly.bezierCurveTo(20, 6, 110, 4, 158, -6); belly.bezierCurveTo(110, -20, 20, -18, -60, -2); g.fillStyle = '#A9C3EA'; g.fill(belly);
    for (let k = 0; k < 4; k++) line(g, 10 + k * 30, -10 - k, 40 + k * 30, -8, 'rgba(40,60,110,0.45)', 2.5);
    g.fillStyle = '#1D2B44'; g.beginPath(); g.arc(105, -40, 6, 0, TAU); g.fill(); line(g, 60, -24, 150, -22, 'rgba(29,43,68,0.6)', 3);
    const fl = new Path2D(); fl.moveTo(20, -14); fl.bezierCurveTo(0, 20, -30, 30, -40, 26); fl.bezierCurveTo(-30, 10, -10, -6, 20, -14); slab(g, fl, '#4B74B5', 4);
  },
  elephant(g) {
    const p = new Path2D();
    p.moveTo(-70, 0); p.lineTo(-70, -40); p.bezierCurveTo(-90, -60, -80, -110, -20, -115); p.bezierCurveTo(30, -118, 55, -105, 62, -85);
    p.bezierCurveTo(95, -95, 105, -60, 92, -30); p.bezierCurveTo(88, -10, 96, 4, 108, 2); p.lineTo(104, 12); p.bezierCurveTo(84, 14, 74, -6, 72, -28); p.lineTo(60, -40);
    p.lineTo(55, 0); p.lineTo(32, 0); p.lineTo(30, -32); p.lineTo(-30, -32); p.lineTo(-32, 0); p.lineTo(-52, 0); p.lineTo(-54, -32); p.closePath();
    slab(g, p, '#E59BB0'); const ear = new Path2D(); ear.ellipse(40, -70, 24, 32, -0.2, 0, TAU); slab(g, ear, '#D17D95', 4);
    g.fillStyle = '#1D2B44'; g.beginPath(); g.arc(74, -78, 4.5, 0, TAU); g.fill(); line(g, -72, -60, -88, -40, '#B86A80', 4);
  },
  mouse(g) {
    const p = new Path2D();
    p.moveTo(-36, 0); p.bezierCurveTo(-40, -30, -10, -42, 14, -34); p.bezierCurveTo(30, -28, 42, -12, 48, -2); p.lineTo(44, 0); p.closePath();
    slab(g, p, '#9C8F84', 4); const ear = new Path2D(); ear.arc(14, -36, 11, 0, TAU); slab(g, ear, '#E7B7B0', 3);
    g.strokeStyle = '#7D7066'; g.lineWidth = 3.5; g.beginPath(); g.moveTo(-36, -6); g.bezierCurveTo(-60, -10, -64, -30, -50, -34); g.stroke();
    g.fillStyle = '#1D2B44'; g.beginPath(); g.arc(30, -18, 3.5, 0, TAU); g.fill();
  },
  ant(g) {
    g.fillStyle = '#2B2622';
    for (const [ex, ey, rx, ry] of [[-16, -10, 11, 8], [0, -11, 6, 5], [13, -13, 7, 6]]) { g.beginPath(); g.ellipse(ex, ey, rx, ry, 0, 0, TAU); g.fill(); }
    g.strokeStyle = '#2B2622'; g.lineWidth = 2.2; g.lineCap = 'round';
    for (const k of [-1, 0, 1]) { g.beginPath(); g.moveTo(k * 4, -10); g.lineTo(k * 9 - 2, -4); g.lineTo(k * 12 - 3, 0); g.stroke(); }
    g.beginPath(); g.moveTo(17, -18); g.quadraticCurveTo(22, -28, 28, -26); g.moveTo(15, -18); g.quadraticCurveTo(16, -30, 22, -31); g.stroke();
  },
};
/** Thú gỗ cắt đứng ở (x, y) = đáy giữa, tỉ lệ s. k: bật lên (đứng dậy từ mặt ván). flip: quay mặt sang trái. */
export function animal(g, kind, x, y, s = 1, { k = 1, flip = false } = {}) {
  const f = ANIMAL[kind]; if (!f) throw new Error(`animal: không có "${kind}"`);
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(s * (flip ? -1 : 1), s * pop(k)); f(g); g.restore();
}

// ═════════════════════════ biểu tượng khắc trên khối (xem trước ACT FOUR) ═════════════════════════
/** Biểu tượng mực navy trên đĩa giấy r: 'quake' băng địa chấn · 'speaker' loa · 'lemon' lát chanh · 'weight' quả tạ. */
export function icon(g, kind, x, y, r = 54, k = 1) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(x, y); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.card; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); }, { box: [-r, -r, 2 * r, 2 * r, r], blur: 10, oy: 5 });
  const q = r / 54; g.scale(q, q); g.strokeStyle = C.ink; g.fillStyle = C.ink; g.lineWidth = 5; g.lineCap = g.lineJoin = 'round';
  if (kind === 'quake') { const Z = [-34, 0, -24, -4, -16, 8, -10, -26, -2, 30, 6, -18, 12, 12, 20, -6, 26, 3, 34, 0]; g.beginPath(); for (let i = 0; i < Z.length; i += 2) i ? g.lineTo(Z[i], Z[i + 1]) : g.moveTo(Z[i], Z[i + 1]); g.stroke(); }
  else if (kind === 'speaker') { g.beginPath(); g.moveTo(-26, -10); g.lineTo(-12, -10); g.lineTo(6, -26); g.lineTo(6, 26); g.lineTo(-12, 10); g.lineTo(-26, 10); g.closePath(); g.fill();
    for (const r2 of [14, 26]) { g.beginPath(); g.arc(8, 0, r2, -0.8, 0.8); g.stroke(); } }
  else if (kind === 'lemon') { g.fillStyle = '#F5D547'; g.beginPath(); g.arc(0, 0, 32, 0, TAU); g.fill(); g.fillStyle = '#FFF4B0'; g.beginPath(); g.arc(0, 0, 25, 0, TAU); g.fill();
    g.strokeStyle = '#E2B21A'; g.lineWidth = 3; for (let i = 0; i < 8; i++) { const a = i * TAU / 8; g.beginPath(); g.moveTo(0, 0); g.lineTo(25 * Math.cos(a), 25 * Math.sin(a)); g.stroke(); }
    g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 32, 0, TAU); g.stroke(); }
  else if (kind === 'weight') { g.fill(rr(-30, -14, 60, 34, 8)); g.lineWidth = 6; g.beginPath(); g.arc(0, -16, 14, Math.PI, 0); g.stroke(); }
  else throw new Error(`icon: không có "${kind}"`);
  g.restore();
}

// ═════════════════════════ KHỐI ẢNH (ảnh thật in lên mặt khối gỗ lớn — DNA §8) ═════════════════════════
/**
 * Ảnh thật: assets/photos/INDEX.md (đạo diễn chính, một nguồn: key, tác giả, giấy phép, nhãn bắt buộc). credit BẮT BUỘC
 * (in dòng nhỏ dưới ảnh trên mặt khối). Tệp chưa có → loadKit bỏ qua, khối vẽ ô trống "PHOTO TO COME" + PHOTO_MISSING.
 */
export const PHOTOS = {
  napier: { src: './assets/photos/napier.jpg', credit: 'Wellcome Collection · CC BY 4.0 · Wikimedia Commons' },
  descriptio: { src: './assets/photos/descriptio.jpg', credit: 'John Napier (1614) · PD · Wikimedia Commons' },
  logtable: { src: './assets/photos/logtable.jpg', credit: 'John Napier (1614) · PD · Wikimedia Commons' },
  sliderule: { src: './assets/photos/sliderule.jpg', credit: 'Jacek Halicki · CC BY-SA 4.0 · Wikimedia Commons' },
  seismogram: { src: './assets/photos/seismogram.jpg', credit: 'Z22 · CC BY-SA 3.0 · Wikimedia Commons' },
  bernoulli: { src: './assets/photos/bernoulli.jpg', credit: 'Rijksmuseum · CC0 · Wikimedia Commons' },
  ant: { src: './assets/photos/ant.jpg', credit: 'Gemma Stiles · CC BY 2.0 · Wikimedia Commons' },
  bluewhale: { src: './assets/photos/bluewhale.jpg', credit: 'NOAA Fisheries · PD · Wikimedia Commons' },
};
export const PHOTO_MISSING = [];
export const photoImages = (...keys) => Object.fromEntries(keys.map(k => { const q = PHOTOS[k]; if (!q) throw new Error(`photoImages: "${k}" không có trong PHOTOS`); return ['photo:' + k, q.src]; }));
const SMALL = {};
/** Ảnh thu nhỏ theo bậc ½ tới tỉ lệ sc (sinh MỘT lần mỗi cỡ). */
function small(key, im, sc) {
  const id = key + ':' + sc.toFixed(3); if (SMALL[id]) return SMALL[id];
  let cur = im;
  while (cur.width * 0.5 >= im.width * sc) { const [c, x] = cpu(cur.width / 2, cur.height / 2); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height); cur = c; }
  const [c, x] = cpu(im.width * sc, im.height * sc); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height);
  return (SMALL[id] = c);
}
/** Credit trên mặt khối: một dòng 20 → 14 px; không vừa thì hai dòng (ngắt trước " · " cuối) 18 → 14 px; vẫn tràn → ném. */
function creditLines(g, cr, maxW, key) {
  for (let fs = 20; fs >= 14; fs--) if (measure(g, cr, `500 ${fs}px ${AR}`) <= maxW) return { fs, lines: [cr] };
  const i = cr.lastIndexOf(' · '), two = i > 0 ? [cr.slice(0, i), cr.slice(i + 3)] : [cr];
  for (let fs = 18; fs >= 14; fs--) if (two.every(l => measure(g, l, `500 ${fs}px ${AR}`) <= maxW)) return { fs, lines: two };
  fits(g, two[0], `500 14px ${AR}`, maxW, `photoBlock credit "${key}"`); return { fs: 14, lines: two };
}
/**
 * Khối ảnh: khối gỗ bạch dương lớn mặt (x, y, w, h), ảnh cover trong khung lề 22 px, credit dưới ảnh, vân gỗ ở cạnh.
 * k: trượt vào từ phải + đứng thẳng; rot: nghiêng; zoom/focus: đẩy chậm. label: thẻ treo dưới khối (nhãn bắt buộc INDEX;
 * mảng = nhiều thẻ chồng, cho nhãn dài).
 * Trả về hộp mặt khối {x, y, w, h}.
 */
export function photoBlock(g, key, x, y, w, h, { k = 1, rot = -0.02, label = null, labelK = null, note = null, zoom = 1, focus: fc = null, from = 'right' } = {}) {
  const Q = PHOTOS[key]; if (!Q) throw new Error(`photoBlock: "${key}" không có trong PHOTOS`);
  if (k <= 0) return { x, y, w, h };
  const im = IM['photo:' + key], cr = Q.credit, focus = fc || Q.focus || [0.5, 0.4];
  if (im && !cr) throw new Error(`photoBlock: "${key}" thiếu credit (assets/photos/INDEX.md → kit.PHOTOS)`);
  const e = outCubic(clamp(k)), off = from === 'right' ? (1 - e) * (W - x + 120) : from === 'left' ? -(1 - e) * (x + w + 160) : 0, up = from === 'top' ? -(1 - drop(k)) * (y + h + 200) : 0;
  const d = 26, M = 22, CL = cr ? creditLines(g, cr, w - 2 * M, key) : null, credH = CL ? CL.lines.length * (CL.fs + 6) + 12 : 0;
  g.save(); g.translate(x + w / 2 + off, y + h / 2 + up); g.rotate(rot * e);
  const S = blockSprite(C.birch, Math.round(w), Math.round(h), d, false, 2);
  contact(g, d * 0.6, h / 2 + 6, w * 0.6, 20, 0.3);
  g.drawImage(S.c, -w / 2 - 1, -h / 2 - S.dy - 1);
  const px = -w / 2 + M, py = -h / 2 + M, pw = w - 2 * M, ph = h - 2 * M - credH;
  g.fillStyle = 'rgba(70,50,20,0.35)'; g.fillRect(px - 3, py - 3, pw + 6, ph + 6);
  g.save(); g.beginPath(); g.rect(px, py, pw, ph); g.clip();
  if (im) {
    const sm = small(key, im, Math.max(pw / im.width, ph / im.height) * 1.12);
    const sc = Math.max(pw / sm.width, ph / sm.height) * zoom, iw = sm.width * sc, ih = sm.height * sc;
    g.drawImage(sm, px - (iw - pw) * focus[0], py - (ih - ph) * focus[1], iw, ih);
  } else {
    g.fillStyle = '#F3EBDA'; g.fillRect(px, py, pw, ph);
    g.save(); g.setLineDash([10, 10]); g.strokeStyle = 'rgba(78,91,102,0.45)'; g.lineWidth = 3; g.strokeRect(px + 16, py + 16, pw - 32, ph - 32); g.restore();
    text(g, 'PHOTO TO COME', 0, py + ph / 2, { font: `700 30px ${AR}`, color: C.dim, align: 'center' });
    text(g, key, 0, py + ph / 2 + 40, { font: `500 28px ${AR}`, color: C.dim, align: 'center' });
  }
  const gl = g.createLinearGradient(px, py, px + pw, py + ph); gl.addColorStop(0, 'rgba(255,255,255,0.14)'); gl.addColorStop(0.35, 'rgba(255,255,255,0)'); g.fillStyle = gl; g.fillRect(px, py, pw, ph);
  g.restore();
  if (CL) CL.lines.forEach((ln, i) => text(g, ln, px + pw, py + ph + 8 + (i + 0.5) * (CL.fs + 6), { font: `500 ${CL.fs}px ${AR}`, color: C.ink, align: 'right', base: 'middle' }));
  g.restore();
  let ly = y + h + 56 + up;
  const lk = labelK ?? clamp(k * 1.6 - 0.6);
  if (label) [].concat(label).forEach((ln, i) => { tag(g, ln, x + w / 2 + off, ly, { size: 32, k: lk, string: i ? null : [x + w / 2 + off - 20, y + h + up] }); ly += 60; });
  if (note) text(g, note, x + w / 2 + off, ly + 20, { font: `700 28px ${AR}`, color: C.dim, align: 'center', k: lk });
  return { x: x + off, y: y + up, w, h };
}

// ═════════════════════════ ba khối lời hứa ①②③ (cold open; b17 vẽ lại ĐÚNG) ═════════════════════════
/** Vị trí ba khối lời hứa (vật dùng chung a0 S4 ↔ b17). */
export const PROMISE = { xs: [520, 960, 1400], base: 812, w: 340, h: 300 };
const PROMISE_CAP = ['WHAT IS A LOG?', 'WHY × TURNS INTO +', 'WHY 72?'];
/**
 * Khối lời hứa i (0, 1, 2): khối bạch dương lớn, sticker tím số i+1 góc trên trái, mặt khối có hình thu nhỏ:
 * ① tháp 3 khối ×2 + "= 8" · ② dấu × xoay thành + (turn 0 → 1) · ③ 「72」 nhỏ. k: rơi xuống; kp: hình trên mặt hiện;
 * turn (chỉ ②); cap: chú thích thẻ treo dưới khối (0 → 1). Trả về hộp mặt.
 */
export function promiseBlock(g, i, { k = 1, kp = 1, turn = 0, cap = 1, lift = 0, cx = PROMISE.xs[i], base = PROMISE.base } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const { w, h } = PROMISE, fall = (1 - drop(k)) * 600 + outCubic(clamp(lift)) ** 1.5 * (base + 200), b = base - fall;
  block(g, cx, b, 0, { w, h, d: 30, color: C.birch, shadow: fall < 100, from: 0 });
  const fx = cx - w / 2, fy = b - h;
  g.save(); g.beginPath(); g.rect(fx + 8, fy + 8, w - 16, h - 16); g.clip();
  if (kp > 0) {
    if (i === 0) { tower(g, cx - 50, b - 30, 3, { s: 72, k: 3 * clamp(kp * 1.4), label: '×2', shadow: false });
      text(g, '= 8', cx + 30, b - 30 - 108, { font: `900 56px ${AR}`, color: C.ink, base: 'middle', k: clamp(kp * 2 - 1) }); }
    else if (i === 1) { const my = b - h / 2 + 4, turned = turn >= 0.5, ps = pop(kp);             // khối gạch đỏ "×" (như khối ×2) → xoay thành "+" tím
      g.save(); g.translate(cx, my); g.scale(ps, ps); g.translate(-cx, -my);
      block(g, cx, my + 75, 0, { w: 150, h: 150, d: 24, color: turned ? C.log : C.base, shadow: false, from: 0, v: 1 });
      g.translate(cx, my); g.rotate(-Math.PI / 4 * smooth(clamp(turn))); g.fillStyle = C.white;
      for (const a of [Math.PI / 4, -Math.PI / 4]) { g.save(); g.rotate(a); g.fill(rr(-44, -9, 88, 18, 6)); g.restore(); }
      g.restore(); }
    else big72(g, cx - 151, b - 62, 0.44, { k: clamp(kp * 1.5) });
  }
  g.restore();
  sticker_(g, String(i + 1), fx + 6, fy - 8, { r: 34 });
  if (cap > 0) { const s = PROMISE_CAP[i]; fits(g, s, `800 32px ${AR}`, 360, 'promise cap');
    tag(g, s, cx, b + 64, { size: 32, edge: C.log, k: cap, string: [cx - 10, b] }); }
  return { x: fx, y: fy, w, h };
}

// ═════════════════════════ biển tên mục + thẻ hồi ═════════════════════════
/** Biển tên mục: thẻ giấy treo bằng dây từ mép trên, góc trên trái. k: thả xuống; lift: kéo lên. Chữ 700 34px ≤ SEC_MAX. */
export function secTag(g, name, { k = 1, lift = 0, t = 0, x = 104, y = 72 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const font = `700 34px ${AR}`, tw = fits(g, name, font, SEC_MAX, 'secTag'), bw = tw + 72, bh = 66;
  const yy = y - (1 - outBack(clamp(k), 1.4)) * (y + bh + 20) - outCubic(clamp(lift)) * (y + bh + 30);
  g.save(); g.translate(x, yy); g.rotate(0.012 * Math.sin(t * 1.3));
  for (const sx of [30, bw - 30]) line(g, sx, 0, sx, -yy - 10, C.string, 2.5);
  shade(g, () => { g.fillStyle = C.card; g.fill(rr(0, 0, bw, bh, 10)); }, { box: [0, 0, bw, bh, 10], blur: 10, oy: 6 });
  g.save(); g.clip(rr(0, 0, bw, bh, 10)); g.fillStyle = C.birchDk; g.fillRect(0, 0, bw, 8); g.restore();
  for (const sx of [30, bw - 30]) { g.fillStyle = C.white; g.strokeStyle = C.birchDk; g.lineWidth = 2; g.beginPath(); g.arc(sx, 4, 5, 0, TAU); g.fill(); g.stroke(); }
  text(g, name, bw / 2, bh / 2 + 5, { font, align: 'center', base: 'middle' });
  g.restore();
  return { x, y: yy, w: bw, h: bh };
}
/** Bề rộng tối đa chữ biển tên mục (px) — "Standing at the start" (21 ký tự, dài nhất của p2) đo ở kit-test. */
export const SEC_MAX = 720;
/** Chữ hồi tối đa (ký tự, gồm khoảng trắng): "ACT THREE" = 9. Phụ đề 700 48px tối đa ACT_SUB_MAX px. */
export const ACT_MAX = 9, ACT_SUB_MAX = 1300;
/**
 * Thẻ HỒI (DNA §7): tháp/hàng khối bạch dương in từng chữ "ACT ONE" rơi lần lượt xuống một tấm ván giữa khung, phụ đề trên
 * thẻ giấy treo dưới ván; quanh start cả cụm nhấc lên khỏi khung. Hiện từ start − 2.45 tới start + 0.4.
 */
export function actTitle(g, t, start, act, sub) {
  if (t < start - 2.45 || t > start + 0.45) return;
  if (act.length > ACT_MAX) throw new Error(`actTitle: "${act}" > ${ACT_MAX} ký tự`);
  fits(g, sub, `700 48px ${AR}`, ACT_SUB_MAX, 'actTitle');
  const s = 104, gap = 10, sp = 46, chars = [...act], widths = chars.map(ch => ch === ' ' ? sp : s + gap), tot = widths.reduce((a, b) => a + b, 0) - gap;
  const lift = prog(t, start - 0.3, start + 0.4), up = outCubic(lift) ** 1.4 * 900, base = 470 - up;
  const kp = prog(t, start - 2.45, start - 2.05);
  if (kp > 0) block(g, W / 2, base + 34, 0, { w: tot + 120, h: 34, d: 16, color: C.birchDk, k: kp, shadow: false, from: 300 });
  let x = W / 2 - tot / 2, n = 0;
  chars.forEach((ch, i) => { if (ch !== ' ') { const a = start - 2.15 + n * 0.09; block(g, x + s / 2, base, s, { color: C.birch, label: ch, k: prog(t, a, a + 0.35), shadow: false, from: 500 }); n++; } x += widths[i]; });
  const kt = prog(t, start - 1.3, start - 0.8);
  if (kt > 0) { line(g, W / 2 - 200, base + 34, W / 2 - 200, base + 120, C.string, 2.5); line(g, W / 2 + 200, base + 34, W / 2 + 200, base + 120, C.string, 2.5);
    tag(g, sub, W / 2, base + 160, { size: 48, weight: 700, edge: C.log, k: kt }); }
}

// ═════════════════════════ mascot NÓI (DNA §5) ═════════════════════════
const IM = {}, SIL = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
/** Chiều cao tối đa mascot (DNA §5: ≤ 25% khung ≈ 270 px). */
export const FIG_MAX = 270;
/** Tư thế cũ (ảnh anime) → mascot vẽ nét (bản 3, 2026-10-29 — docs/character/CHARACTER-MASCOT.md): tay, biểu cảm, đạo cụ trong tay. */
const FIG = { calculator: { arms: 'hold', mood: 'deadpan', prop: 'calc' }, pointer: { arms: 'point', mood: 'deadpan' }, notebook: { arms: 'hold', mood: 'think', prop: 'book' },
  ponder: { arms: 'think', mood: 'think' }, ok: { arms: 'cheer', mood: 'happy', mouth: 'grin' }, thumb: { arms: 'cheer', mood: 'happy', mouth: 'grin' }, wave: { arms: 'wave', mood: 'happy' } };
/** Khung giờ mascot đang DIỄN trong cảnh (actor.js) — mascot dẫn ở góc lặn xuống, không bao giờ hai mascot cùng khung (bản 3). */
const ACTS = [];
export function actorOn(a, b) { ACTS.push([a, b]); }
/** Mascot nhỏ ở mép dưới. k: trồi lên + bật; t (giờ timeline của trang) → miệng nói theo lời khi đã đứng hẳn, chớp mắt. */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false } = {}) {
  if (k <= 0) return null;
  if (h > FIG_MAX) throw new Error(`figure: cao ${h} px > ${FIG_MAX} — DNA §5 mascot nhỏ`);
  const F = FIG[pose]; if (!F) throw new Error(`figure: chưa có tư thế "${pose}" (FIG)`);
  const off = t == null ? 0 : ACTS.reduce((m, [a, b]) => Math.max(m, Math.min(prog(t, a - 0.7, a - 0.1), 1 - prog(t, b + 0.1, b + 0.7))), 0);
  if (off >= 1) return null;
  const rise = (1 - outBack(clamp(k))) * h * 0.6 + outCubic(off) * h * 1.3, y = foot + rise - h * 0.02, tt = t ?? 0;
  const open = talk && t != null && ENV ? mouthOpen(ENV, t, k) : 0;
  g.save(); g.fillStyle = 'rgba(34,48,60,0.16)'; g.beginPath(); g.ellipse(cx, foot - 6, h * 0.2, h * 0.025, 0, 0, TAU); g.fill(); g.restore();   // bóng dưới chân
  bindMascot(g);
  const a = mascot(cx, y, h, { arms: F.arms, mood: F.mood, mouth: talkMouth(open, tt, F.mouth ?? 'flat'), flip, t: tt, blink: blinkAt(tt, 1) });
  if (F.prop) { const [p, q] = a.hands, mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - h * 0.02, w = h * 0.14;
    g.save(); g.translate(mx, my); g.rotate(flip ? 0.12 : -0.12); g.strokeStyle = MINK; g.lineWidth = 3;
    if (F.prop === 'calc') { g.fillStyle = '#2B2F38'; g.beginPath(); g.roundRect(-w / 2, -w * 0.7, w, w * 1.3, 6); g.fill(); g.stroke(); g.fillStyle = '#CFE3C8'; g.fillRect(-w * 0.38, -w * 0.58, w * 0.76, w * 0.3); }
    else { g.fillStyle = '#F4EEDC'; g.beginPath(); g.roundRect(-w * 0.7, -w * 0.5, w * 1.4, w, 4); g.fill(); g.stroke(); g.beginPath(); g.moveTo(0, -w * 0.5); g.lineTo(0, w * 0.5); g.stroke(); }
    g.restore(); }
  return { x: cx - h * 0.25, y: y - h, w: h * 0.5, h };
}

// ═════════════════════════ chuyển cảnh (DNA §7) — trang p1/p2 gọi ═════════════════════════
let SLAB;
function makeSlab() {                                                    // khối gỗ lớn cao hết khung (trượt ngang)
  const w = 380, d = 34, [c, x] = cpu(w + d + 2, H + 120), X = 1, Y = 60;
  const face = new Path2D(); face.rect(X, Y, w, H); x.fillStyle = C.birch; x.fill(face); grainOn(x, face, 600, 600, 1, Math.PI / 2);
  const side = new Path2D(); side.moveTo(X + w, Y); side.lineTo(X + w + d, Y - 27); side.lineTo(X + w + d, Y + H - 27); side.lineTo(X + w, Y + H); side.closePath();
  x.fillStyle = mix(C.birch, -0.22); x.fill(side); grainOn(x, side, 0, 0, 0.8, 1.57);
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(X + 3, Y, 4, H); x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(X + w - 6, Y, 4, H);
  return { c, w, d };
}
/** Khối gỗ lớn trượt ngang (cùng ERA): khối bạch dương cao hết khung đi TRÁI → PHẢI; cảnh mới lộ PHÍA SAU khối (bên trái). */
export function slideSwap(g, k, drawPrev, drawCur) {
  const { c, w, d } = SLAB, e = smooth(clamp(k)), L = -w - d - 40 + e * (W + 2 * (w + d + 40));
  g.save(); g.beginPath(); g.rect(L + w / 2, 0, W - L, H); g.clip(); drawPrev(); g.restore();
  g.save(); g.beginPath(); g.rect(0, 0, Math.max(0, L + w / 2), H); g.clip(); drawCur(); g.restore();
  const sg = g.createLinearGradient(L + w + d, 0, L + w + d + 70, 0); sg.addColorStop(0, 'rgba(40,60,80,0.28)'); sg.addColorStop(1, 'rgba(40,60,80,0)'); g.fillStyle = sg; g.fillRect(L + w + d, 0, 70, H);
  const sl = g.createLinearGradient(L - 50, 0, L, 0); sl.addColorStop(0, 'rgba(40,60,80,0)'); sl.addColorStop(1, 'rgba(40,60,80,0.18)'); g.fillStyle = sl; g.fillRect(L - 50, 0, 50, H);
  g.drawImage(c, L - 1, -61);
}
/** Đổ tháp domino (khác ERA): k < 0.4 các thanh domino bạch dương rơi xuống che kín cảnh cũ (phải → trái); sau đó đổ dây
 *  chuyền từ PHẢI sang TRÁI, rơi khỏi khung, lộ cảnh mới. */
export function dominoSwap(g, k, drawPrev, drawCur) {
  const n = 8, sw = W / n, ph1 = k < 0.4;
  g.save(); (ph1 ? drawPrev : drawCur)(); g.restore();
  for (let j = 0; j < n; j++) {
    const i = n - 1 - j, x = i * sw;                                      // j = thứ tự tính từ phải
    let ang = 0, dy = 0;
    if (ph1) { const u = clamp((k / 0.4) * 1.6 - j * 0.6 / (n - 1)); if (u <= 0) continue; dy = -(1 - drop(u)) * (H + 60); }
    else { const u = clamp(((k - 0.4) / 0.6) * 1.7 - j * 0.7 / (n - 1)); if (u >= 1) continue; ang = -Math.PI / 2 * u ** 1.6; dy = (u ** 3) * 700; }
    g.save(); g.translate(x, H + dy); g.rotate(ang);
    g.fillStyle = 'rgba(40,60,80,0.25)'; g.fillRect(sw - 2, -H, 14, H);
    g.drawImage(SLAB.c, 1, 60, SLAB.w, H, 0, -H, sw + 1, H);
    g.fillStyle = C.ink; for (const yy of [-H * 0.75, -H * 0.25]) { g.beginPath(); g.arc(sw / 2, yy, 16, 0, TAU); g.fill(); }
    g.fillStyle = 'rgba(34,48,60,0.55)'; g.fillRect(14, -H / 2 - 3, sw - 28, 6);
    g.restore();
  }
}

// ═════════════════════════ nạp ═════════════════════════
/** Nạp ảnh {key: url} ('pose-<tên>' mascot, 'photo:<key>' ảnh thật — thiếu tệp thì ghi PHOTO_MISSING, không ném) + sinh nền MỘT lần. */
export async function loadKit(images) {
  GRAIN = grainSheet(true); GRAINL = grainSheet(false);
  ROOM = { table: makeRoom('table'), photo: makeRoom('photo') }; S72 = sprite72(); SLAB = makeSlab();
  const photos = Object.entries(images).filter(([k]) => k.startsWith('photo:')), rest = Object.fromEntries(Object.entries(images).filter(([k]) => !k.startsWith('photo:')));
  await loadImages(rest, IM);
  await Promise.all(photos.map(([k, u]) => loadImages({ [k]: u }, IM).catch(() => { PHOTO_MISSING.push(k.slice(6)); console.warn('kit: thiếu ảnh ' + u); })));
  for (const key of Object.keys(rest)) if (key.startsWith('pose-')) {
    const im = IM[key], [c, x] = cpu(im.width, im.height); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#5A6E8A'; x.fillRect(0, 0, im.width, im.height); SIL[key] = c;
  }
}
