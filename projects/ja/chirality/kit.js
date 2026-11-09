// Đồ nghề chung của ja/chirality — DNA「合わせ鏡」(projects/ja/chirality/DNA.md): MỘT tấm gương tráng bạc dựng đứng ở x = 930
// trên bàn thí nghiệm graphite bóng; vật bên trái (左, hổ phách) luôn có bản sao bên phải (右, azure). Bàn thử gốc:
// tools/lab/awasekagami.html (khung 0 = CHFClBr soi gương, khung 1 = mạng nhện y = 2x/(1+x²)) — lõi chép sang đây.
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm THUẦN của tham số (tất định); nền, bóng mascot, ảnh lịch sử xử lý sinh MỘT lần (nạp / lần gọi đầu,
// canvas CPU). k ∈ [0, 1] là tiến độ hiện ra; mọi hàm có k đã thử ở 0.25/0.5/0.75/1 trên kit-test.html (LESSONS §89).
//
// LUẬT KIT GIỮ BẰNG CODE (LESSONS §95):
//  • Mọi hàm chữ (write, telop, wrong, title, actCard, nhãn ảnh, ô kính) ném lỗi khi chữ Nhật (Shippori / Noto Sans JP)
//    < 28 px, và khi hộp chữ (toạ độ cục bộ của lời gọi) ra ngoài vùng an toàn x 96–1824, y 64–1016 (CRAFT §5).
//    Miễn DUY NHẤT: { sup: true } cho phần chỉ gồm số/dấu (số mũ). Ký hiệu nguyên tố trên quả cầu không đi qua write.
//  • Màu nghĩa: ✗ đỏ CHỈ qua cross() / mismatch() / vết rạn gương; vàng Nobel CHỈ qua nobel() / nobelText().
//    write() ném lỗi khi nhận hex của hai màu này. 左/右 = C.L / C.R (hoặc '@L' / '@R') — luôn đi cùng VỊ TRÍ bên gương.
//  • Kicker từng hồi ở ACTS (actCard, title({ act })) — cảnh không tự viết. Gương CHỈ ở x = MX (mirror() không nhận x).
//  • Phân tử chỉ từ data/molecules (MOLS); vẽ file CHÍNH của cặp, bản gương = phản chiếu x → −x (mirror: true);
//    nhãn R/S do cip() tính từ hình học, kiểm với nhãn file lúc nạp (must).
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages, must } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';
import { MOUTHS } from '../../../assets/character-v2/mouths.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';
export const TAU = 2 * Math.PI;

// ═════════════════════════ bố cục cố định (DNA §1) ═════════════════════════
/** Đường gương — CÙNG một chỗ ở mọi cảnh. Đỉnh / chân gương, mép sau bàn. */
export const MX = 930, MIR_TOP = 168, MIR_FOOT = 905, BENCH = 842, MIR_W = 32;
export const MIR_CY = (MIR_TOP + MIR_FOOT) / 2;
/** Vùng an toàn chữ (CRAFT §5). */
export const SAFE = { x0: 96, x1: 1824, y0: 64, y1: 1016 };

// ═════════════════════════ bảng màu (DNA §2) ═════════════════════════
// Màu dùng tự do. L / R mang nghĩa VỊ TRÍ (trái / phải gương) — luôn đặt đúng phía. ✗ đỏ, vàng Nobel KHÔNG ở đây.
export const C = {
  bg: '#0E1424', bench: '#1B2338', silver: '#C9D2E0', text: '#EDE6D6', dim: '#AEB6C6', bone: '#8A93A6',
  L: '#F2A541', R: '#4BA3E3', glass: '#2A3246', lamp: '#31241A',
};
const BAD = '#F0605D';                                  // ✗ không khớp / sai — chỉ cross(), mismatch(), vết rạn
const NOBEL = '#E6C36A';                                // vàng Nobel — chỉ nobel(), nobelText()
export const MIN = '"Shippori Mincho"', JP = '"Noto Sans JP"';
/** Mọi mặt chữ kit và cảnh dùng — trang nạp đủ bằng Promise.all trước init (LESSONS §16, đua font). */
export const FONTS = [`700 40px ${MIN}`, `400 40px ${MIN}`, `400 40px ${JP}`, `500 40px ${JP}`, `700 40px ${JP}`, `900 40px ${JP}`];
export const FONT_SAMPLE = '鏡の中の分子右左手第一幕重ならない硤合憲三カガン歳年月日ノーベル化学賞0123456789%①②③↑→←×÷=＝²';
// Shippori THIẾU ⇌ α ≈ ∝ ₂ ₃ √ π θ χ ✓ ✗; Noto thiếu ₂ ₃ ✗ ί (DNA §3) — công thức bằng JP, chỉ số dưới / ✓ ✗ vẽ tay.
const NO_MIN = /[⇌α≠≈∝₂₃√πθχ✓✗]/u, NO_JP = /[₂₃✗ί]/u;

// tương phản đo bằng số (ném lỗi < 4.5): nền tường, mép bàn sáng nhất, đèn dầu (ERA note), ô kính
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const needC = (a, b, what, k = 4.5) => { const c = contrast(a, b); if (c < k) throw new Error(`kit: tương phản ${what} ${c.toFixed(2)} < ${k}`); };
for (const [k, v] of Object.entries({ text: C.text, dim: C.dim, bone: C.bone, L: C.L, R: C.R, silver: C.silver, nobel: NOBEL }))
  for (const [bn, b] of [['nền', C.bg], ['bàn', C.bench], ['đèn', C.lamp]]) needC(v, b, `${k}/${bn}`);
needC(BAD, C.bg, 'đỏ/nền'); needC(BAD, C.bench, 'đỏ/bàn'); needC(BAD, C.lamp, 'đỏ/đèn');
needC(C.text, C.glass, 'chữ/ô kính'); needC(C.dim, C.glass, 'phụ/ô kính');

