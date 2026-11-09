// f2 · Two lines (câu 83–88). Trên tờ bìa: a và c cắt nhau → đo thẳng (60°). Nhấc c lên không gian → chéo nhau,
// "không có góc để đo". Trượt nó về (giữ hướng, vệt mờ đi theo) tới khi chạm a → đo góc tại đó: vẫn 60°.
// Quy ước 0°–90°: thước đo độ giấy một phần tư.
import { W, H, C, prog, lookup, must, outCubic, smooth, ground, camera, sheet, sheetShadow, thread, dot3, line, angleArc,
  lamp, it, label, sectionTag, add, sub, mul, dot, norm, lerp3, rgb, poly } from '../kit.js';

const DEG = 180 / Math.PI;
export const F2 = (() => {
  const UA = [1, 0, 0], UB = [Math.cos(60 / DEG), Math.sin(60 / DEG), 0];
  const O1 = [-0.6, 0, 0];             // nơi c cắt a lúc đầu
  const LIFT = [0.9, 0.5, 1.5];         // nhấc vào không gian (giữ hướng)
  const MEET = [1.5, 0, 0];             // trượt về: đi qua PM = O1 + MEET trên a
  const CARD = [[-2.7, -1.5, 0], [2.7, -1.5, 0], [2.7, 2.0, 0], [-2.7, 2.0, 0]];
  return { UA, UB, O1, LIFT, MEET, PM: add(O1, MEET), CARD, A0: [-2.5, 0, 0], A1: [2.5, 0, 0], s0: -1.0, s1: 2.0 };
})();
export const F2_ANGLE = Math.round(Math.acos(dot(F2.UA, F2.UB)) * DEG);
must(`${F2_ANGLE}`, 60);
/** Đoạn của đường hướng UB dời D. */
export const bSeg = D => [add(add(F2.O1, D), mul(F2.UB, F2.s0)), add(add(F2.O1, D), mul(F2.UB, F2.s1))];
/** Bóng mềm của một sợi chỉ lơ lửng (đèn gần như thẳng trên): cam đất pha giấy, mép mềm, alpha ≤ 0.45. */
export function threadShadow(g, cam, a, b, k = 1) {
  if (k <= 0) return; const pa = cam.P([a[0] - 0.08 * a[2], a[1] - 0.05 * a[2], 0]), pb = cam.P([b[0] - 0.08 * b[2], b[1] - 0.05 * b[2], 0]);
  for (let i = 0; i < 4; i++) line(g, pa, pb, C.terraA(0.07 * k), 18 - i * 4);
}
const arrowHead = (g, pa, pb, color, s = 16) => {
  const a = Math.atan2(pb[1] - pa[1], pb[0] - pa[0]); g.save(); g.fillStyle = color; g.beginPath();
  g.moveTo(pb[0], pb[1]); g.lineTo(pb[0] - s * Math.cos(a - 0.4), pb[1] - s * Math.sin(a - 0.4)); g.lineTo(pb[0] - s * Math.cos(a + 0.4), pb[1] - s * Math.sin(a + 0.4)); g.closePath(); g.fill(); g.restore();
};

