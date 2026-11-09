// Đồ nghề chung của ja/gacha — DNA「カプセル (ガシャポン)」(projects/ja/gacha/DNA.md): một buổi chụp ảnh sản phẩm sáng,
// studio trắng ấm, nhựa matte pastel; vật xuyên suốt = VIÊN NANG (1 lượt quay = 1 viên). Máy slot sơn mài đỏ-đen là vật
// TỐI duy nhất (ERA 'casino'). Bàn thử gốc: tools/lab/capsule.html (khung 0 = cold open, khung 1 = 「74回目から」).
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm THUẦN của tham số (tất định; ngẫu nhiên = hash). Kết cấu (studio, casino, nhiễu matte, ánh đèn),
// bóng mascot sinh MỘT lần trong loadKit; sprite viên nang (lưới, phân bố) sinh lần đầu dùng rồi giữ — cùng tham số, cùng
// pixel. Không ctx.filter khi vẽ khung (chỉ lúc nạp). k ∈ [0, 1] là tiến độ hiện ra; mọi hàm có k đã thử ở 0.25/0.5/0.75/1
// trên kit-test.html (LESSONS §89).
//
// LUẬT KIT GIỮ BẰNG CODE (LESSONS §95):
//  • Mọi hàm chữ (write, telop, card, wrong, heading, actCard, stamp, nhãn đồ thị / thẻ ảnh / sao kê) ném lỗi khi chữ Nhật
//    (Shippori / Noto Sans JP) < 28 px. Số (chuỗi chỉ gồm số/dấu) < 30 px cũng ném (DNA §3).
//  • Màu NGHĨA không xuất ra C (DNA §2): trời (bình thường / 0.6%), san hô (đang TĂNG), vàng (★5 / TRÚNG), bạc hà (sau 天井),
//    đá lam (tiền trong game), son sơn mài (CASINO / 賭博 / cấm), xám tem (sai). Chỉ qua token '@sky' '@coral' '@gold'
//    '@mint' '@gem' '@lac' '@wrong' (ink / tone) hoặc hàm có tên (normal, rising, win, sure, money, casino, wrong, strike,
//    stamp). Truyền hex của màu nghĩa vào ink() → ném. Đỏ KHÔNG BAO GIỜ cho "sai".
//  • Mọi số mô hình (p(n), PMF, cum, trung vị, trung bình, 200 người) tính bằng code và kiểm bằng must với CONTENT.md.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages, must } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';
const TAU = 2 * Math.PI;
export { TAU };

// ═════════════════════════ bảng màu (DNA §2) ═════════════════════════
/** Màu TRUNG TÍNH — dùng tự do. */
export const C = {
  ink: '#2B2A33', mute: '#5C5648', white: '#FFFFFF', paper: '#FFFCF6', paper2: '#F3EBDF', line: 'rgba(92,86,72,0.45)',
  faint: 'rgba(92,86,72,0.16)', cream: '#FFF4E6', creamDim: '#E9CDB4', shadow: 'rgba(70,50,40,0.20)',
};
// màu nghĩa — KHÔNG export (chỉ qua token / hàm có tên)
const SKY = { lt: '#F2FAFF', fill: '#9FCDF2', bar: '#8FC3EC', dk: '#5C97CF', ink: '#2F6FA3', dark: '#A9D6F7', pale: '#E3F1FC' };
const CORAL = { a: '#F6A9C4', b: '#E8566E', ink: '#B8284F', dark: '#FF9AB3', pale: '#FFE1E8' };
const GOLD = { lt: '#FFF1B0', mid: '#E8B63A', dk: '#9A6A12', ink: '#7A4F00', dark: '#F7D774', pale: '#FFF1BA', glow: 'rgba(232,182,58,0.9)' };
const MINT = { lt: '#EAFCF3', fill: '#9BE0C2', dk: '#55AE8D', ink: '#1C6E4F', dark: '#A8EBCD', pale: '#DDF6EA' };
const GEM = { lt: '#C8F3FF', fill: '#5CC8E6', dk: '#2A8FB8', ink: '#1E5E7C', dark: '#8FDDF2' };
const LAC = { a: '#B3121F', b: '#4A060C', blk: '#120708', ink: '#B3121F', dark: '#FF7A7A', gold: '#E8B63A', goldLt: '#F7D774' };
const GREY = { line: '#8F8A80', ink: '#6B665D', dark: '#B5AFA4' };
export const MIN = '"Shippori Mincho"', JP = '"Noto Sans JP"', CG = '"Cormorant Garamond"';
/** Mọi mặt chữ kit và cảnh dùng — trang nạp đủ bằng Promise.all trước init (LESSONS §16, đua font). */
export const FONTS = [`700 40px ${MIN}`, `400 40px ${MIN}`, `400 40px ${JP}`, `500 40px ${JP}`, `600 40px ${JP}`, `700 40px ${JP}`,
  `900 40px ${JP}`, `500 40px ${CG}`, `700 40px ${CG}`];
export const FONT_SAMPLE = '★☆％%＝？！「」『』・〜…—→天井賭博違法禁止確定回目当たる確率最高レア中央値平均人万円石ガチャスロットカジノ' +
  '明細合計第一二三四五六七幕結論出典写真図残り時間待つ0123456789.,+−×÷¥①②③JACKPOTBARスタート回す' +
  'ベルギーオランダ日本パチンコ報告書調査ガイドライン国民生活センター原神創世結晶祈願';

// tương phản đo bằng số (ném lỗi < 4.5): nền sáng đo ở chỗ tối nhất chữ hay đặt (#F3EBDF), nền casino ở chỗ sáng nhất (#5A0A12)
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const needC = (a, b, what, k = 4.5) => { const c = contrast(a, b); if (c < k) throw new Error(`kit: tương phản ${what} ${c.toFixed(2)} < ${k}`); };
const LITE = C.paper2, CAS = '#5A0A12';
[[C.ink, 'mực'], [C.mute, 'phụ'], [SKY.ink, 'trời'], [CORAL.ink, 'san hô'], [GOLD.ink, 'vàng'], [MINT.ink, 'bạc hà'], [GEM.ink, 'đá lam'],
  [LAC.ink, 'son'], [GREY.ink, 'xám']].forEach(([c, n]) => { needC(c, LITE, `${n}/nền sáng`); needC(c, C.white, `${n}/thẻ trắng`); });
[[C.cream, 'kem'], [C.creamDim, 'kem phụ'], [GOLD.dark, 'vàng'], [LAC.dark, 'son'], [GREY.dark, 'xám'], [SKY.dark, 'trời'], [MINT.dark, 'bạc hà'],
  [CORAL.dark, 'san hô'], [GEM.dark, 'đá lam']].forEach(([c, n]) => needC(c, CAS, `${n}/casino`));
needC(GOLD.ink, GOLD.pale, 'vàng/nhãn vàng'); needC(CORAL.ink, CORAL.pale, 'san hô/nhãn hồng'); needC(MINT.ink, MINT.pale, 'bạc hà/nhãn');

const MEANING = new Set([SKY, CORAL, GOLD, MINT, GEM, LAC, GREY].flatMap(o => Object.values(o)).map(s => s.toUpperCase()));
/**
 * Màu chữ theo nền: on 'light' (studio, thẻ trắng) | 'dark' (casino). Token: '@ink' (mặc định), '@dim', '@sky' (bình thường /
 * 0.6%), '@coral' (đang TĂNG), '@gold' (★5 / TRÚNG), '@mint' (sau 天井), '@gem' (tiền trong game), '@lac' (casino / 賭博),
 * '@wrong' (sai — xám). Màu trung tính của C dùng thẳng; hex màu nghĩa → ném.
 */
export function ink(col, on = 'light') {
  const d = on === 'dark';
  if (col == null || col === '@ink') return d ? C.cream : C.ink;
  if (col === '@dim') return d ? C.creamDim : C.mute;
  const T = { '@sky': SKY, '@coral': CORAL, '@gold': GOLD, '@mint': MINT, '@gem': GEM, '@lac': LAC, '@wrong': GREY }[col];
  if (T) return d ? T.dark : T.ink;
  if (typeof col === 'string' && MEANING.has(col.toUpperCase())) throw new Error(`kit: màu nghĩa ${col} chỉ qua token (@sky @coral @gold @mint @gem @lac @wrong)`);
  return col;
}
/** Bộ màu tô (gradient) của một nghĩa cho hình cảnh tự vẽ: tone('@gold') → { lt, mid, dk }. */
export function tone(tok) {
  const m = { '@sky': [SKY.lt, SKY.fill, SKY.dk], '@coral': [CORAL.pale, CORAL.a, CORAL.b], '@gold': [GOLD.lt, GOLD.mid, GOLD.dk],
    '@mint': [MINT.lt, MINT.fill, MINT.dk], '@gem': [GEM.lt, GEM.fill, GEM.dk], '@lac': ['#D8333F', LAC.a, LAC.b], '@wrong': ['#D6D2CA', GREY.line, GREY.ink] }[tok];
  if (!m) throw new Error(`tone: token lạ "${tok}"`);
  return { lt: m[0], mid: m[1], dk: m[2] };
}
const hx = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const lerpC = (a, b, t) => { const A = hx(a), B = hx(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; };
const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export { rr };

// ═════════════════════════ mô hình 天井 (CONTENT.md: mô hình cộng đồng, KHÔNG phải số chính thức) ═════════════════════════
export const P = 0.006, SOFT = 74, STEP = 0.06, HARD = 90, CRYSTAL = 160;
/** Xác suất ★5 ở lượt thứ n (chưa trúng trước đó): ≤ 73 → 0.6%; từ 74 cộng 6% mỗi lượt; 90 = 100%. */
export const p = n => { if (!(n >= 1 && n <= HARD) || n !== Math.floor(n)) throw new Error(`p(n): n = ${n} ngoài 1…90`); return n < SOFT ? P : Math.min(1, P + STEP * (n - SOFT + 1)); };
/** PMF[n − 1] = xác suất lần trúng ĐẦU TIÊN là lượt n. */
export const PMF = (() => { let S = 1; const a = []; for (let n = 1; n <= HARD; n++) { a.push(S * p(n)); S *= 1 - p(n); } return a; })();
/** Xác suất trúng lần đầu trong khoảng lượt [a, b]. */
export const cum = (a, b) => { if (b < a) throw new Error(`cum: b < a (${a}, ${b})`); return PMF.slice(a - 1, b).reduce((s, v) => s + v, 0); };
export const MEDIAN = (() => { let c = 0; for (let n = 1; n <= HARD; n++) { c += PMF[n - 1]; if (c >= 0.5) return n; } })();
export const MEAN = PMF.reduce((s, v, i) => s + v * (i + 1), 0);
/** Xác suất ít nhất một ★5 trong n lượt KHÔNG có 天井 (0.6% cố định). */
export const atLeastOne = n => 1 - (1 - P) ** n;
/** N người: số người trúng lần đầu ở mỗi lượt 1…90, làm tròn phần dư lớn nhất (tổng đúng N; hoà → lượt nhỏ trước). */
export function firstHits(N = 200) {
  const f = PMF.map(v => v * N), fl = f.map(Math.floor); const r = N - fl.reduce((a, b) => a + b, 0);
  f.map((v, i) => [v - fl[i], i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]).slice(0, r).forEach(([, i]) => fl[i]++);
  must(`${fl.reduce((a, b) => a + b, 0)}`, N); return fl;
}
{ // kiểm mô hình với CONTENT.md
  const r3 = v => Math.round(v * 1000) / 1000, r1 = v => Math.round(v * 10) / 10;
  must(`${r1(p(SOFT) * 100)}`, 6.6); must(`${r1(p(89) * 100)}`, 96.6); must(`${p(90)}`, 1); must(`${p(73)}`, 0.006);
  must(`${r3(cum(1, 73))}`, 0.356); must(`${r3(cum(74, 80))}`, 0.563); must(`${Math.round(cum(1, 90) * 1e9)}`, 1e9);
  must(`${MEDIAN}`, 76); must(`${r1(MEAN)}`, 62.3); must(`${Math.round(100 / MEAN * 100) / 100}`, 1.61);
  must(`${Math.round(atLeastOne(10) * 10000) / 100}`, 5.84); must(`${Math.round(atLeastOne(50) * 10000) / 100}`, 25.99);
  must(`${Math.round((1 - atLeastOne(100)) * 10000) / 100}`, 54.78); must(`${atLeastOne(115) < 0.5 && atLeastOne(116) > 0.5}`, true);
  must('1000 * 0.006', 6); must(`${HARD} * ${CRYSTAL}`, 14400);
  const F = firstHits(200), n73 = F.slice(0, 73).reduce((a, b) => a + b, 0), n7480 = F.slice(73, 80).reduce((a, b) => a + b, 0);
  must(`Math.abs(${n73} / 200 - ${cum(1, 73)}) <= 0.01 && Math.abs(${n7480} / 200 - ${cum(74, 80)}) <= 0.01`, true);   // chấm khớp nhãn 36% / 56% (±1 điểm, lab)
}
/** 1234567 → "1,234,567". */
export const comma = n => { const [i, d] = String(n).split('.'); return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : ''); };
/** Bảng hồi (SCRIPT.md) — heading / actCard đọc ở đây. */
export const ACTS = [['第一幕', '0.6%の本当の意味'], ['第二幕', '確率表の裏側'], ['第三幕', 'ループ'], ['第四幕', 'スロットの隣に置くと'],
  ['第五幕', '代償'], ['第六幕', '誰が、誰のために'], ['第七幕', 'まとめ']];

