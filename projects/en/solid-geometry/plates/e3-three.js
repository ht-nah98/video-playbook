// e3 · The theorem of three perpendiculars — CẢNH MẪU CỦA ĐẠO DIỄN (khung lab 0, tools/lab/shadowbox.html).
// Tờ bìa P, a nằm trong P, b xiên qua O; đèn rọi THẲNG xuống → bóng b′ cam đất; hai dấu vuông; a ⊥ b ⇔ a ⊥ b′.
// Câu cuối: camera ngóc lên nhìn thẳng xuống → a và b′ nằm trên "trang phẳng" (SPACE → FLAT PAGE).
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, pool, camLerp, sheet, sheetShadow, thread, dot3, rightMark,
  lamp, line, it, label, formula, figure, sectionTag, add, mul, dot, norm } from '../kit.js';

const AL = 40 * Math.PI / 180, O = [0, 0, 0], A = [1, 0, 0], BD = [0, Math.cos(AL), Math.sin(AL)], BP = [0, Math.cos(AL), 0];
const LS = 2.5, B = mul(BD, LS), BSH = [B[0], B[1], 0];
const CARD = [[-2.25, -1.0, 0], [2.25, -1.0, 0], [2.25, 2.7, 0], [-2.25, 2.7, 0]];
const CAM0 = { yaw: -40, pitch: 27, dist: 10.2, target: [0.1, 0.75, 0.5], cx: 1260, cy: 560 };
const CAM1 = { yaw: -14, pitch: 84, dist: 10.6, target: [0.1, 0.9, 0], cx: 1260, cy: 560 };

