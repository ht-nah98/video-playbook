// Đồ nghề chung của bài probability — DNA "vở nháp ô li + thư 1654" (DNA.md, lab tools/lab/notebook.html + engraving.html).
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu sinh MỘT lần lúc nạp. KHÔNG shadowBlur / ctx.filter (§127).
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, must, CROP, loadImages } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';
import { stick, P as POSE, mix as poseMix } from '../../../engine/stick.js';
export { shadowRR, shade, glow } from '../../../engine/shade.js';
export { W, H, clamp, hash, smooth, outBack, outCubic, POSE, poseMix };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

export const lerp = (a, b, u) => a + (b - a) * u;
export const pop = k => outBack(clamp(k), 2.0);

// ── màu (DNA §2): một màu một nghĩa ──
export const C = {
  paper: '#FBF8EF', gridLn: 'rgba(120,160,200,0.30)', margin: 'rgba(214,90,90,0.55)',
  ink: '#1E2F6B', ink2: '#3A466E', pencil: 'rgba(58,70,110,0.62)',
  hi: '#FFE45C', orange: '#E2701E', orangeInk: '#9A4A10', win: '#1B6B43', lose: '#B02A24',
  dieA: '#D8433A', dieB: '#2F6DB5', card: '#FFFFFF', tape: 'rgba(240,226,180,0.78)',
  // tờ thư 1654 (chỉ đoạn lịch sử)
  vellum: '#EFE3C6', iron: '#2A2118', iron2: '#4A3B2A', wax: '#9E2A22', waxGreen: '#2F6B5C',
  note: ['#FFF3A6', '#FFD3E2', '#CFEBFF', '#D7F5C9', '#FFE0B8'],
};
export const ERA = { paper: { bg: C.paper, ink: C.ink, accent: C.hi } };   // một ERA: chuyển cảnh = lật/nạp trang vở

// tương phản ĐO bằng số (≥ 4.5 cho chữ)
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round((x + 0.05) / (y + 0.05) * 10) / 10; };
export const CONTRAST = {};
for (const [k, a, b] of [['ink', C.ink, C.paper], ['ink2', C.ink2, C.card], ['win', C.win, C.card], ['lose', C.lose, C.paper], ['inkOnHi', C.ink, C.hi],
  ['orangeInk', C.orangeInk, C.paper], ['iron', C.iron, C.vellum], ['iron2', C.iron2, C.vellum], ['wax', C.wax, C.vellum], ['inkOnNote', C.ink, C.note[1]]]) {
  CONTRAST[k] = contrast(a, b); if (CONTRAST[k] < 4.5) throw new Error(`kit: tương phản ${k} = ${CONTRAST[k]}`);
}
export const mixc = (hex, k) => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)), t = k > 0 ? 255 : 0, a = Math.abs(k);
  return '#' + v.map(c => Math.round(c + (t - c) * a).toString(16).padStart(2, '0')).join(''); };

