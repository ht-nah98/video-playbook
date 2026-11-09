// a0 — Cold open (0–55 s). Brief: ../BRIEF-SCENES.md. Mọi mốc theo TỪ (wd), không gõ giây.
// Người dẫn: S0 (chào, giữa → góc), S1 phần "promised" (góc). Cảnh họp báo + chết lặng: không người dẫn. Cameo nhập vai: không có ở hồi này.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, bubble, ll, INK } from '../../_kit/mapkit.js';
import { P, memo, pressRoom, pressTable } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;
const kin = (X, t0, d = 0.25) => clamp((X - t0) / d);
const DARK = '#141416';

/** ngón tay cầm giấy: hai bàn tay da */
function hands(x, y, w, r) { g.save(); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#FCEBD5';
  for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * w * 0.46, y, r, 0, 7); g.fill(); g.stroke(); } g.restore(); }
/** dấu ⏸ + viền tối (đóng băng) */
function freezeFx(t) { g.save(); const gr = g.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.55)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.globalAlpha = 0.55 + 0.35 * (Math.floor(t * 1.6) % 2);
  g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; for (const x of [1730, 1770]) { g.beginPath(); g.roundRect(x, 84, 26, 72, 6); g.fill(); g.stroke(); } g.restore(); }
/** đèn chiếu hình thang từ trần xuống (tối nền) */
function cone(cx, y1, wTop, wBot, a = 0.1) { g.save(); g.fillStyle = `rgba(255,236,190,${a})`; g.beginPath(); g.moveTo(cx - wTop / 2, 0); g.lineTo(cx + wTop / 2, 0); g.lineTo(cx + wBot / 2, y1); g.lineTo(cx - wBot / 2, y1); g.closePath(); g.fill(); g.restore(); }
/** nhóm phông + cảnh họp báo, camera zoom z quanh (cx, cy) */
function room(cam, draw) { const [z, cx, cy] = cam; g.save(); g.translate(W / 2, H / 2); g.scale(z, z); g.translate(-cx, -cy); draw(); g.restore(); }
function road(y, col = '#6E6A63') { g.fillStyle = col; g.fillRect(0, y, W, H - y); g.fillStyle = '#EDE3C8'; for (let x = -40; x < W; x += 160) g.fillRect(x, y + 120, 90, 10); }

