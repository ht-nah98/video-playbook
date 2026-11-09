// Đồ nghề dựng hình kênh lịch sử (tách từ projects/hist/sarajevo/episode.html, 2026-10-28; tập import, KHÔNG chép lại) — dùng chung cho mọi tập / chương.
// Luật dùng: channels/hist/EDITING.md (cỡ, khung, ≤ 3 nhóm / khung, ảnh thật = vật hoặc nền nơi chốn, người dẫn vẽ nét).
//   import * as S from '../_kit/stage.js';  S.bindStage(g, { IM, M, MW });   // IM: ảnh đã decode (IM.boom1, IM.car, IM.ff_bust…)
//   S.photoBg(IM.x, t, {desat, dark, credit}) · S.photo · S.sticker · S.label · S.nameTag · S.stamp · S.realBoom · S.person ·
//   S.crowdRow · S.assassin · S.carPhoto · S.boxer · S.arrow(V,…) · S.lipHost(X) · S.bigFace · S.hostIn · S.world1914 …
// Tất định: mọi thứ là hàm của tham số (t / X) — không Math.random / Date.now.
import { view, drawMap, mapFace, cutout, ll, bubble, ANCHOR, INK, SEA, LAND } from './mapkit.js';
import { narrator, cornerHost, mouthAt } from './narrator.js';
export const W = 1920, H = 1080, PAPER = '#F4F1E8', RED = '#C2343A';
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
export const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const easeOut = k => 1 - (1 - clamp(k)) ** 3, ease = k => { k = clamp(k); return k * k * (3 - 2 * k); };
export const back = k => { k = clamp(k); const c = 1.7; return 1 + (c + 1) * (k - 1) ** 3 + c * (k - 1) ** 2; };
let g = null, IM = {}, M = null, MW = null;
export function bindStage(ctx, o = {}) { g = ctx; IM = o.IM ?? IM; M = o.M ?? M; MW = o.MW ?? MW; }
// ── đồ nghề hình ──
function paper(col = PAPER) { g.fillStyle = col; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 140; i++) { g.fillStyle = `rgba(90,70,40,${0.03 + 0.04 * hash(i)})`; g.fillRect(hash(i + 7) * W, hash(i + 19) * H, 2 + 3 * hash(i + 3), 2 + 3 * hash(i + 5)); } }
/** sticker: ảnh PNG đáy giữa ở (x, y), cao h; k < 1 = đang trượt vào (kèm bóng nhoè — study 15 §6) */
function sticker(im, x, y, h, o = {}) {
  const w = im.width * h / im.height, k = o.k ?? 1; if (k <= 0) return;
  const off = (1 - easeOut(k)) * (o.from ?? 900), dx = o.dx ?? 1;
  g.save(); g.imageSmoothingQuality = 'high';
  const one = (ox, a) => { g.save(); g.globalAlpha = a * (o.alpha ?? 1); g.translate(x + ox, y); g.rotate(o.rot ?? 0); g.scale(o.flip ? -1 : 1, 1);
    if (o.shadow !== false) { g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(0, -2, w * 0.38, 10, 0, 0, 7); g.fill(); }
    g.drawImage(im, -w / 2, -h, w, h); g.restore(); };
  if (k < 1) for (let j = 3; j >= 1; j--) one(dx * (off + j * 70 * (1 - k)), 0.18);
  one(dx * off, 1); g.restore();
}
/** người dẫn VẼ NÉT (kit narrator.js — người dùng duyệt 10-27): nói ở góc phải, nhép theo giọng; k < 1 = trượt vào từ phải */
function lipHost(X, k = 1, o = {}) { if (k <= 0) return; g.save(); g.translate((1 - easeOut(k)) * 650, 0); cornerHost(X, mouthAt(X), o); g.restore(); }
/** cận mặt (vai B): nền đen, bán thân C phóng to chiếm khung, giật nhẹ khi cắt vào */
function bigFace(t, mood, mouth) { g.fillStyle = '#121212'; g.fillRect(0, 0, W, H); const s = t < 0.12 ? 1.06 : 1; narrator(980, H + 470 * s, 1700 * s, { v: 'C', mood, mouth }); }
/** người dẫn toàn thân trượt vào (vai C / D) */
function hostIn(x, y, h, k, o = {}) { if (k <= 0) return; g.save(); g.translate((1 - easeOut(k)) * (o.from ?? 600) * (o.dx ?? 1), 0); narrator(x, y, h, o); g.restore(); }
function closeUp(im, t, o = {}) { g.fillStyle = o.bg ?? '#121212'; g.fillRect(0, 0, W, H); const s = t < 0.12 ? 1.08 : 1;
  g.save(); g.imageSmoothingQuality = 'high'; const h = (o.h ?? 1180) * s, w = im.width * h / im.height; g.drawImage(im, (o.x ?? 1080) - w / 2, 1080 - h + 140, w, h); g.restore(); }
