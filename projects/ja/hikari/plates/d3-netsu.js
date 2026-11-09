// d3 · 熱く光る (p2 câu 54–59) — ERA lab, khe 'slit' y = 360. Ra: lab → darkroom (vòng sáng do trang).
//  54 hai nhãn của d1 hiện lại, ② sáng · 55 khối nóng, điện tích rung → dải LIÊN TỤC (so với dải vạch Na)
//  56 Mặt Trời mặt cắt, lõi 1500万度 · 57 mũi tên lõi → ✗ → mắt · 58 bề mặt 5500度 sáng, tia ra mắt
//  59 ngọn nến: thân vàng = hạt muội nóng (②), chân lam = phân tử (①)
import { C, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, aperture, shaft, ray, spot, spectrumStrip, chip, arrow, cross, eye, surfaceRgb,
  wlCss, wl2rgb, NA_LINES, telop, title, plate, measure, cue, JP, MIN } from '../kit.js';

const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const SX = 1100, SY = 560, SR = 250;                       // Mặt Trời mặt cắt
const EX = 1650, EY = 560, ER = 100;                       // mắt
// Planck (nm, K): màu vật nóng = phổ liên tục, đặt bởi nhiệt độ (qua surfaceRgb, không gõ tay màu)
const planck = (nm, T) => nm ** -5 / (Math.exp(1.4388e7 / (nm * T)) - 1);
function heatRgb(T, level = 1) {
  let mx = 0; for (let nm = 380; nm <= 780; nm += 5) mx = Math.max(mx, planck(nm, T));
  return surfaceRgb(() => 1, nm => planck(nm, T) / mx, level);
}
const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return null;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  return telop(g, s, x, y, k, o);
}
const ring = (cx, cy, r, n = 72) => Array.from({ length: n + 1 }, (_, i) => [cx + Math.cos(i / n * TAU) * r, cy + Math.sin(i / n * TAU) * r]);

