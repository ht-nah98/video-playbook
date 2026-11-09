// e2 — "Even the calculators disagree" (p2 câu 70–73). Toạ độ THẾ GIỚI, đường chính y = 540, camera = tâm x.
//   x −3000–2200  đường chính (mối nối với e1)
//   x 2200–4300   ngã ba; trong dải cỏ giữa hai nhánh dựng HAI máy tính chung chung như máy dẫn đường gắn ở ngã ba:
//                 OLDER MODEL hiện 1, chỉ xuống nhánh dưới; LATER MODEL hiện 9, chỉ lên nhánh trên (71);
//                 cùng phím sáng cùng lúc, hai kết quả khác nhau (72). Không hãng, không số máy, không logo.
//   x 4300+       đường thẳng: bài 6 ÷ 2(1 + 2) = ? sơn lại, mascot shrug (73) — đường nằm ngang tới cảnh sau.
import { W, H, clamp, prog, smooth, outCubic, outBack, ROAD, ERA, verge, road, centerLine, paint as paint0, car, card,
  typed, ring, arrow, figure, typeCues, must, lookup } from '../kit.js';

const paint = (g, s, x, y, size, o = {}) => { if ((o.k ?? 1) > 0) paint0(g, s, x, y, size, o); };
const Y = 540, X0 = 2200, C = 700, S = 700, D = 360, OLD = 3060, NEW = 3420, CW = 300, CH = 384;
const fork = sg => g => { const y = Y + sg * D; g.moveTo(X0, Y); g.bezierCurveTo(X0 + 330, Y, X0 + 350, y, X0 + C, y); g.lineTo(X0 + C + S, y);
  g.bezierCurveTo(X0 + C + S + 350, y, X0 + C + S + 370, Y, X0 + 2 * C + S, Y); };
const PATHS = [g => { g.moveTo(-3000, Y); g.lineTo(X0 + 2, Y); }, g => { g.moveTo(X0 + 2 * C + S - 2, Y); g.lineTo(12000, Y); }, fork(-1), fork(1)];
const EXPR = '6÷2(1+2)';
const KEYS = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '(', ')', '+'];

