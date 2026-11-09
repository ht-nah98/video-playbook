// b22 · Next time (câu p2 83–85, outro) — ERA field. Trang p2 có TAIL 2.0 → khung cuối = L(85).end + 2.0.
// câu 83: người đi bộ LEO dốc chén (VIEWS.bowl), sào đỏ (dốc tại chỗ chân đứng) lướt theo; "derivative" thẻ đỏ; "legs" chân phát sáng đỏ ấm.
// câu 84: chén chìm xuống, đồng phẳng + bánh xe đo trượt vào: "speedometer" thẻ + "odometer" thẻ; mũi tên navy (mắt đảo) từ đồng hồ tốc độ
//   sang công-tơ-mét; "both sides" hai thẻ DERIVATIVE / INTEGRAL.   câu 85: bánh xe đo trượt đi, BIỂN "99% from scratch" + SUBSCRIBE cắm xuống
//   từ "thanks" và ĐỨNG YÊN (toạ độ màn hình) tới hết (≥ 4 s: ~8 s); mascot pose-wave.
import { H, W, C, AR, MO, clamp, lerp, hash, prog, lookup, must, outCubic, outBack, drop, ground, hill, rod, hiker, glow, card, text, arrow, line, rr,
  shadowRR, secTag, figure, wheel, WHEEL, VIEWS, measure, TAU, sq } from '../kit.js';

const V = VIEWS.bowl, GY = WHEEL.y;
function flatField(g, t, off, rise = 1) {
  const dy = (1 - outCubic(clamp(rise))) * 300; if (rise <= 0) return;
  g.save(); g.translate(0, dy);
  g.fillStyle = C.face; g.fillRect(-10, GY, W + 20, H - GY + 20);
  const lg = g.createLinearGradient(0, GY, 0, H); lg.addColorStop(0, 'rgba(255,255,230,0.25)'); lg.addColorStop(1, 'rgba(40,80,30,0.2)'); g.fillStyle = lg; g.fillRect(-10, GY, W + 20, H - GY + 20);
  for (let j = 1; j <= 3; j++) line(g, -10, GY + j * 38, W + 10, GY + j * 38, 'rgba(62,122,58,0.26)', 2, 'butt');
  line(g, -10, GY, W + 10, GY, C.curve, 8, 'butt');
  g.strokeStyle = C.curve; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let i = 0; i < 90; i++) { const x = ((hash(i * 2.3) * (W + 400) - off) % (W + 400) + (W + 400)) % (W + 400) - 200, y = GY + 6 + hash(i * 5.7) * (H - GY - 12), L = 8 + hash(i * 3.1) * 10, s = 3 * Math.sin((t + i) * 1.5);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x - 3 + s, y - L); g.moveTo(x, y); g.lineTo(x + 4 + s, y - L * 0.8); g.stroke(); }
  g.restore();
}
/** Biển tên kênh: bảng giấy viền sọc cọc tiêu trên hai cột gỗ cắm xuống đồng; toạ độ MÀN HÌNH, đứng yên sau khi cắm. */
function board(g, k, pulse = 0) {
  if (k <= 0) return;
  const cx = 960, py = 270, pw = 1000, ph = 400, e = drop(k), dy = -(1 - e) * 900;
  g.save(); g.translate(0, dy);
  for (const px of [cx - 400, cx + 400]) { shadowRR(g, px - 20, py + ph - 20, 40, GY - py - ph + 30, 6, { col: 'rgba(30,40,30,0.3)', blur: 8, ox: 6, oy: 4 });
    g.fillStyle = '#8A6A44'; g.fill(rr(px - 20, py + ph - 20, 40, GY - py - ph + 30, 6)); g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(px - 20, py + ph - 20, 8, GY - py - ph + 30); }
  shadowRR(g, cx - pw / 2, py, pw, ph, 18, { col: 'rgba(30,40,30,0.32)', blur: 20, ox: 10, oy: 14 });
  g.fillStyle = C.paper; g.fill(rr(cx - pw / 2, py, pw, ph, 18));
  g.save(); g.clip(rr(cx - pw / 2, py, pw, ph, 18)); const n = 40, sw = pw / n;                    // viền sọc cọc tiêu
  for (let i = 0; i < n; i++) { g.fillStyle = i % 2 ? C.white : C.pole; g.fillRect(cx - pw / 2 + i * sw, py, sw + 0.5, 16); g.fillRect(cx - pw / 2 + i * sw, py + ph - 16, sw + 0.5, 16); }
  g.restore();
  let px = 124; while (measure(g, '99% from scratch', `900 ${px}px ${AR}`) > pw - 120) px -= 4;
  text(g, '99% from scratch', cx, py + 160, { font: `900 ${px}px ${AR}`, align: 'center', base: 'middle' });
  const s = 1 + 0.07 * Math.sin(Math.PI * clamp(pulse)); g.save(); g.translate(cx, py + 290); g.scale(s, s);
  shadowRR(g, -190, -44, 380, 88, 44, { col: 'rgba(60,20,10,0.3)', blur: 8, ox: 3, oy: 5 });
  g.fillStyle = C.poleInk; g.fill(rr(-190, -44, 380, 88, 44));
  text(g, 'SUBSCRIBE', 0, 3, { font: `800 46px ${AR}`, color: C.white, align: 'center', base: 'middle' }); g.restore();
  g.restore();
}

