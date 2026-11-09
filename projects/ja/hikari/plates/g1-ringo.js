// g1 · リンゴの赤 (p2 câu 113–114) — mở hồi 6 「色は頭の中にある」, ERA darkroom. Mở bằng BÀN TÁO (như a0, lỗ 節穴 ở y 360).
//  113 白い光 → tám sợi (420…700 nm) từ lỗ tới táo; 短い・中くらい dừng ở mặt táo (chấm tối) 「吸収」, 長い dội ra 「跳ね返す」
//  114 「持っているのは『どの光を跳ね返すか』だけ」; 赤い: ảnh sodium-cars + táo thứ hai dưới SODIUM (tối hẳn) + chip 589 nm
//      「『赤い』という感じは、まだどこにもない」
// Mọi giờ lấy từ chữ (w / L); số lên hình lấy từ kit (NA_LINES). Chữ chỉ qua telop/write/title/photo; màu có sắc chỉ qua wl2rgb (ray/shaft/chip/apple).
import { NA_LINES, measure, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, ray, shaft, spot, chip, apple, chabudai, photo, imgs,
  telop, title, actCard, actCues, actTimes, cue, APT, SODIUM, TAU, W } from '../kit.js';

const TX = 1150, AY = 812, AR = 50;                       // bàn táo (sf1): chabudai(1150, 880, 380) + apple(1150, 812, 50)
const HOLE = [APT.x, 360];
const NMS = [420, 460, 500, 540, 580, 620, 660, 700];     // tám sợi của ánh trắng; < 600 bị hút, ≥ 600 dội ra
const CUT = 600;

/** Điểm chạm trên mặt táo (mặt trên-trái, hướng về lỗ) + hướng dội (phản xạ gương của tia từ lỗ). */
function strand(j) {
  const phi = -2.95 + 0.2 * j, hit = [TX + Math.cos(phi) * AR * 1.0, AY + Math.sin(phi) * AR * 1.0];
  const d = [hit[0] - HOLE[0], hit[1] - HOLE[1]], dl = Math.hypot(d[0], d[1]); d[0] /= dl; d[1] /= dl;
  const n = [Math.cos(phi), Math.sin(phi)], dn = d[0] * n[0] + d[1] * n[1];
  const r = [d[0] - 2 * dn * n[0], d[1] - 2 * dn * n[1]];
  return { hit, r };
}
const lerp = (a, b, u) => a + (b - a) * u;
/** Nhóm chữ trượt ra trái (rời khung bằng chuyển động): vẽ khi t ∈ [a, b + 0.5]. */
function slide(g, t, a, b, draw) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.5)); if (o >= 1) return;
  g.save(); g.globalAlpha = 1 - o; draw(); g.restore();
}

