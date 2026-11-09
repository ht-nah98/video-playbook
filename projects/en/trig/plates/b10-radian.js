// b10 · "Measuring with the circle itself" (câu 61–66, ERA fair). Vòng chính diện = đường tròn đơn vị (cx 700, cy 540, R 290).
//  61 radians         vé RADIANS; cabin chạy tới góc 2 rad, cung góc chanh lớn dần
//  62 arc ÷ radius    cung mực (độ dài cung) trên vành; sợi dây đèn dài đúng một bán kính nằm trên nan, rồi UỐN lên vành (2 sợi phủ hết cung)
//  63 two pi          sợi 3–6 và mẩu 0,28 uốn tiếp quanh vành: 2π ≈ 6,28 bán kính; cung quét cả vòng
//  64 pi, pi over two cabin quay nửa vòng (180° = π) rồi một phần tư (90° = π/2)
//  65 distance        cabin chạy 0 → 2 trên vành; hai bảng bóng đèn ĐẾM CÙNG MỘT SỐ (góc rad | quãng đường, bán kính 1)
//  66 same number     hai bảng dừng ở cùng số, dấu "=" nối
// Mascot compass (chưa đo miệng → talk:false) góc dưới trái ~ câu 61–63.
import { W, H, C, AR, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, heroDot, ticket, secTag, figure,
  angleArc, line, text, rr, shade, bulbDigits, bulbWidth, SPIN, rimAt } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const CX = 700, CY = 540, R = 290, RX = 1460;
const ROW = [215, 345, 475, 605];

