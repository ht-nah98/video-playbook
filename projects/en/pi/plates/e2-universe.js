// e2 · Our universe (p2 câu 79–84). Một tờ, camera trôi chậm:
//   trên: "C = π · d" trong khung chì, "ONLY TRUE IN FLAT SPACE"; ba mặt cắt nhỏ phẳng / cong lên / cong xuống
//   giữa: lưới in phẳng phối cảnh "OUR UNIVERSE · FLAT · WITHIN A FRACTION OF A PERCENT", vòng thường ngày C = π·d
//   vật nặng rơi xuống → lưới lún thành phễu (hố đen, nét chì); vòng xanh quanh hố, dây đo đường kính tụt xuống phễu → C ≠ π · d
//   dưới: "π didn't change. The world did." (shimmer); phải: π vẫn là 3.14159… nhưng không còn tả các vòng quanh ta
import { C, CG, PI, PI_DIGITS, smooth, outCubic, prog, ground, drift, card, typed, note, line, leader, check, arrow,
  lookup, must, mono } from '../kit.js';

const range = (a, b, n = 60) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
// phễu: độ lún theo khoảng cách tới tâm (chuẩn hoá f(0) = 1, mép lưới ≈ 0)
const funnel = r => Math.max(0, 0.15 / (r + 0.15) - 0.1) / 0.9;

