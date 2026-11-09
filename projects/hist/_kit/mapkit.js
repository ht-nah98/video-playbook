// Bộ bản đồ quốc gia biết diễn (kênh kể chuyện lịch sử, study 12): biên giới thật 1914 (historical-basemaps, GPL-3.0 —
// ghi công trên hình), tô CỜ cắt theo đường biên, mắt / lông mày / miệng / tay chân của quốc gia. Tất định: mọi thứ là hàm
// của tham số truyền vào (không đồng hồ, không ngẫu nhiên).
//   const M = await loadMap('data/europe1914.json');
//   const V = view(M, { cx: 15, cy: 50, zoom: 1 });        // tâm theo kinh / vĩ độ; zoom 1 = vừa khung cao
//   drawMap(g, M, V, { fill: { 'German Empire': 'flag' }, dim: 0.0 });
//   country(g, M, V, 'German Empire', { mood: 'angry', hop: 0.3, arms: 'cross', t });
export const INK = '#1E2328', SEA = '#A9C9DE', LAND = '#EDE6D3';
const W = 1920, H = 1080;
let CREDIT_LEFT = false;
/** ghi công bản đồ ở góc trái (trang có người dẫn ngồi góc phải dưới) */
export const creditLeft = (on = true) => { CREDIT_LEFT = on; };

export async function loadMap(url) {
  const M = await (await fetch(url)).json();
  M.path = {};                                                    // Path2D theo toạ độ bản đồ, dựng một lần
  M.box = {};
  for (const [n, rings] of Object.entries(M.countries)) {
    const p = new Path2D(); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, best = 0, big = null;
    for (const r of rings) { p.moveTo(...r[0]); for (const q of r.slice(1)) p.lineTo(...q); p.closePath();
      let a = 0; for (let i = 0; i < r.length; i++) { const u = r[i], v = r[(i + 1) % r.length]; a += u[0] * v[1] - v[0] * u[1]; }
      if (Math.abs(a) > best) { best = Math.abs(a); big = r; } }
    for (const [x, y] of big) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    M.path[n] = p; M.box[n] = [x0, y0, x1, y1];
  }
  return M;
}
const C50 = Math.cos(50 * Math.PI / 180);
/** kinh / vĩ độ → toạ độ bản đồ (như tools/hist/geo.py) */
// M.cosl (bản đồ từ 2026-10-30: pacific1938, oahu) = cos(lat0) thật của file; bản đồ cũ không có → giữ C50 như trước (không đổi pixel tập cũ)
export const ll = (M, lon, lat) => [(lon - M.lon0) * (M.cosl ?? C50), -lat];
/** camera: tâm (lon, lat), zoom (1 = cả bbox cao vừa khung), xoay nhẹ. Trả hàm toạ độ bản đồ → màn hình + tỉ lệ. */
export function view(M, { cx = 15, cy = 50, zoom = 1, rot = 0 } = {}) {
  const s = H / (M.bbox[3] - M.bbox[1]) * zoom, c = ll(M, cx, cy);
  return { s, c, rot, apply(g) { g.translate(W / 2, H / 2); g.rotate(rot); g.scale(s, s); g.translate(-c[0], -c[1]); },
    pt(p) { const x = (p[0] - c[0]) * s, y = (p[1] - c[1]) * s, cs = Math.cos(rot), sn = Math.sin(rot); return [W / 2 + x * cs - y * sn, H / 2 + x * sn + y * cs]; } };
}

// ── cờ 1914 (giản lược, đọc được ở cỡ nhỏ) ──
const tri = (cols, vert) => (g, b) => { const [x0, y0, x1, y1] = b, n = cols.length;
  cols.forEach((c, i) => { g.fillStyle = c; vert ? g.fillRect(x0 + (x1 - x0) * i / n, y0, (x1 - x0) / n + 0.05, y1 - y0) : g.fillRect(x0, y0 + (y1 - y0) * i / n, x1 - x0, (y1 - y0) / n + 0.05); }); };
