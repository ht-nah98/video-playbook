// a2 — The halt order (252–328 s) + Changing targets (329–378 s).
// Dunkirk: bản đồ bờ biển 1939 Ba Lan → 5/1940 xuyên rừng Ardennes → túi Dunkirk → xe tăng cách ~15 dặm → "And then the tanks stopped." (biển STOP,
// đóng băng) → tướng đề xuất, Hitler duyệt; người dẫn (tuỳ tùng) bóng thoại "Mein Führer… are we sure?" → Göring hứa → xe tăng ngủ 3 ngày →
// ẢNH THẬT Dunkirk + tàu khu trục về Dover, bộ đếm 338 226 → xe tải bỏ lại "an army can always get new trucks" → thẻ Dunkirk vào khay.
// Trận Anh quốc: máy bay đánh sân bay (bản đồ Anh) → phi công Anh mệt → bom lạc London / RAF ném Berlin → Hitler giận (gân) đổi mũi tên sang
// London → ẢNH THẬT St Paul's trong Blitz (nghiêm, khử màu) → sân bay sửa xong, phi công nghỉ → dấu "INVASION POSTPONED" → thẻ Blitz vào khay.
import * as S from '../../_kit/stage.js';
import { famous } from '../../_kit/famous.js';
import { folk } from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { bg, big, say, aide, coast, ev, P, city, arw, tank, plane, doc, tray, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { s39: 'In September nineteen thirty-nine', may: 'Then, in May nineteen forty', two: 'In just two weeks', fifteen: 'German tanks were only about fifteen', stop: 'And then the tanks stopped.',
    order: 'The order to halt came', goring: 'Hermann Göring, the head', days: 'For about three days', destroyers: 'Destroyers, ferries, fishing', lost: 'Britain lost almost all',
    summer: 'That summer, Hitler wanted', hurting: 'It was hurting', night: 'Then, one night, a few German', furious: 'Hitler was furious', horror: 'It was a horror for the people',
    gave: 'But it also gave the exhausted', middle: 'By the middle of September' };
  const T = { poland: wd(L.s39, 'poland'), forest: wd(L.may, 'forest'), france: wd(L.may, 'france'), dunkirk: wd(L.two, 'dunkirk'), approved: wd(L.order, 'approved'),
    alone: wd(L.goring, 'alone'), work: wd(L.days, 'work'), trucks: wd(L.lost, 'trucks'), london: wd(L.night, 'london'), berlin: wd(L.night, 'berlin'), london2: wd(L.furious, 'london'),
    postponed: wd(L.middle, 'postponed'), happened: wd(L.middle, 'happened') };
  const V0 = { cx: 10, cy: 50, zoom: 1.5 }, VD = { cx: 3.0, cy: 50.6, zoom: 4.0 }, VB = { cx: 2.5, cy: 52.5, zoom: 2.4 };
  return [
    // 35 · bản đồ: mũi tên Đức → Ba Lan, cờ Anh / Pháp "WAR" bật · tiếng: pháo xa
    [ST(L.s39), (t, X) => { const V = ev(V0); coast(V); city(V, 13.4, 52.52, 'BERLIN', 1, { dy: -32 }); city(V, 21.0, 52.23, 'WARSAW', 1, { dy: -32 }); arw(P(V, 14.2, 52.3), P(V, 20.5, 52.2), fade(X, T.poland - 0.6, 0.8), RED, 26, 0.1);
      S.label('1 SEP 1939', 960, 120, 64, 1, INK, { stroke: '#FFF' }); if (X > T.poland + 0.8) { S.stamp('BRITAIN: WAR', Math.max(290, P(V, -2, 53)[0]), P(V, -2, 53)[1], 50, (X - T.poland - 0.8) / 0.4, -0.06); S.stamp('FRANCE: WAR', Math.max(290, P(V, 2.5, 47)[0]), P(V, 2.5, 47)[1], 50, (X - T.poland - 1.3) / 0.4, 0.05); } }],
    // 36 · 5/1940: cây rừng Ardennes trên bản đồ, mũi tên xe tăng xuyên rừng ra tới biển · tiếng: động cơ
    [ST(L.may), (t, X) => { const V = ev({ cx: 4.5, cy: 50, zoom: 3.2 }); coast(V); city(V, 2.35, 48.86, 'PARIS'); city(V, 2.37, 51.03, 'DUNKIRK', 1, { dy: -30 });
      for (let i = 0; i < 14; i++) { const [x, y] = P(V, 5.0 + (i % 5) * 0.55, 49.7 + Math.floor(i / 5) * 0.35); g.fillStyle = '#3E7A3A'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y - 40); g.lineTo(x - 24, y + 10); g.lineTo(x + 24, y + 10); g.closePath(); g.fill(); g.stroke(); }
      S.label('ARDENNES', ...P(V, 5.9, 50.9), 40, fade(X, T.forest - 0.3), '#3E7A3A', { stroke: '#FFF' }); arw(P(V, 7.0, 50.2), P(V, 1.7, 50.2), fade(X, T.forest, 2.0), RED, 30, -0.15);
      S.label('MAY 1940', 960, 120, 64, 1, INK, { stroke: '#FFF' }); }],
    // 37 · túi Dunkirk: vòng đỏ khép quanh bờ biển, lính Anh / Pháp (folk) bé xíu ép sát biển · tiếng: vòng siết
    [ST(L.two), (t, X) => { const V = ev(VD); coast(V); const [x, y] = P(V, 2.37, 51.03); g.save(); g.strokeStyle = RED; g.lineWidth = 18; g.setLineDash([40, 20]); g.beginPath(); g.arc(x + 150, y, 420 - 160 * ease(clamp(t / 4)), -Math.PI * 0.05, Math.PI * 1.05); g.stroke(); g.restore();
      for (let i = 0; i < 16; i++) folk(x - 10 + (i % 8) * 44, y + 110 + Math.floor(i / 8) * 62, 62, { coat: i % 3 ? 'soldier' : 'austro', wear: 'helmet' }); city(V, 2.37, 51.03, 'DUNKIRK', fade(X, T.dunkirk - 0.3), { dy: -36 }); }],
    // 38 · xe tăng Đức áp sát "~15 MILES" + nhãn "BRITAIN'S WHOLE ARMY" · tiếng: xích xe
    [ST(L.fifteen), (t, X) => { const V = ev(VD); coast(V); const [x, y] = P(V, 2.37, 51.03); city(V, 2.37, 51.03, 'DUNKIRK', 1, { dy: -36 }); for (let i = 0; i < 16; i++) folk(x - 10 + (i % 8) * 44, y + 110 + Math.floor(i / 8) * 62, 62, { coat: i % 3 ? 'soldier' : 'austro', wear: 'helmet', eyes: 'shock' });
      for (let i = 0; i < 4; i++) tank(x - 180 - i * 115 + ease(clamp(t / 3)) * 50, y + 410 + (i % 2) * 55, 0.7, { cross: true });
      g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.setLineDash([16, 12]); g.beginPath(); g.moveTo(x - 20, y + 190); g.lineTo(x - 90, y + 365); g.stroke(); g.restore(); S.label('~15 MILES', x - 90, y + 270, 44, 1, RED, { stroke: '#FFF', align: 'right' }); }],
    // 39 · "And then the tanks stopped." — biển STOP đỏ đóng xuống, xe tăng khựng · tiếng: phanh rít + im
    [ST(L.stop), (t, X) => { bg('#E9DFC6'); for (let i = 0; i < 4; i++) tank(560 + i * 260, 760, 1.1, { flip: true, cross: true }); const k = back0(t / 0.3); g.save(); g.translate(960, 400); g.scale(k, k);
      g.fillStyle = RED; g.strokeStyle = INK; g.lineWidth = 12; g.beginPath(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; g.lineTo(Math.cos(a) * 200, Math.sin(a) * 200); } g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#FFF'; g.font = '900 120px Archivo'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('STOP', 0, 8); g.restore(); }],
    // 40 · tướng (Rundstedt — folk sĩ quan) đề xuất, Hitler đóng dấu APPROVED; người dẫn (tuỳ tùng) bóng thoại "Mein Führer… are we sure?" (gag lần 1) · tiếng: dấu
    [ST(L.order), (t, X) => { bg('#C9C2B0'); g.fillStyle = '#6E4A2E'; g.fillRect(0, 820, W, 260); doc(960, 700, 520, 300, 'HALT ORDER', { size: 46, lines: 4 }); famous(330, 1060, 600, 'paulus', { eyes: 'dot' });
      famous(1330, 1060, 640, 'hitler', { eyes: 'dot' }); S.stamp('APPROVED', 960, 720, 54, (X - T.approved) / 0.4); aide(1730, 1060, 440, { mood: 'sus', mouth: 'wavy' });
      say('Mein Führer… are we sure?', 1500, 330, 1730, 610, fade(X, T.approved + 0.8, 0.3), 34); }],
    // 41 · Göring (famous) cười vênh, bóng thoại "My planes can do it alone!", máy bay nhỏ bay vòng quanh · tiếng: máy bay
    [ST(L.goring), (t, X) => { bg('#BFD8EA'); famous(820, 1060, 760, 'goring'); for (let i = 0; i < 3; i++) plane(1500 + Math.cos(t * 1.5 + i * 2.1) * 240, 560 + Math.sin(t * 1.5 + i * 2.1) * 120, 0.7);
      say('My planes can do it alone!', 960, 130, 860, 280, fade(X, T.alone - 0.8, 0.3), 40); S.label('HERMANN GÖRING', 1480, 960, 58, fade(X, ST(L.goring) + 0.3), INK, { stroke: '#FFF' }); }],
    // 42 · trái: xe tăng ngủ zZ + lịch lật 1-2-3 ngày · đúng "work": phải sáng lên — tàu Anh nối đuôi qua eo biển · tiếng: ngáy → còi tàu
    [ST(L.days), (t, X) => { bg('#E9DFC6'); g.fillStyle = '#9DBCD2'; g.fillRect(960, 0, 960, H); for (let i = 0; i < 3; i++) tank(240 + i * 240, 760, 0.9, { flip: true, cross: true, zz: t + i });
      big(`DAY ${1 + Math.min(2, Math.floor(t * 0.7))}`, 480, 260, 100, '#FFFFFF'); if (X > T.work - 0.4) for (let i = 0; i < 5; i++) { const u = (t * 0.25 + i / 5) % 1; g.save(); g.translate(1000 + u * 900, 420 + (i % 3) * 180); g.fillStyle = '#5E6470'; g.strokeStyle = INK; g.lineWidth = 6;
        g.beginPath(); g.moveTo(-90, 0); g.lineTo(90, 0); g.lineTo(70, 40); g.lineTo(-70, 40); g.closePath(); g.fill(); g.stroke(); g.fillRect(-20, -40, 40, 40); g.strokeRect(-20, -40, 40, 40); g.restore(); } }],
    // 43 · ẢNH THẬT bãi Dunkirk (PD) → ẢNH THẬT tàu khu trục chở lính về Dover (IWM H1637, PD), bộ đếm 338 226 · tiếng: sóng, đám đông
    [ST(L.destroyers), (t, X) => { const late = t > 4.5; S.photoBg(late ? IM.p_dover : IM.p_dunkirk, late ? t - 4.5 : t, { zoom: 1.0 }); S.credit(late ? 'Photo: troops from Dunkirk arrive at Dover, 31 May 1940, IWM H1637 (public domain)' : 'Photo: Dunkirk, 26–29 May 1940 (public domain)');
      const n = Math.round(338226 * ease(clamp((t - 2) / 6))); S.label(n.toLocaleString('en-US'), 960, 170, 110, fade(t, 1.8), '#FFFFFF', { stroke: INK }); S.nameTag('26 MAY – 4 JUNE 1940', 1); }],
    // 44 · xe tải bị bỏ lại trên bãi, nhãn "NEW TRUCKS: EASY · NEW ARMY: HARD" → thẻ Dunkirk vào khay (4) · tiếng: vút
    [ST(L.lost), (t, X) => { bg('#E8D7A8'); g.fillStyle = '#9DBCD2'; g.fillRect(0, 0, W, 380); for (let i = 0; i < 4; i++) { g.save(); g.translate(300 + i * 400, 700 + (i % 2) * 60); g.rotate((i % 2 ? 0.08 : -0.06)); g.fillStyle = '#5E6447'; g.strokeStyle = INK; g.lineWidth = 7;
      g.fillRect(-130, -90, 180, 110); g.strokeRect(-130, -90, 180, 110); g.fillRect(50, -60, 80, 80); g.strokeRect(50, -60, 80, 80); g.fillStyle = '#222'; for (const wx of [-90, 0, 90]) { g.beginPath(); g.arc(wx, 30, 26, 0, 7); g.fill(); } g.restore(); }
      S.label('NEW TRUCKS: EASY', 1250, 200, 60, fade(X, T.trucks - 1.6), INK, { stroke: '#FFF' }); S.label('NEW ARMY: HARD', 1250, 290, 60, fade(X, T.trucks - 0.6), RED, { stroke: '#FFF' }); if (X > T.trucks + 0.4) tray(4, (X - T.trucks - 0.4) / 0.7); }],

    // ── Changing targets ──
    // 45 · bản đồ Anh: máy bay Đức đánh sân bay (dấu ✱ trên các sân bay miền nam) · tiếng: máy bay + bom xa
    [ST(L.summer), (t, X) => { const V = ev(VB); coast(V); [[1.1, 51.15], [0.0, 50.9], [-1.2, 50.95], [1.3, 51.9], [-1.7, 51.7]].forEach(([lo, la], i) => { const [x, y] = P(V, lo, la); const k = clamp((t - 1 - i * 0.6) / 0.4);
      if (k > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 8; for (let j = 0; j < 4; j++) { const a = j * Math.PI / 4; g.beginPath(); g.moveTo(x - Math.cos(a) * 30 * k, y - Math.sin(a) * 30 * k); g.lineTo(x + Math.cos(a) * 30 * k, y + Math.sin(a) * 30 * k); g.stroke(); } g.restore(); } });
      city(V, -0.13, 51.5, 'LONDON', 1, { dy: -32 }); const lp0 = P(V, 0.5, 51.3); for (let i = 0; i < 4; i++) plane(1500 - t * 120 + i * 90, lp0[1] - 60 + i * 50, 0.5, { flip: true }); S.label('AIRFIELDS', P(V, 0.2, 50.0)[0], P(V, 0.2, 50.0)[1], 54, fade(X, ST(L.summer) + 3), RED, { stroke: '#FFF' }); }],
    // 46 · phi công Anh (folk, mũ bay) mệt rã, mồ hôi, đồng hồ cát · tiếng: thở dài
    [ST(L.hurting), (t, X) => { bg('#C9D6E2'); for (let i = 0; i < 3; i++) { const f = folk(560 + i * 400, 1020, 480, { coat: 'police', eyes: 'bored', sweat: true }); g.save(); g.fillStyle = '#6E4A2E'; g.strokeStyle = INK; g.lineWidth = 5;
      g.beginPath(); g.arc(f.head[0], f.head[1] - f.r * 0.1, f.r * 1.02, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.restore(); } S.label('BRITISH PILOTS', 960, 90, 54, 1, INK, { stroke: '#FFF' }); S.label('BADLY STRETCHED', 960, 170, 70, fade(X, ST(L.hurting) + 2.6), INK, { stroke: '#FFF' }); }],
    // 47 · bản đồ: chấm bom lạc London (khoanh "accident?") → mũi tên Anh → Berlin · tiếng: bom → máy bay
    [ST(L.night), (t, X) => { const V = ev({ cx: 6, cy: 52, zoom: 2.0 }); coast(V, { sea: '#38506A', land: '#7C7A70' }); city(V, -0.13, 51.5, 'LONDON', 1, { dx: -95, dy: 12 }); city(V, 13.4, 52.52, 'BERLIN');
      if (X > T.london - 0.3) { const [x, y] = P(V, -0.13, 51.5); S.flash(x, y, (X - T.london) / 0.4, 120); arw(P(V, 5, 49.8), P(V, 0.3, 51.2), (X - T.london + 0.3) / 0.4, RED, 20, 0.06); const qq = P(V, 3.2, 49.4); S.label('ACCIDENT?', qq[0], qq[1], 44, 1, '#FFE04A', { stroke: INK }); }
      arw(P(V, 0.5, 51.6), P(V, 12.8, 52.5), fade(X, T.berlin - 0.8, 1.0), '#4A8FE0', 22, -0.12); }],
    // 48 · Hitler giận (mày xếch + gân đỏ), tay đập bàn; trên bản đồ nhỏ mũi tên đổi từ sân bay sang London · tiếng: đập bàn
    [ST(L.furious), (t, X) => { bg('#2A2C33'); famous(520, 1060, 760, 'hitler', { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] }); big('!!!', 170, 300, 110, RED);
      g.save(); g.beginPath(); g.rect(1340 - 528, 540 - 297, 1056, 594); g.clip(); g.translate(1340, 540); g.scale(0.55, 0.55); g.translate(-960, -540); const V = ev(VB); coast(V); city(V, -0.13, 51.5, 'LONDON', 1, { size: 50, dy: -44 }); g.restore();
      const sw = X > T.london2 - 0.3, lp = P(ev(VB), -0.13, 51.5), li = [1340 + (lp[0] - 960) * 0.55, 540 + (lp[1] - 540) * 0.55]; const mp = (lo, la) => { const q = P(ev(VB), lo, la); return [1340 + (q[0] - 960) * 0.55, 540 + (q[1] - 540) * 0.55]; }; arw(mp(4.5, 49.9), sw ? [li[0] + 26, li[1] + 6] : mp(-0.7, 50.95), 1, RED, 20, 0.12); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(1340 - 528, 540 - 297, 1056, 594); }],
    // 49 · NGHIÊM: ẢNH THẬT St Paul's trong khói Blitz (PD), khử màu, nhãn "THE BLITZ" · không đùa · tiếng: còi báo động xa
    [ST(L.horror), (t, X) => { S.photoBg(IM.p_blitz, t, { zoom: 1.0, fy: 0.4 }); S.credit('Photo: "St Paul\'s Survives", London, 29 Dec 1940, Herbert Mason (public domain)'); S.nameTag('THE BLITZ · LONDON', fade(X, ST(L.horror) + 0.4)); }],
    // 50 · sân bay sửa xong: người sửa (folk thợ) gõ búa, máy bay Spitfire xếp hàng, phi công ngồi nghỉ uống trà · tiếng: búa → ấm trà
    [ST(L.gave), (t, X) => { bg('#BFD8EA'); g.fillStyle = '#7FA05A'; g.fillRect(0, 720, W, 360); for (let i = 0; i < 3; i++) plane(300 + i * 340, 690, 0.8, { col: '#7C8A5E', flip: true });
      folk(1350, 1000, 300, { coat: 'worker', arm: t % 0.6 < 0.3 ? 'up' : null, eyes: 'happy' }); folk(1650, 1000, 300, { coat: 'police', eyes: 'happy', mouth: 'grin' }); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(1725, 860); g.lineTo(1732, 915); g.lineTo(1768, 915); g.lineTo(1775, 860); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(1780, 885, 16, -1.2, 1.2); g.stroke(); S.label('AIRFIELDS REPAIRED', 960, 160, 70, fade(t, 1.0), INK, { stroke: '#FFF' }); }],
    // 51 · dấu "INVASION: POSTPONED" lên kế hoạch Sea Lion; Hitler mếu → đúng "happened": thẻ Blitz vào khay (5) · tiếng: dấu + vút
    [ST(L.middle), (t, X) => { bg('#E8E2D2'); doc(820, 520, 760, 620, 'OPERATION SEA LION', { size: 50, lines: 9 }); famous(1550, 1060, 620, 'hitler', { eyes: 'sad', mouth: 'frown' });
      S.stamp('POSTPONED', 820, 560, 100, (X - T.postponed) / 0.4); if (X > T.happened) tray(5, (X - T.happened) / 0.7); }],
  ];
};
const back0 = k => S.back(k);
