// hồi a4 · The summer everything leaked (BRIEF-SCENES.md) — người C. Tường rỉ nước → bản đồ (Liên Xô ngủ, xe tăng quay đầu, láng giềng ngẩng lên) →
// Hungary cắt hàng rào → Pan-European Picnic (người dẫn nhập vai #3: du khách mũ cói giỏ picnic) → "VISIT HUNGARY!" → vườn đại sứ quán Praha
// → ban công 30/9 (tiếng reo át câu) → Leipzig đêm thứ Hai, nến (người dẫn nhập vai #4 trong đoàn) → hàng cảnh sát (NGHIÊM) → Honecker bị đẩy, Krenz vào.
// Tiếng chính: cỏ/chim (picnic), đám đông reo (Praha), bước chân + hô (Leipzig), gió tối (hàng cảnh sát), "plop" ghế trượt (Honecker).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, country, bubble, ll, INK } from '../../_kit/mapkit.js';
import { P, wall, cap, SK } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;
export const bindG = c => { g = c; };
export const pop = (X, t0, d = 0.3) => clamp((X - t0) / d);

// ── đồ dùng cục bộ (a5 dùng lại) ──
export const sky = (a, b, y1 = H) => { const gr = g.createLinearGradient(0, 0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(0, 0, W, H); };
export const box = (x, y, w, h, fill, lw = 5) => { g.fillStyle = fill; g.fillRect(x, y, w, h); if (lw) { g.strokeStyle = INK; g.lineWidth = lw; g.strokeRect(x, y, w, h); } };
export const disc = (x, y, r, fill, lw = 4) => { g.fillStyle = fill; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); if (lw) { g.strokeStyle = INK; g.lineWidth = lw; g.stroke(); } };
export const txt = (s, x, y, size, col = INK, align = 'center', w = 900) => { g.save(); g.font = `${w} ${size}px Archivo, sans-serif`; g.textAlign = align; g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
export const dim = (a, col = '10,10,20') => { g.fillStyle = `rgba(${col},${a})`; g.fillRect(0, 0, W, H); };
/** vali cạnh một folk cao h đứng ở (x, y) */
export function suitcase(x, y, h, col = '#8A5A3A', rot = 0) { const w = h * 0.22, hh = h * 0.16; g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = Math.max(3, h * 0.016);
  g.fillRect(-w / 2, -hh, w, hh); g.strokeRect(-w / 2, -hh, w, hh); g.beginPath(); g.moveTo(-w * 0.2, -hh); g.lineTo(-w * 0.2, -hh - h * 0.03); g.lineTo(w * 0.2, -hh - h * 0.03); g.lineTo(w * 0.2, -hh); g.stroke(); g.restore(); }
/** nến + ngọn lửa nhấp nháy (hàm của X) + quầng vàng (chồng vòng trong suốt — không shadowBlur) */
export function candle(x, y, s, X, i = 0) { g.save(); g.fillStyle = '#F6EFD8'; g.strokeStyle = INK; g.lineWidth = Math.max(2, s * 0.08); g.fillRect(x - s * 0.1, y - s * 0.5, s * 0.2, s * 0.5); g.strokeRect(x - s * 0.1, y - s * 0.5, s * 0.2, s * 0.5);
  const fl = 1 + 0.18 * Math.sin(X * 17 + i * 2.3) + 0.1 * hash(Math.floor(X * 9) + i), fy = y - s * 0.5;
  for (let j = 3; j >= 1; j--) { g.fillStyle = `rgba(255,205,90,${0.045 * (4 - j)})`; g.beginPath(); g.arc(x, fy - s * 0.2, s * 0.55 * j * fl, 0, 7); g.fill(); }
  g.fillStyle = '#FFB830'; g.beginPath(); g.moveTo(x, fy - s * 0.5 * fl); g.quadraticCurveTo(x + s * 0.2, fy - s * 0.12, x, fy); g.quadraticCurveTo(x - s * 0.2, fy - s * 0.12, x, fy - s * 0.5 * fl); g.fill(); g.restore(); }
/** mũ cói + giỏ picnic cho người dẫn vai B ở (x, y) cao h (khớp narrator.js: r = .29h, thân .42h) */
export function tourist(x, y, h, X, o = {}) { const r = 0.29 * h, hy = y - o.bob - 0.42 * h - 0.78 * r;
  narrator(x, y, h, { v: 'B', outfit: 'plain', arms: 'rest', mood: 'smug', mouth: 'rest', look: 1, bob: o.bob });
  g.save(); g.lineWidth = Math.max(3, h * 0.022); g.strokeStyle = INK; g.fillStyle = '#E6CB85';
  g.beginPath(); g.ellipse(x, hy - r * 0.5, r * 1.55, r * 0.24, -0.04, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(x, hy - r * 0.62, r * 0.78, r * 0.62, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = RED; g.fillRect(x - r * 0.76, hy - r * 0.7, r * 1.52, r * 0.16); g.strokeRect(x - r * 0.76, hy - r * 0.7, r * 1.52, r * 0.16);
  const bx = x + 0.248 * h, by = y - o.bob - 0.09 * h; g.strokeStyle = '#6B4A2E'; g.lineWidth = h * 0.014; g.beginPath(); g.arc(bx, by + h * 0.03, h * 0.07, Math.PI, 0); g.stroke();
  g.strokeStyle = INK; g.lineWidth = Math.max(3, h * 0.018); g.fillStyle = '#C48A4A'; g.beginPath(); g.moveTo(bx - h * 0.1, by + h * 0.03); g.lineTo(bx + h * 0.1, by + h * 0.03); g.lineTo(bx + h * 0.08, by + h * 0.13); g.lineTo(bx - h * 0.08, by + h * 0.13); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#D9D4C4'; g.fillRect(bx - h * 0.1, by + h * 0.02, h * 0.2, h * 0.025); g.fillStyle = '#C23A3A'; for (let k = 0; k < 4; k++) g.fillRect(bx - h * 0.1 + k * h * 0.05, by + h * 0.02, h * 0.025, h * 0.025);
  g.restore(); }
function tank(x, y, s, dir) { g.save(); g.translate(x, y); g.scale(dir * s, s); g.lineWidth = 4; g.strokeStyle = INK; g.fillStyle = '#6E7360';
  g.beginPath(); g.roundRect(-46, -26, 92, 26, 8); g.fill(); g.stroke(); g.fillStyle = '#4D5244'; g.beginPath(); g.roundRect(-52, -2, 104, 20, 10); g.fill(); g.stroke();
  g.fillStyle = '#6E7360'; g.beginPath(); g.roundRect(-22, -46, 44, 22, 8); g.fill(); g.stroke(); g.fillRect(20, -40, 52, 8); g.strokeRect(20, -40, 52, 8); g.restore(); }

export default K => { const { g: ctx, IM, M, LT, wd, ST } = K; g = ctx;
  const L1 = 'Because nineteen', L2 = 'The Soviet Union under', L3 = 'In May, Hungary', L4 = 'Word got around', L5 = 'Others climbed', L6 = 'On September thirtieth', L7 = 'Inside East Germany',
    L8 = 'In Leipzig,', L9 = 'The police and army', L10 = 'But nobody gave', L11 = 'Nine days later';
  const T = {
    wall: wd(L1, 'wall'), year: wd(L1, 'year'), bad: wd(L1, 'bad'), n89: wd(L1, 'eightynine'),
    tanks: wd(L2, 'tanks'), neighbors: wd(L2, 'neighbors'), noticed: wd(L2, 'noticed'), stopped: wd(L2, 'stopped'), ideas: wd(L2, 'ideas'),
    may: wd(L3, 'may'), taking: wd(L3, 'taking'), august: wd(L3, 'august'), picnic: wd(L3, 'picnic'), hundreds: wd(L3, 'hundreds'), gate: wd(L3, 'gate'), pan: wd(L3, 'paneuropean'),
    word: wd(L4, 'word'), tens: wd(L4, 'tens'), suddenly: wd(L4, 'suddenly'), vac: wd(L4, 'vacations'),
    others: wd(L5, 'others'), until: wd(L5, 'until'), camping: wd(L5, 'camping'), prague: wd(L5, 'prague'),
    sept: wd(L6, 'thirtieth'), stepped: wd(L6, 'stepped'), tell: wd(L6, 'tell'), cheering: wd(L6, 'cheering'), drowned: wd(L6, 'drowned'),
    leaving: wd(L7, 'leaving'), stopped7: wd(L7, 'stopped'), marching: wd(L7, 'marching'),
    leipzig: wd(L8, 'leipzig'), monday: wd(L8, 'monday'), bigger: wd(L8, 'bigger'), ninth: wd(L8, 'ninth'), seventy: wd(L8, 'seventy'), marched: wd(L8, 'marched'), we: wd(L8, 'we'),
    police: wd(L9, 'police'), force: wd(L9, 'force'), rumors: wd(L9, 'rumors'), hospitals: wd(L9, 'hospitals'), extra: wd(L9, 'extra'), blood: wd(L9, 'blood'),
    nobody: wd(L10, 'nobody'), shoot: wd(L10, 'shoot'), fired: wd(L10, 'fired'),
    nine: wd(L11, 'nine'), later: wd(L11, 'later'), hundred: wd(L11, 'hundredyear'), pushed: wd(L11, 'pushed'), out: wd(L11, 'out'), younger: wd(L11, 'younger'), egon: wd(L11, 'egon'), took: wd(L11, 'took') };

  // ── cảnh 1 · bức tường rỉ nước, mặt lo lắng ──
  const CR = [[300, 0.0], [610, 0.5], [1190, 0.2], [1390, 0.7], [1620, 0.35]];
  const wallLeak = (t, X) => { sky('#B9C7CF', '#DDE3E6'); box(0, 900, W, 180, '#8E8A80', 0);
    const q = X > T.wall ? Math.sin(t * 38) * 3 * (1 - clamp((X - T.wall) / 0.7)) : 0; g.save(); g.translate(q, 0); wall(120, 1800, 900, 480, { seed: 3 });
    CR.forEach(([cx, ph], i) => { const k = ease(clamp((t - 0.3 - ph) / 1.6)), len = 400 * k; g.strokeStyle = INK; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, 420);
      for (let j = 1; j <= 10; j++) { if (j * 40 > len) break; g.lineTo(cx + (hash(i * 11 + j) - 0.5) * 70, 420 + j * 40); } g.stroke();
      if (k > 0.95) { g.strokeStyle = '#5FA8DA'; g.lineWidth = 9; g.setLineDash([26, 18]); g.lineDashOffset = -t * 120; g.beginPath(); g.moveTo(cx, 780); g.lineTo(cx + (hash(i * 11 + 10) - 0.5) * 70, 900); g.stroke(); g.setLineDash([]); } });
    const pud = clamp((t - 2) / 2) * 260; g.fillStyle = 'rgba(95,168,218,0.75)'; g.beginPath(); g.ellipse(960, 930, 120 + pud, 24 + pud * 0.06, 0, 0, 7); g.fill();
    for (const s of [-1, 1]) { disc(960 + s * 90, 640, 28, '#FFF'); disc(960 + s * 90 + 6, 650, 9, INK, 0); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(960 + s * 90 + s * 40, 604); g.lineTo(960 + s * 90 - s * 34, 584); g.stroke(); }
    g.beginPath(); g.moveTo(900, 748); g.quadraticCurveTo(930, 720, 960, 748); g.quadraticCurveTo(990, 776, 1020, 748); g.stroke();
    if (X > T.bad) S.sweat(1090, 600 + ((X - T.bad) * 70) % 60, 1.4);
    g.restore(); S.label('1989', 960, 250, 170, pop(X, T.n89), INK, { stroke: '#FFF' }); };

  // ── bản đồ (Liên Xô ngủ, xe tăng quay đầu, láng giềng ngẩng lên) ──
  const FL = { USSR: 'flag', Poland: 'flag', 'East Germany': 'flag', Czechoslovakia: 'flag', Hungary: 'flag' };
  const mapSoviet = (t, X) => { const V = view(M, { cx: 31, cy: 54, zoom: 1.9 }); drawMap(g, M, V, { fill: { USSR: 'flag', Poland: 'flag' } });
    const c = country(g, M, V, 'USSR', { mood: 'sleepy', arms: 'cross', t: X, legs: false });
    bubble(g, 'ZZZ', c.x + 330, c.y - 190, c.x + 90, c.y - 60, pop(X, T.stopped, 0.4), 64); tank(c.x - 330, c.y + 150, 1.6, -1); };
  const mapTank = (t, X) => { const V = view(M, { cx: 27, cy: 53, zoom: 2.0 }); drawMap(g, M, V, { fill: FL });
    const c = country(g, M, V, 'USSR', { mood: 'sleepy', arms: 'cross', t: X, legs: false }), x0 = c.x - 330, x1 = c.x - 640, u = clamp((t - 0.2) / 1.0), run = clamp((t - 1.5) / 1.8);
    const x = u < 1 ? lerp(x0, x1, ease(u)) : lerp(x1, x0 + 60, easeOut(run)); tank(x, c.y + 150, 1.6, u < 1 ? -1 : 1);
    if (u >= 1 && run < 0.9) S.label('?!', x1 + 80, c.y - 20, 90, pop(X, T.tanks + 0.9), RED, { stroke: '#FFF' }); };
  const mapNeighbours = (t, X) => { const V = view(M, { cx: 20, cy: 49.6, zoom: 3.2 }); drawMap(g, M, V, { fill: FL });
    const up = ease(clamp((X - T.neighbors) / 0.6));
    for (const [n, dx, dy] of [['Poland', 0, 0], ['East Germany', 0, 0], ['Czechoslovakia', 0, 0], ['Hungary', 0, 0]])
      country(g, M, V, n, { mood: up > 0.5 ? 'shock' : 'calm', arms: up > 0.5 ? 'up' : 'down', look: [0, -up * 1.5], hop: up * Math.abs(Math.sin(t * 9)) * 12, t: X, dx, dy, lift: up * 14 });
    if (X > T.noticed) S.label('!', V.pt(ll(M, 19, 52.5))[0], V.pt(ll(M, 19, 52.5))[1] - 190, 140, pop(X, T.noticed), RED, { stroke: '#FFF' }); };

  // ── Hungary cắt hàng rào ──
  const fenceCut = (t, X) => {
    // HÀNG RÀO rõ nghĩa (người dùng 10-29: "mấy cái que này là gì?"). Nhịp 1 (tới "taking"): bản đồ, đường dây thép gai dọc biên giới Áo–Hung
    // + nhãn "BORDER FENCE". Nhịp 2: cận mặt đất — hàng rào cột xám + 3 dây thép gai ngang khung, lính biên phòng Hungary cầm kìm cắt cán
    // đỏ cắt từng nhịp từ phải sang trái, "SNIP!" mỗi nhát; nhịp đã cắt: dây đứt rủ, cột nằm. Cờ Áo phía sau rào, cờ Hung phía trước.
    if (X < T.taking + 0.15) { const V = view(M, { cx: 16.8, cy: 47.7, zoom: 5.2 }); drawMap(g, M, V, { fill: { Hungary: 'flag', Austria: 'flag' } });
      country(g, M, V, 'Austria', { mood: 'calm', arms: 'none', t: X, legs: false, dx: -150, dy: 20 }); country(g, M, V, 'Hungary', { mood: 'calm', arms: 'none', t: X, legs: false, dx: 110 });
      const pts = [[16.95, 48.1], [16.55, 47.85], [16.45, 47.5], [16.6, 47.2], [16.45, 46.9]].map(q => V.pt(ll(M, ...q)));
      g.save(); g.strokeStyle = '#3A3D42'; g.lineWidth = 9; g.lineJoin = 'round'; g.beginPath(); pts.forEach((p, k) => k ? g.lineTo(...p) : g.moveTo(...p)); g.stroke();
      g.lineWidth = 4; for (let k = 0; k < pts.length - 1; k++) for (let q = 0.25; q < 1; q += 0.25) { const bx = lerp(pts[k][0], pts[k + 1][0], q), by = lerp(pts[k][1], pts[k + 1][1], q); g.beginPath(); g.moveTo(bx - 12, by - 12); g.lineTo(bx + 12, by + 12); g.moveTo(bx + 12, by - 12); g.lineTo(bx - 12, by + 12); g.stroke(); }
      g.restore(); S.label('BORDER FENCE', pts[0][0] + 170, pts[0][1] - 60, 52, pop(X, T.may + 0.3, 0.3), '#FFF', { stroke: INK });
      S.label('MAY 1989', 520, 150, 100, pop(X, T.may), INK, { stroke: '#FFF' }); return; }
    const sky = g.createLinearGradient(0, 0, 0, 700); sky.addColorStop(0, '#8EC5EA'); sky.addColorStop(1, '#DDEFF8'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.fillStyle = '#8DBF6A'; g.fillRect(0, 640, W, 120); g.fillStyle = '#76AE55'; g.fillRect(0, 760, W, H - 760); g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke();
    const flag = (x, y, cols) => { g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - 300); g.stroke(); cols.forEach((c, k) => { g.fillStyle = c; g.fillRect(x, y - 300 + k * 40, 180, 40); }); g.lineWidth = 4; g.strokeRect(x, y - 300, 180, 120); g.restore(); };
    flag(260, 640, ['#C8102E', '#F4F1E8', '#C8102E']); S.label('AUSTRIA', 350, 320, 40, 1, '#FFF', { stroke: INK });
    const N = 8, sp = 250, base = 800, ph = 300, cut = clamp((X - T.taking - 0.15) / 1.8), cx = lerp(W + 40, 700, cut);   // điểm cắt chạy phải → trái
    for (let k = 0; k <= N; k++) { const x = 30 + k * sp, gone = x > cx;
      g.save(); g.strokeStyle = INK; g.lineWidth = 5;
      if (!gone) { g.fillStyle = '#8E9196'; g.fillRect(x - 12, base - ph, 24, ph); g.strokeRect(x - 12, base - ph, 24, ph);
        if (k < N) { const x2 = Math.min(x + sp, cx); for (const dy of [70, 150, 230]) { g.strokeStyle = '#3A3D42'; g.lineWidth = 5; g.beginPath(); g.moveTo(x, base - dy); g.lineTo(x2, base - dy); g.stroke();
          g.lineWidth = 4; for (let bx = x + 40; bx < x2 - 10; bx += 60) { g.beginPath(); g.moveTo(bx - 10, base - dy - 10); g.lineTo(bx + 10, base - dy + 10); g.moveTo(bx + 10, base - dy - 10); g.lineTo(bx - 10, base - dy + 10); g.stroke(); } }
          if (x2 < x + sp) for (const dy of [70, 150, 230]) { g.strokeStyle = '#3A3D42'; g.lineWidth = 5; g.beginPath(); g.moveTo(x2, base - dy); g.quadraticCurveTo(x2 + 20, base - dy + 50, x2 + 5, base - dy + 90); g.stroke(); } } }   // dây đứt rủ
      else { g.fillStyle = '#8E9196'; g.save(); g.translate(x, base + 40); g.rotate(-0.06 + 0.1 * hash(k)); g.fillRect(-ph / 2, -12, ph, 24); g.strokeRect(-ph / 2, -12, ph, 24); g.restore(); }   // cột nằm
      g.restore(); }
    // lính biên phòng Hungary (folk áo lính, mũ) đứng trước rào, cầm kìm ở điểm cắt
    const sx = Math.min(1700, cx + 330); C.folk(sx, 1060, 400, { coat: 'soldier', wear: 'cap', eyes: 'happy', mouth: 'grin', skin: SK });
    { const op = cut < 1 ? 0.1 + 0.16 * Math.abs(Math.sin(X * 8)) : 0.1;   // kìm ở lại trong tay khi đã cắt xong g.save(); g.translate(cx + 10, base - 110); g.rotate(0.12); g.strokeStyle = INK; g.lineWidth = 6;
      for (const s2 of [-1, 1]) { g.save(); g.rotate(s2 * op); g.fillStyle = '#9AA0A6'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-70, s2 * 12); g.lineTo(-58, s2 * 28); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = '#D32F2F'; g.beginPath(); g.roundRect(10, s2 * 8 - 12, 200, 24, 12); g.fill(); g.stroke(); g.restore(); }
      g.fillStyle = '#5A5F66'; g.beginPath(); g.arc(0, 0, 12, 0, 7); g.fill(); g.stroke(); g.restore();
      if (cut < 1 && (X - T.taking) % 0.8 < 0.35) S.label('SNIP!', cx + 60, base - 360, 70, 1, '#FFE04A', { stroke: INK }); }
    S.label('HUNGARY', 1700, 1000, 44, 1, '#FFF', { stroke: INK });
    S.label('MAY 1989', 520, 150, 100, pop(X, T.may), INK, { stroke: '#FFF' }); };

  // ── Pan-European Picnic ──
  const picnic = (t, X) => { sky('#9ED3F2', '#D8EFC4', 640); box(0, 600, W, 480, '#7FBF63', 0); g.fillStyle = '#FFE9A0'; g.beginPath(); g.arc(1560, 170, 90, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
    g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(80, 130); g.quadraticCurveTo(960, 300, 1840, 130); g.stroke();                       // dây cờ
    for (let i = 0; i < 17; i++) { const u = (i + 0.5) / 17, x = lerp(80, 1840, u), y = 130 + 170 * Math.sin(Math.PI * u) * 0.98 * 0.52 + 10, col = ['#C8102E', '#F4F1E8', '#2E7D32'][i % 3]; g.fillStyle = col; g.beginPath(); g.moveTo(x - 24, y); g.lineTo(x + 24, y); g.lineTo(x, y + 60 + 4 * Math.sin(X * 4 + i)); g.closePath(); g.fill(); g.stroke(); }
    for (const [cx, col] of [[480, '#D23C3C'], [1060, '#2F6FB6'], [1520, '#D23C3C']]) { g.fillStyle = col; g.beginPath(); g.moveTo(cx - 190, 860); g.lineTo(cx + 190, 860); g.lineTo(cx + 250, 960); g.lineTo(cx - 250, 960); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 5; g.stroke();
      g.fillStyle = 'rgba(255,255,255,0.7)'; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) if ((r + c) % 2 === 0) g.fillRect(cx - 190 - r * 15 + c * 63 + r * 7, 860 + r * 25, 50, 25);
      g.fillStyle = '#C48A4A'; g.beginPath(); g.roundRect(cx - 40, 800, 90, 60, 8); g.fill(); g.stroke(); g.fillStyle = '#E8D6A0'; g.beginPath(); g.ellipse(cx + 30, 830, 24, 12, 0, 0, 7); g.fill(); }
    [[300, 'happy'], [720, 'happy'], [1280, 'happy'], [1700, 'happy']].forEach(([x, e], i) => C.folk(x, 860 + (i % 2) * 24, 300, { eyes: e, coat: ['plain', 'worker', 'plain', 'austro'][i], arm: Math.sin(t * 5 + i) > 0.6 ? 'up' : null, look: i % 2 ? 1 : -1 }));
    S.label('PAN-EUROPEAN PICNIC', 960, 520, 96, pop(X, T.pan, 0.35), INK, { stroke: '#FFF' }); };
  const gateWalk = (t, X) => { sky('#9ED3F2', '#D8EFC4', 640); box(0, 600, W, 480, '#7FBF63', 0); const gx = 960;
    g.strokeStyle = INK; g.lineWidth = 6; for (let x = 20; x < W; x += 60) { if (Math.abs(x - gx) < 100) continue; box(x - 6, 520, 12, 360, '#B9A98C', 4); } g.lineWidth = 4;
    for (const y of [560, 640, 720, 800]) { g.beginPath(); g.moveTo(0, y); g.lineTo(gx - 100, y); g.moveTo(gx + 100, y); g.lineTo(W, y); g.stroke(); }
    box(gx - 118, 480, 22, 410, '#8A6A46'); box(gx + 96, 480, 22, 410, '#8A6A46'); const sw = ease(clamp((X - T.gate + 1.2) / 0.8)); g.save(); g.translate(gx + 96, 540); g.rotate(-1.35 * sw); g.fillStyle = '#B9A98C'; g.fillRect(-190, 0, 190, 200); g.strokeRect(-190, 0, 190, 200); g.restore();
    const fy = 1090; for (let r = 0; r < 2; r++) {}                                                                                          // (nền cỏ trước cổng)
    g.save(); g.beginPath(); g.rect(0, 0, W, H); g.clip();
    const n = 10; for (let i = n - 1; i >= 0; i--) { const x = 520 + t * 165 - i * 190; if (x < -140 || x > W + 140) continue; const bob = Math.abs(Math.sin(t * 7 + i)) * 10, h = 300;
      if (i === 2) { tourist(x, 900 - bob * 0.0, h * 0.95, X, { bob }); } else { C.folk(x, 900 - bob, h, { eyes: 'happy', coat: ['plain', 'worker', 'driver'][i % 3], wear: i % 3 === 1 ? 'cap' : null, look: 1 }); suitcase(x + h * 0.15, 898 - bob, h, ['#8A5A3A', '#4F6A8A', '#7A3A3A'][i % 3]); } }
    g.restore();
    const fx = 1700, fl = 12 * Math.sin(X * 3); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(fx, 240); g.lineTo(fx, 600); g.stroke(); for (let i = 0; i < 3; i++) { g.fillStyle = ['#C8102E', '#F4F1E8', '#C8102E'][i]; g.fillRect(fx + 4, 244 + i * 34, 150 + fl, 34); } g.strokeRect(fx + 4, 244, 150 + fl, 102);
    S.label('OPEN GATE', 960, 330, 90, pop(X, T.gate - 0.3), INK, { stroke: '#FFF' }); };

  // ── "VISIT HUNGARY!" ──
  const poster = (cx, cy, s, X, bounce = 0) => { g.save(); g.translate(cx, cy); const z = s * (1 + 0.05 * bounce * Math.abs(Math.sin(X * 8))); g.scale(z, z); g.fillStyle = '#F7E9B8'; g.fillRect(-300, -380, 600, 760); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(-300, -380, 600, 760);
    g.fillStyle = '#7FC4E8'; g.fillRect(-270, -240, 540, 340); g.strokeRect(-270, -240, 540, 340); g.fillStyle = '#FFD84A'; g.beginPath(); g.arc(150, -140, 52, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#4FA6D8'; g.fillRect(-270, -40, 540, 140);
    g.strokeStyle = '#FFF'; g.lineWidth = 6; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-240 + i * 80, -10 + i * 24); g.quadraticCurveTo(-200 + i * 80, -30 + i * 24, -160 + i * 80, -10 + i * 24); g.stroke(); }
    g.fillStyle = INK; g.font = '900 78px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('VISIT', 0, -285); g.fillStyle = RED; g.fillText('HUNGARY!', 0, 190); g.fillStyle = INK; g.font = '800 42px Archivo, sans-serif'; g.fillText('LAKE BALATON', 0, 260); g.restore(); };
  const rumor = (t, X) => { sky('#F2E6C8', '#E1D3AE'); box(0, 860, W, 220, '#B9A98C', 0); poster(1040, 470, 1.0, X, 0); const k = back(pop(X, T.word, 0.5)); if (k < 1) { g.fillStyle = '#F2E6C8'; g.globalAlpha = 1 - k; g.fillRect(500, 60, 1100, 800); g.globalAlpha = 1; }
    for (const [x, i] of [[300, 0], [520, 1], [1560, 2], [1740, 3]]) { C.folk(x, 960, 340, { eyes: 'dot', coat: ['worker', 'plain', 'driver', 'plain'][i], look: i < 2 ? 1 : -1 }); suitcase(x + 52, 958, 340, ['#8A5A3A', '#4F6A8A'][i % 2]); }
    bubble(g, '...', 380, 480, 330, 650, pop(X, T.word + 0.1, 0.4), 70); bubble(g, '!', 1620, 480, 1580, 650, pop(X, T.word + 0.5, 0.4), 70); };
  const jam = (t, X) => { sky('#F2E6C8', '#E1D3AE'); box(0, 760, W, 320, '#B9A98C', 0); poster(960, 380, 0.74, X, X > T.vac ? 1 : 0);
    const fr = lerp(0.12, 1, ease(clamp((X - T.tens) / 2.4))); for (let rw = 2; rw >= 0; rw--) for (let i = 0; i < 13; i++) { const k = rw * 40 + i; if (hash(k + 5) > fr) continue; const x = 70 + i * 140 + (rw % 2) * 70 + (hash(k) - 0.5) * 40, y = 900 + rw * 80, h = 300 - rw * 18, j = Math.max(0, Math.sin(t * 6 + k)) * 14;
      C.folk(x, y - j, h, { eyes: 'happy', coat: ['worker', 'plain', 'driver'][k % 3], wear: k % 4 === 0 ? 'cap' : null, look: 0 }); suitcase(x + h * 0.14, y - j - 2, h, ['#8A5A3A', '#4F6A8A', '#7A3A3A'][k % 3]); } };

  // ── Praha: vườn đại sứ quán ──
  const embassy = (X, o = {}) => { sky('#CFE0EA', '#EAD9B5', 420); box(0, 760, W, 320, '#79B05C', 0); box(360, 100, 1200, 660, '#E9D9AE'); box(330, 80, 1260, 40, '#B7433A');
    for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) { if (r === 0 && (c === 2 || c === 3)) continue; box(420 + c * 180, 190 + r * 220, 90, 130, '#6FA7CF', 5); }
    box(1130, 540, 290, 40, '#C9BFA3'); box(1140, 580, 270, 24, '#B7AC90'); for (let i = 0; i < 9; i++) box(1138 + i * 33, 500, 10, 44, '#C9BFA3', 3); box(1160, 320, 230, 220, '#8EC0E6', 5); g.beginPath(); g.moveTo(1275, 320); g.lineTo(1275, 540); g.stroke();
    g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(960, 105); g.lineTo(960, 10); g.stroke(); for (let i = 0; i < 3; i++) { g.fillStyle = ['#151515', '#C8102E', '#F2C500'][i]; g.fillRect(964, 14 + i * 18, 120 + 6 * Math.sin(X * 3), 18); } };
  const tent = (x, y, w, col) => { g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x, y - w * 0.55); g.lineTo(x + w / 2, y); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#2B2B2E'; g.beginPath(); g.moveTo(x - w * 0.1, y); g.lineTo(x, y - w * 0.28); g.lineTo(x + w * 0.1, y); g.closePath(); g.fill(); };
  const climb = (t, X) => { sky('#CFE0EA', '#EAD9B5', 420); g.save(); g.translate(430, 0); embassy(X); g.restore(); box(0, 760, 860, 320, '#8F8F95', 0); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 760); g.lineTo(860, 760); g.stroke();
    for (let y = 520; y <= 860; y += 85) { g.beginPath(); g.moveTo(830, y); g.lineTo(900, y); g.stroke(); } for (const x of [830, 860, 890]) box(x - 6, 470, 12, 410, '#2B2B2E', 3); g.fillStyle = '#2B2B2E'; for (const x of [830, 860, 890]) { g.beginPath(); g.moveTo(x - 9, 470); g.lineTo(x, 440); g.lineTo(x + 9, 470); g.fill(); }
    for (let i = 0; i < 6; i++) { const u = (t * 0.3 + hash(i + 40)) % 1, gy = 960, f = 250; let x, y;
      if (u < 0.3) { x = lerp(120 + i * 60, 790, u / 0.3); y = gy; } else if (u < 0.7) { const v = (u - 0.3) / 0.4; x = lerp(790, 940, v); y = gy - Math.sin(Math.PI * v) * 330 - (v > 0.5 ? 0 : 0); } else { const v = (u - 0.7) / 0.3; x = lerp(940, 1500 + (i % 3) * 120, v); y = gy; }
      C.folk(x, y, f, { eyes: 'dot', coat: ['worker', 'plain', 'driver'][i % 3], arm: u > 0.3 && u < 0.7 ? 'up' : null, look: 1, wear: i % 2 ? 'cap' : null }); }
    S.label('PRAGUE', 960, 1000, 90, pop(X, T.prague), '#FFF', { stroke: INK }); };
  const camp = (t, X) => { embassy(X); const n = Math.floor(lerp(4, 16, ease(clamp((X - T.until) / 2.8))));
    for (const [x, y, w, c] of [[300, 810, 230, '#D6822E'], [720, 800, 210, '#4F8FC7'], [1180, 805, 240, '#8E5FA0'], [1600, 800, 210, '#C94B4B']]) tent(x, y, w, c);
    for (let rw = 1; rw >= 0; rw--) for (let i = 0; i < n; i++) { const k = i + rw * 31, x = 80 + (i + rw * 0.5 + 0.5) * (W - 160) / Math.max(n, 8) * (n < 8 ? 1 : 1), y = 1040 + rw * 55; if (x > W - 40) continue; C.folk(x, y, 230, { eyes: 'dot', coat: ['worker', 'plain', 'driver', 'german'][k % 4], wear: k % 3 === 0 ? 'cap' : k % 5 === 0 ? 'scarf' : null, look: (k % 3) - 1 }); } };
  const balcony = (t, X, stage) => { embassy(X); const mx = 1275, out = stage >= 1 ? ease(clamp((X - T.stepped) / 0.5)) : 0;
    if (stage >= 1) { g.save(); g.globalAlpha = out; C.folk(mx, 545, 270, { coat: 'suit', eyes: 'dot', mouth: stage >= 2 && Math.sin(X * 14) > 0 ? 'o' : 'flat', arm: stage >= 2 ? 'up' : null, look: -1 }); g.restore(); }
    box(1130, 480, 290, 28, '#C9BFA3'); for (let i = 0; i < 9; i++) box(1138 + i * 33, 508, 10, 32, '#C9BFA3', 3);
    const cheer = stage >= 2 ? clamp((X - T.cheering) / 0.4) : 0; for (let rw = 1; rw >= 0; rw--) for (let i = 0; i < 11; i++) { const k = i + rw * 17, x = 100 + i * 170 + rw * 80, j = cheer * Math.max(0, Math.sin(t * 9 + k * 1.3)) * 30;
      C.folk(x, 1030 + rw * 40 - j, 250, { eyes: cheer ? 'happy' : 'dot', coat: ['worker', 'plain', 'driver'][k % 3], arm: cheer && k % 2 ? 'up' : null, look: -0.4, wear: k % 4 === 0 ? 'cap' : null }); }
    if (stage >= 1 && X < T.tell) { S.label('30 SEPT 1989', 520, 260, 80, pop(X, T.sept), INK, { stroke: '#FFF' }); }
    if (stage === 2) { const bx = 780; bubble(g, 'YOUR DEPARTURE...', bx, 330, 1240, 420, pop(X, T.tell, 0.4), 44); if (X > T.cheering) { S.label('YAAAY!', 720, 390, 190, pop(X, T.cheering, 0.25), RED, { stroke: '#FFF', rot: -0.07 }); } } };
  const stopLeaving = (t, X) => { sky('#D9DCE3', '#B8BDC8'); g.fillStyle = '#A5A9B5'; for (let i = 0; i < 9; i++) { const x = i * 230 - 30, h = 380 + hash(i + 90) * 120; g.fillRect(x, 860 - h, 220, h); g.fillStyle = '#C5CAD6'; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) g.fillRect(x + 25 + c * 62, 860 - h + 30 + r * 70, 36, 44); g.fillStyle = '#A5A9B5'; } box(0, 860, W, 220, '#8F8F95', 0); const st = clamp((X - T.stopped7) / 0.5), mar = X > T.marching;
    for (let i = 0; i < 7; i++) { const x = 220 + i * 250, bob = mar ? Math.abs(Math.sin(t * 8 + i)) * 14 : Math.sin(t * 4 + i) * 4, h = 330;
      C.folk(x + (mar ? Math.sin(t * 3) * 6 : 0), 960 - bob, h, { eyes: st < 1 ? 'bored' : 'angry', coat: ['worker', 'plain', 'driver', 'german'][i % 4], arm: mar ? 'up' : null, look: mar ? 1 : -1, wear: i % 3 === 0 ? 'cap' : null });
      if (st < 1 && !mar) suitcase(x + h * 0.15, 960 - bob * 0.2, h, ['#8A5A3A', '#4F6A8A', '#7A3A3A'][i % 3]); else suitcase(x - h * 0.3, 962, h, ['#8A5A3A', '#4F6A8A', '#7A3A3A'][i % 3], 1.5 + hash(i) * 0.3);
    }
    S.label('NO MORE LEAVING', 960, 230, 100, pop(X, T.leaving, 0.3), INK, { stroke: '#FFF' }); };

  // ── Leipzig ──
  const city = X => { sky('#0B1030', '#2A2F5A', 760); g.fillStyle = '#1A1B30'; for (let i = 0; i < 12; i++) { const x = i * 170 - 20, h = 260 + hash(i + 70) * 280; g.fillRect(x, 780 - h, 160, h); g.fillStyle = '#F2C95A'; for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (hash(i * 13 + r * 3 + c) > 0.55) g.fillRect(x + 20 + c * 46, 780 - h + 30 + r * 62, 26, 36); g.fillStyle = '#1A1B30'; }
    g.fillStyle = '#15162A'; g.fillRect(0, 780, W, 300); g.fillStyle = '#23244A'; g.fillRect(0, 780, W, 10); };
  const march = (X, t0, o) => { const t = X - t0, rows = o.rows, N = o.n; for (let rw = rows - 1; rw >= 0; rw--) { const hh = 300 - rw * 36, y = 1010 - rw * 85, cnt = Math.floor(N * (1 - rw * 0.1));
      for (let i = 0; i < cnt; i++) { const k = i * 7 + rw * 131, x = 40 + (i + 0.5 + (hash(k) - 0.5) * 0.4 + rw * 0.4) * (W - 80) / cnt, bob = o.walk ? Math.abs(Math.sin(t * 6 + k)) * 12 : 0;
        if (o.narr && rw === 0 && i === o.narr) { tourNarr(x, y - bob, hh * 0.95, X, bob); continue; }
        C.folk(x, y - bob, hh, { eyes: 'dot', coat: ['worker', 'driver', 'german', 'plain'][k % 4], wear: ['cap', 'scarf', null, 'cap', null][k % 5], look: 0.5 }); candle(x + hh * 0.145, y - bob - hh * 0.17, hh * 0.24, X, k); } } };
  const tourNarr = (x, y, h, X, bob) => { narrator(x, y, h, { v: 'B', outfit: 'plain', arms: 'rest', mood: 'smug', mouth: 'rest', look: 0.5, bob: 0 }); candle(x + 0.248 * h, y - 0.085 * h, h * 0.26, X, 99); };
  const leip1 = (t, X) => { city(X); march(X, 0, { rows: 2, n: Math.floor(lerp(4, 9, ease(clamp((X - T.monday) / 2.4)))), walk: false }); S.label('MONDAY', 960, 190, 150, pop(X, T.monday, 0.3), '#FFF', { stroke: '#0B1030' }); };
  const leip2 = (t, X) => { city(X); march(X, 0, { rows: 3, n: Math.floor(lerp(8, 12, ease(clamp((X - T.bigger) / 2)))), walk: true }); S.label('9 OCT 1989', 960, 190, 130, pop(X, T.ninth, 0.3), '#FFF', { stroke: '#0B1030' }); };
  const leip3 = (t, X) => { city(X); march(X, 0, { rows: 3, n: 13, walk: true, narr: 9 });
    S.label('WIR SIND DAS VOLK', 960, 190, 120, pop(X, T.we, 0.35), '#FFF', { stroke: '#0B1030' }); S.label('70,000', 1500, 380, 80, pop(X, T.seventy, 0.3), '#F2C95A', { stroke: '#0B1030' }); };
  // ── hàng cảnh sát (NGHIÊM) ──
  const lineUp = (t, X, calm) => { sky('#10131E', '#262B3E', 800); g.fillStyle = '#181B29'; for (let i = 0; i < 12; i++) { const bh = 220 + hash(i + 120) * 260; g.fillRect(i * 170 - 20, 720 - bh, 160, bh); } g.fillStyle = '#1A1E2C'; g.fillRect(0, 720, W, 360); g.fillStyle = '#2B3040'; g.fillRect(1280, 380, 640, 360); g.fillStyle = '#0E1018'; g.fillRect(1320, 440, 560, 220); g.fillStyle = '#0E1018'; g.beginPath(); g.arc(1360, 740, 36, 0, 7); g.arc(1780, 740, 36, 0, 7); g.fill();
    const lit = calm ? 0.28 : 0.1; g.fillStyle = `rgba(255,210,120,${lit})`; g.fillRect(0, 0, W, H);
    [P.vopo, P.guard, P.vopo, P.guard, P.vopo, P.guard, P.vopo].forEach((f, i) => f(150 + i * 270, 900, 380, { eyes: calm && i % 2 ? 'bored' : 'dot', mouth: 'flat', sweat: !calm && i === 2, look: -1 }));
    for (let i = 0; i < 16; i++) { const x = 40 + i * 120 + (hash(i) - 0.5) * 30; g.fillStyle = '#05060A'; g.beginPath(); g.arc(x, 1060, 46, Math.PI, 0); g.fill(); candle(x, 1000, 70, X, i); }
    if (!calm) dim(0.22); else dim(0.0); };
  const hospital = (t, X) => { sky('#0C1220', '#1E2740', 700); g.fillStyle = '#2A3248'; g.fillRect(260, 120, 1000, 800); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(260, 120, 1000, 800);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { g.fillStyle = hash(r * 7 + c) > 0.35 ? '#F2D58A' : '#1C2236'; g.fillRect(310 + c * 160, 180 + r * 160, 100, 110); }
    g.fillStyle = '#F4F1E8'; g.fillRect(660, 700, 200, 220); g.strokeRect(660, 700, 200, 220); g.fillStyle = RED; g.fillRect(730, 760, 60, 130); g.fillRect(695, 795, 130, 60);
    g.fillStyle = '#E7EAF0'; g.fillRect(1320, 380, 520, 540); g.strokeRect(1320, 380, 520, 540); g.fillStyle = '#C9CFDB'; for (const y of [560, 740]) g.fillRect(1320, y, 520, 14);
    const m = Math.floor(lerp(3, 21, ease(clamp((X - T.extra) / 1.6)))); for (let i = 0; i < 21; i++) { if (i >= m) break; const sh = Math.floor(i / 7), x = 1370 + (i % 7) * 66, y = 552 + sh * 180; g.fillStyle = '#B3262C'; g.beginPath(); g.roundRect(x, y - 92, 48, 92, 10); g.fill(); g.stroke(); g.fillStyle = '#F4F1E8'; g.fillRect(x + 12, y - 82, 24, 14); }
    C.folk(1100, 1000, 340, { coat: 'plain', eyes: 'dot', mouth: 'flat', armband: RED, look: 1 }); dim(0.15); };

  // ── văn phòng Honecker → Krenz ──
  const office = X => { box(0, 0, W, 760, '#D7CBB0', 0); box(0, 760, W, 320, '#8A6A46', 0); box(660, 200, 600, 300, '#C9B98F'); g.fillStyle = '#1A1A1A'; g.fillRect(700, 240, 520, 73); g.fillStyle = '#C8102E'; g.fillRect(700, 313, 520, 73); g.fillStyle = '#F2C500'; g.fillRect(700, 386, 520, 74); g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(700, 240, 520, 220); disc(960, 350, 52, '#C8102E', 0); g.strokeStyle = '#E8C04A'; g.lineWidth = 14; g.beginPath(); g.arc(960, 350, 48, 0, 7); g.stroke(); g.fillStyle = '#B3262C'; g.fillRect(0, 700, W, 60); g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(-10, 700, W + 20, 60);
    box(1440, 200, 220, 360, '#8EC0E6'); g.beginPath(); g.moveTo(1550, 200); g.lineTo(1550, 560); g.moveTo(1440, 380); g.lineTo(1660, 380); g.stroke(); };
  const desk = () => { box(500, 880, 920, 220, '#6B4A2E'); box(480, 850, 960, 36, '#8A6A46'); };
  const chair = (x, y, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); box(-130, -440, 260, 300, '#2F3A2E'); box(-120, -150, 240, 70, '#2F3A2E', 4); box(-30, -80, 60, 90, '#4A4A50', 4); g.restore(); };
  const forecast = (X, k) => { if (k <= 0) return; g.save(); g.translate(960, 350); g.scale(back(k), back(k)); g.fillStyle = '#FBF8EE'; g.fillRect(-250, -110, 500, 220); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(-250, -110, 500, 220); g.fillStyle = INK; g.font = '900 72px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('100 YEARS', 0, 25); g.restore(); };
  const hon1 = (t, X) => { office(X); forecast(X, pop(X, T.hundred, 0.35)); chair(960, 900); P.honecker(960, 900, 520, { eyes: 'dot', mouth: 'grin', look: 0 }); desk(); S.label('9 DAYS LATER', 960, 140, 90, pop(X, T.nine, 0.3), INK, { stroke: '#FFF' }); };
  const hon2 = (t, X) => { office(X); const u = ease(clamp((X - T.pushed) / 0.9)), kx = lerp(1900, 960, ease(clamp((X - T.younger + 0.6) / 1.1)));
    chair(960 - u * 1600, 900, -u * 0.6); if (u < 1) P.honecker(960 - u * 1600, 900 - Math.sin(u * 3.14) * 40, 520, { eyes: 'shock', mouth: 'o', sweat: true, look: -1 }); desk();
    if (X > T.younger - 0.6) { chair(960, 900); P.krenz(kx, 900, 520, { eyes: 'happy', look: -0.5 }); desk(); }
    if (X > T.egon) S.nameTag('EGON KRENZ', pop(X, T.egon, 0.3), 96, 960); };

  return [
    [ST(L1), wallLeak],
    [ST(L2), mapSoviet],
    [T.tanks - 0.4, mapTank],
    [T.neighbors - 0.5, mapNeighbours],
    [ST(L3), fenceCut],
    [T.august - 0.3, picnic],
    [T.hundreds - 0.2, gateWalk],
    [ST(L4), rumor],
    [T.tens - 0.2, jam],
    [ST(L5), climb],
    [T.until - 0.3, camp],
    [ST(L6), (t, X) => balcony(t, X, 0)],
    [T.stepped - 0.4, (t, X) => balcony(t, X, 1)],
    [T.cheering - 1.1, (t, X) => balcony(t, X, 2)],
    [ST(L7), stopLeaving],
    [ST(L8), leip1],
    [T.bigger + 0.4, leip2],
    [T.seventy - 0.2, leip3],
    [ST(L9), (t, X) => lineUp(t, X, false)],
    [T.rumors - 0.3, hospital],
    [ST(L10), (t, X) => lineUp(t, X, true)],
    [ST(L11), hon1],
    [T.pushed - 0.4, hon2],
  ]; };
