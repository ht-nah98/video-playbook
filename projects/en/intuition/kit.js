// Đồ nghề DNA "Gameshow" của intuition (DNA.md; khung mẫu tools/lab/gameshow.html — người dùng đã chọn ĐÚNG khung đó,
// kit vẽ lại y hệt: phông nhung + tia nắng + sàn bóng phản chiếu, bảng lật Solari, khung bóng đèn chạy, cửa sơn, dê bìa,
// thẻ bút dạ hồng + X đỏ còi sai, nhãn in).
// Ý trung tâm: TRỰC GIÁC là thí sinh giơ thẻ bút dạ (gutCard — hồng sen, CHỈ chữ trên thẻ), LOGIC là bảng lật + bóng đèn
// (flap / bulbText / bulbs — hổ phách). Đỏ CHỈ cho buzzX. Ngọc = xác suất (block, diện tích ∝ xác suất).
// Một ERA duy nhất: 'stage'. Chuyển cảnh cùng ERA = màn nhung khép–mở (curtain) do trang p1/p2.html lo.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); phông, màn nhung, ô lật, cửa, ảnh duotone, chữ đèn sinh MỘT lần (cache)
// rồi chỉ drawImage — không ctx.filter trong render.
// Toạ độ: hàm nhận (x, y) như ghi ở từng hàm; vật "đứng trên sân khấu" vẽ trong reflect(g, FLOOR, d => …) để có bóng sàn.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js';
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };
/** Tiến độ 0→1 của t trong [a, b]. b < a là lỗi im lặng → ném. */
export const prog = (t, a, b) => { if (b < a) throw new Error(`prog: b < a (${a} → ${b})`); return clamp((t - a) / (b - a)); };
export const PI = Math.PI;

// ── màu: nghĩa cố định cả video (DNA §2, đo WCAG tại chỗ) ──
//   amber  logic / đáp án đã tính (bảng lật, bóng đèn)        pink  trực giác — CHỈ nét bút dạ trên thẻ
//   red    SAI — CHỈ buzzX (viền redD)                        teal  xác suất (block), chữ tealInk trên khối
//   door/frame cửa · ink chữ ngà · dim chữ mờ · label mực nhãn in · cardRed/cardWhite mặt lá bài (vật, không phải màu nghĩa)
export const C = { bg: '#1A0F10', bg2: '#2B1618', amber: '#FFC04A', amberD: '#C27A10', pink: '#B80D66', red: '#E3262B', redD: '#6A0A0E',
  teal: '#2EC4B6', tealInk: '#06231F', door: '#34408A', doorD: '#232C66', frame: '#EADCC0', card: '#F2EBDD', ink: '#F3E6CF',
  dim: '#C9B79E', cell: '#1E1C1D', label: '#2A1A14', velvet: '#5A1A1E', velvetD: '#3A0F12', cardRed: '#9E1B2C', cardWhite: '#F4EEE2' };
export const ERA = { stage: { bg: C.bg, ink: C.ink, accent: C.amber, dim: C.dim } };
export const FLOOR = 780;                                   // mép sân khấu mặc định (y)
export const ARC = '"Archivo"', MONO = '"IBM Plex Mono"';
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

// ───────── chữ (CHỈ Archivo 800/900 hẹp + IBM Plex Mono 500 — DNA §3) ─────────
/** Chữ Archivo (mặc định 800, hẹp) hoặc Plex (o.f = MONO). o: { w, f, align, base, ls, glow, blur, k } — k lộ dần theo ký tự.
 *  Trả về bề rộng cả chuỗi. */
export function text(g, s, x, y, size, color, o = {}) {
  g.save(); g.font = `${o.w || 800} ${size}px ${o.f || ARC}`; g.fontStretch = o.st || (o.f ? 'normal' : 'condensed');
  g.fillStyle = color; g.textAlign = o.align || 'left'; g.textBaseline = o.base || 'alphabetic'; g.letterSpacing = (o.ls || 0) + 'px';
  if (o.glow) { g.shadowColor = o.glow; g.shadowBlur = o.blur || 18; }
  const w = g.measureText(s).width, n = o.k == null ? s.length : Math.round(s.length * clamp(o.k));
  if (n > 0) {
    if (n === s.length) g.fillText(s, x, y);
    else {                                                   // lộ dần, giữ nguyên chỗ đứng của cả chuỗi
      const x0 = g.textAlign === 'center' ? x - w / 2 : g.textAlign === 'right' ? x - w : x;
      g.textAlign = 'left'; g.fillText(s.slice(0, n), x0, y);
    }
  }
  g.restore(); return w;
}
/** Nhãn in Plex Mono HOA, giãn chữ 2.5 (tiêu đề cột, chú thích). */
export const label = (g, s, x, y, color = C.dim, align = 'left', size = 20, k = 1) =>
  text(g, s.toUpperCase(), x, y, size, color, { f: MONO, w: 500, align, ls: 2.5, k });
/** Đo bề rộng chữ như text() (không vẽ). */
let MEAS;
export function textW(s, size, o = {}) {
  MEAS ??= mk(8, 8).getContext('2d');
  MEAS.font = `${o.w || 800} ${size}px ${o.f || ARC}`; MEAS.fontStretch = o.st || (o.f ? 'normal' : 'condensed'); MEAS.letterSpacing = (o.ls || 0) + 'px';
  return MEAS.measureText(s).width;
}

// ───────── phông trường quay: nhung xếp nếp + sunburst rất mờ + vệt đèn + sàn bóng (vẽ MỘT lần mỗi cấu hình) ─────────
export const SPOTS = [[655, 520, 620, 0.16], [1640, 640, 420, 0.13]];
function backdrop(F, spots, sun) {
  const c = mk(), x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, F); gr.addColorStop(0, '#140B0C'); gr.addColorStop(1, C.bg2); x.fillStyle = gr; x.fillRect(0, 0, W, F);
  for (let px = 0; px < W; px += 2) {
    const v = 0.5 + 0.32 * Math.sin(px / 23 + Math.sin(px / 71) * 1.6) + 0.12 * Math.sin(px / 9.3) + (hash(px * 0.37) - 0.5) * 0.08;
    x.fillStyle = v > 0.5 ? `rgba(120,50,45,${(v - 0.5) * 0.16})` : `rgba(0,0,0,${(0.5 - v) * 0.5})`; x.fillRect(px, 0, 2, F);
  }
  x.save(); x.translate(sun, F * 0.42);
  for (let k = 0; k < 28; k++) { const a = k / 28 * PI * 2; x.fillStyle = k % 2 ? 'rgba(255,150,70,0.035)' : 'rgba(0,0,0,0)';
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1400, a, a + PI * 2 / 28); x.fill(); }
  x.restore();
  for (const [sx, sy, r, a] of spots) { const rg = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    rg.addColorStop(0, `rgba(255,170,100,${a})`); rg.addColorStop(1, 'rgba(255,170,100,0)'); x.fillStyle = rg; x.fillRect(0, 0, W, F); }
  const fg = x.createLinearGradient(0, F, 0, H); fg.addColorStop(0, '#1D1011'); fg.addColorStop(1, '#0B0607'); x.fillStyle = fg; x.fillRect(0, F, W, H - F);
  x.strokeStyle = 'rgba(255,200,150,0.05)'; x.lineWidth = 1.5;
  for (let k = -12; k <= 12; k++) { x.beginPath(); x.moveTo(W * 0.4 + k * 60, F); x.lineTo(W * 0.4 + k * 260, H); x.stroke(); }
  x.fillStyle = 'rgba(255,205,160,0.22)'; x.fillRect(0, F, W, 2); x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(0, F + 2, W, 3);
  const vg = x.createRadialGradient(W / 2, H * 0.45, H * 0.45, W / 2, H * 0.5, H * 1.05);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.55)'); x.fillStyle = vg; x.fillRect(0, 0, W, H);
  return c;
}
const BACKS = {};
/** Phông toàn khung (toạ độ màn hình — gọi TRƯỚC khi dịch camera). opts: { floor, spots: [[x,y,r,a]…], sun: x tâm tia }. */
export function ground(g, e = 'stage', { floor = FLOOR, spots = SPOTS, sun = W * 0.36 } = {}) {
  if (!ERA[e]) throw new Error('ground: không có ERA ' + e);
  const key = `${floor}|${sun}|${spots.flat().join(',')}`;
  g.drawImage(BACKS[key] ??= backdrop(floor, spots, sun), 0, 0);
}

// ───────── sàn bóng: vật đứng trên sân khấu vẽ vào lớp tường, lật xuống dưới mép sàn, mờ dần ─────────
let WALL, WX, REF, RX;
/**
 * reflect(g, floor, d => { … }): fn vẽ lên lớp d (cùng phép biến đổi hiện tại của g — camera dịch ngang được); kit in
 * bóng phản chiếu dưới `floor` (alpha 0.30 → 0 trong `depth` px) rồi in lớp lên g. Chỉ cho vật ĐỨNG TRÊN sàn (cửa, bảng
 * treo, dê, bục); thẻ trực giác, nhân vật, chữ chú thích vẽ ngoài.
 */
