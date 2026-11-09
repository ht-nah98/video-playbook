// Đồ dùng chung giữa các hồi của pearl (vai lặp lại + vật xuyên suốt + đạo cụ). Tất định — hàm thuần của tham số.
// Vật xuyên suốt tập = ĐỒNG HỒ BÁO THỨC (`alarm`): mỗi lời cảnh báo = chuông reo, ai đó bấm snooze; luôn cùng kiểu vẽ để khán giả nhận ra.
import { W, H, RED, clamp, hash, ease } from '../../_kit/stage.js';
import { INK } from '../../_kit/mapkit.js';
import { folk } from '../../_kit/cast.js';
let g = null;
export const bindCommon = ctx => { g = ctx; };
export const SK = '#FCEBD5', OD = '#6B6A45', KHAKI = '#B9A57A', NAVY = '#24304A';

// ── mũ / tóc vẽ đè lên đầu tròn folk (hx, hy tâm đầu, r bán kính) ──
const HATS = {
  // mũ ca-lô (garrison cap) lính Mỹ 1941
  garrison(hx, hy, r) { g.fillStyle = OD; g.beginPath(); g.moveTo(hx - r * 0.85, hy - r * 0.55); g.lineTo(hx + r * 0.85, hy - r * 0.62); g.lineTo(hx + r * 0.6, hy - r * 1.02); g.lineTo(hx - r * 0.7, hy - r * 0.9); g.closePath(); g.fill(); g.stroke(); },
  // mũ lưỡi trai sĩ quan Mỹ (crusher cap): chóp ô-liu, lưỡi đen, huy hiệu vàng
  officer(hx, hy, r, col = OD) { g.fillStyle = col; g.beginPath(); g.ellipse(hx, hy - r * 0.8, r * 1.08, r * 0.38, -0.04, 0, 7); g.fill(); g.stroke();
    g.fillRect(hx - r * 0.86, hy - r * 0.78, r * 1.72, r * 0.26); g.strokeRect(hx - r * 0.86, hy - r * 0.78, r * 1.72, r * 0.26);
    g.fillStyle = '#16161A'; g.beginPath(); g.ellipse(hx + r * 0.12, hy - r * 0.5, r * 0.8, r * 0.15, 0, 0, Math.PI); g.fill(); g.stroke();
    g.fillStyle = '#E3BE4A'; g.beginPath(); g.arc(hx, hy - r * 0.68, r * 0.1, 0, 7); g.fill(); },
  // mũ thuỷ thủ trắng (dixie cup)
  sailor(hx, hy, r) { g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(hx - r * 0.78, hy - r * 0.62); g.quadraticCurveTo(hx, hy - r * 0.42, hx + r * 0.78, hy - r * 0.62); g.lineTo(hx + r * 0.62, hy - r * 1.02);
    g.quadraticCurveTo(hx, hy - r * 1.18, hx - r * 0.62, hy - r * 1.02); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.moveTo(hx - r * 0.7, hy - r * 0.72); g.quadraticCurveTo(hx, hy - r * 0.55, hx + r * 0.7, hy - r * 0.72); g.stroke(); },
  // mũ sắt M1917 dẹt (lính trên boong khi bắn)
  brodie(hx, hy, r) { g.fillStyle = '#5E6447'; g.beginPath(); g.ellipse(hx, hy - r * 0.62, r * 1.3, r * 0.22, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(hx, hy - r * 0.66, r * 0.8, r * 0.55, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); },
  // mũ chóp cao (nhà ngoại giao)
  tophat(hx, hy, r) { g.fillStyle = '#16161A'; g.beginPath(); g.ellipse(hx, hy - r * 0.7, r * 1.05, r * 0.18, 0, 0, 7); g.fill(); g.stroke(); g.fillRect(hx - r * 0.62, hy - r * 1.75, r * 1.24, r * 1.05); g.strokeRect(hx - r * 0.62, hy - r * 1.75, r * 1.24, r * 1.05); },
  // mũ phớt (fedora) dân thường / người đưa điện tín đội kính bảo hộ thì dùng `goggles`
  fedora(hx, hy, r) { g.fillStyle = '#5B4A3A'; g.beginPath(); g.ellipse(hx, hy - r * 0.66, r * 1.18, r * 0.2, -0.05, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(hx - r * 0.72, hy - r * 0.68); g.quadraticCurveTo(hx - r * 0.7, hy - r * 1.3, hx, hy - r * 1.18); g.quadraticCurveTo(hx + r * 0.7, hy - r * 1.3, hx + r * 0.72, hy - r * 0.68); g.closePath(); g.fill(); g.stroke(); },
  goggles(hx, hy, r) { g.fillStyle = '#6A4A30'; g.beginPath(); g.arc(hx, hy - r * 0.1, r * 1.0, Math.PI * 1.02, Math.PI * 1.98); g.closePath(); g.fill(); g.stroke();
    for (const s of [-1, 1]) { g.fillStyle = '#9ED0EA'; g.beginPath(); g.arc(hx + s * r * 0.34, hy - r * 0.42, r * 0.2, 0, 7); g.fill(); g.stroke(); } },
};
export const hat = (k, hx, hy, r, ...a) => { g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(3, r * 0.1); g.lineJoin = 'round'; HATS[k](hx, hy, r, ...a); g.restore(); };
function hair(hx, hy, r, col, o = {}) { g.save(); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = Math.max(3, r * 0.1);
  g.beginPath(); g.arc(hx, hy - r * 0.08, r * 1.0, Math.PI * (o.part ? 1.0 : 1.08), Math.PI * 1.92); g.quadraticCurveTo(hx + r * 0.25, hy - r * 0.55, hx - r * 0.25, hy - r * 0.6); g.quadraticCurveTo(hx - r * 0.75, hy - r * 0.5, hx - r * 0.98, hy - r * 0.1); g.closePath(); g.fill(); g.stroke(); g.restore(); }
function glasses(hx, hy, r, round = true) { const ey = hy + r * 0.07; g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(2, r * 0.06);
  for (const s of [-1, 1]) { g.fillStyle = 'rgba(190,220,235,0.25)'; g.beginPath(); if (round) g.arc(hx + s * r * 0.3, ey, r * 0.18, 0, 7); else g.roundRect(hx + s * r * 0.3 - r * 0.21, ey - r * 0.14, r * 0.42, r * 0.28, r * 0.07); g.fill(); g.stroke(); }
  g.beginPath(); g.moveTo(hx - r * 0.12, ey); g.lineTo(hx + r * 0.12, ey); g.stroke(); g.restore(); }
function mustache(hx, hy, r, col = '#3A3028') { g.save(); g.fillStyle = col; g.beginPath(); g.ellipse(hx, hy + r * 0.3, r * 0.3, r * 0.08, 0, 0, 7); g.fill(); g.restore(); }

/** vai lặp lại (đầu tròn kiểu B = folk + nét riêng). P.<vai>(x, yĐế, h, o) — o ghi đè (eyes, mouth, look, arm, sweat…). Trả { head, r } */
const ROLE = {
  tylerOld: { coat: 'suit',    dress: (hx, hy, r) => { hair(hx, hy, r, '#D8D6CE'); glasses(hx, hy, r); } },                      // Tyler về già: tóc bạc, kính
  tyler:    { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#3A2C22'); hat('officer', hx, hy, r); } },            // Trung uý Kermit Tyler, phi công
  lockard:  { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#6A4A2E'); hat('garrison', hx, hy, r); } },           // binh nhì trực radar
  elliott:  { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#2A221C'); hat('garrison', hx, hy, r); } },
  mcdonald: { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#8A5A30'); } },                                        // trực tổng đài Fort Shafter
  marshall: { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#D2D0C8'); hat('officer', hx, hy, r); } },            // Tướng Marshall: tóc bạc
  short:    { coat: 'soldier', dress: (hx, hy, r) => { hair(hx, hy, r, '#BDBAB0'); hat('officer', hx, hy, r); } },            // Tướng Short
  kimmel:   { coat: 'police',  dress: (hx, hy, r) => { hair(hx, hy, r, '#C9C6BC'); hat('officer', hx, hy, r, '#F2F0EA'); } },  // Đô đốc Kimmel: mũ trắng hải quân
  fdr:      { coat: 'suit',    dress: (hx, hy, r) => { hair(hx, hy, r, '#9A958C'); glasses(hx, hy, r, false); } },               // Roosevelt: kính kẹp mũi
  nomura:   { coat: 'suit',    dress: (hx, hy, r) => { hat('tophat', hx, hy, r); glasses(hx, hy, r); } },                         // đại sứ Nomura
  kurusu:   { coat: 'suit',    dress: (hx, hy, r) => { hat('tophat', hx, hy, r); mustache(hx, hy, r); } },                        // đặc phái viên Kurusu
  sailor:   { coat: 'plain',   dress: (hx, hy, r) => { hat('sailor', hx, hy, r); } },
  outer:    { coat: 'police',  dress: (hx, hy, r) => { hair(hx, hy, r, '#4A3A2C'); hat('officer', hx, hy, r, '#F2F0EA'); } },  // thuyền trưởng Outerbridge (Ward)
  gunner:   { coat: 'soldier', dress: (hx, hy, r) => { hat('brodie', hx, hy, r); } },
  messenger:{ coat: 'worker',  dress: (hx, hy, r) => { hat('goggles', hx, hy, r); } },
  clerk:    { coat: 'suit',    dress: (hx, hy, r) => { hair(hx, hy, r, '#1E1A18'); glasses(hx, hy, r); } },                     // nhân viên sứ quán gõ máy chữ
};
export const P = Object.fromEntries(Object.entries(ROLE).map(([k, rl]) => [k, (x, y, h, o = {}) => {
  const R = folk(x, y, h, { skin: SK, coat: rl.coat, eyes: 'dot', ...o }); if (!R?.head) return R; rl.dress(R.head[0], R.head[1], R.r); return R; }]));

// ── VẬT XUYÊN SUỐT: đồng hồ báo thức đỏ hai chuông ──
/** alarm(x, y, R, o): o.time [giờ, phút]; o.ring 0..1 (rung + vạch); o.snooze 0..1 (dấu SNOOZE đỏ đóng lên mặt); o.label chữ dưới đồng hồ */
export function alarm(x, y, R, o = {}) { const ring = o.ring ?? 0, sh = ring > 0 ? Math.sin((o.t ?? 0) * 70) * R * 0.03 * ring : 0;
  g.save(); g.translate(x + sh, y); g.rotate(sh / R * 0.6); g.strokeStyle = INK; g.lineWidth = Math.max(4, R * 0.035); g.lineJoin = 'round'; g.lineCap = 'round';
  for (const s of [-1, 1]) { g.fillStyle = '#D4A62A'; g.beginPath(); g.arc(s * R * 0.7, -R * 0.92, R * 0.36, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
  g.fillStyle = '#5A5A60'; g.fillRect(-R * 0.2, -R * 1.33, R * 0.4, R * 0.2); g.strokeRect(-R * 0.2, -R * 1.33 + (o.snooze ?? 0) * R * 0.06, R * 0.4, R * 0.2);   // nút snooze
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * R * 0.55, R * 0.8); g.lineTo(s * R * 0.75, R * 1.12); g.stroke(); }                                   // chân
  g.fillStyle = '#C62828'; g.beginPath(); g.arc(0, 0, R * 1.08, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#FFFDF4'; g.beginPath(); g.arc(0, 0, R * 0.92, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; g.font = `900 ${R * 0.2}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let k = 1; k <= 12; k++) { const a = k / 12 * Math.PI * 2 - Math.PI / 2; g.fillText(String(k), Math.cos(a) * R * 0.74, Math.sin(a) * R * 0.74); }
  const [hh, mm] = o.time ?? [7, 0], hand = (a, len, w) => { g.lineWidth = w; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * len, Math.sin(a) * len); g.stroke(); };
  hand((hh % 12 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, R * 0.46, R * 0.075); hand(mm / 60 * Math.PI * 2 - Math.PI / 2, R * 0.68, R * 0.045);
  g.fillStyle = INK; g.beginPath(); g.arc(0, 0, R * 0.07, 0, 7); g.fill();
  g.restore();
  if (ring > 0.05) { g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(4, R * 0.035) * ring; g.lineCap = 'round';
    for (const a of [Math.PI, 0, -2.35, -0.8]) for (let j = 0; j < 3; j++) { g.beginPath(); g.arc(x, y, R * (1.3 + j * 0.16), a - 0.15, a + 0.15); g.stroke(); } g.restore(); }
  if (o.snooze > 0) { const k = clamp(o.snooze); g.save(); g.translate(x, y - R * 0.1); g.rotate(-0.18); g.scale(2 - k, 2 - k); g.globalAlpha = k;           // dấu SNOOZE đóng lên mặt đồng hồ
    g.font = `900 ${R * 0.34}px Archivo, sans-serif`; const tw = g.measureText('SNOOZE').width; g.fillStyle = 'rgba(255,255,255,0.9)'; g.strokeStyle = RED; g.lineWidth = R * 0.05;
    g.fillRect(-tw / 2 - R * 0.08, -R * 0.24, tw + R * 0.16, R * 0.44); g.strokeRect(-tw / 2 - R * 0.08, -R * 0.24, tw + R * 0.16, R * 0.44); g.fillStyle = RED; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SNOOZE', 0, 0); g.restore(); }
  if (o.label) { g.save(); g.font = `900 ${R * 0.3}px Archivo, sans-serif`; g.textAlign = 'center'; g.lineJoin = 'round'; g.lineWidth = R * 0.05; g.strokeStyle = INK; g.fillStyle = '#FFE04A';
    g.strokeText(o.label, x, y + R * 1.55); g.fillText(o.label, x, y + R * 1.55); g.restore(); } }

/** màn radar tròn SCR-270 kiểu kính dao động: o.blob 0..1 (cỡ chùm đốm phía bắc), o.dist 0..1 (khoảng cách đốm tới tâm), o.sweep góc tia quét, o.ring khoanh đỏ */
export function scope(x, y, R, o = {}) { g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(5, R * 0.025);
  g.fillStyle = '#3C4044'; g.beginPath(); g.roundRect(x - R * 1.18, y - R * 1.18, R * 2.36, R * 2.36, R * 0.15); g.fill(); g.stroke();
  const gl = g.createRadialGradient(x, y, R * 0.05, x, y, R); gl.addColorStop(0, '#1F5A2C'); gl.addColorStop(1, '#0B2412'); g.fillStyle = gl; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.arc(x, y, R, 0, 7); g.clip();
  g.strokeStyle = 'rgba(120,255,150,0.35)'; g.lineWidth = 3; for (let k = 1; k <= 3; k++) { g.beginPath(); g.arc(x, y, R * k / 3.2, 0, 7); g.stroke(); }
  g.beginPath(); g.moveTo(x - R, y); g.lineTo(x + R, y); g.moveTo(x, y - R); g.lineTo(x, y + R); g.stroke();
  const a0 = o.sweep ?? -1.4, sw = g.createConicGradient(a0 - 0.9, x, y); sw.addColorStop(0, 'rgba(120,255,150,0)'); sw.addColorStop(0.14, 'rgba(120,255,150,0.38)'); sw.addColorStop(0.141, 'rgba(120,255,150,0)');
  g.fillStyle = sw; g.fillRect(x - R, y - R, 2 * R, 2 * R);
  const n = Math.round(70 * clamp(o.blob ?? 0)), d0 = 0.74 - 0.6 * clamp(o.dist ?? 0);
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (hash(i) - 0.5) * 0.5, d = R * (d0 - 0.16 + 0.32 * hash(i + 100)), px = x + Math.cos(a) * d, py = y + Math.sin(a) * d;
    g.fillStyle = i % 3 ? '#B6FFC4' : '#FFFFFF'; g.beginPath(); g.arc(px, py, R * (0.018 + 0.022 * hash(i + 200)), 0, 7); g.fill(); }
  g.fillStyle = '#8CFF9F'; g.beginPath(); g.arc(x, y, R * 0.04, 0, 7); g.fill(); g.restore();
  if (o.ring > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = R * 0.035; g.beginPath(); g.ellipse(x, y - R * d0, R * 0.6 * ease(o.ring), R * 0.38 * ease(o.ring), 0, 0, 7); g.stroke(); g.restore(); } }

/** điện thoại bàn kiểu 1941 (đế + ống nghe nằm ngang trên càng). o.off = ống nghe nhấc lên tay (vẽ riêng) */
export function phone(x, y, s, o = {}) { g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(4, s * 0.04); g.fillStyle = '#1C1C20';
  g.beginPath(); g.moveTo(x - s * 0.55, y); g.quadraticCurveTo(x - s * 0.5, y - s * 0.5, x, y - s * 0.55); g.quadraticCurveTo(x + s * 0.5, y - s * 0.5, x + s * 0.55, y); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#E8E2D2'; g.beginPath(); g.arc(x, y - s * 0.24, s * 0.18, 0, 7); g.fill(); g.stroke();
  if (!o.off) { g.fillStyle = '#1C1C20'; g.beginPath(); g.roundRect(x - s * 0.6, y - s * 0.78, s * 1.2, s * 0.16, s * 0.08); g.fill(); g.stroke();
    for (const k of [-1, 1]) { g.beginPath(); g.ellipse(x + k * s * 0.55, y - s * 0.7, s * 0.16, s * 0.12, 0, 0, 7); g.fill(); g.stroke(); } }
  g.restore(); }

/** tờ điện tín (vàng nhạt, dải chữ đánh máy); o.title, o.stamp (chữ dấu đỏ), o.seed */
export function telegram(x, y, w, rot = 0, o = {}) { const h = w * 0.72; g.save(); g.translate(x, y); g.rotate(rot); g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.012);
  g.fillStyle = '#F6E7B8'; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h);
  g.fillStyle = INK; g.font = `900 ${w * 0.075}px Archivo, sans-serif`; g.textAlign = 'left'; g.fillText(o.title ?? 'TELEGRAM', -w * 0.44, -h * 0.32);
  g.fillStyle = '#8A7E5E'; for (let i = 0; i < 6; i++) g.fillRect(-w * 0.44, -h * 0.16 + i * h * 0.11, w * (0.5 + 0.36 * hash(i + (o.seed ?? 0))), w * 0.022);
  if (o.stamp) { g.rotate(-0.12); g.font = `900 ${w * 0.1}px Archivo, sans-serif`; const tw = g.measureText(o.stamp).width; g.strokeStyle = RED; g.lineWidth = w * 0.014;
    g.strokeRect(w * 0.02 - tw / 2 - w * 0.03, h * 0.12, tw + w * 0.06, w * 0.14); g.fillStyle = RED; g.textAlign = 'center'; g.fillText(o.stamp, w * 0.02, h * 0.12 + w * 0.11); }
  g.restore(); }

/** thiết giáp hạm vẽ phẳng nhìn ngang (mũi phải): o.fire 0..1, o.sink 0..1 (chìm + nghiêng), o.col */
export function battleship(x, y, w, o = {}) { const h = w * 0.11, sink = clamp(o.sink ?? 0); g.save(); g.translate(x, y + sink * h * 1.6); g.rotate(sink * 0.12 * (o.dir ?? 1));
  g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.006); g.lineJoin = 'round'; g.fillStyle = o.col ?? '#8E959C';
  g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(w / 2, -h); g.lineTo(w * 0.44, 0); g.lineTo(-w * 0.46, 0); g.closePath(); g.fill(); g.stroke();                       // thân
  g.fillStyle = '#7A8188'; g.fillRect(-w * 0.12, -h * 2.1, w * 0.22, h * 1.1); g.strokeRect(-w * 0.12, -h * 2.1, w * 0.22, h * 1.1);                                 // thượng tầng
  for (const [cx, hh] of [[-0.05, 3.6], [0.06, 3.1]]) { g.fillRect(w * cx - w * 0.012, -h * hh, w * 0.024, h * (hh - 2)); g.strokeRect(w * cx - w * 0.012, -h * hh, w * 0.024, h * (hh - 2)); }   // cột buồm lồng
  for (const tx of [-0.36, -0.24, 0.22, 0.34]) { g.fillRect(w * tx - w * 0.04, -h * 1.5, w * 0.08, h * 0.5); g.strokeRect(w * tx - w * 0.04, -h * 1.5, w * 0.08, h * 0.5);
    g.beginPath(); g.moveTo(w * tx + w * 0.03, -h * 1.3); g.lineTo(w * tx + w * 0.11, -h * 1.34); g.stroke(); }                                                  // tháp pháo
  if ((o.fire ?? 0) > 0) { const k = clamp(o.fire); for (let i = 0; i < 9; i++) { const fx = w * (-0.2 + 0.4 * hash(i + 3)), fy = -h * (1.5 + 2.2 * hash(i + 9) * k), r = w * (0.03 + 0.04 * hash(i + 21)) * (0.5 + k);
      g.fillStyle = i % 3 ? '#F2A33A' : '#E4502A'; g.beginPath(); g.arc(fx, fy, r, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(40,40,44,0.75)'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(w * (-0.15 + 0.3 * hash(i + 40)), -h * (4 + 3 * i * k), w * (0.06 + 0.02 * i) * k, 0, 7); g.fill(); } }
  g.restore(); }

/** máy bay nhìn ngang (mũi phải): kind 'jp' (cánh xám, vòng đỏ), 'b17' (bạc, 4 động cơ). Chỉ là bóng phẳng đọc được ở cỡ nhỏ */
export function plane(x, y, s, kind = 'jp', o = {}) { g.save(); g.translate(x, y); g.rotate(o.rot ?? 0); if (o.flip) g.scale(-1, 1); g.strokeStyle = INK; g.lineWidth = Math.max(2.5, s * 0.03); g.lineJoin = 'round';
  const body = kind === 'b17' ? '#C9CDD2' : '#B9BDAE';
  g.fillStyle = body; g.beginPath(); g.ellipse(0, 0, s * 0.62, s * 0.1, 0, 0, 7); g.fill(); g.stroke();                                                              // thân
  g.beginPath(); g.moveTo(-s * 0.46, -s * 0.04); g.lineTo(-s * 0.6, -s * 0.28); g.lineTo(-s * 0.5, -s * 0.28); g.lineTo(-s * 0.32, -s * 0.06); g.closePath(); g.fill(); g.stroke();   // đuôi đứng
  g.beginPath(); g.roundRect(-s * 0.12, s * 0.02, s * 0.3, s * 0.07, s * 0.03); g.fill(); g.stroke();                                                                // cánh thẳng (máy bay cánh quạt 1941)
  g.beginPath(); g.moveTo(-s * 0.58, 0); g.lineTo(-s * 0.42, 0); g.stroke();                                                                                          // đuôi ngang
  g.fillStyle = '#4A4A4E'; g.beginPath(); g.ellipse(s * 0.63, 0, s * 0.03, s * 0.16, 0, 0, 7); g.fill(); g.stroke();                                                // cánh quạt
  if (kind === 'b17') for (const ex of [-0.02, 0.12]) { g.fillStyle = '#9EA3A8'; g.beginPath(); g.ellipse(s * ex, s * 0.1, s * 0.07, s * 0.04, 0, 0, 7); g.fill(); g.stroke(); }   // động cơ
  g.fillStyle = '#9ED0EA'; g.beginPath(); g.ellipse(s * 0.28, -s * 0.07, s * 0.12, s * 0.05, 0, Math.PI, 0); g.fill(); g.stroke();                                    // buồng lái
  if (kind === 'jp') { g.fillStyle = '#D9262C'; g.beginPath(); g.arc(-s * 0.14, 0, s * 0.055, 0, 7); g.fill(); }
  else { g.fillStyle = '#2B4C9B'; g.beginPath(); g.arc(-s * 0.18, 0, s * 0.05, 0, 7); g.fill(); g.fillStyle = '#FFF'; g.beginPath(); g.arc(-s * 0.18, 0, s * 0.022, 0, 7); g.fill(); }
  g.restore(); }

/** tàu sân bay vẽ phẳng nhìn ngang: sàn bay dài + đảo chỉ huy; o.flag 'jp' | 'us' */
export function carrier(x, y, w, o = {}) { const h = w * 0.09; g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.006); g.lineJoin = 'round';
  g.fillStyle = '#7F868C'; g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(w / 2, -h); g.lineTo(w * 0.42, 0); g.lineTo(-w * 0.44, 0); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#A88A5E'; g.fillRect(-w * 0.52, -h * 1.35, w * 1.04, h * 0.35); g.strokeRect(-w * 0.52, -h * 1.35, w * 1.04, h * 0.35);                         // sàn bay gỗ
  g.fillStyle = '#6E757B'; g.fillRect(w * 0.08, -h * 2.3, w * 0.1, h * 0.95); g.strokeRect(w * 0.08, -h * 2.3, w * 0.1, h * 0.95);                               // đảo
  if (o.flag === 'jp') { g.fillStyle = '#FFF'; g.fillRect(w * 0.14, -h * 3.4, w * 0.09, h * 0.6); g.strokeRect(w * 0.14, -h * 3.4, w * 0.09, h * 0.6); g.fillStyle = '#D9262C'; g.beginPath(); g.arc(w * 0.185, -h * 3.1, h * 0.18, 0, 7); g.fill(); }
  g.restore(); }

/** mặt biển phẳng có sóng nhẹ từ y tới đáy khung */
export function sea(y, t = 0, col = '#5E8FB0') { g.fillStyle = col; g.fillRect(0, y, W, H - y); g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 4;
  for (let i = 0; i < 14; i++) { const wx = ((hash(i) * W + t * 30 * (1 + hash(i + 5))) % (W + 200)) - 100, wy = y + 30 + hash(i + 9) * (H - y - 60); g.beginPath(); g.moveTo(wx, wy); g.quadraticCurveTo(wx + 30, wy - 10, wx + 60, wy); g.stroke(); } }

/** chữ nghiêm (đoạn chết chóc): trắng ngà, không viền màu */
export function sober(txt, x, y, size, k = 1, o = {}) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k); g.font = `800 ${size}px Archivo, sans-serif`; g.textAlign = o.align ?? 'center';
  g.fillStyle = o.col ?? '#ECE6DA'; g.fillText(txt, x, y); g.restore(); }
export const fade = (X, t0, d = 0.3) => clamp((X - t0) / d);
