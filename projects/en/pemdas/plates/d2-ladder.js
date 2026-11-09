// ACT THREE · "The ladder" (p2, câu 52–57). Cái thang = PHÂN CẤP ĐƯỜNG: hẻm (+, viền cam) → đường lớn (×, viền xanh)
// → cao tốc trên cầu vượt (^, viền tím). Mỗi cấp gộp nhiều xe cấp dưới. Toạ độ THẾ GIỚI: đường chính y = 540.
//   đoạn A (x 0)     ^ above × ? — cái thang ba bậc biển ven đường
//   đoạn B (x 2000)  hẻm: ba xe "4" chạy qua 4 + 4 + 4, nhập đường lớn thành một: 3 × 4 = 12
//   đoạn C (x 4000)  đường lớn: ba xe "4" qua 4 · 4 · 4, lên dốc nhập cao tốc thành một: 4³ = 64
//   đoạn D (x 6000)  ba tầng xếp chồng (camera hạ 90 px): biển + thứ tự làm, mũi tên "stronger", tên từng tầng
//   đoạn E (x 9000)  đường chính trở lại bình thường: thang nhỏ, CONVENTION, "feels natural · holds together"
import { clamp, prog, smooth, outCubic, outBack, ROAD, ERA, verge, road, centerLine, paint, sign, car, card, typed,
  must, lookup } from '../kit.js';

const Y = 540, HY = 230, SY = 880;                    // đường lớn, cao tốc, hẻm
const bz = (a, b, c, d, n = 30) => Array.from({ length: n }, (_, i) => { const u = (i + 1) / n, v = 1 - u;
  return [0, 1].map(k => v * v * v * a[k] + 3 * v * v * u * b[k] + 3 * v * u * u * c[k] + u * u * u * d[k]); });
const ST1 = [[2050, SY], [2800, SY], ...bz([2800, SY], [3050, SY], [3050, 610], [3300, 610]), [3420, 610]];
const HWY = [[4500, 460], [4700, 460], ...bz([4700, 460], [5000, 460], [5000, HY], [5300, HY]), [8100, HY], ...bz([8100, HY], [8400, HY], [8400, 460], [8700, 460]), [8850, 460]];
const ST2 = [[5950, SY], [8100, SY], ...bz([8100, SY], [8350, SY], [8350, 610], [8600, 610]), [8800, 610]];
const pathOf = P => g => { g.moveTo(...P[0]); for (const p of P.slice(1)) g.lineTo(...p); };
const MAIN = g => { g.moveTo(-2000, Y); g.lineTo(20000, Y); };
const RIM = g => { g.moveTo(2100, Y); g.lineTo(8700, Y); };
const ROUTE_B = route([...ST1, [20000, 610]]), ROUTE_C = route([[4000, 460], ...HWY, [20000, 460]]);

