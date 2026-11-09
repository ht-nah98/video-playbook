// a6 — The ranking (670–712 s) + Outro (713–731 s) + thẻ kết.
// Bảng tier list S→D (lời hứa title B): khay 9 thẻ ẢNH THẬT ở đáy, người dẫn (tuỳ tùng, mắt "epic") cầm bút xếp từng thẻ đúng lúc lời nhắc:
// trường mỹ thuật → D, quán bia → D, Battle of Britain → B, Dunkirk → A, D-Day → B, Liên Xô + Mỹ → S. Thẻ Potsdam + Stalingrad ở lại khay
// (lời không xếp). Câu chốt "fight the whole world at once" → Hitler nhỏ giữa vòng tròn mũi tên.
// Kết: ẢNH THẬT D-Day + Dover (tôn trọng, không đùa) → gag chốt "Mein Führer… are we sure?" / "NEIN." → tranh màu nước + dấu REJECTED, Hitler trẻ
// mếu → THẺ KẾT BLUNDERSTORY + SUBSCRIBE đứng yên ≥ 4 s.
import * as S from '../../_kit/stage.js';
import { narrator } from '../../_kit/narrator.js';
import { famous } from '../../_kit/famous.js';
import { INK } from '../../_kit/mapkit.js';
import { bg, big, say, aide, card, CARDS, fade, YOUNG } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { which: 'So, which was his worst', bottom: 'Down at the bottom', beer: 'The beer hall goes low', changing: 'Changing targets in the Battle', sleeping: 'Sleeping in on D-Day',
    top: 'And at the very top', moment: "That's the moment the most", people: 'The people who stopped him', helped: 'But they were also helped', except: 'Except, maybe, that art school.' };
  const T = { art: wd(L.bottom, 'art'), beer: ST(L.beer) + 0.5, britain: wd(L.changing, 'britain'), dunkirk: wd(L.changing, 'dunkirk'), dday: ST(L.sleeping) + 0.5,
    soviet: wd(L.top, 'soviet'), states: wd(L.top, 'states'), world: wd(L.moment, 'world'), no: wd(L.helped, 'no') };
  const ROWS = [['S', '#E2463A'], ['A', '#F08A2E'], ['B', '#F2C230'], ['C', '#7CC46A'], ['D', '#5AA0E0']];
  // [thẻ, hàng, cột, giờ xếp]
  const PLACE = [['watercolor', 4, 0, T.art, 'ART SCHOOL'], ['beerhall', 4, 1, T.beer, 'BEER HALL'], ['potsdam', 3, 0, T.beer + 1.0, 'THE "PLAN"'], ['blitz', 2, 0, T.britain, 'BRITAIN'], ['dunkirk', 1, 0, T.dunkirk, 'DUNKIRK'], ['stalingrad', 1, 1, T.dday - 0.9, 'STALINGRAD'], ['dday', 2, 1, T.dday, 'D-DAY'], ['barbmap', 0, 0, T.soviet, 'USSR'], ['arizona', 0, 1, T.states, 'WAR ON USA']];
  const slot = (r, c) => [370 + c * 230, 130 + r * 170], home = i => [150 + i * 150, 1005];
  function board(X) { bg('#26272D'); ROWS.forEach(([lab, col], i) => { const y = 50 + i * 170; g.fillStyle = '#34363E'; g.fillRect(60, y, 1180, 160); g.fillStyle = col; g.fillRect(60, y, 160, 160); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(60, y, 1180, 160);
      g.fillStyle = INK; g.font = '900 100px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lab, 140, y + 86); });
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(60, 940, 1400, 130);
    CARDS.forEach((k, i) => { const p = PLACE.find(q => q[0] === k), [hx, hy] = home(i); if (!p) { card(k, hx, hy, 130); return; } const u = easeOut(clamp((X - p[3]) / 0.6)), [sx, sy] = slot(p[1], p[2]);
      card(k, lerp(hx, sx, u), lerp(hy, sy, u) - Math.sin(u * Math.PI) * 120, lerp(130, 200, u), 0, 1 + 0.15 * Math.sin(u * Math.PI)); if (u >= 1) { g.fillStyle = 'rgba(14,14,16,0.82)'; g.fillRect(sx - 94, sy + 26, 188, 34); g.fillStyle = '#FFF'; g.font = '800 21px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(p[4], sx, sy + 44); } }); }
  return [
    // 93–98 · bảng xếp hạng: người dẫn mắt "epic" cầm bút đánh dấu bên phải · tiếng: mỗi thẻ một "cộp"
    [ST(L.which), (t, X) => { board(X); const placing = PLACE.some(p => X > p[3] - 0.1 && X < p[3] + 0.6); aide(1560, 1060, 560, { outfit: 'officer', mood: 'side', mouth: 'flat', arms: 'point', mirror: true });
      if (t < 2.2) big('RANKED', 1590, 190, 90, '#FFE04A', { k: t / 0.4 }); }],
    // 99 · "fight the whole world at once": Hitler bé giữa, mũi tên từ bốn phía chĩa vào · tiếng: trống dồn
    [ST(L.moment), (t, X) => { bg('#3A4460'); famous(960, 760, 360, 'hitler', { eyes: 'shock', mouth: 'o' }); const k = fade(X, T.world - 0.8, 0.8);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r0 = 900 - 380 * ease(k); g.save(); g.translate(960 + Math.cos(a) * r0, 560 + Math.sin(a) * r0 * 0.6); g.rotate(a + Math.PI); g.fillStyle = RED; g.strokeStyle = INK; g.lineWidth = 6;
        g.beginPath(); g.moveTo(80, 0); g.lineTo(-20, -40); g.lineTo(-20, -16); g.lineTo(-90, -16); g.lineTo(-90, 16); g.lineTo(-20, 16); g.lineTo(-20, 40); g.closePath(); g.fill(); g.stroke(); g.restore(); }
      S.label('THE WHOLE WORLD. AT ONCE.', 960, 1020, 60, fade(X, T.world - 0.2), '#FFE04A', { stroke: INK }); }],
    // 100 · tôn trọng: hai ẢNH THẬT (D-Day + tàu về Dover) cạnh nhau, chữ "COURAGE · SACRIFICE" · không đùa · tiếng: nhạc trầm
    [ST(L.people), (t, X) => { bg('#1C1D22'); S.photo(IM.p_dday, 560, 470, 760, fade(t, 0.2), { rot: -0.02 }); S.photo(IM.p_dover, 1380, 520, 760, fade(t, 1.2), { rot: 0.025 });
      S.credit('Photos: D-Day, US Coast Guard / NARA · Dover 1940, IWM H1637 (public domain)'); S.label('COURAGE · SACRIFICE', 960, 1000, 60, fade(t, 2.4, 0.5), '#E8E2D2', { free: true }); }],
    // 101 · gag chốt: người dẫn "Mein Führer… are we sure?" → đúng "no": Hitler "NEIN." quay lưng · tiếng: dấu
    [ST(L.helped), (t, X) => { bg('#C9C2B0'); famous(1240, 1060, 640, 'hitler', { eyes: X > T.no - 0.3 ? 'angry' : 'dot', mouth: X > T.no - 0.3 ? 'o' : null, arms: ['down', 'orate'] });
      aide(560, 1060, 560, { mood: 'sus', mouth: 'wavy' }); say('Mein Führer… are we sure?', 560, 300, 560, 470, fade(t, 0.6), 38); say('NEIN.', 1240, 240, 1160, 420, fade(X, T.no - 0.3, 0.2), 60); }],
    // 102 · "Except, maybe, that art school." — ẢNH THẬT tranh màu nước + dấu REJECTED, Hitler trẻ (thường phục) mếu · tiếng: dấu + một nốt piano
    [ST(L.except), (t, X) => { bg('#E8E2D2'); S.photo(IM.p_watercolor, 760, 470, 820, 1, { rot: -0.03 }); S.stamp('REJECTED', 760, 470, 120, fade(t, 0.5, 0.4)); famous(1520, 1060, 620, 'hitler', { ...YOUNG, eyes: 'sad', mouth: 'frown' }); }],
    // THẺ KẾT (K.END → K.DUR, đứng yên ≥ 4 s): BLUNDERSTORY + SUBSCRIBE + người dẫn vẫy tay, đội mũ sĩ quan · tiếng: sting PD
    [K.END, (t, X) => { g.fillStyle = '#14233B'; g.fillRect(0, 0, W, H); g.fillStyle = RED; g.fillRect(0, 0, W, 26); g.fillRect(0, H - 26, W, 26);
      g.save(); g.translate((1 - easeOut(clamp(t / 0.4))) * -900, 0); S.label('BLUNDERSTORY', 650, 330, 112, 1, '#FFFFFF', { stroke: '#0B1424', free: true });
      g.fillStyle = RED; g.strokeStyle = '#0B1424'; g.lineWidth = 8; g.beginPath(); g.roundRect(360, 440, 560, 130, 30); g.fill(); g.stroke();
      g.fillStyle = '#FFFFFF'; g.font = '900 68px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SUBSCRIBE', 640, 506);
      g.fillStyle = '#F3C61B'; g.beginPath(); g.arc(1010, 506, 40, Math.PI, 0); g.lineTo(1050, 540); g.lineTo(970, 540); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(1010, 552, 12, 0, 7); g.fill(); g.stroke();
      S.label('ARE WE SURE? YES. SUBSCRIBE.', 640, 720, 50, 1, '#C9D3E3', { free: true }); g.restore();
      narrator(1500, 1040, 760, { v: 'B', outfit: 'officer', mood: 'wink', mouth: 'grin', arms: 'wave', t }); }],
  ];
};
