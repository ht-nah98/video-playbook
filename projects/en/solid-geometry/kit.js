// Đồ nghề chung của bài học solid-geometry — DNA "Shadowbox: giấy và đèn" (DNA.md). Nguồn: tools/lab/shadowbox.html.
// Ống nối không mang DNA (lookup, must/fix, prog ném lỗi, mk, nạp ảnh, CROP, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); kết cấu, bóng mờ của mascot sinh MỘT lần lúc nạp.
//
// 3D CHIẾU: toạ độ thế giới z hướng LÊN, mặt bàn z = 0. cam = camera({yaw, pitch, dist, target, cx, cy}) → cam.P(p) = [x, y, z]
// (z = độ sâu, xa hơn = lớn hơn). Chữ luôn PHẲNG, hướng màn hình (LESSONS §77): nhãn đặt cạnh điểm đã chiếu.
// Đèn của MỘT cảnh cố định; bóng vật = chiếu từ đèn lên z = 0 (shadow), hình chiếu vuông góc = drop (z → 0).
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, CROP, loadImages } from '../../../engine/lesson.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

// ── màu (DNA §2) ──
export const C = {
  paper: '#F2EADB', card: [251, 246, 236], ink: '#1D3557', terra: '#C0643A', terraT: '#9A4320', lead: '#55606E',
  lamp: '#FFE7B0', teal: [46, 127, 122], tealT: '#1F6F6C',
  inkA: a => `rgba(29,53,87,${a})`, terraA: a => `rgba(192,100,58,${a})`,
};
export const ERA = { desk: { bg: C.paper, ink: C.ink, accent: C.terra, dim: C.lead } };
export const CG = '"Cormorant Garamond"', MONO = '"IBM Plex Mono"';
/** Cỡ chữ đã nạp ở p1/p2.html — dùng cỡ khác thì thêm vào FONTS (trang nạp đúng danh sách này). */
export const FONTS = ['italic 600 150px', 'italic 600 120px', 'italic 600 104px', 'italic 600 92px', 'italic 600 72px', 'italic 600 64px',
  'italic 600 60px', 'italic 600 54px', 'italic 600 48px', 'italic 600 44px', 'italic 600 40px', 'italic 600 36px', 'italic 500 46px',
  'italic 500 40px', 'italic 500 34px', '600 72px', '600 54px'].map(f => `${f} ${CG}`)
  .concat(['500 34px', '500 30px', '500 28px', '500 26px', '500 24px', '500 22px', '500 20px'].map(f => `${f} ${MONO}`));

// ── vec3 ──
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const len = a => Math.hypot(a[0], a[1], a[2]), norm = a => mul(a, 1 / len(a));
export const lerp3 = (a, b, u) => add(a, mul(sub(b, a), u));
export const centroid = P => P.reduce((s, p) => add(s, mul(p, 1 / P.length)), [0, 0, 0]);

/** Camera: yaw (độ, quanh z), pitch (độ, nhìn xuống), dist, target, FOV 32°, tâm khung (cx, cy). */
export function camera({ yaw, pitch, dist, target = [0, 0, 0], fov = 32, cx = W / 2, cy = H / 2 }) {
  const y = yaw * Math.PI / 180, p = pitch * Math.PI / 180, F = (H / 2) / Math.tan(fov * Math.PI / 360);
  const pos = add(target, mul([Math.cos(p) * Math.sin(y), -Math.cos(p) * Math.cos(y), Math.sin(p)], dist));
  const f = norm(sub(target, pos)), r = norm(cross3(f, [0, 0, 1])), u = cross3(r, f);
  const P = q => { const d = sub(q, pos), z = dot(d, f); return [cx + F * dot(d, r) / z, cy - F * dot(d, u) / z, z]; };
  return { P, pos, f, r, u };
}
/** Camera nội suy giữa hai bộ tham số (u ∈ [0,1], đã ease bên ngoài). */
export const camLerp = (a, b, u) => camera(Object.fromEntries(Object.keys({ ...a, ...b }).map(k =>
  [k, Array.isArray(a[k]) ? lerp3(a[k], b[k], u) : (a[k] ?? b[k]) + ((b[k] ?? a[k]) - (a[k] ?? b[k])) * u])));

/** Bóng từ đèn điểm L lên mặt z = z0. */
export const shadowPt = (p, L, z0 = 0) => { const k = (L[2] - z0) / (L[2] - p[2]); return add(L, mul(sub(p, L), k)); };
/** Hình chiếu vuông góc lên z = z0 (đèn ở rất xa, thẳng trên). */
export const drop = (p, z0 = 0) => [p[0], p[1], z0];

