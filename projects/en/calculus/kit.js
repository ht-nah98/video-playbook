// Đồ nghề của bài calculus — DNA survey (đường mòn + sổ đo đạc thực địa, projects/en/calculus/DNA.md). Lõi vẽ chép từ bàn
// thử đạo diễn đã chọn: tools/lab/survey.html (trời mát + núi xa có đường đồng mức, sườn đồi y = x² cắt dọc, cọc tiêu sọc
// đỏ trắng, dây đo xanh, sào ngắm, sổ đo bìa xanh, cột đất trắc dọc, phần thừa gạch tím).
// Ống nối không mang DNA (lookup, must, prog ném lỗi, mk, nạp ảnh, typeCues) ở engine/lesson.js; bóng sprite ở
// engine/shade.js — KHÔNG shadowBlur / ctx.filter trong render (LESSONS §127). Mọi hàm vẽ là hàm thuần của tham số;
// trời, núi, vải bìa sổ = sprite vẽ MỘT lần lúc nạp. Mây / chim / cỏ lay theo ĐỒNG HỒ VIDEO (setClock) để mối nối p1 → p2
// không nhảy. Tờ thử mọi vật: kit-test.html (DNA §11).
// Chữ: Archivo 600–900 (chữ lớn, đủ ÷ × ≈ − ² ³ → ·) · IBM Plex Mono 500 = chữ GHI SỔ (số liệu) · biến x y h n = Cormorant
// Garamond Italic LN (math(): một chữ cái latin đứng riêng → nghiêng; công thức KHÔNG viết hoa — math() ném khi gặp chữ hoa).
// Không font nào có ✓; ⅓ của Plex quá nhỏ → frac() vẽ chồng.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, must, loadImages, CROP } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';
import { shadowRR, shade, glow } from '../../../engine/shade.js';

export { W, H, clamp, hash, smooth, outBack, outCubic, shadowRR, shade, glow };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

export const TAU = Math.PI * 2;
export const lerp = (a, b, u) => a + (b - a) * u;

// ═════════════════════════ màu (DNA §2 — một màu một nghĩa) ═════════════════════════
export const C = {
  ink: '#22313B', dim: '#4E5B66', sky0: '#DCEAF1', sky1: '#F3F6EE', paper: '#FBF7EA', white: '#FFFFFF',
  pole: '#D9481E', poleInk: '#B23A12',                 // ĐỎ CỌC TIÊU = điểm đang hỏi + tiếp tuyến (sào)
  sec: '#2F6DB5', secInk: '#23579A',                   // XANH DÂY ĐO = cát tuyến
  curve: '#3E7A3A', curveInk: '#2E6A2B', grass: '#7FB05A', face: '#9CC274',   // LỤC = đường cong y = x² (mép cỏ)
  soil: '#C9A46A', soilInk: '#6E4A1C',                 // NÂU ĐẤT = diện tích / dải
  bad: '#7A4FB8', badInk: '#5E3A9A', badFill: '#E6DCF3', // TÍM GẠCH CHÉO = phần thừa
  cover: '#2F5A46', coverDk: '#244736', rule: 'rgba(47,109,181,0.22)', margin: 'rgba(217,72,30,0.45)',
  tape: '#F2C230', string: '#8A6A44',
};
export const STRATA = ['#E7D3A8', '#D9BC86', '#CBA56E', '#BE9562', '#D6BE92'];
/** Thử tông (người dùng 2026-10-22: "tông sáng quá, khó tập trung vào ký hiệu, bị tập trung vào núi"): ?theme=muted | sketch.
 *  Mặc định = muted (người dùng chọn 2026-10-22); base = bản build đầu. muted: phong cảnh rút bão hoà + đường cong đậm. sketch: đồi thành hình vẽ mực trên giấy. */
export const THEME = (typeof location !== 'undefined' && new URLSearchParams(location.search).get('theme')) || 'muted';
const TH = {
  base:   { hills: [['#C9DCE3', 'rgba(110,150,165,0.20)'], ['#BBD3CB', 'rgba(90,140,120,0.22)']], sun: 0.75, contour: 0.26, tufts: 1, curveW: 0, mound: ['#8DB868', '#4E8A42', 0.55], strataA: 1, sketch: false },
  muted:  { hills: [['#D5DCDF', 'rgba(110,130,140,0.12)'], ['#CBD3CF', 'rgba(90,110,100,0.12)']], sun: 0.25, contour: 0.10, tufts: 0.35, curveW: 3, mound: ['#BFCDB3', '#7E9474', 0.25], strataA: 0.55, sketch: false },
  sketch: { hills: null, sun: 0, contour: 0, tufts: 0, curveW: 3, mound: ['#EFEBDD', '#8A8C80', 0], strataA: 0, sketch: true },
}[THEME] || null;
if (!TH) throw new Error(`kit: theme lạ "${THEME}"`);
if (THEME === 'muted') Object.assign(C, { sky0: '#E6EAEC', sky1: '#F1F1EC', grass: '#B4C6A4', face: '#CCD8C2', curve: '#2E5A2C', curveInk: '#24502A' });
if (THEME === 'sketch') Object.assign(C, { sky0: '#F4F1E6', sky1: '#F4F1E6', grass: '#D6D9C8', face: '#ECE9DB', curve: '#2E5A2C', curveInk: '#24502A' });
if (THEME !== 'base') STRATA.splice(0, 5, ...(THEME === 'muted' ? ['#E6DCC6', '#DCCFB2', '#D2C3A2', '#C9B894', '#DDD0B4'] : ['#EFEBDD', '#EFEBDD', '#EFEBDD', '#EFEBDD', '#EFEBDD']));
export const ERA = {
  field: { bg: C.sky0, ink: C.ink },   // sườn đồi ngoài trời: trời mát + núi xa có đường đồng mức
  sheet: { bg: '#E3EEF0', ink: C.ink }, // trời nhạt, không núi — tờ trắc dọc, sổ đo, công thức
  cover: { bg: C.cover, ink: C.white }, // bìa sổ đo vải xanh — ảnh thật kẹp lên bìa (DNA §8)
};
/** Tương phản cặp chữ / nền (WCAG) — đo khi nạp, < 4.5 thì ném (DNA §2). */
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round((x + 0.05) / (y + 0.05) * 10) / 10; };
export const CONTRAST = {};
[['ink/sky0', C.ink, C.sky0], ['ink/sky1', C.ink, C.sky1], ['poleInk/sky0', C.poleInk, C.sky0], ['secInk/sky0', C.secInk, C.sky0], ['curveInk/sky0', C.curveInk, C.sky0],
 ['ink/paper', C.ink, C.paper], ['poleInk/paper', C.poleInk, C.paper], ['secInk/paper', C.secInk, C.paper], ['soilInk/paper', C.soilInk, C.paper],
 ['badInk/paper', C.badInk, C.paper], ['curveInk/paper', C.curveInk, C.paper], ['dim/paper', C.dim, C.paper], ['white/cover', C.white, C.cover],
 ['ink/strata0', C.ink, STRATA[0]], ['ink/sheet', C.ink, ERA.sheet.bg], ['white/pole', C.white, C.poleInk], ['white/sec', C.white, C.secInk]]
  .forEach(([k, a, b]) => { CONTRAST[k] = contrast(a, b); if (CONTRAST[k] < 4.5) throw new Error(`kit: tương phản ${k} = ${CONTRAST[k]} < 4.5`); });
/** Pha màu hex về trắng (k > 0) hoặc đen (k < 0). */
export const mix = (hex, k) => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)), t = k > 0 ? 255 : 0, a = Math.abs(k);
  return '#' + v.map(c => Math.round(c + (t - c) * a).toString(16).padStart(2, '0')).join(''); };

// ═════════════════════════ chữ (DNA §3) ═════════════════════════
export const AR = '"Archivo"', MO = '"Plex Mono"', IT = '"CormorantI"';
/** Mọi mặt chữ kit dùng — trang Promise.all trước init (đua font, LESSONS §16). */
export const FONTS = [...['600', '700', '800', '900'].map(w => `${w} 40px ${AR}`), `500 40px ${MO}`, `italic 600 40px ${IT}`];
export const FONT_SAMPLE = '0123456789 ÷×≈−+=?.,() ²³ →·–… ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
/** Cỡ chữ tối thiểu (DNA §3): chữ ≥ 28 px, chuỗi có chữ số ≥ 30 px. Ném lỗi — kit giữ luật bằng code (LESSONS §95). */
export const MIN_TXT = 28, MIN_NUM = 30;
const pxOf = font => +(/(\d+(?:\.\d+)?)px/.exec(font) || [0, 0])[1];
function minSize(px, s, tag) {
  if (px < MIN_TXT) throw new Error(`${tag}: "${s}" chữ ${px} px < ${MIN_TXT} (DNA §3)`);
  if (/\d/.test(s) && px < MIN_NUM) throw new Error(`${tag}: "${s}" có số, ${px} px < ${MIN_NUM} (DNA §3)`);
}
export function measure(g, s, font) { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; }
/** Viết chữ. k < 1: hiện dần theo ký tự (ghi sổ — không fade). Trả về bề rộng. */
export function text(g, s, x, y, { font = `800 40px ${AR}`, color = C.ink, align = 'left', base = 'alphabetic', k = 1 } = {}) {
  minSize(pxOf(font), s, 'text');
  const w = measure(g, s, font);
  if (k <= 0) return w;
  const n = Math.round([...s].length * clamp(k)), x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.save(); g.font = font; g.textAlign = 'left'; g.textBaseline = base; g.fillStyle = color; g.fillText([...s].slice(0, n).join(''), x0, y); g.restore();
  return w;
}
/** Chữ quá rộng → ném lỗi (cảnh sửa chữ, không để tràn). */
export function fits(g, s, font, maxW, tag = 'chữ') { const w = measure(g, s, font); if (w > maxW) throw new Error(`${tag}: "${s}" rộng ${Math.round(w)} > ${maxW} px`); return w; }
/** Vùng an toàn chữ (CRAFT §5). */
export const SAFE = { x0: 96, x1: 1824, y0: 64, y1: 1016 };
function inSafe(box, tag) {
  if (box.x < SAFE.x0 - 0.5 || box.x + box.w > SAFE.x1 + 0.5 || box.y < SAFE.y0 - 0.5 || box.y + box.h > SAFE.y1 + 0.5)
    throw new Error(`${tag}: hộp x ${Math.round(box.x)}…${Math.round(box.x + box.w)}, y ${Math.round(box.y)}…${Math.round(box.y + box.h)} ra ngoài vùng an toàn (CRAFT §5)`);
}

// ── công thức: biến nghiêng chữ thường (DNA §3) ──
/** Tách công thức: chữ cái latin THƯỜNG đứng riêng (x, y, h, n) → nghiêng; "lim", số, dấu → thẳng. Chữ hoa → ném. */
function mathRuns(s) {
  if (/[A-Z]/.test(s)) throw new Error(`math: "${s}" có chữ HOA — công thức không viết hoa (DNA §3)`);
  const out = []; let m; const re = /([a-z]+)|([^a-z]+)/g;
  while ((m = re.exec(s))) out.push({ s: m[0], it: !!m[1] && m[1].length === 1 });
  return out;
}
const mathFont = (r, px, mono, wt) => r.it ? `italic 600 ${Math.round(px * 1.22)}px ${IT}` : mono ? `500 ${px}px ${MO}` : `${wt} ${px}px ${AR}`;
export function measureMath(g, s, px = 48, { mono = false, wt = 700 } = {}) { return mathRuns(s).reduce((a, r) => a + measure(g, r.s, mathFont(r, px, mono, wt)) + (r.it ? px * 0.04 : 0), 0); }
/**
 * Viết công thức (vd "y = x²", "(x² − 25) / (x − 5)", "2x + h", "x³/3"). px = cỡ phần thẳng; biến nghiêng to hơn 1.22×
 * (Cormorant x-height thấp). mono: phần thẳng bằng Plex Mono (ghi sổ). k: hiện dần theo ký tự. Trả về bề rộng.
 */