function label(txt, x, y, size, k = 1, col = INK, o = {}) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 3); g.font = `900 ${size}px Archivo, sans-serif`; g.textAlign = o.align ?? 'center';
  if (!o.free) { const tw = g.measureText(txt).width, al = o.align ?? 'center', L0 = al === 'left' ? 0 : al === 'right' ? -tw : -tw / 2;   // vùng an toàn chữ (x 96–1824, y 64–1016) — REVIEW-v5 B: tiêu đề cắt mép
    x = Math.min(Math.max(x, 96 - L0), 1824 - (L0 + tw)); y = Math.min(Math.max(y, 64 + size * 0.82), 1016); }
  g.translate(x, y); g.rotate(o.rot ?? 0); const s = back(k); g.scale(s, s);
  if (o.stroke) { g.strokeStyle = o.stroke; g.lineWidth = size * 0.16; g.lineJoin = 'round'; g.strokeText(txt, 0, 0); } g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); }
const nameTag = (txt, k, x = 70, y = 960) => label(txt, x, y, 54, k, '#FFFFFF', { align: 'left', stroke: '#111' });
function stamp(txt, cx, cy, size, k, rot = -0.08) { if (k <= 0) return; const s = lerp(2.2, 1, ease(clamp(k / 0.45)));
  g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(s, s); g.globalAlpha = clamp(k / 0.2) * 0.94; g.font = `900 ${size}px Archivo, sans-serif`;
  const pw = g.measureText(txt).width + size * 0.8, ph = size * 1.5; g.fillStyle = 'rgba(255,250,240,0.85)'; g.fillRect(-pw / 2, -ph / 2, pw, ph);
  g.strokeStyle = RED; g.lineWidth = size * 0.09; g.strokeRect(-pw / 2, -ph / 2, pw, ph);
  g.fillStyle = RED; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, size * 0.05); g.restore(); }
function credit(txt) { g.save(); g.font = '500 16px Archivo, sans-serif'; g.textAlign = 'left'; const tw = g.measureText(txt).width;   // góc TRÁI — góc phải là chỗ người dẫn
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(12, H - 34, tw + 20, 26); g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillText(txt, 22, H - 15); g.restore(); }
/** ảnh khung giấy (tư liệu) */
function photo(im, cx, cy, w, k = 1, o = {}) { if (k <= 0) return; const h = w * im.height / im.width, b = 14;
  g.save(); g.globalAlpha = clamp(k * 3); g.translate(cx, cy); g.rotate(o.rot ?? 0); const s = o.push ?? 1; g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 - b + 10, -h / 2 - b + 14, w + 2 * b, h + 2 * b);
  g.fillStyle = '#FBF8F0'; g.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b); g.drawImage(im, -w / 2, -h / 2, w, h); g.restore();
  if (o.credit) credit(o.credit); }
