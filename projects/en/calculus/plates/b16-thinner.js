// b16 · Thinner and thinner (câu p2 62–66) — G3, ERA sheet. VIEWS.area bên trái, sổ RIEMANN + thanh khoảng bên phải.
// câu 62: n = 10 (cột mới mọc đè cột cũ), sổ ghi "0.285 – 0.385".  câu 63: n = 100, n = 1000, thẻ "BOTH ≈ 0.33".  câu 64: "gap = 1/n".
// câu 65: phần thừa tan, đất đặc, "area = ⅓" (frac, soilInk), vạch ⅓ nét đứt.  câu 66: thẻ "LIMIT OF THE SUMS", rồi "THE INTEGRAL".
import { C, AR, MO, H, smooth, clamp, ground, hill, columns, areaFill, card, secTag, figure, text, frac, line, ledger, interval, outCubic, VIEWS, prog, lookup, must, fmt,
  RIEMANN, upper, lower } from '../kit.js';

const LX = 1340, LY = 110, LW = 480, LH = 860, NS = [4, 10, 100, 1000];

export default class Thinner {
  static ERA = 'sheet';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b16');
    this.START = L(62).start;
    this.FROM = +Math.max(this.START - 1.2, L(61).end + 0.5).toFixed(3);
    this.T = {
      thinner: w(62, 'thinner'), ten: w(62, 'ten'), answers: w(62, 'answers'), zero62: w(62, 'zero', 1), e62: L(62).end,
      l63: L(63).start, hundred: w(63, 'hundred'), thousand: w(63, 'thousand'), agree: w(63, 'agree'), e63: L(63).end,
      l64: L(64).start, overhang: w(64, 'overhang'), gap: w(64, 'gap'), exactly: w(64, 'exactly'), e64: L(64).end,
      l65: L(65).start, squeezed: w(65, 'squeezed'), single: w(65, 'single'), third: w(65, 'third'), e65: L(65).end,
      l66: L(66).start, limit: w(66, 'limit'), width: w(66, 'width'), integral: w(66, 'integral'), e66: L(66).end,
    };
    const T = this.T;
    for (const [a, b] of [['thinner', 'ten'], ['hundred', 'thousand'], ['thousand', 'agree'], ['overhang', 'gap'], ['squeezed', 'third'], ['limit', 'integral']]) if (!(T[a] < T[b])) throw new Error(`b16: mốc ${a} ≥ ${b}`);
    this.AT = [this.FROM + 0.45, T.ten + 0.1, T.hundred, T.thousand];   // lúc mỗi n bắt đầu
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.answers, 'pen'), c(T.hundred + 0.05, 'pop'), c(T.thousand - 0.12, 'pop'), c(T.overhang, 'tick'), c(T.gap, 'card'),
      c((T.gap + T.squeezed) / 2, 'tick'), c(T.squeezed, 'tick'), c(T.third, 'shimmer'), c(T.limit, 'card'), c(T.integral, 'impact')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, V = VIEWS.area, A = this.AT;
    ground(g, 'sheet', t);
    hill(g, V, { a: -1.2, b: 3.6, t });
    secTag(g, 'Thinner and thinner', { k: prog(t, F + 0.2, F + 0.6), t });

    // ── cột: n hiện tại + n trước mờ dần ──
    let cur = 0; NS.forEach((n, i) => { if (t >= A[i]) cur = i; });
    const kk = prog(t, A[cur], A[cur] + 0.6), solid = prog(t, T.squeezed, T.squeezed + 0.9), n = NS[cur];
    const ex = (1 - solid) * (cur === 0 ? 1 : 1);
    if (cur > 0 && kk < 1) columns(g, V, NS[cur - 1], { side: 'right', k: 1, excess: ex, a_: 1 - kk });
    if (solid < 1) columns(g, V, n, { side: 'right', k: cur === 0 ? 1 : 0.25 + 0.75 * kk, excess: ex });
    if (solid > 0) areaFill(g, V, 0, 1, { k: solid });

    // ── sổ RIEMANN + thanh khoảng ──
    const kl = prog(t, F + 0.3, F + 0.9), rows = NS.map(m => [String(m), `${RIEMANN[m].lo} – ${RIEMANN[m].hi}`]);
    const shown = prog(t, F + 0.45, F + 0.8) + prog(t, T.answers, T.answers + 0.5) + prog(t, T.hundred, T.hundred + 0.5) + prog(t, T.thousand, T.thousand + 0.5);
    const Lg = ledger(g, LX, LY, LW, LH, { cols: [{ head: 'n', w: 0.24, isMath: true }, { head: 'low – high', w: 0.76 }], rows, shown, rowH: 150, size: 36, k: kl });
    if (Lg && kl >= 1) {
      NS.forEach((m, i) => { const k = prog(t, A[i] + 0.25, A[i] + 0.75); if (k > 0) interval(g, 1420, 1760, Lg.rowY(i) + 50, lower(m), upper(m), { range: [0.2, 0.5], k, third: false }); });
      const k3 = prog(t, T.third, T.third + 0.5);
      if (k3 > 0) { const x = 1420 + (1 / 3 - 0.2) / 0.3 * 340; g.save(); g.setLineDash([10, 8]); line(g, x, Lg.y + 190, x, Lg.y + 190 + 560 * outCubic(k3), C.soilInk, 4, 'butt'); g.restore(); }
    }

    // ── thẻ ──
    const lA = prog(t, T.overhang - 0.1, T.overhang + 0.4);
    card(g, `BOTH ≈ ${RIEMANN[1000].lo.slice(0, 4)}`, 760, 330, { size: 48, color: C.ink, edge: C.ink, k: prog(t, T.agree, T.agree + 0.3), lift: lA });
    if (t >= T.gap) { const lg = prog(t, T.single, T.single + 0.5), k = prog(t, T.gap, T.gap + 0.4);
      g.save(); g.translate(0, -(outCubic(lg) ** 1.4) * 500);
      const w0 = text(g, 'gap =', 600, 345, { font: `800 56px ${AR}`, k });
      frac(g, '1', 'n', 600 + w0 + 70, 330, { px: 78, color: C.ink, k: prog(t, T.exactly, T.exactly + 0.4) }); g.restore(); }
    const ka = prog(t, T.third, T.third + 0.4);
    if (ka > 0) { const w0 = text(g, 'area =', 560, 500, { font: `800 60px ${AR}`, color: C.soilInk, k: ka }); frac(g, '1', '3', 560 + w0 + 80, 478, { px: 120, color: C.soilInk, k: ka });
      if (ka >= 1) { must(`${1 / 3}`, 1 / 3); must(`${fmt(upper(1000) - lower(1000))}`, 0.001); } }
    card(g, 'LIMIT OF THE SUMS', 800, 250, { size: 44, mono: false, wt: 800, k: prog(t, T.limit, T.limit + 0.3) });
    card(g, 'THE INTEGRAL', 790, 660, { size: 64, mono: false, wt: 900, color: C.soilInk, edge: C.soil, k: prog(t, T.integral, T.integral + 0.3), rot: -0.015 });

    // ── mascot calculator: câu 62–63 ──
    const mIn = prog(t, this.START - 0.3, this.START + 0.4), mOut = prog(t, T.e63 + 0.1, T.e63 + 0.6);
    if (mIn > 0 && mOut < 1) { g.save(); g.translate(0, outCubic(mOut) * 300); figure(g, 'calculator', 205, H, 262, mIn, { t }); g.restore(); }
  }
}
