// b05 · How many zeros (ACT TWO, câu 18–21) — DNA blocks. Thẻ hồi "ACT TWO · Counting zeros" rồi hai khung nối bằng khối gỗ trượt:
//  A (câu 18–21a) 5 ô chờ nét đứt dưới bàn; "ten, a hundred, a thousand, ten thousand" → 4 tháp ×10 (1…4 khối) rơi đúng từng chữ,
//       thẻ số 10 / 100 / 1,000 / 10,000 dưới chân; "one, two, three, four" → sticker tím số tầng; "zeros" → các chữ 0 trên thẻ
//       được tô tím từng chữ; "steps of ten" → đường bậc thang qua đỉnh tháp + thẻ STEPS OF ×10; "four-digit, five thousand" →
//       tháp thứ 5 (3 khối + một khối cụt 0.7) ở ô giữa, ô vuông nét đứt của tầng 4, sticker 3 và 4 ("log giữa ba và bốn").
//  B (câu 21b)  "ten-digit number" → tháp 9 khối + khối cụt + ô nét đứt tầng 10; "nine" → tháp 9 khối (10⁹), "ten" → tháp 10 khối (10¹⁰).
// Mascot pointer nhỏ góc dưới trái ~8 s, vẽ sau cùng ở toạ độ màn hình.
import { H, C, AR, clamp, prog, lookup, must, ground, block, tower, sticker, tag, text, measure, rr, figure, slideSwap,
  secTag, actTitle, pow10, BASE_Y } from '../kit.js';

const S = 96;                                            // cạnh khối tháp khung A
const SLOT = [560, 810, 1060, 1310, 1560];               // 5 ô: 10, 100, 1,000, [5,000], 10,000
const NUMS = ['10', '100', '1,000', '10,000'], SLOT_OF = [0, 1, 2, 4];
const dashed = (g, path, col = 'rgba(34,48,60,0.45)') => { g.save(); g.setLineDash([12, 10]); g.strokeStyle = col; g.lineWidth = 4; g.stroke(path); g.restore(); };

/** Thẻ số; kz: tô tím các chữ sau chữ "1" (số chữ 0 = log) dần từng ký tự. */
function numTag(g, s, cx, cy, k, kz = 0, size = 44) {
  const box = tag(g, s, cx, cy, { size, k });
  if (k >= 1 && kz > 0) {
    const font = `800 ${size}px ${AR}`, tw = measure(g, s, font), w1 = measure(g, s[0], font);
    text(g, s.slice(1), cx + 8 - tw / 2 + w1, cy + 4, { font, color: C.logInk, base: 'middle', k: kz });
  }
  return box;
}

