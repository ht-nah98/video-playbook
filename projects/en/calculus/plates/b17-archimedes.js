// b17 · Archimedes (câu p2 67–68) — ERA cover: bìa sổ đo vải xanh, ảnh Fetti kẹp lên bìa + tờ giấy kẹp có hình mảnh parabol
// vẽ tay. "filling it with smaller and smaller shapes" = tam giác nội tiếp (đất nâu) lớp 1 → 2 → 4 → 8; "trapping the answer from
// both sides" = tam giác ngoài (tiếp tuyến, navy nét đứt) "TOO BIG" + các tam giác trong "TOO SMALL"; "in the same spirit as this" =
// tờ nhỏ với 4 cột đất (kit.mini 'strips'). Mảnh parabol y = 1 − x² (chord ở đáy) để tam giác ngoài (đỉnh (0, 2)) vẫn nằm trên giấy.
import { H, C, AR, clamp, lerp, prog, lookup, outCubic, drop, pop, shadowRR, ground, photo, photoImages, card, text, pen, line, rr,
  secTag, figure, mini, plot, view, STRATA } from '../kit.js';

const SHEET = { x: 130, y: 300, w: 800, h: 490 };
const V = view(0, 0, 530, 760, 330, 205);                  // (0, 0) ở giữa chord; v 0 … 2 → y 760 … 350
const f = u => 1 - u * u;
const P = (u, v) => [V.X(u), V.Y(v)];
/** Thế hệ n tam giác nội tiếp: [u0, um, u1] (gen 0 = tam giác chord; gen n = 2^n tam giác nhỏ trên các cạnh còn lại). */
const GEN = n => { if (!n) return [[-1, 0, 1]]; const out = [], step = 2 / 2 ** n; for (let i = 0; i < 2 ** n; i++) { const a = -1 + i * step; out.push([a, a + step / 2, a + step]); } return out; };
const GEN_CNT = [1, 2, 4, 8];

