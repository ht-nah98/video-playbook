// Đồ nghề của bài học neg-times-neg — DNA "Tiles" (DNA.md; bàn thử tools/lab/tiles.html).
// Công cụ chung (chữ viết vào, nét tay, gạch/khoanh/mũi tên, dấu, iris, lookup, must) giữ từ kit pi; phần ĐỒ VẬT TRÊN
// BÀN HỌC (thảm cắt, viên gạch +1/−1, zero pair, chữ nhật nhân, vết nứt, giấy nhớ, ảnh in, phương trình nhiều màu) là của bài.
// Mọi hàm vẽ nhận g, là hàm thuần của tham số (tất định); kết cấu, sprite, ảnh xử lý sinh MỘT lần lúc nạp hoặc cache.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js';
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
/** Tiến độ 0→1 của t trong [a, b]. b < a là lỗi im lặng (tra nhầm từ lặp) → ném (LESSONS §59). */
export const prog = (t, a, b) => { if (b < a) throw new Error(`prog: b < a (${a} → ${b})`); return clamp((t - a) / (b - a)); };
export const PI = Math.PI;

// ── màu (DNA §2) ──
export const C = {
  mat: '#22303F', grid: '143,166,189', ink: '#F2ECDD', dim: '#A9B6C4',
  pos: '#F4C430', posS: '#B98E12', posT: '#F4C430',          // + : mặt viên / cạnh / chữ
  neg: '#D8443A', negS: '#952A22', negT: '#FF8070',          // − : mặt viên / cạnh / chữ (chữ sáng hơn cho đủ 5.5:1)
  ice: '#52D8E6',                                            // SAI / SỤP — chỉ cho cái sai
  note: '#F1E6C8', noteInk: '#1E2A36', noteNeg: '#B8322A', noteDim: '#5E5646',
  shade: '#0E151E',
};
export const CG = '"Cormorant Garamond"', MONO = '"IBM Plex Mono"', ARC = '"Archivo"';
// Một chất liệu cả bài (trang đọc ERA để chọn kiểu chuyển).
export const ERA = { mat: { bg: C.mat, ink: C.ink, accent: C.pos, dim: C.dim } };

// ── số → chữ: dấu trừ U+2212, ngoặc cho số âm ──
export const num = v => (v < 0 ? '−' + -v : String(v));
export const par = v => (v < 0 ? `(${num(v)})` : num(v));

