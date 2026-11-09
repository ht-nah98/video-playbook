// h2 · 次回 (p2 câu 165–171, hết video) — ERA studio, mascot wave (nói câu 170–171).
//  165–166 telop giữa · 167–169 khay ba viên nang ①②③ mở nắp: 金額で上限 / お金に換算 / 「あと少し」＝合図 · 170 khay rời xuống ·
//  171 biển kênh 「99の発見」+「チャンネル登録」 giữa trái khung, ĐỨNG YÊN tới hết trang (channels/ja/channel.json outro).
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, ground, telop as telop0, write, capsule, gem, figure, rr } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 28, oy = 12, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const PL = { x: 330, y: 300, w: 960, h: 440 };                       // biển kênh (toạ độ màn hình, đứng yên)

export default class Next {
  static ERA = 'studio';
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2');
    this.T = {
      l165: L(165).start, l166: L(166).start, shitte: w(166, '知って'),
      l167: L(167).start, kingaku: w(167, '金額'), jougen: w(167, '上限'),
      l168: L(168).start, subete: w(168, 'すべて'), kansan: w(168, '換算'),
      l169: L(169).start, atosukoshi: w(169, 'あと'), koe: w(169, '声'), aizu: w(169, '合図'),
      l170: L(170).start, l171: L(171).start, arigatou: w(171, 'ありがとう'), ch: w(171, 'チャンネル'), touroku: w(171, '登録'), end: L(171).end,
    };
    this.START = L(165).start;
    this.FROM = Math.max(this.START - 1.2, L(164).end + 0.5);
    this.M0 = this.T.l170;                                           // wave: ≈ 8 s tới hết trang
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'pop'), c(this.START + 0.2, 'pen'), c(T.l166 + 0.2, 'pen'), c(T.shitte, 'tick'), c(T.l167, 'pop'), c(T.kingaku, 'pen'), c(T.jougen, 'coin'),
      c(T.l168, 'pop'), c(T.kansan, 'soroban'), c(T.l169, 'pop'), c(T.atosukoshi, 'pen'), c(T.aizu, 'pen'), c(T.l170 + 0.1, 'pen'), c(T.l171 - 1.0, 'page'), c(T.l171 - 0.4, 'pen'), c(T.l171 + 0.9, 'pen'), c(T.touroku, 'suzu')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    // telop giữa 165–166 (rời lên-phải khi khay vào)
    const o1 = out(t, T.l167 - 0.3, 0.5);
    if (o1 < 1) { g.save(); g.translate(1300 * o1, 0);
      telop(g, 'やめなくても、かまいません', 960, 330, prog(t, F + 0.3, T.l166 - 0.3), { size: 60 });
      telop(g, 'ただ、何にお金を払っているのかを知っておく', 960, 560, prog(t, T.l166, T.shitte + 0.8), { size: 48 }); g.restore(); }
    // khay ①②③ (167–169) rời xuống ở câu 171
    const oT = out(t, T.l170, 0.6);
    if (t > T.l167 - 0.3 && oT < 1) {
      g.save(); g.translate(0, 900 * oT);
      shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.6)'; g.fill(rr(140, 200, 1640, 760, 40)); }, 34, 14, 'rgba(70,50,40,0.14)');
      g.strokeStyle = 'rgba(255,255,255,0.95)'; g.lineWidth = 3; g.stroke(rr(141.5, 201.5, 1637, 757, 39));
      const R = [[T.l167, '金額で、上限を決める', 'pink', 330], [T.l168, 'すべて、本当のお金に換算する', 'mint', 570], [T.l169, [['「あと少し」＝ 仕組みが動いている'], ['合図', `700 56px ${MIN}`]], 'lav', 810]];
      R.forEach(([ta, txt, tn, cy], i) => {
        const kc = prog(t, ta - 0.1, ta + 0.5);
        capsule(g, 270, cy, 66, kc, { tone: tn, rot: -0.45, open: prog(t, ta + 0.2, ta + 0.8), ground: false });
        if (kc > 0) { write(g, ['①', '②', '③'][i], 340, cy - 40, kc, { font: `700 40px ${JP}`, align: 'left' }); }
        telop(g, txt, 400, cy + 6, prog(t, ta + 0.2, ta + 1.4), { size: i === 2 ? 46 : 50, align: 'left' });
      });
      g.restore();
    }
    // 170: ルール
    if (t > T.l170 - 0.1 && t < T.l171 - 1.0) { g.save(); telop(g, 'ルールを知ってから、遊びましょう', 960, 330, prog(t, T.l170 + 0.1, T.l170 + 1.2), { size: 58 }); g.restore(); }
    // 171: biển kênh (toạ độ màn hình, đứng yên)
    if (t > T.l171 - 1.3) {
      const k = outCubic(prog(t, T.l171 - 1.0, T.l171 - 0.4)), cx = PL.x + PL.w / 2;
      g.save(); g.translate(0, (1 - k) * 200);
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(PL.x, PL.y, PL.w, PL.h, 44)); }, 40, 16);
      g.strokeStyle = C.faint; g.lineWidth = 2; g.stroke(rr(PL.x, PL.y, PL.w, PL.h, 44));
      capsule(g, cx, PL.y + 70, 34, prog(t, T.l171 - 0.8, T.l171 - 0.3), { tone: 'pink', ground: false });
      write(g, '99の発見', cx, PL.y + 230, prog(t, T.l171 - 0.95, T.l171 - 0.2), { font: `700 130px ${MIN}`, ls: 6, align: 'center' });
      g.fillStyle = C.line; g.fillRect(cx - 240, PL.y + 262, 480 * prog(t, T.l171 + 0.3, T.l171 + 0.9), 2.5);
      write(g, 'チャンネル登録', cx, PL.y + 370, prog(t, T.l171 + 0.8, T.l171 + 1.7), { font: `700 64px ${MIN}`, ls: 4, align: 'center' });
      g.restore();
    }
    if (t > this.M0 - 0.1) figure(g, 'wave', 1660, H, 470, prog(t, this.M0, this.M0 + 0.6), { t });
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Next.prototype.sfx; Next.prototype.sfx = function () { return [..._sfx.call(this), ...[895.9].map(t => ({ t, kind: 'tick' }))]; };
