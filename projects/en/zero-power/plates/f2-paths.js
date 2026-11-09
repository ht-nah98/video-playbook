// f2 · Two paths to the corner — trục điểm ảnh x (0..1) và y (−1..1); góc (0, 0) = ô tranh chấp (contested).
//   82 "x to the y, both slide towards zero" → X^Y, X → 0 · Y → 0, ô góc hiện
//   83 đường 1: y = 0, chấm chạy dọc trục x vào góc (vệt LAM), số đo X = 1.00 → 0.01, X^0 = 1, LIMIT 1
//   84 đường 2: x = 0, chấm chạy dọc trục y xuống góc (vệt GỈ), Y = 1.00 → 0.01, 0^Y = 0 (Y > 0), LIMIT 0
//   85 "two paths, same corner, two different answers" → 1 ≠ 0 (pose-halt)
//   86 "choose the path cleverly → two, a half, any positive number" → quạt đường cong mờ xʸ = c, LIMIT → 2 · 1/2 · ANY C > 0
//   87 đường cong y = ln 2 / ln x vẽ đậm, điểm đánh dấu "2" ở x = 0.5, 0.25, 0.1 (tính + must)
//   88 "no number every path agrees on" → ba dòng chốt, khung mực quanh góc.
import { C, smooth, outCubic, prog, ground, ink, seg7, row, dm, dmLines, annunciators, card, contested, dots, pixLine,
  figure, lookup, must } from '../kit.js';

const OX = 420, OY = 560, SX = 800, SY = 380;              // gốc (0, 0); x 0..1 → 420..1220; y −1..1 → 940..180
const px = x => OX + SX * x, py = y => OY - SY * y;
const BOX = { x: OX - 90, y: OY - 60, w: 180, h: 120 };
const inBox = (X, Y, m = 10) => X > BOX.x - m && X < BOX.x + BOX.w + m && Y > BOX.y - m && Y < BOX.y + BOX.h + m;
const COLX = 1290;                                          // cột số đo bên phải

/** Đường xʸ = c: y = ln c / ln x, x = e^(−s) từ x = 1 vào góc; giữ |y| ≤ 1, bỏ phần trong ô góc. */
function curve(c) {
  const pts = [];
  for (let s = 0.02; s < 28; s += s < 3 ? 0.01 : 0.05) {
    const x = Math.exp(-s), y = Math.log(c) / Math.log(x);
    if (Math.abs(y) > 1) continue;
    if (Math.abs(Math.pow(x, y) - c) > 1e-9) throw new Error(`f2: x^y ≠ ${c} tại x = ${x}`);
    const X = px(x), Y = py(y); if (inBox(X, Y)) break; pts.push([X, Y]);
  }
  return pts;
}

