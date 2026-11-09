// c2 · The pattern (p2 câu 24–30). Một cột kẻ trên thảm: a × (−2) cho a = 3, 2, 1, 0 — tích là chữ nhật 2 × |a| viên đỏ
// co dần, "+2" mỗi bậc; đường nối đứt "IF THE PATTERN CONTINUES", dưới đó (−1)(−2) = 2 và (−2)(−2) = 4 viết VIỀN ĐỨT (viên
// vàng chỉ là viền — giả định). Giấy nhớ "ASSUMPTION"; "Why should it?" = dấu hỏi lớn cạnh chỗ nối; nhãn NOT A PROOF (ngà).
import { C, CG, clamp, prog, ground, card, typed, label, eq, tile, footprint, line, arrow, ring, stickyNote, stamp, lookup, must,
  num, par } from '../kit.js';
import { tray } from './c1-debt.js';

const A = [3, 2, 1, 0, -1, -2], B = -2, Y0 = 250, DY = 125, XEQ = 560, XT = 820, S = 44, P = S + 7;
const rowY = i => Y0 + i * DY;
const col = v => (v > 0 ? C.posT : v < 0 ? C.negT : C.ink);

/** Viên giả định: chỉ viền đứt (màu theo dấu), vẽ dần theo k. */
function ghost(g, x, y, s, color, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k * 2); g.strokeStyle = color; g.lineWidth = 2.6; g.setLineDash([7, 6]);
  g.beginPath(); g.roundRect(x, y, s, s, s * 0.12); g.stroke(); g.restore();
}

