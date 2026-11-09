// Đồ nghề chung của bài học pemdas — CHÉP từ projects/en/math-30k/kit.js (bài học đầu tiên).
// Công cụ (nét tay, chữ viết vào, dấu, thẻ mốc, chân dung, iris, lookup, bút đỏ, mũi tên, mascot nửa thân, lao vào…) dùng lại được
// (bút đỏ / mũi tên / nửa thân / diveInto: từ zero-div). ERA, ROAD và đồ nghề ĐƯỜNG cuối file là DNA của pemdas
// ("Rules of the Road", projects/en/pemdas/DNA.md) — mẫu dùng: plates/a0-open.js.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu và ảnh xử lý sinh MỘT lần lúc nạp.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js'; // sfx() { return typeCues(chữ, a, b) } — gõ khớp typed()
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const prog = (t, a, b) => clamp((t - a) / (b - a));

// ── chất liệu (DNA §2): road = cỏ ven đường + mặt nhựa; screen = màn hình máy dẫn đường / bảng tính / terminal ──
export const ERA = {
  road:   { bg: '#3E4A34', ink: '#EDEBE3', accent: '#E9BE4E', dim: '#A9B09C', shadow: '#151A12', amp: 24 },
  screen: { bg: '#0E1013', ink: '#E6E2D6', accent: '#E9BE4E', dim: '#7D8590', shadow: '#000000', amp: 6 },
};
// màu đường + biển theo CẤP (DNA §2): × ÷ cùng biển tròn xanh, + − cùng biển thoi cam, ^ tam giác tím, ( ) vuông than
export const ROAD = { asphalt: '#34373C', edge: '#E9E7DF', yellow: '#F2C230', paint: '#EDEBE3', gold: '#E9BE4E', red: '#D2402F',
  P: '#26262B', E: '#7A4FB0', MD: '#2160B0', AS: '#E07F22', ink: '#1F2228' };
export const LEVEL = { '(': 'P', ')': 'P', '^': 'E', '×': 'MD', '÷': 'MD', '+': 'AS', '−': 'AS' };
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