// ═════════════════════════ chất liệu nạp sẵn: studio + casino ═════════════════════════
let STUDIO, STUDIO_NF, CASINO, LIGHT, GROUND_ON = true;
function noiseTex(alpha = 7) { const c = mk(256, 256), x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < 65536; i++) { const v = hash(i * 1.37 + 3) > 0.5 ? 255 : 0; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = alpha; } x.putImageData(d, 0, 0); return c; }
function makeStudio(floor) {                          // lab studio(): trắng ấm, hai đèn pastel, sàn cyc, nhiễu matte, viền tối nhẹ
  const c = mk(), x = c.getContext('2d'); let gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#FFFDF8'); gr.addColorStop(0.7, '#F8F1E6'); gr.addColorStop(1, '#EDE2D2'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
  [[300, 220, 760, 'rgba(255,200,222,0.30)'], [1640, 180, 700, 'rgba(176,214,255,0.30)'], [960, 700, 900, 'rgba(255,244,214,0.5)']].forEach(([cx, cy, r, col]) => {
    const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = rg; x.fillRect(0, 0, W, H); });
  if (floor) { gr = x.createLinearGradient(0, 830, 0, 960); gr.addColorStop(0, 'rgba(120,92,70,0)'); gr.addColorStop(1, 'rgba(120,92,70,0.10)'); x.fillStyle = gr; x.fillRect(0, 830, W, H - 830);
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(0, 905, W, 1.5); }
  x.fillStyle = x.createPattern(noiseTex(), 'repeat'); x.fillRect(0, 0, W, H);
  const v = x.createRadialGradient(W / 2, H / 2, 520, W / 2, H / 2, 1180); v.addColorStop(0, 'rgba(90,60,40,0)'); v.addColorStop(1, 'rgba(90,60,40,0.10)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  return c;
}
function makeLight() {                                // vệt đèn mềm trôi chậm theo t (sprite lớn hơn khung để dịch không hở mép)
  const c = mk(W + 400, H + 300), x = c.getContext('2d');
  [[560, 300, 620, 'rgba(255,236,214,0.55)'], [1700, 420, 560, 'rgba(214,232,255,0.35)']].forEach(([cx, cy, r, col]) => {
    const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = rg; x.fillRect(0, 0, c.width, c.height); });
  return c;
}
function makeCasino() {                               // sơn mài: đỏ sâu → đen, vệt bóng xiên, đốm đèn vàng mờ (bokeh vẽ bằng gradient, không filter)
  const c = mk(), x = c.getContext('2d');
  let gr = x.createRadialGradient(W * 0.5, H * 0.42, 60, W * 0.5, H * 0.5, 1250); gr.addColorStop(0, '#5A0A12'); gr.addColorStop(0.45, '#33050B'); gr.addColorStop(1, '#0B0405'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 46; i++) { const bx = hash(i * 3.3 + 1) * W, by = hash(i * 7.1 + 2) * H * 0.75, r = 18 + hash(i * 1.9) * 54, a = 0.05 + hash(i * 5.7) * 0.11;
    const rg = x.createRadialGradient(bx, by, 0, bx, by, r); rg.addColorStop(0, `rgba(255,206,120,${a})`); rg.addColorStop(0.7, `rgba(255,190,100,${a * 0.5})`); rg.addColorStop(1, 'rgba(255,190,100,0)'); x.fillStyle = rg; x.fillRect(bx - r, by - r, 2 * r, 2 * r); }
  x.save(); x.translate(W * 0.3, 0); x.rotate(0.35); gr = x.createLinearGradient(-160, 0, 160, 0); gr.addColorStop(0, 'rgba(255,170,160,0)'); gr.addColorStop(0.5, 'rgba(255,170,160,0.07)'); gr.addColorStop(1, 'rgba(255,170,160,0)'); x.fillStyle = gr; x.fillRect(-160, -200, 320, H * 1.6); x.restore();
  gr = x.createLinearGradient(0, 860, 0, H); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.35)'); x.fillStyle = gr; x.fillRect(0, 860, W, H - 860);
  x.fillStyle = 'rgba(232,182,58,0.22)'; x.fillRect(0, 905, W, 1.5);
  x.fillStyle = x.createPattern(noiseTex(10), 'repeat'); x.fillRect(0, 0, W, H);
  return c;
}
/** Trang tắt nền khi vẽ cảnh vào bộ đệm trong suốt (chuyển khay xoay — DNA §7). */
export function setGround(on) { GROUND_ON = on; }
/** Nền: era 'studio' (trắng ấm, đèn mềm trôi) | 'casino' (sơn mài đỏ-đen). floor: vạch sàn cyc (studio). */
export function ground(g, t = 0, { era = 'studio', floor = true } = {}) {
  if (!GROUND_ON) return;
  if (era === 'casino') { g.drawImage(CASINO, 0, 0); return; }
  if (era !== 'studio') throw new Error(`ground: era lạ "${era}"`);
  g.drawImage(floor ? STUDIO : STUDIO_NF, 0, 0);
  g.save(); g.globalAlpha = 0.6; g.drawImage(LIGHT, Math.round(-200 + Math.sin(t * 0.05) * 90), Math.round(-150 + Math.cos(t * 0.037) * 50)); g.restore();
}
/** Tối dần về đen (on 1 = sáng, 0 = đen kín) — cuối p1 → intro; đầu p2 ← intro (DNA §6). */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(0,0,0,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }
/** Camera đẩy chậm quanh (fx, fy) — ≤ 1.4×, không xoay. Gọi trong g.save()/restore() của cảnh. */
export function push(g, z, fx = W / 2, fy = H / 2) {
  if (z > 1.4 + 1e-9) throw new Error(`push ${z} > 1.4`);
  g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
}
/** ERA = khoá static ERA của cảnh. Đổi ERA = vòng loang (trang); cùng ERA = khay xoay. */
export const ERA = { studio: { bg: C.paper, ink: C.ink, dim: C.mute, on: 'light' }, casino: { bg: LAC.blk, ink: C.cream, dim: C.creamDim, on: 'dark' } };

// ═════════════════════════ chữ ═════════════════════════
const JPF = /Shippori|Noto Sans JP/;
const pxOf = font => { const m = /(\d+(?:\.\d+)?)px/.exec(font); if (!m) throw new Error(`kit: font không có cỡ px: ${font}`); return +m[1]; };
/** Luật cỡ: chữ Nhật ≥ 28 px; chuỗi chỉ gồm số / dấu ≥ 30 px (DNA §3). */
export function guard(font, s) {
  const px = pxOf(font), num = /^[0-9.,%％+\-−×÷=～〜¥ ]+$/.test(String(s).trim()) && /[0-9]/.test(s);
  if (num && px < 30) throw new Error(`kit: số ${px} px < 30 px: "${s}" (${font}) — DNA §3`);
  if (JPF.test(font) && px < 28) throw new Error(`kit: chữ Nhật ${px} px < 28 px: "${s}" (${font}) — LESSONS §95`);
}
export function measure(g, s, font, ls = 0) { g.save(); g.font = font; g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; g.restore(); return w; }
const norm = (parts, font, color) => (typeof parts === 'string' ? [[parts]] : parts).map(q => {
  const [s, f = font, c = color, o = {}] = typeof q === 'string' ? [q] : q; return { s: String(s), f, c, rise: o.rise ?? 0, gap: o.gap ?? 0 };
});
/**
 * Chữ hiện từng ký tự theo k (ký tự đang hiện lộ dần từ trái). parts: chuỗi | [[chuỗi, font?, màu?, { rise, gap }?], …].
 * Màu: token (@ink @dim @sky @coral @gold @mint @gem @lac @wrong) hoặc màu trung tính. on: 'light' | 'dark'.
 * Trả về { x0, w, size }.
 */
export function write(g, parts, x, y, k = 1, { font = `700 44px ${MIN}`, color = '@ink', on = 'light', align = 'left', ls = 0, glow = null } = {}) {
  const Q = norm(parts, font, color);
  for (const q of Q) guard(q.f, q.s);
  const ws = Q.map(q => measure(g, q.s, q.f, ls)), tot = ws.reduce((a, w, i) => a + w + Q[i].gap, 0);
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const size = Math.max(...Q.map(q => pxOf(q.f)));
  const N = Q.reduce((a, q) => a + [...q.s].length, 0), m = N * clamp(k), full = Math.floor(m), frac = m - full;
  if (m <= 0) return { x0, w: tot, size };
  let left = full, cx = x0;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  if (glow) { g.shadowColor = glow; g.shadowBlur = 16; }
  for (let i = 0; i < Q.length; i++) {
    const q = Q[i], ch = [...q.s], take = Math.min(left, ch.length), yy = y - q.rise;
    g.font = q.f; g.fillStyle = ink(q.c, on);
    if (take > 0) g.fillText(ch.slice(0, take).join(''), cx, yy);
    if (take < ch.length && left === take && frac > 0) {
      const xa = cx + g.measureText(ch.slice(0, take).join('')).width, wc = g.measureText(ch[take]).width, fs = pxOf(q.f);
      g.save(); g.beginPath(); g.rect(xa - 2, yy - fs * 1.2, (wc + 2) * smooth(frac), fs * 1.6); g.clip(); g.fillText(ch[take], xa, yy); g.restore();
      left = 0; break;
    }
    left -= take; cx += ws[i] + q.gap;
    if (left <= 0) break;
  }
  g.restore();
  return { x0, w: tot, size };
}
const softShadow = (g, fn, { blur = 22, oy = 8, col = C.shadow } = {}) => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
/**
 * テロップ: thẻ trắng bo tròn (viên thuốc) đổ bóng mềm, Shippori 700 (DNA §3). parts như write; tone = màu cả dòng.
 * align: tâm (x) theo 'center' | 'left' | 'right'. k: thẻ nở (0–0.35) rồi chữ hiện. Trả về hộp { x, y, w, h }.
 */
export function telop(g, parts, x, y, k = 1, { size = 50, font = `700 ${size}px ${MIN}`, align = 'center', tone: tc = '@ink', pad = 44, on = 'light' } = {}) {
  const Q = norm(parts, font, tc), tw = Q.reduce((a, q) => a + measure(g, q.s, q.f) + q.gap, 0), fs = Math.max(...Q.map(q => pxOf(q.f)));
  const w = tw + 2 * pad, h = fs * 1.75, bx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x, by = y - h / 2;
  const box = { x: bx, y: by, w, h };
  if (k <= 0) { for (const q of Q) guard(q.f, q.s); return box; }
  const e = outBack(clamp(k / 0.35)), s = 0.6 + 0.4 * e;
  g.save(); g.translate(bx + w / 2, y); g.scale(s, s); g.translate(-(bx + w / 2), -y);
  softShadow(g, () => { g.fillStyle = on === 'dark' ? 'rgba(255,248,236,0.96)' : C.white; g.fill(rr(bx, by, w, h, h / 2)); });
  g.restore();
  write(g, Q.map(q => [q.s, q.f, q.c, { rise: q.rise, gap: q.gap }]), bx + pad, y + fs * 0.36, clamp((k - 0.25) / 0.6), { on: 'light' });
  return box;
}
/**
 * Thẻ nhiều dòng (tiêu đề, まとめ, trích dẫn): thẻ trắng bo 28 px, mỗi dòng parts riêng. lines: [parts, …].
 * (x, y) = góc trên-trái (align 'left') hoặc tâm trên (align 'center'). Dòng hiện lần lượt theo k. Trả về hộp.
 */
export function card(g, lines, x, y, k = 1, { size = 48, font = `700 ${size}px ${MIN}`, align = 'left', tone: tc = '@ink', pad = 40, lead = 1.5, w = null } = {}) {
  const L = lines.map(l => norm(l, font, tc)), lh = size * lead;
  const tw = Math.max(...L.map(Q => Q.reduce((a, q) => a + measure(g, q.s, q.f) + q.gap, 0)));
  const bw = w ?? tw + 2 * pad, bh = L.length * lh + pad * 1.4 - (lh - size), bx = align === 'center' ? x - bw / 2 : x;
  const box = { x: bx, y, w: bw, h: bh };
  L.forEach(Q => Q.forEach(q => guard(q.f, q.s)));
  if (k <= 0) return box;
  const e = outCubic(clamp(k / 0.3)), dy = Math.round((1 - e) * 40);
  g.save(); g.translate(0, dy);
  softShadow(g, () => { g.fillStyle = C.white; g.fill(rr(bx, y, bw, bh, 28)); });
  g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(bx + 0.75, y + 0.75, bw - 1.5, bh - 1.5, 27));
  L.forEach((Q, i) => {
    const kl = clamp((k - 0.2) * L.length / 0.8 - i);
    const lx = align === 'center' ? bx + bw / 2 : bx + pad;
    write(g, Q.map(q => [q.s, q.f, q.c, { rise: q.rise, gap: q.gap }]), lx, y + pad * 0.7 + size + i * lh - size * 0.12, kl, { align });
  });
  g.restore();
  return box;
}
/** Chữ nghĩa có tên (không thẻ): normal 0.6% (trời) · rising 74+ (san hô) · win ★5 (vàng) · sure sau 天井 (bạc hà) · money 石 (đá lam) · casino 賭博 (son). */
const tok = c => (g, parts, x, y, k = 1, o = {}) => write(g, parts, x, y, k, { ...o, color: c });
export const normal = tok('@sky'), rising = tok('@coral'), win = tok('@gold'), sure = tok('@mint'), money = tok('@gem'), casino = tok('@lac');

