// hồi a5 — But no (BRIEF-SCENES.md §a5): "But no" → toà thị chính (thị trưởng đọc diễn văn, FF nổi giận, Sophie dỗ) → giấy diễn văn
// dính máu (NGHIÊM) → MISTAKES 3/5 (không ai huỷ lịch) → bệnh viện → Potiorek "full of assassins?" → 5 sát thủ nhìn camera (4/5)
// → kế hoạch mới trên bản đồ phố (common.streetMap, a6 dùng lại) → 5/5 tài xế huýt sáo. Người dẫn nhập vai #5: quan chức hàng sau, mắt chán.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { mistakes, rewind, streetMap, routeArrow, SK, P } from './common.js';
const { W, H, RED, clamp, lerp, hash, easeOut, ease, back, label } = S;
const GREEN = '#2E8B57';

export default K => { const { g, IM, wd, ST, LT } = K;
  const { ff, sophie, mayor, potiorek, killer } = P;

  // ── mốc ──
  const Q0 = 'But no.', Q1 = 'The motorcade reached', Q2 = 'Franz Ferdinand cut him off', Q3 = 'Sophie whispered', Q4 = "Then it was the archduke's turn",
    Q5 = 'Mistake number three', Q6 = 'Instead, Franz Ferdinand decided', Q7 = 'Someone asked if', Q8 = 'At that moment, Sarajevo', Q9 = 'To play it safe',
    Q10 = 'It was a sensible plan', Q11 = 'Mistake number five';
  const T = { reached: wd(Q1, 'reached'), town: wd(Q1, 'town'), mayor: wd(Q1, 'mayor'), script: wd(Q1, 'script'), reading: wd(Q1, 'reading'), happy: wd(Q1, 'happy'), guest: wd(Q1, 'guest'),
    cut: wd(Q2, 'cut'), mister: wd(Q2, 'mister'), greeted: wd(Q2, 'greeted'), bombs: wd(Q2, 'bombs'), outrageous: wd(Q2, 'outrageous'),
    whispered: wd(Q3, 'whispered'), went: wd(Q3, 'went'),
    turn: wd(Q4, 'turn'), notes: wd(Q4, 'notes'), bombed: wd(Q4, 'bombed'), spattered: wd(Q4, 'spattered'), blood: wd(Q4, 'blood'),
    three: wd(Q5, 'three'), nobody: wd(Q5, 'nobody'), day: wd(Q5, 'day'),
    decided: wd(Q6, 'decided'), visit: wd(Q6, 'visit'), wounded: wd(Q6, 'wounded'), hospital: wd(Q6, 'hospital'),
    safe: wd(Q7, 'safe'), governor: wd(Q7, 'governor'), oskar: wd(Q7, 'oskar'), reportedly: wd(Q7, 'reportedly'), think: wd(Q7, 'think'),
    moment: wd(Q8, 'moment'), five: wd(Q8, 'five'), armed: wd(Q8, 'armed'), sure: wd(Q8, 'sure'), four: wd(Q8, 'four'),
    changed: wd(Q9, 'changed'), turning: wd(Q9, 'turning'), narrow: wd(Q9, 'narrow'), straight: wd(Q9, 'straight'), hosp9: wd(Q9, 'hospital'),
    sensible: wd(Q10, 'sensible'), small: wd(Q10, 'small'), problem: wd(Q10, 'problem'),
    five11: wd(Q11, 'five'), nobody11: wd(Q11, 'nobody'), driver: wd(Q11, 'driver') };
  const at = (X, k, d = 0.25) => clamp((X - T[k]) / d);
  // bảng MISTAKES: hiện ~3.6 s quanh mỗi lần đếm (số cũ → nảy số mới đúng từ) — gọi ở mọi cảnh, tự tắt ngoài cửa sổ
  function board(X) { for (const [n, w] of [[3, T.three], [4, T.four], [5, T.five11]]) { const k = Math.min(clamp((X - w + 1.2) / 0.3), clamp((w + 2.4 - X) / 0.3));
    if (k > 0) { mistakes(X < w ? n - 1 : n, k, X - w); return; } } }

  // ── toà thị chính: một bố cục cho 3 cảnh liền (thị trưởng trái, FF + Sophie phải, quan chức hàng sau có người dẫn) ──
  const MAY = [600, 1010, 470], FFP = [1100, 1010, 480], SOP = [1280, 1010, 450], NARR = [1630, 870, 330];
  function scroll(x, y, len, X) { g.save(); g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 4;
    g.fillRect(x - 70, y, 140, Math.min(len, 1010 - y)); g.strokeRect(x - 70, y, 140, Math.min(len, 1010 - y));
    if (len > 1010 - y) { const L = len - (1010 - y); g.fillRect(x - 70 - L, 990, L, 22); g.strokeRect(x - 70 - L, 990, L, 22); g.beginPath(); g.arc(x - 70 - L, 1001, 16, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = '#9A9284'; for (let i = 0; i < Math.min(len, 1010 - y) / 22 - 1; i++) g.fillRect(x - 55, y + 16 + i * 22, i % 4 === 3 ? 60 : 110, 7);
    g.fillStyle = '#E9E2CF'; g.beginPath(); g.ellipse(x, y, 78, 14, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
  function townHall(X, o = {}) { B.place('cityhall');
    for (const [x, w] of [[1470, 'kepi'], [1790, 'top']]) C.folk(x, NARR[1], 320, { skin: SK, coat: w === 'kepi' ? 'austro' : 'suit', wear: w, eyes: 'dot', look: -1 });
    const yawn = o.yawn ?? 0;
    narrator(NARR[0], NARR[1], NARR[2], { outfit: 'austro', arms: 'rest', mood: yawn > 0 ? 'closed' : 'smug', mouth: yawn > 0 ? 'o' : 'rest', look: -1 });   // #5: quan chức hàng sau, mắt chán
    const m = mayor(MAY[0], MAY[1], MAY[2], { eyes: o.mayEyes ?? 'dot', mouth: o.mayMouth, look: 1 });
    scroll(MAY[0] + 140, MAY[1] - 300, o.scroll ?? 0, X);
    const f = ff(FFP[0], FFP[1], FFP[2], { eyes: o.ffEyes ?? 'dot', arm: o.ffArm, look: -1, mouth: o.ffMouth, tilt: o.ffTilt });
    const s = sophie(SOP[0], SOP[1], SOP[2], { eyes: o.soEyes ?? 'dot', look: -1, tilt: o.soTilt ?? 0 });
    return { m, f, s }; }
  // máy quay: điểm (fx, fy) của cảnh hiện ở (sx, sy) màn hình, phóng z
  const cam = (z, fx, fy, sx, sy) => { g.translate(sx, sy); g.scale(z, z); g.translate(-fx, -fy); };
  // độ dài cuộn diễn văn theo giờ (đứng khi FF cắt ngang, lăn tiếp khi thị trưởng đọc lại)
  const scrollLen = X => 60 + 120 * clamp(X - T.reading + 0.3, 0, T.cut - T.reading + 0.3) + 150 * Math.max(0, X - T.went);

  return [
    // 1 · "But no." — cận mặt người dẫn sốc + tua ngược ◀◀ · người dẫn cận mặt ≤ 1.2 s · tiếng: đĩa xước + tua băng
    [LT(Q0).start - 0.15, (t, X) => { S.bigFace(t, 'shock', 'o'); rewind(t, 1); }],

    // 2 · xe tới toà thị chính → thị trưởng đọc diễn văn dài lê thê (cuộn giấy lăn tới sàn), FF dần cáu; người dẫn #5 chán ngáp hàng sau
    //     tiếng: động cơ tắt ở "reached", giấy cuộn lăn ở "reading", người dẫn ngáp nhỏ ở "happy"
    [ST(Q1), (t, X) => {
      if (X < T.mayor - 0.15) { B.place('cityhall'); const x = lerp(2500, 1060, easeOut((X - ST(Q1)) / (T.reached - ST(Q1))));
        C.car1914(x, 1062, 950, { flags: true, spin: x / 124, seats: ([fx, fy], [bx, by]) => { const s = 950 / 1080;   // cùng cỡ xe với a6
          C.folk(fx, fy + 80 * s, 330 * s, { skin: SK, coat: 'driver', wear: 'driver' }); ff(bx - 60 * s, by + 70 * s, 360 * s, { eyes: 'angry' }); sophie(bx + 130 * s, by + 70 * s, 340 * s); } });
        label('TOWN HALL', 960, 120, 80, at(X, 'town', 0.25), '#FFF', { stroke: INK }); label('10:10 AM', 960, 200, 50, at(X, 'town', 0.25), '#FFF', { stroke: INK }); return; }
      const fume = clamp((X - T.happy) / 2.2), yawnU = X - T.happy - 0.2;
      const zd = 1 + 0.06 * ease((X - T.mayor) / 7); g.save(); cam(zd, 960, 760, 960, 760);   // đẩy chậm, không đứng yên > 8 s
      townHall(X, { scroll: scrollLen(X), mayEyes: 'happy', mayMouth: 'grin', ffEyes: X > T.happy ? 'angry' : 'dot', ffMouth: 'flat', yawn: yawnU > 0 && yawnU < 1.3 ? 1 : 0 });
      if (fume > 0.6) S.vein(FFP[0] + 85, FFP[1] - 390, 1.2 * (fume - 0.6) / 0.4 + 0.4); g.restore();
      const k1 = clamp((X - T.reading) / 0.25), txt = X < T.happy ? 'Dear beloved…' : X < T.guest ? '…SO very happy…' : '…our beloved guest…';
      bubble(g, txt, 560, 330, 590, 520, k1, 44); }],

    // 3 · FF cắt ngang: giơ tay, "I am greeted with BOMBS!" → OUTRAGEOUS! rung khung · người dẫn #5 vẫn chán · tiếng: giấy khựng ở "cut", đập bàn/rung ở "outrageous"
    [ST(Q2), (t, X) => { const [sx, sy] = S.shake(clamp((X - T.outrageous) / 0.6), 22, X); g.save(); g.translate(sx, sy);
      const zk = easeOut(clamp((X - T.cut) / 0.35)), z = lerp(1, 1.9, zk);                                  // đẩy vào mặt FF giận từ "cut"
      g.save(); cam(z, lerp(960, FFP[0], zk), lerp(760, 700, zk), lerp(960, 1000, zk), lerp(760, 640, zk));
      townHall(X, { scroll: scrollLen(X), mayEyes: X > T.cut ? 'shock' : 'happy', mayMouth: X > T.cut ? 'o' : 'grin', ffEyes: 'angry', ffArm: X > T.cut ? 'up' : null, ffMouth: 'o' });
      S.vein(FFP[0] + 85, FFP[1] - 390, X > T.outrageous ? 1.6 : 1.0); g.restore();
      if (X > T.mister - 0.2) bubble(g, X < T.greeted - 0.1 ? 'Mister Mayor, I come here on a visit…' : '…and I am greeted with BOMBS!', 960, 150, 1000, 330, clamp((X - T.mister + 0.2) / 0.25), 50);
      g.restore();
      if (X > T.outrageous) label('OUTRAGEOUS!', 1000, 990, 120, at(X, 'outrageous', 0.2), RED, { stroke: '#FFF', rot: -0.05 }); }],

    // 4 · Sophie thì thầm dỗ → FF nguội; thị trưởng cười tươi đọc tiếp như chưa có gì · người dẫn #5 chán · tiếng: "psst" ở "whispered", giấy cuộn lăn tiếp ở "went"
    [ST(Q3), (t, X) => { const calm = clamp((X - T.whispered - 0.6) / 1.2), back2 = X > T.went;
      townHall(X, { scroll: scrollLen(X), mayEyes: back2 ? 'happy' : 'shock', mayMouth: back2 ? 'grin' : 'o', ffEyes: calm > 0.6 ? 'bored' : 'angry', ffMouth: 'flat', soTilt: X > T.whispered - 0.2 && X < T.went ? -0.14 : 0, yawn: back2 && X > T.went + 0.6 && X < T.went + 1.6 ? 1 : 0 });
      if (calm < 1) S.vein(FFP[0] + 85, FFP[1] - 390, 1.0 * (1 - calm));
      bubble(g, 'psst… calm down…', 1420, 330, SOP[0] - 30, 560, clamp((X - T.whispered) / 0.25) * clamp((T.went - X) / 0.2), 40);
      if (back2) { g.save(); cam(2.0, MAY[0] + 60, 690, 820, 610);                                        // cắt cận thị trưởng cười tươi ("this is fine")
        townHall(X, { scroll: scrollLen(X), mayEyes: 'happy', mayMouth: 'grin', ffEyes: 'bored', ffMouth: 'flat' }); g.restore();
        bubble(g, '…as I was saying!', 1220, 190, 1000, 420, at(X, 'went', 0.25), 60); } }],

    // 5 · lượt FF đọc: bước ra giữa → (NGHIÊM) tờ ghi chú đi trên chiếc xe trúng bom → giấy có vết máu sẫm, khử màu · không đùa, không người dẫn ở nhịp máu
    //     tiếng: im dần, chỉ tiếng giấy sột soạt; không hiệu ứng ở "blood"
    [ST(Q4), (t, X) => {
      if (X < T.notes - 0.1) { townHall(X, { scroll: scrollLen(T.went + 0.01) + 0, mayEyes: 'dot', ffEyes: 'dot', ffMouth: 'flat' });
        const k = clamp((X - T.turn + 0.2) / 0.5); g.save(); g.globalAlpha = 0.55 * k; g.fillStyle = '#101014'; g.beginPath(); g.rect(0, 0, W, H); g.ellipse(FFP[0], 700, 300, 520, 0, 0, 7); g.fill('evenodd'); g.restore(); return; }
      if (X < T.spattered - 0.2) { B.place('quay'); const u = X - T.notes + 0.1;
        const c = C.car1914(960, 1040, 1080, { col: '#2A2D33' }); S.desat(1, 0.3);
        const [px, py] = [c.back[0] - 20, c.back[1] - 150], kp = clamp((X - T.notes) / 0.3);
        g.save(); g.translate(px, py + (1 - easeOut(kp)) * 60); g.rotate(-0.12); g.fillStyle = '#F4F1E8'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(-80, -100, 160, 120); g.strokeRect(-80, -100, 160, 120);
        g.fillStyle = '#7A766E'; for (let i = 0; i < 5; i++) g.fillRect(-64, -84 + i * 20, i % 2 ? 90 : 128, 6); g.restore();
        g.save(); g.globalAlpha = kp; g.strokeStyle = '#FFF'; g.lineWidth = 6; g.beginPath(); g.moveTo(960, 230); g.lineTo(px - 10, py - 120); g.stroke(); g.restore();
        for (let i = 0; i < 7; i++) { g.fillStyle = `rgba(60,60,64,${0.4})`; g.beginPath(); g.arc(700 + 120 * i + 30 * Math.sin(u + i), 600 - 60 * hash(i) - u * 20, 80 + 40 * hash(i + 3), 0, 7); g.fill(); }
        label('HIS SPEECH NOTES', 960, 180, 64, clamp((X - T.notes) / 0.3), '#FFF', { stroke: '#111' }); return; }
      const u = X - T.spattered + 0.2; g.fillStyle = '#121214'; g.fillRect(0, 0, W, H);
      g.save(); g.translate(960, 560); const s = 1 + 0.02 * u; g.scale(s, s); g.rotate(-0.04); g.fillStyle = '#E6E1D6'; g.strokeStyle = '#222'; g.lineWidth = 4; g.fillRect(-420, -470, 840, 940); g.strokeRect(-420, -470, 840, 940);
      g.fillStyle = '#6E6A62'; for (let i = 0; i < 24; i++) { let x = -360; const y = -400 + i * 34; for (let j = 0; j < 7; j++) { const w = 40 + 70 * hash(i * 9 + j); if (x + w > 360) break; g.fillRect(x, y, w, 6); x += w + 16; } }
      g.restore(); S.desat(0.8, 0); g.save(); g.translate(960, 560); g.scale(s, s); g.rotate(-0.04);
      for (let i = 0; i < 14; i++) { const k = clamp((u - 0.15 * i) / 0.4); if (k <= 0) continue; g.fillStyle = `rgba(78,30,22,${0.8 * k})`; const x = -300 + 600 * hash(i + 31), y = -380 + 760 * hash(i + 37), r = 10 + 34 * hash(i + 41);
        g.beginPath(); g.ellipse(x, y, r, r * (0.6 + 0.5 * hash(i + 43)), hash(i) * 3, 0, 7); g.fill(); }
      g.restore(); }],

    // 6 · MISTAKES 3/5 — lịch ngày 28/6 vẫn chạy, nút CANCEL đỏ phủ mạng nhện không ai bấm · không người dẫn · tiếng: ding bảng ở "three", dế kêu ở "day"
    [ST(Q5), (t, X) => { S.paper('#EFE6CF');
      g.save(); g.translate(560, 600); g.rotate(-0.03); g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-380, -330, 760, 660); g.strokeRect(-380, -330, 760, 660); g.restore();
      label('28 JUNE · PROGRAMME', 560, 360, 46, clamp(t / 0.25));
      [['10:00  TOWN HALL', true], ['10:45  MUSEUM', false], ['12:00  LUNCH', false]].forEach(([s, done], i) => { const k = clamp((t - 0.2 - i * 0.15) / 0.25);
        label(s, 290, 480 + i * 110, 50, k, done ? '#8A8278' : INK, { align: 'left' });
        if (done && k > 0) { g.save(); g.strokeStyle = GREEN; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(830, 465 + i * 110); g.lineTo(850, 485 + i * 110); g.lineTo(890, 440 + i * 110); g.stroke(); g.restore(); }
        if (!done && X > T.nobody + 0.6) label('STILL ON', 790, 480 + i * 110, 40, clamp((X - T.nobody - 0.6 - i * 0.2) / 0.2), GREEN, { align: 'left' }); });
      const bx = 1400, by = 600, pulse = X > T.nobody ? 1 + 0.04 * Math.sin((X - T.nobody) * 9) : 1;
      g.save(); g.translate(bx, by); g.scale(pulse, pulse); g.fillStyle = '#5B5E66'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(-230, 40, 460, 120, 20); g.fill(); g.stroke();
      g.fillStyle = RED; g.beginPath(); g.ellipse(0, 40, 190, 70, 0, 0, Math.PI); g.lineTo(-190, -10); g.ellipse(0, -10, 190, 70, 0, Math.PI, 0, true); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#E04A50'; g.beginPath(); g.ellipse(0, -10, 190, 70, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#FFF'; g.font = '900 52px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('CANCEL', 0, -8); g.restore();
      g.save(); g.strokeStyle = 'rgba(80,80,80,0.75)'; g.lineWidth = 2.5; const wx = bx + 230, wy = by - 130;                             // mạng nhện góc nút
      for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 + i * Math.PI / 12; g.beginPath(); g.moveTo(wx, wy); g.lineTo(wx + Math.cos(a) * 240, wy + Math.sin(a) * 240); g.stroke(); }
      for (let r = 50; r <= 230; r += 45) { g.beginPath(); for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 + i * Math.PI / 12; const p = [wx + Math.cos(a) * r, wy + Math.sin(a) * r]; i ? g.lineTo(...p) : g.moveTo(...p); } g.stroke(); }
      g.fillStyle = '#222'; g.beginPath(); g.arc(wx - 60, wy + 120 + 10 * Math.sin(X * 2), 10, 0, 7); g.fill(); g.restore();
      if (X > T.nobody) label('NOBODY', bx, 860, 60, at(X, 'nobody', 0.25), '#8A8278');
      board(X); }],

    // 7 · FF quyết đi thăm người bị thương: bong bóng nghĩ phòng bệnh → bệnh viện (ảnh tư liệu) · không người dẫn · tiếng: ý nghĩ "pop" ở "visit"
    [ST(Q6), (t, X) => {
      if (X < T.wounded - 0.1) { g.fillStyle = '#0E0E10'; g.fillRect(0, 0, W, H); const k = clamp(t / 0.3);
        g.save(); g.translate((1 - easeOut(k)) * -500, 0); ff(470, 1300, 1050, { eyes: 'dot', mouth: 'flat', look: 1 }); g.restore();
        S.ward(1260, 450, clamp((X - T.decided) / 0.35), X); label('VISIT THE WOUNDED', 1260, 900, 58, at(X, 'visit', 0.3), '#FFF'); return; }
      hospitalScene(X, X - T.wounded + 0.1); label('THE HOSPITAL', 960, 150, 80, at(X, 'hospital', 0.25), '#FFF', { stroke: INK }); }],

    // 8 · "Is that really safe?" → giới thiệu Potiorek (kiểu A, đầu ảnh) + thẻ tên → kiểu B cười khẩy: "Do you think Sarajevo is full of assassins?"
    //     không người dẫn · tiếng: thẻ tên trượt ở "oskar", cười "ha ha" ở "think"
    [ST(Q7), (t, X) => { B.place('cityhall'); const B2 = X > T.reportedly - 0.1, relieved = X > T.think + 1.2;
      C.folk(620, 1010, 470, { skin: SK, coat: 'suit', wear: 'top', eyes: relieved ? 'happy' : 'shock', sweat: !relieved, look: 1 });
      bubble(g, 'Is that… really safe?', 600, 260, 620, 470, clamp((X - T.safe + 0.7) / 0.25) * (B2 ? 0 : 1), 46);
      const kp = clamp((X - T.governor + 0.1) / 0.3);
      if (kp > 0 && !B2) { g.save(); g.translate((1 - easeOut(kp)) * 700, 0); C.figure('potiorek', 1300, 1010, 520, { coat: 'austro', flip: true }); g.restore();
        S.nameTag('OSKAR POTIOREK · GOVERNOR', at(X, 'oskar', 0.3), 880, 200); }
      if (B2) { potiorek(1300, 1010, 500, { eyes: 'happy', mouth: 'grin', look: -1 });
        bubble(g, 'Do you think Sarajevo is full of assassins?', 960, 230, 1300, 480, clamp((X - T.think + 0.3) / 0.25), 44);
        if (X > T.think + 0.6) label('HA HA', 1330, 110, 60, clamp((X - T.think - 0.6) / 0.2), INK, { rot: 0.1 }); } }],

    // 9 · gag: 5 sát thủ "đang bình thường" (đọc báo, dựa cột…) cùng quay ĐẦU NHÌN CAMERA ở "five"; vũ khí bật ở "armed"; "but sure" người dẫn góc nhếch mép; 4/5
    //     người dẫn góc phải (lipHost) từ "but sure" · tiếng: dừng nhạc + 5 tiếng "tick" quay đầu ở "five", lên đạn ở "armed", ding bảng ở "four"
    [ST(Q8), (t, X) => { const z = X > T.five ? 1 + 0.07 * easeOut(clamp((X - T.five) / 0.15)) : 1; g.save(); g.translate(690, 800); g.scale(z, z); g.translate(-690, -800);
      B.place('quay'); g.fillStyle = 'rgba(20,20,30,0.18)'; g.fillRect(0, 0, W, H);
      const xs = [210, 450, 690, 930, 1170];
      xs.forEach((x, i) => { const turned = X > T.five + i * 0.07, wear = ['bowler', 'cap', 'bowler', 'fez', 'bowler'][i];
        killer(x, 1000, 400, { wear, eyes: turned ? 'dot' : 'bored', look: turned ? 0 : (i % 2 ? 1 : -1), mouth: 'flat' });
        if (i === 0 && !turned) { g.save(); g.translate(x, 700); g.rotate(0.04); g.fillStyle = '#F2ECDD'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(-110, -95, 220, 160); g.strokeRect(-110, -95, 220, 160);
          g.fillStyle = '#9A9284'; for (let j = 0; j < 5; j++) g.fillRect(-90, -70 + j * 26, j ? 180 : 120, 9); g.restore(); }
        if (X > T.armed) { const k = clamp((X - T.armed - i * 0.08) / 0.2); if (k > 0) { g.save(); g.translate(x + 95, 760); g.scale(back(k), back(k));
          if (i % 2) { g.fillStyle = '#17171A'; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.fill(); g.fillStyle = '#4A4A50'; g.fillRect(-8, -36, 16, 12); }
          else { g.fillStyle = '#17171A'; g.fillRect(-10, -14, 56, 18); g.beginPath(); g.moveTo(-10, -14); g.lineTo(-22, 24); g.lineTo(-4, 24); g.lineTo(6, 0); g.fill(); }
          g.restore(); } } });
      g.restore(); if (X > T.five) label('5 MORE', 690, 240, 110, at(X, 'five', 0.2), '#FFF', { stroke: RED });
      S.lipHost(X, clamp((X - T.sure + 0.3) / 0.35));
      board(X); }],

    // 10 · kế hoạch mới trên bản đồ phố: tuyến CŨ đỏ rẽ vào phố hẹp → gạch → tuyến MỚI xanh thẳng dọc sông tới bệnh viện · bản đồ thuần, không người dẫn
    //      tiếng: bút vẽ tuyến cũ, gạch ✗ ở "changed", vòng ở "turning", bút xanh ở "straight", ting ở "hospital"
    [ST(Q9), (t, X) => { const P = streetMap(); hospitalIcon(X > T.hosp9 - 0.3 ? at(X, 'hosp9', 0.3) + (X > T.hosp9 ? 0 : 0) : 0, t);
      const fade = X > T.changed ? lerp(1, 0.35, clamp((X - T.changed - 0.4) / 0.4)) : 1;
      g.save(); g.globalAlpha = fade; routeArrow(P, 'old', clamp(t / 1.2), RED); g.restore();
      label('OLD', 1320, 250, 60, clamp((t - 1.0) / 0.25) * (X > T.changed + 0.8 && X < T.turning ? 0.5 : 1), RED, { stroke: '#FFF', align: 'left' });
      if (X > T.changed) { const k = at(X, 'changed', 0.3); g.save(); g.strokeStyle = RED; g.lineWidth = 16; g.lineCap = 'round'; g.globalAlpha = 0.9; const cx = 1220, cy = 300, r = 70 * back(k);
        g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx + r, cy + r); g.moveTo(cx + r, cy - r); g.lineTo(cx - r, cy + r); g.stroke(); g.restore(); }
      if (X > T.turning && X < T.straight) { const k = at(X, 'turning', 0.3); g.save(); g.strokeStyle = '#F2A33A'; g.lineWidth = 9; g.beginPath(); g.arc(1220, 470, 120 * back(k) + 6 * Math.sin(X * 8), 0, 7); g.stroke(); g.restore();
        label('NARROW OLD TOWN', 1600, 405, 40, at(X, 'narrow', 0.25), INK, { stroke: '#FFF' }); }
      routeArrow(P, 'new', clamp((X - T.straight) / 1.2), GREEN);
      if (X > T.straight) label('NEW', 700, 410, 64, at(X, 'straight', 0.25), GREEN, { stroke: '#FFF' });
      label('RIVER ROAD', 420, 485, 30, 1, INK, { stroke: '#FFF' });
      board(X); }],

    // 11 · "a sensible plan… one small problem" — dấu SENSIBLE ✓ trên tuyến xanh → xe nhỏ ở đầu tuyến có dấu "?" · bản đồ, không người dẫn · tiếng: dấu đập ở "sensible", "hmm?" ở "problem"
    [ST(Q10), (t, X) => { const P = streetMap(); hospitalIcon(1, t);
      g.save(); g.globalAlpha = 0.35; routeArrow(P, 'old', 1, RED); g.restore(); routeArrow(P, 'new', 1, GREEN);
      label('NEW', 700, 410, 64, 1, GREEN, { stroke: '#FFF' }); label('RIVER ROAD', 420, 485, 30, 1, INK, { stroke: '#FFF' });
      S.stamp('SENSIBLE ✓', 760, 800, 72, clamp((X - T.sensible) / 0.35), -0.08);
      if (X > T.small - 0.2) { const k = clamp((X - T.small + 0.2) / 0.3); g.save(); g.translate(150, 480); g.scale(back(k), back(k)); g.fillStyle = '#1F2229'; g.strokeStyle = INK; g.lineWidth = 5;
        g.beginPath(); g.roundRect(-52, -28, 104, 56, 14); g.fill(); g.stroke(); g.fillStyle = '#B9C4CF'; g.fillRect(14, -22, 12, 44); g.restore();
        label('?', 150, 400, 90, clamp((X - T.problem) / 0.2), RED, { stroke: '#FFF', free: true }); }
      board(X); }],

    // 12 · MISTAKES 5/5 — cận tài xế ngây thơ huýt sáo ♪, dấu tên tập "NOBODY TOLD THE DRIVER" · không người dẫn · tiếng: ding bảng ở "five", tiếng huýt sáo, dấu đập ở "driver"
    [ST(Q11), (t, X) => { S.paper('#F3E9D2'); g.save(); g.translate(960, 560); g.rotate(t * 0.1); for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? 'rgba(242,201,76,0.18)' : 'rgba(255,255,255,0)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 1500, i * Math.PI / 8, (i + 1) * Math.PI / 8); g.closePath(); g.fill(); } g.restore();
      const sway = Math.sin(X * 3) * 0.04, f = C.folk(960, 1380, 1250, { skin: SK, coat: 'driver', wear: 'driver', eyes: 'happy', mouth: 'o', tilt: sway });
      for (let i = 0; i < 3; i++) { const k = (X * 0.8 + i / 3) % 1; label(i % 2 ? '♫' : '♪', 1180 + 60 * Math.sin(k * 6 + i), 560 - k * 300, 80, 1, `rgba(30,35,40,${1 - k})`, { free: true }); }
      S.stamp('NOBODY TOLD THE DRIVER', 960, 900, 66, clamp((X - T.driver) / 0.35), -0.06);
      board(X); }],
  ];
  // bệnh viện VẼ (không có ảnh tư liệu đúng bệnh viện Sarajevo — postcard có sẵn là Vancouver): mặt tiền trắng, chữ thập đỏ, cờ
  function hospitalScene(X, u) { const k = clamp(u / 0.3); g.fillStyle = '#8FC0E4'; g.fillRect(0, 0, W, H); g.save(); g.translate(0, (1 - easeOut(k)) * 120);
    g.lineWidth = 9; g.strokeStyle = INK; g.fillStyle = '#EEE9DF'; g.fillRect(380, 330, 1160, 540); g.strokeRect(380, 330, 1160, 540);
    g.fillStyle = '#9A6B4E'; g.beginPath(); g.moveTo(350, 330); g.lineTo(960, 210); g.lineTo(1570, 330); g.closePath(); g.fill(); g.stroke();
    for (let c = 0; c < 8; c++) for (let r = 0; r < 2; r++) { if (c >= 3 && c <= 4 && r === 1) continue; g.fillStyle = '#3B4A5A'; g.fillRect(440 + c * 136, 400 + r * 200, 70, 120); g.strokeRect(440 + c * 136, 400 + r * 200, 70, 120); }
    g.fillStyle = '#2A1E1A'; g.fillRect(890, 690, 140, 180); g.strokeRect(890, 690, 140, 180);
    g.fillStyle = '#FFF'; g.beginPath(); g.arc(960, 600, 62, 0, 7); g.fill(); g.stroke(); g.fillStyle = RED; g.fillRect(948, 560, 24, 80); g.fillRect(920, 588, 80, 24);
    g.beginPath(); g.moveTo(1500, 330); g.lineTo(1500, 150); g.stroke(); g.fillStyle = '#FFF'; g.fillRect(1500, 150, 120, 80); g.strokeRect(1500, 150, 120, 80); g.fillStyle = RED; g.fillRect(1550, 160, 20, 60); g.fillRect(1530, 180, 60, 20);
    g.fillStyle = '#9A948C'; g.fillRect(0, 870, W, 210); g.beginPath(); g.moveTo(0, 870); g.lineTo(W, 870); g.stroke(); g.restore(); }
  // biểu tượng bệnh viện trên bản đồ phố (cuối tuyến mới)
  function hospitalIcon(k, t) { if (k <= 0) return; g.save(); g.translate(1720, 370); g.scale(back(k), back(k)); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 5;
    g.fillRect(-48, -48, 96, 96); g.strokeRect(-48, -48, 96, 96); g.fillStyle = RED; g.fillRect(-12, -34, 24, 68); g.fillRect(-34, -12, 68, 24); g.restore();
    label('HOSPITAL', 1720, 296, 32, k, INK, { stroke: '#FFF' }); }
};
