// f1 · 屈折 (p2 câu 85–88). Mở hồi 5, ERA darkroom, lỗ 'window'. Mọi mốc theo CHỮ (w(i,'từ')).
//  85  空気から水へ…  bể nước (nửa dưới) + chùm trắng xiên: gãy ở mặt nước theo Snell n(589); khối kính nhỏ cũng gãy; 「屈折（中学1年の理科）」
//  86  速さが違う      mặt sóng (vạch vuông góc tia) vào nước thì khít lại λ/n; 「水の中では、光は25%ほど遅くなる」
//  87  車              xe nhìn từ trên vào 「砂地」: bánh vào trước chậm lại → xe quay về phía bánh chậm (mô phỏng 2 bánh, tất định)
//  88  垂直            quay lại tia nước: cung góc tới / khúc xạ + cốc 麦茶 với đũa gãy
// Chiết suất kính (không có trong kit): NGLASS chỉ dùng cho hình học (không hiện thành chữ).
import { C, W, H, APT, FLOOR, clamp, prog, lookup, must, smooth, outCubic, hash, TAU, nWater, wlCss, ground, aperture, ray, shaft, spot,
  telop, title, actCard, actCues, actTimes, angleArc, arrow, cue } from '../kit.js';

const NGLASS = 1.5;
const unit = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
// khúc xạ Snell: tia từ hole tới điểm P trên mặt ngang y = P[1]; trả về góc tới / góc khúc xạ (rad, so với pháp tuyến đứng) và điểm cuối ở y = yEnd
function snell(P, n, yEnd) {
  const d = unit([APT.x, APT.y], P), i = Math.atan2(d[0], d[1]), r = Math.asin(Math.sin(i) / n);
  return { i, r, end: [P[0] + (yEnd - P[1]) * Math.tan(r), yEnd] };
}
const SURF = 640, TANK = { x0: 200, x1: 760, bot: 930 }, GLASS = { x0: 820, x1: 1040, bot: 800 };
const P1 = [480, SURF], P2 = [870, SURF];
const nW = nWater(589);
const S1 = snell(P1, nW, TANK.bot - 20), S2 = snell(P2, NGLASS, GLASS.bot - 10);
must(`${Math.round((1 - 1 / nW) * 100)}`, 25);                               // 「25%ほど遅く」
must(`${S1.r < S1.i && S2.r < S2.i}`, true);                                  // vào môi trường chậm: lại gần pháp tuyến

// ── xe vào cát (mô phỏng hai bánh trước, dt cố định → tất định) ──
const PNL = { x0: 1100, x1: 1800, y0: 250, y1: 650, yb: 450 };
const CAR = (() => {
  const vS = 1 / nW, ax = 32, dt = 0.01, sp = 150, trail = [];
  let F = [1215, 262], ph = 50 * Math.PI / 180;
  for (let n = 0; n < 900; n++) {
    const h = [Math.sin(ph), Math.cos(ph)], a = [-Math.cos(ph), Math.sin(ph)];
    const A = [F[0] + a[0] * ax, F[1] + a[1] * ax], B = [F[0] - a[0] * ax, F[1] - a[1] * ax];
    trail.push({ F: F.slice(), ph, A, B });
    if (F[1] > PNL.y1 - 40 || F[0] > PNL.x1 - 50) break;
    const vA = A[1] > PNL.yb ? vS : 1, vB = B[1] > PNL.yb ? vS : 1;
    ph -= (vB - vA) / (2 * ax) * sp * dt;
    const vc = (vA + vB) / 2 * sp * dt; F = [F[0] + h[0] * vc, F[1] + h[1] * vc];
  }
  return trail;
})();
must(`${CAR[CAR.length - 1].ph < CAR[0].ph - 0.1}`, true);                     // xe quay về phía bánh chậm (gần pháp tuyến hơn)