// ═════════════════════════ sai / gạch / dấu ═════════════════════════
/** Gạch hiểu lầm — xám tem (KHÔNG đỏ): vạch dần từ trái, hơi rung tay. */
export function strike(g, x0, y0, x1, y1, k = 1, { w = 6, on = 'light' } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = x0 + (x1 - x0) * e, ye = y0 + (y1 - y0) * e;
  g.save(); g.lineCap = 'round'; g.strokeStyle = on === 'dark' ? GREY.dark : GREY.line; g.lineWidth = w;
  g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + xe) / 2, (y0 + ye) / 2 - 3, xe, ye); g.stroke(); g.restore();
}
/**
 * Câu SAI in trên tem giấy (DNA §1): tem kem viền răng cưa, chữ xám. peel 0..1: vạch xám gạch qua (0–0.5) rồi tem bị bóc —
 * góc phải-dưới lật lên, tem nghiêng. Trả về hộp tem.
 */
export function wrong(g, parts, x, y, k = 1, { size = 44, font = `700 ${size}px ${MIN}`, align = 'center', peel = 0 } = {}) {
  const Q = norm(parts, font, '@wrong'), tw = Q.reduce((a, q) => a + measure(g, q.s, q.f), 0), pad = 34;
  const w = tw + 2 * pad, h = size * 1.9, bx = align === 'center' ? x - w / 2 : x, by = y - h / 2;
  Q.forEach(q => guard(q.f, q.s));
  if (k <= 0) return { x: bx, y: by, w, h };
  const pe = clamp((peel - 0.5) / 0.5), lift = outCubic(pe);
  g.save(); g.translate(bx + w / 2, y); g.rotate(-0.02 + lift * 0.12); g.translate(0, lift * 18); g.translate(-(bx + w / 2), -y);
  const fold = Math.min(w, h) * 0.55 * lift;
  const body = new Path2D(); body.moveTo(bx, by); body.lineTo(bx + w, by); body.lineTo(bx + w, by + h - fold); body.lineTo(bx + w - fold, by + h); body.lineTo(bx, by + h); body.closePath();
  softShadow(g, () => { g.fillStyle = '#FBF6EA'; g.fill(body); }, { blur: 14 + lift * 16, oy: 5 + lift * 10 });
  g.save(); g.clip(body); g.strokeStyle = 'rgba(143,138,128,0.5)'; g.setLineDash([5, 6]); g.lineWidth = 2; g.strokeRect(bx + 8, by + 8, w - 16, h - 16); g.setLineDash([]); g.restore();
  if (fold > 1) { g.fillStyle = '#E4DDCF'; g.beginPath(); g.moveTo(bx + w, by + h - fold); g.lineTo(bx + w - fold, by + h); g.lineTo(bx + w - fold * 0.92, by + h - fold * 0.92); g.closePath(); g.fill(); }
  write(g, Q.map(q => [q.s, q.f, q.c]), bx + pad, y + size * 0.36, clamp(k / 0.7));
  strike(g, bx + 18, y + 2, bx + w - 18, y - 4, clamp(peel / 0.5));
  g.restore();
  return { x: bx, y: by, w, h };
}
const STAMP_SPR = new Map();
const STAMPS = { '賭博': 'lac', '違法': 'lac', '禁止': 'lac', '天井': 'mint', '確定': 'mint' };
/**
 * 判子: '賭博' / '違法' / '禁止' = son sơn mài (CHỈ cho casino / luật cấm); '天井' / '確定' = bạc hà. Chữ khác → ném.
 * k: rơi từ to (0–0.45) rồi nằm yên. Khung tròn bo, chữ Shippori trắng, mép ăn mòn tất định.
 */
