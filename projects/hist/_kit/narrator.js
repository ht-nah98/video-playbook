// Người dẫn kênh lịch sử VẼ NÉT bằng code — thiết kế v2 (2026-10-28): tóc đen búi củ tỏi, hông phải cạo, mắt lờ đờ, cười toe
// lộ răng, má hồng, khuyên tai, hoodie đen (cảm hứng ảnh người dùng gửi, vẽ riêng — không chép tranh). v1: tóc bạch kim (bỏ). Người dùng duyệt 2026-10-27 ("quá đẹp, tuyệt vời") — bàn thử projects/hist/_lab/host2.html,
// luật channels/hist/EDITING.md A1. Nét = công thức người dân đầu tròn; đồ đổi bằng code; miệng nhép theo đường bao giọng.
//   import { bindNarrator, narrator, cornerHost, mouthAt } from '../_kit/narrator.js';
//   bindNarrator(g, { mouth: <data/narration.mouth.json> });   // trước khi vẽ
//   narrator(x, yĐếGiày, h, { v: 'B', outfit: 'bowler', arms: 'flag', mouth: mouthAt(giây lời), mood, crouch, t })
//   cornerHost(t, mouthAt(t))                                    // nói ở góc phải dưới, cách mép 0.04 W
import { INK } from './mapkit.js';
const W = 1920, H = 1080, RED = '#C2343A';
const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
let g = null, MOUTH = null;
export function bindNarrator(ctx, o = {}) { g = ctx; MOUTH = o.mouth ?? MOUTH; }
const SKIN = '#F6D9B8', HAIR = '#F2E4C4', HAIR2 = '#1E1E22', HOOD = '#232326';
/** mức miệng theo đường bao giọng ở giây `ts` của lời đọc (data/narration.mouth.json), đổi ≤ 12 lần / s */
export function mouthAt(ts) { const step = Math.floor(ts * 12), v = MOUTH ? (MOUTH.q[Math.min(MOUTH.q.length - 1, Math.max(0, Math.floor(step / 12 * MOUTH.fps)))] ?? 0) / 255 : 0;
  if (v < 0.14) return 'rest'; const set = v < 0.4 ? ['small', 'o'] : v < 0.68 ? ['mid', 'mid', 'grit'] : ['wide', 'mid']; return set[Math.floor(hash(step) * set.length)]; }
function drawMouth(x, y, r, m, lw) { g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  const tongue = '#E07A7A', dark = '#5A1E22';
  if (m === 'rest') { g.beginPath(); g.moveTo(x - r * 0.2, y + r * 0.02); g.quadraticCurveTo(x + r * 0.02, y + r * 0.08, x + r * 0.2, y - r * 0.05); g.stroke();   // nhếch mép
  }
  else if (m === 'grin') { const w = r * 0.34, h = r * 0.24; const D = new Path2D(); D.moveTo(x - w, y - h * 0.3); D.quadraticCurveTo(x, y - h * 0.1, x + w, y - h * 0.45); D.quadraticCurveTo(x + w * 0.7, y + h, x - w * 0.1, y + h * 0.9); D.quadraticCurveTo(x - w * 0.85, y + h * 0.7, x - w, y - h * 0.3); D.closePath();
    g.fillStyle = '#B32A2E'; g.fill(D); g.save(); g.clip(D); g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(x - w, y - h * 0.3); g.quadraticCurveTo(x, y - h * 0.1, x + w, y - h * 0.45); g.lineTo(x + w, y + h * 0.05); g.quadraticCurveTo(x, y + h * 0.3, x - w, y + h * 0.1); g.closePath(); g.fill();
    g.strokeStyle = INK; g.lineWidth = lw * 0.45; for (const k of [-0.5, -0.15, 0.2, 0.55]) { g.beginPath(); g.moveTo(x + w * k, y - h * 0.3); g.lineTo(x + w * k, y + h * 0.18); g.stroke(); } g.restore(); g.stroke(D); }
  else if (m === 'smile') { g.beginPath(); g.arc(x, y - r * 0.08, r * 0.2, 0.25, Math.PI - 0.25); g.stroke(); }
  else if (m === 'small' || m === 'o') { const rx = m === 'o' ? r * 0.08 : r * 0.11, ry = m === 'o' ? r * 0.1 : r * 0.07; g.fillStyle = dark; g.beginPath(); g.ellipse(x, y + r * 0.04, rx, ry, 0, 0, 7); g.fill(); g.stroke(); }
  else if (m === 'tongue') { g.beginPath(); g.arc(x, y - r * 0.1, r * 0.2, 0.3, Math.PI - 0.3); g.stroke(); g.fillStyle = '#E4626E'; g.beginPath(); g.ellipse(x + r * 0.06, y + r * 0.12, r * 0.08, r * 0.1, 0.2, 0, Math.PI * 1.1); g.fill(); g.stroke(); }   // MỚI: lè lưỡi tinh nghịch
  else if (m === 'wavy') { g.beginPath(); for (let k = 0; k <= 6; k++) g.lineTo(x - r * 0.21 + k * r * 0.07, y + r * 0.04 + (k % 2 ? -1 : 1) * r * 0.035); g.stroke(); }   // MỚI: miệng run sóng (lo, bối rối)
  else if (m === 'pout') { g.beginPath(); g.arc(x, y + r * 0.2, r * 0.17, Math.PI + 0.4, -0.4); g.stroke(); }   // MỚI: mếu / bĩu
  else if (m === 'grit') { g.fillStyle = '#FFF'; g.beginPath(); g.roundRect(x - r * 0.2, y - r * 0.02, r * 0.4, r * 0.14, r * 0.05); g.fill(); g.stroke();
    g.lineWidth = lw * 0.5; for (const k of [-0.07, 0.07]) { g.beginPath(); g.moveTo(x + r * k, y - r * 0.02); g.lineTo(x + r * k, y + r * 0.12); g.stroke(); } }
  else { const big = m === 'wide', w = r * (big ? 0.3 : 0.22), h = r * (big ? 0.3 : 0.18);                                         // mở: chữ D + lưỡi + nanh
    const D = new Path2D(); D.moveTo(x - w, y - h * 0.15); D.quadraticCurveTo(x, y - h * 0.3, x + w, y - h * 0.15); D.quadraticCurveTo(x + w * 0.9, y + h, x, y + h); D.quadraticCurveTo(x - w * 0.9, y + h, x - w, y - h * 0.15); D.closePath();
    g.fillStyle = dark; g.fill(D); g.save(); g.clip(D); g.fillStyle = tongue; g.beginPath(); g.ellipse(x + w * 0.1, y + h * 0.95, w * 0.6, h * 0.45, 0, 0, 7); g.fill(); g.restore(); g.stroke(D);
    g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(x - w * 0.8, y - h * 0.18); g.quadraticCurveTo(x, y - h * 0.32, x + w * 0.8, y - h * 0.18); g.lineTo(x + w * 0.75, y + h * 0.08); g.quadraticCurveTo(x, y - h * 0.02, x - w * 0.75, y + h * 0.08); g.closePath(); g.fill(); }   // hàm răng trên (v2, bỏ nanh)
  g.restore(); }
