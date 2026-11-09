// hồi a0 · Cold open (BRIEF-SCENES.md) — mở bằng ảnh phố 1914, money shot ĐÓNG BĂNG ở góc cầu Latin, bộ đếm 20 triệu,
// tài xế cận (tên tập), tua ngược về sáng 28/6/1914, bảng "MISTAKES 0/5". Mọi mốc theo TỪ (wd), không gõ giây.
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { INK } from '../../_kit/mapkit.js';
import { mistakes, rewind, SK } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;

/** góc cầu Latin: xe 1914 dừng, tài xế + FF + Sophie ngồi, Princip đứng sau đuôi xe (dùng lại khi tua ngược) */
function street(X, o = {}) {
  B.place('latin');
  const cx = o.carX ?? 1000;
  if (o.skid > 0) { g.save(); g.globalAlpha = clamp(o.skid); g.fillStyle = '#2A2A2E';            // vệt phanh sau hai bánh
    for (const wx of [cx - 288, cx + 288]) for (let i = 0; i < 3; i++) g.fillRect(wx + 60 + i * 6, 992 - i * 7, 260 * clamp(o.skid * 1.4) - i * 30, 5); g.restore(); }
  C.car1914(cx, 1000, 900, { flags: true, bob: o.bob ?? 0, seats: ([fx, fy], [bx, by]) => {
    C.folk(fx, fy + 67, 275, { skin: SK, coat: 'driver', wear: 'driver', eyes: o.drvEyes ?? 'dot', mouth: o.drvMouth, sweat: o.drvSweat });
    C.folk(bx - 50, by + 58, 300, { skin: SK, coat: 'austro', feat: 'ff', wear: 'plume', eyes: o.ffEyes ?? 'dot' });
    C.folk(bx + 108, by + 58, 283, { skin: SK, coat: 'gown', feat: 'sophie', wear: 'sophiehat', eyes: o.ffEyes ?? 'dot' }); } });
  if (o.princip !== false) C.folk(1720, 1000, 400, { skin: SK, coat: 'suit', feat: 'princip', eyes: 'angry', look: -1 });
}
const ring = (x, y, rx, ry, k, col = RED) => { if (k <= 0) return; g.save(); g.strokeStyle = col; g.lineWidth = 9; g.globalAlpha = clamp(k * 3);
  g.beginPath(); g.ellipse(x, y, rx * back(k), ry * back(k), -0.06, 0, Math.PI * 2 * clamp(k * 1.6)); g.stroke(); g.restore(); };
/** dấu ⏸ (đóng băng) + viền tối */
function freezeFx(t) { g.save(); const gr = g.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.55)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.globalAlpha = 0.55 + 0.35 * (Math.floor(t * 1.6) % 2);
  g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; for (const x of [110, 150]) { g.beginPath(); g.roundRect(x, 84, 26, 72, 6); g.fill(); g.stroke(); } g.restore(); }
/** thẻ giá treo đung đưa */
function priceTag(x, y, k, X) { if (k <= 0) return; const a = 0.18 * Math.sin(X * 3.2), s = back(k);
  g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 70); g.stroke();
  g.fillStyle = '#F7E7B0'; g.beginPath(); g.moveTo(-40, 70); g.lineTo(40, 70); g.lineTo(150, 110); g.lineTo(150, 230); g.lineTo(-150, 230); g.lineTo(-150, 110); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#FFF'; g.beginPath(); g.arc(0, 92, 10, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; g.font = '900 34px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('PRICE:', 0, 150); g.fillStyle = RED; g.font = '900 52px Archivo, sans-serif'; g.fillText('$$$$$$', 0, 208); g.restore(); }
