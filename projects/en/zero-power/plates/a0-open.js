// a0 · Cold open (p1) — cảnh MẪU của đạo diễn. Cả cảnh là MỘT màn LCD cuộn dọc qua bốn trang (cuộn = máy cuộn màn):
//   0 lịch sử phép tính: 2³ = 2×2×2 = 8, 2¹ = 2, 2⁰ = 1 (1 lam = thanh ghi ×) → "WHY 1?", "×0 TIMES = NOTHING?" (ponder)
//   1 "0^0" và năm cái máy trả lời: PYTHON 1 · JAVASCRIPT 1 · GOOGLE 1 · TI-84 ERR:DOMAIN · EXCEL #NUM! (pose-calculator,
//     màn trong tay nhấp nháy 1 → Err) — chỉ báo ERR bật, "1 ≠ ERR"
//   2 mục lục lời hứa: ba dòng đánh số 7 đoạn (three)
//   3 thanh ghi × = 1 ("NOT A TRICK · NOT NOTHING · NOT STARTED = 1"), rồi ô 0⁰ bị giành (contested), câu treo →
//     iris khép vào ô 0⁰ → đen kín → intro.
import { W, H, C, clamp, smooth, outCubic, prog, ground, ink, seg7, row, rowW, dm, dmW, annunciators, contested, register,
  dots, figure, onCalcScreen, lookup, must, iris } from '../kit.js';

const PAGE = 1080;                                     // mỗi trang màn cách nhau một khung