function car(g, c) {
  const h = [Math.sin(c.ph), Math.cos(c.ph)], a = [-Math.cos(c.ph), Math.sin(c.ph)], ctr = [c.F[0] - h[0] * 58, c.F[1] - h[1] * 58];
  g.save(); g.translate(ctr[0], ctr[1]); g.rotate(Math.atan2(h[1], h[0]) - Math.PI / 2);
  g.fillStyle = 'rgba(26,24,21,0.95)'; g.strokeStyle = C.text; g.lineWidth = 4; g.beginPath(); g.roundRect(-34, -62, 68, 124, 14); g.fill(); g.stroke();
  g.fillStyle = C.text; for (const [x, y] of [[-34, 40], [34, 40], [-34, -40], [34, -40]]) g.fillRect(x - 8, y - 14, 16, 28);
  g.strokeStyle = C.dim; g.lineWidth = 3; g.beginPath(); g.roundRect(-22, -30, 44, 34, 6); g.stroke();
  g.restore();
}

// mặt sóng dọc tia (hole → P → end): trong không khí cách λ, trong nước cách λ/n và chậm n lần
function fronts(g, t, t0, k, Pa, Pb, Pe, n) {
  if (k <= 0) return;
  const dA = unit(Pa, Pb), dW = unit(Pb, Pe), L1 = Math.hypot(Pb[0] - Pa[0], Pb[1] - Pa[1]), L2 = Math.hypot(Pe[0] - Pb[0], Pe[1] - Pb[1]);
  const lam = 56, V = 120, ph = (t - t0) * V;
  g.save(); g.lineCap = 'round'; g.strokeStyle = `rgba(250,247,240,${0.85 * k})`; g.lineWidth = 4;
  for (let m = 0; m < 60; m++) {
    const s = ph - m * lam; if (s < 8) continue;
    let p, d, air = s <= L1;
    if (air) { p = [Pa[0] + dA[0] * s, Pa[1] + dA[1] * s]; d = dA; }
    else { const sw = (s - L1) / n; if (sw > L2) continue; p = [Pb[0] + dW[0] * sw, Pb[1] + dW[1] * sw]; d = dW; }
    g.save(); g.beginPath(); if (air) g.rect(0, 0, W, SURF); else g.rect(0, SURF, W, H - SURF); g.clip();
    g.beginPath(); g.moveTo(p[0] - d[1] * 38, p[1] + d[0] * 38); g.lineTo(p[0] + d[1] * 38, p[1] - d[0] * 38); g.stroke(); g.restore();
  }
  g.restore();
}

