// ACT ONE · "The part almost everyone gets wrong", nửa sau (p2, câu 9–18). Toạ độ THẾ GIỚI, đường chính y = 540.
//   đoạn 1 (x 0–1920)      10 − 3 + 2: lối rẽ "add first?" (xe xám) ra 5 → rào đỏ + ✗; xe vàng đọc trái → phải: 7, rồi 9 ✓
//   đoạn 2 (x 2400–4320)   8 ÷ 4 × 2: xe vàng ra 2, rồi 4 ✓; lối rẽ "M before D?" ra 8, rồi 1 → rào đỏ + ✗
//   đoạn 3 (x 4800–6720)   "start here" vạch xuất phát; bình luận cãi nhau bật lên ven đường; "× = ÷", "+ = −" sơn lên;
//                          xe vàng lướt qua, bình luận bị hất khỏi lề → đường sạch
// Mọi kết quả do must() tính (DNA §9). Đỏ CHỈ cho lối sai: rào, ✗.
import { clamp, prog, smooth, outCubic, hash, ROAD, verge, road, centerLine, paint, sign, car, barrier, card,
  typed, cross, hand, must, lookup } from '../kit.js';

const Y = 540, BY = Y + 360, X2 = 2400, X3 = 4800, GREY = '#9AA0A6', SZ = 120, BS = 92;
const LABEL = 'italic 600 54px "Cormorant Garamond"';
const MAIN = g => { g.moveTo(-3000, Y); g.lineTo(9000, Y); };
// lối rẽ (đường cái → xuống làn dưới → ra mép dưới khung): mảng điểm theo tham số, để lát dần và cho xe chạy
function branchPts(x0) {
  const P = [], bz = (a, b, c, d, n) => { for (let i = 1; i <= n; i++) { const s = i / n, m = 1 - s;
    P.push([m ** 3 * a[0] + 3 * m * m * s * b[0] + 3 * m * s * s * c[0] + s ** 3 * d[0], m ** 3 * a[1] + 3 * m * m * s * b[1] + 3 * m * s * s * c[1] + s ** 3 * d[1]]); } };
  P.push([x0 + 820, Y]);
  bz([x0 + 820, Y], [x0 + 1100, Y], [x0 + 1120, BY], [x0 + 1400, BY], 30);
  for (let i = 1; i <= 8; i++) P.push([x0 + 1400 + i * 50, BY]);
  bz([x0 + 1800, BY], [x0 + 1980, BY], [x0 + 2060, BY + 120], [x0 + 2120, 1400], 24);
  return P;
}
const B1 = branchPts(0), B2 = branchPts(X2);
const partial = (P, k) => g => { const n = Math.max(1, Math.round((P.length - 1) * clamp(k))); g.moveTo(P[0][0], P[0][1]); for (let i = 1; i <= n; i++) g.lineTo(P[i][0], P[i][1]); };
// sọc bong bóng một màu trung tính (màu cấp ở đây không mang nghĩa — review L9)
const COMMENTS = ['It’s 5!!', 'No. 9.', 'M before D!', 'it’s 1', 'add first, duh', '4, obviously', 'PEMDAS = 5', 'ONE.'], STRIPE = '#8A8F96';

