// a4 — Four days later (480–529 s) + The airlift (531–596 s).
// Tuyên chiến Mỹ: ẢNH THẬT Arizona cháy (PD, nối tập 3) → giấy hiệp ước "ONLY IF ATTACKED", Nhật là bên tấn công → "OBLIGATION: NONE" →
// Hitler trên bục diễn văn (vẽ — ảnh Reichstag 11/12/1941 là Bundesarchiv CC BY-SA, không dùng) dấu "WAR ON THE USA" → Churchill + Stalin đối mặt
// → nhà máy Mỹ tuôn xe tăng / máy bay → 3 đấu 1, người dẫn đếm ngón tay NỔ NÃO (meme boom) → thẻ Arizona vào khay.
// Stalingrad: bản đồ mũi tên xuống Caucasus + Stalingrad → ẢNH THẬT tù binh giữa đống đổ nát (dùng làm ảnh phố đổ nát) → gọng kìm khép ~300 000 →
// tướng "BREAK OUT?" Hitler "NO" → Göring hứa tiếp tế đường không → cột 750 / ~100 tấn → Paulus nhận gậy thống chế → ẢNH THẬT Paulus sau đầu hàng,
// người dẫn FACEPALM → 91 000 tù binh / ~5 000–6 000 về nhà (nghiêm) → thẻ Stalingrad vào khay.
import * as S from '../../_kit/stage.js';
import { famous } from '../../_kit/famous.js';
import { folk } from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { usFlag, fritz, bg, big, say, aide, coast, ev, P, city, arw, tank, plane, doc, bar, snow, tray, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { dec7: 'On December seventh, nineteen forty-one', treaty: 'Germany had a treaty with Japan', under: 'So Hitler was under no obligation', four: 'Four days later, he stood up',
    point: 'At this point, Germany was fighting', added: 'And now it had added', track: "If you're keeping track", s42: 'In the summer of nineteen forty-two', streets: 'Stalingrad turned into months',
    nov: 'In November, the Soviets launched', gens: 'His generals wanted to break out', air: 'He said his air force could keep', tons: 'The army needed around', starved: 'So the soldiers starved',
    surr: 'Paulus surrendered the next day.', pow: 'About ninety-one thousand' };
  const T = { attacked: wd(L.treaty, 'attacked'), attacking: wd(L.treaty, 'attacking'), declared: wd(L.four, 'declared'), snow: wd(L.point, 'snow'), tanks: wd(L.added, 'tanks'), three: wd(L.track, 'three'),
    picked: wd(L.track, 'picked'), caucasus: wd(L.s42, 'caucasus'), stalin: wd(L.s42, "stalin's"), surrounded: wd(L.nov, 'surrounded'), no: wd(L.gens, 'no'), hundred: wd(L.tons, 'hundred', 1),
    marshal: wd(L.starved, 'marshal'), ninety: wd(L.pow, 'ninety-one'), home: wd(L.pow, 'home') };
  const fact = (x, y) => { g.save(); g.fillStyle = '#8E8A80'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(x - 220, y - 200, 440, 200); g.strokeRect(x - 220, y - 200, 440, 200); for (let i = 0; i < 3; i++) { g.fillRect(x - 180 + i * 130, y - 330, 60, 130); g.strokeRect(x - 180 + i * 130, y - 330, 60, 130); }
    g.fillStyle = '#C8262C'; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(x - 220 + i * 110, y - 200); g.lineTo(x - 165 + i * 110, y - 250); g.lineTo(x - 110 + i * 110, y - 200); g.closePath(); g.fill(); g.stroke(); } g.restore(); };
  return [
    // 67 · ẢNH THẬT USS Arizona cháy (PD) · "7 DEC 1941 · PEARL HARBOR" · tiếng: nổ xa
    [ST(L.dec7), (t, X) => { S.photoBg(IM.p_arizona, t, { zoom: 1.0 }); S.credit('Photo: USS Arizona, Pearl Harbor, 7 Dec 1941 (public domain)'); S.nameTag('7 DEC 1941 · PEARL HARBOR', fade(X, ST(L.dec7) + 0.3)); }],
    // 68 · giấy hiệp ước, câu "ONLY IF JAPAN IS ATTACKED" tô vàng → đúng "attacking": mũi tên Nhật → Mỹ, nhãn "JAPAN = ATTACKER" · tiếng: bút dạ
    [ST(L.treaty), (t, X) => { bg('#E8E2D2'); doc(760, 540, 820, 700, 'TRIPARTITE PACT · 1940', { size: 48, lines: 7 }); const k = fade(X, T.attacked - 0.4, 0.6); g.fillStyle = 'rgba(255,224,74,0.6)'; g.fillRect(420, 600, 680 * k, 54);
      S.label('ONLY IF ATTACKED', 760, 646, 46, k, INK, { free: true }); if (X > T.attacking - 0.3) { S.label('JAPAN = THE ATTACKER', 1500, 420, 52, (X - T.attacking + 0.3) / 0.4, RED, { stroke: '#FFF' }); arw([1300, 560], [1720, 760], (X - T.attacking) / 0.6, RED, 22, 0.15); } }],
    // 69 · "OBLIGATION: NONE" — Hitler nhún vai giữa sân khấu trống · tiếng: dế kêu
    [ST(L.under), (t, X) => { bg('#2A2C33'); famous(960, 1060, 640, 'hitler', { eyes: 'dot' }); S.label('OBLIGATION: NONE', 960, 200, 90, fade(t, 0.4), '#FFE04A', { stroke: INK }); }],
    // 70 · bục diễn văn (vẽ), Hitler giơ tay → đúng "declared": dấu "WAR ON THE USA · 11 DEC 1941" · tiếng: vỗ tay → dấu
    [ST(L.four), (t, X) => { bg('#6E2A2A'); g.fillStyle = '#4A1C1C'; for (let i = 0; i < 6; i++) g.fillRect(i * 340, 0, 170, H); g.fillStyle = '#6E4A2E'; g.strokeStyle = INK; g.lineWidth = 10; g.fillRect(760, 760, 400, 320); g.strokeRect(760, 760, 400, 320);
      famous(960, 900, 640, 'hitler', { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] }); g.fillRect(760, 760, 400, 320); g.strokeRect(760, 760, 400, 320); S.stamp('WAR ON THE USA · 11 DEC 1941', 960, 170, 64, (X - T.declared) / 0.4); }],
    // 71 · Churchill (trái) + Stalin (phải) đối mặt Hitler (giữa, tuyết rơi trên đầu) · tiếng: gió tuyết
    [ST(L.point), (t, X) => { bg('#E8E2D2'); famous(380, 1060, 600, 'churchill', { eyes: 'angry' }); famous(1540, 1060, 600, 'stalin', { eyes: 'angry' }); famous(960, 1060, 560, 'hitler', { eyes: 'shock', mouth: 'o' });
      if (X > T.snow - 0.4) { g.save(); g.beginPath(); g.rect(700, 0, 520, 760); g.clip(); snow(t, 40); g.restore(); } }],
    // 72 · nhà máy Mỹ: băng chuyền tuôn xe tăng + máy bay ra rất nhanh, cờ sao · tiếng: máy móc dồn dập
    [ST(L.added), (t, X) => { bg('#BFD8EA'); g.fillStyle = '#7C7A78'; g.fillRect(0, 860, W, 220); fact(360, 860); fact(860, 860); for (let i = 0; i < 6; i++) { const u = (t * 0.45 + i / 6) % 1; if (i % 2) tank(560 + u * 1400, 940, 0.8); else plane(560 + u * 1400, 300 + (i % 3) * 70, 0.7); }
      usFlag(1640, 60, 240);
      S.label('WORLD\'S BIGGEST ECONOMY', 860, 150, 60, fade(X, ST(L.added) + 1.0), INK, { stroke: '#FFF' }); }],
    // 73 · ba nước (Churchill, Stalin, cờ Mỹ) đấu một; người dẫn đếm 1-2-3 trên ngón tay → NỔ NÃO (meme boom) → thẻ Arizona vào khay (7) · tiếng: bùm
    [ST(L.track), (t, X) => { bg('#F4F1E8'); famous(220, 1060, 460, 'churchill'); famous(640, 1060, 460, 'stalin'); usFlag(880, 640, 220);
      big('VS', 1195, 700, 100, RED); famous(1410, 1060, 460, 'hitler', { eyes: 'shock', mouth: 'o' }); const n = Math.min(3, 1 + Math.floor(Math.max(0, X - T.three) * 1.2)); big(String(n), 1720, 300, 120, '#FFE04A');
      aide(1745, 1060, 400, X > T.picked ? { mood: 'star', mouth: 'wide', arms: 'shrug', fx: ['boom'] } : { mood: 'side', mouth: 'wavy', arms: 'think' }); if (X > T.picked + 0.6) tray(7, (X - T.picked - 0.6) / 0.7); }],

    // ── The airlift ──
    // 74 · bản đồ: mũi tên xuống Caucasus (dầu) + một nhánh tới Stalingrad (sông Volga) · tiếng: xe tăng
    [ST(L.s42), (t, X) => { const V = ev({ cx: 40, cy: 48, zoom: 2.0 }); coast(V); city(V, 44.5, 48.7, 'STALINGRAD', 1, { dy: 66 }); arw(P(V, 34, 50.5), P(V, 43, 43.5), fade(X, T.caucasus - 1.0, 1.2), RED, 26, 0.1);
      S.label('OIL', ...P(V, 44, 42.6), 50, fade(X, T.caucasus), INK, { stroke: '#FFF' }); arw(P(V, 36, 50), P(V, 43.7, 48.75), fade(X, T.stalin - 0.8, 1.0), RED, 22, -0.1); }],
    // 75 · ẢNH THẬT Stalingrad đổ nát, tù binh trong tuyết (PD), khử màu nhẹ · "MONTHS OF STREET FIGHTING" · tiếng: súng xa
    [ST(L.streets), (t, X) => { S.photoBg(IM.p_stalingrad, t, { zoom: 1.0 }); S.desat(0.6); S.credit('Photo: German prisoners, Stalingrad, 1943 (public domain)'); S.nameTag('STALINGRAD · THE AFTERMATH', fade(X, ST(L.streets) + 0.3)); }],
    // 76 · gọng kìm hai mũi tên đỏ khép quanh thành phố → "~300,000 SURROUNDED" · tiếng: vòng siết
    [ST(L.nov), (t, X) => { const V = ev({ cx: 44, cy: 48.7, zoom: 5 }); coast(V, { land: '#F2F4F6' }); city(V, 44.5, 48.7, 'STALINGRAD', 1, { size: 44, dy: 58, align: 'left' }); city(V, 43.5, 48.68, 'KALACH', fade(X, ST(L.nov) + 2.9, 0.3), { size: 34, dx: -95, dy: 50 });   // Uranus 11/1942: từ tây bắc + từ nam, gặp nhau ở Kalach PHÍA TÂY thành phố
      arw(P(V, 41.9, 49.75), P(V, 43.42, 48.78), fade(X, ST(L.nov) + 1.5, 1.4), RED, 28, 0.12); arw(P(V, 45.0, 47.45), P(V, 43.6, 48.58), fade(X, ST(L.nov) + 1.5, 1.4), RED, 28, -0.12);
      S.label('~300,000 SURROUNDED', 960, 160, 70, fade(X, T.surrounded - 0.3), INK, { stroke: '#FFF' }); }],
    // 77 · tướng (folk) bóng thoại "Break out?" → đúng "no": Hitler dấu NO to · tiếng: dấu
    [ST(L.gens), (t, X) => { bg('#C9C2B0'); famous(420, 1060, 600, 'paulus', { eyes: 'shock', mouth: 'o' }); say('Break out now?', 420, 240, 420, 390, fade(t, 0.5), 40);
      famous(1350, 1060, 640, 'hitler', { eyes: 'angry', mouth: 'o', arms: ['down', 'orate'] }); S.stamp('NO.', 960, 560, 150, (X - T.no) / 0.4); }],
    // 78 · Göring lần nữa: bóng thoại "We'll supply it from the air!", máy bay vận tải nhỏ · tiếng: máy bay
    [ST(L.air), (t, X) => { bg('#BFD8EA'); famous(760, 1060, 760, 'goring'); for (let i = 0; i < 2; i++) plane(1400 + i * 240 + Math.sin(t + i) * 30, 520 + i * 150, 0.8, { col: '#8E959C' }); say("We'll supply it from the air!", 960, 130, 800, 280, fade(t, 0.3), 40); }],
    // 79 · hai cột: NEEDED 750 / DELIVERED ~100 tấn mỗi ngày · tiếng: tick + chuông sai
    [ST(L.tons), (t, X) => { bg('#F4F1E8'); S.label('TONS OF SUPPLIES PER DAY', 960, 120, 56, 1, INK); bar(700, 930, 300, 640, 750, 750, '#3E7A3A', 'NEEDED', '750', clamp((t - 0.6) / 0.8)); bar(1220, 930, 300, 640, 100, 750, RED, 'DELIVERED', '~100', clamp((X - T.hundred + 0.3) / 0.6)); }],
    // 80 · lính đói lạnh (folk co ro) → Paulus nhận gậy thống chế, nhãn "FIELD MARSHAL · 30 JAN 1943" · tiếng: kèn nghi lễ lạc điệu
    [ST(L.starved), (t, X) => { bg('#DDE6EE'); if (X < T.marshal - 1.2) { for (let i = 0; i < 6; i++) fritz(260 + i * 280, 1000, 340, { eyes: 'bored' }); snow(t, 80); S.label('STARVING · FREEZING', 960, 160, 64, 1, INK, { stroke: '#FFF' }); return; }
      famous(960, 1060, 760, 'paulus', { arms: ['down', 'baton'] }); S.label('FIELD MARSHAL · 30 JAN 1943', 960, 160, 64, fade(X, T.marshal - 0.4), INK, { stroke: '#FFF' }); snow(t, 40); }],
    // 81 · "Paulus surrendered the next day." — ẢNH THẬT Paulus sau đầu hàng (PD) + dấu "31 JAN 1943"; người dẫn FACEPALM góc phải · tiếng: trống bẹp
    [ST(L.surr), (t, X) => { S.photoBg(IM.p_paulus, t, { zoom: 1.0 }); S.credit('Photo: Field Marshal Paulus after the surrender at Stalingrad (public domain)'); S.stamp('SURRENDERED · 31 JAN 1943', 700, 90, 56, fade(t, 0.2, 0.4));
      aide(1640, 1060, 520, { mood: 'closed', mouth: 'flat', arms: 'facepalm' }); }],
    // 82 · NGHIÊM: ẢNH THẬT tù binh trong tuyết, khử màu; "91,000 CAPTURED" → "~5,000–6,000 CAME HOME" → thẻ Stalingrad vào khay (8) · tiếng: gió
    [ST(L.pow), (t, X) => { S.photoBg(IM.p_stalingrad, t + 4, { zoom: 1.0 }); S.desat(1); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(0, 0, W, H); S.credit('Photo: German prisoners, Stalingrad, 1943 (public domain)');
      S.label('91,000 CAPTURED', 960, 790, 76, fade(X, T.ninety - 0.2), '#F4F1E8', { free: true }); S.label('~5,000–6,000 CAME HOME', 960, 910, 76, fade(X, T.home - 0.4), '#F4F1E8', { free: true }); if (X > T.home + 0.6) tray(8, (X - T.home - 0.6) / 0.7); }],
  ];
};