export default class Ladder {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      powers: w(52, 'powers'), above: w(52, 'above'), mul52: w(52, 'multiplication'), picture: w(52, 'picture'), ladder: w(52, 'ladder'),
      l53: L(53).start, repeated: w(53, 'repeated'), addition: w(53, 'addition'), three: w(53, 'three'), times: w(53, 'times'),
      four: w(53, 'four'), added: w(53, 'added'), times2: w(53, 'times', 2),
      l54: L(54).start, power: w(54, 'power'), mul54: w(54, 'multiplication'), four54: w(54, 'four'), cubed: w(54, 'cubed'),
      multiplied: w(54, 'multiplied'), three54: w(54, 'three'), times54: w(54, 'times'),
      l55: L(55).start, stronger: w(55, 'stronger'), higher: w(55, 'higher'), earlier: w(55, 'earlier'), binds: w(55, 'binds'),
      tightly: w(55, 'tightly'), numbers: w(55, 'numbers'),
      l56: L(56).start, p56: w(56, 'powers'), m56: w(56, 'multiplication'), m56b: w(56, 'multiplication', 2), a56: w(56, 'addition'),
      l57: L(57).start, ladder57: w(57, 'ladder'), convention: w(57, 'convention'), natural: w(57, 'natural'), holds: w(57, 'holds'),
      end: L(57).end,
    };
    this.START = L(52).start; this.FROM = this.START - 1.2;
    // toán trên hình (CONTENT.md: 3 × 4 = 4 + 4 + 4; 4³ = 4·4·4 = 64)
    this.twelve = must('4 + 4 + 4', 12); must('3 × 4', this.twelve);
    this.sixtyFour = must('4 ^ 3', 64); must('4 × 4 × 4', this.sixtyFour);
    const T = this.T;
    this.CAM = [[this.FROM - 1, 0, 0], [T.l53 - 0.55, 150, 0], [T.l53 + 0.35, 2000, 0], [T.l54 - 0.55, 2150, 0], [T.l54 + 0.35, 4000, 0],
      [T.l55 - 0.55, 4150, 0], [T.l55 + 0.35, 6000, 90], [T.l57 - 0.55, 6100, 90], [T.l57 + 0.35, 9000, 0], [T.end + 3, 9250, 0]];
  }
  cam(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0, y0] = K[i], [t1, x1, y1] = K[i + 1], e = smooth(clamp((t - t0) / (t1 - t0))); return [x0 + (x1 - x0) * e, y0 + (y1 - y0) * e]; }
  sfx() {
    const T = this.T;
    return [
      { t: T.powers, kind: 'pop' }, { t: T.mul52 + 0.45, kind: 'question' }, { t: T.picture, kind: 'pop' },
      { t: T.three, kind: 'whoosh' }, { t: T.times2, kind: 'snap' },
      { t: T.four54, kind: 'whoosh' }, { t: T.times54, kind: 'snap' },
      { t: T.higher, kind: 'pop' }, { t: T.earlier, kind: 'tick' }, { t: T.p56, kind: 'tick' }, { t: T.m56b, kind: 'tick' }, { t: T.a56, kind: 'tick' },
      { t: T.ladder57, kind: 'pop' }, { t: T.natural, kind: 'correct' },
      ...[T.l53, T.l54, T.l55, T.l57].map(a => ({ t: a - 0.55, kind: 'whoosh' })),
    ];
  }
  render(g, t) {
    const T = this.T, [cx, cy] = this.cam(t), LBL = 'italic 600 54px "Cormorant Garamond"', SM = 'italic 600 44px "Cormorant Garamond"';
    g.save(); verge(g); g.translate(-cx, cy);

    // ── mạng đường: bóng cầu vượt, viền màu theo cấp, rồi mặt đường chung một lượt (chỗ nhập liền mạch) ──
    g.save(); g.lineCap = g.lineJoin = 'round'; g.strokeStyle = 'rgba(0,0,0,.32)'; g.lineWidth = 184; g.translate(14, 24);
    g.beginPath(); pathOf(HWY.slice(8, 40))(g); g.stroke(); g.restore();
    rim(g, pathOf(ST1), 160 + 24, ROAD.AS, 'round'); rim(g, pathOf(ST2), 160 + 24, ROAD.AS, 'round');
    rim(g, RIM, 300 + 26, ROAD.MD, 'butt'); rim(g, pathOf(HWY), 170 + 24, ROAD.E, 'round');
    road(g, [pathOf(HWY)], { w: 170 });                      // dốc cao tốc dưới, đường chính đè lên…
    road(g, [pathOf(ST1), pathOf(ST2)], { w: 160 });          // hẻm dưới, đường chính đè lên, rồi miệng hẻm phủ lại vạch biên
    road(g, [MAIN]);
    g.save(); g.beginPath(); g.rect(-4000, Y + 146, 30000, 4000); g.clip(); road(g, [pathOf(ST1), pathOf(ST2)], { w: 160 }); g.restore();
    g.save(); g.beginPath(); g.rect(-4000, -4000, 30000, 4000 + Y - 146); g.clip(); road(g, [pathOf(HWY)], { w: 170 }); g.restore(); // …rồi miệng dốc phủ lại vạch biên
    centerLine(g, MAIN); centerLine(g, pathOf(HWY.slice(8)));

    // ── A: vì sao luỹ thừa đứng trên nhân? Hình dung một cái thang ──
    row(g, ['^', 'above', '×', '?'], 300, Y, 120, [prog(t, T.powers, T.powers + 0.2), prog(t, T.above, T.above + 0.3), prog(t, T.mul52, T.mul52 + 0.2), prog(t, T.mul52 + 0.45, T.mul52 + 0.6)],
      i => i === 3 ? ROAD.yellow : ROAD.paint);
    ladder(g, 1500, prog(t, T.picture - 0.1, T.picture + 0.6), [prog(t, T.powers, T.powers + 0.35), prog(t, T.mul52, T.mul52 + 0.35), prog(t, T.ladder, T.ladder + 0.35)]);
    typed(g, 'picture a ladder', 1250, 840, prog(t, T.picture - 0.1, T.ladder + 0.5), LBL, ROAD.edge);
    if (t < T.l53 + 1) car(g, 150 + (t - this.FROM) * 330, Y + 100, 0, { s: 0.75 });

    // ── B: nhân = cộng lặp — ba xe "4" trên hẻm nhập thành một trên đường lớn ──
    sign(g, 'AS', '+', 2150, 745, 34, prog(t, T.l53 - 0.2, T.l53 + 0.2));
    typed(g, 'small street', 2210, 760, prog(t, T.l53, T.l53 + 0.6), SM, ROAD.edge);
    sign(g, 'MD', '×', 2950, 210, 56, prog(t, T.l53 + 0.1, T.l53 + 0.45));
    typed(g, 'main road', 3040, 226, prog(t, T.l53 + 0.3, T.l53 + 0.9), LBL, ROAD.edge);
    paint(g, '4 + 4 + 4', 2610, SY, 64, { k: prog(t, T.repeated, T.addition + 0.3) });
    paint(g, '3 × 4', 2720, Y, 92, { k: prog(t, T.three, T.times + 0.3) });
    paint(g, '= ' + this.twelve, 3560, Y, 92, { k: prog(t, T.times2 - 0.05, T.times2 + 0.25), color: ROAD.gold });
    if (t < T.l55) merge(g, ROUTE_B, [20, 155, 290], t, T.three, T.added, 3300, 0.75, '4');

    // ── C: luỹ thừa = nhân lặp — ba xe "4" lên cao tốc nhập thành một ──
    paint(g, '4 · 4 · 4', 4450, Y, 92, { k: prog(t, T.mul54 - 0.1, T.mul54 + 0.5) });
    sign(g, 'E', '^', 5300, 98, 30, prog(t, T.power - 0.1, T.power + 0.3));
    typed(g, 'highway', 5360, 116, prog(t, T.power, T.power + 0.6), SM, ROAD.edge);
    paint(g, '4³', 5620, HY, 92, { k: prog(t, T.cubed - 0.1, T.cubed + 0.2) });
    paint(g, '= ' + this.sixtyFour, 5830, HY, 92, { k: prog(t, T.times54 - 0.05, T.times54 + 0.25), color: ROAD.gold });
    if (t < T.l57 + 0.4) merge(g, ROUTE_C, [100, 220, 340], t, T.four54, T.three54, 5470, 0.62, '4', -1);

    // ── D: ba tầng xếp chồng — càng mạnh càng cao, làm càng sớm, bám số càng chặt ──
    const LV = [[HY, 'E', '^', 'POWERS', T.p56, 64, '4³'], [Y, 'MD', '×', 'MULTIPLICATION', T.m56b, 72, '3 × 4'], [SY, 'AS', '+', 'ADDITION', T.a56, 64, '4 + 4 + 4']];
    const SGN = [[7180, 85, 30], [7180, 356, 24], [7180, 745, 34]];
    LV.forEach(([y, kd, op, name, tn, sz, ex], i) => {
      const [sx, sy, r] = SGN[i], ks = prog(t, T.higher + (2 - i) * 0.15, T.higher + (2 - i) * 0.15 + 0.35);
      sign(g, kd, op, sx, sy, r, ks);
      badge(g, sx + 74, sy, i + 1, prog(t, T.earlier + i * 0.18, T.earlier + i * 0.18 + 0.3));
      paint(g, ex, 7560, y, i === 1 ? 92 : 64, { k: prog(t, T.binds + i * 0.25, T.binds + i * 0.25 + 0.4) });
      paint(g, name, 6650, y, sz, { k: prog(t, tn - 0.05, tn + 0.45) });
    });
    const ka = prog(t, T.stronger - 0.1, T.stronger + 0.6);
    if (ka > 0) { upArrow(g, 7860, 960, 150, ka); typed(g, 'stronger', 7820, 110, prog(t, T.stronger + 0.2, T.stronger + 0.8), SM, ROAD.gold, { align: 'right' }); }
    if (t < T.l57 + 0.4) traffic(g, t, T.l55 - 0.6);

    // ── E: đường chính bình thường — cái thang giữ cho quy ước tự nhiên ──
    ladder(g, 9000 + 1560, prog(t, T.ladder57 - 0.1, T.ladder57 + 0.5), [1, 1, 1].map((_, i) => prog(t, T.ladder57 + i * 0.12, T.ladder57 + i * 0.12 + 0.35)));
    paint(g, 'CONVENTION', 9000 + 800, Y, 92, { k: prog(t, T.convention - 0.05, T.convention + 0.45) });
    typed(g, 'feels natural', 9000 + 400, 830, prog(t, T.natural - 0.3, T.natural + 0.4), LBL, ROAD.gold);
    typed(g, 'holds together', 9000 + 404, 900, prog(t, T.holds - 0.1, T.holds + 0.6), LBL, ROAD.edge);
    if (t > T.l57 - 0.6) car(g, 9000 + 100 + (t - T.l57 + 0.6) * 280, Y + 100, 0, { s: 0.75 });
    g.restore();

    card(g, 'road', prog(t, this.FROM + 0.4, this.FROM + 1.4), 'ACT THREE · NOT ARBITRARY', 'The ladder');
  }
}

