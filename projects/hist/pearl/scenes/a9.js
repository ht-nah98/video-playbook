// a9 — Outro (522–586 s) + thẻ kết. Tyler + dấu "?" → bản đồ: 6 tàu sân bay đã trên đường (một giờ cảnh báo không chặn nổi) → "WHAT IF":
// máy bay giãn ra, rương đạn mở, tiêm kích cất cánh → hồ sơ Hội đồng Hải quân "NO TRAINING · NO STAFF · NO SUPERVISION" → Tyler già với
// bốn chữ → ảnh thật tổ pháo Ward → lịch 7 DEC 1944, O'Brien (Outerbridge) bắn chìm Ward → cận mặt người dẫn nháy mắt → tường thành
// ảnh thật bức điện Zimmermann "NEXT: 1917" → thẻ kết BLUNDERSTORY đứng yên ≥ 4 s.
import * as S from '../../_kit/stage.js';
import { narrator, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, ll, INK } from '../../_kit/mapkit.js';
import { P, alarm, carrier, plane, sea, telegram, fade, SK } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, M, wd, ST } = K;
  const L = { so: 'So, did one man saying', not: 'Not really, because six', but: 'But it could have filled', kt: 'Kermit Tyler was never', ret: 'He retired as a lieutenant', ward: 'And the Ward, the little',
    sunk: 'It was sunk exactly', hist: 'History, it turns out', next: 'Next time, a German minister' };
  const T = { carriers: wd(L.not, 'carriers'), hour: wd(L.not, "hour's"), guns: wd(L.but, 'guns'), planes: wd(L.but, 'planes'), fighters: wd(L.but, 'fighters'), saved: wd(L.but, 'saved'),
    training: wd(L.kt, 'training'), staff: wd(L.kt, 'staff'), supervision: wd(L.kt, 'supervision'), four: wd(L.ret, 'four'), sunk: wd(L.sunk, 'sunk'), fortyfour: wd(L.sunk, 'forty-four'), same: wd(L.sunk, 'same'),
    humor: wd(L.hist, 'humor'), secret: wd(L.next, 'secret'), cables: wd(L.next, 'cables'), fake: wd(L.next, 'fake'), me: wd(L.next, 'me') };
  const office = () => { g.fillStyle = '#5B5A42'; g.fillRect(0, 0, W, H); g.fillStyle = '#3A3020'; g.fillRect(0, 820, W, 260); };

  return [
    // 1 · Tyler đứng giữa, dấu "?" lớn trên đầu · không người dẫn · tiếng: "hmm" nhạc lắng
    [ST(L.so), (t, X) => { office(); P.tyler(960, 1080, 760, { look: 0, mouth: 'flat' }); S.label('?', 960, 230, 220, fade(X, ST(L.so) + 0.6, 0.3), '#FFE04A', { stroke: INK }); }],
    // 2 · bản đồ: 6 tàu sân bay Nhật đã gần Hawaii, đồng hồ "+1 HOUR" bị gạch · không người dẫn · tiếng: sóng nặng
    [ST(L.not), (t, X) => { const V = view(M, { cx: 196, cy: 28, zoom: 3.0 }); drawMap(g, M, V, { fill: { 'United States': '#9FC3E8' } }); const [hx, hy] = V.pt(ll(M, 202, 21.5));
      for (let i = 0; i < 6; i++) carrier(hx - 260 + (i % 3) * 230, hy - 420 + Math.floor(i / 3) * 110 + 40 * ease((X - ST(L.not)) / 6), 190, { flag: 'jp' });
      S.label('6 CARRIERS · ALREADY HERE', 960, 980, 60, fade(X, T.carriers - 0.2, 0.3), '#FFFFFF', { stroke: INK });
      if (X > T.hour - 0.3) { alarm(1600, 300, 120, { time: [7, 2], label: '+1 HOUR WARNING' }); S.stamp('NOT ENOUGH', 1600, 300, 54, clamp((X - T.hour) / 0.4)); } }],
    // 3 · "WHAT IF": sân bay — rương đạn mở, máy bay giãn ra, tiêm kích cất cánh · không người dẫn · tiếng: động cơ khởi động, máy bay lên
    [ST(L.but), (t, X) => { g.fillStyle = '#A9B48C'; g.fillRect(0, 0, W, H); g.fillStyle = '#C9C3B0'; g.fillRect(0, 300, W, 520); const sp = ease((X - T.planes + 0.3) / 1.2);
      for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const x = 220 + i * (190 + 70 * sp), y = 400 + r * (150 + 30 * sp); g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#9EA6A0';
        g.beginPath(); g.ellipse(0, 0, 15, 63, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-75, -18, 150, 24, 8); g.fill(); g.stroke(); g.restore(); }
      const ok = fade(X, T.guns - 0.3, 0.3); g.save(); g.translate(1700, 930); g.fillStyle = '#6B5A3A'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-130, -70, 260, 140); g.strokeRect(-130, -70, 260, 140);
      g.fillStyle = INK; g.font = '900 34px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText(ok > 0 ? 'AMMO: OPEN' : 'AMMO', 0, 12); g.restore();
      const fk = ease((X - T.fighters + 0.2) / 1.5); for (let i = 0; i < 3; i++) if (fk > 0) plane(lerp(300, 1500, fk) - i * 160, lerp(250, 80, fk) + i * 60, 180, 'b17', { rot: -0.15 });
      S.label('WHAT IF?', 960, 140, 90, 1, '#FFE04A', { stroke: INK }); S.label('SOME LIVES SAVED', 960, 1010, 54, fade(X, T.saved - 0.3, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 4 · hồ sơ Hội đồng Hải quân 1942: "NO TRAINING · NO STAFF · NO SUPERVISION", dấu CLEARED; Tyler bên phải · không người dẫn · tiếng: ba "tick"
    [ST(L.kt), (t, X) => { g.fillStyle = '#E2DAC4'; g.fillRect(0, 0, W, H); P.tyler(1550, 1080, 680, { look: -1, mouth: 'flat' });
      g.save(); g.translate(700, 520); g.rotate(-0.03); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-460, -380, 920, 760); g.strokeRect(-460, -380, 920, 760);
      g.fillStyle = INK; g.font = '700 40px "Courier New", monospace'; g.textAlign = 'left'; g.fillText('NAVAL BOARD OF INQUIRY · 1942', -410, -300);
      [['NO TRAINING', T.training], ['NO STAFF', T.staff], ['NO SUPERVISION', T.supervision]].forEach(([s, at], i) => { g.globalAlpha = fade(X, at - 0.2, 0.3); g.font = '900 64px Archivo, sans-serif'; g.fillStyle = RED; g.fillText('✗ ' + s, -400, -160 + i * 130); });
      g.restore(); S.stamp('NOT PUNISHED', 700, 820, 64, clamp((X - ST(L.kt) - 0.6) / 0.4)); }],
    // 5 · Tyler tóc bạc (già), khung tranh "DON'T WORRY ABOUT IT." treo sau lưng · không người dẫn · tiếng: nhạc lắng
    [ST(L.ret), (t, X) => { g.fillStyle = '#D9D1BC'; g.fillRect(0, 0, W, H); g.fillStyle = '#9A8B74'; g.fillRect(0, 860, W, 220);
      g.save(); g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 10; g.fillRect(380, 140, 1160, 300); g.strokeRect(380, 140, 1160, 300); g.fillStyle = '#FBF8EE'; g.fillRect(420, 180, 1080, 220); g.restore();
      S.label('"DON\'T WORRY ABOUT IT."', 960, 320, 64, fade(X, ST(L.ret) + 0.3, 0.3), INK, { free: true });
      P.tylerOld(960, 1080, 600, { look: 0, mouth: 'flat' }); S.nameTag('KERMIT TYLER · 1914–2010', fade(X, ST(L.ret) + 0.3, 0.3)); }],
    // 6 · ẢNH THẬT tổ pháo USS Ward (PD) · tiếng: nhạc quay lại chủ đề
    [ST(L.ward), (t, X) => { if (IM.p_ward) S.photoBg(IM.p_ward, t, { zoom: 1.1 }); S.credit('Photo: U.S. Navy, NH 97446 (public domain)'); S.nameTag('USS WARD', 1); }],
    // 7 · lịch "7 DEC 1944"; trên biển: O'Brien bắn Ward đang cháy, thuyền trưởng Outerbridge trên boong O'Brien · không người dẫn · tiếng: pháo xa
    [ST(L.sunk), (t, X) => { const f = IM.p_ward1944 ? S.photoBg(IM.p_ward1944, t, { zoom: 1.05 }) : null; S.credit("Photo: U.S. Navy, Ormoc Bay, 7 Dec 1944 (public domain)");   // ẢNH THẬT: O'Brien phun nước / bắn vào Ward đang cháy
      if (f) { const iw = IM.p_ward1944.width, ih = IM.p_ward1944.height, [ax, ay] = f(iw * 0.36, ih * 0.75), [bx, by] = f(iw * 0.66, ih * 0.75);
        S.label('USS WARD', ax, ay + 110, 44, 1, '#FFFFFF', { stroke: INK }); S.label("USS O'BRIEN · CDR. OUTERBRIDGE", bx, by + 110, 40, fade(X, T.same - 0.2, 0.3), '#FFFFFF', { stroke: INK }); }
      g.save(); g.translate(1660, 230); g.fillStyle = '#FFFDF4'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-150, -130, 300, 240); g.strokeRect(-150, -130, 300, 240); g.fillStyle = RED; g.fillRect(-150, -130, 300, 64); g.strokeRect(-150, -130, 300, 64);
      g.fillStyle = '#FFF'; g.font = '900 40px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('DEC', 0, -84); g.fillStyle = INK; g.font = '900 100px Archivo, sans-serif'; g.fillText('7', 0, 40); g.font = '900 38px Archivo, sans-serif';
      g.fillText(X > T.fortyfour - 0.3 ? '1944' : '1941', 0, 94); g.restore(); }],
    // 8 · cận mặt người dẫn nháy mắt + lấp lánh ("History has a sense of humor") · người dẫn phản ứng ≤ 1.2 s rồi góc · tiếng: "ding" nhẹ
    [ST(L.hist), (t, X) => { if (t < 1.2) { g.fillStyle = '#121212'; g.fillRect(0, 0, W, H); narrator(980, H + 470, 1700, { v: 'C', mood: 'wink', mouth: 'grin', fx: ['shine'] }); return; }
      g.fillStyle = PAPER; g.fillRect(0, 0, W, H); S.label('HISTORY HAS A SENSE OF HUMOR', 800, 520, 64, 1, INK); S.lipHost(X, 1, { h: 520 }); }],
    // 9 · móc tập 4 (đổi 10-30 từ Constantinople): ẢNH THẬT bức điện Zimmermann mã hoá (PD, NARA) trượt vào như vật trên bàn tối,
    //     "TOP SECRET" đúng "secret" → "FAKE?" xám đúng "fake" → dấu đỏ "REAL." đúng "me" · người dẫn góc · tiếng: tờ giấy + dấu
    [ST(L.next), (t, X) => { g.fillStyle = '#1E2230'; g.fillRect(0, 0, W, H); const im = IM.p_zimmermann;
      if (im) S.photo(im, lerp(-400, 760, easeOut(clamp(t / 0.5))), 590, 560, 1, { rot: -0.04, credit: 'Zimmermann Telegram, 1917, NARA (public domain)' });
      S.label('NEXT: 1917', 760, 130, 92, fade(X, ST(L.next) + 0.3, 0.3), '#FFE04A', { stroke: INK });
      S.stamp('TOP SECRET', 760, 380, 72, (X - T.secret) / 0.4);
      if (X < T.me) S.label('FAKE?', 1380, 380, 120, fade(X, T.fake - 0.1, 0.25), '#B8BCC6', { stroke: INK });
      S.stamp('REAL.', 1380, 380, 130, (X - T.me + 0.1) / 0.4); S.lipHost(X, 1, { h: 460 }); }],
    // 10 · THẺ KẾT (K.END → K.DUR, đứng yên ≥ 4 s): BLUNDERSTORY + SUBSCRIBE + người dẫn vẫy mũ ngủ · tiếng: sting PD
    [K.END, (t, X) => { const Xf = K.END + 0.3; g.fillStyle = '#14233B'; g.fillRect(0, 0, W, H); g.fillStyle = RED; g.fillRect(0, 0, W, 26); g.fillRect(0, H - 26, W, 26);
      g.save(); g.translate((1 - easeOut(clamp(t / 0.4))) * -900, 0);
      S.label('BLUNDERSTORY', 650, 330, 112, 1, '#FFFFFF', { stroke: '#0B1424', free: true });
      g.fillStyle = RED; g.strokeStyle = '#0B1424'; g.lineWidth = 8; g.beginPath(); g.roundRect(360, 440, 560, 130, 30); g.fill(); g.stroke();
      g.fillStyle = '#FFFFFF'; g.font = '900 68px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SUBSCRIBE', 640, 506);
      g.fillStyle = '#F3C61B'; g.beginPath(); g.arc(1010, 506, 40, Math.PI, 0); g.lineTo(1050, 540); g.lineTo(970, 540); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(1010, 552, 12, 0, 7); g.fill(); g.stroke();
      S.label("DON'T WORRY. WE'LL REMIND YOU.", 640, 720, 50, 1, '#C9D3E3', { free: true }); g.restore();
      narrator(1480, 1080, 800, { outfit: 'plain', mood: 'wink', arms: 'wave', t: Xf, mouth: X < K.END + 0.1 ? mouthAt(X) : 'grin', look: -1 }); }],
  ];
};
