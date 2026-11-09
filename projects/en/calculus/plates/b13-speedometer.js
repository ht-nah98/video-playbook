// b13 · The speedometer (câu p2 50–54) — G3, ERA field. VIEWS.bowl.
// câu 50: người đi bộ leo dốc, sào hạ ở "derivative" ("not only about hills").  câu 51: ba hàng thẻ — HEIGHT → DISTANCE, RUN → TIME,
//   SLOPE → SPEED (bút navy gạch chữ cũ); đồi lặn xuống thành con đường.  câu 52: bánh xe đo lăn trên đường, đồng hồ tốc độ (kim đỏ, KHÔNG số
//   km/h); mũi tên AVERAGE bị gạch; "right now" vòng navy + thẻ; "single instant" điểm đỏ ở chỗ bánh chạm đường.
// câu 53: ảnh Newton → Leibniz → trang 1684 kẹp.  câu 54: một đoạn đường "A CHANGE" tách thành 6 lát; điểm đỏ nhảy từng lát, kim đồng hồ đổi theo.
import { C, AR, H, W, TAU, STRATA, WHEEL, smooth, clamp, lerp, hash, ground, hill, mound, rod, spot, hiker, card, secTag, figure, pen, arrow, line, rr, text, wheel, speedometer,
  photo, photoImages, VIEWS, prog, lookup, outCubic, shadowRR } from '../kit.js';

const ROAD_Y = WHEEL.y;
function road(g, k) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * 260;
  g.save(); g.translate(0, dy);
  const bands = [0, 40, 100, 180, 400];
  bands.slice(0, -1).forEach((b, i) => { g.fillStyle = STRATA[i % STRATA.length]; g.fillRect(-10, ROAD_Y + b, W + 20, bands[i + 1] - b + 1);
    g.strokeStyle = 'rgba(110,74,28,0.25)'; g.lineWidth = 2; g.beginPath(); for (let x = -10; x <= W + 10; x += 12) { const y = ROAD_Y + b + Math.sin(x * 0.013 + i * 1.7) * 4; x > -10 ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); });
  for (let j = 0; j < 90; j++) { g.fillStyle = `rgba(110,80,45,${0.18 + hash(j * 5.9) * 0.2})`; g.beginPath(); g.ellipse(hash(j * 1.37) * W, ROAD_Y + 30 + hash(j * 2.71) * 120, 3 + hash(j) * 5, 2 + hash(j * 4.1) * 3, hash(j) * 3, 0, TAU); g.fill(); }
  g.fillStyle = C.face; g.fillRect(-10, ROAD_Y - 10, W + 20, 14);
  g.strokeStyle = C.curve; g.lineWidth = 5; g.beginPath(); g.moveTo(-10, ROAD_Y - 10); g.lineTo(W + 10, ROAD_Y - 10); g.stroke();
  g.restore();
}

