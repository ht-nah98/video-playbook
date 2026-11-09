// a7 — Nobody read the memo (BRIEF-SCENES §a7). Tất định: mọi khung là hàm của X (giờ trang).
// Telex 19:04 → phòng khách Đông Đức xem TV (thế giới thumbnail C) 19:17 / 20:00 → người dẫn tin nói "cổng đã mở" → CẮT: cổng
// đóng im ban đêm, lính gác ngơ ngác → lưới TV + báo cùng một tít → DẤU "NOBODY READ THE MEMO" lần 2. Không người dẫn nhập vai ở hồi này.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { P, memo, wall, SK } from './common.js';
import { bindG, clockFace, tv, anchorScreen, bub, hand } from './a6.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;
let g = null;

/** máy telex + băng giấy mọc lên từ khe; L = độ dài băng đã in. Toạ độ "thế giới" 1920×1080 (zoom do caller) */
function telex(X, L, imm) { const x0 = 450, w = 340, top = 620 - L, Ls = [60, 130, 200, 270, 360];
  g.save(); g.lineJoin = 'round'; g.strokeStyle = INK; g.lineWidth = 7;
  if (L > 0) { g.fillStyle = '#F4F0E4'; g.fillRect(x0, top, w, L); g.strokeRect(x0, top, w, L); g.fillStyle = '#B8B3A4';
    for (let y = ((L % 34) + 620 - L) % 34; y < L; y += 34) for (const dx of [14, w - 14]) { g.beginPath(); g.arc(x0 + dx, top + y, 4, 0, 7); g.fill(); }
    Ls.forEach((Lj, j) => { if (L < Lj) return; const y = 620 - (L - Lj) - 22; g.globalAlpha = clamp((L - Lj) / 18);
      if (j === 0) { g.fillStyle = INK; g.font = '800 36px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('19:04', x0 + w / 2, y); }
      else if (j === 4) { g.fillStyle = RED; g.font = '900 38px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('IMMEDIATELY', x0 + w / 2, y); g.fillRect(x0 + 40, y + 8, w - 80, 5); }
      else { g.fillStyle = '#8A877C'; for (let i = 0; i < 2; i++) g.fillRect(x0 + 34, y - 20 + i * 18, (w - 68) * (0.6 + 0.4 * hash(j * 3 + i)), 8); }
      g.globalAlpha = 1; }); }
  g.fillStyle = '#4C5461'; g.beginPath(); g.roundRect(380, 600, 480, 70, 16); g.fill(); g.stroke();
  g.fillStyle = '#59616D'; g.beginPath(); g.roundRect(400, 660, 440, 270, 16); g.fill(); g.stroke();
  g.fillStyle = '#2A2E35'; g.fillRect(450, 614, w, 14);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { g.fillStyle = '#D8D4C8'; g.beginPath(); g.roundRect(430 + c * 38, 740 + r * 54, 30, 38, 6); g.fill(); g.stroke(); }
  g.fillStyle = '#B8B3A4'; g.beginPath(); g.arc(850, 640, 26, 0, 7); g.fill(); g.stroke();
  if (L > 0 && L < 300 || imm) { g.strokeStyle = '#FFE14A'; g.lineWidth = 6; g.lineCap = 'round'; const w2 = Math.sin(X * 30) * 4; for (const a of [-0.5, 0, 0.5]) { g.beginPath(); g.moveTo(850 + Math.sin(a) * 50, 600 - Math.cos(a) * 20 + w2); g.lineTo(850 + Math.sin(a) * 80, 580 - Math.cos(a) * 40 + w2); g.stroke(); } }
  g.restore(); }

function office(X) { g.fillStyle = '#41506A'; g.fillRect(0, 0, W, H); g.fillStyle = '#34425A'; g.fillRect(0, 700, W, 380); g.fillStyle = '#262B36'; g.fillRect(0, 930, W, 150);
  g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 700); g.lineTo(W, 700); g.moveTo(0, 930); g.lineTo(W, 930); g.stroke();
  g.fillStyle = '#3A4963'; for (let i = 0; i < 6; i++) g.fillRect(i * 340 + 30, 0, 140, 700); }

function livingRoom() { g.fillStyle = '#2E4469'; g.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) { g.fillStyle = i % 2 ? '#35507A' : '#27395A'; g.fillRect(i * 180, 0, 90, 800); }
  g.fillStyle = '#4A4A52'; g.fillRect(0, 800, W, 280); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 800); g.lineTo(W, 800); g.stroke(); }