/** ảnh thật phủ kín khung (nền cảnh), đẩy chậm; trả hàm đổi toạ độ ảnh → màn hình để đặt lớp đè đúng chỗ */
function photoBg(im, t, o = {}) { const z = (o.zoom ?? 1) * (1.02 + (o.push ?? 0.012) * t), s = Math.max(W / im.width, H / im.height) * z, w = im.width * s, h = im.height * s;
  const fx = o.fx ?? 0.5, fy = o.fy ?? 0.5, ox = W / 2 - fx * w, oy = H / 2 - fy * h;
  g.drawImage(im, clamp(ox, W - w, 0), clamp(oy, H - h, 0), w, h);
  const X = clamp(ox, W - w, 0), Y = clamp(oy, H - h, 0);
  if (o.desat) desat(o.desat, 0); if (o.dark) { g.fillStyle = `rgba(15,15,20,${o.dark})`; g.fillRect(0, 0, W, H); }
  if (o.credit) credit(o.credit);
  return (ix, iy) => [X + ix * s, Y + iy * s]; }
function desat(k, dark = 0.25) { if (k <= 0) return; g.save(); g.globalCompositeOperation = 'saturation'; g.globalAlpha = clamp(k); g.fillStyle = '#808080'; g.fillRect(0, 0, W, H); g.restore();
  if (dark) { g.fillStyle = `rgba(15,15,20,${dark * clamp(k)})`; g.fillRect(0, 0, W, H); } }
function flash(x, y, k, R = 160) { if (k <= 0 || k >= 1) return; g.save(); g.fillStyle = `rgba(255,236,160,${1 - k})`; g.beginPath();
  for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7, r = (i % 2 ? R * 0.3 : R) * (0.6 + 0.4 * k); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); g.fill(); g.restore(); }
const shake = (k, amp, T) => (k <= 0 || k >= 1) ? [0, 0] : [Math.sin(T * 91) * amp * (1 - k), Math.cos(T * 77) * amp * (1 - k)];
function smoke(x, y, t0, t, n = 5) { for (let i = 0; i < n; i++) { const k = clamp((t - t0 - i * 0.15) / 1.2); if (k <= 0 || k >= 1) continue;
  g.fillStyle = `rgba(80,80,80,${0.5 * (1 - k)})`; g.beginPath(); g.arc(x - k * 120, y - k * 80 - i * 10, 30 + 50 * k, 0, 7); g.fill(); } }
/** VỤ NỔ THẬT (ảnh CC0 cắt nền) — bung ra, lớn dần, mờ đi; u = giây từ lúc nổ */
function realBoom(x, y, size, u, seed = 0) { if (u < 0 || u > 2.6) return; const im = IM.boom1, k = easeOut(u / 0.5), fade = clamp((2.6 - u) / 1.2);
  const h = size * (0.35 + 0.75 * k + 0.12 * u), w = im.width * h / im.height;
  g.save(); g.globalAlpha = fade; g.translate(x, y); g.scale(hash(seed) > 0.5 ? -1 : 1, 1); g.rotate((hash(seed + 3) - 0.5) * 0.3);
  g.drawImage(im, -w / 2, -h * 0.62, w, h); g.restore();
  if (u < 0.12) { g.fillStyle = `rgba(255,240,200,${0.6 * (1 - u / 0.12)})`; g.beginPath(); g.arc(x, y, size * 0.5, 0, 7); g.fill(); } }

