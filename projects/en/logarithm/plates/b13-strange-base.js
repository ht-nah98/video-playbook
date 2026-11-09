// b13 · A strange base (ACT FIVE ★) — DNA blocks. Thẻ hồi "ACT FIVE" → khối log tím ("logarithm") đổi thành "ln" ("written l n") với thẻ
// NATURAL → khối CƠ SỐ đỏ in dần "≈ 2.718" ("two point seven one eight") với thẻ STRANGE BASE → khối bạch dương "e" rơi ("called e").
// Mascot calculator (trái) nói cả mục.
import { H, C, AR, prog, lookup, must, outCubic, ground, block, tag, text, figure, secTag, actTitle, E } from '../kit.js';

const sway = (t, ph = 0) => 0.018 * Math.sin(t * 2.1 + ph);

export default class StrangeBase {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b13');
    this.T = {
      nat: w(60, 'natural'), log: w(60, 'logarithm'), ln: w(60, 'n'), strange: w(60, 'strange'), base: w(60, 'base'),
      two: w(60, 'two'), eight: w(60, 'eight'), that: w(61, 'that'), called: w(61, 'called'),
    };
    this.START = L(60).start;
    this.FROM = Math.max(this.START - 2.6, L(59).end + 0.5);
    this.END = L(61).end;
    this.DIG = `≈ ${E}`;                                            // "≈ 2.718"
    must(`Math.round(Math.E * 1000) / 1000`, E);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.log + 0.1, 'wood'), c(T.ln, 'pop'), c(T.strange - 0.3, 'wood'), c(T.that + 0.2, 'wood'), c(this.END + 0.1, 'pop')];
  }
  render(g, t) {
    const T = this.T, base = 860;
    ground(g, 'table');
    // ô chờ trên bàn (hàng dưới thẻ hồi)
    const ks = prog(t, this.START - 2.4, this.START - 2.0), kl = prog(t, T.log - 0.1, T.log + 0.3), kb = prog(t, T.strange - 0.3, T.strange + 0.15), ke = prog(t, T.that, T.that + 0.4);
    g.save(); g.globalAlpha = ks; g.setLineDash([10, 9]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3;
    if (kl < 1) g.strokeRect(760 - 75, base - 150, 150, 150);
    if (kb < 1) g.strokeRect(1190 - 150, base - 150, 300, 150);
    if (ke < 1) g.strokeRect(1650 - 95, base - 190, 190, 190);
    g.restore();
    // log → ln
    const swap = prog(t, T.ln, T.ln + 0.25);
    block(g, 760, base, 150, { color: C.log, label: swap < 0.5 ? 'log' : 'ln', k: kl, ink: C.white });
    tag(g, 'NATURAL', 760, base - 280, { size: 44, edge: C.log, color: C.logInk, k: prog(t, T.nat, T.nat + 0.35), rot: sway(t, 1), string: [730, base - 160] });
    // cơ số đỏ, in dần "≈ 2.718"
    block(g, 1190, base, 0, { w: 300, h: 150, d: 28, color: C.base, k: kb, from: 520 });
    const kd = prog(t, T.two, T.eight + 0.35);
    if (kb >= 1) text(g, this.DIG, 1190, base - 75, { font: `900 64px ${AR}`, color: C.white, align: 'center', base: 'middle', k: kd });
    tag(g, 'STRANGE BASE', 1190, base - 280, { size: 44, edge: C.base, color: C.baseInk, k: prog(t, T.strange, T.strange + 0.35), rot: sway(t, 2), string: [1130, base - 160] });
    // e
    block(g, 1650, base, 190, { color: C.birch, label: 'e', k: ke, from: 560 });
    secTag(g, 'A strange base', { k: prog(t, this.START, this.START + 0.4), t });
    actTitle(g, t, this.START, 'ACT FIVE', 'Where seventy-two comes from');
    const a = this.START - 0.2, mk = prog(t, a, a + 0.5), mo = outCubic(prog(t, this.END + 1.5, this.END + 2.0));
    if (mk > 0 && mo < 1) { g.save(); g.translate(0, mo * 300); figure(g, 'calculator', 150, H, 262, mk, { t }); g.restore(); }
  }
}
