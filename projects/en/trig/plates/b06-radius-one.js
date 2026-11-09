// b06 · ACT FOUR "The unit circle" · A circle of radius one (p2 câu 40–44) — DNA ferris, ERA fair.
// Vòng đu quay chính diện = đường tròn đơn vị, tâm (700, 540), R = 290 (hình học chung b06–b08).
//  40 vòng mờ sáng lên, nét navy vẽ quanh vành; nan bán kính 1 ("1"); trục x/y hiện ở "axes"; vé UNIT CIRCLE
//  41 cabin hồng = điểm; mũi tên chanh dọc trục phải; cung góc chanh vẽ tới 40°; mũi tên cong NGƯỢC chiều kim đồng hồ
//  42 vạch dóng xuống trục + thanh bạc hà (x), vé "x = cos θ" in dần
//  43 thanh hồng (y), vé "y = sin θ" in dần
//  44 cabin quay một vòng: nửa đầu nhấn x (trái ↔ phải), nửa sau nhấn y (cao ↔ thấp), mũi tên hai đầu dọc trục
// Mascot pointer (ACT FOUR) góc dưới trái, 206.4 → 213.8.
import { W, H, C, AR, CG, TAU, D2R, clamp, prog, lookup, outCubic, outBack, smooth, ground, wheel, heroDot, angleArc, ticket, secTag, actTitle,
  line, rr, shade, text, measure, fits, figure, SPIN } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const inC = u => u * u * u;
const CX = 700, CY = 540, R = 290, TH = 40 * D2R;

/** Vé nhiều đoạn chữ (mỗi đoạn màu / cỡ / tiến độ in riêng). */
function plate(g, runs, cx, cy, { size = 44, k = 1, edge = C.ink } = {}) {
  const f = r => r.font || `800 ${size}px ${AR}`;
  const tw = runs.reduce((a, r) => a + measure(g, r.s, f(r)), 0), w = tw + 60, h = Math.round(size * 1.6);
  const box = { x: cx - w / 2, y: cy - h / 2, w, h };
  if (k <= 0) return box;
  const e = outBack(clamp(k), 2.2);
  g.save(); g.translate(cx, cy); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.fill(rr(-w / 2, -h / 2, w, h, 14)); });
  g.fillStyle = edge; g.fillRect(-w / 2 + 12, -h / 2 + 8, 5, h - 16); g.fillRect(w / 2 - 17, -h / 2 + 8, 5, h - 16);
  let x = -tw / 2; for (const r of runs) x += text(g, r.s, x, 1, { font: f(r), color: r.col || C.ink, base: 'middle', k: r.k ?? 1 });
  g.restore(); return box;
}
function arrow(g, x0, y0, x1, y1, col, w, both = false, alpha = 1) {
  g.save(); g.globalAlpha *= alpha; line(g, x0, y0, x1, y1, col, w);
  const a = Math.atan2(y1 - y0, x1 - x0), head = (x, y, ang) => { g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.lineTo(-26, -15); g.lineTo(-26, 15); g.closePath(); g.fill(); g.restore(); };
  head(x1, y1, a); if (both) head(x0, y0, a + Math.PI); g.restore();
}

