// b07 · "Count what you do not want" · câu p2 34–41.
//  câu 34  trái: "at least one six" = đám mây nhiều ca (mờ, rối) ↔ phải: "no six at all" = MỘT ô, tô xanh nhạt (phần bù).
//  câu 35  một xúc xắc: 5 mặt không-6 tô xanh → "5/6".
//  câu 36  bốn ô roll 1–4, mỗi ô "5/6" sáng lần lượt ở first/second/third/fourth.
//  câu 37  "multiply" → dấu × giữa các ô; "four times over" → "(5/6)⁴".
//  câu 38  "= 625/1296" (người que tính trên giấy).
//  câu 39  "everything else" → "1 − 625/1296 = 671/1296"; "fifty-one point eight" → 51.8% xanh, vòng.
//  câu 40  tờ thư 1654 trượt vào góc phải: "671 to 625" bằng mực sắt, ngày 29 July 1654, hai số khoanh khớp với số trên vở.
//  câu 41  "good bet" → dấu sáp xanh trên thư + ✓ trên vở.
import { W, H, C, AR, MO, CO, clamp, prog, lookup, lerp, paper, write, calc, big, hi, ring, check, die, letter, wax, hand, seg, N, must } from '../kit.js';
import { mascot } from './g-common.js';

const RX = i => 300 + i * 230, RY = 470;

