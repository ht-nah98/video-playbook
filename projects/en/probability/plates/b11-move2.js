// b11 · "Move two: at least one → count the opposite" · câu p2 62–65.
//  câu 62  note 2 FLIP to ra (noteRow focus 1); "subtract from one" → "1 − P(none)".
//  câu 63  "spreads" → nhiều ô tô cam rải rác; "None is one case" → một ô xanh.
//  câu 64  "three coins" → 8 kết cục HHH…TTT (đồng xu vẽ tay, sấp = vàng, ngửa = xám); "no heads" → TTT khoanh; "one in eight" → 1/8.
//  câu 65  "seven in eight" → 1 − 1/8 = 7/8; 7 kết cục còn lại tô vàng một lượt ("without listing").
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, paper, write, calc, big, hi, ring, contact, hand, N, must } from '../kit.js';
import { mascot } from './g-common.js';
import { noteRow, moveTag } from './b10-move1.js';

const OUT = ['HHH', 'HHT', 'HTH', 'HTT', 'THH', 'THT', 'TTH', 'TTT'];
const OX = i => 260 + (i % 4) * 300, OY = i => 560 + Math.floor(i / 4) * 170;
function coin(g, cx, cy, r, side, k) {
  if (k <= 0) return;
  const s = 0.2 + 0.8 * clamp(k);
  g.save(); g.translate(cx, cy); g.scale(s, s); contact(g, 4, r * 0.9, r, r * 0.25, 0.2);
  g.fillStyle = side === 'H' ? '#F2C94C' : '#C9CDD6'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke(); g.beginPath(); g.arc(0, 0, r * 0.72, 0, 7); g.lineWidth = 1.5; g.stroke();
  g.font = `800 ${Math.round(r * 0.9)}px ${AR}`; g.fillStyle = C.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(side, 0, 3);
  g.restore();
}

export default class Move2 {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b11');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l62: S(62), least62: w(62, 'least'), none62: w(62, 'none'), subtract62: w(62, 'subtract'), e62: E(62),
      spreads63: w(63, 'spreads'), none63: w(63, 'none'), e63: E(63),
      l64: S(64), coins64: w(64, 'coins'), heads64: w(64, 'heads'), tails64: w(64, 'tails'), eight64: w(64, 'eight'), e64: E(64),
      seven65: w(65, 'seven'), listing65: w(65, 'listing'), e65: E(65),
    };
    this.START = S(62);
    this.FROM = S(62) - 0.5;
    must(`${N.coins}`, 8); must('1 - 1/8', 7 / 8);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l62, 'whoosh'), c(T.subtract62, 'pen'), c(T.spreads63, 'pop'), c(T.coins64, 'coin'), c(T.tails64, 'pop'), c(T.eight64, 'pen'), c(T.seven65, 'correct')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    noteRow(g, t, [1, 1, 1, 1, 1], { focus: 1, big: prog(t, T.l62 - 0.3, T.l62 + 0.4), hide: prog(t, T.subtract62 - 0.8, T.subtract62 - 0.3) });
    moveTag(g, 1, prog(t, T.subtract62 - 0.5, T.subtract62));
    const up = 1 - prog(t, T.l64 - 0.3, T.l64 + 0.3);           // "1 − P(none)" và minh hoạ rải rác nhường chỗ cho đồng xu
    if (up > 0) { g.save(); g.globalAlpha = up;
      write(g, 'P(at least one) = 1 − P(none)', 220, 600, prog(t, T.subtract62 - 0.4, T.e62 + 0.4), { font: `800 64px ${AR}`, color: C.ink });
      for (let i = 0; i < 8; i++) { const x = 260 + i * 150, y = 760, k = i < 7 ? prog(t, T.spreads63 + i * 0.12, T.spreads63 + 0.3 + i * 0.12) : prog(t, T.none63, T.none63 + 0.4);
        hand(g, [[x, y], [x + 120, y], [x + 120, y + 90], [x, y + 90], [x, y]], { w: 3, color: C.pencil, k: prog(t, T.spreads63 - 0.5, T.spreads63), seed: i });
        hi(g, x + 6, y + 8, 108, 74, k, { col: i < 7 ? '#FFC58F' : C.note[2] }); }
      write(g, 'at least one: many cases', 260, 920, prog(t, T.spreads63, T.spreads63 + 0.6), { font: `700 40px ${AR}`, color: C.orangeInk });
      write(g, 'none: one case', 1310, 920, prog(t, T.none63, T.e63), { font: `700 40px ${AR}`, color: C.ink, align: 'center' });
      g.restore(); }
    // 8 kết cục ba đồng xu
    if (t >= T.l64 - 0.3) {
      write(g, 'three coins', 220, 470, prog(t, T.l64 - 0.2, T.coins64 + 0.5), { font: `800 56px ${AR}`, color: C.ink });
      OUT.forEach((o, i) => { const k = prog(t, T.coins64 + i * 0.12, T.coins64 + 0.3 + i * 0.12);
        if (i < 7) hi(g, OX(i) - 120, OY(i) - 52, 240, 104, prog(t, T.seven65 + 0.3, T.listing65), { col: C.hi });
        [...o].forEach((c, j) => coin(g, OX(i) - 70 + j * 70, OY(i), 30, c, k)); });
      ring(g, OX(7), OY(7), 140, 70, prog(t, T.tails64, T.tails64 + 0.5), { color: C.dieB, w: 6 });
      big(g, '1/8', 1620, 560, prog(t, T.eight64 - 0.2, T.eight64 + 0.4), { size: 90, color: C.dieB });
      big(g, '7/8', 1620, 760, prog(t, T.seven65, T.seven65 + 0.4), { size: 110, color: C.win });
    }
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