// ── biển tên mục (thay thẻ mốc của math-30k): bảng chỉ đường tối viền trắng, góc trái trên; act = hồi, title = mục ──
export function card(g, e, k, act, title) {
  if (k <= 0) return;
  const E = ERA[e], p = outBack(clamp(k * 1.6)), x = 96, y = 64;
  g.save(); g.font = '800 46px "Archivo"'; const w = Math.max(g.measureText(title).width, 300) + 64;
  g.translate(x, y); g.scale(1, p); g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 18; g.shadowOffsetY = 10;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(0, 0, w, 132, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(8, 8, w - 16, 116, 9); g.stroke(); g.restore();
  typed(g, act, x + 32, y + 46, k * 2.2 - 0.3, '500 20px "IBM Plex Mono"', E.accent);
  typed(g, title, x + 32, y + 104, k * 1.6 - 0.5, '800 46px "Archivo"', ROAD.edge);
}

// ── nhân vật NỬA THÂN: ảnh đặc + bóng lệch màu nhấn; vào = trồi lên + bật (0.35 s), không fade ──
// crop = phần trên của ảnh được giữ. Kho mascot có hai khung (assets/character-v2/POSES.md): toàn thân → crop ≈ 0.45
// (ngang hông), khung giữa đùi → 1. Đặt cạnh nhau thì cỡ đầu khớp (đo ở zero-div). Tư thế mới: thêm vào CROP.
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, 'peace-back': 1 };
export function figure(g, pose, cx, foot, h, e, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return;
  const im = IM['pose-' + pose], sh0 = im.height * crop, s = h / sh0, w = im.width * s, E = ERA[e];
  const sh = (FIG[pose + e] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = E.shadow ?? E.accent; x.globalAlpha = 0.55; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.drawImage(sh, 0, 0, im.width, sh0, -w / 2 + 12, -h + 10, w, h); g.drawImage(im, 0, 0, im.width, sh0, -w / 2, -h, w, h); g.restore();
}

// ── bút chấm bài (zero-div): gạch, ✗ (KHÔNG font nào có ✗ — vẽ tay), khoanh, mũi tên cong; k vẽ dần ──
export function strike(g, x0, y0, x1, y1, k = 1, { color, w = 6, seed = 7 } = {}) { hand(g, seg(x0, y0, x1, y1, 14), { w, color, jit: 2, seed, k }); }
export function cross(g, x, y, s, k = 1, { color, seed = 3 } = {}) {
  strike(g, x - s, y - s, x + s, y + s, clamp(k * 2), { color, seed }); strike(g, x + s, y - s, x - s, y + s, clamp(k * 2 - 1), { color, seed: seed + 9 });
}
export function ring(g, x, y, rx, ry, k = 1, { color, w = 5, seed = 5 } = {}) {
  const P = Array.from({ length: 49 }, (_, i) => { const a = -2.2 + i / 48 * Math.PI * 2.15; return [x + Math.cos(a) * rx * (1 + (hash(i + seed) - .5) * .05), y + Math.sin(a) * ry]; });
  hand(g, P, { w, color, jit: 1.5, seed, k });
}
export function arrow(g, x0, y0, x1, y1, k = 1, { color, w = 4, bend = 0, seed = 11 } = {}) {
  if (k <= 0) return;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  const P = Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
    return [a * x0 + b * (mx + nx * bend) + c * x1, a * y0 + b * (my + ny * bend) + c * y1]; });
  hand(g, P, { w, color, seed, k });
  if (k >= 1) { const [px, py] = P[22], an = Math.atan2(y1 - py, x1 - px);
    hand(g, [[x1 - 22 * Math.cos(an - 0.45), y1 - 22 * Math.sin(an - 0.45)], [x1, y1], [x1 - 22 * Math.cos(an + 0.45), y1 - 22 * Math.sin(an + 0.45)]], { w, color, seed: seed + 1 }); }
}
/** Camera lao vào một điểm (lỗ, vạch…) bán kính r cho tới khi nó phủ kín khung ở k = 1 — lối RA sang intro/cảnh khác. */
export function diveInto(g, cx, cy, r, k) {
  const need = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) / (r * 0.8);
  const s = Math.pow(need, Math.pow(clamp(k), 1.6));
  g.translate(cx, cy); g.scale(s, s); g.translate(-cx, -cy);
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

// ══ ĐỒ NGHỀ ĐƯỜNG (DNA pemdas) — nhìn từ trên xuống; mọi thứ vẽ trong toạ độ THẾ GIỚI, cảnh tự dịch camera ══
// Kết cấu cỏ/nhựa là PATTERN (sinh một lần) → camera trượt thì hạt trôi theo, không nhoè, không vẽ lại ảnh lớn.
const PAT = {};
function grain(hex, amp, seed, n = 512) {
  const c = mk(n, n), x = c.getContext('2d'), d = x.createImageData(n, n), b = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  for (let i = 0; i < n * n; i++) { const v = (hash(i * 0.613 + seed) - 0.5) * amp; for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] + v; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return c;
}
const pat = (g, key) => (PAT[key] ??= g.createPattern(key === 'verge' ? grain(ERA.road.bg, 26, 1) : grain(ROAD.asphalt, 22, 2), 'repeat'));
/** Nền cỏ phủ cả khung (gọi TRƯỚC khi dịch camera là đủ: pattern bám toạ độ hiện hành). */
export function verge(g) { g.save(); g.fillStyle = pat(g, 'verge'); g.fillRect(-4000, -4000, 12000, 9000); g.restore(); }
/** Mặt đường theo các đường dẫn path(g) (moveTo/lineTo/bezierCurveTo…): vạch biên trắng + nhựa; w = bề rộng.
 *  Truyền MẢNG mọi đoạn nối nhau (ngã ba…): vẽ hết vạch biên rồi mới phủ nhựa, chỗ nối không lồi vạch. */
