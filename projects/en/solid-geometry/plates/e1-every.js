// e1 · Every line in the plane — MỞ HỒI IV "Perpendicular". Ba chỉ song song (đều đặn) → một que đứng thẳng trên bìa
// (vững); camera lia sang hộp-phòng: cột ⊥ nền, cạnh dọc của vách ⊥ sàn (dấu vuông); quay lại que: định nghĩa
// d ⊥ P = d ⊥ MỌI đường trong P — các sợi chỉ toả ra quanh chân que, mỗi sợi một dấu vuông.
import { C, prog, lookup, outCubic, smooth, ground, pool, camLerp, sheet, sheetShadow, thread, dot3, rightMark, lamp, line,
  it, formula, sectionTag, actCard, dark, poly, clamp, box, solid, shadow, add, room, ROOM } from '../kit.js';

const CARD = [[-2.25, -1.0, 0], [2.25, -1.0, 0], [2.25, 2.7, 0], [-2.25, 2.7, 0]];
const O = [0, 0.85, 0], HS = 2.0, RAY = 1.5, NR = 10, LS = [-2.6, -1.6, 9];  // que d cao HS ở O; đèn bàn (bóng que)
const STICK = box(0.09, 0.09, HS), SV = STICK.V.map(p => add(p, [O[0] - 0.045, O[1] - 0.045, 0]));
const RA = 0.42, RAT = [7.5, -0.5, 0], RW = p => add(p.map(v => v * RA), RAT);           // hộp-phòng thu nhỏ
const COL = box(0.3, 0.3, ROOM.c * RA), CV = COL.V.map(p => add(p, RW([ROOM.a / 2 - 0.36, ROOM.b / 2 - 0.36, 0])));
const LR = [6.0, -3.0, 9], CF = [Math.min(...CV.map(p => p[0])), Math.min(...CV.map(p => p[1])), 0]; // chân cột (góc trước-trái)
const CAME = { yaw: -40, pitch: 27, dist: 10.2, target: [0.1, 0.75, 0.6], cx: 1260, cy: 580 };
const CAMR = { yaw: -24, pitch: 30, dist: 9.4, target: add(RW([ROOM.a / 2, ROOM.b / 2, 0]), [0, 0, 0.5]), cx: 1250, cy: 600 };
const dirs = Array.from({ length: NR }, (_, i) => { const a = (i * 180 / NR + 8) * Math.PI / 180; return [Math.cos(a), Math.sin(a), 0]; });
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));

