// c3 · The about-turn (p2 câu 31–35). Trục số in thảm; mũi tên 3 từ 0 với viên vàng ở mũi. "× (−1)" = quay 180° qua nửa
// trên: viên LẬT thành đỏ, chỉ −3; quay lần hai qua nửa dưới về 3, viên lật lại vàng. Khung ảnh "a lovely picture",
// "complex numbers → later"; nhãn "A PICTURE · NOT A PROOF" (ngà — không gạch, §58).
import { C, PI, clamp, smooth, prog, ground, card, label, eq, tile, line, arrowHead, numberLine, stamp, lookup, must,
  num, par } from '../kit.js';
import { tray } from './c1-debt.js';

const OX = 960, OY = 600, U = 120, R0 = 420, S = 56;

export default class Turn {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      third: w(31, 'third'), number: w(31, 'number'), line: w(31, 'line'),
      negative: w(32, 'negative'), turning: w(32, 'turning'), eighty: w(32, 'eighty'), degrees: w(32, 'degrees'),
      once: w(33, 'once'), other: w(33, 'other'), way: w(33, 'way'), turn2: w(33, 'turn', 2), twice: w(33, 'twice'),
      forwards: w(33, 'forwards'), again: w(33, 'again'),
      picture: w(34, 'picture'), matter: w(34, 'matter'), complex: w(34, 'complex'), numbers34: w(34, 'numbers'),
      ordinary: w(35, 'ordinary'), describes: w(35, 'describes'), rule: w(35, 'rule'), not: w(35, 'not'), prove: w(35, 'prove'),
    };
    this.START = L(31).start; this.FROM = this.START - 1.2;
    this.V = { a: must('3', 3), m: must('-1', -1), once: must('3 * (-1)', -3), twice: must('3 * (-1) * (-1)', 3), deg: must('180', 180) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.line + 0.75, kind: 'chip' }, { t: T.turning + 1.1, kind: 'chip' }, { t: T.turn2 + 1.0, kind: 'chip' },
      { t: T.picture + 0.6, kind: 'snap' }, { t: T.complex + 0.5, kind: 'tick' }, { t: T.not, kind: 'tick' },
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V, dx = Math.min(30, 1.2 * Math.max(0, t - this.START));
    ground(g, 'mat', dx, 0);
    g.save(); g.translate(-dx, 0);
    numberLine(g, OX - 5 * U, OX + 5 * U, OY, -5, 5, prog(t, this.FROM + 0.3, T.line + 0.5));
    // cung quay: nửa trên (lần một), nửa dưới (lần hai) — vẽ dần cùng mũi tên
    const a1 = smooth(prog(t, T.turning, T.turning + 1.1)), a2 = smooth(prog(t, T.turn2, T.turn2 + 1.0));
    this.arc(g, 0, a1, -1); this.arc(g, PI, a2, 1);
    eq(g, [['× '], [par(V.m), C.negT]], 1340, 260, 52, prog(t, T.negative, T.negative + 0.4));
    label(g, `= a turn of ${V.deg}°`, 1340, 304, prog(t, T.eighty - 0.2, T.degrees + 0.4), { color: C.ink, size: 22 });
    label(g, `again: ${V.deg}° more`, 1300, 900, prog(t, T.turn2 + 0.6, T.twice + 0.8), { color: C.ink, size: 22 });
    // mũi tên 3 từ 0; viên ở mũi lật màu theo hướng (vàng = chiều dương, đỏ = chiều âm)
    const ang = PI * (a1 + a2), grow = smooth(prog(t, T.line + 0.2, T.line + 0.7));
    if (grow > 0) {
      const r = V.a * U * grow, c = Math.cos(ang), sn = Math.sin(ang), tx = OX + r * c, ty = OY - r * sn, pos = c >= 0;
      const col = pos ? C.posT : C.negT;
      line(g, [[OX, OY], [OX + (r - 14) * c, OY - (r - 14) * sn]], col, 6);
      arrowHead(g, tx, ty, -ang, col, 20);
      g.save(); g.translate(tx, ty - S * 0.8); g.scale(Math.max(0.06, Math.abs(c)), 1);   // viên đứng trên mũi tên, không che số
      tile(g, -S / 2, -S / 2, S, pos ? 'p' : 'n', { k: prog(t, T.line + 0.4, T.line + 0.75) });
      g.restore();
    }
    // hai lần quay = hai phương trình
    eq(g, [[num(V.a), C.posT], [' × '], [par(V.m), C.negT], [' = '], [num(V.once), C.negT]], 120, 290, 46, prog(t, T.once - 0.2, T.way + 0.2));
    eq(g, [[num(V.a), C.posT], [' × '], [par(V.m), C.negT], [' × '], [par(V.m), C.negT], [' = '], [num(V.twice), C.posT]], 120, 360, 46,
      prog(t, T.twice - 0.2, T.again + 0.2));
    label(g, 'facing the other way', OX - 240, 712, prog(t, T.other - 0.1, T.way + 0.4) - prog(t, T.turn2 - 0.5, T.turn2 - 0.05), { align: 'center', size: 18 });
    label(g, 'facing forwards again', OX + 240, 712, prog(t, T.forwards - 0.1, T.again + 0.4), { align: 'center', size: 18 });
    // "a lovely picture": bốn góc khung ảnh quanh hình; "complex numbers → later"
    this.frame(g, prog(t, T.picture - 0.1, T.picture + 0.6));
    label(g, 'a lovely picture', 524, 1000, prog(t, T.picture, T.picture + 0.6), { color: C.ink, size: 20 });
    label(g, 'complex numbers → later', 1444, 1000, prog(t, T.matter, T.numbers34 + 0.3), { size: 20 });
    // chỉ là hình: mô tả luật, không chứng minh
    label(g, 'for ordinary numbers', 120, 440, prog(t, T.ordinary - 0.1, T.ordinary + 0.6), { size: 22 });
    label(g, 'it describes the rule', 120, 478, prog(t, T.describes - 0.1, T.rule + 0.4), { color: C.ink, size: 22 });
    g.restore();
    stamp(g, 'A PICTURE · NOT A PROOF', 120, 552, prog(t, T.not, T.not + 0.35), { size: 30, color: C.ink, rot: -0.03, align: 'left' });
    card(g, prog(t, this.START - 0.6, this.START + 0.6), 'ACT II', 'THE ABOUT-TURN');
    tray(g, 1, 3, prog(t, T.third, T.third + 0.4));
  }
  /** Cung quay bán kính R0 quanh 0, từ góc a0 thêm PI·k (side −1 nửa trên, +1 nửa dưới), đầu mũi tên khi xong. */
  arc(g, a0, k, side) {
    if (k <= 0) return;
    const pts = Array.from({ length: 41 }, (_, i) => { const a = a0 + PI * k * i / 40; return [OX + R0 * Math.cos(a), OY - R0 * Math.sin(a)]; });
    line(g, pts, C.dim, 2.4, { dash: [10, 9] });
    if (k >= 1) { const [x, y] = pts[40], [px, py] = pts[38]; arrowHead(g, x, y, Math.atan2(y - py, x - px), C.dim, 16); }
  }
  frame(g, k) {
    if (k <= 0) return;
    const x0 = 500, y0 = 160, x1 = 1420, y1 = 1040, l = 50 * clamp(k);
    [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]].forEach(([x, y, sx, sy]) =>
      line(g, [[x + sx * l, y], [x, y], [x, y + sy * l]], C.ink, 4));
  }
}
