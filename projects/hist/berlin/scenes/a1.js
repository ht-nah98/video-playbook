// a1 — A city cut in half (55–110 s). Brief: ../BRIEF-SCENES.md. Mọi mốc theo TỪ (wd).
// Người dẫn: cameo nhập vai #1 = hành khách tàu điện ngầm đọc báo giả vờ (ở "subway"), không nhép miệng ở hồi này.
// Sơ đồ 4 khu (Đức + Berlin) là SƠ ĐỒ tay vẽ, không phải biên giới thật.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { FLAGS, view, drawMap, mapFace, bubble, ll, INK } from '../../_kit/mapkit.js';
import { SK } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;
const kin = (X, t0, d = 0.25) => clamp((X - t0) / d);
const ZC = { us: '#4A78C2', uk: '#E0B64A', fr: '#4FA66A', ru: '#C2343A' };
const FLG = { us: ['#B22234', '#FFFFFF', '#3C3B6E'], uk: ['#C8102E', '#FFFFFF', '#012169'], fr: ['#0055A4', '#FFFFFF', '#EF4135'], ru: ['#CC0000', '#CC0000', '#CC0000'] };

/** cờ đơn giản hoá vẽ đè lên ô cờ của folk: kind us|uk|fr|ru, (x, y) góc trên trái */
function drawFlag(kind, x, y, w, h) { g.save(); g.translate(x, y);
  if (kind === 'us') { for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? '#FFFFFF' : '#B22234'; g.fillRect(0, i * h / 7, w, h / 7 + 0.5); }
    g.fillStyle = '#3C3B6E'; g.fillRect(0, 0, w * 0.45, h * 4 / 7); g.fillStyle = '#FFF'; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { g.beginPath(); g.arc(w * (0.09 + c * 0.13), h * (0.14 + r * 0.2), h * 0.05, 0, 7); g.fill(); } }
  else if (kind === 'uk') FLAGS['United Kingdom'](g, [0, 0, w, h]);
  else if (kind === 'fr') { ['#1F3F8F', '#FFFFFF', '#D52B1E'].forEach((c, i) => { g.fillStyle = c; g.fillRect(i * w / 3, 0, w / 3 + 0.5, h); }); }
  else { g.fillStyle = '#CC0000'; g.fillRect(0, 0, w, h); g.strokeStyle = '#F2C500'; g.lineWidth = h * 0.09; g.beginPath(); g.arc(w * 0.22, h * 0.33, h * 0.17, Math.PI * 0.6, Math.PI * 2.1); g.stroke(); g.fillStyle = '#F2C500'; g.fillRect(w * 0.14, h * 0.14, w * 0.2, h * 0.07); }
  g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(0, 0, w, h); g.restore(); }
/** folk cầm cờ nước `kind` (tilt xoay cả người lẫn cờ) */
function folkFlag(kind, x, y, h, o = {}) { C.folk(x, y, h, { ...o, flag: ['#CC0000'], wave: 0 });
  const bw = h * 0.42, bh = h * 0.58, fx = x + bw * 0.66, ft = y - bh * 1.32 - h * 0.3;
  g.save(); if (o.tilt) { g.translate(x, y); g.rotate(o.tilt); g.translate(-x, -y); } drawFlag(kind, fx, ft, h * 0.32, h * 0.2); g.restore(); }

/** vali: x giữa, y đế, w rộng */
function suitcase(x, y, w, col = '#8A5A33') { const h = w * 0.7; g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.04); g.fillStyle = col;
  g.beginPath(); g.roundRect(x - w / 2, y - h, w, h, w * 0.08); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(x - w * 0.18, y - h); g.lineTo(x - w * 0.18, y - h - w * 0.1); g.lineTo(x + w * 0.18, y - h - w * 0.1); g.lineTo(x + w * 0.18, y - h); g.stroke();
  g.fillStyle = '#D9B13B'; g.fillRect(x - w * 0.3, y - h * 0.55, w * 0.08, h * 0.1); g.fillRect(x + w * 0.22, y - h * 0.55, w * 0.08, h * 0.1); g.restore(); }

