// f2 · 白い光をほどく (p2 câu 89–94). ERA darkroom, lỗ 'window' (y 520 — lăng kính nằm cao hơn lỗ, quạt màu đi gần ngang).
//  89  色ごと     chùm trắng vào lăng kính (kính BK7, n(λ) Cauchy) — 「色ごとに、速さが少しちがう」
//  90  紫 / 分散  quạt màu: tím lệch NHIỀU nhất, đỏ ít nhất — góc phóng ×K quanh 550 nm, ghi 「角度は強調」
//  91  プリズム   '@dim' 「色は、プリズムがつける？（昔の考え）」
//  92  1666年     tấm chắn có khe cho MỘT màu (589) qua → lăng kính thứ hai (úp ngược: bẻ lên trên)
//  93  変わらない  tia một màu qua lăng kính hai VẪN một màu (chỉ lệch hướng)
//  94  混ざった   ảnh newton-crucis (想像画) + 「白い光は、すべての色が混ざったもの」「プリズムは、それをほどいていただけ」
// Hình học tia (vào/ra hai mặt lăng kính) tính bằng Snell vector — KHÔNG vẽ tay; nGlass (kit thiếu) = BK7 Cauchy, chỉ cho hình học.
import { C, W, H, APT, clamp, prog, lookup, must, smooth, outCubic, TAU, wlCss, ground, aperture, ray, shaft, spot, chip,
  telop, title, actTimes, photo, imgs, cue, wl2rgb } from '../kit.js';

const nGlass = nm => 1.5046 + 0.0042 / (nm / 1000) ** 2;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const norm = a => { const l = Math.hypot(a[0], a[1]); return [a[0] / l, a[1] / l]; };
function tri(c, R, psi) {                                                      // tam giác đều tâm c, bán kính ngoại tiếp R; psi = xoay (rad)
  return [[0, -1], [Math.cos(Math.PI / 6), 0.5], [-Math.cos(Math.PI / 6), 0.5]].map(p => {
    const cs = Math.cos(psi), sn = Math.sin(psi); return [c[0] + R * (p[0] * cs - p[1] * sn), c[1] + R * (p[0] * sn + p[1] * cs)];
  });
}
function hit(O, d, A, B) {
  const e = sub(B, A), den = d[0] * e[1] - d[1] * e[0]; if (Math.abs(den) < 1e-9) return null;
  const w = sub(A, O), t = (w[0] * e[1] - w[1] * e[0]) / den, u = (w[0] * d[1] - w[1] * d[0]) / den;
  return t > 1e-6 && u >= 0 && u <= 1 ? t : null;
}
function refr(d, n, n1, n2) {                                                  // n: pháp tuyến NGƯỢC chiều d
  const eta = n1 / n2, c = -dot(n, d), k = 1 - eta * eta * (1 - c * c); if (k < 0) return null;
  const r = eta * c - Math.sqrt(k); return [eta * d[0] + r * n[0], eta * d[1] + r * n[1]];
}
function trace(O, d, P, nm) {                                                  // vào mặt 1, ra mặt 2: { p1, p2, d1, d2 }
  const F = [[P[0], P[1]], [P[1], P[2]], [P[2], P[0]]], cen = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  const nOut = f => { const e = norm(sub(f[1], f[0])); let n = [e[1], -e[0]]; const mid = [(f[0][0] + f[1][0]) / 2, (f[0][1] + f[1][1]) / 2]; return dot(n, sub(mid, cen)) < 0 ? [-n[0], -n[1]] : n; };
  const first = (o, dd, skip) => { let b = null; F.forEach((f, i) => { if (i === skip) return; const t = hit(o, dd, f[0], f[1]); if (t != null && (!b || t < b.t)) b = { t, i }; }); return b; };
  const b1 = first(O, d, -1); if (!b1) throw new Error('f2: tia không chạm lăng kính');
  const p1 = [O[0] + d[0] * b1.t, O[1] + d[1] * b1.t], d1 = refr(d, nOut(F[b1.i]), 1, nGlass(nm)); if (!d1) throw new Error('f2: phản xạ toàn phần ở mặt 1');
  const b2 = first(p1, d1, b1.i); if (!b2) throw new Error('f2: tia trong lăng kính không ra');
  const p2 = [p1[0] + d1[0] * b2.t, p1[1] + d1[1] * b2.t], n2 = nOut(F[b2.i]), d2 = refr(d1, [-n2[0], -n2[1]], nGlass(nm), 1);
  if (!d2) throw new Error(`f2: phản xạ toàn phần ở mặt 2 (${nm} nm)`);
  return { p1, p2, d1, d2 };
}
const ang = d => Math.atan2(d[1], d[0]);
const dir = a => [Math.cos(a), Math.sin(a)];

