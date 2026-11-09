// Đồ nghề chung của zero-div ("The Hole in the Page" — DNA.md). Gốc: projects/en/math-30k/kit.js.
// Mới: trang giấy kẻ ô (ERA.page), lỗ thủng (hole), bút đỏ chấm bài (strike, cross, ring), mũi tên tay (arrow),
// mascot nửa thân (figure … { crop }), tiêu đề mục (card). Bỏ: thước thời gian (bài này không phải dòng thời gian).
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu và ảnh xử lý sinh MỘT lần lúc nạp.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js'; // sfx() { return typeCues(chữ, a, b) } — khớp typed(…, prog(t, a, b))
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const prog = (t, a, b) => clamp((t - a) / (b - a));

// ── chất liệu theo thời đại (DNA §2) ──
export const ERA = {
  page:  { bg: '#F2EEE3', ink: '#1C2640', accent: '#C8382A', dim: '#7C869B', amp: 9, grid: '#C9D6E3', margin: '#E3A79F' },
  void:  { bg: '#0A0A0D', ink: '#E6E2D6', accent: '#F2C94C', dim: '#7D8590', amp: 5 },
  clay:  { bg: '#A9805A', ink: '#33231A', accent: '#6E2414', dim: '#4E3828', amp: 18 },   // chỉ cho hiện vật dán (wedge)
};
export const GRID = 48;                                   // ô giấy; lưới đặt ở x = 24 + 48n, y = 12 + 48n
const TEX = {};
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const h = (a, b) => hash(a * 12.9898 + b * 78.233);
  return (h(xi, yi) * (1 - sx) + h(xi + 1, yi) * sx) * (1 - sy) + (h(xi, yi + 1) * (1 - sx) + h(xi + 1, yi + 1) * sx) * sy;
}
function texture(e) {
  const c = mk(W / 2, H / 2), x = c.getContext('2d'), d = x.createImageData(c.width, c.height);
  const b = [1, 3, 5].map(i => parseInt(e.bg.slice(i, i + 2), 16));
  for (let i = 0; i < c.width * c.height; i++) {
    const px = i % c.width, py = (i / c.width) | 0;
    const n = (hash(i * 0.731) - 0.5) * e.amp + (vnoise(px / 70, py / 70) - 0.5) * e.amp * 0.9 + (vnoise(px / 9 + 50, py / 9) - 0.5) * e.amp * 0.4;
    for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] + n;
    d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  if (e.grid) {                                            // lưới kẻ ô + lề đỏ (vẽ ở nửa độ phân giải, ground phóng ×2)
    x.strokeStyle = e.grid; x.lineWidth = 0.7;
    for (let i = 12; i < c.width; i += GRID / 2) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, c.height); x.stroke(); }
    for (let j = 6; j < c.height; j += GRID / 2) { x.beginPath(); x.moveTo(0, j); x.lineTo(c.width, j); x.stroke(); }
    x.strokeStyle = e.margin; x.lineWidth = 1.25; x.beginPath(); x.moveTo(84, 0); x.lineTo(84, c.height); x.stroke();
  }
  return c;
}
export function ground(g, e) { g.drawImage(TEX[e], 0, 0, W, H); }