/** Màu chữ: '@ink' (mặc định), '@dim', '@bone', '@L', '@R' — hoặc hex trung tính. ✗ đỏ / vàng Nobel bị chặn. */
export function ink(col) {
  if (col == null || col === '@ink') return C.text;
  if (col === '@dim') return C.dim;
  if (col === '@bone') return C.bone;
  if (col === '@L') return C.L;
  if (col === '@R') return C.R;
  if (col === '@bad' || col === '@nobel' || /^#?(F0605D|E6C36A)$/i.test(col)) throw new Error('kit: đỏ chỉ qua mismatch()/cross(), vàng chỉ qua nobelText()/nobel() (DNA §9)');
  return col;
}

// ═════════════════════════ hằng toán (mọi số lên hình qua must) ═════════════════════════
/** Mô hình tự xúc tác của kênh (KHÔNG phải số thí nghiệm — nhãn 「モデル」): đường cong Kagan y = 2x/(1+x²). */
export const f = x => 2 * x / (1 + x * x);
/** Dãy lặp x0, f(x0), f(f(x0)) … (n bước). */
export const iterate = (x0, n) => { const s = [x0]; for (let i = 0; i < n; i++) s.push(f(s[s.length - 1])); return s; };
export const MODEL = iterate(0.02, 7);
must(`[${MODEL.map(v => Math.round(v * 100))}].join()`, '2,4,8,16,31,56,86,99');
must(`${Math.abs(f(1) - 1) < 1e-12 && f(0) === 0}`, true);            // 0 và 1 là điểm cố định
/** Số của bài báo (CONTENT.md) — hằng số nguồn, KHÔNG tính: Soai 1995, 2 → 88% sau 4 vòng; 2003 sau 3 vòng. */
export const SOAI_1995 = [2, 10, 57, 81, 88];
export const SOAI_2003 = ['0.00005', '57', '99', '>99.5'];
/** Bảng hồi (kicker) — actCard / title({ act }) đọc ở đây (SCRIPT.md # ACT n). */
export const ACTS = [['第一幕', '鏡の中の分子'], ['第二幕', '体は鏡を見分ける'], ['第三幕', 'なぜ半分ずつになるのか'], ['第四幕', '紙の上の答え'],
  ['第五幕', '非線形効果'], ['第六幕', '自分をコピーする分子'], ['第七幕', 'コインを投げる'], ['第八幕', '薬はどう変わったのか'], ['第九幕', 'まとめ']];
/** Ba câu hỏi (mục lục lời hứa, a0 → まとめ lật ra câu trả lời) và ba điều kiện của Frank (e1, ô ①②③ đánh dấu e1/f3/g1). */
export const QUESTIONS = ['鏡の双子を、体はなぜ見分ける？', 'わずかな差が、なぜ「ほぼ全部」に？', 'この発見は、薬をどう変えた？'];
export const FRANK = ['片手の触媒で、右と左が不公平', '一方はでき、もう一方はおさえられる', 'できた分子が、自分を作る触媒になる'];

// ═════════════════════════ nền (vẽ MỘT lần mỗi ERA) ═════════════════════════
const BG = {};
function makeBench(lamp) {
  const c = mk(), x = c.getContext('2d');
  let gr = x.createLinearGradient(0, 0, 0, BENCH); gr.addColorStop(0, '#0B1020'); gr.addColorStop(1, '#131A2D'); x.fillStyle = gr; x.fillRect(0, 0, W, BENCH);
  gr = x.createRadialGradient(MX, 470, 40, MX, 470, 980); gr.addColorStop(0, 'rgba(120,140,180,0.13)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, W, BENCH);
  if (lamp) {                                          // ERA note (1848): đèn dầu ấm trên-trái hắt lên cùng tấm gương
    gr = x.createRadialGradient(330, 300, 20, 330, 300, 1100); gr.addColorStop(0, 'rgba(49,36,26,0.95)'); gr.addColorStop(0.45, 'rgba(40,30,22,0.55)'); gr.addColorStop(1, 'rgba(14,20,36,0)');
    x.fillStyle = gr; x.fillRect(0, 0, W, BENCH);
  }
  x.strokeStyle = lamp ? 'rgba(205,170,120,0.035)' : 'rgba(160,175,205,0.035)'; x.lineWidth = 1;           // ô gạch men tường lab rất mờ
  for (let y = 40; y < BENCH; y += 92) { x.beginPath(); x.moveTo(0, y + 0.5); x.lineTo(W, y + 0.5); x.stroke(); }
  for (let r = 0, y = 40; y < BENCH; y += 92, r++) for (let X = (r % 2) * 92 - 92; X < W; X += 184) { x.beginPath(); x.moveTo(X + 0.5, y); x.lineTo(X + 0.5, y + 92); x.stroke(); }
  gr = x.createLinearGradient(0, BENCH, 0, H); gr.addColorStop(0, '#1B2338'); gr.addColorStop(0.25, '#121A2C'); gr.addColorStop(1, '#090D18'); x.fillStyle = gr; x.fillRect(0, BENCH, W, H - BENCH);
  for (let i = 0; i < 70; i++) { const y = BENCH + 6 + (H - BENCH) * hash(i * 3.1) ** 1.6; x.fillStyle = `rgba(150,165,200,${0.015 + 0.02 * hash(i * 7.7)})`; x.fillRect(0, y, W, 1); }
  if (lamp) {                                          // sổ Pasteur mờ dưới bàn: giấy ngà, dòng kẻ, vài dòng chữ nghiêng (nét giả)
    x.save(); x.translate(470, BENCH + 50); x.transform(0.62, 0, -0.42, 0.22, 0, 0); x.globalAlpha = 0.30;
    x.fillStyle = '#CDBB96'; x.fillRect(0, 0, 900, 560); x.strokeStyle = '#4E3D27'; x.lineWidth = 2.5;
    for (let y = 60; y < 540; y += 46) { x.beginPath(); x.moveTo(30, y); x.lineTo(870, y); x.stroke(); }
    x.lineWidth = 5; for (let l = 0; l < 9; l++) { x.beginPath(); let px = 60; x.moveTo(px, 50 + l * 46);
      while (px < 800 - hash(l) * 300) { px += 14 + 10 * hash(px * 0.37 + l); x.lineTo(px, 50 + l * 46 - 6 * hash(px + l * 3)); } x.stroke(); }
    x.restore();
    gr = x.createRadialGradient(330, BENCH + 60, 10, 330, BENCH + 60, 700); gr.addColorStop(0, 'rgba(90,64,34,0.30)'); gr.addColorStop(1, 'rgba(90,64,34,0)');
    x.fillStyle = gr; x.fillRect(0, BENCH, W, H - BENCH);
  }
  x.fillStyle = 'rgba(201,210,224,0.20)'; x.fillRect(0, BENCH, W, 1.5);          // mép sau bàn bắt sáng
  gr = x.createRadialGradient(MX, MIR_FOOT + 10, 4, MX, MIR_FOOT + 10, 360); gr.addColorStop(0, 'rgba(201,210,224,0.20)'); gr.addColorStop(1, 'rgba(201,210,224,0)');
  x.save(); x.translate(MX, MIR_FOOT + 10); x.scale(1, 0.16); x.translate(-MX, -MIR_FOOT - 10); x.fillStyle = gr; x.fillRect(MX - 400, MIR_FOOT - 400, 800, 800); x.restore();
  const v = x.createRadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  return c;
}
/** Chất liệu theo ERA (khoá của static ERA). mirror = phòng lab tối (mặc định); note = 1848, đèn dầu (chỉ b1). */
export const ERA = { mirror: { bg: C.bg, ink: C.text, accent: C.silver, dim: C.dim }, note: { bg: C.lamp, ink: C.text, accent: C.L, dim: C.dim } };
/** Nền toàn khung của ERA. note: đèn dầu chập chờn rất nhẹ (hàm của t). lamp 0..1 (p2 mở: quầng đèn hiện dần). */
export function ground(g, era = 'mirror', t = 0, { lamp = 1 } = {}) {
  if (!BG[era]) throw new Error(`ground: ERA lạ "${era}" (có: ${Object.keys(ERA).join(', ')})`);
  g.drawImage(BG[era === 'note' && lamp <= 0 ? 'mirror' : era], 0, 0);
  if (era === 'note') {
    const fl = 0.92 + 0.05 * Math.sin(t * 7.3) + 0.03 * Math.sin(t * 13.1 + 1.7);
    const a = clamp(lamp) * (1 - fl) * 0.5 + (1 - clamp(lamp)) * 0.0;
    if (a > 0.005) { g.save(); g.fillStyle = `rgba(10,8,6,${a})`; g.fillRect(0, 0, W, BENCH); g.restore(); }
    if (lamp > 0 && lamp < 1) { g.save(); g.globalAlpha = 1 - clamp(lamp); g.drawImage(BG.mirror, 0, 0); g.restore(); }
  }
}
/** Tối dần về đen (on 1 = sáng, 0 = đen kín) — a0 cuối → intro; p2 đầu ← intro. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(0,0,0,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }
/** Zoom nhẹ quanh (fx, fy) — DNA §7: ≤ 1.6×, không xoay. Gọi trong g.save()/restore() của cảnh. */
export function zoom(g, z, fx = W / 2, fy = H / 2) {
  if (z > 1.6 + 1e-9) throw new Error(`zoom ${z} > 1.6 (DNA §7)`);
  g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
}
/** Bóng mềm của vật trên mặt bàn tại cx (bề rộng w). */
export function floorShadow(g, cx, w, { y = BENCH + 46, a = 0.55 } = {}) {
  const gr = g.createRadialGradient(cx, y, 2, cx, y, w);
  gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.save(); g.translate(cx, y); g.scale(1, 0.14); g.translate(-cx, -y); g.fillStyle = gr; g.fillRect(cx - w, y - w, 2 * w, 2 * w); g.restore();
}
/** Bóng soi trên mặt bàn bóng: gọi draw() lật dọc qua đường y = axis, alpha 0.12, rồi phủ dải mờ dần (DNA §2). */
export function benchReflect(g, axis, draw, { alpha = 0.12 } = {}) {
  g.save(); g.beginPath(); g.rect(0, BENCH, W, H - BENCH); g.clip();
  g.globalAlpha = alpha; g.translate(0, 2 * axis); g.scale(1, -1); draw(); g.restore();
  g.save(); const fade = g.createLinearGradient(0, BENCH, 0, H); fade.addColorStop(0, 'rgba(14,20,36,0)'); fade.addColorStop(1, 'rgba(9,13,24,0.9)');
  g.fillStyle = fade; g.fillRect(0, BENCH, W, H - BENCH); g.restore();
}

// ═════════════════════════ gương (vật xuyên suốt, DNA §1) ═════════════════════════
function crackPaths(cy, n, seed) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * TAU + hash(i * 3.3 + seed) * 0.6; let px = MX - 2 + 4 * hash(i * 9.1 + seed), py = cy;
    const len = 26 + 70 * hash(i * 1.9 + seed), pts = [[px, py]];
    for (let s = 1; s <= 4; s++) { const aa = a + (hash(i * 11 + s + seed) - 0.5) * 0.9; px += Math.cos(aa) * len / 4 * 0.55; py += Math.sin(aa) * len / 4 * 1.5; pts.push([px, py]); }
    return pts;
  });
}
function polyK(g, pts, k) {                             // polyline vẽ dần theo chiều dài
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let want = tot * clamp(k); g.beginPath(); g.moveTo(...pts[0]);
  for (let i = 1; i < pts.length && want > 0; i++) { const q = Math.min(1, want / L[i - 1]); g.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * q, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * q); want -= L[i - 1]; }
}
/**
 * Tấm gương ở x = MX (cùng chỗ mọi cảnh). opts (đều 0..1):
 *  crack: rạn khi bản sao KHÔNG chồng khít (tia gãy khúc lan dần từ cy, loé nhẹ lúc đầu); cy, n (số tia), seed
 *  lower: gương hạ xuống khe bàn (まとめ) — 1 = chỉ còn chân; fog: kính mờ (thalidomide); dim: tối đi (a0 → intro)
 *  k: dựng lên lúc vào (trồi từ khe bàn, như lower ngược). Trả về { x0, x1, top } của thân kính đang thấy.
 */
export function mirror(g, { crack = 0, cy = MIR_CY, n = 7, seed = 0, lower = 0, fog = 0, dim = 0, k = 1 } = {}) {
  const w = MIR_W, x0 = MX - w / 2, drop = (MIR_FOOT - MIR_TOP + 20) * Math.max(clamp(lower), 1 - clamp(k)) | 0, top = MIR_TOP + drop;
  const lit = 1 - clamp(dim);
  g.save();
  if (top < MIR_FOOT) {
    let gr = g.createLinearGradient(MX - 120, 0, MX + 120, 0);              // quầng sáng lạnh
    gr.addColorStop(0, 'rgba(201,210,224,0)'); gr.addColorStop(0.5, `rgba(201,210,224,${0.10 * lit * (1 - drop / (MIR_FOOT - MIR_TOP))})`); gr.addColorStop(1, 'rgba(201,210,224,0)');
    g.fillStyle = gr; g.fillRect(MX - 120, top, 240, MIR_FOOT - top);
    g.save(); g.beginPath(); g.rect(x0 - 30, 0, w + 60, MIR_FOOT - 2); g.clip();
    g.translate(0, drop);
    gr = g.createLinearGradient(x0, 0, x0 + w, 0);
    gr.addColorStop(0, '#4E576A'); gr.addColorStop(0.18, '#9AA4B6'); gr.addColorStop(0.42, '#F4F7FB'); gr.addColorStop(0.58, '#C9D2E0'); gr.addColorStop(0.85, '#7E889B'); gr.addColorStop(1, '#3E4658');
    g.fillStyle = gr; g.fillRect(x0, MIR_TOP, w, MIR_FOOT - MIR_TOP);
    for (let i = 0; i < 9; i++) { const y = MIR_TOP + (MIR_FOOT - MIR_TOP) * hash(i * 5.3 + 1), h = 30 + 120 * hash(i * 2.9);      // ánh căn phòng
      g.fillStyle = `rgba(255,255,255,${(0.10 + 0.18 * hash(i * 1.7)) * (1 - clamp(fog) * 0.8)})`; g.fillRect(x0 + 6 + 6 * hash(i), y, 2 + 3 * hash(i * 4.1), h); }
    if (fog > 0) {                                                            // kính mờ: lớp sương trắng xám + hạt
      g.fillStyle = `rgba(120,128,146,${0.75 * clamp(fog)})`; g.fillRect(x0, MIR_TOP, w, MIR_FOOT - MIR_TOP);
      for (let i = 0; i < 120; i++) { g.fillStyle = `rgba(230,234,240,${0.35 * clamp(fog) * hash(i * 2.1)})`; g.fillRect(x0 + w * hash(i * 7.7), MIR_TOP + (MIR_FOOT - MIR_TOP) * hash(i * 3.9), 2, 2); }
    }
    g.strokeStyle = 'rgba(14,20,36,0.7)'; g.lineWidth = 1; g.strokeRect(x0 + 0.5, MIR_TOP + 0.5, w - 1, MIR_FOOT - MIR_TOP - 1);
    if (crack > 0) {                                                          // rạn: tia lan dần, viền tối + lõi sáng
      g.save(); g.beginPath(); g.rect(x0, MIR_TOP, w, MIR_FOOT - MIR_TOP); g.clip(); g.lineCap = 'round';
      const P = crackPaths(cy, n, seed), kk = smooth(clamp(crack));
      for (const [lw, col] of [[2.6, 'rgba(14,20,36,0.85)'], [1.1, 'rgba(255,255,255,0.95)']]) { g.strokeStyle = col; g.lineWidth = lw; for (const p of P) { polyK(g, p, kk); g.stroke(); } }
      g.restore();
      const fl = Math.sin(Math.PI * clamp(crack * 2.5));                     // loé đỏ nhạt rồi trắng (lệch = sai)
      const r = g.createRadialGradient(MX, cy, 0, MX, cy, 46); r.addColorStop(0, `rgba(255,255,255,${0.35 * Math.max(fl, kk >= 1 ? 1 : 0)})`); r.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = r; g.fillRect(MX - 46, cy - 46, 92, 92);
      if (fl > 0.02) { const b = g.createRadialGradient(MX, cy, 0, MX, cy, 70); b.addColorStop(0, `rgba(240,96,93,${0.35 * fl})`); b.addColorStop(1, 'rgba(240,96,93,0)'); g.fillStyle = b; g.fillRect(MX - 70, cy - 70, 140, 140); }
    }
    if (dim > 0) { g.fillStyle = `rgba(6,9,16,${0.85 * clamp(dim)})`; g.fillRect(x0, MIR_TOP, w, MIR_FOOT - MIR_TOP); }
    const cap = (y, h, ww) => { const gg = g.createLinearGradient(0, y, 0, y + h); gg.addColorStop(0, '#5A6378'); gg.addColorStop(1, '#262D3F');
      g.fillStyle = gg; g.beginPath(); g.roundRect(MX - ww / 2, y, ww, h, 4); g.fill(); g.fillStyle = 'rgba(201,210,224,0.35)'; g.fillRect(MX - ww / 2 + 3, y + 1, ww - 6, 1.5); };
    cap(MIR_TOP - 12, 14, 40);
    g.restore();
  }
  // chân kẹp graphite (ở lại khi gương hạ) + khe
  const gg = g.createLinearGradient(0, MIR_FOOT - 10, 0, MIR_FOOT + 14); gg.addColorStop(0, '#5A6378'); gg.addColorStop(1, '#262D3F');
  g.fillStyle = gg; g.beginPath(); g.roundRect(MX - 55, MIR_FOOT - 10, 110, 24, 4); g.fill(); g.fillStyle = 'rgba(201,210,224,0.35)'; g.fillRect(MX - 52, MIR_FOOT - 9, 104, 1.5);
  if (drop > 0) { g.fillStyle = '#05070D'; g.fillRect(MX - w / 2 - 2, MIR_FOOT - 11, w + 4, 4); }
  if (top < MIR_FOOT) {                                                       // bóng soi của gương trên mặt bàn
    const a = 0.22 * lit * (1 - drop / (MIR_FOOT - MIR_TOP + 20));
    const gr = g.createLinearGradient(0, MIR_FOOT + 14, 0, MIR_FOOT + 130); gr.addColorStop(0, `rgba(201,210,224,${a})`); gr.addColorStop(1, 'rgba(201,210,224,0)');
    g.fillStyle = gr; g.fillRect(x0 + 3, MIR_FOOT + 14, w - 6, 116);
  }
  g.restore();
  return { x0, x1: x0 + w, top };
}