export default class Three {
  static ERA = 'desk';
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.T = {
      sheet: L(67).start, a: w(68, 'a', 2), P: w(68, 'p'), b: w(68, 'b'),
      light: w(69, 'shine'), down: w(69, 'down'), shadow: w(69, 'shadow'), proj: w(69, 'projection'),
      ab: w(70, 'perpendicular', 1), abp: w(70, 'perpendicular', 2), shad70: w(70, "b's"),
      trade: w(71, 'trade'), flat71: w(71, 'flat'), space72: w(72, 'space'), page: w(72, 'page'),
      fig0: w(68, 'take'), fig1: L(70).end, end: L(72).end,
    };
    this.START = L(67).start;
    this.FROM = Math.max(this.START - 1.2, L(66).end + 0.5);
    // toán trên hình (trạng thái xong): a·b′ = 0 và a·b = 0
    must(`${dot(A, BP)}`, 0); must(`${dot(A, BD)}`, 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.sheet + 0.2, kind: 'flap' }, { t: T.a, kind: 'pen' }, { t: T.light, kind: 'shimmer' },
      { t: T.ab, kind: 'tick' }, { t: T.abp, kind: 'tick' }, { t: T.page, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera: trôi chậm quanh hình (≤ 4°/s), rồi ngóc lên nhìn thẳng xuống ở câu cuối
    const up = smooth(prog(t, T.space72 - 0.4, T.page + 0.3)), drift = (t - T.sheet) * 0.35;
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + Math.min(drift, 6) }, CAM1, up), P = cam.P;
    const pO = P(O), pB = P(B), pBs = P(BSH);
    const kLight = prog(t, T.light, T.down + 0.2);

    // tờ bìa P gấp vào + bóng của nó trên bàn
    const kS = outCubic(prog(t, this.FROM + 0.3, T.sheet + 0.9));
    const corners = CARD.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    sheetShadow(g, cam, corners.map(p => [p[0], p[1], -0.9]), { a: 0.2 * kS });
    const cs = sheet(g, cam, corners, { k: kS });
    // vũng sáng của đèn trên bìa
    if (kLight > 0) { g.save(); g.beginPath(); cs.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip();
      g.globalAlpha = kLight; pool(g, pBs[0], pBs[1], 330, 0.75); g.restore(); }

    // a trong P
    const kA = prog(t, T.a, T.a + 0.7);
    thread(g, cam, [-2.1, 0, 0], [2.1, 0, 0], { w: 5, k: kA });
    // bóng b′ (cam đất mềm) — chỉ khi đèn đã bật
    const kSh = outCubic(prog(t, T.shadow - 0.15, T.shadow + 0.6)), dim = 1 - 0.55 * prog(t, T.trade, T.flat71 + 0.3);
    if (kSh > 0) {
      const tip = [0, BSH[1] * kSh, 0], pt = P(tip);
      for (let i = 0; i < 7; i++) line(g, pO, pt, C.terraA(0.10), 26 - i * 3.2);
      line(g, pO, pt, C.terra, 6 + 2 * prog(t, T.trade, T.flat71));
      const kx = prog(t, T.shadow + 0.5, T.shadow + 1.2);
      line(g, pBs, P(mul(BP, LS * Math.cos(AL) + 0.55)), C.terra, 3, [2, 10], kx);
      line(g, pO, P(mul(BP, -0.85)), C.terra, 3, [2, 10], kx);
    }
    // tia đèn thẳng đứng: dọc b xuống P
    if (kLight > 0 && t >= T.b) {
      [0.35, 0.65].forEach(u => { const q = mul(BD, LS * u); line(g, P(q), P([q[0], q[1], 0]), C.inkA(0.45 * dim), 2, [3, 9], kLight); });
      line(g, pB, pBs, C.inkA(dim), 2.5, [3, 9], prog(t, T.down, T.shadow));
      if (t >= T.shadow) { g.save(); g.fillStyle = C.inkA(dim); g.beginPath(); g.moveTo(pBs[0], pBs[1] - 12); g.lineTo(pBs[0] - 9, pBs[1] - 30); g.lineTo(pBs[0] + 9, pBs[1] - 30); g.closePath(); g.fill(); g.restore(); }
    }
    // b: phần dưới bìa khuất (nét đứt), phần trên là que mực; mờ dần khi "trade … for its shadow"
    const kB = prog(t, T.b, T.b + 0.6);
    line(g, pO, P(mul(BD, -0.7)), C.inkA(0.55 * dim), 3, [10, 10], kB);
    line(g, pO, pB, C.inkA(dim), 7, [], kB);
    // dấu vuông: a ⊥ b (phía −x) ở chữ "perpendicular" thứ nhất, a ⊥ b′ ở chữ thứ hai
    rightMark(g, cam, O, [-1, 0, 0], BD, 0.26, { color: C.inkA(dim), k: prog(t, T.ab, T.ab + 0.3) });
    rightMark(g, cam, O, A, norm(BP), 0.34, { color: C.terra, k: prog(t, T.abp, T.abp + 0.3) });
    dot3(g, cam, O, { r: 7, k: prog(t, T.a, T.a + 0.3) });
    if (kB >= 1) dot3(g, cam, B, { r: 6, color: C.inkA(dim) });
    if (kSh >= 1) dot3(g, cam, BSH, { r: 6, color: C.terra });

    // nhãn phẳng, cạnh điểm chiếu
    const q = P([-1.75, -0.55, 0]), a1 = P([2.1, 0, 0]);
    it(g, 'P', q[0] - 20, q[1] + 20, 64, C.ink, { k: prog(t, T.P, T.P + 0.3) });
    it(g, 'a', a1[0] - 8, a1[1] + 52, 60, C.ink, { k: kA });
    it(g, 'b', pB[0] + 20, pB[1] + 6, 60, C.inkA(dim), { k: kB });
    it(g, 'b′', pBs[0] - 40, pBs[1] + 62, 60, C.terraT, { k: kSh });
    it(g, 'O', pO[0] - 60, pO[1] + 60, 48, C.ink, { k: prog(t, T.a, T.a + 0.3) });
    label(g, 'shadow = projection', pBs[0] - 60, pBs[1] + 135, { color: C.terraT, size: 24, align: 'right', k: prog(t, T.proj, T.proj + 0.6) });

    // đèn: treo phía trên b, bật ở "shine"
    lamp(g, P(mul(BD, 2.5))[0] * (1 - up) + 1260 * up, 150, { on: kLight });
    if (kLight > 0 && up < 0.3) label(g, 'light, straight down', P(mul(BD, 2.5))[0] + 100, 180, { size: 24, k: prog(t, T.down, T.down + 0.6) * (1 - prog(up, 0, 0.3)) });

    // định lý: viết theo lời "a ⊥ b exactly when a ⊥ b′"
    sectionTag(g, 'Act IV · three perpendiculars', prog(t, this.FROM + 0.3, this.FROM + 1));
    const S = 92, items = ['a', { perp: true }, 'b', { gap: 0.3 }, { iff: true }, 'a', { perp: true }, { s: 'b′', c: C.terraT }];
    const kF = t < T.abp ? prog(t, T.ab, T.ab + 0.9) * 4 / items.length : 0.5 + 0.5 * prog(t, T.abp, T.abp + 0.8);
    formula(g, items, 96, 250, S, C.ink, kF);
    it(g, 'the shadow decides it', 96, 340, 46, C.lead, { wt: 500, k: prog(t, T.shad70, T.shad70 + 0.8) });
    // câu cuối: trang phẳng
    label(g, 'space  →  flat page', 96, 420, { color: C.terraT, size: 28, k: prog(t, T.space72, T.page + 0.2) });

    // mascot chỉ tay sang hình (bên trái), 3–8 s quanh lúc định nghĩa a, b, bóng
    const kf = prog(t, T.fig0 - 0.2, T.fig0 + 0.15) * (1 - prog(t, T.fig1 + 0.4, T.fig1 + 0.75));
    figure(g, 'point', 200, H, 560, kf);
  }
}
