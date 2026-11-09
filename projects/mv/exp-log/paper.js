// Trang sổ của nhân vật — đoạn đảo nền giấy (P19–P20, 125.66 → 155.70). TREATMENT § Bảng màu: giấy
// #F2EEE4, mực #1E2230 + mực màu. Vàng/xanh sáng của nền tối CHÌM trên giấy (LESSONS §13) → dùng mực
// đậm cùng họ màu. Đồ thị dùng đúng hệ toạ độ của điệp khúc 2 (chorus2.js G): u = v trùng gương
// MIRROR, nên gập tờ giấy theo y = x thì đường mũ đè khít lên đường log — phép gập là phép toán thật.
import { clamp, hash, prog, smooth, lerp } from '../../../engine/lib.js';
import { PAL, MIRROR } from './song.js';
import { foldMatrix, clipSide } from '../../../engine/mirror.js';
import { G, OX, OY } from './chorus2.js';

export const INK = { ink: PAL.ink, gold: '#B87410', blue: '#1F6FBF', red: '#C8323F', back: 'rgba(227,220,203,0.84)' };   // mặt sau hơi trong: thấy nét của nửa bên dưới
export const MARGIN = 150;

/** Trang giấy kẻ ô: ô 40px xanh rất nhạt, lề đỏ, lỗ gáy sổ bên trái. `back`: mặt sau (không kẻ, tối hơn). */
export function page(g, { back = false, x0 = -1600, y0 = -1600, x1 = 3500, y1 = 2700 } = {}) {   // đủ rộng: lật/gập/nghiêng không lộ mép
  g.save();
  g.fillStyle = back ? INK.back : PAL.paper; g.fillRect(x0, y0, x1 - x0, y1 - y0);
  if (!back) {
    g.strokeStyle = 'rgba(31,111,191,0.10)'; g.lineWidth = 1.5;
    g.beginPath();
    for (let x = Math.ceil(x0 / 40) * 40; x <= x1; x += 40) { g.moveTo(x, y0); g.lineTo(x, y1); }   // lưới phủ cả tờ: gập/nghiêng không lộ dải trơn
    for (let y = Math.ceil(y0 / 40) * 40; y <= y1; y += 40) { g.moveTo(x0, y); g.lineTo(x1, y); }
    g.stroke();
    g.strokeStyle = 'rgba(200,50,63,0.35)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(MARGIN, y0); g.lineTo(MARGIN, y1); g.stroke();
    g.fillStyle = '#C9C2B2';
    for (let y = 60; y < 1080; y += 90) { g.beginPath(); g.arc(60, y, 13, 0, Math.PI * 2); g.fill(); }
  }
  g.restore();
}

/** Nét mực vạch dần theo danh sách điểm; trả về đầu bút. */
export function inkPath(g, pts, k, { col = INK.ink, width = 6, dash = null, alpha = 1 } = {}) {
  if (k <= 0 || pts.length < 2) return pts[0];
  const n = Math.max(2, Math.ceil(pts.length * clamp(k)));
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round';
  if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(...pts[0]);
  for (let i = 1; i < n; i++) g.lineTo(...pts[i]);
  g.stroke(); g.restore();
  return pts[n - 1];
}

export const AXES = { h: [[MARGIN + 40, OY], [1600, OY]], v: [[OX, 1040], [OX, 50]] };
export const EXP_PTS = Array.from({ length: 215 }, (_, i) => { const u = -5.4 + i * 0.04; return G(u, 2 ** u); });
export const LOG_PTS = EXP_PTS.map(([x, y]) => [1500 - y, 1500 - x]);      // ảnh qua x + y = 1500

/** Mũi tên đầu trục. */
export function arrowHead(g, [x, y], dir, { col = INK.ink, k = 1 } = {}) {
  if (k < 1) return;
  g.save(); g.translate(x, y); g.rotate(dir); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-26, -16); g.lineTo(0, 0); g.lineTo(-26, 16); g.stroke(); g.restore();
}

