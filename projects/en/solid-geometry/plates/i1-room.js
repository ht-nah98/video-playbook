// i1 · How much room — MỞ HỒI VIII "Volume". Hộp bìa mở nắp (cạnh = 1 m) gấp vách lên; "how much water" → nước
// (mực xanh nhạt) dâng trong hộp; "cubic units" → nhãn 1 m ở ba cạnh, m³ / cm³ viết ở cột trái.
import { C, prog, lookup, must, outCubic, smooth, ground, pool, camera, sheet, shadow, lamp, it, label, sectionTag,
  actCard, dark, add, mul, sub, dot, clamp, poly } from '../kit.js';

const S = 2.4;                                   // cạnh hộp trên hình (thế giới) — nhãn "1 m"
const LAMP = [-2.6, -1.6, 10];                   // đèn của cảnh (thế giới): trên-trái-trước → bóng ngả sau-phải
const CAM = { yaw: -32, pitch: 46, dist: 11.2, target: [1.25, 1.2, 0.9], cx: 1250, cy: 640 };
// bốn vách: cạnh đáy (a → b) + pháp tuyến ngoài nằm ngang
const WALLS = [
  { a: [0, 0, 0], b: [S, 0, 0], n: [0, -1, 0] }, { a: [S, 0, 0], b: [S, S, 0], n: [1, 0, 0] },
  { a: [S, S, 0], b: [0, S, 0], n: [0, 1, 0] }, { a: [0, S, 0], b: [0, 0, 0], n: [-1, 0, 0] },
];
const FLOOR = [[0, 0, 0], [S, 0, 0], [S, S, 0], [0, S, 0]];
const WATER = 2.05;                              // mực nước cuối (thế giới)

/** Đèn chớp tắt–bật 0.3 s quanh tF (DNA §7): 1 = sáng, ~0.1 = tối. */
const flicker = (t, tF) => 1 - 0.9 * clamp(1 - Math.abs(t - tF) / 0.15);

export default class Room {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'i1');
    this.START = L(156).start;
    this.FROM = Math.max(this.START - 2.6, L(155).end + 0.5);
    // trang lật 0.9 s từ FROM: chớp đèn khi tờ mới đã vào hẳn (START − 2.4 rơi trước FROM)
    this.tF = Math.max(this.START - 2.4, this.FROM + 0.95);
    this.T = {
      space: w(156, 'space'), water: w(156, 'water'), hold: w(156, 'hold'), end156: L(156).end,
      cubic: w(157, 'cubic', 1), meters: w(157, 'meters'), centi: w(157, 'centimeters'), end: L(157).end,
    };
    must('1 × 1 × 1', 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: this.tF + 0.1, kind: 'shimmer' }, { t: this.START + 0.15, kind: 'flap' }, { t: T.cubic, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, st = this.START;
    ground(g);
    const on = flicker(t, this.tF);
    const drift = Math.min(Math.max(0, t - st) * 0.4, 4.5);
    const cam = camera({ ...CAM, yaw: CAM.yaw + drift }), P = cam.P;

    // vũng sáng + đèn (đèn ở mép trên, phía trên-trái hộp)
    const pc = P([S / 2, S / 2, 0]);
    g.save(); g.globalAlpha = on; pool(g, pc[0] - 60, pc[1] - 40, 620, 0.55); g.restore();

    // hộp: vách gấp lên từ phẳng (START → +0.9)
    const kF = outCubic(prog(t, st - 0.15, st + 0.85));
    if (kF > 0) {
      const ang = kF * Math.PI / 2, kIn = clamp(kF * 3);
      const walls = WALLS.map(W => { const off = add(mul(W.n, Math.cos(ang) * S), [0, 0, Math.sin(ang) * S]);
        return { ...W, c: [W.a, W.b, add(W.b, off), add(W.a, off)], near: dot(W.n, sub(cam.pos, W.a)) > 0 }; });
      shadow(g, cam, [...FLOOR, ...walls.flatMap(W => W.c.slice(2))], LAMP, { a: 0.4 * kIn });
      sheet(g, cam, FLOOR, { k: kIn, thick: 0.04 });
      const far = walls.filter(W => !W.near), near = walls.filter(W => W.near);
      far.forEach(W => sheet(g, cam, W.c, { k: kIn, thick: 0.04, fill: [240, 233, 218] }));
      // nước: dâng ở "water" — tô vách xa dưới mực nước, mặt nước ở z = h
      const h = WATER * smooth(prog(t, T.water - 0.1, T.end156 + 0.7));
      if (h > 0.01 && kF >= 1) {
        g.save();
        far.forEach(W => { g.fillStyle = C.inkA(0.16); poly(g, [W.a, W.b, add(W.b, [0, 0, h]), add(W.a, [0, 0, h])].map(P)); g.fill(); });
        const top = FLOOR.map(p => P([p[0], p[1], h]));
        g.fillStyle = C.inkA(0.2); poly(g, top); g.fill();
        g.strokeStyle = C.inkA(0.55); g.lineWidth = 2.5; poly(g, top); g.stroke();
        // gợn sáng trên mặt nước (theo t, tất định)
        const ph = t * 1.3;
        [0.3, 0.55, 0.78].forEach((u, i) => { const v = 0.25 + 0.5 * ((u + ph * 0.07 * (i + 1)) % 1);
          const a = P([S * 0.18, S * v, h]), b = P([S * (0.5 + 0.3 * u), S * v, h]);
          g.strokeStyle = 'rgba(255,250,236,0.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); });
        g.restore();
      }
      near.forEach(W => sheet(g, cam, W.c, { k: kIn, thick: 0.04 }));

      // "cubic units": nhãn 1 m ở ba cạnh (thấy được: đáy trước, đáy phải, cạnh dọc trước-phải)
      const kU = prog(t, T.cubic, T.cubic + 0.6);
      if (kU > 0) {
        // cạnh thấy được: đáy trước, đáy trái, cạnh dọc trước-phải
        const m1 = P([S / 2, 0, 0]), m2 = P([0, S / 2, 0]), m3 = P([S, 0, S / 2]);
        it(g, '1 m', m1[0] + 20, m1[1] + 78, 44, C.ink, { k: kU, align: 'center' });
        it(g, '1 m', m2[0] - 34, m2[1] + 34, 44, C.ink, { k: kU, align: 'right' });
        it(g, '1 m', m3[0] + 24, m3[1] + 14, 44, C.ink, { k: kU });
      }
    }
    lamp(g, 900, 150, { on: on * (0.6 + 0.4 * prog(t, this.tF, this.tF + 0.3)) });

    // cột chữ trái
    sectionTag(g, 'Act VIII · volume', prog(t, st, st + 0.6));
    it(g, 'How much space?', 96, 270, 72, C.ink, { k: prog(t, T.space - 0.2, T.space + 0.6) });
    it(g, 'how much water would it hold?', 96, 340, 46, C.lead, { wt: 500, k: prog(t, T.water - 0.1, T.hold + 0.4) });
    label(g, 'cubic units', 96, 450, { size: 26, k: prog(t, T.cubic, T.cubic + 0.5) });
    it(g, '1 m × 1 m × 1 m = 1 m³', 96, 530, 54, C.ink, { k: prog(t, T.meters - 0.3, T.meters + 0.9) });
    it(g, '1 cm × 1 cm × 1 cm = 1 cm³', 96, 610, 54, C.ink, { k: prog(t, T.centi - 0.3, T.centi + 0.7) });

    actCard(g, t, st, 'ACT EIGHT', 'Volume');
    dark(g, on);
  }
}
