// a3 — The first alarm (181–217 s). Cửa cảng 6:37: kính tiềm vọng sau tàu tiếp tế → ảnh thật tổ pháo USS Ward (PD) → boong Ward bắn +
// bom chìm (NGƯỜI DẪN nhập vai: lính bịt tai, mồ hôi) → bức điện leo "chuỗi chỉ huy" → bàn nối bàn "CHECK?" chậm rì → chuông #1 SNOOZE.
import * as S from '../../_kit/stage.js';
import { narrator } from '../../_kit/narrator.js';
import { INK } from '../../_kit/mapkit.js';
import { P, alarm, sea, telegram, fade, SK } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, IM, wd, ST } = K;
  const L = { at: 'At six thirty-seven', fire: 'The Ward opened fire', its: 'Its captain radioed', navy: 'The Navy had chased', other: 'In other words' };
  const T = { periscope: wd(L.at, 'submarine'), supply: wd(L.at, 'supply'), fire: wd(L.fire, 'fire'), depth: wd(L.fire, 'depth'), first: wd(L.fire, 'first'), hour: wd(L.fire, 'hour'),
    chain: wd(L.its, 'chain'), slow: wd(L.its, 'slow'), false_: wd(L.navy, 'false'), desk: wd(L.navy, 'desk'), dont: wd(L.other, "don't") };

  /** tàu khu trục 4 ống khói kiểu 1918 (Ward) nhìn ngang, mũi phải */
  function destroyer(x, y, w, o = {}) { const h = w * 0.08; g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.006); g.lineJoin = 'round'; g.fillStyle = '#8E959C';
    g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(w / 2, -h * 1.3); g.lineTo(w * 0.44, 0); g.lineTo(-w * 0.46, 0); g.closePath(); g.fill(); g.stroke();
    for (let i = 0; i < 4; i++) { g.fillRect(-w * 0.18 + i * w * 0.09, -h * 2.6, w * 0.05, h * 1.6); g.strokeRect(-w * 0.18 + i * w * 0.09, -h * 2.6, w * 0.05, h * 1.6); }
    g.fillRect(w * 0.24, -h * 2.2, w * 0.1, h * 1.0); g.strokeRect(w * 0.24, -h * 2.2, w * 0.1, h * 1.0);
    g.fillStyle = '#FFF'; g.font = `900 ${h * 0.9}px Archivo, sans-serif`; g.textAlign = 'center'; g.fillText('139', w * 0.36, -h * 0.25);
    if (o.flash > 0 && o.flash < 1) { g.fillStyle = `rgba(255,220,120,${1 - o.flash})`; g.beginPath(); g.arc(w * 0.5, -h * 1.6, w * 0.08 * (0.5 + o.flash), 0, 7); g.fill(); }
    g.restore(); }
  function freighter(x, y, w) { const h = w * 0.13; g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = Math.max(3, w * 0.006); g.fillStyle = '#6B5A48';
    g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(w / 2, -h); g.lineTo(w * 0.45, 0); g.lineTo(-w * 0.46, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#E8E1CF'; g.fillRect(-w * 0.08, -h * 2, w * 0.2, h); g.strokeRect(-w * 0.08, -h * 2, w * 0.2, h); g.fillStyle = '#3A3A3E'; g.fillRect(0, -h * 2.8, w * 0.06, h * 0.8); g.strokeRect(0, -h * 2.8, w * 0.06, h * 0.8);
    for (const mx of [-0.32, 0.32]) { g.beginPath(); g.moveTo(w * mx, -h); g.lineTo(w * mx, -h * 3); g.stroke(); } g.restore(); }

  return [
    // 1 · cửa cảng lúc 6:37: tàu tiếp tế đi vào, kính tiềm vọng lẽo đẽo phía sau, Ward lao tới từ trái · không người dẫn · tiếng: sóng, động cơ tàu
    [ST(L.at), (t, X) => { g.fillStyle = '#F2C79A'; g.fillRect(0, 0, W, 520); sea(520, X, '#6E93AB');
      freighter(lerp(1300, 1450, ease(t / 8)), 680, 820); const px = lerp(780, 930, ease(t / 8)), pk = fade(X, T.periscope - 0.3, 0.3);
      if (pk > 0) { g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#3A3A3E'; g.fillRect(px - 8, 560, 16, 90); g.strokeRect(px - 8, 560, 16, 90); g.fillRect(px - 8, 556, 36, 18); g.strokeRect(px - 8, 556, 36, 18);
        g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 5; g.beginPath(); g.moveTo(px - 70, 655); g.lineTo(px + 10, 650); g.stroke(); g.restore();
        g.save(); g.strokeStyle = RED; g.lineWidth = 10; g.beginPath(); g.arc(px + 8, 600, 90 * ease(pk), 0, 7); g.stroke(); g.restore(); }
      if (IM.c_wardship) { const ww = 1250, wh = ww * IM.c_wardship.height / IM.c_wardship.width; g.drawImage(IM.c_wardship, lerp(-1250, -560, ease((X - ST(L.at) - 2) / 5)), 745 - wh, ww, wh); }   // ẢNH THẬT USS Ward (NH 63240, PD) cắt nền
      S.credit('USS Ward: U.S. Navy NH 63240 (public domain)');
      S.label('6:37 AM · HARBOR ENTRANCE', 960, 150, 64, fade(X, ST(L.at) + 0.3, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 2a · ẢNH THẬT tổ pháo số 3 USS Ward (PD, NH 97446) · không người dẫn · tiếng: pháo nổ đúng "fire"
    [ST(L.fire), (t, X) => { if (IM.p_ward) S.photoBg(IM.p_ward, t, { zoom: 1.05 }); else { g.fillStyle = '#333'; g.fillRect(0, 0, W, H); }
      S.flash(1000, 380, clamp((X - T.fire) / 0.4), 260); S.nameTag('USS WARD · GUN No. 3', fade(X, ST(L.fire) + 0.3, 0.3)); S.credit('Photo: U.S. Navy, NH 97446 (public domain)'); }],
    // 2b · boong Ward: pháo + 2 lính mũ sắt — NGƯỜI DẪN NHẬP VAI lính thứ ba bịt tai, mồ hôi; sau đuôi tàu cột nước bom chìm · tiếng: bom chìm "bùm" nước
    [T.depth - 0.4, (t, X) => { g.fillStyle = '#F2C79A'; g.fillRect(0, 0, W, 560); sea(560, X, '#6E93AB'); g.fillStyle = '#7A8188'; g.fillRect(0, 760, W, 320); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 760); g.lineTo(W, 760); g.stroke();
      for (let i = 0; i < 3; i++) { const k = clamp((X - T.depth - i * 0.35) / 1.0); if (k <= 0) continue; const x = 300 + i * 260, hh = 380 * Math.sin(Math.min(0.5, k) * Math.PI) * (1 - 0.25 * clamp((X - T.depth - i * 0.35 - 1.5) / 2));
        g.fillStyle = 'rgba(235,245,250,0.9)'; g.beginPath(); g.moveTo(x - 70, 600); g.quadraticCurveTo(x - 30, 600 - hh, x, 600 - hh * 1.05); g.quadraticCurveTo(x + 30, 600 - hh, x + 70, 600); g.closePath(); g.fill(); g.stroke(); }
      g.save(); g.fillStyle = '#5E6447'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(1180, 640, 260, 130); g.strokeRect(1180, 640, 260, 130); g.translate(1400, 650); g.rotate(-0.18); g.fillRect(0, -20, 330, 40); g.strokeRect(0, -20, 330, 40); g.restore();
      P.gunner(1100, 1060, 420, { look: 1 }); P.gunner(1560, 1060, 420, { look: -1 });
      narrator(1330, 1080, 470, { outfit: 'soldier', arms: 'cover', mood: 'shock', mouth: 'o', fx: ['sweat'], look: -1 });
      S.label('FIRST U.S. SHOTS OF THE PACIFIC WAR', 960, 150, 58, fade(X, T.first, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 3 · bức điện leo "cầu thang chỉ huy": mỗi bậc một cái bàn, giấy bò lên chậm dần · không người dẫn · tiếng: tiếng điện báo tít-te, bước chân chậm
    [ST(L.its), (t, X) => { g.fillStyle = '#E9E2CF'; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) { const x = 200 + i * 330, y = 940 - i * 170; g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(x - 130, y - 40, 260, 40); g.strokeRect(x - 130, y - 40, 260, 40);
        g.fillRect(x - 120, y, 20, 90); g.fillRect(x + 100, y, 20, 90); P.sailor(x + 40, y - 40, 200, { look: -1 }); }
      const k = ease((X - T.chain + 0.5) / 4.5) * 0.55 + (X > T.slow ? 0 : 0); const i = k * 4, x = 200 + i * 330 + 150, y = 940 - i * 170 - 60;
      telegram(x, y, 170, -0.1, { title: 'SUB SUNK' }); S.label('CHAIN OF COMMAND', 960, 140, 64, fade(X, T.chain - 0.2, 0.3), INK); }],
    // 4 · dãy bàn nằm ngang: mỗi bàn đóng dấu "CHECK?" rồi chuyền tiếp, đồng hồ treo tường chạy · không người dẫn · tiếng: dấu đóng "cộp" ×4
    [ST(L.navy), (t, X) => { g.fillStyle = '#DCD3BC'; g.fillRect(0, 0, W, H); g.fillStyle = '#B9AE94'; g.fillRect(0, 820, W, 260);
      const stamps = ['FALSE ALARM?', 'CHECK', 'CONFIRM?', 'CHECK AGAIN'];
      for (let i = 0; i < 4; i++) { const x = 260 + i * 470; g.fillStyle = '#8A6A46'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(x - 170, 760, 340, 50); g.strokeRect(x - 170, 760, 340, 50);
        P.sailor(x, 760, 300, { look: 1, mouth: i % 2 ? 'flat' : undefined }); const at = ST(L.navy) + 0.6 + i * 1.9; S.stamp(stamps[i], x, 380, 46, clamp((X - at) / 0.4), (i % 2 ? 0.08 : -0.08)); }
      const pk = clamp((X - ST(L.navy) - 0.6) / 7.6), pi = Math.floor(pk * 4), within = pk * 4 - pi; telegram(260 + Math.min(3, pi) * 470 + ease(within) * 0, 700, 150, -0.05, { title: 'SUB SUNK' });
      const mm = Math.round(lerp(40, 70, clamp(t / 8))); alarm(1780, 150, 90, { time: [6 + Math.floor(mm / 60), mm % 60] }); }],
    // 5 · chuông #1 (SUB) đóng dấu SNOOZE — "in other words, don't worry about it" · người dẫn góc nói · tiếng: chuông tắt cụt + "bốp"
    [ST(L.other), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); alarm(780, 540, 250, { time: [6, 37], ring: X < T.dont ? 1 : 0, t: X, snooze: X > T.dont ? ease((X - T.dont) / 0.2) : 0, label: 'SUB · 6:37' });
      S.lipHost(X, 1, { h: 520 }); }],
  ];
};
