// Đồ nghề của bài trig — DNA ferris (vòng đu quay ban ngày, projects/en/trig/DNA.md). Lõi vẽ chép từ bàn thử người dùng đã
// chọn: tools/lab/ferris.html. Ống nối không mang DNA (lookup, must, prog ném lỗi, mk, nạp ảnh, typeCues) ở engine/lesson.js.
// Mọi hàm vẽ là hàm thuần của tham số (tất định); trời, lều, bóng mascot sinh MỘT lần lúc nạp (loadKit).
// Tờ thử mọi vật: kit-test.html (DNA §11). Chữ: Archivo; biến x, y = Cormorant Italic; θ (và ①②③ nếu cần) = Noto Sans JP —
// mọi hàm chữ của kit tự tách θ sang Noto (DNA §9: không ô đậu phụ), đừng tự fillText chuỗi có θ.
import { W, H, clamp, hash, smooth, outBack, outCubic } from '../../../engine/lib.js';
import { mk, prog, must, loadImages, CROP } from '../../../engine/lesson.js';
import { makeEnv, mouthOpen, drawMouth } from '../../../engine/talk.js';

export { W, H, clamp, hash, smooth, outBack, outCubic };
export { mk, prog, lookup, must, fix, typeCues, CROP } from '../../../engine/lesson.js';

export const TAU = Math.PI * 2, D2R = Math.PI / 180;

// ═════════════════════════ màu (DNA §2 — một màu một nghĩa) ═════════════════════════
export const C = {
  ink: '#23324A', dim: '#5A6578', steel: '#FBF5E8', steelDk: '#C9BB9B',
  sin: '#E0457B', sinInk: '#B0245A', cos: '#2FA38A', cosInk: '#16735F', ang: '#F2B632', angInk: '#8A5A00',
  bad: '#8A97A6', badInk: '#4F5B69', badDk: '#5E6B7A', bulb: '#FFD36B', flap: '#2A3550', flapTx: '#FFF4DC', red: '#D9475E',
  rope: '#8C7B62', white: '#FFFFFF',
};
export const CANDY = ['#F59AB5', '#8FD6C1', '#FFD36B', '#A9C8F2', '#F7B48A', '#C7B3EE'];
export const ERA = {
  fair: { bg: '#BFE2F4', ink: C.ink },                                   // ngoài trời hội chợ: trời pastel + sân cát
  tent: { bg: '#FBF2DF', ink: C.ink },                                   // trong lều triển lãm: bạt kem sọc (ảnh, công thức)
};

// ═════════════════════════ chữ ═════════════════════════
export const AR = '"Archivo"', CG = '"Cormorant Garamond"', NJ = '"Noto Sans JP"';
/** Mọi mặt chữ kit dùng — trang Promise.all trước init (đua font, LESSONS §16). */
export const FONTS = ['500', '600', '700', '800', '900'].map(w => `${w} 40px ${AR}`)
  .concat([`italic 600 40px ${CG}`, `italic 500 40px ${CG}`, `700 40px ${NJ}`, `800 40px ${NJ}`, `500 40px ${NJ}`]);
export const FONT_SAMPLE = 'θ①②③½°−π²√·×÷…→ sin(120°)cos 0.866 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789';
const NOTO_ONLY = /[θ①②③④]/;
/** Chuỗi → các đoạn [chữ, font]: ký tự Archivo/Cormorant không có (θ, ①…) đi Noto Sans JP cùng cỡ/độ đậm. */
function runsOf(s, font) {
  const m = /^(italic )?(\d+) (\d+(?:\.\d+)?)px/.exec(font), nf = m ? `${Math.min(900, +m[2])} ${m[3]}px ${NJ}` : font;
  const out = []; let cur = '', curNoto = null;
  for (const ch of s) { const n = NOTO_ONLY.test(ch); if (curNoto !== null && n !== curNoto) { out.push([cur, curNoto ? nf : font]); cur = ''; } cur += ch; curNoto = n; }
  if (cur) out.push([cur, curNoto ? nf : font]);
  return out;
}
/** Đo bề rộng (đã tách θ). */
export function measure(g, s, font) { g.save(); let w = 0; for (const [p, f] of runsOf(s, font)) { g.font = f; w += g.measureText(p).width; } g.restore(); return w; }
/** Viết chữ (tách θ sang Noto). k < 1: hiện dần theo ký tự (chữ không fade — chữ hội chợ in ra từng chữ). Trả về bề rộng. */
export function text(g, s, x, y, { font = `800 40px ${AR}`, color = C.ink, align = 'left', base = 'alphabetic', k = 1 } = {}) {
  const w = measure(g, s, font);
  if (k <= 0) return w;
  const n = Math.round([...s].length * clamp(k)), shown = [...s].slice(0, n).join('');
  let x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.save(); g.textAlign = 'left'; g.textBaseline = base; g.fillStyle = color;
  for (const [p, f] of runsOf(shown, font)) { g.font = f; g.fillText(p, x0, y); x0 += g.measureText(p).width; }
  g.restore(); return w;
}
/** Chữ quá rộng → ném lỗi (cảnh sửa chữ, không để tràn). */
export function fits(g, s, font, maxW, tag = 'chữ') { const w = measure(g, s, font); if (w > maxW) throw new Error(`${tag}: "${s}" rộng ${Math.round(w)} > ${maxW} px`); return w; }

// ═════════════════════════ số (DNA §11 — mọi số qua must) ═════════════════════════
const r3 = s => `Math.round((${s}) * 1000) / 1000`;
export const SIN30 = must(r3('Math.sin(30 * Math.PI / 180)'), 0.5);
export const SIN120 = must(r3('Math.sin(120 * Math.PI / 180)'), 0.866);
export const COS120 = must(r3('Math.cos(120 * Math.PI / 180)'), -0.5);
export const SINM30 = must(r3('Math.sin(-30 * Math.PI / 180)'), -0.5);
export const SIN1000 = must(r3('Math.sin(1000 * Math.PI / 180)'), -0.985);
export const TURNS1000 = must('Math.floor(1000 / 360)', 2);
export const REST1000 = must('1000 - 2 * 360', 280);
must(r3('Math.sin(280 * Math.PI / 180)'), SIN1000);
must(r3('Math.hypot(Math.cos(2 * Math.PI / 3), Math.sin(2 * Math.PI / 3))'), 1);
/** Vòng đu quay quay nền: một vòng / 60 s (rad/s, ngược chiều kim đồng hồ = góc dương). */
export const SPIN = TAU / 60;
/** Số → chuỗi hiển thị, dấu trừ thật U+2212. */
export const num = v => (v < 0 ? '−' : '') + String(Math.abs(v));

// ═════════════════════════ tiện ích vẽ ═════════════════════════
export const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export function line(g, x0, y0, x1, y1, col, w, cap = 'round') { g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
// BÓNG MỜ TẤT ĐỊNH: không dùng shadowBlur khi render (Chrome cache mặt nạ mờ trên GPU → khung đổi theo thứ tự chụp, lệch ≤ 6/255).
// Bóng của hình chữ nhật bo góc = sprite 9 mảnh vẽ MỘT lần trên canvas CPU (willReadFrequently → Skia phần mềm) theo
// (bo góc, độ mờ, màu), rồi kéo giãn tới cỡ cần. Hào quang (bóng đèn, cabin hồng, sao) = gradient tròn.
const SPR = {};
const cpu = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return [c, c.getContext('2d', { willReadFrequently: true })]; };
function shadowSprite(r, blur, col) {
  const id = `${r}|${blur}|${col}`; if (SPR[id]) return SPR[id];
  const m = r + 2 * blur, n = 2 * m + 1, [c, x] = cpu(n, n), OFF = 4 * n;
  x.shadowColor = col; x.shadowBlur = blur; x.shadowOffsetX = OFF; x.fillStyle = '#000';
  const p = new Path2D(); p.roundRect(2 * blur - OFF, 2 * blur, 2 * r + 1, 2 * r + 1, r); x.fill(p);
  return (SPR[id] = { c, m });
}
/** Bóng mờ của hình chữ nhật bo góc (x, y, w, h, r) trong hệ toạ độ hiện tại, lệch (ox, oy). */
export function shadowRR(g, x, y, w, h, r = 14, { col = 'rgba(60,70,90,0.20)', blur = 16, ox = 0, oy = 6 } = {}) {
  if (w <= 0 || h <= 0) return;
  r = Math.round(Math.max(0, Math.min(r, w / 2, h / 2))); blur = Math.round(blur);
  const { c, m } = shadowSprite(r, blur, col), X = x - 2 * blur + ox, Y = y - 2 * blur + oy, TW = w + 4 * blur, TH = h + 4 * blur, mid = TW - 2 * m, midh = TH - 2 * m;
  const xs = [[0, m, X, m], [m, 1, X + m, mid], [m + 1, m, X + m + mid, m]], ys = [[0, m, Y, m], [m, 1, Y + m, midh], [m + 1, m, Y + m + midh, m]];
  for (const [sx, sw, dx, dw] of xs) for (const [sy, sh, dy, dh] of ys) if (dw > 0 && dh > 0) g.drawImage(c, sx, sy, sw, sh, dx, dy, dw, dh);
}
/** Vật có bóng: box = [x, y, w, h, r] (hệ toạ độ hiện tại) → bóng sprite, rồi fn() vẽ vật. Không box → không bóng. */
export function shade(g, fn, { col = 'rgba(60,70,90,0.20)', blur = 16, ox = 0, oy = 6, box = null } = {}) {
  if (box) shadowRR(g, box[0], box[1], box[2], box[3], box[4] ?? 14, { col, blur, ox, oy });
  g.save(); fn(); g.restore();
}
/** Hào quang tròn (thay shadowBlur cho bóng đèn, cabin hồng, sao). */
export function glow(g, x, y, r, rgb, a = 0.6) {
  if (a <= 0.01 || r <= 0) return;
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.save(); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
}
const pop = k => outBack(clamp(k), 2.2);                                  // vật hội chợ bật vào (bóng bay)
/** Đường nét đứt vẽ dần (tia ngắm, dây nối). */
export function dashed(g, x0, y0, x1, y1, k = 1, { color = C.ink, w = 4, dash = [14, 12] } = {}) {
  if (k <= 0) return;
  const e = clamp(k); g.save(); g.setLineDash(dash); g.lineCap = 'round'; g.strokeStyle = color; g.lineWidth = w;
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e); g.stroke(); g.restore();
}

