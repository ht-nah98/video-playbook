// "Brackets beat everything" (p2 câu 26–31). Ngoặc = LÀN ƯU TIÊN CÓ RÀO: hai vạch ngoặc to sơn ôm đoạn đường + rào than
// hai bên làn; xe phải đi hết làn rào trước. Toạ độ THẾ GIỚI: đường chính y = 540; gốc đoạn o, camera trượt dọc đường.
//   đoạn A (o 0)     biển "2" (điểm thứ hai) · "the most important" · biển vuông than ( ) · ALWAYS FIRST giữa hai vạch ngoặc
//   đoạn B (o 2000)  2 × 3 + 4 = ? → "put the addition in brackets": rào dựng quanh 3 + 4 → 7 → = 14
//   đoạn C (o 4000)  cùng đường, bỏ rào ("when we get lazy"): rào nhấc ra cỏ, biển PEMDAS mặc định: 2 × 3 = 6 → = 10
//   đoạn D (o 6000)  (2 × 3) + (8 ÷ 4): mọi phép đều có rào → biển cấp đổ rạp, xám ("almost useless"); xe đi theo rào → 8
//   đoạn E (o 8000)  sơn "HOW WE WRITE AND READ" · "not a property of the numbers"
import { ERA, clamp, prog, smooth, outBack, hash, mk, ROAD, verge, road, centerLine, paint, sign, car, card, typed,
  hand, must, lookup } from '../kit.js';

const Y = 540, LR = 618;
const MAIN = g => { g.moveTo(-4000, Y); g.lineTo(14000, Y); };
const SERIF = s => `italic 600 ${s}px "Cormorant Garamond"`;