export function math(g, s, x, y, { px = 48, color = C.ink, align = 'left', base = 'alphabetic', k = 1, mono = false, wt = 700 } = {}) {
  minSize(px, s, 'math');
  const runs = mathRuns(s), w = measureMath(g, s, px, { mono, wt });
  if (k <= 0) return w;
  let left = Math.round([...s].length * clamp(k)), cx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.save(); g.textAlign = 'left'; g.textBaseline = base; g.fillStyle = color;
  for (const r of runs) {
    const f = mathFont(r, px, mono, wt), n = Math.min(left, [...r.s].length); if (n <= 0) break;
    g.font = f; g.fillText([...r.s].slice(0, n).join(''), cx, y); cx += g.measureText(r.s).width + (r.it ? px * 0.04 : 0); left -= n;
  }
  g.restore();
  return w;
}
/** Phân số vẽ CHỒNG (⅓ của font quá nhỏ). (cx, y) = tâm vạch ngang. Trả về bề rộng. */
export function frac(g, num, den, cx, y, { px = 48, color = C.ink, k = 1, font = MO, wt = 600 } = {}) {
  minSize(px, num + den, 'frac');
  if (k <= 0) return 0;
  const f = `${wt} ${px}px ${font}`, w = Math.max(measure(g, num, f), measure(g, den, f)) + px * 0.35, e = outBack(clamp(k), 1.6);
  g.save(); g.translate(cx, y); g.scale(e, e);
  g.font = f; g.textAlign = 'center'; g.fillStyle = color;
  g.textBaseline = 'alphabetic'; g.fillText(num, 0, -px * 0.2);
  g.fillRect(-w / 2, -Math.max(2, px * 0.045), w, Math.max(4, px * 0.09));
  g.textBaseline = 'top'; g.fillText(den, 0, px * 0.18);
  g.restore();
  return w;
}

// ═════════════════════════ số (CONTENT.md — mọi số qua must) ═════════════════════════
/** Số → chuỗi gọn (bỏ rác dấu phẩy động): 2.0100000000000002 → "2.01". */
export const fmt = v => String(+(+v).toFixed(9));
/** Hàm của bài. */
export const sq = x => x * x;
/** Dốc cát tuyến của y = x² qua (a, a²) và (b, b²) = a + b. */
export const secSlope = (a, b) => (b * b - a * a) / (b - a);
/** Bảng tiến dần (CONTENT): x₂ → y₂, rise, run, dốc. Chuỗi hiển thị qua fmt, kiểm từng ô. */
export const STEPS = [2, 1.5, 1.1, 1.01, 1.001].map(x => {
  const y = fmt(x * x), rise = fmt(x * x - 1), run = fmt(x - 1), slope = fmt(secSlope(1, x));
  return { x: fmt(x), y, rise, run, slope };
});
[['2', '4', '3', '1', '3'], ['1.5', '2.25', '1.25', '0.5', '2.5'], ['1.1', '1.21', '0.21', '0.1', '2.1'], ['1.01', '1.0201', '0.0201', '0.01', '2.01'],
 ['1.001', '1.002001', '0.002001', '0.001', '2.001']].forEach((r, i) => ['x', 'y', 'rise', 'run', 'slope'].forEach((key, j) => must(`'${STEPS[i][key]}'`, r[j])));
STEPS.forEach((s, i) => { must(`${s.slope} - 2`, +fmt(+s.x - 1)); if (i && !(+s.slope < +STEPS[i - 1].slope && +s.slope > 2)) throw new Error('kit: dốc không khép dần về 2'); });
/** Tiếp tuyến của y = x² tại x0: y = 2·x0·(x − x0) + x0². Ở (1, 1): y = 2x − 1. */
export const tanAt = (x0, x) => 2 * x0 * (x - x0) + x0 * x0;
must('2 * 1 - 1', 1); must(`${tanAt(1, 3)}`, 5);
/** Kiểm sào chạm đường cong ĐÚNG MỘT điểm: x² − tiếp tuyến = (x − x0)² > 0 mọi x ≠ x0 (lưới 2001 điểm), = 0 tại x0. */
export function touchesOnce(x0, a = x0 - 3, b = x0 + 3) {
  let zeros = 0;
  for (let i = 0; i <= 2000; i++) { const u = a + (b - a) * i / 2000, d = u * u - tanAt(x0, u); if (d < -1e-12) throw new Error(`kit: sào cắt đường cong tại x = ${u}`); if (Math.abs(u - x0) > 1e-9 && d <= 0) zeros++; }
  must(`${x0} ** 2 - (${tanAt(x0, x0)})`, 0); if (zeros) throw new Error(`kit: sào chạm ${zeros + 1} điểm`);
  return true;
}
touchesOnce(1); touchesOnce(3); touchesOnce(0);
/** Đạo hàm 2x (CONTENT): x = 1 → 2, x = 3 → 6, x = 0 → 0. */
export const D2X = { 0: must('2 * 0', 0), 1: must('2 * 1', 2), 3: must('2 * 3', 6) };
/** Ví dụ giới hạn: (x² − 25)/(x − 5) gần 5 (CONTENT). */
export const lim = x => (x * x - 25) / (x - 5);
export const NEAR5 = [[4.9, '9.9'], [4.99, '9.99'], [5.1, '10.1'], [5.01, '10.01']].map(([x, v]) => { must(`'${fmt(lim(x))}'`, v); must(`'${fmt(x + 5)}'`, v); return { x: fmt(x), v }; });
must('5 * 5 - 25', 0); must('5 - 5', 0);
/** Tổng trên / dưới của ∫₀¹ x² dx với n dải đều — số nguyên (chính xác): Σi² = n(n+1)(2n+1)/6. */
const sumSq = m => m * (m + 1) * (2 * m + 1) / 6;
export const upper = n => sumSq(n) / n ** 3, lower = n => sumSq(n - 1) / n ** 3;
/** Chuỗi lên hình (CONTENT + lời đọc): ≈ hai số (n = 4), ba số (10, 100), bốn số (1000, "agree to two decimal places"). */
export const RIEMANN = {
  4: { lo: '0.22', hi: '0.47', about: true }, 10: { lo: '0.285', hi: '0.385' }, 100: { lo: '0.328', hi: '0.338' }, 1000: { lo: '0.3328', hi: '0.3338' },
};
[[4, 0.21875, 0.46875], [10, 0.285, 0.385], [100, 0.32835, 0.33835], [1000, 0.3328335, 0.3338335]].forEach(([n, lo, hi]) => {
  must(`${fmt(lower(n))}`, lo); must(`${fmt(upper(n))}`, hi); must(`${fmt(upper(n) - lower(n))}`, 1 / n);          // khe = 1/n
  const R = RIEMANN[n], d = R.lo.length - 2;
  must(`'${R.about ? lo.toFixed(2) : String(Math.trunc(lo * 10 ** d + 1e-9) / 10 ** d)}'`, R.lo);
  must(`'${R.about ? hi.toFixed(2) : String(Math.trunc(hi * 10 ** d + 1e-9) / 10 ** d)}'`, R.hi);
  if (!(+R.lo < 1 / 3 && 1 / 3 < +R.hi)) throw new Error(`kit: ⅓ không nằm giữa ${R.lo} và ${R.hi}`);       // chuỗi hiện vẫn kẹp ⅓
});
must(`'${RIEMANN[1000].lo.slice(0, 4)}'`, '0.33'); must(`'${RIEMANN[1000].hi.slice(0, 4)}'`, '0.33');
/** ∫₀ˣ t² dt = x³/3; tại 1 = ⅓; (x³/3)' = x² (kiểm số ở x = 0.7, h = 1e-6). */
export const AREA = x => x ** 3 / 3;
must(`${AREA(1)}`, 1 / 3); must(`Math.round((${AREA(0.7 + 1e-6)} - ${AREA(0.7)}) / 1e-6 * 1e4) / 1e4`, 0.49);
/** Năm / tuổi (CONTENT, INDEX). */
export const YEARS = { newton: [1643, 1727], leibniz: [1646, 1716], nova: 1684, archimedes: [287, 212] };
must('2026 + 212 > 2000', true);

// ═════════════════════════ tiện ích vẽ ═════════════════════════
export const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export function line(g, x0, y0, x1, y1, col, w, cap = 'round') { g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
const cpu = (w, h) => { const c = mk(w, h); return [c, c.getContext('2d', { willReadFrequently: true })]; };
export const pop = k => outBack(clamp(k), 2.0);
/** Rơi xuống rồi nảy nhẹ (cọc cắm xuống). 0 → 1. */
export const drop = k => { const u = clamp(k); if (u < 0.7) return (u / 0.7) ** 2; const v = (u - 0.7) / 0.3; return 1 - 0.06 * Math.sin(Math.PI * v); };
/** Nét bút navy gạch / gạch chân (DNA §2: gạch bằng mực trung tính, KHÔNG đỏ). k: vẽ dần. */
export function pen(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 6 } = {}) {
  if (k <= 0) return; const e = outCubic(clamp(k));
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0);
  g.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 - 6, x0 + (x1 - x0) * e, y0 + (y1 - y0) * e); g.stroke(); g.restore();
}
/** Mũi tên navy (k: vẽ dần). */
export function arrow(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 6, head = 18 } = {}) {
  if (k <= 0) return; const e = outCubic(clamp(k)), ex = x0 + (x1 - x0) * e, ey = y0 + (y1 - y0) * e, a = Math.atan2(y1 - y0, x1 - x0);
  line(g, x0, y0, ex, ey, color, w);
  g.save(); g.translate(ex, ey); g.rotate(a); g.fillStyle = color; g.beginPath(); g.moveTo(4, 0); g.lineTo(-head, -head * 0.6); g.lineTo(-head, head * 0.6); g.closePath(); g.fill(); g.restore();
}

