// b11 · Lemons (pH) — DNA blocks. "pH" thẻ lớn + nước đóng chai / đất vườn → "− log (hydrogen ion)": dấu − tím + khối log tím + thẻ →
// THÁP TREO NGƯỢC 5 tầng ×10 dưới mép bàn: nước tinh khiết 7 ở trên, chanh 2 ở dưới, sticker −1 … −5 đếm bậc ("five steps") →
// thẻ "×100,000". Mascot pointer (trái) nói câu 53–54.
import { H, C, AR, prog, lookup, must, outCubic, ground, block, tower, sticker, tag, icon, figure, secTag, line, PH, TABLE_Y } from '../kit.js';

const sway = (t, ph = 0) => 0.018 * Math.sin(t * 2.1 + ph);
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };

export default class Lemons {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b11');
    this.T = {
      ph: w(51, 'p'), bottled: w(51, 'bottled'), garden: w(51, 'garden'),
      log: w(52, 'logarithm'), hyd: w(52, 'hydrogen'), minus: w(52, 'minus'),
      water: w(53, 'water'), seven: w(53, 'seven'), lemon: w(53, 'lemon'), two: w(53, 'two'),
      five: w(54, 'five'), steps: w(54, 'steps'), hundred: w(54, 'hundred'), more: w(54, 'more'), end54: L(54).end,
    };
    this.START = L(51).start;
    this.FROM = Math.max(this.START - 1.2, L(50).end + 0.5);
    this.PH0 = Math.min(this.T.ph - 0.2, this.FROM + 1.0);        // thẻ pH lớn vào ngay khi trượt xong (không khung trống)
    this.TOWER = this.T.seven - 0.1;                              // 5 tầng treo xuống, tới "two"
    this.CLEAR = this.T.water - 0.5;                              // thẻ nước chai / đất bay đi
    must(`10 ** (7 - 2)`, PH);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.PH0, 'pop'), c(T.log + 0.1, 'wood'), c(T.minus, 'pop'), c(this.TOWER + 0.1, 'wood'), c(this.TOWER + 0.35, 'wood'), c(T.lemon + 0.3, 'pop'),
      c(T.five, 'tick'), c(T.five + 0.4, 'tick'), c(T.hundred, 'card')];
  }
  render(g, t) {
    const T = this.T, TX = 1500, hh = 96, ww = 130, HB = 300;
    ground(g, 'table');
    // ô chờ cho tháp treo (nét đứt dưới mép bàn) ngay từ FROM
    const ks = prog(t, this.FROM + 0.3, this.FROM + 0.7), kd = prog(t, this.TOWER, this.TOWER + 0.3);
    if (ks > 0 && kd < 1) { g.save(); g.globalAlpha = ks; g.setLineDash([10, 9]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3;
      for (let i = 0; i < 5; i++) g.strokeRect(TX - ww / 2, HB + i * hh + 2, ww, hh - 4); g.restore(); }
    // pH + nước đóng chai / đất vườn
    const clear = outCubic(prog(t, this.CLEAR, this.CLEAR + 0.6)) ** 1.5 * 800;
    if (clear < 800) {
      tag(g, 'pH', 620, 300 - clear * 0.5, { size: 96, weight: 900, edge: C.log, color: C.logInk, k: prog(t, this.PH0, this.PH0 + 0.4), rot: sway(t, 1), minW: 220 });
      const kb = prog(t, T.bottled, T.bottled + 0.35), kg = prog(t, T.garden, T.garden + 0.35);
      if (kb > 0) line(g, 1040, -10, 1040, 330 - clear, C.string, 2.5);
      tag(g, 'BOTTLED WATER', 1040, 360 - clear, { size: 38, k: kb, rot: sway(t, 2) });
      if (kg > 0) line(g, 1040, 396 - clear, 1040, 450 - clear, C.string, 2.5);
      tag(g, 'GARDEN SOIL', 1040, 480 - clear, { size: 38, k: kg, rot: sway(t, 3) });
    }
    // − log (hydrogen ion)
    const kl = prog(t, T.log - 0.05, T.log + 0.35), kh = prog(t, T.hyd, T.hyd + 0.4), km = prog(t, T.minus, T.minus + 0.3);
    block(g, 640, 860, 140, { color: C.log, label: 'log', k: kl });
    sticker(g, '−', 470, 800, { r: 48, k: km });
    const hl = outCubic(prog(t, T.water - 0.6, T.water)) ** 1.5 * 700;
    if (hl < 700) tag(g, 'HYDROGEN ION', 980, 760 - hl, { size: 40, k: kh, rot: sway(t, 4), string: [780, 790 - hl] });
    // tháp treo: 5 tầng ×10, nước 7 (trên) → chanh 2 (dưới)
    const k5 = 5 * prog(t, this.TOWER, this.TOWER + 1.1), cnt = 5 * prog(t, T.five, T.steps + 1.0);
    if (k5 > 0) line(g, TX, -10, TX, HB + 4, C.string, 4);
    tower(g, TX, HB, 5, { s: ww, h: hh, hang: true, label: '×10', k: k5, count: cnt });
    const kw = prog(t, T.water, T.water + 0.4);
    tag(g, 'PURE WATER', TX - 330, HB + 60, { size: 40, k: kw, rot: sway(t, 5), string: [TX - ww / 2, HB + 60] });
    sticker(g, '7', TX, HB - 40, { r: 32, k: prog(t, T.seven, T.seven + 0.3) });
    const kk = prog(t, T.lemon, T.lemon + 0.4);
    icon(g, 'lemon', TX - 250 + 4 * Math.sin(t * 3), HB + 5 * hh - 30, 54, kk);
    sticker(g, '2', TX - 140, HB + 5 * hh - 30, { r: 32, k: prog(t, T.two, T.two + 0.3) });
    const kt = prog(t, T.hundred, T.hundred + 0.4);
    scaled(g, 1000, 640, 1 + 0.12 * Math.sin(Math.PI * prog(t, T.more, T.more + 0.4)), () =>
      tag(g, `×${PH.toLocaleString('en-US')}`, 1000, 640, { size: 76, weight: 900, edge: C.base, color: C.baseInk, k: kt, rot: sway(t, 6), string: [TX - ww / 2, 620] }));
    if (t >= T.end54) must(`10 ** 5`, 100000);
    secTag(g, 'Lemons', { k: prog(t, this.START, this.START + 0.4), t });
    const a = T.water - 0.3, b = T.end54, mk = prog(t, a, a + 0.5), out = outCubic(prog(t, b, b + 0.5));
    if (mk > 0 && out < 1) { g.save(); g.translate(0, out * 300); figure(g, 'pointer', 150, H, 262, mk, { t }); g.restore(); }
  }
}
