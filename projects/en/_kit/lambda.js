// Ký tự λ của kênh Anh (§247): chỉ biểu cảm, không tương tác với hình toán. Thân là chữ λ, mắt to trên đỉnh.
// Diễn bằng đồng tử, mí, miệng nhỏ, nghiêng thân. Hàm thuần của tham số (tất định).
export const LAMBDA_COLOR = '#17907A';
const PUPIL = '#16233A';
export const MODES = {
  plain: {}, pondering: { lid: .35, look: [.7, -.5], mouth: -.1, lean: .03 }, confused: { lid: .1, tilt: .7, look: [.6, -.3], mouth: -.8, lean: -.08 },
  hesitant: { lid: .3, look: [-.5, .4], mouth: -.45, lean: .08, sy: .97 }, surprised: { wide: 1, look: [.5, -.3], mouth: 0, oh: 1, sy: 1.07, lean: -.05 },
  tease: { lid: .42, tilt: -.5, look: [.8, 0], mouth: .75, lean: -.04 }, hooray: { happy: 1, mouth: 1, sy: 1.05, lean: -.06 }, sassy: { lid: .5, tilt: .4, look: [.9, .1], mouth: -.3, lean: -.13 },
  curious: { look: [.8, -.5], mouth: .1, lean: .1 }, awe: { wide: .7, look: [.6, -.7], oh: .7, sy: 1.04 },
};
const REST = { lid: 0, tilt: 0, look: [0, 0], mouth: 0, lean: 0, sy: 1, wide: 0, oh: 0, happy: 0, blink: 0 };
const mix = (a, b, k) => { const r = {}; for (const f in REST) { const x = a[f] ?? REST[f], y = b[f] ?? REST[f]; r[f] = Array.isArray(x) ? [x[0] + (y[0] - x[0]) * k, x[1] + (y[1] - x[1]) * k] : x + (y - x) * k; } return r; };
const ease = k => { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); };
/** Đổi dáng theo khoá [[t, 'mode'], …] trong 0.28 s, tự chớp mắt. */
export function moodAt(t, keys, seed = 0) { let s = { ...REST, ...MODES[keys[0][1]] }; for (let i = 1; i < keys.length; i++) { const k = ease((t - keys[i][0]) / .28); if (k <= 0) break; s = mix(s, MODES[keys[i][1]], k); } if ((((t + seed) % 4.3) + 4.3) % 4.3 < .12) s.blink = 1; return s; }
function bez(p, u) { const v = 1 - u; return [0, 1].map(i => v * v * v * p[0][i] + 3 * v * v * u * p[1][i] + 3 * v * u * u * p[2][i] + u * u * u * p[3][i]); }
function ribbon(g, pts, widths) { const L = [], R = []; pts.forEach((q, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, w = widths[i] / 2; L.push([q[0] - dy / d * w, q[1] + dx / d * w]); R.push([q[0] + dy / d * w, q[1] - dx / d * w]); });
  g.beginPath(); L.forEach((q, i) => i ? g.lineTo(...q) : g.moveTo(...q)); R.reverse().forEach(q => g.lineTo(...q)); g.closePath(); g.fill(); const e = pts.at(-1), s = pts[0]; g.beginPath(); g.arc(e[0], e[1], widths.at(-1) / 2, 0, 7); g.arc(s[0], s[1], widths[0] / 2, 0, 7); g.fill(); }
const lerpW = (stops, u) => { for (let i = 1; i < stops.length; i++) if (u <= stops[i][0]) { const [a, x] = stops[i - 1], [b, y] = stops[i], k = ease((u - a) / (b - a)); return x + (y - x) * k; } return stops.at(-1)[1]; };
/** Vẽ λ: (x, y) = chân, h = cao, s từ moodAt / MODES. flip = quay trái. Thân là chữ λ thật; mắt to ngồi trên đỉnh chữ. */
export function lambda(g, x, y, h, s0 = {}, { color = LAMBDA_COLOR, flip = false } = {}) {
  const s = { ...REST, ...s0 }; g.save(); g.translate(x, y); g.transform(1 / Math.sqrt(s.sy), 0, -s.lean, s.sy, 0, 0); g.scale(flip ? -h : h, h); g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round'; g.lineJoin = 'round';
  // chân trái thẳng, đậm dần xuống đất
  ribbon(g, Array.from({ length: 12 }, (_, i) => { const u = i / 11; return [.075 + (-.27 - .075) * u, -.6 + (-.035 + .6) * u]; }), Array.from({ length: 12 }, (_, i) => .1 + .035 * i / 11));
  // nét chính: móc đầu → chéo xuống phải → gót hất
  const top = [[-.2, -.8], [-.2, -.95], [-.06, -.99], [-.0, -.85]], low = [[-.0, -.85], [.07, -.62], [.14, -.03], [.34, -.075]], n = 46, pts = [], ws = [];
  for (let i = 0; i <= n; i++) { const u = i / n, c = u < .3 ? bez(top, u / .3) : bez(low, (u - .3) / .7); pts.push(c); ws.push(lerpW([[0, .05], [.3, .13], [.75, .14], [1, .055]], u)); }
  ribbon(g, pts, ws);
  const fx = flip ? -1 : 1, ex0 = -.075, ey = -.985, gap = .082, rw = .088, rh = rw * (1 + .26 * s.wide) , lk = s.look;
  for (const d of [-1, 1]) { const ex = ex0 + d * gap, closed = s.blink > .5, happy = s.happy >= .5;
    if (closed) { g.lineWidth = .02; g.strokeStyle = PUPIL; g.beginPath(); g.moveTo(ex - rw * .8, ey + .012); g.lineTo(ex + rw * .8, ey + .012); g.stroke(); continue; }
    if (happy) { g.lineWidth = .022; g.strokeStyle = PUPIL; g.beginPath(); g.arc(ex, ey + .02, rw * .72, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); continue; }
    g.fillStyle = '#FFF'; g.strokeStyle = PUPIL; g.lineWidth = .012; g.beginPath(); g.ellipse(ex, ey, rw, rh, 0, 0, 7); g.fill(); g.stroke();
    g.save(); g.beginPath(); g.ellipse(ex, ey, rw - .004, rh - .004, 0, 0, 7); g.clip(); const px = ex + fx * lk[0] * rw * .42, py = ey + lk[1] * rh * .42; g.fillStyle = PUPIL; g.beginPath(); g.arc(px, py, rw * .55, 0, 7); g.fill(); g.fillStyle = '#FFF'; g.beginPath(); g.arc(px + .016, py - .018, rw * .15, 0, 7); g.fill();
    if (s.lid > .01 || s.tilt) { g.fillStyle = color; g.translate(ex, ey - rh + 2 * rh * s.lid); g.rotate(d * s.tilt * .4); g.fillRect(-rw * 1.8, -rh * 2.4, rw * 3.6, rh * 2.4); } g.restore();
    if (s.lid > .01 || s.tilt) { g.strokeStyle = PUPIL; g.lineWidth = .012; g.beginPath(); g.ellipse(ex, ey, rw, rh, 0, 0, 7); g.stroke(); } }
  const my = -.8; g.strokeStyle = PUPIL; g.fillStyle = PUPIL; g.lineWidth = .014; g.beginPath(); const mx = .022;
  if (s.oh > .3) { g.ellipse(mx, my, .016 + .012 * s.oh, .02 + .02 * s.oh, 0, 0, 7); g.fill(); } else { const w = .04, b = s.mouth * .032; g.moveTo(mx - w, my); g.quadraticCurveTo(mx, my + b, mx + w, my); g.stroke(); }
  g.restore();
}
