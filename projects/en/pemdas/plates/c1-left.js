// ACT TWO mở hồi + "Left to right" (p2 câu 19–25). Một con đường dài, camera trượt dọc theo lời. Toạ độ THẾ GIỚI:
// đường chính y = 540; mỗi đoạn rộng một khung, gốc đoạn = o (camera đứng ở o + trôi chậm).
//   đoạn 0 (o 0)      thẻ ACT TWO; bốn biển cấp bật lên: "phần nào do người quyết?"; tảng đá trơn = tự nhiên không ép
//   đoạn 1 (o 2000)   10 − 3 + 2: hai biển thoi cùng cấp, xe đọc trái → phải, 7 rồi 9
//   đoạn 2 (o 4000)   chữ Ả Rập viết phải → trái: ba mũi tên ← sơn quét từ phải sang (KHÔNG vẽ chữ Ả Rập)
//   đoạn 3 (o 6000)   APL: bảng chữ 'APL · 1960s'; xe quay đầu, chạy NGƯỢC (chỗ duy nhất): 2 × 3 + 4 → 3 + 4 = 7 → 2 × 7 = 14;
//                     biển cấp lật thành biển trắng như nhau ("no ladder of priorities")
//   đoạn 4 (o 8000)   tháp luỹ thừa = cầu dẫn hai tầng: 2 (mặt đường) · 3 (tầng 1) · 2 (tầng 2); tính từ trên xuống:
//                     3² = 9 rồi 2⁹ = 512 (vàng ✓); nhánh (2³)² = 64 bị rào đỏ + ✗
//   đoạn 5 (o 10000)  "No law of nature…": tảng đá trơn, ← OR → sơn trên đường
import { clamp, prog, smooth, outBack, outCubic, hash, mk, ROAD, verge, centerLine, paint, sign, car, barrier,
  billboard, card, actTitle, typed, cross, strike, ring, arrow, hand, must, lookup } from '../kit.js';

const PHOTOS = false;                                   // bật khi người dùng tải apl-keyboard.jpg (điền IMAGES)
const Y = 540, LR = 632, LL = 448;                      // lane phải (xe chạy → ) / lane trái (xe APL chạy ←)
const MAIN = g => { g.moveTo(-4000, Y); g.lineTo(16000, Y); };
const O4 = 8000;
const RAMP1 = g => { g.moveTo(O4 + 560, Y); g.bezierCurveTo(O4 + 800, Y, O4 + 760, 300, O4 + 1000, 300); g.lineTo(O4 + 1300, 300); };
const RAMP2 = g => { g.moveTo(O4 + 1180, 300); g.bezierCurveTo(O4 + 1350, 300, O4 + 1330, 150, O4 + 1500, 150); g.lineTo(O4 + 1760, 150); };
const WRONG = g => { g.moveTo(O4 + 760, Y); g.bezierCurveTo(O4 + 1000, Y, O4 + 980, 850, O4 + 1220, 850); g.lineTo(O4 + 1900, 850); };
const SERIF = s => `italic 600 ${s}px "Cormorant Garamond"`;

