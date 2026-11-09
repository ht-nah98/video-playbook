// Hàm cục bộ chung của nhóm G2 (b1–c4). Không phải cảnh (không nằm trong p2-order). Thuần, tất định.
import { C, TAU, clamp, outCubic } from '../kit.js';
export const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
export const bump = (t, a) => t < a ? 0 : t < a + 0.08 ? (t - a) / 0.08 : clamp(1 - (t - a - 0.08) / 0.22);
export const shade = (g, fn, blur = 26, oy = 10, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
/** Khoanh mực (§61). */
export function ring(g, cx, cy, rx, ry, k, col = C.ink) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = col; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
  g.ellipse(cx, cy, rx, ry, -0.05, -2.3, -2.3 + TAU * 1.04 * outCubic(clamp(k))); g.stroke(); g.restore();
}
export function underline(g, x0, x1, y, k, col = C.ink) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = col; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (x1 - x0) * outCubic(clamp(k)), y + 1); g.stroke(); g.restore();
}
/** Thứ tự tất định của n viên theo hash (cùng công thức capsuleGrid). */
export const order = (hash, n, seed) => Array.from({ length: n }, (_, i) => [hash(i * 13.7 + seed * 101.3), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);
/** Điền khoảng lặng: mỗi khoảng > max giữa hai tiếng (kể cả tiếng chuyển cảnh ở from + 0.45) nhận thêm 'tick' ở giữa; bỏ tiếng sát nhau < 0.25 s. */
export function fillGaps(cues, from, max = 3.9, first = true) {
  const c = [...cues].sort((a, b) => a.t - b.t), res = [];
  if (first) res.push({ t: +(from + 0.45).toFixed(3), kind: '_sentinel' });
  for (const q of c) if (!res.length || q.t - res.at(-1).t >= 0.25) res.push(q);
  const outc = [];
  for (let i = 0; i < res.length; i++) {
    outc.push(res[i]);
    if (i + 1 < res.length) { const gap = res[i + 1].t - res[i].t, n = Math.ceil(gap / max) - 1;
      for (let j = 1; j <= n; j++) outc.push({ t: +(res[i].t + gap * j / (n + 1)).toFixed(3), kind: 'tick' }); }
  }
  return outc.filter(q => q.kind !== '_sentinel');
}
/** Hiện kiểu nở từ tâm (cx, cy) thay vì trượt từ ngoài khung — chữ luôn nằm trong vùng an toàn. e = 0..1 (đã làm mượt). Gọi trong g.save(). */
export function pop(g, cx, cy, e) { const s = 0.6 + 0.4 * e; g.translate(cx, cy); g.scale(s, s); g.translate(-cx, -cy); g.globalAlpha *= Math.min(1, e * 2.5); }
