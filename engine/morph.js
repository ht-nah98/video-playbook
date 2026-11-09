// engine/morph.js
// Ký hiệu nổ ra rồi tụ lại thành hình sau (TREATMENT § Nhịp & chuyển cảnh; TEARDOWN §5).
// Tập điểm nguồn A → tập điểm đích B; mỗi hạt lệch pha riêng và phình ra giữa đường
// (nổ), rồi co về đích (tụ). Hàm thuần của k và t.
import { hash, clamp } from './lib.js';
import { GLYPHS } from './glyphs.js';

const LAG = 0.35;                                   // lệch pha tối đa giữa các hạt

/** Vị trí hạt i ở tiến độ k ∈ [0,1]: k=0 → a, k=1 → b. Trả [x, y, u] với u là tiến độ riêng của hạt. */
export function morphPoint(a, b, k, i, { spread = 240, swirl = 0.5 } = {}) {
  const u = clamp((k - hash(i * 7.3) * LAG) / (1 - LAG));
  const e = u * u * (3 - 2 * u);
  const ang = hash(i * 3.1) * Math.PI * 2 + swirl * e * 6;
  const bulge = Math.sin(Math.PI * e) * spread * (0.5 + hash(i * 5.9));
  return [a[0] + (b[0] - a[0]) * e + Math.cos(ang) * bulge, a[1] + (b[1] - a[1]) * e + Math.sin(ang) * bulge, u];
}

/** Điểm đều trên chu vi hình vuông tâm (cx, cy), cạnh s. */
export function squarePoints(cx, cy, s, n = 80) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = (i / n) * 4, e = Math.floor(p), f = p - e, h = s / 2;
    const [x, y] = [[-h + f * s, -h], [h, -h + f * s], [h - f * s, h], [-h, h - f * s]][e];
    out.push([cx + x, cy + y]);
  }
  return out;
}

/** Vẽ đám hạt đang biến hình. n hạt; A, B lặp vòng nếu ngắn hơn n. Màu nội suy colA → colB theo u. */
export function drawMorph(g, A, B, k, t, { n = Math.max(A.length, B.length), font = '500 22px "IBM Plex Mono"',
  colA = '#FFB547', colB = '#3FB8FF', spread = 240, alpha = 1 } = {}) {
  if (!A.length || !B.length || k <= 0 || k >= 1) return;
  g.save(); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const [x, y, u] = morphPoint(A[i % A.length], B[i % B.length], k, i, { spread });
    g.globalAlpha = alpha;
    g.fillStyle = u < 0.5 ? colA : colB;
    g.fillText(GLYPHS[Math.floor(hash(i * 1.7 + Math.floor(t * 20)) * GLYPHS.length)], x, y);
  }
  g.restore();
}

/**
 * Cả cảnh vỡ thành ký hiệu (lối ra mặc định của cảnh — chữ không bao giờ tắt cứng).
 * paint(ctx) vẽ nội dung cảnh; k ∈ [0,1]: 0 = vẽ nguyên, 1 = tan hết. Mỗi ô `cell` px có
 * nội dung thành MỘT ký hiệu mang màu của chính ô đó, bay ra xa dần và mờ đi.
 * Đắt (đọc pixel) — chỉ gọi trong ~0.3–0.4s chuyển cảnh.
 */
let sbuf = null;
export function shatter(g, paint, k, t, { cell = 12, seed = 0, spread = 0.35 } = {}) {
  if (k <= 0) { paint(g); return; }
  if (k >= 1) return;
  const W = g.canvas.width, H = g.canvas.height;
  if (!sbuf) { sbuf = document.createElement('canvas'); sbuf.width = W; sbuf.height = H; }
  const b = sbuf.getContext('2d', { willReadFrequently: true });
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.setTransform(g.getTransform()); paint(b); b.restore();
  const d = b.getImageData(0, 0, W, H).data;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  g.font = `600 ${cell + 4}px "IBM Plex Mono"`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let y = cell / 2; y < H; y += cell) for (let x = cell / 2; x < W; x += cell) {
    const p = (Math.floor(y) * W + Math.floor(x)) * 4;
    if (d[p + 3] < 60) continue;
    const o = hash(x * 0.131 + y * 7.17 + seed);
    const u = clamp((k - o * 0.4) / 0.6);                  // ô sau vỡ muộn hơn
    if (u >= 1) continue;
    const ang = hash(x * 3.3 + y * 0.71 + seed) * Math.PI * 2, dist = u * u * spread * W;
    g.globalAlpha = 1 - u;
    g.fillStyle = `rgb(${d[p]},${d[p + 1]},${d[p + 2]})`;
    g.fillText(GLYPHS[Math.floor(o * GLYPHS.length)], x + Math.cos(ang) * dist, y + Math.sin(ang) * dist);
  }
  g.restore();
}
