// Đồ nghề chung của ja/hikari — DNA「節穴の暗室」(projects/ja/hikari/DNA.md): cả bài diễn ra trong MỘT căn phòng Nhật tối
// đóng 雨戸; ánh sáng chỉ vào qua một LỖ (節穴) ở bức tường bên trái (x 0–92, nhìn mặt cắt). Không gì hiện ra cho tới khi ánh
// sáng chạm tới nó — đó chính là bài học: "thấy" = ánh sáng tới được mắt. Lỗ là vật xuyên suốt (節穴 → ba ngọn đèn → hai khe
// Young → khe kính quang phổ → khe "cửa sổ" trên thước phổ → cửa sổ lăng kính → đồng tử), cuối bài 雨戸 mở ra ánh ngày.
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm THUẦN của tham số (tất định); nền, hạt, bóng mascot, ảnh lịch sử sinh MỘT lần (nạp / lần gọi đầu, canvas
// CPU). k ∈ [0, 1] là tiến độ hiện ra; mọi hàm có k thử ở 0.25/0.5/0.75/1 trên kit-test.html (LESSONS §89).
//
// LUẬT KIT GIỮ BẰNG CODE (LESSONS §95, DNA §9):
//  • MÀU = ÁNH SÁNG. Mọi màu có sắc độ đi qua wl2rgb(nm) (bảng CIE 1931 2° 5 nm, nhúng dưới đây) — chùm sáng, vạch phổ, cầu
//    vồng, chấm màu cạnh nhãn (chip). Chữ, khung, sơ đồ: trung tính. ink() ném lỗi khi nhận hex có sắc (độ bão hoà > 0.12).
//    Không có màu nhấn cho UI (①②③④, dấu "đáp án"): nhấn bằng độ sáng, cỡ, vòng mảnh 生成り.
//  • Mọi hàm chữ (write, telop, wrong, title, actCard, nhãn ảnh, thẻ hứa) ném lỗi khi chữ Nhật < 28 px, khi hộp chữ ra ngoài vùng
//    an toàn x 96–1824, y 64–1016, và khi font thiếu ký tự (Noto thiếu ⁰⁵–⁹⁻₀–₃ ✗; Shippori thiếu thêm λ ν γ ⊥ ≈ ∝ μ ℏ θ π ∞ ≠ √
//    ℃ ✓). Luỹ thừa của 10 → pow10() (chữ số thường, số mũ nâng — miễn cỡ). Miễn cỡ DUY NHẤT: { sup: true } cho chuỗi chỉ số/dấu.
//  • Kicker từng hồi ở ACTS (actCard, title({ act })) — cảnh không tự viết. Lỗ ở tường trái (WALL_X); chùm từ lỗ đi sang phải.
//  • Số lên hình (λ, eV, góc cầu vồng, 5.86×, 544 nm, 8分19秒, 2%) tính ở đây + must — cảnh không gõ tay số vật lý.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages, must } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';
import { MOUTHS } from '../../../assets/character-v2/mouths.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';
export const TAU = 2 * Math.PI;

// ═════════════════════════ bố cục cố định (DNA §1) ═════════════════════════
/** Tường 雨戸 bên trái (mặt cắt) chiếm x 0–WALL_X; lỗ mặc định ở APT. Sàn tatami từ FLOOR. */
export const WALL_X = 92, APT = { x: 92, y: 360 }, FLOOR = 948;
/** Vùng an toàn chữ (CRAFT §5). */
export const SAFE = { x0: 96, x1: 1824, y0: 64, y1: 1016 };

// ═════════════════════════ bảng màu (DNA §2) — chỉ màu TRUNG TÍNH ═════════════════════════
export const C = {
  room: '#0B0B0E', struct: '#1E1C19', wood: '#16130F', text: '#EDE8DF', dim: '#9A958C', faint: '#5E5A53',
  light: '#F6F2EA', plate: '#141317', day: '#EFEAE0', dayInk: '#23211F', sky: '#20252C',
};
export const MIN = '"Shippori Mincho"', JP = '"Noto Sans JP"';
/** Mọi mặt chữ kit và cảnh dùng — trang nạp đủ bằng Promise.all trước init (LESSONS §16, đua font). */
export const FONTS = [`700 40px ${MIN}`, `400 40px ${MIN}`, `400 40px ${JP}`, `500 40px ${JP}`, `700 40px ${JP}`, `900 40px ${JP}`];
export const FONT_SAMPLE = '光の正体なぜ世界は見えるのか第一幕論争波粒電場磁場虹赤紫可視光線紫外線赤外線電波マイクロ波X線ガンマ線0123456789%①②③④λνγ×°→←↑nmeV毎秒何十兆個';
const NO_MIN = /[λνγ⊥≈∝μℏθπ∞≠√℃✓✗⁰⁵⁶⁷⁸⁹⁻₀₁₂₃]/u, NO_JP = /[⁰⁵⁶⁷⁸⁹⁻₀₁₂₃✗]/u;

const rgbOf = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const lum = hex => { const v = rgbOf(hex).map(c => c / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const needC = (a, b, what, k = 4.5) => { const c = contrast(a, b); if (c < k) throw new Error(`kit: tương phản ${what} ${c.toFixed(2)} < ${k}`); };
for (const [k, v] of Object.entries({ text: C.text, dim: C.dim })) for (const [bn, b] of [['phòng', C.room], ['kết cấu', C.struct], ['tấm', C.plate], ['trời', C.sky]]) needC(v, b, `${k}/${bn}`);
needC(C.dayInk, C.day, 'mực/ánh ngày');
const sat = hex => { const [r, g, b] = rgbOf(hex), mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx ? (mx - mn) / mx : 0; };

/** Màu chữ / nét trung tính: '@ink' (mặc định), '@dim', '@faint', '@light', '@dark' (ánh ngày) — hoặc hex KHÔNG sắc. */
export function ink(col) {
  const M = { '@ink': C.text, '@dim': C.dim, '@faint': C.faint, '@light': C.light, '@dark': C.dayInk };
  if (col == null) return C.text;
  if (M[col]) return M[col];
  if (/^#[0-9a-f]{6}$/i.test(col) && sat(col) <= 0.12) return col;
  throw new Error(`kit: màu "${col}" có sắc — màu chỉ đến từ bước sóng (wl2rgb / chip), DNA §2`);
}

// ═════════════════════════ màu từ bước sóng (CIE 1931 2°, 5 nm, 380–780) ═════════════════════════
// Nguồn: CIE 1931 2° CMF (CVRL), bản trong /usr/share/colord/cmf/CIE1931-2deg-XYZ.cmf, cắt 380–780, 4 chữ số.
const CMF = {
  X: [0.001368,0.002236,0.004243,0.00765,0.01431,0.02319,0.04351,0.07763,0.1344,0.2148,0.2839,0.3285,0.3483,0.3481,0.3362,0.3187,0.2908,0.2511,0.1954,0.1421,0.09564,0.05795,0.03201,0.0147,0.0049,0.0024,0.0093,0.0291,0.06327,0.1096,0.1655,0.2257,0.2904,0.3597,0.4334,0.5121,0.5945,0.6784,0.7621,0.8425,0.9163,0.9786,1.026,1.057,1.062,1.046,1.003,0.9384,0.8544,0.7514,0.6424,0.5419,0.4479,0.3608,0.2835,0.2187,0.1649,0.1212,0.0874,0.0636,0.04677,0.0329,0.0227,0.01584,0.01136,0.008111,0.00579,0.004109,0.002899,0.002049,0.00144,0.0009999,0.0006901,0.000476,0.0003323,0.0002348,0.0001662,0.0001174,8.308e-05,5.871e-05,4.151e-05],
  Y: [3.9e-05,6.4e-05,0.00012,0.000217,0.000396,0.00064,0.00121,0.00218,0.004,0.0073,0.0116,0.01684,0.023,0.0298,0.038,0.048,0.06,0.0739,0.09098,0.1126,0.139,0.1693,0.208,0.2586,0.323,0.4073,0.503,0.6082,0.71,0.7932,0.862,0.9149,0.954,0.9803,0.995,1,0.995,0.9786,0.952,0.9154,0.87,0.8163,0.757,0.6949,0.631,0.5668,0.503,0.4412,0.381,0.321,0.265,0.217,0.175,0.1382,0.107,0.0816,0.061,0.04458,0.032,0.0232,0.017,0.01192,0.00821,0.005723,0.004102,0.002929,0.002091,0.001484,0.001047,0.00074,0.00052,0.0003611,0.0002492,0.0001719,0.00012,8.48e-05,6e-05,4.24e-05,3e-05,2.12e-05,1.499e-05],
  Z: [0.00645,0.01055,0.02005,0.03621,0.06785,0.1102,0.2074,0.3713,0.6456,1.039,1.386,1.623,1.747,1.783,1.772,1.744,1.669,1.528,1.288,1.042,0.813,0.6162,0.4652,0.3533,0.272,0.2123,0.1582,0.1117,0.07825,0.05725,0.04216,0.02984,0.0203,0.0134,0.00875,0.00575,0.0039,0.00275,0.0021,0.0018,0.00165,0.0014,0.0011,0.001,0.0008,0.0006,0.00034,0.00024,0.00019,0.0001,5e-05,3e-05,2e-05,1e-05,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
};
must(`${CMF.X.length === 81 && CMF.Y.length === 81 && CMF.Z.length === 81}`, true);
/** XYZ của ánh sáng đơn sắc nm (nội suy tuyến tính, kẹp 380–780). */
export function xyzOf(nm) {
  const f = clamp((nm - 380) / 5, 0, 80), i = Math.min(79, Math.floor(f)), u = f - i;
  return ['X', 'Y', 'Z'].map(k => CMF[k][i] * (1 - u) + CMF[k][i + 1] * u);
}
const M_SRGB = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
const gamma = c => c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
const lin2rgb = v => v.map(c => Math.round(255 * gamma(clamp(c))));
// Hiệu chỉnh sắc độ phía tím–lam: sRGB không có lam đơn sắc; cắt kênh làm 440–460 trượt sang tím (450 ≈ 259°, cách 400 chỉ 8°).
// Giữ S, V của màu cắt, chỉ đặt lại HUE theo neo (tím 400–420 ≈ 276–272°, lam 450 ≈ 244°, 465 ≈ 234°, nối liền 470 ≈ 229°).
const HUE_ANCHORS = [[380, 278], [400, 276], [420, 272], [435, 262], [450, 244], [465, 234], [470, 229]];
const hueTarget = nm => { const A = HUE_ANCHORS; if (nm >= 470) return null; if (nm <= A[0][0]) return A[0][1];
  for (let i = 1; i < A.length; i++) if (nm <= A[i][0]) { const u = (nm - A[i - 1][0]) / (A[i][0] - A[i - 1][0]); return A[i - 1][1] + u * (A[i][1] - A[i - 1][1]); } return null; };
function setHue([r, g, b], h) {                           // HSV: giữ S, V
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return [r, g, b];
  const hh = (((h % 360) + 360) % 360) / 60, i = Math.floor(hh), f = hh - i, p = mn, q = mx - d * f, t = mn + d * f;
  return [[mx, t, p], [q, mx, p], [p, mx, t], [p, q, mx], [t, p, mx], [mx, p, q]][i % 6].map(Math.round);
}
/** Bao sáng hai đầu CHỈ cho dải/băng liên tục (không cho chip một vạch): 0.25 ở 380 / 780, đủ sáng 440–650 (smoothstep) (dải phổ không thành khối RGB cứng). */
export const eyeFade = nm => nm < 440 ? 0.25 + 0.75 * smooth(clamp((nm - 380) / 60)) : nm > 650 ? 0.25 + 0.75 * smooth(clamp((780 - nm) / 130)) ** 2 : 1;
/**
 * Bước sóng → [r, g, b] 0–255 (sRGB). XYZ → sRGB tuyến tính → đưa vào gam: phần âm lớn (480–540) cộng tới 35% như ánh trắng,
 * rồi cắt âm (giữ sắc, tách 520 / 546 khỏi cùng một #00FF00) → chuẩn hoá kênh lớn nhất = 1 (sáng đủ để vẽ ánh sáng) → gamma sRGB.
 * fade: nhân eyeFade (dải phổ); level: nhân độ sáng 0..1 trước gamma.
 */
export function wl2rgb(nm, { fade = false, level = 1 } = {}) {
  const [X, Y, Z] = xyzOf(nm); let v = M_SRGB.map(r => r[0] * X + r[1] * Y + r[2] * Z);
  const mn = Math.min(...v), m0 = Math.max(...v);
  // phần âm LỚN (lục–lam 480–540: −mn/max ≈ 0.4–0.7) → pha trắng; phần âm nhỏ ở hai đầu (đỏ 620–780, lam tím) → chỉ cắt, vì gamma
  // phóng đại chút trắng thành ánh hồng (700 nm từng ra #FF0031)
  if (mn < 0) { const f = 0.35 * smooth(clamp((-mn / m0 - 0.15) / 0.3)); v = v.map(c => Math.max(0, c - mn * f)); }
  const mx = Math.max(...v) || 1, f = fade ? eyeFade(nm) : 1;      // bao sáng nhân SAU gamma (độ sáng cảm nhận — trước gamma 0.5 vẫn ra 73%)
  let rgb = lin2rgb(v.map(c => c / mx * level)); const ht = hueTarget(nm); if (ht !== null) rgb = setHue(rgb, ht);
  return rgb.map(c => Math.round(c * f));
}
export const wlHex = (nm, o) => '#' + wl2rgb(nm, o).map(v => v.toString(16).padStart(2, '0')).join('');
export const wlCss = (nm, a = 1, o) => `rgba(${wl2rgb(nm, o).join(',')},${a})`;
/** Lõi SÁNG của chùm: pha trắng (30%, xanh–tím 450–470 và tím < 430 nhiều hơn vì chỉ 2.6–3.0:1 trên nền đen — R3 Pitfall 2). */
export function coreRgb(nm) {
  const c = wl2rgb(nm), w = nm < 430 ? 0.5 : nm < 475 ? 0.45 : 0.3;
  return c.map(v => Math.round(v + (255 - v) * w));
}
const hueOf = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return 0;
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
export const hueNm = nm => hueOf(wl2rgb(nm));
// kiểm sắc độ (R3 Pitfall 1: hai cách nhanh từng ra 700 nm = cam, 380 nm = lam)
const inHue = (nm, a, b) => { const h = hueNm(nm); return a <= b ? h >= a && h <= b : h >= a || h <= b; };
must(`${inHue(700, 350, 8)}`, true);      // đỏ
must(`${inHue(656, 350, 8)}`, true);      // Hα đỏ
must(`${inHue(589, 25, 45)}`, true);      // Na: vàng cam
must(`${inHue(546, 105, 150)}`, true);    // lục
must(`${inHue(486, 185, 205)}`, true);    // Hβ lam lục
must(`${inHue(450, 238, 250)}`, true);    // lam (rõ ràng LAM — không tím)
must(`${inHue(470, 222, 238)}`, true);    // lam trời
must(`${inHue(434, 252, 270)}`, true);    // Hγ lam tím
for (const nm of [380, 400, 410, 420, 425]) must(`${inHue(nm, 268, 285)}`, true);   // tím
must(`${hueNm(400) - hueNm(450) >= 25 && hueNm(450) - hueNm(490) >= 40}`, true);    // tím / lam / cyan tách hẳn
must(`${inHue(490, 170, 195)}`, true); must(`${inHue(520, 135, 155)}`, true); must(`${inHue(580, 36, 48)}`, true); must(`${inHue(600, 10, 25)}`, true); must(`${inHue(620, 350, 8)}`, true);
for (const nm of [430, 450, 470]) needC('#' + coreRgb(nm).map(v => v.toString(16).padStart(2, '0')).join(''), C.room, `lõi chùm ${nm} nm`, 4.5);

// ═════════════════════════ hằng vật lý (mọi số lên hình qua must) ═════════════════════════
export const HC = 1239.84;                                   // eV·nm
export const eV = nm => HC / nm, nmOf = e => HC / e;
export const fmt = (v, d = 0) => v.toFixed(d);
/** Ánh sáng thấy được theo SCRIPT (ACT 4): 380–780 nm. */
export const VIS = [380, 780];
/** Natri: công thoát 2.28 eV → ngưỡng 544 nm (lục). Đỏ 700 = 1.77 eV ✗, xanh 450 = 2.76 eV ✓. */
export const NA_WORK = 2.28, NA_EDGE = nmOf(NA_WORK);
must(`'${fmt(NA_EDGE)}'`, '544'); must(`'${fmt(eV(700), 2)}'`, '1.77'); must(`'${fmt(eV(450), 2)}'`, '2.76'); must(`'${fmt(eV(380), 2)}'`, '3.26');
/** Hydro (Bohr, R∞hc = 13.606 eV): mức n, dãy Balmer n → 2. */
export const HLEV = n => -13.606 / (n * n);
export const balmer = n => HC / (HLEV(n) - HLEV(2));
export const H_LINES = [3, 4, 5, 6].map(n => +balmer(n).toFixed(1));
must(`'${H_LINES.join()}'`, '656.1,486,433.9,410.1');
must(`'${[1, 2, 3, 4, 5, 6].map(n => HLEV(n).toFixed(2)).join()}'`, '-13.61,-3.40,-1.51,-0.85,-0.54,-0.38');
/** Natri D (một vạch vàng cam đôi) và neon (nhóm đỏ cam dày + lục yếu) — NIST, R3 §0. */
export const NA_LINES = [589.0, 589.6];
export const NE_LINES = [540.1, 585.2, 588.2, 594.5, 597.6, 603.0, 607.4, 609.6, 614.3, 616.4, 621.7, 626.6, 633.4, 638.3, 640.2, 650.7, 659.9, 692.9, 703.2];
/** Mặt Trời → Trái Đất: 1 AU / c. */
export const SUN_S = 149.6e6 / 299792.458;
must(`'${Math.floor(SUN_S / 60)}分${Math.round(SUN_S % 60)}秒'`, '8分19秒');
/** Tán xạ Rayleigh ∝ 1/λ⁴: 450 vs 700 nm. */
export const RAYLEIGH = (700 / 450) ** 4;
must(`'${RAYLEIGH.toFixed(2)}'`, '5.86');
/** Phổ log: visible chiếm bao nhiêu phần của thước 1 km → 1 pm (15 thập phân). */
export const VIS_FRAC = Math.log10(VIS[1] / VIS[0]) / 15;
must(`'${(VIS_FRAC * 100).toFixed(1)}'`, '2.1');
/** Lò vi sóng 2.45 GHz → 12.2 cm; đồng hồ sóng 40 / 60 kHz → 7.5 / 5 km. */
export const LAMBDA = f => 299792458 / f;
must(`'${(LAMBDA(2.45e9) * 100).toFixed(1)}'`, '12.2'); must(`'${(LAMBDA(40e3) / 1000).toFixed(1)}'`, '7.5'); must(`'${(LAMBDA(60e3) / 1000).toFixed(0)}'`, '5');
/** Nón S/M/L và que — đỉnh nhạy (Stockman & Sharpe 2000). L đỉnh ở VÀNG LỤC, không phải đỏ. */
export const CONES = { S: 420, M: 534, L: 564, rod: 498 };
/** Chiết suất nước theo λ (Daimon & Masumura 2007, 20 °C) — nội suy tuyến tính, ngoài bảng giữ đầu mút. */
const NW = [[404.7, 1.3435], [486, 1.3371], [589, 1.3330], [656, 1.3311], [700, 1.3300]];
export function nWater(nm) {
  if (nm <= NW[0][0]) return NW[0][1]; if (nm >= NW[4][0]) return NW[4][1];
  for (let i = 0; i < 4; i++) if (nm <= NW[i + 1][0]) { const u = (nm - NW[i][0]) / (NW[i + 1][0] - NW[i][0]); return NW[i][1] + (NW[i + 1][1] - NW[i][1]) * u; }
}
const DEG = 180 / Math.PI;
/** Tia Descartes (độ lệch cực tiểu) với k lần phản xạ trong: góc tới i, góc khúc xạ r, góc cầu vồng θ quanh điểm đối Mặt Trời (độ). */
export function descartes(nm, k = 1) {
  const n = nWater(nm), i = Math.acos(Math.sqrt((n * n - 1) / (k * k + 2 * k))), r = Math.asin(Math.sin(i) / n);
  const th = k === 1 ? 4 * r - 2 * i : Math.PI + 2 * i - 6 * r;
  return { n, i: i * DEG, r: r * DEG, theta: th * DEG };
}
must(`'${[700, 656, 589, 486, 404.7].map(nm => descartes(nm).theta.toFixed(1)).join()}'`, '42.5,42.4,42.1,41.5,40.6');
must(`'${descartes(700, 2).theta.toFixed(1)},${descartes(404.7, 2).theta.toFixed(1)}'`, '50.1,53.6');

/** Bảng hồi (kicker) — actCard / title({ act }) đọc ở đây (SCRIPT.md # ACT n). */
export const ACTS = [['第一幕', '光をめぐる論争'], ['第二幕', '波でもあり、粒でもある'], ['第三幕', '光はどこで生まれるのか'], ['第四幕', '見えない光'],
  ['第五幕', '曲がる光、ほどける白'], ['第六幕', '色は頭の中にある'], ['第七幕', 'まとめ']];
/** Bốn câu hỏi (mục lục lời hứa: bốn chùm qua bốn lỗ chiếu lên bốn thẻ, a0) và bốn câu trả lời (まとめ, thẻ lật). */
export const QUESTIONS = ['光とは、何なのか？', '光は、どこで生まれる？', '虹の外の光が、なぜ見えない？', '光は、どうやって「色」になる？'];
export const ANSWERS = ['電場と磁場の波であり、光子の粒', '電子の階段と、熱', '目は、細い「窓」だけを使う', '色は、脳が信号から描く'];

// ═════════════════════════ nền (vẽ MỘT lần mỗi ERA) ═════════════════════════
const BG = {}, GRAIN = [];
function wallBand(x) {                                  // tường 雨戸 mặt cắt: ván gỗ tối, mép trong bắt chút ánh
  const gr = x.createLinearGradient(0, 0, WALL_X, 0); gr.addColorStop(0, '#0E0C09'); gr.addColorStop(0.8, C.wood); gr.addColorStop(1, '#221D16');
  x.fillStyle = gr; x.fillRect(0, 0, WALL_X, H);
  for (let y = 0; y < H; y += 180) { x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillRect(0, y, WALL_X, 2); }
  for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(80,66,48,${0.06 + 0.06 * hash(i * 3.7)})`; x.fillRect(4 + 80 * hash(i * 1.3), H * hash(i * 9.1), 1.2, 30 + 120 * hash(i * 5.5)); }
  x.fillStyle = 'rgba(237,232,223,0.05)'; x.fillRect(WALL_X - 2, 0, 2, H);
}
function makeRoom(kind) {
  const c = mk(), x = c.getContext('2d');
  if (kind === 'day') {
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#F6F2EA'); gr.addColorStop(1, '#E6DFD2'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    x.strokeStyle = 'rgba(35,33,31,0.08)'; x.lineWidth = 2; for (const X of [480, 960, 1440]) { x.beginPath(); x.moveTo(X, 0); x.lineTo(X, FLOOR); x.stroke(); }
    x.fillStyle = 'rgba(35,33,31,0.06)'; x.fillRect(0, FLOOR, W, H - FLOOR);
    return c;
  }
  if (kind === 'sky') {                                 // trời sau mưa nhìn qua 雨戸 mở: xám lam tối (chữ 生成り vẫn ≥ 4.5)
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#171B21'); gr.addColorStop(0.6, C.sky); gr.addColorStop(1, '#262A2E'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) { const px = W * hash(i * 1.7), py = H * hash(i * 4.3); x.strokeStyle = `rgba(180,190,205,${0.03 + 0.04 * hash(i)})`; x.lineWidth = 1; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 6, py + 34); x.stroke(); }
    x.fillStyle = '#0F1013'; x.fillRect(0, FLOOR + 20, W, H - FLOOR - 20);
    return c;
  }
  x.fillStyle = C.room; x.fillRect(0, 0, W, H);
  // kết cấu phòng chỉ là kết cấu (1.2:1): cột 柱, 長押 ngang, mép tatami — không mang thông tin
  x.fillStyle = 'rgba(30,28,25,0.55)';
  for (const X of [700, 1500]) x.fillRect(X, 0, 26, FLOOR);
  x.fillRect(WALL_X, 150, W, 14);
  const fl = x.createLinearGradient(0, FLOOR, 0, H); fl.addColorStop(0, '#16150F'); fl.addColorStop(1, '#0C0B09'); x.fillStyle = fl; x.fillRect(WALL_X, FLOOR, W, H - FLOOR);
  x.fillStyle = 'rgba(60,56,46,0.35)'; x.fillRect(WALL_X, FLOOR, W, 2);
  for (let X = WALL_X + 180; X < W; X += 360) { x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(X, FLOOR + 2, 2, H - FLOOR); }
  if (kind === 'lab') {                                  // phòng lab tối: thước nm treo dọc tường sau (rất mờ)
    x.fillStyle = 'rgba(30,28,25,0.8)'; x.fillRect(WALL_X, 990, W, 8);
    for (let X = 200; X < W; X += 40) x.fillRect(X, 980, 1.5, X % 200 === 0 ? 18 : 10);
  }
  if (kind === 'eye') {                                  // phòng = nhãn cầu: tường sau cong như võng mạc (chỉ kết cấu)
    x.strokeStyle = 'rgba(46,42,37,0.9)'; x.lineWidth = 10; x.beginPath(); x.ellipse(WALL_X + 40, H / 2 - 20, 1660, 600, 0, -0.62, 0.62); x.stroke();
  }
  const v = x.createRadialGradient(W * 0.55, H * 0.45, 300, W * 0.55, H * 0.45, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  wallBand(x);
  return c;
}
function makeGrain(seed) {                              // hạt tất định chống dải màu H.264 trên vùng tối rộng (R3 Pitfall 2)
  const c = mk(W / 2, H / 2), x = c.getContext('2d'), d = x.createImageData(c.width, c.height);
  for (let i = 0; i < c.width * c.height; i++) { const v = hash(i * 0.618 + seed * 101.3) * 255; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return c;
}
/** Chất liệu theo ERA (khoá của static ERA). darkroom = phòng tối (mặc định); lab = phòng tối + thước (hồi 2–3); sky = trời qua
 * 雨戸 mở (cầu vồng, hoàng hôn); eye = phòng thành nhãn cầu (hồi 6); day = ánh ngày (kết, 雨戸 mở hết — chữ '@dark'). */
export const ERA = { darkroom: { bg: C.room }, lab: { bg: C.room }, sky: { bg: C.sky }, eye: { bg: C.room }, day: { bg: C.day } };
/** Nền toàn khung của ERA. */
export function ground(g, era = 'darkroom') {
  if (!BG[era]) throw new Error(`ground: ERA lạ "${era}" (có: ${Object.keys(ERA).join(', ')})`);
  g.drawImage(BG[era], 0, 0);
}
/** Hạt phủ cuối khung (alpha nhỏ, đổi theo khung — hàm của t). Trang gọi sau render cảnh. */
export function grain(g, t, a = 0.035) {
  const f = Math.floor(t * 30 + 1e-6) & 1;
  g.save(); g.globalAlpha = a; g.globalCompositeOperation = 'overlay'; g.imageSmoothingEnabled = false; g.drawImage(GRAIN[f], 0, 0, W, H); g.restore();
}
/** Tối dần về đen (on 1 = sáng, 0 = đen kín) — a0 cuối → intro; p2 đầu ← intro. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(0,0,0,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }
/** Zoom nhẹ quanh (fx, fy) — ≤ 1.6× (DNA §7), riêng ruler → khe thấy được dùng zoomTo (≤ 12×, chỉ ACT 4 cuối). */
export function zoom(g, z, fx = W / 2, fy = H / 2) {
  if (z > 1.6 + 1e-9) throw new Error(`zoom ${z} > 1.6 (DNA §7)`);
  g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
}

// ═════════════════════════ LỖ (vật xuyên suốt) + 雨戸 ═════════════════════════
/**
 * Lỗ trên tường trái. kind: 'knot' 節穴 (bầu dục méo, viền gỗ) · 'slit' một khe · 'double' hai khe Young · 'lamps' ba lỗ (ba ngọn
 * đèn của Ibn al-Haytham) · 'window' cửa sổ hẹp (lăng kính) · 'pupil' đồng tử (vòng mống mắt). y: tâm; open 0..1 (lỗ mở / sáng
 * ra); glow: quầng sáng ngoài lỗ. Trả về danh sách điểm phát [{ x, y }].
 */
export function aperture(g, kind = 'knot', { y = APT.y, open = 1, glow = 1, gap = 90 } = {}) {
  const x = WALL_X, o = clamp(open), pts = [];
  const hole = (cy, hw, hh) => {                       // khe xuyên tường: ánh ngoài trời rò qua, loé ra phía phòng
    const r = hh * 3.4 + 26, gr = g.createRadialGradient(x, cy, 1, x, cy, r);
    gr.addColorStop(0, `rgba(250,247,240,${0.75 * glow * o})`); gr.addColorStop(0.25, `rgba(246,242,234,${0.22 * glow * o})`); gr.addColorStop(1, 'rgba(246,242,234,0)');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(x - r, cy - r, 2 * r, 2 * r); g.restore();
    const ho = hh * Math.max(0.08, o);
    g.fillStyle = `rgba(252,250,245,${0.3 + 0.7 * o})`; g.beginPath(); g.moveTo(x - WALL_X, cy - ho * 0.7); g.lineTo(x, cy - ho); g.lineTo(x, cy + ho); g.lineTo(x - WALL_X, cy + ho * 0.7); g.closePath(); g.fill();
    g.fillStyle = `rgba(255,255,255,${o})`; g.fillRect(x - 3, cy - ho, 3, 2 * ho);
    pts.push({ x, y: cy });
  };
  g.save();
  if (kind === 'knot') {
    const kg = g.createRadialGradient(x - 40, y, 4, x - 40, y, 46); kg.addColorStop(0, '#3A2C1D'); kg.addColorStop(0.6, '#241B12'); kg.addColorStop(1, 'rgba(22,19,15,0)');
    g.fillStyle = kg; g.beginPath(); g.ellipse(x - 40, y, 52, 46, 0, 0, TAU); g.fill();                        // mắt gỗ (節) quanh lỗ
    g.strokeStyle = 'rgba(80,64,44,0.6)'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(x - 40, y, 40, 34, 0, 0, TAU); g.stroke();
    hole(y, 6, 10);
  } else if (kind === 'slit') hole(y, 5, 16);
  else if (kind === 'double') { hole(y - gap / 2, 4, 12); hole(y + gap / 2, 4, 12); }
  else if (kind === 'lamps') { hole(y - gap, 5, 9); hole(y, 5, 9); hole(y + gap, 5, 9); }
  else if (kind === 'window') hole(y, 7, 48);
  else if (kind === 'pupil') {
    g.strokeStyle = 'rgba(154,149,140,0.9)'; g.lineWidth = 3;
    for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; g.beginPath(); g.moveTo(x - 9 + Math.cos(a) * 14 * 0.45, y + Math.sin(a) * 14); g.lineTo(x - 9 + Math.cos(a) * 30 * 0.45, y + Math.sin(a) * 30); g.stroke(); }
    hole(y, 6, 13);
  } else throw new Error(`aperture: loại lạ "${kind}"`);
  g.restore();
  return pts;
}
/**
 * 雨戸 phủ khung: ván gỗ đứng 240 px trượt từ trái sang (cover 0 → 1 = kín). from 'left' | 'right'. Ván kín vẫn rò vài điểm sáng
 * (lỗ mắt gỗ) — dùng cho chuyển cảnh cùng ERA (khép rồi mở) và kết bài (mở hết ra ánh ngày: cover 1 → 0, from 'right').
 */
export function amado(g, cover, { from = 'left' } = {}) {
  const c = clamp(cover); if (c <= 0) return;
  const bw = 240, n = Math.ceil(W / bw), edge = Math.round(W * smooth(c));
  g.save();
  for (let i = 0; i < n; i++) {
    const x0 = from === 'left' ? edge - (n - i) * bw : W - edge + i * bw;
    if (x0 + bw < 0 || x0 > W) continue;
    const gr = g.createLinearGradient(x0, 0, x0 + bw, 0); gr.addColorStop(0, '#1A1611'); gr.addColorStop(0.5, '#14110D'); gr.addColorStop(1, '#0E0C09');
    g.fillStyle = gr; g.fillRect(x0, 0, bw, H);
    g.fillStyle = 'rgba(0,0,0,0.7)'; g.fillRect(x0 + bw - 3, 0, 3, H);
    for (let j = 0; j < 14; j++) { g.fillStyle = `rgba(70,58,42,${0.10 + 0.08 * hash(i * 17 + j)})`; g.fillRect(x0 + bw * hash(i * 7 + j * 3.1), 0, 1.5, H); }
    const ky = 160 + 760 * hash(i * 5.3 + 2), kx = x0 + 40 + 160 * hash(i * 2.9);
    const lg = g.createRadialGradient(kx, ky, 0, kx, ky, 26); lg.addColorStop(0, 'rgba(246,242,234,0.9)'); lg.addColorStop(0.25, 'rgba(246,242,234,0.25)'); lg.addColorStop(1, 'rgba(246,242,234,0)');
    if (hash(i * 1.7) > 0.4) { g.fillStyle = lg; g.fillRect(kx - 26, ky - 26, 52, 52); }
  }
  g.restore();
}

// ═════════════════════════ ánh sáng: chùm, luồng bụi, photon, sóng ═════════════════════════
/** Màu của một chùm: số nm, hoặc 'white' (ánh trắng = tổng mọi sợi). Trả về { glow: [r,g,b], core: [r,g,b] }. */
function lightOf(nm) {
  if (nm === 'white' || nm == null) return { glow: [246, 242, 234], core: [255, 253, 248] };
  return { glow: wl2rgb(nm), core: coreRgb(nm) };
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
function polyLen(P) { let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); return L; }
function polyPath(g, P, k) {
  let want = polyLen(P) * clamp(k); g.beginPath(); g.moveTo(...P[0]);
  for (let i = 1; i < P.length && want > 0; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]), q = Math.min(1, want / d);
    g.lineTo(P[i - 1][0] + (P[i][0] - P[i - 1][0]) * q, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * q); want -= d; }
}
/** Điểm ở tiến độ k dọc polyline (đầu chùm đang bay). */
export function along(P, k) {
  let want = polyLen(P) * clamp(k);
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
    if (want <= d) { const q = d ? want / d : 0; return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * q, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * q]; } want -= d; }
  return P[P.length - 1];
}
/**
 * Tia sáng (sơ đồ): polyline P (≥ 2 điểm, gãy được — khúc xạ/phản xạ), bay dần theo k. nm: số hoặc 'white'. w ≥ 4 (R3: tia mảnh
 * tím biến mất). Quầng mềm 3 lớp + lõi sáng; quầng cộng 'lighter' nhưng alpha nhỏ để chỗ chồng không cháy trắng.
 */
export function ray(g, P, { nm = 'white', w = 5, k = 1, a = 1, glow = 1 } = {}) {
  if (k <= 0 || a <= 0) return;
  if (w < 4) throw new Error(`ray: w ${w} < 4 px (R3 Pitfall 2)`);
  const L = lightOf(nm);
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.globalCompositeOperation = 'lighter';
  for (const [m, al] of [[7, 0.05], [3.6, 0.10], [1.9, 0.22]]) { g.strokeStyle = rgba(L.glow, al * a * glow); g.lineWidth = w * m; polyPath(g, P, k); g.stroke(); }
  g.globalCompositeOperation = 'source-over';
  g.strokeStyle = rgba(L.glow, a); g.lineWidth = w; polyPath(g, P, k); g.stroke();
  g.strokeStyle = rgba(L.core, a); g.lineWidth = Math.max(1.5, w * 0.42); polyPath(g, P, k); g.stroke();
  g.restore();
}
/**
 * Luồng sáng trong không khí bụi (節穴 → vệt sáng trên tường/vật): tam giác từ đỉnh (ax, ay) tới đoạn (x1,y1)–(x2,y2), sáng ở lỗ mờ
 * dần về cuối; k: luồng vươn tới (0 → 1). Bụi lơ lửng chỉ hiện TRONG luồng (hàm của t). Trả về đa giác.
 */
export function shaft(g, ax, ay, x1, y1, x2, y2, { nm = 'white', a = 0.22, k = 1, t = 0, dust = 70, seed = 1, spot = true } = {}) {
  if (k <= 0) return null;
  const kk = clamp(k), bx1 = ax + (x1 - ax) * kk, by1 = ay + (y1 - ay) * kk, bx2 = ax + (x2 - ax) * kk, by2 = ay + (y2 - ay) * kk;
  const L = lightOf(nm), poly = [[ax, ay - 3], [bx1, by1], [bx2, by2], [ax, ay + 3]];
  g.save();
  const gr = g.createLinearGradient(ax, ay, (bx1 + bx2) / 2, (by1 + by2) / 2);
  gr.addColorStop(0, rgba(L.glow, a * 1.6)); gr.addColorStop(0.35, rgba(L.glow, a)); gr.addColorStop(1, rgba(L.glow, a * 0.45));
  g.beginPath(); g.moveTo(...poly[0]); for (const p of poly.slice(1)) g.lineTo(...p); g.closePath();
  g.fillStyle = gr; g.fill(); g.clip();
  for (let i = 0; i < dust; i++) {                     // bụi: vị trí hash, trôi chậm theo t, chớp nhẹ
    const u = hash(i * 1.37 + seed), v = hash(i * 7.91 + seed), dr = 18 * Math.sin(t * 0.4 + i);
    const px = ax + (Math.min(x1, x2) - ax) * u + dr, py = Math.min(y1, y2, ay) + (Math.max(y1, y2, ay) - Math.min(y1, y2, ay)) * v + 30 * Math.sin(t * 0.23 + i * 1.7);
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 2.1));
    g.fillStyle = rgba(L.core, 0.55 * tw); g.fillRect(px, py, 2 + (i % 3 === 0 ? 1 : 0), 2);
  }
  g.restore();
  if (spot && kk >= 1) {                                // vệt sáng nơi luồng chạm
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, r = Math.hypot(x2 - x1, y2 - y1) / 2;
    const sg = g.createRadialGradient(cx, cy, 0, cx, cy, r * 1.3); sg.addColorStop(0, rgba(L.core, a * 2.2)); sg.addColorStop(1, rgba(L.glow, 0));
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = sg; g.fillRect(cx - r * 1.3, cy - r * 1.3, r * 2.6, r * 2.6); g.restore();
  }
  return poly;
}
/** Quầng sáng tròn (vệt sáng trên tường / vật được chiếu). */
export function spot(g, x, y, r, { nm = 'white', a = 0.3, sy = 1 } = {}) {
  const L = lightOf(nm), gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, rgba(L.core, a)); gr.addColorStop(0.5, rgba(L.glow, a * 0.45)); gr.addColorStop(1, rgba(L.glow, 0));
  g.save(); g.translate(x, y); g.scale(1, sy); g.translate(-x, -y); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore();
}
/**
 * Photon = bó sóng: sin dưới bao Gauss, bước sóng trên hình tỉ lệ nm (px = nm × scale) → đỏ dài, tím ngắn; dir góc bay (rad);
 * phase trôi theo t. size = nửa bề rộng bao. Năng lượng không vẽ bằng cỡ bó (cỡ là bước sóng) — ghi eV bằng nhãn.
 */
export function photon(g, x, y, nm, { dir = 0, size = 70, amp = 16, scale = 0.075, phase = 0, a = 1, w = 4 } = {}) {
  const L = lightOf(nm), lam = (nm === 'white' ? 550 : nm) * scale, P = [];
  for (let s = -size; s <= size; s += 2) { const env = Math.exp(-((s / size) ** 2) * 3); P.push([s, -Math.sin((s / lam) * TAU + phase) * amp * env]); }
  g.save(); g.translate(x, y); g.rotate(dir); g.lineCap = 'round'; g.lineJoin = 'round';
  g.globalCompositeOperation = 'lighter';
  for (const [m, al] of [[4, 0.07], [2.2, 0.16]]) { g.strokeStyle = rgba(L.glow, al * a); g.lineWidth = w * m; g.beginPath(); P.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.stroke(); }
  g.globalCompositeOperation = 'source-over';
  g.strokeStyle = rgba(L.glow, a); g.lineWidth = w; g.beginPath(); P.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.stroke();
  g.strokeStyle = rgba(L.core, a); g.lineWidth = Math.max(1.5, w * 0.4); g.stroke();
  g.restore();
}
/** Sóng liên tục dọc trục x0 → x1 ở y (bước sóng px = lamPx), vẽ dần theo k. */
export function wave(g, x0, y, x1, nm, { lamPx = 120, amp = 30, k = 1, phase = 0, w = 4, a = 1 } = {}) {
  if (k <= 0) return;
  const P = []; for (let x = x0; x <= x0 + (x1 - x0) * clamp(k); x += 3) P.push([x, y - Math.sin((x - x0) / lamPx * TAU - phase) * amp]);
  if (P.length > 1) ray(g, P, { nm, w, a, glow: 0.7 });
}

// ═════════════════════════ dải phổ & thước phổ log ═════════════════════════
/**
 * Dải phổ ngang x0..x0+w ở y (cao h), λ from..to (nm, tuyến tính). continuous: dải liên tục (eyeFade); lines: [nm] vạch phát xạ
 * trên nền tối; k: lộ dần từ trái (ánh sáng quét). ticks: [nm] vạch chia + nhãn số (Noto 28). Trả về nm → x.
 */
export function spectrumStrip(g, x0, y, w, h, { from = 380, to = 780, continuous = true, lines = null, k = 1, ticks = null, lw = 4, tickColor = '@dim', labelUnit = true } = {}) {
  const X = nm => x0 + (nm - from) / (to - from) * w;
  if (k <= 0) return X;
  g.save(); g.beginPath(); g.rect(x0, y - 2, w * clamp(k), h + 4); g.clip();
  g.fillStyle = '#050506'; g.fillRect(x0, y, w, h);
  if (continuous) for (let px = 0; px < w; px++) { const nm = from + (px + 0.5) / w * (to - from); g.fillStyle = wlCss(nm, 1, { fade: true }); g.fillRect(x0 + px, y, 1.6, h); }
  if (lines) {
    g.globalCompositeOperation = 'lighter';
    for (const nm of lines) { const x = X(nm), c = wl2rgb(nm), cc = coreRgb(nm);
      const gr = g.createLinearGradient(x - lw * 3, 0, x + lw * 3, 0); gr.addColorStop(0, rgba(c, 0)); gr.addColorStop(0.5, rgba(c, 0.5)); gr.addColorStop(1, rgba(c, 0));
      g.fillStyle = gr; g.fillRect(x - lw * 3, y, lw * 6, h); g.fillStyle = rgba(c, 1); g.fillRect(x - lw / 2, y, lw, h); g.fillStyle = rgba(cc, 0.8); g.fillRect(x - lw / 6, y, lw / 3, h); }
    g.globalCompositeOperation = 'source-over';
  }
  g.restore();
  g.save(); g.strokeStyle = 'rgba(154,149,140,0.5)'; g.lineWidth = 1; g.strokeRect(x0 - 0.5, y - 0.5, w + 1, h + 1); g.restore();
  if (ticks && k >= 1) for (const nm of ticks) {
    const x = X(nm); g.save(); g.fillStyle = ink(tickColor); g.fillRect(x - 1, y + h + 4, 2, 12); g.restore();
    write(g, String(nm), x, y + h + 48, 1, { font: `500 28px ${JP}`, color: tickColor, align: 'center' });
  }
  if (ticks && labelUnit && k >= 1) write(g, 'nm', x0 + w + 14, y + h + 48, 1, { font: `500 28px ${JP}`, color: tickColor });
  return X;
}
/** Luỹ thừa của 10 vẽ tay (Noto thiếu ⁰⁵–⁹⁻): "10" cỡ size + số mũ cỡ 0.62·size nâng 0.45·size. unit nối sau. Trả về bề rộng. */
export function pow10(g, exp, x, y, { size = 30, color = '@dim', align = 'center', unit = '', k = 1 } = {}) {
  const f = `500 ${size}px ${JP}`, fe = `600 ${Math.round(size * 0.62)}px ${JP}`, es = String(exp).replace('-', '−');
  const parts = [['10', f], [es, fe, color, { rise: size * 0.45, sup: true }]];
  if (unit) parts.push([' ' + unit, f]);
  return write(g, parts, x, y, k, { font: f, color, align, shadow: false }).w;
}
/** Dải sóng điện từ trên thước log (λ theo mét). Ranh giới theo R3 §1 ACT 4 (X / gamma thật ra chồng nhau — vẽ theo quy ước SGK). */
export const BANDS = [
  { key: 'radio', name: '電波', lo: 1, hi: 1e3 }, { key: 'micro', name: 'マイクロ波', lo: 1e-3, hi: 1 },
  { key: 'ir', name: '赤外線', lo: 780e-9, hi: 1e-3 }, { key: 'vis', name: '可視光', lo: 380e-9, hi: 780e-9 },
  { key: 'uv', name: '紫外線', lo: 10e-9, hi: 380e-9 }, { key: 'x', name: 'X線', lo: 1e-11, hi: 10e-9 }, { key: 'gamma', name: 'ガンマ線', lo: 1e-12, hi: 1e-11 },
];
/** Thước phổ: λ 10⁻¹² m (trái) → 10³ m (phải), 15 thập phân. MỌI trục λ của bài chạy NGẮN → DÀI từ trái sang phải (tím trái, đỏ
 * phải — như dải 380–780 nm, đường nhạy S/M/L) để zoom từ thước vào khe thấy được không lật chiều (DNA §11). */
export const RULER = { x0: 150, x1: 1770, top: 3, bot: -12 };
export const rulerX = (m, R = RULER) => R.x0 + (Math.log10(m) - R.bot) / (R.top - R.bot) * (R.x1 - R.x0);
/**
 * Thước phổ log — vật của ACT 4, dùng lại ở kết. Các dải không thấy = xám trung tính gạch chéo (KHÔNG màu: không phải ánh sáng
 * thấy được); chỉ khe 可視光 mang phổ thật. window 0..1: khe thấy được sáng lên + khung sáng 生成り; dim 0..1: mọi dải khác chìm
 * hẳn (kết bài: "chỉ thấy được chỗ này"). labels: tên dải (Noto ≥ 28), pows: số mũ mỗi 3 thập phân. Trả về { X, y, h }.
 */
export function specRuler(g, { y = 520, h = 64, k = 1, window: kw = 0, dim = 0, labels = 1, pows = 1, R = RULER, top = null } = {}) {
  if (top !== null) R = { ...R, top };                     // top = 4: kéo đầu phải tới 10⁴ m (e2: 電波時計 5–7.5 km); RULER4 = sẵn
  const X = m => rulerX(m, R), xr = R.x0 + (R.x1 - R.x0) * clamp(k), LO = -80, HI = W + 80;   // CẮT theo màn hình: zoom 4·10⁴ lần vẫn chỉ vài nét
  if (k <= 0) return { X, y, h };
  const bands = BANDS.map(b => b.key === 'radio' ? { ...b, lo: 1e-3, hi: Math.max(b.hi, 10 ** R.top) } : b);   // 電波 = 1 mm…, マイクロ波 là dải con (SGK Nhật)
  g.save(); g.beginPath(); g.rect(R.x0 - 4, y - 200, xr - R.x0 + 8, h + 400); g.clip();
  const lv = 1 - 0.75 * clamp(dim);
  const hatch = (a, c, y0, hh, col) => {
    const a2 = Math.max(a, LO), c2 = Math.min(c, HI); if (c2 <= a2) return;
    g.save(); g.beginPath(); g.rect(a2, y0, c2 - a2, hh); g.clip(); g.strokeStyle = col; g.lineWidth = 1;
    for (let s = a - hh + Math.ceil((a2 - hh - (a - hh)) / 12) * 12; s < c2; s += 12) { g.beginPath(); g.moveTo(s, y0 + hh); g.lineTo(s + hh, y0); g.stroke(); } g.restore();
  };
  for (const [i, b] of bands.entries()) {
    if (b.key === 'vis') continue;
    const a = X(b.lo), c = X(b.hi), a2 = Math.max(a, LO), c2 = Math.min(c, HI); if (c2 <= a2) continue;
    if (b.key === 'micro') {                              // dải con trong 電波: nửa dưới, nền sáng hơn một bậc + viền
      const hy = y + h * 0.45, hh = h * 0.55;
      g.fillStyle = `rgba(62,59,53,${lv})`; g.fillRect(a2, hy, c2 - a2, hh); hatch(a, c, hy, hh, `rgba(120,115,106,${0.35 * lv})`);
      g.strokeStyle = `rgba(154,149,140,${0.55 * lv})`; g.lineWidth = 1; g.strokeRect(a + 0.5, hy + 0.5, c - a - 1, hh - 1); continue;
    }
    g.fillStyle = `rgba(${i % 2 ? '44,42,38' : '36,34,31'},${lv})`; g.fillRect(a2, y, c2 - a2, h);
    hatch(a, c, y, h, `rgba(94,90,83,${0.35 * lv})`);
  }
  const va = X(380e-9), vb = X(780e-9);                 // khe thấy được: tím (380) trái → đỏ (780) phải
  for (let px = Math.max(va, LO); px < Math.min(vb, HI); px += 0.5) { const nm = 380 + (px - va) / (vb - va) * 400; g.fillStyle = wlCss(nm, 0.35 + 0.65 * clamp(kw), { fade: true }); g.fillRect(px, y, 0.8, h); }
  g.strokeStyle = 'rgba(154,149,140,0.6)'; g.lineWidth = 1; g.strokeRect(R.x0 - 0.5, y - 0.5, R.x1 - R.x0 + 1, h + 1);
  for (let d = R.top; d >= R.bot; d--) { const x = X(10 ** d); if (x < -20 || x > W + 20) continue; g.fillStyle = C.dim; g.fillRect(x - 1, y + h, 2, d % 3 === 0 ? 16 : 9); }
  g.restore();
  if (kw > 0) {                                         // khung sáng quanh khe + quầng
    const e = clamp(kw), cx = (va + vb) / 2;
    spot(g, clamp(cx, -200, W + 200), y + h / 2, 90 + 40 * e, { a: 0.25 * e });
    g.save(); g.strokeStyle = `rgba(237,232,223,${e})`; g.lineWidth = 3; g.strokeRect(va - 7, y - 10, vb - va + 14, h + 20); g.restore();
  }
  if (labels > 0 && k >= 1) for (const b of bands) {
    if (b.key === 'vis') continue;
    // 電波 ghi tên trên phần KHÔNG chứa マイクロ波 (1 m…); dấu ngoặc mảnh trên cả dải 1 mm…hi cho thấy マイクロ波 nằm trong
    const lo = b.key === 'radio' ? 1 : b.lo, cx = (X(b.hi) + X(lo)) / 2;
    write(g, b.name, cx, y - 22, labels, { font: `700 30px ${JP}`, color: dim > 0.5 ? '@faint' : '@ink', align: 'center' });
    if (b.key === 'radio') { g.save(); g.strokeStyle = dim > 0.5 ? 'rgba(154,149,140,0.3)' : 'rgba(237,232,223,0.55)'; g.lineWidth = 2; g.globalAlpha = clamp(labels);
      g.beginPath(); g.moveTo(X(b.lo), y - 6); g.lineTo(X(b.lo), y - 14); g.lineTo(X(b.hi), y - 14); g.lineTo(X(b.hi), y - 6); g.stroke(); g.restore(); }
  }
  if (pows > 0 && k >= 1) for (let d = R.bot; d <= R.top; d += 3) { const x = X(10 ** d); if (x < -60 || x > W + 60) continue; pow10(g, d, x, y + h + 58, { size: 30, unit: d === R.top ? 'm' : '', k: pows }); }
  return { X, y, h, va, vb };
}
export const RULER4 = { ...RULER, top: 4 };

// ═════════════════════════ bậc năng lượng (hydro, đúng tỉ lệ eV) ═════════════════════════
/**
 * Thang mức hydro: n = 2…6 đúng tỉ lệ (sc px / eV, mốc 0 eV ở y0), n = 1 (−13.6) đặt dưới n = 2 + gap kèm dấu gãy trục (≈).
 * x..x+w bề ngang bậc. k: bậc hiện dần từ dưới. Trả về { y(n), x, w }. Nhãn eV: Noto 28 bên trái (labels).
 */
export function ladder(g, { x = 360, w = 420, y0 = 230, sc = 150, gap = 150, k = 1, labels = true, nmax = 6 } = {}) {
  const yOf = n => n === 1 ? y0 - HLEV(2) * sc + gap : n === Infinity ? y0 : y0 - HLEV(n) * sc;
  const L = [1, 2, 3, 4, 5, 6].filter(n => n <= nmax);
  g.save();
  L.forEach((n, i) => { const e = clamp(k * L.length - i); if (e <= 0) return;
    g.fillStyle = `rgba(237,232,223,${0.4 + 0.6 * e})`; g.fillRect(x, Math.round(yOf(n)) - 2, w * outCubic(e), 4); });
  if (k >= 1) {
    g.setLineDash([6, 8]); g.strokeStyle = 'rgba(154,149,140,0.7)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y0); g.lineTo(x + w, y0); g.stroke(); g.setLineDash([]);
    const yb = (yOf(2) + yOf(1)) / 2;                    // dấu gãy trục
    g.strokeStyle = C.dim; g.lineWidth = 3; for (const d of [-7, 7]) { g.beginPath(); g.moveTo(x - 22, yb + d + 8); g.lineTo(x - 2, yb + d - 8); g.stroke(); }
  }
  g.restore();
  if (labels && k >= 1) for (const n of [1, 2, 3, 4]) if (n <= nmax) write(g, [[`n = ${n}`, `700 28px ${JP}`], [`  ${HLEV(n).toFixed(2).replace('-', '−')} eV`, `500 28px ${JP}`, '@dim']], x - 30, yOf(n) + 10, 1, { align: 'right' });
  return { y: yOf, x, w };
}
/** Electron nhảy xuống từ mức a → b của ladder L: mũi tên màu bước sóng (λ = 1239.84 / ΔE). k: rơi dần. Trả về nm. */
export function ladderDrop(g, L, a, b, xo, k = 1, { w = 6 } = {}) {
  const nm = HC / (HLEV(a) - HLEV(b)), x = L.x + xo, ya = L.y(a), yb = L.y(b);
  if (k > 0) {
    ray(g, [[x, ya + 4], [x, ya + 4 + (yb - ya - 18) * clamp(k)]], { nm: nm > 780 || nm < 380 ? 'white' : nm, w });
    if (k >= 1) { const c = lightOf(nm).glow; g.save(); g.fillStyle = rgba(c, 1); g.beginPath(); g.moveTo(x, yb - 2); g.lineTo(x - 13, yb - 24); g.lineTo(x + 13, yb - 24); g.fill(); g.restore(); }
  }
  return nm;
}

// ═════════════════════════ giọt mưa (Descartes, tia vẽ đúng hình học) ═════════════════════════
const refract = (d, N, eta) => {                          // N hướng NGƯỢC chiều d (d·N < 0)
  const ci = -(d[0] * N[0] + d[1] * N[1]), s2 = eta * eta * (1 - ci * ci); if (s2 > 1) return null;
  const ct = Math.sqrt(1 - s2); return [eta * d[0] + (eta * ci - ct) * N[0], eta * d[1] + (eta * ci - ct) * N[1]];
};
/**
 * Lần theo tia Descartes trong giọt (tâm 0, bán kính 1): ánh sáng tới hướng +x. k = số lần phản xạ trong (1 cầu vồng chính, 2 phụ).
 * Tia chính vào ở nửa trên (y < 0, toạ độ canvas), ra ở nửa dưới; tia phụ vào nửa dưới, ra ở nửa trên — cả hai bay xuống-trái.
 * Trả về { pts: [vào, phản xạ…, ra] (đơn vị bán kính), out: hướng ra, theta (độ, kiểm = descartes()) }.
 */
export function dropRay(nm, k = 1) {
  const D = descartes(nm, k), i = D.i / DEG, sgn = k === 1 ? -1 : 1, d = [1, 0];
  let P = [-Math.cos(i), sgn * Math.sin(i)], T = refract(d, P, 1 / D.n);
  const pts = [P];
  for (let j = 0; j <= k; j++) {
    const s = -2 * (P[0] * T[0] + P[1] * T[1]); P = [P[0] + s * T[0], P[1] + s * T[1]]; pts.push(P);
    if (j < k) { const dn = T[0] * P[0] + T[1] * P[1]; T = [T[0] - 2 * dn * P[0], T[1] - 2 * dn * P[1]]; }
  }
  const out = refract(T, [-P[0], -P[1]], D.n), theta = Math.acos(clamp(-out[0], -1, 1)) * DEG;
  return { pts, out, theta, i: D.i };
}
for (const nm of [656, 404.7]) { must(`${Math.abs(dropRay(nm).theta - descartes(nm).theta) < 1e-6}`, true); must(`${Math.abs(dropRay(nm, 2).theta - descartes(nm, 2).theta) < 1e-6}`, true); }
must(`${dropRay(656).out[1] > 0 && dropRay(656, 2).out[1] > 0 && dropRay(656, 2).pts[0][1] > 0 && dropRay(656, 2).pts[3][1] < 0}`, true);   // cả hai ra hướng xuống-trái (tới mắt người đứng dưới); phụ vào nửa DƯỚI, ra ở nửa TRÊN
/**
 * Giọt mưa ở (cx, cy) bán kính R: viền nước + tia trắng tới từ bên trái (từ xIn), các tia màu bên trong và tia ra dài outLen.
 * nms: bước sóng vẽ (mặc định đỏ 656 + tím 405); k1: tia vào, k2: trong giọt, k3: tia ra; refl: 1 | 2. Trả về [{ nm, exit, out, theta }].
 */
export function raindrop(g, cx, cy, R, { nms = [656, 404.7], refl = 1, xIn = WALL_X, outLen = 560, k1 = 1, k2 = 1, k3 = 1, w = 5, body = 1 } = {}) {
  if (body > 0) {
    const gr = g.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
    gr.addColorStop(0, `rgba(180,190,200,${0.10 * body})`); gr.addColorStop(1, `rgba(120,130,140,${0.05 * body})`);
    g.save(); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.strokeStyle = `rgba(200,205,210,${0.65 * body})`; g.lineWidth = 3; g.stroke();
    g.strokeStyle = `rgba(246,242,234,${0.35 * body})`; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, R - 10, -2.4, -1.7); g.stroke(); g.restore();
  }
  const res = [], S = p => [cx + p[0] * R, cy + p[1] * R];
  const tr = nms.map(nm => ({ nm, ...dropRay(nm, refl) }));
  const P0 = S(tr[0].pts[0]);
  ray(g, [[xIn, P0[1]], P0], { nm: 'white', w: w + 1, k: k1 });
  for (const r of tr) {
    const pts = r.pts.map(S), ex = pts[pts.length - 1];
    if (k1 >= 1) ray(g, pts, { nm: r.nm, w, k: k2, glow: 0.6 });
    if (k2 >= 1) ray(g, [ex, [ex[0] + r.out[0] * outLen, ex[1] + r.out[1] * outLen]], { nm: r.nm, w, k: k3 });
    res.push({ nm: r.nm, exit: ex, out: r.out, theta: r.theta, pts });
  }
  return res;
}
/** Cung góc ở p giữa hướng a1 → a2 (rad), bán kính r, nét trung tính; nhãn do cảnh viết. */
export function angleArc(g, p, a1, a2, r, k = 1, { color = '@dim', w = 3, dash = null } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = ink(color); g.lineWidth = w; if (dash) g.setLineDash(dash);
  g.beginPath(); g.arc(p[0], p[1], r, a1, a1 + (a2 - a1) * clamp(k), a2 < a1); g.stroke(); g.restore();
}

// ═════════════════════════ mắt (mặt cắt đơn giản, đúng thứ tự giải phẫu) ═════════════════════════
/**
 * Nhãn cầu nhìn ngang, ánh sáng vào từ TRÁI: giác mạc (lồi trái), mống mắt + đồng tử, thuỷ tinh thể (dày theo thick 0..1), dịch
 * kính, võng mạc (cung phải, sáng lên theo lit), hố trung tâm, thần kinh thị giác ra sau (lệch xuống — điểm mù). k: nét hiện dần.
 * Trả về các điểm: { pupil, lens, fovea, nerve, retina(a) }.
 */
export function eye(g, cx, cy, R, { k = 1, thick = 0.4, lit = 0 } = {}) {
  const e = clamp(k), pupil = [cx - R * 0.93, cy], lens = [cx - R * 0.66, cy], fovea = [cx + R, cy], nerveA = 0.32;
  const retina = a => [cx + Math.cos(a) * R * 0.97, cy + Math.sin(a) * R * 0.97];
  if (e <= 0) return { pupil, lens, fovea, retina };
  g.save(); g.lineCap = 'round';
  g.strokeStyle = `rgba(154,149,140,${e})`; g.lineWidth = 4;                      // củng mạc
  g.beginPath(); g.arc(cx, cy, R, -Math.PI + 0.5, Math.PI - 0.5); g.stroke();
  g.strokeStyle = `rgba(237,232,223,${0.9 * e})`; g.lineWidth = 4;                // giác mạc
  g.beginPath(); g.arc(cx - R * 0.62, cy, R * 0.46, Math.PI - 1.05, Math.PI + 1.05); g.stroke();
  g.strokeStyle = `rgba(154,149,140,${e})`; g.lineWidth = 8;                     // mống mắt (hở đồng tử)
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(pupil[0] + 8, cy + s * R * 0.16); g.lineTo(pupil[0] + 8, cy + s * R * 0.44); g.stroke(); }
  const lw = R * (0.12 + 0.07 * clamp(thick)), lh = R * 0.36;                     // thuỷ tinh thể
  g.fillStyle = `rgba(237,232,223,${0.10 * e})`; g.strokeStyle = `rgba(237,232,223,${0.8 * e})`; g.lineWidth = 3;
  g.beginPath(); g.ellipse(lens[0], lens[1], lw, lh, 0, 0, TAU); g.fill(); g.stroke();
  g.strokeStyle = lit > 0 ? `rgba(246,242,234,${0.55 + 0.45 * clamp(lit)})` : `rgba(237,232,223,${0.8 * e})`; g.lineWidth = 7;   // võng mạc
  g.beginPath(); g.arc(cx, cy, R * 0.97, -1.25, 1.25); g.stroke();
  g.fillStyle = C.room; g.beginPath(); g.arc(fovea[0] - 2, cy, 9, 0, TAU); g.fill();                                              // hố trung tâm
  const n0 = retina(nerveA);                                                                                                       // thần kinh thị giác
  g.strokeStyle = `rgba(154,149,140,${e})`; g.lineWidth = 26; g.beginPath(); g.moveTo(n0[0], n0[1]); g.quadraticCurveTo(n0[0] + R * 0.35, n0[1] + 8, n0[0] + R * 0.6, n0[1] + 40); g.stroke();
  g.restore();
  return { pupil, lens, fovea, nerve: n0, retina };
}

// ═════════════════════════ đồ vật trong phòng (màu mặt vật = phản xạ × nguồn sáng) ═════════════════════════
/** Màu bề mặt dưới một nguồn: refl(nm) 0..1 × illum(nm) → XYZ → sRGB; chuẩn hoá để mặt trắng dưới ánh trắng = trắng (R3 Pitfall 4). */
export function surfaceRgb(refl, illum = () => 1, level = 1) {
  const acc = (f) => { let s = [0, 0, 0]; for (let i = 0; i <= 80; i++) { const nm = 380 + 5 * i, v = f(nm); s = s.map((x, j) => x + v * CMF['XYZ'[j]][i]); } return s; };
  const toLin = XYZ => M_SRGB.map(r => r[0] * XYZ[0] + r[1] * XYZ[1] + r[2] * XYZ[2]);
  const white = toLin(acc(() => 1)), v = toLin(acc(nm => refl(nm) * illum(nm)));
  return lin2rgb(v.map((c, j) => Math.max(0, c / white[j]) * level));
}
/** Phản xạ của quả táo đỏ (giữ dải dài, hấp thụ ngắn & giữa) — R3 §1 ACT 6. */
export const APPLE = nm => 0.025 + 0.72 * smooth(clamp((nm - 575) / 60));
/** Nguồn natri: một vạch 589 nm (rộng 3 nm). Nguồn trắng: phẳng. */
export const SODIUM = nm => Math.exp(-(((nm - 589.3) / 3) ** 2));
{ const a = surfaceRgb(APPLE), s = surfaceRgb(APPLE, SODIUM, 3);
  must(`${a[0] > 2.2 * a[1] && a[0] > 2.2 * a[2]}`, true);               // dưới ánh trắng: đỏ
  must(`${Math.max(...s) < 0.45 * Math.max(...a)}`, true); }               // dưới natri: tối hẳn (không còn "đỏ")
/** Quả táo trên 卓袱台: màu từ surfaceRgb(APPLE, illum); lit 0..1 (độ rọi). */
export function apple(g, x, y, r, { illum = null, lit = 1 } = {}) {
  const c = surfaceRgb(APPLE, illum ?? (() => 1), lit), hi = c.map(v => Math.min(255, v + 60 * lit));
  g.save();
  const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r * 1.05);
  gr.addColorStop(0, rgba(hi, 1)); gr.addColorStop(0.6, rgba(c, 1)); gr.addColorStop(1, rgba(c.map(v => v * 0.35 | 0), 1));
  g.fillStyle = gr; g.beginPath(); g.moveTo(x, y - r * 0.78);
  g.bezierCurveTo(x + r * 0.55, y - r * 1.1, x + r * 1.15, y - r * 0.55, x + r * 0.95, y + r * 0.25);
  g.bezierCurveTo(x + r * 0.8, y + r * 0.9, x + r * 0.25, y + r * 1.0, x, y + r * 0.88);
  g.bezierCurveTo(x - r * 0.25, y + r * 1.0, x - r * 0.8, y + r * 0.9, x - r * 0.95, y + r * 0.25);
  g.bezierCurveTo(x - r * 1.15, y - r * 0.55, x - r * 0.55, y - r * 1.1, x, y - r * 0.78); g.fill();
  g.strokeStyle = `rgba(90,70,45,${lit})`; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y - r * 0.72); g.quadraticCurveTo(x + 4, y - r * 1.05, x + 14, y - r * 1.2); g.stroke();
  g.restore();
}
/** 卓袱台 (bàn tròn thấp) nhìn nghiêng: mặt bàn elip ở (x, y) rộng w; lit 0..1 ánh lên mặt bàn. */
export function chabudai(g, x, y, w, { lit = 0.5 } = {}) {
  g.save();
  g.fillStyle = '#1A1510'; for (const dx of [-0.32, 0.32]) g.fillRect(x + dx * w - 8, y + 6, 16, 72);
  const gr = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0); gr.addColorStop(0, `rgba(70,56,40,${0.4 + 0.5 * lit})`); gr.addColorStop(1, '#1E1812');
  g.fillStyle = '#120F0B'; g.beginPath(); g.ellipse(x, y + 10, w / 2, w * 0.07, 0, 0, TAU); g.fill();
  g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, w / 2, w * 0.07, 0, 0, TAU); g.fill();
  g.restore();
}

// ═════════════════════════ chữ (CHỈ trung tính) ═════════════════════════
const JPF = /Shippori|Noto Sans JP/;
const pxOf = font => { const m = /(\d+(?:\.\d+)?)px/.exec(font); if (!m) throw new Error(`kit: font không có cỡ px: ${font}`); return +m[1]; };
/** Luật cỡ chữ Nhật ≥ 28 px (LESSONS §95) + ký tự font không có (DNA §3). Miễn cỡ: sup = true VÀ chỉ số/dấu. */
export function guard(font, s, sup = false) {
  if (/Shippori/.test(font) && NO_MIN.test(s)) throw new Error(`kit: Shippori thiếu ký tự trong "${s}" — dùng JP / vẽ tay (DNA §3)`);
  if (/Noto Sans JP/.test(font) && NO_JP.test(s)) throw new Error(`kit: Noto Sans JP thiếu ký tự trong "${s}" — pow10() / vẽ tay (DNA §3)`);
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
export function measure(g, s, font, ls = 0) { g.save(); g.font = font; g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; g.restore(); return w; }
const norm = (parts, font, color) => (typeof parts === 'string' ? [[parts]] : parts).map(p => {
  const [s, f = font, c = color, o = {}] = p; return { s: String(s), f, c, rise: o.rise ?? 0, sup: !!o.sup };
});
/**
 * Chữ HIỆN BẰNG ÁNH SÁNG (DNA §3 — không fade): một vệt sáng quét từ trái qua dòng chữ theo k; chữ lộ ra ở nơi vệt đã đi qua
 * và ở lại, sáng dịu. parts: chuỗi hoặc [[chuỗi, font?, màu?, { rise, sup }?], …]. opts: font (mặc định 700 44px Noto), color
 * (trung tính — ink()), align, ls, shadow (quầng tối sau chữ để đọc được trên chùm sáng), safe. Trả về { x0, w, size, x, y, h }.
 */
export function write(g, parts, x, y, k = 1, { font = `700 44px ${JP}`, color = '@ink', align = 'left', ls = 0, shadow = true, safe = true, sweep = true } = {}) {
  const P = norm(parts, font, color);
  for (const p of P) { guard(p.f, p.s, p.sup); ink(p.c); }
  const ws = P.map(p => measure(g, p.s, p.f, ls)), tot = ws.reduce((a, w) => a + w, 0);
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const size = Math.max(...P.map(p => pxOf(p.f)));
  const box = { x0, w: tot, size, x: x0, y: y - size * 0.95, h: size * 1.25 };
  if (safe) safeBox(x0, y - size * 0.92, tot, size * 1.18);
  if (k <= 0) return box;
  const e = clamp(k), edge = x0 - 6 + (tot + 30) * e;
  g.save();
  if (e < 1) { g.beginPath(); g.rect(x0 - 8, y - size * 1.3, edge - x0 + 8, size * 1.8); g.clip(); }
  g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  if (shadow) { g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 10; }
  let cx = x0;
  for (let i = 0; i < P.length; i++) { const p = P[i]; g.font = p.f; g.fillStyle = ink(p.c); g.fillText(p.s, cx, y - p.rise); cx += ws[i]; }
  g.restore();
  if (e < 1 && sweep) {                                 // vệt sáng đang quét
    const gr = g.createLinearGradient(edge - 26, 0, edge + 4, 0); gr.addColorStop(0, 'rgba(246,242,234,0)'); gr.addColorStop(1, 'rgba(246,242,234,0.55)');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(edge - 26, y - size * 1.1, 30, size * 1.4); g.restore();
  }
  return box;
}
/** テロップ: Noto 700 (nhãn, số) hoặc { mincho: true } — Shippori 700 (từ khoá). Trả về hộp như write. */
export function telop(g, parts, x, y, k = 1, { size = 44, weight = 700, mincho = false, font = `${weight} ${size}px ${mincho ? MIN : JP}`, ...o } = {}) {
  return write(g, parts, x, y, k, { font, ...o });
}
/** Chữ SAI (hiểu lầm): xám '@faint'; gạch bằng strike(g, hộp, k) rồi viết chữ đúng ngay dưới. KHÔNG đỏ (đỏ là một bước sóng). */
export const wrong = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, color: '@dim' });
/** Một nét gạch xám qua hộp chữ, vạch dần từ trái theo k. */
export function strike(g, box, k = 1, { w = 5 } = {}) {
  if (k <= 0) return;
  const y = box.y + box.h * 0.55, x0 = box.x - 8, x1 = box.x + box.w + 8, e = outCubic(clamp(k));
  g.save(); g.strokeStyle = C.dim; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y + 2); g.lineTo(x0 + (x1 - x0) * e, y - 2 * e); g.stroke(); g.restore();
}
/** Chấm màu ánh sáng cạnh nhãn (nhãn không bao giờ mang màu phổ — R3 Pitfall 3): đĩa sáng bán kính r + quầng. */
export function chip(g, x, y, nm, r = 12, k = 1) {
  if (k <= 0) return;
  const L = lightOf(nm), rr = r * outBack(clamp(k));
  spot(g, x, y, rr * 2.6, { nm, a: 0.35 });
  g.save(); g.fillStyle = rgba(L.glow, 1); g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill(); g.fillStyle = rgba(L.core, 1); g.beginPath(); g.arc(x - rr * 0.2, y - rr * 0.2, rr * 0.45, 0, TAU); g.fill(); g.restore();
}
/** Tấm nền tối sau chữ đặt trên vùng sáng (R3 Pitfall 3: chữ trong quầng sáng phải có tấm). */
export function plate(g, x, y, w, h, { a = 0.86, ring = false } = {}) {
  g.save(); g.fillStyle = `rgba(20,19,23,${a})`; g.beginPath(); g.roundRect(x, y, w, h, 10); g.fill();
  if (ring) { g.strokeStyle = 'rgba(237,232,223,0.5)'; g.lineWidth = 1.5; g.stroke(); } g.restore();
}
/**
 * Tiêu đề cảnh (Shippori 700) góc trên trái (x = 140), hiện bằng vệt sáng từ a; act (1..7): kicker 「第n幕　tên hồi」 28 px
 * '@dim' phía trên (ACTS). Trả về hộp.
 */
export function title(g, s, t, a, { size = 60, x = 140, y = 168, act = 0 } = {}) {
  if (act) { const [k1, k2] = ACTS[act - 1]; write(g, `${k1}　${k2}`, x, y - size - 8, prog(t, a, a + 0.4), { font: `500 28px ${JP}`, color: '@dim', ls: 3 }); }
  const box = write(g, s, x, y, prog(t, a + 0.15, a + 0.85), { font: `700 ${size}px ${MIN}` });
  const kl = prog(t, a + 0.85, a + 1.15);
  if (kl > 0) { g.save(); g.fillStyle = C.text; g.fillRect(x, y + 20, 54 * outCubic(kl), 3); g.restore(); }
  return box;
}

// ═════════════════════════ thẻ hồi + thẻ hứa ═════════════════════════
/** Mốc thẻ hồi tính từ FROM THẬT (LESSONS §82): viết từ a = max(START − 2.4, FROM + 0.95), rút đi quanh START. Tên hồi sáng đủ từ a + 0.8, rút từ o0 ≥ a + 2.8 (đọc ≥ 2 s). */
export const actTimes = (FROM, START) => { const a = Math.max(START - 2.4, FROM + 0.95), o0 = Math.max(START + 0.35, a + 2.8); return { a, o0, o1: Math.max(START + 0.95, o0 + 0.6) }; };
/** Tiếng thẻ hồi: impact nhẹ khi chùm chạm thẻ + shimmer khi tên hồi sáng lên. */
export const actCues = (FROM, START) => { const { a } = actTimes(FROM, START); return [{ t: +a.toFixed(3), kind: 'impact', db: -4 }, { t: +(a + 0.6).toFixed(3), kind: 'shimmer' }]; };
/** Thẻ HỒI: một chùm từ lỗ quét ngang tấm thẻ tối giữa khung; 「第n幕」 + tên hồi 明朝 lớn lộ ra theo vệt sáng; rút xuống dưới. */
export function actCard(g, t, FROM, START, act) {
  const { a, o0, o1 } = actTimes(FROM, START), [kick, name] = ACTS[act - 1];
  if (t < a - 0.05 || t > o1) return;
  const tw = measure(g, name, `700 84px ${MIN}`, 4), w = Math.max(860, tw + 200), h = 330, x = (W - w) / 2, y = 330;
  if (x < SAFE.x0) throw new Error(`actCard: tên hồi "${name}" quá rộng`);
  const kout = outCubic(prog(t, o0, o1)), dy = Math.round(kout * (H - y + 40));
  const ks = prog(t, a, a + 1.1), sx = x + w * smooth(ks);
  g.save(); g.translate(0, dy);
  shaft(g, APT.x, APT.y, sx, y + 40, sx, y + h - 40, { a: 0.10 * (1 - kout), k: ks > 0 ? 1 : 0, dust: 30, spot: false, t });
  plate(g, x, y, w, h, { a: 0.92, ring: true });
  write(g, kick, W / 2, y + 108, prog(t, a + 0.1, a + 0.6), { font: `700 40px ${MIN}`, align: 'center', ls: 16, color: '@dim' });
  write(g, name, W / 2, y + 236, prog(t, a + 0.2, a + 0.8), { font: `700 84px ${MIN}`, align: 'center', ls: 4 });
  g.restore();
}
/**
 * Bốn thẻ lời hứa ①②③④ xếp dọc bên phải (x..x+w), mỗi thẻ được một chùm từ một lỗ riêng trên tường trái chiếu sáng (lit[i]).
 * k[i]: thẻ + chữ hiện; flip[i]: lật ra câu trả lời (まとめ). texts / backs mặc định QUESTIONS / ANSWERS. Trả về hộp từng thẻ.
 */
export function promiseCards(g, { x = 980, w = 844, y0 = 230, h = 150, gap = 36, k = [1, 1, 1, 1], lit = [1, 1, 1, 1], flip = [0, 0, 0, 0], texts = QUESTIONS, backs = ANSWERS, t = 0, size = 40 } = {}) {
  const out = [];
  for (let i = 0; i < 4; i++) {
    const y = y0 + i * (h + gap), cy = y + h / 2, e = clamp(k[i]);
    if (lit[i] > 0) { aperture(g, 'slit', { y: cy, open: lit[i] }); shaft(g, WALL_X, cy, x, y + 18, x, y + h - 18, { a: 0.07 * lit[i], dust: 18, seed: i * 9, t, spot: false }); }
    if (e <= 0) { out.push({ x, y, w, h }); continue; }
    const f = clamp(flip[i]), sy = Math.abs(Math.cos(Math.PI * f));
    g.save(); g.translate(0, cy); g.scale(1, Math.max(0.02, sy)); g.translate(0, -cy);
    plate(g, x, y, w, h, { a: 0.9, ring: true });
    if (lit[i] > 0) { const gr = g.createLinearGradient(x, 0, x + 220, 0); gr.addColorStop(0, `rgba(246,242,234,${0.16 * lit[i]})`); gr.addColorStop(1, 'rgba(246,242,234,0)'); g.fillStyle = gr; g.fillRect(x, y, 220, h); }
    write(g, '①②③④'[i], x + 34, cy + 16, e, { font: `700 48px ${JP}` });
    write(g, f < 0.5 ? texts[i] : backs[i], x + 110, cy + 14, f < 0.5 ? e : 1, { font: `700 ${size}px ${JP}`, color: f < 0.5 ? '@ink' : '@light' });
    g.restore();
    out.push({ x, y, w, h });
  }
  return out;
}

// ═════════════════════════ dấu, mũi tên (trung tính) ═════════════════════════
export function tick(g, x, y, s = 16, k = 1, { color = '@ink', w = 5 } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = ink(color); g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  polyPath(g, [[x - s * 0.7, y], [x - s * 0.15, y + s * 0.6], [x + s * 0.8, y - s * 0.6]], k); g.stroke(); g.restore();
}
/** ✗ trung tính (xám) — "không ra" / "không xảy ra". Không có màu sai trong DNA này. */
export function cross(g, x, y, s = 14, k = 1, { color = '@dim', w = 5.5 } = {}) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = ink(color); g.lineWidth = w; g.lineCap = 'round';
  polyPath(g, [[x - s, y - s], [x + s, y + s]], clamp(k * 2)); g.stroke();
  if (k > 0.5) { polyPath(g, [[x + s, y - s], [x - s, y + s]], clamp(k * 2 - 1)); g.stroke(); }
  g.restore();
}
/** Mũi tên trung tính: pts = [a, b] hoặc [a, điều khiển, b]; vẽ dần theo k; đầu tam giác khi k ≥ 0.85. */
export function arrow(g, pts, k = 1, { color = '@dim', w = 4, head = 16, dash = null } = {}) {
  if (k <= 0) return;
  const P = pts.length === 3 ? Array.from({ length: 25 }, (_, i) => { const u = i / 24, a = (1 - u) ** 2, b = 2 * u * (1 - u), c = u * u;
    return [a * pts[0][0] + b * pts[1][0] + c * pts[2][0], a * pts[0][1] + b * pts[1][1] + c * pts[2][1]]; }) : pts;
  const col = ink(color);
  g.save(); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) g.setLineDash(dash);
  polyPath(g, P, k); g.stroke(); g.setLineDash([]);
  if (k >= 0.85) { const e = P[P.length - 1], q = P[P.length - 2], an = Math.atan2(e[1] - q[1], e[0] - q[0]), hs = head * clamp((k - 0.85) / 0.15);
    g.beginPath(); g.moveTo(e[0] + Math.cos(an) * 4, e[1] + Math.sin(an) * 4); g.lineTo(e[0] - Math.cos(an - 0.45) * hs, e[1] - Math.sin(an - 0.45) * hs);
    g.lineTo(e[0] - Math.cos(an + 0.45) * hs, e[1] - Math.sin(an + 0.45) * hs); g.fill(); }
  g.restore();
}

// ═════════════════════════ ảnh lịch sử (DNA §8, assets/history/INDEX.md) ═════════════════════════
/** Nhãn tiếng Nhật + credit BẮT BUỘC (INDEX.md). mono: chân dung / hiện vật in đơn sắc; light: ẢNH ÁNH SÁNG THẬT giữ màu (màu
 * ở đây là ánh sáng). maxH: ảnh nhỏ không phóng quá. */
export const PHOTOS = {
  'alhazen-hevelius': { label: 'イブン・アル＝ハイサム（想像図・1647年）', credit: 'パブリックドメイン', kind: 'mono' },
  'hevelius-1647': { label: 'ヘヴェリウス『月面誌』の扉絵（1647年）', credit: 'パブリックドメイン', kind: 'mono' },
  'opticae-thesaurus': { label: '『光学の書』ラテン語版（1572年）', credit: 'パブリックドメイン', kind: 'mono' },
  'alhazen-eye': { label: 'アルハゼンの目の図（1572年版）', credit: 'CC0', kind: 'mono', maxH: 480 },
  newton: { label: 'アイザック・ニュートン（1642–1727）', credit: 'パブリックドメイン', kind: 'mono' },
  'newton-crucis': { label: 'プリズムの実験をするニュートン（想像画）', credit: '画：Sascha Grusche / CC BY-SA 4.0', kind: 'light' },
  huygens: { label: 'クリスティアーン・ホイヘンス（1629–1695）', credit: 'パブリックドメイン', kind: 'mono' },
  young: { label: 'トマス・ヤング（1773–1829）', credit: 'パブリックドメイン', kind: 'mono' },
  'young-waves': { label: 'ヤングが描いた二つの波の重なり', credit: 'パブリックドメイン', kind: 'mono' },
  'young-fig442': { label: 'ヤングの講義録（1807年）の図', credit: 'パブリックドメイン', kind: 'mono', maxH: 380 },
  maxwell: { label: 'ジェームズ・クラーク・マクスウェル（1831–1879）', credit: 'パブリックドメイン', kind: 'mono', maxH: 640 },
  'einstein-1921': { label: 'アルベルト・アインシュタイン（1921年）', credit: 'パブリックドメイン', kind: 'mono' },
  'rainbow-double': { label: '二重の虹（外側は色の順が逆）', credit: '写真：Eric Rolph / CC BY-SA 2.5', kind: 'light' },
  'spectrum-na': { label: 'ナトリウムの光を分光器で見ると', credit: 'パブリックドメイン', kind: 'light' },
  'spectrum-ne': { label: 'ネオンの光を分けると', credit: 'CC0', kind: 'light' },
  'tube-ne': { label: 'ネオンガスの光', credit: '写真：Jurii / CC BY 3.0', kind: 'light' },
  'tube-h': { label: '水素ガスの光', credit: '写真：Alchemist-hp / Free Art License', kind: 'light' },
  'sodium-street': { label: 'ナトリウムランプの街灯', credit: '写真：UnifiedFunctionality / CC BY-SA 4.0', kind: 'light' },
  'sodium-cars': { label: 'ナトリウムランプの下の赤い車と黒い車', credit: '写真：Darkest tree / CC BY-SA 4.0', kind: 'light' },
  'mimulus-uv': { label: '人の目で見た花（左）と紫外線で見た花（右）', credit: '写真：Plantsurfer / CC BY-SA 3.0', kind: 'light' },
};
/** Đường dẫn ảnh (trang = projects/ja/hikari/*.html): static IMAGES = imgs('newton', …). */
export const imgs = (...keys) => Object.fromEntries(keys.map(k => { if (!PHOTOS[k]) throw new Error(`imgs: "${k}" không có trong PHOTOS`);
  return [k, `./assets/history/${k === 'newton-crucis' ? 'newton-crucis-grusche.jpg' : k + ({ 'alhazen-hevelius': '.png', 'hevelius-1647': '.png', 'young-waves': '.png' }[k] ?? '.jpg')}`]; }));
const IM = {}, PH = {};
function printOf(src, h, kind) {                        // ở CỠ HIỂN THỊ: mono = in bạc ấm kéo giãn p2–p98; light = giữ màu
  const w = Math.round(src.width * h / src.height), c = mk(w, h), x = c.getContext('2d', { willReadFrequently: true });
  x.imageSmoothingQuality = 'high'; x.drawImage(src, 0, 0, w, h);
  if (kind === 'light') return c;
  const d = x.getImageData(0, 0, w, h), n = w * h, L = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * d.data[i * 4] + 0.59 * d.data[i * 4 + 1] + 0.11 * d.data[i * 4 + 2]; L[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.02), hi = Math.max(lo + 1, pct(0.98)), A = [14, 13, 12], B = [237, 232, 223];
  for (let i = 0; i < n; i++) { const v = smooth(clamp((L[i] - lo) / (hi - lo))); for (let j = 0; j < 3; j++) d.data[i * 4 + j] = A[j] + (B[j] - A[j]) * v; }
  x.putImageData(d, 0, 0); return c;
}
/**
 * Ảnh lịch sử được một luồng sáng rọi (góc trên-trái x, y; cao h): mép ngoài tối dần (ánh đèn rọi, không khung bạc); k: luồng
 * sáng mở từ tâm ra (không fade, không trượt). Nhãn (Noto 700) + credit (28 px, phụ) LUÔN dưới ảnh. Trả về { x, y, w, h, bottom }.
 */
export function photo(g, key, x, y, h, k = 1, { sub = '', labelSize = 34, align = 'left' } = {}) {
  const P = PHOTOS[key]; if (!P) throw new Error(`photo: "${key}" không có trong PHOTOS / INDEX.md`);
  if (!IM[key]) throw new Error(`photo: chưa nạp ảnh "${key}" (static IMAGES = imgs(…))`);
  if (P.maxH && h > P.maxH) throw new Error(`photo: ${key} gốc nhỏ — khung ≤ ${P.maxH} px cao`);
  const im = (PH[key + '@' + h] ??= printOf(IM[key], h, P.kind)), w = im.width;
  const lx = align === 'center' ? x + w / 2 : align === 'right' ? x + w : x;
  const lab = { font: `700 ${labelSize}px ${JP}`, align }, cr = { font: `400 28px ${JP}`, color: '@dim', align };
  const ly = y + h + 22 + labelSize, cy = ly + (sub ? labelSize + 12 : 0) + 40, box = { x, y, w, h, bottom: cy + 8 };
  if (k <= 0) { write(g, P.label, lx, ly, 0, lab); write(g, P.credit, lx, cy, 0, cr); return box; }
  const e = outCubic(clamp(k)), r = Math.hypot(w, h) * 0.62 * e;
  g.save(); g.beginPath(); g.ellipse(x + w / 2, y + h / 2, r * (w / Math.hypot(w, h)) * 1.25, r * (h / Math.hypot(w, h)) * 1.25, 0, 0, TAU); g.clip();
  g.drawImage(im, x, y, w, h);
  const vg = g.createRadialGradient(x + w / 2, y + h / 2, Math.min(w, h) * 0.35, x + w / 2, y + h / 2, Math.hypot(w, h) * 0.62);
  vg.addColorStop(0, 'rgba(11,11,14,0)'); vg.addColorStop(1, 'rgba(11,11,14,0.55)'); g.fillStyle = vg; g.fillRect(x, y, w, h);
  g.restore();
  const kl = clamp((k - 0.6) / 0.4);
  write(g, P.label, lx, ly, kl, lab);
  if (sub) write(g, sub, lx, ly + labelSize + 12, kl, { font: `700 ${labelSize}px ${JP}`, align });
  write(g, P.credit, lx, cy, kl, cr);
  return box;
}

// ═════════════════════════ nhân vật ═════════════════════════
// crop = phần trên ảnh được giữ (assets/character-v2/crop.js). MIỆNG NÓI khi truyền { t } — CHỈ tư thế có trong mouths.js (ponder,
// point, ok, wave, calculator); tư thế khác im. Trang gọi setTalk(data/<part>.mouth.json); chưa có tệp → mascot im.
// Trong phòng tối: mascot hơi tối đi + ánh viền ấm phía LỖ (trái) — đứng trong luồng sáng mới thấy rõ (DNA §5).
const SIL = {}, TINT = {}, BBOX = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
function prepPose(key) {
  const im = IM[key];
  const t = mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop';
  tx.fillStyle = 'rgba(11,11,14,0.16)'; tx.fillRect(0, 0, im.width, im.height);
  const rim = tx.createLinearGradient(0, 0, im.width, 0); rim.addColorStop(0, 'rgba(246,242,234,0.10)'); rim.addColorStop(0.35, 'rgba(246,242,234,0)'); rim.addColorStop(1, 'rgba(0,0,0,0.18)');
  tx.fillStyle = rim; tx.fillRect(0, 0, im.width, im.height); TINT[key] = t;
  const s = mk(im.width, im.height), sx = s.getContext('2d'); sx.filter = 'blur(14px)'; sx.drawImage(im, 0, 0); sx.filter = 'none';
  sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#000000'; sx.fillRect(0, 0, im.width, im.height); SIL[key] = s;
  const c = mk(im.width, im.height), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
  const d = x.getImageData(0, 0, im.width, im.height).data; let a = im.width, b = 0;
  for (let py = 0; py < im.height; py += 4) for (let px = 0; px < im.width; px += 2) if (d[(py * im.width + px) * 4 + 3] > 8) { if (px < a) a = px; if (px > b) b = px; }
  BBOX[key] = [a, b];
}
/**
 * Mascot: cx tâm ảnh, foot đáy, h chiều cao hiển thị; k = trồi lên + bật (không fade). lit: vệt sáng trên tường sau lưng (0..1).
 * Trả về { x, y, w, h, s, x0b, x1b } (x0b..x1b: bề ngang có điểm ảnh — để giữ chữ khỏi đè).
 */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, lit = 1, crop = CROP[pose] ?? 1 } = {}) {
  const key = 'pose-' + pose, im = TINT[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * crop, s = h / sh0, w = im.width * s, x0 = cx - w / 2, [bx0, bx1] = BBOX[key];
  const x0b = flip ? cx + w / 2 - bx1 * s : x0 + bx0 * s, x1b = flip ? cx + w / 2 - bx0 * s : x0 + bx1 * s;
  if (x0b < WALL_X) throw new Error(`figure: "${pose}" đè tường 雨戸 (x ${Math.round(x0b)} < ${WALL_X})`);
  if (k <= 0) return { x: x0, y: foot - h, w, h, s, x0b, x1b };
  if (lit > 0) spot(g, cx, foot - h * 0.55, h * 0.75, { a: 0.10 * clamp(lit), sy: 1.1 });
  const rise = (1 - outBack(clamp(k))) * h * 0.5, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.45; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 20, y0 + 12, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV && MOUTHS[pose]) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h, s, x0b, x1b };
}

// ═════════════════════════ chuyển cảnh (DNA §7 — trang gọi) ═════════════════════════
/**
 * Trang gọi trong 0.9 s từ FROM của cảnh sau. same = cùng ERA → 雨戸 KHÉP (0–0.45: ván trượt từ trái phủ cảnh cũ) rồi MỞ
 * (0.45–0.9: ván trượt tiếp sang phải để lộ cảnh mới) — đen–đen tự nhiên, một tiếng gỗ trượt. Khác ERA → vòng sáng mở từ LỖ
 * (cur.WIPE hoặc APT): cảnh mới hiện trong vòng tròn loé viền sáng.
 */
export function transition(g, T, prev, cur, k, same) {
  const e = clamp(k);
  if (same) {
    if (e < 0.5) { prev.render(g, T); amado(g, e / 0.5, { from: 'left' }); }
    else { cur.render(g, T); amado(g, 1 - (e - 0.5) / 0.5, { from: 'right' }); }
  } else {
    prev.render(g, T);
    const [cx, cy] = cur.WIPE || [APT.x, APT.y], r = Math.round(2300 * Math.pow(outCubic(e), 1.3));
    g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); cur.render(g, T); g.restore();
    if (e < 1) { const gr = g.createRadialGradient(cx, cy, Math.max(0, r - 40), cx, cy, r + 8); gr.addColorStop(0, 'rgba(246,242,234,0)'); gr.addColorStop(0.8, 'rgba(246,242,234,0.55)'); gr.addColorStop(1, 'rgba(246,242,234,0)');
      g.save(); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r + 8, 0, TAU); g.fill(); g.restore(); }
  }
}

// ═════════════════════════ tiếng (DNA §10 — chỉ loại có trong assets/sfx/library.json) ═════════════════════════
/** Nghĩa → loại tiếng (assets/sfx/library.json). amado / zap thêm cho bài này (OpenGameArt CC0, 2026-10-14). */
export const SND = {
  amado: 'amado', hole: 'tick', beam: 'shimmer', photon: 'tick', arrive: 'beep', glass: 'glass', prism: 'glass', water: 'glass',
  spectrum: 'shimmer', electron: 'zap', zap: 'zap', fail: 'error', aha: 'suzu', nobel: 'suzu', photo: 'page', page: 'page',
  telop: 'pop', card: 'card', impact: 'impact', step: 'tick', wave: 'whoosh',
};
/** Một cue: cue(t, 'photon') hoặc cue(t, 'glass', db) — tên nghĩa (SND) hoặc tên loại. */
export const cue = (t, what, db) => ({ t: +t.toFixed(3), kind: SND[what] ?? what, ...(db != null ? { db } : {}) });

// ═════════════════════════ nạp ═════════════════════════
/** Nạp nền (mọi ERA), hạt, ảnh / tư thế (images: { key: url }). */
export async function loadKit(images) {
  for (const k of Object.keys(ERA)) BG[k] = makeRoom(k);
  GRAIN[0] = makeGrain(1); GRAIN[1] = makeGrain(2);
  await loadImages(images, IM);
  for (const key of Object.keys(images)) if (key.startsWith('pose-')) prepPose(key);
}