export default class Paths {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      take: w(82, 'take'), x82: w(82, 'x'), slide: w(82, 'slide'), zero82: w(82, 'zero'),
      first: w(83, 'first'), keep1: w(83, 'keep'), every1: w(83, 'every'), one1: w(83, 'one'), limit1: w(83, 'limit'),
      second: w(84, 'second'), keep2: w(84, 'keep'), every2: w(84, 'every'), positive2: w(84, 'positive'), limit2: w(84, 'limit'),
      two85: w(85, 'two'), corner85: w(85, 'corner'), diff: w(85, 'different'),
      worse: w(86, 'worse'), cleverly: w(86, 'cleverly'), two86: w(86, 'two'), half: w(86, 'half'), any: w(86, 'any'), like: w(86, 'like'),
      curved: w(87, 'curved'), x87: w(87, 'x'), two87: w(87, 'two'), every87: w(87, 'every'), point87: w(87, 'point'),
      no88: w(88, 'no'), corner88: w(88, 'corner'), agrees: w(88, 'agrees'), on88: w(88, 'on'),
    };
    this.START = L(82).start;
    this.FROM = Math.max(this.START - 1.2, L(81).end + 0.3);
    this.FAN = [3, 1.5, 0.7, 0.3].map(c => curve(c));
    this.C2 = curve(must('2', 2)); this.CH = curve(must('1 ÷ 2', 0.5));
    // điểm đánh dấu trên đường y = ln 2 / ln x: xʸ phải đúng bằng 2
    this.MARK = [0.5, 0.25, 0.1].map(x => { const y = Math.log(2) / Math.log(x); must(`${x}^(${y})`, 2); return [px(x), py(y)]; });
    must('0.5^0', 1); must('0.01^0', 1); must('0^0.5', 0); must('0^0.01', 0);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.zero82, kind: 'question' }, { t: T.limit1 + 0.28, kind: 'beep' }, { t: T.every2 + 0.5, kind: 'beep' },
      { t: T.corner85, kind: 'snap' }, { t: T.two86, kind: 'beep' }, { t: T.curved, kind: 'tick' }, { t: T.every87, kind: 'tick' },
      { t: T.corner88, kind: 'tick' }];
  }
  /** Vị trí (0..1) của chấm chạy: 1 → 0.01 theo thang log. */
  run(t, a, b) { return Math.pow(10, -2 * smooth(prog(t, a, b))); }
  render(g, t) {
    const T = this.T, F0 = this.FROM;
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, F0 + 0.3, F0 + 1.2), 'ACT V', 'TWO PATHS TO THE CORNER');
      // trục điểm ảnh
      const ka = prog(t, F0 + 0.3, F0 + 1.1), axc = `rgba(${C.inkRGB},0.5)`;
      dots(d, OX, OY, px(1), OY, axc, { step: 8, size: 4, k: ka });
      dots(d, OX, OY, OX, py(1), axc, { step: 8, size: 4, k: ka });
      dots(d, OX, OY, OX, py(-1), axc, { step: 8, size: 4, k: ka });
      if (ka >= 1) { dm(d, 'X', px(1) + 24, OY - 14, 4, C.ink); dm(d, 'Y', OX + 20, py(1) - 6, 4, C.ink); }
      // 82: X^Y, cả hai trượt về 0
      this.column(d, t);
      // 83: đường 1 — vệt lam dọc trục x
      if (t > T.first) {
        const xr = this.run(t, T.keep1, T.limit1), X = px(xr);
        dots(d, px(1), OY, Math.max(X, BOX.x + BOX.w + 12), OY, C.one, { step: 10, size: 7, k: prog(t, T.first, T.keep1) > 0 ? 1 : 0 });
        if (!inBox(X, OY)) { d.fillStyle = C.ink; d.fillRect(X - 9, OY - 9, 18, 18); }
        dm(d, 'Y = 0', px(1) - 130, OY + 26, 4, C.ink, { k: prog(t, T.first, T.keep1 + 0.3) });
        if (t > T.limit1) seg7(d, '1', BOX.x + BOX.w + 18, OY + 24, 60, C.one);
      }
      // 84: đường 2 — vệt gỉ dọc trục y
      if (t > T.second) {
        const yr = this.run(t, T.keep2, T.limit2), Y = py(yr);
        dots(d, OX, py(1), OX, Math.min(Y, BOX.y - 12), C.zero, { step: 10, size: 7, k: prog(t, T.second, T.keep2) > 0 ? 1 : 0 });
        if (!inBox(OX, Y)) { d.fillStyle = C.ink; d.fillRect(OX - 9, Y - 9, 18, 18); }
        dm(d, 'X = 0', OX - 150, py(1) + 10, 4, C.ink, { k: prog(t, T.second, T.keep2 + 0.3) });
        if (t > T.limit2) seg7(d, '0', OX + 22, BOX.y - 78, 60, C.zero);
      }
      // 86: quạt các đường xʸ = c (mờ), 2 và 1/2 đậm lên đúng chữ
      if (t > T.cleverly - 0.2) {
        const kf = prog(t, T.cleverly - 0.2, T.cleverly + 0.8), fc = `rgba(${C.inkRGB},0.22)`;
        for (const p of this.FAN) pixLine(d, p, fc, { p: 6, k: kf });
        pixLine(d, this.C2, `rgba(${C.inkRGB},${t > T.two86 ? 0.45 : 0.22})`, { p: 6, k: kf });
        pixLine(d, this.CH, `rgba(${C.inkRGB},${t > T.half ? 0.45 : 0.22})`, { p: 6, k: kf });
      }
      // 87: đường cong xʸ = 2 vẽ đậm, điểm "2"
      if (t > T.curved - 0.1) {
        pixLine(d, this.C2, C.ink, { p: 6, k: prog(t, T.curved - 0.1, T.x87) });
        this.MARK.forEach(([X, Y], i) => {
          const at = T.every87 + i * 0.25; if (t < at) return;
          d.fillStyle = C.ink; d.fillRect(X - 9, Y - 9, 18, 18); seg7(d, '2', X + 18, Y - 18, 36, C.ink);
        });
      }
      // ô góc (0, 0)
      contested(d, BOX.x, BOX.y, BOX.w, BOX.h, prog(t, T.zero82 - 0.2, T.zero82 + 0.5), { size: 52 });
      // 85: hai câu trả lời khác nhau
      if (t > T.diff - 0.1) {
        dm(d, [['1', C.one], [' ≠ ', C.ink], ['0', C.zero]], 120, 680, 7, C.ink, { k: prog(t, T.diff - 0.1, T.diff + 0.4) });
        dm(d, 'SAME CORNER', 120, 760, 4, C.dim, { k: prog(t, T.diff + 0.2, T.diff + 0.8) });
      }
      // 88: khung mực quanh góc
      if (t > T.corner88 - 0.1) {
        const k = outCubic(prog(t, T.corner88 - 0.1, T.corner88 + 0.4)), m = 16 + 10 * (1 - k);
        d.strokeStyle = `rgba(${C.inkRGB},${0.9 * k})`; d.lineWidth = 5;
        d.strokeRect(BOX.x - m, BOX.y - m, BOX.w + 2 * m, BOX.h + 2 * m);
      }
    });
    // nhân vật: "two different answers" — pose-halt, trồi lên rồi trượt xuống
    const kin = prog(t, T.two85 - 0.25, T.two85 + 0.1), out = smooth(prog(t, T.cleverly - 0.6, T.cleverly + 0.2));
    if (kin > 0 && out < 1) figure(g, 'halt', 1640, 1080 + out * 760 * 1.05, 760, kin);
  }
  // cột số đo bên phải: pha A (82–85) đường 1 + 2; trượt ra phải khi nhân vật vào; pha B (86–88) đường cong
  column(d, t) {
    const T = this.T;
    const outA = smooth(prog(t, T.two85 - 0.3, T.two85 + 0.4));
    if (outA < 1) {
      d.save(); d.translate(outA * 700, 0);
      const x = COLX;
      dm(d, 'TAKE X^Y^', x, 166, 6, C.ink, { k: prog(t, T.take, T.x82 + 0.6) });
      dm(d, 'X → 0 · Y → 0', x, 232, 4, C.dim, { k: prog(t, T.slide - 0.1, T.zero82 + 0.2) });
      // đường 1
      if (t > T.first - 0.1) {
        dm(d, 'PATH 1 · Y = 0', x, 300, 5, C.ink, { k: prog(t, T.first - 0.1, T.keep1 + 0.2) });
        if (t > T.keep1 - 0.2) {
          dm(d, 'X =', x, 372, 5, C.ink);
          row(d, this.run(t, T.keep1, T.limit1).toFixed(2), x + 130, 358, 52, { color: C.ink });
        }
        if (t > T.every1) {
          dm(d, 'X^0^ =', x, 444, 5, C.ink, { k: prog(t, T.every1, T.every1 + 0.5) });
          if (t > T.one1 - 0.1) seg7(d, '1', x + 200, 430, 52, C.one);
        }
        if (t > T.limit1) { dm(d, 'LIMIT', x, 516, 5, C.ink, { k: prog(t, T.limit1, T.limit1 + 0.3) }); if (t > T.limit1 + 0.28) seg7(d, '1', x + 200, 500, 60, C.one); }
      }
      // đường 2
      if (t > T.second - 0.1) {
        dm(d, 'PATH 2 · X = 0', x, 612, 5, C.ink, { k: prog(t, T.second - 0.1, T.keep2 + 0.2) });
        if (t > T.keep2 - 0.2) {
          dm(d, 'Y =', x, 684, 5, C.ink);
          row(d, this.run(t, T.keep2, T.limit2).toFixed(2), x + 130, 670, 52, { color: C.ink });
        }
        if (t > T.every2) {
          dm(d, '0^Y^ =', x, 756, 5, C.ink, { k: prog(t, T.every2, T.every2 + 0.5) });
          if (t > T.every2 + 0.5) seg7(d, '0', x + 200, 742, 52, C.zero);
          if (t > T.positive2) dm(d, 'Y > 0', x + 270, 762, 4, C.dim, { k: prog(t, T.positive2, T.positive2 + 0.4) });
        }
        if (t > T.limit2) { dm(d, 'LIMIT', x, 828, 5, C.ink, { k: prog(t, T.limit2, T.limit2 + 0.3) }); if (t > T.limit2 + 0.25) seg7(d, '0', x + 200, 812, 60, C.zero); }
      }
      d.restore();
    }
    // pha B — sau khi nhân vật đã xuống
    const b0 = T.cleverly + 0.2;
    if (t < b0) return;
    const x = COLX;
    dm(d, 'CHOOSE THE PATH', x, 166, 5, C.ink, { k: prog(t, b0, b0 + 0.7) });
    if (t > T.two86 - 0.1) dm(d, 'LIMIT → 2', x, 246, 6, C.ink, { k: prog(t, T.two86 - 0.1, T.two86 + 0.3) });
    if (t > T.half - 0.1) dm(d, 'LIMIT → 1/2', x, 316, 6, C.ink, { k: prog(t, T.half - 0.1, T.half + 0.35) });
    if (t > T.any - 0.1) dm(d, 'ANY C > 0', x, 386, 6, C.ink, { k: prog(t, T.any - 0.1, T.like) });
    if (t > T.curved - 0.1) dm(d, 'ALONG Y = LN 2 / LN X', x, 466, 4, C.dim, { k: prog(t, T.curved - 0.1, T.x87) });
    if (t > T.x87 - 0.1) dm(d, 'X^Y^ = 2', x, 566, 9, C.ink, { k: prog(t, T.x87 - 0.1, T.two87 + 0.2) });
    if (t > T.every87 - 0.1) dm(d, 'AT EVERY POINT', x, 666, 5, C.ink, { k: prog(t, T.every87 - 0.1, T.point87 + 0.3) });
    if (t > T.no88 - 0.2) {
      const lines = ['NO NUMBER', 'EVERY PATH', 'AGREES ON'];
      dmLines(d, lines, x, 776, 6, C.ink, { k: prog(t, T.no88 - 0.2, T.on88 + 0.2), lh: 11 });
    }
  }
}
