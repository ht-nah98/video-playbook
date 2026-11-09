// c1 · The rule you already know (p2, MỞ HỒI II) — thẻ hồi "FORCED BY A RULE · ANSWERS 1 + 2", rồi lịch sử phép tính:
//   A^M × A^N = A^M+N (ma trận điểm lớn) · 2³ × 2² = 2³⁺² = 2⁵ = 32 (7 đoạn, bấm theo từ) · CHECK 8 × 4 = 32 (khoanh hai
//   số 32 bằng mực) · "đếm 2": (2·2·2)(2·2) đánh số 1..5 → = 2⁵. Mascot pointer (lật, chỉ sang trái) quanh câu quy tắc.
import { C, smooth, prog, ground, ink, card, actTitle, dm, dmW, row, rowW, seg7, dots, annunciators, figure, lookup, must } from '../kit.js';

const X = 132;
/** Một dòng ma trận điểm ghép từ nhiều khúc, mỗi khúc gõ vào trong [a, b] (bám từ đọc). Trả về bề rộng. */
function seq(d, parts, x, y, p, t, color = C.ink) {
  let cx = x;
  for (const [s, a, b] of parts) {
    const r = typeof s === 'string' ? [[s, color]] : s;
    dm(d, r, cx, y, p, color, { k: prog(t, a, Math.max(a + 0.12, b)) });
    cx += dmW(r, p) + p;
  }
  return cx - x - p;
}
/** k của dòng 7 đoạn: mỗi token "bấm" vào đúng mốc của nó. */
const keyed = (t, at) => at.filter(a => t >= a - 0.04).length / at.length;

