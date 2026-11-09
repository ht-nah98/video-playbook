// b2 · Try another number (p2, hồi I). Cùng bố cục b1 trên trang mới: cột 10³ = 1000, 10² = 100, 10¹ = 10 bấm vào theo
//   lời; "÷10" từng bậc; 10⁰ = ? → 1 lam khi "ten divided by ten is one"; ô 1 lam; "2⁰ = 1 · 10⁰ = 1"; con trỏ đi xuống
//   cầu thang và "lands on one"; "ANY BASE ≠ 0 → 1"; khoanh bậc chót + "LAST STEP: N ÷ N = 1".
import { C, smooth, prog, ground, ink, card, row, rowW, dm, annunciators, figure, lookup, must } from '../kit.js';
import { COL, colGeom, powRow, stepArrow, oneBox } from './b1-down.js';

export default class Ten {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['notebook'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      check: w(6, 'check'), another: w(6, 'another'), take: w(6, 'take'), ten6: w(6, 'ten'),
      r: [[w(7, 'ten', 1), w(7, 'thousand')], [w(7, 'ten', 2), w(7, 'hundred')], [w(7, 'ten', 3), w(7, 'ten', 4)]],
      each: w(8, 'each'), divides: w(8, 'divides'), ten8: w(8, 'ten', 1), and8: w(8, 'and'), divided8: w(8, 'divided'), one8: w(8, 'one'),
      zero9: w(9, 'zero'), one9: w(9, 'one'), e9: L(9).end,
      start: w(10, 'start'), any: w(10, 'any'), like: w(10, 'like'), isnt: w(10, "isn't"), zero10: w(10, 'zero'),
      staircase: w(10, 'staircase'), lands: w(10, 'lands'), one10: w(10, 'one'), last: w(10, 'last'), itself: w(10, 'itself'),
    };
    this.START = L(6).start;
    this.FROM = this.START - 1.2;
    this.V = [must('10^3', 1000), must('10^2', 100), must('10^1', 10), must('10^0', 1)].map(String);
    must('1000 ÷ 10', 100); must('100 ÷ 10', 10); must('10 ÷ 10', 1); must('2^0', 1);
    this.G = colGeom('10', '1000');
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ten6, kind: 'beep' }, { t: T.r[2][1], kind: 'beep' }, { t: T.one8, kind: 'beep' }, { t: T.lands, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, V = this.V, { X, Y0, STEP, H: h } = COL, VR = this.G.VR, AX = VR + 64, PX = AX + 200, F = this.FROM;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, F + 0.3, F + 0.9), 'ACT I', 'TRY ANOTHER NUMBER');
      // "take ten": cơ số mới gõ vào bảng phải
      if (t > T.another - 0.1) dm(d, 'BASE:', PX, Y0 + 30, 6, C.dim, { k: prog(t, T.another - 0.1, T.take) });
      if (t > T.ten6 - 0.1) row(d, '10', PX + 210, Y0 + 6, 80, { k: prog(t, T.ten6 - 0.1, T.ten6 + 0.2) });
      // cột (ô chờ có sẵn từ đầu trang)
      for (let i = 0; i < 4; i++) {
        const y = Y0 + i * STEP, kIn = prog(t, F + 0.3 + i * 0.12, F + 0.5 + i * 0.12);
        if (kIn <= 0) continue;
        d.save(); d.globalAlpha = kIn;
        if (i < 3) {
          const [a, b] = T.r[i];
          powRow(d, '10', String(3 - i), V[i], X, y, VR, h, { kL: prog(t, a - 0.1, a + 0.4), showV: t >= b - 0.05, slots: 4 });
        } else {
          const one = t >= T.one8 - 0.05;
          powRow(d, '10', '0', V[3], X, y, VR, h, { kL: prog(t, T.and8 - 0.1, T.ten8 + 0.9), showV: one, valCol: C.one, q: t >= T.and8 + 0.2 && !one, slots: 4 });
        }
        d.restore();
      }
      // "each step down divides by ten"
      if (t > T.each - 0.1) dm(d, 'EACH STEP DOWN: ÷10', PX, Y0 + STEP + 40, 6, C.ink, { k: prog(t, T.each - 0.1, T.ten8 + 0.2) });
      for (let i = 0; i < 2; i++) stepArrow(d, AX, Y0 + i * STEP, '÷10', prog(t, T.divides - 0.1 + i * 0.35, T.divides + 0.5 + i * 0.35));
      stepArrow(d, AX, Y0 + 2 * STEP, '÷10', prog(t, T.divided8 - 0.2, T.divided8 + 0.4));
      // "so ten to the zero is one as well" → ô 1 lam + cùng chỗ với 2⁰
      oneBox(d, VR, Y0 + 3 * STEP, h, prog(t, T.zero9 - 0.2, T.one9 + 0.1));
      if (t > T.zero9 - 0.2) dm(d, [['2^0^ = ', C.ink], ['1', C.one], ['  ·  10^0^ = ', C.ink], ['1', C.one]], PX, Y0 + 2 * STEP + 40, 6, C.ink,
        { k: prog(t, T.zero9 - 0.2, T.e9 + 0.2) });
      // "the staircase always lands on one": con trỏ (gạch mực) đi xuống từng bậc
      const ks = prog(t, T.staircase - 0.1, T.lands);
      if (ks > 0) {
        const pos = Math.min(3, ks * 3), i = Math.floor(pos), f = smooth(pos - i), y = Y0 + (i + (i < 3 ? f : 0)) * STEP + h + 28;
        const w = rowW('1000', h);
        d.fillStyle = C.ink; d.fillRect(VR - w, y, w, 7);
      }
      // "as long as it isn't zero … lands on one"
      const kA = (8 * prog(t, T.any - 0.1, T.like) + 4 * prog(t, T.isnt - 0.1, T.zero10 + 0.3) + 4 * prog(t, T.lands - 0.1, T.one10 + 0.1)) / 16;
      if (kA > 0) dm(d, [['ANY BASE ≠ 0 → ', C.ink], ['1', C.one]], X, Y0 + 4 * STEP + 20, 7, C.ink, { k: kA });
      // "on the last step, you are dividing the number by itself": khoanh bậc chót
      const kL = prog(t, T.last - 0.1, T.last + 0.4);
      if (kL > 0) {
        const lw = 30 + 6 * 6 * 3 + 12, y0 = Y0 + 2 * STEP + h / 2 + 18, y1 = Y0 + 3 * STEP + h / 2 - 18;
        d.strokeStyle = C.ink; d.lineWidth = 4; d.strokeRect(AX - 24, y0 - 6, (lw + 30) * kL, y1 - y0 + 12);
        dm(d, [['LAST STEP: N ÷ N = ', C.ink], ['1', C.one]], X, Y0 + 4 * STEP + 120, 7, C.ink, { k: prog(t, T.last, T.itself + 0.3) });
      }
    });
    // nhân vật cầm sổ khi "let's check with another number", tụt ra khỏi khung khi cột bắt đầu bấm
    const kin = prog(t, T.check - 0.35, T.check), out = smooth(prog(t, T.r[1][1], T.r[1][1] + 0.5));
    if (kin > 0 && out < 1) figure(g, 'notebook', 1630, 1080 + 800 * out, 760, kin);
  }
}