// ═════════════════════════ nền: trời (cao gấp đôi để camera ngửa lên) + lều ═════════════════════════
// Trời vẽ trên tấm W × 2H: nửa DƯỚI = khung thường (trời → sân cát), nửa TRÊN = đỉnh trời (khung nối p1 → p2, DNA §6).
let SKY_G, SKY_N, TENT;
function makeSky(groundOn) {
  const c = mk(W, 2 * H), x = c.getContext('2d');
  let gr = x.createLinearGradient(0, 0, 0, 2 * H);
  gr.addColorStop(0, '#9FD0EC'); gr.addColorStop(0.5, '#BFE2F4'); gr.addColorStop(0.5 + 0.55 / 2, '#E3F2F4'); gr.addColorStop(0.5 + 0.82 / 2, '#FFF3DF'); gr.addColorStop(1, '#FCEBD0');
  x.fillStyle = gr; x.fillRect(0, 0, W, 2 * H);
  const sun = x.createRadialGradient(1700, H + 60, 0, 1700, H + 60, 760); sun.addColorStop(0, 'rgba(255,246,214,0.85)'); sun.addColorStop(1, 'rgba(255,246,214,0)'); x.fillStyle = sun; x.fillRect(0, 0, W, 2 * H);
  const cloud = (cx, cy, s, k) => { for (let j = 0; j < 6; j++) { const ex = cx + (j - 2.5) * 46 * s, ey = cy - Math.sin(j / 5 * Math.PI) * 26 * s, er = (40 + hash(k * 11 + j) * 30) * s;
    const cg = x.createRadialGradient(ex, ey, 0, ex, ey, er); cg.addColorStop(0, 'rgba(255,255,255,0.6)'); cg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = cg; x.beginPath(); x.arc(ex, ey, er, 0, TAU); x.fill(); } };
  for (let k = 0; k < 7; k++) cloud(120 + hash(k * 3.1 + 1) * 1700, H + 110 + hash(k * 5.7 + 2) * 240, 0.6 + hash(k * 7.3) * 0.7, k);       // như bàn thử
  for (let k = 0; k < 9; k++) cloud(80 + hash(k * 4.3 + 9) * 1760, 120 + hash(k * 6.1 + 4) * 860, 0.7 + hash(k * 8.9) * 0.9, k + 20);     // đỉnh trời
  if (groundOn) {                                                          // sân cát nện + vạch lát
    const G0 = H + 930;
    gr = x.createLinearGradient(0, G0, 0, 2 * H); gr.addColorStop(0, '#EFE5D0'); gr.addColorStop(1, '#E2D3B6'); x.fillStyle = gr; x.fillRect(0, G0, W, 2 * H - G0);
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(0, G0, W, 2);
    for (let i = 0; i < 2600; i++) { const px = hash(i * 1.71) * W, py = G0 + 4 + hash(i * 2.93) * 146; x.fillStyle = hash(i * 4.1) > 0.5 ? 'rgba(150,120,80,0.16)' : 'rgba(255,255,255,0.35)'; x.fillRect(px, py, 2, 2); }
  }
  return c;
}
function makeTent() {
  const c = mk(), x = c.getContext('2d');
  x.fillStyle = '#FBF2DF'; x.fillRect(0, 0, W, H);
  const sw = 120;
  for (let i = 0; i * sw < W; i++) if (i % 2) { x.fillStyle = 'rgba(242,182,50,0.13)'; x.fillRect(i * sw, 0, sw, H); }
  for (let i = 0; i <= W / sw; i++) { const gr = x.createLinearGradient(i * sw - 14, 0, i * sw + 14, 0); gr.addColorStop(0, 'rgba(120,90,40,0)'); gr.addColorStop(0.5, 'rgba(120,90,40,0.10)'); gr.addColorStop(1, 'rgba(120,90,40,0)'); x.fillStyle = gr; x.fillRect(i * sw - 14, 0, 28, H); }   // nếp bạt
  for (let i = 0; i < 3000; i++) { x.fillStyle = hash(i * 2.3) > 0.5 ? 'rgba(140,110,60,0.05)' : 'rgba(255,255,255,0.18)'; x.fillRect(hash(i * 1.3) * W, hash(i * 3.7) * H, 2, 2); }   // sợi vải
  const v = x.createRadialGradient(W / 2, H * 0.45, 300, W / 2, H * 0.5, 1250); v.addColorStop(0, 'rgba(255,248,230,0)'); v.addColorStop(1, 'rgba(120,90,50,0.22)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  // diềm mái lều: vỏ sò sọc hồng-kem, cao 70
  const n = 16, w = W / n; x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, 44); for (let i = n - 1; i >= 0; i--) x.arc((i + 0.5) * w, 44, w / 2, 0, Math.PI, false); x.closePath();
  x.shadowColor = 'rgba(90,60,30,0.25)'; x.shadowBlur = 16; x.shadowOffsetY = 6; x.fillStyle = '#FFF7EA'; x.fill(); x.restore();
  x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, 44); for (let i = n - 1; i >= 0; i--) x.arc((i + 0.5) * w, 44, w / 2, 0, Math.PI, false); x.closePath(); x.clip();
  for (let i = 0; i < n; i++) if (i % 2 === 0) { x.fillStyle = C.red; x.fillRect(i * w, 0, w, 120); } x.restore();
  // sàn gỗ
  const F0 = 968; let gr = x.createLinearGradient(0, F0, 0, H); gr.addColorStop(0, '#D9B98A'); gr.addColorStop(1, '#C49C68'); x.fillStyle = gr; x.fillRect(0, F0, W, H - F0);
  x.fillStyle = 'rgba(255,240,210,0.6)'; x.fillRect(0, F0, W, 2);
  for (let i = 0; i < 9; i++) { x.fillStyle = 'rgba(110,70,30,0.18)'; x.fillRect(0, F0 + 14 + i * 13, W, 1.5); }
  return c;
}
/** Trời hội chợ. pan 0 = khung thường, 1 = đỉnh trời (camera ngửa hẳn). ground = sân cát ở đáy. */
export function sky(g, { pan = 0, ground: gnd = true } = {}) { g.drawImage(gnd ? SKY_G : SKY_N, 0, -Math.round(H * (1 - clamp(pan)))); }
/** Khung nối p1 → p2 (DNA §6): đỉnh trời trơn. p1 kết bằng khung này, p2 mở bằng ĐÚNG khung này. */
export function zenith(g) { sky(g, { pan: 1, ground: false }); }
/** Nền theo ERA (cảnh tự tô nền toàn khung trước khi vẽ). */
export function ground(g, era, o = {}) { if (era === 'tent') g.drawImage(TENT, 0, 0); else sky(g, o); }

// ═════════════════════════ dây cờ đuôi nheo ═════════════════════════
/** Dây võng từ (x0,y0) tới (x1,y1), n lá cờ kẹo. k: cờ bật ra lần lượt dọc dây; t: phần phật nhẹ. Trả về P(u) trên dây. */
export function bunting(g, x0, y0, x1, y1, sag, n, size = 34, { k = 1, t = 0, seed = 0, colors = CANDY } = {}) {
  const P = u => [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + sag * 4 * u * (1 - u)];
  if (k <= 0) return P;
  g.save(); g.strokeStyle = C.rope; g.lineWidth = 2.5; g.beginPath();
  const m = Math.ceil(40 * clamp(k * 1.4));
  for (let i = 0; i <= m; i++) { const [px, py] = P(Math.min(1, i / 40)); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, ki = clamp((k - u * 0.7) / 0.3); if (ki <= 0) continue;   // bật theo thứ tự dọc dây
    const [px, py] = P(u), sw = size * 0.5, tilt = (hash(i * 9.1 + seed) - 0.5) * 0.12 + 0.06 * Math.sin(t * 2.2 + i * 0.9);
    g.save(); g.translate(px, py); g.rotate(tilt); g.scale(1, outBack(ki, 2));
    g.fillStyle = colors[(i + seed) % colors.length]; g.beginPath(); g.moveTo(-sw, 0); g.lineTo(sw, 0); g.lineTo(0, size * 1.15); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.beginPath(); g.moveTo(-sw, 0); g.lineTo(-sw * 0.3, 0); g.lineTo(0, size * 1.15); g.closePath(); g.fill(); g.restore();
  }
  g.restore();
  return P;
}

