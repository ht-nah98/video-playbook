// b13 · "Move four: turn percentages into people" · câu p2 71–77.
//  câu 71  note 4 PEOPLE to ra.   câu 72  thẻ xét nghiệm: "99% accurate", "1 in 1000 sick"; "positive" → que thử hai vạch.
//  câu 73  "Most people say 99%" → bong bóng "99%?" bút chì.
//  câu 74  "a thousand people" → 1000 chấm ô li (40 × 25) mọc theo hàng; "one … sick" → MỘT chấm đỏ; "catches" → vòng.
//  câu 75  "one percent" → 10 chấm cam sáng lên rải rác ("false positives").
//  câu 76  "eleven" → 11 chấm được kéo ra thành hàng riêng: 1 đỏ + 10 cam; "about nine percent" → "1/11 ≈ 9%", "99%?" bị gạch.
//  câu 77  "psychologists" → note nhỏ "people, not % → right answer far more often".
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, hash, N, must } from '../kit.js';
import { mascot } from './g-common.js';
import { noteRow, moveTag } from './b10-move1.js';

const D = { x0: 200, y0: 300, s: 26, cols: 40, rows: 25 };
const SICK = 517;                                   // chỉ số chấm bệnh (cố định, tất định)
const FALSE = Array.from({ length: 10 }, (_, i) => Math.floor(hash(i * 7.3 + 1) * 1000)).map((v, i, a) => (v === SICK || a.indexOf(v) < i) ? (v + 37 * (i + 1)) % 1000 : v);
const dotXY = i => [D.x0 + (i % D.cols) * D.s, D.y0 + Math.floor(i / D.cols) * D.s];

export default class Move4 {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer', 'halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b13');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l71: S(71), people71: w(71, 'people'),
      l72: S(72), accurate72: w(72, 'accurate'), thousand72: w(72, 'thousand'), positive72: w(72, 'positive'), e72: E(72),
      l73: S(73), e73: E(73),
      l74: S(74), sick74: w(74, 'sick'), catches74: w(74, 'catches'), e74: E(74),
      healthy75: w(75, 'healthy'), percent75: w(75, 'percent'), ten75: w(75, 'ten'), e75: E(75),
      eleven76: w(76, 'eleven'), sick76: w(76, 'sick'), nine76: w(76, 'nine'), e76: E(76),
      psych77: w(77, 'psychologists'), e77: E(77),
    };
    this.START = S(71);
    this.FROM = S(71) - 0.5;
    if (new Set([SICK, ...FALSE]).size !== 11) throw new Error('b13: chấm trùng');
    must(`${N.pos}`, 11); must(`${N.testPct}`, 9);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l71, 'whoosh'), c(T.accurate72, 'card'), c(T.positive72, 'beep'), c(T.l73, 'question'), c(T.l74, 'shimmer'), c(T.sick74, 'pop'), c(T.ten75, 'pop'), c(T.eleven76, 'whoosh'), c(T.nine76, 'correct'), c(T.psych77, 'pop')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    noteRow(g, t, [1, 1, 1, 1, 1], { focus: 3, big: prog(t, T.l71 - 0.3, T.l71 + 0.4), hide: prog(t, T.l72 - 0.6, T.l72 - 0.1) });
    moveTag(g, 3, prog(t, T.l72 - 0.3, T.l72 + 0.2));
    if (t < T.l72 - 0.3) { mascot(g, t, 'pointer', -1, { x: 1780 }); return; }
    // thẻ xét nghiệm (trên)
    write(g, 'test: 99% accurate', 200, 210, prog(t, T.l72, T.accurate72 + 0.4), { font: `800 56px ${AR}`, color: C.ink });
    write(g, 'disease: 1 in 1000', 820, 210, prog(t, T.thousand72 - 0.4, T.thousand72 + 0.4), { font: `800 56px ${AR}`, color: C.ink });
    const kp = prog(t, T.positive72, T.positive72 + 0.4);
    if (kp > 0) { g.save(); g.fillStyle = '#FFFFFF'; g.strokeStyle = C.ink; g.lineWidth = 3; g.fillRect(1480, 110, 220, 70); g.strokeRect(1480, 110, 220, 70); g.fillStyle = C.lose;
      g.fillRect(1590, 122, 8, 46 * kp); g.fillRect(1620, 122, 8, 46 * kp); g.restore(); write(g, 'positive', 1590, 230, kp, { font: `700 36px ${AR}`, color: C.lose, align: 'center' }); }
    // "99%?" của số đông
    const k99 = prog(t, T.l73, T.l73 + 0.5);
    if (k99 > 0) { big(g, '99% ?', 1560, 420, k99, { size: 96, color: C.pencil }); strike(g, 1420, 400, 1700, 380, prog(t, T.nine76 + 0.3, T.e76), { w: 8 }); }
    // 1000 chấm
    const kd = prog(t, T.l74, T.sick74);
    const pull = outCubic(prog(t, T.eleven76 - 0.2, T.eleven76 + 0.8));
    for (let i = 0; i < 1000; i++) {
      if (clamp(kd * 25 - Math.floor(i / D.cols)) <= 0) continue;
      let [x, y] = dotXY(i), col = 'rgba(58,70,110,0.35)', r = 8;
      const fi = FALSE.indexOf(i);
      if (i === SICK && t >= T.sick74) { col = C.lose; r = 11; }
      if (fi >= 0 && t >= T.percent75 + fi * 0.08) { col = C.orange; r = 10; }
      if ((i === SICK || fi >= 0) && pull > 0) { const j = i === SICK ? 0 : fi + 1; x = lerp(x, 1310 + (j % 6) * 64, pull); y = lerp(y, 620 + Math.floor(j / 6) * 70, pull); r = lerp(r, 22, pull); }
      g.save(); g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore();
    }
    write(g, '1000 people', D.x0, D.y0 - 34, kd, { font: `700 40px ${AR}`, color: C.ink2 });
    if (t >= T.catches74) { const [sx, sy] = pull > 0 ? [1310, 620] : dotXY(SICK); ring(g, sx, sy, 30 + pull * 10, 30 + pull * 10, prog(t, T.catches74, T.catches74 + 0.4), { color: C.lose, w: 4 }); }
    write(g, '10 false positives', 1290, 560, prog(t, T.ten75, T.ten75 + 0.4), { font: `700 38px ${AR}`, color: C.orangeInk });
    const k9 = prog(t, T.nine76 - 0.3, T.nine76 + 0.4);
    if (k9 > 0) big(g, '1 / 11 ≈ 9%', 1260, 830, k9, { size: 76, color: C.win, align: 'left' });
    const kn = prog(t, T.psych77, T.psych77 + 0.4);
    if (kn > 0) { hi(g, 190, 960, 1050, 60, kn, { col: C.note[3] }); write(g, 'say it in people, not % — far more people get it right', 200, 1004, kn, { font: `700 34px ${AR}`, color: C.ink }); }
    mascot(g, t, t >= T.l73 && t < T.l74 ? 'halt' : 'pointer', -1, { x: 1780 });
  }
}
