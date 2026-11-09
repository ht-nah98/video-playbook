// Đồ dùng chung giữa các hồi của berlin (vai lặp lại + vật xuyên suốt + phông lặp). Tất định — hàm thuần của tham số.
// Vật xuyên suốt tập = TỜ GIẤY (memo): bàn soạn → tay Krenz → micro → TV → trạm gác — luôn vẽ bằng `memo()` để khán giả nhận ra.
import { W, H, RED, clamp, hash } from '../../_kit/stage.js';
import { INK } from '../../_kit/mapkit.js';
import { folk } from '../../_kit/cast.js';
let g = null;
export const bindCommon = ctx => { g = ctx; };
export const SK = '#FCEBD5';

/** nét riêng VẼ đè lên đầu tròn của folk (kiểu B): (hx, hy) tâm đầu, r bán kính */
const FEAT = {
  // Schabowski: tóc bạc chải ngược, kính gọng vuông to
  schab(hx, hy, r, lw, o) { g.fillStyle = '#D6D5CF'; g.beginPath(); g.arc(hx, hy - r * 0.08, r * 1.0, Math.PI * 1.06, Math.PI * 1.94); g.quadraticCurveTo(hx + r * 0.3, hy - r * 0.62, hx - r * 0.2, hy - r * 0.55);
    g.quadraticCurveTo(hx - r * 0.7, hy - r * 0.5, hx - r * 0.94, hy - r * 0.3); g.closePath(); g.fill(); g.stroke();
    g.save(); g.beginPath(); g.arc(hx, hy, r * 0.97, 0, 7); g.clip(); g.strokeStyle = '#A9A8A2'; g.lineWidth = lw * 0.6;
    for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(hx - r * 0.6 + i * r * 0.32, hy - r * 0.62); g.quadraticCurveTo(hx - r * 0.35 + i * r * 0.3, hy - r * 0.85, hx + r * 0.05 + i * r * 0.22, hy - r * 0.86); g.stroke(); } g.restore();
    glasses(hx, hy, r, lw, 'square'); if (o.squint) { g.lineWidth = lw * 1.1; const ey = hy + r * 0.07; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(hx + s * r * 0.18, ey - r * 0.3); g.lineTo(hx + s * r * 0.44, ey - r * 0.24); g.stroke(); } } },
  // Honecker: tóc bạc thưa rẽ ngôi, kính gọng mảnh tròn
  honecker(hx, hy, r, lw) { g.fillStyle = '#C9C8C2'; g.beginPath(); g.arc(hx, hy - r * 0.15, r * 0.99, Math.PI * 1.1, Math.PI * 1.9); g.quadraticCurveTo(hx + r * 0.2, hy - r * 0.6, hx - r * 0.85, hy - r * 0.45); g.closePath(); g.fill(); g.stroke();
    glasses(hx, hy, r, lw * 0.7, 'round'); },
  // Krenz: tóc đen dày chải lật, hàm răng to (cười)
  krenz(hx, hy, r, lw) { g.fillStyle = '#3A3530'; g.beginPath(); g.arc(hx, hy - r * 0.1, r * 1.01, Math.PI * 1.02, Math.PI * 1.98); g.quadraticCurveTo(hx + r * 0.4, hy - r * 0.45, hx - r * 0.1, hy - r * 0.62); g.quadraticCurveTo(hx - r * 0.6, hy - r * 0.45, hx - r * 1.0, hy - r * 0.2); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#FFF'; g.beginPath(); g.roundRect(hx - r * 0.3, hy + r * 0.36, r * 0.6, r * 0.2, r * 0.06); g.fill(); g.stroke(); g.beginPath(); g.moveTo(hx, hy + r * 0.36); g.lineTo(hx, hy + r * 0.56); g.stroke(); },
  // Jäger: ria mép, mũ kê-pi Stasi xám xanh vành đỏ sẫm
  jaeger(hx, hy, r, lw) { g.fillStyle = '#4A3F36'; g.beginPath(); g.ellipse(hx, hy + r * 0.3, r * 0.28, r * 0.08, 0, 0, 7); g.fill(); cap(hx, hy, r, '#59636B', '#7A1E22'); },
};
function glasses(hx, hy, r, lw, kind) { const ey = hy + r * 0.07; g.save(); g.strokeStyle = INK; g.lineWidth = lw * 0.75;
  for (const s of [-1, 1]) { g.fillStyle = 'rgba(190,220,235,0.22)'; g.beginPath(); if (kind === 'round') g.arc(hx + s * r * 0.3, ey, r * 0.19, 0, 7); else g.roundRect(hx + s * r * 0.3 - r * 0.22, ey - r * 0.15, r * 0.44, r * 0.3, r * 0.08); g.fill(); g.stroke(); }
  g.beginPath(); g.moveTo(hx - r * 0.08, ey - r * 0.04); g.lineTo(hx + r * 0.08, ey - r * 0.04); g.moveTo(hx - r * 0.52, ey - r * 0.05); g.lineTo(hx - r * 0.97, ey - r * 0.12); g.moveTo(hx + r * 0.52, ey - r * 0.05); g.lineTo(hx + r * 0.97, ey - r * 0.12); g.stroke(); g.restore(); }
