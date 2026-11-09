// j5 · Archimedes' favorite (câu 190–193). Cầu giấy và ống trụ bìa treo bằng chỉ dưới đèn rọi thẳng xuống; cầu bay vào
// ống → bóng hai cái trùng một vòng (cam đậm, shimmer); "sphere = ⅔ cylinder" tính từ ⁴⁄₃πr³ và πr²·2r; "tomb" → khối
// đá bìa trồi lên đỡ hai vật, hình cầu-trong-trụ khắc lên mặt trước; tranh Benjamin West (Cicero tìm mộ) trượt vào,
// khoanh quả cầu trên mộ trong tranh ở "carving" và nối tới hình khắc.
import { C, prog, lookup, must, outCubic, smooth, ground, camLerp, solid, shadow, thread, lamp, line, it, label, formula, photo,
  sectionTag, revolve, sphere, box, add, poly, clamp } from '../kit.js';

const R = 1, HV = 0.9, CX = 0.8;
const L = [CX, 0, 12];
const CAM0 = { yaw: -22, pitch: 20, dist: 11.5, target: [0.2, 0, 1.7], cx: 1300, cy: 610 };
const CAM1 = { yaw: -18, pitch: 20, dist: 12.5, target: [0.8, 0, 1.3], cx: 1390, cy: 600 };
const SPH = sphere(R, 40, 20), TUBE = revolve(R, 2 * R, R, 60), BLOCK = box(3.2, 2.4, HV);
const PH = { x: 96, y: 520, h: 400 }, PW = 400 * 1920 / 1308;   // tranh 1920×1308; quả cầu trên mộ ở (0.937, 0.115)

/** Bóng chiếu thẳng xuống của vật tròn (đĩa bán kính r tâm (x, y) trên bàn), mép mềm. */
function blob(g, cam, x, y, r, a) {
  for (let i = 0; i < 5; i++) { g.fillStyle = `rgba(150,74,38,${a / 5})`;
    poly(g, Array.from({ length: 48 }, (_, j) => { const u = j * Math.PI / 24, rr = r * (0.96 + 0.03 * i); return cam.P([x + rr * Math.cos(u), y + rr * Math.sin(u), 0]); })); g.fill(); }
}
function circ3(g, cam, c, r, { color = C.terra, w = 4, k = 1, dash = [] } = {}) {
  const n = 64, m = Math.ceil(n * clamp(k)); if (k <= 0) return;
  for (let i = 0; i < m; i++) { const a = -Math.PI / 2 + 2 * Math.PI * i / n, b = -Math.PI / 2 + 2 * Math.PI * Math.min(i + 1, n * k) / n;
    line(g, cam.P(add(c, [r * Math.cos(a), r * Math.sin(a), 0])), cam.P(add(c, [r * Math.cos(b), r * Math.sin(b), 0])), color, w, dash); }
}

