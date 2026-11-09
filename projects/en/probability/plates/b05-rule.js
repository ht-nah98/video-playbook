// b05 · ACT TWO "The gambler's rule" · câu p2 24–28.
//  câu 25  bốn xúc xắc mỗi cái gắn chip "1/6", dấu + giữa → "= 4/6" (cách cộng của dân cược, người que viết).
//  câu 26  "seven rolls" → thêm 3 xúc xắc nữa (7).
//  câu 27  "seven sixths" → "= 7/6"; "more than one" → đường 0–1 dưới, kim chạy QUA đầu 1, rơi khỏi thước; "certain" → "> 1 ?!".
//  câu 28  "breaks" → đầu thước nứt; "never right" → cả dòng cộng bị gạch đỏ một nét.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, die, actCard, probLine, lineX, gambler, POSE, hand, seg, must } from '../kit.js';
import { mascot, pose } from './g-common.js';

const DX = k => 230 + k * 190, DY = 330;
const PL = { x0: 300, x1: 1300, y: 800 };

export default class Rule {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b05');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l24: S(24), eyes24: w(24, 'eyes'),
      l25: S(25), sixth25: w(25, 'sixth'), said25: w(25, 'said'), four25: w(25, 'four', 3), e25: E(25),
      test26: w(26, 'test'), seven26: w(26, 'seven'), e26: E(26),
      sixths27: w(27, 'sixths'), more27: w(27, 'more'), bigger27: w(27, 'bigger'), certain27: w(27, 'certain'), e27: E(27),
      breaks28: w(28, 'breaks'), never28: w(28, 'never'), close28: w(28, 'close'), e28: E(28),
    };
    this.START = S(24);
    this.FROM = Math.max(L(24 - 1).end + 0.5, S(24) - 2.4);
    must('7 / 6 > 1', true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 2.2, 'pen'), c(T.sixth25, 'dice'), c(T.four25, 'pen'), c(T.seven26, 'dice'), c(T.sixths27, 'pen'), c(T.more27, 'whoosh'), c(T.certain27, 'impact'), c(T.breaks28, 'crack'), c(T.never28, 'pen')];
  }
  render(g, t) {
    const T = this.T, S0 = this.START;
    paper(g);
    actCard(g, prog(t, this.FROM + 0.1, this.FROM + 0.9) * (1 - prog(t, S0 - 0.5, S0 - 0.1)), 'ACT TWO', 'Why instinct counts the wrong thing');
    if (t < S0 - 0.3) return;
    write(g, "the gambler's rule", 200, 160, prog(t, S0, T.eyes24 + 0.4), { font: `800 60px ${AR}`, color: C.ink });
    // "fresh eyes": dòng cộng cũ của ông hiện giữa trang, kính lúp (vòng bút) lướt qua, rồi tách thành từng xúc xắc
    const kOld = prog(t, S0 + 0.2, S0 + 0.8) * (1 - prog(t, T.sixth25 - 0.4, T.sixth25));
    if (kOld > 0) { g.save(); g.globalAlpha = Math.min(1, kOld * 2);
      calc(g, '4 × 1/6 = 2/3', W / 2, 560, 1, { size: 96, color: C.ink, align: 'center' });
      const mx = lerp(620, 1300, prog(t, T.eyes24 - 0.6, T.eyes24 + 0.8)); ring(g, mx, 530, 110, 110, prog(t, T.eyes24 - 0.8, T.eyes24 - 0.2), { color: C.ink2, w: 6 });
      hand(g, seg(mx + 78, 608, mx + 150, 690, 4), { w: 12, color: C.ink2, k: prog(t, T.eyes24 - 0.5, T.eyes24 - 0.2), seed: 2 });
      g.restore(); }
    // xúc xắc + chip 1/6 + dấu cộng
    const n = t < T.seven26 ? 4 : 7;
    for (let k = 0; k < n; k++) {
      const at = k < 4 ? lerp(T.sixth25, T.four25, k / 4) : lerp(T.seven26, T.seven26 + 0.6, (k - 4) / 3), kk = prog(t, at, at + 0.3);
      die(g, DX(k), DY, 120, 6, C.dieA, { k: kk, rot: (k % 2 ? 0.08 : -0.06) });
      calc(g, '1/6', DX(k), DY + 120, kk, { size: 40, color: C.ink, align: 'center' });
      if (k > 0) write(g, '+', DX(k) - 95, DY + 124, kk, { font: `800 48px ${AR}`, color: C.ink2, align: 'center' });
    }
    // tổng: 4/6 → 7/6
    const sx = DX(n - 1) + 130;
    if (t < T.seven26) write(g, '= 4/6', DX(3) + 120, DY + 124, prog(t, T.four25, T.four25 + 0.4), { font: `800 64px ${AR}`, color: C.ink });
    else write(g, '= 7/6', sx, DY + 124, prog(t, T.sixths27 - 0.2, T.sixths27 + 0.3), { font: `800 64px ${AR}`, color: C.lose });
    strike(g, DX(0) - 60, DY + 110, sx + 220, DY + 100, prog(t, T.never28, T.never28 + 0.6), { w: 6 });
    // đường 0–1: kim chạy qua 1 và rơi khỏi thước
    const kl = prog(t, T.more27 - 0.6, T.more27);
    if (kl > 0) {
      probLine(g, PL.x0, PL.x1, PL.y, kl);
      const run = prog(t, T.more27, T.bigger27 + 0.4), u = lerp(4 / 6, 7 / 6, outCubic(run));
      const over = Math.max(0, u - 1), fall = prog(t, T.bigger27 + 0.4, T.certain27 + 0.5);
      const gx = lineX(PL.x0, PL.x1, u), gy = PL.y - 4 + fall * fall * 260;
      gambler(g, gx, gy, 170, fall > 0 ? POSE.fall : run > 0 && run < 1 ? pose('stand', 'push', 0.5 + 0.5 * Math.sin(t * 14)) : POSE.stand, { rot: fall * 1.2 });
      if (u > 0) { g.save(); g.fillStyle = u > 1 ? C.lose : C.ink; g.beginPath(); g.arc(lineX(PL.x0, PL.x1, Math.min(u, 7 / 6)), PL.y, 13, 0, 7); g.fill(); g.restore(); }
      write(g, '7/6', lineX(PL.x0, PL.x1, 7 / 6), PL.y - 40, prog(t, T.bigger27, T.bigger27 + 0.3), { font: `800 44px ${AR}`, color: C.lose, align: 'center' });
      write(g, 'bigger than certain?!', 1420, 640, prog(t, T.certain27 - 0.3, T.certain27 + 0.4), { font: `800 48px ${AR}`, color: C.lose });
      // đầu thước nứt
      const kc = prog(t, T.breaks28, T.breaks28 + 0.3); const ex = PL.x1;
      if (kc > 0) hand(g, [[ex - 6, PL.y - 40], [ex + 10, PL.y - 14], [ex - 8, PL.y + 6], [ex + 12, PL.y + 34]], { w: 5, color: C.lose, k: kc, seed: 14 });
    }
    mascot(g, t, 'halt', T.more27, { x: 1780 });
  }
}