export function stamp(g, s, x, y, k = 1, { size = 64, rot = -0.08 } = {}) {
  const kind = STAMPS[s]; if (!kind) throw new Error(`stamp: chữ "${s}" không có trong ${Object.keys(STAMPS).join(' ')}`);
  guard(`700 ${size}px ${MIN}`, s);
  if (k <= 0) return;
  const ch = [...s], w = size * 1.1 * ch.length + size * 0.55, h = size * 1.55;
  const e = clamp(k / 0.45), sc = 1 + (1 - outCubic(e)) * 0.7;
  const key = `${s}|${size}`; let spr = STAMP_SPR.get(key);
  if (!spr) {                                            // sprite (mép ăn mòn = destination-out CHỈ trên canvas riêng, không xoá khung)
    const pad = size * 0.2; spr = mk(w + 2 * pad, h + 2 * pad); const x = spr.getContext('2d', { willReadFrequently: true }); x.translate(spr.width / 2, spr.height / 2);
    const fill = kind === 'lac' ? LAC.a : MINT.ink;
    x.strokeStyle = fill; x.lineWidth = size * 0.09; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, size * 0.2); x.stroke();
    x.fillStyle = fill; x.beginPath(); x.roundRect(-w / 2 + size * 0.13, -h / 2 + size * 0.13, w - size * 0.26, h - size * 0.26, size * 0.12); x.fill();
    x.fillStyle = '#FFFFFF'; x.font = `700 ${size}px ${MIN}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = size * 0.1 + 'px';
    x.fillText(s, size * 0.05, size * 0.05);
    x.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 34; i++) { const u = hash(i * 7.3 + ch.length * 1.1), side = i % 4, r = 1 + 2.6 * hash(i * 3.1 + 2);
      const px = side < 2 ? -w / 2 + u * w : (side === 2 ? -w / 2 : w / 2), py = side < 2 ? (side === 0 ? -h / 2 : h / 2) : -h / 2 + u * h;
      x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); }
    STAMP_SPR.set(key, spr);
  }
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.globalAlpha = 0.25 + 0.75 * clamp(e * 2);
  g.drawImage(spr, -spr.width / 2, -spr.height / 2);
  g.restore();
}

// ═════════════════════════ hình nhỏ: sao, ánh, đá ═════════════════════════
const starPath = (cx, cy, R, r = R * 0.42, a0 = -Math.PI / 2) => { const q = new Path2D(); for (let i = 0; i < 10; i++) { const a = a0 + i * Math.PI / 5, rad = i % 2 ? r : R; i ? q.lineTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a)) : q.moveTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a)); } q.closePath(); return q; };
/** Ánh lóe 4 cánh (chỉ cho ★5 / TRÚNG). */
export function glint(g, cx, cy, R, a = 1) {
  if (a <= 0 || R <= 0) return;
  g.save(); g.globalAlpha = clamp(a); const q = new Path2D(); q.moveTo(cx, cy - R); q.quadraticCurveTo(cx, cy, cx + R, cy); q.quadraticCurveTo(cx, cy, cx, cy + R); q.quadraticCurveTo(cx, cy, cx - R, cy); q.quadraticCurveTo(cx, cy, cx, cy - R);
  g.fillStyle = '#FFFFFF'; g.shadowColor = 'rgba(255,220,120,0.9)'; g.shadowBlur = R * 0.8; g.fill(q); g.restore();
}
/** Sao ★ vàng (★5). */
export function goldStar(g, cx, cy, R, k = 1) {
  if (k <= 0) return; const s = outBack(clamp(k)) * R;
  g.save(); g.shadowColor = GOLD.glow; g.shadowBlur = R * 0.5; const gr = g.createLinearGradient(cx, cy - s, cx, cy + s); gr.addColorStop(0, GOLD.lt); gr.addColorStop(1, GOLD.mid); g.fillStyle = gr; g.fill(starPath(cx, cy, s)); g.restore();
}
/** Viên đá lam (tiền trong game, 石). */
export function gem(g, cx, cy, s, k = 1) {
  if (k <= 0) return; s *= outBack(clamp(k));
  g.save(); const q = new Path2D(); q.moveTo(cx - s, cy - s * 0.2); q.lineTo(cx - s * 0.5, cy - s * 0.8); q.lineTo(cx + s * 0.5, cy - s * 0.8); q.lineTo(cx + s, cy - s * 0.2); q.lineTo(cx, cy + s); q.closePath();
  const gr = g.createLinearGradient(cx - s, cy - s, cx + s, cy + s); gr.addColorStop(0, GEM.lt); gr.addColorStop(0.5, GEM.fill); gr.addColorStop(1, GEM.dk); g.fillStyle = gr; g.fill(q);
  g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = Math.max(1, s * 0.1); g.beginPath(); g.moveTo(cx - s, cy - s * 0.2); g.lineTo(cx + s, cy - s * 0.2); g.moveTo(cx - s * 0.5, cy - s * 0.8); g.lineTo(cx - s * 0.25, cy - s * 0.2); g.lineTo(cx, cy + s); g.moveTo(cx + s * 0.5, cy - s * 0.8); g.lineTo(cx + s * 0.25, cy - s * 0.2); g.lineTo(cx, cy + s); g.stroke(); g.restore();
}

// ═════════════════════════ VIÊN NANG ═════════════════════════
const SHELL = ['#FFFFFF', '#F6F2EC', '#D2CAC0'];
/** Tông viên nang (trang trí pastel). 'gold' = ★5 (dùng { gold: true }); 'blank' = trắng tay (xám ngọc mờ). */
const PAL = {
  sky: [[SKY.lt, SKY.fill, SKY.dk], SHELL], pink: [['#FFEEF4', '#F8A9C6', '#D9709A'], SHELL], mint: [[MINT.lt, MINT.fill, MINT.dk], SHELL],
  lemon: [['#FFFAE0', '#FFE08A', '#E5B53C'], SHELL], lav: [['#F4EEFF', '#C6B3F0', '#8F78CB'], SHELL],
  coral: [[CORAL.pale, CORAL.a, CORAL.b], SHELL], blank: [['#FBFAF7', '#E7E3DC', '#BDB6AB'], ['#FFFFFF', '#F2EFEA', '#CFC9C0']],
  goldS: [['#FFFBE0', '#FFE070', '#E0A820'], ['#FFF8D0', '#FFD24C', '#D09418']], gold: [['#FFF7C8', '#F0C444', GOLD.dk], ['#FFF3BE', GOLD.mid, '#8E5E0C']],
};
export const TONES = ['sky', 'pink', 'mint', 'lemon', 'lav'];
/** Tông cho lưới / đám đông có viên vàng: bỏ chanh (vàng nhạt lẫn với ★5). */
export const CROWD = ['sky', 'pink', 'mint', 'lav'];
function half(g, r, top, c, gold) {                 // một nửa vỏ trong hệ toạ độ viên (tâm 0,0), nửa trên (top) hoặc dưới
  g.save(); g.beginPath(); g.arc(0, 0, r, top ? Math.PI : 0, top ? TAU : Math.PI); g.closePath(); g.clip();
  const gr = g.createRadialGradient(-0.32 * r, top ? -0.42 * r : -0.1 * r, r * 0.05, 0, 0, r * 1.12); gr.addColorStop(0, c[0]); gr.addColorStop(0.5, c[1]); gr.addColorStop(1, c[2]);
  g.fillStyle = gr; g.fillRect(-r, -r, 2 * r, 2 * r);
  if (gold && g.createConicGradient) { const cg = g.createConicGradient(-0.9, 0, 0); cg.addColorStop(0, 'rgba(255,140,190,0.42)'); cg.addColorStop(0.25, 'rgba(255,236,140,0.12)'); cg.addColorStop(0.5, 'rgba(110,230,255,0.42)'); cg.addColorStop(0.75, 'rgba(255,236,140,0.12)'); cg.addColorStop(1, 'rgba(255,140,190,0.42)');
    g.fillStyle = cg; g.fillRect(-r, -r, 2 * r, 2 * r); }
  const ed = g.createRadialGradient(0, 0, r * 0.55, 0, 0, r); ed.addColorStop(0, 'rgba(60,30,60,0)'); ed.addColorStop(1, 'rgba(60,30,60,0.22)'); g.fillStyle = ed; g.fillRect(-r, -r, 2 * r, 2 * r);
  g.fillStyle = 'rgba(40,24,30,0.16)'; if (top) g.fillRect(-r, -r * 0.075, 2 * r, r * 0.04); else g.fillRect(-r, r * 0.04, 2 * r, r * 0.035);      // khe nối
  g.fillStyle = gold ? 'rgba(255,248,214,0.8)' : 'rgba(255,255,255,0.55)'; g.fillRect(-r, top ? -r * 0.04 : 0, 2 * r, r * 0.04);                   // vành nối
  g.restore();
}
function shine(g, r) {                               // ánh cầu + phản chiếu viền (theo khung nhìn, không theo xoay)
  g.save(); g.rotate(-0.75); const hg = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.3); hg.addColorStop(0, 'rgba(255,255,255,0.95)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
  g.translate(-0.4 * r, -0.44 * r); g.scale(1, 0.55); g.fillStyle = hg; g.beginPath(); g.arc(0, 0, r * 0.3, 0, TAU); g.fill(); g.restore();
  g.strokeStyle = 'rgba(255,255,255,0.32)'; g.lineWidth = Math.max(1, r * 0.06); g.beginPath(); g.arc(0, 0, r * 0.86, 0.12 * Math.PI, 0.55 * Math.PI); g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.9)'; g.beginPath(); g.arc(-0.12 * r, -0.62 * r, Math.max(0.8, r * 0.045), 0, TAU); g.fill();
}
function floorShadow(g, cx, cy, r, a = 0.26) {
  g.save(); g.translate(cx, cy); g.scale(1, 0.18); const sg = g.createRadialGradient(0, 0, 0, 0, 0, r * 1.05); sg.addColorStop(0, `rgba(80,56,40,${a})`); sg.addColorStop(1, 'rgba(80,56,40,0)'); g.fillStyle = sg; g.beginPath(); g.arc(0, 0, r * 1.05, 0, TAU); g.fill(); g.restore();
}
/**
 * Viên nang hai nửa (lab): tâm (x, y), bán kính r. k: nảy ra (outBack). Tuỳ chọn:
 *  tone (TONES / 'coral' / 'blank'), gold (★5: vàng + ánh cầu xoay — CHỈ cho trúng), rot (góc vạch nối),
 *  open 0..1 (nắp trên bật lên quanh bản lề trái; content(g, r) vẽ trong lòng khi mở — hệ toạ độ tâm viên, chưa xoay),
 *  shake 0..1 + t (lắc = 「待つ時間」), ground (bóng sàn), glow (hào quang vàng, chỉ khi gold).
 */
export function capsule(g, x, y, r, k = 1, { tone: tn = 'sky', gold = false, rot = -0.45, open = 0, shake = 0, t = 0, ground: gs = true, content = null, glow = 0 } = {}) {
  if (k <= 0 || r <= 0) return;
  const pal = PAL[gold ? (r < 22 ? 'goldS' : 'gold') : tn];                     // vàng nhỏ: tông sáng hơn (vàng đậm thành ô liu ở r nhỏ)
  if (!pal) throw new Error(`capsule: tone lạ "${tn}"`);
  if (tn === 'gold' || tn === 'goldS') throw new Error('capsule: vàng chỉ qua { gold: true } (★5)');
  const s = outBack(clamp(k)), R = r * s;
  const sh = shake > 0 ? shake : 0, sx = sh * r * 0.07 * Math.sin(t * 31), a = rot + sh * 0.24 * Math.sin(t * 38);
  if (gs) floorShadow(g, x, y + r * 1.0, r * (0.6 + 0.4 * s));
  g.save(); g.translate(x + sx, y);
  if (gold && glow > 0) { const hg = g.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 2.4); hg.addColorStop(0, `rgba(255,226,130,${0.55 * glow})`); hg.addColorStop(1, 'rgba(255,226,130,0)'); g.fillStyle = hg; g.fillRect(-R * 2.4, -R * 2.4, R * 4.8, R * 4.8); }
  const o = clamp(open);
  g.save(); g.rotate(a); half(g, R, false, pal[1], gold); g.restore();
  if (o > 0) {
    g.save(); g.rotate(a);                                                                       // lòng viên (nhìn vào nửa dưới)
    g.fillStyle = 'rgba(70,50,50,0.22)'; g.beginPath(); g.ellipse(0, 0, R * 0.98, R * 0.26 * o, 0, 0, TAU); g.fill();
    g.fillStyle = gold ? 'rgba(255,240,190,0.95)' : 'rgba(255,255,255,0.9)'; g.beginPath(); g.ellipse(0, R * 0.03, R * 0.9, R * 0.2 * o, 0, 0, TAU); g.fill();
    g.restore();
    if (content) { g.save(); content(g, R); g.restore(); }
    g.save(); g.rotate(a); g.translate(-R, 0); g.rotate(-1.15 * outCubic(o)); g.translate(R, -R * 0.08 * o); half(g, R, true, pal[0], gold); g.restore();
  } else { g.save(); g.rotate(a); half(g, R, true, pal[0], gold); g.restore(); shine(g, R); }
  g.restore();
}
const SPR = new Map();
/** Sprite viên nang (lưới, phân bố): vẽ một lần cho mỗi (tone, gold, r, góc), sau đó drawImage. Canvas CPU (willReadFrequently):
 *  sprite GPU tạo giữa chừng lệch ±4 mức xám theo THỨ TỰ khung chụp (đo 2026-10-19) — tất định cần CPU. */
function sprite(tn, gold, r, rot) {
  const key = `${tn}|${gold}|${Math.round(r * 4) / 4}|${Math.round(rot * 8) / 8}`;
  let c = SPR.get(key);
  if (!c) { const S = Math.ceil(r * 2 + 6); c = mk(S, S); capsule(c.getContext('2d', { willReadFrequently: true }), S / 2, S / 2, r, 1, { tone: tn, gold, rot: Math.round(rot * 8) / 8, ground: false }); SPR.set(key, c); }
  return c;
}
const drawSprite = (g, tn, gold, cx, cy, r, rot = -0.45) => { const c = sprite(tn, gold, r, rot); g.drawImage(c, Math.round(cx - c.width / 2), Math.round(cy - c.height / 2)); };

// ═════════════════════════ lưới viên nang (1000 / 100) ═════════════════════════
/**
 * n viên xếp lưới trong box { x, y, w, h } (khối acrylic trong nếu block). golds: số viên vàng (vị trí rải bằng hash, tất định)
 * hoặc mảng chỉ số. k: viên đổ vào từ hàng dưới lên. Tuỳ chọn: cols (mặc định theo tỉ lệ box), tones (mặc định CROWD),
 * (chỉ số i = 0 ở góc dưới-trái, đổ theo i). blank: số viên / mảng chỉ số "trắng tay" (xám ngọc), block (khối acrylic), seed, glints (ánh trên viên vàng).
 * Trả về { cols, rows, cell, r, pos(i) → [x, y], gold: Set }.
 */
export function capsuleGrid(g, box, n, golds = 0, k = 1, { cols = null, tones = CROWD, blank = null, block = true, seed = 1, glints = true } = {}) {
  const { x, y, w, h } = box, pad = block ? 26 : 0;
  const cl = cols ?? Math.max(1, Math.round(Math.sqrt(n * (w - 2 * pad) / (h - 2 * pad)))), rows = Math.ceil(n / cl);
  const cell = Math.min((w - 2 * pad) / cl, (h - 2 * pad) / rows), r = cell * 0.44;
  const gx0 = x + (w - cl * cell) / 2, gy0 = y + (h - rows * cell) / 2;
  const pos = i => [gx0 + (i % cl + 0.5) * cell, gy0 + (rows - 1 - Math.floor(i / cl) + 0.5) * cell];   // i = 0 góc dưới-trái, hàng thiếu ở trên
  const order = Array.from({ length: n }, (_, i) => [hash(i * 13.7 + seed * 101.3), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);
  const G = new Set(Array.isArray(golds) ? golds : order.slice(0, golds));
  const B = new Set(!blank ? [] : Array.isArray(blank) ? blank : order.filter(i => !G.has(i)).slice(-blank));
  if (block) {
    softShadow(g, () => { g.fillStyle = 'rgba(255,255,255,0.55)'; g.fill(rr(x, y, w, h, 30)); }, { blur: 34, oy: 14, col: 'rgba(70,50,40,0.16)' });
    const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, 'rgba(255,255,255,0.75)'); gr.addColorStop(0.5, 'rgba(240,246,252,0.35)'); gr.addColorStop(1, 'rgba(220,230,240,0.45)');
    g.fillStyle = gr; g.fill(rr(x, y, w, h, 30));
  }
  const shown = Math.round(n * clamp(k));
  for (let i = 0; i < shown; i++) {                                   // đổ từ hàng dưới, trái → phải
    const [cx, cy] = pos(i), gold = G.has(i), tn = B.has(i) ? 'blank' : tones[Math.floor(hash(i * 3.1 + seed) * tones.length) % tones.length];
    drawSprite(g, tn, gold, cx, cy, r, -0.45 + Math.round(hash(i * 5.3 + seed) * 6) / 4);
  }
  if (glints) for (const i of G) { if (i >= shown) continue; const [cx, cy] = pos(i);
    const hg = g.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 3.2); hg.addColorStop(0, 'rgba(255,214,110,0.55)'); hg.addColorStop(1, 'rgba(255,214,110,0)'); g.fillStyle = hg; g.fillRect(cx - r * 3.2, cy - r * 3.2, r * 6.4, r * 6.4);
    drawSprite(g, 'sky', true, cx, cy, r, -0.45); glint(g, cx + r * 0.7, cy - r * 0.7, Math.max(14, r * 1.6)); }
  if (block) {
    g.save(); g.strokeStyle = 'rgba(255,255,255,0.95)'; g.lineWidth = 3; g.stroke(rr(x + 1.5, y + 1.5, w - 3, h - 3, 29));
    g.strokeStyle = 'rgba(92,86,72,0.18)'; g.lineWidth = 1.5; g.stroke(rr(x, y, w, h, 30));
    const gl = g.createLinearGradient(x, y, x + w * 0.6, y + h * 0.5); gl.addColorStop(0, 'rgba(255,255,255,0.35)'); gl.addColorStop(0.25, 'rgba(255,255,255,0.06)'); gl.addColorStop(0.26, 'rgba(255,255,255,0)');
    g.fillStyle = gl; g.fill(rr(x, y, w, h, 30)); g.restore();
  }
  return { cols: cl, rows, cell, r, pos, gold: G, blank: B };
}

// ═════════════════════════ đồ thị 天井 (lab khung 1) ═════════════════════════
const lab28 = `600 28px ${JP}`, lab30 = `600 30px ${JP}`;
function pill(g, s, cx, y, font, col, bg) { const w = measure(g, s, font) + 30, fs = pxOf(font); g.fillStyle = bg; g.fill(rr(cx - w / 2, y, w, fs + 16, (fs + 16) / 2)); write(g, s, cx, y + fs + 2, 1, { font, color: col, align: 'center' }); }
/**
 * 90 cột p(n) trong box { x, y, w, h } (cột phẳng 0.6% tới 73, san hô dựng từ 74, vàng ở 90 = 天井). k: cột dựng từ trái.
 * opts: labels (trục %, mốc 1 / 74回目 / 90回目), notes (「1〜73回目は 0.6% のまま」, 「1回ごとに ＋6%」, 6.6%), ceil (nhãn 天井).
 * Trả về { cx(n), base, top(n), bar } để cảnh đặt thêm chú thích.
 */
export function pityBars(g, box, k = 1, { labels = true, notes = true, ceil = true } = {}) {
  const X0 = box.x + (labels ? 64 : 0), PI_ = (box.x + box.w - X0) / 90, bw = PI_ * 0.75;
  const hA = box.h - (labels ? 80 : 10) - 70, yA = box.y + 70 + hA;
  const cx = n => X0 + (n - 0.5) * PI_, top = n => yA - Math.max(2.6, p(n) * hA);
  const f = clamp(k) * 100;
  if (labels) [[0, '0%'], [0.5, '50%'], [1, '100%']].forEach(([fr, s]) => { const yy = yA - fr * hA; g.strokeStyle = fr ? 'rgba(92,86,72,0.18)' : C.line; g.lineWidth = fr ? 1.5 : 2; if (fr) g.setLineDash([3, 8]);
    g.beginPath(); g.moveTo(X0 - 6, yy); g.lineTo(X0 + 90 * PI_ + 6, yy); g.stroke(); g.setLineDash([]); write(g, s, X0 - 14, yy + 10, 1, { font: `600 30px ${JP}`, color: '@dim', align: 'right' }); });
  for (let n = 1; n <= 90; n++) {
    const kb = clamp((f - n) / 8); if (kb <= 0) continue;
    const bh = Math.max(2.6, p(n) * hA) * outCubic(kb), x = cx(n) - bw / 2, y = yA - bh;
    if (n === 90) { g.save(); g.shadowColor = GOLD.glow; g.shadowBlur = 22; const gg = g.createLinearGradient(0, y, 0, yA); gg.addColorStop(0, GOLD.lt); gg.addColorStop(0.5, GOLD.mid); gg.addColorStop(1, '#B07A12'); g.fillStyle = gg; g.fill(rr(x, y, bw, bh, bw / 2)); g.restore(); if (kb >= 1) glint(g, cx(n), y - 4, 22); }
    else { g.fillStyle = n < SOFT ? SKY.bar : lerpC(CORAL.a, CORAL.b, (n - SOFT) / 15); g.fill(rr(x, y, bw, bh, Math.min(bw / 2, bh / 2)));
      if (n >= SOFT && bh > 12) { g.fillStyle = 'rgba(255,255,255,0.42)'; g.fill(rr(x + bw * 0.2, y + 3, bw * 0.25, bh - 8, 1.3)); } }
  }
  const at = n => clamp((f - n) / 8);
  if (labels) [[1, '1', '@dim', false], [SOFT, `${SOFT}回目`, '@coral', true], [HARD, `${HARD}回目`, '@gold', false]].forEach(([n, s, col, hi]) => {
    if (at(n) <= 0) return; g.strokeStyle = ink(col); g.lineWidth = 2; g.beginPath(); g.moveTo(cx(n), yA + 3); g.lineTo(cx(n), yA + 16); g.stroke();
    if (hi) pill(g, s, cx(n), yA + 22, `700 32px ${JP}`, col, CORAL.pale); else write(g, s, cx(n), yA + 56, 1, { font: lab30, color: col, align: 'center' }); });
  if (notes) {
    write(g, [['1〜73回目は ', `700 32px ${JP}`], [must('0.006 * 100', 0.6) + '%', `700 32px ${JP}`], [' のまま', `700 32px ${JP}`]], X0 + 8, yA - 46, clamp((f - 73) / 6), { color: '@sky' });
    if (at(73) > 0) { g.strokeStyle = SKY.ink; g.lineWidth = 2; g.beginPath(); g.moveTo(X0 + 10, yA - 26); g.lineTo(X0 + 10 + (cx(73) - X0 - 10) * outCubic(at(73)), yA - 26); g.stroke(); }
    const kp = clamp((f - 90) / 8);
    if (kp > 0) {
      g.save(); g.setLineDash([2, 8]); g.lineCap = 'round'; g.strokeStyle = CORAL.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(cx(SOFT), top(SOFT) - 8); g.lineTo(cx(SOFT) + (cx(90) - 12 - cx(SOFT)) * outCubic(kp), top(SOFT) - 8 + (yA - hA - 4 - top(SOFT) + 8) * outCubic(kp)); g.stroke(); g.restore();
      write(g, `1回ごとに ＋${must('0.06 * 100', 6)}%`, cx(SOFT) - 30, yA - hA * 0.72, kp, { font: `700 40px ${MIN}`, color: '@coral', align: 'right' });
      write(g, `${must(`Math.round(${p(SOFT)} * 1000) / 10`, 6.6)}%`, cx(SOFT) - 14, top(SOFT) - 14, kp, { font: `700 30px ${JP}`, color: '@coral', align: 'right' });
    }
  }
  if (ceil && at(90) >= 1) { const s = '90 = 天井', font = `700 36px ${MIN}`, w = measure(g, s, font) + 44;
    g.save(); g.shadowColor = 'rgba(232,182,58,0.55)'; g.shadowBlur = 14; g.fillStyle = GOLD.pale; g.fill(rr(cx(90) + 14 - w, yA - hA - 62, w, 50, 25)); g.restore();
    write(g, s, cx(90) + 14 - w / 2, yA - hA - 26, 1, { font, color: '@gold', align: 'center' }); }
  return { cx, base: yA, top, bar: bw, hA };
}
/**
 * N người (mặc định 200), mỗi người một viên nhỏ chồng ở lượt trúng ĐẦU TIÊN (firstHits, tổng đúng N). Vùng ≤ 73 trời,
 * 74–80 vàng (trúng đông nhất), 81–90 bạc hà. box { x, y, w, h }; k: viên rơi vào từ trái. opts: labels (36% / 56% +
 * trục 1〜73 / 74〜80), median (thẻ 中央値 76回目 · 平均 62.3回), band (dải 74–80). Trả về { cx(n), base, d, counts }.
 */
export function firstHit(g, box, k = 1, { N = 200, labels = true, median = true, band = true } = {}) {
  const counts = firstHits(N), peak = Math.max(...counts), X0 = box.x + 64, PI_ = (box.x + box.w - X0) / 90;
  const yB = box.y + box.h - (labels ? 80 : 10), d = Math.min(PI_ * 0.93, (yB - box.y - 40) / (peak * 1.08)), cx = n => X0 + (n - 0.5) * PI_;
  const bx0 = X0 + 73 * PI_, bx1 = X0 + 80 * PI_;
  if (band) { g.fillStyle = 'rgba(244,197,66,0.17)'; g.fill(rr(bx0, box.y, bx1 - bx0, yB - box.y + 6, 10)); g.setLineDash([6, 7]); g.strokeStyle = 'rgba(200,150,20,0.7)'; g.lineWidth = 2; g.stroke(rr(bx0, box.y, bx1 - bx0, yB - box.y + 6, 10)); g.setLineDash([]); }
  g.strokeStyle = C.line; g.lineWidth = 2; g.beginPath(); g.moveTo(X0 - 6, yB + 2); g.lineTo(X0 + 90 * PI_ + 6, yB + 2); g.stroke();
  const shown = Math.round(N * clamp(k)); let c = 0;
  for (let n = 1; n <= 90 && c < shown; n++) {
    const reg = n < SOFT ? 0 : n <= 80 ? 1 : 2;
    for (let j = 0; j < counts[n - 1] && c < shown; j++, c++) drawSprite(g, ['sky', 'lemon', 'mint'][reg], reg === 1, cx(n), yB - d / 2 - j * (d + 1.1), d / 2, 0.3 + Math.round(hash(n * 7 + j) * 12) / 8);
  }
  const done = k >= 1, n73 = counts.slice(0, 73).reduce((a, b) => a + b, 0), n7480 = counts.slice(73, 80).reduce((a, b) => a + b, 0);
  if (labels && done) {
    const mid73 = (cx(1) + cx(73)) / 2, mid80 = (bx0 + bx1) / 2, pc73 = Math.round(cum(1, 73) * 100), pc80 = Math.round(cum(74, 80) * 100);
    must(`Math.abs(${n73} / ${N} - ${cum(1, 73)}) <= 0.01 && Math.abs(${n7480} / ${N} - ${cum(74, 80)}) <= 0.01`, true);   // chấm ≈ nhãn (làm tròn người)
    write(g, `${must(`${pc73}`, 36)}%`, mid73, yB - 84, 1, { font: `700 76px ${MIN}`, color: '@sky', align: 'center' });
    write(g, '73回目までに当たる', mid73, yB - 36, 1, { font: lab30, color: '@sky', align: 'center' });
    write(g, `${must(`${pc80}`, 56)}%`, bx1 + 22, box.y + 80, 1, { font: `700 76px ${MIN}`, color: '@gold' });
    g.strokeStyle = SKY.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(cx(1) - 4, yB + 22); g.lineTo(cx(73) + 4, yB + 22); g.stroke();
    g.strokeStyle = GOLD.ink; g.beginPath(); g.moveTo(bx0 + 2, yB + 22); g.lineTo(bx1 - 2, yB + 22); g.stroke();
    write(g, '1〜73回目', mid73, yB + 58, 1, { font: lab28, color: '@sky', align: 'center' });
    write(g, '74〜80回目', mid80, yB + 58, 1, { font: `700 28px ${JP}`, color: '@gold', align: 'center' });
  }
  if (median && done) {
    const mx = box.x + 40, my = box.y + 24, mw = 500, mh = 120;
    softShadow(g, () => { g.fillStyle = C.white; g.fill(rr(mx, my, mw, mh, 28)); }, { blur: 18, oy: 6, col: 'rgba(70,50,40,0.16)' });
    g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(mx, my, mw, mh, 28)); capsule(g, mx + 66, my + 60, 36, 1, { tone: 'sky', ground: false, rot: 0.5 });
    write(g, `中央値 ${must(`${MEDIAN}`, 76)}回目`, mx + 126, my + 58, 1, { font: `700 44px ${MIN}` });
    write(g, `平均 ${must(`${Math.round(MEAN * 10) / 10}`, 62.3)}回`, mx + 126, my + 102, 1, { font: lab30, color: '@dim' });
  }
  return { cx, base: yB, d, counts };
}

// ═════════════════════════ máy ガシャポン ═════════════════════════
/**
 * Máy bán viên nang: tâm x, đáy foot, cao h. k: trồi lên + nảy. opts: turn (góc núm, radian — vặn = ガチャ), clock
 * ({ h, m } mặt đồng hồ thay bảng giá — 「残り23時間」; vòng cung bạc hà theo h / 24), label (chữ bảng giá, ≥ 28 px
 * khi đủ lớn), out ({ tone, gold, k, open }: viên ở cửa ra), seed. Trả về { x, y, w, h, knob: [x, y], chute: [x, y], globe }.
 */
export function machine(g, x, foot, h, k = 1, { turn = 0, clock = null, label = '1回', out = null, seed = 2, tones = TONES } = {}) {
  if (k <= 0) return null;
  const e = outBack(clamp(k)), dy = Math.round((1 - e) * h * 0.25);
  const bw = h * 0.62, bh = h * 0.44, by = foot - bh - h * 0.07, R = (by - (foot - h) - h * 0.05) / 1.9, gy = by - R * 0.9;   // cầu ngồi trên thân
  g.save(); g.translate(0, dy);
  floorShadow(g, x, foot, bw * 0.75, 0.3);
  // chân đế
  g.fillStyle = '#E3DCD2'; g.fill(rr(x - bw * 0.46, foot - h * 0.07, bw * 0.92, h * 0.07, h * 0.02));
  // thân
  softShadow(g, () => { const gr = g.createLinearGradient(x - bw / 2, 0, x + bw / 2, 0); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.55, '#F3EEE7'); gr.addColorStop(1, '#D9D1C6'); g.fillStyle = gr; g.fill(rr(x - bw / 2, by, bw, bh, h * 0.05)); }, { blur: 30, oy: 12 });
  g.fillStyle = SKY.fill; g.fill(rr(x - bw / 2, by, bw, h * 0.045, [h * 0.05, h * 0.05, 0, 0]));
  g.fillStyle = 'rgba(255,255,255,0.6)'; g.fillRect(x - bw / 2 + h * 0.025, by + h * 0.06, h * 0.012, bh - h * 0.1);
  // bảng giá / mặt đồng hồ
  const px = x - bw * 0.32, py = by + bh * 0.3, pr = h * 0.085;
  if (clock) {
    g.fillStyle = C.white; g.beginPath(); g.arc(px, py, pr, 0, TAU); g.fill(); g.strokeStyle = 'rgba(92,86,72,0.35)'; g.lineWidth = Math.max(1.5, h * 0.004); g.stroke();
    g.strokeStyle = MINT.fill; g.lineWidth = pr * 0.2; g.lineCap = 'round'; g.beginPath(); g.arc(px, py, pr * 0.78, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(clock.h / 24)); g.stroke();
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.strokeStyle = C.mute; g.lineWidth = Math.max(1, h * 0.003); g.beginPath(); g.moveTo(px + Math.sin(a) * pr * 0.55, py - Math.cos(a) * pr * 0.55); g.lineTo(px + Math.sin(a) * pr * 0.64, py - Math.cos(a) * pr * 0.64); g.stroke(); }
    const ah = ((clock.h % 12) + (clock.m || 0) / 60) / 12 * TAU, am = (clock.m || 0) / 60 * TAU; g.strokeStyle = C.ink; g.lineCap = 'round';
    g.lineWidth = pr * 0.09; g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.sin(ah) * pr * 0.38, py - Math.cos(ah) * pr * 0.38); g.stroke();
    g.lineWidth = pr * 0.06; g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.sin(am) * pr * 0.55, py - Math.cos(am) * pr * 0.55); g.stroke();
  } else if (label) {
    const fs = Math.round(h * 0.05);
    g.fillStyle = C.white; g.fill(rr(px - pr, py - pr * 0.6, pr * 2, pr * 1.2, pr * 0.3)); g.strokeStyle = 'rgba(92,86,72,0.25)'; g.lineWidth = 1.5; g.stroke(rr(px - pr, py - pr * 0.6, pr * 2, pr * 1.2, pr * 0.3));
    if (fs >= 28) write(g, label, px, py + fs * 0.36, 1, { font: `700 ${fs}px ${JP}`, align: 'center' });
  }
  // khe xu
  g.fillStyle = '#CFC6BA'; g.fill(rr(x - bw * 0.36, by + bh * 0.62, h * 0.05, h * 0.012, h * 0.006));
  // núm vặn
  const kx = x + bw * 0.12, ky = by + bh * 0.36, kr = h * 0.105;
  g.save(); g.shadowColor = 'rgba(70,50,40,0.25)'; g.shadowBlur = 14; g.shadowOffsetY = 5; const kg = g.createRadialGradient(kx - kr * 0.3, ky - kr * 0.3, kr * 0.1, kx, ky, kr); kg.addColorStop(0, '#FFFFFF'); kg.addColorStop(1, '#DCD4C9'); g.fillStyle = kg; g.beginPath(); g.arc(kx, ky, kr, 0, TAU); g.fill(); g.restore();
  g.strokeStyle = SKY.fill; g.lineWidth = kr * 0.14; g.beginPath(); g.arc(kx, ky, kr * 0.86, 0, TAU); g.stroke();
  g.save(); g.translate(kx, ky); g.rotate(turn); const hgr = g.createLinearGradient(0, -kr * 0.2, 0, kr * 0.2); hgr.addColorStop(0, '#FFFFFF'); hgr.addColorStop(1, '#C9C0B4'); g.fillStyle = hgr;
  g.shadowColor = 'rgba(70,50,40,0.3)'; g.shadowBlur = 6; g.fill(rr(-kr * 0.78, -kr * 0.16, kr * 1.56, kr * 0.32, kr * 0.16)); g.restore();
  // cửa ra
  const cx0 = x + bw * 0.12, cy0 = by + bh * 0.78, cw = h * 0.17, ch = h * 0.1;
  g.fillStyle = '#3A3440'; g.fill(rr(cx0 - cw / 2, cy0 - ch / 2, cw, ch, ch * 0.45)); g.fillStyle = 'rgba(255,255,255,0.18)'; g.fill(rr(cx0 - cw / 2 + 4, cy0 - ch / 2 + 3, cw - 8, ch * 0.28, ch * 0.2));
  if (out) capsule(g, cx0, cy0 + ch * 0.05, ch * 0.42, out.k ?? 1, { tone: out.tone || 'pink', gold: !!out.gold, ground: false, open: out.open || 0, glow: out.gold ? 1 : 0 });
  // cầu acrylic + viên bên trong
  g.fillStyle = '#ECE5DB'; g.fill(rr(x - R * 0.55, gy + R * 0.82, R * 1.1, by - gy - R * 0.8 + 2, 6));
  g.save(); g.beginPath(); g.arc(x, gy, R, 0, TAU); g.clip();
  g.fillStyle = 'rgba(232,242,250,0.55)'; g.fillRect(x - R, gy - R, 2 * R, 2 * R);
  const cr = R * 0.17;
  for (let i = 0; i < 40; i++) { const row = Math.floor(i / 8), col = i % 8, xx = x - R + cr * 1.2 + col * cr * 2.05 + (row % 2) * cr + (hash(i * 3.7 + seed) - 0.5) * cr * 0.4, yy = gy + R - cr * 1.05 - row * cr * 1.8 + (hash(i * 1.3 + seed) - 0.5) * cr * 0.3;
    if (Math.hypot(xx - x, yy - gy) > R - cr * 0.9) continue; drawSprite(g, tones[Math.floor(hash(i * 9.1 + seed) * tones.length) % tones.length], false, xx, yy, cr, Math.round(hash(i * 2.2 + seed) * 12) / 4); }
  const gl = g.createRadialGradient(x - R * 0.4, gy - R * 0.45, R * 0.05, x, gy, R); gl.addColorStop(0, 'rgba(255,255,255,0.6)'); gl.addColorStop(0.4, 'rgba(255,255,255,0.08)'); gl.addColorStop(1, 'rgba(160,180,200,0.25)'); g.fillStyle = gl; g.fillRect(x - R, gy - R, 2 * R, 2 * R);
  g.restore();
  g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = Math.max(2, R * 0.03); g.beginPath(); g.arc(x, gy, R - 2, Math.PI * 1.05, Math.PI * 1.45); g.stroke();
  g.strokeStyle = 'rgba(120,140,160,0.35)'; g.lineWidth = 2; g.beginPath(); g.arc(x, gy, R, 0, TAU); g.stroke();
  // nắp trên
  g.fillStyle = SKY.fill; g.fill(rr(x - R * 0.42, gy - R - h * 0.035, R * 0.84, h * 0.05, h * 0.02));
  g.restore();
  return { x: x - bw / 2, y: foot - h + dy, w: bw, h, knob: [kx, ky + dy], chute: [cx0, cy0 + dy], globe: [x, gy + dy, R] };
}

// ═════════════════════════ máy slot sơn mài (vật tối duy nhất) ═════════════════════════
const STRIP = ['seven', 'cher', 'bar', 'cher', 'bar', 'seven', 'bar', 'cher', 'bell', 'bar'];
function sym(g, s, mx, y, glow) {
  if (s === 'seven') { g.save(); g.shadowColor = 'rgba(232,182,58,0.9)'; g.shadowBlur = glow ? 22 : 0; g.lineJoin = 'round'; g.font = `900 96px ${JP}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 6; g.strokeStyle = LAC.gold; g.strokeText('7', mx, y + 4); g.fillStyle = '#C3101F'; g.fillText('7', mx, y + 4); g.restore(); }
  else if (s === 'bar') { g.fillStyle = '#1A1215'; g.fill(rr(mx - 48, y - 20, 96, 40, 6)); g.save(); g.font = `700 30px ${CG}`; g.textAlign = 'center'; g.fillStyle = LAC.goldLt; g.fillText('BAR', mx, y + 11); g.restore(); }
  else if (s === 'bell') { g.save(); const bg = g.createLinearGradient(mx - 30, y - 34, mx + 30, y + 30); bg.addColorStop(0, '#FFF1B0'); bg.addColorStop(1, '#C89220'); g.fillStyle = bg; g.beginPath(); g.moveTo(mx - 32, y + 22); g.quadraticCurveTo(mx - 30, y - 34, mx, y - 36); g.quadraticCurveTo(mx + 30, y - 34, mx + 32, y + 22); g.closePath(); g.fill(); g.fillStyle = '#8A5A00'; g.beginPath(); g.arc(mx, y + 26, 8, 0, TAU); g.fill(); g.restore(); }
  else { g.strokeStyle = '#2C7A3C'; g.lineWidth = 4; g.beginPath(); g.moveTo(mx - 14, y + 4); g.quadraticCurveTo(mx - 4, y - 34, mx + 8, y - 36); g.moveTo(mx + 14, y + 4); g.quadraticCurveTo(mx + 12, y - 30, mx + 8, y - 36); g.stroke();
    [[-16, 8], [16, 8]].forEach(([dx, dy]) => { const cg = g.createRadialGradient(mx + dx - 4, y + dy - 4, 1, mx + dx, y + dy, 16); cg.addColorStop(0, '#FF8A8A'); cg.addColorStop(1, LAC.a); g.fillStyle = cg; g.beginPath(); g.arc(mx + dx, y + dy, 15, 0, TAU); g.fill(); }); }
}
/**
 * Máy slot sơn mài đỏ-đen-kim (lab): góc trên-trái (x0, top), scale s (1 = 560 × 770). k: trồi lên. opts:
 *  reels: 3 vị trí cuộn (số thực, đơn vị ô của dải STRIP; phần nguyên = ký hiệu trên đường thắng, phần lẻ = đang lăn).
 *         Vị trí của một ký hiệu: slotStop('seven' | 'bar' | 'cher' | 'bell', n). 7·7·7 = [0, 0, 0]; mặc định 7 · 7 · 7.
 *  blur: 3 số 0..1 (cuộn đang quay nhanh: vệt dọc), lever 0..1 (cần gạt kéo xuống), lit (payline sáng), lights (marquee).
 * Trả về { x, y, w, h, s, payline: y, reel(i) → x tâm }.
 */