export default class Every {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.START = L(59).start;
    this.FROM = Math.max(this.START - 2.6, L(58).end + 0.5);
    this.FL = Math.max(this.START - 2.4, this.FROM + 0.95);
    this.T = {
      par: w(59, 'parallel'), reg: w(59, 'regularity'), perp59: w(59, 'perpendicular'), strength: w(59, 'strength'), stab: w(59, 'stability'),
      everything: w(60, 'everything'), build: w(60, 'build'), right: w(60, 'right'), columns: w(60, 'columns'),
      perpC: w(60, 'perpendicular', 1), ground: w(60, 'ground'), walls: w(60, 'walls'), perpW: w(60, 'perpendicular', 2), floor: w(60, 'floor'),
      central: w(61, 'central'), idea: w(61, 'idea'), line61: w(61, 'line'), perp61: w(61, 'perpendicular'), plane61: w(61, 'plane'),
      perp62: w(62, 'perpendicular', 2), every: w(62, 'every'), plane62: w(62, 'plane', 2), end: L(62).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FL + 0.15, kind: 'shimmer' }, { t: T.perp59, kind: 'pen' }, { t: T.build, kind: 'flap' },
      { t: T.perpC + 0.2, kind: 'tick' }, { t: T.perpW + 0.4, kind: 'tick' }, { t: T.perp62, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const toRoom = smooth(prog(t, T.everything - 0.2, T.build + 0.7)) * (1 - smooth(prog(t, T.central - 0.6, T.idea + 0.4)));
    const drift = clamp((t - S) * 0.25, 0, 5);
    const cam = camLerp({ ...CAME, yaw: CAME.yaw + drift }, CAMR, toRoom), P = cam.P;

    // ── tờ bìa P + que d ──
    const kS = outCubic(prog(t, S - 0.1, S + 0.7));
    const cs0 = CARD.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    sheetShadow(g, cam, cs0, { a: 0.18 * kS });
    const cs = sheet(g, cam, cs0, { k: kS });
    const kWhole = bump(t, T.plane61, 1.2);
    if (kWhole > 0) { g.save(); poly(g, cs); g.clip(); g.globalAlpha = kWhole * 0.8; const c = P(O); pool(g, c[0], c[1], 420, 0.7); g.restore(); }
    // ba chỉ song song (đều đặn) — rút đi khi que dựng lên
    const kPar = prog(t, T.par, T.reg + 0.4) * (1 - prog(t, T.strength, T.stab + 0.3));
    [0.05, 0.85, 1.65].forEach((y, i) => { const k = clamp(kPar * 3 - i * 0.6);
      if (k > 0) thread(g, cam, [-1.9 * k, y, 0], [1.9 * k, y, 0], { w: 4 }); });
    // sợi chỉ toả ra quanh O, mỗi sợi một dấu vuông ("every single line")
    dirs.forEach((u, i) => {
      const k = i < 2 ? prog(t, T.perp62 + i * 0.25, T.perp62 + i * 0.25 + 0.5) : prog(t, T.every + (i - 2) * 0.16, T.every + (i - 2) * 0.16 + 0.45);
      if (k <= 0) return;
      thread(g, cam, add(O, u.map(v => -v * RAY * k)), add(O, u.map(v => v * RAY * k)), { w: 3.5 });
    });
    // que: bóng + khối mảnh, mọc lên ở "perpendicular"
    const kSt = outCubic(prog(t, T.perp59, T.perp59 + 0.8));
    if (kSt > 0) {
      const V = SV.map(p => [p[0], p[1], p[2] * kSt]);
      shadow(g, cam, V, LS, { a: 0.35, spread: 0.18 });
      solid(g, cam, STICK, V, LS, { edgeW: 2 });
      dirs.forEach((u, i) => { const k = i < 2 ? prog(t, T.perp62 + i * 0.25 + 0.3, T.perp62 + i * 0.25 + 0.6) : prog(t, T.every + (i - 2) * 0.16 + 0.3, T.every + (i - 2) * 0.16 + 0.6);
        rightMark(g, cam, O, u, [0, 0, 1], 0.26, { k, w: 2.5 }); });
      line(g, P(O), P([O[0], O[1], HS * kSt]), C.ink, 6 + 3 * bump(t, T.line61));
      dot3(g, cam, [O[0], O[1], HS * kSt], { r: 6 });
      const top = P([O[0], O[1], HS * kSt]); it(g, 'd', top[0] + 16, top[1] + 12, 60, C.ink, { k: prog(t, T.line61 - 0.3, T.line61 + 0.3) });
    }
    dot3(g, cam, O, { r: 6, k: kSt });
    const pP = P([-1.85, -0.6, 0]); it(g, 'P', pP[0] - 8, pP[1] + 18, 64, C.ink, { k: prog(t, S + 0.2, S + 0.8) });

    // ── hộp-phòng: cột ⊥ nền, cạnh dọc của vách ⊥ sàn ──
    if (toRoom > 0 || (t > T.everything && t < T.central + 1.5)) {
      const kR = outCubic(prog(t, T.everything, T.build + 0.6));
      sheetShadow(g, cam, ROOM.floor.map(RW), { a: 0.2 * kR });
      room(g, cam, { k: kR, scale: RA, at: RAT });
      const kC = outCubic(prog(t, T.columns - 0.1, T.columns + 0.5));
      if (kC > 0) { const V = CV.map(p => [p[0], p[1], p[2] * kC]); shadow(g, cam, V, LR, { a: 0.35 }); solid(g, cam, COL, V, LR, { edgeW: 2.5 });
        rightMark(g, cam, CF, [-1, 0, 0], [0, 0, 1], 0.3, { k: prog(t, T.perpC, T.perpC + 0.3) });
        const ct = P([CF[0] + 0.3, CF[1], ROOM.c * RA]);
        formula(g, ['column', { perp: true }, 'ground'], ct[0] - 340, ct[1] + 80, 44, C.ink, prog(t, T.perpC, T.ground + 0.5)); }
      // cạnh dọc góc xa + góc phải của vách sau, dấu vuông ở chân
      const vk = prog(t, T.walls, T.walls + 0.5);
      [[ROOM.corners.lb0, ROOM.corners.lb1, [1, 0, 0]], [ROOM.corners.rb0, ROOM.corners.rb1, [-1, 0, 0]]].forEach(([a, b, u]) => {
        line(g, P(RW(a)), P(RW(b)), C.ink, 6, [], vk);
        rightMark(g, cam, RW(a), u, [0, 0, 1], 0.3, { k: prog(t, T.perpW + 0.2, T.perpW + 0.5), w: 3 });
      });
      const wt = P(RW(ROOM.corners.lb1));
      formula(g, ['wall', { perp: true }, 'floor'], wt[0] - 30, wt[1] - 30, 44, C.ink, prog(t, T.perpW, T.floor + 0.5));
    }

    // đèn treo, chớp tắt–bật lúc mở hồi
    const fl = 1 - 0.85 * Math.sin(Math.PI * prog(t, this.FL, this.FL + 0.3));
    lamp(g, 1260, 150, { on: fl });

    // chữ
    sectionTag(g, 'Act IV · every line in the plane', prog(t, S + 0.2, S + 0.9));
    it(g, 'parallel: regularity', 96, 250, 46, C.lead, { wt: 500, k: prog(t, T.par, T.reg + 0.5) });
    it(g, 'perpendicular: stability', 96, 312, 46, C.ink, { wt: 500, k: prog(t, T.perp59, T.stab + 0.5) });
    formula(g, ['d', { perp: true }, 'P'], 96, 440, 72, C.ink, prog(t, T.perp61, T.plane61 + 0.4));
    formula(g, ['d', { perp: true }, 'every line in P'], 96, 530, 64, C.ink, prog(t, T.perp62, T.plane62 + 0.6));

    actCard(g, t, S, 'ACT FOUR', 'Perpendicular');
    if (t < this.FL + 0.3) dark(g, fl);
  }
}