// ── hình học cố định ──
const O = [APT.x, 520], C1 = [340, 400], P1 = tri(C1, 130, 0), BX = 1000, K = 9;
const AIM = norm(sub([C1[0] - 20, 360], O));
const a550 = ang(trace(O, AIM, P1, 550).d2);
const NMS = Array.from({ length: 25 }, (_, i) => 400 + 12.5 * i);
const LAMS = nm => { const tr = trace(O, AIM, P1, nm); return { tr, a: a550 + (ang(tr.d2) - a550) * K }; };   // góc phóng ×K quanh 550
const fanEnd = (nm, x) => { const { tr, a } = LAMS(nm), d = dir(a); return [x, tr.p2[1] + (x - tr.p2[0]) * Math.tan(a)]; };
const PICK = 589;                                                                // sợi được chọn qua khe
const slitY = fanEnd(PICK, BX)[1];
const C2 = [1270, slitY + (1270 - BX) * Math.tan(LAMS(PICK).a) + 6], P2 = tri(C2, 105, Math.PI);
const dPick = dir(LAMS(PICK).a), slitPt = [BX + 12, slitY + 12 * Math.tan(LAMS(PICK).a)];
const T2 = trace(slitPt, dPick, P2, PICK), SCR = 1560, endY = T2.p2[1] + (SCR - T2.p2[0]) * Math.tan(ang(T2.d2));
// kiểm: tím lệch xuống nhiều hơn đỏ (nghĩa là góc d2 của 404.7 > của 700); sợi qua lăng kính hai không tách thêm (một nm duy nhất)
must(`${ang(trace(O, AIM, P1, 404.7).d2) > ang(trace(O, AIM, P1, 700).d2)}`, true);
must(`${endY > 120 && endY < 640 && T2.p2[0] < SCR}`, true);

function prism(g, P, k, a = 1) {
  if (k <= 0) return;
  const c = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], e = outCubic(clamp(k));
  g.save(); g.translate(c[0], c[1]); g.scale(e, e); g.translate(-c[0], -c[1]);
  g.beginPath(); P.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath();
  const gr = g.createLinearGradient(P[1][0], P[0][1], P[2][0], P[2][1]); gr.addColorStop(0, `rgba(200,208,216,${0.16 * a})`); gr.addColorStop(1, `rgba(150,158,166,${0.07 * a})`);
  g.fillStyle = gr; g.fill(); g.lineJoin = 'round'; g.strokeStyle = `rgba(237,232,223,${0.85 * a})`; g.lineWidth = 4; g.stroke(); g.restore();
}