export function reflect(g, floor, fn, { depth = 230, alpha = 0.3 } = {}) {
  if (!WALL) { WALL = mk(); WX = WALL.getContext('2d'); REF = mk(); RX = REF.getContext('2d'); }
  const m = g.getTransform(), F = m.d * floor + m.f;
  WX.setTransform(1, 0, 0, 1, 0, 0); WX.clearRect(0, 0, W, H); WX.setTransform(m); WX.globalAlpha = 1; fn(WX);
  WX.setTransform(1, 0, 0, 1, 0, 0);
  RX.setTransform(1, 0, 0, 1, 0, 0); RX.clearRect(0, 0, W, H); RX.setTransform(1, 0, 0, -1, 0, 2 * F + 6); RX.drawImage(WALL, 0, 0);
  RX.setTransform(1, 0, 0, 1, 0, 0); RX.globalCompositeOperation = 'destination-in';
  const fg = RX.createLinearGradient(0, 0, 0, H), a = clamp(F / H), b = clamp((F + depth) / H);
  fg.addColorStop(0, 'rgba(0,0,0,0)'); fg.addColorStop(Math.max(0, a - 0.0005), 'rgba(0,0,0,0)'); fg.addColorStop(a, `rgba(0,0,0,${alpha})`);
  fg.addColorStop(Math.max(a, b), 'rgba(0,0,0,0)'); fg.addColorStop(1, 'rgba(0,0,0,0)');
  RX.fillStyle = fg; RX.fillRect(0, 0, W, H); RX.globalCompositeOperation = 'source-over';
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(REF, 0, 0); g.drawImage(WALL, 0, 0); g.restore();
}

// ───────── bóng đèn + khung đèn chạy ─────────
/** Một bóng đèn tròn: tắt = thuỷ tinh hổ phách tối; sáng = lõi trắng ấm → hổ phách + quầng. */
export function bulb(g, x, y, r, on) {
  g.save();
  if (on) { g.shadowColor = 'rgba(255,180,60,0.9)'; g.shadowBlur = r * 2.6;
    const rg = g.createRadialGradient(x - r * 0.25, y - r * 0.25, 0, x, y, r); rg.addColorStop(0, '#FFF7DC'); rg.addColorStop(0.45, '#FFCF6A');
    rg.addColorStop(1, '#D98A14'); g.fillStyle = rg; }
  else { const rg = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r); rg.addColorStop(0, '#6E5232'); rg.addColorStop(1, '#2E1F12'); g.fillStyle = rg; }
  g.beginPath(); g.arc(x, y, r, 0, PI * 2); g.fill(); g.restore();
  g.fillStyle = on ? 'rgba(255,255,255,0.85)' : 'rgba(255,230,190,0.25)'; g.beginPath(); g.arc(x - r * 0.35, y - r * 0.35, r * 0.22, 0, PI * 2); g.fill();
}
/**
 * Khung sơn mài đỏ thẫm + ô đen bên trong + hàng bóng đèn chạy quanh viền (lab "marquee"). (x, y, w, h) = mép ngoài.
 * Đèn chạy theo t (8 bước/s, cứ 3 bóng tắt 1) — KHÔNG tính là thay đổi hình (DNA §4). opts { pad, r, step, lit: false = tắt hết }.
 * Trả về ô trong { x, y, w, h }.
 */
export function bulbs(g, x, y, w, h, t, o = {}) {
  const pad = o.pad || 22, r = o.r || 7;
  g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 30; g.shadowOffsetY = 12;
  const fr = g.createLinearGradient(0, y, 0, y + h); fr.addColorStop(0, C.velvet); fr.addColorStop(1, C.velvetD); g.fillStyle = fr; rr(g, x, y, w, h, 14); g.fill(); g.restore();
  g.strokeStyle = 'rgba(255,210,170,0.25)'; g.lineWidth = 2; rr(g, x + 3, y + 3, w - 6, h - 6, 12); g.stroke();
  const inner = { x: x + pad * 1.6, y: y + pad * 1.6, w: w - pad * 3.2, h: h - pad * 3.2 };
  g.fillStyle = '#0E0B0B'; rr(g, inner.x, inner.y, inner.w, inner.h, 6); g.fill();
  const iw = w - 2 * pad, ih = h - 2 * pad, per = 2 * (iw + ih), n = Math.max(4, Math.round(per / (o.step || 34))), step = per / n, ph = Math.floor(t * 8);
  for (let i = 0; i < n; i++) {
    let d = i * step, bx, by;
    if (d < iw) { bx = x + pad + d; by = y + pad; } else if ((d -= iw) < ih) { bx = x + w - pad; by = y + pad + d; }
    else if ((d -= ih) < iw) { bx = x + w - pad - d; by = y + h - pad; } else { d -= iw; bx = x + pad; by = y + h - pad - d; }
    bulb(g, bx, by, r, o.lit !== false && (i + ph) % 3 !== 0);
  }
  return inner;
}

// ───────── bảng lật Solari ─────────
const CELL = {};
function cellCanvas(ch, w, h, color) {
  const key = `${ch}|${w}|${h}|${color}`; if (CELL[key]) return CELL[key];
  const c = mk(w, h), x = c.getContext('2d');
  const t = x.createLinearGradient(0, 0, 0, h / 2); t.addColorStop(0, '#2C292A'); t.addColorStop(1, '#211F20');
  x.fillStyle = t; x.beginPath(); x.roundRect(0, 0, w, h / 2 + 1, [5, 5, 1, 1]); x.fill();
  const b = x.createLinearGradient(0, h / 2, 0, h); b.addColorStop(0, '#1A1819'); b.addColorStop(1, '#121011');
  x.fillStyle = b; x.beginPath(); x.roundRect(0, h / 2, w, h / 2, [1, 1, 5, 5]); x.fill();
  if (ch !== ' ' && ch !== '·') {
    x.font = `800 ${Math.round(h * 0.74)}px ${ARC}`; x.fontStretch = 'condensed'; x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    const mw = x.measureText(ch).width;                    // ký tự rộng (…, →, %) co cho vừa ô
    if (mw > w * 0.92) { x.save(); x.translate(w / 2, 0); x.scale(w * 0.92 / mw, 1); x.fillText(ch, 0, h / 2 + h * 0.265); x.restore(); }
    else x.fillText(ch, w / 2, h / 2 + h * 0.265);
    x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(0, h / 2, w, h / 2);
  }
  x.fillStyle = '#040303'; x.fillRect(0, h / 2 - 1.5, w, 3);
  x.fillStyle = 'rgba(255,255,255,0.07)'; x.fillRect(0, h / 2 + 1.5, w, 1);
  x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(2, 1, w - 4, 1);
  x.fillStyle = '#5A5452'; x.fillRect(-1, h / 2 - 4, 3, 8); x.fillRect(w - 2, h / 2 - 4, 3, 8);
  return (CELL[key] = c);
}
// ô đang lật (θ 0→π): tấm trên đã là ký tự mới, tấm dưới còn ký tự cũ; lá lật gập quanh bản lề, co theo cos θ, mép tự do
// phình ra, tối dần theo góc; nửa sau lá mang nửa dưới ký tự mới rơi xuống, có vệt rơi.
function flipCell(g, x, y, w, h, oldC, newC, th, color) {
  const A = cellCanvas(oldC, w, h, color), B = cellCanvas(newC, w, h, color), m = h / 2, N = 24;
  g.drawImage(B, 0, 0, w, m, x, y, w, m);
  g.drawImage(A, 0, m, w, m, x, y + m, w, m);
  if (th < PI / 2) {
    const k = Math.cos(th), sp = Math.sin(th) * 0.3;
    for (let i = 0; i < N; i++) { const u0 = i / N, hh = m / N, ww = w * (1 + sp * (1 - u0));
      g.drawImage(A, 0, u0 * m, w, hh + 0.6, x + (w - ww) / 2, y + m - (1 - u0) * m * k, ww, hh * k + 0.8); }
    const top = y + m - m * k, gw = w * (1 + sp);
    g.fillStyle = `rgba(0,0,0,${0.15 + 0.45 * (1 - k)})`;
    g.beginPath(); g.moveTo(x + (w - gw) / 2, top); g.lineTo(x + (w + gw) / 2, top); g.lineTo(x + w, y + m); g.lineTo(x, y + m); g.fill();
    g.fillStyle = 'rgba(255,220,170,0.35)'; g.fillRect(x + (w - gw) / 2, top - 1, gw, 2);
  } else {
    const k = -Math.cos(th), sp = Math.sin(th) * 0.3, bot = y + m + m * k, gw = w * (1 + sp);
    g.save(); g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 12; g.shadowOffsetY = 6;
    g.fillStyle = '#121011'; g.beginPath(); g.moveTo(x, y + m); g.lineTo(x + w, y + m); g.lineTo(x + (w + gw) / 2, bot); g.lineTo(x + (w - gw) / 2, bot); g.fill(); g.restore();
    for (let i = 0; i < N; i++) { const u0 = i / N, hh = m / N, ww = w * (1 + sp * u0);
      g.drawImage(B, 0, m + u0 * m, w, hh + 0.6, x + (w - ww) / 2, y + m + u0 * m * k, ww, hh * k + 0.8); }
    g.fillStyle = `rgba(0,0,0,${0.1 + 0.4 * (1 - k)})`;
    g.beginPath(); g.moveTo(x, y + m); g.lineTo(x + w, y + m); g.lineTo(x + (w + gw) / 2, bot); g.lineTo(x + (w - gw) / 2, bot); g.fill();
    g.fillStyle = 'rgba(255,220,170,0.4)'; g.fillRect(x + (w - gw) / 2, bot - 1, gw, 2);
    for (let j = 1; j <= 3; j++) { g.fillStyle = `rgba(255,192,74,${0.14 - j * 0.035})`; g.fillRect(x + (w - gw) / 2 - j * 2, bot + j * 5, gw + j * 4, 1.5); }
  }
  g.fillStyle = '#040303'; g.fillRect(x - 1, y + m - 1.5, w + 2, 3);
}
const cellOf = (g, x, y, w, h, ch, color) => {
  g.drawImage(cellCanvas(ch, w, h, color), x, y);
  if (ch === '·') bulb(g, x + w / 2, y + h / 2, w * 0.17, true);
};
/** Bề rộng một hàng n ô (cell = bề rộng ô, gap mặc định 0.13·cell). s = chuỗi hoặc số ô. */
export const flapW = (s, cell, gap = Math.round(cell * 0.13)) => { const n = typeof s === 'number' ? s : [...s].length; return n * (cell + gap) - gap; };
/** Canh giữa chuỗi trong n ô (đệm khoảng trắng hai bên) — giữ chỗ cố định khi hai chuỗi lật qua nhau. */
export const ctr = (s, n) => { const a = [...s]; if (a.length > n) throw new Error(`ctr: "${s}" dài ${a.length} > ${n} ô`); const l = Math.floor((n - a.length) / 2); return ' '.repeat(l) + s + ' '.repeat(n - a.length - l); };
/**
 * Một hàng bảng lật. (x, y) = góc trên trái ô đầu; cell = bề rộng ô (cao h = 1.64·cell). k ∈ [0,1]: ký tự lật vào TỪNG
 * ô một, trái → phải, mỗi ô gập trong `dur` nhịp ô (thấy lá đang gập). opts.from = chuỗi cũ (ô trùng ký tự không lật);
 * '·' = bóng đèn giữa ô. Ký tự rộng tự co cho vừa ô. Trả về x mép phải.
 * Một hàng = MỘT tiếng `flap` (DNA §10) ở lúc k bắt đầu.
 */