// ── chữ ──
export const AR = '"Archivo"', MO = '"IBM Plex Mono"', CO = '"Cormorant Garamond"';
export const MIN_TXT = 28, MIN_NUM = 30;
export const SAFE = { x0: 96, x1: 1824, y0: 64, y1: 1016 };
export function measure(g, s, font) { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; }
/** Chữ VIẾT vào (lộ dần theo ký tự — nét bút bi, không fade). Trả về bề rộng chữ ĐẦY ĐỦ. */
export function write(g, s, x, y, k = 1, { font = `800 48px ${AR}`, color = C.ink, align = 'left', base = 'alphabetic', rot = 0 } = {}) {
  const px = +(font.match(/(\d+)px/) || [0, 99])[1];
  if (px < MIN_TXT) throw new Error(`kit.write: "${s}" cỡ ${px}px < ${MIN_TXT}`);
  const n = Math.round(s.length * clamp(k)); const w = measure(g, s, font);
  if (!n) return w;
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = base;
  if (rot) { g.translate(x, y); g.rotate(rot); g.fillText(s.slice(0, n), 0, 0); } else g.fillText(s.slice(0, n), x, y);
  g.restore(); return w;
}
/** Phép tính nháp (Plex Mono) — giữ hoa/thường. */
export const calc = (g, s, x, y, k = 1, { size = 40, color = C.ink2, align = 'left' } = {}) => write(g, s, x, y, k, { font: `500 ${size}px ${MO}`, color, align });
/** Số lớn (Archivo 800). */
export const big = (g, s, x, y, k = 1, { size = 120, color = C.ink, align = 'center' } = {}) => write(g, s, x, y, k, { font: `800 ${size}px ${AR}`, color, align });
/** Phân số chồng: tử / gạch / mẫu (Archivo), k vẽ dần. */
export function frac(g, num, den, cx, y, k = 1, { size = 64, color = C.ink } = {}) {
  const f = `800 ${size}px ${AR}`, w = Math.max(measure(g, String(num), f), measure(g, String(den), f)) + size * 0.3;
  write(g, String(num), cx, y - size * 0.18, clamp(k * 3), { font: f, color, align: 'center' });
  hand(g, seg(cx - w / 2, y, cx + w / 2, y, 8), { w: Math.max(4, size * 0.07), color, k: clamp(k * 3 - 1), jit: 0.8, seed: num * 7 + den });
  write(g, String(den), cx, y + size * 0.86, clamp(k * 3 - 2), { font: f, color, align: 'center' });
  return w;
}

// ── nét tay: đường gấp khúc rung nhẹ, vẽ dần theo k ──
export const seg = (x0, y0, x1, y1, n = 24) => Array.from({ length: n + 1 }, (_, i) => [x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n]);
export function hand(g, pts, { w = 4, color = C.ink, jit = 1.5, seed = 1, k = 1, alpha = 1 } = {}) {
  if (k <= 0) return;
  const m = Math.max(1, Math.ceil((pts.length - 1) * k));
  g.save(); g.globalAlpha *= alpha; g.strokeStyle = color; g.lineWidth = w; g.lineCap = g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= m; i++) {
    let [x, y] = pts[i];
    if (i === m && k < 1) { const f = (pts.length - 1) * k - (m - 1), [px, py] = pts[m - 1]; x = px + (x - px) * f; y = py + (y - py) * f; }
    x += (hash(i * 3.1 + seed) - .5) * jit; y += (hash(i * 5.7 + seed) - .5) * jit;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke(); g.restore();
}
/** Bút đỏ gạch MỘT nét — chữ dưới vẫn đọc được (DNA §1, §9). */
export function strike(g, x0, y0, x1, y1, k = 1, { color = C.lose, w = 5, seed = 7 } = {}) { hand(g, seg(x0, y0, x1, y1, 14), { w, color, jit: 1.6, seed, k }); }
export function cross(g, x, y, s, k = 1, { color = C.lose, seed = 3, w = 7 } = {}) {
  strike(g, x - s, y - s, x + s, y + s, clamp(k * 2), { color, seed, w }); strike(g, x + s, y - s, x - s, y + s, clamp(k * 2 - 1), { color, seed: seed + 9, w });
}
export function ring(g, x, y, rx, ry, k = 1, { color = C.orange, w = 5, seed = 5 } = {}) {
  const P = Array.from({ length: 49 }, (_, i) => { const a = -2.2 + i / 48 * Math.PI * 2.15; return [x + Math.cos(a) * rx * (1 + (hash(i + seed) - .5) * .05), y + Math.sin(a) * ry]; });
  hand(g, P, { w, color, jit: 1.5, seed, k });
}
export function check(g, x, y, s, k = 1, { color = C.win, w = 8 } = {}) { hand(g, [[x - s, y - s * 0.1], [x - s * 0.35, y + s * 0.55], [x + s, y - s]], { w, color, jit: 1, seed: 41, k }); }
export function arrow(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 4, bend = 0, seed = 11 } = {}) {
  if (k <= 0) return;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  const P = Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
    return [a * x0 + b * (mx + nx * bend) + c * x1, a * y0 + b * (my + ny * bend) + c * y1]; });
  hand(g, P, { w, color, seed, k });
  if (k >= 1) { const [px, py] = P[22], an = Math.atan2(y1 - py, x1 - px);
    hand(g, [[x1 - 22 * Math.cos(an - 0.45), y1 - 22 * Math.sin(an - 0.45)], [x1, y1], [x1 - 22 * Math.cos(an + 0.45), y1 - 22 * Math.sin(an + 0.45)]], { w, color, seed: seed + 1 }); }
}
/** Bút dạ quang quẹt trái → phải (multiply) — cái ta ĐẾM. */
export function hi(g, x, y, w, h, k = 1, { col = C.hi, rot = -0.008, r = 10 } = {}) {
  if (k <= 0) return;
  g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = col; g.translate(x, y + h / 2); g.rotate(rot);
  const p = new Path2D(); p.roundRect(0, -h / 2, w * clamp(k), h, r); g.fill(p); g.restore();
}

