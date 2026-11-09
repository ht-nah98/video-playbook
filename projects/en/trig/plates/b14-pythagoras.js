// b14 · ACT SEVEN — Sine squared plus cosine squared (câu 83–88). Vòng đu quay = đường tròn đơn vị; nan hoa dài 1 + chân bạc hà (cos)
// + chân hồng (sin) = tam giác Pythagoras → x² + y² = 1 → thay x = cos, y = sin → sin²θ + cos²θ = 1.
//  83 chồng công thức "phải học thuộc" bên phải (mascot nhún vai), rồi cả chồng bị hút vào vòng ("fall out of the circle")
//  84 công thức nổi tiếng hiện trên tấm trắng (hồng sin, bạc hà cos)   85 mọi điểm trên vành cách tâm 1 (vành sáng từng điểm, nan navy)
//  86 vòng dừng ở một góc, tam giác lộ ra, x² + y² = 1 viết dần   87 x → cos θ, y → sin θ đổi trên chân tam giác; mũi tên xuống
//  công thức nổi tiếng, khung navy chốt   88 vòng sáng một vòng, dây nối vòng ↔ công thức: "same circle".
import { W, H, C, AR, TAU, SPIN, prog, lookup, clamp, outCubic, smooth, ground, wheel, heroDot, rimAt, ticket, secTag, actTitle, figure, line, dashed, text, rr, shade } from '../kit.js';
import { lerp, inC, chase, WC, runLine, plate, arrow, EQ_IT } from './_g4.js';

const TH0 = 0.9;                                                        // góc dừng của tam giác (rad) — không hiện số
const FORM = ['sin(θ + 2π) = sin θ', 'sin(−θ) = −sin θ', 'sin 2θ = 2 sin θ cos θ', 'sin²θ + cos²θ = 1'];