export default class Universe {
  static ERA = 'vellum';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      formula: w(79, 'formula'), circum: w(79, 'circumference'), pi79: w(79, 'pi'), times79: w(79, 'times'), diam79: w(79, 'diameter'),
      only: w(79, 'only'), space79: w(79, 'space'), flat79: w(79, 'flat'), not1: w(79, 'not'), up: w(79, 'up'),
      not2: w(79, 'not', 2), down: w(79, 'down'),
      universe: w(80, 'universe'), flat80: w(80, 'flat'), scales: w(80, 'scales'), percent: w(80, 'percent'),
      school: w(80, 'school'), everyday: w(80, 'everyday'), circles80: w(80, 'circles'),
      einstein: w(81, "einstein's"), relativity: w(81, 'relativity'), heavy: w(81, 'heavy'), objects: w(81, 'objects'), curve: w(81, 'curve'), end81: L(81).end,
      draw: w(82, 'draw'), hole: w(82, 'hole'), black: w(82, 'black'), around: w(82, 'around', 2), longer: w(82, 'longer'),
      matches: w(82, 'matches'), across: w(82, 'across'),
      pi83: w(83, 'pi'), change: w(83, 'change'), world: w(83, 'world'), did: w(83, 'did', 1), end83: L(83).end,
      constant: w(84, 'constant'), geometry: w(84, 'geometry'), bends: w(84, 'bends'), still: w(84, 'still'), number: w(84, 'number'),
      stops: w(84, 'stops'), describing: w(84, 'describing'), circles84: w(84, 'circles'), end84: L(84).end,
    };
    this.START = L(79).start; this.FROM = this.START - 0.6;
    const T = this.T;
    for (const [a, b] of [[T.circum, T.diam79], [T.only, T.space79], [T.not1, T.down], [T.universe, T.scales], [T.flat80, T.percent],
      [T.heavy, T.curve], [T.draw, T.hole], [T.matches, T.across], [T.pi83, T.end83], [T.constant, T.geometry], [T.stops, T.circles84]])
      if (!(a < b)) throw new Error('e2: mốc ngược');
    this.PI = PI_DIGITS.slice(0, 7);
    must(`'${this.PI}' === String(Math.PI).slice(0, 7)`, true);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.pi79, kind: 'pen' }, { t: T.not1 + 0.2, kind: 'tick' }, { t: T.universe, kind: 'pen' }, { t: T.percent, kind: 'tick' },
      { t: T.circles80, kind: 'pen' }, { t: T.heavy, kind: 'tick' }, { t: T.hole, kind: 'pen' }, { t: T.pi83, kind: 'shimmer' },
      { t: T.geometry, kind: 'tick' }, { t: T.stops, kind: 'tick' },
    ];
  }
  // lưới phẳng phối cảnh: u ngang, v sâu (−1 xa, +1 gần); s = mức lún (0 phẳng → 1 phễu)
  P(u, v, s) {
    const cx = 960, cy = 640, q = 1 + 0.2 * v, z = s * funnel(Math.hypot(u, v));
    return [cx + 480 * u * q, cy + 190 * v + 230 * z * q];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 1.4, vy: 0.8, max: 50 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.top(g, t); this.grid(g, t); this.right(g, t);
    // "π didn't change. The world did."
    const y = 980, f = `italic 600 72px ${CG}`, fp = `italic 700 72px ${CG}`;
    g.save(); g.font = f; const w1 = g.measureText(" didn't change. ").width, w2 = g.measureText('The world did.').width; g.font = fp; const wp = g.measureText('π').width; g.restore();
    const x0 = 960 - (wp + w1 + w2) / 2;
    typed(g, 'π', x0, y, prog(t, T.pi83 - 0.05, T.pi83 + 0.1), fp, C.blue);
    typed(g, " didn't change.", x0 + wp, y, prog(t, T.pi83 + 0.1, T.change + 0.3), f, C.ink);
    typed(g, 'The world did.', x0 + wp + w1, y, prog(t, T.world - 0.1, T.end83 + 0.2), f, C.ink);
    g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'IV', 'OUR UNIVERSE', 'flat space · 1915');
  }
  top(g, t) {
    const T = this.T;
    const kb = prog(t, T.formula + 0.1, T.circum);       // khung chì quanh công thức
    line(g, [[150, 170], [630, 170], [630, 285], [150, 285], [150, 170]], C.lead, 1.4, { k: kb });
    const f = `italic 600 96px ${CG}`;
    typed(g, 'C =', 180, 262, prog(t, T.circum, T.pi79 - 0.1), f, C.ink);
    typed(g, 'π', 330, 262, prog(t, T.pi79, T.pi79 + 0.15), `italic 700 96px ${CG}`, C.blue);
    typed(g, '· d', 395, 262, prog(t, T.times79, T.diam79 + 0.3), f, C.ink);
    note(g, 'only true in flat space', 154, 326, prog(t, T.only, T.space79 + 0.4), { color: C.ink, size: 22 });
    note(g, 'π · the constant of flat geometry', 154, 364, prog(t, T.constant - 0.1, T.geometry + 0.5), { color: C.blue, size: 22 });
    // ba mặt cắt: phẳng / cong lên / cong xuống
    const prof = [[800, T.flat79, 0, 'FLAT · C = π·d', C.ink], [1030, T.not1, -1, 'UP · C ≠ π·d', C.leadT], [1260, T.not2, 1, 'DOWN · C ≠ π·d', C.leadT]];
    for (const [x, a, bend, lab, col] of prof) {
      const k = prog(t, a, a + 0.6);
      line(g, range(-1, 1, 30).map(u => [x + 85 * u, 255 + bend * 34 * (1 - u * u)]), bend ? C.lead : C.ink, 3, { k });
      mono(g, lab, x, 320, k * 1.4 - 0.3, bend ? C.leadT : C.blue, 18, 'center');
    }
    if (t > T.flat79 + 0.5) check(g, 900, 232, 14, prog(t, T.flat79 + 0.5, T.flat79 + 0.8), { w: 4 });
  }
  grid(g, t) {
    const T = this.T, s = this.sinkK(t), kg = prog(t, T.universe, T.scales + 0.3);
    const col = C.leadT;
    for (let i = 0; i <= 16; i++) {                      // đường u = hằng (chạy theo chiều sâu)
      const u = -1 + i / 8, k = prog(kg, i / 34, i / 34 + 0.5);
      line(g, range(-1, 1, 70).map(v => this.P(u, v, s)), i % 8 ? col : C.ink, i % 8 ? 1.1 : 1.6, { k });
    }
    for (let j = 0; j <= 12; j++) {
      const v = -1 + j / 6, k = prog(kg, 0.3 + j / 40, 0.3 + j / 40 + 0.4);
      line(g, range(-1, 1, 90).map(u => this.P(u, v, s)), j % 12 ? col : C.ink, j % 12 ? 1.1 : 1.6, { k });
    }
    const [lx, ly] = this.P(-1, -1, 0);
    note(g, 'our universe · flat · within a fraction of a percent', lx, ly - 24, prog(t, T.universe, T.percent + 0.4), { color: C.ink, size: 20 });
    // vòng thường ngày: phẳng, đúng π
    const ev = range(0, 2 * PI + 0.16, 80).map(a => this.P(-0.62 + 0.17 * Math.cos(a), 0.45 + 0.17 * Math.sin(a), s));
    line(g, ev, C.blue, 3.5, { k: prog(t, T.everyday, T.circles80 + 0.5) });
    const [ex, ey] = this.P(-0.79, 0.45, s);
    leader(g, [[ex, ey], [ex - 60, ey], [330, ey]], prog(t, T.circles80, T.circles80 + 0.4));
    note(g, 'everyday', 150, ey - 14, prog(t, T.school, T.everyday + 0.3), { color: C.ink, size: 20 });
    mono(g, 'C = π·d', 150, ey + 22, prog(t, T.circles80, T.circles80 + 0.5), C.blue, 20);
    // vật nặng rơi xuống tâm, thành hố đen
    const kd = prog(t, T.heavy - 0.3, T.heavy + 0.25);
    if (kd > 0) {
      const [hx, hy] = this.P(0, 0, s), yy = hy - 18 - (1 - outCubic(kd)) * 260;
      g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(hx, yy, 22, 0, 7); g.fill();
      const kh = prog(t, T.black, T.hole + 0.2);
      if (kh > 0) { g.fillStyle = '#000'; g.beginPath(); g.arc(hx, yy, 22 + 6 * kh, 0, 7); g.fill(); }
      g.restore();
    }
    // vòng xanh quanh hố + dây đường kính men theo phễu
    const r = 0.32, rg = range(-PI / 2, -PI / 2 + (2 * PI + 0.16), 120).map(a => this.P(r * Math.cos(a), r * Math.sin(a), s));
    line(g, rg, C.blue, 4.5, { k: prog(t, T.draw + 0.2, T.hole + 0.4) });
    const kc = prog(t, T.across - 0.3, T.across + 0.6);
    line(g, range(-r, r, 80).map(u => this.P(u, 0, s)), C.ink, 4, { k: kc });
    if (kc >= 1) for (const u of [-r, r]) { const [x, y] = this.P(u, 0, s); g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 5.5, 0, 7); g.fill(); g.restore(); }
  }
  sinkK(t) { return smooth(prog(t, this.T.heavy + 0.2, this.T.curve + 0.5)); }
  right(g, t) {
    const T = this.T, x = 1540;
    mono(g, "EINSTEIN ·", x, 470, prog(t, T.einstein, T.einstein + 0.4));
    mono(g, 'GENERAL RELATIVITY', x, 505, prog(t, T.einstein + 0.5, T.relativity + 0.5));
    const [hx, hy] = this.P(0, 0, 1);
    leader(g, [[hx + 34, hy - 24], [x - 30, 570], [x - 10, 570]], prog(t, T.black - 0.2, T.hole));
    mono(g, 'BLACK HOLE', x, 578, prog(t, T.black, T.hole + 0.4));
    const f = `italic 600 72px ${CG}`;
    typed(g, 'C ≠', x, 680, prog(t, T.longer, T.matches + 0.2), f, C.ink);
    typed(g, 'π', x + 108, 680, prog(t, T.matches + 0.4, T.matches + 0.55), `italic 700 72px ${CG}`, C.blue);
    typed(g, '· d', x + 154, 680, prog(t, T.matches + 0.6, T.across + 0.2), f, C.ink);
    // π vẫn còn đó, như một con số
    typed(g, 'π', x, 780, prog(t, T.still - 0.2, T.still), `italic 700 72px ${CG}`, C.blue);
    typed(g, '= ' + this.PI + '…', x + 52, 780, prog(t, T.still, T.number + 0.4), `600 54px ${CG}`, C.ink);
    note(g, 'still there', x, 820, prog(t, T.number, T.number + 0.5), { size: 20 });
    note(g, 'stops describing', x, 880, prog(t, T.stops, T.describing), { color: C.ink, size: 20 });
    note(g, 'these circles', x, 912, prog(t, T.circles84 - 0.2, T.circles84 + 0.4), { color: C.ink, size: 20 });
    const [rx, ry] = this.P(0.32, 0.1, 1);
    arrow(g, x - 20, 870, rx + 18, ry + 6, prog(t, T.bends, T.bends + 0.5), { color: C.leadT, w: 2, bend: -40 });
  }
}