// ── nền: giấy kem, vân sợi, tối nhẹ ở mép (dựng một lần) ──
const TEX = {}; let GRAIN;
function desk() {
  const c = mk(), x = c.getContext('2d'), d = x.createImageData(W, H);
  for (let i = 0; i < W * H; i++) {
    const px = i % W, py = (i / W) | 0, r = Math.hypot((px - W * 0.52) / W, (py - H * 0.42) / H);
    const v = 1.02 - 0.22 * r * r, n = (hash(i * 0.731) - 0.5) * 7 + (hash(((px >> 3) + (py >> 1) * 977) * 0.13) - 0.5) * 4;
    d.data[i * 4] = 242 * v + n; d.data[i * 4 + 1] = 234 * v + n; d.data[i * 4 + 2] = 219 * v + n * 0.8; d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  for (let k = 0; k < 900; k++) {
    const sx = hash(k * 1.37) * W, sy = hash(k * 2.71) * H, a = hash(k * 3.9) * Math.PI, l = 8 + hash(k * 5.3) * 22;
    x.strokeStyle = hash(k * 7.7) > 0.5 ? 'rgba(150,130,100,0.10)' : 'rgba(255,255,255,0.35)'; x.lineWidth = 0.8;
    x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(sx + l * 0.5 * Math.cos(a + 0.4), sy + l * 0.5 * Math.sin(a + 0.4), sx + l * Math.cos(a), sy + l * Math.sin(a)); x.stroke();
  }
  return c;
}
function grain() {
  const c = mk(256, 256), x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < 256 * 256; i++) { const v = 128 + (hash(i * 0.917 + 3) - 0.5) * 120; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return c;
}
/** Tô nền toàn khung (mọi cảnh gọi đầu render). */
export function ground(g) { g.drawImage(TEX.desk, 0, 0, W, H); }
/** Vũng sáng của đèn trên giấy quanh (x, y). */
export function pool(g, x, y, r = 700, a = 0.6) {
  const p = g.createRadialGradient(x, y, 20, x, y, r); p.addColorStop(0, `rgba(255,238,198,${a})`); p.addColorStop(1, 'rgba(255,238,198,0)');
  g.fillStyle = p; g.fillRect(x - r, y - r, 2 * r, 2 * r);
}

// ── 2D cơ bản ──
export const poly = (g, pts) => { g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); };
export const rgb = (c, k = 1, a = 1) => `rgba(${c.map(v => Math.round(Math.min(255, v * k))).join(',')},${a})`;
/** Đoạn 2D; k vẽ dần từ a tới b. dash: [] liền, [10,10] khuất. */
export function line(g, a, b, color, w, dash = [], k = 1) {
  if (k <= 0) return;
  const e = [a[0] + (b[0] - a[0]) * clamp(k), a[1] + (b[1] - a[1]) * clamp(k)];
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.setLineDash(dash);
  g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(e[0], e[1]); g.stroke(); g.restore();
}
export function hull(pts) {
  const p = pts.map(q => [q[0], q[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of p) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of p.reverse()) { while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
export function inPoly(pt, P) {
  let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++)
    if ((P[i][1] > pt[1]) !== (P[j][1] > pt[1]) && pt[0] < (P[j][0] - P[i][0]) * (pt[1] - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) c = !c;
  return c;
}

// ── chữ (Cormorant LN nghiêng = tên/lời dẫn; Plex Mono = nhãn nhỏ). Viết vào theo k (lộ dần theo ký tự, không fade). ──
function text(g, s, x, y, font, color, align, ls, k) {
  const n = Math.round(s.length * clamp(k)); if (!n) return 0;
  g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic'; g.letterSpacing = ls + 'px';
  const w = g.measureText(s).width; g.fillText(s.slice(0, n), x, y); g.restore(); return w;
}
/** Chữ nghiêng Cormorant (tên điểm, đường, tiêu đề). Trả về bề rộng TOÀN chuỗi. */
export const it = (g, s, x, y, size, color = C.ink, { align = 'left', wt = 600, k = 1 } = {}) => text(g, s, x, y, `italic ${wt} ${size}px ${CG}`, color, align, 0, k);
/** Nhãn Plex Mono in hoa, giãn chữ. */
export const label = (g, s, x, y, { color = C.lead, align = 'left', size = 24, k = 1 } = {}) => text(g, s.toUpperCase(), x, y, `500 ${size}px ${MONO}`, color, align, 3, k);
/** Plex Mono GIỮ hoa/thường (công thức, biến). */
export const mono = (g, s, x, y, { color = C.ink, align = 'left', size = 28, k = 1 } = {}) => text(g, s, x, y, `500 ${size}px ${MONO}`, color, align, 1, k);
export function measure(g, s, font) { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; }

// ── ký hiệu vẽ tay (font thiếu ⊥ ⇔ ∥ — DNA §3). (x, y) = chân dòng chữ, s = cỡ chữ. Trả về bề rộng. ──
export function perp(g, x, y, s, color = C.ink) {
  line(g, [x, y], [x + s * 0.7, y], color, s * 0.075); line(g, [x + s * 0.35, y], [x + s * 0.35, y - s * 0.62], color, s * 0.075); return s * 0.7;
}
export function para(g, x, y, s, color = C.ink) {
  line(g, [x + s * 0.18, y + s * 0.02], [x + s * 0.3, y - s * 0.62], color, s * 0.07); line(g, [x + s * 0.38, y + s * 0.02], [x + s * 0.5, y - s * 0.62], color, s * 0.07); return s * 0.62;
}
export function iff(g, x, y, s, color = C.ink) {
  const w = s * 1.1, m = y - s * 0.3, d = s * 0.11, hd = s * 0.22;
  g.save(); g.strokeStyle = color; g.lineWidth = s * 0.06; g.lineCap = g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x + hd, m - d); g.lineTo(x + w - hd, m - d); g.moveTo(x + hd, m + d); g.lineTo(x + w - hd, m + d); g.stroke();
  g.beginPath(); g.moveTo(x + hd * 1.6, m - hd * 1.3); g.lineTo(x, m); g.lineTo(x + hd * 1.6, m + hd * 1.3);
  g.moveTo(x + w - hd * 1.6, m - hd * 1.3); g.lineTo(x + w, m); g.lineTo(x + w - hd * 1.6, m + hd * 1.3); g.stroke(); g.restore(); return w;
}
/** Phân số dựng đứng (⅓ ⅔ ⁴⁄₃ không có / không đẹp ở font): tử trên vạch, mẫu dưới. Trả về bề rộng. */
export function frac(g, num, den, x, y, s, color = C.ink) {
  const f = `italic 600 ${Math.round(s * 0.62)}px ${CG}`, w = Math.max(measure(g, num, f), measure(g, den, f)) + s * 0.16;
  text(g, num, x + w / 2, y - s * 0.4, f, color, 'center', 0, 1); text(g, den, x + w / 2, y + s * 0.16, f, color, 'center', 0, 1);
  line(g, [x + s * 0.04, y - s * 0.3], [x + w - s * 0.04, y - s * 0.3], color, s * 0.05); return w;
}
/** Dòng hỗn hợp: mảng mục [chuỗi | {perp}|{para}|{iff}|{frac:[n,d]}|{c: màu, s: chuỗi}|{gap}]; trả về bề rộng. */
export function formula(g, items, x, y, size, color = C.ink, k = 1) {
  if (k <= 0) return 0;
  const n = Math.ceil(items.length * clamp(k)); let cx = x;
  items.slice(0, n).forEach(o => {
    if (typeof o === 'string') cx += it(g, o, cx, y, size, color);
    else if (o.perp) cx += perp(g, cx + size * 0.08, y, size, o.c || color) + size * 0.16;
    else if (o.para) cx += para(g, cx, y, size, o.c || color) + size * 0.1;
    else if (o.iff) cx += iff(g, cx + size * 0.2, y, size, o.c || color) + size * 0.4;
    else if (o.frac) cx += frac(g, o.frac[0], o.frac[1], cx, y, size, o.c || color) + size * 0.06;
    else if (o.gap) cx += o.gap * size;
    else if (o.s) cx += it(g, o.s, cx, y, size, o.c);
  });
  return cx - x;
}

// ── lưới khối: {V, faces (chỉ số, thứ tự quanh mặt), edges {a, b, f:[f1,f2], smooth}} ──
function edgesOf(faces, smoothFn) {
  const E = new Map();
  faces.forEach((f, fi) => f.forEach((a, t) => { const b = f[(t + 1) % f.length], key = Math.min(a, b) + '-' + Math.max(a, b);
    (E.get(key) ?? E.set(key, { a: Math.min(a, b), b: Math.max(a, b), f: [] }).get(key)).f.push(fi); }));
  const out = [...E.values()]; if (smoothFn) out.forEach(e => { e.smooth = smoothFn(e); }); return out;
}
/** Khối LỒI từ tập đỉnh: mặt = mặt phẳng tựa (mọi đỉnh một phía). Chỉ dùng lúc nạp/init (O(n⁴)). */
export function convex(V) {
  const faces = [], seen = new Set(), n = V.length;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    let N = cross3(sub(V[j], V[i]), sub(V[k], V[i])); if (len(N) < 1e-9) continue; N = norm(N);
    const d = dot(N, V[i]), s = V.map(v => dot(N, v) - d);
    if (s.every(x => x < 1e-9)) {} else if (s.every(x => x > -1e-9)) N = mul(N, -1); else continue;
    const on = V.map((_, q) => q).filter(q => Math.abs(dot(N, V[q]) - dot(N, V[i])) < 1e-9), key = on.join(',');
    if (seen.has(key)) continue; seen.add(key);
    const c = centroid(on.map(q => V[q])), e1 = norm(sub(V[on[0]], c)), e2 = cross3(N, e1);
    on.sort((p, q) => Math.atan2(dot(sub(V[p], c), e2), dot(sub(V[p], c), e1)) - Math.atan2(dot(sub(V[q], c), e2), dot(sub(V[q], c), e1)));
    faces.push(on);
  }
  return { V, faces, edges: edgesOf(faces) };
}
const PHI = (1 + Math.sqrt(5)) / 2;
const pm = (...a) => a.reduce((acc, v) => acc.flatMap(p => (v === 0 ? [[...p, 0]] : [[...p, v], [...p, -v]])), [[]]);
/** Năm khối Platon (toạ độ chuẩn, φ). Kiểm V, E, F, Euler, cạnh bằng nhau lúc nạp. */
export const PLATONIC = [
  { name: 'tetrahedron', V: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], want: [4, 6, 4] },
  { name: 'cube', V: pm(1, 1, 1), want: [8, 12, 6] },
  { name: 'octahedron', V: [...pm(1, 0, 0), ...pm(0, 1, 0), ...pm(0, 0, 1)], want: [6, 12, 8] },
  { name: 'dodecahedron', V: [...pm(1, 1, 1), ...pm(0, 1 / PHI, PHI), ...pm(1 / PHI, PHI, 0), ...pm(PHI, 0, 1 / PHI)], want: [20, 30, 12] },
  { name: 'icosahedron', V: [...pm(0, 1, PHI), ...pm(1, PHI, 0), ...pm(PHI, 0, 1)], want: [12, 30, 20] },
].map(S => {
  const m = convex(S.V), [V, E, F] = [S.V.length, m.edges.length, m.faces.length];
  const bad = (n, v, w) => { if (Math.abs(v - w) > 1e-9) throw new Error(`kit: ${S.name} ${n} = ${v} ≠ ${w}`); };
  bad('V', V, S.want[0]); bad('E', E, S.want[1]); bad('F', F, S.want[2]); bad('V−E+F', V - E + F, 2);
  const L = m.edges.map(e => len(sub(S.V[e.a], S.V[e.b]))); L.forEach(l => bad('cạnh', l, L[0]));
  return { ...m, name: S.name, counts: { V, E, F }, faceSides: m.faces[0].length };
});
/** Hộp a × b × c (x, y, z), góc dưới ở gốc. */
export const box = (a, b, c) => convex(pm(1, 1, 1).map(([x, y, z]) => [(x + 1) / 2 * a, (y + 1) / 2 * b, (z + 1) / 2 * c]));
/** Lăng trụ: đáy đa giác base (mảng [x,y] ở z=0) đùn theo vector dir (đứng: [0,0,h]). */
export function prism(base, dir) {
  const n = base.length, V = [...base.map(([x, y]) => [x, y, 0]), ...base.map(([x, y]) => add([x, y, 0], dir))];
  const faces = [[...Array(n).keys()].reverse(), [...Array(n).keys()].map(i => i + n), ...[...Array(n).keys()].map(i => [i, (i + 1) % n, (i + 1) % n + n, i + n])];
  return { V, faces, edges: edgesOf(faces) };
}
/** Chóp: đáy base ở z=0, đỉnh apex [x,y,z]. */
export function pyramid(base, apex) {
  const n = base.length, V = [...base.map(([x, y]) => [x, y, 0]), apex];
  const faces = [[...Array(n).keys()].reverse(), ...[...Array(n).keys()].map(i => [i, (i + 1) % n, n])];
  return { V, faces, edges: edgesOf(faces) };
}
export const ngon = (n, r, rot = 0) => Array.from({ length: n }, (_, i) => [r * Math.cos(rot + i * 2 * Math.PI / n), r * Math.sin(rot + i * 2 * Math.PI / n)]);
/** Trụ / nón (rTop = 0) bán kính r, cao h, n cạnh — cạnh quanh thân là "smooth" (chỉ vẽ khi là đường viền). */
export function revolve(r, h, rTop = r, n = 64) {
  const bot = ngon(n, r).map(([x, y]) => [x, y, 0]);
  if (rTop === 0) { const m = pyramid(ngon(n, r), [0, 0, h]); m.edges.forEach(e => { e.smooth = e.b === n; }); m.round = true; return m; }
  const m = prism(ngon(n, r), [0, 0, h]); m.edges.forEach(e => { e.smooth = e.a % n === e.b % n; }); m.round = true; return m;
}
/** Cầu bán kính r: lưới kinh–vĩ (mọi cạnh smooth). */
export function sphere(r, nu = 48, nv = 24) {
  const V = [[0, 0, -r]], faces = [];
  for (let j = 1; j < nv; j++) for (let i = 0; i < nu; i++) { const v = -Math.PI / 2 + j * Math.PI / nv, u = i * 2 * Math.PI / nu; V.push([r * Math.cos(v) * Math.cos(u), r * Math.cos(v) * Math.sin(u), r * Math.sin(v)]); }
  V.push([0, 0, r]); const id = (j, i) => 1 + (j - 1) * nu + (i % nu), top = V.length - 1;
  for (let i = 0; i < nu; i++) faces.push([0, id(1, i + 1), id(1, i)]);
  for (let j = 1; j < nv - 1; j++) for (let i = 0; i < nu; i++) faces.push([id(j, i), id(j, i + 1), id(j + 1, i + 1), id(j + 1, i)]);
  for (let i = 0; i < nu; i++) faces.push([id(nv - 1, i), id(nv - 1, i + 1), top]);
  const m = { V, faces, edges: edgesOf(faces, () => true) }; m.round = true; return m;
}
/** Biến đổi đỉnh: co s, xoay quanh x/y/z (độ, thứ tự x→y→z), dời at. */
export function xf(V, { s = 1, rx = 0, ry = 0, rz = 0, at = [0, 0, 0] } = {}) {
  const R = d => d * Math.PI / 180, [cx, sx, cy, sy, cz, sz] = [Math.cos(R(rx)), Math.sin(R(rx)), Math.cos(R(ry)), Math.sin(R(ry)), Math.cos(R(rz)), Math.sin(R(rz))];
  return V.map(([x, y, z]) => { x *= s; y *= s; z *= s;
    [y, z] = [y * cx - z * sx, y * sx + z * cx]; [x, z] = [x * cy + z * sy, -x * sy + z * cy]; [x, y] = [x * cz - y * sz, x * sz + y * cz];
    return [x + at[0], y + at[1], z + at[2]]; });
}
/** Đặt khối nằm trên mặt f (úp xuống bàn), xoay spin° quanh trục đứng, bán kính ngoại tiếp R, tâm đáy ở at=[x,y]. */
export function rest(m, at, R, spin = 0, f = 0) {
  const R0 = Math.max(...m.V.map(len)), F = m.faces[f], n = norm(centroid(F.map(q => m.V[q]))), t = [0, 0, -1], ax = cross3(n, t), sn = len(ax), cs = dot(n, t);
  const rot = v => { if (sn < 1e-12) return cs > 0 ? v : [v[0], -v[1], -v[2]]; const k = mul(ax, 1 / sn); return add(add(mul(v, cs), mul(cross3(k, v), sn)), mul(k, dot(k, v) * (1 - cs))); };
  const sp = spin * Math.PI / 180;
  let P = m.V.map(v => { const q = rot(mul(v, R / R0)); return [q[0] * Math.cos(sp) - q[1] * Math.sin(sp), q[0] * Math.sin(sp) + q[1] * Math.cos(sp), q[2]]; });
  const z0 = Math.min(...P.map(p => p[2])); return P.map(p => add(p, [at[0], at[1], -z0]));
}

