// Đồ nghề DNA "LCD" của zero-power (DNA.md; khung mẫu tools/lab/lcd.html). Cả video sống TRONG kính LCD xám-xanh của
// một máy tính cầm tay chung chung: số = 7 đoạn vẽ path (đoạn tắt hiện mờ), chữ = ma trận điểm 5×7 vẽ tay, ảnh = điểm
// ảnh của màn đồ thị. KHÔNG font hệ thống nào trên màn (font trang chỉ để nạp; đừng dùng fillText).
// Vẽ mực: ink(g, d => { … }) — mọi chữ/số/đường vẽ vào lớp mực d, kit in bóng lệch (đoạn LCD đổ bóng lên tấm phản quang)
// rồi in mực lên kính. Nhân vật vẽ NGOÀI ink (figure), sau mực.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kính, sprite, ảnh điểm sinh MỘT lần lúc nạp / lần đầu dùng.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { toCanvas } from '../../../engine/mascot.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { typeCues } from '../../../engine/sfx.js'; // sfx() { return typeCues(chữ, a, b) } — tiếng gõ khớp chữ hiện dần
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
/** Tiến độ 0→1 của t trong [a, b]. b < a là lỗi im lặng → ném. */
export const prog = (t, a, b) => { if (b < a) throw new Error(`prog: b < a (${a} → ${b})`); return clamp((t - a) / (b - a)); };
export const PI = Math.PI;

// ── màu: nghĩa cố định cả video (DNA §2) ──
//   ink   mực đoạn thường            one  "1" / khởi động / đúng (lam)      zero "0" (gỉ)
//   dim   giá trị phụ, chú thích     tranh chấp 0⁰ = caro điểm + ngoặc góc (checker + bracket), KHÔNG phải một màu
//   SAI   = âm bản (wrong): thanh mực đặc, chữ khoét màu kính + chỉ báo ERR — khác cả ba dấu trên
export const C = { ink: '#18211B', inkRGB: '24,33,27', one: '#0A3A86', oneRGB: '10,58,134', zero: '#7A1A10', zeroRGB: '122,26,16',
  dim: '#3E4A40', glass0: '#C4CEB6', glass1: '#B3BEA6', body: '#2A2E2C', key: '#3A3F3C', shade: '#1A221C' };
export const ERA = { lcd: { bg: C.glass0, ink: C.ink, accent: C.one, dim: C.dim } };
/** Màu "tắt" (đoạn / điểm không sáng). */
export const off = (a = 0.075) => `rgba(${C.inkRGB},${a})`;

// ── kính LCD: gradient, vệt phản chiếu, lưới điểm rất mờ, bóng viền nhựa đổ vào ──
let GLASS;
function glass() {
  const c = mk(), x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, C.glass0); gr.addColorStop(1, C.glass1);
  x.fillStyle = gr; x.fillRect(0, 0, W, H);
  const sh = x.createLinearGradient(0, 0, W, H * 0.6);
  sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.42, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,255,255,0.07)');
  sh.addColorStop(0.62, 'rgba(255,255,255,0)'); x.fillStyle = sh; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(24,33,27,0.028)';
  for (let px = 0; px < W; px += 6) x.fillRect(px, 0, 1, H);
  for (let py = 0; py < H; py += 6) x.fillRect(0, py, W, 1);
  const edges = [[0, 0, W, 26, 0, 1], [0, H - 18, W, 18, 0, -1], [0, 0, 22, H, 1, 0], [W - 22, 0, 22, H, -1, 0]];
  for (const [ex, ey, ew, eh, dx, dy] of edges) {
    const lg = dx ? x.createLinearGradient(dx > 0 ? ex : ex + ew, 0, dx > 0 ? ex + ew : ex, 0)
      : x.createLinearGradient(0, dy > 0 ? ey : ey + eh, 0, dy > 0 ? ey + eh : ey);
    lg.addColorStop(0, 'rgba(20,26,22,0.30)'); lg.addColorStop(1, 'rgba(20,26,22,0)'); x.fillStyle = lg; x.fillRect(ex, ey, ew, eh);
  }
  return c;
}
/** Nền kính. Cảnh nào cũng gọi đầu tiên trong render. */
export function ground(g) { g.drawImage(GLASS, 0, 0); }

// ── lớp mực: vẽ vào L, in bóng lệch (5, 6) α 0.13 rồi in mực ──
let L, LX, SH, SX;
/** ink(g, d => …): mọi chữ/số/đường của cảnh vẽ qua đây. Gọi được nhiều lần một khung (mỗi lần 3 lần chép toàn khung). */
export function ink(g, fn, { shadow = 0.13 } = {}) {
  LX.setTransform(1, 0, 0, 1, 0, 0); LX.globalAlpha = 1; LX.globalCompositeOperation = 'source-over'; LX.clearRect(0, 0, W, H);
  fn(LX);
  SX.globalCompositeOperation = 'source-over'; SX.clearRect(0, 0, W, H); SX.drawImage(L, 0, 0);
  SX.globalCompositeOperation = 'source-in'; SX.fillStyle = 'rgb(30,40,32)'; SX.fillRect(0, 0, W, H);
  g.save(); g.globalAlpha = shadow; g.drawImage(SH, 5, 6); g.restore();
  g.drawImage(L, 0, 0);
}

