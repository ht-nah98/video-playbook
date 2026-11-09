// a7 — Japan hits snooze too (425–476 s). Cân hai phía: mặt Nhật trên bản đồ toát mồ hôi → bến tàu sân bay trống "?" → ẢNH THẬT kho dầu +
// xưởng tháng 10/1941 (PD) dấu UNTOUCHED, tàu được trục lên → tờ "DECLARATION OF WAR (sort of)" → hai đồng hồ 1:00 PM ↔ 7:30 AM →
// sứ quán: NGƯỜI DẪN nhập vai nhân viên gõ máy chữ một ngón, khóc mếu → hai nhà ngoại giao mũ chóp trao giấy lúc 2:20, khói Pearl trong khung →
// mặt Mỹ bật dậy giận dữ "SNEAK ATTACK".
import * as S from '../../_kit/stage.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, ll, country, ANCHOR, SIZE, INK } from '../../_kit/mapkit.js';
import { P, alarm, battleship, carrier, sea, telegram, fade, SK } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, M, wd, ST } = K;
  const L = { but: 'But Japan had its own', big: 'The big prize', ign: 'And the Japanese pilots ignored', decl: 'Then there was the declaration', note: 'That note was supposed',
    long: 'But the long message', time: 'By the time they handed', which: 'Which is how a surprise' };
  const T = { carriers: wd(L.big, 'carriers'), away: wd(L.big, 'away'), tanks: wd(L.ign, 'tanks'), yards: wd(L.ign, 'yards'), raised: wd(L.ign, 'raised'), sort: wd(L.decl, 'sort'),
    one: wd(L.note, 'one'), bombs: wd(L.note, 'bombs'), typed: wd(L.long, 'typed'), slowly: wd(L.long, 'slowly'), late: wd(L.long, 'late'), hour: wd(L.time, 'hour'), sneak: wd(L.which, 'sneak'), angry: wd(L.which, 'angry') };
  function face(V, n, lon, lat, o = {}) { const a0 = ANCHOR[n], s0 = SIZE[n]; ANCHOR[n] = [lon, lat]; SIZE[n] = (o.r ?? 70) * 28 / (26 * V.s); const r = country(g, M, V, n, o); ANCHOR[n] = a0; SIZE[n] = s0; return r; }
  const sweat = (x, y, s) => { g.save(); g.fillStyle = '#9AD0F5'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y - s); g.bezierCurveTo(x + s * 0.7, y, x + s * 0.6, y + s * 0.6, x, y + s * 0.6); g.bezierCurveTo(x - s * 0.6, y + s * 0.6, x - s * 0.7, y, x, y - s); g.fill(); g.stroke(); g.restore(); };
  const harbor = X => { g.fillStyle = '#C9D6DE'; g.fillRect(0, 0, W, 520); sea(520, X, '#7FA6BE'); g.fillStyle = '#B5AA90'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(0, 760, W, 320); g.strokeRect(-10, 760, W + 20, 330); };

  return [
    // 1 · bản đồ: mặt Nhật cười rồi toát mồ hôi · không người dẫn · tiếng: "glup"
    [ST(L.but), (t, X) => { const V = view(M, { cx: 140, cy: 36, zoom: 3.2 }); drawMap(g, M, V, { fill: { 'Empire of Japan': '#E8A0A0' } }); const f = face(V, 'Empire of Japan', 138.5, 36.6, { mood: 'shock', arms: 'down' });
      if (f) sweat(f.x + 90, f.y - 60, 30); S.label('JAPAN\'S TINY MISTAKES', 960, 980, 64, 1, '#FFFFFF', { stroke: INK }); }],
    // 2 · bến tàu sân bay ở Pearl: ba chỗ neo TRỐNG, dấu "?" — "ALL 3 CARRIERS: AWAY" · không người dẫn · tiếng: gió vắng
    [ST(L.big), (t, X) => { harbor(X); for (let i = 0; i < 3; i++) { const x = 380 + i * 580; g.save(); g.setLineDash([22, 16]); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(x - 230, 560, 460, 140); g.restore();
        S.label('?', x, 670, 110, fade(X, ST(L.big) + 0.3 + i * 0.3, 0.3), RED, { stroke: '#FFF' }); S.label(['ENTERPRISE', 'LEXINGTON', 'SARATOGA'][i], x, 820, 44, fade(X, T.carriers, 0.3), INK, { stroke: '#FFF' }); }
      S.label('ALL 3 U.S. CARRIERS: AWAY', 960, 180, 70, fade(X, ST(L.big) + 0.3, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 3a · ẢNH THẬT căn cứ tàu ngầm + bồn dầu (10/1941, PD), dấu UNTOUCHED · không người dẫn · tiếng: "ding" nhẹ
    [ST(L.ign), (t, X) => { if (IM.p_tanks) S.photoBg(IM.p_tanks, t, { zoom: 1.05 }); else { g.fillStyle = '#556'; g.fillRect(0, 0, W, H); } S.credit('Photo: U.S. Navy, 13 Oct 1941, 80-G-182880 (public domain)');
      S.label('FUEL TANKS · REPAIR YARDS', 960, 160, 64, fade(X, T.tanks - 0.2, 0.3), '#FFFFFF', { stroke: INK }); S.stamp('UNTOUCHED', 960, 560, 110, clamp((X - T.yards) / 0.4)); }],
    // 3b · cần cẩu trục thiết giáp hạm lên khỏi nước, "FIXED" · không người dẫn · tiếng: xích kéo "kẽo kẹt"
    [T.raised - 0.4, (t, X) => { harbor(X); const k = ease((X - T.raised + 0.4) / 2.5);
      g.save(); g.strokeStyle = INK; g.lineWidth = 10; g.fillStyle = '#D4A62A'; g.fillRect(1350, 160, 40, 620); g.strokeRect(1350, 160, 40, 620); g.fillRect(820, 150, 600, 36); g.strokeRect(820, 150, 600, 36);
      const sy = lerp(800, 600, k); g.beginPath(); g.moveTo(960, 186); g.lineTo(960, sy - 260); g.stroke(); g.restore();
      battleship(960, sy, 760, { col: '#8E959C', sink: (1 - k) * 0.5 }); S.stamp('FIXED · BACK TO SEA', 960, 900, 64, clamp((X - T.raised - 1.2) / 0.4)); }],
    // 4 · tờ "DECLARATION OF WAR" + chữ viết tay "(sort of)" · người dẫn góc · tiếng: "hmm"
    [ST(L.decl), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); telegram(760, 540, 760, -0.04, { title: 'DECLARATION OF WAR', seed: 4 });
      S.label('(sort of)', 900, 860, 80, fade(X, T.sort - 0.1, 0.3), RED, { rot: -0.1, free: true }); S.lipHost(X, 1, { h: 460 }); }],
    // 5 · hai đồng hồ: WASHINGTON 1:00 PM ↔ HAWAII 7:30 AM, chữ "BOMBS: 7:55" · không người dẫn · tiếng: tích tắc
    [ST(L.note), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); alarm(560, 470, 220, { time: [13, 0], label: 'DELIVER: 1:00 PM' }); g.save(); g.globalAlpha = fade(X, T.one, 0.3); alarm(1360, 470, 220, { time: [7, 30], label: 'HAWAII: 7:30 AM' }); g.restore();
      S.label('BOMBS: 7:55', 960, 980, 70, fade(X, T.bombs - 0.2, 0.3), RED, { stroke: '#FFF' }); }],
    // 6 · sứ quán Nhật ở Washington: NGƯỜI DẪN nhập vai nhân viên gõ máy chữ MỘT NGÓN, nước mắt chảy, giấy chất đống; đồng hồ trôi qua 1:00 · tiếng: gõ phím chậm "cạch… cạch"
    [ST(L.long), (t, X) => { g.fillStyle = '#E2DAC4'; g.fillRect(0, 0, W, H); g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(0, 760, W, 320); g.strokeRect(-10, 760, W + 20, 330);
      g.save(); g.translate(980, 700); g.fillStyle = '#2A2C33'; g.fillRect(-260, -80, 520, 160); g.strokeRect(-260, -80, 520, 160); g.fillStyle = '#FBF8EE'; g.fillRect(-180, -330, 360, 260); g.strokeRect(-180, -330, 360, 260);
      g.fillStyle = INK; g.font = '700 22px "Courier New", monospace'; const txt = 'THE GOVERNMENT OF JAPAN'; g.fillText(txt.slice(0, Math.floor(clamp(t / 7) * txt.length)), -160, -280);
      for (let i = 0; i < 18; i++) { g.fillStyle = '#C9C2B0'; g.beginPath(); g.arc(-220 + (i % 9) * 55, -30 + Math.floor(i / 9) * 50, 18, 0, 7); g.fill(); g.stroke(); } g.restore();
      for (let i = 0; i < 6; i++) { g.fillStyle = '#FBF8EE'; g.fillRect(1180, 700 - i * 22, 300, 20); g.strokeRect(1180, 700 - i * 22, 300, 20); } S.label('14 PARTS', 1330, 520, 44, 1, INK);
      narrator(560, 1080, 560, { outfit: 'suit', arms: 'point', mood: 'teary', mouth: 'pout', look: 1 });
      const mm = Math.round(lerp(50, 80, clamp(t / 8))); alarm(1700, 220, 120, { time: [12 + Math.floor(mm / 60), mm % 60] }); S.label('TYPED… SLOWLY', 960, 120, 60, fade(X, T.slowly - 0.2, 0.3), RED, { stroke: '#FFF' }); }],
    // 7 · Nomura + Kurusu mũ chóp cao trao giấy, đồng hồ 2:20 PM, khung nhỏ ảnh Arizona cháy · không người dẫn · tiếng: cửa mở, im
    [ST(L.time), (t, X) => { g.fillStyle = '#D9D1BC'; g.fillRect(0, 0, W, H); g.fillStyle = '#9A8B74'; g.fillRect(0, 820, W, 260);
      P.nomura(560, 1080, 560, { look: 1, mouth: 'flat' }); P.kurusu(860, 1080, 560, { look: 1, mouth: 'flat' }); telegram(1080, 900, 200, 0.1, { title: 'NOTE' });
      alarm(1550, 240, 130, { time: [14, 20], label: '2:20 PM' });
      if (IM.p_arizona) { const k = fade(X, T.hour - 0.6, 0.4); g.save(); g.globalAlpha = k; g.fillStyle = '#FFF'; g.fillRect(1240, 520, 560, 380); g.drawImage(IM.p_arizona, 1255, 535, 530, 350); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(1240, 520, 560, 380); g.restore();
        S.label('PEARL HARBOR: BURNING FOR AN HOUR', 1520, 960, 36, k, '#FFFFFF', { stroke: INK }); } }],
    // 8 · bản đồ: mặt Mỹ bật dậy giận, đồng hồ reo, chữ "SNEAK ATTACK" · không người dẫn · tiếng: chuông báo thức + tiếng "hừ" đám đông
    [ST(L.which), (t, X) => { const V = view(M, { cx: 232, cy: 36, zoom: 1.8 }); drawMap(g, M, V, { fill: { 'United States': '#9FC3E8' } });
      face(V, 'United States', 254, 40, { mood: X > T.angry - 0.3 ? 'angry' : 'sleepy', arms: X > T.angry - 0.3 ? 'up' : 'down', r: 90, t: X });
      alarm(560, 420, 160, { time: [8, 0], ring: 1, t: X }); S.label('SNEAK ATTACK', 900, 900, 110, fade(X, T.sneak - 0.1, 0.3), RED, { stroke: '#FFF' }); }],
  ];
};