// ═════════════════════════ đồng hồ video + nền (DNA §4, §7) ═════════════════════════
let CLOCK = 0;
/** Trang đặt: giờ VIDEO = t (timeline trang) + off. p1: off = LEAD₁; p2: off = DUR₁ + LEAD₂ → mây / chim liền qua mối nối. */
export function setClock(off) { CLOCK = off; }
const BG = {};
function skySprite(top, bot, hills) {
  const [c, x] = cpu(W, H);
  let gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, top); gr.addColorStop(1, bot); x.fillStyle = gr; x.fillRect(0, 0, W, H);
  const sun = x.createRadialGradient(360, 60, 0, 360, 60, 900); sun.addColorStop(0, `rgba(255,250,232,${TH.sun})`); sun.addColorStop(1, 'rgba(255,250,232,0)'); x.fillStyle = sun; x.fillRect(0, 0, W, H);
  return c;
}
/** Núi xa có đường đồng mức: dải rộng 2W (cuộn được theo pan — thị sai). */
function hillsSprite() {
  const WW = 2 * W, [c, x] = cpu(WW, H);
  const HL = TH.hills || [['rgba(0,0,0,0)', 'rgba(0,0,0,0)'], ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']];
  const layers = [{ base: 600, amp: 70, col: HL[0][0], con: HL[0][1], ph: 0.3 }, { base: 690, amp: 56, col: HL[1][0], con: HL[1][1], ph: 2.1 }];
  layers.forEach(L => {   // tuần hoàn theo 2W: sin(px · 2π·m / 2W)
    const f1 = TAU * 3 / WW, f2 = TAU * 8 / WW, yAt = px => L.base - L.amp * (0.6 * Math.sin(px * f1 + L.ph) + 0.4 * Math.sin(px * f2 + L.ph * 3)) - L.amp * 0.8;
    const p = new Path2D(); p.moveTo(0, H); for (let px = 0; px <= WW; px += 8) p.lineTo(px, yAt(px)); p.lineTo(WW, H); p.closePath();
    x.fillStyle = L.col; x.fill(p);
    x.save(); x.clip(p); x.strokeStyle = L.con; x.lineWidth = 2;
    for (let k = 1; k < 9; k++) { x.beginPath(); for (let px = 0; px <= WW; px += 8) { const py = L.base + k * 22 + (yAt(px) - L.base) * (1 - k * 0.1); px ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
    x.restore();
  });
  return c;
}
function cloudSprite(s) {
  const [c, x] = cpu(420 * s, 120 * s); x.fillStyle = 'rgba(255,255,255,0.6)';
  for (let j = 0; j < 5; j++) { x.beginPath(); x.ellipse(210 * s + (j - 2) * 46 * s, 70 * s - Math.sin(j / 4 * Math.PI) * 18 * s, 60 * s, 22 * s, 0, 0, TAU); x.fill(); }
  return c;
}
function coverSprite() {
  const [c, x] = cpu(W, H); x.fillStyle = C.cover; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { const px = hash(i * 1.37) * W, py = hash(i * 2.91) * H; x.fillStyle = `rgba(255,255,255,${0.03 + hash(i * 4.1) * 0.04})`; x.fillRect(px, py, 2 + hash(i) * 30, 1.5); }
  for (let i = 0; i < 1400; i++) { const px = hash(i * 7.7) * W, py = hash(i * 5.3) * H; x.fillStyle = `rgba(0,0,0,${0.04 + hash(i * 3.3) * 0.05})`; x.fillRect(px, py, 1.5, 2 + hash(i * 9.1) * 24); }
  x.setLineDash([14, 10]); x.strokeStyle = 'rgba(240,230,200,0.45)'; x.lineWidth = 3; x.strokeRect(40, 40, W - 80, H - 80);
  const v = x.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.30)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  return c;
}
/** Mây trôi theo giờ video (tất định): 5 đám, mỗi đám tốc độ riêng, quấn vòng. */
function clouds(g, vt, a = 1) {
  for (let k = 0; k < 5; k++) {
    const sp = 9 + hash(k * 4.7) * 10, s = 0.7 + hash(k * 1.9) * 0.6, span = W + 520 * s;
    const x = ((hash(k * 3.1) * span + vt * sp) % span) - 460 * s, y = 70 + hash(k * 7.3) * 140;
    g.save(); g.globalAlpha *= a; g.drawImage(BG['cloud' + (k % 2)], x, y, 420 * s, 120 * s); g.restore();
  }
}
/** Đàn chim nhỏ bay ngang trời (mỗi ~23 s một đàn, tất định theo giờ video) — vật đổi được giữa các cảnh (DNA §4). */
function birds(g, vt) {
  const P = 23, n = Math.floor(vt / P), u = (vt - n * P) / 9; if (u > 1) return;
  const y0 = 150 + hash(n * 2.3) * 160, dir = hash(n * 5.1) > 0.5 ? 1 : -1, x0 = dir > 0 ? -80 + u * (W + 160) : W + 80 - u * (W + 160);
  g.save(); g.strokeStyle = 'rgba(34,49,59,0.55)'; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let i = 0; i < 4; i++) { const bx = x0 - dir * i * 34, by = y0 + (i % 2) * 18 + Math.sin(vt * 3 + i) * 4, f = 7 + 4 * Math.sin(vt * 9 + i * 1.3);
    g.beginPath(); g.moveTo(bx - 10, by - f * 0.6); g.quadraticCurveTo(bx - 4, by - f, bx, by); g.quadraticCurveTo(bx + 4, by - f, bx + 10, by - f * 0.6); g.stroke(); }
  g.restore();
}
/**
 * Nền theo ERA (cảnh tự tô nền toàn khung trước khi vẽ). t = giờ timeline của trang (mây, chim theo giờ video).
 * pan: dịch núi xa (thị sai khi camera đi; mỗi cảnh một pan khác → nền khác giữa các cảnh, DNA §4).
 */
export function ground(g, era = 'field', t = 0, { pan = 0, hills = true } = {}) {
  const vt = t + CLOCK;
  if (era === 'cover') { g.drawImage(BG.cover, 0, 0); return; }
  if (era === 'field') { g.drawImage(BG.field, 0, 0); if (!TH.sketch) clouds(g, vt); birds(g, vt);
    if (hills) { const off = ((pan % (2 * W)) + 2 * W) % (2 * W); g.drawImage(BG.hills, -off, 0); if (off > W) g.drawImage(BG.hills, 2 * W - off, 0); }
    return; }
  if (era === 'sheet') { g.drawImage(TH.sketch ? BG.field : BG.sheet, 0, 0); if (!TH.sketch) clouds(g, vt, 0.7); birds(g, vt); return; }
  throw new Error(`ground: ERA lạ "${era}"`);
}
/** Khung nối p1 → p2 (DNA §6): sườn trời + núi xa TRƠN (không đồi, không mascot). p1 kết bằng khung này, p2 mở bằng nó. */
export function bare(g, t) { ground(g, 'field', t); }

// ═════════════════════════ toạ độ toán → màn hình + camera (DNA §1a) ═════════════════════════
/**
 * Khung nhìn: điểm toán (fx, fy) nằm ở pixel (px, py); sx, sy = px mỗi đơn vị (khác nhau được: phép affine giữ tiếp xúc).
 * X(u), Y(v): toán → màn hình; u(x), v(y): ngược lại.
 */
export function view(fx, fy, px, py, sx, sy = sx) {
  return { fx, fy, px, py, sx, sy, X: u => px + (u - fx) * sx, Y: v => py - (v - fy) * sy, u: x => fx + (x - px) / sx, v: y => fy - (y - py) / sy };
}
/** Camera chuẩn — vẽ lại ĐÚNG giữa các nhóm (vật dùng chung, DNA §11). */
export const VIEWS = {
  open: view(0, 0, 1010, 950, 375, 186),   // cold open = thumbnail (lab): sườn phải, (1, 1) ở (1385, 764)
  bowl: view(0, 0, 900, 930, 330, 175),    // cả cái chén: (−2, 4) ↔ (2, 4) ở y 230; (1, 1) ở (1230, 755)
  zoom: view(1, 1, 820, 640, 760, 420),    // vùng quanh (1, 1) đủ to để thấy quạt cát tuyến khép về sào (DNA §1a)
  area: view(0, 0, 540, 920, 800, 720),    // trắc dọc diện tích 0 … 1 (lab khung 2)
  trail: view(5, 10, 960, 560, 140, 70),   // đường mòn y = x + 5 với hố cọc (5, 10)
};
/** Sổ đo trong khung zoom (vùng trời trên-trái, dưới biển tên mục, mép phải x 840 không chạm dây đo): 5 dòng STEPS vừa
 *  khít với cột STEP_COLS (b04, b05, b21 vẽ lại ĐÚNG): ledger(g, BOOK.x, BOOK.y, BOOK.w, BOOK.h, { cols: STEP_COLS, rows: STEP_ROWS, shown }). */
export const BOOK = { x: 100, y: 165, w: 740, h: 420 };
export const STEP_COLS = [{ head: 'x', w: 0.16, isMath: true }, { head: 'y', w: 0.24, isMath: true }, { head: 'rise', w: 0.24 }, { head: 'run', w: 0.16 }, { head: 'slope', w: 0.2, color: C.secInk }];
export const STEP_ROWS = STEPS.map(s => [s.x, s.y, s.rise, s.run, s.slope]);
/** Bánh xe đo chuẩn (b13 đồng hồ tốc độ, b20 công-tơ-mét, b22 — vẽ lại ĐÚNG): wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, … }). */
export const WHEEL = { cx: 1250, y: 930, r: 95 };
/** Camera đi từ A tới B (k 0 → 1, êm): điểm nhìn + vị trí tuyến tính, tỉ lệ theo hình học (zoom đều mắt). */
export function lerpView(A, B, k) {
  const e = smooth(clamp(k)); if (e <= 0) return A; if (e >= 1) return B;
  const sx = A.sx * (B.sx / A.sx) ** e, sy = A.sy * (B.sy / A.sy) ** e;
  // giữ điểm giữa đường đi trên màn hình: nội suy pixel của MỘT điểm toán chung (gốc của B) rồi dựng lại
  const ax = A.X(B.fx), ay = A.Y(B.fy);
  return view(B.fx, B.fy, lerp(ax, B.px, e), lerp(ay, B.py, e), sx, sy);
}

// ═════════════════════════ SƯỜN ĐỒI y = x² (vật xuyên suốt) ═════════════════════════
function surf(V, a, b, f = sq, n = 220) {
  const ua = Math.max(a, Math.min(V.u(-60), V.u(W + 60))), ub = Math.min(b, Math.max(V.u(-60), V.u(W + 60)));
  const pts = []; if (ub <= ua) return pts;
  for (let i = 0; i <= n; i++) { const u = ua + (ub - ua) * i / n; pts.push([V.X(u), V.Y(f(u))]); }
  return pts;
}
/** Lớp đất trắc dọc trong vùng clip: dải ngang (pixel) từ y0 xuống, sỏi neo theo toạ độ TOÁN (đi theo camera). */
function strataFill(g, V, y0, seed = 0) {
  const bands = [0, 46, 120, 210, 330, 470, 2400];
  for (let i = 0; i < bands.length - 1; i++) { g.fillStyle = STRATA[i % STRATA.length]; g.fillRect(-10, y0 + bands[i], W + 20, bands[i + 1] - bands[i] + 1);
    g.strokeStyle = 'rgba(110,74,28,0.25)'; g.lineWidth = 2; g.beginPath(); for (let px = -10; px <= W + 10; px += 10) { const py = y0 + bands[i] + Math.sin(px * 0.013 + i * 1.7) * 5; px > -10 ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
  for (let k = 0; k < 300; k++) { const px = V.X(-3 + hash(k * 1.37 + seed) * 6), py = y0 + 24 + hash(k * 2.71 + seed) * 900, r = 2 + hash(k * 4.13 + seed) * 5;
    if (px < -20 || px > W + 20 || py > H + 20) continue;
    g.fillStyle = `rgba(110,80,45,${0.18 + hash(k * 5.9) * 0.2})`; g.beginPath(); g.ellipse(px, py, r * 1.4, r, hash(k) * 3, 0, TAU); g.fill(); }
}
/** Mép cỏ dọc đường cong: nét lục đậm + nhúm cỏ lay theo giờ video. */
function turf(g, V, a, b, { w = 7, tufts = true, t = 0, f = sq, df = u => 2 * u } = {}) {
  const pts = surf(V, a, b, f); if (pts.length < 2) return;
  const p = new Path2D(); pts.forEach(([x, y], i) => i ? p.lineTo(x, y) : p.moveTo(x, y));
  g.save(); g.lineJoin = 'round'; if (!TH.sketch) { g.strokeStyle = C.grass; g.lineWidth = w + 10; g.stroke(p); } g.strokeStyle = C.curve; g.lineWidth = w + TH.curveW; g.stroke(p); g.restore();
  if (!tufts || TH.tufts <= 0) return;
  const vt = t + CLOCK; g.save(); g.strokeStyle = C.curve; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let i = 0; i < Math.round(120 * TH.tufts); i++) { const u = -3 + 6 * hash(i * 3.3 + 0.5); if (u < a || u > b) continue;
    const px = V.X(u), py = V.Y(f(u)); if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
    const d = Math.atan2(-df(u) * V.sy, V.sx), nx = Math.sin(d), ny = -Math.cos(d), L = 8 + hash(i * 1.7) * 10, sw = 0.18 * Math.sin(vt * 1.6 + i * 0.7);
    for (const s of [-0.35, 0, 0.35]) { g.beginPath(); g.moveTo(px, py); g.lineTo(px + (nx + (s + sw) * Math.cos(d)) * L, py + (ny + (s + sw) * Math.sin(d)) * L); g.stroke(); } }
  g.restore();
}
/**
 * Sườn đồi y = x² trong khung nhìn V: mặt cỏ có đường đồng mức, mép cỏ, lớp đất cắt dọc dưới đáy. Trả về Path2D vùng đất.
 * k: vẽ dần từ trái sang phải (0 → 1, "nó đi xuống, phẳng ở đáy, rồi leo lên"); rise: đồi trồi lên từ dưới (0 → 1).
 * a, b: khoảng x; t: giờ timeline (cỏ lay).
 */
export function hill(g, V, { a = -3, b = 3, k = 1, rise = 1, t = 0, contours = true, strata = true, tufts = true } = {}) {
  if (k <= 0 || rise <= 0) return null;
  const dy = (1 - outCubic(clamp(rise))) * 700, pts = surf(V, a, b); if (pts.length < 2) return null;
  g.save(); g.translate(0, dy);
  const xk = pts[0][0] + (pts.at(-1)[0] - pts[0][0]) * clamp(k);
  if (k < 1) { g.beginPath(); g.rect(-100, -2000, xk + 100, 5000); g.clip(); }
  const p = new Path2D(); p.moveTo(pts[0][0], H + 400); pts.forEach(([x, y]) => p.lineTo(x, y)); p.lineTo(pts.at(-1)[0], H + 400); p.closePath();
  g.fillStyle = C.face; g.fill(p);
  g.save(); g.clip(p);
  const lg = g.createLinearGradient(0, V.Y(4), 0, H); lg.addColorStop(0, 'rgba(255,255,230,0.20)'); lg.addColorStop(1, 'rgba(40,80,30,0.10)'); g.fillStyle = lg; g.fillRect(0, -400, W, H + 800);
  if (TH.sketch) { g.strokeStyle = 'rgba(46,90,44,0.16)'; g.lineWidth = 2; for (let q = -H; q < W + H; q += 26) { g.beginPath(); g.moveTo(q, -400); g.lineTo(q - 1400, H + 400); g.stroke(); } }
  if (contours && TH.contour > 0) { g.strokeStyle = `rgba(62,122,58,${TH.contour})`; g.lineWidth = 2;
    for (let j = 1; j <= 7; j++) { g.beginPath(); pts.forEach(([x, y], i) => { const u = V.u(x), sgn = u >= 0 ? 1 : -1, yy = y + j * 44 * (0.45 + 0.55 * Math.min(1, Math.abs(u) / 2)); i ? g.lineTo(x + sgn * j * 9, yy) : g.moveTo(x + sgn * j * 9, yy); }); g.stroke(); } }
  if (strata && TH.strataA > 0) { g.save(); g.globalAlpha *= TH.strataA; const cut = new Path2D(); cut.moveTo(pts[0][0], H + 400); pts.forEach(([x, y]) => cut.lineTo(x, y + 26)); cut.lineTo(pts.at(-1)[0], H + 400); cut.closePath();
    g.save(); g.clip(cut); g.beginPath(); g.rect(-10, V.Y(0) - 30, W + 20, 3000); g.clip(); strataFill(g, V, V.Y(0) - 30, 1); g.restore();
    g.strokeStyle = 'rgba(110,74,28,0.35)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-10, V.Y(0) - 30); g.lineTo(W + 10, V.Y(0) - 30); g.stroke(); g.restore(); }
  g.restore();
  turf(g, V, a, b, { t, tufts });
  g.restore();
  return p;
}
/** Đồi cỏ gần (tiền cảnh trái — mascot đứng trên). rise: 1 = ở chỗ, 0 = lặn hẳn xuống. */
export function mound(g, t = 0, rise = 1) {
  if (rise <= 0) return; const dy = (1 - outCubic(clamp(rise))) * 460, vt = t + CLOCK;
  g.save(); g.translate(0, dy);
  const m = new Path2D(); m.moveTo(0, 700); m.bezierCurveTo(300, 668, 560, 676, 680, 730); m.bezierCurveTo(800, 790, 870, 930, 930, H + 20); m.lineTo(0, H + 20); m.closePath();
  g.fillStyle = TH.mound[0]; g.fill(m); g.save(); g.clip(m); const mg = g.createLinearGradient(0, 680, 0, H); mg.addColorStop(0, 'rgba(255,255,230,0.25)'); mg.addColorStop(1, 'rgba(40,80,30,0.25)'); g.fillStyle = mg; g.fillRect(0, 600, 1000, 500);
  g.strokeStyle = `rgba(62,122,58,${TH.mound[2]})`; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let k = 0; k < 140; k++) { const qx = hash(k * 2.3) * 900, qy = 700 + hash(k * 6.1) * 380, L = 8 + hash(k * 3.7) * 10, s = 3 * Math.sin(vt * 1.5 + k); g.beginPath(); g.moveTo(qx, qy); g.lineTo(qx - 3 + s, qy - L); g.moveTo(qx, qy); g.lineTo(qx + 4 + s, qy - L * 0.8); g.stroke(); }
  g.restore(); g.strokeStyle = TH.mound[1]; g.lineWidth = 5; g.stroke(m); g.restore();
}
/** Đường bất kỳ y = f(x) trong khung V (vd đường mòn, 2x): nét màu, vẽ dần theo k. */
export function plot(g, V, f, a, b, { color = C.ink, w = 6, k = 1, dash = null } = {}) {
  if (k <= 0) return; const pts = surf(V, a, a + (b - a) * clamp(k), f, 240); if (pts.length < 2) return;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) g.setLineDash(dash);
  g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore();
}

// ═════════════════════════ cọc tiêu, dây đo (cát tuyến), sào ngắm (tiếp tuyến), điểm sáng, người đi bộ ═════════════════════════
/** Cọc tiêu sọc đỏ trắng cắm tại (px, py). k: rơi cắm xuống (0 → 1); lift: nhổ lên bay đi. */
export function rangingPole(g, px, py, { h = 110, w = 9, k = 1, lift = 0 } = {}) {
  if (k <= 0 || lift >= 1) return;
  const y = py - (1 - drop(k)) * 260 - outCubic(clamp(lift)) ** 1.5 * (py + h + 40);
  shadowRR(g, px - w / 2, y - h, w, h, 3, { col: 'rgba(40,60,50,0.22)', blur: 6, ox: 5, oy: 3 });
  const seg = h / 6; for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? C.white : C.pole; g.fillRect(px - w / 2, y - h + i * seg, w, seg + 0.5); }
  g.strokeStyle = 'rgba(60,30,20,0.45)'; g.lineWidth = 1.5; g.strokeRect(px - w / 2, y - h, w, h);
  g.fillStyle = '#5A5148'; g.beginPath(); g.moveTo(px - w / 2, y); g.lineTo(px + w / 2, y); g.lineTo(px, y + 10); g.closePath(); g.fill();
}
/**
 * Dây đo xanh (CÁT TUYẾN) giữa (x1, x1²) và (x2, x2²) trong khung V, kéo thẳng ra ngoài cọc x2 một đoạn ext, ngoài x1 ext0 (đơn vị x).
 * k: dây nhả từ cọc 1 tới cọc 2 (0 → 1); a: độ đậm; poles: cắm cọc ở x2 (k cọc riêng: poleK). Trả về dốc (đã must).
 */
