// b10 · A hole in the line (câu 37–40, G2). Đường mòn y = x + 5 (VIEWS.trail): "draw it" nét bút đứt rồi đường mòn nối liền; "hole" hố cọc rỗng
// ở (5, 10) + cờ; "everywhere else" chấm navy dọc đường; "x plus five" thẻ; "itself" vòng bút quanh hố; "spirit" shimmer; "limit" thẻ;
// "around it… closer and closer" hai chấm lần tới hố từ hai phía (không bao giờ chạm).
import { H, C, AR, prog, lookup, must, outBack, ground, card, secTag, hole, flag, plot, VIEWS, spot, pop } from '../kit.js';
import { lifted, track, trailGround, ring, mascots } from './g2-util.js';

export default class HoleInLine {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b10');
    this.T = {
      draw37: w(37, 'draw'), line37: w(37, 'line'), hole37: w(37, 'hole'), x37: w(37, 'x'), five37: w(37, 'five'),
      every38: w(38, 'everywhere'), x38: w(38, 'x'), itself38: w(38, 'itself'), nothing38: w(38, 'nothing'),
      hole39: w(39, 'hole'), spirit39: w(39, 'spirit'), limit39: w(39, 'limit'),
      care40: w(40, 'care'), hole40: w(40, 'hole'), around40: w(40, 'around'), creep40: w(40, 'creep'), closer40a: w(40, 'closer', 1), closer40b: w(40, 'closer', 2),
      end: L(40).end,
    };
    this.START = L(37).start; this.FROM = Math.max(this.START - 1.2, L(36).end + 0.5);
    this.DOTS = [2.2, 3.0, 3.8, 6.2, 7.0, 7.8];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.draw37, 'pen'), c(T.five37, 'wood'), c(T.x38, 'card'), c(T.itself38, 'pen'), c(T.spirit39, 'shimmer'), c(T.hole40, 'pop'), c(T.around40, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.trail, hx = V.X(5), hy = V.Y(10), f = u => u + 5;
    ground(g, 'field', t, { pan: 1100 });
    trailGround(g, V);
    plot(g, V, f, V.u(-20), V.u(1940), { color: 'rgba(34,49,59,0.55)', w: 5, dash: [14, 12], k: prog(t, this.FROM + 0.2, this.FROM + 1.1) });
    const kp = prog(t, T.draw37, T.line37 + 0.7);
    plot(g, V, f, V.u(-20), V.u(1940), { color: C.soilInk, w: 14, k: kp }); plot(g, V, f, V.u(-20), V.u(1940), { color: '#E2C792', w: 8, k: kp });
    // chấm navy "everywhere else"
    this.DOTS.forEach((u, i) => { const k = prog(t, T.every38 + i * 0.17, T.every38 + i * 0.17 + 0.25) * (1 - prog(t, T.care40 - 0.3, T.care40 + 0.2)); if (k <= 0) return;
      g.save(); g.translate(V.X(u), V.Y(f(u))); g.scale(pop(k), pop(k)); g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 9, 0, 7); g.fill(); g.strokeStyle = C.white; g.lineWidth = 3; g.stroke(); g.restore(); });
    hole(g, hx, hy, { k: prog(t, T.hole37, T.hole37 + 0.3) });
    flag(g, hx, hy - 12, { k: prog(t, T.five37, T.five37 + 0.4), t, color: C.pole });
    ring(g, hx, hy, 46, prog(t, T.itself38, T.itself38 + 0.5));
    // hai chấm lần tới hố (không chạm)
    if (t >= T.around40 - 0.1) {
      const p = track([[T.around40, 340], [T.closer40a, 150], [T.closer40b, 80], [T.closer40b + 1.4, 52]], t), k = prog(t, T.around40 - 0.1, T.around40 + 0.25);
      [-1, 1].forEach(sd => { g.save(); g.translate(hx + sd * p, hy - 0.5 * sd * p); g.scale(pop(k), pop(k)); g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 13, 0, 7); g.fill(); g.strokeStyle = C.white; g.lineWidth = 4; g.stroke(); g.restore(); });
    }
    // thẻ
    card(g, 'x = 5', hx, hy + 110, { size: 44, isMath: true, mono: false, k: prog(t, T.x37, T.x37 + 0.3), lift: prog(t, T.spirit39 - 0.2, T.spirit39 + 0.4) });
    card(g, 'x + 5', 420, 300, { size: 64, isMath: true, mono: false, edge: C.soilInk, k: prog(t, T.x38, T.x38 + 0.3), lift: prog(t, T.limit39 - 0.3, T.limit39 + 0.3) });
    card(g, 'LIMIT', 420, 300, { size: 80, mono: false, wt: 900, k: prog(t, T.limit39, T.limit39 + 0.3) });
    secTag(g, 'A hole in the line', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
    mascots(g, t, [{ pose: 'pointer', a: T.hole39 - 0.2, b: 999 }]);
  }
}
