// hồi a1 · The powder keg (BRIEF-SCENES.md) — bản đồ châu Âu → căng-tin hai bàn (nước biết diễn), Áo-Hung đếm theo từ + ảnh
// Franz Joseph, Serbia trên bản đồ Balkan + ảnh chiến tranh Balkan, Bosnia chiếm → sáp nhập, gag máy cắt cỏ, Conrad (ảnh → phòng họp,
// người dẫn nhập vai #1 ngồi ngáp), bản đồ tối dần về Sarajevo. Mọi mốc theo TỪ (wd).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, cutout, bubble, INK } from '../../_kit/mapkit.js';
import { SK, AH, RS, DE, RU, FR, UK, IT } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
const SARA = [18.41, 43.86], BOS = [17.8, 44.25];
let g = null, M = null;

// ── căng-tin ──
function cafeteriaRoom() { g.fillStyle = '#E9DFC6'; g.fillRect(0, 0, W, 660); g.fillStyle = '#CDBF9F'; g.fillRect(0, 560, W, 100);
  g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 560); g.lineTo(W, 560); g.moveTo(0, 660); g.lineTo(W, 660); g.stroke();
  for (let x = 0; x < W; x += 80) for (let y = 660; y < H; y += 80) { g.fillStyle = ((x + y) / 80) % 2 ? '#D8CDB4' : '#C6B994'; g.fillRect(x, y, 80, 80); }
  g.beginPath(); g.moveTo(0, 660); g.lineTo(W, 660); g.stroke();
  for (const wx of [180, 640, 1100]) { g.fillStyle = '#A9CBE3'; g.fillRect(wx, 120, 260, 300); g.strokeRect(wx, 120, 260, 300); g.beginPath(); g.moveTo(wx + 130, 120); g.lineTo(wx + 130, 420); g.moveTo(wx, 270); g.lineTo(wx + 260, 270); g.stroke(); }
  // cửa EXIT bên phải
  g.fillStyle = '#7A5A3E'; g.fillRect(1690, 260, 190, 400); g.strokeRect(1690, 260, 190, 400); g.fillStyle = '#E8D9A0'; g.beginPath(); g.arc(1715, 470, 10, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#2E8B57'; g.fillRect(1705, 180, 160, 64); g.strokeRect(1705, 180, 160, 64); }
function table(x0, x1) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#B98A5A'; g.beginPath(); g.moveTo(x0 + 30, 740); g.lineTo(x1 - 30, 740); g.lineTo(x1, 770); g.lineTo(x0, 770); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#9A6E44'; g.fillRect(x0, 770, x1 - x0, 110); g.strokeRect(x0, 770, x1 - x0, 110);
  for (const lx of [x0 + 40, x1 - 60]) { g.fillStyle = '#5E4128'; g.fillRect(lx, 880, 20, 120); g.strokeRect(lx, 880, 20, 120); } g.restore(); }
function tray(x, y, k = 1) { if (k <= 0) return; g.save(); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#9FB0BC'; g.beginPath(); g.ellipse(x, y, 62, 12, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
/** đại bác tí hon trên khay (căng-tin "có quân đội") */
function cannon(x, y, k) { if (k <= 0) return; const s = back(k); g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 4;
  g.fillStyle = '#3A3A40'; g.save(); g.rotate(-0.35); g.beginPath(); g.roundRect(-10, -22, 70, 22, 8); g.fill(); g.stroke(); g.restore();
  g.fillStyle = '#8A6A4A'; g.beginPath(); g.arc(0, -8, 14, 0, 7); g.fill(); g.stroke(); g.restore(); }
const nameCard = (txt, x, k) => { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 3); g.font = '800 24px Archivo, sans-serif'; const w = g.measureText(txt).width + 26;
  g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 3; g.fillRect(x - w / 2, 800, w, 40); g.strokeRect(x - w / 2, 800, w, 40); g.fillStyle = INK; g.textAlign = 'center'; g.fillText(txt, x, 829); g.restore(); };

// ── bãi cỏ (gag máy cắt cỏ) ──
function house(x, col, roof) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = col; g.fillRect(x, 400, 440, 360); g.strokeRect(x, 400, 440, 360);
  g.fillStyle = roof; g.beginPath(); g.moveTo(x - 30, 400); g.lineTo(x + 220, 230); g.lineTo(x + 470, 400); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#6B4A30'; g.fillRect(x + 180, 590, 90, 170); g.strokeRect(x + 180, 590, 90, 170);
  for (const wx of [x + 50, x + 320]) { g.fillStyle = '#A9CBE3'; g.fillRect(wx, 470, 80, 80); g.strokeRect(wx, 470, 80, 80); } g.restore(); }
