// Đồ dùng chung giữa các hồi của tập hitler. Tất định — hàm thuần của tham số.
// Vật xuyên suốt = KHAY THẺ ẢNH THẬT: cuối mỗi chặng một thẻ bay vào khay "UNRANKED"; hồi cuối xếp thẻ lên bảng tier list.
// Người dẫn = sĩ quan tuỳ tùng (narrator outfit 'officer'), gag bóng thoại "Mein Führer… are we sure?" (chữ trên hình, không đọc).
import { W, H, RED, clamp, hash, ease, easeOut, back, lerp } from '../../_kit/stage.js';
import { INK, view, ll, bubble } from '../../_kit/mapkit.js';
import { narrator } from '../../_kit/narrator.js';
import { folk } from '../../_kit/cast.js';
let g = null, IM = {}, M = null;
export const bindCommon = (ctx, im, m) => { g = ctx; IM = im; M = m; };
export const fade = (X, t0, d = 0.3) => clamp((X - t0) / d);

// ── nền + chữ ──
export const bg = col => { g.fillStyle = col; g.fillRect(0, 0, W, H); };
export function big(txt, x, y, size, col = '#FFF', o = {}) { g.save(); g.font = `900 ${size}px Archivo, sans-serif`; g.textAlign = o.align ?? 'center'; g.lineJoin = 'round'; g.textBaseline = 'middle';
  g.translate(x, y); g.rotate(o.rot ?? 0); const s = o.k !== undefined ? back(o.k) : 1; g.scale(s, s); if (o.k !== undefined && o.k <= 0) { g.restore(); return; }
  g.strokeStyle = o.stroke ?? INK; g.lineWidth = size * 0.14; g.strokeText(txt, 0, 0); g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); }
export function cover(im, x, y, w, h, fx = 0.5, fy = 0.5, z = 1) { const s = Math.max(w / im.width, h / im.height) * z, iw = im.width * s, ih = im.height * s;
  g.drawImage(im, x + (w - iw) * fx, y + (h - ih) * fy, iw, ih); }
export const say = (txt, x, y, tx, ty, k = 1, size = 34) => bubble(g, txt, x, y, tx, ty, k, size);

// ── người dẫn = sĩ quan tuỳ tùng ──
export const aide = (x, y, h, o = {}) => { const fx = (o.outfit ?? 'officer') === 'officer' ? (o.fx ?? []).filter(f => f !== 'sweat') : o.fx;   // giọt mồ hôi nằm ngay dưới vành mũ, chỉ lộ một mẩu xanh như lỗi vẽ
  g.save(); if (o.mirror) { g.translate(2 * x, 0); g.scale(-1, 1); } narrator(x, y, h, { v: 'B', outfit: 'officer', look: o.look ?? -1, ...o, fx }); g.restore(); };
/** dân quân Đức 1941–43: áo xám + mũ sắt loe vành */
export const fritz = (x, y, h, o = {}) => folk(x, y, h, { coat: 'german', wear: 'stahl', ...o });

// ── bản đồ: chỉ bờ biển europe1960 (không biên giới) ──
export function coast(V, o = {}) { g.fillStyle = o.sea ?? '#9DBCD2'; g.fillRect(0, 0, W, H); g.save(); V.apply(g);
  for (const n of Object.keys(M.path)) { g.fillStyle = o.land ?? '#E9DFC6'; g.fill(M.path[n]); }
  g.fillStyle = o.land ?? '#E9DFC6'; eastLand(); g.fill(); g.restore(); }
