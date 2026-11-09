// Tấm gương y = x — mô-típ trung tâm của exp-log (TREATMENT § Ý tưởng).
// Logarit LÀ ảnh của hàm mũ qua y = x: phần toán ở đây là thật, không trang trí.
export const line = (x0, y0, x1, y1) => ({ x0, y0, x1, y1 });

function unit(L) {
  const dx = L.x1 - L.x0, dy = L.y1 - L.y0, n = Math.hypot(dx, dy);
  return n < 1e-9 ? null : [dx / n, dy / n];
}

export function mirrorMatrix(L) {
  const u = unit(L);
  if (!u) return [1, 0, 0, 1, 0, 0];
  const [ux, uy] = u;
  const a = 2 * ux * ux - 1, b = 2 * ux * uy, c = b, d = 2 * uy * uy - 1;
  return [a, b, c, d, L.x0 - (a * L.x0 + c * L.y0), L.y0 - (b * L.x0 + d * L.y0)];
}

/**
 * Lật khung quanh đường gương như lật tấm bìa: thành phần vuông góc với gương nhân c.
 * c = 1 → giữ nguyên; c = 0 → dẹt thành đường gương; c = −1 → đúng bằng mirrorMatrix.
 * Dùng c = cos(πk) để lật từ k = 0 tới k = 1.
 */
export function foldMatrix(L, c) {
  const u = unit(L);
  if (!u) return [1, 0, 0, 1, 0, 0];
  const [ux, uy] = u, q = c - 1;                     // A = I + (c − 1)·n·nᵀ, n = (−uy, ux)
  const a = 1 + q * uy * uy, b = -q * ux * uy, d = 1 + q * ux * ux;
  return [a, b, b, d, L.x0 - (a * L.x0 + b * L.y0), L.y0 - (b * L.x0 + d * L.y0)];
}

export function reflectPoint([x, y], L) {
  const [a, b, c, d, e, f] = mirrorMatrix(L);
  return [a * x + c * y + e, b * x + d * y + f];
}

export function side([x, y], L) {
  const v = (L.x1 - L.x0) * (y - L.y0) - (L.y1 - L.y0) * (x - L.x0);
  return Math.abs(v) < 1e-6 ? 0 : v > 0 ? 1 : -1;
}

export function drawMirrorLine(g, L, k, { color = '#F4F1EA', width = 4, glow = 24 } = {}) {
  if (k <= 0) return;
  const mx = (L.x0 + L.x1) / 2, my = (L.y0 + L.y1) / 2, h = Math.min(1, k) / 2;
  g.save();
  g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round';
  g.shadowColor = color; g.shadowBlur = glow;
  g.beginPath();
  g.moveTo(mx + (L.x0 - mx) * h * 2, my + (L.y0 - my) * h * 2);
  g.lineTo(mx + (L.x1 - mx) * h * 2, my + (L.y1 - my) * h * 2);
  g.stroke();
  g.restore();
}

let buf = null;
export function drawReflected(g, L, fn, { tint = '#3FB8FF', tintAlpha = 0.55, alpha = 1 } = {}) {
  const W = g.canvas.width, H = g.canvas.height;
  buf ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
  const b = buf.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.setTransform(g.getTransform()); b.transform(...mirrorMatrix(L)); fn(b); b.restore();   // giữ camera/biến đổi hiện hành của g
  b.save(); b.globalCompositeOperation = 'source-atop'; b.globalAlpha = tintAlpha;
  b.fillStyle = tint; b.fillRect(0, 0, W, H); b.restore();
  g.save(); g.globalAlpha = alpha; g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(buf, 0, 0); g.restore();
}

export function clipSide(g, L, s) {
  const u = unit(L); if (!u) return;
  const big = 5000, [ux, uy] = u, nx = -uy * s, ny = ux * s;   // pháp tuyến về phía side = s
  const ax = L.x0 - ux * big, ay = L.y0 - uy * big, bx = L.x0 + ux * big, by = L.y0 + uy * big;
  g.beginPath();
  g.moveTo(ax, ay); g.lineTo(bx, by);
  g.lineTo(bx + nx * big, by + ny * big); g.lineTo(ax + nx * big, ay + ny * big);
  g.closePath(); g.clip();
}

// Nhuộm một nhóm nét (vd. ẢNH trong gương nhuộm xanh) — bộ đệm riêng, không đụng bộ đệm của drawReflected/shatter.
let tb = null;
/** Vẽ fn vào bộ đệm riêng (giữ biến đổi hiện hành của g), nhuộm col ở alpha a rồi dán lại. */
export function tinted(g, fn, col = '#3FB8FF', a = 0.38) {
  const W = g.canvas.width, H = g.canvas.height;
  tb ||= Object.assign(document.createElement('canvas'), { width: W, height: H });
  const b = tb.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, W, H);
  b.save(); b.setTransform(g.getTransform()); fn(b); b.restore();
  b.save(); b.globalCompositeOperation = 'source-atop'; b.globalAlpha = a; b.fillStyle = col; b.fillRect(0, 0, W, H); b.restore();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(tb, 0, 0); g.restore();
}