export const FLAGS = {
  'German Empire': tri(['#1A1A1A', '#F4F1E8', '#D52B1E']),
  'Austro-Hungarian Empire': (g, b) => { const [x0, y0, x1, y1] = b, m = (x0 + x1) / 2;           // nửa Áo đỏ-trắng-đỏ, nửa Hung đỏ-trắng-xanh
    tri(['#C8102E', '#F4F1E8', '#C8102E'])(g, [x0, y0, m, y1]); tri(['#C8102E', '#F4F1E8', '#2E7D32'])(g, [m, y0, x1, y1]); },
  'Russian Empire': tri(['#F4F1E8', '#1C57A5', '#D52B1E']),
  'France': tri(['#1F3F8F', '#F4F1E8', '#D52B1E'], true),
  'Kingdom of Italy': tri(['#2E8B57', '#F4F1E8', '#D52B1E'], true),
  'Belgium': tri(['#1A1A1A', '#F2C500', '#D52B1E'], true),
  'Serbia': tri(['#C8102E', '#1C3F94', '#F4F1E8']),
  'Ottoman Empire': (g, b) => { const [x0, y0, x1, y1] = b; g.fillStyle = '#C8102E'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, r = Math.min(x1 - x0, y1 - y0) * 0.22; g.fillStyle = '#F4F1E8'; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
    g.fillStyle = '#C8102E'; g.beginPath(); g.arc(cx + r * 0.3, cy, r * 0.82, 0, 7); g.fill(); },
  'United Kingdom of Great Britain and Ireland': (g, b) => { const [x0, y0, x1, y1] = b, w = x1 - x0, h = y1 - y0, k = Math.min(w, h);
    g.fillStyle = '#1F3F8F'; g.fillRect(x0, y0, w, h);
    g.strokeStyle = '#F4F1E8'; g.lineWidth = k * 0.16; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.moveTo(x1, y0); g.lineTo(x0, y1); g.stroke();
    g.strokeStyle = '#C8102E'; g.lineWidth = k * 0.06; g.stroke();
    g.strokeStyle = '#F4F1E8'; g.lineWidth = k * 0.24; g.beginPath(); g.moveTo((x0 + x1) / 2, y0); g.lineTo((x0 + x1) / 2, y1); g.moveTo(x0, (y0 + y1) / 2); g.lineTo(x1, (y0 + y1) / 2); g.stroke();
    g.strokeStyle = '#C8102E'; g.lineWidth = k * 0.13; g.stroke(); },
  'Bulgaria': tri(['#F4F1E8', '#2E8B57', '#D52B1E']),
  'Romania': tri(['#1F3F8F', '#F2C500', '#C8102E'], true),
  'Montenegro': tri(['#C8102E', '#1C3F94', '#F4F1E8']),
  'Netherlands': tri(['#C8102E', '#F4F1E8', '#1F3F8F']),
  // Chiến tranh Lạnh (europe1960.json / europe1994.json — tập hist/berlin 2026-10-29)
  'West Germany': tri(['#1A1A1A', '#D52B1E', '#F2C500']), 'Germany': tri(['#1A1A1A', '#D52B1E', '#F2C500']),
  'East Germany': (g, b) => { tri(['#1A1A1A', '#D52B1E', '#F2C500'])(g, b); const [x0, y0, x1, y1] = b, r = Math.min(x1 - x0, y1 - y0) * 0.14;   // + vòng huy hiệu búa compa (giản lược: vòng lúa vàng)
    g.strokeStyle = '#E8C04A'; g.lineWidth = r * 0.35; g.beginPath(); g.arc((x0 + x1) / 2, (y0 + y1) / 2, r, 0, 7); g.stroke(); },
  'USSR': (g, b) => { const [x0, y0, x1, y1] = b; g.fillStyle = '#C8102E'; g.fillRect(x0, y0, x1 - x0, y1 - y0); },
  'Russia': tri(['#F4F1E8', '#1C57A5', '#D52B1E']),
  'Poland': (g, b) => { const [x0, y0, x1, y1] = b, m = (y0 + y1) / 2; g.fillStyle = '#F4F1E8'; g.fillRect(x0, y0, x1 - x0, m - y0); g.fillStyle = '#DC143C'; g.fillRect(x0, m, x1 - x0, y1 - m); },
  'Hungary': tri(['#C8102E', '#F4F1E8', '#2E7D32']),
  'Austria': tri(['#C8102E', '#F4F1E8', '#C8102E']),
  'Czechoslovakia': (g, b) => { const [x0, y0, x1, y1] = b, m = (y0 + y1) / 2; g.fillStyle = '#F4F1E8'; g.fillRect(x0, y0, x1 - x0, m - y0); g.fillStyle = '#D52B1E'; g.fillRect(x0, m, x1 - x0, y1 - m);
    g.fillStyle = '#11457E'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * 0.4, m); g.lineTo(x0, y1); g.closePath(); g.fill(); },
  'United Kingdom': (g, b) => FLAGS['United Kingdom of Great Britain and Ireland'](g, b),
  'Italy': tri(['#2E8B57', '#F4F1E8', '#D52B1E'], true),
};
// điểm đặt mặt (kinh, vĩ) — vùng "thân" dễ thấy của từng nước, không phải trọng tâm toán học (Nga kéo tới Thái Bình Dương)
export const ANCHOR = { 'German Empire': [10.6, 51.4], 'Austro-Hungarian Empire': [17.5, 47.6], 'Russian Empire': [36, 55.5],
  'France': [2.4, 46.9], 'United Kingdom of Great Britain and Ireland': [-1.7, 52.9], 'Kingdom of Italy': [12.4, 43.3],
  'Serbia': [20.8, 43.9], 'Belgium': [4.6, 50.6], 'Ottoman Empire': [33, 39.4], 'Bulgaria': [25.2, 42.7], 'Romania': [24.8, 45.9],
  'Netherlands': [5.6, 52.3], 'Montenegro': [19.3, 42.8],
  'West Germany': [8.6, 50.4], 'East Germany': [12.6, 52.0], 'Germany': [10.4, 51.2], 'USSR': [36, 55.5], 'Poland': [19.3, 52.1], 'Hungary': [19.2, 47.2],
  'Austria': [14.4, 47.5], 'Czechoslovakia': [16.5, 49.4], 'United Kingdom': [-1.7, 52.9], 'Italy': [12.4, 43.3] };
