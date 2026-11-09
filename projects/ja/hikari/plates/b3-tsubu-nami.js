// b3 · 粒か、波か (p2 câu 7–11) — ERA darkroom. Hồi 1: Newton (hạt) vs Huygens (sóng) → "hai chùm đi xuyên nhau" → thuyết hạt thắng thế kỷ 18.
//  7 ảnh newton + dòng chấm sáng bay THẲNG từ lỗ · 8 ảnh huygens + gợn tròn đồng tâm · 9 hai chùm cắt nhau đi xuyên qua nhau, hai mắt nhìn nhau
//  10 「ホイヘンスの問い」 (gợn từ hai mắt chồng nhau đi qua nhau) · 11 cán cân nghiêng về 「粒」 — 18世紀
import { TAU, clamp, prog, lookup, smooth, outBack, outCubic, ground, aperture, shaft, spot, ray, telop, title, photo, imgs, cue, ink, plate } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));

function eyeIcon(g, x, y, s, { dir = 1, a = 1 } = {}) {
  const hh = s * 0.27;
  g.save(); g.globalAlpha = a; g.strokeStyle = ink('@ink'); g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x - s / 2, y); g.quadraticCurveTo(x, y - hh * 2, x + s / 2, y); g.quadraticCurveTo(x, y + hh * 2, x - s / 2, y); g.closePath(); g.stroke();
  g.fillStyle = ink('@ink'); g.beginPath(); g.arc(x + dir * s * 0.1, y, s * 0.12, 0, TAU); g.fill(); g.restore();
}
/** Vòng gợn: các vòng tròn (đa giác) bán kính nở dần, nhạt dần; clip theo cửa sổ y (không tràn vào tiêu đề). */
function ripples(g, t, cx, cy, rmax, t0, { n = 4, period = 2.4, a = 0.85, clipY = [200, 860], arc = [0, TAU] } = {}) {
  if (t < t0) return;
  for (let j = 0; j < n; j++) {
    const u = (((t - t0) / period + j / n) % 1 + 1) % 1, r = 12 + (rmax - 12) * u, P = [];
    for (let s = 0; s <= 64; s++) { const an = arc[0] + (arc[1] - arc[0]) * s / 64; P.push([cx + Math.cos(an) * r, cy + Math.sin(an) * r]); }
    g.save(); g.beginPath(); g.rect(96, clipY[0], 1728, clipY[1] - clipY[0]); g.clip();
    ray(g, P, { nm: 'white', w: 4, a: a * (1 - u) * Math.min(1, (t - t0) * 2), glow: 0.5 }); g.restore();
  }
}

