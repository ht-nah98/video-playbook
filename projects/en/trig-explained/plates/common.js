// Dùng chung cho các cảnh của trig-explained: tra mốc + những hình đi qua nhiều cảnh (tam giác kéo to, người que trên vành).
import { lookup, prog } from '../kit.js';
import { C, FONT, bg, txt, seg, dot, card, popped, unit, onCircle } from '../../_kit/system.js';
import { lambda, moodAt } from '../../_kit/lambda.js';
export { card };
export const D2R = Math.PI / 180, ease = k => { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); };
export const lerp = (a, b, k) => a + (b - a) * k;
export function span(tl, tag, a) {
  const { L, w } = lookup(tl, tag), START = L(a).start, prev = a > 0 ? L(a - 1).end : -9;
  return { L, w, START, FROM: Math.max(START - 1.2, prev + 0.5) };
}
export const cue = (t, kind) => ({ t: +t.toFixed(3), kind });
/** Tam giác vuông đáy nằm: đỉnh góc tại (ax, gy), đáy dài L, góc deg. */
export function rightTri(g, ax, gy, L, deg, { opp = C.sin, adj = C.cos, hyp = C.ink, w = 8, fill = C.grid, arc = 90, label, labelDx = 62 } = {}) {
  const H3 = L * Math.tan(deg * D2R), ex = ax + L, ey = gy - H3;
  g.fillStyle = fill; g.beginPath(); g.moveTo(ax, gy); g.lineTo(ex, gy); g.lineTo(ex, ey); g.closePath(); g.fill();
  seg(g, ax, gy, ex, gy, adj, w); seg(g, ax, gy, ex, ey, hyp, w); seg(g, ex, gy, ex, ey, opp, w + 2);
  g.strokeStyle = C.dim; g.lineWidth = 4; g.strokeRect(ex - 26, gy - 26, 26, 26);
  if (arc) { g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(ax, gy, arc, -deg * D2R, 0); g.stroke(); }
  if (label) txt(g, label, ax + arc + labelDx, gy - 30, FONT.head(40), C.ink);
  return { ex, ey, H3 };
}
/** Vẽ tam giác kéo to + số: dùng ở b2 và lát mở bài. */
export function ratioReadout(g, up, lg, x = 110, pulse = 1) {
  card(g, x - 20, 90, 560, 270, C.sin);
  txt(g, `height  ${up.toFixed(1)}`, x, 130, FONT.mono(44), C.sin, 'left'); txt(g, `long side  ${lg.toFixed(1)}`, x, 190, FONT.mono(44), C.ink, 'left');
  seg(g, x, 232, x + 500, 232, C.dim, 3);
  g.save(); g.translate(x, 300); g.scale(pulse, pulse); txt(g, `ratio = ${(up / lg).toFixed(2)}`, 0, 0, FONT.black(72), C.sin, 'left'); g.restore();
}
export { C, FONT, txt, seg, dot, unit, onCircle, prog };

