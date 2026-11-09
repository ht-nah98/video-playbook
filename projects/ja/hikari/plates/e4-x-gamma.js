// e4 · エックス線とガンマ線 (p2 câu 74–84) — ERA darkroom. Cuối hồi 4.
//  Nửa 1 (74–77): thước ĐỖ (y 846) như e2/e3; dấu dải → X線 (bàn tay: mô mềm mờ, xương đặc) → ガンマ線 (thanh so 数十万〜100万倍) → 医療.
//  Nửa 2 (78–84): thước nâng lên y 600 (trạng thái e1), mọi dải sáng lần lượt phải → trái; chỉ khe thấy được sáng (dim 0 → 1);
//  LAO VÀO KHE (câu 80, ngoại lệ DNA §7, viết trong cảnh, KHÔNG dùng zoom()): R nội suy log độ phóng sao cho cuối cùng
//  rulerX(380e-9) = 240, rulerX(780e-9) = 1680; khe thành dải 380–780 rộng 1440 (khớp spectrumStrip(240, y, 1440, h)).
//  Rồi: phổ Mặt Trời (Planck 5772 K) + khí quyển trong suốt + 分子; UV (trái) / IR (phải) ngoài khung; khung 「窓」.
// Sóng/tia không thấy được: nét trung tính. Nhãn thước chỉ khi chưa lao (nhãn xa ngoài khung làm safeBox ném lỗi).
import { BANDS, RULER4, VIS, HC, C, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, specRuler, rulerX, spot, ink, write,
  pow10, wlCss, ray, telop, wrong, title, arrow, cross, cue, W, H, TAU } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const BAND = Object.fromEntries(BANDS.map(b => [b.key, b]));
BAND.radio = { ...BAND.radio, hi: 1e4 };
const bxR = (key, R) => [rulerX(BAND[key].lo, R), rulerX(BAND[key].hi, R)];
const FRAC = Math.log10(780 / 380) / (RULER4.top - RULER4.bot);      // phần bề rộng khe thấy được trên CHÍNH thước này
/** Dấu dải (dùng chung G5, chép giống hệt vào e2/e3/e4; ở e4 thêm y/h/R và thời gian trượt riêng từng chặng): khung 生成り 3 px bao đúng
 * dải [X(lo), X(hi)] của BANDS, trượt (smooth) giữa các dải. stops: [[giờ, key, dur?], …]. */
function bandMark(g, t, stops, a = 1, y = 846, h = 48, R = RULER4) {
  let i = 0; for (let j = 0; j < stops.length; j++) if (t >= stops[j][0]) i = j;
  const cur = bxR(stops[i][1], R), prev = bxR(stops[Math.max(0, i - 1)][1], R), u = i ? smooth(clamp((t - stops[i][0]) / (stops[i][2] ?? 0.6))) : 1;
  const x0 = lerp(prev[0], cur[0], u), x1 = lerp(prev[1], cur[1], u);
  if (a > 0) {
    g.save(); g.fillStyle = `rgba(237,232,223,${0.08 * a})`; g.fillRect(x0, y - 8, x1 - x0, h + 16);
    g.strokeStyle = `rgba(237,232,223,${a})`; g.lineWidth = 3; g.strokeRect(x0, y - 8, x1 - x0, h + 16); g.restore();
  }
  return [x0, x1];
}
function grp(g, t, a, b, draw, dx = -1900) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.55)); if (o >= 1) return;
  g.save(); g.beginPath(); g.rect(96, 196, W - 96, 800); g.clip(); g.translate(dx * o, 0); draw(); g.restore();
}
const stroke = (g, col = '@ink', w = 4) => { g.strokeStyle = ink(col); g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };

