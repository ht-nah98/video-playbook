// g1 · Putting it together (mở Act VI, p2 câu 98–104). Tóm tắt = vẽ lại THU NHỎ hình đã có, màn cuộn dọc như a0:
//   0 (98)       A^0 = 1 (A ≠ 0) · thanh ghi × [1] "WHERE × STARTS" · cầu thang 2³…2⁰ đáp xuống 1 lam → nối vào thanh ghi
//   1 (99)       "A CHOICE IN ONE SENSE" · A^M × A^0 = A^M "KEEP THE RULE" → A^0 = 1 FORCED (pose ok)
//   2 (100–102)  bảng xʸ thu nhỏ, ô 0⁰ tách đôi: AS A VALUE = 1 (lam) | AS A LIMIT = WORK IT OUT · A NUMBER | WHERE IT'S HEADING
//   3 (103–104)  máy cãi nhau: 1 = ALGEBRA · ERR = A WARNING SIGN · "ON A TEST: YOUR COURSE'S DEFINITION"
import { W, C, smooth, prog, ground, ink, card, actTitle, seg7, row, dm, dmW, annunciators, checker, bracket, register, dots,
  figure, lookup, must } from '../kit.js';

const PAGE = 1080;
const box = (d, x, y, w, h, col = `rgba(${C.inkRGB},0.6)`, lw = 3) => { d.strokeStyle = col; d.lineWidth = lw; d.strokeRect(x, y, w, h); };
const dashBox = (d, x, y, w, h, k = 1) => {
  const c = `rgba(${C.inkRGB},0.22)`;
  dots(d, x, y, x + w, y, c, { step: 12, k }); dots(d, x, y + h, x + w, y + h, c, { step: 12, k });
  dots(d, x, y, x, y + h, c, { step: 12, k }); dots(d, x + w, y, x + w, y + h, c, { step: 12, k });
};

/** Ô 0⁰ tranh chấp cỡ nhỏ (contested của kit tràn ngoặc khi ô < ~200 px): caro + ngoặc + 1 lam | 0 gỉ. */
function miniCell(d, x, y, w, h, k = 1) {
  if (k <= 0) return;
  checker(d, x + 6, y + 6, x + w - 6, y + h - 6, 5, 0.10 * Math.min(1, k * 2));
  if (k > 0.25) bracket(d, x + 4, y + 4, x + w - 4, y + h - 4, Math.min(22, w * 0.18), 5, C.ink);
  const s = h * 0.5, yy = y + (h - s) / 2;
  if (k > 0.5) seg7(d, '1', x + w / 2 - s * 0.5 - 10, yy, s, C.one);
  if (k > 0.5) seg7(d, '0', x + w / 2 + 10, yy, s, C.zero);
}

