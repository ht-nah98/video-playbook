// Đồ nghề chung của ja/2048 — DNA「盤上」(projects/ja/2048/DNA.md): bàn 榧 4×4 trên chiếu 畳, nắng xiên trên-trái, quân 駒
// 17 bậc (chất liệu + độ dày). Bàn thử gốc: tools/lab/banjo.html (khung 0 = 131072の壁, khung 1 = cây エクスペクティマックス).
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm THUẦN của tham số (tất định); kết cấu (chiếu, 榧, 和紙, nắng), bóng mascot, mặt nạ màn điện thoại sinh
// MỘT lần trong loadKit. k ∈ [0, 1] là tiến độ hiện ra; mọi hàm có k đã thử ở 0.25/0.5/0.75/1 trên kit-test.html (§89).
//
// LUẬT KIT GIỮ BẰNG CODE (LESSONS §95):
//  • Mọi hàm chữ (write, telop, answer, luck, wrong, heading, actCard, vtext, tanzaku, stamp, nhãn cây) ném lỗi khi chữ Nhật
//    (Shippori / Noto Sans JP) < 28 px. Miễn DUY NHẤT: phần có cờ { sup: true } và chỉ gồm số/dấu (số mũ ¹⁷ vẽ bằng Noto).
//  • Màu nghĩa không xuất ra C: 朱 chỉ qua answer() / stamp() / màu '@ans'; 浅葱 chỉ qua luck() / coin() / koma { luck } /
//    hl của bàn / '@luck'. Sai / gạch: wrong() / strikeInk() / '@wrong' (墨 xám, không son).
//  • Số trên quân ≥ 28 px; số 5–6 chữ số ≥ 36 px khi quân ≥ 150 px; quân quá nhỏ cho số → phải truyền { numbers: false }.
//  • Kicker từng hồi ở ACTS (actCard, heading) — cảnh không tự viết.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages, must } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';
const TAU = 2 * Math.PI;
export { TAU };

// ═════════════════════════ bảng màu (DNA §2) ═════════════════════════
// Màu TRUNG TÍNH dùng tự do. 朱 / 浅葱 KHÔNG ở đây (xem SHU, ASAGI riêng dưới — chỉ hàm có tên nghĩa dùng).
export const C = {
  sumi: '#17110C', gofun: '#F2EBDD', gofunDim: '#CFC3A8', paper: '#ECE3CF', greyInk: '#5E5242',
  kaya: '#DDB062', kayaVein: '#B98A42', kayaEdge: '#8E6229', tatami: '#2A2619', tatamiDk: '#15130D',
  gold: '#D9B45A', goldLt: '#F3DE9C', goldDk: '#8A6624',
};
const SHU = { fill: '#C53A20', paper: '#A42C16', dark: '#FF7448' };          // 朱: đáp án / khoảnh khắc chốt
const ASAGI = { fill: '#3AA5B5', paper: '#156A78', dark: '#7FD0DA' };       // 浅葱: may rủi
const GREY = { paper: '#6B6253', dark: '#A89E8C' };                         // 墨 xám: sai / gạch
export const MIN = '"Shippori Mincho"', JP = '"Noto Sans JP"', CG = '"Cormorant Garamond"';
/** Mọi mặt chữ kit và cảnh dùng — trang nạp đủ bằng Promise.all trước init (LESSONS §16, đua font). */
export const FONTS = [`700 40px ${MIN}`, `400 40px ${MIN}`, `400 40px ${JP}`, `500 40px ${JP}`, `700 40px ${JP}`,
  `500 40px ${CG}`, `600 40px ${CG}`];
export const FONT_SAMPLE = '縦横盤駒運壁第一幕合計は消えない0123456789①②③↑↓←→×÷=≈¹⁷';

// tương phản đo bằng số (ném lỗi < 4.5) — nền tối đo ở chỗ sáng nhất của chiếu (#3A3424)
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const needC = (a, b, what, k = 4.5) => { const c = contrast(a, b); if (c < k) throw new Error(`kit: tương phản ${what} ${c.toFixed(2)} < ${k}`); };
const LIT = '#3A3424';
needC(C.gofun, LIT, 'gofun/chiếu'); needC(C.gofunDim, LIT, 'gofunDim/chiếu'); needC(SHU.dark, LIT, '朱/chiếu'); needC(ASAGI.dark, LIT, '浅葱/chiếu');
needC(GREY.dark, LIT, 'xám/chiếu'); needC(C.sumi, C.paper, 'mực/giấy'); needC(SHU.paper, C.paper, '朱/giấy'); needC(ASAGI.paper, C.paper, '浅葱/giấy');
needC(GREY.paper, C.paper, 'xám/giấy'); needC(C.greyInk, C.paper, 'xám nhãn/giấy'); needC(C.sumi, C.kaya, 'mực/榧');

/** Màu chữ theo nền: 'dark' (chiếu), 'paper' (和紙), 'wood' (榧). Token nghĩa: '@ans' 朱, '@luck' 浅葱, '@wrong' xám, '@dim' phụ. */
export function ink(col, on = 'dark') {
  const paperish = on === 'paper' || on === 'wood';
  if (col == null || col === '@ink') return paperish ? C.sumi : C.gofun;
  if (col === '@ans') return paperish ? SHU.paper : SHU.dark;
  if (col === '@luck') return paperish ? ASAGI.paper : ASAGI.dark;
  if (col === '@wrong') return paperish ? GREY.paper : GREY.dark;
  if (col === '@dim') return paperish ? C.greyInk : C.gofunDim;
  if (col === SHU.fill || col === SHU.paper || col === SHU.dark || col === ASAGI.fill || col === ASAGI.paper || col === ASAGI.dark)
    throw new Error('kit: màu nghĩa chỉ qua token @ans / @luck (hàm có tên nghĩa)');
  return col;
}

// ═════════════════════════ hằng toán (mọi số lên hình qua must) ═════════════════════════
/** Bậc thang 16 ô (tăng dần): 4, 4, 8, 16, …, 65536 — tổng 2¹⁷ = 131072 (c2). */
export const LADDER = [4, ...Array.from({ length: 15 }, (_, i) => 2 ** (i + 2))];
must(`${LADDER.length}`, 16); must(`[${LADDER}].reduce((a, b) => a + b, 0)`, 131072); must('2 ^ 17', 131072);
must(`${LADDER[0]} === 4 && ${LADDER[1]} === 4 && ${LADDER[15]} === 65536`, true);
/** Bậc thang nếu quân mới chỉ là 2: 2, 2, 4, …, 32768 — tổng 2¹⁶ = 65536 (c3). */
export const LADDER2 = [2, ...Array.from({ length: 15 }, (_, i) => 2 ** (i + 1))];
must(`[${LADDER2}].reduce((a, b) => a + b, 0)`, 65536);
/** Trung bình quân mới mỗi lượt: 0.9·2 + 0.1·4. */
export const MEAN = 2.2;
must('Math.round((0.9 * 2 + 0.1 * 4) * 10) / 10', MEAN);
/** Số trạng thái bàn: 18 giá trị (trống, 2 … 131072) mỗi ô, 16 ô → ≈ 1.2垓. */
export const STATES = 18 ** 16;
must(`Math.round(${STATES} / 1e19)`, 12); must(`${STATES} > 1e8 * 1e8 * 1e4`, true);
must('4 * 15 * 2', 120); must('15 * 2', 30);
/** Bảng hồi (kicker) — actCard / heading đọc ở đây. */
export const ACTS = [['第一幕', '合計は消えない'], ['第二幕', '131072の壁'], ['第三幕', 'なぜ角に集めるのか'], ['第四幕', '相手の名は「運」'],
  ['第五幕', '自分で学ぶ機械'], ['第六幕', '勝ち続けることはできるのか'], ['第七幕', 'まとめ']];
export const ARROW = { U: '↑', D: '↓', L: '←', R: '→' };
/** 1234567 → "1,234,567". */
export const comma = n => { const [i, d] = String(n).split('.'); return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : ''); };

