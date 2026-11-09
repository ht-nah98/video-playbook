// g4 · 色は頭の中にある (p2 câu 129–131) — ERA eye, lỗ 'pupil' mờ. Kết hồi 6.
//  129 ba thanh tín hiệu của táo (cùng tỉ lệ g2) bay vào đầu trung tính lớn 「脳に届くのは、3つの信号の比率だけ」 → chữ 「赤」 hiện trong đầu + chip 656 「脳が『赤』をつくり出す」
//  130 hai bản thu nhỏ: trời (紫ではなく青) và dải 七色 (6 vạch); 「最後に決めているのは、目と頭」
//  131 「物理の世界：波長と強さだけ」; mascot ok (nói) bên phải; 「色は、頭の中にある」 (mincho 72, nửa trái) — suzu.
// Số: CONES / APPLE từ kit, ba thanh tính bằng code (đường nhạy cục bộ × APPLE) + must L > M > S. Màu có sắc chỉ qua chip / wlCss / spectrumStrip.
import { CONES, APPLE, lookup, must, clamp, prog, smooth, outCubic, ground, aperture, chip, spectrumStrip, ink, telop, title, arrow, figure, wlCss,
  cue, H, TAU } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
// đường nhạy S/M/L + tín hiệu của táo: GIỐNG HỆT g2 (cùng tỉ lệ)
const CONE = { S: [CONES.S, 22, 30], M: [CONES.M, 38, 42], L: [CONES.L, 42, 46] };
const sens = (nm, [p, sl, sr]) => Math.exp(-0.5 * ((nm - p) / (nm < p ? sl : sr)) ** 2);
const SIG = (() => { const r = {}; for (const k of ['S', 'M', 'L']) { let s = 0; for (let nm = 380; nm <= 780; nm += 5) s += sens(nm, CONE[k]) * APPLE(nm); r[k] = s; }
  const m = r.L; return { S: r.S / m, M: r.M / m, L: 1 }; })();
const BARS = [['S', 190], ['M', 280], ['L', 370]], BAR_BASE = 760, BAR_H = 200;
const HEAD0 = { x: 1000, y: 520, r: 190 }, HEAD1 = { x: 1090, y: 560, r: 150 };

/** Đầu người trung tính: skull + cổ + vai, lòng đầu hơi tối. */
function head(g, cx, cy, r, k = 1) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k); g.lineCap = 'round'; g.lineJoin = 'round';
  g.fillStyle = 'rgba(20,19,23,0.9)'; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.fill();
  g.strokeStyle = ink('@dim'); g.lineWidth = Math.max(4, r * 0.05);
  g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(cx - r * 0.38, cy + r * 0.93); g.lineTo(cx - r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx - r * 1.1, cy + r * 1.4, cx - r * 1.5, cy + r * 1.8);
  g.moveTo(cx + r * 0.38, cy + r * 0.93); g.lineTo(cx + r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx + r * 1.1, cy + r * 1.4, cx + r * 1.5, cy + r * 1.8); g.stroke();
  g.restore();
}
/** Nhóm trượt ra trái (rời khung bằng chuyển động) — vẽ khi t ∈ [a, b + 0.5]. */
function slide(g, t, a, b, draw, dx = -1200) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.5)); if (o >= 1) return;
  g.save(); g.globalAlpha = 1 - o; draw(); g.restore();
}
/** Bản thu nhỏ: mở từ tâm như một vệt sáng (clip elip lớn dần), khung mảnh. */
function thumb(g, x, y, w, h, k, draw) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), r = Math.hypot(w, h) * 0.62 * e;
  g.save(); g.beginPath(); g.ellipse(x + w / 2, y + h / 2, r * (w / Math.hypot(w, h)) * 1.25, r * (h / Math.hypot(w, h)) * 1.25, 0, 0, TAU); g.clip();
  draw(); g.restore();
  g.save(); g.strokeStyle = `rgba(154,149,140,${e})`; g.lineWidth = 2; g.strokeRect(x, y, w, h); g.restore();
}

