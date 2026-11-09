// g4 · Two skew lines — hai chỉ a, b chéo nhau (bóng trên bàn cắt nhau, chỉ không chạm); đoạn vuông góc chung MN tính
// bằng code (điểm gần nhất của hai đường), hai dấu vuông. Mẹo: tờ bìa P chứa a, ∥ b → dây dọi từ b xuống P cùng dài d;
// đèn rọi thẳng xuống → bóng b′ (cam) cắt a đúng tại M: bài toán về lại "điểm → mặt".
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camLerp, sheet, sheetShadow, thread, dot3, rightMark,
  lamp, line, it, label, formula, sectionTag, shadowPt, drop, add, sub, mul, dot, len, norm } from '../kit.js';

const D = 1.9, Z0 = 1.0;                                     // a ở độ cao Z0 (trong P), b cao hơn D
const A0 = [-3.8, 0, Z0], DA = [1, 0, 0], LA = 7.6;
const TH = 140 * Math.PI / 180, B0 = [0.7, -0.15, Z0 + D], DB = [Math.cos(TH), Math.sin(TH), 0], UB = [-2.9, 2.5];
// đoạn vuông góc chung: điểm gần nhất của hai đường (công thức chuẩn)
const common = () => {
  const r = sub(A0, B0), a = dot(DA, DA), b = dot(DA, DB), c = dot(DB, DB), d = dot(DA, r), e = dot(DB, r), den = a * c - b * b;
  const s = (b * e - c * d) / den, u = (a * e - b * d) / den;
  return { M: add(A0, mul(DA, s)), N: add(B0, mul(DB, u)), s, u };
};
const { M, N, u: UN } = common();
const bAt = u => add(B0, mul(DB, u));
const PLUMB_U = [UB[0] + 1.3, UB[1] - 0.6];                  // dây dọi thêm từ b (câu 123)
const CARD = [[-4.4, -2.7, Z0], [4.4, -2.7, Z0], [4.4, 2.9, Z0], [-4.4, 2.9, Z0]];
const CAM0 = { yaw: -32, pitch: 23, dist: 14.5, target: [0.3, 0.3, 1.7], cx: 1230, cy: 590 };
const LMP = [0.7, 0, 40];
const SH = 'rgba(150,74,38,0.18)';

export default class Skew {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g4');
    this.START = L(118).start;
    this.FROM = Math.max(this.START - 1.2, L(117).end + 0.5);
    this.T = {
      two118: w(118, 'two'), skew118: w(118, 'skew'),
      one119: w(119, 'one'), perp119a: w(119, 'perpendicular', 1), both: w(119, 'both'), common: w(119, 'common'), perp119b: w(119, 'perpendicular', 2),
      length: w(120, 'length'), dist120: w(120, 'distance'),
      building: w(121, 'building'), hard: w(121, 'hard'), practice: w(121, 'practice'), trick: w(121, 'trick'),
      build: w(122, 'build'), plane122: w(122, 'plane'), contains: w(122, 'contains'), par122: w(122, 'parallel'),
      is123: w(123, 'is'), dist123b: w(123, 'distance', 2), other123: w(123, 'other'), plane123: w(123, 'plane'),
      back: w(124, 'back'), familiar: w(124, 'familiar'), end: L(124).end,
    };
    // toán trên hình (trạng thái xong): MN ⊥ a, MN ⊥ b, |MN| = D; dây dọi từ b xuống P đều dài D; b′ cắt a tại M
    const MN = sub(N, M);
    must(`${dot(MN, DA)}`, 0); must(`${dot(MN, DB)}`, 0); must(`${len(MN)}`, D);
    PLUMB_U.forEach(u => must(`${bAt(u)[2] - Z0}`, D));
    must(`${len(sub(drop(N, Z0), M))}`, 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.skew118, kind: 'pen' }, { t: T.one119, kind: 'pen' }, { t: T.common, kind: 'snap' }, { t: T.build, kind: 'flap' },
      { t: T.dist123b, kind: 'tick' }, { t: T.back, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min(Math.max(0, t - this.FROM) * 0.28, 9);
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, CAM0, 0), P = cam.P;
    const S = p => P(shadowPt(p, LMP, 0));