// ═════════════════════════ luật 2048 thật ═════════════════════════
const sum = cells => cells.flat().reduce((a, b) => a + b, 0);
export const copy = cells => cells.map(r => r.slice());
export const empty = () => [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
/**
 * Một lượt vuốt dir ∈ 'U' 'D' 'L' 'R': trượt + gộp MỘT lần mỗi ô (luật 2048 thật). Trả về
 * { cells, moves: [{ from: [r,c], to: [r,c], v, merge }], merges: [{ at: [r,c], v }], score, moved }. Tổng bảo toàn (must).
 */
export function slide(cells, dir) {
  if (!'UDLR'.includes(dir) || dir.length !== 1) throw new Error(`slide: hướng lạ "${dir}"`);
  const out = empty(), moves = [], merges = []; let score = 0;
  const at = (i, k) => dir === 'L' ? [i, k] : dir === 'R' ? [i, 3 - k] : dir === 'U' ? [k, i] : [3 - k, i];
  for (let i = 0; i < 4; i++) {
    const a = []; for (let k = 0; k < 4; k++) { const [r, c] = at(i, k); if (cells[r][c]) a.push({ v: cells[r][c], pos: [r, c] }); }
    let o = 0;
    for (let j = 0; j < a.length; o++) {
      const to = at(i, o);
      if (j + 1 < a.length && a[j].v === a[j + 1].v) {
        const v = 2 * a[j].v; out[to[0]][to[1]] = v; score += v; merges.push({ at: to, v });
        moves.push({ from: a[j].pos, to, v: a[j].v, merge: true }, { from: a[j + 1].pos, to, v: a[j + 1].v, merge: true }); j += 2;
      } else { out[to[0]][to[1]] = a[j].v; moves.push({ from: a[j].pos, to, v: a[j].v, merge: false }); j++; }
    }
  }
  must(`${sum(cells)} === ${sum(out)}`, true);                                   // 保存則: trượt/gộp không đổi tổng
  const moved = moves.some(m => m.from[0] !== m.to[0] || m.from[1] !== m.to[1]);
  return { cells: out, moves, merges, score, moved };
}
/** Quân mới bằng hash(i): ô trống thứ ⌊hash·n⌋, giá trị 2 (9/10) / 4 (1/10). Trả về { cells, at, v }. */
export function spawn(cells, i) {
  const E = []; cells.forEach((row, r) => row.forEach((v, c) => { if (!v) E.push([r, c]); }));
  if (!E.length) throw new Error('spawn: bàn kín, không còn ô trống');
  const at = E[Math.floor(hash(i * 7.31 + 0.13) * E.length) % E.length], v = hash(i * 3.77 + 0.71) < 0.9 ? 2 : 4, out = copy(cells);
  out[at[0]][at[1]] = v; return { cells: out, at, v };
}
/**
 * Chơi n lượt từ cells0. order = null → bấm bừa (hướng theo hash); order = 'DLRU' → luật ưu tiên (d2). Mỗi bước:
 * { prev, dir, res (kết quả slide), spawn, cells (sau khi quân mới rơi) }. Hết nước → dừng (bước cuối có over = true).
 */
export function play(cells0, n, { seed = 1, order = null } = {}) {
  const steps = []; let cur = cells0;
  for (let s = 0; s < n; s++) {
    const tries = order ? [...order] : [...'UDLR'].map((d, j) => [d, hash(seed * 91.7 + s * 13.13 + j * 3.1)]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
    let done = false;
    for (const d of tries) {
      const res = slide(cur, d); if (!res.moved) continue;
      const sp = spawn(res.cells, seed * 1000 + s);
      steps.push({ prev: cur, dir: d, res, spawn: sp, cells: sp.cells }); cur = sp.cells; done = true; break;
    }
    if (!done) { if (steps.length) steps.at(-1).over = true; break; }
  }
  return steps;
}
/** Thứ tự ô theo hình rắn từ góc trên-trái (hàng 0 trái→phải, hàng 1 phải→trái, …). */
export const SNAKE = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [1, 1], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0]];
/** Bàn rắn: levels (≤ 16 giá trị) xếp GIẢM dần dọc SNAKE từ góc trên-trái. snake(LADDER) = khung lab 0. */
export function snake(levels) {
  if (levels.length > 16) throw new Error('snake: quá 16 quân');
  const s = levels.slice().sort((a, b) => b - a), out = empty();
  s.forEach((v, i) => { const [r, c] = SNAKE[i]; out[r][c] = v; });
  return out;
}

// ═════════════════════════ chất liệu nạp sẵn ═════════════════════════
function vnoise(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, s = t => t * t * (3 - 2 * t);
  const h = (i, j) => hash(i * 12.9898 + j * 78.233 + seed * 3.17);
  const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1), u = s(xf), v = s(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
let TATAMI, KAYA, WASHI, SUN, GROUND_ON = true;
function makeTatami() {                               // chiếu 畳 tối: sợi い草 ngang, sợi gai dọc, sáng dần về trên-trái (lab)
  const c = mk(), x = c.getContext('2d'), d = x.createImageData(W, H);
  for (let py = 0; py < H; py++) {
    const row = Math.floor(py / 4.2), rv = hash(row * 1.37) - 0.5, inRow = (py / 4.2) % 1;
    for (let px = 0; px < W; px++) {
      const k = (py * W + px) * 4;
      const warp = (px % 46) < 1 ? -3 : 0;
      const bump = Math.sin(inRow * Math.PI) * 9 - 5 + (vnoise(px / 9, row * 1.3, 6) - 0.5) * 6;
      const fib = (vnoise(px / 30, row * 0.7, 3) - 0.5) * 9 + (hash(px * 0.37 + row * 91.1) - 0.5) * 5;
      const light = 26 - 44 * Math.min(1.25, Math.hypot(px + 200, py + 260) / 2300);
      const vig = -26 * Math.max(0, Math.hypot((px - W / 2) / W, (py - H / 2) / H) - 0.32) * 2.4;
      const n = rv * 7 + warp + bump + fib + light + vig;
      d.data[k] = 46 + n; d.data[k + 1] = 41 + n * 0.95; d.data[k + 2] = 26 + n * 0.7; d.data[k + 3] = 255;
    }
  }
  x.putImageData(d, 0, 0); return c;
}
function makeKaya(sz = 900) {                         // 榧 柾目: vân thẳng mịn dọc, vàng óng (lab)
  const c = mk(sz, sz), x = c.getContext('2d'), d = x.createImageData(sz, sz), lo = [226, 184, 106], hi = [186, 136, 64];
  for (let py = 0; py < sz; py++) for (let px = 0; px < sz; px++) {
    const k = (py * sz + px) * 4;
    const ph = (px + 14 * vnoise(px / 300, py / 500, 2) + 4 * vnoise(px / 60, py / 220, 5)) / (5.5 + 3 * vnoise(px / 700, 0, 8));
    const f = ph - Math.floor(ph), band = vnoise(Math.floor(ph) * 1.9, 0.3, 11);
    const late = Math.max(0, Math.sin(f * Math.PI) ** 6) * (0.25 + 0.7 * band);
    const fib = (vnoise(px / 1.4, py / 40, 13) - 0.5) * 8 + (hash(py * sz + px) - 0.5) * 4;
    const sheen = 10 * vnoise(px / 200, py / 900, 17);
    for (let ch = 0; ch < 3; ch++) d.data[k + ch] = lo[ch] + (hi[ch] - lo[ch]) * late + (fib + sheen) * [1, 0.9, 0.7][ch];
    d.data[k + 3] = 255;
  }
  x.putImageData(d, 0, 0); return c;
}
function makeWashi(w = 1600, h = 1000) {             // 和紙: sợi 楮 + hạt mịn, sáng xiên trên-trái
  const c = mk(w, h), x = c.getContext('2d');
  x.fillStyle = C.paper; x.fillRect(0, 0, w, h);
  const d = x.getImageData(0, 0, w, h);
  for (let i = 0; i < w * h; i++) { const px = i % w, py = (i / w) | 0, n = (hash(i * 0.917) - 0.5) * 5 + (vnoise(px / 140, py / 140, 3) - 0.5) * 7;
    d.data[i * 4] += n; d.data[i * 4 + 1] += n; d.data[i * 4 + 2] += n * 0.9; }
  x.putImageData(d, 0, 0);
  for (let i = 0; i < Math.round(w * h / 700); i++) {
    const fx = hash(i * 1.7 + 0.3) * w, fy = hash(i * 3.1 + 0.7) * h, an = hash(i * 5.3 + 0.1) * Math.PI, L = 6 + hash(i * 2.9) * 22;
    x.strokeStyle = `rgba(150,128,90,${0.05 + hash(i * 0.7) * 0.1})`; x.lineWidth = 0.7; x.beginPath(); x.moveTo(fx, fy);
    x.quadraticCurveTo(fx + L * 0.5 * Math.cos(an + 0.4), fy + L * 0.5 * Math.sin(an + 0.4), fx + L * Math.cos(an), fy + L * Math.sin(an)); x.stroke();
  }
  return c;
}
function makeSun() {                                  // vệt nắng qua 障子: mảng sáng xiên từ trên-trái, bóng 桟 mảnh
  const S = 2400, c = mk(S, S), x = c.getContext('2d');
  x.save(); x.translate(S / 2, S / 2); x.transform(1, 0, -0.5, 1, 0, 0); x.rotate(-0.1);
  const pw = 1100, ph = 900, gr = x.createRadialGradient(-60, -40, 120, 0, 0, 760);
  gr.addColorStop(0, 'rgba(255,226,172,0.6)'); gr.addColorStop(0.7, 'rgba(255,214,150,0.3)'); gr.addColorStop(1, 'rgba(255,214,150,0)');
  x.fillStyle = gr; x.fillRect(-pw / 2, -ph / 2, pw, ph);
  x.globalCompositeOperation = 'destination-out'; x.fillStyle = 'rgba(0,0,0,0.6)';
  for (let i = -3; i <= 3; i++) x.fillRect(i * 150 - 3, -ph / 2, 6, ph);           // 桟 dọc
  for (let j = -3; j <= 3; j++) x.fillRect(-pw / 2, j * 120 - 2, pw, 4);            // 桟 ngang
  x.restore();
  const b = mk(S, S), bx = b.getContext('2d'); bx.filter = 'blur(5px)'; bx.drawImage(c, 0, 0); bx.filter = 'none';   // filter chỉ lúc nạp
  return b;
}
export function setGround(on) { GROUND_ON = on; }    // trang tắt nền khi vẽ cảnh vào bộ đệm trong suốt (chuyển 棋譜)
/** Nền chiếu + nắng. sun 0..1 (0 = phòng tắt nắng, tối hơn) — p2 mở: nắng hiện dần; a0 cuối: nắng tắt. t: nắng trôi rất chậm. */
export function ground(g, t = 0, { sun = 1 } = {}) {
  if (!GROUND_ON) return;
  g.drawImage(TATAMI, 0, 0);
  const s = clamp(sun);
  if (s < 1) { g.fillStyle = `rgba(10,8,4,${0.38 * (1 - s)})`; g.fillRect(0, 0, W, H); }
  if (s > 0) {
    g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.34 * s;
    g.drawImage(SUN, -900 + Math.round(Math.sin(t * 0.03) * 30), -930 + Math.round(Math.cos(t * 0.021) * 20)); g.restore();
  }
}
/** Tối dần về đen (on 1 = sáng, 0 = đen kín) — a0 cuối → intro; p2 đầu ← intro. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(0,0,0,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }
/** Zoom nhẹ quanh (fx, fy) — DNA §7: ≤ 1.6×, không xoay. Gọi trong g.save()/restore() của cảnh. */
export function zoom(g, z, fx = W / 2, fy = H / 2) {
  if (z > 1.6 + 1e-9) throw new Error(`zoom ${z} > 1.6 (DNA §7)`);
  g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
}

// ═════════════════════════ chữ ═════════════════════════
const JPF = /Shippori|Noto Sans JP/;
const pxOf = font => { const m = /(\d+(?:\.\d+)?)px/.exec(font); if (!m) throw new Error(`kit: font không có cỡ px: ${font}`); return +m[1]; };
/** Luật cỡ chữ Nhật ≥ 28 px (LESSONS §95). Miễn: sup = true VÀ chuỗi chỉ gồm số / dấu (số mũ). */
export function guard(font, s, sup = false) {
  if (!JPF.test(font) || pxOf(font) >= 28) return;
  if (sup && /^[0-9.,+\-−×=]+$/.test(s)) return;
  throw new Error(`kit: chữ Nhật ${pxOf(font)} px < 28 px: "${s}" (${font}) — LESSONS §95`);
}
/** Đo một chuỗi với letterSpacing. */
export function measure(g, s, font, ls = 0) { g.save(); g.font = font; g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; g.restore(); return w; }
const norm = (parts, font, color) => (typeof parts === 'string' ? [[parts]] : parts).map(p => {
  const [s, f = font, c = color, o = {}] = p; return { s: String(s), f, c, rise: o.rise ?? 0, gap: o.gap ?? 0, sup: !!o.sup };
});
/**
 * Chữ VIẾT ra (DNA §3 — không fade): lộ từng ký tự theo k, ký tự đang viết lộ dần từ trái (nét chạy).
 * parts: chuỗi, hoặc [[chuỗi, font?, màu?, { rise, gap, sup }?], …] nhiều mặt chữ nối liền (mũ ¹⁷ = Noto, sup: true).
 * Màu: '@ink' (mặc định theo nền), '@dim', '@ans' 朱, '@luck' 浅葱, '@wrong' xám — hoặc màu trung tính của C.
 * opts: on 'dark' | 'paper' | 'wood', align, ls, shadow (mặc định: có trên nền tối). Trả về { x0, w, size } (đo cả dòng).
 */
export function write(g, parts, x, y, k = 1, { font = `700 44px ${MIN}`, color = '@ink', on = 'dark', align = 'left', ls = 0, shadow = on === 'dark' } = {}) {
  const P = norm(parts, font, color);
  for (const p of P) guard(p.f, p.s, p.sup);
  const ws = P.map(p => measure(g, p.s, p.f, ls)), tot = ws.reduce((a, w, i) => a + w + P[i].gap, 0);
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  const size = Math.max(...P.map(p => pxOf(p.f)));
  const N = P.reduce((a, p) => a + [...p.s].length, 0), m = N * clamp(k), full = Math.floor(m), frac = m - full;
  if (m <= 0) return { x0, w: tot, size };
  let left = full, cx = x0;
  g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  if (shadow) { g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 12; g.shadowOffsetY = 3; }
  for (let i = 0; i < P.length; i++) {
    const p = P[i], ch = [...p.s], take = Math.min(left, ch.length), yy = y - p.rise;
    g.font = p.f; g.fillStyle = ink(p.c, on);
    if (take > 0) g.fillText(ch.slice(0, take).join(''), cx, yy);
    if (take < ch.length && left === take && frac > 0) {               // ký tự đang viết: lộ từ trái theo frac
      const xa = cx + g.measureText(ch.slice(0, take).join('')).width, wc = g.measureText(ch[take]).width, fs = pxOf(p.f);
      g.save(); g.beginPath(); g.rect(xa - 2, yy - fs * 1.2, (wc + 2) * smooth(frac), fs * 1.6); g.clip(); g.fillText(ch[take], xa, yy); g.restore();
      left = 0; break;
    }
    left -= take; cx += ws[i] + p.gap;
    if (left <= 0) break;
  }
  g.restore();
  return { x0, w: tot, size };
}
/** テロップ (明朝 700). Trả về hộp { x, y, w, h } để đặt gạch / dấu. */
export function telop(g, parts, x, y, k = 1, { size = 44, weight = 700, font = `${weight} ${size}px ${MIN}`, ...o } = {}) {
  const r = write(g, parts, x, y, k, { font, ...o });
  return { x: r.x0, y: y - r.size * 0.95, w: r.w, h: r.size * 1.25 };
}
/** Đáp án / khoảnh khắc chốt — 朱 (DNA §2: = 131072, = 2.2, 期待値, 答, 1/10). */
export const answer = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, color: '@ans' });
/** May rủi — 浅葱 (đồng xu, nút 運, quân vừa rơi, xác suất). */
export const luck = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, color: '@luck' });
/** Chữ SAI (hiểu lầm) — 墨 xám; gạch bằng strikeInk(g, …box) rồi viết chữ đúng ngay dưới. */
export const wrong = (g, parts, x, y, k = 1, o = {}) => telop(g, parts, x, y, k, { ...o, color: '@wrong' });
/** Biển mục góc trên-trái: kicker của hồi (ACTS[act − 1]) + tên mục 明朝 + nét mảnh. act 0 = không kicker. Trả về bề rộng tên. */
export function heading(g, act, title, k = 1, { x = 96, y = 150, size = 56, on = 'dark' } = {}) {
  if (k <= 0) return 0;
  if (act) { const [a, b] = ACTS[act - 1]; write(g, `${a}　${b}`, x + 2, y - 66, clamp(k * 3), { font: `500 28px ${JP}`, color: '@dim', on, ls: 4 }); }
  const r = write(g, title, x, y, clamp(k * 1.6 - 0.3), { font: `700 ${size}px ${MIN}`, on, ls: 3 });
  if (r.w > 1000) throw new Error(`heading: tên mục "${title}" rộng ${Math.round(r.w)} px > 1000`);
  const kl = clamp(k * 1.6 - 0.6);
  if (kl > 0) { g.save(); g.strokeStyle = on === 'dark' ? 'rgba(217,180,90,0.6)' : 'rgba(23,17,12,0.5)'; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(x + 2, y + 24.5); g.lineTo(x + 2 + r.w * outCubic(kl), y + 24.5); g.stroke(); g.restore(); }
  return r.w;
}
const VROT = new Set([...'ー「」（）…〜―-']);
/**
 * Chữ DỌC 縦書き: từ (x, y) đỉnh cột, xuống dưới. 、。 lệch phải-trên, ー「」 xoay 90°. Trả về chiều cao cột.
 * 縦中横: chuỗi số liền ≤ 6 chữ số chiếm MỘT ô, vẽ ngang, thu ngang (cùng cỡ chữ ≥ 28) cho vừa bề rộng tcy (mặc định 2.1 × cỡ).
 */
