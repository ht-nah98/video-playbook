// Đồ nghề chung của math-30k ("The Long Line" — DNA.md). Plate không import plate; mọi thứ dùng chung ở đây.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu và ảnh xử lý sinh MỘT lần lúc nạp.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const prog = (t, a, b) => clamp((t - a) / (b - a));

// ── chất liệu theo thời đại (DNA §2) ──
export const ERA = {
  bone:   { bg: '#2B2019', ink: '#EADFC8', accent: '#C8713A', dim: '#9A8268', amp: 16 },
  sand:   { bg: '#D8C19A', ink: '#5B4026', accent: '#A4452C', dim: '#8A7254', amp: 14 },
  paper:  { bg: '#EEE5D1', ink: '#26242C', accent: '#9B2D24', dim: '#857A66', amp: 10 },
  chalk:  { bg: '#1F2B27', ink: '#ECEDE4', accent: '#F2C94C', dim: '#8FA39A', amp: 12 },
  papyrus:   { bg: '#D9C48E', ink: '#3B2A14', accent: '#8C2F1B', dim: '#6B5532', amp: 16 },
  parchment: { bg: '#E6D8B8', ink: '#2E2418', accent: '#9A2A1C', dim: '#6E5E44', amp: 12 },
  clay:   { bg: '#A9805A', ink: '#33231A', accent: '#6E2414', dim: '#4E3828', amp: 18 },
  screen: { bg: '#0E1013', ink: '#E6E2D6', accent: '#F2C94C', dim: '#7D8590', amp: 6 },
};
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
  x.putImageData(d, 0, 0); return c;
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

// ── thẻ mốc: hồi · năm · tên trạm, viết vào theo k; thước thời gian bên dưới ──
const STOPS = [-30000, -3000, -1700, -300, 628, 820, 1202, 1545, 1585, 1637, 1670, 1806, 1829, 1854, 1874, 1901, 1931, 1936];
const TL = { x0: 112, w: 660, y0: 300 };
const tx = y => { const a = Math.log(2030 + 30000), b = Math.log(2030 - 1936), v = Math.log(2030 - y); return TL.x0 + (a - v) / (a - b) * TL.w; };
export function card(g, e, k, act, year, title) {
  const E = ERA[e];
  typed(g, act, 110, 108, k * 3, '500 20px "IBM Plex Mono"', E.accent);
  g.save(); g.font = '800 92px "Archivo"'; g.fontStretch = 'condensed'; g.fillStyle = E.ink;
  const n = Math.round(year.length * clamp(k * 2.2 - 0.3)); if (n) g.fillText(year.slice(0, n), 104, 196); g.restore();
  typed(g, title, 110, 250, k * 1.6 - 0.6, 'italic 500 46px "Cormorant Garamond"', E.ink);
}
export function ruler(g, e, year, k = 1) {
  if (k <= 0) return;
  const E = ERA[e], y0 = TL.y0, len = TL.w * outCubic(k);
  g.save(); g.strokeStyle = E.dim; g.lineWidth = 2; g.beginPath(); g.moveTo(TL.x0 - 4, y0); g.lineTo(TL.x0 - 4 + len, y0); g.stroke();
  STOPS.forEach((s, i) => { const x = tx(s); if (x > TL.x0 + len) return; g.lineWidth = s <= year ? 3 : 2; g.strokeStyle = s <= year ? E.ink : E.dim;
    g.beginPath(); g.moveTo(x + (hash(i) - .5) * 3, y0 - 14); g.lineTo(x, y0 + 4); g.stroke(); });
  if (k >= 1) {
    const x = tx(year); g.fillStyle = E.accent; g.beginPath(); g.moveTo(x, y0 - 18); g.lineTo(x - 8, y0 - 32); g.lineTo(x + 8, y0 - 32); g.fill();
    g.font = '500 15px "IBM Plex Mono"'; g.fillStyle = E.dim; g.textAlign = 'left'; g.fillText('30,000 YEARS AGO', TL.x0 - 4, y0 + 26);
    g.textAlign = 'right'; g.fillText('TODAY', TL.x0 + TL.w + 8, y0 + 26);
  }
  g.restore();
}

// ── nhân vật: ảnh đặc + bóng lệch màu nhấn; vào = trồi lên + bật (0.35 s), không fade ──
const IM = {}, FIG = {};
export function figure(g, pose, cx, foot, h, e, k = 1, { flip = false } = {}) {
  if (k <= 0) return;
  const im = IM['pose-' + pose], s = h / im.height, w = im.width * s, E = ERA[e];
  const sh = (FIG[pose + e] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = E.accent; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.drawImage(sh, -w / 2 + 12, -h + 10, w, h); g.drawImage(im, -w / 2, -h, w, h); g.restore();
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
