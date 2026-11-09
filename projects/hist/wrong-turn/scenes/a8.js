// hồi a8 — The bill + Outro + thẻ kết (BRIEF-SCENES.md §a8). Tất định: mọi khung là hàm của X (giờ trang).
// The bill: NGHIÊM — ảnh tư liệu khử màu, chữ trắng nhỏ, không người dẫn, không mặt cười. Outro: người dẫn góc (nhép),
// 5 sai lầm hiện lại theo từ, tài xế cận + dấu tên tập lần 3, thẻ kết đứng yên ≥ 4 s sau lời cuối.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, ANCHOR, INK, LAND } from '../../_kit/mapkit.js';
import { mistakes, SK } from './common.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;
const BONE = '#E8E4DA';

export default K => { const { g, IM, M, wd, ST } = K;
  const L = { war: 'The war lasted', twenty: 'Around twenty million people died', four: 'Four empires', peace: 'And the peace', gav: 'Gavrilo Princip never',
    under: 'Because he was under', tb: 'He died of tuberculosis', what: 'So what really', just: "It wasn't just", morning: 'But on that one morning',
    change: 'Change any one', instead: 'Instead, nobody', hist: "History's biggest", stick: 'So stick around' };
  const T = { years: wd(L.war, 'years'), million: wd(L.twenty, 'million'), roughly: wd(L.twenty, 'roughly'), york: wd(L.twenty, 'york'),
    german: wd(L.four, 'german'), austro: wd(L.four, 'austro-hungarian'), russian: wd(L.four, 'russian'), ottoman: wd(L.four, 'ottoman'), survive: wd(L.four, 'survive'),
    anger: wd(L.peace, 'anger'), bigger: wd(L.peace, 'bigger'), tw20: wd(L.peace, 'twenty'), stage: wd(L.peace, 'stage'),
    never: wd(L.gav, 'never'), u20: wd(L.under, 'under'), sentenced: wd(L.under, 'sentenced'), sent20: wd(L.under, 'twenty', 1), executed: wd(L.under, 'executed'),
    tub: wd(L.tb, 'tuberculosis'), april: wd(L.tb, 'april'), seven: wd(L.tb, 'seven'), over: wd(L.tb, 'over'),
    started: wd(L.what, 'started'), driver1: wd(L.just, 'driver'), empires: wd(L.just, 'empires'), alliances: wd(L.just, 'alliances'), nationalism: wd(L.just, 'nationalism'), powerful: wd(L.just, 'powerful'),
    five: wd(L.morning, 'five'), date: wd(L.morning, 'date'), security: wd(L.morning, 'security'), decision: wd(L.morning, 'decision'), governor: wd(L.morning, "governor's"), chg: wd(L.morning, 'change'),
    boring: wd(L.change, 'boring'), hospital: wd(L.change, 'hospital'), nobody: wd(L.instead, 'nobody'),
    disasters: wd(L.hist, 'disasters'), tiny: wd(L.hist, 'tiny'), find: wd(L.hist, 'find'), next: wd(L.stick, 'next'), smaller: wd(L.stick, 'smaller') };

  /** chữ nghiêm: trắng ngà, đậm vừa, không nảy — chỉ hiện dần */
  function sober(txt, x, y, size, k, o = {}) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k) * (o.a ?? 1); g.font = `${o.w ?? 700} ${size}px Archivo, sans-serif`;
    g.textAlign = o.align ?? 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = o.col ?? BONE; g.fillText(txt, x, y); g.restore(); }
  const fade = (X, t0, d = 0.6) => clamp((X - t0) / d);
  const mix = (a, b, k) => { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)), A = p(a), Bc = p(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, Bc[i], k))).join(',')})`; };

  /** tài xế vẽ cận (gag "nobody told the driver" — cùng đồ với a6) */
  function driverClose(X, o = {}) { C.folk(o.x ?? 960, o.y ?? 1360, o.h ?? 1150, { skin: SK, coat: 'driver', wear: 'driver', eyes: o.eyes ?? 'happy', mouth: o.mouth ?? 'grin' });
    if (o.notes !== false) for (let i = 0; i < 3; i++) { const k = (X * 0.8 + i / 3) % 1; S.label('♪', (o.x ?? 960) + 330 + 50 * Math.sin(k * 6 + i), 520 - k * 300, 80, 1, `rgba(255,255,255,${1 - k})`, { stroke: INK, free: true }); } }

  const ROWS = [['THE DATE', 'date'], ['THE SECURITY', 'security'], ['CARRYING ON', 'decision'], ["THE GOVERNOR'S CONFIDENCE", 'governor'], ['NOBODY TOLD THE DRIVER', 'chg']];

  return [
    // 1 · ảnh chiến hào Somme 1916 khử màu, "1914 – 1918" chữ nhỏ · không người dẫn · tiếng: nền trầm, gió xa
    [ST(L.war), (t, X) => { S.photoBg(IM.p_trench, t, { desat: 1, dark: 0.35, fy: 0.5, push: 0.01, credit: 'British trench at the Somme, 1916 · public domain' });
      sober('1914 – 1918', 960, 1000, 54, fade(X, T.years - 0.3)); }],
    // 2 · chiến hào đẩy gần + "20 MILLION" chữ trắng nhỏ → (roughly) lưới 2000 chấm, mỗi chấm 10 000 người · không người dẫn · tiếng: im
    [ST(L.twenty), (t, X) => { if (X < T.roughly - 0.2) { S.photoBg(IM.p_trench, t + 2.4, { desat: 1, dark: 0.55, zoom: 1.25, fx: 0.35, fy: 0.55, push: 0.01, credit: 'British trench at the Somme, 1916 · public domain' });
        sober('20 MILLION DEAD', 960, 560, 72, fade(X, T.million - 0.1)); return; }
      g.fillStyle = '#121212'; g.fillRect(0, 0, W, H); const u = X - T.roughly + 0.2, cols = 80, rows = 25;
      for (let i = 0; i < cols * rows; i++) { const k = clamp((u - (i / (cols * rows)) * 1.6) / 0.2); if (k <= 0) break; g.fillStyle = `rgba(232,228,218,${0.75 * k})`;
        g.beginPath(); g.arc(250 + (i % cols) * 18.2, 220 + Math.floor(i / cols) * 22, 5, 0, 7); g.fill(); }
      sober('20 MILLION DEAD', 960, 140, 60, 1); sober('each dot = 10,000 people', 960, 860, 34, fade(X, T.roughly + 0.4), { w: 500, a: 0.8 });
      sober('≈ NEW YORK STATE TODAY', 960, 960, 44, fade(X, T.york - 0.2, 0.4)); }],
    // 3 · bản đồ châu Âu khử màu: 4 đế quốc tô xám đậm theo tên được gọi → "did not survive" phai về màu đất · không người dẫn · tiếng: mỗi tên một tiếng trống trầm nhẹ
    [ST(L.four), (t, X) => { const V = view(M, { cx: 21, cy: 48.5, zoom: lerp(1.08, 1.13, clamp(t / 6)) });
      const E = [['German Empire', T.german, 'GERMAN'], ['Austro-Hungarian Empire', T.austro, 'AUSTRO-HUNGARIAN'], ['Russian Empire', T.russian, 'RUSSIAN'], ['Ottoman Empire', T.ottoman, 'OTTOMAN']], fill = {};
      const gone = ease((X - T.survive) / 1.2);
      for (const [n, t0] of E) fill[n] = mix(LAND, '#5A5A5E', clamp((X - t0 + 0.1) / 0.3) * (1 - gone));
      drawMap(g, M, V, { fill }); S.desat(1, 0.35);
      for (const [n, t0, nm] of E) { const a = ANCHOR[n], P = S.pt(V, a[0], a[1]);
        S.label(nm, P[0], P[1], 34, clamp((X - t0) / 0.3) * (1 - gone), '#FFF', { stroke: '#222' });
        if (gone > 0) S.label(nm, P[0], P[1], 34, 1, `rgba(255,255,255,${0.45 * gone})`, { stroke: `rgba(30,30,30,${0.45 * gone})` }); }
      sober('4 EMPIRES', 300, 150, 64, fade(X, ST(L.four) + 0.2, 0.4), { col: '#FFF', align: 'left' }); }],
    // 4 · tờ hoà ước 1919 (vẽ) nứt dần ở "anger" → trục năm 1919 ── 1939 "20 YEARS" · không người dẫn · tiếng: giấy xé khẽ, trầm
    [ST(L.peace), (t, X) => { g.fillStyle = '#141414'; g.fillRect(0, 0, W, H);
      if (X < T.stage) { const k = clamp(t / 0.5); g.save(); g.globalAlpha = k; g.translate(960, 540); g.rotate(-0.03); g.fillStyle = '#D9D3C4'; g.fillRect(-300, -380, 600, 760);
          g.strokeStyle = '#8A8478'; g.lineWidth = 4; g.strokeRect(-300, -380, 600, 760); g.fillStyle = '#3A3630'; g.font = '800 46px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('PEACE TREATY', 0, -270); g.font = '600 36px Archivo, sans-serif'; g.fillText('1919', 0, -215);
          g.fillStyle = '#8A8478'; for (let i = 0; i < 12; i++) g.fillRect(-230, -150 + i * 40, 460 * (0.6 + 0.4 * hash(i)), 10);
          const c = clamp((X - T.anger) / 0.9); if (c > 0) { g.strokeStyle = '#141414'; g.lineWidth = 8; g.lineJoin = 'miter'; g.beginPath(); g.moveTo(-40, -380);
            for (let i = 1; i <= 10 * c; i++) g.lineTo(-40 + (hash(i + 20) - 0.5) * 120, -380 + i * 76); g.stroke(); }
          g.restore(); return; }
      const k = clamp((X - T.stage) / 0.8), y = 560; g.save(); g.strokeStyle = BONE; g.lineWidth = 6; g.beginPath(); g.moveTo(360, y); g.lineTo(lerp(360, 1560, easeOut(k)), y); g.stroke();
      for (const x of [360, 1560]) { if (x === 1560 && k < 1) continue; g.beginPath(); g.moveTo(x, y - 26); g.lineTo(x, y + 26); g.stroke(); } g.restore();
      sober('1918', 360, y + 90, 56, 1); sober('1939', 1560, y + 90, 56, fade(X, T.bigger - 0.2, 0.4)); sober('an even bigger war', 1560, y - 60, 38, fade(X, T.bigger, 0.4), { w: 500 });
      sober('20 YEARS', 960, y - 40, 60, fade(X, T.tw20 - 0.1, 0.4)); }],
    // 5 · ảnh Princip khung giấy trên nền tối + tên + "1894 – 1918" · không người dẫn · tiếng: im
    [ST(L.gav), (t, X) => { g.fillStyle = '#141414'; g.fillRect(0, 0, W, H); S.photo(IM.s_princip, 680, 520, 760, clamp(t / 0.6), { push: 1 + 0.01 * t, credit: 'Gavrilo Princip · public domain' }); S.desat(1, 0.1);
      sober('GAVRILO PRINCIP', 1140, 480, 60, fade(X, ST(L.gav) + 0.2, 0.4), { align: 'left' }); sober('1894 – 1918', 1140, 560, 46, fade(X, T.never, 0.5), { align: 'left', w: 500 }); }],
    // 6 · cùng ảnh, chấn song nhà tù hạ xuống ở "sentenced"; "AGE 19" ở "under", "20 YEARS" ở "twenty" lần 2 · không người dẫn · tiếng: cửa sắt đóng (nhẹ) đúng "twenty years"
    [ST(L.under), (t, X) => { g.fillStyle = '#141414'; g.fillRect(0, 0, W, H); S.photo(IM.s_princip, 680, 520, 760, 1, { push: 1.03 + 0.008 * t, credit: 'Gavrilo Princip · public domain' }); S.desat(1, 0.15);
      const b = easeOut((X - T.sentenced + 0.1) / 0.5); if (b > 0) { g.save(); g.fillStyle = '#1C1C1E'; for (let i = 0; i < 7; i++) g.fillRect(250 + i * 140, 140 - 800 * (1 - b), 26, 800); g.fillRect(230, 140 - 800 * (1 - b) + 380, 900, 22); g.restore(); }
      sober('GAVRILO PRINCIP', 1140, 480, 60, 1, { align: 'left' }); sober('AGE 19', 1140, 600, 52, fade(X, T.u20, 0.4), { align: 'left' });
      const kc = fade(X, T.sentenced - 0.1, 0.3); if (kc > 0) { g.save(); g.globalAlpha = kc; g.fillStyle = '#E8E4DA'; g.fillRect(1130, 650, 620, 110); g.restore();
        sober('20 YEARS IN PRISON', 1440, 725, 54, kc, { col: '#141414', w: 800 }); } }],
    // 7 · trục thời gian nghiêm: APRIL 1918 (chết lao phổi) ── 7 MONTHS ── 11 NOV 1918 (đình chiến) · không người dẫn · tiếng: im, một tiếng chuông xa ở "over"
    [ST(L.tb), (t, X) => { g.fillStyle = '#141414'; g.fillRect(0, 0, W, H); const y = 560, a = 420, b = 1500;
      sober('DIED OF TUBERCULOSIS', 960, 300, 54, clamp(t / 0.3)); sober('GAVRILO PRINCIP', 960, 210, 40, clamp(t / 0.3), { w: 500, a: 0.7 });
      const k = clamp((X - T.seven + 0.4) / 0.8); g.save(); g.strokeStyle = BONE; g.lineWidth = 6; g.beginPath(); g.moveTo(a, y); g.lineTo(lerp(a, b, easeOut(k)), y); g.stroke();
      g.fillStyle = BONE; g.beginPath(); g.arc(a, y, 14, 0, 7); g.fill(); if (k >= 1) { g.beginPath(); g.arc(b, y, 14, 0, 7); g.fill(); } g.restore();
      sober('APRIL 1918', a, y + 80, 48, Math.max(clamp(t / 0.3), fade(X, T.april - 0.1, 0.4))); sober('7 MONTHS', (a + b) / 2, y - 40, 54, fade(X, T.seven, 0.4));
      sober('11 NOV 1918', b, y + 80, 48, fade(X, T.over - 0.6, 0.4)); sober('war ends', b, y + 130, 36, fade(X, T.over - 0.4, 0.4), { w: 500, a: 0.8 }); }],
    // 8 · Outro: giấy sáng, câu hỏi "WHAT STARTED WW1?" · người dẫn góc phải (nhép) · tiếng: "started" → pop nhẹ, nhạc nền trở lại
    [ST(L.what), (t, X) => { S.paper(); S.label('WHAT STARTED', 700, 470, 110, clamp(t / 0.3), INK); S.label('WORLD WAR ONE?', 700, 620, 110, clamp((X - T.started) / 0.3), RED, { stroke: INK });
      S.lipHost(X, clamp(t / 0.3)); }],
    // 9 · tài xế (vẽ, nhỏ) "NOT JUST HIM" → 4 thẻ theo từ: EMPIRES / ALLIANCES / NATIONALISM / POWERFUL MEN · người dẫn góc (nhép) · tiếng: mỗi thẻ một tiếng "thud"
    [ST(L.just), (t, X) => { S.paper(); const sh = clamp((X - T.empires + 0.2) / 0.5), dx = lerp(640, 230, ease(sh)), dh = lerp(520, 330, ease(sh));
      C.folk(dx, lerp(900, 960, ease(sh)), dh, { skin: SK, coat: 'driver', wear: 'driver', eyes: 'shock', sweat: true });
      S.label('NOT JUST HIM', dx, lerp(300, 540, ease(sh)), lerp(64, 38, ease(sh)), clamp((X - T.driver1) / 0.3), RED, { stroke: '#FFF' });
      [['EMPIRES', T.empires], ['ALLIANCES', T.alliances], ['NATIONALISM', T.nationalism], ['POWERFUL MEN', T.powerful]].forEach(([tx, t0], i) => { const k = clamp((X - t0 + 0.1) / 0.3); if (k <= 0) return;
        const x = 470 + (i % 2) * 450, y = 330 + Math.floor(i / 2) * 260; g.save(); g.translate(x, y); const s = back(k); g.scale(s, s); g.rotate((hash(i) - 0.5) * 0.06);
        g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(0, -70, 410, 140, 18); g.fill(); g.stroke(); g.restore();
        S.label(tx, x + 205, y + 18, tx.length > 10 ? 44 : 52, k, INK, { free: true }); });
      S.lipHost(X); }],
    // 10 · bảng MISTAKES 5/5 + danh sách 5 sai lầm, mỗi dòng ✗ đỏ đúng từ · người dẫn góc (nhép) · tiếng: mỗi ✗ một tiếng "buzz" ngắn
    [ST(L.morning), (t, X) => { S.paper(); mistakes(5, clamp(t / 0.4), X - T.five);
      ROWS.forEach(([tx, key], i) => { const y = 270 + i * 150, k = clamp((X - T[key] + 0.15) / 0.3), slot = clamp((t - 0.05 - i * 0.07) / 0.2);
        if (slot > 0) { g.save(); g.globalAlpha = slot; g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(110, y - 58, 1180, 112, 16); g.fill(); g.stroke();
          g.fillStyle = INK; g.font = '900 54px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(i + 1), 170, y + 2); g.restore(); }
        if (k > 0) { S.label(tx, 240, y + 20, 52, k, INK, { align: 'left', free: true });
          g.save(); g.translate(1220, y); const s = back(k); g.scale(s, s); g.strokeStyle = RED; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-30, -30); g.lineTo(30, 30); g.moveTo(30, -30); g.lineTo(-30, 30); g.stroke(); g.restore(); } });
      S.lipHost(X); }],
    // 11 · "what if": toà thị chính vẽ, thị trưởng đọc diễn văn dài (giấy lê thê), FF + Sophie mắt chán; "hospital" → bong bóng phòng bệnh · không người dẫn · tiếng: "boring" → ngáp, "hospital" → pop
    [ST(L.change), (t, X) => { B.place('cityhall'); const yy = 1000;
      C.folk(560, yy, 420, { skin: SK, coat: 'suit', feat: 'mayor', wear: 'fez', eyes: 'happy' });
      const pk = clamp((X - T.boring + 0.3) / 0.8); g.save(); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(620, 760, 120, 90 + 150 * pk); g.strokeRect(620, 760, 120, 90 + 150 * pk);
      g.fillStyle = '#AAA'; for (let i = 0; i < 3 + 6 * pk; i++) g.fillRect(635, 780 + i * 24, 90, 6); g.restore();
      const bored = X > T.boring - 0.2 ? 'bored' : 'dot'; C.folk(1050, yy, 430, { skin: SK, coat: 'austro', feat: 'ff', wear: 'plume', eyes: bored });
      C.folk(1300, yy, 400, { skin: SK, coat: 'gown', feat: 'sophie', wear: 'sophiehat', eyes: bored });
      S.label('WHAT IF?', 300, 150, 80, clamp(t / 0.3), '#FFF', { stroke: INK });
      S.ward(1450, 330, clamp((X - T.hospital + 0.1) / 0.35), X); }],
    // 12 · tài xế cận huýt sáo ♪ + dấu tên tập lần 3 ở "nobody" · không người dẫn · tiếng: huýt sáo, "nobody" → dập dấu
    [ST(L.instead), (t, X) => { B.place('quay'); driverClose(X); S.stamp('NOBODY TOLD THE DRIVER', 960, 150, 84, clamp((X - T.nobody) / 0.35), -0.05); }],
    // 13 · luận đề kênh: domino nhỏ → domino khổng lồ; "HUGE DISASTERS" ở "disasters", "TINY MISTAKES" ở "tiny", kính lúp ở "find" · người dẫn góc (nhép) · tiếng: "disasters" → domino đổ trầm, "find" → tiếng soi
    [ST(L.hist), (t, X) => { S.paper(); const base = 820, D = [[200, 70], [330, 130], [500, 230], [740, 380], [1060, 560]];
      D.forEach(([x, h], i) => { const k = clamp((X - ST(L.hist) - i * 0.12) / 0.3); if (k <= 0) return; const w = h * 0.42, hh = h * back(k);
        g.save(); g.fillStyle = i === 4 ? RED : i === 0 ? '#F2C94C' : '#FFF'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(x - w / 2, base - hh, w, hh, 10); g.fill(); g.stroke();
        g.fillStyle = INK; g.beginPath(); g.arc(x, base - hh * 0.3, Math.max(5, w * 0.08), 0, 7); g.fill(); g.beginPath(); g.arc(x, base - hh * 0.7, Math.max(5, w * 0.08), 0, 7); g.fill(); g.restore(); });
      g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(120, base); g.lineTo(1300, base); g.stroke(); g.restore();
      S.label('HUGE DISASTERS', 1060, 930, 64, clamp((X - T.disasters) / 0.3), RED, { stroke: '#FFF' });
      S.label('TINY MISTAKES', 260, 930, 52, clamp((X - T.tiny) / 0.3), INK, { align: 'left' });
      const m = clamp((X - T.find + 0.2) / 0.4); if (m > 0) { const mx = lerp(700, 225, ease(m)), my = lerp(400, 700, ease(m)); g.save(); g.strokeStyle = INK; g.lineWidth = 14; g.lineCap = 'round';
        g.beginPath(); g.moveTo(mx + 64, my + 64); g.lineTo(mx + 150, my + 150); g.stroke(); g.lineWidth = 9; g.fillStyle = 'rgba(160,210,240,0.35)'; g.beginPath(); g.arc(mx, my, 90, 0, 7); g.fill(); g.stroke(); g.restore(); }
      S.lipHost(X); }],
    // 14 · thẻ kết (đứng yên ≥ 4 s sau lời cuối): tên tập + "next time: an even smaller mistake" + xe vẽ nhỏ + người dẫn toàn thân vẫy · tiếng: nhạc kết, "next time" → swoosh
    [ST(L.stick), (t, X) => { S.paper(); const Xf = Math.min(X, K.END + 0.3);
      S.label('NOBODY TOLD', 640, 330, 112, clamp(t / 0.3), INK); S.label('THE DRIVER', 640, 460, 112, clamp((t - 0.15) / 0.3), RED, { stroke: '#FFF' });
      S.label('next time: an even smaller mistake', 640, 590, 46, clamp((X - T.next) / 0.4), '#55504A');
      g.save(); g.translate((1 - easeOut(clamp(t / 0.5))) * -900, 0);
      C.car1914(640, 990, 620, { flags: true, seats: ([fx, fy], [bx, by]) => { const s = 620 / 1080;
        C.folk(bx - 30 * s, by + 70 * s, 360 * s, { skin: SK, coat: 'austro', feat: 'ff', wear: 'plume' }); C.folk(bx + 150 * s, by + 70 * s, 340 * s, { skin: SK, coat: 'gown', feat: 'sophie', wear: 'sophiehat' });
        C.folk(fx + 50 * s, fy + 80 * s, 330 * s, { skin: SK, coat: 'driver', wear: 'driver', eyes: 'happy' }); } }); g.restore();
      S.hostIn(1500, 1040, 640, clamp(t / 0.35), { arms: X < K.END + 0.3 ? 'wave' : 'rest', mood: 'smug', mouth: X < K.END + 0.1 ? mouthAt(X) : 'rest', t: Xf }); }],
  ];
};
