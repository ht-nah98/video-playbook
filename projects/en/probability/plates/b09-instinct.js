// b09 · "Why our instinct does this" · câu p2 53–56 — câu trả lời ②.
//  câu 53  ② khoanh tròn.
//  câu 54  hai lỗi thành hai thẻ: (a) "counts answers, not outcomes" — 11 ô | lưới 36 mini; (b) "adds chances that overlap" — hai vòng chồng.
//  câu 55  "close" → thanh 0–100%: hai kim 67% (sai, bút chì) và 52% (đúng, xanh) đứng gần nhau.
//  câu 56  "sixty-seven" / "fifty-two" nhãn; "believe" → ngoặc "close enough to believe"; "money" → "wrong enough to lose money" đỏ.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, paper, write, calc, big, hi, ring, betCard, hand, seg, N, must, grid36 } from '../kit.js';
import { mascot } from './g-common.js';

const BAR = { x0: 300, x1: 1500, y: 820 };
const bx = p => BAR.x0 + (BAR.x1 - BAR.x0) * p / 100;

export default class Instinct {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b09');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l53: S(53), second53: w(53, 'second'),
      l54: S(54), answers54: w(54, 'answers'), outcomes54: w(54, 'outcomes'), adds54: w(54, 'adds'), together54: w(54, 'together'), e54: E(54),
      close55: w(55, 'close'), e55: E(55),
      sixty56: w(56, 'sixty-seven'), fifty56: w(56, 'fifty-two'), believe56: w(56, 'believe'), money56: w(56, 'money'), e56: E(56),
    };
    this.START = S(53);
    this.FROM = S(53) - 0.5;
    must(`${N.naive4}`, 67); must(`${N.real4}`, 52);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.second53, 'pen'), c(T.answers54, 'card'), c(T.adds54, 'card'), c(T.close55, 'pen'), c(T.sixty56, 'tick'), c(T.fifty56, 'correct'), c(T.money56, 'coin')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    ring(g, 230, 150, 46, 46, prog(t, T.l53 - 0.3, T.l53 + 0.3), { color: C.ink, w: 5 });
    write(g, '2', 230, 172, prog(t, T.l53, T.l53 + 0.4), { font: `800 60px ${AR}`, color: C.ink, align: 'center' });
    write(g, 'why instinct counts wrong', 310, 172, prog(t, T.l53, T.l54), { font: `800 56px ${AR}`, color: C.ink });
    // hai thẻ lỗi
    const ka = prog(t, T.answers54 - 0.3, T.answers54 + 0.3), kb = prog(t, T.adds54 - 0.3, T.adds54 + 0.3);
    betCard(g, 220, 260, 700, 380, null, { k: ka, rot: -0.01 });
    if (ka >= 1) { write(g, 'counts answers,', 260, 340, 1, { font: `800 44px ${AR}`, color: C.ink }); write(g, 'not outcomes', 260, 396, prog(t, T.outcomes54 - 0.2, T.outcomes54 + 0.3), { font: `800 44px ${AR}`, color: C.lose });
      for (let s = 0; s < 11; s++) hand(g, [[260 + s * 28, 470], [282 + s * 28, 470], [282 + s * 28, 492], [260 + s * 28, 492], [260 + s * 28, 470]], { w: 2, color: C.pencil, seed: s });
      write(g, '11', 420, 560, 1, { font: `800 44px ${AR}`, color: C.lose, align: 'center' });
      write(g, 'vs', 600, 520, 1, { font: `600 34px ${AR}`, color: C.ink2, align: 'center' });
      grid36(g, 690, 430, 26, { heads: 0, sums: 0, k: 1 }); write(g, '36', 770, 625, 1, { font: `800 44px ${AR}`, color: C.win, align: 'center' }); }
    betCard(g, 1000, 260, 700, 380, null, { k: kb, rot: 0.012 });
    if (kb >= 1) { write(g, 'adds chances', 1040, 340, 1, { font: `800 44px ${AR}`, color: C.ink }); write(g, 'that overlap', 1040, 396, prog(t, T.together54 - 0.2, T.together54 + 0.3), { font: `800 44px ${AR}`, color: C.lose });
      g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(226,112,30,0.35)'; g.beginPath(); g.arc(1300, 530, 90, 0, 7); g.clip(); g.beginPath(); g.arc(1400, 530, 90, 0, 7); g.fill(); g.restore();
      ring(g, 1300, 530, 90, 90, 1, { color: C.ink, w: 4, seed: 2 }); ring(g, 1400, 530, 90, 90, 1, { color: C.ink, w: 4, seed: 3 }); }
    // thanh 0–100%
    const kbar = prog(t, T.close55 - 0.4, T.close55 + 0.4);
    if (kbar > 0) { hand(g, seg(BAR.x0, BAR.y, BAR.x0 + (BAR.x1 - BAR.x0) * kbar, BAR.y, 30), { w: 6, seed: 9 });
      for (const [p, s] of [[0, '0%'], [50, '50%'], [100, '100%']]) { hand(g, seg(bx(p), BAR.y - 16, bx(p), BAR.y + 16, 3), { w: 4, k: kbar, seed: p }); write(g, s, bx(p), BAR.y + 60, kbar, { font: `700 34px ${AR}`, color: C.ink2, align: 'center' }); }
      const k67 = prog(t, T.sixty56, T.sixty56 + 0.4), k52 = prog(t, T.fifty56, T.fifty56 + 0.4);
      if (k67 > 0) { g.save(); g.fillStyle = C.pencil; g.beginPath(); g.arc(bx(67), BAR.y, 15 * k67, 0, 7); g.fill(); g.restore(); write(g, `${N.naive4}% (4/6)`, bx(67), BAR.y - 40, k67, { font: `800 40px ${AR}`, color: C.ink2, align: 'center' }); }
      if (k52 > 0) { g.save(); g.fillStyle = C.win; g.beginPath(); g.arc(bx(52), BAR.y, 15 * k52, 0, 7); g.fill(); g.restore(); write(g, `${N.real4}% (true)`, bx(52) - 40, BAR.y - 100, k52, { font: `800 40px ${AR}`, color: C.win, align: 'center' }); }
      write(g, 'close enough to believe', 300, 960, prog(t, T.believe56 - 0.3, T.believe56 + 0.5), { font: `700 40px ${AR}`, color: C.ink });
      write(g, 'wrong enough to lose money', 860, 960, prog(t, T.money56 - 0.6, T.money56 + 0.3), { font: `800 40px ${AR}`, color: C.lose }); }
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
