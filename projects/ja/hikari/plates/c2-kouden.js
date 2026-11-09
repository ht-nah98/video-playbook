// c2 · 光電効果の謎 (p2 câu 23–28). ERA lab. Khe 'slit' ở y = 580, chùm tới một tấm kim loại xám (「ある金属」, không tên) ở x ≈ 1110.
// Màu chùm theo lời: trắng → đỏ (PH_RED) → tím (PH_VIO) → đỏ; hai núm trung tính 明るさ / 波長 quay theo. Electron = chấm 生成り bật ra bên TRÁI tấm.
//  l23 「19世紀の終わり」「波では説明できない現象」 · l24 electron bật ra, 「光電効果」 · l25 đỏ + 明るさ×10 → KHÔNG electron (mascot startled)
//  l26 tím yếu → electron bật NGAY · l27 dải chuẩn + ngưỡng NA_EDGE, gạch 「明るくすれば電子が出る」 → 「波長で決まる」, 「数」 · l28 treo câu hỏi.
import { C, H, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, aperture, shaft, ray, spectrumStrip, chip, arrow, cross, telop, wrong,
  strike, title, plate, figure, measure, cue, eV, fmt, NA_EDGE, JP, MIN } from '../kit.js';

const PH_RED = 650, PH_VIO = 400;
must(`'${fmt(eV(PH_RED), 1)}'`, '1.9'); must(`'${fmt(eV(PH_VIO), 1)}'`, '3.1');
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const Y0 = 580, PX = 1110, PL = PX - 24;                    // khe, tâm tấm, mặt trái tấm
const lerp = (a, b, u) => a + (b - a) * u;
/** Nội suy mượt qua các mốc [[t, v], …] (giữ đầu mút). */
const kf = (t, K) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t <= K[i][0]) return lerp(K[i - 1][1], K[i][1], smooth(clamp((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0] || 1)))); return K.at(-1)[1]; };

function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return null;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  return (o.wrong ? wrong : telop)(g, s, x, y, k, o);
}
/** Núm quay trung tính: v 0..1 → góc −130°…+130°. */
function knob(g, x, y, label, v, k) {
  if (k <= 0) return;
  const a0 = -2.27, a = a0 + (-2 * a0) * clamp(v), r = 46;
  g.save(); g.strokeStyle = C.dim; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
  for (let i = 0; i <= 8; i++) { const b = a0 + (-2 * a0) * i / 8 - Math.PI / 2; g.beginPath(); g.moveTo(x + Math.cos(b) * (r + 6), y + Math.sin(b) * (r + 6)); g.lineTo(x + Math.cos(b) * (r + 14), y + Math.sin(b) * (r + 14)); g.stroke(); }
  g.strokeStyle = C.text; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a) * (r - 8), y - Math.cos(a) * (r - 8)); g.stroke();
  g.restore();
  telop(g, label, x, y + r + 54, k, { size: 34, align: 'center' });
}