export default class TsubuNami {
  static ERA = 'darkroom';
  static IMAGES = imgs('newton', 'huygens');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3-tsubu-nami');
    this.START = L(7).start;
    this.FROM = Math.max(this.START - 1.2, L(6).end + 0.5);
    this.T = {
      l7: L(7).start, seiki: w(7, '17世紀'), tsubu7: w(7, '粒'),
      l8: L(8).start, oranda: w(8, 'オランダ'), mizu: w(8, '水面'), hamon: w(8, '波紋'),
      l9: L(9).start, tsubu9: w(9, '粒'), kosa: w(9, '交差'), butsu: w(9, 'ぶつかり合う'), demo: w(9, 'で'), futari: w(9, '2人'),
      l10: L(10).start, huy: w(10, 'ホイヘンス'), l11: L(11).start, meisei: w(11, '名声'), seiki18: w(11, '18世紀'), tsubu11: w(11, '粒'), end: L(11).end,
    };
  }
  sfx() {
    const T = this.T;
    return [cue(T.seiki - 0.3, 'photo'), cue(T.tsubu7 - 0.2, 'telop'), cue(T.kosa - 2.2, 'tick', -5),
      cue(T.oranda - 0.3, 'photo'), cue(T.hamon - 0.7, 'wave', -6), 
      cue(T.kosa, 'beam'), cue(T.butsu, 'step', -3), cue(T.futari, 'telop'),
      cue(T.l10 + 0.3, 'wave', -8), cue(T.meisei + 0.3, 'step', -2), cue(T.seiki18, 'telop'), cue(T.tsubu11, 'tick', -3)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'knot', { open: smooth(prog(t, F + 0.1, F + 0.7)) });
    shaft(g, 92, 360, 1800, 325, 1800, 395, { a: 0.07, k: prog(t, F + 0.1, F + 1.6), t, dust: 40, seed: 21, spot: false });
    title(g, '粒か、波か', t, F + 0.3);

    // ── 7–8: hai ảnh dưới, dòng hạt trên, gợn giữa-phải (rời sang hai bên khi câu 9 vào) ──
    const o9 = out(t, T.l9 - 0.15, 0.7);
    if (o9 < 1) {
      g.save(); g.translate(-1900 * o9, 0);                                   // nhóm TRÁI: ảnh Newton + chữ
      photo(g, 'newton', 140, 430, 380, prog(t, T.seiki - 0.3, T.seiki + 0.8));
      telop(g, '17世紀', 560, 500, prog(t, T.seiki, T.seiki + 0.8), { size: 60, mincho: true });
      telop(g, '光は、小さな粒の流れ？', 560, 595, prog(t, T.tsubu7 - 0.4, T.tsubu7 + 1.0), { size: 46 });
      telop(g, '光は、波紋のような波？', 560, 685, prog(t, T.hamon - 0.6, T.hamon + 0.8), { size: 46 });
      g.restore();
      g.save(); g.translate(1900 * o9, 0);                                    // nhóm PHẢI: hạt, gợn, ảnh Huygens
      if (t >= T.tsubu7) for (let i = 0; i < 6; i++) {                        // chuỗi hạt bay THẲNG từ lỗ (hàm của t)
        const u = (((t - T.tsubu7) * 380 + i * 270) % 1620 + 1620) % 1620, x = 110 + u, a = Math.min(1, (t - T.tsubu7) * 2) * (1 - u / 1900);
        spot(g, x, 360, 26, { nm: 'white', a: 0.55 * a });
        g.fillStyle = `rgba(255,253,248,${a})`; g.beginPath(); g.arc(x, 360, 7, 0, TAU); g.fill();
      }
      ripples(g, t, 1330, 600, 175, T.mizu - 0.1, { n: 4, period: 2.6 });
      photo(g, 'huygens', 1534, 430, 380, prog(t, T.oranda - 0.3, T.oranda + 0.8), { align: 'right' });
      g.restore();
    }

    // ── 9–10: hai chùm cắt nhau, đi xuyên qua nhau; hai mắt ──
    const o11 = out(t, T.l11 - 0.1, 0.7);
    if (t >= T.l9 - 0.1 && o11 < 1) {
      g.save(); g.translate(-1900 * o11, 0);
      const kb = prog(t, T.kosa - 0.2, T.kosa + 1.4), A = [[600, 470], [1500, 590]], B = [[600, 590], [1500, 470]];
      ray(g, A, { nm: 'white', w: 7, k: kb }); ray(g, B, { nm: 'white', w: 7, k: kb });
      for (const p of [A[0], B[0]]) spot(g, p[0], p[1], 40, { nm: 'white', a: 0.4 * prog(t, T.kosa - 0.2, T.kosa + 0.3) });
      // ぶつかり合う? — một ✗ ở chỗ cắt, rồi hai chấm sáng đi XUYÊN qua nhau
      const kx = prog(t, T.butsu, T.butsu + 0.4) * (1 - prog(t, T.demo + 0.3, T.demo + 0.8));
      if (kx > 0) { g.save(); g.globalAlpha = kx; g.strokeStyle = ink('@dim'); g.lineWidth = 4; g.setLineDash([8, 8]); g.beginPath(); g.arc(1050, 530, 46, 0, TAU); g.stroke(); g.restore(); }
      const kd = prog(t, T.demo, T.demo + 1.8);
      if (kd > 0 && kd < 1) for (const [P, Q] of [[A[0], A[1]], [B[0], B[1]]]) {
        const x = P[0] + (Q[0] - P[0]) * kd, y = P[1] + (Q[1] - P[1]) * kd; spot(g, x, y, 36, { nm: 'white', a: 0.8 });
        g.fillStyle = '#FFFDF8'; g.beginPath(); g.arc(x, y, 8, 0, TAU); g.fill();
      }
      const ke = prog(t, T.futari - 0.1, T.futari + 0.4);
      if (ke > 0) for (const [ex, dir] of [[520, 1], [1580, -1]]) { g.save(); g.translate(ex, 530); g.scale(outBack(ke), outBack(ke)); g.translate(-ex, -530); eyeIcon(g, ex, 530, 130, { dir }); g.restore(); }
      ripples(g, t, 520, 530, 560, T.l10 + 0.1, { n: 3, period: 2.2, a: 0.5, clipY: [220, 840], arc: [-1.1, 1.1] });
      ripples(g, t, 1580, 530, 560, T.l10 + 0.1, { n: 3, period: 2.2, a: 0.5, clipY: [220, 840], arc: [Math.PI - 1.1, Math.PI + 1.1] });
      telop(g, '粒なら、ぶつかり合うはず', 960, 780, prog(t, T.tsubu9, T.butsu + 0.9), { size: 52, mincho: true, align: 'center' });
      telop(g, '2人は同時に、おたがいの目を見られる', 960, 880, prog(t, T.futari, T.futari + 1.3), { size: 48, align: 'center' });
      telop(g, 'ホイヘンスの問い', 960, 975, prog(t, T.huy, T.huy + 0.8), { size: 40, color: '@dim', align: 'center' });
      g.restore();
    }

    // ── 11: cán cân nghiêng về 「粒」 ──
    if (t >= T.l11 - 0.1) {
      const kk = prog(t, T.l11 - 0.1, T.l11 + 0.9), tilt = -0.2 * smooth(prog(t, T.meisei - 0.2, T.meisei + 1.4));
      g.save(); g.globalAlpha = 1; g.lineCap = 'round'; g.lineJoin = 'round';
      const px = 960, py = 470, hl = 380 * smooth(kk), c = Math.cos(tilt), s = Math.sin(tilt);
      const L = [px - hl * c, py - hl * s], R = [px + hl * c, py + hl * s];
      g.strokeStyle = ink('@dim'); g.lineWidth = 6; g.beginPath(); g.moveTo(px, py + 8); g.lineTo(px, 835); g.stroke();                  // trụ
      g.beginPath(); g.moveTo(px - 140, 835); g.lineTo(px + 140, 835); g.stroke();
      g.strokeStyle = ink('@ink'); g.lineWidth = 8; g.beginPath(); g.moveTo(...L); g.lineTo(...R); g.stroke();                            // đòn cân
      g.fillStyle = ink('@ink'); g.beginPath(); g.arc(px, py, 14, 0, TAU); g.fill();
      if (kk >= 1) for (const [E, lab, d] of [[L, '粒', 'tsubu'], [R, '波', 'nami']]) {
        g.strokeStyle = ink('@dim'); g.lineWidth = 4; const ty = E[1] + 150;
        g.beginPath(); g.moveTo(E[0], E[1]); g.lineTo(E[0] - 110, ty); g.moveTo(E[0], E[1]); g.lineTo(E[0] + 110, ty); g.stroke();
        g.strokeStyle = ink('@ink'); g.lineWidth = 7; g.beginPath(); g.moveTo(E[0] - 130, ty); g.lineTo(E[0] + 130, ty); g.stroke();
        telop(g, lab, E[0], ty - 34, prog(t, T.l11 + 0.3 + (d === 'nami' ? 0.3 : 0), T.l11 + 1.1 + (d === 'nami' ? 0.3 : 0)), { size: 72, mincho: true, align: 'center' });
        if (d === 'tsubu') telop(g, 'ニュートンの名声', E[0], ty + 62, prog(t, T.meisei, T.meisei + 0.8), { size: 36, color: '@dim', align: 'center' });
      }
      g.restore();
      telop(g, '18世紀：ほとんどの人が『粒』', 960, 925, prog(t, T.seiki18, T.seiki18 + 1.2), { size: 48, align: 'center' });
    }
  }
}