/** búi tóc củ tỏi sau đỉnh đầu — vẽ TRƯỚC mặt (thiết kế v2 2026-10-28: người dùng chê "cục đen sau đầu trông kì") */
function hairBack(x, y, r, o) { g.save(); g.lineWidth = o.lw; g.strokeStyle = INK; g.fillStyle = HAIR2;
  g.beginPath(); g.ellipse(x - r * 0.12, y - r * 1.08, r * 0.3, r * 0.26, -0.2, 0, 7); g.fill(); g.stroke();                     // búi
  g.strokeStyle = '#4A4A52'; g.lineWidth = o.lw * 0.6; g.beginPath(); g.arc(x - r * 0.12, y - r * 1.08, r * 0.16, 3.6, 5.6); g.stroke(); g.restore(); }
/** tóc v2: đen vuốt ngược phủ đỉnh + trán trái; hông PHẢI cạo ngắn (xám, kẻ sọc mảnh) — lấy cảm hứng ảnh người dùng gửi, vẽ riêng */
function hair(x, y, r, o) { const lw = o.lw;
  g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round';
  g.save(); g.beginPath(); g.ellipse(x, y, r * 0.98, r, 0, 0, 7); g.clip();                                                      // vùng cạo trong viền đầu
  g.fillStyle = '#8E8E96'; g.beginPath(); g.moveTo(x + r * 0.25, y - r * 1.1); g.lineTo(x + r * 1.1, y - r * 0.9); g.lineTo(x + r * 1.1, y + r * 0.05); g.lineTo(x + r * 0.72, y + r * 0.02); g.quadraticCurveTo(x + r * 0.55, y - r * 0.45, x + r * 0.25, y - r * 0.62); g.closePath(); g.fill();
  g.strokeStyle = '#6E6E76'; g.lineWidth = lw * 0.4; for (let i = 0; i < 7; i++) { const yy = y - r * 0.8 + i * r * 0.12; g.beginPath(); g.moveTo(x + r * 0.5, yy); g.lineTo(x + r * 1.0, yy - r * 0.08); g.stroke(); }
  g.restore();
  g.fillStyle = HAIR2; g.beginPath();                                                                                             // khối tóc đen vuốt ngược
  g.moveTo(x - r * 1.0, y - r * 0.02); g.quadraticCurveTo(x - r * 1.08, y - r * 0.95, x - r * 0.2, y - r * 1.08); g.quadraticCurveTo(x + r * 0.45, y - r * 1.12, x + r * 0.62, y - r * 0.78);
  g.quadraticCurveTo(x + r * 0.42, y - r * 0.62, x + r * 0.22, y - r * 0.6); g.quadraticCurveTo(x - r * 0.1, y - r * 0.58, x - r * 0.38, y - r * 0.4);
  g.quadraticCurveTo(x - r * 0.62, y - r * 0.28, x - r * 0.78, y + r * 0.02); g.closePath(); g.fill(); g.stroke();
  if (!o.simple) { g.strokeStyle = '#55555E'; g.lineWidth = lw * 0.55; for (const [a0, b0, a1, b1] of [[-0.7, -0.55, -0.2, -0.95], [-0.45, -0.5, 0.1, -0.92], [-0.15, -0.62, 0.35, -0.88]]) { g.beginPath(); g.moveTo(x + r * a0, y + r * b0); g.quadraticCurveTo(x + r * (a0 + a1) / 2, y + r * (b1 - 0.08), x + r * a1, y + r * b1); g.stroke(); } }
  g.restore(); }
/** mắt lờ đờ đểu: lòng trắng + mi trên nặng + con ngươi chấm thấp; mood: smug | shock | angry | sad | closed */
/** mood MỚI (2026-10-30, thêm — không đổi tên cũ): wink | joy (mắt cười ^^) | star (mắt sao) | dizzy (xoáy) | teary (buồn + nước mắt) | side (liếc ngang) */
function eyes(x, y, r, o) { const lw = o.lw, mood0 = o.mood ?? 'smug', mood = mood0 === 'teary' ? 'sad' : mood0 === 'side' ? 'smug' : mood0, lk = (mood0 === 'side' ? 2.2 : o.look ?? 0) * r * 0.06;
  g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineCap = 'round';
  for (const s of [-1, 1]) { const ex = x + s * r * 0.36, ey = y, ew = r * (o.simple ? 0.11 : 0.19), eh = r * (o.simple ? 0.11 : 0.15);
    if (mood === 'closed') { g.beginPath(); g.arc(ex, ey - eh * 0.3, ew, 0.2, Math.PI - 0.2); g.stroke(); continue; }
    if (mood === 'joy' || (mood === 'wink' && s === 1)) { g.lineWidth = lw * 1.4; g.beginPath(); g.arc(ex, ey + eh * 0.5, ew, Math.PI + 0.35, -0.35); g.stroke(); g.lineWidth = lw; continue; }
    if (mood === 'star' || mood === 'dizzy') { g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, ew * 1.25, eh * 1.25, 0, 0, 7); g.fill(); g.stroke();
      if (mood === 'star') { g.fillStyle = '#F2B31B'; g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = (k % 2 ? 0.45 : 1) * ew * 0.95; g.lineTo(ex + Math.cos(a) * rr, ey + Math.sin(a) * rr); } g.closePath(); g.fill(); g.lineWidth = lw * 0.7; g.stroke(); g.lineWidth = lw; }
      else { g.beginPath(); for (let k = 0; k <= 40; k++) { const a = k * 0.45 * s, rr = ew * 1.05 * k / 40; g.lineTo(ex + Math.cos(a) * rr, ey + Math.sin(a) * rr * 0.8); } g.stroke(); }
      continue; }
    if (o.simple && mood !== 'shock') { g.fillStyle = INK; g.beginPath(); g.arc(ex + lk, ey + eh * 0.3, r * 0.06, 0, 7); g.fill(); g.lineWidth = lw * 1.2; g.beginPath(); g.moveTo(ex - ew, ey - eh * 0.2); g.lineTo(ex + ew, ey - eh * 0.2); g.stroke(); g.lineWidth = lw; continue; }
    const big = mood === 'shock' ? 1.3 : 1; g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, ew * big, eh * big, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.arc(ex + lk, ey + (mood === 'shock' ? 0 : eh * 0.35), r * (mood === 'shock' ? 0.04 : 0.055), 0, 7); g.fill();
    if (mood !== 'shock') { g.save(); g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.clip(); g.fillStyle = SKIN; g.fillRect(ex - ew, ey - eh, ew * 2, eh * (mood === 'angry' ? 1.0 : 0.85)); g.restore();
      g.lineWidth = lw * 1.6; g.beginPath(); const tilt = mood === 'angry' ? s * 0.35 : mood === 'sad' ? -s * 0.3 : 0; g.moveTo(ex - ew * 1.05, ey - eh * 0.15 - tilt * eh * s); g.lineTo(ex + ew * 1.05, ey - eh * 0.15 + tilt * eh * s); g.stroke(); g.lineWidth = lw; } }
  if (mood0 === 'teary') { g.fillStyle = 'rgba(120,190,245,0.9)'; for (const s of [-1, 1]) { const ex = x + s * r * 0.36; g.beginPath(); g.moveTo(ex - r * 0.07, y + r * 0.1); g.lineTo(ex + r * 0.07, y + r * 0.1);
    g.quadraticCurveTo(ex + r * 0.1, y + r * 0.5, ex + r * 0.05, y + r * 0.75); g.lineTo(ex - r * 0.05, y + r * 0.75); g.quadraticCurveTo(ex - r * 0.1, y + r * 0.5, ex - r * 0.07, y + r * 0.1); g.fill(); g.lineWidth = lw * 0.6; g.stroke(); } }
  g.restore(); }