export default class Atama {
  static ERA = 'eye';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g4-atama');
    this.START = L(129).start;
    this.FROM = Math.max(this.START - 1.2, L(128).end + 0.5);
    this.T = {
      l129: L(129).start, mitsu: w(129, '3つ'), hiritsu: w(129, '比率'), aka: w(129, '赤'), tsukuri: w(129, 'つくり出します'),
      l130: L(130).start, sora: w(130, '空'), nanairo: w(130, '七色'), me: w(130, '目'),
      l131: L(131).start, butsuri: w(131, '物理'), iro: w(131, '色'), end: L(131).end,
    };
    must(`${SIG.L > SIG.M && SIG.M > SIG.S && SIG.S < 0.2 * SIG.L}`, true);
    must(`'${CONES.S},${CONES.M},${CONES.L}'`, '420,534,564');
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.hiritsu - 0.1, 'telop'),                // 「脳に届くのは、3つの信号の比率だけ」
      cue(T.mitsu + 0.1, 'step', -3),               // ba tín hiệu bay vào đầu
      cue(T.sora, 'photo', -6),                     // bản thu nhỏ trời
      cue(T.nanairo, 'photo', -6),                  // bản thu nhỏ 七色
      cue(T.me, 'telop'),                           // 「最後に決めているのは、目と頭」
      cue(T.butsuri, 'step', -3),                  // 「物理の世界：…」
      cue(T.iro, 'aha'),                            // 「色は、頭の中にある」 (suzu)
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'eye');
    aperture(g, 'pupil', { y: 560, open: smooth(prog(t, F, F + 0.5)), glow: 0.5 });
    title(g, '色は頭の中にある', t, F + 0.3);

    // ── đầu: lớn giữa (129–130) → dời phải, nhỏ lại (131) nhường chỗ cho chữ và mascot ──
    const u131 = smooth(prog(t, T.butsuri - 0.2, T.butsuri + 0.9));
    const hx = lerp(HEAD0.x, HEAD1.x, u131), hy = lerp(HEAD0.y, HEAD1.y, u131), hr = lerp(HEAD0.r, HEAD1.r, u131);
    head(g, hx, hy, hr, smooth(prog(t, F + 0.1, F + 0.8)));
    // 「赤」 hiện trong đầu + chip 656 (ánh sáng = bước sóng; chữ vẫn trung tính)
    const ka = prog(t, T.aka, T.aka + 0.8);
    if (ka > 0) {
      telop(g, '赤', hx, hy + hr * 0.2, ka, { size: Math.round(hr * 0.5), mincho: true, align: 'center' });
      chip(g, hx + hr * 0.52, hy - hr * 0.36, 656, Math.max(10, hr * 0.07), prog(t, T.aka + 0.3, T.aka + 0.9));
    }

    // ── 129: ba thanh (cùng tỉ lệ g2) hiện từ FROM + 0.3, bay vào đầu ở 「3つ」 ──
    const kb = outCubic(prog(t, F + 0.3, F + 1.3)), fly = outCubic(prog(t, T.mitsu - 0.1, T.mitsu + 1.4));
    if (fly < 1) BARS.forEach(([key, x], i) => {
      const h = BAR_H * SIG[key] * kb, s = 1 - 0.75 * fly, a = 1 - smooth(prog(fly, 0.8, 1));
      const bx = lerp(x, HEAD0.x + (i - 1) * 46, fly), by = lerp(BAR_BASE - h / 2, HEAD0.y + 30, fly);
      g.save(); g.globalAlpha = a; g.fillStyle = key === 'L' ? ink('@ink') : ink('@dim');
      if (h > 0) { g.beginPath(); g.roundRect(bx - 28 * s, by - Math.max(h, 1) * s / 2, 56 * s, Math.max(h, 1) * s, 4); g.fill(); }
      g.restore();
      g.save(); g.globalAlpha = a; chip(g, bx, lerp(BAR_BASE + 26, HEAD0.y + 30, fly), CONES[key], 10 * s + 2, prog(t, F + 0.6 + i * 0.15, F + 1.1 + i * 0.15)); g.restore();
    });
    if (fly < 0.3) { g.save(); g.globalAlpha = 1 - fly / 0.3; g.strokeStyle = ink('@faint'); g.lineWidth = 3; g.beginPath(); g.moveTo(150, BAR_BASE + 1); g.lineTo(410, BAR_BASE + 1); g.stroke(); g.restore();
      telop(g, 'リンゴの光への反応', 150, BAR_BASE - BAR_H - 32, prog(t, F + 0.5, F + 1.3) * (1 - fly / 0.3), { size: 30, weight: 500, color: '@dim' }); }
    slide(g, t, T.l129 - 0.1, T.l130 - 0.1, () => {
      telop(g, '脳に届くのは、3つの信号の比率だけ', 140, 262, prog(t, T.hiritsu - 0.3, T.hiritsu + 1.3), { size: 48 });
    });
    slide(g, t, T.l129 - 0.1, T.me - 0.5, () => {
      telop(g, '脳が「赤」をつくり出す', 140, 950, prog(t, T.tsukuri - 0.3, T.tsukuri + 1.2), { size: 52, mincho: true });
    });

    // ── 130: hai bản thu nhỏ (trời, 七色) → đầu; 「最後に決めているのは、目と頭」 ──
    slide(g, t, T.sora - 0.2, T.l131 - 0.1, () => {
      const k1 = prog(t, T.sora - 0.1, T.sora + 0.9), k2 = prog(t, T.nanairo - 0.1, T.nanairo + 0.9);
      thumb(g, 150, 300, 600, 170, k1, () => {                                  // bầu trời: xanh (ánh sáng 470–490)
        const gr = g.createLinearGradient(0, 300, 0, 470); gr.addColorStop(0, wlCss(472, 0.55)); gr.addColorStop(1, wlCss(490, 0.2));
        g.fillStyle = gr; g.fillRect(150, 300, 600, 170);
      });
      telop(g, '空は、紫ではなく青', 150, 524, prog(t, T.sora + 0.2, T.sora + 1.2), { size: 36 });
      thumb(g, 150, 590, 600, 70, k2, () => {                                   // dải 380–780 + 6 vạch ranh giới 七色
        spectrumStrip(g, 150, 590, 600, 70, { from: 400, to: 700 });
        g.fillStyle = 'rgba(11,11,14,0.9)'; for (const nm of [450, 480, 500, 570, 590, 620]) g.fillRect(150 + 600 * (nm - 400) / 300 - 2, 590, 4, 70);
      });
      telop(g, '虹は、七色と数える', 150, 724, prog(t, T.nanairo + 0.2, T.nanairo + 1.2), { size: 36 });
      arrow(g, [[770, 385], [814, 470]], prog(t, T.sora + 0.7, T.sora + 1.3), { color: '@dim', w: 4, head: 14 });
      arrow(g, [[770, 625], [814, 560]], prog(t, T.nanairo + 0.7, T.nanairo + 1.3), { color: '@dim', w: 4, head: 14 });
    });
    slide(g, t, T.me - 0.3, T.l131 - 0.1, () => {
      telop(g, '最後に決めているのは、目と頭', 140, 950, prog(t, T.me - 0.1, T.me + 1.6), { size: 52, mincho: true });
    });

    // ── 131: 物理 / 色は頭の中 + mascot ok (nói) ──
    telop(g, '物理の世界：波長と強さだけ', 140, 262, prog(t, T.butsuri, T.butsuri + 1.3), { size: 48 });
    telop(g, '色は、頭の中にある', 140, 560, prog(t, T.iro - 0.1, T.iro + 1.4), { size: 72, mincho: true });
    const km = prog(t, T.butsuri, T.butsuri + 0.7);
    if (km > 0) figure(g, 'ok', 1640, H, 640, km, { t, flip: true });
  }
}
