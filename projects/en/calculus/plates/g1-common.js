// Đồ dùng chung của nhóm G1 (b01–b06) — hàm cục bộ, KHÔNG sửa kit.js. Nếu nhóm khác muốn dùng thì đạo diễn đưa vào kit.
import { H, C, AR, clamp, prog, outCubic, outBack, line, text, card, pen, rr, loupe, plot, rangingPole, spot, view, figure, hiker, sq } from '../kit.js';

export const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
export const nudge = (t, a) => 1 + 0.16 * Math.sin(Math.PI * prog(t, a, a + 0.35));
/** Nội suy tuyến tính qua các mốc [[t, v], …] (v giữ nguyên ngoài đầu / cuối). */
export const pw = (t, pts) => {
  if (t <= pts[0][0]) return pts[0][1]; if (t >= pts.at(-1)[0]) return pts.at(-1)[1];
  for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return b === a ? vb : va + (vb - va) * (t - a) / (b - a); }
};
/** Mascot trồi lên ở góc dưới trái (cx 205, cao 262), nói; ra bằng lặn xuống. */
export function mascotAt(g, t, pose, tin, tout) {
  const kIn = prog(t, tin, tin + 0.5), kOut = prog(t, tout, tout + 0.45);
  if (kIn <= 0 || kOut >= 1) return;
  g.save(); g.translate(0, outCubic(kOut) * 300); figure(g, pose, 205, H, 262, kIn, { t }); g.restore();
}
/** Người đi bộ đứng ở x = u trên sườn (khung V), đúng cách a0 đặt. */
export function walker(g, V, u, s, o = {}) { hiker(g, V.X(u) - 6 * s, V.Y(sq(u)) - 6, s, o); }

/** Dấu "?" đỏ (điểm đang hỏi) cạnh sào lơ lửng — b01 và b02 vẽ giống hệt (mối nối thước dây). */
export function qMark(g, t, k, lift = 0) {
  if (k <= 0 || lift >= 1) return;
  const up = outCubic(clamp(lift)) ** 1.5 * 700;
  scaled(g, 905, 520 - up, outBack(clamp(k), 2), () => text(g, '?', 905, 560 - up, { font: `900 170px ${AR}`, color: C.poleInk, align: 'center' }));
}
/** Tam giác RISE / RUN navy (b02, đầu b03): P = (1, 1), Q = (x2, x2²) trong khung V. rise / run: chuỗi thẻ (null = chưa có thẻ). */
export function triangle(g, V, x2, { kRun = 1, kRise = 1, lift = 0, riseTxt = null, runTxt = null, riseK = 1, runK = 1 } = {}) {
  if (lift >= 1) return;
  const P = [V.X(1), V.Y(1)], Q = [V.X(x2), V.Y(sq(x2))], up = outCubic(clamp(lift)) ** 1.5 * 800;
  g.save(); g.translate(0, -up);
  if (kRun > 0) line(g, P[0], P[1], P[0] + (Q[0] - P[0]) * outCubic(kRun), P[1], C.ink, 6);
  if (kRise > 0) line(g, Q[0], P[1], Q[0], P[1] + (Q[1] - P[1]) * outCubic(kRise), C.ink, 6);
  g.restore();
  if (riseTxt) card(g, riseTxt, Q[0] + 135, (P[1] + Q[1]) / 2 + 40, { size: 36, minW: 230, k: riseK, lift, edge: C.ink });
  if (runTxt) card(g, runTxt, (P[0] + Q[0]) / 2 + 45, P[1] - 56, { size: 36, minW: 230, k: runK, lift, edge: C.ink });
}
/** Khoanh viền chữ nhật bo góc bằng bút navy, vẽ dần theo k. */
export function ringRect(g, x, y, w, h, r, k, { color = C.ink, lw = 6 } = {}) {
  if (k <= 0) return;
  const per = 2 * (w + h) - (8 - 2 * Math.PI) * r;
  g.save(); g.strokeStyle = color; g.lineWidth = lw; g.lineCap = 'round'; g.setLineDash([per * outCubic(clamp(k)), per + 20]); g.stroke(rr(x, y, w, h, r)); g.restore();
}

/** Kính lúp thợ đo cạnh khung zoom (b04, b05): soi cọc thứ hai x2 sát điểm (1, 1). Độ phóng sao cho khoảng x2 − 1 luôn ~ 110 px. */
export const LOUPE = { cx: 1470, cy: 800, r: 170 };
export function zoomLoupe(g, x2, k) {
  if (k <= 0) return;
  const { cx, cy, r } = LOUPE, dx = x2 - 1, sx = 70 / dx, sy = sx * 420 / 760, px = cx - 50, py = cy + 50, Vl = view(1, 1, px, py, sx, sy);
  line(g, 830, 650, cx - r - 6, cy - 40, 'rgba(34,49,59,0.45)', 3);                      // nối từ (1, 1) ở khung chính tới kính
  loupe(g, cx, cy, r, () => {
    const ua = Vl.u(cx - r - 30), ub = Vl.u(cx + r + 30), p = new Path2D(); p.moveTo(cx - r - 30, cy + r + 80);
    for (let i = 0; i <= 40; i++) { const u = ua + (ub - ua) * i / 40; p.lineTo(Vl.X(u), Vl.Y(u * u)); }
    p.lineTo(cx + r + 30, cy + r + 80); p.closePath(); g.fillStyle = C.face; g.fill(p);
    plot(g, Vl, sq, ua, ub, { color: C.curve, w: 8 });
    const m = 1 + x2, yy = u => 1 + m * (u - 1);
    line(g, Vl.X(ua), Vl.Y(yy(ua)), Vl.X(ub), Vl.Y(yy(ub)), C.sec, 6);
    rangingPole(g, Vl.X(x2), Vl.Y(x2 * x2), { h: 100, w: 9 });
    spot(g, px, py, { r: 11 });
  }, { k });
}