export function vtext(g, s, x, y, k = 1, { size = 40, font = `700 ${size}px ${MIN}`, color = '@ink', on = 'paper', lead = 1.12, tcy = null } = {}) {
  guard(font, s);
  const fs = pxOf(font), cw = tcy ?? fs * 2.1;
  const ch = [...s], tok = [];
  for (let i = 0; i < ch.length;) {                                    // gom chuỗi số liền ≤ 6 thành một ô
    let j = i; while (j < ch.length && /[0-9]/.test(ch[j])) j++;
    if (j - i >= 2 && j - i <= 6) tok.push(ch.slice(i, j).join('')); else if (j > i) tok.push(...ch.slice(i, j)); else j++, tok.push(ch[i]);
    i = j;
  }
  const n = Math.round(tok.length * clamp(k));
  g.save(); g.font = font; g.fillStyle = ink(color, on); g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const c = tok[i], cy = y + fs * lead * (i + 0.5);
    if (/^[0-9]{2,}$/.test(c)) g.fillText(c, x, cy, cw);                        // 縦中横 (maxWidth nén ngang, giữ cỡ chữ)
    else if (c === '、' || c === '。') g.fillText(c, x + fs * 0.55, cy - fs * 0.45);
    else if (VROT.has(c)) { g.save(); g.translate(x, cy); g.rotate(Math.PI / 2); g.fillText(c, 0, 0); g.restore(); }
    else g.fillText(c, x, cy);
  }
  g.restore();
  return tok.length * fs * lead;
}

// ═════════════════════════ nét mực, dấu ═════════════════════════
/** Nét bút: polyline pts, vẽ dần theo k (theo chiều dài). Màu trung tính (C.sumi / C.gofun / C.goldLt …). */
export function brush(g, pts, k = 1, { w = 4, color = C.sumi, alpha = 0.9 } = {}) {
  if (k <= 0 || pts.length < 2) return;
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let want = tot * clamp(k); const p = [pts[0]];
  for (let i = 1; i < pts.length && want > 0; i++) { const f = Math.min(1, want / L[i - 1]); p.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]); want -= L[i - 1]; }
  g.save(); g.lineCap = g.lineJoin = 'round'; g.strokeStyle = color;
  const path = () => { g.beginPath(); p.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); };
  g.globalAlpha = alpha * 0.2; g.lineWidth = w + 2.5; path(); g.stroke();
  g.globalAlpha = alpha; g.lineWidth = w; path(); g.stroke(); g.restore();
}
/** Đường cong êm a → b (ngang trước, dọc sau — như dây cây 棋譜). */
export const curvePts = (a, b, n = 30) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, e = t * t * (3 - 2 * t); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * e]; });
/** Mũi tên nét bút (vuốt, chỉ hướng): thân + đầu chữ V; màu trung tính. */
export function arrow(g, x0, y0, x1, y1, k = 1, { w = 6, color = C.gofun, head = 26 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = x0 + (x1 - x0) * e, ye = y0 + (y1 - y0) * e, an = Math.atan2(y1 - y0, x1 - x0);
  brush(g, [[x0, y0], [xe, ye]], 1, { w, color });
  if (e > 0.6) { const h = head * clamp((e - 0.6) / 0.4);
    brush(g, [[xe - h * Math.cos(an - 0.5), ye - h * Math.sin(an - 0.5)], [xe, ye], [xe - h * Math.cos(an + 0.5), ye - h * Math.sin(an + 0.5)]], 1, { w, color }); }
}
/** Gạch 墨 xám (cái SAI — KHÔNG son): nét bút khô một lần, vạch dần từ trái. on: nền để chọn độ đậm. */
export function strikeInk(g, x0, y0, x1, y1, k = 1, { w = 6, on = 'dark' } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), col = on === 'dark' ? GREY.dark : GREY.paper;
  const pts = Array.from({ length: 13 }, (_, i) => { const f = i / 12 * e; return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f + Math.sin(i * 1.7) * 1.2]; });
  brush(g, pts, 1, { w, color: col, alpha: 0.95 });
}
/**
 * 判子 朱 (đáp án, 答, 評価): khung vuông bo góc, chữ 明朝 trắng âm, mép ăn mòn tất định. ≤ 3 chữ: một cột; 4 chữ: 2×2.
 * k: rơi xuống từ to (0–0.45) rồi nằm yên. size ≥ 28.
 */