// ── nét tay: đường gấp khúc rung nhẹ, vẽ dần theo k ∈ [0,1] ──
export const seg = (x0, y0, x1, y1, n = 24) => Array.from({ length: n + 1 }, (_, i) => [x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n]);
export function hand(g, pts, { w = 4, color, jit = 1.5, seed = 1, k = 1 } = {}) {
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

// ── chữ VIẾT vào (lộ dần theo ký tự, không fade — DNA §9) ──
export function typed(g, s, x, y, k, font, color, { align = 'left' } = {}) {
  const n = Math.round(s.length * clamp(k)); if (!n) return;
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.fillText(s.slice(0, n), x, y); g.restore();
}

// ── tiêu đề mục (góc trái trên, trong lề): HỒI · tên mục, viết vào theo k ──
export function card(g, e, k, act, title) {
  const E = ERA[e];
  typed(g, act, 200, 100, k * 3, '500 20px "IBM Plex Mono"', E.accent);
  typed(g, title, 198, 152, k * 1.6 - 0.4, 'italic 600 44px "Cormorant Garamond"', E.ink);
}

// ── bút đỏ chấm bài: gạch, dấu ✗ (font không có ✗ — vẽ tay), khoanh tròn; k vẽ dần ──
export function strike(g, x0, y0, x1, y1, k = 1, { color = ERA.page.accent, w = 6, seed = 7 } = {}) {
  hand(g, seg(x0, y0, x1, y1, 14), { w, color, jit: 2, seed, k });
}
export function cross(g, x, y, s, k = 1, { color = ERA.page.accent, seed = 3 } = {}) {
  strike(g, x - s, y - s, x + s, y + s, clamp(k * 2), { color, seed });
  strike(g, x + s, y - s, x - s, y + s, clamp(k * 2 - 1), { color, seed: seed + 9 });
}
export function ring(g, x, y, rx, ry, k = 1, { color = ERA.page.accent, w = 5, seed = 5 } = {}) {
  const P = Array.from({ length: 49 }, (_, i) => { const a = -2.2 + i / 48 * Math.PI * 2.15; return [x + Math.cos(a) * rx * (1 + (hash(i + seed) - .5) * .05), y + Math.sin(a) * ry]; });
  hand(g, P, { w, color, jit: 1.5, seed, k });
}
/** Mũi tên nét tay từ (x0,y0) tới (x1,y1), cong theo bend (px, + = trái). */
export function arrow(g, x0, y0, x1, y1, k = 1, { color = ERA.page.ink, w = 4, bend = 0, seed = 11 } = {}) {
  if (k <= 0) return;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  const P = Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
    return [a * x0 + b * (mx + nx * bend) + c * x1, a * y0 + b * (my + ny * bend) + c * y1]; });
  hand(g, P, { w, color, seed, k });
  if (k >= 1) { const [px, py] = P[22], an = Math.atan2(y1 - py, x1 - px);
    hand(g, [[x1 - 22 * Math.cos(an - 0.45), y1 - 22 * Math.sin(an - 0.45)], [x1, y1], [x1 - 22 * Math.cos(an + 0.45), y1 - 22 * Math.sin(an + 0.45)]], { w, color, seed: seed + 1 }); }
}

// ── LỖ THỦNG (DNA §1): mép giấy răng cưa, thành vết cắt, bóng đổ vào trong; inside() vẽ trong lỗ (toạ độ gốc = tâm) ──
const rim = (r, s) => Array.from({ length: 72 }, (_, i) => { const a = i / 72 * Math.PI * 2, q = r * (1 + (hash(i * 7.3 + s) - 0.5) * 0.07); return [Math.cos(a) * q, Math.sin(a) * q]; });
export function hole(g, cx, cy, r, inside = null, { seed = 3 } = {}) {
  if (r <= 0.5) return;
  const P = rim(r, seed), path = () => { g.beginPath(); P.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); };
  g.save(); g.translate(cx, cy);
  path(); g.save(); g.clip(); g.fillStyle = ERA.void.bg; g.fillRect(-r * 1.2, -r * 1.2, r * 2.4, r * 2.4);
  if (inside) inside(r);
  const sh = g.createRadialGradient(r * 0.25, r * 0.3, r * 0.55, 0, 0, r * 1.05);
  sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.75)'); g.fillStyle = sh; g.fillRect(-r * 1.2, -r * 1.2, r * 2.4, r * 2.4);
  const th = Math.max(5, r * 0.09);
  g.translate(-th * 0.7, -th * 0.9); path(); g.lineWidth = th * 1.6; g.strokeStyle = '#D8CFBA'; g.stroke();
  g.restore();
  path(); g.lineWidth = Math.max(3, r * 0.05); g.strokeStyle = '#FFFDF6'; g.stroke();
  g.lineWidth = 1.5; g.strokeStyle = 'rgba(28,38,64,.35)'; g.stroke();
  g.restore();
}
/** Camera lao vào lỗ: phóng quanh (cx, cy) sao cho lỗ bán kính r phủ kín khung khi k = 1. Gọi trước khi vẽ, restore sau. */
export function diveInto(g, cx, cy, r, k) {
  const need = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) / (r * 0.8);
  const s = Math.pow(need, Math.pow(clamp(k), 1.6));
  g.translate(cx, cy); g.scale(s, s); g.translate(-cx, -cy);
}

