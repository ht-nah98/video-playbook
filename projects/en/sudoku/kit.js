// Đồ nghề chung của bài học sudoku — DNA "Glass: kính màu khung chì" (DNA.md). Lõi chép từ tools/lab/glass.html.
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// MỌI vật dùng chung giữa các cảnh ở đây (LESSONS §71, §83): lưới đã giải, câu đố, các phép tô của hồi 2/3/4, ô cửa,
// chip, lồng, mũi tên, renban, vết nứt, ô kính tròn, thẻ tên, thẻ hồi, mascot có MIỆNG NÓI (engine/talk.js).
// Mọi hàm vẽ là hàm thuần của tham số (tất định); tường, sprite bóng mascot dựng MỘT lần lúc nạp.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

// ── màu (DNA §2) ──
export const C = {
  wall: '#E4DCCD', lead: '#2C2D33', leadHi: '#6E7078', clear: '#F4F1E8', red: '#F6B39A', blue: '#82A6D9', dbl: '#7D7583',
  hole: '#EAE4D8', holeT: '#3D3833', digit: '#141218', ink: '#2A2622', dim: '#4F4A44', redT: '#9A2A18', blueT: '#1A4E8C',
  ren: '#8E5BC8', renT: '#6B37A3',
};
export const ERA = { glass: { bg: C.wall, ink: C.ink, accent: C.redT, dim: C.dim } };
export const ARC = '"Archivo"', MONO = '"IBM Plex Mono"', CG = '"Cormorant Garamond"';
/** Cỡ chữ trang nạp (p1/p2.html). Dùng cỡ khác → thêm vào đây. */
export const FONTS = ['600 120px', '600 96px', '600 72px', '600 60px', '600 52px', '600 46px', '600 42px', '600 36px', '600 30px', '600 26px', '600 22px']
  .map(f => `${f} ${ARC}`)
  .concat(['500 30px', '500 26px', '500 22px', '500 20px', '500 18px'].map(f => `${f} ${MONO}`))
  .concat(['italic 600 132px', 'italic 600 120px', 'italic 600 104px', 'italic 600 92px', 'italic 600 84px', 'italic 600 72px', 'italic 600 60px',
    'italic 600 52px', 'italic 600 44px', 'italic 600 36px', 'italic 600 32px', 'italic 600 30px', 'italic 700 28px', 'italic 700 34px']
    .map(f => `${f} ${CG}`));

const ok = (c, msg) => { if (!c) throw new Error('kit sudoku: ' + msg); };

// ── LƯỚI ĐÃ GIẢI (vật xuyên suốt) = lời giải Difference of Squares (MathGuy_12) — kiểm 27 ràng buộc lúc nạp ──
export const SOL = '572946381634851297981732564768429153459318672213567948825194736197683425346275819';
export const D = (r, c) => +SOL[r * 9 + c];                         // r, c đánh số 0
export const CELLS = [...Array(81)].map((_, i) => [(i / 9) | 0, i % 9]);
export const boxOf = (r, c) => 3 * ((r / 3) | 0) + ((c / 3) | 0);  // 0..8 (khối 1 = 0)
{ const full = a => a.slice().sort().join('') === '123456789';
  for (let i = 0; i < 9; i++) {
    ok(full([...Array(9)].map((_, k) => D(i, k))), 'hàng ' + (i + 1));
    ok(full([...Array(9)].map((_, k) => D(k, i))), 'cột ' + (i + 1));
    ok(full(CELLS.filter(([r, c]) => boxOf(r, c) === i).map(([r, c]) => D(r, c))), 'khối ' + (i + 1));
  } }
const sortedDigits = cells => cells.map(([r, c]) => D(r, c)).sort((a, b) => a - b);
const sum = cells => cells.reduce((s, [r, c]) => s + D(r, c), 0);
export { sortedDigits, sum };

