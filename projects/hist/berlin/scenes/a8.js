// a8 — Bornholmer Street (483–567 s). Đỉnh cảm xúc của tập: đêm, đám đông lớn dần, Jäger gọi điện không ai trả lời, cổng mở.
// Người dẫn nhập vai #6 (lính gác cạnh Jäger, outfit soldier) và #7 (đứng trên Tường cầm búa + chai champagne).
// File này cũng xuất `helpers(K)` — bộ vẽ chung của a8/a9/a10 (cầu đêm, chốt, đám đông, đồng hồ, cổng…), a9/a10 import lại.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, wall, SK } from './common.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;
const BONE = '#E8E4DA', WINT = ['worker', 'tsarcoat', 'german', 'driver'], WEARS = ['scarf', null, 'cap', null, 'bowler', 'scarf', null];
const GDR = ['#151515', '#C2343A', '#F3C61B'];

export const helpers = K => { const { g } = K;
  /** chữ nghiêm: trắng ngà, hiện dần, không nảy */
  const sober = (txt, x, y, size, k, o = {}) => { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k) * (o.a ?? 1); g.font = `${o.w ?? 700} ${size}px Archivo, sans-serif`;
    g.textAlign = o.align ?? 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = o.col ?? BONE; g.fillText(txt, x, y); g.restore(); };
  const fade = (X, t0, d = 0.5) => clamp((X - t0) / d);

  /** cầu Bornholmer ban đêm: trời, nhà xa, dầm thép, mặt đường, đèn đường. o: sky [trên, dưới], city, steel, truss, lamps, lit */
  function bornBG(o = {}) { const [c0, c1] = o.sky ?? ['#0B1222', '#26324F'], city = o.city ?? '#141B2E';
    const sg = g.createLinearGradient(0, 0, 0, 760); sg.addColorStop(0, c0); sg.addColorStop(1, c1); g.fillStyle = sg; g.fillRect(0, 0, W, 760);
    if (o.lit !== false) { g.fillStyle = 'rgba(255,255,255,0.55)'; for (let i = 0; i < 40; i++) g.fillRect(hash(i) * W, 30 + hash(i + 50) * 190, 3, 3); }
    for (let i = 0; i < 17; i++) { const bh = 100 + hash(i + 9) * 230, bw = 110 + hash(i + 3) * 40; g.fillStyle = city; g.fillRect(i * 118 - 20, 760 - bh, bw, bh);
      if (o.lit !== false) { g.fillStyle = 'rgba(244,200,90,0.55)'; for (let j = 0; j < 6; j++) if (hash(i * 11 + j) > 0.55) g.fillRect(i * 118 - 8 + (j % 3) * 34, 760 - bh + 20 + Math.floor(j / 3) * 44, 14, 20); } }
    if (o.truss !== false) { g.strokeStyle = o.steel ?? '#34425C'; g.lineWidth = 16; g.beginPath(); g.moveTo(0, 250); g.lineTo(W, 250); g.moveTo(0, 500); g.lineTo(W, 500); g.stroke();
      g.lineWidth = 10; g.beginPath(); for (let x = 0; x <= W + 240; x += 240) { g.moveTo(x, 250); g.lineTo(x, 500); g.moveTo(x, 250); g.lineTo(x + 240, 500); } g.stroke();
      g.lineWidth = 22; g.beginPath(); for (let x = 120; x <= W; x += 480) { g.moveTo(x, 500); g.lineTo(x, 760); } g.stroke(); }
    g.fillStyle = '#2A2D36'; g.fillRect(0, 760, W, H - 760); g.fillStyle = '#434858'; g.fillRect(0, 752, W, 16);
    g.fillStyle = 'rgba(230,200,110,0.35)'; for (let x = 20; x < W; x += 180) g.fillRect(x, 842, 90, 8);
    if (o.lamps !== false) for (const x of [320, 1020, 1720]) { g.fillStyle = '#1B2230'; g.fillRect(x - 6, 340, 12, 420); g.beginPath(); g.ellipse(x + 30, 338, 46, 14, 0, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,214,120,0.05)'; for (const r of [200, 130, 70]) { g.beginPath(); g.arc(x + 30, 346, r, 0, 7); g.fill(); }
      g.fillStyle = 'rgba(255,224,150,0.06)'; g.beginPath(); g.moveTo(x + 30, 350); g.lineTo(x - 150, 760); g.lineTo(x + 210, 760); g.closePath(); g.fill(); } }

  /** chòi gác: thân, mái, cửa sổ sáng, cửa. (x, yĐế) = góc trái đáy */
  function booth(x, y, w, h, lit = true) { g.save(); g.lineWidth = 6; g.strokeStyle = INK; g.fillStyle = '#566069'; g.fillRect(x, y - h, w, h); g.strokeRect(x, y - h, w, h);
    g.fillStyle = '#3B434B'; g.fillRect(x - 20, y - h - 24, w + 40, 30); g.strokeRect(x - 20, y - h - 24, w + 40, 30);
    g.fillStyle = lit ? '#F2C85B' : '#222B38'; g.fillRect(x + w * 0.08, y - h * 0.82, w * 0.5, h * 0.36); g.strokeRect(x + w * 0.08, y - h * 0.82, w * 0.5, h * 0.36);
    g.fillStyle = '#3A2F28'; g.fillRect(x + w * 0.7, y - h * 0.7, w * 0.2, h * 0.7); g.strokeRect(x + w * 0.7, y - h * 0.7, w * 0.2, h * 0.7); g.restore(); }

  /** thanh chắn sọc đỏ-trắng: gốc (px, py) bên phải, dài L chĩa sang trái; k 0 = ngang (đóng) → 1 = dựng đứng (mở) */
  function barrier(px, py, L, k) { const a = ease(k) * 1.3, ex = px - Math.cos(a) * L, ey = py - Math.sin(a) * L; g.save(); g.lineCap = 'butt';
    g.strokeStyle = INK; g.lineWidth = 32; g.beginPath(); g.moveTo(px, py); g.lineTo(ex, ey); g.stroke();
    for (let i = 0; i < 8; i++) { g.strokeStyle = i % 2 ? '#F4F1E8' : RED; g.lineWidth = 22; g.beginPath(); g.moveTo(lerp(px, ex, i / 8), lerp(py, ey, i / 8)); g.lineTo(lerp(px, ex, (i + 1) / 8), lerp(py, ey, (i + 1) / 8)); g.stroke(); }
    g.fillStyle = '#3C4452'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(px - 20, py - 40, 56, 130); g.strokeRect(px - 20, py - 40, 56, 130); g.restore(); }

  /** đám đông áo mùa đông lớn dần: `num` = số người đã có mặt (0–66); người mới nảy ra. o: x0 x1 y h eyes mouth arms cheer look t */
  function mob(X, num, o = {}) { const N = 36, y = o.y ?? 1020, h = o.h ?? 340, x0 = o.x0 ?? 60, x1 = o.x1 ?? 1200, t = o.t ?? X;
    for (let r = 2; r >= 0; r--) for (let s = 0; s < N / 3; s++) { const i = s * 3 + r, k = clamp((num - i) / 1.5); if (k <= 0) continue;
      const x = x1 - (s + 0.15 + 0.7 * hash(i * 2 + 5)) / (N / 3) * (x1 - x0), hh = h * (1 - r * 0.14) * (0.94 + 0.12 * hash(i + 3)) * back(k), jump = o.cheer ? Math.abs(Math.sin(t * 7 + i * 1.3)) * hh * 0.07 : 0;
      C.folk(x, y - r * h * 0.27 - jump, hh, { coat: WINT[i % 4], wear: WEARS[i % 7], eyes: o.eyes ?? 'dot', mouth: o.mouth, look: o.look ?? 0.8,
        arm: o.arms && hash(i + 7) > 0.4 ? 'up' : null, flag: o.cheer && r === 0 && hash(i + 9) > 0.8 ? GDR : null, wave: Math.sin(t * 6 + i) }); } }

  /** dòng người chảy sang phải (vô hạn, vòng quanh ngoài khung) — T0 = lúc bắt đầu */
  function flow(X, T0, o = {}) { const n = o.n ?? 33, sp = o.speed ?? 300, span = 2500;
    for (let r = 2; r >= 0; r--) for (let i = r; i < n; i += 3) { const x = (hash(i * 5 + 1) * span + sp * (X - T0) * (1 - r * 0.12)) % span - 300, h = (360 - r * 50) * (0.95 + 0.1 * hash(i + 3)),
        y = 1035 - r * 95 - hash(i) * 20 - Math.abs(Math.sin(X * 6 + i)) * h * 0.04;
      C.folk(x, y, h, { coat: WINT[i % 4], wear: WEARS[i % 7], eyes: 'happy', mouth: hash(i + 4) > 0.5 ? 'grin' : null, arm: hash(i + 6) > 0.55 ? 'up' : null,
        flag: r === 0 && hash(i + 9) > 0.75 ? GDR : null, wave: Math.sin(X * 6 + i) }); } }

  /** pháo giấy rơi */
  function confetti(X, T0, n = 26) { const cols = ['#C2343A', '#F3C61B', '#FFFFFF', '#4FA3E6', '#7BC47F'];
    for (let i = 0; i < n; i++) { const y = (hash(i + 30) * H + 130 * (X - T0)) % (H + 100) - 50; g.save(); g.translate(hash(i) * W, y); g.rotate(X * 3 + i); g.fillStyle = cols[i % 5]; g.fillRect(-6, -10, 12, 20); g.restore(); } }

  /** đồng hồ treo tường (kim giờ-phút) */
  function clock(x, y, r, hh, mm) { g.save(); g.lineWidth = r * 0.07; g.strokeStyle = INK; g.fillStyle = '#F4F1E8'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
    g.lineWidth = r * 0.04; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.2832; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82); g.lineTo(x + Math.cos(a) * r * 0.93, y + Math.sin(a) * r * 0.93); g.stroke(); }
    const ah = ((hh % 12) + mm / 60) / 12 * 6.2832 - 1.5708, am = mm / 60 * 6.2832 - 1.5708; g.lineCap = 'round';
    g.lineWidth = r * 0.09; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ah) * r * 0.5, y + Math.sin(ah) * r * 0.5); g.stroke();
    g.lineWidth = r * 0.06; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(am) * r * 0.75, y + Math.sin(am) * r * 0.75); g.stroke(); g.restore(); }

  /** cổng sắt (một tấm song) — (x, y) = mép dưới bên trái, ang = góc đổ về phía người xem (0 = đứng, ~1.5 = nằm bẹp trên đất, nhìn xiên) */
  function gate(x, y, w, h, ang) { g.save(); g.translate(x, y); g.scale(1, Math.cos(ang) - 0.28 * Math.sin(ang)); g.lineJoin = 'round'; g.fillStyle = '#5B6270'; g.strokeStyle = INK; g.lineWidth = 6;
    g.fillRect(0, -h, w, 18); g.strokeRect(0, -h, w, 18); g.fillRect(0, -26, w, 26); g.strokeRect(0, -26, w, 26);
    for (let i = 0; i <= 8; i++) { const bx = i * (w - 14) / 8; g.fillRect(bx, -h, 14, h); g.strokeRect(bx, -h, 14, h); } g.restore(); }

  return { sober, fade, bornBG, booth, barrier, mob, flow, confetti, clock, gate };
};

