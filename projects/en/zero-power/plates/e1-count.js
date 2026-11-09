// e1 · Counting the ways (p2) — mở HỒI IV "WHEN COUNTING DECIDES · ANSWERS 3".
//   trang 0: "2^3 = WAYS TO FILL 3 BOXES" — ba ô chờ, mỗi ô "A OR B"; liệt kê ĐỦ 8 cách (tính bằng code); 2 × 2 × 2 = 8
//            theo từng chữ "two"; dòng tổng quát A^N = WAYS TO FILL N BOXES.
//   trang 1: 0 ô → khung trống "NO BOXES TO FILL", "WAYS = 1 · DO NOTHING" (thanh ghi × = 1 lam), mascot point chỉ vào;
//            "0 SYMBOLS, 0 BOXES → STILL 1 WAY"; "IN COUNTING 0^0 = 1" — "NOT A CONVENTION · YOU COUNT → 1".
//   ô 0⁰ (tranh chấp) đứng ở góc trên phải màn (toạ độ màn hình) từ "settles the question", chốt về 1 lam ở "is one".
import { W, C, smooth, outCubic, prog, ground, ink, seg7, row, rowW, dm, dmW, annunciators, card, actTitle, register,
  dots, bracket, checker, figure, lookup, must } from '../kit.js';

const PAGE = 1080;
const SYM = ['A', 'B'];
/** Mọi cách điền n ô bằng các ký hiệu S (thứ tự từ điển). */
const fillings = (n, S) => n === 0 ? [[]] : fillings(n - 1, S).flatMap(f => S.map(s => [...f, s]));
/** Khung viền đứt (ô chờ). */
const dashRect = (d, x0, y0, x1, y1, col = `rgba(${C.inkRGB},0.45)`, step = 12, size = 5) => {
  dots(d, x0, y0, x1, y0, col, { step, size }); dots(d, x0, y1, x1, y1, col, { step, size });
  dots(d, x0, y0, x0, y1, col, { step, size }); dots(d, x1, y0, x1, y1, col, { step, size });
};

