// b15 · The rest of the list (câu 89–93), ERA tent (bảng công thức). Ba ô, mỗi ô một vòng nhỏ + một công thức:
//  90 một vòng đầy → điểm về chỗ cũ (sin(θ + 2π) = sin θ)   91 quay ngược → điểm phản chiếu dưới trục (sin(−θ) = −sin θ)
//  92 quay hai lần liền (sin(A + B), sin 2θ)   93 ba vành sáng lên; "things you can see" + mắt.
import { W, H, C, AR, TAU, prog, lookup, clamp, outCubic, outBack, smooth, ground, heroDot, rimAt, angleArc, ticket, secTag, line, dashed, text, rr, shade, SPIN } from '../kit.js';
import { lerp, inC, chase, miniWheel, disc, plate } from './_g4.js';

const PX = [440, 960, 1480], PY = 560, PW = 480, PH = 640, MY = 490, MR = 140;

export default class Rest {
  static ERA = 'tent';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b15');
    this.START = L(89).start;
    this.FROM = Math.max(this.START - 1.2, L(88).end + 0.5);
    this.T = {
      others: w(89, 'others'), same: w(89, 'same'),
      why90: w(90, 'why'), every90: w(90, 'every'), full: w(90, 'full'), turn90: w(90, 'turn'), because90: w(90, 'because'), comes: w(90, 'comes'), back: w(90, 'back'),
      why91: w(91, 'why'), negative: w(91, 'negative'), because91: w(91, 'because'), turning91: w(91, 'turning'), other: w(91, 'other'), way: w(91, 'way'), mirrors: w(91, 'mirrors'), below: w(91, 'below'),
      addition: w(92, 'addition'), double: w(92, 'double-angle'), turning92: w(92, 'turning'), twice: w(92, 'twice'), row: w(92, 'row'),
      keep: w(93, 'keep'), circle: w(93, 'circle'), stop: w(93, 'stop'), become: w(93, 'become'), things: w(93, 'things'), see: w(93, 'see'),
    };
    this.END = L(93).end;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.why90, 'card'), c(T.why91, 'card'), c(T.mirrors, 'tick'), c(T.addition, 'card'), c(T.keep, 'tick'), c(T.become + 0.1, 'pen')];
  }
  panel(g, i, k, t) {
    if (k <= 0) return;
    const e = outBack(clamp(k), 1.3);
    g.save(); g.translate(PX[i], PY); g.scale(e, e);
    shade(g, () => { g.fillStyle = '#FFFDF7'; g.fill(rr(-PW / 2, -PH / 2, PW, PH, 28)); });
    g.strokeStyle = C.steelDk; g.lineWidth = 4; g.stroke(rr(-PW / 2 + 12, -PH / 2 + 12, PW - 24, PH - 24, 20));
    g.restore();
  }
  axes(g, cx, k = 1) {
    line(g, cx - MR - 36, MY, cx + MR + 36, MY, `rgba(35,50,74,${0.8 * k})`, 3); line(g, cx, MY - MR - 36, cx, MY + MR + 36, `rgba(35,50,74,${0.8 * k})`, 3);
  }
  render(g, t) {
    const T = this.T, START = this.START;
    ground(g, 'tent');
    secTag(g, 'The rest of the list', { k: prog(t, START, START + 0.4), t });
    const ks = [prog(t, T.why90 - 0.2, T.why90 + 0.3), prog(t, T.why91 - 0.2, T.why91 + 0.3), prog(t, T.addition - 0.2, T.addition + 0.3)];
    // 89: ô chờ nét đứt (đã có ở khung đầu), nhảy vào theo "others"
    for (let i = 0; i < 3; i++) {
      if (ks[i] > 0) continue;
      const kp = prog(t, this.FROM + 0.3 + i * 0.12, this.FROM + 0.7 + i * 0.12), e = outBack(clamp(kp), 1.3);
      if (kp <= 0) continue;
      g.save(); g.translate(PX[i], PY); g.scale(e, e); g.fillStyle = 'rgba(255,253,247,0.55)'; g.fill(rr(-PW / 2, -PH / 2, PW, PH, 28));
      g.setLineDash([14, 12]); g.strokeStyle = 'rgba(35,50,74,0.4)'; g.lineWidth = 4; g.stroke(rr(-PW / 2, -PH / 2, PW, PH, 28)); g.setLineDash([]);
      text(g, '?', 0, 30, { font: `900 120px ${AR}`, color: 'rgba(90,101,120,0.45)', align: 'center' }); g.restore();
    }
    ticket(g, 'THE SAME WAY', 1450, 130, { size: 38, k: prog(t, T.same - 0.1, T.same + 0.25) * (1 - prog(t, T.why90 + 0.5, T.why90 + 0.9)) });
    // ── ô A: một vòng đầy ──
    { const cx = PX[0], A0 = 0.6, turn = smooth(prog(t, T.every90, T.turn90 + 0.5)), th = A0 + TAU * turn;
      this.panel(g, 0, ks[0], t);
      if (ks[0] > 0) {
        this.axes(g, cx);
        const Wh = miniWheel(g, cx, MY, MR, th, { hero: true, bulbs: chase(t) }), [x, y] = Wh.P, [sx, sy] = rimAt(cx, MY, MR, A0);
        line(g, x, MY, x, y, C.sin, 9);
        const kr = prog(t, T.why90, T.why90 + 0.3);
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.globalAlpha = kr; g.beginPath(); g.arc(sx, sy, 20, 0, TAU); g.stroke(); g.restore();
        heroDot(g, x, y, 9);
        const kd = prog(t, T.comes, T.back + 0.3); if (kd > 0) dashed(g, cx - MR - 30, sy, cx + MR + 30, sy, kd, { color: C.ink, w: 3 });
        ticket(g, 'ONE FULL TURN', cx, 280, { size: 32, edge: C.ang, k: prog(t, T.full - 0.1, T.full + 0.25) });
        ticket(g, 'sin(θ + 2π) = sin θ', cx, 720, { size: 34, k: prog(t, T.because90, T.because90 + 0.3) });
      } }
    // ── ô B: quay ngược → điểm phản chiếu ──
    { const cx = PX[1], a = 0.7; this.panel(g, 1, ks[1], t);
      if (ks[1] > 0) {
        this.axes(g, cx);
        const Wh = miniWheel(g, cx, MY, MR, a, { hero: true, bulbs: chase(t) }), [x, y] = Wh.P;
        const kn = prog(t, T.negative, T.negative + 0.5);
        if (kn > 0) angleArc(g, cx, MY, 62, -a * outCubic(kn), { w: 5 });
        const km = outCubic(prog(t, T.turning91, T.way + 0.4)), am = a - 2 * a * km, [mx, my] = rimAt(cx, MY, MR, am);
        line(g, x, MY, x, y, C.sin, 9);
        if (km > 0) { line(g, mx, MY, mx, my, C.sin, 9); heroDot(g, mx, my, 9); }
        heroDot(g, x, y, 9);
        const kl = prog(t, T.mirrors, T.below + 0.2); if (kl > 0 && km >= 1) dashed(g, x, y, x, my, kl, { color: C.ink, w: 3 });
        ticket(g, 'TURN THE OTHER WAY', cx, 280, { size: 32, edge: C.ang, k: prog(t, T.other - 0.1, T.other + 0.25) });
        ticket(g, 'sin(−θ) = −sin θ', cx, 720, { size: 34, k: prog(t, T.because91, T.because91 + 0.3) });
      } }
    // ── ô C: quay hai lần liền ──
    { const cx = PX[2], A = 0.5, B = 0.6; this.panel(g, 2, ks[2], t);
      if (ks[2] > 0) {
        this.axes(g, cx);
        const ka = outCubic(prog(t, T.turning92, T.turning92 + 0.7)), kb = outCubic(prog(t, T.twice, T.twice + 0.7));
        const th = A * ka + B * kb, Wh = miniWheel(g, cx, MY, MR, th, { hero: true, bulbs: chase(t) }), [x, y] = Wh.P;
        angleArc(g, cx, MY, 56, A * ka, { w: 5 });
        if (kb > 0) { g.save(); g.strokeStyle = C.ang; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.arc(cx, MY, 80, -A, -(A + B * kb), true); g.stroke(); g.restore(); }
        line(g, x, MY, x, y, C.sin, 9); heroDot(g, x, y, 9);
        ticket(g, 'TURN TWICE', cx, 280, { size: 32, edge: C.ang, k: prog(t, T.twice - 0.1, T.twice + 0.25) });
        ticket(g, 'sin(A + B)', cx, 705, { size: 34, k: prog(t, T.addition, T.addition + 0.3) });
        ticket(g, 'sin 2θ = 2 sin θ cos θ', cx, 785, { size: 34, k: prog(t, T.double, T.double + 0.3) });
      } }
    // 93: ba vành sáng, "things you can see"
    const kc = prog(t, T.circle, T.circle + 0.6);
    if (kc > 0) PX.forEach((cx, i) => { if (ks[i] < 1) return; g.save(); g.strokeStyle = `rgba(35,50,74,${0.9 * (1 - 0.6 * kc)})`; g.lineWidth = 7; g.beginPath(); g.arc(cx, MY, MR + 14 + 10 * (1 - kc), 0, TAU); g.stroke(); g.restore(); });
    const ke = prog(t, T.become, T.things + 0.2);
    if (ke > 0) { ticket(g, 'THINGS YOU CAN SEE', 960, 960, { size: 44, k: ke, edge: C.ang }); disc(g, 'eye', 1330, 960, 50, ke, t); }
  }
}