// ── chữ số 7 đoạn (a b c d e f g), nghiêng 6°, đoạn tắt hiện mờ ──
export const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg',
  E: 'afged', r: 'eg', o: 'cdeg', n: 'ceg', H: 'bcefg', L: 'def', P: 'abefg', A: 'abcefg', u: 'cde', d: 'bcdeg', b: 'cdefg',
  c: 'deg', h: 'cefg', i: 'c', t: 'defg', y: 'bcdfg', '-': 'g', X: '' };
const SK = 0.105;
function bar(d, x0, y0, x1, y1, t, h0, oy) {
  const hz = y0 === y1, gp = t * 0.3, hh = t / 2;
  const pts = hz
    ? [[x0 + gp, y0], [x0 + gp + hh, y0 - hh], [x1 - gp - hh, y0 - hh], [x1 - gp, y0], [x1 - gp - hh, y0 + hh], [x0 + gp + hh, y0 + hh]]
    : [[x0, y0 + gp], [x0 + hh, y0 + gp + hh], [x0 + hh, y1 - gp - hh], [x0, y1 - gp], [x0 - hh, y1 - gp - hh], [x0 - hh, y0 + gp + hh]];
  d.beginPath(); pts.forEach(([px, py], i) => { const X = px + (h0 - (py - oy)) * SK; i ? d.lineTo(X, py) : d.moveTo(X, py); }); d.closePath(); d.fill();
}
/**
 * Một chữ số 7 đoạn, (x, y) = góc trên trái, cao h; trả về bề rộng (h·0.5). ghost = vẽ đoạn tắt mờ;
 * half = { segs, col } tô riêng vài đoạn tắt (nét "2" đang mờ đi khi bị rút). 'X' = ô trống chỉ có bóng "8".
 */
export function seg7(d, ch, x, y, h, color = C.ink, ghost = true, half = null) {
  const w = h * 0.5, t = h * 0.13, Lx = x + t / 2, R = x + w - t / 2, T = y + t / 2, M = y + h / 2, B = y + h - t / 2;
  const S = { a: [Lx, T, R, T], g: [Lx, M, R, M], d: [Lx, B, R, B], f: [Lx, T, Lx, M], b: [R, T, R, M], e: [Lx, M, Lx, B], c: [R, M, R, B] };
  const on = SEG[ch]; if (on === undefined) throw new Error('seg7: không có ký tự ' + ch);
  for (const k of 'abcdefg') {
    if (on.includes(k)) d.fillStyle = color; else if (ghost) d.fillStyle = half && half.segs.includes(k) ? half.col : off(); else continue;
    bar(d, ...S[k], t, h, y);
  }
  return w;
}
function dp(d, x, y, h, color) { const s = h * 0.13; d.fillStyle = color; d.fillRect(x, y + h - s, s, s); return s; }
function opTimes(d, x, y, h, color) {
  const s = h * 0.34, cx = x + s / 2 + h * 0.06 + (h / 2) * SK, cy = y + h / 2, t = h * 0.1;
  d.save(); d.translate(cx, cy); d.fillStyle = color;
  for (const a of [PI / 4, -PI / 4]) { d.save(); d.rotate(a); d.fillRect(-s * 0.72, -t / 2, s * 1.44, t); d.restore(); }
  d.restore(); return s + h * 0.12;
}
function opBar(d, x, y, h, color, kind) {         // = + − ÷ bằng thanh ngang/dọc
  const w = h * 0.42, t = h * 0.1, cy = y + h / 2, k0 = (h / 2) * SK; d.fillStyle = color;
  if (kind === '=') for (const oy of [-h * 0.12, h * 0.12]) d.fillRect(x + k0 - oy * SK, cy + oy - t / 2, w, t);
  else d.fillRect(x + k0, cy - t / 2, w, t);
  if (kind === '+') d.fillRect(x + k0 + w / 2 - t / 2, cy - w / 2, t, w);
  if (kind === '÷') for (const oy of [-h * 0.2, h * 0.2]) d.fillRect(x + k0 + w / 2 - t / 2 - oy * SK, cy + oy - t / 2, t, t);
  return w;
}
/**
 * Dòng số 7 đoạn. tokens: chuỗi ('2^3=8', '^' bật/tắt số mũ) hoặc mảng { c, col, sup, ghost, half, pad }.
 * c ∈ chữ số / SEG / '×' '=' '+' '−' '÷' '.' ' '. Trả về hộp [x0, x1] từng token, .end = x cuối.
 * k (0..1) = hiện dần theo token (chữ số "bấm" vào). Đo trước: rowW(tokens, h).
 */
