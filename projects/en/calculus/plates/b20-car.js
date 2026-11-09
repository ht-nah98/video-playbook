// b20 · The car, again (câu p2 77–79) — ERA field. Bánh xe đo vẽ ĐÚNG như b13: wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, dist, speed, odo }).
// câu 77: chiếc xe chạy vào đứng lại ("your car knows this too").   câu 78: bánh xe đo trượt vào; "speedometer" thẻ + đồng hồ tốc độ
// (kim đỏ = đạo hàm), "derivative" thẻ đỏ; "odometer … adds the speed up" công-tơ-mét lăn số (reel ×2), "an integral" thẻ nâu.
// câu 79: ảnh Newton + Leibniz kẹp hai bên; "fundamental theorem of calculus" thẻ lớn hai dòng (impact một lần).
import { H, W, C, AR, clamp, lerp, hash, prog, lookup, must, outCubic, outBack, drop, ground, card, text, arrow, line, rr, shadowRR, secTag, figure,
  photo, photoImages, wheel, WHEEL, TAU } from '../kit.js';

const GY = 930;   // mặt đất của bánh xe đo (WHEEL.y)
/** Dải đồng phẳng phía trước (mặt đất bánh xe đo lăn trên đó); off: cỏ cuộn theo quãng đã lăn. rise 0 → 1. */
function flatField(g, t, off, rise = 1) {
  const dy = (1 - outCubic(clamp(rise))) * 300; if (rise <= 0) return;
  g.save(); g.translate(0, dy);
  g.fillStyle = C.face; g.fillRect(-10, GY, W + 20, H - GY + 20);
  const lg = g.createLinearGradient(0, GY, 0, H); lg.addColorStop(0, 'rgba(255,255,230,0.25)'); lg.addColorStop(1, 'rgba(40,80,30,0.2)'); g.fillStyle = lg; g.fillRect(-10, GY, W + 20, H - GY + 20);
  g.strokeStyle = 'rgba(62,122,58,0.26)'; g.lineWidth = 2; for (let j = 1; j <= 3; j++) line(g, -10, GY + j * 38, W + 10, GY + j * 38, 'rgba(62,122,58,0.26)', 2, 'butt');
  line(g, -10, GY, W + 10, GY, C.curve, 8, 'butt');
  g.strokeStyle = C.curve; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let i = 0; i < 90; i++) { const x = ((hash(i * 2.3) * (W + 400) - off) % (W + 400) + (W + 400)) % (W + 400) - 200, y = GY + 6 + hash(i * 5.7) * (H - GY - 12), L = 8 + hash(i * 3.1) * 10, s = 3 * Math.sin((t + i) * 1.5);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x - 3 + s, y - L); g.moveTo(x, y); g.lineTo(x + 4 + s, y - L * 0.8); g.stroke(); }
  g.restore();
}
/** Xe nhỏ (thân xám xanh, cửa kính trời, hai bánh quay theo quãng) đứng trên mặt đất GY tại cx. */
function car(g, cx, rot, sc = 1) {
  g.save(); g.translate(cx, GY - 8); g.scale(sc, sc);
  g.fillStyle = 'rgba(30,45,30,0.25)'; g.beginPath(); g.ellipse(6, 10, 118, 9, 0, 0, TAU); g.fill();
  g.fillStyle = '#4E6A7A'; g.fill(rr(-112, -58, 224, 40, 10)); g.fillStyle = '#5E7C8E'; g.beginPath(); g.moveTo(-64, -58); g.lineTo(-40, -98); g.lineTo(52, -98); g.lineTo(80, -58); g.closePath(); g.fill();
  g.fillStyle = '#DCEAF1'; g.beginPath(); g.moveTo(-52, -62); g.lineTo(-34, -92); g.lineTo(-2, -92); g.lineTo(-2, -62); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(8, -62); g.lineTo(8, -92); g.lineTo(46, -92); g.lineTo(68, -62); g.closePath(); g.fill();
  g.fillStyle = C.paper; g.fillRect(96, -48, 14, 10);
  for (const wx of [-62, 66]) { g.save(); g.translate(wx, -14); g.rotate(rot); g.fillStyle = '#2B2622'; g.beginPath(); g.arc(0, 0, 25, 0, TAU); g.fill(); g.fillStyle = '#C9CFD3'; g.beginPath(); g.arc(0, 0, 12, 0, TAU); g.fill();
    g.strokeStyle = '#2B2622'; g.lineWidth = 3; for (let i = 0; i < 4; i++) { const a = i * TAU / 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * 12, Math.sin(a) * 12); g.stroke(); } g.restore(); }
  g.restore();
}