export function road(g, paths, { w = 300 } = {}) {
  const P = Array.isArray(paths) ? paths : [paths];
  g.save(); g.lineCap = g.lineJoin = 'round';
  g.strokeStyle = ROAD.edge; g.lineWidth = w; for (const p of P) { g.beginPath(); p(g); g.stroke(); }
  g.strokeStyle = pat(g, 'asphalt'); g.lineWidth = w - 16; for (const p of P) { g.beginPath(); p(g); g.stroke(); }
  g.restore();
}
/** Vạch giữa đứt màu vàng theo path; muốn hiện dần thì cảnh tự clip. */
export function centerLine(g, path) {
  g.save(); g.strokeStyle = ROAD.yellow; g.lineWidth = 6; g.setLineDash([46, 40]); g.beginPath(); path(g); g.stroke(); g.restore();
}
/** Chữ SƠN trên mặt đường (giữa (x, y)); k lộ dần theo ký tự (sơn vào), vạch giữa nhường chỗ. Trả về bề rộng. */
export function paint(g, s, x, y, size, { k = 1, color = ROAD.paint, gap = true, rot = 0 } = {}) {
  g.save(); g.translate(x, y); g.rotate(rot); g.font = `800 ${size}px "Archivo"`; const w = g.measureText(s).width;
  const n = Math.round(s.length * clamp(k));
  if (gap && n) { g.fillStyle = pat(g, 'asphalt'); g.fillRect(-w / 2 - 14, -9, w + 28, 18); }   // chưa sơn thì vạch giữa còn nguyên
  if (n) { g.fillStyle = color; g.globalAlpha = 0.93; g.textAlign = 'left'; g.textBaseline = 'middle';
    g.fillText(s.slice(0, n), -w / 2, size * 0.04); }
  g.restore(); return w;
}
/** Hàng chữ sơn cách đều: tokens → [{s, x}] (tâm từng token) — để xe chạy qua đúng chỗ. */
export function paintRow(g, tokens, x, y, size, { k = 1, color, gap = 0.34 } = {}) {
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = tokens.map(s => g.measureText(s).width); g.restore();
  const out = []; let cx = x, n = tokens.length;
  tokens.forEach((s, i) => { const c = cx + ws[i] / 2; out.push({ s, x: c });
    paint(g, s, c, y, size, { k: clamp(k * n - i), color: typeof color === 'function' ? color(s, i) : color }); cx += ws[i] + size * gap; });
  return out;
}
/** Biển báo theo CẤP (LEVEL): tròn (×÷), thoi (+−), tam giác (^), vuông than (( ) ); kind null = biển trắng chữ đen.
 *  k bật vào (outBack). r = bán kính. */
