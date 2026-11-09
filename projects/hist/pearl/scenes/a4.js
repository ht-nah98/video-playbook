// a4 — The second alarm (218–315 s). Opana: bản đồ → đồi + ăng-ten SCR-270 → hết ca 7:00, xe ăn sáng trễ → 7:02 đốm khổng lồ (NGƯỜI DẪN
// nhập vai binh nhì thứ hai, mắt sao) → Lockard gõ máy "hỏng?" → "It wasn't." = ẢNH THẬT bản vẽ đường bay Opana (PD) → trung tâm
// Fort Shafter vắng tanh → Tyler (thẻ: ca thứ 2, không huấn luyện) → giả thuyết B-17 + đài phát nhạc → ♪ + ✈ = B-17 → "DON'T WORRY"
// (gag lần 2) → hai bên không biết gì về nhau → hai mũi tên cùng hướng → B-17 hết xăng, không súng → mất dấu 7:40 → xe chạy đi ăn → chuông #2.
import * as S from '../../_kit/stage.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, ll, bubble, INK } from '../../_kit/mapkit.js';
import { P, alarm, scope, phone, plane, fade, SK, OD } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, M, O, wd, ST } = K;
  const L = { up: 'Up on the northern tip', shift: 'Their shift ended', at: 'At seven oh two', lock: 'Lockard had never seen', wasnt: "It wasn't.", so: 'So they called the information',
    call: 'The call ended up', theory: 'And Tyler had a theory', flight: 'A flight of American B-17', two: 'So he put two and two', dont: "Don't worry about it, he told", nobody: 'Nobody made clear',
    fair: 'To be fair', kept: 'The two privates kept', then: 'Then they finally drove' };
  const T = { opana: wd(L.up, 'opana'), privates: wd(L.up, 'privates'), radar: wd(L.up, 'radar'), seven: wd(L.shift, 'seven'), late: wd(L.shift, 'late'), practice: wd(L.shift, 'practice'),
    blob: wd(L.at, 'blob'), miles: wd(L.at, 'miles'), broken: wd(L.lock, 'broken'), breakfast: wd(L.so, 'breakfast'), second: wd(L.call, 'second'), training: wd(L.call, 'training'), nobody: wd(L.call, 'nobody'),
    california: wd(L.flight, 'california'), drive: wd(L.flight, 'drive'), music: wd(L.flight, 'music'), friend: wd(L.flight, 'friend'), signal: wd(L.flight, 'signal'),
    bombers: wd(L.two, 'bombers'), privates2: wd(L.nobody, 'privates'), coming: wd(L.fair, 'coming'), direction: wd(L.fair, 'direction'), unarmed: wd(L.fair, 'unarmed'), fuel: wd(L.fair, 'fuel'),
    forty: wd(L.kept, 'forty'), breakfast2: wd(L.then, 'breakfast') };
  const oahuV = (z = 1) => view(O, { cx: 202.0, cy: 21.47, zoom: z });
  const OP = [360 - 158.05, 21.68], PH = [360 - 157.95, 21.36];

  /** lều radar a4: màn radar + Lockard + NGƯỜI DẪN (binh nhì thứ hai, áo lính) */
  function hut(X, o = {}) { g.fillStyle = '#4B4A32'; g.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) { g.fillStyle = i % 2 ? '#55543A' : '#4B4A32'; g.fillRect(i * 170, 0, 166, H); }
    g.fillStyle = '#2B2A20'; g.fillRect(0, 860, W, 220); const sh = o.shake ? S.shake(o.shake, 14, X) : [0, 0];
    g.save(); g.translate(sh[0], sh[1]); scope(560, 470, 330, { blob: o.blob ?? 0, dist: o.dist ?? 0, sweep: X * 2.2, ring: o.ring ?? 0 }); g.restore();
    P.lockard(1160, 1080, 560, { look: -1, mouth: o.lmouth ?? 'flat', eyes: o.leyes ?? 'dot', arm: o.larm });
    narrator(1570, 1080, 600, { outfit: 'soldier', mood: o.nmood ?? 'smug', mouth: o.nmouth ?? 'rest', look: -1, fx: o.nfx }); }
  /** SCR-270: tháp + ăng-ten lưới (lò xo giường) trên đồi + 2 xe tải */
  function hill(X, o = {}) { const sky = g.createLinearGradient(0, 0, 0, 700); sky.addColorStop(0, '#E9B48E'); sky.addColorStop(1, '#F7DDB8'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.fillStyle = '#7FA6BE'; g.fillRect(0, 640, W, 440); g.fillStyle = '#6E8F52'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(-20, H); g.lineTo(-20, 620); g.quadraticCurveTo(700, 380, 1500, 600); g.lineTo(1940, 700); g.lineTo(1940, H); g.closePath(); g.fill(); g.stroke();
    g.save(); g.translate(820, 520); g.strokeStyle = INK; g.lineWidth = 8; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * 90, 0); g.lineTo(s * 20, -260); g.stroke(); } for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(-90 + i * 18, -i * 65); g.lineTo(90 - i * 18, -i * 65); g.stroke(); }
    g.translate(0, -300); g.rotate(Math.sin(X * 0.8) * 0.15); g.fillStyle = '#B9BDB3'; g.fillRect(-230, -110, 460, 220); g.strokeRect(-230, -110, 460, 220); g.lineWidth = 4;
    for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(-230 + i * 57.5, -110); g.lineTo(-230 + i * 57.5, 110); g.stroke(); } for (let j = 1; j < 4; j++) { g.beginPath(); g.moveTo(-230, -110 + j * 55); g.lineTo(230, -110 + j * 55); g.stroke(); } g.restore();
    for (const x of o.noTrucks ? [1420] : [1180, 1420]) { g.save(); g.translate(x, 640); g.fillStyle = OD; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-120, -130, 200, 110); g.strokeRect(-120, -130, 200, 110); g.fillRect(80, -100, 70, 80); g.strokeRect(80, -100, 70, 80);
      g.fillStyle = '#222'; for (const wx of [-80, 30, 110]) { g.beginPath(); g.arc(wx, -10, 28, 0, 7); g.fill(); g.stroke(); } g.restore(); } }

  return [
    // 1a · bản đồ Oahu, ghim OPANA đầu bắc đảo · không người dẫn · tiếng: "ding" ghim
    [ST(L.up), (t, X) => { const V = oahuV(1 + 0.25 * ease(t / 3)); drawMap(g, O, V, { fill: { Oahu: '#E3DDC6' } }); const [x, y] = V.pt(ll(O, ...OP)); const k = fade(X, T.opana - 0.2, 0.3);
      g.fillStyle = RED; g.beginPath(); g.arc(x, y, 16 * k, 0, 7); g.fill(); S.label('OPANA RADAR', x + 40, y - 40, 54, k, INK, { stroke: '#FFF' }); }],
    // 1b · đồi Opana: ăng-ten SCR-270 + xe tải · không người dẫn · tiếng: gió, máy phát điện rì rì
    [T.privates - 0.3, (t, X) => { hill(X); g.fillStyle = 'rgba(20,20,24,0.35)'; g.fillRect(0, 0, W, H); if (IM.p_scr270) S.photo(IM.p_scr270, 960, 560, 640 + 20 * t);
      S.label('SCR-270 · BRAND NEW', 960, 110, 60, fade(X, T.radar - 0.2, 0.3), '#FFFFFF', { stroke: INK }); S.credit('SCR-270 radar: U.S. Army Signal Corps (public domain)'); }],
    // 2 · đường đất vắng, biển "BREAKFAST", đồng hồ 7:00 → dấu LATE · không người dẫn · tiếng: tích tắc, chim
    [ST(L.shift), (t, X) => { hill(X); g.fillStyle = 'rgba(244,241,232,0.0)'; const mm = Math.min(1, Math.floor(clamp((X - T.seven) / 4) * 2));
      alarm(1650, 280, 150, { time: [7, mm] }); S.label('SHIFT ENDS 7:00', 1650, 520, 48, fade(X, T.seven, 0.3), '#FFFFFF', { stroke: INK });
      g.save(); g.translate(280, 860); g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-12, -200, 24, 220); g.strokeRect(-12, -200, 24, 220); g.fillStyle = '#FFFDF4'; g.fillRect(-190, -280, 380, 90); g.strokeRect(-190, -280, 380, 90);
      g.fillStyle = INK; g.font = '900 40px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('BREAKFAST →', 0, -222); g.restore(); S.stamp('TRUCK LATE', 300, 420, 60, clamp((X - T.late) / 0.4)); }],
    // 3 · lều: 7:02 đốm khổng lồ ở phía bắc, NGƯỜI DẪN mắt sao há mồm, Lockard sững · tiếng: bíp radar dồn dập
    [ST(L.at), (t, X) => { const k = ease((X - T.blob + 0.3) / 0.8); hut(X, { blob: k, dist: 0.05, ring: fade(X, T.blob + 0.5, 0.4), leyes: k > 0.4 ? 'shock' : 'dot', lmouth: 'o', nmood: k > 0.4 ? 'star' : 'smug', nmouth: k > 0.4 ? 'wide' : 'rest' });
      S.label('7:02 AM', 560, 980, 66, fade(X, ST(L.at) + 0.3, 0.3), '#FFE04A', { stroke: INK }); S.label('~130 MILES NORTH', 1340, 160, 54, fade(X, T.miles, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 4 · Lockard đập máy (màn rung), "BROKEN?" · NGƯỜI DẪN choáng · tiếng: "cốc cốc" kim loại
    [ST(L.lock), (t, X) => { hut(X, { blob: 1, dist: 0.08, shake: X > T.broken - 0.3 ? clamp((X - T.broken + 0.3) / 1.2) : 0, larm: 'up', lmouth: 'o', leyes: 'shock', nmood: 'dizzy', nmouth: 'wavy' });
      S.label('BROKEN?', 560, 120, 80, fade(X, T.broken, 0.3), RED, { stroke: '#FFF' }); }],
    // 5 · "It wasn't." — ẢNH THẬT bản vẽ đường bay Opana 7/12/1941 (PD), khoanh đỏ đầu đường 7:02 · không người dẫn · tiếng: im, một tiếng giấy
    [ST(L.wasnt), (t, X) => { const im = IM['p_opana-plot']; g.fillStyle = '#E9E3D3'; g.fillRect(0, 0, W, H);
      if (im) { const s = 1.9 + 0.1 * t, w = im.width * H / im.height * s, h = H * s; g.drawImage(im, 960 - w * 0.53, 540 - h * 0.25, w, h); }
      if (im) { const s = 1.9 + 0.1 * t, w = im.width * H / im.height * s, h = H * s; g.save(); g.strokeStyle = RED; g.lineWidth = 10; g.beginPath(); g.ellipse(960 - w * 0.53 + w * 0.556, 540 - h * 0.25 + h * 0.253, w * 0.09, w * 0.06, 0, 0, 7); g.stroke(); g.restore(); }
      S.label('THE REAL RADAR PLOT · 7 DEC 1941', 960, 1000, 48, 1, '#FFFFFF', { stroke: INK }); S.credit('Opana radar plot, U.S. Army / NARA (public domain)'); }],
    // 6 · Fort Shafter: bàn đồ thị trống, ghế trống, biển "GONE TO BREAKFAST", McDonald một mình ở tổng đài · tiếng: chuông điện thoại reo, phòng vang
    [ST(L.so), (t, X) => { g.fillStyle = '#D9D1BC'; g.fillRect(0, 0, W, H); g.fillStyle = '#B5AA90'; g.fillRect(0, 800, W, 280);
      g.fillStyle = '#7A8B6A'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.ellipse(760, 760, 560, 120, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#E3DDC6'; g.beginPath(); g.ellipse(760, 740, 240, 60, 0.1, 0, 7); g.fill(); g.stroke();
      for (let i = 0; i < 6; i++) { const a = Math.PI * (0.05 + i * 0.18), x = 760 + Math.cos(a) * 640, y = 820 + Math.sin(a) * 120; g.fillStyle = '#8A6A46'; g.fillRect(x - 30, y - 90, 60, 90); g.strokeRect(x - 30, y - 90, 60, 90); }
      g.font = '900 60px Archivo, sans-serif'; const bw = g.measureText('GONE TO BREAKFAST').width + 80; g.fillStyle = '#FFFDF4'; g.fillRect(760 - bw / 2, 140, bw, 130); g.strokeRect(760 - bw / 2, 140, bw, 130); g.fillStyle = RED; g.textAlign = 'center'; g.fillText('GONE TO BREAKFAST', 760, 228);
      g.fillStyle = '#3A3A3E'; g.fillRect(1440, 420, 300, 380); g.strokeRect(1440, 420, 300, 380); for (let i = 0; i < 12; i++) { g.fillStyle = i === 5 && Math.sin(X * 20) > 0 ? '#FFE04A' : '#888'; g.beginPath(); g.arc(1480 + (i % 4) * 75, 470 + Math.floor(i / 4) * 70, 14, 0, 7); g.fill(); }
      P.mcdonald(1590, 1060, 420, { look: 1, mouth: 'o' }); S.nameTag('FORT SHAFTER', fade(X, ST(L.so) + 0.3, 0.3)); }],
    // 7 · Tyler sau bàn, thẻ hồ sơ: "2ND SHIFT" · "TRAINING ✗" · "HELP ✗" hiện đúng từ · không người dẫn · tiếng: ba tiếng "tick" bút
    [ST(L.call), (t, X) => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, W, H); g.fillStyle = '#3A3020'; g.fillRect(0, 820, W, 260); phone(1500, 830, 180);
      P.tyler(1150, 1080, 720, { look: -1, mouth: 'flat' }); S.nameTag('LT. KERMIT TYLER', fade(X, ST(L.call) + 0.3, 0.3), 1180, 980);
      g.save(); g.translate(460, 470); g.rotate(-0.04); g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-300, -280, 600, 560); g.strokeRect(-300, -280, 600, 560);
      g.fillStyle = INK; g.font = '900 46px Archivo, sans-serif'; g.textAlign = 'left'; g.fillText('FIGHTER PILOT', -250, -190);
      [['2ND SHIFT HERE', T.second, '#2B4C9B'], ['TRAINING  ✗', T.training, RED], ['STAFF  ✗', T.nobody, RED]].forEach(([s, at, c], i) => { g.globalAlpha = fade(X, at - 0.2, 0.3); g.fillStyle = c; g.fillText(s, -250, -80 + i * 120); }); g.restore(); }],
    // 8 · Tyler + bóng đèn sáng trên đầu · không người dẫn · tiếng: "ting"
    [ST(L.theory), (t, X) => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, W, H); g.fillStyle = '#3A3020'; g.fillRect(0, 820, W, 260); const R = P.tyler(960, 1080, 720, { look: 0, mouth: 'smile' });
      const k = back(clamp((X - ST(L.theory) - 0.3) / 0.4)); g.save(); g.translate(960, 180); g.scale(k, k); g.fillStyle = '#FFE04A'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 90, 0, 7); g.fill(); g.stroke();
      g.fillStyle = '#9A9A9A'; g.fillRect(-40, 80, 80, 50); g.strokeRect(-40, 80, 80, 50); g.restore(); }],
    // 9a · bản đồ: đường đứt California → Hawaii, B-17 bay "DUE THIS MORNING" · không người dẫn · tiếng: tiếng máy bay xa
    [ST(L.flight), (t, X) => { const V = view(M, { cx: 200, cy: 28, zoom: 1.6 }); drawMap(g, M, V, { fill: { 'United States': '#9FC3E8' } });
      const A = V.pt(ll(M, 238, 37.5)), B = V.pt(ll(M, 202.5, 21.6)), k = ease((X - ST(L.flight)) / 4);
      g.save(); g.strokeStyle = '#2B4C9B'; g.lineWidth = 10; g.setLineDash([26, 18]); g.beginPath(); g.moveTo(...A); g.lineTo(...B); g.stroke(); g.restore();
      for (let i = 0; i < 3; i++) { const u = clamp(k - i * 0.08); plane(lerp(A[0], B[0], u), lerp(A[1], B[1], u) - 60 + i * 60, 240, 'b17', { flip: true, rot: -0.3 }); }
      S.label('B-17s DUE FROM CALIFORNIA', 960, 160, 60, fade(X, T.california - 0.2, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 9b · Tyler lái xe đêm, đài trên táp-lô phát nốt nhạc "♪ HAWAIIAN MUSIC ALL NIGHT" · không người dẫn · tiếng: nhạc ukulele lọt qua radio
    [T.drive - 0.3, (t, X) => { g.fillStyle = '#16213A'; g.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) { g.fillStyle = '#FFFDF4'; g.fillRect(hash(i) * W, hash(i + 3) * 500, 3, 3); }
      g.fillStyle = '#3A2C22'; g.fillRect(0, 700, W, 380); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(-10, 700, W + 20, 400);
      g.fillStyle = '#5A4632'; g.fillRect(860, 760, 300, 160); g.strokeRect(860, 760, 300, 160); g.fillStyle = '#E8C46A'; g.fillRect(890, 790, 160, 60); g.strokeRect(890, 790, 160, 60);
      for (let i = 0; i < 5; i++) { const u = ((X * 0.6 + i * 0.2) % 1); g.globalAlpha = 1 - u; g.fillStyle = '#FFE04A'; g.font = '900 90px Archivo, sans-serif'; g.fillText('♪', 1000 + i * 30 + u * 300, 740 - u * 400); } g.globalAlpha = 1;
      g.save(); g.strokeStyle = '#2A2A30'; g.lineWidth = 30; g.beginPath(); g.moveTo(80, 700); g.lineTo(300, 60); g.lineTo(1650, 60); g.lineTo(1840, 700); g.stroke(); g.restore();   // khung kính chắn gió
      P.tyler(500, 1080, 760, { look: 1, mouth: 'smile' }); g.strokeStyle = INK; g.lineWidth = 22; g.beginPath(); g.arc(560, 860, 190, 0, 7); g.stroke(); g.beginPath(); g.moveTo(370, 860); g.lineTo(750, 860); g.stroke();
      S.label('♪ HAWAIIAN MUSIC ALL NIGHT', 1300, 200, 56, fade(X, T.music - 0.2, 0.3), '#FFE04A', { stroke: INK }); }],
    // 9c · bong bóng bạn bè: "MUSIC ALL NIGHT = BOMBERS INCOMING" · không người dẫn · tiếng: "pop" bong bóng
    [T.friend - 0.3, (t, X) => { g.fillStyle = '#16213A'; g.fillRect(0, 0, W, H); P.tyler(1400, 1080, 700, { look: -1, mouth: 'o' }); P.sailor(500, 1080, 640, { look: 1, mouth: 'smile' });
      bubble(g, 'MUSIC ALL NIGHT = BOMBERS!', 760, 280, 560, 520, clamp((X - T.friend) / 0.3), 54); }],
    // 10 · phép cộng: ♪ + ✈ = B-17 · người dẫn góc · tiếng: ba "tick" + "ding"
    [ST(L.two), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); const k = i => fade(X, ST(L.two) + 0.2 + i * 0.5, 0.25);
      S.label('♪', 300, 560, 220, k(0), '#2B4C9B'); S.label('+', 520, 540, 140, k(1), INK); g.save(); g.globalAlpha = k(1); plane(760, 480, 260, 'b17'); g.restore(); S.label('=', 1000, 540, 140, k(2), INK);
      S.label('B-17s', 1250, 560, 160, fade(X, T.bombers - 0.1, 0.3), RED, { stroke: INK }); S.lipHost(X, 1, { h: 420 }); }],
    // 11 · Tyler giơ hai tay "DON'T WORRY ABOUT IT." — gag lần 2 · không người dẫn · tiếng: "ding" như lần 1
    [ST(L.dont), (t, X) => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, W, H);   // MEME vẽ lại khuôn "bình tĩnh giữa đám cháy": lửa bốc quanh phòng, Tyler cười cầm cốc cà phê
      for (let i = 0; i < 16; i++) { const fx = 60 + i * 120, fh = 180 + 140 * hash(i) + 40 * Math.sin(X * 9 + i); g.fillStyle = i % 2 ? '#F2A33A' : '#E4502A'; g.beginPath(); g.moveTo(fx - 70, 830); g.quadraticCurveTo(fx - 40, 830 - fh * 0.6, fx, 830 - fh); g.quadraticCurveTo(fx + 40, 830 - fh * 0.6, fx + 70, 830); g.closePath(); g.fill(); }
      g.fillStyle = 'rgba(40,40,44,0.5)'; for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(120 + i * 240, 120 + 30 * Math.sin(X * 2 + i), 110, 0, 7); g.fill(); }
      g.fillStyle = '#3A3020'; g.fillRect(0, 820, W, 260); phone(560, 830, 220);
      P.tyler(1250, 1080, 760, { look: -1, mouth: 'grin' }); g.save(); g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(1390, 760, 90, 110, 12); g.fill(); g.stroke(); g.beginPath(); g.arc(1490, 815, 30, -1.2, 1.2); g.stroke(); g.restore(); S.label('"DON\'T WORRY ABOUT IT."', 960, 200, 104, fade(X, ST(L.dont) + 0.1, 0.25), '#FFE04A', { stroke: INK }); }],
    // 12 · chia đôi: trái Tyler "HOW BIG?" — phải hai binh nhì "B-17s?" (người dẫn ở lều) · tiếng: hai "huh?"
    [ST(L.nobody), (t, X) => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, 960, H); g.fillStyle = '#4B4A32'; g.fillRect(960, 0, 960, H); g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.moveTo(960, 0); g.lineTo(960, H); g.stroke();
      P.tyler(480, 1080, 620, { look: 1, mouth: 'flat' }); S.label('HOW BIG?', 480, 220, 80, fade(X, ST(L.nobody) + 0.4, 0.3), RED, { stroke: '#FFF' });
      P.lockard(1280, 1080, 560, { look: -1, mouth: 'o' }); narrator(1620, 1080, 600, { outfit: 'soldier', mood: 'side', mouth: 'wavy', look: -1 });
      S.label('BOMBERS DUE?', 1440, 220, 80, fade(X, T.privates2, 0.3), RED, { stroke: '#FFF' }); }],
    // 13a · bản đồ Oahu: mũi tên đỏ (máy bay Nhật, phía bắc) + mũi tên xanh (B-17, đông bắc) cùng hướng vào đảo · không người dẫn · tiếng: hai tiếng gầm chồng
    [ST(L.fair), (t, X) => { const V = oahuV(0.55); drawMap(g, O, V, { fill: { Oahu: '#E3DDC6' } }); const [hx, hy] = V.pt(ll(O, 202.0, 21.47));
      const k1 = ease((X - ST(L.fair)) / 2.5), k2 = ease((X - T.direction + 0.5) / 2.5);
      g.save(); g.lineCap = 'round'; g.strokeStyle = '#2B4C9B'; g.lineWidth = 20; g.beginPath(); g.moveTo(hx + 700, hy - 470); g.lineTo(lerp(hx + 700, hx + 140, k1), lerp(hy - 470, hy - 110, k1)); g.stroke();
      g.strokeStyle = RED; g.lineWidth = 34; g.beginPath(); g.moveTo(hx - 60, hy - 560); g.lineTo(hx - 60, lerp(hy - 560, hy - 150, k2)); g.stroke(); g.restore();
      S.label('B-17s', hx + 640, hy - 500, 54, fade(X, ST(L.fair) + 0.3, 0.3), '#2B4C9B', { stroke: '#FFF' }); S.label('JAPAN', hx - 260, hy - 480, 54, k2 > 0.05 ? 1 : 0, RED, { stroke: '#FFF' }); }],
    // 13b · B-17 bay, kim xăng E đỏ nhấp nháy, thẻ "NO GUNS" · không người dẫn · tiếng: máy bay ho hắng
    [T.unarmed - 0.4, (t, X) => { const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#9CC3E0'); sky.addColorStop(1, '#E9F1F4'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
      if (IM.p_b17flight) S.photoBg(IM.p_b17flight, t, { zoom: 1.15, fy: 0.05 }); S.credit('B-17s over Hickam Field, 1941: U.S. Army Air Forces (public domain)'); S.stamp('NO GUNS', 600, 620, 70, clamp((X - T.unarmed) / 0.4));
      g.save(); g.translate(1550, 830); g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 150, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.fillStyle = Math.sin(X * 12) > 0 ? RED : INK; g.font = '900 60px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('E', -100, -20);
      g.strokeStyle = RED; g.lineWidth = 10; g.beginPath(); g.moveTo(0, 0); g.lineTo(-130, -20); g.stroke(); g.restore(); S.label('FUEL', 1550, 900, 44, fade(X, T.fuel, 0.3), INK); }],
    // 14 · màn radar: đốm trôi vào gần tâm (đảo) rồi mờ mất; đồng hồ 7:40 · không người dẫn · tiếng: bíp thưa dần rồi tắt
    [ST(L.kept), (t, X) => { const k = ease((X - ST(L.kept)) / 5.5), lost = fade(X, T.forty, 0.6); hut(X, { blob: 1 - lost, dist: 0.1 + 0.75 * k, nmood: 'smug', nmouth: 'rest' });
      alarm(1720, 170, 100, { time: [7, Math.round(lerp(10, 40, k))] }); S.label('CONTACT LOST · 7:40', 560, 990, 60, lost, '#FFFFFF', { stroke: INK }); }],
    // 15 · xe tải chạy đi ăn sáng, bụi bay; chuông #2 (RADAR) SNOOZE · không người dẫn · tiếng: xe nổ máy chạy xa + "bốp" snooze
    [ST(L.then), (t, X) => { hill(X, { noTrucks: true }); const k = ease((X - ST(L.then)) / 2.2); g.save(); g.translate(lerp(1180, 2100, k), 640 + 30 * k); g.fillStyle = OD; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-120, -130, 200, 110); g.strokeRect(-120, -130, 200, 110); g.fillRect(80, -100, 70, 80); g.strokeRect(80, -100, 70, 80);
      g.fillStyle = '#222'; for (const wx of [-80, 30, 110]) { g.beginPath(); g.arc(wx, -10, 28, 0, 7); g.fill(); g.stroke(); } g.restore();
      for (let i = 0; i < 6; i++) { g.fillStyle = `rgba(200,180,140,${0.5 * k})`; g.beginPath(); g.arc(1180 + i * 60 * k, 600 - i * 6, 40 + i * 8, 0, 7); g.fill(); }
      alarm(330, 330, 170, { time: [7, 40], snooze: X > T.breakfast2 ? ease((X - T.breakfast2) / 0.2) : 0, label: 'RADAR · 7:02' }); }],
  ];
};