export default class Left {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = PHOTOS ? { apl: 'assets/apl-keyboard.jpg' } : {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      parts: w(19, 'parts'), decide: w(19, 'decide'), nature: w(19, 'nature'), them: w(19, 'them'),
      l20: L(20).start, first20: w(20, 'first'), left20: w(20, 'left'), ops: w(21, 'operations'), same: w(21, 'same'), level: w(21, 'level'),
      leftOne: w(21, 'left'), first21: w(21, 'first'), but: w(21, 'but'), choice: w(21, 'choice'),
      arabic: w(22, 'arabic'), rtl: w(22, 'right'), agreed: w(22, 'agreed'), sums: w(22, 'sums'),
      l23: L(23).start, someone: w(23, 'someone'), sixties: w(23, 'sixties'), prog23: w(23, 'programming'), apl: w(23, 'apl'), read23: w(23, 'read'),
      expr: w(23, 'expression'), right23: w(23, 'right'), left23: w(23, 'left'), with23: w(23, 'with'), ladder: w(23, 'ladder'),
      l24: L(24).start, two1: w(24, 'two', 1), three: w(24, 'three'), two2: w(24, 'two', 2), tower: w(24, 'tower'),
      top: w(24, 'top'), down: w(24, 'down'), five: w(24, 'five'), twelve: w(24, 'twelve'), sixty: w(24, 'sixty-four'),
      l25: L(25).start, nature25: w(25, 'nature'), must: w(25, 'must'), from25: w(25, 'from'), left25: w(25, 'left'),
      right25: w(25, 'right'), end: L(25).end,
    };
    const T = this.T;
    this.START = L(19).start; this.FROM = this.START - 2.6;
    this.END = L(26).start - 1.2 + 0.9;                  // cảnh sau (c2) bắt đầu ở câu 26 − 1.2
    // toán trên hình — tính bằng code
    this.v7 = must('10 − 3', 7); this.v9 = must('10 − 3 + 2', 9);
    this.apl7 = must('3 + 4', 7); this.apl14 = must('2 × (3 + 4)', 14);
    this.t9 = must('3 ^ 2', 9); this.t512 = must('2 ^ 3 ^ 2', 512); must('2 ^ 9', 512); this.t64 = must('(2 ^ 3) ^ 2', 64);
    // hàng chữ sơn
    this.R1 = layout(['10', '−', '3', '+', '2'], 2000 + 1060, 120);
    this.S1 = [{ t: T.leftOne + 0.15, i: 0, j: 2, v: this.v7 }, { t: T.first21 + 0.45, i: 0, j: 4, v: this.v9, gold: true }];
    this.R3 = layout(['2', '×', '3', '+', '4'], 6000 + 860, 120);
    this.S3 = [{ t: T.left23, i: 2, j: 4, v: this.apl7 }, { t: T.with23, i: 0, j: 4, v: this.apl14, gold: true }];
    // camera: [t, x] — giữ đoạn thì trôi chậm 70 px; trượt giữa các đoạn 0.7 s
    this.CAM = [[this.FROM, 0], [T.l20 - 0.6, 70], [T.l20 + 0.1, 2000], [T.arabic - 0.25, 2070], [T.arabic + 0.45, 4000],
      [T.l23 - 0.25, 4070], [T.l23 + 0.45, 6000], [T.l24 - 0.3, 6070], [T.l24 + 0.4, 8000], [T.l25 + 0.2, 8070],
      [T.l25 + 0.9, 10000], [this.END, 10070]];
    const R1 = this.R1;                                  // xe đoạn 1: vào, chờ sau mũi tên, đọc 10 − 3 rồi + 2, chạy đi
    this.CAR1 = [[T.l20 - 0.2, 1750], [T.left20 + 0.4, 2330], [T.leftOne - 0.35, 2330], [this.S1[0].t, R1[2].x + 40],
      [this.S1[1].t, R1[4].x + 40], [T.but + 1.2, 4400]];
  }
  camX(t) { return keyAt(this.CAM, t)[0]; }
  sfx() {
    const T = this.T, c = [{ t: T.parts, kind: 'pop' }, { t: T.same, kind: 'pop' }, { t: this.S1[0].t, kind: 'snap' },
      { t: this.S1[1].t, kind: 'snap' }, { t: T.someone, kind: 'pop' }, { t: T.expr - 0.3, kind: 'whoosh' },
      { t: this.S3[0].t, kind: 'snap' }, { t: this.S3[1].t, kind: 'snap' }, { t: T.down + 0.3, kind: 'snap' },
      { t: T.five + 0.25, kind: 'snap' }, { t: T.twelve, kind: 'correct' }, { t: T.sixty, kind: 'error' }];
    for (const k of [T.l20 - 0.6, T.arabic - 0.25, T.l23 - 0.25, T.l24 - 0.3, T.l25 + 0.2]) c.push({ t: k, kind: 'whoosh' });
    return c;
  }
  aplCar(t) {                                           // xe APL: vào lane phải → quay đầu → chạy ← qua 4, +, 3, ×, 2
    const T = this.T, o = 6000, cx = o + 1560, a = T.expr - 0.55, b = T.expr + 0.35;
    if (t < a) { const [x] = keyAt([[T.sixties, o - 300], [a, cx]], t); return [x, LR, 0]; }
    if (t < b) { const th = Math.PI * smooth(prog(t, a, b)); return [cx + 92 * Math.sin(th), Y + 92 * Math.cos(th), -th]; }
    const R = this.R3, [x] = keyAt([[b, cx], [this.S3[0].t, R[2].x - 40], [this.S3[1].t, R[0].x - 50], [T.ladder + 1.2, o - 500]], t);
    return [x, LL, -Math.PI];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    // bóng cầu dẫn (tầng cao đổ bóng xuống cỏ)
    g.save(); g.lineCap = 'round'; g.strokeStyle = 'rgba(0,0,0,0.32)'; g.lineWidth = 190; g.translate(16, 26);
    for (const p of [RAMP1, RAMP2]) { g.beginPath(); p(g); g.stroke(); } g.restore();
    roads(g, [[MAIN, 300], [WRONG, 300], [RAMP1, 170], [RAMP2, 170]]);
    centerLine(g, MAIN);

    // ── đoạn 0: phần nào do người quyết? ──
    [['P', '( )'], ['E', 'x²'], ['MD', '× ÷'], ['AS', '+ −']].forEach(([kd, s], i) =>
      sign(g, kd, s, 1020 + i * 190, 235, 52, prog(t, T.parts + i * 0.12, T.parts + i * 0.12 + 0.35)));
    typed(g, 'decided by people?', 1305, 362, prog(t, T.decide - 0.1, T.decide + 0.7), SERIF(44), ROAD.gold, { align: 'center' });
    boulder(g, 1480, 850, prog(t, T.nature - 0.25, T.nature + 0.3));
    typed(g, 'nothing in nature forces them', 260, 870, prog(t, T.nature, T.nature + 0.9), SERIF(54), ROAD.edge);

    // ── đoạn 1: trái → phải ──
    let o = 2000;
    paint(g, '→', o + 330, Y, 120, { k: prog(t, T.first20 - 0.1, T.first20 + 0.2) });   // mũi tên ngay ở "first"
    typed(g, 'left to right', o + 230, 790, prog(t, T.left20, T.left20 + 0.7), SERIF(54), ROAD.edge);
    evalRow(g, t, this.R1, this.S1, Y, 120, prog(t, T.ops - 0.2, T.ops + 0.5));
    sign(g, 'AS', '−', this.R1[1].x, 300, 48, prog(t, T.same - 0.1, T.same + 0.3));
    sign(g, 'AS', '+', this.R1[3].x, 300, 48, prog(t, T.level - 0.1, T.level + 0.3));
    typed(g, 'same level', (this.R1[1].x + this.R1[3].x) / 2, 210, prog(t, T.level, T.level + 0.6), SERIF(44), ROAD.edge, { align: 'center' });
    typed(g, '…we agree: left one first', o + 1000, 800, prog(t, T.leftOne - 0.4, T.leftOne + 0.6), SERIF(54), ROAD.edge);
    typed(g, 'purely a choice', o + 1000, 890, prog(t, T.but + 0.3, T.choice + 0.4), SERIF(54), ROAD.gold);
    if (t > T.l20 - 0.3 && t < T.but + 1.3) car(g, keyAt(this.CAR1, t)[0], LR, 0, { s: 0.8 });

    // ── đoạn 2: viết phải → trái ──
    o = 4000;
    typed(g, 'Arabic is written right to left', o + 860, 300, prog(t, T.arabic + 0.2, T.arabic + 1.3), SERIF(54), ROAD.edge);
    [1500, 1000, 500].forEach((x, i) => paint(g, '→', o + x, Y, 150, { rot: Math.PI, k: prog(t, T.rtl - 0.1 + i * 0.16, T.rtl + 0.1 + i * 0.16) }));
    typed(g, 'we could have read our sums that way too', o + 300, 820, prog(t, T.agreed - 0.2, T.sums + 0.5), SERIF(54), ROAD.gold);

    // ── đoạn 3: APL đọc phải → trái ──
    o = 6000;
    const kb = prog(t, T.someone - 0.15, T.someone + 0.3);   // bảng dựng ngay ở "someone did"
    if (PHOTOS) billboard(g, 'apl', o + 1260, 110, 190, kb, { label: 'APL · 1960s' });
    else textBoard(g, o + 1260, 110, 520, 180, kb, 'APL · 1960s', prog(t, T.someone + 0.2, T.apl + 0.2), 'a programming language', prog(t, T.prog23 - 0.1, T.prog23 + 0.6));
    for (const [x, y] of [[o + 300, LL], [o + 1780, LL], [o + 300, LR], [o + 1780, LR]])
      paint(g, '→', x, y, 46, { rot: Math.PI, k: prog(t, T.expr - 0.4, T.expr), gap: false, color: 'rgba(237,235,227,0.75)' });
    evalRow(g, t, this.R3, this.S3, Y, 120, prog(t, T.read23 - 0.1, T.read23 + 0.5));
    const flip = prog(t, T.ladder - 0.1, T.ladder + 0.3);   // "no ladder of priorities": biển cấp lật thành biển trắng như nhau
    flipSign(g, flip < 0.5 ? 'MD' : null, '×', this.R3[1].x, 300, 46, prog(t, T.expr - 0.1, T.expr + 0.3), Math.abs(Math.cos(flip * Math.PI)));
    flipSign(g, flip < 0.5 ? 'AS' : null, '+', this.R3[3].x, 300, 46, prog(t, T.expr, T.expr + 0.4), Math.abs(Math.cos(flip * Math.PI)));
    typed(g, 'no ladder: one level for all', (this.R3[1].x + this.R3[3].x) / 2, 212, prog(t, T.ladder + 0.2, T.ladder + 1.1), SERIF(44), ROAD.edge, { align: 'center' });
    typed(g, 'APL reads right to left', o + 300, 800, prog(t, T.right23 - 0.1, T.left23 + 0.5), SERIF(54), ROAD.gold);
    typed(g, '2 × (3 + 4) = ' + this.apl14, o + 300, 890, prog(t, T.with23 + 0.1, T.with23 + 0.8), '800 46px "Archivo"', ROAD.edge);
    if (t > T.sixties - 0.1 && t < T.ladder + 1.3) { const [x, y, r] = this.aplCar(t); car(g, x, y, r, { s: 0.8 }); }

    // ── đoạn 4: tháp luỹ thừa = cầu dẫn, tính từ trên xuống ──
    o = O4;
    const s1 = T.down + 0.3, s2 = T.five + 0.25;
    if (t < s2) paint(g, '2', o + 480, Y, 150, { k: prog(t, T.two1 - 0.05, T.two1 + 0.15) });
    if (t < s1) paint(g, '3', o + 1060, 300, 92, { k: prog(t, T.three - 0.05, T.three + 0.15), gap: false });
    if (t < s1) paint(g, '2', o + 1640, 150, 64, { k: prog(t, T.two2 - 0.05, T.two2 + 0.15), gap: false });
    if (t >= s1) { patch(g, o + 1590, 110, 100, 80, prog(t, s1 - 0.12, s1)); if (t < s2) patch(g, o + 1010, 250, 100, 100, prog(t, s1 - 0.12, s1));
      if (t < s2) paint(g, String(this.t9), o + 1060, 300, 92, { k: prog(t, s1, s1 + 0.2), gap: false }); }
    if (t >= s2) { patch(g, o + 1010, 250, 100, 100, 1); patch(g, o + 400, Y - 80, 160, 160, prog(t, s2 - 0.12, s2));
      paint(g, String(this.t512), o + 480, Y, 150, { k: prog(t, s2, s2 + 0.25), color: ROAD.gold }); }
    ring(g, o + 1640, 150, 64, 52, prog(t, T.top - 0.1, T.top + 0.3), { color: ROAD.gold });
    arrow(g, o + 1590, 205, o + 1130, 285, prog(t, T.down - 0.05, T.down + 0.3), { color: ROAD.gold, w: 6, bend: -40 });
    arrow(g, o + 1000, 360, o + 560, 452, prog(t, T.five - 0.2, T.five + 0.2), { color: ROAD.gold, w: 6, bend: -40 });
    check(g, o + 330, 760, 34, prog(t, T.twelve - 0.1, T.twelve + 0.3));
    typed(g, 'a tower of powers', 8000 + 150, 860, prog(t, T.tower - 0.1, T.tower + 0.7), SERIF(54), ROAD.edge);
    typed(g, 'from the top down', 8000 + 150, 950, prog(t, T.top - 0.3, T.down + 0.5), SERIF(54), ROAD.gold);
    const kw = prog(t, T.sixty - 0.1, T.sixty + 0.3);    // cách đọc sai: (2³)² = 64 — nhánh bị chặn
    paint(g, '(2³)² =', o + 1400, 850, 64, { k: kw, gap: false });
    paint(g, String(this.t64), o + 1640, 850, 92, { k: kw, gap: false });   // sơn trắng (đỏ trên nhựa chỉ 2.4:1); đỏ ở gạch + ✗
    barrier(g, o + 1200, 735, o + 1200, 965, prog(t, T.sixty, T.sixty + 0.35));
    strike(g, o + 1574, 868, o + 1706, 832, prog(t, T.sixty + 0.2, T.sixty + 0.45), { color: ROAD.red, w: 9 });
    cross(g, o + 1800, 850, 36, prog(t, T.sixty + 0.35, T.sixty + 0.7), { color: ROAD.red });   // ✗ bên cạnh, không đè chữ số

    // ── đoạn 5: không luật tự nhiên nào ──
    o = 10000;
    boulder(g, o + 1560, 235, prog(t, T.nature25 - 0.2, T.nature25 + 0.3));
    typed(g, 'no law of nature', o + 880, 262, prog(t, T.nature25, T.nature25 + 0.7), SERIF(54), ROAD.edge);
    paint(g, '→', o + 640, Y, 120, { rot: Math.PI, k: prog(t, T.must - 0.1, T.must + 0.2) });
    paint(g, 'OR', o + 980, Y, 92, { k: prog(t, T.from25 - 0.1, T.from25 + 0.2) });
    paint(g, '→', o + 1320, Y, 120, { k: prog(t, T.right25 - 0.1, T.right25 + 0.2) });
    typed(g, 'a choice, not a law', o + 980, 820, prog(t, T.right25 + 0.1, T.right25 + 0.9), SERIF(64), ROAD.gold, { align: 'center' });
    g.restore();

    actTitle(g, 'road', t, this.START, 'ACT TWO', 'The part that really is just a choice');
    card(g, 'road', prog(t, this.START - 0.3, this.START + 0.7), 'ACT TWO · A CHOICE', 'Left to right');
  }
}

