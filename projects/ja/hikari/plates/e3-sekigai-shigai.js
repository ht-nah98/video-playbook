// e3 · 赤外線と紫外線 (p2 câu 69–73) — ERA darkroom, thước ĐỖ như e2; dấu dải: マイクロ波 → 赤外線 → (qua khe thấy được) → 紫外線.
//  69 người + cốc nét trung tính, quầng XÁM (không giả màu nhiệt) · 70 紫外線 TRÁI khe thấy được (chuỗi 1), DNA bị đánh trúng
//  71 UVB / UVA (kính lúp dải 紫外線, KHÔNG số nm) · 72 khí quyển chặn UVC, UVB gần hết · 73 ảnh mimulus-uv (ong thấy UV)
// Sóng không thấy được: nét trung tính ≥ 4 px, không 'lighter'. Ánh sáng đi từ trái sang phải. Không đặt CONTINUES (chuyển 雨戸).
import { BANDS, RULER4, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, specRuler, rulerX, spot, ink, imgs, photo,
  telop, title, arrow, cue, W, TAU, VIS } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const RP = { y: 846, h: 48 };
const BAND = Object.fromEntries(BANDS.map(b => [b.key, b]));
BAND.radio = { ...BAND.radio, hi: 1e4 };
const bx = key => [rulerX(BAND[key].lo, RULER4), rulerX(BAND[key].hi, RULER4)];
const MARK_DUR = 0.6;
/** Dấu dải (dùng chung G5, chép giống hệt vào e2/e3/e4): khung 生成り 3 px bao đúng dải [X(lo), X(hi)] của BANDS, trượt (smooth) giữa các dải. */
function bandMark(g, t, stops, a = 1) {
  let i = 0; for (let j = 0; j < stops.length; j++) if (t >= stops[j][0]) i = j;
  const cur = bx(stops[i][1]), prev = bx(stops[Math.max(0, i - 1)][1]), u = i ? smooth(clamp((t - stops[i][0]) / MARK_DUR)) : 1;
  const x0 = lerp(prev[0], cur[0], u), x1 = lerp(prev[1], cur[1], u);
  if (a > 0) {
    g.save(); g.fillStyle = `rgba(237,232,223,${0.08 * a})`; g.fillRect(x0, RP.y - 8, x1 - x0, RP.h + 16);
    g.strokeStyle = `rgba(237,232,223,${a})`; g.lineWidth = 3; g.strokeRect(x0, RP.y - 8, x1 - x0, RP.h + 16); g.restore();
  }
  return [x0, x1];
}
function nwave(g, x0, x1, y, lam, amp, k, ph, { col = '@ink', a = 1, w = 4 } = {}) {
  if (k <= 0) return;
  const xe = x0 + (x1 - x0) * clamp(k);
  g.save(); g.strokeStyle = ink(col); g.globalAlpha = a; g.lineWidth = Math.max(4, w); g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  for (let x = x0; x <= xe; x += 2) { const yy = y - Math.sin((x - x0) / lam * TAU - ph) * amp; x === x0 ? g.moveTo(x, yy) : g.lineTo(x, yy); }
  g.stroke(); g.restore();
}
function grp(g, t, a, b, draw, dx = -1900) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.55)); if (o >= 1) return;
  g.save(); g.beginPath(); g.rect(96, 196, W - 96, 620); g.clip(); g.translate(dx * o, 0); draw(); g.restore();
}
const stroke = (g, col = '@ink', w = 4) => { g.strokeStyle = ink(col); g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };
/** Quầng XÁM quanh một vật ấm (không giả màu nhiệt): đĩa xám mờ (source-over) + vòng elip trung tính nở dần. */
function grayHalo(g, t, cx, cy, rx, ry, k = 1) {
  if (k <= 0) return;
  g.save(); g.translate(cx, cy); g.scale(1, ry / rx);
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, rx * 1.4); gr.addColorStop(0, `rgba(154,149,140,${0.22 * k})`); gr.addColorStop(1, 'rgba(154,149,140,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, rx * 1.4, 0, TAU); g.fill(); g.restore();
  for (let i = 0; i < 3; i++) {
    const ph = (t * 0.45 + i / 3) % 1;
    g.save(); stroke(g, '@dim', 4); g.globalAlpha = (1 - ph) * 0.8 * k; g.beginPath(); g.ellipse(cx, cy, rx * (1 + 0.9 * ph), ry * (1 + 0.5 * ph), 0, 0, TAU); g.stroke(); g.restore();
  }
}
function person(g, cx, y0, s) {                                  // hình người nét trung tính (không phải mascot)
  g.save(); stroke(g, '@ink', 4);
  g.beginPath(); g.arc(cx, y0 + 44 * s, 44 * s, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(cx - 80 * s, y0 + 250 * s); g.quadraticCurveTo(cx - 90 * s, y0 + 112 * s, cx, y0 + 112 * s);
  g.quadraticCurveTo(cx + 90 * s, y0 + 112 * s, cx + 80 * s, y0 + 250 * s); g.stroke();
  g.beginPath(); g.moveTo(cx - 80 * s, y0 + 250 * s); g.lineTo(cx - 70 * s, y0 + 430 * s); g.moveTo(cx + 80 * s, y0 + 250 * s); g.lineTo(cx + 70 * s, y0 + 430 * s);
  g.moveTo(cx - 30 * s, y0 + 250 * s); g.lineTo(cx - 30 * s, y0 + 430 * s); g.moveTo(cx + 30 * s, y0 + 250 * s); g.lineTo(cx + 30 * s, y0 + 430 * s); g.stroke();
  g.restore();
}
function mug(g, x, y, s) {
  g.save(); stroke(g, '@ink', 4);
  g.beginPath(); g.moveTo(x - 60 * s, y - 55 * s); g.lineTo(x - 50 * s, y + 55 * s); g.lineTo(x + 50 * s, y + 55 * s); g.lineTo(x + 60 * s, y - 55 * s); g.closePath(); g.stroke();
  g.beginPath(); g.arc(x + 62 * s, y, 30 * s, -1.2, 1.2); g.stroke();
  g.restore();
}
/** Chuỗi xoắn DNA đứng (nét trung tính): hai sợi sin, thanh ngang; vùng bị đánh trúng (hit 0..1 tại yh) gãy một thanh + lệch sợi. */
function dna(g, cx, y0, y1, t, hit, yh) {
  g.save(); stroke(g, '@ink', 4);
  const A = 70, f = y => Math.sin(y / 52 + t * 0.6);
  for (const sg of [-1, 1]) { g.beginPath(); for (let y = y0; y <= y1; y += 4) { const x = cx + sg * A * f(y) + (hit > 0 ? sg * 22 * hit * Math.exp(-(((y - yh) / 40) ** 2)) : 0); y === y0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
  stroke(g, '@dim', 4);
  for (let y = y0 + 12; y <= y1; y += 26) { if (hit > 0.3 && Math.abs(y - yh) < 30) continue; const x = A * f(y); g.beginPath(); g.moveTo(cx - x, y); g.lineTo(cx + x, y); g.stroke(); }
  g.restore();
}
// vị trí vạch phụ trong kính lúp dải 紫外線 (nm — CHỈ dùng làm toạ độ, KHÔNG hiện số lên hình)
const UVS = [['UVC', 100, 280], ['UVB', 280, 315], ['UVA', 315, 400]];

export default class SekigaiShigai {
  static ERA = 'darkroom';
  static IMAGES = imgs('mimulus-uv');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3-sekigai-shigai');
    this.START = L(69).start;
    this.FROM = Math.max(this.START - 1.2, L(68).end + 0.5);
    const S = i => L(i).start;
    this.T = {
      l69: S(69), ir: w(69, '赤外線', 1), atatakai: w(69, '温かい'), minasan: w(69, '皆さん'),
      l70: S(70), mu: w(70, '紫'), soto70: w(70, '外側'), uv: w(70, '紫外線'), ph: w(70, '光子'), dna: w(70, 'dna'), kizu: w(70, '傷つける'),
      l71: S(71), uvb: w(71, 'uvb'), uva: w(71, 'uva'), hifu: w(71, '皮膚'),
      l72: S(72), uvc: w(72, 'uvc'), ozon: w(72, 'オゾン', 1), uvb72: w(72, 'uvb'),
      l73: S(73), mitsu: w(73, 'ミツバチ'), uv73: w(73, '紫外線'), moyo: w(73, '模様'), end: L(73).end,
    };
    const T = this.T;
    must(`${rulerX(10e-9, RULER4) < rulerX(VIS[0] * 1e-9, RULER4) && rulerX(VIS[1] * 1e-9, RULER4) < rulerX(1e-3, RULER4)}`, true);   // 紫外線 TRÁI khe thấy được, 赤外線 PHẢI (chuỗi 1)
    // dấu dải: マイクロ波 (cuối e2) → 赤外線 → qua khe thấy được → 紫外線
    const tv = T.mu - 0.2;
    this.marks = [[-1e9, 'micro'], [T.ir - 0.1, 'ir'], [tv, 'vis'], [Math.max(T.soto70 - 0.1, tv + MARK_DUR), 'uv']];
    this.tv = tv;
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.ir - 0.1, 'step'), cue(T.atatakai, 'beam', -5), cue(T.minasan, 'telop', -3),
      cue(this.marks[3][0], 'step'), cue(T.uv, 'telop'), cue(T.dna, 'tick', -4),
      cue(T.uvb, 'tick', -3), cue(T.hifu - 1.7, 'telop', -2), cue(T.kizu, 'step', -4),
      cue(T.uvc - 0.7, 'beam', -5), cue(T.ozon, 'step', -4), cue(T.uvb72, 'tick', -3),
      cue(T.mitsu - 0.2, 'photo'), cue(T.uv73, 'beam', -5), cue(T.moyo - 1.2, 'telop', -4),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, ph = t * 6;
    ground(g, 'darkroom');
    aperture(g, 'slit', { y: 360, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, '赤外線と紫外線', t, F + 0.3);
    specRuler(g, { y: RP.y, h: RP.h, window: 1, top: 4 });
    const m = bandMark(g, t, this.marks, smooth(prog(t, F + 0.4, F + 1.0)));
    const va = rulerX(VIS[0] * 1e-9, RULER4), vb = rulerX(VIS[1] * 1e-9, RULER4), cv = (va + vb) / 2, mc = (m[0] + m[1]) / 2;
    const bump = Math.max(0, 1 - Math.abs(mc - cv) / 110);          // dấu đi QUA khe thấy được → khe sáng lên
    if (bump > 0) {
      spot(g, cv, RP.y + RP.h / 2, 110, { a: 0.55 * bump });
      g.save(); g.strokeStyle = `rgba(246,242,234,${bump})`; g.lineWidth = 4; g.strokeRect(va - 7, RP.y - 10, vb - va + 14, RP.h + 20); g.restore();
    }

    // ═════ 69 赤外線: cốc + người, quầng xám ═════
    grp(g, t, T.l69 - 0.2, T.l70 - 0.15, () => {
      telop(g, '温かいものなら何でも', 140, 330, prog(t, T.atatakai, T.atatakai + 0.8), { size: 56, mincho: true });
      const kc = prog(t, T.atatakai - 0.1, T.atatakai + 0.5);
      if (kc > 0) { grayHalo(g, t, 420, 640, 130, 110, kc); g.save(); g.translate(420, 640); g.scale(outBack(kc), outBack(kc)); g.translate(-420, -640); mug(g, 420, 640, 1.2); g.restore(); }
      telop(g, '皆さんの体も、赤外線で輝いている', 140, 450, prog(t, T.minasan, T.minasan + 1.2), { size: 48 });
      const kp = prog(t, T.minasan - 0.1, T.minasan + 0.6);
      if (kp > 0) { grayHalo(g, t, 1400, 520, 130, 250, kp); g.save(); g.translate(1400, 520); g.scale(outBack(kp), outBack(kp)); g.translate(-1400, -520); person(g, 1400, 290, 1); g.restore(); }
    });
    // ═════ 70 紫外線: 紫の外側, DNA bị đánh trúng ═════
    grp(g, t, T.l70 - 0.1, T.l71 - 0.15, () => {
      telop(g, '紫の外側', 140, 330, prog(t, T.soto70, T.soto70 + 0.7), { size: 52 });
      telop(g, '紫外線', 140, 450, prog(t, T.uv, T.uv + 0.7), { size: 84, mincho: true });
      telop(g, 'DNAを傷つけるほどのエネルギー', 140, 600, prog(t, T.dna, T.dna + 1.2), { size: 44 });
      const kw = prog(t, T.ph - 0.1, T.kizu - 0.1), hit = prog(t, T.kizu - 0.1, T.kizu + 0.5);
      nwave(g, 880, 1200, 500, 26, 14, kw, ph * 2.5, { w: 5 });
      dna(g, 1330, 250, 750, t, hit, 500);
      if (hit > 0) { g.save(); stroke(g, '@ink', 5); g.globalAlpha = 1 - hit * 0.5; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.3, r0 = 30, r1 = 30 + 40 * hit; g.beginPath(); g.moveTo(1205 + Math.cos(a) * r0, 500 + Math.sin(a) * r0); g.lineTo(1205 + Math.cos(a) * r1, 500 + Math.sin(a) * r1); g.stroke(); } g.restore(); }
    });
    // ═════ 71 UVB / UVA: kính lúp dải 紫外線 ═════
    grp(g, t, T.l71 - 0.1, T.l72 - 0.15, () => {
      telop(g, 'UVB：日焼け', 140, 330, prog(t, T.uvb, T.uvb + 0.7), { size: 52 });
      telop(g, 'UVA：肌の老化', 140, 420, prog(t, T.uva, T.uva + 0.7), { size: 52 });
      telop(g, 'どちらも皮膚がんの原因', 140, 520, prog(t, T.hifu, T.hifu + 0.9), { size: 56, mincho: true });
      const kz = prog(t, T.l71, T.l71 + 0.7), BX = 140, BW = 760, BY = 640, BH = 60;
      const X = nm => BX + (nm - 100) / 300 * BW;
      if (kz > 0) {
        g.save(); stroke(g, '@faint', 3); g.setLineDash([8, 10]); g.globalAlpha = kz;
        const xa = rulerX(100e-9, RULER4), xb = rulerX(380e-9, RULER4);
        g.beginPath(); g.moveTo(BX, BY + BH); g.lineTo(xa, 786); g.moveTo(BX + BW, BY + BH); g.lineTo(xb, 786); g.stroke(); g.setLineDash([]); g.restore();
        UVS.forEach(([nm, a, b], i) => {
          const lit = nm === 'UVB' ? prog(t, T.uvb - 0.1, T.uvb + 0.4) : nm === 'UVA' ? prog(t, T.uva - 0.1, T.uva + 0.4) : 0, fl = Math.max(lit, nm === 'UVC' ? 0 : prog(t, T.hifu - 0.1, T.hifu + 0.4) * 0.6);
          g.save(); g.globalAlpha = kz; g.fillStyle = `rgba(237,232,223,${0.08 + 0.3 * fl})`; g.fillRect(X(a), BY, X(b) - X(a), BH);
          g.strokeStyle = ink('@ink'); g.lineWidth = 3; g.strokeRect(X(a), BY, X(b) - X(a), BH); g.restore();
          telop(g, nm, (X(a) + X(b)) / 2, BY + 42, kz, { size: 30, align: 'center', color: nm === 'UVC' ? '@dim' : '@ink' });
        });
      }
    });
    // ═════ 72 khí quyển: UVC chặn hẳn, UVB gần hết ═════
    grp(g, t, T.l72 - 0.1, T.l73 - 0.15, () => {
      const B1 = [1000, 1050], B2 = [1100, 1150], kb = prog(t, T.l72, T.l72 + 0.6);
      if (kb > 0) {
        for (const [x0, x1] of [B1, B2]) { g.save(); g.fillStyle = `rgba(154,149,140,${0.26 * kb})`; g.fillRect(x0, 280, x1 - x0, 440 * kb); stroke(g, '@faint', 3); g.strokeRect(x0, 280, x1 - x0, 440 * kb); g.restore(); }
        telop(g, '酸素', 1025, 262, prog(t, T.l72 + 0.2, T.l72 + 0.8), { size: 32, align: 'center', color: '@dim' });
        telop(g, 'オゾン層', 1125, 770, prog(t, T.ozon, T.ozon + 0.7), { size: 36, align: 'center' });
      }
      telop(g, 'UVC：酸素とオゾンが、すべて吸収', 140, 350, prog(t, T.uvc, T.uvc + 1.2), { size: 40 });
      arrow(g, [[140, 400], [990, 400]], outCubic(prog(t, T.uvc + 0.2, T.uvc + 1.5)), { color: '@ink', w: 6, head: 18 });
      telop(g, 'UVBも、大部分は止まる', 140, 520, prog(t, T.uvb72, T.uvb72 + 1.0), { size: 40 });
      const ku = outCubic(prog(t, T.uvb72 + 0.1, T.uvb72 + 1.6));
      arrow(g, [[140, 570], [1090, 570]], Math.min(1, ku * 1.15), { color: '@ink', w: 6, head: 18 });
      if (ku > 0.9) arrow(g, [[1160, 570], [1160 + 330 * clamp((ku - 0.9) * 10), 570]], 1, { color: '@dim', w: 4, head: 14 });
    });
    // ═════ 73 ong thấy tử ngoại ═════
    if (t >= T.l73 - 0.1) {
      const kp = prog(t, T.mitsu - 0.2, T.mitsu + 0.9);
      const box = photo(g, 'mimulus-uv', 140, 260, 380, kp);
      telop(g, 'ミツバチには、紫外線が見える', 960, 380, prog(t, T.mitsu, T.mitsu + 1.2), { size: 52 });
      const kr = prog(t, T.moyo, T.moyo + 0.8);
      if (kr > 0) { g.save(); g.strokeStyle = 'rgba(237,232,223,0.95)'; g.lineWidth = 4; g.beginPath(); g.ellipse(box.x + box.w * 0.75, box.y + box.h * 0.5, box.w * 0.19, box.h * 0.3, 0, -TAU / 4, -TAU / 4 + TAU * kr); g.stroke(); g.restore(); }
    }
  }
}