export default class Open {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['ponder', 'calculator', 'three'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      p3: w(0, 'three'), twos: w(0, 'twos'), two0: w(0, 'times'), eight: w(0, 'eight'), sense0: w(0, 'sense'),
      one1: w(1, 'one'), just: w(1, 'just'),
      zero2: w(2, 'zero'), textbook: w(2, 'textbook'), equals: w(2, 'equals'), calc2: w(2, 'calculator'), agrees: w(2, 'agrees'),
      why: L(3).start,
      counts: w(4, 'counts'), zero4: w(4, 'zero'), mult4: w(4, 'multiplying'), times4: w(4, 'times', 2),
      nothing5: w(5, 'nothing'), e5: L(5).end,
      stranger: w(6, 'stranger'), try6: w(6, 'try'), zz: w(6, 'zero', 2), e6: L(6).end,
      python: w(7, 'python'), js: w(7, 'javascript'), google: w(7, 'google'),
      ti: w(8, 'ti'), domain: w(8, 'domain'), excel: w(8, 'excel'), error8: w(8, 'error', 2),
      same: L(9).start, machines9: w(9, 'machines'), agree9: w(9, 'agree'),
      three10: w(10, 'three'), q1: L(11).start, q2: L(12).start, forced: w(12, 'forced'), q3: L(13).start, disagree: w(13, 'disagree'),
      going: w(14, 'going'), trick: w(14, 'trick'), nothing14: w(14, 'nothing'),
      havent: w(15, "haven't"), started: w(15, 'started'), stands: w(15, 'stands'), one15: w(15, 'one'),
      zz16: w(16, 'zero'), collide: w(16, 'collide'), see: w(16, 'see'), staircase: w(16, 'staircase'), end: L(16).end,
    };
    this.PAN = [L(6).start - 0.6, L(10).start - 0.6, L(14).start - 0.6];
    this.START = L(0).start; this.FROM = -0.6;
    this.V = { p3: must('2^3', 8), m3: must('2 × 2 × 2', 8), p1: must('2^1', 2), p0: must('2^0', 1), py: must('0^0', 1) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.p3, kind: 'beep' }, { t: T.eight, kind: 'beep' }, { t: T.one1, kind: 'beep' }, { t: T.equals, kind: 'beep' },
      { t: T.why, kind: 'question' }, { t: T.nothing5, kind: 'tick' },
      { t: T.try6, kind: 'beep' }, { t: T.python, kind: 'chip' },
      { t: T.domain, kind: 'error' }, { t: T.agree9, kind: 'tick' },
      { t: T.q1, kind: 'tick' }, { t: T.q3, kind: 'tick' },
      { t: T.stands, kind: 'correct' }, { t: T.collide, kind: 'snap' },
    ];
  }
  cam(t) {                                              // cuộn màn: mỗi trang trượt lên 0.9 s
    return this.PAN.reduce((y, a) => y + PAGE * smooth(prog(t, a, a + 0.9)), 0);
  }
  render(g, t) {
    const T = this.T, V = this.V, cy = this.cam(t);
    ground(g);
    const lit = t >= T.domain - 0.05 && t < this.PAN[1] + 0.9 ? ['×', 'ERR'] : ['×'];
    ink(g, d => {
      annunciators(d, lit);
      d.save(); d.translate(0, -cy);
      this.page0(d, t); this.page1(d, t); this.page2(d, t); this.page3(d, t);
      d.restore();
    });
    // nhân vật theo trang (toạ độ màn hình = trang − camera)
    const top = i => i * PAGE - cy;
    if (top(0) > -PAGE) figure(g, 'ponder', 1640, 1080 + top(0), 760, prog(t, T.why - 0.5, T.why - 0.15));
    if (Math.abs(top(1)) < PAGE) {
      const P = figure(g, 'calculator', 1590, 1080 + top(1), 800, prog(t, T.stranger - 0.2, T.stranger + 0.15));
      if (t > T.stranger) onCalcScreen(g, P, (s, w, h) => {
        const err = t >= T.ti;                         // màn trong tay: "1" khi các máy nói 1, "Err" khi TI nói lỗi
        const blink = t >= T.machines9 && Math.floor((t - T.machines9) * 2.2) % 2 === 1;
        const show = err && !blink ? 'Err' : '1';
        const tw = rowW(show, 84), col = show === '1' ? C.one : C.ink;
        row(s, show, w - 22 - tw, (h - 84) / 2, 84, { color: col });
      });
    }
    if (Math.abs(top(2)) < PAGE) figure(g, 'three', 1650, 1080 + top(2), 760, prog(t, T.three10 - 0.3, T.three10 + 0.05));
    // câu treo: iris khép vào ô 0⁰ (ô ở trang 3) → đen kín đúng lúc hết câu → intro
    if (t > T.see) iris(g, 960, 3 * PAGE - cy + 820, 1 - prog(t, T.see + 0.4, this.T.end + 0.5), 0);
  }

  // ── trang 0: lịch sử phép tính ──
  page0(d, t) {
    const T = this.T, V = this.V, X = 132, h = 112;
    if (t < this.PAN[0] - 1 + 0.9 + 2) {
      // 2³ = 2 × 2 × 2 = 8 — phím bấm vào theo lời
      row(d, [{ c: '2' }, { c: '3', sup: true }, { c: '=' }, { c: '2' }, { c: '×' }, { c: '2' }, { c: '×' }, { c: '2' }, { c: '=' }, { c: String(V.p3) }],
        X, 150, h, { k: prog(t, -0.3, 0.4) * 0.3 + prog(t, T.twos - 0.1, T.two0 + 1.1) * 0.55 + (t >= T.eight - 0.1 ? 0.15 : 0) });
      if (t > T.sense0) dm(d, 'MAKES SENSE', X + 1010, 192, 5, C.dim, { k: prog(t, T.sense0, T.sense0 + 0.5) });
      row(d, [{ c: '2' }, { c: '1', sup: true }, { c: '=' }, { c: String(V.p1) }], X, 330, h, { k: prog(t, T.one1 - 0.4, T.just + 0.3) });
      if (t > T.just + 0.6) dm(d, 'JUST 2, ON ITS OWN', X + 520, 372, 5, C.dim, { k: prog(t, T.just + 0.6, T.just + 1.4) });
      // 2⁰ = 1: số 1 lam = thanh ghi nhân (vật xuyên suốt)
      const k0 = prog(t, T.zero2 - 0.4, T.zero2 + 0.2), one = t >= T.equals;
      row(d, [{ c: '2' }, { c: '0', sup: true }, { c: '=' }, { c: one ? '1' : 'X', col: C.one }], X, 510, h, { k: k0 });
      if (one) dm(d, [['TEXTBOOK  ', C.dim], ['1', C.one]], X + 520, 532, 5, C.ink, { k: prog(t, T.equals, T.equals + 0.6) });
      if (t > T.calc2) dm(d, [['CALCULATOR ', C.dim], ['1', C.one]], X + 520, 586, 5, C.ink, { k: prog(t, T.calc2, T.agrees) });
      // Why one? — dấu hỏi lớn
      if (t > T.why - 0.1) dm(d, [['WHY ', C.ink], ['1', C.one], ['?', C.ink]], X, 720, 14, C.ink, { k: prog(t, T.why - 0.1, T.why + 0.35) });
      // ×0 lần = không có gì?
      if (t > T.counts) dm(d, 'MULTIPLY ZERO TIMES', X, 880, 6, C.ink, { k: prog(t, T.mult4 - 0.2, T.times4 + 0.3) });
      if (t > T.nothing5 - 0.15) dm(d, '= NOTHING?', X + dmW('MULTIPLY ZERO TIMES ', 6), 880, 6, C.ink, { k: prog(t, T.nothing5 - 0.15, T.nothing5 + 0.5) });
    }
  }

  // ── trang 1: 0^0 và năm cái máy ──
  page1(d, t) {
    const T = this.T, V = this.V, y0 = PAGE, X = 132;
    if (t < this.PAN[0] - 0.2 || t > this.PAN[1] + 1) return;
    dm(d, 'IT GETS STRANGER', X, y0 + 150, 5, C.dim, { k: prog(t, T.stranger - 0.2, T.stranger + 0.5) });
    row(d, [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: 'X' }], X, y0 + 210, 150, { k: prog(t, T.try6 - 0.1, T.zz + 0.4) });
    const rows = [
      ['PYTHON', T.python, '1'], ['JAVASCRIPT', T.js, '1'], ['GOOGLE', T.google, '1'],
      ['TI-84', T.ti, 'ERR:DOMAIN'], ['EXCEL', T.excel, '#NUM!'],
    ];
    if (V.py !== 1) throw new Error('0**0 của JS phải là 1');     // "JAVASCRIPT 1" là kết quả thật của máy này
    rows.forEach(([name, at, out], i) => {
      if (t < at - 0.15) return;
      const y = y0 + 440 + i * 104, k = prog(t, at - 0.15, at + 0.4);
      dm(d, name, X, y + 18, 6, C.ink, { k: k * 2 });
      dots(d, X + 400, y + 40, X + 700, y + 40, `rgba(24,33,27,0.3)`, { k });
      if (k < 0.6) return;
      if (out === '1') seg7(d, '1', X + 760, y - 4, 76, C.one);
      else dm(d, out, X + 740, y + 18, 6, C.ink);
    });
    if (t > T.machines9) {                                 // cùng câu hỏi, máy không đồng ý
      const k = prog(t, T.machines9, T.agree9 + 0.3);
      dm(d, [['1', C.one], [' ≠ ', C.ink], ['ERR', C.ink]], X + 600, y0 + 236, 9, C.ink, { k });
      dm(d, 'SAME QUESTION · NO AGREEMENT', X + 600, y0 + 336, 4, C.dim, { k: k * 2 });
    }
  }

  // ── trang 2: mục lục lời hứa ──
  page2(d, t) {
    const T = this.T, y0 = 2 * PAGE, X = 132;
    if (t < this.PAN[1] - 0.2 || t > this.PAN[2] + 1) return;
    dm(d, 'THREE QUESTIONS', X, y0 + 160, 6, C.dim, { k: prog(t, T.three10 - 0.2, T.three10 + 0.6) });
    const Q = [
      [T.q1, [['WHY IS A^0^ = ', C.ink], ['1', C.one], [' ?', C.ink]]],
      [T.q2, [['CHOSEN... OR FORCED ON US?', C.ink]]],
      [T.q3, [['WHAT IS ', C.ink], ['0^0^', C.ink], [' ?  WHY DO', C.ink]], [['MACHINES DISAGREE?', C.ink]]],
    ];
    Q.forEach(([at, l1, l2], i) => {
      const y = y0 + 280 + i * 220;
      // ô chờ (viền đứt) có sẵn khi trang tới — không khung trống
      dots(d, X, y + 170, X + 1260, y + 170, 'rgba(24,33,27,0.22)', { step: 12 });
      if (t < at - 0.2) { seg7(d, String(i + 1), X, y, 120, 'rgba(24,33,27,0.18)'); return; }
      seg7(d, String(i + 1), X, y, 120, C.ink);
      dm(d, l1, X + 130, y + 10, 7, C.ink, { k: prog(t, at, at + 1.2) });
      if (l2) dm(d, l2, X + 130, y + 90, 7, C.ink, { k: prog(t, at + 1.0, at + 2.2) });
    });
  }

  // ── trang 3: thanh ghi × = 1, rồi ô 0⁰ bị giành ──
  page3(d, t) {
    const T = this.T, y0 = 3 * PAGE;
    if (t < this.PAN[2] - 0.2) return;
    dm(d, 'NOT A TRICK', 960, y0 + 150, 7, C.ink, { align: 'center', k: prog(t, T.trick - 0.2, T.trick + 0.4) });
    dm(d, 'NOT NOTHING', 960, y0 + 240, 7, C.ink, { align: 'center', k: prog(t, T.nothing14 - 0.2, T.nothing14 + 0.4) });
    // thanh ghi lớn: × [1] — "chưa nhân lần nào"
    const rx = 960 - 260, ry = y0 + 360, k = prog(t, this.PAN[2] + 0.4, this.PAN[2] + 0.9);
    if (k > 0) {
      d.fillStyle = `rgba(${C.oneRGB},0.085)`; d.fillRect(rx, ry - 20, 520, 220);
      d.fillStyle = C.one; d.fillRect(rx, ry - 20, 520, 5); d.fillRect(rx, ry + 195, 520, 5);
      dm(d, '×', rx + 40, ry + 50, 14, C.one, { ghost: false });
      if (t >= T.stands) seg7(d, '1', rx + 360, ry + 10, 160, C.one); else seg7(d, 'X', rx + 360, ry + 10, 160, C.one);
      dm(d, 'NOTHING MULTIPLIED YET', 960, ry + 240, 5, C.dim, { align: 'center', k: prog(t, T.havent - 0.3, T.stands) });
    }
    // ô 0⁰: hai đường (1 lam từ trái, 0 gỉ từ phải) đâm vào cùng một ô
    if (t > T.zz16 - 0.3) {
      const cx = 960, cyy = y0 + 820, w = 260, h = 170, kk = prog(t, T.zz16 - 0.3, T.collide);
      dots(d, 300, cyy, 300 + (cx - w / 2 - 20 - 300) * kk, cyy, C.one, { step: 12, size: 6 });
      dots(d, 1620, cyy, 1620 - (1620 - (cx + w / 2 + 20)) * kk, cyy, C.zero, { step: 12, size: 6 });
      seg7(d, '1', 210, cyy - 60, 120, C.one); seg7(d, '0', 1650, cyy - 60, 120, C.zero);
      contested(d, cx - w / 2, cyy - h / 2, w, h, prog(t, T.collide - 0.2, T.collide + 0.4));
      dm(d, '0^0^', cx, cyy - h / 2 - 56, 6, C.ink, { align: 'center', k: kk * 2 });
    }
  }
}
