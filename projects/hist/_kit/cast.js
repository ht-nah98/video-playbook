// Dàn nhân vật vẽ của kênh lịch sử (2026-10-28, học từ ảnh mẫu người dùng gửi: quần chúng tròn trắng mắt chấm, trang phục
// thay trên cùng một thân, đầu ẢNH THẬT trên thân vẽ). Tập import, không chép. Tất định: không Math.random — dùng hash(i).
//   import * as C from '../_kit/cast.js';  C.bindCast(g, { HEADS });   // HEADS[k] = { im, chin:[x,y], unit } (heads/<k>.png + .json)
//   C.folk(x, yĐế, h, { eyes, wear, coat, arm, flag, look, tilt }) · C.crowd(x0, x1, yĐế, h, t, { rows, eyes, wears, cheer, panic, skip })
//   C.figure(k, x, yĐế, h, { body, arms, flip })   — đầu ảnh thật + thân vẽ quân phục / váy / com-lê
import { INK } from './mapkit.js';
import { hash } from './stage.js';
let g = null, HEADS = {};
export function bindCast(ctx, o = {}) { g = ctx; HEADS = o.HEADS ?? HEADS; }

/** mắt: dot (chấm) · bored (vạch dẹt — meme "mắt chán") · shock (tròn trắng) · angry (chấm + mày xếch) · cry (chấm + lệ) · happy (cung) */
function eyes(x, y, r, kind = 'dot', look = 0) { const lk = look * r * 0.16, dx = r * 0.3;
  g.save(); g.fillStyle = INK; g.strokeStyle = INK; g.lineCap = 'round';
  for (const s of [-1, 1]) { const ex = x + s * dx + lk;
    if (kind === 'bored') { g.lineWidth = r * 0.07; g.fillStyle = '#FFF'; g.beginPath(); g.roundRect(ex - r * 0.2, y - r * 0.05, r * 0.4, r * 0.12, r * 0.04); g.fill(); g.stroke(); g.fillStyle = INK; g.fillRect(ex - r * 0.18 + lk * 0.5, y - r * 0.03, r * 0.13, r * 0.08); continue; }
    if (kind === 'shock') { g.lineWidth = r * 0.05; g.fillStyle = '#FFF'; g.beginPath(); g.arc(ex, y, r * 0.17, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(ex + lk * 0.3, y, r * 0.05, 0, 7); g.fill(); continue; }
    if (kind === 'happy') { g.lineWidth = r * 0.07; g.beginPath(); g.arc(ex, y + r * 0.04, r * 0.09, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); continue; }
    g.beginPath(); g.arc(ex, y, r * 0.065, 0, 7); g.fill();
    if (kind === 'angry') { g.lineWidth = r * 0.07; g.beginPath(); g.moveTo(ex - s * r * 0.16, y - r * 0.2); g.lineTo(ex + s * r * 0.1, y - r * 0.1); g.stroke(); }
    if (kind === 'cry' && s === 1) { g.fillStyle = '#7CC4F2'; g.beginPath(); g.moveTo(ex, y + r * 0.08); g.quadraticCurveTo(ex + r * 0.12, y + r * 0.32, ex, y + r * 0.36); g.quadraticCurveTo(ex - r * 0.12, y + r * 0.32, ex, y + r * 0.08); g.fill(); g.fillStyle = INK; } }
  g.restore(); }

/** miệng (tuỳ chọn): o (há), frown (mếu), grin (cười), flat (mím) */
function mouth(x, y, r, k, lw) { g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.fillStyle = '#7A2A2A';
  if (k === 'o') { g.beginPath(); g.ellipse(x, y, r * 0.11, r * 0.15, 0, 0, 7); g.fill(); g.stroke(); }
  if (k === 'frown') { g.beginPath(); g.arc(x, y + r * 0.12, r * 0.18, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
  if (k === 'grin') { g.beginPath(); g.arc(x, y - r * 0.08, r * 0.24, 0.15, Math.PI - 0.15); g.closePath(); g.fill(); g.stroke(); }
  if (k === 'flat') { g.beginPath(); g.moveTo(x - r * 0.14, y); g.lineTo(x + r * 0.14, y); g.stroke(); }
  g.restore(); }
/** mũ / đồ trên đầu — vẽ sau mặt. r = bán kính đầu, (x, y) = tâm đầu */
const HAT = {
  bowler: (x, y, r) => { g.fillStyle = '#17171A'; g.beginPath(); g.ellipse(x, y - r * 0.68, r * 1.12, r * 0.17, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(x, y - r * 0.76, r * 0.7, r * 0.6, 0, Math.PI, 0); g.fill(); },
  fez: (x, y, r) => { g.fillStyle = '#B3262C'; g.beginPath(); g.moveTo(x - r * 0.55, y - r * 0.62); g.lineTo(x - r * 0.42, y - r * 1.4); g.lineTo(x + r * 0.42, y - r * 1.4); g.lineTo(x + r * 0.55, y - r * 0.62); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#151515'; g.beginPath(); g.moveTo(x, y - r * 1.4); g.quadraticCurveTo(x + r * 0.5, y - r * 1.3, x + r * 0.5, y - r * 0.9); g.stroke(); g.strokeStyle = INK; },
  cap: (x, y, r) => { g.fillStyle = '#5B5A55'; g.beginPath(); g.ellipse(x, y - r * 0.6, r * 0.98, r * 0.5, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.fillRect(x - r * 0.1, y - r * 0.66, r * 1.15, r * 0.15); },
  top: (x, y, r) => { g.fillStyle = '#121214'; g.fillRect(x - r * 0.62, y - r * 1.75, r * 1.24, r * 1.1); g.beginPath(); g.ellipse(x, y - r * 0.65, r * 1.05, r * 0.15, 0, 0, 7); g.fill(); },
  kepi: (x, y, r) => { g.fillStyle = '#7E9DC0'; g.beginPath(); g.moveTo(x - r * 0.72, y - r * 0.55); g.lineTo(x - r * 0.62, y - r * 1.2); g.lineTo(x + r * 0.62, y - r * 1.2); g.lineTo(x + r * 0.72, y - r * 0.55); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#151515'; g.fillRect(x - r * 0.75, y - r * 0.62, r * 1.5, r * 0.14); g.fillStyle = '#D9B13B'; g.beginPath(); g.arc(x, y - r * 0.9, r * 0.1, 0, 7); g.fill(); },
  plume: (x, y, r) => { HAT.kepi(x, y, r); g.fillStyle = '#3E8E3A'; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.22; g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.55, y - r * 1.2 + Math.sin(a) * r * 0.55, r * 0.12, r * 0.42, a + Math.PI / 2, 0, 7); g.fill(); } },
  police: (x, y, r) => { g.fillStyle = '#2B3A55'; g.beginPath(); g.ellipse(x, y - r * 0.62, r * 0.95, r * 0.75, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#D9B13B'; g.beginPath(); g.arc(x, y - r * 0.95, r * 0.12, 0, 7); g.fill(); },
  helmet: (x, y, r) => { g.fillStyle = '#6E7360'; g.beginPath(); g.ellipse(x, y - r * 0.5, r * 1.15, r * 0.16, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, y - r * 0.55, r * 0.82, r * 0.7, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); },
  stahl: (x, y, r) => { g.fillStyle = '#5F6650'; g.beginPath(); g.moveTo(x - r * 1.08, y - r * 0.3); g.lineTo(x - r * 0.86, y - r * 0.55); g.bezierCurveTo(x - r * 0.9, y - r * 1.4, x + r * 0.9, y - r * 1.4, x + r * 0.86, y - r * 0.55); g.lineTo(x + r * 1.08, y - r * 0.3); g.quadraticCurveTo(x, y - r * 0.5, x - r * 1.08, y - r * 0.3); g.closePath(); g.fill(); g.stroke(); },   // mũ sắt Đức loe vành (helmet là mũ Anh)
  pickel: (x, y, r) => { g.fillStyle = '#1C1C1F'; g.beginPath(); g.ellipse(x, y - r * 0.58, r * 0.9, r * 0.72, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#C9A13B'; g.beginPath(); g.moveTo(x - r * 0.12, y - r * 1.25); g.lineTo(x, y - r * 1.75); g.lineTo(x + r * 0.12, y - r * 1.25); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(x, y - r * 0.92, r * 0.16, 0, 7); g.fill(); },
  driver: (x, y, r) => { HAT.cap(x, y, r); const gy = y - r * 0.5; g.save();   // kính bảo hộ: dây nâu + hai mắt kính dẹt màu khói trên vành mũ (bản tròn bị đọc thành "mắt thứ hai")
    g.fillStyle = '#6B4A2E'; g.fillRect(x - r * 0.95, gy - r * 0.05, r * 1.9, r * 0.1);
    for (const s of [-1, 1]) { g.fillStyle = '#4E5C68'; g.beginPath(); g.roundRect(x + s * r * 0.3 - r * 0.2, gy - r * 0.1, r * 0.4, r * 0.2, r * 0.06); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.7)'; const lw0 = g.lineWidth; g.lineWidth = Math.max(1.5, r * 0.03); g.beginPath(); g.moveTo(x + s * r * 0.3 - r * 0.12, gy - r * 0.04); g.lineTo(x + s * r * 0.3 - r * 0.02, gy - r * 0.04); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw0; } g.restore(); },
  sophiehat: (x, y, r) => { g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(x, y - r * 0.72, r * 1.35, r * 0.22, -0.08, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, y - r * 0.9, r * 0.75, r * 0.4, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#F2EEE8'; for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(x + r * (0.2 + i * 0.16), y - r * (1.25 + 0.05 * Math.sin(i)), r * 0.12, r * 0.38, 0.6 + i * 0.12, 0, 7); g.fill(); g.stroke(); } },
  scarf: (x, y, r) => { g.fillStyle = '#8E5F72'; g.beginPath(); g.arc(x, y, r * 1.08, Math.PI * 0.95, Math.PI * 2.05); g.lineTo(x + r * 0.9, y + r * 0.45); g.lineTo(x - r * 0.9, y + r * 0.45); g.closePath(); g.fill(); g.stroke(); },
};
/** áo: màu thân + chi tiết (cúc, cổ, thắt lưng) */
const COAT = { tsarcoat: ['#3C5A44', 'buttons', 'collar'], driver: ['#3A3A40', 'buttons'], plain: ['#FFFFFF'], suit: ['#1D1D21', 'tie'], austro: ['#9FB7D4', 'buttons', 'collar'], soldier: ['#7B7F5E', 'belt'], german: ['#5D6470', 'buttons', 'collar'],
  gown: ['#F3EEE6', 'lace'], worker: ['#8A6A4A'], police: ['#2B3A55', 'buttons'] };

/** một người quần chúng: thân viên thuốc + đầu tròn + mắt chấm, tay một nét cong. yĐế = chân; h = cao cả người */
export function folk(x, y, h, o = {}) { const bw = h * 0.42, bh = h * 0.58, r = h * 0.21, hy = y - bh - r * 0.72, lw = Math.max(3, h * 0.026);
  const [col, ...det] = COAT[o.coat ?? 'plain'] ?? COAT.plain;
  g.save(); if (o.tilt) { g.translate(x, y); g.rotate(o.tilt); g.translate(-x, -y); }
  g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  g.fillStyle = col; g.beginPath(); g.moveTo(x - bw / 2, y); g.lineTo(x - bw / 2, y - bh + bw / 2); g.arc(x, y - bh + bw / 2, bw / 2, Math.PI, 0); g.lineTo(x + bw / 2, y); g.closePath(); g.fill(); g.stroke();
  if (det.includes('buttons')) { g.fillStyle = '#D9B13B'; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(x, y - bh * 0.85 + i * bh * 0.2, lw * 0.9, 0, 7); g.fill(); } }
  if (det.includes('collar')) { g.fillStyle = '#B3262C'; g.fillRect(x - bw * 0.22, y - bh + bw * 0.08, bw * 0.44, bh * 0.08); }
  if (det.includes('belt')) { g.fillStyle = '#4A3A26'; g.fillRect(x - bw / 2, y - bh * 0.42, bw, bh * 0.08); }
  if (det.includes('tie')) { g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(x - bw * 0.14, y - bh + bw * 0.1); g.lineTo(x, y - bh * 0.72); g.lineTo(x + bw * 0.14, y - bh + bw * 0.1); g.fill(); g.strokeStyle = '#555'; g.beginPath(); g.moveTo(x, y - bh * 0.92); g.lineTo(x, y - bh * 0.62); g.stroke(); g.strokeStyle = INK; }
  if (det.includes('lace')) { g.strokeStyle = '#C9BFAE'; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(x - bw / 2 + 4, y - bh * (0.3 + i * 0.18)); g.lineTo(x + bw / 2 - 4, y - bh * (0.3 + i * 0.18)); g.stroke(); } g.strokeStyle = INK; }
  if (o.armband) { g.fillStyle = o.armband; g.fillRect(x - bw / 2 - lw * 0.3, y - bh * 0.7, bw * 0.2, bh * 0.12); }
  // tay: một nét cong (thả / giơ / vẫy cờ)
  g.lineWidth = lw * 1.4; for (const s of [-1, 1]) { const sx = x + s * bw * 0.36, sy = y - bh * 0.72; g.beginPath(); g.moveTo(sx, sy);
    if ((o.arm === 'up' || (o.flag && s === 1)) ) g.quadraticCurveTo(sx + s * bw * 0.35, sy - bh * 0.2, sx + s * bw * 0.3, sy - bh * 0.6);
    else g.quadraticCurveTo(sx + s * bw * 0.08, sy + bh * 0.25, sx - s * bw * 0.02, sy + bh * 0.45); g.stroke(); }
  if (o.flag) { const fx = x + bw * 0.66, fy = y - bh * 1.32, a = o.wave ?? 0; g.lineWidth = lw; g.beginPath(); g.moveTo(fx, fy + bh * 0.1); g.lineTo(fx, fy - h * 0.3); g.stroke();
    g.save(); g.translate(fx, fy - h * 0.3); g.rotate(0.06 * a); const fw = h * 0.32, fh = h * 0.2, cols = o.flag;
    cols.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * fh / cols.length, fw, fh / cols.length); }); g.lineWidth = lw * 0.7; g.strokeRect(0, 0, fw, fh); g.restore(); }
  if (o.noHead) { g.restore(); return { neck: [x, y - bh], bw }; }
  g.lineWidth = lw; g.fillStyle = o.skin ?? '#FFFFFF'; g.beginPath(); g.arc(x, hy, r, 0, 7); g.fill(); g.stroke();
  eyes(x, hy + r * 0.05, r, o.eyes ?? 'dot', o.look ?? 0);
  if (o.mouth) mouth(x, hy + r * 0.42, r, o.mouth, lw);
  if (o.feat && FEAT[o.feat]) FEAT[o.feat](x, hy, r, lw);
  if (o.sweat) { g.fillStyle = '#7CC4F2'; g.beginPath(); g.ellipse(x + r * 0.8, hy - r * 0.35, r * 0.1, r * 0.16, 0, 0, 7); g.fill(); g.stroke(); }
  if (o.wear && HAT[o.wear]) HAT[o.wear](x, hy, r);
  g.restore(); return { head: [x, hy], r }; }

/** đặc điểm nhận dạng nhân vật VẼ đầu tròn (kiểu quần chúng + 1–2 nét riêng: râu, tóc) */
const FEAT = {
  ff: (x, y, r, lw) => { g.fillStyle = '#2E241E'; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x, y + r * 0.22); g.bezierCurveTo(x + s * r * 0.3, y + r * 0.1, x + s * r * 0.6, y + r * 0.2, x + s * r * 0.72, y - r * 0.06);   // ria mép rậm vểnh — không có miệng
    g.bezierCurveTo(x + s * r * 0.66, y + r * 0.42, x + s * r * 0.3, y + r * 0.44, x, y + r * 0.36); g.closePath(); g.fill(); } },
  wilhelm: (x, y, r, lw) => { g.strokeStyle = '#2A221C'; g.lineWidth = lw * 1.8; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x, y + r * 0.24); g.lineTo(x + s * r * 0.36, y + r * 0.24); g.lineTo(x + s * r * 0.52, y - r * 0.2); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; },
  fj: (x, y, r, lw) => { g.fillStyle = '#E4E4E0'; g.beginPath(); g.moveTo(x - r * 0.95, y - r * 0.1); g.quadraticCurveTo(x - r * 1.05, y + r * 0.75, x - r * 0.45, y + r * 0.6);   // tóc mai nối ria trắng (một khối)
    g.quadraticCurveTo(x, y + r * 0.3, x + r * 0.45, y + r * 0.6); g.quadraticCurveTo(x + r * 1.05, y + r * 0.75, x + r * 0.95, y - r * 0.1); g.quadraticCurveTo(x + r * 0.7, y + r * 0.3, x, y + r * 0.22); g.quadraticCurveTo(x - r * 0.7, y + r * 0.3, x - r * 0.95, y - r * 0.1); g.fill(); g.stroke(); },
  sophie: (x, y, r, lw) => { g.fillStyle = '#3A2E26'; g.beginPath(); g.ellipse(x, y - r * 0.72, r * 0.7, r * 0.42, 0, 0, 7); g.fill(); g.beginPath(); g.arc(x, y - r * 0.25, r * 1.0, Math.PI * 1.08, Math.PI * 1.92); g.lineTo(x, y - r * 0.7); g.closePath(); g.fill(); },
  potiorek: (x, y, r, lw) => { g.fillStyle = '#4A3F36'; g.beginPath(); g.ellipse(x, y + r * 0.3, r * 0.3, r * 0.09, 0, 0, 7); g.fill(); },
  tsar: (x, y, r, lw) => { g.fillStyle = '#6B4A30'; g.beginPath(); g.arc(x, y + r * 0.25, r * 0.6, 0.05, Math.PI - 0.05); g.closePath(); g.fill(); g.beginPath(); g.ellipse(x, y + r * 0.62, r * 0.4, r * 0.32, 0, 0, 7); g.fill(); },
  mayor: (x, y, r, lw) => { g.fillStyle = '#4A3F36'; g.beginPath(); g.moveTo(x - r * 0.7, y + r * 0.45); g.quadraticCurveTo(x, y + r * 1.45, x + r * 0.7, y + r * 0.45); g.quadraticCurveTo(x, y + r * 0.75, x - r * 0.7, y + r * 0.45); g.fill(); },
  cabri: (x, y, r, lw) => { g.fillStyle = '#2A221C'; g.beginPath(); g.arc(x, y - r * 0.2, r * 0.97, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fill(); g.fillRect(x - r * 0.2, y + r * 0.26, r * 0.4, r * 0.06); },
  princip: (x, y, r, lw) => { g.fillStyle = '#2A221C'; g.beginPath(); g.arc(x, y - r * 0.15, r * 0.98, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fill(); },
};

/** đám đông nhiều hàng (xa nhỏ — gần to), trang phục xoay vòng theo `wears`, cổ vũ / hoảng theo t */
export function crowd(x0, x1, y, h, t, o = {}) { const rows = o.rows ?? 2, wears = o.wears ?? ['bowler', 'fez', null, 'cap', 'scarf', 'bowler', null, 'top'];
  for (let rw = rows - 1; rw >= 0; rw--) { const hh = h * (1 - rw * 0.16), yy = y - rw * h * 0.3, n = Math.round((x1 - x0) / (hh * 0.5));
    for (let i = 0; i < n; i++) { const k = i * 7 + rw * 131 + (o.seed ?? 0), x = x0 + (i + 0.5 + (hash(k) - 0.5) * 0.35 + rw * 0.5) * (x1 - x0) / n;
      if (rw === 0 && o.skip?.some(s => Math.abs(x - s) < hh * 0.4)) continue;
      const jump = o.panic ? Math.abs(Math.sin(t * 9 + k)) * hh * 0.1 : o.cheer ? Math.max(0, Math.sin(t * 7 + k * 1.3)) * hh * 0.05 : 0;
      folk(x, yy - jump, hh * (0.94 + 0.12 * hash(k + 3)), { wear: wears[k % wears.length], eyes: o.panic ? 'shock' : o.eyes ?? (o.cheer ? 'happy' : 'dot'),
        coat: o.coats ? o.coats[k % o.coats.length] : 'plain', flag: o.cheer && rw === 0 && hash(k + 9) > 0.7 ? o.flagCols ?? ['#151515', '#F3C61B'] : null, wave: Math.sin(t * 6 + k),
        look: o.look ?? 0, arm: o.panic && hash(k + 5) > 0.5 ? 'up' : null }); } } }

/** đầu ẢNH THẬT trên thân viên thuốc — cùng nét mềm với quần chúng (người dùng 10-28: thân vuông "thô" lạc style).
 *  style 'pill' (mặc định) | 'stick' (thân người que nét đen dày — gag nhân vật phụ). Đầu nối đúng cằm (heads/<k>.json). */
export function figure(k, x, y, h, o = {}) { const HD = HEADS[k]; let neck, fw;
  if (o.style === 'stick') { const lw = h * 0.035, top = y - h * 0.62; g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(x, top); g.lineTo(x, y - h * 0.3); g.moveTo(x - h * 0.1, y); g.lineTo(x, y - h * 0.3); g.lineTo(x + h * 0.1, y);
      for (const sd of [-1, 1]) { g.moveTo(x, top + h * 0.03); g.quadraticCurveTo(x + sd * h * 0.12, top + h * 0.1, x + sd * h * 0.14, top + h * 0.28); } g.stroke(); g.restore();
    neck = [x, top + h * 0.02]; fw = h * 0.2; }
  else { const r = folk(x, y, h, { coat: o.coat ?? 'austro', noHead: true, arm: o.arm, flag: o.flag, armband: o.armband, tilt: o.tilt }); neck = [r.neck[0], r.neck[1] + h * 0.03]; fw = r.bw * 0.62; }
  if (!HD) return;
  const s = fw / (2 * (HD.jaw ?? 130)) * (o.headK ?? 1), w = HD.im.width * s, hh = HD.im.height * s;   // mặt rộng ≈ thân → mọi nhân vật cùng tỉ lệ
  g.save(); g.imageSmoothingQuality = 'high'; g.translate(neck[0], neck[1]); if (o.flip) g.scale(-1, 1); if (o.headTilt) g.rotate(o.headTilt);
  g.drawImage(HD.im, -HD.chin[0] * s, -HD.chin[1] * s, w, hh); g.restore(); }

/** xe mui trần 1910 (Gräf & Stift) VẼ cùng nét phông — đầu xe bên TRÁI. (x, yĐất) = giữa xe chạm đất, w = dài.
 *  seats(front, back): hàm vẽ người ngồi GIỮA lớp thân sau và cửa (thân người bị cửa che tới ngực). Trả toạ độ ghế. */
export function car1914(x, y, w, o = {}) { const h = w * 0.34, lw = Math.max(4, w * 0.008), wr = w * 0.13, bodyY = y - wr * 1.1, top = bodyY - h * 0.55;
  const front = [x - w * 0.1, bodyY - h * 0.1], back = [x + w * 0.2, bodyY - h * 0.1], bob = o.bob ?? 0;
  g.save(); g.translate(0, bob); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  g.fillStyle = '#2B2F38'; g.beginPath(); g.ellipse(x + w * 0.38, top + h * 0.12, w * 0.14, h * 0.12, -0.15, 0, 7); g.fill(); g.stroke();   // mui gập sau
  g.fillStyle = '#23262E'; g.beginPath(); g.roundRect(x - w * 0.02, top, w * 0.38, h * 0.3, 12); g.fill(); g.stroke();                       // lưng ghế
  if (o.seats) { g.save(); g.beginPath(); g.rect(x - w, 0, w * 2, top + h * 0.3); g.clip(); o.seats(front, back); g.restore(); }   // người ngồi: cắt dưới mép cửa
  g.fillStyle = o.col ?? '#1F2229'; g.beginPath(); g.moveTo(x - w * 0.46, bodyY); g.lineTo(x - w * 0.46, bodyY - h * 0.28); g.lineTo(x - w * 0.22, bodyY - h * 0.34);   // nắp máy + thân
  g.lineTo(x - w * 0.18, top + h * 0.22); g.lineTo(x + w * 0.42, top + h * 0.22); g.quadraticCurveTo(x + w * 0.5, top + h * 0.3, x + w * 0.48, bodyY); g.closePath(); g.fill(); g.stroke();
  g.strokeStyle = '#C9A13B'; g.lineWidth = lw * 0.6; g.beginPath(); g.moveTo(x - w * 0.18, top + h * 0.34); g.lineTo(x + w * 0.42, top + h * 0.34); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw;   // chỉ vàng
  g.fillStyle = '#B9C4CF'; g.beginPath(); g.moveTo(x - w * 0.2, top + h * 0.22); g.lineTo(x - w * 0.16, top - h * 0.25); g.lineTo(x - w * 0.13, top + h * 0.22); g.fill(); g.stroke();   // kính chắn gió
  g.beginPath(); g.arc(x - w * 0.12, top + h * 0.05, w * 0.03, 0, 7); g.stroke();                                                                          // vô-lăng
  g.fillStyle = '#E8D9A0'; g.beginPath(); g.arc(x - w * 0.45, bodyY - h * 0.32, w * 0.025, 0, 7); g.fill(); g.stroke();                                  // đèn
  if (o.flags) for (const fx of [x - w * 0.42, x - w * 0.3]) { g.beginPath(); g.moveTo(fx, bodyY - h * 0.3); g.lineTo(fx, bodyY - h * 0.75); g.stroke(); g.fillStyle = '#F3C61B'; g.fillRect(fx, bodyY - h * 0.75, w * 0.05, h * 0.07); g.fillStyle = '#151515'; g.fillRect(fx, bodyY - h * 0.68, w * 0.05, h * 0.07); g.strokeRect(fx, bodyY - h * 0.75, w * 0.05, h * 0.14); }
  g.fillStyle = '#3A3E48'; g.fillRect(x - w * 0.3, bodyY - lw, w * 0.6, h * 0.08); g.strokeRect(x - w * 0.3, bodyY - lw, w * 0.6, h * 0.08);                 // bậc lên xuống
  for (const wx of [x - w * 0.32, x + w * 0.32]) { const a = (o.spin ?? 0);
    g.fillStyle = '#1F2229'; g.beginPath(); g.arc(wx, y - wr, wr * 1.25, Math.PI, 0); g.fill(); g.stroke();                                                  // chắn bùn
    g.fillStyle = '#2A2A2E'; g.beginPath(); g.arc(wx, y - wr, wr, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#E9E2CF'; g.beginPath(); g.arc(wx, y - wr, wr * 0.72, 0, 7); g.fill(); g.stroke();
    g.lineWidth = lw * 0.6; for (let i = 0; i < 10; i++) { const t2 = a + i * Math.PI / 5; g.beginPath(); g.moveTo(wx, y - wr); g.lineTo(wx + Math.cos(t2) * wr * 0.72, y - wr + Math.sin(t2) * wr * 0.72); g.stroke(); } g.lineWidth = lw;
    g.fillStyle = INK; g.beginPath(); g.arc(wx, y - wr, wr * 0.14, 0, 7); g.fill(); }
  g.restore(); return { front, back }; }