// ═════════════════════════ chữ ═════════════════════════
const JPF = /Shippori|Noto Sans JP/;
const pxOf = font => { const m = /(\d+(?:\.\d+)?)px/.exec(font); if (!m) throw new Error(`kit: font không có cỡ px: ${font}`); return +m[1]; };
/** Luật cỡ chữ Nhật ≥ 28 px (LESSONS §95) + ký tự font không có (DNA §3). Miễn cỡ: sup = true VÀ chỉ số/dấu. */
export function guard(font, s, sup = false) {
  if (/Shippori/.test(font) && NO_MIN.test(s)) throw new Error(`kit: Shippori thiếu ký tự trong "${s}" — dùng JP / vẽ tay (DNA §3)`);
  if (/Noto Sans JP/.test(font) && NO_JP.test(s)) throw new Error(`kit: Noto Sans JP thiếu ký tự trong "${s}" — vẽ tay (DNA §3)`);
  if (!JPF.test(font) || pxOf(font) >= 28) return;
  if (sup && /^[0-9.,+\-−×=%]+$/.test(s)) return;
  throw new Error(`kit: chữ Nhật ${pxOf(font)} px < 28 px: "${s}" (${font}) — LESSONS §95`);
}
/** Ném lỗi khi hộp chữ (toạ độ CỤC BỘ của lời gọi) ra ngoài vùng an toàn. */
export function safeBox(x0, y0, w, h, what = 'chữ') {
  const e = 0.5;
  if (x0 < SAFE.x0 - e || x0 + w > SAFE.x1 + e || y0 < SAFE.y0 - e || y0 + h > SAFE.y1 + e)
    throw new Error(`kit: ${what} ra ngoài vùng an toàn (x ${Math.round(x0)}–${Math.round(x0 + w)}, y ${Math.round(y0)}–${Math.round(y0 + h)}; cho phép x 96–1824, y 64–1016)`);
}
/** Đo một chuỗi với letterSpacing. */
export function measure(g, s, font, ls = 0) { g.save(); g.font = font; g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; g.restore(); return w; }
const norm = (parts, font, color) => (typeof parts === 'string' ? [[parts]] : parts).map(p => {
  const [s, f = font, c = color, o = {}] = p; return { s: String(s), f, c, rise: o.rise ?? 0, gap: o.gap ?? 0, sup: !!o.sup };
});
/**
 * Chữ VIẾT ra (DNA §9 — không fade): lộ từng ký tự theo k, ký tự đang viết lộ dần từ trái.
 * parts: chuỗi, hoặc [[chuỗi, font?, màu?, { rise, gap, sup }?], …] nhiều mặt chữ nối liền.
 * opts: font (mặc định 700 44px Noto), color ('@ink' | '@dim' | '@bone' | '@L' | '@R' | hex trung tính), align, ls,
 * shadow (bóng tối dưới chữ — mặc định có), safe (kiểm vùng an toàn — mặc định có; chỉ kit tắt cho bóng chữ ngược).
 * Trả về { x0, w, size, x, y, h } (h: hộp dòng — để đặt gạch / dấu).
 */
export function write(g, parts, x, y, k = 1, { font = `700 44px ${JP}`, color = '@ink', align = 'left', ls = 0, shadow = true, safe = true, _col = null } = {}) {
  const P = norm(parts, font, color);
  for (const p of P) guard(p.f, p.s, p.sup);
  const ws = P.map(p => measure(g, p.s, p.f, ls)), tot = ws.reduce((a, w, i) => a + w + P[i].gap, 0);
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const size = Math.max(...P.map(p => pxOf(p.f)));
  const box = { x0, w: tot, size, x: x0, y: y - size * 0.95, h: size * 1.25 };
  if (safe) safeBox(x0, y - size * 0.92, tot, size * 1.18);
  const N = P.reduce((a, p) => a + [...p.s].length, 0), m = N * clamp(k), full = Math.floor(m), frac = m - full;
  if (m <= 0) return box;
  let left = full, cx = x0;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  if (shadow) { g.shadowColor = 'rgba(5,8,16,0.85)'; g.shadowBlur = 6; g.shadowOffsetX = 2; g.shadowOffsetY = 3; }
  for (let i = 0; i < P.length; i++) {
    const p = P[i], ch = [...p.s], take = Math.min(left, ch.length), yy = y - p.rise;
    g.font = p.f; g.fillStyle = _col ?? ink(p.c);
    if (take > 0) g.fillText(ch.slice(0, take).join(''), cx, yy);
    if (take < ch.length && left === take && frac > 0) {
      const xa = cx + g.measureText(ch.slice(0, take).join('')).width, wc = g.measureText(ch[take]).width, fs = pxOf(p.f);
      g.save(); g.beginPath(); g.rect(xa - 2, yy - fs * 1.2, (wc + 2) * smooth(frac), fs * 1.6); g.clip(); g.fillText(ch[take], xa, yy); g.restore();
      left = 0; break;
    }
    left -= take; cx += ws[i] + p.gap;
    if (left <= 0) break;
  }
  g.restore();
  return box;
}
/** テロップ: Noto 700 (nhãn, số, %) hoặc { mincho: true } — Shippori 700 (từ khoá, thuật ngữ). Trả về hộp như write. */
export function telop(g, parts, x, y, k = 1, { size = 44, weight = 700, mincho = false, font = `${weight} ${size}px ${mincho ? MIN : JP}`, ...o } = {}) {
  return write(g, parts, x, y, k, { font, ...o });
}
/** Chữ SAI (hiểu lầm, DNA §1): xám #8A93A6; gạch bằng strike(g, hộp, k) rồi viết chữ đúng ngay dưới. */
export const wrong = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, color: '@bone' });
/** Một nét gạch xám qua hộp chữ (từ write/telop/wrong), vạch dần từ trái theo k. */
export function strike(g, box, k = 1, { w = 5 } = {}) {
  if (k <= 0) return;
  const y = box.y + box.h * 0.55, x0 = box.x - 8, x1 = box.x + box.w + 8, e = outCubic(clamp(k));
  g.save(); g.strokeStyle = C.bone; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y + 2); g.lineTo(x0 + (x1 - x0) * e, y - 2 * e); g.stroke(); g.restore();
}
/** Chữ "KHÔNG KHỚP" màu ✗ đỏ — chỉ cho khoảnh khắc lệch (DNA §2), hiếm. */
export const mismatch = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, _col: BAD });
/** Chữ vàng Nobel — CHỈ cho giải Nobel (DNA §2). */
export const nobelText = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, _col: NOBEL });

/**
 * Chữ LẬT GƯƠNG (DNA §3): từ mốc a viết ra NGƯỢC gương (0.3 s), rồi lật scaleX −1 → 1 trong 0.5 s (hàm của t).
 * Trước a: không vẽ. opts như write; ghost: bóng chữ ngược mờ (alpha 0.16) đối xứng qua gương (chữ nằm một bên gương).
 */
export function flipWrite(g, parts, x, y, t, a, { ghost = false, ...o } = {}) {
  if (t < a) return write(g, parts, x, y, 0, o);
  const kw = prog(t, a, a + 0.3), kf = smooth(prog(t, a + 0.3, a + 0.8)), sx = -Math.cos(Math.PI * kf);
  const box = write(g, parts, x, y, 0, o), cx = box.x0 + box.w / 2;
  if (ghost && kf >= 1) {
    g.save(); g.translate(2 * MX, 0); g.scale(-1, 1); g.globalAlpha = 0.16;
    write(g, parts, x, y, 1, { ...o, shadow: false, safe: false, _col: C.silver }); g.restore();
  }
  g.save(); g.translate(cx, 0); g.scale(Math.abs(sx) < 0.02 ? 0.02 * Math.sign(sx || 1) : sx, 1); g.translate(-cx, 0);
  write(g, parts, x, y, kw, o); g.restore();
  return box;
}
/**
 * Tiêu đề cảnh (Shippori 700) bên TRÁI gương, canh phải về MX − 44, lật gương từ mốc a; bóng chữ ngược bên phải gương;
 * gạch hổ phách ngắn dưới chữ. act (1..9): dòng kicker 「第n幕　tên hồi」 28 px phía trên (ACTS). Trả về hộp.
 */
export function title(g, s, t, a, { size = 62, y = 166, act = 0 } = {}) {
  const font = `700 ${size}px ${MIN}`, w = measure(g, s, font), x = MX - 44 - w;
  if (act) { const [k1, k2] = ACTS[act - 1]; write(g, `${k1}　${k2}`, MX - 44, y - size - 4, prog(t, a, a + 0.4), { font: `500 28px ${JP}`, color: '@dim', align: 'right', ls: 3 }); }
  const box = flipWrite(g, s, x, y, t, a, { font, ghost: true });
  const kl = prog(t, a + 0.7, a + 1.0);
  if (kl > 0) { g.fillStyle = C.L; g.fillRect(x, y + 18, 54 * outCubic(kl), 3); }
  return box;
}

