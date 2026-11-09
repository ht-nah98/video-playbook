// b09 · Sneaking up (câu 32–36, G2). Đường mòn y = x + 5 (VIEWS.trail) có hố ở (5, 10). Hai người đo tiến từ HAI PHÍA về phía hố
// (4.9, 4.99 | 5.1, 5.01 — khoảng cách vẽ theo căn bậc hai cho thấy "áp sát" mà hai người không đè lên hố), sổ NEAR5 ghi đúng chữ được đọc,
// kết "→ 10", rồi "lim (x² − 25) / (x − 5) = 10".
import { H, C, AR, prog, lookup, must, outCubic, outBack, ground, hiker, card, text, secTag, hole, flag, arrow, ledger, plot, measureMath, VIEWS, NEAR5, lim, fmt } from '../kit.js';
import { lifted, track, typed, trailGround, mascots } from './g2-util.js';

const HIKE = 1.05;
export default class Sneaking {
  static ERA = 'field';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b09');
    this.T = {
      trying32: w(32, 'trying'),
      four33a: w(33, 'four', 1), nine33a: w(33, 'nine', 3), four33b: w(33, 'four', 2), nine33b: w(33, 'nine', 8),
      side34: w(34, 'side'), five34a: w(34, 'five', 1), one34a: w(34, 'one', 2), five34b: w(34, 'five', 2), one34b: w(34, 'one', 4),
      left35: w(35, 'left'), right35: w(35, 'right'), close35: w(35, 'close'), ten35: w(35, 'ten'),
      limit36: w(36, 'limit'), expr36: w(36, 'expression'), x36: w(36, 'x'), approaches36: w(36, 'approaches'), is36: w(36, 'is'), ten36: w(36, 'ten'),
      end: L(36).end,
    };
    this.START = L(32).start; this.FROM = Math.max(this.START - 1.2, L(31).end + 0.5);
    NEAR5.forEach(r => must(`${r.x} + 5`, +r.v));
    must(`${fmt(lim(5.01))}`, 10.01);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.four33a, 'pen'), c(T.four33b, 'tick'), c(T.five34a, 'pen'), c(T.five34b + 0.05, 'tick'),
      c(T.left35, 'tick'), c(T.ten35, 'card'), c(T.limit36 + 0.1, 'pen'),
    ];
  }
  /** Khoảng cách pixel tới hố của người trái / phải theo từng mốc. */
  gap(side, t) {
    const T = this.T, f = d => 56 + 330 * Math.sqrt(d);
    return side < 0
      ? track([[T.trying32, 440], [T.four33a + 0.35, f(0.1)], [T.four33b - 0.6, f(0.1)], [T.four33b + 0.5, f(0.01)], [T.close35 - 0.2, f(0.01)], [T.ten35 + 0.6, 70]], t)
      : track([[T.side34 - 0.1, 440], [T.five34a + 0.6, f(0.1)], [T.five34b - 0.7, f(0.1)], [T.five34b + 0.7, f(0.01)], [T.close35 - 0.2, f(0.01)], [T.ten35 + 0.6, 70]], t);
  }
  render(g, t) {
    const T = this.T, V = VIEWS.trail, hx = V.X(5), hy = V.Y(10);
    ground(g, 'field', t, { pan: 760 });
    trailGround(g, V);
    plot(g, V, u => u + 5, V.u(-20), V.u(1940), { color: C.soilInk, w: 14 }); plot(g, V, u => u + 5, V.u(-20), V.u(1940), { color: '#E2C792', w: 8 });
    hole(g, hx, hy); flag(g, hx, hy - 12, { t, color: C.pole });

    // hai người đo
    const hikers = [[-1, T.trying32 - 0.1, T.four33b], [1, T.side34 - 0.2, T.five34b]];
    hikers.forEach(([sd, at, sw], i) => {
      const k = prog(t, at, at + 0.3); if (k <= 0) return;
      const d = this.gap(sd, t), d1 = this.gap(sd, t + 0.05), moving = Math.abs(d1 - d) > 0.01, x = hx + sd * d;   // đường mòn dốc 0.5 px / px: bên trái thấp hơn hố, bên phải cao hơn
      const Y = hy - 0.5 * (x - hx);
      hiker(g, x, Y, HIKE, { step: moving ? t * 1.8 : 0, flip: sd > 0 });
      const lab = sd < 0 ? (t < T.four33b ? NEAR5[0].x : NEAR5[1].x) : (t < T.five34b ? NEAR5[2].x : NEAR5[3].x);
      card(g, lab, x, Y - 170, { size: 34, k });
    });

    // sổ NEAR5
    const sh = prog(t, T.four33a, T.nine33a) + prog(t, T.four33b, T.nine33b) + prog(t, T.five34a, T.one34a) + prog(t, T.five34b, T.one34b);
    const up = prog(t, T.limit36 + 0.2, T.limit36 + 0.8), kb = prog(t, T.trying32 + 0.1, T.trying32 + 0.6);
    ledger(g, 100, 170, 600, 360, { cols: [{ head: 'x', w: 0.4, isMath: true }, { head: 'answer', w: 0.6 }], rows: NEAR5.map(r => [r.x, r.v]), shown: sh, k: kb, lift: up });
    // hai mũi tên navy từ trái / phải tới hố; kết "→ 10"
    lifted(g, up, () => {
      const kt = prog(t, T.ten35, T.ten35 + 0.35);
      if (kt > 0) { g.save(); g.translate(850, 330); g.scale(outBack(kt, 2), outBack(kt, 2)); text(g, '→ 10', 0, 0, { font: `900 90px ${AR}`, align: 'center' }); g.restore(); }
    });
    // lim (x² − 25) / (x − 5) = 10
    if (t >= T.limit36) {
      text(g, 'lim', 120, 255, { font: `800 84px ${AR}`, k: prog(t, T.limit36, T.limit36 + 0.25) });
      typed(g, t, [{ s: 'x → 5', at: T.approaches36, dur: 0.4 }], 120, 318, { px: 44 });
      typed(g, t, [{ s: '(x² ', at: T.expr36 }, { s: '− 25)', at: T.expr36 + 0.25 }, { s: ' / ', at: T.expr36 + 0.5 }, { s: '(x ', at: T.expr36 + 0.65 }, { s: '− 5)', at: T.x36 - 0.2 }], 270, 255, { px: 70 });
      typed(g, t, [{ s: '= ', at: T.is36 }, { s: '10', at: T.ten36, color: C.ink, dur: 0.3 }], 270 + measureMath(g, '(x² − 25) / (x − 5)', 70) + 40, 255, { px: 84, wt: 900 });
    }
    secTag(g, 'Sneaking up', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
    mascots(g, t, [{ pose: 'ponder', a: -99, b: T.four33b - 0.3 }]);
  }
}
