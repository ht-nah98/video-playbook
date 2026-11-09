// b19 · Next time (câu 106–110), outro. Vòng chính diện = đường tròn đơn vị chạy; cos / sin / góc nhãn đúng màu; vòng nghiêng + bạt sóng
// (sin hồng, cos bạc hà); ba vật quen (gợn nước, xích đu, dây đàn); cuối: "99% from scratch" + SUBSCRIBE đứng yên, mascot pose-wave.
import { W, H, C, AR, TAU, prog, lookup, clamp, outCubic, smooth, ground, wheel, heroDot, angleArc, rimAt, ticket, secTag, tarp, waveOnTarp, sign, figure, line, dashed, text, rr, shade, SPIN } from '../kit.js';
import { lerp, inC, chase, disc } from './_g4.js';

const TP = { x0: 660, L: 1100, span: 2 * TAU }, MID = 540, A = 300, OM = 3.2;

export default class NextTime {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b19');
    this.START = L(106).start;
    this.FROM = Math.max(this.START - 1.2, L(105).end + 0.5);
    this.T = {
      picture: w(106, 'picture'), thing: w(106, 'thing'),
      point: w(107, 'point'), across: w(107, 'across'), high: w(107, 'high'), angle: w(107, 'angle'), travelled: w(107, 'travelled'),
      run: w(108, 'run'), ripple108: w(108, 'ripple'), waves: w(108, 'waves'),
      ripple: w(109, 'ripple'), swing: w(109, 'swing'), string: w(109, 'string'), circle: w(109, 'circle'), behind: w(109, 'behind'),
      thanks: w(110, 'thanks'), watching: w(110, 'watching'), like: w(110, 'like'), subscribe: w(110, 'subscribe'), then: w(110, 'then'),
      s107: L(107).start, s108: L(108).start, s109: L(109).start, s110: L(110).start,
    };
    this.END = L(110).end;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.picture, 'card'), c(T.across, 'tick'), c(T.run + 0.1, 'whoosh-long'), c(T.ripple, 'card'), c(T.thanks + 0.2, 'card'), c(T.subscribe, 'flap')];
  }
  render(g, t) {
    const T = this.T, START = this.START;
    ground(g, 'fair');
    secTag(g, 'Next time', { k: prog(t, START, START + 0.4) * (1 - prog(t, T.s110 - 0.3, T.s110 + 0.2)), t });
    const th = 0.5 + SPIN * t * 3 + (t > T.run ? OM * (t - T.run) - 0 : 0);
    const side = 1 - 0.9 * smooth(prog(t, T.run, T.run + 0.9));
    const cx = lerp(700, 430, smooth(prog(t, T.run, T.run + 0.9)));
    const out110 = prog(t, T.s110 - 0.1, T.s110 + 0.8);
    const wy = MID - 0;
    if (out110 < 1) {
      g.save(); g.translate(0, -1100 * inC(out110));
      const Wh = wheel(g, cx, wy, 290 + 10 * smooth(prog(t, T.run, T.run + 0.9)), { theta: th, hero: true, side, axes: clamp(1 - prog(t, T.run, T.run + 0.4)) || false, groundY: 932, bulbs: chase(t) });
      const [px, py] = Wh.P, flat = side > 0.95;
      // 106–107: cos / sin / góc
      if (flat) {
        const kC = prog(t, T.across - 0.4, T.across + 0.1), kS = prog(t, T.high - 0.4, T.high + 0.1), kA = prog(t, T.travelled - 0.7, T.travelled + 0.1);
        const kk = clamp(prog(t, T.point - 0.2, T.point + 0.3));
        if (kk > 0) { line(g, cx, wy, px, wy, C.cos, 12); line(g, px, wy, px, py, C.sin, 12); }
        const ang = ((th - 0.5) % TAU + TAU) % TAU;
        if (kA > 0) angleArc(g, cx, wy, 70, ((th % TAU) + TAU) % TAU * outCubic(kA));
        heroDot(g, px, py);
        const o = inC(prog(t, T.run - 0.1, T.run + 0.5)) * 900;
        g.save(); g.translate(o, 0);
        ticket(g, 'COSINE: HOW FAR ACROSS', 1500, 300, { size: 38, color: C.cosInk, edge: C.cos, k: kC });
        ticket(g, 'SINE: HOW HIGH', 1500, 430, { size: 38, color: C.sinInk, edge: C.sin, k: kS });
        ticket(g, 'ANGLE: DISTANCE TRAVELLED', 1500, 560, { size: 38, color: C.angInk, edge: C.ang, k: kA });
        g.restore();
      } else {
        const [qx, qy] = Wh.P;
        const kt = prog(t, T.run + 0.5, T.run + 1.3), kw = prog(t, T.run + 0.8, T.waves + 0.2);
        if (kt > 0) tarp(g, 620, 150, 1200, 780, { k: kt });
        if (kt > 0.9) line(g, 640, MID, 1800, MID, 'rgba(35,50,74,0.6)', 3);
        if (kw > 0) {
          waveOnTarp(g, u => Math.sin(th - u), kw, { ...TP, mid: MID, A });
          waveOnTarp(g, u => Math.cos(th - u), prog(t, T.waves - 1.0, T.waves + 0.5), { ...TP, mid: MID, A, color: C.cos });
          if (kw >= 1) { dashed(g, qx + 14, qy, TP.x0 - 8, MID - A * Math.sin(th), 1, { color: 'rgba(224,69,123,0.75)', w: 3.5 }); heroDot(g, TP.x0, MID - A * Math.sin(th), 9); }
        }
        // 109: gợn nước / xích đu / dây đàn cưỡi sóng; vòng sáng lên ở "circle … behind"
        const ride = (kind, x, at, lab) => { const k = prog(t, at - 0.1, at + 0.35); if (k <= 0) return; const y = MID - A * Math.sin(th - (x - TP.x0) / TP.L * TP.span) - 84; disc(g, kind, x, y, 50, k, t); ticket(g, lab, x, y + 92, { size: 32, k }); };
        ride('ripple', 900, T.ripple, 'RIPPLE'); ride('swing', 1230, T.swing, 'SWING'); ride('string', 1560, T.string, 'STRING');
        const kc = prog(t, T.circle, T.behind + 0.4);
        if (kc > 0) { g.save(); g.strokeStyle = `rgba(35,50,74,${0.9 * (1 - 0.5 * kc)})`; g.lineWidth = 8; g.beginPath(); g.ellipse(cx, wy, 40 + 10 * (1 - kc), 310 + 10 * (1 - kc), 0, 0, TAU); g.stroke(); g.restore(); }
        ticket(g, 'THE CIRCLE TURNING BEHIND IT', 1210, 975, { size: 40, edge: C.ang, k: prog(t, T.behind - 0.5, T.behind + 0.1) });
      }
      g.restore();
    }
    // ── 110: biển kênh + SUBSCRIBE (đứng yên) + mascot vẫy ──
    const kn = prog(t, T.thanks - 0.1, T.thanks + 0.4);
    if (kn > 0) {
      ticket(g, '99% from scratch', 860, 330, { size: 92, k: kn, edge: C.sin, h: 150 });
      const lk = prog(t, T.like - 0.1, T.like + 0.3);
      ticket(g, 'LIKE', 700, 800, { size: 52, k: lk, edge: C.sin }); disc(g, 'thumb', 530, 800, 56, lk, t);
      sign(g, 'SUBSCRIBE', 1000, 520, { k: prog(t, T.subscribe - 0.6, T.subscribe - 0.2), flapK: prog(t, T.subscribe - 0.2, T.subscribe + 0.6), tw: 76, th: 116, t: 0 });
    }
    const kw2 = prog(t, T.thanks - 0.2, T.thanks + 0.5);
    if (kw2 > 0) figure(g, 'wave', 1680, H, 270, kw2, { t });
  }
}
