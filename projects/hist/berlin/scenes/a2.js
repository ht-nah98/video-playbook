// hồi a2 · Barbed Wire Sunday (BRIEF-SCENES.md) — đêm 13/8/1961: phố ngủ → lính chặn → xới đường + dây thép gai (người dẫn nhập vai #2:
// lính ngái ngủ ngáp, cùng cỡ lính) → tường mọc → "BARBED WIRE SUNDAY" → hai cửa sổ hai bên hàng rào → biển tên dài → tháp canh chỉ một hướng
// → mặt cắt "death strip" mọc theo từ → hai bộ đếm → 140 ngọn nến (NGHIÊM: khử màu, không người dẫn, không đùa). Mốc theo TỪ (wd).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { narrator } from '../../_kit/narrator.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, SK, wall } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;
const kk = (X, t0, d = 0.25) => clamp((X - t0) / d);

// ── đồ dùng cục bộ ──
/** phố đêm: bầu trời tối, trăng, dãy nhà, cửa sổ tắt dần từ off0 (mỗi ô lệch theo hash, trong dur giây) */
function night(X, off0 = 1e9, dur = 1.4) {
  const gr = g.createLinearGradient(0, 0, 0, 880); gr.addColorStop(0, '#0E1530'); gr.addColorStop(1, '#26335A'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(255,255,230,${0.3 + 0.5 * hash(i + 40)})`; g.fillRect(hash(i) * W, 20 + hash(i + 9) * 250, 3, 3); }
  g.fillStyle = '#F2EBC8'; g.beginPath(); g.arc(1600, 170, 64, 0, 7); g.fill();
  g.strokeStyle = INK; g.lineWidth = 5;
  for (let i = 0; i < 10; i++) { const bx = i * 200 - 10, bh = 380 + 170 * hash(i + 3), top = 880 - bh;
    g.fillStyle = i % 2 ? '#344169' : '#2B3659'; g.fillRect(bx, top, 196, bh); g.strokeRect(bx, top, 196, bh);
    for (let r = 0; r < Math.floor(bh / 110); r++) for (let c = 0; c < 2; c++) { const k = i * 20 + r * 3 + c, wx = bx + 30 + c * 86, wy = top + 30 + r * 110, lit = X < off0 + hash(k) * dur;
      g.fillStyle = lit ? '#F6D874' : '#1A2038'; g.fillRect(wx, wy, 60, 70); g.strokeRect(wx, wy, 60, 70); } }
  g.fillStyle = '#2A2D3B'; g.fillRect(0, 880, W, 200); g.strokeStyle = '#3D4156'; g.lineWidth = 4;
  for (let y = 920; y < H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 880); g.lineTo(W, 880); g.stroke(); }
/** phố ban ngày (bình minh): trời ấm, dãy nhà xa nhạt, mặt đường */
function dawn() {
  const gr = g.createLinearGradient(0, 0, 0, 880); gr.addColorStop(0, '#8FB1D6'); gr.addColorStop(1, '#F4D9B0'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.strokeStyle = INK; g.lineWidth = 4; for (let i = 0; i < 12; i++) { const bx = i * 170 - 20, bh = 220 + 140 * hash(i + 21); g.fillStyle = i % 2 ? '#B9B8C4' : '#A9ACBC'; g.fillRect(bx, 880 - bh, 166, bh); g.strokeRect(bx, 880 - bh, 166, bh); }
  g.fillStyle = '#8D8C86'; g.fillRect(0, 880, W, 200); g.strokeStyle = '#767570'; g.lineWidth = 4; for (let y = 920; y < H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 880); g.lineTo(W, 880); g.stroke(); }
function clock(x, y, r, hh, mm) { g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#F8F4E6'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.lineWidth = 4; g.beginPath(); g.moveTo(x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82); g.lineTo(x + Math.sin(a) * r * 0.94, y - Math.cos(a) * r * 0.94); g.stroke(); }
  const ah = (hh % 12 + mm / 60) * Math.PI / 6, am = mm * Math.PI / 30; g.lineWidth = 8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5); g.stroke(); g.lineWidth = 5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(am) * r * 0.8, y - Math.cos(am) * r * 0.8); g.stroke(); g.restore(); }
/** cuộn dây thép gai trải từ x0 tới x1 (k = 0..1 độ dài đã trải), tâm y */
function wire(x0, x1, y, k, amp = 24) { if (k <= 0) return; const xe = lerp(x0, x1, clamp(k)); g.save(); g.lineCap = 'round';
  for (const [col, lw] of [[INK, 8], ['#CFCFD6', 3.5]]) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath();
    for (let x = x0; x <= xe; x += 30) { g.moveTo(x + 24, y); g.ellipse(x, y, 24, amp, 0.2, 0, 7); } g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 3; for (let x = x0 + 15; x <= xe; x += 60) { const by = y - amp * (0.5 + 0.5 * hash(x)); g.beginPath(); g.moveTo(x - 8, by - 8); g.lineTo(x + 8, by + 8); g.moveTo(x + 8, by - 8); g.lineTo(x - 8, by + 8); g.stroke(); } g.restore(); }
function pick(hx, hy, a, len = 120) { g.save(); g.translate(hx, hy); g.rotate(a); g.strokeStyle = INK; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 30); g.lineTo(0, -len); g.stroke();
  g.lineWidth = 12; g.beginPath(); g.moveTo(-42, -len + 14); g.quadraticCurveTo(0, -len - 16, 42, -len + 14); g.stroke(); g.strokeStyle = '#8A6A4A'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 30); g.lineTo(0, -len); g.stroke(); g.restore(); }
function plank(x, y, w, h, col = '#B4402F') { g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(x, y, w, h); g.strokeRect(x, y, w, h); }
function poleSign(x, y, w, h, txt, size, k) { if (k <= 0) return; const s = back(k); g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#6B4A30'; g.fillRect(-6, 0, 12, 200); g.strokeRect(-6, 0, 12, 200);
  g.fillStyle = '#F8F4E6'; g.fillRect(-w / 2, -h, w, h); g.strokeRect(-w / 2, -h, w, h); g.fillStyle = INK; g.font = `900 ${size}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, -h / 2 + 3); g.restore(); }