// ── người đầu tròn kiểu Thanh Pahm (dân) ──
function person(x, y, h, o = {}) { const bw = h * 0.44, bh = h * 0.6, r = h * 0.2, hy = y - bh - r * 0.75;
  g.save(); g.lineWidth = Math.max(3, h * 0.025); g.strokeStyle = INK; g.lineJoin = 'round';
  g.fillStyle = o.fill ?? '#FFFFFF'; g.beginPath(); g.moveTo(x - bw / 2, y); g.lineTo(x - bw / 2, y - bh + bw * 0.35); g.quadraticCurveTo(x - bw / 2, y - bh, x - bw * 0.15, y - bh);
  g.lineTo(x + bw * 0.15, y - bh); g.quadraticCurveTo(x + bw / 2, y - bh, x + bw / 2, y - bh + bw * 0.35); g.lineTo(x + bw / 2, y); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = o.skin ?? '#FFFFFF'; g.beginPath(); g.arc(x, hy, r, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; const lk = (o.look ?? 0) * r * 0.18;
  if (o.mood === 'shock') { for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * r * 0.35 + lk, hy - r * 0.05, r * 0.16, 0, 7); g.stroke(); } g.beginPath(); g.ellipse(x + lk, hy + r * 0.45, r * 0.12, r * 0.16, 0, 0, 7); g.fill(); }
  else { for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * r * 0.32 + lk, hy - r * 0.02, r * 0.1, 0, 7); g.fill(); }
    if (o.mood === 'happy') { g.beginPath(); g.arc(x + lk, hy + r * 0.25, r * 0.28, 0.2, Math.PI - 0.2); g.stroke(); } }
  const hat = o.hat;
  if (hat === 'bowler') { g.fillStyle = '#151515'; g.beginPath(); g.ellipse(x, hy - r * 0.7, r * 1.15, r * 0.18, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(x, hy - r * 0.8, r * 0.72, r * 0.6, 0, Math.PI, 0); g.fill(); }
  if (hat === 'fez') { g.fillStyle = '#B3262C'; g.beginPath(); g.moveTo(x - r * 0.55, hy - r * 0.6); g.lineTo(x - r * 0.42, hy - r * 1.45); g.lineTo(x + r * 0.42, hy - r * 1.45); g.lineTo(x + r * 0.55, hy - r * 0.6); g.closePath(); g.fill(); g.stroke(); }
  if (hat === 'cap') { g.fillStyle = '#5B5A55'; g.beginPath(); g.ellipse(x, hy - r * 0.62, r * 0.98, r * 0.5, 0, Math.PI, 0); g.fill(); g.fillRect(x, hy - r * 0.68, r * 1.1, r * 0.16); }
  if (hat === 'scarf') { g.fillStyle = '#8E5F72'; g.beginPath(); g.arc(x, hy, r * 1.08, Math.PI * 0.95, Math.PI * 2.05); g.lineTo(x + r * 0.9, hy + r * 0.4); g.lineTo(x - r * 0.9, hy + r * 0.4); g.closePath(); g.fill(); g.stroke(); }
  if (o.flag) { const fx = x + bw * 0.45, fy = y - bh * 0.55, a = o.wave ?? 0;
    g.lineWidth = 4; g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx + 12, fy - h * 0.55); g.stroke();
    g.save(); g.translate(fx + 12, fy - h * 0.55); g.rotate(0.1 + a * 0.08); g.fillStyle = '#151515'; g.fillRect(0, 0, h * 0.3, h * 0.09); g.fillStyle = '#F3C61B'; g.fillRect(0, h * 0.09, h * 0.3, h * 0.09);
    g.lineWidth = 2.5; g.strokeRect(0, 0, h * 0.3, h * 0.18); g.restore(); }
  g.restore(); }
/** đám đông một hàng người đầu tròn (mũ 1914 lẫn lộn: quả dưa, fez, mũ lưỡi trai, khăn) */
function crowdRow(x0, x1, y, h, t, o = {}) { const n = Math.round((x1 - x0) / (h * 0.52)), hats = ['bowler', 'fez', null, 'cap', 'scarf', 'bowler', null, 'fez'];
  for (let i = 0; i < n; i++) { const k = i + (o.seed ?? 0), x = x0 + (i + 0.5 + (hash(k) - 0.5) * 0.3) * (x1 - x0) / n; if (o.skip?.some(s => Math.abs(x - s) < h * 0.4)) continue;
    const hh = h * (0.92 + 0.16 * hash(k + 3)), jump = o.panic ? Math.abs(Math.sin(t * 9 + k)) * h * 0.12 : o.cheer ? Math.max(0, Math.sin(t * 8 + k * 1.3)) * h * 0.06 : 0;
    person(x, y - jump, hh, { hat: hats[k % hats.length], flag: o.cheer && hash(k + 9) > 0.55, wave: Math.sin(t * 6 + k), look: o.look ?? 0, mood: o.panic ? 'shock' : o.cheer ? 'happy' : null }); } }
