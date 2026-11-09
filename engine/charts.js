// Thư viện biểu đồ toán — mỗi cái là một MÔN HỌC của kênh, vẽ dần theo p (0→1).
// Dùng chung bộ dụng cụ của draw.js để giữ ngữ pháp màu:
//   gold-hot = đang vẽ · gold = vừa xong · teal = đã chứng minh · bone-dim = phụ
import { C, clamp, lerp, prog, hash } from './lib.js';
import { inkColor, guide, point, label } from './draw.js';

/** Trục toạ độ mảnh, có vạch chia. Trả về hàm đổi toạ độ toán -> pixel. */
export function axes(g, cx, cy, sx, sy, { p = 1, xr = 3.2, yr = 2.6, ticks = true } = {}) {
  const X = u => cx + u * sx, Y = v => cy - v * sy;
  g.save();
  g.strokeStyle = C.teal; g.lineWidth = 2; g.globalAlpha = 0.85 * p;
  g.beginPath(); g.moveTo(X(-xr), Y(0)); g.lineTo(X(xr * p), Y(0)); g.stroke();
  g.beginPath(); g.moveTo(X(0), Y(-yr)); g.lineTo(X(0), Y(yr * p)); g.stroke();
  // đầu mũi tên
  for (const [ax, ay, dx, dy] of [[X(xr*p), Y(0), -12, 6], [X(0), Y(yr*p), 6, 12]]) {
    g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax + dx, ay - dy); g.lineTo(ax + dx, ay + dy);
    g.closePath(); g.fillStyle = C.teal; g.fill();
  }
  if (ticks) {
    g.strokeStyle = C.boneDim; g.lineWidth = 1.2; g.globalAlpha = 0.5 * p;
    for (let i = -3; i <= 3; i++) {
      if (!i) continue;
      g.beginPath(); g.moveTo(X(i), Y(0)-6); g.lineTo(X(i), Y(0)+6); g.stroke();
      g.beginPath(); g.moveTo(X(0)-6, Y(i)); g.lineTo(X(0)+6, Y(i)); g.stroke();
    }
  }
  g.restore();
  return { X, Y };
}

/** Đồ thị hàm số vẽ dần trái→phải. Trả về [x,y] đầu bút. */
export function curve(g, fn, X, Y, x0, x1, p, { width = 5, age = 0, color = null, alpha = 1 } = {}) {
  p = clamp(p);
  if (p <= 0) return [X(x0), Y(fn(x0))];
  const n = 140, xe = lerp(x0, x1, p);
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.lineWidth = width; g.globalAlpha = alpha;
  g.strokeStyle = color || inkColor(age);
  g.beginPath();
  for (let i = 0; i <= n; i++) {
    const x = lerp(x0, xe, i / n), y = fn(x);
    i ? g.lineTo(X(x), Y(y)) : g.moveTo(X(x), Y(y));
  }
  g.stroke(); g.restore();
  return [X(xe), Y(fn(xe))];
}

/** GIẢI TÍCH: đồ thị + đạo hàm + cực trị đánh dấu. */
export function calculus(g, cx, cy, sx, sy, p, { t = 0 } = {}) {
  const { X, Y } = axes(g, cx, cy, sx, sy, { p: clamp(p * 3) });
  const f  = x => x*x*x - 3*x;
  const df = x => 3*x*x - 3;
  const pc = prog(p, 0.18, 0.72);
  curve(g, f, X, Y, -2.1, 2.1, pc, { width: 5, age: (1 - pc) * 1.6 });
  // đạo hàm mờ hơn, vẽ sau
  const pd = prog(p, 0.45, 0.88);
  // đạo hàm 3x²−3 mọc rất nhanh -> chia 2.2 để nằm gọn trong ô, vẫn đúng hình
  if (pd > 0) curve(g, x => df(x) / 2.2, X, Y, -2.1, 2.1, pd,
                    { width: 3, color: C.teal, alpha: 0.72 });
  // cực trị: f'(x)=0 tại x=±1
  const pe = prog(p, 0.72, 0.95);
  if (pe > 0) for (const [x, lab] of [[-1, '+2'], [1, '−2']]) {
    const px = X(x), py = Y(f(x));
    point(g, px, py, { r: 5 * pe, glow: 1.2 });
    g.save(); g.globalAlpha = pe;
    g.font = '600 26px "IBM Plex Mono", monospace'; g.fillStyle = C.goldHot;
    g.textAlign = 'center'; g.fillText(lab, px, py + (x < 0 ? -22 : 40)); g.restore();
  }
  return { X, Y };
}