export function row(d, tokens, x, y, h, { k = 1, gap = 0.3, color = C.ink } = {}) {
  if (typeof tokens === 'string') tokens = parse7(tokens, color);
  const out = []; let cx = x; const n = Math.round(tokens.length * clamp(k));
  tokens.forEach((tk, i) => {
    const hh = tk.sup ? h * 0.5 : h, col = tk.col || color, show = i < n, dd = show ? d : null;
    let w;
    const run = f => { if (dd) return f(); const s = d.fillStyle; d.save(); d.globalAlpha = 0; const r = f(); d.restore(); d.fillStyle = s; return r; };
    if (tk.c === '×') { cx += h * 0.12; w = run(() => opTimes(d, cx, y, h, col)); cx += h * 0.06; }
    else if ('=+−÷'.includes(tk.c)) { cx += h * 0.16; w = run(() => opBar(d, cx, y, h, col, tk.c)); cx += h * 0.06; }
    else if (tk.c === '.') { cx -= h * 0.12; w = run(() => dp(d, cx, y, h, col)); cx -= h * 0.06; }
    else if (tk.c === ' ') w = h * 0.3;
    else w = show ? seg7(d, tk.c, cx, y, hh, col, tk.ghost !== false, tk.half || null) : run(() => seg7(d, tk.c, cx, y, hh, col, tk.ghost !== false, tk.half || null));
    out.push([cx, cx + w]); const nx = tokens[i + 1];
    cx += w + (tk.sup ? h * 0.1 : nx && nx.sup ? h * 0.2 : h * gap) + (tk.pad || 0);
  });
  out.end = cx; return out;
}
function parse7(s, color) { const out = []; let sup = false; for (const ch of s) { if (ch === '^') { sup = !sup; continue; } out.push({ c: ch === '-' ? '−' : ch, col: color, sup }); } return out; }
const MEAS = { fillStyle: '', fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, fill() {}, save() {}, restore() {}, translate() {}, rotate() {}, globalAlpha: 1 };
/** Bề rộng một dòng 7 đoạn (không tính khoảng sau token cuối). */
export const rowW = (tokens, h, o = {}) => { const r = row(MEAS, tokens, 0, 0, h, o); return r.at(-1)[1]; };

