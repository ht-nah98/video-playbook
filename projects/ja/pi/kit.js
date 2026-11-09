// Đồ nghề chung của ja/pi — DNA「天球」(projects/ja/pi/DNA.md): đêm chàm 藍, khí cụ thiên văn đồng thau khắc vạch, son
// 朱 CHỈ cho π / đáp án. Bàn thử gốc: tools/lab/tenkyu.html (khung chuẩn), tools/lab/sangaku.html (算額, b4).
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm THUẦN của tham số (tất định); kết cấu, sprite, ảnh xử lý, bóng mascot sinh MỘT lần trong loadKit.
// Quy ước góc: `deg`/`ang` là góc TOÁN (ngược chiều kim đồng hồ, 0 = bên phải) — vành khắc số độ theo chiều đó (lab).
// k ∈ [0, 1] là tiến độ hiện ra; mọi hàm có k đã thử ở 0.25/0.5/0.75/1 trên kit-test.html (LESSONS §89).
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages, must } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';
import { KINDS } from '../../../engine/sfx.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

const TAU = 2 * Math.PI;
export { TAU };

// ── bảng màu (DNA §2; tương phản đo trên #13224A) ──
export const C = {
  ai0: '#050A1C', ai1: '#0B1638', ai2: '#13224A',
  brass: '#D9A441', brassHi: '#F3DFA2', brassLo: '#6E5224', engrave: '#2A1C08',
  steel: '#A9B8D6', steelDim: '#7F8BA6',           // thép: ngoại tiếp / cái SAI (thép mờ, chữ to + gạch)
  ivory: '#EFE7D2', dim: '#8E9CC0',
  shu: '#F0603C',                                  // 朱: CHỈ π và đáp án đã chứng minh (≥ 40 px / nét)
  paper: '#EFE6CF', sumi: '#1E1914', shuInk: '#76200F', hinoki: '#D8BE92', steelInk: '#3E4C6C',   // thép trên giấy (sai)
};
export const MIN = '"Shippori Mincho"', JP = '"Noto Sans JP"', CG = '"Cormorant Garamond"', MONO = '"IBM Plex Mono"';
/** Mọi mặt chữ + đậm nhạt kit và cảnh dùng — trang nạp đủ bằng Promise.all trước init (LESSONS §16, font race). */
export const FONTS = [`700 40px ${MIN}`, `400 40px ${MIN}`, `400 40px ${JP}`, `500 40px ${JP}`, `700 40px ${JP}`,
  `500 40px ${CG}`, `600 40px ${CG}`, `italic 500 40px ${CG}`, `italic 600 40px ${CG}`, `500 40px ${MONO}`];
export const FONT_SAMPLE = '円周率はなぜ第一幕証明πθ√≤3.14';

// ── ERA (DNA §7): tenkyu = trời chàm; sangaku = cùng trời, đèn đền ấm từ dưới (b4) — đổi ERA thì trang loang từ WIPE ──
export const ERA = {
  tenkyu:  { bg: C.ai1, ink: C.ivory, accent: C.brass, dim: C.dim },
  sangaku: { bg: '#141026', ink: C.ivory, accent: C.brass, dim: C.dim },
};

// ── tiếng: loại mới của kênh Nhật (DNA §10). Chưa có trong engine/sfx.js KINDS thì dùng loại gần nhất của thư viện —
// khi thư viện thêm tên mới, cue tự đổi sang tiếng thật (không cần sửa cảnh). ──
const SFX_FALLBACK = { hyoshigi: 'wood', soroban: 'chip', hanko: 'impact', suzu: 'shimmer', taiko: 'impact' };
export const sk = kind => KINDS.includes(kind) ? kind : (SFX_FALLBACK[kind] ?? kind);

// ── hằng toán (mọi số lên hình qua must) ──
const piDigits = n => {                               // Machin: π = 16·atan(1/5) − 4·atan(1/239), số nguyên lớn + 10 chữ số đệm
  const S = 10n ** BigInt(n + 10), at = x => { let s = 0n, t = S / x, k = 1n, sg = 1n; const x2 = x * x;
    while (t) { s += sg * t / k; t /= x2; k += 2n; sg = -sg; } return s; };
  const p = (16n * at(5n) - 4n * at(239n)) / 10n ** 10n, d = p.toString(); return d[0] + '.' + d.slice(1, n + 1);
};
export const PI_DIGITS = '3.' +
  '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679' +
  '82148086513282306647093844609550582231725359408128';
must(`${JSON.stringify(piDigits(PI_DIGITS.length - 2))} === ${JSON.stringify(PI_DIGITS)}`, true);
must(`${PI_DIGITS.length - 2} >= 120`, true);
must(`${PI_DIGITS.slice(0, 17)} === Math.PI`, true);
export const ARCH = [223 / 71, 22 / 7];
must('Math.round(223 / 71 * 1e4) / 1e4', 3.1408); must('Math.round(22 / 7 * 1e4) / 1e4', 3.1429);
must('223 / 71 < 96 * Math.sin(Math.PI / 96) && 96 * Math.tan(Math.PI / 96) < 22 / 7', true);
export const REM7 = (() => { const r = [1]; while (r.length < 6) r.push(r.at(-1) * 10 % 7); return r; })();
must(`JSON.stringify(${JSON.stringify(REM7)})`, '[1,3,2,6,4,5]');
/** Chu vi / đường kính của n-giác nội tiếp (n·sin π/n) và ngoại tiếp (n·tan π/n). */
export const PERIM = n => ({ inn: n * Math.sin(Math.PI / n), out: n * Math.tan(Math.PI / n) });
/** Bảng Archimedes 6 → 96, đã làm tròn 4 chữ số (lab tenkyu khung 0). */
export const PERIM_TABLE = [[6, 3, 3.4641], [12, 3.1058, 3.2154], [24, 3.1326, 3.1597], [48, 3.1394, 3.1461], [96, 3.141, 3.1427]];
for (const [n, a, b] of PERIM_TABLE) {
  must(`Math.round(${n} * Math.sin(Math.PI / ${n}) * 1e4) / 1e4`, a); must(`Math.round(${n} * Math.tan(Math.PI / ${n}) * 1e4) / 1e4`, b);
}
export const f4 = v => v.toFixed(4);

