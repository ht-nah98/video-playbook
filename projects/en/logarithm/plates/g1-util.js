// Vật phụ dùng chung của nhóm G1 (b01–b04): ô chờ nét đứt, thẻ công thức gõ dần từng đoạn, khoanh navy, mũi tên navy, mascot ra/vào.
// Không phải cảnh (không được liệt kê trong p2-order.js); chỉ các cảnh b01–b04 import. Thuần hàm của t.
import { H, C, AR, clamp, prog, outBack, outCubic, rr, measure, text, line, shadowRR, figure, SAFE } from '../kit.js';

export const lerp = (a, b, u) => a + (b - a) * u;
/** Nhún một lần quanh mốc a (1 → 1.18 → 1, 0.35 s). */
export const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
export const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };

/**
 * Ô chờ nét đứt xếp chồng (hoặc treo ngược) ở (x, base): ô i vẽ khi i ≥ placed (khối chưa nằm), hiện theo k[i] (0…1).
 * s = cạnh khối; hang: xếp xuống dưới base.
 */
export function slots(g, x, base, n, { s = 110, h = s, k = 1, placed = 0, hang = false, wig = 0 } = {}) {
  for (let i = Math.floor(placed + 1e-9); i < n; i++) {
    const kk = Array.isArray(k) ? k[i] : clamp(k - i * 0); if (!kk || kk <= 0) continue;
    const y = hang ? base + i * h : base - (i + 1) * h, dx = wig ? 4 * Math.sin(wig * 40 + i) : 0;
    g.save(); g.globalAlpha = clamp(kk * 2); g.setLineDash([12, 10]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 4;
    g.stroke(rr(x - s / 2 + dx, y, s, h, 8)); g.restore();
  }
}

/**
 * Thẻ giấy treo có công thức GÕ DẦN theo đoạn: segs = [{ s, at, color }] — đoạn hiện (in dần 0.25 s) tại giờ `at`. Hộp cố định
 * theo toàn chuỗi (không nhảy). edge = dải màu trên. lift (0…1) nhấc thẻ khỏi khung. Trả về { x, y, w, h, parts: [{x, w}] } (toạ độ màn hình).
 */
export function eqCard(g, t, cx, cy, segs, { size = 44, edge = C.ink, k = 1, lift = 0, string = null } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const font = `800 ${size}px ${AR}`, ws = segs.map(sg => measure(g, sg.s, font)), tw = ws.reduce((a, b) => a + b, 0);
  const w = tw + 70, h = Math.round(size * 1.55), up = outCubic(clamp(lift)) ** 1.5 * (cy + h + 60);
  const y = cy - up, x0 = cx - w / 2;
  if (k >= 1 && lift <= 0 && (x0 < SAFE[0] || x0 + w > SAFE[1])) throw new Error(`eqCard "${segs.map(q => q.s).join('')}": x ${Math.round(x0)}…${Math.round(x0 + w)} ngoài vùng an toàn`);
  const e = outBack(clamp(k), 2.0), sw = 0.05 * (1 - clamp(k)) * Math.sin(k * 12);
  if (string) line(g, string[0], string[1], cx - w / 2 + 18, y, C.string, 2.5);
  g.save(); g.translate(cx, y); g.rotate(sw); g.scale(e, e);
  shadowRR(g, -w / 2, -h / 2, w, h, 10, { col: 'rgba(40,60,80,0.22)', blur: 10, ox: 3, oy: 6 });
  g.fillStyle = C.card; g.fill(rr(-w / 2, -h / 2, w, h, 10));
  g.save(); g.clip(rr(-w / 2, -h / 2, w, h, 10)); g.fillStyle = edge; g.fillRect(-w / 2, -h / 2, w, 8); g.restore();
  g.fillStyle = C.white; g.strokeStyle = C.birchDk; g.lineWidth = 2; g.beginPath(); g.arc(-w / 2 + 18, 0, 6, 0, Math.PI * 2); g.fill(); g.stroke();
  let px = -tw / 2 + 8; const parts = [];
  segs.forEach((sg, i) => { text(g, sg.s, px, 4, { font, color: sg.color || C.ink, base: 'middle', k: prog(t, sg.at, sg.at + 0.25) });
    parts.push({ x: cx + px * e, w: ws[i] * e }); px += ws[i]; });
  g.restore();
  return { x: x0, y: y - h / 2, w, h, parts, cy: y };
}

/** Khoanh navy (nét đứt vẽ dần) quanh hộp (x, y, w, h) — màu nhấn chỉ navy (LESSONS §61). */
export function ring(g, x, y, w, h, k, { pad = 12 } = {}) {
  if (k <= 0) return;
  const L = 2 * (w + h + 4 * pad);
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.setLineDash([L * clamp(k), L]); g.stroke(rr(x - pad, y - pad, w + 2 * pad, h + 2 * pad, 18)); g.restore();
}

/** Mũi tên navy thẳng vẽ dần từ (x0, y0) tới (x1, y1). */
export function arrow(g, x0, y0, x1, y1, k, { w = 9, col = C.ink } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = lerp(x0, x1, e), ye = lerp(y0, y1, e), a = Math.atan2(y1 - y0, x1 - x0);
  line(g, x0, y0, xe - Math.cos(a) * 10, ye - Math.sin(a) * 10, col, w);
  g.save(); g.translate(xe, ye); g.rotate(a); g.fillStyle = col; g.beginPath(); g.moveTo(8, 0); g.lineTo(-26, -20); g.lineTo(-26, 20); g.closePath(); g.fill(); g.restore();
}

/** Mascot ở góc dưới trái: vào ở a, chìm ở b. Vẽ SAU CÙNG ở toạ độ màn hình. */
export function mascot(g, t, pose, a, b, { cx = 150, h = 262, talk = true } = {}) {
  const kin = prog(t, a, a + 0.5), sink = outCubic(prog(t, b, b + 0.5));
  if (kin <= 0 || sink >= 1) return;
  g.save(); g.translate(0, sink * 320); figure(g, pose, cx, H, h, kin, { t, talk }); g.restore();
}

/** Mũi tên tím "hỏi ngược" vòng quanh tâm (cx, cy) bán kính R (a0 S5): vẽ dần theo k (0…1). Tím vì nó LÀ logarit. */
export function backArrow(g, cx, cy, R, k) {
  if (k <= 0) return;
  const a0 = -Math.PI * 0.45, a1 = a0 + Math.PI * 1.1 * clamp(k);
  g.save(); g.strokeStyle = C.log; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, R, -a0, -a1, true); g.stroke();
  const ex = cx + R * Math.cos(-a1), ey = cy + R * Math.sin(-a1), dir = -a1 - Math.PI / 2;
  g.translate(ex, ey); g.rotate(dir); g.fillStyle = C.log; g.beginPath(); g.moveTo(16, 0); g.lineTo(-14, -18); g.lineTo(-14, 18); g.closePath(); g.fill(); g.restore();
}
