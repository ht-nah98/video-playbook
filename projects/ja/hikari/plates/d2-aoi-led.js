// d2 · 青い光の段差 (p2 câu 49–53) — ERA lab, khe 'slit' y = 360.
//  49 ba "bậc đôi" (tấm trên / dưới, nét trung tính), khoảng hở TỈ LỆ eV(650 / 530 / 450): đỏ phát từ 1960年代, lục theo sau, lam tối
//  50 khe lam rộng nhất 「青には、大きな段差が必要」 · tinh thể (lưới chấm) lớn không nổi: nứt
//  51 ba tên (chữ, không ảnh) · 52 huy chương trơn 2014年 + bậc lam phát 450 · 53 ba chùm 650 + 530 + 450 hội tụ → trắng
import { C, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, aperture, shaft, ray, photon, arrow, chip, telop, title, plate, measure, cue, eV, fmt, JP, MIN } from '../kit.js';

const COLS = [{ nm: 650, name: '赤', x: 560 }, { nm: 530, name: '緑', x: 1000 }, { nm: 468, name: '青', x: 1440 }];
const SC = 120, BY = 800, BW = 220;                       // px / eV; tấm dưới ở BY; bề rộng tấm
const gapPx = nm => eV(nm) * SC;
must(`${gapPx(650) < gapPx(530) && gapPx(530) < gapPx(450)}`, true);
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));

function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return null;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  return telop(g, s, x, y, k, o);
}
/** Bậc đôi: tấm dưới ở BY, tấm trên cao hơn gapPx(nm). lit 0..1: tấm sáng (ink) hay mờ; mũi tên hai đầu chỉ khoảng hở. */
function bars(g, cx, nm, k, lit, mark = 0) {
  if (k <= 0) return;
  const yt = BY - gapPx(nm), e = outCubic(clamp(k)), w = BW * e;
  g.save(); g.globalAlpha *= 0.35 + 0.65 * lit;
  for (const y of [yt, BY]) {
    const gr = g.createLinearGradient(0, y, 0, y + 18); gr.addColorStop(0, '#4A4743'); gr.addColorStop(1, '#2A2825');
    g.fillStyle = gr; g.fillRect(cx - w / 2, y, w, 18); g.strokeStyle = C.text; g.lineWidth = 3; g.strokeRect(cx - w / 2, y, w, 18);
  }
  g.restore();
  if (k >= 1) {
    const ax = cx - BW / 2 - 34, a = 0.5 + 0.5 * mark;
    g.save(); g.globalAlpha *= a;
    arrow(g, [[ax, (yt + BY) / 2], [ax, yt + 22]], 1, { color: '@ink', w: 4 }); arrow(g, [[ax, (yt + BY) / 2], [ax, BY - 4]], 1, { color: '@ink', w: 4 });
    g.restore();
  }
}
/** Phát sáng: gói photon bay từ mép phải bậc đôi (u theo t, tuần hoàn), bề rộng 210 px. */
function emit(g, cx, nm, t, t0, a = 1) {
  if (t < t0 || a <= 0) return;
  const mid = BY - gapPx(nm) / 2, k = clamp((t - t0) / 0.5);
  for (let j = 0; j < 2; j++) {
    const u = (((t - t0) / 1.3 + j * 0.5) % 1 + 1) % 1, env = Math.sin(Math.PI * u);
    photon(g, cx + BW / 2 + 30 + 130 * u, mid, nm, { size: 46, amp: 13, phase: -t * 9, a: env * k * a });
  }
}
function crystal(g, x0, y0, k, crack, t) {            // lưới chấm (tinh thể) lớn dần theo hàng; nứt: hai nửa lệch nhau
  if (k <= 0) return;
  const cols = 8, rows = 6, sp = 88, rowsShown = rows * clamp(k);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if (r + 1 > rowsShown + 0.001 && r >= Math.ceil(rowsShown)) continue;
    const a = clamp(rowsShown - r), br = c + r > 7 ? crack : 0;
    const x = x0 + c * sp + (c >= 4 && r >= 2 ? 16 * br : 0), y = y0 + r * sp + (c >= 4 && r >= 2 ? 22 * br : 0);
    g.save(); g.fillStyle = `rgba(237,232,223,${0.85 * a})`; g.beginPath(); g.arc(x, y, 9, 0, TAU); g.fill();
    g.strokeStyle = `rgba(154,149,140,${0.6 * a})`; g.lineWidth = 3;
    if (c < cols - 1) { g.beginPath(); g.moveTo(x + 9, y); g.lineTo(x0 + (c + 1) * sp - 9 + (c + 1 >= 4 && r >= 2 ? 16 * br : 0), y0 + r * sp + (c + 1 >= 4 && r >= 2 ? 22 * br : 0)); g.stroke(); }
    g.restore();
  }
  if (crack > 0) {                                      // đường nứt
    const P = [[x0 + 3.5 * sp, y0 + 1.5 * sp - 20], [x0 + 3.5 * sp + 28, y0 + 2.5 * sp], [x0 + 3.5 * sp - 20, y0 + 3.5 * sp], [x0 + 3.5 * sp + 24, y0 + 4.5 * sp], [x0 + 3.5 * sp, y0 + 5.5 * sp + 26]];
    ray(g, P, { nm: 'white', w: 4, k: crack, a: 0.55 });
  }
}
function medal(g, cx, cy, k) {                        // huy chương trơn, trung tính (không logo Nobel)
  if (k <= 0) return;
  g.save(); g.translate(cx, cy); const s = outCubic(clamp(k)); g.scale(s, s);
  g.fillStyle = '#3A3835'; g.beginPath(); g.moveTo(-60, -240); g.lineTo(0, -110); g.lineTo(60, -240); g.closePath(); g.fill();
  const gr = g.createRadialGradient(-40, -40, 10, 0, 0, 140); gr.addColorStop(0, '#9A958C'); gr.addColorStop(0.6, '#5E5A53'); gr.addColorStop(1, '#3A3835');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 120, 0, TAU); g.fill();
  g.strokeStyle = C.text; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 102, 0, TAU); g.stroke();
  g.strokeStyle = C.dim; g.lineWidth = 3; for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; g.beginPath(); g.moveTo(Math.cos(a) * 55, Math.sin(a) * 55); g.lineTo(Math.cos(a) * 88, Math.sin(a) * 88); g.stroke(); }
  g.restore();
}