export default class F2 {
  static ERA = 'darkroom';
  static IMAGES = imgs('newton-crucis');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2-hodoku');
    this.START = L(89).start;
    this.FROM = Math.max(this.START - 1.2, L(88).end + 0.5);
    this.T = {
      title: this.FROM + 0.3,
      l89: L(89).start, irogoto: w(89, '色ごと'),
      l90: L(90).start, murasaki: w(90, '紫'), bunsan: w(90, '分散'), e90: L(90).end,
      l91: L(91).start, prismT: w(91, 'プリズム'),
      l92: L(92).start, y1666: w(92, '1666年'), toridashi: w(92, '取り出した'), mou: w(92, 'もう'),
      l93: L(93).start, iro93: w(93, '色'), kawari: w(93, '変わりませんでした'),
      l94: L(94).start, mazatta: w(94, '混ざった'), hodoite: w(94, 'ほどいて'), end: L(94).end,
    };
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.l89 + 0.1, 'glass'), cue(T.irogoto, 'step'),
      cue(T.murasaki, 'spectrum'), cue((T.murasaki + T.bunsan) / 2, 'step', -8), cue(T.bunsan, 'telop'), cue(T.prismT + 0.1, 'glass', -8),
      cue(T.y1666, 'step'), cue(T.toridashi + 0.2, 'hole', -4), cue(T.mou + 0.15, 'glass'),
      cue(T.kawari + 0.2, 'aha', -4), cue(T.mazatta - 0.05, 'photo'), cue(T.hodoite, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'window', { y: O[1], open: prog(t, F + 0.3, F + 1.0) });
    const kBeam = prog(t, F + 0.5, F + 1.3), kPr = prog(t, F + 0.5, F + 1.1);

    // lăng kính 1 + chùm trắng vào
    prism(g, P1, kPr);
    shaft(g, O[0], O[1], P1[0][0] - 60, 372, P1[0][0] - 60, 424, { a: 0.07, k: kBeam, t, dust: 22, spot: false, seed: 5 });
    const tr0 = trace(O, AIM, P1, 550);
    ray(g, [O, tr0.p1], { nm: 'white', w: 6, k: kBeam });
    if (kBeam >= 1) ray(g, [tr0.p1, tr0.p2], { nm: 'white', w: 5, k: prog(t, F + 1.2, F + 1.6), a: 0.85 });
    telop(g, 'プリズム', 210, 560, prog(t, T.l89 + 0.2, T.l89 + 0.8), { size: 32, weight: 500, color: '@dim' });

    // quạt màu (câu 90 →): k bay từ p2; sau khi chặn (92) chỉ còn sợi chọn sáng
    const kFan = prog(t, T.murasaki - 0.1, T.murasaki + 1.3);
    const blocked = prog(t, T.toridashi, T.toridashi + 0.6);
    if (kFan > 0) {
      for (const nm of NMS) {
        const { tr, a } = LAMS(nm), L = (BX - 12 - tr.p2[0]) / Math.cos(a), pick = Math.abs(nm - PICK) < 6.3;
        const al = 0.5 * (1 - 0.65 * blocked * (pick ? 0 : 1));
        ray(g, [tr.p2, [tr.p2[0] + Math.cos(a) * L, tr.p2[1] + Math.sin(a) * L]], { nm, w: 4, k: kFan, a: al, glow: 0.5 });
      }
      telop(g, '角度は強調', 760, 690, prog(t, T.murasaki + 0.8, T.murasaki + 1.4), { size: 30, weight: 500, color: '@dim' });
    }

    // tấm chắn có khe + lăng kính 2 + tia một màu
    const kB = prog(t, T.toridashi - 0.1, T.toridashi + 0.6);
    if (kB > 0) {
      const dy = (1 - outCubic(kB)) * -420, gap = 20;
      g.save(); g.translate(0, dy);
      g.fillStyle = 'rgba(20,19,23,0.96)'; g.fillRect(BX - 12, 250, 24, slitY - gap - 250); g.fillRect(BX - 12, slitY + gap, 24, 660 - slitY - gap);
      g.strokeStyle = 'rgba(237,232,223,0.7)'; g.lineWidth = 3; g.strokeRect(BX - 12, 250, 24, slitY - gap - 250); g.strokeRect(BX - 12, slitY + gap, 24, 660 - slitY - gap);
      g.restore();
    }
    const kP2 = prog(t, T.mou - 0.1, T.mou + 0.6);
    const kPick = prog(t, T.toridashi + 0.3, T.toridashi + 1.0);
    if (kPick > 0) ray(g, [[BX + 12, slitPt[1]], slitPt, T2.p1], { nm: PICK, w: 5, k: kPick });
    prism(g, P2, kP2);
    if (kP2 > 0) {
      const kIn = prog(t, T.mou + 0.4, T.mou + 0.9), kOut = prog(t, T.kawari - 0.9, T.kawari + 0.3);
      ray(g, [T2.p1, T2.p2], { nm: PICK, w: 5, k: kIn });
      if (kOut > 0) {
        ray(g, [T2.p2, [SCR, endY]], { nm: PICK, w: 5, k: kOut });
        g.save(); g.fillStyle = 'rgba(30,28,25,0.9)'; g.fillRect(SCR, endY - 90, 10, 180); g.strokeStyle = C.dim; g.lineWidth = 2; g.strokeRect(SCR, endY - 90, 10, 180); g.restore();
        if (kOut >= 1) { spot(g, SCR - 4, endY, 70, { nm: PICK, a: 0.55 }); chip(g, SCR - 20, endY, PICK, 12, prog(t, T.kawari, T.kawari + 0.4)); }
      }
    }

    // ── chữ (hàng dưới): trượt ra trái khi sang ý mới ──
    const row = (a, out, y, parts, o) => { const f = out == null ? 0 : prog(t, out, out + 0.45); if (f >= 1) return;     // rút bằng mờ, không trượt qua tường 雨戸
      g.save(); g.globalAlpha = 1 - f; telop(g, parts, 140, y, prog(t, a, a + 0.8), o); g.restore(); };
    row(T.irogoto, T.murasaki - 0.1, 780, '色ごとに、速さが少しちがう', { size: 52 });
    row(T.murasaki + 0.1, T.l91 - 0.1, 780, '紫や青は大きく、赤は小さく曲がる', { size: 44 });
    row(T.bunsan - 0.1, T.l91 - 0.1, 890, '分散', { size: 76, mincho: true });
    row(T.prismT - 0.1, T.l92 - 0.1, 800, '色は、プリズムがつける？（昔の考え）', { size: 44, color: '@dim' });
    row(T.y1666 - 0.1, T.l94 - 0.1, 780, '1666年　ニュートン', { size: 56, mincho: true });
    row(T.iro93, T.l94 - 0.1, 890, '色は、もう変わらない', { size: 60, mincho: true });
    row(T.mazatta - 0.2, null, 780, '白い光は、すべての色が混ざったもの', { size: 46 });
    row(T.hodoite - 0.1, null, 890, 'プリズムは、それをほどいていただけ', { size: 54, mincho: true });
    if (t > T.mazatta - 0.1) photo(g, 'newton-crucis', 1180, 640, 270, prog(t, T.mazatta - 0.1, T.mazatta + 0.9), { labelSize: 30, align: 'right' });

    title(g, '白い光をほどく', t, T.title);
  }
}
