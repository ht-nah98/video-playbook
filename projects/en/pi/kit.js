// Đồ nghề của bài học pi — DNA "Bàn dựng hình" (DNA.md; bàn thử tools/lab/drafting.html).
// Công cụ chung (nét tay, chữ viết vào, gạch/✗/khoanh/mũi tên, dấu, iris, lookup, must) giữ từ kit mẫu; phần ĐỒ NGHỀ
// BẢN VẼ (giấy can, chì/mực, compa, chốt, khung tên PLATE, ghi chú kỹ thuật, phân số chồng, nhân vật viền mực) là của bài.
// Mọi hàm vẽ nhận g, là hàm thuần của tham số (tất định); kết cấu, sprite, ảnh xử lý sinh MỘT lần lúc nạp hoặc cache.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js';
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
/** Tiến độ 0→1 của t trong [a, b]. b < a là lỗi im lặng (a0: w(4,'is') lấy nhầm chữ "is" đầu câu → ghi chú hiện sớm 4 s) → ném. */
export const prog = (t, a, b) => { if (b < a) throw new Error(`prog: b < a (${a} → ${b})`); return clamp((t - a) / (b - a)); };
export const PI = Math.PI;

// ── màu (DNA §2) ──
export const C = {
  paper: '#EFE8D6', grid: '143,184,204', lead: '#8A8E90', leadT: '#5B5F63', ink: '#1F2A36', blue: '#2348A6', red: '#B3342B',
};
export const CG = '"Cormorant Garamond"', MONO = '"IBM Plex Mono"', ARC = '"Archivo"';
// Một chất liệu cả bài (trang đọc ERA để chọn kiểu chuyển; portrait đọc bg/ink để in duotone).
export const ERA = { vellum: { bg: C.paper, ink: C.ink, accent: C.blue, dim: C.leadT } };

// 200 chữ số của π, tính bằng công thức Machin (số nguyên Python, 2026-10-07) — đầu chuỗi kiểm với Math.PI lúc nạp.
export const PI_DIGITS = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196';

