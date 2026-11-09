// ACT FOUR · "The honest answer" (p2, câu 74–81). Toạ độ THẾ GIỚI: đường chính y = 540; camera = tâm nhìn vx + tỉ lệ s.
//   đoạn A (x 0–3440)      bài viral sơn trên đường + ngã ba có biển "?": 9 trên, 1 dưới; xe (người đọc) phân vân
//   đoạn B (x 3900–6450)   gạch phân số = CẦU VƯỢT hai tầng: 6 / (2 × 3) = 1 và 6 / 2 × 3 = 9 — hết cãi (✓ vàng)
//   đoạn C (x 7600–9600)   biển ÷ lớn: chấm trên, chấm dưới, vạch; nghiêng dần (bị gỡ), ✗ đỏ lúc "advise against"
//   đoạn D (x 10000–12600) ngã ba lần nữa: biển PEMDAS, hai xe theo đúng luật ra hai đáp số → mặt đường THỦNG ổ gà
// Cuối cảnh: f1-minus (màn hình) loang từ đúng ổ gà (f1.WIPE = [1000, 540]).
import { W, clamp, prog, smooth, outCubic, outBack, hash, ROAD, ERA, verge, road, centerLine, paint, paintRow,
  sign, car, card, typed, cross, strike, hand, arrow, must, lookup } from '../kit.js';

const Y = 540;
const FA = 1900, FD = 11000;                              // hai ngã ba
const S1 = 3900, N1 = 420, S2 = 5400, N2 = 240;            // hai cầu vượt (đầu, chiều dài đoạn thẳng)
const fork = (x0) => [-1, 1].map(s => g => { const y = Y + s * 250;   // tách trong 300 px, chạy 940, nhập lại trong 300
  g.moveTo(x0, Y); g.bezierCurveTo(x0 + 150, Y, x0 + 150, y, x0 + 300, y); g.lineTo(x0 + 1240, y);
  g.bezierCurveTo(x0 + 1390, y, x0 + 1390, Y, x0 + 1540, Y); });
const deck = (xs, n) => [-1, 1].map(s => g => { const y = Y + s * 190;   // hai tầng: trên y 200–500, dưới 580–880; khe cỏ 80 px giữa = chỗ dầm
  g.moveTo(xs, Y); g.bezierCurveTo(xs + 130, Y, xs + 130, y, xs + 260, y); g.lineTo(xs + 260 + n, y);
  g.bezierCurveTo(xs + 390 + n, y, xs + 390 + n, Y, xs + 520 + n, Y); });
const line = (a, b) => g => { g.moveTo(a, Y); g.lineTo(b, Y); };
const PATHS = [line(-600, FA), ...fork(FA), line(FA + 1540, S1), ...deck(S1, N1), line(S1 + 520 + N1, S2), ...deck(S2, N2),
  line(S2 + 520 + N2, FD), ...fork(FD), line(FD + 1540, 14000)];
const SUM = ['6', '÷', '2', '(', '1', '+', '2', ')'];
const DIV = [8560, 225];                                   // biển ÷ lớn (thế giới)

