// a10 — Outro (613.5–665 s) + thẻ kết. Tóm tắt bằng hình đã xem (picnic → Prague → nến Leipzig), tờ memo + đồng hồ, dòng người đêm đó,
// dấu "NOBODY READ THE MEMO" lần 3 (cửa khẩu), luận đề + máy bay giấy qua Tường, trời tối sầm, thẻ kết BLUNDERSTORY đứng yên ≥ 4 s.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, memo, wall } from './common.js';
import { helpers } from './a8.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, wd, ST } = K;
  const { fade, bornBG, booth, barrier, flow, clock, gate } = helpers(K);
  const L = { q: 'So, did one man', not: 'Not really', but: 'But the memo decided', turned: 'It turned a careful', all: 'All because nobody', hist: "History's biggest", stick: 'So stick around' };
  const T = { mistake: wd(L.q, 'mistake'), months: wd(L.not, 'months'), hungary: wd(L.not, 'hungary'), prague: wd(L.not, 'prague'), leipzig: wd(L.not, 'leipzig'), give: wd(L.not, 'give'),
    when: wd(L.but, 'when'), careful: wd(L.turned, 'careful'), stampede: wd(L.turned, 'stampede'), that: wd(L.turned, 'that'), nobody: wd(L.turned, 'nobody'),
    memo: wd(L.all, 'memo'), imm: wd(L.all, 'immediately'), disasters: wd(L.hist, 'disasters'), tiny: wd(L.hist, 'tiny'), happy: wd(L.hist, 'happy'),
    next: wd(L.stick, 'next'), not2: wd(L.stick, 'not'), ending: wd(L.stick, 'ending') };
  const SKY = ['#BFD6E6', '#EEF0E6'];

  // ── ba tấm ảnh dán vẽ nhỏ (không ảnh thật): vẽ trong hệ toạ độ thẻ, vùng tranh x ±220, y −290…170 ──
  function artHungary(X) { g.fillStyle = '#BFE0F2'; g.fillRect(-220, -290, 440, 460); g.fillStyle = '#7BB56A'; g.beginPath(); g.moveTo(-220, -40); g.quadraticCurveTo(0, -120, 220, -30); g.lineTo(220, 170); g.lineTo(-220, 170); g.fill();
    g.fillStyle = '#F4F1E8'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.arc(150, -210, 38, 0, 7); g.fill();
    g.fillStyle = '#8B6B45'; for (const x of [-200, -150, 80, 130, 180]) { g.fillRect(x, -60, 12, 90); g.strokeRect(x, -60, 12, 90); }                      // hàng rào gãy
    g.strokeStyle = '#6B6B6B'; g.lineWidth = 4; g.beginPath(); g.moveTo(-200, -35); g.lineTo(-138, -35); g.moveTo(80, -35); g.lineTo(192, -35); g.stroke();
    g.fillStyle = '#C2343A'; g.beginPath(); g.moveTo(-90, 110); g.lineTo(90, 110); g.lineTo(120, 160); g.lineTo(-120, 160); g.fill(); g.strokeStyle = INK; g.stroke();
    g.fillStyle = '#9A6B3A'; g.fillRect(-20, 78, 50, 36); g.strokeRect(-20, 78, 50, 36);
    C.folk(-70, 70, 150, { coat: 'tsarcoat', wear: 'scarf', eyes: 'happy', mouth: 'grin' }); C.folk(70, 70, 140, { coat: 'gown', eyes: 'happy', mouth: 'grin' }); }
  function artPrague(X) { g.fillStyle = '#B9BCC4'; g.fillRect(-220, -290, 440, 460); g.fillStyle = '#D8C9A8'; g.fillRect(-160, -230, 320, 230); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(-160, -230, 320, 230);
    g.fillStyle = '#6B5A45'; for (const x of [-110, 0, 110]) { g.fillRect(x - 24, -190, 48, 70); g.strokeRect(x - 24, -190, 48, 70); }
    g.fillStyle = '#8A8D96'; g.fillRect(-80, -70, 160, 24); g.strokeRect(-80, -70, 160, 24); C.folk(0, -46, 120, { coat: 'suit', eyes: 'happy', mouth: 'o', arm: 'up' });                    // ban công
    g.fillStyle = '#7C8068'; g.fillRect(-220, 20, 440, 150);
    for (const x of [-150, -30, 100, 170]) { g.fillStyle = '#E8A04A'; g.beginPath(); g.moveTo(x - 40, 120); g.lineTo(x, 50); g.lineTo(x + 40, 120); g.closePath(); g.fill(); g.stroke(); }  // lều
    for (let i = 0; i < 9; i++) C.folk(-200 + i * 50, 168 - (i % 2) * 14, 100, { coat: ['worker', 'german', 'tsarcoat'][i % 3], eyes: 'happy', arm: i % 2 ? 'up' : null }); }
  function artLeipzig(X) { g.fillStyle = '#0E1424'; g.fillRect(-220, -290, 440, 460); g.fillStyle = '#1E2740'; for (let i = 0; i < 6; i++) g.fillRect(-220 + i * 76, -200 - hash(i + 60) * 80, 66, 300);
    g.fillStyle = '#EDE6D3'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(-150, -120, 300, 56); g.strokeRect(-150, -120, 300, 56); g.fillStyle = INK; g.font = '900 28px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('WIR SIND DAS VOLK', 0, -83);
    for (let i = 0; i < 8; i++) { const x = -190 + i * 54, y = 150 - (i % 2) * 20; C.folk(x, y, 150, { coat: ['german', 'worker', 'tsarcoat', 'driver'][i % 4], eyes: 'dot', look: 0.4 }); g.fillStyle = 'rgba(255,214,120,0.28)'; g.beginPath(); g.arc(x + 26, y - 100, 34, 0, 7); g.fill();
      g.fillStyle = '#FFF4C8'; g.beginPath(); g.ellipse(x + 26, y - 100, 7, 11, 0, 0, 7); g.fill(); g.fillStyle = '#F2E4B5'; g.fillRect(x + 21, y - 90, 10, 34); } }
  function card(cx, cy, rot, k, name, art, X) { if (k <= 0) return; g.save(); g.translate(cx, cy + (1 - easeOut(k)) * -420); g.rotate(rot); const s = back(k); g.scale(s, s);
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-244, -302, 500, 640); g.fillStyle = '#FBF8F0'; g.fillRect(-250, -320, 500, 640); g.strokeStyle = INK; g.lineWidth = 5; g.strokeRect(-250, -320, 500, 640);
    g.save(); g.beginPath(); g.rect(-220, -290, 440, 460); g.clip(); art(X); g.restore(); g.strokeRect(-220, -290, 440, 460);
    g.fillStyle = INK; g.font = '900 60px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillText(name, 0, 268);
    g.fillStyle = 'rgba(240,226,160,0.9)'; g.fillRect(-60, -346, 120, 44); g.strokeRect(-60, -346, 120, 44); g.restore(); }

  // ── máy bay giấy (gấp từ tờ memo) ──
  function plane(x, y, ang, s = 1) { g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.lineJoin = 'round'; g.strokeStyle = INK; g.lineWidth = 5;
    g.fillStyle = '#FBF8EE'; g.beginPath(); g.moveTo(90, 0); g.lineTo(-80, -42); g.lineTo(-40, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#DDD8C8'; g.beginPath(); g.moveTo(90, 0); g.lineTo(-40, 0); g.lineTo(-80, 38); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#9A978C'; g.fillRect(-60, -28, 28, 5); g.fillRect(-52, -16, 20, 5); g.restore(); }
  const planePos = u => { const a = [930, 640], b = [1250, 180], c = [1700, 330], k = clamp(u), m = 1 - k;
    return { x: m * m * a[0] + 2 * m * k * b[0] + k * k * c[0], y: m * m * a[1] + 2 * m * k * b[1] + k * k * c[1], ang: Math.atan2(2 * m * (b[1] - a[1]) + 2 * k * (c[1] - b[1]), 2 * m * (b[0] - a[0]) + 2 * k * (c[0] - b[0])) }; };
  const sky = () => { const sg = g.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, SKY[0]); sg.addColorStop(1, SKY[1]); g.fillStyle = sg; g.fillRect(0, 0, W, H); };
  const sceneHost = (X, mouth, mood, look) => { narrator(560, 1075, 780, { outfit: 'plain', mood, mouth, arms: 'point', look }); };
  const clouds = k => { if (k <= 0) return; g.fillStyle = `rgba(18,20,34,${0.78 * k})`; g.fillRect(0, 0, W, H);
    g.fillStyle = `rgba(40,44,64,${0.9 * k})`; for (let i = 0; i < 7; i++) { const x = i * 330 - 100, y = 60 + hash(i + 80) * 180; g.beginPath(); g.ellipse(x, y, 260, 90, 0, 0, 7); g.ellipse(x + 130, y - 40, 190, 80, 0, 0, 7); g.fill(); } };

  const hostHold = X => ({ mouth: X < K.END ? mouthAt(X) : 'rest' });

  return [
    // 1 · "một sai lầm có làm đổ Tường?" — Tường lớn, tờ memo nhỏ dựa chân tường, dấu "?" · người dẫn: góc nhép miệng · tiếng: gió, nốt nhạc lơ lửng
    [ST(L.q), (t, X) => { sky(); wall(-60, 2000, 900, 420, { west: true, seed: 9 }); g.fillStyle = '#9A9893'; g.fillRect(0, 900, W, H - 900);
      memo(600, 800, 230, 0.12, { title: 'NEW RULE', seed: 2 }); S.label('?', 1000, 330, 300, clamp((X - T.mistake) / 0.25), RED, { stroke: '#FFF' }); S.lipHost(X); }],
    // 2a · người dân Đông Đức đẩy Tường nhiều tháng · không người dẫn · tiếng: tiếng bước chân, bê tông rung nhẹ
    [ST(L.not), (t, X) => { sky(); const sh = Math.sin(X * 24) * 3; g.save(); g.translate(sh, 0); wall(1060, 2100, 900, 420, { seed: 9 }); g.restore(); g.fillStyle = '#9A9893'; g.fillRect(0, 900, W, H - 900);
      for (let r = 1; r >= 0; r--) for (let i = 0; i < 6; i++) C.folk(120 + i * 150 + r * 75, 1020 - r * 70, 380 - r * 30, { coat: ['worker', 'german', 'tsarcoat', 'driver'][(i + r) % 4], wear: ['scarf', null, 'cap'][(i + r) % 3], eyes: 'angry', mouth: 'o', arm: 'up', tilt: 0.1 + 0.02 * Math.sin(X * 10 + i) });
      S.label('FOR MONTHS', 960, 190, 120, clamp((X - T.months) / 0.25), RED, { stroke: '#FFF' }); }],
    // 2b · ba tấm ảnh dán: picnic Hungary → đại sứ quán Prague → nến Leipzig (vẽ lại nhỏ) · không người dẫn · tiếng: giấy dán "tạch" mỗi tấm
    [T.hungary - 0.35, (t, X) => { S.paper();
      card(400, 560, -0.05, clamp((X - T.hungary + 0.15) / 0.45), 'HUNGARY', artHungary, X); card(960, 560, 0.03, clamp((X - T.prague + 0.15) / 0.45), 'PRAGUE', artPrague, X); card(1520, 560, -0.03, clamp((X - T.leipzig + 0.15) / 0.45), 'LEIPZIG', artLeipzig, X); }],
    // 3 · "But the memo decided WHEN" — tờ memo + đồng hồ 18:53 · không người dẫn · tiếng: tích tắc, "ting"
    [ST(L.but), (t, X) => { g.fillStyle = '#1D2433'; g.fillRect(0, 0, W, H); memo(620, 600, 380, -0.05, { title: 'NEW RULE', seed: 4 }); clock(1300, 600, 200, 6, 53);
      S.label('WHEN.', 960, 190, 150, clamp((X - T.when) / 0.25), '#FFF', { stroke: '#111' }); }],
    // 4a · kế hoạch ngăn nắp: lịch "10 NOV" buổi sáng + hàng người xếp ngay ngắn · không người dẫn · tiếng: im
    [ST(L.turned), (t, X) => { sky(); g.fillStyle = '#9A9893'; g.fillRect(0, 880, W, 200);
      g.fillStyle = '#FFE08A'; g.beginPath(); g.arc(500, 230, 70, 0, 7); g.fill(); g.strokeStyle = '#F2B84A'; g.lineWidth = 8; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.2832; g.beginPath(); g.moveTo(500 + Math.cos(a) * 90, 230 + Math.sin(a) * 90); g.lineTo(500 + Math.cos(a) * 130, 230 + Math.sin(a) * 130); g.stroke(); }
      g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(300, 380, 400, 460); g.strokeRect(300, 380, 400, 460); g.fillStyle = RED; g.fillRect(300, 380, 400, 100); g.strokeRect(300, 380, 400, 100);
      g.fillStyle = INK; g.font = '900 130px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('10', 500, 640); g.font = '900 100px Archivo, sans-serif'; g.fillText('NOV', 500, 760);
      for (let i = 0; i < 5; i++) C.folk(950 + i * 190, 1010, 420, { coat: 'suit', wear: 'bowler', eyes: 'dot', look: 0.5 });
      S.label('A CAREFUL PLAN', 1300, 230, 90, clamp((X - T.careful) / 0.25), INK, { stroke: '#FFF' }); }],
    // 4b · cùng đêm đó: dòng người ào qua cầu · không người dẫn · tiếng: bước chân dồn, cheer
    [T.stampede - 0.25, (t, X) => { bornBG(); booth(1520, 800, 300, 280); barrier(1290, 800, 400, 1); flow(X, T.stampede - 0.25, { speed: 520, n: 36 });
      S.label('THAT VERY NIGHT', 960, 160, 110, clamp((X - T.that + 0.1) / 0.25), '#FFF', { stroke: '#111' }); }],
    // 4c · cổng nằm đất, không đóng lại được · không người dẫn · tiếng: kim loại đã nằm, im dần
    [T.nobody - 0.2, (t, X) => { bornBG({ sky: ['#2B3552', '#6A5A66'], lamps: true }); gate(560, 900, 720, 360, 1.52);
      for (let i = 0; i < 4; i++) C.folk(((X - T.nobody) * 130 + i * 340) % 1500 + 200, 1040, 330, { coat: ['worker', 'german', 'tsarcoat', 'driver'][i], eyes: 'happy', mouth: i % 2 ? 'grin' : null }); }],
    // 5 · DẤU lần 3 trên cửa khẩu: Schabowski nheo mắt, "…IMMEDIATELY" · không người dẫn · tiếng: stamp đúng "memo", nhạc gag
    [ST(L.all), (t, X) => { bornBG(); booth(1520, 800, 300, 280); barrier(1290, 800, 400, 1); P.schab(520, 1040, 700, { eyes: 'bored', mouth: 'flat', squint: true, look: 0.4, sweat: true });
      bubble(g, '…IMMEDIATELY', 1180, 600, 780, 600, clamp((X - T.imm) / 0.3), 56);
      S.stamp('NOBODY READ THE MEMO', 960, 210, 96, clamp((X - T.memo + 0.3) / 0.7), -0.08); }],
    // 6 · luận đề: người dẫn giữa khung, "HUGE DISASTERS / TINY MISTAKES"; đúng "happy" tờ memo thành máy bay giấy bay qua Tường · người dẫn: toàn thân trái · tiếng: nhạc ấm, whoosh
    [ST(L.hist), (t, X) => { sky(); wall(-60, 2000, 1000, 300, { west: true, seed: 14 }); g.fillStyle = '#9A9893'; g.fillRect(0, 1000, W, 80);
      sceneHost(X, mouthAt(X), 'smug', 1);
      S.label('HUGE DISASTERS', 1360, 330, 84, clamp((X - T.disasters) / 0.25), RED, { stroke: '#FFF' }); S.label('TINY MISTAKES', 1360, 450, 84, clamp((X - T.tiny) / 0.25), INK, { stroke: '#FFF' });
      const u = (X - T.happy + 0.1) / 2.4; if (u > 0) { const p = planePos(u); plane(p.x, p.y, p.ang, 1.3); }
      S.label('A HAPPY ENDING', 1360, 570, 70, clamp((X - T.happy) / 0.25), '#2E7A3A', { stroke: '#FFF' }); }],
    // 7 · "lần sau... không hạnh phúc": trời tối sầm, máy bay chúi xuống · người dẫn: toàn thân trái (cùng chỗ) · tiếng: nhạc trầm, sấm xa
    [ST(L.stick), (t, X) => { sky(); wall(-60, 2000, 1000, 300, { west: true, seed: 14 }); g.fillStyle = '#9A9893'; g.fillRect(0, 1000, W, 80);
      const d = clamp((X - T.ending + 0.2) / 1.9), u = clamp((X - T.not2) / 1.2), p = planePos(1);
      sceneHost(X, mouthAt(X), d > 0.3 ? 'shock' : 'smug', 1);
      plane(p.x - 40 * u, p.y + 640 * u * u, p.ang + 1.1 * u, 1.3); clouds(d);
      S.label('NEXT TIME…', 1360, 250, 100, clamp((X - T.next) / 0.3), '#FFF', { stroke: '#111' }); }],
    // 8 · THẺ KẾT (K.END → K.DUR, đứng yên ≥ 4 s): BLUNDERSTORY + SUBSCRIBE + người dẫn vẫy · không hứa đề tài · tiếng: nhạc kết
    [K.END, (t, X) => { const Xf = K.END + 0.3; g.fillStyle = '#14233B'; g.fillRect(0, 0, W, H); g.fillStyle = RED; g.fillRect(0, 0, W, 26); g.fillRect(0, H - 26, W, 26);
      g.save(); g.translate((1 - easeOut(clamp(t / 0.4))) * -900, 0);
      S.label('BLUNDERSTORY', 650, 330, 112, 1, '#FFFFFF', { stroke: '#0B1424', free: true });
      g.fillStyle = RED; g.strokeStyle = '#0B1424'; g.lineWidth = 8; g.beginPath(); g.roundRect(360, 440, 560, 130, 30); g.fill(); g.stroke();
      g.fillStyle = '#FFFFFF'; g.font = '900 68px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SUBSCRIBE', 640, 506);
      g.fillStyle = '#F3C61B'; g.beginPath(); g.arc(1010, 506, 40, Math.PI, 0); g.lineTo(1050, 540); g.lineTo(970, 540); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(1010, 552, 12, 0, 7); g.fill(); g.stroke();
      S.label('NEXT TIME: ANOTHER TINY MISTAKE', 640, 720, 52, 1, '#C9D3E3', { free: true }); g.restore();
      narrator(1480, 1080, 800, { outfit: 'plain', mood: 'smug', arms: 'wave', t: Xf, mouth: X < K.END + 0.1 ? mouthAt(X) : 'rest', look: -1 }); }],
  ];
};