// ── ma trận điểm 5×7 (vẽ tay), ô tắt hiện mờ ──
const F = {
  A: '.###.#...##...#######...##...##...#', B: '####.#...##...#####.#...##...#####.', C: '.###.#...##....#....#....#...#.###.',
  D: '####.#...##...##...##...##...#####.', E: '######....#....####.#....#....#####', F: '######....#....####.#....#....#....',
  G: '.###.#...##....#.####...##...#.####', H: '#...##...##...#######...##...##...#', I: '.###...#....#....#....#....#...###.',
  J: '..###...#....#....#....#.#..#..##..', K: '#...##..#.#.#..##...#.#..#..#.#...#', L: '#....#....#....#....#....#....#####',
  M: '#...###.###.#.##.#.##...##...##...#', N: '#...##...###..##.#.##..###...##...#', O: '.###.#...##...##...##...##...#.###.',
  P: '####.#...##...#####.#....#....#....', Q: '.###.#...##...##...##.#.##..#..##.#', R: '####.#...##...#####.#.#..#..#.#...#',
  S: '.#####....#.....###.....#....#####.', T: '#####..#....#....#....#....#....#..', U: '#...##...##...##...##...##...#.###.',
  V: '#...##...##...##...##...#.#.#...#..', W: '#...##...##...##.#.##.#.##.#.#.#.#.', X: '#...##...#.#.#...#...#.#.#...##...#',
  Y: '#...##...#.#.#...#....#....#....#..', Z: '#####....#...#...#...#...#....#####',
  0: '.###.#...##..###.#.###..##...#.###.', 1: '..#...##....#....#....#....#...###.', 2: '.###.#...#....#...#...#...#...#####',
  3: '#####...#...#.....#.....##...#.###.', 4: '...#...##..#.#.#..#.#####...#....#.', 5: '######....####.....#....##...#.###.',
  6: '..##..#...#....####.#...##...#.###.', 7: '#####....#...#...#...#....#....#...', 8: '.###.#...##...#.###.#...##...#.###.',
  9: '.###.#...##...#.####....#...#..##..', '=': '..........#####.....#####..........', '?': '.###.#...#....#...#...#.........#..',
  '-': '...............#####...............', '−': '...............#####...............', '.': '..............................##...',
  '·': '...........##...##.................', '×': '.....#...#.#.#...#...#.#.#...#.....', '÷': '.......#.......#####.......#.......',
  '/': '....#....#...#...#...#...#....#....', '←': '.......#...#...#####.#.....#.......', '↑': '..#...###.#.#.#..#....#....#....#..',
  '↓': '..#....#....#....#..#.#.#.###...#..', '→': '.......#.....#.#####...#...#.......', '+': '.......#....#..#####..#....#.......',
  "'": '..#....#...#.......................', ' ': '...................................', ',': '.....................##....#...#...',
  ':': '......##...##.......##...##.......', '(': '...#...#...#....#....#.....#.....#.', ')': '.#.....#.....#....#....#...#...#...',
  '!': '..#....#....#....#....#.........#..', '#': '.#.#..#.#.#####.#.#.#####.#.#..#.#.', '%': '##...##..#...#...#...#...#..##...##',
  '"': '.#.#..#.#..#.#.....................', '<': '...#...#...#...#.....#.....#.....#.', '>': '.#.....#.....#.....#...#...#...#...',
  '[': '.###..#....#....#....#....#....###.', ']': '.###....#....#....#....#....#..###.', '*': '.......#..#.#.#.###.#.#.#..#.......',
  '≠': '....#...#.#####..#..#####.#...#....', '≈': '.......##.#..##.......##.#..##.....', '∑': '#####.#.....#.....#...#...#...#####', '_': '..............................#####',
};
for (const k in F) F[k] = F[k].padEnd(35, '.').slice(0, 35);
/** Bề rộng chữ ma trận điểm (runs như dm). */
export function dmW(runs, p) {
  if (typeof runs === 'string') runs = [[runs]];
  let w = 0, sup = false; for (const [s] of runs) for (const ch of s) { if (ch === '^') { sup = !sup; continue; } w += (sup ? 0.62 : 1) * p * 6; }
  return w - p;
}
/**
 * Chữ ma trận điểm. runs = chuỗi hoặc [[chuỗi, màu], …]; '^' bật/tắt số mũ (nhỏ, nâng lên). (x, y) = đỉnh hàng điểm
 * trên cùng; một ký tự cao 7p, rộng 5p, bước 6p. align left|center|right; k (0..1) = hiện dần theo ký tự (gõ vào).
 * ghost = ô tắt mờ. Trả về bề rộng. CHỮ HOA (máy tính không có chữ thường) — thiếu ký tự thì ném lỗi.
 */
export function dm(d, runs, x, y, p, color = C.ink, { align = 'left', k = 1, ghost = true } = {}) {
  if (typeof runs === 'string') runs = [[runs, color]];
  const tw = dmW(runs, p); let cx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x, sup = false;
  let total = 0; for (const [s] of runs) for (const ch of s) if (ch !== '^') total++;
  const n = Math.round(total * clamp(k)); let i = 0;
  for (const [s, col] of runs) for (const ch0 of s) {
    if (ch0 === '^') { sup = !sup; continue; }
    const ch = ch0 >= 'a' && ch0 <= 'z' ? ch0.toUpperCase() : ch0;
    const q = sup ? p * 0.62 : p, oy = sup ? y - p * 3.2 : y, gl = F[ch];
    if (!gl) throw new Error('dm: thiếu glyph ' + JSON.stringify(ch0));
    const lit = i++ < n;
    for (let j = 0; j < 35; j++) {
      const on = gl[j] === '#' && lit; if (!on && (!ghost || ch === ' ')) continue;
      d.fillStyle = on ? (col || color) : off(0.045);
      d.fillRect(cx + (j % 5) * q + (6 - ((j / 5) | 0)) * q * SK * 0.5, oy + ((j / 5) | 0) * q, q * 0.84, q * 0.84);
    }
    cx += q * 6;
  }
  return tw;
}
/** Nhiều dòng ma trận điểm, cách dòng 10p; k hiện dần cả khối. Trả về chiều cao. */
export function dmLines(d, lines, x, y, p, color = C.ink, { align = 'left', k = 1, lh = 10 } = {}) {
  const n = lines.reduce((a, l) => a + (typeof l === 'string' ? l : l.map(r => r[0]).join('')).replace(/\^/g, '').length, 0);
  let used = 0;
  lines.forEach((l, i) => {
    const len = (typeof l === 'string' ? l : l.map(r => r[0]).join('')).replace(/\^/g, '').length;
    const kk = n ? clamp((clamp(k) * n - used) / Math.max(1, len)) : 1; used += len;
    dm(d, l, x, y + i * lh * p, p, color, { align, k: kk });
  });
  return lines.length * lh * p;
}

