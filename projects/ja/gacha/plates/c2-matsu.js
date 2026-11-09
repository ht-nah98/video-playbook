// c2 · 待つ時間 (p2, câu 40–45) — DNA ACT 2 b: viên đang lắc = 「待つ時間」.
//  câu 40 máy ガシャポン (núm xoay) + não: 「回している私たちの脳では」       câu 41 2003年 · シュルツたち · サルの脳: tế bào ドーパミン nhấp nháy
//  câu 42 trục 合図 → (待つ時間: đường dốc じわじわ) → 結果 (ly nước ép + ？)  câu 43 chuông phản ứng–xác suất, đỉnh ở 50% (nhãn nguồn chữ; mascot coin-flip)
//  câu 44 「先が読めない」 tại đỉnh                                          câu 45 máy trở lại: viên lắc + đồng hồ chờ 「数秒」
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, telop, write, capsule, machine, heading, figure, rr, tone } from '../kit.js';
import { out, shade, ring, underline, fillGaps } from './g2-util.js';

function brain(g, cx, cy, s, k) {                                    // não (như a0-open iconBrain), scale s
  const e = outCubic(clamp(k)); if (e <= 0) return;
  g.save(); g.translate(cx, cy); g.scale(s * e, s * e);
  g.fillStyle = '#F7CFDC'; g.strokeStyle = '#A8687E'; g.lineWidth = 5 / s;
  const q = new Path2D();
  q.moveTo(-6, -62); q.bezierCurveTo(-40, -86, -90, -60, -84, -16); q.bezierCurveTo(-104, 10, -78, 52, -44, 50);
  q.bezierCurveTo(-30, 70, 0, 66, 6, 50); q.bezierCurveTo(30, 66, 66, 56, 70, 30); q.bezierCurveTo(98, 14, 92, -30, 66, -40);
  q.bezierCurveTo(62, -74, 20, -82, -6, -62); q.closePath();
  shade(g, () => g.fill(q), 20 / s, 8 / s); g.stroke(q);
  g.lineCap = 'round'; g.lineWidth = 4 / s;
  [[[-6, -62], [-14, -20], [4, 10], [6, 50]], [[-60, -30], [-36, -36], [-30, -10]], [[-62, 20], [-40, 10], [-28, 28]], [[40, -52], [30, -26], [48, -10]], [[34, 14], [56, 8], [64, 28]]].forEach(P => {
    g.beginPath(); g.moveTo(...P[0]); for (let i = 1; i < P.length; i++) g.lineTo(...P[i]); g.stroke(); });
  g.restore();
}
const CELLS = [[-48, -22], [-10, -40], [26, -14], [-26, 20], [46, 18], [8, 6], [-62, 4], [30, -44]];
export default class Matsu {
  static ERA = 'studio';
  static POSES = ['coin-flip'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l40: S(40), watashi: w(40, '私'), nou40: w(40, '脳'), nani: w(40, '何'),
      l41: S(41), y2003: w(41, '2003年'), schultz: w(41, 'シュルツたち'), saru: w(41, 'サル'), dopa: w(41, 'ドーパミン'),
      l42: S(42), juice: w(42, 'ジュース'), aizu: w(42, '合図'), matsu42: w(42, '待つ'), jiwa: w(42, 'じわじわ'),
      l43: S(43), kakuritsu: w(43, '確率'), p50: w(43, '50%'), e43: E(43),
      l44: S(44), saki: w(44, '先'), yomenai: w(44, '読めない'), hannou: w(44, '反応'),
      l45: S(45), gacha: w(45, 'ガチャ'), suubyou: w(45, '数秒'), matsu45: w(45, '待つ'), end: E(45),
    };
    this.START = S(40);
    this.FROM = Math.max(this.START - 1.2, E(39) + 0.5);
    this.P50 = must('0.5 * 100', 50);
    this.YEAR = must('2003', 2003);
    this.MASCOT = [this.T.l43 - 0.3, this.T.l44 + 3.0];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([c(this.FROM + 0.9, 'gacha'), c(T.nou40, 'pen'), c(T.y2003, 'pen'), c(T.dopa, 'tick'), c(T.juice, 'pop'), c(T.aizu, 'tick'), c(T.matsu42, 'pen'), c(T.jiwa, 'tick'),
      c(T.p50, 'pop'), c(T.kakuritsu, 'pen'), c(T.yomenai, 'pen'), c(T.hannou, 'tick'), c(T.gacha, 'gacha'), c(T.suubyou, 'pen'), c(T.matsu45, 'tick')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  cup(g, cx, cy, s, k) {
    if (k <= 0) return; const e = outCubic(k);
    g.save(); g.translate(cx, cy); g.scale(s * e, s * e);
    shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.8)'; g.beginPath(); g.moveTo(-50, -70); g.lineTo(50, -70); g.lineTo(38, 70); g.lineTo(-38, 70); g.closePath(); g.fill(); }, 16, 6);
    g.fillStyle = '#F6B35A'; g.beginPath(); g.moveTo(-46, -20); g.lineTo(46, -20); g.lineTo(38, 66); g.lineTo(-38, 66); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(92,86,72,0.4)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-50, -70); g.lineTo(50, -70); g.lineTo(38, 70); g.lineTo(-38, 70); g.closePath(); g.stroke();
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 2, '待つ時間', prog(t, F + 0.3, F + 1.3));
    // ── máy ガシャポン (câu 40 và câu 45) ──
    const mIn = prog(t, F + 0.2, F + 1.0), mOut = out(t, T.l41 - 0.3, 0.7), m2 = out(t, T.gacha - 0.4, 0.7);
    if (t < T.l41 + 0.8 || t > T.gacha - 0.5) {
      const dx = -(mOut * 800) - (1 - m2) * (t > T.l41 ? 800 : 0) * 0;
      g.save(); g.translate(t < T.l41 + 0.8 ? -mOut * 800 : -(1 - m2) * 800, 0);
      machine(g, 470, 900, 640, t < T.l41 + 0.8 ? mIn : 1, { turn: t < T.l41 + 0.8 ? 2.2 * Math.max(0, t - F - 0.8) : 2.6 + 2.4 * Math.max(0, t - T.gacha), label: '1回', out: { tone: 'pink', k: 1, open: 0 } });
      g.restore();
    }
    // ── não (câu 40–41) ──
    const bOut = out(t, T.l42 - 0.3, 0.7);
    if (t >= F + 0.5 && t < T.l42 + 0.6) {
      g.save(); g.translate(bOut * 900, 0);
      const pulse = 1 + 0.03 * Math.sin(t * 4);
      brain(g, 1180, 480, (t < T.saru - 0.2 ? 2.6 : 3.4) * pulse, prog(t, F + 0.5, T.nou40 + 0.2));
      if (t >= T.dopa - 0.2) CELLS.forEach(([x, y], i) => { const kk = prog(t, T.dopa + i * 0.1, T.dopa + 0.4 + i * 0.1), a = 0.55 + 0.45 * Math.sin(t * 7 + i * 1.7);
        if (kk <= 0) return; g.save(); g.globalAlpha = 0.45 * a; g.fillStyle = '#F06E9C'; g.beginPath(); g.arc(1180 + x * 3.4, 480 + y * 3.4, 22 * kk, 0, TAU); g.fill(); g.restore();
        g.fillStyle = '#C23A6E'; g.beginPath(); g.arc(1180 + x * 3.4, 480 + y * 3.4, 8 * kk, 0, TAU); g.fill(); });
      g.restore();
    }
    // ── chữ câu 41 (cột trái) ──
    if (t >= T.y2003 - 0.2 && t < T.l42) {
      const e = out(t, T.y2003 - 0.2, 0.6), x = out(t, T.l42 - 0.3, 0.6);
      g.save(); g.translate((1 - e) * -600 - x * 700, 0);
      write(g, `${this.YEAR}年`, 330, 420, prog(t, T.y2003, T.y2003 + 0.5), { font: `700 130px ${MIN}`, align: 'center' });
      write(g, 'シュルツたち', 330, 520, prog(t, T.schultz, T.schultz + 0.5), { font: `700 52px ${MIN}`, align: 'center' });
      write(g, 'サルの脳', 330, 620, prog(t, T.saru, T.saru + 0.4), { font: `700 52px ${MIN}`, align: 'center' });
      g.restore();
    }
    this.cap(g, t, T.l40 - 0.1, T.l41 - 0.1, [['回している私たちの脳では、何が？']]);
    this.cap(g, t, T.l41 - 0.1, T.l42 - 0.1, [['2003年 ― サルの脳の ドーパミン細胞']], 50);
    // ── câu 42: 合図 → 待つ時間 → 結果 ──
    if (t >= T.juice - 0.2 && t < T.l43 + 0.6) {
      const e = out(t, T.juice - 0.2, 0.7), x = out(t, T.l43 - 0.4, 0.7), Y = 640;
      g.save(); g.translate((1 - e) * 1300 - x * 1500, 0);
      const ka = prog(t, T.aizu - 0.1, T.aizu + 0.4);
      if (ka > 0) { g.fillStyle = C.white; g.strokeStyle = C.faint; shade(g, () => { g.beginPath(); g.arc(330, Y, 62 * outCubic(ka), 0, TAU); g.fill(); }, 16, 6); g.lineWidth = 2; g.stroke();
        glintBell(g, 330, Y, ka); write(g, '合図', 330, Y + 120, ka, { font: `700 44px ${MIN}`, align: 'center' }); }
      const kw = prog(t, T.matsu42 - 0.1, T.matsu42 + 1.2);
      g.setLineDash([2, 14]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 7; g.beginPath(); g.moveTo(410, Y); g.lineTo(410 + 960 * outCubic(kw), Y); g.stroke(); g.setLineDash([]);
      write(g, '待つ時間', 890, Y + 76, prog(t, T.matsu42, T.matsu42 + 0.5), { font: `700 48px ${MIN}`, align: 'center' });
      // đường hoạt động tế bào: dốc dần (じわじわ)
      const kj = prog(t, T.jiwa - 0.2, T.jiwa + 1.5);
      if (kj > 0) { g.strokeStyle = '#C23A6E'; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
        const N = 60; for (let i = 0; i <= N * kj; i++) { const u = i / N, xx = 420 + 940 * u, yy = Y - 40 - 240 * u * u + 8 * Math.sin(u * 40); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
        write(g, '細胞が じわじわ働く', 560, Y - 190, prog(t, T.jiwa, T.jiwa + 0.5), { font: `700 38px ${MIN}`, color: '@dim' }); }
      this.cup(g, 1500, Y - 10, 1.1, prog(t, T.juice - 0.1, T.juice + 0.4));
      write(g, '？', 1500, Y - 14, prog(t, T.juice + 0.4, T.juice + 0.8), { font: `700 80px ${MIN}`, color: '@ink', align: 'center' });
      write(g, '結果', 1500, Y + 120, prog(t, T.juice + 0.4, T.juice + 0.8), { font: `700 44px ${MIN}`, align: 'center' });
      g.restore();
    }
    this.cap(g, t, T.l42 - 0.1, T.l43 - 0.1, [['結果が出るまでの「待つ時間」に、働き続けた']], 48);
    // ── câu 43–44: chuông phản ứng ↔ xác suất ──
    if (t >= T.l43 - 0.4 && t < T.gacha - 0.2) {
      const e = out(t, T.l43 - 0.4, 0.8), x = out(t, T.gacha - 0.5, 0.7), X0 = 330, X1 = 1330, B = 770, PH = 430;
      g.save(); g.translate((1 - e) * 1500 - x * 1500, 0);
      g.strokeStyle = C.line; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0 - 20, B); g.lineTo(X1 + 20, B); g.moveTo(X0, B + 20); g.lineTo(X0, B - PH - 40); g.stroke();
      [[0, '0%'], [0.5, '50%'], [1, '100%']].forEach(([v, s]) => write(g, s, X0 + v * (X1 - X0), B + 56, 1, { font: `600 30px ${JP}`, color: '@dim', align: 'center' }));
      write(g, '確率', X1 + 10, B + 10, prog(t, T.kakuritsu - 0.1, T.kakuritsu + 0.4), { font: `700 36px ${MIN}`, color: '@dim' });
      write(g, 'ドーパミン細胞の反応', X0 + 14, B - PH - 52, prog(t, T.l43, T.l43 + 0.6), { font: `700 36px ${MIN}`, color: '@dim' });
      const kc = prog(t, T.kakuritsu, T.p50 + 0.3);
      g.strokeStyle = '#C23A6E'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath();
      for (let i = 0; i <= 80 * kc; i++) { const u = i / 80, xx = X0 + u * (X1 - X0), yy = B - 4 * u * (1 - u) * PH; i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
      const kp = prog(t, T.p50 - 0.1, T.p50 + 0.5), px = (X0 + X1) / 2, py = B - PH;
      if (kp > 0) { ring(g, px, py, 66, 56, kp); write(g, `${this.P50}%`, px, py - 80, kp, { font: `700 84px ${MIN}`, align: 'center' });
        g.save(); g.setLineDash([4, 10]); g.strokeStyle = C.mute; g.lineWidth = 3; g.beginPath(); g.moveTo(px, py + 60); g.lineTo(px, B); g.stroke(); g.restore(); }
      const ky = prog(t, T.yomenai - 0.2, T.yomenai + 0.6);
      if (ky > 0) { write(g, '先が読めない', px, py + 150, ky, { font: `700 56px ${MIN}`, align: 'center' });
        const sh = 1 + 0.06 * Math.sin(t * 9) * prog(t, T.hannou, T.hannou + 2); brain(g, px + 330, py + 70, 1.3 * sh, prog(t, T.hannou - 0.1, T.hannou + 0.5)); }
      write(g, '出典：Fiorillo・Tobler・Schultz（2003年）サルの実験', X0, B + 100, prog(t, T.p50 + 0.4, T.p50 + 1.0), { font: `500 28px ${JP}`, color: '@dim' });
      g.restore();
    }
    this.cap(g, t, T.l43 - 0.1, T.l44 - 0.1, [['いちばん強かったのは 確率 '], ['50%', undefined, '@sky']], 54, 900);
    this.cap(g, t, T.l44 - 0.1, T.l45 - 0.1, [['先が読めないとき、脳はいちばん反応']], 54, 900);
    // ── câu 45: viên lắc + đồng hồ chờ ──
    if (t >= T.gacha - 0.2) {
      const e = out(t, T.gacha - 0.2, 0.7), cx = 1230, cy = 470;
      g.save(); g.translate((1 - e) * 900, 0);
      capsule(g, cx, cy, 120, 1, { tone: 'pink', shake: 1, t, ground: false });
      g.strokeStyle = C.faint; g.lineWidth = 16; g.beginPath(); g.arc(cx, cy, 190, 0, TAU); g.stroke();
      const ks = prog(t, T.suubyou - 0.2, T.end); g.strokeStyle = '#5C5648'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, 190, -Math.PI / 2, -Math.PI / 2 + TAU * 0.999 * ks); g.stroke();
      write(g, '数秒', cx, cy + 290, prog(t, T.suubyou, T.suubyou + 0.4), { font: `700 80px ${MIN}`, align: 'center' });
      write(g, '待つ時間', cx, cy - 250, prog(t, T.matsu45, T.matsu45 + 0.5), { font: `700 60px ${MIN}`, align: 'center' });
      g.restore();
    }
    this.cap(g, t, T.l45 - 0.1, T.end + 4, [['数秒の演出 ＝ 「待つ時間」']]);
    const [m0, m1] = this.MASCOT;
    if (t > m0 && t < m1 + 0.7) { g.save(); g.translate(0, 520 * out(t, m1, 0.6)); figure(g, 'coin-flip', 1690, H, 430, prog(t, m0, m0 + 0.6), { t }); g.restore(); }
  }
}
function glintBell(g, x, y, k) {                                       // chuông nhỏ (合図)
  g.save(); g.translate(x, y - 4); g.scale(outCubic(k), outCubic(k)); g.fillStyle = '#E8B7C6'; g.strokeStyle = '#A8687E'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-26, 22); g.quadraticCurveTo(-26, -30, 0, -30); g.quadraticCurveTo(26, -30, 26, 22); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.arc(0, 30, 7, 0, TAU); g.fill(); g.stroke(); g.restore();
}
