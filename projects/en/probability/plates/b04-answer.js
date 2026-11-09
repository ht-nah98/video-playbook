// b04 · "The condition everyone forgets" (c) · câu p2 20–23 — tên của lỗi + câu trả lời ①.
//  câu 20  "equiprobability bias" → thẻ chữ lớn viết vào; "every answer" → 11 ô tổng nhỏ, đều nhau (sai) — người que xếp chúng thẳng hàng.
//  câu 21  "most common mistake" → giấy note "#1 mistake"; "statistics classes" → 3 cuốn sách chồng lên; "stronger" → mũi tên đỏ lên.
//  câu 22  "first answer" → ① khoanh tròn.
//  câu 23  câu trả lời ① viết bút bi: "what you want ÷ everything that could happen" + "equally likely pieces" tô vàng.
import { W, H, C, AR, MO, CO, clamp, prog, lookup, lerp, paper, write, calc, big, hi, ring, arrow, note, gambler, POSE, hand, seg, rr, contact } from '../kit.js';
import { mascot, pose } from './g-common.js';

export default class Answer {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer', 'ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b04');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l20: S(20), name20: w(20, 'name'), bias20: w(20, 'bias'), every20: w(20, 'every'), e20: E(20),
      common21: w(21, 'common'), stat21: w(21, 'statistics'), cure21: w(21, 'cure'), stronger21: w(21, 'stronger'), e21: E(21),
      l22: S(22), first22: w(22, 'first'), e22: E(22),
      l23: S(23), want23: w(23, 'want'), everything23: w(23, 'everything'), both23: w(23, 'both'), equally23: w(23, 'equally'), e23: E(23),
    };
    this.START = S(20);
    this.FROM = S(20) - 0.5;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.bias20, 'pen'), c(T.common21, 'pop'), c(T.stat21, 'page'), c(T.stronger21, 'error'), c(T.first22, 'pen'), c(T.want23, 'pen'), c(T.equally23, 'shimmer')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    const out = prog(t, T.l22 - 0.2, T.l22 + 0.4);         // phần "bias" lùi lên, nhường chỗ cho câu trả lời
    g.save(); g.globalAlpha = 1 - out;
    write(g, 'researchers call it', 200, 120, prog(t, T.l20 + 0.3, T.name20), { font: `600 40px ${AR}`, color: C.ink2 });
    write(g, 'the equiprobability bias', 200, 220, prog(t, T.name20, T.bias20 + 0.6), { font: `800 80px ${AR}`, color: C.ink });
    hi(g, 190, 150, 960, 92, prog(t, T.bias20 + 0.5, T.bias20 + 1.0));
    // 11 ô đều nhau (cách nghĩ sai): mỗi tổng một ô cùng cỡ
    const ke = prog(t, T.every20, T.e20);
    for (let s = 2; s <= 12; s++) { const k = clamp(ke * 11 - (s - 2)), x = 220 + (s - 2) * 96;
      if (k <= 0) continue; hand(g, [[x, 340], [x + 80, 340], [x + 80, 420], [x, 420], [x, 340]], { w: 3, color: C.pencil, k, seed: s });
      write(g, String(s), x + 40, 396, k, { font: `800 44px ${AR}`, color: C.ink2, align: 'center' });
      write(g, '1/11', x + 40, 470, k, { font: `500 30px ${MO}`, color: C.lose, align: 'center' }); }
    if (ke > 0) gambler(g, 220 + 11 * 96 + 70, 520, 170, ke < 1 ? pose('push', 'stand', ke) : POSE.cheer, { dir: -1 });
    // note #1 mistake + sách thống kê + mũi tên
    note(g, 1340, 130, 420, 210, prog(t, T.common21, T.common21 + 0.4), { col: C.note[1], rot: 0.04, title: '#1 student', body: ['mistake'] });
    const ks = prog(t, T.stat21, T.cure21);
    for (let i = 0; i < 3; i++) { const k = clamp(ks * 3 - i); if (k <= 0) continue; const y = 520 - i * 46;
      contact(g, 1500, 540, 140, 14, 0.2); g.save(); g.fillStyle = [C.dieB, C.win, C.orange][i]; g.fill(rr(1390 + i * 8, y - 40, 230, 40, 4)); g.restore();
      write(g, 'STATS', 1505 + i * 8, y - 8, 1, { font: `800 28px ${AR}`, color: '#FFFFFF', align: 'center' }); }
    arrow(g, 1700, 520, 1700, 380, prog(t, T.stronger21, T.stronger21 + 0.5), { color: C.lose, w: 8 });
    g.restore();
    // ① câu trả lời đầu
    if (t >= T.l22 - 0.2) {
      ring(g, 250, 640, 48, 48, prog(t, T.first22, T.first22 + 0.5), { color: C.ink, w: 5 });
      write(g, '1', 250, 664, prog(t, T.first22 + 0.2, T.first22 + 0.5), { font: `800 64px ${AR}`, color: C.ink, align: 'center' });
      write(g, 'probability =', 340, 664, prog(t, T.l23, T.want23), { font: `800 64px ${AR}`, color: C.ink });
      write(g, 'what you want', 1010, 620, prog(t, T.want23 - 0.3, T.want23 + 0.6), { font: `800 56px ${AR}`, color: C.ink, align: 'center' });
      hand(g, seg(780, 650, 1240, 650, 20), { w: 5, k: prog(t, T.want23 + 0.4, T.everything23), seed: 2 });
      write(g, 'everything that could happen', 1010, 720, prog(t, T.everything23 - 0.2, T.everything23 + 0.9), { font: `800 46px ${AR}`, color: C.ink, align: 'center' });
      hi(g, 330, 790, 820, 70, prog(t, T.equally23, T.equally23 + 0.7));
      write(g, 'both counted in equally likely pieces', 345, 840, prog(t, T.both23, T.e23), { font: `700 40px ${AR}`, color: C.ink });
    }
    mascot(g, t, t >= T.l23 ? 'ok' : 'pointer', -1, { x: 1780 });
  }
}