export function sign(g, kind, s, x, y, r, k = 1) {
  if (k <= 0) return;
  const p = outBack(clamp(k)); g.save(); g.translate(x, y); g.scale(p, p);
  const shape = (q) => { g.beginPath();
    if (kind === 'MD') g.arc(0, 0, q, 0, 7);
    else if (kind === 'AS') { const d = q * 1.15; g.moveTo(0, -d); g.lineTo(d, 0); g.lineTo(0, d); g.lineTo(-d, 0); g.closePath(); }
    else if (kind === 'E') { const d = q * 1.25; g.moveTo(0, -d); g.lineTo(d * 1.05, d * 0.7); g.lineTo(-d * 1.05, d * 0.7); g.closePath(); }
    else g.roundRect(-q, -q, q * 2, q * 2, q * 0.25); };
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18; g.shadowOffsetY = 10; g.fillStyle = '#ECECEC'; shape(r); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = kind ? ROAD[kind] : '#FFFFFF'; shape(r * (kind === 'E' ? 0.8 : 0.85)); g.fill();
  g.fillStyle = kind ? '#FFFFFF' : ROAD.ink; g.font = `800 ${Math.round(r * (kind === 'E' ? 0.8 : 1.05))}px "Archivo"`;
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, kind === 'E' ? r * 0.3 : r * 0.06); g.restore();
}
/** Xe nhìn từ trên (người ĐỌC biểu thức): tâm (x, y), hướng rot (0 = sang phải); đèn pha khi light > 0. */
export function car(g, x, y, rot = 0, { color = ROAD.gold, light = 0, s = 1 } = {}) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  if (light > 0) { const gr = g.createRadialGradient(80, 0, 10, 260, 0, 260); gr.addColorStop(0, `rgba(255,240,190,${0.55 * light})`); gr.addColorStop(1, 'rgba(255,240,190,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(66, -30); g.lineTo(520, -200); g.lineTo(520, 200); g.lineTo(66, 30); g.fill(); }
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 16; g.shadowOffsetY = 8;
  g.fillStyle = color; g.beginPath(); g.roundRect(-70, -38, 140, 76, 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = '#2A2C30'; g.beginPath(); g.roundRect(10, -30, 34, 60, 8); g.fill(); g.beginPath(); g.roundRect(-52, -28, 24, 56, 6); g.fill(); g.restore();
}
/** Rào chắn sọc đỏ-trắng từ (x0,y0) tới (x1,y1): lối SAI bị chặn (DNA §2 — đỏ chỉ cho cái sai). k dựng dần. */
export function barrier(g, x0, y0, x1, y1, k = 1) {
  if (k <= 0) return;
  const L = Math.hypot(x1 - x0, y1 - y0) * outCubic(clamp(k)), a = Math.atan2(y1 - y0, x1 - x0);
  g.save(); g.translate(x0, y0); g.rotate(a); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 12; g.shadowOffsetY = 8;
  g.fillStyle = '#F4F1EA'; g.fillRect(0, -16, L, 32); g.shadowColor = 'transparent'; g.save(); g.beginPath(); g.rect(0, -16, L, 32); g.clip();
  g.fillStyle = ROAD.red; for (let i = -40; i < L + 40; i += 56) { g.beginPath(); g.moveTo(i, 16); g.lineTo(i + 28, -16); g.lineTo(i + 56, -16); g.lineTo(i + 28, 16); g.fill(); }
  g.restore(); g.restore();
}
/** Bảng quảng cáo ven đường mang ẢNH người dùng tải (DNA §8): ảnh màu thật, viền trắng, hai chân; nhãn dưới. Trả về {w,h}. */
export function billboard(g, key, x, y, h, k = 1, { label = null, sub = null } = {}) {
  const im = IM[key], w = im.width * h / im.height; if (k <= 0) return { w, h };
  const p = outBack(clamp(k)); g.save(); g.translate(x + w / 2, y + h); g.scale(1, p); g.translate(-(x + w / 2), -(y + h));
  g.fillStyle = '#2A2C30'; g.fillRect(x + w * 0.2 - 8, y + h, 16, 46); g.fillRect(x + w * 0.8 - 8, y + h, 16, 46);
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = '#F4F1EA'; g.fillRect(x - 14, y - 14, w + 28, h + 28);
  g.shadowColor = 'transparent'; g.drawImage(im, x, y, w, h); g.restore();
  const kl = clamp(k * 1.5 - 0.5);
  if (label) typed(g, label, x, y + h + 100, kl * 1.4, 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
  if (sub) typed(g, sub, x, y + h + 134, kl * 2 - 0.5, '500 20px "IBM Plex Mono"', ERA.road.dim);
  return { w, h };
}
/** Đêm xuống (DNA §6 — vào/ra intro): k = 0 ban ngày, 1 đen kín; chừa quầng đèn xe ở (lx, ly) bán kính lr·(1−k²). */
export function night(g, k, lx = W / 2, ly = H / 2, lr = 420) {
  if (k <= 0) return;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const r = lr * (1 - clamp(k) ** 2), gr = g.createRadialGradient(lx, ly, 0, lx, ly, Math.max(1, r));
  gr.addColorStop(0, `rgba(0,0,0,${clamp(k * 1.6 - 0.9)})`); gr.addColorStop(1, `rgba(0,0,0,${clamp(k * 1.25)})`);
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = `rgba(0,0,0,${clamp(k * 1.25)})`;
  g.beginPath(); g.rect(0, 0, W, H); g.moveTo(lx + Math.max(1, r), ly); g.arc(lx, ly, Math.max(1, r), 0, Math.PI * 2, true); g.fill('evenodd'); g.restore();
}
/** Kiểm toán trên hình (DNA §9): tính biểu thức viết bằng ký hiệu của video, ném lỗi nếu khác giá trị chờ. */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message}) — −2^2 phải viết (−2)^2 hoặc −(2^2)`); }
  if (Math.abs(v - want) > 1e-9) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