    const kA = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.1)), kB = outCubic(prog(t, T.skew118 - 0.2, T.skew118 + 0.6));
    const aE = add(A0, mul(DA, LA)), bS = bAt(UB[0]), bE = bAt(UB[1]);
    const kP = outCubic(prog(t, T.build, T.build + 0.9));
    const kSh = outCubic(prog(t, T.other123 - 0.1, T.other123 + 0.7));   // bóng b′ = hình chiếu đang nói tới
    const kDim = 1 - 0.55 * prog(t, T.building, T.hard + 0.3) + 0.55 * prog(t, T.back, T.back + 0.5);

    // bóng trên bàn: hai bóng CẮT nhau dù hai sợi không chạm
    line(g, S(A0), S(aE), SH, 9, [], kA);
    line(g, S(bS), S(bE), SH, 9, [], kB);
    // tờ bìa P chứa a (câu 122) — mở ra từ a
    const cc = CARD.map(p => [p[0], p[1] * kP, Z0]);
    if (kP > 0) { sheetShadow(g, cam, cc.map(p => [p[0], p[1], 0]), { a: 0.2 * kP, dx: 0, dy: 0 }); sheet(g, cam, cc, { k: kP, alpha: 0.94 });
      const q = P(CARD[0]); it(g, 'P', q[0] + 24, q[1] - 16, 64, C.ink, { k: prog(t, T.plane122, T.plane122 + 0.4) }); }
    // b′: người đại diện của b trong P (nét đứt ở "parallel"), rồi bóng cam khi đèn rọi thẳng xuống (câu 123)
    const pS = P(drop(bS, Z0)), pE = P(drop(bE, Z0));
    line(g, pS, pE, C.inkA(0.5 * (1 - kSh)), 3, [6, 10], prog(t, T.par122, T.par122 + 0.7));
    if (kSh > 0) { for (let i = 0; i < 6; i++) line(g, pS, pE, C.terraA(0.1), 24 - i * 3.5, [], kSh); line(g, pS, pE, C.terra, 6, [], kSh); }

    // chỉ a (đậm lên ở "contains")
    thread(g, cam, A0, aE, { w: 5 + 2 * prog(t, T.contains, T.contains + 0.4), k: kA });
    // tia đèn thẳng đứng từ b xuống P (câu 123), cùng dài d
    const kPl = PLUMB_U.map((u, i) => outCubic(prog(t, T.dist123b + i * 0.3, T.dist123b + i * 0.3 + 0.6)));
    PLUMB_U.forEach((u, i) => {
      const top = bAt(u), k = kPl[i]; if (k <= 0) return;
      thread(g, cam, top, [top[0], top[1], top[2] - D * k], { w: 3, color: C.inkA(0.85) });
      if (k >= 1) { dot3(g, cam, drop(top, Z0), { r: 6, color: C.terra }); rightMark(g, cam, drop(top, Z0), [0, 0, 1], DB, 0.28, { w: 2.5 }); }
      const m = P([top[0], top[1], Z0 + D / 2]); it(g, 'd', m[0] + 14, m[1] + 12, 48, C.ink, { k: prog(t, T.dist123b + i * 0.3 + 0.4, T.dist123b + i * 0.3 + 0.8) });
    });
    // đoạn vuông góc chung MN
    const kMN = outCubic(prog(t, T.one119, T.one119 + 0.8));
    const pM = P(M), pN = P(N);
    if (kMN > 0) {
      const dash = t >= T.building && t < T.back ? [10, 9] : [];
      line(g, pM, pN, C.inkA(kDim), 5 + 2 * prog(t, T.length, T.length + 0.4) * kDim, dash, kMN);
      rightMark(g, cam, M, [0, 0, 1], DA, 0.3, { k: prog(t, T.perp119a, T.perp119a + 0.3), color: C.inkA(kDim) });
      rightMark(g, cam, N, [0, 0, -1], DB, 0.3, { k: prog(t, T.both, T.both + 0.3), color: C.inkA(kDim) });
      dot3(g, cam, M, { r: 7, k: kMN, color: C.inkA(kDim) }); dot3(g, cam, N, { r: 7, k: prog(t, T.one119 + 0.6, T.one119 + 0.9), color: C.inkA(kDim) });
      it(g, 'M', pM[0] - 26, pM[1] + 52, 48, C.inkA(kDim), { align: 'right', k: kMN });
      it(g, 'N', pN[0] - 22, pN[1] - 14, 48, C.inkA(kDim), { align: 'right', k: prog(t, T.one119 + 0.6, T.one119 + 0.9) });
      const pm = [(pM[0] + pN[0]) / 2, (pM[1] + pN[1]) / 2];
      it(g, 'd', pm[0] - 24, pm[1] + 14, 60, C.inkA(kDim), { align: 'right', k: prog(t, T.length, T.length + 0.4) });
    }
    // chỉ b (trên cùng)
    thread(g, cam, bS, bE, { w: 5, k: kB, color: C.ink });
    // nhãn a, b
    const pa = P(add(A0, mul(DA, LA * kA))), pb = P(bAt(UB[0] + (UB[1] - UB[0]) * kB));
    it(g, 'a', pa[0] + 14, pa[1] + 16, 60, C.ink, { k: kA });
    it(g, 'b', pb[0] - 8, pb[1] - 22, 60, C.ink, { k: kB });
    if (kSh > 0) it(g, 'b′', pS[0] - 10, pS[1] + 52, 54, C.terraT, { k: kSh });
    // "common perpendicular" cạnh MN
    label(g, 'common perpendicular', pN[0] + 26, pN[1] - 34, { size: 28, color: C.ink, k: prog(t, T.common, T.perp119b + 0.6) - prog(t, T.build, T.build + 0.5) });

    // đèn
    lamp(g, P([0.7, 0, 8])[0], 150, { on: 1 });

    // chữ trái
    sectionTag(g, 'Act VI · two skew lines', prog(t, this.FROM + 0.3, this.FROM + 1));
    it(g, 'two skew lines', 96, 250, 72, C.ink, { k: prog(t, T.skew118, T.skew118 + 0.6) });
    it(g, 'distance = MN', 96, 340, 54, C.ink, { k: prog(t, T.dist120, T.dist120 + 0.6) });
    label(g, 'directly: hard work', 96, 410, { size: 28, color: C.lead, k: prog(t, T.hard, T.hard + 0.6) });
    it(g, 'the trick:', 96, 480, 54, C.ink, { k: prog(t, T.trick, T.trick + 0.4) });
    const wc = it(g, 'P contains a,', 96, 560, 48, C.ink, { wt: 600, k: prog(t, T.contains, T.contains + 0.6) });
    formula(g, ['b', { gap: 0.1 }, { para: true }, { gap: 0.05 }, 'P'], 96 + wc + 24, 560, 48, C.ink, prog(t, T.par122, T.par122 + 0.6));
    it(g, 'd(a, b) = d(b, P)', 96, 660, 64, C.ink, { k: prog(t, T.is123, T.plane123 + 0.3) });
  }
}