export function stamp(g, s, x, y, k = 1, { size = 40, rot = -0.07, hole = C.paper } = {}) {
  if (k <= 0) return;
  guard(`700 ${size}px ${MIN}`, s);
  const ch = [...s], cols = ch.length === 4 ? 2 : 1, rows = Math.ceil(ch.length / cols);
  const w = cols * size * 1.08 + size * 0.42, h = rows * size * 1.08 + size * 0.42;
  const e = clamp(k / 0.45), sc = 1 + (1 - outCubic(e)) * 0.6;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc);
  g.fillStyle = SHU.fill; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, size * 0.12); g.fill();
  g.fillStyle = hole; g.font = `700 ${size}px ${MIN}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  ch.forEach((c, i) => { const col = cols === 2 ? 1 - Math.floor(i / rows) : 0, row = i % rows;
    g.fillText(c, -w / 2 + size * 0.21 + (col + 0.5) * size * 1.08, -h / 2 + size * 0.21 + (row + 0.5) * size * 1.08 + size * 0.04); });
  for (let i = 0; i < 26; i++) {
    const u = hash(i * 7.3 + s.length), side = i % 4, r = 1 + 2.2 * hash(i * 3.1 + 2);
    const px = side < 2 ? -w / 2 + u * w : (side === 2 ? -w / 2 : w / 2), py = side < 2 ? (side === 0 ? -h / 2 : h / 2) : -h / 2 + u * h;
    g.beginPath(); g.arc(px, py, r, 0, TAU); g.fill();
  }
  g.restore();
}

// ═════════════════════════ 駒: 17 bậc ═════════════════════════
export const rank = v => { const r = Math.round(Math.log2(v)); if (!(r >= 1 && r <= 17) || 2 ** r !== v) throw new Error(`koma: giá trị lạ ${v}`); return r; };
const WOODS = ['#F1DDA8', '#EAD093', '#E1C07B', '#D5AC63', '#C6964F', '#AE7C3E', '#8A5F2E'];         // 2 … 128 柘植 → 黒柿
const GOLDS = ['#E4C977', '#DDBA62', '#D6AB52', '#CF9D46', '#C8933D', '#C08A34'];                  // 2048 … 65536 金箔 ấm dần
const shade = (hex, f) => '#' + [1, 3, 5].map(i => Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(i, i + 2), 16) * f))).toString(16).padStart(2, '0')).join('');
/** Chất liệu một bậc: { kind 'wood' | 'lac' | 'gold', face, num (màu số), rim ('512' | '131072' | null), stripes 0–5 }. */
export function mat(v) {
  const r = rank(v);
  if (r <= 7) { const face = WOODS[r - 1]; return { kind: 'wood', face, num: contrast(face, C.sumi) >= 4.5 ? C.sumi : C.gofun, rim: null, stripes: 0 }; }
  if (r <= 9) return { kind: 'lac', face: '#5A2B19', num: C.goldLt, rim: r === 9 ? '512' : null, stripes: 0 };      // 溜塗; 512 viền vàng mảnh
  if (r === 10) return { kind: 'lac', face: '#15100D', num: C.gofun, rim: null, stripes: 0 };                       // 黒漆, chữ 胡粉
  if (r <= 16) return { kind: 'gold', face: GOLDS[r - 11], num: C.sumi, rim: null, stripes: r - 11 };              // 金箔 + 0–5 vạch đáy
  return { kind: 'lac', face: '#120D0B', num: C.goldLt, rim: '131072', stripes: 0 };                               // 131072 黒漆 chữ vàng
}
for (let r = 1; r <= 17; r++) { const m = mat(2 ** r); needC(m.num, m.face, `số trên quân ${2 ** r}`); }
/** Độ dày thân quân (px) theo bậc: 5 → 16 px ở cỡ quân 142 (DNA §2), tỉ lệ theo cỡ. */
export const thick = (v, s) => (5 + (rank(v) - 1) * 11 / 16) * s / 142;
function komaPath(cx, cy, w, h) {
  const p = new Path2D(), sh = h * 0.24;
  p.moveTo(cx, cy - h / 2); p.lineTo(cx + w * 0.40, cy - h / 2 + sh); p.lineTo(cx + w / 2, cy + h / 2); p.lineTo(cx - w / 2, cy + h / 2); p.lineTo(cx - w * 0.40, cy - h / 2 + sh); p.closePath();
  return p;
}
/** Cỡ số trên quân: ≥ 28 px; 5–6 chữ số ≥ 36 px khi quân ≥ 150 px; nén ngang tối đa 0.7. Trả về { fs, sx } hoặc null (không vừa). */
function numSize(g, txt, s, rim = false) {
  const w = s * 0.86, maxW = w * (rim ? 0.7 : txt.length >= 5 ? 0.84 : 0.74), min = txt.length >= 5 && s >= 150 ? 36 : 28;
  let fs = Math.max(min, s * (txt.length <= 2 ? 0.46 : txt.length === 3 ? 0.42 : 0.38));
  g.font = `700 ${fs}px ${MIN}`; let mw = g.measureText(txt).width;
  if (mw > maxW) { fs = Math.max(min, fs * maxW / mw); g.font = `700 ${fs}px ${MIN}`; mw = g.measureText(txt).width; }
  const sx = Math.min(1, maxW / mw);
  return sx < 0.7 ? null : { fs, sx };
}
/**
 * Một quân 駒 tâm (cx, cy), cỡ s (≈ ô bàn). k: rơi xuống đặt (0 → 1). opts:
 *  luck (viền 浅葱 — quân vừa rơi / may rủi), ghost (bóng mờ viền đứt — quân chưa có), lift 0..1 (nhấc lên),
 *  dim 0..1 (bị nhốt, tối đi), label (chữ thay số, vd mũi tên), numbers (false = không số, bàn mini), seed.
 * Trả về { th, ty, fs } (ty = tâm dòng số).
 */
export function koma(g, v, cx, cy, s, k = 1, { luck = false, ghost = false, lift = 0, dim = 0, label = null, numbers = true, seed = 0 } = {}) {
  if (k <= 0) return null;
  const m = mat(v), w = s * 0.86, h = s * 0.9, th = ghost ? thick(v, s) * 0.6 : thick(v, s), mini = s < 48;
  const e = outCubic(clamp(k)), dy = -(1 - e) * s * 0.45 - lift * s * 0.12, sc = 1 + (1 - e) * 0.12 + lift * 0.04;
  const txt = label ?? String(v);
  const ns = numbers ? numSize(g, txt, s, !!m.rim) : null;
  if (numbers && !ns) throw new Error(`koma: quân ${s.toFixed(0)} px quá nhỏ cho số "${txt}" ≥ 28 px — truyền { numbers: false } (bàn mini)`);
  if (ns) guard(`700 ${ns.fs}px ${MIN}`, txt);
  g.save();
  if (ghost) g.globalAlpha = 0.5;
  if (!ghost) {                                                       // bóng đổ (nằm trên bàn, xa ra khi nhấc / đang rơi)
    const off = th * 0.55 + 3 + (1 - e) * s * 0.12 + lift * s * 0.1;
    g.save(); g.fillStyle = `rgba(20,10,2,${0.35 - 0.12 * (1 - e)})`; g.translate(off, off * 1.4); g.fill(komaPath(cx, cy - th * 0.5, w * 1.02, h * 1.02)); g.restore();
  }
  g.translate(cx, cy + dy); g.scale(sc, sc); g.translate(-cx, -cy);
  const top = komaPath(cx, cy - th * 0.5, w, h);
  if (!ghost) {                                                       // thân dày theo bậc
    const body = m.kind === 'wood' ? shade(m.face, 0.55) : m.kind === 'gold' ? '#22160E' : shade(m.face, 0.5);
    g.fillStyle = body;
    for (let q = th; q > 0; q -= mini ? 2 : 1) { g.save(); g.translate(q * 0.25, q); g.fill(top); g.restore(); }
    if (m.kind === 'gold') { g.save(); g.translate(th * 0.25, th); g.strokeStyle = 'rgba(217,180,90,0.7)'; g.lineWidth = 1; g.stroke(top); g.restore(); }
  }
  g.save();
  if (m.kind === 'gold') { const gf = g.createLinearGradient(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2);
    gf.addColorStop(0, '#FFF3C4'); gf.addColorStop(0.2, shade(m.face, 1.1)); gf.addColorStop(0.46, shade(m.face, 0.72)); gf.addColorStop(0.62, shade(m.face, 1.05));
    gf.addColorStop(0.86, shade(m.face, 0.6)); gf.addColorStop(1, shade(m.face, 0.48)); g.fillStyle = gf; } else g.fillStyle = m.face;
  g.fill(top); g.clip(top);
  if (!mini && m.kind === 'wood') {                                   // thớ 柘植 rất mịn
    for (let i = 0; i < 14; i++) { const gx = cx - w / 2 + hash(seed * 7.1 + i) * w, a = 0.05 + hash(seed + i * 3.3) * 0.08;
      g.strokeStyle = `rgba(90,52,18,${a})`; g.lineWidth = (0.8 + hash(i + seed) * 1.2) * Math.min(1, s / 100); g.beginPath(); g.moveTo(gx, cy - h); g.bezierCurveTo(gx + s * 0.04, cy - h / 3, gx - s * 0.035, cy + h / 3, gx + s * 0.02, cy + h); g.stroke(); }
  } else if (!mini && m.kind === 'gold') {                            // tờ 金箔 vuông, mép nối
    const q = s * 0.3;
    for (let i = -2; i < 4; i++) for (let j = -2; j < 4; j++) { const hv = hash(i * 13.1 + j * 7.7 + seed);
      g.fillStyle = hv > 0.5 ? `rgba(255,246,206,${(hv - 0.5) * 0.4})` : `rgba(110,72,16,${(0.5 - hv) * 0.22})`; g.fillRect(cx - w / 2 + i * q, cy - h / 2 + j * q, q, q);
      g.strokeStyle = 'rgba(120,82,24,0.28)'; g.lineWidth = 0.8; g.strokeRect(cx - w / 2 + i * q, cy - h / 2 + j * q, q, q); }
  }
  const lt = g.createLinearGradient(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2);   // nắng xiên + bóng sơn
  if (m.kind === 'wood') { lt.addColorStop(0, 'rgba(255,250,232,0.22)'); lt.addColorStop(1, 'rgba(60,30,8,0.16)'); }
  else { lt.addColorStop(0, 'rgba(255,248,226,0.30)'); lt.addColorStop(0.32, 'rgba(255,248,226,0.04)'); lt.addColorStop(0.36, 'rgba(255,248,226,0.10)'); lt.addColorStop(0.42, 'rgba(255,248,226,0)'); lt.addColorStop(1, 'rgba(0,0,0,0.22)'); }
  g.fillStyle = lt; g.fillRect(cx - w, cy - h, 2 * w, 2 * h);
  if (m.stripes && !mini) {                                           // 2048 → 65536: 0–5 vạch hoa văn ở đáy (khắc mực)
    const y0 = cy - th * 0.5 + h / 2 - h * 0.075, sp = h * 0.036;
    g.strokeStyle = 'rgba(40,24,6,0.62)'; g.lineWidth = Math.max(1, s * 0.011);
    for (let i = 0; i < m.stripes; i++) { const yy = y0 - i * sp, half = w * 0.36; g.beginPath(); g.moveTo(cx - half, yy); g.lineTo(cx + half, yy); g.stroke(); }
    g.fillStyle = 'rgba(255,246,210,0.55)';
    for (let i = 0; i < m.stripes; i++) g.fillRect(cx - w * 0.36, y0 - i * sp + Math.max(1, s * 0.011) * 0.6, w * 0.72, 0.8);
  }
  g.restore();
  g.lineJoin = 'round'; g.strokeStyle = 'rgba(255,244,214,0.45)'; g.lineWidth = Math.max(0.8, Math.min(1.2, s / 100)); g.stroke(top);   // mép vát sáng
  if (m.rim === '512') { g.strokeStyle = C.gold; g.lineWidth = Math.max(1, s * 0.014); g.stroke(komaPath(cx, cy - th * 0.5 + h * 0.015, w * 0.92, h * 0.91)); }
  if (m.rim === '131072') { g.strokeStyle = C.gold; g.lineWidth = Math.max(1.2, s * 0.026); g.stroke(komaPath(cx, cy - th * 0.5 + h * 0.015, w * 0.91, h * 0.9)); }
  if (dim > 0) { g.fillStyle = `rgba(14,10,6,${0.55 * clamp(dim)})`; g.fill(top); }
  let ty = cy - th * 0.5 + h * 0.13;
  if (ns) {
    g.save(); g.font = `700 ${ns.fs}px ${MIN}`; g.translate(cx, ty); g.scale(ns.sx, 1); g.textAlign = 'center'; g.textBaseline = 'middle';
    if (!ghost && m.kind !== 'lac') { g.fillStyle = 'rgba(255,246,220,0.5)'; g.fillText(txt, 0.9, 1.2); }                  // mép rãnh khắc bắt sáng
    g.fillStyle = ghost ? C.goldLt : m.num; g.fillText(txt, 0, 0); g.restore();
  }
  g.restore();
  if (ghost) { g.save(); g.setLineDash([s * 0.045, s * 0.035]); g.strokeStyle = C.goldLt; g.lineWidth = Math.max(1.5, s * 0.011); g.stroke(komaPath(cx, cy + dy - th * 0.5, w + s * 0.06, h + s * 0.06)); g.restore(); }
  if (luck) {                                                         // viền 浅葱: quân của 運
    g.save(); g.translate(cx, cy + dy); g.scale(sc, sc); g.translate(-cx, -cy);
    g.strokeStyle = ASAGI.fill; g.lineWidth = Math.max(2, s * 0.035); g.lineJoin = 'round'; g.stroke(komaPath(cx, cy - th * 0.5, w + s * 0.07, h + s * 0.07));
    g.restore();
  }
  return { th, ty: ty + dy, fs: ns?.fs ?? 0 };
}

// ═════════════════════════ 盤 榧 ═════════════════════════
/**
 * Bàn gỗ n×n (4 = bàn 2048, 9 = 将棋) góc trên-trái (x, y), mặt S. k: 0–0.45 bàn hạ xuống, 0.35–1 kẻ đường mực (dọc rồi ngang).
 * gridV / gridH (0..1) ghi đè tiến độ kẻ từng chiều (a0: 縦 rồi 横). hl [r,c] hoặc [[r,c]…] = ô sáng 浅葱 (chỗ 運 sắp rơi).
 * Trả về { x, y, S, ox, oy, cs, ctr(r, c) → [x, y] }.
 */
export function ban(g, x, y, S, k = 1, { n = 4, thick: T = S * 0.08, legs = true, seed = 1, gridV = null, gridH = null, hl = null, shadow = true } = {}) {
  const m = S * 0.045, cs = (S - 2 * m) / n, ox = x + m, oy = y + m, ctr = (r, c) => [ox + c * cs + cs / 2, oy + r * cs + cs / 2];
  const G = { x, y, S, ox, oy, cs, ctr };
  if (k <= 0) return G;
  const kb = outCubic(clamp(k / 0.45)), dy = -(1 - kb) * Math.min(60, S * 0.1);
  g.save(); g.translate(0, dy);
  if (shadow) { g.save(); g.shadowColor = `rgba(8,5,2,${0.62 * kb})`; g.shadowBlur = S * 0.07; g.shadowOffsetX = S * 0.03; g.shadowOffsetY = S * 0.05 - dy;
    g.fillStyle = '#7A5424'; g.fillRect(x, y, S, S + T); g.restore(); }
  if (legs) { g.fillStyle = '#3A2410'; const lw = S * 0.14, lh = T * 0.6; for (const lx of [x + S * 0.09, x + S * 0.77]) g.fillRect(lx, y + S + T - 2, lw, lh); }
  const side = g.createLinearGradient(0, y + S, 0, y + S + T); side.addColorStop(0, '#B07C35'); side.addColorStop(0.15, '#94652A'); side.addColorStop(1, '#5E3E17');
  g.fillStyle = side; g.fillRect(x, y + S, S, T);
  if (T > 12) { g.fillStyle = 'rgba(70,44,14,0.35)'; for (let i = 0; i < 9; i++) g.fillRect(x, y + S + 3 + i * T / 9, S, 0.8); }
  g.drawImage(KAYA, (seed * 97) % 120, (seed * 61) % 120, 780, 780, x, y, S, S);
  const lt = g.createLinearGradient(x, y, x + S, y + S); lt.addColorStop(0, 'rgba(255,244,214,0.20)'); lt.addColorStop(0.6, 'rgba(255,244,214,0)'); lt.addColorStop(1, 'rgba(60,32,6,0.18)');
  g.fillStyle = lt; g.fillRect(x, y, S, S);
  g.strokeStyle = 'rgba(255,240,200,0.55)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y + S); g.lineTo(x, y); g.lineTo(x + S, y); g.stroke();
  // đường kẻ 墨 nổi (太刀盛り): mỗi đường vẽ dần theo chiều dài, lệch nhau
  const kv = gridV ?? clamp((k - 0.35) / 0.65), kh = gridH ?? clamp((k - 0.35) / 0.65), lw = Math.max(1.2, S * 0.0042) * (n === 9 ? 0.8 : 1);
  const L = n * cs, line = (i, vert, kk, dx, dy2, col, w) => {
    const e = outCubic(clamp(kk * 1.6 - i / (n + 1) * 0.6)); if (e <= 0) return;
    g.strokeStyle = col; g.lineWidth = w; g.beginPath();
    if (vert) { g.moveTo(ox + i * cs + dx, oy + dy2); g.lineTo(ox + i * cs + dx, oy + L * e + dy2); } else { g.moveTo(ox + dx, oy + i * cs + dy2); g.lineTo(ox + L * e + dx, oy + i * cs + dy2); }
    g.stroke();
  };
  for (const [dx, dd, col, w] of [[0.9, 1.1, 'rgba(255,236,190,0.55)', lw], [0, 0, C.sumi, lw]])
    for (let i = 0; i <= n; i++) { line(i, true, kv, dx, dd, col, w); line(i, false, kh, dx, dd, col, w); }
  if (kv >= 1 && kh >= 1) {
    g.strokeStyle = C.sumi; g.lineWidth = lw * 2.2; g.strokeRect(ox - lw * 2, oy - lw * 2, L + lw * 4, L + lw * 4);
    g.fillStyle = C.sumi; const stars = n === 4 ? [[2, 2]] : n === 9 ? [[3, 3], [3, 6], [6, 3], [6, 6]] : [];
    for (const [a, b] of stars) { g.beginPath(); g.arc(ox + b * cs, oy + a * cs, Math.max(2, S * (n === 9 ? 0.006 : 0.008)), 0, TAU); g.fill(); }
  }
  for (const [r, c] of hl == null ? [] : Array.isArray(hl[0]) ? hl : [hl]) {     // ô 浅葱: một ô [r,c] hoặc danh sách
    g.fillStyle = 'rgba(58,165,181,0.30)'; g.fillRect(ox + c * cs + 2, oy + r * cs + 2, cs - 4, cs - 4);
    g.strokeStyle = ASAGI.fill; g.lineWidth = Math.max(2, cs * 0.03); g.setLineDash([cs * 0.06, cs * 0.045]); g.strokeRect(ox + c * cs + 3, oy + r * cs + 3, cs - 6, cs - 6); g.setLineDash([]); }
  g.restore();
  return G;
}
const pieceSeed = (r, c, seed) => r * 4 + c + seed * 17;
/**
 * Một trạng thái 4×4: bàn + quân. k: 0–0.6 bàn (như ban), 0.45–1 quân rơi lần lượt theo thứ tự đọc.
 * opts: numbers (false cho bàn mini), luck [[r,c]…] quân viền 浅葱, dim [[r,c]…] quân bị nhốt, hl [r,c] ô 浅葱 trống,
 * chev [[[r,c],[r,c]]…] mũi vàng nhỏ trên đường kẻ (gộp chảy về góc) + kChev, mọi opts của ban. Trả về hình học ban.
 */
export function board(g, cells, x, y, S, k = 1, { numbers = true, luck = [], dim = [], chev = null, kChev = 1, seed = 1, ...bo } = {}) {
  const G = ban(g, x, y, S, clamp(k / 0.6), { seed, ...bo });
  const kp = clamp((k - 0.45) / 0.55); if (kp <= 0) return G;
  const has = (L, r, c) => L.some(([a, b]) => a === r && b === c);
  const list = []; cells.forEach((row, r) => row.forEach((v, c) => { if (v) list.push([r, c, v]); }));
  list.forEach(([r, c, v], i) => {
    const kk = clamp((kp - i / list.length * 0.6) / 0.4);
    koma(g, v, ...G.ctr(r, c), G.cs, kk, { numbers, luck: has(luck, r, c), dim: has(dim, r, c) ? 1 : 0, seed: pieceSeed(r, c, seed) });
  });
  if (chev && kChev > 0) chevrons(g, G, chev, kChev);
  return G;
}
/** Mũi vàng nhỏ trên đường kẻ giữa hai ô (gộp chảy về góc); k lộ lần lượt theo thứ tự danh sách. */
export function chevrons(g, G, list, k = 1) {
  list.forEach(([a, b], i) => {
    const kk = clamp(k * list.length - i); if (kk <= 0) return;
    const [ax, ay] = G.ctr(...a), [bx, by] = G.ctr(...b), mx = (ax + bx) / 2, my = (ay + by) / 2, an = Math.atan2(by - ay, bx - ax), z = G.cs * 0.085 * outBack(kk);
    g.save(); g.translate(mx, my); g.rotate(an); g.beginPath(); g.moveTo(z, 0); g.lineTo(-z * 0.7, -z * 0.85); g.lineTo(-z * 0.7, z * 0.85); g.closePath();
    g.fillStyle = C.goldLt; g.fill(); g.strokeStyle = C.sumi; g.lineWidth = Math.max(1, G.cs * 0.011); g.stroke(); g.restore();
  });
}
/**
 * Một lượt vuốt CÓ HÌNH: quân trượt từ `from` theo dir (k 0–0.6), quân gộp bật thành giá trị mới (0.6–0.85).
 * spawn = { at, v, k } → quân mới rơi (viền 浅葱). Mọi opts của board. Trả về { res (slide), G }.
 * Tiếng: koma ở mốc bắt đầu vuốt; gộp → chip/snap (bậc gỗ), suzu (bậc 漆), shimmer (bậc 金) ở +0.6·dur.
 */
export function boardMove(g, from, dir, x, y, S, k = 1, { spawn: sp = null, numbers = true, seed = 1, luck = [], ...bo } = {}) {
  const res = slide(from, dir), G = ban(g, x, y, S, 1, { seed, ...bo });
  const e = smooth(clamp(k / 0.6)), kb = clamp((k - 0.6) / 0.25);
  const items = [];
  const mergedAt = new Set(res.merges.map(m => m.at.join()));
  for (const mv of res.moves) {
    const [ax, ay] = G.ctr(...mv.from), [bx, by] = G.ctr(...mv.to);
    if (mv.merge && kb > 0) continue;                                 // sau khi chạm: vẽ quân đã gộp
    items.push({ x: ax + (bx - ax) * e, y: ay + (by - ay) * e, v: mv.v, r: mv.to[0], c: mv.to[1] });
  }
  if (kb > 0) for (const m of res.merges) { const [cx, cy] = G.ctr(...m.at); items.push({ x: cx, y: cy, v: m.v, r: m.at[0], c: m.at[1], pop: kb }); }
  items.sort((a, b) => a.y - b.y || a.x - b.x);
  for (const it of items) {
    const isLuck = luck.some(([a, b]) => a === it.r && b === it.c) && !mergedAt.has(it.r + ',' + it.c);
    if (it.pop != null) { const s = 1 + 0.16 * Math.sin(Math.PI * clamp(it.pop)); g.save(); g.translate(it.x, it.y); g.scale(s, s); g.translate(-it.x, -it.y);
      koma(g, it.v, it.x, it.y, G.cs, 1, { numbers, seed: pieceSeed(it.r, it.c, seed) }); g.restore(); }
    else koma(g, it.v, it.x, it.y, G.cs, 1, { numbers, luck: isLuck, seed: pieceSeed(it.r, it.c, seed) });
  }
  if (sp && sp.k > 0) koma(g, sp.v, ...G.ctr(...sp.at), G.cs, sp.k, { numbers, luck: true, seed: 99 });
  return { res, G };
}
/** 駒台: bệ gỗ cùng chất bàn, có chân; k: trồi lên từ dưới. Trả về { x, y, w, h } mặt khay. */
export function komadai(g, x, y, w, h, k = 1, { thick: T = 34 } = {}) {
  const box = { x, y, w, h };
  if (k <= 0) return box;
  const dy = (1 - outCubic(clamp(k))) * (H - y + 60);
  g.save(); g.translate(0, dy);
  g.save(); g.shadowColor = 'rgba(8,5,2,0.6)'; g.shadowBlur = 30; g.shadowOffsetX = 10; g.shadowOffsetY = 16; g.fillStyle = '#7A5424'; g.fillRect(x, y, w, h + T); g.restore();
  g.fillStyle = '#3A2410'; for (const lx of [x + w * 0.07, x + w * 0.79]) g.fillRect(lx, y + h + T - 2, w * 0.14, 18);
  const side = g.createLinearGradient(0, y + h, 0, y + h + T); side.addColorStop(0, '#A87434'); side.addColorStop(1, '#5A3B16'); g.fillStyle = side; g.fillRect(x, y + h, w, T);
  g.drawImage(KAYA, 300, 400, Math.min(560, w * 1.2), Math.min(480, h * 1.2), x, y, w, h);
  g.strokeStyle = 'rgba(80,48,14,0.6)'; g.lineWidth = 3; g.strokeRect(x + 12, y + 12, w - 24, h - 24);
  g.strokeStyle = 'rgba(255,240,200,0.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y); g.lineTo(x + w, y); g.stroke();
  g.restore();
  return box;
}

// ═════════════════════════ giấy: 棋譜, 短冊 ═════════════════════════
function washi(g, x, y, w, h, seed = 0) {
  g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 24; g.shadowOffsetX = 6; g.shadowOffsetY = 10; g.fillStyle = C.paper; g.fillRect(x, y, w, h); g.restore();
  const sx = (seed * 131) % Math.max(1, WASHI.width - w), sy = (seed * 71) % Math.max(1, WASHI.height - h);
  g.drawImage(WASHI, sx, sy, Math.min(w, WASHI.width), Math.min(h, WASHI.height), x, y, w, h);
  const lt = g.createLinearGradient(x, y, x + w, y + h); lt.addColorStop(0, 'rgba(255,252,240,0.25)'); lt.addColorStop(1, 'rgba(80,60,30,0.10)'); g.fillStyle = lt; g.fillRect(x, y, w, h);
}
/**
 * Tờ 棋譜 和紙 (x, y, w, h). k: trượt vào từ phải, nắn thẳng (như lật 棋譜). rules = kẻ cột dọc mờ (giấy 棋譜).
 * Chữ / bàn trên tờ VẼ TRONG content(box) (gọi trong phép dời của tờ — §89). Chữ: on: 'paper'. Trả về { x, y, w, h, ix, iy, iw, ih }.
 */
export function kifu(g, x, y, w, h, k = 1, { rules = false, seed = 1, content = null } = {}) {
  const box = { x, y, w, h, ix: x + 44, iy: y + 44, iw: w - 88, ih: h - 88 };
  if (k <= 0) return box;
  const e = outCubic(clamp(k)), dx = Math.round((1 - e) * (W - x + 80)), rot = (1 - e) * 0.05;
  g.save(); g.translate(x + w / 2 + dx, y + h / 2); g.rotate(rot); g.translate(-w / 2 - x, -h / 2 - y);
  washi(g, x, y, w, h, seed);
  if (rules) { g.strokeStyle = 'rgba(120,96,60,0.22)'; g.lineWidth = 1; for (let cx = x + w - 60; cx > x + 30; cx -= 64) { g.beginPath(); g.moveTo(cx + 0.5, y + 30); g.lineTo(cx + 0.5, y + h - 30); g.stroke(); } }
  if (content) content(box);
  g.restore();
  return box;
}
const ringNum = (g, n, x, y, r) => {                    // số ①②③ trên giấy: vòng mực + số 明朝
  g.save(); g.strokeStyle = C.sumi; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
  g.fillStyle = C.sumi; g.font = `700 ${Math.max(28, Math.round(r * 1.25))}px ${MIN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), x, y + 2); g.restore();
};
/**
 * 短冊 treo (x = tâm, y = đỉnh, w × h): dây treo + giấy dọc, số ①②③ ở đầu, chữ dọc. k: hạ xuống + đung đưa tắt dần.
 * kText 0..1 viết chữ (mặc định = k). flip 0..1: lật ngang sang mặt sau (back = câu trả lời, まとめ). size chữ ≥ 28.
 */
