// Động cơ luật số mũ (P18): chính là cánh cửa két tròn ở cuối sảnh ngân hàng (bank.js vault),
// giờ ra giữa khung. Răng là dấu ×; "Multiplication turns to addition" — mỗi răng xoay 45° thành +
// (đúng hình học: × xoay 45° là +). Hai khe vào hai bên, lõi giữa, khe ra ở dưới.
import { clamp, hash } from '../../../engine/lib.js';
import { mix } from '../../../engine/draw.js';
import { PAL } from './song.js';

export const GEAR = { cx: 960, cy: 470, R: 250 };
const DIM = '#2C3D6B';

/** Điểm đều trên vành (cho morph ký hiệu tụ thành động cơ). */
export function rimPoints(n = 160) {
  return Array.from({ length: n }, (_, i) => {
    const a = i / n * Math.PI * 2, r = GEAR.R + (i % 4 === 0 ? 40 : 0);
    return [GEAR.cx + Math.cos(a) * r, GEAR.cy + Math.sin(a) * r];
  });
}

/** Một răng: hai thanh chéo; plus ∈ [0,1] xoay thanh 45° → dấu +. */
function tooth(g, x, y, a, plus, col) {
  g.save(); g.translate(x, y); g.rotate(a + Math.PI / 4 * (1 - plus));
  g.strokeStyle = col; g.lineWidth = 15; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-28, 0); g.lineTo(28, 0); g.moveTo(0, -28); g.lineTo(0, 28); g.stroke();
  g.restore();
}

/**
 * Động cơ. angle: góc quay; plus: × → +; lit: 0 tối (cửa két) → 1 sáng; col: màu khi sáng.
 * labels: { core, left, right, top, bottom } (chuỗi); mono: 0 Archivo → 1 Plex Mono ("different script").
 */
export function gear(g, t, { angle = 0, plus = 0, lit = 1, col = PAL.fwd, labels = {}, mono = 0, alpha = 1 } = {}) {
  const { cx, cy, R } = GEAR, c = mix(DIM, col, lit);
  g.save(); g.globalAlpha = alpha;
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(cx, cy, R + 12, 0, Math.PI * 2); g.fill();
  g.shadowColor = col; g.shadowBlur = 30 * lit;
  g.strokeStyle = c; g.lineWidth = 16;
  for (const r of [R, R - 40]) { g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
  for (let i = 0; i < 12; i++) {                                 // răng ×/+ quay theo vành
    const a = angle + i / 12 * Math.PI * 2;
    tooth(g, cx + Math.cos(a) * (R + 46), cy + Math.sin(a) * (R + 46), a, plus, c);
  }
  g.lineWidth = 9; g.lineCap = 'round';                           // tay quay của cửa két = nan hoa động cơ
  for (let i = 0; i < 3; i++) {
    const a = angle * 0.5 + i * Math.PI / 3;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * 130, cy + Math.sin(a) * 130); g.lineTo(cx + Math.cos(a) * (R - 52), cy + Math.sin(a) * (R - 52)); g.stroke();
    g.beginPath(); g.moveTo(cx - Math.cos(a) * 130, cy - Math.sin(a) * 130); g.lineTo(cx - Math.cos(a) * (R - 52), cy - Math.sin(a) * (R - 52)); g.stroke();
  }
  g.shadowBlur = 0;
  g.fillStyle = PAL.bg; g.strokeStyle = c; g.lineWidth = 8;       // lõi
  g.beginPath(); g.arc(cx, cy, 128, 0, Math.PI * 2); g.fill(); g.stroke();
  // khe vào hai bên, khe ra ở dưới
  for (const [x, y, w, h] of [[cx - R - 290, cy - 60, 250, 120], [cx + R + 40, cy - 60, 250, 120], [cx - 120, cy + R + 70, 240, 100]]) {
    g.strokeRect(x, y, w, h);
  }
  const font = (px) => mono > 0.5 ? `600 ${Math.round(px * 0.82)}px "IBM Plex Mono"` : `900 ${px}px "Archivo"`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const put = (s, x, y, px, fill) => { if (!s) return; g.font = font(s.length > 5 ? px * 0.66 : px); g.fillStyle = fill; g.fillText(s, x, y); };   // chữ dài co lại cho vừa khe
  put(labels.core, cx, cy, 58, PAL.backCore);
  put(labels.left, cx - R - 165, cy, 62, PAL.fwdCore);
  put(labels.right, cx + R + 165, cy, 62, PAL.fwdCore);
  put(labels.bottom, cx, cy + R + 120, 62, PAL.fwdCore);
  put(labels.top, cx, cy - R - 120, 64, PAL.truth);
  g.restore();
}