/** sát thủ kiểu Thanh Pahm: thân đen tròn, mặt da, mắt xếch, mũ quả dưa, cổ áo + cà vạt; o.gun = góc tay cầm súng (rad) */
function assassin(x, y, h, o = {}) { const bw = h * 0.42, fy = y - h * 0.78, r = bw * 0.5;
  g.save(); g.lineWidth = 5; g.strokeStyle = INK;
  g.fillStyle = '#111'; g.beginPath(); g.moveTo(x - bw / 2, y); g.lineTo(x - bw / 2, y - h * 0.62 + bw / 2); g.arc(x, y - h * 0.62 + bw / 2, bw / 2, Math.PI, 0); g.lineTo(x + bw / 2, y); g.quadraticCurveTo(x, y + 8, x - bw / 2, y); g.fill();
  g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(x - 14, y - h * 0.6); g.lineTo(x, y - h * 0.5); g.lineTo(x + 14, y - h * 0.6); g.fill();
  g.strokeStyle = '#555'; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y - h * 0.56); g.lineTo(x, y - h * 0.4); g.stroke();
  if (o.gun !== undefined || o.arm !== undefined) { const a = o.gun ?? o.arm, sx = x + bw * 0.4, sy = y - h * 0.48, L2 = h * 0.62, ex = sx + Math.cos(a) * L2, ey = sy + Math.sin(a) * L2;
    g.strokeStyle = '#111'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.stroke();
    if (o.gun !== undefined) { g.save(); g.translate(ex, ey); g.rotate(a); g.fillStyle = '#111'; g.fillRect(-4, -12, 46, 16); g.beginPath(); g.moveTo(0, 0); g.lineTo(-10, 30); g.lineTo(6, 30); g.lineTo(12, 2); g.fill(); g.restore(); } }
  g.fillStyle = '#F2D3A2'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(x, fy, r, 0, 7); g.fill(); g.stroke();
  for (const s of [-1, 1]) { const ex = x + s * r * 0.38 + (o.look ?? 0) * 6, ey = fy + 2;
    g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, r * 0.22, r * 0.13, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.arc(ex + (o.look ?? 0) * r * 0.08, ey, r * 0.07, 0, 7); g.fill();
    g.lineWidth = 7; g.beginPath(); g.moveTo(ex + s * r * 0.26, ey - r * 0.24); g.lineTo(ex - s * r * 0.24, ey - r * 0.02); g.stroke(); g.lineWidth = 5; }
  if (o.green) { g.fillStyle = 'rgba(110,190,90,0.55)'; g.beginPath(); g.arc(x, fy, r, 0, 7); g.fill(); }
  g.fillStyle = '#111'; g.beginPath(); g.ellipse(x, fy - r * 0.62, r * 1.15, r * 0.16, 0, 0, 7); g.fill();
  g.beginPath(); g.ellipse(x, fy - r * 0.7, r * 0.72, r * 0.62, 0, Math.PI, 0); g.fill(); g.restore();
  return { face: [x, fy], r }; }
function sweat(x, y, s) { g.fillStyle = '#9AD0F5'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y - 26 * s);
  g.quadraticCurveTo(x + 18 * s, y, x, y + 12 * s); g.quadraticCurveTo(x - 18 * s, y, x, y - 26 * s); g.fill(); g.stroke(); }
function vein(x, y, s) { g.strokeStyle = '#D9262E'; g.lineWidth = 7 * s; g.lineCap = 'round';
  for (const a of [0, 1, 2, 3]) { g.save(); g.translate(x, y); g.rotate(a * Math.PI / 2 + 0.6); g.beginPath(); g.moveTo(6 * s, 6 * s); g.quadraticCurveTo(18 * s, 4 * s, 22 * s, 18 * s); g.stroke(); g.restore(); } }
function tear(x, y, s, t) { g.fillStyle = '#4FA3E6'; g.strokeStyle = INK; g.lineWidth = 3; const d = (t * 1.4) % 1;
  g.beginPath(); g.moveTo(x, y + d * 50 * s - 14 * s); g.quadraticCurveTo(x + 10 * s, y + d * 50 * s, x, y + d * 50 * s + 10 * s); g.quadraticCurveTo(x - 10 * s, y + d * 50 * s, x, y + d * 50 * s - 14 * s); g.fill(); g.stroke(); }

