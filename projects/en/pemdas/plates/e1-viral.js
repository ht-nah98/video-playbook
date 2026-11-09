// e1 — "Back to the viral sum" (p2 câu 62–69), MỞ HỒI BỐN. Toạ độ THẾ GIỚI, đường chính y = 540, camera = tâm x.
//   x −3000–2000  bài viral 6 ÷ 2(1 + 2) = ? sơn trên đường; xe đọc từng chữ (62); ngoặc trước: 1 + 2 sơn lại 3 (63)
//   x 2000–4180   NGÃ BA của mở bài (a0-open.js FORK), nhánh dài hơn:
//                 nhánh TRÊN 6 ÷ 2 × 3 — cùng cấp, trái → phải: 6 ÷ 2 → 3, 3 × 3 → 9           (63–65)
//                 nhánh DƯỚI 6 ÷ 2(3) — số 2 dính ngoặc khoanh vàng, rào ưu tiên; 2(3) → 6, 6 ÷ 6 → 1 (66–69)
//                 không nhánh nào sai: KHÔNG đỏ, cả 9 và 1 đều vàng.
//   x 4180+       đường chính nằm ngang — camera lướt tới trước khi cảnh sau vào.
import { W, clamp, prog, smooth, outBack, ROAD, verge, road, centerLine, paint as paint0, sign, car, card, typed,
  ring, actTitle, must, lookup } from '../kit.js';

const paint = (g, s, x, y, size, o = {}) => { if ((o.k ?? 1) > 0) paint0(g, s, x, y, size, o); };   // k = 0: không khoét vạch
const Y = 540, X0 = 2000, C = 640, S = 900, D = 250, SZ = 120, UX = 3060;
const fork = sg => g => { const y = Y + sg * D; g.moveTo(X0, Y); g.bezierCurveTo(X0 + 300, Y, X0 + 320, y, X0 + C, y); g.lineTo(X0 + C + S, y);
  g.bezierCurveTo(X0 + C + S + 320, y, X0 + C + S + 340, Y, X0 + 2 * C + S, Y); };
const PATHS = [g => { g.moveTo(-3000, Y); g.lineTo(X0 + 2, Y); }, g => { g.moveTo(X0 + 2 * C + S - 2, Y); g.lineTo(12000, Y); }, fork(-1), fork(1)];
// đường cong tách nhánh, lấy mẫu một lần để xe bám đúng làn
const BZ = (() => { const P = [[X0, 0], [X0 + 300, 0], [X0 + 320, 1], [X0 + C, 1]], out = [];
  for (let i = 0; i <= 120; i++) { const u = i / 120, a = (1 - u) ** 3, b = 3 * u * (1 - u) ** 2, c = 3 * u * u * (1 - u), d = u ** 3;
    out.push([a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1]]); }
  return out; })();
function branchY(sg, x) {                              // tâm làn nhánh sg (−1 trên, +1 dưới) tại x (chỉ dùng tới hết đoạn thẳng)
  if (x <= X0) return Y; if (x >= X0 + C) return Y + sg * D;
  let i = 0; while (BZ[i + 1][0] < x) i++; const [x0, f0] = BZ[i], [x1, f1] = BZ[i + 1];
  return Y + sg * D * (f0 + (f1 - f0) * (x - x0) / (x1 - x0 || 1));
}
function carOn(g, sg, x) {                             // xe chạy theo làn: nghiêng theo đường cong, lệch xuống nửa dưới làn
  const a = Math.atan2(branchY(sg, x + 6) - branchY(sg, x - 6), 12);
  car(g, x - Math.sin(a) * 92, branchY(sg, x) + Math.cos(a) * 92, a, { s: 0.8 });
}
function layout(toks, x, y) {                          // toks: [chữ, dính-trước?] → [{s, x, w, l, r}] căn giữa tại x
  const c = document.createElement('canvas').getContext('2d'); c.font = `800 ${SZ}px "Archivo"`; let cx = 0;
  const L = toks.map(([s, tight], i) => { const w = c.measureText(s).width; if (i) cx += tight ? SZ * 0.05 : SZ * 0.32; const o = { s, x: cx + w / 2, w }; cx += w; return o; });
  return L.map(o => ({ ...o, x: o.x + x - cx / 2, l: o.x + x - cx / 2 - o.w / 2, r: o.x + x - cx / 2 + o.w / 2, y }));
}
function patch(g, x0, x1, y, hh, k) {                  // vá nhựa mới (sẫm hơn) phủ đoạn cũ trước khi sơn kết quả
  if (k <= 0) return; g.save(); g.fillStyle = '#2F3237'; g.beginPath(); g.roundRect(x0, y - hh, (x1 - x0) * clamp(k), hh * 2, 10); g.fill(); g.restore();
}