export function slot(g, x0, top, k = 1, { s = 1, reels = [0, 0, 0], blur = [0, 0, 0], lever = 0, lit = true, lights = 1 } = {}) {
  if (k <= 0) return null;
  const e = outBack(clamp(k)), dy = Math.round((1 - e) * 200);
  const w = 560, h = 770, x1 = x0 + w * s, cx = w / 2;
  g.save(); g.translate(x0, top + dy); g.scale(s, s);
  g.save(); g.translate(cx, h + 12); g.scale(1, 0.09); const sg = g.createRadialGradient(0, 0, 0, 0, 0, 420); sg.addColorStop(0, 'rgba(50,20,20,0.42)'); sg.addColorStop(1, 'rgba(50,20,20,0)'); g.fillStyle = sg; g.beginPath(); g.arc(0, 0, 420, 0, TAU); g.fill(); g.restore();
  // cần gạt
  const lx = w - 4, ly = 300, la = -1.05 + clamp(lever) * 1.9, L = 176, ex = lx + Math.cos(la) * L * 0.55, ey = ly + 90 + Math.sin(la) * L;
  g.save(); g.lineCap = 'round'; const lg = g.createLinearGradient(lx, 0, lx + 90, 0); lg.addColorStop(0, '#A9A9B0'); lg.addColorStop(0.4, '#F3F3F6'); lg.addColorStop(1, '#6A6A72'); g.strokeStyle = lg; g.lineWidth = 16; g.beginPath(); g.moveTo(lx, ly + 90); g.lineTo(ex, ey); g.stroke(); g.restore();
  g.save(); g.shadowColor = 'rgba(179,18,31,0.6)'; g.shadowBlur = 20; const bg = g.createRadialGradient(ex - 10, ey - 10, 4, ex, ey, 36); bg.addColorStop(0, '#FF8C8C'); bg.addColorStop(0.4, '#D81F2E'); bg.addColorStop(1, '#5A060D'); g.fillStyle = bg; g.beginPath(); g.arc(ex, ey, 36, 0, TAU); g.fill(); g.restore();
  // thân
  const body = rr(0, 0, w, h, 46); g.save(); g.shadowColor = 'rgba(50,10,10,0.35)'; g.shadowBlur = 38; g.shadowOffsetX = 12; g.shadowOffsetY = 22; g.fillStyle = '#5A0A12'; g.fill(body); g.restore();
  let gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, '#C4202B'); gr.addColorStop(0.3, '#8E0F1B'); gr.addColorStop(0.75, '#5A0912'); gr.addColorStop(1, '#2E0409'); g.fillStyle = gr; g.fill(body);
  g.save(); g.clip(body); gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,200,190,0.25)'); gr.addColorStop(0.5, 'rgba(255,200,190,0)'); g.fillStyle = gr; g.fillRect(18, 0, 26, h);
  g.fillStyle = 'rgba(255,225,215,0.14)'; g.fillRect(20, 30, 6, h - 60); g.restore();
  g.strokeStyle = 'rgba(232,182,58,0.8)'; g.lineWidth = 3; g.stroke(rr(14, 14, w - 28, h - 28, 36));
  // marquee
  const mx = 40, my = 34, mw = w - 80, mh = 108; g.fillStyle = LAC.blk; g.fill(rr(mx, my, mw, mh, 16)); g.strokeStyle = LAC.gold; g.lineWidth = 4; g.stroke(rr(mx, my, mw, mh, 16));
  for (let i = 0; i < 15; i++) { const bx = mx + 24 + i * (mw - 48) / 14; [my + 14, my + mh - 14].forEach((by, j) => { const on = lights >= 1 || hash(i * 2 + j + Math.floor(lights * 10)) < lights; g.save(); g.shadowColor = '#FFD060'; g.shadowBlur = on ? 12 : 0; g.fillStyle = on ? '#FFE7A0' : '#6A4A20'; g.beginPath(); g.arc(bx, by, 5, 0, TAU); g.fill(); g.restore(); }); }
  g.save(); g.shadowColor = 'rgba(232,182,58,0.8)'; g.shadowBlur = 18; g.font = `700 56px ${CG}`; g.textAlign = 'center'; g.fillStyle = LAC.goldLt; g.fillText('JACKPOT', cx, my + 72); g.restore();
  // cửa sổ cuộn
  const wx = 40, wy = 170, ww = w - 80, wh = 280; g.fillStyle = LAC.gold; g.fill(rr(wx - 8, wy - 8, ww + 16, wh + 16, 20)); g.fillStyle = LAC.blk; g.fill(rr(wx, wy, ww, wh, 14));
  const rw = 138, gap = (ww - 3 * rw) / 4, cy0 = wy + wh / 2, SP = 92, reelX = i => wx + gap + i * (rw + gap) + rw / 2;
  [0, 1, 2].forEach(i => { const rx = reelX(i) - rw / 2; g.save(); g.clip(rr(rx, wy + 6, rw, wh - 12, 8)); g.fillStyle = '#FBF4E6'; g.fillRect(rx, wy, rw, wh);
    const v = reels[i] ?? 0, base = Math.floor(v), fr = v - base, bl = clamp(blur[i] ?? 0);
    for (let j = -2; j <= 2; j++) { const idx = ((base + j) % STRIP.length + STRIP.length) % STRIP.length, y = cy0 + (j - fr) * SP;
      if (bl > 0) { for (let q = 1; q <= 3; q++) { g.save(); g.globalAlpha = 0.28 * bl; g.translate(0, -q * 14 * bl); sym(g, STRIP[idx], rx + rw / 2, y, false); g.restore(); } g.save(); g.globalAlpha = 1 - 0.55 * bl; sym(g, STRIP[idx], rx + rw / 2, y, false); g.restore(); }
      else sym(g, STRIP[idx], rx + rw / 2, y, j === 0 && fr < 0.05 && lit && STRIP[idx] === 'seven'); }
    const shd = g.createLinearGradient(0, wy, 0, wy + wh); shd.addColorStop(0, 'rgba(18,7,8,0.78)'); shd.addColorStop(0.3, 'rgba(18,7,8,0)'); shd.addColorStop(0.7, 'rgba(18,7,8,0)'); shd.addColorStop(1, 'rgba(18,7,8,0.78)'); g.fillStyle = shd; g.fillRect(rx, wy, rw, wh); g.restore(); });
  if (lit) { g.save(); g.shadowColor = 'rgba(255,215,100,0.95)'; g.shadowBlur = 22; g.strokeStyle = '#FFD968'; g.lineWidth = 3.5; g.beginPath(); g.moveTo(wx + 6, cy0); g.lineTo(wx + ww - 6, cy0); g.stroke(); g.restore(); }
  gr = g.createLinearGradient(wx, wy, wx + ww * 0.7, wy + wh * 0.6); gr.addColorStop(0, 'rgba(255,255,255,0.30)'); gr.addColorStop(0.3, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fill(rr(wx, wy, ww, wh, 14));
  // bảng điều khiển
  const px = 40, py = 494, pw = w - 80, ph = 118; g.fillStyle = LAC.blk; g.fill(rr(px, py, pw, ph, 18)); g.strokeStyle = 'rgba(232,182,58,0.7)'; g.lineWidth = 2.5; g.stroke(rr(px + 6, py + 6, pw - 12, ph - 12, 14));
  [[-150, '#F7D774', '#9A6A12'], [0, '#FF6060', '#9A0E1A'], [150, '#F7D774', '#9A6A12']].forEach(([dx, c1, c2]) => { const bx = cx + dx, by = py + 48; g.save(); g.shadowColor = c1; g.shadowBlur = dx === 0 ? 20 : 6; const bgr = g.createRadialGradient(bx - 8, by - 9, 2, bx, by, 30); bgr.addColorStop(0, '#FFFFFF'); bgr.addColorStop(0.3, c1); bgr.addColorStop(1, c2); g.fillStyle = bgr; g.beginPath(); g.arc(bx, by, 28, 0, TAU); g.fill(); g.restore(); });
  if (s >= 0.94) { g.save(); g.font = `700 30px ${JP}`; g.textAlign = 'center'; g.fillStyle = LAC.goldLt; g.fillText('スタート', cx, py + 104); g.restore(); }   // < 0.94: 30 px × s < 28 → bỏ chữ
  // khay xu
  const ty = 640; g.fillStyle = '#240609'; g.fill(rr(70, ty, w - 140, 100, 16)); g.fillStyle = '#0E0305'; g.fill(rr(90, ty + 18, w - 180, 64, 12));
  [[-60, 56], [-20, 62], [26, 54], [66, 64], [0, 70]].forEach(([ddx, ddy], q) => { const ex2 = cx + ddx * 1.2, ey2 = ty + ddy; const cg = g.createLinearGradient(ex2 - 22, ey2 - 8, ex2 + 22, ey2 + 8); cg.addColorStop(0, '#FFF1B0'); cg.addColorStop(1, '#B98A24'); g.fillStyle = cg; g.beginPath(); g.ellipse(ex2, ey2, 22, 8 + (q % 2), 0, 0, TAU); g.fill(); });
  g.restore();
  return { x: x0, y: top + dy, w: w * s, h: h * s, s, payline: top + dy + cy0 * s, reel: i => x0 + reelX(i) * s, right: x1 };
}
/** Vị trí cuộn để ký hiệu sym ('seven' | 'bar' | 'cher' | 'bell') nằm trên đường thắng; n = lần xuất hiện thứ n trên dải. */
export function slotStop(name, n = 1) { let c = 0; for (let i = 0; i < STRIP.length; i++) if (STRIP[i] === name && ++c === n) return i; throw new Error(`slotStop: không có "${name}" (${n})`); }

