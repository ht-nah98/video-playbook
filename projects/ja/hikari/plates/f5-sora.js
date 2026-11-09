// f5 · 空はなぜ青い (p2 câu 105–112). ERA sky.
//  105 分子/散乱      chùm trắng qua đám phân tử, mỗi lần chạm toả tia nhỏ 四方
//  106 短い/6倍       cột 450 / 700 (cao tỉ lệ (700/λ)^4 = RAYLEIGH) — trục λ ngắn → dài trái → phải
//  107 あちこち/青い   tia lam từ mọi phía vào mắt, nền trời nhuộm nhẹ
//  108–110            tím còn mạnh hơn → 「空は紫に？」 → ít tím trong ánh Mặt Trời, mắt kém nhạy tím → mắt + não đọc 『青』
//  111–112 夕方/夕焼け Trái Đất cong + lớp khí dày, tia đi dọc đường dài: lam rẽ đi dần, chỉ đỏ/cam tới mắt
import { C, W, H, WALL_X, clamp, hash, prog, lookup, must, smooth, outCubic, TAU, wlCss, RAYLEIGH, ground, aperture, ray, shaft, spot, chip,
  telop, title, cue } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const BY = 430, MOL = 26, XEND = 1250, BASE = 700, H0 = 50;
const COLS = [[400, 1440, '紫'], [450, 1580, '青'], [700, 1720, '赤']];
const barH = nm => H0 * (700 / nm) ** 4;
must(`${Math.abs(barH(450) / barH(700) - RAYLEIGH) < 1e-9 && Math.round(RAYLEIGH) === 6}`, true);
must(`${barH(400) > barH(450) && barH(450) > barH(700)}`, true);
const EYEP = [1000, 840];
const MOLS = Array.from({ length: MOL }, (_, i) => [420 + 810 * hash(i * 1.9 + 3), BY - 70 + 140 * hash(i * 4.7 + 1)]);
const ER = 1480, EC = [960, 2300], YO = EC[1] - Math.sqrt(ER * ER - 540 * 540);          // quan sát viên ở x = 1500 trên mặt đất
const OBS = [1500, YO - 22];

function eyeIcon(g, x, y, k) {
  if (k <= 0) return; const e = outCubic(clamp(k));
  g.save(); g.translate(x, y); g.scale(e, e); g.strokeStyle = C.text; g.lineWidth = 4; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(-62, 0); g.quadraticCurveTo(0, -54, 62, 0); g.quadraticCurveTo(0, 54, -62, 0); g.closePath(); g.fillStyle = 'rgba(20,19,23,0.9)'; g.fill(); g.stroke();
  g.fillStyle = C.text; g.beginPath(); g.arc(0, 0, 17, 0, TAU); g.fill(); g.restore();
}