// ═════════════════════════ trời ═════════════════════════
// Sao xoay quanh CỰC (POLE); sprite vuông đủ phủ khung ở mọi góc. Độ xoay = trôi chậm theo t + bước "trời quay" của
// trang ở mỗi chuyển cảnh cùng ERA (setSkyOffset) — một hàm thuần của t, không nhảy khi hết chuyển cảnh.
export const POLE = [W / 2, H * 0.42];
const SKY_S = 2500, DRIFT = 0.004;                     // rad/s
let BASE = {}, STARS, TRAILS, VIG, GROUND_ON = true, SKY_OFF = () => 0;
export function setGround(on) { GROUND_ON = on; }       // trang tắt nền khi vẽ cảnh vào bộ đệm trong suốt (chuyển cảnh trời quay)
export function setSkyOffset(fn) { SKY_OFF = fn; }
export const skyRot = t => t * DRIFT + SKY_OFF(t);

function makeBase(warm) {
  const c = mk(), x = c.getContext('2d');
  const gr = x.createRadialGradient(W * 0.46, H * 0.42, 40, W * 0.46, H * 0.42, 1250);
  gr.addColorStop(0, warm ? '#1C1D46' : C.ai2); gr.addColorStop(0.45, warm ? '#121233' : C.ai1); gr.addColorStop(1, warm ? '#07061A' : C.ai0);
  x.fillStyle = gr; x.fillRect(0, 0, W, H);
  if (warm) {                                          // đèn đền: quầng hổ phách rất thấp từ đáy khung
    const lg = x.createRadialGradient(W / 2, H + 260, 80, W / 2, H + 260, 1100);
    lg.addColorStop(0, 'rgba(232,150,70,0.30)'); lg.addColorStop(0.5, 'rgba(200,110,50,0.10)'); lg.addColorStop(1, 'rgba(200,110,50,0)');
    x.fillStyle = lg; x.fillRect(0, 0, W, H);
  }
  const band = x.createLinearGradient(0, H, W, 0);
  band.addColorStop(0.30, 'rgba(120,140,200,0)'); band.addColorStop(0.47, 'rgba(120,140,200,0.045)'); band.addColorStop(0.64, 'rgba(120,140,200,0)');
  x.fillStyle = band; x.fillRect(0, 0, W, H);
  const id = x.getImageData(0, 0, W, H), d = id.data;
  for (let i = 0; i < W * H; i++) { const n = (hash(i * 0.613 + 0.17) - 0.5) * 4.5; d[i * 4] += n; d[i * 4 + 1] += n; d[i * 4 + 2] += n * 1.2; }
  x.putImageData(id, 0, 0); return c;
}
function makeStars() {
  const c = mk(SKY_S, SKY_S), x = c.getContext('2d'), area = (SKY_S * SKY_S) / (W * H);
  for (let i = 0; i < Math.round(2600 * area); i++) {
    const sx = hash(i * 1.37 + 0.5) * SKY_S, sy = hash(i * 2.91 + 0.3) * SKY_S, m = hash(i * 0.77 + 9.1) ** 3.2;
    const along = Math.abs((sx / SKY_S) + (sy / SKY_S) - 1.0);              // dải ngân hà chéo, dày hơn
    if (along > 0.2 && hash(i * 5.3) < 0.45) continue;
    const warm = hash(i * 3.3 + 1.1), col = warm < 0.25 ? '255,226,180' : warm > 0.8 ? '190,210,255' : '235,238,250';
    const a = 0.18 + 0.75 * m, r = 0.45 + 0.9 * m;
    x.fillStyle = `rgba(${col},${a})`; x.beginPath(); x.arc(sx, sy, r, 0, TAU); x.fill();
    if (m > 0.82) { const q = x.createRadialGradient(sx, sy, 0, sx, sy, 3 + 4 * m); q.addColorStop(0, `rgba(${col},${0.2 * m})`); q.addColorStop(1, `rgba(${col},0)`);
      x.fillStyle = q; x.fillRect(sx - 8, sy - 8, 16, 16); }
  }
  return c;
}
function makeTrails() {                                // vệt sao phơi sáng dài quanh cực (hồi 2, hố đen)
  const c = mk(SKY_S, SKY_S), x = c.getContext('2d'), o = SKY_S / 2; x.lineCap = 'round';
  for (let i = 0; i < 900; i++) {
    const r = 60 + hash(i * 1.91 + 4) * 1200, a0 = hash(i * 2.37 + 7) * TAU, len = 0.10 + 0.16 * hash(i * 4.1 + 2), m = hash(i * 0.53 + 3) ** 2;
    const gr = x.createConicGradient(a0, o, o), f = len / TAU;
    gr.addColorStop(0, `rgba(220,228,255,${0.03 + 0.2 * m})`); gr.addColorStop(f, 'rgba(220,228,255,0)'); gr.addColorStop(1, 'rgba(220,228,255,0)');
    x.strokeStyle = gr; x.lineWidth = 0.7 + 0.8 * m; x.beginPath(); x.arc(o, o, r, a0, a0 + len); x.stroke();
  }
  return c;
}
function makeVignette() {
  const c = mk(), x = c.getContext('2d'), v = x.createRadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1150);
  v.addColorStop(0, 'rgba(2,4,12,0)'); v.addColorStop(1, 'rgba(2,4,12,0.55)'); x.fillStyle = v; x.fillRect(0, 0, W, H); return c;
}
/** Nền trời toàn khung. t = giờ timeline của cảnh (sao trôi); trails 0..1 = vệt sao quay; spin = xoay thêm (rad). */
export function ground(g, e = 'tenkyu', t = 0, { trails = 0, spin = 0 } = {}) {
  if (!GROUND_ON) return;
  g.drawImage(BASE[e], 0, 0);
  const a = skyRot(t) + spin;
  g.save(); g.translate(POLE[0], POLE[1]); g.rotate(a);
  g.drawImage(STARS, -SKY_S / 2, -SKY_S / 2);
  if (trails > 0) { g.globalAlpha = clamp(trails); g.drawImage(TRAILS, -SKY_S / 2, -SKY_S / 2); }
  g.restore();
  g.drawImage(VIG, 0, 0);
}
/** Tối dần về đen (on 1 = sáng, 0 = đen kín) — a0 cuối → intro; p2 đầu ← intro. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(0,0,0,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }

// ═════════════════════════ vành đồng thau (vật xuyên suốt) ═════════════════════════
const BAND = new Map();
function bandSprite(r0, r1) {                          // dải đồng tiện: bóng đổ, conic sheen, vân tiện, vát mép — cố định theo ánh sáng
  const pad = 40, s = Math.ceil(2 * (r1 + pad)), c = mk(s, s), x = c.getContext('2d'), o = s / 2;
  x.save(); x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 28; x.shadowOffsetY = 10;
  x.fillStyle = '#4A3714'; x.beginPath(); x.arc(o, o, r1, 0, TAU); x.arc(o, o, r0, 0, TAU, true); x.fill(); x.restore();
  x.save(); x.beginPath(); x.arc(o, o, r1, 0, TAU); x.arc(o, o, r0, 0, TAU, true); x.clip();
  const cg = x.createConicGradient(-0.9, o, o);
  [[0, '#7E5E28'], [0.09, '#E6C77C'], [0.16, '#F6E4AA'], [0.24, '#B48A40'], [0.36, '#6F5222'], [0.47, '#C9A158'], [0.55, '#EED796'],
   [0.63, '#A07935'], [0.76, '#6A4E20'], [0.88, '#D3AE62'], [1, '#7E5E28']].forEach(([q, col]) => cg.addColorStop(q, col));
  x.fillStyle = cg; x.fillRect(0, 0, s, s);
  for (let r = r0 + 1; r < r1; r += 1.5) { const h = hash(r * 3.71 + r1); x.strokeStyle = h > 0.5 ? `rgba(255,240,200,${(h - 0.5) * 0.1})` : `rgba(40,25,5,${(0.5 - h) * 0.14})`;
    x.lineWidth = 1; x.beginPath(); x.arc(o, o, r, 0, TAU); x.stroke(); }
  const bv = x.createRadialGradient(o, o, r0, o, o, r1);
  bv.addColorStop(0, 'rgba(20,12,0,0.55)'); bv.addColorStop(0.12, 'rgba(20,12,0,0)'); bv.addColorStop(0.82, 'rgba(255,245,215,0)');
  bv.addColorStop(0.93, 'rgba(255,245,215,0.22)'); bv.addColorStop(1, 'rgba(20,12,0,0.6)');
  x.fillStyle = bv; x.fillRect(0, 0, s, s); x.restore();
  x.strokeStyle = 'rgba(255,240,200,0.55)'; x.lineWidth = 1; x.beginPath(); x.arc(o, o, r1 - 0.5, -2.6, -0.4); x.stroke();
  x.strokeStyle = 'rgba(10,6,0,0.8)'; x.beginPath(); x.arc(o, o, r0 + 0.5, 0, TAU); x.stroke();
  return c;
}
/** Hình học vành quanh đường tròn bán kính r: dải đồng [r0, r1], vòng số ở rn. */
export const ringGeom = r => { const r0 = r + Math.max(16, Math.round(r * 0.11)), bw = Math.max(30, Math.round(r * 0.16)); return { r0, r1: r0 + bw, rn: r0 + (bw - 20) / 2 + 1 }; };
const sector = (g, cx, cy, R, s) => { g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + TAU * s); g.closePath(); g.clip(); };
/**
 * Vành 天球儀: dải đồng khắc 360 vạch, số độ mỗi 30°, đường tròn chỉ vàng bán kính r.
 * k: 0–0.55 dải quét theo chiều kim đồng hồ từ đỉnh · 0.25–0.85 vạch khắc quét · 0.5–1 chỉ vàng.
 * rot (rad, toán) xoay vạch + số (vành là khí cụ quay); marks [[deg, màu]] = chấm men khảm (son ở π…).
 * numerals false → chỉ vạch (vành nhỏ). thread false → không chỉ vàng (cảnh tự vẽ đường tròn). Trả về ringGeom.
 */