export function secant(g, V, x1, x2, { k = 1, a = 1, ext = 0.12, ext0 = ext, poles = true, poleK = 1, w = 5, lift = 0 } = {}) {
  const m = secSlope(x1, x2);
  if (poles) rangingPole(g, V.X(x2), V.Y(x2 * x2), { k: poleK, lift });
  if (k <= 0 || a <= 0 || lift >= 1) return m;
  const lo = Math.min(x1, x2) - (x2 > x1 ? ext0 : ext), hi = Math.max(x1, x2) + (x2 > x1 ? ext : ext0), s = x2 > x1 ? 1 : -1, end = x1 + (s > 0 ? hi - x1 : lo - x1) * clamp(k), st = s > 0 ? lo : hi;
  const y = u => x1 * x1 + m * (u - x1), up = outCubic(clamp(lift)) * 600;
  g.save(); g.globalAlpha *= a * (1 - clamp(lift));
  line(g, V.X(k >= 1 ? st : x1), V.Y(y(k >= 1 ? st : x1)) - up, V.X(end), V.Y(y(end)) - up, C.sec, w);
  g.restore();
  return m;
}
/**
 * Sào ngắm sọc đỏ trắng (TIẾP TUYẾN) đặt TRƯỚC mặt cắt (DNA §1b): bóng sprite rơi lên mặt đồi phía sau-dưới, đầu bịt đồng,
 * mép sáng — đọc là thước ĐẶT áp vào đồi, không cắm vào đất. Toạ độ màn hình: (px, py) = điểm chạm, ang = góc (rad, màn
 * hình), L0 / L1 = độ dài px về hai phía. k: sào hạ xuống (từ hover px phía trên); lift: nhấc đi.
 */
