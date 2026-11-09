// e2 · Two are enough — nối e1: que d ⊥ P với mười sợi chỉ; "infinitely many" → thêm vô số sợi mảnh, thử từng sợi một;
// "cuts the work down" → mọi sợi rút về, chỉ còn hai sợi cắt nhau a, b, hai dấu vuông → cả tờ bìa sáng "d ⊥ P".
// Câu cuối: que hạ xuống, chỉ rút đi, camera về đúng khung mở đầu của e3 (tờ bìa P nằm như e3 CAM0) để nối mượt.
import { C, prog, lookup, outCubic, smooth, ground, pool, camLerp, sheet, sheetShadow, thread, dot3, rightMark, lamp, line,
  it, label, formula, sectionTag, poly, clamp, box, solid, shadow, add } from '../kit.js';

const CARD = [[-2.25, -1.0, 0], [2.25, -1.0, 0], [2.25, 2.7, 0], [-2.25, 2.7, 0]];   // = e3
const O = [0, 0.85, 0], HS = 2.0, RAY = 1.5, NR = 10, NX = 24, LS = [-2.6, -1.6, 9];  // = e1
const STICK = box(0.09, 0.09, HS), SV = STICK.V.map(p => add(p, [O[0] - 0.045, O[1] - 0.045, 0]));
const CAME = { yaw: -35, pitch: 27, dist: 10.2, target: [0.1, 0.75, 0.6], cx: 1260, cy: 580 };   // e1 lúc kết (đã trôi 5°)
const CAM3 = { yaw: -40, pitch: 27, dist: 10.2, target: [0.1, 0.75, 0.5], cx: 1260, cy: 560 };   // e3 CAM0
const dir = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180), 0];
const dirs = Array.from({ length: NR }, (_, i) => dir(i * 180 / NR + 8));            // = e1
const extra = Array.from({ length: NX }, (_, i) => dir((i + 0.5) * 180 / NX + 8));
const IA = 0, IB = 4;                                                                // a = 8°, b = 80°
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));

