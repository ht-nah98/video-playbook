// d5 · らせんのループ (p2, câu 80–86). DNA カプセル: viên nang lăn theo vòng xoắn nở ra; mỗi vòng một thẻ "gói" lớn hơn (小 → 10連 → 天井).
//  ① câu 80   viên lăn từ tâm, vòng 1 xong ở 「1周」; 「1周ごとに、大きく」
//  ② câu 81   thẻ ① gói nhỏ nhất (4 viên) ở 「パック」
//  ③ câu 82   vòng 2; thẻ ② 「10連」 (10 viên) ở 「10連」 — 「届きません」: thẻ ① thiếu
//  ④ câu 83–84 vòng 3; thẻ ③ 「天井」: 90 viên + tem 天井 (bạc hà)
//  ⑤ câu 85   「出発点」 ở tâm; đường về (nét đứt) bị gạch xám → 「戻りません」
//  ⑥ câu 86   外へ外へ: mũi tên hướng ra; viên đá (お金) chạy từ vòng trước sang vòng sau — 「前の周のお金 → 次の周の理由」
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, outCubic, outBack, smooth, ground, capsule, gem, stamp, strike, telop, write, heading, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 24, oy = 8) => { g.save(); g.shadowColor = 'rgba(70,50,40,0.18)'; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const CX = 700, CY = 600, R0 = 70, GROW = 1.55;
const rad = th => R0 * Math.pow(GROW, th / TAU);
const pt = th => [CX + rad(th) * Math.cos(th), CY + rad(th) * Math.sin(th)];
const CARDS = [{ x: 1280, y: 290, w: 320, h: 150 }, { x: 1280, y: 480, w: 440, h: 210 }, { x: 1280, y: 730, w: 540, h: 270 }];

export default class Rasen {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd5');
    this.START = L(80).start;
    this.FROM = Math.max(this.START - 1.2, L(79).end + 0.5);
    this.T = {
      l80: L(80).start, loop: w(80, 'ループ'), shuu: w(80, '1周'), ookiku: w(80, '大きく'),
      l81: L(81).start, saisho: w(81, '最初'), pack: w(81, 'パック'), tamesu: w(81, '試す'),
      l82: L(82).start, tsugi: w(82, '次'), ren: w(82, '10連'), todokimasen: w(82, '届きません'),
      l83: L(83).start, tenjou: w(83, '天井'), kingaku: w(83, '金額'), kangae: w(83, '考え'),
      l84: L(84).start, kakujitsu: w(84, '確実'),
      l85: L(85).start, shuppatsu: w(85, '出発'), modorimasen: w(85, '戻りません'),
      l86: L(86).start, soto: w(86, '外'), rasen: w(86, 'らせん'), mae: w(86, '前'), harai: w(86, '払った'), tsugi86: w(86, '次'), riyuu: w(86, '理由'), end: L(86).end,
    };
    const T = this.T;
    // (t, θ) — đầu viên nang lăn theo vòng xoắn; mỗi mốc bám chữ của lời
    this.K = [[this.FROM + 0.3, 0], [T.shuu + 0.25, TAU], [T.tamesu + 0.1, 3 * Math.PI], [T.ren + 0.6, 2 * TAU], [T.todokimasen + 0.6, 2.4 * TAU],
      [T.tenjou + 1.3, 3 * TAU], [T.shuppatsu, 3.25 * TAU], [T.modorimasen + 0.4, 3.45 * TAU], [T.rasen + 1.2, 3.5 * TAU]];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.ren - 2.0, 'tick'), c(T.shuu, 'tick'), c(T.ookiku, 'pen'), c(T.pack + 0.1, 'card'), c(T.ren, 'card'), c(T.tenjou + 0.1, 'card'), c(T.tenjou + 0.9, 'hanko'),
      c(T.kakujitsu, 'pen'), c(T.shuppatsu, 'pen'), c(T.modorimasen, 'tick'), c(T.mae, 'pen'), c(T.harai, 'coin'), c(T.riyuu, 'soroban')];
  }
  theta(t) {
    const K = this.K; if (t <= K[0][0]) return 0;
    for (let i = 1; i < K.length; i++) if (t <= K[i][0]) return K[i - 1][1] + (K[i][1] - K[i - 1][1]) * smooth(prog(t, K[i - 1][0], K[i][0]));
    return K.at(-1)[1];
  }
  cards(g, t) {
    const T = this.T;
    const ks = [prog(t, T.pack - 0.1, T.pack + 0.6), prog(t, T.ren - 0.2, T.ren + 0.6), prog(t, T.tenjou - 0.2, T.tenjou + 0.7)];
    CARDS.forEach((c, i) => {
      const k = ks[i]; if (k <= 0) return; const e = outBack(k), dx = Math.round((1 - e) * 500);
      // nối từ cuối vòng i+1 tới thẻ
      const [px, py] = pt((i + 1) * TAU); g.save(); g.setLineDash([3, 10]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 4;
      g.beginPath(); g.moveTo(px + 14, py); g.lineTo(px + 14 + (c.x - px - 14) * outCubic(k), py + (c.y + 60 - py) * outCubic(k)); g.stroke(); g.restore();
      g.save(); g.translate(dx, 0);
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(c.x, c.y, c.w, c.h, 28)); }, 28, 10);
      g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(c.x, c.y, c.w, c.h, 28));
      if (i === 0) {
        write(g, '小さなパック', c.x + 32, c.y + 56, 1, { font: `700 36px ${MIN}` });
        for (let j = 0; j < 4; j++) capsule(g, c.x + 52 + j * 56, c.y + 106, 22, prog(t, T.pack + 0.2 + j * 0.1, T.pack + 0.6 + j * 0.1), { tone: ['sky', 'pink', 'mint', 'lav'][j], ground: false, rot: 0.4 + j });
        const kd = prog(t, T.todokimasen - 0.1, T.todokimasen + 0.6);                 // 届きません: 10 ô, mới có 4
        if (kd > 0) { g.save(); g.setLineDash([4, 6]); g.strokeStyle = C.mute; g.lineWidth = 2; for (let j = 4; j < 6; j++) { g.beginPath(); g.arc(c.x + 52 + j * 56, c.y + 106, 22, 0, TAU); g.globalAlpha = kd; g.stroke(); } g.restore(); }
      } else if (i === 1) {
        write(g, '10連', c.x + 32, c.y + 62, 1, { font: `700 48px ${MIN}` });
        for (let j = 0; j < 10; j++) capsule(g, c.x + 58 + (j % 5) * 80, c.y + 108 + Math.floor(j / 5) * 70, 28, prog(t, T.ren + 0.1 + j * 0.05, T.ren + 0.5 + j * 0.05), { tone: ['sky', 'pink', 'mint', 'lav', 'lemon'][j % 5], ground: false, rot: 0.3 + j });
      } else {
        write(g, 'ここまで払う', c.x + 32, c.y + 58, 1, { font: `700 34px ${MIN}`, color: '@dim' });
        for (let j = 0; j < 90; j++) capsule(g, c.x + 40 + (j % 15) * 32, c.y + 98 + Math.floor(j / 15) * 29, 13, prog(t, T.tenjou + 0.1 + j * 0.008, T.tenjou + 0.4 + j * 0.008), { tone: ['sky', 'pink', 'mint', 'lav'][j % 4], ground: false, rot: 0.3 + j * 0.7 });
        stamp(g, '天井', c.x + c.w - 100, c.y + 56, prog(t, T.tenjou + 0.8, T.tenjou + 1.3), { size: 52, rot: -0.1 });
      }
      g.restore();
    });
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 3, 'らせんのループ', prog(t, F + 0.3, F + 1.3));
    // vòng xoắn đến θ hiện tại
    const th = this.theta(t);
    if (th > 0.02) {
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = C.mute;
      let prev = pt(0);
      for (let a = 0.1; a <= th + 0.05; a += 0.1) { const A = Math.min(a, th), p = pt(A); g.lineWidth = 3 + 7 * (A / (3.5 * TAU)); g.globalAlpha = 0.85; g.beginPath(); g.moveTo(prev[0], prev[1]); g.lineTo(p[0], p[1]); g.stroke(); prev = p; if (A >= th) break; }
      g.restore();
      const [hx, hy] = pt(th), r = 24 + 14 * (th / (3.5 * TAU));
      capsule(g, hx, hy - 4, r, prog(t, F + 0.3, F + 0.8), { tone: 'pink', rot: th * rad(th) / r, ground: false });
    }
    // 出発点 + đường về bị gạch
    const ks = prog(t, T.shuppatsu - 0.1, T.shuppatsu + 0.5);
    if (ks > 0) {
      const [hx, hy] = pt(3.5 * TAU), tx = CX + 18;
      const kr = prog(t, T.shuppatsu + 0.5, T.modorimasen);
      if (kr > 0) { g.save(); g.setLineDash([5, 10]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 6; g.beginPath(); g.moveTo(hx + 30, hy + 4); g.lineTo(hx + 30 + (tx - hx - 30) * outCubic(kr), hy + 4); g.stroke(); g.restore(); }
      telop(g, '出発点', CX, CY, ks, { size: 34, font: `700 34px ${JP}`, pad: 26 });
      const kx = prog(t, T.modorimasen, T.modorimasen + 0.5);
      if (kx > 0) { const [hx2, hy2] = pt(3.5 * TAU), sx = hx2 + 90; strike(g, sx - 34, hy2 - 34, sx + 34, hy2 + 34, kx, { w: 8 }); strike(g, sx + 34, hy2 - 34, sx - 34, hy2 + 34, clamp(kx * 2 - 0.5), { w: 8 }); }
    }
    this.cards(g, t);
    // 外へ外へ: mũi tên hướng ra quanh vòng ngoài
    const ko = prog(t, T.soto - 0.1, T.rasen + 0.6);
    if (ko > 0) for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.5, r0 = 380 + 20 * Math.sin(t * 3 + i), x0 = CX + r0 * Math.cos(a), y0 = CY + r0 * Math.sin(a);
      if (y0 < 200 || y0 > 990 || x0 < 150 || x0 > 1180) continue;
      g.save(); g.globalAlpha = 0.9 * ko; g.strokeStyle = C.mute; g.lineWidth = 5; g.lineCap = 'round'; g.translate(x0, y0); g.rotate(a); g.beginPath(); g.moveTo(0, 0); g.lineTo(34 * ko, 0); g.moveTo(24 * ko, -9); g.lineTo(34 * ko, 0); g.lineTo(24 * ko, 9); g.stroke(); g.restore(); }
    // viên đá (お金) chạy từ vòng trước sang vòng sau
    [[T.harai, 2 * TAU, 3 * TAU], [T.harai + 0.9, TAU, 2 * TAU]].forEach(([a, th0, th1]) => { const f = prog(t, a, a + 1.4); if (f <= 0 || f >= 1) return; const [x, y] = pt(th0 + (th1 - th0) * smooth(f)); gem(g, x, y - 30, 16, 1); });
    // telop (cột phải, trên các thẻ)
    const CT = [[F, T.l81 - 0.1, '1周ごとに、大きく', T.shuu - 0.4], [T.l81 - 0.1, T.l82 - 0.1, '最初は、小さなパック', T.saisho], [T.l82 - 0.1, T.l83 - 0.1, '10連に届かない', T.ren - 0.1],
      [T.l83 - 0.1, T.l84 - 0.1, '天井までの金額で考える', T.tenjou], [T.l84 - 0.1, T.l85 - 0.1, 'そのほうが、確実だから', T.kakujitsu - 0.3], [T.l85 - 0.1, T.l86 - 0.1, '出発点には、戻らない', T.shuppatsu],
      [T.l86 - 0.1, T.tsugi86 - 0.2, '前の周のお金が', T.mae - 0.1], [T.tsugi86 - 0.2, 1e9, '次の周の理由になる', T.tsugi86 - 0.1]];
    for (const [a, b, s, k0] of CT) if (t >= a && t < b + 0.4) { const o = t > b ? out(t, b, 0.35) : 0; g.save(); g.translate(0, -400 * o); telop(g, s, 1550, 215, prog(t, Math.max(k0, a + 0.2), Math.max(k0, a + 0.2) + 0.7), { size: 40 }); g.restore(); }
  }
}