export function ring360(g, cx, cy, r, k = 1, { rot = 0, marks = [], numerals = true, thread = true } = {}) {
  const G = ringGeom(r), { r0, r1, rn } = G;
  if (k <= 0) return G;
  const kb = clamp(k / 0.55), kt = clamp((k - 0.25) / 0.6), kc = clamp((k - 0.5) / 0.5);
  const key = r0 + ':' + r1;
  if (!BAND.has(key)) { BAND.set(key, bandSprite(r0, r1)); if (BAND.size > 16) BAND.delete(BAND.keys().next().value); }   // vành co giãn: giữ 16 cỡ gần nhất
  const sp = BAND.get(key), o = sp.width / 2;
  g.save(); if (kb < 1) sector(g, cx, cy, r1 + 60, outCubic(kb));
  g.drawImage(sp, cx - o, cy - o); g.restore();
  if (kt > 0) {
    g.save(); if (kt < 1) sector(g, cx, cy, r1 + 2, kt);
    const tick = (a, l, w) => { const c = Math.cos(a), s = Math.sin(a);
      g.lineWidth = w; g.strokeStyle = 'rgba(255,238,190,0.35)'; g.beginPath(); g.moveTo(cx + (r1 - 3) * c, cy + (r1 - 3) * s + 1); g.lineTo(cx + (r1 - 3 - l) * c, cy + (r1 - 3 - l) * s + 1); g.stroke();
      g.strokeStyle = 'rgba(42,28,8,0.92)'; g.beginPath(); g.moveTo(cx + (r1 - 3) * c, cy + (r1 - 3) * s); g.lineTo(cx + (r1 - 3 - l) * c, cy + (r1 - 3 - l) * s); g.stroke(); };
    const big = r1 - r0 >= 34, L = big ? [15, 10, 6] : [10, 7, 4];
    for (let d = 0; d < 360; d++) { const a = -d * Math.PI / 180 - rot; tick(a, d % 10 === 0 ? L[0] : d % 5 === 0 ? L[1] : L[2], d % 10 === 0 ? 1.4 : 1); }
    if (numerals && big) {
      g.strokeStyle = 'rgba(42,28,8,0.7)'; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, r1 - 20, 0, TAU); g.stroke();
      g.strokeStyle = 'rgba(255,238,190,0.25)'; g.beginPath(); g.arc(cx, cy, r1 - 19, 0, TAU); g.stroke();
      g.font = `500 13px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let d = 0; d < 360; d += 30) {
        const a = -d * Math.PI / 180 - rot, lower = Math.sin(a) > 0.01;
        g.save(); g.translate(cx + rn * Math.cos(a), cy + rn * Math.sin(a)); g.rotate(a + (lower ? -Math.PI / 2 : Math.PI / 2));
        g.fillStyle = 'rgba(255,238,190,0.35)'; g.fillText(String(d), 0, 1); g.fillStyle = C.engrave; g.fillText(String(d), 0, 0); g.restore();
      }
    }
    for (const [d, col] of marks) { const a = -d * Math.PI / 180 - rot, rr = r1 - 9;
      g.fillStyle = col; g.beginPath(); g.arc(cx + rr * Math.cos(a), cy + rr * Math.sin(a), 3.6, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(42,28,8,0.8)'; g.lineWidth = 1; g.stroke(); }
    g.restore();
  }
  if (thread && kc > 0) circleLine(g, cx, cy, r, kc);
  return G;
}
/** Đường tròn chỉ vàng mảnh (đường tròn THẬT của bài), vẽ dần từ đỉnh theo chiều kim đồng hồ; glow tiết chế. */
export function circleLine(g, cx, cy, r, k = 1, { color = C.brassHi, w = 1.8 } = {}) {
  if (k <= 0) return;
  g.save(); g.shadowColor = 'rgba(243,223,162,0.45)'; g.shadowBlur = 8; g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round';
  g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(k)); g.stroke(); g.restore();
}
/** Cung son (π, nửa vòng): góc TOÁN a0 → a1 (a1 > a0 = ngược chiều kim đồng hồ), vẽ dần theo k. */
export function arcShu(g, cx, cy, r, a0, a1, k = 1, { w = 4.5 } = {}) {
  if (k <= 0) return;
  const e = a0 + (a1 - a0) * clamp(k);
  g.save(); g.shadowColor = 'rgba(240,96,60,0.55)'; g.shadowBlur = 10; g.strokeStyle = C.shu; g.lineWidth = w; g.lineCap = 'round';
  g.beginPath(); g.arc(cx, cy, r, -a0, -e, a1 > a0); g.stroke(); g.restore();
}
/** Chân kính hồng ngọc ở tâm (như máy đồng hồ). */
export function pivot(g, cx, cy, s = 1) {
  const gr = g.createRadialGradient(cx - 2 * s, cy - 2 * s, 0, cx, cy, 9 * s); gr.addColorStop(0, '#FFF2C6'); gr.addColorStop(0.5, '#C9993E'); gr.addColorStop(1, '#4A3412');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, 8 * s, 0, TAU); g.fill();
  g.fillStyle = '#7A1E10'; g.beginPath(); g.arc(cx, cy, 2.6 * s, 0, TAU); g.fill();
}
/** Kim đồng thau từ tâm, góc TOÁN ang, dài len; k = mọc ra từ tâm. */
export function needle(g, cx, cy, len, ang, k = 1, { color = C.brass } = {}) {
  if (k <= 0) return;
  const L = len * outCubic(clamp(k));
  g.save(); g.translate(cx, cy); g.rotate(-ang);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.moveTo(-L * 0.18, 4 + 2); g.lineTo(L, 2); g.lineTo(-L * 0.18, -4 + 2); g.fill();
  const gr = g.createLinearGradient(0, -4, 0, 4); gr.addColorStop(0, C.brassHi); gr.addColorStop(0.5, color); gr.addColorStop(1, C.brassLo);
  g.fillStyle = gr; g.beginPath(); g.moveTo(-L * 0.18, 4); g.lineTo(L, 0); g.lineTo(-L * 0.18, -4); g.closePath(); g.fill();
  g.beginPath(); g.arc(-L * 0.18, 0, 6, 0, TAU); g.fill();                    // đối trọng
  g.restore(); pivot(g, cx, cy);
}
/** Hạt sáng (điểm đang quay, viên đá…): lõi ngà + vòng đồng mảnh; k = bật ra (outBack). */
export function bead(g, x, y, r = 7, k = 1, { core = C.ivory } = {}) {
  if (k <= 0) return;
  const s = outBack(clamp(k)), R = r * s;
  const gr = g.createRadialGradient(x, y, 0, x, y, R * 3); gr.addColorStop(0, 'rgba(255,245,220,0.35)'); gr.addColorStop(1, 'rgba(255,245,220,0)');
  g.fillStyle = gr; g.fillRect(x - R * 3, y - R * 3, R * 6, R * 6);
  g.fillStyle = core; g.beginPath(); g.arc(x, y, Math.max(0.1, R), 0, TAU); g.fill();
  g.strokeStyle = C.brass; g.lineWidth = 1.2; g.beginPath(); g.arc(x, y, Math.max(0.1, R + 3 * s), 0, TAU); g.stroke();
}

// ── đa giác nội / ngoại tiếp (đồng = trong, thép = ngoài; tiếp điểm của ngoại tiếp tại đỉnh nội tiếp) ──
export const polyIn = (cx, cy, r, n, a0 = -Math.PI / 2) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(a0 + i * TAU / n), cy + r * Math.sin(a0 + i * TAU / n)]);
export const polyOut = (cx, cy, r, n, a0 = -Math.PI / 2) => polyIn(cx, cy, r / Math.cos(Math.PI / n), n, a0 + Math.PI / n);
/** Vẽ đa giác khép kín dần theo chu vi (k); dots = hạt ở đỉnh đã tới. */
export function drawPoly(g, P, k = 1, { color = C.brass, w = 1.6, dash = [], dots = false } = {}) {
  if (k <= 0) return;
  const n = P.length, m = clamp(k) * n, full = Math.floor(m);
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineJoin = 'miter'; g.setLineDash(dash); g.beginPath(); g.moveTo(...P[0]);
  for (let i = 1; i <= full; i++) g.lineTo(...P[i % n]);
  if (full < n) { const [ax, ay] = P[full % n], [bx, by] = P[(full + 1) % n], f = m - full; g.lineTo(ax + (bx - ax) * f, ay + (by - ay) * f); } else g.closePath();
  g.stroke(); g.setLineDash([]);
  if (dots) for (let i = 0; i <= Math.min(full, n - 1); i++) { g.fillStyle = color; g.beginPath(); g.arc(P[i][0], P[i][1], 3, 0, TAU); g.fill(); }
  g.restore();
}
/** Khe kẹp giữa ngoại và nội tiếp (đồng rất nhẹ). */
export function gap(g, Pin, Pout, a = 0.1) {
  g.save(); g.beginPath(); Pout.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
  Pin.slice().reverse().forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
  g.fillStyle = `rgba(217,164,65,${a})`; g.fill('evenodd'); g.restore();
}

// ═════════════════════════ chữ ═════════════════════════
/** Đo một chuỗi với letterSpacing. */
export function measure(g, s, font, ls = 0) { g.save(); g.font = font; g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; g.restore(); return w; }
/**
 * Chữ KHẮC vào (DNA §3 — không fade): lộ từng ký tự theo k, ký tự đang khắc có tia sáng mũi khắc. Nền khắc = bóng tối 1.5 px.
 * parts: chuỗi, hoặc [[chuỗi, font, màu, ls?], …] nhiều mặt chữ nối liền (π/θ trong câu 明朝 phải là font khác).
 * opts: align, spark (tia khắc), shadow (bóng khắc; tắt trên giấy/gỗ). Trả về { x0, w } của CẢ dòng (đã đo, kể cả phần chưa lộ).
 */
export function engrave(g, parts, x, y, k = 1, font = `700 40px ${MIN}`, color = C.ivory, { align = 'left', ls = 0, spark = true, shadow = true } = {}) {
  const P = typeof parts === 'string' ? [[parts, font, color, ls]] : parts.map(([s, f = font, c = color, l = ls]) => [s, f, c, l]);
  const ws = P.map(([s, f, , l]) => measure(g, s, f, l)), tot = ws.reduce((a, b) => a + b, 0);
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const N = P.reduce((a, [s]) => a + [...s].length, 0), n = Math.round(N * clamp(k));
  if (n <= 0) return { x0, w: tot };
  let left = n, cx = x0, sparkX = null;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  P.forEach(([s, f, col, l], i) => {
    if (left <= 0) return;
    const ch = [...s], take = Math.min(left, ch.length), sub = ch.slice(0, take).join('');
    g.font = f; g.letterSpacing = l + 'px';
    if (shadow) { g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillText(sub, cx, y + 1.5); }
    g.fillStyle = col; g.fillText(sub, cx, y);
    sparkX = cx + g.measureText(sub).width;
    left -= take; cx += ws[i];
  });
  g.restore();
  if (spark && k < 1 && sparkX != null) {                 // tia mũi khắc: chữ thập sáng nhỏ ở mép đang khắc
    const fs = parseFloat(/(\d+(?:\.\d+)?)px/.exec(P[0][1])[1]), sy = y - fs * 0.35, r = Math.max(6, fs * 0.22);
    g.save(); g.globalCompositeOperation = 'lighter';
    const gr = g.createRadialGradient(sparkX, sy, 0, sparkX, sy, r * 2); gr.addColorStop(0, 'rgba(255,236,180,0.7)'); gr.addColorStop(1, 'rgba(255,236,180,0)');
    g.fillStyle = gr; g.fillRect(sparkX - r * 2, sy - r * 2, r * 4, r * 4);
    g.strokeStyle = 'rgba(255,246,220,0.85)'; g.lineWidth = 1; g.beginPath(); g.moveTo(sparkX - r, sy); g.lineTo(sparkX + r, sy); g.moveTo(sparkX, sy - r); g.lineTo(sparkX, sy + r); g.stroke();
    g.restore();
  }
  return { x0, w: tot };
}
/** Thước mảnh đồng: đường 1 px + vạch chia + hạt thoi ở đầu; k kéo dài từ trái. */
export function rule(g, x0, x1, y, k = 1, { color = C.brass, a = 0.75 } = {}) {
  if (k <= 0) return;
  const xe = x0 + (x1 - x0) * outCubic(clamp(k));
  g.save(); g.globalAlpha = a; g.strokeStyle = color; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y + 0.5); g.lineTo(xe, y + 0.5); g.stroke();
  for (let x = x0; x <= xe - 4; x += 12) { g.beginPath(); g.moveTo(x + 0.5, y); g.lineTo(x + 0.5, y + ((x - x0) % 60 === 0 ? 6 : 3)); g.stroke(); }
  g.fillStyle = color; g.beginPath(); g.moveTo(xe, y - 4); g.lineTo(xe + 5, y + 0.5); g.lineTo(xe, y + 5); g.lineTo(xe - 5, y + 0.5); g.fill(); g.restore();
}
/** Biển mục góc trên-trái (khung lab): kicker đồng giãn chữ + tiêu đề 明朝 + thước. Trả về bề rộng tiêu đề. */
export function heading(g, kicker, title, k = 1, { x = 96, y = 172, size = 66 } = {}) {
  if (k <= 0) return 0;
  if (kicker) engrave(g, kicker, x + 2, y - 84, clamp(k * 3), `500 26px ${JP}`, C.brass, { ls: 6, spark: false });
  const r = engrave(g, title, x, y, clamp(k * 1.6 - 0.3), `700 ${size}px ${MIN}`, C.ivory, { ls: 4 });
  rule(g, x + 2, x + 2 + r.w, y + 30, clamp(k * 1.6 - 0.6));
  return r.w;
}
/**
 * テロップ: chữ (明朝 mặc định) trong khung chỉ đồng mảnh có góc gập, như nhãn khắc trên khí cụ.
 * Khung vẽ ở k 0–0.35 (góc mọc ra), chữ khắc ở k 0.15–1. parts như engrave. Trả về hộp { x, y, w, h }.
 */
export function telop(g, parts, x, y, k = 1, { size = 40, font = `700 ${size}px ${MIN}`, color = C.ivory, align = 'left', ls = 2, pad = 22, frame = true, frameColor = C.brass } = {}) {
  const P = typeof parts === 'string' ? [[parts, font, color, ls]] : parts;
  const wt = P.reduce((a, [s, f = font, , l = ls]) => a + measure(g, s, f, l), 0);
  const bw = wt + pad * 2, bh = size * 1.55, bx = (align === 'center' ? x - wt / 2 : align === 'right' ? x - wt : x) - pad, by = y - size * 1.08;
  const box = { x: bx, y: by, w: bw, h: bh };
  if (k <= 0) return box;
  if (frame) {
    const kf = outCubic(clamp(k / 0.35)), c = Math.min(22, bh * 0.4);
    g.save(); g.fillStyle = 'rgba(5,10,28,0.55)'; g.fillRect(bx, by, bw, bh);
    g.strokeStyle = frameColor; g.lineWidth = 1.2; g.globalAlpha = 0.9;
    const corner = (px, py, sx, sy) => { g.beginPath(); g.moveTo(px + sx * c * kf, py); g.lineTo(px, py); g.lineTo(px, py + sy * c * kf); g.stroke(); };
    corner(bx, by, 1, 1); corner(bx + bw, by, -1, 1); corner(bx, by + bh, 1, -1); corner(bx + bw, by + bh, -1, -1);
    g.globalAlpha = 0.35; g.beginPath(); g.moveTo(bx + c + 6, by + 0.5); g.lineTo(bx + c + 6 + (bw - 2 * c - 12) * kf, by + 0.5);
    g.moveTo(bx + bw - c - 6, by + bh - 0.5); g.lineTo(bx + bw - c - 6 - (bw - 2 * c - 12) * kf, by + bh - 0.5); g.stroke();
    g.restore();
  }
  engrave(g, P.map(([s, f = font, c = color, l = ls]) => [s, f, c, l]), bx + pad, y, clamp((k - 0.15) / 0.85), font, color);
  return box;
}
/** Số thứ tự mục lục ①②③: đĩa son nhỏ, số ngà (Cormorant); bật vào như đóng dấu. (son: mục lục lời hứa — DNA §1) */
export function tag(g, n, x, y, k = 1, { r = 24 } = {}) {
  if (k <= 0) return;
  const s = outBack(clamp(k / 0.6)) * (1 + 0.25 * (1 - clamp(k / 0.6)));
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.arc(1.5, 2.5, r, 0, TAU); g.fill();
  g.fillStyle = C.shu; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(255,220,200,0.45)'; g.lineWidth = 1; g.beginPath(); g.arc(0, 0, r - 4, 0, TAU); g.stroke();
  g.fillStyle = C.ivory; g.font = `600 ${Math.round(r * 1.45)}px ${CG}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), 0, 2);
  g.restore();
}
/** Dây dẫn mảnh từ (x0,y0) tới (x1,y1) với hạt ở đầu; k kéo dài. */
export function leader(g, x0, y0, x1, y1, k = 1, { color = C.brass, a = 0.8 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = x0 + (x1 - x0) * e, ye = y0 + (y1 - y0) * e;
  g.save(); g.globalAlpha = a; g.strokeStyle = color; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(xe, ye); g.stroke();
  g.fillStyle = color; g.beginPath(); g.arc(x0, y0, 2.5, 0, TAU); g.fill(); g.restore();
}
/** Gạch THÉP (cái sai — KHÔNG son, DNA §1): thanh thép mảnh có mép sáng, vạch dần từ trái theo k. */
export function strikeSteel(g, x0, y0, x1, y1, k = 1, { w = 3.5, color = C.steel } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = x0 + (x1 - x0) * e, ye = y0 + (y1 - y0) * e;
  g.save(); g.lineCap = 'round';
  g.strokeStyle = 'rgba(0,0,0,0.55)'; g.lineWidth = w + 2; g.beginPath(); g.moveTo(x0, y0 + 1.5); g.lineTo(xe, ye + 1.5); g.stroke();
  g.strokeStyle = color; g.lineWidth = w; g.beginPath(); g.moveTo(x0, y0); g.lineTo(xe, ye); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0 - w / 4); g.lineTo(xe, ye - w / 4); g.stroke();
  g.restore();
}
/**
 * 判子 son (đáp án, 証明終): khung vuông bo góc, chữ 明朝 trắng âm (màu nền `hole`), mép ăn mòn tất định.
 * ≤ 3 chữ: một cột dọc; 4 chữ: 2×2 đọc phải → trái. k: rơi xuống từ to (0–0.45) rồi nằm yên.
 */
