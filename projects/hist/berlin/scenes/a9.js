// a9 — The bill (567–613 s). Hậu quả: cổng không đóng lại được, hai nước Đức nhập một, Liên Xô tan, số phận Schabowski.
// NGHIÊM: không người dẫn, không chữ đùa, từ toà án trở đi khử màu, đèn tắt dần.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { view, drawMap, country, INK } from '../../_kit/mapkit.js';
import { P, memo, wall, SK } from './common.js';
import { helpers } from './a8.js';
const { W, H, RED, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, M, M94, wd, ST } = K;
  const { sober, fade, gate } = helpers(K);
  const L = { next: 'By the next morning', less: 'Less than eleven months', year: 'A little over a year', as: 'As for Schabowski', court: 'In nineteen ninety-seven', unlike: 'Unlike most', died: 'He died in Berlin' };
  const T = { close: wd(L.next, 'close'), ceased: wd(L.less, 'ceased'), october: wd(L.less, 'october'), one: wd(L.less, 'one'), gone: wd(L.year, 'gone'), expelled: wd(L.as, 'expelled'),
    convicted: wd(L.court, 'convicted'), killings: wd(L.court, 'killings'), sentenced: wd(L.court, 'sentenced'), three: wd(L.court, 'three'),
    accepted: wd(L.unlike, 'accepted'), moral: wd(L.unlike, 'moral'), pardoned: wd(L.unlike, 'pardoned'), diedW: wd(L.died, 'died'), fifteen: wd(L.died, 'fifteen') };
  const GERMANY1 = wd(L.less, 'germany', 1);
  const END_A = K.LT(L.died).end;

  function gateFalls(t, X) { const sg = g.createLinearGradient(0, 0, 0, 760); sg.addColorStop(0, '#8C93A6'); sg.addColorStop(1, '#D9C9B8'); g.fillStyle = sg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#A9A5A0'; for (let i = 0; i < 12; i++) { const bh = 110 + hash(i + 70) * 200; g.fillRect(i * 170 - 30, 760 - bh, 150, bh); }
    wall(-60, 600, 900, 400, { west: true, seed: 5 }); wall(1320, 2000, 900, 400, { west: true, seed: 11 });
    g.fillStyle = '#7D7974'; g.fillRect(0, 900, W, H - 900);
    g.fillStyle = '#4B4F58'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(588, 520, 30, 380); g.strokeRect(588, 520, 30, 380);                    // trụ bản lề
    const k = clamp((X - T.close + 0.25) / 0.6), ang = lerp(0, 1.52, k * k), sh = S.shake(clamp((X - T.close - 0.2) / 0.4), 10, X);
    g.save(); g.translate(sh[0], sh[1]); gate(618, 900, 640, 360, ang); g.restore();
    const u = clamp((X - T.close - 0.3) / 0.6); if (u > 0 && u < 1) { g.fillStyle = `rgba(220,215,205,${0.6 * (1 - u)})`; for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(900 + i * 70 + u * 60, 900 - u * 60 * (1 + hash(i)), 28 + 20 * u, 0, 7); g.fill(); } }
    if (k > 0.98) for (let i = 0; i < 4; i++) { const x = 1500 - ((X - T.close) * 120 + i * 260) % 1100; C.folk(x, 1040, 330, { coat: ['worker', 'german', 'tsarcoat', 'driver'][i], eyes: 'dot', look: -1 }); } }

  const flagAt = (V, n, M_, o) => country(g, M_, V, n, o);
  return [
    // 1 · cổng sắt bật bản lề, nằm đất, người đi qua lại · không người dẫn · tiếng: kim loại đổ (thud đúng "close"), im sau đó
    [ST(L.next), (t, X) => { gateFalls(t, X); }],
    // 2a · bản đồ 1989: Đông Đức bạc màu, "3 OCT 1990" · không người dẫn · tiếng: nhạc trầm
    [ST(L.less), (t, X) => { const V = view(M, { cx: 13, cy: 51.5, zoom: 2.3 }); const gone = ease((X - T.ceased) / 0.9);
      const dull = '#C9C2B0'; drawMap(g, M, V, { fill: { 'West Germany': 'flag', 'East Germany': gone > 0 ? mixC(gone) : 'flag', 'Poland': dull, 'Czechoslovakia': dull } });
      country(g, M, V, 'West Germany', { mood: 'calm', arms: 'down' }); country(g, M, V, 'East Germany', { mood: gone > 0.2 ? 'sleepy' : 'sad', arms: 'down', lift: 0 });
      S.label('3 OCT 1990', 480, 140, 100, fade(X, T.october - 0.2, 0.3), '#FFF', { stroke: '#111', align: 'center' }); }],
    // 2b · nhập thành 'Germany' (M94), mặt vui · không người dẫn · tiếng: nốt nhạc mở, im
    [GERMANY1 - 0.15, (t, X) => { const V = view(M94, { cx: 13, cy: 51.5, zoom: 2.3 });
      drawMap(g, M94, V, { fill: { 'Germany': 'flag', 'Poland': '#C9C2B0', 'Czech Republic': '#C9C2B0' } });
      country(g, M94, V, 'Germany', { mood: 'calm', arms: 'up', t, hop: 0 });
      S.label('3 OCT 1990', 480, 140, 100, 1, '#FFF', { stroke: '#111' }); }],
    // 3 · Liên Xô (1960) → vỡ thành nhiều nước (1994) ở "gone" · không người dẫn · tiếng: trầm, tiếng vỡ nhẹ
    [ST(L.year), (t, X) => { if (X < T.gone) { const V = view(M, { cx: 14, cy: 56, zoom: 0.95 }); drawMap(g, M, V, { fill: { 'USSR': 'flag' } }); country(g, M, V, 'USSR', { mood: 'calm', arms: 'down', k: 1.4 }); }
      else { const V = view(M94, { cx: 14, cy: 56, zoom: 0.95 }); const u = clamp((X - T.gone) / 0.8), cols = ['#C9C2B0', '#D9A8A0', '#A8C0D6', '#B8D6A8', '#E0CE98'];
        const fill = {}; ['Russia', 'Ukraine', 'Byelarus', 'Estonia', 'Latvia', 'Lithuania', 'Moldova', 'Georgia', 'Armenia', 'Azerbaijan'].forEach((n, i) => { fill[n] = cols[i % 5]; });
        const lift = {}; Object.keys(fill).forEach((n, i) => { lift[n] = Math.sin(clamp(u) * 3.14) * (14 + 10 * hash(i)); });
        drawMap(g, M94, V, { fill, lift }); }
      S.label(X < T.gone ? '1991' : '1991 · GONE', 960, 140, 90, 1, '#FFF', { stroke: '#111' }); }],
    // 4 · thẻ đảng bị xé đúng "expelled" · không người dẫn · tiếng: giấy xé
    [ST(L.as), (t, X) => { g.fillStyle = '#15171B'; g.fillRect(0, 0, W, H); g.fillStyle = '#1F2228'; g.fillRect(0, 900, W, 180);
      P.schab(1330, 1010, 700, { eyes: 'dot', mouth: 'flat', look: -0.7 }); S.desat(0.7, 0.1);
      const k = ease((X - T.expelled) / 0.6); for (const s of [-1, 1]) { g.save(); g.translate(620 + s * (14 + k * 160), 380 + k * k * 120); g.rotate(s * k * 0.45); g.beginPath();
        if (s < 0) { g.moveTo(-190, -130); g.lineTo(10, -130); g.lineTo(-10, -40); g.lineTo(18, 40); g.lineTo(-6, 130); g.lineTo(-190, 130); } else { g.moveTo(10, -130); g.lineTo(190, -130); g.lineTo(190, 130); g.lineTo(-6, 130); g.lineTo(18, 40); g.lineTo(-10, -40); }
        g.closePath(); g.fillStyle = '#8F2A2E'; g.fill(); g.strokeStyle = INK; g.lineWidth = 6; g.stroke(); g.fillStyle = '#D9B13B'; g.fillRect(s < 0 ? -140 : 40, -80, 100, 14); g.fillRect(s < 0 ? -140 : 40, -40, 80, 10); g.restore(); }
      sober('PARTY CARD', 620, 900, 56, fade(X, ST(L.as) + 0.3, 0.5), { col: '#B8B4AA' }); sober('EXPELLED', 620, 990, 70, fade(X, T.expelled, 0.4)); }],
    // 5a · toà án 1997: Schabowski + Krenz sau bàn, khử màu, tối dần ở "killings" · không người dẫn · tiếng: im, vọng phòng lớn
    [ST(L.court), (t, X) => { courtroom(X, { dim: 0.25 * easeOut((X - T.killings) / 0.8) }); sober('1997', 960, 190, 90, fade(X, ST(L.court) + 0.3, 0.6)); }],
    // 5b · búa toà hạ đúng "sentenced", chữ "3 YEARS" · không người dẫn · tiếng: búa gỗ (một tiếng)
    [T.sentenced - 0.35, (t, X) => { const hit = clamp((X - T.sentenced + 0.1) / 0.12); courtroom(X, { dim: 0.25, gavel: hit });
      sober('3 YEARS', 960, 190, 110, fade(X, T.three, 0.4)); }],
    // 6a · Schabowski cúi đầu nhận trách nhiệm đạo đức · không người dẫn · tiếng: im
    [ST(L.unlike), (t, X) => { alone(X, { bow: ease((X - T.accepted + 0.3) / 0.8), light: 0.55 }); sober('MORAL GUILT', 960, 200, 90, fade(X, T.moral, 0.5)); }],
    // 6b · "pardoned": ánh sáng tăng nhẹ, "AFTER ABOUT A YEAR" · không người dẫn · tiếng: cửa mở khẽ
    [T.pardoned - 0.4, (t, X) => { alone(X, { bow: lerp(1, 0.55, ease(t / 1.4)), light: lerp(0.55, 0.85, ease(t / 1.6)) }); sober('PARDONED', 960, 200, 100, fade(X, T.pardoned, 0.4)); sober('ABOUT A YEAR LATER', 960, 285, 54, fade(X, wd(L.unlike, 'year'), 0.4), { w: 500 }); }],
    // 7 · bàn trống, tờ memo dưới đèn, đèn tắt dần; "BERLIN · 2015" · không người dẫn · tiếng: nhạc tắt dần, một tiếng công tắc
    [ST(L.died), (t, X) => { const off = ease((X - (END_A - 2.6)) / 2.4); g.fillStyle = '#0E1013'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#1B1D22'; g.fillRect(0, 760, W, 320); g.fillStyle = '#2A2C33'; g.fillRect(0, 760, W, 20);
      g.fillStyle = `rgba(255,236,190,${0.18 * (1 - off)})`; g.beginPath(); g.moveTo(860, 60); g.lineTo(1060, 60); g.lineTo(1500, 880); g.lineTo(420, 880); g.closePath(); g.fill();
      g.fillStyle = '#23252B'; g.beginPath(); g.ellipse(960, 900, 380, 70, 0, 0, 7); g.fill();
      g.save(); g.globalAlpha = 1 - 0.85 * off; memo(960, 600, 330, 0.08, { title: 'NEW RULE', seed: 4 }); g.restore();
      g.fillStyle = '#4B4F58'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(950, 60); g.lineTo(970, 60); g.lineTo(960, 140); g.closePath(); g.fill();
      sober('BERLIN · 2015', 960, 960, 56, fade(X, T.fifteen - 0.3, 0.6) * (1 - 0.7 * off), { col: '#B8B4AA' }); }],
  ];

  function mixC(k) { const a = [0xD5, 0xB8, 0x4A], b = [0xC9, 0xC2, 0xB0]; return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')})`; }

  /** phòng xử án: tường gỗ tối, ghế chánh án trên cao, hai bị cáo sau bàn. o: dim, gavel 0..1 */
  function courtroom(X, o = {}) { g.fillStyle = '#2A2622'; g.fillRect(0, 0, W, H); for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#312C27' : '#292521'; g.fillRect(i * 230 - 40, 0, 226, 740); }
    g.fillStyle = '#4A3E32'; g.fillRect(560, 560, 800, 220); g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(560, 560, 800, 220); g.fillStyle = '#3A3026'; g.fillRect(560, 540, 800, 30);
    g.fillStyle = '#3B342D'; g.fillRect(0, 780, W, 300);
    P.schab(780, 1000, 600, { eyes: 'dot', mouth: 'flat', look: 0 }); P.krenz(1140, 1000, 600, { eyes: 'dot', mouth: 'flat', look: 0 });
    g.fillStyle = '#4C3F31'; g.fillRect(0, 880, W, 200); g.fillStyle = '#5E4E3C'; g.fillRect(0, 880, W, 24); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 880); g.lineTo(W, 880); g.stroke();
    if (o.gavel !== undefined) { const k = o.gavel, ang = lerp(-0.9, 0.05, k * k); g.save(); g.translate(1560, 860); g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-70, -4, 140, 30); g.strokeRect(-70, -4, 140, 30);
      g.rotate(ang); g.translate(0, -10); g.fillRect(-10, -200, 20, 200); g.strokeRect(-10, -200, 20, 200); g.fillRect(-55, -240, 110, 56); g.strokeRect(-55, -240, 110, 56); g.restore(); }
    S.desat(1, 0.15); if (o.dim) { g.fillStyle = `rgba(5,5,8,${o.dim})`; g.fillRect(0, 0, W, H); } }

  /** Schabowski một mình, cúi đầu, trong phòng tối. o: bow 0..1 (cúi), light 0..1 */
  function alone(X, o = {}) { g.fillStyle = '#17191D'; g.fillRect(0, 0, W, H); g.fillStyle = `rgba(255,236,190,${0.1 + 0.12 * o.light})`; g.beginPath(); g.moveTo(860, 0); g.lineTo(1060, 0); g.lineTo(1400, 1080); g.lineTo(520, 1080); g.closePath(); g.fill();
    g.fillStyle = '#22252B'; g.fillRect(0, 930, W, 150);
    P.schab(960, 1030, 760, { eyes: 'dot', mouth: 'flat', look: 0, tilt: 0.1 * o.bow }); S.desat(1, 0.1); }
};
