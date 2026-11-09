// b14 · The area under the bowl (câu p2 55–57) — G3, ERA sheet, MỞ HỒI ★ ACT FIVE. VIEWS.area (trắc dọc 0…1, như a0 câu 7).
// câu 55: "CUT SMALL" / "ADD UP" + hai mũi tên ngược chiều ("opposite direction"); "countless small pieces" → 60 cột đất mọc đồng loạt thành MỘT khối.
// câu 56: nhãn 0 và 1 trên đáy, thước navy 0…1, thẻ AREA.  câu 57: "?" ("no simple formula"), rồi một hình chữ nhật mẫu ("rectangles").
import { C, AR, MO, H, smooth, clamp, lerp, ground, hill, columns, card, secTag, actTitle, figure, text, arrow, line, VIEWS, prog, lookup, outCubic } from '../kit.js';

export default class Area {
  static ERA = 'sheet';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b14');
    this.START = L(55).start;
    this.FROM = +Math.max(this.START - 2.6, L(54).end + 0.5).toFixed(3);
    this.T = {
      cutting: w(55, 'cutting'), opposite: w(55, 'opposite'), adding: w(55, 'adding'), countless: w(55, 'countless'), whole: w(55, 'whole'), e55: L(55).end,
      l56: L(56).start, area: w(56, 'area'), zero: w(56, 'zero'), one: w(56, 'one'), e56: L(56).end,
      l57: L(57).start, simple: w(57, 'simple'), curved: w(57, 'curved'), but: w(57, 'but'), rect: w(57, 'rectangles'), e57: L(57).end,
    };
    const T = this.T;
    for (const [a, b] of [['cutting', 'adding'], ['adding', 'countless'], ['countless', 'whole'], ['zero', 'one'], ['simple', 'but'], ['but', 'rect']]) if (!(T[a] < T[b])) throw new Error(`b14: mốc ${a} ≥ ${b}`);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.cutting, 'card'), c(T.countless + 0.3, 'tick'), c(T.area, 'card'), c(T.simple, 'question'), c(T.rect, 'pop')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, V = VIEWS.area;
    ground(g, 'sheet', t);
    hill(g, V, { a: -1.2, b: 3.6, t, rise: prog(t, F + 0.25, F + 1.1) });
    actTitle(g, t, this.START, 'ACT FIVE', 'Adding up thin slices');
    secTag(g, 'The area under the bowl', { k: prog(t, this.START + 0.4, this.START + 0.8), t });

    // ── câu 55: 60 cột đất = một khối ──
    columns(g, V, 60, { side: 'right', k: prog(t, T.countless, T.countless + 1.4), excess: 0 });
    const l55 = prog(t, T.e55 + 0.05, T.e55 + 0.55);
    card(g, 'CUT SMALL', 760, 270, { size: 44, mono: false, wt: 800, k: prog(t, T.cutting, T.cutting + 0.3), lift: l55 });
    card(g, 'ADD UP', 760, 400, { size: 44, mono: false, wt: 800, k: prog(t, T.adding, T.adding + 0.3), lift: l55 });
    const ko = prog(t, T.opposite, T.opposite + 0.4) * (1 - l55);
    arrow(g, 1010, 290, 1010, 410, ko, { w: 5, head: 16 }); arrow(g, 1080, 410, 1080, 290, ko, { w: 5, head: 16 });

    // ── câu 56: 0 … 1, AREA ──
    const x0 = V.X(0), x1 = V.X(1), kz = prog(t, T.zero, T.zero + 0.3), k1 = prog(t, T.one, T.one + 0.3);
    if (kz > 0) { line(g, x0, 925, x0, 925 + 45 * outCubic(kz), C.ink, 5); text(g, '0', x0, 1005, { font: `500 44px ${MO}`, align: 'center', k: kz }); }
    if (k1 > 0) { line(g, x1, 925, x1, 925 + 45 * outCubic(k1), C.ink, 5); text(g, '1', x1, 1005, { font: `500 44px ${MO}`, align: 'center', k: k1 }); }
    if (k1 > 0) arrow(g, x0 + 18, 955, x1 - 18, 955, k1, { w: 4, head: 14 });
    const l56 = prog(t, T.l57 + 0.2, T.l57 + 0.7);
    card(g, 'AREA', 940, 520, { size: 52, mono: false, wt: 900, color: C.soilInk, edge: C.soil, k: prog(t, T.area, T.area + 0.3), lift: l56 });

    // ── câu 57: "?" rồi hình chữ nhật mẫu ──
    const lq = prog(t, T.but, T.but + 0.45);
    if (t >= T.simple && lq < 1) text(g, '?', 700, 560 - outCubic(lq) ** 1.4 * 520, { font: `900 200px ${AR}`, align: 'center', k: prog(t, T.simple, T.simple + 0.25) });
    const kr = prog(t, T.rect, T.rect + 0.5);
    if (kr > 0) { const ya = V.Y(0), yt = V.Y(0.75 * 0.75), xa = V.X(0.5), xb = V.X(0.75), e = outCubic(kr);
      g.save(); g.fillStyle = 'rgba(251,247,234,0.38)'; g.fillRect(xa, ya - (ya - yt) * e, xb - xa, (ya - yt) * e);
      g.strokeStyle = C.ink; g.lineWidth = 6; g.lineJoin = 'round'; g.strokeRect(xa, ya - (ya - yt) * e, xb - xa, (ya - yt) * e); g.restore(); }

    // ── mascot pointer: câu 55–56 ──
    const mIn = prog(t, this.START + 0.5, this.START + 1.1), mOut = prog(t, T.e56 + 0.1, T.e56 + 0.6);
    if (mIn > 0 && mOut < 1) { g.save(); g.translate(0, outCubic(mOut) * 300); figure(g, 'pointer', 205, H, 262, mIn, { t }); g.restore(); }
  }
}