function mower(x, y, o = {}) { g.save(); g.translate(x, y); if (o.flip) g.scale(-1, 1); g.strokeStyle = INK; g.lineWidth = 6; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(40, -50); g.lineTo(130, -190); g.lineTo(165, -190); g.stroke();                                   // cần đẩy
  g.fillStyle = '#C2343A'; g.beginPath(); g.moveTo(-90, -20); g.lineTo(-80, -70); g.lineTo(70, -70); g.lineTo(90, -20); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#2A2A2E'; for (const wx of [-60, 60]) { g.beginPath(); g.arc(wx, -18, 22, 0, 7); g.fill(); g.stroke(); }
  if (o.flag) { g.beginPath(); g.moveTo(-40, -70); g.lineTo(-40, -70 - 120 * o.flag); g.stroke(); if (o.flag > 0.6) { g.fillStyle = '#151515'; g.fillRect(-40, -190, 70, 22); g.fillStyle = '#F3C61B'; g.fillRect(-40, -168, 70, 22); g.strokeRect(-40, -190, 70, 44); } }
  g.restore();
  // thẻ "BOSNIA" (không lật chữ)
  g.save(); g.font = '900 26px Archivo, sans-serif'; g.textAlign = 'center'; const tw = g.measureText('BOSNIA').width + 20; g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 3;
  g.fillRect(x - tw / 2, y - 62, tw, 34); g.strokeRect(x - tw / 2, y - 62, tw, 34); g.fillStyle = INK; g.fillText('BOSNIA', x, y - 36); g.restore(); }
function grass(x0, x1, y, hgt) { g.save(); g.strokeStyle = '#3F7A35'; g.lineWidth = 5; g.lineCap = 'round';
  for (let x = x0; x < x1; x += 14) { const k = x / 14, hh = hgt * (0.7 + 0.5 * hash(k)); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 6, y - hh * 0.6, x + 14 * (hash(k + 3) - 0.5) * 2, y - hh); g.stroke(); } g.restore(); }

// ── phòng họp Vienna ──
function meetingRoom() { g.fillStyle = '#4E3B2C'; g.fillRect(0, 0, W, H); g.fillStyle = '#6A4F38'; g.fillRect(0, 560, W, 520);
  g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 560); g.lineTo(W, 560); g.stroke();
  for (let x = 40; x < W; x += 260) { g.strokeStyle = '#3A2B1F'; g.lineWidth = 6; g.strokeRect(x, 90, 200, 400); }
  }
function portraitFJ(x, y) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#C9A13B'; g.fillRect(x - 110, y - 140, 220, 280); g.strokeRect(x - 110, y - 140, 220, 280);
  g.fillStyle = '#E9DFC6'; g.fillRect(x - 86, y - 116, 172, 232); g.strokeRect(x - 86, y - 116, 172, 232);
  g.beginPath(); g.rect(x - 86, y - 116, 172, 232); g.clip(); C.folk(x, y + 160, 300, { skin: SK, coat: 'austro', feat: 'fj', eyes: 'bored' }); g.restore(); }
