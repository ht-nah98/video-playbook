// hồi a3 · Six assassins (≈237–290 s) — BRIEF-SCENES.md §a3. Mốc theo TỪ (wd), không gõ giây. Tất định: hàm thuần của X.
// Người dẫn: NHẬP VAI #3 = một trong sáu (áo đen cùng cỡ, mặt đắc ý, không chữ / mũi tên) ở phòng tối + bờ sông;
// góc phải nhép miệng chỉ ở cảnh tư liệu / bản đồ (Apis, Pašić, bản đồ Serbia, đường buôn lậu).
import * as S from '../../_kit/stage.js';
import * as B from '../../_kit/backdrop.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, INK } from '../../_kit/mapkit.js';
const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;

export default K => { const { g, IM, M, wd, ST } = K;
  const L1 = 'Waiting for them', L2 = 'They had four pistols', L3 = 'Where does a group', L4 = 'From the Black Hand', L5 = 'To be clear, the Serbian',
    L6 = 'But when the head of your spies', L7 = 'The weapons were smuggled';
  const T = {
    six: wd(L1, 'six'), young: wd(L1, 'young', 1), five: wd(L1, 'five'), teen: wd(L1, 'teenagers'),
    four: wd(L2, 'four'), six2: wd(L2, 'six'), vials: wd(L2, 'vials'), kill: wd(L2, 'kill'), talking: wd(L2, 'talking'),
    broke: wd(L3, 'broke'), get: wd(L3, 'get'),
    black: wd(L4, 'black'), secret: wd(L4, 'secret'), officers: wd(L4, 'officers'), whose: wd(L4, 'whose'), apis: wd(L4, 'apis'), head: wd(L4, 'head'), intel: wd(L4, 'intelligence'),
    didnt: wd(L5, "didn't"), and5: wd(L5, 'and'), prime: wd(L5, 'prime'), tried: wd(L5, 'tried'),
    spies: wd(L6, 'spies'), club: wd(L6, 'assassination'), great: wd(L6, 'not'),
    smuggled: wd(L7, 'smuggled'), border: wd(L7, 'border'), and7: wd(L7, 'and'), spread: wd(L7, 'spread'), waiting: wd(L7, 'waiting'),
  };
  const pop = (X, t0, d = 0.3) => clamp((X - t0) / d);
  const AH = 'Austro-Hungarian Empire', RS = 'Serbia', BELGRADE = [20.46, 44.82], SARA = [18.41, 43.86];
  const host = (X, k = 1) => S.lipHost(X, k);

  // ── sáu người: 5 sát thủ kiểu tập mẫu + người dẫn (nhập vai #3) ở vị trí 4 — CÙNG chỗ, cùng cỡ qua mọi cảnh phòng tối ──
  const ROW = [330, 582, 834, 1086, 1338, 1590], HOSTI = 4, RH = 300, RY = 960;
  function six(X, o = {}) { for (let i = 0; i < 6; i++) { const k = o.k ? o.k(i) : 1; if (k <= 0) continue; const y = (o.y ?? RY) + (1 - back(k)) * 260, x = (o.xs ? o.xs[i] : ROW[i]), h = o.h ?? RH;
      if (i === HOSTI) narrator(x, y - h * 0.1, h * 0.95, { outfit: 'suit', mood: o.hostMood ?? 'smug', mouth: o.hostMouth ?? 'rest', look: o.look ?? 0 });   // nhập vai — không chữ, không lời
      else { const f = S.assassin(x, y, h, { look: o.look ?? 0, green: o.green?.(i) });
        if (o.sweat && hash(i + 3) > 0.3) S.sweat(f.face[0] + f.r * 1.05, f.face[1] - f.r * 0.3, 0.9); } } }
  function room(X) { S.paper('#17151A'); const sw = Math.sin(X * 1.6) * 0.05;   // đèn treo đung đưa + quầng sáng
    g.save(); g.translate(960, 0); g.rotate(sw); g.strokeStyle = '#555'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 120); g.stroke();
    g.fillStyle = '#3A3A40'; g.beginPath(); g.moveTo(-60, 170); g.lineTo(-30, 120); g.lineTo(30, 120); g.lineTo(60, 170); g.closePath(); g.fill();
    const gr = g.createRadialGradient(0, 170, 10, 0, 600, 900); gr.addColorStop(0, 'rgba(255,226,150,0.30)'); gr.addColorStop(1, 'rgba(255,226,150,0)'); g.fillStyle = gr;
    g.beginPath(); g.moveTo(-60, 170); g.lineTo(-900, 1100); g.lineTo(900, 1100); g.lineTo(60, 170); g.closePath(); g.fill(); g.fillStyle = '#FFE9A8'; g.beginPath(); g.arc(0, 172, 16, 0, 7); g.fill(); g.restore(); }
  /** cờ hội kín Bàn Tay Đen (như tập mẫu L20) */
  function blackHand(cx, cy, s, k = 1) { if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2); g.translate(cx, cy); g.scale(s * back(k), s * back(k));
    g.fillStyle = '#5A1414'; g.strokeStyle = '#2A0808'; g.lineWidth = 6; g.beginPath(); g.moveTo(-170, -200); g.lineTo(170, -200); g.lineTo(170, 210); g.lineTo(0, 160); g.lineTo(-170, 210); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#C9A24A'; g.fillRect(-190, -212, 380, 14);
    g.save(); g.translate(0, 0); g.scale(0.62, 0.62); g.rotate(-0.15); g.fillStyle = '#050505'; g.beginPath(); g.ellipse(0, 40, 95, 115, 0, 0, 7); g.fill();
    for (let i = 0; i < 5; i++) { const a = -1.9 + i * 0.42 + (i === 0 ? -0.5 : 0); g.save(); g.rotate(a + Math.PI / 2); g.beginPath(); g.roundRect(-22, -230, 44, 170 - (i === 0 ? 50 : 0), 22); g.fill(); g.restore(); } g.restore(); g.restore(); }
  // đồ trên bàn (vẽ)
  function pistol(x, y, s, rot) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = '#2B2B30'; g.strokeStyle = '#000'; g.lineWidth = 4;
    g.beginPath(); g.moveTo(-50, -14); g.lineTo(46, -14); g.lineTo(46, 4); g.lineTo(-14, 4); g.lineTo(-22, 40); g.lineTo(-46, 40); g.lineTo(-40, 4); g.lineTo(-50, 4); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#6B4A2E'; g.fillRect(-42, 10, 18, 26); g.restore(); }
  function bomb(x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#2E3328'; g.strokeStyle = '#000'; g.lineWidth = 4; g.beginPath(); g.roundRect(-22, -46, 44, 52, 8); g.fill(); g.stroke();
    g.fillStyle = '#6E7360'; g.fillRect(-16, -58, 32, 14); g.strokeRect(-16, -58, 32, 14); g.strokeStyle = '#C9A24A'; g.lineWidth = 3; g.beginPath(); g.moveTo(-22, -24); g.lineTo(22, -24); g.moveTo(-22, -6); g.lineTo(22, -6); g.stroke(); g.restore(); }
  function vial(x, y, s, glow) { g.save(); g.translate(x, y); g.scale(s, s);
    if (glow > 0) { g.fillStyle = `rgba(120,230,110,${0.35 * glow})`; g.beginPath(); g.arc(0, -30, 30, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(220,240,255,0.5)'; g.strokeStyle = '#000'; g.lineWidth = 4; g.beginPath(); g.roundRect(-12, -66, 24, 66, 10); g.fill(); g.stroke();
    g.fillStyle = '#5BC24A'; g.beginPath(); g.roundRect(-10, -36, 20, 34, 8); g.fill(); g.fillStyle = '#7A5A3A'; g.fillRect(-10, -78, 20, 14); g.restore(); }
  function table(k = 1) { g.save(); g.translate(0, (1 - easeOut(k)) * 400); g.fillStyle = '#6B4A2E'; g.strokeStyle = '#000'; g.lineWidth = 7; g.fillRect(140, 900, 1640, 36); g.strokeRect(140, 900, 1640, 36);
    g.fillStyle = '#4E3420'; g.fillRect(170, 936, 1580, 200); g.strokeRect(170, 936, 1580, 200); g.restore(); }
  const ITEMS = (X, glow) => {   // đồ rơi xuống bàn đúng từ: 4 súng · 6 bom · lọ xyanua
    for (let i = 0; i < 4; i++) { const k = clamp((X - T.four - i * 0.1) / 0.25); if (k <= 0) continue; pistol(330 + i * 120, lerp(400, 882, easeOut(k)), 1.15, -0.1 + 0.2 * hash(i)); }
    for (let i = 0; i < 6; i++) { const k = clamp((X - T.six2 - i * 0.07) / 0.25); if (k <= 0) continue; bomb(860 + i * 70, lerp(400, 900, easeOut(k)), 1.1); }
    for (let i = 0; i < 4; i++) { const k = clamp((X - T.vials - i * 0.06) / 0.25); if (k <= 0) continue; vial(1418 + i * 34, lerp(400, 900, easeOut(k)), 0.95, glow); } };
  const LABELS = X => { S.label('4 PISTOLS', 510, 1010, 46, pop(X, T.four + 0.2), '#F4F1E8', { stroke: '#000' }); S.label('6 BOMBS', 1035, 1010, 46, pop(X, T.six2 + 0.2), '#F4F1E8', { stroke: '#000' });
    S.label('CYANIDE', 1470, 1010, 46, pop(X, T.vials + 0.2), '#7BE36A', { stroke: '#000' }); };
  const balkan = (t, z = 2.6) => view(M, { cx: 19.6, cy: 45.0, zoom: z + 0.05 * t });

  return [
    // ═══ T1 · "six young men from a movement called Young Bosnia… five Bosnian Serbs and one Bosnian Muslim… mostly teenagers" — phòng tối, đèn treo, sáu người bật lên (người dẫn là người thứ 5 — nhập vai #3) · tiếng: "six" 6 tiếng bụp nối nhau, "Young Bosnia" chữ đóng, "teenagers" dấu đóng
    [ST(L1), (t, X) => { room(X);
      six(X, { k: i => clamp((X - Math.min(T.six, ST(L1) + 0.5) - i * 0.14) / 0.25), look: X > T.teen ? 1 : 0, hostMood: 'smug' });
      S.label('YOUNG BOSNIA', 960, 150, 84, pop(X, T.young), '#F4F1E8', { stroke: RED });
      S.label('5 SERBS · 1 MUSLIM', 960, 245, 50, pop(X, T.five), '#C9C2AE');
      S.stamp('TEENAGERS', 960, 420, 80, clamp((X - T.teen) / 0.5), -0.08); }],

    // ═══ T2 · "four pistols, six bombs, and little vials of cyanide… kill themselves instead of talking" — bàn trồi lên trước sáu người, đồ rơi đúng từ; "kill themselves" lọ xanh phát sáng, sát thủ đổ mồ hôi · tiếng: "four" 4 tiếng cạch kim loại, "six" 6 tiếng cộp nặng, "vials" leng keng thuỷ tinh, "kill themselves" ực nuốt khan
    [ST(L2), (t, X) => { room(X); const scared = X >= T.kill;
      six(X, { look: 0, sweat: scared, hostMood: scared ? 'shock' : 'smug', hostMouth: scared ? 'o' : 'rest' });
      table(clamp(t / 0.35)); ITEMS(X, scared ? 0.6 + 0.4 * Math.sin(X * 8) : 0); LABELS(X);
      if (scared) { const k = back(pop(X, T.kill, 0.3)); g.save(); g.translate(1560, 520); g.scale(k, k); g.fillStyle = '#E9F5E4'; g.strokeStyle = '#000'; g.lineWidth = 6;   // đầu lâu trên lọ
        g.beginPath(); g.arc(0, 0, 54, Math.PI * 0.85, Math.PI * 2.15); g.lineTo(30, 62); g.lineTo(-30, 62); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = '#000'; for (const e of [-20, 20]) { g.beginPath(); g.arc(e, 4, 13, 0, 7); g.fill(); } g.fillRect(-4, 24, 8, 14); g.restore(); } }],

    // ═══ T3 · "Where does a group of broke teenagers get all that?" — cùng phòng + bàn đầy vũ khí; túi lộn trái, con nhậy bay ra; dấu "?" đỏ to · tiếng: "broke" vải lộn túi + vo ve nhậy, "get all that" boing hỏi
    [ST(L3), (t, X) => { room(X);
      six(X, { look: X > T.broke ? -0.6 : 0, hostMood: 'smug' });
      ROW.forEach((x, i) => { if (i === HOSTI || X < T.broke) return; const k = back(pop(X, T.broke + i * 0.05, 0.2)); g.fillStyle = '#F4F1E8'; g.strokeStyle = '#000'; g.lineWidth = 4;
        for (const s of [-1, 1]) { g.save(); g.translate(x + s * RH * 0.21, RY - 120); g.scale(k, k); g.beginPath(); g.moveTo(-18, 0); g.lineTo(18, 0); g.lineTo(10, 40); g.lineTo(-10, 40); g.closePath(); g.fill(); g.stroke(); g.restore(); } });
      if (X > T.broke) { const u = X - T.broke, mx = 582 + u * 260, my = RY - 160 - u * 220 + Math.sin(u * 14) * 20; g.save(); g.fillStyle = '#C9BFAE'; g.strokeStyle = '#000'; g.lineWidth = 3;   // nhậy bay khỏi túi rỗng
        for (const s of [-1, 1]) { g.beginPath(); g.ellipse(mx + s * 16, my - 8 * Math.abs(Math.sin(u * 30)), 18, 11, s * 0.5, 0, 7); g.fill(); g.stroke(); } g.fillStyle = '#5A4A3A'; g.beginPath(); g.ellipse(mx, my, 6, 14, 0, 0, 7); g.fill(); g.restore(); }
      table(1); ITEMS(1e9, 0); LABELS(1e9);
      S.label('?', 960, 360, 240, pop(X, T.get), RED, { stroke: '#FFF' }); }],

    // ═══ T4 · "From the Black Hand, a secret society run by officers inside the Serbian army, whose leader, nicknamed Apis…" — cờ Bàn Tay Đen + sĩ quan Serbia trong bóng tối → ảnh tư liệu Apis + thẻ tên (+ con ong bay — "Apis" = ong) · người dẫn góc phải ở ảnh · tiếng: "Black Hand" tiếng gong trầm, "officers" giày quân đội dậm, "Apis" vo ve ong
    [ST(L4), (t, X) => {
      if (X < T.whose - 0.1) { room(X); blackHand(960, 380, 1.0, pop(X, T.black - 0.2, 0.4));
        S.label('BLACK HAND', 960, 720, 80, pop(X, T.black), '#F4F1E8', { stroke: RED }); S.label('SECRET SOCIETY', 960, 800, 44, pop(X, T.secret), '#C9C2AE');
        [260, 500, 1420, 1660].forEach((x, i) => { const k = easeOut(clamp((X - T.officers - i * 0.08) / 0.35)); if (k <= 0) return; g.save(); g.globalAlpha = k;
          const ox = x + (x < 960 ? -1 : 1) * (1 - k) * 200; S.assassin(ox, 1040, 380, { look: x < 960 ? 1 : -1 });
          g.fillStyle = '#5E6B4E'; g.strokeStyle = '#000'; g.lineWidth = 5; g.beginPath(); g.ellipse(ox, 1040 - 380 * 0.78 - 380 * 0.42 * 0.5 * 0.7, 380 * 0.42 * 0.62, 380 * 0.42 * 0.5 * 0.62, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();   // mũ lính đè mũ quả dưa
          g.fillStyle = '#D9B13B'; g.beginPath(); g.arc(ox, 1040 - 380 * 0.78 - 380 * 0.42 * 0.5 * 1.05, 9, 0, 7); g.fill(); g.restore(); });
        return; }
      const u = X - T.whose; S.paper('#1A1A1A'); S.photo(IM.p_apis, 500, 530, 450, 1, { push: 1 + 0.02 * u, credit: 'Dragutin Dimitrijević "Apis", c. 1900 · public domain' });
      S.nameTag('DRAGUTIN "APIS"', pop(X, T.apis), 790, 300); S.nameTag('DIMITRIJEVIĆ', pop(X, T.apis + 0.15), 790, 375); S.nameTag('HEAD OF SERBIAN', pop(X, T.head), 790, 455); S.nameTag('MILITARY INTELLIGENCE', pop(X, T.intel - 0.2), 790, 530);
      if (X > T.apis && X < T.apis + 2.4) { const v = X - T.apis, bx = 500 + Math.cos(v * 4) * 280, by = 380 + Math.sin(v * 7) * 120; g.save(); g.translate(bx, by); g.rotate(Math.cos(v * 4) > 0 ? 0.2 : -0.2); g.scale(2, 2);   // ong vẽ
        g.fillStyle = 'rgba(255,255,255,0.8)'; g.strokeStyle = '#000'; g.lineWidth = 3; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(s * 8, -16 - 4 * Math.abs(Math.sin(v * 40)), 12, 18, s * 0.4, 0, 7); g.fill(); g.stroke(); }
        g.fillStyle = '#F3C61B'; g.beginPath(); g.ellipse(0, 0, 24, 16, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#000'; g.fillRect(-6, -15, 6, 30); g.fillRect(8, -13, 5, 26); g.restore(); }
      host(X); }],

    // ═══ T5 · "the Serbian government didn't order this, and Serbia's prime minister may even have heard about it and tried to stop it" — bản đồ: Serbia mặt vô tội + dấu "NOT ORDERED" → ảnh tư liệu Pašić + thẻ tên + dấu "TRIED TO STOP IT?" · người dẫn góc phải · tiếng: "didn't" dấu đóng, "tried to stop it" dấu đóng thứ hai
    [ST(L5), (t, X) => {
      if (X < T.and5 - 0.1) { const V = balkan(t); drawMap(g, M, V, { fill: { [AH]: 'flag', [RS]: 'flag' } });
        mapFace(g, M, V, AH, { mood: 'calm', look: [1, 0.3] }); mapFace(g, M, V, RS, { mood: 'calm', look: [1, -0.6] });
        const p = S.pt(V, ...BELGRADE); S.stamp('NOT ORDERED', p[0] - 40, p[1] + 290, 60, clamp((X - T.didnt) / 0.5), -0.08); host(X); return; }
      const u = X - T.and5; S.paper('#1A1A1A'); S.photo(IM.p_pasic, 500, 530, 400, 1, { push: 1 + 0.02 * u, credit: 'Nikola Pašić, 1906 · public domain' });
      S.nameTag('NIKOLA PAŠIĆ', pop(X, T.prime - 0.3), 800, 430); S.nameTag('PRIME MINISTER OF SERBIA', pop(X, T.prime), 800, 510);
      S.stamp('TRIED TO STOP IT?', 1080, 720, 58, clamp((X - T.tried) / 0.5), -0.07); host(X); }],

    // ═══ T6 · "when the head of your spies runs an assassination club on the side, it's not a great look" — bản đồ: biển hiệu neon "ASSASSINATION CLUB · OPEN" mọc ở Belgrade; Serbia đổ mồ hôi, Áo-Hung trừng mắt · người dẫn góc phải · tiếng: "assassination club" neon rè bật, "not a great look" tiếng nuốt khan
    [ST(L6), (t, X) => { const V = balkan(t + 7), bad = X >= T.great;
      drawMap(g, M, V, { fill: { [AH]: 'flag', [RS]: 'flag' } });
      mapFace(g, M, V, AH, { mood: bad ? 'angry' : 'calm', look: [1, 0.4] }); const f = mapFace(g, M, V, RS, { mood: bad ? 'shock' : 'calm', look: bad ? [-1, -0.4] : [1, -0.6] });
      if (bad && f) for (let i = 0; i < 3; i++) S.sweat(f.x + f.r * (1.1 + 0.25 * i), f.y - f.r * (0.6 - 0.45 * i) + ((X - T.great) * 60 + i * 15) % 40, 1.1);
      const p = S.pt(V, ...BELGRADE), k = back(pop(X, T.club - 0.1, 0.35)); if (k > 0) { const sx = p[0] + 240, sy = p[1] - 200, on = Math.floor(X * 6) % 7 !== 0;
        g.save(); g.translate(sx, sy); g.scale(k, k); g.strokeStyle = '#000'; g.lineWidth = 6; g.beginPath(); g.moveTo(-200, 74); g.lineTo(-240, 190); g.stroke();
        g.fillStyle = '#1B1420'; g.beginPath(); g.roundRect(-270, -78, 540, 156, 18); g.fill(); g.stroke();
        g.font = '900 44px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 10; g.strokeStyle = 'rgba(255,80,140,0.35)'; g.strokeText('ASSASSINATION', 0, -26); g.strokeText('CLUB', 0, 30);
        g.fillStyle = '#FF7BB0'; g.fillText('ASSASSINATION', 0, -26); g.fillStyle = on ? '#8CF5FF' : '#3A5A60'; g.fillText('CLUB', 0, 30); g.restore(); }
      host(X); }],

    // ═══ T7 · "The weapons were smuggled across the border, and in Sarajevo the six spread out along the main road by the river, each one waiting for his moment" — bản đồ: thùng hàng chạy theo đường chấm Belgrade → biên giới → Sarajevo → bờ sông vẽ: sáu người (người dẫn vẫn là người thứ 5) tản ra dọc đường, lần lượt quay nhìn trái chờ đoàn xe · người dẫn góc phải chỉ ở bản đồ · tiếng: "smuggled" bánh xe gỗ lọc cọc, "border" tiếng huýt lén, "spread" bước chân tản, "waiting" tiếng đồng hồ tích tắc
    [ST(L7), (t, X) => {
      if (X < T.and7 - 0.1) { const V = view(M, { cx: 19.2, cy: 44.4, zoom: 7.5 + 0.15 * t }); drawMap(g, M, V, { fill: { [AH]: 'flag', [RS]: 'flag' } });
        const P = [[...BELGRADE], [19.6, 44.65], [19.15, 44.45], [18.8, 44.25], [...SARA]].map(q => S.pt(V, ...q)), k = ease((X - ST(L7) - 0.1) / (T.and7 - ST(L7) - 0.5));
        const seg = (u) => { const f = u * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), r = f - i; return [lerp(P[i][0], P[i + 1][0], r), lerp(P[i][1], P[i + 1][1], r)]; };
        g.save(); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 40 * k; i++) { const q = seg(i / 40); i ? g.lineTo(...q) : g.moveTo(...q); } g.strokeStyle = '#FFF'; g.lineWidth = 22; g.stroke(); g.strokeStyle = '#111'; g.lineWidth = 12; g.setLineDash([26, 18]); g.stroke(); g.restore();
        for (const [q, nm] of [[P[0], 'BELGRADE'], [P[4], 'SARAJEVO']]) { g.fillStyle = RED; g.beginPath(); g.arc(q[0], q[1], 14, 0, 7); g.fill(); S.label(nm, q[0], q[1] + 60, 44, 1, '#FFF', { stroke: INK }); }
        const c = seg(k); g.save(); g.translate(c[0], c[1] - 60); g.fillStyle = '#B07A4A'; g.strokeStyle = '#000'; g.lineWidth = 5; g.fillRect(-40, -30, 80, 60); g.strokeRect(-40, -30, 80, 60);
        g.beginPath(); g.moveTo(-40, -30); g.lineTo(40, 30); g.moveTo(40, -30); g.lineTo(-40, 30); g.stroke(); g.restore();
        S.label('SMUGGLED', 520, 170, 72, pop(X, T.smuggled), '#FFF', { stroke: RED }); host(X); return; }
      const u = X - T.and7; g.save(); const z = 1 + 0.01 * u; g.translate(W / 2, H / 2); g.scale(z, z); g.translate(-W / 2, -H / 2); B.place('quay');
      const sp = ease((X - T.spread) / 0.9), xs = [200, 520, 840, 1160, 1480, 1760].map((x, i) => lerp(780 + i * 72, x, sp));
      for (let i = 0; i < 6; i++) { const look = X > T.waiting + i * 0.12 ? -1 : 0, x = xs[i], y = 1000;
        if (i === HOSTI) narrator(x, y, 280 * 0.95, { outfit: 'suit', mood: 'smug', mouth: 'rest', look }); else S.assassin(x, y, 280, { look }); }
      g.restore(); }],
  ];
};