export default class Opposite {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['calculator', 'ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b07');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l34: S(34), no34: w(34, 'no'), single34: w(34, 'single'), e34: E(34),
      l35: S(35), five35: w(35, 'five'), e35: E(35),
      l36: S(36), first36: w(36, 'first'), second36: w(36, 'second'), third36: w(36, 'third'), fourth36: w(36, 'fourth'),
      multiply37: w(37, 'multiply'), four37: w(37, 'four'), e37: E(37),
      l38: S(38), twentyFive38: w(38, 'twenty-five'), e38: E(38),
      everything39: w(39, 'everything'), seventyOne39: w(39, 'seventy-one'), fiftyOne39: w(39, 'fifty-one'), e39: E(39),
      l40: S(40), letter40: w(40, 'letter'), july40: w(40, 'july'), e40: E(40),
      good41: w(41, 'good'), e41: E(41),
    };
    this.START = S(34);
    this.FROM = S(34) - 0.5;
    must(`${N.no4} + ${N.yes4}`, 1296);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.no34, 'pop'), c(T.five35, 'pen'), c(T.first36, 'tick'), c(T.second36, 'tick'), c(T.third36, 'tick'), c(T.fourth36, 'tick'),
      c(T.multiply37, 'pen'), c(T.twentyFive38, 'pen'), c(T.seventyOne39, 'pen'), c(T.fiftyOne39, 'correct'), c(T.l40, 'page'), c(T.july40, 'pen'), c(T.good41, 'hanko')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    // câu 34: mây nhiều ca ↔ một ô
    const k34 = 1 - prog(t, T.l35 - 0.2, T.l35 + 0.3);
    if (k34 > 0) { g.save(); g.globalAlpha = k34;
      write(g, 'at least one six', 230, 250, prog(t, T.l34, T.l34 + 0.8), { font: `800 56px ${AR}`, color: C.ink });
      for (let i = 0; i < 11; i++) write(g, ['6 · · ·', '· 6 · ·', '6 6 · ·', '· · 6 ·', '6 · 6 ·', '· · · 6', '6 6 6 ·', '· 6 · 6', '6 · · 6', '6 6 6 6', '…'][i], 260 + (i % 4) * 190, 360 + Math.floor(i / 4) * 70, prog(t, T.l34 + 0.3 + i * 0.12, T.l34 + 0.6 + i * 0.12), { font: `500 34px ${MO}`, color: C.pencil });
      write(g, 'no six at all', 1180, 250, prog(t, T.no34, T.no34 + 0.6), { font: `800 56px ${AR}`, color: C.ink });
      hi(g, 1180, 340, 330, 90, prog(t, T.single34, T.single34 + 0.5), { col: C.note[2] });
      write(g, '· · · ·', 1345, 400, prog(t, T.no34 + 0.4, T.no34 + 0.8), { font: `500 44px ${MO}`, color: C.ink, align: 'center' });
      write(g, 'one clean case', 1345, 500, prog(t, T.single34 + 0.2, T.e34), { font: `700 36px ${AR}`, color: C.ink2, align: 'center' });
      g.restore(); }
    // câu 35: một xúc xắc, 5 mặt không-6
    const k35 = prog(t, T.l35, T.five35 + 0.4) * (1 - prog(t, T.l40 - 0.4, T.l40));
    if (k35 > 0) { for (let f = 1; f <= 6; f++) { const x = 230 + (f - 1) * 105; if (f < 6) hi(g, x - 46, 166, 92, 92, prog(t, T.five35 - 0.4 + f * 0.05, T.five35 + f * 0.05), { col: C.note[2] }); die(g, x, 212, 80, f, C.dieA, { k: clamp(k35 * 6 - (f - 1) * 0.5) }); }
      write(g, 'miss = 5/6', 900, 236, prog(t, T.five35, T.five35 + 0.5), { font: `800 60px ${AR}`, color: C.ink }); }
    // câu 36–37: bốn ô 5/6, dấu ×
    const at = [T.first36, T.second36, T.third36, T.fourth36];
    for (let i = 0; i < 4; i++) { const k = prog(t, at[i] - 0.2, at[i] + 0.3); if (k <= 0) continue;
      hand(g, [[RX(i) - 80, RY - 70], [RX(i) + 80, RY - 70], [RX(i) + 80, RY + 70], [RX(i) - 80, RY + 70], [RX(i) - 80, RY - 70]], { w: 3, color: C.pencil, k, seed: i + 7 });
      hi(g, RX(i) - 70, RY - 40, 140, 80, k, { col: C.note[2] });
      write(g, '5/6', RX(i), RY + 22, k, { font: `800 58px ${AR}`, color: C.ink, align: 'center' });
      write(g, `roll ${i + 1}`, RX(i), RY + 110, k, { font: `600 30px ${AR}`, color: C.ink2, align: 'center' });
      if (i > 0) write(g, '×', RX(i) - 115, RY + 20, prog(t, T.multiply37 + i * 0.1, T.multiply37 + 0.3 + i * 0.1), { font: `800 56px ${AR}`, color: C.lose, align: 'center' }); }
    write(g, '= (5/6)⁴', RX(3) + 120, RY + 22, prog(t, T.four37, T.e37 + 0.2), { font: `800 64px ${AR}`, color: C.ink });
    // câu 38–39: 625/1296 → 1 − … = 671/1296 = 51.8%
    calc(g, `no six:       ${N.no4} / ${N.all4}`, 300, 720, prog(t, T.l38, T.twentyFive38 + 0.8), { size: 48, color: C.ink });
    calc(g, `at least one: ${N.yes4} / ${N.all4}`, 300, 800, prog(t, T.everything39, T.seventyOne39 + 1.0), { size: 48, color: C.ink });
    hi(g, 290, 755, 720, 64, prog(t, T.seventyOne39 + 0.8, T.fiftyOne39));
    const kp = prog(t, T.fiftyOne39, T.fiftyOne39 + 0.4);
    if (kp > 0) { const pw = big(g, N.p4 + '%', 1260, 800, kp, { size: 120, color: C.win }); ring(g, 1260, 760, pw / 2 + 50, 80, prog(t, T.fiftyOne39 + 0.4, T.e39 + 0.3), { color: C.win, w: 6 }); }
    // câu 40–41: tờ thư 1654 ở góc phải trên
    const kl = prog(t, T.l40 - 0.3, T.l40 + 0.5);
    if (kl > 0) { const L_ = letter(g, 1180, 60, 640, 360, kl, { rot: 0.025 });
      if (L_) { const F = `italic 600 48px ${CO}`, kq = prog(t, T.l40 + 0.3, T.letter40 + 0.4); let x = 50;
        for (const [s, r] of [['… as ', 0], ['671', 1], [' is to ', 0], ['625', 2], ['.', 0]]) { const w_ = write(g, s, x, 110, kq, { font: F, color: C.iron });
          if (r) ring(g, x + w_ / 2, 94, w_ / 2 + 18, 34, prog(t, T.letter40 + (r - 1) * 0.2, T.letter40 + 0.4 + (r - 1) * 0.2), { color: C.wax, w: 4 }); x += w_; }
        write(g, 'Pascal to Fermat', 50, 210, prog(t, T.letter40 - 0.2, T.letter40 + 0.6), { font: `700 44px ${CO}`, color: C.iron });
        write(g, '29 July 1654', 50, 290, prog(t, T.july40 - 0.2, T.july40 + 0.6), { font: `700 52px ${CO}`, color: C.iron });
        wax(g, 530, 270, prog(t, T.good41, T.good41 + 0.3), { col: C.waxGreen, letter: 'P' });
        L_.done(); } }
    check(g, 1520, 760, 50, prog(t, T.good41, T.good41 + 0.4));
    mascot(g, t, t >= T.good41 ? 'ok' : 'calculator', -1, { x: 1780 });
  }
}