// ── Lớp chung của p2, không trượt theo cảnh. Số câu = dòng timeline p2. λ không bao giờ chạm hình toán (§247, study 16). ──
const CAPS = [[11, 'Every angle has its own unchanging numbers.'], [36, 'Cosine and sine are the coordinates of one point.'], [51, 'sin²θ + cos²θ = 1 just says M is on the circle.'], [71, 'An angle in radians is how far M has walked.'], [84, 'Check the DEG / RAD setting.']];
// [dòng đầu, dòng cuối, câu trong bong bóng, người nói, dáng 3 λ]
const CUT = [[3, 3, 'That can’t be enough!', 1, ['pondering', 'hesitant', 'confused']], [23, 24, 'But it IS negative…', 0, ['confused', 'pondering', 'hesitant']], [27, 27, 'Wait, how?', 2, ['surprised', 'awe', 'surprised']], [44, 44, 'Oh! A coordinate!', 1, ['pondering', 'surprised', 'curious']], [56, 56, 'Is that an error?', 2, ['pondering', 'hesitant', 'confused']], [60, 60, '30 what?', 0, ['sassy', 'pondering', 'curious']], [66, 66, 'Even the whole Earth?', 1, ['curious', 'awe', 'pondering']], [82, 83, 'It was never wrong!', 1, ['tease', 'hooray', 'awe']]];
// mascot người dẫn ở góc trái: [dòng đầu, dòng cuối, tư thế]
const HOST = [[0, 1, 'ponder'], [12, 13, 'pointer'], [25, 26, 'ponder'], [39, 40, 'pointer'], [61, 62, 'ponder'], [72, 73, 'pointer'], [88, 90, 'pointer']];
export const HOST_POSES = ['ponder', 'pointer'];
let LINES = null, DUR_P2 = 1, figureFn = null;
export function setChrome(tl, figure) { LINES = tl.lines; DUR_P2 = tl.lines.at(-1).start; figureFn = figure; }
function bubble(g, s, tx, k) { g.font = FONT.head(44); const w = g.measureText(s).width + 76, x = Math.max(70, tx - w / 2), y = 380, h = 100; popped(g, tx, y + h + 24, k, () => { g.fillStyle = '#FFF'; g.strokeStyle = C.ink; g.lineWidth = 4; g.beginPath(); g.roundRect(x, y, w, h, 28); g.fill(); g.stroke(); g.beginPath(); g.moveTo(tx - 22, y + h); g.lineTo(tx - 34, y + h + 34); g.lineTo(tx + 22, y + h); g.fill(); g.beginPath(); g.moveTo(tx - 22, y + h); g.lineTo(tx - 34, y + h + 34); g.lineTo(tx + 22, y + h); g.stroke(); txt(g, s, x + w / 2, y + h / 2 + 2, FONT.head(44), C.ink); }); }
/** Vẽ khung cuối: cảnh trong buf; trong đoạn chen thì thu vào ô + 3 λ. */
export function chrome(g, t, buf) {
  if (!LINES) { g.drawImage(buf, 0, 0); return; }
  const cut = CUT.find(c => t > LINES[c[0]].start - .15 && t < LINES[c[1]].end + .35);
  g.drawImage(buf, 0, 0);
  if (cut) { const a = LINES[cut[0]].start - .15, b = LINES[cut[1]].end + .35, k = ease(prog(t, a, a + .25)) * (1 - ease(prog(t, b - .25, b))); g.save(); g.globalAlpha = k; bg(g); card(g, 992, 142, 816, 466, C.faint); g.drawImage(buf, 1000, 150, 800, 450); seg(g, 80, 960, 1840, 960, C.faint, 3);
    [240, 520, 800].forEach((x, i) => lambda(g, x, 960, 330, moodAt(t, [[a - 1, 'plain'], [a + .15 + i * .1, cut[4][i]]], i * 1.3))); bubble(g, cut[2], [240, 520, 800][cut[3]] + 20, prog(t, a + .45, a + .75) * (1 - prog(t, b - .4, b - .15))); g.restore(); return; }
  if (t >= DUR_P2 - .3) return;
  for (let i = 0; i < 26; i++) { g.fillStyle = i / 26 <= Math.max(0, t) / DUR_P2 ? C.a : C.faint; g.beginPath(); g.arc(675 + i * 22, 34, 6, 0, 7); g.fill(); }
  for (const [i, s] of CAPS) { const a = LINES[i].start, b = Math.max(LINES[i].end + .6, a + 3.2); if (t < a || t > b) continue; const k = prog(t, a, a + .2) * (1 - prog(t, b - .25, b)); g.font = FONT.head(40); const w = g.measureText(s).width + 80; g.save(); g.globalAlpha = k; card(g, 960 - w / 2, 974, w, 76, C.a); g.restore(); txt(g, s, 960, 1014, FONT.head(40), C.ink, 'center', k); }
  for (const [i, j, p] of HOST) { const a = LINES[i].start - .1, b = LINES[j].end + .4; if (t > a && t < b) figureFn(g, p, 165, 1080, 360, 'night', prog(t, a, a + .3) * (1 - prog(t, b - .3, b)), { t }); }
}
