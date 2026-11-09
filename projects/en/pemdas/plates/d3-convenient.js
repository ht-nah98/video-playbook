// d3 — "Convenient, not inevitable" (p2 câu 58–61). Toạ độ THẾ GIỚI, camera = tâm (x, y) + thu phóng s.
//   x −2000–1100   đường chính y = 540, xe vàng chạy vào                         (câu 58)
//   x 1100–1800    đường chính toả thành 4 con đường song song = 4 bộ luật tưởng tượng; camera lùi ra xem cả 4
//   x 1800–4600    mỗi đường sơn tên luật + CÙNG biểu thức 3x² + 2x + 1, số cặp ngoặc (rào) do CODE đếm   (câu 59)
//                  xe đua: xe PEMDAS lướt thẳng, xe các đường kia dừng ở từng rào                            (câu 60)
//   x 4600–5300    4 đường nhập lại;  x 5300+ CONVENIENCE sơn vàng, biển do người cắm (đất xới, xẻng, bảng gỗ)
//                  so với tảng đá khắc 1 + 1 = 2 của mở bài (chân lý: đá liền, không ai cắm)                 (câu 61)
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, ROAD, verge, road, centerLine, paint as paint0, sign, car, card,
  typed, ring, lookup } from '../kit.js';

// sơn chỉ khi đã bắt đầu sơn: paint() của kit khoét vạch giữa kể cả lúc k = 0
const paint = (g, s, x, y, size, o = {}) => { if ((o.k ?? 1) > 0) paint0(g, s, x, y, size, o); };
const Y = 540, FAN0 = 1100, FAN1 = 1800, IN0 = 4600, IN1 = 5300, ROW = 2600, SZ = 92;
// cây biểu thức 3x² + 2x + 1 — mỗi bộ luật IN nó với ÍT ngoặc nhất mà vẫn đúng cây
const n = v => ({ v }), b = (op, l, r) => ({ op, l, r });
const POLY = b('+', b('+', b('×', n('3'), b('^', n('x'), n('2'))), b('×', n('2'), n('x'))), n('1'));
const RULES = [
  { name: '+ BEFORE ×', off: -330, prec: { '^': 3, '+': 2, '×': 1 }, right: { '^': 1 } },
  { name: 'PEMDAS', off: 0, prec: { '^': 3, '×': 2, '+': 1 }, right: { '^': 1 } },
  { name: 'LEFT TO RIGHT', off: 330, prec: { '^': 1, '×': 1, '+': 1 }, right: {} },
  { name: 'RIGHT TO LEFT', off: 660, prec: { '^': 1, '×': 1, '+': 1 }, right: { '^': 1, '×': 1, '+': 1 } },
];
function needs(c, op, side, R) {                       // con c dưới phép op (bên side) có cần ngoặc không
  if (!c.op) return false; const pc = R.prec[c.op], pp = R.prec[op];
  if (pc !== pp) return pc < pp; return R.right[op] ? side === 'l' : side === 'r';
}
function emit(nd, R) {                                 // → token {s, tight, P}; tight = dính token trước (nhân ngầm, trong ngoặc)
  if (!nd.op) return [{ s: nd.v }];
  const side = (c, s) => { const t = emit(c, R); if (!needs(c, nd.op, s, R)) return t;
    t[0] = { ...t[0], tight: true }; return [{ s: '(', P: 1 }, ...t, { s: ')', P: 1, tight: true }]; };
  const l = side(nd.l, 'l'), r = side(nd.r, 'r');
  if (nd.op === '^') { l[l.length - 1] = { ...l.at(-1), s: l.at(-1).s + '²' }; return l; }
  if (nd.op === '×') { r[0] = { ...r[0], tight: true }; return [...l, ...r]; }
  return [...l, { s: '+' }, ...r];
}
// KIỂM: đọc lại chuỗi đã in THEO CHÍNH bộ luật đó (shunting-yard), x = 2 → phải ra 3·4 + 2·2 + 1 = 17
function evalAs(toks, R, x) {
  const a = []; let prevOperand = false;
  for (const t of toks) for (const ch of t.s) {
    const operand = /[0-9x(]/.test(ch);
    if (operand && prevOperand) a.push('×');
    if (ch === '²') { a.push('^', '2'); prevOperand = true; continue; }
    a.push(ch); prevOperand = /[0-9x)]/.test(ch);
  }
  const out = [], ops = [], ap = () => { const o = ops.pop(), r = out.pop(), l = out.pop(); out.push(o === '+' ? l + r : o === '×' ? l * r : l ** r); };
  for (const c of a) {
    if (/[0-9]/.test(c)) out.push(+c); else if (c === 'x') out.push(x); else if (c === '(') ops.push(c);
    else if (c === ')') { while (ops.at(-1) !== '(') ap(); ops.pop(); }
    else { while (ops.length && ops.at(-1) !== '(' && (R.prec[ops.at(-1)] > R.prec[c] || (R.prec[ops.at(-1)] === R.prec[c] && !R.right[c]))) ap(); ops.push(c); }
  }
  while (ops.length) ap(); return out[0];
}
const ROADS = RULES.map(R => { const toks = emit(POLY, R), v = evalAs(toks, R, 2);
  if (v !== 17) throw new Error(`d3: ${R.name} đọc ra ${v}, không phải 17`);
  return { ...R, y: Y + R.off, toks, fences: toks.filter(t => t.s.startsWith('(')).length }; });