export default class Archimedes {
  static ERA = 'desk';
  static POSES = [];
  static IMAGES = { cicero: './assets/history/cicero-tomb.jpg' };
  init({ tl }) {
    const { L: Ln, w } = lookup(tl, 'j5');
    this.T = {
      story: w(190, 'story'), formulas: w(190, 'formulas'),
      sphere: w(191, 'sphere'), inside: w(191, 'inside'), cyl: w(191, 'cylinder'), two: w(191, 'two'), cyls: w(191, "cylinder's"),
      proud: w(192, 'proud'), carved: w(192, 'carved'), tomb: w(192, 'tomb'),
      hundred: w(193, 'hundred'), years: w(193, 'years'), cicero: w(193, 'cicero'), syracuse: w(193, 'syracuse'),
      carving: w(193, 'carving'), cleaned: w(193, 'cleaned'), end: Ln(193).end,
    };
    this.START = Ln(190).start;
    this.FROM = Math.max(this.START - 1.2, Ln(189).end + 0.5);
    // ⅔ của Archimedes: V cầu = ⁴⁄₃πr³, V trụ = πr²·2r = 2πr³ (r = 1) → tỉ số ⅔
    const Vs = 4 / 3 * Math.PI * R ** 3, Vc = Math.PI * R ** 2 * (2 * R);
    must(`${Vc}`, 2 * Math.PI); must(`(4/3)/2`, 2 / 3); must(`${Vs / Vc}`, 2 / 3);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.inside + 0.4, kind: 'shimmer' }, { t: T.carved, kind: 'flap' }, { t: T.cicero, kind: 'flap' }, { t: T.carving, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const drift = Math.min((t - this.FROM) * 0.3, 5);
    const mv = smooth(prog(t, T.proud, T.tomb + 0.4));
    const cam = camLerp({ ...CAM0, yaw: CAM0.yaw + drift }, { ...CAM1, yaw: CAM1.yaw + drift }, mv), P = cam.P;

    // ── trạng thái ──
    const kS = outCubic(prog(t, this.FROM + 0.3, this.FROM + 0.9)), kT = outCubic(prog(t, T.story - 0.2, T.story + 0.4));
    const s = smooth(prog(t, T.sphere, T.inside + 0.5));
    const up = s < 0.6 ? smooth(s / 0.6) : 1 - smooth((s - 0.6) / 0.4);
    const sc = [-1.6 + (CX + 1.6) * smooth(Math.min(1, s / 0.6)), 0, HV + R + 2.3 * up];
    const kB = outCubic(prog(t, T.carved, T.tomb + 0.4));
    const kCo = prog(t, T.inside + 0.3, T.inside + 0.8) * (1 - prog(t, T.carved, T.carved + 0.4));
    const slack = 1 - smooth(prog(t, T.tomb + 0.2, T.tomb + 1.0));

    // ── bóng thẳng xuống (trước khi khối đá trồi lên) ──
    const kBl = 1 - prog(t, T.carved, T.carved + 0.5);
    if (kBl > 0) { if (kS > 0) blob(g, cam, sc[0], 0, R * kS, 0.4 * kBl); if (kT > 0) blob(g, cam, CX, 0, R * kT, 0.4 * kBl); }
    if (kCo > 0) { circ3(g, cam, [CX, 0, 0], R, { k: kCo, w: 5 });
      const q = P([CX + R, -R, 0]); label(g, 'one shadow', q[0] + 20, q[1] + 34, { size: 28, color: C.terraT, k: kCo }); }

    // ── khối đá (mộ) trồi lên đỡ hai vật; hình khắc ở mặt trước ──
    if (kB > 0) {
      const B3 = BLOCK.V.map(([x, y, z]) => [x + CX - 1.6, y - 1.2, z * kB]);
      shadow(g, cam, B3, [-1.4, 3, 8], { a: 0.35 });
      solid(g, cam, BLOCK, B3, L, { base: C.card });
      const kc = prog(t, T.tomb, T.tomb + 0.9), fw = 3 + 2 * prog(t, T.cleaned, T.cleaned + 0.4), zc = HV / 2, y0 = -1.2;
      if (kB >= 1 && kc > 0) {
        const sq = [[CX - 0.36, y0, zc - 0.36], [CX + 0.36, y0, zc - 0.36], [CX + 0.36, y0, zc + 0.36], [CX - 0.36, y0, zc + 0.36]].map(P);
        sq.forEach((p, i) => line(g, p, sq[(i + 1) % 4], C.ink, fw, [], clamp(kc * 4 - i)));
        const n = 40, m = Math.ceil(n * kc);
        for (let i = 0; i < m; i++) { const a = 2 * Math.PI * i / n, b = 2 * Math.PI * (i + 1) / n;
          line(g, P([CX + 0.34 * Math.cos(a), y0, zc + 0.34 * Math.sin(a)]), P([CX + 0.34 * Math.cos(b), y0, zc + 0.34 * Math.sin(b)]), C.ink, fw); }
      }
    }

    // ── chỉ treo ──
    const hang = (p, k) => { if (k > 0 && slack > 0) thread(g, cam, add(p, [0, 0, 7]), p, { w: 1.5, color: C.inkA(0.6), k: k * slack }); };
    hang(add(sc, [0, 0, R]), kS);
    hang([CX - R, 0, HV + 2 * R], kT); hang([CX + R, 0, HV + 2 * R], kT);

    // ── cầu rồi ống (ống bìa mờ để thấy cầu bên trong) ──
    if (kS > 0) solid(g, cam, SPH, SPH.V.map(v => add([v[0] * kS, v[1] * kS, v[2] * kS], sc)), L);
    if (kT > 0) solid(g, cam, TUBE, TUBE.V.map(([x, y, z]) => [x + CX, y, HV + z * kT]), L, { alpha: 0.45, k: kT });

    lamp(g, clamp(P([CX, 0, 0])[0], 640, 1700), 150, { on: 1 });

    // ── chữ ──
    sectionTag(g, "Act IX · Archimedes' favorite", prog(t, this.FROM + 0.3, this.FROM + 1));
    const kF1 = prog(t, T.formulas, T.formulas + 0.6);
    formula(g, ['sphere   ', { frac: ['4', '3'] }, 'πr³'], 96, 250, 64, C.ink, kF1 < 1 ? kF1 * 0.67 : 1);
    it(g, 'cylinder   πr² · 2r = 2πr³', 96, 335, 64, C.ink, { k: prog(t, T.cyl, T.cyl + 1.0) });
    const kF3 = t < T.two ? 0 : t < T.two + 0.3 ? 1 / 3 : t < T.cyls ? 2 / 3 : 1;
    formula(g, ['sphere = ', { frac: ['2', '3'] }, ' cylinder'], 96, 470, 104, C.ink, kF3);

    // ── 150 năm sau: tranh West, Cicero ở Syracuse, khoanh hình khắc ──
    label(g, '≈ 150 years later', 730, 850, { size: 28, color: C.ink, k: prog(t, T.hundred, T.years + 0.2) });
    it(g, 'Cicero, in Syracuse', 730, 915, 46, C.lead, { wt: 500, k: prog(t, T.cicero, T.syracuse + 0.5) });
    const kP = prog(t, T.cicero - 0.3, T.cicero + 0.5);
    photo(g, 'cicero', PH.x, PH.y, PH.h, kP, { credit: 'Benjamin West · 1797 · Yale University Art Gallery' });
    const kR = prog(t, T.carving - 0.1, T.carving + 0.5);
    if (kR > 0) {
      const cx = PH.x + 0.937 * PW, cy = PH.y + 0.115 * PH.h, n = 40, m = Math.ceil(n * kR);
      for (let i = 0; i < m; i++) { const a = -2 + 2 * Math.PI * i / n, b = -2 + 2 * Math.PI * (i + 1) / n;
        line(g, [cx + 36 * Math.cos(a), cy + 36 * Math.sin(a)], [cx + 36 * Math.cos(b), cy + 36 * Math.sin(b)], C.lamp, 7);
        line(g, [cx + 36 * Math.cos(a), cy + 36 * Math.sin(a)], [cx + 36 * Math.cos(b), cy + 36 * Math.sin(b)], C.ink, 3.5); }
      const tgt = P([CX - 0.5, -1.2, HV / 2]);
      line(g, [cx + 40, cy + 8], [tgt[0] - 10, tgt[1]], C.ink, 2.5, [8, 10], prog(t, T.carving + 0.3, T.carving + 1.0));
    }
  }
}