// ═════════════════════════ thẻ hồi ═════════════════════════
/** Mốc thẻ hồi tính từ FROM THẬT (LESSONS §82): viết từ a = max(START − 2.4, FROM + 0.95), rút đi quanh START. */
export const actTimes = (FROM, START) => { const a = Math.max(START - 2.4, FROM + 0.95); return { a, o0: Math.max(START + 0.35, a + 1.6), o1: Math.max(START + 0.95, a + 2.2) }; };
/** Tiếng thẻ hồi (impact nhẹ lúc tấm kính vào + shimmer lúc chữ lật) — cộng vào sfx() của cảnh mở hồi. */
export const actCues = (FROM, START) => { const { a } = actTimes(FROM, START); return [{ t: +a.toFixed(3), kind: 'impact', db: -4 }, { t: +(a + 0.75).toFixed(3), kind: 'shimmer' }]; };
/** Thẻ HỒI giữa khung: tấm kính tối viền bạc hạ xuống trước gương; 「第n幕」 + tên hồi 明朝 lớn viết ngược rồi lật. */
export function actCard(g, t, FROM, START, act) {
  const { a, o0, o1 } = actTimes(FROM, START), [kick, name] = ACTS[act - 1];
  if (t < a - 0.05 || t > o1) return;
  const tw = measure(g, name, `700 84px ${MIN}`, 4), w = Math.max(860, tw + 200), h = 330, x = (W - w) / 2, y = 330;
  if (x < SAFE.x0) throw new Error(`actCard: tên hồi "${name}" quá rộng`);
  const kin = outCubic(prog(t, a - 0.05, a + 0.4)), kout = outCubic(prog(t, o0, o1));
  const dy = Math.round(-(1 - kin) * (y + h + 40) + kout * (H - y + 40));
  g.save(); g.translate(0, dy);
  g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 40; g.shadowOffsetY = 16; g.fillStyle = 'rgba(16,22,38,0.94)'; g.fillRect(x, y, w, h); g.restore();
  const sh = g.createLinearGradient(x, y, x + w, y + h); sh.addColorStop(0, 'rgba(201,210,224,0.10)'); sh.addColorStop(0.45, 'rgba(201,210,224,0.02)'); sh.addColorStop(1, 'rgba(201,210,224,0.06)');
  g.fillStyle = sh; g.fillRect(x, y, w, h);
  g.strokeStyle = C.silver; g.lineWidth = 2; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  g.strokeStyle = 'rgba(201,210,224,0.35)'; g.lineWidth = 1; g.strokeRect(x + 14.5, y + 14.5, w - 29, h - 29);
  write(g, kick, W / 2, y + 108, prog(t, a + 0.2, a + 0.55), { font: `700 40px ${MIN}`, align: 'center', ls: 16, color: '@dim' });
  flipWrite(g, name, W / 2, y + 236, t, a + 0.45, { font: `700 84px ${MIN}`, align: 'center', ls: 4 });
  g.restore();
}

// ═════════════════════════ dấu, mũi tên ═════════════════════════
/** ✓ khớp — nét tay màu chữ (trung tính), vẽ dần theo k. */
export function tick(g, x, y, s = 16, k = 1, { color = C.text, w = 5 } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  polyK(g, [[x - s * 0.7, y], [x - s * 0.15, y + s * 0.6], [x + s * 0.8, y - s * 0.6]], k); g.stroke(); g.restore();
}
/** ✗ không khớp — ĐỎ (màu nghĩa duy nhất), hai nét vẽ dần theo k. */
export function cross(g, x, y, s = 14, k = 1, { w = 5.5 } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = BAD; g.lineWidth = w; g.lineCap = 'round';
  polyK(g, [[x - s, y - s], [x + s, y + s]], clamp(k * 2)); g.stroke();
  if (k > 0.5) { polyK(g, [[x + s, y - s], [x - s, y + s]], clamp(k * 2 - 1)); g.stroke(); }
  g.restore();
}
/** Huy hiệu tròn tối sau dấu ✓ / ✗ / số. */
export function badge(g, x, y, r, { stroke = null } = {}) {
  g.save(); g.fillStyle = 'rgba(10,14,26,0.88)'; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  if (stroke) { g.strokeStyle = stroke; g.lineWidth = 2; g.stroke(); } g.restore();
}
/** Mũi tên: pts = [a, b] thẳng hoặc [a, điều khiển, b] cong; vẽ dần theo k; đầu tam giác khi k ≥ 0.85. Màu trung tính / L / R. */
export function arrow(g, pts, k = 1, { color = C.dim, w = 4, head = 16 } = {}) {
  if (k <= 0) return;
  const P = pts.length === 3 ? Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) ** 2, b = 2 * u * (1 - u), c = u * u;
    return [a * pts[0][0] + b * pts[1][0] + c * pts[2][0], a * pts[0][1] + b * pts[1][1] + c * pts[2][1]]; }) : pts;
  g.save(); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  polyK(g, P, k); g.stroke();
  if (k >= 0.85) { const e = P[P.length - 1], q = P[P.length - 2], an = Math.atan2(e[1] - q[1], e[0] - q[0]), hs = head * clamp((k - 0.85) / 0.15);
    g.beginPath(); g.moveTo(e[0] + Math.cos(an) * 4, e[1] + Math.sin(an) * 4); g.lineTo(e[0] - Math.cos(an - 0.45) * hs, e[1] - Math.sin(an - 0.45) * hs);
    g.lineTo(e[0] - Math.cos(an + 0.45) * hs, e[1] - Math.sin(an + 0.45) * hs); g.fill(); }
  g.restore();
}

// ═════════════════════════ phân tử (data/molecules, DNA §2) ═════════════════════════
const EL = {
  H: { c: '#E6EAF0', r: 0.30, ink: C.bg }, C: { c: '#4A5366', r: 0.40, ink: C.text }, O: { c: '#D9705F', r: 0.40, ink: C.bg },
  N: { c: '#6C8CE0', r: 0.40, ink: C.bg }, F: { c: '#C3DE72', r: 0.40, ink: C.bg }, Cl: { c: '#3FA468', r: 0.50, ink: C.bg }, Br: { c: '#9A5234', r: 0.56, ink: C.text },
};
for (const [k, e] of Object.entries(EL)) needC(e.ink, e.c, 'chữ trên ' + k);
const Z = { H: 1, C: 6, N: 7, O: 8, F: 9, Cl: 17, Br: 35 };
/** Cặp phân tử: file CHÍNH (vẽ) + file đối tác (chỉ để kiểm lúc nạp). Bản gương trên hình = phản chiếu x → −x của file chính. */
export const MOLS = {
  'R-CHFClBr': 'S-CHFClBr', 'L-alanine': 'D-alanine', 'R-carvone': 'S-carvone', 'R-thalidomide': 'S-thalidomide',
  'L-tartaric_2R3R': 'D-tartaric_2S3S', 'R-soai1995': 'S-soai1995', 'R-soai-methyl': 'S-soai-methyl', 'R-soai-alkynyl': 'S-soai-alkynyl',
};
const MOL = {};
// vector
const vsub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], vdot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const vcross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const vnorm = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
const mmul = (M, v) => M.map(r => vdot(r, v));
const mm = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
const mT = M => [0, 1, 2].map(i => M.map(r => r[i]));
export const rotY = a => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
export const rotX = a => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
export const rotZ = a => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
const frameOf = (u, v) => { const e1 = vnorm(u), e2 = vnorm(vsub(v, e1.map(x => x * vdot(v, e1)))); return [e1, e2, vcross(e1, e2)]; };
// góc nhìn gốc của từng phân tử: CHFClBr = góc của bàn thử (lưới góc: 4 nhóm toả thành tứ diện, không quả nào che quả nào);
// còn lại = trục quán tính (PCA, det +1 — không lật tay) để phân tử trải phẳng trước camera.
const VIEWS = { 'R-CHFClBr': mm(rotZ(5.4978), mm(rotX(0.1309), rotY(1.1781))) };
function pcaView(atoms) {
  const P = atoms.filter(a => a.el !== 'H').map(a => [a.x, a.y, a.z]), n = P.length, m = [0, 1, 2].map(i => P.reduce((s, p) => s + p[i], 0) / n);
  const S = [0, 1, 2].map(i => [0, 1, 2].map(j => P.reduce((s, p) => s + (p[i] - m[i]) * (p[j] - m[j]), 0)));
  const power = (M, v0) => { let v = v0; for (let i = 0; i < 60; i++) v = vnorm(mmul(M, v)); return v; };
  const e1 = power(S, vnorm([1, 0.3, 0.1])), l1 = vdot(e1, mmul(S, e1));
  const S2 = S.map((r, i) => r.map((x, j) => x - l1 * e1[i] * e1[j])), e2r = power(S2, vnorm([0.2, 1, 0.3]));
  const e2 = vnorm(vsub(e2r, e1.map(x => x * vdot(e2r, e1)))), e3 = vcross(e1, e2);
  return [e1, e2, e3];
}
/**
 * Nhãn CIP R/S của tâm lập thể `center` (chỉ số nguyên tử) TỪ HÌNH HỌC: ưu tiên theo số hiệu nguyên tử từng tầng
 * (đồ thị phân cấp, liên kết đôi nhân bản), nhìn từ phía đối diện nhóm thấp nhất, a → b → c theo chiều kim đồng hồ ⇔ R
 * ⇔ (a×b + b×c + c×a)·d > 0 (bàn thử). atoms: [{ el, p: [x,y,z] }]; bonds: [{ a, b, order }].
 */
export function cip(atoms, bonds, center) {
  const nb = atoms.map(() => []);
  for (const b of bonds) for (let o = 0; o < Math.max(1, Math.round(b.order)); o++) { nb[b.a].push({ to: b.b, dup: o > 0 }); nb[b.b].push({ to: b.a, dup: o > 0 }); }
  // nút cây: { z, kids() } — nút nhân bản (dup) có z của nguyên tử đích, con là "ma" z = 0
  const node = (i, from, dup, depth) => ({ z: Z[atoms[i].el], kids: () => {
    if (dup || depth > 7) return [];
    const ks = nb[i].filter(e => !(e.to === from && !e.dup)).map(e => node(e.to, i, e.dup, depth + 1));
    while (ks.length < 3 && atoms[i].el !== 'H') ks.push({ z: 0, kids: () => [] });
    return ks.sort((p, q) => cmp(q, p));
  } });
  // so hai nhánh theo từng tầng (BFS), nhóm theo thứ tự hạng của cha
  function cmp(A, B) {
    let la = [A], lb = [B];
    for (let d = 0; d < 8; d++) {
      const za = la.map(n => n.z), zb = lb.map(n => n.z);
      for (let i = 0; i < Math.max(za.length, zb.length); i++) { const x = za[i] ?? -1, y = zb[i] ?? -1; if (x !== y) return x - y; }
      la = la.flatMap(n => n.kids()); lb = lb.flatMap(n => n.kids());
      if (!la.length && !lb.length) return 0;
    }
    return 0;
  }
  const subs = nb[center].filter(e => !e.dup).map(e => ({ i: e.to, n: node(e.to, center, false, 1) }));
  if (subs.length !== 4) throw new Error(`cip: nguyên tử ${center} không có 4 nhóm thế`);
  subs.sort((p, q) => cmp(q.n, p.n));
  for (let i = 0; i < 3; i++) if (cmp(subs[i].n, subs[i + 1].n) === 0) throw new Error(`cip: hai nhóm thế bằng hạng ở nguyên tử ${center} — không phải tâm lập thể`);
  const c = atoms[center].p, [a, b, cc, d] = subs.map(s => vsub(atoms[s.i].p, c));
  const n = [vcross(a, b), vcross(b, cc), vcross(cc, a)].reduce((s, v) => s.map((x, i) => x + v[i]));
  return vdot(n, d) > 0 ? 'R' : 'S';
}
const asAtoms = m => m.atoms.map(a => ({ el: a.el, p: [a.x, a.y, a.z] }));
const mirrorX = atoms => atoms.map(a => ({ el: a.el, p: [-a.p[0], a.p[1], a.p[2]] }));
/** Nhãn R/S mọi tâm của phân tử key (file chính) — mirror: true cho bản gương. [{ atom, cip }]. */
export function stereo(key, { mirror = false } = {}) {
  const m = molData(key), A = mirror ? mirrorX(asAtoms(m)) : asAtoms(m);
  return m.stereo.map(s => ({ atom: s.atom, cip: cip(A, m.bonds, s.atom) }));
}
function molData(key) {
  if (!MOLS[key]) { const prim = Object.keys(MOLS).find(k => MOLS[k] === key);
    throw new Error(prim ? `molecule: vẽ file chính "${prim}" với { mirror: true }, không vẽ "${key}" (DNA §9)` : `molecule: không có "${key}" trong data/molecules (MOLS)`); }
  const m = MOL[key]; if (!m) throw new Error(`molecule: chưa nạp "${key}" (loadKit)`); return m;
}
/** Toạ độ đã xoay (không gian nhìn) của phân tử: base view × rotX(tilt) × rotY(rot); mirror → x → −x SAU khi xoay. */
export function placeMol(key, { rot = 0, tilt = 0, mirror = false } = {}) {
  const m = molData(key), V = mm(rotY(rot), mm(rotX(tilt), m.view));
  const A = m.atoms.map(a => ({ el: a.el, p: mmul(V, [a.x, a.y, a.z]) }));
  return mirror ? mirrorX(A) : A;
}
/**
 * Bản XOAY THỬ (khung lab 0): xoay bản trái quanh tâm lập thể cho hai nhóm elA, elB trùng ảnh gương → các nhóm còn lại
 * lệch. Trả về { atoms (không gian nhìn, đặt tại tâm bản gương), fit: [chỉ số trùng], miss: [chỉ số lệch] } — must sẵn.
 */