export default K => { const { g, IM, wd, ST } = K; const S_ = S;
  const { sober, fade, bornBG, booth, barrier, mob, flow, confetti, clock } = helpers(K);
  const L = { heard: 'But East Berliners had', grabbed: 'They grabbed their coats', biggest: 'The biggest crowd', jhe: 'Jäger had heard', called: 'He called his superiors', best: 'Their best idea',
    didnt: "It didn't help", armed: "Jäger's guards were armed", eleven: 'So at around eleven', poured: 'Thousands of people poured', across: 'Across the city', early: 'By the early hours' };
  const T = { imm: wd(L.heard, 'immediately'), hundred: wd(L.grabbed, 'hundred'), thousands: wd(L.grabbed, 'thousands'), born: wd(L.biggest, 'bornholmer'), harald: wd(L.biggest, 'harald'),
    what: wd(L.jhe, 'what'), loudest: wd(L.best, 'loudest'), quietly: wd(L.best, 'quietly'), mark: wd(L.best, 'mark'), without: wd(L.best, 'without'), gate: wd(L.didnt, 'gate'),
    enormous: wd(L.armed, 'enormous'), nobody: wd(L.armed, 'nobody'), order: wd(L.armed, 'order'), eleven: wd(L.eleven, 'eleven'), thirty: wd(L.eleven, 'thirty'), told: wd(L.eleven, 'told'), open: wd(L.eleven, 'open'),
    checked: wd(L.poured, 'checked'), one: wd(L.across, 'one'), flowers: wd(L.across, 'flowers'), champagne: wd(L.across, 'champagne'),
    top: wd(L.early, 'top'), itself: wd(L.early, 'itself'), guards: wd(L.early, 'guards'), year: wd(L.early, 'year'), started: wd(L.early, 'started'), chipping: wd(L.early, 'chipping'), hammers: wd(L.early, 'hammers') };

  // ── phòng chốt (nội thất) — Jäger trái, lính gác (người dẫn #6) phải, điện thoại bàn giữa ──
  const JX = 800, JY = 960, JH = 560, GX = 1290, GH = 520;
  function post(X, o = {}) { g.fillStyle = '#6E7C6A'; g.fillRect(0, 0, W, H); g.fillStyle = '#56644F'; g.fillRect(0, 560, W, 520); g.fillStyle = '#7C8A76'; g.fillRect(0, 540, W, 20);
    g.fillStyle = '#8A8F8A'; g.fillRect(0, 70, W, 22);
    const wx = 120, wy = 150, ww = 700, wh = 420; g.save(); g.beginPath(); g.rect(wx, wy, ww, wh); g.clip(); g.fillStyle = '#16203A'; g.fillRect(wx, wy, ww, wh);
    g.fillStyle = 'rgba(255,214,120,0.14)'; g.beginPath(); g.arc(wx + 140, wy + 60, 200, 0, 7); g.fill();
    const n = o.heads ?? 14; g.fillStyle = '#0A101E'; for (let i = 0; i < n; i++) { const row = i >= 9 ? 1 : 0, cx = wx + 40 + ((i % 9) + 0.5 * row) * 78, cy = wy + wh - 70 - row * 62; g.beginPath(); g.arc(cx, cy, 30, 0, 7); g.fill(); g.beginPath(); g.ellipse(cx, cy + 62, 44, 40, 0, Math.PI, 0); g.fill(); }
    g.restore(); g.strokeStyle = INK; g.lineWidth = 12; g.strokeRect(wx, wy, ww, wh); g.beginPath(); g.moveTo(wx + ww / 2, wy); g.lineTo(wx + ww / 2, wy + wh); g.moveTo(wx, wy + wh * 0.4); g.lineTo(wx + ww, wy + wh * 0.4); g.stroke();
    if (o.clock) clock(1560, 270, 125, o.clock[0], o.clock[1]); }
  function desk(X, o = {}) { g.fillStyle = '#6B4F34'; g.fillRect(0, 830, W, 250); g.fillStyle = '#8A6A46'; g.fillRect(0, 830, W, 26); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 830); g.lineTo(W, 830); g.stroke();
    const px = 1040, py = 800; g.fillStyle = '#23252B'; g.beginPath(); g.roundRect(px - 80, py - 6, 170, 46, 10); g.fill(); g.stroke(); g.fillStyle = '#B8BAB4'; g.beginPath(); g.arc(px + 20, py + 16, 18, 0, 7); g.fill(); g.stroke();
    if (!o.off) { g.fillStyle = '#23252B'; g.beginPath(); g.roundRect(px - 76, py - 32, 160, 28, 14); g.fill(); g.stroke(); }
    else { const hx = JX - 124, hy = 585; g.strokeStyle = '#23252B'; g.lineWidth = 7; g.beginPath(); g.moveTo(hx, hy + 80); g.bezierCurveTo(hx - 40, 760, px - 160, 900, px - 70, py + 12); g.stroke();       // dây xoắn
      g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#23252B'; g.save(); g.translate(hx, hy); g.rotate(0.12); g.beginPath(); g.roundRect(-18, -88, 36, 176, 16); g.fill(); g.stroke(); g.restore();
      g.strokeStyle = INK; g.lineWidth = 22; g.beginPath(); g.moveTo(JX - 80, 722); g.lineTo(hx + 4, hy + 34); g.stroke(); g.strokeStyle = '#5D6470'; g.lineWidth = 15; g.beginPath(); g.moveTo(JX - 80, 722); g.lineTo(hx + 4, hy + 34); g.stroke();
      g.fillStyle = SK; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(hx + 6, hy + 30, 17, 0, 7); g.fill(); g.stroke(); } }
  const jaeger = (o = {}) => P.jaeger(JX, JY, JH, o);
  const guardCameo = (X, o = {}) => { narrator(GX, JY, GH, { outfit: 'soldier', mood: o.mood ?? 'shock', look: -1, arms: 'rest', bob: o.bob ?? 0 });
    if (o.sweat !== false) { const hy = JY - 0.42 * GH - 0.78 * 0.29 * GH, r = 0.29 * GH; S.sweat(GX + r + 8, hy - r * 0.35 + 6 * Math.sin(X * 3), 1.5); S.sweat(GX - r - 6, hy - r * 0.1 + 6 * Math.sin(X * 3 + 2), 1.1); } };
  const ringMarks = (X, x, y) => { for (let i = 0; i < 2; i++) for (const s of [-1, 1]) { g.save(); g.strokeStyle = '#F3C61B'; g.lineWidth = 6; g.lineCap = 'round'; g.globalAlpha = 0.5 + 0.5 * Math.sin(X * 18 + i); g.beginPath(); g.arc(x, y, 50 + i * 26, s > 0 ? -0.7 : Math.PI - 0.7 + 0.2, s > 0 ? 0.7 : Math.PI + 0.7 - 0.2); g.stroke(); g.restore(); } };

  /** mốc đóng dấu hộ chiếu: dấu đỏ viền kép, hạ xuống ở T0 */
  function passport(X, T0, o = {}) { const cx = o.x ?? 760, cy = 580; g.save(); g.translate(cx, cy); g.rotate(-0.04);
    g.fillStyle = '#2F5A3E'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-400, -290, 800, 580); g.strokeRect(-400, -290, 800, 580);
    g.fillStyle = '#F3EBD3'; g.fillRect(-380, -270, 370, 540); g.fillRect(10, -270, 370, 540); g.lineWidth = 4; g.strokeRect(-380, -270, 370, 540); g.strokeRect(10, -270, 370, 540);
    g.fillStyle = '#C9C2AC'; g.fillRect(-330, -220, 160, 200); g.strokeRect(-330, -220, 160, 200); g.fillStyle = '#8F8A78'; g.beginPath(); g.arc(-250, -150, 40, 0, 7); g.fill(); g.beginPath(); g.ellipse(-250, -40, 70, 50, 0, Math.PI, 0); g.fill();
    g.fillStyle = '#A5A08C'; for (let i = 0; i < 7; i++) g.fillRect(-330, 10 + i * 34, 260 + 60 * hash(i), 12); for (let i = 0; i < 5; i++) g.fillRect(40, -220 + i * 34, 220 + 70 * hash(i + 9), 12);
    const k = clamp((X - T0) / 0.3); if (k > 0) { const s = lerp(2.4, 1, ease(k)); g.save(); g.translate(190, 150); g.rotate(-0.18); g.scale(s, s); g.globalAlpha = clamp(k / 0.25); g.strokeStyle = RED; g.fillStyle = RED;
      g.lineWidth = 8; g.strokeRect(-150, -52, 300, 104); g.lineWidth = 3; g.strokeRect(-140, -42, 280, 84); g.font = '900 40px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('NO RETURN', 0, 4); g.restore(); }
    g.restore(); }

  // ── cảnh đứng-trên-Tường: người dẫn #7 ──
  const WB = 980, WH = 400, TOPY = WB - WH - 34 + 14;                         // chân người đứng trên đỉnh ống tường
  const NX = 960, NH = 400;
  function onWall(X, o = {}) { const lively = o.lively !== false, tt = o.t ?? X;
    const sg = g.createLinearGradient(0, 0, 0, 760); sg.addColorStop(0, '#2B2A4A'); sg.addColorStop(0.7, '#B26A5C'); sg.addColorStop(1, '#F0B87A'); g.fillStyle = sg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#4A4458'; for (let i = 0; i < 14; i++) { const bh = 90 + hash(i + 40) * 160; g.fillRect(i * 150 - 30, 700 - bh, 130, bh + 400); }
    wall(-60, 2000, WB, WH, { west: true, seed: 3 }); g.fillStyle = '#4B4F58'; g.fillRect(0, WB, W, H - WB);
    // người đứng trên tường (trái, phải) + khối bê tông để đục
    for (const [x, h, k] of [[330, 360, 1], [610, 340, 2], [1560, 370, 3], [1790, 330, 4]]) { const jump = lively ? Math.max(0, Math.sin(tt * 6 + k * 1.7)) * 26 : 0;
      C.folk(x, TOPY - jump, h, { coat: WINT[k % 4], wear: WEARS[k], eyes: o.eyes ?? 'happy', mouth: o.mouth === undefined ? 'grin' : o.mouth, arm: lively ? 'up' : null, flag: lively && k === 3 ? GDR : null, wave: Math.sin(tt * 6 + k) }); }
    g.fillStyle = '#BDBBB4'; g.strokeStyle = INK; g.lineWidth = 6; const bx = NX + 0.26 * NH, by = TOPY - 0.27 * NH;
    g.beginPath(); g.moveTo(bx, TOPY); g.lineTo(bx + 6, by + 30); g.lineTo(bx + 40, by); g.lineTo(bx + 0.2 * NH, by + 22); g.lineTo(bx + 0.22 * NH, TOPY); g.closePath(); g.fill(); g.stroke();
    // người dẫn: tay phải giơ búa (vung theo nhịp), tay trái cầm chai
    const sw = o.swing === false ? 0 : Math.sin(tt * 10), ph = 0.4 + 1.1 * sw;
    narrator(NX, TOPY, NH, { outfit: 'plain', mood: o.mood ?? 'smug', arms: 'wave', t: o.swing === false ? 0 : tt, look: 1 });
    const hx = NX + 0.34 * NH, hy = TOPY - 0.705 * NH + 0.12 * 0.41 * NH * (o.swing === false ? 0 : sw), Lh = 0.38 * NH;
    g.save(); g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 14; g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx + Math.cos(ph) * Lh, hy + Math.sin(ph) * Lh); g.stroke();
    g.strokeStyle = '#9A6B3A'; g.lineWidth = 8; g.stroke(); g.save(); g.translate(hx + Math.cos(ph) * Lh, hy + Math.sin(ph) * Lh); g.rotate(ph); g.fillStyle = '#8D929B'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-20, -34, 40, 68); g.strokeRect(-20, -34, 40, 68); g.restore();
    const bx0 = NX - 0.248 * NH, by0 = TOPY - 0.09 * NH; g.fillStyle = '#2E5A3A'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(bx0 - 16, by0 - 100, 32, 120, 10); g.fill(); g.stroke(); g.beginPath(); g.roundRect(bx0 - 8, by0 - 140, 16, 44, 5); g.fill(); g.stroke();
    g.fillStyle = '#E8C04A'; g.fillRect(bx0 - 16, by0 - 70, 32, 26); g.restore();
    return { hx, hy, ph, sw }; }
  const chips = (X, T0, hx, hy) => { for (let i = 0; i < 14; i++) { const q = ((X - T0) * 3.3 + i / 14) % 1, a = -1.9 + 1.1 * hash(i + 2), sp = 140 + 160 * hash(i + 7);
    g.fillStyle = i % 3 ? '#BDBBB4' : '#8D929B'; g.beginPath(); g.arc(hx + 50 + Math.cos(a) * sp * q * 0.7, TOPY - 0.27 * NH + Math.sin(a) * sp * q + 380 * q * q, 7 + 5 * hash(i + 4), 0, 7); g.fill(); } };

  // ── Tây Berlin: ôm, hoa, champagne ──
  function westNight(X) { bornBG({ truss: false, lamps: false, sky: ['#14112A', '#3A2A52'], city: '#1C1830' });
    g.strokeStyle = '#1A1A22'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 300); g.quadraticCurveTo(480, 400, 960, 310); g.quadraticCurveTo(1440, 400, 1920, 300); g.stroke();
    for (let i = 0; i < 22; i++) { const x = i * 88 + 20, u = x / W, y = u < 0.5 ? lerp(300, 355, Math.sin(u * 2 * Math.PI)) + 0 : lerp(310, 360, Math.sin((u - 0.5) * 2 * Math.PI)); g.fillStyle = ['#F3C61B', '#E86A6A', '#6AC0F2', '#8CE08A'][i % 4]; g.beginPath(); g.arc(x, y + 8, 11, 0, 7); g.fill(); } }
  const bouquet = (x, y, s) => { g.save(); g.translate(x, y); g.strokeStyle = '#2E7A3A'; g.lineWidth = 7 * s; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 70 * s); g.stroke(); for (let i = 0; i < 6; i++) { g.fillStyle = ['#E8445A', '#F3C61B', '#FFFFFF', '#E88AC8', '#F08A3A', '#E8445A'][i]; g.strokeStyle = INK; g.lineWidth = 3 * s;
      g.beginPath(); g.arc((i - 2.5) * 20 * s, -Math.abs(i - 2.5) * 6 * s + (i % 2) * 8 * s, 17 * s, 0, 7); g.fill(); g.stroke(); } g.restore(); };

  return [
    // 1 · đêm, vài người khoác áo bước ra phố, chữ "IMMEDIATELY" · không người dẫn · tiếng: gió đêm, bước chân, dây khoá áo
    [ST(L.heard), (t, X) => { bornBG({ truss: false });
      for (let i = 0; i < 5; i++) { const x = 250 + i * 330 + 70 * t, h = 380 - (i % 2) * 40; C.folk(x, 1000 - (i % 2) * 70 - Math.abs(Math.sin(X * 6 + i)) * 10, h, { coat: WINT[i % 4], wear: WEARS[i], eyes: 'dot', look: 1, arm: i === 2 ? 'up' : null }); }
      S.label('“IMMEDIATELY”', 960, 190, 120, clamp((X - T.imm) / 0.25), '#FFF', { stroke: '#111' }); }],
    // 2 · đám đông lớn dần: vài trăm → hàng nghìn · không người dẫn · tiếng: tiếng chân tăng dần, râm ran
    [ST(L.grabbed), (t, X) => { bornBG(); booth(1500, 800, 300, 280); barrier(1290, 800, 400, 0);
      const num = X < T.hundred ? lerp(2, 5, ease(t / 3)) : X < T.thousands ? lerp(8, 18, ease((X - T.hundred) / 1.5)) : lerp(22, 36, ease((X - T.thousands) / 1.4));
      mob(X, num, { x0: 60, x1: 1230 });
      S.label('A FEW HUNDRED', 960, 180, 100, fade(X, T.hundred - 0.1, 0.3) * (X < T.thousands ? 1 : 0), '#FFF', { stroke: '#111' });
      S.label('THOUSANDS', 960, 180, 120, fade(X, T.thousands - 0.1, 0.3), '#FFF', { stroke: '#111' }); }],
    // 3 · cả cây cầu đông nghẹt; thẻ BORNHOLMER STREET, rồi thẻ tên Jäger đứng cạnh chòi · không người dẫn · tiếng: ồn đám đông, tiếng còi xa
    [ST(L.biggest), (t, X) => { bornBG(); booth(1520, 800, 300, 280); barrier(1290, 800, 400, 0); mob(X, 36, { x0: 40, x1: 1230, cheer: true });
      P.jaeger(1560, 960, 420, { eyes: 'dot', mouth: 'flat', look: -1 });
      if (X < T.harald - 0.1) S.nameTag('BORNHOLMER STREET', clamp((X - T.born) / 0.25), 70, 140);
      else S.nameTag('HARALD JÄGER · STASI LT. COLONEL', clamp((X - T.harald) / 0.25), 70, 140); }],
    // 4 · phòng chốt: Jäger + lính gác (người dẫn #6) nhìn nhau, bong bóng "WHAT NOW?" · người dẫn: lính gác cạnh Jäger · tiếng: ồn ngoài cửa sổ, đồng hồ tích tắc
    [ST(L.jhe), (t, X) => { post(X, { heads: 14 }); jaeger({ eyes: 'dot', mouth: X < T.what ? 'flat' : 'o', look: 0.7, sweat: X > T.what }); guardCameo(X); desk(X);
      S.nameTag('HARALD JÄGER · STASI LT. COLONEL', 1, 70, 120);
      bubble(g, 'WHAT NOW?', 1090, 330, 900, 470, clamp((X - T.what) / 0.3), 54); }],
    // 5 · gag điện thoại: quay số, đầu dây chỉ "…" / tút tút · người dẫn: lính gác · tiếng: quay số, tút tút
    [ST(L.called), (t, X) => { post(X, { heads: 20 }); jaeger({ eyes: 'dot', mouth: 'o', look: -0.4, sweat: true }); guardCameo(X); desk(X, { off: true }); ringMarks(X, 1125, 760);
      const seq = ['…', 'TUUT… TUUT…', '…', '(no answer)'], u = Math.floor(t / 0.6); bubble(g, seq[u % 4], 1040, 330, 820, 500, clamp((t - u * 0.6) / 0.2), 54); }],
    // 6a · người ồn nhất bị cho ra: kẻ hét tay giơ, nhãn "THE LOUDEST" · không người dẫn · tiếng: tiếng hét, cửa mở
    [ST(L.best), (t, X) => { post(X, { heads: 20 }); C.folk(760, 1010, 700, { coat: 'worker', wear: 'cap', eyes: 'angry', mouth: 'o', arm: 'up' }); C.folk(1260, 1010, 600, { coat: 'tsarcoat', eyes: 'angry', mouth: 'o', arm: 'up', wear: 'scarf' });
      S.label('THE LOUDEST', 960, 200, 120, clamp((X - T.loudest) / 0.25), '#FFF', { stroke: '#111' }); }],
    // 6b · hộ chiếu + con dấu "NO RETURN"; người đi qua vui vẻ, không biết gì · không người dẫn · tiếng: thud con dấu (đúng "mark"), giấy
    [T.quietly - 0.1, (t, X) => { g.fillStyle = '#3D4A3A'; g.fillRect(0, 0, W, H); g.fillStyle = '#2E3A2D'; g.fillRect(0, 880, W, 200); passport(X, T.mark, { x: 700 });
            const k = clamp((X - T.without) / 0.3); if (k > 0) { g.save(); g.translate((1 - easeOut(k)) * 500, 0); C.folk(1590, 1030, 640, { coat: 'german', wear: 'scarf', eyes: 'happy', mouth: 'grin', arm: 'up' }); g.restore(); bubble(g, 'BYE-BYE!', 1500, 320, 1560, 480, clamp((X - T.without - 0.2) / 0.3), 54); } }],
    // 7 · đám đông hô "TOR AUF!" / "OPEN THE GATE!" · không người dẫn · tiếng: đám đông hô nhịp
    [ST(L.didnt), (t, X) => { bornBG(); booth(1520, 800, 300, 280); barrier(1290, 800, 400, 0);
      mob(X, 36, { x0: 40, x1: 1800, y: 1040, h: 400, cheer: true, eyes: 'angry', mouth: 'o', arms: true });
      const p = 1 + 0.05 * Math.sin(X * 14); g.save(); g.translate(960, 0); g.scale(p, p); S.label('TOR AUF!', 0, 190, 140, clamp(t / 0.25), '#FFF', { stroke: '#111', free: true }); g.restore();
      S.label('“OPEN THE GATE!”', 960, 310, 76, clamp((X - T.gate + 0.5) / 0.3), '#F3C61B', { stroke: '#111' }); }],
    // 8 · phòng chốt, đám đông ngoài cửa sổ dày hơn; "NO ORDER" khi nói "real order" · người dẫn: lính gác (mồ hôi) · tiếng: ồn lớn, điện thoại im
    [ST(L.armed), (t, X) => { post(X, { heads: X < T.nobody ? 18 : 22 }); jaeger({ eyes: 'dot', mouth: 'flat', look: 0.7, sweat: X > T.enormous }); guardCameo(X, { bob: 0 }); desk(X);
      if (X > T.nobody) bubble(g, '…', 1040, 340, 1050, 770, clamp((X - T.nobody) / 0.3), 64);
      S.label('NO ORDER', 960, 200, 110, clamp((X - T.order + 0.3) / 0.3), '#FFF', { stroke: '#111' }); }],
    // 9 · 23:30 — đồng hồ, Jäger gật · người dẫn: lính gác · tiếng: tích tắc dồn, nhịp tim
    [ST(L.eleven), (t, X) => { post(X, { heads: 24, clock: [X < T.thirty - 0.1 ? 11 : 11, X < T.thirty - 0.1 ? 0 : 30] }); const nod = X > T.told ? Math.sin((X - T.told) * 9) * 0.03 : 0;
      P.jaeger(JX, JY, JH, { eyes: 'dot', mouth: 'flat', look: 0.7, sweat: true, tilt: nod }); guardCameo(X); desk(X);
      S.label('11:30 PM', 960, 220, 90, clamp((X - T.eleven) / 0.25), '#FFF', { stroke: '#111' }); }],
    // 10 · thanh chắn dựng lên đúng "open" · không người dẫn · tiếng: còi / tiếng thanh chắn, đám đông gầm
    [T.open - 0.3, (t, X) => { bornBG(); booth(1520, 800, 300, 280); const k = clamp((X - T.open) / 0.7); barrier(1290, 800, 400, k);
      mob(X, 36, { x0: 40, x1: 1230, cheer: k > 0.2, eyes: k > 0.2 ? 'happy' : 'dot' }); }],
    // 11 · khoảnh khắc lớn nhất: dòng người tràn qua cầu, pháo giấy, máy quay lùi rộng · không người dẫn · tiếng: nhạc dâng, cheer, bước chân
    [ST(L.poured), (t, X) => { const z = lerp(1.16, 1.0, ease(t / 5)); g.save(); g.translate(960, 760); g.scale(z, z); g.translate(-960, -760);
      bornBG(); booth(1520, 800, 300, 280); barrier(1290, 800, 400, 1); flow(X, ST(L.poured)); P.guard(1420, 930, 330, { eyes: X > T.checked ? 'shock' : 'dot', arm: 'up', mouth: 'o' }); g.restore();
      confetti(X, ST(L.poured)); }],
    // 12 · các chốt khác đầu hàng từng cái một; Tây Berlin: ôm, hoa, champagne nổ · không người dẫn · tiếng: cheer, nút chai nổ đúng "champagne"
    [ST(L.across), (t, X) => { westNight(X);
      for (let i = 0; i < 5; i++) { const k = clamp((X - (ST(L.across) + 0.6 + i * 0.55)) / 0.5); const px = 360 + i * 300; g.save(); g.translate(0, 0); barrierMini(px, 215, k); g.restore(); }
      S.label('ONE BY ONE', 960, 340, 70, clamp((X - T.one) / 0.25), '#FFF', { stroke: '#111' });
      const ha = clamp((X - ST(L.across) - 0.4) / 0.4);                                                   // ôm
      if (ha > 0) { g.save(); g.translate(0, (1 - easeOut(ha)) * 200); C.folk(310, 1010, 500, { coat: 'german', wear: 'scarf', eyes: 'happy', mouth: 'grin', arm: 'up', tilt: 0.04 }); C.folk(560, 1010, 500, { coat: 'austro', eyes: 'happy', mouth: 'grin', arm: 'up', tilt: -0.04 }); g.restore(); }
      const fa = clamp((X - T.flowers + 0.2) / 0.4);
      if (fa > 0) { g.save(); g.translate(0, (1 - easeOut(fa)) * 200); C.folk(900, 1010, 540, { coat: 'gown', eyes: 'happy', mouth: 'grin' }); C.folk(1130, 1010, 540, { coat: 'tsarcoat', wear: 'cap', eyes: 'happy', mouth: 'grin' }); bouquet(1015, 810, 1.5); g.restore(); }
      const ca = clamp((X - T.champagne + 0.6) / 0.4);
      if (ca > 0) { g.save(); g.translate(0, (1 - easeOut(ca)) * 200); const cx = 1560, ch = 560, bw = 0.42 * ch, bh = 0.58 * ch; C.folk(cx, 1010, ch, { coat: 'worker', eyes: 'happy', mouth: 'grin', arm: 'up', wear: 'bowler' });
        const tx = cx + 0.66 * bw, ty = 1010 - 1.32 * bh; g.save(); g.translate(tx, ty); g.rotate(0.15); g.fillStyle = '#2E5A3A'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(-20, -120, 40, 130, 10); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-10, -170, 20, 56, 6); g.fill(); g.stroke(); g.restore();
        const u = X - T.champagne; if (u > 0 && u < 1.6) { for (let i = 0; i < 16; i++) { const q = clamp(u * 1.4 - i * 0.02), a = -1.75 + 0.9 * (hash(i + 20) - 0.5), sp = 380 + 260 * hash(i + 3); g.fillStyle = i % 4 ? '#FFFFFF' : '#F3E3A0';
            g.beginPath(); g.arc(tx + 22 + Math.cos(a) * sp * q, ty - 170 + Math.sin(a) * sp * q + 520 * q * q, 9 + 5 * hash(i + 6), 0, 7); g.fill(); }
          const q2 = clamp(u * 1.2); g.fillStyle = '#C9A24A'; g.beginPath(); g.arc(tx + 30 + 120 * q2, ty - 190 - 520 * q2 + 560 * q2 * q2, 12, 0, 7); g.fill(); S.flash(tx + 20, ty - 180, clamp(u / 0.4), 120); }
        g.restore(); } }],
    // 13a · ẢNH TƯ LIỆU: người trên Tường ở Brandenburg · tiếng: cheer xa, búa gõ
    [ST(L.early), (t, X) => { S.photoBg(IM.p_brandenburg89, t, { desat: 0.1, fy: 0.55, push: 0.012, credit: 'Brandenburg Gate, December 1989 · public domain' }); }],
    // 13b · vẽ lại: người đứng trên Tường, người dẫn #7 cầm búa + champagne · tiếng: cheer, champagne
    [T.itself + 0.15, (t, X) => { onWall(X); }],
    // 13c · "guards had been shooting people": khử màu, dừng vui một nhịp (không đùa) · tiếng: nền im, gió
    [T.guards - 0.5, (t, X) => { onWall(X, { lively: false, swing: false, eyes: 'dot', mouth: 'flat', mood: 'sad' }); S.desat(0.85 * easeOut(t / 0.5), 0.35 * easeOut(t / 0.5)); }],
    // 13d · màu trở lại: người dẫn đục Tường, mảnh bê tông bay · tiếng: búa gõ theo nhịp, cheer
    [T.started - 0.3, (t, X) => { const r = onWall(X); chips(X, T.started - 0.3, r.hx, r.hy); S.desat(0.85 * (1 - easeOut(t / 0.4)), 0.35 * (1 - easeOut(t / 0.4))); }],
  ];

  function barrierMini(x, y, k) { const a = ease(k) * 1.3; g.save(); g.strokeStyle = INK; g.lineWidth = 24; g.lineCap = 'butt'; g.beginPath(); g.moveTo(x + 60, y); g.lineTo(x + 60 - Math.cos(a) * 130, y - Math.sin(a) * 130); g.stroke();
    g.strokeStyle = k > 0.5 ? '#7BC47F' : RED; g.lineWidth = 14; g.stroke(); g.fillStyle = '#3C4452'; g.fillRect(x + 48, y - 20, 28, 80); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(x + 48, y - 20, 28, 80); g.restore(); }
};