export default class Honest {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.T = {
      sum: w(74, 'sum'), badly: w(74, 'badly'), amb: w(74, 'ambiguous'), guess: w(75, 'guess'), reader: w(75, 'reader'),
      never: w(76, 'never'), thisway: w(76, 'this'), fraction: w(76, 'fraction'), bar: w(76, 'bar'),
      six1: w(77, 'six'), two1: w(77, 'two'), under: w(77, 'underneath'), or: w(77, 'or'), six2: w(77, 'six', 2),
      over2: w(77, 'over'), two2: w(77, 'two', 2), times2: w(77, 'times', 2), three2: w(77, 'three', 2),
      which: w(77, 'whichever'), done: w(77, 'over', 2), end77: L(77).end,
      that: L(78).start, sign: w(78, 'sign'), dot1: w(78, 'dot'), dot2: w(78, 'dot', 2), lineW: w(78, 'line'),
      fading: w(78, 'fading'), long: w(78, 'long'), intl: w(78, 'international'), writing: w(78, 'writing'),
      advise: w(78, 'advise'), against: w(78, 'against'), point: L(79).start, underline: w(79, 'underline'),
      pemdas: w(80, 'pemdas'), truth: w(80, 'unbreakable'), people: w(80, 'people'), follow: w(80, 'follow'),
      answers: w(80, 'different'), exist: w(81, 'exist'), shows: w(81, 'shows'), gaps: w(81, 'gaps'), end: L(81).end,
    };
    this.nine = must('6 ÷ 2 × (1 + 2)', 9); this.one = must('6 ÷ (2 × (1 + 2))', 1);
    this.f1 = must('6 ÷ (2 × 3)', 1); this.f2 = must('6 ÷ 2 × 3', 9);
    this.START = L(74).start; this.FROM = this.START - 1.2;
    const T = this.T, c = x => x + W / 2;                  // c(trái khung) → tâm nhìn
    this.CAM = [[this.FROM, c(0), 1], [this.START, c(0), 1], [T.sum + 0.2, c(120), 1], [T.badly + 0.5, c(950), 1],
      [T.fraction - 0.4, c(1040), 1], [T.fraction + 0.5, c(3440), 1], [T.or - 0.35, c(3500), 1], [T.six2 + 0.15, c(5180), 1],
      [T.three2 + 0.1, c(5240), 1], [T.which + 0.6, 5360, 0.62], [T.end77 + 0.6, 5380, 0.62], [T.that + 0.45, c(7600), 1],
      [T.point - 0.2, c(7800), 1], [T.point + 0.6, c(10000), 1], [T.shows, c(10060), 1], [T.end + 3, c(10060), 1]];
  }
  view(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0, s0] = K[i], [t1, x1, s1] = K[i + 1], e = smooth(clamp((t - t0) / (t1 - t0)));
    return [x0 + (x1 - x0) * e, s0 + (s1 - s0) * e]; }
  // xe người đọc ở đoạn A: chạy tới sát ngã ba rồi dừng, phân vân lúc "guess"
  carA(t) { const T = this.T; return 250 + 200 * prog(t, this.FROM, this.START) + (FA - 450) * smooth(prog(t, this.START + 0.2, T.amb)); }   // dừng ở FA: đuôi xe qua hết gạch sóng đỏ (x1 ≈ FA − 95)
  sfx() {
    const T = this.T;
    return [{ t: T.amb, kind: 'question' }, { t: T.thisway, kind: 'error' }, { t: T.fraction - 0.4, kind: 'whoosh' },
      { t: T.under + 0.1, kind: 'snap' }, { t: T.or - 0.35, kind: 'whoosh' }, { t: T.three2 + 0.1, kind: 'snap' },
      { t: T.done, kind: 'correct' }, { t: T.end77 + 0.6, kind: 'whoosh' }, { t: T.sign, kind: 'pop' },
      { t: T.against, kind: 'error' }, { t: T.point - 0.2, kind: 'whoosh' }, { t: T.pemdas, kind: 'pop' },
      { t: T.answers, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, [vx, s] = this.view(t);
    g.save(); verge(g); g.translate(W / 2, Y); g.scale(s, s); g.translate(-vx, -Y);
    road(g, PATHS);
    for (const p of PATHS) centerLine(g, p);

    // ── đoạn A: bài viral + ngã ba "?" ──
    const toks = paintRow(g, SUM, 1150, Y, 92, { k: prog(t, T.sum - 0.6, T.sum + 0.4) });
    const x0 = toks[0].x - 50, x1 = toks.at(-1).x + 40;
    if (t > T.badly) {                                     // "badly written": gạch chân lượn sóng đỏ
      const P = Array.from({ length: 41 }, (_, i) => [x0 + (x1 - x0) * i / 40, Y + 66 + Math.sin(i * 1.3) * 6]);
      hand(g, P, { w: 5, color: ROAD.red, k: prog(t, T.badly, T.badly + 0.5), seed: 4 });
    }
    strike(g, x0 - 10, Y + 8, x1 + 10, Y - 8, prog(t, T.thisway, T.thisway + 0.35), { color: ROAD.red, w: 8 });
    sign(g, null, '?', FA + 330, Y, 61, prog(t, T.amb - 0.1, T.amb + 0.3));
    paint(g, String(this.nine), FA + 640, Y - 250, 120, { k: prog(t, T.amb + 0.1, T.amb + 0.35), color: ROAD.gold });
    paint(g, String(this.one), FA + 640, Y + 250, 120, { k: prog(t, T.amb + 0.3, T.amb + 0.55), color: ROAD.gold });
    const hes = Math.sin(clamp((t - T.guess + 0.3) / 1.5) * Math.PI) * Math.sin((t - T.guess) * 9) * 0.3;
    car(g, this.carA(t), Y + 108, hes, { s: 0.8 });                 // làn thấp hơn gạch sóng (Y + 66 ± 9)
    typed(g, 'the reader has to guess', FA - 330, Y + 280, prog(t, T.guess - 0.1, T.guess + 0.8), 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });

    // ── đoạn B: hai cầu vượt = hai cách viết phân số ──
    const c1 = S1 + 260 + N1 / 2, c2 = S2 + 260 + N2 / 2;
    deckBar(g, S1 + 240, S1 + 280 + N1, prog(t, T.bar - 0.2, T.bar + 0.4));
    paint(g, '6', c1, Y - 190, 92, { k: prog(t, T.six1 - 0.1, T.six1 + 0.1) });
    paint(g, '2 × 3', c1, Y + 190, 92, { k: prog(t, T.two1 - 0.05, T.two1 + 0.6) });
    paintRow(g, ['=', String(this.f1)], S1 + 600 + N1, Y, 120, { k: prog(t, T.under + 0.1, T.under + 0.4), color: (x, i) => i ? ROAD.gold : ROAD.paint });
    typed(g, 'on top', c1, Y - 370, prog(t, T.six1, T.six1 + 0.5), 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    typed(g, 'underneath', c1, Y + 395, prog(t, T.under, T.under + 0.6), 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    deckBar(g, S2 + 240, S2 + 280 + N2, prog(t, T.over2 - 0.1, T.over2 + 0.3));
    paint(g, '6', c2, Y - 190, 92, { k: prog(t, T.six2 - 0.1, T.six2 + 0.1) });
    paint(g, '2', c2, Y + 190, 92, { k: prog(t, T.two2 - 0.1, T.two2 + 0.1) });
    paintRow(g, ['×', '3', '=', String(this.f2)], S2 + 600 + N2, Y, 120,
      { k: clamp(prog(t, T.times2 - 0.1, T.three2 + 0.1) * 0.5 + prog(t, T.three2 + 0.1, T.three2 + 0.4) * 0.5), color: (x, i) => i === 3 ? ROAD.gold : ROAD.paint });
    const kc = prog(t, T.done - 0.1, T.done + 0.4);       // "the argument is over": ✓ vàng cạnh cả hai đáp số
    tick(g, S1 + 600 + N1 + 300, Y - 10, 2, kc);
    tick(g, S2 + 600 + N2 + 520, Y - 10, 2, kc);
    typed(g, 'whichever they mean', 5360, Y + 400, prog(t, T.which, T.which + 0.7), 'italic 600 72px "Cormorant Garamond"', ROAD.edge, { align: 'center' });

    // ── đoạn C: dấu ÷ bị gỡ ──
    if (t > T.long - 1) car(g, 7300 + 2500 * smooth(prog(t, T.long - 1, T.intl + 1)), Y + 92, 0, { s: 0.8 });
    divSign(g, this, t);
    divLabels(g, this, t);
    typed(g, 'international standards for scientific writing', 8560, 800, prog(t, T.long - 0.2, T.intl + 0.6), 'italic 600 54px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    typed(g, 'advise against it', 8560, 880, prog(t, T.advise, T.against + 0.4), 'italic 600 54px "Cormorant Garamond"', ROAD.gold, { align: 'center' });

    // ── đoạn D: ngã ba, PEMDAS, hai người đều đúng luật → luật có ổ gà ──
    const tk = paintRow(g, SUM, 10250, Y, 92, { k: prog(t, T.point - 0.1, T.point + 0.7) });
    const u0 = tk[0].x - 50, u1 = tk.at(-1).x + 40;
    hand(g, [[u0, Y + 72], [u1, Y + 72]], { w: 7, color: ROAD.gold, k: prog(t, T.underline - 0.1, T.underline + 0.4), seed: 9 });
    rulebook(g, 10560, 840, prog(t, T.pemdas - 0.1, T.pemdas + 0.3));
    typed(g, 'an unbreakable truth?', 10560, 965, prog(t, T.truth, T.truth + 0.8), 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    paint(g, String(this.nine), FD + 640, Y - 250, 120, { k: prog(t, T.answers - 0.05, T.answers + 0.2), color: ROAD.gold });
    paint(g, String(this.one), FD + 640, Y + 250, 120, { k: prog(t, T.answers + 0.15, T.answers + 0.4), color: ROAD.gold });
    pothole(g, FD + 60, Y, prog(t, T.shows - 0.1, T.gaps), prog(t, T.gaps - 0.35, T.gaps + 0.1));
    if (t > T.people - 0.6) for (const sd of [-1, 1]) {   // hai người đọc, cùng luật, hai nhánh
      const p = smooth(prog(t, T.follow, T.answers - 0.1)), xa = 9900 + 260 * outCubic(prog(t, T.people - 0.6, T.people + 0.3)) + 1100 * p;
      const f = (x) => Y + sd * (70 + 180 * smooth(clamp((x - FD) / 300)));
      car(g, xa, f(xa), Math.atan2(f(xa + 6) - f(xa - 6), 12), { s: 0.8 });
    }
    g.restore();

    card(g, 'road', prog(t, this.FROM + 0.4, this.FROM + 1.6), 'ACT FOUR · THE GAP', 'The honest answer');
  }
}

// ✓ vẽ tay (font không có ✓)
function tick(g, x, y, sc, k) {
  if (k <= 0) return;
  hand(g, [[x - 34 * sc, y], [x - 8 * sc, y + 30 * sc], [x + 44 * sc, y - 40 * sc]], { w: 14, color: ROAD.gold, k, seed: 2, jit: 1 });
}
// gạch phân số = dầm cầu vượt giữa hai tầng: bê tông sáng, trụ đỡ, bóng đổ xuống tầng dưới; k trượt vào từ trái
function deckBar(g, x0, x1, k) {
  if (k <= 0) return;
  const xe = x0 + (x1 - x0) * outCubic(clamp(k));
  g.save(); g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(x0, Y + 14, xe - x0, 26);
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 10; g.shadowOffsetY = 7; g.fillStyle = '#E2DED3'; g.fillRect(x0, Y - 16, xe - x0, 32);
  g.shadowColor = 'transparent'; g.fillStyle = '#9C988E';
  for (let x = x0 + 24; x < xe - 12; x += 56) g.fillRect(x, Y - 4, 14, 8);
  g.restore();
}
// biển ÷ tự vẽ (biết chỗ hai chấm và vạch): khoanh vàng theo lời; "fading out" = nghiêng dần, lún xuống; ✗ đỏ khi "advise against"
function divSign(g, P, t) {
  const T = P.T, k = prog(t, T.sign - 0.15, T.sign + 0.35); if (k <= 0) return;
  const [x, y] = DIV, r = 150, p = outBack(k), lean = smooth(prog(t, T.fading, T.long + 0.6));
  g.save(); g.translate(x, y + r); g.rotate(-0.42 * lean); g.translate(0, -r + 26 * lean); g.scale(p, p);
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18; g.shadowOffsetY = 10; g.fillStyle = '#ECECEC'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = ROAD.MD; g.beginPath(); g.arc(0, 0, r * 0.85, 0, 7); g.fill();
  const pulse = (a) => 1 + 0.35 * Math.sin(clamp((t - a) / 0.5) * Math.PI);
  g.fillStyle = '#FFFFFF';
  g.beginPath(); g.arc(0, -56, 18 * pulse(T.dot1), 0, 7); g.fill();
  g.beginPath(); g.arc(0, 56, 18 * pulse(T.dot2), 0, 7); g.fill();
  g.fillRect(-72, -11, 144, 22);
  g.strokeStyle = ROAD.gold; g.lineWidth = 5;
  const kr1 = prog(t, T.dot1, T.dot1 + 0.3), kr2 = prog(t, T.dot2, T.dot2 + 0.3), kl = prog(t, T.lineW, T.lineW + 0.3);
  if (kr1 > 0) { g.beginPath(); g.arc(0, -56, 34, -1.6, -1.6 + 6.3 * kr1); g.stroke(); }
  if (kr2 > 0) { g.beginPath(); g.arc(0, 56, 34, -1.6, -1.6 + 6.3 * kr2); g.stroke(); }
  if (kl > 0) { g.beginPath(); g.roundRect(-86, -24, 172 * kl, 48, 8); g.stroke(); }
  cross(g, 0, 0, r * 0.8, prog(t, T.against - 0.1, T.against + 0.4), { color: ROAD.red });
  g.restore();
}
// nhãn vàng "dot above" / "dot below" + mũi tên chỉ đúng chấm (tính cả độ nghiêng của biển)
function divLabels(g, P, t) {
  const T = P.T, [x, y] = DIV, r = 150, lean = smooth(prog(t, T.fading, T.long + 0.6)), th = -0.42 * lean, p = outBack(prog(t, T.sign - 0.15, T.sign + 0.35));
  const at = dy => { const yy = -r + 26 * lean + dy * p; return [x - Math.sin(th) * yy, y + r + Math.cos(th) * yy]; };
  [['dot above', -56, T.dot1, y - 40], ['dot below', 56, T.dot2, y + 92]].forEach(([s, dy, a, ly]) => {
    const k = prog(t, a - 0.05, a + 0.35); if (k <= 0) return;
    const [dx, dyy] = at(dy);
    typed(g, s, x + 300, ly, k * 1.6, 'italic 600 54px "Cormorant Garamond"', ROAD.gold);
    arrow(g, x + 286, ly - 16, dx + 42, dyy, prog(t, a + 0.1, a + 0.45), { color: ROAD.gold, w: 4, bend: 0 });
  });
}
function rulebook(g, x, y, k) {                          // biển luật PEMDAS (như a0)
  const p = clamp(k); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.3 + 0.7 * outBack(p)); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-180, -62, 360, 124, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(-170, -52, 340, 104, 9); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 4); g.restore();
}
// ổ gà ở chỗ ngã ba: vết nứt toả ra (kc), lỗ thủng mép răng cưa lộ nền đất (kh)
function pothole(g, x, y, kc, kh) {
  if (kc <= 0) return;
  g.save();
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * Math.PI * 2 + hash(i * 3.7) * 0.5, L = 90 + hash(i * 5.1) * 120;
    const P = Array.from({ length: 7 }, (_, j) => { const u = j / 6, aa = a + (hash(i * 11 + j) - 0.5) * 0.5;
      return [x + Math.cos(aa) * (30 + L * u), y + Math.sin(aa) * (30 + L * u) * 0.8]; });
    hand(g, P, { w: 4, color: '#17191C', k: clamp(kc * 1.4 - i * 0.04), seed: i + 20, jit: 3 });
  }
  if (kh > 0) {
    const R = 150 * outBack(kh), pts = Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2, rr = R * (0.72 + hash(i * 7.3) * 0.4);
      return [x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.85]; });
    const poly = (d) => { g.beginPath(); pts.forEach(([px, py], i) => { const qx = x + (px - x) * d, qy = y + (py - y) * d; i ? g.lineTo(qx, qy) : g.moveTo(qx, qy); }); g.closePath(); };
    g.fillStyle = '#5B554B'; poly(1.12); g.fill();     // mép nhựa vỡ
    g.fillStyle = '#2B2418'; poly(1); g.fill();        // đất bên dưới
    g.fillStyle = '#16120C'; poly(0.62); g.fill();     // lòng hố
  }
  g.restore();
}
