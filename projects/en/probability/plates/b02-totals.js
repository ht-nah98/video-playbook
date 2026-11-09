// b02 · "The condition everyone forgets" (a) · câu p2 9–13.
//  câu 9   "condition" → giấy note hồng "!" dán lên góc; "breaks" → note rung.
//  câu 10  "equally likely" viết vào note, tô dạ vàng.
//  câu 11  hai xúc xắc (đỏ, xanh) lăn vào; "add" → "+"; "two … twelve" → danh sách 11 tổng viết thành hàng ô; "eleven" → ngoặc + "11".
//  câu 12  "seven" → ô 7 tô vàng, "1/11 ?" viết bên cạnh.
//  câu 13  "wrong" → bút đỏ gạch "1/11"; "answers" → nhãn "answers" dưới hàng; "outcomes" → "≠ equally likely outcomes".
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, arrow, die, rollDie, note, N, hand, seg, must } from '../kit.js';
import { mascot, pose } from './g-common.js';

export const TOT = { x0: 300, y: 560, s: 112, gap: 18 };
export const totX = i => TOT.x0 + i * (TOT.s + TOT.gap) + TOT.s / 2;     // i = tổng − 2

export default class Totals {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b02');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l9: S(9), condition9: w(9, 'condition'), breaks9: w(9, 'breaks'),
      equally10: w(10, 'equally'), likely10: w(10, 'likely'),
      l11: S(11), add11: w(11, 'add'), two11: w(11, 'two', 2), twelve11: w(11, 'twelve'), eleven11: w(11, 'eleven'), answers11: w(11, 'answers'),
      seven12: w(12, 'seven'), eleven12: w(12, 'eleven'), e12: E(12),
      wrong13: w(13, 'wrong'), answers13: w(13, 'answers'), outcomes13: w(13, 'outcomes'), e13: E(13),
    };
    this.START = S(9);
    this.FROM = S(9) - 0.5;
    must(`${N.totals}`, 11);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.condition9, 'pop'), c(T.equally10, 'pen'), c(T.l11, 'dice'), c(T.two11, 'pen'), c(T.seven12, 'question'), c(T.wrong13, 'error'), c(T.outcomes13, 'pen')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    // phép chia của câu ① (part ÷ whole) — chỗ điều kiện "ẩn" (câu 9–10), lùi đi khi xúc xắc vào
    const kdv = 1 - prog(t, T.l11 - 0.3, T.l11 + 0.3);
    if (kdv > 0) { g.save(); g.globalAlpha = kdv;
      write(g, 'part', 560, 460, 1, { font: `800 90px ${AR}`, color: C.ink, align: 'center' });
      hand(g, seg(380, 500, 740, 500, 16), { w: 7, seed: 3 });
      write(g, 'whole', 560, 600, 1, { font: `800 90px ${AR}`, color: C.ink, align: 'center' });
      arrow(g, 780, 470, 1330, 260, prog(t, T.condition9 + 0.2, T.condition9 + 0.8), { color: C.lose, w: 5, bend: 80 });
      ring(g, 560, 530, 230, 150, prog(t, T.breaks9, T.breaks9 + 0.6), { color: C.lose, w: 5 });
      g.restore(); }
    // note "!" — điều kiện
    const kn = prog(t, T.condition9, T.condition9 + 0.4), shake = t > T.breaks9 && t < T.breaks9 + 0.5 ? Math.sin(t * 60) * 0.03 : 0;
    note(g, 1380, 110, 420, 230, kn, { col: C.note[1], rot: 0.03 + shake, title: '! condition', body: [] });
    if (kn >= 1) { write(g, 'equally likely', 1410, 270, prog(t, T.equally10, T.likely10 + 0.4), { font: `800 50px ${AR}`, color: C.ink, rot: 0.03 });
      hi(g, 1400, 222, 380, 60, prog(t, T.likely10 + 0.3, T.likely10 + 0.8), { rot: 0.03 }); }
    // hai xúc xắc lăn vào
    const kr = prog(t, T.l11, T.add11 + 0.2);
    rollDie(g, 120, 200, 360, 300, 130, 3, C.dieA, kr, 1);
    rollDie(g, 120, 260, 620, 300, 130, 4, C.dieB, kr, 2);
    write(g, '+', 490, 330, prog(t, T.add11, T.add11 + 0.3), { font: `800 90px ${AR}`, color: C.ink, align: 'center' });
    // hàng 11 tổng
    for (let s = 2; s <= 12; s++) {
      const i = s - 2, k = prog(t, lerp(T.two11, T.twelve11, i / 10), lerp(T.two11, T.twelve11, i / 10) + 0.25), x = totX(i);
      if (k <= 0) continue;
      if (s === 7) hi(g, x - TOT.s / 2, TOT.y - TOT.s / 2, TOT.s, TOT.s, prog(t, T.seven12, T.seven12 + 0.4));
      hand(g, [[x - TOT.s / 2, TOT.y - TOT.s / 2], [x + TOT.s / 2, TOT.y - TOT.s / 2], [x + TOT.s / 2, TOT.y + TOT.s / 2], [x - TOT.s / 2, TOT.y + TOT.s / 2], [x - TOT.s / 2, TOT.y - TOT.s / 2]], { w: 3, color: 'rgba(60,66,90,0.6)', k, seed: s });
      write(g, String(s), x, TOT.y + 22, k, { font: `800 60px ${AR}`, color: C.ink, align: 'center' });
    }
    // ngoặc 11 + "answers"
    const kb = prog(t, T.eleven11, T.eleven11 + 0.4);
    if (kb > 0) { const y = TOT.y + 80, xa = totX(0) - 56, xb = totX(10) + 56, xm = (xa + xb) / 2;
      hand(g, [[xa, y], [xa, y + 22], [xm, y + 22], [xm, y + 42], [xm, y + 22], [xb, y + 22], [xb, y]], { w: 5, k: kb, seed: 8 });
      write(g, '11', xm, y + 104, kb, { font: `800 64px ${AR}`, color: C.ink, align: 'center' });
      write(g, 'answers', xm, y + 164, prog(t, T.answers13, T.answers13 + 0.4), { font: `800 46px ${AR}`, color: C.lose, align: 'center' }); }
    // 1/11 ? → gạch
    const kq = prog(t, T.eleven12 - 0.3, T.e12);
    if (kq > 0) { big(g, '1/11 ?', 1060, 380, kq, { size: 100, color: C.ink, align: 'left' }); strike(g, 1050, 360, 1400, 330, prog(t, T.wrong13, T.wrong13 + 0.4), { w: 7 }); }
    write(g, 'not equally likely outcomes', 300, 960, prog(t, T.outcomes13, T.e13 + 0.3), { font: `800 46px ${AR}`, color: C.ink });
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