export function stamp(g, s, x, y, k = 1, { size = 46, rot = -0.07, hole = C.paper } = {}) {
  if (k <= 0) return;
  const ch = [...s], cols = ch.length === 4 ? 2 : 1, rows = Math.ceil(ch.length / cols);
  const w = cols * size * 1.08 + size * 0.42, h = rows * size * 1.08 + size * 0.42;
  const e = clamp(k / 0.45), sc = 1 + (1 - outCubic(e)) * 0.6;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc);
  g.fillStyle = C.shu; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, size * 0.12); g.fill();
  g.fillStyle = hole; g.font = `700 ${size}px ${MIN}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  ch.forEach((c, i) => { const col = cols === 2 ? 1 - Math.floor(i / rows) : 0, row = i % rows;
    g.fillText(c, -w / 2 + size * 0.21 + (col + 0.5) * size * 1.08, -h / 2 + size * 0.21 + (row + 0.5) * size * 1.08 + size * 0.04); });
  for (let i = 0; i < 26; i++) {                        // mép ăn mòn: chấm màu nền dọc viền
    const u = hash(i * 7.3 + s.length), side = i % 4, r = 1 + 2.2 * hash(i * 3.1 + 2);
    const px = side < 2 ? -w / 2 + u * w : (side === 2 ? -w / 2 : w / 2), py = side < 2 ? (side === 0 ? -h / 2 : h / 2) : -h / 2 + u * h;
    g.beginPath(); g.arc(px, py, r, 0, TAU); g.fill();
  }
  g.restore();
}

// ═════════════════════════ vật ═════════════════════════
let PAPER, WOOD;
function makePaper() {                                 // giấy ngà: sợi + hạt rất mịn
  const w = 1000, h = 700, c = mk(w, h), x = c.getContext('2d'), d = x.createImageData(w, h), b = [0xEF, 0xE6, 0xCF];
  for (let i = 0; i < w * h; i++) { const px = i % w, py = (i / w) | 0;
    const n = (hash(i * 0.917) - 0.5) * 7 + (vnoise(px / 3, py / 40) - 0.5) * 6 + (vnoise(px / 160, py / 160) - 0.5) * 8;
    for (let j = 0; j < 3; j++) d.data[i * 4 + j] = b[j] + n; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return c;
}
function vnoise(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, s = t => t * t * (3 - 2 * t);
  const h = (i, j) => hash(i * 12.9898 + j * 78.233 + seed * 3.17);
  const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1), u = s(xf), v = s(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function makeWood() {                                  // hinoki 柾目 (lab sangaku, thu nhỏ): vân thẳng mịn, ánh xiên trên-trái
  const w = 1500, h = 900, c = mk(w, h), x = c.getContext('2d'), d = x.createImageData(w, h), early = [218, 194, 154], late = [168, 128, 86];
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
    const i = py * w + px, k = i * 4;
    const warp = 26 * vnoise(px / 820, py / 260, 1) + 6 * vnoise(px / 170, py / 70, 4);
    const ph = (py + warp) / (7.5 + 6 * vnoise(px / 2000, py / 160, 17)) + 3.2 * vnoise(px / 1400, py / 120, 7);
    const f = ph - Math.floor(ph), band = vnoise(Math.floor(ph) * 1.7, 0.5, 9);
    const lw = ss(0.66, 0.92, f) * (1 - ss(0.94, 1, f)) * (0.15 + 0.75 * band * band) + 0.12 * vnoise(px / 600, ph * 0.31, 21);
    const n = (vnoise(px / 46, py / 1.3, 11) - 0.5) * 10 + (hash(i * 0.731) - 0.5) * 7 + 12 - 30 * Math.min(1.2, Math.hypot(px + 200, py + 260) / 1800);
    for (let ch = 0; ch < 3; ch++) d.data[k + ch] = early[ch] + (late[ch] - early[ch]) * lw + n * [1, 0.93, 0.8][ch];
    d.data[k + 3] = 255;
  }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Phiếu đề 東大 (DNA a0, b3): tờ giấy ngà viền son kép, đầu phiếu khắc mực. k: trượt lên từ dưới + nắn thẳng.
 * Trả về { x, y, w, h, ix, iy, iw } — vùng viết bên trong. Chữ trên phiếu PHẢI vẽ trong content(X) (gọi trong phép dời của
 * tờ giấy, toạ độ khung như X) — vẽ ngoài thì chữ đứng yên khi tờ giấy còn đang trượt (LESSONS §89, tờ thử kit).
 * Mực: engrave(…, C.sumi, { spark: false, shadow: false }).
 */
export function exam(g, x, y, w, h, k = 1, { head = '東京大学 入学試験　2003年　理系 第6問', content = null } = {}) {
  const box = { x, y, w, h, ix: x + 48, iy: y + 128, iw: w - 96 };
  if (k <= 0) return box;
  const e = outCubic(clamp(k)), dy = (1 - e) * (H - y + 60), rot = (1 - e) * 0.08 - 0.012;
  g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot); g.translate(-w / 2, -h / 2);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(14, 18, w, h);
  g.drawImage(PAPER, 0, 0, Math.min(w, PAPER.width), Math.min(h, PAPER.height), 0, 0, w, h);
  g.strokeStyle = C.shuInk; g.lineWidth = 3; g.strokeRect(18, 18, w - 36, h - 36); g.lineWidth = 1; g.strokeRect(26, 26, w - 52, h - 52);
  g.font = `500 26px ${JP}`; g.fillStyle = C.sumi; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.letterSpacing = '3px'; g.fillText(head, 48, 74); g.letterSpacing = '0px';
  g.strokeStyle = 'rgba(30,25,20,0.5)'; g.beginPath(); g.moveTo(48, 92.5); g.lineTo(w - 48, 92.5); g.stroke();
  if (content) { g.translate(-x, -y); content(box); }
  g.restore();
  return box;
}
/**
 * Tấm 算額 (b4, mượn hướng 算額): bảng gỗ hinoki, khung sơn mài đen + chỉ son + 金具 bốn góc, treo bằng dây.
 * title = cột dọc 縦書き mép phải. k: hạ xuống từ trên. Trả về vùng viết { x0, y0, x1, y1 } (chữ mực C.sumi / son C.shuInk);
 * chữ trên bảng vẽ trong content(R) để đi cùng tấm bảng lúc hạ xuống.
 */
export function sangaku(g, x, y, w, h, k = 1, { title = '', content = null } = {}) {
  const FR = 26, tcol = title ? 96 : 0, inner = { x0: x + FR + 30, y0: y + FR + 30, x1: x + w - FR - 30 - tcol, y1: y + h - FR - 30 };
  if (k <= 0) return inner;
  const dy = -(1 - outCubic(clamp(k))) * (y + h + 80);
  g.save(); g.translate(0, dy);
  g.strokeStyle = 'rgba(160,120,70,0.8)'; g.lineWidth = 2;                         // dây treo
  g.beginPath(); g.moveTo(x + w * 0.25, y); g.lineTo(x + w / 2, y - 120); g.lineTo(x + w * 0.75, y); g.stroke();
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(x + 16, y + 20, w, h);
  g.drawImage(WOOD, 0, 0, Math.min(w, WOOD.width), Math.min(h, WOOD.height), x, y, w, h);
  const lac = (x0, y0, x1, y1) => { const gr = g.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, '#2A2522'); gr.addColorStop(0.2, '#0A0807'); gr.addColorStop(1, '#050404'); return gr; };
  g.fillStyle = lac(0, y, 0, y + FR); g.fillRect(x, y, w, FR); g.fillStyle = lac(0, y + h, 0, y + h - FR); g.fillRect(x, y + h - FR, w, FR);
  g.fillStyle = lac(x, 0, x + FR, 0); g.fillRect(x, y + FR, FR, h - 2 * FR); g.fillStyle = lac(x + w, 0, x + w - FR, 0); g.fillRect(x + w - FR, y + FR, FR, h - 2 * FR);
  g.strokeStyle = '#9E2B1B'; g.lineWidth = 2.5; g.strokeRect(x + FR - 1, y + FR - 1, w - 2 * FR + 2, h - 2 * FR + 2);
  g.fillStyle = 'rgba(40,22,8,0.35)'; g.fillRect(x + FR, y + FR, w - 2 * FR, 16);   // bóng khung trên
  [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(([cx, cy, sx, sy], q) => {
    g.save(); g.translate(cx, cy); g.scale(sx, sy);
    const L = 74, T = FR + 4, gr = g.createLinearGradient(0, 0, L * sx, L * sy);
    gr.addColorStop(0, q === 0 ? '#F4E2A6' : '#E2C77E'); gr.addColorStop(0.5, '#B98F3A'); gr.addColorStop(1, '#7C5A1E');
    g.beginPath(); g.moveTo(0, 0); g.lineTo(L, 0); g.lineTo(L, T * 0.62); g.lineTo(L - 12, T); g.lineTo(T, T); g.lineTo(T, L - 12); g.lineTo(T * 0.62, L); g.lineTo(0, L); g.closePath();
    g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(70,46,12,0.75)'; g.lineWidth = 1; g.stroke();
    g.fillStyle = '#FFF0C0'; g.beginPath(); g.arc(15, 14, 3.5, 0, TAU); g.fill();
    g.restore();
  });
  if (title) {                                           // 縦書き tiêu đề mép phải + vạch mực ngăn
    const tx = x + w - FR - 30 - tcol / 2, size = 40;
    g.strokeStyle = 'rgba(30,25,20,0.45)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + w - FR - 30 - tcol + 0.5, y + FR + 30); g.lineTo(x + w - FR - 30 - tcol + 0.5, y + h - FR - 30); g.stroke();
    g.font = `700 ${size}px ${MIN}`; g.fillStyle = C.sumi; g.textAlign = 'center'; g.textBaseline = 'middle';
    [...title].forEach((c, i) => g.fillText(c, tx, y + FR + 40 + size / 2 + i * size * 1.12));
  }
  if (content) content(inner);
  g.restore();
  return inner;
}

// ── ảnh lịch sử trong khung đồng (DNA §8) — đơn sắc chàm → ngà, xử lý một lần lúc nạp ──
const IM = {}, PH = {};
function toneImage(src) {
  const hmax = 900, s = Math.min(1, hmax / src.height), w = Math.round(src.width * s), h = Math.round(src.height * s);
  const c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98)), A = [10, 16, 40], B = [239, 231, 210];
  for (let i = 0; i < n; i++) { const v = smooth(clamp((L[i] - lo) / (hi - lo))); for (let j = 0; j < 3; j++) d.data[i * 4 + j] = A[j] + (B[j] - A[j]) * v; }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Ảnh / hiện vật trong khung đồng thau, cao h; k: trượt lên + khắc nhãn. label = { name, life, note } — note BẮT BUỘC
 * cho chân dung tưởng tượng (「想像図」/「後世の像」). Trả về { w, h }.
 */
export function plate(g, key, x, y, h, k = 1, { label = null } = {}) {
  const im = PH[key]; if (!im) throw new Error(`plate: chưa nạp ảnh "${key}" (static IMAGES)`);
  const w = im.width * h / im.height;
  if (k <= 0) return { w, h };
  const dy = (1 - outCubic(clamp(k / 0.6))) * 240, F = 12;
  g.save(); g.translate(x, y + dy);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(-F + 12, -F + 16, w + 2 * F, h + 2 * F);
  const gr = g.createLinearGradient(-F, -F, w + F, h + F); gr.addColorStop(0, '#F3DFA2'); gr.addColorStop(0.35, '#B48A40'); gr.addColorStop(0.6, '#E6C77C'); gr.addColorStop(1, '#6E5224');
  g.fillStyle = gr; g.fillRect(-F, -F, w + 2 * F, h + 2 * F);
  g.strokeStyle = 'rgba(42,28,8,0.9)'; g.lineWidth = 1.5; g.strokeRect(-2, -2, w + 4, h + 4);
  g.drawImage(im, 0, 0, w, h); g.restore();
  if (label) {
    const kl = clamp((k - 0.45) / 0.55);
    if (label.name) engrave(g, label.name, x, y + h + 62, clamp(kl * 1.6), `700 32px ${MIN}`, C.ivory, { ls: 2 });
    if (label.life) engrave(g, label.life, x, y + h + 98, clamp(kl * 2 - 0.4), `500 26px ${MONO}`, C.dim, { spark: false });
    if (label.note) engrave(g, label.note, x, y + h + 136, clamp(kl * 2 - 0.7), `500 26px ${JP}`, C.dim, { spark: false, ls: 2 });
  }
  return { w, h };
}
/**
 * Thẻ HỒI giữa khung trong khoảng lặng mở hồi (FROM = START − 2.6): 「第n幕」 khắc đồng + tiêu đề 明朝 lớn + thước,
 * từ start−2.3; trượt lên ra khỏi khung quanh start. Tiếng: sfx của cảnh đặt hyoshigi ở start − 2.3.
 */
export function actCard(g, t, start, act, title) {
  const out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  g.save(); g.translate(0, -out * 760);
  engrave(g, act, W / 2, 430, prog(t, start - 2.3, start - 1.95), `500 30px ${JP}`, C.brass, { align: 'center', ls: 14, spark: false });
  const r = engrave(g, title, W / 2, 560, prog(t, start - 1.9, start - 0.9), `700 88px ${MIN}`, C.ivory, { align: 'center', ls: 6 });
  rule(g, r.x0, r.x0 + r.w, 610, prog(t, start - 1.2, start - 0.6));
  g.restore();
}

// ═════════════════════════ nhân vật ═════════════════════════
// crop = phần trên của ảnh được giữ (assets/character-v2/crop.js): toàn thân 0.45, khung giữa đùi 1.
// MIỆNG NÓI (docs/character/CHARACTER-V2.md § Miệng nói): truyền { t } = giờ timeline → miệng mở theo lời đọc khi đã đứng hẳn (k ≥ 0.95).
// Trang gọi setTalk(data/<part>.mouth.json); chưa có tệp → mascot im. Tư thế chưa đo trong mouths.js → ném lỗi.
const SIL = {}, TINT = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
function prepPose(key) {                               // một lần lúc nạp: ám lạnh dưới trời chàm + bóng mờ (filter chỉ ở đây)
  const im = IM[key];
  const t = mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop';
  tx.fillStyle = 'rgba(40,60,130,0.10)'; tx.fillRect(0, 0, im.width, im.height); TINT[key] = t;
  const s = mk(im.width, im.height), sx = s.getContext('2d'); sx.filter = 'blur(12px)'; sx.drawImage(im, 0, 0); sx.filter = 'none';
  sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#000000'; sx.fillRect(0, 0, im.width, im.height); SIL[key] = s;
}
/** Mascot: cx tâm ảnh, foot đáy (chân / mép cắt), h chiều cao hiển thị; k = trồi lên + bật (không fade). Trả về hộp. */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return null;
  const key = 'pose-' + pose, im = TINT[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.35; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 16, y0 + 12, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h };
}

// ═════════════════════════ nạp ═════════════════════════
export async function loadKit(images) {
  BASE = { tenkyu: makeBase(false), sangaku: makeBase(true) };
  STARS = makeStars(); TRAILS = makeTrails(); VIG = makeVignette(); PAPER = makePaper(); WOOD = makeWood();
  await loadImages(images, IM);
  for (const key of Object.keys(images)) key.startsWith('pose-') ? prepPose(key) : (PH[key] = toneImage(IM[key]));
}
