// a5 — The third alarm (316–376 s). Hai đồng hồ Washington 12:32 / Hawaii 7:02 → máy giải mã nhả giấy "DELIVER AT 1:00 PM" → Marshall
// nghĩ (1 PM ↔ 7:30 AM) → viết cảnh báo → đài quân đội nhiễu ✗ → hai bức điện giống hệt: "WAR WARNING" = "HAPPY BIRTHDAY", dấu NOT URGENT →
// 7:33 Honolulu, teletype "OUT OF ORDER" → túi người đưa thư, xe máy (NGƯỜI DẪN nhập vai người đưa điện tín, choáng) → khói, kẹt đường →
// Short nhận buổi chiều → chuông #3 SNOOZE.
import * as S from '../../_kit/stage.js';
import { narrator } from '../../_kit/narrator.js';
import { INK } from '../../_kit/mapkit.js';
import { P, alarm, telegram, fade, SK, OD } from './common.js';
const { W, H, RED, PAPER, clamp, lerp, ease, easeOut, back, hash } = S;

export default K => { const { g, wd, ST } = K;
  const L = { mean: 'Meanwhile, in Washington', code: 'American codebreakers', gen: 'General George Marshall', so: 'So he wrote a warning', then: "Then the Army's radio",
    most: 'So the most important warning', reached: 'It reached the telegraph', mess: 'That messenger was still' };
  const T = { lunch: wd(L.mean, 'lunchtime'), cracked: wd(L.code, 'cracked'), one: wd(L.code, 'one'), strange: wd(L.gen, 'strange'), hawaii: wd(L.gen, 'hawaii'), alert: wd(L.so, 'alert'),
    radio: wd(L.then, 'radio'), static: wd(L.then, 'static'), telegram: wd(L.most, 'telegram'), aunt: wd(L.most, 'aunt'), urgent: wd(L.most, 'urgent'),
    honolulu: wd(L.reached, 'honolulu'), teletype: wd(L.reached, 'teletype'), bag: wd(L.reached, 'bag'), motorcycle: wd(L.reached, 'motorcycle'), bombs: wd(L.mess, 'bombs'), afternoon: wd(L.mess, 'afternoon') };
  const office = () => { g.fillStyle = '#E2DAC4'; g.fillRect(0, 0, W, H); g.fillStyle = '#B9AE94'; g.fillRect(0, 820, W, 260); g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 820); g.lineTo(W, 820); g.stroke(); };
  const twoClocks = (X, a, b, la, lb, k = 1) => { alarm(560, 470, 220, { time: a, label: la }); g.save(); g.globalAlpha = k; alarm(1360, 470, 220, { time: b, label: lb }); g.restore(); };
  /** xe máy vẽ phẳng + người lái (NGƯỜI DẪN đội mũ da kính bảo hộ = outfit 'reporter'? → dùng hatOn không có; vẽ người dẫn + kính bằng P.messenger nét riêng) */
  function moto(x, y, s, X) { g.save(); g.translate(x, y); g.strokeStyle = INK; g.lineWidth = Math.max(5, s * 0.02); g.lineJoin = 'round';
    for (const wx of [-0.42, 0.42]) { g.fillStyle = '#1C1C20'; g.beginPath(); g.arc(wx * s, 0, s * 0.18, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#9A9A9A'; g.beginPath(); g.arc(wx * s, 0, s * 0.06, 0, 7); g.fill(); }
    g.fillStyle = '#7A2E2E'; g.beginPath(); g.moveTo(-0.42 * s, -0.05 * s); g.lineTo(-0.1 * s, -0.28 * s); g.lineTo(0.3 * s, -0.3 * s); g.lineTo(0.42 * s, -0.05 * s); g.lineTo(0.1 * s, -0.1 * s); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(0.3 * s, -0.3 * s); g.lineTo(0.38 * s, -0.5 * s); g.stroke(); g.fillStyle = '#6A4A30'; g.fillRect(-0.5 * s, -0.42 * s, 0.25 * s, 0.2 * s); g.strokeRect(-0.5 * s, -0.42 * s, 0.25 * s, 0.2 * s);   // túi thư
    g.restore();
    narrator(x - 0.05 * s, y - 0.18 * s, s * 0.95, { outfit: 'plain', arms: 'point', mood: 'dizzy', mouth: 'wavy', look: 1, fx: ['sweat'] }); }

  return [
    // 1 · hai đồng hồ: WASHINGTON 12:32 PM · HAWAII 7:02 AM · không người dẫn · tiếng: "tick" đổi cảnh
    [ST(L.mean), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); twoClocks(X, [12, 32], [7, 2], 'WASHINGTON 12:32 PM', 'HAWAII 7:02 AM'); }],
    // 2 · máy giải mã (hộp tím) nhả dải giấy "DELIVER AT 1:00 PM" · không người dẫn · tiếng: máy rè rè + "ding"
    [ST(L.code), (t, X) => { office(); g.save(); g.translate(700, 620); g.fillStyle = '#5B3F7A'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-300, -200, 600, 300); g.strokeRect(-300, -200, 600, 300);
      for (let i = 0; i < 12; i++) { g.fillStyle = '#E8E1CF'; g.beginPath(); g.arc(-240 + (i % 6) * 96, -120 + Math.floor(i / 6) * 90, 26, 0, 7); g.fill(); g.stroke(); } g.restore();
      const k = ease((X - T.cracked + 0.2) / 2.5); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(1000, 520, 760 * k, 110); g.strokeRect(1000, 520, 760 * k, 110);
      g.save(); g.beginPath(); g.rect(1000, 520, 760 * k, 110); g.clip(); g.fillStyle = INK; g.font = '700 52px "Courier New", monospace'; g.fillText('DELIVER AT 1:00 PM', 1030, 592); g.restore();
      S.label('CODEBREAKERS', 700, 260, 64, fade(X, ST(L.code) + 0.3, 0.3), INK); P.clerk(1500, 1000, 360, { look: -1, mouth: 'o' }); }],
    // 3 · Marshall nghĩ: bong bóng "1 PM SUNDAY?" + hai đồng hồ nhỏ 1:00 PM ↔ 7:30 AM · không người dẫn · tiếng: "hmm"
    [ST(L.gen), (t, X) => { office(); P.marshall(420, 1080, 760, { look: 1, mouth: 'flat' }); S.nameTag('GEN. GEORGE MARSHALL', fade(X, ST(L.gen) + 0.3, 0.3), 70, 1000);
      S.label('1 PM ON A SUNDAY?', 1200, 200, 70, fade(X, T.strange - 0.2, 0.3), INK); g.save(); g.globalAlpha = fade(X, T.strange, 0.3); alarm(1000, 560, 150, { time: [13, 0], label: 'WASHINGTON' }); g.restore();
      g.save(); g.globalAlpha = fade(X, T.hawaii - 0.2, 0.3); alarm(1500, 560, 150, { time: [7, 30], label: 'HAWAII' }); g.restore(); }],
    // 4 · Marshall viết tay tờ cảnh báo "BE ON ALERT" · không người dẫn · tiếng: bút sột soạt
    [ST(L.so), (t, X) => { office(); P.marshall(1450, 1080, 760, { look: -1, mouth: 'flat' }); g.save(); g.translate(720, 520); g.rotate(-0.04); g.fillStyle = '#FBF8EE'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-380, -300, 760, 560); g.strokeRect(-380, -300, 760, 560);
      g.fillStyle = '#1D2A55'; g.font = 'italic 800 64px Archivo, sans-serif'; g.textAlign = 'left'; const txt = 'BE ON ALERT.'; const n = Math.round(txt.length * clamp((X - ST(L.so) - 0.3) / 2.2)); g.fillText(txt.slice(0, n), -320, -120);
      g.fillStyle = '#9A978C'; for (let i = 0; i < 4; i++) g.fillRect(-320, 0 + i * 60, 500 + 100 * hash(i), 10); g.restore(); S.label('TO: PACIFIC COMMANDS', 720, 140, 56, fade(X, T.alert - 0.4, 0.3), INK); }],
    // 5 · đài vô tuyến quân đội: màn nhiễu zigzag, dấu ✗ đỏ "STATIC" · không người dẫn · tiếng: tiếng rè nhiễu
    [ST(L.then), (t, X) => { g.fillStyle = '#2A2C33'; g.fillRect(0, 0, W, H); g.save(); g.translate(960, 560); g.fillStyle = '#5A4632'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-440, -260, 880, 520); g.strokeRect(-440, -260, 880, 520);
      g.fillStyle = '#0F1A12'; g.fillRect(-380, -200, 500, 300); g.strokeRect(-380, -200, 500, 300); g.strokeStyle = '#8CFF9F'; g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 60; i++) { const x = -370 + i * 8, y = -50 + (hash(i + Math.floor(X * 20)) - 0.5) * 220; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      g.fillStyle = '#C9A15A'; g.strokeStyle = INK; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(280, -140 + i * 120, 44, 0, 7); g.fill(); g.stroke(); } g.restore();
      S.label('ARMY RADIO → HAWAII', 960, 150, 60, 1, '#FFFFFF', { stroke: INK }); if (X > T.static - 0.1) { g.save(); g.strokeStyle = RED; g.lineWidth = 34; g.lineCap = 'round'; const k = clamp((X - T.static + 0.1) / 0.25);
        g.beginPath(); g.moveTo(600, 300); g.lineTo(lerp(600, 1320, k), lerp(300, 820, k)); g.moveTo(1320, 300); g.lineTo(lerp(1320, 600, k), lerp(300, 820, k)); g.stroke(); g.restore(); } }],
    // 6 · hai bức điện y hệt cạnh nhau: "WAR WARNING" ↔ "HAPPY BIRTHDAY, AUNT MAY" — dấu NOT URGENT đóng lên cái đầu · người dẫn góc · tiếng: "cộp" dấu
    [ST(L.most), (t, X) => { g.fillStyle = PAPER; g.fillRect(0, 0, W, H); telegram(560, 520, 620, -0.05, { title: 'WAR WARNING', seed: 2 });
      g.save(); g.globalAlpha = fade(X, T.aunt - 0.5, 0.3); telegram(1180, 560, 480, 0.06, { title: 'HAPPY BDAY, AUNT!', seed: 2 }); g.restore();
      S.label('=', 905, 560, 120, fade(X, T.aunt - 0.3, 0.3), INK); S.stamp('NOT URGENT', 560, 620, 72, clamp((X - T.urgent) / 0.4)); S.lipHost(X, 1, { h: 420 }); }],
    // 7a · văn phòng điện báo Honolulu: đồng hồ 7:33, teletype treo biển "OUT OF ORDER" · không người dẫn · tiếng: tích tắc
    [ST(L.reached), (t, X) => { office(); alarm(1620, 260, 150, { time: [7, 33], label: 'HONOLULU' }); g.save(); g.translate(720, 600); g.fillStyle = '#4A4E58'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-320, -200, 640, 300); g.strokeRect(-320, -200, 640, 300);
      g.fillStyle = '#E8E1CF'; for (let i = 0; i < 24; i++) { g.fillRect(-280 + (i % 8) * 70, -150 + Math.floor(i / 8) * 70, 50, 50); } g.restore();
      const k = fade(X, T.teletype, 0.3); if (k > 0) { g.save(); g.translate(720, 480); g.rotate(0.1); g.globalAlpha = k; g.fillStyle = '#FFE04A'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-260, -60, 520, 120); g.strokeRect(-260, -60, 520, 120);
        g.fillStyle = INK; g.font = '900 60px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('OUT OF ORDER', 0, 0); g.restore(); }
      S.label('TELETYPE TO THE ARMY', 720, 960, 50, fade(X, T.teletype, 0.3), INK); }],
    // 7b · đường Honolulu: NGƯỜI DẪN nhập vai người đưa điện tín trên xe máy, túi thư · tiếng: xe máy nổ "brừm"
    [T.bag - 0.4, (t, X) => { const sky = g.createLinearGradient(0, 0, 0, 700); sky.addColorStop(0, '#9CC3E0'); sky.addColorStop(1, '#E9F1F4'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
      g.fillStyle = '#6E8F52'; g.fillRect(0, 700, W, 380); g.fillStyle = '#5A5A60'; g.fillRect(0, 820, W, 200); g.fillStyle = '#E8E1CF'; for (let i = 0; i < 10; i++) g.fillRect(((i * 260 - X * 500) % (W + 260) + W + 260) % (W + 260) - 130, 910, 140, 14);
      for (let i = 0; i < 5; i++) { const px = ((i * 420 - X * 200) % (W + 420) + W + 420) % (W + 420) - 210; g.fillStyle = '#4E7A3A'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(px - 10, 420, 20, 300); g.beginPath(); g.ellipse(px, 420, 120, 50, 0, 0, 7); g.fill(); g.stroke(); }
      moto(960, 920 + Math.sin(X * 18) * 4, 520, X); S.label('MESSENGER · MOTORCYCLE', 960, 150, 56, fade(X, T.motorcycle - 0.2, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 8a · xe máy kẹt giữa khói đen trên trời (bom đã rơi), xe cộ dồn · tiếng: còi báo động xa, tiếng nổ trầm
    [ST(L.mess), (t, X) => { g.fillStyle = '#B9A99A'; g.fillRect(0, 0, W, 700); g.fillStyle = 'rgba(40,40,44,0.8)'; for (let i = 0; i < 10; i++) { g.beginPath(); g.arc(300 + i * 160, 300 - i * 15 - X * 6 % 40, 90 + 20 * hash(i), 0, 7); g.fill(); }
      g.fillStyle = '#6E8F52'; g.fillRect(0, 700, W, 380); g.fillStyle = '#5A5A60'; g.fillRect(0, 820, W, 200);
      for (let i = 0; i < 4; i++) { const cx = 200 + i * 420; g.fillStyle = ['#2B4C9B', '#7A2E2E', '#3A3A3E', '#6B5A3A'][i]; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(cx - 150, 780, 300, 110, 30); g.fill(); g.stroke(); g.fillStyle = '#1C1C20'; for (const wx of [-90, 90]) { g.beginPath(); g.arc(cx + wx, 900, 34, 0, 7); g.fill(); } }
      moto(1520, 930, 380, X); S.label('BOMBS FALLING', 760, 160, 70, fade(X, T.bombs - 0.2, 0.3), '#FFFFFF', { stroke: INK }); }],
    // 8b · Short nhận điện buổi chiều; chuông #3 (TELEGRAM) SNOOZE · không người dẫn · tiếng: "bốp" snooze
    [T.afternoon - 1.2, (t, X) => { office(); P.short(1400, 1080, 700, { look: -1, mouth: 'o', eyes: 'shock' }); telegram(980, 640, 360, -0.1, { title: 'WAR WARNING', stamp: '3 PM' });
      alarm(420, 420, 200, { time: [7, 33], snooze: X > T.afternoon ? ease((X - T.afternoon) / 0.2) : 0, label: 'TELEGRAM · 7:33' }); }],
  ];
};