/** căn nhà nhìn thẳng có một cửa sổ; trả khung cửa sổ [x, y, w, h] */
function house(x0, w, col, roof) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = col; g.fillRect(x0, 250, w, 650); g.strokeRect(x0, 250, w, 650);
  g.fillStyle = roof; g.fillRect(x0 - 20, 210, w + 40, 50); g.strokeRect(x0 - 20, 210, w + 40, 50);
  const wx = x0 + w / 2 - 150, wy = 380; g.fillStyle = '#FFE9B0'; g.fillRect(wx, wy, 300, 320); g.restore(); return [wx, wy, 300, 320]; }
function winPerson(win, side, pose, X) { const [wx, wy, ww, wh] = win; g.save(); g.beginPath(); g.rect(wx, wy, ww, wh); g.clip();
  const wave = Math.sin(X * 7 + (side > 0 ? 1.7 : 0)) * 0.12;
  C.folk(wx + ww / 2, wy + wh + 40, 340, { skin: SK, coat: side > 0 ? 'worker' : 'austro', eyes: pose === 'wave' ? 'dot' : 'cry', mouth: pose === 'wave' ? 'o' : 'frown', look: -side, arm: pose === 'wave' ? 'up' : null, tilt: pose === 'wave' ? wave : 0 });
  g.restore(); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(wx, wy, ww, wh); g.beginPath(); g.moveTo(wx + ww / 2, wy); g.lineTo(wx + ww / 2, wy + wh); g.stroke();
  g.fillStyle = '#6B4A30'; g.fillRect(wx - 20, wy + wh, ww + 40, 24); g.strokeRect(wx - 20, wy + wh, ww + 40, 24); }
function wallBlock(x, w, base, h, k, west) { if (k <= 0) return; g.save(); g.beginPath(); g.rect(x - 4, base - h * easeOut(k) - 8, w + 8, h * easeOut(k) + 8); g.clip(); wall(x, x + w, base, h, { west }); g.restore(); }
function fence(kf, kp) { const ps = easeOut(kp); for (const x of [720, 960, 1200]) { g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.moveTo(x, 930); g.lineTo(x, 930 - 200 * ps); g.stroke(); }
  wire(710, 1210, 890, kf, 30); wire(710, 1210, 800, kf, 30); }