// ── nhân vật: ảnh đặc + bóng lệch màu nhấn; vào = trồi lên + bật (0.35 s), không fade ──
const IM = {}, FIG = {};
/**
 * Mascot NỬA THÂN (DNA §5): h = chiều cao HIỂN THỊ, foot = mép dưới (thường H). crop = phần trên của ảnh được giữ:
 * ảnh toàn thân (idle, ok, shrug, point…) crop ≈ 0.45; ảnh khung giữa đùi (ponder, halt, twoways, peace-back) crop = 1.
 * Bóng lệch đỏ nhạt. k: vào = trồi lên + bật.
 */
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, ponder: 1, halt: 1, twoways: 1, 'peace-back': 1 };
export function figure(g, pose, cx, foot, h, e, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return;
  const im = IM['pose-' + pose], sh0 = im.height * crop, s = h / sh0, w = im.width * s, E = ERA[e];
  const sh = (FIG[pose + e] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = E.accent; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.globalAlpha = 0.28; g.drawImage(sh, 0, 0, im.width, sh0, -w / 2 + 14, -h + 10, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, -w / 2, -h, w, h); g.restore();
}

// ── ảnh lịch sử theo chất liệu (DNA §8): duotone ở CỠ HIỂN THỊ, kéo giãn p2–p98; screen = lưới khắc ngang ──
const PH = {};
function duotone(src, e, h, screen) {
  const E = ERA[e], w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98));
  const hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), ink = hex(E.ink), bg = hex(E.bg);
  const darkGround = bg[0] + bg[1] + bg[2] < ink[0] + ink[1] + ink[2];
  for (let i = 0; i < n; i++) {
    let v = clamp((L[i] - lo) / (hi - lo));
    if (screen) { const py = (i / w) | 0; v = (1 - v) * 1.08 > Math.abs(Math.sin(py * Math.PI / 5)) ? 0 : 1; }
    const k = darkGround ? v : 1 - v;
    for (let j = 0; j < 3; j++) d.data[i * 4 + j] = bg[j] + (ink[j] - bg[j]) * k;
  }
  x.putImageData(d, 0, 0); return c;
}
/** Ảnh in lên khung: k vào (trượt từ dưới + bật), viền mực; trả về {w, h} để đặt nhãn. */
export function photo(g, key, e, x, y, h, k = 1, { screen = false, rot = 0 } = {}) {
  const im = (PH[key + e + h + screen] ??= duotone(IM[key], e, h, screen)), w = im.width;
  if (k <= 0) return { w, h };
  const E = ERA[e], dy = (1 - outCubic(clamp(k))) * 260;
  g.save(); g.translate(x, y + dy); g.rotate(rot * outCubic(clamp(k)));
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(12, 14, w + 20, h + 20);
  g.fillStyle = E.ink; g.fillRect(-10, -10, w + 20, h + 20); g.drawImage(im, 0, 0, w, h); g.restore();
  return { w, h };
}

// ── nạp: kết cấu + ảnh (toCanvas: canvas CPU, tất định — LESSONS §16) ──
export async function loadKit(images) {
  for (const e of Object.keys(ERA)) TEX[e] = texture(ERA[e]);
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
/** Màn chập (iris): k = 1 mở hết, 0 đen kín; khép/mở quanh (cx, cy). Chuyển cảnh sang intro — không phải chữ fade. */
export function iris(g, cx, cy, k) {
  if (k >= 1) return;
  const r = 2300 * Math.pow(clamp(k), 1.6);
  g.save(); g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2, true); g.fill('evenodd'); g.restore();
}
/** Chữ ĐÓNG DẤU: rơi từ to xuống đúng chỗ, hơi xoay; màu mực của dấu. */
export function stamp(g, s, x, y, k, font, color, { rot = -0.08, align = 'center' } = {}) {
  if (k <= 0) return;
  const e = clamp(k), sc = 1 + (1 - outCubic(e)) * 0.8;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.font = font; g.textAlign = align; g.textBaseline = 'middle';
  g.fillStyle = color; g.fillText(s, 0, 0);
  const m = g.measureText(s).width; g.strokeStyle = color; g.lineWidth = 4; g.strokeRect((align === 'center' ? -m / 2 : 0) - 16, -34, m + 32, 68);
  g.restore();
}
/** Dấu nêm (chữ hình nêm): 'v' nêm đứng (1; lớn = 60), 'c' nêm góc (10). k ∈ [0,1] ấn vào. */
export function wedge(g, kind, x, y, s, k, e = 'clay') {
  if (k <= 0) return;
  const E = ERA[e], p = outBack(clamp(k)), sc = s * p;
  g.save(); g.translate(x, y); g.scale(sc, sc);
  g.fillStyle = E.ink;
  if (kind === 'v') { g.beginPath(); g.moveTo(-22, -40); g.lineTo(22, -40); g.lineTo(0, -6); g.fill(); g.fillRect(-3, -10, 6, 70);
    g.fillStyle = 'rgba(255,235,205,0.35)'; g.beginPath(); g.moveTo(-22, -40); g.lineTo(0, -40); g.lineTo(0, -6); g.fill(); }
  else { g.beginPath(); g.moveTo(-34, 0); g.lineTo(6, -24); g.lineTo(6, 24); g.fill(); g.fillRect(2, -3, 40, 6);
    g.fillStyle = 'rgba(255,235,205,0.35)'; g.beginPath(); g.moveTo(-34, 0); g.lineTo(6, -24); g.lineTo(6, 0); g.fill(); }
  g.restore();
}

