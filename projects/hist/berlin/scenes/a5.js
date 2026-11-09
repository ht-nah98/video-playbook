// hồi a5 · The memo (BRIEF-SCENES.md) — người C. Krenz + nồi áp suất → bộ Nội vụ + dự thảo 6/11 (cuộn "CONDITIONS", thị trưởng "COMPLETE TRASH", vào thùng rác)
// → sáng 9/11 (máy chữ, Stasi áo xám, tờ giấy ra lò) → lãnh đạo duyệt, lịch 10 NOV + EMBARGO → Schabowski (thẻ tên, không có mặt trong phòng, Krenz đưa giấy,
// "EASY.") → bước vào phòng báo chí → cận người dẫn đội mũ tốt nghiệp (≤ 1.2 s, đùa của người dẫn — không phải nhập vai).
// Tiếng chính: nồi rít (hơi), máy chữ lách cách (cả hồi), "thud" dấu, bước chân hành lang, đám đông xì xào sau cửa.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, memo, cap, SK } from './common.js';
import { bindG, pop, sky, box, disc, txt, dim, suitcase } from './a4.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;

export default K => { const { g: ctx, LT, wd, ST } = K; g = ctx; bindG(ctx);
  const L1 = 'Krenz needed', L2 = 'So he asked', L3 = 'Back to the drawing', L4 = 'On the morning of', L5 = 'The leadership approved', L6 = "Now here's the guy",
    L7 = "Schabowski hadn't", L8 = 'Shortly before', L9 = 'Schabowski later said', L10 = 'So he walked into';
  const T = { steam: wd(L1, 'steam'), out1: wd(L1, 'out'),
    travel: wd(L2, 'travel'), nov: wd(L2, 'november'), draft: wd(L2, 'draft'), cond: wd(L2, 'conditions'), delays: wd(L2, 'delays'), west: wd(L2, 'west'), mayor: wd(L2, 'mayor'), complete: wd(L2, 'complete'), trash: wd(L2, 'trash'),
    board: wd(L3, 'board'),
    ninth: wd(L4, 'ninth'), working: wd(L4, 'working'), stasi: wd(L4, 'stasi'), rushed: wd(L4, 'rushed'), cross: wd(L4, 'cross'), west4: wd(L4, 'west'),
    approved: wd(L5, 'approved'), afternoon: wd(L5, 'afternoon'), meant: wd(L5, 'meant'), next5: wd(L5, 'next'), tenth: wd(L5, 'tenth'), held: wd(L5, 'held'), morning: wd(L5, 'morning'),
    announce: wd(L6, 'announce'), schab6: wd(L6, 'schabowski'), spokes: wd(L6, 'spokesman'),
    helped: wd(L7, 'helped'), room: wd(L7, 'room'), wasnt: wd(L7, "wasn't"),
    evening: wd(L8, 'evening'), krenz8: wd(L8, 'krenz'), handed: wd(L8, 'handed'), him: wd(L8, 'him'), note: wd(L8, 'note'), instr: wd(L8, 'instructions'),
    thought: wd(L9, 'thought'), simple: wd(L9, 'simple'), read: wd(L9, 'read'), text: wd(L9, 'text'), mistakes: wd(L9, 'mistakes'),
    walked: wd(L10, 'walked'), press: wd(L10, 'press'), piece: wd(L10, 'piece'), understand: wd(L10, 'understand'), which: wd(L10, 'which'), college: wd(L10, 'college'), i: wd(L10, 'i') };
  const END = LT('The press conference started').start - 0.2;

  const kr = (x, y, h, o = {}) => P.krenz(x, y, h, o), sc = (x, y, h, o = {}) => P.schab(x, y, h, o);
  const official = (x, y, h, o = {}) => C.folk(x, y, h, { skin: SK, coat: 'suit', eyes: 'dot', ...o });
  const room = (a = '#D7CBB0', b = '#8A6A46', fy = 800) => { box(0, 0, W, fy, a, 0); box(0, fy, W, H - fy, b, 0); g.fillStyle = '#B3262C'; g.fillRect(0, fy - 60, W, 60); g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(-10, fy - 60, W + 20, 60); };
  const clock = (x, y, r, hrs, mins) => { disc(x, y, r, '#FBF8EE', 6); g.strokeStyle = INK; g.lineWidth = 4; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.beginPath(); g.moveTo(x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82); g.lineTo(x + Math.sin(a) * r * 0.94, y - Math.cos(a) * r * 0.94); g.stroke(); }
    const ah = hrs / 12 * Math.PI * 2, am = mins / 60 * Math.PI * 2; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5); g.stroke(); g.lineWidth = 5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(am) * r * 0.78, y - Math.cos(am) * r * 0.78); g.stroke(); disc(x, y, 7, INK, 0); };
  const typewriter = (x, y, s, X, busy = 1) => { g.save(); g.translate(x, y); g.scale(s, s); box(-90, -50, 180, 50, '#3A3F46'); box(-70, -85, 140, 36, '#4A5058'); g.fillStyle = '#9AA0A8'; for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) { const d = busy * Math.max(0, Math.sin(X * 22 + c * 1.7 + r)) * 5; g.fillRect(-72 + c * 19, -42 + r * 18 + d, 14, 11); }
    g.fillStyle = '#FBF8EE'; g.save(); g.translate(0, -85); g.rotate(-0.04); g.fillRect(-48, -70, 96, 74); g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(-48, -70, 96, 74); g.fillStyle = '#9A978C'; for (let i = 0; i < 4; i++) g.fillRect(-36, -58 + i * 15, 50 + 20 * hash(i), 5); g.restore(); g.restore(); };
  const check = (x, y, s, k) => { if (k <= 0) return; g.save(); g.strokeStyle = '#2E9E58'; g.lineWidth = 22 * s; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x - 50 * s, y); g.lineTo(x - 15 * s, y + 40 * s * clamp(k * 2)); if (k > 0.5) g.lineTo(lerp(x - 15 * s, x + 60 * s, (k - 0.5) * 2), lerp(y + 40 * s, y - 50 * s, (k - 0.5) * 2)); g.stroke(); g.restore(); };
  const quest = (x, y, s, X, k = 1) => { if (k <= 0) return; S.label('?', x, y + 6 * Math.sin(X * 6), s, k, RED, { stroke: '#FFF' }); };

  // ── nồi áp suất ──
  const kettle = (t, X) => { room('#E8DCC0', '#9A8A6A', 780); box(1000, 700, 620, 260, '#4A4A52'); for (const kx of [1100, 1500]) disc(kx, 725, 22, '#222', 3);
    const pot = X > T.steam ? Math.sin(t * 45) * 4 : 0; g.save(); g.translate(pot, 0); box(1060, 480, 500, 220, '#B9BEC6'); g.fillStyle = '#9CA2AB'; g.fillRect(1040, 450, 540, 44); g.strokeRect(1040, 450, 540, 44); box(1280, 420, 60, 36, '#555'); box(1580, 540, 80, 28, '#6B6B72'); box(960, 540, 80, 28, '#6B6B72');
    const u = clamp((X - T.steam) / 0.4); for (let i = 0; i < 7; i++) { const k = ((t * 0.9 + i / 7) % 1) * (X > T.steam - 0.2 ? 1 : 0.35), r = 30 + 60 * k; g.fillStyle = `rgba(255,255,255,${0.9 * (1 - k)})`; g.beginPath(); g.arc(1310 + Math.sin(i * 2 + t * 3) * 40, 410 - k * 340, r, 0, 7); g.fill(); g.strokeStyle = `rgba(30,35,40,${0.5 * (1 - k)})`; g.lineWidth = 3; g.stroke(); }
    if (u > 0) { g.strokeStyle = '#FFF'; g.lineWidth = 18; g.lineCap = 'round'; for (const d of [-1, 1]) { g.beginPath(); g.moveTo(1310 + d * 18, 412); g.lineTo(1310 + d * (60 + 80 * u), 360 - 40 * u); g.stroke(); } } g.restore();
    kr(520, 960, 560, { eyes: 'shock', sweat: true, look: 1 }); S.label('PSSSHHH!', 1290, 250, 110, pop(X, T.steam, 0.3), RED, { stroke: '#FFF', rot: -0.06 }); };

  // ── bộ Nội vụ xin luật du lịch mới ──
  const ministry = (t, X) => { sky('#CFE0EA', '#EAD9B5', 600); box(0, 840, W, 240, '#A9A59A', 0); box(560, 200, 800, 640, '#9EA3AB'); for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) box(610 + c * 150, 260 + r * 150, 90, 100, '#6FA7CF', 4);
    box(900, 640, 120, 200, '#5E4630'); box(560, 170, 800, 40, '#7A7F88'); box(660, 90, 600, 70, '#FBF8EE'); txt('INTERIOR MINISTRY', 960, 140, 42); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(960, 90); g.lineTo(960, -10); g.stroke();
    for (let i = 0; i < 3; i++) { g.fillStyle = ['#151515', '#C8102E', '#F2C500'][i]; g.fillRect(964, 6 + i * 16, 110, 16); }
    kr(330, 1000, 520, { eyes: 'dot', look: 1, arm: 'up' }); official(1560, 1000, 440, { eyes: 'dot', look: -1 });
    bubble(g, 'NEW TRAVEL LAW', 380, 300, 330, 520, pop(X, T.travel - 0.4, 0.4), 46); };
  const scroll = (t, X) => { sky('#E8DCC0', '#CDBB93'); box(0, 900, W, 180, '#8A6A46', 0); const k = easeOut(clamp(t / 3.6)), L = 860 * k, x = 960, top = 110, w = 560;
    g.save(); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 7; g.fillRect(x - w / 2, top, w, L); g.strokeRect(x - w / 2, top, w, L); g.beginPath(); g.rect(x - w / 2, top, w, L); g.clip(); g.font = '900 44px Archivo, sans-serif'; g.textAlign = 'center'; g.fillStyle = '#7A776C';
    for (let i = 0; i * 74 < L + 74; i++) { const word = X > T.delays && i % 2 ? 'DELAYS' : 'CONDITIONS'; g.fillText(word, x, top + 70 + i * 74); } g.restore();
    g.fillStyle = '#E4DAC0'; g.beginPath(); g.roundRect(x - w / 2 - 14, top - 22, w + 28, 44, 22); g.fill(); g.stroke(); g.beginPath(); g.roundRect(x - w / 2 - 14, top + L - 14, w + 28, 44, 22); g.fill(); g.stroke();
    official(330, 1000, 470, { eyes: 'shock', look: 1 }); S.label('6 NOV', 330, 240, 110, pop(X, T.nov, 0.3), INK, { stroke: '#FFF' }); S.label('DRAFT', 1560, 300, 100, pop(X, T.draft, 0.3), RED, { stroke: '#FFF', rot: 0.08 }); };
  const mayor = (t, X) => { sky('#B9D4E8', '#E9E2CF', 560); box(0, 900, W, 180, '#8F8F95', 0); box(160, 200, 640, 180, '#1E2330'); g.strokeStyle = '#F2C95A'; g.lineWidth = 8; g.strokeRect(178, 218, 604, 144); txt('WEST BERLIN', 480, 316, 72, '#FF6FA8');
    const k = easeOut(clamp(t / 0.5)); const hx = 1250 + (1 - k) * 400; C.folk(hx, 1000, 560, { skin: SK, coat: 'suit', eyes: 'angry', mouth: 'frown', look: 1, arm: 'up' });
    g.save(); g.translate(hx + 150, 640); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-60, 0, 120, 340); g.strokeRect(-60, 0, 120, 340); g.fillStyle = '#9A978C'; for (let i = 0; i < 9; i++) g.fillRect(-44, 20 + i * 34, 60 + 20 * hash(i), 8); g.restore();
    S.nameTag("WEST BERLIN'S MAYOR", pop(X, T.mayor, 0.3), 96, 1010); bubble(g, 'COMPLETE TRASH', 760, 620, 1000, 760, pop(X, T.complete, 0.3), 52); };
  const bin = (t, X) => { room('#E4D8BC', '#8A6A46', 800); g.save(); g.translate(560, 0); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(-60, 960); g.lineTo(-210, 1060); g.moveTo(60, 960); g.lineTo(210, 1060); g.stroke(); box(-250, 260, 500, 640, '#F2EFE6', 7); const nb = pop(X, T.board, 0.4);
    if (nb > 0) { g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(-150, 330); g.lineTo(-150 + 300 * nb, 330); g.stroke(); } g.restore();
    g.fillStyle = '#6B6B72'; g.beginPath(); g.moveTo(1380, 700); g.lineTo(1660, 700); g.lineTo(1620, 960); g.lineTo(1420, 960); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 7; g.stroke(); g.fillStyle = '#FBF8EE'; for (const [bx, by] of [[1450, 690], [1560, 700], [1510, 670]]) disc(bx, by, 36, '#FBF8EE', 4);
    kr(1000, 960, 520, { eyes: 'bored', mouth: 'flat', look: -1 }); const u = clamp(t / 0.9), bx = lerp(1110, 1520, u), by = lerp(560, 690, u * u) - Math.sin(u * Math.PI) * 220; if (u < 1) { g.save(); g.translate(bx, by); g.rotate(t * 9); disc(0, 0, 40, '#FBF8EE', 5); g.strokeStyle = '#9A978C'; g.lineWidth = 4; g.beginPath(); g.moveTo(-20, -10); g.lineTo(10, 14); g.moveTo(-8, -26); g.lineTo(22, -4); g.stroke(); g.restore(); } else disc(1520, 690, 40, '#FBF8EE', 5); };

  // ── sáng 9/11 ──
  const morning = (X, o) => { room('#DCD0B4', '#8A6A46', 800); const k = ease(clamp((X - T.ninth + 3) / 4)); g.save(); box(740, 150, 440, 400, '#8EC0E6'); g.beginPath(); g.rect(740, 150, 440, 400); g.clip(); g.fillStyle = '#FFD84A'; g.beginPath(); g.arc(960, 560 - 200 * k, 70, 0, 7); g.fill(); g.restore(); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(740, 150, 440, 400); g.beginPath(); g.moveTo(960, 150); g.lineTo(960, 550); g.stroke();
    clock(1440, 260, 100, o.hr, o.mn); const cp = pop(X, T.ninth, 0.3); if (cp > 0) { g.save(); g.translate(560, 230); g.scale(back(cp), back(cp)); box(-120, -130, 240, 250, '#FBF8EE', 6); box(-120, -130, 240, 60, RED, 6); txt('NOV', 0, -85, 40, '#FFF'); txt('9', 0, 60, 130); g.restore(); }
    for (const [dx, i] of [[280, 0], [1520, 1]]) { box(dx - 260, 800, 520, 180, '#6B4A2E'); typewriter(dx, 800, 1.5, X, o.busy); official(dx + (i ? -170 : 170), 800, 440, { look: i ? 1 : -1, arm: Math.sin(X * 22 + i) > 0 ? 'up' : null, sweat: o.sweat }); } };
  const stasiGuy = (x, y, h, X) => { C.folk(x, y, h, { skin: SK, coat: 'german', eyes: 'dot', mouth: 'flat', look: 0 }); const R = h * 0.21, hy = y - h * 0.58 - R * 0.72; cap(x, hy, R, '#3A3F4A', '#222'); g.save(); g.fillStyle = '#1A1A1A'; g.strokeStyle = INK; g.lineWidth = 3; for (const s of [-1, 1]) { g.beginPath(); g.roundRect(x + s * R * 0.3 - R * 0.22, hy - R * 0.02, R * 0.44, R * 0.26, 4); g.fill(); g.stroke(); } g.restore(); };
  const morning1 = (t, X) => morning(X, { hr: 8, mn: 0, busy: 0.6 });
  const morning2 = (t, X) => { morning(X, { hr: 8.5, mn: 12, busy: 1 }); stasiGuy(960, 1000, 470, X); S.nameTag('THE STASI', pop(X, T.stasi, 0.3), 96, 1010); };
  const rushed = (t, X) => { room('#DCD0B4', '#8A6A46', 800); clock(960, 220, 120, (X - T.rushed) * 2.5, (X - T.rushed) * 30); typewriter(960, 860, 2.2, X, 1.4);
    for (let i = 0; i < 9; i++) { const k = ((t * 0.8 + i * 0.37) % 1), x = 960 + (hash(i) - 0.5) * 1500 * k, y = 760 - k * 560 + 380 * k * k; g.save(); g.translate(x, y); g.rotate(k * 6 + i); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 3; g.fillRect(-34, -44, 68, 88); g.strokeRect(-34, -44, 68, 88); g.restore(); }
    official(300, 1000, 440, { eyes: 'shock', sweat: true, arm: 'up', look: 1 }); stasiGuy(1620, 1000, 470, X);
    const m = easeOut(clamp((X - T.rushed - 0.4) / 0.9)); memo(960, 760 - m * 120, 360 * (0.4 + 0.6 * m), 0.04 * Math.sin(t * 5), { title: 'NEW RULE', seed: 4 }); };
  const gate = (t, X) => { sky('#CFE0EA', '#EAD9B5', 600); box(0, 820, W, 260, '#A9A59A', 0); const up = ease(clamp((X - T.cross) / 0.7));
    memo(600, 560, 440, -0.05, { title: 'NEW RULE', seed: 4 }); g.save(); g.translate(1180, 760); box(-30, -360, 60, 360, '#E8E4D8'); box(-40, -400, 80, 50, '#3A5A4A'); g.translate(0, -300); g.rotate(-1.3 * up); g.fillStyle = '#F4F1E8'; g.fillRect(0, -16, 460, 32);
    g.fillStyle = RED; for (let i = 0; i < 5; i++) g.fillRect(40 + i * 92, -16, 46, 32); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(0, -16, 460, 32); g.restore();
    for (let i = 0; i < 5; i++) { const x = 1250 + ((t * 0.5 + i * 0.22) % 1) * 750 * up; C.folk(x, 900, 220, { eyes: 'happy', coat: ['worker', 'plain', 'driver'][i % 3], look: 1 }); suitcase(x + 33, 898, 220); }
    S.label('WEST BERLIN', 1450, 200, 100, pop(X, T.west4, 0.3), INK, { stroke: '#FFF' }); };

  // ── lãnh đạo duyệt, lịch 10/11 ──
  const approve = (t, X) => { room('#E6D6B0', '#7A5A3A', 760); box(1360, 120, 360, 420, '#FFD98A'); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(1540, 120); g.lineTo(1540, 540); g.moveTo(1360, 330); g.lineTo(1720, 330); g.stroke();
    const ap = X > T.approved; [330, 700, 1070, 1440].forEach((x, i) => official(x, 880, 430, { arm: ap && i % 2 === 0 ? 'up' : null, eyes: ap ? 'happy' : 'dot', look: 0 })); box(100, 860, 1720, 40, '#6B4A2E'); box(140, 900, 1640, 200, '#5A3E26');
    S.stamp('APPROVED', 760, 250, 110, pop(X, T.approved, 0.5), -0.07); };
  const calendar = (t, X) => { sky('#E8DCC0', '#CDBB93'); box(0, 900, W, 180, '#8A6A46', 0); const f = clamp((X - T.next5) / 0.45), sq = f < 0.5 ? 1 - f * 2 : (f - 0.5) * 2, n = f < 0.5 ? '9' : '10'; g.save(); g.translate(960, 520); g.scale(1, Math.max(0.02, f > 0 && f < 1 ? sq : 1));
    box(-300, -330, 600, 700, '#FBF8EE', 8); box(-300, -330, 600, 130, RED, 8); txt('NOV', 0, -240, 90, '#FFF'); txt(n, 0, 150, 340); g.restore(); const k = pop(X, T.tenth, 0.4); if (k > 0) S.stamp('NEXT DAY', 1500, 300, 70, k, 0.1); };
  const embargo = (t, X) => { sky('#CFE0EA', '#EAD9B5', 620); box(0, 800, W, 280, '#8F8F95', 0); const sun = ease(clamp((X - T.morning + 0.3) / 1.2)); g.save(); g.beginPath(); g.rect(0, 0, W, 800); g.clip(); g.fillStyle = '#FFD84A'; g.beginPath(); g.arc(1560, 860 - 260 * sun, 110, 0, 7); g.fill(); g.restore();
    memo(700, 480, 480, -0.04, { title: 'NEW RULE', seed: 4 }); S.stamp('EMBARGO: MORNING', 960, 880, 92, pop(X, T.held, 0.5), -0.05); };

  // ── Schabowski ──
  const intro = (t, X) => { box(0, 0, W, H, '#CFC6B2', 0); g.fillStyle = 'rgba(255,240,200,0.35)'; g.beginPath(); g.ellipse(1180, 520, 520, 640, 0, 0, 7); g.fill(); g.fillStyle = '#7A1E22'; g.fillRect(0, 0, 220, H); g.fillRect(W - 220, 0, 220, H);
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 6; g.beginPath(); g.moveTo(i * 38 + 20, 0); g.lineTo(i * 38 + 20, H); g.stroke(); g.beginPath(); g.moveTo(W - 220 + i * 38 + 20, 0); g.lineTo(W - 220 + i * 38 + 20, H); g.stroke(); }
    box(0, 960, W, 120, '#4A3A2A', 0); sc(1180, 960, 760, { eyes: 'dot', mouth: Math.sin(X * 13) > 0 && X > T.schab6 ? 'o' : 'grin', arm: 'up' });
    S.nameTag('GÜNTER SCHABOWSKI', pop(X, T.schab6 - 0.3, 0.3), 96, 940); S.nameTag('PARTY SPOKESMAN', pop(X, T.spokes, 0.3), 96, 1010); };
  const outside = (t, X) => { box(0, 0, 940, H, '#E4D8BC', 0); box(940, 0, W - 940, H, '#8FA08A', 0); box(0, 860, 940, 220, '#8A6A46', 0); box(940, 860, W - 940, 220, '#6E7A6A', 0); box(900, 120, 240, 740, '#7A5A3E', 7); disc(1090, 520, 14, '#E8C04A', 3);
    box(120, 700, 700, 40, '#6B4A2E'); box(160, 740, 620, 140, '#5A3E26'); memo(480, 650, 170, 0.1, { seed: 2 }); official(260, 700, 380, { eyes: 'dot', arm: Math.sin(t * 8) > 0 ? 'up' : null, look: 1 }); official(700, 700, 380, { eyes: 'dot', look: -1 });
    const k = ease(clamp(t / 0.6)); sc(1500, 960, 560, { eyes: 'bored', mouth: 'flat', look: -1, arm: X > T.helped ? 'up' : null }); quest(1500, 340, 160, X, pop(X, T.helped + 0.2, 0.3)); };
  const meetingRoom = (t, X) => { room('#E4D8BC', '#8A6A46', 740); box(120, 150, 400, 300, '#8EC0E6'); [260, 600, 940, 1280].forEach((x, i) => official(x, 880, 430, { look: i % 2 ? 1 : -1, eyes: 'dot', arm: Math.sin(t * 5 + i) > 0.7 ? 'up' : null }));
    box(1620, 560, 220, 330, '#2F3A2E'); box(1640, 880, 180, 20, '#2F3A2E', 4); box(80, 880, 1800, 36, '#6B4A2E'); box(110, 916, 1740, 200, '#5A3E26'); const k = pop(X, T.wasnt, 0.3); if (k > 0) { g.save(); g.translate(1730, 840); g.scale(back(k), back(k)); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(-130, 40); g.lineTo(-100, -34); g.lineTo(100, -34); g.lineTo(130, 40); g.closePath(); g.fill(); g.stroke(); txt('SCHABOWSKI', 0, 12, 22); g.restore(); } };
  const corridor = (X, dk = 0) => { box(0, 0, W, 820, '#C9CFC4', 0); box(0, 820, W, 260, '#7C8478', 0); g.fillStyle = '#B3262C'; g.fillRect(0, 760, W, 60); g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(-10, 760, W + 20, 60); for (const x of [300, 960, 1620]) { box(x - 60, 40, 120, 40, '#FBF8EE'); }
    if (dk) dim(dk, '15,15,40'); };
  const waiting = (t, X) => { corridor(X, clamp((X - T.evening) / 1.5) * 0.35); box(1330, 200, 360, 580, '#5E4630', 7); box(1340, 120, 340, 60, '#FBF8EE'); txt('PRESS CONFERENCE', 1510, 162, 26); disc(1655, 500, 14, '#E8C04A', 3); clock(560, 280, 100, 5, 40);
    sc(980, 960, 540, { eyes: 'dot', mouth: 'flat', look: 1 }); };
  const handoff = (t, X) => { corridor(X, 0.3); const ek = ease(clamp((X - T.krenz8 + 0.5) / 0.7)), kx = lerp(120, 640, ek), m = easeOut(clamp((X - T.handed) / 0.7));
    kr(kx, 960, 540, { eyes: 'dot', look: 1, arm: 'up' }); sc(1280, 960, 540, { eyes: 'dot', mouth: 'flat', look: -1 }); memo(lerp(kx + 170, 1160, m), 700 - Math.sin(m * Math.PI) * 70, 170, 0.15 - m * 0.1, { seed: 3 }); };
  const noInstr = (t, X) => { corridor(X, 0.3); const away = ease(clamp((X - T.instr + 0.4) / 1.3)); kr(lerp(640, -200, away), 960, 540, { eyes: 'happy', look: -1, arm: 'up' }); sc(1280, 960, 540, { eyes: 'dot', mouth: 'flat', look: 0 }); memo(1160, 700, 170, 0.05, { seed: 3 }); quest(1280, 330, 190, X, pop(X, T.instr, 0.3)); };

  const thought = (t, X) => { box(0, 0, W, H, '#CFC6B2', 0); box(0, 960, W, 120, '#4A3A2A', 0); sc(900, 960, 640, { eyes: 'dot', mouth: 'grin', look: 1 });
    const k = pop(X, T.thought, 0.4); if (k > 0) { g.save(); g.translate(1400, 340); g.scale(back(k), back(k)); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 6; for (const [dx, dy, r] of [[-360, 250, 16], [-310, 190, 24]]) disc(dx, dy, r, '#FFF', 5); g.beginPath(); for (const [dx, dy, r] of [[-170, 0, 130], [0, -60, 150], [170, 0, 130], [60, 70, 120], [-80, 80, 110]]) { g.moveTo(dx + r, dy); g.arc(dx, dy, r, 0, 7); } g.fill(); g.stroke(); g.beginPath(); for (const [dx, dy, r] of [[-170, 0, 124], [0, -60, 144], [170, 0, 124], [60, 70, 114], [-80, 80, 104]]) { g.moveTo(dx + r, dy); g.arc(dx, dy, r, 0, 7); } g.fill(); g.restore(); }
    const e = pop(X, T.simple, 0.3); if (e > 0) S.label('EASY.', 1400, 340, 130, e, INK); };
  const reading = (t, X) => { box(0, 0, W, H, '#CFC6B2', 0); box(0, 960, W, 120, '#4A3A2A', 0); sc(700, 960, 640, { eyes: 'dot', mouth: 'o', look: 1 }); memo(1280, 560, 560, 0.03, { title: 'NEW RULE', seed: 4 });
    check(1650, 330, 1, pop(X, T.read, 0.4)); check(1650, 520, 1, pop(X, T.text, 0.4)); check(1650, 710, 1, pop(X, T.mistakes, 0.4)); };
  const doors = (X, open) => { box(1180, 120, 640, 700, '#2A241E', 7); const o = easeOut(open); g.save(); g.beginPath(); g.rect(1180, 120, 640, 700); g.clip(); g.fillStyle = '#FFE9B0'; g.fillRect(1180, 120, 640, 700);
    for (let i = 0; i < 9; i++) { const x = 1220 + i * 68 + (hash(i) - 0.5) * 20, y = 520 + (i % 3) * 50 - 60; g.fillStyle = '#2A241E'; g.beginPath(); g.arc(x, y, 34, 0, 7); g.fill(); g.fillRect(x - 34, y + 20, 68, 200); if (i % 2) { g.fillRect(x - 30, y - 8, 70, 40); g.fillStyle = '#9AA0A8'; g.beginPath(); g.arc(x + 44, y + 12, 14, 0, 7); g.fill(); } }
    g.restore(); for (const s of [-1, 1]) { g.save(); g.fillStyle = '#7A5A3E'; g.strokeStyle = INK; g.lineWidth = 7; const w = 320 * (1 - 0.8 * o); g.fillRect(s < 0 ? 1180 : 1820 - w, 120, w, 700); g.strokeRect(s < 0 ? 1180 : 1820 - w, 120, w, 700); g.restore(); } };
  const enter1 = (t, X) => { corridor(X, 0.1); doors(X, clamp((X - T.press + 0.8) / 0.8)); const x = lerp(260, 1000, ease(clamp(t / 2.4))), bob = Math.abs(Math.sin(t * 7)) * 12; sc(x, 960 - bob, 540, { eyes: 'dot', mouth: 'flat', look: 1 }); memo(x + 150, 740 - bob, 150, 0.1, { seed: 3 }); };
  const confused = (t, X) => { corridor(X, 0.1); doors(X, 1); sc(900, 960, 620, { eyes: 'bored', mouth: 'frown', look: 0, sweat: true }); memo(1090, 700, 220, 0.04, { seed: 3 }); for (let i = 0; i < 3; i++) quest(640 + i * 230, 240 + (i % 2) * 70, 120, X + i, pop(X, T.understand - 0.4 + i * 0.25, 0.3)); };
  const gradFace = (t, X) => { g.fillStyle = '#121212'; g.fillRect(0, 0, W, H); const s = t < 0.12 ? 1.05 : 1, h = 1150 * s, y = 1290 * s; narrator(980, y, h, { v: 'C', mood: 'smug', mouth: 'grin' }); const r = 0.36 * h, hy = y - 0.42 * h - r * 0.78, bx = 980, by = hy - r * 0.74;
    g.save(); g.lineWidth = 8; g.strokeStyle = INK; g.fillStyle = '#1B1B1F'; g.beginPath(); g.moveTo(bx, by - r * 0.28); g.lineTo(bx + r * 1.0, by); g.lineTo(bx, by + r * 0.28); g.lineTo(bx - r * 1.0, by); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#2A2A30'; g.beginPath(); g.moveTo(bx - r * 0.5, by + r * 0.1); g.lineTo(bx - r * 0.5, by + r * 0.42); g.quadraticCurveTo(bx, by + r * 0.62, bx + r * 0.5, by + r * 0.42); g.lineTo(bx + r * 0.5, by + r * 0.1); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#E8C04A'; g.lineWidth = 8; g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + r * 0.85, by + r * 0.05); g.lineTo(bx + r * 0.85, by + r * 0.55); g.stroke(); disc(bx + r * 0.85, by + r * 0.62, 16, '#E8C04A', 3); g.restore(); };
  const enter2 = (t, X) => { corridor(X, 0.1); doors(X, 1); const x = 1000 + t * 120; sc(x, 960, 540, { eyes: 'dot', mouth: 'flat', look: 1 }); memo(x + 150, 740, 150, 0.1, { seed: 3 }); };

  return [
    [ST(L1), kettle],
    [ST(L2), ministry],
    [T.nov - 0.2, scroll],
    [T.west - 0.2, mayor],
    [ST(L3), bin],
    [ST(L4), morning1],
    [T.working - 0.2, morning2],
    [T.rushed - 0.25, rushed],
    [T.cross - 0.5, gate],
    [ST(L5), approve],
    [T.meant - 0.25, calendar],
    [T.held - 0.35, embargo],
    [ST(L6), intro],
    [ST(L7), outside],
    [T.wasnt - 0.3, meetingRoom],
    [ST(L8), waiting],
    [T.krenz8 - 0.5, handoff],
    [T.instr - 0.4, noInstr],
    [ST(L9), thought],
    [T.read - 0.5, reading],
    [ST(L10), enter1],
    [T.piece - 0.3, confused],
    [T.i - 0.15, gradFace],
    [T.i + 1.05, enter2],
  ]; };