/** Chữ viết tay (Cormorant nghiêng) hiện dần từ trái sang. */
export function hand(g, text, x, y, k, { col = INK.ink, size = 64, align = 'left' } = {}) {
  if (k <= 0) return;
  g.save(); g.font = `italic 600 ${size}px "Cormorant Garamond"`; g.textBaseline = 'middle';
  const w = g.measureText(text).width, x0 = align === 'center' ? x - w / 2 : x;
  g.beginPath(); g.rect(x0 - 6, y - size, (w + 12) * clamp(k), size * 2); g.clip();
  g.fillStyle = col; g.textAlign = 'left'; g.fillText(text, x0, y);
  g.restore();
}

/** Ngòi bút ở đầu nét. */
export function nib(g, [x, y], { col = INK.ink } = {}) {
  g.save(); g.translate(x, y); g.rotate(-0.7);
  g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.lineTo(10, -30); g.lineTo(-10, -30); g.closePath(); g.fill();
  g.fillStyle = '#3A3F52'; g.fillRect(-12, -150, 24, 120);
  g.restore();
}

/** Thước kẻ trong suốt đặt dọc gương (k: trượt vào), vạch chia mỗi 40px. */
export function ruler(g, k, { lift = 0 } = {}) {
  if (k <= 0 || lift >= 1) return;
  const a = -Math.PI / 4, L = 1500, off = (1 - k) * 1400 + lift * 400;   // k = 0: hẳn ngoài khung
  g.save(); g.translate(960 + Math.cos(a + Math.PI / 2) * (60 + off), 540 + Math.sin(a + Math.PI / 2) * (60 + off)); g.rotate(a);
  g.globalAlpha = 1 - lift;
  g.fillStyle = 'rgba(31,111,191,0.12)'; g.strokeStyle = 'rgba(30,34,48,0.55)'; g.lineWidth = 2;
  g.fillRect(-L / 2, -10, L, 70); g.strokeRect(-L / 2, -10, L, 70);
  g.beginPath(); for (let i = -L / 2; i <= L / 2; i += 40) { g.moveTo(i, -10); g.lineTo(i, i % 200 === 0 ? 22 : 8); } g.stroke();
  g.restore();
}