// ── vẽ 3D ──
/** Bóng mềm của khối lồi (đỉnh P3) từ đèn L (16 mẫu quanh L, bán kính spread) lên z = z0. a = đậm tổng. */
export function shadow(g, cam, P3, L, { a = 0.45, spread = 0.12, z0 = 0, color = [150, 74, 38] } = {}) {
  g.save(); const S = [-1.5, -0.5, 0.5, 1.5].flatMap(dx => [-1.5, -0.5, 0.5, 1.5].map(dy => add(L, [dx * spread * 0.66, dy * spread * 0.66, 0])));
  g.fillStyle = `rgba(${color.join(',')},${a / S.length})`;
  S.forEach(Ls => { poly(g, hull(P3.filter(p => p[2] < Ls[2] - 1e-6).map(p => cam.P(shadowPt(p, Ls, z0))))); g.fill(); });
  g.restore();
}
/**
 * Khối bìa: mặt thấy (painter, tô theo pháp tuyến so với đèn L), cạnh khuất nét đứt chì, cạnh thấy mực.
 * base = màu bìa [r,g,b] (C.card | C.teal | màu giấy khác của DNA). k = gấp vào: 0 → chỉ cạnh, 1 → mặt đầy.
 * Trả về mảng toạ độ màn hình các đỉnh.
 */