// ═════════════════════════ điện thoại: màn ガチャ tự thiết kế ═════════════════════════
/**
 * Điện thoại pastel (lab): tâm x, đỉnh top, scale s (1 = 380 × 740). KHÔNG UI / tên / nhân vật game thật, không SSR/UR.
 * opts: state 'idle' (viên pastel chờ) | 'spin' (viên lắc, cần t) | 'gold' (★5 lóe: vàng + 5 sao + 「最高レア」) | 'miss'
 * (viên trời mở, không gì); s < 0.94 → màn không chữ (chữ nhỏ nhất 30 px × s < 28). stones (số 石 góc phải, qua must ở cảnh), press 0..1 (nút 回す lún), history (mảng tông viên
 * đã ra), t. Trả về { x, y, w, h, s, button: [x, y], capsule: [x, y, r] }.
 */
export function phone(g, cx, top, k = 1, { s = 1, state = 'gold', stones = 160, press = 0, history = ['sky', 'pink', 'mint', 'lemon', 'lav'], t = 0 } = {}) {
  if (k <= 0) return null;
  if (!['idle', 'spin', 'gold', 'miss'].includes(state)) throw new Error(`phone: state lạ "${state}"`);
  const e = outBack(clamp(k)), dy = Math.round((1 - e) * 160), w = 380, h = 740, x0 = -w / 2;
  g.save(); g.translate(cx, top + dy); g.scale(s, s);
  g.save(); g.translate(0, h + 22); g.scale(1, 0.1); let sg = g.createRadialGradient(0, 0, 0, 0, 0, 260); sg.addColorStop(0, 'rgba(70,50,40,0.30)'); sg.addColorStop(1, 'rgba(70,50,40,0)'); g.fillStyle = sg; g.beginPath(); g.arc(0, 0, 260, 0, TAU); g.fill(); g.restore();
  g.save(); g.shadowColor = 'rgba(70,50,40,0.22)'; g.shadowBlur = 40; g.shadowOffsetX = 10; g.shadowOffsetY = 22; g.fillStyle = '#E9E2D8'; g.fill(rr(x0, 0, w, h, 58)); g.restore();
  let gr = g.createLinearGradient(x0, 0, x0 + w, h); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.5, '#ECE6DE'); gr.addColorStop(1, '#CFC7BC'); g.fillStyle = gr; g.fill(rr(x0, 0, w, h, 58));
  g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 2; g.stroke(rr(x0 + 1.5, 1.5, w - 3, h - 3, 57));
  g.fillStyle = '#E2DBD1'; g.fill(rr(x0 + w - 3, 150, 6, 70, 3)); g.fill(rr(x0 - 3, 130, 6, 52, 3));
  const sx = x0 + 15, sy = 15, sw = w - 30, shh = h - 30, S = rr(sx, sy, sw, shh, 44);
  g.save(); g.clip(S);
  gr = g.createLinearGradient(0, sy, 0, sy + shh); gr.addColorStop(0, '#FFF3F8'); gr.addColorStop(0.55, '#F1F5FF'); gr.addColorStop(1, '#DDEEFF'); g.fillStyle = gr; g.fillRect(sx, sy, sw, shh);
  const gx = 0, gy = 320;
  if (state === 'gold') {
    gr = g.createRadialGradient(gx, gy, 0, gx, gy, 250); gr.addColorStop(0, 'rgba(255,236,150,0.95)'); gr.addColorStop(0.45, 'rgba(255,214,120,0.40)'); gr.addColorStop(1, 'rgba(255,214,120,0)'); g.fillStyle = gr; g.fillRect(sx, sy, sw, shh);
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU + 0.2 + t * 0.15, a2 = a + 0.09; g.fillStyle = i % 2 ? 'rgba(255,240,170,0.34)' : 'rgba(255,255,255,0.40)'; g.beginPath(); g.moveTo(gx, gy); g.lineTo(gx + 300 * Math.cos(a), gy + 300 * Math.sin(a)); g.lineTo(gx + 300 * Math.cos(a2), gy + 300 * Math.sin(a2)); g.fill(); }
  }
  const txt = s * 30 >= 28;                                              // chữ nhỏ nhất trên màn 30 px × s: dưới 28 px → bỏ hết chữ (luật kit)
  if (txt) { g.save(); g.font = `700 42px ${MIN}`; g.fillStyle = '#3B2F4A'; g.fillText('ガチャ', sx + 30, 92); g.restore(); }
  g.fillStyle = '#FFFFFF'; g.fill(rr(sx + sw - 150, 56, 124, 46, 23)); gem(g, sx + sw - 124, 80, 14); if (txt) { g.save(); g.font = `700 30px ${JP}`; g.fillStyle = GEM.ink; g.fillText(String(stones), sx + sw - 98, 91); g.restore(); }
  if (state === 'gold') { capsule(g, gx, gy, 98, 1, { gold: true, ground: false, rot: -0.45 });
    [[gx - 128, gy - 92, 26], [gx + 122, gy - 70, 20], [gx + 100, gy + 82, 24], [gx - 112, gy + 78, 16]].forEach(([x, y, r]) => glint(g, x, y, r));
    for (let i = 0; i < 5; i++) goldStar(g, gx + (i - 2) * 56, 468, 24);
    if (txt) { g.save(); g.font = `700 36px ${MIN}`; g.textAlign = 'center'; g.fillStyle = GOLD.ink; g.fillText('最高レア', gx, 540); g.restore(); } }
  else if (state === 'miss') { capsule(g, gx, gy, 98, 1, { tone: 'sky', ground: false, open: 1 }); }
  else capsule(g, gx, gy, 98, 1, { tone: 'pink', ground: false, shake: state === 'spin' ? 1 : 0, t });
  history.forEach((tn, i) => capsule(g, gx + (i - 2) * 66, 596, 24, 1, { tone: tn, ground: false, rot: 0.3 + i * 0.5 }));
  const pr = clamp(press), bx = gx - 138, by = 640 + pr * 6, bw = 276, bh = 72;
  g.save(); g.shadowColor = 'rgba(217,58,98,0.45)'; g.shadowBlur = 22 * (1 - pr * 0.7); g.shadowOffsetY = 10 * (1 - pr);
  gr = g.createLinearGradient(0, by, 0, by + bh); gr.addColorStop(0, '#F0648A'); gr.addColorStop(1, '#D23A62'); g.fillStyle = gr; g.fill(rr(bx, by, bw, bh, 36)); g.restore();
  g.fillStyle = 'rgba(255,255,255,0.28)'; g.fill(rr(bx + 10, by + 6, bw - 20, bh * 0.38, 18));
  if (txt) { g.save(); g.font = `700 48px ${MIN}`; g.textAlign = 'center'; g.fillStyle = '#FFFFFF'; g.fillText('回す', gx, by + 52); g.restore(); }
  gr = g.createLinearGradient(sx, sy, sx + sw * 0.8, sy + shh * 0.5); gr.addColorStop(0, 'rgba(255,255,255,0.45)'); gr.addColorStop(0.28, 'rgba(255,255,255,0.10)'); gr.addColorStop(0.3, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(sx, sy, sw, shh);
  g.restore();
  g.fillStyle = '#1B1820'; g.fill(rr(-46, sy + 10, 92, 26, 13));
  g.restore();
  return { x: cx - w * s / 2, y: top + dy, w: w * s, h: h * s, s, button: [cx, top + dy + 676 * s], capsule: [cx, top + dy + gy * s, 98 * s] };
}