/** Phổ Mặt Trời (Planck 5772 K, tương đối), λ nm. */
const planck = (nm, T = 5772) => { const l = nm * 1e-9; return 1 / (l ** 5 * (Math.exp(0.014388 / (l * T)) - 1)); };
// bàn tay nằm ngang (ngón chỉ sang phải), nét trung tính: mô mềm mờ, xương đặc
const HX = 1020, HY = [440, 500, 560, 620];                      // y từng ngón (tâm xương = HY + 23)
const FING = [250, 290, 270, 210];
function hand(g, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k * 1.5);
  g.fillStyle = 'rgba(154,149,140,0.13)'; stroke(g, '@faint', 4);
  g.beginPath(); g.roundRect(HX, 420, 300, 250, 44); g.fill(); g.stroke();
  HY.forEach((y, i) => { g.beginPath(); g.roundRect(HX + 290, y, FING[i], 46, 23); g.fill(); g.stroke(); });
  g.beginPath(); g.roundRect(HX + 40, 660, 170, 60, 30); g.fill(); g.stroke();
  stroke(g, '@ink', 5);
  HY.forEach((y, i) => { const yy = y + 23, x1 = HX + 290 + FING[i] - 26; g.beginPath(); g.moveTo(HX + 20, yy); g.lineTo(x1, yy); g.stroke();
    for (const x of [HX + 310, HX + 290 + FING[i] * 0.55]) { g.beginPath(); g.arc(x, yy, 7, 0, TAU); g.stroke(); } });
  g.restore();
}

