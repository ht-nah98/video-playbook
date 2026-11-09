// f3 · 虹 (p2 câu 95–101). ERA sky (雨戸 mở một nửa ra trời sau mưa — tường trái có khung cửa sáng thay lỗ). Từ SF3.
//  95  雨粒/屈折/反射/色  giọt lớn (raindrop, tia Descartes đỏ 656 / tím 404.7) — vào, phản xạ, ra: 「屈折・反射・屈折」
//  96  背/影/円           giọt thu về góc; người đứng quay lưng Mặt Trời, bóng đầu = tâm; vòng tròn quanh bóng đầu
//  97  42度/40度/外側     cung đỏ NGOÀI (R ∝ 42.4°), cung tím TRONG (R ∝ 40.6°) — tỉ lệ thật từ descartes()
//  98  全部/一つ          một giọt tung quạt đủ màu; mỗi giọt (cao → đỏ, thấp → tím) chỉ một tia tới mắt (góc phóng ×KA, 「角度は強調」)
//  99  一色               nhiều giọt hơn → dải cầu vồng dọc
//  100 となり             người thứ hai: tia song song, từ những giọt KHÁC (dịch đúng vector giữa hai người)
//  101 副虹               cung phụ NGOÀI, thứ tự màu ĐẢO (descartes(nm, 2): 50.1° đỏ trong, 53.6° tím ngoài) + ảnh rainbow-double
import { C, W, H, WALL_X, FLOOR, clamp, prog, lookup, must, smooth, outCubic, outBack, TAU, wlCss, descartes, dropRay, ground, aperture,
  raindrop, ray, shaft, spot, chip, plate, angleArc, telop, title, photo, imgs, cue } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u, DEG = Math.PI / 180;
const NRED = 656, NVIO = 404.7;
const thR = descartes(NRED).theta, thV = descartes(NVIO).theta;
must(`'${Math.floor(thR)},${Math.floor(thV)}'`, '42,40');                      // 「およそ42°」「およそ40°」
const HS = [860, 950];                                                         // tâm cung = bóng đầu
// người + mắt
const PX = 250, FOOT = 952, PH = 250, HEADY = FOOT - PH + 28, EYE = [PX + 14, HEADY], PX2 = 380, EYE2 = [PX2 + 14, HEADY];
// hình học khớp nhãn: từ MẮT, hai đường nón lệch 42° (đỏ) / 40° (tím) khỏi trục mắt → bóng đầu; cung đi qua điểm cách mắt DCONE trên mỗi đường
const AX = Math.atan2(HS[1] - EYE[1], HS[0] - EYE[0]), DCONE = 700, aR = AX - Math.floor(thR) * DEG, aV = AX - Math.floor(thV) * DEG;
const PR = [EYE[0] + DCONE * Math.cos(aR), EYE[1] + DCONE * Math.sin(aR)], PV = [EYE[0] + DCONE * Math.cos(aV), EYE[1] + DCONE * Math.sin(aV)];
const RR = Math.hypot(PR[0] - HS[0], PR[1] - HS[1]), PXD = RR / thR;
const RAD = (nm, k = 1) => descartes(nm, k).theta * PXD;
must(`${RAD(NRED) > RAD(NVIO) && RAD(NRED, 2) < RAD(NVIO, 2) && RAD(NRED, 2) > RAD(NRED)}`, true);   // chính: đỏ ngoài; phụ: đảo, ở NGOÀI chính
must(`${Math.abs(Math.hypot(PV[0] - HS[0], PV[1] - HS[1]) / RR - RAD(NVIO) / RAD(NRED)) < 0.01}`, true);  // hai cung qua hai đường nón khớp tỉ lệ thật
// giọt (sơ đồ C): góc tới mắt phóng ×KA quanh trung bình 41.55° (thật: 40.6–42.5° → chênh chỉ 1.9°)
const KA = 8, XD = 700, MEAN = (thR + thV) / 2;
const thA = nm => MEAN + (descartes(nm).theta - MEAN) * KA;
const yOf = (nm, x = XD, eye = EYE) => eye[1] - (x - eye[0]) * Math.tan(thA(nm) * DEG);
const MAIN = [700, 600, 540, 480, 420], MORE = [660, 570, 510, 450, 405, 640, 560, 470];
must(`${MAIN.every((n, i) => i === 0 || yOf(n) > yOf(MAIN[i - 1]))}`, true);   // cao → đỏ, thấp → tím
const SHIFT = EYE2[0] - EYE[0];