export default class Brackets {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      second: w(26, 'second'), important: w(26, 'important'), br26: w(26, 'brackets'), l27: L(27).start,
      always: w(27, 'always'), win: w(27, 'win'), l28: L(28).start, add: w(28, 'add'), multiply: w(28, 'multiply'),
      put: w(28, 'put'), br28: w(28, 'brackets'), done: w(28, 'done'), l29: L(29).start, pemdas29: w(29, 'pemdas'),
      rule29: w(29, 'rule'), lazy: w(29, 'lazy'), leave: w(29, 'leave'), out: w(29, 'out'), short: w(29, 'short'),
      l30: L(30).start, every: w(30, 'every'), bracket30: w(30, 'bracket'), pemdas30: w(30, 'pemdas'), useless: w(30, 'useless'),
      br30: w(30, 'brackets'), tell: w(30, 'tell'), what: w(30, 'what'), first30: w(30, 'first'), l31: L(31).start,
      pemdas31: w(31, 'pemdas'), write: w(31, 'write'), read: w(31, 'read'), not: w(31, 'not'), numbers: w(31, 'numbers'),
    };
    const T = this.T;
    this.START = L(26).start; this.FROM = this.START - 1.2;
    this.END = L(32).start - 1.2 + 0.9;                  // cảnh sau (c3) bắt đầu ở câu 32 − 1.2
    // toán trên hình — tính bằng code (CONTENT.md: 2 × (3 + 4) = 14, không ngoặc 2 × 3 + 4 = 10)
    this.b7 = must('3 + 4', 7); this.b14 = must('2 × (3 + 4)', 14);
    this.c6 = must('2 × 3', 6); this.c10 = must('2 × 3 + 4', 10);
    this.d6 = must('2 × 3', 6); this.d2 = must('8 ÷ 4', 2); this.d8 = must('(2 × 3) + (8 ÷ 4)', 8);
    const ROW = ['2', '×', '(', '3', '+', '4', ')', '=', '?'];
    this.RB = layout(ROW, 2000 + 960, 120);
    this.SB = [{ t: T.done - 0.62, i: 3, j: 5, v: this.b7 }, { t: T.done, i: 8, j: 8, v: this.b14, gold: true }];
    this.RC = layout(ROW, 4000 + 960, 120);
    this.SC = [{ t: T.short - 0.55, i: 0, j: 3, v: this.c6 }, { t: T.short + 0.05, i: 8, j: 8, v: this.c10, gold: true }];
    this.RD = layout(['(', '2', '×', '3', ')', '+', '(', '8', '÷', '4', ')', '=', '?'], 6000 + 960, 92);
    this.SD = [{ t: T.tell, i: 1, j: 3, v: this.d6 }, { t: T.what, i: 7, j: 9, v: this.d2 }, { t: T.first30, i: 12, j: 12, v: this.d8, gold: true }];
    this.CAM = [[this.FROM, 0], [T.l28 - 0.05, 70], [T.l28 + 0.6, 2000], [T.l29 - 0.3, 2070], [T.l29 + 0.35, 4000],
      [T.l30 - 0.5, 4070], [T.l30 + 0.15, 6000], [T.l31 - 0.4, 6070], [T.l31 + 0.3, 8000], [this.END, 8090]];
    const B = this.RB, C = this.RC, D = this.RD;
    this.CARB = [[T.l28 + 0.2, 1900], [T.add + 1.0, B[2].x - 150], [this.SB[0].t - 0.75, B[2].x - 150],
      [this.SB[0].t, B[6].x + 40], [this.SB[1].t, B[8].x + 30], [T.l29 + 0.4, 4500]];
    this.CARC = [[T.l29 + 0.3, 3900], [T.pemdas29 + 0.8, 4180], [this.SC[0].t - 0.5, 4180], [this.SC[0].t, C[3].x + 40],
      [this.SC[1].t, C[8].x + 30], [T.l30 + 0.2, 6400]];
    this.CARD = [[T.l30 + 0.2, 5900], [T.every + 0.6, 6120], [T.br30 - 0.2, 6120], [this.SD[0].t, D[4].x + 40],
      [this.SD[1].t, D[10].x + 40], [this.SD[2].t, D[12].x + 30], [T.l31 + 0.4, 8400]];
  }
  camX(t) { return keyAt(this.CAM, t)[0]; }
  sfx() {
    const T = this.T, c = [{ t: T.br26, kind: 'pop' }, { t: T.always, kind: 'snap' }, { t: T.multiply, kind: 'question' },
      { t: T.br28, kind: 'snap' }, { t: this.SB[0].t, kind: 'snap' }, { t: this.SB[1].t, kind: 'correct' },
      { t: T.pemdas29, kind: 'pop' }, { t: T.leave, kind: 'whoosh' }, { t: this.SC[0].t, kind: 'snap' }, { t: this.SC[1].t, kind: 'snap' },
      { t: T.bracket30, kind: 'snap' }, { t: this.SD[0].t, kind: 'snap' }, { t: this.SD[2].t, kind: 'correct' }, { t: T.pemdas31, kind: 'pop' }];
    for (const k of [T.l28 - 0.05, T.l29 - 0.3, T.l30 - 0.5, T.l31 - 0.4]) c.push({ t: k, kind: 'whoosh' });
    return c;
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, MAIN); centerLine(g, MAIN);

    // ── đoạn A: vai trò của ngoặc ──
    sign(g, null, '2', 1010, 262, 56, prog(t, T.second - 0.1, T.second + 0.3));
    typed(g, 'the second point', 1100, 250, prog(t, T.second, T.second + 0.8), SERIF(54), ROAD.edge);
    typed(g, '…the most important one', 1100, 330, prog(t, T.important - 0.2, T.important + 0.8), SERIF(44), ROAD.gold);
    sign(g, 'P', '( )', 960, 860, 84, prog(t, T.br26 - 0.1, T.br26 + 0.35));
    kerb(g, 560, '(', prog(t, T.l27 - 0.1, T.l27 + 0.35)); kerb(g, 1360, ')', prog(t, T.l27 + 0.05, T.l27 + 0.5));
    paint(g, 'ALWAYS FIRST', 960, Y, 92, { k: prog(t, T.always - 0.05, T.win + 0.25), color: ROAD.gold });

    // ── đoạn B: muốn cộng trước? đặt ngoặc ──
    const B = this.RB, kB = prog(t, T.l28 + 0.2, T.l28 + 0.8), kf = prog(t, T.br28 - 0.25, T.br28 + 0.2);
    evalRow(g, t, B, this.SB, Y, 120, kB);
    sign(g, 'MD', '×', B[1].x, 300, 48, prog(t, T.multiply - 0.1, T.multiply + 0.3));
    sign(g, 'AS', '+', B[4].x, 300, 48, prog(t, T.add - 0.05, T.add + 0.35));
    fence(g, B[2].x, B[6].x, kf);
    typed(g, 'add first? put it in brackets', 2000 + 300, 800, prog(t, T.put - 0.1, T.br28 + 0.4), SERIF(54), ROAD.edge);
    typed(g, '2 × (3 + 4) = ' + this.b14, 2000 + 300, 890, prog(t, T.done, T.done + 0.6), '800 46px "Archivo"', ROAD.gold);
    if (t > T.l28 && t < T.l29 + 0.6) car(g, keyAt(this.CARB, t)[0], LR, 0, { s: 0.8 });

    // ── đoạn C: bỏ ngoặc → luật mặc định ──
    const C = this.RC, kl = prog(t, T.leave - 0.05, T.out + 0.2);
    if (kl < 1) { kerb(g, C[2].x, '(', 1); kerb(g, C[6].x, ')', 1); }
    patch(g, C[2].x - 66, 404, 132, 272, kl); patch(g, C[6].x - 66, 404, 132, 272, kl);
    evalRow(g, t, C, this.SC, Y, 120, 1);
    railOut(g, C[2].x, C[6].x, kl);                     // rào kéo đi dọc đường, ra khỏi khung
    rulebook(g, 4000 + 1580, 250, prog(t, T.pemdas29 - 0.1, T.pemdas29 + 0.3));
    typed(g, 'the default rule', 4000 + 1580, 368, prog(t, T.rule29 - 0.1, T.rule29 + 0.6), SERIF(44), ROAD.edge, { align: 'center' });
    typed(g, 'for when we get lazy', 4000 + 300, 800, prog(t, T.lazy - 0.4, T.lazy + 0.5), SERIF(54), ROAD.gold);
    typed(g, '2 × 3 + 4 = ' + this.c10, 4000 + 300, 890, prog(t, this.SC[1].t, this.SC[1].t + 0.6), '800 46px "Archivo"', ROAD.edge);
    sign(g, 'MD', '×', C[1].x, 300, 48, prog(t, T.leave + 0.2, T.leave + 0.55));
    sign(g, 'AS', '+', C[4].x, 300, 48, prog(t, T.leave + 0.35, T.leave + 0.7));
    if (t > T.l29 && t < T.l30 + 0.6) car(g, keyAt(this.CARC, t)[0], LR, 0, { s: 0.8 });

    // ── đoạn D: mọi phép đều có rào → biển cấp thừa ──
    const D = this.RD, ku = prog(t, T.useless - 0.1, T.useless + 0.5);
    evalRow(g, t, D, this.SD, Y, 92, prog(t, T.l30 - 0.2, T.l30 + 0.4));
    fence(g, D[0].x, D[4].x, prog(t, T.every - 0.1, T.every + 0.3)); fence(g, D[6].x, D[10].x, prog(t, T.bracket30 - 0.1, T.bracket30 + 0.3));
    [[2, 'MD', '×'], [5, 'AS', '+'], [8, 'MD', '÷']].forEach(([i, kd, s], n) =>
      fallSign(g, kd, s, D[i].x, 300, 44, prog(t, T.l30 + 0.1 + n * 0.12, T.l30 + 0.45 + n * 0.12), ku));
    g.save(); if (ku > 0) g.filter = `grayscale(${ku}) brightness(${1 - 0.3 * ku})`;
    rulebook(g, 6000 + 1500, 860, prog(t, T.pemdas30 - 0.1, T.pemdas30 + 0.3)); g.restore();
    typed(g, 'almost useless', 6000 + 1500, 985, prog(t, T.useless, T.useless + 0.6), SERIF(44), ERA.road.dim, { align: 'center' });
    typed(g, 'every bracket written', 6000 + 260, 860, prog(t, T.every - 0.2, T.bracket30 + 0.5), SERIF(54), ROAD.edge);
    typed(g, 'the brackets already say what goes first', 6000 + 260, 950, prog(t, T.br30, T.tell + 0.3), SERIF(44), ROAD.gold);
    if (t > T.l30 && t < T.l31 + 0.6) car(g, keyAt(this.CARD, t)[0], LR, 0, { s: 0.8 });

    // ── đoạn E: luật của cách viết và đọc ──
    rulebook(g, 8000 + 1460, 250, prog(t, T.pemdas31 - 0.1, T.pemdas31 + 0.3));
    typed(g, 'is a rule about…', 8000 + 1460, 368, prog(t, T.pemdas31 + 0.4, T.write - 0.1), SERIF(44), ROAD.edge, { align: 'center' });
    paint(g, 'HOW WE WRITE', 8000 + 620, Y, 92, { k: prog(t, T.write - 0.45, T.write + 0.15) });
    paint(g, 'AND READ', 8000 + 1330, Y, 92, { k: prog(t, T.read - 0.15, T.read + 0.3) });
    typed(g, 'not a property of the numbers themselves', 8000 + 960, 840, prog(t, T.not - 0.1, T.numbers + 0.6), SERIF(64), ROAD.gold, { align: 'center' });
    g.restore();

    card(g, 'road', prog(t, this.FROM, this.FROM + 1), 'ACT TWO · A CHOICE', 'Brackets beat everything');
  }
}