// ═════════════════════════ thẻ ảnh acrylic (DNA §8) ═════════════════════════
/** Ảnh thật: file (tương đối trang), nhãn Nhật, credit BẮT BUỘC (assets/photos/INDEX.md, assets/web/INDEX.md). */
export const PHOTOS = {
  gashapon: { src: './assets/photos/Gashapon_Machines.jpg', label: 'ガシャポン（カプセルトイ）', credit: '写真：Ominae / CC BY-SA 4.0 / Wikimedia Commons' },
  slot: { src: './assets/photos/Slot_machine.jpg', label: 'スロットマシン', credit: '写真：Jeff Kubina / CC BY-SA 2.0 / Wikimedia Commons' },
  casino: { src: './assets/photos/Casino_Aboard_the_Celebrity_Equinox_before_Christmas_6690336353_.jpg', label: 'カジノ', credit: '写真：Joe Ross / CC BY-SA 2.0 / Wikimedia Commons' },
  skinner: { src: './assets/photos/Skinner_boxes_01.jpg', label: 'スキナー箱', credit: '写真：Luis Dantas / パブリックドメイン / Wikimedia Commons', maxScale: 1.6 },
  skinnerScheme: { src: './assets/photos/Skinner_box_scheme_01.png', label: 'スキナー箱のしくみ', credit: '図：AndreasJS / CC BY-SA 3.0 / Wikimedia Commons', fit: 'contain', bg: '#FFFFFF' },
  belgium: { src: './assets/photos/Belgium_in_Europe_-rivers_-mini_map_.png', label: 'ベルギー', credit: '地図：TUBS / CC BY-SA 3.0 / Wikimedia Commons', fit: 'contain', bg: '#FFFFFF' },
  netherlands: { src: './assets/photos/Netherlands_in_Europe_-rivers_-mini_map_.png', label: 'オランダ', credit: '地図：TUBS / CC BY-SA 3.0 / Wikimedia Commons', fit: 'contain', bg: '#FFFFFF' },
  pachinko: { src: './assets/photos/August_2007_pachinko_in_Osaka.jpg', label: 'パチンコ店（大阪）', credit: '写真：Syced / CC0 / Wikimedia Commons' },
  beReport: { src: './assets/web/be-report-p1-01.png', label: 'ベルギー賭博委員会の報告書', credit: '出典：Belgian Gaming Commission（2018年4月）', fit: 'top' },
  nlReport: { src: './assets/web/nl-report-p1-01.png', label: 'オランダ賭博庁の調査', credit: '出典：Kansspelautoriteit（2018年4月）', fit: 'top' },
  itmedia: { src: './assets/web/itmedia-kompu-2012.png', label: 'コンプガチャの報道', credit: '出典：ITmedia ビジネスオンライン（2012年5月9日）', fit: 'top' },
  cesa: { src: './assets/web/gamebiz-cesa-2016.png', label: 'CESAのガイドライン', credit: '出典：gamebiz（2016年4月27日）', fit: 'top' },
  kokusen: { src: './assets/web/kokusen-2024.png', label: '国民生活センターの注意喚起', credit: '出典：国民生活センター（2024年3月13日）', fit: 'top' },
  swrve: { src: './assets/web/destructoid-swrve-2014.png', label: 'Swrveの調査（2014年1月のデータ）', credit: '出典：Destructoid（2014年2月26日）', fit: 'top' },
  hooked: { src: './assets/web/nirandfar-hooked.png', label: '『Hooked』', credit: '出典：nirandfar.com/hooked', fit: 'top' },
  apple: { src: './assets/web/apple-japan-2025.png', label: 'Apple：日本のiOSの変更', credit: '出典：Apple Newsroom（2025年12月17日）', fit: 'top' },
};
/** static IMAGES của cảnh: photoImages('slot', 'casino') → { slot: './assets/…', casino: … }. */
export const photoImages = (...keys) => Object.fromEntries(keys.map(k => { const q = PHOTOS[k]; if (!q) throw new Error(`photoImages: "${k}" không có trong PHOTOS`); return [k, q.src]; }));
/**
 * Thẻ sản phẩm acrylic trắng bo tròn (lỗ treo, viền kính, đổ bóng mềm), ảnh nằm trong (x, y, w, h = cỡ ẢNH). Credit BẮT
 * BUỘC in trên ảnh (dải trắng mờ đáy ảnh, 28 px). caption: nhãn dưới ảnh trong thẻ (mặc định PHOTOS[key].label; null = bỏ).
 * k: thẻ trượt lên + nghiêng về rot. zoom ≥ 1 + focus [fx, fy] 0..1: camera đẩy chậm vào ảnh. Trả về hộp cả thẻ.
 */