function nightGate(X, z = 1) { g.save(); g.translate(960, 760); g.scale(z, z); g.translate(-960, -760);
  const gr = g.createLinearGradient(0, 0, 0, 820); gr.addColorStop(0, '#0B1328'); gr.addColorStop(1, '#1B2A4C'); g.fillStyle = gr; g.fillRect(-300, -300, W + 600, 1120 + 300);
  g.fillStyle = '#FFF'; for (let i = 0; i < 40; i++) { g.globalAlpha = 0.4 + 0.5 * hash(i + 3) * (0.6 + 0.4 * Math.sin(X * 2 + i)); g.fillRect(hash(i) * W, hash(i + 50) * 480, 3, 3); } g.globalAlpha = 1;
  g.fillStyle = '#F2EEC8'; g.beginPath(); g.arc(1480, 190, 70, 0, 7); g.fill();
  wall(-300, W + 300, 820, 330, { gap: [780, 1140] }); g.fillStyle = 'rgba(8,14,40,0.45)'; g.fillRect(-300, 380, W + 600, 440);
  g.lineWidth = 7; g.strokeStyle = INK; g.fillStyle = '#4A5360'; for (let x = 790; x <= 1130; x += 34) { g.fillRect(x - 6, 540, 12, 280); g.strokeRect(x - 6, 540, 12, 280); }
  g.fillRect(780, 600, 360, 18); g.strokeRect(780, 600, 360, 18); g.fillRect(780, 740, 360, 18); g.strokeRect(780, 740, 360, 18);
  g.fillStyle = '#2A2E35'; g.fillRect(780, 500, 360, 50); g.strokeRect(780, 500, 360, 50);
  g.fillStyle = '#18181C'; g.fillRect(-300, 820, W + 600, 400); g.fillStyle = 'rgba(255,230,150,0.16)'; g.beginPath(); g.ellipse(960, 880, 620, 120, 0, 0, 7); g.fill();
  g.strokeStyle = '#5A6270'; g.lineWidth = 12; g.beginPath(); g.moveTo(1560, 820); g.lineTo(1560, 380); g.lineTo(1470, 380); g.stroke(); g.fillStyle = '#FFE9A0'; g.beginPath(); g.ellipse(1470, 392, 40, 14, 0, 0, 7); g.fill(); g.stroke();
  g.restore(); }
function padlock(cx, cy, s, k) { if (k <= 0) return; g.save(); g.translate(cx, cy); const sc = back(k) * s; g.scale(sc, sc); g.lineWidth = 8; g.strokeStyle = INK; g.fillStyle = '#C9A13B';
  g.beginPath(); g.arc(0, -30, 38, Math.PI, 0); g.stroke(); g.beginPath(); g.roundRect(-52, -30, 104, 84, 12); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(0, 8, 10, 0, 7); g.fill(); g.fillRect(-4, 8, 8, 22); g.restore(); }

/** tờ báo vẽ: tít to + dòng xám */
function paperSheet(cx, cy, w, h, head, seed) { g.save(); g.translate(cx, cy); g.rotate((hash(seed) - 0.5) * 0.08); g.fillStyle = '#E9E3D0'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h);
  g.fillStyle = INK; g.font = `900 ${w * 0.115}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(head, 0, -h * 0.3); g.fillStyle = '#9A978C';
  for (let i = 0; i < 6; i++) { g.fillRect(-w * 0.42, -h * 0.12 + i * h * 0.1, w * 0.84 * (0.7 + 0.3 * hash(seed + i)), h * 0.04); } g.fillStyle = '#B9B4A2'; g.fillRect(-w * 0.42, -h * 0.12, w * 0.3, h * 0.28); g.restore(); }
function tvSmall(cx, cy, w, h, head) { tv(cx - w / 2, cy - h / 2, w, h, (sx, sy, sw, sh) => { g.fillStyle = '#2C4F82'; g.fillRect(sx, sy, sw, sh); g.fillStyle = '#FFF'; g.font = `900 ${sw * 0.1}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(head, sx + sw / 2, sy + sh * 0.5); }, { legs: false }); }