export default class Pattern {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      second: w(24, 'second'), pattern: w(24, 'pattern'),
      // [bắt đầu viết, xong (tích đọc ra)] từng hàng
      rows: [[w(25, 'three'), w(25, 'six')], [w(25, 'two', 2), w(25, 'four')], [w(26, 'one'), w(26, 'two', 2)],
        [w(26, 'zero'), w(26, 'zero', 2)], [w(28, 'minus'), w(28, 'two', 2)], [w(28, 'minus', 3), w(28, 'four')]],
      drops: w(27, 'drops'), one27: w(27, 'one'), up: w(27, 'up'), two27: w(27, 'two'),
      keeps: w(28, 'keeps'), going: w(28, 'going'),
      convincing: w(29, 'convincing'), rests: w(29, 'rests'), big: w(29, 'big'), assumption: w(29, 'assumption'), continue: w(29, 'continue'),
      why: w(30, 'why'), exactly: w(30, 'exactly'), question: w(30, 'question'), answer: w(30, 'answer'), cannot: w(30, 'cannot'), us: w(30, 'us'),
    };
    this.START = L(24).start; this.FROM = this.START - 1.2;
    this.P = A.map(a => must(`${a} * (${B})`, a * B));
    A.slice(1).forEach((a, i) => { must(`${A[i]} - 1`, a); must(`${this.P[i + 1]} - ${this.P[i]}`, 2); });
    this.V = { step: must('(-2) - (-4)', 2), drop: must('2 - 3', -1) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.rows[0][1], kind: 'chip' }, { t: T.rows[2][1], kind: 'chip' }, { t: T.up, kind: 'tick' },
      { t: T.rows[4][1], kind: 'tick' }, { t: T.big - 0.2, kind: 'snap' }, { t: T.why, kind: 'question' }, { t: T.cannot + 0.1, kind: 'tick' },
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V, dy = Math.min(30, 1.5 * Math.max(0, t - this.START));
    ground(g, 'mat', 0, dy);
    g.save(); g.translate(0, -dy);
    // cột kẻ: sáu đường kẻ dưới sáu hàng, kẻ lần lượt khi "pattern"
    A.forEach((a, i) => line(g, [[150, rowY(i) + 28], [1040, rowY(i) + 28]], `rgba(${C.grid},0.6)`, 1.8,
      { dash: i > 3 ? [8, 8] : [], k: prog(t, T.second + i * 0.15, T.second + 0.5 + i * 0.15) }));
    // tiêu đề cột khi "pattern": số thứ nhất · × (−2) · đáp số
    label(g, 'first number', XEQ - 200, 212, prog(t, T.pattern - 0.6, T.pattern), { align: 'right', size: 20 });
    label(g, '× ' + par(B), XEQ - 110, 212, prog(t, T.pattern - 0.3, T.pattern + 0.2), { align: 'center', size: 20, color: C.negT });
    label(g, 'answer', XEQ + 20, 212, prog(t, T.pattern, T.pattern + 0.4), { size: 20 });
    A.forEach((a, i) => this.row(g, t, i));
    // "first number drops by one": −1 bên trái giữa các hàng (chỉ bốn hàng thật)
    for (let i = 0; i < 3; i++) label(g, num(V.drop), 140, rowY(i) + DY / 2 + 2, prog(t, T.drops + i * 0.2, T.one27 + 0.2 + i * 0.2), { color: C.negT, size: 22 });
    // "answer goes up by two": +2 giữa các tích; tiếp đứt nét qua chỗ nối
    for (let i = 0; i < 5; i++) {
      const hyp = i >= 3, at = hyp ? T.rows[i + 1][1] : T.up + i * 0.15, k = prog(t, at, at + 0.4);
      const y0 = rowY(i) - 14, y1 = rowY(i + 1) - 34;
      if (hyp) { if (k > 0) line(g, [[688, y0], [712, (y0 + y1) / 2], [688, y1]], C.dim, 2.4, { dash: [6, 6], k }); }
      else arrow(g, 688, y0, 688, y1, k, { color: C.dim, bend: -26, w: 2.4 });
      eq(g, [['+'], [num(V.step), C.posT]], 724, (y0 + y1) / 2 + 14, 30, prog(t, at + 0.1, at + 0.4));
    }
    // chỗ nối: đường đứt + "IF THE PATTERN CONTINUES"
    const yj = rowY(3) + 40;
    line(g, [[120, yj], [1040, yj]], C.ink, 2, { dash: [12, 9], k: prog(t, T.keeps - 0.1, T.going + 0.3) });
    label(g, 'if the pattern continues', 1064, yj + 8, prog(t, T.keeps, T.going + 0.6), { color: C.ink, size: 22 });
    // "convincing": khoanh hai hàng giả định (ngà — không phải sai)
    ring(g, 590, (rowY(4) + rowY(5)) / 2 - 10, 490, 132, prog(t, T.convincing, T.convincing + 0.6), { color: C.ink, w: 3 });
    // giả định lớn: giấy nhớ; mũi tên chỉ xuống chỗ nối
    const inNote = stickyNote(g, 1160, 230, 600, 210, prog(t, T.rests, T.big), { rot: 0.02 });
    inNote(() => {
      typed(g, 'ONE BIG ASSUMPTION', 34, 62, prog(t, T.big, T.assumption + 0.4), `500 24px "IBM Plex Mono"`, C.noteDim, { ls: 2 });
      typed(g, 'THE PATTERN HAS', 34, 124, prog(t, T.assumption + 0.2, T.continue), `800 42px "Archivo"`, C.noteInk, { ls: 1 });
      typed(g, 'TO CONTINUE', 34, 176, prog(t, T.assumption + 0.6, T.continue + 0.4), `800 42px "Archivo"`, C.noteInk, { ls: 1 });
    });
    arrow(g, 1330, 470, 1250, yj - 34, prog(t, T.continue, T.continue + 0.5), { color: C.ink, bend: 30 });
    // "Why should it?" — dấu hỏi lớn cạnh chỗ nối
    typed(g, '?', 1250, yj + 220, prog(t, T.why, T.why + 0.25), `italic 600 220px ${CG}`, C.ink, { align: 'center' });
    label(g, 'exactly the question', 1360, yj + 120, prog(t, T.exactly - 0.1, T.question + 0.4), { color: C.ink, size: 22 });
    label(g, 'we are trying to answer', 1360, yj + 156, prog(t, T.question + 0.2, T.answer + 0.5), { size: 22 });
    g.restore();
    stamp(g, 'A WAY TO REMEMBER · NOT A PROOF', 1110, 975, prog(t, T.cannot, T.cannot + 0.35), { size: 24, color: C.ink, rot: -0.03, align: 'left' });
    card(g, prog(t, this.START - 0.6, this.START + 0.6), 'ACT II', 'THE PATTERN');
    tray(g, 1, 2, prog(t, T.second, T.second + 0.4));
  }
  row(g, t, i) {
    const a = A[i], p = this.P[i], y = rowY(i), [t0, t1] = this.T.rows[i], hyp = a < 0;
    const k = prog(t, t0, t1 + 0.3);
    if (k <= 0) return;
    eq(g, [[hyp ? par(a) : num(a), col(a)], [' × '], [par(B), C.negT], [' = ']], XEQ, y, 56, Math.min(1, k * 1.25), { align: 'right' });
    eq(g, [[num(p), col(p)]], XEQ + 20, y, 56, prog(t, t1, t1 + 0.3));
    if (hyp) {   // giả định: khung viền đứt quanh cả hàng
      g.save(); g.globalAlpha = clamp(k * 3); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([10, 8]);
      g.beginPath(); g.roundRect(136, y - 62, 544, 84, 12); g.stroke(); g.restore();
    }
    // tích: chữ nhật 2 × |a| viên (đỏ thật cho a > 0; vàng viền đứt cho a < 0; dấu chân 0 cho a = 0)
    const kt = prog(t, t1, t1 + 0.45), n = Math.abs(a), top = y - 66;
    if (!n) { footprint(g, XT, y - 66, S + 4, kt); return; }
    for (let c = 0; c < n; c++) for (let r = 0; r < 2; r++) {
      const ki = clamp(kt * n * 1.5 - c);
      if (hyp) ghost(g, XT + c * P, top + r * P, S, C.posT, ki);
      else tile(g, XT + c * P, top + r * P, S, 'n', { k: ki });
    }
  }
}