/** súng ngắn vẽ (x-quang trong túi) */
function pistol(x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#2B2B30'; g.strokeStyle = '#FFF'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-40, -14); g.lineTo(40, -14); g.lineTo(40, 2); g.lineTo(-8, 2); g.lineTo(-14, 34); g.lineTo(-34, 34); g.lineTo(-30, 2); g.lineTo(-40, 2); g.closePath(); g.fill(); g.stroke(); g.restore(); }
/** mũ lừa (dunce cap) — cỡ s */
function dunce(x, y, s, k) { if (k <= 0) return; const b = back(k); g.save(); g.translate(x, y); g.scale(s * b, s * b); g.rotate(0.12 * Math.sin(x));
  g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 4 / s; g.beginPath(); g.moveTo(-36, 0); g.lineTo(0, -110); g.lineTo(36, 0); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = RED; g.font = '900 34px Archivo, sans-serif'; g.textAlign = 'center'; g.fillText('D', 0, -18); g.beginPath(); g.ellipse(0, 0, 40, 9, 0, 0, 7); g.fillStyle = '#FBF8F0'; g.fill(); g.stroke(); g.restore(); }
/** mặt đồng hồ tròn; hm = giờ thập phân */
function clock(x, y, r, hm, k = 1) { if (k <= 0) return; const s = back(k); g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.stroke();
  g.lineWidth = 6; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82); g.lineTo(Math.cos(a) * r * 0.94, Math.sin(a) * r * 0.94); g.stroke(); }
  const ah = hm / 12 * Math.PI * 2 - Math.PI / 2, am = (hm % 1) * Math.PI * 2 - Math.PI / 2; g.lineCap = 'round';
  g.lineWidth = 16; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(ah) * r * 0.5, Math.sin(ah) * r * 0.5); g.stroke();
  g.lineWidth = 10; g.strokeStyle = RED; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(am) * r * 0.78, Math.sin(am) * r * 0.78); g.stroke();
  g.fillStyle = INK; g.beginPath(); g.arc(0, 0, 14, 0, 7); g.fill(); g.restore(); }
/** tờ lịch xé: tháng / ngày / năm, mỗi phần bật riêng */
function calendar(x, y, kM, kD, kY) { g.save(); g.translate(x, y); g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-230 + 12, -260 + 14, 460, 520);
  g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(-230, -260, 460, 520); g.strokeRect(-230, -260, 460, 520);
  g.fillStyle = RED; g.fillRect(-230, -260, 460, 120); g.strokeRect(-230, -260, 460, 120);
  for (const rx of [-140, 0, 140]) { g.fillStyle = INK; g.beginPath(); g.arc(rx, -280, 14, 0, 7); g.fill(); }
  g.restore();
  S.label('JUNE', x, y - 172, 76, kM, '#FFF', { free: true }); S.label('28', x, y + 90, 230, kD, INK, { free: true }); S.label('1914', x, y + 210, 70, kY, RED, { free: true }); }

