// f3 · What indeterminate means.
//   89 "calculus calls 0^0 an indeterminate form" → 0^0 · INDETERMINATE FORM gõ vào
//   90 "doesn't mean … no value" → "INDETERMINATE = NO VALUE" rồi wrong() (âm bản) + ERR đúng "no value"
//   91 "limit takes the shape … can't read the answer off the shape … work it out, case by case" → gạch chân 0^0
//      "THE SHAPE OF A LIMIT"; ngay dưới: CAN'T READ IT OFF THE SHAPE · WORK IT OUT · CASE BY CASE (pose-idle)
//   92 "sometimes it comes out as one … x^x dips down and climbs back up to one" → đồ thị điểm ảnh xˣ trên (0, 1], vẽ từ
//      x = 1 sang trái: đáy ≈ 0.692 tại x ≈ 0.368, về 1 (lam) khi x → 0
//   93 "sometimes it's two, or a half, or something else" → · 2 · 1/2 · SOMETHING ELSE
import { C, smooth, outCubic, prog, ground, ink, seg7, dm, dmW, annunciators, card, dots, pixLine, wrong, figure, lookup,
  must } from '../kit.js';

const GX0 = 220, GX1 = 1300, gx = x => GX0 + (GX1 - GX0) * x, gy = v => 960 - (v - 0.5) * 600;

