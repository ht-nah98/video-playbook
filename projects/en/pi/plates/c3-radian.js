// c3 · A unit nobody chose (p2 câu 33–41). Vòng compa xanh bán kính 1; một sợi dây dài ĐÚNG một bán kính (độ dài
// cung — không dùng dividers: dividers đo dây cung, mâu thuẫn với lục giác của b2) bóc khỏi bán kính, quấn lên vành →
// góc quét = 1 rad ≈ 57.3°; cả vòng 2π · nửa vòng π (cung xanh dày) · ¼ vòng π/2 vẽ đúng từ; dây quấn tiếp 1, 2, 3 lần +
// 0.1416… = π dọc nửa vòng; ghi chú chì τ = 2π (τ vẽ tay — không font nào có τ).
// Bố cục: tâm (1000, 560) thay cho chuẩn (760, 540) — c4 nối tiếp (CONTINUES) cần chỗ cho tường + sóng bên PHẢI cùng
// hàng với vòng tròn, nên chữ của c3 dồn sang cột TRÁI / dải dưới, phần phải (x ≥ 1340 tờ giấy) để trống cho c4.
import { C, CG, PI, clamp, outCubic, smooth, prog, ground, drift, card, typed, note, line, compassCircle, pivot, arc,
  arrowHead, leader, ring, hand, lookup, must, fix } from '../kit.js';

export const O = [1000, 560], R = 280;                  // vòng tròn compa (toạ độ tờ giấy) — c4 dùng lại
const P = (a, r = R) => [O[0] + r * Math.cos(a), O[1] - r * Math.sin(a)];
const LX = 210, VX = 470;                               // cột trái: nhãn / giá trị

/**
 * Sợi dây dài ĐÚNG một bán kính (độ dài cung, không phải dây cung): phần quấn theo vành từ góc a, dài w rad (cung
 * bán kính RS), phần còn lại thẳng theo tiếp tuyến. lift = nhấc ra khỏi tờ (trượt lên).
 */
const RS = R + 24;
function string(g, a, w, dir, k = 1, lift = 0) {
  if (k <= 0) return;
  const L = R, wrapped = Math.min(w, 1), rest = L * (1 - wrapped);
  const pts = [];
  for (let i = 0; i <= 40; i++) { const u = a + wrapped * i / 40; pts.push([O[0] + RS * Math.cos(u), O[1] - RS * Math.sin(u) + lift]); }
  const e = a + wrapped, [ex, ey] = pts.at(-1), d = dir ?? [-Math.sin(e), -Math.cos(e)];
  if (rest > 0.5) pts.push([ex + d[0] * rest, ey + d[1] * rest]);
  line(g, pts, C.leadT, 3.2, { k });
  if (k >= 1) for (const q of [pts[0], pts.at(-1)]) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(q[0], q[1], 5, 0, 7); g.fill(); g.restore(); }
}
/** τ vẽ tay bằng chì (không font nào có τ — đã kiểm getBestCmap). (x, y) = chân chữ trái, s = cao. */
export function tau(g, x, y, s, k = 1, color = C.leadT) {
  if (k <= 0) return;
  const bar = Array.from({ length: 13 }, (_, i) => { const u = i / 12; return [x + u * s * 0.85, y - s * 0.82 - Math.sin(u * PI * 0.5) * s * 0.06 + (u < 0.2 ? (0.2 - u) * s * 0.5 : 0)]; });
  const stem = Array.from({ length: 13 }, (_, i) => { const u = i / 12; return [x + s * 0.42 - Math.sin(u * PI * 0.5) * s * 0.04 + (u > 0.8 ? (u - 0.8) * s * 1.2 : 0), y - s * 0.86 + u * s * 0.86]; });
  hand(g, bar, { w: 2.6, color, jit: 0.4, seed: 21, k: clamp(k * 2) });
  hand(g, stem, { w: 2.6, color, jit: 0.4, seed: 23, k: clamp(k * 2 - 1) });
}