const drop = (g, x, y, r, k = 1) => { if (k <= 0) return; const e = outBack(clamp(k)), rr = r * e;
  g.save(); g.fillStyle = 'rgba(180,190,200,0.16)'; g.strokeStyle = 'rgba(210,214,218,0.8)'; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill(); g.stroke(); g.restore(); };
function person(g, x, foot, h, k, a = 1) {
  if (k <= 0) return; const e = outBack(clamp(k)), hh = h * e;
  g.save(); g.globalAlpha = a; g.fillStyle = '#C4BFB5'; const hy = foot - hh + 28;
  g.beginPath(); g.arc(x, hy, 28, 0, TAU); g.fill();
  g.beginPath(); g.roundRect(x - 30, hy + 34, 60, hh * 0.42, 14); g.fill();
  g.fillRect(x - 26, foot - hh * 0.30, 22, hh * 0.30); g.fillRect(x + 4, foot - hh * 0.30, 22, hh * 0.30);
  g.fillStyle = '#23211F'; g.beginPath(); g.arc(x + 14, hy - 3, 4.5, 0, TAU); g.fill();            // mắt (nhìn sang phải)
  g.restore();
}
function arcBand(g, R, k, nm, { w = 10, a = 0.95 } = {}) {                     // một cung (nửa trên) từ chân trái sang chân phải theo k
  if (k <= 0) return;
  g.save(); g.lineCap = 'butt'; g.strokeStyle = wlCss(nm, a); g.lineWidth = w; g.beginPath(); g.arc(HS[0], HS[1], R, Math.PI, Math.PI + clamp(k) * Math.PI); g.stroke(); g.restore();
}
// cầu vồng ĐỦ DẢI: nhiều cung wlCss, mỗi cung một bước sóng (nm từ lo tới hi); kind 1 chính / 2 phụ
function bow(g, kind, k, lo, hi, w = 7, a = 0.9) {
  if (k <= 0) return;
  const step = 6, N = Math.round((hi - lo) / step);
  for (let i = 0; i <= N; i++) { const nm = lo + (hi - lo) * i / N; arcBand(g, RAD(nm, kind), k, nm, { w, a }); }
  g.save(); g.globalCompositeOperation = 'lighter'; g.lineWidth = 36; g.strokeStyle = 'rgba(255,255,255,0.05)'; g.beginPath();
  g.arc(HS[0], HS[1], (RAD(lo, kind) + RAD(hi, kind)) / 2, Math.PI, Math.PI + clamp(k) * Math.PI); g.stroke(); g.restore();
}
function wallSky(g, y, open) {                                                 // tường 雨戸 bên trái, khung cửa mở nhìn ra trời
  g.save(); g.fillStyle = '#0E0C09'; g.fillRect(0, 0, WALL_X, H); g.fillStyle = 'rgba(237,232,223,0.05)'; g.fillRect(WALL_X - 2, 0, 2, H); g.restore();
  aperture(g, 'window', { y, open });
}