// ── thảm cắt: xanh than, lưới 40 px (đậm mỗi 5 ô = chu kỳ 200 px), vạch 45°, vết dao; to hơn khung để camera trôi ──
const PAD = 200;
let MAT;
function matTex() {
  const w = W + 2 * PAD, h = H + 2 * PAD, c = mk(w, h), x = c.getContext('2d'), d = x.createImageData(w, h), b = [0x22, 0x30, 0x3F];
  for (let i = 0; i < w * h; i++) {
    const px = i % w, py = (i / w) | 0, n = (hash(i * 0.517) - 0.5) * 5;
    const r = Math.hypot((px - w * 0.47) / w, (py - h * 0.47) / h), v = 1.06 - 0.5 * r * r;
    d.data[i * 4] = b[0] * v + n; d.data[i * 4 + 1] = b[1] * v + n; d.data[i * 4 + 2] = b[2] * v + n; d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  for (let k = 0; k * 40 <= w; k++) { x.fillStyle = `rgba(${C.grid},${k % 5 ? 0.09 : 0.2})`; x.fillRect(k * 40, 0, k % 5 ? 1 : 1.6, h); }
  for (let k = 0; k * 40 <= h; k++) { x.fillStyle = `rgba(${C.grid},${k % 5 ? 0.09 : 0.2})`; x.fillRect(0, k * 40, w, k % 5 ? 1 : 1.6); }
  x.strokeStyle = `rgba(${C.grid},0.07)`; x.lineWidth = 1;
  for (let k = -h; k < w; k += 400) { x.beginPath(); x.moveTo(k, h); x.lineTo(k + h, 0); x.stroke(); }
  for (let k = 0; k < 18; k++) {
    const sx = hash(k * 2.3) * w, sy = hash(k * 5.9) * h, a = (hash(k * 9.1) - 0.5) * 0.6 + (k % 2 ? 0 : PI / 2), l = 60 + hash(k * 4.4) * 220;
    x.strokeStyle = 'rgba(190,205,220,0.07)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + l * Math.cos(a), sy + l * Math.sin(a)); x.stroke();
  }
  return c;
}
/** Nền thảm. (ox, oy) = vị trí camera trên thảm (bao xa cũng được): lưới trôi liền vì chu kỳ 200 px. */
export function ground(g, e = 'mat', ox = 0, oy = 0) {
  const m = v => ((v % PAD) + PAD) % PAD;
  g.drawImage(MAT, -m(ox), -m(oy));
}
/** Camera trôi chậm trên thảm (px), từ `from`: g.translate(-x, -y) quanh phần vẽ, ground(g, 'mat', x, y). */
export function drift(t, from, { vx = 8, vy = 3, max = 120 } = {}) {
  const s = Math.max(0, t - from); return { x: Math.min(max, vx * s), y: Math.min(max, vy * s) };
}

// ── chữ ──
/** Chữ thường (không lộ dần). Trả về bề rộng. ls = giãn chữ (px). */
export function text(g, s, x, y, font, color, align = 'left', ls = 0) {
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  g.fillText(s, x, y); const w = g.measureText(s).width; g.restore(); return w;
}
/** Chữ VIẾT vào (lộ dần theo ký tự, không fade — DNA §9). */
export function typed(g, s, x, y, k, font, color, { align = 'left', ls = 0 } = {}) {
  const n = Math.round(s.length * clamp(k)); if (!n) return;
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.letterSpacing = ls + 'px'; g.fillText(s.slice(0, n), x, y); g.restore();
}
/** Nhãn in trên thảm: Plex Mono VIẾT HOA, giãn 2.5 px, viết vào theo k. Màu mặc định nhãn phụ (6.5:1). */
export function label(g, s, x, y, k = 1, { color = C.dim, align = 'left', size = 20 } = {}) {
  typed(g, s.toUpperCase(), x, y, k, `500 ${size}px ${MONO}`, color, { align, ls: 2.5 });
}
/** Plex Mono GIỮ hoa/thường (biến a, b, công thức nhỏ), giãn 2 px, viết vào theo k. */
export function mono(g, s, x, y, k, color = C.ink, size = 22, align = 'left') {
  typed(g, s, x, y, k, `500 ${size}px ${MONO}`, color, { align, ls: 2 });
}
/** Lời dẫn / trích dẫn / tên người: Cormorant LN nghiêng 600, viết vào theo k. */
export function quote(g, s, x, y, k = 1, { size = 44, color = C.ink, align = 'left' } = {}) {
  typed(g, s, x, y, k, `italic 600 ${size}px ${CG}`, color, { align });
}
/**
 * Phương trình nhiều màu (Archivo): parts = [[chuỗi, màu?], …], VIẾT vào theo k trên cả chuỗi (trái → phải).
 * align theo x: 'left' | 'center' | 'right'. Trả về [[x0, x1], …] của từng phần (để đặt gạch / zero pair dưới đúng số).
 * Số âm: dùng num()/par() để có dấu "−" thật. Màu: dương C.posT, âm C.negT, còn lại ngà.
 */
export function eq(g, parts, x, y, size, k = 1, { align = 'left', weight = 600 } = {}) {
  const font = `${weight} ${size}px ${ARC}`;
  g.save(); g.font = font; const ws = parts.map(([s]) => g.measureText(s).width); g.restore();
  const tot = ws.reduce((a, b) => a + b, 0);
  let cx = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const all = parts.reduce((a, [s]) => a + s.length, 0); let left = Math.round(all * clamp(k));
  const out = [];
  parts.forEach(([s, col], i) => {
    out.push([cx, cx + ws[i]]);
    if (left > 0) { typed(g, s, cx, y, Math.min(1, left / s.length), font, col || C.ink); left -= s.length; }
    cx += ws[i];
  });
  return out;
}
export const mid = r => (r[0] + r[1]) / 2;

// ── thẻ mục (góc trái trên, x 96–900, y 64–166): "ACT III" + tên mục + vạch vàng/đỏ. Chừa vùng này. ──
/** Thẻ mục viết vào theo k. Tên VIẾT HOA ≤ 31 ký tự (ĐO bằng PIL, Archivo 700 34px: "FICTITIOUS, ABSURD, MEANINGLESS" = 779 px). */
export function card(g, k, act, name) {
  if (k <= 0) return;
  label(g, act, 96, 92, k * 2, { size: 20 });
  typed(g, name, 96, 140, k * 1.6 - 0.3, `700 34px ${ARC}`, C.ink, { ls: 0.5 });
  const kb = clamp(k * 1.6 - 0.6);
  if (kb > 0) { g.save(); g.fillStyle = C.pos; g.fillRect(96, 158, 56 * outCubic(kb), 4); g.fillStyle = C.neg; g.fillRect(96 + 62, 158, 56 * outCubic(kb), 4); g.restore(); }
}
/** Thẻ HỒI giữa khung trong khoảng lặng mở hồi: "ACT II" + tên + "ANSWERS 2", viết vào từ start−2.3, trượt lên. */
export function actTitle(g, t, start, act, sub, answers = '') {
  const out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  g.save(); g.translate(0, -out * 700);
  typed(g, 'ACT ' + act, W / 2, 500, prog(t, start - 2.3, start - 1.8), `700 120px ${ARC}`, C.ink, { align: 'center', ls: 6 });
  typed(g, sub, W / 2, 596, prog(t, start - 1.8, start - 1.1), `italic 600 72px ${CG}`, C.posT, { align: 'center' });
  if (answers) label(g, answers, W / 2, 660, prog(t, start - 1.2, start - 0.7), { align: 'center' });
  // một zero pair nhỏ dưới thẻ: úp và biến mất ngay trước khi thẻ trượt đi
  zeroPair(g, W / 2 - 22, 712, 44, prog(t, start - 1.0, start - 0.3), { show: prog(t, start - 1.5, start - 1.2) });
  g.restore();
}

// ── viên gạch (vật xuyên suốt) ──
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
/**
 * Viên gạch cạnh s tại (x, y) góc trên-trái. kind 'p' (+1 vàng) | 'n' (−1 đỏ). o.k = rơi xuống thảm (0 → 1: từ to hơn,
 * cao hơn, bóng xa), o.rot xoay, o.alpha, o.wrong = viền đứt xanh băng (viên của "luật mới" sai).
 * Dấu +/− dập chìm trên mặt (người mù màu vẫn đọc được).
 */
export function tile(g, x, y, s, kind, o = {}) {
  const k = o.k ?? 1; if (k <= 0) return;
  const e = outCubic(clamp(k)), lift = (1 - e) * s * 0.6, sc = 1 + (1 - e) * 0.25;
  const P = kind === 'p', face = P ? C.pos : C.neg, side = P ? C.posS : C.negS, d = Math.max(3, s * 0.1), r = s * 0.12;
  g.save(); g.translate(x + s / 2, y + s / 2 - lift); g.rotate(o.rot || 0); g.scale(sc, sc); g.translate(-s / 2, -s / 2);
  g.globalAlpha = (o.alpha ?? 1) * clamp(k * 3);
  g.save(); g.shadowColor = 'rgba(5,10,18,0.55)'; g.shadowBlur = s * (0.28 + (1 - e) * 0.4); g.shadowOffsetX = s * 0.08; g.shadowOffsetY = s * (0.14 + (1 - e) * 0.3);
  g.fillStyle = side; rr(g, d * 0.6, d, s, s, r); g.fill(); g.restore();
  const gr = g.createLinearGradient(0, 0, s, s); gr.addColorStop(0, 'rgba(255,255,255,0.22)'); gr.addColorStop(0.5, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.10)');
  g.fillStyle = face; rr(g, 0, 0, s, s, r); g.fill(); g.fillStyle = gr; g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 1.2; rr(g, 1.5, 1.5, s - 3, s - 3, r * 0.8); g.stroke();
  const m = s * 0.2, t = Math.max(2, s * 0.06);
  g.fillStyle = 'rgba(0,0,0,0.20)'; g.fillRect(s / 2 - m, s / 2 - t / 2, 2 * m, t); if (P) g.fillRect(s / 2 - t / 2, s / 2 - m, t, 2 * m);
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(s / 2 - m, s / 2 + t / 2, 2 * m, 1); if (P) g.fillRect(s / 2 + t / 2, s / 2 - m, 1, 2 * m);
  if (o.wrong) { g.strokeStyle = C.ice; g.lineWidth = 3.5; g.setLineDash([9, 6]); rr(g, -7, -7, s + 14 + d * 0.6, s + 14 + d, r + 6); g.stroke(); }
  g.restore();
}
/** Dấu chân viền đứt nơi một zero pair vừa biến mất = 0. k = hiện ra. */
export function footprint(g, x, y, s, k = 1, { color = C.dim, zero = true } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = 2.4; g.setLineDash([8, 7]); g.globalAlpha = clamp(k * 2);
  rr(g, x, y, s, s, s * 0.12); g.stroke(); g.restore();
  if (zero && k > 0.5) text(g, '0', x + s / 2, y + s / 2 + s * 0.17, `500 ${s * 0.46}px ${ARC}`, color, 'center');
}
/**
 * ZERO PAIR (vật xuyên suốt) tại ô (x, y) cạnh s, theo k:
 *   k ≤ 0: hai viên nằm cạnh nhau (viên trên ở bên phải, cách 1.25 s) · 0–0.45 viên trên trượt úp xuống viên dưới ·
 *   0.45–0.8 cả hai co lại, mờ · 0.8–1 dấu chân "0" hiện. show = hai viên rơi xuống thảm (0 → 1) trước khi ghép.
 * cancel = false (e2: hai viên CÙNG dấu): úp xuống nhưng KHÔNG biến mất, viên trên viền băng.
 */
export function zeroPair(g, x, y, s, k = 1, { top = 'p', bot = 'n', cancel = true, show = 1 } = {}) {
  if (show <= 0) return;
  const a = smooth(clamp(k / 0.45)), b = cancel ? smooth(clamp((k - 0.45) / 0.35)) : 0, f = cancel ? clamp((k - 0.8) / 0.2) : 0;
  if (b < 1) {
    const sc = 1 - 0.85 * b, al = 1 - b, cx = x + s / 2, cy = y + s / 2;
    g.save(); g.translate(cx, cy); g.scale(sc, sc); g.translate(-cx, -cy);
    tile(g, x, y, s, bot, { alpha: al, k: show });
    const ox = (1 - a) * s * 1.25 + a * s * 0.18, oy = -a * s * 0.18;
    tile(g, x + ox, y + oy, s, top, { rot: -0.16 * a, alpha: al, k: show, wrong: !cancel && a >= 1 });
    g.restore();
  }
  footprint(g, x, y, s, f);
}
/**
 * Chữ nhật nhân: `rows` viên loại rk ở cột trái, `cols` viên loại ck ở hàng trên, lòng rows×cols viên loại pk.
 * k: 0–0.35 thừa số rơi xuống · 0.35–1 lòng lấp dần theo hàng. o.wrong = viền băng trên viên tích (luật mới).
 * Trả về { x0, x1, y0, y1, X, Y, p } (X, Y = góc lòng; p = bước viên). rows hoặc cols = 0 → chỉ thừa số, lòng trống.
 */
export function mulRect(g, x, y, s, rows, cols, rk, ck, pk, k = 1, o = {}) {
  const p = s + 7, gap = 18, X = x + p + gap, Y = y + p + gap, kf = clamp(k / 0.35), kp = clamp((k - 0.35) / 0.65);
  for (let i = 0; i < rows; i++) tile(g, x, Y + i * p, s, rk, { k: clamp(kf * rows - i) });
  for (let j = 0; j < cols; j++) tile(g, X + j * p, y, s, ck, { k: clamp(kf * cols - j) });
  const n = rows * cols;
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) tile(g, X + j * p, Y + i * p, s, pk, { k: clamp(kp * n - (i * cols + j)), wrong: o.wrong });
  if (kf >= 1) {
    line(g, [[X - gap / 2, y - 6], [X - gap / 2, Y + Math.max(1, rows) * p + 4]], 'rgba(242,236,221,0.55)', 2);
    line(g, [[x - 6, Y - gap / 2], [X + Math.max(1, cols) * p + 4, Y - gap / 2]], 'rgba(242,236,221,0.55)', 2);
  }
  return { x0: x, x1: X + cols * p - 7, y0: y, y1: Y + rows * p - 7, X, Y, p };
}
/** Vết nứt xanh băng (cái sai làm sụp): đường gãy vẽ dần theo k + nhánh, quầng bằng shadowBlur (không filter). */
export function crack(g, pts, k = 1, w = 3) {
  if (k <= 0) return;
  g.save(); g.shadowColor = 'rgba(82,216,230,0.7)'; g.shadowBlur = 14; line(g, pts, C.ice, w, { k }); g.restore();
  const n = Math.floor((pts.length - 1) * clamp(k));
  pts.forEach(([px, py], i) => { if (i && i <= n && i < pts.length - 1 && i % 2) { const a = hash(i * 3.7) * 6.28, l = 18 + hash(i * 1.9) * 30;
    line(g, [[px, py], [px + l * Math.cos(a), py + l * Math.sin(a)]], C.ice, 1.6); } });
}
/**
 * Giấy nhớ (giả định, trích dẫn, câu trả lời quen thuộc) dán thảm: bóng, băng dính; k = dán vào (rơi + thẳng ra).
 * Trả về inNote(fn): vẽ fn() TRONG hệ toạ độ tờ giấy (gốc = góc trên-trái tờ). Chữ trên giấy: C.noteInk / C.noteNeg.
 */