// ── dấu hiệu của DNA ──
/** Ngoặc góc của ô tranh chấp 0⁰ (đi cùng checker). */
export function bracket(d, x0, y0, x1, y1, len = 34, t = 6, col = C.ink) {
  d.fillStyle = col;
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) {
    d.fillRect(sx > 0 ? cx : cx - len, sy > 0 ? cy : cy - t, len, t); d.fillRect(sx > 0 ? cx : cx - t, sy > 0 ? cy : cy - len, t, len);
  }
}
/** Caro điểm = ảnh chụp của nhấp nháy (tranh chấp 0⁰). */
export function checker(d, x0, y0, x1, y1, p = 6, alpha = 0.10) {
  d.fillStyle = `rgba(${C.inkRGB},${alpha})`;
  for (let yy = y0, r = 0; yy < y1; yy += p, r++) for (let xx = x0 + (r % 2) * p; xx < x1; xx += 2 * p) d.fillRect(xx, yy, p * 0.8, p * 0.8);
}
/** Ô tranh chấp 0⁰ trọn bộ: caro + ngoặc + "1?" lam + "0?" gỉ. (x, y, w, h) = ô; k vào. */
export function contested(d, x, y, w, h, k = 1, { size = Math.min(70, h * 0.48) } = {}) {
  if (k <= 0) return;
  checker(d, x + 10, y + 10, x + w - 10, y + h - 10, 6, 0.10 * clamp(k * 2));
  if (k > 0.25) bracket(d, x + 8, y + 8, x + w - 8, y + h - 8, Math.min(34, w * 0.18), 6, C.ink);
  if (k > 0.5) {
    const gap = size * 0.5 + 16 + 28, x0 = x + w / 2 - gap - size * 0.25, cy = y + (h - size) / 2 + 6;
    seg7(d, '1', x0, cy, size, C.one); dm(d, '?', x0 + size * 0.5 + 12, cy + size - 28, 4, C.one, { ghost: false });
  }
  if (k > 0.75) {
    const gap = size * 0.5 + 16 + 28, x1 = x + w / 2 + 14, cy = y + (h - size) / 2 + 6;
    seg7(d, '0', x1, cy, size, C.zero); dm(d, '?', x1 + size * 0.5 + 12, cy + size - 28, 4, C.zero, { ghost: false });
    void gap;
  }
}
/**
 * SAI = âm bản: thanh mực đặc phủ [x0, x1] × [y0, y1], chữ bên dưới bị khoét ra màu kính (xor trong lớp mực).
 * Gọi SAU khi đã vẽ chữ sai vào d. k quét từ trái sang. Bật annunciators(..., ['ERR']) ở cảnh đó.
 * Chỉ dùng cho câu SAI thật (§58 — không dùng cho câu đúng-có-điều-kiện).
 */
export function wrong(d, x0, y0, x1, y1, k = 1) {
  if (k <= 0) return;
  d.save(); d.globalCompositeOperation = 'xor'; d.fillStyle = C.ink;
  d.fillRect(x0 - 10, y0 - 8, (x1 - x0 + 20) * outCubic(clamp(k)), y1 - y0 + 16); d.restore();
}
const ANN = ['DEG', 'M', '+', '×', 'E', 'ERR'];
/** Dải chỉ báo trên cùng bên phải (y 74). lit ⊂ ANN; '×' sáng lam = thanh ghi nhân (vật xuyên suốt). */
export function annunciators(d, lit = ['×']) {
  for (const s of lit) if (!ANN.includes(s)) throw new Error('annunciators: không có ' + s);
  let x = 1824;
  for (let i = ANN.length - 1; i >= 0; i--) {
    const s = ANN[i], on = lit.includes(s), col = on ? (s === '×' ? C.one : C.ink) : off(0.11);
    const w = dm(d, s, x, 74, 4, col, { align: 'right', ghost: false }); x -= w + 34;
  }
}
/** Thẻ mục góc trên trái: "ACT II · TÊN MỤC" ma trận điểm p4 tại (96, 74); ≤ 31 ký tự (đo: 31 × 24 = 744 px, không chạm
 *  dải chỉ báo bắt đầu ở x ≈ 1310). k gõ vào. */
export function card(d, k, act, name) {
  if (k <= 0) return;
  const s = `${act} · ${name}`.toUpperCase();
  if (dmW(s, 4) > 1180) throw new Error('card: quá dài ' + s);
  dm(d, s, 96, 74, 4, C.ink, { k: k * 1.4 });
}
/** Thẻ HỒI giữa khung trong khoảng lặng mở hồi: "ACT II" (ma trận điểm p16) + tên (p8, lam) + "ANSWERS 2" (p4),
 *  gõ vào từ start−2.3, trượt lên trước start. Gọi trong ink. */