export function rodAt(g, px, py, ang, L0, L1, { k = 1, w = 16, hover = 90, lift = 0 } = {}) {
  if (k <= 0 || lift >= 1) return;
  let nx = Math.sin(ang), ny = -Math.cos(ang); if (ny > 0) { nx = -nx; ny = -ny; }          // pháp tuyến hướng LÊN trời
  const off = (1 - outCubic(clamp(k))) * hover + outCubic(clamp(lift)) ** 1.5 * 900, ox = px + nx * off, oy = py + ny * off;
  g.save(); g.translate(ox, oy); g.rotate(ang);
  // bóng: hướng thế giới (14, 18) đổi sang hệ sào
  const sx = 14 * Math.cos(-ang) - 18 * Math.sin(-ang), sy = 14 * Math.sin(-ang) + 18 * Math.cos(-ang), fade = 1 - clamp(off / 140);
  if (fade > 0) shadowRR(g, -L0, -w / 2, L0 + L1, w, 5, { col: `rgba(40,50,30,${(0.30 * fade).toFixed(3)})`, blur: 9, ox: sx, oy: sy });
  const L = L0 + L1, n = Math.max(6, Math.round(L / 46)), seg = L / n;
  for (let i = 0; i < n; i++) { g.fillStyle = i % 2 ? '#FFF8EE' : C.pole; g.fillRect(-L0 + i * seg, -w / 2, seg + 0.5, w); }
  g.fillStyle = 'rgba(255,255,255,0.45)'; g.fillRect(-L0, -w / 2 + 2, L, 3);
  g.fillStyle = 'rgba(60,20,10,0.25)'; g.fillRect(-L0, w / 2 - 3, L, 3);
  for (let i = 1; i < n * 4; i++) if (i % 4) line(g, -L0 + i * seg / 4, -w / 2, -L0 + i * seg / 4, -w / 2 + 5, 'rgba(60,20,10,0.55)', 1.5, 'butt');
  g.strokeStyle = 'rgba(90,30,10,0.7)'; g.lineWidth = 2; g.strokeRect(-L0, -w / 2, L, w);
  for (const ex of [-L0 - 10, L1]) { g.fillStyle = '#B8923E'; g.fill(rr(ex, -w / 2 - 2, 10, w + 4, 3)); g.fillStyle = 'rgba(255,240,190,0.6)'; g.fillRect(ex + 2, -w / 2, 2, w); }
  g.restore();
}
/** Sào tiếp tuyến tại (x0, x0²) trong khung V: dài từ x0 + d0 tới x0 + d1 (đơn vị x, d0 < 0). turn: xoay thêm quanh điểm chạm (rad). */
export function rod(g, V, x0, { d0 = -0.55, d1 = 0.7, turn = 0, ...o } = {}) {
  const px = V.X(x0), py = V.Y(x0 * x0), ang = Math.atan2(V.Y(tanAt(x0, x0 + 1)) - py, V.X(x0 + 1) - px) + turn;
  const L0 = Math.hypot(V.X(x0 + d0) - px, V.Y(tanAt(x0, x0 + d0)) - py), L1 = Math.hypot(V.X(x0 + d1) - px, V.Y(tanAt(x0, x0 + d1)) - py);
  rodAt(g, px, py, ang, L0, L1, o);
  return { px, py, ang };
}
/** Điểm sáng đỏ (điểm đang hỏi) với hào quang ấm. k: bật; pulse 0…1 phồng. */
export function spot(g, px, py, { k = 1, r = 11, pulse = 0, a = 1 } = {}) {
  if (k <= 0 || a <= 0) return; const e = pop(k) * (1 + 0.25 * Math.sin(Math.PI * clamp(pulse))), q = r / 11;
  glow(g, px, py, 70 * e * q, '255,170,90', 0.75 * a); glow(g, px, py, 26 * e * q, '255,236,200', 0.95 * a);
  g.save(); g.globalAlpha *= a; g.fillStyle = C.pole; g.beginPath(); g.arc(px, py, r * e, 0, TAU); g.fill(); g.strokeStyle = C.white; g.lineWidth = 4; g.stroke(); g.restore();
}
/** Hố cọc RỖNG (lỗ của giới hạn): vòng tròn rỗng giấy trắng, viền navy. k: khoét. */
export function hole(g, px, py, { k = 1, r = 15 } = {}) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(px, py); g.scale(e, e);
  g.fillStyle = 'rgba(40,30,20,0.35)'; g.beginPath(); g.arc(2, 3, r + 2, 0, TAU); g.fill();
  g.fillStyle = C.paper; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 5; g.stroke(); g.restore();
}
/** Người đi bộ nhỏ (balo, gậy) đứng tại (px, py), mặt hướng lên dốc (phải). step: pha bước chân (giây × tốc độ) — 0 = đứng. */
export function hiker(g, px, py, s = 1, { step = 0, flip = false } = {}) {
  g.save(); g.translate(px, py); g.scale(s * (flip ? -1 : 1), s); g.lineCap = 'round'; g.lineJoin = 'round';
  const ink = '#2B3640', ph = Math.sin(step * TAU), bob = Math.abs(ph) * 3;
  g.translate(0, -bob);
  g.strokeStyle = ink; g.lineWidth = 7; g.beginPath(); g.moveTo(-8 + ph * 6, -2 + bob); g.lineTo(-2, -34); g.lineTo(10 - ph * 6, -4 + bob); g.stroke();
  g.fillStyle = '#3B4A57'; g.beginPath(); g.ellipse(-10 + ph * 6, bob, 8, 3.5, 0, 0, TAU); g.fill(); g.beginPath(); g.ellipse(13 - ph * 6, -5 + bob, 8, 3.5, -0.4, 0, TAU); g.fill();
  g.fillStyle = '#E7A33A'; g.fill(rr(-24, -78, 18, 34, 5));
  g.fillStyle = '#2F6DB5'; g.beginPath(); g.moveTo(-8, -76); g.lineTo(6, -74); g.lineTo(6, -34); g.lineTo(-6, -34); g.closePath(); g.fill();
  g.fillStyle = '#F1C9A5'; g.beginPath(); g.arc(1, -88, 10, 0, TAU); g.fill();
  g.fillStyle = '#4C6B3A'; g.beginPath(); g.ellipse(1, -95, 15, 4, 0, 0, TAU); g.fill(); g.fill(rr(-7, -106, 16, 11, 5));
  g.strokeStyle = '#2F6DB5'; g.lineWidth = 6; g.beginPath(); g.moveTo(2, -70); g.lineTo(18, -52); g.stroke();
  g.strokeStyle = '#8A6A44'; g.lineWidth = 3; g.beginPath(); g.moveTo(20, -56); g.lineTo(30 + ph * 4, -2); g.stroke();
  g.restore();
}
/** Cờ hiệu nhỏ cắm cạnh vật (cạnh hố cọc) — lay theo giờ video. */
export function flag(g, px, py, { k = 1, t = 0, color = C.pole, h = 90 } = {}) {
  if (k <= 0) return; const y = py - (1 - drop(k)) * 200, vt = t + CLOCK;
  line(g, px, y, px, y - h, '#5A5148', 4);
  g.fillStyle = color; g.beginPath(); g.moveTo(px, y - h); const wv = 6 * Math.sin(vt * 4);
  g.quadraticCurveTo(px + 24, y - h + 4 + wv, px + 50, y - h + 10); g.lineTo(px, y - h + 30); g.closePath(); g.fill();
}
/** Kính lúp thợ đo (soi vùng sát điểm): vòng tròn tâm (cx, cy) bán kính r, vẽ fn() bên trong (đã clip), viền đồng + cán. */
export function loupe(g, cx, cy, r, fn, { k = 1 } = {}) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(cx, cy); g.scale(e, e); g.translate(-cx, -cy);
  shadowRR(g, cx - r, cy - r, 2 * r, 2 * r, r, { col: 'rgba(30,40,30,0.30)', blur: 14, ox: 8, oy: 10 });
  line(g, cx + r * 0.72, cy + r * 0.72, cx + r * 1.25, cy + r * 1.25, '#5B4630', 22);
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); g.fillStyle = '#EEF4F0'; g.fillRect(cx - r, cy - r, 2 * r, 2 * r); fn(); g.restore();
  g.strokeStyle = '#B8923E'; g.lineWidth = 12; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke();
  g.strokeStyle = 'rgba(255,240,190,0.6)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r - 4, -2.4, -1.2); g.stroke();
  g.restore();
}

// ═════════════════════════ thẻ giấy sổ, biển tên mục, thẻ hồi ═════════════════════════
/**
 * Thẻ giấy sổ đo (thẻ số / nhãn): (cx, cy) = tâm. edge: dải màu trái theo NGHĨA (C.pole tiếp tuyến, C.sec cát tuyến, C.soil
 * diện tích, C.bad thừa, C.ink trung tính). mono: chữ ghi sổ Plex Mono; isMath: viết bằng math() (biến nghiêng). k: bật vào.
 * Đã đứng yên (k ≥ 1) mà ra ngoài vùng an toàn → ném. Trả về hộp {x, y, w, h}.
 */
export function card(g, s, cx, cy, { size = 40, color = C.ink, edge = C.ink, k = 1, mono = true, isMath = false, wt = 700, minW = 0, rot = 0, align = 'center', lift = 0 } = {}) {
  minSize(size, s, `card "${s}"`);
  const font = mono ? `500 ${size}px ${MO}` : `${wt} ${size}px ${AR}`;
  const tw = isMath ? measureMath(g, s, size, { mono, wt }) : measure(g, s, font), w = Math.max(minW, tw + 64), h = Math.round(size * 1.6);
  const x0 = align === 'left' ? cx : align === 'right' ? cx - w : cx - w / 2, box = { x: x0, y: cy - h / 2, w, h };
  if (k <= 0 || lift >= 1) return box;
  if (k >= 1 && lift <= 0) inSafe(box, `card "${s}"`);
  const e = pop(k), up = outCubic(clamp(lift)) ** 1.5 * (cy + h + 60), mx = x0 + w / 2;
  g.save(); g.translate(mx, cy - up); g.rotate(rot + 0.05 * (1 - clamp(k)) * Math.sin(k * 12)); g.scale(e, e);
  shadowRR(g, -w / 2, -h / 2, w, h, 6, { col: 'rgba(40,50,40,0.22)', blur: 8, ox: 3, oy: 5 });
  g.fillStyle = C.paper; g.fill(rr(-w / 2, -h / 2, w, h, 6));
  g.save(); g.clip(rr(-w / 2, -h / 2, w, h, 6)); g.fillStyle = edge; g.fillRect(-w / 2, -h / 2, 8, h); g.restore();
  if (isMath) math(g, s, 4, 2, { px: size, color, align: 'center', base: 'middle', mono, wt });
  else text(g, s, 4, 2, { font, color, align: 'center', base: 'middle' });
  g.restore();
  return box;
}
/** Biển tên mục: thẻ giấy góc trên trái (x 104, y 72, cao 66), mép trái sọc cọc tiêu. Chữ 700 34px Archivo ≤ SEC_MAX. */
export const SEC_MAX = 720;
export function secTag(g, name, { k = 1, lift = 0, t = 0, x = 104, y = 72 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const font = `700 34px ${AR}`, tw = fits(g, name, font, SEC_MAX, 'secTag'), bw = tw + 76, bh = 66;
  const yy = y - (1 - outBack(clamp(k), 1.4)) * (y + bh + 20) - outCubic(clamp(lift)) * (y + bh + 30);
  g.save(); g.translate(x, yy); g.rotate(0.01 * Math.sin((t + CLOCK) * 1.3));
  shade(g, () => { g.fillStyle = C.paper; g.fill(rr(0, 0, bw, bh, 8)); }, { box: [0, 0, bw, bh, 8], blur: 10, oy: 6, col: 'rgba(40,50,40,0.22)' });
  g.save(); g.clip(rr(0, 0, bw, bh, 8)); for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? C.white : C.pole; g.fillRect(0, i * bh / 6, 12, bh / 6 + 0.5); } g.restore();
  text(g, name, 12 + (bw - 12) / 2, bh / 2 + 3, { font, align: 'center', base: 'middle' });
  g.restore();
  return { x, y: yy, w: bw, h: bh };
}
/** Chữ hồi tối đa (ký tự): "ACT SEVEN" / "ACT THREE" = 9. Phụ đề Plex Mono 500 44px ≤ ACT_SUB_MAX px. */
export const ACT_MAX = 9, ACT_SUB_MAX = 1000;
/**
 * Thẻ HỒI (DNA §7): cuốn sổ đo bìa vải xanh rơi xuống giữa khung, chữ hồi dập nổi trắng trên bìa, nhãn giấy (phụ đề) ghi
 * dần; quanh start cả cuốn nhấc khỏi khung. Hiện từ start − 2.45 tới start + 0.45. Cụm chiếm x ~ 400–1520, y 300–780.
 */
export function actTitle(g, t, start, act, sub) {
  if (t < start - 2.45 || t > start + 0.45) return;
  if ([...act].length > ACT_MAX) throw new Error(`actTitle: "${act}" > ${ACT_MAX} ký tự`);
  fits(g, sub, `500 44px ${MO}`, ACT_SUB_MAX, 'actTitle');
  const kd = prog(t, start - 2.45, start - 1.95), lift = prog(t, start - 0.3, start + 0.45);
  const bw = 1100, bh = 460, x = W / 2 - bw / 2, y = 300 - (1 - drop(kd)) * 900 - outCubic(lift) ** 1.4 * 1300;
  shadowRR(g, x, y, bw, bh, 18, { col: 'rgba(30,40,30,0.32)', blur: 22, ox: 12, oy: 16 });
  g.drawImage(BG.cover, 300, 200, bw, bh, x, y, bw, bh);
  g.save(); g.strokeStyle = 'rgba(240,230,200,0.5)'; g.lineWidth = 3; g.setLineDash([12, 9]); g.strokeRect(x + 22, y + 22, bw - 44, bh - 44); g.restore();
  g.fillStyle = '#1C3A2C'; g.fillRect(x, y, 34, bh);                                                             // gáy sổ
  g.fillStyle = C.pole; g.fillRect(x + bw - 80, y, 26, bh);                                                     // dây chun đỏ
  const ka = prog(t, start - 2.05, start - 1.55);
  if (ka > 0) { g.save(); g.globalAlpha = 0.35; text(g, act, W / 2 + 3, y + 205, { font: `900 132px ${AR}`, color: '#0E2219', align: 'center', k: ka }); g.restore();
    text(g, act, W / 2, y + 200, { font: `900 132px ${AR}`, color: '#F4EEDC', align: 'center', k: ka }); }
  const ks = prog(t, start - 1.5, start - 0.9);
  if (ks > 0) { const sw = measure(g, sub, `500 44px ${MO}`) + 80, sx = W / 2 - sw / 2, sy = y + 270;
    g.save(); g.translate(W / 2, sy + 45); g.scale(pop(ks), pop(ks)); g.translate(-W / 2, -(sy + 45));
    shadowRR(g, sx, sy, sw, 90, 6, { col: 'rgba(0,0,0,0.25)', blur: 8, oy: 5 }); g.fillStyle = C.paper; g.fill(rr(sx, sy, sw, 90, 6)); g.restore();
    text(g, sub, W / 2, sy + 60, { font: `500 44px ${MO}`, color: C.ink, align: 'center', k: prog(t, start - 1.35, start - 0.6) }); }
}

// ═════════════════════════ SỔ ĐO (bảng số ghi tay) ═════════════════════════
/**
 * Sổ đo bìa cứng xanh: (x, y, w, h). cols = [{ head, w (phần bề rộng), color, isMath }]; rows = mảng chuỗi theo cột.
 * shown (thực): số dòng đã ghi — dòng i hiện dần khi shown đi từ i tới i + 1 (ghi sổ); quá chỗ thì dòng mới ĐẨY dòng cũ lên.
 * k: sổ trượt vào từ phải; lift: bay lên; hi: dòng được khoanh (navy). Chữ số Plex Mono 500 size (≥ 30). Trả về {x, y, w, h, rowY}.
 */
