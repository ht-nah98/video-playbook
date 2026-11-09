// c1 · 74回目から (p2, câu 28–39) — MỞ HỒI 2 (actCard). DNA ACT 2: 90 viên-cột (pityBars) + 200 người (firstHit), cột 74 dựng ĐÚNG chữ 「74回目」.
//  câu 28 tem xám 「毎回 0.6%」 bị bóc            câu 29 cột 90 vàng + 判子 天井      câu 30 sương mù ？ che 1〜89 (không được viết)
//  câu 31 cột dựng từ trái, tới n = 74 đúng lúc nói 「74回目」 (phẳng 0.6% → san hô)   câu 32 ≈ 6.6%   câu 33 ＋6%/lần
//  câu 34–36 khối 200 người (firstHit): 36% (≤ 73) · 56% (74〜80, dải) · 中央値 76 (mascot pointer câu 36)
//  câu 37 「0.6%」 to ↔ câu 38 「76回」 + vạch đứng       câu 39 đường bao quanh hình = "ランダムの形"
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, telop, write, wrong, stamp, glint, capsule, pityBars, firstHit,
  heading, actCard, actCue, figure, rr, p, SOFT, HARD, MEDIAN, MEAN, cum, firstHits } from '../kit.js';
import { out, shade, ring, fillGaps, pop } from './g2-util.js';

