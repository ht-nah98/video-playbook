// b3 · 回数を増やすと (p2, câu 13–18) — DNA ACT 1: đường 1−0.994ⁿ dựng bằng CHỒNG VIÊN (cột tại n = 10, 20 … 110, 116).
//  câu 14 n=10 → 5.8%   câu 15 n=50 → 26%   câu 16 các cột còn lại quét tới n=116 = 50% (khoanh)
//  câu 17 đường thẳng đối chiếu: 10 lần đầu chỉ ＋6% ほど   câu 18 dải 石 chạy thẳng đều xuống: −160石 mỗi lần (song song, tiền giảm đều)
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, telop, write, capsule, gem, heading, rr, tone,
  atLeastOne, CRYSTAL } from '../kit.js';
import { out, shade, ring, fillGaps, pop } from './g2-util.js';

const X0 = 250, BASE = 700, PH = 420, SX = 8.2;          // đồ thị: n 0…125, 0–100%
const nx = n => X0 + n * SX, py = v => BASE - v * PH;
const NS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 116];

export default class Kaisu {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l13: S(13), kaisu: w(13, '回数'),
      l14: S(14), n10: w(14, '10回'), kakuritsu14: w(14, '確率'), p58: w(14, '5.8%'),
      l15: S(15), n50: w(15, '50回'), p26: w(15, '26%'),
      l16: S(16), hanbun: w(16, '半分'), koeru: w(16, '超える'), n116: w(16, '116回目'),
      l17: S(17), saisho: w(17, '最初'), massugu: w(17, 'まっすぐ'), n10b: w(17, '10回'), p6: w(17, '6%'), agarimasen: w(17, '上がりません'),
      l18: S(18), okane: w(18, 'お金'), ikai: w(18, '1回'), hayasa: w(18, '速さで'), heru: w(18, '減って'), end: E(18),
    };
    this.START = S(13);
    this.FROM = Math.max(this.START - 1.2, E(12) + 0.5);
    this.P10 = must(`Math.round(${atLeastOne(10)} * 1000) / 10`, 5.8);
    this.P50 = must(`Math.round(${atLeastOne(50)} * 100)`, 26);
    this.S10 = must(`Math.round(${atLeastOne(10)} * 100)`, 6);
    must(`${atLeastOne(115) < 0.5 && atLeastOne(116) > 0.5}`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([c(T.kaisu, 'tick'), c(T.n10, 'chip'), c(T.p58, 'pen'), c(T.n50, 'chip'), c(T.p26, 'pen'), c(T.hanbun, 'tick'),
      c(T.n116, 'pop'), c(T.massugu, 'pen'), c(T.p6, 'tick'), c(T.okane, 'soroban'), c(T.heru, 'pen'), c(T.heru + 2.4, 'soroban')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  /** cột viên ở n: k = 0..1 dựng dần (viên rơi lên chồng). */
  stack(g, n, k, t) {
    const v = atLeastOne(n), cnt = Math.max(1, Math.round(v * PH / 34)), shown = Math.ceil(cnt * clamp(k));
    for (let i = 0; i < shown; i++) capsule(g, nx(n), BASE - 17 - i * 34, 17, clamp((k * cnt - i) / 0.6 + 0.001), { tone: 'sky', ground: false, rot: -0.45 + i * 0.9 });
  }
  stat(g, y, label, val, k, col = '@sky') {
    if (k <= 0) return; const e = outCubic(k);
    g.save(); pop(g, 1632, y + 65, e);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(1440, y, 384, 130, 30)); }, 24, 10);
    g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(1440, y, 384, 130, 30));
    write(g, label, 1476, y + 82, 1, { font: `700 ${label.length > 3 ? 36 : 42}px ${MIN}`, color: '@dim' });
    write(g, val, 1790, y + 90, 1, { font: `700 78px ${MIN}`, color: col, align: 'right' });
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM, tn = tone('@sky');
    ground(g, t);
    heading(g, 1, '回数を増やすと', prog(t, F + 0.3, F + 1.3));
    // trục
    const ka = prog(t, F + 0.5, T.kaisu + 0.8);
    if (ka > 0) {
      g.save(); g.strokeStyle = C.line; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0 - 8, BASE + 6); g.lineTo(X0 - 8 + (nx(125) - X0 + 24) * outCubic(ka), BASE + 6); g.stroke();
      g.beginPath(); g.moveTo(X0 - 8, BASE + 6); g.lineTo(X0 - 8, BASE + 6 - (PH + 30) * outCubic(ka)); g.stroke(); g.restore();
      [[0, '0%'], [0.5, '50%'], [1, '100%']].forEach(([v, s]) => {
        const kk = prog(t, F + 0.7 + v * 0.5, F + 1.2 + v * 0.5); if (kk <= 0) return;
        if (v) { g.save(); g.setLineDash([3, 9]); g.strokeStyle = 'rgba(92,86,72,0.3)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(X0 - 8, py(v)); g.lineTo(nx(125), py(v)); g.stroke(); g.restore(); }
        write(g, s, X0 - 24, py(v) + 11, kk, { font: `600 30px ${JP}`, color: '@dim', align: 'right' }); });
      write(g, '回数 n', nx(125), BASE + 52, ka, { font: `600 30px ${JP}`, color: '@dim', align: 'right' });
    }
    this.cap(g, t, T.l13 - 0.1, T.l14 - 0.1, [['回数を増やすと？']]);
    // cột
    const sweep = prog(t, T.hanbun, T.n116);
    NS.forEach(n => {
      let k;
      if (n === 10) k = prog(t, T.n10, T.n10 + 0.9);
      else if (n === 50) k = prog(t, T.n50, T.n50 + 1.0);
      else if (n === 116) k = prog(t, T.n116 - 0.1, T.n116 + 0.8);
      else { const a = T.hanbun + ((n - 10) / 106) * (T.n116 - T.hanbun - 0.3); k = prog(t, a, a + 0.7); }
      this.stack(g, n, k, t);
    });
    // đường cong (xanh trời) quét theo cột
    if (t >= T.hanbun) {
      g.save(); g.strokeStyle = tn.dk; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
      const nMax = 116 * outCubic(prog(t, T.hanbun, T.n116 + 0.3));
      for (let n = 0; n <= nMax + 0.01; n += 2) { const x = nx(n), y = py(atLeastOne(n)) - 40 * 0 - 0; n ? g.lineTo(x, y - 6) : g.moveTo(x, y - 6); }
      g.stroke(); g.restore();
    }
    // nhãn 5.8% / 26% gắn trên cột
    const pill = (n, s, k) => { if (k <= 0) return; const x = nx(n), y = py(atLeastOne(n)) - 64 - 16 * (1 - outCubic(k));
      write(g, s, x, y, k, { font: `700 40px ${MIN}`, color: '@sky', align: 'center' }); };
    pill(10, `${this.P10}%`, prog(t, T.p58 - 0.1, T.p58 + 0.4));
    pill(50, `${this.P50}%`, prog(t, T.p26 - 0.1, T.p26 + 0.4));
    // 116 → 50%
    const k116 = prog(t, T.n116, T.n116 + 0.5);
    if (k116 > 0) { ring(g, nx(116), py(0.5) + 14, 52, 62, k116); write(g, '50%', nx(116), py(0.5) - 80, k116, { font: `700 50px ${MIN}`, align: 'center' }); }
    this.stat(g, 250, '10回', `${this.P10}%`, prog(t, T.p58 - 0.2, T.p58 + 0.5));
    this.stat(g, 400, '50回', `${this.P50}%`, prog(t, T.p26 - 0.2, T.p26 + 0.5));
    this.stat(g, 550, '116回目', '50%', prog(t, T.n116 - 0.1, T.n116 + 0.6));
    this.cap(g, t, T.n10 - 0.2, T.n50 - 0.3, [['10回で ≈ '], [`${this.P10}%`, undefined, '@sky']]);
    this.cap(g, t, T.n50 - 0.2, T.l16 - 0.1, [['50回で ≈ '], [`${this.P50}%`, undefined, '@sky']]);
    this.cap(g, t, T.l16 - 0.1, T.l17 - 0.1, [['半分を超えるのは 116回目']]);
    // câu 17: đường thẳng đối chiếu + bậc ＋6%
    const kl = prog(t, T.massugu - 0.2, T.massugu + 1.0);
    if (kl > 0) {
      const sl = atLeastOne(10) / 10, nE = 40 * outCubic(kl);
      g.save(); g.setLineDash([12, 10]); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(nx(0), py(0)); g.lineTo(nx(nE), py(sl * nE) - 30 + 30); g.stroke(); g.restore();
      write(g, 'ほぼ まっすぐ', nx(3), py(0.9), prog(t, T.massugu, T.massugu + 0.5), { font: `700 44px ${MIN}`, align: 'left' });
    }
    const ks = prog(t, T.p6 - 0.2, T.p6 + 0.5);
    if (ks > 0) { const y0 = py(0), y1 = py(atLeastOne(10));
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(nx(0) + 2, y0 - 4); g.lineTo(nx(10), y0 - 4); g.lineTo(nx(10), y0 - 4 - (y0 - y1 - 4) * outCubic(ks)); g.stroke(); g.restore();
      g.save(); g.strokeStyle = C.mute; g.lineWidth = 2; g.setLineDash([3, 7]); g.beginPath(); g.moveTo(nx(10), py(atLeastOne(10)) - 10); g.lineTo(nx(10), py(0.76) + 12); g.stroke(); g.restore();
      write(g, `10回ごとに ＋${this.S10}% ほど`, nx(12), py(0.76), ks, { font: `700 44px ${MIN}`, color: '@ink' }); }
    this.cap(g, t, T.l17 - 0.1, T.l18 - 0.1, [['最初の数十回は ほぼまっすぐ']]);
    // câu 18: dải 石 đi xuống đều −160石
    const km = prog(t, T.okane - 0.1, T.heru + 1.4);
    if (km > 0) {
      const ya = 790, yb = 872, gm = tone('@gem');
      write(g, '石', X0 - 24, ya + 12, prog(t, T.okane, T.okane + 0.3), { font: `700 44px ${MIN}`, color: '@gem', align: 'right' });
      g.save(); g.strokeStyle = gm.dk; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(nx(0), ya); g.lineTo(nx(0) + (nx(125) - nx(0)) * outCubic(km), ya + (yb - ya) * outCubic(km)); g.stroke(); g.restore();
      for (let i = 0; i <= 12; i++) { const kk = prog(t, T.ikai + i * 0.12, T.ikai + 0.4 + i * 0.12); if (kk <= 0 || i / 12 > outCubic(km)) continue; gem(g, nx(i * 10.4), ya + (yb - ya) * i / 12, 15, kk); }
      write(g, `1回ごとに −${CRYSTAL}石`, nx(125) + 20, ya + 4, prog(t, T.ikai, T.ikai + 0.5), { font: `700 40px ${MIN}`, color: '@gem' });
    }
    this.cap(g, t, T.okane - 0.1, T.end + 4, [['お金は 1回ごとに、同じ速さで減っていく']]);
  }
}