export default class Kouden {
  static ERA = 'lab';
  static IMAGES = {};
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2-kouden');
    this.START = L(23).start;
    this.FROM = Math.max(this.START - 1.2, L(22).end + 0.5);
    const T = this.T = {
      l23: this.START, seiki: w(23, '19世紀'), setsumei: w(23, '説明'),
      l24: L(24).start, kinzoku: w(24, '金属'), denshi: w(24, '電子'), kouden: w(24, '光電'),
      l25: L(25).start, akai: w(25, '赤い'), donna: w(25, 'どんな'), akaruku: w(25, '明るく'), ko1: w(25, '1個'), end25: L(25).end,
      l26: L(26).start, murasaki: w(26, '紫'), yowakute: w(26, '弱くて'), sugu: w(26, 'すぐ'),
      l27: L(27).start, hacho: w(27, '波長'), mijikaku: w(27, '短く'), tsuyoku: w(27, '強く'), kazu: w(27, '数'),
      l28: L(28).start, akarui: w(28, '明るい'), naze: w(28, 'なぜ'), end: L(28).end,
    };
    // electron bật ra: [từ, tới, khoảng cách giữa hai hạt] — trắng (24), tím yếu (26), tím mạnh (27)
    this.EM = [[T.denshi, T.akai, 0.22], [T.sugu, T.tsuyoku, 0.34], [T.tsuyoku, T.l28, 0.1]];
    this.COL = [['white', 0], [PH_RED, T.akai], [PH_VIO, T.murasaki], [PH_RED, T.l28]];
    // độ sáng chùm (0..1) theo lời; núm 波長 theo λ
    this.BR = [[T.l23, 0.4], [T.akaruku - 0.1, 0.4], [T.akaruku + 0.9, 1], [T.murasaki - 0.2, 1], [T.murasaki + 0.4, 0.12], [T.tsuyoku, 0.12], [T.tsuyoku + 0.8, 1], [T.l28 - 0.2, 1]];
    this.NM = [[T.akai - 0.2, 550], [T.akai + 0.4, PH_RED], [T.murasaki - 0.2, PH_RED], [T.murasaki + 0.5, PH_VIO], [T.l28 - 0.1, PH_VIO], [T.l28 + 0.5, PH_RED]];
  }
  sfx() {
    const T = this.T;
    return [cue(T.seiki, 'page', -6), cue(T.setsumei, 'question', -6), cue(T.kinzoku, 'tick', -4), cue(T.denshi, 'electron'), cue(T.akai, 'beam'),
      cue(T.akaruku, 'tick', -4), cue(T.ko1, 'fail', -6), cue(T.murasaki, 'beam'), cue(T.sugu, 'electron'), cue(T.hacho, 'spectrum'),
      cue(T.mijikaku + 0.4, 'step', -4), cue(T.tsuyoku + 0.4, 'fail', -4), cue(T.akarui, 'question', -4), cue(T.naze, 'tick', -4)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0 });
    const kBeam = prog(t, F + 0.1, F + 1.5), br = kf(t, this.BR);

    // ── tấm kim loại (hiện khi chùm chạm) ──
    const kPl = prog(t, F + 1.2, F + 1.9);
    if (kPl > 0) {
      const dx = (1 - outCubic(kPl)) * 60;
      g.save(); g.translate(dx, 0); g.globalAlpha = kPl;
      const gr = g.createLinearGradient(PX - 24, 0, PX + 24, 0); gr.addColorStop(0, '#4A4743'); gr.addColorStop(0.5, '#34322F'); gr.addColorStop(1, '#232120');
      g.fillStyle = gr; g.fillRect(PX - 24, 410, 48, 340);
      g.strokeStyle = C.dim; g.lineWidth = 2; g.strokeRect(PX - 24, 410, 48, 340);
      g.fillStyle = 'rgba(237,232,223,0.16)'; g.fillRect(PX - 22, 410, 5, 340);
      g.restore();
    }
    // ── chùm: các đoạn màu cross-fade ──
    const pw = this.COL.map(([nm, t0], i) => smooth(prog(t, t0, t0 + 0.5)) * (i < this.COL.length - 1 ? 1 - smooth(prog(t, this.COL[i + 1][1], this.COL[i + 1][1] + 0.5)) : 1));
    shaft(g, 92, Y0, PL, Y0 - 55, PL, Y0 + 55, { a: 0.07, k: kBeam, t, dust: 40, seed: 5, spot: false });
    this.COL.forEach(([nm], i) => {
      if (pw[i] <= 0.01) return;
      const vio = nm === PH_VIO, w = Math.round(vio ? 4 + 13 * Math.max(0, br - 0.12) / 0.88 : 5 + 12 * (br - 0.4) / 0.6 + 2);
      ray(g, [[98, Y0], [PL, Y0]], { nm, w: Math.max(4, w), k: kBeam, a: pw[i] * (vio ? 0.45 + 0.55 * br : 1), glow: 0.8 + 1.2 * br });
    });
    if (kBeam >= 1) { const nmNow = t < T.akai ? 'white' : t < T.murasaki ? PH_RED : t < T.l28 ? PH_VIO : PH_RED;
      ray(g, [[PL - 6, Y0], [PL, Y0]], { nm: nmNow, w: 4, a: 0.9 * (0.4 + 0.6 * br), glow: 2 }); }

    // ── electron bật khỏi mặt trái tấm ──
    g.save();
    let n = 0;
    for (const [a, b, dt] of this.EM) for (let ti = a; ti < b; ti += dt, n++) {
      const tau = t - ti; if (tau < 0 || tau > 1.3) continue;
      const h1 = hash(ti * 7.1 + 1), h2 = hash(ti * 3.3 + 2), ang = (h2 - 0.5) * 1.5, v = 330 + 110 * h1;
      const x = PL - v * Math.cos(ang) * tau, y = Y0 + (h1 - 0.5) * 220 + v * Math.sin(ang) * tau, al = Math.min(1, tau * 12) * (1 - smooth(clamp((tau - 0.8) / 0.5)));
      for (let j = 0; j < 4; j++) { const tj = Math.max(0, tau - j * 0.035); g.fillStyle = `rgba(237,232,223,${al * (0.5 - j * 0.12)})`; g.beginPath(); g.arc(PL - v * Math.cos(ang) * tj, y - v * Math.sin(ang) * (tau - tj), 7 - j, 0, TAU); g.fill(); }
      g.fillStyle = `rgba(237,232,223,${al})`; g.beginPath(); g.arc(x, y, 8, 0, TAU); g.fill();
    }
    g.restore();

    title(g, '光電効果の謎', t, F + 0.3);
    telop(g, 'ある金属', PX, 385, prog(t, T.kinzoku, T.kinzoku + 0.6), { align: 'center' });
    // ── hai núm ──
    const kn = prog(t, T.denshi - 0.5, T.denshi + 0.2);
    knob(g, 1330, 280, '明るさ', kf(t, this.BR.map(([a, v]) => [a, v])), kn);
    knob(g, 1630, 280, '波長', kf(t, this.NM.map(([a, v]) => [a, (v - PH_VIO) / (PH_RED - PH_VIO)]).concat([[T.end, 1]])), kn);

    // ── l23 ──
    const o23 = out(t, T.l24 + 0.9, 0.7);
    if (o23 < 1) { g.save(); g.translate(-1100 * o23, 0);
      row(g, '19世紀の終わり', 140, 330, prog(t, T.seiki, T.seiki + 0.8), { size: 56, mincho: true });
      row(g, '波では説明できない現象', 140, 430, prog(t, T.setsumei - 0.1, T.setsumei + 1.0)); g.restore(); }
    // ── l24: tiêu đề hiện tượng ──
    row(g, '光電効果', 140, 330, prog(t, T.kouden, T.kouden + 0.9), { size: 64, mincho: true });

    // ── l25: ×10 và KHÔNG electron; mascot ──
    const o25 = out(t, T.murasaki - 0.1, 0.6);
    if (o25 < 1) { g.save(); g.translate(-1100 * o25, 0);
      row(g, '明るさ×10', 140, 440, prog(t, T.akaruku, T.akaruku + 0.8));
      row(g, '電子は1個も出ない', 140, 700, prog(t, T.ko1 - 0.1, T.ko1 + 0.9), { size: 48 });
      g.restore(); }
    cross(g, PL - 70, Y0, 36, prog(t, T.ko1, T.ko1 + 0.5) * (1 - o25), { color: '@ink', w: 9 });
    const km = prog(t, T.donna - 0.3, T.donna + 0.5), em = out(t, T.murasaki + 0.1, 0.7);
    if (km > 0 && em < 1) { g.save(); g.translate(0, 700 * em); figure(g, 'startled', 1680, H, 600, km, { talk: false }); g.restore(); }

    // ── l26 ──
    const o26 = out(t, T.hacho + 0.3, 0.7);
    if (o26 < 1) { g.save(); g.translate(-1100 * o26, 0);
      row(g, '弱くても、すぐに飛び出す', 140, 700, prog(t, T.yowakute, T.yowakute + 1.1), { size: 48 }); g.restore(); }

    // ── l27–28: dải chuẩn + ngưỡng ──
    const ks = prog(t, T.hacho, T.hacho + 0.9);
    if (ks > 0) {
      const X = spectrumStrip(g, 360, 790, 1200, 56, { ticks: [400, 500, 600, 700], k: ks }), xe = X(NA_EDGE);
      const kt = prog(t, T.mijikaku - 0.2, T.mijikaku + 0.7);
      if (kt > 0) {
        g.save(); g.fillStyle = 'rgba(11,11,14,0.74)'; g.fillRect(xe, 790, (1560 - xe) * outCubic(kt), 56); g.restore();
        g.save(); g.setLineDash([8, 8]); g.strokeStyle = C.text; g.lineWidth = 3; g.beginPath(); g.moveTo(xe, 752); g.lineTo(xe, 880); g.stroke(); g.restore();
        arrow(g, [[xe - 10, 740], [xe - 260, 740]], kt, { color: '@ink', w: 5 });
      }
      const nmNow = t < T.l28 ? PH_VIO : PH_RED; chip(g, X(nmNow), 770, nmNow, 12, ks);
    }
    const o27 = out(t, T.tsuyoku - 0.15, 0.6);
    if (T.hacho - 0.1 < t && o27 < 1) { g.save(); g.translate(-1100 * o27, 0);
      row(g, 'この長さより短い波長だけ', 140, 690, prog(t, T.mijikaku - 0.3, T.mijikaku + 1.2)); g.restore(); }
    const o28 = out(t, T.akarui - 0.2, 0.6);
    if (o28 < 1) { g.save(); g.translate(-1100 * o28, 0);
      const bx = row(g, '明るくすれば電子が出る', 140, 430, prog(t, T.tsuyoku, T.tsuyoku + 0.6), { wrong: true });
      if (bx) strike(g, bx, prog(t, T.tsuyoku + 0.5, T.tsuyoku + 0.9));
      row(g, '波長で決まる', 140, 505, prog(t, T.tsuyoku + 0.9, T.tsuyoku + 1.7), { size: 52, mincho: true });
      g.restore(); }
    const o5 = out(t, T.akarui - 0.2, 0.6), i5 = prog(t, T.kazu, T.kazu + 1.2);
    if (i5 > 0 && o5 < 1) { g.save(); g.translate(-1100 * o5, 0);
      row(g, '明るさで増えるのは、電子の『数』', 140, 690, i5); g.restore(); }
    row(g, '明るい赤は、なぜだめ？', 140, 430, prog(t, T.akarui + 0.1, T.akarui + 1.2), { size: 56, mincho: true });
    cross(g, PL - 70, Y0, 36, prog(t, T.naze, T.naze + 0.5), { color: '@ink', w: 9 });
  }
}