export default class Pythagoras {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b14');
    this.T = {
      end82: L(82).end,
      endless: w(83, 'endless'), memorise: w(83, 'memorise'), but: w(83, 'but'), circle83: w(83, 'circle'),
      sine84: w(84, 'sine'), sq84: w(84, 'squared'), plus84: w(84, 'plus'), cos84: w(84, 'cosine'), sq84b: w(84, 'squared', 2), eq84: w(84, 'equals'), one84: w(84, 'one'), famous: w(84, 'famous'),
      every: w(85, 'every'), point: w(85, 'point'), dist: w(85, 'distance'), one85: w(85, 'one'), radius: w(85, 'radius'),
      pyth: w(86, 'pythagoras'), equation: w(86, 'equation'), x86: w(86, 'x'), sq86: w(86, 'squared'), plus86: w(86, 'plus'), y86: w(86, 'y'), sq86b: w(86, 'squared', 2), eq86: w(86, 'equals'), one86: w(86, 'one'),
      put: w(87, 'put'), cos87: w(87, 'cosine'), sin87: w(87, 'sine'), there: w(87, 'there'), sin87b: w(87, 'sine', 2), sq87: w(87, 'squared'), plus87: w(87, 'plus'), cos87b: w(87, 'cosine', 2), eq87: w(87, 'equals'), one87: w(87, 'one'),
      circle88: w(88, 'circle'), lang: w(88, 'language'),
      s88e: L(88).end,
    };
    this.START = L(83).start;
    this.FROM = Math.max(this.START - 2.6, this.T.end82 + 0.5);
    this.END = L(88).end;
    const T = this.T, r0 = T.radius, b0 = 0.5 + SPIN * r0;
    this.R = [r0, T.pyth + 0.4];
    this.B0 = b0;
    this.TGT = TH0 + TAU * Math.ceil((b0 + 0.3 - TH0) / TAU);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.endless, 'card'), c(T.sine84, 'pen'), c(T.dist, 'tick'), c(T.pyth + 0.1, 'pen'), c(T.cos87, 'flap'), c(T.one87 + 0.1, 'correct')];
  }
  theta(t) {
    const [r0, r1] = this.R;
    if (t < r0) return 0.5 + SPIN * t;
    return lerp(this.B0, this.TGT, smooth(prog(t, r0, r1)));
  }
  render(g, t) {
    const T = this.T, { x: cx, y: cy, R } = WC, th = this.theta(t), START = this.START;
    ground(g, 'fair', { ground: false });
    actTitle(g, t, START, 'ACT SEVEN', 'The formulas are just the circle');
    secTag(g, 'Sine squared plus cosine squared', { k: prog(t, START, START + 0.4), t });
    // ── vòng đu quay (đường tròn đơn vị) ──
    const slow = t < T.pyth + 0.4;
    const Wh = wheel(g, cx, cy, R, { theta: th, hero: true, axes: true, groundY: 1000, bulbs: chase(t) });
    const [px, py] = Wh.P;
    // 85: mọi điểm trên vành cách tâm 1 — vành sáng từng điểm + nan navy; nan chính đậm có số 1
    const kAll = prog(t, T.every, T.point + 0.6), kOut = prog(t, T.eq86 - 0.4, T.eq86 + 0.2);
    if (kAll > 0) for (let i = 0; i < 12; i++) {
      const k = clamp(kAll * 1.6 - i * 0.08), kk = k * (1 - kOut * 0.7); if (k <= 0) continue;
      const a = th + i / 12 * TAU, [x, y] = rimAt(cx, cy, R, a);
      line(g, cx, cy, cx + (x - cx) * outCubic(k), cy + (y - cy) * outCubic(k), `rgba(35,50,74,${0.45 * (1 - kOut)})`, 3);
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.globalAlpha = kk; g.beginPath(); g.arc(x, y, 14 + 8 * (1 - k), 0, TAU); g.stroke(); g.restore();
    }
    const kHy = prog(t, T.dist, T.one85 + 0.2);
    if (kHy > 0) line(g, cx, cy, cx + (px - cx) * outCubic(kHy), cy + (py - cy) * outCubic(kHy), C.ink, 8);
    heroDot(g, px, py);
    // 85: hai vé bên phải, trượt ra phải khi sang câu 86
    const out = inC(prog(t, T.pyth - 0.4, T.pyth + 0.3)) * 700;
    if (out < 700) {
      const k1 = prog(t, T.dist - 0.1, T.dist + 0.3), k2 = prog(t, T.radius - 0.1, T.radius + 0.3);
      g.save(); g.translate(out, 0);
      if (k1 > 0) { dashed(g, px + 20, py, 1230, 330, k1, { color: 'rgba(35,50,74,0.6)', w: 3 }); ticket(g, 'EVERY POINT: DISTANCE 1', 1500, 330, { size: 40, k: k1 }); }
      if (k2 > 0) ticket(g, 'A CIRCLE OF RADIUS 1', 1500, 470, { size: 40, k: k2, edge: C.ang, color: C.ink });
      g.restore();
    }
    // 86: tam giác Pythagoras trên vòng (chân bạc hà, chân hồng, nan navy)
    const kx = prog(t, T.pyth, T.pyth + 0.5), ky = prog(t, T.pyth + 0.4, T.pyth + 0.9);
    if (kx > 0) {
      line(g, cx, cy, cx + (px - cx) * outCubic(kx), cy, C.cos, 12);
      if (ky > 0) line(g, px, cy, px, cy + (py - cy) * outCubic(ky), C.sin, 12);
      if (ky >= 1) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(px - 30, cy - 30, 30, 30); g.restore(); }
      heroDot(g, px, py);
    }
    // nhãn trên chân: x / y (italic) → cos θ / sin θ (vé) ở câu 87
    const lx = (cx + px) / 2, ly = cy + 62, rx = px + 76, ry = (cy + py) / 2;
    const kLx = prog(t, T.x86, T.x86 + 0.25), kLy = prog(t, T.y86, T.y86 + 0.25);
    if (t < T.cos87) text(g, 'x', lx, ly + 14, { font: EQ_IT(60), color: C.cosInk, align: 'center', k: kLx });
    else ticket(g, 'cos θ', lx, ly + 4, { size: 38, color: C.cosInk, edge: C.cos, k: prog(t, T.cos87, T.cos87 + 0.3) });
    if (t < T.sin87) text(g, 'y', rx - 40, ry + 18, { font: EQ_IT(60), color: C.sinInk, align: 'center', k: kLy });
    else { const ks = prog(t, T.sin87, T.sin87 + 0.3); dashed(g, px + 14, ry, 1010, ry, ks, { color: C.sin, w: 3 }); ticket(g, 'sin θ', 1090, ry, { size: 38, color: C.sinInk, edge: C.sin, k: ks }); }
    if (kx > 0 && ky >= 1) ticket(g, '1', lerp(cx, px, 0.5) - 44, lerp(cy, py, 0.5) - 30, { size: 40, k: prog(t, T.one86 - 0.1, T.one86 + 0.2) });
    // ── công thức nổi tiếng (ô dưới) ──
    const EX = 1480, YF = 700, sz = 74;
    const kF = prog(t, T.sine84 - 0.2, T.sine84 + 0.2);
    const partsF = [
      { s: 'sin²θ', color: C.sinInk, k: prog(t, T.sine84, T.sq84 + 0.2) }, { s: '+', k: prog(t, T.plus84, T.plus84 + 0.15) },
      { s: 'cos²θ', color: C.cosInk, k: prog(t, T.cos84, T.sq84b + 0.2) }, { s: '=', k: prog(t, T.eq84, T.eq84 + 0.15) }, { s: '1', k: prog(t, T.one84, T.one84 + 0.15) }];
    const mF = runLine(g, partsF, EX, YF, sz, { draw: false });
    const kRing = prog(t, T.one87, T.one87 + 0.4);
    plate(g, EX, YF - 26, mF.w + 90, 128, { k: kF, ring: kRing });
    if (kF > 0) runLine(g, partsF, EX, YF, sz);
    if (kRing > 0) { g.save(); g.strokeStyle = `rgba(255,211,107,${0.8 * (1 - kRing)})`; g.lineWidth = 10; g.stroke(rr(EX - mF.w / 2 - 61 - 30 * kRing, YF - 90 - 30 * kRing, mF.w + 122 + 60 * kRing, 128 + 16 + 60 * kRing, 30)); g.restore(); }
    const kFam = prog(t, T.famous, T.famous + 0.3) * (1 - prog(t, T.every - 0.1, T.every + 0.2));
    if (kFam > 0) ticket(g, 'THE FAMOUS ONE', EX, YF - 150, { size: 38, k: kFam });
    // ── x² + y² = 1 (ô trên) ──
    const Y1 = 300;
    const parts1 = [
      { s: 'x', font: EQ_IT(sz + 6), color: C.cosInk, k: prog(t, T.x86, T.x86 + 0.2) }, { s: '²', g: 2, k: prog(t, T.sq86, T.sq86 + 0.15) }, { s: '+', k: prog(t, T.plus86, T.plus86 + 0.15) },
      { s: 'y', font: EQ_IT(sz + 6), color: C.sinInk, k: prog(t, T.y86, T.y86 + 0.2) }, { s: '²', g: 2, k: prog(t, T.sq86b, T.sq86b + 0.15) }, { s: '=', k: prog(t, T.eq86, T.eq86 + 0.15) }, { s: '1', k: prog(t, T.one86, T.one86 + 0.15) }];
    const m1 = runLine(g, parts1, EX, Y1, sz, { draw: false }), k1 = prog(t, T.equation - 0.1, T.equation + 0.25);
    plate(g, EX, Y1 - 26, m1.w + 90, 128, { k: k1 });
    if (k1 > 0) runLine(g, parts1, EX, Y1, sz);
    if (k1 > 0) { const kp = prog(t, T.pyth - 0.1, T.pyth + 0.3); ticket(g, 'PYTHAGORAS', EX, Y1 - 118, { size: 36, k: kp * (1 - prog(t, T.put, T.put + 0.3)) }); }
    // 87: mũi tên thế x, y → cos, sin
    arrow(g, EX, Y1 + 62, EX, YF - 110, prog(t, T.put, T.cos87 + 0.4), { color: C.ink });
    // 88: vành sáng một vòng, dây nối vòng ↔ công thức
    const kc = prog(t, T.circle88 - 0.1, T.circle88 + 0.9);
    if (kc > 0 && kc < 1) { g.save(); g.strokeStyle = `rgba(35,50,74,${0.9 * (1 - kc)})`; g.lineWidth = 8 + 6 * kc; g.beginPath(); g.arc(cx, cy, R + 12 + 30 * kc, 0, TAU); g.stroke(); g.restore(); }
    const kl = prog(t, T.lang - 0.1, T.lang + 0.6);
    if (kl > 0) { const [qx, qy] = rimAt(cx, cy, R, -0.5); dashed(g, qx + 14, qy, EX - mF.w / 2 - 60, YF - 26, kl, { color: C.ink, w: 5 }); ticket(g, 'THE SAME CIRCLE', 1000, 800, { size: 38, k: prog(t, T.lang + 0.2, T.lang + 0.6) }); }
    // mascot nhún vai cho chồng công thức (shrug chưa đo miệng → không nói)
    const kM = prog(t, this.START - 0.2, this.START + 0.5) * (1 - prog(t, T.but, T.but + 0.6));
    if (kM > 0) figure(g, 'shrug', 170, H, 250, kM, { talk: false });
    // 83: chồng công thức bên phải → bị hút vào vòng
    FORM.slice(0, 3).forEach((s, i) => {
      const a = T.endless - 0.1 + i * 0.35, k = prog(t, a, a + 0.3), fall = prog(t, T.but + i * 0.12, T.circle83 + 0.1 + i * 0.05);
      if (k <= 0 || fall >= 1) return;
      const x0 = 1500, y0 = 280 + i * 150, e = inC(fall);
      g.save(); g.translate(lerp(x0, cx, e), lerp(y0, cy, e)); g.scale(1 - e * 0.9, 1 - e * 0.9);
      ticket(g, s, 0, 0, { size: 44, k, rot: (i - 1) * 0.03 });
      g.restore();
    });
  }
}