export function flap(g, s, x, y, cell, k = 1, { from = '', h = Math.round(cell * 1.64), gap = Math.round(cell * 0.13), color = C.amber, dur = 2.2 } = {}) {
  const A = [...s], B = [...from], n = Math.max(A.length, B.length);
  for (let i = 0; i < n; i++) {
    const nw = A[i] ?? ' ', od = B[i] ?? ' ', cx = x + i * (cell + gap);
    const f = clamp((k * (n + dur) - i) / dur);
    if (nw === od || f >= 1) { cellOf(g, cx, y, cell, h, nw, color); continue; }
    if (f <= 0) { cellOf(g, cx, y, cell, h, od, color); continue; }
    flipCell(g, cx, y, cell, h, od === '·' ? ' ' : od, nw === '·' ? ' ' : nw, f * PI, color);
    if (f > 0.75 && nw === '·') bulb(g, cx + cell / 2, y + h / 2, cell * 0.17, true);
  }
  return x + n * (cell + gap) - gap;
}
/** Ô lật mãi (0.999…): cứ `per` giây ô gập qua một lần ra lại cùng ký tự. Vẽ một ô tại (x, y). */
export function flapSpin(g, ch, x, y, cell, t, { h = Math.round(cell * 1.64), per = 0.5, color = C.amber } = {}) {
  const u = t / per - Math.floor(t / per);
  if (u < 0.55) flipCell(g, x, y, cell, h, ch, ch, (u / 0.55) * PI, color); else cellOf(g, x, y, cell, h, ch, color);
}

// ───────── chữ bằng bóng đèn (như số "1" của lab) ─────────
const BT = {};
function bulbGlyph(s, size, pitch) {
  const key = `${s}|${size}|${pitch}`; if (BT[key]) return BT[key];
  const w0 = Math.ceil(textW(s, size, { w: 900 })) + 4, hh = Math.ceil(size * 1.0), c = mk(w0, hh), x = c.getContext('2d', { willReadFrequently: true });
  x.font = `900 ${size}px ${ARC}`; x.fontStretch = 'condensed'; x.fillStyle = '#fff'; x.textBaseline = 'alphabetic'; x.fillText(s, 2, size * 0.94);
  const d = x.getImageData(0, 0, w0, hh).data, pts = [];
  for (let y = pitch / 2; y < hh; y += pitch) for (let px = pitch / 2; px < w0; px += pitch) if (d[((y | 0) * w0 + (px | 0)) * 4 + 3] > 128) pts.push([px, y]);
  return (BT[key] = { pts, w: w0 });
}
/**
 * Chữ/số bằng bóng đèn (bảng đèn): (x, y) = đỉnh trái (align 'center' → x là tâm). size = cỡ Archivo 900 hẹp gốc.
 * k ∈ [0,1] bật dần (trên → dưới); bóng chưa bật vẽ tắt (opts.off = false để ẩn). Trả về bề rộng.
 */
export function bulbText(g, s, x, y, size, k = 1, { align = 'left', pitch = Math.max(8, Math.round(size / 13)), r = null, off = true } = {}) {
  const G = bulbGlyph(s, size, pitch), x0 = align === 'center' ? x - G.w / 2 : align === 'right' ? x - G.w : x, rad = r ?? pitch * 0.36;
  const n = Math.round(G.pts.length * clamp(k));
  G.pts.forEach(([px, py], i) => { if (i < n || off) bulb(g, x0 + px, y + py, rad, i < n); });
  return G.w;
}

// ───────── cửa sơn: khung kem, cánh chàm hai ô lõm, số sơn kem; mở về phía người xem, bản lề phải ─────────
const DOORS = {};
function doorFace(w, h, num) {
  const key = `${w}|${h}|${num}`; if (DOORS[key]) return DOORS[key];
  const c = mk(w, h), x = c.getContext('2d');
  const dg = x.createLinearGradient(0, 0, w, 0); dg.addColorStop(0, '#3A4796'); dg.addColorStop(1, '#2C377A'); x.fillStyle = dg; x.fillRect(0, 0, w, h);
  const panel = (px, py, pw, ph) => { x.fillStyle = 'rgba(0,0,0,0.22)'; x.fillRect(px, py, pw, ph);
    x.fillStyle = 'rgba(255,255,255,0.10)'; x.fillRect(px, py + ph - 3, pw, 3); x.fillRect(px + pw - 3, py, 3, ph);
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(px, py, pw, 3); x.fillRect(px, py, 3, ph); };
  panel(w * 0.12, h * 0.07, w * 0.76, h * 0.5); panel(w * 0.12, h * 0.63, w * 0.76, h * 0.3);
  if (num != null && num !== '') {
    x.font = `900 ${Math.round(h * 0.42)}px ${ARC}`; x.fontStretch = 'condensed'; x.textAlign = 'center';
    const s = String(num), mw = x.measureText(s).width, sc = Math.min(1, w * 0.7 / mw);
    x.save(); x.translate(w / 2, h * 0.5); x.scale(sc, 1);
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillText(s, 5 / sc, 6); x.fillStyle = '#F4E8CF'; x.fillText(s, 0, 0); x.restore();
  }
  const kr = Math.max(3, w * 0.033);
  x.fillStyle = '#B8BCC4'; x.beginPath(); x.arc(w * 0.84, h * 0.6, kr, 0, PI * 2); x.fill();
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(w * 0.84 - kr / 3, h * 0.6 - kr / 3, kr / 3, 0, PI * 2); x.fill();
  return (DOORS[key] = c);
}
/**
 * Cửa sơn. (x, y) = góc trên trái ô cửa (khung kem vẽ thêm ra ngoài 0.06·w), w × h. open ∈ [0,1]: cánh quay quanh bản
 * lề phải ra phía người xem (1 = mở hẳn, cánh nhô 0.36·w bên phải). behind: 'goat' | 'car' | 'empty' | fn(g, x, y, w, h).
 * Một lần mở = một tiếng `door`.
 */
