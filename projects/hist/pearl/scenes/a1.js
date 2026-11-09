// a1 — Running on empty (65–115 s). Bản đồ Thái Bình Dương 1938: Nhật đánh Trung Quốc + Đông Dương → Mỹ cắt dầu → hạm đội Nhật
// "đậu" (kim xăng E) → ngã ba: lùi hay chiếm dầu Đông Nam Á → hạm đội Mỹ ở giữa Thái Bình Dương (dời từ California về Pearl 1940) → "SINK IT".
import * as S from '../../_kit/stage.js';
import { view, drawMap, ll, country, bubble, ANCHOR, SIZE, INK } from '../../_kit/mapkit.js';
import { battleship, sea, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;
const JP = '#E8A0A0', US = '#9FC3E8';

export default K => { const { g, M, wd, ST } = K;
  const L = { by: 'By nineteen forty-one', us: 'The United States answered', wo: 'Without oil', so: "So Japan's leaders", ch: 'They chose to fight', yr: 'The year before', adm: "Japan's admirals" };
  const T = { china: wd(L.by, 'china'), indo: wd(L.by, 'indochina'), freez: wd(L.us, 'freezing'), oil: wd(L.us, 'oil'), most: wd(L.us, 'most'), parked: wd(L.wo, 'parked'),
    back: wd(L.so, 'back'), grab: wd(L.so, 'grab'), middle: wd(L.ch, 'middle'), kept: wd(L.yr, 'kept'), think: wd(L.yr, 'think'), sink: wd(L.adm, 'sink') };
  const P = (lon, lat, V) => V.pt(ll(M, lon < 0 ? lon + 360 : lon, lat));
  /** mặt quốc gia trên bản đồ Thái Bình Dương: neo tạm (lon, lat) — ANCHOR của kit dành cho châu Âu 1914 */
  function face(V, n, lon, lat, o = {}) { const a0 = ANCHOR[n], s0 = SIZE[n]; ANCHOR[n] = [lon, lat]; SIZE[n] = (o.r ?? 64) * 28 / (26 * V.s); /* o.r = bán kính mặt px, cố định mọi zoom */ const r = country(g, M, V, n, o); ANCHOR[n] = a0; SIZE[n] = s0; return r; }
  const V1 = () => view(M, { cx: 130, cy: 30, zoom: 1.9 });
  const pin = (V, lon, lat, txt, k = 1, size = 40) => { if (k <= 0) return; const [x, y] = P(lon, lat, V); g.fillStyle = RED; g.beginPath(); g.arc(x, y, 12 * Math.min(1, k * 2), 0, 7); g.fill(); S.label(txt, x, y - 30, size, k, INK, { stroke: '#FFFFFF' }); };
  function dashTo(V, a, b, k, col = RED, w = 10) { if (k <= 0) return; const A = P(...a, V), B = P(...b, V); g.save(); g.strokeStyle = col; g.lineWidth = w; g.setLineDash([26, 18]); g.lineCap = 'round';
    g.beginPath(); g.moveTo(...A); g.lineTo(lerp(A[0], B[0], k), lerp(A[1], B[1], k)); g.stroke(); g.restore(); }

  return [
    // 1 · bản đồ: Nhật (hồng) mặt giận, mũi tên vào Trung Quốc ("1937→"), rồi Đông Dương · không người dẫn · tiếng: nhạc chủ đề, "whoosh" mũi tên
    [ST(L.by), (t, X) => { const V = V1(); drawMap(g, M, V, { fill: { 'Empire of Japan': JP } });
      face(V, 'Empire of Japan', 137.5, 37.2, { mood: 'angry', arms: 'point', t: X });
      S.arrow(V, [126, 39], [114, 33], fade(X, T.china - 0.3, 0.5)); S.label('CHINA · SINCE 1937', ...P(108, 30, V), 46, fade(X, T.china, 0.3), INK, { stroke: '#FFF' });
      S.arrow(V, [114, 24], [106, 15], fade(X, T.indo - 0.3, 0.5)); S.label('INDOCHINA · 1941', ...P(103, 11, V), 46, fade(X, T.indo, 0.3), INK, { stroke: '#FFF' }); }],
    // 2 · Mỹ (xanh, mép phải) đóng băng tiền (khối băng ¥) + kéo cắt ống dầu Mỹ → Nhật; "80%" · không người dẫn · tiếng: kéo cắt "snip", băng nứt
    [ST(L.us), (t, X) => { const V = view(M, { cx: 182, cy: 32, zoom: 1.05 }); drawMap(g, M, V, { fill: { 'Empire of Japan': JP, 'United States': US } });
      face(V, 'Empire of Japan', 138, 37.5, { mood: X > T.oil + 0.3 ? 'shock' : 'calm' }); face(V, 'United States', 254, 40, { mood: 'angry', arms: 'cross' });
      const A = P(236, 36, V), B = P(142, 35, V), cut = X > T.oil, mid = [lerp(A[0], B[0], 0.5), lerp(A[1], B[1], 0.5)];
      g.save(); g.strokeStyle = '#1C1C20'; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(...A); g.lineTo(cut ? mid[0] + 40 : B[0], cut ? mid[1] : B[1]); g.stroke();
      if (cut) { g.beginPath(); g.moveTo(mid[0] - 40, mid[1]); g.lineTo(...B); g.stroke(); } g.restore();
      S.label('OIL', mid[0], mid[1] - 40, 54, 1, '#FFE04A', { stroke: INK });
      if (cut) S.stamp('CUT OFF', mid[0], mid[1] + 90, 70, clamp((X - T.oil) / 0.5));
      const ice = fade(X, T.freez - 0.2, 0.3); if (ice > 0) { const [x, y] = P(150, 18, V); g.save(); g.globalAlpha = ice; g.fillStyle = 'rgba(190,230,250,0.85)'; g.strokeStyle = INK; g.lineWidth = 6;
        g.beginPath(); g.roundRect(x - 110, y - 90, 220, 180, 20); g.fill(); g.stroke(); g.fillStyle = INK; g.font = '900 110px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('¥', x, y + 4); g.restore(); }
      S.label('~80% OF JAPAN\'S OIL', 960, 990, 60, fade(X, T.most, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 3 · bến cảng: dãy thiết giáp hạm Nhật đậu im, kim xăng chỉ E, biển "PARKED" · không người dẫn · tiếng: động cơ tắt dần "puttt"
    [ST(L.wo), (t, X) => { g.fillStyle = '#C9D6DE'; g.fillRect(0, 0, W, 640); sea(640, 0, '#6E93AB');
      [[380, 0.9], [960, 1], [1540, 0.9]].forEach(([x, s], i) => { battleship(x, 720 + i * 8, 560 * s, { col: '#9AA1A6' }); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.fillRect(x + 40, 470, 54, 36); g.strokeRect(x + 40, 470, 54, 36); g.fillStyle = '#D9262C'; g.beginPath(); g.arc(x + 67, 488, 10, 0, 7); g.fill(); });
      const gx = 960, gy = 300, k = ease((X - ST(L.wo)) / 3); g.save(); g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(gx, gy, 170, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
      g.font = '900 56px Archivo, sans-serif'; g.fillStyle = INK; g.textAlign = 'center'; g.fillText('E', gx - 120, gy - 20); g.fillText('F', gx + 120, gy - 20); g.fillStyle = RED; g.fillText('FUEL', gx, gy - 60);
      const a = lerp(-0.6, -Math.PI + 0.25, k); g.strokeStyle = RED; g.lineWidth = 10; g.beginPath(); g.moveTo(gx, gy); g.lineTo(gx + Math.cos(a) * 150, gy + Math.sin(a) * 150); g.stroke(); g.restore();
      S.stamp('PARKED', 1500, 300, 90, clamp((X - T.parked) / 0.5)); }],
    // 4 · ngã ba: biển chỉ đường "BACK DOWN" ↔ "GRAB THE OIL" (mũi tên tới Đông Ấn Hà Lan trên bản đồ) · không người dẫn · tiếng: "tick tick" chọn
    [ST(L.so), (t, X) => { const V = view(M, { cx: 120, cy: 15, zoom: 1.8 }); drawMap(g, M, V, { fill: { 'Empire of Japan': JP, 'Dutch East Indies': '#F2D27A', 'Malaysia': '#F2D27A', 'Philippines': '#C9DDB0' } });
      const k = fade(X, T.grab, 0.6); S.arrow(V, [122, 26], [112, 0], k); S.label('OIL', ...P(112, -3, V), 70, k, '#FFE04A', { stroke: INK });
      g.save(); g.translate(440, 700); g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-14, -300, 28, 420); g.strokeRect(-14, -300, 28, 420);
      const sign = (y, txt, dir, on) => { g.fillStyle = on ? '#FFE04A' : '#E8E1CF'; g.beginPath(); g.moveTo(-dir * 40, y - 46); g.lineTo(dir * 260, y - 46); g.lineTo(dir * 310, y); g.lineTo(dir * 260, y + 46); g.lineTo(-dir * 40, y + 46); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = INK; g.font = '900 44px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, dir * 135, y); };
      sign(-230, 'BACK DOWN', -1, X > T.back && X < T.grab); sign(-110, 'GRAB OIL', 1, X > T.grab); g.restore(); }],
    // 5 · thu bản đồ: giữa Thái Bình Dương là Hawaii, chùm tàu Mỹ nhỏ + ghim "PEARL HARBOR" · không người dẫn · tiếng: "ding" ghim
    [ST(L.ch), (t, X) => { const V = view(M, { cx: 175, cy: 30, zoom: 1.0 + 0.05 * t }); drawMap(g, M, V, { fill: { 'Empire of Japan': JP, 'United States': US } });
      pin(V, -157.95, 21.35, 'PEARL HARBOR', fade(X, ST(L.ch) + 0.4, 0.3), 46);
      const [hx, hy] = P(-157.95, 21.35, V); if (X > T.middle) for (let i = 0; i < 4; i++) battleship(hx - 90 + i * 60, hy + 70, 90, { col: '#8E959C' }); }],
    // 6 · mũi tên đứt California → Hawaii "1940", hạm đội dời ra giữa đại dương · không người dẫn · tiếng: còi tàu
    [ST(L.yr), (t, X) => { const V = view(M, { cx: 215, cy: 30, zoom: 1.5 }); drawMap(g, M, V, { fill: { 'United States': US } });
      face(V, 'United States', 254, 40, { mood: 'smug', arms: 'point' });
      pin(V, -117.2, 32.7, 'CALIFORNIA', 1, 40); pin(V, -157.95, 21.35, '', 1, 40); S.label('PEARL HARBOR', ...P(-157.95, 18.2, V), 40, 1, INK, { stroke: '#FFFFFF' });
      dashTo(V, [-118, 32], [-156.5, 22], ease((X - T.kept + 0.3) / 1.5), '#2B4C9B'); S.label('1940', ...P(-138, 31, V), 60, fade(X, T.kept, 0.3), '#2B4C9B', { stroke: '#FFF' });
      S.label('"THINK TWICE, JAPAN"', 960, 980, 56, fade(X, T.think - 0.3, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 7 · mặt Nhật nghĩ lại… cười đắc ý, bong bóng "SINK IT." · không người dẫn · tiếng: "hmm" + một nốt nhạc tối
    [ST(L.adm), (t, X) => { const V = view(M, { cx: 140, cy: 36, zoom: 3.2 }); drawMap(g, M, V, { fill: { 'Empire of Japan': JP } });
      const f = face(V, 'Empire of Japan', 138.5, 36.6, { mood: X > T.sink ? 'smug' : 'sleepy', arms: X > T.sink ? 'point' : 'cross' });
      if (X > T.sink - 0.1 && f) bubble(g, 'SINK IT.', f.x + 330, f.y - 220, f.x + 60, f.y - 40, clamp((X - T.sink + 0.1) / 0.3), 70); }],
  ];
};
