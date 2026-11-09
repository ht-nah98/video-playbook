// d1 · A stand-in — MỞ HỒI III "Parallel". Tờ bìa P, sợi chỉ d lơ lửng song song phía trên (cùng khoảng cách mãi mãi);
// định lý cầu nối: d ∥ d′ (d′ nằm trong P, xanh ngọc = vật đang xét) → d ∥ P. "Stand-in": đèn rọi thẳng xuống,
// bóng d (cam đất — chính là hình chiếu đang nói tới) rơi ĐÚNG lên d′.
import { W, H, C, prog, lookup, outCubic, smooth, ground, pool, camLerp, sheet, sheetShadow, thread, dot3, lamp, line, it,
  label, formula, sectionTag, actCard, dark, poly, clamp } from '../kit.js';

const SH = [[-2.4, -1.1, 0], [2.4, -1.1, 0], [2.4, 2.5, 0], [-2.4, 2.5, 0]];
const Y = 1.2, HD = 1.3, X0 = -2.0, X1 = 2.0;           // d: y = Y, z = HD; d′ ngay dưới, trong P
const CAM0 = { yaw: -38, pitch: 26, dist: 10.4, target: [0.1, 0.7, 0.6], cx: 1230, cy: 610 };
const CAM1 = { yaw: -30, pitch: 31, dist: 10.0, target: [0.1, 0.8, 0.5], cx: 1230, cy: 610 };
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));
// lộ dần một dòng công thức theo từng cụm: segs = [[a, b, số mục], …] → k ∈ [0, 1]
const reveal = (t, segs, n) => segs.reduce((s, [a, b, c]) => s + prog(t, a, b) * c, 0) / n;

