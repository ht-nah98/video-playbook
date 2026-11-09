// a3 — Kicking the door (379–439 s) + The serious part (441–478 s).
// Barbarossa: Hitler bé tí cạnh bản đồ Liên Xô khổng lồ → ẢNH THẬT bản đồ West Point (PD) "22 JUNE 1941 · 3,000,000+" → MEME vẽ lại khuôn
// "expectation": Hitler đạp cánh cửa nhỏ ("reportedly") → mũi tên bao vây → người dẫn = lính co ro tuyết, áo mỏng, khóc hai dòng → bùn + đường
// tiếp tế kéo dài → "~20 MILES FROM MOSCOW" nhiệt kế → lính Liên Xô mũ lông lao ra từ phía đông → MEME "reality": cánh cửa gắn vào toà nhà
// khổng lồ → thẻ bản đồ Barbarossa vào khay.
// ĐOẠN NGHIÊM: nền đen, chữ trắng thẳng, ẢNH THẬT trẻ em sống sót Auschwitz (PD) khử màu, không người dẫn, không meme, không tiếng hài.
import * as S from '../../_kit/stage.js';
import { famous } from '../../_kit/famous.js';
import { folk } from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { eastLand, fritz, bg, big, say, aide, coast, ev, P, city, arw, tank, snow, tray, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { beat: "So Hitler couldn't beat Britain", june: 'On June twenty-second', kick: 'Hitler reportedly said', first: 'And at first, it looked', plan: 'But the plan assumed', roads: 'The roads turned to mud',
    dec: 'By early December', counter: 'And then the Soviet counterattack', door: 'The door, it turned out',
    before: 'Before we go any further', behind: 'Behind the front lines', shot: 'They were shot beside', millions: 'Millions of others were murdered', nothing: 'There is nothing funny', jokes: 'The jokes are about one thing' };
  const T = { biggest: wd(L.beat, 'biggest'), three: wd(L.june, 'three'), door: wd(L.kick, 'door'), crashing: wd(L.kick, 'crashing'), surrounded: wd(L.first, 'surrounded'), clothes: wd(L.plan, 'clothes'),
    mud: wd(L.roads, 'mud'), moscow: wd(L.dec, 'moscow'), east: wd(L.counter, 'east'), house: wd(L.door, 'house'), six: wd(L.behind, 'six') };
  const ushanka = (f, col = '#6B5440') => { const [hx, hy] = f.head, r = f.r; g.save(); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.arc(hx, hy - r * 0.1, r * 1.05, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    for (const s of [-1, 1]) { g.beginPath(); g.ellipse(hx + s * r * 0.95, hy + r * 0.2, r * 0.25, r * 0.45, 0, 0, 7); g.fill(); g.stroke(); } g.fillStyle = RED; g.beginPath(); g.arc(hx, hy - r * 0.65, r * 0.12, 0, 7); g.fill(); g.restore(); };
  const sov = (x, y, h, o = {}) => { const f = folk(x, y, h, { coat: 'soldier', eyes: o.eyes ?? 'angry', mouth: o.mouth, arm: o.arm }); ushanka(f); return f; };
  const quote = (lines, k) => lines.forEach((l, i) => S.label(l, 960, 440 + i * 90, 58, clamp(k * 3 - i * 0.6), '#F4F1E8', { free: true }));
  return [
    // 52 · bản đồ: Liên Xô khổng lồ (vùng đông tô đỏ nhạt) cạnh Hitler bé tí · tiếng: "ừm" trầm
    [ST(L.beat), (t, X) => { const V = ev({ cx: 38, cy: 54, zoom: 0.9 }); coast(V); g.save(); V.apply(g); g.fillStyle = '#E3A59B'; g.fill(K.M.path['USSR']); eastLand(42); g.fill(); g.restore();
      S.label('SOVIET UNION', ...P(V, 45, 58), 80, fade(X, T.biggest - 0.2), RED, { stroke: '#FFF' }); const de = P(V, 11, 51); famous(de[0], de[1] + 60, 300, 'hitler', { eyes: 'happy', mouth: 'grin', arms: ['down', 'orate'] }); }],
    // 53 · ẢNH THẬT bản đồ Barbarossa (West Point, PD) + nhãn ngày + "3,000,000+" · tiếng: pháo dồn dập
    [ST(L.june), (t, X) => { const m0 = T.three + 2.2; if (X < m0) { const V = ev({ cx: 30, cy: 53, zoom: 1.5 }); coast(V); city(V, 37.6, 55.75, 'MOSCOW', 1, { dy: -32 }); city(V, 30.5, 50.45, 'KYIV', 1, { dy: -32 }); city(V, 30.3, 59.9, 'LENINGRAD', 1, { dy: 46 });
        [[[21.5, 55.5], [29.3, 59.0]], [[21.5, 52.8], [36.2, 55.2]], [[22.5, 50.2], [29.5, 50.3]]].forEach(([a, b], i) => arw(P(V, ...a), P(V, ...b), fade(X, ST(L.june) + 0.8 + i * 0.5, 1.8), RED, 26, 0.04)); S.label('22 JUNE 1941', 960, 90, 72, 1, INK, { stroke: '#FFF' }); S.label('3,000,000+ SOLDIERS', 960, 980, 80, fade(X, T.three - 0.2), '#FFFFFF', { stroke: INK }); return; }
      S.photoBg(IM.p_barbmap, X - m0, { zoom: 1.0, fy: 0.45 }); S.credit('Map: the German advance, Aug–Dec 1941, US Military Academy West Point (public domain)'); S.nameTag('HOW FAR THEY GOT · 1941', 1); }],
    // 54 · MEME vẽ lại khuôn "EXPECTATION": Hitler đạp cánh cửa gỗ nhỏ, nhãn REPORTEDLY · đúng "crashing": cánh cửa đổ · tiếng: rầm
    [ST(L.kick), (t, X) => { bg('#E8E2D2'); S.label('EXPECTATION', 960, 110, 70, 1, INK); const fall = ease(clamp((X - T.crashing) / 0.4)); g.save(); g.translate(1010, 980); g.rotate(fall * 1.3); g.fillStyle = '#8A5A34'; g.strokeStyle = INK; g.lineWidth = 9;
      g.fillRect(0, -420, 220, 420); g.strokeRect(0, -420, 220, 420); g.fillStyle = '#D8B84A'; g.beginPath(); g.arc(180, -210, 14, 0, 7); g.fill(); g.restore(); famous(780, 1060, 600, 'hitler', { eyes: 'angry', mouth: 'grin', arms: ['down', 'orate'] });
      S.stamp('"REPORTEDLY"', 520, 300, 46, fade(X, T.door - 0.3)); }],
    // 55 · bản đồ: mũi tên Đức lao sâu, các vòng khép quanh quân Liên Xô (vòng đỏ) · tiếng: vòng siết
    [ST(L.first), (t, X) => { const V = ev({ cx: 30, cy: 53, zoom: 1.5 }); coast(V); city(V, 37.6, 55.75, 'MOSCOW', 1, { dy: -32 }); city(V, 30.5, 50.45, 'KYIV', 1, { dy: -32 });
      arw(P(V, 21, 53), P(V, 33, 55.5), fade(X, ST(L.first) + 0.3, 1.2), RED, 24, -0.1); arw(P(V, 22, 50), P(V, 28.6, 50.2), fade(X, ST(L.first) + 0.8, 1.2), RED, 24, 0.1);
      [[27.5, 53.9], [30.5, 50.45]].forEach(([lo, la], i) => { const [x, y] = P(V, lo, la); const k = fade(X, T.surrounded - 0.4 + i * 0.4, 0.5); if (k > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 12; g.setLineDash([24, 14]); g.beginPath(); g.arc(x, y, 92 * (1.4 - 0.4 * k), 0, 7); g.stroke(); g.restore(); } }); }],
    // 56 · người dẫn = lính Đức co ro trong tuyết, áo mỏng, KHÓC HAI DÒNG (meme sob) + mũ sắt; tuyết rơi · tiếng: gió lạnh
    [ST(L.plan), (t, X) => { bg('#C9D6E2'); g.fillStyle = '#F4F6F8'; g.fillRect(0, 820, W, 260); aide(960, 1050, 720, { outfit: 'wehr', mood: X > T.clothes ? 'sob' : 'sad', mouth: X > T.clothes ? 'wail' : 'wavy', arms: 'cover' });
      snow(t, 90); S.label('SUMMER UNIFORM', 960, 140, 60, fade(X, T.clothes - 0.2), INK, { stroke: '#FFF' }); }],
    // 57 · xe tải lún bùn + vạch đường tiếp tế kéo dài vô tận · tiếng: bánh xe lún bùn
    [ST(L.roads), (t, X) => { bg('#B9A27A'); g.fillStyle = '#6E5236'; g.fillRect(0, 700, W, 380); for (let i = 0; i < 9; i++) { g.fillStyle = '#5A4128'; g.beginPath(); g.ellipse(200 + i * 200, 820 + (i % 2) * 90, 90, 22, 0, 0, 7); g.fill(); }
      g.save(); g.translate(560, 700); g.rotate(0.06); g.fillStyle = '#5E6447'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-180, -150, 260, 160); g.strokeRect(-180, -150, 260, 160); g.fillRect(80, -100, 110, 110); g.strokeRect(80, -100, 110, 110); g.restore();
      g.save(); g.strokeStyle = RED; g.lineWidth = 12; g.setLineDash([30, 16]); g.beginPath(); g.moveTo(770, 640); g.lineTo(770 + ease(clamp((X - T.mud) / 3)) * 1150, 640); g.stroke(); g.restore(); S.label('SUPPLY LINE: HUNDREDS OF MILES', 1200, 300, 54, fade(X, T.mud + 1), RED, { stroke: '#FFF' }); }],
    // 58 · bản đồ tuyết: chấm Moscow, vòng "~20 MILES", nhiệt kế âm sâu · tiếng: gió
    [ST(L.dec), (t, X) => { const V = ev({ cx: 36.5, cy: 55.6, zoom: 6 }); coast(V, { land: '#F2F4F6' }); city(V, 37.6, 55.75, 'MOSCOW', 1, { size: 50 }); const [x, y] = P(V, 37.6, 55.75); g.save(); g.strokeStyle = RED; g.lineWidth = 10; g.setLineDash([20, 12]); g.beginPath(); g.arc(x, y, 230, 0, 7); g.stroke(); g.restore();
      for (let i = 0; i < 5; i++) tank(x - 520 - i * 70, y + 160 + (i % 2) * 80, 0.8, { cross: true }); snow(t, 70); S.label('~20 MILES', x - 400, y - 40, 60, fade(X, T.moscow - 0.2), RED, { stroke: '#FFF' });
      g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.roundRect(1620, 300, 70, 480, 35); g.fill(); g.stroke(); g.fillStyle = '#4A8FE0'; g.fillRect(1640, 640, 30, 120); g.beginPath(); g.arc(1655, 780, 40, 0, 7); g.fill(); g.stroke(); big('FREEZING', 1600, 230, 62, '#4A8FE0'); }],
    // 59 · lính Liên Xô mũ lông lao ra từ phải (phía đông) trên tuyết · tiếng: hô "Ura!" + bước chân
    [ST(L.counter), (t, X) => { bg('#DDE6EE'); g.fillStyle = '#F4F6F8'; g.fillRect(0, 760, W, 320); const adv = ease(clamp((X - T.east + 0.6) / 2.5)); for (let i = 0; i < 9; i++) sov(2000 - adv * 900 + (i % 5) * 160, 1000 - Math.floor(i / 5) * 90, 340 - Math.floor(i / 5) * 60, { mouth: 'o', arm: 'up' });
      for (let i = 0; i < 4; i++) fritz(260 + i * 140, 1000, 300, { eyes: 'shock', mouth: 'o' }); snow(t, 60); }],
    // 60 · MEME vẽ lại khuôn "REALITY": camera lùi — cánh cửa nhỏ gắn vào toà nhà khổng lồ, Hitler bé xíu → thẻ bản đồ Barbarossa vào khay (6) · tiếng: tiếng vọng
    [ST(L.door), (t, X) => { bg('#BFD8EA'); const z = lerp(2.6, 1, ease(clamp(t / 1.6))); g.save(); g.translate(960, 980); g.scale(z, z); g.translate(-960, -980);
      g.fillStyle = '#C9B89A'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(260, 120, 1400, 860); g.strokeRect(260, 120, 1400, 860); for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { g.fillStyle = '#7FA6C2'; g.fillRect(320 + c * 150, 170 + r * 150, 80, 100); g.strokeRect(320 + c * 150, 170 + r * 150, 80, 100); }
      g.fillStyle = '#8A5A34'; g.fillRect(900, 880, 70, 100); g.strokeRect(900, 880, 70, 100); famous(840, 985, 130, 'hitler', { eyes: 'shock', mouth: 'o' }); g.restore(); S.label('REALITY', 1400, 70, 70, fade(t, 1.4), INK, { stroke: '#FFF' });
      if (X > T.house + 0.3) tray(6, (X - T.house - 0.3) / 0.7); }],

    // ── The serious part (không đùa) ──
    // 61 · nền đen, chữ trắng · tiếng: lặng, nhạc tắt
    [ST(L.before), (t, X) => { bg('#0E0E10'); S.label('WHAT THIS WAR WAS FOR', 960, 540, 64, fade(t, 0.6, 0.8), '#E8E2D2', { free: true }); }],
    // 62 · ẢNH THẬT trẻ em sống sót Auschwitz (PD), khử màu, đẩy chậm · "~6,000,000" · tiếng: lặng
    [ST(L.behind), (t, X) => { S.photoBg(IM.p_survivors, t, { zoom: 1.0, push: 0.006 }); S.desat(1); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 0, W, H);
      S.credit('Photo: child survivors of Auschwitz, January 1945 (public domain)'); S.label('ABOUT 6,000,000 JEWS MURDERED', 960, 980, 54, fade(X, T.six, 0.6), '#F4F1E8', { stroke: '#111' }); }],
    // 63 · cùng ảnh, đẩy chậm tiếp; ba dòng chữ thẳng · tiếng: lặng
    [ST(L.shot), (t, X) => { S.photoBg(IM.p_survivors, t + 8, { zoom: 1.0, push: 0.006 }); S.desat(1); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(0, 0, W, H); S.credit('Photo: child survivors of Auschwitz, January 1945 (public domain)');
      ['SHOT BESIDE PITS', 'STARVED IN GHETTOS', 'KILLED IN DEATH CAMPS'].forEach((l, i) => S.label(l, 960, 800 + i * 84, 56, clamp((t - 0.4 - i * 1.4) / 0.5), '#F4F1E8', { stroke: '#111' })); }],
    // 64 · nền đen: danh sách nạn nhân khác, chữ thẳng · tiếng: lặng
    [ST(L.millions), (t, X) => { bg('#0E0E10'); ['SOVIET PRISONERS OF WAR', 'POLISH CIVILIANS', 'ROMA', 'DISABLED PEOPLE'].forEach((l, i) => S.label(l, 960, 330 + i * 120, 58, clamp((t - 0.8 - i * 0.9) / 0.5), '#C9C2B0', { free: true })); }],
    // 65 · nền đen trống, một dòng chữ · tiếng: lặng
    [ST(L.nothing), (t, X) => { bg('#0E0E10'); S.label('NOTHING FUNNY ABOUT ANY OF IT.', 960, 540, 60, fade(t, 0.5, 0.6), '#E8E2D2', { free: true }); }],
    // 66 · chuyển về: đèn bàn bản đồ bật lên, Hitler đứng sau bàn (chưa cười) — "chỉ cười vào quyết định của ông ta" · tiếng: công tắc đèn
    [ST(L.jokes), (t, X) => { bg('#1C1D22'); const k = fade(t, 2.0, 1.2); g.save(); g.globalAlpha = k; g.fillStyle = 'rgba(255,230,160,0.18)'; g.beginPath(); g.moveTo(760, 0); g.lineTo(1160, 0); g.lineTo(1500, 1080); g.lineTo(420, 1080); g.closePath(); g.fill();
      famous(960, 1060, 760, 'hitler', { eyes: 'dot' }); g.restore(); S.label('HIS DECISIONS.', 960, 160, 70, fade(t, 3.6, 0.5), '#FFE04A', { stroke: INK }); }],
  ];
};