// ── đồ nghề cục bộ ──
function keyAt(K, t) {                                  // nội suy mượt giữa các mốc [t, ...giá trị]
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, ...a] = K[i], [t1, ...b] = K[i + 1], u = smooth(clamp((t - t0) / (t1 - t0)));
  return a.map((v, j) => v + (b[j] - v) * u);
}
const MC = mk(8, 8).getContext('2d');
function layout(items, cx, size, gap = 0.34) {          // tâm từng token, cả hàng canh giữa cx
  MC.font = `800 ${size}px "Archivo"`;
  const ws = items.map(s => (s === '(' || s === ')') ? size * 0.55 : MC.measureText(s).width);
  const tot = ws.reduce((a, b) => a + b, 0) + size * gap * (items.length - 1);
  let x = cx - tot / 2;
  return items.map((s, i) => { const r = { s, x: x + ws[i] / 2, w: ws[i] }; x += ws[i] + size * gap; return r; });
}
let AS;                                                 // nhựa mới: cùng hạt với kit (grain asphalt seed 2) — vá đè chỗ sơn lại
function asph(g) {
  if (!AS) { const n = 512, c = mk(n, n), x = c.getContext('2d'), d = x.createImageData(n, n), b = [0x34, 0x37, 0x3C];
    for (let i = 0; i < n * n; i++) { const v = (hash(i * 0.613 + 2) - 0.5) * 22; for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] + v; d.data[i * 4 + 3] = 255; }
    x.putImageData(d, 0, 0); AS = g.createPattern(c, 'repeat'); }
  return AS;
}
function roads(g, P) {                                   // như kit.road nhưng mỗi đoạn một bề rộng: vạch biên hết rồi mới phủ nhựa
  g.save(); g.lineCap = g.lineJoin = 'round';
  g.strokeStyle = ROAD.edge; for (const [p, w] of P) { g.lineWidth = w; g.beginPath(); p(g); g.stroke(); }
  g.strokeStyle = asph(g); for (const [p, w] of P) { g.lineWidth = w - 16; g.beginPath(); p(g); g.stroke(); }
  g.restore();
}
function patch(g, x, y, w, h, k) {                      // miếng nhựa mới quét trái → phải (sơn cũ bị phủ)
  if (k <= 0) return; g.save(); g.fillStyle = asph(g); g.beginPath(); g.roundRect(x, y, w * clamp(k), h, 10); g.fill();
  g.restore();
}
/** Hàng chữ sơn có các bước tính: step {t, i, j, v, gold} thay token i..j (chỉ số gốc) bằng v, sơn lại tại chỗ. */
function evalRow(g, t, row, steps, y, size, kIn) {
  const act = steps.filter(s => t >= s.t - 0.12);
  const live = act.filter(s => !act.some(o => o !== s && o.t > s.t && t >= o.t - 0.12 && o.i <= s.i && o.j >= s.j));
  row.forEach((r, n) => { if (r.s === '(' || r.s === ')') return; if (act.some(s => n >= s.i && n <= s.j && t >= s.t)) return;
    paint(g, r.s, r.x, y, size, { k: clamp(kIn * row.length - n) }); });
  for (const s of live) {
    const a = row[s.i].x - row[s.i].w / 2, b = row[s.j].x + row[s.j].w / 2;
    patch(g, a - 14, y - size * 0.52, b - a + 28, size * 1.04, prog(t, s.t - 0.12, s.t));
    if (t >= s.t) paint(g, String(s.v), (a + b) / 2, y, size, { k: prog(t, s.t, s.t + 0.22), color: s.gold ? ROAD.gold : ROAD.paint });
  }
}
function flipSign(g, kind, s, x, y, r, k, sx) {         // biển lật quanh trục đứng (sx = |cos|)
  if (k <= 0) return; g.save(); g.translate(x, y); g.scale(Math.max(0.02, sx), 1); sign(g, kind, s, 0, 0, r, k); g.restore();
}
function textBoard(g, x, y, w, h, k, title, kt, sub, ks) { // bảng quảng cáo thay ảnh: tấm trắng, chữ tên + năm
  if (k <= 0) return;
  const p = outBack(clamp(k)); g.save(); g.translate(x + w / 2, y + h); g.scale(1, p); g.translate(-(x + w / 2), -(y + h));
  g.fillStyle = '#2A2C30'; g.fillRect(x + w * 0.2 - 8, y + h, 16, 46); g.fillRect(x + w * 0.8 - 8, y + h, 16, 46);
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = '#F4F1EA'; g.fillRect(x - 14, y - 14, w + 28, h + 28);
  g.shadowColor = 'transparent'; g.strokeStyle = ROAD.ink; g.lineWidth = 3; g.strokeRect(x, y, w, h); g.restore();
  typed(g, title, x + w / 2, y + 92, kt, '800 72px "Archivo"', ROAD.ink, { align: 'center' });
  typed(g, sub, x + w / 2, y + 144, ks, '500 24px "IBM Plex Mono"', '#4A4D52', { align: 'center' });
}
function boulder(g, x, y, k) {                           // tảng đá trơn: tự nhiên không khắc luật nào
  if (k <= 0) return; const p = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - p) * 50); g.scale(0.85, 0.85); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 24; g.shadowOffsetY = 14;
  g.fillStyle = '#8D8A82'; g.beginPath();
  for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2, r = 1 + (hash(i * 3.3) - 0.5) * 0.14; g.lineTo(Math.cos(a) * 220 * r, Math.sin(a) * 105 * r); }
  g.fill(); g.shadowColor = 'transparent'; g.fillStyle = 'rgba(255,255,255,0.10)'; g.beginPath(); g.ellipse(-50, -35, 120, 40, -0.1, 0, 7); g.fill(); g.restore();
}
function check(g, x, y, s, k) {                          // ✓ vẽ tay (font không có ✓)
  hand(g, [[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s * 1.2, y - s * 0.9]], { w: 9, color: ROAD.gold, jit: 1, seed: 21, k });
}