export default class Calc {
  static ERA = 'road';
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      l70: L(70).start, calcs: w(70, 'calculators'), agree: w(70, 'agree'), older: w(71, 'older'), glued: w(71, 'glued-on'),
      priority: w(71, 'priority'), later: w(71, 'later'), mult: w(71, 'multiplication', 2), same: w(72, 'same'),
      keys: w(72, 'keys'), different: w(72, 'different'), answers: w(72, 'answers'), l73: L(73).start, build: w(73, 'build'),
      problem: w(73, 'problem'), not: w(73, 'not'), smarter: w(73, 'smarter'), end73: L(73).end, next: L(74).start,
    };
    const T = this.T;
    this.START = L(70).start; this.FROM = this.START - 1.2;
    // đời cũ: nhân dính ngoặc mạnh hơn → 6 ÷ (2 × 3); đời sau: như × thường, trái → phải → 6 ÷ 2 × 3
    this.old = must('6 ÷ (2 × (1 + 2))', 1); this.new = must('6 ÷ 2 × (1 + 2)', 9);
    // lúc cảnh sau (e3) vào: FROM ≈ câu 74 − 1.2 — đường đã thẳng từ lúc lướt ở câu 73
    this.CAM = [[this.FROM, 860], [T.calcs - 0.15, 1000], [T.calcs + 0.75, X0 + 760], [T.l73 - 0.15, X0 + 840], [T.l73 + 0.75, 5600], [T.next, 5640]];
  }
  camX(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1]; return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0))); }
  sfx() {
    const T = this.T;
    return [{ t: T.calcs, kind: 'pop' }, ...typeCues(EXPR, T.calcs + 0.35, T.agree + 0.15), { t: T.priority, kind: 'beep' }, { t: T.mult, kind: 'beep' },
      ...typeCues(EXPR, T.keys - 0.2, T.different + 0.1), { t: T.l73 - 0.15, kind: 'whoosh' }, { t: T.problem, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    // ngã ba hạ 60 px trong lúc camera ở ngã ba: nhánh trên không chui dưới biển tên mục (review L4); mối nối hai đầu vẫn y = 540
    const dy = 60 * (smooth(prog(t, T.calcs - 0.15, T.calcs + 0.75)) - smooth(prog(t, T.l73 - 0.15, T.l73 + 0.75)));
    g.save(); verge(g); g.translate(W / 2 - cx, dy);
    road(g, PATHS); for (const p of PATHS) centerLine(g, p);

    // ── hai máy tính ở ngã ba ──
    const kOld = prog(t, T.calcs - 0.1, T.calcs + 0.3), kNew = prog(t, T.calcs + 0.1, T.calcs + 0.5);
    const kExpr = prog(t, T.calcs + 0.35, T.agree + 0.15);
    const lit = i => { const ks = EXPR.length, a = T.keys - 0.2, b = T.different + 0.1, j = Math.floor((t - a) / ((b - a) / ks));
      return t >= a && t < b + 0.15 && j >= 0 && j < ks ? EXPR[j] : null; };
    calc(g, OLD, Y, kOld, 'OLDER MODEL', kExpr, this.old, prog(t, T.priority, T.priority + 0.1), lit(), {
      label: prog(t, T.older, T.older + 0.5), glued: prog(t, T.glued, T.glued + 0.4), res: prog(t, T.different, T.different + 0.5) });
    calc(g, NEW, Y, kNew, 'LATER MODEL', kExpr, this.new, prog(t, T.mult, T.mult + 0.1), lit(), {
      label: prog(t, T.later, T.later + 0.5), glued: 0, res: prog(t, T.answers - 0.1, T.answers + 0.4) });
    // máy chỉ nhánh: đời cũ ↓ nhánh dưới (1), đời sau ↑ nhánh trên (9) — cả hai vàng, không ai sai
    const ka = prog(t, T.priority + 0.1, T.priority + 0.6), kb = prog(t, T.mult + 0.1, T.mult + 0.6);
    arrow(g, OLD, Y + CH / 2 + 10, OLD, Y + D - 80, ka, { color: ROAD.gold, w: 7 });
    paint(g, String(this.old), OLD + 130, Y + D, 120, { k: prog(t, T.priority + 0.4, T.priority + 0.6), color: ROAD.gold });
    arrow(g, NEW, Y - CH / 2 - 10, NEW, Y - D + 80, kb, { color: ROAD.gold, w: 7 });
    paint(g, String(this.new), NEW + 130, Y - D, 120, { k: prog(t, T.mult + 0.4, T.mult + 0.6), color: ROAD.gold });

    // ── đường thẳng sau ngã ba: vẫn là bài đó, vẫn "?" ──
    const toks = ['6', '÷', '2(1', '+', '2)', '=', '?'];
    g.save(); g.font = '800 92px "Archivo"'; const ws = toks.map(s => g.measureText(s).width); g.restore();
    let x = 4880; const pulse = 1 + 0.15 * Math.sin(clamp((t - T.problem) / 0.5) * Math.PI);
    toks.forEach((s, i) => { const c = x + ws[i] / 2; paint(g, s, c, Y, s === '?' && pulse > 1.04 ? 120 : 92, { color: s === '?' ? ROAD.yellow : ROAD.paint }); x += ws[i] + 30; });
    typed(g, 'not about who is smarter', 4800, 820, prog(t, T.not, T.smarter + 0.5), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    car(g, 4500 + 260 * outCubic(prog(t, T.l73 + 0.4, T.l73 + 2.4)), Y + 92, 0, { s: 0.8 });
    g.restore();

    const kS = Math.min(prog(t, T.l73 + 0.1, T.l73 + 0.5), 1 - prog(t, T.end73 - 0.3, T.end73 + 0.1));
    figure(g, 'shrug', 1660, H, 700, 'road', kS);
    card(g, 'road', prog(t, this.FROM + 0.2, this.FROM + 1.4), 'ACT FOUR · THE GAP', 'Even the calculators disagree');
  }
}

// máy tính chung chung nhìn từ trên: thân than, nhãn đời máy (Plex), màn LCD tối, bàn phím 4×4 — không hãng, không logo
function calc(g, x, y, k, label, kExpr, res, kRes, lit, { label: kL, glued, res: kRing }) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(p, p); g.translate(-CW / 2, -CH / 2);
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 22; g.shadowOffsetY = 12; g.fillStyle = '#2B2E33';
  g.beginPath(); g.roundRect(0, 0, CW, CH, 26); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = '#4A4F57'; g.lineWidth = 4; g.beginPath(); g.roundRect(6, 6, CW - 12, CH - 12, 21); g.stroke();
  g.font = '500 20px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#C9CCD1'; g.fillText(label, CW / 2, 36);
  if (kL > 0) { g.strokeStyle = ROAD.gold; g.lineWidth = 3; g.beginPath(); g.moveTo(CW / 2 - 70 * kL, 52); g.lineTo(CW / 2 + 70 * kL, 52); g.stroke(); }
  // LCD
  g.fillStyle = '#0E1013'; g.beginPath(); g.roundRect(22, 64, CW - 44, 112, 10); g.fill();
  g.strokeStyle = '#5A606A'; g.lineWidth = 2; g.stroke();
  const n = Math.round(EXPR.length * clamp(kExpr));
  g.font = '500 28px "IBM Plex Mono"'; g.textAlign = 'left'; g.fillStyle = ERA.screen.ink;
  if (glued > 0) { const cw = g.measureText('0').width; g.fillStyle = ROAD.gold; g.fillRect(36 + cw * 2 - 3, 78, cw * 6 * clamp(glued) + 6, 36); g.fillStyle = ERA.screen.ink; }
  g.fillText(EXPR.slice(0, n), 36, 97);
  if (glued > 0) { const cw = g.measureText('0').width; g.fillStyle = '#0E1013'; g.fillText(EXPR.slice(2, 2 + Math.round(6 * clamp(glued))), 36 + cw * 2, 97); }
  if (kRes > 0) { g.font = '500 34px "IBM Plex Mono"'; g.textAlign = 'right'; g.fillStyle = ROAD.gold; g.fillText(String(res), CW - 38, 150);
    if (kRing > 0) ring(g, CW - 48, 148, 30, 26, kRing, { color: ROAD.gold, w: 4 }); }
  // phím
  KEYS.forEach((s, i) => { const c = i % 4, r = (i / 4) | 0, kx = 24 + c * 65, ky = 196 + r * 44, on = lit === s;
    g.fillStyle = on ? ROAD.gold : (c === 3 ? '#454A52' : '#3A3E45'); g.beginPath(); g.roundRect(kx, ky, 56, 36, 7); g.fill();
    g.font = '500 20px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillStyle = on ? ROAD.ink : '#D9DBDF'; g.fillText(s, kx + 28, ky + 19); });
  g.restore();
}
