// e2 · 電波とマイクロ波 (p2 câu 62–68) — ERA darkroom, thước ĐỖ (y 846, window 1) suốt cảnh; dấu dải trượt giữa các dải của BANDS.
//  62 電波: dấu → 電波, sóng dài trung tính, 電波時計 5〜7.5 km · 63 マイクロ波: Wi-Fi / スマートフォン / 電子レンジ
//  64 lò vi sóng mặt cắt, E đảo chiều 24億5000万回 · 65 phân tử nước quay theo E → nhiệt · 66 gạch 「水だけを狙った周波数」
//  67 nóng từ bề mặt vào · 68 Wi-Fi 2.4 GHz vs lò 2.45 GHz — cùng dải (Wi-Fi chập chờn)
// Mọi sóng KHÔNG thấy được vẽ nét trung tính (≥ 4 px, không 'lighter', không quầng). Chữ chỉ qua telop/wrong/title.
import { C, BANDS, RULER4, LAMBDA, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, specRuler, rulerX, ink, telop, wrong, strike, title,
  arrow, cross, cue, W, TAU } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const RP = { y: 846, h: 48 };                                     // thước đỗ (BRIEF: e2–e4)
const R4 = RULER4;                                                 // thước kéo tới 10⁴ m để chứa 5–7.5 km
const BAND = Object.fromEntries(BANDS.map(b => [b.key, b]));
BAND.radio = { ...BAND.radio, hi: 1e4 };                           // 電波 (phần dài hơn 1 m; マイクロ波 là dải con 1 mm–1 m)
const bx = key => [rulerX(BAND[key].lo, R4), rulerX(BAND[key].hi, R4)];
const MARK_DUR = 0.6;

/** Dấu dải (dùng chung G5, chép giống hệt vào e2/e3/e4): khung 生成り 3 px bao đúng dải [X(lo), X(hi)] của BANDS, trượt (smooth) giữa các dải.
 * stops: [[giờ, key], …] — mục đầu là vị trí ban đầu; a: độ hiện. Trả về [x0, x1] hiện tại. */