export default class Radian {
  static ERA = 'vellum';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      radian: w(33, 'radian'), nobody: w(33, 'nobody'), pick: w(33, 'pick'), number: w(33, 'number'),
      circle: w(34, 'circle'), radius: w(34, 'radius'), one: w(34, 'one'), walk: w(34, 'walk'), edge: w(34, 'edge'),
      one2: w(34, 'one', 2), radius2: w(34, 'radius', 2),
      angle: w(35, 'angle'), swept: w(35, 'swept'), centre: w(35, 'centre'), radian35: w(35, 'radian'),
      fs: w(35, 'fifty-seven'), degrees: w(35, 'degrees'), definition: w(35, 'definition'),
      pi36: w(36, 'pi'), steps: w(36, 'steps'), circumference: w(36, 'circumference'), twoPi36: w(36, 'two'), end36: L(36).end,
      full: w(37, 'full'), two37: w(37, 'two'), half: w(37, 'half'), pi37b: w(37, 'pi', 2), quarter: w(37, 'quarter'),
      over: w(37, 'over'), end37: L(37).end,
      isnt: w(38, "isn't"), circles38: w(38, 'circles'),
      travel: w(39, 'travel'), edge39: w(39, 'edge'), halfway: w(39, 'halfway'), round: w(39, 'round'), one39: w(39, 'one'),
      natural: w(39, 'natural'), end39: L(39).end,
      argue: w(40, 'argue'), full40: w(40, 'full'), two40: w(40, 'two'), tau: w(40, 'tau'), end40: L(40).end,
      story: w(41, 'story'), turning: w(41, 'turning'), end41: L(41).end,
    };
    this.START = L(33).start; this.FROM = this.START - 1.2;
    // các số lên hình — tính, không gõ tay (CONTENT.md: 1 rad = 57.2958°, nửa vòng = π)
    this.DEG = fix('180 / Math.PI', 1); must(`${this.DEG} === 57.3`, true); must('180 / Math.PI > 57.29 && 180 / Math.PI < 57.30', true);
    this.LEFT = fix('Math.PI - 3', 4); must(`'${this.LEFT}' === '0.1416'`, true); must('3 < Math.PI && Math.PI < 4', true);
  }
  cam(t) { return drift(t, this.FROM); }
  sfx() {
    const T = this.T;
    return [
      { t: T.circle, kind: 'pen' }, { t: T.one2, kind: 'tick' }, { t: T.radian35, kind: 'tick' },
      { t: T.definition, kind: 'tick' }, { t: T.circumference, kind: 'tick' }, { t: T.half, kind: 'pen' }, { t: T.isnt, kind: 'tick' },
      { t: T.edge39 - 0.3, kind: 'tick' }, { t: T.natural, kind: 'tick' }, { t: T.tau, kind: 'tick' },
    ];
  }
  render(g, t) {
    const c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y); this.plate(g, t); g.restore();
    this.card(g, t);
  }
  card(g, t) { card(g, prog(t, this.FROM + 0.9, this.FROM + 2.3), 'II', 'NOBODY CHOSE', 'the radian · radius 1'); }
  /** Sợi dây một bán kính: v = xoay từ nằm trên bán kính lên tiếp tuyến, u = phần đã quấn lên vành, s = số lần đã
   *  quấn lại (0 → 2) ở câu 39; reach = quãng đường đo được dọc vành (rad). Một hàm của t. */
  walk(t) {
    const T = this.T;
    const v = smooth(prog(t, T.walk, T.edge - 0.05)), u = smooth(prog(t, T.edge, T.radius2 + 0.15));
    const s1 = smooth(prog(t, T.travel, T.edge39 - 0.3)), s2 = smooth(prog(t, T.edge39 + 0.1, T.halfway - 0.1));
    const s = s1 + s2, rem = smooth(prog(t, T.halfway, T.round + 0.2)) * (PI - 3);
    return { v, u, s, reach: Math.max(u, s + 1) + rem, rem };
  }
  plate(g, t) {
    const T = this.T, W8 = this.walk(t);
    // ── câu 33: tiêu đề cột trái + chốt compa ──
    note(g, 'a radian', LX, 270, prog(t, T.radian, T.radian + 0.4), { color: C.ink, size: 24 });
    typed(g, 'Nobody had to', LX, 340, prog(t, T.nobody - 0.1, T.pick), `italic 600 54px ${CG}`, C.ink);
    typed(g, 'pick a number.', LX, 402, prog(t, T.pick - 0.1, T.number + 0.4), `italic 600 54px ${CG}`, C.ink);
    pivot(g, O[0], O[1], prog(t, T.radian, T.radian + 0.5));
    // ── câu 34: vòng compa bán kính 1, rồi sợi dây một bán kính quấn dọc mép ──
    compassCircle(g, O[0], O[1], R, { k: prog(t, T.circle, T.one + 0.4), a0: 1.5 });   // chỗ nối nằm dưới nửa vòng xanh
    // nửa vòng = π (xanh dày, câu 37) — vẽ dưới các nét mực
    arc(g, O[0], O[1], R, 0, PI, C.blue, 10, smooth(prog(t, T.half, T.half + 0.6)));
    line(g, [O, P(0)], C.ink, 2.4, { k: prog(t, T.radius, T.radius + 0.4) });
    typed(g, '1', O[0] + 140, O[1] + 46, prog(t, T.one, T.one + 0.2), `italic 600 40px ${CG}`, C.ink, { align: 'center' });
    // quãng đường đã đi dọc mép (mực, ngay ngoài mép) + vạch ở mỗi bước
    if (t > T.edge) arc(g, O[0], O[1], R + 12, 0, W8.reach, C.ink, 4);
    const tickAt = (a, k) => { if (k > 0) line(g, [P(a, R - 16), P(a, R + 22)], C.ink, 2.6, { k }); };
    tickAt(0, prog(t, T.walk, T.walk + 0.2));
    [1, 2, 3].forEach(n => {
      const at = n === 1 ? T.radius2 + 0.15 : n === 2 ? T.edge39 - 0.3 : T.halfway - 0.1;
      tickAt(n, prog(t, at, at + 0.15));
      const [x, y] = P(n - 0.5, R - 40);
      typed(g, String(n), x, y + 14, prog(t, at, at + 0.15), `italic 600 40px ${CG}`, C.ink, { align: 'center' });
    });
    tickAt(PI, prog(t, T.round, T.round + 0.2));
    // sợi dây một bán kính: nằm trên bán kính → dựng lên tiếp tuyến ở "walk" → quấn lên vành tới "radius";
    // câu 39 quấn tiếp lần 2, 3 (vạch 2, 3), phần dư 0.1416… tới π; rồi nhấc lên ra khỏi tờ.
    const out = outCubic(prog(t, T.one39, T.one39 + 0.8));
    if (out < 1 && t > T.walk - 0.3) {
      const ang = PI + W8.v * PI / 2, d = W8.u > 0 ? null : [Math.cos(ang), Math.sin(ang)];
      string(g, W8.s, W8.u, d, prog(t, T.walk - 0.3, T.walk), -900 * out * out);
    }
    // ── câu 35: góc quét ở tâm = 1 radian ≈ 57.3° ──
    line(g, [O, P(1)], C.ink, 2.4, { k: prog(t, T.angle, T.swept + 0.2) });
    const kw = prog(t, T.swept, T.centre + 0.2);
    arc(g, O[0], O[1], 54, 0, 1, C.ink, 2, kw);
    if (kw >= 1) arrowHead(g, ...P(1, 54), -1 - PI / 2, C.ink, 12);
    note(g, 'swept angle = 1 rad', LX, 466, prog(t, T.radian35 - 0.3, T.radian35 + 0.4), { color: C.ink, size: 22 });
    note(g, `≈ ${this.DEG}°`, LX + 316, 466, prog(t, T.fs, T.degrees + 0.3), { color: C.ink, size: 22 });
    ring(g, LX + 205, 458, 228, 30, prog(t, T.definition, T.definition + 0.5), { color: C.leadT, w: 2.4 });
    // ── câu 36: π bước vào: chu vi bán kính 1 = 2π (cột trái) ──
    note(g, 'where π steps in', LX, 535, prog(t, T.pi36, T.steps + 0.5), { size: 22 });
    const row = (label, val, y, a, b) => {
      note(g, label, LX, y, prog(t, a, a + 0.5), { color: C.ink, size: 22 });
      typed(g, val, VX, y + 4, prog(t, b, b + 0.3), `italic 700 46px ${CG}`, C.blue);
    };
    row('circumference', '2π', 590, T.circumference - 0.2, T.twoPi36);
    // ── câu 37: cả vòng 2π · nửa vòng π · ¼ vòng π/2 — vẽ trên hình đúng từ ──
    row('full turn', '2π', 655, T.full, T.two37);
    row('half turn', 'π', 720, T.half, T.pi37b);
    row('quarter turn', 'π/2', 785, T.quarter, T.over);
    const kf = prog(t, T.full, T.full + 0.9), af = 2 * PI - 0.14;
    arc(g, O[0], O[1], R + 56, 0, af, C.ink, 1.6, kf, { dash: [10, 7] });
    if (kf >= 1) arrowHead(g, ...P(af, R + 56), -af - PI / 2, C.ink, 14);
    typed(g, '2π', 600, 860, prog(t, T.two37, T.two37 + 0.3), `italic 700 46px ${CG}`, C.blue);
    typed(g, 'π', 842, 222, prog(t, T.half + 0.3, T.half + 0.5), `italic 700 72px ${CG}`, C.blue, { align: 'center' });
    const kq = prog(t, T.quarter, T.quarter + 0.5);
    arc(g, O[0], O[1], R + 30, 0, PI / 2, C.ink, 2.2, kq);
    if (kq >= 1) arrowHead(g, ...P(PI / 2, R + 30), -PI, C.ink, 13);
    typed(g, 'π/2', 1262, 312, prog(t, T.over, T.over + 0.35), `italic 700 46px ${CG}`, C.blue, { align: 'center' });
    // ── câu 38: không phải "con số rơi ra khi đo" (chì) ──
    note(g, 'π is not just what pops out of measuring', 820, 935, prog(t, T.isnt, T.circles38 + 0.4), { size: 22 });
    // ── câu 39: π = quãng đường dọc mép cho nửa vòng: 3 bán kính + 0.1416… ──
    leader(g, [P(3.07, R - 8), [790, 668], [826, 668]], prog(t, T.halfway, T.halfway + 0.4));
    note(g, `3 radii + ${this.LEFT}… = π`, 840, 676, prog(t, T.halfway + 0.2, T.one39 + 0.3), { color: C.ink, size: 22 });
    note(g, 'π = the natural measure of half a turn', 820, 980, prog(t, T.natural, T.end39 + 0.3), { color: C.blue, size: 22 });
    // ── câu 40: τ = 2π (chì, nhỏ) ──
    note(g, 'some argue:', 600, 905, prog(t, T.argue, T.argue + 0.5), { size: 20 });
    ring(g, 628, 846, 46, 30, prog(t, T.full40, T.full40 + 0.45), { color: C.leadT, w: 2.4 });
    tau(g, 640, 948, 22, prog(t, T.tau, T.tau + 0.3));
    note(g, '= 2π', 672, 946, prog(t, T.tau + 0.2, T.tau + 0.5), { size: 20 });
    // ── câu 41: chuyện của sự quay ──
    typed(g, 'A story about turning.', LX, 965, prog(t, T.story - 0.3, T.turning + 0.4), `italic 600 44px ${CG}`, C.blue);
  }
}