export default K => { const { IM, M, M94, LT, wd, ST } = K; g = K.g;
  const L0 = 'Hey everyone', L1 = 'Last time', L2 = 'Well, here it is', L3 = "It's November ninth", L4 = 'His boss handed', L5 = 'A reporter asks', L6 = 'By midnight', L7 = 'Within a year', L8 = 'So how does one', L9 = 'To answer that';
  const T = { biggest: wd(L0, 'biggest'), dis: wd(L0, 'disasters'), tiny: wd(L0, 'tiny'), started: wd(L0, 'started'),
    wrong: wd(L1, 'wrong'), war: wd(L1, 'war'), promised: wd(L1, 'promised'), next: wd(L1, 'next'), even: wd(L1, 'even'), smaller: wd(L1, 'smaller'),
    sheet: wd(L2, 'sheet'), single: wd(L2, 'single'),
    ninth: wd(L3, 'ninth'), east: wd(L3, 'east'), reading: wd(L3, 'reading'), live: wd(L3, 'live'),
    boss: wd(L4, 'boss'), walked: wd(L4, 'walked'), barely: wd(L4, 'barely'),
    rep: wd(L5, 'reporter'), when: wd(L5, 'when'), shuffles: wd(L5, 'shuffles'), squints: wd(L5, 'squints'), says: wd(L5, 'says'), imm: wd(L5, 'immediately'),
    mid: wd(L6, 'midnight'), open: wd(L6, 'open'),
    year: wd(L7, 'year'), country: wd(L7, 'country'), exists: wd(L7, 'exists'),
    beat: wd(L8, 'beat'), t28: wd(L8, 'twenty-eight'), concrete: wd(L8, 'concrete'),
    city: wd(L9, 'city'), cut: wd(L9, 'cut'), half: wd(L9, 'half') };

  /** phòng họp báo (cùng thế giới thumbnail A). o: eyes, mouth, squint, sweat, memoRot, spot */
  function pressShot(X, o = {}) { pressRoom({ spot: o.spot ?? 1000 });
    const sx = o.sx ?? 1000, sy = 900, sh = o.h ?? 760;
    const R = P.schab(sx, sy, sh, { eyes: o.eyes ?? 'bored', mouth: o.mouth ?? (o.talk ? (Math.floor(X * 7) % 2 ? 'o' : 'flat') : undefined), squint: o.squint, sweat: o.sweat, look: o.look ?? 0 });
    if (o.memo !== false) { const mx = sx + sh * 0.34, my = sy - sh * 0.5, mw = sh * 0.3; memo(mx, my, mw, o.memoRot ?? 0.12, { title: 'TRAVEL RULES', seed: 3 }); hands(mx, my + mw * 0.58, mw, sh * 0.036); }
    pressTable(860); return R; }

  return [
    // S0 · nền tối; người dẫn chào giữa khung rồi trượt về góc phải; khối TINY → HUGE bật theo từ · tiếng: pop nhỏ ở "tiny", boom trầm + rung ở "disasters", whoosh mũi tên ở "started"
    // TRAILER 7.4 s (người dùng 11-02: đứng chào phí thời gian): lời giữ nguyên, hình = TV đời cũ chuyển kênh TUA XUÔI 1948 → 1989 bằng PHIM TƯ LIỆU THẬT (PD, assets/film), mỗi kênh một lát nhiễu;
    // người dẫn ngồi trước TV ăn bỏng ngô, cầm điều khiển · "disasters" chữ sập trên phim · "tiny" một tờ giấy bé tí · "stupid" Schabowski nheo mắt · "mistakes" dấu đóng lên tờ giấy · logo → TV tắt. Tiếng: cues.py
    [0, (t, X) => { const CH = [['air', 1948, 0.5], ['brand', 1961, 0.5], ['wire', 1961, 0.5], ['jeep', 1961, 0.5], ['crowd63', 1963, 0.5], ['jfk', 1963, 0.2], ['reagan', 1987, 0.28], ['wave87', 1987, 0.5]], DIS = ['police', 'march', 'brand'];
      const T1 = wd(L0, "history's"), T2 = wd(L0, 'and', 1), T3 = T.tiny, T4 = wd(L0, 'stupid'), T5 = wd(L0, 'mistakes'), T6 = wd(L0, 'that'), TE = ST(L1);
      const SX = 90, SY = 44, SW = 1740, SH = 950;   // màn hình trong vỏ TV
      const noise = () => { const f = Math.floor(X * 60); for (let i = 0; i < 260; i++) { const v = Math.floor(hash(i + f * 37) * 255); g.fillStyle = `rgb(${v},${v},${v})`; const w = 30 + 90 * hash(i * 3 + f); g.fillRect(SX + hash(i + f * 11) * SW - 20, SY + hash(i + f * 19) * SH, w, 7 + 18 * hash(i + f)); } };
      const film = (k, u, fy = 0.5) => { const fr = IM.film[k], im = fr[Math.min(fr.length - 1, Math.floor(u * 24))], z = 1.08 + 0.1 * (1 - easeOut(clamp(u / 0.2))), s = Math.max(SW / im.width, SH / im.height) * z, w = im.width * s, h = im.height * s; g.drawImage(im, SX + (SW - w) / 2, SY + clamp((SH - h) * fy, SH - h, 0), w, h); };
      const scan = () => { g.fillStyle = 'rgba(0,0,0,0.13)'; for (let y = SY; y < SY + SH; y += 6) g.fillRect(SX, y, SW, 2); const bar = (X * 620) % (SH + 160) - 80; g.fillStyle = 'rgba(255,255,255,0.08)'; g.fillRect(SX, SY + bar, SW, 70); };
      const osd = (txt, yr) => { g.save(); g.font = '900 60px Archivo, sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.lineWidth = 9; g.strokeStyle = '#051505'; g.fillStyle = '#6DFF7A'; g.strokeText(txt, SX + 50, SY + 70); g.fillText(txt, SX + 50, SY + 70); g.font = '900 110px Archivo, sans-serif'; g.strokeText(String(yr), SX + 50, SY + SH - 90); g.fillText(String(yr), SX + 50, SY + SH - 90);
        g.fillStyle = '#6DFF7A'; for (const dx of [0, 44]) { g.beginPath(); g.moveTo(SX + 270 + dx, SY + 45); g.lineTo(SX + 310 + dx, SY + 70); g.lineTo(SX + 270 + dx, SY + 95); g.closePath(); g.fill(); } g.restore(); };
      const sofa = (o, s = 500) => { g.save(); g.translate(2 * 1690, 0); g.scale(-1, 1); narrator(1690, 1062, s, { v: 'B', mouth: mouthAt(X), look: 1, arms: 'point', t: X, ...o }); g.restore();   // cầm điều khiển chĩa vào TV
        const hx = 1690 - s * 0.62, hy = 1062 - s * 0.47; g.save(); if (o.arms) g.globalAlpha = 0; g.fillStyle = '#1C1C1F'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.roundRect(hx - 42, hy - 16, 70, 26, 6); g.fill(); g.stroke(); g.fillStyle = '#E2463A'; g.beginPath(); g.arc(hx - 28, hy - 3, 6, 0, 7); g.fill(); g.restore();
        g.save(); g.translate(1800, 990); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(-58, -50); g.lineTo(58, -50); g.lineTo(42, 70); g.lineTo(-42, 70); g.closePath(); g.fill(); g.stroke(); g.fillStyle = RED; for (const dx of [-30, 0, 30]) { g.beginPath(); g.moveTo(dx - 8, -50); g.lineTo(dx + 8, -50); g.lineTo(dx + 5, 70); g.lineTo(dx - 5, 70); g.closePath(); g.fill(); } for (let i = 0; i < 7; i++) { g.fillStyle = '#FFE9A8'; g.beginPath(); g.arc(-48 + i * 16, -58 - 12 * hash(i), 13, 0, 7); g.fill(); g.stroke(); } g.restore(); };
      // vỏ TV gỗ + màn: phần trong màn clip theo góc bo
      g.fillStyle = '#5A3E26'; g.fillRect(0, 0, W, H); g.fillStyle = '#6E4E30'; for (let i = 0; i < 6; i++) g.fillRect(0, i * 200 + 60, W, 40); g.strokeStyle = INK; g.lineWidth = 14; g.fillStyle = '#000'; g.beginPath(); g.roundRect(SX, SY, SW, SH, 60); g.fill(); g.stroke(); g.save(); g.beginPath(); g.roundRect(SX, SY, SW, SH, 60); g.clip();
      if (X < T1) { const d = T1 / CH.length, i = Math.min(CH.length - 1, Math.floor(X / d)), u = X - i * d, [k, yr, fy] = CH[i]; if (u < 0.05) noise(); else { film(k, u, fy); scan(); osd(`CH ${String(i + 2).padStart(2, '0')}`, yr); } g.restore(); sofa({ mood: ['shock', 'star', 'side', 'shock'][i % 4], bob: 20 * Math.max(0, 1 - u / 0.12) }); return; }
      if (X < T2) { const d = (T2 - T1) / DIS.length, i = Math.min(DIS.length - 1, Math.floor((X - T1) / d)), u = X - T1 - i * d; if (u < 0.05) noise(); else { film(DIS[i], Math.min(u, 0.8), 0.5); scan(); g.fillStyle = 'rgba(120,10,10,0.28)'; g.fillRect(SX, SY, SW, SH); } const [sx, sy] = S.shake(clamp((X - T.dis) / 0.4), 22, X); g.save(); g.translate(sx, sy); S.label("HISTORY'S BIGGEST", 900, 390, 108, kin(X, T1, 0.12), '#FFF', { stroke: INK }); S.label('DISASTERS', 900, 560, 190, kin(X, T.dis, 0.12), '#FFE04A', { stroke: INK }); g.restore(); g.restore(); sofa({ mood: 'shock' }); return; }
      if (X < T4) { pressRoom({ dim: 1 }); g.fillStyle = 'rgba(255,236,190,0.22)'; g.beginPath(); g.moveTo(780, 44); g.lineTo(1020, 44); g.lineTo(1160, 780); g.lineTo(640, 780); g.closePath(); g.fill(); if (X >= T3) { memo(900, 620, 70, -0.08, {}); g.strokeStyle = RED; g.lineWidth = 8; g.beginPath(); g.arc(900, 620, 100, 0, 7); g.stroke(); S.label('TINY', 900, 460, 54, 1, '#FFE04A', { stroke: INK }); } scan(); g.restore(); sofa({ mood: 'sus' }); return; }
      if (X < T5) { const u = X - T4, z = 1 + 0.5 * easeOut(clamp(u / 0.3)); g.save(); pressRoom({}); g.translate(760, 620); g.scale(z, z); g.translate(-760, -620); P.schab(760, 1020, 660, { eyes: 'bored', mouth: 'o', sweat: true }); memo(1020, 640, 200, 0.1, { title: 'TRAVEL RULES' }); g.restore(); scan(); S.label('STUPID', 480, 230, 150, kin(X, T4, 0.12), RED, { stroke: '#FFF' }); g.restore(); sofa({ mood: 'derp' }); return; }
      if (X < T6) { g.fillStyle = '#141416'; g.fillRect(SX, SY, SW, SH); memo(880, 520, 500, -0.05, { title: 'TRAVEL RULES' }); S.stamp('MISTAKES', 880, 560, 120, (X - T5) / 0.12, -0.08); scan(); g.restore(); sofa({ mood: 'closed', mouth: 'flat', arms: 'facepalm' }); return; }
      // ảnh thật đám đông 1989 + logo sập, cuối cùng TV tắt (kẹp thành vạch sáng) rồi vào cảnh tập 1
      const u = X - T6, off = clamp((X - (TE - 0.22)) / 0.22); S.photoBg(IM.p_potsdamer, u, { zoom: 1.08 }); g.fillStyle = 'rgba(10,14,30,0.55)'; g.fillRect(SX, SY, SW, SH); scan();
      const [lx, ly] = S.shake(clamp(u / 0.28), 22, X); S.label('BLUNDERSTORY', 800 + lx, 410 + ly, 118, kin(X, T6, 0.14), '#FFF', { stroke: INK }); S.label('TINY MISTAKES. HUGE DISASTERS.', 800, 560, 48, kin(X, T6 + 0.3, 0.2), '#FFE04A', { stroke: INK });
      g.fillStyle = 'rgba(255,255,255,0.7)'; g.font = '600 22px Archivo, sans-serif'; g.textAlign = 'left'; g.fillText('Archive film: UK COI · USIA · Universal News · Reagan Library (public domain)', SX + 50, SY + SH - 34);
      if (off > 0) { const hh = SH * (1 - off) / 2; g.fillStyle = '#000'; g.fillRect(SX, SY, SW, SH / 2 - hh); g.fillRect(SX, SY + SH / 2 + hh, SW, SH / 2 - hh); g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillRect(SX, SY + SH / 2 - 3, SW, 6); }
      g.restore(); sofa({ mood: 'wink', arms: 'wave' }); }],

    // S1a · phố ngày, xe 1914 vẽ chạy về phía trái, tới ngã ba rẽ NHẦM lên đường phụ (xa dần), nổ nhỏ ở cuối; thẻ "EPISODE 1" · tiếng: động cơ xe, rít ở "wrong", boom nhỏ ở "war"
    [ST(L1), (t, X) => { const sk = g.createLinearGradient(0, 0, 0, 700); sk.addColorStop(0, '#CFE3F0'); sk.addColorStop(1, '#F1E9D2'); g.fillStyle = sk; g.fillRect(0, 0, W, H);
      g.fillStyle = '#B9C9A5'; g.fillRect(0, 560, W, 200);                              // đồng cỏ xa
      g.strokeStyle = INK; g.lineWidth = 5; g.lineJoin = 'round';
      road(780);
      g.fillStyle = '#6E6A63'; g.beginPath(); g.moveTo(980, 780); g.lineTo(1150, 780); g.lineTo(620, 560); g.lineTo(540, 560); g.closePath(); g.fill();   // đường phụ rẽ lên
      const u = clamp((X - ST(L1)) / (T.wrong - ST(L1))), turn = ease(clamp((X - T.wrong) / 1.0)), x0 = lerp(1900, 1180, ease(u));
      g.save(); if (turn > 0) { const px = lerp(1180, 600, turn), py = lerp(0, -230, turn), sc = lerp(1, 0.34, turn); g.translate(px, 1000 + py); g.scale(sc, sc); g.translate(-1180, -1000); }
      else { g.translate(x0 - 1180, 0); }
      C.car1914(1180, 1000, 800, { flags: true, bob: Math.sin(X * 22) * 2, spin: -X * 14, seats: ([fx, fy]) => C.folk(fx, fy + 60, 250, { skin: '#FCEBD5', coat: 'driver', wear: 'driver', eyes: X >= T.wrong ? 'shock' : 'dot', mouth: X >= T.wrong ? 'o' : null }) }); g.restore();
      if (X >= T.war && X < T.promised) { g.save(); g.globalAlpha = 0.9; S.realBoom(560, 540, 380, X - T.war, 3); g.restore(); }
      if (X >= T.wrong && X < T.war + 0.3) S.label('WRONG TURN', 1250, 250, 100, kin(X, T.wrong, 0.2), '#FFF', { stroke: RED, rot: -0.05 });
      if (X >= T.war) S.label('WORLD WAR', 1250, 400, 80, kin(X, T.war, 0.2), '#FFF', { stroke: INK });
      S.label('EPISODE 1', 140, 110, 38, kin(X, ST(L1) + 0.3), INK, { align: 'left' }); }],

    // S1b · "promised": nền giấy tối, người dẫn nhép ở góc, chữ THE NEXT ONE → EVEN SMALLER (nhỏ dần), cuối cảnh LẬT TRANG sang nền tối · tiếng: whoosh lật trang ở cuối
    [T.promised - 0.1, (t, X) => { g.fillStyle = '#1D1D22'; g.fillRect(0, 0, W, H);
      S.lipHost(X, kin(X, T.promised - 0.1, 0.3));
      if (X < T.next) S.label('I PROMISED…', 780, 330, 96, kin(X, T.promised, 0.25), '#FFF', { stroke: INK });
      else S.label('THE NEXT MISTAKE', 780, 330, 96, kin(X, T.next), '#FFF', { stroke: INK });
      if (X >= T.even) { const k = clamp((X - T.even) / Math.max(0.4, T.smaller + 0.2 - T.even)), sz = lerp(110, 34, ease(k)); S.label('EVEN SMALLER', 780, 560 + 40 * k, sz, kin(X, T.even, 0.2), '#FFD34D', { stroke: INK }); }
      const f = clamp((X - (ST(L2) - 0.55)) / 0.55);                                  // lật trang: nền tối của cảnh sau quét từ phải sang
      if (f > 0) { const x = W * (1 - ease(f)); g.fillStyle = DARK; g.fillRect(x, 0, W - x, H); const gr = g.createLinearGradient(x - 120, 0, x, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.5)'); g.fillStyle = gr; g.fillRect(x - 120, 0, 120, H);
        g.fillStyle = '#F4F1E8'; g.fillRect(x - 6, 0, 6, H); } }],

    // S2 · khung đen, đèn chiếu, TỜ GIẤY rơi lắc lư xuống giữa khung · tiếng: gió vút lúc rơi, "tap" giấy chạm đất ở "sheet"
    [ST(L2), (t, X) => { g.fillStyle = DARK; g.fillRect(0, 0, W, H); cone(960, 840, 220, 900, 0.12);
      const kf = clamp(t / 1.5), fall = easeOut(kf), y = lerp(-300, 580, fall), rot = 0.5 * Math.sin(t * 5) * (1 - kf) + 0.05;
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(960, 880, 260 * fall, 26 * fall, 0, 0, 7); g.fill();
      memo(960, y, 400, rot, { title: 'TRAVEL RULES', seed: 3 });
      S.label('ONE SHEET OF PAPER', 960, 960, 76, kin(X, T.sheet, 0.25), '#FFF', { stroke: INK }); }],

    // S3 · MONEY SHOT: phòng họp báo (như thumbnail A) — Schabowski nheo mắt cầm tờ giấy; dấu "9 NOV 1989", "EAST BERLIN"; từ "reading" camera đẩy vào + "LIVE"
    //      tiếng: shutter ở ngày, ù nền phòng, bíp REC ở "live"
    [ST(L3), (t, X) => { const z = X >= T.reading ? lerp(1, 1.32, ease(clamp((X - T.reading) / 1.4))) : 1;
      const cz = ease(clamp((X - T.reading) / 1.4)); room([z, lerp(960, 1000, cz), lerp(540, 520, cz)], () => pressShot(X, { eyes: 'dot', squint: true, sweat: X >= T.live, talk: true }));
      S.stamp('9 NOV 1989', 1480, 200, 72, clamp((X - T.ninth + 0.05) / 0.4), -0.06);
      S.label('EAST BERLIN', 400, 230, 70, kin(X, T.east), '#FFF', { stroke: INK });
      if (X >= T.live) { const k = kin(X, T.live, 0.2), s = back(k); g.save(); g.translate(180, 920); g.scale(s, s); g.fillStyle = RED; g.strokeStyle = '#FFF'; g.lineWidth = 6; g.beginPath(); g.roundRect(-100, -44, 200, 88, 14); g.fill(); g.stroke();
        g.fillStyle = '#FFF'; g.beginPath(); g.arc(-56, 0, 14 * (0.6 + 0.4 * (Math.floor(X * 2) % 2)), 0, 7); g.fill(); g.font = '900 54px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('LIVE', 18, 4); g.restore(); } }],

    // S4a · "his boss handed it to him": hành lang sau cánh cửa — Krenz đưa tờ giấy, Schabowski cầm không nhìn · tiếng: bước chân, cửa mở ở "walked"
    [ST(L4), (t, X) => { g.fillStyle = '#9C9A8E'; g.fillRect(0, 0, W, H); g.fillStyle = '#7F7D72'; g.fillRect(0, 800, W, H - 800);
      g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#B5B3A6'; g.fillRect(1600, 220, 280, 580); g.strokeRect(1600, 220, 280, 580);          // cửa phòng họp
      const open = ease(clamp((X - T.walked) / 0.5)); g.fillStyle = `rgba(255,230,170,${0.9 * open})`; g.fillRect(1614, 234, 252, 552);
      for (let i = 0; i < 3; i++) { g.fillStyle = '#FFE9A8'; g.beginPath(); g.ellipse(300 + i * 480, 130, 90, 18, 0, 0, 7); g.fill(); }              // đèn trần
      const slide = easeOut(clamp(t / 0.5)), hand = ease(clamp((X - T.boss - 0.2) / 0.7)), walk = X >= T.walked ? ease(clamp((X - T.walked) / 1.0)) : 0;
      P.krenz(620, 940, 700, { eyes: 'dot', look: 1 });
      const sx = lerp(1060, 1300, walk);
      P.schab(sx, 940, 700, { eyes: 'bored', look: -1 });
      const mx = lerp(780, sx - 70, hand), my = 640; memo(mx, my, 200, lerp(-0.3, 0.1, hand), { seed: 3 });
      S.nameTag('EGON KRENZ', clamp(t / 0.3), 96, 1010); }],

    // S4b · MONEY SHOT đóng băng: lại phòng họp báo, mắt chán, tờ giấy giơ lên; dấu ⏸ + khử màu ở "barely" · tiếng: tua băng khựng (tape stop) ở "barely"
    [T.barely - 0.3, (t, X) => { const f = kin(X, T.barely, 0.25);
      room([1.0, 960, 540], () => pressShot(X, { eyes: 'bored', memoRot: 0.2 }));
      S.desat(0.55 * f, 0.12); if (f > 0) freezeFx(X - T.barely);
      S.label('BARELY LOOKED', 960, 150, 84, kin(X, T.barely + 0.05, 0.25), '#FFF', { stroke: INK }); }],

    // S5a · "a reporter asks…": cùng phòng họp, phóng viên (đầu tròn, giơ tay) ở tiền cảnh bên phải hỏi · tiếng: cú giơ tay, "?" boing ở "when"
    [ST(L5), (t, X) => { pressRoom({ spot: 760 });
      P.schab(560, 890, 600, { eyes: 'bored' }); memo(740, 560, 180, 0.12, { seed: 3 }); pressTable(860);
      C.folk(1560, 1180, 760, { skin: '#FCEBD5', coat: 'driver', arm: 'up', eyes: 'dot', mouth: X >= T.when ? 'o' : null, look: -1, tilt: X >= T.when ? 0.03 * Math.sin(X * 6) : 0 });
      bubble(g, 'WHEN DOES THIS START?', 1130, 330, 1380, 560, kin(X, T.when, 0.3), 46); }],

    // S5b · cận Schabowski xáo giấy (hai tờ lắc), mồ hôi, đến "squints" nheo mắt · tiếng: sột soạt giấy ở "shuffles"
    [T.shuffles - 0.15, (t, X) => { pressRoom({ spot: 940 });
      const sq = X >= T.squints;
      P.schab(960, 1190, 1100, { eyes: sq ? 'dot' : 'bored', squint: sq, sweat: true, look: Math.sin(X * 9) });
      const j = Math.sin(X * 17) * 0.06; memo(1130, 690 + 20 * Math.sin(X * 13), 340, 0.15 + j, { seed: 3 }); memo(1000, 720, 340, -0.1 - j, { seed: 8 });
      pressTable(900, []); }],

    // S5c · "as far as he knows, immediately" — cận hơn, chữ IMMEDIATELY nảy đúng từ · tiếng: stinger ở "immediately"
    [T.says - 0.1, (t, X) => { pressRoom({ spot: 960 });
      const kk = kin(X, T.imm, 0.2), pop = kk > 0 && kk < 1 ? 1 + 0.15 * Math.sin(kk * Math.PI) : 1;
      P.schab(960, 1230, 1250, { eyes: 'dot', squint: true, sweat: true, mouth: X >= T.says && X < T.imm + 0.8 ? 'o' : null });
      memo(1260, 740, 360, 0.2, { seed: 3 });
      pressTable(860, []);
      g.save(); S.label('IMMEDIATELY', 960, 1005, 120 * pop, kk, '#FFD34D', { stroke: INK }); g.restore(); }],

    // S6 · ảnh Potsdamer Platz 11/1989 tràn khung (tư liệu), dấu WALL OPEN · tiếng: đám đông reo, chuông nửa đêm ở "midnight"
    [ST(L6), (t, X) => { S.photoBg(IM.p_potsdamer, t, { zoom: 1.08, fy: 0.55, credit: 'Potsdamer Platz, Nov 1989 · public domain' });
      S.label('MIDNIGHT', 960, 170, 130, kin(X, T.mid, 0.25), '#FFF', { stroke: INK });
      S.stamp('WALL OPEN', 960, 900, 110, clamp((X - T.open + 0.05) / 0.4), -0.05); }],

    // S7 · bản đồ 1960 (hai nước Đức, Đông Đức mặt hoảng) → cắt sang 1994: một khối "Germany" · tiếng: tích tắc năm, "pop" cắt ở "exists"
    [ST(L7), (t, X) => { if (X < T.exists - 0.05) { const V = view(M, { cx: 11, cy: 51.5, zoom: 2.7 }); drawMap(g, M, V, { fill: { 'East Germany': 'flag', 'West Germany': 'flag' } });
        const sh = X >= T.country; mapFace(g, M, V, 'East Germany', { mood: sh ? 'shock' : 'sad', t: X }); mapFace(g, M, V, 'West Germany', { mood: 'calm', t: X });
        S.label('EAST GERMANY', 1310, 230, 64, kin(X, T.year, 0.25), '#FFF', { stroke: INK }); }
      else { const V = view(M94, { cx: 11, cy: 51.5, zoom: 2.7 }); drawMap(g, M94, V, { fill: { 'Germany': 'flag' } }); mapFace(g, M94, V, 'Germany', { mood: 'smug', t: X });
        S.label('ONE GERMANY', 1310, 230, 64, kin(X, T.exists, 0.2), '#FFF', { stroke: INK }); } }],

    // S8 · cái cân: tờ giấy nhẹ tênh ↔ khối bê tông "28 YEARS"; cân nghiêng về phía GIẤY ở "beat" (gag) · người dẫn nhép ở góc · tiếng: "thud" bê tông ở "concrete", "ping" nhẹ khi giấy thắng
    [ST(L8), (t, X) => { g.fillStyle = '#E9E3D3'; g.fillRect(0, 0, W, H); g.fillStyle = '#CFC7B2'; g.fillRect(0, 880, W, H - 880);
      const ang0 = 0.16, k = ease(clamp((X - T.beat) / 0.5)), ang = lerp(ang0 * (X >= T.t28 + 0.2 ? 1 : 0.6) , -0.32, k) * (X < T.beat ? 1 : 1);
      const px = 700, py = 330, L = 340, bw = 8;
      g.strokeStyle = INK; g.lineWidth = 10; g.fillStyle = '#7A6A4A'; g.beginPath(); g.moveTo(px, py); g.lineTo(px - 90, 880); g.lineTo(px + 90, 880); g.closePath(); g.fill(); g.stroke();
      g.save(); g.translate(px, py); g.rotate(ang); g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-L, 0); g.lineTo(L, 0); g.stroke(); g.restore();
      // hai đĩa cân treo ở hai đầu đòn (giữ thẳng đứng)
      const ends = [[-L, 'paper'], [L, 'wall']];
      for (const [ox, kind] of ends) { const ex = px + Math.cos(ang) * ox, ey = py + Math.sin(ang) * ox;
        g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex - 110, ey + 200); g.moveTo(ex, ey); g.lineTo(ex + 110, ey + 200); g.stroke();
        g.fillStyle = '#B79A4A'; g.lineWidth = 7; g.beginPath(); g.ellipse(ex, ey + 210, 150, 22, 0, 0, 7); g.fill(); g.stroke();
        if (kind === 'paper') memo(ex, ey + 150, 150, 0.1 + 0.1 * Math.sin(X * 3), { seed: 3 });
        else { g.fillStyle = '#B9B7B0'; g.lineWidth = 7; g.fillRect(ex - 150, ey + 80, 300, 130); g.strokeRect(ex - 150, ey + 80, 300, 130); g.fillStyle = INK; g.font = '900 50px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('28 YEARS', ex, ey + 160); } }
      S.lipHost(X, kin(X, ST(L8), 0.3)); }],

    // S9 · "a city got cut in half": đường chân trời thành phố vẽ, tách đôi theo "cut", hai nửa trượt ra · không người dẫn · tiếng: xé giấy ở "cut", vút trượt
    [ST(L9), (t, X) => { const sk = g.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#9CB8D0'); sk.addColorStop(1, '#EADFC4'); g.fillStyle = sk; g.fillRect(0, 0, W, H);
      const k = ease(clamp((X - T.cut) / 0.8)), dx = 190 * k;
      const city = () => { g.fillStyle = '#C9C4B8'; g.strokeStyle = INK; g.lineWidth = 6;
        for (let i = 0; i < 16; i++) { const bx = 150 + i * 100, bh = 260 + 300 * hash(i + 4), w = 96; g.fillRect(bx, 880 - bh, w, bh); g.strokeRect(bx, 880 - bh, w, bh);
          g.fillStyle = '#FFE9A8'; for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) if (hash(i * 9 + r * 3 + c) > 0.35) g.fillRect(bx + 18 + c * 40, 880 - bh + 30 + r * 60, 22, 30); g.fillStyle = '#C9C4B8'; }
        g.fillStyle = '#8D8A80'; g.fillRect(0, 880, W, 200); };
      for (const s of [-1, 1]) { g.save(); g.beginPath(); if (s < 0) g.rect(0, 0, 960, H); else g.rect(960, 0, W, H); g.clip(); g.translate(s * dx, 0); city(); g.restore(); }
      if (k > 0) { g.fillStyle = DARK; g.fillRect(960 - dx, 0, 2 * dx, H); }
      S.label('A CITY, CUT IN HALF', 960, 190, 92, kin(X, T.city, 0.3), '#FFF', { stroke: INK }); }],
  ];
};