// ── giấy can: xơ giấy + lưới in xanh nhạt (24 px, đậm mỗi 5 ô) + viền khổ giấy; to hơn khung 240 px để camera trôi ──
const PAD = 120;
let PAPER;
function paper() {
  const w = W + 2 * PAD, h = H + 2 * PAD, c = mk(w, h), x = c.getContext('2d'), d = x.createImageData(w, h), b = [0xEF, 0xE8, 0xD6];
  for (let i = 0; i < w * h; i++) {
    const px = i % w, py = (i / w) | 0, n = (hash(i * 0.517) - 0.5) * 7 + (hash(((px >> 3) * 31 + (py >> 1)) * 0.29) - 0.5) * 4;
    const r = Math.hypot((px - w / 2) / w, (py - h / 2) / h), v = 1 - 0.06 * r * r * 4;
    d.data[i * 4] = b[0] * v + n; d.data[i * 4 + 1] = b[1] * v + n; d.data[i * 4 + 2] = b[2] * v + n - 1; d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  for (let k = 0; k * 24 <= w; k++) { x.fillStyle = `rgba(${C.grid},${k % 5 ? 0.22 : 0.42})`; x.fillRect(k * 24, 0, k % 5 ? 1 : 1.5, h); }
  for (let k = 0; k * 24 <= h; k++) { x.fillStyle = `rgba(${C.grid},${k % 5 ? 0.22 : 0.42})`; x.fillRect(0, k * 24, w, k % 5 ? 1 : 1.5); }
  for (let k = 0; k < 8; k++) {                        // vết tẩy cũ: vệt sáng mờ, tất định
    const ex = 200 + hash(k * 3.1) * (w - 400), ey = 120 + hash(k * 7.7) * (h - 240), gr = x.createRadialGradient(ex, ey, 0, ex, ey, 90);
    gr.addColorStop(0, 'rgba(250,246,236,0.45)'); gr.addColorStop(1, 'rgba(250,246,236,0)'); x.fillStyle = gr; x.fillRect(ex - 90, ey - 90, 180, 180);
  }
  return c;
}
/** Nền giấy. (ox, oy) = vị trí camera trên tờ (bao xa cũng được): lưới trôi theo, viền khổ giấy đứng yên ở mép khung. */
export function ground(g, e = 'vellum', ox = 0, oy = 0) {
  const m = v => ((v % PAD) + PAD) % PAD;              // lưới 24 px đậm mỗi 5 ô → lặp đúng chu kỳ 120 px: trôi bao xa cũng liền
  g.drawImage(PAPER, -m(ox), -m(oy));
  g.save(); g.strokeStyle = C.ink; g.globalAlpha = 0.55; g.lineWidth = 2.5; g.strokeRect(36, 36, W - 72, H - 72);
  g.lineWidth = 1; g.strokeRect(46, 46, W - 92, H - 92); g.restore();
}
/** Camera trôi chậm trên tờ giấy (px), bắt đầu từ `from`: dùng g.translate(-x, -y) quanh phần vẽ, ground(g, e, x, y). */
export function drift(t, from, { vx = 9, vy = 3, max = 110 } = {}) {
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
/** Ghi chú kỹ thuật: Plex Mono VIẾT HOA, giãn 2 px, viết vào theo k. Màu mặc định chì chữ (4.75:1 — sàn). */
export function note(g, s, x, y, k = 1, { color = C.leadT, align = 'left', size = 22 } = {}) {
  typed(g, s.toUpperCase().replace(/Π/g, 'π'), x, y, k, `500 ${size}px ${MONO}`, color, { align, ls: 2 });   // π giữ chữ thường (Π là chữ khác)
}
/** Chữ Plex Mono GIỮ hoa/thường (biến a, b, c, n, công thức), giãn 2 px, viết vào theo k — `note` thì viết HOA hết. */
export function mono(g, s, x, y, k, color = C.ink, size = 22, align = 'left') {
  typed(g, s, x, y, k, `500 ${size}px ${MONO}`, color, { align, ls: 2 });
}
/** Phân số chồng: tử / gạch / mẫu, căn giữa tại x; trả về bề rộng. */
export function frac(g, num, den, x, y, size, color) {
  g.save(); g.font = `600 ${size}px ${CG}`; const w = Math.max(g.measureText(num).width, g.measureText(den).width) + size * 0.2; g.restore();
  text(g, num, x, y - size * 0.42, `600 ${size}px ${CG}`, color, 'center'); g.fillStyle = color;
  g.fillRect(x - w / 2, y - size * 0.3, w, Math.max(2, size * 0.05));
  text(g, den, x, y + size * 0.5, `600 ${size}px ${CG}`, color, 'center'); return w;
}

// ── nét: chì (dựng hình), mực (hình cuối), vẽ dần theo k ──
/** Đường gấp khúc thẳng (thước), vẽ dần theo k ∈ [0,1] theo độ dài. */
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
/** Đỉnh đa giác đều n cạnh (khép kín: n+1 điểm), a0 = góc đỉnh đầu (toán học, ngược chiều kim, y lên). */
export const poly = (cx, cy, r, n, a0 = PI / 2) => Array.from({ length: n + 1 }, (_, k) => [cx + r * Math.cos(a0 + 2 * PI * k / n), cy - r * Math.sin(a0 + 2 * PI * k / n)]);
/** Vòng tròn COMPA (vật xuyên suốt): quét hơn một vòng, bán kính nhích 2 px → thấy chỗ nét chồng. k = phần đã quét. */
export function compassCircle(g, cx, cy, R, { a0 = -0.55, k = 1, w = 4.5, color = C.blue } = {}) {
  if (k <= 0) return;
  const N = 400, sweep = (2 * PI + 0.16) * clamp(k);
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= N; i++) { const u = i / N, a = a0 + sweep * u, r = R + 2.2 * u * clamp(k); const p = [cx + r * Math.cos(a), cy - r * Math.sin(a)]; i ? g.lineTo(...p) : g.moveTo(...p); }
  g.stroke(); g.restore();
}
/** Lỗ chốt compa + chữ thập chì ở tâm. */
export function pivot(g, cx, cy, k = 1) {
  if (k <= 0) return;
  const s = 26 * clamp(k * 1.5);
  line(g, [[cx - s, cy], [cx + s, cy]], C.lead, 1.4); line(g, [[cx, cy - s], [cx, cy + s]], C.lead, 1.4);
  if (k < 0.5) return;
  g.save(); g.fillStyle = 'rgba(31,42,54,0.18)'; g.beginPath(); g.arc(cx, cy, 6.5, 0, 7); g.fill();
  g.fillStyle = C.ink; g.beginPath(); g.arc(cx, cy, 2.8, 0, 7); g.fill(); g.restore();
}
/** Cung tròn mực/xanh (toán học: góc ngược chiều kim, y lên), vẽ dần từ a0 tới a0 + (a1 − a0)·k. */
export function arc(g, cx, cy, R, a0, a1, color, w = 3, k = 1, { dash = [] } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'butt'; g.setLineDash(dash); g.beginPath();
  g.arc(cx, cy, R, -a0, -(a0 + (a1 - a0) * clamp(k)), a1 > a0); g.stroke(); g.restore();
}
export function arrowHead(g, x, y, ang, color, s = 14) {
  g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = color;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(-s, -s * 0.38); g.lineTo(-s * 0.8, 0); g.lineTo(-s, s * 0.38); g.closePath(); g.fill(); g.restore();
}
/** Đường dẫn ghi chú (chì): chấm ở vật → gấp khúc → chữ. */
export function leader(g, pts, k = 1, color = C.leadT) {
  if (k <= 0) return;
  line(g, pts, color, 1.2, { k }); g.save(); g.fillStyle = color; g.beginPath(); g.arc(pts[0][0], pts[0][1], 4, 0, 7); g.fill(); g.restore();
}
/** Hatch chì trong một vùng (path do hàm `shape(g)` vẽ), nghiêng 45°, bước `gap`. */
export function hatch(g, shape, color = 'rgba(91,95,99,0.55)', gap = 9) {
  g.save(); g.beginPath(); shape(g); g.clip(); g.strokeStyle = color; g.lineWidth = 1;
  for (let k = -W; k < W * 2; k += gap) { g.beginPath(); g.moveTo(k, -10); g.lineTo(k + H + 20, H + 10); g.stroke(); } g.restore();
}

// ── khung tên PLATE (góc phải trên, x 1404–1824, y 64–160) = biển tên mục; viết vào theo k. Chừa vùng này. ──
export function card(g, k, plate, name, sub = '') {
  if (k <= 0) return;
  const x = 1824, y = 64, w = 420, h = 96, kb = clamp(k * 2);
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.fillStyle = 'rgba(239,232,214,0.92)';
  const ww = w * outCubic(kb); g.fillRect(x - ww, y, ww, h); g.strokeRect(x - ww, y, ww, h);
  if (kb >= 1) { g.lineWidth = 1; g.beginPath(); g.moveTo(x - w + 120, y); g.lineTo(x - w + 120, y + h); g.moveTo(x - w + 120, y + 52); g.lineTo(x, y + 52); g.stroke(); }
  g.restore();
  const kt = k * 2 - 1;
  typed(g, 'PLATE', x - w + 60, y + 30, kt * 3, `600 18px ${ARC}`, C.leadT, { align: 'center', ls: 3 });
  typed(g, plate, x - w + 60, y + 80, kt * 3 - 0.3, `600 46px ${CG}`, C.ink, { align: 'center' });
  typed(g, name, x - w + 136, y + 38, kt * 1.6, `700 26px ${ARC}`, C.ink, { ls: 2 });
  if (sub) note(g, sub, x - w + 136, y + 82, kt * 1.6 - 0.5, { size: 18 });
}
/** Thẻ HỒI giữa khung trong khoảng lặng mở hồi: "PLATE II" + tên, viết vào từ start−2.3, trượt lên nhường khung tên. */
export function actTitle(g, t, start, plate, sub, answers = '') {
  const out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  g.save(); g.translate(0, -out * 700);
  typed(g, 'PLATE ' + plate, W / 2, 500, prog(t, start - 2.3, start - 1.8), `700 120px ${ARC}`, C.ink, { align: 'center', ls: 6 });
  typed(g, sub, W / 2, 600, prog(t, start - 1.8, start - 1.1), `italic 600 72px ${CG}`, C.blue, { align: 'center' });
  if (answers) note(g, answers, W / 2, 660, prog(t, start - 1.2, start - 0.7), { align: 'center' });
  g.restore();
}

// ── nét tay (bút đỏ chấm sai, khoanh, mũi tên cong) ──
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
/** Gạch ý sai — đỏ son (DNA: đỏ CHỈ cho cái sai). */
export function strike(g, x0, y0, x1, y1, k = 1, { color = C.red, w = 6, seed = 7 } = {}) { hand(g, seg(x0, y0, x1, y1, 14), { w, color, jit: 2, seed, k }); }
/** ✗ vẽ tay (KHÔNG font nào có ✗). */
export function cross(g, x, y, s, k = 1, { color = C.red, seed = 3, w = 6 } = {}) {
  strike(g, x - s, y - s, x + s, y + s, clamp(k * 2), { color, seed, w }); strike(g, x + s, y - s, x - s, y + s, clamp(k * 2 - 1), { color, seed: seed + 9, w });
}
/** ✓ vẽ tay. */
export function check(g, x, y, s, k = 1, { color = C.blue, w = 6, seed = 4 } = {}) {
  hand(g, [[x - s, y], [x - s * 0.35, y + s * 0.6], [x + s, y - s * 0.8]], { w, color, jit: 1.2, seed, k });
}
export function ring(g, x, y, rx, ry, k = 1, { color = C.blue, w = 4, seed = 5 } = {}) {
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
/** Chữ ĐÓNG DẤU (Q.E.D., IMPOSSIBLE · 1882): rơi từ to xuống đúng chỗ, hơi xoay, khung chữ nhật. */
export function stamp(g, s, x, y, k, font, color, { rot = -0.08, align = 'center' } = {}) {
  if (k <= 0) return;
  const e = clamp(k), sc = 1 + (1 - outCubic(e)) * 0.8;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.font = font; g.textAlign = align; g.textBaseline = 'middle';
  g.fillStyle = color; g.fillText(s, 0, 0);
  const m = g.measureText(s).width; g.strokeStyle = color; g.lineWidth = 4; g.strokeRect((align === 'center' ? -m / 2 : 0) - 16, -34, m + 32, 68);
  g.restore();
}

// ── nhân vật: hình cắt viền mực 3 px dán lên bản vẽ (DNA §5); vào = trồi lên + bật (0.35 s), không fade ──
// crop = phần trên của ảnh được giữ: toàn thân ≈ 0.45 (ngang hông), khung giữa đùi 1 (assets/character-v2/POSES.md).
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, spin: 0.45, startled: 1,
  three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, 'peace-back': 1, compass: 1 };
function sprite(pose, crop) {
  const im = IM['pose-' + pose], sh = Math.round(im.height * crop), p = 6, c = mk(im.width + 2 * p, sh + 2 * p), x = c.getContext('2d');
  const sil = mk(im.width, sh), sx = sil.getContext('2d'); sx.drawImage(im, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = C.ink; sx.fillRect(0, 0, im.width, sh);
  for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * PI; x.drawImage(sil, p + 3.2 * Math.cos(a), p + 3.2 * Math.sin(a)); }
  x.drawImage(im, 0, 0, im.width, sh, p, p, im.width, sh); return { c, p, sh };
}
/**
 * Nhân vật nửa thân, chân chạm `foot`, cao h (phần đã cắt). Trả về hàm P(ix, iy) đổi toạ độ ẢNH GỐC → khung
 * (để đặt vệt quay quanh đầu ngón, đầu compa…) — trả về CẢ khi k ≤ 0 (LESSONS §53: hàm phải cùng dạng khi ẩn).
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

// ── ảnh lịch sử: in kiểu bản khắc (lưới ngang) bằng mực trên giấy, viền mực, nhãn Plex Mono ──
const PH = {};
function engrave(src, h) {
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98)), hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), ink = hex(C.ink), bg = hex(C.paper);
  for (let i = 0; i < n; i++) {
    const v = clamp((L[i] - lo) / (hi - lo)), py = (i / w) | 0, on = (1 - v) * 1.08 > Math.abs(Math.sin(py * PI / 4)) ? 1 : 0;
    for (let j = 0; j < 3; j++) d.data[i * 4 + j] = bg[j] + (ink[j] - bg[j]) * on;
  }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Chân dung / hiện vật dán lên bản vẽ: k vào (trượt lên + thẳng ra), viền mực, bóng chì; label = { name, life, note }
 * — note PHẢI có "IMAGINED · NO LIKENESS SURVIVES" / "MODERN STATUE · NO LIKENESS SURVIVES" khi không phải chân dung thật.
 * Trả về { w, h }.
 */
export function portrait(g, key, x, y, h, k = 1, { rot = -0.02, label = null } = {}) {
  const im = (PH[key + h] ??= engrave(IM[key], h)), w = im.width;
  if (k <= 0) return { w, h };
  const e = outCubic(clamp(k)), dy = (1 - e) * 240;
  g.save(); g.translate(x, y + dy); g.rotate(rot * e);
  g.fillStyle = 'rgba(31,42,54,0.18)'; g.fillRect(10, 12, w + 16, h + 16);
  g.fillStyle = C.paper; g.fillRect(-8, -8, w + 16, h + 16); g.drawImage(im, 0, 0, w, h);
  g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(-8, -8, w + 16, h + 16); g.restore();
  if (label) {
    const kl = clamp(k * 1.4 - 0.4);
    typed(g, label.name, x, y + h + 56, kl * 1.5, `italic 600 44px ${CG}`, C.ink);
    if (label.life) note(g, label.life, x, y + h + 90, kl * 2 - 0.4, { size: 20 });
    if (label.note) note(g, label.note, x, y + h + 118, kl * 2 - 0.7, { size: 18 });
  }
  return { w, h };
}

// ── nạp ──
export async function loadKit(images) {
  if (PI_DIGITS.slice(0, 16) !== String(Math.PI).slice(0, 16)) throw new Error('kit: PI_DIGITS sai đầu chuỗi');
  PAPER = paper();
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
/** Camera lao vào một điểm bán kính r cho tới khi nó phủ kín khung ở k = 1. */
export function diveInto(g, cx, cy, r, k) {
  const need = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) / (r * 0.8), s = Math.pow(need, Math.pow(clamp(k), 1.6));
  g.translate(cx, cy); g.scale(s, s); g.translate(-cx, -cy);
}
/** Kiểm toán trên hình: tính biểu thức (÷ × − ^ được), ném lỗi nếu khác giá trị chờ. Mọi số hiện lên hình đi qua đây. */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message})`); }
  const bad = typeof want === 'number' ? Math.abs(v - want) > 1e-9 : v !== want;
  if (bad) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
/** Làm tròn hiển thị qua must: fix(biểu thức, số chữ số) → chuỗi; ném lỗi nếu biểu thức không tính được. */
export const fix = (expr, d) => { const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**'); return Function(`return (${js})`)().toFixed(d); };
