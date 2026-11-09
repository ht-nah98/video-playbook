// b2 · ギャンブラーの誤謬 (p2, câu 6–12) — DNA ACT 1: viên xám lăn ra liên tiếp (12 lần ra trắng tay), bóng chữ 「そろそろ来るはず」 là tem xám
//  → bị bóc ở 「覚えていません」; coin + xúc xắc không nhớ; viên 13 vẫn 0.6%; viên 13 hé một bộ đếm nhỏ (gợi ACT 2). Mascot ponder (câu 7–10).
//  Tiêu đề hiện 「ギャンブラーの誤謬（思い込み）」: SCRIPT nói 思い込み, tên mục giữ 誤謬.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, telop, write, wrong, capsule, heading, figure, rr, P } from '../kit.js';
import { out, shade, ring, fillGaps } from './g2-util.js';

const R = 50, X0 = 200, DX = 118, RY = 560;          // hàng viên: 13 vị trí
const px = i => X0 + i * DX;

export default class Gobyu {
  static ERA = 'studio';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l6: S(6), n12: w(6, '12回'), hazureru: w(6, '外れる'), koe: w(6, '声'),
      l7: S(7), sorosoro: w(7, 'そろそろ'), kuru: w(7, '来る'),
      l8: S(8), gyan: w(8, 'ギャンブラー'), omoikomi: w(8, '思い込み'),
      l9: S(9), coin: w(9, 'コイン'), saikoro: w(9, 'サイコロ'), kekka9: w(9, '結果'), oboete9: w(9, '覚えて'),
      l10: S(10), n13: w(10, '13回目'), kakuritsu: w(10, '確率'), p06: w(10, '0.6%'), mama: w(10, 'まま'),
      l11: S(11), honmono: w(11, '本物'), oboete11: w(11, '覚えて'), imasu: w(11, 'います'),
      l12: S(12), ato: w(12, 'あと'), end: E(12),
    };
    this.START = S(6);
    this.FROM = Math.max(this.START - 1.2, E(5) + 0.5);
    this.TA = Array.from({ length: 12 }, (_, i) => this.FROM + 0.5 + i * 0.25);
    this.P06 = must('0.006 * 100', 0.6);
    this.N = must('12 + 1', 13);
    this.MASCOT = [this.T.l7 - 0.3, this.T.l10 + 0.8];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([c(this.TA[2], 'chip'), c(this.TA[8], 'chip'), c(T.sorosoro, 'pen'), c(T.omoikomi, 'pen'), c(T.kekka9, 'card'),
      c(T.coin, 'tick'), c(T.saikoro, 'tick'), c(T.n13, 'pop'), c(T.p06, 'pen'), c(T.oboete11, 'pop'), c(T.ato, 'pen')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  coinFace(g, cx, cy, r, k) {
    if (k <= 0) return; const s = outCubic(k);
    g.save(); g.translate(cx, cy); g.scale(s, s);
    shade(g, () => { const gr = g.createLinearGradient(-r, -r, r, r); gr.addColorStop(0, '#F4F1EA'); gr.addColorStop(1, '#BDB6AB'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); }, 20, 8);
    g.strokeStyle = '#9C958A'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, r * 0.78, 0, TAU); g.stroke();
    write(g, '表', 0, r * 0.28, 1, { font: `700 ${Math.round(r)}px ${MIN}`, align: 'center' });
    g.restore();
  }
  dice(g, cx, cy, s, k) {
    if (k <= 0) return; const e = outCubic(k);
    g.save(); g.translate(cx, cy); g.rotate(0.18 * (1 - e) + 0.08); g.scale(e, e);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(-s, -s, 2 * s, 2 * s, s * 0.28)); }, 20, 8);
    g.strokeStyle = C.faint; g.lineWidth = 2; g.stroke(rr(-s, -s, 2 * s, 2 * s, s * 0.28));
    g.fillStyle = C.ink; [[-0.5, -0.5], [0.5, -0.5], [0, 0], [-0.5, 0.5], [0.5, 0.5]].forEach(([a, b]) => { g.beginPath(); g.arc(a * s, b * s, s * 0.14, 0, TAU); g.fill(); });
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 1, 'ギャンブラーの誤謬（思い込み）', prog(t, F + 0.3, F + 1.3));
    // hàng viên xám: 12 lần ra trắng tay lăn vào từ phải
    let n = 0;
    this.TA.forEach((ta, i) => {
      if (t < ta) return; const e = out(t, ta, 0.55), dx = (1 - e) * 1700; if (e >= 1 || t > ta + 0.3) n++;
      capsule(g, px(i) + dx, RY, R, 1, { tone: 'blank', rot: -0.45 - dx / R });
    });
    if (t >= this.TA[0]) write(g, [[`${Math.min(12, n)}`, `700 140px ${MIN}`], ['回 外れ', `700 52px ${MIN}`]], 1560, 245, prog(t, this.TA[0], this.TA[0] + 0.3), { align: 'center' });
    this.cap(g, t, T.n12 - 0.1, T.l7 - 0.1, [['12回続けて外れる']]);
    // 13 viên: sky, vào ở 「13回目」, mở ở 「覚えています」 (bộ đếm nhỏ)
    if (t >= T.n13 - 0.3) {
      const e = out(t, T.n13 - 0.3, 0.6), dx = (1 - e) * 600, kb = prog(t, T.oboete11 - 0.2, T.oboete11 + 0.7);
      const grow = 1 + 0.3 * outCubic(kb), cx = px(12) + dx - 36 * outCubic(kb), cy = RY - 34 * outCubic(kb);
      capsule(g, cx, cy, R * grow, 1, { tone: 'sky', rot: -0.45 - dx / R, open: kb, content: (gg, r) => {
        gg.save(); gg.rotate(-0.45); gg.fillStyle = C.white; gg.fill(rr(-r * 0.62, -r * 0.5, r * 1.24, r * 0.78, 10)); gg.strokeStyle = C.faint; gg.lineWidth = 2; gg.stroke(rr(-r * 0.62, -r * 0.5, r * 1.24, r * 0.78, 10));
        gg.restore(); write(gg, '13', 0, -r * 0.03, 1, { font: `700 34px ${MIN}`, align: 'center' }); } });
      if (kb > 0.6) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.setLineDash([4, 6]); g.beginPath(); g.arc(cx, cy, R * grow * 1.22, 0, TAU); g.stroke(); g.restore(); }
      const kp = prog(t, T.p06 - 0.1, T.p06 + 0.5);
      write(g, '13回目', px(12) - 36, 700, prog(t, T.n13, T.n13 + 0.4), { font: `700 40px ${MIN}`, color: '@dim', align: 'center' });
      write(g, `${this.P06}%`, px(12) - 36, 385, kp, { font: `700 110px ${MIN}`, color: '@sky', align: 'center' });
      ring(g, px(12) - 36, 350, 150, 62, prog(t, T.mama - 0.3, T.mama + 0.4));
    }
    // tem 「そろそろ、来るはずだ」 (câu 7) → bị bóc ở 「結果を覚えていません」
    if (t >= T.l7 - 0.1 && t < T.n13 + 2) {
      const pe = prog(t, T.kekka9, T.oboete9 + 0.9), up = out(t, T.n13 - 0.2, 0.6);
      g.save(); g.translate(0, -420 * up);
      wrong(g, '「そろそろ、来るはずだ」', 900, 285, prog(t, T.sorosoro - 0.1, T.kuru + 0.4), { size: 52, peel: pe });
      g.restore();
    }
    if (t >= T.gyan - 0.1 && t < T.n13 - 0.2) {
      const dy = -300 * out(t, T.n13 - 0.7, 0.6);
      g.save(); g.translate(0, dy);
      telop(g, [['ギャンブラーの誤謬'], ['（思い込み）', undefined, '@dim']], 960, 400, prog(t, T.gyan - 0.1, T.omoikomi + 0.6), { size: 54 }); g.restore();
    }
    // coin + xúc xắc: không nhớ
    const ob = out(t, T.n13 - 0.4, 0.6);
    if (t >= T.coin - 0.2 && ob < 1) {
      g.save(); g.translate(0, 500 * ob);
      this.coinFace(g, 1180, 780, 70, prog(t, T.coin - 0.1, T.coin + 0.4)); this.dice(g, 1440, 780, 64, prog(t, T.saikoro - 0.1, T.saikoro + 0.4));
      write(g, 'コイン', 1180, 884, prog(t, T.coin, T.coin + 0.3), { font: `700 32px ${JP}`, color: '@dim', align: 'center' });
      write(g, 'サイコロ', 1440, 884, prog(t, T.saikoro, T.saikoro + 0.3), { font: `700 32px ${JP}`, color: '@dim', align: 'center' });
      g.restore();
    }
    this.cap(g, t, T.l9 - 0.1, T.l10 - 0.1, [['前の結果を、覚えていない']], 54, 1100);
    this.cap(g, t, T.l10 - 0.1, T.l11 - 0.1, [['13回目の確率も ', undefined], ['0.6%', undefined, '@sky']], 54, 1000);
    this.cap(g, t, T.honmono - 0.1, T.l12 - 0.1, [['本物のガチャは、覚えている']], 54, 1000);
    this.cap(g, t, T.l12 - 0.1, T.end + 4, [['その話は、もう少しあとで']], 54, 1000);
    const [m0, m1] = this.MASCOT;
    if (t > m0 && t < m1 + 0.7) { g.save(); g.translate(0, 520 * out(t, m1, 0.6)); figure(g, 'ponder', 230, H, 420, prog(t, m0, m0 + 0.6), { t }); g.restore(); }
  }
}