// ── đồ nghề cục bộ ──
function keyAt(K, t) {
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, ...a] = K[i], [t1, ...b] = K[i + 1], u = smooth(clamp((t - t0) / (t1 - t0)));
  return a.map((v, j) => v + (b[j] - v) * u);
}
const MC = mk(8, 8).getContext('2d');
function layout(items, cx, size, gap = 0.34) {
  MC.font = `800 ${size}px "Archivo"`;
  const ws = items.map(s => (s === '(' || s === ')') ? size * 0.7 : MC.measureText(s).width);
  const tot = ws.reduce((a, b) => a + b, 0) + size * gap * (items.length - 1);
  let x = cx - tot / 2;
  return items.map((s, i) => { const r = { s, x: x + ws[i] / 2, w: ws[i] }; x += ws[i] + size * gap; return r; });
}
let AS;
function asph(g) {
  if (!AS) { const n = 512, c = mk(n, n), x = c.getContext('2d'), d = x.createImageData(n, n), b = [0x34, 0x37, 0x3C];
    for (let i = 0; i < n * n; i++) { const v = (hash(i * 0.613 + 2) - 0.5) * 22; for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] + v; d.data[i * 4 + 3] = 255; }
    x.putImageData(d, 0, 0); AS = g.createPattern(c, 'repeat'); }
  return AS;
}
function patch(g, x, y, w, h, k) {
  if (k <= 0) return; g.save(); g.fillStyle = asph(g); g.beginPath(); g.roundRect(x, y, w * clamp(k), h, 10); g.fill();
  g.restore();
}
function evalRow(g, t, row, steps, y, size, kIn) {
  const act = steps.filter(s => t >= s.t - 0.12);
  const live = act.filter(s => !act.some(o => o !== s && o.t > s.t && t >= o.t - 0.12 && o.i <= s.i && o.j >= s.j));
  row.forEach((r, n) => { if (r.s === '(' || r.s === ')') return; if (act.some(s => n >= s.i && n <= s.j && t >= s.t)) return;
    paint(g, r.s, r.x, y, size, { k: clamp(kIn * row.length - n), color: r.s === '?' ? ROAD.yellow : ROAD.paint }); });
  for (const s of live) {
    const a = row[s.i].x - row[s.i].w / 2, b = row[s.j].x + row[s.j].w / 2;
    patch(g, a - 14, y - size * 0.52, b - a + 28, size * 1.04, prog(t, s.t - 0.12, s.t));
    if (t >= s.t) paint(g, String(s.v), (a + b) / 2, y, size, { k: prog(t, s.t, s.t + 0.22), color: s.gold ? ROAD.gold : ROAD.paint });
  }
}
/** Vạch ngoặc to sơn trên mặt đường (cong ôm làn), vẽ dần theo k. */
function kerb(g, x, side, k) {
  if (k <= 0) return; const d = side === '(' ? 1 : -1;
  const P = Array.from({ length: 25 }, (_, i) => { const u = i / 24, yy = 418 + u * 244; return [x - d * 34 * Math.sin(u * Math.PI) + d * 12, yy]; });
  hand(g, P, { w: 18, color: ROAD.paint, jit: 1, seed: side === '(' ? 31 : 37, k });
}
/** Rào than (không đỏ: đây là làn ưu tiên, không phải lối sai): thanh tối + cọc trắng; trồi lên theo k. */
function rail(g, x0, x1, y, k, rot = 0) {
  if (k <= 0) return; const L = (x1 - x0) * clamp(k);
  g.save(); g.translate(x0, y); g.rotate(rot); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6;
  g.fillStyle = ROAD.P; g.fillRect(0, -8, L, 16); g.shadowColor = 'transparent'; g.fillStyle = ROAD.edge;
  for (let x = 0; x <= L; x += 56) g.fillRect(x - 5, -11, 10, 22);
  g.restore();
}
/** Làn rào: hai vạch ngoặc + rào trên/dưới, dựng theo k. */
function fence(g, xa, xb, k) {
  if (k <= 0) return; kerb(g, xa, '(', clamp(k * 1.6)); kerb(g, xb, ')', clamp(k * 1.6));
  rail(g, xa, xb, 410, clamp(k * 1.4 - 0.3)); rail(g, xa, xb, 670, clamp(k * 1.4 - 0.3));
}
function railOut(g, xa, xb, kl) {                       // bỏ ngoặc: rào trượt dọc đường sang phải, ra khỏi khung
  const dx = 1600 * smooth(clamp(kl)) ** 1.5;
  rail(g, xa + dx, xb + dx, 410, 1); rail(g, xa + dx, xb + dx, 670, 1);
}
function fallSign(g, kind, s, x, y, r, k, ku) {          // biển cấp đổ rạp + xám khi thừa
  if (k <= 0) return; const e = smooth(clamp(ku));
  g.save(); g.translate(x, y + r * 0.9 * e); g.scale(1, 1 - 0.65 * e); if (e > 0) g.filter = `grayscale(${e}) brightness(${1 - 0.35 * e})`;
  sign(g, kind, s, 0, 0, r, k); g.restore();
}
function rulebook(g, x, y, k) {                          // biển luật PEMDAS (như a0-open)
  const p = clamp(k); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.3 + 0.7 * outBack(p)); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-180, -62, 360, 124, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(-170, -52, 340, 104, 9); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 4); g.restore();
}