export default class StandIn {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.START = L(43).start;
    this.FROM = Math.max(this.START - 2.6, L(42).end + 0.5);
    this.FL = Math.max(this.START - 2.4, this.FROM + 0.95); // đèn chớp tắt–bật (sau khi tờ cũ trượt xong)
    this.T = {
      two: w(43, 'two'), same: w(43, 'same'), dist: w(43, 'distance'), forever: w(43, 'forever'),
      prove: w(44, 'prove'), par44: w(44, 'parallel'), bridges: w(44, 'bridges'),
      important: w(45, 'important'), line45: w(45, 'line'), plane45: w(45, 'plane'),
      not: w(46, 'not'), par46: w(46, 'parallel', 1), some: w(46, 'some'), then46: w(46, 'then'), whole: w(46, 'whole'),
      show: w(47, 'show'), d47: w(47, 'd', 1), standin: w(47, 'stand-in'), inside: w(47, 'inside'), d47b: w(47, 'd', 2),
      move: w(48, 'move'), every: w(48, 'every'), end: L(48).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FL + 0.15, kind: 'shimmer' }, { t: T.two, kind: 'pen' },
      { t: T.prove + 0.1, kind: 'pen' }, { t: T.some, kind: 'pen' }, { t: T.standin + 0.45, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    // camera: đứng khi thẻ hồi, trôi chậm (≤ 0.3°/s) khi giảng; nghiêng nhẹ hơn lúc "stand-in" để thấy bóng rơi
    const drift = clamp((t - S) * 0.28, 0, 6), up = smooth(prog(t, T.show, T.standin));
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAM1, yaw: CAM1.yaw + drift * 0.5 }, up), P = cam.P;

    // tờ bìa P gấp vào sau thẻ hồi
    const kS = outCubic(prog(t, S - 0.1, S + 0.8));
    const cs0 = SH.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    if (kS > 0) {
      sheetShadow(g, cam, cs0.map(p => [p[0], p[1], 0]), { a: 0.16 * kS });
      const edgeW = 1 + bump(t, T.plane45) * 1.2;
      const cs = sheet(g, cam, cs0, { k: kS });
      if (edgeW > 1.01) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3 * edgeW; poly(g, cs); g.stroke(); g.restore(); }
      // "whole plane": cả tờ bìa sáng lên (vũng đèn trong tờ)
      const kW = prog(t, T.whole, T.whole + 0.8);
      const kLamp = 0.45 + 0.55 * prog(t, T.standin - 0.3, T.standin + 0.3);
      g.save(); poly(g, cs); g.clip(); g.globalAlpha = Math.max(kW * 0.9, 0.35 * kS) * kLamp;
      const c = P([0, Y, 0]); pool(g, c[0], c[1], 520, 0.7); g.restore();
    }
    // bóng của d: đèn thẳng trên → rơi ĐÚNG lên d′ (cam đậm vì nó LÀ hình chiếu đang nói tới)
    const kSh = outCubic(prog(t, T.standin + 0.1, T.standin + 0.8));
    if (kSh > 0) {
      const a = P([X0 + (X1 - X0) * (1 - kSh) / 2, Y, 0]), b = P([X1 - (X1 - X0) * (1 - kSh) / 2, Y, 0]);
      for (let i = 0; i < 6; i++) line(g, a, b, C.terraA(0.10), 24 - i * 3.4);
      line(g, a, b, C.terra, 9);
    }
    // d′ trong P (xanh ngọc — người đại diện)
    const kD2 = prog(t, T.some, T.some + 0.7);
    thread(g, cam, [X0 + 0.1, Y, 0], [X1 - 0.1, Y, 0], { color: `rgb(${C.teal.join(',')})`, w: 5, k: kD2 });
    // khoảng cách bằng nhau: ba vạch đứt thẳng đứng từ d xuống P ("same distance")
    const kTk = prog(t, T.same - 0.1, T.dist + 0.3);
    [-1.5, 0, 1.5].forEach((x, i) => line(g, P([x, Y, HD]), P([x, Y, 0]), C.inkA(0.75), 2.5, [6, 8], clamp(kTk * 3 - i)));
    // tia đèn rọi xuống lúc "stand-in" (mũi tên nhỏ)
    const kR = prog(t, T.standin - 0.2, T.standin + 0.4);
    if (kR > 0) [-0.75, 0.75].forEach(x => {
      const p0 = P([x, Y, HD]), p1 = P([x, Y, 0]); line(g, p0, p1, C.inkA(0.55), 2, [3, 9], kR);
      if (kR >= 1) { g.save(); g.fillStyle = C.inkA(0.55); poly(g, [[p1[0], p1[1] - 6], [p1[0] - 7, p1[1] - 20], [p1[0] + 7, p1[1] - 20]]); g.fill(); g.restore(); }
    });
    // d: chỉ mực lơ lửng; "forever": kéo dài nét đứt ra hai đầu
    const kD = prog(t, T.two, T.two + 0.8), wD = 5 + 3 * bump(t, T.line45);
    thread(g, cam, [X0, Y, HD], [X1, Y, HD], { w: wD, k: kD });
    const kF = outCubic(prog(t, T.forever, T.forever + 1.0));
    if (kF > 0) { const e = 1.0 * kF;
      line(g, P([X1, Y, HD]), P([X1 + e, Y, HD]), C.inkA(0.6), 3, [8, 9]); line(g, P([X0, Y, HD]), P([X0 - e, Y, HD]), C.inkA(0.6), 3, [8, 9]); }
    if (kD > 0) [[X0, Y, HD], [X1, Y, HD]].forEach(p => dot3(g, cam, p, { r: 5, k: kD }));

    // nhãn phẳng cạnh điểm chiếu
    const pd = P([X1, Y, HD]), pP = P([-2.0, -0.75, 0]), pd2 = P([X1 - 0.1, Y, 0]);
    it(g, 'd', pd[0] + 18, pd[1] - 14, 60, C.ink, { k: kD });
    it(g, 'P', pP[0] - 6, pP[1] + 18, 64, C.ink, { k: prog(t, S + 0.3, S + 0.9) });
    it(g, 'd′', pd2[0] + 16, pd2[1] + 44, 60, C.tealT, { k: kD2 });
    const pm = P([0, Y, HD / 2]);
    label(g, 'same distance', pm[0] + 26, pm[1] + 6, { size: 22, k: prog(t, T.dist, T.dist + 0.6) * (1 - prog(t, T.not - 0.6, T.not - 0.1)) });
    label(g, 'not in P', pd[0] + 18, pd[1] + 34, { size: 22, k: prog(t, T.not, T.not + 0.5) });
    const ps = P([X0 + 0.2, Y, 0]);
    it(g, 'the shadow of d lands on d′', ps[0] - 20, ps[1] + 66, 36, C.terraT, { k: prog(t, T.standin + 0.4, T.inside + 0.8) });

    // đèn treo cố định (bật từ thẻ hồi), chớp tắt–bật 0.3 s
    const fl = 1 - 0.85 * Math.sin(Math.PI * prog(t, this.FL, this.FL + 0.3));
    lamp(g, P([0, Y, 0])[0], 150, { on: fl * (0.6 + 0.4 * prog(t, T.standin - 0.3, T.standin + 0.3)) });

    // chữ bên trái: câu hỏi → cầu nối → định lý
    sectionTag(g, 'Act III · a stand-in', prog(t, S + 0.2, S + 0.9));
    formula(g, ['d', { para: true }, 'P', { gap: 0.2 }, '?'], 96, 230, 72, C.ink, prog(t, T.prove, T.par44 + 0.4));
    label(g, 'theorems act as bridges', 96, 290, { size: 24, k: prog(t, T.bridges - 0.3, T.bridges + 0.5) });
    it(g, 'the most important one:', 96, 385, 46, C.lead, { wt: 500, k: prog(t, T.important, T.plane45 + 0.4) });
    const FB = ['d', { para: true }, { s: 'd′', c: C.tealT }, { gap: 0.25 }, 'in P', { gap: 0.35 }, '→', { gap: 0.25 }, 'd', { para: true }, 'P'];
    formula(g, FB, 96, 475, 72, C.ink, reveal(t, [[T.par46, T.par46 + 0.6, 3], [T.some + 0.6, T.then46, 2], [T.then46, T.whole + 0.6, 6]], FB.length));
    line(g, [96, 500], [620, 500], C.ink, 3, [], prog(t, T.move, T.move + 0.6));
    label(g, 'behind almost every', 96, 548, { size: 24, k: prog(t, T.every - 0.2, T.every + 0.4) });
    label(g, 'parallel proof', 96, 584, { size: 24, k: prog(t, T.every + 0.3, T.end) });

    // thẻ hồi III + chớp đèn
    actCard(g, t, S, 'ACT THREE', 'Parallel');
    if (t < this.FL + 0.3) dark(g, fl);
  }
}
