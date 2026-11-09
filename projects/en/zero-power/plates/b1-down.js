// b1 · Down the powers of two (p2, mở HỒI I). Mở từ đen (iris) → thẻ hồi "FOLLOW THE PATTERN · ANSWERS 1" → cột giá trị
//   2⁴ = 16, 2³ = 8, 2² = 4, 2¹ = 2 (7 đoạn) bấm vào theo lời; "EXPONENT DOWN BY 1 / ANSWER ÷ 2"; mũi tên "÷2" từng bậc;
//   bậc chót 2⁰ = ? → 1 lam khi "two divided by two is one"; ô 1 lam (đáy cầu thang = thanh ghi ×) khi "two to the zero".
// Xuất thêm đồ nghề cột (powRow, stepArrow, oneBox, column) cho b2-ten / b3-hint — cùng một bố cục.
import { C, smooth, prog, ground, ink, card, actTitle, row, rowW, dm, dmW, annunciators, dots, figure, lookup, must, iris } from '../kit.js';

export const COL = { X: 132, Y0: 150, STEP: 150, H: 104 };
const DOTC = 'rgba(24,33,27,0.22)';

/** Bề rộng phần trái "B^E^ =" và mép phải cột giá trị (VR) cho cơ số / số mũ / giá trị dài nhất. */
export function colGeom(base, maxVal, x = COL.X, h = COL.H) {
  const left = rowW(base + '^0^=', h), VR = x + left + 70 + rowW(maxVal, h);
  return { left, VR };
}
/**
 * Một dòng "B^E^ = V": phần trái gõ vào theo token (kL), token chưa hiện = bóng "8"; giá trị phải căn VR, chưa hiện =
 * bóng "8" (hoặc dấu "?" khi q). Chấm chờ dưới dòng. Trả về hộp token phần trái.
 */
export function powRow(d, base, e, val, x, y, VR, h, { kL = 1, showV = false, valCol = C.ink, q = false, slots = val.length } = {}) {
  dots(d, x, y + h + 22, VR + 20, y + h + 22, DOTC, { step: 12 });
  const toks = [...base].map(c => ({ c })).concat([{ c: e, sup: true }, { c: '=' }]);
  const n = Math.round(toks.length * Math.min(1, Math.max(0, kL)));
  const shown = toks.map((tk, i) => i < n ? tk : tk.c === '=' ? { c: '=', col: 'rgba(0,0,0,0)' } : { ...tk, c: 'X' });
  const box = row(d, shown, x, y, h);
  if (showV) row(d, val, VR - rowW(val, h), y, h, { color: valCol });
  else if (q) {
    row(d, 'X'.repeat(slots), VR - rowW('X'.repeat(slots), h), y, h);
    dm(d, '?', VR - rowW('X'.repeat(slots), h) / 2, y + (h - 91) / 2, 13, C.ink, { align: 'center', ghost: false });
  } else row(d, 'X'.repeat(slots), VR - rowW('X'.repeat(slots), h), y, h);
  return box;
}
/** Mũi tên chấm đi xuống từ dòng i sang dòng i+1 ở cột x, nhãn "÷N" bên phải (gõ vào). */
export function stepArrow(d, x, yRow, label, k, { step = COL.STEP, h = COL.H, p = 6 } = {}) {
  if (k <= 0) return;
  const y0 = yRow + h / 2 + 18, y1 = yRow + step + h / 2 - 18, kk = Math.min(1, k * 1.6);
  dots(d, x, y0, x, y0 + (y1 - y0) * kk, `rgba(24,33,27,0.75)`, { step: 9, size: 5 });
  if (kk >= 1) { d.fillStyle = C.ink; for (let j = 1; j <= 3; j++) { d.fillRect(x - j * 6 - 2.5, y1 - j * 6 - 2.5, 5, 5); d.fillRect(x + j * 6 - 2.5, y1 - j * 6 - 2.5, 5, 5); } }
  dm(d, label, x + 30, (y0 + y1) / 2 - 3.5 * p, p, C.ink, { k: Math.max(0, k * 1.6 - 0.6) });
}
/** Ô 1 lam (thanh ghi × — vật xuyên suốt) quanh giá trị "1" của dòng: nền lam nhạt + hai thanh lam, quét từ trái. */
export function oneBox(d, VR, y, h, k, valW = rowW('1', h)) {
  if (k <= 0) return;
  const x0 = VR - valW - 34, w = (valW + 58) * Math.min(1, k);
  d.fillStyle = `rgba(${C.oneRGB},0.085)`; d.fillRect(x0, y - 20, w, h + 40);
  d.fillStyle = C.one; d.fillRect(x0, y - 20, w, 5); d.fillRect(x0, y + h + 15, w, 5);
}
/** Cột đã xong (bản thu nhỏ cho b3): vẽ ở toạ độ cục bộ x = 0, y = 0. Trả về { w, h, VR, rowsY }. */
export function column(d, base, rows, { label, boxK = 1 } = {}) {
  const h = COL.H, maxV = rows.reduce((a, r) => r[1].length > a.length ? r[1] : a, '');
  const { VR } = colGeom(base, maxV, 0, h), ys = rows.map((_, i) => i * COL.STEP);
  rows.forEach(([e, v], i) => powRow(d, base, e, v, 0, ys[i], VR, h, { showV: true, valCol: v === '1' && i === rows.length - 1 ? C.one : C.ink }));
  for (let i = 0; i < rows.length - 1; i++) stepArrow(d, VR + 64, ys[i], label, 1);
  oneBox(d, VR, ys.at(-1), h, boxK);
  return { w: VR + 64 + 30 + dmW(label, 6), h: ys.at(-1) + h, VR, rowsY: ys };
}