export function solid(g, cam, m, P3, L, { base = C.card, k = 1, hidden = true, edgeW = 3, alpha = 1 } = {}) {
  const scr = P3.map(cam.P), ctr = centroid(P3);
  const F = m.faces.map(f => {
    const c = centroid(f.map(q => P3[q])), nn = norm(cross3(sub(P3[f[1]], P3[f[0]]), sub(P3[f[2]], P3[f[0]])));
    const N = dot(nn, sub(c, ctr)) > 0 ? nn : mul(nn, -1);
    return { f, c, N, front: dot(N, sub(cam.pos, c)) > 0, z: cam.P(c)[2] };
  });
  if (k > 0) {
    g.save(); g.globalAlpha = clamp(k) * alpha;
    F.filter(o => o.front).sort((a, b) => b.z - a.z).forEach(o => {
      const lit = Math.max(0, dot(o.N, norm(sub(L, o.c)))), q = 0.82 + 0.24 * lit, pts = o.f.map(i => scr[i]);
      g.fillStyle = `rgb(${Math.min(255, base[0] * q)},${Math.min(255, base[1] * q ** 1.25)},${Math.min(255, base[2] * q ** 1.6)})`; poly(g, pts); g.fill();
      if (m.round) { g.strokeStyle = g.fillStyle; g.lineWidth = 1; g.stroke(); }
    });
    g.globalAlpha = 0.07 * clamp(k) * alpha; g.globalCompositeOperation = 'multiply'; g.fillStyle = g.createPattern(GRAIN, 'repeat');
    F.filter(o => o.front).forEach(o => { poly(g, o.f.map(i => scr[i])); g.fill(); }); g.restore();
  }
  const sil = e => F[e.f[0]].front !== F[e.f[1]]?.front;
  const light = base !== C.card && base[0] + base[1] + base[2] < 450;
  if (hidden) m.edges.forEach(e => { const vis = F[e.f[0]].front || F[e.f[1]]?.front; if (!vis && !e.smooth) line(g, scr[e.a], scr[e.b], light && k > 0.5 ? 'rgba(232,242,236,0.6)' : C.inkA(0.5), 2.2, [9, 9]); });
  m.edges.forEach(e => { const vis = F[e.f[0]].front || F[e.f[1]]?.front; if (vis && (!e.smooth || sil(e))) line(g, scr[e.a], scr[e.b], C.ink, edgeW); });
  return scr;
}
/** Tờ bìa phẳng (mặt phẳng): đa giác 3D corners, có mép dày phía dưới, vân giấy, viền mực. Trả về toạ độ màn hình. */
export function sheet(g, cam, corners, { k = 1, fill = C.card, thick = 0.06, edge = C.ink, alpha = 1 } = {}) {
  const cs = corners.map(cam.P); if (k <= 0) return cs;
  g.save(); g.globalAlpha = clamp(k) * alpha;
  const N = norm(cross3(sub(corners[1], corners[0]), sub(corners[2], corners[0]))), down = N[2] >= 0 ? mul(N, -thick) : mul(N, thick);
  const lo = corners.map(p => cam.P(add(p, down)));
  g.fillStyle = rgb(fill, 0.8);
  for (let i = 0; i < cs.length; i++) { const j = (i + 1) % cs.length; poly(g, [cs[i], cs[j], lo[j], lo[i]]); g.fill(); }
  g.fillStyle = rgb(fill); poly(g, cs); g.fill();
  g.globalAlpha = 0.08 * clamp(k) * alpha; g.globalCompositeOperation = 'multiply'; g.fillStyle = g.createPattern(GRAIN, 'repeat'); poly(g, cs); g.fill();
  g.restore();
  if (edge) { g.save(); g.globalAlpha = clamp(k) * alpha; g.strokeStyle = edge; g.lineWidth = 3; g.lineJoin = 'round'; poly(g, cs); g.stroke(); g.restore(); }
  return cs;
}
/** Hình bình hành 3D tâm c, hai nửa cạnh u, v (vector) → 4 góc (dùng cho sheet). */
export const quad = (c, u, v) => [add(sub(c, u), mul(v, -1)), add(add(c, u), mul(v, -1)), add(add(c, u), v), add(sub(c, u), v)];
/** Bóng mềm của tờ bìa nhấc lên khỏi bàn (đèn rất xa, lệch nhẹ). */
export function sheetShadow(g, cam, corners, { a = 0.2, dx = -0.12, dy = -0.1, z0 = 0 } = {}) {
  g.save(); for (let i = 0; i < 6; i++) { g.fillStyle = `rgba(120,80,50,${a / 6})`; poly(g, corners.map(p => cam.P([p[0] + 0.05 * i + dx, p[1] + 0.04 * i + dy, z0]))); g.fill(); } g.restore();
}
/** Sợi chỉ mực 3D từ a tới b; k vẽ dần; dash cho phần khuất. Trả về [pa, pb]. */
export function thread(g, cam, a, b, { color = C.ink, w = 5, dash = [], k = 1 } = {}) { const pa = cam.P(a), pb = cam.P(b); line(g, pa, pb, color, w, dash, k); return [pa, pb]; }
/** Chấm mực 3D (điểm). k bật vào. */
export function dot3(g, cam, p, { r = 8, color = C.ink, k = 1 } = {}) {
  if (k <= 0) return cam.P(p); const q = cam.P(p), s = outBack(clamp(k));
  g.save(); g.fillStyle = color; g.beginPath(); g.arc(q[0], q[1], r * s, 0, 7); g.fill(); g.restore(); return q;
}
/** Dấu góc vuông 3D ở O trong mặt (u, v) — u, v là vector đơn vị; s = cạnh (đơn vị thế giới). */
export function rightMark(g, cam, O, u, v, s, { color = C.ink, w = 3, k = 1 } = {}) {
  if (k <= 0) return; const a = cam.P(add(O, mul(u, s))), b = cam.P(add(add(O, mul(u, s)), mul(v, s))), c = cam.P(add(O, mul(v, s)));
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = color; g.lineWidth = w; g.lineJoin = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.lineTo(c[0], c[1]); g.stroke(); g.restore();
}
/** Cung góc 3D ở O từ hướng u sang v (đơn vị), bán kính r; fill = tô quạt nhạt. Trả về điểm giữa cung (màn hình). */
export function angleArc(g, cam, O, u, v, r, { color = C.terra, w = 3, k = 1, fill = true } = {}) {
  const th = Math.acos(clamp(dot(u, v), -1, 1)), e2 = norm(sub(v, mul(u, dot(u, v)))), n = 24, kk = clamp(k);
  const pts = Array.from({ length: n + 1 }, (_, i) => { const a = th * kk * i / n; return cam.P(add(O, add(mul(u, r * Math.cos(a)), mul(e2, r * Math.sin(a))))); });
  if (k > 0) {
    g.save(); if (fill) { g.fillStyle = C.terraA(0.18); const o = cam.P(O); poly(g, [o, ...pts]); g.fill(); }
    g.strokeStyle = color; g.lineWidth = w; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); g.restore();
  }
  const m = th / 2; return cam.P(add(O, add(mul(u, r * 1.35 * Math.cos(m)), mul(e2, r * 1.35 * Math.sin(m)))));
}
/** Tam giác cần tìm (DNA §1): tô cam đất phẳng trên mặt chứa nó + viền cam; k tô dần từ đỉnh A. */
export function goalTriangle(g, cam, A, B, Cc, { k = 1 } = {}) {
  if (k <= 0) return; const u = clamp(k), b = lerp3(A, B, u), c = lerp3(A, Cc, u), pts = [A, b, c].map(cam.P);
  g.save(); g.fillStyle = C.terraA(0.32); poly(g, pts); g.fill(); g.strokeStyle = C.terra; g.lineWidth = 4; g.lineJoin = 'round'; poly(g, pts); g.stroke(); g.restore();
}