export function trialFit(key, { elA = 'H', elB = 'Br', ...view } = {}) {
  const m = molData(key), left = placeMol(key, view), right = mirrorX(left), ci = m.stereo[0].atom;
  const cL = left[ci].p, cR = right[ci].p, iA = left.findIndex(a => a.el === elA), iB = left.findIndex(a => a.el === elB);
  const FL = frameOf(vsub(left[iA].p, cL), vsub(left[iB].p, cL)), FR = frameOf(vsub(right[iA].p, cR), vsub(right[iB].p, cR)), Rm = mm(mT(FR), FL);
  const atoms = left.map(a => ({ el: a.el, p: mmul(Rm, vsub(a.p, cL)).map((v, i) => v + cR[i]) }));
  const near = (i, j) => Math.hypot(...vsub(atoms[i].p, right[j].p)) < 0.05;
  const fit = [], miss = [];
  left.forEach((a, i) => { if (i === ci) return; (near(i, i) ? fit : miss).push(i); });
  must(`${fit.length === 2 && near(iA, iA) && near(iB, iB)}`, true);
  must(`'${cip(atoms, m.bonds, ci)}'`, cip(left, m.bonds, ci));                      // xoay xong vẫn cùng tay — không thành ảnh gương
  return { atoms, fit, miss };
}
const proj = (p, cx, cy, s, D) => { const k = D / (D - p[2]); return { x: cx + p[0] * s * k, y: cy - p[1] * s * k, k }; };
/**
 * Phân tử bóng-que chiếu phối cảnh, sắp theo chiều sâu. key = file CHÍNH (MOLS). opts:
 *  x, y (tâm), scale (px / Å), rot (quanh trục đứng — hàm của t để tự xoay chậm), tilt, mirror (bản gương x → −x),
 *  glow 'L' | 'R' (viền sáng theo phía; mặc định mirror ? 'R' : 'L'), k (bật ra), hideH, ghost (vỏ kính nét đứt, không que),
 *  ghost: true | { letters: ['F', 'Cl'] } (nhãn bóng + ✗ cho nhóm lệch), atoms (toạ độ nhìn thay thế — vd trialFit().atoms). Ký hiệu nguyên tố khi quả cầu ≥ 40 px (đường kính).
 * Trả về [{ x, y, r, el }] theo chỉ số nguyên tử (để gắn nhãn / dấu).
 */