function block(g, x, y, w, h, k, t) {                     // khối nóng + điện tích rung dữ dội
  if (k <= 0) return;
  const c = heatRgb(1800, 1);
  g.save(); g.globalAlpha *= Math.min(1, k * 2);
  g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(x + w / 2, y + h / 2, 10, x + w / 2, y + h / 2, w * 0.95); gr.addColorStop(0, rgba(c, 0.30)); gr.addColorStop(1, rgba(c, 0));
  g.fillStyle = gr; g.fillRect(x - w * 0.6, y - h * 0.6, w * 2.2, h * 2.2);
  g.globalCompositeOperation = 'source-over';
  g.fillStyle = rgba(c.map(v => v * 0.35), 1); g.fillRect(x, y, w, h);
  g.strokeStyle = C.text; g.lineWidth = 4; g.strokeRect(x, y, w, h);
  g.restore();
  for (let i = 0; i < 15; i++) {                          // điện tích: vị trí lưới + dao động nhanh, biên độ lớn (hash theo i)
    const bx = x + 50 + (i % 5) * ((w - 100) / 4), by = y + 50 + Math.floor(i / 5) * ((h - 100) / 2);
    const px = bx + 20 * Math.sin(t * 31 + hash(i) * 40) + 9 * Math.sin(t * 53 + i), py = by + 20 * Math.sin(t * 27 + hash(i + 9) * 40) + 9 * Math.cos(t * 47 + i);
    g.save(); g.globalAlpha *= Math.min(1, k * 2); g.fillStyle = C.text; g.beginPath(); g.arc(px, py, 8, 0, TAU); g.fill();
    g.fillStyle = C.bg ?? '#0B0B0E'; g.fillRect(px - 5, py - 1.5, 10, 3); g.restore();      // dấu −
  }
}
function flame(g, x, y, k, t) {                           // y = chân bấc
  if (k <= 0) return;
  const fl = 1 + 0.02 * Math.sin(t * 9) + 0.015 * Math.sin(t * 15.7), h = 190 * k * fl, sw = 3 * Math.sin(t * 6.3);
  spot(g, x, y - 90, 190 * k, { nm: 585, a: 0.22 * k });
  const c0 = wl2rgb(585), cc = wl2rgb(585, { level: 1 });
  g.save();
  const gr = g.createRadialGradient(x, y - 60, 6, x, y - 70, 120);
  gr.addColorStop(0, `rgba(${Math.min(255, cc[0] + 60)},${Math.min(255, cc[1] + 60)},${Math.min(255, cc[2] + 60)},1)`); gr.addColorStop(0.6, wlCss(585, 0.95)); gr.addColorStop(1, wlCss(585, 0.35));
  g.fillStyle = gr; g.beginPath(); g.moveTo(x + sw, y - h);
  g.bezierCurveTo(x + 62, y - h * 0.5, x + 56, y - 8, x, y); g.bezierCurveTo(x - 56, y - 8, x - 62, y - h * 0.5, x + sw, y - h); g.fill();
  g.restore();
  // chân lam (phân tử)
  spot(g, x, y - 20, 70 * k, { nm: 470, a: 0.35 * k });
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = wlCss(470, 0.95); g.beginPath(); g.ellipse(x, y - 24, 27, 40 * k, 0, 0, TAU); g.fill(); g.restore();
  void c0;
}
function soot(g, x, y, k, t) {                            // hạt muội: chấm trung tính nổi trong phần vàng
  for (let i = 0; i < 12; i++) {
    const ph = (t * 0.55 + hash(i * 3.1)) % 1, a = Math.sin(Math.PI * ph) * k;
    const px = x + (hash(i * 7.7) - 0.5) * 70 * (1 - 0.35 * ph) + 4 * Math.sin(t * 4 + i), py = y - 40 - 130 * ph;
    g.save(); g.fillStyle = `rgba(35,33,31,${0.85 * a})`; g.strokeStyle = `rgba(237,232,223,${0.8 * a})`; g.lineWidth = 2; g.beginPath(); g.arc(px, py, 6, 0, TAU); g.fill(); g.stroke(); g.restore();
  }
}
function candle(g, x, y0, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha *= Math.min(1, k * 2);
  const gr = g.createLinearGradient(x - 36, 0, x + 36, 0); gr.addColorStop(0, '#4A4743'); gr.addColorStop(0.5, '#34322F'); gr.addColorStop(1, '#232120');
  g.fillStyle = gr; g.fillRect(x - 36, y0, 72, 990 - y0); g.strokeStyle = C.dim; g.lineWidth = 3; g.strokeRect(x - 36, y0, 72, 990 - y0);
  g.strokeStyle = C.text; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y0 - 14); g.stroke();
  g.restore();
}

