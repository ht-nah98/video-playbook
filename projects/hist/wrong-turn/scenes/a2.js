// hồi a2 · The unloved heir (≈125–237 s) — BRIEF-SCENES.md §a2. Mốc theo TỪ (wd), không gõ giây. Tất định: hàm thuần của X.
// Người dẫn: góc phải nhép miệng ở cảnh tư liệu / giải thích; nhập vai #2 = người hầu chặn Sophie ở lô nhà hát (không chữ, không mũi tên).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import * as B from '../../_kit/backdrop.js';
import { narrator } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, INK } from '../../_kit/mapkit.js';
import { mistakes, rewind, SK, P } from './common.js';
const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;

export default K => { const { g, IM, M, LT, wd, ST } = K;
  const { ff, sophie, fj } = P;
  const L1 = 'Now, meet the man', L2 = 'He only became heir', L3 = 'He was short-tempered', L4 = 'Averaged out', L5 = 'But he did one thing',
    L6 = 'His wife, Sophie', L7 = 'To be allowed to marry', L8 = 'In Vienna, Sophie', L9 = 'But in Bosnia', L10 = 'Which is sweet', L11 = 'Mistake number one',
    L12 = 'They would drive through', L13 = 'So the heir of the empire', L14 = "It's a bit like throwing", L15 = 'For the couple, though', L16 = 'Which made it a lovely';
  const w = (l, x, n) => wd(l, x, n);
  const T = {
    back: w(L1, 'back'), archduke: w(L1, 'archduke'), heir: w(L1, 'heir'),
    died: w(L2, 'died'), first: w(L2, 'first'), emperor: w(L2, 'emperor'), warmed: w(L2, 'warmed'),
    temper: w(L3, 'shorttempered'), popular: w(L3, 'popular'), hunting: w(L3, 'and', 0), list: w(L3, 'list'), animals: w(L3, 'animals'),
    fifteen: w(L4, 'fifteen'), aday: w(L4, 'day'), every: w(L4, 'every'),
    marrying: w(L5, 'marrying'), love: w(L5, 'love'),
    sophie: w(L6, 'sophie'), countess: w(L6, 'countess'), which6: w(L6, 'which'), fancy: w(L6, 'fancy'), unless: w(L6, 'unless'), habsburg: w(L6, 'habsburg'),
    countess2: w(L6, 'countess', 1), commoner: w(L6, 'commoner'),
    swear: w(L7, 'swear'), children: w(L7, 'children'), never7: w(L7, 'never'),
    sophie8: w(L8, 'sophie'), box: w(L8, 'box'), and8: w(L8, 'and'), carriage: w(L8, 'carriage'),
    bosnia9: w(L9, 'bosnia'), army: w(L9, 'army'), royal9: w(L9, 'royal'), so9: w(L9, 'so'), sit9: w(L9, 'sit'),
    sweet: w(L10, 'sweet'), only10: w(L10, 'only'), car10: w(L10, 'car'),
    one: w(L11, 'one'), date: w(L11, 'date'),
    t28: w(L12, 'twentyeighth'), vidovdan: w(L12, 'vidovdan'), famous: w(L12, 'famous'), y1389: w(L12, 'thirteen'), and12: w(L12, 'and', 0), emotional: w(L12, 'emotional'),
    grabbed: w(L13, 'grabbed'), bosnia13: w(L13, 'bosnia'), picked: w(L13, 'picked'), biggest: w(L13, 'biggest'), parade13: w(L13, 'parade'), capital: w(L13, 'capital'),
    yankees: w(L14, 'yankees'), boston: w(L14, 'downtown'), everybody: w(L14, 'everybody'), terrible: w(L14, 'terrible'),
    anniv: w(L15, 'anniversary'), fourteen: w(L15, 'fourteen'), earlier: w(L15, 'earlier'), sworn: w(L15, 'sworn'), rights: w(L15, 'rights'), marry15: w(L15, 'marry'),
    lovely: w(L16, 'lovely'), perfect: w(L16, 'perfect'), assassination: w(L16, 'assassination'),
  };
  T.and8 = w(L8, 'and', 0);   // "…royal box, AND she couldn't ride…"
  const pop = (X, t0, d = 0.3) => clamp((X - t0) / d);
  // ── dàn nhân vật kiểu B (CHARACTER §2b) — cùng một bộ đồ suốt hồi ──
  const camPush = (t, rate = 0.012, cx = W / 2, cy = H / 2) => { const s = 1 + rate * t; g.translate(cx, cy); g.scale(s, s); g.translate(-cx, -cy); };
  const host = (X, k = 1) => S.lipHost(X, k);

  // ── đạo cụ vẽ (cùng nét mực) ──
  function heart(x, y, s, a = 1) { if (s <= 0 || a <= 0) return; g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s); g.fillStyle = RED; g.strokeStyle = INK; g.lineWidth = 6; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(0, 34); g.bezierCurveTo(-70, -8, -46, -66, 0, -30); g.bezierCurveTo(46, -66, 70, -8, 0, 34); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.7)'; g.beginPath(); g.ellipse(-24, -26, 9, 6, -0.6, 0, 7); g.fill(); g.restore(); }
  function crown(x, hy, r) { const y = hy - r * 0.62; g.save(); g.fillStyle = '#E7B93A'; g.strokeStyle = INK; g.lineWidth = Math.max(3, r * 0.08); g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - r * 0.62, y); g.lineTo(x - r * 0.7, y - r * 0.62); g.lineTo(x - r * 0.32, y - r * 0.3); g.lineTo(x, y - r * 0.8); g.lineTo(x + r * 0.32, y - r * 0.3); g.lineTo(x + r * 0.7, y - r * 0.62); g.lineTo(x + r * 0.62, y); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = RED; g.beginPath(); g.arc(x, y - r * 0.22, r * 0.1, 0, 7); g.fill(); g.restore(); }
  function snow(x, y, s, a) { if (a <= 0) return; g.save(); g.globalAlpha = clamp(a); g.strokeStyle = '#6FB6E8'; g.lineWidth = 5 * s; g.lineCap = 'round'; g.translate(x, y);
    for (let i = 0; i < 3; i++) { g.rotate(Math.PI / 3); g.beginPath(); g.moveTo(-22 * s, 0); g.lineTo(22 * s, 0); g.moveTo(14 * s, -7 * s); g.lineTo(20 * s, 0); g.lineTo(14 * s, 7 * s); g.moveTo(-14 * s, -7 * s); g.lineTo(-20 * s, 0); g.lineTo(-14 * s, 7 * s); g.stroke(); } g.restore(); }
  function tomb(x, y, s, rot = 0, a = 1) { if (a <= 0) return; g.save(); g.globalAlpha = clamp(a); g.translate(x + 75 * s, y); g.rotate(rot); g.translate(-75 * s, 0);
    g.fillStyle = '#A9A9A6'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -120 * s); g.arc(75 * s, -120 * s, 75 * s, Math.PI, 0); g.lineTo(150 * s, 0); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#6E6E6A'; g.lineWidth = 9 * s; g.beginPath(); g.moveTo(75 * s, -165 * s); g.lineTo(75 * s, -85 * s); g.moveTo(48 * s, -140 * s); g.lineTo(102 * s, -140 * s); g.stroke();
    g.fillStyle = '#7FA36A'; g.fillRect(-8, -10, 150 * s + 16, 12); g.restore(); }
  /** lịch tờ to: đầu đỏ (tháng), số ngày, dòng năm / chú thích */
  function calendar(cx, cy, w, k, o = {}) { if (k <= 0) return; const h = w * 1.12, s = o.noPop ? 1 : back(k);
    g.save(); g.translate(cx, cy); g.rotate(o.rot ?? -0.025); g.scale(s, s);
    g.fillStyle = 'rgba(0,0,0,0.28)'; g.fillRect(-w / 2 + 14, -h / 2 + 18, w, h);
    g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 7; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h);
    g.fillStyle = RED; g.fillRect(-w / 2, -h / 2, w, h * 0.22); g.strokeRect(-w / 2, -h / 2, w, h * 0.22);
    for (const rx of [-w * 0.3, w * 0.3]) { g.fillStyle = '#2A2A2E'; g.beginPath(); g.roundRect(rx - 8, -h / 2 - 26, 16, 46, 8); g.fill(); }
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#FFF'; g.font = `900 ${w * 0.14}px Archivo, sans-serif`; g.fillText(o.month ?? 'JUNE', 0, -h / 2 + h * 0.115);
    g.fillStyle = INK; g.font = `900 ${w * 0.5}px Archivo, sans-serif`; g.fillText(o.day ?? '28', 0, -h * 0.01);
    if (o.year) { g.font = `800 ${w * 0.12}px Archivo, sans-serif`; g.fillStyle = '#4A4A4E'; g.fillText(o.year, 0, h * 0.33); }
    if (o.ring > 0) { g.strokeStyle = RED; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.ellipse(0, -h * 0.01, w * 0.36, h * 0.24, -0.1, -2.2, -2.2 + Math.PI * 2.1 * easeOut(o.ring)); g.stroke(); }
    if (o.pin > 0) { const py = -h * 0.2 - (1 - easeOut(o.pin)) * 300; g.fillStyle = RED; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(w * 0.2, py + 70); g.lineTo(w * 0.2, py); g.stroke(); g.beginPath(); g.arc(w * 0.2, py, 26, 0, 7); g.fill(); g.stroke(); }
    g.restore(); }
  /** giấy cam kết "I SWEAR…" + chữ ký vẽ dần (sig 0..1) */
  function oath(cx, cy, w, sig, o = {}) { const h = w * 1.25; g.save(); g.translate(cx, cy); g.rotate(o.rot ?? -0.03);
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 12, -h / 2 + 16, w, h);
    g.fillStyle = '#F3E7C6'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h);
    g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `900 ${w * 0.12}px Archivo, sans-serif`; g.fillText('I SWEAR…', 0, -h * 0.36);
    g.fillStyle = '#B9AA88'; for (let i = 0; i < 7; i++) g.fillRect(-w * 0.38, -h * 0.2 + i * h * 0.065, w * (0.76 - 0.22 * hash(i + 31)), h * 0.018);
    g.strokeStyle = '#B9AA88'; g.lineWidth = 3; g.beginPath(); g.moveTo(-w * 0.34, h * 0.36); g.lineTo(w * 0.34, h * 0.36); g.stroke();
    if (sig > 0) { g.strokeStyle = '#1B2A5A'; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); const n = Math.floor(60 * clamp(sig));
      let px = 0, py = 0; for (let i = 0; i <= n; i++) { const u = i / 60; px = lerp(-w * 0.3, w * 0.28, u); py = h * 0.3 - Math.sin(u * 26) * h * 0.045 * (1 - 0.5 * u) - (u < 0.15 ? u * h * 0.2 : 0); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
      if (sig < 1) { g.save(); g.translate(px, py); g.rotate(-0.7); g.fillStyle = '#FFF'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(30, -90, 14, -200); g.quadraticCurveTo(-20, -110, 0, 0); g.fill(); g.stroke(); g.restore(); } }
    g.restore(); }
  /** thú vẽ đơn giản xếp hàng, mắt shock, run bần bật (kind 0 hươu · 1 lợn rừng · 2 gà lôi) */
  function critter(x, y, s, kind, X, i, a = 1) { if (a <= 0) return; const sh = Math.sin(X * 47 + i * 1.9) * 3;
    g.save(); g.globalAlpha = clamp(a); g.translate(x + sh, y); g.scale(s, s); g.strokeStyle = INK; g.lineWidth = 5; g.lineJoin = 'round'; g.lineCap = 'round';
    const col = ['#B07A4A', '#6E5A4C', '#C46A3A'][kind], hx = -52, hy = kind === 2 ? -78 : -92;
    if (kind !== 2) { for (const lx of [-38, -18, 22, 40]) { g.beginPath(); g.moveTo(lx, -40); g.lineTo(lx, 0); g.stroke(); } }
    else { for (const lx of [-8, 12]) { g.beginPath(); g.moveTo(lx, -30); g.lineTo(lx, 0); g.stroke(); } g.fillStyle = '#5A4A3A'; g.beginPath(); g.moveTo(44, -60); g.lineTo(110, -96); g.lineTo(104, -70); g.closePath(); g.fill(); g.stroke(); }
    g.fillStyle = col; g.beginPath(); g.ellipse(0, kind === 2 ? -52 : -62, kind === 2 ? 50 : 62, kind === 2 ? 30 : 34, 0, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.arc(hx, hy, kind === 2 ? 22 : 28, 0, 7); g.fill(); g.stroke();
    if (kind === 0) { g.strokeStyle = '#6B4A2A'; g.lineWidth = 6; for (const s2 of [-1, 1]) { g.beginPath(); g.moveTo(hx + s2 * 12, hy - 22); g.lineTo(hx + s2 * 26, hy - 60); g.moveTo(hx + s2 * 20, hy - 42); g.lineTo(hx + s2 * 38, hy - 50); g.stroke(); } g.strokeStyle = INK; g.lineWidth = 5; }
    if (kind === 1) { g.fillStyle = '#D9B98A'; g.beginPath(); g.ellipse(hx - 22, hy + 8, 12, 9, 0, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#FFF'; g.lineWidth = 4; g.beginPath(); g.moveTo(hx - 18, hy + 16); g.lineTo(hx - 26, hy + 26); g.stroke(); g.strokeStyle = INK; }
    if (kind === 2) { g.fillStyle = '#E8B93A'; g.beginPath(); g.moveTo(hx - 20, hy); g.lineTo(hx - 38, hy + 6); g.lineTo(hx - 20, hy + 10); g.fill(); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(hx + 4, hy + 6, 7, 0, 7); g.fill(); }
    for (const e of [-9, 9]) { g.fillStyle = '#FFF'; g.lineWidth = 3; g.beginPath(); g.arc(hx + e, hy - 4, 8, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(hx + e - 2, hy - 4, 2.6, 0, 7); g.fill(); }
    g.restore(); }
  /** xe ngựa hoàng gia (vàng) hướng phải, FF ngồi trong cửa sổ */
  function carriage(x, y, X, moving) { const bob = moving ? Math.abs(Math.sin(X * 10)) * 5 : 0; g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.lineJoin = 'round'; g.lineCap = 'round';
    // ngựa
    const hx = x + 330, leg = moving ? Math.sin(X * 14) * 18 : 0; g.fillStyle = '#F2EEE6';
    for (const [lx, d] of [[-60, 1], [-30, -1], [60, -1], [90, 1]]) { g.beginPath(); g.moveTo(hx + lx, y - 170 - bob); g.lineTo(hx + lx + d * leg, y); g.stroke(); }
    g.beginPath(); g.ellipse(hx + 15, y - 185 - bob, 105, 52, 0, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(hx + 90, y - 200 - bob); g.lineTo(hx + 135, y - 290 - bob); g.lineTo(hx + 185, y - 262 - bob); g.lineTo(hx + 120, y - 180 - bob); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.arc(hx + 150, y - 272 - bob, 5, 0, 7); g.fill();
    g.fillStyle = '#6B4A2A'; g.beginPath(); g.moveTo(hx + 108, y - 230 - bob); g.quadraticCurveTo(hx + 80, y - 280 - bob, hx + 130, y - 292 - bob); g.lineTo(hx + 118, y - 236 - bob); g.fill();
    g.beginPath(); g.moveTo(x + 150, y - 160 - bob); g.lineTo(hx - 60, y - 190 - bob); g.stroke();
    // thân xe
    const by = y - 120 - bob; g.fillStyle = '#D9A92E'; g.beginPath(); g.roundRect(x - 190, by - 250, 360, 250, 40); g.fill(); g.stroke();
    g.fillStyle = '#8D2A2E'; g.beginPath(); g.roundRect(x - 210, by - 290, 400, 50, 16); g.fill(); g.stroke(); crown(x - 10, by - 270, 50);
    g.save(); g.beginPath(); g.roundRect(x - 120, by - 210, 200, 140, 16); g.fillStyle = '#3B2A22'; g.fill(); g.clip(); ff(x - 20, by - 10, 270, { wear: null, eyes: 'happy', look: 1 }); g.restore();
    g.beginPath(); g.roundRect(x - 120, by - 210, 200, 140, 16); g.stroke();
    for (const wx of [x - 130, x + 120]) { g.fillStyle = '#E9E2CF'; g.beginPath(); g.arc(wx, y - 62, 62, 0, 7); g.fill(); g.stroke(); g.lineWidth = 4;
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + (moving ? X * 6 : 0); g.beginPath(); g.moveTo(wx, y - 62); g.lineTo(wx + Math.cos(a) * 58, y - 62 + Math.sin(a) * 58); g.stroke(); } g.lineWidth = 7; }
    g.restore(); }
  /** xe 1914 vẽ + 3 người kiểu B (tài xế, FF, Sophie) — cùng tỉ lệ bàn thử cast.html */
  function carRide(x, y, w, o = {}) { const s = w / 1080; let heads = {};
    C.car1914(x, y, w, { flags: o.flags ?? true, spin: o.spin, bob: o.bob, seats: ([fx, fy], [bx, by]) => {
      C.folk(fx, fy + 80 * s, 330 * s, { skin: SK, coat: 'driver', wear: 'driver' });
      heads.ff = C.folk(bx - 60 * s, by + 70 * s, 360 * s, { skin: SK, coat: 'austro', feat: 'ff', wear: 'plume', eyes: o.ffEyes ?? 'dot', look: o.look ?? 1 });
      heads.so = C.folk(bx + 130 * s, by + 70 * s, 340 * s, { skin: SK, coat: 'gown', feat: 'sophie', wear: 'sophiehat', eyes: o.soEyes ?? 'dot', look: -1 }); } });
    return heads; }
  /** vòng tròn đỏ khoanh (vẽ dần) */
  const ring = (x, y, r, k) => { if (k <= 0) return; g.save(); g.strokeStyle = RED; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.ellipse(x, y, r, r * 0.92, 0, -1.9, -1.9 + Math.PI * 2.1 * easeOut(k)); g.stroke(); g.restore(); };
  /** áo màu tuỳ ý (đỏ Boston) — phủ 'multiply' lên thân viên thuốc của folk, chừa đầu */
  function shirt(x, y, h, col, o = {}) { const r = C.folk(x, y, h, { coat: 'plain', ...o }); const bw = h * 0.42, bh = h * 0.58;
    g.save(); g.beginPath(); g.moveTo(x - bw / 2, y); g.lineTo(x - bw / 2, y - bh + bw / 2); g.arc(x, y - bh + bw / 2, bw / 2, Math.PI, 0); g.lineTo(x + bw / 2, y); g.closePath(); g.clip();
    g.beginPath(); g.rect(x - h, y - 2 * h, 2 * h, 3 * h); g.arc(r.head[0], r.head[1], r.r, 0, 7); g.clip('evenodd');
    g.globalCompositeOperation = 'multiply'; g.fillStyle = col; g.fillRect(x - h, y - 2 * h, 2 * h, 3 * h);
    if (o.stripes) { g.globalCompositeOperation = 'source-over'; g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = Math.max(2, h * 0.012); for (let sx = x - bw / 2 + bw / 8; sx < x + bw / 2; sx += bw / 5) { g.beginPath(); g.moveTo(sx, y - bh); g.lineTo(sx, y); g.stroke(); } }
    g.restore(); return r; }
  /** đám đông nhiều hàng tự dựng (để tô áo) */
  function redCrowd(x0, x1, y, h, X, o = {}) { for (let rw = 1; rw >= 0; rw--) { const hh = h * (1 - rw * 0.16), yy = y - rw * h * 0.3, n = Math.round((x1 - x0) / (hh * 0.52));
      for (let i = 0; i < n; i++) { const k = i * 7 + rw * 131 + (o.seed ?? 0), x = x0 + (i + 0.5 + (hash(k) - 0.5) * 0.3 + rw * 0.5) * (x1 - x0) / n;
        const bounce = o.stomp ? Math.abs(Math.sin(X * 8 + k)) * hh * 0.04 : 0;
        const r = shirt(x, yy - bounce, hh * (0.94 + 0.12 * hash(k + 3)), '#D8453B', { eyes: 'dot', look: o.look ?? 0, wear: ['cap', null, 'bowler', null, 'cap'][k % 5], mouth: 'frown' });
        g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(4, r.r * 0.13); g.lineCap = 'round'; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(r.head[0] + sd * r.r * 0.55, r.head[1] - r.r * 0.32); g.lineTo(r.head[0] + sd * r.r * 0.1, r.head[1] - r.r * 0.1); g.stroke(); } g.restore();
        if (o.vein && hash(k + 2) > 0.5) S.vein(r.head[0] + r.r * 0.7, r.head[1] - r.r * 0.6, hh / 500); } } }

  return [
    // ═══ S1 · "Now, meet the man in the back seat" — xe 1914 vẽ (gọi lại money shot a0) khoanh ghế sau → ảnh tư liệu FF + thẻ tên · người dẫn góc phải ở ảnh · tiếng: "back seat" bút khoanh, "archduke" chụp ảnh (shutter)
    [ST(L1), (t, X) => {
      if (X < T.archduke - 0.12) { g.save(); camPush(t, 0.02, 1100, 600); B.place('latin'); const hd = carRide(900, 1000, 1100, { look: 0 }); g.restore();
        const s = 1 + 0.02 * t, cx = 1100 + (hd.ff.head[0] - 1100) * s, cy = 600 + (hd.ff.head[1] - 600) * s;
        S.desat(0.25, 0); ring(cx, cy, hd.ff.r * 1.9 * s, pop(X, T.back - 0.1, 0.45)); return; }
      const u = X - T.archduke; S.paper('#1A1A1A'); S.photo(IM.s_ff, 520, 530, 500, 1, { push: 1 + 0.02 * u, credit: 'Archduke Franz Ferdinand, c. 1914 · public domain' });
      S.nameTag('ARCHDUKE FRANZ FERDINAND', pop(X, T.archduke), 840, 430); S.nameTag('HEIR TO THE THRONE', pop(X, T.heir), 840, 510);
      host(X, pop(X, T.archduke + 0.2, 0.35)); }],

    // ═══ S2 · "only became heir because two other men died first … the old emperor never warmed to him" — cầu thang ngai: 2 người phía trên hoá bia mộ, ngã, FF nhảy lên; Franz Joseph quay đi, tuyết · tiếng: "died" poof ×2, "first" đá đổ, FF nhảy boing, "warmed" gió lạnh
    [ST(L2), (t, X) => { S.paper('#EFE7D6');
      const STEPS = [[200, 720, 940], [720, 1020, 820], [1020, 1320, 700], [1320, 1800, 580]];
      g.save(); g.strokeStyle = INK; g.lineWidth = 7; STEPS.forEach(([a, b, top], i) => { g.fillStyle = i === 3 ? '#B7323A' : '#D9CBB0'; g.fillRect(a, top, b - a, H - top + 10); g.strokeRect(a, top, b - a, H - top + 10); });
      g.fillStyle = '#E7B93A'; g.fillRect(1320, 580, 480, 18); g.strokeRect(1320, 580, 480, 18);
      g.fillStyle = '#8D2A2E'; g.beginPath(); g.roundRect(1420, 250, 240, 340, [70, 70, 0, 0]); g.fill(); g.stroke(); g.fillStyle = '#E7B93A'; g.beginPath(); g.roundRect(1452, 285, 176, 290, [55, 55, 0, 0]); g.fill(); g.stroke(); g.restore();
      // Franz Joseph trên bục — lạnh lùng từ "warmed"
      const cold = X >= T.warmed;
      const r = fj(1540, 580, 300, { eyes: cold ? 'bored' : 'dot', look: cold ? 1 : -1, mouth: cold ? 'flat' : null });
      crown(r.head[0], r.head[1], r.r);
      if (cold) for (let i = 0; i < 5; i++) { const a = i * 1.3 + X * 0.6; snow(1540 + Math.cos(a) * 190, 380 + Math.sin(a) * 120 + ((X * 40 + i * 37) % 60), 1, pop(X, T.warmed + i * 0.08)); }
      // hai người phía trước trong hàng kế vị → bia mộ → đổ
      [[870, 820], [1170, 700]].forEach(([x, y], i) => { const td = T.died + i * 0.12, tf = T.first + 0.1 + i * 0.12;
        if (X < td) { C.folk(x, y, 270, { coat: 'austro', look: 1, eyes: 'dot' }); return; }
        const f = clamp((X - tf) / 0.55), s = back(pop(X, td, 0.25));
        tomb(x - 75 * s, y + f * f * 520, s, -f * 1.6, 1 - clamp((f - 0.7) / 0.3)); S.flash(x, y - 120, (X - td) / 0.3, 140); });
      // FF nhảy lên bậc trên cùng sát ngai
      const v = ease((X - T.first - 0.55) / 0.6), fx = lerp(470, 1170, v), fy = lerp(940, 700, v) - Math.sin(v * Math.PI) * 150;
      ff(fx, fy, 270, { eyes: X > T.first + 1.2 ? 'happy' : 'dot', look: 1, sweat: cold });
      S.label('HEIR', fx, fy - 330, 64, pop(X, T.first + 1.15), RED, { stroke: '#FFF' }); }],

    // ═══ S3 · "short-tempered, not very popular at court" — FF nổi gân, triều thần lùi xa mắt chán → "obsessed with hunting… 270,000 animals" ảnh săn voi + bộ đếm · tiếng: "short-tempered" hơi nóng xì, "popular" bước chân lùi, bộ đếm tick tick → "animals" chuông
    [ST(L3), (t, X) => {
      if (X < T.hunting - 0.12) { S.paper('#EFE6D2'); g.fillStyle = '#B7323A'; g.beginPath(); g.moveTo(860, 1080); g.lineTo(1060, 1080); g.lineTo(1010, 760); g.lineTo(910, 760); g.closePath(); g.fill();
        g.fillStyle = '#E2D6B8'; g.fillRect(0, 760, W, 6);
        const k = ease((X - T.popular) / 0.6);
        [[-1, 590, 'kepi'], [-1, 330, 'top'], [1, 1330, 'top'], [1, 1590, 'kepi']].forEach(([s, x, wear], i) => C.folk(x + s * k * 230, 1000, 470, { coat: wear === 'top' ? 'suit' : 'austro', wear, eyes: k > 0.2 ? 'bored' : 'dot', look: k > 0.2 ? s : -s, skin: '#FFFFFF' }));
        const angry = X >= T.temper, r = ff(960, 1000, 620, { eyes: angry ? 'angry' : 'dot', mouth: angry ? 'frown' : null, sweat: false });
        if (angry) { S.vein(r.head[0] + r.r * 0.75, r.head[1] - r.r * 0.55, 1.4); for (const s of [-1, 1]) { const u = ((X - T.temper) * 1.6) % 1; g.fillStyle = `rgba(150,150,155,${0.9 * (1 - u)})`; g.strokeStyle = `rgba(30,35,40,${0.8 * (1 - u)})`; g.lineWidth = 4;
          g.beginPath(); g.arc(r.head[0] + s * (r.r * 1.1 + u * 60), r.head[1] - r.r * 0.9 - u * 90, 20 + 26 * u, 0, 7); g.fill(); g.stroke(); } }
        return; }
      const u = X - T.hunting; S.photoBg(IM.p_ff_hunt, u, { desat: 0.35, fy: 0.55, credit: 'Franz Ferdinand on a hunting trip, c. 1893 · Carl Pietzner · public domain' });
      const k = pop(X, T.list - 0.2, 0.25); if (k > 0) { g.fillStyle = `rgba(15,15,20,${0.62 * k})`; g.fillRect(0, 70, W, 270);
        const n = Math.round(270000 * ease((X - T.list) / (T.animals - T.list))), txt = n.toLocaleString('en-US') + (X >= T.animals ? '+' : '');
        S.label(txt, 960, 230, 150, k, '#FFF', { stroke: INK }); S.label('ANIMALS', 960, 312, 52, pop(X, T.animals), '#F3C61B'); } }],

    // ═══ S4 · "Averaged out, about fifteen animals a day, every single day he was alive" — phép chia → ≈15/DAY, 15 con thú xếp hàng run, lịch xé tờ chạy 1863→1914 · tiếng: "fifteen" pop×15 nhanh, "every single day" xé giấy liên hồi
    [ST(L4), (t, X) => { S.paper('#F1EADB');
      S.label('270,000 ÷ 18,455 DAYS', 1290, 190, 66, X < T.fifteen - 0.1 ? pop(X, ST(L4) + 0.1) : 0, INK);
      S.label('≈ 15 / DAY', 1290, 210, 120, pop(X, T.fifteen), RED, { stroke: '#FFF' });
      // lịch xé tờ
      const run = clamp((X - T.every) / 2.4), page = Math.floor(run * 40), yr = Math.round(lerp(1863, 1914, run));
      g.save(); g.strokeStyle = INK; g.lineWidth = 7; for (let i = 3; i >= 1; i--) { g.fillStyle = '#E8E1D0'; g.fillRect(190 + i * 6, 380 + i * 6, 380, 426); g.strokeRect(190 + i * 6, 380 + i * 6, 380, 426); } g.restore();
      calendar(380, 600, 380, 1, { noPop: true, rot: 0, month: X < T.every ? 'DAY' : String(yr), day: X < T.every ? '1' : String(1 + Math.floor(hash(page) * 28)) });
      if (X >= T.every && X < T.every + 2.6) { const f = (run * 40) % 1; g.save(); g.globalAlpha = 1 - f; g.translate(380 - f * 260, 600 - f * 520); g.rotate(-f * 1.2); g.fillStyle = '#FBF8F0'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-190, -150, 380, 300); g.strokeRect(-190, -150, 380, 300); g.restore(); }
      // 15 con thú xếp hàng, run
      for (let i = 0; i < 15; i++) { const row = Math.floor(i / 5), j = i % 5, s = [1.05, 1.2, 1.35][row], x = 900 + j * 205 + (row % 2) * 60, y = [560, 760, 990][row];
        const a = pop(X, T.fifteen + i * 0.06, 0.15); if (a <= 0) continue; critter(x + 60, y - (1 - easeOut(a)) * 60, s, (i + row) % 3, X, i, a); } }],

    // ═══ S5 · "one thing the court never forgave him for… marrying for love" — triều thần lườm, FF huýt sáo → tim bật, triều thần sốc, một người ngất · tiếng: "love" tim pop + "gasp" đám đông
    [ST(L5), (t, X) => { B.place('palace'); g.fillStyle = 'rgba(244,241,232,0.35)'; g.fillRect(0, 0, W, H);
      const shock = X >= T.love;
      [[230, 'top', 'suit'], [450, 'kepi', 'austro'], [670, 'top', 'suit'], [890, 'kepi', 'austro']].forEach(([x, wear, coat], i) => {
        const faint = shock && i === 2 ? ease((X - T.love - 0.4) / 0.5) : 0;
        C.folk(x, 1000, 450, { coat, wear, eyes: shock ? 'shock' : 'angry', mouth: shock ? 'o' : 'flat', look: 1, tilt: -faint * 1.2 }); });
      const r = ff(1320, 1000, 480, { eyes: X >= T.marrying ? 'happy' : 'dot', look: -0.5 });
      if (X < T.marrying) for (let i = 0; i < 2; i++) { const u = (X * 0.9 + i * 0.5) % 1; g.save(); g.globalAlpha = 1 - u; g.fillStyle = INK; g.font = '900 90px Archivo, sans-serif'; g.fillText('♪', 1440 + u * 90 + i * 60, 560 - u * 160); g.restore(); }
      heart(1560, 430, 2.2 * back(pop(X, T.marrying, 0.35)) * (shock ? 1 + 0.08 * Math.sin((X - T.love) * 14) : 1));
      if (shock) heart(1760, 250, 1.3 * back(pop(X, T.love, 0.3))); }],

    // ═══ S6 · "His wife, Sophie Chotek, was a countess" ảnh tư liệu + thẻ tên → thang đẳng cấp: zoom-out lộ thang cao vút, Habsburg trên đỉnh, Sophie sát đáy cạnh thường dân · người dẫn góc phải ở ảnh · tiếng: "fancy" lấp lánh, "unless" zoom-out whoosh, "commoner" thả "bonk"
    [ST(L6), (t, X) => {
      if (X < T.which6 - 0.1) { const u = X - ST(L6); S.paper('#1A1A1A'); S.photo(IM.p_sophie, 520, 530, 420, 1, { push: 1 + 0.02 * u, credit: 'Sophie Chotek, Duchess of Hohenberg · public domain' });
        S.nameTag('SOPHIE CHOTEK', pop(X, T.sophie), 840, 430); S.nameTag('COUNTESS', pop(X, T.countess), 840, 510); host(X); return; }
      S.paper('#EAF2F7');
      const z = ease((X - T.unless) / 1.0), s = lerp(1.8, 0.34, z), cy = lerp(700, -315, z), TOP = -1300;
      const sc = (wx, wy) => [W / 2 + (wx - 960) * s, H / 2 + (wy - cy) * s];
      g.save(); g.translate(W / 2, H / 2); g.scale(s, s); g.translate(-960, -cy);
      g.fillStyle = '#C9D7B0'; g.fillRect(-4000, 1000, 9000, 900); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.moveTo(-4000, 1000); g.lineTo(5000, 1000); g.stroke();
      g.strokeStyle = '#7A5A3A'; g.lineWidth = 22; g.beginPath(); g.moveTo(840, 1000); g.lineTo(840, TOP - 40); g.moveTo(1080, 1000); g.lineTo(1080, TOP - 40); g.stroke();
      g.lineWidth = 14; for (let y = 880; y >= TOP; y -= 120) { g.beginPath(); g.moveTo(840, y); g.lineTo(1080, y); g.stroke(); }
      g.fillStyle = '#C9A24A'; g.strokeStyle = INK; g.lineWidth = 8; g.fillRect(760, TOP - 30, 400, 40); g.strokeRect(760, TOP - 30, 400, 40);
      const r1 = fj(900, TOP - 30, 300, { eyes: 'bored', look: 1 }); crown(r1.head[0], r1.head[1], r1.r);
      const r2 = ff(1030, TOP - 30, 290, { wear: null, eyes: 'dot', look: -1 }); crown(r2.head[0], r2.head[1], r2.r);
      const sp = sophie(960, 880, 300, { eyes: X >= T.commoner ? 'dot' : 'happy', mouth: X >= T.commoner ? 'frown' : null, look: X >= T.commoner ? 1 : 0 });
      if (z > 0.6) C.folk(1250, 1000, 290, { coat: 'worker', wear: 'cap', eyes: 'happy', arm: X >= T.commoner + 0.2 ? 'up' : null, look: -1 });
      g.restore();
      if (X >= T.fancy && X < T.unless + 0.3) for (let i = 0; i < 6; i++) { const a = i * 1.05 + X * 2, [px, py] = sc(960 + Math.cos(a) * 200, 740 + Math.sin(a) * 170), k = 0.5 + 0.5 * Math.sin(X * 9 + i);
        g.save(); g.fillStyle = '#F3C61B'; g.strokeStyle = INK; g.lineWidth = 3; g.translate(px, py); g.scale(k, k); g.beginPath(); for (let j = 0; j < 8; j++) { const rr = j % 2 ? 9 : 26; g.lineTo(Math.cos(j * Math.PI / 4) * rr, Math.sin(j * Math.PI / 4) * rr); } g.closePath(); g.fill(); g.stroke(); g.restore(); }
      const [hx, hy] = sc(1160, TOP - 150); S.label('HABSBURGS', hx + 40, hy, 50, pop(X, T.habsburg), RED, { align: 'left', stroke: '#FFF' });
      for (const [nm, wy] of [['PRINCES', -900], ['DUKES', -420]]) { const [lx, ly] = sc(800, wy); S.label(nm, lx - 30, ly, 36, pop(X, T.unless + 0.7), '#9A9488', { align: 'right' }); }
      const [cx2, cy2] = sc(800, 760); S.label('COUNTESS', cx2 - 30, cy2, 44, pop(X, T.countess2), INK, { align: 'right', stroke: '#FFF' });
      const [mx, my] = sc(1400, 880); S.label('COMMONER', mx + 10, my, 44, pop(X, T.commoner), INK, { align: 'left', stroke: '#FFF' }); }],

    // ═══ S7 · "had to swear that their children would never inherit the throne" — giấy "I SWEAR…" ký dần → ảnh tư liệu gia đình + dấu "NO THRONE" · người dẫn góc phải ở ảnh · tiếng: "swear" bút sột soạt, "never" dấu đóng THỊCH
    [ST(L7), (t, X) => {
      if (X < T.children - 0.1) { S.paper('#5A4130'); g.fillStyle = 'rgba(0,0,0,0.15)'; for (let i = 0; i < 9; i++) g.fillRect(0, 60 + i * 120, W, 4);
        oath(1100, 560, 640, clamp((X - T.swear) / 0.9));
        const r = ff(400, 1000, 560, { eyes: 'dot', look: 1, sweat: X > T.swear });
        return; }
      const u = X - T.children; S.paper('#1A1A1A'); S.photo(IM.p_ff_family, 760, 540, 700, 1, { push: 1 + 0.02 * u, credit: 'Franz Ferdinand, Sophie and their children · public domain' });
      S.stamp('NO THRONE', 760, 780, 92, clamp((X - T.never7) / 0.5), -0.1); host(X); }],

    // ═══ S8 · "In Vienna, Sophie couldn't sit next to her husband in the royal box…" — cung điện (VIENNA) → lô nhà hát: FF ngồi cạnh ghế trống, NGƯỜI DẪN NHẬP VAI #2 (người hầu) giơ tay chặn Sophie ở cửa → "…ride beside him in a royal carriage": xe ngựa vàng chạy, Sophie lủi thủi đi bộ sau · tiếng: "Vienna" kèn nhỏ, "box" tiếng xì xào nhà hát, "carriage" vó ngựa lộc cộc
    [ST(L8), (t, X) => {
      if (X < T.sophie8 - 0.1) { g.save(); camPush(t, 0.03); B.place('palace'); g.restore(); S.label('VIENNA', 960, 150, 96, clamp(t / 0.3), '#FFF', { stroke: INK }); return; }
      if (X < T.and8 - 0.1) { const u = X - T.sophie8;
        g.fillStyle = '#2A1014'; g.fillRect(0, 0, W, H); g.fillStyle = '#3A161B'; for (let i = 0; i < 12; i++) g.fillRect(i * 170, 0, 70, H);
        // cửa phải (ra hành lang sáng)
        g.strokeStyle = INK; g.lineWidth = 9; g.fillStyle = '#E9D9A8'; g.fillRect(1380, 300, 300, 680); g.strokeRect(1380, 300, 300, 680);
        g.fillStyle = '#C9A24A'; g.fillRect(1395, 236, 270, 58); g.strokeRect(1395, 236, 270, 58); g.fillStyle = INK; g.font = '900 32px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ROYALS ONLY', 1530, 268);
        // lô: FF ngồi + ghế trống, lan can che nửa dưới
        for (const [x, who] of [[560, 'ff'], [880, null]]) { g.fillStyle = '#8D2A2E'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.roundRect(x - 110, 470, 220, 330, [60, 60, 0, 0]); g.fill(); g.stroke();
          if (who) ff(x, 890, 460, { eyes: X > T.box ? 'dot' : 'happy', look: 1, wear: null }); }
        if (X > T.box - 0.3) { g.save(); g.globalAlpha = 0.35 + 0.25 * Math.sin(X * 8); g.fillStyle = '#F3E39A'; g.beginPath(); g.ellipse(880, 600, 150, 190, 0, 0, 7); g.fill(); g.restore(); }
        g.fillStyle = '#9E1F2A'; g.strokeStyle = INK; g.lineWidth = 9; g.beginPath(); g.moveTo(300, 760); g.quadraticCurveTo(720, 700, 1140, 760); g.lineTo(1140, 1090); g.lineTo(300, 1090); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = '#E7B93A'; g.lineWidth = 14; g.beginPath(); g.moveTo(300, 790); g.quadraticCurveTo(720, 730, 1140, 790); g.stroke();
        for (const cx of [170, 1210]) { g.fillStyle = '#7A141C'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(cx - 120, -10); g.quadraticCurveTo(cx - 20, 500, cx - 100, 1090); g.lineTo(cx + 80, 1090); g.quadraticCurveTo(cx + 40, 500, cx + 120, -10); g.closePath(); g.fill(); g.stroke(); }
        const sx = lerp(1720, 1590, easeOut(u / 0.4)); sophie(sx, 980, 400, { eyes: X > T.box ? 'dot' : 'happy', look: -1, mouth: X > T.box ? 'frown' : null });
        narrator(1360, 990, 320, { outfit: 'waiter', arms: 'point', mood: 'sad', mouth: 'small', look: 1 });   // nhập vai #2 — không chữ, không mũi tên
        return; }
      const u = X - T.and8; B.place('palace');
      const cx = lerp(-500, 1150, easeOut(u / 1.6)); carriage(cx, 980, X, u < 1.6);
      const sx = lerp(230, 520, clamp((u - 0.5) / 2.6)); sophie(sx, 975 - Math.abs(Math.sin(X * 9)) * 10, 330, { eyes: 'dot', mouth: 'frown', look: 1 }); }],

    // ═══ S9 + S10 · "But in Bosnia… head of the army, not as a royal" FF đổi vương miện → mũ lông xanh → "Sophie could sit right next to him in an open car… Which is sweet… only reason she was in that car" xe vẽ, tim nhỏ rồi tắt dần, khung khử màu · tiếng: "army" tiếng kèn quân + pop mũ, "sit right next" tim pop nhẹ; "only reason" nhạc tắt, ù trầm
    [ST(L9), (t, X) => {
      if (X < T.so9 - 0.1) { S.paper('#E9E2CF'); g.fillStyle = '#D9CBB0'; g.fillRect(0, 1000, W, 80);
        S.label('BOSNIA, 1914', 960, 140, 70, pop(X, T.bosnia9), INK);
        const arm = X >= T.army, u = X - T.army;
        const r = ff(960, 1000, 620, { wear: arm ? 'plume' : null, coat: arm ? 'austro' : 'suit', eyes: arm ? 'happy' : 'dot', mouth: null });
        if (!arm) crown(r.head[0], r.head[1], r.r);
        else { const f = clamp((X - T.army - 0.05) / 0.7); if (X < T.army + 0.8) { g.save(); g.translate(r.head[0] + f * 420, r.head[1] - r.r * 0.3 + (f * f * 900 - f * 260)); g.rotate(f * 4); crown(0, 0, r.r); g.restore(); }
          S.flash(r.head[0], r.head[1] - r.r * 1.1, u / 0.3, 220); }
        S.label('HEAD OF THE ARMY', 1460, 470, 50, pop(X, T.army + 0.1), '#3E8E3A', { stroke: '#FFF' });
        return; }
      const u = X - T.so9; const dark = ease((X - T.only10) / 1.4);
      g.save(); camPush(u, 0.012, 1000, 640); B.place('quay');
      const k = easeOut(u / 1.1), hd = carRide(lerp(2400, 1000, k), 1040, 1080, { spin: -(1 - k) * 30, ffEyes: 'happy', soEyes: 'happy', look: 1 });
      const mx = (hd.ff.head[0] + hd.so.head[0]) / 2, my = Math.min(hd.ff.head[1], hd.so.head[1]) - 150;
      const hk = X < T.only10 ? back(pop(X, T.sit9, 0.35)) * (X > T.sweet ? 1.25 + 0.06 * Math.sin((X - T.sweet) * 10) : 1) : 1.25 * (1 - dark);
      heart(mx, my, 1.3 * hk, X < T.only10 ? 1 : 1 - dark);
      g.restore(); S.desat(0.75 * dark, 0.35); }],

    // ═══ S11–S12 · "Mistake number one was the date." bảng MISTAKES 0→1/5 + lịch 28 JUNE → khoanh 28 → dấu VIDOVDAN → tranh Kosovo 1389 → người Serb rơi lệ · người dẫn góc phải ở lịch · tiếng: "one" ding bảng điểm, "date" lịch bật, "twenty-eighth" bút khoanh, "Vidovdan" chuông nhà thờ, "1389" trống trận xa
    [ST(L11), (t, X) => {
      if (X < T.famous - 0.1) { S.paper('#F1EADB');
        const ck = pop(X, ST(L11) + 0.1, 0.35), wig = X > T.date && X < T.date + 0.5 ? 0.06 * Math.sin((X - T.date) * 40) : 0;
        calendar(860, 560, 520, ck, { ring: clamp((X - T.t28) / 0.5), rot: -0.025 + wig });
        if (X >= T.vidovdan) { S.stamp('VIDOVDAN', 860, 880, 70, clamp((X - T.vidovdan) / 0.5), -0.06);
          for (const [fx, d] of [[400, 0], [1320, 0.1]]) { const k = back(pop(X, T.vidovdan + 0.2 + d)); if (k <= 0) continue; g.save(); g.translate(fx, 470); g.scale(k, k); g.strokeStyle = INK; g.lineWidth = 6;
            g.beginPath(); g.moveTo(0, 260); g.lineTo(0, -40); g.stroke(); ['#C6363C', '#2B4C9B', '#FFFFFF'].forEach((c, i) => { g.fillStyle = c; g.fillRect(0, -40 + i * 40, 170, 40); }); g.strokeRect(0, -40, 170, 120); g.restore(); } }
        host(X, pop(X, T.date, 0.35));
        mistakes(X < T.one ? 0 : 1, clamp((X - ST(L11) - 0.05) / 0.3) * (1 - clamp((X - T.one - 3.2) / 0.3)), X < T.one ? 9 : X - T.one); return; }
      if (X < T.and12 - 0.1) { const u = X - T.famous; S.photoBg(IM.p_kosovo, u, { desat: 0.15, fy: 0.45, push: 0.02, credit: 'Adam Stefanović, The Battle of Kosovo (1389), painted 1875 · public domain' });
        S.label('1389', 260, 190, 130, pop(X, T.y1389), '#FFF', { stroke: INK }); return; }
      const u = X - T.and12; S.paper('#EDE3CF');
      C.crowd(-60, 1980, 1100, 460, X, { rows: 2, eyes: 'cry', wears: ['fez', 'cap', 'scarf', null, 'fez', 'cap'], seed: 5 });
      
      S.label('MOST EMOTIONAL DAY', 960, 190, 76, pop(X, T.emotional), INK, { stroke: '#FFF' }); }],

    // ═══ S13 · "the heir of the empire that had just grabbed Bosnia picked Serbia's biggest holiday to parade through Bosnia's capital" — bản đồ (Áo-Hung đắc ý, Serbia giận, BOSNIA "GRABBED 1908") → FF ghim lịch Vidovdan → đoàn xe diễu hành Sarajevo · người dẫn góc phải ở bản đồ + lịch · tiếng: "grabbed" chộp, "picked" ghim cắm, "parade" kèn diễu hành
    [ST(L13), (t, X) => {
      if (X < T.picked - 0.1) { const V = view(M, { cx: 18.4, cy: 45.3, zoom: 2.6 + 0.06 * t });
        drawMap(g, M, V, { fill: { 'Austro-Hungarian Empire': 'flag', Serbia: 'flag' } });
        mapFace(g, M, V, 'Austro-Hungarian Empire', { mood: X >= T.grabbed ? 'smug' : 'calm' }); mapFace(g, M, V, 'Serbia', { mood: 'angry', look: [-1, -0.3] });
        const p = S.pt(V, 17.8, 44.2); S.label('BOSNIA', p[0], p[1], 52, pop(X, T.grabbed - 0.3), '#FFF', { stroke: INK }); S.stamp('GRABBED 1908', p[0] - 30, p[1] + 90, 44, clamp((X - T.grabbed) / 0.4), -0.1);
        host(X); return; }
      if (X < T.parade13 - 0.1) { S.paper('#F1EADB');
        calendar(860, 560, 520, 1, { noPop: true, ring: 1, pin: clamp((X - T.picked) / 0.35) }); S.stamp('VIDOVDAN', 860, 880, 70, 1, -0.06);
        ff(330, 1000, 520, { eyes: 'happy', look: 1, arm: X > T.picked ? 'up' : null });
        S.label('BIGGEST HOLIDAY', 1340, 300, 56, pop(X, T.biggest), RED, { stroke: '#FFF' }); host(X); return; }
      const u = X - T.parade13; B.place('quay');
      carRide(lerp(2300, 1040, easeOut(u / 1.2)), 1000, 900, { spin: -X * 6, look: -1 });
      C.crowd(-60, 1980, 1100, 210, X, { rows: 1, eyes: 'angry', seed: 9, wears: ['fez', 'cap', null, 'scarf'] });
      S.label('SARAJEVO', 960, 140, 80, pop(X, T.capital), '#FFF', { stroke: INK }); }],

    // ═══ S14 · "like throwing a Yankees victory parade through downtown Boston… already in a terrible mood" — xe diễu hành áo sọc xanh + cúp + hoa giấy; đám đông áo đỏ mọc lên mắt giận; mây giông · tiếng: "parade" kèn + reo, "Boston" la ó (boo), "terrible" sấm
    [ST(L14), (t, X) => {
      const gr = g.createLinearGradient(0, 0, 0, 700); const storm = ease((X - T.terrible + 0.3) / 0.5);
      gr.addColorStop(0, storm > 0.5 ? '#6E7480' : '#8FC0E4'); gr.addColorStop(1, storm > 0.5 ? '#A9ADB4' : '#DCEBF5'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.save(); g.strokeStyle = INK; g.lineWidth = 8; for (let i = 0; i < 6; i++) { const x = i * 330 - 20, h = 360 + 120 * hash(i + 70); g.fillStyle = i % 2 ? '#A5523A' : '#8E4430'; g.fillRect(x, 780 - h, 300, h); g.strokeRect(x, 780 - h, 300, h);
        g.fillStyle = '#F5E7B8'; for (let c = 0; c < 3; c++) for (let r = 0; r < Math.floor(h / 120); r++) { g.fillRect(x + 40 + c * 85, 780 - h + 40 + r * 110, 50, 70); g.strokeRect(x + 40 + c * 85, 780 - h + 40 + r * 110, 50, 70); } }
      g.fillStyle = '#8C8A86'; g.fillRect(0, 780, W, 300); g.beginPath(); g.moveTo(0, 780); g.lineTo(W, 780); g.stroke(); g.restore();
      // xe diễu hành sọc xanh
      const fx = lerp(-700, 820, easeOut((X - ST(L14)) / 2.0)) + Math.max(0, X - ST(L14) - 2.0) * 25;
      g.save(); g.strokeStyle = INK; g.lineWidth = 8; g.fillStyle = '#E9E2CF'; g.fillRect(fx - 380, 620, 760, 110); g.strokeRect(fx - 380, 620, 760, 110);
      for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#2B3A55' : '#FFFFFF'; g.fillRect(fx - 380 + i * 760 / 9, 690, 760 / 9, 40); } g.strokeRect(fx - 380, 690, 760, 40);
      for (const wx of [fx - 260, fx + 260]) { g.fillStyle = '#2A2A2E'; g.beginPath(); g.arc(wx, 750, 46, 0, 7); g.fill(); g.stroke(); } g.restore();
      [fx - 260, fx - 90, fx + 80, fx + 250].forEach((x, i) => shirt(x, 625 - Math.max(0, Math.sin(X * 8 + i)) * 14, 250, '#2B3A55', { eyes: 'happy', arm: 'up', wear: 'cap', stripes: true }));
      g.save(); g.translate(fx + 330, 540); g.fillStyle = '#E7B93A'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(-50, -80); g.lineTo(50, -80); g.quadraticCurveTo(50, 0, 0, 10); g.quadraticCurveTo(-50, 0, -50, -80); g.fill(); g.stroke(); g.fillRect(-10, 10, 20, 50); g.strokeRect(-10, 10, 20, 50); g.fillRect(-40, 60, 80, 20); g.strokeRect(-40, 60, 80, 20); g.restore();
      if (storm < 0.5) for (let i = 0; i < 40; i++) { const px = (hash(i) * W + X * 30 * (hash(i + 1) - 0.5)), py = ((hash(i + 2) * H) + X * 160) % 760; g.fillStyle = ['#E8453B', '#F3C61B', '#3E8EDE', '#FFF'][i % 4]; g.save(); g.translate(px, py); g.rotate(X * 3 + i); g.fillRect(-7, -4, 14, 8); g.restore(); }
      // đám đông áo đỏ mọc lên
      const ck = easeOut((X - T.boston) / 0.4); if (ck > 0) { g.save(); g.translate(0, (1 - ck) * 380); redCrowd(-60, 1980, 1080, 330, X, { stomp: X > T.everybody, vein: true, look: -0.3 }); g.restore(); }
      if (storm > 0) { g.save(); g.globalAlpha = storm; g.fillStyle = '#4A4E58'; g.strokeStyle = INK; g.lineWidth = 7;
          for (const [cx, cy, r] of [[700, 150, 110], [860, 120, 140], [1040, 150, 120], [1200, 170, 100], [950, 200, 120]]) { g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill(); }
          g.strokeStyle = '#9FB7D4'; g.lineWidth = 4; for (let i = 0; i < 30; i++) { const rx = 600 + hash(i + 50) * 720, ry = 250 + ((X * 900 + hash(i + 51) * 500) % 500); g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx - 10, ry + 34); g.stroke(); }
          if (((X - T.terrible) % 1.2) < 0.12 && X > T.terrible) { g.fillStyle = '#FFF2A0'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(980, 240); g.lineTo(920, 420); g.lineTo(980, 410); g.lineTo(930, 600); g.lineTo(1060, 370); g.lineTo(1000, 380); g.lineTo(1050, 240); g.closePath(); g.fill(); g.stroke(); }
          g.restore(); } }],

    // ═══ S15 · "For the couple, an anniversary… fourteen years earlier… sworn away his children's rights so he could marry Sophie" — đôi vợ chồng + tim + thẻ 28 JUNE 1914 → tua ngược năm về 1900 → giấy thề (gọi lại) + "NO THRONE" + tim cưới · người dẫn không có (cảnh tình cảm) · tiếng: "anniversary" chuông nhỏ, "fourteen" tua băng ngược, "rights" dấu đóng, "marry" chuông cưới
    [ST(L15), (t, X) => {
      if (X < T.sworn - 0.15) { S.paper('#F6E6E0');
        const rw = clamp((X - T.fourteen) / (T.earlier + 0.4 - T.fourteen)), yr = Math.round(lerp(1914, 1900, ease(rw)));
        ff(700, 1000, 520, { eyes: 'happy', look: 1 }); sophie(1220, 1000, 500, { eyes: 'happy', look: -1 });
        heart(960, 640, 1.6 * back(pop(X, T.anniv - 0.2, 0.4)) * (1 + 0.06 * Math.sin(X * 6)));
        calendar(960, 250, 260, pop(X, ST(L15) + 0.2), { year: String(yr), rot: 0.03 });
        if (X > T.fourteen - 0.1 && X < T.earlier + 0.6) rewind(X, 1); return; }
      S.paper('#F6E6E0'); const u = X - T.sworn;
      oath(560, 540, 520, clamp(u / 0.7), { rot: -0.05 });
      S.stamp('NO THRONE', 560, 700, 70, clamp((X - T.rights) / 0.5), -0.12);
      ff(1180, 1000, 480, { eyes: 'happy', look: 1 }); sophie(1560, 1000, 460, { eyes: 'happy', look: -1 });
      heart(1370, 480, back(pop(X, T.marry15, 0.4)) * 1.1); }],

    // ═══ S16 · "a lovely day for a drive, and a perfect day for an assassination" — trời xanh, chim, xe chạy thong thả → cùng khung tối dần, 6 bóng đen trồi lên tiền cảnh · không người dẫn · tiếng: "lovely" chim hót, "perfect day" nhạc cắt, "assassination" ù trầm + tim đập
    [ST(L16), (t, X) => { const dk = ease((X - T.perfect) / 1.0);
      B.place('quay');
      g.save(); g.fillStyle = '#F7D54A'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.arc(1660, 170, 80, 0, 7); g.fill(); g.stroke();
      for (let i = 0; i < 4; i++) { const bx = ((X * 60 + i * 420) % 2200) - 140, by = 140 + 50 * hash(i + 3) + 10 * Math.sin(X * 3 + i); g.lineWidth = 5; g.beginPath(); g.moveTo(bx - 22, by - 8 * Math.abs(Math.sin(X * 7 + i))); g.quadraticCurveTo(bx - 8, by - 12, bx, by); g.quadraticCurveTo(bx + 8, by - 12, bx + 22, by - 8 * Math.abs(Math.sin(X * 7 + i))); g.stroke(); }
      g.restore();
      carRide(lerp(1500, 700, clamp(t / 5.5)), 1010, 860, { spin: -X * 5, ffEyes: 'happy', soEyes: 'happy', look: -1 });
      S.desat(0.8 * dk, 0.5);
      for (let i = 0; i < 6; i++) { const k = easeOut((X - T.assassination - i * 0.1) / 0.4); if (k <= 0) continue; const x = 170 + i * 316, y = 1080 + 240 + (1 - k) * 200;
        g.save(); g.fillStyle = '#0B0B0E'; g.beginPath(); g.moveTo(x - 110, y); g.lineTo(x - 110, y - 260); g.arc(x, y - 260, 110, Math.PI, 0); g.lineTo(x + 110, y); g.closePath(); g.fill();
        g.beginPath(); g.arc(x, y - 400, 92, 0, 7); g.fill(); g.beginPath(); g.ellipse(x, y - 462, 118, 18, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(x, y - 472, 70, 60, 0, Math.PI, 0); g.fill(); g.restore(); } }],
  ];
};
