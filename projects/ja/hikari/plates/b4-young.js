// b4 · ヤングの縞模様 (p2 câu 12–17) — ERA darkroom. Lỗ 'double' (gap 90, y 360), màn dọc ở x 1480–1550, ánh sáng MỘT màu 589 nm (không ghi số).
//  12 ảnh young + 1801〜1803年 · 13 hai nguồn sóng tròn chồng nhau · 14 màn: 「粒なら？」 hai vạch mờ → vân hiện DẦN từng chấm
//     (vị trí chấm = hash(i) qua nghịch đảo CDF của I(y) = cos²(π d y / λL) × bao nhiễu xạ — tính, không vẽ tay)
//  15 hai sóng chồng: 山＋山 → sáng (biên độ đôi), 山＋谷 → tối (triệt tiêu) · 16 1819 フレネル + young-fig442 · 17 「光は、波だ」
import { TAU, clamp, hash, prog, lookup, smooth, outBack, outCubic, ground, aperture, shaft, ray, wave, wlCss, telop, title, photo, imgs,
  plate, arrow, cue, ink } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const SX0 = 1480, SX1 = 1550, SY0 = 110, SY1 = 610, YC = 360, PITCH = 54, NDOT = 1000;
const I = y => Math.cos(Math.PI * (y - YC) / PITCH) ** 2 * Math.exp(-(((y - YC) / 190) ** 2));
const yb = m => YC + PITCH * m;
// CDF của I(y) trên màn (tính một lần, tất định) → nghịch đảo cho vị trí chấm
const CDF = (() => { const n = 500, c = [0]; for (let i = 0; i < n; i++) c.push(c[i] + I(SY0 + (SY1 - SY0) * (i + 0.5) / n)); return c.map(v => v / c[n]); })();
function invCdf(u) { let lo = 0, hi = CDF.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (CDF[m] <= u) lo = m; else hi = m; }
  const f = (u - CDF[lo]) / ((CDF[hi] - CDF[lo]) || 1); return SY0 + (SY1 - SY0) * (lo + f) / (CDF.length - 1); }
const DOTS = Array.from({ length: NDOT }, (_, i) => [SX0 + 6 + (SX1 - SX0 - 12) * hash(i * 3.1 + 1), invCdf(hash(i * 1.7 + 3))]);