// ── TÔ MÀU (đa tập kiểm bằng code) ──
/** Hồi 2 — Phistomefel: đỏ = hàng 3, 7 + khối 4, 6; xanh = cột 1, 2, 8, 9. */
export const PHI = {
  red: (r, c) => r === 2 || r === 6 || (r >= 3 && r <= 5 && (c <= 2 || c >= 6)),
  blue: (r, c) => c <= 1 || c >= 7,
};
export const RING = CELLS.filter(([r, c]) => PHI.red(r, c) && !PHI.blue(r, c));
export const CORNERS = CELLS.filter(([r, c]) => PHI.blue(r, c) && !PHI.red(r, c));
export const PHI_DBL = CELLS.filter(([r, c]) => PHI.red(r, c) && PHI.blue(r, c));
ok(RING.length === 16 && CORNERS.length === 16 && PHI_DBL.length === 20, 'đếm ô Phistomefel');
ok(sortedDigits(RING).join() === sortedDigits(CORNERS).join(), 'vòng = góc');
/** Hồi 3/4 — đỏ = 4 hàng trên; xanh = 5 cột phải. Còn lại: đỏ vuông 4×4 trái trên, xanh vuông 5×5 phải dưới. */
export const SQ = { red: (r, c) => r <= 3, blue: (r, c) => c >= 4 };
export const SQ_SMALL = CELLS.filter(([r, c]) => r <= 3 && c <= 3);     // 4×4
export const SQ_BIG = CELLS.filter(([r, c]) => r >= 4 && c >= 4);       // 5×5
export const SQ_DBL = CELLS.filter(([r, c]) => SQ.red(r, c) && SQ.blue(r, c));
ok(SQ_SMALL.length === 16 && SQ_BIG.length === 25 && SQ_DBL.length === 20, 'đếm ô vuông');
ok(sum(SQ_BIG) - sum(SQ_SMALL) === 45, 'tổng 5×5 − 4×4 = 45');
{ const a = sortedDigits(SQ_BIG), b = sortedDigits(SQ_SMALL).concat([1, 2, 3, 4, 5, 6, 7, 8, 9]).sort((x, y) => x - y); ok(a.join() === b.join(), 'đa tập 5×5 = 4×4 + {1..9}'); }

// ── CÂU ĐỐ Difference of Squares (data/difference-of-squares.sudokupad.txt) — toạ độ [hàng, cột] 0 ──
export const CAGES = [
  { v: 'x', ce: [[0, 8], [1, 8]], set: 'red' }, { v: 'y', ce: [[8, 0], [8, 1]], set: 'red' },
  { v: 'y²', ce: [[0, 3], [1, 3], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]], set: 'red' },
  { v: 'x²', ce: [[4, 4], [4, 5], [4, 6], [5, 4], [5, 5], [5, 6], [5, 7], [6, 4], [6, 5], [6, 6], [7, 5]], set: 'blue' },
  { v: 'x − y', ce: [[6, 3]] }, { v: 'x − y', ce: [[8, 7]] }, { v: '15', ce: [[6, 0], [6, 1], [6, 2]] }];
/** [vòng, thân…]; 0, 1, 2 là ba mũi tên triệt nhau ở hồi 4 (thân đỏ ↔ vòng xanh; vòng đỏ r9c9 ↔ thân xanh). */
export const ARROWS = [[[4, 7], [3, 8], [2, 8]], [[7, 4], [8, 3], [8, 2]], [[8, 8], [7, 7], [6, 7], [7, 6]],
  [[2, 6], [1, 5], [0, 4]], [[3, 3], [2, 2], [1, 1]], [[6, 2], [5, 1], [4, 0]]];
export const RENBAN = [[[1, 0], [0, 0], [0, 1]], [[0, 3], [1, 3], [2, 3]], [[3, 2], [3, 1], [3, 0]], [[0, 7], [1, 8]],
  [[3, 4], [4, 3], [4, 4]], [[7, 3], [8, 4]], [[8, 5], [7, 6]]];
