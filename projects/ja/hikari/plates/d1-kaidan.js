// d1 · エネルギーの階段 (p2 câu 41–48) — mở hồi 3 「光はどこで生まれるのか」, ERA lab, khe 'slit' y = 360.
//  A (41–45) ①② · ladder hydro · electron nhảy 2→3 rồi rơi 3→2 (656) · rơi 4/5/6→2 (486/434/410): bậc lớn = λ ngắn
//  B (46)    thang thu nhỏ trái · ba dải vạch H / Na / Ne = "dấu vân tay" của nguyên tử
//  C (47)    ảnh ống neon + đèn natri trong hầm, mỗi ảnh cạnh dải vạch của nó
//  D (48)    màn hình + điện thoại: ba chấm sáng 650 / 530 / 450 — LED cùng họ
import { C, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, aperture, shaft, ray, photon, ladder, ladderDrop, spectrumStrip, chip, arrow,
  telop, title, actCard, actCues, actTimes, plate, photo, imgs, measure, cue, fmt, H_LINES, NA_LINES, NE_LINES, HLEV, HC, JP, MIN } from '../kit.js';

must(`'${H_LINES.map(n => fmt(n)).join(',')}'`, '656,486,434,410');
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const Y0 = 360;                                   // khe
const LAD = { x: 360, w: 420, y0: 230, sc: 150, gap: 150 };       // THANG mặc định kit
const DROPS = [[3, 60], [4, 140], [5, 220], [6, 300]];             // [n, xo]; luôn rơi về n = 2
const nmOf = n => HC / (HLEV(n) - HLEV(2));

function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return null;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  return telop(g, s, x, y, k, o);
}
const dot = (g, x, y, a = 1, r = 11) => {
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = `rgba(246,242,234,${0.16 * a})`; g.beginPath(); g.arc(x, y, r * 2.6, 0, TAU); g.fill(); g.restore();
  g.save(); g.fillStyle = `rgba(237,232,223,${a})`; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
};
function screen(g, x, y, w, h, k, t) {          // màn hình nét trung tính + ba chấm sáng
  if (k <= 0) return;
  g.save(); g.globalAlpha *= Math.min(1, k * 2); g.strokeStyle = C.text; g.lineWidth = 5; g.lineJoin = 'round';
  g.fillStyle = 'rgba(20,19,23,0.9)'; g.beginPath(); g.roundRect(x, y, w, h, 14); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(x + w / 2 - 20, y + h); g.lineTo(x + w / 2 - 40, y + h + 56); g.lineTo(x + w / 2 + 40, y + h + 56); g.lineTo(x + w / 2 + 20, y + h); g.stroke();
  g.beginPath(); g.moveTo(x + w / 2 - 90, y + h + 56); g.lineTo(x + w / 2 + 90, y + h + 56); g.stroke();
  g.restore();
  [650, 530, 468].forEach((nm, i) => chip(g, x + w * (0.2 + 0.3 * i), y + h / 2, nm, 30, clamp(k * 1.6 - i * 0.4)));
}
function phone(g, x, y, w, h, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha *= Math.min(1, k * 2); g.strokeStyle = C.text; g.lineWidth = 5; g.fillStyle = 'rgba(20,19,23,0.9)';
  g.beginPath(); g.roundRect(x, y, w, h, 26); g.fill(); g.stroke(); g.restore();
  [650, 530, 468].forEach((nm, i) => chip(g, x + w / 2, y + h * (0.25 + 0.25 * i), nm, 18, clamp(k * 2 - i * 0.4)));
}