// ── đèn treo (DNA §1): dây từ mép trên, chao giấy xếp nếp. on ∈ [0,1] = độ sáng quầng. ──
export function lamp(g, x, y, { s = 1, on = 1 } = {}) {
  if (on > 0) { const p = g.createRadialGradient(x, y + 60 * s, 10, x, y + 60 * s, 300 * s);
    p.addColorStop(0, `rgba(255,231,176,${0.85 * on})`); p.addColorStop(1, 'rgba(255,231,176,0)'); g.fillStyle = p; g.fillRect(x - 320 * s, y - 260 * s, 640 * s, 640 * s); }
  line(g, [x, 0], [x, y - 52 * s], C.ink, 3);
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = on > 0.5 ? '#FFF6DA' : '#D9CFBC'; g.beginPath(); g.ellipse(0, 40, 34, 16, 0, 0, 7); g.fill();
  const n = 7, top = 18, bot = 78, h0 = -52, h1 = 34;
  for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 1) / n, kk = 0.80 + 0.2 * Math.sin((u0 + 0.5 / n) * Math.PI) + (i % 2 ? -0.06 : 0.04);
    g.fillStyle = rgb(C.card, kk); poly(g, [[-top + 2 * top * u0, h0], [-top + 2 * top * u1, h0], [-bot + 2 * bot * u1, h1], [-bot + 2 * bot * u0, h1]]); g.fill(); }
  g.strokeStyle = C.ink; g.lineWidth = 3; g.lineJoin = 'round'; poly(g, [[-top, h0], [top, h0], [bot, h1], [-bot, h1]]); g.stroke();
  g.restore();
}
/** Đèn tắt/bật toàn khung: phủ tối ấm (on = 1 sáng hẳn, 0 đen kín). Dùng ở a0 cuối (về đen → intro) và mở p2. */
export function dark(g, on) { if (on >= 1) return; g.save(); g.fillStyle = `rgba(8,6,4,${1 - clamp(on)})`; g.fillRect(0, 0, W, H); g.restore(); }