if (ROADS.find(r => r.name === 'PEMDAS').fences !== Math.min(...ROADS.map(r => r.fences))) throw new Error('d3: PEMDAS không ít ngoặc nhất');

const fan = y1 => g => {                               // toả ra từ đường chính, chạy song song, nhập lại
  g.moveTo(FAN0, Y); g.bezierCurveTo(FAN0 + 380, Y, FAN1 - 380, y1, FAN1, y1); g.lineTo(IN0, y1); g.bezierCurveTo(IN0 + 380, y1, IN1 - 380, Y, IN1, Y);
};
const MAIN = [g => { g.moveTo(-3000, Y); g.lineTo(FAN0 + 2, Y); }, g => { g.moveTo(IN1 - 2, Y); g.lineTo(10000, Y); }];
const LANES = ROADS.map(R => fan(R.y));

export default class Convenient {
  static ERA = 'road';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      this: w(58, 'this'), l59: L(59).start, conv: w(59, 'conventions'), inv: w(59, 'invented'), pemdas: w(59, 'pemdas'),
      common: w(59, 'common'), expressions: w(59, 'expressions'), fewest: w(59, 'fewest'), brackets: w(59, 'brackets'), l60: L(60).start, tuned: w(60, 'tuned'),
      natural: w(60, 'natural'), comes: w(61, 'comes'), convenience: w(61, 'convenience'), unbreakable: w(61, 'unbreakable'),
      truth: w(61, 'truth'), math: w(61, 'mathematics'), end: L(61).end,
    };
    this.START = L(58).start; this.FROM = this.START - 1.2;
    const T = this.T;
    // camera [t, tâm x, tâm y, thu phóng] — lùi ra ở "this", trôi theo đường đua, lao vào đoạn kết ở "natural"
    // tâm y 600 (không 700): làn trên thấp hơn 60 px trên khung, mép đường không chui dưới biển tên mục (review L4)
    this.CAM = [[this.FROM, -400, Y, 1], [T.this - 0.25, 1250, Y, 1], [T.l59 + 0.5, 2950, 600, 0.6], [T.tuned, 3150, 600, 0.6],
      [T.natural, 3650, 600, 0.6], [T.natural + 1.0, 6100, Y, 1], [T.end + 0.9, 6400, Y, 1]];
    // lúc cảnh sau bắt đầu (FROM cảnh sau + 0.9 ≈ end + 0.8) đường chính đã nằm ngang ở y 540, s = 1
    ROADS.forEach(R => { R.lay = layout(R.toks); R.w = R.lay.at(-1).x + R.lay.at(-1).w / 2; });
  }
  cam(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const a = K[i], c = K[i + 1], e = smooth(clamp((t - a[0]) / (c[0] - a[0])));
    return { x: a[1] + (c[1] - a[1]) * e, y: a[2] + (c[2] - a[2]) * e, s: a[3] + (c[3] - a[3]) * e }; }
  // xe trên đường R: chạy từ vạch xuất phát, dừng 0.45 s trước mỗi rào; xe PEMDAS chạy tiếp ra đường chính
  carX(R, t) {
    const T = this.T, x0 = ROW - 230, v = 900;
    if (R.off === 0 && t < T.tuned) return Math.min(x0, -700 + 3070 * outCubic(prog(t, this.FROM, T.l59 + 1.2)));
    let e = Math.max(0, t - T.tuned), x = x0;
    for (const f of R.lay.filter(q => q.P)) { const fx = ROW + f.x + (f.s[0] === '(' ? 0 : -f.w / 2 + 14) - 90;
      const d = (fx - x) / v; if (e < d) return x + e * v; e -= d; x = fx; if (e < 0.45) return x; e -= 0.45; }
    return R.off === 0 ? x + e * v : Math.min(4420, x + e * v);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.this - 0.25, kind: 'whoosh' }, { t: T.conv, kind: 'pop' }, { t: T.fewest, kind: 'pop' }, { t: T.brackets + 0.25, kind: 'snap' },
      { t: T.tuned, kind: 'tick' }, { t: T.natural, kind: 'whoosh' }, { t: T.convenience, kind: 'snap' }, { t: T.truth, kind: 'type' }];
  }
  render(g, t) {
    const T = this.T, C = this.cam(t);
    g.save(); verge(g); g.translate(W / 2, H / 2); g.scale(C.s, C.s); g.translate(-C.x, -C.y);
    road(g, [...MAIN, ...LANES]);
    for (const p of [...MAIN, ...LANES]) centerLine(g, p);

    // ── 4 bộ luật: tên, biểu thức, rào, số cặp ngoặc ──
    ROADS.forEach((R, i) => {
      const pem = R.off === 0, kn = pem ? prog(t, T.pemdas - 0.05, T.pemdas + 0.4) : prog(t, T.conv + i * 0.3, T.conv + i * 0.3 + 0.45);
      g.save(); g.font = `800 64px "Archivo"`; const nw = g.measureText(R.name).width; g.restore();
      paint(g, R.name, FAN1 + 120 + nw / 2, R.y, 64, { k: kn });
      const ke = prog(t, T.common - 0.1, T.expressions + 0.3);
      R.lay.forEach((q, j) => paint(g, q.s, ROW + q.x, R.y, SZ, { k: clamp(ke * R.lay.length - j) }));
      R.lay.filter(q => q.P).forEach((q, j) => fence(g, ROW + q.x + (q.s[0] === '(' ? 0 : -q.w / 2 + 14), R.y, prog(t, T.fewest + j * 0.12, T.fewest + j * 0.12 + 0.35)));
      const xc = ROW + R.w + 230, kc = prog(t, T.brackets - 0.1, T.brackets + 0.3);
      sign(g, 'P', '( )', xc, R.y, 52, kc);
      paint(g, String(R.fences), xc + 140, R.y, 120, { k: kc, color: pem ? ROAD.gold : ROAD.paint });
      if (pem) ring(g, xc + 140, R.y, 82, 96, prog(t, T.brackets + 0.25, T.brackets + 0.75), { color: ROAD.gold, w: 7 });
      const cx = this.carX(R, t);
      if (pem || cx < 4430) car(g, cx, R.y + 96, 0, { s: 0.72, color: pem ? ROAD.gold : '#C9CCC2' });
    });

    // ── đoạn kết: tiện, không phải chân lý ──
    typed(g, 'feels natural', 5560, 800, prog(t, T.natural + 0.5, T.natural + 1.2), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    paint(g, 'CONVENIENCE', 6250, Y, SZ, { k: prog(t, T.convenience - 0.15, T.convenience + 0.5), color: ROAD.gold });
    plank(g, 6180, 880, prog(t, T.comes - 0.1, T.comes + 0.35));
    [['P', '( )'], ['E', '^'], ['MD', '×'], ['AS', '+']].forEach(([kd, s], i) => {
      const x = 6560 + i * 150, k = prog(t, T.comes + 0.15 + i * 0.16, T.comes + 0.5 + i * 0.16);
      mound(g, x, 868, k); sign(g, kd, s, x, 840, 46, k);
    });
    shovel(g, 7170, 860, prog(t, T.comes + 0.8, T.comes + 1.2));
    typed(g, 'planted by people', 6500, 990, prog(t, T.convenience + 0.2, T.convenience + 1.0), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
    stone(g, 6800, 250, prog(t, T.unbreakable - 0.2, T.unbreakable + 0.4), prog(t, T.truth, T.math + 0.4));
    typed(g, 'a law of nature', 6520, 270, prog(t, T.truth, T.truth + 0.7), 'italic 600 54px "Cormorant Garamond"', ROAD.edge, { align: 'right' });
    g.restore();
    card(g, 'road', prog(t, this.FROM + 0.2, this.FROM + 1.4), 'ACT THREE · NOT ARBITRARY', 'Convenient, not inevitable');
  }
}

function layout(toks) {                                // vị trí tâm từng token (tương đối), tight = sát nhau
  const c = document.createElement('canvas').getContext('2d'); c.font = `800 ${SZ}px "Archivo"`; let x = 0;
  return toks.map((t, i) => { const w = c.measureText(t.s).width; if (i) x += t.tight ? SZ * 0.05 : SZ * 0.32; const o = { ...t, x: x + w / 2, w }; x += w; return o; });
}
function fence(g, x, y, k) {                           // rào ngoặc: hai cọc than to ở hai mép làn, đúng chỗ dấu ngoặc
  if (k <= 0) return; const p = outBack(clamp(k));
  for (const s of [-1, 1]) { g.save(); g.translate(x, y + s * 104); g.scale(p, p);
    g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6; g.fillStyle = ROAD.edge;
    g.beginPath(); g.roundRect(-27, -27, 54, 54, 8); g.fill(); g.shadowColor = 'transparent';
    g.fillStyle = ROAD.P; g.beginPath(); g.roundRect(-21, -21, 42, 42, 6); g.fill();
    g.fillStyle = 'rgba(233,231,223,.35)'; g.fillRect(-21, -21, 42, 9); g.restore(); }
}
function mound(g, x, y, k) {                           // đất mới xới quanh chân cột: dấu tay người cắm
  if (k <= 0) return; const p = outCubic(clamp(k * 1.5));
  g.save(); g.translate(x, y); g.scale(p, p); g.fillStyle = '#5E4630'; g.beginPath();
  for (let i = 0; i <= 18; i++) { const a = i / 18 * Math.PI * 2, r = 1 + (hash(i * 2.7 + x) - 0.5) * 0.35; g.lineTo(Math.cos(a) * 70 * r, Math.sin(a) * 34 * r); }
  g.fill(); g.fillStyle = '#7A5C3E'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc((hash(i + x) - 0.5) * 110, (hash(i * 3 + x) - 0.5) * 44, 5 + hash(i * 7) * 5, 0, 7); g.fill(); }
  g.restore();
}
function shovel(g, x, y, k) {                          // xẻng nằm trên cỏ cạnh hàng biển
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.rotate(-0.5); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 10; g.shadowOffsetY = 6;
  g.fillStyle = '#9A7448'; g.fillRect(-90, -7, 150, 14); g.fillStyle = '#2A2C30'; g.fillRect(-112, -14, 26, 28);
  g.fillStyle = '#9EA3A8'; g.beginPath(); g.moveTo(58, -26); g.lineTo(118, -22); g.quadraticCurveTo(140, 0, 118, 22); g.lineTo(58, 26); g.closePath(); g.fill();
  g.restore();
}
function plank(g, x, y, k) {                           // bảng gỗ tự sơn tay "PEMDAS", hai đinh — biển do NGƯỜI làm
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.rotate(-0.04); g.scale(1, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 16; g.shadowOffsetY = 10;
  g.fillStyle = '#8A6440'; g.beginPath(); g.roundRect(-150, -48, 300, 96, 6); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = 'rgba(60,40,22,.55)'; g.lineWidth = 2; for (let i = 0; i < 5; i++) { const yy = -36 + i * 18 + hash(i) * 4; g.beginPath(); g.moveTo(-146, yy); g.bezierCurveTo(-60, yy + 4, 40, yy - 4, 146, yy + 2); g.stroke(); }
  g.fillStyle = '#3A2A1A'; for (const sx of [-132, 132]) { g.beginPath(); g.arc(sx, 0, 5, 0, 7); g.fill(); }
  g.fillStyle = '#F4F1EA'; g.font = '800 56px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 3);
  g.restore();
}
function stone(g, x, y, k, kc) {                       // tảng đá của mở bài (a0-open.js): khắc 1 + 1 = 2, không ai cắm
  if (k <= 0) return; const p = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - p) * 60); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 24; g.shadowOffsetY = 14;
  g.fillStyle = '#8D8A82'; g.beginPath();
  for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2, r = (1 + (hash(i * 3.3) - 0.5) * 0.12); g.lineTo(Math.cos(a) * 230 * r, Math.sin(a) * 110 * r); }
  g.fill(); g.shadowColor = 'transparent';
  const s = '1 + 1 = 2', n = Math.round(s.length * clamp(kc));
  g.font = '800 92px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillText(s.slice(0, n).padEnd(s.length, ' '), 2, 4);
  g.fillStyle = '#3B3934'; g.fillText(s.slice(0, n).padEnd(s.length, ' '), 0, 0); g.restore();
}