export default class AoiLed {
  static ERA = 'lab';
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2-aoi-led');
    this.START = L(49).start;
    this.FROM = Math.max(this.START - 1.2, L(48).end + 0.5);
    this.T = {
      led: w(49, 'led'), y1960: w(49, '1960年代'), arimashita: w(49, 'ありました'), demo: w(49, 'も'), ao: w(49, '青'), nakanaka: w(49, 'なかなか'), end49: L(49).end,
      ooki: w(50, '大きな'), danSa: w(50, '段差'), kessho: w(50, '結晶'), sodatanakatta: w(50, '育たなかった'), end50: L(50).end,
      kabe: w(51, '壁'), akasaki: w(51, '赤崎勇'), amano: w(51, '天野浩'), nakamura: w(51, '中村修二'), end51: L(51).end,
      y2014: w(52, '2014年'), nobel: w(52, 'ノーベル'), end52: L(52).end,
      ao53: w(53, '青'), sorotte: w(53, 'そろって'), shiroku: w(53, '白く'), led53: w(53, 'led'), end: L(53).end,
    };
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.y1960, 'card'),                       // 「赤いLED：1960年代から」
      cue(T.ao, 'telop', -4),                     // 「青だけは、作れなかった」
      cue(T.ooki, 'card'),                        // 「青には、大きな段差が必要」
      cue(T.kessho, 'step'), cue(T.sodatanakatta + 0.3, 'step', -3),    // tinh thể lên, nứt
      cue(T.akasaki, 'telop'), cue(T.amano, 'step', -4), cue(T.nakamura, 'step', -4),
      cue(T.nobel, 'nobel'),                      // 2014 (suzu ×1)
      cue(T.y2014 + 0.9, 'beam', -3),             // bậc lam phát
      cue(T.sorotte, 'spectrum'),                 // ba chùm → trắng
      cue(T.shiroku, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, Y0 = 360;
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0 });
    const kBeam = prog(t, F + 0.1, F + 1.4);
    shaft(g, 92, Y0, 1800, 150, 1800, 900, { a: 0.05, k: kBeam, t, dust: 60, seed: 5, spot: false });
    ray(g, [[98, Y0], [1150, Y0]], { nm: 'white', w: 5, k: kBeam, a: 0.55 * (1 - out(t, T.led + 0.2, 0.6)) });
    title(g, '青い光の段差', t, F + 0.3);

    // ── vị trí cột: lam trượt sang trái (50 →), đỏ + lục rút ra trái ──
    const slide = out(t, T.kessho - 0.0, 0.9), gone = out(t, T.ao53 - 0.1, 0.8);
    const cxOf = (c, i) => i === 2 ? c.x + (560 - c.x) * slide : c.x;
    const fadeOf = i => i === 2 ? 1 - gone : 1 - out(t, T.kessho - 0.3, 0.5);
    // ── 49–53 · ba bậc đôi ──
    const kb = [prog(t, T.led, T.led + 0.7), prog(t, T.led + 0.25, T.led + 0.95), prog(t, T.led + 0.5, T.led + 1.2)];
    const mark = [0, 0, out(t, T.ooki, 0.5) * (1 - out(t, T.sorotte - 0.2, 0.4))];
    COLS.forEach((c, i) => {
      const cx = cxOf(c, i), f = fadeOf(i); if (f <= 0) return;
      g.save(); g.globalAlpha = f;
      const lit = i === 0 ? out(t, T.y1960, 0.5) : i === 1 ? out(t, T.demo, 0.5) : out(t, T.y2014 + 0.5, 0.6);
      bars(g, cx, c.nm, kb[i], Math.max(0.25, lit), mark[i]);
      if (i < 2) emit(g, cx, c.nm, t, i === 0 ? T.y1960 + 0.4 : T.demo + 0.2);
      else emit(g, cx, c.nm, t, T.y2014 + 0.7);
      const kl = i === 0 ? prog(t, T.y1960, T.y1960 + 0.7) : i === 1 ? prog(t, T.demo, T.demo + 0.7) : prog(t, T.ooki, T.ooki + 0.7);
      if (kl > 0) {
        chip(g, cx - 96, BY + 80, c.nm, 13, kl);
        telop(g, c.name, cx - 66, BY + 94, kl, { size: 40 });
      }
      g.restore();
    });
    // ── chữ trên cùng bên trái (S1 y 290, S2 y 360) ──
    const o49 = out(t, T.ooki - 0.3, 0.7);
    if (o49 < 1) { g.save(); g.globalAlpha = 1 - o49;
      row(g, '赤いLED：1960年代から', 140, 290, prog(t, T.y1960, T.y1960 + 1.1), { size: 52, mincho: true });
      row(g, '青だけは、作れなかった', 140, 365, prog(t, T.ao, T.ao + 1.1), { size: 52, mincho: true });
      g.restore(); }
    const o50 = out(t, T.kabe - 0.3, 0.7);
    if (t > T.ooki - 0.2 && o50 < 1) { g.save(); g.globalAlpha = 1 - o50;
      row(g, '青には、大きな段差が必要', 140, 290, prog(t, T.ooki, T.ooki + 1.2), { size: 52, mincho: true });
      row(g, '結晶が、うまく育たなかった', 140, 365, prog(t, T.kessho, T.kessho + 1.2), { size: 52, mincho: true });
      g.restore(); }
    // ── 50 · tinh thể ──
    const oX = out(t, T.kabe - 0.2, 0.8);
    if (t > T.kessho - 0.2 && oX < 1) { g.save(); g.translate(1800 * oX, 0);
      crystal(g, 1010, 470, prog(t, T.kessho, T.kessho + 1.8), prog(t, T.sodatanakatta, T.sodatanakatta + 1.0), t);
      g.restore(); }
    // ── 51–52 · ba tên + huy chương ──
    const oN = out(t, T.ao53 - 0.3, 0.8);
    if (t > T.akasaki - 0.2 && oN < 1) { g.save(); g.translate(1800 * oN, 0);
      row(g, '赤崎勇', 960, 480, prog(t, T.akasaki, T.akasaki + 0.8), { size: 76, mincho: true });
      row(g, '天野浩', 960, 600, prog(t, T.amano, T.amano + 0.8), { size: 76, mincho: true });
      row(g, '中村修二', 960, 720, prog(t, T.nakamura, T.nakamura + 0.8), { size: 76, mincho: true });
      medal(g, 1560, 600, prog(t, T.y2014, T.y2014 + 0.9));
      row(g, '2014年　ノーベル物理学賞', 960, 900, prog(t, T.y2014, T.y2014 + 1.4), { size: 52, mincho: true });
      g.restore(); }
    // ── 53 · ba chùm hội tụ thành trắng ──
    if (t > T.ao53 - 0.1) {
      const SY = [470, 620, 770], JX = 1000, JY = 620, ka = prog(t, T.ao53, T.ao53 + 0.5), kr = prog(t, T.sorotte, T.sorotte + 1.0);
      COLS.forEach((c, i) => {
        chip(g, 190, SY[i], c.nm, 13, ka); telop(g, c.name, 226, SY[i] + 14, ka, { size: 40 });
        ray(g, [[290, SY[i]], [JX, JY]], { nm: c.nm, w: 6, k: kr, a: 0.95 * ka });
      });
      ray(g, [[JX, JY], [1750, JY]], { nm: 'white', w: 7, k: prog(t, T.sorotte + 0.9, T.sorotte + 1.9), a: 1 });
      row(g, '白く明るいLEDの明かり', 1000, 460, prog(t, T.shiroku, T.shiroku + 1.3), { size: 56, mincho: true });
    }
  }
}