// ═════════════════════════ VÒNG ĐU QUAY (vật xuyên suốt) ═════════════════════════
function gondola(g, px, py, col, s = 1, hero = false) {
  const hw = 22 * s, top = py + 12 * s, h = 38 * s;
  line(g, px, py, px, top + 4 * s, C.rope, 3 * s);
  if (hero) glow(g, px, top + h / 2, 46 * s, '224,69,123', 0.5);
  g.save();
  g.fillStyle = col; g.beginPath(); g.moveTo(px - hw, top + 12 * s); g.quadraticCurveTo(px, top - 8 * s, px + hw, top + 12 * s); g.closePath(); g.fill();
  g.fill(rr(px - hw, top + 10 * s, 2 * hw, h - 10 * s, 7 * s)); g.restore();
  g.fillStyle = 'rgba(255,255,255,0.85)'; g.fill(rr(px - hw + 6 * s, top + 15 * s, 2 * hw - 12 * s, 11 * s, 3 * s));
  g.fillStyle = 'rgba(40,40,60,0.14)'; g.fillRect(px - hw, top + h - 7 * s, 2 * hw, 7 * s);
  g.fillStyle = '#5E5240'; g.beginPath(); g.arc(px, py, 4.5 * s, 0, TAU); g.fill();
}
/** Toạ độ màn hình của điểm trên vành ở góc a (rad, ngược kim đồng hồ từ +x). side = cos góc quay camera (1 chính diện, 0 nhìn nghiêng). */
export const rimAt = (cx, cy, R, a, side = 1) => [cx + R * Math.cos(a) * side, cy - R * Math.sin(a)];
/**
 * Vòng đu quay. theta = góc của cabin CHÍNH (rad) = góc quay của vòng; các cabin khác cách đều theo. hero: cabin chính hồng
 * phát sáng (= điểm (cos θ, sin θ)); false = cabin kẹo như mọi cabin. side: 1 chính diện → 0 nhìn nghiêng (vành thành vạch).
 * legs: chân chữ A tới groundY. axes: trục x/y qua tâm (chữ x, y Cormorant). Trả về { P: [x, y] cabin chính, cx, cy, R }.
 */
