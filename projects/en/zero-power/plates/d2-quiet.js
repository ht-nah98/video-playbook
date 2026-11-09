// d2 · The rule goes quiet (p2). Hai trang màn, cuộn một lần ("it still narrows things down"):
//   0  A^M × A^N = A^M+N · "THE RULE FAILS AT ZERO" → âm bản đúng chữ FAILS + ERR → "THE RULE GOES QUIET" ·
//      gọi lại dòng của c2 "A^M ≠ 0 → DIVIDE" (khung chấm) → "A = 0 → A^M = 0" · 0 × 0⁰ = 0 (7 đoạn) ·
//      "0 × ANYTHING = 0", thử 1, 7, 1000000 → PASSES · "EVERY VALUE PASSES" · "THE RULE HAS STOPPED DECIDING"
//   1  m = n = 0: A^0 × A^0 = A^0+0 = A^0 → 0⁰ × 0⁰ = 0⁰ → X × X = X · thử 2 × 2 = 4 ≠ 2, 0 × 0 = 0, 1 × 1 = 1 ·
//      dải ứng viên 0 · 1/2 · 1 · 2 · 7 · 1000000 bị gạch loại (mực, không âm bản) trừ 0 và 1 · "IT WON'T PICK: 0 OR 1 ?"
//      Mascot shrug (toàn thân, CROP 0.45) lúc "it just won't pick between them".
import { C, prog, smooth, ground, ink, card, annunciators, dm, dmW, row, dots, wrong, figure, lookup, must } from '../kit.js';

const PAGE = 1080, X = 132, XR = 820;
/** Tỉ lệ mốc đã qua (bấm token đúng lúc từng chữ được đọc). */
const steps = (t, at) => at.filter(a => t >= a - 0.05).length / at.length;