// ── trang vở: giấy + ô li 40 px (gốc x 12, y 20) + lề đỏ + lỗ đục; oy = cuộn dọc (camera trượt theo trang) ──
const TEX = {};
function paperTex() {
  const c = mk(W, H + 40), x = c.getContext('2d'); x.fillStyle = C.paper; x.fillRect(0, 0, W, H + 40);
  for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(120,100,60,${0.015 + hash(i * 1.7) * 0.02})`; x.fillRect(hash(i) * W, hash(i * 3.3) * (H + 40), 1 + hash(i * 5.1) * 2, 1); }   // sợi giấy
  x.strokeStyle = C.gridLn; x.lineWidth = 1.5;
  for (let gx = 12; gx < W; gx += 40) { x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, H + 40); x.stroke(); }
  for (let gy = 20; gy < H + 40; gy += 40) { x.beginPath(); x.moveTo(0, gy); x.lineTo(W, gy); x.stroke(); }
  return c;
}
function vignette() { const c = mk(), x = c.getContext('2d'), v = x.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(90,80,50,0.10)'); x.fillStyle = v; x.fillRect(0, 0, W, H); return c; }
export function paper(g, { oy = 0, margin = true } = {}) {
  const m = ((oy % 40) + 40) % 40;
  g.drawImage(TEX.paper, 0, -m);
  if (margin) { g.save(); g.strokeStyle = C.margin; g.lineWidth = 3; g.beginPath(); g.moveTo(92, 0); g.lineTo(92, H); g.stroke(); g.restore();
    for (let i = -1; i < 5; i++) { const y = 240 + i * 300 - (((oy % 300) + 300) % 300); g.fillStyle = '#E9E4D6'; g.beginPath(); g.arc(46, y, 16, 0, 7); g.fill(); } }
  g.drawImage(TEX.vig, 0, 0);
}
export const GRID = { x0: 12, y0: 20, s: 40 };
export const snap = (v, o) => o + Math.round((v - o) / 40) * 40;

// ── bóng tiếp xúc (gradient elip, không shadowBlur) ──
export function contact(g, cx, cy, rx, ry, a = 0.22, rgb = '60,60,40') { g.save(); g.translate(cx, cy); g.scale(1, ry / rx); const s = g.createRadialGradient(0, 0, 0, 0, 0, rx);
  s.addColorStop(0, `rgba(${rgb},${a})`); s.addColorStop(0.6, `rgba(${rgb},${a * 0.45})`); s.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = s; g.beginPath(); g.arc(0, 0, rx, 0, 7); g.fill(); g.restore(); }
export const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };

// ── xúc xắc vẽ tay: tô dạ nhạt + viền bi; k bật vào ──
export const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
export function die(g, cx, cy, s, n, col = C.dieA, { rot = 0, k = 1, a = 1 } = {}) {
  if (k <= 0) return;
  const sc = pop(k);
  g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.rotate(rot); g.scale(sc, sc);
  const p = rr(-s / 2, -s / 2, s, s, s * 0.18); g.fillStyle = mixc(col, 0.55); g.fill(p);
  g.save(); g.clip(p); g.fillStyle = col; g.globalAlpha *= 0.9; g.fillRect(-s / 2, -s / 2, s, s * 0.3); g.restore();
  g.strokeStyle = C.ink; g.lineWidth = Math.max(2.5, s * 0.035); g.stroke(p);
  g.fillStyle = C.ink; for (const [px, py] of PIPS[n]) { g.beginPath(); g.arc(px * s * 0.26, py * s * 0.26, s * 0.075, 0, 7); g.fill(); }
  g.restore();
}
/** Xúc xắc LĂN: k ∈ [0,1] từ (x0,y0) tới (x1,y1); mặt đổi theo hash, dừng ở mặt n. */
export function rollDie(g, x0, y0, x1, y1, s, n, col, k, seed = 1) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), x = lerp(x0, x1, e), hop = Math.abs(Math.sin(e * Math.PI * 3)) * (1 - e) * 70, y = lerp(y0, y1, e) - hop;
  const face = k >= 1 ? n : 1 + Math.floor(hash(Math.floor(k * 14) + seed * 13) * 6);
  contact(g, x, lerp(y0, y1, e) + s * 0.55, s * 0.55, s * 0.1, 0.22);
  die(g, x, y, s, face, col, { rot: (1 - e) * 5 * (hash(seed) > 0.5 ? 1 : -1) + (k >= 1 ? 0 : 0) });
}

// ── thẻ cược dán băng keo (cold open) ──
export function betCard(g, x, y, w, h, label, { k = 1, rot = 0 } = {}) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * 220;
  g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot); g.translate(-(x + w / 2), -(y + h / 2));
  contact(g, x + w / 2 + 8, y + h + 4, w * 0.55, 24);
  g.fillStyle = 'rgba(60,60,40,0.10)'; g.fill(rr(x + 6, y + 8, w, h, 6));
  g.fillStyle = C.card; g.fill(rr(x, y, w, h, 6));
  g.fillStyle = C.tape; g.save(); g.translate(x + w / 2, y); g.rotate(-0.05); g.fillRect(-90, -22, 180, 44); g.restore();
  if (label) write(g, label, x + 40, y + 52, 1, { font: `800 34px ${AR}`, color: C.ink2 });
  g.restore();
}

// ── đếm vạch (tally): nhóm 5, n vạch đầu tiên; k = tỉ lệ hiện ──
export function tally(g, x, y, n, k = 1, { h = 48, gap = 14, color = C.ink, perRow = 25, rowH = 70, seed = 1 } = {}) {
  const m = Math.round(n * clamp(k));
  for (let i = 0; i < m; i++) {
    const row = Math.floor(i / perRow), j = i % perRow, grp = Math.floor(j / 5), r = j % 5, bx = x + grp * (gap * 4 + 34), by = y + row * rowH;
    if (r < 4) hand(g, seg(bx + r * gap, by, bx + r * gap + 2, by + h, 4), { w: 4, color, jit: 1, seed: seed + i });
    else hand(g, seg(bx - 8, by + h * 0.8, bx + 3 * gap + 8, by + h * 0.15, 4), { w: 4, color, jit: 1, seed: seed + i });
  }
}

// ── giấy note dán (5 moves) ──
export function note(g, x, y, w, h, k = 1, { col = C.note[0], rot = -0.03, title, body, num } = {}) {
  if (k <= 0) return;
  const e = pop(k), dy = (1 - clamp(k)) * -60;
  g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot); g.scale(e, e); g.translate(-w / 2, -h / 2);
  contact(g, w / 2 + 6, h + 2, w * 0.5, 14, 0.18);
  g.fillStyle = col; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(0,0,0,0.05)'; g.fillRect(0, 0, w, 18);
  const p = new Path2D(); p.moveTo(w, h - 34); p.lineTo(w - 34, h); p.lineTo(w, h); g.fillStyle = mixc(col, -0.12); g.fill(p);
  if (num != null) write(g, String(num), 24, 66, 1, { font: `800 52px ${AR}`, color: C.ink });
  if (title) write(g, title, num != null ? 74 : 24, 64, 1, { font: `800 38px ${AR}`, color: C.ink });
  if (body) body.forEach((l, i) => write(g, l, 24, 118 + i * 40, 1, { font: `600 30px ${AR}`, color: C.ink2 }));
  g.restore();
}

// ── đường xác suất 0–1 kẻ thước ──
export function probLine(g, x0, x1, y, k = 1, { labels = true, color = C.ink } = {}) {
  hand(g, seg(x0, y, x0 + (x1 - x0) * clamp(k * 1.3), y, 30), { w: 6, color, jit: 0.6, seed: 3 });
  if (k < 0.8 || !labels) return;
  for (const [u, s] of [[0, '0'], [0.5, '1/2'], [1, '1']]) { const x = x0 + (x1 - x0) * u;
    hand(g, seg(x, y - 18, x, y + 18, 4), { w: 5, color, jit: 0.5, seed: 9 + u * 10 }); write(g, s, x, y + 66, 1, { font: `800 40px ${AR}`, color, align: 'center' }); }
}
export const lineX = (x0, x1, p) => x0 + (x1 - x0) * p;

// ── lưới 6×6 (đỏ = hàng, xanh = cột) ──
export const SUM = (r, b) => r + b;
export function grid36(g, gx, gy, c, { k = 1, heads = 1, sums = 1, seven = 0, twelve = 0, noSix = 0, sixes = 0, miss66 = 0, hiCol = C.hi } = {}) {
  const N = 6;
  if (k > 0) { g.save(); g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillRect(gx, gy, c * N * clamp(k * 2), c * N); g.restore();
    for (let i = 0; i <= N; i++) { hand(g, seg(gx + i * c, gy, gx + i * c, gy + N * c, 12), { w: 2.5, color: 'rgba(60,66,90,0.55)', jit: 0.8, seed: i * 3 + 1, k: clamp(k * 2 - i / N * 0.6) });
      hand(g, seg(gx, gy + i * c, gx + N * c, gy + i * c, 12), { w: 2.5, color: 'rgba(60,66,90,0.55)', jit: 0.8, seed: i * 5 + 2, k: clamp(k * 2 - i / N * 0.6) }); } }
  for (let r = 1; r <= N; r++) for (let b = 1; b <= N; b++) {
    const x = gx + (b - 1) * c, y = gy + (r - 1) * c, s = SUM(r, b), idx = (r - 1) * N + (b - 1);
    if (s === 7) hi(g, x + 6, y + 10, c - 12, c - 20, clamp(seven * 6 - (r - 1)), { col: hiCol });
    if (r !== 6 && b !== 6) hi(g, x + 6, y + 10, c - 12, c - 20, clamp(noSix * 25 - idx * 0.7 + 0), { col: C.note[2] });
    if (r === 6 || b === 6) hi(g, x + 6, y + 10, c - 12, c - 20, clamp(sixes * 11 - idx * 0.3), { col: C.note[1] });
    if (!(r === 6 && b === 6)) hi(g, x + 6, y + 10, c - 12, c - 20, clamp(miss66 * 35 - idx * 0.97), { col: C.note[2] });
    if (r === 6 && b === 6 && miss66 > 0) ring(g, x + c / 2, y + c / 2, c * 0.4, c * 0.36, clamp(miss66 * 2), { color: C.lose });
    const kk = clamp(sums * 36 - idx);
    if (kk > 0) write(g, String(s), x + c / 2, y + c / 2 + 2, kk, { font: `${s === 7 && seven > 0 ? 800 : 600} ${Math.round(c * 0.38)}px ${AR}`, color: s === 7 && seven > 0 ? C.ink : C.pencil, align: 'center', base: 'middle' });
    if (s === 12 && twelve > 0) ring(g, x + c / 2, y + c / 2, c * 0.38, c * 0.34, twelve, { color: C.orange });
  }
  if (heads > 0) for (let i = 1; i <= N; i++) {
    die(g, gx - c * 0.6, gy + (i - 0.5) * c, c * 0.66, i, C.dieA, { k: clamp(heads * 6 - (i - 1)) });
    die(g, gx + (i - 0.5) * c, gy - c * 0.6, c * 0.66, i, C.dieB, { k: clamp(heads * 6 - (i - 1)) });
  }
}

// ── TỜ THƯ 1654 kẹp vào vở (DNA §1): giấy vergé, mực sắt; k trượt vào từ mép phải ──
function vellumTex(w, h) {
  const c = mk(w, h), x = c.getContext('2d'); x.fillStyle = C.vellum; x.fillRect(0, 0, w, h);
  for (let gy = 0; gy < h; gy += 7) { x.fillStyle = `rgba(120,90,40,${0.035 + hash(gy) * 0.03})`; x.fillRect(0, gy, w, 1.4); }
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(140,100,40,${0.04 + hash(i * 3.3) * 0.06})`; x.beginPath(); x.arc(hash(i) * w, hash(i * 7.7) * h, 2 + hash(i * 5.1) * 8, 0, 7); x.fill(); }
  const v = x.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(110,70,20,0.22)'); x.fillStyle = v; x.fillRect(0, 0, w, h);
  return c;
}
export function letter(g, x, y, w, h, k = 1, { rot = 0.02, from = 'right' } = {}) {
  if (k <= 0) return null;
  const key = `${w}x${h}`, tex = (TEX[key] ??= vellumTex(w, h)), e = outCubic(clamp(k)), dx = (1 - e) * (from === 'right' ? W - x + 40 : -(x + w + 40));
  g.save(); g.translate(x + dx + w / 2, y + h / 2); g.rotate(rot * e); g.translate(-w / 2, -h / 2);
  contact(g, w / 2 + 14, h + 8, w * 0.55, 26, 0.3, '60,40,10');
  g.fillStyle = 'rgba(60,40,10,0.18)'; g.fillRect(10, 12, w, h);
  g.drawImage(tex, 0, 0);
  g.strokeStyle = 'rgba(42,33,24,0.45)'; g.lineWidth = 1.5; g.strokeRect(18, 18, w - 36, h - 36);
  return { done: () => g.restore() };    // vẽ nội dung thư trong hệ toạ độ tờ thư, rồi gọi done()
}
/** Dấu sáp: thắng = xanh đồng, thua = đỏ. */
export function wax(g, sx, sy, k, { col = C.wax, letter: L = '' } = {}) {
  if (k <= 0) return;
  const s = pop(k);
  g.save(); g.translate(sx, sy); g.scale(s, s); contact(g, 6, 30, 60, 14, 0.3, '60,30,10');
  g.fillStyle = col; g.beginPath(); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r = 50 + (hash(i + col.length) - 0.5) * 12; i ? g.lineTo(Math.cos(a) * r, Math.sin(a) * r) : g.moveTo(r, 0); } g.closePath(); g.fill();
  g.fillStyle = mixc(col, -0.25); g.beginPath(); g.arc(0, 0, 32, 0, 7); g.fill(); g.strokeStyle = mixc(col, 0.3); g.lineWidth = 2.5; g.beginPath(); g.arc(0, 0, 32, 0, 7); g.stroke();
  if (L) { g.font = `700 44px ${CO}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = mixc(col, 0.55); g.fillText(L, 0, 2); }
  g.restore();
}

// ── ảnh lịch sử: in như bản khắc mực sắt trên tờ thư (duotone ở CỠ HIỂN THỊ) ──
const IM = {}, PH = {};
function duotone(src, h) {
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi_ = Math.max(lo + 1, pct(0.98));
  const hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), ink = hex(C.iron), bg = hex(C.vellum);
  for (let i = 0; i < n; i++) { const v = clamp((L[i] - lo) / (hi_ - lo)); for (let j = 0; j < 3; j++) d.data[i * 4 + j] = ink[j] + (bg[j] - ink[j]) * v; }
  x.putImageData(d, 0, 0); return c;
}
export const PHOTOS = {
  pascal: { src: 'assets/photos/pascal.jpg', label: 'BLAISE PASCAL · 1623–1662', credit: 'after François II Quesnel · Public domain · Wikimedia Commons' },
  fermat: { src: 'assets/photos/fermat.jpg', label: 'PIERRE DE FERMAT · 1601–1665', credit: 'François de Poilly · Public domain · Wikimedia Commons' },
};
export const photoImages = (...keys) => Object.fromEntries(keys.map(k => { if (!PHOTOS[k]) throw new Error(`photoImages: "${k}"`); return [k, PHOTOS[k].src]; }));
export function photo(g, key, x, y, h, k = 1, { rot = -0.02, label = true } = {}) {
  const im = (PH[key + h] ??= duotone(IM[key], h)), w = im.width;
  if (k <= 0) return { w, h };
  const dy = (1 - outCubic(clamp(k))) * 260;
  g.save(); g.translate(x, y + dy); g.rotate(rot * outCubic(clamp(k)));
  g.fillStyle = 'rgba(60,40,10,0.22)'; g.fillRect(10, 12, w + 16, h + 16);
  g.fillStyle = C.iron; g.fillRect(-8, -8, w + 16, h + 16); g.drawImage(im, 0, 0, w, h);
  if (label) { write(g, PHOTOS[key].label, w / 2, h + 52, 1, { font: `700 30px ${CO}`, color: C.iron, align: 'center' });
    g.save(); g.font = `italic 600 20px ${CO}`; g.fillStyle = C.iron2; g.textAlign = 'center'; g.fillText(PHOTOS[key].credit, w / 2, h + 82); g.restore(); }   // credit: dòng nhỏ duy nhất được phép < 28 px
  g.restore();
  return { w, h };
}

// ── người que "dân cược 1654" (DNA §5b): nét bút bi, mũ rộng vành + lông chim đỏ ──
export function gambler(g, x, y, h, pose, { dir = 1, color = C.ink, hat = true, rot = 0, lace = false, a = 1 } = {}) {
  if (a <= 0) return null;
  g.save(); g.globalAlpha *= a;
  const J = stick(g, x, y, pose, { h, color, dir, width: Math.max(4, h * 0.05), rot });
  if (hat) { const hx = J.head[0], hy = J.head[1] - J.headR * 0.55;
    g.save(); g.fillStyle = color; g.beginPath(); g.ellipse(hx, hy, h * 0.17, h * 0.03, -0.06 * dir, 0, 7); g.fill();
    g.beginPath(); g.moveTo(hx - h * 0.08, hy); g.quadraticCurveTo(hx - h * 0.08, hy - h * 0.1, hx, hy - h * 0.1); g.quadraticCurveTo(hx + h * 0.08, hy - h * 0.1, hx + h * 0.08, hy); g.fill(); g.restore();
    hand(g, [[hx + h * 0.05 * dir, hy - h * 0.08], [hx + h * 0.13 * dir, hy - h * 0.17], [hx + h * 0.18 * dir, hy - h * 0.15]], { w: Math.max(3, h * 0.022), color: C.lose, jit: 0.6, seed: 9 }); }
  if (lace) { g.save(); g.fillStyle = C.card; g.strokeStyle = color; g.lineWidth = 2; g.beginPath(); g.ellipse(J.neck[0], J.neck[1] + 4, h * 0.07, h * 0.025, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
  g.restore();
  return J;
}

// ── mascot NỬA THÂN (DNA §5): nhỏ, một bên; bóng lệch màu dạ vàng; nói theo lời ──
const FIG = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
export const FIG_MAX = 270;
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return;
  if (h > FIG_MAX) throw new Error(`figure: cao ${h} > ${FIG_MAX} (mascot nhỏ — DNA §5)`);
  const im = IM['pose-' + pose], sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const sh = (FIG[pose] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = 'rgba(30,47,107,0.18)'; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.drawImage(sh, 0, 0, im.width, sh0, -w / 2 + 10, -h + 8, w, h); g.drawImage(im, 0, 0, im.width, sh0, -w / 2, -h, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0: -w / 2, y0: -h, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
}

// ── thẻ hồi (act card) viết trên vở: "ACT ONE" + tiêu đề, dạ quang ──
export function actCard(g, k, act, title) {
  if (k <= 0) return;
  write(g, act, W / 2, 470, clamp(k * 2), { font: `600 40px ${MO}`, color: C.ink2, align: 'center' });
  const w = measure(g, title, `800 96px ${AR}`);
  hi(g, W / 2 - w / 2 - 24, 520, w + 48, 104, clamp(k * 2 - 0.6));
  write(g, title, W / 2, 604, clamp(k * 1.6 - 0.2), { font: `800 96px ${AR}`, color: C.ink, align: 'center' });
}
/** Mục lục lời hứa: câu i, số khoanh tròn (DNA §1). */
export const PROMISE = ['What is a probability, really?', 'Why does our instinct count the wrong thing?', 'How do you solve one without guessing?'];
export function promise(g, i, x, y, k = 1, { hiK = 0 } = {}) {
  if (k <= 0) return;
  ring(g, x + 30, y - 16, 30, 30, clamp(k * 3), { color: C.ink, w: 4, seed: 20 + i });
  write(g, String(i + 1), x + 30, y, clamp(k * 3 - 1), { font: `800 40px ${AR}`, color: C.ink, align: 'center' });
  const w = measure(g, PROMISE[i], `700 50px ${AR}`);
  hi(g, x + 80, y - 44, w + 24, 60, hiK);
  write(g, PROMISE[i], x + 90, y, clamp(k * 1.5 - 0.4), { font: `700 50px ${AR}`, color: C.ink });
}

// ── số của bài (CONTENT.md) — mọi số lên hình đi qua đây ──
export const N = {
  p4: must('(100 * (1 - (5 / 6) ** 4)).toFixed(1)', '51.8'),
  p24: must('(100 * (1 - (35 / 36) ** 24)).toFixed(1)', '49.1'),
  p25: must('(100 * (1 - (35 / 36) ** 25)).toFixed(1)', '50.6'),
  no24: must('(100 * (35 / 36) ** 24).toFixed(1)', '50.9'),
  no4: must('6 ** 4 - 671', 625), yes4: must('6 ** 4 - 625', 671), all4: must('6 ** 4', 1296),
  naive4: must('Math.round(4 / 6 * 100)', 67), real4: must('Math.round(100 * (1 - (5 / 6) ** 4))', 52),
  games: must('Math.round(((1.96 * 0.5) / (0.5 - (1 - (35 / 36) ** 24))) ** 2 / 1000)', 13),
  sevens: must('[1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b)).filter(s => s === 7).length', 6),
  twelves: must('[1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b)).filter(s => s === 12).length', 1),
  totals: must('new Set([1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b))).size', 11),
  noSix2: must('5 * 5', 25), anySix2: must('36 - 25', 11),
  coins: must('2 ** 3', 8), marbles: must('(3 / 5) * (2 / 4)', 0.3),
  sick: must('1000 * 0.001', 1), falsePos: must('Math.round(999 * 0.01)', 10), pos: must('1 + Math.round(999 * 0.01)', 11),
  testPct: must('Math.round(100 * (0.001 * 0.99) / (0.001 * 0.99 + 0.999 * 0.01))', 9),
  bday: must('(100 * (1 - Array.from({ length: 23 }, (_, i) => (365 - i) / 365).reduce((a, b) => a * b, 1))).toFixed(1)', '50.7'),
};

// ── nạp: kết cấu + ảnh ──
export async function loadKit(images) {
  TEX.paper = paperTex(); TEX.vig = vignette();
  await loadImages(images, IM);
}
