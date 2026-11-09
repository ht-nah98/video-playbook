// c1 · Always a little short (p2, MỞ HỒI HAI) — thẻ hồi "ZERO POINT NINE, REPEATING · ANSWERS 2" (từ màn nhung);
//   bảng lật treo giữa: hàng lớn "0.999… = 1" (ô 9 lật mãi từ "forever", giống a0 khu D) + hàng phụ ghi chú;
//   thẻ trực giác bật lên ở "refuse" (lắc "không"), viết "STILL A / LITTLE SHORT" (KHÔNG X); trục số 0 → 1 với khe hở phóng đại viền
//   đứt giữa 0.999… và 1 ("an infinitely small gap?" — đó là hình của trực giác, có dấu hỏi); mascot `crossed` ở "feeling".
import { W, H, C, FLOOR, smooth, outCubic, prog, ground, reflect, bulbs, flap, flapW, flapSpin, ctr, gutCard, label, text,
  actTitle, card, figure, lookup, must } from '../kit.js';

const N1 = 10, C1 = 82, G1 = 10, H1 = 135;                   // hàng lớn: 10 ô, chữ 100 px
const N2 = 18, C2 = 40, G2 = 5, H2 = 65;                     // hàng phụ: 18 ô, chữ 48 px
const BW = Math.max(flapW(N1, C1, G1), flapW(N2, C2, G2)), MX = 330, MY = 150;   // bảng lệch trái: cột phải để nhân vật
const R1 = MY + 46, R2 = R1 + H1 + 18, MH = R2 + H2 + 46 - MY;
const AX0 = 300, AX1 = 1220, AY = 610;                       // trục số: 0 ở AX0, 1 ở AX1
const CX = 640, CY = 880;                                    // thẻ trực giác

