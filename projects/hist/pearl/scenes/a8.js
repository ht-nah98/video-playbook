// a8 — The bill (476–522 s). ẢNH THẬT bản đánh máy diễn văn "Day of Infamy" (PD, NARA), gạch dưới "a date which will live in infamy" →
// ảnh thật Roosevelt ký tuyên chiến (PD) → Đức + Ý tuyên chiến 11/12 (thẻ chữ, không cờ) → mặt Mỹ xắn tay, nhà máy tuôn tàu / máy bay →
// chồng hồ sơ điều tra "NO PROOF" → ba đồng hồ lần lượt bị bấm SNOOZE (tóm tắt ba lời cảnh báo).
import * as S from '../../_kit/stage.js';
import { view, drawMap, country, ANCHOR, SIZE, INK } from '../../_kit/mapkit.js';
import { alarm, battleship, plane, fade } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, M, wd, ST } = K;
  const L = { next: 'The next day, President Roosevelt', three: 'Three days later, Germany', japan: 'Japan had wanted to knock', no: 'And no, despite all', what: 'What they found', sub: 'A sub report nobody' };
  const T = { infamy: wd(L.next, 'infamy'), congress: wd(L.next, 'congress'), germany: wd(L.three, 'germany'), italy: wd(L.three, 'italy'), all: wd(L.three, 'all'), dragged: wd(L.japan, 'dragged'),
    proof: wd(L.no, 'proof'), happen: wd(L.no, 'happen'), radar: wd(L.sub, 'radar'), warning: wd(L.sub, 'warning') };
  function face(V, n, lon, lat, o = {}) { const a0 = ANCHOR[n], s0 = SIZE[n]; ANCHOR[n] = [lon, lat]; SIZE[n] = (o.r ?? 80) * 28 / (26 * V.s); const r = country(g, M, V, n, o); ANCHOR[n] = a0; SIZE[n] = s0; return r; }
  const card = (txt, sub, x, y, k, col) => { if (k <= 0) return; g.save(); g.translate(x, y); const s = back(clamp(k)); g.scale(s, s); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 8;
    g.beginPath(); g.roundRect(-300, -170, 600, 340, 24); g.fill(); g.stroke(); g.fillStyle = '#FFFFFF'; g.font = '900 78px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, -40);
    g.font = '800 44px Archivo, sans-serif'; g.fillText(sub, 0, 60); g.restore(); };

  return [
    // 1a · ẢNH THẬT bản đánh máy diễn văn (PD), bút dạ vàng chạy qua "a date which will live in infamy" · không người dẫn · tiếng: im, một tiếng bút
    [ST(L.next), (t, X) => { g.fillStyle = '#2A2C33'; g.fillRect(0, 0, W, H); const im = IM.p_infamy;
      if (im) { const s = 3.2, w = im.width * s, h = im.height * s, x = 960 - w * 0.52, y = 470 - h * 0.23; g.drawImage(im, x, y, w, h);
        const k = fade(X, T.infamy - 1.6, 1.4); g.fillStyle = 'rgba(255,224,74,0.5)'; g.fillRect(x + w * 0.6, y + h * 0.208, w * 0.2 * clamp(k * 2), h * 0.018); g.fillRect(x + w * 0.24, y + h * 0.232, w * 0.15 * clamp(k * 2 - 1), h * 0.018); }
      S.nameTag('8 DEC 1941', 1); S.credit('"Day of Infamy" speech, NARA (public domain)'); }],
    // 1b · ẢNH THẬT Roosevelt ký tuyên chiến với Nhật (PD) · tiếng: tiếng bút ký
    [T.congress - 0.4, (t, X) => { if (IM.p_fdrsign) S.photoBg(IM.p_fdrsign, t, { zoom: 1.0, fy: 0.42 }); S.credit('Photo: 8 Dec 1941, NARA (public domain)'); S.nameTag('CONGRESS DECLARES WAR', fade(X, T.congress, 0.3)); }],
    // 2 · thẻ chữ GERMANY · 11 DEC và ITALY · 11 DEC bật ra, "ALL THE WAY IN" · không người dẫn · tiếng: hai tiếng "cộp"
    [ST(L.three), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); card('GERMANY', 'DECLARES WAR · 11 DEC', 560, 480, (X - T.germany + 0.1) / 0.35, '#3A3A3E'); card('ITALY', 'DECLARES WAR · 11 DEC', 1360, 480, (X - T.italy + 0.1) / 0.35, '#3E6B45');
      S.label('U.S.A. — ALL THE WAY IN', 960, 900, 80, fade(X, T.all - 0.2, 0.3), RED, { stroke: '#FFF' }); }],
    // 3 · MEME vẽ lại khuôn "EXPECTATION / REALITY": trái = kế hoạch Nhật (mặt Mỹ ngủ gục), phải = thực tế (mặt Mỹ giận giơ tay, tàu + máy bay tuôn ra) · tiếng: nhà máy, búa
    [ST(L.japan), (t, X) => { const V = view(M, { cx: 245, cy: 38, zoom: 2.2 }), k = fade(X, T.dragged - 0.5, 0.4);
      for (const [x0, mood, arms, lab, on] of [[0, 'sleepy', 'down', "JAPAN'S PLAN", 1], [960, k > 0 ? 'angry' : 'shock', k > 0 ? 'up' : 'down', 'REALITY', 1]]) { g.save(); g.beginPath(); g.rect(x0, 0, 960, H); g.clip(); g.translate(x0 - 480, 0);
        drawMap(g, M, V, { fill: { 'United States': '#9FC3E8' } }); if (on > 0) face(V, 'United States', 254, 40, { mood, arms, t: X, r: 70 }); g.restore();
        S.label(lab, x0 + 480, 140, 76, on, '#FFFFFF', { stroke: INK }); }
      if (k > 0) for (let i = 0; i < 6; i++) { const u = ((X - T.dragged) * 0.3 + i / 6) % 1; if (u < 0) continue; g.save(); g.globalAlpha = k; if (i % 2) battleship(lerp(1900, 1000, u), 820 + (i % 3) * 50, 160, { col: '#8E959C' }); else plane(lerp(1900, 1000, u), 330 + (i % 3) * 60, 130, 'b17', { flip: true }); g.restore(); }
      g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.moveTo(960, 0); g.lineTo(960, H); g.stroke(); }],
    // 4 · chồng hồ sơ "JOINT COMMITTEE 1946" + dấu NO PROOF · người dẫn góc · tiếng: tập hồ sơ đập bàn + "cộp"
    [ST(L.no), (t, X) => { g.fillStyle = '#E2DAC4'; g.fillRect(0, 0, W, H); g.fillStyle = '#8A6A46'; g.fillRect(0, 820, W, 260);
      for (let i = 0; i < 9; i++) { const y = 800 - i * 52; g.fillStyle = i % 2 ? '#D9C9A0' : '#C9B488'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(500 + 14 * hash(i), y - 46, 640, 46); g.strokeRect(500 + 14 * hash(i), y - 46, 640, 46); }
      S.label('INVESTIGATIONS · 1941–1946', 820, 200, 56, 1, INK); S.stamp('NO PROOF', 820, 560, 110, clamp((X - T.proof) / 0.4)); S.lipHost(X, 1, { h: 460 }); }],
    // 5 · ba đồng hồ mờ trên phông giấy ("much more ordinary") · không người dẫn · tiếng: tích tắc
    [ST(L.what), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); [[420, [6, 37]], [960, [7, 2]], [1500, [7, 33]]].forEach(([x, tm]) => { g.save(); g.globalAlpha = 0.35; alarm(x, 520, 190, { time: tm }); g.restore(); }); }],
    // 6 · ba đồng hồ lần lượt sáng + SNOOZE đúng "sub" / "radar" / "warning" · không người dẫn · tiếng: ba "bốp"
    [ST(L.sub), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); const at = [ST(L.sub) + 0.4, T.radar, T.warning], lab = ['SUB · 6:37', 'RADAR · 7:02', 'TELEGRAM · 7:33'], tm = [[6, 37], [7, 2], [7, 33]];
      [420, 960, 1500].forEach((x, i) => { const on = X > at[i] - 0.2; g.save(); g.globalAlpha = on ? 1 : 0.35; alarm(x, 520, 190, { time: tm[i], label: lab[i], snooze: on ? ease((X - at[i]) / 0.2) : 0 }); g.restore(); }); }],
  ];
};