export default class Car {
  static ERA = 'field';
  static IMAGES = photoImages('newton', 'leibniz');
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b20');
    this.T = {
      car: w(77, 'car'), knows: w(77, 'knows'), too: w(77, 'too'),
      speedo: w(78, 'speedometer'), deriv: w(78, 'derivative'), odo: w(78, 'odometer'), adds: w(78, 'adds'), moment1: w(78, 'moment', 1), moment2: w(78, 'moment', 2),
      into: w(78, 'into'), integral: w(78, 'integral'),
      newton: w(79, 'newton'), leibniz: w(79, 'leibniz'), conn: w(79, 'connection'), fund: w(79, 'fundamental'), theorem: w(79, 'theorem'), calculus: w(79, 'calculus'),
    };
    this.START = L(77).start; this.END = L(79).end;
    this.FROM = Math.max(this.START - 1.2, tl.lines[76].end + 0.5);
    must('0.35 + 0.25 <= 1', true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.speedo, 'pen'), c(T.adds, 'reel'), c(T.moment2, 'reel'), c(T.integral, 'card'), c(T.newton, 'page'), c(T.fund, 'impact')];
  }
  // tốc độ 0…1 và quãng lăn (px) của bánh xe đo: v(τ) = 0.35 + 0.25·sin(0.9τ); dist = ∫ v · 300
  speed(t) { const tau = Math.max(0, t - this.T.speedo); return 0.35 + 0.25 * Math.sin(0.9 * tau); }
  dist(t) { const tau = Math.max(0, t - this.T.speedo); return 300 * (0.35 * tau + 0.25 * (1 - Math.cos(0.9 * tau)) / 0.9); }

  render(g, t) {
    const T = this.T, S = this.START, FROM = this.FROM;
    const dist = this.dist(t);
    ground(g, 'field', t, { pan: 1500 });
    flatField(g, t, dist * 0.8 + (t - FROM) * 20, prog(t, FROM + 0.2, FROM + 0.9));
    secTag(g, 'The car, again', { k: prog(t, S + 0.2, S + 0.6), t });

    // ── câu 77: chiếc xe chạy vào, đứng lại; câu 78: chạy đi ──
    const kIn = outCubic(prog(t, FROM + 0.05, FROM + 1.2)), kOut = prog(t, T.speedo - 0.9, T.speedo + 0.2);
    const cx = lerp(-400, 760, kIn) + (-1) * outCubic(kOut) * 1300;
    if (kOut < 1) car(g, cx, (cx + 400) / 25, 2.4);

    // ── câu 78: bánh xe đo + đồng hồ tốc độ + công-tơ-mét ──
    const kw = prog(t, T.speedo - 0.2, T.speedo + 0.5);
    let hw = null;
    if (kw > 0) hw = wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, dist, k: kw, speed: this.speed(t), odo: dist / 90 });
    // thẻ bên đồng hồ tốc độ
    const lf = prog(t, T.odo - 0.45, T.odo + 0.05);
    card(g, 'SPEEDOMETER', 690, 413, { size: 30, mono: false, wt: 800, edge: C.pole, k: prog(t, T.speedo, T.speedo + 0.3), lift: lf });
    arrow(g, 840, 413, 884, 413, prog(t, T.speedo + 0.15, T.speedo + 0.45) * (1 - lf), { w: 5 });
    card(g, 'DERIVATIVE', 690, 510, { size: 30, mono: false, wt: 800, edge: C.pole, k: prog(t, T.deriv, T.deriv + 0.3), lift: lf });
    // thẻ bên công-tơ-mét
    const lo = prog(t, T.newton - 0.4, T.newton);
    card(g, 'ODOMETER', 1560, 600, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.odo, T.odo + 0.3), lift: lo });
    arrow(g, 1440, 612, 1200, 688, prog(t, T.odo + 0.15, T.odo + 0.5) * (1 - lo), { w: 5 });
    card(g, 'INTEGRAL', 1560, 700, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.integral, T.integral + 0.3), lift: lo });

    // ── câu 79: Newton + Leibniz, thẻ định lý ──
    const kn = prog(t, T.newton, T.newton + 0.6), kl = prog(t, T.leibniz, T.leibniz + 0.6);
    if (kn > 0) photo(g, 'newton', 175, 180, 350, 460, { k: kn, from: 'left', rot: -0.025 });
    if (kl > 0) photo(g, 'leibniz', 1325, 180, 350, 460, { k: kl, from: 'right', rot: 0.025 });
    card(g, 'FUNDAMENTAL THEOREM', 925, 180, { size: 48, mono: false, wt: 900, edge: C.pole, k: prog(t, T.fund, T.fund + 0.3), rot: -0.012 });
    card(g, 'OF CALCULUS', 925, 266, { size: 56, mono: false, wt: 900, edge: C.pole, k: prog(t, T.calculus - 0.1, T.calculus + 0.3), rot: 0.012 });

    // ── mascot: calculator ──
    const kM = prog(t, T.too, T.too + 0.5), kMo = prog(t, T.integral + 0.4, T.integral + 0.9);
    if (kM > 0 && kMo < 1) figure(g, 'calculator', 205, H, 262, Math.min(kM, 1 - kMo), { t });
  }
}