/** chi tiết phụ trên mặt (MỚI 2026-10-30): fx = ['sweat' giọt mồ hôi thái dương, 'vein' gân giận, 'blush' đỏ mặt, 'shine' lấp lánh] */
function faceFx(x, hy, r, fx, lw) { if (!fx) return; g.save(); g.lineWidth = lw; g.strokeStyle = INK;
  if (fx.includes('sweat')) { const sx = x - r * 0.78, sy = hy - r * 0.45; g.fillStyle = '#9AD0F5'; g.beginPath(); g.moveTo(sx, sy - r * 0.22); g.bezierCurveTo(sx + r * 0.14, sy, sx + r * 0.12, sy + r * 0.13, sx, sy + r * 0.13); g.bezierCurveTo(sx - r * 0.12, sy + r * 0.13, sx - r * 0.14, sy, sx, sy - r * 0.22); g.fill(); g.stroke(); }
  if (fx.includes('vein')) { const vx = x - r * 0.55, vy = hy - r * 0.6; g.strokeStyle = '#D62B2B'; g.lineWidth = lw * 1.5; for (const [a, b] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) { g.beginPath(); g.moveTo(vx + a * r * 0.05, vy + b * r * 0.05); g.quadraticCurveTo(vx + a * r * 0.06, vy + b * r * 0.16, vx + a * r * 0.16, vy + b * r * 0.16); g.stroke(); } }
  if (fx.includes('blush')) { g.strokeStyle = '#D9535F'; g.lineWidth = lw * 0.7; for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const bx = x + s * r * 0.55 + (k - 1) * r * 0.07; g.beginPath(); g.moveTo(bx + r * 0.03, hy + r * 0.3); g.lineTo(bx - r * 0.03, hy + r * 0.42); g.stroke(); } }
  if (fx.includes('shine')) { g.fillStyle = '#FFE04A'; for (const [dx, dy, k] of [[1.2, -0.9, 0.16], [1.45, -0.55, 0.1], [-1.25, -0.8, 0.12]]) { const cx = x + dx * r, cy = hy + dy * r, q = k * r; g.beginPath(); g.moveTo(cx, cy - q); g.quadraticCurveTo(cx, cy, cx + q, cy); g.quadraticCurveTo(cx, cy, cx, cy + q); g.quadraticCurveTo(cx, cy, cx - q, cy); g.quadraticCurveTo(cx, cy, cx, cy - q); g.fill(); g.stroke(); } }
  g.restore(); }
// ── BIỂU CẢM KIỂU MEME (2026-10-30, thêm — không đổi tên / hình cũ). Vẽ lại TINH THẦN các mặt meme bằng nét người dẫn, không chép nét
//    gốc (khuôn / kiểu biểu cảm không có bản quyền, bức hình cụ thể thì có — LESSONS §231). Bàn thử projects/hist/_lab/meme-faces.html.
//    Là vốn thử, không phải bộ cố định: mỗi tập vẫn sáng tạo / phối mới theo tình huống.
//    mood: epic (mắt tròn liếc lên) | void (trân trối, quầng thâm) | sus (mi sụp liếc xéo, một mày nhướng) | derp (mắt lệch) | sob (nhắm tịt + hai dòng lệ)
//    mouth: epic (há toe răng + lưỡi) | flat | smirk | wail | scream | kiss · arms: facepalm | cheeks | kiss | think | cross · fx: boom | qmark | gloom
const MEME_EYES = new Set(['epic', 'void', 'sus', 'derp', 'sob']), MEME_MOUTH = new Set(['epic', 'flat', 'smirk', 'wail', 'scream', 'kiss']);
const FRONT = { facepalm: [0, 1], cheeks: [1, 1], kiss: [0, 1], think: [0, 1] };   // tay vẽ SAU mặt (che mặt / áp má / chống cằm)
function memeEyes(x, y, r, mood, lw) { g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineCap = 'round'; g.lineJoin = 'round';
  for (const s of [-1, 1]) { const ex = x + s * r * 0.36, ey = y, ew = r * 0.19, eh = r * 0.15;
    if (mood === 'sob') { g.lineWidth = lw * 1.5; g.beginPath(); g.moveTo(ex + s * ew, ey - eh * 0.8); g.lineTo(ex - s * ew * 0.6, ey); g.lineTo(ex + s * ew, ey + eh * 0.8); g.stroke(); g.lineWidth = lw; continue; }
    if (mood === 'epic') { const w2 = ew * 1.15, h2 = eh * 1.5, ey2 = ey - eh * 0.3; g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey2, w2, h2, 0, 0, 7); g.fill(); g.stroke();
      g.fillStyle = INK; g.beginPath(); g.arc(ex + w2 * 0.38, ey2 - h2 * 0.45, r * 0.075, 0, 7); g.fill(); continue; }
    if (mood === 'void') { g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, ew, eh * 1.1, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(ex, ey, r * 0.022, 0, 7); g.fill();
      g.strokeStyle = '#8A7A9A'; g.lineWidth = lw * 0.8; for (const k of [1.25, 1.75]) { g.beginPath(); g.arc(ex, ey + eh * (k - 1.0), ew * 0.9, 0.6, Math.PI - 0.6); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; continue; }
    if (mood === 'sus') { g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(ex - ew * 0.55, ey + eh * 0.35, r * 0.05, 0, 7); g.fill();
      g.save(); g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.clip(); g.fillStyle = SKIN; g.fillRect(ex - ew, ey - eh, ew * 2, eh * 1.05); g.restore();
      g.lineWidth = lw * 1.6; g.beginPath(); g.moveTo(ex - ew * 1.05, ey + eh * 0.05); g.lineTo(ex + ew * 1.05, ey + eh * 0.05); g.stroke();
      g.lineWidth = lw * 1.4; g.beginPath(); if (s < 0) { g.moveTo(ex - ew, ey - eh * 1.3); g.quadraticCurveTo(ex, ey - eh * 2.6, ex + ew, ey - eh * 1.6); } else { g.moveTo(ex - ew, ey - eh * 0.75); g.lineTo(ex + ew, ey - eh * 0.95); } g.stroke(); g.lineWidth = lw; continue; }
    if (mood === 'derp') { const k = s < 0 ? 1.25 : 0.85; g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(ex, ey, ew * k, eh * k * 1.1, 0, 0, 7); g.fill(); g.stroke();
      g.fillStyle = INK; g.beginPath(); g.arc(ex + (s < 0 ? -ew * 0.45 : ew * 0.4), ey + (s < 0 ? -eh * 0.6 : eh * 0.45), r * 0.05, 0, 7); g.fill(); continue; } }
  if (mood === 'sob') { g.fillStyle = 'rgba(120,190,245,0.92)'; for (const s of [-1, 1]) { const ex = x + s * r * 0.36; g.beginPath(); g.moveTo(ex - r * 0.1, y + r * 0.08); g.lineTo(ex + r * 0.1, y + r * 0.08);
    g.lineTo(ex + r * 0.17, y + r * 1.45); g.lineTo(ex - r * 0.17, y + r * 1.45); g.closePath(); g.fill(); g.lineWidth = lw * 0.6; g.stroke(); } }
  g.restore(); }