function bandMark(g, t, stops, a = 1) {
  let i = 0; for (let j = 0; j < stops.length; j++) if (t >= stops[j][0]) i = j;
  const cur = bx(stops[i][1]), prev = bx(stops[Math.max(0, i - 1)][1]), u = i ? smooth(clamp((t - stops[i][0]) / MARK_DUR)) : 1;
  const x0 = lerp(prev[0], cur[0], u), x1 = lerp(prev[1], cur[1], u);
  if (a > 0) {
    g.save(); g.fillStyle = `rgba(237,232,223,${0.08 * a})`; g.fillRect(x0, RP.y - 8, x1 - x0, RP.h + 16);
    g.strokeStyle = `rgba(237,232,223,${a})`; g.lineWidth = 3; g.strokeRect(x0, RP.y - 8, x1 - x0, RP.h + 16); g.restore();
  }
  return [x0, x1];
}
/** Sóng trung tính (không thấy được): nét '@ink' ≥ 4 px, KHÔNG lighter, không quầng; k quét trái → phải. */
function nwave(g, x0, x1, y, lam, amp, k, ph, { col = '@ink', a = 1, w = 4 } = {}) {
  if (k <= 0) return;
  const xe = x0 + (x1 - x0) * clamp(k);
  g.save(); g.strokeStyle = ink(col); g.globalAlpha = a; g.lineWidth = Math.max(4, w); g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  for (let x = x0; x <= xe; x += 3) { const yy = y - Math.sin((x - x0) / lam * TAU - ph) * amp; x === x0 ? g.moveTo(x, yy) : g.lineTo(x, yy); }
  g.stroke(); g.restore();
}
/** Nhóm trượt ra trái (rời khung bằng chuyển động, cắt ở mép tường): vẽ khi t ∈ [a, b + 0.55]. */
function grp(g, t, a, b, draw, dx = -1900) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.55)); if (o >= 1) return;
  g.save(); g.beginPath(); g.rect(96, 196, W - 96, 620); g.clip(); g.translate(dx * o, 0); draw(); g.restore();
}
const stroke = (g, col = '@ink', w = 4) => { g.strokeStyle = ink(col); g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };
// ── biểu tượng nét trung tính ──
function wifi(g, x, y, s, a = 1, k = 1) {
  g.save(); g.globalAlpha = a; stroke(g, '@ink', 5);
  g.fillStyle = ink('@ink'); g.beginPath(); g.arc(x, y, s * 0.08, 0, TAU); g.fill();
  [0.34, 0.62, 0.92].forEach((r, i) => { if (k * 3 > i) { g.beginPath(); g.arc(x, y, s * r, -TAU * 0.375, -TAU * 0.125); g.stroke(); } });
  g.restore();
}
function phone(g, x, y, s) {
  g.save(); stroke(g, '@ink', 4); g.beginPath(); g.roundRect(x - s * 0.3, y - s * 0.5, s * 0.6, s, s * 0.08); g.stroke();
  g.beginPath(); g.moveTo(x - s * 0.1, y + s * 0.4); g.lineTo(x + s * 0.1, y + s * 0.4); g.stroke(); g.restore();
}
function oven(g, x, y, s) {
  g.save(); stroke(g, '@ink', 4); g.beginPath(); g.roundRect(x - s * 0.62, y - s * 0.36, s * 1.24, s * 0.72, s * 0.06); g.stroke();
  g.beginPath(); g.roundRect(x - s * 0.5, y - s * 0.26, s * 0.78, s * 0.52, s * 0.04); g.stroke();
  for (const dy of [-0.14, 0, 0.14]) { g.beginPath(); g.arc(x + s * 0.46, y + dy * s, s * 0.03, 0, TAU); g.stroke(); }
  g.restore();
}
function clock(g, x, y, r, t) {
  g.save(); stroke(g, '@ink', 5); g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82); g.lineTo(x + Math.cos(a) * r * 0.93, y + Math.sin(a) * r * 0.93); g.stroke(); }
  const a1 = -TAU / 4 + 0.5, a2 = -TAU / 4 + 2.6;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a1) * r * 0.5, y + Math.sin(a1) * r * 0.5); g.stroke();
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a2) * r * 0.72, y + Math.sin(a2) * r * 0.72); g.stroke();
  g.restore();
}
/** Phân tử nước: O (to) + 2 H, nằm trục ang; nét/đĩa trung tính. */
function water(g, x, y, r, ang) {
  g.save(); g.translate(x, y); g.rotate(ang); stroke(g, '@dim', 5);
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(0.9) * r * 1.5, s * Math.sin(0.9) * r * 1.5); g.stroke(); }
  g.fillStyle = ink('@ink'); g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
  g.fillStyle = ink('@dim'); for (const s of [-1, 1]) { g.beginPath(); g.arc(Math.cos(0.9) * r * 1.5, s * Math.sin(0.9) * r * 1.5, r * 0.55, 0, TAU); g.fill(); }
  g.restore();
}

const OV = { x: 150, y: 240, w: 740, h: 500 };                  // lò vi sóng mặt cắt

