// e3 · Ten thousand times no (p2).
//   trang 0: 1992 (7 đoạn) + Knuth (ảnh điểm, nhãn credit bắt buộc) + "TWO NOTES ON NOTATION"; "0^0 LEFT UNDEFINED?" →
//            "NO, NO, / TEN THOUSAND TIMES NO!" gõ vào lớn theo từng chữ; "THE BINOMIAL THEOREM: FAR TOO IMPORTANT / TO
//            BREAK OVER ONE SQUARE" + ô 0⁰ (tranh chấp) nhỏ đúng lúc "one square of the table".
//   trang 1 (cuộn): gọi lại a0 — "0^0 =" và PYTHON …… 1 · JAVASCRIPT …… 1 (1 lam), khoanh mực hai số 1.
import { W, C, smooth, prog, ground, ink, seg7, row, dm, dmW, annunciators, card, contested, dots, portrait, lookup, must } from '../kit.js';

const PAGE = 1080;

export default class Knuth {
  static ERA = 'lcd';
  static IMAGES = { knuth: './assets/history/knuth.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.T = {
      nineteen: w(75, 'nineteen'), computer: w(75, 'computer'), knuth: w(75, 'knuth'), paper: w(75, 'paper'),
      two: w(75, 'two'), notation: w(75, 'notation'),
      wanted: w(76, 'wanted'), undefined: w(76, 'undefined'), answer: w(76, 'answer'),
      no1: w(76, 'no', 1), no2: w(76, 'no', 2), ten: w(76, 'ten'), thousand: w(76, 'thousand'), times: w(76, 'times'), no3: w(76, 'no', 3),
      binomial: w(77, 'binomial'), important: w(77, 'important'), broken: w(77, 'broken'), square: w(77, 'square'), table: w(77, 'table'),
      most: w(78, 'most'), languages: w(78, 'languages'), choice: w(78, 'choice'), thats: w(78, "that's"),
      python: w(78, 'python'), javascript: w(78, 'javascript'), one78: w(78, 'one'),
    };
    this.START = L(75).start; this.FROM = this.START - 1.2;
    this.PAN = w(78, 'most') - 0.1;
    this.V = { year: must('1992', 1992), py: must('0^0', 1) };   // "PYTHON 1 / JAVASCRIPT 1" = kết quả thật của máy (như a0)
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.knuth + 0.75, kind: 'chip' },
      { t: T.no1, kind: 'beep' }, { t: T.square, kind: 'tick' }, { t: T.python, kind: 'chip' },
    ];
  }
  cam(t) { return PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9)); }
  render(g, t) {
    const cy = this.cam(t);
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 0.9), 'ACT IV', 'TEN THOUSAND TIMES NO');
      d.save(); d.beginPath(); d.rect(0, 130, W, 1080 - 130); d.clip(); d.translate(0, -cy);
      this.page0(d, t); this.page1(d, t);
      d.restore();
    });
  }

  page0(d, t) {
    const T = this.T, X = 132, RX = 760;
    if (t > this.PAN + 1.2) return;
    // Knuth: ảnh điểm gõ vào theo hàng khi lời gọi tên; khung chờ có sẵn
    if (t < T.knuth - 0.2) { d.strokeStyle = `rgba(${C.inkRGB},0.2)`; d.lineWidth = 3; d.strokeRect(X - 10, 160, 286, 420); }
    portrait(d, 'knuth', X, 170, 400, prog(t, T.knuth - 0.2, T.knuth + 0.6),
      { label: { name: 'DONALD KNUTH', life: 'COMPUTER SCIENTIST · BORN 1938', note: 'PHOTO: ALEX HANDY · CC BY-SA 2.0' } });
    // 1992 · TWO NOTES ON NOTATION
    row(d, String(this.V.year), RX, 166, 104, { k: prog(t, T.nineteen - 0.1, T.nineteen + 0.9) });
    dm(d, 'A PAPER CALLED', RX, 316, 5, C.dim, { k: prog(t, T.paper - 0.2, T.two) });
    dm(d, 'TWO NOTES ON NOTATION', RX, 366, 8, C.ink, { k: prog(t, T.two - 0.1, T.notation + 0.5) });
    // "0^0 left undefined?" → his answer: NO, NO, TEN THOUSAND TIMES NO!
    dm(d, [['TO THOSE WHO WANTED ', C.dim], ['0^0^', C.ink], [' UNDEFINED:', C.dim]], RX, 500, 5, C.dim,
      { k: prog(t, T.wanted - 0.3, T.undefined + 0.5) });
    dm(d, 'HIS ANSWER', RX, 590, 5, C.dim, { k: prog(t, T.answer - 0.1, T.answer + 0.3) });
    const q = '"NO, NO, TEN THOUSAND TIMES NO!"', cut = [[T.no1, 4], [T.no2, 8], [T.ten, 12], [T.thousand, 21], [T.times, 27], [T.no3, q.length]];
    let n = 0; for (const [a, m] of cut) if (t >= a - 0.05) n = m;
    dm(d, q, X, 770, 8, C.ink, { k: n / q.length });
    // binomial theorem: quá quan trọng để vỡ vì một ô của bảng
    dm(d, 'THE BINOMIAL THEOREM: FAR TOO IMPORTANT', X, 880, 5, C.ink, { k: prog(t, T.binomial - 0.1, T.important + 0.5) });
    dm(d, 'TO BREAK OVER ONE SQUARE OF THE TABLE', X, 940, 5, C.ink, { k: prog(t, T.broken - 0.3, T.table + 0.2) });
    const cx = 1420;
    if (t < T.square - 0.1) dots(d, cx, 872, cx + 210, 872, `rgba(${C.inkRGB},0.25)`, { step: 12 });
    contested(d, cx, 860, 210, 120, prog(t, T.square - 0.1, T.table + 0.2));
    if (t > T.square) dm(d, '0^0^', cx + 240, 906, 5, C.ink, { k: prog(t, T.square, T.table) });
  }

  // ── trang 1: máy móc chọn như vậy (gọi lại a0) ──
  page1(d, t) {
    const T = this.T, y0 = PAGE, X = 132;
    if (t < this.PAN - 0.2) return;
    dm(d, 'MOST PROGRAMMING LANGUAGES: SAME CHOICE', X, y0 + 160, 6, C.dim, { k: prog(t, T.languages - 0.2, T.choice + 0.3) });
    row(d, [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: 'X' }], X, y0 + 260, 150, { k: prog(t, T.thats - 0.1, T.thats + 0.4) });
    dm(d, 'ASK A MACHINE', X + 600, y0 + 320, 5, C.dim, { k: prog(t, T.thats, T.thats + 0.5) });
    [['PYTHON', T.python], ['JAVASCRIPT', T.javascript]].forEach(([name, at], i) => {
      const y = y0 + 500 + i * 120, k = prog(t, at - 0.15, at + 0.35);
      dm(d, name, X, y + 18, 7, C.ink, { k: k * 2 });
      dots(d, X + 460, y + 44, X + 760, y + 44, `rgba(${C.inkRGB},0.3)`, { k });
      seg7(d, k >= 0.6 ? '1' : 'X', X + 820, y - 4, 86, C.one);
    });
    // "answer one": khoanh MỰC quanh hai số 1 (§61 — màu nghĩa không làm màu nhấn)
    const kb = prog(t, T.one78 - 0.25, T.one78 + 0.25);
    if (kb > 0) {
      const x0 = X + 790, y1 = y0 + 480, x1 = X + 940, y2 = y0 + 720, c = `rgba(${C.inkRGB},0.8)`;
      dots(d, x0, y1, x0 + (x1 - x0) * kb, y1, c, { step: 10, size: 5 }); dots(d, x0, y2, x0 + (x1 - x0) * kb, y2, c, { step: 10, size: 5 });
      dots(d, x0, y1, x0, y2, c, { step: 10, size: 5, k: kb }); dots(d, x1, y1, x1, y2, c, { step: 10, size: 5, k: kb });
      dm(d, [['BOTH ANSWER ', C.ink], ['1', C.one]], x1 + 50, y0 + 580, 7, C.ink, { k: kb });
    }
  }
}
