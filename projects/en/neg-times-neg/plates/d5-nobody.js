// d5 · Nobody chose (Hồi III, câu 75–78). Không ai chọn: ô "WHO CHOSE?" để trống, con dấu "LET IT BE SO" chỉ là bóng
// viền đứt (không ai đóng); ba thẻ luật sáng lần lượt đúng lời; câu cuối một viên VÀNG rơi ra từ ba thẻ (`ok`).
import { W, H, C, ARC, clamp, outCubic, prog, ground, drift, card, typed, label, mono, quote, eq, tile, zeroPair,
  arrow, figure, lookup } from '../kit.js';

/** Thẻ luật in thảm: chưa sáng = viền đứt nhạt; sáng (lit 0 → 1) = viền ngà liền, nền sáng nhẹ, nhấc lên 6 px. */
function ruleCard(g, x, y, w, h, k, lit, title, inner) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), dy = (1 - e) * 50 - 6 * lit;
  g.save(); g.translate(0, dy); g.globalAlpha = clamp(k * 3);
  g.save(); g.shadowColor = 'rgba(5,10,18,0.5)'; g.shadowBlur = 10 + 14 * lit; g.shadowOffsetY = 4 + 8 * lit;
  g.fillStyle = `rgba(30,44,58,${0.9})`; g.beginPath(); g.roundRect(x, y, w, h, 14); g.fill(); g.restore();
  g.fillStyle = `rgba(242,236,221,${0.07 * lit})`; g.fill();
  g.strokeStyle = lit > 0.5 ? C.ink : C.dim; g.lineWidth = 2 + lit; g.setLineDash(lit > 0.5 ? [] : [9, 7]); g.stroke(); g.setLineDash([]);
  label(g, title, x + w / 2, y + 44, 1, { color: lit > 0.5 ? C.ink : C.dim, align: 'center', size: 22 });
  inner(lit);
  g.restore();
}