/** Thẻ HỒI giữa khung trong khoảng lặng mở hồi: viết vào từ start−2.3, trượt lên nhường thẻ mốc quanh start. */
export function actTitle(g, e, t, start, act, sub) {
  const E = ERA[e], out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  g.save(); g.translate(0, -out * 700);
  typed(g, act, W / 2, 500, prog(t, start - 2.3, start - 1.8), '800 150px "Archivo"', E.ink, { align: 'center' });
  typed(g, sub, W / 2, 600, prog(t, start - 1.8, start - 1.1), 'italic 500 72px "Cormorant Garamond"', E.accent, { align: 'center' });
  g.restore();
}
/**
 * Chân dung / hiện vật với thẻ tên (DNA §8). style: 'engrave' (giấy in: lưới khắc), 'pin' (bảng đen: ảnh đơn sắc
 * ghim băng dính), 'print' (mặc định: duotone theo chất liệu). label = { name, life, note } — note PHẢI có
 * "IMAGINED · NO LIKENESS SURVIVES" với chân dung tưởng tượng. Trả về { w, h }.
 */
export function portrait(g, key, e, x, y, h, k = 1, { style = 'print', rot = 0, label = null, lift = 1 } = {}) {
  const E = ERA[e];
  let w;
  if (style === 'pin') {
    const im = IM[key]; w = im.width * h / im.height;
    if (k > 0) { const dy = (1 - outCubic(clamp(k))) * 300;
      g.save(); g.translate(x, y + dy); g.rotate(rot);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(10, 12, w + 24, h + 24); g.fillStyle = '#E9E4D6'; g.fillRect(-12, -12, w + 24, h + 24);
      g.filter = `grayscale(1) brightness(${lift}) contrast(1.05)`; g.drawImage(im, 0, 0, w, h); g.filter = 'none';
      g.fillStyle = 'rgba(242,201,76,0.85)'; g.save(); g.translate(w / 2, -14); g.rotate(-0.06); g.fillRect(-46, -12, 92, 26); g.restore();
      g.restore(); }
  } else {
    w = photo(g, key, e, x, y, h, k, { screen: style === 'engrave', rot }).w;
  }
  if (label && k > 0) {
    const kl = clamp(k * 1.4 - 0.4);
    typed(g, label.name, x, y + h + 60, kl * 1.5, 'italic 600 44px "Cormorant Garamond"', E.ink);
    if (label.life) typed(g, label.life, x, y + h + 92, kl * 2 - 0.4, '500 20px "IBM Plex Mono"', E.dim);
    if (label.note) typed(g, label.note, x, y + h + 120, kl * 2 - 0.7, '500 18px "IBM Plex Mono"', E.dim);
  }
  return { w, h };
}

/**
 * Camera đẩy vào đúng chỗ đang đọc (bản 2, 2026-10-22 — PACKAGING §6: đổi hình bằng camera, không thêm chữ; cùng ý
 * `lens()` của sudoku). keys = [[t, cx, cy, z], …] tăng theo t; nội suy smooth giữa hai khoá; tâm bị kẹp để khung
 * không lộ mép trang. Gọi sau g.save(), vẽ cảnh, rồi g.restore(). z = 1 ở FROM và cuối cảnh → chuyển trang khớp.
 */
export function lens(g, keys, t) {
  let c = keys[0];
  if (t >= keys.at(-1)[0]) c = keys.at(-1);
  else for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) {
    const a = keys[i - 1], b = keys[i], k = smooth(clamp((t - a[0]) / (b[0] - a[0])));
    c = [t, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k]; break;
  }
  const z = Math.max(1, c[3]), hx = W / (2 * z), hy = H / (2 * z);
  const cx = Math.min(W - hx, Math.max(hx, c[1])), cy = Math.min(H - hy, Math.max(hy, c[2]));
  g.translate(W / 2, H / 2); g.scale(z, z); g.translate(-cx, -cy);
}