// dữ liệu bản đồ dừng ở biên phải bbox → nối đất liền về phía đông, kẻo Nga bị cắt thẳng thành "biển" (QA 11-02)
export function eastLand(s = 25) { const L = (lo, la) => ll(M, lo, la), e = M.lon0 + M.bbox[2] / (ll(M, M.lon0 + 1, 0)[0]); g.beginPath(); g.moveTo(...L(30, 62.5)); g.lineTo(...L(33, 66)); g.lineTo(...L(40, 67)); g.lineTo(...L(e - 0.2, 69)); g.lineTo(...L(e + 8, 70)); g.lineTo(...L(e + 40, 74)); g.lineTo(...L(170, 74)); g.lineTo(...L(170, 44)); g.lineTo(...L(e + 40, s)); g.lineTo(...L(e - 0.2, s)); g.lineTo(...L(e - 0.2, 62.5)); g.closePath(); }
export const ev = (o) => view(M, o);
export const P = (V, lon, lat) => V.pt(ll(M, lon, lat));
export function city(V, lon, lat, name, k = 1, o = {}) { if (k <= 0) return; const [x, y] = P(V, lon, lat); g.save(); g.globalAlpha = clamp(k * 3); g.fillStyle = INK; g.beginPath(); g.arc(x, y, o.r ?? 11, 0, 7); g.fill();
  g.font = `800 ${o.size ?? 34}px Archivo, sans-serif`; g.textAlign = o.align ?? 'center'; g.lineWidth = 7; g.strokeStyle = '#FFFFFF'; g.lineJoin = 'round'; const ty = y + (o.dy ?? 46);
  g.strokeText(name, x + (o.dx ?? 0), ty); g.fillText(name, x + (o.dx ?? 0), ty); g.restore(); }
/** mũi tên cong màn hình a → b, mọc theo k (0..1) */
export function arw(a, b, k, col = RED, w = 26, bend = 0.25) { if (k <= 0) return; k = ease(k); const m = [(a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend];
  const q = u => [(1 - u) ** 2 * a[0] + 2 * u * (1 - u) * m[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * u * (1 - u) * m[1] + u * u * b[1]];
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); for (let i = 0; i <= 30; i++) { const p = q(i / 30 * k); i ? g.lineTo(...p) : g.moveTo(...p); }
  g.strokeStyle = INK; g.lineWidth = w + 10; g.stroke(); g.strokeStyle = col; g.lineWidth = w; g.stroke();
  const e = q(k), d = q(Math.max(0, k - 0.03)), an = Math.atan2(e[1] - d[1], e[0] - d[0]); g.translate(...e); g.rotate(an); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 6;
  g.beginPath(); g.moveTo(w * 1.3, 0); g.lineTo(-w * 0.9, -w * 1.3); g.lineTo(-w * 0.9, w * 1.3); g.closePath(); g.fill(); g.stroke(); g.restore(); }

// ── đạo cụ vẽ ──
export function tank(x, y, s, o = {}) { g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s); g.strokeStyle = INK; g.lineWidth = 6; g.lineJoin = 'round';
  g.fillStyle = o.col ?? '#5E6470'; g.beginPath(); g.roundRect(-70, -26, 140, 34, 14); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-40, -56, 72, 32, 8); g.fill(); g.stroke();
  g.fillRect(28, -46, 70, 10); g.strokeRect(28, -46, 70, 10); g.fillStyle = '#2A2C30'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(-52 + i * 26, -2, 9, 0, 7); g.fill(); }
  if (o.cross) { g.strokeStyle = '#FFF'; g.lineWidth = 4; g.strokeRect(-14, -50, 16, 16); } if (o.zz) { g.fillStyle = INK; g.font = '900 40px Archivo'; g.scale(o.flip ? -1 : 1, 1); g.textAlign = 'center'; g.fillText('zZ', 0, -70 - 6 * Math.sin(o.zz * 3)); } g.restore(); }
export function plane(x, y, s, o = {}) { g.save(); g.translate(x, y); g.rotate(o.rot ?? 0); g.scale(o.flip ? -s : s, s); g.strokeStyle = INK; g.lineWidth = 5; g.fillStyle = o.col ?? '#6A7078';
  g.beginPath(); g.ellipse(0, 0, 70, 14, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(-10, 0); g.lineTo(-30, -60); g.lineTo(-5, -60); g.lineTo(20, 0); g.lineTo(-5, 60); g.lineTo(-30, 60); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-60, 0); g.lineTo(-75, -25); g.lineTo(-62, -25); g.lineTo(-50, 0); g.closePath(); g.fill(); g.stroke(); g.restore(); }
