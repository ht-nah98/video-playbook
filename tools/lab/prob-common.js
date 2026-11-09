// Bàn thử DNA bài probability (2026-10-23) — phần vẽ chung cho 3 hướng (notebook / boardgame / engraving).
// Mỗi hướng là một file tools/lab/<hướng>.html gọi run(theme). Hai khung CÙNG nội dung:
//   khung 0 (t < 1) = cold open = thế giới thumbnail: hai cược của de Méré, 51.8% | 49.1%, "SAME ODDS?"
//   khung 1 (t ≥ 1) = ACT ONE "The condition everyone forgets": lưới 6×6 xúc xắc đỏ × xanh, 6 ô tổng 7, 1 ô tổng 12,
//                      danh sách 11 tổng (2…12) bị gạch "1/11?"
// Số tính bằng code + must(); bóng = gradient elip (không shadowBlur / ctx.filter); ngẫu nhiên = hash(i).
import { toCanvas } from '../../engine/mascot.js';
import { hash } from '../../engine/lib.js';
import { stick, P } from '../../engine/stick.js';

export const W = 1920, H = 1080;

// ---- số (CONTENT.md) ----
const ev = s => Function(`return (${s})`)();
export const must = (s, v) => { const r = ev(s); if (r !== v) throw new Error(`sai: ${s} = ${r} ≠ ${v}`); return v; };
export const P1 = must('(100 * (1 - (5 / 6) ** 4)).toFixed(1)', '51.8');
export const P2 = must('(100 * (1 - (35 / 36) ** 24)).toFixed(1)', '49.1');
must('671 + 625', 1296); must('6 ** 4', 1296);
export const SUM = (r, b) => r + b;
must('[1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b)).filter(s => s === 7).length', 6);
must('[1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b)).filter(s => s === 12).length', 1);
must('new Set([1,2,3,4,5,6].flatMap(r => [1,2,3,4,5,6].map(b => r + b))).size', 11);

// ---- tương phản ----
const lum = hex => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
export const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const mix = (hex, k) => { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)); const t = k > 0 ? 255 : 0, a = Math.abs(k);
  return '#' + v.map(c => Math.round(c + (t - c) * a).toString(16).padStart(2, '0')).join(''); };

// ---- tiện ích vẽ ----
export const mk = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const rr = (x, y, w, h, r) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export function txt(g, s, x, y, font, col, align = 'left', base = 'alphabetic', rot = 0) {
  g.save(); g.font = font; g.textAlign = align; g.textBaseline = base; g.fillStyle = col;
  if (rot) { g.translate(x, y); g.rotate(rot); g.fillText(s, 0, 0); } else g.fillText(s, x, y);
  const w = g.measureText(s).width; g.restore(); return w;
}
export function line(g, x0, y0, x1, y1, col, w, cap = 'round') { g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
export function contact(g, cx, cy, rx, ry, a = 0.28, rgb = '40,40,40') { g.save(); g.translate(cx, cy); g.scale(1, ry / rx); const s = g.createRadialGradient(0, 0, 0, 0, 0, rx);
  s.addColorStop(0, `rgba(${rgb},${a})`); s.addColorStop(0.6, `rgba(${rgb},${a * 0.45})`); s.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = s; g.beginPath(); g.arc(0, 0, rx, 0, 7); g.fill(); g.restore(); }
// nét tay: đường hơi run (tất định)
export function wobble(g, pts, col, w, seed = 1, amp = 1.6) {
  g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  pts.forEach(([x, y], i) => { const dx = (hash(seed + i * 1.7) - 0.5) * amp * 2, dy = (hash(seed + i * 3.1) - 0.5) * amp * 2; i ? g.lineTo(x + dx, y + dy) : g.moveTo(x + dx, y + dy); });
  g.stroke(); g.restore();
}
export const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };

