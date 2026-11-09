// Thế giới điệp khúc cuối (P23, P23b) và màn chào (P27): mọi vật của bài quay lại DỌC GƯƠNG.
// Mỗi vật là một huy hiệu nhỏ vẽ quanh gốc toạ độ; đoàn diễu hành trôi dọc đường gương ở phía VÀNG (trên-trái,
// x + y < 1500 — phía đường mũ), và ảnh của nó qua gương (nhuộm xanh) trôi ở phía kia: cùng một chuyện, hai chiều.
import { clamp, hash, lerp, outBack, smooth } from '../../../engine/lib.js';
import { drawReflected } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';
import { G } from './chorus2.js';

const MA = [420, 1080], MB = [1500, 0], NG = [-Math.SQRT1_2, -Math.SQRT1_2];   // gương; pháp tuyến về phía vàng

export const FACE = [960, 870, 560];                   // = P16/P17: mặt cận trên gương (P23, P23b, P25)

/** Điểm trên gương ở tham số s (0 = mép dưới, 1 = mép trên), lệch d px về phía vàng. */
export const along = (s, d = 0) => [lerp(MA[0], MB[0], s) + NG[0] * d, lerp(MA[1], MB[1], s) + NG[1] * d];

// ——— huy hiệu: mỗi cái vẽ quanh (0, 0), cỡ ~150 px ———
function cubes(g) {                                   // 2³: tám khối lập phương (P02)
  const c = 38;
  for (let i = 0; i < 8; i++) {
    const x = (i & 1) * c + ((i >> 1) & 1) * c * 0.5 - 50, y = -((i >> 2) & 1) * c - ((i >> 1) & 1) * c * 0.5 + 30;
    g.fillStyle = PAL.fwd; g.strokeStyle = PAL.bg; g.lineWidth = 2; g.fillRect(x, y - c, c, c); g.strokeRect(x, y - c, c, c);
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 44px "Archivo"'; g.textAlign = 'center'; g.fillText('2³', 0, 86);
}
function sunBadge(g) {                                // mặt trời phương trình (P06)
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, 80);
  gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.6, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 80, 0, Math.PI * 2); g.fill();
  g.strokeStyle = PAL.fwd; g.lineWidth = 4;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * 64, Math.sin(a) * 64); g.lineTo(Math.cos(a) * 96, Math.sin(a) * 96); g.stroke(); }
  g.fillStyle = PAL.bg; g.font = '900 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('aᵐ⁺ⁿ', 0, 2);
}
function engineBadge(g, t) {                          // cửa két = động cơ × → + (P13, P18)
  g.strokeStyle = PAL.fwd; g.lineWidth = 8;
  for (const r of [70, 50]) { g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke(); }
  g.lineWidth = 7; g.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = t * 0.6 + i / 8 * Math.PI * 2;
    g.save(); g.translate(Math.cos(a) * 92, Math.sin(a) * 92); g.rotate(a);
    g.beginPath(); g.moveTo(-12, 0); g.lineTo(12, 0); g.moveTo(0, -12); g.lineTo(0, 12); g.stroke(); g.restore();
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 34px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('×→+', 0, 2);
}
function coins(g) {                                   // chồng xu 1.07 (P13)
  for (let i = 0; i < 4; i++) {
    const h = 30 + i * 22, x = -66 + i * 44;
    g.fillStyle = PAL.fwd; g.fillRect(x - 18, 40 - h, 36, h);
    g.fillStyle = PAL.fwdCore; g.beginPath(); g.ellipse(x, 40 - h, 18, 6, 0, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = PAL.fwdCore; g.font = '900 40px "Archivo"'; g.textAlign = 'center'; g.fillText('×1.07', 0, 96);
}
function stamp(g) {                                   // con dấu LOGARITHM (P12)
  g.rotate(-0.08); g.strokeStyle = PAL.fwd; g.lineWidth = 6; g.strokeRect(-120, -44, 240, 88);
  g.fillStyle = PAL.fwd; g.font = '900 34px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('LOGARITHM', 0, 2);
}
function sheetBadge(g) {                              // tờ giấy gập (P19–P20)
  g.fillStyle = PAL.paper; g.beginPath(); g.moveTo(-80, -70); g.lineTo(40, -70); g.lineTo(80, -30); g.lineTo(80, 70); g.lineTo(-80, 70); g.closePath(); g.fill();
  g.fillStyle = '#C9C2B2'; g.beginPath(); g.moveTo(40, -70); g.lineTo(40, -30); g.lineTo(80, -30); g.closePath(); g.fill();
  g.strokeStyle = '#B87410'; g.lineWidth = 5; g.beginPath();
  for (let i = 0; i <= 20; i++) { const u = -3 + i * 0.25, x = -60 + i * 6, y = 50 - 2 ** u * 14; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
}
export const BADGES = [cubes, sunBadge, engineBadge, coins, stamp, sheetBadge];

/**
 * Đoàn diễu hành: n huy hiệu trôi dọc gương (tốc độ speed tham số/giây), cách gương d px về phía vàng; ảnh qua
 * gương nhuộm xanh ở phía kia. k: 0 → 1 các huy hiệu nảy vào lần lượt (outBack, không fade). pulse: nhịp beat.
 */
export function parade(g, t, { k = 1, d = 330, speed = 0.018, pulse = 0, scale = 1, reflect = true } = {}) {
  if (k <= 0) return;
  const draw = (c) => BADGES.forEach((fn, i) => {
    const s = ((i / BADGES.length + t * speed) % 1) * 1.65 - 0.35, [x, y] = along(s, d);
    const pop = outBack(clamp((k - i * 0.1) / 0.4));
    if (pop <= 0) return;
    c.save(); c.translate(x, y); c.scale(scale * pop * (1 + 0.08 * pulse), scale * pop * (1 + 0.08 * pulse)); fn(c, t); c.restore();
  });
  draw(g);
  if (reflect) drawReflected(g, MIRROR, draw, { tint: PAL.back, tintAlpha: 0.55 });
}

// Tia của mặt trời cuối: mọi đẳng thức của bài — "the reason comes alive".
export const EQUATIONS = ['2³ = 8', 'log₂ 8 = 3', '2^√2 ≈ 2.665', 'aᵐ·aⁿ = aᵐ⁺ⁿ', '1.07¹⁰·² ≈ 2', 'log₁.₀₇ 2 ≈ 10.2',
  'a⁰ = 1', '2⁻¹ = ½', 'y = 2ˣ ⇔ x = log₂ y', 'log xy = log x + log y', '2¹⁰ = 1024', 'log₂ 1 = 0'];

/** Mặt trời phương trình: lõi bán kính R, tia chữ dài reach ∈ [0,1], bloom ∈ [0,1] (loé tràn khung). */
export function sun(g, t, x, y, R, { reach = 1, bloom = 0, spin = 0 } = {}) {
  if (R <= 0) return;
  g.save();
  const gr = g.createRadialGradient(x, y, 0, x, y, R * 1.6);
  gr.addColorStop(0, PAL.fwdCore); gr.addColorStop(0.55, PAL.fwd); gr.addColorStop(1, 'rgba(255,181,71,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * 1.6, 0, Math.PI * 2); g.fill();
  if (bloom > 0) {
    const b = g.createRadialGradient(x, y, R, x, y, R + 1400 * bloom);
    b.addColorStop(0, `rgba(255,227,163,${0.75 * bloom})`); b.addColorStop(1, 'rgba(255,181,71,0)');
    g.fillStyle = b; g.fillRect(-500, -500, 2920, 2080);
  }
  g.font = '500 30px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.textAlign = 'left';
  EQUATIONS.forEach((s, i) => {
    const a = (i / EQUATIONS.length) * Math.PI * 2 - Math.PI / 2 + spin, n = Math.ceil(s.length * clamp(reach * 1.4 - (i % 3) * 0.2));
    if (n <= 0) return;
    g.save(); g.translate(x, y); g.rotate(a);
    g.fillStyle = i % 2 ? PAL.fwdCore : PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 12;
    g.fillText(s.slice(0, n), R * 1.4, 0); g.restore();
  });
  g.restore();
}

/** Sao chổi chạy trên đường cong: u từ a tới b theo k; log = chạy trên ảnh qua gương (xanh). */
export function comet(g, k, a, b, { log = false, col = log ? PAL.back : PAL.fwd, core = log ? PAL.backCore : PAL.fwdCore, r = 18 } = {}) {
  if (k <= 0 || k >= 1) return;
  for (let j = 0; j < 10; j++) {
    const u = lerp(a, b, clamp(k - j * 0.022)), v = 2 ** u, [x, y] = log ? G(v, u) : G(u, v);
    g.save(); g.globalAlpha = 1 - j / 10; g.fillStyle = j ? col : core; g.shadowColor = col; g.shadowBlur = 30;
    g.beginPath(); g.arc(x, y, r - j * 1.4, 0, Math.PI * 2); g.fill(); g.restore();
  }
}

/** Dây nối vuông góc gương giữa điểm (u, 2^u) và ảnh (2^u, u) — "one connection"; k: số dây đã nối. */
export function ties(g, k, { us = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], glow = 0 } = {}) {
  us.forEach((u, i) => {
    const e = smooth(clamp(k * us.length - i));
    if (e <= 0) return;
    const a = G(u, 2 ** u), b = G(2 ** u, u), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    g.save(); g.lineWidth = 4 + 4 * glow; g.lineCap = 'round'; g.shadowBlur = 16 + 20 * glow;
    g.strokeStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.beginPath(); g.moveTo(...m); g.lineTo(lerp(m[0], a[0], e), lerp(m[1], a[1], e)); g.stroke();
    g.strokeStyle = PAL.back; g.shadowColor = PAL.back; g.beginPath(); g.moveTo(...m); g.lineTo(lerp(m[0], b[0], e), lerp(m[1], b[1], e)); g.stroke();
    g.fillStyle = PAL.truth; g.beginPath(); g.arc(...m, 8, 0, Math.PI * 2); g.fill();
    g.restore();
  });
}

/**
 * Thẻ lật quanh trục ngang: mặt trước (front, colF) → mặt sau (back, colB) theo flip ∈ [0,1]. pop: nảy vào.
 * Chữ mặt sau đọc xuôi (lật lại bằng |cos| — LESSONS: chữ phải đọc được).
 */
export function flipCard(g, x, y, front, back, flip, pop, { colF = PAL.fwd, colB = PAL.back, w = 900, h = 130 } = {}) {
  if (pop <= 0) return;
  const c = Math.cos(Math.PI * flip), face = c >= 0, col = face ? colF : colB;
  g.save(); g.translate(x, y); g.scale(pop, pop * Math.max(Math.abs(c), 0.02));
  g.fillStyle = PAL.bg; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = col; g.lineWidth = 8; g.shadowColor = col; g.shadowBlur = 24; g.strokeRect(-w / 2, -h / 2, w, h);
  g.shadowBlur = 0; g.fillStyle = col; g.font = '900 84px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(face ? front : back, 0, 4);
  g.restore();
}

/** Thẻ công thức rơi từ trời: rơi thẳng tới gương (y = 1500 − x), bật ngang sang trái ra khỏi khung. */
export function skyCard(g, text, x, t, t0, { col = PAL.fwd, seed = 0 } = {}) {
  if (t < t0) return;
  const y0 = -120, yHit = 1500 - x, vy = 1900, tHit = (yHit - y0) / vy, dt = t - t0;
  let px = x, py, rot = (hash(seed) - 0.5) * 0.4;
  if (dt < tHit) py = y0 + vy * dt;
  else { const d = dt - tHit; py = yHit - 60 * d; px = x - 2300 * d; rot += -3 * d; }   // vận tốc (0, v) qua gương x + y = c → (−v, 0)
  if (px < -400) return;
  g.save(); g.translate(px, py); g.rotate(rot);
  g.fillStyle = PAL.paper; g.fillRect(-130, -34, 260, 68); g.strokeStyle = col; g.lineWidth = 4; g.strokeRect(-130, -34, 260, 68);
  g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 0, 2);
  g.restore();
  // tia lửa ở điểm chạm
  const sp = (dt - tHit) / 0.25;
  if (sp > 0 && sp < 1) {
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4; g.globalAlpha = 1 - sp;
    for (let i = 0; i < 8; i++) { const a = hash(seed * 3 + i) * Math.PI * 2, r0 = 20 + 60 * sp, r1 = r0 + 40; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, yHit + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, yHit + Math.sin(a) * r1); g.stroke(); }
    g.restore();
  }
}
