// d2 · Which way the cut goes — chiều ngược lại: d ∥ P; tờ bìa Q chứa d xoay quanh d (bản lề) cho tới khi cắt P →
// nếp cắt ∥ d (phần Q dưới P: viền nét đứt). Rồi camera lia sang một khối hộp: mặt phẳng chứa cạnh đáy d cắt mặt trên
// theo một nét ∥ d — "each cut has to run" theo hướng đó.
import { C, prog, lookup, outCubic, smooth, ground, camLerp, sheet, sheetShadow, thread, dot3, lamp, line, it, label,
  formula, sectionTag, poly, clamp, box, solid, shadow, add, sub, mul, norm, lerp3, must } from '../kit.js';

const SH = [[-2.4, -1.1, 0], [2.4, -1.1, 0], [2.4, 2.5, 0], [-2.4, 2.5, 0]];
const Y = 1.2, HD = 1.3, QX = 2.0, S0 = -0.6, S1 = 2.3;   // d như d1; Q = tờ chứa d, trải theo v(φ) từ S0 tới S1
const CAMA = { yaw: -36, pitch: 26, dist: 10.4, target: [0.1, 0.7, 0.5], cx: 1230, cy: 610 };
const CAMB = { yaw: -30, pitch: 30, dist: 9.6, target: [8.8, 0.6, 0.7], cx: 1230, cy: 640 };
// khối hộp: góc (7.5, −0.4, 0), 2.6 × 2.2 × 1.8; d = cạnh đáy trước; mặt cắt chứa d đi lên tới y = 1.0 trên mặt trên
const BO = [7.5, -0.4, 0], BA = 2.6, BB = 2.2, BC = 1.8, CUTY = 1.0;
const BOX = box(BA, BB, BC), BV = BOX.V.map(p => add(p, BO)), LB = [5.5, -2.5, 9];
const SEC = [[BO[0], BO[1], 0], [BO[0] + BA, BO[1], 0], [BO[0] + BA, CUTY, BC], [BO[0], CUTY, BC]];
const bump = (t, a, d = 0.9) => Math.sin(Math.PI * prog(t, a, a + d));
const reveal = (t, segs, n) => segs.reduce((s, [a, b, c]) => s + prog(t, a, b) * c, 0) / n;
/** Hai vạch chéo nhỏ (>>) giữa đoạn a→b trên màn hình — dấu song song. */
function chev(g, a, b, k, color = C.ink, u = 0.5) {
  if (k <= 0) return; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), ex = dx / l, ey = dy / l;
  [-9, 9].forEach(o => { const cx = a[0] + dx * u + ex * o, cy = a[1] + dy * u + ey * o;
    line(g, [cx - ex * 12 - ey * 11, cy - ey * 12 + ex * 11], [cx, cy], color, 3, [], k);
    line(g, [cx - ex * 12 + ey * 11, cy - ey * 12 - ex * 11], [cx, cy], color, 3, [], k); });
}