export default class Short {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['crossed'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      puzzle: w(57, 'puzzle'), different: w(57, 'different'),
      hearing: w(58, 'hearing'), uneasy: w(58, 'uneasy'),
      zero: w(59, 'zero'), forever: w(59, 'forever'), exactly: w(59, 'exactly'), equal: w(59, 'equal'), one: w(59, 'one'),
      reaction: w(60, 'reaction'), refuse: w(60, 'refuse'),
      feels: w(61, 'feels'), short61: w(61, 'short'), one61: w(61, 'one'), infinitely: w(61, 'infinitely'), gap1: w(61, 'gap'),
      still2: w(61, 'still', 2), gap2: w(61, 'gap', 2),
      feeling: w(62, 'feeling'), explanation: w(62, 'explanation'), nod: w(62, 'nod'), think: w(62, 'think'), short62: w(62, 'short'),
    };
    this.START = L(57).start;
    // mở hồi: FROM = max(START − 2.6, câu cuối cảnh trước + 0.5) — BRIEF §63/§64
    this.FROM = Math.max(this.START - 2.6, L(56).end + 0.5);
    this.END = L(62).end;
    // số trên hình: "0.999… = 1" (CONTENT: 0,999… = 1); trục số 0 → 1
    this.V = { one: must('0.9 + 0.09 + 0.009 + 0.001', 1), lo: must('1 - 1', 0) };
    const T = this.T;
    this.SUB = [                                               // hàng phụ: [mốc, chữ] — mỗi lần lật = một tiếng flap
      [T.hearing, 'EXPLANATION HEARD'], [T.exactly, 'EXACTLY EQUAL'], [T.explanation, 'PEOPLE NOD…'],
    ];
    for (const [, s] of this.SUB) if ([...s].length > N2) throw new Error('c1: hàng phụ quá ' + N2 + ' ô: ' + s);
  }
  sfx() {
    const T = this.T;
    return [
      { t: this.START - 1.6, kind: 'flap' },                   // tên hồi lật vào (thẻ hồi)
      ...this.SUB.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.zero, kind: 'flap' }, { t: T.equal, kind: 'flap' },
      { t: T.feels, kind: 'pen' },
    ];
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    // ── bảng lật treo (rơi vào từ trên, FROM + 0.3) ──
    const drop = (1 - outCubic(prog(t, this.FROM + 0.3, this.FROM + 0.9))) * -520;
    reflect(g, FLOOR, d => {
      d.save(); d.translate(0, drop);
      bulbs(d, MX, MY, BW + 92, MH, t);
      const x1 = MX + 46 + (BW - flapW(N1, C1, G1)) / 2, x2 = MX + 46 + (BW - flapW(N2, C2, G2)) / 2, p1 = C1 + G1;
      // hàng lớn: ô chờ trống → "0.999…" ở "zero point nine…", "= 1" ở "equal to one"
      flap(d, ' '.repeat(N1), x1, R1, C1, 1, { gap: G1, h: H1 });
      const k1 = prog(t, T.zero, T.forever), k2 = prog(t, T.equal, T.one + 0.35);
      flap(d, '0.999…', x1, R1, C1, k1, { gap: G1, h: H1 });
      flap(d, ` = ${V.one}`, x1 + 6 * p1, R1, C1, k2, { gap: G1, h: H1 });
      if (t > T.forever && k1 >= 1) flapSpin(d, '9', x1 + 4 * p1, R1, C1, t - T.forever, { h: H1, per: 0.55 });
      // hàng phụ
      let cur = ' '.repeat(N2), prev = cur, k = 1;
      for (const [at, s] of this.SUB) { if (t < at) break; prev = cur; cur = ctr(s, N2); k = prog(t, at, at + 1.0); }
      flap(d, cur, x2, R2, C2, k, { from: prev, gap: G2, h: H2 });
      d.restore();
    });
    label(g, 'puzzle two', MX + (BW + 92) / 2, MY - 18 + drop, C.ink, 'center', 22, prog(t, T.puzzle, T.different + 0.3));

    // ── trục số: hình của trực giác — 0.999… dừng ngay trước 1, khe hở phóng đại viền đứt ──
    this.axis(g, t);

    // ── thẻ trực giác: bật lên ở "refuse", lắc "không" ở "refuse", viết ở "feels like … short"; nhảy lên ở "think" ──
    if (t > T.refuse - 0.1) {
      const r0 = T.refuse + 0.35, shake = t > r0 && t < r0 + 0.9 ? Math.sin((t - r0) * 22) * 0.06 * (1 - (t - r0) / 0.9) : 0;
      const hop = Math.sin(Math.PI * prog(t, T.think, T.think + 0.45)) * 34 + Math.sin(Math.PI * prog(t, T.short62 - 0.1, T.short62 + 0.3)) * 18;
      gutCard(g, 'STILL A\nLITTLE SHORT', CX, CY - hop, 520, 240, prog(t, T.feels, T.short61 + 0.25),
        { rise: prog(t, T.refuse - 0.1, T.refuse + 0.35), rot: -0.04 + shake, seed: 47 });
    }

    // ── nhân vật: khoanh tay, vẫn không tin ("the feeling is strong") ──
    const km = Math.min(prog(t, T.feeling - 0.1, T.feeling + 0.3), 1 - prog(t, this.END + 0.6, this.END + 1.0));
    if (km > 0) figure(g, 'crossed', 1600, 1080, 760, km);

    card(g, prog(t, this.START + 0.2, this.START + 1.0), 'ACT TWO', 'ALWAYS A LITTLE SHORT');
    actTitle(g, t, this.START, 'TWO', 'ZERO POINT NINE, REPEATING', 'ANSWERS 2');
  }

  axis(g, t) {
    const T = this.T, V = this.V, ka = smooth(prog(t, T.short61, T.one61 + 0.5));
    if (ka <= 0) return;
    const gx = AX1 - 70;                                       // khe hở phóng đại (không theo tỉ lệ — đó là cảm giác)
    g.save(); g.lineCap = 'round';
    g.strokeStyle = C.ink; g.globalAlpha = 0.85; g.lineWidth = 4;
    g.beginPath(); g.moveTo(AX0, AY); g.lineTo(AX0 + (AX1 + 40 - AX0) * ka, AY); g.stroke();
    g.globalAlpha = 1;
    const tick = (x, k) => { if (k <= 0) return; g.beginPath(); g.moveTo(x, AY - 18 * k); g.lineTo(x, AY + 18 * k); g.stroke(); };
    tick(AX0, ka); tick(AX1, prog(t, T.one61, T.one61 + 0.3));
    g.restore();
    text(g, String(V.lo), AX0, AY - 34, 46, C.ink, { align: 'center', k: ka * 2 });
    text(g, String(V.one), AX1 + 8, AY - 34, 46, C.ink, { align: 'left', k: prog(t, T.one61, T.one61 + 0.3) * 1.2 });
    // 0.999…: vạch ngay trước 1 ở "an infinitely"
    const k9 = prog(t, T.infinitely - 0.1, T.infinitely + 0.3);
    if (k9 > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.moveTo(gx, AY - 18 * k9); g.lineTo(gx, AY + 18 * k9); g.stroke(); g.restore();
      text(g, '0.999…', gx - 10, AY - 34, 46, C.ink, { align: 'right', k: k9 * 1.3 });
    }
    // khe hở: khung viền đứt vẽ quanh ở "gap"
    const kg = prog(t, T.gap1 - 0.1, T.gap1 + 0.5);
    if (kg > 0) {
      g.save(); g.strokeStyle = C.dim; g.lineWidth = 3; g.setLineDash([8, 6]);
      const x0 = gx + 4, w = AX1 - gx - 8, y0 = AY - 30, h = 60, per = 2 * (w + h);
      g.lineDashOffset = 0; g.beginPath();
      // vẽ dần theo chu vi
      let left = per * kg; const pts = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0]];
      g.moveTo(...pts[0]);
      for (let i = 1; i < pts.length && left > 0; i++) {
        const [ax, ay] = pts[i - 1], [bx, by] = pts[i], l = Math.hypot(bx - ax, by - ay), u = Math.min(1, left / l);
        g.lineTo(ax + (bx - ax) * u, ay + (by - ay) * u); left -= l;
      }
      g.stroke(); g.restore();
    }
    label(g, 'an infinitely small gap?', AX1, AY + 62, C.dim, 'right', 20, prog(t, T.infinitely, T.gap1 + 0.3));
    label(g, 'but still a gap', AX1, AY + 96, C.dim, 'right', 20, prog(t, T.still2, T.gap2 + 0.4));
  }
}