export function tanzaku(g, x, y, w, h, k = 1, { n = 0, text = '', back = '', kText = null, kBack = 1, flip = 0, size = 40, seed = 1 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), dy = -(1 - e) * (y + h + 40), sw = (1 - clamp(k)) * 0.12 * Math.sin(k * 9);
  const sx = Math.cos(Math.PI * clamp(flip)), showBack = flip > 0.5;
  g.save(); g.translate(x, y + dy - 70); g.rotate(sw); g.translate(-x, -(y - 70));
  g.strokeStyle = 'rgba(200,170,110,0.85)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 70); g.lineTo(x, y); g.stroke();   // 紐
  g.translate(x, 0); g.scale(Math.max(0.02, Math.abs(sx)), 1); g.translate(-x, 0);
  washi(g, x - w / 2, y, w, h, seed);
  g.fillStyle = 'rgba(217,180,90,0.5)'; for (let i = 0; i < 18; i++) g.fillRect(x - w / 2 + hash(i * 3.3 + seed) * (w - 6), y + hash(i * 5.1 + seed) * 70, 3 + hash(i) * 4, 2 + hash(i * 2) * 3);   // 金砂子 đầu giấy
  g.strokeStyle = 'rgba(138,102,36,0.5)'; g.lineWidth = 1; g.strokeRect(x - w / 2 + 6.5, y + 6.5, w - 13, h - 13);
  if (!showBack) {
    if (n) ringNum(g, n, x, y + 46, 22);
    vtext(g, text, x, y + (n ? 88 : 40), kText ?? clamp(k * 1.4 - 0.4), { size, on: 'paper' });
  } else vtext(g, back, x, y + 40, kBack, { size, on: 'paper' });
  g.restore();
}

