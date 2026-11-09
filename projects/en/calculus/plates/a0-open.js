// a0 · Cold open = TOÀN BỘ p1 (câu 0–12) — DNA survey. Khung 0.5 s (trang) = THUMBNAIL đang chuyển động (PACKAGING §0b):
// sườn đồi y = x² (chén, sườn phải), người đi bộ đứng trên MỘT điểm sáng (1, 1), sào ngắm lơ lửng ngay trên điểm, quạt dây
// đo khép về sào, chữ 「0 ÷ 0 = 2?」. Ba khung nối bằng THƯỚC DÂY kéo ngang nội bộ (kit.tapeSwap, như trang làm giữa cảnh cùng ERA):
//  S1 SƯỜN ĐỒI (câu 0–7), một camera liền: VIEWS.open → zoom (câu 5, "shape the hill") → area (câu 7, "run… backwards").
//     câu 0  thumbnail; sào hạ chạm điểm ở "spot".  câu 1  cọc thứ hai (x = 1.6) cắm ở "measure"; "rise" vẽ đoạn RISE, "run"
//     vẽ RUN, chữ lớn RISE ÷ RUN gõ ra; "across" nhún RUN.  câu 2  thẻ START / FINISH; "single" → cọc trượt về điểm, tam giác
//     co mất.  câu 3  "zero" ×2 → thẻ RISE = 0, RUN = 0; "zero divided by zero" → 「0 ÷ 0」 + "= ?"; "nothing" → nứt, xám.
//     câu 4  ảnh trang Nova Methodus 1684 trượt vào; thẻ IMPOSSIBLE, CALCULUS.  câu 5  "twist" dọn; "nothing" điểm phồng;
//     "shape" camera zoom vào (1, 1) (DNA §1a), người đi bộ lùi xuống dốc; "y" → thẻ y = x²; "one" → thẻ (1, 1); "steepness…
//     exactly" bốn dây đo x = 2, 1.5, 1.1, 1.01 lóe lần lượt, số dốc 3 · 2.5 · 2.1 · 2.01 ghi ra; "exactly" sào hạ xuống chạm
//     đúng một điểm; "two" → 「= 2」 đỏ.  câu 6  thẻ "≈ 2" bật, bút gạch ở "exactly".  câu 7  camera lùi về trắc dọc 0…1; "adds"
//     4 cột đất (phần thừa tím), "many" 10, "thin" 100; "exact" phần thừa tan, "area" → đất đặc + "area = ⅓" (khung đẹp
//     nhất); "archimedes" ảnh Fetti 1620 + nhãn; "more than two thousand" thẻ.
//  S2 BA CÂU HỎI (câu 8–11): ba ô chờ nét đứt → ba thẻ lời hứa rơi đúng "one / two / three" (kit.promiseCard): ① dốc + sào
//     chạm một điểm · ② 0/0 + đường thủng lỗ · ③ đồng xu hai mặt lật ở "areas / derivatives / integrals".
//  S3 BẮT ĐẦU (câu 12): VIEWS.bowl — đồi vẽ dần, cọc (1, 1) ở "slope", cọc (2, 4) ở "two", dây nối ở "points"; rồi mọi thứ
//     rút đi → khung cuối p1 = kit.bare() (DNA §6) — p2 b01 mở từ đúng khung đó.
// Mascot NÓI suốt p1: ponder (câu 0–4, trên đồi cỏ gần) → pointer (từ "twist"); ≤ 262 px, góc dưới trái, vẽ sau cùng.
import { H, C, AR, MO, clamp, lerp, prog, lookup, must, outCubic, outBack, ground, bare, hill, mound, rangingPole, secant, rod, spot, hiker,
  card, columns, areaFill, photo, photoImages, promiseCard, figure, tapeSwap, text, math, frac, measure, pen, line, rr, VIEWS, lerpView,
  STEPS, RIEMANN, sq, fmt, PROMISE, view } from '../kit.js';

const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const nudge = (t, a) => 1 + 0.16 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const BIG = `900 168px ${AR}`, MID = `900 112px ${AR}`;