export const SIZE = { 'German Empire': 1, 'Austro-Hungarian Empire': 1, 'Russian Empire': 1.4, 'France': 1, 'United Kingdom of Great Britain and Ireland': 0.75,
  'Kingdom of Italy': 0.7, 'Serbia': 0.42, 'Belgium': 0.3, 'Ottoman Empire': 1, 'Bulgaria': 0.45, 'Romania': 0.6, 'Netherlands': 0.3, 'Montenegro': 0.22,
  'West Germany': 0.7, 'East Germany': 0.5, 'Germany': 0.95, 'USSR': 1.4, 'Poland': 0.75, 'Hungary': 0.45, 'Austria': 0.45, 'Czechoslovakia': 0.55, 'United Kingdom': 0.75, 'Italy': 0.7 };

/** Vẽ bản đồ: biển, đất trung tính, nước được chọn tô cờ (fill[n] = 'flag' | màu), viền mực. o.lift[n] = dời (px màn hình, ↑) để nước "nhảy". */
export function drawMap(g, M, V, o = {}) {
  const fill = o.fill || {}, lift = o.lift || {};
  g.save(); g.fillStyle = SEA; g.fillRect(0, 0, W, H);
  g.save(); V.apply(g);
  const lw = 2.2 / V.s;
  for (const n of Object.keys(M.path)) if (!fill[n]) { g.fillStyle = LAND; g.fill(M.path[n]); g.strokeStyle = 'rgba(30,35,40,0.45)'; g.lineWidth = lw; g.stroke(M.path[n]); }
  for (const n of Object.keys(fill)) {
    if (!M.path[n]) continue;
    g.save(); const dy = (lift[n] || 0) / V.s; g.translate(0, -dy);
    g.save(); g.clip(M.path[n]); if (fill[n] === 'flag' && FLAGS[n]) FLAGS[n](g, M.box[n]); else { g.fillStyle = fill[n]; g.fill(M.path[n]); } g.restore();
    g.strokeStyle = INK; g.lineWidth = 3.5 / V.s; g.lineJoin = 'round'; g.stroke(M.path[n]);
    g.restore();
  }
  g.restore();
  g.fillStyle = 'rgba(30,35,40,0.55)'; g.font = '500 16px Archivo, sans-serif'; g.textAlign = CREDIT_LEFT ? 'left' : 'right'; g.fillText(M.credit, CREDIT_LEFT ? 18 : W - 18, H - 14);
  g.restore();
}

/** Mặt + tay chân của quốc gia. mood: calm | angry | smug | shock | sad | sleepy | cool (kính đen); look [x,y]; hop 0..1 (nhún);
 *  arms: down | cross | up | point | wave | hold; k = cỡ (mặc định theo SIZE); legs true/false. */