export const X = sum(CAGES[0].ce), Y = sum(CAGES[1].ce);
ok(X === 8 && Y === 7, 'x = 8, y = 7');
ok(sum(CAGES[2].ce) === Y * Y && sum(CAGES[3].ce) === X * X && sum(CAGES[6].ce) === 15 && D(6, 3) === 1 && D(8, 7) === 1, 'lồng');
ARROWS.forEach(([b, ...t]) => ok(D(...b) === sum(t), 'mũi tên ' + b));
RENBAN.forEach(l => { const v = sortedDigits(l); ok(v.every((d, i) => d === v[0] + i), 'renban'); });
/** Bước hồi 4 (đa tập ô, kiểm lúc nạp): sau khi thêm cột 9 + hàng 9 vào đỏ và bỏ chung → còn lại. */
export const DOS = (() => {
  const cnt = new Map(), add = (k, s) => cnt.set(k, (cnt.get(k) || 0) + s);
  for (let r = 0; r <= 3; r++) for (let c = 0; c < 9; c++) add(r * 9 + c, 1);           // đỏ = +1
  for (let r = 0; r < 9; r++) for (let c = 4; c < 9; c++) add(r * 9 + c, -1);          // xanh = −1
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) add(r * 9 + c, -1);          // bỏ khối 1 khỏi đỏ
  for (let r = 0; r < 9; r++) add(r * 9 + 8, 1); for (let c = 0; c < 9; c++) add(72 + c, 1);   // + cột 9, + hàng 9
  const red = [], blue = [];
  for (const [k, v] of cnt) { if (v > 0) red.push([(k / 9) | 0, k % 9]); if (v < 0) blue.push([(k / 9) | 0, k % 9]); ok(Math.abs(v) <= 1, 'ô thừa ' + k); }
  const key = a => a.map(([r, c]) => r * 9 + c).sort((p, q) => p - q).join();
  const want = c => c.map(([r, c2]) => [r, c2]);
  const redWant = [...CAGES[2].ce, ...CAGES[0].ce, ...CAGES[1].ce, [3, 8], [2, 8], [8, 3], [8, 2], [8, 8]];
  const blueWant = [...CAGES[3].ce, [4, 7], [7, 4], [7, 7], [6, 7], [7, 6]];
  ok(key(red) === key(want(redWant)) && key(blue) === key(want(blueWant)), 'bước hồi 4 sai');
  ok(X * X === Y * Y + X + Y, 'phương trình');
  return { red, blue };
})();
/** Cận trên lồng y²: hai renban ≤ 7+8+9, ô r4c4 khác cả sáu số → ≤ 6. */
export const Y2_MAX = 24 + 24 + 6;
ok(Y2_MAX === 54 && Y2_MAX < 64, 'cận y²');

// ── tường giấy dó (dựng một lần) ──
let WALL;
function wall() {
  const c = mk(), x = c.getContext('2d'), d = x.createImageData(W, H), b = [0xE4, 0xDC, 0xCD];
  for (let i = 0; i < W * H; i++) {
    const px = i % W, py = (i / W) | 0, n = (hash(i * 0.731) - 0.5) * 6 + (hash(((px >> 3) + (py >> 3) * 977) * 0.37) - 0.5) * 3;
    const v = 1.03 - 0.07 * Math.hypot((px - W * 0.3) / W, (py - H * 0.15) / H);
    for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] * v + n; d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  for (let k = 0; k < 260; k++) {
    const sx = hash(k * 3.1) * W, sy = hash(k * 7.7) * H, a = hash(k * 1.3) * 6.28, l = 30 + hash(k * 5.3) * 90;
    x.strokeStyle = k % 3 ? 'rgba(255,252,244,0.2)' : 'rgba(150,135,110,0.10)'; x.lineWidth = 0.8 + hash(k * 2.9);
    x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(sx + l * 0.5 * Math.cos(a + 0.5), sy + l * 0.5 * Math.sin(a + 0.5), sx + l * Math.cos(a), sy + l * Math.sin(a)); x.stroke();
  }
  return c;
}
/** Tô nền toàn khung (mọi cảnh gọi đầu render). */
export function ground(g) { g.drawImage(WALL, 0, 0, W, H); }
/** Ánh sáng sau cửa tắt/bật (on 1 = sáng, 0 = đen kín). a0 cuối → intro; b1 đầu ← intro; thẻ hồi chớp. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(10,8,8,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }

// ── chữ (viết/khắc vào theo k — lộ dần theo ký tự, không fade) ──
function text(g, s, x, y, font, color, align = 'left', ls = 0, k = 1) {
  const n = Math.round(s.length * clamp(k)); g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic';
  g.letterSpacing = ls + 'px'; const w = g.measureText(s).width; if (n) g.fillText(s.slice(0, n), x, y); g.restore(); return w;
}
export { text };
/** Nhãn Plex in hoa. */
export const label = (g, s, x, y, { color = C.dim, align = 'left', size = 20, k = 1 } = {}) => text(g, s.toUpperCase(), x, y, `500 ${size}px ${MONO}`, color, align, 2.5, k);
/** Chữ khắc Cormorant nghiêng (lời dẫn, tiêu đề, phương trình). */
export const it = (g, s, x, y, size, color = C.ink, { align = 'left', k = 1, wt = 600 } = {}) => text(g, s, x, y, `italic ${wt} ${size}px ${CG}`, color, align, 0, k);
/** Số / chữ Archivo. */
export const num = (g, s, x, y, size, color = C.digit, { align = 'left', k = 1 } = {}) => text(g, String(s), x, y, `600 ${size}px ${ARC}`, color, align, 0, k);
/** Phương trình nhiều màu: parts = [[chuỗi, màu?], …]; k lộ dần theo phần. Trả về [[x0, x1], …]. */
export function eq(g, parts, x, y, size, { align = 'left', k = 1 } = {}) {
  const font = `italic 600 ${size}px ${CG}`; g.save(); g.font = font;
  const ws = parts.map(([s]) => g.measureText(s).width), tot = ws.reduce((a, b) => a + b, 0); g.restore();
  let cx = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x; const out = [], n = parts.length * clamp(k);
  parts.forEach(([s, col], i) => { const kk = clamp(n - i); if (kk > 0) text(g, s, cx, y, font, col || C.ink, 'left', 0, kk); out.push([cx, cx + ws[i]]); cx += ws[i]; });
  return out;
}
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

