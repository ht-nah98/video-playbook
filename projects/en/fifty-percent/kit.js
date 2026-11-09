// Đồ nghề chung của bài học fifty-percent ("What Does 50% Actually Mean?") — DNA "Đèn trong đêm" (DNA.md):
// ÁNH SÁNG = THÔNG TIN. Khung chung chép từ math-30k/zero-div/pemdas (nét tay, chữ viết vào, bút chấm, mascot nửa thân,
// chân dung, lookup, must); ĐỒ NGHỀ ĐÊM ở cuối file (trời, sương trôi, đèn bão, chùm đèn, quầng, đồng xu, phỉnh dưới đèn
// bàn, biển tên mục, biển kênh). Bàn thử gốc: tools/lab/lantern.html (+ phỉnh từ tools/lab/felt.html).
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu, sương, mascot nhuộm đêm sinh MỘT lần lúc nạp / lần đầu dùng.
// KHÔNG ctx.filter blur trong render (chậm khi render 13 luồng) — mọi thứ mềm là sprite vẽ sẵn hoặc gradient.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js'; // sfx() { return typeCues(chữ, a, b) } — gõ khớp typed()
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const prog = (t, a, b) => clamp((t - a) / (b - a));

// ── bảng màu (DNA §2). Đo ở bàn thử: chữ trên đêm 5.3–15:1. ĐỎ chỉ cho cái sai / cảnh báo. ──
export const C = { night: '#070B14', dusk: '#101A2E', amber: '#F4B860', fog: '#8EA2B8', gold: '#FFD866', ivory: '#EDE6D6',
  red: '#E5604D', dim: '#5C6B80', chip: '#1E1E22', chipRim: '#F3ECDA', brass: '#E2B65A' };
// Một chất liệu cho cả video (người dùng: "B + mượn ý A" — phỉnh dưới đèn bàn vẫn là đêm).
export const ERA = { night: { bg: '#0A1120', ink: C.ivory, accent: C.amber, dim: C.fog, amp: 5 } };
export const CG = '"Cormorant Garamond"', MONO = '"IBM Plex Mono"', ARC = '"Archivo"';
const TEX = {};
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const h = (a, b) => hash(a * 12.9898 + b * 78.233);
  return (h(xi, yi) * (1 - sx) + h(xi + 1, yi) * sx) * (1 - sy) + (h(xi, yi + 1) * (1 - sx) + h(xi + 1, yi + 1) * sx) * sy;
}
function texture() {                                   // trời đêm: gradient + hạt mịn (sương là lớp riêng, trôi theo t)
  const c = mk(), x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0C1426'); gr.addColorStop(0.6, '#0A1120'); gr.addColorStop(1, '#070B14');
  x.fillStyle = gr; x.fillRect(0, 0, W, H);
  const id = x.getImageData(0, 0, W, H);
  for (let i = 0; i < W * H; i++) { const n = (hash(i * 0.613) - 0.5) * 5 + (vnoise((i % W) / 160, ((i / W) | 0) / 160) - 0.5) * 6; for (let k = 0; k < 3; k++) id.data[i * 4 + k] += n; }
  x.putImageData(id, 0, 0); return c;
}
/** Nền đêm tĩnh. Dùng sky(g, t) cho nền có sương trôi (mặc định của mọi cảnh). */
export function ground(g, e = 'night') { g.drawImage(TEX[e], 0, 0, W, H); }

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

// ── biển tên mục (góc trái trên, x 96–~820, y 64–196): hồi (Plex hổ phách) + tên mục (Cormorant nghiêng ngà) + vạch đèn ──
export function card(g, e, k, act, title) {
  if (k <= 0) return;
  typed(g, act, 96, 104, k * 2.2 - 0.2, '500 22px "IBM Plex Mono"', C.amber);
  typed(g, title, 96, 168, k * 1.6 - 0.5, 'italic 600 54px "Cormorant Garamond"', C.ivory);
  const w = 120 * outCubic(clamp(k * 1.5 - 0.3)); if (w > 0) { g.save(); g.fillStyle = C.amber; g.globalAlpha = 0.8; g.fillRect(96, 192, w, 3); g.restore(); }
}