function memeMouth(x, y, r, m, lw) { g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  if (m === 'epic') { const w = r * 0.48, h = r * 0.46, top = dy => { g.moveTo(x - w, y - h * 0.15 + dy); g.quadraticCurveTo(x, y - h * 0.05 + dy, x + w, y - h * 0.25 + dy); };
    const D = new Path2D(); D.moveTo(x - w, y - h * 0.15); D.quadraticCurveTo(x, y - h * 0.05, x + w, y - h * 0.25); D.bezierCurveTo(x + w * 0.85, y + h * 0.95, x - w * 0.8, y + h * 1.05, x - w, y - h * 0.15); D.closePath();
    g.fillStyle = '#8E2B47'; g.fill(D); g.save(); g.clip(D); g.fillStyle = '#F4A6C0'; g.beginPath(); g.ellipse(x + w * 0.22, y + h * 0.78, w * 0.48, h * 0.34, -0.1, 0, 7); g.fill(); g.stroke();
    g.fillStyle = '#FFF'; g.beginPath(); top(0); g.lineTo(x + w, y - h * 0.25 + h * 0.22); g.quadraticCurveTo(x, y - h * 0.05 + h * 0.22, x - w, y - h * 0.15 + h * 0.22); g.closePath(); g.fill();
    g.lineWidth = lw * 0.8; g.beginPath(); top(h * 0.22); g.stroke(); g.restore(); g.lineWidth = lw * 1.3; g.stroke(D); }
  else if (m === 'flat') { g.lineWidth = lw * 1.2; g.beginPath(); g.moveTo(x - r * 0.17, y + r * 0.04); g.lineTo(x + r * 0.17, y + r * 0.04); g.stroke(); }
  else if (m === 'smirk') { g.lineWidth = lw * 1.2; g.beginPath(); g.moveTo(x - r * 0.18, y + r * 0.06); g.quadraticCurveTo(x + r * 0.05, y + r * 0.08, x + r * 0.24, y - r * 0.1); g.stroke(); g.lineWidth = lw * 0.8; g.beginPath(); g.moveTo(x + r * 0.27, y - r * 0.16); g.lineTo(x + r * 0.31, y - r * 0.04); g.stroke(); }
  else if (m === 'wail') { const D = new Path2D(); D.moveTo(x - r * 0.12, y - r * 0.06); D.lineTo(x + r * 0.12, y - r * 0.06); D.quadraticCurveTo(x + r * 0.32, y + r * 0.3, x + r * 0.26, y + r * 0.34); D.lineTo(x - r * 0.26, y + r * 0.34); D.quadraticCurveTo(x - r * 0.32, y + r * 0.3, x - r * 0.12, y - r * 0.06); D.closePath();
    g.fillStyle = '#5A1E22'; g.fill(D); g.save(); g.clip(D); g.fillStyle = '#E07A7A'; g.beginPath(); g.ellipse(x, y + r * 0.36, r * 0.18, r * 0.1, 0, 0, 7); g.fill(); g.restore(); g.stroke(D); }
  else if (m === 'scream') { g.fillStyle = '#5A1E22'; g.beginPath(); g.ellipse(x, y + r * 0.12, r * 0.12, r * 0.28, 0, 0, 7); g.fill(); g.stroke(); }
  else if (m === 'kiss') { g.fillStyle = '#E4626E'; for (const k of [-1, 1]) { g.beginPath(); g.ellipse(x + r * 0.03, y + k * r * 0.055, r * 0.08, r * 0.055, 0, 0, 7); g.fill(); g.stroke(); } }
  g.restore(); }