export default class Kaidan {
  static ERA = 'lab';
  static IMAGES = imgs('tube-ne', 'sodium-street');
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1-kaidan');
    this.START = L(41).start;
    this.FROM = Math.max(this.START - 2.6, L(40).end + 0.5);    // mở hồi: lead 2.6
    this.T = {
      futatsu: w(41, '2つ'), hitotsu: w(42, '1つ目'), kaidan: w(42, '階段'), kimatta: w(43, '決まった'), dan: w(43, '段'),
      tobi: w(44, '跳び上がった'), modori: w(44, '戻り'), sadan: w(44, '段差'), koshi: w(44, '光子'),
      ookii: w(45, '大きい'), mijikai: w(45, '短い'),
      hara: w(46, '原子ごと'), chigau: w(46, 'ちがう'), iro: w(46, '色'), shimon: w(46, '指紋'), end46: L(46).end,
      neon: w(47, 'ネオン', 1), neon2: w(47, 'ネオン', 2), tonneru: w(47, 'トンネル'), natoriumu: w(47, 'ナトリウム'),
      led: w(48, 'led'), sumato: w(48, 'スマート'), nakama: w(48, '仲間'),
    };
    must(`'${DROPS.map(([n]) => fmt(nmOf(n))).join(',')}'`, '656,486,434,410');
    // lịch rơi: [n, xo, t0] — 3→2 theo 戻り, 4/5/6→2 nối nhau ~0.5 s từ 大きい
    const T = this.T;
    this.D = DROPS.map(([n, xo], j) => [n, xo, j === 0 ? T.modori : T.ookii + 0.45 * (j - 1)]);
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.futatsu + 0.1, 'card'),             // ① ② hiện
      cue(T.kaidan, 'step'),                    // thang
      cue(T.kimatta, 'telop', -4),              // 「決まった…段にしか」
      cue(T.kimatta + 2.2, 'step', -5),         // electron yên ở n = 2
      cue(T.tobi, 'step', -4),                  // electron nhảy lên
      cue(T.modori + 0.4, 'photon'),            // rơi, bó photon bay ra
      cue(T.koshi + 0.3, 'photon', -5),         // 「段差の分 ＝ 光子1個」
      cue(T.mijikai, 'step', -5),
      cue(T.ookii + 0.45, 'photon', -4),        // 4→2, 5→2, 6→2 (nối)
      cue(T.hara, 'spectrum', -3),              // dải H
      cue(T.shimon, 'card', -4),                // 「原子ごとの指紋」
      cue(T.neon, 'photo'), cue(T.tonneru, 'photo'),
      cue(T.natoriumu, 'telop', -4),
      cue(T.led, 'beam', -3),                   // ba chấm sáng
    ];
  }
  /** Vị trí electron (chấm sáng) theo lịch: hiện ở n = 2, nhảy lên 3, rơi về 2, rồi các lần 4/5/6 → 2. */
  edot(L, t) {
    const T = this.T, y2 = L.y(2), y3 = L.y(3);
    let x = 420, y = y2;
    if (t >= T.tobi) { const u = clamp((t - T.tobi) / 0.55); y = y2 + (y3 - y2) * outCubic(u); }
    for (const [n, xo, t0] of this.D) {
      if (t < t0) continue;
      const u = clamp((t - t0) / 0.45), ya = L.y(n);
      x = L.x + xo; y = n === 3 ? y3 + (y2 - y3) * u * u : ya + (y2 - ya) * u * u;
    }
    return [x, y];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START, A = actTimes(F, S);
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0, open: smooth(prog(t, F, F + 0.5)) });
    const kBeam = prog(t, F + 0.1, F + 1.4);
    shaft(g, 92, Y0, 1800, 150, 1800, 900, { a: 0.05, k: kBeam, t, dust: 60, seed: 3, spot: false });
    actCard(g, t, F, S, 3);
    title(g, 'エネルギーの階段', t, A.o1 - 0.2, { act: 3 });

    // ═══ A · câu 41–45 ═══
    const oA = out(t, T.hara - 0.6, 0.6);
    if (oA < 1) {
      g.save(); g.globalAlpha = 1 - oA;
      // chùm chạm thang
      ray(g, [[98, Y0], [LAD.x - 12, Y0]], { nm: 'white', w: 5, k: outCubic(prog(t, F + 0.4, F + 1.7)), a: 0.9 * (1 - out(t, T.kaidan + 0.4, 0.6)) });
      // nhãn ① ② (② '@dim' — d3 dùng lại đúng chữ này)
      row(g, '①　電子の階段', 1000, 300, prog(t, T.futatsu + 0.05, T.futatsu + 0.9), { size: 56, mincho: true });
      row(g, '②　熱', 1000, 380, prog(t, T.futatsu + 0.5, T.futatsu + 1.1), { size: 56, mincho: true, color: '@dim' });
      // thang
      const kL = prog(t, T.kaidan, T.kaidan + 1.5);
      const L = ladder(g, { ...LAD, k: kL });
      if (kL >= 1) {
        // câu 43: electron ở n = 2
        row(g, '決まったエネルギーの段にしか、いられない', 900, 700, prog(t, T.kimatta, T.kimatta + 1.4) * (1 - out(t, T.ookii - 0.2, 0.5)), { size: 44 });
        const ke = prog(t, T.kimatta, T.kimatta + 0.5);
        const [ex, ey] = this.edot(L, t);
        if (ke > 0) dot(g, ex, ey, ke);
        // câu 44: nhảy lên (mũi tên trung tính), rơi 3→2
        const ku = prog(t, T.tobi, T.tobi + 0.55) * (1 - out(t, T.modori - 0.1, 0.3));
        if (ku > 0) arrow(g, [[LAD.x + 60 + 26, L.y(2) - 10], [LAD.x + 60 + 26, L.y(3) + 18]], ku, { color: '@ink', w: 4 });
        row(g, '段差の分　＝　光子1個', 900, 800, prog(t, T.sadan, T.sadan + 1.0) * (1 - out(t, T.ookii - 0.2, 0.5)), { size: 48, mincho: true });
        row(g, '段差が大きいほど、波長が短い', 900, 700, prog(t, T.ookii, T.ookii + 1.4), { size: 52, mincho: true });
        // các cú rơi + photon bay ra + mục nm
        this.D.forEach(([n, xo, t0], j) => {
          const k = prog(t, t0, t0 + 0.45), nm = ladderDrop(g, L, n, 2, xo, k);
          if (k >= 1) {
            const u = t - (t0 + 0.45), px = LAD.x + xo + 30 + 760 * u, y = (L.y(n) + L.y(2)) / 2;
            const a = clamp(Math.min(u / 0.2, (1830 - px) / 160));
            if (u >= 0 && a > 0) photon(g, px, y, nm, { size: 50, amp: 14, phase: -t * 9, a });
            const ex = 940 + 240 * j, ke2 = prog(t, t0 + 0.45, t0 + 1.0);
            if (ke2 > 0) { chip(g, ex, 450, nm, 12, ke2); telop(g, `${fmt(nm)} nm`, ex + 26, 462, ke2, { size: 36 }); }
          }
        });
      }
      g.restore();
    }

    // ═══ B · câu 46 — dấu vân tay ═══
    const oB = out(t, T.neon - 0.1, 0.6), kB = prog(t, T.hara - 0.5, T.hara + 0.3);
    if (kB > 0 && oB < 1) {
      g.save(); g.globalAlpha = 1 - oB;
      ladder(g, { x: 140, w: 130, y0: 230, sc: 45, gap: 50, labels: false, k: smooth(kB) });
      const rows = [['水素', 470, H_LINES, T.hara], ['ナトリウム', 600, NA_LINES, T.chigau], ['ネオン', 730, NE_LINES, T.iro]];
      rows.forEach(([name, y, lines, tt], i) => {
        const k = prog(t, tt - 0.1, tt + 1.0);
        telop(g, name, 140, y + 44, prog(t, tt - 0.1, tt + 0.6), { size: 40 });
        spectrumStrip(g, 360, y, 1200, 56, { continuous: false, lines, k, ticks: i === 2 ? [400, 500, 600, 700] : null });
      });
      row(g, '原子ごとの指紋', 140, 940, prog(t, T.hara + 0.2, T.hara + 1.3), { size: 64, mincho: true });
      g.restore();
    }

    // ═══ C · câu 47 — ảnh ═══
    const oC = out(t, T.led - 0.3, 0.6);
    if (t > T.neon - 0.4 && oC < 1) {
      g.save(); g.globalAlpha = 1 - oC;
      const kn = prog(t, T.neon, T.neon + 1.2), kt = prog(t, T.tonneru, T.tonneru + 1.2);
      photo(g, 'tube-ne', 140, 215, 240, kn);
      row(g, 'ネオンサインの赤', 460, 330, prog(t, T.neon, T.neon + 0.9), { size: 48 });
      row(g, '＝　ネオン原子の色', 460, 400, prog(t, T.neon2, T.neon2 + 0.9), { size: 48, mincho: true });
      spectrumStrip(g, 1100, 300, 700, 56, { continuous: false, lines: NE_LINES, k: prog(t, T.neon + 0.4, T.neon + 1.4) });
      photo(g, 'sodium-street', 140, 590, 240, kt);
      row(g, 'ナトリウムランプのオレンジ', 460, 705, prog(t, T.tonneru, T.tonneru + 0.9), { size: 44 });
      row(g, '＝　ナトリウム原子の色', 460, 775, prog(t, T.natoriumu, T.natoriumu + 0.9), { size: 44, mincho: true });
      spectrumStrip(g, 1100, 690, 700, 56, { continuous: false, lines: NA_LINES, k: prog(t, T.tonneru + 0.4, T.tonneru + 1.4) });
      g.restore();
    }

    // ═══ D · câu 48 — LED, màn hình ═══
    if (t > T.led - 0.2) {
      screen(g, 700, 280, 640, 360, prog(t, T.led, T.led + 0.9), t);
      phone(g, 1450, 330, 170, 360, prog(t, T.sumato, T.sumato + 0.9));
      row(g, 'LEDやスマホの画面も、この仲間', 700, 880, prog(t, T.led, T.led + 1.4), { size: 52, mincho: true });
    }
  }
}
