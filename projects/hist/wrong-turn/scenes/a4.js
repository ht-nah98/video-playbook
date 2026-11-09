// hồi a4 — The plan falls apart (BRIEF-SCENES.md §a4). Tất định: mọi khung là hàm của X (giờ trang), mốc theo TỪ (wd).
// Bờ sông Appel vẽ (B.place('quay')) là sân khấu chung: đám đông vẫy cờ đen-vàng, xe vẽ C.car1914, người dẫn nhập vai #4
// (quả dưa, vẫy cờ) đứng CỐ ĐỊNH ở HOST — trước và sau vụ nổ cùng chỗ, cùng cỡ (bom nổ → núp tại chỗ).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { narrator } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { mistakes, SK, P } from './common.js';
const { W, H, RED, clamp, lerp, hash, easeOut, ease, back, label } = S;
const AHF = ['#151515', '#F3C61B'];
const HOST = [150, 835, 240];                 // người dẫn trong đám đông (x, yĐế, h) — giữ nguyên qua các cảnh bờ sông
const CABX = 340;                             // Čabrinović trong hàng đầu (cảnh ném bom)
const CY = 1040, CW = 1080, WR = CW * 0.13;   // xe: đáy bánh, dài, bán kính bánh

export default K => { const { g, IM, wd, ST } = K;
  const { ff, sophie, cabri, princip, cop, killer } = P;
  // ── người (kiểu B) ──
  const host = (X, o = {}) => narrator(HOST[0], HOST[1] - (o.duck ? 0 : Math.max(0, Math.sin(X * 7)) * 10), HOST[2],
    o.duck ? { outfit: 'bowler', arms: 'cover', mood: 'closed', mouth: 'grit', crouch: o.duck } : { outfit: 'bowler', arms: 'flag', mouth: 'grin', t: X, mood: o.mood });
  // ── xe ──
  function royalCar(x, X, o = {}) { return C.car1914(x, CY, CW, { flags: true, spin: x / WR, bob: o.bob ?? 0, seats: ([fx, fy], [bx, by]) => {
    C.folk(fx, fy + 80, 330, { skin: SK, coat: 'driver', wear: 'driver', eyes: o.drv ?? 'dot', sweat: o.drvSweat });
    ff(bx - 60, by + 70, 360, { arm: o.wave === false ? null : 'up', eyes: o.ffEyes ?? 'dot', mouth: o.ffMouth, look: o.look ?? 0 });
    sophie(bx + 130, by + 70, 340, { eyes: o.soEyes ?? 'dot', look: o.look ?? 0 }); } }); }
  function otherCar(x, X, o = {}) { return C.car1914(x, CY, CW, { spin: x / WR, bob: o.bob ?? 0, col: o.col ?? '#2A2D33', seats: ([fx, fy], [bx, by]) => {
    C.folk(fx, fy + 80, 330, { skin: SK, coat: 'driver', wear: 'driver', eyes: o.eyes ?? 'dot' });
    C.folk(bx - 40, by + 70, 350, { skin: SK, coat: 'austro', wear: 'kepi', eyes: o.eyes ?? 'dot' });
    C.folk(bx + 140, by + 70, 340, { skin: SK, coat: 'suit', wear: 'top', eyes: o.eyes ?? 'dot' }); } }); }
  const roofOf = x => [x + CW * 0.38, CY - WR * 1.1 - CW * 0.34 * 0.55 + CW * 0.34 * 0.12];   // mui gập (car1914)
  // ── đồ vẽ ──
  function speedLines(x0, x1, y0, y1, X, n = 10, a = 0.75) { g.save(); g.strokeStyle = `rgba(255,255,255,${a})`; g.lineWidth = 6; g.lineCap = 'round';
    for (let i = 0; i < n; i++) { const y = y0 + (y1 - y0) * hash(i + 3), L = 120 + 200 * hash(i + 8), x = x0 + ((hash(i + 1) * (x1 - x0) + X * 1600) % (x1 - x0));
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + L, y); g.stroke(); } g.restore(); }
  function bomb(x, y, r, X, o = {}) { g.save(); g.translate(x, y); g.rotate(o.rot ?? 0); g.fillStyle = '#17171A'; g.strokeStyle = INK; g.lineWidth = 4;
    g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.fillStyle = '#4A4A50'; g.fillRect(-r * 0.3, -r * 1.25, r * 0.6, r * 0.4);
    if (o.cap !== false) { g.fillStyle = '#9A9AA2'; g.fillRect(-r * 0.36, -r * 1.42, r * 0.72, r * 0.2); }
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.beginPath(); g.arc(-r * 0.35, -r * 0.35, r * 0.25, 0, 7); g.fill();
    if (o.lit) { g.strokeStyle = '#7A5A3A'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, -r * 1.25); g.quadraticCurveTo(r * 0.5, -r * 1.8, r * 0.3, -r * 2.1); g.stroke();
      for (let i = 0; i < 7; i++) { const a = hash(i + Math.floor(X * 24)) * 6.3, d = r * (0.2 + 0.5 * hash(i + 7 + Math.floor(X * 24)));
        g.fillStyle = i % 2 ? '#FFD34D' : '#FF7A1A'; g.beginPath(); g.arc(r * 0.3 + Math.cos(a) * d, -r * 2.1 + Math.sin(a) * d, r * 0.12, 0, 7); g.fill(); } }
    g.restore(); }
  function lamppost(x, yBase, h) { g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#2E3238';
    g.fillRect(x - 14, yBase - h, 28, h); g.strokeRect(x - 14, yBase - h, 28, h); g.fillRect(x - 34, yBase - 50, 68, 50); g.strokeRect(x - 34, yBase - 50, 68, 50);
    g.fillStyle = '#F5E39A'; g.beginPath(); g.moveTo(x - 46, yBase - h); g.lineTo(x - 30, yBase - h - 90); g.lineTo(x + 30, yBase - h - 90); g.lineTo(x + 46, yBase - h); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#2E3238'; g.beginPath(); g.moveTo(x - 50, yBase - h - 90); g.lineTo(x, yBase - h - 130); g.lineTo(x + 50, yBase - h - 90); g.closePath(); g.fill(); g.stroke(); g.restore(); }
  function zoomQuay(z, cx, cy, o = {}) { g.save(); g.translate(W / 2, H / 2); g.scale(z, z); g.translate(-cx, -cy); B.place('quay'); g.restore(); if (o.dim) { g.fillStyle = `rgba(20,20,26,${o.dim})`; g.fillRect(0, 0, W, H); } }
  function dots(x, y, k) { if (k <= 0) return; bubble(g, '. . .', x, y, x - 60, y + 110, clamp(k), 76); }
  function crowdQuay(X, o = {}) { C.crowd(-60, 1980, 830, 240, X, { rows: 2, cheer: !o.panic, panic: o.panic, skip: [HOST[0], ...(o.skip ?? [])], flagCols: AHF, seed: 3, look: o.look }); }
  // riverbed nông (cảnh nhảy sông → bị đánh): đáy sỏi, nước tới mắt cá
  function riverbed(X) { zoomQuay(1.25, 960, 520); g.save(); g.fillStyle = '#6E9CC2'; g.fillRect(0, 760, W, 320); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke();
    g.fillStyle = '#9C8B6E'; g.fillRect(0, 955, W, 125); g.beginPath(); g.moveTo(0, 955); g.lineTo(W, 955); g.stroke();
    for (let i = 0; i < 40; i++) { g.fillStyle = ['#857659', '#B3A386', '#6F6450'][i % 3]; g.beginPath(); g.ellipse(hash(i + 50) * W, 975 + hash(i + 51) * 90, 14 + 16 * hash(i + 52), 8 + 6 * hash(i + 53), 0, 0, 7); g.fill(); }
    g.restore(); }
  function waterTop(X) { g.save(); g.fillStyle = 'rgba(110,156,194,0.72)'; g.fillRect(0, 905, W, 52); g.strokeStyle = '#FFFFFF'; g.lineWidth = 4;
    for (let i = 0; i < 12; i++) { const x = (hash(i + 70) * W + X * 30 * (hash(i) - 0.5)) % W; g.beginPath(); g.moveTo(x, 915 + 25 * hash(i + 71)); g.lineTo(x + 50, 915 + 25 * hash(i + 71)); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 905); g.lineTo(W, 905); g.stroke(); g.restore(); }
  function checkLine(txt, x, y, k, ok) { if (k <= 0) return; label(txt, x, y, 46, k, ok ? INK : '#8A8278', { align: 'left' });
    g.save(); g.globalAlpha = clamp(k * 3); g.lineWidth = 8; g.lineCap = 'round';
    if (ok) { g.strokeStyle = '#2E8B57'; g.beginPath(); g.moveTo(x - 62, y - 18); g.lineTo(x - 44, y); g.lineTo(x - 14, y - 40); g.stroke(); }
    else { g.strokeStyle = RED; g.beginPath(); g.moveTo(x - 60, y - 40); g.lineTo(x - 18, y); g.moveTo(x - 18, y - 40); g.lineTo(x - 60, y); g.stroke();
      g.font = '900 46px Archivo, sans-serif'; const tw = g.measureText(txt).width; const kk = clamp((k - 0.3) / 0.4); g.beginPath(); g.moveTo(x - 6, y - 16); g.lineTo(x + tw * kk, y - 16); g.stroke(); }
    g.restore(); }

  // ── mốc ──
  const P1 = 'Mistake number two was security', P2 = 'And in case any assassin', P3 = 'A little before ten', P4 = 'The first assassin saw',
    P5 = 'The third, Nedeljko', P6 = 'The bomb had a fuse', P7 = 'Chabrinovich then swallowed', P8 = 'Except the cyanide', P9 = 'So instead of a heroic',
    P10 = 'The motorcade sped off', P11 = 'At this point, the plan', P12 = 'Archduke safe';
  const T = { two: wd(P1, 'two'), hundred: wd(P1, 'hundred'), police: wd(P1, 'police'), lined: wd(P1, 'lined'),
    missed: wd(P2, 'missed'), printed: wd(P2, 'printed'), paper: wd(P2, 'newspaper'),
    ten: wd(P3, 'ten'), motorcade: wd(P3, 'motorcade'), river: wd(P3, 'river'), third: wd(P3, 'third'), top: wd(P3, 'top'), everyone: wd(P3, 'everyone'), look: wd(P3, 'look'),
    first: wd(P4, 'first'), car4: wd(P4, 'car'), nothing: wd(P4, 'nothing'), second: wd(P4, 'second'),
    ned: wd(P5, 'nedeljko'), asked: wd(P5, 'asked'), which: wd(P5, 'which'), helpful: wd(P5, 'helpful'), knocked: wd(P5, 'knocked'), lamppost: wd(P5, 'lamppost'), threw: wd(P5, 'threw'),
    fuse: wd(P6, 'fuse'), bounced: wd(P6, 'bounced'), roof: wd(P6, 'roof'), rolled: wd(P6, 'rolled'), exploded: wd(P6, 'exploded'), twenty: wd(P6, 'twenty'),
    swallowed: wd(P7, 'swallowed'), cyanide: wd(P7, 'cyanide'), jumped: wd(P7, 'jumped'), dramatic: wd(P7, 'dramatic'),
    old: wd(P8, 'old'), throwup: wd(P8, 'throw'), river8: wd(P8, 'river'), five: wd(P8, 'five'), deep: wd(P8, 'deep'),
    heroic: wd(P9, 'heroic'), stomach: wd(P9, 'stomachache'), wet: wd(P9, 'wet'), beating: wd(P9, 'beating'), police9: wd(P9, 'police'), dragged: wd(P9, 'dragged'),
    sped: wd(P10, 'sped'), rest: wd(P10, 'rest'), froze: wd(P10, 'froze'), lost: wd(P10, 'lost'), gav: wd(P10, 'gavrilo'), nineteen: wd(P10, 'nineteen'), watched: wd(P10, 'watched'), race: wd(P10, 'race'), past: wd(P10, 'past'),
    plan: wd(P11, 'plan'), failed: wd(P11, 'failed'),
    safe: wd(P12, 'safe'), scattered: wd(P12, 'scattered'), world: wd(P12, 'world'), cancelled: wd(P12, 'cancelled') };
  const at = (X, k, d = 0.25) => clamp((X - T[k]) / d);

  return [
    // 1 · "Mistake number two: security" — phố dài trống, 3 cảnh sát lạc lõng → đám đông tràn kín · không người dẫn · tiếng: ding bảng điểm ở "two", còi cảnh sát nhỏ ở "police", ồn đám đông ở "crowds"
    [ST(P1), (t, X) => { B.place('quay');
      const kc = clamp((X - T.lined + 0.1) / 0.45);
      if (kc > 0) { g.save(); g.translate(0, (1 - easeOut(kc)) * 380); C.crowd(-60, 1980, 830, 240, X, { rows: 3, cheer: true, flagCols: AHF, seed: 11, skip: [300, 960, 1620] }); g.restore(); }
      [300, 960, 1620].forEach((x, i) => { const k = clamp((X - T.hundred - i * 0.22) / 0.25); if (k <= 0) return;
        cop(x, 1010 + (1 - back(k)) * 300, 300, { eyes: kc > 0.5 ? 'shock' : 'dot', sweat: kc > 0.8, look: kc > 0.5 ? (i - 1) : 0 }); });
      if (X > T.hundred) { const n = Math.round(120 * clamp((X - T.hundred) / Math.max(0.4, T.police - T.hundred))); label(`${n} POLICE`, 1180, 200, 92, clamp((X - T.hundred) / 0.2), '#FFF', { stroke: INK }); }
      mistakes(X < T.two ? 1 : 2, clamp(t / 0.3) * clamp((T.two + 2.6 - X) / 0.3), X - T.two); }],

    // 2 · "route printed in the newspaper" — sát thủ bối rối → tờ báo in lộ trình đập vào → "Thanks!" · không người dẫn · tiếng: lật giấy ở "printed", ting ở "newspaper"
    [ST(P2), (t, X) => { g.fillStyle = '#5B4231'; g.fillRect(0, 0, W, H); for (let i = 0; i < 9; i++) { g.fillStyle = `rgba(0,0,0,${0.06 + 0.05 * hash(i)})`; g.fillRect(0, i * 120 + 40 * hash(i + 2), W, 6); }
      const kp = clamp((X - T.printed) / 0.3), happy = X > T.paper;
      killer(430, 1230, 1000, { eyes: happy ? 'happy' : X > T.missed ? 'shock' : 'dot', mouth: happy ? 'grin' : 'flat', look: kp > 0 ? 1 : 0 });
      if (kp < 1) { g.save(); g.translate(1080 - easeOut(kp) * 900, 700 + easeOut(kp) * 500); g.rotate(Math.PI + 0.08 + 0.03 * Math.sin(X * 3)); g.fillStyle = '#E3D9C2'; g.strokeStyle = INK; g.lineWidth = 5;   // bản đồ cầm NGƯỢC
        g.fillRect(-300, -210, 600, 420); g.strokeRect(-300, -210, 600, 420); g.fillStyle = '#7FB0D6'; g.fillRect(-300, 30, 600, 60); g.strokeStyle = '#9A9284'; g.lineWidth = 4;
        for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-300 + 130 * i + 40 * hash(i), -210); g.lineTo(-260 + 130 * i, 210); g.stroke(); }
        g.fillStyle = INK; g.font = '900 54px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('SARAJEVO', 0, -110); g.restore(); }
      if (X > T.missed && kp < 1) label('?', 700, 300, 160, clamp((X - T.missed) / 0.2), RED, { stroke: '#FFF' });
      if (kp > 0) { g.save(); g.translate(1230 + (1 - easeOut(kp)) * 900, 540); g.rotate(-0.05 + (1 - kp) * 0.3); g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-370, -400, 760, 830);
        g.fillStyle = '#F2ECDD'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-380, -415, 760, 830); g.strokeRect(-380, -415, 760, 830);
        g.fillStyle = INK; g.textAlign = 'center'; g.font = '900 64px Georgia, serif'; g.fillText('BOSNISCHE POST', 0, -330); g.fillRect(-340, -305, 680, 6); g.font = '500 22px Archivo, sans-serif'; g.fillText('SARAJEVO · JUNE 1914', 0, -276);
        g.font = '900 52px Archivo, sans-serif'; g.fillText("THE ARCHDUKE'S ROUTE", 0, -200);
        g.fillStyle = '#E3D9C2'; g.fillRect(-320, -160, 640, 330); g.strokeRect(-320, -160, 640, 330);
        g.fillStyle = '#7FB0D6'; g.fillRect(-320, 40, 640, 50); g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(-320, 40, 640, 50);
        g.strokeStyle = RED; g.lineWidth = 9; g.setLineDash([18, 10]); g.beginPath(); g.moveTo(-300, 20); g.lineTo(80, 20); g.lineTo(80, -130); g.stroke(); g.setLineDash([]);
        g.fillStyle = RED; g.beginPath(); g.moveTo(80, -150); g.lineTo(62, -118); g.lineTo(98, -118); g.closePath(); g.fill();
        g.fillStyle = '#9A9284'; for (let i = 0; i < 6; i++) { g.fillRect(-320, 200 + i * 30, i % 3 === 2 ? 380 : 640, 12); }
        if (happy) { const k2 = clamp((X - T.paper) / 0.3); g.strokeStyle = RED; g.lineWidth = 9; g.beginPath(); g.ellipse(0, 5, 380 * back(k2), 210 * back(k2), -0.04, 0, 7); g.stroke(); }
        g.restore(); }
      bubble(g, 'Thanks!', 520, 200, 470, 340, clamp((X - T.paper - 0.2) / 0.25), 50); }],

    // 3 · đoàn xe dọc sông: xe 1, 2 lướt qua, xe 3 (FF + Sophie, mui gập) vào giữa; người dẫn #4 vẫy cờ trong đám đông · tiếng: nhạc diễu hành + ồn đám đông, tiếng động cơ lúc "rolled", vòng đỏ "top", tâm ngắm "look" (tiếng chạm mỏng)
    [ST(P3), (t, X) => { B.place('quay'); const look = X > T.everyone ? 1 : 0; crowdQuay(X, { look }); host(X);
      const x1 = 2500 - 1100 * (X - T.motorcade + 0.3), x2 = 2500 - 1100 * (X - T.motorcade - 0.9);
      if (x1 > -700) otherCar(x1, X, { bob: Math.sin(X * 17) * 3 }); if (x2 > -700) otherCar(x2, X, { bob: Math.sin(X * 17 + 1) * 3, col: '#30343C' });
      const t3 = T.river + 0.9, x3 = X < T.third ? lerp(2700, 1000, easeOut((X - t3) / (T.third - t3))) : 1000 - 30 * (X - T.third);
      if (X > t3) royalCar(x3, X, { bob: Math.sin(X * 15) * 2, look: 1 });
      const ck = clamp(t / 0.3) * clamp((T.river + 0.5 - X) / 0.3);                                   // "a little before ten"
      if (ck > 0) { g.save(); g.globalAlpha = ck; g.translate(1540, 210); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 90, 0, 7); g.fill(); g.stroke();
        g.lineCap = 'round'; for (const [a, L, lw] of [[-Math.PI / 2 - 0.13 + 2 * Math.PI * (9.9 / 12), 50, 10], [-Math.PI / 2 + 2 * Math.PI * (55 / 60), 72, 7]]) { g.lineWidth = lw; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * L, Math.sin(a) * L); g.stroke(); }
        g.restore(); label('9:55 AM', 1340, 235, 70, ck, '#FFF', { stroke: INK, align: 'right' }); }
      if (X > T.third) label('CAR 3', x3 + 130, 390, 64, at(X, 'third', 0.2), '#FFF', { stroke: RED });
      if (X > T.top) { const [rx, ry] = roofOf(x3), k = at(X, 'top', 0.3); g.save(); g.strokeStyle = RED; g.lineWidth = 8; g.beginPath(); g.ellipse(rx, ry, 190 * back(k), 90 * back(k), -0.1, 0, 7); g.stroke(); g.restore();
        label('TOP DOWN', rx + 140, ry - 150, 54, k, '#FFF', { stroke: RED }); }
      if (X > T.look) { const k = at(X, 'look', 0.35), hx = x3 + CW * 0.2 - 60, hy = CY - WR * 1.1 - CW * 0.34 * 0.1 + 70 - 360 * 0.58 - 360 * 0.21 * 0.72;   // tâm ngắm trên đầu Thái tử
        g.save(); g.globalAlpha = 0.85 * k; g.strokeStyle = RED; g.lineWidth = 6; const r = lerp(220, 90, easeOut(k)); g.beginPath(); g.arc(hx, hy, r, 0, 7); g.stroke();
        g.beginPath(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { g.moveTo(hx + dx * r * 0.45, hy + dy * r * 0.45); g.lineTo(hx + dx * r * 1.3, hy + dy * r * 1.3); } g.stroke(); g.restore(); } }],

    // 4 · sát thủ 1 + 2: xe vụt qua trước mặt, đứng đơ "..." · không người dẫn · tiếng: vút xe ở "car", dế kêu ở "nothing", vút lần 2 ở "second"
    [ST(P4), (t, X) => { const two = X > T.second - 0.12, tc = two ? T.second - 0.1 : T.car4, ax = two ? 1250 : 680;
      zoomQuay(1.5, two ? 1240 : 700, 600);
      killer(ax, 1030, 640, { eyes: 'dot', look: two ? -1 : 1, wear: two ? 'cap' : 'bowler' });
      const bx = ax + (two ? -1 : 1) * 0.277 * 640; if (!two) bomb(ax + 0.2 * 640, 1030 - 0.5 * 640, 34, X, { rot: 0.2 });
      label(two ? 'ASSASSIN #2' : 'ASSASSIN #1', two ? 560 : 1340, 190, 72, clamp((X - (two ? T.second - 0.1 : T.first)) / 0.2), '#FFF', { stroke: INK });
      const u = (X - tc) / 0.75; if (u > 0 && u < 1) { const cx = lerp(2700, -900, u); for (let j = 3; j >= 0; j--) { g.save(); g.globalAlpha = j ? 0.2 : 1; g.translate(cx + j * 140, 0); g.scale(1.45, 1.45); g.translate(0, -300); otherCar(0, X, { col: '#1F2229' }); g.restore(); }
        speedLines(0, W, 700, 1060, X, 12, 0.9); }
      if (!two) dots(ax + 260, 380, (X - T.nothing) / 0.25); else dots(ax - 260, 380, (X - T.second - 0.3) / 0.25); }],

    // 5 · Čabrinović: ảnh tư liệu → hỏi cảnh sát "Which car?" → cảnh sát chỉ giúp → gõ nắp bom vào cột đèn → ném · không người dẫn · tiếng: CLINK kim loại ở "lamppost", xì ngòi, vút ném ở "threw"
    [ST(P5), (t, X) => {
      if (X < T.asked - 0.1) { S.paper('#1A1A1A'); S.photo(IM.s_cabri, 600, 520, 400, clamp(t / 0.25), { push: 1 + 0.02 * t, credit: 'Nedeljko Čabrinović · public domain' });
        label('ASSASSIN #3', 900, 400, 50, clamp((X - T.ned + 0.3) / 0.25), '#C9C2AE', { align: 'left' }); S.nameTag('NEDELJKO ČABRINOVIĆ, 19', clamp((X - T.ned) / 0.3), 900, 520); return; }
      if (X < T.knocked - 0.1) { zoomQuay(1.4, 960, 600); const ans = X > T.helpful;
        cabri(640, 1030, 600, { eyes: ans ? 'happy' : 'dot', mouth: ans ? 'grin' : null, look: 1 });
        cop(1280, 1030, 620, { eyes: ans ? 'happy' : 'dot', arm: ans ? 'up' : null, look: -1, mouth: ans ? 'grin' : null });
        bubble(g, 'Which car is the archduke in?', 700, 210, 640, 380, clamp((X - T.which + 0.5) / 0.25), 44);
        if (ans) bubble(g, 'That one! Third car!', 1250, 330, 1280, 470, clamp((X - T.helpful) / 0.25), 44); return; }
      zoomQuay(1.6, 900, 640); lamppost(1060, 1030, 760); cabri(720, 1030, 620, { arm: 'up', eyes: X > T.lamppost ? 'happy' : 'angry', look: 1 });
      const hand = [720 + 0.277 * 620, 1030 - 0.766 * 620];
      if (X < T.threw) { const back0 = clamp((X - T.knocked) / Math.max(0.3, T.lamppost - T.knocked - 0.25)), hit = clamp((X - T.lamppost + 0.25) / 0.25);
        const bx = lerp(lerp(hand[0], hand[0] - 70, ease(back0)), 1030, hit * (X < T.lamppost + 0.3 ? 1 : 1 - clamp((X - T.lamppost - 0.3) / 0.3))), by = hand[1] - 40;
        bomb(bx, by, 38, X, { lit: X > T.lamppost, cap: X < T.lamppost, rot: 0.3 });
        if (X > T.lamppost) { const u = X - T.lamppost; S.flash(1040, by, clamp(u / 0.3), 110); label('CLINK!', 1300, 300, 90, clamp(u / 0.15), '#FFF', { stroke: INK, rot: 0.08 });
          if (u < 1.2) { g.fillStyle = '#9A9AA2'; g.strokeStyle = INK; g.lineWidth = 3; g.save(); g.translate(1060 + u * 420, by - 60 - u * 300 + u * u * 500); g.rotate(u * 12); g.fillRect(-14, -5, 28, 10); g.strokeRect(-14, -5, 28, 10); g.restore(); } } }
      else { const u = (X - T.threw) / 0.45; if (u < 1) { bomb(lerp(hand[0], 2100, u), hand[1] - 40 - Math.sin(u * Math.PI) * 300, 38, X, { lit: true, cap: false, rot: u * 9 }); }
        speedLines(1100, W, 200, 600, X, 6, 0.6); } }],

    // 6 · bom nảy khỏi mui (BOING), lăn ra đường, nổ dưới xe sau; người dẫn #4 núp tại chỗ · tiếng: xì ngòi suốt, BOING ở "bounced", lăn sỏi ở "rolled", NỔ ở "exploded" + la hét, ù tai ở "twenty"
    [ST(P6), (t, X) => { const boom = X > T.exploded, [sx, sy] = S.shake(clamp((X - T.exploded) / 0.7), 28, X);
      g.save(); g.translate(sx, sy); B.place('quay'); crowdQuay(X, { panic: boom, skip: [CABX] });
      host(X, { duck: boom ? clamp((X - T.exploded) / 0.15) : 0 });
      cabri(CABX, 832, 250, { arm: X < T.bounced ? 'up' : null, eyes: X > T.bounced ? 'shock' : 'angry', look: 1 });
      const go = T.bounced + 0.25, xb = 900 - 30 * (go - T.fuse + 0.9), x3 = X < go ? 900 - 30 * (X - T.fuse + 0.9) : xb - 1500 * (X - go) ** 2;
      if (x3 > -700) royalCar(x3, X, { bob: Math.sin(X * 15) * 2, look: X > T.bounced ? 1 : -1, ffEyes: X > T.bounced ? 'shock' : 'dot', soEyes: X > T.bounced ? 'shock' : 'dot', wave: X < T.bounced, drv: X > T.bounced ? 'shock' : 'dot', drvSweat: X > T.bounced });
      if (x3 < 600 && X < T.exploded + 1) speedLines(x3 + 500, x3 + 1300, 700, 1000, X, 7, 0.8);
      const x4 = X < T.rolled - 0.5 ? 2600 : lerp(2600, 1680, easeOut((X - T.rolled + 0.5) / (T.exploded - T.rolled + 0.5)));
      if (x4 < 2550) otherCar(x4, X, { bob: boom ? -Math.max(0, 40 * Math.sin(clamp((X - T.exploded) / 0.5) * Math.PI)) : 0, eyes: boom ? 'shock' : 'dot' });
      // đường bom: ném (chậm) → mui → nảy → lăn
      const A = [CABX + 0.277 * 250, 832 - 0.766 * 250], R = roofOf(900 - 30 * (T.bounced - T.fuse + 0.9)), Q = [1450, 1000], E = [1560, 1000];
      if (!boom) { let p, rot = X * 6;
        if (X < T.bounced) { const u = clamp((X - (T.fuse - 0.9)) / (T.bounced - T.fuse + 0.9)); p = [lerp(A[0], R[0], u), lerp(A[1], R[1] - 20, u) - Math.sin(u * Math.PI) * 320]; }
        else if (X < T.rolled) { const u = clamp((X - T.bounced) / (T.rolled - T.bounced)); p = [lerp(R[0], Q[0], u), lerp(R[1] - 20, Q[1] - 30, u) - Math.sin(u * Math.PI) * 260]; }
        else { const u = clamp((X - T.rolled) / (T.exploded - T.rolled)); p = [lerp(Q[0], E[0], u), Q[1] - 30]; rot = u * 8; }
        bomb(p[0], p[1], 36, X, { lit: true, cap: false, rot });
        if (X > T.fuse - 0.2) label('FUSE: ~10 SECONDS', 1220, 190, 58, clamp((X - T.fuse + 0.2) / 0.25) * clamp((T.bounced - X) / 0.2), '#FFF', { stroke: INK });
        if (X > T.bounced && X < T.bounced + 0.9) label('BOING!', R[0] + 60, R[1] - 190, 96, clamp((X - T.bounced) / 0.12), '#FFF', { stroke: RED, rot: 0.12 }); }
      S.realBoom(E[0], E[1] - 20, 760, X - T.exploded, 7);
      if (X > T.exploded + 0.8) for (let i = 0; i < 6; i++) { const u = X - T.exploded - 0.8; g.fillStyle = `rgba(70,70,74,${0.45 * clamp(1 - u / 5)})`; g.beginPath(); g.arc(E[0] - 150 + 300 * hash(i), E[1] - 160 - 120 * hash(i + 4) - u * 25, 90 + 50 * hash(i + 2) + u * 12, 0, 7); g.fill(); }
      g.restore();
      if (X > T.twenty) label('~20 WOUNDED', 1340, 210, 74, at(X, 'twenty', 0.25), '#FFF', { stroke: INK }); }],

    // 7 · xyanua "*gulp*" → nhảy qua lan can, lơ lửng anh hùng giữa tia sáng "DRAMATIC EXIT" · không người dẫn · tiếng: gulp ở "cyanide", vút + nhạc hùng tráng (choir) ở "jumped"/"dramatic"
    [ST(P7), (t, X) => {
      if (X < T.jumped - 0.05) { zoomQuay(2.2, 900, 560, { dim: 0.15 }); const f = cabri(960, 1560, 1500, { eyes: X > T.cyanide + 0.3 ? 'shock' : 'angry', mouth: X > T.swallowed && X < T.cyanide + 0.3 ? 'o' : null });
        const k = clamp((X - T.swallowed) / Math.max(0.3, T.cyanide - T.swallowed)), [hx, hy] = f.head, my = hy + f.r * 0.42;
        if (k < 1) { g.save(); g.translate(lerp(1560, hx + 10, ease(k)), lerp(760, my, ease(k))); g.rotate(-0.4 * (1 - k)); g.fillStyle = '#E8F1EC'; g.strokeStyle = INK; g.lineWidth = 5;
          g.beginPath(); g.roundRect(-40, -80, 80, 140, 14); g.fill(); g.stroke(); g.fillStyle = '#2E8B57'; g.fillRect(-40, -20, 80, 40); g.fillStyle = '#FFF'; g.font = '900 20px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('CYANIDE', 0, 8); g.restore(); }
        else label('*gulp*', 1450, 470, 110, clamp((X - T.cyanide) / 0.2), '#FFF', { stroke: INK, rot: 0.1 }); return; }
      const u = X - T.jumped; g.fillStyle = '#F2C94C'; g.fillRect(0, 0, W, H);
      g.save(); g.translate(960, 560); g.rotate(u * 0.25); for (let i = 0; i < 18; i++) { g.fillStyle = i % 2 ? '#F7DA7A' : '#EBB33A'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 1600, i * Math.PI / 9, (i + 1) * Math.PI / 9); g.closePath(); g.fill(); } g.restore();
      g.fillStyle = '#6E9CC2'; g.fillRect(0, 900, W, 180); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 900); g.lineTo(W, 900); g.stroke();
      const k = easeOut(clamp(u / 0.6)), x = lerp(300, 960, k), y = lerp(980, 820, k) - 20 * Math.sin(u * 2);
      cabri(x, y, 520, { arm: 'up', eyes: 'happy', mouth: 'grin', tilt: lerp(0, -0.5, k) });
      for (let i = 0; i < 8; i++) { const a = i * 0.785 + u * 0.8, r = 330 + 30 * Math.sin(u * 5 + i); label('✦', x + Math.cos(a) * r, y - 300 + Math.sin(a) * r * 0.7, 48, 1, '#FFF', { stroke: INK, free: true }); }
      label('DRAMATIC EXIT', 960, 170, 104, clamp((X - T.dramatic) / 0.25), '#FFF', { stroke: INK }); }],

    // 8 · xyanua quá đát "EXPIRED" → xanh mặt nôn → rơi xuống sông… nước tới mắt cá "5 INCHES" · không người dẫn · tiếng: dấu đóng ở "old", ọe ở "throw up", rơi + bõm nhỏ ở "river", thước kéo ở "five"
    [ST(P8), (t, X) => {
      if (X < T.river8 - 0.1) { S.paper('#E9E2CF'); const sick = X > T.throwup;
        g.save(); g.translate(560, 560); g.rotate(-0.08); g.fillStyle = '#D5DDD3'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(-110, -200, 220, 360, 26); g.fill(); g.stroke();
        g.fillStyle = '#7B8B6E'; g.fillRect(-110, -60, 220, 110); g.fillStyle = '#FFF'; g.font = '900 38px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('CYANIDE', 0, 8);
        g.strokeStyle = '#B8B0A0'; g.lineWidth = 2; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-110, -200); g.lineTo(-110 + 40 * Math.cos(i * 0.3), -200 + 40 * Math.sin(i * 0.3 + 0.2) + i * 8); g.stroke(); }
        g.fillStyle = 'rgba(120,100,70,0.35)'; for (let i = 0; i < 30; i++) g.fillRect(-100 + 200 * hash(i), -190 + 340 * hash(i + 9), 5, 5); g.restore();
        S.stamp('EXPIRED', 560, 560, 80, clamp((X - T.old) / 0.35), -0.2);
        cabri(1320, 1320, 1150, { skin: sick ? '#B9D98A' : SK, eyes: sick ? 'cry' : 'dot', mouth: sick ? 'frown' : 'flat', sweat: sick, look: -1 });
        if (sick) label('BLEH', 1660, 320, 96, clamp((X - T.throwup) / 0.2), '#5E8C2E', { stroke: '#FFF', rot: 0.12 }); return; }
      riverbed(X); const u = X - T.river8, y = lerp(-200, 945, clamp(u / 0.45) ** 2);
      cabri(760, y, 520, { skin: '#B9D98A', eyes: X > T.deep ? 'bored' : 'shock', mouth: 'flat', arm: u < 0.45 ? 'up' : null });
      waterTop(X);
      if (u > 0.45 && u < 1.3) { const k = (u - 0.45) / 0.85; g.fillStyle = `rgba(160,200,230,${1 - k})`; for (let i = 0; i < 8; i++) { const a = Math.PI + i * Math.PI / 7; g.beginPath(); g.arc(760 + Math.cos(a) * 160 * k, 925 + Math.sin(a) * 120 * k + 200 * k * k, 10, 0, 7); g.fill(); }
        label('*splash?*', 760, 330, 64, clamp((u - 0.45) / 0.15), '#FFF', { stroke: INK }); }
      if (X > T.five - 0.1) { const k = clamp((X - T.five + 0.1) / 0.3), R = 230 * back(k), cx = 1330, cy = 600;   // kính lúp: mắt cá + thước 5 inch
        g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.globalAlpha = clamp(k * 3); g.beginPath(); g.moveTo(880, 930); g.lineTo(cx - R * 0.8, cy + R * 0.6); g.stroke();
        g.beginPath(); g.arc(cx, cy, R, 0, 7); g.save(); g.clip(); g.translate(cx, cy); g.scale(3.2, 3.2); g.translate(-880, -925);
        riverbed(X); cabri(760, 945, 520, { skin: '#B9D98A', eyes: 'shock', mouth: 'flat' }); waterTop(X);
        g.fillStyle = '#F2C94C'; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(890, 907, 12, 38); g.strokeRect(890, 907, 12, 38);
        for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(890, 945 - i * 7.6); g.lineTo(896, 945 - i * 7.6); g.stroke(); } g.restore();
        g.lineWidth = 12; g.strokeStyle = INK; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke(); g.restore();
        label('5 INCHES', cx, cy - 280, 84, k, RED, { stroke: '#FFF' }); } }],

    // 9 · không chết anh hùng: danh sách ✗ HEROIC DEATH → ✓ STOMACHACHE ✓ WET PANTS ✓ BEATING → cảnh sát lôi đi · không người dẫn · tiếng: ✗ buzz ở "heroic", ✓ ding ×3 (stomachache, wet, beating), đấm bụp ở "beating", kéo lê ở "dragged"
    [ST(P9), (t, X) => { riverbed(X); const drag = clamp((X - T.dragged) / 0.9), cx = lerp(640, -300, ease(drag)), beat = X > T.beating && X < T.dragged;
      if (X > T.police9 - 0.1) for (const s of [-1, 1]) cop(cx + s * 170 - 20, 945, 520, { eyes: 'angry', look: -1, arm: 'up' });
      if (!beat) cabri(cx, 945, 520, { skin: '#B9D98A', eyes: X > T.dragged ? 'cry' : 'bored', mouth: 'frown', tilt: drag > 0 ? -0.25 : 0 });
      if (X > T.wet && !beat) { g.save(); g.fillStyle = 'rgba(40,60,90,0.45)'; g.fillRect(cx - 105, 945 - 130, 210, 130); g.restore(); }
      if (beat) { const u = X - T.beating; for (let i = 0; i < 9; i++) { const a = i * 0.7 + u * 3, r = 120 + 40 * Math.sin(u * 9 + i); g.fillStyle = i % 2 ? '#D8D2C2' : '#BDB6A4'; g.strokeStyle = INK; g.lineWidth = 5;
          g.beginPath(); g.arc(cx + Math.cos(a) * r * 0.9, 740 + Math.sin(a) * r * 0.7, 110, 0, 7); g.fill(); g.stroke(); }
        for (let i = 0; i < 5; i++) { const ph = (u * 3 + i / 5) % 1; label(['★', '✶', 'POW', '★', 'BAM'][i], cx + 260 * Math.cos(i * 1.3 + u), 640 + 180 * Math.sin(i * 1.9 + u * 2), i % 2 ? 50 : 64, 1, i % 2 ? '#F2C94C' : RED, { stroke: INK, free: true }); }
        C.folk(cx - 300, 945, 500, { wear: 'fez', eyes: 'angry', arm: 'up' }); C.folk(cx + 290, 945, 480, { wear: 'cap', eyes: 'angry', arm: 'up' }); }
      waterTop(X);
      const k0 = clamp(t / 0.3); if (k0 > 0) { g.save(); g.globalAlpha = k0; g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 6; g.translate(1190, 200); g.rotate(0.02);
        g.fillRect(0, 0, 620, 540); g.strokeRect(0, 0, 620, 540); g.restore(); }
      checkLine('HEROIC DEATH', 1290, 300, at(X, 'heroic', 0.5), false); checkLine('STOMACHACHE', 1290, 420, at(X, 'stomach'), true);
      checkLine('WET PANTS', 1290, 540, at(X, 'wet'), true); checkLine('A BEATING', 1290, 660, at(X, 'beating'), true); }],

    // 10 · đoàn xe vọt đi (người dẫn hé ra) → sát thủ đông cứng thành khối băng → Princip ảnh tư liệu → Princip vẽ mặt chán, xe vụt qua, gió thổi · tiếng: rú máy + vút ở "sped", băng kêu rắc ở "froze", vút mạnh ở "race", gió thổi + lá bay ở "past"
    [ST(P10), (t, X) => {
      if (X < T.rest - 0.1) { B.place('quay'); crowdQuay(X, { panic: true }); narrator(HOST[0], HOST[1], HOST[2], { outfit: 'bowler', arms: 'cover', mood: 'shock', mouth: 'grit', crouch: 0.5 });
        const x3 = lerp(2400, -900, clamp((X - T.sped + 0.6) / 1.6)); royalCar(x3, X, { bob: Math.sin(X * 23) * 4, look: 1, wave: false, ffEyes: 'shock', soEyes: 'shock', drv: 'angry' });
        speedLines(x3 + 500, x3 + 1600, 650, 1000, X, 9, 0.85); return; }
      if (X < T.gav - 0.15) { zoomQuay(1.4, 960, 600); const fz = clamp((X - T.froze) / 0.3);
        [520, 960, 1400].forEach((x, i) => { killer(x, 1030, 560, { eyes: X > T.froze ? 'shock' : 'dot', look: [-1, 1, -1][i], wear: ['bowler', 'cap', 'bowler'][i] });
          if (fz > 0) { g.save(); g.globalAlpha = 0.6 * fz; g.fillStyle = '#BFE3F5'; g.strokeStyle = '#5FA8CF'; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 170, 1040 - 640 * back(fz), 340, 640 * back(fz), 26); g.fill(); g.stroke();
            g.strokeStyle = '#FFF'; g.lineWidth = 8; g.beginPath(); g.moveTo(x - 120, 500); g.lineTo(x - 70, 450); g.moveTo(x - 120, 570); g.lineTo(x - 40, 490); g.stroke(); g.restore(); } });
        if (X > T.lost) dots(1550, 300, (X - T.lost) / 0.25); return; }
      if (X < T.watched - 0.1) { S.paper('#1A1A1A'); S.photo(IM.s_princip, 600, 520, 560, clamp((X - T.gav + 0.15) / 0.25), { push: 1 + 0.015 * (X - T.gav), credit: 'Gavrilo Princip · public domain' });
        S.nameTag('GAVRILO PRINCIP', clamp((X - T.gav) / 0.3), 960, 470); label('AGE 19', 960, 580, 64, clamp((X - T.nineteen) / 0.25), '#F2C94C', { align: 'left', stroke: '#111' }); return; }
      zoomQuay(1.5, 1100, 560); const u = (X - T.race + 0.1) / 0.7, passed = u > 0.5, wind = passed ? clamp(1 - (X - T.race - 0.25) / 1.2) : 0;
      princip(1380, 960, 640, { eyes: 'bored', mouth: 'flat', look: passed ? -1 : 1, tilt: -0.08 * wind });
      if (wind > 0) { g.save(); g.strokeStyle = `rgba(255,255,255,${wind})`; g.lineWidth = 7; g.lineCap = 'round'; for (let i = 0; i < 6; i++) { const y = 380 + i * 60, x = 1100 - ((X * 900 + i * 170) % 600);
        g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - 80, y - 30, x - 160, y); g.stroke(); } g.restore(); }
      if (u > 0 && u < 1) { const cx = lerp(2900, -1100, u); for (let j = 3; j >= 0; j--) { g.save(); g.globalAlpha = j ? 0.2 : 1; g.translate(cx + j * 160, 0); g.scale(1.5, 1.5); g.translate(0, -320); royalCar(0, X, { wave: false, ffEyes: 'shock' }); g.restore(); }
        speedLines(0, W, 720, 1060, X, 12, 0.9); }
      if (X > T.past + 0.3) { const k = X - T.past - 0.3; g.save(); g.translate(lerp(1900, 900, clamp(k / 1.2)), 950 - 40 * Math.abs(Math.sin(k * 5))); g.rotate(k * 6); g.fillStyle = '#B88A3E'; g.strokeStyle = INK; g.lineWidth = 3;
        g.beginPath(); g.ellipse(0, 0, 26, 12, 0, 0, 7); g.fill(); g.stroke(); g.restore(); } }],

    // 11 · "the plan had completely failed" — tờ KẾ HOẠCH 6 sát thủ, gạch dần ✗ → dấu FAILED · không người dẫn · tiếng: 6 nét bút gạch, dấu đập ở "failed"
    [ST(P11), (t, X) => { S.paper('#E9E2CF');
      g.save(); g.translate(960, 560); g.rotate(-0.02); g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-620, -400, 1240, 800); g.strokeRect(-620, -400, 1240, 800); g.restore();
      label('THE PLAN', 960, 260, 90, clamp(t / 0.25));
      for (let i = 0; i < 6; i++) { const x = 560 + (i % 3) * 400, y = 560 + Math.floor(i / 3) * 250; killer(x, y + 90, 200, { eyes: 'dot' });
        const k = clamp((X - T.plan - i * ((T.failed - T.plan - 0.2) / 6)) / 0.2); if (k > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 12; g.lineCap = 'round';
          g.beginPath(); g.moveTo(x - 80, y - 110); g.lineTo(x - 80 + 160 * k, y - 110 + 200 * k); if (k > 0.5) { const k2 = (k - 0.5) * 2; g.moveTo(x + 80, y - 110); g.lineTo(x + 80 - 160 * k2, y - 110 + 200 * k2); } g.stroke(); g.restore(); } }
      S.stamp('FAILED', 960, 560, 150, clamp((X - T.failed) / 0.35), -0.14); }],

    // 12 · THE END giả + pháo giấy: ✓ ARCHDUKE SAFE ✓ ASSASSINS SCATTERED → dấu WORLD WAR I: CANCELLED · người dẫn trượt vào giơ ngón cái (như tập mẫu L23) · tiếng: nhạc kết hoành tráng, ding ×2, dấu đập ở "cancelled"
    [ST(P12), (t, X) => { S.paper('#FDF6E3');
      for (let i = 0; i < 60; i++) { const y = (hash(i) * 1200 + t * 300 * (0.5 + hash(i + 9))) % 1200 - 60; g.fillStyle = ['#E8541E', '#2F6DB5', '#F7C21B', '#3FA34D'][i % 4]; g.save(); g.translate(hash(i + 3) * W, y); g.rotate(t * 3 * (hash(i + 5) - 0.5)); g.fillRect(-7, -11, 14, 22); g.restore(); }
      label('THE END', 820, 300, 180, clamp((t - 0.05) / 0.3));
      checkLine('ARCHDUKE SAFE', 520, 480, at(X, 'safe'), true); checkLine('ASSASSINS SCATTERED', 520, 570, at(X, 'scattered'), true);
      S.stamp('WORLD WAR I: CANCELLED ✓', 820, 730, 62, clamp((X - T.cancelled) / 0.3), -0.05);
      S.hostIn(1650, 1060, 400, clamp((t - 0.4) / 0.35), { arms: 'thumb', mouth: 'smile', t: X }); }],
  ]; };