// ── một ô kính. kind: clear | red | blue | dbl | hole (đã nhấc) | empty (chỉ khung, lòng tường). k = lắp vào (0 → 1). ──
export function pane(g, x, y, s, kind, seed = 0, k = 1) {
  const r = Math.max(3, s * 0.06);
  if (kind === 'empty' || k < 1) {                     // lòng ô trống (tường) — cả lúc kính đang lắp dở, kẻo lộ chì đen
    g.fillStyle = C.hole; rr(g, x, y, s, s, r); g.fill(); g.fillStyle = 'rgba(44,45,51,0.14)'; g.fillRect(x, y, s, 4); g.fillRect(x, y, 4, s);
    if (kind === 'empty' || k <= 0) return; }
  if (kind === 'hole') {
    g.fillStyle = C.hole; rr(g, x, y, s, s, r); g.fill();
    g.fillStyle = 'rgba(125,117,131,0.10)'; rr(g, x, y, s, s, r); g.fill();
    g.save(); g.strokeStyle = 'rgba(125,117,131,0.55)'; g.lineWidth = 2; g.setLineDash([6, 5]); rr(g, x + 6, y + 6, s - 12, s - 12, r); g.stroke(); g.restore();
    g.fillStyle = 'rgba(44,45,51,0.16)'; g.fillRect(x, y, s, 4); g.fillRect(x, y, 4, s);
    return;
  }
  const e = outBack(clamp(k)), ss = s * (0.6 + 0.4 * e), ox = x + (s - ss) / 2, oy = y + (s - ss) / 2 - (1 - clamp(k)) * s * 0.4;
  g.save(); g.globalAlpha = clamp(k * 3);
  const base = { clear: C.clear, red: C.red, blue: C.blue, dbl: C.dbl }[kind];
  g.fillStyle = base; rr(g, ox, oy, ss, ss, r); g.fill();
  rr(g, ox, oy, ss, ss, r); g.clip();
  const hk = hash(seed * 1.7) - 0.5;
  g.fillStyle = `rgba(255,255,255,${0.06 + 0.08 * (hk + 0.5)})`; g.fillRect(ox, oy, ss, ss);
  if (kind === 'blue' || kind === 'dbl') {                                 // gân dọc (dấu hiệu thứ hai ngoài màu)
    const step = Math.max(6, ss / 9);
    for (let u = ox + step * 0.3; u < ox + ss; u += step) { g.fillStyle = `rgba(255,255,255,${kind === 'dbl' ? 0.12 : 0.26})`; g.fillRect(u, oy, step * 0.38, ss); }
  }
  if (kind === 'red' || kind === 'dbl') {
    g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 2;
    for (let j = 0; j < 2; j++) { const yy = oy + ss * (0.3 + 0.4 * j) + (hash(seed + j) - 0.5) * ss * 0.2;
      g.beginPath(); g.moveTo(ox, yy); g.bezierCurveTo(ox + ss * 0.3, yy - ss * 0.12, ox + ss * 0.6, yy + ss * 0.12, ox + ss, yy - ss * 0.04); g.stroke(); }
  }
  const gr = g.createLinearGradient(ox, oy, ox + ss, oy + ss);
  gr.addColorStop(0, 'rgba(255,255,255,0.45)'); gr.addColorStop(0.28, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(ox, oy, ss, ss);
  g.strokeStyle = 'rgba(30,24,30,0.13)'; g.lineWidth = 3; rr(g, ox + 1.5, oy + 1.5, ss - 3, ss - 3, r); g.stroke();
  g.restore();
}

/**
 * Ô CỬA 9×9 (lưới sudoku): góc trái-trên (X, Y), cạnh ô cs. kindOf(r, c) → kind; kOf(r, c) → độ lắp (mặc định 1).
 * digits: (r, c) → số | null (mặc định: lời giải); digitColor(r, c, kind). Trả về P = {X, Y, cs, N, ctr(r, c), cell(r, c)}.
 */
export function window9(g, X, Y, cs, { kindOf = () => 'clear', kOf = () => 1, digits = (r, c) => D(r, c), digitK = () => 1, shadow = true } = {}) {
  const thin = Math.max(4, cs * 0.07), thick = thin * 2.1, pad = thick, N = 9 * cs;
  if (shadow) { g.save(); g.shadowColor = 'rgba(40,32,24,0.28)'; g.shadowBlur = 30; g.shadowOffsetX = cs * 0.16; g.shadowOffsetY = cs * 0.2;
    g.fillStyle = C.lead; g.fillRect(X - pad, Y - pad, N + 2 * pad, N + 2 * pad); g.restore(); }
  g.fillStyle = C.lead; g.fillRect(X - pad, Y - pad, N + 2 * pad, N + 2 * pad);
  const P = { X, Y, cs, N, ctr: (r, c) => [X + c * cs + cs / 2, Y + r * cs + cs / 2] };
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const l = c % 3 ? thin / 2 : thick / 2, t = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2, bt = (r + 1) % 3 ? thin / 2 : thick / 2;
    const kind = kindOf(r, c);
    pane(g, X + c * cs + l, Y + r * cs + t, cs - l - rg, kind, r * 9 + c + 1, kOf(r, c));
    const v = digits(r, c), dk = digitK(r, c);
    if (v != null && dk > 0) {
      const [cx, cy] = P.ctr(r, c);
      text(g, String(v), cx, cy + cs * 0.58 * 0.36, `600 ${Math.round(cs * 0.58)}px ${ARC}`, kind === 'hole' ? C.holeT : C.digit, 'center', 0, dk >= 1 ? 1 : 0);
    }
  }
  g.fillStyle = C.leadHi;
  for (let i = 0; i <= 9; i++) { const w = i % 3 ? thin : thick, p = X + i * cs - w / 2;
    g.globalAlpha = 0.55; g.fillRect(p + 1, Y - pad, 1.5, N + 2 * pad); g.fillRect(X - pad, Y + i * cs - w / 2 + 1, N + 2 * pad, 1.5); }
  g.globalAlpha = 1;
  for (let i = 0; i <= 9; i += 3) for (let j = 0; j <= 9; j += 3) {
    g.fillStyle = '#3A3B42'; g.beginPath(); g.arc(X + i * cs, Y + j * cs, thick * 0.75, 0, 7); g.fill();
    g.fillStyle = 'rgba(160,162,170,0.5)'; g.beginPath(); g.arc(X + i * cs - thick * 0.2, Y + j * cs - thick * 0.25, thick * 0.25, 0, 7); g.fill(); }
  return P;
}
/** Viền sáng quanh một nhóm ô (vùng đang nói tới), k vẽ dần. */
export function outline(g, P, cells, color, k = 1, w = 5) {
  if (k <= 0) return; const has = (r, c) => cells.some(([a, b]) => a === r && b === c), cs = P.cs, segs = [];
  for (const [r, c] of cells) { const x0 = P.X + c * cs, y0 = P.Y + r * cs;
    if (!has(r - 1, c)) segs.push([x0, y0, x0 + cs, y0]); if (!has(r + 1, c)) segs.push([x0, y0 + cs, x0 + cs, y0 + cs]);
    if (!has(r, c - 1)) segs.push([x0, y0, x0, y0 + cs]); if (!has(r, c + 1)) segs.push([x0 + cs, y0, x0 + cs, y0 + cs]); }
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.globalAlpha = clamp(k);
  g.beginPath(); segs.forEach(([a, b, c2, d]) => { g.moveTo(a, b); g.lineTo(c2, d); }); g.stroke(); g.restore();
}
/** Chip kính rời có số (dãy đã sắp). */
export function chip(g, x, y, s, kind, v, k = 1) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2); g.fillStyle = C.lead; rr(g, x - 4, y - 4, s + 8, s + 8, 7); g.fill(); g.restore();
  pane(g, x, y, s, kind, v * 13 + x, k); if (k >= 0.6) text(g, String(v), x + s / 2, y + s * 0.73, `600 ${Math.round(s * 0.62)}px ${ARC}`, C.digit, 'center');
}
/** Lồng nét đứt (viền trong), d = khoảng lùi. */
export function cage(g, P, ce, { color = '#2A2622', d = 6, k = 1 } = {}) {
  if (k <= 0) return; const has = (r, c) => ce.some(([a, b]) => a === r && b === c), cs = P.cs, X0 = P.X, Y0 = P.Y;
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = color; g.lineWidth = 2.4; g.setLineDash([7, 6]); g.beginPath();
  for (const [r, c] of ce) {
    const x0 = X0 + c * cs, y0 = Y0 + r * cs, x1 = x0 + cs, y1 = y0 + cs, ext = (nb, dg) => (nb ? (dg ? d : 0) : -d);
    if (!has(r - 1, c)) { g.moveTo(x0 - ext(has(r, c - 1), has(r - 1, c - 1)), y0 + d); g.lineTo(x1 + ext(has(r, c + 1), has(r - 1, c + 1)), y0 + d); }
    if (!has(r + 1, c)) { g.moveTo(x0 - ext(has(r, c - 1), has(r + 1, c - 1)), y1 - d); g.lineTo(x1 + ext(has(r, c + 1), has(r + 1, c + 1)), y1 - d); }
    if (!has(r, c - 1)) { g.moveTo(x0 + d, y0 - ext(has(r - 1, c), has(r - 1, c - 1))); g.lineTo(x0 + d, y1 + ext(has(r + 1, c), has(r + 1, c - 1))); }
    if (!has(r, c + 1)) { g.moveTo(x1 - d, y0 - ext(has(r - 1, c), has(r - 1, c + 1))); g.lineTo(x1 - d, y1 + ext(has(r + 1, c), has(r + 1, c + 1))); }
  }
  g.stroke(); g.restore();
}
/** Nhãn góc của lồng (cỡ ≥ 30 — số mũ ² của Cormorant nhỏ, DNA §3). */
export function cageLabel(g, P, ce, v, bg = C.clear, k = 1) {
  if (k <= 0) return; const [r, c] = ce.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];
  const x = P.X + c * P.cs + 5, y = P.Y + r * P.cs + 5, size = Math.max(30, Math.round(P.cs * 0.36)), f = `italic 700 ${size}px ${CG}`;
  g.save(); g.font = f; const w = g.measureText(v).width; g.restore();
  g.save(); g.globalAlpha = clamp(k * 2); g.fillStyle = bg; rr(g, x, y, w + 10, size * 0.95, 3); g.fill(); g.restore();
  text(g, v, x + 5, y + size * 0.75, f, C.digit, 'left', 0, k);
}
/** Renban = dải kính tím hàn đè. */
export function renban(g, P, line, k = 1) {
  if (k <= 0) return; const pts = line.map(([r, c]) => P.ctr(r, c));
  g.save(); g.globalAlpha = clamp(k); g.lineCap = g.lineJoin = 'round';
  const path = () => { g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); };
  path(); g.strokeStyle = C.lead; g.lineWidth = P.cs * 0.26; g.stroke(); path(); g.strokeStyle = C.ren; g.lineWidth = P.cs * 0.19; g.stroke();
  path(); g.strokeStyle = 'rgba(255,255,255,0.3)'; g.lineWidth = 2; g.stroke(); g.restore();
}
/** Mũi tên: vòng ở ô đầu, thân qua các ô, đầu nhọn ở ô cuối. color để tô nổi (triệt nhau ở hồi 4). */
export function arrow(g, P, [b, ...t], { color = '#3A3B42', k = 1, w = 3.4 } = {}) {
  if (k <= 0) return; const [bx, by] = P.ctr(...b), R = P.cs * 0.38, pts = t.map(([r, c]) => P.ctr(r, c));
  const a0 = Math.atan2(pts[0][1] - by, pts[0][0] - bx);
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = color; g.lineWidth = w; g.lineCap = g.lineJoin = 'round';
  g.beginPath(); g.arc(bx, by, R, 0, 7); g.stroke();
  g.beginPath(); g.moveTo(bx + R * Math.cos(a0), by + R * Math.sin(a0)); pts.forEach(([x, y]) => g.lineTo(x, y)); g.stroke();
  const [ex, ey] = pts[pts.length - 1], [px, py] = pts.length > 1 ? pts[pts.length - 2] : [bx, by], a = Math.atan2(ey - py, ex - px), hs = P.cs * 0.18;
  g.beginPath(); g.moveTo(ex - hs * Math.cos(a - 0.55), ey - hs * Math.sin(a - 0.55)); g.lineTo(ex, ey); g.lineTo(ex - hs * Math.cos(a + 0.55), ey - hs * Math.sin(a + 0.55)); g.stroke();
  g.restore();
}
/** Vẽ cả câu đố lên P: renban, mũi tên, lồng + nhãn (nền nhãn theo tập: red/blue/clear qua bgOf). */
export function puzzle(g, P, { k = 1, bgOf = () => C.clear } = {}) {
  RENBAN.forEach((l, i) => renban(g, P, l, clamp(k * 3 - i * 0.2)));
  ARROWS.forEach((a, i) => arrow(g, P, a, { k: clamp(k * 3 - 0.6 - i * 0.15) }));
  CAGES.forEach((cg, i) => { cage(g, P, cg.ce, { k: clamp(k * 3 - 1.2 - i * 0.1) }); cageLabel(g, P, cg.ce, cg.v, bgOf(cg), clamp(k * 3 - 1.4 - i * 0.1)); });
}