export function door(g, x, y, w, h, num, open = 0, { behind = 'empty', frame = true } = {}) {
  const f = Math.max(5, Math.round(w * 0.06));
  if (frame) {
    g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 24; g.shadowOffsetY = 10; g.fillStyle = C.frame; g.fillRect(x - f, y - f, w + 2 * f, h + f); g.restore();
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x - f, y - f, w + 2 * f, 3);
    g.fillStyle = 'rgba(90,60,30,0.35)'; g.fillRect(x - 5, y - 5, w + 10, h + 5);
  }
  const o = clamp(open);
  if (o <= 0) { g.drawImage(doorFace(w, h, num), x, y); return; }
  const ig = g.createLinearGradient(0, y, 0, y + h); ig.addColorStop(0, '#5A3A26'); ig.addColorStop(0.75, C.label); ig.addColorStop(1, '#3A2418');
  g.fillStyle = ig; g.fillRect(x, y, w, h);
  const lg = g.createRadialGradient(x + w / 2, y, 0, x + w / 2, y, h * 0.9); lg.addColorStop(0, 'rgba(255,200,140,0.35)'); lg.addColorStop(1, 'rgba(255,200,140,0)');
  g.fillStyle = lg; g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(x, y + h * 0.78, w, 2);
  g.save(); g.beginPath(); g.rect(x, y - h, w, 2 * h); g.clip();
  const s = w / 208;
  if (behind === 'goat') goat(g, x + w * 0.04, y + h - 154 * s, s);
  else if (behind === 'car') car(g, x + w * 0.02, y + h - 108 * s * 0.95, s * 0.95);
  else if (typeof behind === 'function') behind(g, x, y, w, h);
  g.restore();
  // cánh: φ từ 0 (đóng) tới π − acos(0.36) (mở, mép tự do nhô 0.36·w ra phải); mặt trước có số khi φ < 90°
  const phi = o * (PI - Math.acos(0.36)), cs = Math.cos(phi), sn = Math.sin(phi), F = doorFace(w, h, phi < PI / 2 ? num : null), N = 40;
  g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 20;
  for (let i = 0; i < N; i++) {
    const u0 = i / N, u1 = (i + 1) / N, X0 = x + w - u0 * w * cs, X1 = x + w - u1 * w * cs, hh = h * (1 + u0 * 0.13 * sn);
    const col = cs >= 0 ? (1 - u1) * w : u0 * w;           // mặt trước: u = 0 ở bản lề (mép phải ảnh)
    g.drawImage(F, Math.max(0, Math.min(w - w / N, col)), 0, w / N, h, Math.min(X0, X1), y + h - hh + u0 * 6 * sn, Math.abs(X1 - X0) + 0.8, hh);
  }
  g.restore();
  const ex = x + w - w * cs, top = y - h * 0.13 * sn + 6 * sn;
  g.fillStyle = `rgba(0,0,0,${0.28 * sn + 0.1 * (1 - cs) / 2})`;
  g.beginPath(); g.moveTo(x + w + 1, y); g.lineTo(ex, top); g.lineTo(ex, y + h + 6 * sn); g.lineTo(x + w + 1, y + h); g.fill();
}

// ───────── dê / xe bìa cứng (bóng cạnh bìa lệch, viền đen dày) ─────────
/** Dê bìa: (x, y) = góc trên trái hộp 182 × 152 ở s = 1 (chân chạm y + 150·s). flip = quay mặt sang phải. */
export function goat(g, x, y, s, { flip = false } = {}) {
  const body = [[10, 58], [6, 47], [13, 34], [25, 25], [38, 23], [48, 31], [56, 45], [70, 53], [108, 50], [148, 52], [166, 57], [178, 46], [182, 52],
    [174, 70], [172, 98], [176, 150], [162, 150], [158, 108], [150, 104], [140, 106], [140, 150], [127, 150], [124, 108], [92, 109],
    [86, 106], [86, 150], [73, 150], [71, 112], [66, 112], [66, 150], [53, 150], [52, 104], [48, 86], [40, 71], [33, 73], [30, 90], [23, 74], [17, 65]];
  const path = () => { g.beginPath(); body.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.closePath(); };
  g.save(); g.translate(x, y); g.scale(s, s); if (flip) { g.translate(184, 0); g.scale(-1, 1); } g.lineJoin = 'round'; g.lineCap = 'round';
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.beginPath(); g.ellipse(96, 152, 92, 7, 0, 0, PI * 2); g.fill();
  g.save(); g.translate(5, 4); path(); g.fillStyle = '#8C6A44'; g.fill(); g.restore();
  g.beginPath(); g.moveTo(30, 26); g.quadraticCurveTo(36, 2, 58, 6); g.quadraticCurveTo(44, 10, 40, 27); g.closePath();
  g.fillStyle = '#D8C7A6'; g.fill(); g.strokeStyle = '#1C1414'; g.lineWidth = 5; g.stroke();
  path(); g.fillStyle = '#EFE6D6'; g.fill();
  g.save(); path(); g.clip(); g.fillStyle = '#D6C4A6';
  g.beginPath(); g.ellipse(120, 70, 22, 14, 0.3, 0, PI * 2); g.fill(); g.beginPath(); g.ellipse(82, 64, 12, 9, -0.2, 0, PI * 2); g.fill(); g.restore();
  path(); g.strokeStyle = '#1C1414'; g.lineWidth = 6; g.stroke();
  g.beginPath(); g.moveTo(46, 33); g.quadraticCurveTo(66, 30, 70, 42); g.quadraticCurveTo(58, 44, 48, 40); g.closePath(); g.fillStyle = '#E2D3B8'; g.fill(); g.lineWidth = 4.5; g.stroke();
  g.fillStyle = '#1C1414'; g.beginPath(); g.arc(25, 38, 3.6, 0, PI * 2); g.fill();
  g.beginPath(); g.moveTo(9, 52); g.lineTo(14, 53); g.lineWidth = 3; g.stroke();
  g.restore();
}
/** Xe bìa (giải thưởng): (x, y) = góc trên trái hộp 200 × 110 ở s = 1 (bánh chạm y + 110·s). Kem viền đen, kính chàm. */
export function car(g, x, y, s, { flip = false } = {}) {
  const body = [[8, 82], [12, 60], [40, 53], [64, 26], [134, 24], [162, 52], [192, 58], [198, 80], [192, 94], [8, 94]];
  const path = () => { g.beginPath(); body.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.closePath(); };
  g.save(); g.translate(x, y); g.scale(s, s); if (flip) { g.translate(204, 0); g.scale(-1, 1); } g.lineJoin = 'round'; g.lineCap = 'round';
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.beginPath(); g.ellipse(104, 110, 100, 7, 0, 0, PI * 2); g.fill();
  g.save(); g.translate(5, 4); path(); g.fillStyle = '#8C6A44'; g.fill(); g.restore();
  path(); g.fillStyle = '#EFE6D6'; g.fill(); g.strokeStyle = '#1C1414'; g.lineWidth = 6; g.stroke();
  for (const win of [[[70, 33], [98, 33], [98, 52], [52, 54]], [[104, 33], [130, 33], [152, 52], [104, 52]]]) {
    g.beginPath(); win.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.closePath();
    g.fillStyle = C.door; g.fill(); g.lineWidth = 4; g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.3)'; g.fillRect(win[0][0] + 6, win[0][1] + 4, 4, 12);
  }
  g.lineWidth = 3; g.beginPath(); g.moveTo(101, 54); g.lineTo(101, 90); g.stroke(); g.beginPath(); g.moveTo(112, 64); g.lineTo(122, 64); g.stroke();
  g.fillStyle = '#E8D6A8'; g.beginPath(); g.arc(190, 68, 5, 0, PI * 2); g.fill(); g.lineWidth = 3; g.stroke();
  for (const wx of [50, 156]) {
    g.fillStyle = '#1C1414'; g.beginPath(); g.arc(wx, 94, 16, 0, PI * 2); g.fill();
    g.fillStyle = '#B8BCC4'; g.beginPath(); g.arc(wx, 94, 6, 0, PI * 2); g.fill();
  }
  g.restore();
}

// ───────── lá bài bìa (hộp Bertrand): mặt đỏ / mặt trắng ─────────
/**
 * Lá bài tâm (x, y), w × h. faces = 'RW' (hai mặt: R đỏ, W trắng). showing = chỉ số mặt đang ngửa; flip ∈ [0,1] = lật
 * sang mặt kia (co theo cos, đổi mặt ở giữa). opts { rot, alpha, squash (dẹt dọc, nằm trên bàn) }.
 * Đỏ lá bài (#B42435→#851526) là màu VẬT, khác đỏ còi sai: không viền, có hoa văn thoi.
 */
