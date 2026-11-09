// ACT ONE · "The part almost everyone gets wrong", nửa đầu (p2, câu 3–8). Toạ độ THẾ GIỚI, đường chính y = 540.
//   đoạn A (x 0–1920)     câu 3: PEMDAS sơn trên đường; ba xe xám (người đọc sai) rẽ vào lối "astray"
//   đoạn B (x 2000–3920)  câu 4–6: "M → D", "A → S" sơn như đường một chiều + biển ONE WAY; "not the rule" → rào đỏ + ✗
//   đoạn C (x 4100–6020)  câu 7–8: × và ÷ nhập MỘT biển tròn xanh, + và − nhập MỘT biển thoi cam; xe vàng đọc trái → phải
import { clamp, prog, smooth, outBack, outCubic, ROAD, verge, road, centerLine, paint, sign, car, barrier, card,
  typed, cross, lookup } from '../kit.js';

const Y = 540, XB = 2000, XC = 4100, GREY = '#9AA0A6';
const MAIN = g => { g.moveTo(-3000, Y); g.lineTo(9000, Y); };
const ASTRAY = g => { g.moveTo(1000, Y); g.bezierCurveTo(1300, Y, 1440, Y + 160, 1500, 1300); };   // lối rẽ lạc ra mép dưới
const LABEL = 'italic 600 54px "Cormorant Garamond"';