export default class Viral {
  static ERA = 'road';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      sum: w(62, 'sum'), l62end: L(62).end, bracket: w(63, 'bracket'), three: w(63, 'three'), leaves: w(63, 'leaves'),
      u6: w(63, 'six'), uDiv: w(63, 'divided'), u2: w(63, 'two', 2), uX: w(63, 'times'), u3: w(63, 'three', 2),
      mul: w(64, 'multiplication'), div: w(64, 'division'), same: w(64, 'same'), left: w(64, 'left'),
      r6: w(65, 'six'), rDiv: w(65, 'divided'), r2: w(65, 'two'), rIs3: w(65, 'three'), r3: w(65, 'three', 2), rX: w(65, 'times'),
      r3b: w(65, 'three', 3), nine: w(65, 'nine'), people: w(66, 'people'), l66: L(66).start,
      two67: w(67, 'two'), touching: w(67, 'touching'), hand: w(68, 'handwritten'), eng: w(68, 'engineering'), glued: w(68, 'glued-on'),
      stronger: w(68, 'stronger'), two69: w(69, 'two'), six69: w(69, 'six'), one69: w(69, 'one'), next: L(70).start,
    };
    const T = this.T;
    this.START = L(62).start; this.FROM = this.START - 2.6;
    // toán trên hình — mọi kết quả là số code trả về
    this.v = { br: must('1 + 2', 3), a: must('6 ÷ 2', 3), b: must('3 × 3', 9), up: must('6 ÷ 2 × 3', 9),
      c: must('2 × 3', 6), d: must('6 ÷ 6', 1), lo: must('6 ÷ (2 × 3)', 1) };
    if (this.v.b !== this.v.up || this.v.d !== this.v.lo) throw new Error('e1: bước tính không khớp kết quả');
    this.ROW0 = layout([['6'], ['÷'], ['2'], ['(', 1], ['1', 1], ['+'], ['2'], [')', 1], ['='], ['?']], 950, Y);
    this.UP = layout([['6'], ['÷'], ['2'], ['×'], [String(this.v.br)]], UX, Y - D);
    this.LO = layout([['6'], ['÷'], ['2'], ['(', 1], [String(this.v.br), 1], [')', 1]], UX, Y + D);
    const W1 = tl.lines[62].words, at = (word, n = 1) => { let c = 0; for (const x of W1) if (x.w === word && ++c === n) return x.start; throw new Error('e1: ' + word); };
    this.READ = [at('six'), at('divided'), at('two'), at('bracket'), at('one'), at('plus'), at('two', 2), at('two', 2) + 0.3, T.l62end, T.l62end + 0.25];
    this.END = T.next - 1.2;                             // FROM của e2-calc: đường chính phải nằm ngang từ đây
    this.CAM = [[this.FROM, 860], [T.leaves - 0.2, 1040], [T.leaves + 0.6, 3060], [this.END - 0.75, 3140], [this.END, 5300]];
  }
  camX(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1]; return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0))); }
  // xe 1: đọc bài viral trên đường chính rồi rẽ nhánh TRÊN; xe 2: vào nhánh DƯỚI
  car1(t) {
    const T = this.T, R = this.ROW0, U = this.UP, R0 = this.READ;
    if (t < T.left) return seg([[R0[0] - 0.8, R[0].x - 260], ...R0.map((rt, i) => [rt, R[i].x])], t);
    const K = [[T.left, R.at(-1).x], [T.r6, U[0].x], [T.rDiv, U[1].x], [T.r2, U[2].x], [T.rX, U[3].x], [T.r3b, U[4].x], [T.nine + 0.3, U[4].x], [T.nine + 0.9, U[4].x + 330]];
    return seg(K, t);
  }
  car2(t) {
    const T = this.T, Lo = this.LO, mid = (Lo[2].x + Lo[5].x) / 2;
    return seg([[T.l66, 1300], [T.people + 1.0, Lo[0].x - 150], [T.two69, Lo[0].x - 150], [T.two69 + 0.5, mid], [T.one69 + 0.2, mid], [T.one69 + 0.8, Lo[5].x + 330]], t);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.sum, kind: 'type' }, { t: T.l62end + 0.25, kind: 'question' }, { t: T.bracket, kind: 'pop' }, { t: T.three, kind: 'snap' },
      { t: T.mul, kind: 'pop' }, { t: T.left, kind: 'tick' }, { t: T.rIs3, kind: 'snap' }, { t: T.nine, kind: 'snap' },
      { t: T.people, kind: 'tick' }, { t: T.two67, kind: 'pop' }, { t: T.stronger, kind: 'pop' }, { t: T.six69, kind: 'snap' }, { t: T.one69, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t), v = this.v, R = this.ROW0, U = this.UP, Lo = this.LO;
    g.save(); verge(g); g.translate(W / 2 - cx, 0);
    road(g, PATHS); for (const p of PATHS) centerLine(g, p);
    sign(g, null, '?', X0 + 560, Y, 50, 1);              // ngã ba không biển (như mở bài)

    // ── bài viral trên đường chính ──
    const ks = prog(t, T.sum - 0.1, T.sum + 0.9);
    R.forEach((q, j) => { if (j >= 4 && j <= 6 && t >= T.three) return; paint(g, q.s, q.x, Y, SZ, { k: clamp(ks * R.length - j), color: q.s === '?' ? ROAD.yellow : ROAD.paint }); });
    let ri = -1; this.READ.forEach((rt, i) => { if (t >= rt) ri = i; });
    if (ri >= 0 && t < T.l62end + 0.6) { const q = R[ri]; g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 6; g.beginPath(); g.roundRect(q.x - Math.max(52, q.w / 2 + 14), Y - 74, Math.max(104, q.w + 28), 148, 14); g.stroke(); g.restore(); }
    const bx = (R[3].l + R[7].r) / 2;                    // ngoặc trước: biển ( ), khoanh, vá + sơn 3
    sign(g, 'P', '( )', bx, 260, 56, prog(t, T.bracket - 0.1, T.bracket + 0.3));
    ring(g, bx, Y, (R[7].r - R[3].l) / 2 + 22, 90, prog(t, T.bracket, T.bracket + 0.5), { color: ROAD.gold, w: 6 });
    patch(g, R[4].l - 8, R[6].r + 8, Y, 72, prog(t, T.three - 0.25, T.three));
    paint(g, String(v.br), (R[4].l + R[6].r) / 2, Y, SZ, { k: prog(t, T.three, T.three + 0.12), color: ROAD.gold, gap: false });

    // ── nhánh TRÊN: 6 ÷ 2 × 3, trái → phải ──
    const uy = Y - D, ups = [T.u6, T.uDiv, T.u2, T.uX, T.u3];
    U.forEach((q, j) => { if ((j <= 2 && t >= T.rIs3) || t >= T.nine) return; paint(g, q.s, q.x, uy, SZ, { k: prog(t, ups[j] - 0.1, ups[j] + 0.1) }); });
    patch(g, U[0].l - 10, U[2].r + 10, uy, 74, prog(t, T.rIs3 - 0.25, T.rIs3));
    const a3 = (U[0].l + U[2].r) / 2;
    if (t < T.nine) paint(g, String(v.a), a3, uy, SZ, { k: prog(t, T.rIs3, T.rIs3 + 0.12), color: ROAD.gold, gap: false });
    patch(g, U[0].l - 10, U[4].r + 10, uy, 76, prog(t, T.nine - 0.25, T.nine));
    paint(g, String(v.b), (U[0].l + U[4].r) / 2, uy, 150, { k: prog(t, T.nine, T.nine + 0.12), color: ROAD.gold, gap: false });
    // × và ÷ cùng cấp: hai biển tròn xanh ở dải cỏ giữa hai nhánh, khoanh chung
    sign(g, 'MD', '×', U[3].x, Y, 44, prog(t, T.mul - 0.1, T.mul + 0.3)); sign(g, 'MD', '÷', U[1].x, Y, 44, prog(t, T.div - 0.1, T.div + 0.3));
    ring(g, (U[1].x + U[3].x) / 2, Y, (U[3].x - U[1].x) / 2 + 80, 66, prog(t, T.same, T.same + 0.5), { color: ROAD.gold, w: 5 });
    typed(g, 'same level', U[3].x + 100, Y + 14, prog(t, T.same + 0.2, T.same + 0.8), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
    typed(g, 'left to right', 3380, 110, prog(t, T.left, T.left + 0.7), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);

    // ── nhánh DƯỚI: 6 ÷ 2(3), nhân dính ngoặc mạnh hơn ──
    const ly = Y + D, kl = prog(t, T.people - 0.05, T.people + 0.7);
    Lo.forEach((q, j) => { if ((j >= 2 && t >= T.six69) || t >= T.one69) return; paint(g, q.s, q.x, ly, SZ, { k: clamp(kl * Lo.length - j) }); });
    const gx = (Lo[2].l + Lo[5].r) / 2, gr = (Lo[5].r - Lo[2].l) / 2;
    if (t < T.six69) { const pul = 1 + 0.06 * Math.sin(clamp((t - T.touching) / 0.6) * Math.PI);
      ring(g, gx, ly, (gr + 34) * pul, 88 * pul, prog(t, T.two67, T.two67 + 0.5), { color: ROAD.gold, w: 7 });
      for (const x of [(Lo[1].r + Lo[2].l) / 2, Lo[5].r + 22]) post(g, x, ly, prog(t, T.stronger, T.stronger + 0.35)); }
    patch(g, Lo[2].l - 60, Lo[5].r + 60, ly, 84, prog(t, T.six69 - 0.25, T.six69));
    if (t < T.one69) paint(g, String(v.c), gx, ly, SZ, { k: prog(t, T.six69, T.six69 + 0.12), color: ROAD.gold, gap: false });
    patch(g, Lo[0].l - 10, Lo[5].r + 60, ly, 84, prog(t, T.one69 - 0.25, T.one69));
    paint(g, String(v.d), (Lo[0].l + Lo[5].r) / 2, ly, 150, { k: prog(t, T.one69, T.one69 + 0.12), color: ROAD.gold, gap: false });
    typed(g, 'in handwritten maths: physics, engineering', 2300, 1000, prog(t, T.hand, T.eng + 0.6), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
    typed(g, 'glued-on × first', 3420, 1000, prog(t, T.glued, T.glued + 0.7), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);

    // ── xe ──
    const x1 = this.car1(t); if (t < T.left) car(g, x1, Y + 92, 0, { s: 0.8 }); else carOn(g, -1, x1);
    if (t > T.l66) carOn(g, 1, this.car2(t));
    g.restore();
    actTitle(g, 'road', t, this.START, 'ACT FOUR', 'Where the convention runs out');
    card(g, 'road', prog(t, this.START - 0.1, this.START + 1.1), 'ACT FOUR · THE GAP', 'Back to the viral sum');
  }
}

function seg(K, t) {                                   // nội suy từng đoạn [t, x]
  if (t <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) { const [t0, a] = K[i], [t1, b] = K[i + 1];
    if (t <= t1) return a + (b - a) * smooth(clamp((t - t0) / (t1 - t0 || 1))); } return K.at(-1)[1];
}
function post(g, x, y, k) {                            // rào ưu tiên VÀNG quanh 2(3): như một cặp ngoặc vô hình
  if (k <= 0) return; const p = outBack(clamp(k));
  for (const s of [-1, 1]) { g.save(); g.translate(x, y + s * 104); g.scale(p, p);
    g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6; g.fillStyle = ROAD.edge;
    g.beginPath(); g.roundRect(-27, -27, 54, 54, 8); g.fill(); g.shadowColor = 'transparent';
    g.fillStyle = ROAD.gold; g.beginPath(); g.roundRect(-21, -21, 42, 42, 6); g.fill(); g.restore(); }
}