export default class XGamma {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e4-x-gamma');
    this.START = L(74).start;
    this.FROM = Math.max(this.START - 1.2, L(73).end + 0.5);
    const S = i => L(i).start;
    this.T = {
      l74: S(74), x: w(74, 'x線'), kinniku: w(74, '筋肉'), toorinuke: w(74, '通り抜け'), hone: w(74, '骨'),
      l75: S(75), gam75: w(75, 'ガンマ'),
      l76: S(76), gam76: w(76, 'ガンマ線'), man: w(76, '数十万倍'), hyaku: w(76, '100万倍'),
      l77: S(77), iryo: w(77, '医療'), nerai: w(77, 'ねらい撃ち'),
      l78: S(78), denpa: w(78, '電波'), gam78: w(78, 'ガンマ'), hacho: w(78, '波長'),
      l79: S(79), hiroi: w(79, '広い'), hosoi: w(79, '細い'),
      l80: S(80), naze: w(80, 'なぜ'),
      l81: S(81), taiyo: w(81, '太陽'), kuki: w(81, '空気'),
      l82: S(82), bunshi: w(82, '分子'),
      l83: S(83), uv: w(83, '紫外線'), ir: w(83, '赤外線'),
      l84: S(84), mado: w(84, '窓'), end: L(84).end,
    };
    const T = this.T;
    // số lên hình
    must(`'${(FRAC * 100).toFixed(0)}'`, '2');
    let pk = 380; for (let n = 380; n <= 780; n++) if (planck(n) > planck(pk)) pk = n;
    this.pk = pk; this.pmax = planck(pk);
    must(`${pk > 380 && pk < 780 && Math.abs(pk - 2.898e6 / 5772) < 2}`, true);   // đỉnh phổ Mặt Trời (Wien) nằm TRONG khe
    // dấu dải nửa 1: ở 紫外線 (cuối e3) → X線 → ガンマ線; nửa 2: quét phải → trái qua mọi dải một lượt
    const sw0 = T.denpa - 0.05, sw1 = T.gam78 + 0.1, ds = (sw1 - sw0) / 6;
    this.marks1 = [[-1e9, 'uv'], [T.x - 0.1, 'x'], [T.gam75 - 0.1, 'gamma']];
    this.marks2 = ['radio', 'micro', 'ir', 'vis', 'uv', 'x', 'gamma'].map((k, i) => [sw0 + i * ds, k, Math.min(0.6, ds * 0.9)]);
    this.sweep = [sw0, sw1];
    // lao vào khe: [z0, z1]
    this.z0 = T.naze - 0.05; this.z1 = this.z0 + 1.2;
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.x - 0.1, 'step'), cue(T.kinniku, 'step', -4), cue(T.toorinuke, 'wave', -8), cue(T.hone, 'telop', -3),
      cue(T.gam75, 'telop', -3),
      cue(T.gam76, 'beam', -4), cue(T.man, 'telop'),
      cue(T.iryo - 0.8, 'telop'), cue(T.iryo + 2.0, 'step', -6), cue(T.nerai + 0.2, 'step', -4),
      cue(this.sweep[0], 'spectrum', -3), cue(T.gam78 + 0.5, 'step', -4), cue(T.hacho, 'telop'),
      cue(T.hiroi, 'step', -4), cue(T.hosoi, 'beam', -4), cue(T.l79 + 3.0, 'step', -6),
      cue(this.z0, 'wave'),
      cue(T.taiyo - 0.1, 'tick', -3), cue(T.taiyo + 0.5, 'beam', -4), cue(T.kuki, 'glass', -8), cue(T.kuki + 2.2, 'step', -6),
      cue(T.bunshi, 'telop'),
      cue(T.uv, 'telop', -3), cue(T.ir, 'tick', -3),
      cue(T.l84 - 1.5, 'step', -6), cue(T.mado, 'aha', -4),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'slit', { y: 360, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, 'エックス線とガンマ線', t, F + 0.3);
    const phase2 = t >= T.l78 - 0.1;
    // ───────────── nửa 1: thước đỗ ─────────────
    if (!phase2) {
      specRuler(g, { y: 846, h: 48, window: 1, top: 4 });
      bandMark(g, t, this.marks1, smooth(prog(t, F + 0.4, F + 1.0)));
      // 74 bàn tay X
      grp(g, t, T.l74 - 0.2, T.l75 - 0.05, () => {
        telop(g, 'やわらかい部分は通り抜け', 140, 330, prog(t, T.toorinuke - 0.8, T.toorinuke + 0.8), { size: 48 });
        telop(g, '骨には吸収', 140, 410, prog(t, T.hone, T.hone + 0.7), { size: 52, mincho: true });
        hand(g, prog(t, T.kinniku - 0.1, T.kinniku + 0.7));
        const ka = prog(t, T.kinniku + 0.3, T.toorinuke + 0.4);
        // tia X (nét trung tính): hai đường xuyên qua mô mềm, hai đường dừng ở đầu xương
        arrow(g, [[780, 493], [1800, 493]], outCubic(ka), { color: '@ink', w: 4, head: 14 });
        arrow(g, [[780, 553], [1800, 553]], outCubic(ka), { color: '@ink', w: 4, head: 14 });
        const kb = prog(t, T.hone - 0.3, T.hone + 0.6);
        arrow(g, [[780, 523], [HX + 6, 523]], outCubic(kb), { color: '@dim', w: 4, head: 14 });
        arrow(g, [[780, 583], [HX + 6, 583]], outCubic(kb), { color: '@dim', w: 4, head: 14 });
        if (kb >= 1) { cross(g, HX + 34, 523, 9, 1, { w: 4 }); cross(g, HX + 34, 583, 9, 1, { w: 4 }); }
      });
      // 75 ガンマ線 (ngắn nhất)
      grp(g, t, T.l75, T.l76 + 0.3, () => telop(g, 'ガンマ線', 140, 330, prog(t, T.gam75, T.gam75 + 0.8), { size: 84, mincho: true }));
      // 76 so năng lượng
      grp(g, t, T.l75 + 0.6, T.l77 - 0.15, () => {
        telop(g, '目に見える光の、数十万〜100万倍のエネルギー', 140, 400, prog(t, T.man - 0.6, T.hyaku + 0.6), { size: 48 });
        const k1 = prog(t, T.l75 + 0.9, T.l75 + 1.6), k2 = outCubic(prog(t, T.gam76, T.gam76 + 1.2));
        g.save(); g.fillStyle = ink('@ink'); g.fillRect(140, 460, 44 * k1, 40); g.restore();
        telop(g, '目に見える光の光子', 210, 494, k1, { size: 36, weight: 500, color: '@dim' });
        const bw = 1640 * k2;
        g.save(); g.fillStyle = ink('@ink'); g.fillRect(140, 580, bw, 40);
        if (k2 > 0.5) { g.fillStyle = C.room; g.beginPath(); g.moveTo(880, 576); g.lineTo(930, 576); g.lineTo(900, 624); g.lineTo(850, 624); g.closePath(); g.fill(); }
        g.restore();
        telop(g, 'ガンマ線の光子', 140, 680, prog(t, T.gam76, T.gam76 + 0.8), { size: 40 });
      });
      // 77 医療
      grp(g, t, T.l77 - 0.1, T.l78 - 0.7, () => {
        telop(g, '医療：がん細胞をねらい撃ち', 140, 330, prog(t, T.iryo, T.iryo + 1.0), { size: 56, mincho: true });
        const kc = prog(t, T.iryo + 0.3, T.iryo + 1.0), kk = outCubic(prog(t, T.nerai - 0.3, T.nerai + 0.6));
        g.save(); g.globalAlpha = kc; stroke(g, '@dim', 4);
        for (const [dx, dy] of [[-44, -30], [40, -40], [-52, 34], [48, 30], [0, 70], [0, -75]]) { g.beginPath(); g.arc(1300 + dx, 520 + dy, 30, 0, TAU); g.stroke(); }
        stroke(g, '@ink', 6); g.beginPath(); g.arc(1300, 520, 34, 0, TAU); g.stroke(); g.restore();
        [[820, 300], [820, 420], [820, 520], [820, 640], [820, 740]].forEach(([x, y], i) => arrow(g, [[x, y], [1255, 520 + (y - 520) * 0.08]], kk, { color: '@ink', w: 4, head: 13 }));
      });
    }
    // ───────────── nửa 2: thước y 600, mọi dải, lao vào khe ─────────────
    if (phase2) {
      const up = smooth(prog(t, T.l78, T.l78 + 1.0)), ez = smooth(clamp((t - this.z0) / (this.z1 - this.z0)));
      const f380 = (Math.log10(380e-9) - RULER4.bot) / (RULER4.top - RULER4.bot), s0 = RULER4.x1 - RULER4.x0, s1 = 1440 / FRAC;
      const va0 = rulerX(380e-9, RULER4), s = Math.exp(lerp(Math.log(s0), Math.log(s1), ez)), va = lerp(va0, 240, ez), x0 = va - f380 * s;
      const R = { x0, x1: x0 + s, top: RULER4.top, bot: RULER4.bot };
      const y = lerp(lerp(846, 600, up), 560, ez), h = lerp(lerp(48, 64, up), 120, ez);
      const dim = smooth(prog(t, T.l79 + 0.8, T.hosoi + 0.6));
      const lab = ez > 0 ? 0 : prog(t, T.l78 + 0.3, T.l78 + 1.0);
      specRuler(g, { y, h, window: 1, dim, labels: lab, pows: lab, R });
      // dấu dải quét phải → trái (nửa đầu 78), rồi tắt
      const ma = (1 - smooth(prog(t, this.sweep[1] + 0.4, this.sweep[1] + 1.1)));
      if (ma > 0 && ez === 0) bandMark(g, t, this.marks2, ma, y, h, R);
      // 78
      grp(g, t, T.l78 - 0.1, T.l79 - 0.15, () => {
        telop(g, '電波からガンマ線まで、すべて同じ電磁波', 960, 430, prog(t, T.denpa, T.gam78 + 1.2), { size: 52, align: 'center' });
        telop(g, 'ちがうのは、波長だけ', 960, 510, prog(t, T.hacho, T.hacho + 0.9), { size: 60, mincho: true, align: 'center' });
      });
      // 79: chỉ còn khe sáng — chữ đi theo lời, thước chìm dần
      if (t >= T.l79 - 0.1 && ez < 1) {
        const o = outCubic(clamp((t - this.z0 + 0.2) / 0.5));
        g.save(); g.translate(0, 320 * o);
        telop(g, 'この広い帯の中で、', 960, 790 + 0, prog(t, T.hiroi, T.hiroi + 0.9), { size: 44, align: 'center', color: '@dim' });
        telop(g, '目に見えるのは、ほんの細いすき間だけ', 960, 870, prog(t, T.hosoi - 0.8, T.hosoi + 1.2), { size: 48, align: 'center' });
        telop(g, `この目盛りの上で、およそ${(FRAC * 100).toFixed(0)}%`, 960, 940, prog(t, T.hosoi + 1.0, T.hosoi + 1.8), { size: 36, weight: 500, color: '@dim', align: 'center' });
        g.restore();
      }
      // sau khi dừng: dải 380–780 nm đầy khung
      if (ez >= 1) {
        const ek = prog(t, this.z1, this.z1 + 0.4);
        for (const nm of [400, 500, 600, 700]) { const x = 240 + (nm - 380) / 400 * 1440; g.save(); g.globalAlpha = ek; g.fillStyle = ink('@dim'); g.fillRect(x - 1, y + h + 4, 2, 12); g.restore();
          write(g, String(nm), x, y + h + 48, ek, { font: '500 28px "Noto Sans JP"', color: '@dim', align: 'center' }); }
        write(g, 'nm', 1694, y + h + 48, ek, { font: '500 28px "Noto Sans JP"', color: '@dim' });
      }
      grp(g, t, this.z1 - 0.1, T.l81 - 0.25, () => telop(g, 'なぜ、このすき間？', 960, 300, prog(t, this.z1 - 0.1, this.z1 + 0.6), { size: 64, mincho: true, align: 'center' }));
      const X = nm => 240 + (nm - 380) / 400 * 1440;
      // 81: phổ Mặt Trời + khí quyển trong suốt
      grp(g, t, T.l81 - 0.1, T.l82 - 0.15, () => {
        const kc = prog(t, T.taiyo, T.taiyo + 1.6), pts = [];
        for (let nm = 380; nm <= 780; nm += 8) pts.push([X(nm), 540 - 230 * planck(nm) / this.pmax]);
        ray(g, pts, { nm: 'white', w: 5, k: kc, a: 0.95 });
        telop(g, '太陽の光が、いちばん強い', 960, 250, prog(t, T.taiyo, T.taiyo + 1.1), { size: 48, align: 'center' });
        const ks = prog(t, T.kuki - 0.1, T.kuki + 0.6);
        g.save(); g.globalAlpha = ks; g.fillStyle = 'rgba(154,149,140,0.14)'; g.fillRect(240, 770, 1440, 50); stroke(g, '@faint', 3); g.setLineDash([10, 12]); g.strokeRect(240, 770, 1440, 50); g.restore();
        telop(g, '空気も、よく通す', 960, 900, prog(t, T.kuki, T.kuki + 0.9), { size: 48, align: 'center' });
      });
      // 82
      grp(g, t, T.l82 - 0.1, T.l83 - 0.15, () => telop(g, '分子の形を、こわさずに変えられる強さ', 960, 900, prog(t, T.bunshi - 0.2, T.bunshi + 1.4), { size: 48, align: 'center' }));
      // 83: hai mép ngoài khung
      grp(g, t, T.l83 - 0.1, T.l84 - 0.15, () => {
        telop(g, '紫外線：分子が傷つく', 140, 900, prog(t, T.uv, T.uv + 1.0), { size: 40 });
        arrow(g, [[190, 850], [190, 710]], prog(t, T.uv, T.uv + 0.8), { color: '@dim', w: 5, head: 14 });
        telop(g, '赤外線：体の熱の光に埋もれる', 1780, 900, prog(t, T.ir, T.ir + 1.2), { size: 40, align: 'right' });
        arrow(g, [[1730, 850], [1730, 710]], prog(t, T.ir, T.ir + 0.8), { color: '@dim', w: 5, head: 14 });
      });
      // 84: khung 「窓」
      if (t >= T.l84 - 0.1) {
        const kf = prog(t, T.mado - 0.3, T.mado + 0.6);
        if (kf > 0) { spot(g, 960, y + h / 2, 560, { a: 0.10 * kf, sy: 0.3 });
          g.save(); g.strokeStyle = `rgba(237,232,223,${kf})`; g.lineWidth = 5; g.strokeRect(240 - 16, y - 18, 1440 + 32, h + 36); g.restore(); }
        telop(g, '目は、この『窓』に合わせて進化したと考えられている', 960, 900, prog(t, T.l84 + 0.2, T.mado + 0.8), { size: 56, mincho: true, align: 'center' });
      }
    }
  }
}