// ═════════════════════════ may rủi: đồng xu, cây ═════════════════════════
/** 寛永通宝 gỉ 浅葱 — đồng xu của 運. k: bật ra; tilt (dẹt dọc, nằm nghiêng); spin (rad: xoay quanh trục đứng). */
export function coin(g, cx, cy, R, k = 1, { tilt = 1, spin = 0 } = {}) {
  if (k <= 0) return;
  const s = outBack(clamp(k)), sx = Math.max(0.06, Math.abs(Math.cos(spin)));
  g.save(); g.translate(cx, cy); g.scale(s * sx, s * tilt);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.arc(4, 6, R, 0, TAU); g.fill();
  const rimC = g.createLinearGradient(-R, -R, R, R); rimC.addColorStop(0, '#9FE0E6'); rimC.addColorStop(0.45, ASAGI.fill); rimC.addColorStop(1, '#1A5A64');
  g.fillStyle = rimC; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fill();
  g.fillStyle = '#2C8E9C'; g.beginPath(); g.arc(0, 0, R * 0.86, 0, TAU); g.fill();
  for (let i = 0; i < 40; i++) { const a = hash(i * 2.3) * 7, rr = hash(i * 4.1) * R * 0.85; g.fillStyle = hash(i) > 0.5 ? 'rgba(190,240,236,0.25)' : 'rgba(10,50,56,0.25)'; g.beginPath(); g.arc(rr * Math.cos(a), rr * Math.sin(a), Math.max(0.5, (1 + hash(i * 7) * 2.2) * R / 50), 0, TAU); g.fill(); }
  const hs = R * 0.3; g.fillStyle = '#0F2A2E'; g.fillRect(-hs, -hs, 2 * hs, 2 * hs);
  g.strokeStyle = '#8ED6DD'; g.lineWidth = Math.max(1.2, R * 0.05); g.strokeRect(-hs - R * 0.06, -hs - R * 0.06, 2 * hs + R * 0.12, 2 * hs + R * 0.12);
  g.strokeStyle = 'rgba(220,250,250,0.7)'; g.lineWidth = R * 0.07; g.beginPath(); g.arc(0, 0, R * 0.93, -2.6, -1.3); g.stroke();
  g.restore();
}
/**
 * Cây trò chơi (棋譜 trên 和紙): gốc ở (x, y), mỗi tầng sang phải dx, lá cách nhau dy. Nút:
 *  { type: 'board', cells, hl? } bàn mini · { type: 'me', dir } quân mũi tên (nút TA) · { type: 'luck' } đồng xu (nút 運) ·
 *  { type: 'dot' } chấm mực (cây lớn). Trên nút con: best (nhánh vàng), tag (nhãn trên nhánh, ≥ 28 px; dưới nút 運 = 浅葱).
 * k: lộ từng tầng. size = cỡ nút bàn / xu, meSize = cỡ quân mũi tên, chấm = min(0.12·size, 0.16·dy). numbers cho bàn mini. Trả về danh sách nút có pos [x, y] và depth.
 */