export function stickyNote(g, x, y, w, h, k = 1, { rot = -0.025 } = {}) {
  if (k <= 0) return () => {};
  const e = outCubic(clamp(k)), dy = (1 - e) * 60;
  const inNote = fn => { g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot * e); g.translate(-w / 2, -h / 2); fn(); g.restore(); };
  inNote(() => {
    g.save(); g.globalAlpha = clamp(k * 3); g.shadowColor = 'rgba(5,10,18,0.5)'; g.shadowBlur = 18; g.shadowOffsetY = 8;
    g.fillStyle = C.note; g.fillRect(0, 0, w, h); g.restore();
    g.save(); g.fillStyle = 'rgba(230,224,205,0.65)'; g.translate(w / 2, 0); g.rotate(0.05); g.fillRect(-70, -16, 140, 32); g.restore();
  });
  return inNote;
}

// ── nét: thẳng (thước), vẽ dần; nét tay (gạch sai, khoanh, mũi tên cong) ──
export function line(g, pts, color, w = 2, { dash = [], k = 1 } = {}) {
  if (k <= 0 || pts.length < 2) return;
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const stop = L.at(-1) * clamp(k);
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = g.lineJoin = 'round'; g.setLineDash(dash); g.beginPath(); g.moveTo(...pts[0]);
  for (let i = 1; i < pts.length; i++) {
    if (L[i] <= stop) { g.lineTo(...pts[i]); continue; }
    const f = (stop - L[i - 1]) / (L[i] - L[i - 1] || 1); g.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); break;
  }
  g.stroke(); g.restore();
}
export function arrowHead(g, x, y, ang, color, s = 14) {
  g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = color;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(-s, -s * 0.42); g.lineTo(-s * 0.75, 0); g.lineTo(-s, s * 0.42); g.closePath(); g.fill(); g.restore();
}
export const seg = (x0, y0, x1, y1, n = 24) => Array.from({ length: n + 1 }, (_, i) => [x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n]);
export function hand(g, pts, { w = 4, color = C.ink, jit = 1.5, seed = 1, k = 1 } = {}) {
  if (k <= 0) return;
  const m = Math.max(1, Math.ceil((pts.length - 1) * k));
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= m; i++) {
    let [x, y] = pts[i];
    if (i === m && k < 1) { const f = (pts.length - 1) * k - (m - 1), [px, py] = pts[m - 1]; x = px + (x - px) * f; y = py + (y - py) * f; }
    x += (hash(i * 3.1 + seed) - .5) * jit; y += (hash(i * 5.7 + seed) - .5) * jit;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke(); g.restore();
}
/** Gạch ý SAI — xanh băng (DNA: băng CHỈ cho cái sai; KHÔNG gạch ý đúng §58). */
export function strike(g, x0, y0, x1, y1, k = 1, { color = C.ice, w = 6, seed = 7 } = {}) { hand(g, seg(x0, y0, x1, y1, 14), { w, color, jit: 2, seed, k }); }
/** ✗ vẽ tay (không font nào có ✗) — xanh băng. */
export function cross(g, x, y, s, k = 1, { color = C.ice, seed = 3, w = 6 } = {}) {
  strike(g, x - s, y - s, x + s, y + s, clamp(k * 2), { color, seed, w }); strike(g, x + s, y - s, x - s, y + s, clamp(k * 2 - 1), { color, seed: seed + 9, w });
}
/** ✓ vẽ tay (ngà). */
export function check(g, x, y, s, k = 1, { color = C.ink, w = 6, seed = 4 } = {}) {
  hand(g, [[x - s, y], [x - s * 0.35, y + s * 0.6], [x + s, y - s * 0.8]], { w, color, jit: 1.2, seed, k });
}
export function ring(g, x, y, rx, ry, k = 1, { color = C.ink, w = 4, seed = 5 } = {}) {
  const P = Array.from({ length: 49 }, (_, i) => { const a = -2.2 + i / 48 * PI * 2.15; return [x + Math.cos(a) * rx * (1 + (hash(i + seed) - .5) * .05), y + Math.sin(a) * ry]; });
  hand(g, P, { w, color, jit: 1.5, seed, k });
}
export function arrow(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 3, bend = 0, seed = 11 } = {}) {
  if (k <= 0) return;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  const P = Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
    return [a * x0 + b * (mx + nx * bend) + c * x1, a * y0 + b * (my + ny * bend) + c * y1]; });
  hand(g, P, { w, color, seed, k, jit: 0.6 });
  if (k >= 1) { const [px, py] = P[22]; arrowHead(g, x1, y1, Math.atan2(y1 - py, x1 - px), color, 16); }
}
/** Dấu đóng (ABSURD, NOT A PROOF…): rơi từ to xuống, hơi xoay, khung chữ nhật. Màu theo nghĩa (ngà / băng nếu SAI). */
export function stamp(g, s, x, y, k, { size = 40, color = C.ink, rot = -0.08, align = 'center' } = {}) {
  if (k <= 0) return;
  const e = clamp(k), sc = 1 + (1 - outCubic(e)) * 0.8, font = `800 ${size}px ${ARC}`;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.font = font; g.textAlign = align; g.textBaseline = 'middle'; g.letterSpacing = '3px';
  g.fillStyle = color; g.fillText(s, 0, 0);
  const m = g.measureText(s).width, pad = size * 0.4; g.strokeStyle = color; g.lineWidth = 4;
  g.strokeRect((align === 'center' ? -m / 2 : 0) - pad, -size * 0.85, m + 2 * pad, size * 1.7);
  g.restore();
}
/** Trục số in trên thảm: x0 → x1 ở y, số nguyên lo..hi; vẽ dần theo k. Trả về X(v) → toạ độ x (cả khi k ≤ 0). */
export function numberLine(g, x0, x1, y, lo, hi, k = 1, { color = C.dim, labels = true, size = 24 } = {}) {
  const X = v => x0 + (x1 - x0) * (v - lo) / (hi - lo);
  if (k <= 0) return X;
  line(g, [[x0 - 20, y], [x1 + 20, y]], color, 2.4, { k });
  if (k >= 1) { arrowHead(g, x1 + 32, y, 0, color, 14); arrowHead(g, x0 - 32, y, PI, color, 14); }
  for (let v = lo; v <= hi; v++) {
    const kv = clamp(k * (hi - lo + 1) - (v - lo)); if (kv <= 0) break;
    line(g, [[X(v), y - 10], [X(v), y + 10]], color, v === 0 ? 3 : 2);
    if (labels) text(g, num(v), X(v), y + 46, `600 ${size}px ${ARC}`, v > 0 ? C.posT : v < 0 ? C.negT : C.ink, 'center');
  }
  return X;
}

