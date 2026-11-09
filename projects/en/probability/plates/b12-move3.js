// b12 · "Move three: and multiplies, or adds" · câu p2 66–70 — cây xác suất bốc bi không hoàn lại.
//  câu 66  note 3 to ra; "multiply along a path" → mũi tên dọc nhánh ×; "add separate paths" → hai nhánh tách +.
//  câu 67  túi vải: 3 bi đỏ + 2 bi xanh; "without putting … back" → bi đầu ra khỏi túi, KHÔNG trả lại.
//  câu 68  cây: nhánh 1 "3/5 red", túi còn 2 đỏ / 4 → nhánh 2 "2/4 red".
//  câu 69  dọc đường đỏ–đỏ: "3/5 × 2/4 = 3/10" (tô vàng đường đi).
//  câu 70  "changed" → nhánh 2/4 khoanh cam; "formula you half-remember" → mẩu giấy "P = ?" nhàu bị gạch.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, arrow, contact, hand, seg, N, must } from '../kit.js';
import { mascot } from './g-common.js';
import { noteRow, moveTag } from './b10-move1.js';

const BAG = { x: 330, y: 760 };
const R0 = [760, 640], R1 = [[1080, 480], [1080, 800]], R2 = [[1400, 400], [1400, 560]];
function marble(g, x, y, col, k = 1) { if (k <= 0) return; const r = 26 * (0.3 + 0.7 * clamp(k)); contact(g, x + 3, y + r * 0.8, r, r * 0.25, 0.2);
  g.save(); const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, 2, x, y, r); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.3, col); gr.addColorStop(1, col); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.stroke(); g.restore(); }