export function actTitle(d, t, start, act, sub, answers = '') {
  const out = outCubic(prog(t, start - 0.35, start + 0.25));
  if (t < start - 2.4 || out >= 1) return;
  d.save(); d.translate(0, -out * 700);
  dm(d, 'ACT ' + act, W / 2, 380, 16, C.ink, { align: 'center', k: prog(t, start - 2.3, start - 1.8) });
  dm(d, sub.toUpperCase(), W / 2, 540, 8, C.ink, { align: 'center', k: prog(t, start - 1.8, start - 1.1) });
  if (answers) dm(d, answers.toUpperCase(), W / 2, 640, 4, C.dim, { align: 'center', k: prog(t, start - 1.2, start - 0.7) });
  d.restore();
}
/** Thanh ghi nhỏ (vật xuyên suốt): khung + ký hiệu phép (+ / ×) + giá trị 7 đoạn. Trả về bề rộng khung. */
export function register(d, x, y, op, v, col, { h = 66, k = 1 } = {}) {
  if (k <= 0) return 196;
  d.strokeStyle = `rgba(${C.inkRGB},0.55)`; d.lineWidth = 3; d.strokeRect(x, y - 12, 196, h + 24);
  dm(d, op, x + 18, y + 14, 6, C.ink, { ghost: false });
  if (k > 0.4) seg7(d, String(v), x + 124, y, h, col);
  return 196;
}
/** Đường chấm điểm (lưới bảng, mũi tên đường đi). */
export function dots(d, x0, y0, x1, y1, col = `rgba(${C.inkRGB},0.42)`, { step = 8, size = 4, k = 1 } = {}) {
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.floor(L / step * clamp(k));
  d.fillStyle = col;
  for (let i = 0; i <= n; i++) { const u = i * step / (L || 1); d.fillRect(x0 + (x1 - x0) * u - size / 2, y0 + (y1 - y0) * u - size / 2, size, size); }
}
/** Đường cong điểm ảnh (đồ thị): pts = [[x, y], …] toạ độ khung, vẽ ô vuông p mỗi bước p (kiểu màn đồ thị). k vẽ dần. */
export function pixLine(d, pts, col = C.ink, { p = 6, k = 1 } = {}) {
  const seen = new Set(); d.fillStyle = col;
  const m = Math.max(1, Math.ceil((pts.length - 1) * clamp(k)));
  for (let i = 0; i < m && i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / (p * 0.5)));
    for (let j = 0; j <= n; j++) {
      const X = Math.round((x0 + (x1 - x0) * j / n) / p), Y = Math.round((y0 + (y1 - y0) * j / n) / p), key = X + ',' + Y;
      if (seen.has(key)) continue; seen.add(key); d.fillRect(X * p, Y * p, p * 0.84, p * 0.84);
    }
  }
}

// ── máy tính cầm tay chung chung (không thương hiệu): thân nhựa + màn LCD nhỏ + lưới phím ──
/**
 * Vẽ thẳng lên g (NGOÀI ink — vật thể có khối). (x, y) = góc trên trái, s = tỉ lệ (s = 1: 300 × 520).
 * screen(d, sx, sy, sw, sh) vẽ nội dung màn nhỏ (dùng seg7/dm như thường; mực in trực tiếp, không bóng). k: trồi lên.
 */
export function calculator(g, x, y, s, screen, k = 1) {
  if (k <= 0) return;
  const dy = (1 - outBack(clamp(k))) * 300, w = 300 * s, h = 520 * s;
  g.save(); g.translate(x, y + dy);
  g.fillStyle = 'rgba(15,20,17,0.35)'; g.beginPath(); g.roundRect(14 * s, 18 * s, w, h, 28 * s); g.fill();
  const bg = g.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#363B38'); bg.addColorStop(1, C.body);
  g.fillStyle = bg; g.beginPath(); g.roundRect(0, 0, w, h, 28 * s); g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.08)'; g.lineWidth = 2 * s; g.stroke();
  const sx = 26 * s, sy = 34 * s, sw = w - 52 * s, sh = 120 * s;
  g.fillStyle = '#151816'; g.beginPath(); g.roundRect(sx - 8 * s, sy - 8 * s, sw + 16 * s, sh + 16 * s, 10 * s); g.fill();
  const lg = g.createLinearGradient(0, sy, 0, sy + sh); lg.addColorStop(0, C.glass0); lg.addColorStop(1, C.glass1);
  g.fillStyle = lg; g.fillRect(sx, sy, sw, sh);
  if (screen) { g.save(); g.beginPath(); g.rect(sx, sy, sw, sh); g.clip(); screen(g, sx, sy, sw, sh); g.restore(); }
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
    const kx = 30 * s + c * 64 * s, ky = 196 * s + r * 52 * s, hot = r === 5 && c === 3;
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.roundRect(kx + 2 * s, ky + 4 * s, 50 * s, 36 * s, 8 * s); g.fill();
    g.fillStyle = hot ? '#5A6B5E' : C.key; g.beginPath(); g.roundRect(kx, ky, 50 * s, 36 * s, 8 * s); g.fill();
  }
  g.restore();
}

