// b05 · Lining up · câu p2 17–18 · G1. Zoom như cuối b04 (sổ đủ 5 hàng, kính lúp 1.001). "lining up" → bút khoanh CỘT slope + mũi tên navy tới
// tờ thước số; "three, two point five, …" → từng chấm rơi lên trục (cỡ log: gần 2 thì dồn lại), hết từ MỘT phía; "closing in on two" →
// mũi tên + vách đỏ "2"; "not one of them goes past it" → chấm ma bên kia vách bị bút navy gạch.
import { C, AR, MO, prog, lookup, must, outBack, outCubic, ground, hill, secant, spot, card, text, arrow, pen, line, shadowRR, rr, secTag, ledger, VIEWS, BOOK, STEP_COLS, STEP_ROWS, STEPS, clamp } from '../kit.js';
import { mascotAt, walker, zoomLoupe, ringRect, scaled } from './g1-common.js';

const PANEL = { x: 1180, y: 235, w: 640, h: 290 }, AX = { x0: 1215, y: 420, per: 155, wall: 1750 };
export default class Lining {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b05');
    this.START = L(17).start;
    this.FROM = Math.max(this.START - 1.2, L(16).end + 0.5);
    this.T = {
      numbers: w(17, 'numbers'), lining: w(17, 'lining'),
      dots: [w(17, 'three'), w(17, 'two', 1), w(17, 'two', 2), w(17, 'two', 3), w(17, 'two', 4)],
      closing: w(18, 'closing'), two: w(18, 'two'), every: w(18, 'every'), one: w(18, 'one'), past: w(18, 'past'), end: L(18).end,
    };
    this.SLOPES = STEPS.map(s => s.slope);
    must(`'${this.SLOPES.join(' ')}'`, '3 2.5 2.1 2.01 2.001');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.lining, 'pen'), c(T.dots[3], 'tick'), c(T.two, 'correct')];
  }
  render(g, t) {
    const T = this.T, V = VIEWS.zoom, tk = x => AX.x0 + AX.per * -Math.log10(x - 2);
    ground(g, 'field', t, { pan: (VIEWS.bowl.X(0) - V.X(0)) * 0.1 });
    hill(g, V, { a: -1.2, b: 3.6, t });
    secant(g, V, 1, 1.001, { ext: 0.3, ext0: 0.03, w: 6 });
    spot(g, V.X(1), V.Y(1), { k: 1 });
    walker(g, V, 0.78, 1.3);
    ledger(g, BOOK.x, BOOK.y, BOOK.w, BOOK.h, { cols: STEP_COLS, rows: STEP_ROWS });
    zoomLoupe(g, 1.001, 1);
    ringRect(g, 662, 186, 146, 372, 22, prog(t, T.lining, T.lining + 0.7));

    // tờ thước số (giấy) + mũi tên navy từ cột slope
    const kp = prog(t, T.numbers, T.numbers + 0.4);
    if (kp > 0) {
      scaled(g, PANEL.x + PANEL.w / 2, PANEL.y + PANEL.h / 2, outBack(kp, 2), () => {
        shadowRR(g, PANEL.x, PANEL.y, PANEL.w, PANEL.h, 10, { col: 'rgba(30,40,30,0.28)', blur: 14, ox: 8, oy: 10 });
        g.fillStyle = C.paper; g.fill(rr(PANEL.x, PANEL.y, PANEL.w, PANEL.h, 10));
        line(g, AX.x0 - 20, AX.y, AX.wall + 20, AX.y, 'rgba(34,49,59,0.55)', 3, 'butt');
        // chấm + nhãn từng dốc (hết từ MỘT phía: 3 → 2.001)
        this.SLOPES.forEach((s, i) => {
          const kd = prog(t, T.dots[i], T.dots[i] + 0.3); if (kd <= 0) return;
          const hop = Math.sin(Math.PI * prog(t, T.every + 0.15 * i, T.every + 0.15 * i + 0.35)) * 12, x = tk(+s);
          g.fillStyle = C.sec; g.beginPath(); g.arc(x, AX.y - hop, 13 * outBack(kd, 2), 0, 7); g.fill(); g.strokeStyle = C.white; g.lineWidth = 3; g.stroke();
          text(g, s, x, AX.y - 36 - (i % 2 ? 40 : 0) - hop, { font: `500 32px ${MO}`, color: C.secInk, align: 'center', k: kd });
        });
        // vách đỏ = 2, mũi tên navy dọc trục
        const kw = prog(t, T.closing, T.closing + 0.5);
        if (kw > 0) { g.fillStyle = C.pole; g.fillRect(AX.wall - 7, AX.y - 60 * outCubic(kw), 14, 120 * outCubic(kw)); }
        arrow(g, AX.x0 - 10, AX.y + 58, AX.wall - 40, AX.y + 58, prog(t, T.closing, T.two), { w: 5 });
        const k2 = prog(t, T.two, T.two + 0.3);
        if (k2 > 0) scaled(g, AX.wall, 300, outBack(k2, 2), () => text(g, '2', AX.wall, 330, { font: `900 84px ${AR}`, color: C.poleInk, align: 'center' }));
        // chấm ma bên kia vách bị gạch
        const kg = prog(t, T.one, T.one + 0.3);
        if (kg > 0) { g.save(); g.globalAlpha = 0.9; g.setLineDash([6, 5]); g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(AX.wall + 36, AX.y, 13 * kg, 0, 7); g.stroke(); g.restore();
          pen(g, AX.wall + 16, AX.y - 20, AX.wall + 56, AX.y + 20, prog(t, T.past, T.past + 0.2), { w: 6 }); pen(g, AX.wall + 56, AX.y - 20, AX.wall + 16, AX.y + 20, prog(t, T.past + 0.18, T.past + 0.38), { w: 6 }); }
      });
      arrow(g, 812, 380, PANEL.x - 6, 420, prog(t, T.lining + 0.2, T.lining + 0.8), { w: 5 });
    }
    mascotAt(g, t, 'calculator', this.START - 0.3, T.closing + 0.1);
    secTag(g, 'Lining up', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
  }
}