export default class Two {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.START = L(63).start;
    this.FROM = Math.max(this.START - 1.2, L(62).end + 0.5);
    this.T = {
      impossible: w(63, 'impossible'), inf: w(63, 'infinitely'), surely: w(63, 'surely'), one1: w(63, 'one', 1), one2: w(63, 'one', 2),
      cuts: w(64, 'cuts'), nothing: w(64, 'nothing'),
      perp65: w(65, 'perpendicular', 1), two: w(65, 'two'), lines65: w(65, 'lines'), then65: w(65, 'then'), whole: w(65, 'whole'), plane65: w(65, 'plane', 2),
      most: w(66, 'most'), geometry: w(66, 'geometry'), knowing: w(66, 'knowing'), times: w(66, 'times'), end: L(66).end,
    };
    this.T.chk = [this.T.one1, this.T.one1 + 0.37, this.T.one1 + 0.74];   // thử từng sợi một (chùm đếm)
  }
  sfx() {
    const T = this.T;
    return [...T.chk.map(t => ({ t, kind: 'tick' })), { t: T.lines65, kind: 'tick' }, { t: T.lines65 + 0.35, kind: 'tick' },
      { t: T.whole, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const home = smooth(prog(t, T.knowing, T.end + 0.3));
    const cam = camLerp(CAME, CAM3, home), P = cam.P;
    const gone = 1 - outCubic(prog(t, T.knowing, T.end));   // que + chỉ rút đi ở câu cuối

    sheetShadow(g, cam, CARD, { a: 0.18 });
    const cs = sheet(g, cam, CARD, { k: 1 });
    const kG = prog(t, T.whole, T.whole + 0.6) * (1 - prog(t, T.knowing, T.end));
    if (kG > 0) { g.save(); poly(g, cs); g.clip(); g.globalAlpha = kG * 0.85; const c = P(O); pool(g, c[0], c[1], 480, 0.75); g.restore();
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 3 + 3 * bump(t, T.whole, 0.8); poly(g, cs); g.stroke(); g.restore(); }

    // vô số sợi mảnh (chì) — hiện ở "infinitely many", rút đi ở "cuts the work down"
    const kX = prog(t, T.inf, T.inf + 0.9), kXo = 1 - outCubic(prog(t, T.cuts, T.nothing + 0.3));
    extra.forEach((u, i) => { const k = clamp(kX * 2 - i / NX) * kXo; if (k > 0) thread(g, cam, add(O, u.map(v => -v * RAY * k)), add(O, u.map(v => v * RAY * k)), { w: 2, color: C.inkA(0.5) }); });
    // mười sợi của e1; a, b ở lại
    const kOut = 1 - outCubic(prog(t, T.cuts + 0.2, T.nothing + 0.3));
    dirs.forEach((u, i) => {
      const keep = i === IA || i === IB, k = (keep ? 1 : kOut) * (keep ? gone : 1);
      if (k <= 0) return; const wd = keep ? 3.5 + 2 * prog(t, T.two, T.two + 0.4) : 3.5;
      thread(g, cam, add(O, u.map(v => -v * RAY * k)), add(O, u.map(v => v * RAY * k)), { w: wd });
    });
    // que d
    const kSt = gone;
    if (kSt > 0.12) {
      const V = SV.map(p => [p[0], p[1], p[2] * kSt]);
      shadow(g, cam, V, LS, { a: 0.35, spread: 0.18 });
      solid(g, cam, STICK, V, LS, { edgeW: 2 });
      line(g, P(O), P([O[0], O[1], HS * kSt]), C.ink, 6);
      dot3(g, cam, [O[0], O[1], HS * kSt], { r: 6 });
      const top = P([O[0], O[1], HS * kSt]); it(g, 'd', top[0] + 16, top[1] + 12, 60, C.ink, { k: kSt > 0.5 ? 1 : 0 });
      // dấu vuông: mười sợi (rút cùng sợi), ba lần thử trên sợi mảnh, rồi hai dấu của a, b
      dirs.forEach((u, i) => { const keep = i === IA || i === IB; if (!keep && kOut <= 0.6) return;
        rightMark(g, cam, O, u, [0, 0, 1], 0.26, { k: clamp(gone * 2 - 1), w: keep && t > T.lines65 ? 3.5 : 2.5, color: keep && t > T.lines65 ? C.ink : C.inkA(0.85) }); });
      T.chk.forEach((tc, j) => { const k = prog(t, tc, tc + 0.2) * kXo; if (k > 0) rightMark(g, cam, O, extra[3 + j * 7], [0, 0, 1], 0.42, { k, w: 3 }); });
      [IA, IB].forEach((i, j) => rightMark(g, cam, O, dirs[i], [0, 0, 1], 0.42, { k: prog(t, T.lines65 + j * 0.35, T.lines65 + j * 0.35 + 0.25) * clamp(gone * 2 - 1), w: 3.5 }));
    }
    dot3(g, cam, O, { r: 6, k: clamp(gone * 2 - 1) });
    // nhãn a, b, P
    if (gone > 0) {
      const pa = P(add(O, dirs[IA].map(v => v * RAY * gone))), pb = P(add(O, dirs[IB].map(v => v * RAY * gone)));
      it(g, 'a', pa[0] + 14, pa[1] + 18, 60, C.ink, { k: prog(t, T.two, T.two + 0.4) * (gone > 0.5 ? 1 : 0) });
      it(g, 'b', pb[0] + 10, pb[1] - 8, 60, C.ink, { k: prog(t, T.two + 0.2, T.two + 0.6) * (gone > 0.5 ? 1 : 0) });
    }
    const pP = P([-1.85, -0.6, 0]); it(g, 'P', pP[0] - 8, pP[1] + 18, 64, C.ink);

    lamp(g, 1260, 150, { on: 1 });

    // chữ
    sectionTag(g, 'Act IV · two are enough', 1);
    formula(g, ['d', { perp: true }, 'every line in P'], 96, 250, 54, C.lead, 1);
    it(g, 'infinitely many lines…', 96, 330, 46, C.lead, { wt: 500, k: prog(t, T.inf, T.inf + 0.9) });
    it(g, 'test them one by one?', 96, 392, 46, C.lead, { wt: 500, k: prog(t, T.surely, T.one2 + 0.2) });
    formula(g, ['d', { perp: true }, 'a', { gap: 0.3 }, 'd', { perp: true }, 'b'], 96, 500, 72, C.ink, prog(t, T.perp65, T.lines65 + 0.4));
    formula(g, ['→', { gap: 0.25 }, 'd', { perp: true }, 'P'], 96, 590, 72, C.ink, prog(t, T.then65, T.plane65 + 0.3));
    it(g, 'the most used theorem in solid geometry', 96, 680, 40, C.ink, { wt: 500, k: prog(t, T.most, T.geometry + 0.5) });
    label(g, 'like your times tables', 96, 740, { size: 26, color: C.ink, k: prog(t, T.times - 0.2, T.end) });
  }
}
