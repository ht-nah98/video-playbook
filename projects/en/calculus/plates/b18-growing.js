// b18 ★ · The growing area (ACT SIX — Two sides of one coin; câu p2 69–74) — ERA sheet, VIEWS.area (trắc dọc 0…1).
// câu 69: hai ô giấy "DERIVATIVE" (dốc nhỏ) / "INTEGRAL" (4 cột đất) hiện đúng "derivatives" / "integrals", hai mũi tên navy hai chiều ở "undoes".
// câu 70: đất đặc 0 … x lớn dần ở "stretch"; nhãn x; đồng hồ tốc độ ("how fast it grows") có kim = chiều cao đường cong.
// câu 71: thước ngang h ở "h"; một LÁT mỏng (xa … xa + h) bật lên ở "slice".   câu 72: "almost a rectangle" hình chữ nhật nét đứt
// cao bằng đường cong ở mép trái (phần nhỏ thò lên = "almost"); "height" vạch đứng + thẻ.   câu 73: (extra area) / h = height
// (frac); "shrinks" lát co mảnh dần, phần thò lên mất.   câu 74: "RATE OF AREA" ← kim đồng hồ chỉ đúng chiều cao.
import { H, C, AR, clamp, lerp, prog, lookup, must, outCubic, smooth, ground, hill, areaFill, speedometer, card, text, math, frac, measure, pen,
  arrow, line, rr, shadowRR, secTag, actTitle, figure, mini, VIEWS, sq, STRATA, pop } from '../kit.js';

const V = VIEWS.area;
const f = sq;