/** XE ẢNH THẬT (1911, PD, cắt nền) + tài xế thật trong ảnh; FF + Sophie = ảnh cắt bán thân ngồi ghế sau.
 *  x = tâm, y = đáy bánh, w = rộng; o.right (mặc định) = hướng phải; o.k < 1 = đang lao vào có nhoè; o.riders */
const driverAt = (x, y, w) => [x - 0.12 * w, y - 0.86 * w * 924 / 1932];   // tài xế trong ảnh xe (hướng phải)
function carPhoto(x, y, w, t, o = {}) { const im = IM.car, h = w * im.height / im.width, dir = o.right === false ? 1 : -1, bob = o.moving ? Math.sin(t * 16) * 3 : 0;
  const one = (ox, a) => { g.save(); g.globalAlpha = a; g.translate(x + ox, y + bob); g.scale(dir, 1);
    g.drawImage(im, -w / 2, -h, w, h);
    if (o.riders !== false) { g.save(); g.scale(dir, 1); g.beginPath(); g.rect(-w, -h * 2, w * 2, h * 2 - h * 0.6); g.clip();   // ngồi sau tài xế: phần dưới khuất sau thân xe
      for (const [key, cx, hh] of [['sophie_bust', -0.36, 0.4], ['ff_bust', -0.26, 0.44]]) { const b = IM[key], bh = h * hh, bwid = b.width * bh / b.height;
        g.drawImage(b, cx * w - bwid / 2, -h * 0.5 - bh, bwid, bh); } g.restore(); }
    g.restore(); };
  if (o.k !== undefined && o.k < 1) { const off = (1 - easeOut(o.k)) * -dir * 1400; for (let j = 3; j >= 1; j--) one(off - dir * j * 60 * (1 - o.k), 0.18); one(off, 1); return; }
  one(0, 1); }