export default class Lines {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.START = L(83).start;
    this.FROM = Math.max(this.START - 1.2, L(82).end + 0.5);
    this.T = {
      first: w(83, 'first'), lines83: w(83, 'lines'),
      cross: w(84, 'cross'), directly: w(84, 'directly'),
      skew: w(85, 'skew'), never: w(85, 'never'), corner: w(85, 'corner'),
      slide: w(86, 'slide'), without: w(86, 'without'), meet: w(86, 'meet'), measure: w(86, 'measure'), there: w(86, 'there'),
      direction: w(87, 'direction'), true: w(87, 'true'), point: w(87, 'point'),
      convention: w(88, 'convention'), zero: w(88, 'zero'), ninety: w(88, 'ninety'), end: L(88).end,
    };
  }
  sfx() {
    const T = this.T;
    return [{ t: T.cross, kind: 'pen' }, { t: T.meet + 0.15, kind: 'snap' }, { t: T.direction, kind: 'pen' }, { t: T.ninety, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera: trôi chậm; "nhấc vào không gian" xoay nhanh hơn một chút rồi đứng khi đọc góc
    const lift = smooth(prog(t, T.skew - 0.3, T.never + 0.2));
    const yaw = 46 + Math.min(Math.max(0, t - this.START) * 0.5, 4) + 8 * lift;
    const cam = camera({ yaw, pitch: 30 - 4 * lift + 4 * smooth(prog(t, T.meet, T.there)), dist: 10.2, target: [0.3, 0.3, 0.55], cx: 1260, cy: 600 });
    const P = cam.P;

    // tờ bìa
    const kS = outCubic(prog(t, this.FROM + 0.3, this.FROM + 1.1));
    const corners = F2.CARD.map(p => [p[0] * kS, p[1] * (0.3 + 0.7 * kS), 0]);
    sheetShadow(g, cam, corners.map(p => [p[0], p[1], -0.9]), { a: 0.2 * kS });
    sheet(g, cam, corners, { k: kS });

    // vị trí của c/b: nằm trên bìa → nhấc lên → trượt về PM
    const slide = smooth(prog(t, T.slide, T.meet));
    const D = add(mul(F2.LIFT, lift * (1 - slide)), mul(F2.MEET, slide));
    const kA = prog(t, T.first + 0.2, T.lines83 + 0.4), kC = prog(t, T.lines83, T.lines83 + 0.6);
    // bóng mềm của c khi lơ lửng
    if (D[2] > 0.02) { const [b0, b1] = bSeg(D), kz = Math.min(1, D[2] * 2); threadShadow(g, cam, b0, b1, kz);
      // tia đèn thẳng xuống từ sợi lơ lửng: cho thấy nó ở TRÊN tờ bìa
      [0.1, 0.45, 0.8].forEach(u => { const q = lerp3(b0, b1, u); line(g, P(q), P([q[0], q[1], 0]), C.inkA(0.35 * kz), 2, [3, 9]); }); }
    // bóng ma vị trí trên không (sau khi trượt) + vệt trượt
    if (t >= T.slide) {
      const kg = prog(t, T.slide, T.slide + 0.3);
      const [g0, g1] = bSeg(F2.LIFT); line(g, P(g0), P(g1), C.inkA(0.4 * kg), 3, [10, 10]);
      for (let i = 1; i <= 4; i++) { const u = i / 5; if (slide < u) break;
        const [q0, q1] = bSeg(add(mul(F2.LIFT, 1 - u), mul(F2.MEET, u))); line(g, P(q0), P(q1), C.inkA(0.16), 3, [4, 10]); }
    }
    // a trên bìa
    thread(g, cam, F2.A0, F2.A1, { w: 5, k: kA });
    // c / b: phần dưới bìa khuất không có (luôn ở trên); vẽ liền
    const [b0, b1] = bSeg(D);
    line(g, P(b0), P(b1), C.ink, 5, [], kC);
    // điểm gặp, cung góc
    const crossK = prog(t, T.cross, T.cross + 0.4) * (1 - prog(t, T.skew - 0.3, T.skew));
    dot3(g, cam, F2.O1, { r: 7, k: crossK });
    const arc1 = prog(t, T.directly - 0.3, T.directly + 0.3) * (1 - lift);
    if (arc1 > 0) { const m = angleArc(g, cam, F2.O1, F2.UA, F2.UB, 0.75, { color: C.ink, w: 3, k: arc1, fill: false });
      it(g, `${F2_ANGLE}°`, m[0] + 6, m[1] + 6, 48, C.ink, { k: arc1 }); }
    // chéo nhau: "?" ở chỗ hai đường trông như cắt nhau
    if (lift > 0.5 && slide < 0.5) {
      const kq = prog(t, T.corner, T.corner + 0.3) * (1 - prog(t, T.slide, T.slide + 0.3));
      const ap = P([F2.O1[0] + F2.LIFT[0] - F2.LIFT[1] / Math.tan(60 / DEG), 0, 0]);
      it(g, '?', ap[0] - 10, ap[1] - 30, 72, C.ink, { k: kq });
      label(g, 'never meet', P(b0)[0] - 24, P(b0)[1] - 18, { size: 24, align: 'right', k: prog(t, T.never, T.never + 0.6) * (1 - prog(t, T.slide, T.slide + 0.3)) });
    }
    // gặp: chấm + góc đo ngay tại đó
    const kM = prog(t, T.meet, T.meet + 0.3);
    dot3(g, cam, F2.PM, { r: 7, k: kM });
    const arc2 = prog(t, T.measure, T.measure + 0.5);
    if (arc2 > 0) { const m = angleArc(g, cam, F2.PM, F2.UA, F2.UB, 0.75, { color: C.ink, w: 3 + 2 * prog(t, T.true, T.true + 0.3), k: arc2, fill: false });
      it(g, `${F2_ANGLE}°`, m[0] + 6, m[1] + 6, 48, C.ink, { k: prog(t, T.measure + 0.3, T.measure + 0.7) }); }
    // cùng hướng: mũi tên trên bóng ma và trên đường đã trượt
    const kD = prog(t, T.direction - 0.2, T.direction + 0.4);
    if (kD > 0) {
      const [g0, g1] = bSeg(F2.LIFT), [m0, m1] = bSeg(F2.MEET);
      g.save(); g.globalAlpha = kD;
      arrowHead(g, P(lerp3(g0, g1, 0.7)), P(g1), C.inkA(0.6)); arrowHead(g, P(lerp3(m0, m1, 0.7)), P(m1), C.ink); g.restore();
      label(g, 'same direction', P(g0)[0] - 24, P(g0)[1] + 8, { size: 24, align: 'right', k: kD });
    }

    // lời bên trái
    it(g, 'line · line', 96, 250, 64, C.ink, { k: prog(t, T.first, T.lines83 + 0.4) });
    it(g, 'skew: no corner to measure', 96, 330, 46, C.lead, { wt: 500, k: prog(t, T.skew, T.corner + 0.4) });
    it(g, 'slide it — don’t turn it', 96, 400, 46, C.ink, { wt: 500, k: prog(t, T.slide, T.without + 0.8) });
    // thước đo độ giấy: một phần tư, 0°–90°
    const kR = prog(t, T.convention, T.convention + 0.8);
    if (kR > 0) {
      const ox = 150, oy = 900, r = 300 * outCubic(kR), e = outCubic(kR);
      g.save(); g.fillStyle = 'rgba(120,80,50,0.16)'; g.beginPath(); g.moveTo(ox + 10, oy + 14); g.arc(ox + 10, oy + 14, r, -Math.PI / 2, 0); g.closePath(); g.fill();
      g.fillStyle = rgb(C.card); g.beginPath(); g.moveTo(ox, oy); g.arc(ox, oy, r, -Math.PI / 2, 0); g.closePath(); g.fill();
      g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke(); g.restore();
      for (let a = 0; a <= 90; a += 10) { const q = a / DEG, c = Math.cos(q), s = Math.sin(q);
        line(g, [ox + r * c, oy - r * s], [ox + (r - (a % 30 ? 16 : 30)) * c, oy - (r - (a % 30 ? 16 : 30)) * s], C.ink, 2, [], e); }
      const kz = prog(t, T.zero, T.zero + 0.3), kn = prog(t, T.ninety, T.ninety + 0.3);
      label(g, '0°', ox + r + 14, oy + 8, { size: 28, color: C.ink, k: kz });
      label(g, '90°', ox - 12, oy - r - 18, { size: 28, color: C.ink, k: kn });
      // kim chỉ góc vừa đo
      const q = F2_ANGLE / DEG; line(g, [ox, oy], [ox + (r - 40) * Math.cos(q), oy - (r - 40) * Math.sin(q)], C.ink, 4, [], prog(t, T.ninety + 0.2, T.ninety + 0.7));
      it(g, 'always between 0° and 90°', 96, 520, 46, C.ink, { wt: 500, k: prog(t, T.zero, T.end) });
    }

    lamp(g, 1500, 96, { s: 0.8, on: 0.5 });
    sectionTag(g, 'Act V · angle between two lines', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