function longTable() { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#7A4E2E'; g.beginPath(); g.moveTo(640, 770); g.lineTo(1900, 770); g.lineTo(1930, 800); g.lineTo(610, 800); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#5E3A20'; g.fillRect(610, 800, 1330, 130); g.strokeRect(610, 800, 1330, 130); g.fillStyle = '#2E7D4A'; g.fillRect(610, 800, 1330, 30); g.strokeRect(610, 800, 1330, 30); g.restore(); }
function turkey(x, y, k) { if (k <= 0) return; const s = back(k); g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 5;
  g.fillStyle = '#E9E2CF'; g.beginPath(); g.ellipse(0, 0, 150, 24, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#B5652A'; g.beginPath(); g.ellipse(0, -50, 100, 62, 0, Math.PI, 0); g.lineTo(100, -6); g.lineTo(-100, -6); g.closePath(); g.fill(); g.stroke();
  for (const sd of [-1, 1]) { g.fillStyle = '#A3561F'; g.beginPath(); g.ellipse(sd * 95, -50, 26, 40, sd * 0.6, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#FFF'; g.beginPath(); g.arc(sd * 118, -86, 10, 0, 7); g.fill(); g.stroke(); }
  g.restore(); }
/** tấm biển giơ trên đầu (hai cán từ tay) */
function sign(cx, cy, w, h, txt, size, bump = 0, handY = 600) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); for (const sd of [-1, 1]) { g.moveTo(cx + sd * w * 0.3, handY); g.lineTo(cx + sd * w * 0.3, cy + h / 2 - bump); } g.stroke(); g.translate(0, -bump);
  g.fillStyle = '#FBF8F0'; g.fillRect(cx - w / 2, cy - h / 2, w, h); g.strokeRect(cx - w / 2, cy - h / 2, w, h); g.restore();
  S.label(txt, cx, cy - bump + size * 0.35, size, 1, RED, { free: true }); }

/** ảnh tư liệu khung giấy, cắt bỏ phần dưới (chú thích in sẵn) — giữ tỉ lệ trên `keep` chiều cao */
function cropPhoto(im, cx, cy, w, keep, push = 1) { const sh = im.height * keep, h = w * sh / im.width, b = 14; g.save(); g.translate(cx, cy); g.scale(push, push);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 - b + 10, -h / 2 - b + 14, w + 2 * b, h + 2 * b); g.fillStyle = '#FBF8F0'; g.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b);
  g.drawImage(im, 0, 0, im.width, sh, -w / 2, -h / 2, w, h); g.restore(); }