export default class Nobody {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd5');
    this.T = {
      notice: w(75, 'notice'), happen: w(75, 'happen'), e75: L(75).end,
      decide: w(76, 'decide'), neg1: w(76, 'negative', 1), positive: w(76, 'positive'), banged: w(76, 'banged'),
      table: w(76, 'table'), said: w(76, 'said'), so: w(76, 'so'), e76: L(76).end,
      used: w(77, 'used'), distributive: w(77, 'distributive'), opposite: w(77, 'opposite'), behaviour: w(77, 'behaviour'), zero: w(77, 'zero'),
      answer: w(78, 'answer'), fell: w(78, 'fell'), out: w(78, 'out'), own: w(78, 'own'), e78: L(78).end,
    };
    this.START = L(75).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    // "banged on the table" → IM LẶNG có chủ ý: không có gì xảy ra
    return [{ t: T.decide, kind: 'tick' }, { t: T.distributive, kind: 'snap' }, { t: T.answer + 0.15, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 4, vy: 2.5, max: 60 });
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    quote(g, 'Notice what did not happen.', 140, 262, prog(t, this.START, T.e75), { size: 64 });
    // không ai quyết: luật dấu viết ra, ô "người chọn" để trống, con dấu chỉ là bóng
    eq(g, [['negative', C.negT], [' × '], ['negative', C.negT], [' = '], ['positive', C.posT]], 140, 356, 52, prog(t, T.neg1, T.positive + 0.4));
    const kb = prog(t, T.decide - 0.2, T.decide + 0.4);
    if (kb > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.setLineDash([10, 8]); g.globalAlpha = clamp(kb * 2);
      g.beginPath(); g.roundRect(140, 392, 560, 168, 14); g.stroke(); g.restore();
      label(g, 'who chose?', 172, 446, prog(t, T.decide, T.decide + 0.5), { color: C.ink, size: 30 });
      label(g, 'signed:', 172, 518, prog(t, T.decide + 0.3, T.decide + 0.7), { size: 20 });
      g.save(); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([4, 8]); g.beginPath(); g.moveTo(292, 520);
      g.lineTo(292 + 380 * prog(t, T.decide + 0.4, T.decide + 1.0), 520); g.stroke(); g.restore();
    }
    // "banged on the table and said, let it be so" → con dấu chưa từng đóng: viền đứt, chữ nhạt, không rơi, không tiếng
    const ks = prog(t, T.banged, T.table + 0.3);
    if (ks > 0) {
      g.save(); g.translate(1010, 470); g.rotate(-0.06); g.strokeStyle = C.dim; g.lineWidth = 2.4; g.setLineDash([12, 9]);
      g.beginPath(); g.roundRect(-230, -62, 460 * ks, 124, 8); g.stroke(); g.restore();
      g.save(); g.translate(1010, 470); g.rotate(-0.06);
      typed(g, 'LET IT BE SO', 0, 15, prog(t, T.said - 0.05, T.so + 0.2), `800 44px ${ARC}`, C.dim, { align: 'center', ls: 3 });
      g.restore();
      label(g, 'never stamped', 1010, 584, prog(t, T.so, T.e76 + 0.5), { align: 'center', size: 18 });
    }
    // ba thẻ luật: nằm sẵn trên thảm từ đầu cảnh (viền đứt, chưa dùng), sáng lần lượt theo đúng tên luật được đọc
    const kc = prog(t, this.FROM + 0.3, this.FROM + 0.9), CW = 360, CH = 210, CY = 636, X = [140, 540, 940];
    const lit = [prog(t, T.distributive, T.distributive + 0.3), prog(t, T.opposite - 0.1, T.opposite + 0.2), prog(t, T.behaviour, T.behaviour + 0.3)];
    const ink = l => (l > 0.5 ? C.ink : C.dim);
    ruleCard(g, X[0], CY, CW, CH, kc, lit[0], 'distributive', l => {
      mono(g, 'a × (b + c)', X[0] + CW / 2, CY + 110, 1, ink(l), 24, 'center');
      mono(g, '= a × b + a × c', X[0] + CW / 2, CY + 152, 1, ink(l), 24, 'center');
    });
    ruleCard(g, X[1], CY, CW, CH, kc, lit[1], 'opposites', l => {
      // nghĩa của số đối: +1 úp lên −1 → biến, còn dấu chân 0 (vật xuyên suốt)
      zeroPair(g, X[1] + CW / 2 - 52, CY + 82, 52, prog(t, T.opposite, T.behaviour - 0.1), { top: 'p', bot: 'n' });
      mono(g, 'x + (−x) = 0', X[1] + CW / 2, CY + 176, 1, ink(l), 22, 'center');
    });
    ruleCard(g, X[2], CY, CW, CH, kc, lit[2], 'zero', l => {
      mono(g, '0 × b = 0', X[2] + CW / 2, CY + 126, 1, ink(l), 28, 'center');
    });
    const ka = prog(t, T.answer - 0.5, T.answer);
    if (ka > 0) {
      const tx = 712, ty = 900, s = 96;
      X.forEach((x, i) => arrow(g, x + CW / 2, CY + CH + 10, tx + s / 2 + (i - 1) * 40, ty - 8, prog(t, T.answer - 0.5 + i * 0.08, T.answer - 0.1), { color: C.dim, w: 2.4, bend: (i - 1) * -20, seed: 11 + i }));
      tile(g, tx, ty, s, 'p', { k: prog(t, T.answer - 0.15, T.answer + 0.25) });
      label(g, 'fell out on its own', tx + s + 34, ty + 46, prog(t, T.out, T.own + 0.4), { color: C.ink, size: 22 });
      eq(g, [['negative', C.negT], [' × '], ['negative', C.negT], [' = '], ['positive', C.posT]], tx + s + 34, ty + 84, 26, prog(t, T.own, T.e78 + 0.6));
    }
    g.restore();
    // toạ độ MÀN HÌNH: thẻ mục, nhân vật
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.7), 'act III', 'NOBODY CHOSE');
    figure(g, 'ok', 1610, H, 740, prog(t, T.zero - 0.5, T.zero - 0.15));
  }
}