const BOX = { x: 130, y: 230, w: 1250, h: 650 }, BOX2 = { x: 130, y: 230, w: 1250, h: 610 };
export default class C74 {
  static ERA = 'studio';
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l28: S(28), mai: w(28, '毎回'), arimasen: w(28, 'ありません'),
      l29: S(29), n90: w(29, '90回目'), hoshi: w(29, '★5'), tenjou: w(29, '天井'),
      l30: S(30), temae: w(30, '手前'), kakarete: w(30, '書かれて'),
      l31: S(31), puree: w(31, 'プレイヤーたち'), kiroku: w(31, '記録'), n74a: w(31, '74回目'), suitei: w(31, '推定'),
      l32: S(32), n74b: w(32, '74回目'), p66: w(32, '6.6%'),
      l33: S(33), ikai: w(33, '1回'), p6: w(33, '6%'), agatte: w(33, '上がって'), e33: E(33),
      l34: S(34), keisan: w(34, '計算'), n73: w(34, '73回目'), p36: w(34, '36%'),
      l35: S(35), hanbun35: w(35, '半分'), n74c: w(35, '74回目'), n80: w(35, '80回目'),
      l36: S(36), hanbun36: w(36, '半分'), n76: w(36, '76回'), e36: E(36),
      l37: S(37), gamen: w(37, '画面'), p06: w(37, '0.6%'),
      l38: S(38), saifu: w(38, '財布'), n76b: w(38, '76回'),
      l39: S(39), ranD1: w(39, 'ランダム', 1), kimerareta: w(39, '決められた'), end: E(39),
    };
    this.START = S(28);
    this.FROM = Math.max(this.START - 2.6, E(27) + 0.5);
    this.P66 = must(`Math.round(${p(SOFT)} * 1000) / 10`, 6.6);
    this.STEP = must('0.06 * 100', 6);
    this.P36 = must(`Math.round(${cum(1, 73)} * 100)`, 36);
    this.P56 = must(`Math.round(${cum(74, 80)} * 100)`, 56);
    this.MED = must(`${MEDIAN}`, 76);
    this.P06 = must('0.006 * 100', 0.6);
    this.HARD = must(`${HARD}`, 90); this.SOFT = must(`${SOFT}`, 74);
    this.MASCOT = [this.T.l36 - 0.3, this.T.e36 + 0.2];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([actCue(this.FROM, this.START),
      c(T.mai, 'pen'), c(T.n90, 'pop'), c(T.hoshi, 'shimmer'), c(T.tenjou, 'hanko'), c(T.tenjou + 0.5, 'suzu'),
      c(T.temae, 'tick'), c(T.kakarete, 'pen'), c(T.n74a, 'pop'), c(T.suitei, 'pen'),
      c(T.p66, 'pen'), c(T.keisan, 'chip'), c(T.keisan + 1.6, 'chip'), c(T.p36, 'pen'), c(T.n80 + 0.3, 'pen'),
      c(T.n76, 'pen'), c(T.p06, 'pen'), c(T.n76b, 'pen'), c(T.ranD1 + 0.3, 'tick'), c(T.kimerareta, 'pen')], this.FROM, 4.0, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  /** cột dựng f(t): 0 → 74 đúng 「74回目」, rồi tới 100 (cột 90 + dư) hết câu 33. */
  fbuild(t) {
    const T = this.T, a = T.puree - 0.2, b = T.n74a, c = T.e33 - 0.3;
    if (t <= a) return 0;
    if (t <= b) return 74 * (t - a) / (b - a);
    return 74 + 26 * smooth(clamp((t - b) / (c - b)));
  }
  card(g, y, label, val, k, col = '@sky', vfont = 64) {
    if (k <= 0) return; const e = outCubic(k);
    g.save(); pop(g, 1632, y + 65, e);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(1440, y, 384, 130, 30)); }, 24, 10);
    g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(1440, y, 384, 130, 30));
    write(g, label, 1472, y + 42, 1, { font: `700 30px ${JP}`, color: '@dim' });
    write(g, val, 1798, y + 104, 1, { font: `700 ${vfont}px ${MIN}`, color: col, align: 'right' });
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START;
    ground(g, t);
    heading(g, 2, '74回目から', prog(t, S + 1.0, S + 2.2));
    const sw = out(t, T.l34 - 0.5, 0.9);                      // thanh cột trượt ra khi khối 200 người vào
    // ── phần 1: cột p(n) ──
    if (sw < 1) {
      g.save(); g.translate(-1500 * sw, 0);
      const f = this.fbuild(t), P = pityBars(g, BOX, f / 100, { labels: true, notes: false, ceil: false });
      // cột 90 vàng (câu 29): dựng riêng trước khi các cột khác tới
      const k90 = prog(t, T.n90 - 0.1, T.n90 + 0.7);
      if (k90 > 0 && f < 98) {
        const x = P.cx(90) - P.bar / 2, h = P.hA * outCubic(k90), y = P.base - h;
        g.save(); g.shadowColor = 'rgba(232,182,58,0.9)'; g.shadowBlur = 22; const gg = g.createLinearGradient(0, y, 0, P.base); gg.addColorStop(0, '#FFF1B0'); gg.addColorStop(0.5, '#E8B63A'); gg.addColorStop(1, '#B07A12');
        g.fillStyle = gg; g.fill(rr(x, y, P.bar, h, P.bar / 2)); g.restore();
        if (k90 >= 1) glint(g, P.cx(90), y - 4, 22);
      }
      // nhãn trục 1 / 90回目 sớm (câu 29)
      const kl = prog(t, T.n90, T.n90 + 0.5);
      if (kl > 0 && f < 20) write(g, '90回目', P.cx(90), P.base + 56, kl, { font: `600 30px ${JP}`, color: '@gold', align: 'center' });
      // 判子 天井
      stamp(g, '天井', P.cx(90) - 150, P.base - P.hA - 40, prog(t, T.tenjou - 0.05, T.tenjou + 0.4), { size: 64, rot: -0.09 });
      // sương mù ？ che 1〜89 (câu 30) → tan khi cột dựng (câu 31)
      const fog = prog(t, T.temae - 0.2, T.temae + 0.6), lift = out(t, T.puree - 0.3, 0.6);
      if (fog > 0 && lift < 1) {
        g.save(); g.translate(0, 560 * lift); g.globalAlpha = outCubic(fog) * 0.97;
        const x0 = P.cx(1) - 14, x1 = P.cx(89) + 12, y0 = P.base - P.hA - 10;
        g.fillStyle = 'rgba(243,235,223,0.97)'; g.fill(rr(x0, y0, x1 - x0, P.base - y0, 24));
        g.setLineDash([10, 10]); g.strokeStyle = 'rgba(92,86,72,0.35)'; g.lineWidth = 3; g.stroke(rr(x0 + 10, y0 + 10, x1 - x0 - 20, P.base - y0 - 20, 18)); g.setLineDash([]);
        write(g, '？', (x0 + x1) / 2, (y0 + P.base) / 2 + 80, 1, { font: `700 240px ${MIN}`, color: '@dim', align: 'center' });
        g.restore();
      }
      // ghi chú: 0.6% phẳng, 74回目 ≈ 6.6%, ＋6%/lần
      if (f > 72) write(g, `1〜73回目は ${this.P06}% のまま`, P.cx(1) + 6, P.base - 52, prog(t, T.n74a - 0.6, T.n74a), { font: `700 32px ${JP}`, color: '@sky' });
      const k66 = prog(t, T.p66 - 0.1, T.p66 + 0.5);
      if (k66 > 0) { write(g, `74回目 ≈ ${this.P66}%`, P.cx(74) - 24, P.top(74) - 70, k66, { font: `700 44px ${MIN}`, color: '@coral', align: 'right' });
        ring(g, P.cx(74), P.top(74) - 4, 26, 26, k66); }
      const k6 = prog(t, T.p6 - 0.1, T.p6 + 0.6);
      if (k6 > 0) { g.save(); g.setLineDash([2, 9]); g.lineCap = 'round'; g.strokeStyle = '#B8284F'; g.lineWidth = 4; g.beginPath();
        g.moveTo(P.cx(74), P.top(74) - 14); g.lineTo(P.cx(74) + (P.cx(89) - P.cx(74)) * outCubic(k6), P.top(74) - 14 + (P.top(89) - P.top(74)) * outCubic(k6)); g.stroke(); g.restore();
        write(g, `1回ごとに ＋${this.STEP}%`, P.cx(74) - 24, P.base - P.hA * 0.64, k6, { font: `700 42px ${MIN}`, color: '@coral', align: 'right' }); }
      g.restore();
    }
    // ── phần 2: 200 người ──
    if (t >= T.l34 - 0.7) {
      const e = out(t, T.l34 - 0.5, 0.9), dx = (1 - e) * 1500;
      g.save(); g.translate(dx, 0);
      const kd = prog(t, T.keisan, T.keisan + 1.3), band = t >= T.keisan + 0.4;
      const Fh = firstHit(g, BOX2, kd, { labels: false, median: false, band });
      const yB = Fh.base, cx = Fh.cx, mid73 = (cx(1) + cx(73)) / 2, bx0 = cx(74) - (cx(2) - cx(1)) / 2, bx1 = cx(80) + (cx(2) - cx(1)) / 2;
      write(g, '200人が 1人ずつ 回すと', BOX2.x + 70, BOX2.y + 70, prog(t, T.keisan - 0.2, T.keisan + 0.6), { font: `700 52px ${MIN}` });
      write(g, 'はじめて当たるまでの回数 →', BOX2.x + 10, yB + 58, prog(t, T.keisan + 0.8, T.keisan + 1.5), { font: `600 28px ${JP}`, color: '@dim' });
      const k36 = prog(t, T.p36 - 0.1, T.p36 + 0.5);
      if (k36 > 0) { write(g, `${this.P36}%`, mid73, yB - 84, k36, { font: `700 76px ${MIN}`, color: '@sky', align: 'center' });
        write(g, '73回目までに当たる', mid73, yB - 36, k36, { font: `600 30px ${JP}`, color: '@sky', align: 'center' });
        g.strokeStyle = '#2F6FA3'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx(1) - 4, yB + 22); g.lineTo(cx(1) - 4 + (cx(73) - cx(1) + 8) * outCubic(k36), yB + 22); g.stroke();
        write(g, '1〜73回目', mid73, yB + 58, k36, { font: `600 28px ${JP}`, color: '@sky', align: 'center' }); }
      const k56 = prog(t, T.n74c - 0.1, T.n80 + 0.5);
      if (k56 > 0) { write(g, `${this.P56}%`, bx0 - 20, BOX2.y + 90, prog(t, T.n80, T.n80 + 0.5), { font: `700 76px ${MIN}`, color: '@gold', align: 'right' });
        g.strokeStyle = '#7A4F00'; g.lineWidth = 3; g.beginPath(); g.moveTo(bx0 + 2, yB + 22); g.lineTo(bx0 + 2 + (bx1 - bx0 - 4) * outCubic(k56), yB + 22); g.stroke();
        write(g, '74〜80回目', (bx0 + bx1) / 2, yB + 58, k56, { font: `700 28px ${JP}`, color: '@gold', align: 'center' }); }
      // vạch đứng 76 (câu 36 → 38)
      const kv = prog(t, T.n76, T.n76 + 0.6);
      if (kv > 0) { const x = cx(this.MED); g.save(); g.setLineDash([8, 9]); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, yB + 4); g.lineTo(x, yB + 4 - (yB - BOX2.y - 30) * outCubic(kv)); g.stroke(); g.restore();
        write(g, `${this.MED}`, x, BOX2.y + 8, kv, { font: `700 44px ${MIN}`, align: 'center' }); }
      // đường bao hình (câu 39)
      const ko = prog(t, T.kimerareta - 0.3, T.end - 0.2);
      if (ko > 0) { const cts = firstHits(200); g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
        const nM = 90 * outCubic(ko); let first = true;
        for (let n = 1; n <= nM; n++) { const x = cx(n), y = yB - cts[n - 1] * Fh.d - 6; first ? g.moveTo(x, y) : g.lineTo(x, y); first = false; } g.stroke(); g.restore(); }
      g.restore();
    }
    // tem xám 「毎回 0.6%」 (câu 28): hiểu lầm bị bóc ở 「ありません」
    if (t >= T.mai - 0.2 && t < T.n90 + 0.4) {
      const up = out(t, T.l29 - 0.1, 0.6);
      g.save(); g.translate(0, -600 * up);
      wrong(g, `毎回 ${this.P06}%`, 960, 470, prog(t, T.mai - 0.1, T.mai + 0.5), { size: 120, peel: prog(t, T.arimasen - 0.1, T.arimasen + 1.0) });
      g.restore();
    }
    // ── cột phải ──
    const xr = out(t, T.l37 - 0.4, 0.6);
    g.save(); pop(g, 1632, 440, 1 - xr);
    this.card(g, 236, '73回目まで', `${this.P36}%`, prog(t, T.p36 - 0.2, T.p36 + 0.4), '@sky', 76);
    this.card(g, 376, '74〜80回目', `${this.P56}%`, prog(t, T.n80 - 0.2, T.n80 + 0.4), '@gold', 76);
    this.card(g, 516, '中央値', `${this.MED}回目`, prog(t, T.n76 - 0.2, T.n76 + 0.4), '@ink', 56);
    g.restore();
    const kA = out(t, T.gamen - 0.2, 0.6), kB = out(t, T.l38 - 0.4, 0.6), kO = out(t, T.l38 - 0.3, 0.5);
    if (t >= T.gamen - 0.2) {
      g.save(); pop(g, 1630, 420, Math.min(kA, 1 - kO));
      write(g, '画面で目立つ', 1630, 340, prog(t, T.p06 - 0.3, T.p06 + 0.1), { font: `700 40px ${MIN}`, color: '@dim', align: 'center' });
      write(g, `${this.P06}%`, 1630, 500, prog(t, T.p06 - 0.1, T.p06 + 0.5), { font: `700 150px ${MIN}`, color: '@sky', align: 'center' });
      g.restore();
    }
    if (t >= T.l38 - 0.4) {
      g.save(); pop(g, 1630, 420, kB);
      write(g, '財布から出ていく', 1630, 340, prog(t, T.saifu, T.saifu + 0.4), { font: `700 40px ${MIN}`, color: '@dim', align: 'center' });
      write(g, `${this.MED}回`, 1630, 500, prog(t, T.n76b - 0.1, T.n76b + 0.5), { font: `700 120px ${MIN}`, align: 'center' });
      write(g, '前後', 1630, 570, prog(t, T.n76b + 0.3, T.n76b + 0.7), { font: `700 48px ${MIN}`, color: '@dim', align: 'center' });
      g.restore();
    }
    // telop đáy
    this.cap(g, t, T.l28 - 0.1, T.l29 - 0.1, [['本当のガチャは、毎回 0.6% ではない']]);
    this.cap(g, t, T.l29 - 0.1, T.l30 - 0.1, [['90回目で必ず ', undefined], ['★5', undefined, '@gold'], ['「天井」']]);
    this.cap(g, t, T.l30 - 0.1, T.l31 - 0.1, [['その手前は、書かれていない']]);
    this.cap(g, t, T.l31 - 0.1, T.l32 - 0.1, [['記録から、74回目から上がり始めると推定']], 50);
    this.cap(g, t, T.l32 - 0.1, T.l33 - 0.1, [['74回目で およそ '], [`${this.P66}%`, undefined, '@coral']]);
    this.cap(g, t, T.l33 - 0.1, T.l34 - 0.1, [['1回ごとに およそ '], [`＋${this.STEP}%`, undefined, '@coral']]);
    this.cap(g, t, T.l34 - 0.1, T.l35 - 0.1, [['73回目までに当たる人は ≈ '], [`${this.P36}%`, undefined, '@sky']], 50);
    this.cap(g, t, T.l35 - 0.1, T.l36 - 0.1, [['半分以上の人は 74〜80回目で当たる']], 50);
    this.cap(g, t, T.l36 - 0.1, T.l37 - 0.1, [['半分以上の人が 76回以上 回す']], 54, 900);
    this.cap(g, t, T.l37 - 0.1, T.l38 - 0.1, [['画面でいちばん目立つのは 0.6%']]);
    this.cap(g, t, T.l38 - 0.1, T.l39 - 0.1, [['財布から出ていくのは 76回前後']]);
    this.cap(g, t, T.l39 - 0.1, T.end + 4, [['ランダムに見えて、形を決められたランダム']], 50);
    const [m0, m1] = this.MASCOT;
    if (t > m0 && t < m1 + 0.7) { g.save(); g.translate(0, 520 * out(t, m1, 0.6)); figure(g, 'pointer', 1680, H, 400, prog(t, m0, m0 + 0.6), { t }); g.restore(); }
    actCard(g, t, F, S, 2);
  }
}