export default class Down {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['notebook'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      write: w(1, 'write'),
      r: [[w(1, 'two', 2), w(1, 'sixteen')], [w(1, 'two', 3), w(1, 'eight')], [w(1, 'two', 4), w(1, 'four')], [w(1, 'two', 5), w(1, 'two', 6)]],
      notice: w(2, 'notice'), exponent: w(2, 'exponent'), goes: w(2, 'goes'), one2: w(2, 'one'), answer: w(2, 'answer'), two2: w(2, 'two'),
      div: [w(3, 'divide', 1), w(3, 'divide', 2), w(3, 'divide', 3)], two3: w(3, 'two', 3), again: w(3, 'again'),
      what: w(4, 'what'), next: w(4, 'next'), be: w(4, 'be'), two4: w(4, 'two', 1), divided4: w(4, 'divided'), one4: w(4, 'one'),
      pattern5: w(5, 'pattern'), going5: w(5, 'going'), zero5: w(5, 'zero'), one5: w(5, 'one'), e5: L(5).end,
    };
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                         // mở hồi, p2 bắt đầu ngay sau intro
    this.V = [must('2^4', 16), must('2^3', 8), must('2^2', 4), must('2^1', 2), must('2^0', 1)].map(String);
    must('16 ÷ 2', 8); must('8 ÷ 2', 4); must('4 ÷ 2', 2); must('2 ÷ 2', 1);
    this.G = colGeom('2', '16');
    this.box = row({ fillStyle: '', fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, fill() {}, save() {}, restore() {}, translate() {}, rotate() {}, globalAlpha: 1 },
      [{ c: '2' }, { c: '4', sup: true }, { c: '=' }], COL.X, 0, COL.H);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.r[0][1], kind: 'beep' }, { t: T.r[3][1], kind: 'beep' },
      { t: T.div[0], kind: 'tick' }, { t: T.again, kind: 'tick' }, { t: T.one4, kind: 'correct' },
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V, { X, Y0, STEP, H: h } = COL, VR = this.G.VR, AX = VR + 64;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      actTitle(d, t, this.START, 'I', 'FOLLOW THE PATTERN', 'ANSWERS 1');
      card(d, prog(t, this.START - 0.2, this.START + 0.6), 'ACT I', 'DOWN THE POWERS OF TWO');
      // cột: ô chờ gõ vào trong câu 0 ("the most visual way"), rồi từng dòng bấm vào theo lời
      const exps = ['4', '3', '2', '1', '0'];
      for (let i = 0; i < 5; i++) {
        const y = Y0 + i * STEP, kIn = prog(t, this.START - 0.25 + i * 0.25, this.START + i * 0.25);
        if (kIn <= 0) continue;
        if (i < 4) {
          const [a, b] = T.r[i];
          d.save(); d.globalAlpha = kIn;
          powRow(d, '2', exps[i], V[i], X, y, VR, h, { kL: prog(t, a - 0.1, a + 0.45), showV: t >= b - 0.05, slots: 2 });
          d.restore();
        } else {
          d.save(); d.globalAlpha = kIn;
          const one = t >= T.one4 - 0.05;
          powRow(d, '2', '0', V[4], X, y, VR, h, { kL: prog(t, T.what - 0.1, T.next), showV: one, valCol: C.one, q: t >= T.next && !one, slots: 2 });
          d.restore();
        }
      }
      // "the exponent goes down by one": khoanh số mũ từng dòng (khung mực)
      if (t > T.goes - 0.1) for (let i = 0; i < 4; i++) {
        const k = prog(t, T.goes - 0.1 + i * 0.16, T.goes + 0.15 + i * 0.16); if (k <= 0) continue;
        const [x0, x1] = this.box[1], y = Y0 + i * STEP;
        d.strokeStyle = C.ink; d.lineWidth = 3; d.strokeRect(x0 - 10, y - 14, (x1 - x0 + 22) * k, h * 0.5 + 26);
      }
      // bảng bên phải: quy luật
      const PX = 760;
      if (t > T.exponent - 0.1) dm(d, 'EXPONENT DOWN BY 1', PX, Y0 + 40, 6, C.ink, { k: prog(t, T.exponent - 0.1, T.one2 + 0.1) });
      if (t > T.answer - 0.1) dm(d, 'ANSWER ÷ 2', PX, Y0 + 110, 6, C.ink, { k: prog(t, T.answer - 0.1, T.two2 + 0.2) });
      // mũi tên ÷2 từng bậc khi đọc "divide by two"
      for (let i = 0; i < 3; i++) stepArrow(d, AX, Y0 + i * STEP, '÷2', prog(t, T.div[i] - 0.2, T.div[i] + 0.5));
      // bậc kế tiếp: "two divided by two is one"
      if (t > T.next - 0.1) dm(d, 'NEXT STEP?', PX, Y0 + 3 * STEP + 20, 6, C.ink, { k: prog(t, T.next - 0.1, T.be + 0.2) });
      stepArrow(d, AX, Y0 + 3 * STEP, '÷2', prog(t, T.divided4 - 0.2, T.divided4 + 0.4));
      if (t > T.two4 - 0.1) dm(d, [['2 ÷ 2 = ', C.ink], ['1', C.one]], PX, Y0 + 3 * STEP + 100, 8, C.ink, { k: prog(t, T.two4 - 0.1, T.one4 + 0.05) });
      // "if the pattern keeps going, two to the zero is one" → ô 1 lam ở đáy cầu thang
      if (t > T.pattern5 - 0.1) dm(d, 'IF THE PATTERN KEEPS GOING', PX, Y0 + 4 * STEP + 50, 5, C.dim, { k: prog(t, T.pattern5 - 0.1, T.going5 + 0.3) });
      oneBox(d, VR, Y0 + 4 * STEP, h, prog(t, T.zero5 - 0.1, T.one5 + 0.1));
    });
    // nhân vật cầm sổ khi "write the powers of two in a column", rời khung bằng cách tụt xuống
    const kin = prog(t, T.write - 0.35, T.write), out = smooth(prog(t, T.r[3][1] + 0.2, T.r[3][1] + 0.7));
    if (kin > 0 && out < 1) figure(g, 'notebook', 1630, 1080 + 800 * out, 760, kin);
    iris(g, 960, 540, prog(t, this.FROM, this.FROM + 0.8), 0);   // mở từ đen sau intro
  }
}