export function tree(g, root, x, y, k = 1, { dx = 300, dy = 140, size = 110, meSize = size * 0.84, numbers = false, tagSize = 28 } = {}) {
  const dotR = Math.max(4, Math.min(size * 0.06, dy * 0.1, 9));                 // chấm mực nhỏ — chấm to đen đặc nặng nề (soát a0)
  const all = []; let leaf = 0, D = 0;
  const lay = (n, d) => { n.depth = d; D = Math.max(D, d); all.push(n);
    if (n.children?.length) { n.children.forEach(c => lay(c, d + 1)); n.pos = [x + d * dx, n.children.reduce((a, c) => a + c.pos[1], 0) / n.children.length]; }
    else { n.pos = [x + d * dx, leaf * dy]; leaf++; } };
  lay(root, 0);
  const off = y - root.pos[1]; all.forEach(n => { n.pos = [n.pos[0], n.pos[1] + off]; });
  const kd = d => clamp(k * (D + 1) - d);
  const half = n => n.type === 'dot' ? dotR : n.type === 'luck' ? size * 0.42 : n.type === 'me' ? meSize * 0.45 : size / 2;
  for (const n of all) for (const c of n.children || []) {                       // nhánh trước
    const kk = kd(c.depth); if (kk <= 0) continue;
    const a = [n.pos[0] + half(n) + 6, n.pos[1]], b = [c.pos[0] - half(c) - 6, c.pos[1]], pts = curvePts(a, b);
    const w = c.best ? 5 : n.type === 'dot' ? 1.4 : 2.4, col = c.best ? C.goldDk : n.type === 'luck' ? ASAGI.paper : GREY.paper;
    brush(g, pts, kk, { w, color: col, alpha: c.best ? 0.95 : 0.7 });
    if (c.best) brush(g, pts, kk, { w: 2.2, color: C.goldLt, alpha: 0.9 });
    if (c.tag && kk >= 1) write(g, c.tag, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 12, clamp(kk), { font: `700 ${tagSize}px ${MIN}`, on: 'paper', align: 'center', color: n.type === 'luck' ? '@luck' : '@ink' });
  }
  for (const n of all) {
    const kk = kd(n.depth); if (kk <= 0) continue; const [nx, ny] = n.pos;
    if (n.type === 'board') board(g, n.cells, nx - size / 2, ny - size / 2, size, kk >= 1 ? 1 : kk, { numbers, legs: false, thick: size * 0.07, hl: n.hl ?? null, luck: n.luck ?? [], seed: (n.depth * 7 + Math.round(ny)) % 9 + 1 });
    else if (n.type === 'me') koma(g, n.best ? 2048 : 2, nx, ny, meSize, kk, { label: ARROW[n.dir], seed: n.depth * 3 + 1 });
    else if (n.type === 'luck') coin(g, nx, ny, size * 0.4, kk);
    else { g.fillStyle = C.sumi; g.globalAlpha = 0.75 * clamp(kk * 2); g.beginPath(); g.arc(nx, ny, dotR, 0, TAU); g.fill(); g.globalAlpha = 1; }
  }
  return all;
}
const SHOGI = ['香桂銀金王金銀桂香', ' 飛     角 ', '歩歩歩歩歩歩歩歩歩', '         ', '         ', '         ', '歩歩歩歩歩歩歩歩歩', ' 角     飛 ', '香桂銀金玉金銀桂香'];
/** Bàn 将棋 9×9 nhỏ (cùng gỗ 榧) xếp thế cờ đầu ván; chữ trên quân chỉ vẽ khi ≥ 28 px (bàn nhỏ: quân trơn). k như ban. */
export function shogiban(g, x, y, S, k = 1, { pieces = true, seed = 3 } = {}) {
  const G = ban(g, x, y, S, clamp(k / 0.6), { n: 9, thick: S * 0.07, seed });
  const kp = clamp((k - 0.5) / 0.5); if (!pieces || kp <= 0) return G;
  const fs = G.cs * 0.52, letters = fs >= 28;
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const ch = SHOGI[r][c]; if (ch === ' ') continue;
    const kk = clamp(kp * 2 - (r < 3 ? r : 8 - r) * 0.3); if (kk <= 0) continue;
    const [cx, cy] = G.ctr(r, c), w = G.cs * 0.72, h = G.cs * 0.84, p = komaPath(0, 0, w, h);
    g.save(); g.translate(cx, cy); if (r < 3) g.rotate(Math.PI); g.scale(outBack(kk), outBack(kk));
    g.fillStyle = 'rgba(20,10,2,0.3)'; g.save(); g.translate(2, 3); g.fill(p); g.restore();
    g.fillStyle = WOODS[1]; g.fill(p); g.strokeStyle = 'rgba(90,60,20,0.6)'; g.lineWidth = 1; g.stroke(p);
    if (letters) { g.fillStyle = C.sumi; g.font = `700 ${fs}px ${MIN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch, 0, h * 0.08); }
    g.restore();
  }
  return G;
}

// ═════════════════════════ 算盤 ═════════════════════════
/**
 * Bàn tính 算盤 (x, y góc trên-trái), cols cột, mỗi cột rod px: hiện số `value` bằng hạt (1 hạt trời = 5, 4 hạt đất = 1).
 * from + kv (0..1): hạt trượt từ số cũ sang số mới. k: trồi lên. Trả về { x, y, w, h }.
 */
export function soroban(g, x, y, value, k = 1, { cols = 7, rod = 56, from = null, kv = 1 } = {}) {
  const w = cols * rod + 40, h = rod * 3.7, box = { x, y, w, h };
  if (k <= 0) return box;
  if (!Number.isInteger(value) || value < 0 || value >= 10 ** cols) throw new Error(`soroban: ${value} không vừa ${cols} cột`);
  const dy = (1 - outCubic(clamp(k))) * 80, sl = rod * 0.38;                         // sl = chỗ một hạt
  g.save(); g.translate(0, dy);
  g.save(); g.shadowColor = 'rgba(8,5,2,0.6)'; g.shadowBlur = 20; g.shadowOffsetX = 6; g.shadowOffsetY = 10; g.fillStyle = '#2A1A0E'; g.fillRect(x, y, w, h); g.restore();
  g.fillStyle = '#1C120A'; g.fillRect(x + 12, y + 12, w - 24, h - 24);
  const top = y + 12, beam = y + 12 + sl * 2.2, bot = y + h - 12;                    // trời: 2.2 chỗ (1 hạt + khe); đất: 4 hạt + khe
  g.fillStyle = '#3A2614'; g.fillRect(x + 12, beam - 5, w - 24, 10);
  const digit = (v, i) => Math.floor(v / 10 ** (cols - 1 - i)) % 10, e = smooth(clamp(kv));
  const bead = (bx, by) => { const bw = rod * 0.42, bh = sl * 0.46; g.beginPath(); g.moveTo(bx - bw, by); g.lineTo(bx, by - bh); g.lineTo(bx + bw, by); g.lineTo(bx, by + bh); g.closePath();
    const gr = g.createLinearGradient(bx, by - bh, bx, by + bh); gr.addColorStop(0, '#9A6A3A'); gr.addColorStop(0.45, '#5E3A1C'); gr.addColorStop(1, '#2E1A0A'); g.fillStyle = gr; g.fill(); };
  for (let i = 0; i < cols; i++) {
    const bx = x + 20 + rod * (i + 0.5);
    g.strokeStyle = '#8A6A44'; g.lineWidth = 2; g.beginPath(); g.moveTo(bx, top); g.lineTo(bx, bot); g.stroke();
    const d1 = digit(value, i), d0 = from == null ? d1 : digit(from, i);
    const h5 = (d0 >= 5 ? 1 : 0) + ((d1 >= 5 ? 1 : 0) - (d0 >= 5 ? 1 : 0)) * e;     // hạt trời: 1 = hạ xuống chạm thanh (= 5)
    bead(bx, top + sl * 0.5 + h5 * (beam - 5 - top - sl));
    const n0 = d0 % 5, n1 = d1 % 5;
    for (let j = 0; j < 4; j++) {                                     // hạt đất j: j < chữ số → đẩy lên chạm thanh
      const on = (j < n0 ? 1 : 0) + ((j < n1 ? 1 : 0) - (j < n0 ? 1 : 0)) * e;
      const yUp = beam + 5 + sl * (j + 0.5), yDown = bot - sl * (3 - j + 0.5);
      bead(bx, yDown + (yUp - yDown) * on);
    }
    if ((cols - 1 - i) % 3 === 0 && i < cols - 1) { g.fillStyle = '#D9C8A0'; g.beginPath(); g.arc(bx, beam, 2.2, 0, TAU); g.fill(); }   // chấm định vị nghìn
  }
  g.restore();
  return box;
}

// ═════════════════════════ thẻ hồi ═════════════════════════
/** Mốc thẻ hồi tính từ FROM THẬT (LESSONS §82): viết từ a = max(START − 2.4, FROM + 0.95), rút đi START + 0.35 → + 0.95. */
export const actTimes = (FROM, START) => { const a = Math.max(START - 2.4, FROM + 0.95); return { a, o0: Math.max(START + 0.35, a + 1.6), o1: Math.max(START + 0.95, a + 2.2) }; };
/** Tiếng thẻ hồi (hyoshigi đúng lúc tờ vào) — cộng vào sfx() của cảnh mở hồi. */
export const actCue = (FROM, START) => ({ t: +actTimes(FROM, START).a.toFixed(3), kind: 'hyoshigi' });
/** Thẻ HỒI giữa khung: tờ 和紙 trượt vào như 棋譜, 「第n幕」 + tên hồi 明朝 lớn (ACTS[act − 1]); rút sang trái quanh START. */
export function actCard(g, t, FROM, START, act) {
  const { a, o0, o1 } = actTimes(FROM, START), [kick, title] = ACTS[act - 1];
  if (t < a - 0.05 || t > o1) return;
  const tw = measure(g, title, `700 84px ${MIN}`, 6), w = Math.max(900, tw + 200), h = 330, x = (W - w) / 2, y = 330;
  const kin = outCubic(prog(t, a - 0.05, a + 0.4)), kout = outCubic(prog(t, o0, o1));
  const dx = Math.round((1 - kin) * (W - x + 60) - kout * (x + w + 80));
  g.save(); g.translate(dx, 0); g.translate(W / 2, y + h / 2); g.rotate((1 - kin) * 0.04 - kout * 0.03); g.translate(-W / 2, -(y + h / 2));
  washi(g, x, y, w, h, act);
  g.strokeStyle = 'rgba(23,17,12,0.55)'; g.lineWidth = 1.2; g.strokeRect(x + 22.5, y + 22.5, w - 45, h - 45);
  write(g, kick, W / 2, y + 100, prog(t, a + 0.2, a + 0.55), { font: `700 40px ${MIN}`, on: 'paper', align: 'center', ls: 16 });
  write(g, title, W / 2, y + 232, prog(t, a + 0.5, a + 1.3), { font: `700 84px ${MIN}`, on: 'paper', align: 'center', ls: 6 });
  g.restore();
}

// ═════════════════════════ nhân vật ═════════════════════════
// crop = phần trên của ảnh được giữ (assets/character-v2/crop.js). MIỆNG NÓI: truyền { t } → miệng mở theo lời đọc khi đã
// đứng hẳn (k ≥ 0.95). Trang gọi setTalk(data/<part>.mouth.json); chưa có tệp → mascot im. Tư thế chưa đo → ném lỗi.
const IM = {}, SIL = {}, TINT = {};
let ENV = null, PHONE_MASK = null;
export function setTalk(json) { ENV = makeEnv(json); }
function prepPose(key) {                              // một lần lúc nạp: ám ấm nắng phòng + bóng chéo nhẹ + bóng mờ (filter chỉ ở đây)
  const im = IM[key];
  const t = mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop';
  tx.fillStyle = 'rgba(255,212,150,0.06)'; tx.fillRect(0, 0, im.width, im.height);
  const gr = tx.createLinearGradient(0, 0, im.width, im.height * 0.7); gr.addColorStop(0.5, 'rgba(30,16,4,0)'); gr.addColorStop(1, 'rgba(30,16,4,0.24)');
  tx.fillStyle = gr; tx.fillRect(0, 0, im.width, im.height); TINT[key] = t;
  const s = mk(im.width, im.height), sx = s.getContext('2d'); sx.filter = 'blur(14px)'; sx.drawImage(im, 0, 0); sx.filter = 'none';
  sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#000000'; sx.fillRect(0, 0, im.width, im.height); SIL[key] = s;
}
/** Mascot: cx tâm ảnh, foot đáy (chân / mép cắt), h chiều cao hiển thị; k = trồi lên + bật (không fade). Trả về { x, y, w, h, s, pose }. */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return null;
  const key = 'pose-' + pose, im = TINT[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.38; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 22, y0 + 14, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h, s, pose, flip };
}
// màn điện thoại của tư thế phone (lab banjo): tứ giác màn trong ảnh gốc — TL, TR, BL
const PQ = [[137, 370], [260, 367], [155, 637]], PBOX = [110, 340, 320, 680];
function makePhoneMask(im) {
  const c = mk(im.width, im.height), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
  const src = x.getImageData(0, 0, im.width, im.height), [bx0, by0, bx1, by1] = PBOX, m = mk(bx1 - bx0, by1 - by0), mx = m.getContext('2d'), md = mx.createImageData(m.width, m.height);
  const [a, b, d] = PQ, ux = [b[0] - a[0], b[1] - a[1]], vy = [d[0] - a[0], d[1] - a[1]], det = ux[0] * vy[1] - ux[1] * vy[0];
  for (let py = by0; py < by1; py++) for (let px = bx0; px < bx1; px++) {
    const u = ((px - a[0]) * vy[1] - (py - a[1]) * vy[0]) / det, v = (ux[0] * (py - a[1]) - ux[1] * (px - a[0])) / det;
    const k = (py * im.width + px) * 4, r = src.data[k], gg = src.data[k + 1], bb = src.data[k + 2];
    if (u > 0.02 && u < 1.0 && v > 0.01 && v < 0.99 && bb > 180 && r > 170 && bb >= r - 8 && Math.abs(r - gg) < 22) md.data[((py - by0) * m.width + (px - bx0)) * 4 + 3] = 255;
  }
  mx.putImageData(md, 0, 0); return m;
}
/** Bàn mini trên màn điện thoại của figure('phone', …) — F = giá trị trả về của figure. cells đổi theo t được (bàn chạy). */
export function phoneBoard(g, F, cells, { hl = null } = {}) {
  if (!F) return;
  if (F.pose !== 'phone' || F.flip) throw new Error('phoneBoard: chỉ cho figure("phone") không lật');
  if (!PHONE_MASK) throw new Error('phoneBoard: chưa nạp pose-phone');
  const [bx0, by0] = PBOX, s = F.s, c = mk(PHONE_MASK.width * s, PHONE_MASK.height * s), x = c.getContext('2d');
  const [a, b, d] = PQ;
  x.setTransform((b[0] - a[0]) / 100 * s, (b[1] - a[1]) / 100 * s, (d[0] - a[0]) / 220 * s, (d[1] - a[1]) / 220 * s, (a[0] - bx0) * s, (a[1] - by0) * s);
  x.fillStyle = '#1D1812'; x.fillRect(-5, -5, 115, 235);
  board(x, cells, 8, 58, 88, 1, { numbers: false, legs: false, thick: 4, shadow: false, hl });
  x.fillStyle = 'rgba(242,235,221,0.75)'; x.fillRect(14, 26, 46, 6); x.fillStyle = 'rgba(242,235,221,0.35)'; x.fillRect(14, 38, 30, 4); x.fillRect(14, 168, 76, 4); x.fillRect(14, 178, 52, 4);
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'destination-in'; x.drawImage(PHONE_MASK, 0, 0, c.width, c.height);
  g.drawImage(c, F.x + bx0 * s, F.y + by0 * s);
}

// ═════════════════════════ nạp ═════════════════════════
export async function loadKit(images) {
  TATAMI = makeTatami(); KAYA = makeKaya(); WASHI = makeWashi(); SUN = makeSun();
  await loadImages(images, IM);
  for (const key of Object.keys(images)) if (key.startsWith('pose-')) { prepPose(key); if (key === 'pose-phone') PHONE_MASK = makePhoneMask(IM[key]); }
}
export const ERA = { banjo: { bg: C.tatami, ink: C.gofun, accent: C.gold, dim: C.gofunDim } };