// ── nhân vật: hình cắt viền tối 3 px (áo trắng tách khỏi thảm); vào = trồi lên + bật (0.35 s), không fade ──
// crop = phần trên của ảnh được giữ: toàn thân ≈ 0.45 (ngang hông), khung giữa đùi 1 (assets/character-v2/POSES.md).
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, startled: 1,
  three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, invite: 1, notebook: 1, 'peace-back': 1 };
function sprite(pose, crop) {
  const im = IM['pose-' + pose], sh = Math.round(im.height * crop), p = 6, c = mk(im.width + 2 * p, sh + 2 * p), x = c.getContext('2d');
  const sil = mk(im.width, sh), sx = sil.getContext('2d'); sx.drawImage(im, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = C.shade; sx.fillRect(0, 0, im.width, sh);
  for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * PI; x.drawImage(sil, p + 3.2 * Math.cos(a), p + 3.2 * Math.sin(a)); }
  x.drawImage(im, 0, 0, im.width, sh, p, p, im.width, sh); return { c, p, sh };
}
/**
 * Nhân vật, chân chạm `foot`, cao h (phần đã cắt). Trả về hàm P(ix, iy) đổi toạ độ ẢNH GỐC → khung — trả về CẢ khi
 * k ≤ 0 (LESSONS §53). Vẽ sau khi `restore` camera (toạ độ màn hình), một bên khung (cx ≤ 380 hoặc ≥ 1540).
 */