/**
 * CAMERA trong một vùng cắt (PACKAGING §4: đổi hình = camera, không chỉ thêm chữ). keys = [[t, r, c, z, dur?], …]
 * theo thứ tự t: từ t, trượt (outCubic, dur mặc định 0.7 s) tới tâm ô (r, c), phóng z. Trước mốc đầu: z 1 (đồng nhất).
 * P0 = {X, Y, cs} của ô cửa; clip = [x, y, w, h] — vẽ lại tường trong vùng cắt rồi gọi draw() đã biến đổi.
 * Điểm neo trượt dần về tâm ô cửa khi z tăng (A = C + (F − C) / z), nên ô ở mép vẫn nằm trong khung.
 */
export function lens(g, t, P0, keys, clip, draw) {
  let s = [4, 4, 1];
  for (const [t0, r, c, z, dur = 0.7] of keys) {
    if (t < t0) break;
    const e = outCubic(prog(t, t0, t0 + dur)), n = [r, c, z];
    s = s.map((v, i) => v + (n[i] - v) * e);
  }
  const [r, c, z] = s, half = 4.5 * P0.cs, Cx = P0.X + half, Cy = P0.Y + half;
  const Fx = P0.X + (c + 0.5) * P0.cs, Fy = P0.Y + (r + 0.5) * P0.cs, Ax = Cx + (Fx - Cx) / z, Ay = Cy + (Fy - Cy) / z;
  g.save(); g.beginPath(); g.rect(...clip); g.clip();
  if (z !== 1) ground(g);
  g.translate(Ax - Fx * z, Ay - Fy * z); g.scale(z, z);
  draw();
  g.restore();
}