export default class Radian {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['compass'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b10');
    this.T = {
      radians: w(61, 'radians'), angle: w(61, 'angle'),
      arc: w(62, 'arc'), length: w(62, 'length'), divide: w(62, 'divide'), radius: w(62, 'radius'),
      circum: w(63, 'circumference'), two: w(63, 'two'), pi: w(63, 'pi'), full: w(63, 'full'), turn: w(63, 'turn'), radians63: w(63, 'radians'),
      half: w(64, 'half'), pi64: w(64, 'pi'), quarter: w(64, 'quarter'), over: w(64, 'over'),
      unit: w(65, 'unit'), rad65: w(65, 'radius'), angle65: w(65, 'angle'), dist: w(65, 'distance'), travelled: w(65, 'travelled'), circle65: w(65, 'circle'),
      same: w(66, 'same'), number: w(66, 'number'),
    };
    this.START = L(61).start;
    this.FROM = Math.max(this.START - 1.2, L(60).end + 0.5);
    this.END = L(66).end;
    const T = this.T;
    this.THF = must('2 * 1', 2);                                   // góc demo = cung / bán kính = 2 · 1 / 1
    this.PARTIAL = must('Math.round(2 * Math.PI * 100) / 100 - 6', 0.28);
    this.TAU2 = String(must('Math.round(2 * Math.PI * 100) / 100', 6.28));
    this.TP = [T.radius + 0.28, T.radius + 0.75, T.two, T.two + 0.22, T.two + 0.44, T.two + 0.66, T.two + 0.9];   // lúc mỗi sợi bắt đầu uốn
    this.PIN = T.radius - 0.05;                                      // sợi đầu hiện thẳng trên nan
    this.UN = T.half - 0.1;                                          // các sợi gom về trục
    // θ chưa gập vòng, theo mốc
    this.K = [
      [this.FROM, 0], [T.angle, SPIN * (T.angle - this.FROM)], [T.angle + 1.3, this.THF], [T.full, this.THF], [T.full + 1.3, TAU],
      [T.half, TAU], [T.half + 1.4, TAU + Math.PI], [T.quarter, TAU + Math.PI], [T.quarter + 0.8, TAU + Math.PI / 2],
      [T.unit, TAU + Math.PI / 2], [T.unit + 0.9, TAU], [T.angle65, TAU], [T.circle65 + 0.4, TAU + this.THF],
    ];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.angle + 0.1, 'tick'), c(T.length + 0.1, 'card'), c(this.TP[0], 'tick'), c(T.circum + 0.7, 'card'), c(T.full + 0.1, 'tick'),
      c(T.pi64 - 0.1, 'card'), c(T.angle65 + 0.05, 'tick'), c(T.travelled + 0.15, 'tick'), c(T.same + 0.4, 'zap')];
  }
  theta(t) {
    const K = this.K;
    if (t <= K[0][0]) return K[0][1];
    for (let i = 1; i < K.length; i++) if (t < K[i][0]) {
      const [t0, v0] = K[i - 1], [t1, v1] = K[i], u = prog(t, t0, t1);
      return lerp(v0, v1, i === K.length - 1 || (i === 11) ? u : smooth(u));
    }
    return K[K.length - 1][1];
  }
  // sợi dây đèn dài một bán kính: thẳng trên nan → uốn lên vành (e: 0 thẳng, 1 nằm trên vành)
  piece(g, i, e, frac, shrink, t) {
    const a0 = i, n = Math.max(3, Math.round(16 * frac)), Rr = (R + 34) * (1 - shrink) + 20 * shrink;
    const P = s => {
      const sx = CX + s * R, sy = CY + 30, a = a0 + s, ax = CX + Rr * Math.cos(a), ay = CY - Rr * Math.sin(a);
      return [lerp(sx, ax, e), lerp(sy, ay, e)];
    };
    g.save(); g.lineCap = 'round'; g.strokeStyle = C.rope; g.lineWidth = 3; g.beginPath();
    for (let j = 0; j <= 24; j++) { const [x, y] = P(frac * j / 24); j ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    for (let j = 0; j <= n; j++) { const [x, y] = P(frac * j / n);
      g.shadowColor = 'rgba(255,190,70,0.9)'; g.shadowBlur = 10; g.fillStyle = (i + j) % 2 ? '#FFD36B' : '#F7B48A'; g.beginPath(); g.arc(x, y, 7, 0, TAU); g.fill(); }
    g.restore();
    return P(frac / 2);
  }
  render(g, t) {
    const T = this.T, th = this.theta(t);
    ground(g, 'fair', { ground: false });
    secTag(g, 'Measuring with the circle itself', { k: prog(t, this.START, this.START + 0.4), t });
    // góc đang đo từ trục +x: ở câu 63 cung đầy vòng, thu về 0 trước khi nửa vòng bắt đầu
    const A = t < T.half - 0.4 ? Math.min(th, TAU) : t < T.half + 0.15 ? TAU * (1 - smooth(prog(t, T.half - 0.4, T.half + 0.15))) : th - TAU;
    const Wh = wheel(g, CX, CY, R, { theta: th, hero: true, axes: true, groundY: 1000, bulbs: a => 0.5 + 0.5 * Math.sin(a * 6 - t * 4) });
    // cung mực = độ dài cung trên vành
    const ka = prog(t, T.arc, T.arc + 0.5);
    const Aa = Math.max(0, Math.min(A, TAU));
    if (Aa > 0.002) angleArc(g, CX, CY, 78, Aa * 0.9995);
    if (ka > 0 && Aa > 0.002) { g.save(); g.strokeStyle = C.ink; g.globalAlpha = 0.85 * ka; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, R + 1, 0, -Aa * 0.9995, true); g.stroke(); g.restore(); }
    // bán kính 1 (câu 65)
    const kr = prog(t, T.rad65 - 0.1, T.rad65 + 0.3);
    if (kr > 0) { line(g, CX, CY, CX + R * kr, CY, C.ink, 7); text(g, '1', CX + R * 0.5, CY - 34, { font: `800 44px ${AR}`, color: C.ink, align: 'center', k: kr }); }
    // quãng đường trên vành (câu 65): vệt ink + vệt chanh
    heroDot(g, Wh.P[0], Wh.P[1]);

    // ── các sợi dây đèn (câu 62–63) ──
    const shrink = inC(prog(t, this.UN, this.UN + 0.5));
    if (shrink < 1) {
      const kin = prog(t, this.PIN, this.PIN + 0.25);
      if (kin > 0 && t < this.TP[0]) this.piece(g, 0, 0, 1, 0, t);
      for (let i = 0; i < 7; i++) {
        const e = outCubic(prog(t, this.TP[i], this.TP[i] + 0.55)); if (t < this.TP[i] || (i === 0 && false)) continue;
        const frac = i === 6 ? this.PARTIAL : 1, mid = this.piece(g, i, e, frac, shrink, t);
        if (i < 6 && e > 0.95 && shrink < 0.2) text(g, String(i + 1), CX + (R + 82) * Math.cos(i + 0.5), CY - (R + 82) * Math.sin(i + 0.5), { font: `800 34px ${AR}`, color: C.ink, align: 'center', base: 'middle' });
      }
    }

    // ── vé cột phải ──
    const slide = (a, b) => 900 * inC(prog(t, b, b + 0.4));
    const row = (s, y, a, b, o) => { const k = prog(t, a, a + 0.35); if (k <= 0 || t > b + 0.45) return; g.save(); g.translate(slide(a, b), 0); ticket(g, s, RX, y, { size: 46, k, ...o }); g.restore(); };
    row('RADIANS', ROW[0], T.radians, T.radius - 0.1, { color: C.angInk, edge: C.ang });
    if (t < T.divide) row('ARC LENGTH', ROW[1], T.length, T.divide, { color: C.ink, edge: C.ink });
    else if (t < T.radius + 1.0) row('ARC ÷ RADIUS', ROW[1], T.divide, T.circum - 0.3, { color: C.ink, edge: C.ink });
    else row(`ARC ÷ RADIUS = ${this.THF}`, ROW[1], T.radius + 1.0, T.circum - 0.3, { color: C.ink, edge: C.ink });
    row('CIRCUMFERENCE = 2π × RADIUS', ROW[1], T.circum + 0.2, T.half - 0.3, { color: C.ink, edge: C.ink });
    row(`2π ≈ ${this.TAU2} RADII`, ROW[2], T.two + 0.95, T.half - 0.3, { color: C.ink, edge: C.ink });
    row('FULL TURN = 2π RADIANS', ROW[3], T.full + 0.25, T.half - 0.3, { color: C.angInk, edge: C.ang });
    row('180° = π', ROW[1], T.pi64 - 0.25, T.unit - 0.2, { size: 52, color: C.angInk, edge: C.ang });
    row('90° = π/2', ROW[2], T.over - 0.3, T.unit - 0.2, { size: 52, color: C.angInk, edge: C.ang });
    row('RADIUS = 1', ROW[0], T.rad65, 1e9, { color: C.ink, edge: C.ink });

    // ── hai bảng bóng đèn đếm cùng một số (câu 65–66) ──
    const val = clamp(th - TAU, 0, this.THF);
    const showP = (label, y0, a, edge, ink) => {
      const k = prog(t, a, a + 0.4); if (k <= 0) return;
      const s = val.toFixed(2), p = 14, bw = bulbWidth(s, p), pw = bw + 48, ph = 7 * p + 36;
      g.save(); g.translate(0, 0);
      ticket(g, label, RX, y0, { size: 36, color: ink, edge, k });
      const x0 = RX - pw / 2, yy = y0 + 40; g.save(); g.globalAlpha = k; g.fillStyle = '#1F2A44'; g.fill(rr(x0, yy, pw, ph, 14)); g.restore();
      bulbDigits(g, s, x0 + 24, yy + 18, p, { k });
      g.restore();
    };
    showP('ANGLE IN RADIANS', 345, T.angle65, C.ang, C.angInk);
    showP('DISTANCE ALONG THE CIRCLE', 620, T.dist, C.ink, C.ink);
    const ke = prog(t, T.same - 0.1, T.same + 0.35);
    if (ke > 0) { text(g, '=', RX, 575, { font: `900 84px ${AR}`, color: C.ink, align: 'center', base: 'middle', k: ke });
      ticket(g, 'THE SAME NUMBER', RX, 880, { size: 52, color: C.ink, edge: C.ang, k: ke }); }

    // mascot compass (nghe, không nói)
    const fk = Math.min(prog(t, T.angle + 0.4, T.angle + 1.0), 1 - prog(t, T.circum + 1.2, T.circum + 1.8));
    if (fk > 0) figure(g, 'compass', 170, H, 262, fk, { t, talk: false });
  }
}