export function wheel(g, cx, cy, R, { theta = Math.PI / 2, hero = false, n = 12, cabins = true, legs = true, groundY = 940, alpha = 1, side = 1, axes = false, bulbs = null } = {}) {
  const sx = Math.max(0.0, side), sl = Math.max(0.12, side), s = R / 300;
  g.save(); g.globalAlpha *= alpha;
  if (legs) for (const sg of [-1, 1]) {
    for (const [k, col, w] of [[0.62, '#E9DFC9', 14], [0.5, C.steel, 16]]) { line(g, cx, cy, cx + sg * R * k * sl, groundY, C.steelDk, (w + 4) * s); line(g, cx, cy, cx + sg * R * k * sl, groundY, col, w * s); }
    for (let j = 1; j <= 3; j++) { const u = j / 4, y = cy + (groundY - cy) * u; line(g, cx - R * 0.5 * u * sl, y, cx + R * 0.5 * u * sl, y, C.steelDk, 4 * s); }
  }
  for (let k = 0; k < n * 2; k++) { const a = theta + k / (n * 2) * TAU, [x, y] = rimAt(cx, cy, R, a, sx); line(g, cx, cy, x, y, k % 2 ? 'rgba(201,187,155,0.75)' : C.steelDk, (k % 2 ? 2 : 3.5) * Math.max(0.6, s)); }
  const Ri = R - 18 * s;
  for (const [r, w] of [[R, 9], [Ri, 6]]) for (const [col, ww] of [[C.steelDk, w + 4], [C.steel, w]]) { g.strokeStyle = col; g.lineWidth = ww * Math.max(0.5, s); g.beginPath(); g.ellipse(cx, cy, Math.max(0.5, r * sx), r, 0, 0, TAU); g.stroke(); }
  g.strokeStyle = C.steelDk; g.lineWidth = 2; g.beginPath();
  for (let k = 0; k <= 96; k++) { const a = theta + k / 96 * TAU, [x, y] = rimAt(cx, cy, k % 2 ? R : Ri, a, sx); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  for (let k = 0; k < 48; k++) { const a = theta + (k + 0.5) / 48 * TAU, [x, y] = rimAt(cx, cy, R - 9 * s, a, sx), b = bulbs ? clamp(bulbs(a)) : 0;
    if (b > 0.02) { glow(g, x, y, 12 * Math.max(0.7, s), '255,190,70', 0.7 * b); g.save(); g.fillStyle = `rgba(255,211,107,${0.4 + 0.6 * b})`; g.beginPath(); g.arc(x, y, 3.2 * Math.max(0.7, s) * (1 + 0.5 * b), 0, TAU); g.fill(); g.restore(); }
    else { g.fillStyle = '#FFF0C2'; g.beginPath(); g.arc(x, y, 3.2 * Math.max(0.7, s), 0, TAU); g.fill(); } }
  g.fillStyle = C.steelDk; g.beginPath(); g.ellipse(cx, cy, Math.max(6, 30 * s * sx), 30 * s, 0, 0, TAU); g.fill(); g.fillStyle = C.steel; g.beginPath(); g.ellipse(cx, cy, Math.max(4, 24 * s * sx), 24 * s, 0, 0, TAU); g.fill();
  if (axes) {
    const ax = typeof axes === 'number' ? axes : 1;
    g.save(); g.globalAlpha *= ax; g.strokeStyle = C.ink; g.lineWidth = 3;
    g.beginPath(); g.moveTo(cx - R - 70, cy); g.lineTo(cx + R + 44, cy); g.moveTo(cx, cy + R + 50); g.lineTo(cx, cy - R - 60); g.stroke();
    g.fillStyle = C.ink; for (const [x, y, a] of [[cx + R + 56, cy, 0], [cx, cy - R - 72, -Math.PI / 2]]) { g.save(); g.translate(x, y); g.rotate(a); g.beginPath(); g.moveTo(0, 0); g.lineTo(-18, -9); g.lineTo(-18, 9); g.closePath(); g.fill(); g.restore(); }
    text(g, 'x', cx + R + 30, cy - 22, { font: `italic 600 40px ${CG}`, align: 'center' });
    text(g, 'y', cx - 30, cy - R - 54, { font: `italic 600 40px ${CG}`, align: 'center' });
    g.restore();
  }
  if (cabins) for (let k = n - 1; k >= 0; k--) { const a = theta + k / n * TAU, [x, y] = rimAt(cx, cy, R, a, sx);
    if (k === 0) gondola(g, x, y, hero ? C.sin : CANDY[0], s * (hero ? 1.08 : 1), hero); else gondola(g, x, y, CANDY[k % CANDY.length], s); }
  g.restore();
  return { P: rimAt(cx, cy, R, theta, sx), cx, cy, R };
}
/** Chấm sáng của cabin chính (điểm trên đường tròn) — vẽ đè lên tâm treo cabin. */
export function heroDot(g, x, y, r = 11) {
  glow(g, x, y, r * 2.6, '224,69,123', 0.7);
  g.save(); g.fillStyle = C.white; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  g.fillStyle = C.sin; g.beginPath(); g.arc(x, y, r * 0.55, 0, TAU); g.fill();
}
/** Cung góc (chanh vàng = GÓC) từ 0 tới a (rad, có thể âm / quá 2π — vẽ xoắn khi > 2π). */
export function angleArc(g, cx, cy, r, a, { color = C.ang, fill = 'rgba(242,182,50,0.28)', w = 6 } = {}) {
  if (Math.abs(a) < 1e-3) return;
  const turns = Math.abs(a) / TAU;
  if (turns <= 1) { g.save(); g.fillStyle = fill; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r, 0, -a, a > 0); g.closePath(); g.fill(); g.restore(); }
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.beginPath();
  const N = Math.max(12, Math.ceil(Math.abs(a) * 30));
  for (let i = 0; i <= N; i++) { const u = a * i / N, rr2 = r + (turns > 1 ? 14 * Math.abs(u) / TAU : 0), x = cx + rr2 * Math.cos(u), y = cy - rr2 * Math.sin(u); i ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke(); g.restore();
}

// ═════════════════════════ MÁY BÁN VÉ (= máy tính tự thiết kế) ═════════════════════════
const DIG = {
  '0': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'], '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'], '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'], '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'], '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'], '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  '.': ['0', '0', '0', '0', '0', '0', '1'], '−': ['0000', '0000', '0000', '1111', '0000', '0000', '0000'], ' ': ['000', '000', '000', '000', '000', '000', '000'],
};
const glyph = ch => { const m = DIG[ch]; if (!m) throw new Error(`bulbDigits: không có ký tự "${ch}" (DIG)`); return m; };
/** Bề rộng chuỗi số bóng đèn ở bước p. */
export const bulbWidth = (s, p) => [...s].reduce((w, ch) => w + glyph(ch)[0].length * p + p * 0.9, -p * 0.9);
/** Số bằng bóng đèn 5×7 (đèn ấm = con số máy trả lời). k: bóng sáng lần lượt theo ký tự (0 = tắt hết). Trả về bề rộng. */
export function bulbDigits(g, s, x0, y0, p, { k = 1, glow: glw = 1 } = {}) {
  let x = x0; const chars = [...s], n = chars.length;
  chars.forEach((ch, i) => {
    const m = glyph(ch), cols = m[0].length, on = clamp((k * n - i) * 1.5);
    for (let r = 0; r < 7; r++) for (let c = 0; c < cols; c++) {
      const bx = x + c * p + p / 2, by = y0 + r * p + p / 2, lit = m[r][c] === '1' ? on : 0;
      if (lit > 0.02) { glow(g, bx, by, p * 0.95, '255,190,70', 0.55 * lit * glw); g.save(); g.globalAlpha *= lit; const bg = g.createRadialGradient(bx - 2, by - 2, 0, bx, by, p * 0.46); bg.addColorStop(0, '#FFFBE6'); bg.addColorStop(0.5, C.bulb); bg.addColorStop(1, '#E59A2A'); g.fillStyle = bg; g.beginPath(); g.arc(bx, by, p * 0.42, 0, TAU); g.fill(); g.restore(); }
      if (lit < 0.98) { g.fillStyle = 'rgba(255,255,255,0.07)'; g.beginPath(); g.arc(bx, by, p * 0.3, 0, TAU); g.fill(); }
    }
    x += cols * p + p * 0.9;
  });
  return x - x0 - p * 0.9;
}
const FLAP_CYCLE = 'ABCDEFGHKMNPRSTUVWXYZ0123456789°−';
/**
 * Bảng lật: mỗi ký tự một ô, vạch chia ngang. k 0 → 1: các ô lật lần lượt từ `from` sang s (ô đang lật hiện ký tự quay vòng
 * + nửa trên gập xuống). cells: số ô cố định (mặc định max độ dài) — ô thừa để trống. Trả về [x0, tổng rộng].
 */
export function flap(g, s, cx, y, tw, th, { font = `800 54px ${AR}`, k = 1, from = '', cells = 0, gap = 6, seed = 0 } = {}) {
  const A = [...s], B = [...from], n = Math.max(cells, A.length, B.length), tot = n * tw + (n - 1) * gap; let x = cx - tot / 2;
  for (let i = 0; i < n; i++) {
    const a = i / (n + 4), b = (i + 4) / (n + 4), u = clamp((k - a) / (b - a));
    const target = A[i] ?? ' ', src = B[i] ?? ' ';
    const ch = u >= 1 || target === src ? target : u <= 0 ? src : FLAP_CYCLE[Math.floor(hash(i * 7.7 + Math.floor(u * 7) * 3.1 + seed) * FLAP_CYCLE.length)];
    let gr = g.createLinearGradient(0, y, 0, y + th); gr.addColorStop(0, '#34426A'); gr.addColorStop(0.5, C.flap); gr.addColorStop(0.5, '#1E2740'); gr.addColorStop(1, '#2A3550');
    g.fillStyle = gr; g.fill(rr(x, y, tw, th, 6));
    if (ch.trim()) text(g, ch, x + tw / 2, y + th / 2 + 2, { font, color: C.flapTx, align: 'center', base: 'middle' });
    if (u > 0 && u < 1 && target !== src) {                              // nửa trên gập xuống (ô không đổi chữ thì đứng yên)
      const f = Math.abs(Math.cos(u * 7 * Math.PI)); g.save(); g.fillStyle = 'rgba(52,66,106,0.92)';
      g.fillRect(x, y + th / 2 - (th / 2) * f, tw, (th / 2) * f); g.restore();
    }
    g.strokeStyle = 'rgba(255,244,220,0.28)'; g.lineWidth = 2; g.stroke(rr(x + 1, y + 1, tw - 2, th - 2, 6));
    g.fillStyle = 'rgba(10,14,28,0.85)'; g.fillRect(x, y + th / 2 - 1.5, tw, 3);
    g.fillStyle = '#6B6E78'; g.fillRect(x - 2, y + th / 2 - 4, 4, 8); g.fillRect(x + tw - 2, y + th / 2 - 4, 4, 8);
    x += tw + gap;
  }
  return [cx - tot / 2, tot];
}
const KEYS = [['sin', 'cos', 'tan', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '−'], ['1', '2', '3', '+'], ['0', '.', '°', '=']];
/** Khung máy chuẩn (s = 1): rộng 600 (mái 660), cao từ top tới đáy 848. */
export const MACHINE = { w: 600, h: 848, aw: 660 };
/**
 * Máy bán vé (DNA §11): thân men kem, mái bạt sọc, ô kính có bảng lật (line) + số bóng đèn (value). Vẽ ở (x, top) tỉ lệ s.
 * flapK / flapFrom: bảng lật (flap). bulbK: bóng sáng (bulbDigits). press = { key, k } phím đang lún (k 0..1..0).
 * k: máy vào (trồi từ dưới + bật). Trả về hộp màn hình: { flaps: [x, y, w, h], bulbs: [x, y, w, h], box: [x, y, w, h] } (toạ độ đã scale).
 */
export function ticketMachine(g, x, top, s = 1, { line: ln = 'sin(120°)', value = '0.866', flapK = 1, flapFrom = '', bulbK = 1, press = null, k = 1, cells = 10, stub = true } = {}) {
  const out = { flaps: null, bulbs: null, box: [x - 30 * s, top, MACHINE.aw * s, MACHINE.h * s] };
  if (k <= 0) return out;
  const w = MACHINE.w, x0 = 0, x1 = w, cx = w / 2, bodyTop = 96, bot = MACHINE.h, e = pop(k), dy = (1 - outCubic(clamp(k))) * 300;
  g.save(); g.translate(x, top + dy * s); g.scale(s, s);
  g.translate(cx, bot); g.scale(1, 0.6 + 0.4 * e); g.translate(-cx, -bot);
  g.save(); g.translate(cx, bot + 6); g.scale(1, 0.08); const sg = g.createRadialGradient(0, 0, 0, 0, 0, w * 0.7); sg.addColorStop(0, 'rgba(90,70,40,0.35)'); sg.addColorStop(1, 'rgba(90,70,40,0)'); g.fillStyle = sg; g.beginPath(); g.arc(0, 0, w * 0.7, 0, TAU); g.fill(); g.restore();
  const body = rr(x0, bodyTop, w, bot - bodyTop, 34);
  shade(g, () => { g.fillStyle = '#E8DCC2'; g.fill(body); }, { col: 'rgba(60,60,80,0.25)', blur: 34, ox: 12, oy: 18, box: [x0, bodyTop, w, bot - bodyTop, 34] });
  let gr = g.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, '#FFFDF6'); gr.addColorStop(0.55, '#F6ECD6'); gr.addColorStop(1, '#DCCDAE'); g.fillStyle = gr; g.fill(body);
  g.strokeStyle = C.steelDk; g.lineWidth = 3; g.stroke(rr(x0 + 12, bodyTop + 12, w - 24, bot - bodyTop - 24, 26));
  for (const [rx, ry] of [[x0 + 28, bodyTop + 28], [x1 - 28, bodyTop + 28], [x0 + 28, bot - 28], [x1 - 28, bot - 28]]) { g.fillStyle = '#B9AA88'; g.beginPath(); g.arc(rx, ry, 6, 0, TAU); g.fill(); g.fillStyle = '#FFF8E6'; g.beginPath(); g.arc(rx - 1.5, ry - 1.5, 2.5, 0, TAU); g.fill(); }
  // mái bạt sọc đỏ-kem, mép vỏ sò
  const aw = MACHINE.aw, ax = cx - aw / 2, ay = 0, ah = 96, ns = 9, sw = aw / ns;
  g.save(); g.beginPath(); g.moveTo(ax + 20, ay); g.lineTo(ax + aw - 20, ay); g.lineTo(ax + aw, ay + ah);
  for (let i = ns - 1; i >= 0; i--) g.arc(ax + (i + 0.5) * sw, ay + ah, sw / 2, 0, Math.PI, false);
  g.closePath(); shadowRR(g, ax + 10, ay, aw - 20, ah + sw / 2, 20, { col: 'rgba(60,60,80,0.25)', blur: 18, oy: 10 }); g.fillStyle = C.white; g.fill(); g.clip();
  for (let i = 0; i < ns; i++) { g.fillStyle = i % 2 ? '#FFF7EA' : C.red; g.beginPath(); g.moveTo(ax + 20 + i * (aw - 40) / ns, ay); g.lineTo(ax + 20 + (i + 1) * (aw - 40) / ns, ay); g.lineTo(ax + (i + 1) * sw, ay + ah + sw); g.lineTo(ax + i * sw, ay + ah + sw); g.fill(); }
  gr = g.createLinearGradient(0, ay, 0, ay + ah + sw / 2); gr.addColorStop(0, 'rgba(255,255,255,0.25)'); gr.addColorStop(1, 'rgba(80,20,30,0.12)'); g.fillStyle = gr; g.fillRect(ax, ay, aw, ah + sw);
  g.restore();
  // ô kính: bảng lật + bóng đèn
  const dx = x0 + 40, dyy = bodyTop + 56, dw = w - 80, dh = 300;
  g.fillStyle = C.steelDk; g.fill(rr(dx - 10, dyy - 10, dw + 20, dh + 20, 24)); g.fillStyle = '#1F2A44'; g.fill(rr(dx, dyy, dw, dh, 18));
  const tw = Math.min(52, (dw - 24 - (cells - 1) * 5) / cells);
  const [fx, ftot] = flap(g, ln, cx, dyy + 34, tw, 84, { font: `800 ${Math.round(tw * 1.08)}px ${AR}`, k: flapK, from: flapFrom, cells, gap: 5 });
  let p = 18; while (bulbWidth(value, p) > dw - 40) p -= 1;
  const bw = bulbWidth(value, p), by = dyy + 150 + (7 * 18 - 7 * p) / 2;
  bulbDigits(g, value, cx - bw / 2, by, p, { k: bulbK });
  gr = g.createLinearGradient(dx, dyy, dx + dw * 0.6, dyy + dh); gr.addColorStop(0, 'rgba(255,255,255,0.16)'); gr.addColorStop(0.35, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fill(rr(dx, dyy, dw, dh, 18));
  // phím men tròn
  const ky0 = dyy + dh + 34, kp = (w - 100) / 4, kh = 50, kg = 58;
  KEYS.forEach((row, r) => row.forEach((key, c) => { const kx = x0 + 50 + c * kp + kp / 2, ky = ky0 + r * kg + kh / 2, fn = r === 0, d = press && press.key === key ? 4 * clamp(press.k) : 0;
    const rim = fn ? C.sin : c === 3 ? C.ang : '#BFB291', face = fn ? '#FFE3EC' : c === 3 ? '#FFF1CC' : '#FFFDF6';
    g.fillStyle = 'rgba(80,60,30,0.25)'; g.fill(rr(kx - kp * 0.4, ky - kh / 2 + 5, kp * 0.8, kh, kh / 2));
    g.fillStyle = rim; g.fill(rr(kx - kp * 0.4, ky - kh / 2 + d, kp * 0.8, kh, kh / 2));
    g.fillStyle = face; g.fill(rr(kx - kp * 0.4 + 4, ky - kh / 2 + 4 + d, kp * 0.8 - 8, kh - 10, kh / 2 - 4));
    text(g, key, kx, ky + 2 + d, { font: `700 30px ${AR}`, color: fn ? C.sinInk : c === 3 ? C.angInk : C.ink, align: 'center', base: 'middle' }); }));
  // khe vé + cuống vé
  const sy = bot - 46; g.fillStyle = '#2A2A30'; g.fill(rr(cx - 110, sy, 220, 12, 6));
  if (stub) { g.save(); g.translate(cx, sy + 6); g.rotate(0.05); shade(g, () => { g.fillStyle = '#FFE9A8'; g.fill(rr(-90, 0, 180, 70, 4)); }, { blur: 8, oy: 4, box: [-90, 0, 180, 70, 4] });
    g.strokeStyle = 'rgba(138,90,0,0.5)'; g.setLineDash([4, 5]); g.lineWidth = 2; g.beginPath(); g.moveTo(-90, 30); g.lineTo(90, 30); g.stroke(); g.setLineDash([]);
    g.fillStyle = 'rgba(138,90,0,0.55)'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(-60 + i * 30, 50, 5, 0, TAU); g.fill(); } g.restore(); }
  g.restore();
  out.flaps = [x + fx * s, top + (dyy + 34) * s, ftot * s, 84 * s];
  out.bulbs = [x + (cx - bw / 2) * s, top + by * s, bw * s, 7 * p * s];
  return out;
}