export function figure(g, pose, cx, foot, h, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  const S = (FIG[pose + crop] ??= sprite(pose, crop)), s = h / S.sh, w = S.c.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot - h - S.p * s + rise;
  const P = (ix, iy) => [flip ? cx + w / 2 - (ix + S.p) * s : x0 + (ix + S.p) * s, y0 + (iy + S.p) * s];
  if (k <= 0) return P;
  g.save(); if (flip) { g.translate(cx, 0); g.scale(-1, 1); g.translate(-cx, 0); }
  g.drawImage(S.c, x0, y0, w, S.c.height * s); g.restore();
  return P;
}

// ── ảnh lịch sử: in như ảnh chụp đen trắng ấm, viền ngà, băng dính, hơi nghiêng; nhãn dưới ──
const PH = {};
function warmPrint(src, h) {
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.01), hi = Math.max(lo + 1, pct(0.99)), dark = [26, 24, 22], light = [236, 228, 210];
  for (let i = 0; i < n; i++) { const v = clamp((L[i] - lo) / (hi - lo)); for (let j = 0; j < 3; j++) d.data[i * 4 + j] = dark[j] + (light[j] - dark[j]) * v; }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Ảnh / hiện vật dán thảm, cao h (phần ảnh): k vào (trượt lên + thẳng ra), viền ngà 12 px, băng dính, bóng;
 * label = { name, life, note } viết dưới (tên Cormorant nghiêng ngà, năm + ghi chú Plex Mono). Trả về { w, h }.
 */