export default class Growing {
  static ERA = 'sheet';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b18');
    this.T = {
      deriv: w(69, 'derivatives'), instants: w(69, 'instants'), integ: w(69, 'integrals'), slices: w(69, 'slices'), undoes: w(69, 'undoes'),
      let: w(70, 'let'), zero: w(70, 'zero'), stretch: w(70, 'stretch'), x70: w(70, 'x'), watch: w(70, 'watch'), fast: w(70, 'fast'), grows: w(70, 'grows'),
      push: w(71, 'push'), by: w(71, 'by'), h71: w(71, 'h'), gains: w(71, 'gains'), thin: w(71, 'thin'), slice: w(71, 'slice'),
      almost: w(72, 'almost'), rect: w(72, 'rectangle'), width: w(72, 'width'), h72: w(72, 'h'), height: w(72, 'height', 1), curve72: w(72, 'curve'),
      extra: w(73, 'extra'), divided: w(73, 'divided'), h73: w(73, 'h', 1), just: w(73, 'just'), height73: w(73, 'height'), shrinks: w(73, 'shrinks'), exact: w(73, 'exact'),
      rate: w(74, 'rate'), grows74: w(74, 'grows'), curve74: w(74, 'curve'), itself: w(74, 'itself'),
    };
    this.START = L(69).start; this.END = L(74).end;
    this.FROM = Math.max(this.START - 2.6, tl.lines[68].end + 0.5);
    must('0.64 ** 2 > 0.4', true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.deriv, 'pop'), c(T.slices, 'pop'), c(T.undoes, 'pen'), c(T.stretch, 'tick'), c(T.fast, 'pop'), c(T.h71, 'pen'), c(T.slice, 'tick'),
      c(T.height, 'pen'), c(T.divided, 'card'), c(T.shrinks, 'tick'), c(T.rate, 'card')];
  }
  // vị trí x của mép đất, bề rộng lát h
  xa(t) { const T = this.T; return 0.5 * outCubic(prog(t, T.zero, T.x70 + 0.1)) + 0.14 * smooth(prog(t, T.watch, T.grows + 0.3)); }
  hw(t) { const T = this.T; return lerp(0.14, 0.03, smooth(prog(t, T.shrinks, T.exact))); }

  render(g, t) {
    const T = this.T, S = this.START, FROM = this.FROM;
    ground(g, 'sheet', t, { pan: 300 });

    // ── sườn y = x² + trắc dọc ──
    hill(g, V, { a: -3, b: 3.6, rise: prog(t, FROM + 0.3, FROM + 1.3), t });
    const xa = this.xa(t), h = this.hw(t), X0 = V.X(0), yB = V.Y(0), liftTiles = prog(t, T.let - 0.1, T.let + 0.5);
    if (xa > 0.004) areaFill(g, V, 0, xa, { k: 1, seed: 7, outline: false });
    // đường mép đất (nét nâu đậm) để thấy "stretch"
    if (xa > 0.004) { g.save(); g.strokeStyle = C.soilInk; g.lineWidth = 4; g.beginPath(); g.moveTo(V.X(xa), yB); g.lineTo(V.X(xa), V.Y(f(xa))); g.stroke(); g.restore(); }

    // ── lát mỏng (xa … xa + h) ──
    const ksl = prog(t, T.thin, T.slice + 0.35);
    const sx0 = V.X(xa), sx1 = V.X(xa + h), yTop0 = V.Y(f(xa)), yTop1 = V.Y(f(xa + h));
    if (ksl > 0) {
      const e = outCubic(ksl), lift = (1 - e) * 120;
      g.save(); g.translate(0, -lift);
      const p = new Path2D(); p.moveTo(sx0, yB); p.lineTo(sx0, yTop0); for (let i = 1; i <= 12; i++) { const u = xa + h * i / 12; p.lineTo(V.X(u), V.Y(f(u))); } p.lineTo(sx1, yB); p.closePath();
      g.fillStyle = STRATA[3]; g.fill(p); g.strokeStyle = C.soilInk; g.lineWidth = 5; g.lineJoin = 'round'; g.stroke(p);
      g.restore();
    }
    // hình chữ nhật nét đứt cao = f(xa): "almost a rectangle"
    const kr = prog(t, T.almost, T.rect + 0.2) * (1 - prog(t, T.shrinks + 0.6, T.exact));
    if (kr > 0 && ksl >= 1) {
      g.save(); g.setLineDash([12, 8]); g.strokeStyle = C.ink; g.lineWidth = 4; g.globalAlpha = clamp(kr);
      g.beginPath(); g.moveTo(sx0, yB); g.lineTo(sx0, yTop0); g.lineTo(sx1, yTop0); g.lineTo(sx1, yB); g.stroke(); g.restore();
    }
    // vạch đứng chiều cao đường cong tại xa (navy) — "height of the curve"
    const kh = prog(t, T.height, T.height + 0.3);
    if (kh > 0) {
      const yy = lerp(yB, yTop0, outCubic(kh)); g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx0 - 14, yB); g.lineTo(sx0 - 14, yy); g.stroke();
      line(g, sx0 - 24, yy, sx0 - 4, yy, C.ink, 6); g.restore();
    }

    // ── thước ngang h dưới đáy + nhãn x, h ──
    const kx = prog(t, T.x70, T.x70 + 0.3), kb = prog(t, T.h71, T.h71 + 0.3);
    if (kx > 0) card(g, 'x', V.X(xa) - 62, 972, { size: 36, isMath: true, mono: false, wt: 700, edge: C.ink, k: kx });
    if (kb > 0) { pen(g, sx0, 936, sx1, 936, kb, { w: 6 }); line(g, sx0, 926, sx0, 946, C.ink, 6); if (kb >= 1) line(g, sx1, 926, sx1, 946, C.ink, 6);
      card(g, 'h', (sx0 + sx1) / 2 + 6, 972, { size: 36, isMath: true, mono: false, wt: 700, edge: C.ink, k: kb }); }

    // ── câu 69: hai ô giấy ──
    const tileTop = 190, tiles = [[260, T.deriv, 'slope', 'DERIVATIVE'], [570, T.integ, 'strips', 'INTEGRAL']];
    tiles.forEach(([cx, at, kind, lab], i) => {
      const k = prog(t, at, at + 0.35); if (k <= 0 || liftTiles >= 1) return;
      const up = outCubic(liftTiles) ** 1.5 * 600, e = pop(k);
      g.save(); g.translate(0, -up); g.translate(cx, tileTop + 125); g.scale(e, e); g.translate(-cx, -(tileTop + 125));
      shadowRR(g, cx - 125, tileTop, 250, 250, 8, { col: 'rgba(40,50,40,0.25)', blur: 12, ox: 6, oy: 8 });
      g.fillStyle = C.paper; g.fill(rr(cx - 125, tileTop, 250, 250, 8));
      mini(g, kind, cx, tileTop + 135, 0.85, { k: clamp(k * 1.4) });
      g.restore();
      card(g, lab, cx, tileTop + 290, { size: 30, mono: false, wt: 800, edge: i ? C.soil : C.pole, k: prog(t, at + 0.1, at + 0.4), lift: liftTiles });
    });
    const ka = prog(t, T.undoes, T.undoes + 0.4);
    if (ka > 0 && liftTiles < 1) { const up = outCubic(liftTiles) ** 1.5 * 600;
      arrow(g, 425, 330 - up, 405, 330 - up, ka, { w: 7 }); arrow(g, 405, 330 - up, 425, 330 - up, ka, { w: 7 }); }

    // ── câu 70: đồng hồ tốc độ — kim chỉ đúng chiều cao đường cong tại xa ──
    const kd = prog(t, T.fast - 0.2, T.fast + 0.3);
    if (kd > 0) {
      speedometer(g, 300, 430, 95, f(xa) * 1.0, { k: kd });
      card(g, 'RATE OF AREA', 300, 590, { size: 30, mono: false, wt: 800, edge: C.pole, k: prog(t, T.rate, T.rate + 0.3) });
    }

    // ── nhãn chiều cao + chữ rộng h ──
    const kHeight = prog(t, T.height, T.height + 0.3);
    if (kHeight > 0) {
      const b = card(g, 'HEIGHT OF THE CURVE', 760, 520, { size: 30, mono: false, wt: 800, edge: C.curve, k: kHeight, rot: -0.01 });
      pen(g, b.x + b.w, 520, sx0 - 36, (yB + yTop0) / 2 - 10, prog(t, T.height + 0.1, T.height + 0.5), { w: 5 });
    }
    // ── câu 73: extra area / h = height ──
    const ke = prog(t, T.extra, T.divided + 0.4);
    if (ke > 0) {
      text(g, 'extra area', 480, 262, { font: `800 52px ${AR}`, color: C.soilInk, align: 'center', k: ke });
      line(g, 330, 288, 630, 288, C.ink, 5);
      math(g, 'h', 480, 354, { px: 52, color: C.ink, align: 'center', k: prog(t, T.divided, T.h73 + 0.2) });
      if (prog(t, T.just, T.just + 0.2) > 0) {
        text(g, '=', 690, 300, { font: `800 60px ${AR}`, k: prog(t, T.just, T.just + 0.2) });
        text(g, 'height', 760, 300, { font: `800 52px ${AR}`, color: C.curveInk, k: prog(t, T.height73, T.height73 + 0.35) });
      }
    }
    // ── câu 74: mũi tên từ đồng hồ tới vạch chiều cao ──
    const kar = prog(t, T.grows74, T.curve74);
    if (kar > 0) arrow(g, 410, 462, sx0 - 40, 760, kar, { w: 6 });

    // ── mascot ──
    const kIn = prog(t, T.push, T.push + 0.5), kOut = prog(t, T.extra + 0.5, T.extra + 1.0);
    if (kIn > 0 && kOut < 1) figure(g, 'pointer', 205, H, 262, Math.min(kIn, 1 - kOut), { t });
    // nhãn hồi + mục vẽ SAU đồi (đồi từng đè thẻ ACT SIX — quét lệch mốc 2026-10-22)
    actTitle(g, t, S, 'ACT SIX', 'Two sides of one coin');
    secTag(g, 'The growing area', { k: prog(t, S + 0.4, S + 0.8), t });
  }
}