export default class Speedometer {
  static ERA = 'field';
  static IMAGES = photoImages('newton', 'leibniz', 'nova');
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b13');
    this.START = L(50).start;
    this.FROM = +Math.max(this.START - 1.2, L(49).end + 0.5).toFixed(3);
    this.T = {
      deriv50: w(50, 'derivative'), hills: w(50, 'hills'),
      l51: L(51).start, height: w(51, 'height'), distance: w(51, 'distance'), run: w(51, 'run'), time: w(51, 'time'), slope: w(51, 'slope'), speed: w(51, 'speed'), e51: L(51).end,
      l52: L(52).start, spd: w(52, 'speedometer'), average: w(52, 'average'), trip: w(52, 'trip'), but: w(52, 'but'), right: w(52, 'right'), now: w(52, 'now'), single: w(52, 'single'), e52: L(52).end,
      l53: L(53).start, isaac: w(53, 'isaac'), gottfried: w(53, 'gottfried'), published: w(53, 'published'), e53: L(53).end,
      l54: L(54).start, change: w(54, 'change'), apart: w(54, 'apart'), each: w(54, 'each'), clearly: w(54, 'clearly'), e54: L(54).end,
    };
    const T = this.T;
    for (const [a, b] of [['deriv50', 'hills'], ['height', 'distance'], ['run', 'time'], ['slope', 'speed'], ['average', 'but'], ['right', 'single'], ['each', 'clearly']]) if (!(T[a] < T[b])) throw new Error(`b13: mốc ${a} ≥ ${b}`);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.height, 'card'), c(T.speed, 'pen'),
      c(T.spd + 0.1, 'reel'), c(T.average, 'card'), c(T.but, 'pen'), c(T.single, 'pop'),
      c(T.isaac, 'page'), c(T.gottfried, 'page'), c((T.gottfried + T.published) / 2, 'tick'), c(T.published, 'page'),
      c(T.change, 'card'), c(T.each + 0.4, 'tick')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, V = VIEWS.bowl;
    const sink = prog(t, T.e51, T.e51 + 0.9), vt = t;
    const wd = (t - F) * 150;
    ground(g, 'field', t, { pan: 700 + (t > T.spd ? wd * 0.25 : 0) });
    road(g, sink);
    if (sink < 1) {
      const dy = outCubic(sink) * 700;
      hill(g, V, { a: -3, b: 3.6, t, rise: 1 - sink });
      g.save(); g.translate(0, dy);
      // người đi bộ leo dốc, sào hạ ở "derivative"
      const u = lerp(0.15, 1.2, smooth(prog(t, F + 0.3, T.hills + 0.3))), walking = u < 1.19;
      rod(g, V, 1.2, { d0: -0.45, d1: 0.55, k: prog(t, T.deriv50, T.deriv50 + 0.5), hover: 100, lift: prog(t, T.e51 - 0.2, T.e51 + 0.3) });
      spot(g, V.X(1.2), V.Y(1.44), { k: prog(t, T.deriv50, T.deriv50 + 0.4) });
      hiker(g, V.X(u) - 6, V.Y(u * u) - 6, 0.95, { step: walking ? vt * 1.8 : 0 });
      g.restore();
      // ba hàng thẻ: cũ (bị gạch) → mới
      const rows = [['HEIGHT', 'DISTANCE', T.height, T.distance, 190, C.ink, C.ink], ['RUN', 'TIME', T.run, T.time, 300, C.ink, C.ink], ['SLOPE', 'SPEED', T.slope, T.speed, 410, C.poleInk, C.pole]];
      const lf = prog(t, T.e51 + 0.05, T.e51 + 0.55);
      rows.forEach(([a, b, ta, tb, y, col, edge]) => {
        const A = card(g, a, 720, y, { size: 40, mono: false, wt: 800, color: col, edge: col === C.ink ? C.ink : edge, k: prog(t, ta, ta + 0.3), lift: lf });
        if (t >= tb && lf <= 0) pen(g, A.x + 14, A.y + A.h * 0.55, A.x + A.w - 10, A.y + A.h * 0.45, prog(t, tb, tb + 0.25), { w: 6 });
        if (t >= tb) { arrow(g, 860, y, 1030, y, prog(t, tb, tb + 0.3) * (1 - lf), { w: 5, head: 16 });
          card(g, b, 1230, y, { size: 40, mono: false, wt: 800, color: col, edge, k: prog(t, tb + 0.1, tb + 0.4), lift: lf }); }
      });
    }

    // ── câu 52: bánh xe đo + đồng hồ tốc độ ──
    const wk = prog(t, T.spd - 0.2, T.spd + 0.7) * (1 - prog(t, T.isaac + 0.1, T.isaac + 0.8));
    if (wk > 0) {
      const sp = 0.5 + 0.2 * Math.sin(t * 1.1), wl = wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, dist: wd, k: wk, speed: sp });
      const out = prog(t, T.isaac + 0.1, T.isaac + 0.7), a = 1 - out, rn = prog(t, T.e52 + 0.1, T.e52 + 0.7);
      if (wk >= 1 || out > 0) {
        // AVERAGE: mũi tên hai đầu dọc đường, bị gạch ở "but"
        const ka = prog(t, T.average, T.average + 0.4), lk = prog(t, T.but + 0.35, T.but + 0.85);
        if (ka > 0 && lk < 1) { g.save(); g.globalAlpha = 1 - lk;
          arrow(g, 1035, 980, 440, 980, ka, { w: 6 }); arrow(g, 1035, 980, 1640, 980, ka, { w: 6 }); g.restore();
          const b = card(g, 'AVERAGE', 1035, 980, { size: 40, mono: false, wt: 800, k: ka, lift: lk });
          if (lk <= 0) pen(g, b.x + 12, b.y + b.h * 0.6, b.x + b.w - 8, b.y + b.h * 0.4, prog(t, T.but, T.but + 0.3), { w: 7 }); }
        // right now: vòng navy quanh đồng hồ + thẻ
        const kr = prog(t, T.right, T.right + 0.35);
        if (kr > 0) { g.save(); g.globalAlpha = a; g.strokeStyle = C.ink; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.arc(960, 413, 104, -Math.PI / 2, -Math.PI / 2 + TAU * outCubic(kr)); g.stroke(); g.restore();
          g.save(); g.translate(outCubic(rn) * 700, 0); card(g, 'RIGHT NOW', 1560, 400, { size: 44, mono: false, wt: 900, k: kr }); g.restore(); }
        const ks = prog(t, T.single, T.single + 0.3);
        if (ks > 0) spot(g, WHEEL.cx, ROAD_Y - 2, { k: ks, a });
      }
    }

    mound(g, t, 1);

    // ── câu 53: ảnh ──
    const pl = prog(t, T.change - 0.2, T.change + 0.4);
    if (t >= T.isaac - 0.05 && pl < 1) {
      photo(g, 'newton', 200, 170, 340, 440, { k: prog(t, T.isaac, T.isaac + 0.6), rot: -0.025, from: 'top', lift: pl });
      photo(g, 'leibniz', 720, 170, 340, 440, { k: prog(t, T.gottfried, T.gottfried + 0.6), rot: 0.02, from: 'top', lift: pl });
      photo(g, 'nova', 1250, 170, 380, 450, { k: prog(t, T.published, T.published + 0.6), rot: -0.015, from: 'top', lift: pl });
    }

    // ── câu 54: một đoạn đường tách thành lát — mỗi lát một khoảnh khắc ──
    if (t >= T.change - 0.05) {
      const N = 6, x0 = 420, x1 = 1620, y = 800, e = smooth(prog(t, T.apart, T.apart + 0.7)), gap = 30 * e, bw = (x1 - x0 - (N - 1) * gap) / N, kb = prog(t, T.change, T.change + 0.4);
      const hop = t < T.each ? -1 : Math.min(N - 1, Math.floor(prog(t, T.each, T.clearly + 0.5) * N)), VAL = [0.34, 0.52, 0.78, 0.62, 0.42, 0.7];
      card(g, 'A CHANGE', 960, 215, { size: 48, mono: false, wt: 900, k: kb });
      for (let i = 0; i < N; i++) { const bx = x0 + i * (bw + gap), on = i === hop;
        shadowRR(g, bx, y - 30, bw, 60, 6, { col: 'rgba(40,50,40,0.22)', blur: 8, ox: 3, oy: 5 });
        g.save(); g.globalAlpha = kb; g.fillStyle = C.paper; g.fill(rr(bx, y - 30, bw, 60, 6)); g.strokeStyle = C.ink; g.lineWidth = on ? 7 : 3; g.stroke(rr(bx, y - 30, bw, 60, 6)); g.restore(); }
      if (hop >= 0) { const bx = x0 + hop * (bw + gap) + bw / 2; spot(g, bx, y - 62, { k: 1, pulse: prog(t, T.each, T.each + 0.4) }); }
      speedometer(g, 960, 500, 120, hop >= 0 ? VAL[hop] : 0.5, { k: prog(t, T.change + 0.25, T.change + 0.65) });
    }

    secTag(g, 'The speedometer', { k: prog(t, F + 0.2, F + 0.6), t });

    // ── mascot: calculator quanh câu 52 ──
    const mIn = prog(t, T.l52 - 0.2, T.l52 + 0.4), mOut = prog(t, T.isaac + 0.1, T.isaac + 0.6);
    if (mIn > 0 && mOut < 1) { g.save(); g.translate(0, outCubic(mOut) * 300); figure(g, 'calculator', 205, H, 262, mIn, { t }); g.restore(); }
  }
}