export function portrait(g, key, x, y, h, k = 1, { rot = -0.025, label: lb = null } = {}) {
  const im = (PH[key + h] ??= warmPrint(IM[key], h)), w = im.width, b = 12;
  if (k <= 0) return { w, h };
  const e = outCubic(clamp(k)), dy = (1 - e) * 240;
  g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot * e); g.translate(-w / 2, -h / 2);
  g.save(); g.shadowColor = 'rgba(5,10,18,0.6)'; g.shadowBlur = 22; g.shadowOffsetX = 8; g.shadowOffsetY = 12;
  g.fillStyle = '#ECE4D2'; g.fillRect(-b, -b, w + 2 * b, h + 2 * b); g.restore();
  g.drawImage(im, 0, 0, w, h);
  g.save(); g.fillStyle = 'rgba(230,224,205,0.6)'; g.translate(w / 2, -b); g.rotate(-0.04); g.fillRect(-56, -14, 112, 28); g.restore();
  g.restore();
  if (lb) {
    const kl = clamp(k * 1.4 - 0.4);
    typed(g, lb.name, x, y + h + 56, kl * 1.5, `italic 600 42px ${CG}`, C.ink);
    if (lb.life) label(g, lb.life, x, y + h + 90, kl * 2 - 0.4, { size: 18 });
    if (lb.note) label(g, lb.note, x, y + h + 116, kl * 2 - 0.7, { size: 16 });
  }
  return { w, h };
}