export default class Examples {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2b');
    this.T = {
      // câu 9–12: 10 − 3 + 2
      ten9: w(9, 'ten'), minus9: w(9, 'minus'), three9: w(9, 'three'), plus9: w(9, 'plus'), two9: w(9, 'two'),
      add10: w(10, 'addition'), first10: w(10, 'first'), work10: w(10, 'work'), three10: w(10, 'three'), plus10: w(10, 'plus'),
      two10: w(10, 'two'), five10: w(10, 'five'), ten10: w(10, 'ten'), minus10: w(10, 'minus'), five10b: w(10, 'five', 2), five10c: w(10, 'five', 3),
      read11: w(11, 'read'), left11: w(11, 'left'), ten11: w(11, 'ten'), minus11: w(11, 'minus'), three11: w(11, 'three'),
      seven11: w(11, 'seven'), seven11b: w(11, 'seven', 2), plus11: w(11, 'plus'), two11: w(11, 'two'), nine11: w(11, 'nine'),
      answer12: w(12, 'answer'), nine12: w(12, 'nine'), end12: L(12).end,
      // câu 13–15: 8 ÷ 4 × 2
      or13: L(13).start, eight13: w(13, 'eight'), div13: w(13, 'divided'), four13: w(13, 'four'), times13: w(13, 'times'), two13: w(13, 'two'),
      left14: w(14, 'left'), eight14: w(14, 'eight'), div14: w(14, 'divided'), four14: w(14, 'four'), two14: w(14, 'two'),
      two14b: w(14, 'two', 2), times14: w(14, 'times'), two14c: w(14, 'two', 3), four14b: w(14, 'four', 2),
      mul15: w(15, 'multiplication'), m15: w(15, 'm'), d15: w(15, 'd'), four15: w(15, 'four'), times15: w(15, 'times'),
      two15: w(15, 'two'), eight15: w(15, 'eight'), eight15b: w(15, 'eight', 2), div15: w(15, 'divided'), eight15c: w(15, 'eight', 3),
      one15: w(15, 'one'), wrong15: w(15, 'wrong'), again15: w(15, 'again'),
      // câu 16–18
      start16: w(16, 'start'), matters16: w(16, 'matters'), large17: w(17, 'large'), online17: w(17, 'online'), fights17: w(17, 'fights'),
      misremember17: w(17, 'misremember'), levels17: w(17, 'levels'), mul18: w(18, 'multiplication'), div18: w(18, 'division'),
      eq18: w(18, 'equals'), add18: w(18, 'addition'), sub18: w(18, 'subtraction'), eq18b: w(18, 'equals', 2),
      args18: w(18, 'arguments'), quietly18: w(18, 'quietly'), disappear18: w(18, 'disappear'), end18: L(18).end,
    };
    // toán trên hình: tính bằng code, ném lỗi nếu sai (DNA §9; CONTENT: 10 − 3 + 2 = 9 (sai 5); 8 ÷ 4 × 2 = 4 (sai 1))
    this.R = {
      a7: must('10 − 3', 7), a9: must('7 + 2', 9), aw5: must('3 + 2', 5), aw55: must('10 − 5', 5),
      b2: must('8 ÷ 4', 2), b4: must('2 × 2', 4), bw8: must('4 × 2', 8), bw1: must('8 ÷ 8', 1),
    };
    must('10 − 3 + 2', this.R.a9); must('8 ÷ 4 × 2', this.R.b4);
    must('10 − (3 + 2)', this.R.aw55); must('8 ÷ (4 × 2)', this.R.bw1);
    this.START = L(9).start;
    this.FROM = this.START - 1.2;
    const T = this.T;
    this.CAM = [[this.FROM, 0], [T.or13 - 0.55, 0], [T.or13 + 0.05, X2], [T.start16 - 0.75, X2], [T.start16 - 0.15, X3], [T.end18 + 4, X3]];
    this.M = null;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.minus9, kind: 'pop' }, { t: T.add10, kind: 'question' }, { t: T.five10, kind: 'snap' }, { t: T.five10c, kind: 'snap' },
      { t: T.five10c + 0.2, kind: 'error' }, { t: T.minus11, kind: 'tick' }, { t: T.seven11, kind: 'snap' }, { t: T.plus11, kind: 'tick' },
      { t: T.nine11, kind: 'snap' }, { t: T.nine12, kind: 'correct' }, { t: T.or13 - 0.55, kind: 'whoosh' }, { t: T.div13, kind: 'pop' },
      { t: T.div14, kind: 'tick' }, { t: T.two14, kind: 'snap' }, { t: T.times14, kind: 'tick' }, { t: T.four14b, kind: 'snap' },
      { t: T.four14b + 0.25, kind: 'correct' }, { t: T.mul15, kind: 'question' }, { t: T.eight15, kind: 'snap' }, { t: T.one15, kind: 'snap' },
      { t: T.wrong15, kind: 'error' }, { t: T.start16 - 0.75, kind: 'whoosh' }, { t: T.start16, kind: 'tick' },
      ...COMMENTS.map((_, i) => ({ t: T.large17 + i * 0.26, kind: 'pop' })), { t: T.eq18, kind: 'snap' }, { t: T.eq18b, kind: 'snap' },
      { t: T.args18 + 0.1, kind: 'whoosh' }];
  }
  camX(t) {
    const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1];
    return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0))) + 34 * Math.sin((t - this.FROM) / 5.5);   // trôi chậm qua lại dọc đường
  }
  layout(g) {
    if (this.M) return this.M;
    const R = this.R;
    return (this.M = {
      a: rowAt(g, ['10', '−', '3', '+', '2'], 0, 470, SZ), aw: rowAt(g, ['10', '−', '3', '+', '2'], 0, 1500, BS),
      b: rowAt(g, ['8', '÷', '4', '×', '2'], 0, X2 + 470, SZ), bw: rowAt(g, ['8', '÷', '4', '×', '2'], 0, X2 + 1500, BS),
      eqMD: rowAt(g, ['×', '=', '÷'], 0, X3 + 640, SZ), eqAS: rowAt(g, ['+', '=', '−'], 0, X3 + 1320, SZ), R,
    });
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t), M = this.layout(g), R = this.R;
    g.save(); verge(g); g.translate(-cx, 0);
    const k1 = prog(t, T.add10 - 0.1, T.first10 + 0.3), k2 = prog(t, T.mul15 - 0.1, T.mul15 + 0.6);
    road(g, [MAIN, ...(k1 > 0 ? [partial(B1, k1)] : []), ...(k2 > 0 ? [partial(B2, k2)] : [])]);   // lối rẽ chỉ có khi đã lát
    centerLine(g, MAIN); if (k1 > 0) centerLine(g, partial(B1, k1)); if (k2 > 0) centerLine(g, partial(B2, k2));

    // ══ đoạn 1: 10 − 3 + 2 ══
    const A = M.a, readA = [T.ten9, T.minus9, T.three9, T.plus9, T.two9];
    signsFor(g, t, A, ['AS', 'AS'], [T.minus9, T.plus9]);
    worked(g, t, A, SZ, Y, readA, [T.seven11, T.nine11], [String(R.a7), String(R.a9)], ROAD.gold);
    // lối sai: cộng trước. Trên làn rẽ: "3 + 2" → 5, rồi "10 − 5" → 5 → rào + ✗
    wrongWay(g, t, M.aw, [T.three10, T.plus10, T.two10], T.five10, String(R.aw5), [T.ten10, T.minus10], T.five10c, String(R.aw55));
    typed(g, 'add first?', 520, 860, prog(t, T.add10, T.first10 + 0.4), LABEL, ROAD.edge, { align: 'center' });
    typed(g, 'left to right', 1340, 330, prog(t, T.left11 - 0.1, T.left11 + 0.6), LABEL, ROAD.gold, { align: 'center' });
    const nineX = (A[0].x - A[0].w / 2 + A[4].x + A[4].w / 2) / 2;
    check(g, nineX + 120, Y - 6, 44, prog(t, T.nine12 - 0.15, T.nine12 + 0.3));
    carRun(g, t, [[T.add10 + 0.6, -300], [T.work10, 300], [T.three10, 830], [T.five10, 1340], [T.ten10, 1500], [T.five10c, 1620], [T.five10c + 0.4, 1640]], B1, GREY);

    // ══ đoạn 2: 8 ÷ 4 × 2 ══
    const B = M.b, readB = [T.eight13, T.div13, T.four13, T.times13, T.two13];
    signsFor(g, t, B, ['MD', 'MD'], [T.div13, T.times13]);
    worked(g, t, B, SZ, Y, readB, [T.two14, T.four14b], [String(R.b2), String(R.b4)], ROAD.gold);
    wrongWay(g, t, M.bw, [T.four15, T.times15, T.two15], T.eight15, String(R.bw8), [T.eight15b, T.div15], T.one15, String(R.bw1));
    typed(g, 'M before D?', X2 + 520, 860, prog(t, T.m15 - 0.2, T.d15 + 0.4), LABEL, ROAD.edge, { align: 'center' });
    typed(g, 'left to right', X2 + 1340, 330, prog(t, T.left14 - 0.1, T.left14 + 0.6), LABEL, ROAD.gold, { align: 'center' });
    const fourX = X2 + (B[0].x - B[0].w / 2 + B[4].x + B[4].w / 2) / 2 - X2;
    check(g, fourX + 120, Y - 6, 44, prog(t, T.four14b + 0.1, T.four14b + 0.5));
    // xe vàng = người đọc: một chiếc duy nhất, đọc đoạn 1 rồi chạy sang đoạn 2 (khuất trái khung) và đọc tiếp — không lùi
    carRun(g, t, [[T.read11, -300], [T.ten11, A[0].x], [T.minus11, A[1].x], [T.three11, A[2].x], [T.seven11b, A[2].x + 40], [T.plus11, A[3].x],
      [T.two11, A[4].x], [T.nine11 + 0.2, A[4].x + 160], [T.end12 + 0.8, 1180], [T.or13 + 0.4, X2 - 300],
      [T.left14 - 0.3, X2 - 300], [T.eight14, B[0].x], [T.div14, B[1].x], [T.four14, B[2].x], [T.two14b, B[2].x + 40],
      [T.times14, B[3].x], [T.two14c, B[4].x], [T.four14b + 0.3, B[4].x + 160], [T.mul15 - 0.1, X2 + 2080], [T.start16 - 0.75, X3 - 300]], null, ROAD.gold);
    carRun(g, t, [[T.mul15 + 0.3, X2 - 300], [T.d15, X2 + 600], [T.four15, X2 + 1300], [T.eight15, X2 + 1360], [T.eight15b, X2 + 1500],
      [T.one15, X2 + 1620], [T.one15 + 0.4, X2 + 1640]], B2, GREY);

    // ══ đoạn 3: vì sao quan trọng; tranh cãi tan đi ══
    startLine(g, X3 + 260, prog(t, T.start16 - 0.1, T.start16 + 0.4));
    typed(g, 'start here', X3 + 260, 330, prog(t, T.start16, T.matters16 + 0.2), LABEL, ROAD.gold, { align: 'center' });
    const sw = this.sweepX(t);
    COMMENTS.forEach((s, i) => {
      const k = prog(t, T.large17 + i * 0.26, T.large17 + i * 0.26 + 0.3); if (k <= 0) return;   // bật ngay từ "large": không để khoảng trống sau vạch xuất phát
      const top = i % 2 === 0, x = X3 + 560 + i * 150 + hash(i * 7) * 50, y = top ? 300 + hash(i * 5) * 40 : 790 + hash(i * 3) * 90;
      const out = smooth(clamp((sw - x + 120) / 260));                   // xe lướt tới thì hất văng khỏi lề
      if (out >= 1) return;
      const wob = Math.sin((t - T.misremember17) * 18 + i) * 0.05 * prog(t, T.misremember17, T.levels17 + 0.2) * (1 - prog(t, T.levels17 + 0.6, T.levels17 + 1.2));
      bubble(g, s, x + out * 160, y + (top ? -1 : 1) * out * 700, k, STRIPE, wob + (top ? -1 : 1) * out * 0.6);
    });
    const eq = (row, tt, ttEq) => row.forEach((o, i) => { const k = prog(t, i === 1 ? ttEq : tt[i === 0 ? 0 : 1], (i === 1 ? ttEq : tt[i === 0 ? 0 : 1]) + 0.3);
      if (k > 0) paint(g, o.s, o.x, Y - 6, SZ, { k, color: i === 1 ? ROAD.gold : ROAD.paint }); });
    eq(M.eqMD, [T.mul18, T.div18], T.eq18); eq(M.eqAS, [T.add18, T.sub18], T.eq18b);
    if (t > T.args18 - 0.6) car(g, sw, Y + 112, 0, { s: 0.72 });
    g.restore();

    card(g, 'road', prog(t, this.FROM, this.FROM + 1.0), 'ACT ONE · THE RULE', 'Same level, left to right');
  }
  sweepX(t) { const T = this.T; return X3 - 300 + (2600 + 300) * smooth(prog(t, T.args18 - 0.5, T.disappear18 + 0.6)); }
}

