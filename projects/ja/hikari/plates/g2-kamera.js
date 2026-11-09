// g2 · 目というカメラ (p2 câu 115–122) — ERA eye (phòng thành nhãn cầu), lỗ 'pupil' đứng ngay trước đồng tử.
//  115 角膜 (3分の2) · 116 水晶体 (dày/mỏng → ピント) + 網膜 · 117 桿体 約1億 · 118 錐体 約500万 (khung zoom tròn bên phải)
//  mắt lớn (cx 1000) → thu về mắt nhỏ trái (cx 360) ở cuối 118; 119 đường nhạy S/M/L (trục 380–780, tím trái → đỏ phải, nét TRUNG TÍNH)
//  120 gạch 「Lは赤のセンサー」 → 「いちばん感じるのは黄緑」 · 121 ánh táo: L mạnh, M ít, S ≈ 0 (ba thanh) · 122 「脳は3つの信号を比べている」
// Số: CONES / APPLE từ kit; ba thanh tính bằng code (đường nhạy cục bộ × APPLE) + must L > M > S. Không màu ngoài ánh sáng (ray / chip / spectrumStrip).
import { CONES, APPLE, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, eye, ray, chip, spectrumStrip, ink, telop, write,
  wrong, strike, title, arrow, cue, W, H, TAU } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const BIG = { cx: 1000, cy: 540, R: 340 }, SMALL = { cx: 360, cy: 560, R: 200 };
const CX0 = 700, CW = 1040, CY = 800, CH = 40;                     // trục λ của đồ thị đường nhạy (cùng chiều dải chuẩn: ngắn → dài, trái → phải)
const X = nm => CX0 + (nm - 380) / 400 * CW, PEAK_Y = 486, AMP = 300, BASE_Y = CY - 14;
// đường nhạy (mô hình, bất đối xứng nhẹ): đỉnh đúng CONES; M & L chồng lên nhau nhiều
const CONE = { S: [CONES.S, 22, 30], M: [CONES.M, 38, 42], L: [CONES.L, 42, 46] };
const sens = (nm, [p, sl, sr]) => Math.exp(-0.5 * ((nm - p) / (nm < p ? sl : sr)) ** 2);
// tín hiệu của táo = Σ đường nhạy × phản xạ táo (APPLE), chuẩn hoá theo L — ba thanh dùng lại ở g4 (cùng tỉ lệ)
const SIG = (() => { const r = {}; for (const k of ['S', 'M', 'L']) { let s = 0; for (let nm = 380; nm <= 780; nm += 5) s += sens(nm, CONE[k]) * APPLE(nm); r[k] = s; }
  const m = r.L; return { S: r.S / m, M: r.M / m, L: 1 }; })();
const BAR_H = 170, BARS = [['S', 1450], ['M', 1530], ['L', 1610]], BAR_BASE = 400;
const polyAt = (nm0, nm1, f) => { const P = []; for (let nm = nm0; nm <= nm1; nm += 2) P.push([X(nm), BASE_Y - AMP * f(nm)]); return P; };

