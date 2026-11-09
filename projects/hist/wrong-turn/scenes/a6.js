// hồi a6 — The wrong turn + Two shots (BRIEF-SCENES.md §a6). Tất định: mọi khung là hàm của X (giờ trang).
// Cú rẽ = money shot: bản đồ phố (common.streetMap) → xe vẽ trên bờ sông (tài xế Lojka) → góc cầu Latin (Potiorek la, phanh,
// lùi, dừng trước tiệm Schiller, Princip cách 5 ft) → bánh mì MYTH. Two shots: nghiêm — khử màu, không người dẫn, trích dẫn = phụ đề.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { streetMap, routeArrow, SK } from './common.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back } = S;
const GREEN = '#2E8B57';

export default K => { const { g, IM, wd, ST } = K;
  // ── mốc theo từ ──
  const L1 = 'At about ten forty-five', L2 = "The archduke's driver", L3 = 'For the record', L4 = 'Potiorek, sitting', L5 = 'The driver hit the brakes',
    L6 = 'And standing right there', L7 = "And no, he wasn't", L8 = 'Princip stepped forward', L9 = 'One bullet hit', L10 = 'Franz Ferdinand turned',
    L11 = 'When someone asked', L12 = 'Before eleven thirty', L13 = 'Princip tried';
  const T = { ten: wd(L1, 'ten'), set: wd(L1, 'set'), turned: wd(L1, 'turned'), franz: wd(L1, 'franz'), old: wd(L1, 'old'),
    leo: wd(L2, 'leopold'), newp: wd(L2, 'new'), so: wd(L2, 'so'), followed: wd(L2, 'followed'), only: wd(L3, 'only'), told: wd(L3, 'told'),
    pot: wd(L4, 'potiorek'), shout: wd(L4, 'shouted'), wrong: wd(L4, 'wrong'), supposed: wd(L4, 'supposed'),
    brakes: wd(L5, 'brakes'), back: wd(L5, 'back'), stop: wd(L5, 'stop'), moritz: wd(L5, 'moritz'),
    standing: wd(L6, 'standing'), five: wd(L6, 'five'), gav: wd(L6, 'gavrilo'), given: wd(L6, 'given'),
    sandwich: wd(L7, 'sandwich'), story: wd(L7, 'story'), century: wd(L7, 'century'),
    stepped: wd(L8, 'stepped'), fired: wd(L8, 'fired'), twice: wd(L8, 'twice'),
    sophie: wd(L10, 'sophie'), nothing: wd(L11, 'nothing'), dead: wd(L12, 'dead'), crowd: wd(L13, 'crowd') };

  /** bản đồ phố chung, nhãn vẽ lại tại chỗ: RIVER ROAD dưới mép đường (không bị xe / mũi tên đè) */
  function map() { const P = streetMap({ labels: false }); S.label('RIVER ROAD', 760, 585, 30, 1, '#FFF', { stroke: INK }); S.label('LATIN BRIDGE', 1220, 690, 26, 1, INK); S.label('FRANZ JOSEPH ST.', 1430, 160, 28, 1, INK, { align: 'left' }); return P; }
  // ── xe trên bản đồ: nhìn từ trên, mũi theo hướng chạy ──
  function token(P, u, route, col, txt) { const p = P(u, route), q = P(Math.min(1, u + 0.01), route), a = Math.atan2(q[1] - p[1], q[0] - p[0]);
    g.save(); g.translate(...p); g.save(); g.rotate(a); g.lineWidth = 5; g.strokeStyle = INK; g.fillStyle = col;
    g.beginPath(); g.roundRect(-52, -28, 104, 56, 14); g.fill(); g.stroke(); g.fillStyle = '#B9C4CF'; g.fillRect(14, -22, 12, 44); g.strokeRect(14, -22, 12, 44);
    g.fillStyle = '#FFF'; for (const [hx, hy] of [[-4, -12], [-4, 12], [-30, -12], [-30, 12]]) { g.beginPath(); g.arc(hx, hy, 8, 0, 7); g.fill(); g.stroke(); } g.restore();
    S.label(txt, 0, -50, 30, 1, '#FFF', { stroke: INK, free: true }); g.restore(); }

  // ── xe vẽ + người ngồi (cùng một bộ cỡ cho mọi cảnh của hồi) ──
  const CW = 950, CY = 1062, sc = CW / 1080;
  function car(x, X, o = {}) { const wr = CW * 0.13, mv = o.moving ?? 0;
    C.car1914(x, CY, CW, { flags: true, bob: mv ? Math.sin(X * 17) * 3 : 0, spin: o.spin ?? -x / (wr * 0.9), seats: ([fx, fy], [bx, by]) => {
      C.folk(fx + 150 * sc, fy + 90 * sc, 315 * sc, { skin: SK, coat: 'austro', feat: 'potiorek', wear: 'kepi', eyes: o.pot ?? 'dot', mouth: o.potMouth, arm: o.potArm, look: -1 });
      C.folk(bx - 30 * sc, by + 70 * sc, 360 * sc, { skin: SK, coat: 'austro', feat: 'ff', wear: 'plume', eyes: o.ff ?? 'dot', look: o.look ?? 0 });
      C.folk(bx + 150 * sc, by + 70 * sc, 340 * sc, { skin: SK, coat: 'gown', feat: 'sophie', wear: 'sophiehat', eyes: o.so ?? 'dot', look: o.look ?? 0 });
      C.folk(fx + 20 * sc, fy + 80 * sc, 330 * sc, { skin: SK, coat: 'driver', wear: 'driver', eyes: o.drv ?? 'dot', sweat: o.drvSweat, mouth: o.drvMouth }); } });
    if (mv) { g.save(); g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 6; g.lineCap = 'round';          // vệt gió sau đuôi xe (xe chạy sang trái)
      for (let i = 0; i < 6; i++) { const y = CY - 90 - i * 52, x0 = x + CW * 0.5 + 30 + 40 * S.hash(i), L = (90 + 90 * S.hash(i + 5)) * mv; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + L, y); g.stroke(); } g.restore(); } }
  const drvHead = x => [x - CW * 0.1 + 20 * sc, CY - CW * 0.13 * 1.1 - CW * 0.34 * 0.1 + 80 * sc - 330 * sc * (0.58 + 0.21 * 0.72)];
  const potHead = x => [x - CW * 0.1 + 150 * sc, CY - CW * 0.13 * 1.1 - CW * 0.34 * 0.1 + 90 * sc - 315 * sc * (0.58 + 0.21 * 0.72)];

  // vị trí xe ở góc cầu Latin: lăn vào từ phải → phanh (trượt) → lùi → dừng trước tiệm
  const XC = { in: 2350, a: 1150, brake: 990, stop: 1300 };
  function carX(X) { const t0 = ST(L4);
    if (X < t0 + 1.4) return lerp(XC.in, XC.a, easeOut((X - t0) / 1.4));
    if (X < T.brakes) return lerp(XC.a, XC.brake + 40, (X - t0 - 1.4) / Math.max(0.5, T.brakes - t0 - 1.4));
    if (X < T.back) return lerp(XC.brake + 40, XC.brake, easeOut((X - T.brakes) / Math.max(0.2, T.back - T.brakes)));
    return lerp(XC.brake, XC.stop, ease((X - T.back) / Math.max(0.6, T.stop - T.back))); }
  const carMoving = X => X < T.brakes ? 1 : X > T.back && X < T.stop ? 0.5 : 0;

  function deliSign(k) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 3); const s = back(k); g.translate(1405, 470); g.scale(s, s);
    g.fillStyle = '#7A3E2C'; g.strokeStyle = INK; g.lineWidth = 9; g.fillRect(-440, -35, 880, 70); g.strokeRect(-440, -35, 880, 70);
    g.fillStyle = '#F4E3C3'; g.font = '900 46px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText("SCHILLER'S DELICATESSEN", 0, 3); g.restore(); }
  function skid(X) { if (X < T.brakes) return; const k = clamp((X - T.brakes) / 0.4); g.save(); g.strokeStyle = 'rgba(12,12,14,0.9)'; g.lineWidth = 15; g.lineCap = 'round';
    for (const off of [-0.32, 0.32]) { const x0 = XC.brake + 40 + off * CW, x1 = x0 + 260 * k; g.beginPath(); g.moveTo(x0, CY - 4); g.lineTo(x1, CY - 4); g.stroke(); } g.restore(); }
  const PX = 430;                                                                  // Princip đứng trên vỉa hè, cách mũi xe ~5 ft
  function princip(X, o = {}) { C.folk(PX + (o.dx ?? 0), CY - 6, 390, { skin: SK, coat: 'suit', feat: 'princip', eyes: o.eyes ?? 'dot', look: 1, mouth: o.mouth }); }
  /** cảnh góc phố (dùng chung C → G). o.zoom = [cx, cy, z] */
  function corner(X, o = {}) { const x = carX(X); g.save();
    if (o.zoom) { const [cx, cy, z] = o.zoom; g.translate(cx, cy); g.scale(z, z); g.translate(-cx, -cy); }
    B.place('latin'); deliSign(o.sign ?? 0); skid(X); if (o.princip) princip(X, o.princip); car(x, X, { moving: carMoving(X), ...o.car });
    if (o.smoke) S.smoke(x + CW * 0.52, CY - 70, T.stop, X, 4);
    g.restore(); return x; }

  return [
    // A · bản đồ phố: đoàn xe chạy lại, xe 1 (thị trưởng) rẽ phải vào phố Franz Joseph — đúng kế hoạch CŨ · không người dẫn · tiếng: động cơ, "turned" → tiếng còi / rẽ
    [ST(L1), (t, X) => { const z = 1 + 0.22 * ease((X - T.turned) / 1.2); g.save(); g.translate(1150, 420); g.scale(z, z); g.translate(-1150, -420);
      const P = map(); g.globalAlpha = 0.55; routeArrow(P, 'new', 1, GREEN); g.globalAlpha = 1;
      routeArrow(P, 'old', clamp((X - T.turned + 1.6) / 2.6), RED);
      const uL = X < T.set ? 0.25 : X < T.turned ? lerp(0.25, 0.6, (X - T.set) / (T.turned - T.set)) : lerp(0.6, 0.86, ease((X - T.turned) / Math.max(0.5, T.franz - T.turned + 0.6)));
      const uF = Math.min(0.5, Math.max(0, uL - 0.13));
      token(P, uF, 'old', '#3A3A44', 'ARCHDUKE'); token(P, uL, 'old', '#7A6A55', 'MAYOR'); g.restore();
      S.label('NEW PLAN', 1640, 380, 40, clamp((X - ST(L1)) / 0.3) * (1 - 0.5 * clamp((X - T.turned) / 0.5)), '#FFF', { stroke: GREEN });
      S.stamp('OLD PLAN', 820, 250, 60, clamp((X - T.old) / 0.4), -0.06);
      S.label('10:45 AM', 260, 150, 64, clamp((X - T.ten) / 0.3), '#FFF', { stroke: INK }); }],
    // B · xe vẽ trên bờ sông, giới thiệu tài xế Lojka (nameTag), "?" ở "new plan" · không người dẫn · tiếng: động cơ chạy
    [ST(L2), (t, X) => { B.place('quay'); car(1000, X, { moving: 1, spin: -X * 14 });
      const [hx, hy] = drvHead(1000), k = clamp((X - T.leo) / 0.3);
      if (k > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.arc(hx, hy + 10, 95 * back(k), 0, 7); g.stroke(); g.restore(); }
      S.nameTag('DRIVER: LEOPOLD LOJKA', k, 110, 170);
      S.label('?', hx, hy - 130, 130, clamp((X - T.newp) / 0.25), RED, { stroke: '#FFF' }); }],
    // A2 · bản đồ: xe Thái tử theo xe đầu rẽ vào phố · không người dẫn · tiếng: rẽ (lốp rít nhẹ)
    [T.so - 0.15, (t, X) => { const P = map(); g.globalAlpha = 0.55; routeArrow(P, 'new', 1, GREEN); g.globalAlpha = 1; routeArrow(P, 'old', 1, RED);
      token(P, lerp(0.5, 0.78, ease(t / 1.0)), 'old', '#3A3A44', 'ARCHDUKE'); token(P, 0.9, 'old', '#7A6A55', 'MAYOR'); }],
    // B2 · cận tài xế (đẩy máy), dấu ✓ xanh trên đầu ở "only" · không người dẫn · tiếng: "ding" đúng ✓
    [ST(L3), (t, X) => { const [hx, hy] = drvHead(1000), z = lerp(1.25, 1.35, clamp(t / 5));
      g.save(); g.translate(hx, hy + 120); g.scale(z, z); g.translate(-hx, -hy - 120); B.place('quay');
      car(1000, X, { moving: 1, spin: -X * 14, drv: X > T.only ? 'happy' : 'dot', drvMouth: X > T.only ? 'grin' : null });
      const k = clamp((X - T.only) / 0.3); if (k > 0) { g.save(); g.translate(hx, hy - 150); g.scale(back(k) / z, back(k) / z); g.fillStyle = GREEN; g.strokeStyle = '#FFF'; g.lineWidth = 10; g.beginPath(); g.arc(0, 0, 80, 0, 7); g.fill(); g.stroke();
        g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-36, 2); g.lineTo(-8, 30); g.lineTo(40, -30); g.stroke(); g.restore(); }
      g.restore(); }],
    // C · góc cầu Latin: xe lăn vào phố, Potiorek (nameTag) → "shouted" bong bóng WRONG WAY! · không người dẫn · tiếng: động cơ, "shouted" → tiếng hét / còi gắt
    [ST(L4), (t, X) => { const sh = X > T.shout; const [sx, sy] = S.shake(clamp((X - T.shout) / 0.5), 14, X); g.save(); g.translate(sx, sy);
      const x = corner(X, { car: { pot: sh ? 'angry' : 'dot', potMouth: sh ? 'o' : null, potArm: sh ? 'up' : null, drv: sh ? 'shock' : 'dot', ff: sh ? 'shock' : 'dot', so: sh ? 'shock' : 'dot' } });
      g.restore(); const [px, py] = potHead(x);
      S.nameTag('GOVERNOR OSKAR POTIOREK', clamp((X - T.pot) / 0.3) * (sh ? 0 : 1), px - 380, py - 150);
      if (sh) bubble(g, 'WRONG WAY!', clamp(px + 120, 420, 1500), 260, px, py - 110, clamp((X - T.shout) / 0.2), 84); }],
    // D · phanh (vệt bánh) → lùi → dừng trước tiệm, biển SCHILLER'S DELICATESSEN bật ở "Moritz" · không người dẫn · tiếng: "brakes" → phanh rít, "back up" → số lùi, "stop" → xe khựng / tắt máy
    [ST(L5), (t, X) => { const [sx, sy] = S.shake(clamp((X - T.brakes) / 0.45), 10, X); g.save(); g.translate(sx, sy);
      g.save();
      corner(X, { sign: clamp((X - T.moritz) / 0.3), smoke: true, car: { drv: 'shock', drvSweat: true, pot: 'angry', ff: X > T.stop ? 'dot' : 'shock', so: X > T.stop ? 'dot' : 'shock' } }); g.restore(); g.restore();
      S.label('SCREECH!', 1660, 780, 70, clamp((X - T.brakes) / 0.2) * (X < T.back ? 1 : 0), '#FFF', { stroke: RED, rot: -0.06 });
      S.label('REVERSE ▶', 1300, 300, 60, clamp((X - T.back) / 0.2) * (X < T.stop ? 1 : 0), '#FFF', { stroke: INK }); }],
    // E · Princip đứng cách ~5 ft (vạch đo đỏ) → đẩy máy vào Princip + nameTag, mắt chán ở "given up" · không người dẫn · tiếng: "five feet" → tick đo, im nền
    [ST(L6), (t, X) => { const kP = clamp((X - T.standing) / 0.3), z = X > T.gav - 0.1 ? lerp(1, 1.08, ease((X - T.gav + 0.1) / 0.5)) : 1;
      g.save(); if (z > 1) { g.translate(1300, 860); g.scale(z, z); g.translate(-1300, -860); }
      B.place('latin'); deliSign(1); skid(X);
      if (kP > 0) { g.save(); g.globalAlpha = kP; princip(X, { eyes: X > T.given ? 'bored' : 'dot', dx: (1 - easeOut(kP)) * -80 }); g.restore(); }
      car(XC.stop, X, { drv: 'shock', pot: 'angry' });
      const k = clamp((X - T.five + 0.1) / 0.3); if (k > 0 && z < 1.05) { const a = PX + 100, b = XC.stop - CW * 0.46, y = CY - 20; g.save(); g.strokeStyle = RED; g.lineWidth = 7;
        g.beginPath(); g.moveTo(a, y); g.lineTo(lerp(a, b, easeOut(k)), y); g.stroke(); for (const xx of [a, lerp(a, b, easeOut(k))]) { g.beginPath(); g.moveTo(xx, y - 22); g.lineTo(xx, y + 22); g.stroke(); } g.restore();
        S.label('5 FT', (a + b) / 2, y - 34, 56, k, RED, { stroke: '#FFF' }); }
      g.restore(); S.nameTag('GAVRILO PRINCIP, 19', clamp((X - T.gav) / 0.3), 110, 170); }],
    // F · huyền thoại bánh mì: bánh vẽ + dấu MYTH ở "story", "≈ 90 YEARS LATER" ở "century" · người dẫn góc (nhép) · tiếng: "sandwich" → pop, "story" → dập dấu
    [ST(L7), (t, X) => { S.paper(); const k = clamp((t - 0.2) / 0.3); if (k > 0) { g.save(); g.translate(720, 560); const s = 1.4 * back(k); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 6; g.lineJoin = 'round';
        g.fillStyle = '#E2B56B'; g.beginPath(); g.ellipse(0, -60, 210, 70, 0, Math.PI, 0); g.lineTo(210, -40); g.lineTo(-210, -40); g.closePath(); g.fill(); g.stroke();
        [['#7CC35B', -40], ['#D9534F', -14], ['#F2C94C', 10]].forEach(([c, y]) => { g.fillStyle = c; g.fillRect(-205, y, 410, 24); g.strokeRect(-205, y, 410, 24); });
        g.fillStyle = '#E2B56B'; g.beginPath(); g.roundRect(-210, 32, 420, 46, 18); g.fill(); g.stroke(); g.restore(); }
      S.stamp('MYTH', 720, 560, 130, clamp((X - T.story) / 0.3), -0.16);
      S.label('≈ 90 YEARS LATER', 720, 860, 54, clamp((X - T.century) / 0.3), INK);
      S.lipHost(X, clamp(t / 0.3)); }],
    // G · Two shots: góc phố khử màu tối, Princip bước lên → "fired" màn đen + 2 chớp · không người dẫn · tiếng: im (bỏ nhạc) → 2 phát súng đúng "fired" / "twice"
    [ST(L8) - 0.2, (t, X) => { if (X < T.fired) { const step = clamp((X - T.stepped) / 0.5) * 70;
        corner(X, { sign: 1, princip: { eyes: 'angry', dx: step }, car: { drv: 'dot', pot: 'dot' } }); S.desat(1, 0.45);
        const v = g.createRadialGradient(960, 600, 300, 960, 600, 1200); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${0.5 + 0.4 * clamp(t / 1.5)})`); g.fillStyle = v; g.fillRect(0, 0, W, H); return; }
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H); S.flash(860, 520, clamp((X - T.fired) / 0.18), 200); S.flash(1080, 560, clamp((X - T.twice) / 0.18), 200); }],
    // H · báo NYT 29/6/1914 khử màu trên nền tối, trôi lên chậm · không người dẫn · tiếng: nền trầm, không hiệu ứng
    [ST(L9), (t, X) => { S.paper('#141414'); S.photo(IM.s_nyt, 960, 620 - t * 26, 1180, clamp(t / 0.6), { push: 1.0 + 0.012 * t, credit: 'The New York Times, 29 June 1914 · public domain' }); S.desat(1, 0.25); }],
    // I · ảnh thật FF + Sophie trên xe, 28/6/1914 (khử màu, tối) + trích dẫn phụ đề · không người dẫn · tiếng: im
    [ST(L10), (t, X) => { S.photoBg(IM.p_incar, t, { desat: 1, dark: 0.5, fx: 0.5, fy: 0.45, push: 0.01, credit: 'Franz Ferdinand and Sophie in Sarajevo, 28 June 1914 · public domain' });
      sub('“Sophie, don’t die. Stay alive for our children.”', clamp((X - T.sophie + 0.2) / 0.5)); }],
    // J · ảnh "vài giây trước vụ ám sát" (khử màu) + "It is nothing." ×3, mỗi lần nhỏ và mờ hơn · không người dẫn · tiếng: im
    [ST(L11), (t, X) => { S.photoBg(IM.p_streets, t, { desat: 1, dark: 0.55, fx: 0.4, fy: 0.55, zoom: 1.15, push: 0.008, credit: 'Sarajevo, 28 June 1914, seconds before the attack · CC0' });
      for (let i = 0; i < 3; i++) { const k = clamp((X - T.nothing + 0.4 - i * 0.75) / 0.4); if (k <= 0) continue;
        g.save(); g.globalAlpha = k * (1 - i * 0.3); g.font = `italic 500 ${54 - i * 9}px Archivo, sans-serif`; g.textAlign = 'center'; g.fillStyle = '#F2EEE6'; g.fillText('“It is nothing.”', 960, 780 + i * 80); g.restore(); } }],
    // K · ảnh gia đình FF (khử màu, khung giấy trên nền tối) + "28 JUNE 1914" nhỏ · không người dẫn · tiếng: im
    [ST(L12), (t, X) => { S.paper('#121212'); S.photo(IM.p_ff_family, 960, 490, 680, clamp(t / 0.8), { push: 1 + 0.01 * t, credit: 'Franz Ferdinand, Sophie and their children · public domain' }); S.desat(1, 0.2);
      g.save(); g.globalAlpha = clamp((X - T.dead + 0.3) / 0.8) * 0.9; g.font = '600 40px Archivo, sans-serif'; g.textAlign = 'center'; g.fillStyle = '#E8E4DA'; g.fillText('28 JUNE 1914', 960, 1000); g.restore(); }],
    // L · ảnh bắt người ở Sarajevo 28/6/1914 (khử màu) · không người dẫn · tiếng: đám đông xa, trầm
    [ST(L13), (t, X) => { S.photoBg(IM.p_arrest, t, { desat: 1, dark: 0.35, fy: 0.5, push: 0.012, credit: 'An arrest in Sarajevo after the shooting, 28 June 1914 (often misidentified as Princip) · public domain' }); }],
  ];

  /** phụ đề nghiêm: chữ trắng nghiêng, dải tối mờ, giữa dưới */
  function sub(txt, k) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k); g.font = 'italic 500 52px Archivo, sans-serif'; g.textAlign = 'center';
    const w = Math.min(1700, g.measureText(txt).width + 80); g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillRect(960 - w / 2, 850, w, 96);
    g.fillStyle = '#F2EEE6'; g.fillText(txt, 960, 915); g.restore(); }
};