/** Kính NỨT (gạch hiểu lầm, DNA §1): vết nứt chì toả từ (x, y) qua hộp w × h; k nứt dần. */
export function crack(g, x, y, w, h, k = 1, seed = 1) {
  if (k <= 0) return; const n = 7, L = Math.hypot(w, h) * 0.6 * clamp(k);
  g.save(); g.strokeStyle = C.lead; g.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + hash(seed + i) * 0.6; let px = x, py = y; g.lineWidth = 3.2 - i * 0.2; g.beginPath(); g.moveTo(px, py);
    for (let s = 1; s <= 4; s++) { const d = L * s / 4 * (0.5 + 0.5 * hash(seed * 3 + i + s)); px = x + Math.cos(a + (hash(i * 7 + s) - 0.5) * 0.5) * d * Math.min(1, w / h * 0.8 + 0.4);
      py = y + Math.sin(a + (hash(i * 5 + s) - 0.5) * 0.5) * d * Math.min(1, h / w + 0.3); g.lineTo(px, py); } g.stroke(); }
  g.restore();
}
/** Ô kính TRÒN (mục lục lời hứa): số + dòng chữ khắc bên dưới. */
export function roundel(g, cx, cy, R, n, lines, k = 1, kind = 'clear') {
  if (k <= 0) return; const e = outBack(clamp(k * 1.5)), r = R * e;
  g.save(); g.fillStyle = C.lead; g.beginPath(); g.arc(cx, cy, r + 8, 0, 7); g.fill();
  g.beginPath(); g.arc(cx, cy, r, 0, 7); g.clip(); pane(g, cx - r, cy - r, 2 * r, kind, n * 31, 1); g.restore();
  if (k > 0.4) num(g, n, cx, cy + R * 0.32, Math.round(R * 0.9), C.digit, { align: 'center' });
  lines.forEach((s, i) => it(g, s, cx, cy + R + 60 + i * 42, 36, C.ink, { align: 'center', k: clamp((k - 0.4 - i * 0.08) / (0.6 - i * 0.08)) }));   // dòng nào cũng trọn ở k = 1 (≤ 5 dòng)
}
/** Thẻ tên khắc (không ảnh người — DNA §8). */
export function nameplate(g, x, y, name, sub = '', k = 1) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2); g.fillStyle = C.lead; rr(g, x - 6, y - 6, 640 + 12, (sub ? 118 : 80) + 12, 10); g.fill();
  g.fillStyle = C.clear; rr(g, x, y, 640, sub ? 118 : 80, 6); g.fill(); g.restore();
  it(g, name, x + 24, y + 54, 44, C.ink, { k }); if (sub) label(g, sub, x + 24, y + 96, { size: 20, k: clamp(k * 1.5 - 0.4) });
}