// ═════════════════════════ vé (nhãn) ═════════════════════════
/** Vé trắng bo tròn có vạch hai đầu (DNA §3). k: bật vào. Trả về hộp {x, y, w, h}. */
export function ticket(g, s, cx, cy, { size = 40, font = null, color = C.ink, edge = C.ink, k = 1, rot = 0, h = 0, bg = C.white } = {}) {
  const f = font || `800 ${size}px ${AR}`, tw = measure(g, s, f), w = tw + 60, hh = h || Math.round(size * 1.6), box = { x: cx - w / 2, y: cy - hh / 2, w, h: hh };
  if (k <= 0) return box;
  const e = pop(k);
  g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(e, e);
  shade(g, () => { g.fillStyle = bg; g.fill(rr(-w / 2, -hh / 2, w, hh, 14)); }, { box: [-w / 2, -hh / 2, w, hh, 14] });
  g.fillStyle = edge; g.fillRect(-w / 2 + 12, -hh / 2 + 8, 5, hh - 16); g.fillRect(w / 2 - 17, -hh / 2 + 8, 5, hh - 16);
  text(g, s, 0, 1, { font: f, color, align: 'center', base: 'middle' });
  g.restore();
  return box;
}

// ═════════════════════════ tam giác vuông xám (vật DUY NHẤT không thuộc hội chợ) ═════════════════════════
function bar(g, x0, y0, x1, y1, w) {
  line(g, x0, y0, x1, y1, C.badDk, w + 4, 'butt'); line(g, x0, y0, x1, y1, C.bad, w, 'butt');
  const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a), ny = Math.cos(a); line(g, x0 + nx * w * 0.22, y0 + ny * w * 0.22, x1 + nx * w * 0.22, y1 + ny * w * 0.22, 'rgba(230,236,242,0.55)', Math.max(1.5, w / 6), 'butt');
}
function jag(g, x, y, a, w) {
  g.save(); g.translate(x, y); g.rotate(a); g.scale(w / 18, w / 18); g.fillStyle = C.bad; g.strokeStyle = C.badDk; g.lineWidth = 2;
  const tx = [0, 9, 2, 14, -3, 11, 4, 0], n = tx.length - 1;
  g.beginPath(); g.moveTo(-6, -11); tx.forEach((dx, i) => g.lineTo(dx, -11 + 22 * i / n)); g.lineTo(-6, 11); g.closePath(); g.fill(); g.stroke();
  g.strokeStyle = C.badInk; g.lineWidth = 2; for (const [a0, b0, a1, b1] of [[-4, -3, -16, -6], [-2, 4, -12, 9]]) { g.beginPath(); g.moveTo(a0, b0); g.lineTo(a1, b1); g.stroke(); }
  g.restore();
}
function bolt(g, x, y, r) { g.fillStyle = C.badDk; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.fillStyle = '#C3CCD6'; g.beginPath(); g.arc(x, y, r * 0.47, 0, TAU); g.fill(); }
const lerp = (a, b, u) => a + (b - a) * u;
/**
 * Tam giác vuông thép xám (DNA §1, §11). Đỉnh góc A ở (Ax, Ay), cạnh đáy sang phải, góc vuông ở B.
 *  deg: góc ở A khi còn nguyên — cạnh đáy giữ dài b, cạnh đứng + cạnh huyền kéo dài theo (tới 90° thì vượt khỏi khung: "không
 *  tam giác nào đủ cao"). snap 0 → 1: gãy ở góc vuông — cạnh huyền bung về breakDeg (mặc định 120°), cạnh đứng gãy đổ, bu-lông rơi.
 *  flip 0 → 1: lật úp qua cạnh đáy (góc âm). spin: xoay quanh trọng tâm (rad). apart 0 → 1: rã rời từng thanh.
 *  s: tỉ lệ (s = 1: đáy 380). k: bật vào. label: vé góc (null = không). Trả về { A, box }.
 */
export function brokenTriangle(g, Ax, Ay, { deg = 37, snap = 0, breakDeg = 120, flip = 0, spin = 0, apart = 0, s = 1, k = 1, label = null, labelCol = null } = {}) {
  if (k <= 0) return null;
  const b = 380, CAP = 2400, w = 18, u = outBack(clamp(snap), 1.2), us = clamp(snap);
  const a0 = Math.min(deg, 89.6) * D2R, a1 = breakDeg * D2R;
  // thanh: [x0, y0, góc (rad, màn hình), dài] trong hệ A = (0, 0), y xuống
  const legI = [b, 0, -Math.PI / 2, Math.min(CAP, b * Math.tan(a0))], legB = [b + 26, -20, -1.32, 280];
  const hypI = Math.min(CAP, b / Math.cos(a0)), hypA = lerp(a0, a1, u), hypL = lerp(hypI, 400, clamp(u));
  const leg = legI.map((v, i) => lerp(v, legB[i], u)), baseL = lerp(b, b - 14, us);
  g.save(); g.translate(Ax, Ay); const e = pop(k); g.scale(s * e, s * e);
  const cx = b * 0.6, cy = -b * 0.35;                                     // trọng tâm gần đúng (xoay / lật)
  g.translate(cx, cy); g.rotate(spin); g.scale(1, Math.cos(Math.PI * clamp(flip))); g.translate(-cx, -cy);
  const off = i => [apart * (hash(i * 3.3) - 0.5) * 160, apart * (60 + hash(i * 5.1) * 120)], rot = i => apart * (hash(i * 7.7) - 0.5) * 1.6;
  const piece = (i, fn) => { const [ox, oy] = off(i); g.save(); g.translate(ox, oy); g.rotate(rot(i)); fn(); g.restore(); };
  const grey = us > 0.5;
  // cung góc ở A (chanh vàng khi nguyên, xám khi gãy)
  const ra = 92;
  piece(9, () => { g.save(); g.fillStyle = grey ? 'rgba(138,151,166,0.22)' : 'rgba(242,182,50,0.28)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, ra, -hypA, 0); g.closePath(); g.fill();
    g.strokeStyle = grey ? C.badInk : C.ang; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, ra, -hypA, 0); g.stroke(); g.restore(); });
  // ô vuông góc ở B
  if (us < 0.4 && apart < 0.3) { g.save(); g.globalAlpha *= 1 - us / 0.4; g.strokeStyle = C.badInk; g.lineWidth = 3; g.strokeRect(b - 34, -34, 34, 34); g.restore(); }
  piece(0, () => { bar(g, 0, 0, baseL, 0, w); if (us > 0.3) jag(g, baseL, 0, 0, w); });
  piece(1, () => { const [x, y, a, L] = leg; bar(g, x, y, x + L * Math.cos(a), y + L * Math.sin(a), w); if (us > 0.3) jag(g, x, y, a + Math.PI, w); });
  piece(2, () => { bar(g, 0, 0, hypL * Math.cos(hypA), -hypL * Math.sin(hypA), w); bolt(g, hypL * Math.cos(hypA), -hypL * Math.sin(hypA), 15); });
  bolt(g, 0, 0, 15);
  if (us > 0.3) for (let i = 0; i < 6; i++) { const f = clamp((us - 0.3) / 0.7), sx = b + 4 + hash(i * 3.3) * 40, sy = -30 + hash(i * 5.1) * 60 + f * f * (120 + hash(i) * 80); g.fillStyle = '#6E7A88'; g.fillRect(sx, sy, 5, 3); }   // vụn thép rơi
  g.restore();
  let box = null;
  if (label) {
    const la = -hypA / 2 * (flip > 0.5 ? -1 : 1), lx = Ax + 170 * Math.cos(la) * s, ly = Ay + 170 * Math.sin(la) * s * Math.cos(Math.PI * clamp(flip)) - 10 * s;
    box = ticket(g, label, lx, ly, { size: Math.round(46 * Math.max(0.7, s)), color: labelCol || (grey || flip > 0.5 || apart > 0 ? C.badInk : C.angInk), edge: grey || flip > 0.5 || apart > 0 ? C.bad : C.ang, k });
  }
  return { A: [Ax, Ay], box };
}

