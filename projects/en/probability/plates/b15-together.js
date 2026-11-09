// b15 · ACT FOUR "Putting it together" · câu p2 82–86.
//  câu 82  ① một dòng (count ÷ count, equally likely) — lưới 36 mini bên phải nhắc lại hình gốc.
//  câu 83  ② một dòng (answers ≠ outcomes, adding overlaps) — hai vòng chồng mini.
//  câu 84  ③ năm giấy note bật lần lượt ĐÚNG lúc mỗi tên được đọc (list / flip / multiply / people / check).
//  câu 85–86  hai thẻ cược từ cold open quay lại (vật xuyên suốt), mỗi thẻ MỘT dòng lời giải; "fifty-one" → 51.8% vòng xanh,
//          "forty-nine" → 49.1% gạch sóng đỏ.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, paper, write, calc, big, hi, ring, actCard, grid36, note, N, hand, seg } from '../kit.js';
import { MOVES } from './a1-letter.js';
import { mascot } from './g-common.js';

export default class Together {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer', 'ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b15');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l82: S(82), want82: w(82, 'want'), equally82: w(82, 'equally'), e82: E(82),
      l83: S(83), answers83: w(83, 'answers'), overlap83: w(83, 'overlap'), e83: E(83),
      l84: S(84), names: [w(84, 'list'), w(84, 'flip'), w(84, 'multiply'), w(84, 'people'), w(84, 'check')], e84: E(84),
      l85: S(85), line85: w(85, 'line'), e85: E(85),
      fourth86: w(86, 'fourth'), fifty86: w(86, 'fifty-one'), twentyFourth86: w(86, 'twenty-fourth'), forty86: w(86, 'forty-nine'), e86: E(86),
    };
    this.START = S(82);
    this.FROM = Math.max(L(82 - 1).end + 0.5, S(82) - 2.4);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 2.2, 'pen'), c(T.l82, 'pen'), c(T.l83, 'pen'), ...T.names.map(t => c(t, 'pop')), c(T.l85, 'whoosh'), c(T.fifty86, 'correct'), c(T.forty86, 'error')];
  }
  render(g, t) {
    const T = this.T, S0 = this.START;
    paper(g);
    actCard(g, prog(t, this.FROM + 0.1, this.FROM + 0.9) * (1 - prog(t, S0 - 0.5, S0 - 0.1)), 'ACT FOUR', 'Putting it together');
    if (t < S0 - 0.3) return;
    const up = 1 - prog(t, T.l85 - 0.3, T.l85 + 0.3);
    if (up > 0) { g.save(); g.globalAlpha = up;
      const row = (i, s, y, k, extra) => { ring(g, 230, y - 18, 34, 34, clamp(k * 3), { color: C.ink, w: 4, seed: 30 + i }); write(g, String(i + 1), 230, y, clamp(k * 3 - 1), { font: `800 44px ${AR}`, color: C.ink, align: 'center' });
        write(g, s, 290, y, k, { font: `700 44px ${AR}`, color: C.ink }); };
      row(0, 'a count of what you want ÷ a count of everything', 200, prog(t, T.l82, T.want82 + 2.0));
      hi(g, 280, 220, 560, 54, prog(t, T.equally82, T.equally82 + 0.6)); write(g, 'equally likely pieces', 290, 262, prog(t, T.equally82 - 0.2, T.e82), { font: `700 40px ${AR}`, color: C.ink });
      grid36(g, 1520, 140, 34, { heads: 0, sums: 0, seven: 1, k: prog(t, T.l82, T.l82 + 0.6) });
      row(1, 'instinct counts answers, and adds overlaps', 420, prog(t, T.l83, T.overlap83 + 0.4));
      if (t >= T.overlap83 - 0.3) { ring(g, 1560, 400, 60, 60, prog(t, T.overlap83 - 0.3, T.overlap83 + 0.3), { color: C.ink, w: 4 }); ring(g, 1630, 400, 60, 60, prog(t, T.overlap83, T.overlap83 + 0.4), { color: C.ink, w: 4, seed: 7 }); }
      row(2, 'five moves:', 560, prog(t, T.l84, T.names[0]));
      MOVES.forEach(([title, body], i) => { const k = prog(t, T.names[i] - 0.1, T.names[i] + 0.3); g.save(); g.translate(170 + i * 330, 640); note(g, 0, 0, 300, 230, k, { col: C.note[i], rot: (i % 2 ? 0.03 : -0.03), num: i + 1, title, body }); g.restore(); });
      g.restore(); }
    // hai thẻ cược quay lại, mỗi thẻ một dòng
    const kc = prog(t, T.l85 - 0.2, T.l85 + 0.5);
    if (kc > 0) {
      const card = (x, title, line, p, col, at, mark) => {
        g.save(); g.globalAlpha = kc; g.fillStyle = C.card; g.fillRect(x, 260 + (1 - kc) * 120, 700, 520); g.restore();
        if (kc < 1) return;
        write(g, title, x + 40, 330, 1, { font: `800 40px ${AR}`, color: C.ink2 });
        calc(g, line, x + 40, 450, prog(t, at - 1.6, at - 0.2), { size: 48, color: C.ink });
        const pw = big(g, p + '%', x + 350, 660, prog(t, at, at + 0.4), { size: 140, color: col });
        if (mark === 'ring') ring(g, x + 350, 615, pw / 2 + 50, 86, prog(t, at + 0.4, at + 1.0), { color: C.win, w: 6 });
        else { const P = []; for (let q = 0; q <= 24; q++) P.push([x + 350 - pw / 2 + q * pw / 24, 690 + (q % 2 ? 9 : -5)]); hand(g, P, { w: 6, color: C.lose, k: prog(t, at + 0.4, at + 1.0), jit: 0.6, seed: 77 }); }
      };
      card(200, 'BET 1 · one line', '1 − (5/6)⁴', N.p4, C.win, T.fifty86, 'ring');
      card(1020, 'BET 2 · one line', '1 − (35/36)²⁴', N.p24, C.lose, T.forty86, 'wave');
      write(g, 'one line each', W / 2, 180, prog(t, T.line85 - 0.2, T.e85), { font: `800 60px ${AR}`, color: C.ink, align: 'center' });
    }
    mascot(g, t, t >= T.l85 ? 'ok' : 'pointer', -1, { x: 1780 });
  }
}