// ── nhân vật: hình cắt viền tối 3 px + bóng đổ lên kính; vào = trồi lên + bật (0.35 s), không fade ──
// crop = phần trên của ảnh được giữ: toàn thân ≈ 0.45 (ngang hông), khung giữa đùi 1 (assets/character-v2/POSES.md).
const IM = {}, FIG = {};
export const CROP = { idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, wave: 0.45, startled: 1,
  three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, invite: 1, notebook: 1, 'peace-back': 1, calculator: 1, pointer: 1, offer: 1 };
function sprite(pose, crop) {
  const im = IM['pose-' + pose]; if (!im) throw new Error('figure: chưa khai báo POSES ' + pose);
  const sh = Math.round(im.height * crop), p = 6, c = mk(im.width + 2 * p, sh + 2 * p), x = c.getContext('2d');
  const sil = mk(im.width, sh), sx = sil.getContext('2d'); sx.drawImage(im, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = C.shade; sx.fillRect(0, 0, im.width, sh);
  for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * PI; x.drawImage(sil, p + 3 * Math.cos(a), p + 3 * Math.sin(a)); }
  x.drawImage(im, 0, 0, im.width, sh, p, p, im.width, sh); return { c, p, sh, sil };
}
/**
 * Nhân vật, chân chạm `foot`, cao h (phần đã cắt). Trả về hàm P(ix, iy) đổi toạ độ ẢNH GỐC → khung — trả về CẢ khi
 * k ≤ 0 (LESSONS §53). Vẽ sau ink, một bên khung (cx ≤ 380 hoặc ≥ 1540).
 */
export function figure(g, pose, cx, foot, h, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  const S = (FIG[pose + crop] ??= sprite(pose, crop)), s = h / S.sh, w = S.c.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot - h - S.p * s + rise;
  const P = (ix, iy) => [flip ? cx + w / 2 - (ix + S.p) * s : x0 + (ix + S.p) * s, y0 + (iy + S.p) * s];
  if (k <= 0) return P;
  g.save(); if (flip) { g.translate(cx, 0); g.scale(-1, 1); g.translate(-cx, 0); }
  g.save(); g.globalAlpha = 0.18; g.drawImage(S.sil, x0 + S.p * s + 10, y0 + S.p * s + 12, S.sil.width * s, S.sh * s); g.restore();
  g.drawImage(S.c, x0, y0, w, S.c.height * s); g.restore();
  return P;
}
/** Màn máy tính trong ảnh pose-calculator (toạ độ ảnh cắt 1035×1448, đo 2026-10-08): góc + tâm, theo P của figure.
 *  Màn hơi nghiêng: vẽ chữ bằng setTransform theo bốn góc trả về (tl, tr, bl). */
export const CALC_SCREEN = { tl: [54, 519], tr: [179, 496], bl: [83, 590] };

// ── ảnh lịch sử = ảnh điểm của màn đồ thị: lượng tử hoá thành ô p, ô sáng = mực, ô tắt mờ; nhãn ma trận điểm ──
const PH = {};
function dotPhoto(src, h, p) {
  const w = Math.round(src.width * h / src.height), cols = Math.floor(w / p), rows = Math.floor(h / p);
  const t = mk(cols, rows), tx = t.getContext('2d', { willReadFrequently: true }); tx.drawImage(src, 0, 0, cols, rows);
  const px = tx.getImageData(0, 0, cols, rows).data, n = cols * rows, Lv = new Float32Array(n), hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) { const v = 0.3 * px[i * 4] + 0.59 * px[i * 4 + 1] + 0.11 * px[i * 4 + 2]; Lv[i] = v; hist[v | 0]++; }
  const pct = q => { let a = 0; for (let v = 0; v < 256; v++) { a += hist[v]; if (a >= q * n) return v; } return 255; };
  const lo = pct(0.03), hi = Math.max(lo + 1, pct(0.97));
  const c = mk(cols * p, rows * p), x = c.getContext('2d');
  for (let i = 0; i < n; i++) {
    const v = 1 - clamp((Lv[i] - lo) / (hi - lo)), cx = (i % cols) * p, cy = ((i / cols) | 0) * p;
    // 4 mức mực (giống màn LCD xám 2-bit): tối → mực đặc; sáng → ô tắt
    const a = v > 0.72 ? 0.92 : v > 0.48 ? 0.62 : v > 0.24 ? 0.32 : 0.06;
    x.fillStyle = `rgba(${C.inkRGB},${a})`; x.fillRect(cx, cy, p * 0.84, p * 0.84);
  }
  return c;
}
/**
 * Chân dung / hiện vật trên màn: ảnh điểm cao h (ô p = 6), khung chấm, gõ vào theo hàng từ trên (k).
 * label = { name, life, note } — ma trận điểm dưới ảnh (name p5, life/note p3). Gọi TRONG ink. Trả về { w, h }.
 */
