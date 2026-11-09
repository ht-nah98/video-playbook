// b4 · A limit (p2 câu 20–23) — cuối HỒI I. Đa giác mực 6 → 12 → 24 → … biến LIÊN TỤC thành vòng compa xanh (n → ∞):
// mỗi lần nhân đôi, đỉnh mới trồi từ giữa cạnh ra tới vành. Bảng n · sin(π/n) mọc theo; DETAIL A: thẳng → cong, π ngồi
// trên ranh giới; cuối: lục giác → (giá: π) → vòng tròn trơn.
import { C, CG, MONO, PI, PI_DIGITS, clamp, smooth, outCubic, prog, ground, drift, card, typed, note, line, poly,
  compassCircle, pivot, arc, leader, arrow, lookup, must, fix } from '../kit.js';

const CX = 760, CY = 540, R = 280, LEVELS = 6;      // 6 · 2^6 = 384 cạnh: tới đây mắt không còn thấy góc

// Đa giác "đang nhân đôi": s = mức liên tục (0 = lục giác). Đỉnh lẻ của 2n-giác đi từ trung điểm cạnh (bán kính R·cos(π/n))
// ra vành theo phần lẻ của s — hình biến liên tục, không nhảy.
function morph(cx, cy, r, s) {
  const lv = Math.floor(s), n = 6 * 2 ** lv, f = smooth(s - lv), m = 2 * n, a0 = PI / 2, rc = r * Math.cos(PI / n);
  return Array.from({ length: m + 1 }, (_, j) => {
    const a = a0 + 2 * PI * j / m, rr = j % 2 ? rc + (r - rc) * f : r;
    return [cx + rr * Math.cos(a), cy - rr * Math.sin(a)];
  });
}