// ── mascot: ảnh cắt + bóng đổ mềm (silhouette mờ dựng lúc nạp). Vào = trồi lên + bật 0.35 s. ──
const IM = {}, SIL = {};
export function figure(g, pose, cx, foot, h, k = 1, { flip = false, crop = CROP[pose] ?? 1 } = {}) {
  if (k <= 0) return null;
  const key = 'pose-' + pose, im = IM[key], sh0 = im.height * crop, s = h / sh0, w = im.width * s;
  const sil = (SIL[key] ??= (() => { const c = mk(im.width, im.height), x = c.getContext('2d'); x.filter = 'blur(10px)'; x.drawImage(im, 0, 0); x.filter = 'none';
    x.globalCompositeOperation = 'source-in'; x.fillStyle = '#5A3820'; x.fillRect(0, 0, im.width, im.height); return c; })());
  const rise = (1 - outBack(clamp(k))) * h * 0.5;
  g.save(); g.translate(cx, foot + rise); if (flip) g.scale(-1, 1);
  g.globalAlpha = 0.2; g.drawImage(sil, 0, 0, im.width, sh0, -w / 2 + 18, -h + 12, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, -w / 2, -h, w, h); g.restore();
  return { x: cx - w / 2, y: foot - h, w, h };
}
/** Ảnh kẹp trên bìa (DNA §8): ảnh màu giữ nguyên, khung bìa ngà, bóng; credit dưới. k trượt vào. Trả về {w, h}. */
export function photo(g, key, x, y, h, k = 1, { rot = 0, credit = null } = {}) {
  const im = IM[key], w = im.width * h / im.height; if (k <= 0) return { w, h };
  const dy = (1 - outCubic(clamp(k))) * 280;
  g.save(); g.translate(x, y + dy); g.rotate(rot * outCubic(clamp(k)));
  g.fillStyle = 'rgba(90,56,32,0.22)'; g.fillRect(14, 18, w + 28, h + 28);
  g.fillStyle = rgb(C.card); g.fillRect(-14, -14, w + 28, h + 28); g.strokeStyle = C.inkA(0.6); g.lineWidth = 2; g.strokeRect(-14, -14, w + 28, h + 28);
  g.drawImage(im, 0, 0, w, h); g.restore();
  if (credit) label(g, credit, x, y + dy + h + 52, { size: 20, k: clamp(k * 1.5 - 0.5) });
  return { w, h };
}

