// a2 — Paradise, Sunday edition (115–181 s). Sáu tàu sân bay rời vịnh sương mù, im vô tuyến → điện "war warning" (Hải quân) +
// "hostile action" (Lục quân) → Tướng Short soi kính lúp tìm gián điệp → máy bay đỗ sát cánh, kho đạn khoá → "một gã cầm cờ-lê"
// vs bóng máy bay → Chủ nhật ngủ nướng (NGƯỜI DẪN nhập vai: thuỷ thủ ngủ võng, mũ ngủ) → hàng thiết giáp hạm + radar "4–7 AM" → đồng hồ.
import * as S from '../../_kit/stage.js';
import { narrator, hatOn } from '../../_kit/narrator.js';
import { view, drawMap, ll, INK } from '../../_kit/mapkit.js';
import { P, alarm, battleship, carrier, plane, sea, telegram, fade, SK, OD } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, M, wd, ST } = K;
  const L = { nov: 'On November twenty-sixth', next: 'The next day, Washington', army: 'The Army got its own', sounds: 'That sounds pretty clear', so: 'So to protect his planes',
    which: 'Which is a great way', sun: 'And on Sunday mornings', bat: 'Battleships lined up', every: 'Everyone had set', they: "They just weren't" };
  const T = { six: wd(L.nov, 'six'), silence: wd(L.nov, 'silence'), dispatch: wd(L.next, 'dispatch'), warning: wd(L.next, 'warning'), hostile: wd(L.army, 'hostile'),
    sabotage: wd(L.sounds, 'sabotage'), spies: wd(L.sounds, 'spies'), wingtip: wd(L.so, 'wingtip'), ammo: wd(L.so, 'ammunition'), wrench: wd(L.which, 'wrench'), raid: wd(L.which, 'raid'),
    sleep: wd(L.sun, 'sleep'), row: wd(L.bat, 'row'), leave: wd(L.bat, 'leave'), radar: wd(L.bat, 'radar'), four: wd(L.bat, 'four'), alarm: wd(L.every, 'alarm'), up: wd(L.they, 'up') };

  /** bàn đọc điện: tờ giấy đánh máy lớn có câu thật; người đọc bên phải */
  function cable(X, title, line1, line2, who, kHi) { g.fillStyle = '#3B3A30'; g.fillRect(0, 0, W, H); g.fillStyle = '#5A4632'; g.fillRect(0, 760, W, 320);
    g.save(); g.translate(720, 520); g.rotate(-0.03); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-520, -380, 1040, 720); g.strokeRect(-520, -380, 1040, 720);
    g.fillStyle = INK; g.font = '700 40px "Courier New", monospace'; g.textAlign = 'left'; g.fillText(title, -470, -300);
    g.fillStyle = '#9A978C'; for (let i = 0; i < 3; i++) g.fillRect(-470, -240 + i * 46, 700 + 160 * hash(i + 3), 10);
    if (kHi > 0) { g.fillStyle = `rgba(255,224,74,${0.7 * kHi})`; g.fillRect(-480, -70, 960 * kHi, 150); }
    g.fillStyle = INK; g.font = '700 54px "Courier New", monospace'; g.fillText(line1, -470, -10); g.fillText(line2, -470, 60);
    g.fillStyle = '#9A978C'; for (let i = 0; i < 4; i++) g.fillRect(-470, 140 + i * 46, 600 + 260 * hash(i + 11), 10); g.restore();
    who(); }
  /** sân bay nhìn từ trên: hàng máy bay sát cánh; o.spread 0..1 (giãn ra), o.shadow bóng máy bay địch */
  function apron(X, o = {}) { g.fillStyle = '#A9B48C'; g.fillRect(0, 0, W, H); g.fillStyle = '#C9C3B0'; g.fillRect(0, 300, W, 520);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 11; i++) { const x = 160 + i * (150 + 60 * (o.spread ?? 0)), y = 400 + r * 150; topPlane(x, y, 150); }
    if (o.lock) { g.save(); g.translate(1700, 900); g.fillStyle = '#6B5A3A'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-130, -70, 260, 140); g.strokeRect(-130, -70, 260, 140);
      g.fillStyle = INK; g.font = '900 34px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('AMMO', 0, 12); g.fillStyle = '#D8B84A'; g.beginPath(); g.roundRect(-34, -110, 68, 60, 10); g.fill(); g.stroke();
      g.beginPath(); g.arc(0, -110, 24, Math.PI, 0); g.lineWidth = 10; g.stroke(); g.restore(); } }
  function topPlane(x, y, s) { g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#9EA6A0';
    g.beginPath(); g.ellipse(0, 0, s * 0.1, s * 0.42, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-s * 0.5, -s * 0.12, s, s * 0.16, s * 0.05); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(-s * 0.2, s * 0.3, s * 0.4, s * 0.08, s * 0.03); g.fill(); g.stroke(); g.fillStyle = '#2B4C9B'; g.beginPath(); g.arc(-s * 0.32, -s * 0.04, s * 0.05, 0, 7); g.fill(); g.restore(); }

  return [
    // 1a · vịnh sương mù phương bắc: 6 tàu sân bay Nhật lần lượt ra khơi · không người dẫn · tiếng: gió lạnh, còi tàu trầm
    [ST(L.nov), (t, X) => { g.fillStyle = '#AEB8BF'; g.fillRect(0, 0, W, H); g.fillStyle = '#8E9AA2'; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(i * 480 - 100, 560); g.lineTo(i * 480 + 140, 300 + 60 * hash(i)); g.lineTo(i * 480 + 420, 560); g.fill(); }
      sea(560, X, '#6F8794'); for (let i = 0; i < 6; i++) { const k = ease((X - ST(L.nov) - i * 0.35) / 2.5); if (k <= 0) continue; carrier(lerp(-400, 230 + i * 300, k), 720 + (i % 2) * 150, 430, { flag: 'jp' }); }
      g.fillStyle = 'rgba(230,235,238,0.45)'; for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse((hash(i) * W + X * 20) % (W + 400) - 200, 520 + 300 * hash(i + 4), 420, 60, 0, 0, 7); g.fill(); }
      S.label('26 NOV 1941 · KURIL ISLANDS', 960, 150, 64, fade(X, ST(L.nov) + 0.4, 0.3), '#FFFFFF', { stroke: INK });
      if (X > T.silence - 0.2) { const k = fade(X, T.silence - 0.2, 0.3); g.save(); g.translate(1640, 330); g.globalAlpha = k; g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 110, 0, 7); g.fill(); g.stroke();
        g.fillStyle = INK; g.fillRect(-12, -60, 24, 90); for (const r of [40, 70]) { g.beginPath(); g.arc(0, -60, r, -2.4, -0.7); g.stroke(); } g.strokeStyle = RED; g.lineWidth = 16; g.beginPath(); g.moveTo(-80, -80); g.lineTo(80, 80); g.stroke(); g.restore();
        S.label('RADIO SILENCE', 1640, 500, 46, k, INK, { stroke: '#FFF' }); } }],
    // 2 · điện Hải quân: "THIS DISPATCH IS TO BE CONSIDERED A WAR WARNING" (câu thật), Đô đốc Kimmel đọc · không người dẫn · tiếng: máy telex lạch cạch
    [ST(L.next), (t, X) => cable(X, 'TO: NAVY, HAWAII · 27 NOV 1941', 'THIS DISPATCH IS TO BE', 'CONSIDERED A WAR WARNING.', () => P.kimmel(1620, 1080, 640, { look: -1, mouth: 'o' }), fade(X, T.warning - 0.3, 0.6))],
    // 3 · điện Lục quân: "HOSTILE ACTION POSSIBLE AT ANY MOMENT", Tướng Short đọc · không người dẫn · tiếng: telex
    [ST(L.army), (t, X) => cable(X, 'TO: ARMY, HAWAII · 27 NOV 1941', 'HOSTILE ACTION POSSIBLE', 'AT ANY MOMENT.', () => P.short(1620, 1080, 640, { look: -1, mouth: 'flat' }), fade(X, T.hostile - 0.2, 0.6))],
    // 4 · Short cầm kính lúp, bóng "gián điệp" nhỏ cầm cờ-lê trong vòng kính · không người dẫn · tiếng: "hmm" + nhạc rón rén
    [ST(L.sounds), (t, X) => { g.fillStyle = '#E9E2CF'; g.fillRect(0, 0, W, H); g.fillStyle = '#C9C0A8'; g.fillRect(0, 860, W, 220);
      const R = P.short(620, 1080, 820, { look: 1, mouth: 'flat' }); const k = fade(X, ST(L.sounds) + 0.8, 0.5);
      g.save(); g.globalAlpha = k; g.strokeStyle = INK; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(800, 700); g.lineTo(1040, 520); g.stroke(); g.fillStyle = SK; g.lineWidth = 6; g.beginPath(); g.arc(800, 700, 34, 0, 7); g.fill(); g.stroke(); g.lineWidth = 16;
      g.fillStyle = 'rgba(200,230,245,0.5)'; g.lineWidth = 16; g.beginPath(); g.arc(1220, 360, 230, 0, 7); g.fill(); g.stroke();
      g.save(); g.beginPath(); g.arc(1220, 360, 220, 0, 7); g.clip(); g.fillStyle = '#1B1B1F'; g.beginPath(); g.arc(1220, 300, 60, 0, 7); g.fill(); g.fillRect(1170, 350, 100, 160);
      g.fillStyle = '#FFF'; for (const s of [-1, 1]) { g.beginPath(); g.arc(1220 + s * 22, 296, 9, 0, 7); g.fill(); } g.strokeStyle = '#8E959C'; g.lineWidth = 14; g.beginPath(); g.moveTo(1270, 420); g.lineTo(1340, 360); g.stroke(); g.restore(); g.restore();
      S.label('SPIES?', 1220, 680, 80, fade(X, T.spies, 0.3), RED, { stroke: '#FFF' }); }],
    // 5 · sân bay từ trên: máy bay đỗ sát cánh 3 hàng, rương đạn khoá móc · không người dẫn · tiếng: tiếng khoá "cạch"
    [ST(L.so), (t, X) => { apron(X, { lock: X > T.ammo - 0.2 }); S.label('WINGTIP TO WINGTIP', 960, 180, 76, fade(X, T.wingtip, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 6 · MEME vẽ lại khuôn hai ô "chê / duyệt": ô trên người dẫn quay mặt chê "STOPPING AN AIR RAID", ô dưới người dẫn đắc ý chỉ
    //     "STOPPING ONE GUY WITH A WRENCH" (ô dưới hiện ở "wrench", ô trên ở "raid") · người dẫn là nhân vật meme · tiếng: "ding", "bonk"
    [ST(L.which), (t, X) => { g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, W, H); g.strokeStyle = INK; g.lineWidth = 8;
      const cell = (y, on, draw, txt) => { g.save(); g.globalAlpha = on ? 1 : 0.3; g.fillStyle = '#F2C94C'; g.fillRect(0, y, 760, 540); g.save(); g.beginPath(); g.rect(0, y, 760, 540); g.clip(); draw(); g.restore();
        g.strokeRect(0, y, 760, 540); g.fillStyle = INK; g.font = '900 64px Archivo, sans-serif'; g.textAlign = 'left'; txt.forEach((l, k) => g.fillText(l, 840, y + 230 + k * 80)); g.restore(); };
      cell(0, X > T.raid - 0.2, () => narrator(380, 640, 620, { outfit: 'plain', arms: 'cover', mood: 'angry', mouth: 'pout', look: 1 }), ['STOPPING', 'AN AIR RAID']);
      cell(540, X > ST(L.which) + 0.3, () => narrator(380, 1180, 620, { outfit: 'plain', arms: 'point', mood: 'smug', mouth: 'grin', look: 1, fx: ['shine'] }), ['STOPPING ONE GUY', 'WITH A WRENCH']);
      g.beginPath(); g.moveTo(0, 540); g.lineTo(W, 540); g.stroke(); }],
    // 7 · Chủ nhật: khoang ngủ trên tàu, giường tầng — NGƯỜI DẪN NHẬP VAI thuỷ thủ ngủ nướng giường dưới, bạn cùng tàu ngủ giường trên · tiếng: ngáy + sóng
    [ST(L.sun), (t, X) => { g.fillStyle = '#C9C2AE'; g.fillRect(0, 0, W, H); g.fillStyle = '#A99F88'; g.fillRect(0, 900, W, 180);
      g.fillStyle = '#DCE6EA'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(1680, 220, 90, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#F2C79A'; g.beginPath(); g.arc(1680, 220, 70, 0, 7); g.fill();   // ô cửa sổ tròn, bình minh
      const bunk = y => { g.fillStyle = '#7A8188'; g.fillRect(260, y, 1200, 40); g.strokeRect(260, y, 1200, 40); g.fillStyle = '#EDE8DA'; g.fillRect(270, y - 34, 1180, 34); g.strokeRect(270, y - 34, 1180, 34);
        g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(400, y - 60, 110, 40, 0, 0, 7); g.fill(); g.stroke(); };
      g.fillStyle = '#5E646A'; g.fillRect(250, 120, 30, 800); g.fillRect(1440, 120, 30, 800); bunk(430); bunk(860);
      const lie = (fx, fy, h, neck, draw) => { g.save(); g.translate(fx, fy); g.rotate(-Math.PI / 2); draw(h); g.restore();
        g.fillStyle = '#5C7FB5'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(fx - h * neck, fy - h * 0.24, h * (neck + 0.06), h * 0.46, 30); g.fill(); g.stroke(); };   // chăn phủ thân, đầu lộ
      lie(860, 280, 560, 0.5, h => P.sailor(0, 0, h, { eyes: 'happy', mouth: 'o' }));
      lie(788, 722, 520, 0.34, h => narrator(0, 0, h, { outfit: 'plain', mood: 'closed', mouth: 'o' }));
      S.label('SUNDAY MORNING', 860, 150, 70, fade(X, T.sleep - 0.3, 0.3), '#FFFFFF', { stroke: INK }); S.label('z Z Z', 1660, 520, 70, fade(X, T.sleep, 0.3), '#FFFFFF', { stroke: INK, rot: -0.15 }); }],
    // 8 · hàng thiết giáp hạm thẳng tắp (vẽ phẳng) dưới bình minh; rồi biển "RADAR: 4–7 AM ONLY" · không người dẫn · tiếng: chuông tàu nhẹ
    [ST(L.bat), (t, X) => { g.fillStyle = '#F2C79A'; g.fillRect(0, 0, W, 560); sea(560, X, '#7FA6BE');
      for (let i = 0; i < 6; i++) battleship(240 + i * 290, 660 + (i % 2) * 18, 380, { col: '#8E959C' }); S.label('BATTLESHIP ROW', 960, 150, 70, fade(X, T.row - 0.3, 0.3), '#FFFFFF', { stroke: INK });
      if (X > T.radar - 0.3) { const k = fade(X, T.radar - 0.3, 0.3); g.save(); g.globalAlpha = k; g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 8; g.font = '900 72px Archivo, sans-serif'; const tw = g.measureText('RADAR: 4–7 AM ONLY').width + 90; g.beginPath(); g.roundRect(960 - tw / 2, 820, tw, 170, 24); g.fill(); g.stroke();
        g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('RADAR: 4–7 AM ONLY', 960, 905); g.restore(); } }],
    // 9 · đồng hồ báo thức đã đặt (kim báo đỏ) — "they weren't planning to get up": snooze · người dẫn góc nói · tiếng: "tick tock"
    [ST(L.every), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); alarm(820, 560, 260, { time: [6, 30], snooze: X > T.up - 0.1 ? ease((X - T.up + 0.1) / 0.2) : 0 });
      S.label('ALARM SET', 820, 160, 64, fade(X, T.alarm, 0.3), INK); S.lipHost(X, 1, { h: 500 }); }],
  ];
};