export function molecule(g, key, { x = MX, y = 480, scale = 120, rot = 0, tilt = 0, mirror = false, glow = mirror ? 'R' : 'L', k = 1, hideH = false, ghost = false, atoms = null } = {}) {
  const m = molData(key), A = atoms ?? placeMol(key, { rot, tilt, mirror }), out = [];
  if (k <= 0) return out;
  const s = scale * outBack(clamp(k)), D = m.D, rim = glow === 'R' ? C.R : C.L;
  const show = i => !(hideH && A[i].el === 'H');
  const P = A.map(a => proj(a.p, x, y, s, D)), items = [];
  if (!ghost) m.bonds.forEach(b => { if (!show(b.a) || !show(b.b)) return; const pa = A[b.a].p, pb = A[b.b].p, mid = pa.map((v, i) => (v + pb[i]) / 2);
    items.push({ z: (pa[2] + mid[2]) / 2 - 0.05, bond: b, half: 0 }, { z: (pb[2] + mid[2]) / 2 - 0.05, bond: b, half: 1 }); });
  A.forEach((a, i) => { if (show(i)) items.push({ z: a.p[2], atom: i }); });
  items.sort((p, q) => p.z - q.z);
  g.save(); g.lineCap = 'round';
  for (const it of items) {
    if (it.bond) {
      const { a, b, order } = it.bond, PA = P[a], PB = P[b], M = { x: (PA.x + PB.x) / 2, y: (PA.y + PB.y) / 2 };
      const L = Math.hypot(PB.x - PA.x, PB.y - PA.y) || 1, ux = (PB.x - PA.x) / L, uy = (PB.y - PA.y) / L;
      const ra = EL[A[a].el].r * s * PA.k * 0.72, rb = EL[A[b].el].r * s * PB.k * 0.72;
      const [u, v] = it.half ? [M, { x: PB.x - ux * rb, y: PB.y - uy * rb }] : [{ x: PA.x + ux * ra, y: PA.y + uy * ra }, M];
      const wb = Math.max(3, s * 0.063), offs = order === 3 ? [-wb, 0, wb] : order === 2 ? [-wb * 0.62, wb * 0.62] : [0];   // 1.5 (thơm) vẽ đơn
      for (const o of offs) {
        const ox = -uy * o, oy = ux * o, ww = order >= 2 ? wb * 0.62 : wb;
        g.strokeStyle = '#2A3246'; g.lineWidth = ww + 7 * s / 142; g.beginPath(); g.moveTo(u.x + ox, u.y + oy); g.lineTo(v.x + ox, v.y + oy); g.stroke();
        g.strokeStyle = C.bone; g.lineWidth = ww; g.beginPath(); g.moveTo(u.x + ox, u.y + oy); g.lineTo(v.x + ox, v.y + oy); g.stroke();
        g.strokeStyle = 'rgba(255,255,255,0.28)'; g.lineWidth = Math.max(1, ww * 0.28); g.beginPath(); g.moveTo(u.x + ox - 2, u.y + oy - 2); g.lineTo(v.x + ox - 2, v.y + oy - 2); g.stroke();
      }
      continue;
    }
    const a = A[it.atom], e = EL[a.el]; if (!e) throw new Error(`molecule: nguyên tố "${a.el}" chưa có màu (EL)`);
    const q = P[it.atom], r = e.r * s * q.k;
    out[it.atom] = { x: q.x, y: q.y, r, el: a.el };
    if (ghost) {
      g.save(); g.fillStyle = glow === 'R' ? 'rgba(75,163,227,0.10)' : 'rgba(242,165,65,0.10)'; g.beginPath(); g.arc(q.x, q.y, r, 0, TAU); g.fill();
      g.setLineDash([9, 7]); g.strokeStyle = rim; g.lineWidth = 3; g.stroke(); g.restore();
      if (ghost.letters?.includes(a.el) && k >= 1) {                     // nhãn bóng: ký hiệu của bản xoay thử + ✗ (lệch chỗ)
        const fs = Math.max(28, Math.round(r * 0.62)), lx = q.x + r * 0.55, ly = q.y - r * 0.62, br = fs * 0.68;
        g.save(); g.font = `700 ${fs}px ${JP}`; const tw = g.measureText(a.el).width;
        g.fillStyle = 'rgba(10,14,26,0.92)'; g.beginPath(); g.roundRect(lx - br, ly - br, tw + 2 * br + 34, 2 * br, br); g.fill();
        g.strokeStyle = BAD; g.lineWidth = 2; g.stroke(); g.fillStyle = rim; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(a.el, lx - br * 0.45, ly + 1); g.restore();
        cross(g, lx + tw + br * 0.2 + 12, ly, 9);
      }
      continue;
    }
    const gr = g.createRadialGradient(q.x - r * 0.38, q.y - r * 0.42, r * 0.08, q.x, q.y, r);
    gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.22, e.c); gr.addColorStop(0.85, e.c); gr.addColorStop(1, '#151B2B');
    g.fillStyle = gr; g.beginPath(); g.arc(q.x, q.y, r, 0, TAU); g.fill();
    g.save(); g.strokeStyle = rim; g.lineWidth = Math.max(1.5, 3 * s / 142); g.globalAlpha = 0.9; g.beginPath();      // viền sáng phía gương
    glow === 'L' ? g.arc(q.x, q.y, Math.max(0.1, r - 1.5), -1.0, 0.9) : g.arc(q.x, q.y, Math.max(0.1, r - 1.5), Math.PI - 0.9, Math.PI + 1.0); g.stroke(); g.restore();
    if (2 * r >= 40) { g.font = `700 ${Math.round(r * (a.el.length > 1 ? 0.78 : 0.95))}px ${JP}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = e.ink; g.fillText(a.el, q.x + 1, q.y + 2); }
  }
  g.restore();
  return out;
}

// ═════════════════════════ đồ thị đối xứng (gương = trục dọc, DNA §1 hồi 5/6/8) ═════════════════════════
/**
 * Đồ thị 左100% … 0 … 右100%: trục dọc CHÍNH LÀ gương (ox = MX). x ∈ [−1, 1] (trái = 左), y ∈ [0, 1].
 * opts: axes (k lưới + trục + nhãn), line (k đường thẳng y = |x|, nét đứt xương), curve (k đường cong y = f(|x|), hổ phách /
 *  azure hai phía), web { x0, k (0..1 qua n bước), n = 7, echo (bản gương hổ phách mờ), dots, labels (% ở bước ≥ 4) },
 *  oy, pw, ph, xLabel, yLabel, mirror (vẽ gương — mặc định có). Trả về { sx, sy, iter }.
 */
export function graph(g, { axes = 1, line = 0, curve = 0, web = null, oy = 800, pw = 400, ph = 500, mirror: drawMirror = true,
  xLabel = '触媒のかたより', yLabel = '↑ できた分子のかたより' } = {}) {
  const ox = MX, sx = v => ox + v * pw, sy = v => oy - v * ph;
  const ka = clamp(axes);
  if (ka > 0) {
    g.save(); g.strokeStyle = `rgba(138,147,166,${0.16 * ka})`; g.lineWidth = 1;
    for (const v of [0.25, 0.5, 0.75, 1]) { g.beginPath(); g.moveTo(sx(-1), sy(v)); g.lineTo(sx(1), sy(v)); g.stroke(); }
    for (const v of [-1, -0.75, -0.5, -0.25, 0.25, 0.5, 0.75, 1]) { g.beginPath(); g.moveTo(sx(v), sy(0)); g.lineTo(sx(v), sy(ka)); g.stroke(); }
    g.strokeStyle = C.bone; g.lineWidth = 2.5; g.beginPath(); g.moveTo(sx(-1.04 * ka), sy(0)); g.lineTo(sx(1.04 * ka), sy(0)); g.stroke(); g.restore();
  }
  if (drawMirror) mirror(g);
  const half = (fn, col, lw, k, dash = []) => { if (k <= 0) return; g.save(); g.strokeStyle = col; g.lineWidth = lw; g.setLineDash(dash); g.lineJoin = 'round'; g.lineCap = 'round';
    for (const sgn of [-1, 1]) { if (Array.isArray(col)) g.strokeStyle = sgn < 0 ? col[0] : col[1]; g.beginPath(); const N = Math.max(2, Math.round(200 * clamp(k)));
      for (let i = 0; i <= N; i++) { const v = i / 200; i ? g.lineTo(sx(sgn * v), sy(fn(v))) : g.moveTo(sx(sgn * v), sy(fn(v))); } g.stroke(); } g.restore(); };
  half(v => v, C.bone, 3, line, [10, 8]);
  let iter = null;
  if (web) {
    const n = web.n ?? 7; iter = iterate(web.x0, n);
    const steps = n * clamp(web.k ?? 1);
    const draw = (sgn, col, alpha) => { if (steps <= 0) return; g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = 3; g.lineJoin = 'round'; g.beginPath();
      let x = iter[0]; g.moveTo(sx(sgn * x), sy(0));
      for (let i = 0; i < Math.ceil(steps); i++) { const y = f(x), q = clamp(steps - i);
        const up = clamp(q * 2), across = clamp(q * 2 - 1);
        g.lineTo(sx(sgn * x), sy(i === 0 ? y * up : x + (y - x) * up)); if (up >= 1) g.lineTo(sx(sgn * (x + (y - x) * across)), sy(y)); x = y; }
      g.stroke(); g.restore(); };
    if (web.echo !== false) draw(-1, C.L, 0.55);
    draw(1, C.R, 1);
  }
  half(f, [C.L, C.R], 5, curve);
  if (web && web.dots !== false) {
    const done = Math.floor((web.n ?? 7) * clamp(web.k ?? 1));
    for (let i = 1; i <= done; i++) { const v = iter[i]; g.fillStyle = C.text; g.beginPath(); g.arc(sx(v), sy(v), 5.5, 0, TAU); g.fill();
      if (web.labels !== false && i >= 4) write(g, `${Math.round(v * 100)}%`, sx(v) + 16, sy(v) + (i >= 6 ? 12 : 34), 1, { font: `700 28px ${JP}`, color: '@R' }); }
  }
  if (ka >= 1) {
    write(g, yLabel, ox + 30, sy(1) - 52, 1, { font: `500 30px ${JP}` });
    for (const v of [0.5, 1]) write(g, `${v * 100}%`, ox + 18, sy(v) + 10, 1, { font: `500 28px ${JP}`, color: '@dim' });
    badge(g, ox, oy + 30, 22); write(g, '0', ox, oy + 40, 1, { font: `700 28px ${JP}`, align: 'center', shadow: false });
    write(g, '左 100%', sx(-1), oy + 40, 1, { font: `700 28px ${JP}`, color: '@L', align: 'center' });
    write(g, '右 100%', sx(1), oy + 40, 1, { font: `700 28px ${JP}`, color: '@R', align: 'center' });
    if (xLabel) for (const sgn of [-1, 1]) write(g, xLabel, sx(sgn * 0.5), oy + 40, 1, { font: `500 28px ${JP}`, align: 'center' });
  }
  return { sx, sy, iter };
}

// ═════════════════════════ ô kính ①②③ (mục lục a0 / điều kiện Frank / まとめ) ═════════════════════════
/** Vị trí ba ô dọc mép phải gương (mặc định). */
export const PANES = { x: MX + 60, w: 1824 - (MX + 60), y0: 214, h: 150, gap: 40 };
/**
 * Một ô kính khắc chữ: n (1..3) số trong vòng, text viết vào theo kText. k: trượt ra từ mép gương + ánh kính.
 * tick 0..1: ✓ vẽ dần (đánh dấu điều kiện — chuông suzu). flip 0..1: lật quanh trục ngang ra mặt sau `back` (câu trả lời).
 * size chữ ≥ 28; chữ quá dài cho ô → ném lỗi. Trả về { x, y, w, h }.
 */
export function pane(g, n, x, y, w, h, k = 1, { text = '', kText = null, tick: kt = 0, flip = 0, back = '', kBack = 1, size = 36 } = {}) {
  const box = { x, y, w, h };
  if (k <= 0) return box;
  const font = `700 ${size}px ${MIN}`, tx = x + 104, room = w - 104 - 76;
  for (const s of [text, back]) if (s && measure(g, s, NO_MIN.test(s) ? `700 ${size}px ${JP}` : font) > room) throw new Error(`pane: "${s}" rộng hơn ô (${Math.round(room)} px)`);
  const e = outCubic(clamp(k)), dx = Math.round((1 - e) * -(x - MX + 20)), sy = Math.cos(Math.PI * clamp(flip)), showBack = flip > 0.5;
  g.save(); g.beginPath(); g.rect(MX + MIR_W / 2, 0, W, H); g.clip();         // trượt ra TỪ sau gương
  g.translate(dx, y + h / 2); g.scale(1, Math.max(0.02, Math.abs(sy))); g.translate(0, -(y + h / 2));
  g.fillStyle = 'rgba(42,50,70,0.78)'; g.fillRect(x, y, w, h);
  const sh = g.createLinearGradient(x, y, x + w * 0.6, y + h); sh.addColorStop(0, 'rgba(201,210,224,0.16)'); sh.addColorStop(0.5, 'rgba(201,210,224,0.03)'); sh.addColorStop(1, 'rgba(201,210,224,0.07)');
  g.fillStyle = sh; g.fillRect(x, y, w, h);
  g.strokeStyle = 'rgba(201,210,224,0.75)'; g.lineWidth = 1.5; g.strokeRect(x + 0.75, y + 0.75, w - 1.5, h - 1.5);
  g.fillStyle = 'rgba(255,255,255,0.30)'; g.fillRect(x + 2, y + 2, w - 4, 1.5);
  const cx = x + 52, cy = y + h / 2;
  g.strokeStyle = C.silver; g.lineWidth = 2.5; g.beginPath(); g.arc(cx, cy, 28, 0, TAU); g.stroke();
  g.font = `700 36px ${JP}`; g.fillStyle = C.text; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), cx, cy + 2);
  const s = showBack ? back : text;
  if (s) write(g, s, tx, cy + size * 0.36, showBack ? kBack : (kText ?? clamp(k * 1.4 - 0.4)), { font: NO_MIN.test(s) ? `700 ${size}px ${JP}` : font, color: showBack ? '@ink' : '@ink' });
  if (!showBack && kt > 0) { badge(g, x + w - 40, cy, 26, { stroke: C.silver }); tick(g, x + w - 40, cy + 2, 16, kt); }
  g.restore();
  return box;
}
/** Ba ô xếp theo PANES. o: { texts, k: [3], kText: [3], tick: [3], flip: [3], backs: [3], kBack: [3], size }. */
export function panes(g, { texts = QUESTIONS, k = [1, 1, 1], kText = [null, null, null], tick: kt = [0, 0, 0], flip = [0, 0, 0], backs = ['', '', ''], kBack = [1, 1, 1], size = 36, x = PANES.x, w = PANES.w, y0 = PANES.y0, h = PANES.h, gap = PANES.gap } = {}) {
  return texts.map((s, i) => pane(g, i + 1, x, y0 + i * (h + gap), w, h, k[i], { text: s, kText: kText[i], tick: kt[i], flip: flip[i], back: backs[i], kBack: kBack[i], size }));
}

// ═════════════════════════ vật dùng chung (≥ 2 cảnh, LESSONS §71/§83) ═════════════════════════
/** Huy chương Nobel vẽ trơn (không logo, DNA §8): đĩa vàng, vành, hồ quang. k: bật ra; spin quay quanh trục đứng. */
export function nobel(g, x, y, R, k = 1, { spin = 0 } = {}) {
  if (k <= 0) return;
  const s = outBack(clamp(k)), sx = Math.max(0.06, Math.abs(Math.cos(spin)));
  g.save(); g.translate(x, y); g.scale(s * sx, s);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.arc(5, 8, R, 0, TAU); g.fill();
  const gr = g.createLinearGradient(-R, -R, R, R); gr.addColorStop(0, '#F6E2A4'); gr.addColorStop(0.45, NOBEL); gr.addColorStop(1, '#8C6A22');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fill();
  const gi = g.createRadialGradient(-R * 0.3, -R * 0.35, R * 0.1, 0, 0, R * 0.86); gi.addColorStop(0, '#F3D88C'); gi.addColorStop(1, '#B48A34');
  g.fillStyle = gi; g.beginPath(); g.arc(0, 0, R * 0.84, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(90,64,20,0.55)'; g.lineWidth = Math.max(1, R * 0.03); g.beginPath(); g.arc(0, 0, R * 0.74, 0, TAU); g.stroke();
  g.strokeStyle = 'rgba(255,244,210,0.75)'; g.lineWidth = R * 0.06; g.beginPath(); g.arc(0, 0, R * 0.93, -2.6, -1.25); g.stroke();
  g.restore();
}
/** Ống nghiệm đứng: đáy tròn ở (x, y), cao h. fill 0..1 mực dung dịch; mix = tỉ lệ hạt 左 (hổ phách) — 0.5 = ラセミ体; n hạt. */
export function tube(g, x, y, h, k = 1, { fill = 0.6, mix = 0.5, n = 24, seed = 1, w = Math.round(h * 0.22) } = {}) {
  if (k <= 0) return { x: x - w / 2, y: y - h, w, h };
  const dy = Math.round((1 - outCubic(clamp(k))) * 160), top = y - h + dy, r = w / 2;
  g.save(); g.translate(0, dy);
  const path = () => { g.beginPath(); g.moveTo(x - r, y - h); g.lineTo(x - r, y - r); g.arc(x, y - r, r, Math.PI, 0, true); g.lineTo(x + r, y - h); };
  const lv = y - (h - 16) * clamp(fill);
  g.save(); path(); g.closePath(); g.clip();
  g.fillStyle = 'rgba(201,210,224,0.06)'; g.fillRect(x - r, y - h, w, h);
  g.fillStyle = 'rgba(160,185,220,0.22)'; g.fillRect(x - r, lv, w, y - lv);
  const nL = Math.round(n * mix);
  for (let i = 0; i < n; i++) { const px = x - r + 7 + (w - 14) * hash(i * 3.7 + seed), py = lv + 8 + (y - lv - 12) * hash(i * 5.1 + seed + 0.3);
    g.fillStyle = i < nL ? C.L : C.R; g.beginPath(); g.arc(px, py, Math.max(2.5, w * 0.07), 0, TAU); g.fill(); }
  g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x - r + 2, lv); g.lineTo(x + r - 2, lv); g.stroke();
  g.restore();
  path(); g.strokeStyle = 'rgba(201,210,224,0.85)'; g.lineWidth = 2.5; g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.28)'; g.fillRect(x - r + 5, y - h + 10, 3, h - r - 18);
  g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.moveTo(x - r - 5, y - h); g.lineTo(x + r + 5, y - h); g.stroke();
  g.restore();
  return { x: x - r, y: top, w, h };
}
// tinh thể muối tartrate (b1, d2): lăng trụ sáu cạnh + mũ chóp, MỘT mặt nhỏ ở góc (hemihedral) — phía phải / trái (gương)
const CRY = (() => {
  const V = [], ring = (yy, rad) => Array.from({ length: 6 }, (_, i) => { const a = i / 6 * TAU + Math.PI / 6; return [Math.cos(a) * rad, yy, Math.sin(a) * rad * 0.62]; });
  const top = ring(0.9, 1), bot = ring(-0.9, 1), apT = [0, 1.75, 0], apB = [0, -1.75, 0];
  const c = 0.45, lerp = (a, b) => a.map((v, i) => v + (b[i] - v) * c), V1 = top[0];          // mặt nhỏ: cắt góc top[0] (phía +x)
  const pA = lerp(V1, apT), p5 = lerp(V1, top[5]), p1 = lerp(V1, top[1]), pB = lerp(V1, bot[0]);
  const F = [];
  for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; F.push({ v: [top[i], top[j], bot[j], bot[i]] }, { v: [apT, top[j], top[i]] }, { v: [apB, bot[i], bot[j]] }); }
  const cut = X => X === apT ? pA : X === top[5] ? p5 : X === top[1] ? p1 : pB;     // điểm cắt trên cạnh V1 → X
  for (const fc of F) { const i = fc.v.indexOf(V1); if (i < 0) continue; const n = fc.v.length;
    fc.v.splice(i, 1, cut(fc.v[(i + n - 1) % n]), cut(fc.v[(i + 1) % n])); }
  F.push({ v: [pA, p1, pB, p5], facet: true });
  return F;
})();
/** Tinh thể (b1, d2): x, y tâm, s nửa cao (px). mirror: ảnh gương (x → −x SAU khi xoay — truyền CÙNG rot cho hai bản),
 *  mặt nhỏ hổ phách (trái) / azure (gương). rot quanh trục đứng (hàm của t; mặt nhỏ hướng về camera khi rot ∈ [−1.2, 0.3]). k bật ra. */
export function crystal(g, x, y, s, k = 1, { mirror = false, rot = -0.35, tilt = 0.25 } = {}) {
  if (k <= 0) return;
  const M = mm(rotX(tilt), rotY(rot)), sc = s * outBack(clamp(k)) / 1.75, side = mirror ? C.R : C.L, light = vnorm([-0.5, 0.7, 0.6]);
  const faces = CRY.map(fc => { const P = fc.v.map(p => { const q = mmul(M, p); if (mirror) q[0] = -q[0]; return q; });
    const c = P.reduce((a, p) => a.map((v, i) => v + p[i] / P.length), [0, 0, 0]); let nrm = vnorm(vcross(vsub(P[1], P[0]), vsub(P[2], P[0])));
    if (vdot(nrm, c) < 0) nrm = nrm.map(v => -v); return { P, nrm, z: c[2], facet: fc.facet }; }).filter(fc => fc.nrm[2] > 0.01).sort((a, b) => a.z - b.z);
  g.save(); g.lineJoin = 'round';
  for (const fc of faces) {
    const l = 0.35 + 0.65 * clamp(vdot(fc.nrm, light));
    g.beginPath(); fc.P.forEach((p, i) => i ? g.lineTo(x + p[0] * sc, y - p[1] * sc) : g.moveTo(x + p[0] * sc, y - p[1] * sc)); g.closePath();
    g.fillStyle = fc.facet ? side : `rgba(${Math.round(90 + 150 * l)},${Math.round(105 + 140 * l)},${Math.round(130 + 120 * l)},0.62)`; g.fill();
    g.strokeStyle = fc.facet ? '#FFFFFF' : 'rgba(235,240,248,0.8)'; g.lineWidth = fc.facet ? 2 : 1.4; g.stroke();
  }
  g.restore();
}
/**
 * Bàn tay vẽ (a0, c1 găng tay, まとめ): lòng bàn tay hướng người xem, ngón lên. side 'L' = tay trái (ngón cái chỉ sang
 * PHẢI, về phía gương khi đặt bên trái); 'R' = ảnh gương. glove: thêm cổ găng. ghost: nét đứt (bản xoay thử).
 * x, y = tâm lòng bàn tay; s = cỡ (≈ nửa rộng lòng). k: trồi lên. color mặc định theo side.
 */
export function hand(g, x, y, s, k = 1, { side = 'L', glove = false, ghost = false, color = side === 'R' ? C.R : C.L, rot = 0 } = {}) {
  if (k <= 0) return;
  const e = outBack(clamp(k)), dy = (1 - outCubic(clamp(k))) * s * 1.4;
  g.save(); g.translate(x, y + dy); g.rotate(rot); g.scale((side === 'R' ? -1 : 1) * e, e);
  const P = new Path2D();
  P.roundRect(-s, -s * 0.9, 2 * s, s * 1.9, s * 0.45);                                    // lòng
  [[-0.72, 1.2], [-0.25, 1.5], [0.22, 1.42], [0.66, 1.1]].forEach(([fx, L]) => P.roundRect(s * fx - s * 0.21, -s * 0.7 - s * L, s * 0.42, s * L + s * 0.5, s * 0.21));   // 4 ngón (út bên trái)
  if (glove) P.roundRect(-s * 0.92, s * 0.6, s * 1.84, s * 0.95, s * 0.1);
  const th = new DOMMatrix().translate(s * 0.78, s * 0.3).rotate(38), T = new Path2D();                 // ngón cái chĩa ra phải-trên
  T.roundRect(-s * 0.23, -s * 1.25, s * 0.46, s * 1.4, s * 0.23); P.addPath(T, th);
  const shape = (fill, stroke, lw, dash) => {                    // viền = nét dày vẽ TRƯỚC, phủ đặc lên → chỉ còn viền ngoài của hợp
    g.save(); if (dash) g.setLineDash(dash);
    if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw * 2; g.lineJoin = 'round'; g.stroke(P); }
    if (fill) { g.fillStyle = fill; g.fill(P); }
    g.restore();
  };
  if (ghost) { g.save(); g.setLineDash([10, 8]); g.strokeStyle = color; g.lineWidth = 3; g.fillStyle = color === C.R ? 'rgba(75,163,227,0.10)' : 'rgba(242,165,65,0.10)';
    g.fill(P); g.stroke(P); g.restore(); }
  else {
    g.save(); g.translate(8, 12); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fill(P); g.restore();
    const gr = g.createLinearGradient(-s, -s * 2.4, s, s * 1.2); gr.addColorStop(0, '#242C40'); gr.addColorStop(1, '#141A2A');
    shape(gr, color, 3.5);
    g.strokeStyle = 'rgba(201,210,224,0.28)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-s * 0.7, s * 0.05); g.quadraticCurveTo(-s * 0.1, s * 0.3, s * 0.45, -s * 0.15); g.stroke();   // chỉ tay
    if (glove) { g.strokeStyle = 'rgba(201,210,224,0.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-s * 0.9, s * 0.95); g.lineTo(s * 0.9, s * 0.95); g.stroke(); }
  }
  g.restore();
}
/** Đồng xu bạc (h1, h2, j2): R bán kính; spin (rad quanh trục đứng — lật); tilt (dẹt dọc khi nằm). k: bật ra. */
export function coin(g, x, y, R, k = 1, { spin = 0, tilt = 1 } = {}) {
  if (k <= 0) return;
  const s = outBack(clamp(k)), sx = Math.max(0.06, Math.abs(Math.cos(spin)));
  g.save(); g.translate(x, y); g.scale(s * sx, s * tilt);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.arc(4, 6, R, 0, TAU); g.fill();
  const gr = g.createLinearGradient(-R, -R, R, R); gr.addColorStop(0, '#F4F7FB'); gr.addColorStop(0.5, '#AEB6C6'); gr.addColorStop(1, '#5D6678');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fill();
  g.fillStyle = '#9AA4B6'; g.beginPath(); g.arc(0, 0, R * 0.84, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(40,48,66,0.5)'; g.lineWidth = Math.max(1, R * 0.04); g.beginPath(); g.arc(0, 0, R * 0.7, 0, TAU); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = R * 0.07; g.beginPath(); g.arc(0, 0, R * 0.93, -2.6, -1.3); g.stroke();
  g.restore();
}

// ═════════════════════════ ảnh lịch sử (DNA §8, assets/history/INDEX.md) ═════════════════════════
/** Nhãn tiếng Nhật + credit BẮT BUỘC cho mỗi ảnh (INDEX.md). maxH: ảnh nhỏ không phóng quá. */
export const PHOTOS = {
  'pasteur-21': { label: 'ルイ・パスツール（若いころの肖像）', credit: 'パブリックドメイン' },
  'pasteur-1857': { label: 'ルイ・パスツール（1822–1895）', credit: 'パブリックドメイン' },
  'pasteur-lab': { label: '研究室のパスツール（1885年）', credit: 'エーデルフェルト画・パブリックドメイン' },
  'pasteur-crystals': { label: 'パスツールが分けた結晶', credit: '写真：Marie-Lan Taÿ Pamart / CC BY 4.0' },
  kelvin: { label: 'ケルビン卿（1824–1907）', credit: 'パブリックドメイン' },
  polarimeter: { label: '偏光計（1912年の図）', credit: 'パブリックドメイン' },
  kevadon: { label: 'サリドマイドの瓶（米国・1960年）', credit: '米国FDA・パブリックドメイン' },
  'kelsey-jfk': { label: '承認を止めたケルシー（1962年）', credit: 'パブリックドメイン' },
  kagan: { label: 'アンリ・カガン', credit: '写真：École polytechnique / CC BY-SA 2.0' },
  soai: { label: '硤合憲三', credit: '写真：日本学士院 / CC BY 4.0', maxH: 160 },
};
const IM = {}, PH = {};
function monoPrint(src, h) {                            // in bạc đơn sắc ở CỠ HIỂN THỊ, kéo giãn p2–p98, ánh lạnh
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.imageSmoothingQuality = 'high'; x.drawImage(src, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98)), A = [16, 20, 31], B = [240, 236, 228];
  for (let i = 0; i < n; i++) { const v = smooth(clamp((L[i] - lo) / (hi - lo))); for (let j = 0; j < 3; j++) d.data[i * 4 + j] = A[j] + (B[j] - A[j]) * v; }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Ảnh lịch sử trong khung kính mảnh viền bạc: góc trên-trái (x, y), cao h. k: trượt lên + bật (không fade).
 * Nhãn (PHOTOS[key].label, Noto 700) + dòng credit (28 px, phụ) LUÔN vẽ dưới ảnh; sub = dòng thêm (vd 「95歳」) cạnh nhãn.
 * align 'left' | 'center' | 'right' cho nhãn so với ảnh. Trả về { x, y, w, h, bottom }.
 */
export function photo(g, key, x, y, h, k = 1, { sub = '', labelSize = 36, subSize = 36, align = 'left', subColor = '@ink' } = {}) {
  const P = PHOTOS[key]; if (!P) throw new Error(`photo: "${key}" không có trong PHOTOS / INDEX.md`);
  if (!IM[key]) throw new Error(`photo: chưa nạp ảnh "${key}" (static IMAGES)`);
  if (P.maxH && h > P.maxH) throw new Error(`photo: ${key} gốc ${IM[key].width}×${IM[key].height} — khung ≤ ${P.maxH} px cao`);
  const im = (PH[key + '@' + h] ??= monoPrint(IM[key], h)), w = im.width;
  const lx = align === 'center' ? x + w / 2 : align === 'right' ? x + w : x;
  const lab = { font: `700 ${labelSize}px ${JP}`, align }, cr = { font: `400 28px ${JP}`, color: '@dim', align };
  const ly = y + h + 20 + labelSize, cy = ly + (sub ? subSize + 14 : 0) + 40;
  const box = { x, y, w, h, bottom: cy + 8 };
  if (k <= 0) { write(g, P.label, lx, ly, 0, lab); write(g, P.credit, lx, cy, 0, cr); return box; }
  const e = outCubic(clamp(k)), dy = Math.round((1 - e) * 220);
  g.save(); g.translate(0, dy);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(x + 10, y + 14, w + 12, h + 12);
  g.fillStyle = '#1A2133'; g.fillRect(x - 6, y - 6, w + 12, h + 12);
  g.drawImage(im, x, y, w, h);
  const gl = g.createLinearGradient(x, y, x + w, y + h); gl.addColorStop(0, 'rgba(255,255,255,0.10)'); gl.addColorStop(0.35, 'rgba(255,255,255,0)'); gl.addColorStop(1, 'rgba(201,210,224,0.06)');
  g.fillStyle = gl; g.fillRect(x, y, w, h);
  g.strokeStyle = C.silver; g.lineWidth = 2; g.strokeRect(x - 6, y - 6, w + 12, h + 12);
  g.strokeStyle = 'rgba(201,210,224,0.35)'; g.lineWidth = 1; g.strokeRect(x - 0.5, y - 0.5, w + 1, h + 1);
  g.restore();
  const kl = clamp((k - 0.6) / 0.4);                 // nhãn viết khi ảnh đã gần yên
  write(g, P.label, lx, ly, kl, lab);
  if (sub) write(g, sub, lx, ly + subSize + 14, kl, { font: `700 ${subSize}px ${JP}`, align, color: subColor });
  write(g, P.credit, lx, cy, kl, cr);
  return box;
}

// ═════════════════════════ nhân vật ═════════════════════════
// crop = phần trên của ảnh được giữ (assets/character-v2/crop.js). MIỆNG NÓI: truyền { t } → miệng mở theo lời đọc khi đã
// đứng hẳn (k ≥ 0.95) — CHỈ tư thế có trong mouths.js (ponder, point, ok, wave, calculator); tư thế khác (halt, pointer,
// coin-flip) im lặng dù có t. Trang gọi setTalk(data/<part>.mouth.json); chưa có tệp → mascot im.
const SIL = {}, TINT = {}, GLASS = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
function prepPose(key) {                               // một lần lúc nạp: ánh lạnh phòng tối + ánh gương hắt + bóng mờ (filter chỉ ở đây)
  const im = IM[key];
  const t = mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop';
  tx.fillStyle = 'rgba(40,60,110,0.10)'; tx.fillRect(0, 0, im.width, im.height); TINT[key] = t;
  const gl = mk(im.width, im.height), gx = gl.getContext('2d'); gx.drawImage(im, 0, 0); gx.globalCompositeOperation = 'source-atop';   // bản "trong gương": lạnh + tối
  gx.fillStyle = 'rgba(30,52,96,0.38)'; gx.fillRect(0, 0, im.width, im.height);
  const sh = gx.createLinearGradient(0, 0, im.width, im.height); sh.addColorStop(0, 'rgba(201,210,224,0.10)'); sh.addColorStop(0.4, 'rgba(201,210,224,0)'); gx.fillStyle = sh; gx.fillRect(0, 0, im.width, im.height);
  GLASS[key] = gl;
  const s = mk(im.width, im.height), sx = s.getContext('2d'); sx.filter = 'blur(14px)'; sx.drawImage(im, 0, 0); sx.filter = 'none';
  sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#000000'; sx.fillRect(0, 0, im.width, im.height); SIL[key] = s;
}
/**
 * Mascot: cx tâm ảnh, foot đáy (chân / mép cắt), h chiều cao hiển thị; k = trồi lên + bật (không fade).
 * flip: lật ngang; glass: bản ảnh-trong-gương (lạnh, tối — vd phía phải gương ở a0); overMirror: cho phép đè gương
 * (mặc định ném lỗi khi thân ảnh chạm dải gương ±40 px — DNA §5). Trả về { x, y, w, h, s, pose, flip }.
 */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, glass = false, overMirror = false, crop = CROP[pose] ?? 1 } = {}) {
  const key = 'pose-' + pose, im = (glass ? GLASS : TINT)[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * crop, s = h / sh0, w = im.width * s, x0 = cx - w / 2;
  if (!overMirror && x0 < MX + 40 && x0 + w > MX - 40) {
    // chỉ tính phần ảnh có điểm ảnh (bbox ngang đo lúc nạp)
    const [bx0, bx1] = BBOX[key], ax0 = flip ? cx + w / 2 - bx1 * s : x0 + bx0 * s, ax1 = flip ? cx + w / 2 - bx0 * s : x0 + bx1 * s;
    if (ax0 < MX + 40 && ax1 > MX - 40) throw new Error(`figure: "${pose}" (x ${Math.round(ax0)}–${Math.round(ax1)}) đè gương x = ${MX} (DNA §5)`);
  }
  if (k <= 0) return null;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.38; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 22, y0 + 14, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV && MOUTHS[pose] && !glass) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h, s, pose, flip };
}
const BBOX = {};
function bboxOf(im) {                                  // cột đầu / cuối có điểm ảnh (alpha > 8) — lấy mẫu mỗi 4 px
  const c = mk(im.width, im.height), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
  const d = x.getImageData(0, 0, im.width, im.height).data; let a = im.width, b = 0;
  for (let py = 0; py < im.height; py += 4) for (let px = 0; px < im.width; px += 2) if (d[(py * im.width + px) * 4 + 3] > 8) { if (px < a) a = px; if (px > b) b = px; }
  return [a, b];
}

// ═════════════════════════ chuyển cảnh (DNA §7 — trang gọi) ═════════════════════════
/**
 * Trang gọi trong 0.9 s từ FROM của cảnh sau. same = cùng ERA → camera TRƯỢT XUYÊN gương: cảnh cũ lùi sang trái, cảnh mới
 * vào từ phải, một dải bạc (gương lướt qua ống kính) chạy trên đường nối. Khác ERA → lau từ tâm gương ra hai bên (dải mở
 * rộng quanh x = MX, mép bạc). Độ dịch làm tròn (LESSONS §47); mỗi cảnh clip vào ô của nó.
 */
export function transition(g, T, prev, cur, k, same) {
  const e = smooth(clamp(k));
  if (same) {
    const d = Math.round((W + 80) * e), seam = W + 40 - d;
    g.save(); g.beginPath(); g.rect(0, 0, Math.max(0, seam), H); g.clip(); g.translate(-d, 0); prev.render(g, T); g.restore();
    g.save(); g.beginPath(); g.rect(seam, 0, W - seam + 1, H); g.clip(); g.translate(W + 80 - d, 0); cur.render(g, T); g.restore();
    const gr = g.createLinearGradient(seam - 70, 0, seam + 70, 0); gr.addColorStop(0, 'rgba(201,210,224,0)'); gr.addColorStop(0.42, 'rgba(201,210,224,0.35)');
    gr.addColorStop(0.5, 'rgba(244,247,251,0.95)'); gr.addColorStop(0.58, 'rgba(201,210,224,0.35)'); gr.addColorStop(1, 'rgba(201,210,224,0)');
    g.fillStyle = gr; g.fillRect(seam - 70, 0, 140, H);
  } else {
    prev.render(g, T);
    const r = Math.round(Math.max(MX, W - MX) * Math.pow(e, 1.15)) + 2;
    g.save(); g.beginPath(); g.rect(MX - r, 0, 2 * r, H); g.clip(); cur.render(g, T); g.restore();
    if (e < 1) for (const xx of [MX - r, MX + r]) { const gr = g.createLinearGradient(xx - 30, 0, xx + 30, 0); gr.addColorStop(0, 'rgba(244,247,251,0)'); gr.addColorStop(0.5, 'rgba(244,247,251,0.8)'); gr.addColorStop(1, 'rgba(244,247,251,0)'); g.fillStyle = gr; g.fillRect(xx - 30, 0, 60, H); }
  }
}

// ═════════════════════════ tiếng (DNA §10 — chỉ loại có trong assets/sfx/library.json) ═════════════════════════
/** Nghĩa → loại tiếng. Lật gương / chuyển cảnh = whoosh + shimmer (trang tự thêm); thẻ hồi = actCues(). */
export const SND = {
  flip: 'shimmer', mol: 'glass', crystal: 'glass', tube: 'glass', match: 'correct', mismatch: 'error', crack: 'crack', tweezers: 'tick',
  frank: 'suzu', web: 'tick', web99: 'shimmer', coin: 'coin', photo: 'page', page: 'page', nobel: 'suzu', telop: 'pop', glass: 'glass', impact: 'impact',
};
/** Một cue: c(t, 'mol') hoặc c(t, 'chip', db) — tên nghĩa (SND) hoặc tên loại. */
export const cue = (t, what, db) => ({ t: +t.toFixed(3), kind: SND[what] ?? what, ...(db != null ? { db } : {}) });

// ═════════════════════════ nạp ═════════════════════════
/** Nạp nền (mọi ERA), ảnh / tư thế (images: { key: url }), và MỌI file phân tử (kiểm R/S hình học = nhãn file). */
export async function loadKit(images) {
  BG.mirror = makeBench(false); BG.note = makeBench(true);
  await loadImages(images, IM);
  for (const key of Object.keys(images)) if (key.startsWith('pose-')) { prepPose(key); BBOX[key] = bboxOf(IM[key]); }
  const get = n => fetch(new URL(`./data/molecules/${n}.json`, import.meta.url)).then(r => { if (!r.ok) throw new Error('kit: không nạp được phân tử ' + n); return r.json(); });
  const names = Object.entries(MOLS).flat(), data = await Promise.all(names.map(get));
  const byName = Object.fromEntries(names.map((n, i) => [n, data[i]]));
  for (const [key, partner] of Object.entries(MOLS)) {
    const m = byName[key], p = byName[partner];
    const ext = Math.max(...m.atoms.map(a => Math.hypot(a.x, a.y, a.z)));
    MOL[key] = { ...m, view: VIEWS[key] ?? pcaView(m.atoms), D: Math.max(9, 3 * ext) };
    const A = asAtoms(m), Am = mirrorX(A);
    for (const s of m.stereo) {
      must(`'${cip(A, m.bonds, s.atom)}'`, s.cip);                                         // hình học khớp nhãn file
      must(`'${cip(Am, m.bonds, s.atom)}'`, s.cip === 'R' ? 'S' : 'R');                    // gương đổi tay
    }
    const want = p.stereo.map(s => s.cip).sort().join(), got = m.stereo.map(s => cip(Am, m.bonds, s.atom)).sort().join();
    must(`'${got}'`, want);                                                                 // bản gương = file đối tác (độc lập)
    for (const s of p.stereo) must(`'${cip(asAtoms(p), p.bonds, s.atom)}'`, s.cip);
    const V = placeMol(key);                                                               // xoay giữ tay
    for (const s of m.stereo) must(`'${cip(V, m.bonds, s.atom)}'`, s.cip);
  }
}