export default class Levels {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2a');
    this.T = {
      here: L(3).start, many: w(3, 'many'), astray: w(3, 'astray'), you4: L(4).start, m: w(4, 'm'), d: w(4, 'd'),
      think4: w(4, 'think'), mul4: w(4, 'multiplication'), a: w(5, 'a'), s: w(5, 's'), think5: w(5, 'think'), add5: w(5, 'addition'),
      but: L(6).start, not: w(6, 'not'), mul7: w(7, 'multiplication'), div7: w(7, 'division'), same7: w(7, 'same'), level7: w(7, 'level'),
      work: w(7, 'work'), left7: w(7, 'left'), which: w(7, 'whichever'), first: w(7, 'first'), add8: w(8, 'addition'),
      sub8: w(8, 'subtraction'), share: w(8, 'share'), level8: w(8, 'level'), go8: w(8, 'go'), right8: w(8, 'right'),
    };
    this.START = L(3).start;
    this.FROM = this.START - 1.2;
    const T = this.T;
    this.CAM = [[this.FROM, 0], [T.astray + 0.35, 0], [T.you4 + 0.05, XB], [T.mul7 - 0.1, XB], [T.mul7 + 0.5, XC], [T.right8 + 3, XC]];
    // xe vàng đọc đoạn C: [giờ, x thế giới] (đơn điệu tăng — xe không lùi)
    this.CAR = [[T.left7 - 0.6, XC - 250], [T.left7, XC + 230], [T.which, XC + 480], [T.first, XC + 700], [T.first + 0.5, XC + 930],
      [T.go8 - 0.25, XC + 960], [T.go8 + 0.1, XC + 1170], [T.right8, XC + 1420], [T.right8 + 0.6, XC + 2300]];
  }
  sfx() {
    const T = this.T;
    return [{ t: T.astray, kind: 'whoosh' }, { t: T.astray + 0.35, kind: 'whoosh' }, { t: T.think4, kind: 'pop' }, { t: T.think5, kind: 'pop' },
      { t: T.not, kind: 'error' }, { t: T.mul7 - 0.1, kind: 'whoosh' }, { t: T.mul7 + 0.3, kind: 'pop' }, { t: T.div7, kind: 'pop' },
      { t: T.same7, kind: 'snap' }, { t: T.which, kind: 'tick' }, { t: T.first, kind: 'tick' }, { t: T.add8, kind: 'pop' },
      { t: T.share, kind: 'snap' }, { t: T.go8 + 0.1, kind: 'tick' }, { t: T.right8, kind: 'tick' }];
  }
  camX(t) {
    const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1];
    return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0))) + 7 * (t - this.FROM) - 40;   // trôi chậm dọc đường
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, [MAIN, ASTRAY]); centerLine(g, MAIN);

    // ── đoạn A: nhiều người đi lạc ──
    paint(g, 'PEMDAS', 700, Y - 10, 120);
    typed(g, 'where many people go astray', 1180, 840, prog(t, T.many - 0.1, T.astray + 0.4), LABEL, ROAD.edge, { align: 'right' });
    for (let i = 0; i < 3; i++) {                                     // ba xe xám rẽ vào lối lạc, nối đuôi nhau
      const u = prog(t, this.FROM + 0.6 + i * 0.3, T.astray + 0.9 + i * 0.3);
      if (u <= 0 || u >= 1) continue;
      const p = astrayAt(outCubic(u) * 1.0);
      car(g, p.x, p.y, p.a, { color: GREY, s: 0.72 });
    }

    // ── đoạn B: đọc lầm là đường một chiều ──
    oneWayRow(g, t, XB + 520, ['M', 'D'], T.m, T.d, T.think4, T.mul4, 'multiplication first?');
    oneWayRow(g, t, XB + 1400, ['A', 'S'], T.a, T.s, T.think5, T.add5, 'addition first?');
    const kN = prog(t, T.not - 0.05, T.not + 0.35), kN2 = prog(t, T.not + 0.15, T.not + 0.55);
    for (const [x, k] of [[XB + 520, kN], [XB + 1400, kN2]]) {
      barrier(g, x, Y - 140, x, Y + 140, k);                          // rào đỏ chặn ngang mũi tên
      cross(g, x, 268, 64, k, { color: ROAD.red });                   // ✗ lên biển ONE WAY
    }
    typed(g, 'not the rule', XB + 960, 330, prog(t, T.not, T.not + 0.6), LABEL, ROAD.edge, { align: 'center' });

    // ── đoạn C: cùng cấp = cùng biển, đọc trái → phải ──
    mergeSigns(g, t, 'MD', '×', '÷', '× ÷', XC + 380, XC + 580, T.mul7 + 0.3, T.div7, T.same7);
    mergeSigns(g, t, 'AS', '+', '−', '+ −', XC + 1280, XC + 1480, T.add8, T.sub8, T.share);
    const md = rowAt(g, ['a', '÷', 'b', '×', 'c'], XC + 480, 92), as = rowAt(g, ['a', '−', 'b', '+', 'c'], XC + 1380, 92);
    md.forEach((o, i) => pk(g, o.s, o.x, Y - 6, 92, {  k: prog(t, T.level7 + i * 0.08, T.level7 + 0.3 + i * 0.08) }));
    as.forEach((o, i) => pk(g, o.s, o.x, Y - 6, 92, {  k: prog(t, T.level8 + i * 0.08, T.level8 + 0.3 + i * 0.08) }));
    const carX = this.carX(t);
    for (const o of [md[1], md[3], as[1], as[3]]) {                   // phép xe đang đi qua: khung vàng
      const k = clamp(1 - Math.abs(carX - o.x) / 70); if (k <= 0) continue;
      g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 6; g.globalAlpha = 1; g.beginPath(); g.roundRect(o.x - 50, Y - 70, 100, 128, 14); g.stroke(); g.restore();
    }
    typed(g, 'same level', XC + 480, 800, prog(t, T.same7, T.same7 + 0.6), LABEL, ROAD.edge, { align: 'center' });
    typed(g, 'whichever comes first', XC + 480, 870, prog(t, T.which, T.first + 0.4), LABEL, ROAD.gold, { align: 'center' });
    typed(g, 'same level too', XC + 1380, 800, prog(t, T.share, T.share + 0.6), LABEL, ROAD.edge, { align: 'center' });
    typed(g, 'left to right', XC + 1380, 870, prog(t, T.go8 - 0.2, T.right8 + 0.2), LABEL, ROAD.gold, { align: 'center' });
    if (t > this.CAR[0][0]) car(g, carX, Y + 112, 0, { s: 0.72 });
    g.restore();

    card(g, 'road', prog(t, this.FROM, this.FROM + 1.0), 'ACT ONE · THE RULE', 'Same level, left to right');
  }
  carX(t) {
    const K = this.CAR; if (t <= K[0][0]) return K[0][1];
    let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1]; return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0)));
  }
}

