// a6 — The press conference (BRIEF-SCENES §a6). Tất định: mọi khung là hàm của X (giờ trang).
// Phòng họp báo = thế giới thumbnail A. Cảnh WIDE: Schabowski + 2 quan chức sau bàn, hàng phóng viên QUAY LƯNG ở tiền cảnh, người dẫn
// (nhập vai #5, phóng viên áo nâu mũ nồi "PRESS") ngồi CỐ ĐỊNH x=1640 nhìn thẳng khung — giữ đúng chỗ qua mọi cảnh WIDE.
// CLOSE = cận Schabowski (x 700, cao 820) cho cảnh lật giấy / câu trích. Dấu "NOBODY READ THE MEMO" lần 1 ở cảnh phòng tối.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, memo, mic, pressRoom, pressTable, SK } from './common.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;
let g = null;
export const bindG = ctx => { g = ctx; };

// ── đồ dùng chung giữa a6 / a7 (a7 import) ──
export function hand(x, y, r = 26) { g.save(); g.fillStyle = SK; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore(); }
/** đồng hồ treo tường: min = phút trong ngày; có bảng số điện tử bên dưới */
export function clockFace(x, y, r, min) { const hh = Math.floor(min / 60) % 24, mm = Math.floor(min % 60), ha = ((min / 60) % 12) / 12 * Math.PI * 2, ma = (min % 60) / 60 * Math.PI * 2;
  g.save(); g.lineWidth = 7; g.strokeStyle = INK; g.fillStyle = '#F4F1E8'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  g.lineWidth = 4; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.beginPath(); g.moveTo(x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82); g.lineTo(x + Math.sin(a) * r * 0.93, y - Math.cos(a) * r * 0.93); g.stroke(); }
  g.lineCap = 'round'; g.lineWidth = 8; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(ha) * r * 0.5, y - Math.cos(ha) * r * 0.5); g.stroke();
  g.lineWidth = 5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(ma) * r * 0.78, y - Math.cos(ma) * r * 0.78); g.stroke();
  g.fillStyle = INK; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill();
  const pw = r * 1.5, ph = r * 0.5, py = y + r + 22; g.fillStyle = '#17171A'; g.beginPath(); g.roundRect(x - pw / 2, py, pw, ph, 8); g.fill(); g.stroke();
  g.fillStyle = '#FFB938'; g.font = `800 ${ph * 0.72}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(`${hh}:${String(mm).padStart(2, '0')}`, x, py + ph * 0.54); g.restore(); }
/** televisor gỗ (thế giới thumbnail C); screen(sx, sy, sw, sh) vẽ nội dung trong màn hình đã cắt */
export function tv(x, y, w, h, screen, o = {}) { const pw = w * 0.14, sx = x + w * 0.04, sy = y + h * 0.06, sw = w - pw - w * 0.07, sh = h * 0.88;
  g.save(); g.lineJoin = 'round'; g.strokeStyle = INK; g.lineWidth = 8;
  if (o.legs !== false) { g.fillStyle = '#5A3820'; g.fillRect(x + w * 0.08, y + h - 6, w * 0.06, 50); g.fillRect(x + w * 0.86, y + h - 6, w * 0.06, 50); }
  g.fillStyle = '#6B4426'; g.beginPath(); g.roundRect(x, y, w, h, 36); g.fill(); g.stroke();
  g.save(); g.beginPath(); g.roundRect(sx, sy, sw, sh, 36); g.clip(); screen(sx, sy, sw, sh);
  g.fillStyle = 'rgba(0,0,0,0.10)'; for (let yy = sy; yy < sy + sh; yy += 7) g.fillRect(sx, yy, sw, 2); g.restore();
  g.beginPath(); g.roundRect(sx, sy, sw, sh, 36); g.stroke();
  g.fillStyle = '#D9B45A'; for (const k of [0.22, 0.4]) { g.beginPath(); g.arc(x + w - pw / 2 - w * 0.005, y + h * k, Math.min(40, w * 0.03), 0, 7); g.fill(); g.stroke(); }
  g.strokeStyle = '#3E2814'; g.lineWidth = 5; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(x + w - pw * 0.8, y + h * (0.58 + i * 0.06)); g.lineTo(x + w - pw * 0.2, y + h * (0.58 + i * 0.06)); g.stroke(); }
  g.restore(); return [sx, sy, sw, sh]; }
/** TV mini-studio: nền xanh + bàn + người dẫn tin (folk com-lê) */
export function anchorScreen(sx, sy, sw, sh, X, o = {}) { const gr = g.createLinearGradient(0, sy, 0, sy + sh); gr.addColorStop(0, '#2C4F82'); gr.addColorStop(1, '#1B3057'); g.fillStyle = gr; g.fillRect(sx, sy, sw, sh);
  g.fillStyle = 'rgba(255,255,255,0.10)'; g.beginPath(); g.arc(sx + sw * 0.8, sy + sh * 0.3, sh * 0.2, 0, 7); g.fill();
  const h = sh * 0.78, cx = sx + sw * 0.46; C.folk(cx, sy + sh * 0.97, h, { skin: SK, coat: 'suit', eyes: o.eyes ?? 'dot', mouth: o.mouth ?? 'flat', look: 0 });
  g.fillStyle = '#E9E5DA'; g.fillRect(sx, sy + sh * 0.8, sw, sh * 0.2); g.fillStyle = '#B8B3A4'; g.fillRect(sx, sy + sh * 0.8, sw, 8); }
export const bub = (txt, x, y, tx, ty, k, size = 44) => bubble(g, txt, x, y, tx, ty, k, size);
/** người quay lưng (phóng viên hàng đầu): yh = tâm đầu, r = bán kính; o.up 0..1 giơ tay, o.tilt gục đầu, o.hat */
export function backHead(x, yh, r, o = {}) { const col = o.col ?? '#2E3A4A', hair = o.hair ?? '#2B2420', tilt = o.tilt ?? 0;
  g.save(); g.lineWidth = 7; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  g.fillStyle = col; g.beginPath(); g.moveTo(x - r * 1.3, H + 30); g.lineTo(x - r * 1.3, yh + r * 1.6); g.quadraticCurveTo(x - r * 1.3, yh + r * 0.95, x - r * 0.7, yh + r * 0.95); g.lineTo(x + r * 0.7, yh + r * 0.95); g.quadraticCurveTo(x + r * 1.3, yh + r * 0.95, x + r * 1.3, yh + r * 1.6); g.lineTo(x + r * 1.3, H + 30); g.closePath(); g.fill(); g.stroke();
  if ((o.up ?? 0) > 0) { const k = easeOut(o.up), sx = x + r * 1.0, sy = yh + r * 1.35, ex = x + r * 1.5, ey = lerp(sy, yh - r * 0.8, k);
    g.strokeStyle = INK; g.lineWidth = r * 0.42 + 8; g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.stroke(); g.strokeStyle = col; g.lineWidth = r * 0.42; g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.stroke(); hand(ex, ey - r * 0.15, r * 0.2); }
  g.translate(x, yh + r * 0.9); g.rotate(tilt); g.translate(-x, -(yh + r * 0.9)); g.lineWidth = 7; g.strokeStyle = INK;
  g.fillStyle = SK; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.97, yh + r * 0.1, r * 0.13, r * 0.2, 0, 0, 7); g.fill(); g.stroke(); }
  g.fillStyle = hair; g.beginPath(); g.arc(x, yh, r, 0, 7); g.fill(); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = 4; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(x, yh, r * (0.45 + i * 0.18), Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
  if (o.hat === 'bowler') { g.fillStyle = '#17171A'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.ellipse(x, yh - r * 0.55, r * 1.2, r * 0.2, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(x, yh - r * 0.66, r * 0.78, r * 0.7, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
  g.restore(); }
/** "Z" nổi lên theo bậc (ngủ gật) */
function zzz(x, y, X, t0) { for (let i = 0; i < 3; i++) { const k = clamp((X - t0 - i * 0.3) / 0.25); S.label('Z', x + i * 34, y - i * 46 - ((X - t0) * 12 % 24), 38 + i * 14, k, '#FFFFFF', { stroke: INK, free: true }); } }

// ── cảnh WIDE: phòng họp báo ──
export const SEAT = { x: 1640, yb: 1120, h: 470 };                     // chỗ ngồi CỐ ĐỊNH của người dẫn
const BACKS = [[120, '#2E3A4A', '#2B2420'], [960, '#5A4A3A', '#8A8A86'], [1300, '#3A4A3E', '#4A3524']];
const HY = 816, HR = 136;                                              // tâm đầu + bán kính đầu phóng viên tiền cảnh
function wide(X, o = {}) { const s = o.schab ?? {};
  pressRoom({ dim: o.dim ?? 0, spot: 700 });
  if (o.min !== null && o.min !== undefined) clockFace(1715, 235, 88, o.min);
  C.folk(380, 900, 470, { skin: SK, coat: 'suit', eyes: o.offEyes ?? 'bored', mouth: 'flat', look: 1 });
  C.folk(1050, 900, 470, { skin: SK, coat: 'suit', eyes: o.offEyes ?? 'bored', mouth: 'flat', look: -1, feat: 'princip' });
  P.schab(700, 900 - (s.bob ?? 0), 520, { eyes: s.eyes ?? 'dot', mouth: s.mouth, sweat: s.sweat, squint: s.squint, look: s.look ?? 0 });
  pressTable();
  if (s.memo) { memo(600, 690, 150, -0.1, { seed: 3 }); hand(665, 770); }
  BACKS.forEach(([x, col, hair], i) => { const sway = o.sway ? Math.sin(X * 2 + i * 2) * 0.04 : 0;
    backHead(x, HY, HR, { col, hair, up: o.up?.[i] ?? 0, tilt: (o.droop ?? 0) * (i % 2 ? -0.3 : 0.3) * (1 + 0.2 * Math.sin(X * 1.5 + i)) + sway, hat: i === 2 && o.brit ? 'bowler' : null }); });
  narrator(SEAT.x, SEAT.yb, SEAT.h, { outfit: 'reporter', mood: o.nMood ?? 'smug', arms: o.nArms ?? 'rest', t: X, mouth: 'rest', look: -1 }); }
/** vạch "ồn ào" quanh đầu: k 0..1 */
function buzz(X, k) { if (k <= 0) return; g.save(); g.strokeStyle = '#FFFFFF'; g.lineWidth = 7; g.lineCap = 'round'; g.globalAlpha = clamp(k * 3);
  for (const x of [BACKS[0][0] + 20, BACKS[1][0], BACKS[2][0], SEAT.x]) { const w = Math.sin(X * 22 + x) * 6;
    for (const a of [-0.8, -0.4, 0, 0.4, 0.8]) { const r0 = 168 + w, r1 = 208 + w; g.beginPath(); g.moveTo(x + Math.sin(a) * r0, HY - Math.cos(a) * r0); g.lineTo(x + Math.sin(a) * r1, HY - Math.cos(a) * r1); g.stroke(); } } g.restore(); }

// ── cảnh CLOSE: cận Schabowski ──
const CL = { x: 700, y: 1090, h: 820 };
function close(X, o = {}) { pressRoom({ spot: 640 });
  P.schab(CL.x, CL.y, CL.h, { eyes: o.eyes ?? 'dot', mouth: o.mouth, sweat: o.sweat, squint: o.squint, look: o.look ?? 0, arm: o.arm });
  pressTable(880, [[450, 0.42, '#1C1C1F'], [560, 0.25, '#B3262C'], [860, -0.12, '#2B4C7E'], [970, -0.26, '#1C1C1F'], [1060, -0.4, '#5B5A55']]); }
const HOLD = [1010, 600];                                               // chỗ tay cầm giấy trong CLOSE

function calendar(cx, cy, w, day, flip) { const h = w * 1.12, sx = Math.abs(1 - 2 * clamp(flip)), d = flip > 0.5 ? day[1] : day[0];
  g.save(); g.translate(cx, cy); g.scale(sx < 0.04 ? 0.04 : sx, 1); g.lineWidth = 8; g.strokeStyle = INK; g.fillStyle = '#FBF8EE'; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 22); g.fill(); g.stroke();
  g.fillStyle = RED; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h * 0.22, [22, 22, 0, 0]); g.fill(); g.stroke();
  g.fillStyle = '#FFF'; g.font = `900 ${w * 0.13}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('NOVEMBER', 0, -h / 2 + h * 0.115);
  g.fillStyle = INK; g.font = `900 ${w * 0.62}px Archivo, sans-serif`; g.fillText(String(d), 0, h * 0.1);
  g.fillStyle = '#EEE'; for (const s of [-1, 1]) { g.beginPath(); g.arc(s * w * 0.25, -h / 2, 16, 0, 7); g.fill(); g.stroke(); } g.restore(); }