/** HÌNH HỌC: tam giác đều dựng bằng hai cung tròn (Euclid I.1). */
export function geometry(g, cx, cy, R, p) {
  const ax = cx - R/2, ay = cy + R*0.36, bx = cx + R/2, by = ay;
  const pl = prog(p, 0, 0.22);
  g.save(); g.lineCap = 'round';
  g.lineWidth = 4; g.strokeStyle = inkColor((1-pl)*1.4); g.globalAlpha = pl;
  g.beginPath(); g.moveTo(ax, ay); g.lineTo(lerp(ax,bx,pl), ay); g.stroke(); g.restore();
  // hai cung
  const pa = prog(p, 0.20, 0.62);
  if (pa > 0) for (const [ox, oy, a0] of [[ax,ay,-Math.PI*0.52],[bx,by,-Math.PI*0.48]]) {
    g.save(); g.lineWidth = 2.6; g.globalAlpha = 0.8;
    g.strokeStyle = inkColor((1-pa)*1.2);
    g.beginPath();
    const sweep = (ox === ax ? 1 : -1) * Math.PI * 0.34 * pa;
    g.arc(ox, oy, R, a0, a0 + sweep, sweep < 0); g.stroke(); g.restore();
  }
  // đỉnh + hai cạnh
  const pv = prog(p, 0.58, 0.92);
  if (pv > 0) {
    const vx = cx, vy = ay - R * Math.sqrt(3) / 2;
    g.save(); g.lineCap='round'; g.lineWidth = 4; g.globalAlpha = pv;
    g.strokeStyle = inkColor((1-pv)*1.2);
    g.beginPath(); g.moveTo(ax,ay); g.lineTo(lerp(ax,vx,pv), lerp(ay,vy,pv)); g.stroke();
    g.beginPath(); g.moveTo(bx,by); g.lineTo(lerp(bx,vx,pv), lerp(by,vy,pv)); g.stroke();
    g.restore();
    if (pv > 0.9) point(g, vx, vy, { r: 5, glow: 1.1 });
  }
}

/** XÁC SUẤT: biểu đồ cột phân phối, mọc lên theo nhịp. */
export function probability(g, cx, cy, w, h, p, { bars = 9 } = {}) {
  const bw = w / bars * 0.68, gap = w / bars;
  g.save();
  for (let i = 0; i < bars; i++) {
    const k = prog(p, i / bars * 0.62, i / bars * 0.62 + 0.30);
    if (k <= 0) continue;
    // phân phối chuẩn rời rạc
    const u = (i - (bars-1)/2) / (bars/3.1);
    const hv = Math.exp(-u*u/2) * h;
    const x = cx - w/2 + i*gap + (gap-bw)/2, y = cy - hv*k;
    g.globalAlpha = 0.9;
    g.fillStyle = k < 1 ? C.goldHot : (i === (bars-1)/2 ? C.goldHot : C.gold);
    g.fillRect(x, y, bw, hv*k);
  }
  // đường cong bao
  const pc = prog(p, 0.55, 0.95);
  if (pc > 0) {
    g.globalAlpha = 0.9; g.strokeStyle = C.teal; g.lineWidth = 3;
    g.beginPath();
    const n = 90;
    for (let i = 0; i <= n*pc; i++) {
      const u = lerp(-3.1, 3.1, i/n), x = cx + u*(w/6.2), y = cy - Math.exp(-u*u/2)*h;
      i ? g.lineTo(x,y) : g.moveTo(x,y);
    }
    g.stroke();
  }
  g.restore();
}

/** ĐẠI SỐ: khai triển (a+b)² thành lưới diện tích. */
export function algebra(g, cx, cy, S, p) {
  const a = S * 0.58, b = S * 0.42;
  const x0 = cx - S/2, y0 = cy - S/2;
  const cells = [[0,0,a,a,'a²',C.gold],[a,0,b,a,'ab',C.teal],
                 [0,a,a,b,'ab',C.teal],[a,a,b,b,'b²',C.goldHot]];
  g.save();
  cells.forEach((c, i) => {
    const k = prog(p, i*0.17, i*0.17 + 0.34);
    if (k <= 0) return;
    const [dx,dy,w,h,lab,col] = c;
    g.globalAlpha = 0.20 * k; g.fillStyle = col;
    g.fillRect(x0+dx, y0+dy, w*k, h*k);
    g.globalAlpha = 0.95 * k; g.strokeStyle = col; g.lineWidth = 2.4;
    g.strokeRect(x0+dx, y0+dy, w*k, h*k);
    if (k > 0.75) {
      g.globalAlpha = (k-0.75)*4; g.fillStyle = col;
      g.font = '600 26px "IBM Plex Mono", monospace';
      g.textAlign='center'; g.textBaseline='middle';
      g.fillText(lab, x0+dx+w/2, y0+dy+h/2);
    }
  });
  g.restore();
}