// ═════════════════════════ bạt sọc + sóng ═════════════════════════
/** Tấm bạt sọc treo trên thanh (DNA §1: độ cao cabin vẽ lên bạt = sóng). k: bạt buông xuống từ thanh. Trả về hộp. */
export function tarp(g, x, y, w, h, { k = 1, stripes = 12 } = {}) {
  if (k <= 0) return { x, y, w, h };
  const hh = h * outCubic(clamp(k));
  line(g, x - 6, y - 10, x + w + 6, y - 10, C.steelDk, 10); line(g, x - 6, y - 10, x + w + 6, y - 10, C.steel, 6);
  shade(g, () => { g.fillStyle = '#FFFDF7'; g.fill(rr(x, y, w, hh, 10)); }, { col: 'rgba(60,70,90,0.18)', blur: 26, oy: 10, box: [x, y, w, hh, 10] });
  g.save(); g.clip(rr(x, y, w, hh, 10)); for (let i = 0; i < stripes; i++) if (i % 2) { g.fillStyle = 'rgba(169,200,242,0.16)'; g.fillRect(x + i * w / stripes, y, w / stripes, hh); } g.restore();
  for (let i = 0; i < 9; i++) { const gx = x + 20 + i * (w - 40) / 8; g.fillStyle = '#B9AA88'; g.beginPath(); g.arc(gx, y + 10, 6, 0, TAU); g.fill(); g.fillStyle = '#FFFDF7'; g.beginPath(); g.arc(gx, y + 10, 2.5, 0, TAU); g.fill(); }
  return { x, y, w, h: hh };
}
/**
 * Sóng trên bạt: u ∈ [u0, u0 + span·k] (rad), x = x0 + L·(u − u0)/span, y = mid − A·fn(u). Trả về [x, y] đầu bút.
 * color hồng = sin, bạc hà = cos (DNA §2).
 */
export function waveOnTarp(g, fn, k, { x0, L, mid, A, u0 = 0, span = TAU, color = C.sin, w = 9 } = {}) {
  const X = u => x0 + L * (u - u0) / span, Y = u => mid - A * fn(u);
  if (k <= 0) return [X(u0), Y(u0)];
  const N = Math.max(2, Math.ceil(240 * clamp(k))), ue = u0 + span * clamp(k);
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= N; i++) { const u = u0 + (ue - u0) * i / N; i ? g.lineTo(X(u), Y(u)) : g.moveTo(X(u), Y(u)); } g.stroke(); g.restore();
  return [X(ue), Y(ue)];
}

// ═════════════════════════ khung gương hội chợ (ảnh thật) ═════════════════════════
/**
 * Ảnh lịch sử / ảnh thật (DNA §8). Cả bảng ở assets/photos/INDEX.md (đạo diễn chính). credit BẮT BUỘC (in trên ảnh).
 * note: "IMAGINED · NO LIKENESS SURVIVES" với chân dung tưởng tượng (cảnh tự truyền). Tệp chưa có → loadKit bỏ qua,
 * khung vẽ trống + nhãn "PHOTO TO COME" (không bịa ảnh) và PHOTO_MISSING ghi tên.
 */
export const PHOTOS = {                                                 // assets/photos/INDEX.md (một nguồn: key, tác giả, giấy phép, nhãn)
  hipparchus: { src: './assets/photos/hipparchus.jpg', credit: 'L. Sargent, C. Kreutzberger · PD · Wikimedia Commons', imagined: true },
  almagest: { src: './assets/photos/almagest.jpg', credit: 'Madeleine Slierstaart · CC BY-SA 3.0 · Wikimedia Commons' },
  babylon: { src: './assets/photos/babylon.jpg', credit: 'A. Urcia, Yale Peabody Museum · CC0 · Wikimedia Commons', focus: [0.69, 0.5] },
  fourier: { src: './assets/photos/fourier.jpg', credit: 'A. F. B. Geille after J.-L. Boilly · PD · Wikimedia Commons' },
  'ferris-photo': { src: './assets/photos/ferris-photo.jpg', credit: 'DimiTalen · CC0 · Wikimedia Commons' },
  oscilloscope: { src: './assets/photos/oscilloscope.jpg', credit: 'Pittigrilli · CC BY-SA 4.0 · Wikimedia Commons' },
};
export const PHOTO_MISSING = [];
export const photoImages = (...keys) => Object.fromEntries(keys.map(k => { const q = PHOTOS[k]; if (!q) throw new Error(`photoImages: "${k}" không có trong PHOTOS`); return ['photo:' + k, q.src]; }));
const SMALL = {};
/** Ảnh thu nhỏ theo bậc ½ tới tỉ lệ sc (sinh MỘT lần mỗi cỡ, hàm thuần của điểm ảnh gốc). */
function small(key, im, sc) {
  const id = key + ':' + sc.toFixed(3);
  if (SMALL[id]) return SMALL[id];
  let cur = im;
  while (cur.width * 0.5 >= im.width * sc) { const c = mk(cur.width / 2, cur.height / 2), x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height); cur = c; }
  const c = mk(im.width * sc, im.height * sc), x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, c.width, c.height);
  return (SMALL[id] = c);
}
/** Khung gương viền bóng đèn: ảnh cover trong (x, y, w, h); k: trượt vào + nghiêng về rot; zoom/focus: camera đẩy chậm. t: đèn chớp nhẹ. */
export function mirrorFrame(g, key, x, y, w, h, { k = 1, rot = -0.03, credit, label = null, note = null, zoom = 1, focus: fc, t = 0 } = {}) {
  if (k <= 0) return { x, y, w, h };
  const Q = PHOTOS[key]; if (!Q) throw new Error(`mirrorFrame: "${key}" không có trong PHOTOS`);
  const focus = fc || Q.focus || [0.5, 0.4];
  const im = IM['photo:' + key], cr = credit === undefined ? Q.credit : credit;
  if (im && !cr) throw new Error(`mirrorFrame: "${key}" thiếu credit (assets/photos/INDEX.md)`);
  if (Q.imagined && !note) throw new Error(`mirrorFrame: "${key}" là chân dung tưởng tượng — note "IMAGINED · NO LIKENESS SURVIVES" bắt buộc`);
  const e = outCubic(clamp(k)), B = 34;
  g.save(); g.translate(x + w / 2, y + h / 2 + (1 - e) * 500); g.rotate(rot * e);
  shade(g, () => { g.fillStyle = '#E9C97A'; g.fill(rr(-w / 2 - B, -h / 2 - B, w + 2 * B, h + 2 * B, 26)); }, { col: 'rgba(60,50,30,0.3)', blur: 30, oy: 14, box: [-w / 2 - B, -h / 2 - B, w + 2 * B, h + 2 * B, 26] });
  let gr = g.createLinearGradient(-w / 2, -h / 2 - B, w / 2, h / 2 + B); gr.addColorStop(0, '#FFF0C2'); gr.addColorStop(0.5, '#F2CF7A'); gr.addColorStop(1, '#D9A94A'); g.fillStyle = gr; g.fill(rr(-w / 2 - B, -h / 2 - B, w + 2 * B, h + 2 * B, 26));
  g.fillStyle = '#FBF5E8'; g.fill(rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 10));
  g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
  if (im) {
    const sm = small(key, im, Math.max(w / im.width, h / im.height) * 1.12);   // thu nhỏ trước (bản khắc thu một bước = vân moiré)
    const sc = Math.max(w / sm.width, h / sm.height) * zoom, iw = sm.width * sc, ih = sm.height * sc;
    g.drawImage(sm, -w / 2 - (iw - w) * focus[0], -h / 2 - (ih - h) * focus[1], iw, ih);
  } else {
    g.fillStyle = '#EFE7D6'; g.fillRect(-w / 2, -h / 2, w, h);
    g.strokeStyle = 'rgba(90,101,120,0.35)'; g.setLineDash([10, 10]); g.lineWidth = 3; g.strokeRect(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40); g.setLineDash([]);
    text(g, 'PHOTO TO COME', 0, 12, { font: `700 30px ${AR}`, color: C.dim, align: 'center' });
    text(g, key, 0, 52, { font: `500 26px ${AR}`, color: C.dim, align: 'center' });
  }
  // kính: vệt sáng chéo
  gr = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); gr.addColorStop(0, 'rgba(255,255,255,0.18)'); gr.addColorStop(0.3, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h);
  if (im && cr) {                                                        // credit một dòng, co chữ 20 → 14 px cho vừa; vẫn tràn → ném
    let fs = 20; while (fs > 14 && measure(g, cr, `500 ${fs}px ${AR}`) > w - 24) fs--;
    fits(g, cr, `500 ${fs}px ${AR}`, w - 24, `mirrorFrame credit "${key}"`);
    g.fillStyle = 'rgba(255,253,247,0.86)'; g.fillRect(-w / 2, h / 2 - fs - 14, w, fs + 14); text(g, cr, w / 2 - 12, h / 2 - 9, { font: `500 ${fs}px ${AR}`, color: C.dim, align: 'right' });
  }
  g.restore();
  // bóng đèn viền
  const per = 2 * (w + h + 2 * B), nb = Math.round(per / 54);
  for (let i = 0; i < nb; i++) {
    let d = (i + 0.5) / nb * per, bx, by; const W2 = w + B, H2 = h + B;
    if (d < W2) { bx = -W2 / 2 + d; by = -H2 / 2; } else if ((d -= W2) < H2) { bx = W2 / 2; by = -H2 / 2 + d; } else if ((d -= H2) < W2) { bx = W2 / 2 - d; by = H2 / 2; } else { d -= W2; bx = -W2 / 2; by = H2 / 2 - d; }
    const on = 0.65 + 0.35 * Math.sin(t * 3 + i * 0.9);
    glow(g, bx, by, 16, '255,190,70', 0.55 * on); g.save(); g.fillStyle = `rgba(255,${200 + 30 * on | 0},${120 + 60 * on | 0},1)`; g.beginPath(); g.arc(bx, by, 7, 0, TAU); g.fill(); g.restore();
  }
  g.restore();
  let ly = y + h + B + 46;
  if (label) { ticket(g, label, x + w / 2, ly, { size: 34, k: clamp(k * 1.5 - 0.5) }); ly += 54; }
  if (note) text(g, note, x + w / 2, ly + 14, { font: `700 30px ${AR}`, color: C.dim, align: 'center', k: clamp(k * 2 - 1) });
  return { x, y, w, h };
}