function memeFx(x, hy, r, fx, lw) { if (!fx) return; g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round';
  if (fx.includes('gloom')) { g.save(); g.beginPath(); g.ellipse(x, hy, r * 0.98, r, 0, 0, 7); g.clip(); g.strokeStyle = 'rgba(70,60,120,0.55)'; g.lineWidth = lw * 0.9;
    for (let i = 0; i < 9; i++) { const lx = x - r * 0.7 + i * r * 0.175; g.beginPath(); g.moveTo(lx, hy - r * 0.62); g.lineTo(lx, hy - r * (0.18 + 0.15 * hash(i + 3))); g.stroke(); } g.restore(); }
  if (fx.includes('boom')) { g.fillStyle = '#FFD23F'; g.beginPath(); for (let k = 0; k < 24; k++) { const a = Math.PI + k * Math.PI / 23, rr = (k % 2 ? 0.75 : 1.35) * r; g.lineTo(x + Math.cos(a) * rr * 1.1, hy - r * 0.7 + Math.sin(a) * rr); } g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#C9C9D0'; for (const [dx, dy, k] of [[-0.75, -1.0, 0.32], [-0.35, -1.3, 0.38], [0.1, -1.4, 0.4], [0.55, -1.25, 0.36], [0.85, -0.95, 0.3], [-0.05, -1.0, 0.34]]) { g.beginPath(); g.arc(x + dx * r, hy + dy * r, k * r, 0, 7); g.fill(); g.stroke(); } }
  if (fx.includes('qmark')) { g.fillStyle = '#2B6BD6'; g.font = `900 ${r * 0.55}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (const [dx, dy, a] of [[-1.2, -0.95, -0.3], [1.15, -1.1, 0.25], [1.35, -0.45, 0.4]]) { g.save(); g.translate(x + dx * r, hy + dy * r); g.rotate(a); g.strokeText('?', 0, 0); g.fillText('?', 0, 0); g.restore(); } }
  g.restore(); }
function frontArms(x, hy, r, sh, arms, col, lw, h) { const P = { facepalm: [null, [0.0, -0.02, 0.4]], cheeks: [[-0.9, 0.45, 0.2], [0.9, 0.45, 0.2]], kiss: [null, [0.22, 0.6, 0.13]], think: [null, [0.2, 1.02, 0.14]] }[arms];
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  for (let i = 0; i < 2; i++) { if (!P[i]) continue; const [sx, sy] = sh[i], hx = x + P[i][0] * r, hy2 = hy + P[i][1] * r, hr = P[i][2] * r;
    g.strokeStyle = col; g.lineWidth = Math.max(lw * 2.4, h * 0.05); g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo(hx + (i ? 1 : -1) * r * 0.35, hy2 + r * 0.8, hx, hy2 + hr * 0.6); g.stroke();
    g.strokeStyle = INK; g.lineWidth = lw; g.fillStyle = SKIN;
    if (arms === 'facepalm') for (let k = 0; k < 4; k++) { g.beginPath(); g.roundRect(hx + (k - 1.5) * hr * 0.44 - hr * 0.19, hy2 - hr * 1.45, hr * 0.38, hr * 1.2, hr * 0.19); g.fill(); g.stroke(); }   // 4 ngón duỗi lên trán
    g.beginPath(); g.ellipse(hx, hy2, hr, hr * (arms === 'facepalm' ? 0.75 : 1.15), 0, 0, 7); g.fill(); g.stroke(); }
  g.restore(); }
/** mũ / áo theo vai (study 15 §2 vai C): plain | bowler | soldier | officer | protest | reporter */
function hat(x, y, r, kind, lw) { g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round';
  if (kind === 'bowler' || kind === 'suit') { g.fillStyle = '#151517'; g.beginPath(); g.ellipse(x, y - r * 0.62, r * 1.2, r * 0.2, -0.05, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, y - r * 0.72, r * 0.78, r * 0.68, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
  if (kind === 'soldier') { g.fillStyle = '#6E7462'; g.beginPath(); g.ellipse(x, y - r * 0.55, r * 1.25, r * 0.22, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, y - r * 0.6, r * 0.9, r * 0.62, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
  if (kind === 'officer') { g.fillStyle = '#4C5A3E'; g.beginPath(); g.moveTo(x - r * 0.98, y - r * 0.42); g.bezierCurveTo(x - r * 1.35, y - r * 1.25, x + r * 1.35, y - r * 1.25, x + r * 0.98, y - r * 0.42); g.closePath(); g.fill(); g.stroke();   // chỏm phủ kín đỉnh đầu (bản cũ lộ sọ — QA 11-02)
    g.fillStyle = '#39452E'; g.beginPath(); g.moveTo(x - r * 0.98, y - r * 0.62); g.lineTo(x + r * 0.98, y - r * 0.62); g.lineTo(x + r * 0.98, y - r * 0.42); g.lineTo(x - r * 0.98, y - r * 0.42); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#151517'; g.beginPath(); g.ellipse(x, y - r * 0.42, r * 0.82, r * 0.16, 0, 0, Math.PI); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#D8B84A'; g.beginPath(); g.arc(x, y - r * 0.82, r * 0.1, 0, 7); g.fill(); g.stroke(); }
  if (kind === 'wehr') { g.fillStyle = '#5F6650'; g.beginPath(); g.moveTo(x - r * 1.12, y - r * 0.28); g.lineTo(x - r * 0.9, y - r * 0.55); g.bezierCurveTo(x - r * 0.95, y - r * 1.45, x + r * 0.95, y - r * 1.45, x + r * 0.9, y - r * 0.55); g.lineTo(x + r * 1.12, y - r * 0.28); g.quadraticCurveTo(x, y - r * 0.5, x - r * 1.12, y - r * 0.28); g.closePath(); g.fill(); g.stroke(); }   // mũ sắt Đức loe vành (soldier là mũ Anh)
  if (kind === 'protest') { g.fillStyle = RED; g.beginPath(); g.roundRect(x - r * 1.0, y - r * 0.62, r * 2.0, r * 0.2, r * 0.08); g.fill(); g.stroke(); g.beginPath(); g.moveTo(x + r * 0.9, y - r * 0.55); g.lineTo(x + r * 1.25, y - r * 0.3); g.lineTo(x + r * 1.05, y - r * 0.2); g.closePath(); g.fill(); g.stroke(); }
  if (kind === 'reporter') { g.fillStyle = '#6B5A45'; g.beginPath(); g.ellipse(x, y - r * 0.6, r * 1.15, r * 0.2, 0.05, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(x - r * 0.7, y - r * 0.62); g.quadraticCurveTo(x - r * 0.65, y - r * 1.25, x, y - r * 1.2); g.quadraticCurveTo(x + r * 0.65, y - r * 1.25, x + r * 0.7, y - r * 0.62); g.closePath(); g.fill(); g.stroke();
    g.font = `900 ${r * 0.13}px Archivo`; const tw = g.measureText('PRESS').width + r * 0.08;   // thẻ vừa chữ (bản cũ chữ tràn khỏi thẻ — người dùng 10-29)
    g.fillStyle = '#FFF'; g.fillRect(x + r * 0.15, y - r * 0.95, tw, r * 0.22); g.strokeRect(x + r * 0.15, y - r * 0.95, tw, r * 0.22); g.fillStyle = INK; g.textAlign = 'left'; g.fillText('PRESS', x + r * 0.19, y - r * 0.79); }
  g.restore(); }
const OUTFIT = { suit: ['#141416', 'tie'], plain: [HOOD, null], bowler: [HOOD, null], soldier: ['#7C7F5E', 'belt'], officer: ['#55613F', 'buttons'], wehr: ['#5F6650', 'belt'], protest: [HOOD, 'sign'], reporter: ['#8A7A62', 'notepad'], waiter: ['#F1EDE2', 'bowtie'], austro: ['#9DB7D5', 'buttons'], serb: ['#5E6B4E', 'buttons'] };   // waiter/austro/serb: wrong-turn (người hầu, quan Áo, bộ trưởng Serbia)
/** người dẫn: x = giữa, y = đế giày, h = cao toàn thân. o: v ('A' đơn giản | 'B' vừa | 'C' bán thân biếm hoạ), mouth, mood,
 *  look, outfit, arms ('rest' | 'point' | 'wave' | 'flag' | 'cover' | 'shrug'), bob, crouch 0..1 */
export function narrator(x, y, h, o = {}) { const v = o.v ?? 'B', simple = v === 'A', lw = Math.min(6, Math.max(3, h * 0.025));
  const headK = v === 'C' ? 0.36 : v === 'A' ? 0.26 : 0.29, r = h * headK, crouch = o.crouch ?? 0;
  const bh = h * (v === 'C' ? 0.42 : 0.42) * (1 - 0.35 * crouch), bw = h * (v === 'A' ? 0.36 : 0.4), by = y - (o.bob ?? 0);
  const [cloth, extra] = OUTFIT[o.outfit ?? 'plain'], hy = by - bh - r * 0.78;
  g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  if (o.lean) { g.translate(x, y); g.rotate(o.lean); g.translate(-x, -y); }
  const run = o.arms === 'run' ? Math.sin((o.t ?? 0) * 14) : 0;
  // chân + giày trắng đen (Concept B)
  if (v !== 'C') for (const s of [-1, 1]) { const sw = run * s * bw * 0.28; g.fillStyle = '#2B2B2E'; g.fillRect(x + s * bw * 0.22 - bw * 0.1 + sw, by - h * 0.08, bw * 0.2, h * 0.07);
    g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(x + s * bw * 0.24 + s * h * 0.015 + sw, by - h * 0.012, bw * 0.17, h * 0.025, 0, 0, 7); g.fill(); g.stroke(); }
  // thân hoodie / áo theo vai
  const top = by - bh - h * (v === 'C' ? 0 : 0.06), bot = by - h * (v === 'C' ? 0 : 0.07);
  const B = new Path2D(); B.moveTo(x - bw * 0.5, bot); B.lineTo(x - bw * 0.5, top + bw * 0.3); B.quadraticCurveTo(x - bw * 0.5, top, x - bw * 0.2, top); B.lineTo(x + bw * 0.2, top); B.quadraticCurveTo(x + bw * 0.5, top, x + bw * 0.5, top + bw * 0.3); B.lineTo(x + bw * 0.5, bot); B.closePath();
  g.fillStyle = cloth; g.fill(B); g.save(); g.clip(B);
  if (extra === 'tie') { g.fillStyle = '#F4F1E8'; g.beginPath(); g.moveTo(x - bw * 0.16, top); g.lineTo(x, top + (bot - top) * 0.32); g.lineTo(x + bw * 0.16, top); g.fill(); g.fillStyle = '#5A5A60'; g.fillRect(x - lw * 0.8, top + lw, lw * 1.6, (bot - top) * 0.28); }
  if (extra === 'bowtie') { const cy = top + lw * 3; g.fillStyle = '#151517'; g.beginPath(); g.moveTo(x, cy); g.lineTo(x - bw * 0.2, cy - bw * 0.1); g.lineTo(x - bw * 0.2, cy + bw * 0.1); g.closePath(); g.moveTo(x, cy); g.lineTo(x + bw * 0.2, cy - bw * 0.1); g.lineTo(x + bw * 0.2, cy + bw * 0.1); g.closePath(); g.fill(); }
  if (extra === 'belt') { g.fillStyle = '#4A3826'; g.fillRect(x - bw, bot - (bot - top) * 0.35, bw * 2, lw * 2.5); }
  if (extra === 'buttons') { g.fillStyle = '#D8B84A'; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(x, top + (bot - top) * (0.2 + i * 0.2), lw * 0.9, 0, 7); g.fill(); } }
  if (cloth === HOOD && !simple) { g.strokeStyle = '#EDEDED'; g.lineWidth = lw * 0.6; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x + s * bw * 0.1, top + lw); g.lineTo(x + s * bw * 0.12, top + (bot - top) * 0.35); g.stroke(); } }
  g.restore(); g.stroke(B);
  if (cloth === HOOD && !simple) { g.strokeStyle = '#3A3A40'; g.lineWidth = lw * 0.8; g.beginPath(); g.moveTo(x - bw * 0.3, bot - (bot - top) * 0.05); g.quadraticCurveTo(x - bw * 0.28, bot - (bot - top) * 0.4, x, bot - (bot - top) * 0.42); g.quadraticCurveTo(x + bw * 0.28, bot - (bot - top) * 0.4, x + bw * 0.3, bot - (bot - top) * 0.05); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw; }   // túi hoodie
  if (cloth === HOOD) { g.fillStyle = '#3A3A3E'; g.beginPath(); g.ellipse(x, top + lw, bw * 0.34, (bot - top) * 0.09, 0, 0, Math.PI); g.fill(); g.stroke(); }   // cổ mũ trùm
  // tay: vai → bàn tay tròn
  const sh = [[x - bw * 0.46, top + (bot - top) * 0.22], [x + bw * 0.46, top + (bot - top) * 0.22]], arms = o.arms ?? 'rest', t = o.t ?? 0;
  const tip = { rest: [[-0.62, 0.95], [0.62, 0.95]], point: [[-0.6, 0.95], [1.25, 0.1]], wave: [[-0.6, 0.95], [0.85, -0.55 + 0.12 * Math.sin(t * 10)]], flag: [[-0.6, 0.95], [0.75, -0.35]],
    cover: [[-0.25, -0.95], [0.25, -0.95]], shrug: [[-0.95, 0.05], [0.95, 0.05]], thumb: [[-0.6, 0.95], [0.62, 0.12]], cup: [[-0.3, 0], [0.3, 0]],
    hatchest: [[-0.18, 0.4], [0.18, 0.4]], pockets: [[-0.15, 0.78], [0.15, 0.78]], facepalm: [[-0.62, 0.95], [0, 0]], cheeks: [[0, 0], [0, 0]], kiss: [[-0.6, 0.95], [0, 0]], think: [[0.3, 0.62], [0, 0]], cross: [[0.32, 0.5], [-0.32, 0.5]], run: [[-0.85, 0.45 + 0.35 * run], [0.85, 0.45 - 0.35 * run]] }[arms];
  for (let i = 0; i < 2; i++) { if (v === 'C' && arms === 'rest') break; if (FRONT[arms]?.[i]) continue; const [sx, sy] = sh[i], hx = x + tip[i][0] * bw, hy2 = arms === 'cover' ? hy - r * 0.55 : arms === 'cup' ? hy + r * 0.5 : top + tip[i][1] * (bot - top);
    const hxx = arms === 'cover' ? x + (i ? 1 : -1) * r * 0.55 : arms === 'cup' ? x + (i ? 1 : -1) * r * 0.42 : hx;
    g.strokeStyle = cloth === HOOD ? '#232326' : cloth; g.lineWidth = Math.max(lw * 2.4, h * 0.05); g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo((sx + hxx) / 2 + (i ? 1 : -1) * bw * 0.1, (sy + hy2) / 2 + bw * 0.08, hxx, hy2); g.stroke();
    if (arms !== 'pockets') { g.strokeStyle = INK; g.lineWidth = lw; g.fillStyle = SKIN; g.beginPath(); g.arc(hxx, hy2, Math.max(lw * 2, h * 0.035), 0, 7); g.fill(); g.stroke(); }   // đút túi: giấu bàn tay
    if (i === 1 && arms === 'flag') { g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(hxx, hy2 + lw * 3); g.lineTo(hxx + bw * 0.05, hy2 - h * 0.42); g.stroke();
      g.save(); g.translate(hxx + bw * 0.05, hy2 - h * 0.42); g.rotate(0.08 + 0.06 * Math.sin(t * 6)); g.fillStyle = '#151515'; g.fillRect(0, 0, h * 0.28, h * 0.08); g.fillStyle = '#F3C61B'; g.fillRect(0, h * 0.08, h * 0.28, h * 0.08); g.strokeRect(0, 0, h * 0.28, h * 0.16); g.restore(); }
    if (i === 1 && extra === 'sign') { g.lineWidth = lw; g.beginPath(); g.moveTo(hxx, hy2); g.lineTo(hxx, hy2 - h * 0.45); g.stroke(); g.fillStyle = '#FFF'; g.fillRect(hxx - h * 0.18, hy2 - h * 0.62, h * 0.36, h * 0.2); g.strokeRect(hxx - h * 0.18, hy2 - h * 0.62, h * 0.36, h * 0.2);
      g.fillStyle = INK; g.font = `900 ${h * 0.06}px Archivo`; g.textAlign = 'center'; g.fillText('NO WAR!', hxx, hy2 - h * 0.49); }
    if (i === 1 && arms === 'thumb') { g.lineWidth = lw * 1.4; g.beginPath(); g.moveTo(hxx, hy2); g.lineTo(hxx, hy2 - h * 0.06); g.stroke(); }
    if (i === 1 && arms === 'hatchest') { const cy = top + (bot - top) * 0.32; g.fillStyle = '#151517'; g.lineWidth = lw; g.beginPath(); g.ellipse(x, cy + r * 0.25, r * 0.75, r * 0.13, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, cy + r * 0.2, r * 0.48, r * 0.42, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
    if (i === 0 && extra === 'notepad') { g.fillStyle = '#FFF'; g.fillRect(hxx - h * 0.06, hy2 - h * 0.1, h * 0.12, h * 0.15); g.strokeRect(hxx - h * 0.06, hy2 - h * 0.1, h * 0.12, h * 0.15); } }
  // đầu
  const HATTED = ['bowler', 'suit', 'soldier', 'officer', 'wehr', 'reporter'], hatK = HATTED.includes(o.outfit) ? o.outfit : null;   // đồ không mũ (waiter, austro, serb, protest) giữ tóc
  if (!hatK) hairBack(x, hy, r, { lw });
  g.lineWidth = lw; g.fillStyle = SKIN; g.beginPath(); g.ellipse(x, hy, r * 0.98, r, 0, 0, 7); g.fill(); g.stroke();
  for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.98, hy + r * 0.1, r * 0.12, r * 0.18, 0, 0, 7); g.fill(); g.stroke(); }   // tai
  const hk = hatK;
  if (!hk) hair(x, hy, r, { simple, lw }); else { g.save(); g.beginPath(); g.rect(x - r * 2, hy - r * 0.5, r * 4, r * 2); g.clip(); hair(x, hy, r, { simple, lw }); g.restore(); }   // tóc lòi dưới vành
  if (MEME_EYES.has(o.mood)) memeEyes(x, hy + r * 0.05, r, o.mood, lw); else eyes(x, hy + r * 0.05, r, { simple, lw, mood: o.mood, look: o.look });
  g.save(); g.fillStyle = 'rgba(232,110,120,0.45)'; for (const s2 of [-1, 1]) { g.beginPath(); g.ellipse(x + s2 * r * 0.55, hy + r * 0.36, r * 0.16, r * 0.08, 0, 0, 7); g.fill(); } g.restore();   // má hồng
  g.save(); g.strokeStyle = INK; g.lineWidth = lw * 0.8; g.beginPath(); g.arc(x + r * 0.99, hy + r * 0.3, r * 0.06, 0, 7); g.stroke(); g.restore();                                                // khuyên tai
  if (o.mood === 'angry') { /* mi xếch đã vẽ trong eyes */ }
  (MEME_MOUTH.has(o.mouth) ? memeMouth : drawMouth)(x + r * 0.04, hy + r * 0.5, r, o.mouth ?? 'rest', lw);
  faceFx(x, hy, r, o.fx, lw); memeFx(x, hy, r, o.fx, lw);
  if (o.outfit && o.outfit !== 'plain') hat(x, hy, r, o.outfit, lw);
  if (FRONT[arms]) frontArms(x, hy, r, sh, arms, cloth === HOOD ? '#232326' : cloth, lw, h);   // tay vẽ SAU mũ (vành mũ từng đè bàn tay — người dùng 10-30)
  g.restore(); }

/** người dẫn nói ở góc (vai A): bán thân C, NÂNG lên thấy vai + ngực, cách mép phải ~0.04 W (người dùng 10-27:
 *  "cao lên một chút, đừng nằm tịt ở góc… cách lề một khoảng nhỏ") — thân cắt ở mép dưới như người ngồi trước khung */
export function cornerHost(t, mouth, o = {}) { const h = o.h ?? 470, x = W - (o.margin ?? 0.04 * W) - h * 0.36 * 1.15;
  narrator(x, H + h * 0.02, h, { v: 'C', mouth, bob: 3 * Math.sin(t * 2.2), look: -1 }); }

// MŨ VUI (2026-10-30, người dùng thích mũ rơm berlin): đội lên người dẫn đã vẽ ở (x, chân y, cỡ h, bản v — mặc định C). Gọi SAU narrator().
// Bản v B / A: head r khác → truyền o.v. Đáy chóp mũ b = hy − 0.5 r (ngay trên lông mày), chóp TRÙM búi tóc.
// kind = straw | pith | bicorne | crown | viking | laurel | night
export function hatOn(x, y, h, kind, o = {}) { const v = o.v ?? 'C', r = h * (v === 'C' ? 0.36 : v === 'A' ? 0.26 : 0.29), hy = y - 0.42 * h - 0.78 * r, b = hy - r * 0.5, lw = Math.min(6, Math.max(3, h * 0.025)); g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round';
  const dome = (w, hh, col) => { g.fillStyle = col; g.beginPath(); g.ellipse(x, b, w, hh, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); };
  if (kind === 'straw') { g.fillStyle = '#EBC86E'; g.beginPath(); g.ellipse(x, b, r * 1.5, r * 0.3, 0, 0, 7); g.fill(); g.stroke(); dome(r * 0.86, r * 0.95, '#EBC86E');
    g.fillStyle = '#2E4A7A'; g.beginPath(); g.moveTo(x - r * 0.85, b - r * 0.04); g.lineTo(x + r * 0.85, b - r * 0.04); g.lineTo(x + r * 0.8, b - r * 0.26); g.lineTo(x - r * 0.8, b - r * 0.26); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#B8923F'; g.lineWidth = 3; for (let k = -4; k <= 4; k++) { g.beginPath(); g.moveTo(x + k * r * 0.3, b + r * 0.2); g.lineTo(x + k * r * 0.32, b + r * 0.05); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = lw; for (let k = 0; k < 9; k++) { const a = Math.PI * (0.06 + k * 0.11); g.beginPath(); g.moveTo(x + Math.cos(a) * r * 1.47, b + Math.sin(a) * r * 0.29); g.lineTo(x + Math.cos(a) * r * 1.57, b + Math.sin(a) * r * 0.36); g.stroke(); } }
  if (kind === 'pith') { g.fillStyle = '#D9C49A'; g.beginPath(); g.ellipse(x, b, r * 1.3, r * 0.26, 0, 0, 7); g.fill(); g.stroke(); dome(r * 0.95, r * 1.0, '#D9C49A');
    g.fillStyle = '#7A5A35'; g.fillRect(x - r * 0.94, b - r * 0.2, r * 1.88, r * 0.18); g.strokeRect(x - r * 0.94, b - r * 0.2, r * 1.88, r * 0.18);
    g.fillStyle = '#D9C49A'; g.beginPath(); g.arc(x, b - r * 1.02, r * 0.1, 0, 7); g.fill(); g.stroke(); }
  if (kind === 'bicorne') { g.fillStyle = '#16161A'; g.beginPath(); g.moveTo(x - r * 1.45, b + r * 0.05); g.quadraticCurveTo(x, b - r * 1.95, x + r * 1.45, b + r * 0.05); g.quadraticCurveTo(x, b - r * 0.25, x - r * 1.45, b + r * 0.05); g.fill(); g.stroke();
    g.strokeStyle = '#D8B84A'; g.lineWidth = lw * 1.4; g.beginPath(); g.moveTo(x - r * 1.36, b); g.quadraticCurveTo(x, b - r * 1.8, x + r * 1.36, b); g.stroke();
    g.strokeStyle = INK; g.lineWidth = lw; [['#2B4C9B', 0.2], ['#FFF', 0.13], ['#D62B2B', 0.06]].forEach(([c, k]) => { g.fillStyle = c; g.beginPath(); g.arc(x + r * 0.5, b - r * 0.6, r * k, 0, 7); g.fill(); g.stroke(); }); }
  if (kind === 'crown') { g.fillStyle = '#F2C230'; g.beginPath(); g.moveTo(x - r * 0.8, b + r * 0.05); for (let k = 0; k <= 4; k++) { const px = x - r * 0.8 + k * r * 0.4; g.lineTo(px, b - r * (k % 2 ? 0.55 : 0.85)); if (k < 4) g.lineTo(px + r * 0.2, b - r * 0.4); }
    g.lineTo(x + r * 0.8, b + r * 0.05); g.closePath(); g.fill(); g.stroke(); [['#D62B2B', -0.4], ['#2B6BD6', 0], ['#2EA44F', 0.4]].forEach(([c, dx]) => { g.fillStyle = c; g.beginPath(); g.arc(x + dx * r, b - r * 0.15, r * 0.08, 0, 7); g.fill(); g.stroke(); }); }
  if (kind === 'viking') { for (const sd of [-1, 1]) { g.fillStyle = '#F4EBD6'; g.beginPath(); g.moveTo(x + sd * r * 0.75, b - r * 0.25); g.quadraticCurveTo(x + sd * r * 1.45, b - r * 0.5, x + sd * r * 1.3, b - r * 1.25); g.quadraticCurveTo(x + sd * r * 1.15, b - r * 0.7, x + sd * r * 0.7, b - r * 0.6); g.closePath(); g.fill(); g.stroke(); }
    dome(r * 0.9, r * 0.95, '#9AA0A8'); g.fillStyle = '#7B6248'; g.fillRect(x - r * 0.9, b - r * 0.16, r * 1.8, r * 0.2); g.strokeRect(x - r * 0.9, b - r * 0.16, r * 1.8, r * 0.2);
    g.fillStyle = '#C9CDD2'; for (let k = -3; k <= 3; k++) { g.beginPath(); g.arc(x + k * r * 0.25, b - r * 0.06, r * 0.04, 0, 7); g.fill(); } }
  if (kind === 'laurel') { g.fillStyle = '#5FA055'; for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) { const a = Math.PI * (sd < 0 ? 1.05 + k * 0.08 : 1.95 - k * 0.08), lx = x + Math.cos(a) * r * 0.98, ly = hy - r * 0.15 + Math.sin(a) * r * 0.98;
    g.beginPath(); g.ellipse(lx, ly, r * 0.17, r * 0.08, a + sd * 1.2, 0, 7); g.fill(); g.stroke(); } }
  if (kind === 'night') { g.fillStyle = '#5C7FB5'; g.beginPath(); g.moveTo(x - r * 0.9, b + r * 0.05); g.quadraticCurveTo(x - r * 0.6, b - r * 1.3, x + r * 0.5, b - r * 1.2); g.quadraticCurveTo(x + r * 1.3, b - r * 0.9, x + r * 1.35, b - r * 0.1);
    g.quadraticCurveTo(x + r * 0.9, b - r * 0.6, x + r * 0.9, b + r * 0.05); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#FFF'; g.fillRect(x - r * 0.95, b - r * 0.12, r * 1.9, r * 0.2); g.strokeRect(x - r * 0.95, b - r * 0.12, r * 1.9, r * 0.2);
    g.beginPath(); g.arc(x + r * 1.35, b - r * 0.05, r * 0.16, 0, 7); g.fill(); g.stroke(); }
  g.restore(); }