function tvCamera(x, y, s, X) { g.save(); g.translate(x, y); g.scale(s, s); g.lineWidth = 7; g.strokeStyle = INK; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(-60, 0); g.lineTo(-150, 300); g.moveTo(60, 0); g.lineTo(150, 300); g.moveTo(0, 0); g.lineTo(0, 300); g.stroke();
  g.fillStyle = '#3A3F47'; g.beginPath(); g.roundRect(-160, -170, 320, 170, 18); g.fill(); g.stroke();
  g.fillStyle = '#2A2E35'; g.beginPath(); g.roundRect(-250, -140, 110, 110, 12); g.fill(); g.stroke(); g.fillStyle = '#7EC4E8'; g.beginPath(); g.arc(-250, -85, 38, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#2A2E35'; g.beginPath(); g.roundRect(60, -230, 90, 60, 10); g.fill(); g.stroke();
  g.fillStyle = Math.floor(X * 2) % 2 ? '#FF3030' : '#7A1E22'; g.beginPath(); g.arc(-110, -190, 18, 0, 7); g.fill(); g.stroke(); g.restore(); }

function spiralBubble(cx, cy, k, X) { if (k <= 0) return; g.save(); g.translate(cx, cy); const s = back(clamp(k * 3)); g.scale(s, s); g.lineWidth = 6; g.strokeStyle = INK; g.fillStyle = '#FFF';
  g.beginPath(); g.ellipse(0, 0, 300, 150, 0, 0, 7); g.fill(); g.stroke(); for (const [dx, dy, r] of [[-40, 175, 18], [-60, 215, 10]]) { g.beginPath(); g.arc(dx, dy, r, 0, 7); g.fill(); g.stroke(); }
  g.beginPath(); const n = Math.floor(200 * clamp(k * 0.8 + 0.2)); for (let i = 0; i < n; i++) { const th = i * 0.12, r = 4 + th * 6.2; const px = Math.cos(th + X * 0.8) * r * 1.6, py = Math.sin(th + X * 0.8) * r * 0.8; if (i) g.lineTo(px, py); else g.moveTo(px, py); }
  g.lineWidth = 6; g.stroke(); g.restore(); }

export default K => { const { g: ctx, wd, ST } = K; g = ctx;
  const LA = 'The press conference started', LB = 'Committees, reforms', LC = 'Then, at about six fifty', LD = 'He read it out', LE = 'A reporter asked the obvious', LF = 'Schabowski shuffled',
    LG = '"As far as I know', LH = 'Nobody had told him about', LI = 'Nobody had told him to wait', LJ = 'Nobody read the memo, and', LK = 'Someone asked if', LL = 'Then a British reporter',
    LM = 'Schabowski gave a long', LN = 'Then he sat down';
  const T = { live: wd(LA, 'live'), fifty: wd(LA, 'fifty'), spect: wd(LA, 'spectacularly'), cm1: wd(LB, 'committees', 0), ref: wd(LB, 'reforms'), cm2: wd(LB, 'committees', 1), more: wd(LB, 'more'),
    f53: wd(LC, 'fifty-three'), ital: wd(LC, 'reporter'), note: wd(LC, 'note'), stumb: wd(LD, 'stumbling'), room: wd(LD, 'room'), buzz: wd(LD, 'buzzing'), leave: wd(LD, 'leave'),
    asked: wd(LE, 'asked'), when: wd(LE, 'when'), shuf: wd(LF, 'shuffled'), looked: wd(LF, 'looked'), wasnt: wd(LF, "wasn't"), said: wd(LF, 'said'),
    imm: wd(LG, 'immediately'), without: wd(LG, 'without'), nov: wd(LH, 'november'), tenth: wd(LH, 'tenth'), morning: wd(LI, 'morning'),
    nobody: wd(LJ, 'nobody'), only: wd(LJ, 'only'), reading: wd(LJ, 'reading'), first: wd(LJ, 'first'),
    checked: wd(LK, 'checked'), three: wd(LK, 'three'), yes: wd(LK, 'yes'), brit: wd(LL, 'british'), wall: wd(LL, 'wall'),
    wander: wd(LM, 'wandering'), arm: wd(LM, 'disarmament'), seven: wd(LM, 'seven'), wrapped: wd(LM, 'wrapped'), brok: wd(LN, 'brokaw'), said2: wd(LN, 'said') };
  const clk = X => X < T.fifty ? 1080 : X < T.fifty + 1.8 ? lerp(1080, 1130, ease((X - T.fifty) / 1.8)) : X < T.f53 ? 1130 : X < T.f53 + 0.3 ? lerp(1130, 1133, ease((X - T.f53) / 0.3))
    : X < T.seven ? 1133 : X < T.seven + 1.1 ? lerp(1133, 1140, ease((X - T.seven) / 1.1)) : 1140;
  const pop = (X, t0, d = 0.3) => clamp((X - t0) / d);
  const droop = X => ease(clamp((X - T.fifty) / 1.8));

  return [
  // 1 · WIDE 18:00 — phòng họp báo mở màn; người dẫn nhập vai #5 ngồi hàng đầu (sổ tay) · tiếng: ồn phòng, micro
  [ST(LA), (t, X) => { wide(X, { min: clk(X), sway: true, schab: { mouth: Math.floor(X * 3) % 3 ? 'o' : 'flat', bob: Math.sin(X * 3) * 3 } });
 }],
  // 2 · cắt sang máy quay truyền hình + đèn LIVE · tiếng: tút tút đèn báo
  [T.live - 0.15, (t, X) => { pressRoom({ dim: 0.35, spot: 1200 }); tvCamera(1100, 560, 1.5, X); C.folk(1500, 1010, 640, { skin: SK, coat: 'worker', eyes: 'dot', look: -1, mouth: 'flat' });
    S.label('LIVE', 330, 640, 150, pop(X, T.live, 0.3), '#FF4040', { stroke: INK }); }],
  // 3 · WIDE đồng hồ chạy tới 18:50, phóng viên gục dần, "Zzz" đúng từ "spectacularly" · tiếng: kim đồng hồ tích tắc nhanh
  [wd(LA, 'for') - 0.15, (t, X) => { wide(X, { min: clk(X), droop: droop(X), nMood: X > T.spect ? 'closed' : 'smug', schab: { mouth: Math.floor(X * 3) % 3 ? 'o' : 'flat' } });
    for (const [x, tt] of [[BACKS[1][0] + 60, T.spect], [BACKS[2][0] + 60, T.spect + 0.5]]) if (X > T.spect) zzz(x, 640, X, tt); }],
  // 4 · 3 tấm thẻ bật theo từ: COMMITTEES / REFORMS / MORE COMMITTEES · tiếng: giấy đặt bộp ×3
  [ST(LB), (t, X) => { wide(X, { min: null, droop: 1, nMood: 'closed' });
    [['COMMITTEES', 120, T.cm1], ['REFORMS', 625, T.ref], ['MORE COMMITTEES', 1130, T.more]].forEach(([txt, x, t0], i) => { const k = pop(X, t0, 0.3); if (k <= 0) return; g.save(); g.translate(x + 235, 190); g.rotate((i - 1) * 0.04); const s = back(k); g.scale(s, s);
      g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(-235, -75, 470, 150, 18); g.fill(); g.stroke(); g.fillStyle = INK; g.font = '900 56px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 4); g.restore(); });
    zzz(BACKS[1][0] + 60, 640, X, T.cm1 - 3); }],
  // 5 · WIDE 18:53 — phóng viên (không tên) giơ tay, Schabowski nhớ ra tờ giấy · tiếng: kim nhảy, tiếng chuông nhỏ
  [ST(LC), (t, X) => { wide(X, { min: clk(X), droop: 1 - ease(clamp((X - T.f53) / 0.6)), up: [0, ease(clamp((X - T.ital) / 0.4)), 0], nMood: X > T.f53 ? 'smug' : 'closed',
      schab: { eyes: X > T.note - 1 ? 'dot' : 'bored', look: X > T.note - 1 ? -1 : 0, memo: X > T.note - 0.6 } }); }],
  // 6 · CLOSE — Schabowski đọc tờ giấy, vấp, mồ hôi · tiếng: giọng đọc lắp bắp, giấy sột soạt
  [ST(LD), (t, X) => { close(X, { mouth: Math.floor(X * 5) % 3 ? 'o' : 'flat', sweat: X > T.stumb, look: Math.sin(X * 3) > 0 ? 1 : -1 });
    memo(HOLD[0], HOLD[1], 260, 0.15, { seed: 1 }); hand(930, 700); }],
  // 7 · WIDE — phòng xôn xao: vạch ồn quanh đầu, "LEAVE?!" bật theo từ "leave" · tiếng: nhốn nháo, bút lạch cạch
  [T.room - 0.2, (t, X) => { wide(X, { min: clk(X), sway: true, nMood: 'shock', offEyes: 'shock', schab: { memo: true, sweat: true, eyes: 'dot', look: 1 } }); buzz(X, ease(clamp((X - T.buzz) / 0.4)));
    bub('LEAVE?!', 1120, 470, 1180, 650, pop(X, T.leave, 0.3), 56); }],
  // 8 · WIDE — NGƯỜI DẪN (nhập vai #5) giơ tay hỏi: "WHEN?" · tiếng: lặng, một tiếng ho
  [ST(LE), (t, X) => { wide(X, { min: clk(X), nArms: 'wave', nMood: X > T.when ? 'angry' : 'smug', schab: { memo: true, sweat: true, eyes: 'shock' } });
    bub('WHEN?', 1610, 500, SEAT.x + 20, 690, pop(X, T.when, 0.3), 64); }],
  // 9 · CLOSE — Schabowski lật giấy (nhiều trang bay đi), mồ hôi, tìm câu trả lời · tiếng: giấy lật liên tục, tim đập
  [ST(LF), (t, X) => { const lost = X > T.looked; close(X, { sweat: true, eyes: lost ? 'shock' : 'dot', mouth: lost ? 'frown' : 'flat', look: Math.sin(X * 4) * 1, arm: X > T.wasnt ? 'up' : null });
    const p = lost ? (T.looked - X + 0.5 > 0 ? (X - T.shuf) * 2.2 : (T.looked - T.shuf) * 2.2) : (X - T.shuf) * 2.2, cur = Math.floor(p);
    for (let k = Math.max(0, cur - 2); k < cur; k++) { const u = p - k - 0.0; if (u > 1.6) continue; const e = easeOut(clamp(u)); g.save(); g.globalAlpha = 1 - clamp(u - 0.9, 0, 0.7);
      memo(HOLD[0] + 300 * e, HOLD[1] - 40 * e + 40 * u, 260, 0.15 + 0.9 * e, { seed: k + 5 }); g.restore(); }
    memo(HOLD[0], HOLD[1], 260, 0.15, { seed: cur }); hand(930, 700);
    S.label('???', 1450, 330, 140, lost ? pop(X, T.looked + 0.6, 0.3) : 0, '#FFFFFF', { stroke: INK }); }],
  // 10 · CLOSE — câu trích thật; "IMMEDIATELY" nảy đúng từ · tiếng: nhạc căng, "ting" khi từ nổ
  [ST(LG), (t, X) => { close(X, { sweat: true, mouth: Math.floor(X * 6) % 3 ? 'o' : 'flat', squint: true }); memo(HOLD[0], HOLD[1], 260, 0.12, { seed: 1 }); hand(930, 700);
    S.label('AS FAR AS I KNOW, IT TAKES EFFECT', 960, 120, 56, pop(X, ST(LG) + 0.1, 0.3), '#FFFFFF', { stroke: INK });
    const k = pop(X, T.imm, 0.45), [sx, sy] = S.shake(clamp((X - T.imm) / 0.5), 8, X); g.save(); g.translate(sx, sy); S.label('IMMEDIATELY', 960, 265, 150, k, '#FFE14A', { stroke: INK }); g.restore();
    S.label('WITHOUT DELAY', 1450, 600, 66, pop(X, T.without, 0.3), '#FFFFFF', { stroke: INK }); }],
  // 11 · lịch: 9 → 10 NOV · tiếng: lật trang lịch, "tạch"
  [ST(LH), (t, X) => { pressRoom({ dim: 0.75 }); calendar(960, 540, 560, [9, 10], clamp((X - T.tenth + 0.15) / 0.3));
    S.label('?', 1380, 340, 220, pop(X, T.tenth + 0.4, 0.3), '#FFE14A', { stroke: INK }); }],
  // 12 · mặt trời mọc đỏ gạch trên dãy nhà tấm lớn · tiếng: gà gáy xa, gió
  [ST(LI), (t, X) => { const k = ease(clamp((X - ST(LI)) / 2.0)), gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#2B3A6B'); gr.addColorStop(0.55, lerp(0, 1, k) > 0.5 ? '#D86A3A' : '#8A5A7A'); gr.addColorStop(1, '#F0B060'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const sy = lerp(840, 560, k); g.fillStyle = 'rgba(255,200,120,0.35)'; for (let i = 0; i < 10; i++) { const a = i * Math.PI / 10 + Math.PI; g.beginPath(); g.moveTo(960, sy); g.arc(960, sy, 900, a - 0.06, a + 0.06); g.fill(); }
    g.fillStyle = '#C8452F'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.arc(960, sy, 150, 0, 7); g.fill(); g.stroke();
    for (const [x0, w, h, col] of [[0, 360, 380, '#6E3B35'], [330, 300, 300, '#7E4640'], [1300, 320, 330, '#7E4640'], [1560, 400, 430, '#6E3B35']]) { g.fillStyle = col; g.fillRect(x0, 960 - h, w, h + 140); g.strokeRect(x0, 960 - h, w, h + 140);
      g.fillStyle = 'rgba(255,225,150,0.55)'; for (let yy = 960 - h + 40; yy < 940; yy += 80) for (let xx = x0 + 30; xx < x0 + w - 40; xx += 70) g.fillRect(xx, yy, 36, 44); }
    g.fillStyle = '#3A2420'; g.fillRect(0, 1000, W, 80); S.label('MORNING', 960, 270, 130, pop(X, T.morning, 0.35), '#FFFFFF', { stroke: INK }); }],
  // 13 · phòng tối + DẤU "NOBODY READ THE MEMO" lần 1 · tiếng: dấu đóng "bộp" + nhạc ngắt
  [ST(LJ), (t, X) => { wide(X, { dim: 0.5, min: null, nMood: 'closed', schab: { memo: true, eyes: 'dot', look: -1 } }); S.stamp('NOBODY READ THE MEMO', 960, 215, 100, pop(X, T.nobody, 0.45), -0.05); }],
  // 14 · CLOSE — đọc lần đầu: mắt dò từng dòng, ngón tay chạy theo · tiếng: giấy sột soạt, giọng lẩm nhẩm
  [T.reading - 0.1, (t, X) => { const u = clamp((X - T.reading) / (T.first - T.reading + 0.4)); close(X, { eyes: 'dot', mouth: Math.floor(X * 4) % 2 ? 'o' : 'flat', look: Math.sin(u * 20) * 1, sweat: true });
    memo(HOLD[0], HOLD[1], 260, 0.12, { seed: 1 }); const ly = HOLD[1] - 110 + u * 220; g.fillStyle = 'rgba(255,225,70,0.45)'; g.fillRect(HOLD[0] - 100, ly - 12, 200, 24); hand(HOLD[0] - 135, ly + 14, 22); }],
  // 15 · memo to + ngón tay dò tới dòng "3." · tiếng: giấy xoạt, "ting" khi thấy điểm 3
  [ST(LK), (t, X) => { pressRoom({ spot: 700 }); const found = pop(X, T.three - 0.3, 0.35);
    P.schab(560, 1090, 820, { eyes: X > T.checked ? 'dot' : 'shock', mouth: X > T.yes ? 'o' : 'flat', sweat: true, look: 1 }); pressTable(880, [[260, 0.3, '#1C1C1F'], [360, 0.18, '#B3262C'], [760, -0.1, '#2B4C7E']]);
    const my = 520, mw = 620; memo(1340, my, mw, 0.06, { seed: 2 }); const ly = lerp(my - 220, my - 40, ease(clamp((X - T.checked) / (T.three - T.checked))));
    g.fillStyle = 'rgba(255,225,70,0.5)'; g.fillRect(1340 - mw * 0.42, ly - 16, mw * 0.84, 36);
    g.save(); g.strokeStyle = INK; g.lineWidth = 46; g.lineCap = 'round'; g.beginPath(); g.moveTo(860, 760); g.lineTo(1340 - mw * 0.44, ly + 10); g.stroke(); g.strokeStyle = '#1D1D21'; g.lineWidth = 34; g.beginPath(); g.moveTo(860, 760); g.lineTo(1340 - mw * 0.44, ly + 10); g.stroke(); g.restore(); hand(1340 - mw * 0.44, ly + 10, 30);
    S.label('3.', 1340 - mw * 0.62, ly + 30, 90, found, '#FFE14A', { stroke: INK, free: true }); S.label('WEST BERLIN', 1340, 985, 70, pop(X, T.three, 0.3), '#FFFFFF', { stroke: INK });
    bub('YES.', 760, 330, 600, 500, pop(X, T.yes, 0.25), 60); }],
  // 16 · WIDE — phóng viên Anh (mũ nồi) hỏi về Bức Tường · tiếng: tiếng Anh lịch sự, ghế kẹt
  [ST(LL), (t, X) => { wide(X, { min: clk(X), brit: true, up: [0, 0, ease(clamp((X - T.brit) / 0.4))], nMood: 'shock', schab: { memo: true, sweat: true, eyes: 'dot', look: 1 } });
    bub('THE WALL?', 1330, 500, 1300, 680, pop(X, T.wall - 0.2, 0.3), 56); }],
  // 17 · WIDE — câu trả lời lan man: bong bóng xoắn ốc, 19:00 → ông đứng dậy · tiếng: giọng đều đều, kim 19:00
  [ST(LM), (t, X) => { const up = ease(clamp((X - T.wrapped) / 0.4)); wide(X, { min: clk(X), droop: ease(clamp((X - T.arm) / 1.5)) * (1 - up), nMood: X > T.arm ? 'closed' : 'smug', brit: true, schab: { mouth: Math.floor(X * 5) % 3 ? 'o' : 'flat', bob: up * 40 } });
    spiralBubble(700, 215, (1 - up) * ease(clamp((X - T.wander) / 0.5)), X); }],
  // 18 · phim trường: Schabowski + người dẫn tin Mỹ (com-lê, không logo), đèn ON AIR · tiếng: tiếng phim trường, "YES" lặp
  [ST(LN), (t, X) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#2B3340'); gr.addColorStop(1, '#14181F'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(255,240,200,0.10)'; for (const x of [640, 1230]) { g.beginPath(); g.moveTo(x - 60, 0); g.lineTo(x + 60, 0); g.lineTo(x + 330, 900); g.lineTo(x - 330, 900); g.closePath(); g.fill(); }
    g.save(); g.fillStyle = '#B3262C'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(1560, 100, 250, 90, 14); g.fill(); g.stroke(); g.restore(); S.label('ON AIR', 1685, 165, 56, 1, '#FFFFFF', { free: true });
    P.schab(620, 960, 620, { eyes: 'dot', mouth: X > T.said2 ? 'o' : 'flat', sweat: true, look: 1 }); C.folk(1180, 960, 620, { skin: SK, coat: 'suit', eyes: 'dot', mouth: Math.floor(X * 3) % 2 ? 'smile' : 'flat', look: -1 });
    g.fillStyle = '#4A3F36'; g.strokeStyle = INK; g.lineWidth = 7; g.fillRect(380, 820, 1020, 260); g.strokeRect(380, 820, 1020, 260); mic(800, 830, 90, 0.05, '#1C1C1F'); mic(1010, 830, 90, -0.05, '#1C1C1F');
    tvCamera(1630, 640, 1.0, X); bub('YES, OF COURSE', 640, 150, 640, 400, pop(X, T.said2, 0.3), 56); }],
  ]; };