const flameCol = '#F2B84B';

export default K => { g = K.g; const { IM, LT, wd, ST } = K;
  const NIGHT = ST('So at midnight'), W1 = 'So at midnight', W2 = 'They tore up streets', W3 = 'Berliners still call';
  const tPol = wd(W1, 'police'), tSlept = wd(W1, 'slept'), tTear = ST(W2), tRoll = wd(W2, 'rolled') - 0.3, tConc = wd(W2, 'few') - 0.3;
  const tFam = ST('Families woke up');
  return [
    // ── 0. phố ngủ · hình: phố đêm, đồng hồ 0:00, dấu ngày · người dẫn: không · tiếng: chuông nửa đêm, đêm tĩnh
    [NIGHT, (t, X) => { night(X); const kc = kk(X, wd(W1, 'midnight'), 0.3); if (kc > 0) { g.save(); g.translate(0, (1 - easeOut(kc)) * -300); clock(330, 190, 100, 12, 0); g.restore(); }
      S.stamp('13 AUG 1961', 960, 300, 100, kk(X, wd(W1, 'august'), 0.5), -0.06); }],
    // ── 1. lính chặn biên giới · lính + cảnh sát bước vào theo từ, gậy chắn đóng xuống ở "sealed"; cửa sổ tắt ở "slept" · tiếng: bước chân, barrier thump
    [tPol - 0.2, (t, X) => { night(X, tSlept, 1.2);
      const gx = [[420, 'guard', -1], [690, 'vopo', -1], [1230, 'guard', 1], [1500, 'vopo', 1]], ap = [tPol, tPol + 0.2, wd(W1, 'soldiers'), wd(W1, 'soldiers') + 0.2];
      gx.forEach(([x, who, dir], i) => { const k = kk(X, ap[i], 0.35); if (k > 0) P[who](x + dir * (1 - easeOut(k)) * 500, 990, 430, { eyes: 'dot', mouth: 'flat', look: dir * -1 }); });
      const ks = kk(X, wd(W1, 'sealed'), 0.25); if (ks > 0) { const y = lerp(560, 900, easeOut(ks)); g.save(); g.strokeStyle = INK; g.lineWidth = 6;
        for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#F4F1E8' : RED; g.fillRect(260 + i * 85, y - 22, 85, 44); g.strokeRect(260 + i * 85, y - 22, 85, 44); } g.restore(); }
      poleSign(960, 700, 400, 90, 'WEST BERLIN', 42, kk(X, wd(W1, 'west'), 0.3));
      const kz = kk(X, tSlept, 0.4); if (kz > 0) S.label('Z z z', 960, 200, 110, kz, '#BFD0F5', { stroke: '#101830' }); }],
    // ── 2. xới đường · lính cuốc nền, đá văng; đêm đã hết cửa sổ sáng · tiếng: cuốc đập đá liên hồi
    [tTear, (t, X) => { night(X, -1);
      for (let i = 0; i < 18; i++) { const x0 = [420, 800, 1320, 1620][i % 4] + (hash(i) - 0.5) * 140, ph = ((X * 1.3 + hash(i + 5)) % 1), px = x0 + (hash(i + 9) - 0.5) * 300 * ph, py = 905 - Math.sin(ph * Math.PI) * (30 + 50 * hash(i + 2)) + ph * 40;
        g.fillStyle = '#5A5E70'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.roundRect(px - 18, py - 12, 36, 24, 6); g.fill(); g.stroke(); }
      for (const [x, who, ph] of [[420, 'guard', 0], [800, 'vopo', 1.4], [1320, 'guard', 0.7], [1620, 'vopo', 2.1]]) { const sw = Math.sin(X * 8 + ph), up = sw > 0;
        const R = P[who](x, 990, 430, { eyes: 'dot', mouth: 'o', arm: up ? 'up' : null }); pick(x + 118, 990 - 330 + (up ? 0 : 120), up ? -0.25 : 0.5, 130); } }],
    // ── 3. dây thép gai · NGƯỜI DẪN NHẬP VAI #2: lính biên phòng ngáp (cùng cỡ 430) bên cuộn dây đang trải; lính khác trải dây · tiếng: dây xoảng, ngáp
    [tRoll, (t, X) => { night(X, -1); const kw = kk(X, tRoll + 0.1, 1.6);
      wire(100, 1820, 930, kw, 30);
      P.guard(380, 960, 430, { eyes: 'dot', mouth: 'flat', look: 1 }); P.vopo(1650, 960, 430, { eyes: 'dot', mouth: 'flat', look: -1 });
      narrator(1100, 960, 430, { outfit: 'soldier', mood: 'closed', mouth: 'wide', arms: 'cover', bob: 3 * Math.sin(X * 2) });   // người dẫn nhập vai: lính ngái ngủ
      g.save(); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#7A7A82'; g.beginPath(); g.ellipse(800, 930, 70, 60, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(800, 930, 25, 22, 0, 0, 7); g.stroke(); g.restore();   // ống cuộn dây
      S.label('Z z', 1260, 480, 80, kk(X, tRoll + 1.5, 0.3), '#BFD0F5', { stroke: '#101830' }); }],
    // ── 4. bê tông mọc · tường mọc từng tấm theo nhịp, rung nhẹ mỗi tấm; nhãn "A FEW DAYS LATER" · tiếng: thud mỗi tấm
    [tConc, (t, X) => { dawn(); wire(0, 1920, 940, 1, 26);
      const t0 = wd(W2, 'concrete') - 0.4, n = clamp(Math.floor((X - t0) / 0.08) + 1, 0, 16), kb = (X - t0) % 0.08 / 0.08, [dx, dy] = n > 0 && n < 16 ? S.shake(kb, 6, X) : [0, 0];
      g.save(); g.translate(dx, dy); if (n > 0) wall(0, n * 120, 900, 360, { west: false, seed: 1 }); g.restore();
      for (const [x, who, l] of [[260, 'guard', 1], [1660, 'vopo', -1]]) P[who](x, 1040, 430, { eyes: 'dot', mouth: 'flat', look: l });
      S.label('A FEW DAYS LATER', 960, 190, 100, kk(X, wd(W2, 'days') - 0.2, 0.3), '#FFFFFF', { stroke: '#222' }); }],
    // ── 5. Barbed Wire Sunday · tường xong + dây, ba người Berlin ngơ ngác, chữ nảy theo từng từ · tiếng: ting khi từng từ
    [ST(W3), (t, X) => { dawn(); wall(0, 1920, 900, 360, { west: false, seed: 1 }); wire(0, 1920, 945, 1, 26);
      [[360, 'frown'], [960, 'o'], [1500, 'frown']].forEach(([x, m], i) => C.folk(x, 1040, 380, { skin: SK, coat: ['worker', 'austro', 'german'][i], eyes: 'shock', mouth: m, look: i === 1 ? 0 : (i ? -1 : 1) }));
      g.fillStyle = 'rgba(255,200,120,0.10)'; g.fillRect(0, 0, W, H);
      S.label('BARBED', 560, 290, 160, kk(X, wd(W3, 'barbed'), 0.3), '#FFFFFF', { stroke: '#222' }); S.label('WIRE', 1290, 290, 160, kk(X, wd(W3, 'wire'), 0.3), '#FFFFFF', { stroke: '#222' });
      S.label('SUNDAY', 960, 460, 170, kk(X, wd(W3, 'sunday'), 0.3), RED, { stroke: '#FFFFFF' }); }],
    // ── 6a. gia đình hai bên hàng rào · hai cửa sổ, người vẫy; hàng rào mọc ở "opposite sides" · tiếng: gió, dây ngân
    [tFam, (t, X) => { const bg = () => { dawn(); const wA = house(140, 560, '#C9A87C', '#7A4A3A'), wB = house(1220, 560, '#9CB0C4', '#4A5A6A'); return [wA, wB]; };
      const [wA, wB] = bg(); const kf = kk(X, wd('Families woke', 'opposite'), 0.4), kp = kk(X, wd('Families woke', 'fence'), 0.3);
      winPerson(wA, 1, 'wave', X); winPerson(wB, -1, 'wave', X); fence(kf, kp); }],
    // ── 6b. 28 năm · cùng bố cục, tay buông, mắt khóc; "28 YEARS" nảy ở "twenty-eight" · tiếng: lặng, tiếng đồng hồ tích tắc
    [wd('Families woke', "wouldn't") - 0.2, (t, X) => { dawn(); const wA = house(140, 560, '#C9A87C', '#7A4A3A'), wB = house(1220, 560, '#9CB0C4', '#4A5A6A');
      winPerson(wA, 1, 'sad', X); winPerson(wB, -1, 'sad', X); fence(1, 1);
      S.label('28 YEARS', 960, 150, 130, kk(X, wd('Families woke', 'twenty-eight'), 0.3), '#FFFFFF', { stroke: '#222' }); }],
    // ── 7. "không gọi là tường" · quan chức đổ mồ hôi cạnh tường, bong bóng "NOT A WALL" ở "call it a wall" · tiếng: cười gượng, boing
    [ST('The government'), (t, X) => { dawn(); wall(1100, 1900, 900, 420, { west: false, seed: 4 });
      C.folk(640, 1010, 560, { skin: SK, coat: 'suit', wear: 'bowler', eyes: 'dot', mouth: 'grin', arm: 'up', sweat: X > wd('The government', 'course') });
      bubble(g, 'NOT A WALL!', 1000, 330, 700, 560, kk(X, wd('The government', 'call'), 0.3), 62); }],
    // ── 8a. tên dài thòng · tấm biển đỏ tràn hết bề ngang, ba dòng chữ nảy theo từ; quan chức đứng bên phải · tiếng: kèn trịnh trọng
    [ST('Officially it was'), (t, X) => { dawn(); plank(-40, 170, 2000, 560); const P1 = 'Officially it was';
      g.fillStyle = '#FFFFFF'; for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(i * 170 - 20, 170); g.lineTo(i * 170 + 40, 170 + 36); g.lineTo(i * 170 + 100, 170); g.fill(); }
      S.label('ANTI-FASCIST', 860, 350, 150, kk(X, wd(P1, 'anti-fascist'), 0.3), '#FFFFFF', { stroke: INK });
      S.label('PROTECTION', 860, 530, 150, kk(X, wd(P1, 'protection'), 0.3), '#FFFFFF', { stroke: INK });
      S.label('RAMPART', 860, 710, 150, kk(X, wd(P1, 'rampart'), 0.3), '#FFFFFF', { stroke: INK });
      C.folk(1640, 1020, 460, { skin: SK, coat: 'suit', eyes: 'dot', mouth: 'grin', arm: 'up' }); }],
    // ── 8b. chỉ một hướng · tháp canh phía Đông, đèn pha + nòng súng đều quay sang phải, biển ONE WAY · tiếng: đèn pha, tiếng ù
    [wd('Officially it was', 'only') - 0.4, (t, X) => { dawn(); g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, 0, W, H);
      wall(560, 800, 900, 420, { west: true, seed: 2 });
      S.label('WEST', 300, 200, 80, 1, '#FFFFFF', { stroke: '#222' }); S.label('EAST', 1600, 200, 80, 1, '#FFFFFF', { stroke: '#222' });
      [[170, 'happy'], [360, 'happy']].forEach(([x, e]) => C.folk(x, 1000, 330, { skin: SK, coat: 'plain', eyes: e, mouth: 'grin', arm: 'up' }));
      // tháp canh
      g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#6E7462'; for (const lx of [1010, 1130]) { g.beginPath(); g.moveTo(lx, 900); g.lineTo(lx + (lx < 1070 ? 30 : -30), 520); g.stroke(); }
      g.beginPath(); g.moveTo(1030, 760); g.lineTo(1110, 640); g.moveTo(1110, 760); g.lineTo(1030, 640); g.stroke();
      g.fillStyle = '#C9C7C0'; g.fillRect(960, 340, 260, 190); g.strokeRect(960, 340, 260, 190); g.fillStyle = '#9A4A3A'; g.beginPath(); g.moveTo(940, 340); g.lineTo(1090, 270); g.lineTo(1240, 340); g.closePath(); g.fill(); g.stroke(); g.restore();
      P.guard(1090, 530, 190, { eyes: 'dot', mouth: 'flat', look: 1 });
      g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(1130, 450); g.lineTo(1290, 470); g.stroke(); g.restore();                          // nòng súng hướng Đông
      const kb = kk(X, wd('Officially it was', 'pointed'), 0.3), a = 0.22 + 0.04 * Math.sin(X * 3);
      g.save(); g.fillStyle = `rgba(255,240,150,${0.35 * Math.max(0.3, kb)})`; g.beginPath(); g.moveTo(1215, 440); g.lineTo(1900, 440 + 360 * a * 3); g.lineTo(1900, 440 + 360 * a * 3 + 330); g.closePath(); g.fill(); g.restore();
      [1560, 1720].forEach((x, i) => C.folk(x, 1000, 330, { skin: SK, coat: 'worker', eyes: 'shock', mouth: 'o', sweat: i === 0, look: -1 }));
      if (kb > 0) { const s = back(kb); g.save(); g.translate(1070, 150); g.scale(s, s); g.fillStyle = '#2B4C7E'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(-190, -75, 380, 150, 20); g.fill(); g.stroke();
        g.fillStyle = '#FFF'; g.beginPath(); g.moveTo(-160, 20); g.lineTo(0, 20); g.lineTo(0, 0); g.lineTo(70, 38); g.lineTo(0, 62); g.closePath(); g.moveTo(-160, 20); g.fill();
        g.font = '900 54px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillText('ONE WAY', 0, -12); g.restore(); } }],
    // ── 9. mặt cắt hệ thống tường · mỗi phần mọc đúng từ: years → two walls → strip → watchtowers → lights → guards → "DEATH STRIP" · tiếng: đập bê tông, điện bật vù
    [ST('Over the years'), (t, X) => { const PO = 'Over the years', G = 840;
      const gr = g.createLinearGradient(0, 0, 0, G); gr.addColorStop(0, '#9CB4CC'); gr.addColorStop(1, '#E8DCC0'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.fillStyle = '#6B5A44'; g.fillRect(0, G + 20, W, H - G); g.strokeStyle = INK; g.lineWidth = 6;
      // Tây (nhà màu) / Đông (khối xám)
      for (let i = 0; i < 3; i++) { g.fillStyle = ['#E8B77C', '#9FC6A8', '#E39A8A'][i]; g.fillRect(i * 160 + 20, G - 300 + i * 25, 140, 300 - i * 25); g.strokeRect(i * 160 + 20, G - 300 + i * 25, 140, 300 - i * 25); }
      for (let i = 0; i < 3; i++) { g.fillStyle = '#A5A39C'; g.fillRect(1480 + i * 130, G - 380 + i * 30, 120, 380 - i * 30); g.strokeRect(1480 + i * 130, G - 380 + i * 30, 120, 380 - i * 30);
        g.fillStyle = '#7A7870'; for (let r = 0; r < 4; r++) g.fillRect(1495 + i * 130, G - 340 + i * 30 + r * 80, 30, 36); }
      g.fillStyle = '#9DB58A'; g.fillRect(0, G, 520, 24); g.strokeRect(0, G, 520, 24); g.fillStyle = '#A9A59B'; g.fillRect(1420, G, 500, 24); g.strokeRect(1420, G, 500, 24);
      const ks = kk(X, wd(PO, 'strip'), 0.9); if (ks > 0) { g.fillStyle = '#E3D3A2'; g.fillRect(640, G, 660 * ease(ks), 24); g.strokeRect(640, G, 660 * ease(ks), 24); g.strokeStyle = '#B8A878'; g.lineWidth = 3;
        for (let x = 660; x < 640 + 660 * ease(ks); x += 40) { g.beginPath(); g.moveTo(x, G + 4); g.lineTo(x + 20, G + 20); g.stroke(); } g.strokeStyle = INK; g.lineWidth = 6; }
      const kw = kk(X, wd(PO, 'walls'), 0.4); wallBlock(520, 120, G, 340, kw, true); wallBlock(1300, 120, G, 340, kw, false);
      // đèn
      const kl = kk(X, wd(PO, 'lights'), 0.4); [700, 850, 1160, 1250].forEach(x => { if (kl <= 0) return; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(x, G); g.lineTo(x, G - 300 * easeOut(kl)); g.lineTo(x + 30, G - 310 * easeOut(kl)); g.stroke();
        g.fillStyle = `rgba(255,240,150,${0.28 * kl})`; g.beginPath(); g.moveTo(x + 30, G - 305); g.lineTo(x - 70, G); g.lineTo(x + 130, G); g.closePath(); g.fill(); g.fillStyle = '#FFF6B0'; g.beginPath(); g.arc(x + 32, G - 305, 14, 0, 7); g.fill(); g.stroke(); });
      // tháp
      const kt = kk(X, wd(PO, 'watchtowers'), 0.5); if (kt > 0) { const th = 400 * easeOut(kt); g.strokeStyle = INK; g.lineWidth = 8; for (const lx of [1000, 1100]) { g.beginPath(); g.moveTo(lx, G); g.lineTo(lx + (lx < 1050 ? 15 : -15), G - th); g.stroke(); }
        if (kt > 0.7) { g.fillStyle = '#C9C7C0'; g.fillRect(950, G - 480, 200, 120); g.strokeRect(950, G - 480, 200, 120); g.fillStyle = '#9A4A3A'; g.beginPath(); g.moveTo(935, G - 480); g.lineTo(1050, G - 540); g.lineTo(1165, G - 480); g.closePath(); g.fill(); g.stroke(); } }
      const kg = kk(X, wd(PO, 'armed'), 0.3); if (kg > 0) { P.guard(790, G + 20, 300, { eyes: 'dot', mouth: 'flat', look: 1 }); P.vopo(1210, G + 20, 300, { eyes: 'dot', mouth: 'flat', look: -1 }); }
      const ky = clamp((X - ST(PO) - 0.4) / 2.0), yr = Math.round(lerp(1961, 1989, ease(ky)));
      if (X < wd(PO, 'walls')) S.label(String(yr), 960, 170, 130, 1, '#FFFFFF', { stroke: '#222' });
      const kd = kk(X, wd(PO, 'death'), 0.35); S.label('DEATH STRIP', 960, 430, 120, kd, RED, { stroke: '#FFFFFF' }); }],
    // ── 10a. hơn trăm nghìn người thử trốn · bộ đếm 0→100,000 + đám người chạy về phía tường · tiếng: chân chạy dồn, còi báo động
    [ST('More than a hundred'), (t, X) => { const M0 = 'More than a hundred';
      dawn(); wall(1480, 1720, 900, 440, { west: false, seed: 5 }); wire(1380, 1480, 935, 1, 24);
      for (let i = 0; i < 14; i++) { const h = 230 + 24 * hash(i), x = Math.min(1360, 120 + i * 96 + clamp((X - 156.2) * 90, 0, 900) * (0.6 + 0.4 * hash(i + 3))), bob = Math.abs(Math.sin(X * 9 + i)) * 14;
        C.folk(x, 1000 - bob, h, { skin: SK, coat: ['plain', 'worker', 'austro', 'german'][i % 4], eyes: 'shock', mouth: 'o', arm: 'up', look: 1 }); }
      const kn = clamp((X - wd(M0, 'hundred')) / 1.0), n = Math.round(100000 * ease(kn)); S.label(n.toLocaleString('en-US') + '+', 760, 250, 170, kk(X, wd(M0, 'hundred') - 0.05, 0.2), '#222', { stroke: '#FFFFFF' });
      S.label('TRIED', 760, 400, 110, kk(X, wd(M0, 'tried'), 0.3), RED, { stroke: '#FFFFFF' }); }],
    // ── 10b. hơn năm nghìn người sang được · vài người leo / bay qua tường, bộ đếm xanh "5,000+" + "MADE IT" · tiếng: ting ting, reo nhỏ
    [wd('More than a hundred', 'five') - 0.3, (t, X) => { const M0 = 'More than a hundred';
      dawn(); wall(1480, 1720, 900, 440, { west: false, seed: 5 }); wire(1380, 1480, 935, 1, 24);
      for (let i = 0; i < 10; i++) { const h = 230 + 24 * hash(i); C.folk(160 + i * 110, 1000, h, { skin: SK, coat: ['plain', 'worker', 'austro', 'german'][i % 4], eyes: 'dot', mouth: 'flat', look: 1 }); }
      [[1530, 'happy'], [1600, 'happy'], [1680, 'happy']].forEach(([x, e], i) => C.folk(x, 470, 200, { skin: SK, coat: 'worker', eyes: e, mouth: 'grin', arm: 'up', tilt: Math.sin(X * 6 + i) * 0.08 }));
      const lp = clamp((X - wd(M0, 'over', 1)) / 0.9); if (lp > 0 && lp < 1) { const lx = lerp(1700, 1850, lp), ly = 470 - Math.sin(lp * Math.PI) * 200 + lp * 520; C.folk(lx, ly + 200, 200, { skin: SK, coat: 'plain', eyes: 'happy', mouth: 'grin', arm: 'up', tilt: lp * 0.8 }); }
      const kn = clamp((X - wd(M0, 'five')) / 0.9); S.label(Math.round(5000 * ease(kn)).toLocaleString('en-US') + '+', 760, 250, 170, kk(X, wd(M0, 'five') - 0.2, 0.2), '#2E8B57', { stroke: '#FFFFFF' });
      S.label('MADE IT', 760, 400, 110, kk(X, wd(M0, 'made'), 0.3), '#222', { stroke: '#FFFFFF' }); }],
    // ── 11. NGHIÊM · 140 ngọn nến, tối + xám, không người dẫn, không đùa; sau cùng bức tường, xa xa đèn phương Tây · tiếng: gần như lặng, nhạc trầm
    [ST('At least a hundred and forty'), (t, X) => { const A = 'At least a hundred and forty', t0 = wd(A, 'hundred') - 0.1, tH = wd(A, 'about') - 0.1, tW = wd(A, 'shot') - 0.2, kw = kk(X, tW, 0.8);
      g.fillStyle = '#101217'; g.fillRect(0, 0, W, H); const sh = -40 * ease(kw);
      for (let i = 0; i < 140; i++) { const c = i % 14, r = Math.floor(i / 14), x = 960 + (c - 6.5) * 100, y = 150 + r * 66 + sh, ka = kk(X, t0 + i * 0.009, 0.25); if (ka <= 0) continue;
        const hi = i < 100 && X > tH, al = (hi ? 1 : 0.8) * (1 - 0.35 * kw), fl = 1 + 0.12 * Math.sin(X * 9 + i * 1.7) * hash(i);
        g.save(); g.globalAlpha = al * ka; g.fillStyle = hi ? 'rgba(255,244,208,0.16)' : 'rgba(255,200,110,0.10)'; g.beginPath(); g.arc(x, y - 6, 26, 0, 7); g.fill();
        g.fillStyle = '#B9B5A8'; g.fillRect(x - 7, y, 14, 30); g.fillStyle = hi ? '#FFF6DC' : flameCol; g.beginPath(); g.ellipse(x, y - 10, 6 * fl, 12 * fl, 0, 0, 7); g.fill(); g.restore(); }
      if (kw > 0) { for (let i = 0; i < 12; i++) { const lx = 1000 + i * 70 + hash(i) * 20; if (X < wd(A, 'west') - 0.1) continue; g.fillStyle = `rgba(255,214,120,${0.85 * kk(X, wd(A, 'west') + i * 0.06, 0.3)})`; g.fillRect(lx, 730 + hash(i + 8) * 40, 24, 34); }
        g.save(); g.globalAlpha = ease(kw); g.translate(0, (1 - ease(kw)) * 260); g.fillStyle = '#3A3C44'; g.strokeStyle = '#08090B'; g.lineWidth = 6; for (let x = 0; x < W; x += 120) { g.fillRect(x, 840, 120, 260); g.strokeRect(x, 840, 120, 260); }
        g.fillStyle = '#4A4C55'; g.beginPath(); g.roundRect(-10, 806, W + 20, 40, 20); g.fill(); g.stroke(); g.restore(); }
      const kf = kk(X, wd(A, 'forty'), 0.5); const lbl = X < tH ? 'AT LEAST 140' : X < tW ? '~100 ESCAPING' : '';
      if (lbl && kf > 0) S.label(lbl, 960, 930, 80, X < tH ? kf : kk(X, tH, 0.4), '#C9C9C4', { stroke: '#101217' }); }],
  ];
};
