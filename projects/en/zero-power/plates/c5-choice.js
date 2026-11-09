// c5 · A choice, then no choice (p2, câu 37–41). Một trang, không cuộn:
//   "A CONVENTION?" (crossed) → luật A^M × A^N = A^M+N → dải ô số mũ [0] [1] [2] [3] [4] …: 1, 2, 3 sáng theo lời,
//   ngoặc "PROVED: COUNTING EXPONENTS" dưới 1… → mũi tên chấm sang ô 0 "ZERO TOO? A CHOICE" + "SAME CHOICE AS LAST
//   VIDEO: NEGATIVE NUMBERS" + "KEEP THE RULES THAT ALREADY WORK" → "THEN: FORCED" + A^0 = 1 lam (ô 0 nhận 1 lam)
//   → "A ≠ 0: NOBODY PICKS ANYTHING ELSE".
import { C, smooth, prog, ground, ink, card, annunciators, seg7, dm, dmW, dots, figure, lookup, must } from '../kit.js';

const X = 132;

export default class Choice {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['crossed'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c5');
    this.T = {
      conv: w(37, 'convention'), e37: L(37).end,
      honest: w(38, 'honest'), rule: w(38, 'rule'), proved: w(38, 'proved'), counting: w(38, 'counting'),
      n1: w(38, 'one'), n2: w(38, 'two'), n3: w(38, 'three'), so: w(38, 'so'), e38: L(38).end,
      zero39: w(39, 'zero'), choice39: w(39, 'choice'), same: w(39, 'same'), numbers: w(39, 'numbers'), keep: w(39, 'keep'),
      work: w(39, 'work', 2), e39: L(39).end,
      once: w(40, 'once'), nothing40: w(40, 'nothing'), a40: w(40, 'a', 2), forced: w(40, 'forced'), one40: w(40, 'one'),
      every: w(41, 'every'), except: w(41, 'except'), nobody: w(41, 'nobody'), else41: w(41, 'else'), e41: L(41).end,
    };
    this.START = L(37).start;
    this.FROM = this.START - 1.2;
    this.V = { a0: must('7^0', 1), r: must('2^3 × 2^2', must('2^(3+2)', 32)) };
    // đo trước: chữ không chạm mép phải / nhân vật
    if (X + dmW('SAME CHOICE AS LAST VIDEO: NEGATIVE NUMBERS', 5) > 1824) throw new Error('c5: dòng gọi lại quá rộng');
    if (X + dmW('A CONVENTION?', 9) > 1280) throw new Error('c5: câu hỏi chạm nhân vật');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.e37, kind: 'question' },           // "A CONVENTION?" (xa whoosh chuyển trang)
      { t: T.zero39, kind: 'tick' },            // mũi tên sang ô 0
      { t: T.one40, kind: 'beep' },             // A^0 = 1 hiện (correct dành cho c4)
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    ink(g, d => {
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'ACT II', 'CHOICE, THEN NO CHOICE');
      annunciators(d, ['×']);
      this.draw(d, t);
    });
    // nhân vật: khoanh tay hoài nghi lúc "is this a convention / honest answer"; rời khung bằng cách tụt xuống
    const kIn = prog(t, T.conv - 0.5, T.conv - 0.1), out = smooth(prog(t, T.proved + 0.6, T.proved + 1.3));
    if (kIn > 0 && out < 1) figure(g, 'crossed', 1640, 1080 + out * 820, 760, kIn);
  }
  draw(d, t) {
    const T = this.T;
    // câu hỏi — gõ từ FROM + 0.3
    dm(d, 'A CONVENTION?', X, 150, 9, C.ink, { k: prog(t, this.FROM + 0.3, T.conv + 0.35) });
    // luật nhân luỹ thừa
    if (t > T.rule - 0.1) dm(d, 'A^M^ × A^N^ = A^M+N^', X, 262, 7, C.ink, { k: prog(t, T.rule - 0.1, T.proved) });
    // dải ô số mũ: chờ sẵn (viền chấm) từ đầu cảnh
    const sx = i => X + i * 170, sy = 420, sw = 150, sh = 150, dh = 104;
    dm(d, 'EXPONENT', X, sy - 70, 4, C.dim, { k: prog(t, this.FROM + 0.5, this.FROM + 1.2) });
    const lit = [null, T.n1, T.n2, T.n3, T.so];
    for (let i = 0; i < 5; i++) {
      const x = sx(i);
      const box = (col, a) => {
        for (const yy of [sy, sy + sh]) dots(d, x, yy, x + sw, yy, `rgba(${col},${a})`, { step: 10 });
        for (const xx of [x, x + sw]) dots(d, xx, sy, xx, sy + sh, `rgba(${col},${a})`, { step: 10 });
      };
      if (i === 0) {
        box(C.inkRGB, t > T.zero39 ? 0.6 : 0.25);
        const one = t >= T.one40, z = t >= T.zero39;          // ô ghi SỐ MŨ 0; giá trị 1 ghi bên dưới
        seg7(d, z ? '0' : 'X', x + (sw - dh * 0.5) / 2 - 4, sy + (sh - dh) / 2, dh, C.ink);
        if (z && !one) dm(d, 'A^0^ = ?', x + sw / 2, sy + sh + 24, 4, C.ink, { align: 'center', k: prog(t, T.zero39, T.zero39 + 0.3) });
        if (one) dm(d, [['A^0^ = ', C.ink], ['1', C.one]], x + sw / 2, sy + sh + 24, 4, C.ink, { align: 'center', k: prog(t, T.one40, T.one40 + 0.3) });
        continue;
      }
      const on = t >= lit[i];
      box(C.inkRGB, on ? 0.55 : 0.22);
      seg7(d, on ? String(i) : 'X', x + (sw - dh * 0.5) / 2 - 4, sy + (sh - dh) / 2, dh, C.ink);
    }
    // "…" sau ô 4
    if (t > T.so) dm(d, '...', sx(5) + 10, sy + sh / 2 - 6, 5, C.ink, { k: prog(t, T.so, T.so + 0.3), ghost: false });
    // ngoặc PROVED dưới ô 1…4
    if (t > T.proved - 0.1) {
      const k = prog(t, T.proved - 0.1, T.proved + 0.4), x0 = sx(1), x1 = x0 + (sx(5) + 60 - x0) * k, yb = sy + sh + 22;
      d.fillStyle = C.ink; d.fillRect(x0, yb, x1 - x0, 4); d.fillRect(x0, yb - 14, 4, 18);
      if (k >= 1) d.fillRect(x1 - 4, yb - 14, 4, 18);
      dm(d, 'PROVED: COUNTING EXPONENTS', x0, yb + 26, 5, C.ink, { k: prog(t, T.proved + 0.1, T.counting + 0.8) });
    }
    // mũi tên chấm từ ô 1 sang ô 0: kéo luật sang số mũ 0
    if (t > T.zero39 - 0.2) {
      const k = prog(t, T.zero39 - 0.2, T.zero39 + 0.25), ya = sy - 22;
      dots(d, sx(1) + sw / 2, ya, sx(1) + sw / 2 - (sx(1) - sx(0)) * k, ya, C.ink, { step: 10, size: 5 });
      if (k >= 1) dm(d, '←', sx(0) + sw / 2 - 12, ya - 14, 4, C.ink, { ghost: false });
    }
    // lựa chọn + gọi lại bài trước + nguyên tắc
    const yl = 720;
    if (t > T.choice39 - 0.3) dm(d, [['ZERO TOO? ', C.ink], ['A CHOICE', C.ink]], X, yl, 6, C.ink, { k: prog(t, T.zero39 + 0.3, T.choice39 + 0.4) });
    if (t > T.same - 0.1) dm(d, 'SAME CHOICE AS LAST VIDEO: NEGATIVE NUMBERS', X, yl + 76, 5, C.dim, { k: prog(t, T.same - 0.1, T.numbers + 0.5) });
    if (t > T.keep - 0.1) dm(d, 'KEEP THE RULES THAT ALREADY WORK', X, yl + 134, 5, C.ink, { k: prog(t, T.keep - 0.1, T.work + 0.3) });
    // rồi: bị ép — bên phải dải ô
    const xr = 1190;
    if (t > T.once - 0.1) dm(d, 'THEN: FORCED', xr, 380, 6, C.ink, { k: prog(t, T.nothing40 - 0.3, T.forced + 0.2) });
    if (t > T.a40 - 0.1) dm(d, [['A^0^ = ', C.ink], [t >= T.one40 ? '1' : ' ', C.one]], xr, 490, 12, C.ink, { k: prog(t, T.a40 - 0.1, T.one40 + 0.05) });
    // mọi a ≠ 0
    if (t > T.every - 0.1) dm(d, 'A ≠ 0: NOBODY PICKS ANYTHING ELSE', X, 960, 5, C.ink, { k: prog(t, T.every - 0.1, T.else41 + 0.2) });
  }
}