export default class Together {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    this.T = {
      s98: L(98).start, except: w(98, 'except'), one98: w(98, 'one'), mult: w(98, 'multiplying'), starts: w(98, 'starts'),
      stair: w(98, 'staircase'), lands: w(98, 'lands'), too: w(98, 'too'),
      s99: L(99).start, choice: w(99, 'choice'), chose: w(99, 'chose'), keep: w(99, 'keep'), working: w(99, 'working'),
      once: w(99, 'once'), had: w(99, 'had'), one99: w(99, 'one', 2),
      s100: L(100).start, lives: w(100, 'lives'), value: w(100, 'value'), counting: w(100, 'counting'), algebra: w(100, 'algebra'),
      programming: w(100, 'programming'), one100: w(100, 'one'),
      shape: w(101, 'shape'), calculus: w(101, 'calculus'), indet: w(101, 'indeterminate'), calculate: w(101, 'calculate'),
      contradict: w(102, 'contradict'), number: w(102, 'number'), moving: w(102, 'moving'), heading: w(102, 'heading'),
      s103: L(103).start, machines: w(103, 'machines'), say: w(103, 'say'), algebra103: w(103, 'algebra'), error: w(103, 'error'),
      warning: w(103, 'warning'), test: w(104, 'test'), zero104: w(104, 'zero'), course: w(104, 'course'), defines: w(104, 'defines'),
      textbooks: w(104, 'textbooks'), undefined: w(104, 'undefined'), e104: L(104).end,
    };
    this.START = L(98).start;
    this.FROM = Math.max(this.START - 2.6, L(97).end + 0.5);
    this.PAN = [L(99).start - 0.5, L(100).start - 0.5, L(103).start - 0.5];
    // số trên hình
    this.V = {
      stair: [[3, must('2^3', 8)], [2, must('2^2', 4)], [1, must('2^1', 2)], [0, must('2^0', 1)]],
      tbl: [['0', [null, must('0^1', 0), must('0^2', 0), must('0^3', 0)]],
        ['1/2', [must('(1/2)^0', 1), '1/2', must('(1/2)^2', 0.25) && '1/4', must('(1/2)^3', 0.125) && '1/8']],
        ['2', [must('2^0', 1), must('2^1', 2), must('2^2', 4), must('2^3', 8)]],
        ['5', [must('5^0', 1), must('5^1', 5), must('5^2', 25), must('5^3', 125)]]],
    };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.one98, kind: 'beep' }, { t: T.lands, kind: 'tick' },
      { t: T.chose, kind: 'beep' }, { t: T.had, kind: 'correct' }, { t: T.value, kind: 'beep' },
      { t: T.one100, kind: 'beep' }, { t: T.calculate, kind: 'tick' }, { t: T.number, kind: 'beep' },
      { t: T.machines, kind: 'beep' }, { t: T.error, kind: 'tick' }, { t: T.zero104, kind: 'beep' }, { t: T.undefined, kind: 'tick' },
    ];
  }
  cam(t) { return this.PAN.reduce((y, a) => y + PAGE * smooth(prog(t, a, a + 0.9)), 0); }
  render(g, t) {
    const T = this.T, cy = this.cam(t);
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.error - 0.05 && t < T.test ? ['×', 'ERR'] : ['×']);
      actTitle(d, t, this.START, 'VI', 'PUTTING IT TOGETHER');
      card(d, prog(t, this.START, this.START + 0.8), 'ACT VI', 'PUTTING IT TOGETHER');
      d.save(); d.beginPath(); d.rect(0, 120, W, 960); d.clip(); d.translate(0, -cy);
      this.page0(d, t); this.page1(d, t); this.page2(d, t); this.page3(d, t);
      d.restore();
    });
    // pose ok quanh "a to the zero had to be one" — vào bằng bật lên, ra bằng trượt xuống đáy
    const kin = prog(t, T.once - 0.2, T.once + 0.15), out = smooth(prog(t, T.once + 4.4, T.once + 4.85));
    if (kin > 0 && out < 1) figure(g, 'ok', 1640, 1080 + 820 * out, 760, kin);
  }

  // ── trang 0: A^0 = 1 · thanh ghi · cầu thang ──
  page0(d, t) {
    const T = this.T, V = this.V;
    if (t < this.START - 0.3 || t > this.PAN[0] + 1) return;
    const k0 = prog(t, this.START - 0.1, T.one98);
    row(d, [{ c: 'A' }, { c: '0', sup: true }, { c: '=' }, { c: t >= T.one98 - 0.05 ? '1' : 'X', col: C.one }], 132, 160, 120, { k: k0 });
    if (t > T.except) dm(d, 'FOR ANY A ≠ 0', 560, 210, 5, C.dim, { k: prog(t, T.except, T.except + 0.8) });
    // thanh ghi × [1]
    const kr = prog(t, T.mult - 0.1, T.mult + 0.6);
    if (kr <= 0) dashBox(d, 760, 640, 196, 90, prog(t, this.START, this.START + 1));
    register(d, 760, 652, '×', 1, C.one, { k: kr });
    if (t > T.mult + 0.3) dm(d, 'WHERE × STARTS', 760, 790, 4, C.ink, { k: prog(t, T.mult + 0.3, T.starts + 0.3) });
    if (t > T.mult + 1.0) dm(d, 'NOTHING MULTIPLIED YET', 760, 830, 3, C.dim, { k: prog(t, T.mult + 1.0, T.starts + 0.8) });
    // cầu thang thu nhỏ: 2³ … 2⁰, bậc "÷2" bên phải
    const n = V.stair.length;
    V.stair.forEach(([e, v], i) => {
      const y = 400 + i * 100, at = T.stair + (T.lands - T.stair) * (i / (n - 1));
      if (t < at - 0.1) { row(d, [{ c: '2' }, { c: String(e), sup: true }, { c: '=' }, { c: 'X' }], 132, y, 62, { color: `rgba(${C.inkRGB},0.16)` }); return; }
      const last = e === 0;
      row(d, [{ c: '2' }, { c: String(e), sup: true }, { c: '=' }, { c: String(v), col: last ? C.one : C.ink }], 132, y, 62, { k: prog(t, at - 0.1, at + 0.25) });
      if (i > 0) dm(d, '÷2', 400, y - 36, 3, C.dim, { k: prog(t, at - 0.1, at + 0.2) });
    });
    // 2⁰ = 1 nối vào thanh ghi (cùng một 1)
    if (t > T.lands) dots(d, 360, 731, 748, 691, C.one, { step: 12, size: 6, k: prog(t, T.lands, T.too + 0.3) });
  }

  // ── trang 1: lựa chọn, rồi bị buộc ──
  page1(d, t) {
    const T = this.T, y0 = PAGE;
    if (t < this.PAN[0] - 0.2 || t > this.PAN[1] + 1) return;
    dm(d, 'A CHOICE IN ONLY ONE SENSE', 132, y0 + 170, 5, C.dim, { k: prog(t, T.choice - 0.2, T.choice + 1.0) });
    const s = 'A^M^ × A^0^ = A^M^';
    if (t < T.chose - 0.1) dashBox(d, 120, y0 + 290, dmW(s, 12) + 24, 110, prog(t, this.PAN[0] + 0.4, this.PAN[0] + 1.2));
    else dm(d, s, 132, y0 + 300, 12, C.ink, { k: prog(t, T.chose - 0.1, T.working) });
    if (t > T.keep - 0.1) {
      const k = prog(t, T.keep - 0.1, T.working + 0.2);
      dm(d, 'THE CHOICE: KEEP THE RULE', 132, y0 + 450, 5, C.ink, { k });
      d.fillStyle = C.ink; d.fillRect(132, y0 + 500, dmW('THE CHOICE: KEEP THE RULE', 5) * k, 4);   // gạch chân = mực
    }
    if (t > T.once - 0.1) dm(d, '↓', 300, y0 + 560, 8, C.ink, { k: prog(t, T.once - 0.1, T.once + 0.2) });
    if (t > T.had - 0.6) {
      dm(d, [['A^0^ = ', C.ink], ['1', C.one]], 132, y0 + 680, 12, C.ink, { k: prog(t, T.had - 0.6, T.one99 + 0.1) });
      dm(d, 'FORCED', 132, y0 + 800, 7, C.ink, { k: prog(t, T.one99, T.one99 + 0.4) });
    }
  }

  // ── trang 2: bảng thu nhỏ, ô 0⁰ tách đôi ──
  page2(d, t) {
    const T = this.T, V = this.V, y0 = 2 * PAGE;
    if (t < this.PAN[1] - 0.2 || t > this.PAN[2] + 1) return;
    const tx = 132, ty = y0 + 200, cw = 110, ch = 72, kt = prog(t, this.PAN[1] + 0.3, T.lives);
    // bảng xʸ khớp d3-table: cột X = 0, 1/2, 2, 5 · hàng Y = 0..3; hàng Y=0 lam (toàn 1), cột X=0 gỉ (0 khi y ≥ 1)
    dm(d, 'X^Y^', tx + cw / 2, ty + 22, 4, C.dim, { align: 'center', k: kt * 3 });
    V.tbl.forEach(([xs], j) => dm(d, 'X=' + xs, tx + cw * (j + 1) + cw / 2, ty + 28, 3, C.dim, { align: 'center', k: kt * 3 - j * 0.3 }));
    [0, 1, 2, 3].forEach((e, i) => {
      const yy = ty + ch * (i + 1), ki = clampK(kt * 2 - i * 0.25);
      dm(d, 'Y=' + e, tx + cw / 2, yy + 26, 3, C.dim, { align: 'center', k: ki });
      V.tbl.forEach(([, vals], j) => {
        const v = vals[i];
        if (v === null) return;
        const col = i === 0 ? C.one : j === 0 ? C.zero : C.ink;
        dm(d, String(v), tx + cw * (j + 1) + cw / 2, yy + 22, 5, col, { align: 'center', k: ki });
      });
    });
    dots(d, tx, ty + ch - 6, tx + cw * 5, ty + ch - 6, `rgba(${C.inkRGB},0.3)`, { step: 10, k: kt });
    dots(d, tx + cw - 6, ty, tx + cw - 6, ty + ch * 5, `rgba(${C.inkRGB},0.3)`, { step: 10, k: kt });
    const zx = tx + cw, zy = ty + ch;
    miniCell(d, zx, zy, cw, ch, prog(t, this.PAN[1] + 0.6, T.lives));
    // hai ô: AS A VALUE | AS A LIMIT
    const bx = [820, 1330], bw = 470, by = ty, bh = 330;
    const kv = prog(t, T.value - 0.2, T.value + 0.4), kl = prog(t, T.shape - 0.2, T.shape + 0.4);
    for (let i = 0; i < 2; i++) { if ((i ? kl : kv) <= 0) dashBox(d, bx[i], by, bw, bh, prog(t, T.lives, T.lives + 0.8)); }
    if (kv > 0) {
      box(d, bx[0], by, bw, bh);
      dm(d, '0^0^ AS A VALUE', bx[0] + 24, by + 34, 4, C.ink, { k: kv * 2 });
      if (t > T.one100 - 0.6) seg7(d, '1', bx[0] + bw / 2 - 45, by + 110, 180, C.one);
      else seg7(d, 'X', bx[0] + bw / 2 - 45, by + 110, 180, C.one);
      [['COUNTING', T.counting], ['ALGEBRA', T.algebra], ['PROGRAMMING', T.programming]].forEach(([s, at], i) => {
        if (t > at - 0.1) dm(d, '· ' + s, bx[0] + 20, by + bh + 40 + i * 50, 4, C.ink, { k: prog(t, at - 0.1, at + 0.4) });
      });
    }
    if (kl > 0) {
      box(d, bx[1], by, bw, bh);
      dm(d, '0^0^ AS A LIMIT', bx[1] + 24, by + 34, 4, C.ink, { k: kl * 2 });
      if (t > T.indet - 0.1) dm(d, 'WORK IT', bx[1] + 30, by + 140, 9, C.ink, { k: prog(t, T.indet - 0.1, T.calculate) });
      if (t > T.indet + 0.4) dm(d, 'OUT', bx[1] + 30, by + 230, 9, C.ink, { k: prog(t, T.indet + 0.4, T.calculate + 0.3) });
      [['CALCULUS', T.calculus], ['INDETERMINATE', T.indet]].forEach(([s, at], i) => {
        if (t > at - 0.1) dm(d, '· ' + s, bx[1] + 20, by + bh + 40 + i * 50, 4, C.ink, { k: prog(t, at - 0.1, at + 0.5) });
      });
    }
    // 102: không mâu thuẫn — một là con số, một là hướng đi
    if (t > T.contradict - 0.2) dm(d, 'TWO FACTS · NO CONTRADICTION', 132, y0 + 745, 5, C.ink, { k: prog(t, T.contradict - 0.2, T.contradict + 0.9) });
    if (t > T.number - 0.2) dm(d, 'A NUMBER', bx[0] + 20, y0 + 860, 6, C.ink, { k: prog(t, T.number - 0.2, T.number + 0.4) });
    if (t > T.moving - 0.2) {
      dm(d, "WHERE IT'S HEADING", bx[1] + 20, y0 + 860, 4, C.ink, { k: prog(t, T.moving - 0.2, T.heading + 0.3) });
      // một điểm đang chạy về góc (lượng đang chuyển động) — chạy vòng theo t, tất định
      const ax = bx[1] + 30, ay = y0 + 960, bxx = bx[1] + 420;
      dots(d, ax, ay, bxx, ay, `rgba(${C.inkRGB},0.3)`, { step: 12 });
      d.fillStyle = C.ink; d.fillRect(bxx - 4, ay - 18, 8, 36);
      const u = ((t - T.moving) / 1.6) % 1, px = ax + (bxx - 20 - ax) * (1 - Math.pow(1 - u, 2));
      d.fillRect(px - 9, ay - 9, 18, 18);
    }
  }

  // ── trang 3: vì sao máy cãi nhau · đi thi thì sao ──
  page3(d, t) {
    const T = this.T, y0 = 3 * PAGE;
    if (t < this.PAN[2] - 0.2) return;
    dm(d, 'WHY THE MACHINES DISAGREE', 132, y0 + 160, 5, C.dim, { k: prog(t, T.machines - 0.3, T.machines + 0.9) });
    const rows = [['PYTHON', '1'], ['JAVASCRIPT', '1'], ['GOOGLE', '1'], ['TI-84', 'ERR:DOMAIN'], ['EXCEL', '#NUM!']];
    rows.forEach(([name, out], i) => {
      const y = y0 + 240 + i * 66 + (i > 2 ? 30 : 0), at = i < 3 ? T.machines + 0.3 + i * 0.25 : T.error - 0.3 + (i - 3) * 0.3;
      if (t < at - 0.6) { dots(d, 132, y + 40, 960, y + 40, `rgba(${C.inkRGB},0.16)`, { step: 12 }); return; }
      const k = prog(t, at - 0.1, at + 0.4);
      dm(d, name, 132, y, 5, C.ink, { k: k * 2 });
      dots(d, 470, y + 18, 640, y + 18, `rgba(${C.inkRGB},0.3)`, { k });
      if (k < 0.6) return;
      if (out === '1') seg7(d, '1', 680, y - 8, 52, C.one); else dm(d, out, 680, y, 5, C.ink);
    });
    const brace = (ya, yb, k) => { d.fillStyle = C.ink; d.fillRect(1010, ya, 5, (yb - ya) * k); d.fillRect(1010, ya, 20, 5); if (k >= 1) d.fillRect(1010, yb, 20, 5); };
    if (t > T.say - 0.1) {
      brace(y0 + 236, y0 + 410, prog(t, T.say - 0.1, T.say + 0.4));
      dm(d, 'DOING ALGEBRA', 1060, y0 + 300, 5, C.ink, { k: prog(t, T.algebra103 - 0.3, T.algebra103 + 0.5) });
    }
    if (t > T.error - 0.1) {
      brace(y0 + 465, y0 + 570, prog(t, T.error - 0.1, T.error + 0.4));
      dm(d, 'A WARNING SIGN', 1060, y0 + 500, 5, C.ink, { k: prog(t, T.warning - 0.2, T.warning + 0.6) });
    }
    // đi thi
    const kb = prog(t, T.test - 0.2, T.test + 0.4);
    if (kb <= 0) dashBox(d, 120, y0 + 650, 1260, 320, prog(t, this.PAN[2] + 0.5, this.PAN[2] + 1.3));
    else {
      d.fillStyle = C.ink; d.fillRect(120, y0 + 650, 1260 * kb, 5); d.fillRect(120, y0 + 965, 1260 * kb, 5);
      dm(d, [['ON A TEST:  ', C.ink], ['0^0^', C.ink], [' = ?', C.ink]], 150, y0 + 690, 6, C.ink, { k: prog(t, T.test - 0.2, T.zero104 + 0.7) });
      if (t > T.course - 0.5) dm(d, "YOUR COURSE'S DEFINITION", 150, y0 + 790, 8, C.ink, { k: prog(t, T.course - 0.5, T.defines + 0.5) });
      if (t > T.textbooks - 0.4) dm(d, 'MANY TEXTBOOKS: UNDEFINED', 150, y0 + 900, 5, C.dim, { k: prog(t, T.textbooks - 0.4, T.undefined + 0.6) });
    }
  }
}
function clampK(k) { return Math.max(0, Math.min(1, k)); }