/** mũ kê-pi quân đội / biên phòng Đông Đức: chóp màu `top`, băng `band`, lưỡi trai đen */
export function cap(hx, hy, r, top = '#6B7262', band = '#3E4A3A') { g.save(); g.strokeStyle = INK; g.fillStyle = top; g.beginPath(); g.ellipse(hx, hy - r * 0.78, r * 1.05, r * 0.36, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = band; g.fillRect(hx - r * 0.82, hy - r * 0.72, r * 1.64, r * 0.2); g.strokeRect(hx - r * 0.82, hy - r * 0.72, r * 1.64, r * 0.2);
  g.fillStyle = '#1A1A1A'; g.beginPath(); g.ellipse(hx + r * 0.1, hy - r * 0.5, r * 0.75, r * 0.14, 0, 0, Math.PI); g.fill(); g.fillStyle = '#E8C04A'; g.beginPath(); g.arc(hx, hy - r * 0.62, r * 0.08, 0, 7); g.fill(); g.restore(); }

/** vai lặp lại (kiểu B = folk + nét riêng). P.<vai>(x, yĐế, h, o) — o ghi đè (eyes, mouth, look, arm, sweat, squint…). Trả { head, r } */
const ROLE = { schab: { coat: 'suit' }, honecker: { coat: 'suit' }, krenz: { coat: 'suit' }, jaeger: { coat: 'german' },
  guard: { coat: 'soldier', capCol: ['#6B7262', '#3E4A3A'] },                     // lính biên phòng Đông Đức (áo xám xanh, mũ kê-pi)
  vopo: { coat: 'police', capCol: ['#3E5A4A', '#2A3A30'] } };                     // cảnh sát nhân dân (Volkspolizei)
export const P = Object.fromEntries(Object.entries(ROLE).map(([k, r]) => [k, (x, y, h, o = {}) => {
  const R = folk(x, y, h, { skin: SK, coat: r.coat, ...o }); if (!R?.head) return R; const [hx, hy] = R.head, lw = Math.max(3, h * 0.026);
  g.save(); g.strokeStyle = INK; g.lineWidth = lw; if (FEAT[k]) FEAT[k](hx, hy, R.r, lw, o); else if (r.capCol) cap(hx, hy, R.r, ...r.capCol); g.restore(); return R; }]));

/** TỜ GIẤY xuyên suốt: giấy đánh máy kem, dòng chữ xám; o.stamp = dấu đỏ góc; o.title = dòng đầu (chữ thật, ≤ 3 từ) */
export function memo(x, y, w, a = 0, o = {}) { const h = w * 1.35; g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.02);
  g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h); g.fillStyle = '#9A978C';
  const y0 = o.title ? -h * 0.24 : -h * 0.36;
  for (let i = 0; i < (o.title ? 9 : 11); i++) g.fillRect(-w * 0.38, y0 + i * h * 0.065, w * (0.5 + 0.26 * hash(i + (o.seed ?? 0))), w * 0.022);
  if (o.title) { g.fillStyle = INK; g.font = `900 ${w * 0.1}px Archivo, sans-serif`; g.textAlign = 'center'; g.fillText(o.title, 0, -h * 0.33); }
  if (o.stamp) { g.save(); g.rotate(-0.2); g.strokeStyle = RED; g.fillStyle = RED; g.lineWidth = w * 0.02; g.font = `900 ${w * 0.11}px Archivo, sans-serif`; g.textAlign = 'center';
    const tw = g.measureText(o.stamp).width; g.strokeRect(-tw / 2 - w * 0.04, h * 0.18, tw + w * 0.08, w * 0.15); g.fillText(o.stamp, 0, h * 0.18 + w * 0.12); g.restore(); }
  g.restore(); }