export default K => { const { IM, LT, wd, ST } = K; g = K.g; M = K.M;
  const kin = (X, t0, d = 0.25) => clamp((X - t0) / d);
  const L7 = 'First, a quick tour', L8 = 'Britain, France and Russia', L9 = 'Austria-Hungary, by the way', L10 = 'Right next door', L11 = 'Serbia dreamed', L12 = 'Imagine your neighbor',
    L13 = "That's roughly how", L14 = 'Meanwhile in Vienna', L15 = 'By one count', L16 = 'And on one Sunday';
  const T = { europe: wd(L7, 'europe'), high: wd(L7, 'high'), armies: wd(L7, 'armies'),
    uk: wd(L8, 'britain'), fr: wd(L8, 'france'), ru: wd(L8, 'russia'), de: wd(L8, 'germany'), ah: wd(L8, 'austriahungary'), it: wd(L8, 'italy'), tech: wd(L8, 'technically'), eye: wd(L8, 'eyeing'), exit: wd(L8, 'exit'),
    emp1: wd(L9, 'empire'), two: wd(L9, 'two'), dozen: wd(L9, 'dozen'), old: wd(L9, 'one', 1), franz: wd(L9, 'franz'), since: wd(L9, 'since'), y48: wd(L9, 'fortyeight'),
    serbia: wd(L10, 'serbia'), small: wd(L10, 'small'), proud: wd(L10, 'proud'), fresh: wd(L10, 'fresh'), balkan: wd(L10, 'balkan'), years: wd(L10, 'years'),
    unite: wd(L11, 'uniting'), bosnia: wd(L11, 'bosnia'), ahb: wd(L11, 'austriahungary'), occ: wd(L11, 'occupied'), ann: wd(L11, 'annexed'),
    borrow: wd(L12, 'borrowing'), thirty: wd(L12, 'thirty'), announce: wd(L12, 'announcing'), his: wd(L12, 'his'), mower2: wd(L12, 'lawnmower', 1),
    felt: wd(L13, 'felt'), young: wd(L13, 'young'),
    head: wd(L14, 'head'), war: wd(L14, 'war'),
    prop: wd(L15, 'proposed'), times: wd(L15, 'times'), y13: wd(L15, 'thirteen'), uncle: wd(L15, 'uncle'), scheme: wd(L15, 'scheme'), thanks: wd(L15, 'thanksgiving'),
    sara: wd(L16, 'sarajevo'), excuse: wd(L16, 'excuse') };
  const V0 = view(M, { cx: 15, cy: 49.5, zoom: 1.05 }), VB = view(M, { cx: 19.3, cy: 44.6, zoom: 3.0 });
  const BIG6 = { [AH]: 'flag', [RS]: 'flag', [DE]: 'flag', [FR]: 'flag', [RU]: 'flag', [UK]: 'flag', [IT]: 'flag' };

  /** bản đồ Balkan dùng chung (cảnh Serbia mơ + "That's roughly") */
  function balkan(X, o = {}) { drawMap(g, M, VB, { fill: { [AH]: 'flag', [RS]: 'flag' } });
    const kb = o.kb ?? 1; if (kb > 0) { const p = S.pt(VB, ...BOS); g.save(); g.globalAlpha = clamp(kb * 3); g.strokeStyle = RED; g.lineWidth = 8; g.setLineDash([22, 14]); g.lineDashOffset = -X * 40;
      g.beginPath(); g.ellipse(p[0], p[1], 130 * back(kb), 82 * back(kb), -0.2, 0, 7); g.stroke(); g.restore(); S.label('BOSNIA', p[0], p[1] + 14, 46, kb, '#FFF', { stroke: INK }); }
    mapFace(g, M, VB, AH, { mood: o.ah ?? 'calm', look: [0, 1] });
    return mapFace(g, M, VB, RS, { mood: o.rs ?? 'calm', look: [-1, 0], k: 0.85 }); }

  return [
    // A1 · bản đồ châu Âu 1914 (cờ, mặt nước) → căng-tin trống có đại bác tí hon trên khay · người dẫn góc phải nhép (phần bản đồ)
    //      tiếng: "whoosh" bản đồ, chuông trường ở "high school", "pop" × 6 đại bác ở "armies"
    [ST(L7), (t, X) => {
      if (X < T.high - 0.05) { const V = view(M, { cx: 15, cy: 49.5, zoom: lerp(0.95, 1.05, ease(t / 2)) });
        drawMap(g, M, V, { fill: BIG6 }); for (const n of [AH, DE, FR, RU, UK, IT, RS]) mapFace(g, M, V, n, { mood: 'calm', look: [Math.sin(X + n.length), 0] });
        S.label('EUROPE, 1914', 760, 130, 80, kin(X, T.europe), '#FFF', { stroke: INK }); S.lipHost(X, clamp(t / 0.35)); return; }
      cafeteriaRoom(); S.label('EXIT', 1785, 226, 40, 1, '#FFF', { free: true }); table(100, 840); table(900, 1660);
      const xs = [220, 450, 690, 1060, 1340, 1600];
      xs.forEach((x, i) => { tray(x, 752); cannon(x - 10, 750, kin(X, T.armies + i * 0.07, 0.25)); });
      S.label('CAFETERIA', 760, 520, 64, kin(X, T.high), INK, { stroke: '#FFF' }); }],

    // A2 · căng-tin: bàn 1 Anh/Pháp/Nga, bàn 2 Đức/Áo-Hung, Ý ngồi mép bàn 2 liếc cửa EXIT · không người dẫn (cảnh diễn)
    //      tiếng: "pop" mỗi nước trồi lên ở tên nước, "hmm?" + cót két ghế khi Ý liếc cửa (eyeing the exit)
    [ST(L8), (t, X) => { cafeteriaRoom();
      const exitK = X >= T.exit ? 0.6 + 0.4 * Math.abs(Math.sin(X * 6)) : 0; if (exitK) { g.save(); g.globalAlpha = exitK * 0.6; g.fillStyle = '#7CF2A0'; g.beginPath(); g.arc(1785, 212, 120, 0, 7); g.fill(); g.restore(); }
      S.label('EXIT', 1785, 226, 40, 1, '#FFF', { free: true });
      g.save(); g.beginPath(); g.rect(0, 0, W, 800); g.clip();
      const pop = (n, x, h, t0, o) => { const k = kin(X, t0, 0.35); if (k > 0) cutout(g, M, n, x, 840 + (1 - back(k)) * 420, h, { t: X, arms: 'cross', ...o }); };
      pop(UK, 220, 290, T.uk, { mood: 'smug' }); pop(FR, 450, 300, T.fr, { mood: 'calm' }); pop(RU, 690, 330, T.ru, { mood: 'calm' });
      pop(DE, 1060, 270, T.de, { mood: 'cool' }); pop(AH, 1340, 255, T.ah, { mood: 'smug', look: [-1, 0] });
      const lean = X >= T.eye ? ease(clamp((X - T.eye) / 0.6)) : 0;
      pop(IT, 1610 + lean * 30, 290, T.it, { mood: X >= T.eye ? 'smug' : 'calm', look: X >= T.eye ? [1, -0.3] : [-1, 0], tilt: lean * 0.12, arms: 'cross' });
      g.restore();
      table(100, 840); table(900, 1660);
      [220, 450, 690, 1060, 1340].forEach(x => { tray(x, 752); cannon(x - 10, 750, 1); });
      nameCard('BRITAIN', 220, kin(X, T.uk)); nameCard('FRANCE', 450, kin(X, T.fr)); nameCard('RUSSIA', 690, kin(X, T.ru));
      nameCard('GERMANY', 1060, kin(X, T.de)); nameCard('AUSTRIA-HUNGARY', 1340, kin(X, T.ah)); nameCard('ITALY', 1600, kin(X, T.it));
      if (X >= T.tech && X < T.eye) S.label('*technically', 1560, 420, 40, kin(X, T.tech), INK, { stroke: '#FFF', rot: -0.08 });
      if (X >= T.eye) { const u = clamp((X - T.eye) / 0.5); g.save(); g.strokeStyle = RED; g.lineWidth = 6; g.setLineDash([14, 10]); g.beginPath(); g.moveTo(1650, 560); g.quadraticCurveTo(1700, 380, lerp(1650, 1740, u), lerp(560, 300, u)); g.stroke(); g.restore(); } }],

    // A3 · Áo-Hung tách bản đồ: 1 EMPIRE → 2 COUNTRIES (hai mặt cãi nhau) → ~12 LANGUAGES (bong bóng chào nhiều thứ tiếng) → 1 VERY OLD EMPEROR
    //      rồi ảnh tư liệu Franz Joseph + tên + "SINCE 1848" + mạng nhện · người dẫn góc phải nhép · tiếng: "pop" mỗi dòng đếm, lao xao tiếng nói ở "dozen languages", cót két cũ ở "since"
    [ST(L9), (t, X) => {
      if (X < T.franz - 0.05) { S.paper('#F4F1E8');
        const two = X >= T.two, babble = X >= T.dozen;
        cutout(g, M, AH, 470, 1000, 470, { t: X, arms: two ? 'hips' : 'down', mood: 'calm', two: two ? ['angry', 'angry'] : null, hop: two ? Math.abs(Math.sin(X * 8)) * 8 : 0 });
        if (babble) ['Hallo!', 'Szia!', 'Ahoj!', 'Bok!', 'Ciao!', 'Cześć!', 'Zdravo!', 'Salut!'].forEach((w, i) => bubble(g, w, 170 + (i % 4) * 220, 140 + Math.floor(i / 4) * 120 + 20 * hash(i), 470, 420, kin(X, T.dozen + i * 0.09, 0.25), 32));
        [['1 EMPIRE', T.emp1], ['2 COUNTRIES', T.two], ['~12 LANGUAGES', T.dozen], ['1 VERY OLD EMPEROR', T.old]].forEach(([s, t0], i) => S.label(s, 960, 180 + i * 98, 62, kin(X, t0, 0.25), i === 3 ? RED : INK, { align: 'left' }));
        S.lipHost(X, clamp(t / 0.35)); return; }
      S.paper('#1B1A18'); S.photo(IM.p_franzjoseph, 560, 545, 540, kin(X, T.franz, 0.2), { push: 1 + 0.015 * (X - T.franz), credit: 'Franz Joseph I, 1910 (Carl Pietzner) · public domain' });
      S.nameTag('EMPEROR FRANZ JOSEPH', kin(X, T.franz + 0.15), 940, 250);
      if (X >= T.since) { const k = kin(X, T.since, 0.5), cx = 560 + 270 + 14, cy = 545 - 754 / 2 - 14; g.save(); g.globalAlpha = 0.85 * clamp(k * 2); g.strokeStyle = '#EDEDED'; g.lineWidth = 2.5;   // mạng nhện góc khung
        for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 + i * Math.PI / 12; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * 190 * k, cy + Math.sin(a) * 190 * k); g.stroke(); }
        for (let r = 50; r <= 190 * k; r += 45) { g.beginPath(); for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 + i * Math.PI / 12; g[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.stroke(); } g.restore(); }
      S.stamp('ON THE THRONE SINCE 1848', 1290, 420, 50, clamp((X - T.since) / 0.4), -0.05);
      S.label('66 YEARS', 1180, 590, 80, kin(X, T.y48 + 0.4), RED, { stroke: '#FFF' });
      S.lipHost(X); }],

    // A4 · bản đồ Balkan zoom vào Serbia: "small" (chữ nhỏ) · "proud" (đeo kính đen, chữ to) → ảnh tư liệu bộ binh Serbia 1912 + "BALKAN WARS 1912–13", dấu "WON BOTH"
    //      người dẫn góc phải nhép (bản đồ) · tiếng: "pip" ở small, "cool" chord ở proud, trống trận xa ở "Balkan wars", dấu đóng ở "years"
    [ST(L10), (t, X) => {
      if (X < T.fresh - 0.05) { const u = ease(t / 1.4), V = view(M, { cx: lerp(15, 19.3, u), cy: lerp(49.5, 44.6, u), zoom: lerp(1.05, 3.0, u) });
        drawMap(g, M, V, { fill: { [AH]: 'flag', [RS]: 'flag' }, lift: { [RS]: X >= T.serbia ? 10 * Math.abs(Math.sin((X - T.serbia) * 6)) * clamp(1 - (X - T.serbia) / 1.2) : 0 } });
        mapFace(g, M, V, AH, { mood: 'calm', look: [0.5, 1] }); const f = mapFace(g, M, V, RS, { mood: X >= T.proud ? 'cool' : 'calm', look: [-0.6, 0], k: lerp(0.42, 0.85, u) });
        if (f) { S.label('SERBIA', f.x, f.y + f.r * 2.4, 54, kin(X, T.serbia), '#FFF', { stroke: INK });
          if (X >= T.small && X < T.proud) S.label('small', f.x + 190, f.y - 90, 30, kin(X, T.small, 0.15), INK, { stroke: '#FFF' });
          if (X >= T.proud) S.label('PROUD', f.x + 300, f.y - 170, 88, kin(X, T.proud, 0.2), RED, { stroke: '#FFF', rot: -0.08 }); }
        S.lipHost(X, clamp(t / 0.35)); return; }
      S.photoBg(IM.p_balkanwar, X - T.fresh, { desat: 0.3, dark: 0.15, fy: 0.45, credit: 'Serbian infantry, First Balkan War, 1912 · public domain' });
      S.label('BALKAN WARS 1912–13', 960, 150, 76, kin(X, T.balkan), '#FFF', { stroke: INK });
      S.stamp('WON BOTH', 1400, 820, 80, clamp((X - T.years) / 0.4), -0.07); }],

    // A5 · Balkan: Serbia mơ "SOUTH SLAVS, UNITE!", vòng nét đứt BOSNIA, dấu "OCCUPIED 1878" → "ANNEXED 1908", Serbia giận · người dẫn góc phải nhép
    //      tiếng: "pop" bong bóng (uniting), "whoosh" vòng Bosnia, dấu đóng ×2 (occupied, annexed — cái sau to hơn)
    [ST(L11), (t, X) => { const ann = X >= T.ann;
      const f = balkan(X, { kb: kin(X, T.bosnia, 0.35), ah: X >= T.ahb ? 'smug' : 'calm', rs: ann ? 'angry' : X >= T.unite ? 'smug' : 'calm' });
      if (f && X >= T.unite && X < T.occ) bubble(g, 'SOUTH SLAVS, UNITE!', f.x + 120, f.y - f.r * 3.6, f.x + 20, f.y - f.r, kin(X, T.unite, 0.25), 40);
      const p = S.pt(VB, ...BOS);
      if (X >= T.occ) S.stamp('OCCUPIED 1878', p[0] - 300, p[1] + 170, 46, clamp((X - T.occ) / 0.4), -0.08);   // trên biển Adriatic, xa mặt Serbia
      if (ann) { S.stamp('ANNEXED 1908', p[0] - 280, p[1] + 280, 60, clamp((X - T.ann) / 0.4), 0.05); if (f) S.vein(f.x + f.r * 0.9, f.y - f.r * 0.9, 1.4); }
      S.lipHost(X); }],

    // A6 · GAG máy cắt cỏ: hàng xóm (áo quan Áo) "mượn" máy cắt cỏ "BOSNIA" qua hàng rào → 30 YEARS LATER cỏ nhà chủ mọc cao → cắm cờ đen-vàng, "MINE NOW."
    //      không người dẫn · tiếng: tiếng máy cắt cỏ nổ (borrowing), lật lịch vèo (thirty years), cắm cờ "thunk" (announcing), chủ nhà giận "hmph" (lawnmower now)
    [ST(L12), (t, X) => { g.fillStyle = '#9CCAE8'; g.fillRect(0, 0, W, H); house(80, '#E8CF7A', '#8D3B32'); house(1400, '#EDE0C0', '#3E4A6B');
      g.fillStyle = '#7FB060'; g.fillRect(0, 760, W, 320); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 40; for (let y = 800; y < H; y += 90) { g.beginPath(); g.moveTo(980, y); g.lineTo(W, y); g.stroke(); }   // sọc cỏ cắt gọn nhà hàng xóm
      const tall = ease(clamp((X - T.thirty) / 1.4)); grass(0, 940, 1000, 16 + 190 * tall); grass(0, 940, 900, 12 + 120 * tall);
      // hàng rào
      g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#FBF8F0'; for (let y = 760; y < 1080; y += 64) { g.beginPath(); g.moveTo(960, y - 10); g.lineTo(990, y - 30); g.lineTo(990, y + 40); g.lineTo(960, y + 60); g.closePath(); g.fill(); g.stroke(); }
      const ub = ease(clamp((X - T.borrow) / 0.7)), mx = lerp(640, 1250, ub), my = 960 - Math.sin(ub * Math.PI) * 140 + (X >= T.thirty ? Math.abs(Math.sin(X * 10)) * 4 : 0);
      const angry = X >= T.mower2;
      C.folk(380, 1000, 400, { skin: SK, coat: 'worker', wear: 'cap', eyes: angry ? 'angry' : X >= T.thirty ? 'bored' : 'happy', mouth: angry ? 'frown' : null, look: 1 });
      if (angry) S.vein(430, 640, 1.2);
      C.folk(lerp(1120, 1520, ub), 1000, 400, { skin: SK, coat: 'austro', wear: 'kepi', eyes: X >= T.announce ? 'happy' : 'dot', look: -1, mouth: X >= T.his ? 'grin' : null });
      mower(mx, my, { flip: ub < 0.5, flag: X >= T.announce ? clamp((X - T.announce) / 0.4) : 0 });
      if (X >= T.thirty && X < T.announce) S.label('30 YEARS LATER…', 960, 150, 70, kin(X, T.thirty), INK, { stroke: '#FFF' });
      if (X >= T.his) bubble(g, 'MINE NOW.', 1580, 300, 1540, 520, kin(X, T.his, 0.25), 54); }],

    // A7 · Balkan: Serbia giận nhìn Bosnia → bờ sông Sarajevo vẽ, năm thanh niên Bosnia mắt giận (gài trước hồi sát thủ) · người dẫn góc phải nhép (bản đồ)
    //      tiếng: "grr" trầm ở "felt", gió phố ở young Bosnians
    [ST(L13), (t, X) => {
      if (X < T.young - 0.05) { const f = balkan(X, { ah: 'smug', rs: 'angry' }); if (f) S.vein(f.x + f.r * 0.9, f.y - f.r * 0.9, 1.4 + 0.15 * Math.sin(X * 12)); S.lipHost(X); return; }
      B.place('quay'); const ky = kin(X, T.young, 0.3);
      [520, 760, 1000, 1240, 1480].forEach((x, i) => { const k = kin(X, T.young + i * 0.08, 0.3); if (k > 0) C.folk(x, 1000 + (1 - back(k)) * 300, 380 + 20 * hash(i), { skin: SK, coat: i % 2 ? 'worker' : 'suit', wear: i === 2 ? 'cap' : null, eyes: 'angry' }); });
      S.label('YOUNG BOSNIANS', 960, 150, 72, ky, '#FFF', { stroke: INK }); }],

    // A8 · ảnh tư liệu Conrad + thẻ tên, dấu "WAR ON SERBIA?" · không người dẫn (ảnh tư liệu) · tiếng: dấu đóng ở "war"
    [ST(L14), (t, X) => { S.paper('#1B1A18'); cropPhoto(IM.p_conrad, 520, 500, 780, 0.77, 1 + 0.012 * t); S.credit('Franz Conrad von Hötzendorf at work · public domain');
      S.nameTag('CONRAD VON HÖTZENDORF', kin(X, T.head), 990, 330); S.nameTag('ARMY CHIEF', kin(X, T.head + 0.3), 990, 410);
      S.stamp('WAR ON SERBIA?', 1320, 530, 58, clamp((X - T.war) / 0.4), -0.04); }],   // ngay dưới thẻ tên, không chạm ảnh

    // A9 · phòng họp Vienna: Conrad (kiểu B, kepi) giơ biển "WAR ON SERBIA?", bộ đếm ×1 → ×25, hàng quan chức mắt chán; NGƯỜI DẪN NHẬP VAI #1
    //      = quan chức áo Áo ngồi giữa hàng, đảo mắt rồi ngáp; "Thanksgiving" → gà tây bật lên bàn
    //      tiếng: "tick" mỗi lần số tăng (proposed → times), dấu "1913", ngáp dài (scheme), "ta-da" gà tây (Thanksgiving)
    [ST(L15), (t, X) => { meetingRoom(); portraitFJ(1660, 300);
      const yawn = X >= T.scheme && X < T.scheme + 1.6, rollEye = X >= T.prop && X < T.scheme;
      const seats = [[800, 'kepi', 'austro'], [1040, 'top', 'suit'], [1520, 'kepi', 'austro'], [1760, 'pickel', 'german']];
      seats.forEach(([x, w, c], i) => C.folk(x, 900, 380, { skin: SK, coat: c, wear: w, eyes: X >= T.uncle ? 'bored' : 'dot', look: -1, mouth: X >= T.uncle ? 'flat' : null }));
      narrator(1280, 900, 380, { v: 'B', outfit: 'austro', mood: yawn ? 'closed' : rollEye ? 'smug' : 'smug', look: rollEye ? -1 : 0, mouth: yawn ? 'wide' : 'rest', bob: yawn ? 6 * Math.sin((X - T.scheme) * 3) : 0 });
      longTable(); g.save(); g.translate(1400, 790); g.scale(0.55, 0.55); turkey(0, 0, kin(X, T.thanks, 0.3)); g.restore();
      const bump = Math.max(0, Math.sin(X * 7)) * 14;
      C.folk(340, 1000, 520, { skin: SK, coat: 'austro', wear: 'kepi', eyes: 'angry', mouth: 'o', arm: 'up' });
      sign(340, 320, 470, 150, 'WAR ON SERBIA?', 46, bump, 604);
      if (X >= T.prop) { const n = Math.max(1, Math.min(25, 1 + Math.floor(24 * clamp((X - T.prop) / Math.max(0.4, T.times + 0.3 - T.prop))))), pop = ((X - T.prop) * 15) % 1;
        S.label(`×${n}`, 1000, 210, 130 * (n < 25 ? 1 + 0.08 * (1 - pop) : 1), 1, RED, { stroke: '#FFF' }); }
      if (X >= T.y13) S.label('IN 1913 ALONE', 1000, 310, 50, kin(X, T.y13), '#FFF', { stroke: INK }); }],

    // A10 · bản đồ châu Âu tối dần, zoom về Sarajevo, chấm đỏ nhấp nháy + "SARAJEVO", Áo-Hung cười đểu ở "excuse" · người dẫn góc phải nhép
    //       tiếng: nhịp tim trầm theo chấm đỏ, "sting" ở "excuse"
    [ST(L16), (t, X) => { const u = ease(t / 5), V = view(M, { cx: lerp(15, 18.2, u), cy: lerp(49.5, 45.3, u), zoom: lerp(1.05, 2.0, u) });
      drawMap(g, M, V, { fill: BIG6 });
      g.fillStyle = `rgba(10,10,16,${0.6 * clamp(t / 4)})`; g.fillRect(0, 0, W, H); if (X >= T.excuse) mapFace(g, M, V, AH, { mood: 'smug', look: [0.3, 1] });
      const c = S.pt(V, ...SARA), pulse = 0.5 + 0.5 * Math.sin(X * 6);
      g.save(); g.fillStyle = `rgba(194,52,58,${0.35 * pulse})`; g.beginPath(); g.arc(c[0], c[1], 40 + 30 * pulse, 0, 7); g.fill(); g.fillStyle = RED; g.strokeStyle = '#FFF'; g.lineWidth = 4; g.beginPath(); g.arc(c[0], c[1], 16, 0, 7); g.fill(); g.stroke(); g.restore();
      S.label('SARAJEVO', c[0], c[1] + 90, 60, kin(X, T.sara), '#FFF', { stroke: RED });
      S.label('SUNDAY, 28 JUNE 1914', c[0], c[1] - 70, 40, kin(X, T.sara + 0.4), '#FFF', { stroke: INK });
      S.lipHost(X); }],
  ];
};
