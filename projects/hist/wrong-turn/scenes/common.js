// Đồ dùng chung giữa các hồi của wrong-turn (gag thị giác chạy suốt tập). Tất định — hàm thuần của tham số.
import { W, H, RED, clamp, lerp, hash, easeOut, back, label } from '../../_kit/stage.js';
import { INK } from '../../_kit/mapkit.js';
import { folk } from '../../_kit/cast.js';
let g = null;
export const bindCommon = ctx => { g = ctx; };

/** da nhân vật lịch sử kiểu B + vai lặp lại giữa các hồi: P.ff(x, yĐế, h, o) = C.folk với đồ / nét riêng (o ghi đè) */
export const SK = '#FCEBD5';
const ROLE = { ff: { coat: 'austro', feat: 'ff', wear: 'plume' }, sophie: { coat: 'gown', feat: 'sophie', wear: 'sophiehat' },
  fj: { coat: 'austro', feat: 'fj' }, mayor: { coat: 'suit', feat: 'mayor', wear: 'fez' }, potiorek: { coat: 'austro', feat: 'potiorek', wear: 'kepi' },
  cabri: { coat: 'suit', feat: 'cabri', wear: 'bowler' }, princip: { coat: 'suit', feat: 'princip' }, cop: { coat: 'police', wear: 'police' },
  killer: { coat: 'suit', wear: 'bowler', eyes: 'angry' } };
export const P = Object.fromEntries(Object.entries(ROLE).map(([k, r]) => [k, (x, y, h, o = {}) => folk(x, y, h, { skin: SK, ...r, ...o })]));

/** tên nước theo khoá bản đồ europe1914.json */
export const AH = 'Austro-Hungarian Empire', RS = 'Serbia', DE = 'German Empire', RU = 'Russian Empire', FR = 'France',
  UK = 'United Kingdom of Great Britain and Ireland', IT = 'Kingdom of Italy', BE = 'Belgium';

/** bảng điểm "MISTAKES n/5" góc trên trái — n tăng ở mỗi câu "Mistake number…"; k = độ hiện (0..1), pop = giây từ lúc tăng (nảy số) */
export function mistakes(n, k = 1, pop = 9) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2);
  const x = 96, y = 64, w = 360, h = 92; g.translate(0, (1 - easeOut(k)) * -140);
  const big = pop < 0.9 ? 1.7 : pop < 1.5 ? lerp(1.7, 1, easeOut((pop - 0.9) / 0.6)) : 1; g.translate(x, y); g.scale(big, big); g.translate(-x, -y);   // lần đếm: to như bảng 0/5 ở mở bài rồi thu về góc (QA: "hai đạo cụ khác nhau")
  g.fillStyle = '#151517'; g.strokeStyle = '#F4F1E8'; g.lineWidth = 5; g.beginPath(); g.roundRect(x, y, w, h, 14); g.fill(); g.stroke();
  g.font = '900 34px Archivo, sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#F4F1E8'; g.fillText('MISTAKES', x + 24, y + h / 2 + 2);
  const s = pop < 0.35 ? 1 + 0.5 * Math.sin(pop / 0.35 * Math.PI) : 1; g.save(); g.translate(x + w - 70, y + h / 2 + 2); g.scale(s, s);
  g.font = '900 52px Archivo, sans-serif'; g.textAlign = 'center'; g.fillStyle = n > 0 ? RED : '#F4F1E8'; g.fillText(`${n}/5`, 0, 0); g.restore();
  g.restore(); }

/** hiệu ứng tua ngược: vạch nhiễu trắng + ◀◀ (k 0..1 độ mạnh) */
export function rewind(t, k = 1) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k);
  for (let i = 0; i < 26; i++) { g.fillStyle = 'rgba(255,255,255,0.22)'; g.fillRect(0, hash(i + Math.floor(t * 14)) * H, W, 2 + 5 * hash(i)); }
  label('◀◀', 230, 190, 110, 1, '#FFF', { stroke: INK }); g.restore(); }

/** bản đồ phố Sarajevo vẽ đơn giản (sông ngang, đường bờ sông, phố Franz Joseph rẽ phải ở cầu Latin) — dùng chung a5 + a6.
 *  trả hàm P(u) vị trí trên tuyến: route 'new' (thẳng dọc sông) hoặc 'old' (rẽ vào phố). */
export function streetMap(o = {}) { g.save(); g.fillStyle = '#EFE6CF'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#E2D6B8'; for (let i = 0; i < 18; i++) { const bx = 80 + (i % 9) * 200 + 20 * hash(i), by = i < 9 ? 140 + 40 * hash(i + 3) : 720 + 30 * hash(i + 4); g.fillRect(bx, by, 150, 150); }
  g.fillStyle = '#7FB0D6'; g.fillRect(0, 520, W, 110); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 520); g.lineTo(W, 520); g.moveTo(0, 630); g.lineTo(W, 630); g.stroke();
  g.fillStyle = '#B9B2A2'; g.fillRect(0, 440, W, 80); g.strokeRect(-10, 440, W + 20, 80);                                     // đường bờ sông (Appel Quay)
  g.fillRect(1180, 120, 80, 320); g.strokeRect(1180, 120, 80, 320);                                                            // phố Franz Joseph rẽ lên
  g.fillStyle = '#B9B2A2'; g.fillRect(1160, 510, 120, 130); g.strokeRect(1160, 510, 120, 130);                                 // cầu Latin
  label('RIVER', 300, 580, 40, 1, '#FFF', { stroke: '#3D6E96' });
  if (o.labels !== false) { label('RIVER ROAD', 420, 485, 30, 1, INK); label('LATIN BRIDGE', 1220, 690, 26, 1, INK); label('FRANZ JOSEPH ST.', 1430, 160, 28, 1, INK, { align: 'left' }); }
  g.restore();
  return (u, route) => route === 'old' && u > 0.6 ? [1220, lerp(480, 140, (u - 0.6) / 0.4)] : [lerp(60, route === 'old' ? 1220 : 1860, route === 'old' ? clamp(u / 0.6) : u), 480]; }

/** mũi tên tuyến trên streetMap: 'new' xanh thẳng, 'old' đỏ rẽ — k = độ vẽ 0..1 */
export function routeArrow(P, route, k, col) { if (k <= 0) return; g.save(); g.strokeStyle = col; g.lineWidth = 16; g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash([34, 20]);
  g.beginPath(); const n = 40; for (let i = 0; i <= n * k; i++) { const p = P(i / n, route); i ? g.lineTo(...p) : g.moveTo(...p); } g.stroke(); g.restore(); }
