// b14 · "Move five: check the answer" · câu p2 78–81.
//  câu 78  note 5 CHECK to ra; ✓ khổng lồ — người que kéo nét ✓ bằng cả người.
//  câu 79  ba ô kiểm viết lần lượt: "between 0 and 1" (đường 0–1 nhỏ), "branches add to 1" (cây 3/5 + 2/5 = 1).
//  câu 80  "rough guess first" → bong bóng "≈ ?" trước, rồi phép tính; "far from your guess" → hai kim xa nhau, dấu "!".
//  câu 81  "seven-sixths" → "7/6" bị ✗ đỏ ngay ô kiểm đầu ("one second").
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, check, cross, probLine, lineX, gambler, POSE, hand, seg } from '../kit.js';
import { mascot, pose } from './g-common.js';
import { noteRow, moveTag } from './b10-move1.js';

export default class Move5 {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer', 'ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b14');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l78: S(78), trust78: w(78, 'trust'), e78: E(78),
      l79: S(79), zero79: w(79, 'zero'), branches79: w(79, 'branches'), add79: w(79, 'add'), e79: E(79),
      l80: S(80), guess80: w(80, 'guess'), far80: w(80, 'far'), something80: w(80, 'something'), e80: E(80),
      l81: S(81), second81: w(81, 'second'), e81: E(81),
    };
    this.START = S(78);
    this.FROM = S(78) - 0.5;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l78, 'whoosh'), c(T.trust78, 'pen'), c(T.zero79, 'tick'), c(T.branches79, 'tick'), c(T.guess80, 'question'), c(T.far80, 'error'), c(T.second81, 'buzzer')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    noteRow(g, t, [1, 1, 1, 1, 1], { focus: 4, big: prog(t, T.l78 - 0.3, T.l78 + 0.4), hide: prog(t, T.l79 - 0.6, T.l79 - 0.1) });
    moveTag(g, 4, prog(t, T.l79 - 0.3, T.l79 + 0.2));
    // ✓ khổng lồ, người que kéo nét
    const kc = prog(t, T.trust78 - 0.3, T.trust78 + 0.6) * (1 - prog(t, T.l79 - 0.3, T.l79 + 0.2));
    if (kc > 0) { check(g, 1500, 640, 160, kc, { w: 22 }); const tip = kc < 0.5 ? [lerp(1340, 1444, kc * 2), lerp(624, 728, kc * 2)] : [lerp(1444, 1660, kc * 2 - 1), lerp(728, 480, kc * 2 - 1)];
      gambler(g, tip[0] + 20, tip[1] + 6, 150, pose('pull', 'push', 0.5 + 0.5 * Math.sin(t * 10)), { dir: 1 }); }
    if (t < T.l79 - 0.3) { mascot(g, t, 'pointer', -1, { x: 1780 }); return; }
    // ba ô kiểm
    const box = (i, label, k) => { const y = 260 + i * 240; hand(g, [[200, y - 40], [260, y - 40], [260, y + 20], [200, y + 20], [200, y - 40]], { w: 5, k, seed: i });
      write(g, label, 300, y + 4, k, { font: `800 52px ${AR}`, color: C.ink }); return y; };
    const y1 = box(0, 'between 0 and 1', prog(t, T.l79, T.zero79 + 0.5));
    probLine(g, 900, 1400, y1 - 10, prog(t, T.zero79, T.zero79 + 0.6));
    const y2 = box(1, 'branches add up to 1', prog(t, T.branches79 - 0.2, T.add79 + 0.4));
    calc(g, '3/5 + 2/5 = 1', 960, y2 + 4, prog(t, T.add79, T.e79), { size: 48, color: C.win });
    const y3 = box(2, 'rough guess first', prog(t, T.l80, T.guess80 + 0.4));
    const kg = prog(t, T.guess80, T.far80);
    if (kg > 0) { hand(g, seg(900, y3, 1400, y3, 20), { w: 4, seed: 7, k: kg }); g.save(); g.fillStyle = C.pencil; g.beginPath(); g.arc(1000, y3, 14, 0, 7); g.fill(); g.restore(); write(g, 'guess', 1000, y3 + 54, kg, { font: `700 34px ${AR}`, color: C.ink2, align: 'center' });
      const kf = prog(t, T.far80, T.far80 + 0.5); if (kf > 0) { g.save(); g.fillStyle = C.lose; g.beginPath(); g.arc(lerp(1000, 1360, outCubic(kf)), y3, 14, 0, 7); g.fill(); g.restore(); write(g, '!', 1180, y3 - 30, prog(t, T.something80 - 0.3, T.something80), { font: `800 64px ${AR}`, color: C.lose, align: 'center' }); } }
    // 7/6 trượt ô kiểm 1
    const k7 = prog(t, T.l81, T.l81 + 0.4);
    if (k7 > 0) { big(g, '7/6', 1560, y1 + 20, k7, { size: 80, color: C.lose }); cross(g, 1560, y1 - 10, 50, prog(t, T.second81 - 0.3, T.second81 + 0.2)); }
    check(g, 230, y1 - 10, 26, prog(t, T.zero79 + 0.3, T.zero79 + 0.6)); check(g, 230, y2 - 10, 26, prog(t, T.add79 + 0.3, T.add79 + 0.6)); check(g, 230, y3 - 10, 26, prog(t, T.something80, T.something80 + 0.3));
    mascot(g, t, t >= T.l81 ? 'ok' : 'pointer', -1, { x: 1780 });
  }
}
