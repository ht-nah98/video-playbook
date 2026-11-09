// hồi a7 — Five weeks + Dominoes + biển số (BRIEF-SCENES.md §a7). Lời: "Here's the strange part…" → "That's pure coincidence…".
// Mốc = LT / wd / ST (không gõ giây). Tất định: mọi hình là hàm của X; ngẫu nhiên → hash(i).
// Người dẫn: góc phải (lipHost) ở cảnh bản đồ / giải thích; nhập vai #6 người hầu (bữa trưa Potsdam), #7 bộ trưởng Serbia (tối hậu thư),
// #8 trong đám đông Berlin (tung mũ → mặt méo "not over by Christmas").
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, bubble, cutout, ll, INK } from '../../_kit/mapkit.js';
import { AH, RS, DE, RU, FR, UK, IT, BE } from './common.js';

const { W, H, RED, clamp, lerp, hash, ease, easeOut, back } = S;
const kk = (X, a, d = 0.3) => clamp((X - a) / d);
const F = (w, s) => `${w} ${s}px Archivo, sans-serif`;

export default K => {
  const { g, IM, M, LT, wd, ST } = K;

  // ───────── đồ vẽ riêng của hồi ─────────
  const text = (txt, x, y, size, col = INK, o = {}) => { g.save(); g.font = F(o.w ?? 900, size); g.textAlign = o.align ?? 'center'; g.textBaseline = 'middle';
    if (o.stroke) { g.strokeStyle = o.stroke; g.lineWidth = size * 0.14; g.lineJoin = 'round'; g.strokeText(txt, x, y); } g.fillStyle = col; g.fillText(txt, x, y); g.restore(); };
  const tick = (x, y, s, col = '#2E9E4F') => { g.save(); g.strokeStyle = col; g.lineWidth = 9 * s; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 18 * s, y); g.lineTo(x - 4 * s, y + 15 * s); g.lineTo(x + 22 * s, y - 18 * s); g.stroke(); g.restore(); };
  const cross = (x, y, s, col = RED) => { g.save(); g.strokeStyle = col; g.lineWidth = 10 * s; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - 18 * s, y - 18 * s); g.lineTo(x + 18 * s, y + 18 * s); g.moveTo(x + 18 * s, y - 18 * s); g.lineTo(x - 18 * s, y + 18 * s); g.stroke(); g.restore(); };
  /** kính râm meme — rơi từ trên xuống (drop 0..1) */
  const shades = (x, y, r, drop = 1) => { if (drop <= 0) return; const yy = y - (1 - easeOut(drop)) * r * 4; g.save(); g.fillStyle = '#0E0E10'; g.strokeStyle = INK; g.lineWidth = r * 0.05;
    for (const s of [-1, 1]) { g.beginPath(); g.roundRect(x + s * r * 0.36 - r * 0.3, yy - r * 0.14, r * 0.6, r * 0.3, r * 0.1); g.fill(); }
    g.fillRect(x - r * 0.1, yy - r * 0.1, r * 0.2, r * 0.06); g.fillStyle = 'rgba(255,255,255,0.55)';
    for (const s of [-1, 1]) g.fillRect(x + s * r * 0.36 - r * 0.2, yy - r * 0.08, r * 0.12, r * 0.05); g.restore(); };
  const crown = (x, hy, r) => { g.save(); g.fillStyle = '#E2B53B'; g.strokeStyle = INK; g.lineWidth = r * 0.05; const y0 = hy - r * 0.78, w = r * 0.8;
    g.beginPath(); g.moveTo(x - w, y0); g.lineTo(x - w, y0 - r * 0.45); g.lineTo(x - w * 0.5, y0 - r * 0.22); g.lineTo(x, y0 - r * 0.6); g.lineTo(x + w * 0.5, y0 - r * 0.22);
    g.lineTo(x + w, y0 - r * 0.45); g.lineTo(x + w, y0); g.closePath(); g.fill(); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(x, y0 - r * 0.15, r * 0.08, 0, 7); g.fill(); g.restore(); };
  const tache = (x, hy, r, col, big = 1) => { g.save(); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = r * 0.03;
    for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x, hy + r * 0.3); g.bezierCurveTo(x + s * r * 0.4 * big, hy + r * 0.12, x + s * r * 0.8 * big, hy + r * 0.3, x + s * r * 0.9 * big, hy + r * 0.12);
      g.bezierCurveTo(x + s * r * 0.8 * big, hy + r * 0.56, x + s * r * 0.35, hy + r * 0.52, x, hy + r * 0.44); g.closePath(); g.fill(); g.stroke(); } g.restore(); };
  const hairCap = (x, hy, r, col) => { g.save(); g.fillStyle = col; g.beginPath(); g.arc(x, hy - r * 0.1, r * 0.99, Math.PI * 1.08, Math.PI * 1.92); g.closePath(); g.fill(); g.restore(); };
  /** thẻ lịch nhỏ (ngày) */
  const dateCard = (top, big, x, y, k, s = 1) => { if (k <= 0) return; const w = 300 * s, h = 190 * s; g.save(); g.translate(x, y); const sc = back(k); g.scale(sc, sc); g.rotate(-0.05);
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); g.fillStyle = '#FFF'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = RED; g.fillRect(-w / 2, -h / 2, w, h * 0.3);
    g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(-w / 2, -h / 2, w, h); text(top, 0, -h / 2 + h * 0.15, 30 * s, '#FFF'); text(big, 0, h * 0.15, 64 * s, INK); g.restore(); };
  const bowlerHat = (x, y, s, rot) => { g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = '#151517'; g.strokeStyle = INK; g.lineWidth = 4;
    g.beginPath(); g.ellipse(0, 0, 60 * s, 11 * s, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(0, -6 * s, 38 * s, 34 * s, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.restore(); };

  // ── phòng tranh (ám sát 1894–1914) ──
  const FX = [330, 750, 1170, 1590], FY = 450, FW = 330, FH = 410;
  const gallery = (t = 0) => { g.translate(960, 450); g.scale(1 + 0.006 * t, 1 + 0.006 * t); g.translate(-960, -450); g.fillStyle = '#2A1F25'; g.fillRect(0, 0, W, H); for (let i = 0; i < 24; i++) { g.fillStyle = 'rgba(255,255,255,0.025)'; g.fillRect(i * 80, 0, 40, 880); }
    g.fillStyle = '#17110F'; g.fillRect(0, 880, W, 200); g.strokeStyle = '#4A3A30'; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 880); g.lineTo(W, 880); g.stroke(); };
  const frame = (x, inner) => { g.save(); g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(x - FW / 2 - 10, FY - FH / 2 - 4, FW + 36, FH + 40);
    g.fillStyle = '#C79A3A'; g.fillRect(x - FW / 2 - 22, FY - FH / 2 - 22, FW + 44, FH + 44); g.strokeStyle = '#7A5A1E'; g.lineWidth = 5; g.strokeRect(x - FW / 2 - 22, FY - FH / 2 - 22, FW + 44, FH + 44);
    g.strokeRect(x - FW / 2 - 8, FY - FH / 2 - 8, FW + 16, FH + 16); g.beginPath(); g.rect(x - FW / 2, FY - FH / 2, FW, FH); g.clip(); g.fillStyle = '#3B2E34'; g.fillRect(x - FW / 2, FY - FH / 2, FW, FH);
    inner(); g.restore(); };
  const portrait = i => { const x = FX[i], y = FY + FH / 2 + 130, h = 520;
    if (i === 0) { const f = C.folk(x, y, h, { coat: 'suit', mouth: 'flat' }); hairCap(f.head[0], f.head[1], f.r, '#3A2E26'); }
    if (i === 1) { g.fillStyle = '#5B2330'; g.fillRect(x - FW / 2, FY - FH / 2, FW, FH); const f = C.folk(x, y, h, { coat: 'german' }); tache(f.head[0], f.head[1], f.r, '#EDEDE6', 0.75); crown(f.head[0], f.head[1], f.r); }
    if (i === 2) { g.fillStyle = '#23365A'; g.fillRect(x - FW / 2, FY - FH / 2, FW, FH); const f = C.folk(x, y, h, { coat: 'tsarcoat', feat: 'ff' }); crown(f.head[0], f.head[1], f.r); }
    if (i === 3) { g.fillStyle = '#4A3A5A'; g.fillRect(x - FW / 2, FY - FH / 2, FW, FH); const f = C.folk(x, y, h, { coat: 'gown', feat: 'sophie' });
      g.fillStyle = '#FFF8D8'; for (let j = 0; j < 5; j++) { const a = Math.PI * (1.2 + j * 0.15), px = f.head[0] + Math.cos(a) * f.r * 0.85, py = f.head[1] - f.r * 0.2 + Math.sin(a) * f.r * 0.85;
        g.beginPath(); for (let q = 0; q < 10; q++) { const rr = q % 2 ? 5 : 13, aa = q * Math.PI / 5; g.lineTo(px + Math.cos(aa) * rr, py + Math.sin(aa) * rr); } g.closePath(); g.fill(); } } };
  /** bóng đen người bí ẩn trong khung + tâm ngắm đỏ (ám sát) */
  const sil = (x, k, aim) => { if (k <= 0) { text('?', x, FY, 160, '#5A4A50'); return; } g.save(); g.globalAlpha = clamp(k * 2); g.translate(0, (1 - easeOut(k)) * 80); g.fillStyle = '#16111A';
    g.beginPath(); g.arc(x, FY - 40, 82, 0, 7); g.fill(); g.beginPath(); g.moveTo(x - 120, FY + FH / 2); g.lineTo(x - 120, FY + 110); g.quadraticCurveTo(x - 120, FY + 50, x - 60, FY + 50); g.lineTo(x + 60, FY + 50); g.quadraticCurveTo(x + 120, FY + 50, x + 120, FY + 110); g.lineTo(x + 120, FY + FH / 2); g.fill();
    text('?', x, FY - 35, 90, '#5A4A50'); if (aim) { g.strokeStyle = RED; g.lineWidth = 6; g.beginPath(); g.arc(x, FY - 40, 110, 0, 7); g.moveTo(x - 140, FY - 40); g.lineTo(x + 140, FY - 40); g.moveTo(x, FY - 180); g.lineTo(x, FY + 100); g.stroke(); } g.restore(); };
  /** nổ VẼ (chớp sao + khói tròn nét mực) — trong cảnh vẽ không dùng ảnh nổ thật */
  const puff = (x, y, size, u) => { if (u < 0 || u > 1.6) return; S.flash(x, y, u / 0.35, size * 0.5); const k = easeOut(clamp(u / 0.6)), a = clamp((1.6 - u) / 0.8);
    g.save(); g.globalAlpha = a; g.strokeStyle = INK; g.lineWidth = 4; for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.3, r = size * (0.12 + 0.1 * hash(i + 3)) * (0.5 + k);
      g.fillStyle = i % 2 ? '#E9E4D6' : '#C9C2B0'; g.beginPath(); g.arc(x + Math.cos(an) * size * 0.22 * k, y - size * 0.15 * k + Math.sin(an) * size * 0.14 * k, r, 0, 7); g.fill(); g.stroke(); } g.restore(); };
  const PLAQ = ['USA · 1901', 'ITALY · 1900', 'GREECE · 1913', 'AUSTRIA · 1898'], WHO = ['PRESIDENT', 'KING', 'KING', 'EMPRESS'];

  // ── phòng ăn Potsdam ──
  const diningRoom = () => { g.fillStyle = '#7A3E3A'; g.fillRect(0, 0, W, H); for (let i = 0; i < 20; i++) { g.fillStyle = 'rgba(255,220,180,0.05)'; g.fillRect(i * 100 + 30, 0, 14, 640); }
    g.fillStyle = '#56291F'; g.fillRect(0, 640, W, 440); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 640); g.lineTo(W, 640); g.stroke();
    for (const wx of [110, 1610]) { g.fillStyle = '#9FCBEA'; g.fillRect(wx, 150, 200, 380); g.strokeRect(wx, 150, 200, 380); g.beginPath(); g.moveTo(wx + 100, 150); g.lineTo(wx + 100, 530); g.moveTo(wx, 340); g.lineTo(wx + 200, 340); g.stroke();
      g.fillStyle = '#B0473F'; g.fillRect(wx - 40, 130, 44, 420); g.fillRect(wx + 196, 130, 44, 420); g.strokeRect(wx - 40, 130, 44, 420); g.strokeRect(wx + 196, 130, 44, 420); }
    g.strokeStyle = '#C9A13B'; g.lineWidth = 5; g.beginPath(); g.moveTo(960, 0); g.lineTo(960, 70); g.stroke(); g.fillStyle = '#E2B53B'; g.beginPath(); g.ellipse(960, 90, 120, 26, 0, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
    for (let i = 0; i < 6; i++) { const cx = 860 + i * 40; g.fillStyle = '#FFF'; g.fillRect(cx - 5, 50, 10, 30); g.fillStyle = '#F5C542'; g.beginPath(); g.ellipse(cx, 44, 5, 9, 0, 0, 7); g.fill(); } };
  const tableFront = () => { g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#FBF8F0'; g.beginPath(); g.moveTo(260, 740); g.lineTo(1660, 740); g.lineTo(1700, 940); g.lineTo(220, 940); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#D9D2C2'; g.lineWidth = 4; for (let i = 1; i < 7; i++) { const x = 220 + i * 210; g.beginPath(); g.moveTo(x + 10, 760); g.quadraticCurveTo(x, 860, x - 6, 936); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#FBF8F0'; g.fillRect(260, 726, 1400, 22); g.strokeRect(260, 726, 1400, 22); g.restore(); };
  const KAISER = { coat: 'german', feat: 'wilhelm', wear: 'pickel' };
  const ambassador = (x, y, h, o = {}) => { const f = C.folk(x, y, h, { coat: 'suit', look: -1, ...o }); g.save(); g.fillStyle = '#BDBDB6';
    for (const s of [-1, 1]) { g.beginPath(); g.ellipse(f.head[0] + s * f.r * 0.82, f.head[1] - f.r * 0.15, f.r * 0.2, f.r * 0.34, 0, 0, 7); g.fill(); } g.restore(); tache(f.head[0], f.head[1], f.r, '#8E8E88'); return f; };

  // ── văn phòng Belgrade (tối hậu thư) ──
  const office = () => { g.fillStyle = '#D8C8A8'; g.fillRect(0, 0, W, H); for (let i = 0; i < 26; i++) { g.fillStyle = 'rgba(120,90,50,0.08)'; g.fillRect(i * 76, 0, 22, H); }
    g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#9FCBEA'; g.fillRect(110, 140, 280, 330); g.strokeRect(110, 140, 280, 330); g.beginPath(); g.moveTo(250, 140); g.lineTo(250, 470); g.moveTo(110, 300); g.lineTo(390, 300); g.stroke();
    g.fillStyle = '#5A3A26'; g.fillRect(0, 960, W, 120); };
  const desk = () => { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#8A5A36'; g.fillRect(280, 740, 860, 34); g.strokeRect(280, 740, 860, 34); g.fillStyle = '#734A2C'; g.fillRect(310, 774, 800, 250); g.strokeRect(310, 774, 800, 250);
    for (const dx of [0, 400]) { g.strokeRect(350 + dx, 810, 320, 80); g.beginPath(); g.arc(510 + dx, 850, 8, 0, 7); g.stroke(); } g.fillStyle = '#FBF8F0'; g.fillRect(560, 712, 220, 30); g.strokeRect(560, 712, 220, 30); g.restore(); };
  const ROWS = 10, SX = 1180, SW = 460;
  /** cuộn tối hậu thư: L = độ dài đã thả (px), tick(i) → 'ok' | 'cond' | 'no' | null */
  const scroll = (L, mark, X) => { g.save(); const top = 70; g.strokeStyle = INK; g.lineWidth = 6;
    g.fillStyle = '#F6EED8'; g.fillRect(SX, top, SW, Math.min(L, 900)); g.strokeRect(SX, top, SW, Math.min(L, 900));
    g.save(); g.beginPath(); g.rect(SX, top, SW, Math.min(L, 900)); g.clip(); text('ULTIMATUM', SX + SW / 2, top + 62, 52, '#7A1E22');
    for (let i = 0; i < ROWS; i++) { const y = top + 140 + i * 74; text(`${i + 1}.`, SX + 34, y, 30, INK, { align: 'left', w: 800 });
      if (mark && mark(i) === 'no') { g.fillStyle = 'rgba(194,52,58,0.14)'; g.fillRect(SX + 10, y - 30, SW - 20, 60); text('AUSTRIAN INQUIRY', SX + 72, y, 25, RED, { align: 'left', w: 900 }); }
      else { g.strokeStyle = '#9A9080'; g.lineWidth = 6; for (let j = 0; j < 2; j++) { const w = 220 + 100 * hash(i * 3 + j); g.beginPath(); g.moveTo(SX + 80, y - 10 + j * 22); g.lineTo(SX + 80 + w, y - 10 + j * 22); g.stroke(); } }
      const m = mark && mark(i); if (m === 'ok' || m === 'cond') tick(SX + SW - 50, y, 1.1); if (m === 'cond') text('*', SX + SW - 18, y - 12, 44, '#C07A12'); if (m === 'no') cross(SX + SW - 50, y, 1.2); }
    g.restore();
    g.fillStyle = '#C9A13B'; g.fillRect(SX - 24, top - 16, SW + 48, 28); g.strokeRect(SX - 24, top - 16, SW + 48, 28);
    if (L > 900) { const r = 30 + (L - 900) * 0.08; g.fillStyle = '#F6EED8'; g.beginPath(); g.ellipse(SX + SW / 2, 975, SW / 2 + 20, r * 0.6, 0, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = '#B9AE94'; g.lineWidth = 4; for (let i = 1; i < 4; i++) { g.beginPath(); g.ellipse(SX + SW / 2, 975, (SW / 2 + 20) * (1 - i * 0.2), r * 0.6 * (1 - i * 0.2), 0, 0, 7); g.stroke(); } }
    g.restore(); };
  const clock48 = (X, t48) => { if (X < t48) return; const rem = Math.max(0, 48 * 3600 - (X - t48) * 2400), hh = Math.floor(rem / 3600), mm = Math.floor(rem / 60) % 60, ss = Math.floor(rem) % 60;
    const k = kk(X, t48, 0.25); g.save(); g.translate(760, 150); const s = back(k); g.scale(s, s); g.fillStyle = '#111'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(-190, -60, 380, 120, 16); g.fill(); g.stroke();
    text(`${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 0, 4, 76, '#FF4A3A'); g.restore(); };

  // ── căng-tin châu Âu (gọi lại a1: hai bàn ăn) ──
  const cafeWall = () => { g.fillStyle = '#F2EBD3'; g.fillRect(0, 0, W, H); g.fillStyle = '#9CC3A6'; g.fillRect(0, 520, W, 380);
    g.strokeStyle = 'rgba(30,35,40,0.25)'; g.lineWidth = 3; for (let x = 0; x < W; x += 60) { g.beginPath(); g.moveTo(x, 520); g.lineTo(x, 900); g.stroke(); } for (let y = 520; y < 900; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(0, 520); g.lineTo(W, 520); g.stroke();
    for (let i = 0; i < 16; i++) for (let j = 0; j < 3; j++) { g.fillStyle = (i + j) % 2 ? '#3B3B42' : '#E9E4D6'; g.fillRect(i * 120, 900 + j * 60, 120, 60); }
    g.beginPath(); g.moveTo(0, 900); g.lineTo(W, 900); g.stroke();
    g.fillStyle = '#FFF'; g.beginPath(); g.arc(960, 330, 70, 0, 7); g.fill(); g.stroke(); g.lineWidth = 6; g.beginPath(); g.moveTo(960, 330); g.lineTo(960, 280); g.moveTo(960, 330); g.lineTo(995, 345); g.stroke();
    g.fillStyle = '#2F5A3C'; g.fillRect(560, 70, 800, 130); g.lineWidth = 8; g.strokeStyle = '#8A5A36'; g.strokeRect(560, 70, 800, 130); text('EUROPE HIGH · LUNCH', 960, 137, 56, '#F4F1E8'); };
  const cafeTable = (x0, x1) => { g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#C9A26B'; g.fillRect(x0, 770, x1 - x0, 34); g.strokeRect(x0, 770, x1 - x0, 34);
    g.fillStyle = '#B08A55'; g.fillRect(x0 + 20, 804, x1 - x0 - 40, 40); g.strokeRect(x0 + 20, 804, x1 - x0 - 40, 40);
    for (const lx of [x0 + 50, x1 - 70]) { g.fillStyle = '#6B6B70'; g.fillRect(lx, 844, 20, 120); g.strokeRect(lx, 844, 20, 120); }
    for (let x = x0 + 70; x < x1 - 100; x += 230) { g.fillStyle = '#E36A5A'; g.fillRect(x, 752, 120, 20); g.strokeRect(x, 752, 120, 20); g.fillStyle = '#F2D66B'; g.beginPath(); g.arc(x + 40, 750, 12, Math.PI, 0); g.fill(); } g.restore(); };

  // ── hàng domino quốc gia (gọi lại thumbnail F) ──
  const DOM = [[RS, 150, null], [AH, 200, null], [RU, 245, '30 JUL'], [DE, 215, '1 AUG'], [FR, 225, '3 AUG'], [BE, 150, '4 AUG'], [UK, 215, '4 AUG']];
  const dominoRow = (X, tips) => { S.paper('#FBF6EA'); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 900); g.lineTo(W, 900); g.stroke();
    C.car1914(95, 900, 150);
    DOM.forEach(([n, s, date], i) => { const x = 250 + i * 250, h = s, tp = tips[i] <= X ? clamp((X - tips[i]) / 0.4) : 0, a = 1.05 * easeOut(tp);
      g.save(); g.translate(x + h * 0.25, 900); g.rotate(a); g.translate(-(x + h * 0.25), -900);
      cutout(g, M, n, x, 900, h, { mood: tp > 0 ? 'shock' : 'angry', arms: tp > 0 ? 'up' : 'cross', t: X }); g.restore();
      if (date && tp > 0) S.label(date, x + 40, 975, 40, kk(X, tips[i] + 0.2, 0.3), RED); }); };

  // ── bản đồ ──
  const V0 = view(M, { cx: 15, cy: 49.5, zoom: 1.05 });
  const POW = [DE, AH, RU, FR, UK, IT];
  const sarajevoDot = (V, X) => { const p = V.pt(ll(M, 18.4, 43.86)), r = 14 + 6 * Math.abs(Math.sin(X * 5)); g.save(); g.fillStyle = RED; g.strokeStyle = '#FFF'; g.lineWidth = 4;
    g.beginPath(); g.arc(p[0], p[1], r, 0, 7); g.fill(); g.stroke(); g.restore(); return p; };

  // ── căng mặt Berlin ──
  const berlin = (city = 'BERLIN') => { const gr = g.createLinearGradient(0, 0, 0, 760); gr.addColorStop(0, '#7FB3DE'); gr.addColorStop(1, '#D7E8F4'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#E3D6B4';
    for (let i = 0; i < 9; i++) { const x = i * 230 - 60, h = 260 + 120 * hash(i + 70); if (x > 520 && x < 1300) continue; g.fillRect(x, 760 - h, 220, h); g.strokeRect(x, 760 - h, 220, h);
      for (let c = 0; c < 3; c++) for (let r = 0; r < 2; r++) { g.fillStyle = '#3A3E48'; g.fillRect(x + 30 + c * 64, 760 - h + 40 + r * 100, 34, 60); } g.fillStyle = '#E3D6B4'; }
    if (city === 'BERLIN') { g.fillStyle = '#E8DDBE'; g.fillRect(600, 380, 720, 60); g.strokeRect(600, 380, 720, 60); g.fillRect(660, 330, 600, 50); g.strokeRect(660, 330, 600, 50);   // cổng Brandenburg
      for (let c = 0; c < 6; c++) { g.fillStyle = '#EFE6CC'; g.fillRect(620 + c * 128, 440, 46, 320); g.strokeRect(620 + c * 128, 440, 46, 320); }
      g.fillStyle = '#4F6B5A'; g.beginPath(); g.moveTo(880, 330); g.lineTo(900, 260); g.lineTo(1020, 250); g.lineTo(1040, 330); g.closePath(); g.fill(); g.stroke(); }
    if (city === 'PARIS') { g.fillStyle = '#7A6550'; g.beginPath(); g.moveTo(780, 760); g.quadraticCurveTo(900, 560, 930, 430); g.lineTo(950, 270); g.lineTo(956, 150); g.lineTo(964, 150); g.lineTo(970, 270);   // tháp Eiffel
      g.lineTo(990, 430); g.quadraticCurveTo(1020, 560, 1140, 760); g.lineTo(1050, 760); g.quadraticCurveTo(960, 600, 870, 760); g.closePath(); g.fill(); g.stroke();
      g.fillRect(880, 560, 160, 22); g.strokeRect(880, 560, 160, 22); g.fillRect(915, 420, 90, 18); g.strokeRect(915, 420, 90, 18); g.fillRect(942, 262, 36, 14); g.strokeRect(942, 262, 36, 14);
      g.strokeStyle = 'rgba(30,35,40,0.45)'; g.lineWidth = 3; for (let i = 0; i < 8; i++) { const y = 300 + i * 55; g.beginPath(); g.moveTo(960 - 12 - i * 14, y); g.lineTo(960 + 12 + i * 14, y + 50); g.moveTo(960 + 12 + i * 14, y); g.lineTo(960 - 12 - i * 14, y + 50); g.stroke(); } g.strokeStyle = INK; g.lineWidth = 8; }
    if (city === 'LONDON') { g.fillStyle = '#D9C79A'; g.fillRect(560, 560, 800, 200); g.strokeRect(560, 560, 800, 200);   // Nghị viện + Big Ben
      for (let i = 0; i < 9; i++) { const x = 580 + i * 88; g.beginPath(); g.moveTo(x, 560); g.lineTo(x + 18, 520); g.lineTo(x + 36, 560); g.fill(); g.stroke(); g.fillStyle = '#3A3E48'; g.fillRect(x + 6, 600, 24, 60); g.fillRect(x + 6, 680, 24, 50); g.fillStyle = '#D9C79A'; }
      g.fillRect(1140, 300, 120, 460); g.strokeRect(1140, 300, 120, 460); g.fillStyle = '#F4EFDC'; g.beginPath(); g.arc(1200, 370, 44, 0, 7); g.fill(); g.stroke();
      g.lineWidth = 5; g.beginPath(); g.moveTo(1200, 370); g.lineTo(1200, 340); g.moveTo(1200, 370); g.lineTo(1222, 378); g.stroke(); g.lineWidth = 8;
      g.fillStyle = '#4F5A66'; g.beginPath(); g.moveTo(1130, 300); g.lineTo(1200, 150); g.lineTo(1270, 300); g.closePath(); g.fill(); g.stroke(); }
    g.fillStyle = '#9A948C'; g.fillRect(0, 760, W, 320); g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke(); };

  // ── biển số ──
  const PLATE = [['A', 400], ['I', 690], ['I', 790], ['I', 890], ['1', 1050], ['1', 1190], ['8', 1340]];
  const plate = (cx, cy, s, shown = 99, hi = []) => { g.save(); g.translate(cx, cy); g.scale(s, s); g.translate(-960, -410);
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.roundRect(256, 276, 1440, 300, 30); g.fill();
    g.fillStyle = '#F7F4EA'; g.strokeStyle = '#111'; g.lineWidth = 16; g.beginPath(); g.roundRect(240, 260, 1440, 300, 30); g.fill(); g.stroke();
    g.lineWidth = 5; g.beginPath(); g.roundRect(268, 288, 1384, 244, 18); g.stroke();
    for (const [c, col] of hi) { g.fillStyle = col; g.fillRect(c[0], 300, c[1] - c[0], 220); }
    PLATE.forEach(([ch, x], i) => { if (i < shown) text(ch, x, 418, 230, '#111'); }); g.restore(); };

  // ───────── mốc ─────────
  const L1 = "Here's the strange part", L2 = 'In the twenty years before', L3 = 'What made this one', L4 = 'Austria-Hungary saw its chance', L5 = 'So on July fifth',
    L6 = 'Historians call this', L7 = 'The next day, the Kaiser', L8 = 'On July twenty-third', L9 = "Serbia, to almost everyone's", L10 = 'Even the Kaiser, back',
    L11 = 'Austria-Hungary declared war anyway', L12 = 'And then the cafeteria', L13 = 'Russia began mobilizing', L14 = 'To get to France quickly', L15 = 'Britain had promised',
    L16 = 'The ridiculous part', L17 = 'In those final days', L18 = "It didn't work", L19 = 'Crowds cheered', L20 = 'It would not be over', L21 = 'Although, weirdly',
    L22 = 'Its license plate', L23 = "That's pure coincidence";
  const T = {
    assas: wd(L1, 'assassinations'), rare: wd(L1, 'rare'),
    port: [wd(L2, 'president'), wd(L2, 'italy'), wd(L2, 'greece'), wd(L2, 'wife')], none: wd(L2, 'none'),
    great: wd(L3, 'great'), decided: wd(L3, 'decided'),
    crush: wd(L4, 'crush'), russia: wd(L4, 'russia'), germany: wd(L4, 'germany'),
    fifth: wd(L5, 'fifth'), amb: wd(L5, 'ambassador'), kaiser: wd(L5, 'kaiser'), told: wd(L5, 'and', 0), doit: wd(L5, 'do'), support: wd(L5, 'support'),
    blank: wd(L6, 'blank'), check: wd(L6, 'check'), card: wd(L6, 'credit'), worry: wd(L6, "don't"),
    kais7: wd(L7, 'kaiser'), norway: wd(L7, 'norway'), like: wd(L7, 'like'),
    july23: wd(L8, 'twenty-third'), ult: wd(L8, 'ultimatum'), rejected: wd(L8, 'rejected'), h48: wd(L8, 'forty-eight'),
    surprise: wd(L9, 'surprise'), accepted: wd(L9, 'accepted'), cond: wd(L9, 'conditions'), refused: wd(L9, 'refused'),
    read: wd(L10, 'read'), wrote: wd(L10, 'wrote'), gone: wd(L10, 'disappeared'),
    declared: wd(L11, 'declared'), anyway: wd(L11, 'anyway'), exactly: wd(L11, 'exactly'), month: wd(L11, 'month'), did: wd(L11, 'did'), telegram: wd(L11, 'telegram'),
    threw: wd(L12, 'threw'), punch: wd(L12, 'punch'), table: wd(L12, 'every'), stood: wd(L12, 'stood'),
    mob: wd(L13, 'mobilizing'), declRU: wd(L13, 'declared'), france: wd(L13, 'france'),
    marched: wd(L14, 'marched'), through: wd(L14, 'through'), belgium: wd(L14, 'belgium'), neutral: wd(L14, 'neutral'), notok: wd(L14, 'not'),
    treaty: wd(L15, 'treaty'), y1839: wd(L15, 'thirty-nine'), chanc: wd(L15, 'german'), scrap: wd(L15, 'scrap'), paper: wd(L15, 'paper'), aug4: wd(L15, 'august'), declUK: wd(L15, 'declared'), ger: wd(L15, 'germany'),
    kais16: wd(L16, 'kaiser'), tsar: wd(L16, 'tsar'), king: wd(L16, 'king'), cousins: wd(L16, 'cousins'),
    wil: wd(L17, 'wilhelm'), tele: wd(L17, 'telegrams'), signed: wd(L17, 'signed'), willy: wd(L17, 'willy'), polite: wd(L17, 'politely'), beg: wd(L17, 'begging'), war17: wd(L17, 'war'),
    didnt: wd(L18, "didn't"), five: wd(L18, 'five'), wrong: wd(L18, 'wrong'), war18: wd(L18, 'war'),
    cheered: wd(L19, 'cheered'), berlin: wd(L19, 'berlin'), paris: wd(L19, 'paris'), london: wd(L19, 'london'), agreed: wd(L19, 'agreed'),
    not: wd(L20, 'not'), car: wd(L21, 'car'), known: wd(L21, 'known'),
    pA: wd(L22, 'a'), pIII: wd(L22, 'three'), p1: wd(L22, 'one', 0), p2: wd(L22, 'one', 1), p8: wd(L22, 'eight'), net: wd(L22, 'internet'), arm: wd(L22, 'armistice'), e1: wd(L22, 'eleven', 0), e2: wd(L22, 'eleven', 1), e18: wd(L22, 'eighteen'),
    coinc: wd(L23, 'coincidence'), nov: wd(L23, 'november'), ended: wd(L23, 'ended'),
  };

  // ───────── cảnh ─────────
  return [
    // 1 · phòng tranh trống "?" → ASSASSINATIONS / NOT RARE · không người dẫn · tiếng: whoosh chữ, dấu đóng ở "rare"
    [ST(L1), (t, X) => { gallery(t); FX.forEach((x, i) => frame(x, () => sil(x, kk(X, T.assas + i * 0.18, 0.3), X > T.rare)));
      S.label('ASSASSINATIONS', 960, 130, 84, kk(X, T.assas), '#F4F1E8', { stroke: INK }); S.stamp('NOT RARE', 960, 790, 70, kk(X, T.rare, 0.5), -0.06); }],
    // 2 · bốn chân dung bật theo từ (Tổng thống Mỹ, vua Ý, vua Hy Lạp, Sisi) → NO WAR ×4 · không người dẫn · tiếng: tách máy ảnh ×4, dấu đóng ×4
    [ST(L2), (t, X) => { gallery(t); S.label('1894 – 1914', 960, 120, 60, clamp(t / 0.3), '#E9D9A6');
      FX.forEach((x, i) => { const k = kk(X, T.port[i], 0.3); frame(x, () => { if (k <= 0) { sil(x, 1, true); return; } g.save(); g.globalAlpha = clamp(k * 2); g.translate(0, (1 - easeOut(k)) * 120); portrait(i); g.restore(); });
        S.label(WHO[i], x, FY + FH / 2 + 82, 36, k, '#F4F1E8'); S.label(PLAQ[i], x, FY + FH / 2 + 130, 30, k, '#C79A3A');
        S.stamp('NO WAR', x, FY + 120, 40, kk(X, T.none + i * 0.25, 0.5), -0.12); }); }],
    // 3 · bản đồ: các cường quốc hiện mặt, cùng quay nhìn chấm Sarajevo · người dẫn góc phải · tiếng: pop mặt, ping chấm đỏ
    [ST(L3), (t, X) => { const fill = {}; POW.forEach(n => { fill[n] = 'flag'; }); fill[RS] = 'flag'; drawMap(g, M, V0, { fill });
      const p = sarajevoDot(V0, X); const look = X > T.decided ? 1 : 0;
      if (X > T.great) POW.forEach((n, i) => { const k = kk(X, T.great + i * 0.08, 0.25); if (k <= 0) return; g.save(); g.globalAlpha = k;
        const f = V0.pt(ll(M, ...{ [DE]: [10.6, 51.4], [AH]: [17.5, 47.6], [RU]: [36, 55.5], [FR]: [2.4, 46.9], [UK]: [-1.7, 52.9], [IT]: [12.4, 43.3] }[n])), dx = p[0] - f[0], dy = p[1] - f[1], d = Math.hypot(dx, dy) || 1;
        mapFace(g, M, V0, n, { mood: look ? 'smug' : 'calm', look: [look * dx / d * 1.5, look * dy / d * 1.5] }); g.restore(); });
      S.label('THE GREAT POWERS', 760, 110, 70, kk(X, T.great), '#FFF', { stroke: INK }); S.lipHost(X, clamp(t / 0.3)); }],
    // 4 · bản đồ zoom: Áo-Hung muốn đè Serbia; Nga bảo kê; Đức "chống lưng?" · người dẫn góc phải · tiếng: dậm (crush), bong bóng pop ×2
    [ST(L4), (t, X) => { const e = ease(t / 1.2), V = view(M, { cx: lerp(15, 22, e), cy: lerp(49.5, 49, e), zoom: lerp(1.05, 1.6, e) });
      const lift = X > T.crush && X < T.crush + 0.9 ? Math.abs(Math.sin((X - T.crush) * 10)) * 18 : 0;
      const fill = { [AH]: 'flag', [RS]: 'flag' }; if (X > T.russia) fill[RU] = 'flag'; if (X > T.germany) fill[DE] = 'flag';
      drawMap(g, M, V, { fill, lift: { [AH]: lift } });
      const a = mapFace(g, M, V, AH, { mood: 'angry', look: X > T.germany ? [-1, -0.6] : [0.5, 1], lift });
      const s = mapFace(g, M, V, RS, { mood: X > T.crush ? 'shock' : 'calm', look: [-0.6, -1] });
      if (X > T.crush && s) S.sweat(s.x + s.r * 1.1, s.y - s.r * 0.8, 1.2);
      if (X > T.russia) { const r = mapFace(g, M, V, RU, { mood: 'angry', look: [-1, 0.8] }); if (r) bubble(g, 'Touch Serbia, fight ME.', r.x - 330, Math.max(110, r.y - 40), r.x + 30, r.y + 300, kk(X, T.russia + 0.2, 0.25), 38); }
      if (X > T.germany) { mapFace(g, M, V, DE, { mood: 'cool' }); if (a) bubble(g, 'Got my back?', a.x - 250, a.y - 170, a.x + 100, a.y + 300, kk(X, T.germany + 0.1, 0.25), 40); }
      S.stamp('CRUSH SERBIA', 760, 960, 52, kk(X, T.crush, 0.5), -0.05); S.lipHost(X); }],
    // 5 · tư liệu: Szőgyény + Wilhelm II (ảnh thật, khung giấy) + thẻ 5 JULY · không người dẫn · tiếng: tách ảnh ×2
    [ST(L5), (t, X) => { g.fillStyle = '#17171B'; g.fillRect(0, 0, W, H);
      const k1 = kk(X, T.amb - 0.3, 0.3), k2 = kk(X, T.kaiser - 0.2, 0.3);
      if (k1 > 0) S.photo(IM.p_szogyeny, 600, 500, 420, k1, { rot: -0.03 }); if (k2 > 0) S.photo(IM.p_wilhelm, 1320, 500, 470, k2, { rot: 0.025 });
      S.label('AMBASSADOR SZŐGYÉNY', 600, 950, 44, k1, '#FFF', { stroke: '#111' }); S.label('KAISER WILHELM II', 1320, 950, 44, k2, '#FFF', { stroke: '#111' });
      dateCard('POTSDAM', '5 JULY', 960, 170, kk(X, T.fifth - 0.1), 1.1);
      S.credit('Photos: E. Ellinger; E. Bieber, 1913 · public domain'); }],
    // 6 · bữa trưa Potsdam: Kaiser + đại sứ, người dẫn #6 người hầu rót rượu; "Do whatever you need" → "We'll support you" · tiếng: rót rượu, pop bong bóng
    [wd(L5, 'and', 0) - 0.15, (t, X) => lunch(t, X)],
    // 7 · ảnh tư liệu du thuyền Hohenzollern · không người dẫn · tiếng: còi tàu, sóng
    [ST(L7), (t, X) => { g.fillStyle = '#1C2A3A'; g.fillRect(0, 0, W, H); S.photo(IM.p_hohenzollern, 960, 470, 1000, clamp(t / 0.25), { push: 1 + 0.01 * t });
      S.nameTag("SMY HOHENZOLLERN · THE KAISER'S YACHT", kk(X, T.kais7), 96, 975); dateCard('NEXT DAY', '6 JULY', 250, 200, kk(X, T.kais7 - 0.4), 0.9);
      S.credit('Photo: U.S. Naval Historical Center · public domain'); }],
    // 8 · vẽ: Kaiser nằm ghế boong, kính râm rơi xuống mặt ở "like you do" · không người dẫn · tiếng: "deal with it" swoosh, tiếng hải âu
    [T.norway - 0.1, (t, X) => cruise(t, X)],
    // 9 · văn phòng Belgrade: cuộn tối hậu thư thả tới sàn, đồng hồ 48h · người dẫn #7 bộ trưởng Serbia · tiếng: giấy cuộn lăn dài, đồng hồ tích tắc
    [ST(L8), (t, X) => belgrade(t, X)],
    // 10 · cùng phòng: tick ✓ gần hết, * điều kiện, ✗ "Austrian police" · người dẫn #7 gật gù đổ mồ hôi → chỉ dứt khoát · tiếng: bút tick ×9, gạch đỏ
    [ST(L9), (t, X) => belgrade(t, X)],
    // 11 · Kaiser (kính râm gác lên mũ) đọc thư trả lời: "Every reason for war is gone!" → chữ WAR tan khói · không người dẫn · tiếng: giấy, poof
    [ST(L10), (t, X) => { diningRoom(); g.fillStyle = '#56291F'; g.fillRect(0, 640, W, 440);
      const happy = X > T.gone; const f = C.folk(700, 1000, 520, { ...KAISER, eyes: happy ? 'happy' : 'dot', mouth: happy ? 'grin' : 'flat' });
      shades(f.head[0], f.head[1] - f.r * 0.62, f.r * 0.9);
      g.save(); g.translate(700, 780); g.rotate(-0.06); g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-120, -80, 240, 170); g.strokeRect(-120, -80, 240, 170);
      text('SERBIA: REPLY', 0, -48, 26, INK); g.strokeStyle = '#9A9080'; g.lineWidth = 5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-90, -10 + i * 26); g.lineTo(60 + 30 * hash(i), -10 + i * 26); g.stroke(); } g.restore();
      bubble(g, 'Every reason for war is gone!', 1180, 330, 860, 460, kk(X, T.wrote, 0.25), 44);
      const kw = kk(X, T.read - 0.1), u = X - T.gone; if (u < 1.2) { g.save(); g.globalAlpha = u > 0 ? clamp(1 - u / 0.6) : 1; const s = u > 0 ? 1 + u * 0.6 : 1; g.translate(1350, 690); g.scale(s, s); S.label('WAR', 0, 0, 170, kw, '#8E8A86', { free: true, stroke: '#5A5652' }); const ks = kk(X, T.wrote, 0.3); if (ks > 0) { g.strokeStyle = '#5A5652'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-190, -55); g.lineTo(-190 + 380 * ks, -55); g.stroke(); } g.restore(); }
      if (u > 0) for (let i = 0; i < 7; i++) { const k = clamp((u - i * 0.04) / 0.9); if (k <= 0 || k >= 1) continue; const a = i * 0.9; g.fillStyle = `rgba(230,230,230,${0.8 * (1 - k)})`; g.strokeStyle = `rgba(30,35,40,${0.6 * (1 - k)})`; g.lineWidth = 4;
        g.beginPath(); g.arc(1350 + Math.cos(a) * 160 * k, 640 + Math.sin(a) * 110 * k, 40 + 50 * k, 0, 7); g.fill(); g.stroke(); } }],
    // 12 · Áo-Hung tuyên chiến "anyway" — cutout Áo-Hung đắc ý, Serbia sốc · không người dẫn · tiếng: dấu đóng ở "anyway"
    [ST(L11), (t, X) => { S.paper('#FBF6EA'); const up = X > T.declared ? Math.abs(Math.sin((X - T.declared) * 9)) * 16 * clamp(1 - (X - T.declared) / 1.2) : 0;
      cutout(g, M, AH, 720, 960, 470, { mood: X > T.declared ? 'angry' : 'smug', arms: 'cross', hop: up, t: X }); cutout(g, M, RS, 1320, 960, 250, { mood: 'shock', arms: 'up', t: X });
      S.stamp('WAR. ANYWAY.', 960, 190, 84, kk(X, T.anyway, 0.5), -0.05); }],
    // 13 · lịch 28 JUNE → lật → 28 JULY · không người dẫn · tiếng: lật lịch
    [T.exactly - 0.2, (t, X) => { S.paper('#FBF6EA'); const k = kk(X, T.month - 0.1, 0.5);
      const cal = (mon) => { g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-250, -290, 520, 600); g.fillStyle = '#FFF'; g.fillRect(-260, -300, 520, 600); g.fillStyle = RED; g.fillRect(-260, -300, 520, 150);
        g.strokeStyle = INK; g.lineWidth = 7; g.strokeRect(-260, -300, 520, 600); text(mon + ' 1914', 0, -225, 70, '#FFF'); text('28', 0, 90, 300, INK); };
      g.save(); g.translate(960, 480); cal('JULY'); g.restore();
      if (k < 1) { g.save(); g.translate(960, 180); g.scale(1, Math.cos(k * Math.PI * 0.5)); g.translate(0, 300); g.globalAlpha = 1 - k * 0.3; cal('JUNE'); g.restore(); }
      S.label('ONE MONTH LATER', 960, 960, 64, kk(X, T.exactly), RED); }],
    // 14 · bức điện vẽ "WAR." gõ từng chữ · không người dẫn · tiếng: máy điện báo tạch tạch, ting
    [T.telegram - 0.35, (t, X) => { g.fillStyle = '#5A3A26'; g.fillRect(0, 0, W, H); for (let i = 0; i < 14; i++) { g.fillStyle = 'rgba(0,0,0,0.08)'; g.fillRect(0, i * 80 + 20 * hash(i), W, 6); }
      const k = kk(X, T.telegram - 0.3, 0.28); g.save(); g.translate(0, (1 - easeOut(k)) * -1100); g.translate(960, 540); g.rotate(-0.03);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-490, -270, 1000, 560); g.fillStyle = '#F2E3B3'; g.fillRect(-500, -280, 1000, 560); g.fillStyle = '#2F4F7A'; g.fillRect(-500, -280, 1000, 90);
      g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(-500, -280, 1000, 560); text('TELEGRAM', 0, -234, 56, '#F4F1E8');
      text('FROM: VIENNA', -440, -130, 40, INK, { align: 'left', w: 800 }); text('TO: BELGRADE', -440, -76, 40, INK, { align: 'left', w: 800 }); text('28 JULY 1914', 440, -130, 40, INK, { align: 'right', w: 800 });
      const n = Math.floor(clamp((X - T.telegram) / 0.6) * 4); text('WAR.'.slice(0, n), 0, 130, 220, RED); g.restore(); }],
    // 15 · căng-tin "Europe High": 2 bàn ăn; Áo-Hung đấm Serbia ở "punch", cả căng-tin đứng dậy ở "stood up" · không người dẫn · tiếng: đấm BỐP, ghế cào sàn, ồ
    [ST(L12), (t, X) => cafeteria(t, X)],
    // 16 · domino quốc gia (xe tí hon bên trái): Nga ngã "mobilizing", Đức "declared", Pháp "France" · không người dẫn · tiếng: domino cạch ×3
    [ST(L13), (t, X) => dominoRow(X, [-1, LT(L13).start, T.mob, T.declRU, T.france, 1e9, 1e9])],
    // 17 · bản đồ: mũi tên Đức xuyên Bỉ sang Pháp; Bỉ sốc → "Excuse me?!" · người dẫn góc phải · tiếng: quân hành, bong bóng
    [ST(L14), (t, X) => { const V = view(M, { cx: 5.5, cy: 50, zoom: 2.6 });
      drawMap(g, M, V, { fill: { [DE]: 'flag', [BE]: 'flag', [FR]: 'flag', [UK]: 'flag' } });
      S.arrow(V, [9.5, 51.2], [4.9, 50.5], kk(X, T.marched, 0.6)); S.arrow(V, [4.4, 50.4], [2.6, 48.9], kk(X, T.through + 0.3, 0.6));
      mapFace(g, M, V, DE, { mood: 'angry', look: [-1, 0] }); mapFace(g, M, V, FR, { mood: X > T.through + 0.6 ? 'shock' : 'calm', look: [1, -1] }); mapFace(g, M, V, UK, { mood: 'calm', look: [1, 1] });
      const b = mapFace(g, M, V, BE, { k: 0.55, mood: X > T.notok ? 'angry' : X > T.belgium ? 'shock' : 'calm', look: [1, 0] });
      if (b) { S.label('NEUTRAL', b.x, b.y + 120, 46, kk(X, T.neutral), '#FFF', { stroke: INK }); bubble(g, 'Excuse me?!', b.x - 260, b.y - 150, b.x - 20, b.y - 40, kk(X, T.notok, 0.25), 44); }
      S.lipHost(X); }],
    // 18 · Anh hứa bảo vệ Bỉ: hiệp ước 1839 trên bàn · không người dẫn · tiếng: giấy trải, dấu sáp
    [ST(L15), (t, X) => treatyDesk(t, X, 0)],
    // 19 · tư liệu: Bethmann Hollweg · không người dẫn · tiếng: tách ảnh
    [T.chanc - 0.3, (t, X) => { g.fillStyle = '#17171B'; g.fillRect(0, 0, W, H); S.photo(IM.p_bethmann, 760, 500, 560, clamp(t / 0.25), { rot: -0.02 });
      S.label('BETHMANN HOLLWEG', 1440, 470, 54, kk(X, T.chanc + 0.2), '#FFF', { stroke: '#111' }); S.label('GERMAN CHANCELLOR', 1440, 540, 38, kk(X, T.chanc + 0.4), '#C9C2B0');
      S.credit('Photo: Theobald von Bethmann Hollweg, c. 1909 · public domain'); }],
    // 20 · "A SCRAP OF PAPER" — hiệp ước bị vò, ném vào sọt · không người dẫn · tiếng: vò giấy, rơi sọt
    [T.scrap - 0.25, (t, X) => treatyDesk(t, X, 1)],
    // 21 · domino: Bỉ + Anh ngã, nổ dọc hàng · không người dẫn · tiếng: domino cạch ×2 → nổ lớn
    [T.aug4 - 0.2, (t, X) => { dominoRow(X, [-1, -1, -1, -1, -1, T.aug4 + 0.1, T.declUK]);
      for (let i = 0; i < 4; i++) puff(420 + i * 400, 640, 300, X - T.ger - i * 0.18); }],
    // 22 · ba anh em họ (vẽ kiểu B): Kaiser, Sa hoàng, Vua Anh bật theo từ → COUSINS · không người dẫn · tiếng: pop ×3, dấu đóng
    [ST(L16), (t, X) => { B_palace();
      const who = [[560, T.kais16, KAISER, 'KAISER'], [960, T.tsar, { coat: 'tsarcoat', feat: 'tsar' }, 'TSAR'], [1360, T.king, { coat: 'suit', feat: 'tsar' }, 'KING']];
      for (const [x, tk, o, nm] of who) { const k = kk(X, tk - 0.1, 0.3); if (k <= 0) continue; g.save(); g.translate(0, (1 - easeOut(k)) * 700);
        const f = C.folk(x, 980, 520, { ...o, eyes: X > T.cousins ? 'shock' : 'dot', look: x < 960 ? 1 : x > 960 ? -1 : 0 }); if (nm === 'KING') crown(f.head[0], f.head[1], f.r); if (nm === 'TSAR') { g.fillStyle = '#6B4A30'; hairCap(f.head[0], f.head[1], f.r, '#6B4A30'); }
        g.restore(); S.label(nm, x, 1000, 40, k, '#FFF', { stroke: INK }); }
      S.stamp('COUSINS', 960, 190, 90, kk(X, T.cousins, 0.5), -0.06); }],
    // 23 · tư liệu: Nicholas II + George V (1913) — trông như sinh đôi · không người dẫn · tiếng: tách ảnh
    [T.cousins + 0.25, (t, X) => { g.fillStyle = '#17171B'; g.fillRect(0, 0, W, H); S.photo(IM.p_george_nicholas, 960, 540, 600, clamp(t / 0.25));
      S.label('NICHOLAS II', 380, 480, 56, clamp((t - 0.2) / 0.3), '#FFF', { stroke: '#111' }); S.label('RUSSIA', 380, 545, 36, clamp((t - 0.2) / 0.3), '#C9C2B0');
      S.label('GEORGE V', 1540, 480, 56, clamp((t - 0.5) / 0.3), '#FFF', { stroke: '#111' }); S.label('BRITAIN', 1540, 545, 36, clamp((t - 0.5) / 0.3), '#C9C2B0');
      S.credit('Photo: Ernst Sandau, Berlin 1913 · public domain'); }],
    // 24 · nhóm chat Willy ↔ Nicky (vẽ, không logo) → "IT DIDN'T WORK" · không người dẫn · tiếng: ting tin nhắn ×5, dấu đóng
    [T.tele - 0.3, (t, X) => chat(t, X)],
    // 25 · bản đồ châu Âu: 5 WEEKS, xe tí hon ở Sarajevo, cả châu Âu giận, nổ nhỏ ở "war" · người dẫn góc phải · tiếng: nổ xa ×3
    [T.didnt + 0.85, (t, X) => { const fill = {}; for (const n of [...POW, RS, BE]) fill[n] = 'flag'; drawMap(g, M, V0, { fill });
      for (const n of [...POW, RS]) mapFace(g, M, V0, n, { mood: 'angry', look: [hash(n.length) - 0.5, 0] });
      const p = V0.pt(ll(M, 18.4, 43.86)), kc = kk(X, T.wrong - 0.2, 0.3); if (kc > 0) { g.save(); g.translate(p[0], p[1] + 20); g.scale(back(kc), back(kc)); C.car1914(0, 0, 90); g.restore(); }
      S.label('5 WEEKS LATER', 760, 110, 74, kk(X, T.five), '#FFF', { stroke: INK });
      for (const [i, lon, lat] of [[0, 4.6, 50.4], [1, 21.5, 53.8], [2, 20.4, 44.9]]) { const q = V0.pt(ll(M, lon, lat)); puff(q[0], q[1], 160, X - T.war18 - i * 0.15); }
      S.stamp('EUROPE AT WAR', 720, 960, 58, kk(X, T.war18, 0.5), -0.04); S.lipHost(X); }],
    // 26 · ảnh tư liệu đám đông Berlin tháng 8/1914 · không người dẫn · tiếng: hò reo đám đông (tiếng nền)
    [ST(L19), (t, X) => { S.photoBg(IM.p_crowd_berlin, t, { desat: 0.3, push: 0.02, credit: 'Photo: crowd at the Berliner Stadtschloss, August 1914 · public domain' });
      S.nameTag('BERLIN · AUGUST 1914', kk(X, ST(L19) + 0.3), 96, 975); }],
    // 26b · cảnh vẽ đám đông trước cổng: biển BERLIN → PARIS → LONDON; người dẫn #8 tung mũ · tiếng: hò reo, mũ vút
    [T.berlin + 0.5, (t, X) => crowdScene(t, X, false)],
    // 27 · "It would not be over by Christmas." — cùng cảnh khử màu, lịch Giáng sinh lật 1914→1918, người dẫn mặt méo · tiếng: reo tắt phụt, lật lịch ×4
    [ST(L20), (t, X) => crowdScene(t, X, true)],
    // 28 · bảo tàng Vienna: chiếc xe thật (vẽ) dưới đèn, camera đẩy vào biển số · người dẫn góc phải · tiếng: hum bảo tàng, zoom whoosh
    [ST(L21), (t, X) => museum(t, X)],
    // 29 · cận biển số A III 118 bật từng ký tự → ARMISTICE 11 · 11 · 18 · không người dẫn · tiếng: gõ ký tự ×5, ting ×4
    [ST(L22), (t, X) => { g.fillStyle = '#202226'; g.fillRect(0, 0, W, H);
      const shown = [T.pA, T.pIII, T.pIII + 0.12, T.pIII + 0.24, T.p1, T.p2, T.p8].filter(a => X >= a).length;
      const hi = []; if (X > T.e1) hi.push([[640, 840], 'rgba(78,121,207,0.35)']); if (X > T.e2) hi.push([[840, 1120], 'rgba(46,158,79,0.35)']); if (X > T.e18) hi.push([[1120, 1400], 'rgba(194,52,58,0.35)']);
      if (X > T.arm) hi.push([[300, 500], 'rgba(226,181,59,0.45)']);
      plate(960, 400, 1, shown, hi);
      S.label('THE INTERNET SAYS:', 960, 700, 44, kk(X, T.net), '#C9C2B0');
      S.label('ARMISTICE', 400, 830, 84, kk(X, T.arm), '#E2B53B'); S.label('11', 740, 830, 96, kk(X, T.e1), '#7FA6F0'); S.label('·', 870, 830, 96, kk(X, T.e2), '#FFF');
      S.label('11', 980, 830, 96, kk(X, T.e2), '#6FCB8A'); S.label('·', 1110, 830, 96, kk(X, T.e18), '#FFF'); S.label('18', 1260, 830, 96, kk(X, T.e18), '#FF6A5A'); }],
    // 30 · trùng hợp: biển số = lịch 11 NOV 1918, dấu PURE COINCIDENCE + WAR ENDS · người dẫn góc phải · tiếng: dấu đóng ×2, chuông
    [ST(L23), (t, X) => { S.paper('#F4F1E8'); plate(500, 330, 0.4, 7);
      S.stamp('PURE COINCIDENCE', 500, 560, 58, kk(X, T.coinc, 0.5), -0.06);
      const kc = kk(X, T.nov - 0.1); if (kc > 0) { g.save(); g.translate(1120, 380); g.scale(back(kc), back(kc)); g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-170, -200, 360, 430);
        g.fillStyle = '#FFF'; g.fillRect(-180, -210, 360, 430); g.fillStyle = RED; g.fillRect(-180, -210, 360, 110); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(-180, -210, 360, 430);
        text('NOV 1918', 0, -155, 54, '#FFF'); text('11', 0, 60, 230, INK); g.restore(); }
      S.label('=', 840, 380, 120, kk(X, T.nov + 0.6), INK);
      S.lipHost(X, clamp(t / 0.3)); }],
    // 31 · ảnh tư liệu toa tàu Compiègne (đình chiến 11/11/1918) + dấu WAR ENDS · không người dẫn · tiếng: dấu đóng, chuông
    [T.ended - 0.15, (t, X) => { S.photoBg(IM.p_armistice, t, { desat: 0.5, dark: 0.15, push: 0.02, credit: 'Photo: US Army Signal Corps, Compiègne 1918 · public domain' });
      S.nameTag('COMPIÈGNE · 11 NOV 1918', clamp(t / 0.3), 96, 975); S.stamp('WAR ENDS', 1380, 200, 70, clamp((t - 0.1) / 0.5), 0.05); }],
  ];

  // ───────── cảnh dài (tách hàm cho dễ đọc) ─────────
  function B_palace() { g.save(); g.lineWidth = 9; g.strokeStyle = INK; const gr = g.createLinearGradient(0, 0, 0, 700); gr.addColorStop(0, '#7FB3DE'); gr.addColorStop(1, '#CFE4F2'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#F0D27A'; g.fillRect(80, 330, 1760, 530); g.strokeRect(80, 330, 1760, 530); g.fillStyle = '#4C7A6A'; g.beginPath(); g.moveTo(60, 330); g.lineTo(200, 250); g.lineTo(1720, 250); g.lineTo(1860, 330); g.closePath(); g.fill(); g.stroke();
    for (let c = 0; c < 16; c++) for (let r = 0; r < 3; r++) { g.fillStyle = '#2A2D33'; g.fillRect(130 + c * 108, 380 + r * 150, 46, 90); g.strokeRect(130 + c * 108, 380 + r * 150, 46, 90); }
    g.fillStyle = '#A8A296'; g.fillRect(0, 860, W, 220); g.beginPath(); g.moveTo(0, 860); g.lineTo(W, 860); g.stroke(); g.restore(); }

  function lunch(t, X) { diningRoom();
    const up = X > T.support, kf = C.folk(520, 900, 480, { ...KAISER, arm: up ? 'up' : null, eyes: X > T.worry ? 'happy' : 'dot', mouth: X > T.doit && X < T.blank ? 'grin' : null, look: 1 });
    const amb = ambassador(1440, 900, 480, { eyes: X > T.blank ? 'shock' : 'dot' });
    // người dẫn #6: người hầu ĐỨNG sau lưng Kaiser (đế khuất sau bàn → cao hơn người ngồi), cỡ ~ người ngồi; tay phải cầm chai sâm-panh rót
    const shock = X > T.worry; narrator(800, 744, 440, { v: 'A', outfit: 'waiter', arms: 'point', mood: X > T.blank ? 'shock' : 'smug', mouth: shock ? 'wide' : 'rest', look: X > T.blank ? -1 : 1 });
    g.save(); g.translate(990, 556); g.rotate(-1.9); g.fillStyle = '#2F5A3C'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(-20, -26, 120, 52, 12); g.fill(); g.stroke();
    g.fillStyle = '#D9B13B'; g.fillRect(-58, -10, 42, 20); g.strokeRect(-58, -10, 42, 20); g.fillStyle = '#F4F1E8'; g.fillRect(20, -20, 50, 40); g.restore();
    g.strokeStyle = '#E8D27A'; g.lineWidth = 6; g.beginPath(); g.moveTo(1012, 618); g.lineTo(1014, 690); g.stroke();
    tableFront(); for (const px of [520, 1440]) { g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.ellipse(px, 738, 90, 16, 0, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = 'rgba(200,230,255,0.6)'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(992, 680); g.lineTo(1036, 680); g.lineTo(1022, 716); g.lineTo(1006, 716); g.closePath(); g.fill(); g.stroke(); g.fillRect(1011, 716, 6, 14);
    g.fillStyle = '#F2DE8A'; g.fillRect(998, 690, 32, 22);
    if (shock) { const u = clamp((X - T.worry) / 0.6); g.fillStyle = 'rgba(242,222,138,0.9)'; g.strokeStyle = INK; g.lineWidth = 3; for (let i = 0; i < 5; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 4); g.beginPath(); g.arc(1014 + Math.cos(a) * 50 * u, 680 + Math.sin(a) * 40 * u, 7, 0, 7); g.fill(); g.stroke(); } }
    // bong bóng Kaiser
    if (X < T.blank - 0.1) { if (X < T.support) bubble(g, 'Do whatever you need.', 420, 330, 500, 390, kk(X, T.doit, 0.25), 40); else bubble(g, "We'll support you!", 420, 330, 500, 390, kk(X, T.support, 0.25), 44); }
    // séc trắng khổng lồ
    const kc = kk(X, T.blank - 0.15, 0.35); if (kc > 0) { g.save(); g.translate(960, 205 - (1 - easeOut(kc)) * 500); g.rotate(-0.02);
      g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-480, -115, 980, 250); g.fillStyle = '#E8F1E4'; g.fillRect(-490, -125, 980, 250); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(-490, -125, 980, 250);
      text('BANK OF THE KAISER', -460, -92, 30, '#2F5A3C', { align: 'left' }); text('PAY TO: AUSTRIA-HUNGARY', -460, -30, 40, INK, { align: 'left', w: 800 });
      text('AMOUNT:', -460, 40, 40, INK, { align: 'left', w: 800 }); g.strokeStyle = '#7A8A7A'; g.lineWidth = 4; g.beginPath(); g.moveTo(-290, 60); g.lineTo(80, 60); g.moveTo(170, 90); g.lineTo(460, 90); g.stroke();
      g.save(); g.font = 'italic 600 46px Archivo, sans-serif'; g.fillStyle = '#1F3F8F'; g.textAlign = 'center'; g.fillText('Wilhelm II', 315, 80); g.restore(); g.restore();
      S.stamp('BLANK CHECK', 700, 330, 56, kk(X, T.check, 0.5), -0.08); }
    // thẻ tín dụng trong tay Kaiser
    const kd = kk(X, T.card - 0.1, 0.3); if (kd > 0) { g.save(); g.translate(670, 520); g.rotate(-0.25); const s = back(kd); g.scale(s, s); g.fillStyle = '#E2B53B'; g.strokeStyle = INK; g.lineWidth = 5;
      g.beginPath(); g.roundRect(-85, -54, 170, 108, 12); g.fill(); g.stroke(); g.fillStyle = '#C9A13B'; g.fillRect(-60, -20, 36, 28); g.strokeRect(-60, -20, 36, 28); text('NO LIMIT', 10, 32, 22, INK); g.restore(); }
    if (shock) bubble(g, "Don't worry about it.", 300, 440, 470, 480, kk(X, T.worry, 0.25), 36);
    dateCard('POTSDAM', '5 JULY', 1760, 120, 1, 0.7); }

  function cruise(t, X) { const gr = g.createLinearGradient(0, 0, 0, 600); gr.addColorStop(0, '#5FA4DA'); gr.addColorStop(1, '#CFE7F5'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#6E8A7A'; g.beginPath(); g.moveTo(0, 600); g.lineTo(220, 330); g.lineTo(420, 480); g.lineTo(640, 300); g.lineTo(900, 600); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(1100, 600); g.lineTo(1400, 280); g.lineTo(1600, 420); g.lineTo(1760, 340); g.lineTo(1960, 600); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#FFF'; for (const [x, y] of [[640, 300], [1400, 280]]) { g.beginPath(); g.moveTo(x - 50, y + 55); g.lineTo(x, y); g.lineTo(x + 50, y + 55); g.closePath(); g.fill(); }
    g.fillStyle = '#3F6E96'; g.fillRect(0, 600, W, 180); g.strokeStyle = '#FFF'; g.lineWidth = 5; for (let i = 0; i < 12; i++) { const x = hash(i + 5) * W, y = 630 + hash(i + 6) * 130; g.beginPath(); g.moveTo(x + Math.sin(X * 2 + i) * 20, y); g.lineTo(x + 70 + Math.sin(X * 2 + i) * 20, y); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#C79A64'; g.fillRect(0, 780, W, 300); g.beginPath(); g.moveTo(0, 780); g.lineTo(W, 780); g.stroke();
    for (let x = 0; x < W; x += 160) { g.beginPath(); g.moveTo(x, 780); g.lineTo(x, 700); g.stroke(); } g.beginPath(); g.moveTo(0, 700); g.lineTo(W, 700); g.stroke();
    g.strokeStyle = '#A07A4A'; g.lineWidth = 4; for (let y = 820; y < H; y += 50) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    // ghế boong + Kaiser ngả lưng
    g.strokeStyle = INK; g.lineWidth = 9; g.fillStyle = '#F0E6CF'; g.beginPath(); g.moveTo(700, 1000); g.lineTo(820, 640); g.lineTo(900, 650); g.lineTo(820, 900); g.lineTo(1260, 900); g.lineTo(1260, 950); g.lineTo(760, 960); g.closePath(); g.fill(); g.stroke();
    for (const lx of [760, 1220]) { g.beginPath(); g.moveTo(lx, 955); g.lineTo(lx, 1030); g.stroke(); }
    g.save(); g.translate(900, 960); g.rotate(-0.38); g.translate(-900, -960); const f = C.folk(900, 960, 480, { ...KAISER, mouth: 'grin' }); shades(f.head[0], f.head[1] + f.r * 0.05, f.r, kk(X, T.like, 0.4)); g.restore();
    g.save(); g.translate(1130, 820); g.fillStyle = 'rgba(255,200,120,0.85)'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(-34, -60); g.lineTo(34, -60); g.lineTo(0, 0); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 60); g.moveTo(-28, 60); g.lineTo(28, 60); g.stroke(); g.fillStyle = '#E3141B'; g.beginPath(); g.moveTo(10, -60); g.lineTo(30, -110); g.stroke(); g.beginPath(); g.ellipse(30, -112, 34, 14, -0.3, Math.PI, 0); g.fill(); g.stroke(); g.restore();
    S.label('NORWAY, JULY 1914', 960, 120, 56, clamp(t / 0.3), '#FFF', { stroke: INK }); }

  function belgrade(t, X) { office();
    const L = X < T.ult ? 0 : ease((X - T.ult) / 1.4) * 1100;
    const mark = X < T.accepted ? null : i => { if (i === 5) return X > T.refused ? 'no' : null; const tt = T.accepted + (i < 5 ? i : i - 1) * 0.2; if (X < tt) return null; return X > T.cond && (i === 2 || i === 6 || i === 8) ? 'cond' : 'ok'; };
    const nod = X > T.accepted && X < T.refused ? Math.abs(Math.sin((X - T.accepted) * 7)) * 14 : 0;
    const mood = X > T.refused ? 'angry' : X > T.ult ? 'shock' : 'smug';
    narrator(700, 900, 520, { outfit: 'serb', mood, mouth: X > T.refused ? 'grit' : X > T.ult ? 'o' : 'rest', arms: X > T.refused ? 'point' : 'rest', bob: nod, look: 1 });
    if (X > T.ult + 0.6) for (let i = 0; i < 3; i++) { const u = ((X * 0.9 + i * 0.33) % 1); S.sweat(700 + (i - 1) * 150 + (i === 1 ? 165 : 0), 470 - nod + u * 60 + (i === 1 ? 40 : 0), 1.3); }
    desk(); scroll(L, mark, X); clock48(X, T.h48);
    dateCard('BELGRADE', '23 JULY', 230, 600, kk(X, T.july23 - 0.1), 0.85); }

  function treatyDesk(t, X, phase) { g.fillStyle = '#7A5236'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(40,20,10,0.25)'; g.lineWidth = 5;
    for (let i = 0; i < 16; i++) { g.beginPath(); g.moveTo(0, 40 + i * 70); for (let x = 0; x <= W; x += 120) g.lineTo(x, 40 + i * 70 + 10 * Math.sin(x / 200 + i)); g.stroke(); }
    // Anh (trái) che chở Bỉ nhỏ
    const ukMood = phase === 1 ? (X > T.paper ? 'shock' : 'angry') : X > T.treaty ? 'smug' : 'calm';
    cutout(g, M, BE, 640, 980, 190, { mood: phase === 1 ? 'shock' : 'calm', arms: 'down', t: X }); cutout(g, M, UK, 380, 980, 430, { mood: ukMood, arms: phase === 1 ? 'up' : 'hips', t: X });
    const paperAt = (cx, cy, c, rot) => { g.save(); g.translate(cx, cy); g.rotate(rot); const w = 560 * (1 - 0.82 * c), h = 700 * (1 - 0.86 * c);
      g.fillStyle = '#F3E6C4'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath();
      for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, rx = w / 2, ry = h / 2, sq = Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a))) || 1; const j = 1 + c * 0.35 * (hash(i + 9) - 0.5);
        g.lineTo(Math.cos(a) / sq * rx * j, Math.sin(a) / sq * ry * j); } g.closePath(); g.fill(); g.stroke();
      if (c < 0.3) { g.globalAlpha = 1 - c / 0.3; text('TREATY OF LONDON', 0, -270, 40, '#5A2E1E'); text('1839', 0, -200, 64, '#5A2E1E'); text('BELGIUM SHALL', 0, -110, 36, INK); text('STAY NEUTRAL', 0, -66, 36, INK);
        g.strokeStyle = '#A8997A'; g.lineWidth = 5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-200, 0 + i * 40); g.lineTo(150 + 40 * hash(i), 0 + i * 40); g.stroke(); }
        g.fillStyle = RED; g.beginPath(); g.arc(150, 260, 44, 0, 7); g.fill(); text('GB', 150, 262, 30, '#FFF'); g.save(); g.font = 'italic 600 34px Archivo'; g.fillStyle = '#1F3F8F'; g.fillText('Britain', -180, 270); g.restore(); }
      else { g.strokeStyle = '#B8A985'; g.lineWidth = 4; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo((hash(i) - 0.5) * w * 0.8, (hash(i + 2) - 0.5) * h * 0.8); g.lineTo((hash(i + 4) - 0.5) * w * 0.8, (hash(i + 6) - 0.5) * h * 0.8); g.stroke(); } }
      g.restore(); };
    if (phase === 0) { const k = kk(X, T.treaty - 0.2, 0.35); if (k > 0) { g.save(); g.translate(0, (1 - easeOut(k)) * -800); paperAt(1250, 520, 0, 0.03); g.restore(); } S.stamp('PROTECTED', 640, 560, 44, kk(X, T.treaty + 0.4, 0.5), -0.1); }
    else { const c = ease(kk(X, T.paper - 0.05, 0.4)), u = clamp((X - T.paper - 0.5) / 0.7); const bx = lerp(1250, 1640, u), by = 520 + (u > 0 ? -380 * Math.sin(u * Math.PI) + u * 420 : 0);
      // sọt rác
      g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#7C7F86'; g.beginPath(); g.moveTo(1530, 820); g.lineTo(1750, 820); g.lineTo(1720, 1040); g.lineTo(1560, 1040); g.closePath(); g.fill(); g.stroke(); g.restore();
      if (u < 1) paperAt(bx, by, c, 0.03 + u * 6); else { g.save(); g.beginPath(); g.rect(1500, 0, 300, 830); g.clip(); paperAt(1640, 860, 1, 0); g.restore(); }
      S.label('"A SCRAP OF PAPER"', 1100, 150, 74, kk(X, T.scrap), '#FFF', { stroke: INK }); S.label('— German chancellor', 1100, 230, 38, kk(X, T.scrap + 0.3), '#F3E6C4'); } }

  function cafeteria(t, X) { cafeWall();
    const rise = (i) => { const k = kk(X, T.table + i * 0.1, 0.35); return easeOut(k) * 150 + (k > 0 ? Math.abs(Math.sin((X - T.table) * 8 + i)) * 10 : 0); };
    const angry = X > T.table;
    // Serbia (đứa nhỏ đứng giữa lối đi)
    const hit = X > T.punch; g.save(); if (hit) { const a = -0.35 * easeOut(clamp((X - T.punch) / 0.2)); g.translate(940, 1000); g.rotate(a); g.translate(-940, -1000); }
    cutout(g, M, RS, 940, 1000, 210, { mood: hit ? 'shock' : 'calm', arms: hit ? 'up' : 'down', t: X }); g.restore();
    if (hit && X < T.punch + 0.35) S.flash(1010, 790, (X - T.punch) / 0.35, 120);
    // bàn trái: Anh, Pháp, Nga
    [[UK, 240, 240], [FR, 480, 270], [RU, 750, 290]].forEach(([n, x, h], i) => cutout(g, M, n, x, 860 - rise(i), h, { mood: angry ? 'angry' : 'calm', arms: angry ? 'up' : 'cross', t: X, look: [0.6, 0] }));
    // bàn phải: Đức, Áo-Hung (đấm), Ý ngồi mép nhìn ra cửa
    cutout(g, M, DE, 1490, 860 - rise(3), 260, { mood: angry ? 'angry' : 'smug', arms: angry ? 'up' : 'cross', t: X, look: [-0.6, 0] });
    cutout(g, M, IT, 1770, 860 - rise(4) * 0.4, 230, { mood: angry ? 'shock' : 'calm', arms: 'down', t: X, look: [1, 0] });
    if (X > T.threw - 0.1) { const p = clamp((X - T.threw) / (T.punch - T.threw)); S.boxer(AH, 1170, 860 - 150 * easeOut(kk(X, T.threw - 0.1, 0.25)), 260, X, { dir: -1, punch: p, hop: 0, mood: 'angry' }); }
    else cutout(g, M, AH, 1170, 860, 260, { mood: 'smug', arms: 'cross', t: X, look: [-1, 0.3] });
    cafeTable(90, 900); cafeTable(1030, 1880);
    if (hit) S.label('POW!', 1060, 640, 90, kk(X, T.punch, 0.2), RED, { stroke: '#FFF', rot: -0.15 }); }

  function chat(t, X) { g.fillStyle = '#1C1F26'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#ECE5DD'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(400, 70, 1120, 950, 36); g.fill(); g.stroke();
    g.fillStyle = '#3B4A5E'; g.beginPath(); g.roundRect(400, 70, 1120, 130, [36, 36, 0, 0]); g.fill();
    const avatar = (x, y, o, bg) => { g.save(); g.beginPath(); g.arc(x, y, 44, 0, 7); g.fillStyle = bg; g.fill(); g.clip(); C.folk(x, y + 108, 150, o); g.restore(); g.strokeStyle = '#FFF'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 44, 0, 7); g.stroke(); };
    avatar(480, 135, KAISER, '#9AA7B8'); avatar(1440, 135, { coat: 'tsarcoat', feat: 'tsar' }, '#9AB89F'); text('Willy & Nicky', 960, 120, 48, '#FFF'); text('2 cousins · July 1914', 960, 168, 26, '#C9D2DE', { w: 600 });
    const MSG = [[0, 'Nicky, please don\'t mobilize.', T.tele], [1, 'Willy, then stop Austria.', T.signed], [0, 'pls. no war.', T.polite], [1, 'you first.', T.beg + 0.2], [0, 'no, YOU first.', T.war17]];
    MSG.forEach(([side, txt, ta], i) => { const k = kk(X, ta, 0.25); if (k <= 0) return; const y = 270 + i * 140; g.save(); g.font = F(800, 42); const w = g.measureText(txt).width + 70, x = side ? 1480 - w : 440;
      g.globalAlpha = clamp(k * 2); g.translate(x + (side ? w : 0), y); g.scale(back(k), back(k)); g.translate(-(side ? w : 0), 0);
      g.fillStyle = side ? '#DCF5C6' : '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.roundRect(0, -50, w, 110, 22); g.fill(); g.stroke();
      text(side ? '— Nicky' : '— Willy', side ? w - 24 : 24, -28, 24, side ? '#2F7A3C' : '#3B5A8A', { align: side ? 'right' : 'left', w: 700 }); text(txt, 35, 16, 42, INK, { align: 'left', w: 800 }); g.restore(); });
    S.stamp("IT DIDN'T WORK", 960, 965, 62, kk(X, T.didnt, 0.5), -0.05); }

  function crowdScene(t, X, after) {
    const k = after ? clamp(t / 0.5) : 0;
    const city = X > T.london ? 'LONDON' : X > T.paris ? 'PARIS' : 'BERLIN', ct = X > T.london ? T.london : X > T.paris ? T.paris : T.berlin + 0.5;
    berlin(city);
    C.crowd(40, 1880, 1060, 300, X, { rows: 3, cheer: !after, skip: [1250], flagCols: ['#F4F1E8'], seed: 3 });
    // người dẫn #8: tung mũ ở "cheered", sau đó vẫy; "not over" → mặt méo
    const tHat = T.berlin + 0.8, thrown = X > tHat, hx = 1250, hy = 1060 - 320 * 0.42 - 320 * 0.29 * 0.78;
    narrator(hx, 1060, 320, { v: 'B', outfit: thrown ? 'plain' : 'bowler', arms: after ? 'rest' : thrown ? 'wave' : 'rest', mood: after ? 'sad' : thrown ? 'closed' : 'smug', mouth: after ? 'grit' : thrown ? 'wide' : 'rest', t: X,
      bob: after ? 0 : Math.max(0, Math.sin(X * 7)) * 10 });
    if (thrown && !after) { const u = X - tHat; if (u < 1.6) bowlerHat(hx + 180 * u, hy - 90 - 1500 * u + 520 * u * u, 1.15, u * 9); }
    if (!after) { S.label(city, 960, 140, 100, kk(X, ct, 0.25), '#FFF', { stroke: INK }); S.label('AUGUST 1914', 960, 225, 40, clamp(t / 0.3), INK);
      bubble(g, 'Over by Christmas!', 520, 560, 480, 760, kk(X, T.agreed, 0.25), 48); }
    if (after) { S.desat(k, 0.25);
      const years = [1914, 1915, 1916, 1917, 1918], u = (X - T.not) / 0.32, i = clamp(Math.floor(u), 0, 4), fr = u - Math.floor(u);
      const page = (y, last) => { g.fillStyle = '#FFF'; g.fillRect(-190, -210, 380, 420); g.fillStyle = RED; g.fillRect(-190, -210, 380, 110); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(-190, -210, 380, 420);
        text(last ? '11 NOVEMBER' : 'CHRISTMAS', 0, -155, last ? 40 : 48, '#FFF'); text(String(y), 0, 40, 130, INK); text(last ? 'WAR ENDS' : 'STILL AT WAR', 0, 150, 34, last ? '#2E9E4F' : RED); };
      g.save(); g.translate(960, 330); const s = back(clamp(t / 0.3)); g.scale(s, s); page(years[X < T.not ? 0 : i], X >= T.not && i === 4); g.restore();
      if (X > T.not && u < 4 && fr < 1) { g.save(); g.translate(960 + fr * 700, 330 + fr * 260); g.rotate(fr * 0.9); g.globalAlpha = 0.85 * (1 - fr); page(years[Math.max(0, i)], false); g.restore(); } } }

  function museum(t, X) { g.fillStyle = '#26282E'; g.fillRect(0, 0, W, H); g.fillStyle = '#34363C'; g.fillRect(0, 760, W, 320);
    const z = 1 + 1.6 * ease(kk(X, T.known, 1.4)), fx = 362, fy = 673;
    g.save(); g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy); g.translate((960 - fx) * (z - 1) / z * 0.9, (540 - fy) * (z - 1) / z * 0.9);
    const rg = g.createRadialGradient(960, 700, 50, 960, 700, 800); rg.addColorStop(0, 'rgba(255,240,200,0.35)'); rg.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(860, 885, 600, 40, 0, 0, 7); g.fill();
    C.car1914(860, 880, 1100);
    g.fillStyle = '#F7F4EA'; g.strokeStyle = '#111'; g.lineWidth = 5; g.beginPath(); g.roundRect(300, 652, 124, 42, 6); g.fill(); g.stroke(); text('A III 118', 362, 674, 24, '#111');
    for (const sx of [200, 960, 1720]) { g.fillStyle = '#C9A13B'; g.fillRect(sx - 8, 900, 16, 120); g.beginPath(); g.arc(sx, 900, 16, 0, 7); g.fill(); }
    g.strokeStyle = '#8E1B2C'; g.lineWidth = 10; g.beginPath(); g.moveTo(200, 920); g.quadraticCurveTo(580, 990, 960, 920); g.quadraticCurveTo(1340, 990, 1720, 920); g.stroke();
    g.restore();
    S.label('MILITARY MUSEUM, VIENNA', 960, 110, 50, clamp(t / 0.3) * clamp(1 - (X - T.known) / 0.3), '#E9D9A6');
    S.label('TODAY', 960, 175, 34, clamp(t / 0.3) * clamp(1 - (X - T.known) / 0.3), '#C9C2B0');
    S.lipHost(X, clamp(t / 0.3)); }
};
