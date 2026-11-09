// a1 — The beer hall (127–205 s) + Not elected (207–251 s).
// Quán bia: Hitler (áo khoác + băng tay, PUTSCH) gào trước đám đông → đảng nhỏ phình ra → ẢNH THẬT cổng Bürgerbräukeller + phát súng lên trần
// → bản đồ Munich → Berlin ("như Mussolini") → ba quan chức giơ ngón cái rồi chúi xuống → đoàn diễu gặp hàng cảnh sát → số người chết (nghiêm,
// khử màu) → phiên toà + báo in mọi lời → phòng giam tiện nghi viết sách → thẻ cổng quán bia vào khay.
// Không được bầu: gõ cửa "GOVERNMENT" lịch sự → cột phiếu 1928–1932 → vạch 50% "NEVER A MAJORITY" → Hindenburg 53 / Hitler 36.8 →
// chính khách giật dây con rối → ẢNH THẬT bắt tay Hindenburg (Potsdam, 3/1933) → dây đứt "ENABLING ACT" → thẻ vào khay.
import * as S from '../../_kit/stage.js';
import { famous } from '../../_kit/famous.js';
import { folk, crowd } from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { bg, big, say, aide, coast, ev, P, city, arw, doc, bar, tray, fade, PUTSCH } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { ww1: 'After fighting in the First World War', took: 'He took over a small, angry party', nov8: 'So on the evening of November eighth', plan: 'His plan was to force three',
    three: 'The three men agreed', morning: 'The next morning, about two thousand', killed: 'About sixteen of his men', trial: 'At his trial he gave', served: 'He served about nine months',
    first: 'So his first attempt', lesson: 'He learned one lesson', politics: 'So for the next ten years', fact: "But here's a fact", y32: 'In nineteen thirty-two he ran',
    group: 'Then a group of conservative', plan2: 'That was the plan, in January', within: 'Within two months he had passed' };
  const T = { shouting: wd(L.ww1, 'shouting'), pistol: wd(L.nov8, 'pistol'), mussolini: wd(L.plan, 'mussolini'), took: wd(L.three, 'took'), police: wd(L.morning, 'police'),
    arrested: wd(L.killed, 'arrested'), five: wd(L.trial, 'five'), kampf: wd(L.served, 'kampf'), famous: wd(L.first, 'famous'), lost: wd(L.y32, 'lost'), control: wd(L.group, 'control'),
    law: wd(L.within, 'law'), nobody: wd(L.within, 'nobody'), majority: wd(L.fact, 'majority') };
  const H1 = (x, y, h, o = {}) => famous(x, y, h, 'hitler', { ...PUTSCH, ...o });
  const pol = (x, y, h, o = {}) => { const f = folk(x, y, h, { coat: 'suit', eyes: o.eyes ?? 'dot', arm: o.arm, mouth: o.mouth }); g.save(); g.fillStyle = '#16161A'; g.strokeStyle = INK; g.lineWidth = 4;
    const [hx, hy] = f.head, r = f.r; g.fillRect(hx - r * 0.6, hy - r * 1.7, r * 1.2, r * 1.05); g.beginPath(); g.ellipse(hx, hy - r * 0.66, r * 1.0, r * 0.15, 0, 0, 7); g.fill(); g.restore(); return f; };
  return [
    // 18 · Munich sau WW1: Hitler gào trước đám đông nhỏ (miệng há, tay vung) · tiếng: tiếng ồn quán bia
    [ST(L.ww1), (t, X) => { bg('#E2D4B4'); crowd(80, 1100, 1040, 300, t, { rows: 2, seed: 4, wears: ['bowler', 'cap', null, 'cap', 'bowler', null] }); famous(1450, 1060, 720, 'hitler', { coat: '#6B6A58', pants: '#3A3630', det: ['lapel', 'tie', 'buttons'], eyes: 'angry', mouth: X > T.shouting ? 'o' : null, arms: ['down', 'orate'] });
      S.label('MUNICH · 1919', 520, 130, 80, fade(X, ST(L.ww1) + 0.3), INK, { stroke: '#FFF' }); if (X > T.shouting) big('!!!', 1700, 300, 120, RED, { k: (X - T.shouting) / 0.3 }); }],
    // 19 · đảng nhỏ phình to: đám đông dày dần, nhãn năm 1923 · tiếng: đám đông lớn dần
    [ST(L.took), (t, X) => { bg('#E2D4B4'); crowd(60, 1250, 1040, 300, t, { rows: 2 + Math.min(2, Math.floor(t * 0.6)), seed: 9, wears: ['bowler', 'cap', null, 'cap', 'bowler', null] }); H1(1500, 1060, 640, { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] });
      S.label(t > 3 ? '1923' : '1920', 300, 110, 90, 1, INK, { stroke: '#FFF' }); }],
    // 20 · ẢNH THẬT cổng Bürgerbräukeller (PD) → đúng "pistol": cảnh trong quán, Hitler bắn lên trần (chớp sáng, bụi rơi) · tiếng: súng
    [ST(L.nov8), (t, X) => { if (X < T.pistol - 0.4) { S.photoBg(IM.p_beerhall, t, { zoom: 1.0 }); S.credit('Photo: the Bürgerbräukeller, Munich, November 1933 (public domain)'); S.nameTag('THE BEER HALL · MUNICH', fade(X, ST(L.nov8) + 0.3)); return; }
      bg('#6E4A2E'); g.fillStyle = '#4A321E'; g.fillRect(0, 0, W, 180); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 180); g.lineTo(W, 180); g.stroke();
      H1(960, 900, 620, { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] }); crowd(40, 1880, 1060, 250, t, { rows: 1, seed: 2, wears: ['bowler', 'cap', null, 'cap', 'bowler', null] }); const u = X - T.pistol, gx = 1219, gy = 473;
      g.save(); g.translate(gx, gy); g.rotate(-Math.PI / 2 + 0.25); g.fillStyle = '#1C1C1F'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(0, -10, 80, 20); g.fillRect(0, 0, 22, 44); g.restore();
      S.flash(gx + 22, gy - 90, u / 0.25, 180); if (u > 0) big('BANG!', 1420, 300, 110, '#FFE04A', { k: u / 0.2 }); for (let i = 0; i < 12; i++) { const k = u - i * 0.04; if (k > 0 && k < 1.6) { g.fillStyle = '#C9B89A'; g.fillRect(1000 + hash(i) * 200, 190 + k * 500, 10, 10); } } }],
    // 21 · bản đồ (chỉ bờ biển) Munich → Berlin mũi tên + nhãn nhỏ "like Mussolini → Rome 1922" · tiếng: bút dạ
    [ST(L.plan), (t, X) => { const V = ev({ cx: 12, cy: 48.5, zoom: 1.7 }); coast(V); city(V, 11.58, 48.14, 'MUNICH', 1); city(V, 13.4, 52.52, 'BERLIN', 1, { dy: -30 }); city(V, 12.5, 41.9, 'ROME', fade(X, T.mussolini - 0.3));
      arw(P(V, 11.58, 48.14), (([x, y]) => [x + 6, y + 26])(P(V, 13.4, 52.52)), fade(X, ST(L.plan) + 2.2, 1.2), RED, 22); arw(P(V, 11.4, 44.4), (([x, y]) => [x, y - 22])(P(V, 12.5, 41.9)), fade(X, T.mussolini, 0.8), '#6A6460', 16, 0.08);
      S.label('MUSSOLINI, 1922', P(V, 12.5, 41.9)[0] - 280, P(V, 12.5, 41.9)[1] - 40, 40, fade(X, T.mussolini + 0.4), INK, { stroke: '#FFF' }); }],
    // 22 · ba quan chức Bavaria giơ ngón cái → đúng "took": tay chúi xuống, nhãn "…NOPE" · tiếng: boing
    [ST(L.three), (t, X) => { bg('#D9CBB0'); const no = X > T.took; [520, 960, 1400].forEach((x, i) => pol(x, 1020, 560, { arm: no ? null : 'up', eyes: no ? 'bored' : 'happy' })); if (no) big('…NOPE', 960, 180, 120, RED, { k: (X - T.took) / 0.3 }); }],
    // 23 · đoàn diễu ~2 000 người từ trái, hàng cảnh sát phải chặn · đúng "police": khựng lại · tiếng: bước chân đồng loạt → còi
    [ST(L.morning), (t, X) => { bg('#C9C2B0'); const adv = Math.min(1, t / 3.5); crowd(-200 + adv * 300, 900 + adv * 300, 1040, 260, t, { rows: 3, seed: 11, wears: ['bowler', 'cap', null, 'cap', 'bowler', null] });
      for (let i = 0; i < 6; i++) folk(1480 + i * 70, 1040 - (i % 2) * 40, 300, { coat: 'police', wear: 'police', eyes: 'angry' }); S.label('~2,000 MARCHERS', 600, 200, 60, 1, INK, { stroke: '#FFF' }); }],
    // 24 · NGHIÊM: nền tối, ba con số (khử màu, không đùa) → đúng "arrested": dấu ARRESTED · tiếng: lặng, một tiếng cộp
    [ST(L.killed), (t, X) => { bg('#1C1D22'); [['~16', 'OF HIS MEN'], ['4', 'POLICEMEN'], ['1', 'BYSTANDER']].forEach(([n, l], i) => { const k = fade(X, ST(L.killed) + 0.4 + i * 1.0, 0.4);
      S.label(n, 420 + i * 540, 470, 150, k, '#E8E2D2'); S.label(l, 420 + i * 540, 590, 40, k, '#9A958E'); }); S.stamp('ARRESTED · 11 NOV', 960, 830, 64, (X - T.arrested) / 0.4); }],
    // 25 · phiên toà: Hitler đứng diễn văn, báo bay ra in tên ông ta, thẩm phán tủm tỉm → "5 YEARS" · tiếng: búa toà
    [ST(L.trial), (t, X) => { bg('#B9A27A'); folk(1490, 720, 380, { coat: 'suit', eyes: 'happy', mouth: 'grin' }); g.fillStyle = '#6E4A2E'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(1180, 520, 620, 300); g.strokeRect(1180, 520, 620, 300); H1(560, 1060, 620, { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] });
      for (let i = 0; i < 4; i++) { const k = clamp((t - 0.6 - i * 0.5) / 0.6); if (k > 0) doc(860 + i * 90, 300 - k * 60, 220, 150, 'HITLER!', { rot: -0.2 + i * 0.12, size: 30, lines: 3, seed: i }); }
      S.stamp('5 YEARS', 1490, 930, 80, (X - T.five) / 0.4); }],
    // 26 · phòng giam "tiện nghi": ghế bành, hoa, quà, máy chữ; Hitler gõ sách → đúng "Kampf": bìa sách · tiếng: máy chữ
    [ST(L.served), (t, X) => { bg('#E8E2D2'); g.strokeStyle = INK; g.lineWidth = 10; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(1420 + i * 60, 160); g.lineTo(1420 + i * 60, 460); g.stroke(); } g.strokeRect(1390, 160, 360, 300);
      g.fillStyle = '#8E2B3A'; g.fillRect(180, 640, 300, 260); g.strokeRect(180, 640, 300, 260); g.fillStyle = '#E2577E'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(1500 + i * 50, 760, 26, 0, 7); g.fill(); g.stroke(); }
      g.fillStyle = '#F2C230'; g.fillRect(1460, 820, 160, 120); g.strokeRect(1460, 820, 160, 120); H1(900, 1060, 600, { eyes: 'happy', mouth: 'smile' });
      g.fillStyle = '#F6F0DE'; g.fillRect(860, 780, 130, 90); g.strokeRect(860, 780, 130, 90); g.fillStyle = '#3A3A40'; g.fillRect(800, 860, 250, 90); g.strokeRect(800, 860, 250, 90); g.fillStyle = '#E8E2D2'; for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) { g.beginPath(); g.arc(830 + c * 27 + r * 12, 888 + r * 30, 9, 0, 7); g.fill(); }
      S.label('LANDSBERG · ~9 MONTHS', 620, 130, 70, fade(X, ST(L.served) + 0.3), INK, { stroke: '#FFF' }); S.label('ARMCHAIR', 330, 950, 38, 1, INK, { stroke: '#FFF' }); S.label('GIFTS', 1540, 990, 38, 1, INK, { stroke: '#FFF' }); S.label('FLOWERS', 1600, 690, 38, 1, INK, { stroke: '#FFF' });
      if (X > T.kampf - 0.3) { doc(1240, 520, 280, 380, 'MEIN KAMPF', { size: 36, lines: 0, col: '#8E2B3A', rot: 0.06 }); } }],
    // 27 · tờ báo xoay tròn "FAMOUS" → thẻ ẢNH THẬT quán bia bay vào khay (thẻ 2) · tiếng: vút
    [ST(L.first), (t, X) => { bg('#2A2C33'); const r = Math.max(0, 1 - t / 1.2); g.save(); g.translate(960, 560); g.rotate(r * 12); g.scale(1 - r * 0.9, 1 - r * 0.9); doc(0, 0, 720, 520, 'HITLER: FAMOUS', { size: 60, lines: 7 }); g.restore();
      if (X > T.famous) tray(2, (X - T.famous) / 0.7); }],

    // ── Not elected ──
    // 28 · Hitler gõ cửa "GOVERNMENT" lịch sự, đội mũ phớt cầm hoa · người dẫn góc · tiếng: gõ cửa
    [ST(L.lesson), (t, X) => { bg('#D9CBB0'); g.fillStyle = '#E8E2D2'; g.strokeStyle = INK; g.lineWidth = 10; g.fillRect(900, 140, 860, 940); g.strokeRect(900, 140, 860, 940); g.fillStyle = INK; g.font = '900 64px Archivo'; g.textAlign = 'center'; g.fillText('GOVERNMENT', 1330, 250);
      g.fillStyle = '#6E4A2E'; g.fillRect(1130, 380, 400, 700); g.strokeRect(1130, 380, 400, 700); H1(700, 1060, 620, { eyes: 'happy', mouth: 'smile', arms: ['down', t % 0.8 < 0.4 ? 'orate' : 'down'] });
      S.label("DON'T STORM IT…", 500, 200, 54, fade(X, ST(L.lesson) + 1.6), RED, { stroke: '#FFF' }); S.label('GET INVITED.', 500, 290, 54, fade(X, ST(L.lesson) + 3.2), '#3E7A3A', { stroke: '#FFF' }); }],
    // 29 · cột phiếu Quốc xã: 1928 2.6% → 1930 18.3% → 7/1932 37.3% (Đại khủng hoảng) · tiếng: tick mỗi cột
    [ST(L.politics), (t, X) => { bg('#F4F1E8'); S.label('NAZI VOTE SHARE', 960, 120, 56, 1, INK); [['1928', 2.6], ['1930', 18.3], ['JUL 1932', 37.3]].forEach(([y, v], i) => bar(560 + i * 400, 900, 220, 1300, v, 100, '#8C6A3A', y, v + '%', clamp((t - 1 - i * 1.6) / 0.8)));
      S.label('GREAT DEPRESSION →', 700, 420, 44, fade(X, ST(L.politics) + 3.4), '#6A6460'); }],
    // 30 · vạch 50% đỏ, cột 37.3% không chạm → "NEVER A MAJORITY" · tiếng: chuông sai
    [ST(L.fact), (t, X) => { bg('#F4F1E8'); bar(960, 900, 300, 1300, 37.3, 100, '#8C6A3A', 'BEST FREE ELECTION', '37.3%', 1); g.save(); g.strokeStyle = RED; g.lineWidth = 10; g.setLineDash([30, 18]); g.beginPath(); g.moveTo(400, 900 - 650); g.lineTo(1520, 900 - 650); g.stroke(); g.restore();
      S.label('50% = MAJORITY', 1560, 230, 40, 1, RED); S.stamp('NEVER A MAJORITY', 800, 130, 66, (X - T.majority) / 0.4); }],
    // 31 · bầu tổng thống 1932: Hindenburg 53% (thắng) / Hitler 36.8% (thua, mếu) · tiếng: tick
    [ST(L.y32), (t, X) => { bg('#E8E2D2'); famous(520, 1060, 560, 'hindenburg'); H1(1400, 1060, 560, { eyes: X > T.lost ? 'sad' : 'dot', mouth: X > T.lost ? 'frown' : null });
      S.label('53.0%', 520, 330, 90, fade(X, T.lost - 0.4), '#3E7A3A', { stroke: '#FFF' }); S.label('36.8%', 1400, 330, 90, fade(X, T.lost - 0.4), RED, { stroke: '#FFF' }); S.label('PRESIDENTIAL ELECTION · 1932', 960, 110, 64, 1, INK, { stroke: '#FFF' }); S.label('HINDENBURG', 520, 430, 44, 1, INK, { stroke: '#FFF' }); S.label('HITLER', 1400, 430, 44, 1, INK, { stroke: '#FFF' }); }],
    // 32 · con rối: ba chính khách đội mũ chóp giật dây trên đầu Hitler · đúng "control": dây căng · tiếng: dây đàn
    [ST(L.group), (t, X) => { bg('#D9CBB0'); [560, 960, 1360].forEach((x, i) => pol(x, 420, 300, { eyes: 'happy', mouth: 'grin' })); H1(960, 1070, 560, { eyes: 'bored' });
      g.save(); g.strokeStyle = INK; g.lineWidth = 5; for (const [a, b, c] of [[560, 800, 740], [960, 960, 520], [1360, 1120, 740]]) { g.beginPath(); g.moveTo(a, 420); g.lineTo(b, c + 8 * Math.sin(t * 3)); g.stroke(); } g.restore();
      S.label('CHANCELLOR · 30 JAN 1933', 960, 1000, 54, fade(X, T.control - 0.6), '#FFFFFF', { stroke: INK }); }],
    // 33 · ẢNH THẬT bắt tay Hindenburg, Ngày Potsdam 21/3/1933 (PD) · "That was the plan." · tiếng: chụp ảnh
    [ST(L.plan2), (t, X) => { S.photoBg(IM.p_potsdam, t, { zoom: 1.0, fy: 0.3 }); S.credit('Photo: Hitler and Hindenburg, Potsdam, 21 March 1933 (public domain)'); S.nameTag('"THE PLAN"', fade(X, ST(L.plan2) + 0.3)); }],
    // 34 · dây con rối đứt từng sợi → "ENABLING ACT · MARCH 1933" → đúng "nobody": chính khách rơi khỏi khung → thẻ Potsdam vào khay · tiếng: tưng tưng
    [ST(L.within), (t, X) => { bg('#D9CBB0'); const fall = clamp((X - T.nobody) / 0.8); [560, 960, 1360].forEach((x, i) => pol(x, 420 + fall * 900, 300, { eyes: 'shock', mouth: 'o' })); H1(960, 1070, 620, { eyes: 'angry', mouth: 'grin' });
      S.stamp('ENABLING ACT · MARCH 1933', 960, 960, 60, (X - T.law) / 0.4); if (X > T.nobody + 0.8) tray(3, (X - T.nobody - 0.8) / 0.7); }],
  ];
};