export default class Ringo {
  static ERA = 'darkroom';
  static IMAGES = imgs('sodium-cars');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1-ringo');
    this.START = L(113).start;
    this.FROM = Math.max(this.START - 2.6, L(112).end + 0.5);   // mở hồi: lead 2.6
    this.T = {
      l114: L(114).start,
      mijikai: w(113, '短い'), chu: w(113, '中'), naga: w(113, '長い'), hane: w(113, '跳ね返します'),
      seishitsu: w(114, '性質'), hane114: w(114, '跳ね返す'), akai: w(114, '赤い'), mada: w(114, 'まだ'), end: L(114).end,
    };
    must(`'${NA_LINES[0].toFixed(0)}'`, '589');
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.mijikai - 0.05, 'step', -3),          // 「短い・中くらいの波長：吸収」
      cue(T.naga - 0.05, 'wave', -8),         // 「長い波長：跳ね返す」
      cue(T.l114 + 0.9, 'telop'),              // 「持っているのは『どの光を跳ね返すか』だけ」
      cue(T.akai + 0.2, 'aha'),                // táo tối dưới natri (suzu)
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START;
    ground(g, 'darkroom');
    aperture(g, 'knot', { y: 360, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, 'リンゴの赤', t, actTimes(F, S).o1 - 0.2, { act: 6 });

    // ── luồng sáng trắng tới bàn táo (sf1) — vẽ TRƯỚC thẻ hồi để thẻ che lên; bàn + táo vẽ SAU (thẻ trượt xuống phía sau bàn) ──
    const kb = outCubic(prog(t, F + 0.3, F + 1.6));
    const wf = 1 - smooth(prog(t, T.akai - 0.2, T.akai + 0.7));
    shaft(g, HOLE[0], HOLE[1], TX - 175, 872, TX + 165, 872, { a: 0.2 * Math.max(wf, 0.0001), k: kb, t, dust: 110, spot: false });
    actCard(g, t, F, S, 6);
    chabudai(g, TX, 880, 380, { lit: 0.9 * kb });
    if (kb > 0) spot(g, TX, 872, 230, { a: 0.35 * kb, sy: 0.16 });
    apple(g, TX, AY, AR, { lit: kb });
    { const ka = smooth(prog(t, T.akai + 0.2, T.akai + 1.0)); if (ka > 0) { g.save(); g.globalAlpha = ka; apple(g, TX, AY, AR, { illum: SODIUM, lit: 3 }); g.restore(); } }

    // ── 113: tám sợi tới táo ──
    const kIn = outCubic(prog(t, S + 0.9, S + 1.9)), fade = 1 - smooth(prog(t, T.akai - 0.3, T.akai + 0.4));
    const kOut = prog(t, T.naga - 0.1, T.naga + 1.0), kDot = prog(t, T.mijikai, T.mijikai + 0.5);
    if (kIn > 0 && fade > 0) NMS.forEach((nm, j) => {
      const s = strand(j);
      ray(g, [HOLE, s.hit], { nm, w: 4, k: kIn, a: 0.8 * fade, glow: 0.7 });
      if (nm >= CUT) { const e = [s.hit[0] + s.r[0] * 480, s.hit[1] + s.r[1] * 480]; ray(g, [s.hit, e], { nm, w: 5, k: kOut, a: fade, glow: 0.8 }); }
      else if (kDot > 0 && kIn >= 1) { g.save(); g.globalAlpha = fade; g.fillStyle = 'rgba(11,11,14,0.9)'; g.beginPath(); g.arc(s.hit[0], s.hit[1], 8 * outBack(kDot), 0, TAU); g.fill(); g.restore(); }
    });
    slide(g, t, T.mijikai - 0.1, T.l114 - 0.1, () => {
      chip(g, 160, 880, 460, 12, prog(t, T.mijikai, T.mijikai + 0.4)); chip(g, 200, 880, 540, 12, prog(t, T.chu, T.chu + 0.4));
      telop(g, '短い・中くらいの波長：吸収', 232, 892, prog(t, T.mijikai, T.mijikai + 1.0), { size: 40 });
    });
    slide(g, t, T.naga - 0.1, T.l114 - 0.1, () => {
      const kk = prog(t, T.naga, T.naga + 0.9);
      chip(g, 1432, 372, 660, 12, prog(t, T.naga, T.naga + 0.4));
      telop(g, '長い波長：跳ね返す', 1820, 384, kk, { size: 40, align: 'right' });
    });

    // ── 114: tính chất của táo ──
    telop(g, 'リンゴが持っているのは、「どの光を跳ね返すか」だけ', 140, 262, prog(t, T.l114, T.l114 + 1.6), { size: 44 });
    { const f = '700 44px "Noto Sans JP"', xa = 140 + measure(g, 'リンゴが持っているのは、', f), xb = xa + measure(g, '「どの光を跳ね返すか」', f), ku = prog(t, T.hane114 - 0.2, T.hane114 + 0.7);
      if (ku > 0) { g.save(); g.strokeStyle = '#EDE8DF'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(xa, 282); g.lineTo(xa + (xb - xa) * outCubic(ku), 282); g.stroke(); g.restore(); } }

    // ── 赤い: ánh natri → táo tối hẳn; ảnh đường phố natri ──
    const ks = outCubic(prog(t, T.akai - 0.2, T.akai + 0.9));
    if (ks > 0) {
      shaft(g, HOLE[0], HOLE[1], TX - 175, 872, TX + 165, 872, { nm: NA_LINES[0], a: 0.26, k: ks, t, dust: 60, seed: 5, spot: false });
      const kc = prog(t, T.akai + 0.6, T.akai + 1.2);
      chip(g, TX - 52, 988, NA_LINES[0], 11, kc);
      telop(g, `${NA_LINES[0].toFixed(0)} nm`, TX - 28, 998, kc, { size: 30, weight: 500, color: '@dim' });
    }
    photo(g, 'sodium-cars', 1424, 200, 300, prog(t, T.akai, T.akai + 1.1), { align: 'right', labelSize: 30 });
    telop(g, '「赤い」という感じは、', 140, 850, prog(t, T.akai + 0.2, T.akai + 1.2), { size: 46, mincho: true });
    telop(g, 'まだ、どこにもない', 140, 925, prog(t, T.mada, T.mada + 1.0), { size: 52, mincho: true });
  }
}