export default class Cut {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.START = L(49).start;
    this.FROM = Math.max(this.START - 1.2, L(48).end + 0.5);
    this.T = {
      other: w(49, 'other'), par50: w(50, 'parallel', 1), any: w(50, 'any'), contains: w(50, 'contains'), cuts1: w(50, 'cuts', 1),
      cuts2: w(50, 'cuts', 2), along: w(50, 'along'), parB: w(50, 'parallel', 2), d50: w(50, 'd', 3),
      key: w(51, 'key'), family: w(51, 'family'), slice: w(51, 'slice'), solid: w(51, 'solid'), dir: w(51, 'direction'),
      cut: w(51, 'cut'), run: w(51, 'run'), end: L(51).end,
    };
    // mặt cắt chứa d: cạnh trên của nó song song với d (cùng hướng x)
    const u = norm(sub(SEC[1], SEC[0])), v = norm(sub(SEC[2], SEC[3]));
    must(`${u[0] * v[0] + u[1] * v[1] + u[2] * v[2]}`, 1);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.any + 0.1, kind: 'flap' }, { t: T.parB, kind: 'pen' }, { t: T.slice, kind: 'flap' }, { t: T.cut, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const pan = smooth(prog(t, T.key, T.slice - 0.1)), drift = clamp((t - this.FROM) * 0.25, 0, 3);
    const cam = camLerp({ ...CAMA, yaw: CAMA.yaw + drift }, { ...CAMB, yaw: CAMB.yaw + clamp((t - T.slice) * 0.3, 0, 1.5) }, pan), P = cam.P;

    // ── Q: tờ chứa d, xoay quanh d từ 15° tới 55° (cắt P khi φ ≥ asin(HD / S1)) ──
    const kQ = outCubic(prog(t, T.any - 0.2, T.any + 0.5));
    const phi = (15 + 40 * smooth(prog(t, T.any, T.cuts1 + 0.3))) * Math.PI / 180;
    const v = [0, -Math.cos(phi), -Math.sin(phi)], at = (x, s) => [x, Y + v[1] * s, HD + v[2] * s];
    const sc = HD / Math.sin(phi), sTop = Math.min(S1, sc), cutting = S1 > sc;
    const s1 = S0 + (S1 - S0) * kQ;
    // phần Q dưới P: viền nét đứt (vẽ trước P)
    // P
    sheetShadow(g, cam, SH, { a: 0.16 });
    const cs = sheet(g, cam, SH, { k: 1 });
    const pP = P([-2.0, -0.75, 0]); it(g, 'P', pP[0] - 6, pP[1] + 18, 64, C.ink);
    // phần Q xuyên xuống dưới P: viền nét đứt, vẽ SAU P (nhìn xuyên giấy)
    if (cutting && kQ >= 1) { g.save(); g.strokeStyle = C.inkA(0.5); g.lineWidth = 2.2; g.setLineDash([9, 9]);
      [[at(-QX, sc), at(-QX, S1)], [at(-QX, S1), at(QX, S1)], [at(QX, S1), at(QX, sc)]].forEach(([a, b]) => {
        const p = P(a), q = P(b); g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); }); g.restore(); }
    // bóng mềm của Q trên P, rồi Q (phần trên P)
    if (kQ > 0) {
      const top = Math.min(sTop, s1), Qc = [at(-QX, S0), at(QX, S0), at(QX, top), at(-QX, top)];
      g.save(); poly(g, cs); g.clip(); sheetShadow(g, cam, Qc.map(p => [p[0], p[1], 0]), { a: 0.14 * kQ }); g.restore();
      sheet(g, cam, Qc, { k: kQ, fill: [236, 229, 214], thick: 0.04 });
      const pq = P(at(-QX, S0)); it(g, 'Q', pq[0] - 52, pq[1] + 10, 60, C.ink, { k: kQ });
    }
    // nếp cắt trên P (∥ d)
    const yc = Y + v[1] * sc, kC = prog(t, T.along, T.along + 0.6);
    if (cutting) {
      const a = P([-QX, yc, 0]), b = P([QX, yc, 0]);
      line(g, a, b, C.ink, 7, [], kC);
      chev(g, a, b, prog(t, T.parB, T.parB + 0.3), C.ink, 0.62);
      it(g, 'cut', b[0] + 18, b[1] + 16, 54, C.ink, { k: kC });
    }
    // d (trên mép Q, lơ lửng trên P)
    const pa = P([-QX, Y, HD]), pb = P([QX, Y, HD]);
    line(g, pa, pb, C.ink, 5 + 3 * bump(t, T.contains), []);
    chev(g, pa, pb, prog(t, T.parB, T.parB + 0.3), C.ink, 0.62);
    [pa, pb].forEach(p => { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(p[0], p[1], 5, 0, 7); g.fill(); g.restore(); });
    it(g, 'd', pb[0] + 18, pb[1] - 12, 60, C.ink);

    // ── khối hộp bị cắt: mặt cắt chứa cạnh đáy d → nét cắt trên mặt trên ∥ d ──
    if (pan > 0) {
      shadow(g, cam, BV, LB, { a: 0.4 });
      solid(g, cam, BOX, BV, LB);
      const kSec = outCubic(prog(t, T.slice, T.solid + 0.6));
      const top = [lerp3(SEC[1], SEC[2], kSec), lerp3(SEC[0], SEC[3], kSec)], sec = [SEC[0], SEC[1], ...top].map(P);
      if (kSec > 0) {
        g.save(); g.fillStyle = C.inkA(0.16); poly(g, sec); g.fill(); g.restore();
        line(g, sec[1], sec[2], C.inkA(0.5), 2.2, [9, 9]);          // mép trên mặt phải (khuất)
        line(g, sec[0], sec[3], C.ink, 3);                            // mép trên mặt trái (thấy)
      }
      // nét cắt trên mặt trên + dấu ∥ với d
      const c0 = P(SEC[3]), c1 = P(SEC[2]), kTop = prog(t, T.dir, T.dir + 0.6);
      line(g, c0, c1, C.ink, 7, [], kTop * (kSec >= 1 ? 1 : 0));
      const d0 = P(SEC[0]), d1 = P(SEC[1]);
      line(g, d0, d1, C.ink, 7);
      chev(g, d0, d1, prog(t, T.cut, T.cut + 0.3), C.ink, 0.5); chev(g, c0, c1, prog(t, T.cut, T.cut + 0.3), C.ink, 0.5);
      it(g, 'd', d1[0] + 16, d1[1] + 34, 60, C.ink, { k: prog(t, T.slice - 0.6, T.slice) });
      const pt = P([BO[0] + 0.35, BO[1] + BB - 0.3, BC]);
      it(g, 'P', pt[0] + 10, pt[1] - 8, 54, C.ink, { k: prog(t, T.slice - 0.6, T.slice) });
    }

    lamp(g, 1230, 150, { on: 1 });

    // chữ: định lý d1 (nhắc mờ) → chiều ngược lại
    sectionTag(g, 'Act III · which way the cut goes', 1);
    const FB = ['d', { para: true }, 'd′', { gap: 0.25 }, 'in P', { gap: 0.35 }, '→', { gap: 0.25 }, 'd', { para: true }, 'P'];
    formula(g, FB, 96, 222, 54, C.lead, prog(t, this.FROM + 0.3, this.FROM + 1.1));
    label(g, 'the other direction', 96, 282, { size: 24, k: prog(t, T.other, T.other + 0.6) });
    const F2 = ['d', { para: true }, 'P', { gap: 0.35 }, '→', { gap: 0.25 }, 'cut', { para: true }, 'd'];
    formula(g, F2, 96, 372, 72, C.ink, reveal(t, [[T.par50, T.par50 + 0.6, 3], [T.along, T.d50 + 0.5, 6]], F2.length));
    it(g, 'slice a solid:', 96, 470, 46, C.lead, { wt: 500, k: prog(t, T.slice, T.solid + 0.4) });
    it(g, 'each cut runs parallel to d', 96, 530, 46, C.ink, { wt: 500, k: prog(t, T.dir, T.run) });
  }
}