// ── nạp ──
export async function loadKit(images) {
  if (num(-3) !== '−3' || par(-2) !== '(−2)') throw new Error('kit: num/par sai');
  MAT = matTex();
  await Promise.all(Object.entries(images).map(([k, u]) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => { IM[k] = toCanvas(im); res(); }; im.onerror = () => rej(new Error('kit: không nạp được ' + u)); im.src = u;
  })));
}

// ── tra mốc theo chữ: L(i) = câu i của timeline phần này; w(i, "từ", n) = lúc bắt đầu lần thứ n của từ trong câu ──
export function lookup(tl, tag) {
  const L = i => { const l = tl.lines[i]; if (!l) throw new Error(`${tag}: không có câu ${i}`); return l; };
  const w = (i, word, n = 1) => { let c = 0; for (const x of L(i).words) if (x.w === word && ++c === n) return x.start;
    throw new Error(`${tag}: không có "${word}" (${n}) ở câu ${i}: ${L(i).text}`); };
  return { L, w };
}
/** Màn chập (iris): k = 1 mở hết, 0 đen kín; khép/mở quanh (cx, cy). r0 = bán kính lúc k = 0 (0 = đen kín). */
export function iris(g, cx, cy, k, r0 = 0) {
  if (k >= 1) return;
  const r = r0 + (2300 - r0) * Math.pow(clamp(k), 1.6);
  g.save(); g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, Math.max(0, r), 0, PI * 2, true); g.fill('evenodd'); g.restore();
}
/** Kiểm toán trên hình: tính biểu thức (÷ × − ^ được), ném lỗi nếu khác giá trị chờ. Mọi số hiện lên hình đi qua đây. */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message})`); }
  const bad = typeof want === 'number' ? Math.abs(v - want) > 1e-9 : v !== want;
  if (bad) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