export default class Quiet {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      mult: w(46, 'multiplication'), rule: w(46, 'rule'), doesnt: w(46, "doesn't"), brk: w(46, 'break'),
      something: w(46, 'something'), stranger: w(46, 'stranger'), goes: w(46, 'goes'), quiet: w(46, 'quiet'),
      remember: w(47, 'remember'), because: w(47, 'because'), a47: w(47, 'a'), zero47: w(47, 'zero'), could: w(47, 'could'), divide: w(47, 'divide'),
      with: w(48, 'with'), am0: w(48, 'zero', 2), says48: w(48, 'says'),
      e0: w(48, 'zero', 3), e1: w(48, 'times'), e2: w(48, 'zero', 4), e3: w(48, 'zero', 5), e4: w(48, 'equals'), e5: w(48, 'zero', 6),
      zero49: w(49, 'zero'), anything: w(49, 'anything'), is49: w(49, 'zero', 2),
      one49: w(49, 'one'), seven: w(49, 'seven'), million: w(49, 'million'), every: w(49, 'every'), passes: w(49, 'passes'),
      rule50: w(50, 'rule'), stopped: w(50, 'stopped'), deciding: w(50, 'deciding'),
      narrows: w(51, 'narrows'), both: w(51, 'both'), exps: w(51, 'exponents'),
      f0: w(51, 'zero', 2), f1: w(51, 'zero', 3), f2: w(51, 'times'), f3: w(51, 'itself'), f4: w(51, 'equals'), f5: w(51, 'zero', 4), f6: w(51, 'zero', 5),
      end51: L(51).end,
      only: w(52, 'only'), numbers: w(52, 'numbers'), zero52: w(52, 'zero'), one52: w(52, 'one'),
      throws: w(53, 'throws'), out: w(53, 'out'), except: w(53, 'except'), those: w(53, 'those'), two: w(53, 'two'), wont: w(53, "won't"), pick: w(53, 'pick'),
      them: w(53, 'them'),
    };
    this.START = L(46).start;
    this.FROM = this.START - 1.2;
    this.PAN = this.T.narrows - 0.1;
    this.V = {
      tries: [[1, must('0 × 1', 0)], [7, must('0 × 7', 0)], [1000000, must('0 × 1000000', 0)]],
      sq2: must('2 × 2', 4), sq0: must('0 × 0', 0), sq1: must('1 × 1', 1),
    };
    if (this.V.sq2 === 2) throw new Error('2 phải bị loại');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.brk, kind: 'error' }, { t: T.remember + 0.3, kind: 'tick' }, { t: T.e0, kind: 'beep' }, { t: T.one49, kind: 'beep' },
      { t: T.stopped, kind: 'tick' }, { t: T.exps, kind: 'beep' }, { t: T.f4 + 0.35, kind: 'beep' }, { t: T.one52, kind: 'beep' },
      { t: T.pick, kind: 'question' },
    ];
  }
  render(g, t) {
    const T = this.T, cy = PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9));
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.brk && t < this.PAN + 0.9 ? ['×', 'ERR'] : ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT III', 'THE RULE GOES QUIET');
      d.save(); d.beginPath(); d.rect(0, 112, 1920, 968); d.clip();   // nội dung cuộn không chạy qua thẻ mục
      d.translate(0, -cy);
      if (t < this.PAN + 1) this.page0(d, t);
      if (t > this.PAN - 0.2) this.page1(d, t);
      d.restore();
    });
    // nhún vai: "it just won't pick between them" — rời khung cùng cú trượt sang cảnh sau
    figure(g, 'shrug', 1650, 1080, 760, prog(t, T.except, T.except + 0.35));
  }

  page0(d, t) {
    const T = this.T, V = this.V;
    // quy tắc nhân
    dm(d, 'A^M^ × A^N^ = A^M+N^', X, 150, 7, C.ink, { k: prog(t, T.mult - 0.1, T.rule + 0.3) });
    // hiểu lầm: "THE RULE FAILS AT ZERO" → âm bản đúng chữ FAILS
    if (t > T.rule) {
      const y = 246, x0 = X + dmW('THE RULE ', 6), x1 = x0 + dmW('FAILS', 6);
      dm(d, 'THE RULE FAILS AT ZERO', X, y, 6, C.ink, { k: prog(t, T.rule, T.doesnt + 0.1) });
      wrong(d, x0, y, x1, y + 6 * 7, prog(t, T.brk - 0.05, T.brk + 0.3));
      if (t > T.something - 0.1) dm(d, 'IT DOES SOMETHING STRANGER:', X, 318, 4, C.dim, { k: prog(t, T.something - 0.1, T.stranger + 0.4) });
      if (t > T.goes - 0.1) dm(d, 'THE RULE GOES QUIET', X, 364, 6, C.ink, { k: prog(t, T.goes - 0.1, T.quiet + 0.35) });
    }
    // gọi lại dòng của c2 (khung chấm): vì A^M ≠ 0 nên chia được
    const kb = prog(t, T.remember - 0.1, T.remember + 0.4);
    if (kb > 0) {
      const bx = 1150, by = 156, bw = 640, bh = 112, col = 'rgba(24,33,27,0.5)';
      dm(d, 'REMEMBER (ACT II)', bx, by - 34, 3, C.dim, { k: kb * 1.5 });
      dots(d, bx, by, bx + bw, by, col, { step: 10, k: kb }); dots(d, bx, by + bh, bx + bw, by + bh, col, { step: 10, k: kb });
      dots(d, bx, by, bx, by + bh, col, { step: 10, k: kb }); dots(d, bx + bw, by, bx + bw, by + bh, col, { step: 10, k: kb });
      const k = (6 * prog(t, T.a47 - 0.05, T.zero47 + 0.2) + 10 * prog(t, T.could - 0.1, T.divide + 0.35)) / 16;
      dm(d, 'A^M^ ≠ 0 → DIVIDE', bx + 34, by + 36, 6, C.ink, { k });
    }
    // bây giờ a = 0
    // điều kiện của c2 giờ hỏng: nứt qua dấu "≠" (mực răng cưa, không âm bản — §62) + nhãn
    if (t > T.am0 - 0.05) {
      const nx = 1150 + 34 + dmW('A^M^ ', 6) + 6 + 15, y0 = 156 + 36 - 18, y1 = 156 + 36 + 42 + 18, kc = prog(t, T.am0 - 0.05, T.am0 + 0.3);
      d.strokeStyle = C.ink; d.lineWidth = 5; d.lineJoin = 'miter'; d.beginPath(); d.moveTo(nx + 4, y0);
      for (let i = 1; i <= 6; i++) d.lineTo(nx + (i % 2 ? -10 : 10), y0 + (y1 - y0) * Math.min(i / 6, kc));
      d.stroke();
      dm(d, [['A^M^ = ', C.ink], ['0', C.zero], [" → CAN'T DIVIDE", C.ink]], 1184, 384, 5, C.ink, { k: prog(t, T.am0 + 0.2, T.says48) });
    }
    if (t > T.with - 0.05) dm(d, [['A = ', C.ink], ['0', C.zero], ['  →  A^M^ = ', C.ink], ['0', C.zero]], 1184, 318, 6, C.ink,
      { k: prog(t, T.with - 0.05, T.am0 + 0.3) });
    // quy tắc nói gì: 0 × 0⁰ = 0
    if (t > T.says48 - 0.2) {
      dm(d, 'THE RULE NOW SAYS:', X, 446, 4, C.dim, { k: prog(t, T.says48 - 0.2, T.says48 + 0.3) });
      row(d, [{ c: '0', col: C.zero }, { c: '×' }, { c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: '0', col: C.zero }], X, 496, 120,
        { k: steps(t, [T.e0, T.e1, T.e2, T.e3, T.e4, T.e5]) });
    }
    if (t > T.zero49 - 0.05) dm(d, [['0', C.zero], [' × ANYTHING = ', C.ink], ['0', C.zero]], X, 680, 6, C.ink,
      { k: prog(t, T.zero49 - 0.05, T.is49 + 0.3) });
    // thử 1, 7, một triệu — giá trị nào cũng qua
    [[T.one49, 0], [T.seven, 1], [T.million, 2]].forEach(([at, i]) => {
      const y = 456 + i * 92, [v, r] = V.tries[i];
      dots(d, XR, y + 78, XR + 820, y + 78, 'rgba(24,33,27,0.18)', { step: 12, k: prog(t, T.anything, T.anything + 0.5) });
      if (t < at - 0.15) return;
      const B = row(d, [{ c: '0', col: C.zero }, { c: '×' }, ...[...String(v)].map(c => ({ c, col: v === 1 ? C.one : C.ink })), { c: '=' }, { c: String(r), col: C.zero }],
        XR, y, 64, { k: prog(t, at - 0.15, at + 0.2) });
      dm(d, 'PASSES', B.at(-1)[1] + 40, y + 20, 4, C.dim, { k: prog(t, at + 0.2, at + 0.5) });
    });
    if (t > T.every - 0.05) dm(d, 'EVERY VALUE PASSES', XR, 760, 6, C.ink, { k: prog(t, T.every - 0.05, T.passes + 0.3) });
    if (t > T.rule50 - 0.1) dm(d, 'THE RULE HAS STOPPED DECIDING', X, 880, 8, C.ink, { k: prog(t, T.rule50 - 0.1, T.deciding + 0.1) });
  }

  page1(d, t) {
    const T = this.T, V = this.V, Y = PAGE;
    dm(d, 'IT STILL NARROWS THINGS DOWN', X, Y + 150, 5, C.dim, { k: prog(t, this.PAN + 0.5, this.PAN + 1.2) });
    // ô chờ của các dòng sắp tới (không khung trống khi trang tới)
    for (const yy of [Y + 386, Y + 546, Y + 686, Y + 850]) dots(d, X, yy, X + 1150, yy, 'rgba(24,33,27,0.16)', { step: 12, k: prog(t, this.PAN + 0.4, this.PAN + 1.0) });
    if (t > T.both - 0.1) {
      dm(d, 'BOTH EXPONENTS 0:', X, Y + 204, 4, C.dim, { k: prog(t, T.both - 0.1, T.exps + 0.3) });
      dm(d, 'A^0^ × A^0^ = A^0+0^ = A^0^', X, Y + 284, 8, C.ink, { k: prog(t, T.exps, T.f0 - 0.05) });
    }
    // 0⁰ × 0⁰ = 0⁰ (7 đoạn), rồi đặt X = 0⁰
    if (t > T.f0 - 0.1) {
      const tk = [{ c: '0' }, { c: '0', sup: true }, { c: '×' }, { c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: '0' }, { c: '0', sup: true }];
      row(d, tk, X, Y + 410, 110, { k: steps(t, [T.f0, T.f1, T.f2, T.f3, T.f3 + 0.15, T.f4, T.f5, T.f6]) });
    }
    if (t > T.f6 - 0.1) {
      dm(d, 'CALL 0^0^ X:', XR, Y + 410, 4, C.dim, { k: prog(t, T.f6 - 0.1, T.f6 + 0.25) });
      dm(d, 'X × X = X', XR, Y + 460, 8, C.ink, { k: prog(t, T.f6 + 0.1, T.only) });
    }
    // which numbers equal their own square?
    if (t > T.only - 0.05) {
      dm(d, 'WHICH NUMBERS EQUAL THEIR OWN SQUARE?', X, Y + 570, 4, C.dim, { k: prog(t, T.only - 0.05, T.numbers + 0.4) });
      const y = Y + 620;
      let x = X;
      const tries = [
        [T.numbers, [['2 × 2 = ' + V.sq2 + ' ≠ 2', C.dim]]],
        [T.zero52, [['0', C.zero], [' × ', C.ink], ['0', C.zero], [' = ', C.ink], [String(V.sq0), C.zero]]],
        [T.one52, [['1', C.one], [' × ', C.ink], ['1', C.one], [' = ', C.ink], [String(V.sq1), C.one]]],
      ];
      for (const [at, runs] of tries) {
        if (t > at - 0.1) dm(d, runs, x, y, 5, C.ink, { k: prog(t, at - 0.1, at + 0.3) });
        x += dmW(runs, 5) + 70;
      }
    }
    // ứng viên: mọi số bị loại trừ 0 và 1
    if (t > T.throws - 0.35) {
      const items = [['0', C.zero, true], ['1/2', C.ink, false], ['1', C.one, true], ['2', C.ink, false], ['7', C.ink, false], ['1000000', C.ink, false]];
      const y = Y + 740, kin = prog(t, T.throws - 0.35, T.throws + 0.05);
      let x = X, nOut = 0;
      items.forEach(([s, col, keep], i) => {
        const w = dmW(s, 7);
        dm(d, s, x, y, 7, col, { k: clamp01(kin * items.length - i) });
        if (!keep) {                                   // gạch loại (mực mảnh) lần lượt — không phải âm bản
          const at = T.out + (T.except - T.out) * nOut++ / 3;
          d.fillStyle = C.ink; d.fillRect(x - 8, y + 22, (w + 16) * prog(t, at, at + 0.25), 6);
        } else if (t > T.those - 0.05) {               // khoanh hai số còn lại (mực)
          const kk = prog(t, T.those - 0.05, T.two + 0.2);
          d.strokeStyle = C.ink; d.lineWidth = 4; d.strokeRect(x - 16, y - 16, (w + 32) * kk, 49 + 32);
        }
        x += w + 64;
      });
    }
    if (t > T.wont - 0.1) dm(d, [["IT WON'T PICK:  ", C.ink], ['0', C.zero], [' OR ', C.ink], ['1', C.one], [' ?', C.ink]], X, Y + 880, 8, C.ink,
      { k: prog(t, T.wont - 0.1, T.them + 0.1) });
  }
}
const clamp01 = v => Math.max(0, Math.min(1, v));