export function country(g, M, V, n, o = {}) {
  const a = ANCHOR[n]; if (!a) return null;
  const P = V.pt(ll(M, a[0], a[1])), k = (o.k ?? SIZE[n] ?? 0.6) * V.s / 28, r = 26 * k, lift = o.lift || 0;
  const x = P[0] + (o.dx || 0), y = P[1] - lift + (o.dy || 0), look = o.look || [0, 0], mood = o.mood || 'calm', t = o.t || 0;
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  // chân + tay: nét mực mọc từ thân nước (kiểu nhân vật bản đồ), giày tròn
  if (o.legs !== false) { g.strokeStyle = INK; g.lineWidth = 5 * k; const ly = y + 1.9 * r;
    for (const s of [-1, 1]) { const sw = Math.sin(t * 9 + (s > 0 ? Math.PI : 0)) * (o.walk || 0) * 0.5 * r;
      g.beginPath(); g.moveTo(x + s * 0.5 * r, y + 0.9 * r); g.lineTo(x + s * 0.55 * r + sw, ly); g.stroke();
      g.fillStyle = INK; g.beginPath(); g.ellipse(x + s * 0.55 * r + sw + 0.15 * r, ly, 0.28 * r, 0.12 * r, 0, 0, 7); g.fill(); } }
  const arms = o.arms || 'down'; g.strokeStyle = INK; g.lineWidth = 4.5 * k;
  if (arms !== 'none') {
  const A = { down: [[-1.5, 0.9], [1.5, 0.9]], cross: [[0.5, 0.75], [-0.5, 0.75]], up: [[-1.6, -1.4], [1.6, -1.4]], point: [[-1.4, 0.9], [2.4, -0.2]],
    wave: [[-1.4, 0.9], [1.7, -1.3 + 0.25 * Math.sin(t * 12)]], hold: [[-0.4, 0.35], [0.4, 0.35]] }[arms];
  for (let i = 0; i < 2; i++) { const s = i ? 1 : -1, e = A[i]; g.beginPath(); g.moveTo(x + s * 1.05 * r, y + 0.4 * r);
    g.quadraticCurveTo(x + s * 1.35 * r, y + 0.4 * r + (e[1] - 0.4) * 0.3 * r, x + e[0] * r, y + e[1] * r); g.stroke(); } }
  // mắt trắng to (kiểu nhân vật bản đồ), con ngươi + mí theo cảm xúc
  for (const s of [-1, 1]) {
    const ex = x + s * 0.42 * r, ey = y - 0.15 * r, ew = 0.36 * r, eh = 0.44 * r;
    g.fillStyle = '#FFFFFF'; g.strokeStyle = INK; g.lineWidth = 3 * k; g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.fill(); g.stroke();
    if (mood === 'cool') { g.fillStyle = INK; g.beginPath(); g.roundRect(ex - ew * 1.15, ey - eh * 0.55, ew * 2.3, eh * 1.0, 0.12 * r); g.fill(); continue; }
    g.save(); g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.clip();
    const pr = mood === 'shock' ? 0.1 * r : 0.16 * r; g.fillStyle = INK; g.beginPath(); g.arc(ex + look[0] * 0.15 * r, ey + look[1] * 0.18 * r, pr, 0, 7); g.fill();
    g.fillStyle = INK;                                              // mí: giận = cắt chéo vào trong, buồn = chéo ra ngoài, ngái ngủ = sụp
    if (mood === 'angry') { g.beginPath(); g.moveTo(ex - ew - 2, ey - eh - 2); g.lineTo(ex + ew + 2, ey - eh - 2); g.lineTo(ex + ew + 2, ey + (s > 0 ? -0.6 : 0.05) * eh); g.lineTo(ex - ew - 2, ey + (s > 0 ? 0.05 : -0.6) * eh); g.fill(); }
    if (mood === 'sad') { g.beginPath(); g.moveTo(ex - ew - 2, ey - eh - 2); g.lineTo(ex + ew + 2, ey - eh - 2); g.lineTo(ex + ew + 2, ey + (s > 0 ? 0.05 : -0.55) * eh); g.lineTo(ex - ew - 2, ey + (s > 0 ? -0.55 : 0.05) * eh); g.fill(); }
    if (mood === 'sleepy' || mood === 'smug') g.fillRect(ex - ew - 2, ey - eh - 2, 2 * ew + 4, eh * (mood === 'sleepy' ? 1.25 : 0.9));
    g.restore();
  }
  // miệng
  const my = y + 0.55 * r; g.strokeStyle = INK; g.lineWidth = 3.2 * k; g.beginPath();
  if (mood === 'angry') { g.moveTo(x - 0.3 * r, my + 0.05 * r); g.lineTo(x + 0.3 * r, my - 0.02 * r); }
  else if (mood === 'shock') { g.fillStyle = INK; g.ellipse(x, my + 0.05 * r, 0.12 * r, 0.17 * r, 0, 0, 7); g.fill(); }
  else if (mood === 'sad') g.arc(x, my + 0.22 * r, 0.22 * r, Math.PI * 1.2, Math.PI * 1.8);
  else if (mood === 'smug' || mood === 'cool') { g.moveTo(x - 0.25 * r, my); g.quadraticCurveTo(x + 0.05 * r, my + 0.14 * r, x + 0.32 * r, my - 0.1 * r); }
  else if (mood === 'sleepy') { g.ellipse(x, my + 0.05 * r, 0.1 * r, 0.06 * r, 0, 0, 7); }
  else g.arc(x, my - 0.05 * r, 0.22 * r, Math.PI * 0.2, Math.PI * 0.8);
  g.stroke();
  g.restore();
  return { x, y, r };
}

