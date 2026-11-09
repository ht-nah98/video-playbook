// Hình dùng chung của điệp khúc 1 (P11a, P11b, P12): cặp 3 → 8 / 8 → 3 hai bên gương,
// cỗ máy hai khe, kính vạn hoa. Các cảnh gọi CÙNG hàm với cùng t → nối liền qua ranh giới cảnh.
// Toạ độ đặt sao cho ảnh qua gương MIRROR (x + y = 1500) vẫn trong khung:
// điểm phía vàng cần 420 ≤ x ≤ 1500 và x + y > 1500.
import { fillWord } from '../../../engine/fill.js';
import { clamp, prog, outBack, outExpo, smooth, hash } from '../../../engine/lib.js';
import { reflectPoint, drawMirrorLine } from '../../../engine/mirror.js';
import { PAL, MIRROR } from './song.js';

export const FWD_AT = [1330, 890];                           // hàng vàng "3 → 8" (nửa dưới-phải)
export const BACK_AT = reflectPoint(FWD_AT, MIRROR);          // hàng xanh "8 → 3" = ảnh của nó qua gương

/** Một hàng "a → b": a hiện ở t0, mũi tên bắn ra ở tShoot, b bật ra khi mũi tên tới. */
export function arrowRow(g, t, [cx, cy], a, b, t0, tShoot, col, { size = 80, alpha = 1 } = {}) {
  if (t < t0) return;
  g.save(); g.globalAlpha = alpha;
  g.font = `900 ${size}px "Archivo"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col;
  const gap = size * 1.9, pa = outBack(clamp((t - t0) / 0.18));
  g.save(); g.translate(cx - gap, cy); g.scale(pa, pa); g.fillText(a, 0, 0); g.restore();
  const e = outExpo(prog(t, tShoot, tShoot + 0.3));
  if (e > 0) {
    const x0 = cx - gap * 0.6, x1 = x0 + gap * 1.2 * e;
    g.strokeStyle = col; g.lineWidth = size * 0.1; g.lineCap = 'round'; g.shadowColor = col; g.shadowBlur = 20;
    g.beginPath(); g.moveTo(x0, cy); g.lineTo(x1, cy);
    g.moveTo(x1, cy); g.lineTo(x1 - size * 0.25, cy - size * 0.2); g.moveTo(x1, cy); g.lineTo(x1 - size * 0.25, cy + size * 0.2);
    g.stroke(); g.shadowBlur = 0;
    const pb = outBack(clamp((t - tShoot - 0.25) / 0.18));
    if (pb > 0) { g.save(); g.translate(cx + gap, cy); g.scale(pb, pb); g.fillText(b, 0, 0); g.restore(); }
  }
  g.restore();
}

/** Bánh răng z răng, bán kính r, góc a. */
function gear(g, x, y, r, z, a, col) {
  g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = col; g.beginPath();
  for (let i = 0; i < z * 2; i++) {
    const rr = i % 2 ? r : r * 1.18, a0 = (i / (z * 2)) * Math.PI * 2, a1 = ((i + 1) / (z * 2)) * Math.PI * 2;
    g.lineTo(Math.cos(a0) * rr, Math.sin(a0) * rr); g.lineTo(Math.cos(a1) * rr, Math.sin(a1) * rr);
  }
  g.closePath(); g.fill();
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(0, 0, r * 0.35, 0, Math.PI * 2); g.fill();
  g.restore();
}

/**
 * Cỗ máy hai khe giữa khung. spin(t) = góc bánh răng (âm = chạy ngược).
 * inCh/outCh: ký tự bay vào khe trái / bật ra khe phải (khi rev = true thì vào phải, ra trái).
 * inFrom: khoảng cách từ tâm nơi ký tự vào đang nằm chờ (P11b: số 8 P11a vừa nhả ra ở 460).
 */
export function machine(g, t, { tIn, spin, rev = false, inCh, inAt, inFrom = 720, outCh, outAt, col }) {
  const k = outBack(clamp((t - tIn) / 0.3));
  if (k <= 0) return;
  g.save(); g.translate(960, 560); g.scale(k, k);
  g.fillStyle = PAL.halo; g.strokeStyle = col; g.lineWidth = 6;
  g.fillRect(-300, -170, 600, 340); g.strokeRect(-300, -170, 600, 340);
  gear(g, -70, -10, 70, 10, spin, col); gear(g, 70, 40, 52, 8, -spin * 1.35 + 0.3, PAL.truth);
  // hai khe: trái = SỐ MŨ, phải = GIÁ TRỊ
  g.font = '500 24px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillStyle = PAL.truth;
  g.fillText('EXPONENT', -380, -110); g.fillText('VALUE', 380, -110);
  g.fillStyle = col; g.fillRect(-318, -60, 18, 120); g.fillRect(300, -60, 18, 120);
  g.font = '900 110px "Archivo"'; g.textBaseline = 'middle';
  const sideIn = rev ? 1 : -1;
  const fin = smooth(prog(t, inAt - 0.35, inAt));              // ký tự bay vào khe
  if (fin < 1 && (fin > 0 || inFrom < 720)) g.fillText(inCh, sideIn * (inFrom - (inFrom - 340) * fin), 0);
  if (t >= outAt) g.fillText(outCh, -sideIn * (340 + 120 * outBack(clamp((t - outAt) / 0.3))), 0);   // bật ra khe kia
  g.restore();
}

/** Tâm các ô kính vạn hoa phía vàng: lưới dọc theo gương (u) và vuông góc về phía vàng (n). */
export function kaleidoCells() {
  const u = [Math.SQRT1_2, -Math.SQRT1_2], n = [Math.SQRT1_2, Math.SQRT1_2], out = [];
  for (let j = 1; j <= 3; j++) for (let i = -3; i <= 3; i++)
    out.push({ p: [960 + i * 320 * u[0] + j * 230 * n[0], 540 + i * 320 * u[1] + j * 230 * n[1]], ring: Math.abs(i) + j });
  return out;
}

/** Kính vạn hoa: mỗi ô là "3→8" vàng phía này và ảnh "8→3" xanh phía kia, nở dần từ gương ra mép. */
export function kaleido(g, t, t0) {
  g.save(); g.font = '900 54px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (const { p, ring } of kaleidoCells()) {
    const k = outBack(clamp((t - t0 - ring * 0.12) / 0.3));
    if (k <= 0) continue;
    const q = reflectPoint(p, MIRROR), wob = 0.08 * Math.sin(t * 2 + ring);
    for (const [[x, y], s, col] of [[p, '3→8', PAL.fwd], [q, '8→3', PAL.back]]) {
      g.save(); g.translate(x, y); g.rotate(wob); g.scale(k, k); g.fillStyle = col; g.fillText(s, 0, 0); g.restore();
    }
  }
  g.restore();
}

/** Mọi điểm của kính vạn hoa (hai phía) — nguồn cho morph co về ô □ ở P12. */
export function kaleidoPoints() {
  return kaleidoCells().flatMap(({ p }) => [p, reflectPoint(p, MIRROR)])
    .flatMap(([x, y], i) => [0, 1, 2, 3].map(j => [x - 50 + 33 * j + 6 * hash(i + j), y]));
}

/** Con dấu "Nó có tên": LOGARITHM khổng lồ + log₂ 8 = [3] (P12 đóng ở 63.82, P13 phá vỡ nó). */
export function nameStamp(g, t, cut) {
  const dt = t - cut;
  // loé 2 khung ở cú cắt (luật video mẫu: cắt cứng đi kèm vật đập xuống hoặc loé trắng)
  if (dt < 0.05) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(244,241,234,0.3)'; g.fillRect(0, 0, 1920, 1080); g.restore(); }
  drawMirrorLine(g, MIRROR, 1, { width: 6, glow: 30 });
  // LOGARITHM khổng lồ, ruột lấp chữ nhỏ
  const sw = outBack(clamp(dt / 0.18));
  g.save(); g.font = '900 230px "Archivo"';
  const w = g.measureText('LOGARITHM').width;
  g.translate(960, 250); g.scale(sw, sw);
  fillWord(g, 'LOGARITHM', -w / 2, 0, { font: '900 230px "Archivo"', color: PAL.back, innerColor: PAL.backCore,
    inner: ['log₂8 = 3', 'log₂16 = 4', 'log₁₀1000 = 3', 'log₂2 = 1', 'log₂1 = 0'], drift: t * 80 });
  g.restore();
  // con dấu log₂ 8 = 3 đập xuống, nghiêng; ô □ giờ xanh, ôm số 3
  const s = 1 + 0.6 * (1 - outBack(clamp(dt / 0.18)));
  g.save(); g.translate(960, 640); g.rotate(-0.06); g.scale(s, s);
  g.strokeStyle = PAL.truth; g.lineWidth = 10; g.strokeRect(-470, -150, 940, 300);
  g.fillStyle = PAL.truth; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.font = '900 170px "Archivo"'; g.fillText('log', -420, 60);
  g.font = '900 90px "Archivo"'; g.fillText('2', -140, 110);
  g.font = '900 170px "Archivo"'; g.fillText('8 =', -60, 60);
  g.fillStyle = PAL.back; g.fillText('3', 250, 60);
  g.strokeStyle = PAL.back; g.lineWidth = 12; g.strokeRect(225, -85, 150, 170);
  g.restore();
}