// ── biển mục + thẻ hồi ──
/** Biển mục góc trên trái: "ACT II · THE RING" (≤ 44 ký tự). */
export function sectionTag(g, s, k = 1) { if (s.length > 44) throw new Error(`sectionTag quá dài: ${s}`); label(g, s, 96, 92, { size: 20, k: k * 2 }); }
/**
 * Thẻ hồi giữa khung (mục MỞ HỒI). Mốc tính từ FROM THẬT (LESSONS §82): viết vào từ FROM + 0.4, trượt lên lúc START.
 * Trả về độ sáng `on` cho dark(): chớp tắt–bật 0.3 s ở FROM + 0.95 (cảnh gọi dark(g, on) SAU khi vẽ).
 */
export function actCard(g, t, FROM, START, act, title, answers = '') {
  const a = FROM + 0.4, out = outCubic(prog(t, Math.max(a + 0.6, START - 0.35), Math.max(a + 1.2, START + 0.25)));
  if (t >= a && out < 1) {
    g.save(); g.translate(0, -out * 760);
    label(g, act, W / 2, 400, { size: 30, align: 'center', color: C.dim, k: prog(t, a, a + 0.3) });
    it(g, title, W / 2, 540, 104, C.ink, { align: 'center', k: prog(t, a + 0.1, a + 0.8) });
    if (answers) label(g, answers, W / 2, 620, { size: 26, align: 'center', color: C.redT, k: prog(t, a + 0.6, a + 1.0) });
    g.restore();
  }
  const fl = FROM + 0.95; return t < fl || t > fl + 0.3 ? 1 : 1 - 0.7 * Math.sin(Math.PI * (t - fl) / 0.3);
}
/** Mốc tiếng shimmer của thẻ hồi (đúng lúc chớp). */
export const actFlash = FROM => FROM + 0.95;

// ── mascot có bóng mềm + MIỆNG NÓI (engine/talk.js; người dùng 2026-10-09) ──
const IM = {}, SIL = {};
let ENV = null;
/** Trang gọi một lần: đường bao giọng của phần này (data/<part>.mouth.json). */
export function setTalk(json) { ENV = makeEnv(json); }
/**
 * figure(g, pose, cx, foot, h, k, { t, flip, talk }) — trồi lên + bật 0.35 s theo k; bóng mềm trên tường.
 * t = giờ timeline của cảnh: có t (và talk !== false) thì miệng nói theo lời đọc khi đã đứng hẳn (k ≥ 0.95).
 */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, flip = false, talk = true, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return null;
  const key = 'pose-' + pose, im = IM[key], sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const sil = (SIL[key] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.filter = 'blur(10px)'; x.drawImage(im, 0, 0); x.filter = 'none';
    x.globalCompositeOperation = 'source-in'; x.fillStyle = '#4A3E30'; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.18; g.drawImage(sil, 0, 0, im.width, sh0, x0 + 18, y0 + 14, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: x0, y: y0, w, h };
}

// ── nạp ──
export async function loadKit(images) { WALL = wall(); await loadImages(images, IM); }