export default K => { const { g: ctx, wd, ST, LT } = K; g = ctx; bindG(ctx);
  const LO = 'At four minutes past seven', LP = 'At seven seventeen', LQ = 'Later that night', LR = '"The gates in the Wall', LS = 'They did not', LT2 = 'At that moment', LU = 'So now the entire world';
  const T = { four: wd(LO, 'four'), put: wd(LO, 'put'), imm: wd(LO, 'immediately'), seventeen: wd(LP, 'seventeen'), eight: wd(LP, 'eight'), reached: wd(LP, 'reached'), anyway: wd(LP, 'germany'),
    looked: wd(LQ, 'looked'), cam: wd(LQ, 'camera'), said: wd(LQ, 'said'), they: wd(LS, 'they'), shut: wd(LT2, 'shut'), nobody: wd(LT2, 'nobody'), ordered: wd(LT2, 'ordered'), anything: wd(LT2, 'anything'),
    world: wd(LU, 'world'), reporting: wd(LU, 'reporting'), memo: wd(LU, 'memo'), nbd: wd(LU, 'nobody') };
  const pop = (X, t0, d = 0.3) => clamp((X - t0) / d);
  const Lof = X => 290 * ease(clamp((X - (T.four - 0.2)) / 3.6)) + 80 * ease(clamp((X - T.imm) / 0.25));
  const talk = X => Math.floor(X * 6) % 3 ? 'o' : 'flat';

  return [
  // 1 · văn phòng tin: máy telex bắt đầu in, 19:04 trên tường, nhân viên ngó · tiếng: lách cách telex, chuông ting
  [ST(LO), (t, X) => { office(X); clockFace(1090, 250, 76, 19 * 60 + 4); telex(X, Lof(X), false); C.folk(1380, 1000, 600, { skin: SK, coat: 'worker', eyes: 'dot', look: -1, mouth: 'flat' }); }],
  // 2 · zoom băng giấy: dòng tít "IMMEDIATELY" in ra đúng từ · tiếng: telex dồn dập, "ting" ở từ immediately
  [T.put - 0.15, (t, X) => { const z = 1.55 + 0.01 * t; g.save(); g.translate(960, 480); g.scale(z, z); g.translate(-620, -480); office(X);
    clockFace(1090, 250, 76, 19 * 60 + 4); telex(X, Lof(X), X > T.imm); g.restore(); }],
  // 3 · phòng khách Đông Đức: TV gỗ + gia đình trên ghế sofa, 19:17 · tiếng: tiếng TV nhỏ, tiếng ghế
  [ST(LP), (t, X) => { livingRoom(); tv(110, 150, 780, 620, (sx, sy, sw, sh) => { anchorScreen(sx, sy, sw, sh, X, { mouth: talk(X) }); S.label('19:17', sx + 40, sy + 70, 56, pop(X, T.seventeen, 0.25), '#FFE14A', { stroke: INK, align: 'left', free: true }); });
    g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#8A3A36'; g.beginPath(); g.roundRect(960, 480, 820, 260, 40); g.fill(); g.stroke();
    C.folk(1130, 800, 470, { skin: SK, coat: 'plain', eyes: 'shock', look: -1, mouth: 'o' }); C.folk(1380, 800, 430, { skin: SK, coat: 'worker', eyes: 'shock', look: -1, mouth: 'o' }); C.folk(1600, 800, 300, { skin: SK, coat: 'plain', eyes: 'shock', look: -1 });
    g.fillStyle = '#A64A44'; g.beginPath(); g.roundRect(940, 700, 860, 210, 34); g.fill(); g.stroke(); for (const x of [940, 1800]) { g.fillStyle = '#7A302D'; g.beginPath(); g.roundRect(x - 36, 560, 72, 350, 30); g.fill(); g.stroke(); } }],
  // 4 · TV to: 20:00, bản tin chính · tiếng: nhạc hiệu bản tin
  [T.eight - 0.25, (t, X) => { livingRoom(); tv(150, 60, 1620, 900, (sx, sy, sw, sh) => { anchorScreen(sx, sy, sw, sh, X, { mouth: talk(X) });
      g.fillStyle = RED; g.fillRect(sx, sy + sh * 0.62, sw * 0.55, 90); S.label('EVENING NEWS', sx + 40, sy + sh * 0.62 + 66, 56, 1, '#FFFFFF', { align: 'left', free: true }); S.label('20:00', sx + 40, sy + 110, 80, pop(X, T.eight, 0.25), '#FFE14A', { stroke: INK, align: 'left', free: true }); }); }],
  // 5 · khu nhà tấm ban đêm, cửa sổ bật sáng ánh TV xanh lần lượt: "hầu hết Đông Đức" · tiếng: hum điện, nhạc bản tin nhỏ dần
  [T.reached - 0.3, (t, X) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0B1328'); gr.addColorStop(1, '#1B2A4C'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#4B5260'; g.strokeStyle = INK; g.lineWidth = 7; g.fillRect(260, 90, 1400, 860); g.strokeRect(260, 90, 1400, 860); const k = ease(clamp((X - T.reached) / 2.0));
    for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) { const i = r * 10 + c, x = 300 + c * 138, y = 130 + r * 132, lit = hash(i + 11) < k * 0.9, flick = Math.floor(X * 5 + hash(i) * 9) % 2;
      g.fillStyle = lit ? (hash(i + 40) > 0.8 ? '#FFD66E' : flick ? '#7FB8FF' : '#A9D4FF') : '#1B2236'; g.fillRect(x, y, 98, 92); g.strokeRect(x, y, 98, 92); }
    S.label('MOST OF EAST GERMANY', 960, 1010, 62, pop(X, T.anyway, 0.3), '#FFFFFF', { stroke: INK }); }],
  // 6 · TV: người dẫn tin Tây Đức "nhìn thẳng vào ống kính" (zoom chậm) · tiếng: giọng trang nghiêm, nhạc bản tin
  [ST(LQ), (t, X) => { const z = 1 + 0.1 * clamp((X - ST(LQ)) / 6); livingRoom(); g.save(); g.translate(960, 510); g.scale(z, z); g.translate(-960, -510);
    tv(150, 60, 1620, 900, (sx, sy, sw, sh) => anchorScreen(sx, sy, sw, sh, X, { mouth: X > T.looked ? talk(X) : 'flat' })); g.restore(); }],
  // 7 · câu trích thật hiện thành phụ đề theo từng từ; "WIDE" nảy · tiếng: giọng người dẫn tin, "ting" ở wide
  [ST(LR), (t, X) => { const z = 1.1; livingRoom(); g.save(); g.translate(960, 510); g.scale(z, z); g.translate(-960, -510);
    tv(150, 60, 1620, 900, (sx, sy, sw, sh) => anchorScreen(sx, sy, sw, sh, X, { mouth: talk(X) })); g.restore();
    const ws = LT(LR).words.map(x => [x.w.toUpperCase().replace(/[^A-Z']/g, ''), x.start]), shown = a => ws.filter(([, s]) => s <= X).slice(a[0], a[1]).map(x => x[0]).join(' ');
    g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillRect(0, 800, W, 190);
    S.label(shown([0, 5]), 960, 880, 66, 1, '#FFFFFF', { stroke: INK }); const wide = ws.find(x => x[0] === 'WIDE'); S.label(`${shown([5, 8])}.`, 960, 960, 74, X >= ws[5][1] ? 1 : 0, X >= wide[1] ? '#FFE14A' : '#FFFFFF', { stroke: INK }); }],
  // 8 · CẮT: cổng Tường đóng im ban đêm, lính gác ngơ ngác gãi đầu, "THEY DID NOT." · tiếng: im lặng, tiếng dế
  [ST(LS), (t, X) => { nightGate(X); P.guard(610, 1010, 640, { eyes: 'shock', arm: 'up', look: 1 }); P.guard(1310, 1010, 640, { eyes: 'dot', mouth: 'o', look: -1 });
    S.label('THEY DID NOT.', 800, 230, 120, pop(X, T.they, 0.3), '#FFFFFF', { stroke: INK }); }],
  // 9 · cổng vẫn khoá: ổ khoá nảy lên đúng từ "shut" · tiếng: dế kêu, gió
  [ST(LT2), (t, X) => { nightGate(X); padlock(960, 640, 1.6, pop(X, T.shut, 0.3)); P.guard(610, 1010, 640, { eyes: 'dot', mouth: 'flat', look: 1 }); P.guard(1310, 1010, 640, { eyes: 'dot', mouth: 'flat', look: -1 }); }],
  // 10 · cận hai lính: không ai ra lệnh — dấu "?" nảy, nhìn nhau · tiếng: dế, ho khẽ
  [T.nobody - 0.2, (t, X) => { nightGate(X, 1.35); const sw = Math.sin(X * 3) > 0 ? 1 : -1;
    P.guard(600, 1130, 860, { eyes: 'shock', mouth: 'o', look: 1, arm: X > T.anything ? 'up' : null }); P.guard(1320, 1130, 860, { eyes: 'dot', mouth: 'frown', look: -1, arm: X > T.anything ? 'up' : null });
    S.label('?', 600, 330, 170, pop(X, T.ordered, 0.25), '#FFE14A', { stroke: INK, free: true }); S.label('?', 1320, 330, 170, pop(X, T.anything, 0.25), '#FFE14A', { stroke: INK, free: true }); }],
  // 11 · lưới TV + báo cùng một tít "BORDER OPEN!" nảy lần lượt, rồi DẤU "NOBODY READ THE MEMO" lần 2 · tiếng: nhiều TV chồng nhau, dấu đóng "bộp"
  [ST(LU), (t, X) => { g.fillStyle = '#1A2338'; g.fillRect(0, 0, W, H); g.fillStyle = '#222D47'; for (let i = 0; i < 10; i++) g.fillRect(i * 200, 0, 100, H);
    [[330, 290, 0], [960, 290, 1], [1590, 290, 0], [330, 790, 1], [960, 790, 0], [1590, 790, 1]].forEach(([x, y, kind], i) => { const k = pop(X, T.world + i * 0.3, 0.3); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(back(k), back(k)); g.translate(-x, -y);
      if (kind === 0) tvSmall(x, y, 520, 360, 'BORDER OPEN!'); else paperSheet(x, y, 420, 320, 'BORDER OPEN!', i); g.restore(); });
    S.stamp('NOBODY READ THE MEMO', 960, 540, 100, pop(X, T.nbd, 0.45), -0.05); }],
  ]; };