export function ledger(g, x, y, w, h, { cols, rows = [], shown = rows.length, k = 1, lift = 0, size = 36, rowH = 62, hi = -1, title = null } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const off = (1 - outCubic(clamp(k))) * (W - x + 80), up = outCubic(clamp(lift)) ** 1.5 * (y + h + 80);
  const X = x + off, Y = y - up;
  shadowRR(g, X, Y, w, h, 14, { col: 'rgba(30,40,30,0.30)', blur: 18, ox: 10, oy: 12 });
  g.drawImage(BG.cover, 100, 100, w, h, X, Y, w, h); g.strokeStyle = C.coverDk; g.lineWidth = 3; g.stroke(rr(X, Y, w, h, 14));
  const P = 18, px = X + P, py = Y + P, pw = w - 2 * P, ph = h - 2 * P;
  g.fillStyle = C.paper; g.fill(rr(px, py, pw, ph, 6));
  const headY = py + (title ? 64 : 0), bodyY = headY + rowH, xs = []; let cx = px + 22;
  cols.forEach(c => { xs.push(cx); cx += c.w * (pw - 44); });
  g.save(); g.beginPath(); g.rect(px, py, pw, ph); g.clip();
  for (let yy = bodyY; yy < py + ph; yy += rowH) line(g, px, yy, px + pw, yy, C.rule, 1.5, 'butt');
  line(g, px + 22 + cols[0].w * (pw - 44) - 10, py, px + 22 + cols[0].w * (pw - 44) - 10, py + ph, C.margin, 2, 'butt');
  if (title) text(g, title, px + 22, py + 44, { font: `700 30px ${AR}`, color: C.dim });
  cols.forEach((c, j) => { const hx = xs[j] + c.w * (pw - 44) / 2 - 8;
    if (c.isMath) math(g, c.head, hx, headY + rowH * 0.66, { px: 32, color: c.color || C.ink, align: 'center', mono: true });
    else text(g, c.head, hx, headY + rowH * 0.66, { font: `700 30px ${AR}`, color: c.color || C.ink, align: 'center' }); });
  line(g, px, bodyY, px + pw, bodyY, 'rgba(34,49,59,0.45)', 2.5, 'butt');
  const vis = Math.max(1, Math.floor((py + ph - bodyY) / rowH)), scroll = Math.max(0, shown - vis) * rowH;
  g.beginPath(); g.rect(px, bodyY + 2, pw, py + ph - bodyY - 2); g.clip();
  const rowY = i => bodyY + (i + 0.7) * rowH - scroll;
  rows.forEach((r, i) => { const kr = clamp(shown - i); if (kr <= 0) return; const yy = rowY(i);
    if (yy < bodyY - rowH || yy > py + ph + rowH) return;
    if (i === hi) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke(rr(px + 8, yy - rowH * 0.62, pw - 16, rowH * 0.86, 20)); g.restore(); }
    r.forEach((s, j) => { if (s == null || s === '') return; const c = cols[j], cw = c.w * (pw - 44), cx2 = xs[j] + cw / 2 - 8, kc = clamp(kr * r.length - j);
      if (kc <= 0) return;
      let fs = size; while (fs > MIN_NUM && measure(g, s, `500 ${fs}px ${MO}`) > cw - 10) fs--;          // ô hẹp: thu chữ, không dưới 30
      fits(g, s, `500 ${fs}px ${MO}`, cw - 6, 'ledger ô');
      text(g, s, cx2, yy, { font: `500 ${fs}px ${MO}`, color: c.color || C.ink, align: 'center', k: kc }); });
  });
  g.restore();
  return { x: X, y: Y, w, h, rowY };
}
/** Thanh khoảng [dưới, trên] trong sổ (thinner and thinner): trục nhỏ range, thanh đất, vạch ⅓ đỏ nét đứt. Trả về X(v). */
export function interval(g, x0, x1, y, lo, hi, { range = [0.2, 0.5], k = 1, third = true } = {}) {
  const S = v => x0 + (v - range[0]) / (range[1] - range[0]) * (x1 - x0); if (k <= 0) return S;
  line(g, x0, y, x1, y, 'rgba(34,49,59,0.4)', 2, 'butt');
  const e = outCubic(clamp(k)), a = S(lo), b = S(hi), m = (a + b) / 2, L = Math.max(6, (b - a) * e);
  g.fillStyle = C.soil; g.fill(rr(m - L / 2, y - 14, L, 28, 4)); g.strokeStyle = C.soilInk; g.lineWidth = 2; g.stroke(rr(m - L / 2, y - 14, L, 28, 4));
  if (third) { g.save(); g.setLineDash([6, 6]); line(g, S(1 / 3), y - 28, S(1 / 3), y + 28, C.poleInk, 3, 'butt'); g.restore(); }
  return S;
}

// ═════════════════════════ CỘT ĐẤT tích phân (trắc dọc) ═════════════════════════
/**
 * n dải dưới y = x² từ a tới b trong khung V như cột đất khoan địa chất. side 'right' = chạm đường cong ở mép PHẢI (tổng
 * trên — phần thò lên trên sườn = đất đắp THỪA gạch chéo tím); 'left' = mép TRÁI (tổng dưới — viền nét đứt navy).
 * k (0 … 1): cột mọc lên lần lượt; excess (0 … 1): độ hiện phần thừa; solid: n lớn thì bỏ viền từng cột.
 * Trả về tổng (đã must khi k ≥ 1): upper(n) / lower(n) (a = 0, b = 1).
 */
export function columns(g, V, n, { side = 'right', k = 1, excess = 1, a = 0, b = 1, outline = n <= 40, seed = 5, a_ = 1 } = {}) {
  if (k <= 0 || a_ <= 0) return 0;
  const dx = (b - a) / n, yB = V.Y(0), colPath = new Path2D(), cols = [];
  for (let i = 0; i < n; i++) {
    const kk = n > 40 ? clamp(k) : clamp(k * (n + 1) - i); if (kk <= 0) continue;   // n lớn: cả hàng mọc cùng lúc
    const u0 = a + i * dx, u1 = u0 + dx, hgt = side === 'right' ? sq(u1) : sq(u0), x0 = V.X(u0) + (n <= 20 ? 3 : 0), x1 = V.X(u1) - (n <= 20 ? 3 : 0);
    const yT = yB - (yB - V.Y(hgt)) * outCubic(kk);
    if (yB - yT < 0.3) continue;
    colPath.rect(x0, yT, Math.max(0.6, x1 - x0), yB - yT); cols.push([x0, yT, x1, yB]);
  }
  const under = new Path2D(); under.moveTo(V.X(a), yB); surf(V, a, b).forEach(([x, y]) => under.lineTo(x, y)); under.lineTo(V.X(b), yB); under.closePath();
  g.save(); g.globalAlpha *= a_;
  if (n <= 20) for (const [x0, yT, x1, yb] of cols) shadowRR(g, x0, yT, x1 - x0, yb - yT, 3, { col: 'rgba(70,50,20,0.22)', blur: 10, ox: 6, oy: 6 });
  if (side === 'right' && excess > 0) {                                                // phần thừa trên đường cong
    g.save(); g.clip(colPath); g.globalAlpha *= clamp(excess); g.fillStyle = C.badFill; g.fillRect(V.X(a) - 10, 0, V.X(b) - V.X(a) + 20, yB);
    for (let j = -60; j < 80; j++) line(g, V.X(a) + j * 14, 0, V.X(a) + j * 14 + 1200, 1200, 'rgba(122,79,184,0.65)', 3, 'butt'); g.restore();
  }
  g.save(); g.clip(colPath); if (side === 'right') g.clip(under); strataFill(g, V, V.Y(0.55) - 40, seed); g.restore();
  if (outline) for (const [x0, yT, x1, yb] of cols) {
    if (side === 'right') { g.strokeStyle = excess > 0.5 ? C.badInk : C.soilInk; g.lineWidth = 3; g.strokeRect(x0, yT, x1 - x0, yb - yT); }
    else { g.save(); g.setLineDash([12, 8]); g.strokeStyle = C.ink; g.lineWidth = 4; g.strokeRect(x0, yT, x1 - x0, yb - yT); g.restore(); }
  }
  g.restore();
  const v = side === 'right' ? upper(n) : lower(n);
  if (k >= 1 && a === 0 && b === 1) { must(`${fmt(upper(n) - lower(n))}`, 1 / n); if (side === 'right' ? v <= 1 / 3 : v >= 1 / 3) throw new Error(`columns: tổng ${side} ${v} không kẹp ⅓`); }
  return v;
}
/** Diện tích dưới y = x² từ a tới b tô đất ĐẶC (đúng = ⅓ khi 0 … 1). k: đất dâng từ đáy. */
export function areaFill(g, V, a = 0, b = 1, { k = 1, seed = 7, outline = true } = {}) {
  if (k <= 0) return; const yB = V.Y(0), p = new Path2D(); p.moveTo(V.X(a), yB); surf(V, a, b).forEach(([x, y]) => p.lineTo(x, y)); p.lineTo(V.X(b), yB); p.closePath();
  g.save(); g.clip(p); g.beginPath(); g.rect(0, yB - (yB - V.Y(sq(Math.max(Math.abs(a), Math.abs(b))))) * outCubic(clamp(k)) - 4, W, H); g.clip(); strataFill(g, V, V.Y(0.55) - 40, seed); g.restore();
  if (outline && k >= 1) { g.strokeStyle = C.soilInk; g.lineWidth = 3; g.stroke(p); }
}