// ---- khung chung: theme cung cấp bg(k), die(g, cx, cy, s, n, col, rot), panel, mark(kind), font, màu ----
export function run(T) {
  const g = document.getElementById('cv').getContext('2d');
  const IM = {}; const BOX = window.__boxes = {}; let BG = [], ready = false;
  const CR = {}; for (const [k, a, b] of T.contrast) { CR[k] = Math.round(cr(a, b) * 10) / 10; if (CR[k] < 4.5) throw new Error(`tương phản ${k} = ${CR[k]}`); }
  window.__contrast = CR;
  const C = T.C, F = T.F;

  function figure(pose, cx, foot, h) { const im = IM[pose], s = h / im.height, w = im.width * s; g.drawImage(im, cx - w / 2, foot - h, w, h); return [cx - w / 2, foot - h, w, h]; }

  // ===== khung 0: hai cược =====
  function frame0() {
    g.drawImage(BG[0], 0, 0);
    const bets = [
      { x: 250, w: 640, n: 1, times: '× 4', want: 'one 6', naive: '4 × 1/6 = 2/3', p: P1, col: C.win, ink: C.winInk, tag: 'win' },
      { x: 1030, w: 640, n: 2, times: '× 24', want: 'one double 6', naive: '24 × 1/36 = 2/3', p: P2, col: C.lose, ink: C.loseInk, tag: 'lose' },
    ];
    bets.forEach((b, i) => {
      const y = 250, h = 560;
      T.panel(g, b.x, y, b.w, h, i);
      BOX['panel' + i] = [b.x, y, b.w, h];
      // xúc xắc
      const cy = y + 178 + (T.dieDy || 0), ds = T.dieScale || 1;
      if (b.n === 1) T.die(g, b.x + 210, cy, 150 * ds, 6, C.dieA, -0.12, i * 10 + 1);
      else { T.die(g, b.x + 130, cy + 6, 112 * ds, 6, C.dieA, -0.16, i * 10 + 2); T.die(g, b.x + 252, cy - 4, 112 * ds, 6, C.dieB, 0.1, i * 10 + 3); }
      txt(g, b.times, b.x + b.w - 70, cy + 34, `${F.bigW} 108px ${F.big}`, C.ink, 'right', 'alphabetic');
      txt(g, 'at least ' + b.want, b.x + 60, y + 300, `${F.smallW} 36px ${F.small}`, C.ink2, 'left');
      // phép tính "cộng" của ông — bị gạch
      txt(g, b.naive, b.x + 60, y + 362, `${F.monoW} 38px ${F.mono}`, C.ink2, 'left');   // lý lẽ của ông: đọc được, chưa gạch (gạch khi "=" vỡ)
      // con số thật
      const pw = txt(g, b.p + '%', b.x + b.w / 2, y + 500, `${F.bigW} 140px ${F.big}`, b.ink, 'center');
      T.mark(g, b.x + b.w / 2, y + 462, pw, b.tag);
      BOX['p' + i] = [b.x + b.w / 2 - pw / 2, y + 380, pw, 140];
    });
    // SAME ODDS?  (vật của thumbnail)
    T.title(g, 'SAME ODDS?', W / 2, 160);
    BOX.title = [W / 2 - 420, 60, 840, 130];
    // người que = dân cược 1654 (mũ rộng vành) đứng giữa hai bàn
    T.gambler(g, 960, 900, 260);
    BOX.fig = figure('pose-ponder', 150, 1080, 260);
  }

  // ===== khung 1: lưới 36 ô =====
  function frame1() {
    g.drawImage(BG[1], 0, 0);
    const N = 6, cell = 104, gx = 820, gy = 220;           // lưới: hàng = đỏ, cột = xanh
    T.gridBack(g, gx, gy, cell, N);
    for (let r = 1; r <= N; r++) for (let b = 1; b <= N; b++) {
      const x = gx + (b - 1) * cell, y = gy + (r - 1) * cell, s = SUM(r, b);
      const kind = s === 7 ? 'seven' : s === 12 ? 'twelve' : null;
      T.cell(g, x, y, cell, s, kind, r * 7 + b);
    }
    // đầu hàng / cột: xúc xắc đỏ (trái), xanh (trên)
    for (let k = 1; k <= N; k++) { T.die(g, gx - 62, gy + (k - 0.5) * cell, 70, k, C.dieA, 0, 100 + k); T.die(g, gx + (k - 0.5) * cell, gy - 62, 70, k, C.dieB, 0, 200 + k); }
    BOX.grid = [gx - 100, gy - 100, N * cell + 100, N * cell + 100];
    // chú thích phải
    const lx = gx + N * cell + 60;
    T.key(g, lx, gy + 140, '7', '6 / 36', 'seven');
    T.key(g, lx, gy + 400, '12', '1 / 36', 'twelve');
    BOX.key = [lx, gy + 70, 300, 420];
    // trái: danh sách 11 tổng — bị gạch
    const ly = 230; txt(g, 'totals', 140, ly, `${F.smallW} 36px ${F.small}`, C.ink2, 'left');
    for (let s = 2; s <= 12; s++) { const col = (s - 2) % 2, row = Math.floor((s - 2) / 2);
      txt(g, String(s), 150 + col * 110, ly + 70 + row * 70, `${F.bigW} 52px ${F.big}`, C.ink, 'left'); }
    const wy = ly + 70 + 6 * 70 + 20, ww = txt(g, '1 / 11 ?', 140, wy, `${F.bigW} 60px ${F.big}`, C.loseInk, 'left');
    T.strike(g, 130, wy - 22, ww + 24, 3);
    BOX.list = [130, ly - 40, 300, wy - ly + 60];
    T.stickGrid(g, gx, gy, cell);
    BOX.fig = figure('pose-pointer', 1760, 1080, 250);
  }

  (async () => {
    await Promise.all(T.fonts.map(f => document.fonts.load(f, 'SAME ODDS?0123456789%×/= atlesdoubl')));
    await Promise.all(['pose-ponder', 'pose-pointer'].map(p => new Promise((res, rej) => { const im = new Image();
      im.onload = () => { IM[p] = toCanvas(im); res(); }; im.onerror = () => rej(new Error('img ' + p)); im.src = `../../assets/character-v2/cut/${p}.png`; })));
    BG = [T.bg(0), T.bg(1)]; ready = true;
  })().catch(e => { window.__intro.error = String(e); });
  const frame = t => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; (t < 1 ? frame0 : frame1)(); };
  window.__intro = { get ready() { return ready; }, still: frame, frame, DUR: 2 };
  return { g, stick, P };
}
export { stick, P, hash };