export function portrait(d, key, x, y, h, k = 1, { p = 6, label: lb = null } = {}) {
  if (!IM[key]) throw new Error('portrait: chưa khai báo IMAGES ' + key);
  const im = (PH[key + h + p] ??= dotPhoto(IM[key], h, p)), w = im.width, hh = im.height;
  if (k <= 0) return { w, h: hh };
  const rows = Math.ceil(hh * clamp(k * 1.25) / p) * p;
  d.drawImage(im, 0, 0, w, rows, x, y, w, rows);
  d.strokeStyle = `rgba(${C.inkRGB},0.6)`; d.lineWidth = 3; d.strokeRect(x - 10, y - 10, w + 20, hh + 20);
  if (lb) {
    const kl = clamp(k * 1.4 - 0.4);
    dm(d, lb.name, x - 10, y + hh + 34, 5, C.ink, { k: kl * 1.5 });
    if (lb.life) dm(d, lb.life, x - 10, y + hh + 84, 3, C.dim, { k: kl * 2 - 0.4 });
    if (lb.note) dm(d, lb.note, x - 10, y + hh + 116, 3, C.dim, { k: kl * 2 - 0.7 });
  }
  return { w, h: hh };
}

// ── nạp: kính + lớp mực + ảnh (toCanvas: canvas CPU, tất định — LESSONS §16) ──
export async function loadKit(images) {
  GLASS = glass(); L = mk(); LX = L.getContext('2d'); SH = mk(); SX = SH.getContext('2d');
  if (rowW('2^3^=8', 100) <= 0 || dmW('AB', 4) !== 44) throw new Error('kit: đo chữ sai');
  await Promise.all(Object.entries(images).map(([k, u]) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => { IM[k] = toCanvas(im); res(); }; im.onerror = () => rej(new Error('kit: không nạp được ' + u)); im.src = u;
  })));
}

// ── tra mốc theo chữ: L(i) = câu i của timeline phần này; w(i, "từ", n) = lúc bắt đầu lần thứ n của từ trong câu ──
export function lookup(tl, tag) {
  const L = i => { const l = tl.lines[i]; if (!l) throw new Error(`${tag}: không có câu ${i}`); return l; };
  const w = (i, word, n = 1) => { let c = 0; for (const x of L(i).words) if (x.w === word && ++c === n) return x.start;
    throw new Error(`${tag}: không có "${word}" (${n}) ở câu ${i}: ${L(i).text}`); };
  return { L, w };
}
/** Màn chập (iris): k = 1 mở hết, 0 đen kín; khép/mở quanh (cx, cy). r0 = bán kính lúc k = 0. Vẽ thẳng lên g. */
export function iris(g, cx, cy, k, r0 = 0) {
  if (k >= 1) return;
  const r = r0 + (2300 - r0) * Math.pow(clamp(k), 1.6);
  g.save(); g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, Math.max(0, r), 0, PI * 2, true); g.fill('evenodd'); g.restore();
}
/** Kiểm toán trên hình: tính biểu thức (÷ × − ^ được), ném lỗi nếu khác giá trị chờ. Mọi số hiện lên hình đi qua đây.
 *  CHÚ Ý: 0^0 của JS ra 1 — ô 0⁰ KHÔNG được in kết quả JS như đáp án (vẽ contested). */
export function must(expr, want) {
  const js = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**');
  let v; try { v = Function(`return (${js})`)(); } catch (e) { throw new Error(`must: không tính được "${expr}" (${e.message})`); }
  const bad = typeof want === 'number' ? Math.abs(v - want) > 1e-9 : v !== want;
  if (bad) throw new Error(`toán sai trên hình: ${expr} = ${v}, không phải ${want}`);
  return want;
}
/** Vẽ lên màn máy trong ảnh pose-calculator: P = hàm trả về của figure(…, 'calculator', …). fn(g, w, h) vẽ trong hệ
 *  toạ độ phẳng w × h (mặc định 250 × 140) đã được nắn theo màn nghiêng. Vẽ SAU figure, thẳng lên g. */
export function onCalcScreen(g, P, fn, w = 250, h = 140) {
  const [tl, tr, bl] = [P(...CALC_SCREEN.tl), P(...CALC_SCREEN.tr), P(...CALC_SCREEN.bl)];
  g.save(); g.transform((tr[0] - tl[0]) / w, (tr[1] - tl[1]) / w, (bl[0] - tl[0]) / h, (bl[1] - tl[1]) / h, tl[0], tl[1]);
  g.beginPath(); g.rect(0, 0, w, h); g.clip(); fn(g, w, h); g.restore();
}
