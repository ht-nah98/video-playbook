// g2 · 曲がり角は3つ (p2 câu 153–158) — ERA studio, mascot halt (nói câu 157–158).
//  153 vòng lặp (đường nâu nhạt) + viên nang lăn mãi; ba nút rẽ nét đứt · 154–156 mỗi 「Nつ目」 một lối rẽ sáng lên (bạc hà) kèm nhãn
//  (通知 / 課金しようとした / 「あと少し」) · 157 viên lăn qua từng ngã rẽ, lối rẽ SAU hẹp hơn lối trước · 158 chồng xu giữa vòng cao dần, lối rẽ hẹp thêm.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, capsule, figure, rr, tone } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const coin = (g, x, y, r) => { g.save(); g.translate(x, y); g.scale(1, 0.5); g.fillStyle = '#EFE7D8'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#B9AE98'; g.stroke(); g.restore(); };
const CX = 1130, CY = 570, R = 230, ROAD = 44, LEN = 110;
const DEG = Math.PI / 180;
const NODES = [-125 * DEG, -15 * DEG, 100 * DEG];                              // góc ba ngã rẽ

export default class Corners {
  static ERA = 'studio';
  static POSES = ['halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    this.T = {
      l153: L(153).start, loop: w(153, 'ループ'), magare: w(153, '曲がれる'), mittsu: w(153, '3つ'),
      n1: w(154, '1つ目'), tsuuchi: w(154, '通知'),
      n2: w(155, '2つ目'), kakin: w(155, '課金'),
      n3: w(156, '3つ目'), atosukoshi: w(156, 'あと'),
      l157: L(157).start, magarazu: w(157, '曲がらず'), tabi: w(157, 'たび'), tsugi: w(157, '次'), kado: w(157, '角'),
      l158: L(158).start, okane: w(158, 'お金'), ookii: w(158, '大きい'), rivu: w(158, '理由'), motto: w(158, 'もっとも'), end: L(158).end,
    };
    this.START = L(153).start;
    this.FROM = Math.max(this.START - 1.2, L(152).end + 0.5);
    this.M = [this.T.l157 - 0.3, this.T.l157 - 0.3 + 7.8];                   // halt ≈ 7.8 s (câu 157–158)
    this.OPEN0 = [1, 1, 1]; this.OPEN1 = [0.8, 0.55, 0.3]; this.OPEN2 = [0.55, 0.36, 0.16];   // độ rộng lối rẽ: ban đầu / sau 157 / sau 158
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'pop'), c(T.loop, 'pen'), c(T.magare, 'tick'), c(T.mittsu, 'pop'), c(T.n1, 'pen'), c(T.n1 + 0.5, 'chip'), c(T.n2, 'pen'), c(T.n2 + 0.5, 'chip'),
      c(T.n3, 'pen'), c(T.n3 + 0.5, 'chip'), c(T.magarazu, 'pen'), c(T.tabi, 'tick'), c(T.tsugi, 'tick'), c(T.kado, 'tick'), c(T.okane, 'coin'), c(T.ookii, 'soroban'), c(T.rivu, 'pen'), c(T.motto, 'tick')];
  }
  open(t, i) {
    const T = this.T, a = outCubic(prog(t, T.tabi + i * 0.25, T.tabi + 0.6 + i * 0.25)), b = outCubic(prog(t, T.rivu - 0.3 + i * 0.25, T.rivu + 0.4 + i * 0.25));
    return this.OPEN0[i] + (this.OPEN1[i] - this.OPEN0[i]) * a + (this.OPEN2[i] - this.OPEN1[i]) * b;
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 6, '曲がり角は3つ', prog(t, this.START + 0.1, this.START + 0.9));
    // vòng lặp (đường): vẽ dần từ 12 giờ
    const kl = outCubic(prog(t, F + 0.3, T.loop + 0.5));
    g.save(); g.lineCap = 'round';
    g.strokeStyle = '#EADFCF'; g.lineWidth = ROAD; g.beginPath(); g.arc(CX, CY, R, -Math.PI / 2, -Math.PI / 2 + TAU * kl); g.stroke();
    g.strokeStyle = 'rgba(92,86,72,0.30)'; g.lineWidth = 3; g.setLineDash([14, 14]); g.beginPath(); g.arc(CX, CY, R, -Math.PI / 2, -Math.PI / 2 + TAU * kl); g.stroke(); g.setLineDash([]);
    g.restore();
    write(g, 'ループ', CX, CY + 20, prog(t, T.loop - 0.1, T.loop + 0.5), { font: `700 64px ${MIN}`, color: '@dim', align: 'center' });
    // lối rẽ
    const LIT = [T.n1, T.n2, T.n3], LAB = [[CX - 395, 255, '通知が出たとき', 40], [1600, 380, '課金しようとしたとき', 36], [1330, 880, '「あと少し」の声', 38]];
    NODES.forEach((a, i) => {
      const nx = CX + R * Math.cos(a), ny = CY + R * Math.sin(a), ex = CX + (R + LEN + 20) * Math.cos(a), ey = CY + (R + LEN + 20) * Math.sin(a);
      const kn = prog(t, T.magare + i * 0.12, T.magare + 0.4 + i * 0.12), lit = outCubic(prog(t, LIT[i] - 0.1, LIT[i] + 0.4)), o = this.open(t, i);
      if (kn <= 0) return;
      // đường rẽ (rộng = o)
      const wdt = Math.max(5, ROAD * o), kx = nx + (ex - nx) * lit, ky = ny + (ey - ny) * lit;
      if (lit > 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = lit >= 1 ? '#A9E3CA' : '#BCE8D5'; g.lineWidth = wdt; g.beginPath(); g.moveTo(nx, ny); g.lineTo(kx, ky); g.stroke();
        g.strokeStyle = tone('@mint').dk; g.lineWidth = 4; g.beginPath(); const ux = Math.cos(a), uy = Math.sin(a), hx = kx + ux * wdt * 0.5, hy = ky + uy * wdt * 0.5;
        g.moveTo(hx - ux * 22 - uy * 14, hy - uy * 22 + ux * 14); g.lineTo(hx, hy); g.lineTo(hx - ux * 22 + uy * 14, hy - uy * 22 - ux * 14); g.stroke(); g.restore(); }
      // nút
      g.save(); g.translate(nx, ny); g.scale(outBack(kn), outBack(kn));
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(0, 0, 22, 0, TAU); g.fill();
      g.lineWidth = 4; g.strokeStyle = lit > 0 ? tone('@mint').dk : 'rgba(92,86,72,0.55)'; if (lit <= 0) g.setLineDash([6, 5]); g.stroke(); g.restore();
      write(g, ['①', '②', '③'][i], nx, ny + 12, kn, { font: `700 30px ${JP}`, align: 'center' });
      const [lx, ly, s, sz] = LAB[i];
      telop(g, s, lx, ly, prog(t, LIT[i] + 0.05, LIT[i] + 0.8), { size: sz });
    });
    // viên nang lăn trên vòng
    const th = -Math.PI / 2 + (t - F) * 0.7;
    capsule(g, CX + R * Math.cos(th), CY + R * Math.sin(th) - 8, 32, prog(t, F + 0.2, F + 0.7), { tone: 'pink', rot: th * 2, ground: false });
    // 158: chồng xu giữa vòng cao dần theo số tiền đã trả
    const hs = outCubic(prog(t, T.okane, T.motto + 0.6));
    for (let i = 0; i < Math.round(12 * hs); i++) coin(g, CX - 20 + (i % 2) * 40, CY + 130 - Math.floor(i / 2) * 14, 28);
    // telop dưới
    const sl = (parts, a, b, size = 46) => { if (t < a - 0.1 || t > b + 0.6) return; g.save(); g.translate(0, 150 * outCubic(clamp((t - b) / 0.5))); telop(g, parts, CX + 130, 975, prog(t, a, a + 0.35), { size }); g.restore(); };
    sl([['このループの中に、曲がれる場所は '], ['3つ', `700 50px ${MIN}`]], T.l153, T.n1 - 0.2, 44);
    sl('通り過ぎるたびに、次の角は曲がりにくくなる', T.l157, T.l158 - 0.2, 44);
    sl('払ったお金が大きいほど、続ける理由がもっともらしくなる', T.l158, T.end + 1, 38);
    if (t > this.M[0] - 0.1 && t < this.M[1] + 0.8) { g.save(); g.translate(0, 560 * out(t, this.M[1], 0.6)); figure(g, 'halt', 330, H, 450, prog(t, this.M[0], this.M[0] + 0.6), { t }); g.restore(); }
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Corners.prototype.sfx; Corners.prototype.sfx = function () { return [..._sfx.call(this), ...[819.5, 824.4].map(t => ({ t, kind: 'tick' }))]; };