/** Vết mực bắn nhỏ quanh điểm (cú loé trên giấy). */
export function splat(g, x, y, k, { col = INK.gold, seed = 0 } = {}) {
  if (k <= 0 || k >= 1) return;
  g.save(); g.fillStyle = col; g.globalAlpha = 1 - k;
  for (let i = 0; i < 14; i++) {
    const a = hash(seed + i * 3.1) * Math.PI * 2, d = (30 + 140 * hash(seed + i * 7.7)) * Math.sqrt(k), r = 3 + 9 * hash(seed + i);
    g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (1 - k * 0.5), 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

const DIAG = Array.from({ length: 50 }, (_, i) => [lerp(470, 1450, i / 49), 1500 - lerp(470, 1450, i / 49)]);

/** Toàn bộ nét mực của trang tại t theo các mốc T (P19 vẽ dần, P20 vẽ đủ với T đã qua). */
export function inkAll(g, t, T, { alpha = 1, labels = true } = {}) {
  const h = inkPath(g, AXES.h, prog(t, T.axes0, T.axes1), { width: 5, alpha });
  arrowHead(g, AXES.h[1], 0, { k: t >= T.axes1 ? 1 : 0 });
  const v = inkPath(g, AXES.v, prog(t, T.axes1, T.axes2), { width: 5, alpha });
  arrowHead(g, AXES.v[1], -Math.PI / 2, { k: t >= T.axes2 ? 1 : 0 });
  if (labels) {
    hand(g, 'x', AXIS_X[0], AXIS_X[1], prog(t, T.axes2, T.axes2 + 0.3), { size: 60 });
    hand(g, 'y', AXIS_Y[0], AXIS_Y[1], prog(t, T.axes2, T.axes2 + 0.3), { size: 60 });
  }
  const e = inkPath(g, EXP_PTS, prog(t, T.exp0, T.exp1, smooth), { col: INK.gold, width: 8, alpha });
  const l = inkPath(g, LOG_PTS, prog(t, T.log0, T.log1, smooth), { col: INK.blue, width: 8, alpha });
  hand(g, 'y = 2ˣ', 960, 110, prog(t, T.lab, T.lab + 0.5), { col: INK.gold, size: 66 });
  hand(g, 'y = log₂ x', 1100, 650, prog(t, T.lab + 0.25, T.lab + 0.75), { col: INK.blue, size: 66 });
  const d = inkPath(g, DIAG, prog(t, T.yx0, T.yx1), { width: 5, dash: [22, 16], alpha });
  hand(g, 'y = x', 1300, 110, prog(t, T.yx1, T.yx1 + 0.4), { size: 66 });
  return { h, v, e, l, d };
}


export const AXIS_X = [AXES.h[1][0] - 10, 860], AXIS_Y = [AXES.v[1][0] + 26, 70];   // vị trí nhãn trục
export const FOLD_HOLD = 0.12;   // c khi nếp gập "dừng ở 90°" (P19 giữ, P20 gập nốt)
export const STROKES = [128.28, 130.42, 132.51, 134.66, 136.80, 138.94];   // data/stems.json: percussion mỗi ô nhịp

/** Mốc vẽ của trang (P19 vẽ dần; P20 vẽ lại đủ với cùng mốc). */
export function paperTimes(tl) {
  const L = (x) => tl.line(x), put = L('Put them on the axes.');
  return {
    axes0: put.start + 0.15, axes1: put.words[2].start, axes2: put.end,
    exp0: STROKES[0] - 0.6, exp1: STROKES[0] + 1.5, log0: STROKES[1], log1: STROKES[1] + 1.4, lab: STROKES[2],
    ruler: L('Draw one line:').start, yx0: L('y equals x.').start, yx1: STROKES[4] + 0.1,
    fold0: L('Fold the whole picture—').start, hold: L('watch what happens next.').start,
  };
}

/**
 * Tờ giấy tại t: flap = c của nửa trên-trái (gập theo gương), whole = c của cả tờ (lật sang mặt sau),
 * tear = khoảng tách hai nửa dọc pháp tuyến gương (px). Mặt sau: giấy tối hơn, mực thấm ngược 45%.
 * Dùng phép phản xạ thật (c < 0) — nên khi gập hẳn, đường mũ nằm ĐÚNG lên đường log.
 */
export function sheet(g, t, T, { flap = 1, whole = 1, tear = 0, labels = true, extra = null } = {}) {
  const n = [Math.SQRT1_2, Math.SQRT1_2];                      // pháp tuyến về phía nửa dưới-phải
  for (const s of [1, -1]) {
    g.save();
    g.translate(n[0] * tear * s, n[1] * tear * s);
    g.transform(...foldMatrix(MIRROR, whole));
    const c = s === -1 ? flap : 1;
    if (c < 1) g.transform(...foldMatrix(MIRROR, c));
    clipSide(g, MIRROR, s);
    const back = whole * c < 0;
    page(g, { back });
    inkAll(g, t, T, { alpha: back ? 0.45 : 1, labels });
    if (extra) extra(g, back);
    const shade = 1 - Math.abs(whole * c);
    if (shade > 0) { g.fillStyle = `rgba(30,34,48,${0.35 * shade})`; g.fillRect(-1600, -1600, 5100, 4300); }
    if (s === 1 && flap < 1) crease(g, flap);
    g.restore();
  }
}

/** Bóng nếp gấp trên nửa đứng yên (P19 và P20 dùng cùng công thức → liền qua 140.09). */
export function crease(g, c) {
  g.save(); g.strokeStyle = `rgba(30,34,48,${0.25 * (1 - Math.abs(c))})`; g.lineWidth = 40; g.filter = 'blur(12px)';
  g.beginPath(); g.moveTo(420, 1080); g.lineTo(1500, 0); g.stroke(); g.restore();
}
