// a0 — Cold open (0–65 s). Chào → nối tập 2 (tờ memo + tiệc) → hứa "lần này không vui" → money shot: radar 7:02, cuộc gọi,
// "don't worry about it" ĐÓNG BĂNG → ảnh thật Arizona (nghiêm) → ba chuông báo thức (vật xuyên suốt) → người dẫn ngủ bấm snooze → OIL.
import * as S from '../../_kit/stage.js';
import { narrator, hatOn, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, ll, INK } from '../../_kit/mapkit.js';
import { P, alarm, scope, phone, sober, fade, SK } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, O, wd, ST, LT } = K;
  const L = { hey: 'Hey everyone', last: 'Last time, a man', prom: 'I promised you', dec: "It's December seventh", two: 'Two young privates', so: 'So they do exactly', off: 'And the officer', cpl: 'A couple of hours', worse: "And here's the part", call: "That phone call wasn't", sleep: 'So how do you sleep', oil: 'To answer that' };
  const T = { wall: wd(L.last, 'wall'), party: wd(L.last, 'party'), wouldnt: wd(L.prom, "wouldn't"), seventh: wd(L.dec, 'seventh'), hawaii: wd(L.dec, 'hawaii'),
    blip: wd(L.two, 'blip'), heading: wd(L.two, 'heading'), phone: wd(L.so, 'phone'), dont: wd(L.off, "don't"), dead: wd(L.cpl, 'dead'), war: wd(L.cpl, 'war'),
    first: wd(L.call, 'first'), last: wd(L.call, 'last'), three: wd(L.sleep, 'three'), oil: wd(L.oil, 'oil') };

  /** lều radar: tường ván ô-liu, bàn, màn radar trái; hai binh nhì */
  function hut(X, o = {}) { g.fillStyle = '#4B4A32'; g.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) { g.fillStyle = i % 2 ? '#55543A' : '#4B4A32'; g.fillRect(i * 170, 0, 166, H); }
    g.fillStyle = '#2B2A20'; g.fillRect(0, 860, W, 220);
    scope(560, 470, 330, { blob: o.blob ?? 0, dist: o.dist ?? 0, sweep: X * 2.2, ring: o.ring ?? 0 });
    P.lockard(1180, 1080, 560, { look: -1, mouth: o.mouth ?? 'flat', eyes: o.eyes ?? 'dot', arm: o.arm });
    P.elliott(1560, 1080, 540, { look: -1, mouth: 'o', eyes: o.eyes ?? 'dot' }); }

  return [
    // 1 · chào: phông giấy, người dẫn toàn thân vẫy + tên kênh · người dẫn (chào) · tiếng: nhạc mở
    [0, (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); g.fillStyle = RED; g.fillRect(0, 0, W, 22); g.fillRect(0, H - 22, W, 22);
      S.label('BLUNDERSTORY', 560, 430, 112, fade(X, 0.3, 0.4), INK, { free: true });
      S.label("history's biggest disasters · tiny, stupid mistakes", 560, 530, 38, fade(X, 1.6, 0.4), '#5A5A5A', { free: true });
      narrator(1480, H + 40, 900, { outfit: 'plain', mood: 'joy', arms: 'wave', t: X, mouth: mouthAt(X), look: -1 }); }],
    // 2 · tập trước: Tường Berlin vỡ + tờ memo bay + hoa giấy · không người dẫn · tiếng: tiếng hò reo nhỏ
    [ST(L.last), (t, X) => { g.fillStyle = '#1E2A44'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#BDB8AE'; g.strokeStyle = INK; g.lineWidth = 6; for (let i = 0; i < 9; i++) { if (i === 4 && X > T.wall) continue; g.fillRect(i * 220 + 20, 560, 200, 360); g.strokeRect(i * 220 + 20, 560, 200, 360); }
      if (X > T.wall) for (let i = 0; i < 6; i++) { const k = ease((X - T.wall) / 0.7); g.save(); g.translate(900 + (hash(i) - 0.5) * 300 * k, 740 + k * 200 * hash(i + 3)); g.rotate(k * (hash(i + 9) - 0.5) * 2); g.fillStyle = '#BDB8AE'; g.fillRect(-40, -40, 80, 80); g.strokeRect(-40, -40, 80, 80); g.restore(); }
      g.fillStyle = '#7D7974'; g.fillRect(0, 920, W, 160);
      const mk = ease((X - ST(L.last)) / 2.2); g.save(); g.translate(lerp(300, 1500, mk), lerp(300, 180, mk) + 30 * Math.sin(X * 3)); g.rotate(X * 1.5);
      g.fillStyle = '#FBF8EE'; g.fillRect(-90, -120, 180, 240); g.strokeRect(-90, -120, 180, 240); g.fillStyle = '#9A978C'; for (let i = 0; i < 8; i++) g.fillRect(-70, -90 + i * 26, 100 + 30 * hash(i), 8); g.restore();
      if (X > T.party - 0.2) for (let i = 0; i < 60; i++) { const fx = (hash(i) * W + i * 13) % W, fy = ((X - T.party) * 260 * (0.6 + hash(i + 5)) + hash(i + 7) * 400) % H;
        g.fillStyle = ['#F3C61B', '#C2343A', '#3FA34D', '#2B6BD6', '#FFFFFF'][i % 5]; g.fillRect(fx, fy, 16, 9); }
      S.label('LAST TIME: BERLIN, 1989', 960, 180, 76, fade(X, ST(L.last) + 0.3, 0.3), '#FFFFFF', { stroke: '#111' }); }],
    // 3 · hứa: hoa giấy rơi xuống đất, đèn tắt dần; người dẫn góc nói · người dẫn góc · tiếng: nhạc tắt dần
    [ST(L.prom), (t, X) => { const d = ease((X - T.wouldnt + 0.3) / 1.2); g.fillStyle = '#1E2A44'; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 60; i++) { g.fillStyle = ['#F3C61B', '#C2343A', '#3FA34D', '#2B6BD6', '#FFFFFF'][i % 5]; g.fillRect((hash(i) * W + i * 13) % W, 980 + hash(i + 7) * 60, 16, 9); }
      g.fillStyle = `rgba(5,6,10,${0.75 * d})`; g.fillRect(0, 0, W, H);
      S.lipHost(X, clamp((X - ST(L.prom)) / 0.3), { h: 520 }); }],
    // 4 · 7 DEC 1941, 7:02, Chủ nhật yên ả — bản đồ Oahu bình minh + đồng hồ báo thức 7:02 · không người dẫn · tiếng: chim, sóng
    [ST(L.dec), (t, X) => { const V = view(O, { cx: 202.0, cy: 21.47, zoom: 1.0 + 0.02 * t }); drawMap(g, O, V, { fill: { Oahu: '#E3DDC6' } });
      g.fillStyle = 'rgba(255,190,140,0.18)'; g.fillRect(0, 0, W, H);
      const [ox, oy] = V.pt(ll(O, 360 - 158.05, 21.68)); g.fillStyle = RED; g.beginPath(); g.arc(ox, oy, 14, 0, 7); g.fill(); S.label('OPANA', ox, oy - 34, 40, fade(X, T.hawaii, 0.3));
      alarm(1620, 700, 170, { time: [7, 2] }); S.label('SUNDAY · 7 DEC 1941', 560, 980, 80, fade(X, T.seventh - 0.2, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 5 · lều radar: chùm đốm lớn dần ở phía bắc, hai binh nhì há hốc · không người dẫn · tiếng: tiếng bíp radar đều
    [ST(L.two), (t, X) => { const k = ease((X - T.blip + 0.2) / 1.0), m = ease((X - T.heading) / 2.5); hut(X, { blob: k, dist: m * 0.35, ring: fade(X, T.blip + 0.6, 0.4), eyes: k > 0.5 ? 'shock' : 'dot' }); }],
    // 6 · cận: tay nhấc ống nghe điện thoại bàn · không người dẫn · tiếng: tiếng nhấc máy + quay số
    [ST(L.so), (t, X) => { g.fillStyle = '#3A3926'; g.fillRect(0, 0, W, H); g.fillStyle = '#2B2A20'; g.fillRect(0, 760, W, 320);
      const k = ease((X - T.phone + 0.3) / 0.6); phone(960, 900, 420, { off: k > 0.05 });
      if (k > 0.05) { g.save(); g.translate(lerp(960, 1180, k), lerp(580, 300, k)); g.rotate(-0.5 * k); g.fillStyle = '#1C1C20'; g.strokeStyle = INK; g.lineWidth = 8;
        g.beginPath(); g.roundRect(-250, -34, 500, 68, 34); g.fill(); g.stroke(); for (const s of [-1, 1]) { g.beginPath(); g.ellipse(s * 230, 30, 70, 52, 0, 0, 7); g.fill(); g.stroke(); }
        g.fillStyle = SK; g.beginPath(); g.ellipse(0, 40, 120, 70, 0, 0, 7); g.fill(); g.stroke(); g.restore(); } }],
    // 7 · sĩ quan trực nghe máy, nháy mắt giơ ngón cái — "DON'T WORRY ABOUT IT." đóng băng · không người dẫn · tiếng: im 1 s trước câu, "ding" nhỏ khi chữ hiện
    [ST(L.off), (t, X) => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, W, H); for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#625F47' : '#5B5A42'; g.fillRect(i * 340, 0, 330, H); }
      g.fillStyle = '#3A3020'; g.fillRect(0, 820, W, 260); phone(560, 830, 220);
      const frozen = X > T.dont; P.tyler(1250, 1080, 760, { look: -1, mouth: frozen ? 'grin' : 'flat', arm: frozen ? 'up' : undefined });
      if (frozen) { g.fillStyle = 'rgba(255,255,255,0.08)'; g.fillRect(0, 0, W, H); S.label('"DON\'T WORRY ABOUT IT."', 960, 200, 104, fade(X, T.dont, 0.25), '#FFE04A', { stroke: INK }); } }],
    // 8 · ảnh thật USS Arizona cháy, khử màu dần; "2,403" + "WAR" · NGHIÊM, không người dẫn · tiếng: nhạc tắt, gió
    [ST(L.cpl), (t, X) => { g.fillStyle = '#0E0F12'; g.fillRect(0, 0, W, H); S.photo(IM.p_arizona, 960, 430, 1000 + 30 * t); S.desat(0.6 * ease(t / 2));
      sober('2,403 DEAD', 960, 880, 110, fade(X, T.dead, 0.4)); sober('THE UNITED STATES IS AT WAR', 960, 980, 54, fade(X, T.war, 0.4));
      S.credit('Photo: U.S. Navy, 7 Dec 1941 (public domain)'); }],
    // 9 · cận mặt người dẫn sốc (≤ 1.2 s) rồi phông giấy · người dẫn phản ứng · tiếng: "dun" nhỏ gắn mặt
    [ST(L.worse), (t, X) => { if (t < 1.1) return S.bigFace(t, 'shock', 'o'); g.fillStyle = PAPER; g.fillRect(0, 0, W, H); S.lipHost(X, 1, { h: 520 }); alarm(800, 560, 220, { time: [7, 2] }); }],
    // 10 · ba đồng hồ báo thức: cái giữa (radar) sáng trước, rồi cái đầu ("first"), cái cuối ("last") · không người dẫn · tiếng: ba tiếng "ring" ngắn đúng từ
    [ST(L.call), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
      const on = [X > T.first, true, X > T.last], lab = ['SUB · 6:37', 'RADAR · 7:02', 'TELEGRAM · 7:33'], tm = [[6, 37], [7, 2], [7, 33]];
      [420, 960, 1500].forEach((x, i) => { g.save(); g.globalAlpha = on[i] ? 1 : 0.25; alarm(x, 560, 190, { time: tm[i], ring: on[i] ? 1 : 0, t: X, label: lab[i] }); g.restore(); }); }],
    // 11 · người dẫn ngủ đội mũ ngủ, ba chuông reo, tay đập snooze · NGƯỜI DẪN NHẬP VAI (ngủ quên) · tiếng: chuông + ngáy + "bốp"
    [ST(L.sleep), (t, X) => { g.fillStyle = '#E8E1CF'; g.fillRect(0, 0, W, H);
      [300, 680, 1060].forEach((x, i) => { const sn = X > T.three + i * 0.3 ? ease((X - T.three - i * 0.3) / 0.15) : 0; alarm(x, 330, 150, { time: [[6, 37], [7, 2], [7, 33]][i], ring: sn > 0 ? 0 : 1, t: X + i, snooze: sn }); });
      g.fillStyle = '#FFFFFF'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.ellipse(1360, 820, 360, 110, -0.06, 0, 7); g.fill(); g.stroke();
      narrator(1360, H + 250, 760, { outfit: 'plain', mood: 'closed', mouth: 'o', lean: -0.5 });
      g.save(); g.translate(1360, H + 250); g.rotate(-0.5); g.translate(-1360, -(H + 250)); hatOn(1360, H + 250, 760, 'night', { v: 'B' }); g.restore();
      g.fillStyle = '#5C7FB5'; g.beginPath(); g.moveTo(700, H + 20); g.lineTo(700, 990); g.quadraticCurveTo(1300, 920, 1940, 980); g.lineTo(1940, H + 20); g.closePath(); g.fill(); g.stroke();
      S.label('z Z Z', 1650, 600, 80, 1, '#FFFFFF', { stroke: INK, rot: -0.15 }); }],
    // 12 · "OIL." — thùng dầu đóng dấu · không người dẫn · tiếng: tiếng gõ thùng phuy
    [ST(L.oil), (t, X) => { g.fillStyle = '#1B1D22'; g.fillRect(0, 0, W, H); const k = back(clamp((X - ST(L.oil) - 0.2) / 0.35));
      g.save(); g.translate(960, 560); g.scale(k, k); g.fillStyle = '#2E4A7A'; g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.roundRect(-210, -270, 420, 540, 30); g.fill(); g.stroke();
      for (const y of [-150, 0, 150]) { g.beginPath(); g.moveTo(-210, y); g.lineTo(210, y); g.stroke(); } g.fillStyle = '#FFE04A'; g.font = '900 130px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('OIL', 0, 75); g.restore(); }],
  ];
};