export default class Denpa {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2-denpa');
    this.START = L(62).start;
    this.FROM = Math.max(this.START - 1.2, L(61).end + 0.5);
    const S = i => L(i).start;
    this.T = {
      l62: S(62), denpa: w(62, '電波', 1), tokei: w(62, '時計'), go: w(62, '5キロ'),
      l63: S(63), micro: w(63, 'マイクロ波'), suu: w(63, '数'), cho: w(63, '波長'), wifi: w(63, 'wi-fi'), sma: w(63, 'スマート'), den: w(63, '電子'),
      l64: S(64), oven: w(64, '電子'), eba: w(64, '電場'), kai: w(64, '24億5000万回'), iku: w(64, '行っ'),
      l65: S(65), mizu65: w(65, '水'), netsu: w(65, '熱'),
      l66: S(66), mizu66: w(66, '水'), nera: w(66, '狙った'), atai: w(66, '値'),
      l67: S(67), hyomen: w(67, '表面'), oku: w(67, '奥'),
      l68: S(68), wifi68: w(68, 'wi-fi', 1), togire: w(68, '途切れやすい'), ghz: w(68, '2.4ギガヘルツ'), onaji: w(68, '同じ'),
      end: L(68).end,
    };
    const T = this.T;
    // số lên hình — tính bằng code, must trên chính chuỗi hiện
    this.km = `波長　${(LAMBDA(60e3) / 1000).toFixed(0)}〜${(LAMBDA(40e3) / 1000).toFixed(1)} km`;
    must(`'${this.km}'`, '波長　5〜7.5 km');
    this.kai = `1秒間に${Math.floor(2.45e9 / 1e8)}億${(2.45e9 % 1e8) / 1e4}万回`;
    must(`'${this.kai}'`, '1秒間に24億5000万回');
    this.cm = `波長 ${(LAMBDA(2.45e9) * 100).toFixed(1)} cm`; must(`'${this.cm}'`, '波長 12.2 cm');
    this.cmW = `${(LAMBDA(2.4e9) * 100).toFixed(1)}`; must(`'${this.cmW}'`, '12.5');
    this.cmO = `${(LAMBDA(2.45e9) * 100).toFixed(1)}`;
    // dấu dải: bắt đầu ở khe thấy được (cuối e1), → 電波 → マイクロ波 (trượt trong câu 63), ở lại
    this.marks = [[-1e9, 'vis'], [T.denpa - 0.1, 'radio'], [T.micro - 0.1, 'micro']];
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.denpa - 0.1, 'step'),
      cue(T.tokei, 'tick', -2), cue(T.go, 'beam', -4),
      cue(T.cho, 'wave', -8),
      cue(T.micro - 0.1, 'step'),
      cue(T.den, 'tick', -4),
      cue(T.oven, 'step', -4),
      cue(T.kai, 'wave', -8), cue(T.iku, 'telop', -3),
      cue(T.l65 + 2.2, 'step', -6), cue(T.netsu, 'beam', -5),
      cue(T.l66 + 0.9, 'step', -6), cue(T.nera + 0.3, 'fail', -4),
      cue(T.hyomen, 'tick', -3), cue(T.oku, 'beam', -5),
      cue(T.wifi68, 'tick', -4), cue(T.togire, 'arrive', -10), cue(T.ghz, 'telop', -4), cue(T.onaji, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'slit', { y: 360, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, '電波とマイクロ波', t, F + 0.3);
    specRuler(g, { y: RP.y, h: RP.h, window: 1, top: 4 });
    bandMark(g, t, this.marks, smooth(prog(t, F + 0.4, F + 1.0)));

    const ph = t * 6;
    // ═════ 62 電波: sóng dài trung tính + 電波時計 5〜7.5 km ═════
    grp(g, t, T.l62 - 0.2, T.cho - 0.35, () => {
      nwave(g, 140, 1130, 470, 330, 46, prog(t, T.denpa, T.denpa + 1.6), ph * 0.35);
      const kc = prog(t, T.tokei - 0.2, T.tokei + 0.5);
      if (kc > 0) { g.save(); g.translate(1330, 470); g.scale(outBack(kc), outBack(kc)); g.translate(-1330, -470); clock(g, 1330, 470, 100, t); g.restore(); }
      telop(g, '電波時計', 1330, 640, prog(t, T.tokei, T.tokei + 0.6), { size: 44, align: 'center' });
      telop(g, this.km, 140, 650, prog(t, T.go, T.go + 0.8), { size: 52 });
      const k5 = prog(t, T.go, T.go + 0.7), x5 = rulerX(LAMBDA(60e3), R4), x75 = rulerX(LAMBDA(40e3), R4);
      arrow(g, [[1330, 668], [1440, 750], [(x5 + x75) / 2, RP.y - 12]], k5, { color: '@dim', w: 4, head: 13 });
      if (k5 > 0) { g.save(); g.strokeStyle = `rgba(237,232,223,${k5})`; g.lineWidth = 3; g.strokeRect(x5 - 3, RP.y - 10, x75 - x5 + 6, RP.h + 20); g.restore(); }
      telop(g, 'おおたかどや山 40 kHz・はがね山 60 kHz', 140, 720, prog(t, T.go + 0.5, T.go + 1.6), { size: 32, weight: 500, color: '@dim' });
    });
    // ═════ 63 マイクロ波: 数ミリ〜数十センチ (hai sóng, đo một bước sóng) + ba đồ vật quen thuộc ═════
    grp(g, t, T.l63 - 0.1, T.l64 - 0.15, () => {
      telop(g, '数ミリ〜数十センチ', 140, 330, prog(t, T.suu, T.suu + 0.8), { size: 56, mincho: true });
      const dim = (x0, x1, y, k) => { if (k <= 0) return; const xe = x0 + (x1 - x0) * clamp(k); g.save(); stroke(g, '@dim', 3);
        g.beginPath(); g.moveTo(x0, y); g.lineTo(xe, y); g.moveTo(x0, y - 9); g.lineTo(x0, y + 9); if (k >= 1) { g.moveTo(x1, y - 9); g.lineTo(x1, y + 9); } g.stroke(); g.restore(); };
      if (t < T.wifi - 0.3) {
        nwave(g, 140, 1250, 440, 64, 28, prog(t, T.cho, T.cho + 1.2), ph * 1.5);
        dim(140, 204, 490, prog(t, T.suu + 0.6, T.suu + 1.1));
        telop(g, '数ミリ', 222, 500, prog(t, T.suu + 0.9, T.suu + 1.5), { size: 36, weight: 500, color: '@dim' });
        nwave(g, 140, 1250, 610, 220, 40, prog(t, T.suu + 1.4, T.suu + 2.6), ph * 0.8);
        dim(140, 360, 670, prog(t, T.suu + 2.0, T.suu + 2.5));
        telop(g, '数十センチ', 380, 680, prog(t, T.suu + 2.3, T.suu + 2.9), { size: 36, weight: 500, color: '@dim' });
      }
      const ic = [[T.wifi, 440, 'Wi-Fi'], [T.sma, 960, 'スマートフォン'], [T.den, 1480, '電子レンジ']];
      ic.forEach(([ta, x, lab], i) => {
        const k = prog(t, ta - 0.15, ta + 0.45);
        if (k > 0) { g.save(); g.translate(x, 530); g.scale(outBack(k), outBack(k)); g.translate(-x, -530);
          if (i === 0) wifi(g, x, 580, 150, 1); else if (i === 1) phone(g, x, 530, 170); else oven(g, x, 530, 190); g.restore(); }
        telop(g, lab, x, 720, prog(t, ta, ta + 0.6), { size: 52, mincho: true, align: 'center' });
      });
    });
    // ═════ 64–67 lò vi sóng mặt cắt ═════
    const ko = prog(t, T.oven - 0.1, T.oven + 0.6), oOut = outCubic(clamp((t - (T.l68 - 0.15)) / 0.55));
    if (ko > 0 && oOut < 1) {
      g.save(); g.beginPath(); g.rect(96, 196, W - 96, 620); g.clip(); g.translate(-1900 * oOut, 0);
      stroke(g, '@dim', 4); g.beginPath(); g.roundRect(OV.x, OV.y, OV.w * outCubic(ko), OV.h, 22); g.stroke();
      if (ko >= 1) {
        stroke(g, '@faint', 4); g.beginPath(); g.moveTo(OV.x + 50, OV.y + OV.h - 50); g.lineTo(OV.x + OV.w - 50, OV.y + OV.h - 50); g.stroke();
        // E: mũi tên dọc, hướng/độ dài theo sin(kx − ωt) — đảo chiều liên tục; dịch lên khi phân tử nước hiện
        const ke = prog(t, T.eba - 0.1, T.eba + 0.6), up = smooth(prog(t, T.l65, T.l65 + 0.6)), cy = lerp(470, 340, up), amp = lerp(135, 62, up);
        for (let i = 0; i < 7; i++) { const x = OV.x + 70 + i * 100, v = Math.sin(i * 0.9 - t * 5) * amp * ke;
          if (Math.abs(v) > 16) arrow(g, [[x, cy + v * 0.5], [x, cy - v * 0.5]], 1, { color: '@ink', w: 5, head: 15 }); }
        // phân tử nước quay theo E
        const km = prog(t, T.mizu65 - 0.1, T.mizu65 + 0.5);
        if (km > 0) [0, 1, 2].forEach(i => { const x = OV.x + 170 + i * 200; water(g, x, 590, 28 * outBack(km) * (1 - smooth(prog(t, T.l67 - 0.2, T.l67 + 0.3))), Math.sin(i * 0.9 * 2 - t * 5) * 1.1 * km); });
        // thức ăn: lớp ngoài nóng trước, rồi nhiệt truyền vào
        const kf = prog(t, T.l67, T.l67 + 0.7);
        if (kf > 0) {
          g.save();
          g.fillStyle = 'rgba(237,232,223,0.12)'; g.beginPath(); g.roundRect(OV.x + 160, 440, 420, 220, 40); g.fill();
          g.save(); g.beginPath(); g.roundRect(OV.x + 160, 440, 420, 220, 40); g.clip(); stroke(g, '@ink', 24); g.globalAlpha = 0.3 * kf;
          g.beginPath(); g.roundRect(OV.x + 160, 440, 420, 220, 40); g.stroke(); g.restore();
          const ka = prog(t, T.oku - 0.1, T.oku + 0.8);
          for (const dx of [-100, 0, 100]) arrow(g, [[OV.x + 370 + dx, 470], [OV.x + 370 + dx, 470 + 110 * ka]], 1, { color: '@dim', w: 5, head: 14 });
          g.restore();
        }
      }
      g.restore();
    }
    // chữ bên phải lò (x 960+): mỗi câu một khối, trượt ra phải khi câu sau vào
    const pan = (a, b, fn) => { if (t < a) return; const o = outCubic(clamp((t - b) / 0.5)); if (o >= 1) return; g.save(); g.translate(1100 * o, 0); fn(); g.restore(); };
    pan(T.l64, T.l65 - 0.1, () => {
      telop(g, this.kai, 960, 340, prog(t, T.kai, T.kai + 0.9), { size: 48 });
      telop(g, '行ったり来たり', 960, 440, prog(t, T.iku, T.iku + 0.7), { size: 60, mincho: true });
      telop(g, this.cm, 960, 520, prog(t, T.iku + 0.8, T.iku + 1.6), { size: 36, weight: 500, color: '@dim' });
    });
    pan(T.l65, T.l66 - 0.1, () => {
      telop(g, '水の分子は、向きをそろえようと回る', 960, 340, prog(t, T.mizu65, T.mizu65 + 1.0), { size: 44 });
      telop(g, '回る動き → 熱', 960, 440, prog(t, T.netsu, T.netsu + 0.8), { size: 60, mincho: true });
    });
    pan(T.l66, T.hyomen - 0.6, () => {
      const bw = wrong(g, '水だけを狙った周波数', 960, 340, prog(t, T.mizu66, T.mizu66 + 1.0), { size: 48 });
      strike(g, bw, prog(t, T.nera + 0.2, T.nera + 0.6));
      telop(g, '水の分子をゆさぶる', 960, 440, prog(t, T.nera + 0.5, T.nera + 1.3), { size: 56, mincho: true });
    });
    pan(T.hyomen - 0.3, T.l68 - 0.1, () => {
      telop(g, '温まるのは表面から数センチ', 960, 340, prog(t, T.hyomen, T.hyomen + 1.0), { size: 48 });
      telop(g, '奥へは、熱が伝わる', 960, 440, prog(t, T.oku, T.oku + 0.8), { size: 56, mincho: true });
    });
    // ═════ 68 Wi-Fi 2.4 GHz vs lò 2.45 GHz ═════
    if (t >= T.l68 - 0.1) {
      const kw = prog(t, T.l68 + 0.1, T.l68 + 0.7), flick = prog(t, T.togire, T.togire + 1.6);
      const drop = flick > 0 && flick < 1 ? (Math.sin(flick * TAU * 3) > 0 ? 0.25 : 1) : 1;
      if (kw > 0) { g.save(); g.translate(480, 500); g.scale(outBack(kw), outBack(kw)); g.translate(-480, -500); wifi(g, 480, 540, 190, drop); g.restore();
        g.save(); g.translate(1100, 480); g.scale(outBack(kw), outBack(kw)); g.translate(-1100, -480); oven(g, 1100, 480, 250); g.restore(); }
      // sóng từ lò đè lên Wi-Fi (cùng dải)
      nwave(g, 640, 930, 470, 48, 24 * (flick > 0 ? 1 : 0.6), prog(t, T.togire - 0.2, T.togire + 0.5), ph * 1.5, { a: 0.9 });
      telop(g, 'Wi-Fiが途切れやすい', 960, 330, prog(t, T.togire - 0.3, T.togire + 0.8), { size: 56, mincho: true, align: 'center' });
      telop(g, 'Wi-Fi　2.4 GHz', 480, 700, prog(t, T.ghz - 0.1, T.ghz + 0.7), { size: 44, align: 'center' });
      telop(g, '電子レンジ　2.45 GHz', 1100, 700, prog(t, T.ghz + 0.5, T.ghz + 1.3), { size: 44, align: 'center' });
      telop(g, `約${this.cmW} cm`, 480, 760, prog(t, T.ghz + 0.9, T.ghz + 1.5), { size: 32, weight: 500, color: '@dim', align: 'center' });
      telop(g, `約${this.cmO} cm`, 1100, 760, prog(t, T.ghz + 1.1, T.ghz + 1.7), { size: 32, weight: 500, color: '@dim', align: 'center' });
      telop(g, '同じ帯域', 1560, 520, prog(t, T.onaji, T.onaji + 0.8), { size: 72, mincho: true, align: 'center' });
    }
  }
}
