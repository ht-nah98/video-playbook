// Dùng chung cho imaginary: mốc tra theo CHỮ ĐẦU CÂU (thêm câu không làm lệch cảnh sau, §248), trục số + mặt phẳng + mũi tên.
import { lookup, prog } from '../kit.js';
import { C, FONT, bg, txt, seg, dot, card, popped } from '../../_kit/system.js';
import { lambda, moodAt } from '../../_kit/lambda.js';
export { C, FONT, bg, txt, seg, dot, card, popped, prog };
export const D2R = Math.PI / 180, ease = k => { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); };
export const lerp = (a, b, k) => a + (b - a) * k, cue = (t, kind) => ({ t: +t.toFixed(3), kind });
export const I = C.tan; // i luôn màu tím, phần thực xanh, âm đỏ
const idx = (tl, s) => { const i = tl.lines.findIndex(l => l.text.startsWith(s)); if (i < 0) throw new Error(`không có câu: ${s}`); return i; };
/** Tra mốc của một cảnh: at('Rotate') = câu; wd('Rotate', 'half') = giờ của từ. */
export function scene(tl, first) {
  const i = idx(tl, first), START = tl.lines[i].start, prev = i > 0 ? tl.lines[i - 1].end : -9;
  const at = s => tl.lines[idx(tl, s)];
  const wd = (s, word, n = 1) => { let c = 0; for (const x of at(s).words) if (x.w.toLowerCase().replace(/[^a-z0-9-]/g, '') === word && ++c === n) return x.start; throw new Error(`không có từ "${word}" ở: ${s}`); };
  return { START, FROM: Math.max(START - 1.2, prev + 0.5), at, wd };
}
export function arrow(g, x0, y0, x1, y1, col, w = 10, head = 30) {
  const a = Math.atan2(y1 - y0, x1 - x0), d = Math.hypot(x1 - x0, y1 - y0); if (d < 2) return; const h = Math.min(head, d * .6), bx = x1 - h * .8 * Math.cos(a), by = y1 - h * .8 * Math.sin(a);
  seg(g, x0, y0, bx, by, col, w); g.fillStyle = col; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - h * Math.cos(a - .45), y1 - h * Math.sin(a - .45)); g.lineTo(x1 - h * Math.cos(a + .45), y1 - h * Math.sin(a + .45)); g.closePath(); g.fill();
}
/** Trục số nằm ngang, xoay được th (radian, ngược kim đồng hồ) quanh số 0. */
export function line(g, cx, cy, u, n, { th = 0, labels = true, col = C.dim, a = 1 } = {}) {
  g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.rotate(-th); seg(g, -(n + .6) * u, 0, (n + .6) * u, 0, col, 5);
  for (let i = -n; i <= n; i++) { seg(g, i * u, -12, i * u, 12, col, 4); if (labels) { g.save(); g.translate(i * u, 46); g.rotate(th); txt(g, i < 0 ? `−${-i}` : `${i}`, 0, 0, FONT.mono(34), i < 0 ? C.neg : i ? C.ink : C.dim); g.restore(); } }
  g.restore();
}
/** Mặt phẳng số: trục thực, trục ảo, ô lưới theo đơn vị. Điểm: xy(cx, cy, u, re, im). */
export const xy = (cx, cy, u, re, im) => [cx + u * re, cy - u * im];
export function plane(g, cx, cy, u, nx, ny, { k = 1, marks = true } = {}) {
  g.save(); g.globalAlpha *= k; g.strokeStyle = C.faint; g.lineWidth = 2; g.beginPath();
  for (let i = -nx; i <= nx; i++) { g.moveTo(cx + i * u, cy - ny * u); g.lineTo(cx + i * u, cy + ny * u); } for (let j = -ny; j <= ny; j++) { g.moveTo(cx - nx * u, cy + j * u); g.lineTo(cx + nx * u, cy + j * u); } g.stroke();
  seg(g, cx - (nx + .4) * u, cy, cx + (nx + .4) * u, cy, C.dim, 4); seg(g, cx, cy + (ny + .4) * u, cx, cy - (ny + .4) * u, I, 4);
  if (marks) { txt(g, '1', cx + u, cy + 34, FONT.mono(30), C.ink); txt(g, 'i', cx - 26, cy - u, FONT.mono(32), I); } g.restore();
}
/** Cung có đầu mũi tên, góc độ theo toán (ngược kim đồng hồ). */
export function turn(g, cx, cy, r, d0, d1, col, w = 8) {
  if (Math.abs(d1 - d0) < 1) return; const a = -d0 * D2R, b = -d1 * D2R, s = d1 > d0 ? -1 : 1; g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, a, b, s < 0); g.stroke();
  const x = cx + r * Math.cos(b), y = cy + r * Math.sin(b), o = b + s * Math.PI / 2 * -1; g.fillStyle = col; g.beginPath(); g.moveTo(x + 24 * Math.cos(o), y + 24 * Math.sin(o)); g.lineTo(x + 20 * Math.cos(o + 2.5), y + 20 * Math.sin(o + 2.5)); g.lineTo(x + 20 * Math.cos(o - 2.5), y + 20 * Math.sin(o - 2.5)); g.closePath(); g.fill();
}
/** Gạch đỏ ngang qua một dòng chữ. */
export const strike = (g, x0, y, x1, k) => seg(g, x0, y, x1, y, C.neg, 10, k);
export function wave(g, x0, x1, cy, amp, f, col, w = 6) { g.strokeStyle = col; g.lineWidth = w; g.lineJoin = 'round'; g.beginPath(); for (let x = x0; x <= x1; x += 4) { const y = cy - amp * f(x); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }

// ── Lớp chung p2 (không trượt theo cảnh). λ không chạm hình toán (§247). ──
const CAPS = [['So multiplying by two', 'Multiplying is a move on the whole line.'], ['Either way, the same', 'The same move twice can’t end on the opposite side.'], ['But the answer exists', 'A true answer, reached through a forbidden number.'], ['So the square root of minus one', 'i is a quarter turn.'], ['When you multiply two', 'Lengths multiply. Angles add.'], ['So every smooth wave', 'A wave is the shadow of a turning arrow.']];
// [câu đầu, câu cuối, bong bóng, người nói, 3 dáng λ]
const CUT = [['In other words, is there', 'In other words, is there', 'A move that does that?', 1, ['pondering', 'confused', 'hesitant']], ['So there’s a real', 'So there’s a real', 'So it IS solvable…', 0, ['curious', 'pondering', 'surprised']], ['You might think that', 'You might think that', 'Formula’s broken!', 2, ['hesitant', 'confused', 'sassy']], ['So a question that looks', 'So a question that looks', 'Oh, that’s easy now!', 1, ['surprised', 'hooray', 'tease']], ['It’s the same arrow', 'It’s the same arrow', 'It just… turned?', 0, ['awe', 'surprised', 'curious']], ['What’s the peak', 'What’s the peak', 'Seven, obviously.', 2, ['pondering', 'hesitant', 'tease']]];
const HOST = [['Draw the number line', 'Now multiply by two', 'pointer'], ['In fifteen forty-five', 'But the formula', 'ponder'], ['The answer turned up', 'And it’s almost', 'pointer'], ['Once there’s a direction', 'Three to the right', 'pointer'], ['So why does the power', 'The electricity', 'ponder'], ['So try this', 'Then plot', 'pointer']];
export const HOST_POSES = ['ponder', 'pointer'];
let LINES = null, DUR_P2 = 1, figureFn = null, cap = [], cut = [], host = [];
const norm = s => s.replace(/[’']/g, "'"), find = s => { const i = LINES.findIndex(l => norm(l.text).startsWith(norm(s))); if (i < 0) throw new Error(`chrome: không có câu ${s}`); return i; };
export function setChrome(tl, figure) { LINES = tl.lines; DUR_P2 = tl.lines.at(-1).start; figureFn = figure; cap = CAPS.map(([s, c]) => [find(s), c]); cut = CUT.map(([a, b, ...r]) => [find(a), find(b), ...r]); host = HOST.map(([a, b, p]) => [find(a), find(b), p]); }
function bubble(g, s, tx, k) { g.font = FONT.head(44); const w = g.measureText(s).width + 76, x = Math.max(70, tx - w / 2), y = 380, h = 100; popped(g, tx, y + h + 24, k, () => { g.fillStyle = '#FFF'; g.strokeStyle = C.ink; g.lineWidth = 4; g.beginPath(); g.roundRect(x, y, w, h, 24); g.fill(); g.stroke(); g.beginPath(); g.moveTo(tx - 16, y + h); g.lineTo(tx, y + h + 24); g.lineTo(tx + 16, y + h); g.fill(); txt(g, s, x + w / 2, y + h / 2, FONT.head(44), C.ink); }); }
/** Vẽ khung cuối: cảnh trong buf; trong đoạn chen thì thu vào ô + 3 λ. */
export function chrome(g, t, buf) {
  if (!LINES) { g.drawImage(buf, 0, 0); return; }
  g.drawImage(buf, 0, 0);
  const c = cut.find(c => t > LINES[c[0]].start - .15 && t < LINES[c[1]].end + .35);
  if (c) { const a = LINES[c[0]].start - .15, b = LINES[c[1]].end + .35, k = ease(prog(t, a, a + .25)) * (1 - ease(prog(t, b - .25, b))); g.save(); g.globalAlpha = k; bg(g); card(g, 992, 142, 816, 466, C.ink); g.drawImage(buf, 1000, 150, 800, 450);
    [240, 520, 800].forEach((x, i) => lambda(g, x, 960, 330, moodAt(t, [[a - 1, 'plain'], [a + .15 + i * .1, c[4][i]]], i * 1.3))); bubble(g, c[2], [240, 520, 800][c[3]] + 20, prog(t, a + .45, a + .75) * (1 - prog(t, b - .2, b))); g.restore(); }
  if (t >= DUR_P2 - .3) return;
  for (let i = 0; i < 26; i++) { g.fillStyle = i / 26 <= Math.max(0, t) / DUR_P2 ? C.a : C.faint; g.beginPath(); g.arc(675 + i * 22, 34, 6, 0, 7); g.fill(); }
  for (const [i, s] of cap) { const a = LINES[i].start, b = Math.max(LINES[i].end + .6, a + 3.2); if (t < a || t > b) continue; const k = prog(t, a, a + .2) * (1 - prog(t, b - .25, b)); g.save(); g.globalAlpha = k; g.font = FONT.head(40); const w = g.measureText(s).width + 70; g.fillStyle = C.ink; g.beginPath(); g.roundRect(960 - w / 2, 960, w, 72, 16); g.fill(); txt(g, s, 960, 996, FONT.head(40), '#FFF'); g.restore(); }
  for (const [i, j, p] of host) { const a = LINES[i].start - .1, b = LINES[j].end + .4; if (t > a && t < b) figureFn(g, p, 165, 1080, 360, 'night', prog(t, a, a + .3) * (1 - prog(t, b - .3, b)), { t }); }
}