// điểm trên lối xe xám: chạy làn dưới đường chính rồi theo lối rẽ (u ∈ [0,1])
function astrayAt(u) {
  const a = [-300, Y + 70], b = [1000, Y + 70], P = [[1000, Y + 70], [1260, Y + 70], [1390, Y + 200], [1450, 1300]];
  const L1 = b[0] - a[0], split = L1 / (L1 + 900);
  if (u < split) return { x: a[0] + (b[0] - a[0]) * u / split, y: Y + 70, a: 0 };
  const s = (u - split) / (1 - split), m = 1 - s;
  const x = m * m * m * P[0][0] + 3 * m * m * s * P[1][0] + 3 * m * s * s * P[2][0] + s * s * s * P[3][0];
  const y = m * m * m * P[0][1] + 3 * m * m * s * P[1][1] + 3 * m * s * s * P[2][1] + s * s * s * P[3][1];
  const dx = 3 * m * m * (P[1][0] - P[0][0]) + 6 * m * s * (P[2][0] - P[1][0]) + 3 * s * s * (P[3][0] - P[2][0]);
  const dy = 3 * m * m * (P[1][1] - P[0][1]) + 6 * m * s * (P[2][1] - P[1][1]) + 3 * s * s * (P[3][1] - P[2][1]);
  return { x, y, a: Math.atan2(dy, dx) };
}
// "X → Y" sơn như đường một chiều + biển ONE WAY + nhãn câu hỏi
function oneWayRow(g, t, x, [l, r], tl, tr, tArrow, tLabel, label) {
  pk(g, l, x - 190, Y - 6, 120, { k: prog(t, tl - 0.05, tl + 0.2) });
  pk(g, r, x + 190, Y - 6, 120, { k: prog(t, tr - 0.05, tr + 0.2) });
  const ka = prog(t, tArrow - 0.1, tArrow + 0.4);
  if (ka > 0) {                                                       // mũi tên sơn dài dần từ trái sang
    g.save(); g.beginPath(); g.rect(x - 120, Y - 80, 240 * outCubic(ka), 160); g.clip(); paint(g, '→', x, Y - 6, 150, { gap: false }); g.restore();
  }
  oneWay(g, x, 268, prog(t, tArrow, tArrow + 0.35));
  typed(g, label, x, 800, prog(t, tLabel - 0.1, tLabel + 0.7), LABEL, ROAD.edge, { align: 'center' });
}
function oneWay(g, x, y, k) {                                         // biển ONE WAY: nền than, mũi tên trắng
  if (k <= 0) return;
  const p = outBack(clamp(k)); g.save(); g.translate(x, y); g.scale(p, p);
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 16; g.shadowOffsetY = 9; g.fillStyle = '#ECECEC';
  g.beginPath(); g.roundRect(-150, -52, 300, 104, 10); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = ROAD.ink; g.beginPath(); g.roundRect(-142, -44, 284, 88, 7); g.fill();
  g.fillStyle = '#F4F1EA'; g.beginPath(); g.moveTo(-122, -22); g.lineTo(62, -22); g.lineTo(62, -36); g.lineTo(124, 0); g.lineTo(62, 36); g.lineTo(62, 22); g.lineTo(-122, 22); g.closePath(); g.fill();
  g.fillStyle = ROAD.ink; g.font = '800 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ONE WAY', -24, 2);
  g.restore();
}
// hai biển cùng cấp bật lên riêng rồi trượt vào nhau thành MỘT biển
function mergeSigns(g, t, kind, a, b, ab, xa, xb, ta, tb, tm) {
  const km = smooth(prog(t, tm - 0.1, tm + 0.35)), xm = (xa + xb) / 2;
  if (km < 1) {
    sign(g, kind, a, xa + (xm - xa) * km, 268, 61, prog(t, ta - 0.05, ta + 0.3));
    sign(g, kind, b, xb + (xm - xb) * km, 268, 61, prog(t, tb - 0.05, tb + 0.3));
  } else {
    const bump = 1 + 0.12 * Math.sin(clamp((t - tm - 0.35) / 0.3) * Math.PI);
    sign(g, kind, ab, xm, 268, 68.6, 1);
    if (bump > 1.001) { g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 5; g.beginPath(); g.arc(xm, 268, 68.6 * bump + 14, 0, 7); g.stroke(); g.restore(); }
  }
}
function rowAt(g, toks, cx, size) {                                   // hàng token cách đều, căn giữa ở cx → [{s, x}]
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = toks.map(s => g.measureText(s).width); g.restore();
  const gap = size * 0.34, tot = ws.reduce((a, b) => a + b, 0) + gap * (toks.length - 1);
  let x = cx - tot / 2; return toks.map((s, i) => { const o = { s, x: x + ws[i] / 2 }; x += ws[i] + gap; return o; });
}
function pk(g, s, x, y, size, o) { if (o.k > 0) paint(g, s, x, y, size, o); }   // chưa sơn thì vạch giữa còn nguyên
