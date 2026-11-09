// f1 · A shape, not a number — MỞ HỒI V "WHEN LIMITS DECIDE · ANSWERS 3".
//   79 "why do some calculators refuse" → máy trong tay (pose-calculator) hiện 0^0 rồi "Err", chỉ báo ERR bật
//   80 "in calculus 0^0 has a second life" → hai ô: "0^0 AS A NUMBER" (= 1 lam, COUNTING · ALGEBRA) và
//      "0^0 AS THE SHAPE OF A LIMIT" (LIM X^Y, X,Y → 0) → "INDETERMINATE FORM" gõ vào đúng chữ
//   81 "this is the part … no value at all … worth getting right" → ô phải được khoanh mực; lời đồn trích dẫn; gạch chân.
import { C, smooth, outCubic, prog, ground, ink, seg7, row, rowW, dm, dmW, annunciators, card, actTitle, dots, figure,
  onCalcScreen, lookup } from '../kit.js';

/** Khung viền đứt (ô chờ) — đường chấm bốn cạnh. */
function dashBox(d, x, y, w, h, col, k = 1) {
  dots(d, x, y, x + w, y, col, { step: 12, size: 4, k }); dots(d, x + w, y, x + w, y + h, col, { step: 12, size: 4, k });
  dots(d, x + w, y + h, x, y + h, col, { step: 12, size: 4, k }); dots(d, x, y + h, x, y, col, { step: 12, size: 4, k });
}