// hàng token cách đều căn giữa ở cx → [{s, x, w}]
function rowAt(g, toks, _, cx, size) {
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = toks.map(s => g.measureText(s).width); g.restore();
  const gap = size * 0.34, tot = ws.reduce((a, b) => a + b, 0) + gap * (toks.length - 1);
  let x = cx - tot / 2; return toks.map((s, i) => { const o = { s, x: x + ws[i] / 2, w: ws[i] }; x += ws[i] + gap; return o; });
}
// sơn lại: con lăn quét trái → phải; phải con lăn còn chữ cũ, trái là chữ mới
function repaint(g, drawOld, drawNew, x0, x1, y, size, k) {
  if (k <= 0) { drawOld(); return; }
  if (k >= 1) { drawNew(); return; }
  const sx = x0 + (x1 - x0) * outCubic(k);
  g.save(); g.beginPath(); g.rect(sx, -5000, 20000, 10000); g.clip(); drawOld(); g.restore();
  g.save(); g.beginPath(); g.rect(-20000, -5000, sx + 20000, 10000); g.clip(); drawNew(); g.restore();
  g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(sx - 8, y - size * 0.75, 16, size * 1.5, 7); g.fill(); g.restore();
}
const span = (a, b) => [a.x - a.w / 2 - 12, b.x + b.w / 2 + 12];
// a op b op c đọc trái → phải: sơn từng token lúc đọc; bước 1 sơn lại token 0–2 thành r1, bước 2 sơn lại (r1, op, c) thành r2
function worked(g, t, row, size, y, read, [t1, t2], [r1, r2], gold) {
  const pt = (o, k, c) => { if (k > 0) paint(g, o.s, o.x, y - 6, size, { k, color: c }); };
  const k0 = i => prog(t, read[i] - 0.05, read[i] + 0.2);
  const [a0, a1] = span(row[0], row[2]), c1 = (a0 + a1) / 2;
  const [b0, b1] = [a0, span(row[4], row[4])[1]], c2 = (b0 + b1) / 2;
  const s1 = prog(t, t1 - 0.22, t1 + 0.12), s2 = prog(t, t2 - 0.22, t2 + 0.12);
  const stage1 = () => { paint(g, r1, c1, y - 6, size); pt(row[3], 1); pt(row[4], 1); };
  if (s2 > 0) repaint(g, stage1, () => paint(g, r2, c2, y - 6, size, { color: gold }), b0, b1, y, size, s2);
  else {
    repaint(g, () => { pt(row[0], k0(0)); pt(row[1], k0(1)); pt(row[2], k0(2)); }, () => paint(g, r1, c1, y - 6, size), a0, a1, y, size, s1);
    pt(row[3], k0(3)); pt(row[4], k0(4));
  }
}
// lối sai trên làn rẽ: "b op c" sơn lúc đọc → w1; rồi "a op" sơn vào bên trái → "a op w1" → w2 (vẫn trắng) → rào đỏ + ✗
function wrongWay(g, t, row, read, tw1, w1, readL, tw2, w2) {
  const y = BY, pt = (o, k) => { if (k > 0) paint(g, o.s, o.x, y, BS, { k }); };
  const kr = (tt) => prog(t, tt - 0.05, tt + 0.2);
  const [c0, c1] = span(row[2], row[4]), cc = (c0 + c1) / 2;
  const s1 = prog(t, tw1 - 0.22, tw1 + 0.12), s2 = prog(t, tw2 - 0.22, tw2 + 0.12);
  const [d0, d1] = [span(row[0], row[0])[0], c1], dc = (d0 + d1) / 2;
  const after1 = () => { pt(row[0], kr(readL[0])); pt(row[1], kr(readL[1])); paint(g, w1, cc, y, BS); };
  if (s2 > 0) repaint(g, after1, () => paint(g, w2, dc, y, BS), d0, d1, y, BS, s2);
  else repaint(g, () => { pt(row[2], kr(read[0])); pt(row[3], kr(read[1])); pt(row[4], kr(read[2])); }, after1, c0, c1, y, BS, s1);
  const kb = prog(t, tw2 + 0.1, tw2 + 0.5);
  barrier(g, row[4].x + 110, BY - 160, row[4].x + 110, BY + 160, kb);
  cross(g, dc, y, 58, prog(t, tw2 + 0.15, tw2 + 0.55), { color: ROAD.red });
}
// biển cấp bật lên phía trên hai phép
function signsFor(g, t, row, kinds, times) {
  [row[1], row[3]].forEach((o, i) => sign(g, kinds[i], o.s, o.x, 290, 53.4, prog(t, times[i] - 0.05, times[i] + 0.3)));
}
// ✓ vẽ tay màu vàng (font không có ✓)
function check(g, x, y, s, k) {
  if (k <= 0) return;
  hand(g, [[x - s, y], [x - s * 0.62, y + s * 0.38], [x - s * 0.25, y + s * 0.75], [x + s * 0.3, y - s * 0.05], [x + s * 0.7, y - s * 0.55], [x + s, y - s * 0.9]],
    { w: 11, color: ROAD.gold, jit: 1, seed: 8, k });
}
// xe chạy theo mốc [giờ, x]; P = lối rẽ (theo điểm) hoặc null = làn dưới đường chính. Trước mốc đầu: chưa vào khung.
function carRun(g, t, K, P, color) {
  if (t < K[0][0]) return;
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, x0] = K[i], [t1, x1] = K[i + 1], x = x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0)));
  let y = Y + 112, a = 0;
  if (P && x > P[0][0]) {                                              // theo lối rẽ: làn dưới của làn rẽ
    let j = 0; while (j < P.length - 2 && P[j + 1][0] < x) j++;
    const [px, py] = P[j], [qx, qy] = P[j + 1], f = clamp((x - px) / Math.max(1e-6, qx - px));
    a = Math.atan2(qy - py, qx - px); y = py + (qy - py) * f + 112 * Math.cos(a);
  }
  car(g, x, y, a * 0.9, { color, s: 0.72 });
}
function startLine(g, x, k) {                                         // vạch xuất phát ô cờ ngang đường
  if (k <= 0) return;
  const h = 270 * outCubic(clamp(k));
  g.save(); g.beginPath(); g.rect(x - 22, Y - 135, 44, h); g.clip();
  for (let r = 0; r < 12; r++) for (let c = 0; c < 2; c++) { g.fillStyle = (r + c) % 2 ? '#1F2228' : '#EDEBE3'; g.fillRect(x - 22 + c * 22, Y - 135 + r * 22.5, 22, 22.5); }
  g.restore();
}
function bubble(g, s, x, y, k, color, rot = 0) {                     // bình luận (như a0-open): bong bóng trắng, sọc trung tính
  const p = Math.min(1.12, 1 + (1 - k) * -1 + Math.sin(k * Math.PI) * 0.12); if (p <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(p, p); g.font = '500 26px "IBM Plex Mono"'; const w = g.measureText(s).width + 40;
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(-w / 2, -32, w, 64, 14); g.fill(); g.beginPath(); g.moveTo(-14, 30); g.lineTo(0, 50); g.lineTo(10, 30); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = color; g.fillRect(-w / 2, -32, 8, 64);
  g.fillStyle = ROAD.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 4, 1); g.restore();
}