/** Bong bóng chữ (thoại quốc gia): đuôi chỉ về (tx, ty); k 0 → 1 = bật ra có vượt. */
export function bubble(g, txt, x, y, tx, ty, k = 1, size = 34) {
  if (k <= 0) return;
  const s = k < 1 ? 0.6 + 0.5 * Math.sin(Math.min(1, k) * Math.PI * 0.75) / Math.sin(Math.PI * 0.75) : 1;
  g.save(); g.font = `800 ${size}px Archivo, sans-serif`; const w = g.measureText(txt).width + size * 1.2, h = size * 1.7;
  g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#FFFFFF'; g.strokeStyle = INK; g.lineWidth = 4; g.lineJoin = 'round';
  g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, h / 2); g.moveTo(-size * 0.4, h / 2 - 2); g.lineTo((tx - x) / s * 0.35, (ty - y) / s * 0.35); g.lineTo(size * 0.4, h / 2 - 2);
  g.fill(); g.stroke(); g.fillStyle = '#FFFFFF'; g.fillRect(-size * 0.38, h / 2 - 7, size * 0.76, 8);
  g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 2);
  g.restore();
}

/** Mặt quốc gia trên bản đồ (không tay chân — cảnh toàn bản đồ). Áo-Hung: o.two = [moodÁo, moodHung] → hai mặt cãi nhau. */
export function mapFace(g, M, V, n, o = {}) {
  if (n === 'Austro-Hungarian Empire' && o.two) {
    const a = country(g, M, V, n, { ...o, mood: o.two[0], dx: -0.9 * 26 * (SIZE[n] * V.s / 28), legs: false, arms: 'none', look: [1, 0] });
    country(g, M, V, n, { ...o, mood: o.two[1], dx: 0.9 * 26 * (SIZE[n] * V.s / 28), legs: false, arms: 'none', look: [-1, 0] });
    return a;
  }
  return country(g, M, V, n, { ...o, legs: false, arms: 'none' });
}

// nước quá rộng (Nga, Ottoman kéo sang châu Á) — cảnh diễn chỉ lấy phần trong khung kinh / vĩ này
const CUTLL = { 'Russian Empire': [18, 41, 50, 66], 'Ottoman Empire': [22, 34, 46, 43] };
const CUTBOX = { 'Russian Empire': 1, 'Ottoman Empire': 1 };
function cutBox(M, n) { const [a, b, c, d] = CUTLL[n], p = ll(M, a, d), q = ll(M, c, b); return [p[0], p[1], q[0], q[1]]; }
/** Quốc gia TÁCH khỏi bản đồ làm nhân vật (cảnh diễn): hình nước cao `h` px, đáy đặt tại (x, y) — tô cờ, viền mực,
 *  chân mọc từ MÉP DƯỚI, tay mọc từ hai MÉP BÊN (dò bằng isPointInPath), mặt ở điểm đặt mặt. o: mood, arms, look, t, walk,
 *  hop (px ↑), tilt (rad), squash, two (Áo-Hung), flip. */