/** Túi công thức: thẻ công thức rơi tung ra (k: 0 → 1). */
export const RULE_CARDS = ['aᵐ·aⁿ = aᵐ⁺ⁿ', '(aᵐ)ⁿ = aᵐⁿ', 'a⁻ⁿ = 1/aⁿ', 'a⁰ = 1', 'aᵐ/aⁿ = aᵐ⁻ⁿ', '(ab)ⁿ = aⁿbⁿ'];
export function ruleBag(g, k, { x = 330, y = 300 } = {}) {
  if (k <= 0) return;
  g.save(); g.translate(x, y - 500 * (1 - clamp(k * 3)));        // túi rơi xuống trong 1/3 đầu
  g.fillStyle = '#C9B48A'; g.strokeStyle = PAL.ink; g.lineWidth = 4;
  g.beginPath(); g.moveTo(-90, -40); g.lineTo(90, -40); g.lineTo(110, 130); g.lineTo(-110, 130); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = PAL.ink; g.font = '600 28px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillText('RULES', 0, 60);
  const spill = clamp((k - 0.3) / 0.7);
  RULE_CARDS.forEach((s, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.45, d = 60 + 260 * spill * (0.6 + 0.4 * hash(i * 3.3));
    g.save(); g.translate(Math.cos(a) * d, -40 + Math.sin(a) * d + 300 * spill * spill * 0.3); g.rotate((hash(i) - 0.5) * 1.4 * spill);
    g.fillStyle = PAL.paper; g.fillRect(-120, -32, 240, 64); g.strokeStyle = PAL.fwd; g.lineWidth = 3; g.strokeRect(-120, -32, 240, 64);
    g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textBaseline = 'middle'; g.fillText(s, 0, 2);
    g.restore();
  });
  g.restore();
}

/** Xấp thẻ học thuộc bị cắt vụn: cut ∈ [0,1] — lưỡi đỏ chém, các dải rơi. */
export function flashcards(g, k, cut, { x = 1600, y = 330 } = {}) {
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(clamp(k * 4), clamp(k * 4));
  const strips = 6, w = 300, h = 190;
  for (let i = 0; i < strips; i++) {
    const fall = cut * cut * (1300 + 400 * hash(i * 1.7)), rot = (hash(i * 5.1) - 0.5) * 1.2 * cut;   // rơi hẳn khỏi khung
    g.save(); g.translate(-w / 2 + (i + 0.5) * w / strips, fall); g.rotate(rot);
    g.beginPath(); g.rect(-w / strips / 2, -h / 2, w / strips, h); g.clip();
    g.translate(w / 2 - (i + 0.5) * w / strips, 0);
    g.fillStyle = PAL.paper; g.fillRect(-w / 2, -h / 2, w, h);
    g.fillStyle = PAL.block; g.fillRect(-w / 2, -h / 2, w, 34);
    g.fillStyle = PAL.paper; g.font = '600 22px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('MEMORIZE!', 0, -h / 2 + 18);
    g.fillStyle = PAL.ink; g.font = '600 30px "IBM Plex Mono"'; g.fillText('log xy = ?', 0, 30);
    g.restore();
  }
  if (cut > 0 && cut < 0.4) {                                     // vệt chém đỏ
    g.strokeStyle = PAL.block; g.lineWidth = 8; g.shadowColor = PAL.block; g.shadowBlur = 20;
    for (let i = 1; i < strips; i++) { const xx = -w / 2 + i * w / strips; g.beginPath(); g.moveTo(xx, -h / 2 - 40); g.lineTo(xx, h / 2 + 40); g.stroke(); }
  }
  g.restore();
}