// ═════════════════════════ gạch xám, biển hội chợ, thẻ hồi ═════════════════════════
/** Gạch hiểu lầm (DNA §1): thanh XÁM THÉP vặn bu-lông hai đầu, vẽ dần theo k (không dùng đỏ/hồng cho "sai"). */
export function strike(g, x0, y0, x1, y1, k = 1, { w = 14 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), xe = x0 + (x1 - x0) * e, ye = y0 + (y1 - y0) * e;
  const L = Math.hypot(xe - x0, ye - y0);
  if (L > 0) { g.save(); g.translate(x0, y0); g.rotate(Math.atan2(ye - y0, xe - x0)); shadowRR(g, 0, -w / 2 - 2, L, w + 4, (w + 4) / 2, { col: 'rgba(40,50,60,0.25)', blur: 8, oy: 0 }); g.restore(); }
  bar(g, x0, y0, xe, ye, w);
  bolt(g, x0, y0, w * 0.6); if (k >= 1) bolt(g, x1, y1, w * 0.6);
}
/**
 * Biển hội chợ treo bằng hai dây từ mép trên (DNA §7). Chữ trên BẢNG LẬT (ô tw × th); sub = dòng phụ Archivo dưới bảng.
 * k: biển thả xuống (đung đưa) ; flapK: chữ lật; lift: kéo lên khỏi khung (0 → 1). Trả về hộp biển.
 */
export function sign(g, s, cx, y, { k = 1, flapK = 1, lift = 0, tw = 60, th = 92, sub = null, subK = 1, subSize = 46, from = '', cells = 0, t = 0 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const n = Math.max(cells, [...s].length), fw = n * tw + (n - 1) * 6, padX = 44, subW = sub ? measure(g, sub, `700 ${subSize}px ${AR}`) : 0;
  const bw = Math.max(fw, subW) + 2 * padX, bh = th + 56 + (sub ? subSize + 34 : 0);
  const drop = (1 - outBack(clamp(k), 1.3)) * (y + bh + 60) + outCubic(clamp(lift)) * (y + bh + 80), sway = 0.03 * Math.sin(t * 1.6) * (1 - clamp(lift)) + 0.05 * (1 - clamp(k)) * Math.sin(k * 9);
  const yy = y - drop;
  g.save(); g.translate(cx, yy); g.rotate(sway);
  for (const sx of [-1, 1]) line(g, sx * (bw / 2 - 60), 0, sx * (bw / 2 - 90), -yy - 40, C.rope, 3);
  shade(g, () => { g.fillStyle = '#FFF7EA'; g.fill(rr(-bw / 2, 0, bw, bh, 22)); }, { col: 'rgba(60,60,80,0.25)', blur: 24, oy: 12, box: [-bw / 2, 0, bw, bh, 22] });
  g.strokeStyle = C.red; g.lineWidth = 8; g.stroke(rr(-bw / 2 + 8, 8, bw - 16, bh - 16, 16));
  for (let i = 0; i < 14; i++) { const u = (i + 0.5) / 14, bx = -bw / 2 + 22 + u * (bw - 44); for (const by of [22, bh - 22]) { g.fillStyle = C.bulb; g.beginPath(); g.arc(bx, by, 5, 0, TAU); g.fill(); } }
  for (const sx of [-1, 1]) { g.fillStyle = '#B9AA88'; g.beginPath(); g.arc(sx * (bw / 2 - 60), 4, 8, 0, TAU); g.fill(); }
  const padL = ' '.repeat(Math.floor((n - [...s].length) / 2));         // chữ giữa hàng ô
  flap(g, padL + s, 0, 34, tw, th, { font: `900 ${Math.round(th * 0.62)}px ${AR}`, k: flapK, from, cells: n });
  if (sub) text(g, sub, 0, 34 + th + 26 + subSize * 0.8, { font: `700 ${subSize}px ${AR}`, color: C.ink, align: 'center', k: subK });
  g.restore();
  return { x: cx - bw / 2, y: yy, w: bw, h: bh, flapX: cx - fw / 2, flapW: fw };
}
/** Thẻ HỒI (biển hội chợ giữa khung, DNA §7): thả từ start−2.4, chữ lật, phụ đề in; kéo lên quanh start. */
export function actTitle(g, t, start, act, sub) {
  if (t < start - 2.45 || t > start + 0.3) return;
  fits(g, sub, `700 56px ${AR}`, ACT_SUB_MAX, 'actTitle');
  sign(g, act, W / 2, 300, { k: prog(t, start - 2.4, start - 1.9), flapK: prog(t, start - 2.1, start - 1.4), sub, subK: prog(t, start - 1.5, start - 0.8), subSize: 56, lift: prog(t, start - 0.35, start + 0.25), cells: 10, tw: 76, th: 116, t });
}
/** Phụ đề thẻ hồi tối đa (px, 700 56px Archivo) — đo ở kit-test: "Why mathematicians measure in radians" (37 ký tự) vừa. */
export const ACT_SUB_MAX = 1640;
/** Biển tên mục nhỏ góc trên trái (treo từ mép trên). k: thả; lift: kéo lên. Chữ 700 34px Archivo, rộng ≤ SEC_MAX. */
export function secTag(g, name, { k = 1, lift = 0, t = 0, x = 104, y = 70 } = {}) {
  if (k <= 0 || lift >= 1) return null;
  const font = `700 34px ${AR}`, tw = fits(g, name, font, SEC_MAX, 'secTag'), bw = tw + 64, bh = 70;
  const yy = y - (1 - outBack(clamp(k), 1.4)) * (y + bh + 20) - outCubic(clamp(lift)) * (y + bh + 30);
  g.save(); g.translate(x, yy); g.rotate(0.012 * Math.sin(t * 1.3));
  for (const sx of [30, bw - 30]) line(g, sx, 0, sx, -yy - 10, C.rope, 2.5);
  shade(g, () => { g.fillStyle = '#FFF7EA'; g.fill(rr(0, 0, bw, bh, 14)); }, { box: [0, 0, bw, bh, 14] });
  g.fillStyle = C.ang; g.fillRect(14, 12, 6, bh - 24); g.fillRect(bw - 20, 12, 6, bh - 24);
  text(g, name, bw / 2, bh / 2 + 2, { font, align: 'center', base: 'middle' });
  g.restore();
  return { x, y: yy, w: bw, h: bh };
}
/** Bề rộng tối đa chữ biển tên mục (px) — "Three hundred and sixty is a choice" (35 ký tự) đo ≈ 600 px. */
export const SEC_MAX = 720;

// ═════════════════════════ cảnh xa (ACT ONE, cold open): núi, thuyền, Mặt Trăng, sao, biểu tượng sóng ═════════════════════════
export function mountain(g, x, y, s = 1, k = 1) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(x, y); g.scale(s, s * e);
  g.fillStyle = '#9DB3C8'; g.beginPath(); g.moveTo(-260, 0); g.lineTo(-40, -300); g.lineTo(30, -230); g.lineTo(90, -280); g.lineTo(300, 0); g.closePath(); g.fill();
  g.fillStyle = '#FBF5E8'; g.beginPath(); g.moveTo(-40, -300); g.lineTo(-92, -230); g.lineTo(-58, -238); g.lineTo(-30, -214); g.lineTo(0, -258); g.closePath(); g.fill();
  g.fillStyle = 'rgba(35,50,74,0.10)'; g.beginPath(); g.moveTo(-40, -300); g.lineTo(30, -230); g.lineTo(90, -280); g.lineTo(300, 0); g.lineTo(-40, 0); g.closePath(); g.fill();
  g.restore();
}
export function ship(g, x, y, s = 1, k = 1, t = 0) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(x, y + Math.sin(t * 1.8) * 4); g.rotate(0.03 * Math.sin(t * 1.4)); g.scale(s * e, s * e);
  g.fillStyle = '#7A5A3A'; g.beginPath(); g.moveTo(-90, 0); g.lineTo(90, 0); g.lineTo(64, 34); g.lineTo(-64, 34); g.closePath(); g.fill();
  line(g, 0, 0, 0, -150, '#5E4630', 6);
  g.fillStyle = '#FFF7EA'; g.beginPath(); g.moveTo(6, -140); g.lineTo(80, -20); g.lineTo(6, -20); g.closePath(); g.fill();
  g.fillStyle = '#F7E3C8'; g.beginPath(); g.moveTo(-6, -120); g.lineTo(-62, -20); g.lineTo(-6, -20); g.closePath(); g.fill();
  g.fillStyle = C.red; g.beginPath(); g.moveTo(0, -150); g.lineTo(30, -142); g.lineTo(0, -134); g.closePath(); g.fill();
  g.restore();
}
export function moon(g, x, y, r = 70, k = 1) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(x, y); g.scale(e, e);
  const gl = g.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 2.2); gl.addColorStop(0, 'rgba(255,250,230,0.6)'); gl.addColorStop(1, 'rgba(255,250,230,0)'); g.fillStyle = gl; g.beginPath(); g.arc(0, 0, r * 2.2, 0, TAU); g.fill();
  g.fillStyle = '#FFF8E6'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.strokeStyle = 'rgba(35,50,74,0.28)'; g.lineWidth = 3; g.stroke();
  for (const [cx, cy, cr] of [[-0.3, -0.2, 0.18], [0.28, 0.1, 0.24], [-0.05, 0.42, 0.12], [0.35, -0.38, 0.1]]) { g.fillStyle = 'rgba(201,187,155,0.45)'; g.beginPath(); g.arc(cx * r, cy * r, cr * r, 0, TAU); g.fill(); }
  g.restore();
}
export function star(g, x, y, r, k = 1, col = '#FFF4C8') {
  if (k <= 0) return; const e = pop(k);
  glow(g, x, y, r * 1.9 * e, '255,230,150', 0.75);
  g.save(); g.translate(x, y); g.scale(e, e); g.fillStyle = col; g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr2 = i % 2 ? r * 0.42 : r; g.lineTo(rr2 * Math.cos(a), rr2 * Math.sin(a)); } g.closePath(); g.fill(); g.restore();
}
/** Biểu tượng cưỡi sóng (DNA §1 cold open, ACT SIX/EIGHT): 'speaker' loa · 'light' đèn pin + tia · 'socket' ổ điện. Đĩa vé trắng r. */
export function icon(g, kind, x, y, r = 54, k = 1) {
  if (k <= 0) return; const e = pop(k);
  g.save(); g.translate(x, y); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); }, { box: [-r, -r, 2 * r, 2 * r, r] });
  g.strokeStyle = C.ink; g.fillStyle = C.ink; g.lineWidth = 5; g.lineCap = g.lineJoin = 'round'; const q = r / 54;
  g.scale(q, q);
  if (kind === 'speaker') {
    g.beginPath(); g.moveTo(-26, -10); g.lineTo(-12, -10); g.lineTo(6, -26); g.lineTo(6, 26); g.lineTo(-12, 10); g.lineTo(-26, 10); g.closePath(); g.fill();
    for (const rr2 of [14, 26]) { g.beginPath(); g.arc(8, 0, rr2, -0.8, 0.8); g.stroke(); }
  } else if (kind === 'light') {
    g.save(); g.rotate(-0.5); g.fillStyle = C.ink; g.fill(rr(-30, -10, 30, 20, 4)); g.fillStyle = '#FFD36B'; g.beginPath(); g.moveTo(0, -12); g.lineTo(34, -26); g.lineTo(34, 26); g.lineTo(0, 12); g.closePath(); g.fill(); g.restore();
  } else if (kind === 'socket') {
    g.strokeStyle = C.ink; g.lineWidth = 5; g.stroke(rr(-26, -26, 52, 52, 12));
    g.fill(rr(-12, -14, 6, 16, 2)); g.fill(rr(6, -14, 6, 16, 2)); g.beginPath(); g.arc(0, 12, 5, 0, TAU); g.fill();
  } else throw new Error(`icon: không có "${kind}"`);
  g.restore();
}