/** micro 1989 trên bàn họp báo */
export function mic(x, y, len, a, col = '#1C1C1F') { g.save(); g.translate(x, y); g.rotate(a); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = col;
  g.fillRect(-9, -len, 18, len); g.strokeRect(-9, -len, 18, len); g.beginPath(); g.ellipse(0, -len - 22, 26, 34, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }

/** PHÒNG HỌP BÁO Đông Berlin 9/11/1989 (cùng thế giới thumbnail A): tường ốp gỗ, đèn sân khấu, diềm trần. Bàn + micro vẽ RIÊNG
 *  bằng pressTable() SAU nhân vật (bàn che nửa dưới người ngồi). o.dim 0..1 làm tối (đêm / căng thẳng). */
export function pressRoom(o = {}) { g.fillStyle = '#6E5638'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#79603F' : '#654E32'; g.fillRect(i * 230 - 40, 0, 226, H); }
  g.fillStyle = 'rgba(255,236,190,0.16)'; g.beginPath(); g.ellipse(o.spot ?? 760, 420, 720, 520, 0, 0, 7); g.fill();
  g.fillStyle = '#C9C2B0'; g.fillRect(0, 0, W, 70); if (o.dim) { g.fillStyle = `rgba(10,8,6,${clamp(o.dim) * 0.6})`; g.fillRect(0, 0, W, H); } }
export function pressTable(y = 860, mics = [[420, 0.42, '#1C1C1F'], [530, 0.25, '#B3262C'], [640, 0.1, '#1C1C1F'], [760, -0.04, '#2B4C7E'], [880, -0.16, '#1C1C1F'], [990, -0.3, '#5B5A55']]) {
  mics.forEach(([x, a, c]) => mic(x, y + 15, 150, a, c));
  g.fillStyle = '#2F3A2E'; g.fillRect(0, y, W, H - y); g.fillStyle = '#3E4B3C'; g.fillRect(0, y, W, 26); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(-10, y, W + 20, H - y + 20); }

/** BỨC TƯỜNG nhìn ngang: các tấm bê tông chữ L có ống tròn trên đỉnh, x0..x1, chân ở `base`, cao `h`.
 *  o.west = mặt Tây (vẽ graffiti màu, tất định theo hash) | mặt Đông xám trơn; o.gap = [xa, xb] chỗ trống (cổng mở / bị đục) */
export function wall(x0, x1, base, h = 360, o = {}) { const pw = 120; g.save(); g.strokeStyle = INK; g.lineWidth = 6;
  for (let x = x0, i = 0; x < x1; x += pw, i++) { if (o.gap && x + pw > o.gap[0] && x < o.gap[1]) continue;
    g.fillStyle = o.west ? '#D8D6CE' : '#BDBBB4'; g.fillRect(x, base - h, pw, h); g.strokeRect(x, base - h, pw, h);
    if (o.west) for (let j = 0; j < 3; j++) { const k = i * 7 + j + (o.seed ?? 0); g.strokeStyle = ['#D63A3A', '#2F6FD6', '#2E9E58', '#E8B12A', '#9B4FD0'][Math.floor(hash(k) * 5)]; g.lineWidth = 10 + 8 * hash(k + 1);
      g.beginPath(); g.moveTo(x + 12, base - h * (0.2 + 0.6 * hash(k + 2))); g.bezierCurveTo(x + 40, base - h * hash(k + 3), x + 80, base - h * hash(k + 4), x + pw - 12, base - h * (0.2 + 0.6 * hash(k + 5))); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 6; }
  g.fillStyle = o.west ? '#E4E2DA' : '#C9C7C0';                                                  // ống tròn đỉnh tường (đứt ở chỗ trống)
  const segs = o.gap ? [[x0, x0 + Math.ceil((o.gap[0] - x0) / pw) * pw - pw], [x0 + Math.floor((o.gap[1] - x0) / pw) * pw + pw, x1]] : [[x0, x1]];
  for (const [a, b] of segs) if (b > a) { g.beginPath(); g.roundRect(a - 10, base - h - 34, b - a + 20, 40, 20); g.fill(); g.stroke(); }
  g.restore(); }
export { W, H };