// ── dải giấy XÉ (DNA §1, gạch hiểu lầm): dán chéo qua hộp chữ (x0,y0)→(x1,y1), k dán dần; mép răng cưa tất định ──
export function tornStrip(g, x0, y0, x1, y1, k = 1, { w = 34, seed = 1 } = {}) {
  if (k <= 0) return; const L = Math.hypot(x1 - x0, y1 - y0) * clamp(k), a = Math.atan2(y1 - y0, x1 - x0), n = Math.max(2, Math.round(L / 14));
  const top = Array.from({ length: n + 1 }, (_, i) => [i * L / n, -w / 2 + (hash(i * 3.7 + seed) - 0.5) * 6]);
  const bot = Array.from({ length: n + 1 }, (_, i) => [L - i * L / n, w / 2 + (hash(i * 5.3 + seed) - 0.5) * 6]);
  const endR = [[L + 6 * hash(seed), -w / 4], [L - 4, 0], [L + 5 * hash(seed + 2), w / 4]];
  g.save(); g.translate(x0, y0); g.rotate(a);
  g.fillStyle = 'rgba(90,56,32,0.18)'; g.translate(4, 6); poly(g, [...top, ...endR, ...bot]); g.fill(); g.translate(-4, -6);
  g.fillStyle = rgb([236, 226, 205]); poly(g, [...top, ...endR, ...bot]); g.fill();
  g.globalAlpha = 0.1; g.globalCompositeOperation = 'multiply'; g.fillStyle = g.createPattern(GRAIN, 'repeat'); g.fill();
  g.restore();
}

// ── thẻ chữ A (mục lục lời hứa, DNA §1): đứng trên bàn, mặt trước viết số + dòng chữ, đổ bóng ──
export function tentCard(g, x, y, w, h, num, lines, k = 1, { size = 34 } = {}) {
  if (k <= 0) return; const e = outBack(clamp(k)), hh = h * e, lean = w * 0.06;
  g.fillStyle = 'rgba(120,80,50,0.16)'; poly(g, [[x - 10, y], [x + w + 30, y], [x + w + 50, y + 26], [x + 10, y + 26]]); g.fill();
  g.fillStyle = rgb(C.card, 0.86); poly(g, [[x + lean, y - hh], [x + w - lean, y - hh], [x + w - lean * 0.2, y - hh * 0.96], [x + lean * 0.2, y - hh * 0.96]]); g.fill();
  g.fillStyle = rgb(C.card); poly(g, [[x, y], [x + w, y], [x + w - lean, y - hh], [x + lean, y - hh]]); g.fill();
  g.strokeStyle = C.ink; g.lineWidth = 3; g.lineJoin = 'round'; g.stroke();
  if (k >= 0.6) {
    const kk = prog(k, 0.6, 1); it(g, num, x + 30, y - hh + 74, 64, C.terraT, { k: kk * 2 });
    lines.forEach((s, i) => it(g, s, x + 30, y - hh + 74 + 56 + i * (size + 8), size, C.ink, { k: kk * 1.6 - i * 0.2 }));
  }
}

