// b17 · Putting it together (câu 79–81, MỞ HỒI ACT SIX) — DNA blocks. Tóm tắt bằng ba khối lời hứa ①②③ của kit (promiseBlock — đúng
// PROMISE.xs / base / hình trên mặt), mỗi khối thêm câu trả lời: ① log₂ 8 = 3 (sticker tím 3) · ② 3 + 2 = 5 BRICKS, ≈ 350 YEARS ·
// ③ ln 2 ≈ 0.693 + YEARLY INTEREST. Thẻ hồi actTitle ACT SIX rơi từ START − 2.45 (hình mới chỉ vẽ sau khi thẻ nhấc đi).
// Mascot pointer nói quanh câu 79–80 (≈ 6 s). FROM = max(START − 2.6, KẾT b16 + 0.5).
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, tag, secTag, promiseBlock, actTitle, figure, LN2, PROMISE } from '../kit.js';

const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const logT = { color: C.logInk, edge: C.log };

export default class Together {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b17');
    this.START = L(79).start;
    this.FROM = Math.max(this.START - 2.6, L(78).end + 0.5);
    this.END = L(81).end;
    this.T = {
      power: w(79, 'power'), how: w(79, 'how'), bricks: w(79, 'bricks'),
      mult: w(80, 'multiplication'), addition: w(80, 'addition'), because: w(80, 'because'), bricks1: w(80, 'bricks'), product: w(80, 'product'), bricks2: w(80, 'bricks', 2),
      added: w(80, 'added'), that: w(80, 'that'),
      s72: w(81, 'seventy-two'), natural: w(81, 'natural'), nudged: w(81, 'nudged'),
    };
    const T = this.T;
    this.FREE = this.START + 0.45;                                   // thẻ hồi đã nhấc đi
    this.MASC = [this.FREE, T.because + 0.4];
    must('Math.log2(8)', 3); must('Math.log2(32)', 5); must('3 + 2', 5); must('Math.round(3.5 * 100)', 350);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 0.9, 'wood'), c(this.FREE + 0.12, 'wood'), c(T.how + 0.05, 'card'), c(T.bricks + 0.05, 'pop'), c(T.mult - 0.3, 'wood'),
      c(T.addition + 0.05, 'snap'), c(T.because + 0.05, 'card'), c(T.that + 0.05, 'card'), c(T.s72 - 0.1, 'wood'), c(T.natural + 0.1, 'card'), c(T.nudged + 0.05, 'pop')];
  }
  render(g, t) {
    const T = this.T, S = this.START, { xs, base, h } = PROMISE, F = this.FREE;
    ground(g, 'table');
    secTag(g, 'Putting it together', { k: prog(t, S, S + 0.4), t });
    actTitle(g, t, S, 'ACT SIX', 'Putting it together');
    // ① tháp 2·2·2 = 8 → đếm tầng = 3
    const k1 = prog(t, F, F + 0.45);
    promiseBlock(g, 0, { k: k1, kp: prog(t, T.power, T.power + 0.8), cap: prog(t, T.power + 0.4, T.power + 0.8) });
    tag(g, 'log₂ 8 = 3', xs[0], 440, { size: 44, ...logT, k: prog(t, T.how, T.how + 0.3), string: [xs[0] - 20, base - h] });
    if (t >= T.bricks + 0.3) must('Math.log2(8)', 3);
    // ② × → + : các tầng của tích = tổng các tầng của từng phần
    promiseBlock(g, 1, { k: prog(t, T.mult - 0.4, T.mult + 0.05), kp: prog(t, T.mult, T.mult + 0.8), turn: prog(t, T.addition - 0.05, T.addition + 0.45),
      cap: prog(t, T.mult + 0.3, T.mult + 0.7) });
    const pl = Math.max(nudge(t, T.bricks1), nudge(t, T.bricks2), nudge(t, T.added));
    scaled(g, xs[1], 440, pl, () => tag(g, '3 + 2 = 5 BRICKS', xs[1], 440, { size: 40, ...logT, k: prog(t, T.because, T.because + 0.3), string: [xs[1] - 20, base - h] }));
    tag(g, '≈ 350 YEARS', xs[1], 330, { size: 40, k: prog(t, T.that, T.that + 0.3) });
    // ③ 「72」
    promiseBlock(g, 2, { k: prog(t, T.s72 - 0.35, T.s72 + 0.1), kp: prog(t, T.s72, T.s72 + 0.8), cap: prog(t, T.s72 + 0.3, T.s72 + 0.7) });
    tag(g, `ln 2 ≈ ${LN2}`, xs[2], 440, { size: 44, ...logT, k: prog(t, T.natural, T.natural + 0.3), string: [xs[2] - 20, base - h] });
    tag(g, '+ YEARLY INTEREST', xs[2], 340, { size: 40, color: C.goldInk, edge: C.gold, k: prog(t, T.nudged, T.nudged + 0.3) });
    // mascot pointer nói
    const km = prog(t, this.MASC[0], this.MASC[0] + 0.5) - prog(t, this.MASC[1], this.MASC[1] + 0.5);
    if (km > 0) figure(g, 'pointer', 150, H, 262, km, { t });
  }
}