// ═════════════════════════ mascot NÓI (DNA §5) ═════════════════════════
const IM = {}, SIL = {};
let ENV = null;
export function setTalk(json) { ENV = makeEnv(json); }
/** Chiều cao tối đa mascot (DNA §5: ≤ ~25% khung). */
export const FIG_MAX = 290;
/** Mascot nhỏ ở mép dưới. k: trồi lên + bật; t (giờ timeline của trang) → miệng nói theo lời khi đã đứng hẳn. */
export function figure(g, pose, cx, foot, h, k = 1, { t = null, talk = true, flip = false } = {}) {
  if (k <= 0) return null;
  if (h > FIG_MAX) throw new Error(`figure: cao ${h} px > ${FIG_MAX} — DNA §5 mascot nhỏ`);
  const key = 'pose-' + pose, im = IM[key]; if (!im) throw new Error(`figure: chưa nạp tư thế "${pose}" (static POSES)`);
  const sh0 = im.height * (CROP[pose] ?? 1), s = h / sh0, w = im.width * s;
  const rise = (1 - outBack(clamp(k))) * h * 0.6, x0 = cx - w / 2, y0 = foot + rise - h;
  g.save(); if (flip) { g.translate(2 * cx, 0); g.scale(-1, 1); }
  g.globalAlpha = 0.22; g.drawImage(SIL[key], 0, 0, im.width, sh0, x0 + 10, y0 + 8, w, h); g.globalAlpha = 1;
  g.drawImage(im, 0, 0, im.width, sh0, x0, y0, w, h);
  if (talk && t != null && ENV) drawMouth(g, pose, { x0, y0, s }, mouthOpen(ENV, t, k), im.width);
  g.restore();
  return { x: flip ? 2 * cx - x0 - w : x0, y: y0, w, h };
}

// ═════════════════════════ chuyển cảnh (DNA §7) — trang p1/p2 gọi ═════════════════════════
/** Dây cờ quét (cùng ERA): một dây cờ dọc bay từ phải sang trái; cảnh mới lộ PHÍA SAU dây (bên phải). k ∈ [0,1]. */
export function buntingSweep(g, k, drawPrev, drawCur) {
  const e = outCubic(clamp(k)), X = (W + 160) - e * (W + 420), sag = 90, tilt = 140;
  const P = u => [X + tilt * (u - 0.5) + sag * 4 * u * (1 - u), -40 + (H + 80) * u];
  g.save(); drawPrev(); g.restore();
  g.save(); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = P(i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.lineTo(W + 400, H + 60); g.lineTo(W + 400, -60); g.closePath(); g.clip(); drawCur(); g.restore();
  g.save(); g.strokeStyle = 'rgba(60,60,80,0.18)'; g.lineWidth = 12; g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = P(i / 30); i ? g.lineTo(x + 3, y + 5) : g.moveTo(x + 3, y + 5); } g.stroke(); g.restore();
  g.save(); g.strokeStyle = C.rope; g.lineWidth = 4; g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = P(i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
  for (let i = 0; i < 14; i++) {                                         // cờ đuôi nheo bay về sau (sang phải), phần phật
    const u = (i + 0.5) / 14, [x, y] = P(u), size = 46;
    g.save(); g.translate(x, y); g.rotate(-Math.PI / 2 + 0.12 * Math.sin(k * 20 + i)); g.fillStyle = CANDY[i % CANDY.length];
    g.beginPath(); g.moveTo(-size * 0.5, 0); g.lineTo(size * 0.5, 0); g.lineTo(0, -size * 1.2); g.closePath(); g.fill(); g.restore();
  }
}
let CURT;
/** Rèm lều (khác ERA): rèm sọc khép từ hai bên che cảnh cũ (k < 0.45) rồi kéo ra hai bên lộ cảnh mới. */
export function curtainSwap(g, k, drawPrev, drawCur) {
  const close = k < 0.45, c = close ? outCubic(k / 0.45) : 1 - outCubic((k - 0.45) / 0.55);
  g.save(); (close ? drawPrev : drawCur)(); g.restore();
  const half = W / 2 + 40, wv = half * c;
  for (const sd of [-1, 1]) {
    g.save(); const x0 = sd < 0 ? wv - half : W - wv;
    g.translate(x0, 0); if (sd > 0) { g.translate(half, 0); g.scale(-1, 1); } g.drawImage(CURT, 0, 0);
    g.restore();
  }
}
function makeCurtain() {
  const w = W / 2 + 40, c = mk(w, H), x = c.getContext('2d'), n = 9, sw = w / n;
  for (let i = 0; i < n; i++) {
    x.fillStyle = i % 2 ? '#FFF3DE' : C.red; x.fillRect(i * sw, 0, sw + 1, H);
    const gr = x.createLinearGradient(i * sw, 0, (i + 1) * sw, 0); gr.addColorStop(0, 'rgba(80,30,20,0.18)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.10)'); gr.addColorStop(1, 'rgba(80,30,20,0.22)'); x.fillStyle = gr; x.fillRect(i * sw, 0, sw + 1, H);
  }
  x.fillStyle = '#C9A24A'; x.fillRect(0, 0, w, 18); x.fillStyle = 'rgba(80,60,20,0.3)'; x.fillRect(0, 18, w, 4);
  return c;
}

// ═════════════════════════ nạp ═════════════════════════
/** Nạp ảnh {key: url} ('pose-<tên>' mascot, 'photo:<key>' ảnh thật — thiếu tệp ảnh thì ghi PHOTO_MISSING, không ném) + sinh nền MỘT lần. */
export async function loadKit(images) {
  SKY_G = makeSky(true); SKY_N = makeSky(false); TENT = makeTent(); CURT = makeCurtain();
  const photos = Object.entries(images).filter(([k]) => k.startsWith('photo:')), rest = Object.fromEntries(Object.entries(images).filter(([k]) => !k.startsWith('photo:')));
  await loadImages(rest, IM);
  await Promise.all(photos.map(([k, u]) => loadImages({ [k]: u }, IM).catch(() => { PHOTO_MISSING.push(k.slice(6)); console.warn('kit: thiếu ảnh ' + u); })));
  for (const key of Object.keys(rest)) if (key.startsWith('pose-')) {
    const im = IM[key], c = mk(im.width, im.height), x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#5A6E8A'; x.fillRect(0, 0, im.width, im.height); SIL[key] = c;
  }
}