export function snow(t, n = 60, a = 1) { g.save(); g.globalAlpha = a; g.fillStyle = '#FFFFFF'; for (let i = 0; i < n; i++) { const x = (hash(i) * W + Math.sin(t * 0.8 + i) * 30) % W, y = (hash(i + 99) * H + t * (60 + 60 * hash(i + 7))) % H;
  g.beginPath(); g.arc(x, y, 3 + 5 * hash(i + 3), 0, 7); g.fill(); } g.restore(); }
export function bed(x, y, w, X, o = {}) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#6E4A2E'; g.fillRect(x - w / 2, y - 40, 40, 160); g.strokeRect(x - w / 2, y - 40, 40, 160); g.fillRect(x - w / 2, y + 60, w, 50); g.strokeRect(x - w / 2, y + 60, w, 50);
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(x - w / 2 + 120, y + 30, 90, 45, -0.1, 0, 7); g.fill(); g.stroke();
  g.fillStyle = SKIN0; g.beginPath(); g.arc(x - w / 2 + 150, y + 10, 62, 0, 7); g.fill(); g.stroke();                  // đầu tròn trên gối
  g.fillStyle = '#1A1A1C'; g.beginPath(); g.arc(x - w / 2 + 150, y + 10, 62, Math.PI * 0.95, Math.PI * 1.75); g.lineTo(x - w / 2 + 165, y - 20); g.closePath(); g.fill();   // tóc
  g.fillRect(x - w / 2 + 175, y - 2, 10, 22);                                                                                  // ria (nằm nghiêng)
  g.lineWidth = 6; g.beginPath(); g.arc(x - w / 2 + 158, y - 10, 10, 0.2, Math.PI - 0.2); g.stroke();                           // mắt nhắm
  g.lineWidth = 8; g.fillStyle = '#8E2B3A'; g.beginPath(); g.moveTo(x - w / 2 + 190, y + 20); g.quadraticCurveTo(x, y - 30, x + w / 2 - 20, y + 30); g.lineTo(x + w / 2, y + 70); g.lineTo(x - w / 2 + 180, y + 70); g.closePath(); g.fill(); g.stroke();
  if (!o.noZ) { g.fillStyle = '#FFFFFF'; g.font = '900 60px Archivo'; for (let i = 0; i < 3; i++) { const u = (X * 0.5 + i / 3) % 1; g.globalAlpha = 1 - u; g.fillText('Z', x - w / 2 + 220 + u * 120, y - 60 - u * 160 - i * 6); } }
  g.restore(); }
const SKIN0 = '#FBEEDC';
export function clock(x, y, r, a) { g.save(); g.strokeStyle = INK; g.lineWidth = 10; g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  for (let i = 0; i < 12; i++) { const q = i * Math.PI / 6; g.beginPath(); g.moveTo(x + Math.cos(q) * r * 0.82, y + Math.sin(q) * r * 0.82); g.lineTo(x + Math.cos(q) * r * 0.92, y + Math.sin(q) * r * 0.92); g.stroke(); }
  g.lineWidth = 12; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a / 12) * r * 0.5, y - Math.cos(a / 12) * r * 0.5); g.stroke(); g.lineWidth = 8; g.strokeStyle = RED; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a) * r * 0.75, y - Math.cos(a) * r * 0.75); g.stroke(); g.restore(); }