/** đường gấp khúc → hàm vị trí theo quãng đường: at(d) = [x, y, góc] */
function route(P) {
  const cum = [0]; for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const at = d => { d = clamp(d, 0, cum.at(-1)); let i = 1; while (i < cum.length - 1 && cum[i] < d) i++;
    const u = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1), [x0, y0] = P[i - 1], [x1, y1] = P[i];
    return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, Math.atan2(y1 - y0, x1 - x0)]; };
  const dAtX = x => { for (let d = 0; d <= cum.at(-1); d += 5) if (at(d)[0] >= x) return d; return cum.at(-1); };
  return { at, dAtX };
}
/** ba xe cùng số chạy theo tuyến, dồn về một điểm đúng lúc tM (nhập làm một), rồi một xe chạy tiếp */
function merge(g, R, d0, t, tGo, tM, xM, s, label) {
  const dM = R.dAtX(xM), u = outCubic(prog(t, tGo, tM)), after = Math.max(0, t - tM) * 420;
  const ds = t < tM ? d0.map(d => d + (dM - d) * u) : [dM + after];
  ds.slice().reverse().forEach(d => { const [x, y, a] = R.at(d); carL(g, x, y, a, s, t < tM ? label : null); });
}
function carL(g, x, y, rot, s, label) {
  car(g, x, y, rot, { s });
  if (!label) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s / 0.75, s / 0.75); g.fillStyle = ROAD.ink; g.font = '800 38px "Archivo"';
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, -7, 1); g.restore();
}
function rim(g, path, w, color, cap) { g.save(); g.lineCap = cap; g.lineJoin = 'round'; g.strokeStyle = color; g.lineWidth = w; g.beginPath(); path(g); g.stroke(); g.restore(); }
function row(g, tokens, x, y, size, ks, color = () => ROAD.paint) {
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = tokens.map(s => g.measureText(s).width); g.restore();
  let cx = x; tokens.forEach((s, i) => { paint(g, s, cx + ws[i] / 2, y, size, { k: ks[i], color: color(i) }); cx += ws[i] + size * 0.4; });
}
/** thang nhỏ trên cỏ phía trên đường: hai thanh dọc, bậc vẽ dần theo k; ba biển ^ × + trên ba bậc (ks) */
function ladder(g, x, k, ks) {
  if (k > 0) {
    const top = 66, bot = 372, n = 7, m = Math.ceil(n * clamp(k));
    g.save(); g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 10; g.shadowOffsetY = 6; g.fillStyle = '#C9B48A';
    for (const rx of [x - 92, x + 80]) g.fillRect(rx, bot - (bot - top) * outCubic(clamp(k * 1.5)), 12, (bot - top) * outCubic(clamp(k * 1.5)));
    for (let i = 0; i < m; i++) g.fillRect(x - 86, bot - 22 - i * 46, 172, 9);
    g.restore();
  }
  sign(g, 'E', '^', x, 112, 34, ks[0]); sign(g, 'MD', '×', x, 222, 34, ks[1]); sign(g, 'AS', '+', x, 328, 30, ks[2]);
}
/** huy hiệu thứ tự làm: tròn vàng, số đen */
function badge(g, x, y, n, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(p, p); g.fillStyle = ROAD.gold; g.beginPath(); g.arc(0, 0, 24, 0, 7); g.fill();
  g.fillStyle = ROAD.ink; g.font = '800 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), 0, 2); g.restore();
}
/** mũi tên vàng thẳng đứng đi lên từ y0, mọc dần */
function upArrow(g, x, y0, y1, k) {
  const y = y0 + (y1 - y0) * outCubic(clamp(k));
  g.save(); g.strokeStyle = ROAD.gold; g.fillStyle = ROAD.gold; g.lineWidth = 10; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y + 20); g.stroke();
  g.beginPath(); g.moveTo(x, y - 14); g.lineTo(x - 24, y + 26); g.lineTo(x + 24, y + 26); g.fill(); g.restore();
}
/** xe chạy trên ba tầng đoạn D: tầng càng cao xe càng nhanh */
const R_HWY = route([...HWY, [20000, 460]]), R_ST2 = route([...ST2, [20000, 610]]);
function traffic(g, t, t0) {
  if (t < t0) return; const dt = t - t0;
  const [hx, hy, ha] = R_HWY.at(R_HWY.dAtX(5900) + dt * 300); car(g, hx, hy + 36 * Math.cos(ha), ha, { s: 0.55 });
  car(g, 5800 + dt * 190, Y + 100, 0, { s: 0.75, color: '#C9C6BD' });
  const [sx, sy, sa] = R_ST2.at(R_ST2.dAtX(5900) + dt * 110); car(g, sx, sy + 36 * Math.cos(sa), sa, { s: 0.55, color: '#9FB3C8' });
}