export default class Shape {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      why: w(79, 'why'), refuse: w(79, 'refuse'), e79: L(79).end,
      calculus: w(80, 'calculus'), zero80: w(80, 'zero'), second: w(80, 'second'), life: w(80, 'life'),
      indet: w(80, 'indeterminate'), form: w(80, 'form'),
      part: w(81, 'part'), convinces: w(81, 'convinces'), no81: w(81, 'no'), all81: w(81, 'all'),
      worth: w(81, 'worth'), right: w(81, 'right'), e81: L(81).end,
    };
    this.START = L(79).start;
    this.FROM = Math.max(this.START - 2.6, L(78).end + 0.5);   // mở hồi
  }
  sfx() {
    const T = this.T;
    return [{ t: T.refuse, kind: 'beep' }, { t: T.second, kind: 'beep' }, { t: T.convinces, kind: 'tick' }, { t: T.worth, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const err = t >= T.refuse - 0.05 && t < T.calculus + 0.6;
    ink(g, d => {
      annunciators(d, err ? ['×', 'ERR'] : ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.2), 'ACT V', 'A SHAPE, NOT A NUMBER');
      actTitle(d, t, this.START, 'V', 'WHEN LIMITS DECIDE', 'ANSWERS 3');
      if (t < this.START + 0.2) return;
      // 79: câu hỏi gõ vào
      dm(d, 'SO WHY DO SOME CALCULATORS REFUSE?', 132, 170, 5, C.ink, { k: prog(t, T.why - 0.1, T.refuse + 0.3) });
      // 80: hai ô
      const bx = [132, 732], by = 280, bw = 560, bh = 420;
      const kA = prog(t, T.calculus - 0.3, T.calculus + 0.3), kB = prog(t, T.second - 0.3, T.second + 0.2);
      dashBox(d, bx[0], by, bw, bh, `rgba(${C.inkRGB},0.3)`, Math.max(prog(t, this.START + 0.3, this.START + 0.9), kA));
      dashBox(d, bx[1], by, bw, bh, `rgba(${C.inkRGB},0.3)`, Math.max(prog(t, this.START + 0.5, this.START + 1.1), kB));
      if (t > T.calculus - 0.3) {
        const x = bx[0] + 36;
        dm(d, '0^0^ AS A NUMBER', x, by + 36, 5, C.ink, { k: prog(t, T.calculus - 0.3, T.zero80 + 0.2) });
        // giá trị 1 = kết quả ĐẾM của hồi IV (e1), không lấy từ 0 ** 0 của JS (kit: must)
        const toks = [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: '1', col: C.one }];
        row(d, toks, x, by + 140, 130, { k: prog(t, T.zero80, T.second - 0.1) });
        if (t > T.second - 0.2) dm(d, 'IN COUNTING · ALGEBRA', x, by + 330, 4, C.dim, { k: prog(t, T.second - 0.2, T.life + 0.2) });
      }
      if (t > T.second - 0.3) {
        const x = bx[1] + 36;
        dm(d, '0^0^ AS THE SHAPE', x, by + 36, 5, C.ink, { k: prog(t, T.second - 0.3, T.life + 0.1) });
        dm(d, 'OF A LIMIT', x, by + 86, 5, C.ink, { k: prog(t, T.life - 0.1, T.life + 0.35) });
        dm(d, 'LIM X^Y^', x, by + 170, 9, C.ink, { k: prog(t, T.life + 0.2, T.life + 0.7) });
        dm(d, 'X, Y → 0', x + 30, by + 260, 5, C.dim, { k: prog(t, T.life + 0.5, T.indet) });
        if (t > T.indet - 0.1) dm(d, 'INDETERMINATE FORM', x, by + 340, 4, C.ink, { k: prog(t, T.indet - 0.1, T.form + 0.3) });
      }
      // 81: "this is the part" → khoanh ô phải bằng khung mực đặc
      if (t > T.part - 0.1) {
        const k = outCubic(prog(t, T.part - 0.1, T.part + 0.4)), x = bx[1] - 8, y = by - 8, w = bw + 16, h = bh + 16;
        d.fillStyle = C.ink;
        d.fillRect(x, y, w * k, 5); d.fillRect(x + w - w * k, y + h - 5, w * k, 5);
        d.fillRect(x, y + h - h * k, 5, h * k); d.fillRect(x + w - 5, y, 5, h * k);
      }
      if (t > T.convinces - 0.1) {
        dm(d, 'MANY PEOPLE CONCLUDE:', 132, 776, 5, C.dim, { k: prog(t, T.convinces - 0.1, T.no81 - 0.3) });
        dm(d, '"0^0^ HAS NO VALUE AT ALL"', 132, 840, 6, C.ink, { k: prog(t, T.no81 - 0.5, T.all81 + 0.3) });
      }
      if (t > T.worth - 0.1) {
        const x = 1000, y = 840;
        dm(d, 'WORTH GETTING RIGHT', x, y, 5, C.ink, { k: prog(t, T.worth - 0.1, T.right + 0.2) });
        d.fillStyle = C.ink; d.fillRect(x, y + 52, dmW('WORTH GETTING RIGHT', 5) * outCubic(prog(t, T.right, T.right + 0.5)), 5);
      }
    });
    // nhân vật: trồi lên ở câu hỏi, máy hiện 0^0 rồi "Err" đúng "refuse"; trượt xuống ra khỏi khung sau câu 80
    const kin = prog(t, T.why - 0.35, T.why + 0.05), out = smooth(prog(t, T.part, T.part + 0.8));
    if (kin > 0 && out < 1) {
      const h = 780, P = figure(g, 'calculator', 1620, 1080 + out * h * 1.05, h, kin);
      onCalcScreen(g, P, (s, w, hh) => {
        if (t < T.refuse) {
          const toks = [{ c: '0' }, { c: '0', sup: true }], tw = rowW(toks, 84);
          row(s, toks, w - 22 - tw, (hh - 84) / 2, 84);
        } else {
          const blink = Math.floor((t - T.refuse) * 2.4) % 2 === 1 && t < T.refuse + 2;
          if (!blink) { const tw = rowW('Err', 84); row(s, 'Err', w - 22 - tw, (hh - 84) / 2, 84); }
        }
      });
    }
  }
}