export default class Young {
  static ERA = 'darkroom';
  static IMAGES = imgs('young', 'young-fig442');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b4-young');
    this.START = L(12).start;
    this.FROM = Math.max(this.START - 1.2, L(11).end + 0.5);
    this.T = {
      l12: L(12).start, y1801: w(12, '1801年'), y1803: w(12, '1803年'), igirisu: w(12, 'イギリス'), thomas: w(12, 'トマス'),
      l13: L(13).start, futatsu: w(13, '二つ'), kasanete: w(13, '重ねて'),
      l14: L(14).start, akarui: w(14, '明るい'), kurai: w(14, '暗い'), koukou: w(14, '高校'), young14: w(14, 'ヤング'),
      l15: L(15).start, yama1: w(15, '山', 1), kasanare: w(15, '重なれ', 1), yama3: w(15, '山', 3), tani: w(15, '谷'), tsubu: w(15, '粒'),
      l16: L(16).start, kagaku: w(16, '科学者たち'), nattoku: w(16, '納得'), y1819: w(16, '1819年'), goro: w(16, 'ごろ'), france: w(16, 'フランス'), fresnel: w(16, 'フレネルたち'),
      l17: L(17).start, hikari17: w(17, '光'), nami17: w(17, '波'), sukunaku: w(17, '少なく'), end: L(17).end,
    };
  }
  sfx() {
    const T = this.T, b = this.dotTimes();
    return [cue(T.y1803, 'tick', -3), cue(T.thomas - 0.5, 'photo'), cue(T.futatsu - 0.1, 'tick'), cue(T.l14 + 0.05, 'step', -4),
      cue(b[0], 'arrive', -8), cue(b[1], 'arrive', -8), cue(b[2], 'arrive', -8), cue(T.young14, 'page', -6),
      cue(T.kasanare, 'wave', -4), cue(T.tani, 'tick', -3), cue(T.tsubu, 'telop'),
      cue(T.kagaku, 'photo'), cue(T.y1819, 'telop', -2), cue(T.france, 'tick', -3), cue(T.nami17 + 0.15, 'aha', -3)];
  }
  /** Ba mốc beep: chấm đầu tiên, rồi khi vân bắt đầu thành cụm (không mỗi chấm một tiếng). */
  dotTimes() { const T = this.T; return [T.akarui + 0.35, T.kurai + 0.5, T.kurai + 1.7]; }
  render(g, t) {
    const T = this.T, F = this.FROM, st = this;
    ground(g, 'darkroom');
    const double = t >= T.l13 - 0.1;
    aperture(g, double ? 'double' : 'knot', { gap: 90, open: smooth(prog(t, F + 0.1, F + 0.7)) });
    if (!double) shaft(g, 92, 360, 1800, 325, 1800, 395, { a: 0.07, k: prog(t, F + 0.1, F + 1.6), t, dust: 40, seed: 31, spot: false });
    title(g, 'ヤングの縞模様', t, F + 0.3);

    // ── 12: ảnh + năm (rời khi câu 13 vào) ──
    const o12 = out(t, T.l13 - 0.15, 0.7);
    if (o12 < 1) {
      g.save(); g.translate(-1900 * o12, 0);
      const a = telop(g, '1801', 140, 480, prog(t, T.y1801, T.y1801 + 0.8), { size: 72, mincho: true });
      telop(g, '〜1803年', a.x0 + a.w + 4, 480, prog(t, T.y1803, T.y1803 + 0.8), { size: 72, mincho: true });
      telop(g, 'イギリス', 140, 590, prog(t, T.igirisu, T.igirisu + 0.7), { size: 52, color: '@dim' });
      telop(g, 'トマス・ヤング', 140, 690, prog(t, T.thomas, T.thomas + 0.9), { size: 60, mincho: true });
      g.restore();
      g.save(); g.translate(1900 * o12, 0);
      photo(g, 'young', 1574, 250, 380, prog(t, T.thomas - 0.4, T.thomas + 0.8), { align: 'right' });
      g.restore();
    }

    // ── 13–15: sân khấu hai khe ──
    const arcK = prog(t, T.l13, T.l13 + 0.8) * (1 - prog(t, T.l15 - 0.1, T.l15 + 0.8) * (t < T.l16 ? 1 : 1));
    if (arcK > 0.01) {
      g.save(); g.beginPath(); g.rect(96, 215, SX0 - 96 - 10, 425); g.clip();
      for (const hy of [315, 405]) for (let j = 0; j < 12; j++) {
        const r = ((t * 80 + j * 72) % 864) + 20, P = [];
        for (let s = 0; s <= 40; s++) { const an = -1.0 + 2.0 * s / 40; P.push([92 + Math.cos(an) * r, hy + Math.sin(an) * r]); }
        ray(g, P, { nm: 589, w: 4, a: 0.55 * (1 - r / 900) * arcK, glow: 0.4 });
      }
      g.restore();
    }
    // màn
    const kS = prog(t, T.l13 + 0.5, T.l13 + 1.3);
    if (kS > 0) {
      g.save(); g.beginPath(); g.rect(SX0 - 8, SY0 - 8, (SX1 - SX0 + 16) * smooth(kS), SY1 - SY0 + 16); g.clip();
      plate(g, SX0, SY0, SX1 - SX0, SY1 - SY0, { a: 0.95, ring: true }); g.restore();
    }
    if (kS >= 1) {
      // 粒なら？ — hai vạch mờ đúng sau hai khe
      const kb = prog(t, T.l14, T.l14 + 0.5) * (1 - prog(t, T.akarui + 0.2, T.akarui + 0.9));
      if (kb > 0) {
        g.save(); g.globalAlpha = 0.45 * kb; g.fillStyle = ink('@dim'); for (const y of [315, 405]) g.fillRect(SX0 + 6, y - 14, SX1 - SX0 - 12, 28); g.restore();
        telop(g, '粒なら？', 1566, 372, kb, { size: 36, color: '@dim' });
      }
      // đường tới các cực đại (hình học vân, mờ), rồi rút lại ở câu 15
      const kf = prog(t, T.akarui - 0.2, T.akarui + 1.2) * (1 - prog(t, T.l15 - 0.1, T.l15 + 0.7));
      if (kf > 0) for (let m = -4; m <= 4; m++) ray(g, [[92, YC], [SX0 - 4, yb(m)]], { nm: 589, w: 4, a: 0.22, k: kf, glow: 0.3 });
      // chấm hiện dần: n = NDOT · s², s = tiến độ trong [akarui, young14 + 0.5]
      const s = smooth(prog(t, T.akarui + 0.1, T.young14 + 0.5)), n = Math.floor(NDOT * s * s);
      g.save(); g.fillStyle = wlCss(589, 0.9); for (let i = 0; i < n; i++) g.fillRect(DOTS[i][0], DOTS[i][1] - 2.5, 5, 5); g.restore();
      // nhãn đúng độ cao vân
      const kl1 = prog(t, T.akarui + 0.2, T.akarui + 0.8), kl2 = prog(t, T.kurai + 0.2, T.kurai + 0.8);
      arrow(g, [[1612, yb(0)], [1562, yb(0)]], kl1, { color: '@dim', w: 4, head: 12 });
      telop(g, '明るい縞', 1626, yb(0) + 12, kl1, { size: 36 });
      arrow(g, [[1612, yb(2.5)], [1562, yb(2.5)]], kl2, { color: '@dim', w: 4, head: 12 });
      telop(g, '暗い縞', 1626, yb(2.5) + 12, kl2, { size: 36 });
    }
    // chữ câu 13 / 14
    const o13 = out(t, T.l14 - 0.1, 0.6), o14 = out(t, T.l15 - 0.1, 0.6);
    if (t >= T.futatsu - 0.6 && o13 < 1) {
      g.save(); g.translate(-1900 * o13, 0);
      telop(g, '光を二つに分けて、重ねる', 300, 760, prog(t, T.futatsu - 0.5, T.futatsu + 1.0), { size: 48 });
      telop(g, '二重スリット（今の教科書の形）', 300, 835, prog(t, T.kasanete, T.kasanete + 1.0), { size: 36, color: '@dim' });
      g.restore();
    }
    if (t >= T.akarui && o14 < 1) {
      g.save(); g.translate(-1900 * o14, 0);
      telop(g, '明るい縞と暗い縞', 300, 770, prog(t, T.akarui, T.akarui + 1.0), { size: 52, mincho: true });
      telop(g, 'ヤングの実験（高校物理）', 300, 860, prog(t, T.young14, T.young14 + 0.9), { size: 44 });
      g.restore();
    }

    // ── 15: hai sóng chồng ──
    const o15 = out(t, T.l16 - 0.1, 0.6);
    if (t >= T.yama1 - 0.3 && o15 < 1) {
      g.save(); g.translate(-1900 * o15, 0);
      const ph = t * 2.2, lam = 90, A = 32;
      const panelW = (x0, k, dlt, label, kt) => {
        const x1 = x0 + 540;
        wave(g, x0, 330, x1, 589, { lamPx: lam, amp: A, k, phase: ph, w: 5 });
        wave(g, x0, 440, x1, 589, { lamPx: lam, amp: A, k, phase: ph + dlt, w: 5 });
        const amp = 2 * A * Math.abs(Math.cos(dlt / 2));
        if (amp > 1) wave(g, x0, 590, x1, 589, { lamPx: lam, amp, k: k > 0 ? 1 : 0, phase: ph + dlt / 2, w: 6 });
        else if (k > 0) { g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, 590); g.lineTo(x0 + (x1 - x0) * k, 590); g.stroke(); g.restore(); }
        telop(g, label, x0 + 270, 735, kt, { size: 44, align: 'center' });
      };
      panelW(290, prog(t, T.yama1 - 0.2, T.kasanare + 0.4), 0, '山＋山 → 明るい', prog(t, T.kasanare, T.kasanare + 1.2));
      panelW(890, prog(t, T.yama3 - 0.2, T.tani + 0.8), Math.PI, '山＋谷 → 暗い', prog(t, T.tani, T.tani + 1.0));
      telop(g, '粒には、つくれない模様', 860, 880, prog(t, T.tsubu, T.tsubu + 1.1), { size: 52, mincho: true, align: 'center' });
      g.restore();
    }

    // ── 16: 1819 + hình trong sách Young ──
    const o16 = out(t, T.l17 - 0.2, 0.6);
    if (t >= T.l16 - 0.1 && o16 < 1) {
      g.save(); g.translate(-1900 * o16, 0);
      photo(g, 'young-fig442', 140, 250, 330, prog(t, T.kagaku - 0.2, T.kagaku + 0.9));
      telop(g, '科学者たちが納得するのは', 720, 290, prog(t, T.nattoku - 0.3, T.nattoku + 1.0), { size: 40, color: '@dim' });
      const a = telop(g, '1819年', 720, 390, prog(t, T.y1819, T.y1819 + 0.9), { size: 72, mincho: true });
      telop(g, 'ごろ', a.x0 + a.w + 6, 390, prog(t, T.goro, T.goro + 0.6), { size: 72, mincho: true });
      telop(g, 'フランスの', 720, 490, prog(t, T.france, T.france + 0.7), { size: 48 });
      telop(g, 'フレネルたち', 720, 570, prog(t, T.fresnel, T.fresnel + 0.8), { size: 60, mincho: true });
      g.restore();
    }

    // ── 17: 光は、波だ ──
    if (t >= T.l17 - 0.1) {
      telop(g, '光は、波だ', 860, 520, prog(t, T.hikari17, T.nami17 + 0.8), { size: 112, mincho: true, align: 'center' });
      telop(g, '少なくとも、誰もがそう思った', 860, 650, prog(t, T.sukunaku, T.sukunaku + 1.2), { size: 40, color: '@dim', align: 'center' });
    }
  }
}