export default class Open {
  static ERA = 'field';
  static IMAGES = photoImages('nova', 'archimedes');
  static POSES = ['ponder', 'pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      spot0: w(0, 'spot'), foot0: w(0, 'foot'),
      l1: S(1), measure1: w(1, 'measure'), rise1: w(1, 'rise'), run1: w(1, 'run'), higher1: w(1, 'higher'), across1: w(1, 'across'),
      two2: w(2, 'two'), start2: w(2, 'start'), finish2: w(2, 'finish'), single2: w(2, 'single'), neither2: w(2, 'neither'),
      l3: S(3), zeroA3: w(3, 'zero', 1), zeroB3: w(3, 'zero', 2), zeroC3: w(3, 'zero', 3), zeroD3: w(3, 'zero', 4), means3: w(3, 'means'), nothing3: w(3, 'nothing'),
      l4: S(4), centuries4: w(4, 'centuries'), impossible4: w(4, 'impossible'), calculus4: w(4, 'calculus'),
      twist5: w(5, 'twist'), nothing5: w(5, 'nothing'), shape5: w(5, 'shape'), curve5: w(5, 'curve'), y5: w(5, 'y'), one5: w(5, 'one'),
      steep5: w(5, 'steepness'), there5: w(5, 'there'), is5: w(5, 'is', 2), exactly5: w(5, 'exactly'), two5: w(5, 'two'),
      roughly6: w(6, 'roughly'), exactly6: w(6, 'exactly'), two6: w(6, 'two', 2),
      run7: w(7, 'run'), back7: w(7, 'backwards'), adds7: w(7, 'adds'), many7: w(7, 'many'), thin7: w(7, 'thin'), exact7: w(7, 'exact'), area7: w(7, 'area'),
      arch7: w(7, 'archimedes'), more7: w(7, 'more'),
      three8: w(8, 'three'), q: [w(9, 'one'), w(10, 'two'), w(11, 'three')], steep9: w(9, 'steepness'), squeeze10: w(10, 'squeeze'), zero10: w(10, 'zero', 2),
      slopes11: w(11, 'slopes'), areas11: w(11, 'areas'), deriv11: w(11, 'derivatives'), integ11: w(11, 'integrals'), coin11: w(11, 'coin'),
      l12: S(12), already12: w(12, 'already'), slope12: w(12, 'slope'), two12: w(12, 'two'), points12: w(12, 'points'), end: E(12),
    };
    const T = this.T;
    this.START = S(0);
    this.FROM = -0.6;                                        // trang p1 có LEAD 0.6: khung 0 của video = cảnh này
    // thước dây nội bộ: S1 → S2 (ba câu hỏi), S2 → S3 (bắt đầu)
    this.SW = [Math.max(E(7) + 0.2, S(8) - 0.45), Math.max(E(11) + 0.2, S(12) - 0.5)];
    if (this.SW[1] < this.SW[0] + 3) throw new Error('a0: thước dây sát nhau');
    // bốn dây đo lóe (câu 5): x₂ và mốc
    this.FLASH = [[0, T.steep5], [1, T.there5], [2, T.is5], [3, T.exactly5]];
    for (let i = 1; i < 4; i++) if (this.FLASH[i][1] < this.FLASH[i - 1][1] + 0.12) throw new Error('a0: dây đo lóe sát nhau');
    // cột đất (câu 7): n và mốc mọc
    this.COLS = [[4, T.adds7], [10, T.many7], [100, T.thin7]];
    this.END = [T.end + 0.05, T.end + 0.75];
    this.CLOSE = view(1.3, 1.7, 1440, 600, 375 * 1.25, 186 * 1.25);   // nhích vào tam giác RISE / RUN (câu 2)                 // rút hết → bare (TAIL 1.0)
    must(`${STEPS[0].slope}`, 3); must(`${STEPS[3].slope}`, 2.01);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.spot0, 'tick'), c(T.rise1, 'pen'), c(T.across1, 'tick'), c(T.start2, 'card'), c(T.neither2, 'snap'), c(T.zeroA3, 'pop'), c(T.nothing3, 'crack'),
      c(T.centuries4 + 0.2, 'page'), c(T.impossible4, 'card'), c(T.calculus4, 'card'),
      c(T.shape5, 'whoosh'), c(T.y5, 'pen'), c(T.steep5, 'tick'), c(T.two5, 'correct'), c(T.exactly6, 'pen'),
      c(T.many7, 'tick'), c(T.area7, 'shimmer'), c(T.arch7 + 0.3, 'page'),
      c(T.q[0], 'card'), c(T.q[1], 'card'), c(T.squeeze10, 'pop'), c(T.areas11, 'coin'),
      c(T.slope12, 'wood'),
      ...this.SW.map(t => c(t, 'whoosh')),
    ];
  }

  // camera của S1: open → zoom (câu 5) → area (câu 7)
  cam(t) {
    const T = this.T;
    if (t >= T.run7) return lerpView(VIEWS.zoom, VIEWS.area, prog(t, T.run7, T.back7 + 0.6));
    if (t < T.shape5) {                                     // câu 2: camera nhích vào tam giác ("two points") rồi lùi khi cọc trượt về
      const b = prog(t, T.two2 - 0.3, T.finish2 + 0.4) - prog(t, T.single2, T.neither2 + 0.5);
      return lerpView(VIEWS.open, this.CLOSE, b);
    }
    return lerpView(VIEWS.open, VIEWS.zoom, prog(t, T.shape5, T.curve5 + 0.3));
  }

  // ═══ S1: sườn đồi (câu 0–7) ═══
  s1(g, t) {
    const T = this.T, V = this.cam(t), P = [V.X(1), V.Y(1)];
    ground(g, 'field', t, { pan: (VIEWS.open.X(0) - V.X(0)) * 0.1 });
    hill(g, V, { a: -1.2, b: 3.6, t });                     // sườn phải (lab): mép x = −1.2 khuất sau đồi cỏ gần

    // ── câu 7: cột đất / đất đặc dưới 0 … 1 ──
    if (t >= T.adds7) {
      const kA = prog(t, T.area7, T.area7 + 0.5);
      if (kA < 1) { let n = 4, a = T.adds7; for (const [m, at] of this.COLS) if (t >= at) { n = m; a = at; }
        const ex = 1 - prog(t, T.exact7, T.exact7 + 0.5);
        columns(g, V, n, { side: 'right', k: n === 4 ? prog(t, a, a + 0.5) : 0.25 + 0.75 * prog(t, a, a + 0.35), excess: ex, a_: 1 }); }
      if (kA > 0) { areaFill(g, V, 0, 1, { k: kA }); }
    }

    // ── câu 0: quạt dây đo + cọc (thumbnail), rút ở câu 1 ──
    const fanLift = prog(t, T.l1, T.l1 + 0.5);
    if (fanLift < 1) [2, 1.5, 1.1].forEach((x, i) => secant(g, V, 1, x, { a: [0.55, 0.72, 0.9][i], lift: fanLift }));

    // ── câu 1–3: cọc thứ hai, RISE / RUN ──
    const x2 = 1.6 - 0.6 * outCubic(prog(t, T.single2, T.neither2 + 0.4)), poleLift = prog(t, T.l3, T.l3 + 0.45);
    if (t >= T.measure1 - 0.1 && poleLift < 1) {
      const kr = prog(t, T.rise1, T.rise1 + 0.45), kn = prog(t, T.run1, T.run1 + 0.4), Q = [V.X(x2), V.Y(sq(x2))];
      g.save(); g.globalAlpha = 1 - poleLift;
      if (kn > 0) line(g, P[0], P[1], P[0] + (Q[0] - P[0]) * outCubic(kn), P[1], C.ink, 6);
      if (kr > 0) line(g, Q[0], P[1], Q[0], P[1] + (Q[1] - P[1]) * outCubic(kr), C.ink, 6);
      g.restore();
      rangingPole(g, Q[0], Q[1], { k: prog(t, T.measure1, T.measure1 + 0.4), lift: poleLift });
    }

    mound(g, t, 1 - prog(t, T.shape5, T.shape5 + 0.8));

    // ── sào: thumbnail (lơ lửng → chạm ở "spot", rút ở câu 1); câu 5 hạ xuống ở "exactly", rút ở câu 7 ──
    const r0 = prog(t, T.spot0 - 0.5, T.spot0), r0l = prog(t, T.l1 + 0.1, T.l1 + 0.6);
    if (r0l < 1) rod(g, V, 1, { d0: -0.58, d1: 0.72, k: 0.45 + 0.55 * r0, hover: 150 + 30 * Math.sin(t * 3) * (1 - r0), lift: r0l });   // lơ lửng ~40 px ở khung 0.5 s
    // câu 5: bốn dây đo lóe lần lượt, cũ mờ dần thành quạt
    const flLift = prog(t, T.run7, T.run7 + 0.5);
    if (t >= T.steep5 && flLift < 1) this.FLASH.forEach(([i, at]) => { if (t < at) return;
      const x = +STEPS[i].x, cur = i === 3 || t < this.FLASH[i + 1][1];
      secant(g, V, 1, x, { k: prog(t, at, at + 0.14), a: cur ? 1 : 0.38, poles: i < 2, poleK: prog(t, at, at + 0.2), lift: flLift, ext: 0.3, ext0: 0.03 }); });
    const r1 = prog(t, T.exactly5, T.two5);
    if (r1 > 0 && flLift < 1) rod(g, V, 1, { d0: -0.45, d1: 0.6, k: r1, hover: 160, lift: prog(t, T.run7 + 0.1, T.run7 + 0.6) });

    // ── điểm sáng + người đi bộ ──
    const spotK = 1 - prog(t, T.run7, T.run7 + 0.6);
    spot(g, P[0], P[1], { k: spotK, pulse: prog(t, T.nothing5, T.nothing5 + 0.5) + prog(t, T.foot0, T.foot0 + 0.4) });
    const hw = prog(t, T.shape5, T.curve5 + 0.3), hu = lerp(1, 0.78, hw), hs = lerp(0.95, 1.3, outCubic(hw) * (1 - prog(t, T.run7, T.back7 + 0.6)));
    hiker(g, V.X(hu) - 6 * hs, V.Y(sq(hu)) - 6, hs, { step: hw > 0 && hw < 1 ? t * 1.8 : 0, flip: hw > 0 && hw < 1 });

    // ── chữ lớn góc trên trái: thumbnail → RISE ÷ RUN → 0 ÷ 0 = ? ──
    const tl0 = prog(t, T.l1 - 0.1, T.l1 + 0.4);
    if (tl0 < 1) { const dy = -(outCubic(tl0) ** 1.4) * 500, w1 = text(g, '0 ÷ 0 = ', 120, 330 + dy, { font: BIG });
      scaled(g, 120 + w1 + 120, 270 + dy, nudge(t, T.spot0), () => text(g, '2?', 120 + w1, 330 + dy, { font: BIG, color: C.poleInk })); }
    const tr = prog(t, T.l3, T.l3 + 0.45);
    if (t >= T.rise1 && tr < 1) text(g, 'RISE ÷ RUN', 120, 320 - outCubic(tr) ** 1.4 * 500, { font: MID, k: prog(t, T.rise1, T.run1 + 0.3) });
    const tz = prog(t, T.l4 - 0.1, T.l4 + 0.35);
    if (t >= T.zeroC3 - 0.05 && tz < 1) {
      const dy = -(outCubic(tz) ** 1.4) * 500, crack = prog(t, T.nothing3, T.nothing3 + 0.4), col = crack >= 0.5 ? C.dim : C.ink;
      const w0 = text(g, '0 ÷ 0', 120, 330 + dy, { font: BIG, color: col, k: prog(t, T.zeroC3, T.zeroD3 + 0.25) });
      text(g, ' = ?', 120 + w0, 330 + dy, { font: BIG, color: col, k: prog(t, T.means3, T.means3 + 0.25) });
      if (crack > 0) { const pts = [[150, 200], [230, 260], [205, 300], [330, 345], [300, 380], [470, 300], [520, 340], [640, 250]];
        const n = Math.max(2, Math.round(pts.length * crack)); g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath();
        pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y + dy) : g.moveTo(x, y + dy)); g.stroke(); g.restore(); }
    }

    // ── thẻ RISE / RUN (câu 1–3), START / FINISH (câu 2) ──
    if (t >= T.rise1 && t < T.l4 + 0.5) {
      const Q = [V.X(x2), V.Y(sq(x2))], m = prog(t, T.single2, T.neither2 + 0.4), lt = prog(t, T.l4, T.l4 + 0.45);
      const rz = t >= T.zeroA3, nz = t >= T.zeroB3;
      const riseAt = [lerp(Q[0] + 120, 1610, m), lerp((P[1] + Q[1]) / 2, 600, m)], runAt = [lerp((P[0] + Q[0]) / 2, 1610, m), lerp(P[1] + 56, 712, m)];
      scaled(g, riseAt[0], riseAt[1], nudge(t, T.higher1), () => card(g, rz ? 'RISE = 0' : 'RISE', riseAt[0], riseAt[1], { size: 40, k: rz ? prog(t, T.zeroA3, T.zeroA3 + 0.3) : prog(t, T.rise1, T.rise1 + 0.3), lift: lt }));
      if (t >= T.run1) scaled(g, runAt[0], runAt[1], nudge(t, T.across1), () => card(g, nz ? 'RUN = 0' : 'RUN', runAt[0], runAt[1], { size: 40, k: nz ? prog(t, T.zeroB3, T.zeroB3 + 0.3) : prog(t, T.run1, T.run1 + 0.3), lift: lt }));
      const ls = prog(t, T.single2, T.single2 + 0.4);
      card(g, 'START', P[0] - 150, P[1] + 70, { size: 34, mono: false, k: prog(t, T.start2, T.start2 + 0.3), lift: ls });
      card(g, 'FINISH', Q[0] + 10, Q[1] - 150, { size: 34, mono: false, k: prog(t, T.finish2, T.finish2 + 0.3), lift: ls });
    }

    // ── câu 4: trang 1684, IMPOSSIBLE, CALCULUS ──
    const l4 = prog(t, T.twist5, T.twist5 + 0.6);
    if (t >= T.centuries4 - 0.05 && l4 < 1) {
      photo(g, 'nova', 470, 110, 340, 470, { k: prog(t, T.centuries4, T.centuries4 + 0.6), rot: -0.025, zoom: 1.02 + 0.03 * prog(t, T.centuries4, T.twist5), lift: l4 });
      card(g, 'IMPOSSIBLE', 1110, 210, { size: 48, mono: false, wt: 800, k: prog(t, T.impossible4, T.impossible4 + 0.3), lift: l4, rot: -0.03 });
      card(g, 'CALCULUS', 1110, 340, { size: 64, mono: false, wt: 900, k: prog(t, T.calculus4, T.calculus4 + 0.3), lift: l4, rot: 0.02 });
    }

    // ── câu 5–6 (zoom): y = x², (1, 1), số dốc, = 2, ≈ 2 ──
    const l7 = prog(t, T.run7, T.run7 + 0.5);
    if (t >= T.y5 - 0.05 && l7 < 1) {
      card(g, 'y = x²', 560, 540, { size: 52, isMath: true, mono: false, color: C.curveInk, edge: C.curve, k: prog(t, T.y5, T.y5 + 0.35), lift: l7 });
      if (t >= T.one5) card(g, '(1, 1)', 990, 735, { size: 40, color: C.poleInk, edge: C.pole, k: prog(t, T.one5, T.one5 + 0.3), lift: l7 });
      let x = 120; const f = `500 64px ${MO}`;
      this.FLASH.forEach(([i, at]) => { if (t < at) return; const s = STEPS[i].slope;
        text(g, s, x, 200 - outCubic(l7) ** 1.4 * 400, { font: f, color: C.secInk, k: prog(t, at, at + 0.15) }); x += measure(g, s, f) + 44; });
      const kt = prog(t, T.two5, T.two5 + 0.3);
      if (kt > 0) scaled(g, 260, 330, outBack(kt, 2) * nudge(t, T.two6), () => { const dy = -(outCubic(l7) ** 1.4) * 500;
        const w0 = text(g, '= ', 120, 400 + dy, { font: BIG }); text(g, '2', 120 + w0, 400 + dy, { font: BIG, color: C.poleInk }); });
      if (t >= T.roughly6) { const b = card(g, '≈ 2', 640, 345, { size: 56, mono: false, wt: 800, k: prog(t, T.roughly6, T.roughly6 + 0.3), lift: l7 });
        if (l7 <= 0) pen(g, b.x - 8, b.y + b.h * 0.58, b.x + b.w + 8, b.y + b.h * 0.42, prog(t, T.exactly6, T.exactly6 + 0.3), { w: 7 }); }
      if (t >= T.two5 + 0.3 && t < T.run7) must(`(${STEPS[3].x} ** 2 - 1) / (${STEPS[3].x} - 1)`, +STEPS[3].slope);
    }

    // ── câu 7 (trắc dọc): area = ⅓, Archimedes, hơn 2,000 năm ──
    const ka = prog(t, T.area7, T.area7 + 0.35);
    if (ka > 0) {
      const wA = text(g, 'area =', 600, 480, { font: `800 60px ${AR}`, color: C.soilInk, k: ka });
      frac(g, '1', '3', 600 + wA + 80, 460, { px: 110, color: C.soilInk, k: ka });
      if (ka >= 1) must(`${(1 ** 3) / 3}`, 1 / 3);
    }
    if (t >= T.arch7 - 0.05) photo(g, 'archimedes', 1440, 96, 330, 410, { k: prog(t, T.arch7, T.arch7 + 0.6), from: 'right', rot: 0.02 });
    if (t >= T.more7) card(g, 'MORE THAN 2,000 YEARS AGO', 1000, 130, { size: 40, mono: false, wt: 800, k: prog(t, T.more7, T.more7 + 0.3) });

    // ── mascot: ponder (trên đồi cỏ gần) → pointer từ "twist" ──
    const sw = T.twist5, kOut = prog(t, sw - 0.4, sw), kIn = prog(t, sw, sw + 0.5);
    if (kOut < 1) { g.save(); g.translate(0, outCubic(kOut) * 300); figure(g, 'ponder', 210, H, 262, 1, { t }); g.restore(); }
    if (kIn > 0) figure(g, 'pointer', 205, H, 262, kIn, { t });
  }

  // ═══ S2: ba câu hỏi (câu 8–11) ═══
  s2(g, t) {
    const T = this.T, { xs, base, w, h } = PROMISE;
    ground(g, 'field', t, { pan: 900 });
    text(g, 'THREE QUESTIONS', 1060, 250, { font: `900 84px ${AR}`, align: 'center', k: prog(t, T.three8, T.three8 + 0.5) });
    const flip = prog(t, T.areas11 - 0.2, T.areas11 + 0.3) - prog(t, T.deriv11 - 0.2, T.deriv11 + 0.3) + prog(t, T.integ11 - 0.2, T.integ11 + 0.3) + 2 * prog(t, T.coin11 - 0.1, T.coin11 + 0.7);
    xs.forEach((x, i) => {
      const a = this.SW[0] + 0.35 + i * 0.25, ks = prog(t, a, a + 0.4), kd = prog(t, T.q[i] - 0.35, T.q[i] + 0.15);
      if (ks > 0 && kd < 0.7) { g.save(); g.globalAlpha = ks; g.setLineDash([12, 10]); g.strokeStyle = 'rgba(34,49,59,0.5)'; g.lineWidth = 4; g.stroke(rr(x - w / 2, base - h, w, h, 8)); g.restore();
        const kn = prog(t, T.three8 + i * 0.12, T.three8 + 0.35 + i * 0.12);
        if (kn > 0) scaled(g, x - w / 2 + 8, base - h + 6, outBack(kn, 2), () => { g.fillStyle = C.poleInk; g.beginPath(); g.arc(x - w / 2 + 8, base - h + 6, 32, 0, 7); g.fill();
          text(g, String(i + 1), x - w / 2 + 8, base - h + 8, { font: `800 38px ${AR}`, color: C.white, align: 'center', base: 'middle' }); }); }
      promiseCard(g, i, { k: kd, kp: prog(t, T.q[i] + 0.1, T.q[i] + 0.8), cap: prog(t, T.q[i] + 0.25, T.q[i] + 0.6), flip: i === 2 ? flip : 0, ap: i === 1 ? prog(t, T.squeeze10, T.zero10 + 0.4) : 0 });
    });
    figure(g, 'pointer', 205, H, 262, 1, { t });
  }

  // ═══ S3: bắt đầu từ hai điểm (câu 12) → bare ═══
  s3(g, t) {
    const T = this.T, V = VIEWS.bowl, out = prog(t, ...this.END);
    if (out >= 1) { bare(g, t); return; }
    ground(g, 'field', t);
    hill(g, V, { a: -3, b: 3.6, k: prog(t, T.l12 - 0.2, T.already12), rise: 1 - out, t });
    const lift = prog(t, T.end + 0.05, T.end + 0.5);
    secant(g, V, 1, 2, { k: prog(t, T.points12, T.points12 + 0.35), poleK: prog(t, T.two12, T.two12 + 0.35), lift, ext: 0.25 });
    rangingPole(g, V.X(1), V.Y(1), { k: prog(t, T.slope12, T.slope12 + 0.35), lift });
    spot(g, V.X(1), V.Y(1), { k: prog(t, T.slope12, T.slope12 + 0.3) * (1 - lift) });
    if (t >= T.points12 + 0.35 && lift <= 0) must(`(2 ** 2 - 1 ** 2) / (2 - 1)`, +STEPS[0].slope);
    g.save(); g.translate(0, outCubic(out) * 320); figure(g, 'pointer', 205, H, 262, 1, { t }); g.restore();
  }

  render(g, t) {
    const [a, b] = this.SW;
    if (t < a) return this.s1(g, t);
    if (t < a + 0.9) return tapeSwap(g, prog(t, a, a + 0.9), () => this.s1(g, t), () => this.s2(g, t));
    if (t < b) return this.s2(g, t);
    if (t < b + 0.9) return tapeSwap(g, prog(t, b, b + 0.9), () => this.s2(g, t), () => this.s3(g, t));
    this.s3(g, t);
  }
}