/** quốc gia tách khỏi bản đồ + găng đấm bốc (vẽ riêng) — punch 0..1 = cú đấm vươn ra */
function boxer(n, x, y, h, t, o = {}) { const c = cutout(g, M, n, x, y, h, { mood: o.mood ?? 'angry', arms: 'none', t, hop: o.hop ?? Math.abs(Math.sin(t * 7 + x)) * 10, flip: o.flip });
  const [fx, fy] = c.face, d = o.dir ?? 1, p = o.punch ?? (0.5 + 0.5 * Math.sin(t * 9 + x * 0.01));
  for (const [s, ph] of [[-1, 0], [1, Math.PI]]) { const ext = (s === d ? p : 1 - p), gx = fx + s * h * 0.32 + d * ext * h * 0.22, gy = fy + h * 0.12 - ext * h * 0.05;
    g.strokeStyle = INK; g.lineWidth = h * 0.035; g.lineCap = 'round'; g.beginPath(); g.moveTo(fx + s * h * 0.2, fy + h * 0.2); g.quadraticCurveTo(fx + s * h * 0.3, fy + h * 0.24, gx, gy); g.stroke();
    g.fillStyle = '#D02A2A'; g.strokeStyle = '#5A0E0E'; g.lineWidth = 3; g.beginPath(); g.ellipse(gx, gy, h * 0.075, h * 0.065, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = '#F4F1E8'; g.fillRect(gx - h * 0.05, gy + h * 0.045, h * 0.1, h * 0.03); }
  return c; }

/** bong bóng Ý NGHĨ chứa phòng bệnh vẽ phẳng: tường sáng, cửa sổ, chữ thập, hai giường có bệnh nhân đầu tròn băng đầu */
function ward(cx, cy, k, X) { if (k <= 0) return; const s = back(k), w = 760, h = 520;
  g.save(); g.translate(cx, cy); g.scale(s, s); g.lineWidth = 5; g.strokeStyle = INK;
  for (const [dx, dy, r] of [[-430, 330, 18], [-470, 380, 11]]) { g.fillStyle = '#FFF'; g.beginPath(); g.arc(dx, dy, r, 0, 7); g.fill(); g.stroke(); }
  const B = new Path2D(); B.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); g.fillStyle = '#F4F6F8'; g.fill(B); g.save(); g.clip(B);
  g.fillStyle = '#E3E9EE'; g.fillRect(-w, 60, w * 2, h); g.strokeStyle = INK; g.beginPath(); g.moveTo(-w, 60); g.lineTo(w, 60); g.stroke();
  g.fillStyle = '#9CC7E8'; g.fillRect(-60, -200, 120, 110); g.strokeRect(-60, -200, 120, 110); g.beginPath(); g.moveTo(0, -200); g.lineTo(0, -90); g.moveTo(-60, -145); g.lineTo(60, -145); g.stroke();
  g.fillStyle = RED; g.fillRect(-250, -150, 70, 22); g.fillRect(-226, -174, 22, 70); g.fillRect(180, -150, 70, 22); g.fillRect(204, -174, 22, 70);
  for (const bx of [-170, 170]) { g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(bx - 130, 150); g.lineTo(bx + 130, 150); g.lineTo(bx + 100, 40); g.lineTo(bx - 100, 40); g.closePath(); g.fill(); g.stroke();
    g.fillRect(bx - 130, 150, 260, 40); g.strokeRect(bx - 130, 150, 260, 40); for (const lx of [-120, 120]) { g.beginPath(); g.moveTo(bx + lx, 190); g.lineTo(bx + lx, 240); g.stroke(); }
    const hx = bx - 20, hy = 10 + 3 * Math.sin(X * 2 + bx); g.fillStyle = '#FFF'; g.beginPath(); g.arc(hx, hy, 40, 0, 7); g.fill(); g.stroke();
    g.fillStyle = INK; for (const e of [-13, 13]) { g.beginPath(); g.arc(hx + e, hy + 4, 4.5, 0, 7); g.fill(); }
    g.fillStyle = '#F2F2F2'; g.beginPath(); g.ellipse(hx, hy - 22, 42, 12, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(hx + 18, hy - 22, 5, 0, 7); g.fill(); }   // băng đầu
  g.restore(); g.lineWidth = 6; g.stroke(B); g.restore(); }
// bản đồ
const pt = (V, lon, lat) => V.pt(ll(M, lon, lat));
function arrow(V, a, b, k, col = RED) { if (k <= 0) return; const A = pt(V, ...a), B = pt(V, ...b), m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - 0.25 * Math.hypot(B[0] - A[0], B[1] - A[1])];
  const q = u => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * m[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * m[1] + u * u * B[1]], e = easeOut(k);
  g.save(); g.strokeStyle = col; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(...A); for (let i = 1; i <= 24; i++) g.lineTo(...q(e * i / 24)); g.stroke();
  const P = q(e), P0 = q(Math.max(0, e - 0.05)), ang = Math.atan2(P[1] - P0[1], P[0] - P0[0]);
  g.fillStyle = col; g.translate(...P); g.rotate(ang); g.beginPath(); g.moveTo(26, 0); g.lineTo(-18, -22); g.lineTo(-18, 22); g.closePath(); g.fill(); g.restore(); }
/** thế giới 1914 tô theo đế quốc (historical-basemaps, gộp theo nước chủ) */
const OWN = { UK: 'UK', Canada: 'UK', Australia: 'UK', 'New Zealand': 'UK', Ceylon: 'UK', Malaya: 'UK', Uganda: 'UK', 'Gambia, The': 'UK', 'Sierra Leone': 'UK', Belize: 'UK', Guyana: 'UK',
  Fiji: 'UK', Lesotho: 'UK', Swaziland: 'UK', Brunei: 'UK', Kuwait: 'UK', Qatar: 'UK', 'Papua New Guinea': 'UK', France: 'FR', Morocco: 'FR', Tunisia: 'FR', 'French Guiana': 'FR',
  Russia: 'RU', Finland: 'RU', Armenia: 'RU', Azerbaijan: 'RU', Georgia: 'RU', 'German Empire': 'DE', 'German South-West Africa': 'DE', Kamerun: 'DE', Togoland: 'DE',
  Belgium: 'BE', Portugal: 'PT', 'Portuguese Guinea': 'PT', Netherlands: 'NL', 'Netherlands Indies': 'NL', Suriname: 'NL', Spain: 'ES', 'Spanish Morocco': 'ES', 'Rio De Oro': 'ES',
  'Equatorial Guinea': 'ES', Italy: 'IT' };