/** Đầu người trung tính (nét xám): skull + cổ + vai. */
function head(g, cx, cy, r, k = 1) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = ink('@dim'); g.lineWidth = Math.max(4, r * 0.07); g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(cx - r * 0.38, cy + r * 0.93); g.lineTo(cx - r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx - r * 1.1, cy + r * 1.4, cx - r * 1.5, cy + r * 1.8);
  g.moveTo(cx + r * 0.38, cy + r * 0.93); g.lineTo(cx + r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx + r * 1.1, cy + r * 1.4, cx + r * 1.5, cy + r * 1.8); g.stroke();
  g.restore();
}
/** Chùm 3 tia từ lỗ qua giác mạc → thuỷ tinh thể → võng mạc. Giai đoạn A (tới thuỷ tinh thể, hai bước bẻ) và B (tới võng mạc, hội tụ theo độ dày). */
function eyeRays(g, c, { kA = 1, kB = 1, thick = 0.5, nm = 'white', a = 0.8 } = {}) {
  const { cx, cy, R } = c, shift = (0.5 - thick) * 1.17 * R;
  for (const o of [-0.2, 0, 0.2]) {
    const dy = o * R, ex = cx - 0.62 * R - Math.sqrt((0.46 * R) ** 2 - dy * dy), lx = cx - 0.66 * R, ly = cy + dy * 0.55, rx = cx + 0.97 * R;
    const fx = rx + shift, yEnd = ly + (cy - ly) * (rx - lx) / (fx - lx);
    ray(g, [[WALL, cy], [ex, cy + dy], [lx, ly]], { nm, w: 4, k: kA, a, glow: 0.6 });
    ray(g, [[lx, ly], [rx, yEnd]], { nm, w: 4, k: kB, a, glow: 0.6 });
  }
}
const WALL = 92;
/** Giác mạc sáng lên (cung bao ngoài). */
function corneaGlow(g, c, e) {
  if (e <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter'; g.lineCap = 'round';
  for (const [w, al] of [[16, 0.10], [7, 0.55]]) { g.strokeStyle = `rgba(246,242,234,${al * e})`; g.lineWidth = w;
    g.beginPath(); g.arc(c.cx - 0.62 * c.R, c.cy, 0.46 * c.R + 4, Math.PI - 1.05, Math.PI + 1.05); g.stroke(); }
  g.restore();
}
function lensGlow(g, c, thick, e) {
  if (e <= 0) return;
  const lw = c.R * (0.12 + 0.07 * clamp(thick)), lh = c.R * 0.36;
  g.save(); g.globalCompositeOperation = 'lighter';
  for (const [w, al] of [[14, 0.10], [6, 0.5]]) { g.strokeStyle = `rgba(246,242,234,${al * e})`; g.lineWidth = w; g.beginPath(); g.ellipse(c.cx - 0.66 * c.R, c.cy, lw + 4, lh + 4, 0, 0, TAU); g.stroke(); }
  g.restore();
}
/** Nhóm trượt ra (rời khung bằng chuyển động): vẽ khi t ∈ [a, b + 0.5]; dx < 0 trượt trái, dx > 0 trượt phải. */
function slide(g, t, a, b, draw, dx = -1200) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.5)); if (o >= 1) return;
  g.save(); g.globalAlpha = 1 - o; draw(); g.restore();
}
/** Khung zoom tròn: hàng tế bào que (nằm ngang, ánh sáng tới từ trái), nón thay vài hàng. kr: que hiện dần; kc: nón. */
function cells(g, cx, cy, r, kr, kc) {
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.fillStyle = 'rgba(20,19,23,0.92)'; g.fill(); g.clip();
  const N = 12, step = (2 * r - 40) / N;
  for (let i = 0; i < N; i++) {
    const y = cy - r + 36 + i * step, ki = clamp(kr * (N + 3) - i), cone = i % 6 === 2;
    if (ki <= 0) continue;
    const x0 = cx - 130, len = 260 * outCubic(ki);
    g.fillStyle = 'rgba(237,232,223,0.55)'; g.beginPath(); g.roundRect(x0, y - 8, len, 16, 8); g.fill();
    if (cone && kc > 0) {                                              // nón: thon dần về một đầu, sáng hơn
      const e = outBack(clamp(kc)); g.fillStyle = 'rgba(237,232,223,0.95)'; g.strokeStyle = 'rgba(11,11,14,0.9)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(x0, y - 16 * e); g.lineTo(x0 + 190, y - 5 * e); g.lineTo(x0 + 250, y - 3); g.lineTo(x0 + 250, y + 3); g.lineTo(x0 + 190, y + 5 * e); g.lineTo(x0, y + 16 * e); g.closePath(); g.fill(); g.stroke();
    }
  }
  g.restore();
  g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke(); g.restore();
}

