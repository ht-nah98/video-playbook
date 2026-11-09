// d1 · Four rows, five columns — MỞ HỒI III (thẻ "ACT THREE · Other shapes · ANSWERS 2").
// Ô cửa chuẩn X 712, Y 132, cs 80, kính trong; thẻ hồi trượt lên thì ô cửa trồi lên từ dưới.
// "top four rows … red" → 4 hàng trên lắp kính đỏ (so le theo hàng) + "4 SETS"; "five columns … blue" → 5 cột phải lắp
// kính xanh gân, ô chung thả lớp thứ hai → kính đôi + "5 SETS"; câu cuối: "5 sets = 4 sets + 1 set".
// d2 nối thẳng (CONTINUES) từ khung cuối của cảnh này.
import { C, W, H, prog, lookup, must, outCubic, ground, window9, pane, text, ARC, it, label, eq, sectionTag,
  actCard, actFlash, dark, D, SQ, SQ_DBL } from '../kit.js';

const GX = 712, GY = 132, CS = 80;
/** Hình học một ô như window9 (để thả kính mới đè lên kính cũ rồi in lại số). */
function cellBox(r, c) {
  const thin = Math.max(4, CS * 0.07), thick = thin * 2.1;
  const l = c % 3 ? thin / 2 : thick / 2, t = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2;
  return [GX + c * CS + l, GY + r * CS + t, CS - l - rg];
}
function digitAt(g, r, c, v, color = C.digit) {
  text(g, String(v), GX + c * CS + CS / 2, GY + r * CS + CS / 2 + CS * 0.58 * 0.36, `600 ${Math.round(CS * 0.58)}px ${ARC}`, color, 'center');
}

export default class Shapes {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      shapes: w(36, 'shapes'), can: w(36, 'can', 2), top: w(37, 'top'), four2: w(37, 'four', 2), five: w(38, 'five'),
      five2: w(38, 'five', 2), blue39: w(39, 'blue'), one: w(39, 'one'), end: L(39).end,
    };
    this.START = L(36).start;
    this.FROM = Math.max(this.START - 2.6, L(35).end + 0.5);
    must(`${SQ_DBL.length}`, 20);
    must('5 − 4', 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: actFlash(this.FROM), kind: 'shimmer' }, { t: T.top, kind: 'chip' }, { t: T.five, kind: 'chip' },
      { t: T.blue39, kind: 'pen' }];
  }
  /** Độ lắp kính đỏ / xanh của ô (0 → 1), so le theo hàng / cột. */
  kr(t, r, c) { return SQ.red(r, c) ? prog(t, this.T.top + r * 0.2 + c * 0.03, this.T.top + r * 0.2 + c * 0.03 + 0.45) : 0; }
  kb(t, r, c) { return SQ.blue(r, c) ? prog(t, this.T.five + (c - 4) * 0.2 + r * 0.03, this.T.five + (c - 4) * 0.2 + r * 0.03 + 0.45) : 0; }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ô cửa trồi lên khi thẻ hồi trượt đi
    const rise = (1 - outCubic(prog(t, this.START - 0.35, this.START + 0.5))) * 960;
    if (rise < 960) {
      g.save(); g.translate(0, rise);
      // kind = trạng thái đã lắp xong; ô đang lắp: kính mới thả đè lên kính cũ (refit), rồi in lại số
      const kindOf = (r, c) => {
        const kr = this.kr(t, r, c), kb = this.kb(t, r, c);
        if (kb >= 1) return SQ.red(r, c) ? 'dbl' : 'blue';
        if (kr >= 1) return 'red';
        return 'clear';
      };
      window9(g, GX, GY, CS, { kindOf });
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const kr = this.kr(t, r, c), kb = this.kb(t, r, c);
        let kind = null, k = 0;
        if (kb > 0 && kb < 1) { kind = SQ.red(r, c) ? 'dbl' : 'blue'; k = kb; }
        else if (kr > 0 && kr < 1) { kind = 'red'; k = kr; }
        if (kind) { const [x, y, s] = cellBox(r, c); pane(g, x, y, s, kind, r * 9 + c + 1, k); digitAt(g, r, c, D(r, c)); }
      }
      // nhãn bộ: 4 SETS bên phải 4 hàng đỏ, 5 SETS dưới 5 cột xanh
      label(g, '4 sets', GX + 9 * CS + 36, GY + 2 * CS + 10, { size: 26, color: C.redT, k: prog(t, T.four2, T.four2 + 0.5) });
      label(g, '5 sets', GX + 6.5 * CS, GY + 9 * CS + 62, { size: 26, color: C.blueT, align: 'center', k: prog(t, T.five2, T.five2 + 0.5) });
      g.restore();
    }
    // trái: câu hỏi, trả lời, cân bộ
    sectionTag(g, 'ACT III · OTHER SHAPES', prog(t, this.START, this.START + 0.6));
    it(g, 'other shapes?', 96, 230, 72, C.ink, { k: prog(t, T.shapes - 0.2, T.shapes + 0.4) });
    it(g, 'it can.', 96, 300, 44, C.dim, { k: prog(t, T.can, T.can + 0.3) });
    eq(g, [['5 sets', C.blueT], [' = '], ['4 sets', C.redT], [' + 1 set']], 96, 400, 52,
      { k: prog(t, T.blue39 - 0.3, T.one + 0.4) });
    dark(g, actCard(g, t, this.FROM, this.START, 'ACT THREE', 'Other shapes', 'ANSWERS 2'));
  }
}