const EMP = { UK: ['#E58C9D', 'BRITAIN'], FR: ['#4E79CF', 'FRANCE'], RU: ['#6FA35A', 'RUSSIA'], DE: ['#555555', 'GERMANY'], BE: ['#E6C23A', 'BELGIUM'], PT: ['#3FA39B', 'PORTUGAL'],
  NL: ['#F08A3C', 'NETHERLANDS'], IT: ['#9DBB4F', 'ITALY'], ES: ['#C99A27', 'SPAIN'] };
function world1914(T, t0, o = {}) { g.fillStyle = SEA; g.fillRect(0, 0, W, H); const b = MW.bbox, s = Math.min(W / (b[2] - b[0]), H / (b[3] - b[1])) * (o.zoom ?? 1);
  g.save(); g.translate(W / 2, H / 2); g.scale(s, s); g.translate(-(b[0] + b[2]) / 2 + (o.dx ?? 0), -(b[1] + b[3]) / 2 + (o.dy ?? 0)); const order = Object.keys(EMP);
  for (const [n, p] of Object.entries(MW.path)) { const e = OWN[n], i = order.indexOf(e), on = e && (o.only ? o.only.includes(e) : T >= t0 + i * 0.28);
    g.fillStyle = on ? EMP[e][0] : LAND; g.fill(p); g.strokeStyle = 'rgba(30,35,40,0.5)'; g.lineWidth = 1.2 / s; g.stroke(p); }
  g.restore(); credit(MW.credit);
  if (o.legend !== false) order.forEach((e, i) => { if (o.only && !o.only.includes(e)) return; const k = clamp((T - t0 - i * 0.28) / 0.25); if (k <= 0) return; const y = 300 + i * 52;
    g.save(); g.globalAlpha = k; g.fillStyle = EMP[e][0]; g.fillRect(60, y - 26, 34, 34); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(60, y - 26, 34, 34);
    g.fillStyle = INK; g.font = '800 30px Archivo, sans-serif'; g.textAlign = 'left'; g.fillText(EMP[e][1], 106, y); g.restore(); }); }
function bars(T, t0) { const k = clamp((T - t0) / 0.8); if (k <= 0) return; const rows = [['GERMANY', 17.6, '#555'], ['BRITAIN', 7.7, '#E58C9D']];
  g.save(); g.translate(780, 60);   // góc phải dưới — không đè mặt Đức (REVIEW-v5 B)
  g.fillStyle = 'rgba(255,250,240,0.92)'; g.fillRect(120, 640, 900, 300); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(120, 640, 900, 300);
  g.fillStyle = INK; g.font = '900 38px Archivo, sans-serif'; g.textAlign = 'left'; g.fillText('STEEL MADE IN 1913 (million tons)', 150, 700);
  rows.forEach(([n, v, c], i) => { const y = 750 + i * 90; g.fillStyle = INK; g.font = '800 32px Archivo, sans-serif'; g.fillText(n, 150, y + 34);
    g.fillStyle = c; g.fillRect(360, y, 560 * v / 17.6 * easeOut(k), 50); g.fillStyle = INK; g.fillText(String(v), 370 + 560 * v / 17.6 * easeOut(k), y + 36); }); g.restore(); }


export { EMP, OWN, arrow, assassin, bars, bigFace, boxer, carPhoto, closeUp, credit, crowdRow, desat, driverAt, flash, hostIn, label, lipHost, nameTag, paper, person, photo, photoBg, pt, realBoom, shake, smoke, stamp, sticker, sweat, tear, vein, ward, world1914 };