export default class F1 {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1-kussetsu');
    this.START = L(85).start;
    this.FROM = Math.max(this.START - 2.6, L(84).end + 0.5);
    const at = actTimes(this.FROM, this.START);
    const T = this.T = {
      title: at.o1 - 0.2,
      show: Math.max(w(85, '水') - 0.1, at.o1 - 0.15),
      mizu: w(85, '水'), glass: w(85, 'ガラス'), chu1: w(85, '中学1年'),
      l86: L(86).start, hayasa: w(86, '速さ'), p25: w(86, '25%'), e86: L(86).end,
      l87: L(87).start, kuruma: w(87, '車'), saki: w(87, '先'), kae: w(87, '変えます'), e87: L(87).end,
      l88: L(88).start, mizu88: w(88, '水'), sakai: w(88, '境目'), suichoku: w(88, '垂直'), mag: w(88, '曲がります'), end: L(88).end,
    };
    T.carIn = Math.max(T.kuruma, T.l87 + 0.2);                                  // xe bắt đầu chạy
    T.carT = [T.carIn, T.kae + 0.5];                                            // đoạn mô phỏng: từ vào → xong sau 変えます
    T.out86 = T.l87 - 0.15;                                                     // chữ 86 rời khung
    T.out87 = T.l88 - 0.1;                                                      // bảng xe rời khung
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.show + 0.35, 'water'), cue(T.chu1 - 0.4, 'step'),
      cue(T.l86 - 0.3, 'beam', -6), cue(T.hayasa - 0.3, 'step'), cue(T.p25, 'telop'),
      cue(T.carIn - 0.3, 'step'), cue(T.saki + 0.35, 'step'), cue(T.kae, 'step'),
      cue(T.sakai, 'telop'), cue(T.mag, 'water', -4),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'window', { y: APT.y, open: prog(t, F + 0.3, F + 1.0) });
    const bT = prog(t, T.show, T.show + 0.9);                                    // chùm tới mặt nước
    const kShow = prog(t, T.show, T.show + 0.6);

    // ── bể nước + chùm 1 (nước) ──
    if (kShow > 0) {
      g.save();
      const wk = outCubic(kShow);
      g.fillStyle = `rgba(150,160,170,${0.13 * wk})`; g.fillRect(TANK.x0, SURF, TANK.x1 - TANK.x0, (TANK.bot - SURF) * wk);
      g.strokeStyle = `rgba(154,149,140,${0.8 * wk})`; g.lineWidth = 4; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(TANK.x0, SURF - 40 * wk); g.lineTo(TANK.x0, TANK.bot); g.lineTo(TANK.x1, TANK.bot); g.lineTo(TANK.x1, SURF - 40 * wk); g.stroke();
      g.strokeStyle = `rgba(237,232,223,${0.6 * wk})`; g.lineWidth = 3; g.beginPath(); g.moveTo(TANK.x0, SURF); g.lineTo(TANK.x0 + (TANK.x1 - TANK.x0) * wk, SURF); g.stroke();
      g.restore();
    }
    if (bT > 0) {
      shaft(g, APT.x, APT.y, P1[0] - 6, P1[1] - 5, P1[0] + 6, P1[1] + 5, { a: 0.07, k: bT, t, dust: 26, spot: false, seed: 3 });
      ray(g, [[APT.x, APT.y], P1, S1.end], { nm: 'white', w: 6, k: bT });
      const dash = (x0, y0, x1, y1) => { g.save(); g.setLineDash([9, 9]); g.strokeStyle = 'rgba(154,149,140,0.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); };
      if (bT >= 1) dash(P1[0], P1[1] - 150, P1[0], P1[1] + 170);               // pháp tuyến
      if (bT >= 0.6) { telop(g, '水', TANK.x0 + 30, TANK.bot - 24, prog(t, T.mizu, T.mizu + 0.4), { size: 36, weight: 500, color: '@dim' }); }
    }

    // ── khối kính + chùm 2 ──
    const kG = prog(t, T.glass - 0.25, T.glass + 0.45);
    if (kG > 0) {
      const e = outCubic(kG);
      g.save(); g.fillStyle = `rgba(190,200,208,${0.14 * e})`; g.fillRect(GLASS.x0, SURF, GLASS.x1 - GLASS.x0, (GLASS.bot - SURF) * e);
      g.strokeStyle = `rgba(237,232,223,${0.75 * e})`; g.lineWidth = 4; g.strokeRect(GLASS.x0, SURF, GLASS.x1 - GLASS.x0, (GLASS.bot - SURF) * e);
      g.strokeStyle = `rgba(246,242,234,${0.35 * e})`; g.lineWidth = 3; g.beginPath(); g.moveTo(GLASS.x0 + 14, SURF + 14); g.lineTo(GLASS.x0 + 14, SURF + 70 * e); g.stroke(); g.restore();
      const k2 = prog(t, T.glass, T.glass + 0.9);
      ray(g, [[APT.x, APT.y], P2, S2.end], { nm: 'white', w: 6, k: k2, a: 0.9 });
      telop(g, 'ガラス', GLASS.x0 + 20, GLASS.bot + 52, prog(t, T.glass + 0.3, T.glass + 0.8), { size: 36, weight: 500, color: '@dim' });
    }

    // ── 85: nhãn 「屈折（中学1年の理科）」 → 86: 「水の中では、光は25%ほど遅くなる」 (cột phải) ──
    const sl85 = outCubic(prog(t, T.l86 - 0.1, T.l86 + 0.45)) * 900;
    if (sl85 < 899) { g.save(); g.translate(sl85, 0); telop(g, '屈折（中学1年の理科）', 1100, 340, prog(t, T.chu1, T.chu1 + 0.8), { size: 48 }); g.restore(); }
    // mặt sóng (chỉ khi nói về tốc độ) — vẫn trên chùm 1
    if (t > T.l86 - 0.3) fronts(g, t, T.l86 - 0.3, prog(t, T.l86 - 0.3, T.l86 + 0.4) * (1 - prog(t, T.suichoku - 0.2, T.suichoku + 0.5)), [APT.x, APT.y], P1, S1.end, nW);
    const sl86 = outCubic(prog(t, T.out86, T.out86 + 0.45)) * 900;
    if (t > T.hayasa - 0.1 && sl86 < 899) {
      g.save(); g.translate(sl86, 0);
      telop(g, '水の中では、', 1100, 320, prog(t, T.hayasa, T.hayasa + 0.6), { size: 48 });
      telop(g, `光は${Math.round((1 - 1 / nW) * 100)}%ほど遅くなる`, 1100, 384, prog(t, T.p25 - 0.1, T.p25 + 0.7), { size: 48 });
      g.restore();
    }

    // ── 87: xe vào 砂地 ──
    if (t > T.l87 - 0.1) {
      const sl87 = outCubic(prog(t, T.out87, T.out87 + 0.5)) * 900;
      if (sl87 < 899) {
        const kp = prog(t, T.l87 - 0.1, T.l87 + 0.7), u = prog(t, T.carT[0], T.carT[1]);
        g.save(); g.translate(sl87, 0);
        g.beginPath(); g.rect(PNL.x0 - 4, PNL.y0 - 4, (PNL.x1 - PNL.x0 + 8) * outCubic(kp), PNL.y1 - PNL.y0 + 8); g.clip();
        g.fillStyle = 'rgba(88,84,72,0.45)'; g.fillRect(PNL.x0, PNL.yb, PNL.x1 - PNL.x0, PNL.y1 - PNL.yb);
        for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(150,144,130,${0.18 + 0.2 * hash(i)})`; g.fillRect(PNL.x0 + (PNL.x1 - PNL.x0) * hash(i * 1.7), PNL.yb + 8 + (PNL.y1 - PNL.yb - 16) * hash(i * 3.1 + 1), 3, 3); }
        g.save(); g.setLineDash([12, 10]); g.strokeStyle = C.dim; g.lineWidth = 3; g.beginPath(); g.moveTo(PNL.x0, PNL.yb); g.lineTo(PNL.x1, PNL.yb); g.stroke(); g.restore();
        const idx = Math.min(CAR.length - 1, Math.floor(u * (CAR.length - 1)));
        g.fillStyle = C.text; for (let i = 0; i <= idx; i += 7) for (const p of [CAR[i].A, CAR[i].B]) { g.globalAlpha = 0.7; g.beginPath(); g.arc(p[0], p[1], 3.2, 0, TAU); g.fill(); } g.globalAlpha = 1;
        car(g, CAR[idx]);
        g.restore();
        g.save(); g.translate(sl87, 0);
        telop(g, '砂地', PNL.x0 + 24, PNL.y1 - 22, prog(t, T.l87 + 0.2, T.l87 + 0.7), { size: 36, weight: 500, color: '@dim' });
        telop(g, '先に入った側が遅くなり、', 1100, 722, prog(t, T.kae - 0.15, T.kae + 0.8), { size: 44 });
        telop(g, 'その側へ曲がる', 1100, 782, prog(t, T.kae + 0.25, T.kae + 1.0), { size: 44 });
        g.restore();
      }
    }

    // ── 88: pháp tuyến → cung góc + cốc 麦茶 ──
    if (t > T.mizu88 - 0.1) {
      const cx = 1440;
      // cốc
      const kc = prog(t, T.mizu88, T.mizu88 + 0.7), ec = outCubic(kc);
      if (kc > 0) {
        g.save(); g.beginPath(); g.rect(cx - 140, 460, 280, 520 * ec); g.clip();
        const top = 520, bot = 900, lv = 610;
        g.fillStyle = 'rgba(200,205,210,0.07)'; g.beginPath(); g.moveTo(cx - 112, top); g.lineTo(cx + 112, top); g.lineTo(cx + 92, bot); g.lineTo(cx - 92, bot); g.closePath(); g.fill();
            const tea = g.createLinearGradient(0, lv, 0, bot); tea.addColorStop(0, wlCss(589, 0.22)); tea.addColorStop(1, wlCss(589, 0.12));
        g.fillStyle = tea; g.beginPath(); g.moveTo(cx - 112 + (lv - top) * 20 / 380, lv); g.lineTo(cx + 112 - (lv - top) * 20 / 380, lv); g.lineTo(cx + 92, bot); g.lineTo(cx - 92, bot); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(237,232,223,0.85)'; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath(); g.moveTo(cx - 112, top); g.lineTo(cx - 92, bot); g.lineTo(cx + 92, bot); g.lineTo(cx + 112, top); g.stroke();
        g.strokeStyle = 'rgba(237,232,223,0.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx - 106 + (lv - top) * 20 / 380, lv); g.lineTo(cx + 106 - (lv - top) * 20 / 380, lv); g.stroke();
        // đũa: phần trên mặt nước thẳng; phần chìm trông bị gãy (nâng lên, nghiêng thêm); đường thật nét đứt
        const S = [cx + 14, lv], top0 = [cx + 120, 450];
        g.lineCap = 'round';
        g.strokeStyle = '#D8D2C6'; g.lineWidth = 11; g.beginPath(); g.moveTo(top0[0], top0[1]); g.lineTo(S[0], S[1]); g.stroke();
        const sl = (S[0] - top0[0]) / (S[1] - top0[1]);
        const trueEnd = [S[0] + sl * (bot - 40 - lv), bot - 40];
        g.save(); g.setLineDash([8, 9]); g.strokeStyle = 'rgba(154,149,140,0.9)'; g.lineWidth = 3; g.beginPath(); g.moveTo(S[0], S[1]); g.lineTo(trueEnd[0], trueEnd[1]); g.stroke(); g.restore();
        g.strokeStyle = '#D8D2C6'; g.lineWidth = 11; g.beginPath(); g.moveTo(S[0], S[1]); g.lineTo(S[0] + sl * 1.7 * 105, lv + 105); g.stroke();
        g.restore();
        telop(g, '麦茶', cx - 40, 960, kc, { size: 36, weight: 500, color: '@dim' });
      }
      telop(g, '境目に対して、', 1100, 320, prog(t, T.sakai, T.sakai + 0.7), { size: 48 });
      telop(g, 'より垂直な向きへ', 1100, 384, prog(t, T.sakai + 0.35, T.sakai + 1.1), { size: 48 });
      // cung góc ở P1
      const ka = outCubic(prog(t, T.suichoku, T.suichoku + 0.9));
      if (ka > 0) {
        const dBack = unit(P1, [APT.x, APT.y]), aBack = Math.atan2(dBack[1], dBack[0]);
        angleArc(g, P1, -Math.PI / 2, aBack, 110, ka, { color: '@ink', w: 4 });
        angleArc(g, P1, Math.PI / 2, Math.PI / 2 - S1.r, 110, ka, { color: '@ink', w: 4 });
        telop(g, '大', P1[0] - 128, P1[1] - 96, prog(t, T.suichoku + 0.5, T.suichoku + 0.9), { size: 36, weight: 500, color: '@dim' });
        telop(g, '小', P1[0] + 68, P1[1] + 84, prog(t, T.suichoku + 0.5, T.suichoku + 0.9), { size: 36, weight: 500, color: '@dim' });
      }
    }

    actCard(g, t, F, this.START, 5);
    title(g, '屈折', t, T.title, { act: 5 });
  }
}