export default class Netsu {
  static ERA = 'lab';
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3-netsu');
    this.START = L(54).start;
    this.FROM = Math.max(this.START - 1.2, L(53).end + 0.5);
    this.T = {
      futatsume: w(54, '2つ目'), netsu: w(54, '熱'),
      atsui: w(55, '熱い'), denka: w(55, '電荷'), yusa: w(55, '揺さぶられ'), arayuru: w(55, 'あらゆる'), hitotsuzuki: w(55, 'ひと続き'), end55: L(55).end,
      man: w(56, '1500万度'), chushin: w(56, '中心'), umareru: w(56, '生まれます'),
      soko: w(57, 'そこ'), mite: w(57, '見て'), kita: w(57, '来た'),
      hyomen: w(58, '表面'), do5500: w(58, '5500度'), atsui58: w(58, '熱い'), hikatte: w(58, '光って'),
      rosoku: w(59, 'ろうそく'), kiiro: w(59, '黄色'), susu: w(59, 'すす'), aoi: w(59, '青い'), kaidan: w(59, '階段'), end: L(59).end,
    };
    must(`'${NA_LINES[0]}'`, '589');
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.futatsume, 'card'),                 // ② sáng
      cue(T.denka, 'telop'),                    // khối nóng, điện tích rung
      cue(T.arayuru, 'spectrum'), cue(T.hitotsuzuki, 'step', -4),    // dải liên tục
      cue(T.man, 'card'), cue(T.umareru, 'step', -3),                // lõi
      cue(T.soko, 'step', -4),                  // mũi tên + ✗
      cue(T.hyomen, 'beam'), cue(T.do5500, 'card', -4), cue(T.atsui58, 'telop', -4),    // bề mặt, tia ra mắt
      cue(T.rosoku, 'step'), cue(T.kiiro, 'card', -4), cue(T.aoi, 'photon', -3),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, Y0 = 360;
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0 });
    const kBeam = prog(t, F + 0.1, F + 1.4);
    shaft(g, 92, Y0, 1800, 150, 1800, 900, { a: 0.05, k: kBeam, t, dust: 60, seed: 9, spot: false });
    title(g, '熱く光る', t, F + 0.3);

    // ── 54 · nhãn ① ② ──
    const oL = out(t, T.denka - 0.4, 0.7);
    if (oL < 1) {
      g.save(); g.translate(1800 * oL, 0);
      ray(g, [[98, Y0], [980, Y0]], { nm: 'white', w: 5, k: outCubic(prog(t, F + 0.3, F + 1.5)), a: 0.5 * (1 - out(t, T.futatsume, 0.6)) });
      const lit = out(t, T.netsu - 0.2, 0.5);
      row(g, '①　電子の階段', 1000, 300, prog(t, F + 0.8, F + 1.6), { size: 56, mincho: true, color: lit > 0.5 ? '@dim' : '@ink' });
      row(g, '②　熱', 1000, 380, prog(t, T.futatsume, T.futatsume + 0.9), { size: 56, mincho: true, color: '@ink' });
      g.restore();
    }

    // ── 55 · khối nóng + dải liên tục ──
    const o55 = out(t, T.man - 0.4, 0.6);
    if (t > T.atsui - 0.4 && o55 < 1) {
      g.save(); g.globalAlpha = 1 - o55;
      block(g, 140, 250, 380, 280, prog(t, T.atsui, T.atsui + 0.8), t);
      row(g, '電荷が激しく揺さぶられる', 600, 340, prog(t, T.denka, T.denka + 1.3), { size: 48 });
      // dải vạch Na thu nhỏ (so) + dải liên tục
      telop(g, '線', 140, 650, prog(t, T.arayuru - 0.1, T.arayuru + 0.5), { size: 40 });
      spectrumStrip(g, 360, 610, 1200, 44, { continuous: false, lines: NA_LINES, k: prog(t, T.arayuru - 0.1, T.arayuru + 0.8) });
      telop(g, 'ひと続き', 140, 760, prog(t, T.hitotsuzuki - 0.2, T.hitotsuzuki + 0.6), { size: 40 });
      spectrumStrip(g, 360, 700, 1200, 64, { continuous: true, k: prog(t, T.arayuru, T.arayuru + 1.6), ticks: [400, 500, 600, 700] });
      row(g, 'あらゆる波長が、ひと続きに', 140, 940, prog(t, T.arayuru, T.arayuru + 1.5), { size: 52, mincho: true });
      g.restore();
    }

    // ── 56–58 · Mặt Trời ──
    const oS = out(t, T.rosoku - 0.4, 0.6);
    if (t > T.man - 0.4 && oS < 1) {
      g.save(); g.globalAlpha = 1 - oS;
      const kS = prog(t, T.man - 0.3, T.man + 1.0), kRim = out(t, T.hyomen + 0.1, 0.9);
      ray(g, ring(SX, SY, SR), { nm: 'white', w: 5, k: kS, a: 0.3 + 0.7 * kRim });
      // lõi
      const kc = prog(t, T.man, T.man + 1.0);
      spot(g, SX, SY, 150 * kc, { nm: 'white', a: 0.5 * kc });
      if (kc > 0) { g.save(); g.setLineDash([8, 8]); g.strokeStyle = C.text; g.lineWidth = 3; g.beginPath(); g.arc(SX, SY, 62 * kc, 0, TAU); g.stroke(); g.restore(); }
      row(g, '中心：およそ1500万度', 140, 470, prog(t, T.chushin - 0.1, T.chushin + 1.2), { size: 48 });
      row(g, 'エネルギーが生まれる', 140, 545, prog(t, T.umareru - 0.1, T.umareru + 1.0), { size: 44, mincho: true });
      if (kc > 0.5) arrow(g, [[700, 500], [SX - 76, SY - 14]], prog(t, T.chushin + 0.4, T.chushin + 1.2), { color: '@ink', w: 3 });
      // mắt
      const ke = prog(t, T.soko - 0.6, T.soko + 0.3);
      eye(g, EX, EY, ER, { k: ke, lit: out(t, T.hyomen + 0.3, 0.8) });
      // 57 · mũi tên lõi → ✗
      const o57 = out(t, T.hikatte - 0.3, 0.8);
      const ka = prog(t, T.soko, T.soko + 0.9);
      if (ka > 0 && o57 < 1) {
        arrow(g, [[SX + 70, SY], [SX + 200, SY]], Math.min(1, ka * 1.6), { color: '@ink', w: 5 });
        if (ka > 0.6) arrow(g, [[SX + SR + 10, SY], [EX - ER - 20, SY]], (ka - 0.6) / 0.4 * (1 - o57), { color: '@dim', w: 4, dash: [10, 12] });
        cross(g, SX + SR + 36, SY, 26, prog(t, T.soko + 0.6, T.soko + 1.0), { color: '@ink', w: 8 });
      }
      g.save(); g.globalAlpha = 1 - o57;
      row(g, '見ている光は、ここから来たのではない', 140, 880, prog(t, T.mite, T.mite + 1.6), { size: 44 });
      g.restore();
      // 58 · bề mặt 5500度 + tia ra mắt
      const k58 = prog(t, T.hyomen, T.hyomen + 1.0);
      if (k58 > 0) {
        const pup = [EX - ER * 0.93, EY];
        [-0.28, 0, 0.28].forEach((a, i) => {
          const P = [SX + Math.cos(a) * SR, SY + Math.sin(a) * SR];
          ray(g, [P, [pup[0] - 6, pup[1] + (i - 1) * 14]], { nm: 'white', w: 5, k: prog(t, T.hyomen + 0.5 + i * 0.12, T.hyomen + 1.5 + i * 0.12), a: 0.9 });
        });
        row(g, '表面：およそ5500度', 140, 720, prog(t, T.do5500 - 0.2, T.do5500 + 1.1), { size: 48 });
        arrow(g, [[640, 700], [SX - Math.cos(0.8) * SR - 10, SY + Math.sin(0.8) * SR - 10]], prog(t, T.do5500, T.do5500 + 0.8), { color: '@ink', w: 3 });
        row(g, '太陽は、熱いから光っている', 140, 960, prog(t, T.atsui58, T.atsui58 + 1.4), { size: 52, mincho: true });
      }
      g.restore();
    }

    // ── 59 · ngọn nến ──
    if (t > T.rosoku - 0.3) {
      const kc = prog(t, T.rosoku, T.rosoku + 1.2), FX = 1250, FY = 700;
      candle(g, FX, FY, kc);
      flame(g, FX, FY, outCubic(kc), t);
      soot(g, FX, FY, prog(t, T.susu - 0.2, T.susu + 0.8), t);
      const r1 = row(g, '②　黄色：熱で輝く、すすの粒', 200, 430, prog(t, T.kiiro, T.kiiro + 1.5), { size: 44 });
      if (r1) { chip(g, 164, 416, 585, 13, prog(t, T.kiiro, T.kiiro + 0.6)); arrow(g, [[r1.x0 + r1.w + 14, 430], [FX - 62, FY - 120]], prog(t, T.susu, T.susu + 0.8), { color: '@ink', w: 3 }); }
      const r2 = row(g, '①　青：分子の階段の光', 200, 580, prog(t, T.aoi, T.aoi + 1.4), { size: 44 });
      if (r2) { chip(g, 164, 566, 470, 13, prog(t, T.aoi, T.aoi + 0.6)); arrow(g, [[r2.x0 + r2.w + 14, 580], [FX - 40, FY - 22]], prog(t, T.kaidan, T.kaidan + 0.8), { color: '@ink', w: 3 }); }
    }
  }
}