export function playingCard(g, x, y, w, h, faces, showing = 0, flip = 0, { rot = 0, alpha = 1, squash = 1 } = {}) {
  const F = [...faces]; if (F.length !== 2 || F.some(f => f !== 'R' && f !== 'W')) throw new Error('playingCard: faces phải như "RW"');
  const fl = clamp(flip), face = F[fl < 0.5 ? showing : 1 - showing], sx = Math.max(0.02, Math.abs(Math.cos(PI * fl)));
  g.save(); g.globalAlpha *= alpha; g.translate(x, y); g.rotate(rot); g.scale(sx, squash);
  const red = face === 'R', r = w * 0.07;
  g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 18; g.shadowOffsetX = 5; g.shadowOffsetY = 9;
  g.fillStyle = '#B9A88C'; rr(g, -w / 2 + 4, -h / 2 + 5, w, h, r); g.fill(); g.restore();
  const cg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  if (red) { cg.addColorStop(0, '#B42435'); cg.addColorStop(1, '#851526'); } else { cg.addColorStop(0, '#FBF7EE'); cg.addColorStop(1, '#E6DCC8'); }
  g.fillStyle = cg; rr(g, -w / 2, -h / 2, w, h, r); g.fill();
  g.strokeStyle = red ? 'rgba(255,225,200,0.45)' : 'rgba(120,40,40,0.28)'; g.lineWidth = Math.max(1.5, w * 0.022);
  rr(g, -w / 2 + w * 0.09, -h / 2 + w * 0.09, w - w * 0.18, h - w * 0.18, r * 0.6); g.stroke();
  g.beginPath(); g.moveTo(0, -h * 0.2); g.lineTo(w * 0.17, 0); g.lineTo(0, h * 0.2); g.lineTo(-w * 0.17, 0); g.closePath();
  g.fillStyle = red ? 'rgba(255,225,200,0.22)' : 'rgba(120,40,40,0.12)'; g.fill();
  g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(-w / 2 + r, -h / 2 + 3, w - 2 * r, 2);
  g.restore();
}

// ───────── bút dạ: glyph nét path, đầu tròn, lệch theo hash, mỗi nét in hai lần (đậm + vệt sáng mảnh) ─────────
const circ = (cx, cy, rx, ry, n = 26, a0 = -1.9) => ['c', ...Array.from({ length: n + 3 }, (_, i) => { const a = a0 + i / n * PI * 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; })];
const ell = (cx, rx) => circ(cx, 0.5, rx, 0.49);
const DOT = (x, y) => [[x, y], [x + 0.005, y + 0.01]];
// [bề rộng, [nét…]] trong ô cao 1 (0 = đỉnh chữ, 1 = chân). 'c' đầu nét = đường cong qua điểm giữa (điểm là điểm điều khiển).
const GLY = {
  'A': [0.6, [[[0.0, 1.0], [0.3, 0.0], [0.6, 1.0]], [[0.12, 0.64], [0.48, 0.63]]]],
  'B': [0.56, [[[0.06, 1.0], [0.06, 0.0]], ['c', [0.06, 0.0], [0.34, 0.0], [0.5, 0.1], [0.48, 0.3], [0.3, 0.48], [0.06, 0.48]], ['c', [0.06, 0.48], [0.38, 0.48], [0.56, 0.62], [0.54, 0.84], [0.36, 1.0], [0.06, 1.0]]]],
  'C': [0.58, [['c', [0.56, 0.15], [0.42, 0.0], [0.2, 0.02], [0.04, 0.25], [0.04, 0.75], [0.2, 0.98], [0.42, 1.0], [0.58, 0.85]]]],
  'D': [0.62, [[[0.06, 0.0], [0.06, 1.0]], ['c', [0.06, 0.0], [0.3, 0.0], [0.56, 0.12], [0.6, 0.5], [0.56, 0.88], [0.3, 1.0], [0.06, 1.0]]]],
  'E': [0.5, [[[0.48, 0.0], [0.06, 0.0], [0.06, 1.0], [0.48, 1.0]], [[0.06, 0.5], [0.4, 0.49]]]],
  'F': [0.5, [[[0.48, 0.0], [0.06, 0.0], [0.06, 1.0]], [[0.06, 0.48], [0.4, 0.48]]]],
  'G': [0.64, [['c', [0.58, 0.14], [0.42, 0.0], [0.2, 0.02], [0.04, 0.25], [0.04, 0.75], [0.2, 0.98], [0.44, 1.0], [0.6, 0.85], [0.6, 0.56]], [[0.6, 0.56], [0.36, 0.56]]]],
  'H': [0.58, [[[0.06, 0.0], [0.06, 1.0]], [[0.52, 0.0], [0.52, 1.0]], [[0.06, 0.5], [0.52, 0.5]]]],
  'I': [0.16, [[[0.08, 0.0], [0.08, 1.0]]]],
  'J': [0.48, [['c', [0.42, 0.0], [0.42, 0.7], [0.38, 0.95], [0.2, 1.0], [0.02, 0.85]]]],
  'K': [0.56, [[[0.06, 0.0], [0.06, 1.0]], [[0.52, 0.0], [0.06, 0.58]], [[0.22, 0.44], [0.56, 1.0]]]],
  'L': [0.48, [[[0.06, 0.0], [0.06, 1.0], [0.46, 0.99]]]],
  'M': [0.72, [[[0.04, 1.0], [0.08, 0.0], [0.36, 0.66], [0.64, 0.0], [0.68, 1.0]]]],
  'N': [0.6, [[[0.06, 1.0], [0.06, 0.0], [0.54, 1.0], [0.54, 0.0]]]],
  'O': [0.68, [ell(0.34, 0.32)]],
  'P': [0.56, [[[0.06, 1.0], [0.06, 0.0]], ['c', [0.06, 0.0], [0.32, 0.0], [0.52, 0.08], [0.54, 0.28], [0.34, 0.52], [0.06, 0.52]]]],
  'Q': [0.7, [ell(0.34, 0.32), [[0.4, 0.7], [0.68, 1.04]]]],
  'R': [0.58, [['c', [0.06, 1.0], [0.06, 0.0], [0.3, 0.0], [0.48, 0.07], [0.53, 0.24], [0.46, 0.42], [0.26, 0.5], [0.06, 0.5]], [[0.26, 0.5], [0.56, 1.0]]]],
  'S': [0.6, [['c', [0.54, 0.13], [0.42, 0.02], [0.22, 0.02], [0.07, 0.13], [0.09, 0.32], [0.26, 0.45], [0.44, 0.55], [0.57, 0.71], [0.53, 0.89], [0.36, 0.99], [0.16, 0.97], [0.03, 0.86]]]],
  'T': [0.58, [[[0.0, 0.03], [0.58, 0.01]], [[0.29, 0.02], [0.3, 1.0]]]],
  'U': [0.6, [['c', [0.06, 0.0], [0.06, 0.72], [0.14, 0.96], [0.3, 1.0], [0.46, 0.96], [0.54, 0.72], [0.54, 0.0]]]],
  'V': [0.6, [[[0.0, 0.0], [0.3, 1.0], [0.6, 0.0]]]],
  'W': [0.78, [[[0.0, 0.0], [0.18, 1.0], [0.38, 0.3], [0.58, 1.0], [0.76, 0.0]]]],
  'X': [0.58, [[[0.04, 0.0], [0.54, 1.0]], [[0.54, 0.0], [0.04, 1.0]]]],
  'Y': [0.6, [[[0.02, 0.0], [0.3, 0.5], [0.58, 0.0]], [[0.3, 0.5], [0.3, 1.0]]]],
  'Z': [0.6, [[[0.04, 0.02], [0.54, 0.0], [0.04, 1.0], [0.56, 0.98]]]],
  '0': [0.62, [ell(0.31, 0.29)]],
  '1': [0.4, [[[0.06, 0.2], [0.28, 0.0], [0.28, 1.0]]]],
  '2': [0.6, [['c', [0.06, 0.22], [0.14, 0.04], [0.32, 0.0], [0.5, 0.08], [0.52, 0.3], [0.3, 0.6], [0.04, 1.0]], [[0.04, 1.0], [0.56, 0.98]]]],
  '3': [0.6, [['c', [0.06, 0.1], [0.26, 0.0], [0.48, 0.06], [0.5, 0.24], [0.24, 0.46]], ['c', [0.24, 0.46], [0.54, 0.56], [0.56, 0.8], [0.4, 1.0], [0.16, 0.98], [0.02, 0.86]]]],
  '4': [0.62, [[[0.44, 1.0], [0.44, 0.0], [0.02, 0.68], [0.6, 0.68]]]],
  '5': [0.62, [[[0.55, 0.03], [0.14, 0.03], [0.09, 0.45]], ['c', [0.09, 0.45], [0.3, 0.37], [0.5, 0.42], [0.59, 0.63], [0.52, 0.87], [0.3, 0.98], [0.05, 0.9]]]],
  '6': [0.6, [['c', [0.5, 0.04], [0.3, 0.02], [0.1, 0.25], [0.06, 0.65], [0.14, 0.95], [0.32, 1.0], [0.5, 0.92], [0.56, 0.7], [0.46, 0.5], [0.28, 0.46], [0.08, 0.58]]]],
  '7': [0.58, [[[0.02, 0.02], [0.56, 0.0], [0.22, 1.0]]]],
  '8': [0.6, [['c', [0.3, 0.48], [0.08, 0.38], [0.08, 0.12], [0.3, 0.0], [0.52, 0.12], [0.52, 0.38], [0.3, 0.48], [0.04, 0.6], [0.04, 0.9], [0.3, 1.0], [0.56, 0.9], [0.56, 0.6], [0.3, 0.48]]]],
  '9': [0.6, [['c', [0.52, 0.42], [0.32, 0.54], [0.1, 0.46], [0.04, 0.24], [0.18, 0.02], [0.4, 0.02], [0.54, 0.22], [0.52, 0.6], [0.4, 0.92], [0.16, 0.98]]]],
  '%': [0.68, [[[0.62, 0.0], [0.08, 1.0]], circ(0.15, 0.17, 0.12, 0.15), circ(0.54, 0.82, 0.12, 0.15)]],
  '/': [0.46, [[[0.44, 0.0], [0.02, 1.0]]]],
  '?': [0.56, [['c', [0.06, 0.2], [0.16, 0.02], [0.36, 0.0], [0.52, 0.12], [0.5, 0.32], [0.28, 0.5], [0.26, 0.72]], DOT(0.26, 0.95)]],
  '!': [0.2, [[[0.1, 0.0], [0.1, 0.7]], DOT(0.1, 0.95)]],
  '.': [0.16, [DOT(0.08, 0.95)]],
  ',': [0.16, [[[0.1, 0.9], [0.04, 1.12]]]],
  "'": [0.16, [[[0.08, 0.0], [0.06, 0.22]]]],
  '–': [0.5, [[[0.04, 0.55], [0.46, 0.55]]]],
  ' ': [0.34, []],
};
GLY['-'] = GLY['–'];
export const MARKER_GLYPHS = Object.keys(GLY).join('');
const glyph = ch => { const gl = GLY[ch]; if (!gl) throw new Error(`marker: không có glyph "${ch}" (có: ${MARKER_GLYPHS})`); return gl; };
/** Bề rộng chữ bút dạ cao h (ném lỗi khi có ký tự ngoài bộ glyph). */
export const markerW = (s, h, track = 0.16) => [...s].reduce((a, ch) => a + glyph(ch)[0] * h + h * track, 0) - h * track;
function sampleStroke(P, sm) {                               // nét cong → gấp khúc dày (vẽ dở được theo độ dài)
  if (!sm) return P;
  const out = [P[0]], q = (a, b, c, u) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * b[0] + u * u * c[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * b[1] + u * u * c[1]];
  let cur = P[0];
  for (let i = 1; i < P.length - 1; i++) {
    const end = i < P.length - 2 ? [(P[i][0] + P[i + 1][0]) / 2, (P[i][1] + P[i + 1][1]) / 2] : P[P.length - 1];
    for (let j = 1; j <= 8; j++) out.push(q(cur, P[i], end, j / 8));
    cur = end;
  }
  if (P.length === 2) out.push(P[1]);
  return out;
}
const MK = {};
// mọi nét của một khối chữ (nhiều dòng, canh giữa quanh 0,0), đã lệch hash, kèm độ dài
function markerLayout(lines, lh, seed) {
  const key = `${lines.join('\n')}|${lh}|${seed}`; if (MK[key]) return MK[key];
  const strokes = [], track = 0.16, tot = lines.length * lh * 1.32 - lh * 0.32;
  lines.forEach((s, li) => {
    const x = -markerW(s, lh) / 2, y = -tot / 2 + li * lh * 1.32, sd = seed + li * 41; let cx = x;
    [...s].forEach((ch, i) => {
      const [gw, st] = glyph(ch), sz = lh * (0.95 + hash(sd + i * 3.1) * 0.1), dy = (hash(sd + i * 7.7) - 0.5) * lh * 0.06, rot = (hash(sd + i * 5.3) - 0.5) * 0.08;
      st.forEach((stroke, k) => {
        const sm = stroke[0] === 'c', P = (sm ? stroke.slice(1) : stroke).map(([px, py], j) => {
          const n = hash(sd * 13 + i * 31 + k * 7 + j * 1.7) - 0.5, n2 = hash(sd * 17 + i * 29 + k * 5 + j * 2.3) - 0.5;
          const X = px * sz + n * lh * 0.03, Y = py * sz + n2 * lh * 0.03;
          return [cx + X * Math.cos(rot) - (Y - sz / 2) * Math.sin(rot), y + dy + sz / 2 + X * Math.sin(rot) + (Y - sz / 2) * Math.cos(rot)];
        });
        const pts = sampleStroke(P, sm); let len = 0;
        for (let j = 1; j < pts.length; j++) len += Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]);
        strokes.push({ pts, len: Math.max(len, lh * 0.04) });
      });
      cx += gw * sz + lh * track;
    });
  });
  return (MK[key] = { strokes, total: strokes.reduce((a, s) => a + s.len + lh * 0.35, 0) });   // + nhấc bút giữa nét
}
function inkPath(g, pts, upto) {
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); let d = 0;
  for (let j = 1; j < pts.length; j++) {
    const [x0, y0] = pts[j - 1], [x1, y1] = pts[j], l = Math.hypot(x1 - x0, y1 - y0);
    if (d + l >= upto) { const u = l ? (upto - d) / l : 1; g.lineTo(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u); break; }
    g.lineTo(x1, y1); d += l;
  }
  g.stroke();
}
/** Chữ bút dạ (tâm khối chữ ở 0,0 của hệ toạ độ hiện tại), viết dần theo k (theo độ dài nét, có nhấc bút). */
export function marker(g, lines, lh, k = 1, { color = C.pink, seed = 11 } = {}) {
  const Lk = markerLayout(Array.isArray(lines) ? lines : String(lines).split('\n'), lh, seed), lw = lh * 0.15;
  let left = Lk.total * clamp(k); if (left <= 0) return;
  g.save(); g.lineCap = g.lineJoin = 'round';
  for (const s of Lk.strokes) {
    if (left <= 0) break;
    const upto = Math.min(s.len, left); left -= s.len + lh * 0.35;
    g.globalAlpha = 0.9; g.strokeStyle = color; g.lineWidth = lw; inkPath(g, s.pts, upto);
    g.globalAlpha = 0.16; g.strokeStyle = '#FFFFFF'; g.lineWidth = lw * 0.18; g.save(); g.translate(-lw * 0.2, -lw * 0.2); inkPath(g, s.pts, upto); g.restore();
  }
  g.restore();
}