export default class Rule {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      rule14: w(14, 'rule'), learns: w(14, 'learns'),
      a15: w(15, 'a'), m15: w(15, 'm'), times15: w(15, 'times'), a15b: w(15, 'a', 2), n15: w(15, 'n'), eq15: w(15, 'equals'),
      a15c: w(15, 'a', 3), plus15: w(15, 'plus'), n15b: w(15, 'n', 2), e15: L(15).end,
      two16: w(16, 'two'), cubed: w(16, 'cubed'), times16: w(16, 'times'), two16b: w(16, 'two', 2), squared: w(16, 'squared'),
      is16: w(16, 'is'), two16c: w(16, 'two', 3), three16: w(16, 'three'), plus16: w(16, 'plus'), two16d: w(16, 'two', 4),
      thats: w(16, "that's"), two16e: w(16, 'two', 5), fifth: w(16, 'fifth'), tt16: w(16, 'thirty-two'),
      check: w(17, 'check'), eight: w(17, 'eight'), times17: w(17, 'times'), four: w(17, 'four'), really: w(17, 'really'), tt17: w(17, 'thirty-two'),
      rule18: w(18, 'rule'), counting: w(18, 'counting'), twos: w(18, 'twos'), three18: w(18, 'three'), then18: w(18, 'then'),
      two18: w(18, 'two'), more: w(18, 'more'), five: w(18, 'five'), altogether: w(18, 'altogether'), e18: L(18).end,
    };
    this.START = L(14).start;
    this.FROM = Math.max(this.START - 2.6, L(13).end + 0.5);   // mở hồi
    this.V = { a: must('2^3 × 2^2', 32), b: must('2^(3+2)', 32), c: must('2^5', 32), d: must('8 × 4', 32),
      e8: must('2^3', 8), e4: must('2^2', 4), n: must('3 + 2', 5) };
    this.FIG = [this.T.a15 - 0.25, this.T.thats + 0.9];          // pointer quanh câu quy tắc + ví dụ (≈ 7.9 s)
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.a15, kind: 'beep' },       // quy tắc bắt đầu bấm vào
      { t: T.two16, kind: 'beep' },     // ví dụ 2³ × 2²
      { t: T.tt16, kind: 'beep' },      // = 32
      { t: T.tt17, kind: 'beep' },      // kiểm 8 × 4 = 32
      { t: T.three18, kind: 'tick' },   // đếm ba số 2 đầu
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      actTitle(d, t, this.START, 'II', 'FORCED BY A RULE', 'ANSWERS 1 + 2');
      card(d, prog(t, this.START - 0.1, this.START + 0.7), 'ACT II', 'THE RULE YOU KNOW');
      if (t < this.START - 0.2) return;
      // câu 14: một quy tắc mọi người đều học
      dm(d, 'ONE RULE · EVERYBODY LEARNS IT', X, 146, 5, C.dim, { k: prog(t, T.rule14 - 0.1, T.learns + 0.3) });
      // câu 15: A^M × A^N = A^M+N
      if (t > T.rule14 + 0.2) {
        const w = seq(d, [['A^M^', T.rule14 + 0.4, T.m15 + 0.1], [' × ', T.times15, T.times15 + 0.2], ['A^N^', T.a15b, T.n15 + 0.1],
          [' = ', T.eq15, T.eq15 + 0.2], ['A^M+N^', T.a15c, T.n15b + 0.15]], X, 250, 12, t);
        if (t > T.e15 - 0.1) dots(d, X, 362, X + w * prog(t, T.e15 - 0.1, T.e15 + 0.5), 362, `rgba(${C.inkRGB},0.55)`, { step: 10, size: 5 });
      }
      // câu 16: 2³ × 2² = 2³⁺² = 2⁵ = 32
      const h = 84, y1 = 410, y2 = 520; let box32a = null;
      if (t > T.two16 - 0.4) {
        const toks = [{ c: '2' }, { c: '3', sup: true }, { c: '×' }, { c: '2' }, { c: '2', sup: true }, { c: '=' }, { c: '2' }];
        const at = [T.two16, T.cubed, T.times16, T.two16b, T.squared, T.is16, T.two16c];
        const bx = row(d, toks, X, y1, h, { k: keyed(t, at) });
        row(d, '3+2', bx.end - h * 0.1, y1, h * 0.5, { k: keyed(t, [T.three16, T.plus16, T.two16d]) });   // số mũ 3+2 (nhỏ)
        if (t > T.thats - 0.3) {
          const toks2 = [{ c: '=' }, { c: '2' }, { c: '5', sup: true }, { c: '=' }, ...String(V.c).split('').map(c => ({ c }))];
          const r2 = row(d, toks2, bx[5][0] - h * 0.16, y2, h, { k: keyed(t, [T.thats, T.two16e, T.fifth, T.tt16, T.tt16, T.tt16]) });
          box32a = [r2[4][0], r2.at(-1)[1], y2, h];
        }
      }
      // câu 17: CHECK 8 × 4 = 32 — khoanh hai số 32 (mực)
      const y3 = 640, h3 = 70;
      if (t > T.check - 0.2) {
        dm(d, 'CHECK', X, y3 + 20, 5, C.dim, { k: prog(t, T.check - 0.1, T.check + 0.4) });
        const r = row(d, [String(V.e8), '×', String(V.e4), '=', ...String(V.d).split('')].map(c => ({ c })), X + 220, y3, h3,
          { k: keyed(t, [T.eight, T.times17, T.four, T.really, T.tt17, T.tt17]) });
        if (t > T.tt17 + 0.25 && box32a) {
          const kk = prog(t, T.tt17 + 0.25, T.tt17 + 0.7);
          d.strokeStyle = C.ink; d.lineWidth = 4;
          const [a0, a1, ay, ah] = box32a;
          d.strokeRect(a0 - 8, ay - 12, (a1 - a0 + 34) * kk, ah + 24);
          d.strokeRect(r[4][0] - 8, y3 - 12, (r.at(-1)[1] - r[4][0] + 34) * kk, h3 + 24);
          if (kk >= 1) dm(d, 'SAME', r.at(-1)[1] + 50, y3 + 22, 5, C.ink, { k: prog(t, T.tt17 + 0.7, T.tt17 + 1.0) });
        }
      }
      // câu 18: chỉ đếm số 2 — (2·2·2)(2·2), đánh số 1..5 → = 2⁵
      if (t > T.rule18 - 0.2) {
        dm(d, 'IT WORKS: YOU ONLY COUNT TWOS', X, 740, 4, C.dim, { k: prog(t, T.rule18, T.counting) });
        const p = 9, gy = 816, s = '(2·2·2)(2·2)';
        if (t > T.counting - 0.2) {
          dm(d, s, X, gy, p, C.ink, { k: prog(t, T.counting - 0.1, T.twos + 0.35) });
          const idx = [1, 3, 5, 8, 10], at = [T.three18, T.three18 + 0.1, T.three18 + 0.2, T.two18, T.more];
          idx.forEach((ci, n) => {
            if (t < at[n] - 0.04) return;
            const cx = X + ci * 6 * p + 2.5 * p, sh = 46;
            seg7(d, String(n + 1), cx - sh * 0.25, gy + 82, sh, C.ink);
          });
          if (t > T.five - 0.1) {
            const ex = X + dmW(s, p) + p * 3;
            dm(d, '= 2^5^', ex, gy, p, C.ink, { k: prog(t, T.five - 0.1, T.five + 0.3) });
            dm(d, `${V.n} TWOS ALTOGETHER`, ex + dmW('= 2^5^', p) + 50, gy + 18, 5, C.dim, { k: prog(t, T.altogether - 0.1, T.altogether + 0.6) });
          }
        }
      }
    });
    // pointer (lật: que chỉ sang trái, vào phần quy tắc) — vào trồi lên, ra chìm xuống đáy
    const [a, b] = this.FIG;
    if (t > a - 0.2 && t < b + 0.6) {
      const out = smooth(prog(t, b, b + 0.5));
      figure(g, 'pointer', 1640, 1080 + out * 820, 760, prog(t, a - 0.2, a + 0.15), { flip: true });
    }
  }
}