export default class Limit {
  static ERA = 'vellum';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b4');
    this.T = {
      gift: w(20, 'gift'), digits: w(20, 'digits'), method: w(20, 'method'), shows: w(20, 'shows'),
      process: w(21, 'process'), heading: w(21, 'heading'), limit: w(21, 'limit'),
      words: w(22, 'words'), lives: w(22, 'lives'), border: w(22, 'border'), straight: w(22, 'straight'), curved: w(22, 'curved'),
      price: w(23, 'price'), pay: w(23, 'pay'), corners: w(23, 'corners'), into: w(23, 'into'), smooth: w(23, 'smooth'), end: L(23).end,
    };
    this.START = L(20).start; this.FROM = this.START - 1.2;
    // mức nhân đôi: bắt đầu ở "process", tới 384 cạnh đúng "limit"
    this.DBL = [this.T.process, this.T.limit];
    if (!(this.DBL[0] < this.DBL[1])) throw new Error('b4: process phải trước limit');
    this.ROWS = Array.from({ length: LEVELS + 1 }, (_, i) => { const n = 6 * 2 ** i; return [String(n), fix(`${n} * Math.sin(Math.PI / ${n})`, 4)]; });
    must('Math.abs(6 * Math.sin(Math.PI / 6) - 3) < 1e-12', true);
    must('384 * Math.sin(Math.PI / 384) < Math.PI', true);
    this.BOUNDS = `${fix('223 / 71', 4)} < π < ${fix('22 / 7', 4)}`;          // cận của Archimedes (b2) — "the digits"
    must('223 / 71 < Math.PI && Math.PI < 22 / 7', true);
  }
  level(t) { const [a, b] = this.DBL; return LEVELS * clamp((t - a) / (b - a)); }
  sfx() {
    const T = this.T;
    return [{ t: T.method, kind: 'pen' }, { t: T.process, kind: 'snap' }, { t: T.limit, kind: 'pen' },
      { t: T.straight, kind: 'tick' }, { t: T.corners, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 3, vy: 1.5 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.digits(g, t); this.figure(g, t); this.table(g, t); this.detail(g, t); this.price(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.9, this.FROM + 2.3), 'I', 'A LIMIT', 'polygons → circle');
  }
  digits(g, t) {                                       // "the real gift … isn't the digits": cận cũ bằng chì, góc trái trên
    const T = this.T;
    typed(g, this.BOUNDS, 160, 210, prog(t, T.gift - 0.2, T.gift + 0.8), `600 40px ${CG}`, C.leadT);
    note(g, 'the digits', 160, 250, prog(t, T.digits, T.digits + 0.5), { size: 20 });
  }
  figure(g, t) {
    const T = this.T;
    // chì dựng hình: vòng phác + chốt
    pivot(g, CX, CY, prog(t, this.FROM + 0.9, this.FROM + 1.5));
    arc(g, CX, CY, R, PI / 2, PI / 2 + 2 * PI, C.lead, 1.2, prog(t, this.FROM + 1.0, T.gift + 0.4), { dash: [5, 7] });
    // lục giác vẽ vào ở "method", rồi nhân đôi liên tục
    const s = this.level(t);
    const kHex = prog(t, T.method - 0.1, T.shows + 0.2);
    if (s <= 0) line(g, poly(CX, CY, R, 6), C.ink, 3, { k: kHex });
    else line(g, morph(CX, CY, R, Math.min(s, LEVELS - 1e-6)), C.ink, s > 4 ? 2.4 : 3);
    leader(g, [[CX - R * Math.cos(PI / 6), CY], [CX - R - 60, CY]], prog(t, T.shows, T.shows + 0.5));
    note(g, 'the method', CX - R - 72, CY + 8, prog(t, T.shows + 0.2, T.shows + 0.8), { align: 'right', color: C.ink, size: 20 });
    // n → ∞: vòng compa xanh quét lên đúng đa giác đã tròn
    compassCircle(g, CX, CY, R, { k: prog(t, T.limit - 0.1, T.limit + 1.1), a0: PI / 2 });
    // số cạnh hiện tại (chì, dưới hình) — tròn theo mức nguyên đang hướng tới
    const lv = Math.min(LEVELS, Math.ceil(s - 1e-6)), n = 6 * 2 ** lv;
    if (t > T.method) {
      const lab = t >= T.limit ? 'n → ∞' : `n = ${n}`;
      typed(g, lab, CX, CY + R + 80, prog(t, T.method, T.method + 0.4), `italic 600 54px ${CG}`, t >= T.limit ? C.blue : C.ink, { align: 'center' });
    }
  }
  table(g, t) {                                         // bảng mọc theo từng lần nhân đôi (giá trị tính trong code)
    const T = this.T, x = 1190, y = 250, s = this.level(t);
    note(g, 'sides', x, y, prog(t, T.method, T.method + 0.4), { size: 20 });
    note(g, 'perimeter ÷ diameter', x + 140, y, prog(t, T.method + 0.1, T.method + 0.9), { size: 20 });
    line(g, [[x, y + 14], [x + 520, y + 14]], C.lead, 1.2, { k: prog(t, T.method + 0.1, T.method + 0.6) });
    this.ROWS.forEach(([n, v], i) => {
      const a = i === 0 ? T.shows : this.DBL[0] + (this.DBL[1] - this.DBL[0]) * (i / LEVELS) - 0.1;
      const k = prog(t, a, a + 0.3), yy = y + 52 + i * 40;
      typed(g, n, x + 90, yy, k * 2, `500 24px ${MONO}`, C.ink, { align: 'right' });
      typed(g, v, x + 140, yy, k * 1.5 - 0.3, `500 24px ${MONO}`, C.ink);
      if (s > 0 && s < LEVELS && Math.floor(s) === i) { g.save(); g.fillStyle = C.blue; g.beginPath(); g.arc(x - 18, yy - 8, 5, 0, 7); g.fill(); g.restore(); }
    });
    const yy = y + 52 + this.ROWS.length * 40 + 16, k = prog(t, T.limit, T.limit + 0.6);
    line(g, [[x, yy - 32], [x + 520, yy - 32]], C.lead, 1.2, { k });
    typed(g, '∞', x + 90, yy + 8, k * 2, `600 46px ${CG}`, C.blue, { align: 'right' });
    typed(g, '→ π = ' + PI_DIGITS.slice(0, 7) + '…', x + 140, yy + 4, k * 1.4 - 0.3, `500 24px ${MONO}`, C.blue);
  }
  detail(g, t) {                                         // DETAIL A: thẳng (dây cung, góc) | cong (vành) — π ngồi trên ranh giới
    const T = this.T, bx = 1190, by = 690, bw = 560, bh = 240;
    const kf = prog(t, T.words - 0.2, T.words + 0.6);
    if (kf <= 0) return;
    // dấu A trên vòng chính + đường dẫn sang khung
    const ma = -0.35, mx = CX + R * Math.cos(ma), my = CY - R * Math.sin(ma);
    g.save(); g.strokeStyle = C.leadT; g.lineWidth = 1.4; g.beginPath(); g.arc(mx, my, 34 * outCubic(kf), 0, 7); g.stroke(); g.restore();
    line(g, [[mx + 34, my + 8], [bx, by + 30]], C.leadT, 1.2, { k: kf, dash: [4, 6] });
    line(g, [[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh], [bx, by]], C.ink, 2, { k: kf });
    note(g, 'detail a', bx, by + bh + 34, prog(t, T.words, T.words + 0.5), { size: 20 });
    // vành phóng to: tâm xa phía dưới, cung cắt ngang khung
    const Rb = 1300, ox = bx + bw / 2, oy = by + 120 + Rb, span = 0.21, mid = bx + bw / 2;
    const P = a => [ox + Rb * Math.sin(a), oy - Rb * Math.cos(a)];
    g.save(); g.beginPath(); g.rect(bx + 2, by + 2, bw - 4, bh - 4); g.clip();
    const kd = prog(t, T.words + 0.2, T.lives + 0.4);
    // trái: dây cung (đa giác) — thẳng, có góc
    const N = 5, ch = Array.from({ length: N + 1 }, (_, i) => P(-span + span * i / N));
    line(g, ch, C.ink, 3, { k: clamp(kd * 2) });
    if (kd >= 0.5) ch.forEach(([x, y]) => { g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 4.5, 0, 7); g.fill(); });
    // phải: vành tròn trơn (xanh)
    const cv = Array.from({ length: 61 }, (_, i) => P(span * i / 60));
    line(g, cv, C.blue, 4, { k: clamp(kd * 2 - 1) });
    g.restore();
    // ranh giới + π
    const [px, py] = P(0);
    line(g, [[mid, by + bh - 8], [mid, by + 14]], C.leadT, 1.4, { k: prog(t, T.border, T.border + 0.35), dash: [6, 6] });
    typed(g, 'π', px, py - 18, prog(t, T.border + 0.15, T.border + 0.35), `italic 700 72px ${CG}`, C.blue, { align: 'center' });
    note(g, 'straight', bx + 24, by + bh - 24, prog(t, T.straight - 0.1, T.straight + 0.3), { color: C.ink, size: 20 });
    note(g, 'curved', bx + bw - 24, by + bh - 24, prog(t, T.curved - 0.1, T.curved + 0.3), { color: C.blue, size: 20, align: 'right' });
    note(g, 'straight → curved', bx, by - 22, prog(t, T.straight, T.curved + 0.3), { color: C.leadT, size: 24 });
  }
  price(g, t) {                                          // "the price you pay": lục giác —(π)→ vòng trơn, góc trái dưới
    const T = this.T, y = 900, x0 = 260;
    line(g, poly(x0, y, 56, 6), C.ink, 3, { k: prog(t, T.corners - 0.1, T.corners + 0.5) });
    arrow(g, x0 + 80, y, x0 + 200, y, prog(t, T.price - 0.1, T.price + 0.4), { color: C.ink, w: 2.5 });
    note(g, 'the price', x0 + 140, y - 64, prog(t, T.price, T.price + 0.5), { align: 'center', size: 20 });
    typed(g, 'π', x0 + 140, y - 16, prog(t, T.pay, T.pay + 0.2), `italic 700 46px ${CG}`, C.blue, { align: 'center' });
    compassCircle(g, x0 + 280, y, 56, { k: prog(t, T.smooth - 0.5, T.smooth + 0.3), a0: PI / 2, w: 3.5 });
  }
}