export default class RadiusOne {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b06');
    this.T = {
      circle: w(40, 'circle'), radius: w(40, 'radius'), one: w(40, 'one'), axes: w(40, 'axes'), cross: w(40, 'cross'), unit: w(40, 'unit'),
      l41: L(41).start, point: w(41, 'point'), angle: w(41, 'angle'), pointing: w(41, 'pointing'), turning: w(41, 'turning'), ccw: w(41, 'counter-clockwise'),
      l42: L(42).start, horizontal: w(42, 'horizontal'), x42: w(42, 'x'), cosine42: w(42, 'cosine'),
      l43: L(43).start, height: w(43, 'height'), y43: w(43, 'y'), sine43: w(43, 'sine'),
      l44: L(44).start, cosine44: w(44, 'cosine'), left44: w(44, 'left'), right44: w(44, 'right'), sine44: w(44, 'sine'), high44: w(44, 'high'), low44: w(44, 'low'),
      end: L(44).end,
    };
    this.START = L(40).start;
    this.FROM = Math.max(this.START - 2.6, L(39).end + 0.5);
    this.SW = [this.T.cosine44, this.T.end - 0.25];                  // vòng quay một vòng ở câu 44
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 1.5, 'flap'), c(T.radius + 0.05, 'card'), c(T.unit + 0.05, 'card'), c(T.angle + 0.1, 'tick'), c(T.ccw + 0.05, 'tick'),
      c(T.x42 + 0.05, 'card'), c(T.y43 + 0.05, 'card'), c(T.right44 + 0.1, 'tick')];
  }
  theta(t) {
    const T = this.T, base = u => 0.5 + SPIN * (u - this.START);
    if (t < T.angle) return base(t);
    const a = lerp(base(T.angle), TH, smooth(prog(t, T.angle, T.angle + 0.8)));
    if (t < this.SW[0]) return a + (t > T.angle + 0.8 ? 0.05 * Math.sin(1.3 * t) * smooth(prog(t, T.angle + 0.8, T.angle + 1.6)) * (1 - prog(t, this.SW[0] - 0.6, this.SW[0])) : 0);
    return TH + TAU * smooth(prog(t, this.SW[0], this.SW[1]));
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'fair', { ground: false });
    actTitle(g, t, this.START, 'ACT FOUR', 'The unit circle');
    secTag(g, 'A circle of radius one', { k: prog(t, this.START, this.START + 0.4), t });

    const th = this.theta(t), kw = smooth(prog(t, T.circle - 0.1, T.circle + 0.5)), hero = t >= T.point;
    const kAx = prog(t, T.axes - 0.05, T.axes + 0.45);
    const chase = a => 0.5 + 0.5 * Math.sin(a * 4 - 3 * t);
    const Wh = wheel(g, CX, CY, R, { theta: th, hero, alpha: lerp(0.3, 1, kw), axes: kAx > 0 ? kAx : false, groundY: 1000, bulbs: t < T.l41 ? (a => kw * chase(a)) : null });
    const [px, py] = Wh.P;
    // 40: nét navy vẽ quanh vành, nan bán kính 1, vòng nhấp ở tâm
    const kr = prog(t, T.circle, T.circle + 1.0);
    if (kr > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, R + 2, 0, -TAU * outCubic(kr), true); g.stroke(); g.restore(); }
    const ks = prog(t, T.radius - 0.05, T.radius + 0.35);
    if (ks > 0 && t < T.l41 + 0.1) { line(g, CX, CY, CX + R * outCubic(ks), CY, C.ink, 7); ticket(g, '1', CX + R / 2, CY - 56, { size: 44, k: prog(t, T.one - 0.05, T.one + 0.3) }); }
    const kc = prog(t, T.cross - 0.1, T.cross + 0.5);
    if (kc > 0 && kc < 1) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.globalAlpha = 1 - kc; g.beginPath(); g.arc(CX, CY, 20 + 60 * kc, 0, TAU); g.stroke(); g.restore(); }
    ticket(g, 'UNIT CIRCLE', 1330, 230, { size: 52, k: prog(t, T.unit, T.unit + 0.35) });

    // 41: điểm, trục phải, cung góc, mũi tên ngược chiều kim đồng hồ
    const sweepK = prog(t, this.SW[0] - 0.05, this.SW[0] + 0.3) * (1 - prog(t, this.SW[1] - 0.05, this.SW[1] + 0.25));   // 0 khi đang quay vòng
    if (hero) {
      const fl = Math.exp(-Math.max(0, t - T.point) * 3);
      g.save(); g.strokeStyle = `rgba(224,69,123,${0.8 * fl})`; g.lineWidth = 6; g.beginPath(); g.arc(px, py, 20 + 40 * (1 - fl), 0, TAU); g.stroke(); g.restore();
    }
    const kx = prog(t, T.pointing - 0.1, T.pointing + 0.4) * (1 - prog(t, T.l42, T.l42 + 0.5));
    if (kx > 0) arrow(g, CX, CY, CX + R + 70, CY, C.ang, 12, false, kx * (0.7 + 0.3 * Math.sin(8 * t)));
    const tha = t >= this.SW[1] ? th - TAU : th;
    const ka = prog(t, T.angle, T.angle + 0.5) * (1 - sweepK);
    if (ka > 0) { g.save(); g.globalAlpha *= ka; angleArc(g, CX, CY, 74, tha); g.restore(); ticket(g, 'θ', CX + 130 * Math.cos(tha / 2) + 18, CY - 130 * Math.sin(tha / 2) + 10, { size: 40, color: C.angInk, edge: C.ang, k: ka }); }
    const kt = prog(t, T.turning, T.turning + 0.9) * (1 - prog(t, T.l42, T.l42 + 0.4));
    if (kt > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 14]); g.beginPath(); g.arc(CX, CY, 150, 0, -TH * 1.0 * outCubic(kt), true); g.stroke(); g.restore();
      const e = -TH * outCubic(kt); g.save(); g.translate(CX + 150 * Math.cos(e), CY + 150 * Math.sin(e)); g.rotate(e - Math.PI / 2); g.fillStyle = C.ink; g.beginPath(); g.moveTo(0, 0); g.lineTo(-14, 26); g.lineTo(14, 26); g.closePath(); g.fill(); g.restore();
      const out = inC(prog(t, T.l42 - 0.3, T.l42 + 0.1)) * 700;
      g.save(); g.translate(out, 0); ticket(g, 'COUNTER-CLOCKWISE', 1330, 360, { size: 40, k: prog(t, T.ccw - 0.1, T.ccw + 0.3) }); g.restore();
    }

    // 42–44: vạch dóng, thanh bạc hà (x) và thanh hồng (y)
    const emphX = t >= this.SW[0] && t < T.sine44 ? 1 : 0, emphY = t >= T.sine44 ? 1 : 0;
    const kh = prog(t, T.horizontal - 0.2, T.horizontal + 0.5), ky = prog(t, T.height - 0.05, T.height + 0.4);
    if (kh > 0) {
      g.save(); g.setLineDash([10, 10]); g.strokeStyle = C.ink; g.lineWidth = 3; g.globalAlpha = 0.7 * kh; g.beginPath(); g.moveTo(px, py); g.lineTo(px, CY); g.stroke(); g.restore();
      line(g, CX, CY, CX + (px - CX) * outCubic(kh), CY, C.cos, emphX ? 18 : 12);
    }
    if (ky > 0) line(g, px, CY, px, CY + (py - CY) * outCubic(ky), C.sin, emphY ? 18 : 12);
    if (hero) heroDot(g, px, py);
    // 44: mũi tên hai đầu dọc trục
    const kl = prog(t, T.left44 - 0.1, T.right44 + 0.3) * (1 - prog(t, T.sine44 - 0.05, T.sine44 + 0.3)), kb = prog(t, T.high44 - 0.4, T.low44 + 0.3);
    if (kl > 0) arrow(g, CX - R - 40, CY, CX + R + 40, CY, C.cos, 10, true, 0.55 * kl);
    if (kb > 0) arrow(g, CX, CY + R + 40, CX, CY - R - 40, C.sin, 10, true, 0.55 * kb);

    // vé phương trình
    const vx = { font: `italic 600 60px ${CG}` };
    plate(g, [{ s: 'x', ...vx, col: C.cosInk }, { s: ' = ', col: C.ink, k: prog(t, T.x42 + 0.2, T.x42 + 0.5) }, { s: 'cos θ', col: C.cosInk, k: prog(t, T.cosine42, T.cosine42 + 0.6) }], 1330, 360, { size: 52, edge: C.cos, k: prog(t, T.x42 - 0.1, T.x42 + 0.25) });
    plate(g, [{ s: 'y', ...vx, col: C.sinInk }, { s: ' = ', col: C.ink, k: prog(t, T.y43 + 0.2, T.y43 + 0.5) }, { s: 'sin θ', col: C.sinInk, k: prog(t, T.sine43, T.sine43 + 0.5) }], 1330, 510, { size: 52, edge: C.sin, k: prog(t, T.y43 - 0.1, T.y43 + 0.25) });

    // mascot pointer
    const mk = Math.min(prog(t, T.l41 - 0.2, T.l41 + 0.4), 1 - prog(t, T.l42 + 0.9, T.l42 + 1.5));
    figure(g, 'pointer', 200, H, 270, mk, { t });
  }
}