/** Dấu X còi sai (CHỈ trên thẻ trực giác): tâm (cx, cy), nửa cạnh s; k vẽ hai gạch lần lượt (0–0.5, 0.5–1) + bật nhẹ. */
export function buzzX(g, cx, cy, s, k = 1, rot = 0.04) {
  if (k <= 0) return;
  const pop = 1 + 0.18 * (1 - outCubic(clamp((k - 0.5) * 2)));
  g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(pop, pop); g.lineCap = 'round';
  const bars = [[-s, -s * 0.92, s, s * 0.92, clamp(k * 2)], [s * 0.95, -s, -s * 0.95, s, clamp(k * 2 - 1)]];
  const draw = (lw, col, blur) => { g.save(); if (blur) { g.shadowColor = 'rgba(227,38,43,0.65)'; g.shadowBlur = blur; }
    g.strokeStyle = col; g.lineWidth = lw; bars.forEach(([a, b, c2, d, u]) => { if (u <= 0) return; g.beginPath(); g.moveTo(a, b); g.lineTo(a + (c2 - a) * u, b + (d - b) * u); g.stroke(); }); g.restore(); };
  draw(s * 0.42, C.redD, 30); draw(s * 0.32, C.red); g.save(); g.translate(-s * 0.04, -s * 0.06); draw(s * 0.07, 'rgba(255,190,180,0.55)'); g.restore();
  g.restore();
}
/** Dấu ✓ hổ phách (logic đồng ý) có viền mực để nổi trên thẻ kem — font không có ✓, vẽ tay. Tâm (cx, cy), cỡ s. */
export function check(g, cx, cy, s, k = 1) {
  if (k <= 0) return;
  const P = [[-0.5, 0.02], [-0.14, 0.4], [0.6, -0.55]].map(([x, y]) => [cx + x * s, cy + y * s]);
  const L1 = Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]), L2 = Math.hypot(P[2][0] - P[1][0], P[2][1] - P[1][1]), d = (L1 + L2) * clamp(k);
  const path = () => { g.beginPath(); g.moveTo(...P[0]);
    if (d <= L1) g.lineTo(P[0][0] + (P[1][0] - P[0][0]) * d / L1, P[0][1] + (P[1][1] - P[0][1]) * d / L1);
    else { g.lineTo(...P[1]); const u = (d - L1) / L2; g.lineTo(P[1][0] + (P[2][0] - P[1][0]) * u, P[1][1] + (P[2][1] - P[1][1]) * u); } g.stroke(); };
  g.save(); g.lineCap = g.lineJoin = 'round';
  g.strokeStyle = C.label; g.lineWidth = s * 0.3; path();
  g.save(); g.shadowColor = 'rgba(255,170,40,0.6)'; g.shadowBlur = 14; g.strokeStyle = C.amber; g.lineWidth = s * 0.19; path(); g.restore();
  g.restore();
}