export default class Kamera {
  static ERA = 'eye';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2-kamera');
    this.START = L(115).start;
    this.FROM = Math.max(this.START - 1.2, L(114).end + 0.5);
    this.T = {
      l115: L(115).start, sanbun: w(115, '3分の2'),
      l116: L(116).start, suisho: w(116, '水晶'), pinto: w(116, 'ピント'), moumaku: w(116, '網膜'),
      l117: L(117).start, kantai: w(117, '桿体'), oku: w(117, '1億個'),
      l118: L(118).start, suitai: w(118, '錐体'), man: w(118, '500万個'), end118: L(118).end,
      l119: L(119).start, tai119: w(119, '錐体'), mijikai: w(119, '短い'), chu: w(119, '中'), naga: w(119, '長い'),
      l120: L(120).start, aka: w(120, '赤'), ougo: w(120, '黄緑'),
      l121: L(121).start, ringo: w(121, 'リンゴ'), tsuyoku: w(121, '強く'), sukoshi: w(121, '少し'),
      l122: L(122).start, kurabete: w(122, '比べて'), end: L(122).end,
    };
    this.T.shrink = this.T.end118 - 0.1;
    must(`${SIG.L > SIG.M && SIG.M > SIG.S && SIG.S < 0.2 * SIG.L}`, true);        // L mạnh, M ít, S ≈ 0
    must(`'${CONES.S},${CONES.M},${CONES.L}'`, '420,534,564');
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.l115 + 0.1, 'beam', -4),                  // chùm vào mắt
      cue(T.sanbun, 'glass', -6),                       // 「角膜…3分の2」
      cue(T.sanbun + 2.4, 'step', -4),                // tia tới thuỷ tinh thể
      cue(T.suisho - 0.1, 'glass', -4),               // thuỷ tinh thể
      cue(T.suisho + 0.5, 'telop', -3),               // 「水晶体」
      cue(T.pinto + 0.7, 'step', -4),                 // điểm hội tụ rơi đúng võng mạc
      cue(T.moumaku, 'beam', -8),                     // 「網膜」
      cue(T.kantai - 0.1, 'wave', -10),               // khung tế bào + 「桿体細胞」
      cue(T.suitai + 0.1, 'step', -3),                   // 「錐体細胞」
      cue(T.shrink + 0.1, 'beam', -8),                // mắt thu nhỏ
      cue(T.mijikai, 'step', -3), cue(T.naga, 'step', -3),   // đường S và L (M im: sàn tiếng)
      cue(T.l120 + 0.4, 'step', -6),                  // 「Lは赤のセンサー」 hiện
      cue(T.aka + 0.5, 'fail', -4),                   // gạch 「Lは赤」 (「黄緑」 cùng khoảnh khắc — một tiếng)
      cue(T.ougo + 0.5, 'step', -6),                  // vạch dọc ở 564 nm (黄緑)
      cue(T.tsuyoku, 'step', -3), cue(T.sukoshi, 'step', -3),    // ba thanh
      cue(T.kurabete, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'eye');
    const u = smooth(prog(t, T.shrink, T.shrink + 0.8));
    const c = { cx: lerp(BIG.cx, SMALL.cx, u), cy: lerp(BIG.cy, SMALL.cy, u), R: lerp(BIG.R, SMALL.R, u) };
    aperture(g, 'pupil', { y: c.cy, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, '目というカメラ', t, F + 0.3);

    // độ dày thuỷ tinh thể: 0.5 → 0.2 → 0.8 → 0.5 (đúng ピント)
    const a0 = T.suisho, a1 = Math.max(a0 + 1.4, T.pinto - 0.2);
    const thick = lerp(lerp(lerp(0.5, 0.2, smooth(prog(t, a0, a0 + 0.6))), 0.8, smooth(prog(t, a0 + 0.7, a1))), 0.5, smooth(prog(t, a1 + 0.1, T.pinto + 0.7)));
    const retLit = smooth(prog(t, T.moumaku, T.moumaku + 0.6));
    const ke = smooth(prog(t, F + 0.1, F + 0.9));
    eye(g, c.cx, c.cy, c.R, { k: ke, thick, lit: retLit });

    // ── tia: A (giác mạc → thuỷ tinh thể) từ 115, B (→ võng mạc) từ 116; từ 121 ánh của táo (650 nm) thay ánh trắng ──
    const kA = outCubic(prog(t, T.l115, T.l115 + 1.5)), kB = prog(t, T.suisho, T.suisho + 0.9);
    const ap = smooth(prog(t, T.ringo - 0.1, T.ringo + 0.7));
    if (ap < 1) eyeRays(g, c, { kA, kB, thick, a: 0.8 * (1 - ap) });
    if (ap > 0) eyeRays(g, c, { kA, kB, thick, nm: 650, a: 0.85 * ap });
    corneaGlow(g, c, smooth(prog(t, T.sanbun, T.sanbun + 0.4)) * (1 - smooth(prog(t, T.suisho - 0.3, T.suisho + 0.3))));
    lensGlow(g, c, thick, smooth(prog(t, T.suisho, T.suisho + 0.4)) * (1 - smooth(prog(t, T.moumaku - 0.3, T.moumaku + 0.2))));

    // ═════ mắt lớn: nhãn bên trái (角膜, 水晶体) và bên phải (網膜, tế bào) ═════
    const out = T.shrink - 0.1;
    slide(g, t, T.sanbun - 0.1, out, () => {                                   // 角膜
      telop(g, '角膜', 140, 330, prog(t, T.sanbun, T.sanbun + 0.7), { size: 56, mincho: true });
      telop(g, '曲げる仕事のおよそ3分の2', 140, 388, prog(t, T.sanbun + 0.3, T.sanbun + 1.3), { size: 36 });
      arrow(g, [[500, 402], [668, 438]], prog(t, T.sanbun + 0.5, T.sanbun + 1.1), { color: '@dim', w: 4, head: 14 });
    });
    slide(g, t, T.suisho - 0.1, out, () => {                                   // 水晶体
      telop(g, '水晶体', 140, 730, prog(t, T.suisho + 0.5, T.suisho + 1.2), { size: 56, mincho: true });
      telop(g, '厚みを変えてピント', 140, 788, prog(t, T.suisho + 0.8, T.suisho + 1.8), { size: 36 });
      arrow(g, [[470, 740], [768, 668]], prog(t, T.suisho + 0.9, T.suisho + 1.5), { color: '@dim', w: 4, head: 14 });
    });
    slide(g, t, T.moumaku - 0.1, out, () => {                                  // 網膜（スクリーン）
      telop(g, '網膜（スクリーン）', 1400, 346, prog(t, T.moumaku, T.moumaku + 1.0), { size: 44, mincho: true });
      arrow(g, [[1388, 336], [1262, 330]], prog(t, T.moumaku + 0.4, T.moumaku + 0.9), { color: '@dim', w: 4, head: 14 });
    }, 1200);
    // khung zoom tròn bên phải: 桿体 (117) rồi 錐体 (118)
    slide(g, t, T.l117 - 0.1, out, () => {
      const kf = outCubic(prog(t, T.l117 + 0.1, T.l117 + 0.8));
      const rp = [1323, 475];                                                    // điểm võng mạc được phóng to
      g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 3; g.globalAlpha = kf;
      g.beginPath(); g.moveTo(rp[0], rp[1]); g.lineTo(1470, 545); g.moveTo(rp[0], rp[1]); g.lineTo(1480, 765); g.stroke();
      g.strokeStyle = ink('@ink'); g.lineWidth = 4; g.beginPath(); g.arc(rp[0], rp[1], 14, 0, TAU); g.stroke(); g.restore();
      if (kf > 0) cells(g, 1610, 650, 170 * kf, prog(t, T.l117 + 0.5, T.l117 + 1.8), prog(t, T.suitai, T.suitai + 0.7));
      telop(g, '桿体細胞：およそ1億個（暗いところ）', 1820, 905, prog(t, T.kantai + 0.5, T.kantai + 1.6), { size: 36, align: 'right' });
      telop(g, '錐体細胞：およそ500万個（色）', 1820, 968, prog(t, T.suitai, T.suitai + 1.0), { size: 36, align: 'right' });
    }, 1200);

    // ═════ mắt nhỏ: đồ thị đường nhạy S / M / L (119–121) ═════
    const kStrip = prog(t, T.tai119 - 0.1, T.tai119 + 1.1);
    if (kStrip > 0) {
      spectrumStrip(g, CX0, CY, CW, CH, { k: kStrip, ticks: [400, 500, 600, 700], labelUnit: false });
      if (kStrip >= 1) write(g, 'nm', CX0 + CW + 14, CY + CH + 48, 1, { font: `500 28px "Noto Sans JP"`, color: '@dim' });
      // phản xạ của táo phủ lên dải: chỗ táo KHÔNG phản xạ tối đi, chỉ còn dải dài sáng (121)
      const km = smooth(prog(t, T.ringo, T.ringo + 1.2));
      if (km > 0) { g.save(); for (let px = 0; px < CW; px += 2) { const nm = 380 + px / CW * 400, r = (APPLE(nm) - 0.025) / 0.72;
        g.fillStyle = `rgba(11,11,14,${0.9 * km * (1 - clamp(r * 1.0))})`; g.fillRect(CX0 + px, CY, 2.4, CH); } g.restore(); }
    }
    telop(g, '感度（模式図）', CX0, 338, prog(t, T.tai119, T.tai119 + 0.8), { size: 30, weight: 500, color: '@dim' });
    const dim = 1 - 0.55 * smooth(prog(t, T.ringo, T.ringo + 0.8));
    const curve = (key, t0, dash, col, lab, lx, ly, align = 'center') => {
      const k = prog(t, t0, t0 + 1.1); if (k <= 0) return;
      const P = polyAt(380, 780, nm => sens(nm, CONE[key]));
      g.save(); g.globalAlpha = dim; g.beginPath(); g.rect(CX0 - 4, 200, (CW + 8) * k, 700); g.clip();
      g.strokeStyle = ink(col); g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash(dash);
      g.beginPath(); P.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.stroke(); g.restore();
      const kc = prog(t, t0 + 0.6, t0 + 1.1);
      chip(g, X(CONE[key][0]), PEAK_Y, CONE[key][0], 11, kc);
      g.save(); g.globalAlpha = dim; telop(g, lab, lx, ly, prog(t, t0 + 0.2, t0 + 1.0), { size: 32, align }); g.restore();
    };
    curve('S', T.mijikai - 0.1, [3, 11], '@dim', '短い波長（S）', X(CONES.S), 452);
    curve('M', T.chu - 0.1, [20, 11], '@dim', '中くらい（M）', 1010, 398);
    curve('L', T.naga - 0.1, [], '@ink', '長い波長（L）', 1172, 452, 'left');

    // 120: gạch 「Lは赤のセンサー」 → 「いちばん感じるのは黄緑」 + vạch dọc ở 564
    slide(g, t, T.l120 - 0.1, T.tsuyoku - 0.2, () => {
      const bw = wrong(g, 'Lは赤のセンサー', 1180, 262, prog(t, T.l120 + 0.3, T.l120 + 1.1), { size: 44 });
      strike(g, bw, prog(t, T.aka + 0.4, T.aka + 0.8));
      telop(g, 'いちばん感じるのは黄緑', 1180, 340, prog(t, T.ougo - 0.1, T.ougo + 1.0), { size: 48, mincho: true });
      const kl = prog(t, T.ougo, T.ougo + 0.7);
      if (kl > 0) { g.save(); g.strokeStyle = ink('@ink'); g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(X(CONES.L), CY - 6); g.lineTo(X(CONES.L), CY - 6 - (CY - 6 - 505) * kl); g.stroke(); g.restore(); }
    });

    // 121: ba thanh tín hiệu của táo; 122: ba thanh → đầu
    const kbar = k0 => outCubic(prog(t, k0, k0 + 0.7));
    const bt = { S: T.ringo + 0.4, M: T.sukoshi, L: T.tsuyoku };
    if (t >= T.ringo) {
      telop(g, 'リンゴの光への反応', 1450, 208, prog(t, T.ringo, T.ringo + 0.9), { size: 30, weight: 500, color: '@dim' });
      telop(g, 'リンゴが跳ね返す光', 1740, 950, prog(t, T.ringo + 0.2, T.ringo + 1.0), { size: 30, weight: 500, color: '@dim', align: 'right' });
      g.save(); g.strokeStyle = ink('@faint'); g.lineWidth = 3; g.beginPath(); g.moveTo(1420, BAR_BASE + 1); g.lineTo(1650, BAR_BASE + 1); g.stroke(); g.restore();
      for (const [key, x] of BARS) {
        const h = BAR_H * SIG[key] * kbar(bt[key]);
        if (h > 0) { g.fillStyle = key === 'L' ? ink('@ink') : ink('@dim'); g.beginPath(); g.roundRect(x - 28, BAR_BASE - Math.max(h, 1), 56, Math.max(h, 1), 4); g.fill(); }
        chip(g, x, BAR_BASE + 24, CONES[key], 10, prog(t, bt[key], bt[key] + 0.5));
      }
    }
    const kh = prog(t, T.l122, T.l122 + 0.7);
    head(g, 1670, 600, 70, kh);
    BARS.forEach(([key, x], i) => arrow(g, [[x, BAR_BASE + 50], [1670 + (i - 1) * 40, 520]], prog(t, T.kurabete - 0.1 + i * 0.2, T.kurabete + 0.6 + i * 0.2), { color: '@dim', w: 4, head: 14 }));
    telop(g, '脳は、3つの信号を比べている', 140, 965, prog(t, T.kurabete, T.kurabete + 1.2), { size: 44 });
  }
}