export default class NextTime {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b22');
    this.T = {
      walking: w(83, 'walking'), up: w(83, 'up'), hill: w(83, 'hill'), harder: w(83, 'harder'), deriv: w(83, 'derivative'), legs: w(83, 'legs'),
      drift: w(84, 'drift'), speedo: w(84, 'speedometer'), to: w(84, 'to'), odo: w(84, 'odometer'), both: w(84, 'both'), sides: w(84, 'sides'), once: w(84, 'once'),
      thanks: w(85, 'thanks'), like: w(85, 'like'), subscribe: w(85, 'subscribe'), see: w(85, 'see'),
    };
    this.START = L(83).start; this.END = L(85).end;
    this.FROM = Math.max(this.START - 1.2, tl.lines[82].end + 0.5);
    if (this.END + 2.0 - this.T.thanks < 7) throw new Error('b22: biển đứng yên < 4 s');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.hill, 'tick'), c(T.deriv, 'pen'), c(T.legs, 'tick'), c(T.speedo, 'card'), c(T.odo, 'reel'), c(T.thanks + 0.3, 'wood'), c(T.subscribe, 'pop')];
  }
  tau(t) { return Math.max(0, t - (this.T.drift - 0.4)); }
  speed(t) { return 0.35 + 0.25 * Math.sin(0.9 * this.tau(t)); }
  dist(t) { const u = this.tau(t); return 300 * (0.35 * u + 0.25 * (1 - Math.cos(0.9 * u)) / 0.9); }

  render(g, t) {
    const T = this.T, S = this.START, FROM = this.FROM;
    const dist = this.dist(t), sink = prog(t, T.drift - 0.3, T.drift + 0.5), exit = prog(t, T.thanks - 0.5, T.thanks + 0.3);
    ground(g, 'field', t, { pan: 400 });

    // ── câu 83: người đi bộ leo dốc ──
    if (sink < 1) {
      hill(g, V, { a: -3, b: 3.6, t, rise: 1 - sink });
      const u = lerp(0.15, 1.55, outCubic(prog(t, FROM + 0.3, T.legs + 0.2))), X = V.X(u), Y = V.Y(sq(u));
      const kr = prog(t, T.harder, T.harder + 0.4);
      g.save(); g.translate(0, sink * 700);
      if (kr > 0) rod(g, V, u, { d0: -0.4, d1: 0.4, k: kr, hover: 80 });
      const glowK = prog(t, T.legs - 0.1, T.legs + 0.3) * (1 - prog(t, T.legs + 0.9, T.legs + 1.4));
      hiker(g, X, Y - 6, 1.45, { step: t * 1.8 });
      if (glowK > 0) glow(g, X - 2, Y - 36, 70, '255,150,70', 0.8 * glowK);
      g.restore();
      card(g, 'DERIVATIVE', 640, 300, { size: 48, mono: false, wt: 900, edge: C.pole, k: prog(t, T.deriv, T.deriv + 0.3), lift: prog(t, T.legs + 1.2, T.legs + 1.7), rot: -0.012 });
    }

    // ── câu 84: đồng phẳng + bánh xe đo ──
    const kf = prog(t, T.drift - 0.3, T.drift + 0.5);
    flatField(g, t, dist * 0.8, kf);
    const kw = prog(t, T.drift - 0.1, T.drift + 0.6) * (1 - exit);
    if (kw > 0) {
      g.save(); g.translate(outCubic(exit) * 1100, 0);
      wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, dist, k: kw, speed: this.speed(t), odo: dist / 90 });
      const lf = 0;
      card(g, 'SPEEDOMETER', 690, 413, { size: 30, mono: false, wt: 800, edge: C.pole, k: prog(t, T.speedo, T.speedo + 0.3) });
      card(g, 'ODOMETER', 1560, 600, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.odo, T.odo + 0.3) });
      const ka = prog(t, T.to, T.odo);
      if (ka > 0) arrow(g, 985, 470, 1100, 652, ka, { w: 6, head: 20 });
      card(g, 'DERIVATIVE', 690, 520, { size: 30, mono: false, wt: 800, edge: C.pole, k: prog(t, T.both, T.both + 0.3) });
      card(g, 'INTEGRAL', 1560, 700, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.sides, T.sides + 0.3) });
      g.restore();
    }

    secTag(g, 'Next time', { k: prog(t, S + 0.3, S + 0.7), lift: prog(t, T.thanks - 0.3, T.thanks + 0.2), t });
    // ── câu 85: biển tên kênh + mascot vẫy ──
    board(g, prog(t, T.thanks + 0.3, T.thanks + 1.0), prog(t, T.subscribe - 0.05, T.subscribe + 0.4));
    const kM = prog(t, T.thanks + 0.4, T.thanks + 0.9);
    if (kM > 0) figure(g, 'wave', 205, H, 262, kM, { t });
  }
}
