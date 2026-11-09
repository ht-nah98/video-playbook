// Bộ dụng cụ dựng hình. Mọi hình trong video đều do đầu compa vẽ ra,
// nên mọi thứ ở đây đều nhận `p` (0→1: đã vẽ được bao nhiêu) và trả về
// vị trí đầu bút, để cảnh gắn chấm sáng vào đó.
// Ngữ pháp màu: gold-hot (đang vẽ) → gold (vừa xong) → teal (đã chứng minh).
import { C, clamp, lerp, hash } from './lib.js';

/** Màu của một nét theo tuổi (giây kể từ lúc vẽ xong đoạn đó). */
export function inkColor(age) {
  if (age < 0) return C.goldHot;
  if (age < 0.10) return C.goldHot;
  if (age < 0.55) return C.gold;
  // nguội dần sang teal
  const k = clamp((age - 0.55) / 0.45);
  return k < 1 ? mix(C.gold, C.teal, k) : C.teal;
}

function hex(c){ const n=parseInt(c.slice(1),16); return [n>>16&255,n>>8&255,n&255]; }
export function mix(a, b, k){
  const A=hex(a), B=hex(b);
  return `rgb(${Math.round(lerp(A[0],B[0],k))},${Math.round(lerp(A[1],B[1],k))},${Math.round(lerp(A[2],B[2],k))})`;
}

/**
 * Cung tròn được vạch dần. Trả về [x,y] đầu bút.
 * `age0` là tuổi của điểm bắt đầu cung — dùng để tô màu nguội dần dọc cung.
 */
export function arc(g, cx, cy, r, a0, a1, p, { width = 3, age = 0, seg = 96, alpha = 1 } = {}) {
  p = clamp(p);
  if (p <= 0) return [cx + Math.cos(a0)*r, cy + Math.sin(a0)*r];
  const aEnd = lerp(a0, a1, p);
  // vẽ theo từng đoạn để màu nguội dần dọc theo cung
  const n = Math.max(2, Math.ceil(seg * p));
  g.save();
  g.lineCap = 'round';
  g.lineWidth = width;
  g.globalAlpha = alpha;
  for (let i = 0; i < n; i++) {
    const k0 = i/n, k1 = (i+1)/n;
    const b0 = lerp(a0, aEnd, k0), b1 = lerp(a0, aEnd, k1);
    // đoạn vẽ càng sớm thì càng nguội
    g.strokeStyle = inkColor(age + (1 - k1) * p * 2.2);
    g.beginPath();
    g.arc(cx, cy, r, b0, b1);
    g.stroke();
  }
  g.restore();
  return [cx + Math.cos(aEnd)*r, cy + Math.sin(aEnd)*r];
}

/** Đoạn thẳng vẽ dần. */
export function line(g, x0, y0, x1, y1, p, { width = 3, age = 0, alpha = 1, color = null } = {}) {
  p = clamp(p);
  if (p <= 0) return [x0, y0];
  const x = lerp(x0, x1, p), y = lerp(y0, y1, p);
  g.save();
  g.lineCap = 'round';
  g.lineWidth = width;
  g.globalAlpha = alpha;
  g.strokeStyle = color || inkColor(age);
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke();
  g.restore();
  return [x, y];
}

/** Đường dựng phụ: đứt nét, mảnh, bone-dim. Không bao giờ bloom. */
export function guide(g, x0, y0, x1, y1, p = 1, { alpha = 1 } = {}) {
  p = clamp(p);
  if (p <= 0) return;
  g.save();
  g.setLineDash([7, 9]);
  g.lineWidth = 1.2;
  g.strokeStyle = C.boneDim;
  g.globalAlpha = alpha;
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(lerp(x0, x1, p), lerp(y0, y1, p));
  g.stroke();
  g.restore();
}

/** Vòng tròn phụ trợ (tâm + bán kính), đứt nét. */
export function guideCircle(g, cx, cy, r, p = 1, { alpha = 1 } = {}) {
  p = clamp(p);
  if (p <= 0) return;
  g.save();
  g.setLineDash([7, 9]);
  g.lineWidth = 1.2;
  g.strokeStyle = C.boneDim;
  g.globalAlpha = alpha;
  g.beginPath();
  g.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + Math.PI*2*p);
  g.stroke();
  g.restore();
}

/** Đầu compa: chấm sáng + quầng. Luôn là thứ sáng nhất khung hình. */
export function point(g, x, y, { r = 5.5, glow = 1, alpha = 1 } = {}) {
  g.save();
  g.globalAlpha = alpha;
  g.globalCompositeOperation = 'lighter';
  const rg = g.createRadialGradient(x, y, 0, x, y, r * 7 * glow);
  rg.addColorStop(0,   'rgba(255,201,77,0.85)');
  rg.addColorStop(0.35,'rgba(255,201,77,0.22)');
  rg.addColorStop(1,   'rgba(255,201,77,0)');
  g.fillStyle = rg;
  g.beginPath(); g.arc(x, y, r*7*glow, 0, Math.PI*2); g.fill();
  g.globalCompositeOperation = 'source-over';
  g.fillStyle = C.goldHot;
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2); g.fill();
  g.restore();
}

/** Nhãn mono có leader line — như bản vẽ kỹ thuật. */
export function label(g, x, y, text, { dx = 26, dy = -22, size = 26, alpha = 1, color = C.bone } = {}) {
  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = C.boneDim;
  g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + dx, y + dy); g.stroke();
  g.font = `400 ${size}px "IBM Plex Mono", monospace`;
  g.fillStyle = color;
  g.textBaseline = 'middle';
  g.textAlign = dx >= 0 ? 'left' : 'right';
  g.fillText(text, x + dx + (dx >= 0 ? 8 : -8), y + dy);
  g.restore();
}