export default class Indet {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['idle'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      calculus: w(89, 'calculus'), form: w(89, 'form'),
      indet: w(90, 'indeterminate'), doesnt: w(90, "doesn't"), no: w(90, 'no'), value: w(90, 'value'),
      means: w(91, 'means'), limit: w(91, 'limit'), shape1: w(91, 'shape'), cant: w(91, "can't"), shape2: w(91, 'shape', 2),
      work: w(91, 'work'), case1: w(91, 'case'), case2: w(91, 'case', 2), e91: L(91).end,
      sometimes: w(92, 'sometimes'), one92: w(92, 'one'), x92: w(92, 'x'), dips: w(92, 'dips'), climbs: w(92, 'climbs'),
      one92b: w(92, 'one', 2),
      two93: w(93, 'two'), half: w(93, 'half'), something: w(93, 'something'), entirely: w(93, 'entirely'),
    };
    this.START = L(89).start;
    this.FROM = Math.max(this.START - 1.2, L(88).end + 0.3);
    // đồ thị xˣ, x từ 1 về 0.002 (đều theo điểm ảnh) — vẽ từ phải sang trái như lời "x shrinks towards zero"
    this.PTS = [];
    let xm = 1, vm = 1;
    for (let i = 0; i <= 499; i++) {
      const x = 1 - i * 0.002, v = Math.pow(x, x);
      if (v < vm) { vm = v; xm = x; }
      this.PTS.push([gx(x), gy(v)]);
    }
    // đáy: x = 1/e, xˣ = e^(−1/e) — kiểm lưới so với giải tích
    must(`${Math.abs(xm - 1 / Math.E) < 0.002}`, true); must(`${Math.abs(vm - Math.exp(-1 / Math.E)) < 1e-5}`, true);
    this.XM = (1 / Math.E).toFixed(3); this.VM = Math.exp(-1 / Math.E).toFixed(3);
    if (this.XM !== '0.368' || this.VM !== '0.692') throw new Error('f3: đáy xˣ khác CONTENT.md');
    must('1^1', 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.no, kind: 'error' }, { t: T.cant, kind: 'beep' }, { t: T.x92, kind: 'tick' }, { t: T.one92b, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T, F0 = this.FROM;
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.no && t < T.cant ? ['×', 'ERR'] : ['×']);
      card(d, prog(t, F0 + 0.3, F0 + 1.2), 'ACT V', 'INDETERMINATE MEANS');
      // 89
      const X = 132;
      dm(d, [['0^0^', C.ink], [' · INDETERMINATE FORM', C.ink]], X, 160, 7, C.ink,
        { k: prog(t, F0 + 0.4, F0 + 0.9) * 0.1 + prog(t, T.calculus - 0.2, T.form + 0.3) * 0.9 });
      // 91a: gạch chân "0^0" = hình dạng của một giới hạn
      if (t > T.shape1 - 0.3) {
        const w0 = dmW('0^0^', 7);
        d.fillStyle = C.ink; d.fillRect(X, 222, w0 * outCubic(prog(t, T.shape1 - 0.3, T.shape1 + 0.1)), 5);
        dm(d, 'THE SHAPE OF A LIMIT', X, 238, 3, C.dim, { k: prog(t, T.shape1, T.shape1 + 0.6) });
      }
      // 90: câu SAI → âm bản
      if (t > T.indet - 0.1) {
        const s = 'INDETERMINATE = NO VALUE', y = 290;
        dm(d, s, X, y, 7, C.ink, { k: prog(t, T.indet - 0.1, T.no - 0.1) });
        wrong(d, X, y, X + dmW(s, 7), y + 49, prog(t, T.no, T.value + 0.35));
      }
      // 91b: ý đúng ngay dưới
      if (t > T.cant - 0.1) dm(d, "CAN'T READ IT OFF THE SHAPE", X, 392, 6, C.ink, { k: prog(t, T.cant - 0.1, T.shape2 + 0.3) });
      if (t > T.work - 0.1) {
        dm(d, 'WORK IT OUT', X, 466, 6, C.ink, { k: prog(t, T.work - 0.1, T.case1 - 0.05) });
        dm(d, ' · CASE BY CASE', X + dmW('WORK IT OUT', 6) + 6, 466, 6, C.ink, { k: prog(t, T.case1 - 0.1, T.e91 + 0.2) });
      }
      // 92–93: đồ thị xˣ
      this.graph(d, t);
    });
    // nhân vật: đứng nghe quanh câu 91, xuống trước khi đồ thị kéo dài
    const kin = prog(t, T.means - 0.3, T.means + 0.05), out = smooth(prog(t, T.case2 + 0.1, T.case2 + 0.9));
    if (kin > 0 && out < 1) figure(g, 'idle', 1665, 1080 + out * 760 * 1.05, 760, kin);
  }
  graph(d, t) {
    const T = this.T, axc = `rgba(${C.inkRGB},0.5)`, ka = prog(t, this.FROM + 0.3, this.FROM + 1.2);
    // tiêu đề: SOMETIMES → 1 · 2 · 1/2 · SOMETHING ELSE
    if (t > T.sometimes - 0.1) dm(d, [['SOMETIMES → ', C.ink], ['1', C.one]], 132, 540, 5, C.ink, { k: prog(t, T.sometimes - 0.1, T.one92 + 0.1) });
    const x2 = 132 + dmW('SOMETIMES → 1', 5);
    if (t > T.two93 - 0.1) dm(d, ' · 2', x2, 540, 5, C.ink, { k: prog(t, T.two93 - 0.1, T.two93 + 0.2) });
    if (t > T.half - 0.1) dm(d, ' · 1/2', x2 + dmW(' · 2', 5) + 5, 540, 5, C.ink, { k: prog(t, T.half - 0.1, T.half + 0.25) });
    if (t > T.something - 0.1) dm(d, ' · SOMETHING ELSE', x2 + dmW(' · 2 · 1/2', 5) + 5, 540, 5, C.ink, { k: prog(t, T.something - 0.1, T.entirely + 0.3) });
    // trục + mức 1
    dots(d, GX0, gy(0.5), GX1, gy(0.5), axc, { step: 8, size: 4, k: ka });
    dots(d, GX0, gy(0.5), GX0, gy(1.05), axc, { step: 8, size: 4, k: ka });
    dots(d, GX0, gy(1), GX1, gy(1), `rgba(${C.oneRGB},0.35)`, { step: 14, size: 4, k: ka });
    if (ka >= 1) {
      seg7(d, '1', GX0 - 64, gy(1) - 20, 40, C.one);
      dm(d, '0.5', GX0 - 80, gy(0.5) - 10, 3, C.ink);
      dm(d, '0', GX0 - 6, gy(0.5) + 18, 3, C.ink); dm(d, '1', GX1 - 6, gy(0.5) + 18, 3, C.ink);
      dm(d, 'X', GX1 + 26, gy(0.5) - 14, 4, C.ink);
      dm(d, 'X^X^', GX1 - 80, gy(1) - 44, 5, C.ink);
    }
    // đường xˣ, x từ 1 về 0
    const kc = prog(t, T.x92, T.one92b);
    if (kc > 0) {
      pixLine(d, this.PTS, C.ink, { p: 6, k: kc });
      const i = Math.min(this.PTS.length - 1, Math.ceil((this.PTS.length - 1) * kc));
      const [hx, hy] = this.PTS[i]; d.fillStyle = C.ink; d.fillRect(hx - 9, hy - 9, 18, 18);
    }
    // đáy
    if (t > T.dips) {
      const k = prog(t, T.dips, T.dips + 0.5), mx = gx(+this.XM), my = gy(+this.VM);
      dots(d, mx, my + 14, mx, gy(0.5), `rgba(${C.inkRGB},0.4)`, { step: 10, size: 4, k });
      dm(d, `≈ ${this.VM} AT X ≈ ${this.XM}`, mx + 32, my + 36, 4, C.ink, { k: prog(t, T.dips, T.climbs) });
    }
    // về 1 khi x → 0
    if (t > T.one92b - 0.05) {
      const k = outCubic(prog(t, T.one92b - 0.05, T.one92b + 0.35));
      d.strokeStyle = C.ink; d.lineWidth = 5; const r = 22 + 14 * (1 - k);
      d.strokeRect(GX0 - r, gy(1) - r, 2 * r, 2 * r);
      dm(d, [['X → 0:  X^X^ → ', C.ink], ['1', C.one]], GX0 + 50, gy(1) - 40, 4, C.ink, { k: prog(t, T.one92b, T.one92b + 0.6) });
    }
  }
}
