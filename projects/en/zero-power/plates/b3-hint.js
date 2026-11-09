// b3 · A pattern is not a proof (p2, hồi I, mục cuối). Hai cột của b1/b2 thu nhỏ (đáy ô 1 lam thẳng hàng); nhãn
//   "A HINT · NOT A PROOF" (mực, khung mực — KHÔNG gạch, §58); "WHO SAYS THE PATTERN KEEPS GOING" + rào đứt nét dưới bậc
//   cuối ta hiểu (2¹, 10¹) và "?" cạnh bậc chót; "→ NEED A REASON"; "WHY MUST A^0 = 1?".
import { C, smooth, prog, ground, ink, card, dm, dmW, annunciators, figure, lookup, must } from '../kit.js';
import { COL, column } from './b1-down.js';

const S = 0.6;
export default class Hint {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      easiest: w(11, 'easiest'), see: w(11, 'see'), hint: w(11, 'hint'), reason11: w(11, 'reason'),
      who: w(12, 'who'), going: w(12, 'going'), past: w(12, 'past'), understand: w(12, 'understand'),
      stronger: w(13, 'stronger'), reason: w(13, 'reason'), one: w(13, 'one'), e13: L(13).end,
    };
    this.START = L(11).start;
    this.FROM = this.START - 1.2;
    this.A = [['4', String(must('2^4', 16))], ['3', String(must('2^3', 8))], ['2', String(must('2^2', 4))], ['1', String(must('2^1', 2))], ['0', String(must('2^0', 1))]];
    this.B = [['3', String(must('10^3', 1000))], ['2', String(must('10^2', 100))], ['1', String(must('10^1', 10))], ['0', String(must('10^0', 1))]];
  }
  sfx() {
    const T = this.T;
    return [{ t: T.hint, kind: 'tick' }, { t: T.past, kind: 'tick' }, { t: T.reason, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, X = COL.X;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, F + 0.3, F + 0.9), 'ACT I', 'PATTERN IS NOT PROOF');
      // hai cột thu nhỏ — đáy (ô 1 lam) thẳng hàng
      const hA = 4 * COL.STEP + COL.H, hB = 3 * COL.STEP + COL.H, kf = smooth(prog(t, T.past - 0.1, T.past + 0.6));
      const cols = [];
      d.save(); d.translate(X, 150); d.scale(S, S); cols.push({ ...column(d, '2', this.A, { label: '÷2' }), ox: X, oy: 150 }); d.restore();
      const oxB = X + cols[0].w * S + 100, oyB = 150 + (hA - hB) * S;
      d.save(); d.translate(oxB, oyB); d.scale(S, S); cols.push({ ...column(d, '10', this.B, { label: '÷10' }), ox: oxB, oy: oyB }); d.restore();
      // rào: "past the last step we actually understand" — dưới bậc mũ 1, dấu "?" cạnh bậc chót
      for (const c of cols) {
        if (kf <= 0) break;
        const y = c.oy + (c.rowsY.at(-2) + COL.H + 10) * S, x0 = c.ox - 14, x1 = c.ox + (c.VR + 30) * S;
        d.fillStyle = C.ink;
        for (let x = x0; x < x0 + (x1 - x0) * kf; x += 22) d.fillRect(x, y - 2, Math.min(13, x0 + (x1 - x0) * kf - x), 5);
        if (kf > 0.6) dm(d, '?', c.ox + c.w * S + 14, c.oy + (c.rowsY.at(-2) + COL.H / 2 + COL.STEP / 2) * S - 17, 5, C.ink, { ghost: false });
      }
      // "the easiest way to see it" → "a pattern is a hint, not a reason"
      if (t > T.easiest - 0.1) dm(d, 'EASIEST WAY TO SEE IT', X, 600, 4, C.dim, { k: prog(t, T.easiest - 0.1, T.see + 0.3) });
      const hw = dmW('A HINT · NOT A PROOF', 8), kh = prog(t, T.hint - 0.1, T.reason11 + 0.4);
      if (kh > 0) {
        dm(d, 'A HINT · NOT A PROOF', X, 670, 8, C.ink, { k: kh });
        const kb = smooth(prog(t, T.reason11, T.reason11 + 0.5));
        if (kb > 0.02) { d.strokeStyle = C.ink; d.lineWidth = 4; d.strokeRect(X - 20, 648, (hw + 40) * kb, 100); }
      }
      if (t > T.stronger - 0.1) dm(d, '→ NEED A REASON', X + hw + 50, 677, 6, C.ink, { k: prog(t, T.stronger - 0.1, T.reason + 0.1) });
      // "who says the pattern has to keep going, past the last step we actually understand?"
      if (t > T.who - 0.1) dm(d, 'WHO SAYS THE PATTERN KEEPS GOING', X, 780, 6, C.ink, { k: prog(t, T.who - 0.1, T.going + 0.3) });
      if (t > T.past - 0.1) dm(d, 'PAST THE LAST STEP WE UNDERSTAND?', X, 848, 5, C.ink, { k: prog(t, T.past - 0.1, T.understand + 0.4) });
      // "a reason why a to the zero has to be one"
      if (t > T.reason - 0.1) dm(d, [['WHY MUST A^0^ = ', C.ink], ['1', C.one], ['?', C.ink]], X, 940, 10, C.ink, { k: prog(t, T.reason - 0.1, T.one + 0.2) });
    });
    // nhân vật suy nghĩ quanh câu hỏi "who says …", tụt xuống trước khi chữ phải xuất hiện
    const kin = prog(t, T.who - 0.35, T.who), out = smooth(prog(t, T.understand + 0.5, T.understand + 1.0));
    if (kin > 0 && out < 1) figure(g, 'ponder', 1650, 1080 + 800 * out, 760, kin);
  }
}