export default class F3 {
  static ERA = 'sky';
  static IMAGES = imgs('rainbow-double');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3-niji');
    this.START = L(95).start;
    this.FROM = Math.max(this.START - 1.2, L(94).end + 0.5);
    this.T = {
      title: this.FROM + 0.3,
      l95: L(95).start, ame: w(95, '雨粒'), kussetsu: w(95, '屈折'), hansha: w(95, '反射'), iro95: w(95, '色'), e95: L(95).end,
      l96: L(96).start, se: w(96, '背'), kage: w(96, '影'), en: w(96, '円'),
      l97: L(97).start, y42: w(97, '42度'), y40: w(97, '40度'), soto: w(97, '外側'),
      l98: L(98).start, zenbu: w(98, '全部'), me98: w(98, '目'), hitotsu: w(98, '一つ'),
      l99: L(99).start, isshoku: w(99, '一色'), ippon: w(99, '一本'),
      l100: L(100).start, ame100: w(100, '雨粒'), tonari: w(100, 'となり'), e100: L(100).end,
      l101: L(101).start, fuku: w(101, '副虹'), nigyaku: w(101, '逆'),
    };
    this.T.photoAt = (this.T.fuku + this.T.nigyaku) / 2;
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.ame, 'water'), cue(T.iro95 + 0.2, 'telop'), cue(T.se, 'step', -6),
      cue(T.kage, 'telop'), cue(T.y42, 'step'), cue(T.y40, 'step'), cue(T.soto, 'telop'),
      cue(T.l98, 'step', -6), cue(T.zenbu, 'spectrum'), cue(T.me98 - 0.2, 'beam', -6), cue(T.hitotsu + 0.2, 'telop'),
      cue(T.isshoku, 'spectrum'), cue(T.ippon, 'step', -6),
      cue(T.tonari, 'step'), cue(T.ame100, 'beam', -6),
      cue(T.l101 - 0.1, 'spectrum'), cue(T.fuku + 0.7, 'beam', -6), cue(T.photoAt, 'photo'), cue(T.nigyaku + 0.1, 'step'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'sky');
    const sh = smooth(prog(t, T.l96 - 0.3, T.l96 + 0.7));                      // giọt lớn → giọt nhỏ ở góc
    const tOut = prog(t, T.l98 - 0.3, T.l98 + 0.4);                            // giọt nhỏ biến mất (sang sơ đồ C)
    const dcx = lerp(700, 330, sh), dcy = lerp(470, 330, sh), dR = lerp(270, 80, sh) * (1 - smooth(tOut));
    const iyA = dcy + dR * dropRay(NRED).pts[0][1];
    const kC = smooth(prog(t, T.l98 - 0.2, T.l98 + 0.4));
    const holeY = lerp(iyA, 335, kC);
    wallSky(g, dR > 12 || kC < 1 ? holeY : 335, prog(t, F + 0.3, F + 1.0));

    // ═════ A + B-small: giọt ═════
    const tBody = Math.min(T.ame, F + 0.9), kBody = prog(t, tBody, tBody + 0.7);
    if (dR > 12) {
      if (t < T.kussetsu + 0.8) shaft(g, 92, iyA, 520, iyA - 34, 520, iyA + 34, { a: 0.07, k: prog(t, F + 0.5, F + 1.7), t, dust: 30, spot: false, seed: 7 });
      else raindrop(g, dcx, dcy, dR, { nms: [NRED, NVIO], outLen: lerp(640, 120, sh), w: sh > 0.5 ? 4 : 5, body: outCubic(kBody),
        k1: prog(t, T.kussetsu, T.kussetsu + 0.8), k2: prog(t, T.hansha, T.hansha + 0.9), k3: prog(t, T.iro95, T.iro95 + 1.0) });
    }
    const a95 = 1 - sh;
    if (a95 > 0.02 && kBody > 0) {
      telop(g, '雨粒', dcx, dcy - dR - 24, prog(t, T.ame, T.ame + 0.5), { size: 32, weight: 500, color: '@dim', align: 'center' });
      telop(g, '太陽の光', 140, iyA + 70, prog(t, T.kussetsu, T.kussetsu + 0.5), { size: 30, weight: 500, color: '@dim' });
    }
    const sl95 = outCubic(prog(t, T.l96 - 0.2, T.l96 + 0.45)) * 900;
    if (sl95 < 899) { g.save(); g.translate(sl95, 0); telop(g, '屈折・反射・屈折', 1200, 300, prog(t, T.hansha, T.hansha + 1.2), { size: 56, mincho: true }); g.restore(); }

    // ═════ B: người, bóng đầu, vòng tròn, cung ═════
    const kRetract = 1 - smooth(prog(t, T.l98 - 0.3, T.l98 + 0.3));            // B rút đi khi sang sơ đồ C
    const bAlive = t > T.se - 0.1;
    if (bAlive) {
      person(g, PX, FOOT, PH, prog(t, T.se, T.se + 0.6));
      const kS = prog(t, T.kage - 0.4, T.kage + 0.5);
      if (kS > 0) {
        g.save(); g.fillStyle = 'rgba(0,0,0,0.5)'; g.beginPath(); g.moveTo(PX, 946); g.lineTo(PX + (HS[0] - PX - 36) * kS, 943); g.lineTo(PX + (HS[0] - PX) * kS, 950);
        g.lineTo(PX + (HS[0] - PX - 36) * kS, 958); g.lineTo(PX, 954); g.closePath(); g.fill();
        if (kS >= 1) { g.beginPath(); g.ellipse(HS[0], HS[1], 34, 11, 0, 0, TAU); g.fill(); } g.restore();
      }
      const kDash = prog(t, T.kage + 0.2, T.kage + 1.0) * kRetract;
      if (kDash > 0.001) { g.save(); g.setLineDash([12, 10]); g.strokeStyle = 'rgba(237,232,223,0.7)'; g.lineWidth = 3; g.beginPath();
        g.moveTo(EYE[0], EYE[1]); g.lineTo(EYE[0] + (HS[0] - EYE[0]) * kDash, EYE[1] + (HS[1] - EYE[1]) * kDash); g.stroke(); g.restore(); }
      // vòng tròn (nét đứt trung tính) → cung đỏ / tím
      const kRing = prog(t, T.en, T.en + 1.3) * kRetract, kR = prog(t, T.y42, T.y42 + 1.1), kV = prog(t, T.y40, T.y40 + 1.1);
      if (kRing > 0 && kR < 1 && t < T.l98) { g.save(); g.setLineDash([14, 12]); g.strokeStyle = 'rgba(237,232,223,0.55)'; g.lineWidth = 3; g.beginPath(); g.arc(HS[0], HS[1], RR - 6, Math.PI, Math.PI + kRing * Math.PI); g.stroke(); g.restore(); }
      const sweepR = t < T.l98 ? kR * kRetract : prog(t, T.l101 - 0.2, T.l101 + 0.9);
      const sweepV = t < T.l98 ? kV * kRetract : prog(t, T.l101 - 0.1, T.l101 + 1.0);
      bow(g, 1, sweepV, 405, 540);                                           // lam–tím–lục: theo 40°
      bow(g, 1, sweepR, 546, 700);                                           // vàng–cam–đỏ: theo 42°
      const kLine = prog(t, T.y42, T.y42 + 0.8) * (t < T.l98 ? kRetract : 0);   // hai đường nón từ MẮT (42° / 40° khỏi trục mắt → bóng đầu)
      if (kLine > 0 && t < T.l98 + 0.4) {
        g.save(); g.setLineDash([10, 9]); g.strokeStyle = 'rgba(237,232,223,0.6)'; g.lineWidth = 2.5;
        g.beginPath(); g.moveTo(EYE[0], EYE[1]); g.lineTo(EYE[0] + (PR[0] - EYE[0]) * kLine, EYE[1] + (PR[1] - EYE[1]) * kLine); g.stroke();
        if (kV > 0) { g.beginPath(); g.moveTo(EYE[0], EYE[1]); g.lineTo(EYE[0] + (PV[0] - EYE[0]) * kV * kRetract, EYE[1] + (PV[1] - EYE[1]) * kV * kRetract); g.stroke(); }
        g.restore(); angleArc(g, EYE, AX, aR, 150, kLine, { color: '@ink', w: 3 }); if (kV > 0) angleArc(g, EYE, AX, aV, 110, kV * kRetract, { color: '@ink', w: 3 });
      }
      // cung phụ (D)
      const kF = prog(t, T.fuku, T.fuku + 1.3);
      bow(g, 2, kF, 405, 700, 5, 0.6);
      if (t > T.l101 - 0.3) person(g, PX, FOOT, PH, 1);                       // người đứng TRƯỚC cung phụ

      // chữ cột phải (B): 「自分の頭の影が中心」 → nhãn cung
      const rx = outCubic(prog(t, T.l98 - 0.3, T.l98 + 0.4)) * 900;
      if (rx < 899 && t < T.l98 + 0.5) {
        g.save(); g.translate(rx, 0);
        telop(g, '自分の頭の影が中心', 1380, 300, prog(t, T.kage, T.kage + 1.0), { size: 44 });
        if (kR > 0) { chip(g, 1396, 408, NRED, 13, kR); telop(g, `赤　およそ${Math.floor(thR)}°`, 1428, 422, kR, { size: 44 }); }
        if (kV > 0) { chip(g, 1396, 488, NVIO, 13, kV); telop(g, `紫　およそ${Math.floor(thV)}°`, 1428, 502, kV, { size: 44 }); }
        telop(g, '外側が赤、内側が紫', 1380, 590, prog(t, T.soto, T.soto + 1.0), { size: 40, mincho: true });
        g.restore();
      }
    }

    // ═════ C: giọt cao → đỏ, thấp → tím, mỗi giọt một tia tới mắt ═════
    const cIn = t > T.l98 - 0.1, cOut = outCubic(prog(t, T.l101 - 0.3, T.l101 + 0.5)) * 1400;
    if (cIn && cOut < 1399) {
      g.save(); g.translate(cOut, 0);
      const kSh = prog(t, T.l98 + 0.3, T.l98 + 1.3);
      shaft(g, 92, 335, XD, 196, XD, 440, { a: 0.07, k: kSh, t, dust: 50, spot: false, seed: 11 });
      const mid = MAIN[2], kFan = prog(t, T.zenbu - 0.1, T.zenbu + 1.0), fanGone = 1 - smooth(prog(t, T.hitotsu - 0.1, T.hitotsu + 0.5));
      const dotsK = prog(t, T.hitotsu, T.hitotsu + 1.2), dim2 = t > T.tonari - 0.2 ? 0.55 : 1;
      // quạt đủ màu của MỘT giọt (giữa)
      if (kFan > 0 && fanGone > 0.01) {
        for (const nm of [700, 640, 600, 560, 520, 480, 440, 405]) {
          const a = thA(nm) * DEG, L = 210 * fanGone;
          ray(g, [[XD, yOf(mid)], [XD - Math.cos(a) * L, yOf(mid) + Math.sin(a) * L]], { nm, w: 4, k: kFan, a: 0.7, glow: 0.5 });
        }
      }
      if (t > T.me98 - 0.1 && t < T.hitotsu) ray(g, [[XD, yOf(mid)], EYE], { nm: mid, w: 5, k: prog(t, T.me98, T.me98 + 0.8), a: 0.95 });
      const drops = (nms, x, eye, k, R, alpha) => nms.forEach((nm, i) => {
        const y = yOf(nm, x, eye), kk = clamp(k * nms.length - i * 0.6) ;
        if (kk <= 0) return; drop(g, x, y, R, kk);
        ray(g, [[x, y], eye], { nm, w: 4, k: kk, a: alpha, glow: 0.6 });
      });
      drops(MAIN, XD, EYE, t < T.hitotsu ? kFan : 1, 15, 0.9 * dim2);
      // 99: thêm giọt + dải dọc
      const kMore = prog(t, T.isshoku, T.isshoku + 1.2);
      if (kMore > 0) {
        const ys = [...MAIN, ...MORE].map(n => yOf(n)), yt = Math.min(...ys), yb = Math.max(...ys), gr = g.createLinearGradient(0, yt, 0, yb);
        [...MAIN, ...MORE].sort((a, b) => b - a).forEach(nm => gr.addColorStop(clamp((yOf(nm) - yt) / (yb - yt)), wlCss(nm, 0.55)));
        g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(XD + 34, yt - 6, 22 * outCubic(kMore) * (1 + prog(t, T.ippon, T.ippon + 0.6)), yb - yt + 12); g.restore();
        drops(MORE, XD, EYE, kMore, 9, 0.55 * dim2);
      }
      // 100: người thứ hai + tia song song từ giọt KHÁC (dịch đúng vector giữa hai người)
      const kP2 = prog(t, T.tonari - 0.1, T.tonari + 0.6);
      if (kP2 > 0) { person(g, PX2, FOOT, PH, kP2);
        const kk = prog(t, T.tonari + 0.3, T.tonari + 1.5);
        drops(MAIN, XD + SHIFT, EYE2, kk, 15, 0.9); }
      // chữ cột phải (C)
      const slide = (a, o) => { const s = o == null ? 0 : outCubic(prog(t, o, o + 0.4)) * 900; return s; };
      const rows = [
        [T.zenbu, T.hitotsu - 0.1, 300, 'どの雨粒も、全部の色を送り出す'], [T.hitotsu, T.l99 - 0.1, 300, '目に届くのは、', '位置で決まる一色だけ'],
        [T.isshoku, T.l100 - 0.1, 300, 'たくさんの雨粒が、一色ずつ'], [T.tonari, null, 300, 'となりの人は、', '別の雨粒の、別の虹'],
      ];
      for (const [a, o, y, l1, l2] of rows) {
        if (t < a - 0.05) continue; const s = slide(a, o); if (s > 899) continue;
        g.save(); g.translate(s, 0); telop(g, l1, 1100, y, prog(t, a, a + 0.8), { size: 44 }); if (l2) telop(g, l2, 1100, y + 62, prog(t, a + 0.3, a + 1.1), { size: 44 }); g.restore();
      }
      if (t > T.hitotsu) telop(g, '角度は強調', 1100, 560, prog(t, T.hitotsu + 0.6, T.hitotsu + 1.2), { size: 30, weight: 500, color: '@dim' });
      g.restore();
    }

    // ═════ D: chữ 副虹 + ảnh ═════
    if (t > T.fuku - 0.3) {
      telop(g, '副虹：2回反射、色の順が逆', 140, 262, prog(t, T.fuku - 0.1, T.fuku + 1.0), { size: 46, mincho: true });
      photo(g, 'rainbow-double', 1330, 230, 250, prog(t, T.photoAt - 0.05, T.photoAt + 0.95), { labelSize: 30, align: 'right' });
      const kc = prog(t, T.nigyaku, T.nigyaku + 0.6);
      if (kc > 0) { chip(g, 1500, 722, NRED, 12, kc); telop(g, '内側が赤', 1528, 736, kc, { size: 36 }); chip(g, 1500, 790, NVIO, 12, kc); telop(g, '外側が紫', 1528, 804, kc, { size: 36 }); }
    }
    title(g, '虹', t, T.title);
  }
}