export default class Archimedes {
  static ERA = 'cover';
  static IMAGES = photoImages('archimedes');
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b17');
    this.T = {
      modern: w(67, 'modern'), more: w(68, 'more'), arch: w(68, 'archimedes'), area: w(68, 'area'), curved: w(68, 'curved'), parabola: w(68, 'parabola'),
      filling: w(68, 'filling'), smaller1: w(68, 'smaller', 1), smaller2: w(68, 'smaller', 2), shapes: w(68, 'shapes'),
      trapping: w(68, 'trapping'), both: w(68, 'both'), sides: w(68, 'sides'), same: w(68, 'same'), spirit: w(68, 'spirit'),
    };
    this.START = L(67).start;
    this.FROM = Math.max(this.START - 1.2, tl.lines[66].end + 0.5);
    this.GENT = [this.T.filling, this.T.smaller1, this.T.smaller2, this.T.shapes];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.more, 'card'), c(T.arch, 'page'), c(T.filling, 'tick'), c(T.trapping, 'pen'), c(T.both, 'card')];
  }
  render(g, t) {
    const T = this.T, S = this.START, FROM = this.FROM;
    ground(g, 'cover', t);
    secTag(g, 'Archimedes', { k: prog(t, S + 0.2, S + 0.6), t });

    // ── tờ giấy kẹp (hình vẽ tay) rơi xuống ngay đầu cảnh ──
    const ks = prog(t, FROM + 0.3, FROM + 0.9);
    if (ks > 0) {
      g.save(); g.translate(0, -(1 - drop(ks)) * 900);
      shadowRR(g, SHEET.x, SHEET.y, SHEET.w, SHEET.h, 8, { col: 'rgba(0,0,0,0.35)', blur: 18, ox: 10, oy: 14 });
      g.fillStyle = C.paper; g.fill(rr(SHEET.x, SHEET.y, SHEET.w, SHEET.h, 8));
      g.save(); g.clip(rr(SHEET.x, SHEET.y, SHEET.w, SHEET.h, 8));
      for (let yy = SHEET.y + 46; yy < SHEET.y + SHEET.h; yy += 40) line(g, SHEET.x, yy, SHEET.x + SHEET.w, yy, C.rule, 1.5, 'butt');
      line(g, SHEET.x + 56, SHEET.y, SHEET.x + 56, SHEET.y + SHEET.h, C.margin, 2, 'butt');
      g.restore();
      // chord (đáy mảnh) + đường parabol vẽ dần theo lời
      const kc = prog(t, T.area, T.area + 0.35), kp = prog(t, T.curved, T.parabola + 0.1);
      if (kc > 0) { const [x0, y0] = P(-1, 0), [x1, y1] = P(1, 0); pen(g, x0, y0, x1, y1, kc, { w: 5 }); }
      // các thế hệ tam giác nội tiếp (đất nâu = diện tích)
      GEN_CNT.forEach((_, n) => {
        const kg = prog(t, this.GENT[n], this.GENT[n] + 0.5); if (kg <= 0) return;
        GEN(n).forEach(([a, m, b], i) => {
          const e = pop(kg), pts = [P(a, f(a)), P(m, f(m)), P(b, f(b))], cx = (pts[0][0] + pts[2][0]) / 2, cy = (pts[0][1] + pts[2][1]) / 2;
          { g.save(); g.translate(cx, cy); g.scale(e, e); g.translate(-cx, -cy);
            g.beginPath(); pts.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
            g.fillStyle = STRATA[n]; g.fill(); g.strokeStyle = C.soilInk; g.lineWidth = n > 2 ? 2.5 : 3.5; g.lineJoin = 'round'; g.stroke(); g.restore(); }
        });
      });
      if (kp > 0) plot(g, V, f, -1, 1, { color: C.curve, w: 7, k: kp });
      // tam giác ngoài (tiếp tuyến ở hai đầu chord gặp nhau ở (0, 2)) — chặn từ trên
      const sideK = [prog(t, T.trapping, T.trapping + 0.4), prog(t, T.trapping + 0.3, T.trapping + 0.7)];
      const [lx, ly] = P(-1, 0), [rx, ry] = P(1, 0), [ax, ay] = P(0, 2);
      g.save(); g.setLineDash([16, 10]); pen(g, lx, ly, ax, ay, sideK[0], { w: 5 }); pen(g, rx, ry, ax, ay, sideK[1], { w: 5 }); g.restore();
      // TOO SMALL (trong) / TOO BIG (ngoài)
      card(g, 'TOO SMALL', 285, 500, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.both, T.both + 0.3), rot: -0.02 });
      card(g, 'TOO BIG', 765, 410, { size: 30, mono: false, wt: 800, edge: C.ink, k: prog(t, T.sides, T.sides + 0.3), rot: 0.02 });
      g.restore();
    }

    // ── trên cùng: "more than two thousand years ago" ──
    const lift = prog(t, T.trapping - 0.1, T.trapping + 0.4);
    card(g, 'MORE THAN 2,000 YEARS AGO', 560, 230, { size: 40, mono: false, wt: 800, k: prog(t, T.more, T.more + 0.3), lift, rot: -0.01 });

    // ── ảnh Archimedes kẹp lên bìa ──
    photo(g, 'archimedes', 1010, 150, 400, 520, { k: prog(t, T.arch, T.arch + 0.6), from: 'right', rot: 0.02, zoom: 1.0 + 0.04 * prog(t, T.arch, T.same) });

    // ── "same spirit as this": tờ nhỏ với 4 cột đất ──
    const kt = prog(t, T.same, T.same + 0.4);
    if (kt > 0) {
      const e = pop(kt);
      g.save(); g.translate(1650, 440); g.rotate(0.03); g.scale(e, e); g.translate(-1650, -440);
      shadowRR(g, 1535, 300, 230, 280, 8, { col: 'rgba(0,0,0,0.35)', blur: 14, ox: 8, oy: 10 });
      g.fillStyle = C.paper; g.fill(rr(1535, 300, 230, 280, 8)); g.restore();
      mini(g, 'strips', 1650, 450, 0.7, { k: prog(t, T.same + 0.15, T.spirit + 0.5) });
      card(g, 'SAME SPIRIT', 1650, 640, { size: 30, mono: false, wt: 800, edge: C.soil, k: prog(t, T.spirit, T.spirit + 0.3) });
    }

    // ── mascot: ponder, 3–8 s quanh câu ──
    const kIn = prog(t, T.more + 0.2, T.more + 0.8), kOut = prog(t, T.both + 0.1, T.both + 0.6);
    if (kIn > 0 && kOut < 1) figure(g, 'ponder', 205, H, 262, Math.min(kIn, 1 - kOut), { t });
  }
}
