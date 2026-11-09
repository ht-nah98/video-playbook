// b10 · ACT THREE "Move one: list equally likely outcomes" · câu p2 57–61.
//  câu 57  ③ câu hỏi viết + tô vàng.   câu 58  "no formulas" → sách công thức gạch; "five moves" → 5 giấy note dán thành hàng (MOVES của a1).
//  câu 59  "Move one" → note 1 to ra giữa; "draw the list".
//  câu 60  "grid" → lưới 6×6 mini (xúc xắc đỏ × xanh); "tree" → cây ba tầng nét bi vẽ dần.
//  câu 61  "equally likely?" chữ lớn; người que dân cược gãi đầu (scratch).
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, hi, ring, strike, note, actCard, grid36, gambler, POSE, hand, seg, rr } from '../kit.js';
import { MOVES } from './a1-letter.js';
import { mascot } from './g-common.js';

export const NROW = { x0: 170, y: 640, w: 300, h: 230, gap: 330 };
/** Hàng 5 note (dùng lại ở b11–b14): note `focus` to ra giữa theo `big`; `hide` ẩn CẢ hàng (nội dung chính vào). */
export function noteRow(g, t, ks, { focus = -1, big = 0, hide = 0 } = {}) {
  if (hide >= 1) return;
  MOVES.forEach(([title, body], i) => {
    const k = ks[i]; if (k <= 0) return;
    const f = i === focus ? big : 0, a = (i === focus ? 1 : 1 - big) * (1 - hide);
    if (a <= 0) return;
    const x = lerp(NROW.x0 + i * NROW.gap, 760, outCubic(f)), y = lerp(NROW.y, 260, outCubic(f)), s = lerp(1, 1.3, outCubic(f));
    g.save(); g.globalAlpha *= a;
    g.translate(x, y); g.scale(s, s); note(g, 0, 0, NROW.w, NROW.h, k, { col: C.note[i], rot: (i % 2 ? 0.03 : -0.03), num: i + 1, title, body }); g.restore();
  });
}
/** Nhãn đầu trang "MOVE n · TÊN" (thay note khi nội dung chính vào). */
export function moveTag(g, i, k) {
  if (k <= 0) return;
  const s = `MOVE ${i + 1} · ${MOVES[i][0]}`, f = `800 40px ${AR}`, w = write(g, s, 0, -999, 0, { font: f });
  hi(g, 190, 62, w + 30, 54, k, { col: C.note[i] });
  write(g, s, 205, 104, k, { font: f, color: C.ink });
}

export default class Move1 {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b10');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l57: S(57), guessing57: w(57, 'guessing'),
      formulas58: w(58, 'formulas'), counting58: w(58, 'counting'), five58: w(58, 'five'), everything58: w(58, 'everything'), e58: E(58),
      l59: S(59), list59: w(59, 'list'),
      grid60: w(60, 'grid'), tree60: w(60, 'tree'), another60: w(60, 'another'), e60: E(60),
      gambler61: w(61, 'gambler'), equally61: w(61, 'equally'), e61: E(61),
    };
    this.START = S(57);
    this.FROM = Math.max(L(57 - 1).end + 0.5, S(57) - 2.4);
    const T = this.T;
    this.NK = [0, 1, 2, 3, 4].map(i => lerp(T.five58, T.everything58 + 0.4, i / 4));
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 2.2, 'pen'), c(T.l57, 'pen'), c(T.formulas58, 'pen'), ...this.NK.map(t => c(t, 'pop')), c(T.l59, 'whoosh'), c(T.grid60, 'pen'), c(T.tree60, 'pen'), c(T.equally61, 'question')];
  }
  render(g, t) {
    const T = this.T, S0 = this.START;
    paper(g);
    actCard(g, prog(t, this.FROM + 0.1, this.FROM + 0.9) * (1 - prog(t, S0 - 0.5, S0 - 0.1)), 'ACT THREE', 'Five moves for any problem');
    if (t < S0 - 0.3) return;
    const top = 1 - prog(t, T.l59 - 0.3, T.l59 + 0.3);
    if (top > 0) { g.save(); g.globalAlpha = top;
      ring(g, 230, 200, 40, 40, prog(t, S0, S0 + 0.4), { color: C.ink, w: 5 }); write(g, '3', 230, 220, prog(t, S0 + 0.2, S0 + 0.5), { font: `800 56px ${AR}`, color: C.ink, align: 'center' });
      write(g, 'How do you solve one without guessing?', 300, 220, prog(t, S0, T.guessing57 + 0.4), { font: `800 56px ${AR}`, color: C.ink });
      hi(g, 290, 160, 1180, 76, prog(t, T.guessing57, T.guessing57 + 0.5));
      // sách công thức bị gạch → "counting"
      const kb = prog(t, T.formulas58 - 0.3, T.formulas58 + 0.3);
      if (kb > 0) { g.save(); g.fillStyle = C.dieB; g.fill(rr(300, 330, 250, 180, 8)); g.restore(); write(g, 'FORMULAS', 425, 430, kb, { font: `800 40px ${AR}`, color: '#FFFFFF', align: 'center' });
        strike(g, 280, 500, 570, 340, prog(t, T.formulas58 + 0.3, T.formulas58 + 0.7), { w: 8 }); }
      write(g, 'counting', 640, 440, prog(t, T.counting58 - 0.2, T.counting58 + 0.4), { font: `800 80px ${AR}`, color: C.win });
      g.restore(); }
    noteRow(g, t, this.NK.map(a => prog(t, a, a + 0.35)), { focus: 0, big: prog(t, T.l59, T.l59 + 0.6), hide: prog(t, T.grid60 - 0.6, T.grid60 - 0.1) });
    moveTag(g, 0, prog(t, T.grid60 - 0.3, T.grid60 + 0.2));
    // grid + tree
    if (t >= T.grid60 - 0.3) {
      grid36(g, 420, 420, 58, { k: prog(t, T.grid60 - 0.2, T.grid60 + 0.8), heads: prog(t, T.grid60, T.grid60 + 0.6), sums: 0 });
      write(g, 'grid: two at once', 330, 880, prog(t, T.grid60, T.grid60 + 0.6), { font: `700 40px ${AR}`, color: C.ink });
      const kt = prog(t, T.tree60 - 0.2, T.another60 + 0.5);
      const R = [1300, 430], L1 = [[1160, 600], [1440, 600]], L2 = [[1090, 760], [1230, 760], [1370, 760], [1510, 760]];
      L1.forEach(([x, y], i) => hand(g, seg(R[0], R[1], x, y, 10), { w: 5, k: clamp(kt * 3 - i * 0.3), seed: i }));
      L2.forEach(([x, y], i) => { const p = L1[i >> 1]; hand(g, seg(p[0], p[1], x, y, 10), { w: 5, k: clamp(kt * 3 - 1.2 - i * 0.2), seed: 9 + i }); });
      [R, ...L1, ...L2].forEach(([x, y], i) => { if (clamp(kt * 3 - i * 0.3) > 0.5) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.restore(); } });
      write(g, 'tree: one after another', 1060, 880, prog(t, T.tree60, T.tree60 + 0.6), { font: `700 40px ${AR}`, color: C.ink });
    }
    const kq = prog(t, T.equally61 - 0.3, T.equally61 + 0.5);
    if (kq > 0) { write(g, 'equally likely?', 760, 1000, kq, { font: `800 64px ${AR}`, color: C.lose }); }
    if (t >= T.gambler61 - 0.4) gambler(g, 1640, 760, 170, POSE.scratch, { dir: -1, a: prog(t, T.gambler61 - 0.4, T.gambler61) });
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
