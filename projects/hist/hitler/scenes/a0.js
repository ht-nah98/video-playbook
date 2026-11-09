// a0 — Cold open (0–64 s) + The art student (65–126 s).
// Mở: chào kênh → "hôm nay khác" (bộ đếm lỗi trên Hitler) → ẢNH THẬT D-Day → bản đồ Normandy + xe tăng dự bị → phòng ngủ, người dẫn (tuỳ
// tùng) rụt tay không gõ cửa → đồng hồ quay, xe tăng ngủ → "không phải lỗi đầu tiên" → tua ngược về Vienna 1907.
// Trường mỹ thuật: ẢNH THẬT tranh màu nước của Hitler · bài thi "FEW HEADS" (người dẫn = giám khảo đóng dấu) · nhà đẹp / người xấu ·
// cửa đóng · "kiến trúc cần bằng" · bán tranh qua người môi giới · "WHAT IF?" → dấu "JOKE, NOT HISTORY" → thẻ đầu tiên vào khay.
import * as S from '../../_kit/stage.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { famous } from '../../_kit/famous.js';
import { INK } from '../../_kit/mapkit.js';
import { bg, big, cover, say, aide, coast, ev, P, city, arw, tank, bed, clock, doc, tray, fade, YOUNG } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { hey: 'Hey everyone, and welcome', today: 'Today is a little different', june: "It's June sixth", ger: 'Germany has powerful tank', only: 'Only one person in the entire', staff: 'His staff look at the confusing',
    wait: 'So the big tank reserves wait', thing: "And here's the thing", close: "It wasn't even close.", back: "So let's go back to the beginning",
    v07: 'In nineteen-oh-seven', passed: 'He passed the first round', words: 'In other words, he could draw', year: 'A year later he tried again', arch: 'He later claimed the director',
    stayed: 'So he stayed in Vienna', tempt: "Now, it's tempting to say", joke: "That's a joke, not history" };
  const T = { bed: wd(L.only, 'bed'), sea: wd(L.ger, 'sea'), beach: wd(L.wait, 'beach'), heads: wd(L.passed, 'heads'), people: wd(L.words, 'people'), diploma: wd(L.arch, 'diploma'),
    dealers: wd(L.stayed, 'dealers'), yes: wd(L.tempt, 'yes'), jk: wd(L.joke, 'joke'), thousand: wd(L.joke, 'thousand') };
  const host = (X, x, y, h, o = {}) => narrator(x, y, h, { v: 'B', mouth: mouthAt(X), look: 0, ...o });
  return [
    // 0 · TRAILER 7.8 s (người dùng 11-02: đứng chào ở đầu video phí thời gian, khán giả đi mất): lời chào giữ nguyên, hình là bản dựng nhanh —
    // tua ngược 1945 → 1907 bằng ảnh thật, số năm chạy lùi · "biggest disasters" cắt xuôi + rung · "tiny / stupid / mistakes" ba gag mỗi từ một cảnh, người dẫn đổi mặt · logo sập.
    // Không dùng ảnh trẻ em Auschwitz ở đây: đoạn đó chỉ thuộc phần nghiêm · tiếng: mỗi cắt một whoosh ngắn, cues.py
    [0, (t, X) => { const REW = [['jodl', 1945], ['dday', 1944], ['paulus', 1943], ['arizona', 1941], ['blitz', 1940], ['dover', 1940], ['potsdam', 1933], ['beerhall', 1923], ['watercolor', 1907]], FWD = ['arizona', 'blitz', 'dday', 'stalingrad'];
      const T1 = wd(L.hey, 'biggest'), T2 = wd(L.hey, 'and', 1), T3 = wd(L.hey, 'tiny'), T4 = wd(L.hey, 'stupid'), T5 = wd(L.hey, 'mistakes'), T6 = wd(L.hey, 'that');
      const shot = (k, u, tilt) => { const z = 1.1 + 0.28 * (1 - easeOut(clamp(u / 0.22))), [sx, sy] = S.shake(clamp(u / 0.2), 26, X); g.save(); g.translate(960 + sx, 540 + sy); g.rotate(tilt); g.translate(-960, -540); S.photoBg(IM['p_' + k], 0, { zoom: z, push: 0 }); g.restore(); if (u < 0.05) { g.fillStyle = `rgba(255,255,255,${1 - u / 0.05})`; g.fillRect(0, 0, W, H); } };
      const grain = () => { const f = Math.floor(X * 24); g.save(); g.fillStyle = 'rgba(255,255,255,0.10)'; for (let i = 0; i < 40; i++) g.fillRect(hash(i + f * 41) * W, hash(i + f * 77) * H, 1 + 3 * hash(i + f), 2 + 90 * hash(i * 3 + f)); g.restore(); };
      if (X < T1) { const d = T1 / REW.length, i = Math.min(REW.length - 1, Math.floor(X / d)), u = X - i * d, [k, yr] = REW[i]; shot(k, u, (i % 2 ? 1 : -1) * 0.012);   // ◀◀ tua ngược
        g.save(); for (let b = 0; b < 3; b++) { const y = ((X * (700 + b * 310) + b * 390) % (H + 120)) - 60; g.fillStyle = 'rgba(255,255,255,0.20)'; g.fillRect(0, y, W, 16 + b * 12); } g.restore(); grain();
        g.fillStyle = '#FFE04A'; g.strokeStyle = INK; g.lineWidth = 7; for (const dx of [0, 62]) { g.beginPath(); g.moveTo(80 + dx, 120); g.lineTo(140 + dx, 80); g.lineTo(140 + dx, 160); g.closePath(); g.fill(); g.stroke(); } big(String(yr), 340, 122, 96, '#FFE04A', { align: 'left' });
        host(X, 1640, 1060, 460, { mood: ['shock', 'star', 'dizzy', 'shock'][i % 4], fx: i % 3 === 2 ? ['sweat'] : undefined, bob: 30 * Math.max(0, 1 - u / 0.14) }); return; }
      if (X < T2) { const d = (T2 - T1) / FWD.length, i = Math.min(FWD.length - 1, Math.floor((X - T1) / d)); shot(FWD[i], X - T1 - i * d, (i % 2 ? -1 : 1) * 0.018); g.fillStyle = 'rgba(120,10,10,0.25)'; g.fillRect(0, 0, W, H); grain();   // cắt xuôi, đè đỏ
        big("HISTORY'S BIGGEST", 960, 400, 118, '#FFFFFF', { k: (X - T1) / 0.14 }); big('DISASTERS', 960, 590, 210, '#FFE04A', { k: (X - wd(L.hey, 'disasters')) / 0.14, rot: -0.02 }); return; }
      if (X < T4) { bg('#F4F1E8'); if (X >= T3) { g.fillStyle = INK; g.font = '800 30px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('tiny', 620, 540); g.strokeStyle = RED; g.lineWidth = 8; g.beginPath(); g.arc(620, 530, 90 + 18 * (1 - clamp((X - T3) / 0.2)), 0, 7); g.stroke(); } g.save(); g.translate(2 * 1320, 0); g.scale(-1, 1); host(X, 1320, 1060, 860, { mood: 'sus', look: 1, arms: 'point', lean: 0.1 }); g.restore(); return; }   // chữ "tiny" bé tí, người dẫn cúi soi
      if (X < T5) { bg('#FFD23C'); famous(1300, 1060, 720, 'hitler', { eyes: 'shock', mouth: 'o' }); big('STUPID', 620, 480, 190, RED, { k: (X - T4) / 0.14, rot: -0.07 }); host(X, 300, 1060, 380, { mood: 'derp' }); return; }   // nền vàng chói + mặt ngớ
      if (X < T6) { shot('watercolor', X - T5, -0.015); grain(); S.stamp('MISTAKES', 760, 500, 150, (X - T5) / 0.14, -0.06); host(X, 1600, 1060, 620, { mood: 'closed', mouth: 'flat', arms: 'facepalm' }); return; }   // tranh thật + dấu + úp mặt
      g.fillStyle = '#14233B'; g.fillRect(0, 0, W, H); const u = X - T6; REW.slice(0, 7).forEach(([k], i) => { const x = ((i * 420 - u * 340) % 2940 + 2940) % 2940 - 420; g.save(); g.globalAlpha = 0.55; g.beginPath(); g.rect(x, 760, 400, 250); g.clip(); cover(IM['p_' + k], x, 760, 400, 250); g.restore(); });   // băng ảnh trôi, logo sập
      const [lx, ly] = S.shake(clamp(u / 0.3), 24, X); big('BLUNDERSTORY', 610 + lx, 370 + ly, 112, '#FFFFFF', { k: u / 0.18 }); big('TINY MISTAKES. HUGE DISASTERS.', 610, 520, 46, '#FFE04A', { k: (u - 0.25) / 0.2 }); host(X, 1540, 1040, 720, { mood: 'wink', arms: 'wave', t }); if (u < 0.05) { g.fillStyle = `rgba(255,255,255,${1 - u / 0.05})`; g.fillRect(0, 0, W, H); } }],
    // 1 · "hôm nay khác": Hitler đứng giữa, bộ đếm SAI LẦM nhảy số + dấu X đỏ bật quanh · người dẫn không có
    [ST(L.today), (t, X) => { bg('#E8E2D2'); famous(960, 1060, 760, 'hitler'); const n = Math.min(12, Math.floor(t * 1.8));
      for (let i = 0; i < n; i++) { const a = i * 2.4, rr = 380 + 60 * hash(i), dx = Math.cos(a) * rr * 1.3; big('✗', 960 + Math.sign(dx || 1) * Math.max(340, Math.abs(dx)), clamp((560 + Math.sin(a) * rr * 0.9 - 240) / 720) * 720 + 240, 90, RED, { k: (t - i / 1.8) / 0.3 }); }
      big(`MISTAKES: ${n}`, 960, 110, 80, '#FFE04A', { k: t / 0.4 }); }],
    // 2 · ẢNH THẬT "Into the Jaws of Death" (PD) · nhãn ngày + 150 000+ · tiếng: sóng, máy tàu
    [ST(L.june), (t, X) => { S.photoBg(IM.p_dday, t, { zoom: 1.0 }); S.credit('Photo: "Into the Jaws of Death", 6 June 1944, US Coast Guard / NARA (public domain)');
      S.nameTag('6 JUNE 1944 · D-DAY', fade(X, ST(L.june) + 0.3)); S.label('150,000+ ALLIED TROOPS', 960, 170, 70, fade(X, ST(L.june) + 3.5), '#FFFFFF', { stroke: INK }); }],
    // 3 · bản đồ Normandy (chỉ bờ biển): xe tăng dự bị đậu sâu trong đất liền, mũi tên mờ "đẩy ra biển" · tiếng: động cơ xe tăng nổ máy
    [ST(L.ger), (t, X) => { const V = ev({ cx: 0.4, cy: 48.9, zoom: 8 }); coast(V); city(V, -0.37, 49.18, 'CAEN', 1);
      const b0 = P(V, -1.2, 49.42), b1 = P(V, -0.25, 49.33); g.save(); g.strokeStyle = RED; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(...b0); g.lineTo(...b1); g.stroke(); g.restore(); S.label('BEACHES', (b0[0] + b1[0]) / 2, b0[1] - 60, 44, 1, RED, { stroke: '#FFF' });
      const pz = P(V, 1.1, 48.45); for (let i = 0; i < 4; i++) tank(pz[0] + (i % 2) * 190 - 40, pz[1] + 40 + Math.floor(i / 2) * 105, 0.8, { flip: true, cross: true });
      S.label('PANZER RESERVES', pz[0] + 60, pz[1] - 70, 46, 1, INK, { stroke: '#FFF' }); arw([pz[0] - 130, pz[1] + 10], [b1[0] + 30, b1[1] + 40], fade(X, T.sea - 1.2, 0.8), 'rgba(194,52,58,0.85)', 20); }],
    // 4 · ổ khoá trên xe tăng "ONLY HITLER CAN SEND THEM" → đúng "bed": phòng ngủ tối, Hitler ngủ say · tiếng: khoá cạch → ngáy
    [ST(L.only), (t, X) => { if (X < T.bed) { bg('#E9DFC6'); for (let i = 0; i < 4; i++) tank(560 + i * 270, 640, 1.1, { flip: true, cross: true });
        g.save(); g.strokeStyle = INK; g.lineWidth = 12; g.fillStyle = '#D8B84A'; g.fillRect(900, 470, 120, 100); g.strokeRect(900, 470, 120, 100); g.beginPath(); g.arc(960, 470, 40, Math.PI, 0); g.stroke(); g.restore();
        S.label('ONLY HITLER CAN SEND THEM', 960, 860, 64, fade(X, ST(L.only) + 0.4), INK); return; }
      bg('#1F2A44'); g.fillStyle = '#F5E9B0'; g.beginPath(); g.arc(1600, 200, 70, 0, 7); g.fill(); bed(960, 640, 900, X); S.label('BERGHOF · 6 JUNE 1944', 960, 140, 54, 1, '#FFFFFF', { stroke: INK }); }],
    // 5 · hành lang: cửa "DO NOT DISTURB", người dẫn (tuỳ tùng) giơ tay định gõ rồi rụt lại; bóng thoại · tiếng: bước rón rén
    [ST(L.staff), (t, X) => { bg('#C9B89A'); g.fillStyle = '#6E4A2E'; g.strokeStyle = INK; g.lineWidth = 10; g.fillRect(1100, 220, 380, 760); g.strokeRect(1100, 220, 380, 760);
      g.fillStyle = '#D8B84A'; g.beginPath(); g.arc(1430, 620, 20, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#FFF'; g.fillRect(1160, 380, 260, 130); g.strokeRect(1160, 380, 260, 130);
      g.fillStyle = RED; g.font = '900 40px Archivo'; g.textAlign = 'center'; g.fillText('DO NOT', 1290, 435); g.fillText('DISTURB', 1290, 485);
      const knock = t > 1.2 && t < 3.2; doc(420, 800, 260, 320, 'REPORTS', { rot: -0.1, size: 34, lines: 6 }); aide(720, 1010, 640, { mood: 'sus', arms: knock ? 'point' : 'rest', mouth: 'wavy' });
      say('Probably a trick… let him sleep.', 700, 230, 720, 360, fade(X, ST(L.staff) + 3.2, 0.3), 36); }],
    // 6 · đồng hồ quay nhanh + xe tăng ngủ zZ → đúng "beach": ảnh D-Day nhỏ + dấu ASHORE · tiếng: tích tắc nhanh
    [ST(L.wait), (t, X) => { bg('#E9DFC6'); clock(520, 480, 240, t * 3); for (let i = 0; i < 3; i++) tank(1150 + i * 240, 720, 0.9, { flip: true, cross: true, zz: t + i });
      if (X > T.beach - 0.3) { S.photo(IM.p_dday, 1350, 380, 560, 1, { rot: 0.04 }); S.stamp('ASHORE', 1350, 380, 90, (X - T.beach) / 0.4); } }],
    // 7 · "Adolf Hitler" — Hitler đứng phải, tên lớn trái · người dẫn góc nói
    [ST(L.thing), (t, X) => { bg('#2A2C33'); famous(1250, 1060, 860, 'hitler', { eyes: 'angry' }); S.label('ADOLF HITLER', 600, 520, 110, fade(X, ST(L.thing) + 1.6), '#FFFFFF', { stroke: INK }); }],
    // 8 · "It wasn't even close." — bảng vạch đếm dài ra rất nhanh · tiếng: phấn gõ dồn
    [ST(L.close), (t, X) => { bg('#2F4A3A'); g.strokeStyle = '#F4F4F0'; g.lineWidth = 12; g.lineCap = 'round'; const n = Math.min(40, Math.floor(t * 30));
      for (let i = 0; i < n; i++) { const grp = Math.floor(i / 5), j = i % 5, x0 = 260 + (grp % 4) * 380, y0 = 330 + Math.floor(grp / 4) * 300; g.beginPath();
        if (j < 4) { g.moveTo(x0 + j * 60, y0); g.lineTo(x0 + j * 60, y0 + 180); } else { g.moveTo(x0 - 30, y0 + 160); g.lineTo(x0 + 220, y0 + 20); } g.stroke(); } }],
    // 9 · tua ngược: đồng hồ quay ngược, năm chạy lùi 1944 → 1907, rồi ảnh thật tranh màu nước · tiếng: tua băng
    [ST(L.back), (t, X) => { bg('#1E2230'); const yr = Math.max(1907, Math.round(1944 - t * 14)); clock(960, 470, 260, -t * 8); big(String(yr), 960, 880, 140, '#FFE04A');
      if (yr === 1907) S.label('VIENNA', 960, 120, 70, fade(t, 2.7, 0.3), '#FFFFFF', { stroke: INK }); }],

    // ── The art student ──
    // 10 · ẢNH THẬT tranh màu nước Nhà hát Vienna (Hitler vẽ, PD) làm nền + Hitler trẻ ôm cặp tranh · tiếng: nhạc Vienna nhẹ
    [ST(L.v07), (t, X) => { S.photoBg(IM.p_watercolor, t, { zoom: 1.05 }); S.credit('Watercolour of the Vienna State Opera by Adolf Hitler, c. 1912 (public domain)');
      famous(1500, 1060, 820, 'hitler', { ...YOUNG, eyes: 'happy', mouth: 'smile' }); g.save(); g.fillStyle = '#3A2A1C'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(1370, 690, 260, 200); g.strokeRect(1370, 690, 260, 200); g.fillStyle = '#F6F0DE'; g.fillRect(1395, 715, 210, 150); g.strokeRect(1395, 715, 210, 150); g.fillStyle = '#7FA6C2'; g.fillRect(1415, 735, 170, 60); g.fillStyle = '#B9533A'; g.beginPath(); g.moveTo(1440, 795); g.lineTo(1500, 750); g.lineTo(1560, 795); g.closePath(); g.fill(); g.restore();
      S.nameTag('VIENNA · 1907 · AGE 18', fade(X, ST(L.v07) + 0.4)); }],
    // 11 · bài thi vẽ: nhà rất đẹp, người là que tăm; giám khảo (người dẫn đội mũ nồi) đóng dấu · đúng "heads": dòng ghi sổ · tiếng: dấu cộp
    [ST(L.passed), (t, X) => { bg('#E8E2D2'); doc(760, 520, 760, 820, 'TEST DRAWING', { size: 54, lines: 0 });
      g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#F6F0DE'; g.strokeRect(520, 330, 300, 260); for (let i = 0; i < 4; i++) g.strokeRect(550 + i * 66, 380, 40, 70); g.beginPath(); g.moveTo(500, 330); g.lineTo(670, 230); g.lineTo(840, 330); g.stroke();
      g.lineWidth = 5; g.beginPath(); g.arc(940, 470, 18, 0, 7); g.moveTo(940, 488); g.lineTo(940, 560); g.lineTo(915, 610); g.moveTo(940, 560); g.lineTo(965, 610); g.stroke(); g.restore();
      aide(1500, 1060, 620, { outfit: 'plain', mood: 'smug', mouth: 'smirk', arms: 'point', mirror: true });
      S.stamp('UNSATISFACTORY', 760, 760, 60, (X - T.heads + 1.6) / 0.4); S.label('"Test drawing unsatisfactory. Few heads."', 960, 1000, 44, fade(X, T.heads - 0.2), INK); }],
    // 12 · nhà đẹp / người xấu: trái toà nhà vẽ đẹp ✓, phải người vẽ méo xệch ✗ · Hitler mếu giữa · tiếng: boing
    [ST(L.words), (t, X) => { bg('#F4F1E8'); g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#E2D4B4'; g.fillRect(220, 380, 420, 420); g.strokeRect(220, 380, 420, 420);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { g.fillStyle = '#7FA6C2'; g.fillRect(250 + c * 100, 420 + r * 120, 60, 80); g.strokeRect(250 + c * 100, 420 + r * 120, 60, 80); }
      g.beginPath(); g.moveTo(200, 380); g.lineTo(430, 260); g.lineTo(660, 380); g.closePath(); g.fillStyle = '#B9533A'; g.fill(); g.stroke(); g.restore(); big('✓', 430, 880, 120, '#3EA45A');
      if (X > T.people - 0.3) { g.save(); g.strokeStyle = INK; g.lineWidth = 9; g.beginPath(); g.ellipse(1480, 420, 90, 60, 0.5, 0, 7); g.moveTo(1470, 480); g.lineTo(1420, 700); g.lineTo(1520, 800);
        g.moveTo(1440, 560); g.lineTo(1600, 520); g.moveTo(1420, 700); g.lineTo(1330, 820); g.stroke(); g.fillStyle = INK; g.fillRect(1440, 400, 14, 14); g.fillRect(1510, 430, 22, 8); g.restore(); big('✗', 1480, 880, 120, RED); }
      famous(960, 1060, 520, 'hitler', { ...YOUNG, eyes: 'sad', mouth: 'frown' }); }],
    // 13 · năm sau: cửa trường đóng sầm, biển "NO" · tiếng: cửa đóng
    [ST(L.year), (t, X) => { bg('#C9C2B0'); g.fillStyle = '#E8E2D2'; g.strokeStyle = INK; g.lineWidth = 10; g.fillRect(560, 160, 800, 900); g.strokeRect(560, 160, 800, 900);
      g.fillStyle = INK; g.font = '900 54px Archivo'; g.textAlign = 'center'; g.fillText('ACADEMY OF FINE ARTS', 960, 250); const sh = ease(clamp(t / 0.25)); g.fillStyle = '#6E4A2E'; g.fillRect(760, 380, 400 * sh, 680); g.strokeRect(760, 380, 400, 680);
      S.stamp('NO.', 960, 640, 120, (t - 0.6) / 0.4); famous(330, 1060, 560, 'hitler', { ...YOUNG, eyes: 'shock', mouth: 'o' }); S.label('1908', 300, 130, 90, 1, INK, { stroke: '#FFF' }); }],
    // 14 · "he later claimed" — biển "ARCHITECTURE — DIPLOMA REQUIRED", Hitler lục túi không có bằng · tiếng: lục túi
    [ST(L.arch), (t, X) => { bg('#E8E2D2'); S.label('HE LATER CLAIMED…', 960, 130, 56, 1, '#6A6460'); doc(1300, 520, 620, 480, 'ARCHITECTURE SCHOOL', { size: 38, lines: 9 });
      S.stamp('DIPLOMA REQUIRED', 1300, 620, 44, (X - T.diploma) / 0.4); famous(560, 1060, 640, 'hitler', { ...YOUNG, eyes: X > T.diploma ? 'shock' : 'dot', mouth: X > T.diploma ? 'o' : null }); }],
    // 15 · nhà trọ rẻ + bán tranh qua người môi giới: tranh thật trong khung trên quầy, bảng giá; Hitler cau có · tiếng: chuông cửa hàng
    [ST(L.stayed), (t, X) => { bg('#D9C9A0'); g.fillStyle = '#8A6A44'; g.fillRect(0, 760, W, 320); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke();
      S.photo(IM.p_watercolor, 760, 470, 560, 1, { rot: -0.03 }); g.save(); g.fillStyle = '#FFF'; g.translate(1080, 640); g.rotate(0.15); g.fillRect(-100, -40, 200, 80); g.strokeRect(-100, -40, 200, 80); g.fillStyle = INK; g.font = '900 40px Archivo'; g.textAlign = 'center'; g.fillText('CHEAP', 0, 14); g.restore();
      famous(1500, 1060, 640, 'hitler', { ...YOUNG, eyes: 'angry', mouth: 'frown' }); S.label('POSTCARD SHOP (ANGRY)', 760, 980, 50, fade(X, T.dealers + 0.6), INK, { stroke: '#FFF' }); }],
    // 16 · "WHAT IF?": vũ trụ khác — Hitler đội mũ nồi vẽ tranh vui vẻ, cầu vồng · tiếng: hạc cầm mơ màng
    [ST(L.tempt), (t, X) => { const k = fade(X, T.yes - 0.4, 0.5); bg('#BFE0F5'); g.save(); g.lineWidth = 34; ['#E2463A', '#F2A93B', '#F2D33B', '#5FBF6A', '#4A8FE0'].forEach((c, i) => { g.strokeStyle = c; g.beginPath(); g.arc(960, 1150, 760 - i * 34, Math.PI, 0); g.stroke(); }); g.restore();
      famous(780, 1060, 640, 'hitler', { ...YOUNG, eyes: 'happy', mouth: 'smile', arms: ['down', 'orate'] }); g.save(); g.fillStyle = '#3A2A4A'; g.beginPath(); g.ellipse(790, 470, 150, 40, -0.15, 0, 7); g.fill(); g.restore();
      doc(1360, 560, 420, 520, '', { lines: 0, col: '#FFFFFF' }); g.save(); g.fillStyle = '#F2C230'; g.beginPath(); g.arc(1440, 420, 60, 0, 7); g.fill(); g.fillStyle = '#5FBF6A'; g.fillRect(1170, 640, 380, 160); ['#E2463A', '#F2A93B', '#C86BD6'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(1240 + i * 110, 640, 34, 0, 7); g.fill(); }); g.restore(); big('WHAT IF?', 960, 140, 110, '#FFE04A', { k }); }],
    // 17 · dấu "JOKE, NOT HISTORY" đè lên vũ trụ khác, khử màu → thẻ ẢNH THẬT đầu tiên (tranh màu nước) bay vào khay · tiếng: dấu + vút
    [ST(L.joke), (t, X) => { bg('#BFE0F5'); famous(780, 1060, 640, 'hitler', { ...YOUNG, eyes: 'happy', mouth: 'smile', arms: ['down', 'orate'] }); S.desat(fade(X, T.jk, 0.3));
      S.stamp('JOKE, NOT HISTORY', 960, 300, 96, (X - T.jk) / 0.4); if (X > T.thousand) tray(1, (X - T.thousand) / 0.7); }],
  ];
};