// ── biển mục (góc trên trái) + thẻ hồi (giữa khung, lúc mở hồi) ──
/** Biển mục: "ACT IV · THREE PERPENDICULARS" (≤ 44 ký tự, Plex 22 px — đo ở kit: 44 ký tự ≈ 1180 px). */
export function sectionTag(g, s, k = 1) { if (s.length > 44) throw new Error(`sectionTag quá dài (${s.length} > 44): ${s}`); label(g, s, 96, 112, { size: 22, k: k * 2 }); }
/**
 * Thẻ hồi: viết vào từ start − 2.3, trượt lên nhường cảnh quanh start. act "ACT IV", title "Perpendicular",
 * answers "ANSWERS 2" (tuỳ chọn). Đèn chớp tắt–bật 0.3 s quanh start − 2.4 (DNA §7) — cảnh gọi dark() riêng nếu muốn.
 */
export function actCard(g, t, start, act, title, answers = '') {
  const out = outCubic(prog(t, start - 0.35, start + 0.25)); if (t < start - 2.5 || out >= 1) return;
  g.save(); g.translate(0, -out * 760);
  label(g, act, W / 2, 400, { size: 30, align: 'center', color: C.lead, k: prog(t, start - 2.3, start - 2.0) });
  it(g, title, W / 2, 540, 120, C.ink, { align: 'center', k: prog(t, start - 2.1, start - 1.4) });
  if (answers) label(g, answers, W / 2, 620, { size: 26, align: 'center', color: C.terraT, k: prog(t, start - 1.5, start - 1.0) });
  g.restore();
}

// ── CĂN PHÒNG (vật xuyên suốt, DNA §1): hộp bìa mở nắp 12 × 4 × 3, gốc ở góc trái-trước-dưới ──
// x = dài 12 (trái → phải), y = sâu 4 (trước → sau), z = cao 3. Tường trước (y = 0) và trần bỏ đi để nhìn vào.
export const ROOM = (() => {
  const a = 12, b = 4, c = 3, v = (x, y, z) => [x, y, z];
  const corners = { lf0: v(0, 0, 0), rf0: v(a, 0, 0), rb0: v(a, b, 0), lb0: v(0, b, 0), lf1: v(0, 0, c), rf1: v(a, 0, c), rb1: v(a, b, c), lb1: v(0, b, c) };
  const diag = Math.hypot(a, b, c);
  if (Math.abs(diag - 13) > 1e-9) throw new Error('kit: đường chéo phòng ≠ 13');
  if (a * b * c !== 144) throw new Error('kit: thể tích phòng ≠ 144');
  return {
    a, b, c, corners, diag,
    floor: [corners.lf0, corners.rf0, corners.rb0, corners.lb0], ceiling: [corners.lf1, corners.rf1, corners.rb1, corners.lb1],
    back: [corners.lb0, corners.rb0, corners.rb1, corners.lb1], left: [corners.lf0, corners.lb0, corners.lb1, corners.lf1], right: [corners.rf0, corners.rb0, corners.rb1, corners.rf1],
    lamp: v(a / 2, b / 2, c - 0.35),
    /** cạnh có tên — tường "trước mặt" người xem = tường SAU (y = b); tường bên = tường trái (x = 0) */
    edges: {
      topFront: [corners.lb1, corners.rb1],     // cạnh trên của tường trước mặt
      nearVertical: [corners.lf0, corners.lf1], // cạnh dọc của tường bên, đầu GẦN người xem → CHÉO với topFront
      farVertical: [corners.lb0, corners.lb1],  // cạnh dọc góc XA → CẮT topFront tại lb1
      wallCeiling: [corners.lb1, corners.rb1],  // giao tuyến tường trước mặt – trần
    },
  };
})();
/** Vẽ hộp-phòng: sàn, tường sau, tường trái, tường phải (thấp → cao), viền mực; trần vẽ nét đứt nếu ceiling. */
export function room(g, cam, { k = 1, ceiling = false, L = ROOM.lamp, scale = 1, at = [0, 0, 0] } = {}) {
  const T = p => add(mul(p, scale), at), Pp = p => cam.P(T(p));
  const walls = [ROOM.floor, ROOM.back, ROOM.left, ROOM.right].map(w => w.map(T));
  const shade = [1, 0.93, 0.86, 0.88];
  walls.map((w, i) => ({ w, i, z: cam.P(centroid(w))[2] })).sort((p, q) => q.z - p.z).forEach(({ w, i }) => {
    const cs = w.map(cam.P); g.save(); g.globalAlpha = clamp(k); g.fillStyle = rgb(C.card, shade[i]); poly(g, cs); g.fill();
    g.globalAlpha = 0.07 * clamp(k); g.globalCompositeOperation = 'multiply'; g.fillStyle = g.createPattern(GRAIN, 'repeat'); poly(g, cs); g.fill(); g.restore();
    g.save(); g.globalAlpha = clamp(k); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.lineJoin = 'round'; poly(g, cs); g.stroke(); g.restore();
  });
  if (ceiling) { g.save(); g.strokeStyle = C.inkA(0.45); g.lineWidth = 2; g.setLineDash([8, 10]); poly(g, ROOM.ceiling.map(Pp)); g.stroke(); g.restore(); }
  return Pp;
}

// ── nạp ──
export async function loadKit(images) { TEX.desk = desk(); GRAIN = grain(); await loadImages(images, IM); }