export default class Move3 {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b12');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l66: S(66), tree66: w(66, 'tree'), multiply66: w(66, 'multiply'), add66: w(66, 'add'), both66: w(66, 'both'), e66: E(66),
      l67: S(67), bag67: w(67, 'bag'), red67: w(67, 'red'), blue67: w(67, 'blue'), without67: w(67, 'without'), back67: w(67, 'back'), e67: E(67),
      l68: S(68), five68: w(68, 'five'), four68: w(68, 'four'), second68: w(68, 'second'), e68: E(68),
      fifths69: w(69, 'fifths'), quarters69: w(69, 'quarters'), tenths69: w(69, 'tenths'), e69: E(69),
      changed70: w(70, 'changed'), formula70: w(70, 'formula'), e70: E(70),
    };
    this.START = S(66);
    this.FROM = S(66) - 0.5;
    must(`${N.marbles}`, 0.3); must('3 / 5 * 2 / 4', 3 / 10);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l66, 'whoosh'), c(T.multiply66, 'pen'), c(T.add66, 'pen'), c(T.bag67, 'wood'), c(T.without67, 'tick'), c(T.five68, 'pen'), c(T.four68, 'pen'), c(T.tenths69, 'correct'), c(T.formula70, 'tear')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    noteRow(g, t, [1, 1, 1, 1, 1], { focus: 2, big: prog(t, T.l66 - 0.3, T.l66 + 0.4), hide: prog(t, T.multiply66 - 0.8, T.multiply66 - 0.3) });
    moveTag(g, 2, prog(t, T.multiply66 - 0.5, T.multiply66));
    // câu 66: "and" dọc đường ×, "or" hai đường +
    const kr = 1 - prog(t, T.l67 - 0.4, T.l67);
    if (kr > 0 && t >= T.multiply66 - 0.3) { g.save(); g.globalAlpha = kr;
      arrow(g, 300, 640, 300, 900, prog(t, T.multiply66, T.multiply66 + 0.6), { w: 6 }); write(g, 'AND  ×  along a path', 340, 790, prog(t, T.multiply66, T.add66), { font: `800 50px ${AR}`, color: C.ink });
      arrow(g, 1100, 640, 1000, 900, prog(t, T.add66, T.add66 + 0.5), { w: 6 }); arrow(g, 1100, 640, 1200, 900, prog(t, T.add66 + 0.2, T.add66 + 0.7), { w: 6 });
      write(g, 'OR  +  separate paths', 1260, 790, prog(t, T.add66, T.both66), { font: `800 50px ${AR}`, color: C.ink });
      write(g, '(only if they cannot both happen)', 1060, 960, prog(t, T.both66 - 0.3, T.e66), { font: `600 34px ${AR}`, color: C.lose });
      g.restore(); }
    if (t < T.l67 - 0.3) { mascot(g, t, 'pointer', -1, { x: 1780 }); return; }
    // túi bi
    const kb = prog(t, T.bag67 - 0.2, T.bag67 + 0.4);
    hand(g, [[BAG.x - 150, BAG.y - 120], [BAG.x - 170, BAG.y + 120], [BAG.x + 170, BAG.y + 120], [BAG.x + 150, BAG.y - 120]], { w: 6, k: kb, seed: 3 });
    hand(g, seg(BAG.x - 160, BAG.y - 120, BAG.x + 160, BAG.y - 120, 10), { w: 4, k: kb, color: C.ink2, seed: 4 });
    const out = outCubic(prog(t, T.without67, T.back67 + 0.3));
    const M = [[C.dieA, -80, 40], [C.dieA, 0, 60], [C.dieA, 80, 40], [C.dieB, -40, -20], [C.dieB, 40, -20]];
    M.forEach(([col, dx, dy], i) => { const at = col === C.dieA ? T.red67 : T.blue67;
      let x = BAG.x + dx, y = BAG.y + dy; if (i === 1) { x = lerp(x, BAG.x + 240, out); y = lerp(y, BAG.y - 200, out); }
      marble(g, x, y, col, prog(t, at + i * 0.08, at + 0.3 + i * 0.08)); });
    write(g, 'not put back', BAG.x + 170, BAG.y - 250, prog(t, T.back67, T.back67 + 0.5), { font: `700 36px ${AR}`, color: C.lose });
    // cây
    const k1 = prog(t, T.l68, T.five68 + 0.4), k2 = prog(t, T.four68 - 0.2, T.second68 + 0.4);
    hand(g, seg(R0[0], R0[1], R1[0][0], R1[0][1], 10), { w: 6, k: k1, seed: 1 }); hand(g, seg(R0[0], R0[1], R1[1][0], R1[1][1], 10), { w: 4, k: k1, color: C.pencil, seed: 2 });
    write(g, '3/5 red', 870, 520, k1, { font: `800 46px ${AR}`, color: C.dieA, rot: -0.45 }); write(g, '2/5 blue', 880, 800, k1, { font: `700 40px ${AR}`, color: C.dieB, rot: 0.45 });
    hand(g, seg(R1[0][0], R1[0][1], R2[0][0], R2[0][1], 10), { w: 6, k: k2, seed: 5 }); hand(g, seg(R1[0][0], R1[0][1], R2[1][0], R2[1][1], 10), { w: 4, k: k2, color: C.pencil, seed: 6 });
    write(g, '2/4 red', 1180, 400, k2, { font: `800 46px ${AR}`, color: C.dieA, rot: -0.25 }); write(g, '2/4 blue', 1190, 580, k2, { font: `700 40px ${AR}`, color: C.dieB, rot: 0.2 });
    for (const [x, y] of [R0, ...R1, ...R2]) if (k1 > 0.4) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 10, 0, 7); g.fill(); g.restore(); }
    // đường đỏ–đỏ + phép nhân
    const kp = prog(t, T.fifths69 - 0.4, T.fifths69 + 0.2);
    if (kp > 0) { g.save(); g.globalCompositeOperation = 'multiply'; g.strokeStyle = C.hi; g.lineWidth = 34; g.lineCap = 'round'; g.globalAlpha = kp; g.beginPath(); g.moveTo(...R0); g.lineTo(...R1[0]); g.lineTo(...R2[0]); g.stroke(); g.restore(); }
    calc(g, '3/5 × 2/4', 1460, 410, prog(t, T.fifths69, T.quarters69 + 0.4), { size: 50, color: C.ink });
    big(g, '= 3/10', 1460, 520, prog(t, T.tenths69 - 0.2, T.tenths69 + 0.4), { size: 80, color: C.win, align: 'left' });
    ring(g, 1250, 395, 120, 46, prog(t, T.changed70, T.changed70 + 0.5), { color: C.orange, w: 5 });
    const kf = prog(t, T.formula70 - 0.2, T.formula70 + 0.4);
    if (kf > 0) { calc(g, 'P = ??', 820, 960, kf, { size: 48, color: C.ink2 }); strike(g, 810, 950, 1030, 930, prog(t, T.formula70 + 0.4, T.e70)); }
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