/** Nhãn in kiểu nhãn hồ sơ: giấy kem, dải hổ phách bên trái, chữ Plex mực. Tâm (x, y). k: dán vào (bật từ 1.25×, xoay về rot).
 *  Một lần dán = tiếng `chip`. Trả về bề rộng. */
export function tag(g, s, x, y, k = 1, { rot = -0.05, size = 23, strip = true, keepCase = false } = {}) {
  const str = keepCase ? s : s.toUpperCase(), tw = textW(str, size, { f: MONO, w: 500, ls: 2.5 }), pad = size * 1.1, sw = strip ? 16 : 0;
  const w = tw + 2 * pad + sw, h = size * 2.6;
  if (k <= 0) return w;
  const e = clamp(k), sc = 1 + 0.25 * (1 - outCubic(e));
  g.save(); g.translate(x, y); g.rotate(rot * (0.4 + 0.6 * e) - 0.06 * (1 - e)); g.scale(sc, sc);
  g.save(); g.shadowColor = 'rgba(0,0,0,0.45)'; g.shadowBlur = 12; g.shadowOffsetY = 5; g.fillStyle = '#FBF6EA'; rr(g, -w / 2, -h / 2, w, h, 4); g.fill(); g.restore();
  if (strip) { g.fillStyle = C.amber; g.fillRect(-w / 2, -h / 2, sw, h); g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(-w / 2 + sw, -h / 2, 2, h); }
  text(g, str, -w / 2 + sw + pad, size * 0.36, size, C.label, { f: MONO, w: 500, ls: 2.5 });
  g.restore();
  return w;
}

/**
 * THẺ TRẢ LỜI BẬT RA (vật xuyên suốt — DNA §1): bảng trắng trên que gỗ, chữ bút dạ hồng viết vào theo k.
 * Tâm thẻ (x, y), w × h; text: dòng tách bằng '\n', CHỈ ký tự trong MARKER_GLYPHS (A–Z 0–9 % / ? ! . , ' – space; thiếu → ném).
 * opts: state 'plain' | 'x' (buzzX, kx) | 'label' (nhãn in `label`, kx = dán) | 'check' (✓ hổ phách góc phải trên, kx);
 *       rise ∈ [0,1] bật lên từ dưới (outBack); rot; lh (cỡ chữ — mặc định vừa thẻ); seed; stick (que gỗ, mặc định có).
 * Chữ một con số trực giác đưa ra luôn hồng, không bao giờ hổ phách (DNA §2). Viết = một tiếng `pen`; X = `buzzer`.
 */