export default K => { const { IM, LT, wd, ST } = K; g = K.g;
  const kin = (X, t0, d = 0.25) => clamp((X - t0) / d);
  // ── mốc từ ──
  const L0 = 'Hey everyone', L1 = 'Take a good look', L2 = 'The young man', L3 = 'Around twenty million people will', L4 = 'Because nobody told', L5 = "So let's rewind", L6 = 'Fair warning';
  const T = { dis: wd(L0, 'disasters'), tiny: wd(L0, 'tiny'), stupid: wd(L0, 'stupid'),
    car: wd(L1, 'car'), wrong: wd(L1, 'wrong'), exp: wd(L1, 'expensive'), hist: wd(L1, 'history'),
    young: wd(L2, 'young'), five: wd(L2, 'five'), pistol: wd(L2, 'pistol'), driver: wd(L2, 'driver'), brakes: wd(L2, 'brakes'), two: wd(L2, 'two'), world: wd(L2, 'world'),
    twenty: wd(L3, 'twenty'), million: wd(L3, 'million'), people: wd(L3, 'people'), die: wd(L3, 'die'), nearly: wd(L3, 'nearly'), happen: wd(L3, 'happen'),
    nobody: wd(L4, 'nobody'), drv: wd(L4, 'driver'),
    rew: wd(L5, 'rewind'), morning: wd(L5, 'morning'), june: wd(L5, 'june'), d28: wd(L5, 'twentyeighth'), y1914: wd(L5, 'nineteen'), count: wd(L5, 'count'),
    fair: wd(L6, 'fair'), five6: wd(L6, 'five'), each: wd(L6, 'each'), dumber: wd(L6, 'dumber'), last: wd(L6, 'last') };
  const END = ST('First, a quick tour');

  return [
    // S0 · ảnh phố Sarajevo 1914 khử màu, luận đề TINY → HUGE · người dẫn góc phải nhép · tiếng: boom trầm ở "disasters", "pip" nhỏ ở "tiny"
    [ST(L0), (t, X) => { S.photoBg(IM.s_sarajevo, t, { desat: 0.65, dark: 0.4, fy: 0.5, zoom: 1.14, credit: 'Sarajevo, c. 1914 · public domain' });
      const kd = kin(X, T.dis), [sx, sy] = S.shake(clamp((X - T.dis) / 0.5), 12, X);
      g.save(); g.translate(sx, sy); S.label('HUGE DISASTERS', 720, 330, 128, kd, '#FFF', { stroke: RED }); g.restore();
      const kt = kin(X, T.tiny);
      if (kt > 0) { S.label('tiny, stupid mistakes', 720, 690, 34, kt, '#FFF', { stroke: INK });
        const a = easeOut(clamp((X - T.tiny - 0.3) / 0.5)); if (a > 0) { g.save(); g.strokeStyle = '#FFD34D'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(720, 640); g.lineTo(720, lerp(640, 400, a)); g.stroke();
          g.fillStyle = '#FFD34D'; g.beginPath(); g.moveTo(720, lerp(640, 400, a) - 34); g.lineTo(690, lerp(640, 400, a) + 4); g.lineTo(750, lerp(640, 400, a) + 4); g.closePath(); g.fill(); g.restore(); } }
      S.lipHost(X, clamp(t / 0.35)); }],

    // S1 · MONEY SHOT đóng băng ở góc cầu Latin: xe dừng, FF + Sophie + tài xế, Princip đứng sau đuôi xe · không người dẫn (bố cục chật)
    //      tiếng: tua "chụp ảnh / freeze" vào cảnh, "whoosh" khoanh xe, "ka-ching" thẻ giá (expensive), "tick" thước 5 FT, "thud" khoanh túi súng,
    //      tiếng phanh rít (brakes), tích-tắc (two seconds), nổ trầm + rung (world war)
    [ST(L1), (t, X) => { const brake = X >= T.brakes, [sx, sy] = X >= T.world ? S.shake(clamp((X - T.world) / 1.4), 16, X) : S.shake(clamp((X - T.brakes) / 0.4), 8, X);
      // máy quay CẮT theo từ (cùng một cảnh vẽ): toàn → cận túi súng ("pistol") → cận tài xế + bánh xe ("driver"/"brakes") → toàn + rung ("world war")
      const pw = ease(clamp((X - T.car + 0.3) / 2.2));
      let [cx, cy, z] = X >= T.world ? [960, 540, 1] : X >= T.driver ? [1000, 760, 1.7 + 0.03 * (X - T.driver)] : X >= T.pistol ? [1440, 780, 2.0 + 0.04 * (X - T.pistol)]
        : [1200 - 240 / (1 + 0.1 * pw), 760 - 220 / (1 + 0.1 * pw), 1 + 0.1 * pw];
      cx = clamp(cx, 960 / z, W - 960 / z); cy = clamp(cy, 540 / z, H - 540 / z);
      g.save(); g.translate(sx, sy); g.translate(960, 540); g.scale(z, z); g.translate(-cx, -cy);
      street(X, { drvEyes: X >= T.driver ? 'shock' : 'dot', drvSweat: X >= T.brakes, drvMouth: X >= T.brakes ? 'o' : null, skid: brake ? clamp((X - T.brakes) / 0.4) : 0, ffEyes: X >= T.world ? 'shock' : 'dot' });
      if (X >= T.world) { const kw = clamp((X - T.world) / 0.6); g.save(); g.beginPath(); g.moveTo(-200, -200); g.lineTo(2200, -200); g.lineTo(2200, 200); g.lineTo(938, 200); g.lineTo(938, 600); g.quadraticCurveTo(450, 470, -20, 600); g.lineTo(-200, 600); g.closePath(); g.clip();   // lửa thật mờ ở TRỜI (sau nhà + cầu)
        g.fillStyle = `rgba(200,80,30,${0.35 * kw})`; g.fillRect(-200, -200, 2400, 900); g.globalAlpha = 0.7; for (let i = 0; i < 4; i++) S.realBoom(120 + i * 230, 600 - 40 * hash(i), 560, X - T.world - i * 0.15, i + 7); g.restore();
      }
      // khoanh xe → WRONG TURN
      if (X < T.wrong) ring(1000, 830, 520, 220, kin(X, T.car, 0.4));
      if (X >= T.exp && X < T.young) priceTag(640, 610, kin(X, T.exp, 0.3), X);
      // thước 5 FT giữa đuôi xe và Princip
      if (X >= T.five && X < T.pistol) { const k = easeOut(kin(X, T.five, 0.4)); g.save(); g.strokeStyle = '#FFD34D'; g.lineWidth = 8; g.beginPath(); g.moveTo(1440, 1030); g.lineTo(lerp(1440, 1640, k), 1030);
          for (const x of [1440, lerp(1440, 1640, k)]) { g.moveTo(x, 1008); g.lineTo(x, 1052); } g.stroke(); g.restore(); }
      if (X >= T.pistol && X < T.driver) { const k = kin(X, T.pistol, 0.3); g.save(); g.globalAlpha = clamp(k * 3); g.fillStyle = 'rgba(20,20,26,0.75)'; g.beginPath(); g.arc(1770, 880, 62 * back(k), 0, 7); g.fill(); g.restore();
        if (k > 0.3) pistol(1770, 872, 1.05); ring(1770, 880, 66, 66, k); }
      if (X >= T.driver && X < T.brakes) ring(910, 690, 95, 110, kin(X, T.driver, 0.3));
      g.restore();
      desat(0.3);
      // chữ ngoài khung camera (vùng an toàn)
      if (X >= T.wrong && X < T.young) S.label('WRONG TURN', 960, 190, 110, kin(X, T.wrong), '#FFF', { stroke: RED });
      if (X >= T.five && X < T.pistol) S.label('5 FT', 1540, 990, 56, kin(X, T.five + 0.2), '#FFD34D', { stroke: INK });
      if (X >= T.brakes && X < T.two) S.label('SCREECH!', 760, 230, 96, kin(X, T.brakes, 0.2), '#FFF', { stroke: INK, rot: -0.06 });
      if (X >= T.two && X < T.world) { const n = X < T.two + 0.55 ? '2' : '1'; S.label(n, 960, 280, 220, kin(X, X < T.two + 0.55 ? T.two : T.two + 0.55, 0.15), '#FFF', { stroke: RED }); }
      if (X >= T.world) S.label('WORLD WAR', 1330, 170, 130, kin(X, T.world, 0.2), '#FFF', { stroke: RED });
      freezeFx(t); }],

    // S2 · bộ đếm 20,000,000 trên nền tối + lưới đầu người nhỏ; "very nearly didn't happen" → số lăn về 0 · không người dẫn (nghiêm) · tiếng: tích số lăn, trầm ở "die"
    [ST(L3), (t, X) => { S.paper('#141416');
      const kp = clamp((X - T.people) / 1.4);
      if (kp > 0) for (let r = 0; r < 14; r++) for (let c = 0; c < 34; c++) { const i = r * 34 + c; if (hash(i + 11) > kp * 1.05) continue;
        g.fillStyle = `rgba(200,200,205,${0.10 + 0.06 * hash(i)})`; g.beginPath(); g.arc(80 + c * 54 + (r % 2) * 27, 560 + r * 34, 11, 0, 7); g.fill(); }
      const ku = ease(clamp((X - T.twenty) / Math.max(0.3, T.million + 0.25 - T.twenty))), kz = ease(clamp((X - T.nearly) / Math.max(0.3, T.happen - T.nearly)));
      const v = Math.round(20000000 * ku * (1 - kz)), str = v.toLocaleString('en-US');
      const pop = X > T.twenty && X < T.million + 0.6 ? 1 + 0.04 * Math.abs(Math.sin(X * 30)) : 1;
      g.save(); g.translate(960, 330); g.scale(pop, pop); S.label(str, 0, 0, 190, kin(X, T.twenty, 0.2), '#FFF', { stroke: kz > 0.98 ? INK : RED, free: true }); g.restore();
      if (X >= T.die && X < T.nearly) S.label('PEOPLE', 960, 470, 64, kin(X, T.die, 0.3), '#BDBDC2');
      if (X >= T.nearly) S.label('IT COULD HAVE BEEN', 960, 160, 56, kin(X, T.nearly, 0.3), '#FFD34D', { stroke: INK }); }],

    // S3 · cận tài xế (kiểu B, to), giơ hai tay "ai biết đâu" + dấu ?, đóng dấu tên tập · không người dẫn · tiếng: "boing ?" ở "nobody", dấu đóng ở "driver"
    [ST(L4), (t, X) => { g.fillStyle = '#F2D9A0'; g.fillRect(0, 0, W, H);
      g.save(); g.fillStyle = '#F7E6BC'; for (let i = 0; i < 18; i++) { const a = i * Math.PI / 9 + t * 0.05; g.beginPath(); g.moveTo(960, 480); g.arc(960, 480, 1500, a, a + Math.PI / 18); g.closePath(); g.fill(); } g.restore();
      const up = X >= T.nobody, s = t < 0.12 ? 1.05 : 1;
      g.save(); g.translate(960, 1080); g.scale(s, s); g.translate(-960, -1080);
      C.folk(960, 1270, 1050, { skin: SK, coat: 'driver', wear: 'driver', eyes: up ? 'dot' : 'dot', mouth: up ? 'flat' : null, arm: up ? 'up' : null, tilt: up ? 0.05 * Math.sin(X * 4) : 0 }); g.restore();
      if (up) for (let i = 0; i < 3; i++) S.label('?', [560, 1360, 1460][i], [300, 230, 420][i], [120, 150, 100][i], kin(X, T.nobody + i * 0.12, 0.2), INK, { stroke: '#FFF', rot: (i - 1) * 0.2 });
      S.stamp('NOBODY TOLD THE DRIVER', 960, 900, 84, clamp((X - T.drv + 0.08) / 0.4), -0.05); }],

    // S4 · tua ngược: cảnh góc cầu Latin chạy lùi (xe lùi ra khỏi khung) + vạch nhiễu ◀◀ → lịch "JUNE 28 1914" + đồng hồ quay ngược dừng 10:00
    //      người dẫn góc phải nhép (phần lịch) · tiếng: tua băng (rewind) ở đầu cảnh, lật lịch ở "june"/"twenty-eighth", "ding" đồng hồ dừng ở "morning"
    [ST(L5) + 0.45, (t, X) => { const cut = T.morning - 0.1;   // vào trễ 0.45 s (vẫn trước "rewind") để dấu tên tập đứng đọc được ≥ 1.5 s
      if (X < cut) { const u = clamp((X - ST(L5)) / Math.max(0.5, cut - ST(L5)));
        street(X, { carX: lerp(1000, 2700, ease(u)), princip: true, bob: Math.sin(X * 40) * 2 }); desat(0.6); rewind(X, 1); return; }
      S.paper();
      const h = lerp(10, -30, 1 - ease(clamp((X - cut) / 0.9)));                              // kim quay ngược rồi dừng 10:00
      clock(1180, 470, 210, ((h % 12) + 12) % 12, kin(X, cut, 0.3));
      if (X >= T.morning + 0.8) S.label('A.M.', 1180, 780, 60, kin(X, T.morning + 0.8), INK);
      calendar(560, 520, kin(X, T.june), kin(X, T.d28), kin(X, T.y1914));
      if (X < cut + 0.5) rewind(X, 1 - clamp((X - cut) / 0.5));
      S.lipHost(X, clamp((X - cut) / 0.35)); }],

    // S5 · "Fair warning": bảng MISTAKES 0/5 phóng to giữa khung, 5 ô "?" → 5 mũ lừa to dần (mỗi cái ngu hơn cái trước), cuối cảnh thu về góc trái
    //      người dẫn góc phải nhép · tiếng: "ding" bảng hiện, 5 "pop" tăng dần ở "each one is dumber than the last"
    [ST(L6), (t, X) => { S.paper();
      const shrink = ease(clamp((X - (END - 0.9)) / 0.7)), sc = lerp(2.3, 1, shrink), cx = lerp(900, 276, shrink), cy = lerp(300, 110, shrink);
      g.save(); g.translate(cx, cy); g.scale(sc, sc); g.translate(-276, -110); mistakes(0, kin(X, T.fair, 0.35)); g.restore();
      const kf = 1 - shrink; if (kf > 0) { g.save(); g.globalAlpha = kf;
        for (let i = 0; i < 5; i++) { const x = 330 + i * 250, y = 820, kq = kin(X, T.five6 + i * 0.08, 0.2), kc = kin(X, lerp(T.each, T.last, i / 4), 0.25);
          if (kc <= 0) { if (kq > 0) { g.save(); g.translate(x, y - 60); g.scale(back(kq), back(kq)); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.roundRect(-60, -60, 120, 120, 14); g.fill(); g.stroke(); g.restore();
              S.label('?', x, y - 28, 90, kq, RED, { free: true }); } }
          else dunce(x, y, 1.1 + i * 0.45, kc); }
        g.restore(); }
      S.lipHost(X); }],
  ];
  function desat(k) { S.desat(k, 0.05); }
};