/** bảng / giấy tài liệu có tiêu đề + dòng chữ giả */
export function doc(x, y, w, h, title, o = {}) { g.save(); g.translate(x, y); g.rotate(o.rot ?? 0); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); g.fillStyle = o.col ?? '#F6F0DE'; g.strokeStyle = INK; g.lineWidth = 6;
  g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h); g.fillStyle = INK; g.font = `900 ${o.size ?? 44}px Archivo, sans-serif`; g.textAlign = 'center'; g.fillText(title, 0, -h / 2 + (o.size ?? 44) * 1.4);
  g.fillStyle = '#9C9480'; for (let i = 0; i < (o.lines ?? 7); i++) g.fillRect(-w * 0.4, -h / 2 + (o.size ?? 44) * 2.2 + i * 34, w * (0.55 + 0.25 * hash(i + (o.seed ?? 0))), 12); g.restore(); }
/** thanh số liệu: v (0..max), nhãn dưới, màu */
export function bar(x, base, w, hmax, v, max, col, lab, val, k = 1) { const h = hmax * v / max * ease(k); g.save(); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(x - w / 2, base - h, w, h); g.strokeRect(x - w / 2, base - h, w, h);
  g.fillStyle = INK; g.font = '800 34px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText(lab, x, base + 46); if (k > 0.6) { g.font = '900 46px Archivo, sans-serif'; g.fillText(val, x, base - h - 18); } g.restore(); }

// ── vật xuyên suốt: khay thẻ ảnh thật (UNRANKED) ──
export const CARDS = ['watercolor', 'beerhall', 'potsdam', 'dunkirk', 'blitz', 'barbmap', 'arizona', 'stalingrad', 'dday'];
export function card(k, x, y, w, rot = 0, s = 1) { const im = IM['p_' + k]; if (!im) return; const h = w * 0.66; g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-w / 2 + 6, -h / 2 + 8, w, h); g.fillStyle = '#FFFFFF'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 10); g.fill(); g.stroke();
  g.beginPath(); g.roundRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 6); g.clip(); cover(im, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12); g.restore(); }
/** khay ở trên trái: n thẻ đã có, thẻ thứ n bay vào theo k */
export function tray(n, k) { g.save(); g.fillStyle = 'rgba(30,32,38,0.88)'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(40, 40, 120 + n * 130, 150, 18); g.fill(); g.stroke();
  g.fillStyle = '#FFE04A'; g.font = '900 21px Archivo, sans-serif'; g.textAlign = 'center'; g.save(); g.translate(78, 115); g.rotate(-Math.PI / 2); g.fillText('UNRANKED', 0, 8); g.restore();
  for (let i = 0; i < n; i++) { const tx = 175 + i * 130, ty = 115; if (i === n - 1) { const e = easeOut(k); card(CARDS[i], lerp(W / 2, tx, e), lerp(H / 2, ty, e), lerp(620, 116, e), lerp(-0.1, 0, e)); } else card(CARDS[i], tx, ty, 116); }
  g.restore(); }

// Hitler theo thời kỳ: thường phục (Vienna 1907–1913) · áo khoác + băng tay (1919–1923) · quân phục nâu (1933+) — famous mặc định
export const YOUNG = { coat: '#4A4A52', pants: '#2E2E34', det: ['lapel', 'tie', 'buttons'] }, PUTSCH = { coat: '#8C7A5E', pants: '#3A3630', det: ['lapel', 'tie', 'buttons', 'armband'] };
/** cờ Mỹ: 13 sọc + ô sao */
export function usFlag(x, y, w) { const h = w * 0.62, sh = h / 13, cw = w * 0.42, ch = sh * 7; g.save(); g.translate(x, y); for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#FFF' : '#C8262C'; g.fillRect(0, i * sh, w, sh + 0.5); }
  g.fillStyle = '#2B3F7E'; g.fillRect(0, 0, cw, ch); g.fillStyle = '#FFF'; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { g.beginPath(); g.arc(cw * (c + 0.5 + (r % 2 ? 0.25 : 0)) / 6.4, ch * (r + 0.5) / 5, Math.max(2, w * 0.011), 0, 7); g.fill(); }
  g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(0, 0, w, h); g.restore(); }