// ── nhân vật NỬA THÂN: ảnh đặc + bóng lệch màu nhấn; vào = trồi lên + bật (0.35 s), không fade ──
// crop = phần trên của ảnh được giữ. Kho mascot có hai khung (assets/character-v2/POSES.md): toàn thân → crop ≈ 0.45
// (ngang hông), khung giữa đùi → 1. Đặt cạnh nhau thì cỡ đầu khớp (đo ở zero-div). Tư thế mới: thêm vào CROP.
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, 'peace-back': 1,
  'coin-cover': 1, 'coin-flip': 1, 'coin-peek': 1, phone: 1 };
export function figure(g, pose, cx, foot, h, e = 'night', k = 1, { flip = false, crop = CROP[pose] ?? 1, rim = 'left', wash = 0.36 } = {}) {
  const im = IM['pose-' + pose], sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  if (k <= 0) return { x: cx - w / 2, y: foot - h, w, h };              // luôn trả khung (cảnh đặt vật theo tay mascot)
  // nhuộm đêm MỘT lần (ở độ phân giải gốc): phủ xanh đêm + viền hổ phách phía đèn. Không bóng màu nhấn (đêm không có bóng đổ).
  const tint = (FIG[pose + rim + wash] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0);
    x.globalCompositeOperation = 'source-atop'; x.fillStyle = `rgba(16,26,46,${wash})`; x.fillRect(0, 0, im.width, im.height);
    const r = rim === 'left' ? x.createLinearGradient(0, 0, im.width * 0.5, 0) : x.createLinearGradient(im.width, 0, im.width * 0.5, 0);
    r.addColorStop(0, 'rgba(244,184,96,0.26)'); r.addColorStop(1, 'rgba(244,184,96,0)'); x.fillStyle = r; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.drawImage(tint, 0, 0, im.width, sh0, -w / 2, -h, w, h); g.restore();
  return { x: cx - w / 2, y: foot + rise - h, w, h };
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
  TEX.night = texture(); FOG.puff = puff();
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
/** Thẻ HỒI giữa khung trong khoảng lặng mở hồi: viết vào từ start−2.3, trượt lên nhường thẻ mốc quanh start. */
export function actTitle(g, e, t, start, act, sub) {
  const E = ERA[e], out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  g.save(); g.translate(0, -out * 700);
  typed(g, act, W / 2, 500, prog(t, start - 2.3, start - 1.8), '600 140px "Cormorant Garamond"', E.ink, { align: 'center' });
  typed(g, sub, W / 2, 600, prog(t, start - 1.8, start - 1.1), 'italic 500 64px "Cormorant Garamond"', E.accent, { align: 'center' });
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

/** Kiểm toán trên hình: tính biểu thức viết bằng ký hiệu của video (÷ × − ^), ném lỗi nếu khác giá trị chờ. Mọi kết quả
 *  hiện lên hình đi qua đây (pemdas: 15 cảnh, 5 người viết, không một phép sai). ^ → ** (kết hợp phải, như toán). */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message}) — −2^2 phải viết (−2)^2 hoặc −(2^2)`); }
  if (Math.abs(v - want) > 1e-9) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}

// ══════════════════════════ ĐỒ NGHỀ ĐÊM (DNA §1) ══════════════════════════
// Toạ độ màn hình 1920×1080. t = giây timeline (để sương trôi, đèn rung) — truyền t của render, không Date.now.
const FOG = {};
function puff() {                                        // sprite một búi sương: elip mềm (gradient), vẽ sẵn để khỏi blur mỗi khung
  const c = mk(256, 256), x = c.getContext('2d'), gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(142,162,184,1)'); gr.addColorStop(0.5, 'rgba(142,162,184,0.45)'); gr.addColorStop(1, 'rgba(142,162,184,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256); return c;
}
/** Bức sương ở (cx, cy) bán trục rx, ry; trôi chậm theo t; a = độ đặc (0–1.5). seed đổi hình búi. */
export function fogBank(g, cx, cy, rx, ry, t = 0, { a = 1, seed = 0, n = 9, drift = 14 } = {}) {
  if (a <= 0) return;
  g.save();
  for (let i = 0; i < n; i++) {
    const h1 = hash(i * 3.3 + seed), h2 = hash(i * 5.7 + seed), h3 = hash(i * 1.9 + seed);
    const x = cx + (h1 - 0.5) * rx * 1.6 + Math.sin(t * 0.13 + i * 1.7) * drift, y = cy + (h2 - 0.5) * ry + Math.cos(t * 0.11 + i) * drift * 0.4;
    const r = 110 + h3 * 150;
    g.globalAlpha = clamp((0.07 + hash(i * 2.3 + seed) * 0.06) * a); g.drawImage(FOG.puff, x - r * 1.6, y - r, r * 3.2, r * 2);
  }
  g.restore();
}
/** Nền mọi cảnh: trời đêm + dải sương thấp trôi ngang (k = độ đặc). Thay ground(). */
export function sky(g, t = 0, { fog = 1, y = 0.62 } = {}) {
  g.drawImage(TEX.night, 0, 0, W, H);
  if (fog > 0) for (let j = 0; j < 3; j++) fogBank(g, ((t * (9 + j * 4) + j * 640) % (W + 900)) - 450, H * y + (j - 1) * 70, 520, 160, t, { a: fog * 0.9, seed: j * 11 });
}
/** Quầng sáng cộng dồn (lighter). */
export function glow(g, x, y, r, color, a = 1) {
  if (a <= 0 || r <= 0) return;
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = clamp(a); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore();
}
/** Chữ một dòng; ls = giãn chữ px. Trả về bề rộng. */
export function text(g, s, x, y, font, color, align = 'left', ls = 0) {
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  g.fillText(s, x, y); const w = g.measureText(s).width; g.restore(); return w;
}
/** Nhãn Plex in hoa giãn chữ (cỡ ≥ 20). */
export const label = (g, s, x, y, color = C.fog, align = 'left', size = 26) => text(g, s.toUpperCase(), x, y, `500 ${size}px ${MONO}`, color, align, 3);
export const fmt = n => n.toLocaleString('en-US');
/** Đèn bão của NGƯỜI XEM. on ∈ [0,1] (0 = tắt: chỉ còn khung tối), lửa rung nhẹ theo t. s = tỉ lệ (1 ≈ cao 210 px). */
export function lantern(g, x, y, s, t = 0, on = 1) {
  const fl = 1 + 0.04 * Math.sin(t * 7.3) + 0.03 * Math.sin(t * 12.9 + 1);
  glow(g, x, y, 520 * s * fl, 'rgba(244,184,96,0.40)', on); glow(g, x, y, 180 * s, 'rgba(255,214,140,0.85)', on);
  g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = g.lineJoin = 'round';
  g.strokeStyle = '#1A140C'; g.lineWidth = 7; g.beginPath(); g.arc(0, -118, 26, Math.PI, 0); g.stroke();
  g.fillStyle = '#231A10'; g.beginPath(); g.moveTo(-58, -78); g.lineTo(58, -78); g.lineTo(36, -100); g.lineTo(-36, -100); g.closePath(); g.fill();
  const gl = g.createRadialGradient(0, 0, 4, 0, 0, 70);
  gl.addColorStop(0, on > 0.05 ? '#FFF3D0' : '#2A2418'); gl.addColorStop(0.45, on > 0.05 ? '#FFC970' : '#241E14'); gl.addColorStop(1, on > 0.05 ? '#C27A2A' : '#1C170F');
  g.globalAlpha = 1; g.fillStyle = gl; g.beginPath(); g.roundRect(-46, -78, 92, 150, 14); g.fill();
  if (on > 0.05) { g.globalAlpha = clamp(on); g.fillStyle = '#FFFBEA'; g.beginPath(); g.moveTo(0, -38 * fl); g.quadraticCurveTo(16, 0, 0, 20); g.quadraticCurveTo(-16, 0, 0, -38 * fl); g.fill(); g.globalAlpha = 1; }
  g.strokeStyle = '#2A1F12'; g.lineWidth = 6; [-46, 0, 46].forEach(bx => { g.beginPath(); g.moveTo(bx, -78); g.lineTo(bx, 72); g.stroke(); });
  g.fillStyle = '#231A10'; g.fillRect(-60, 72, 120, 20); g.restore();
}
function beamSprite() {                                  // nêm sáng mềm vẽ sẵn (blur lúc nạp, không lúc render): trái hẹp → phải rộng, mờ dần
  const c = mk(1024, 512), x = c.getContext('2d'), gr = x.createLinearGradient(0, 0, 1024, 0);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.55, 'rgba(255,255,255,0.3)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.filter = 'blur(22px)'; x.fillStyle = gr; x.beginPath(); x.moveTo(30, 256 - 50); x.lineTo(1000, 40); x.lineTo(1000, 472); x.lineTo(30, 256 + 50); x.closePath(); x.fill();
  return c;
}
const BEAM = {};
/** Chùm đèn từ (x0,y0) hướng (x1,y1), miệng rộng w1 ở đích; reach ∈ [0,1] = chùm với tới đâu (tắt dần trước đích). color 'r,g,b'. */
export function beam(g, x0, y0, x1, y1, w0, w1, a = 0.4, { reach = 1, color = '244,184,96' } = {}) {
  if (a <= 0 || reach <= 0) return;
  const spr = (BEAM[color] ??= (() => { const b = beamSprite(), c = mk(b.width, b.height), x = c.getContext('2d'); x.drawImage(b, 0, 0);
    x.globalCompositeOperation = 'source-in'; x.fillStyle = `rgb(${color})`; x.fillRect(0, 0, c.width, c.height); return c; })());
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0) * reach, hh = Math.max(w0 * 2.6, w1 * reach * 1.2);
  g.save(); g.translate(x0, y0); g.rotate(ang); g.globalCompositeOperation = 'lighter'; g.globalAlpha = clamp(a * 1.6);
  g.drawImage(spr, -L * 0.03, -hh / 2, L * 1.03, hh); g.restore();
}
/** Đường đứt nét ("khoảng cách giữa bạn và đồng xu"). */
export function dashes(g, x0, y0, x1, y1, color, { w = 3, on = 10, off = 14, k = 1 } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.setLineDash([on, off]); g.beginPath(); g.moveTo(x0, y0);
  g.lineTo(x0 + (x1 - x0) * clamp(k), y0 + (y1 - y0) * clamp(k)); g.stroke(); g.restore();
}
/** Đồng xu đồng. spin = góc lật (rad; mặt nhìn thấy co theo |cos|); face 'H' | 'T' hiện chữ khi mặt đủ rộng; lit 0–1 = đèn chạm tới (0 = chìm tối). */
export function coin(g, x, y, r, { spin = 0, face = null, lit = 1 } = {}) {
  const sy = Math.max(0.06, Math.abs(Math.cos(spin)));
  g.save(); g.translate(x, y); g.scale(1, sy);
  g.fillStyle = '#7A5A22'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  const gr = g.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
  gr.addColorStop(0, '#F7DE9A'); gr.addColorStop(0.6, C.brass); gr.addColorStop(1, '#A67C2E');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r * 0.92, 0, 7); g.fill();
  g.strokeStyle = 'rgba(120,85,30,.6)'; g.lineWidth = Math.max(1.5, r * 0.05); g.beginPath(); g.arc(0, 0, r * 0.78, 0, 7); g.stroke();
  if (face && sy > 0.45 && r > 14) { g.fillStyle = 'rgba(110,76,24,.85)'; g.font = `600 ${Math.round(r * 1.05)}px ${CG}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(face, 0, r * 0.05); }
  if (lit < 1) { g.globalAlpha = clamp(1 - lit) * 0.82; g.fillStyle = '#060A14'; g.beginPath(); g.arc(0, 0, r * 1.02, 0, 7); g.fill(); }
  g.restore();
}
/** Phỉnh nhìn từ trên (mượn từ phương án A): vành có vạch, lõi ngà in số Archivo 800. body: C.chip | C.red (cái sai) | C.brass. */
export function chip(g, x, y, r, body = C.chip, { label = null, ink = C.chip, spots = C.chipRim, size = null } = {}) {
  g.save(); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = r * 0.35; g.shadowOffsetY = r * 0.18;
  g.fillStyle = body; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore();
  g.save(); g.strokeStyle = spots; g.lineWidth = r * 0.16; g.setLineDash([r * 0.34, r * 0.45]); g.beginPath(); g.arc(x, y, r * 0.88, 0, 7); g.stroke(); g.restore();
  if (label) { g.save(); g.fillStyle = C.chipRim; g.beginPath(); g.arc(x, y, r * 0.62, 0, 7); g.fill();
    g.fillStyle = ink; g.font = `800 ${size ?? Math.round(r * 0.5)}px ${ARC}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, x, y + r * 0.03); g.restore(); }
}
/** Đèn bàn bật lên giữa đêm (cảnh cá cược): chao đèn treo ở (x, top), vũng sáng elip trên mặt bàn tối quanh (x, y) bán kính rx.
 *  on ∈ [0,1]. Trả về clip của vũng sáng để cảnh vẽ phỉnh trong đó. */
export function deskLamp(g, x, y, rx, on = 1, t = 0, { top = 0 } = {}) {
  if (on <= 0) return;
  const ry = rx * 0.42, fl = 1 + 0.015 * Math.sin(t * 5.1);
  g.save(); g.globalAlpha = clamp(on);
  const tb = g.createRadialGradient(x, y, rx * 0.2, x, y, rx * 1.5); tb.addColorStop(0, 'rgba(36,30,22,0.95)'); tb.addColorStop(1, 'rgba(10,12,18,0)');
  g.fillStyle = tb; g.beginPath(); g.ellipse(x, y, rx * 1.5, ry * 1.5, 0, 0, 7); g.fill();      // mặt bàn gỗ tối dưới đèn
  g.restore();
  glow(g, x, y, rx * fl, 'rgba(244,184,96,0.34)', on);
  g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = clamp(on) * 0.16;            // nón sáng từ chao xuống bàn
  const cone = g.createLinearGradient(x, top, x, y); cone.addColorStop(0, 'rgba(255,214,140,1)'); cone.addColorStop(1, 'rgba(255,214,140,0)');
  g.fillStyle = cone; g.beginPath(); g.moveTo(x - 60, top + 60); g.lineTo(x + 60, top + 60); g.lineTo(x + rx * 0.9, y); g.lineTo(x - rx * 0.9, y); g.closePath(); g.fill(); g.restore();
  g.save(); g.globalAlpha = clamp(on * 1.5); g.strokeStyle = '#1A140C'; g.lineWidth = 4; g.beginPath(); g.moveTo(x, -10); g.lineTo(x, top + 8); g.stroke();
  g.fillStyle = '#231A10'; g.beginPath(); g.moveTo(x - 90, top + 64); g.lineTo(x + 90, top + 64); g.lineTo(x + 40, top + 4); g.lineTo(x - 40, top + 4); g.closePath(); g.fill();
  g.fillStyle = on > 0.05 ? '#FFE3A8' : '#2A2418'; g.beginPath(); g.ellipse(x, top + 64, 70, 9, 0, 0, 7); g.fill(); g.restore();
}
/** Biển kênh cuối video (luật kênh: "99% from scratch" + SUBSCRIBE, đứng yên ≥ 4 s, không logo) — chữ thắp trong quầng đèn. */
export function channelBoard(g, x, y, k) {
  const p = clamp(k); if (p <= 0) return;
  glow(g, x, y, 520, 'rgba(244,184,96,0.22)', p);
  g.save(); g.globalAlpha = p; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = C.ivory; g.font = `600 120px ${CG}`; g.fillText('99% from scratch', x, y - 30);
  const bw = 300, by = y + 80; g.fillStyle = C.amber; g.beginPath(); g.roundRect(x - bw / 2, by - 30, bw, 60, 30); g.fill();
  g.fillStyle = C.night; g.font = `500 28px ${MONO}`; g.letterSpacing = '4px'; g.fillText('SUBSCRIBE', x + 2, by + 2); g.restore();
}