export default class Zeros {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b05');
    this.START = L(18).start;
    this.FROM = Math.max(this.START - 2.6, L(17).end + 0.5);
    this.T = {
      small: w(18, 'small'), tw: [w(18, 'ten'), w(18, 'hundred'), w(18, 'thousand'), w(18, 'ten', 2)],
      log: [w(19, 'one'), w(19, 'two'), w(19, 'three'), w(19, 'four')], zeros: w(19, 'zeros'),
      big: w(20, 'big'), steps: w(20, 'steps'),
      fd: w(21, 'four-digit'), five: w(21, 'five'), thou: w(21, 'thousand'), between: w(21, 'between'), three: w(21, 'three'), four: w(21, 'four'),
      td: w(21, 'ten-digit'), between2: w(21, 'between', 2), nine: w(21, 'nine'), ten: w(21, 'ten'), end: L(21).end,
    };
    const T = this.T;
    this.SW = T.four + 0.4;                                              // khối trượt sang khung B, ngay sau "…three and four"
    this.PTR = [this.FROM + 1.1, this.FROM + 1.1 + 7.6];                // mascot pointer: ~8 s
    for (const n of [1, 2, 3, 4]) { must(`String(10 ** ${n}).length - 1`, n); must(`10 ** ${n}`, 10 ** n); }
    must('Math.round(Math.log10(5000) * 10) / 10', 3.7);                // 5000: log giữa 3 và 4 (≈ 3.7)
    must('String(10 ** 9).length', 10);                                 // 10⁹ là số nhỏ nhất có 10 chữ số
    if (T.zeros < T.log[3]) throw new Error('b05: "zeros" trước "four"');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(this.START - 1.3, 'card'),
      ...T.tw.map(t => c(t + 0.05, 'wood')), c(T.log[0], 'pop'), c(T.log[3], 'pop'), c(T.zeros + 0.05, 'tick'), c(T.steps, 'card'),
      c(T.fd + 0.1, 'wood'), c(T.thou + 0.1, 'wood'), c(T.three, 'pop'),
      c(this.SW, 'whoosh'), c(T.td + 0.1, 'wood'), c(T.nine + 0.2, 'wood'), c(T.ten + 0.45, 'pop'),
    ];
  }

  viewA(g, t) {
    const T = this.T;
    ground(g, 'table');
    // ô chờ nét đứt: hiện lần lượt từ "small", biến mất khi khối rơi xuống
    const built = [T.tw[0], T.tw[1], T.tw[2], T.fd, T.tw[3]];
    SLOT.forEach((x, i) => {
      const a = this.START + 0.15 + i * 0.12, ka = prog(t, a, a + 0.3);
      if (ka <= 0 || t > built[i] + 0.25) return;
      g.save(); g.globalAlpha = ka; dashed(g, rr(x - S / 2, BASE_Y - S, S, S, 8)); g.restore();
    });
    // câu 18 mở đầu: vật vào ngay từ "now try something small" (thẻ treo) cho tới khi tháp đầu rơi ở "ten"
    tag(g, 'SOMETHING SMALL', 1060, 420, { size: 56, k: prog(t, this.START + 0.1, this.START + 0.4) - prog(t, T.tw[0] - 0.15, T.tw[0] + 0.2) });
    // 4 tháp ×10 + thẻ số + sticker log
    [1, 2, 3, 4].forEach((n, j) => {
      const x = SLOT[SLOT_OF[j]], a = T.tw[j], k = prog(t, a, a + 0.2 + 0.11 * n);
      tower(g, x, BASE_Y, n, { s: S, label: '×10', k: n * k });
      numTag(g, NUMS[j], x, BASE_Y + 72, prog(t, a, a + 0.3), prog(t, T.zeros + j * 0.14, T.zeros + j * 0.14 + 0.5));
      sticker(g, String(n), x + 100, BASE_Y - (n - 0.5) * S, { r: 34, k: prog(t, T.log[j], T.log[j] + 0.3) });
    });
    // đường bậc thang nối đỉnh các tháp ("how big it is, in steps")
    const kS = prog(t, T.big, T.big + 0.9);
    if (kS > 0) {
      const pts = [1, 2, 3, 4].map((n, j) => [SLOT[SLOT_OF[j]], BASE_Y - n * S - 34]);
      const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = segs.reduce((a, b) => a + b, 0);
      let left = kS * tot; g.save(); g.setLineDash([10, 12]); g.strokeStyle = 'rgba(34,48,60,0.55)'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(...pts[0]);
      for (let i = 0; i < segs.length && left > 0; i++) { const u = Math.min(1, left / segs[i]); g.lineTo(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u); left -= segs[i]; }
      g.stroke(); g.restore();
    }
    tag(g, 'STEPS OF ×10', 1000, 300, { size: 44, edge: C.base, k: prog(t, T.steps, T.steps + 0.3) });
    // 5,000: 3 khối + khối cụt 0.7 + ô nét đứt tầng 4, sticker 3 và 4
    const x5 = SLOT[3], k5 = prog(t, T.fd, T.fd + 0.9), kp = prog(t, T.thou, T.thou + 0.45);
    if (k5 > 0) tower(g, x5, BASE_Y, 3, { s: S, label: '×10', k: 3 * k5 });
    const hp = Math.round(S * 0.7);
    if (kp > 0) block(g, x5, BASE_Y - 3 * S, S, { w: S, h: hp, d: 16, k: kp, from: 360, shadow: false, v: 3 });
    const kd = prog(t, T.between, T.between + 0.4);
    if (kd > 0) { g.save(); g.globalAlpha = kd; dashed(g, rr(x5 - S / 2, BASE_Y - 4 * S, S, S, 8), 'rgba(106,69,209,0.8)'); g.restore(); }
    sticker(g, '3', x5 + 100, BASE_Y - 2.5 * S, { r: 34, k: prog(t, T.three, T.three + 0.3) });
    sticker(g, '4', x5 + 100, BASE_Y - 3.5 * S, { r: 34, k: prog(t, T.four, T.four + 0.3) });
    numTag(g, '5,000', x5, BASE_Y + 72, prog(t, T.five, T.five + 0.3));
  }

  viewB(g, t) {
    const T = this.T, s = 60, X = [760, 1060, 1360];
    ground(g, 'table');
    // giữa: số có 10 chữ số = 9 khối + khối cụt + ô nét đứt tầng 10
    const km = prog(t, T.td, T.td + 0.8), kp = prog(t, T.td + 0.8, T.td + 1.15), kd = prog(t, T.between2, T.between2 + 0.4);
    tower(g, X[1], BASE_Y, 9, { s, k: 9 * km });
    tag(g, '×10 EACH BLOCK', 1060, 190, { size: 40, edge: C.base, k: prog(t, T.td - 0.2, T.td + 0.2) });
    if (kp > 0) block(g, X[1], BASE_Y - 9 * s, s, { w: s, h: Math.round(s * 0.6), d: 10, k: kp, from: 300, shadow: false, v: 1 });
    if (kd > 0) { g.save(); g.globalAlpha = kd; dashed(g, rr(X[1] - s / 2, BASE_Y - 10 * s, s, s, 6), 'rgba(106,69,209,0.8)'); g.restore(); }
    numTag(g, '10 DIGITS', X[1], BASE_Y + 72, prog(t, T.td, T.td + 0.3));
    // trái: 10⁹ (9 khối) · phải: 10¹⁰ (10 khối)
    tower(g, X[0], BASE_Y, 9, { s, k: 9 * prog(t, T.nine, T.nine + 0.5) });
    tower(g, X[2], BASE_Y, 10, { s, k: 10 * prog(t, T.ten, T.ten + 0.55) });
    tag(g, pow10(9), X[0], BASE_Y + 72, { size: 44, k: prog(t, T.nine, T.nine + 0.3) });
    tag(g, pow10(10), X[2], BASE_Y + 72, { size: 44, k: prog(t, T.ten, T.ten + 0.3) });
    sticker(g, '9', X[0] + 80, BASE_Y - 8.5 * s, { r: 34, k: prog(t, T.nine + 0.3, T.nine + 0.6) });
    sticker(g, '10', X[2] + 80, BASE_Y - 9.5 * s, { r: 34, k: prog(t, T.ten + 0.3, T.ten + 0.6) });
  }

  render(g, t) {
    const T = this.T, k = prog(t, this.SW, this.SW + 0.9);
    if (t < this.SW) this.viewA(g, t); else if (k < 1) slideSwap(g, k, () => this.viewA(g, t), () => this.viewB(g, t)); else this.viewB(g, t);
    actTitle(g, t, this.START, 'ACT TWO', 'Counting zeros');
    secTag(g, 'How many zeros', { k: prog(t, this.START, this.START + 0.4), t });
    const kf = clamp(prog(t, this.PTR[0], this.PTR[0] + 0.45) - prog(t, this.PTR[1] - 0.4, this.PTR[1]));
    figure(g, 'pointer', 150, H, 262, kf, { t });
  }
}