export default class Count {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      another: w(60, 'another'), power: w(60, 'power'), settles: w(60, 'settles'), question: w(60, 'question'),
      counts: w(61, 'counts'), boxes61: w(61, 'boxes'), three: w(61, 'three'), each: w(61, 'each'), symbols: w(61, 'symbols'),
      eight: w(62, 'eight'), two1: w(62, 'two', 1), two2: w(62, 'two', 2), two3: w(62, 'two', 3), e62: L(62).end,
      general: w(63, 'general'), a63: w(63, 'a'), n63: w(63, 'n', 2), choices: w(63, 'choices'), box63: w(63, 'box'),
      zero64: w(64, 'zero'), how: w(64, 'how'), no64: w(64, 'no'), all64: w(64, 'all'), exactly: w(64, 'exactly'),
      nothing: w(64, 'nothing'), done: w(64, 'done'),
      stays: w(65, 'stays'), zero65: w(65, 'zero'), from65: w(65, 'from'), s65: L(65).start,
      counting: w(66, 'counting'), zz1: w(66, 'zero', 1), one66: w(66, 'one', 1), convention: w(66, 'convention'),
      count66: w(66, 'count'), end: L(66).end,
    };
    this.START = L(60).start;
    this.FROM = Math.max(this.START - 2.6, L(59).end + 0.5);       // mở hồi
    this.PAN = L(64).start - 0.6;                                   // cuộn sang trang 1 (0 ô)
    this.F = fillings(3, SYM);
    if (this.F.length !== must('2^3', 8)) throw new Error('e1: phải có đúng 8 cách điền');
    if (new Set(this.F.map(f => f.join(''))).size !== 8) throw new Error('e1: 8 cách phải khác nhau');
    if (fillings(0, SYM).length !== 1 || fillings(0, []).length !== 1) throw new Error('e1: 0 ô phải có đúng 1 cách');
    this.V = { m: must('2 × 2 × 2', 8) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.settles, kind: 'tick' }, { t: T.eight, kind: 'beep' },
      { t: T.a63, kind: 'beep' }, { t: T.zero64, kind: 'beep' }, { t: T.exactly, kind: 'chip' },
      { t: T.zero65, kind: 'tick' }, { t: T.one66, kind: 'chip' },
    ];
  }
  cam(t) { return PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9)); }
  render(g, t) {
    const T = this.T, cy = this.cam(t);
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      actTitle(d, t, this.START, 'IV', 'WHEN COUNTING DECIDES', 'ANSWERS 3');
      card(d, prog(t, this.START + 0.1, this.START + 0.8), 'ACT IV', 'COUNTING THE WAYS');
      if (t > this.START - 0.35) {
        d.save(); d.beginPath(); d.rect(0, 130, W, 1080 - 130); d.clip();
        d.translate(0, -cy); this.page0(d, t); this.page1(d, t); d.restore();
      }
      this.cell(d, t);
    });
    // mascot chỉ vào "WAYS = 1 · DO NOTHING" (trang 1, sau khi cuộn xong) — lật để chỉ sang trái
    if (t > this.PAN + 0.9) {
      const k = Math.min(prog(t, T.how - 0.2, T.how + 0.15), 1 - prog(t, T.s65 + 0.1, T.s65 + 0.45));
      figure(g, 'point', 1540, 1080, 760, k, { flip: true });
    }
  }

  // ô 0⁰ ở góc trên phải (toạ độ màn hình): tranh chấp từ "settles", chốt 1 lam ở "zero to the zero is one"
  cell(d, t) {
    const T = this.T; if (t < T.settles - 0.15) return;
    const x = 1576, y = 160, w = 240, h = 136, k = prog(t, T.settles - 0.15, T.question + 0.3), r = prog(t, T.one66 - 0.1, T.one66 + 0.45);
    dm(d, '0^0^', x - 24, y + 50, 6, C.ink, { align: 'right', k: k * 2 });
    const size = Math.min(70, h * 0.48), cy = y + (h - size) / 2 + 6;
    if (k > 0) checker(d, x + 10, y + 10, x + w - 10, y + h - 10, 6, 0.10 * Math.min(1, k * 2) * (1 - r));
    if (k > 0.25) bracket(d, x + 8, y + 8, x + w - 8, y + h - 8, 34, 6, C.ink);
    const x0 = x + w / 2 - (size * 0.5 + 44) - size * 0.25, xc = x + w / 2 - size * 0.25;
    if (k > 0.5) {
      seg7(d, '1', x0 + (xc - x0) * outCubic(r), cy, size, C.one);
      if (r < 0.3) dm(d, '?', x0 + size * 0.5 + 12, cy + size - 28, 4, C.one, { ghost: false });
    }
    if (k > 0.75) {                                        // 0? trượt xuống ra khỏi ô
      d.save(); d.beginPath(); d.rect(x + 14, y + 14, w - 28, h - 28); d.clip();
      const yy = cy + outCubic(r) * h;
      seg7(d, '0', x + w / 2 + 14, yy, size, C.zero); dm(d, '?', x + w / 2 + 14 + size * 0.5 + 12, yy + size - 28, 4, C.zero, { ghost: false });
      d.restore();
    }
  }

  // ── trang 0: 3 ô × 2 ký hiệu = 8 cách ──
  page0(d, t) {
    const T = this.T, X = 132;
    if (t > this.PAN + 1.2) return;
    dm(d, 'ANOTHER WAY TO READ A POWER', X, 150, 5, C.dim, { k: prog(t, T.another - 0.1, T.power + 0.3) });
    row(d, '2^3^', X, 222, 120, { k: prog(t, this.START + 0.15, this.START + 0.5) });
    dm(d, '= WAYS TO FILL 3 BOXES', X + rowW('2^3^', 120) + 50, 256, 7, C.ink, { k: prog(t, T.counts - 0.1, T.boxes61 + 0.3) });
    // ba ô lớn (ô chờ viền đứt), "A/B" vào từng ô khi lời nói "each box gets one of two symbols"
    const BX = [X, X + 170, X + 340], BY = 410, S = 120;
    BX.forEach((bx, i) => {
      const kb = prog(t, T.three - 0.1 + i * 0.12, T.three + 0.15 + i * 0.12);
      if (kb <= 0) return;
      dashRect(d, bx, BY + (1 - outCubic(kb)) * 40, bx + S, BY + S + (1 - outCubic(kb)) * 40, `rgba(${C.inkRGB},${0.55 * kb})`);
      if (t > T.each) dm(d, 'A/B', bx + S / 2, BY + 44, 5, C.ink, { align: 'center', k: prog(t, T.each + i * 0.15, T.each + 0.3 + i * 0.15) });
    });
    dm(d, 'A OR B IN EACH BOX', X + 540, 448, 5, C.dim, { k: prog(t, T.symbols - 0.3, T.symbols + 0.4) });
    // 2 × 2 × 2 = 8 dưới các ô, từng "2" theo từng chữ "two"
    const twos = [T.two1, T.two2, T.two3];
    BX.forEach((bx, i) => {
      if (t < twos[i] - 0.05) { seg7(d, 'X', bx + S / 2 - 25, 566, 100, C.ink); return; }
      seg7(d, '2', bx + S / 2 - 25, 566, 100, C.ink);
      if (i) dm(d, '×', bx - 25, 598, 6, C.ink, { align: 'center', ghost: false });
    });
    if (t > T.two3 + 0.12) row(d, [{ c: '=' }, { c: String(this.V.m) }], X + 500, 566, 100, { k: prog(t, T.two3 + 0.12, T.two3 + 0.4) });
    // liệt kê đủ 8 cách: 2 cột × 4 hàng, mỗi cách = ba ô nhỏ có ký hiệu
    this.F.forEach((f, j) => {
      const col = (j / 4) | 0, r = j % 4, x = 1240 + col * 300, y = 390 + r * 105, at = T.eight - 0.1 + j * 0.11;
      const k = prog(t, at, at + 0.12);
      dm(d, String(j + 1), x, y + 22, 3, C.dim, { k: k > 0 ? 1 : 0 });
      f.forEach((s, i) => {
        const bx = x + 40 + i * 76;
        dashRect(d, bx, y, bx + 64, y + 64, `rgba(${C.inkRGB},${k > 0 ? 0.5 : 0.18})`, 8, 4);
        if (k > 0) dm(d, s, bx + 32, y + 15, 5, C.ink, { align: 'center', k: k * 3 - i });
      });
    });
    // tổng quát: A^N = số cách điền N ô, A lựa chọn mỗi ô
    dm(d, 'A^N^', X, 830, 13, C.ink, { k: prog(t, T.a63 - 0.05, T.a63 + 0.4) });
    dm(d, '= WAYS TO FILL N BOXES', X + dmW('A^N^', 13) + 46, 848, 7, C.ink, { k: prog(t, T.a63 + 0.4, T.n63 + 0.3) });
    dm(d, 'A CHOICES FOR EACH BOX', X + dmW('A^N^', 13) + 46, 930, 5, C.dim, { k: prog(t, T.choices - 0.2, T.box63 + 0.2) });
  }

  // ── trang 1: 0 ô → 1 cách ──
  page1(d, t) {
    const T = this.T, y0 = PAGE, X = 132;
    if (t < this.PAN - 0.2) return;
    dm(d, [['NOW: ', C.ink], ['0', C.zero], [' BOXES', C.ink]], X, y0 + 160, 7, C.ink, { k: prog(t, T.zero64 - 0.15, T.zero64 + 0.5) });
    // khung trống = không có ô nào để điền (ô chờ có sẵn khi trang tới)
    dashRect(d, X, y0 + 250, 948, y0 + 430, `rgba(${C.inkRGB},0.4)`);
    dm(d, 'NO BOXES TO FILL', 540, y0 + 324, 5, C.dim, { align: 'center', k: prog(t, T.no64 - 0.1, T.all64 + 0.2) });
    const one = t >= T.exactly;
    dm(d, [['WAYS = ', C.ink], [one ? '1' : '?', one ? C.one : C.ink]], X, y0 + 500, 8, C.ink, { k: prog(t, T.how - 0.1, T.how + 0.6) });
    if (t > T.nothing - 0.1) dm(d, 'DO NOTHING', X, y0 + 590, 8, C.ink, { k: prog(t, T.nothing - 0.1, T.nothing + 0.6) });
    // thanh ghi × = 1 lam: chưa làm gì thì máy vẫn ở 1
    const kr = prog(t, T.exactly, T.exactly + 0.3);
    if (kr > 0) register(d, X, y0 + 690, '×', 1, C.one, { k: kr });
    else { d.strokeStyle = `rgba(${C.inkRGB},0.2)`; d.lineWidth = 3; d.strokeRect(X, y0 + 678, 196, 90); }
    dm(d, [['NOTHING DONE = ', C.dim], ['1', C.one]], X + 240, y0 + 708, 5, C.dim, { k: prog(t, T.done - 0.1, T.done + 0.5) });
    dm(d, [['0', C.zero], [' SYMBOLS, ', C.ink], ['0', C.zero], [' BOXES → STILL ', C.ink], ['1', C.one], [' WAY', C.ink]], X, y0 + 868, 6, C.ink,
      { k: prog(t, T.stays, T.from65 + 0.2) });
    // kết luận bên phải: IN COUNTING 0^0 = 1 (mascot đã rời)
    const RX = 1250;
    dm(d, 'IN COUNTING', RX, y0 + 380, 6, C.ink, { k: prog(t, T.counting - 0.1, T.counting + 0.4) });
    const oneOn = t >= T.one66 - 0.05;
    row(d, [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: oneOn ? '1' : 'X', col: C.one }], RX, y0 + 450, 170,
      { k: prog(t, T.zz1 - 0.1, T.one66) });
    dm(d, 'NOT A CONVENTION', RX, y0 + 680, 5, C.ink, { k: prog(t, T.convention - 0.2, T.convention + 0.4) });
    dm(d, [['YOU COUNT → ', C.ink], ['1', C.one]], RX, y0 + 740, 5, C.ink, { k: prog(t, T.count66 - 0.1, T.count66 + 0.4) });
  }
}