export function photoTag(g, key, x, y, w, h, k = 1, { rot = -0.025, credit = undefined, caption = undefined, zoom = 1, focus = [0.5, 0.5], capSize = 36 } = {}) {
  const Q = PHOTOS[key]; if (!Q) throw new Error(`photoTag: "${key}" không có trong PHOTOS / INDEX.md`);
  const im = IM[key]; if (!im) throw new Error(`photoTag: chưa nạp ảnh "${key}" (static IMAGES = photoImages(…))`);
  const cr = credit === undefined ? Q.credit : credit, cap = caption === undefined ? Q.label : caption;
  if (!cr) throw new Error(`photoTag: "${key}" thiếu credit`);
  guard(`500 28px ${JP}`, cr); if (cap) guard(`700 ${capSize}px ${JP}`, cap);
  const cfont = `500 28px ${JP}`;                                      // credit: một dòng; quá rộng → tách phần cuối (" / Wikimedia Commons") xuống dòng 2
  let CL = [cr]; if (measure(g, cr, cfont) + 28 > w - 24 && cr.includes(' / ')) { const j = cr.lastIndexOf(' / '); CL = [cr.slice(0, j), cr.slice(j + 3)]; }
  const cw = Math.max(...CL.map(l => measure(g, l, cfont))) + 28, chh = 40 + (CL.length - 1) * 36;
  if (cw > w - 24) throw new Error(`photoTag: credit "${cr}" (${Math.round(cw)} px) không vừa ảnh rộng ${w} px — tăng w`);
  const pad = 20, capH = cap ? capSize + 34 : 0, tw = w + 2 * pad, th = h + 2 * pad + capH + 22, tx = x - pad, ty = y - pad - 22;
  const box = { x: tx, y: ty, w: tw, h: th };
  if (k <= 0) return box;
  const e = outCubic(clamp(k)), dy = Math.round((1 - e) * 120), a = rot * e + (1 - e) * 0.06;
  g.save(); g.translate(tx + tw / 2, ty + th / 2 + dy); g.rotate(a); g.translate(-(tx + tw / 2), -(ty + th / 2));
  softShadow(g, () => { g.fillStyle = 'rgba(255,255,255,0.97)'; g.fill(rr(tx, ty, tw, th, 30)); }, { blur: 40, oy: 18, col: 'rgba(70,50,40,0.22)' });
  g.strokeStyle = 'rgba(255,255,255,1)'; g.lineWidth = 3; g.stroke(rr(tx + 3, ty + 3, tw - 6, th - 6, 27));
  g.strokeStyle = 'rgba(92,86,72,0.16)'; g.lineWidth = 1.5; g.stroke(rr(tx, ty, tw, th, 30));
  g.fillStyle = '#EDE7DD'; g.beginPath(); g.arc(tx + tw / 2, ty + 18, 8, 0, TAU); g.fill(); g.strokeStyle = 'rgba(92,86,72,0.25)'; g.lineWidth = 1.5; g.stroke();
  // ảnh: cover (mặc định) | contain (bản đồ / sơ đồ, nền trắng) | top (trang web: phủ ngang, neo đỉnh)
  g.save(); g.clip(rr(x, y, w, h, 14));
  g.fillStyle = Q.bg || '#EDE7DD'; g.fillRect(x, y, w, h);
  const fit = Q.fit || 'cover', z = Math.max(1, zoom);
  let sc = fit === 'contain' ? Math.min(w / im.width, h / im.height) : fit === 'top' ? w / im.width : Math.max(w / im.width, h / im.height);
  if (fit === 'top' && im.height * sc < h) sc = h / im.height;
  if (Q.maxScale && sc > Q.maxScale) sc = Q.maxScale;
  sc *= z; const dw = im.width * sc, dh = im.height * sc;
  const fx = clamp(focus[0]), fy = fit === 'top' ? 0 : clamp(focus[1]);
  const ix = x + (w - dw) * fx, iy = fit === 'top' ? y + Math.min(0, (h - dh) * (focus[1] ?? 0)) : y + (h - dh) * fy;
  g.drawImage(im, ix, iy, dw, dh);
  const gl = g.createLinearGradient(x, y, x + w * 0.7, y + h * 0.6); gl.addColorStop(0, 'rgba(255,255,255,0.22)'); gl.addColorStop(0.3, 'rgba(255,255,255,0.03)'); gl.addColorStop(0.31, 'rgba(255,255,255,0)'); g.fillStyle = gl; g.fillRect(x, y, w, h);
  // credit trên ảnh
  g.fillStyle = 'rgba(255,255,255,0.88)'; g.fill(rr(x + w - cw - 12, y + h - 12 - chh, cw, chh, 20));
  g.restore();
  CL.forEach((l, j) => write(g, l, x + w - cw / 2 - 12, y + h - 22 - (CL.length - 1 - j) * 36, 1, { font: cfont, color: '@dim', align: 'center' }));
  g.strokeStyle = 'rgba(92,86,72,0.18)'; g.lineWidth = 1.5; g.stroke(rr(x, y, w, h, 14));
  if (cap) write(g, cap, x + w / 2, y + h + pad + capSize + 4, clamp((k - 0.5) / 0.4), { font: `700 ${capSize}px ${JP}`, align: 'center' });
  g.restore();
  return box;
}

// ═════════════════════════ sao kê giấy nhiệt (ACT 5) ═════════════════════════
/**
 * Tờ sao kê giấy nhiệt: góc trên-trái (x, y), rộng w. lines: [[nhãn, yên], …] (yên là số). k: giấy in ra từ máy (dài dần),
 * dòng hiện khi đã in tới. opts: title, totalLabel, expect (tổng phải bằng — must), unit ('円'). Trả về { x, y, w, h, total }.
 */
export function receipt(g, x, y, w, lines, k = 1, { title = 'ご利用明細', totalLabel = '合計', expect = null, unit = '円', size = 32 } = {}) {
  const lh = size * 1.75, head = 120, tail = 150, hFull = head + lines.length * lh + tail;
  const total = lines.reduce((a, [, v]) => a + v, 0);
  must(lines.map(([, v]) => v).join(' + ') || '0', total); if (expect != null) must(`${total}`, expect);
  const font = `500 ${size}px ${JP}`, bold = `700 ${size + 8}px ${JP}`;
  lines.forEach(([l, v]) => { guard(font, l); guard(font, comma(v));
    if (measure(g, l, font) + measure(g, comma(v) + unit, font) + 24 > w - 72) throw new Error(`receipt: dòng "${l}" + "${comma(v)}${unit}" không vừa rộng ${w} px`); });
  if (k <= 0) return { x, y, w, h: 0, total };
  const hNow = Math.max(30, hFull * outCubic(clamp(k)));
  const zig = (yy, dir) => { const n = Math.round(w / 18), q = new Path2D(); q.moveTo(x, yy); for (let i = 1; i <= n; i++) q.lineTo(x + w * (i - 0.5) / n, yy + dir * 9), q.lineTo(x + w * i / n, yy); return q; };
  const shape = new Path2D(); shape.moveTo(x, y); for (let i = 1, n = Math.round(w / 18); i <= n; i++) { shape.lineTo(x + w * (i - 0.5) / n, y - 9); shape.lineTo(x + w * i / n, y); }
  shape.lineTo(x + w, y + hNow); for (let i = Math.round(w / 18) - 1, n = Math.round(w / 18); i >= 0; i--) { shape.lineTo(x + w * (i + 0.5) / n, y + hNow + 9); shape.lineTo(x + w * i / n, y + hNow); } shape.closePath();
  softShadow(g, () => { g.fillStyle = '#FBFAF6'; g.fill(shape); }, { blur: 26, oy: 10, col: 'rgba(70,50,40,0.20)' });
  g.save(); g.clip(shape);
  const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, 'rgba(0,0,0,0.035)'); gr.addColorStop(0.5, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.05)'); g.fillStyle = gr; g.fillRect(x, y - 10, w, hNow + 20);
  const vis = yy => yy < y + hNow - 10, pX = 36;
  capsule(g, x + pX + 22, y + 52, 20, 1, { tone: 'pink', ground: false });
  if (vis(y + 64)) write(g, title, x + pX + 58, y + 64, 1, { font: `700 ${size + 4}px ${MIN}` });
  const dash = yy => { g.save(); g.setLineDash([6, 6]); g.strokeStyle = 'rgba(58,58,64,0.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x + pX, yy); g.lineTo(x + w - pX, yy); g.stroke(); g.restore(); };
  if (vis(y + 96)) dash(y + 96);
  lines.forEach(([l, v], i) => { const yy = y + head + i * lh + size * 0.6; if (!vis(yy)) return;
    write(g, l, x + pX, yy, 1, { font, color: '#3A3A40' }); write(g, `${comma(v)}${unit}`, x + w - pX, yy, 1, { font, color: '#3A3A40', align: 'right' }); });
  const ty = y + head + lines.length * lh + 20;
  if (vis(ty)) dash(ty);
  if (vis(ty + 70)) { write(g, totalLabel, x + pX, ty + 70, 1, { font: bold, color: '#3A3A40' }); write(g, `${comma(total)}${unit}`, x + w - pX, ty + 70, 1, { font: bold, color: '#2B2A33', align: 'right' }); }
  g.restore();
  return { x, y, w, h: hNow, total };
}

// ═════════════════════════ tiêu đề mục + thẻ hồi ═════════════════════════
/** Biển mục góc trên-trái: kicker hồi (ACTS[act − 1], Noto 28 phụ) + tên mục Shippori + viên nang nhỏ. act 0 = không kicker. */
export function heading(g, act, title, k = 1, { x = 96, y = 150, size = 60 } = {}) {
  if (k <= 0) return 0;
  if (act) { const [a, b] = ACTS[act - 1]; write(g, `${a}　${b}`, x + 66, y - 70, clamp(k * 3), { font: `500 28px ${JP}`, color: '@dim', ls: 3 }); }
  capsule(g, x + 26, y - size * 0.34, 24, clamp(k * 2), { tone: 'pink', ground: false });
  const r = write(g, title, x + 66, y, clamp(k * 1.6 - 0.3), { font: `700 ${size}px ${MIN}`, ls: 2 });
  if (r.w > 1100) throw new Error(`heading: "${title}" rộng ${Math.round(r.w)} px > 1100`);
  return r.w;
}
/** Mốc thẻ hồi tính từ FROM THẬT (LESSONS §82): vào a = max(START − 2.4, FROM + 0.95), rút START + 0.35 → + 0.95. */
export const actTimes = (FROM, START) => { const a = Math.max(START - 2.4, FROM + 0.95); return { a, o0: Math.max(START + 0.35, a + 1.6), o1: Math.max(START + 0.95, a + 2.2) }; };
/** Tiếng thẻ hồi (viên nang rơi xuống khay) — cộng vào sfx() của cảnh mở hồi. */
export const actCue = (FROM, START) => ({ t: +actTimes(FROM, START).a.toFixed(3), kind: 'pop' });
/** Thẻ HỒI: khay acrylic trắng trượt vào từ phải, viên nang số hồi lăn tới, 「第n幕」 + tên hồi; trượt ra trái quanh START. */
export function actCard(g, t, FROM, START, act) {
  const { a, o0, o1 } = actTimes(FROM, START), [kick, title] = ACTS[act - 1];
  if (t < a - 0.05 || t > o1) return;
  const tw = measure(g, title, `700 84px ${MIN}`, 4), w = Math.max(900, tw + 300), h = 300, x = (W - w) / 2, y = 360;
  const kin = outCubic(prog(t, a - 0.05, a + 0.45)), kout = outCubic(prog(t, o0, o1));
  const dx = Math.round((1 - kin) * (W - x + 60) - kout * (x + w + 80));
  g.save(); g.translate(dx, 0);
  softShadow(g, () => { g.fillStyle = C.white; g.fill(rr(x, y, w, h, 40)); }, { blur: 40, oy: 16 });
  g.strokeStyle = 'rgba(92,86,72,0.14)'; g.lineWidth = 1.5; g.stroke(rr(x, y, w, h, 40));
  const roll = outCubic(prog(t, a + 0.1, a + 0.7)), cxp = x + w - 120 - (1 - roll) * 200;
  capsule(g, cxp, y + h / 2, 56, 1, { tone: TONES[(act - 1) % TONES.length], rot: -0.45 + (1 - roll) * 3.5, ground: false });
  write(g, kick, x + 80, y + 108, prog(t, a + 0.2, a + 0.55), { font: `700 40px ${MIN}`, color: '@dim', ls: 12 });
  write(g, title, x + 80, y + 222, prog(t, a + 0.45, a + 1.25), { font: `700 84px ${MIN}`, ls: 4 });
  g.restore();
}

// ═════════════════════════ nhân vật ═════════════════════════
// crop = phần trên ảnh được giữ (assets/character-v2/crop.js). MIỆNG NÓI: truyền { t } → miệng mở theo lời khi đã đứng hẳn.
// Trang gọi setTalk(data/<part>.mouth.json); chưa có tệp → mascot im. Tư thế chưa đo miệng (mouths.js) + { t } → ném.
const IM = {}, SIL = {}, TINT = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
function prepPose(key) {                              // một lần lúc nạp: ám ấm studio + bóng mềm nâu (filter chỉ ở đây)
  const im = IM[key];
  const t = mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop';
  tx.fillStyle = 'rgba(255,226,200,0.05)'; tx.fillRect(0, 0, im.width, im.height); TINT[key] = t;
  const s = mk(im.width, im.height), sx = s.getContext('2d'); sx.filter = 'blur(16px)'; sx.drawImage(im, 0, 0); sx.filter = 'none';
  sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#463228'; sx.fillRect(0, 0, im.width, im.height); SIL[key] = s;
}
/**
 * Mascot (DNA §5: NHỎ ≤ ~45% chiều cao, ở mép): cx tâm ảnh, foot đáy, h cao hiển thị. k = trồi lên + nảy (không fade).
 * opts: t (miệng nói), talk, flip, crop. Trả về { x, y, w, h, s, pose, flip }.
 */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return null;
  if (h > H * 0.62) throw new Error(`figure: cao ${h} px > 62% khung — DNA §5 mascot nhỏ`);
  const key = 'pose-' + pose, im = TINT[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.28; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 14, y0 + 12, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h, s, pose, flip };
}

// ═════════════════════════ nạp ═════════════════════════
/** Nạp ảnh {key: url} (ảnh thật theo PHOTOS, 'pose-<tên>' cho mascot) + sinh kết cấu MỘT lần. */
export async function loadKit(images) {
  STUDIO = makeStudio(true); STUDIO_NF = makeStudio(false); CASINO = makeCasino(); LIGHT = makeLight();
  await loadImages(images, IM);
  for (const key of Object.keys(images)) if (key.startsWith('pose-')) prepPose(key);
}
