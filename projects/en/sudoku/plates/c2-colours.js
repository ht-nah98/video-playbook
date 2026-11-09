// c2 · Red and blue — lắp kính ĐỎ đúng lúc gọi tên: hàng 3, hàng 7, khối 4 ("left"), khối 6 ("right") → "4 FULL SETS";
// kính XANH gân: cột 1–2 ("first two"), cột 8–9 ("last two") → "4 FULL SETS"; ô thuộc cả hai thành kính đôi 'dbl';
// "same digits" → cân "4 sets = 4 sets" dưới ô cửa. Ô cửa (712, 132, 80) như c3/c4.
import { C, prog, lookup, must, ground, window9, it, label, eq, sectionTag, PHI, CELLS, boxOf } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const key = cells => cells.map(([r, c]) => r * 9 + c).sort((a, b) => a - b).join();
const RED = [
  { name: 'row 3', cells: CELLS.filter(([r]) => r === 2) },
  { name: 'row 7', cells: CELLS.filter(([r]) => r === 6) },
  { name: 'box 4 · left of middle', cells: CELLS.filter(([r, c]) => boxOf(r, c) === 3) },
  { name: 'box 6 · right of middle', cells: CELLS.filter(([r, c]) => boxOf(r, c) === 5) },
];
const BLUE = [
  { name: 'columns 1, 2', cells: CELLS.filter(([, c]) => c <= 1), n: 2 },
  { name: 'columns 8, 9', cells: CELLS.filter(([, c]) => c >= 7), n: 2 },
];
const SETS_R = RED.length, SETS_B = BLUE.reduce((s, b) => s + b.n, 0);

export default class Colours {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      red: w(20, 'red'), three: w(20, 'three'), seven: w(20, 'seven'), boxes: w(20, 'boxes'), left: w(20, 'left'), right: w(20, 'right'),
      regions: w(21, 'regions'), fullR: w(21, 'full'), blue: w(22, 'blue'), first: w(22, 'first'), last: w(22, 'last'),
      also: w(23, 'also'), fullB: w(23, 'full'), same: w(24, 'same'), four: w(24, 'four'),
    };
    [this.T.three, this.T.seven, this.T.left, this.T.right].forEach((tt, i) => (RED[i].t = tt));
    [this.T.first, this.T.last].forEach((tt, i) => (BLUE[i].t = tt));
    this.START = L(20).start;
    this.FROM = Math.max(this.START - 1.2, L(19).end + 0.5);
    // tô đúng tập của kit; số lên hình tính bằng code
    must(`'${key(RED.flatMap(x => x.cells))}' === '${key(CELLS.filter(([r, c]) => PHI.red(r, c)))}'`, true);
    must(`'${key(BLUE.flatMap(x => x.cells))}' === '${key(CELLS.filter(([r, c]) => PHI.blue(r, c)))}'`, true);
    must(`${RED.flatMap(x => x.cells).length}`, 36); must(`${SETS_R}`, 4); must(`${SETS_B}`, 4);
    // mốc lắp từng ô: so le nhẹ theo thứ tự trong dải
    this.tR = new Map(); this.tB = new Map();
    RED.forEach(x => x.cells.forEach(([r, c], i) => this.tR.set(r * 9 + c, x.t + i * 0.035)));
    BLUE.forEach(x => x.cells.forEach(([r, c], i) => this.tB.set(r * 9 + c, x.t + (i % 9) * 0.04 + ((i / 9) | 0) * 0.02)));
  }
  sfx() {
    const T = this.T;
    return [...RED.map(x => ({ t: x.t, kind: 'chip' })), { t: T.fullR, kind: 'pen' },
      ...BLUE.map(x => ({ t: x.t, kind: 'chip' })), { t: T.fullB, kind: 'pen' }, { t: T.same, kind: 'shimmer' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const kR = (r, c) => (this.tR.has(r * 9 + c) ? prog(t, this.tR.get(r * 9 + c), this.tR.get(r * 9 + c) + 0.45) : 0);
    const kB = (r, c) => (this.tB.has(r * 9 + c) ? prog(t, this.tB.get(r * 9 + c), this.tB.get(r * 9 + c) + 0.45) : 0);
    const kindOf = (r, c) => { const a = kR(r, c) > 0, b = kB(r, c) > 0; return a && b ? 'dbl' : b ? 'blue' : a ? 'red' : 'clear'; };
    window9(g, X0, Y0, CS, {
      kindOf,
      kOf: (r, c) => { const k = kindOf(r, c); return k === 'dbl' ? 0.55 + 0.45 * kB(r, c) : k === 'blue' ? 0.3 + 0.7 * kB(r, c) : k === 'red' ? 0.3 + 0.7 * kR(r, c) : 1; },
    });

    // trái: tập ĐỎ, gọi tên tới đâu khắc tới đó
    it(g, 'red', 96, 220, 72, C.redT, { k: prog(t, T.red - 0.1, T.red + 0.3) });
    RED.forEach((x, i) => label(g, x.name, 96, 290 + i * 44, { size: 22, color: C.redT, k: prog(t, x.t, x.t + 0.4) }));
    it(g, `${SETS_R} full sets`, 96, 540, 52, C.redT, { k: prog(t, T.fullR - 0.2, T.fullR + 0.5) });
    label(g, `${SETS_R} regions`, 96, 590, { size: 20, k: prog(t, T.regions, T.regions + 0.4) });

    // phải: tập XANH (gân)
    const XR = 1500;
    it(g, 'blue', XR, 220, 72, C.blueT, { k: prog(t, T.blue - 0.1, T.blue + 0.3) });
    BLUE.forEach((x, i) => label(g, x.name, XR, 290 + i * 44, { size: 22, color: C.blueT, k: prog(t, x.t, x.t + 0.4) }));
    it(g, `${SETS_B} full sets`, XR, 540, 52, C.blueT, { k: prog(t, T.fullB - 0.2, T.fullB + 0.5) });
    label(g, `${SETS_B} columns`, XR, 590, { size: 20, k: prog(t, T.also, T.also + 0.4) });

    // dưới: cân
    eq(g, [[`${SETS_R} sets`, C.redT], [' = '], [`${SETS_B} sets`, C.blueT]], 1072, 966, 72, { align: 'center', k: prog(t, T.same - 0.2, T.same + 0.5) });
    label(g, 'same digits · four of each, 1 to 9', 1072, 1008, { size: 20, align: 'center', k: prog(t, T.four, T.four + 0.6) });

    sectionTag(g, 'ACT II · RED AND BLUE', prog(t, this.FROM + 0.3, this.FROM + 0.9));
  }
}
