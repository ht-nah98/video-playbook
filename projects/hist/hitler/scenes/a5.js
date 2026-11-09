// a5 — Do not disturb (597–642 s) + The bunker (643–669 s).
// D-Day lần 2: lịch lật về 6/6/1944 → ẢNH THẬT xe tăng hơi giả (PD) + bản đồ mũi tên giả chỉ Calais → phòng ngủ: Hitler ngủ, người dẫn rón rén
// treo biển DO NOT DISTURB → Rommel ôm bánh sinh nhật vợ → bản đồ: xe tăng lên đường bị máy bay bổ nhào → ép hai phía Đông / Tây, Paris "FREE".
// Hầm: mặt cắt — thành phố đổ nát trên, hầm bê tông dưới, Hitler đẩy quân cờ trên bản đồ (quân cờ mờ dần = quân không còn) → lính Liên Xô trên
// đường phố → ẢNH THẬT báo "HITLER DEAD" (Stars & Stripes, PD) + ẢNH THẬT Jodl ký đầu hàng (NARA, PD) → đổ nát, "TENS OF MILLIONS" (nghiêm).
import * as S from '../../_kit/stage.js';
import { famous } from '../../_kit/famous.js';
import { folk } from '../../_kit/cast.js';
import { INK } from '../../_kit/mapkit.js';
import { bg, big, say, aide, coast, ev, P, city, arw, tank, plane, bed, doc, tray, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { back: 'Which brings us back', months: 'For months, the Allies', when: 'So when the landings began', rommel: "Germany's most famous general", tanks: 'The tank reserves finally got',
    paris: 'Two months later, Paris', spring: 'By the spring of nineteen forty-five', soviet: 'Soviet troops were fighting', april: 'On April thirtieth', war: 'The war he started' };
  const T = { inflatable: wd(L.months, 'inflatable'), calais: wd(L.months, 'calais'), sleep: wd(L.when, 'sleep'), birthday: wd(L.rommel, 'birthday'), planes: wd(L.tanks, 'planes'), east: wd(L.paris, 'east'),
    existed: wd(L.spring, 'existed'), himself: wd(L.april, 'himself'), surrendered: wd(L.april, 'surrendered'), ruins: wd(L.war, 'ruins'), millions: wd(L.war, 'millions') };
  const cake = (x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#F6E2B8'; g.fillRect(-90, -70, 180, 70); g.strokeRect(-90, -70, 180, 70); g.fillStyle = '#F7B7C8'; g.fillRect(-90, -80, 180, 22); g.strokeRect(-90, -80, 180, 22);
    for (let i = 0; i < 3; i++) { g.fillStyle = '#4A8FE0'; g.fillRect(-46 + i * 40, -130, 12, 50); g.strokeRect(-46 + i * 40, -130, 12, 50); g.fillStyle = '#F2A93B'; g.beginPath(); g.ellipse(-40 + i * 40, -142, 8, 14, 0, 0, 7); g.fill(); } g.restore(); };
  const ruinsTop = (y) => { g.save(); g.fillStyle = '#6E6A64'; g.strokeStyle = INK; g.lineWidth = 7; for (let i = 0; i < 9; i++) { const x = i * 220, h = 140 + 160 * hash(i + 4); g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - h); g.lineTo(x + 60, y - h + 40); g.lineTo(x + 120, y - h - 20); g.lineTo(x + 200, y - h + 60); g.lineTo(x + 200, y); g.closePath(); g.fill(); g.stroke(); } g.restore(); };
  return [
    // 83 · lịch lật nhanh về "6 JUNE 1944", nền tối · tiếng: lật lịch dồn
    [ST(L.back), (t, X) => { bg('#1F2A44'); const pages = ['JAN 1943', 'JUN 1943', 'JAN 1944', '6 JUNE 1944']; const i = Math.min(3, Math.floor(t * 1.4)); doc(960, 540, 820, 440, '', { lines: 0, col: '#FFFFFF' }); big(pages[i], 960, 560, i === 3 ? 92 : 80, i === 3 ? RED : INK, { stroke: '#FFF' }); }],
    // 84 · ẢNH THẬT xe tăng hơi giả (PD) → đúng "Calais": bản đồ mũi tên GIẢ (nét đứt) chỉ Calais, mũi tên thật vào Normandy · tiếng: bơm hơi phì
    [ST(L.months), (t, X) => { if (X < T.calais - 0.6) { S.photoBg(IM.p_dummytank, t, { zoom: 1.0 }); S.credit('Photo: inflatable dummy Sherman tank (public domain)'); S.label('FAKE ARMY · INFLATABLE TANKS', 960, 170, 64, fade(X, T.inflatable - 0.4), '#FFFFFF', { stroke: INK }); return; }
      const V = ev({ cx: 0.5, cy: 50.2, zoom: 3.2 }); coast(V); city(V, 1.86, 50.95, 'CALAIS', 1, { dy: -36 }); city(V, -0.37, 49.18, 'NORMANDY', 1); g.save(); g.setLineDash([26, 16]); arw(P(V, 0.5, 51.6), P(V, 1.7, 51.0), 1, '#8A8F98', 18, 0.1); g.restore();
      S.label('"HERE!" (FAKE)', ...P(V, 1.0, 51.9), 40, 1, '#6A6460', { stroke: '#FFF' }); }],
    // 85 · phòng ngủ: Hitler ngủ, người dẫn (tuỳ tùng) rón rén treo biển DO NOT DISTURB lên cửa, ngón tay "suỵt" · tiếng: ngáy + cót két
    [ST(L.when), (t, X) => { bg('#1F2A44'); g.fillStyle = '#F5E9B0'; g.beginPath(); g.arc(1700, 180, 60, 0, 7); g.fill(); bed(760, 660, 820, X); g.fillStyle = '#6E4A2E'; g.strokeStyle = INK; g.lineWidth = 9; g.fillRect(1320, 260, 300, 820); g.strokeRect(1320, 260, 300, 820);
      g.fillStyle = '#FFF'; g.fillRect(1360, 430, 220, 110); g.strokeRect(1360, 430, 220, 110); g.fillStyle = RED; g.font = '900 34px Archivo'; g.textAlign = 'center'; g.fillText('DO NOT', 1470, 478); g.fillText('DISTURB', 1470, 520);
      aide(1720, 1060, 520, { mood: 'closed', mouth: 'small', arms: 'cup' }); S.label('STAFF: "LET HIM SLEEP."', 760, 140, 54, fade(X, T.sleep - 0.3), '#FFFFFF', { stroke: INK }); }],
    // 86 · Rommel ôm bánh sinh nhật (vợ, 6/6) ở nhà, mũ tiệc · tiếng: kèn tiệc
    [ST(L.rommel), (t, X) => { bg('#F7E1EA'); famous(780, 1060, 720, 'rommel', { eyes: 'happy', mouth: 'smile' }); cake(1300, 820, 1.6); S.label('ERWIN ROMMEL', 420, 110, 60, fade(X, ST(L.rommel) + 0.3), INK, { stroke: '#FFF' });
      S.label("WIFE'S BIRTHDAY · 6 JUNE", 1300, 380, 50, fade(X, T.birthday - 0.4), RED, { stroke: '#FFF' }); for (let i = 0; i < 14; i++) { g.fillStyle = ['#E2463A', '#F2C230', '#4A8FE0', '#5FBF6A'][i % 4]; g.fillRect((hash(i) * W + t * 40) % W, (hash(i + 9) * 700 + t * 120) % 700, 14, 26); } }],
    // 87 · bản đồ Normandy: hàng xe tăng lên đường → đúng "planes": máy bay bổ nhào, chớp nổ trên đường · tiếng: máy bay bổ nhào + nổ
    [ST(L.tanks), (t, X) => { const V = ev({ cx: 0.5, cy: 48.9, zoom: 8 }); coast(V); city(V, -0.37, 49.18, 'CAEN', 1, { dy: -32 }); const a = P(V, 2.6, 47.9), b = P(V, -0.2, 49.1), lead = 0.75 + clamp(t / 12) * 0.1, tp = i => { const u = Math.max(0, lead - i * 0.16); return [lerp(a[0], b[0], u), lerp(a[1], b[1], u)]; }; for (let i = 0; i < 5; i++) tank(...tp(i), 0.7, { flip: true, cross: true });
      if (X > T.planes - 0.4) for (let i = 0; i < 3; i++) { const u = clamp((X - T.planes - i * 0.5) / 1.0), q = tp(i); plane(q[0] + 420 - u * 420, q[1] - 480 + u * 420, 0.7, { flip: true, rot: 0.6 }); if (u >= 1) S.flash(q[0], q[1] - 20, (X - T.planes - i * 0.5 - 1) / 0.4, 110); }
      S.label('AFTERNOON', 960, 140, 54, fade(X, ST(L.tanks) + 1.6), INK, { stroke: '#FFF' }); }],
    // 88 · bản đồ châu Âu: mũi tên Tây (Đồng minh) + Đông (Liên Xô) ép vào Đức; Paris dấu "FREE" → thẻ D-Day vào khay (9) · tiếng: hai luồng trống
    [ST(L.paris), (t, X) => { const V = ev({ cx: 14, cy: 51, zoom: 1.4 }); coast(V); city(V, 2.35, 48.86, 'PARIS'); city(V, 13.4, 52.52, 'BERLIN', 1, { dy: -32 }); S.stamp('FREE · AUG 1944', ...P(V, 2.35, 46.6), 40, fade(t, 0.6, 0.4));
      arw(P(V, 2, 49.5), P(V, 9.5, 51), fade(X, ST(L.paris) + 1.2, 1.0), '#4A8FE0', 26, 0.05); arw(P(V, 28, 52), P(V, 16.5, 52.2), fade(X, T.east - 0.4, 1.0), RED, 26, -0.05); if (X > T.east + 0.8) tray(9, (X - T.east - 0.8) / 0.7); }],

    // ── The bunker ──
    // 89 · mặt cắt: phố đổ nát trên, hầm bê tông dưới, Hitler đẩy quân cờ trên bản đồ; đúng "existed": quân cờ mờ dần như bóng ma · tiếng: tiếng nổ trầm vọng xuống
    [ST(L.spring), (t, X) => { bg('#3A3A40'); ruinsTop(380); g.fillStyle = '#8E8A80'; g.fillRect(0, 380, W, 120); g.fillStyle = '#6E6A64'; g.strokeStyle = INK; g.lineWidth = 12; g.fillRect(260, 520, 1400, 520); g.strokeRect(260, 520, 1400, 520);
      g.fillStyle = '#9DBCD2'; g.fillRect(500, 820, 760, 140); g.fillStyle = '#E9DFC6'; g.beginPath(); g.moveTo(600, 960); g.quadraticCurveTo(640, 830, 860, 840); g.quadraticCurveTo(1100, 830, 1190, 870); g.lineTo(1260, 960); g.closePath(); g.fill(); g.strokeRect(500, 820, 760, 140); const ghost = 1 - 0.75 * fade(X, T.existed - 0.4, 1.0); for (let i = 0; i < 6; i++) { g.save(); g.globalAlpha = ghost; g.fillStyle = '#2E5A9E'; g.fillRect(640 + i * 92, 860, 40, 50); g.strokeRect(640 + i * 92, 860, 40, 50); g.restore(); }
      famous(1430, 1030, 460, 'hitler', { eyes: 'angry' }); S.label('BERLIN · 1945', 960, 440, 60, fade(X, ST(L.spring) + 0.3), '#FFF', { stroke: INK }); }],
    // 90 · trên mặt đất: lính Liên Xô mũ lông tiến qua phố đổ nát (bóng đen nghiêng) · tiếng: súng + xe tăng
    [ST(L.soviet), (t, X) => { bg('#4A4A52'); ruinsTop(820); for (let i = 0; i < 7; i++) { const f = folk(200 + i * 240 + t * 40, 1000, 300, { coat: 'soldier', eyes: 'angry' }); g.save(); g.fillStyle = '#6B5440'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(f.head[0], f.head[1] - f.r * 0.1, f.r * 1.05, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(f.head[0], f.head[1] - f.r * 0.65, f.r * 0.16, 0, 7); g.fill(); g.restore(); } S.label('THE RED ARMY · BERLIN', 960, 120, 64, 1, '#FFF', { stroke: INK });
      S.flash(1500, 500, (t % 1.4) / 0.4, 120); }],
    // 91 · NGHIÊM: ẢNH THẬT báo "HITLER DEAD" (Stars & Stripes, PD) → đúng "surrendered": ẢNH THẬT Jodl ký đầu hàng (NARA, PD) · tiếng: lặng
    [ST(L.april), (t, X) => { bg('#1C1D22'); const late = X > T.surrendered - 0.3; if (!late) { S.photo(IM.p_hitlerdead, 960, 540, 560, fade(t, 0.2)); S.credit('Stars and Stripes, 2 May 1945 (public domain)'); S.nameTag('30 APRIL 1945', fade(X, T.himself - 0.6)); return; }
      S.photoBg(IM.p_jodl, X - T.surrendered, { zoom: 1.0 }); S.credit('Photo: Jodl signs the surrender, Reims, 7 May 1945, NARA (public domain)'); S.nameTag('GERMANY SURRENDERS · 7–8 MAY 1945', 1); }],
    // 92 · NGHIÊM: đổ nát xám (vẽ), dòng chữ "TENS OF MILLIONS DEAD" · không người dẫn · tiếng: gió, nhạc lặng
    [ST(L.war), (t, X) => { bg('#2A2A2E'); ruinsTop(1080); S.desat(1); S.label('TENS OF MILLIONS DEAD', 960, 360, 80, fade(X, T.millions - 0.4, 0.6), '#E8E2D2', { free: true }); S.label('EUROPE IN RUINS', 960, 480, 56, fade(X, T.ruins - 0.4, 0.6), '#9A958E', { free: true }); }],
  ];
};