export default class F5 {
  static ERA = 'sky';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f5-sora');
    this.START = L(105).start;
    this.FROM = Math.max(this.START - 1.2, L(104).end + 0.5);
    this.T = {
      title: this.FROM + 0.3,
      l105: L(105).start, bunshi: w(105, '分子'), sanran: w(105, '散乱'),
      l106: L(106).start, mijikai: w(106, '短い'), b6: w(106, '6倍'),
      l107: L(107).start, sorajuu: w(107, 'あちこち'), aoi: w(107, '青い', 2),
      l108: L(108).start, murasaki: w(108, '紫', 1), nara: w(108, 'なら'),
      l109: L(109).start, motomoto: w(109, 'もともと'), binkan: w(109, '敏感'),
      l110: L(110).start, ao110: w(110, '青'),
      l111: L(111).start, yuugata: w(111, '夕方'), atsui: w(111, '分厚い'), aoi111: w(111, '青い'), aka: w(111, '赤'),
      l112: L(112).start, yake: w(112, '夕焼け'),
    };
  }
  sfx() {
    const T = this.T;
    return [cue(T.bunshi, 'step'), cue(T.sanran, 'telop'), cue(T.mijikai + 0.1, 'step'), cue(T.b6, 'step'),
      cue(T.sorajuu, 'spectrum'), cue(T.aoi, 'telop'), cue(T.murasaki + 0.2, 'step'), cue(T.nara, 'telop'), cue(T.motomoto, 'step'),
      cue(T.binkan, 'step'), cue(T.l110, 'step', -8), cue(T.ao110 - 0.2, 'beam', -6), cue(T.yuugata + 0.3, 'beam'),
      cue(T.atsui, 'step'), cue(T.aoi111, 'step'), cue(T.aka, 'beam', -6), cue(T.yake, 'telop')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'sky');
    g.save(); g.fillStyle = '#0E0C09'; g.fillRect(0, 0, WALL_X, H); g.restore();
    const swap = outCubic(prog(t, T.l111 - 0.4, T.l111 + 0.5));
    aperture(g, 'window', { y: swap > 0 ? BY + (900 - BY) * swap : BY, open: prog(t, F + 0.3, F + 1.0) });

    if (swap < 1) {
      g.save(); g.translate(-swap * 2000, 0);
      const kT = smooth(prog(t, T.sorajuu, T.sorajuu + 1.2));
      if (kT > 0) { g.fillStyle = wlCss(470, 0.06 * kT); g.fillRect(WALL_X, 0, W, 948); }
      // chùm + phân tử
      const kB = prog(t, F + 0.5, F + 3.0), xh = 92 + (XEND - 92) * kB;
      shaft(g, 92, BY, XEND, BY - 8, XEND, BY + 8, { a: 0.07, k: kB, t, dust: 30, spot: false, seed: 9 });
      ray(g, [[92, BY], [XEND, BY]], { nm: 'white', w: 5, k: kB, a: 0.85 });
      const nmS = t > T.sorajuu ? 470 : 'white';
      MOLS.forEach(([x, y], i) => {
        const k = clamp((xh - x) / 90); if (k <= 0) return;
        g.fillStyle = 'rgba(190,195,200,0.9)'; g.beginPath(); g.arc(x, y, 6, 0, TAU); g.fill();
        for (let j = 0; j < 5; j++) { const a = (j / 5 + hash(i * 3.3 + j) * 0.2) * TAU + hash(i) * 2, L = 36 * k;
          ray(g, [[x + Math.cos(a) * 8, y + Math.sin(a) * 8], [x + Math.cos(a) * (8 + L), y + Math.sin(a) * (8 + L)]], { nm: nmS, w: 4, k: 1, a: 0.6, glow: 0.4 }); }
      });
      // cột 450 / 700 / 400
      const bars = [[700, 700, 1720, '赤', prog(t, T.mijikai, T.mijikai + 0.9)], [450, 470, 1580, '青', prog(t, T.mijikai + 0.2, T.mijikai + 1.1)], [400, 400, 1440, '紫', prog(t, T.murasaki, T.murasaki + 1.0)]];
      // 「なぜ紫でない」: ánh Mặt Trời ít tím (もともと) rồi mắt kém nhạy tím (敏感) — hệ số mô phỏng (模式図), cột co lại
      const SUN = { 700: 0.9, 450: 0.9, 400: 0.5 }, EYEF = { 700: 0.35, 450: 0.8, 400: 0.25 };
      const uS = smooth(prog(t, T.motomoto, T.motomoto + 1.0)), uE = smooth(prog(t, T.binkan, T.binkan + 1.0));
      for (const [nm, cc, cx, lab, k] of bars) {
        if (k <= 0) continue; const f = lerp(1, SUN[nm], uS) * lerp(1, EYEF[nm], uE), h = barH(nm) * outCubic(k) * f;
        g.save(); g.fillStyle = wlCss(cc, 0.9); g.fillRect(cx - 45, BASE - h, 90, h); g.globalCompositeOperation = 'lighter'; g.fillStyle = wlCss(cc, 0.18); g.fillRect(cx - 62, BASE - h - 10, 124, h + 10); g.restore();
        chip(g, cx - 34, BASE + 38, cc, 11, k); telop(g, lab, cx + 6, BASE + 52, k, { size: 36, align: 'center' });
      }
      if (uS > 0) telop(g, '模式図（太陽光 × 目の感度）', 1380, 940, uS, { size: 30, weight: 500, color: '@dim' });
      telop(g, `およそ${Math.round(RAYLEIGH)}倍`, 1400, 860, prog(t, T.b6, T.b6 + 0.8), { size: 60, mincho: true });
      // mắt + tia lam từ mọi phía
      const kE = prog(t, T.sorajuu, T.sorajuu + 0.6);
      if (kE > 0) { eyeIcon(g, EYEP[0], EYEP[1], kE);
        for (let i = 0; i < 9; i++) { const k = prog(t, T.sorajuu + 0.2 + i * 0.1, T.sorajuu + 0.9 + i * 0.1);
          ray(g, [[420 + i * 110, 250 + 40 * hash(i * 2.1)], [EYEP[0] - 40 + i * 10, EYEP[1] - 30]], { nm: 470, w: 4, k, a: 0.6, glow: 0.5 }); } }
      // chữ trái
      const row = (a, o, y, parts, op) => { if (t < a - 0.05) return; const f = o == null ? 0 : prog(t, o, o + 0.45); if (f >= 1) return;     // rút bằng mờ
        g.save(); g.globalAlpha = 1 - f; telop(g, parts, 140, y, prog(t, a, a + 0.8), op); g.restore(); };
      row(T.sanran - 0.1, T.l108 - 0.1, 660, '散乱', { size: 72, mincho: true });
      row(T.aoi - 0.2, T.l108 - 0.1, 770, 'だから、空は青い', { size: 56, mincho: true });
      row(T.murasaki - 0.1, T.l109 - 0.1, 660, '紫は、もっと強く散乱', { size: 48 });
      row(T.nara - 0.1, T.l109 - 0.1, 770, '空は紫に？', { size: 60, mincho: true });
      row(T.motomoto - 0.1, T.l110 - 0.1, 660, '太陽の光には、紫が少ない', { size: 46 });
      row(T.binkan - 0.2, T.l110 - 0.1, 770, '目も、紫には敏感でない', { size: 46 });
      row(T.ao110 - 0.3, null, 660, '目と脳が『青』と読み取る', { size: 52 });
      g.restore();
    }

    // ═════ 111–112: hoàng hôn ═════
    if (swap > 0) {
      g.save(); g.translate((1 - swap) * 2000, 0);
      const kG = smooth(prog(t, T.yuugata, T.yuugata + 2.5));
      const hg = g.createLinearGradient(0, 560, 0, 940); hg.addColorStop(0, wlCss(610, 0)); hg.addColorStop(1, wlCss(610, 0.2 * kG)); g.fillStyle = hg; g.fillRect(WALL_X, 560, W, 400);
      g.fillStyle = wlCss(470, 0.13); g.beginPath(); g.arc(EC[0], EC[1], ER + 90, 0, TAU); g.fill();          // lớp khí quyển
      g.fillStyle = '#0F1013'; g.beginPath(); g.arc(EC[0], EC[1], ER, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(154,149,140,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(EC[0], EC[1], ER, 0, TAU); g.stroke();
      const kB = prog(t, T.yuugata, T.yuugata + 2.6), xh = 92 + (OBS[0] - 92) * kB;
      const segs = [[92, 249, 'white'], [249, 560, 570], [560, 860, 590], [860, 1160, 610], [1160, OBS[0], 640]];
      for (const [x0, x1, nm] of segs) { const k = clamp((xh - x0) / (x1 - x0)); if (k > 0) ray(g, [[x0, 900], [x1, 900]], { nm, w: 6, k, a: 0.95 }); }
      [330, 520, 720, 920, 1120].forEach((x, i) => { const k = clamp((xh - x) / 160); if (k <= 0) return;
        for (const a of [-70, -90, -110]) { const r = a * Math.PI / 180, L = 100 - 6 * i;
          ray(g, [[x, 896], [x + Math.cos(r) * L, 896 + Math.sin(r) * L]], { nm: 470, w: 4, k, a: 0.7 - 0.08 * i, glow: 0.5 }); } });
      eyeIcon(g, OBS[0], OBS[1] - 30, prog(t, T.yuugata, T.yuugata + 0.6));
      if (kB >= 1) spot(g, OBS[0], 900, 90, { nm: 640, a: 0.4 * prog(t, T.aka, T.aka + 0.6) });
      telop(g, '夕方', 140, 340, prog(t, T.yuugata, T.yuugata + 0.8), { size: 64, mincho: true });
      telop(g, '分厚い大気', 330, 760, prog(t, T.atsui, T.atsui + 0.7), { size: 38, weight: 500 });
      telop(g, 'まっすぐ届くのは、赤やオレンジ', 140, 460, prog(t, T.aka, T.aka + 1.2), { size: 48 });
      telop(g, '夕焼け', 960, 600, prog(t, T.yake, T.yake + 1.0), { size: 96, mincho: true, align: 'center' });
      g.restore();
    }
    title(g, '空はなぜ青い', t, T.title);
  }
}