export function gutCard(g, s, x, y, w, h, k = 1, { state = 'plain', kx = 1, label: lb = '', rot = -0.04, rise = 1, lh = null, seed = 11, stick = true } = {}) {
  const lines = String(s).split('\n'), widest = Math.max(...lines.map(l => markerW(l, 1)), 0.01);
  const L = lh ?? Math.min(h * 0.62 / (lines.length * 1.32 - 0.32), w * 0.84 / widest);
  if (lines.some(l => markerW(l, L) > w * 0.92)) throw new Error(`gutCard: "${s}" tràn thẻ ${w}px ở cỡ ${L}`);
  if (rise <= 0) return;
  const dy = (1 - outBack(clamp(rise))) * 620;
  g.save(); g.translate(x, y + dy); g.rotate(rot);
  if (stick) { g.fillStyle = '#8A5C34'; g.fillRect(-13, h * 0.3, 26, 700); g.fillStyle = 'rgba(255,220,180,0.18)'; g.fillRect(-13, h * 0.3, 5, 700); }
  g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 26; g.shadowOffsetX = 8; g.shadowOffsetY = 14;
  g.fillStyle = '#B9A88C'; rr(g, -w / 2 + 5, -h / 2 + 6, w, h, 8); g.fill(); g.restore();
  const cg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); cg.addColorStop(0, '#F7F1E5'); cg.addColorStop(1, '#E8DFCC');
  g.fillStyle = cg; rr(g, -w / 2, -h / 2, w, h, 8); g.fill();
  g.strokeStyle = 'rgba(120,90,60,0.25)'; g.lineWidth = 1.5; rr(g, -w / 2 + 1, -h / 2 + 1, w - 2, h - 2, 7); g.stroke();
  for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(120,95,60,${0.05 + hash(i * 3.3) * 0.06})`;
    g.fillRect(-w / 2 + hash(i * 1.7) * (w - 8), -h / 2 + hash(i * 2.9) * (h - 2), 2 + hash(i) * 6, 1); }
  const offY = state === 'label' && lb ? -h * 0.1 : 0;
  g.save(); g.translate(0, offY); marker(g, lines, L, k, { seed }); g.restore();
  if (state === 'x') buzzX(g, 0, 0, Math.min(w, h) * 0.44, kx, 0.08);
  else if (state === 'check') check(g, w / 2 - h * 0.2, -h / 2 + h * 0.18, h * 0.32, kx);
  else if (state === 'label' && lb) tag(g, lb, w * 0.08, h * 0.33, kx, { size: Math.round(clamp(h / 270, 0.6, 1.2) * 23) });
  g.restore();
}

/** Khối xác suất ngọc: (x, y) góc trên trái, w × h — giữ h cố định, w ∝ xác suất (diện tích ∝ xác suất). s = chữ trên khối. */
export function block(g, x, y, w, h, s = '', { alpha = 1 } = {}) {
  g.save(); g.globalAlpha *= alpha;
  g.shadowColor = 'rgba(46,196,182,0.55)'; g.shadowBlur = 22;
  const bg = g.createLinearGradient(0, y, 0, y + h); bg.addColorStop(0, '#5FDCCF'); bg.addColorStop(1, '#22A99C'); g.fillStyle = bg; rr(g, x, y, w, h, 8); g.fill();
  g.shadowColor = 'rgba(0,0,0,0)'; g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 2; rr(g, x + 2, y + 2, w - 4, h - 4, 7); g.stroke();
  if (s) text(g, s, x + w / 2, y + h / 2 + h * 0.24, h * 0.66, C.tealInk, { w: 800, align: 'center' });
  g.restore();
}

// ───────── biển tên mục + thẻ hồi ─────────
// Biển tên mục: Plex Mono 20 giãn 2.5, canh phải ở (1824, 92) — như lab "ACT ONE · WHAT THE HOST KNOWS".
// Ô rộng tối đa CARD_PX = 560 px (chừa bảng treo bên trái) = 38 KÝ TỰ kể cả "ACT ONE · " (đo: 14.5 px/ký tự; vượt → ném).
export const CARD_PX = 560, CARD_MAX = 38;
export function card(g, k, act, name) {
  const s = `${act} · ${name}`.toUpperCase();
  const w = textW(s, 20, { f: MONO, w: 500, ls: 2.5 });
  if (s.length > CARD_MAX || w > CARD_PX) throw new Error(`card: "${s}" dài ${s.length} ký tự / ${Math.round(w)} px > ${CARD_MAX} / ${CARD_PX}`);
  if (k > 0) label(g, s, 1824, 92, C.dim, 'right', 20, k * 1.4);
}
// Thẻ hồi: khung bóng đèn giữa khung; "ACT ONE" (Archivo 92 hổ phách) + tên trên bảng lật (≤ 2 hàng × ACT_ROW = 22 ô,
// ô 44 px) + "ANSWERS n" (Plex 24). Rơi vào từ start − 2.4, lật vào, kéo lên khỏi khung trong [start − 0.35, start + 0.25].
export const ACT_ROW = 22;
function wrap(s, n) {
  const out = [''];
  for (const wd of s.toUpperCase().split(' ')) { const cur = out.at(-1); if (!cur) out[out.length - 1] = wd; else if ((cur + ' ' + wd).length <= n) out[out.length - 1] = cur + ' ' + wd; else out.push(wd); }
  return out;
}
export function actTitle(g, t, start, act, title, answers = '') {
  const out = outCubic(prog(t, start - 0.35, start + 0.25));
  const rows = wrap(title, ACT_ROW);
  if (rows.length > 2 || rows.some(r => r.length > ACT_ROW)) throw new Error(`actTitle: "${title}" không vừa 2 × ${ACT_ROW} ô`);
  if (t < start - 2.4 || out >= 1) return;
  const cell = 44, gap = 6, bw = flapW(ACT_ROW, cell, gap), mw = bw + 160, mh = 400 + (rows.length - 1) * 86, mx = (W - mw) / 2, my = (H - mh) / 2 - 30;
  const drop = (1 - outBack(prog(t, start - 2.4, start - 2.0))) * -700;
  g.save(); g.translate(0, drop - out * 900);
  bulbs(g, mx, my, mw, mh, t);
  text(g, 'ACT ' + String(act).toUpperCase(), W / 2, my + 150, 92, C.amber, { align: 'center', glow: 'rgba(255,170,40,0.75)', blur: 22, ls: 2, k: prog(t, start - 2.25, start - 1.95) * 1.2 });
  rows.forEach((r, i) => flap(g, ctr(r, ACT_ROW), (W - bw) / 2, my + 190 + i * 86, cell, prog(t, start - 1.95 + i * 0.25, start - 1.0 + i * 0.25), { gap }));
  if (answers) label(g, answers, W / 2, my + mh - 58, C.dim, 'center', 24, prog(t, start - 1.0, start - 0.6));
  g.restore();
}

// ───────── màn nhung (nối intro + chuyển cảnh cùng ERA) ─────────
let CURT;
function curtainHalf() {
  const w = W / 2 + 90, c = mk(w, H), x = c.getContext('2d');
  for (let px = 0; px < w; px += 2) {
    const v = 0.5 + 0.38 * Math.sin(px / 19 + Math.sin(px / 57) * 1.4) + 0.1 * Math.sin(px / 7.1) + (hash(px * 0.53) - 0.5) * 0.06;
    x.fillStyle = `rgb(${Math.round(58 + v * 70)},${Math.round(14 + v * 18)},${Math.round(18 + v * 18)})`; x.fillRect(px, 0, 2, H);
  }
  const sh = x.createLinearGradient(0, 0, 0, H); sh.addColorStop(0, 'rgba(0,0,0,0.35)'); sh.addColorStop(0.25, 'rgba(0,0,0,0)'); sh.addColorStop(0.85, 'rgba(0,0,0,0.1)'); sh.addColorStop(1, 'rgba(0,0,0,0.55)');
  x.fillStyle = sh; x.fillRect(0, 0, w, H);
  for (let px = 0; px < w; px += 9) { x.fillStyle = px % 18 ? C.amberD : '#8A5A14'; x.fillRect(px, H - 34, 6, 30 + hash(px) * 4); }   // tua viền
  x.fillStyle = '#6E4A12'; x.fillRect(0, H - 40, w, 8);
  return c;
}
/** Màn nhung hai nửa kéo vào giữa: k = 0 mở (ngoài khung), 1 khép kín. black ∈ [0,1] phủ đen lên trên (khép → đen kín).
 *  Vẽ ở toạ độ màn hình, sau mọi thứ. */
export function curtain(g, k, { black = 0 } = {}) {
  const e = smooth(clamp(k));
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
  if (e > 0) {
    CURT ??= curtainHalf(); const cw = CURT.width, off = (1 - e) * (cw + 40);
    g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 40;
    g.save(); g.translate(W, 0); g.scale(-1, 1); g.drawImage(CURT, -off, 0); g.restore();     // nửa phải (gương)
    g.drawImage(CURT, -off, 0);                                                               // nửa trái, đè giữa 90 px
    g.shadowBlur = 0;
  }
  if (black > 0) { g.fillStyle = `rgba(0,0,0,${clamp(black)})`; g.fillRect(0, 0, W, H); }
  g.restore();
}

// ───────── nhân vật: hình cắt + viền ấm mảnh (tóc/quần đen tách khỏi phông tối); vào = trồi lên + bật, không fade ─────────
// crop = phần trên ảnh được giữ: toàn thân ≈ 0.45 (ngang hông), khung giữa đùi 1 (assets/character-v2/POSES.md);
// giật mình / nhảy: toàn thân không cắt (1).
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, wave: 0.45, startled: 1, jump: 1,
  three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, invite: 1, notebook: 1, 'peace-back': 1, calculator: 1, pointer: 1, offer: 1 };
function sprite(pose, crop) {
  const im = IM['pose-' + pose]; if (!im) throw new Error('figure: chưa khai báo POSES ' + pose);
  const sh = Math.round(im.height * crop), p = 6, c = mk(im.width + 2 * p, sh + 2 * p), x = c.getContext('2d');
  const sil = mk(im.width, sh), sx = sil.getContext('2d'); sx.drawImage(im, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#7A5440'; sx.fillRect(0, 0, im.width, sh);
  for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * PI; x.drawImage(sil, p + 3 * Math.cos(a), p + 3 * Math.sin(a)); }
  x.drawImage(im, 0, 0, im.width, sh, p, p, im.width, sh); return { c, p, sh };
}
/**
 * Nhân vật, chân chạm `foot`, cao h (phần đã cắt); k: trồi lên (outBack), k giảm = lặn xuống. Trả về hàm P(ix, iy) ảnh gốc
 * → khung (cả khi k ≤ 0). Một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–800 (DNA §5). Vẽ ngoài reflect, sau vật sân khấu.
 */
export function figure(g, pose, cx, foot, h, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  const S = (FIG[pose + crop] ??= sprite(pose, crop)), s = h / S.sh, w = S.c.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.6, x0 = cx - w / 2, y0 = foot - h - S.p * s + rise;
  const P = (ix, iy) => [flip ? cx + w / 2 - (ix + S.p) * s : x0 + (ix + S.p) * s, y0 + (iy + S.p) * s];
  if (k <= 0) return P;
  g.save(); if (flip) { g.translate(cx, 0); g.scale(-1, 1); g.translate(-cx, 0); }
  g.drawImage(S.c, x0, y0, w, S.c.height * s); g.restore();
  return P;
}

// ───────── chân dung: duotone hổ phách trong khung bóng đèn + bảng tên in ─────────
const PH = {};
function duotone(src, h) {
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, Lv = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; Lv[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98)), A = [20, 11, 12], M = [194, 122, 16], B = [255, 214, 140];
  for (let i = 0; i < n; i++) {
    const v = clamp((Lv[i] - lo) / (hi - lo));
    for (let j = 0; j < 3; j++) d.data[i * 4 + j] = v < 0.55 ? A[j] + (M[j] - A[j]) * v / 0.55 : M[j] + (B[j] - M[j]) * (v - 0.55) / 0.45;
  }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Chân dung: (x, y) = góc trên trái ẢNH, cao h; khung bóng đèn bao ngoài 40 px. k: đèn khung bật + ảnh hiện từ trên xuống
 * theo hàng (như màn chiếu), nhãn tên dán vào. opts { name, note (năm / credit — chữ nhỏ), t (đèn chạy), crop: [sx, sy, sw, sh]
 * px ảnh gốc }. Trả về { w, h } ảnh. Nhãn chiếm thêm ~140 px dưới ảnh — tính chỗ trước (y + h + 140 ≤ 1016).
 */
export function portrait(g, key, x, y, h, k = 1, { name = '', note = '', t = 0, crop = null } = {}) {
  if (!IM[key]) throw new Error('portrait: chưa khai báo IMAGES ' + key);
  const ck = key + '|' + h + '|' + (crop || '').toString();
  const im = (PH[ck] ??= (() => { let src = IM[key]; if (crop) { const c = mk(crop[2], crop[3]); c.getContext('2d').drawImage(src, crop[0], crop[1], crop[2], crop[3], 0, 0, crop[2], crop[3]); src = c; } return duotone(src, h); })());
  const w = im.width;
  if (k <= 0) return { w, h };
  bulbs(g, x - 40, y - 40, w + 80, h + 80, t, { pad: 18, r: 6, step: 30, lit: k > 0.15 });
  const rows = Math.round(h * clamp(k * 1.4 - 0.1));
  if (rows > 0) g.drawImage(im, 0, 0, w, rows, x, y, w, rows);
  if (name) tag(g, name, x + w / 2, y + h + 76, clamp(k * 2 - 1), { rot: -0.02, size: 22 });
  if (note) label(g, note, x + w / 2, y + h + 136, C.dim, 'center', 18, clamp((k - 0.55) / 0.4));   // đủ chữ khi k ≥ 0.95
  return { w, h };
}

// ───────── nạp: ảnh (toCanvas: canvas CPU, tất định — LESSONS §16) + kiểm font đã nạp ─────────
export async function loadKit(images) {
  for (const f of [`800 40px ${ARC}`, `900 40px ${ARC}`, `500 20px ${MONO}`]) if (!document.fonts.check(f)) throw new Error('kit: font chưa nạp ' + f);
  CURT ??= curtainHalf();
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
/** Kiểm toán trên hình: tính biểu thức (÷ × − ^ được), ném lỗi nếu khác giá trị chờ. Mọi số hiện lên hình đi qua đây. */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message})`); }
  const bad = typeof want === 'number' ? Math.abs(v - want) > 1e-9 : v !== want;
  if (bad) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