// ═════════════════════════ BÁNH XE ĐO + công-tơ-mét + đồng hồ tốc độ ═════════════════════════
/** Công-tơ-mét: ô số lăn (value thực — chữ số cuối lăn theo phần lẻ). (x, y) = góc trên trái; digits ô; size px chữ (≥ 30). */
export function odometer(g, x, y, value, { digits = 5, size = 40, k = 1, unit = null } = {}) {
  minSize(size, '0', 'odometer'); if (k <= 0) return 0;
  const cw = Math.round(size * 0.82), ch = Math.round(size * 1.3), w = digits * cw + 12, v = Math.max(0, value);
  shadowRR(g, x, y, w, ch + 12, 6, { col: 'rgba(0,0,0,0.3)', blur: 6, oy: 4 }); g.fillStyle = '#1E2A30'; g.fill(rr(x, y, w, ch + 12, 6));
  for (let i = 0; i < digits; i++) {
    const p = 10 ** (digits - 1 - i), d = Math.floor(v / p) % 10, frac = i === digits - 1 ? v - Math.floor(v) : (Math.floor(v / p * 10) % 10 === 9 && digits - 1 - i > 0 ? clamp((v % p) / p * 10 - 9) : 0);
    const cx = x + 6 + i * cw, cy = y + 6;
    g.save(); g.beginPath(); g.rect(cx + 2, cy, cw - 4, ch); g.clip(); g.fillStyle = i === digits - 1 ? '#FBF7EA' : '#EDE6D2'; g.fillRect(cx + 2, cy, cw - 4, ch);
    g.font = `500 ${size}px ${MO}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = C.ink;
    g.fillText(String(d), cx + cw / 2, cy + ch / 2 - frac * ch); g.fillText(String((d + 1) % 10), cx + cw / 2, cy + ch / 2 + ch - frac * ch);
    const sh = g.createLinearGradient(0, cy, 0, cy + ch); sh.addColorStop(0, 'rgba(0,0,0,0.35)'); sh.addColorStop(0.25, 'rgba(0,0,0,0)'); sh.addColorStop(0.75, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.35)'); g.fillStyle = sh; g.fillRect(cx + 2, cy, cw - 4, ch);
    g.restore();
  }
  if (unit) text(g, unit, x + w + 14, y + ch / 2 + 16, { font: `700 30px ${AR}`, color: C.ink });
  return w;
}
/** Đồng hồ tốc độ: mặt tròn giấy, vạch chia (không số — số chỉ khi có trong CONTENT), kim đỏ cọc tiêu theo frac 0 … 1. */
export function speedometer(g, cx, cy, r, frac, { k = 1, label = null } = {}) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(cx, cy); g.scale(e, e);
  shade(g, () => { g.fillStyle = '#1E2A30'; g.beginPath(); g.arc(0, 0, r + 10, 0, TAU); g.fill(); }, { box: [-r - 10, -r - 10, 2 * r + 20, 2 * r + 20, r + 10], blur: 10, oy: 6, col: 'rgba(0,0,0,0.3)' });
  g.fillStyle = C.paper; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
  const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25;
  for (let i = 0; i <= 20; i++) { const a = a0 + (a1 - a0) * i / 20, L = i % 5 ? r * 0.1 : r * 0.2; line(g, Math.cos(a) * (r - 6), Math.sin(a) * (r - 6), Math.cos(a) * (r - 6 - L), Math.sin(a) * (r - 6 - L), C.ink, i % 5 ? 2 : 4, 'butt'); }
  const a = a0 + (a1 - a0) * clamp(frac); line(g, -Math.cos(a) * r * 0.12, -Math.sin(a) * r * 0.12, Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78, C.pole, Math.max(4, r * 0.06));
  g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, r * 0.09, 0, TAU); g.fill();
  if (label) text(g, label, 0, r * 0.5, { font: `700 30px ${AR}`, color: C.ink, align: 'center', base: 'middle' });
  g.restore();
}
/**
 * Bánh xe đo của thợ đo đạc lăn trên mặt đất (y = groundY): bánh bán kính r tại cx, nan xoay theo quãng đã lăn (dist, px),
 * cán chéo lên trái tới tay cầm có ĐỒNG HỒ TỐC ĐỘ (speed 0 … 1) và CÔNG-TƠ-MÉT ở trục (odo). k: bật vào. Trả về {hub, grip}.
 */
export function wheel(g, cx, groundY, { r = 95, dist = 0, k = 1, speed = null, odo = null, odoDigits = 4 } = {}) {
  if (k <= 0) return null; const e = outCubic(clamp(k)), x = cx - (1 - e) * 600, hy = groundY - r;
  const gx = x - 300, gy = hy - 330;
  line(g, x, hy, gx, gy, '#5B4630', 12); line(g, gx - 30, gy - 18, gx + 30, gy + 18, '#2B2622', 16);
  g.save(); g.globalAlpha = 0.28; g.fillStyle = '#28321F'; g.beginPath(); g.ellipse(x + 16, groundY + 6, r * 0.9, 10, 0, 0, TAU); g.fill(); g.restore();
  g.save(); g.translate(x, hy); g.rotate(dist / r);
  g.fillStyle = '#2B2622'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.fillStyle = '#E9E2CF'; g.beginPath(); g.arc(0, 0, r - 12, 0, TAU); g.fill();
  for (let i = 0; i < 6; i++) { const a = i * TAU / 6; line(g, 0, 0, Math.cos(a) * (r - 14), Math.sin(a) * (r - 14), '#5B4630', 7); }
  g.fillStyle = C.pole; g.fillRect(-5, -r + 1, 10, 12);
  g.fillStyle = '#B8923E'; g.beginPath(); g.arc(0, 0, 14, 0, TAU); g.fill(); g.restore();
  if (speed != null) speedometer(g, gx + 10, gy - 92, 72, speed);
  if (odo != null) { const mx = x + (gx - x) * 0.42, my = hy + (gy - hy) * 0.42, ow = odoDigits * Math.round(34 * 0.82) + 12;   // hộp số gắn trên cán
    g.fillStyle = '#B8923E'; g.beginPath(); g.arc(mx, my, 9, 0, TAU); g.fill(); odometer(g, mx - ow / 2, my - 30, odo, { digits: odoDigits, size: 34 }); }
  return { hub: [x, hy], grip: [gx, gy] };
}

// ═════════════════════════ ẢNH THẬT kẹp vào bìa sổ (DNA §8) ═════════════════════════
/** Ảnh: assets/photos/INDEX.md (một nguồn: key, tác giả, giấy phép, nhãn BẮT BUỘC). credit in dòng nhỏ dưới ảnh. */
export const PHOTOS = {
  newton: { src: './assets/photos/newton.jpg', credit: 'Godfrey Kneller (1689) · Public domain · Wikimedia Commons', label: ['ISAAC NEWTON · 1643–1727'], focus: [0.5, 0.25] },
  leibniz: { src: './assets/photos/leibniz.jpg', credit: 'Christoph Bernhard Francke (c. 1695) · Public domain · Wikimedia Commons', label: ['GOTTFRIED LEIBNIZ · 1646–1716'], focus: [0.5, 0.22] },
  nova: { src: './assets/photos/nova.jpg', credit: 'G. W. Leibniz (Acta Eruditorum, Oct 1684) · Public domain · Wikimedia Commons', label: ['NOVA METHODUS', 'ACTA ERUDITORUM · 1684'], focus: [0.5, 0.12] },
  archimedes: { src: './assets/photos/archimedes.jpg', credit: 'Domenico Fetti (1620) · Public domain · Wikimedia Commons', label: ['ARCHIMEDES', 'AS IMAGINED IN 1620', 'c. 287–212 BC'], focus: [0.5, 0.3] },   // nhãn INDEX chia 3 thẻ (một thẻ rộng 600 px tràn vùng an toàn)
};
must(`'${PHOTOS.newton.label[0]}'`, `ISAAC NEWTON · ${YEARS.newton[0]}–${YEARS.newton[1]}`);
must(`'${PHOTOS.leibniz.label[0]}'`, `GOTTFRIED LEIBNIZ · ${YEARS.leibniz[0]}–${YEARS.leibniz[1]}`);
must(`'${PHOTOS.nova.label[1]}'`, `ACTA ERUDITORUM · ${YEARS.nova}`);
must(`'${PHOTOS.archimedes.label.join(', ').replace('ES, AS', 'ES, AS').replace('1620, c.', '1620 · c.')}'`, `ARCHIMEDES, AS IMAGINED IN 1620 · c. ${YEARS.archimedes[0]}–${YEARS.archimedes[1]} BC`);
export const PHOTO_MISSING = [];
export const photoImages = (...keys) => Object.fromEntries(keys.map(k => { const q = PHOTOS[k]; if (!q) throw new Error(`photoImages: "${k}" không có trong PHOTOS`); return ['photo:' + k, q.src]; }));
const SMALL = {};
function small(key, im, sc) {
  const id = key + ':' + sc.toFixed(3); if (SMALL[id]) return SMALL[id];
  let cur = im; while (cur.width * 0.5 >= im.width * sc) { const [c, x] = cpu(cur.width / 2, cur.height / 2); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height); cur = c; }
  const [c, x] = cpu(im.width * sc, im.height * sc); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height);
  return (SMALL[id] = c);
}
/** Credit dưới ảnh trên viền giấy trắng: một dòng 20 → 14 px, rồi hai dòng (ngắt trước " · " cuối), rồi mỗi " · " một dòng; vẫn tràn → ném. */
function creditLines(g, cr, maxW, key) {
  for (let fs = 20; fs >= 14; fs--) if (measure(g, cr, `500 ${fs}px ${AR}`) <= maxW) return { fs, lines: [cr] };
  const i = cr.lastIndexOf(' · '), two = i > 0 ? [cr.slice(0, i), cr.slice(i + 3)] : [cr];
  for (let fs = 18; fs >= 14; fs--) if (two.every(l => measure(g, l, `500 ${fs}px ${AR}`) <= maxW)) return { fs, lines: two };
  const all = cr.split(' · ');
  for (let fs = 18; fs >= 14; fs--) if (all.every(l => measure(g, l, `500 ${fs}px ${AR}`) <= maxW)) return { fs, lines: all };
  throw new Error(`photo credit "${key}" quá dài cho khung ${maxW} px`);
}
/**
 * Ảnh thật in giấy ảnh viền trắng, kẹp giấy đồng ở mép trên, bóng sprite: khung ngoài (x, y, w, h). Credit trong viền dưới.
 * label: mảng thẻ dưới ảnh (nhãn BẮT BUỘC = PHOTOS[key].label — truyền true). k: trượt vào (from 'left'|'right'|'top');
 * rot; zoom / focus: đẩy chậm. lift: bay lên khỏi khung. Trả về hộp {x, y, w, h}.
 */
export function photo(g, key, x, y, w, h, { k = 1, rot = -0.02, label = true, labelK = null, zoom = 1, focus: fc = null, from = 'left', lift = 0, size = 30 } = {}) {
  const Q = PHOTOS[key]; if (!Q) throw new Error(`photo: "${key}" không có trong PHOTOS`);
  if (k <= 0 || lift >= 1) return { x, y, w, h };
  const im = IM['photo:' + key], focus = fc || Q.focus || [0.5, 0.4], e = outCubic(clamp(k));
  const off = from === 'right' ? (1 - e) * (W - x + 120) : from === 'left' ? -(1 - e) * (x + w + 160) : 0, up = (from === 'top' ? -(1 - drop(k)) * (y + h + 200) : 0) - outCubic(clamp(lift)) ** 1.5 * (y + h + 300);
  const M = 18, CL = creditLines(g, Q.credit, w - 2 * M, key), credH = CL.lines.length * (CL.fs + 5) + 14;
  g.save(); g.translate(x + w / 2 + off, y + h / 2 + up); g.rotate(rot * e);
  shadowRR(g, -w / 2, -h / 2, w, h, 4, { col: 'rgba(20,30,20,0.35)', blur: 14, ox: 8, oy: 12 });
  g.fillStyle = '#FFFDF7'; g.fillRect(-w / 2, -h / 2, w, h);
  const px = -w / 2 + M, py = -h / 2 + M, pw = w - 2 * M, ph = h - 2 * M - credH;
  g.save(); g.beginPath(); g.rect(px, py, pw, ph); g.clip();
  if (im) { const sm = small(key, im, Math.max(pw / im.width, ph / im.height) * 1.12), sc = Math.max(pw / sm.width, ph / sm.height) * zoom, iw = sm.width * sc, ih = sm.height * sc;
    g.drawImage(sm, px - (iw - pw) * focus[0], py - (ih - ph) * focus[1], iw, ih); }
  else { g.fillStyle = '#EDE6D2'; g.fillRect(px, py, pw, ph); text(g, 'PHOTO TO COME', 0, py + ph / 2, { font: `700 30px ${AR}`, color: C.dim, align: 'center' }); }
  g.restore();
  g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 1; g.strokeRect(px, py, pw, ph);
  CL.lines.forEach((ln, i) => { g.font = `500 ${CL.fs}px ${AR}`; g.textAlign = 'right'; g.textBaseline = 'middle'; g.fillStyle = C.dim; g.fillText(ln, px + pw, py + ph + 10 + (i + 0.5) * (CL.fs + 5)); });
  // kẹp giấy đồng
  g.save(); g.translate(-w * 0.22, -h / 2 - 6); g.strokeStyle = '#A8873A'; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-10, 40); g.lineTo(-10, -14); g.arc(0, -14, 10, Math.PI, 0); g.lineTo(10, 30); g.arc(2, 30, 8, 0, Math.PI); g.lineTo(-6, -6); g.stroke(); g.restore();
  g.restore();
  let ly = y + h + 46 + up; const lk = labelK ?? clamp(k * 1.6 - 0.6);
  if (label) [].concat(label === true ? Q.label : label).forEach(ln => { card(g, ln, x + w / 2 + off, ly, { size, k: lk, lift, mono: false, wt: 700 }); ly += Math.round(size * 1.6) + 8; });
  return { x: x + off, y: y + up, w, h };
}

// ═════════════════════════ đồng xu hai mặt + ba thẻ lời hứa (cold open; b21 vẽ lại ĐÚNG) ═════════════════════════
/** Hình mini trên một mặt: 'slope' = dốc nhỏ + sào chạm một điểm · 'strips' = 4 cột đất dưới dốc · 'hole' = đường thẳng thủng lỗ (ap: hai chấm lần tới lỗ từ hai phía). */
export function mini(g, kind, cx, cy, s = 1, { k = 1, ap = 0 } = {}) {
  if (k <= 0) return; const V = view(0.5, 0.5, cx, cy, 150 * s, 150 * s);
  g.save();
  if (kind === 'slope') { plot(g, V, sq, -0.1, 1.15, { color: C.curve, w: 7 * s }); const x0 = 0.6;
    line(g, V.X(x0 - 0.42), V.Y(tanAt(x0, x0 - 0.42)), V.X(x0 + 0.5), V.Y(tanAt(x0, x0 + 0.5)), C.pole, 9 * s); spot(g, V.X(x0), V.Y(x0 * x0), { r: 8 * s, k }); }
  else if (kind === 'strips') { for (let i = 0; i < 4; i++) { const u0 = i / 4, x0 = V.X(u0) + 2, x1 = V.X(u0 + 0.25) - 2, yT = V.Y(sq(u0 + 0.25) * clamp(k * 1.2)); g.fillStyle = STRATA[i % 3 + 1]; g.fillRect(x0, yT, x1 - x0, V.Y(0) - yT); g.strokeStyle = C.soilInk; g.lineWidth = 2; g.strokeRect(x0, yT, x1 - x0, V.Y(0) - yT); }
    plot(g, V, sq, -0.05, 1.05, { color: C.curve, w: 6 * s }); }
  else if (kind === 'hole') { plot(g, V, u => u * 0.8 + 0.1, -0.05, 1.05, { color: C.soilInk, w: 9 * s }); hole(g, V.X(0.5), V.Y(0.5), { r: 13 * s, k });
    if (ap > 0) for (const sd of [-1, 1]) { const u = 0.5 + sd * 0.45 * (1 - outCubic(clamp(ap))) + sd * 0.07; g.fillStyle = C.ink; g.beginPath(); g.arc(V.X(u), V.Y(u * 0.8 + 0.1), 9 * s, 0, TAU); g.fill(); } }   // ap: hai bên lần tới lỗ
  else throw new Error(`mini: không có "${kind}"`);
  g.restore();
}
/** Đồng xu đồng hai mặt (đạo hàm ↔ tích phân): flip 0 → 1 lật nửa vòng (0: mặt 'slope', 1: mặt 'strips'; 2 = một vòng trọn). */
export function coin(g, cx, cy, r, { flip = 0, k = 1 } = {}) {
  if (k <= 0) return; const e = pop(k), ang = Math.PI * Math.max(0, flip), sx = Math.cos(ang), face = sx >= 0 ? 'slope' : 'strips';
  g.save(); g.translate(cx, cy); g.scale(e, e);
  g.fillStyle = '#8A6420'; g.beginPath(); g.ellipse(4, 6, Math.max(6, r * Math.abs(sx)), r, 0, 0, TAU); g.fill();
  g.scale(Math.max(0.04, Math.abs(sx)), 1);
  const gr = g.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r); gr.addColorStop(0, '#F3D27A'); gr.addColorStop(1, '#C9973A'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
  g.strokeStyle = '#A8873A'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, r - 10, 0, TAU); g.stroke();
  g.fillStyle = C.paper; g.beginPath(); g.arc(0, 0, r - 16, 0, TAU); g.fill();
  g.save(); g.beginPath(); g.arc(0, 0, r - 18, 0, TAU); g.clip(); mini(g, face, 0, 6, r / 150); g.restore();
  g.restore();
}
/** Vị trí ba thẻ lời hứa (vật dùng chung a0 S5 ↔ b21). */
export const PROMISE = { xs: [620, 1060, 1500], base: 760, w: 360, h: 330 };
export const PROMISE_CAP = ['SLOPE AT A POINT?', 'WHAT IS A LIMIT?', 'TWO SIDES, ONE COIN?'];
/**
 * Thẻ lời hứa i (0, 1, 2): trang sổ đo (giấy kẻ) có số tròn đỏ cọc tiêu ở góc, hình trên trang: ① dốc + sào chạm MỘT điểm
 * · ② "0/0" + đường thủng một lỗ (ap: hai chấm lần tới lỗ) · ③ đồng xu hai mặt (flip). k: thẻ rơi xuống; kp: hình hiện; cap: chú thích (0 → 1).
 */
export function promiseCard(g, i, { k = 1, kp = 1, cap = 1, flip = 0, ap = 0, lift = 0, cx = PROMISE.xs[i], base = PROMISE.base } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const { w, h } = PROMISE, b = base - (1 - drop(k)) * 700 - outCubic(clamp(lift)) ** 1.5 * (base + 200), fx = cx - w / 2, fy = b - h;
  shadowRR(g, fx, fy, w, h, 8, { col: 'rgba(30,40,30,0.28)', blur: 14, ox: 8, oy: 10 });
  g.fillStyle = C.paper; g.fill(rr(fx, fy, w, h, 8));
  g.save(); g.clip(rr(fx, fy, w, h, 8)); for (let yy = fy + 50; yy < fy + h; yy += 40) line(g, fx, yy, fx + w, yy, C.rule, 1.5, 'butt'); line(g, fx + 54, fy, fx + 54, fy + h, C.margin, 2, 'butt'); g.restore();
  if (kp > 0) {
    if (i === 0) mini(g, 'slope', cx + 6, fy + h * 0.56, 1.25, { k: kp });
    else if (i === 1) { mini(g, 'hole', cx + 20, fy + h * 0.62, 1.15, { k: kp, ap }); frac(g, '0', '0', cx - 90, fy + 108, { px: 52, color: C.ink, k: kp }); }
    else coin(g, cx + 14, fy + h * 0.52, 118, { flip, k: kp });
  }
  // số tròn đỏ cọc tiêu
  const n = String(i + 1); g.save(); g.translate(fx + 8, fy + 6); g.fillStyle = C.poleInk; g.beginPath(); g.arc(0, 0, 32, 0, TAU); g.fill(); g.strokeStyle = C.white; g.lineWidth = 3; g.stroke();
  text(g, n, 0, 2, { font: `800 38px ${AR}`, color: C.white, align: 'center', base: 'middle' }); g.restore();
  if (cap > 0) { fits(g, PROMISE_CAP[i], `700 30px ${AR}`, 400, 'promise cap'); card(g, PROMISE_CAP[i], cx, b + 52, { size: 30, mono: false, wt: 700, k: cap, edge: C.pole }); }
  return { x: fx, y: fy, w, h };
}

// ═════════════════════════ mascot NÓI (DNA §5) ═════════════════════════
const IM = {}, SIL = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
/** Chiều cao tối đa mascot (DNA §5: ≤ 25% khung = 270 px). */
export const FIG_MAX = 270;
/** Mascot nhỏ ở mép dưới. k: trồi lên + bật; t (giờ timeline) → miệng nói theo lời khi đã đứng hẳn. Trả về hộp. */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false } = {}) {
  if (k <= 0) return null;
  if (h > FIG_MAX) throw new Error(`figure: cao ${h} px > ${FIG_MAX} — DNA §5 mascot nhỏ`);
  const key = 'pose-' + pose, im = IM[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * (CROP[pose] ?? 1), s = h / sh0, w = im.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.6, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.22; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 10, y0 + 8, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: flip ? 2 * cx - x0 - w : x0, y: y0, w, h };
}

// ═════════════════════════ chuyển cảnh (DNA §7) — trang p1/p2 gọi ═════════════════════════
let TAPE;
function makeTape() {                                                  // thước dây vàng cao hết khung (kéo ngang)
  const w = 230, [c, x] = cpu(w, H + 40);
  x.fillStyle = C.tape; x.fillRect(0, 0, w, H + 40);
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(6, 0, 6, H + 40); x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(w - 10, 0, 6, H + 40);
  for (let i = 0; i * 12 < H + 40; i++) { const L = i % 10 === 0 ? 86 : i % 5 === 0 ? 56 : 30, yy = i * 12; x.fillStyle = '#2B2622'; x.fillRect(w - 24 - L, yy, L, i % 10 === 0 ? 4 : 2.5); }
  for (let i = 0; i * 120 < H + 40; i++) { x.fillStyle = C.pole; x.fillRect(20, i * 120 - 2, 40, 22); }
  return { c, w };
}
/** Thước dây vàng kéo ngang (cùng ERA): dải thước cao hết khung đi TRÁI → PHẢI; cảnh mới lộ PHÍA SAU (bên trái). */
export function tapeSwap(g, k, drawPrev, drawCur) {
  const { c, w } = TAPE, e = smooth(clamp(k)), L = -w - 40 + e * (W + 2 * w + 80);
  g.save(); g.beginPath(); g.rect(L + w / 2, 0, W - L, H); g.clip(); drawPrev(); g.restore();
  g.save(); g.beginPath(); g.rect(0, 0, Math.max(0, L + w / 2), H); g.clip(); drawCur(); g.restore();
  const sg = g.createLinearGradient(L + w, 0, L + w + 60, 0); sg.addColorStop(0, 'rgba(40,50,40,0.28)'); sg.addColorStop(1, 'rgba(40,50,40,0)'); g.fillStyle = sg; g.fillRect(L + w, 0, 60, H);
  g.drawImage(c, L, -20 + Math.sin(e * 7) * 6);
}
/** Lật trang sổ đo (khác ERA): trang cũ gập về gáy TRÁI (co ngang + tối dần), cảnh mới lộ bên dưới; nửa sau trang mới mở ra. */
export function pageSwap(g, k, drawPrev, drawCur) {
  const e = smooth(clamp(k));
  if (e < 0.5) {
    const s = Math.cos(e * Math.PI);                                    // 1 → 0
    g.save(); drawCur(); g.restore();
    g.fillStyle = 'rgba(20,30,20,0.25)'; g.fillRect(0, 0, W, H);
    g.save(); g.beginPath(); g.rect(0, 0, W * s, H); g.clip(); g.translate(0, 0); g.scale(s, 1); drawPrev(); g.restore();
    const sh = g.createLinearGradient(W * s - 80, 0, W * s, 0); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, `rgba(0,0,0,${0.35 * (1 - s)})`); g.fillStyle = sh; g.fillRect(W * s - 80, 0, 80, H);
    g.fillStyle = C.paper; g.fillRect(W * s - 3, 0, 6, H);
  } else {
    const s = -Math.cos(e * Math.PI);                                   // 0 → 1: mặt sau trang (giấy sổ) trải ra rồi lộ cảnh mới
    g.save(); drawCur(); g.restore();
    g.save(); g.globalAlpha = 1 - s; g.fillStyle = C.paper; g.fillRect(0, 0, W * (1 - s) * 0.5, H); g.restore();
  }
}

// ═════════════════════════ nạp ═════════════════════════
/** Nạp ảnh {key: url} ('pose-<tên>' mascot, 'photo:<key>' ảnh thật — thiếu tệp thì ghi PHOTO_MISSING) + sinh nền MỘT lần. */
export async function loadKit(images) {
  BG.field = skySprite(C.sky0, C.sky1); BG.sheet = skySprite('#E3EEF0', '#F6F4EA'); BG.hills = hillsSprite(); BG.cover = coverSprite();
  BG.cloud0 = cloudSprite(1); BG.cloud1 = cloudSprite(0.8); TAPE = makeTape();
  const photos = Object.entries(images).filter(([k]) => k.startsWith('photo:')), rest = Object.fromEntries(Object.entries(images).filter(([k]) => !k.startsWith('photo:')));
  await loadImages(rest, IM);
  await Promise.all(photos.map(([k, u]) => loadImages({ [k]: u }, IM).catch(() => { PHOTO_MISSING.push(k.slice(6)); console.warn('kit: thiếu ảnh ' + u); })));
  for (const key of Object.keys(rest)) if (key.startsWith('pose-')) {
    const im = IM[key], [c, x] = cpu(im.width, im.height); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#4E6A5A'; x.fillRect(0, 0, im.width, im.height); SIL[key] = c;
  }
}