export function cutout(g, M, n, x, y, h, o = {}) {
  const b = CUTBOX[n] ? cutBox(M, n) : M.box[n], bw = b[2] - b[0], bh = b[3] - b[1], s = h / bh, P = M.path[n];
  const hop = o.hop || 0, sq = o.squash ?? 1, tilt = o.tilt || 0, legL = 0.26 * h;
  const base = [x, y - legL - hop];                                 // đáy hình nước (trên chân)
  const toScr = (mx, my) => [base[0] + (mx - (b[0] + bw / 2)) * s, base[1] + (my - b[3]) * s * sq];
  const apply = () => { g.translate(base[0], base[1]); g.rotate(tilt); g.scale(s, s * sq); g.translate(-(b[0] + bw / 2), -b[3]); };
  const a = ANCHOR[n] ? ll(M, ...ANCHOR[n]) : [b[0] + bw / 2, b[1] + bh / 2];
  // dò mép dưới + hai mép bên tại điểm đặt mặt (toạ độ bản đồ)
  const inside = (mx, my) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const r = g.isPointInPath(P, mx, my); g.restore(); return r; };   // Path2D ở toạ độ bản đồ
  const probe = (dx, dy) => { let px = a[0], py = a[1]; for (let i = 0; i < 400; i++) { const nx = px + dx * bw / 200, ny = py + dy * bh / 200;
      if (!inside(nx, ny)) break; px = nx; py = ny; } return [px, py]; };
  const bot = probe(0, 1), lft = probe(-1, 0), rgt = probe(1, 0);
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  // chân (dưới hình, bước khi walk)
  const B = toScr(...bot), t = o.t || 0, k = h / 300;
  g.strokeStyle = INK; g.lineWidth = 13 * k;
  for (const sd of [-1, 1]) { const sw = Math.sin(t * 10 + (sd > 0 ? Math.PI : 0)) * (o.walk || 0) * 0.12 * h;
    const top = [B[0] + sd * 0.08 * h, B[1] - 6 * k], ft = [B[0] + sd * 0.1 * h + sw, y - 4 * k];
    g.beginPath(); g.moveTo(...top); g.lineTo(...ft); g.stroke(); g.fillStyle = INK; g.beginPath(); g.ellipse(ft[0] + 0.03 * h * (o.flip ? -1 : 1), ft[1], 0.07 * h, 0.028 * h, 0, 0, 7); g.fill(); }
  // thân nước
  g.save(); apply(); if (CUTBOX[n]) { g.beginPath(); g.rect(b[0], b[1], b[2] - b[0], b[3] - b[1]); g.clip(); }
  g.save(); g.clip(P); if (FLAGS[n]) FLAGS[n](g, b); else { g.fillStyle = LAND; g.fill(P); } g.restore();
  g.strokeStyle = INK; g.lineWidth = 5 / s; g.stroke(P); g.restore();
  // tay từ hai mép bên
  const L = toScr(...lft), R = toScr(...rgt), arms = o.arms || 'down';
  const tip = { down: [[-0.16, 0.3], [0.16, 0.3]], cross: [[0.12, 0.12], [-0.12, 0.12]], up: [[-0.2, -0.32], [0.2, -0.32]], point: [[-0.16, 0.3], [0.38, -0.08]],
    wave: [[-0.16, 0.3], [0.22, -0.3 + 0.05 * Math.sin(t * 12)]], hold: [[0.05, 0.08], [-0.05, 0.08]], hips: [[-0.12, 0.12], [0.12, 0.12]] }[arms];
  g.strokeStyle = INK; g.lineWidth = 12 * k;
  if (tip) for (const [E, d, sd] of [[L, tip[0], -1], [R, tip[1], 1]]) {           // arms 'none' → không tay (trang tự vẽ tay riêng)
    const end = [E[0] + d[0] * h, E[1] + d[1] * h], mid = [E[0] + sd * 0.09 * h, (E[1] + end[1]) / 2 + (arms === 'hips' ? -0.02 * h : 0.02 * h)];
    g.beginPath(); g.moveTo(...E); g.quadraticCurveTo(...mid, ...end); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(...end, 5.5 * k, 0, 7); g.fill(); }
  g.restore();
  // mặt (dùng country() với khung nhìn giả đặt điểm mặt đúng chỗ)
  const F = toScr(...a), fk = (o.k ?? 1) * h / 300 * 2.1;
  const fake = { s: 28, pt: () => F };
  if (o.two) { country(g, M, fake, n, { ...o, mood: o.two[0], k: fk, dx: -32 * fk, legs: false, arms: 'none', look: [1, 0] });
    country(g, M, fake, n, { ...o, mood: o.two[1], k: fk, dx: 32 * fk, legs: false, arms: 'none', look: [-1, 0] }); }
  else country(g, M, fake, n, { ...o, k: fk, legs: false, arms: 'none' });
  return { face: F, top: toScr(b[0] + bw / 2, b[1]), feet: [x, y] };
}