export default K => { const { IM, M, LT, wd, ST } = K; g = K.g;
  const L10 = 'After World War Two', L11 = 'It was like four roommates', L12 = 'Pretty soon', L13 = 'West Berlin was left', L14 = 'And East Germans', L15 = 'Before nineteen sixty-one', L16 = 'Imagine running';
  const T = { four: wd(L10, 'four'), zones: wd(L10, 'zones'), berlin: wd(L10, 'berlin'), inside: wd(L10, 'inside'), split: wd(L10, 'split', 1), four2: wd(L10, 'four', 1),
    r4: wd(L11, 'four'), roomm: wd(L11, 'roommates'), apt: wd(L11, 'apartment'), middle: wd(L11, 'middle'), house: wd(L11, 'house'), only: wd(L11, 'only'),
    along: wd(L12, 'along'), american: wd(L12, 'american'), west: wd(L12, 'west'), soviet: wd(L12, 'soviet'), east: wd(L12, 'east'),
    wb: wd(L13, 'berlin'), island: wd(L13, 'island'), hundred: wd(L13, 'hundred'), miles: wd(L13, 'miles'), comm: wd(L13, 'communist'),
    germans: wd(L14, 'germans'), govt: wd(L14, 'government'), hated: wd(L14, 'hated'), leaving: wd(L14, 'leaving'),
    nineteen: wd(L15, 'nineteen'), three: wd(L15, 'three'), million: wd(L15, 'million'), left: wd(L15, 'left'), roughly: wd(L15, 'roughly'), one: wd(L15, 'one'), five: wd(L15, 'five'), many: wd(L15, 'many'), subway: wd(L15, 'subway'), west2: wd(L15, 'west'),
    imagine: wd(L16, 'imagine'), citizens: wd(L16, 'citizens'), quit: wd(L16, 'quit'), catching: wd(L16, 'catching'), train: wd(L16, 'train') };

  // ── sơ đồ Đức 4 khu: chỉ tô, không chữ năm ──
  const poly = (V, pts) => { g.beginPath(); pts.forEach(([lo, la], i) => { const p = ll(M, lo, la); i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }); g.closePath(); g.fill(); };
  function zones(V, k = [1, 1, 1, 1]) {                                                // k = [us, uk, fr, ru] 0..1 độ hiện
    const paint = (name, fn) => { g.save(); V.apply(g); g.clip(M.path[name]); fn(); g.restore(); };
    g.save(); g.globalAlpha = k[0]; paint('West Germany', () => { g.fillStyle = ZC.us; poly(V, [[5, 47], [15, 47], [15, 56], [5, 56]]); }); g.restore();
    g.save(); g.globalAlpha = k[1]; paint('West Germany', () => { g.fillStyle = ZC.uk; poly(V, [[5, 50.9], [11.2, 50.9], [11.2, 56], [5, 56]]); }); g.restore();
    g.save(); g.globalAlpha = k[2]; paint('West Germany', () => { g.fillStyle = ZC.fr; poly(V, [[5, 47], [9.4, 47], [9.4, 50.9], [5, 50.9]]); }); g.restore();
    g.save(); g.globalAlpha = k[3]; paint('East Germany', () => { g.fillStyle = ZC.ru; poly(V, [[9, 47], [16, 47], [16, 56], [9, 56]]); }); g.restore();
    g.save(); V.apply(g); g.strokeStyle = INK; g.lineWidth = 2.5 / V.s; g.stroke(M.path['West Germany']); g.stroke(M.path['East Germany']); g.restore(); }

  // ── căn hộ 4 phòng (toạ độ gốc ở GIỮA căn hộ, 900 × 560) trong ngôi nhà to ──
  /** o: s (cỡ), cx, cy, pop (số người đã xuất hiện), house (0..1), merge (0..1), moods, east (nhãn Đông), west (nhãn Tây) */
  function flat(o) { const s = o.s, hw = 450, hh = 280;
    g.save(); g.translate(o.cx, o.cy); g.scale(s, s); g.lineJoin = 'round'; g.lineCap = 'round';
    if (o.house > 0) { g.save(); g.globalAlpha = o.house; g.fillStyle = '#E8CDC2'; g.strokeStyle = INK; g.lineWidth = 9;
      g.beginPath(); g.moveTo(-860, 440); g.lineTo(-860, -430); g.lineTo(0, -640); g.lineTo(860, -430); g.lineTo(860, 440); g.closePath(); g.fill(); g.stroke();   // nhà + mái
      g.fillStyle = '#B3262C'; g.beginPath(); g.moveTo(-900, -420); g.lineTo(0, -670); g.lineTo(900, -420); g.lineTo(0, -600); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#8A6A4A'; g.fillRect(-860, 440, 1720, 40); g.strokeRect(-860, 440, 1720, 40);
      g.restore(); }
    const rooms = [['us', -hw / 2, -hh / 2], ['uk', hw / 2, -hh / 2], ['fr', -hw / 2, hh / 2], ['ru', hw / 2, hh / 2]];
    g.fillStyle = '#F4EAD2'; g.strokeStyle = INK; g.lineWidth = 12; g.fillRect(-hw, -hh, 2 * hw, 2 * hh);
    const m = o.merge ?? 0; for (const [k, rx, ry] of rooms) { g.fillStyle = k === 'ru' ? '#F2D5CF' : '#DDE8F2'; if (k === 'ru' || m > 0) g.fillRect(rx - hw / 2 + 6, ry - hh / 2 + 6, hw - 12, hh - 12); }
    g.strokeRect(-hw, -hh, 2 * hw, 2 * hh);
    g.lineWidth = 10; g.beginPath(); g.moveTo(0, -hh); g.lineTo(0, -hh * m); g.moveTo(-hw, 0); g.lineTo(-hw * m, 0); g.moveTo(0, 0); g.lineTo(0, hh); g.moveTo(0, 0); g.lineTo(hw, 0); g.stroke();   // vách: merge rút 3 vách phía Tây
    g.fillStyle = '#7A5B3A'; g.fillRect(-hw, hh - 6, 2 * hw, 14);
    const order = ['us', 'uk', 'fr', 'ru'], tag = { us: 'US', uk: 'UK', fr: 'FR', ru: 'USSR' };
    rooms.forEach(([k, rx, ry], i) => { const kp = o.pop > i ? 1 : 0; if (!kp) return;
      const mood = o.moods?.[k] ?? 'dot', ang = mood === 'angry', base = ry + hh / 2 - 22;
      folkFlag(k, rx, base, 200, { skin: SK, coat: 'plain', eyes: mood, mouth: ang ? 'o' : null, tilt: ang ? 0.04 * Math.sin((o.t ?? 0) * 12 + i) : 0 });
      g.save(); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.font = '900 30px Archivo, sans-serif'; g.textAlign = 'center'; g.fillStyle = INK; g.fillText(tag[k], rx - hw / 2 + 56, ry - hh / 2 + 44); g.restore(); });
    if (o.owner) { const k = o.owner; g.save(); g.globalAlpha = clamp(k * 2); folkFlag('ru', -690, 440, 360, { skin: SK, coat: 'plain', eyes: 'happy' }); g.restore(); }
    g.restore(); }

  // ── toa tàu điện ngầm cắt ngang ──
  function subway(X, t0) { const sw = Math.sin(X * 7) * 3, sy = Math.sin(X * 11) * 2;
    g.save(); g.translate(sw, sy);
    g.fillStyle = '#8F9BA8'; g.fillRect(-10, -10, W + 20, H + 20); g.fillStyle = '#6F7B88'; g.fillRect(0, 880, W, 200);
    g.strokeStyle = INK; g.lineWidth = 6;
    for (let i = 0; i < 4; i++) { const wx = 90 + i * 470; g.fillStyle = '#15171C'; g.fillRect(wx, 250, 380, 260); g.strokeRect(wx, 250, 380, 260);   // cửa sổ + đường hầm
      g.save(); g.beginPath(); g.rect(wx, 250, 380, 260); g.clip(); for (let j = 0; j < 4; j++) { const lx = ((wx + 480 - ((X - t0) * 520 + j * 240)) % 480 + 480) % 480 + wx - 40; g.fillStyle = '#FFE08A'; g.fillRect(lx, 290, 70, 12); g.fillRect(lx, 450, 70, 10); } g.restore(); }
    g.fillStyle = '#D9D4C6'; g.fillRect(0, 80, W, 100); g.strokeRect(-10, 80, W + 20, 100);                                         // biển dải trên
    const lit = X >= T.west2 && Math.floor((X - T.west2) * 3) % 2 === 0;
    g.fillStyle = lit ? '#FFE08A' : '#2A2E35'; g.fillRect(700, 96, 520, 68); g.strokeRect(700, 96, 520, 68); g.fillStyle = lit ? INK : '#F4F1E8'; g.font = '900 44px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('TO WEST BERLIN', 960, 132); g.textBaseline = 'alphabetic';
    for (const x of [300, 1620]) { g.strokeStyle = '#D8D8DC'; g.lineWidth = 14; g.beginPath(); g.moveTo(x, 190); g.lineTo(x, 900); g.stroke(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); }
    g.restore(); }

  return [
    // S10 · bản đồ Đức: 4 khu bật lần lượt ở "four zones" → phóng sát Berlin ("deep inside the Soviet zone") → vòng tròn Berlin chia 4 ở "split Berlin into four" · không người dẫn · tiếng: pop từng khu, zoom vút, "snap" bốn khoang
    [ST(L10), (t, X) => { const zk = clamp((X - T.berlin + 0.4) / 2.2), z = lerp(3.3, 15, ease(zk));
      const cx = lerp(10.6, 13.4, ease(zk)), cy = lerp(51.2, 52.5, ease(zk)), V = view(M, { cx, cy, zoom: z });
      drawMap(g, M, V, { fill: { 'West Germany': '#EDE6D3', 'East Germany': '#EDE6D3' } });
      const k = [kin(X, T.four, 0.3), kin(X, T.four + 0.25, 0.3), kin(X, T.four + 0.5, 0.3), kin(X, T.zones, 0.3)]; zones(V, k);
      const B = V.pt(ll(M, 13.4, 52.5));
      if (X < T.four - 0.1) S.label('GERMANY, 1945', 960, 130, 78, kin(X, wd(L10, 'two'), 0.3), '#1E2328', { stroke: '#FFF' });
      if (X >= wd(L10, 'winners') && X < T.berlin) [['US', 'us'], ['UK', 'uk'], ['FR', 'fr'], ['USSR', 'ru']].forEach(([n, kk], i) => { const kc = kin(X, wd(L10, 'winners') + i * 0.18, 0.25), cx = 150 + i * 170;
        if (kc > 0) { g.save(); g.translate(cx, 960); g.scale(back(kc), back(kc)); g.fillStyle = ZC[kk]; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(-70, -40, 140, 80, 16); g.fill(); g.stroke(); g.restore(); S.label(n, cx, 975, 40, kc, '#FFF', { stroke: INK, free: true }); } });
      if (X < T.berlin + 0.5) { const lab = [['US', 11.3, 48.9, k[0]], ['UK', 8.4, 52.6, k[1]], ['FR', 7.9, 48.4, k[2]], ['USSR', 12.4, 51.9, k[3]]];   // tâm từng khu (US = Bavaria)
        for (const [n, lo, la, kk] of lab) { const p = V.pt(ll(M, lo, la)); S.label(n, p[0], p[1], 52, kk, '#FFF', { stroke: INK, free: true }); } }
      if (X >= T.berlin) { const kb = kin(X, T.berlin, 0.35); g.save(); g.strokeStyle = '#FFF'; g.lineWidth = 8; g.beginPath(); g.arc(B[0], B[1], 40 / Math.max(kb, 0.01) * 0.6 * (1 + 0.5 * (1 - kb)) * (z > 8 ? 0 : 1), 0, 7); g.stroke(); g.restore();
        g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(B[0], B[1], 14 * kb, 0, 7); g.fill(); g.stroke(); }
      if (X >= T.inside) { const R = 190 * ease(clamp((X - T.inside) / 0.6)), sp = ease(clamp((X - T.split) / 0.5)); g.save(); g.translate(B[0], B[1]);
        g.fillStyle = ZC.ru; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
        if (sp > 0) { const secs = [['ru', -0.785, 0.785], ['us', 0.785, 2.356], ['uk', 2.356, 3.927], ['fr', 3.927, 5.498]]; for (const [kk, a0, a1] of secs) { g.fillStyle = ZC[kk]; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R, a0, lerp(a0, a1, sp)); g.closePath(); g.fill(); } }
        g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, R, 0, 7); g.stroke(); if (sp > 0) { g.lineWidth = 6; g.beginPath(); for (let i = 0; i < 4; i++) { g.moveTo(0, 0); g.lineTo(Math.cos(0.785 + i * 1.5708) * R * sp, Math.sin(0.785 + i * 1.5708) * R * sp); } g.stroke(); } g.restore();
        S.label('BERLIN', B[0], B[1] + 300, 70, kin(X, T.inside, 0.3), '#FFF', { stroke: INK }); } }],

    // S11 · căn hộ 4 phòng, 4 bạn cùng phòng (cờ 4 nước) → camera lùi ra thấy NGÔI NHÀ to chỉ một người (cờ đỏ) ở · tiếng: pop từng người, "whoomp" lùi camera, "ting" nhỏ ở "only"
    [ST(L11), (t, X) => { g.fillStyle = '#CFE0EA'; g.fillRect(0, 0, W, H); g.fillStyle = '#9DB58A'; g.fillRect(0, 960, W, 120);
      const zk = ease(clamp((X - T.middle) / 1.3)), s = lerp(1.45, 0.82, zk), cy = lerp(590, 600, zk);
      const pop = X >= T.r4 + 0.9 ? 4 : X >= T.r4 + 0.6 ? 3 : X >= T.r4 + 0.3 ? 2 : X >= T.r4 ? 1 : 0;
      flat({ s, cx: 960, cy, pop, house: zk, owner: kin(X, T.only, 0.3), t: X });
      if (X < T.middle) S.label('FOUR ROOMMATES', 960, 120, 84, kin(X, T.roomm, 0.3), '#1E2328', { stroke: '#FFF' });
      else S.label('ONLY ONE LIVES HERE', 960, 100, 76, kin(X, T.only, 0.3), '#FFF', { stroke: INK }); }],

    // S12 · hết hợp: phòng giận nhau → ba phòng phía Tây nhập một (WEST GERMANY), phòng cuối thành EAST GERMANY mặt giận · tiếng: cãi nhau lầm rầm, "ka-chunk" vách rút ở "west"
    [ST(L12), (t, X) => { g.fillStyle = '#CFE0EA'; g.fillRect(0, 0, W, H);
      const mg = ease(clamp((X - T.west) / 0.8)), ang = X >= T.along - 0.6, rus = X >= T.east - 0.1;
      flat({ s: 1.3, cx: 960, cy: 590, pop: 4, merge: mg, t: X, moods: { us: ang ? 'angry' : 'dot', uk: ang ? 'angry' : 'dot', fr: ang ? 'angry' : 'dot', ru: ang ? 'angry' : 'dot' } });
      if (X >= T.west) S.label('WEST GERMANY', 520, 118, 70, kin(X, T.west, 0.3), '#FFF', { stroke: ZC.us });
      if (X >= T.east) S.label('EAST GERMANY', 1400, 118, 70, kin(X, T.east, 0.3), '#FFF', { stroke: ZC.ru });
      if (!(X >= T.west)) S.label('NOT GETTING ALONG', 960, 118, 76, kin(X, T.along - 0.4, 0.3), '#1E2328', { stroke: '#FFF' }); }],

    // S13 · Tây Berlin = đảo nhỏ phát sáng trong biển đỏ Đông Đức; thước "ABOUT 100 MI" về biên giới Tây · tiếng: "ting" neon ở "island", tick thước ở "hundred"
    [ST(L13), (t, X) => { const V = view(M, { cx: 11.9, cy: 52.0, zoom: 3.8 + 0.12 * Math.min(t, 6) });
      drawMap(g, M, V, { fill: { 'East Germany': ZC.ru, 'West Germany': '#EDE6D3' } });
      { const F0 = V.pt(ll(M, 12.6, 52.0)), F1 = V.pt(ll(M, 12.2, 51.1));   // mặt dời xuống Saxony/Thuringia (TRONG lãnh thổ) để chừa chỗ chấm Tây Berlin
        mapFace(g, M, V, 'East Germany', { mood: X >= T.comm ? 'smug' : 'calm', t: X, dx: F1[0] - F0[0], dy: F1[1] - F0[1], k: 0.5 }); }
      const B = V.pt(ll(M, 13.4, 52.52)), kb = kin(X, T.island - 0.3, 0.35), W0 = V.pt(ll(M, 10.45, 52.52));
      if (kb > 0) { for (let i = 4; i >= 1; i--) { g.fillStyle = `rgba(255,236,150,${0.12 * kb})`; g.beginPath(); g.arc(B[0], B[1], 30 + i * 22 * kb, 0, 7); g.fill(); }
        g.fillStyle = '#FFFFFF'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.arc(B[0], B[1], 30 * back(kb), 0, 7); g.fill(); g.stroke();
        g.lineWidth = 5; g.beginPath(); g.moveTo(B[0] + 8, B[1] - 26); g.lineTo(B[0] + 8, B[1] - 100); g.stroke(); g.fillStyle = '#E8B12A'; g.fillRect(B[0] + 8, B[1] - 100, 46, 28); g.strokeRect(B[0] + 8, B[1] - 100, 46, 28); }
      S.label('WEST BERLIN', B[0] + 40, B[1] + 110, 60, kin(X, T.wb, 0.3), '#FFF', { stroke: INK });
      const kr = easeOut(clamp((X - T.hundred) / 0.5)); if (kr > 0) { const x1 = lerp(B[0] - 40, W0[0], kr), y = B[1] - 190; g.save(); g.strokeStyle = '#FFD34D'; g.lineWidth = 9; g.lineCap = 'round';
        g.beginPath(); g.moveTo(B[0] - 40, y); g.lineTo(x1, y); for (const x of [B[0] - 40, x1]) { g.moveTo(x, y - 22); g.lineTo(x, y + 22); } g.stroke(); g.restore();
        S.label('ABOUT 100 MI', (B[0] - 40 + x1) / 2, y - 40, 56, kr, '#FFD34D', { stroke: INK }); } }],

    // S14 · phố hai nửa: đoàn người Đông Đức xách vali đi về phía Tây (phải); toà nhà "chính phủ" giận dữ ở nền · tiếng: bước chân đều, "grr" ở "hated", chuông ở "leaving"
    [ST(L14), (t, X) => { const sk = g.createLinearGradient(0, 0, 0, 800); sk.addColorStop(0, '#C9D6DE'); sk.addColorStop(1, '#EDE4CF'); g.fillStyle = sk; g.fillRect(0, 0, W, H);
      g.fillStyle = '#8D8A80'; g.fillRect(0, 900, W, 180); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 900); g.lineTo(W, 900); g.stroke();
      const kg = kin(X, T.govt, 0.35), ang = X >= T.hated;                                                                     // toà nhà chính phủ + mặt giận
      g.save(); g.translate(250, 0); g.fillStyle = '#9A978C'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-170, 260, 340, 640); g.strokeRect(-170, 260, 340, 640); g.fillRect(-200, 230, 400, 40); g.strokeRect(-200, 230, 400, 40);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { g.fillStyle = '#E8E1C8'; g.fillRect(-120 + c * 90, 560 + r * 80, 56, 50); g.strokeRect(-120 + c * 90, 560 + r * 80, 56, 50); }
      if (kg > 0) { g.save(); g.globalAlpha = kg; for (const s of [-1, 1]) { g.fillStyle = '#FFF'; g.beginPath(); g.ellipse(s * 56, 420, 40, 48, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(s * 56 + (s > 0 ? -6 : 6), 430, 14, 0, 7); g.fill();
          if (ang) { g.beginPath(); g.moveTo(s * 56 - 50, 366); g.lineTo(s * 56 + 50, 366); g.lineTo(s * 56 + (s > 0 ? -50 : 50), 410); g.closePath(); g.fillStyle = '#9A978C'; g.fill(); g.stroke(); } }
        g.beginPath(); g.moveTo(-40, 500); g.quadraticCurveTo(0, ang ? 470 : 500, 40, 500); g.stroke(); g.restore(); } g.restore();
      for (let i = 0; i < 6; i++) { const x = ((t * 190 + i * 340) % 2200) - 150; const bob = Math.abs(Math.sin(t * 9 + i * 2)) * 10;                       // người đi, vali đung đưa
        C.folk(x, 960 - bob, 330, { skin: SK, coat: i % 2 ? 'plain' : 'suit', eyes: 'dot', mouth: i % 3 === 0 ? 'flat' : null, look: 1 }); suitcase(x + 82, 960 - bob + 4, 90, ['#8A5A33', '#4F6B8A', '#7A3A3A'][i % 3]); }
      S.label('EAST GERMANS', 1160, 150, 78, kin(X, T.germans, 0.3), '#1E2328', { stroke: '#FFF' });
      if (X >= T.leaving) S.label('LEAVING', 1160, 290, 120, kin(X, T.leaving, 0.2), RED, { stroke: '#FFF' }); }],

    // S15a · bộ đếm 3,500,000 nền tối (lăn ở "three and a half million") · tiếng: tích số lăn, "ding" ở "million"
    [ST(L15), (t, X) => { g.fillStyle = '#151518'; g.fillRect(0, 0, W, H);
      const rows = 5, k = clamp((X - T.three) / 1.8);
      for (let r = 0; r < rows; r++) for (let c = 0; c < 26; c++) { const i = r * 26 + c; if (hash(i + 5) > k * 1.05) continue; const x = 90 + c * 68 + (r % 2) * 30, y = 640 + r * 74; g.fillStyle = `rgba(210,210,215,${0.22 + 0.15 * hash(i)})`; g.beginPath(); g.arc(x, y, 20, 0, 7); g.fill(); }
      const kn = ease(clamp((X - T.three) / Math.max(0.3, T.million + 0.2 - T.three))), v = Math.round(3500000 * kn), str = v.toLocaleString('en-US'), pop = X > T.three && X < T.million + 0.5 ? 1 + 0.04 * Math.abs(Math.sin(X * 28)) : 1;
      g.save(); g.translate(960, 440); g.scale(pop, pop); S.label(str, 0, 0, 210, kin(X, T.three, 0.2), '#FFF', { stroke: RED, free: true }); g.restore();
      S.label('BEFORE 1961', 960, 170, 64, kin(X, T.nineteen, 0.25), '#FFD34D', { stroke: INK });
      if (X >= T.left) S.label('LEFT', 960, 580, 70, kin(X, T.left, 0.25), '#BDBDC2'); }],

    // S15b · "1 IN 5": năm người đứng hàng, một người xách vali bước ra khỏi hàng ở "one" · tiếng: bước chân, "pop" ở "five"
    [T.roughly - 0.1, (t, X) => { g.fillStyle = '#E9E3D3'; g.fillRect(0, 0, W, H); g.fillStyle = '#BFB8A4'; g.fillRect(0, 900, W, 180);
      const ko = ease(clamp((X - T.one) / 0.9));
      for (let i = 0; i < 5; i++) { const x = 360 + i * 270, out = i === 2 ? ko : 0;
        const sc = 1 + 0.18 * out; C.folk(x + out * 60, 960 + out * 80, 380 * sc, { skin: SK, coat: i === 2 ? 'suit' : 'plain', eyes: i === 2 ? 'happy' : 'dot', look: i === 2 ? 1 : 0 });
        if (i === 2) suitcase(x + out * 60 + 96 * sc, 964 + out * 80, 100 * sc); }
      S.label('1 IN 5', 960, 190, 150, kin(X, T.one, 0.25), RED, { stroke: '#FFF' });
      S.label('PEOPLE IN THE COUNTRY', 960, 330, 52, kin(X, T.five + 0.2, 0.3), '#1E2328'); }],

    // S15c · NGƯỜI DẪN NHẬP VAI #1: hành khách tàu điện ngầm ôm vali, che mặt sau tờ báo, vali kẹp chân, giữa các hành khách khác · tiếng: tàu chạy ù, "ding-dong" ở "west berlin"
    [T.many - 0.1, (t, X) => { subway(X, T.many);
      const xs = [380, 700, 1220, 1540];
      xs.forEach((x, i) => { C.folk(x, 950, 400, { skin: SK, coat: i % 2 ? 'plain' : 'suit', eyes: 'dot', mouth: 'flat', look: i < 2 ? 1 : -1 }); suitcase(x + 100, 954, 110, ['#4F6B8A', '#7A3A3A', '#8A5A33', '#556B4F'][i]); });
      narrator(960, 950, 380, { v: 'B', outfit: 'plain', arms: 'rest', mood: 'smug', look: 1, mouth: 'rest', t: X });
      g.save(); g.translate(960, 850); g.rotate(-0.04); g.fillStyle = '#F4F1E8'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-120, -110, 240, 220); g.strokeRect(-120, -110, 240, 220);   // tờ báo che nửa mặt
      g.fillStyle = '#4A4A4A'; g.fillRect(-90, -84, 180, 18); g.fillStyle = '#9A978C'; for (let i = 0; i < 6; i++) g.fillRect(-90, -40 + i * 26, 70 + 100 * hash(i + 2), 10); g.restore();
      suitcase(960, 958, 130, '#6B4A2A');
      g.strokeStyle = INK; g.lineWidth = 4; for (const x of [920, 1000]) { g.beginPath(); g.moveTo(x, 880); g.lineTo(x, 958); g.stroke(); } }],

    // S16a · nước Đông Đức hỏi "WHERE'D EVERYONE GO?" (bản đồ nhìn gần, mặt buồn) · tiếng: gió vắng, "hmm" nhỏ
    [ST(L16), (t, X) => { const V = view(M, { cx: 12.4, cy: 51.6, zoom: 4.2 }); drawMap(g, M, V, { fill: { 'East Germany': 'flag' } });
      const a = mapFace(g, M, V, 'East Germany', { mood: X >= T.citizens ? 'sad' : 'calm', t: X, look: [Math.sin(X * 2), 0] });
      if (a) bubble(g, "WHERE'D EVERYONE GO?", a.x + 300, a.y - 250, a.x, a.y - 60, kin(X, T.citizens, 0.3), 46); }],

    // S16b · vé tàu to "ONE WAY" với nút QUIT đỏ ấn xuống ở "quit"; tàu chạy ngang đáy ở "catching a train" · tiếng: "click" nút, còi tàu ở "train"
    [T.quit - 0.15, (t, X) => { g.fillStyle = '#D8D2C0'; g.fillRect(0, 0, W, H); g.fillStyle = '#A9A08A'; g.fillRect(0, 880, W, 200);
      const kt = easeOut(clamp((X - T.quit) / 0.4)), press = X >= T.quit + 0.35 ? 1 : 0;
      g.save(); g.translate(960, 380 - (1 - kt) * 700); g.rotate(-0.04); g.fillStyle = '#FBF3DA'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.roundRect(-480, -190, 960, 380, 24); g.fill(); g.stroke();
      g.setLineDash([14, 14]); g.lineWidth = 4; g.beginPath(); g.moveTo(-260, -170); g.lineTo(-260, 170); g.stroke(); g.setLineDash([]);
      g.fillStyle = INK; g.font = '900 44px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('ONE', -370, -20); g.fillText('WAY', -370, 40);
      g.fillStyle = '#8E1F25'; g.beginPath(); g.roundRect(-190, -110 + 14, 600, 220, 40); g.fill(); g.fillStyle = RED; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(-190, -110 + 14 * press, 600, 220, 40); g.fill(); g.stroke();
      g.fillStyle = '#FFF'; g.font = '900 120px Archivo, sans-serif'; g.textBaseline = 'middle'; g.fillText('QUIT', 110, 8 + 14 * press); g.restore();
      const kk = ease(clamp((X - T.catching) / 1.6)), tx = lerp(-1700, 1200, kk);                                                                                // đoàn tàu
      g.save(); g.translate(tx, 0); g.strokeStyle = INK; g.lineWidth = 6; for (let i = 0; i < 3; i++) { const x = i * 560; g.fillStyle = '#4F6B8A'; g.beginPath(); g.roundRect(x, 700, 530, 190, 16); g.fill(); g.stroke();
        g.fillStyle = '#F4F1E8'; for (let w = 0; w < 4; w++) { g.fillRect(x + 36 + w * 120, 730, 80, 70); g.strokeRect(x + 36 + w * 120, 730, 80, 70); }
        g.fillStyle = INK; for (const wx of [60, 440]) { g.beginPath(); g.arc(x + wx, 900, 26, 0, 7); g.fill(); } } g.restore(); }],
  ];
};
