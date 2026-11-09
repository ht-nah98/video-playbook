// HỒI 2 · "What division really is" (SCRIPT.md, p2 câu 48–66) — trang giấy kẻ ô, lỗ ở nhà (960, 640).
//   A 48–53  chia = nhân chạy ngược: 12 ÷ 3 = 4 → mũi tên vòng về 4 × 3 = 12; □ × 3 = 12, ô điền 4; "zero": 3 gạch đỏ → 0
//   B 54–58  12 ÷ 0: x × 0 = 12; 1, 2, 7, 100, 1,000,000 × 0 = 0 ≠ 12 (đỏ); ô x rơi vào lỗ, lỗ trống → "NO ANSWER"; mascot shrug
//   C 59–62  0 ÷ 0: x × 0 = 0; mọi ứng viên đều ✓ — các số đổ ồ ạt VÀO lỗ, chen nhau → "EVERY ANSWER"
//   D 63–66  hai loại UNDEFINED hai bên lỗ (đỏ): NO ANSWER · TOO MANY; dòng cuối "a single answer" gạch chân
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, strike, ring, arrow, stamp, card, figure } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640, HR = 60;
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;
const ease = u => u * u;                                             // rơi: nhanh dần
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// ── toán: tính trong code, sai thì ném (BRIEF) ──
if (12 / 3 !== 4 || 4 * 3 !== 12) throw new Error('c2: 12 ÷ 3 = 4 sai');
const CAND12 = [1, 2, 7, 100, 1000000].map(c => { const p = c * 0; if (p !== 0 || p === 12) throw new Error('c2: ' + c + ' × 0'); return { s: fmt(c), p }; });
const CAND00 = [1, 2, 1000000].map(c => { const p = c * 0; if (p !== 0) throw new Error('c2: ' + c + ' × 0 ≠ 0'); return { s: fmt(c), p }; });
// số đổ vào lỗ ở 0 ÷ 0 (mọi số đều thoả x × 0 = 0) — kiểm từng số
const POUR = ['7', '42', '−2', '0.5', '100', '13', '3', '−9', '1,000', '8', '2.5', '365', '−40', '9', '0.01', '77', '5', '−1', '64', '11', '−0.3', '6', '250', '4', '19', '−7', '31', '0.2', '12', '99', '−15', '50', '1.5', '17', '−3', '1,000,000'];
for (const s of POUR) { const v = Number(s.replace('−', '-').replace(/,/g, '')); if (!Number.isFinite(v) || Math.abs(v * 0) !== 0) throw new Error('c2: đổ ' + s); }

export default class Def {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      l48: L(48).start, divisionA: w(48, 'division'),
      mult: w(49, 'multiplication'), backwards: w(49, 'backwards'),
      twelve50: w(50, 'twelve'), three50: w(50, 'three'), four50: w(50, 'four'),
      exactly: w(51, 'exactly'), four51b: w(51, 'four', 2), twelve51: w(51, 'twelve'),
      missing: w(52, 'missing'), factor: w(52, 'factor'), mult52: w(52, 'multiplication'),
      same: w(53, 'same'), zero53: w(53, 'zero'),
      twelve54: w(54, 'twelve'), zero54: w(54, 'zero'),
      looking: w(55, 'looking'), x55: w(55, 'x', 1), times55: w(55, 'times'), twelve55: w(55, 'twelve'),
      every56: w(56, 'every'), e56: L(56).end,
      l57: L(57).start, no57: w(57, 'no'), anywhere: w(57, 'anywhere'), twelve57: w(57, 'twelve'),
      hard: w(58, 'hard'), it58: w(58, 'it'), answer58: w(58, 'answer'), e58: L(58).end,
      l59: L(59).start, zero59: w(59, 'zero'),
      want60: w(60, 'want'), such60: w(60, 'such'), other60: w(60, 'other'),
      works: w(61, 'works'), one61: w(61, 'one'), two61: w(61, 'two'), million: w(61, 'million'), e61: L(61).end,
      infinitely: w(62, 'infinitely'), answers62: w(62, 'answers'),
      l63: L(63).start, one63: w(63, 'one', 1), only63: w(63, 'only'),
      twelve64: w(64, 'twelve'), undef64: w(64, 'undefined'), no64: w(64, 'no'),
      zero65: w(65, 'zero'), undef65: w(65, 'undefined'), many65: w(65, 'many'),
      kinds: w(66, 'kinds'), rob: w(66, 'rob'), single: w(66, 'single'), answer66: w(66, 'answer'),
    };
    this.START = L(48).start;
    this.FROM = this.START - 1.2;
  }

  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.divisionA - 0.1, kind: 'pen' },     // "division = multiplication, run backwards"
      { t: T.twelve50 - 0.1, kind: 'pen' },      // 12 ÷ 3
      { t: T.four50, kind: 'snap' },             // = 4
      { t: T.four51b - 0.1, kind: 'snap' },      // đổi dạng: 4 × 3 = 12
      { t: T.missing - 0.4, kind: 'pen' },       // □ × 3 = 12
      { t: T.twelve54 - 0.1, kind: 'pen' },      // 12 ÷ 0 = ?
      { t: T.every56, kind: 'pen' },             // các ứng viên × 0 ≠ 12
      { t: T.no57, kind: 'whoosh' },             // ô x rơi vào lỗ
      { t: T.answer58 - 0.15, kind: 'error' },   // dấu NO ANSWER
      { t: T.zero59 - 0.4, kind: 'pen' },        // 0 ÷ 0 = ?
      { t: T.works + 0.3, kind: 'whoosh' },      // các số đổ ồ ạt vào lỗ
      { t: T.one63 - 0.2, kind: 'pen' },         // "one answer — and only one"
      { t: T.undef64 - 0.1, kind: 'error' },     // UNDEFINED (12 ÷ 0)
      { t: T.single - 0.3, kind: 'pen' },        // "a single answer"
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'page');
    card(g, 'page', prog(t, this.FROM, this.FROM + 1.4), 'ACT TWO · THE BROKEN OPERATION', 'What division really is');
    hole(g, HX, HY, HR, null, { seed: 5 });

    // ═══ A: chia = nhân chạy ngược ═══
    const outA = outCubic(prog(t, T.twelve54 - 0.6, T.twelve54 + 0.1));
    if (outA < 1) {
      g.save(); g.translate(0, -outA * 900);
      const f54 = I(54), xM = 200 + mw(g, f54, 'division '), xR = xM + mw(g, f54, '= multiplication, '), xE = xR + mw(g, f54, 'run backwards');
      typed(g, 'division', 200, 270, prog(t, T.divisionA - 0.1, T.divisionA + 0.5), f54, E.ink);
      typed(g, '= multiplication,', xM, 270, prog(t, T.mult - 0.1, T.mult + 0.7), f54, E.ink);
      typed(g, 'run backwards', xR, 270, prog(t, T.backwards - 0.3, T.backwards + 0.4), f54, E.ink);
      arrow(g, xE, 292, xR + 10, 292, prog(t, T.backwards + 0.2, T.backwards + 0.7), { bend: -14, w: 3, seed: 21 });

      // 12 ÷ 3 = 4 — viết theo lời đọc
      const f92 = A(92);
      typed(g, '12 ÷ 3', 200, 420, prog(t, T.twelve50 - 0.1, T.three50 + 0.2), f92, E.ink);
      typed(g, '= 4', 200 + mw(g, f92, '12 ÷ 3 '), 420, prog(t, T.four50 - 0.3, T.four50 + 0.2), f92, E.ink);
      // mũi tên vòng ngược về 4 × 3 = 12
      arrow(g, 720, 375, 720, 515, prog(t, T.exactly - 0.6, T.exactly - 0.1), { bend: -110, seed: 23 });
      typed(g, 'BACKWARDS', 810, 455, prog(t, T.exactly - 0.3, T.exactly + 0.2), M(22), E.dim);
      typed(g, '4 × 3 = 12', 200, 560, prog(t, T.four51b - 0.1, T.twelve51 + 0.3), f92, E.ink);
      ring(g, 228, 528, 46, 52, prog(t, T.exactly, T.exactly + 0.5), { color: E.ink, w: 4, seed: 25 });
      typed(g, 'EXACTLY ONE NUMBER', 200, 625, prog(t, T.exactly + 0.1, T.exactly + 0.8), M(22), E.dim);

      // □ × 3 = 12 — ô trống là thừa số thiếu, điền 4
      const kb = prog(t, T.missing - 0.4, T.missing + 0.1), f72 = A(72);
      box(g, 200, 685, 66, 80, kb, E.ink, 31);
      typed(g, '× 3 = 12', 290, 750, prog(t, T.missing - 0.2, T.factor), f72, E.ink);
      typed(g, '4', 233, 750, prog(t, T.factor, T.factor + 0.25), f72, E.ink, { align: 'center' });
      typed(g, 'THE MISSING FACTOR', 200, 810, prog(t, T.factor + 0.1, T.mult52 + 0.4), M(22), E.dim);
      // "same definition … to zero": 3 gạch đỏ, 0 viết lên trên — và ô lại trống, có dấu ?
      const x3 = 290 + mw(g, f72, '× ');
      strike(g, x3 - 6, 735, x3 + mw(g, f72, '3') + 6, 700, prog(t, T.zero53 - 0.1, T.zero53 + 0.25), { seed: 33 });
      typed(g, '0', x3 + 2, 680, prog(t, T.zero53 + 0.1, T.zero53 + 0.35), A(46), E.ink);
      typed(g, 'SAME DEFINITION →', 560, 810, prog(t, T.same - 0.1, T.same + 0.6), M(22), E.dim);
      g.restore();
    }

    // ═══ B: 12 ÷ 0 — không x nào ═══
    const inB = prog(t, T.twelve54 - 0.3, T.twelve54 + 0.2), outB = outCubic(prog(t, T.l59 - 0.4, T.l59 + 0.3));
    if (inB > 0 && outB < 1) {
      g.save(); g.translate(0, -outB * 900);
      equation(g, '12 ÷ 0 = ?', 'x × 0 = 12', t, T.twelve54 - 0.1, T.zero54 + 0.4, T.looking, T.x55 - 0.1, T.twelve55 + 0.3, 41);
      // ứng viên: mỗi số × 0 = 0, ≠ 12 đỏ
      const n = CAND12.length, a = T.every56, b = T.e56 + 0.1;
      CAND12.forEach((c, i) => {
        const y = 535 + i * 56, t0 = a + (b - a) * i / n, f = A(38), s = `${c.s} × 0 = ${c.p}`;
        typed(g, s, 200, y, prog(t, t0, t0 + 0.35), f, E.ink);
        typed(g, '≠ 12', 560, y, prog(t, t0 + 0.3, t0 + 0.5) >= 0.5 ? prog(t, t0 + 0.3, t0 + 0.5) : 0, A(38), E.accent);
      });
      // ô x rơi vào lỗ; chỗ cũ còn ô nét đứt trống
      xbox(g, t, T.no57, 1.0, 'x', prog(t, T.x55 - 0.1, T.x55 + 0.2));
      typed(g, 'NO x ANYWHERE', 200, 850, prog(t, T.anywhere - 0.1, T.twelve57), M(22), E.accent);
      typed(g, 'not a hard question.', 200, 930, prog(t, T.hard - 0.3, T.hard + 0.6), I(44), E.dim);
      stamp(g, 'NO ANSWER', HX, HY + 150, prog(t, T.answer58 - 0.15, T.answer58 + 0.25), A(46), E.accent, { rot: -0.06 });
      g.restore();
    }
    // mascot shrug: "It is a question with no answer to find."
    const fk = prog(t, T.it58 - 0.2, T.it58 + 0.35) - prog(t, T.zero59, T.zero59 + 0.4);
    if (fk > 0) figure(g, 'shrug', 1660, H, 700, 'page', fk);

    // ═══ C: 0 ÷ 0 — mọi x đều được, các số đổ vào lỗ ═══
    const inC = prog(t, T.l59 - 0.1, T.l59 + 0.3), outC = outCubic(prog(t, T.l63 - 0.4, T.l63 + 0.3));
    if (inC > 0 && outC < 1) {
      g.save(); g.translate(0, -outC * 900);
      equation(g, '0 ÷ 0 = ?', 'x × 0 = 0', t, T.zero59 - 0.4, T.zero59 + 0.5, T.want60, T.such60 - 0.1, T.such60 + 1.4, 51);
      // "the trouble runs the other way": mũi tên chỉ VÀO lỗ, từ phía các số sẽ đổ tới
      typed(g, 'x', 228, 445, prog(t, T.such60, T.such60 + 0.3), A(72), E.ink, { align: 'center' });
      arrow(g, 1420, 300, 1050, 570, prog(t, T.other60 - 0.1, T.other60 + 0.5), { color: E.ink, bend: 80, seed: 53 });
      [T.one61, T.two61, T.million].forEach((t0, i) => {
        const c = CAND00[i], y = 535 + i * 62, s = `${c.s} × 0 = ${c.p}`;
        typed(g, s, 200, y, prog(t, t0 - 0.1, t0 + 0.4), A(38), E.ink);
        tick(g, 200 + mw(g, A(38), s) + 30, y - 14, prog(t, t0 + 0.4, t0 + 0.6), 60 + i);
        // bản sao của số bay vào lỗ
        flyIn(g, c.s, 200 + mw(g, A(38), c.s) / 2, y - 14, t, t0 + 0.5, 0.9, 0);
      });
      typed(g, 'EVERY x WORKS', 200, 760, prog(t, T.works - 0.2, T.works + 0.4), M(22), E.ink);
      // đổ ồ ạt: nhanh dần tới "infinitely many answers"
      const a = T.works + 0.3, b = T.answers62 + 0.6;
      POUR.concat(POUR.slice().reverse()).forEach((s, i, P) => {
        const u = Math.pow((i + 0.5) / P.length, 0.7), t0 = a + (b - a) * u;
        const ang = -1.65 + hash(i * 2.3 + 1) * 2.3, R = 1150 + hash(i * 5.1) * 250;
        pour(g, s, ang, R, t, t0, 1.6 + hash(i * 3.7) * 0.8, i + 1);
      });
      stamp(g, 'EVERY ANSWER', HX, HY + 150, prog(t, T.infinitely - 0.15, T.infinitely + 0.25), A(46), E.accent, { rot: -0.06 });
      g.restore();
    }

    // ═══ D: hai loại undefined, hai bên lỗ ═══
    const inD = prog(t, T.l63 - 0.2, T.l63 + 0.3);
    if (inD > 0) {
      typed(g, 'division must give…', HX, 220, prog(t, T.l63 - 0.1, T.l63 + 0.8), I(54), E.dim, { align: 'center' });
      typed(g, 'one answer — and only one', HX, 300, prog(t, T.one63 - 0.2, T.only63 + 0.5), I(54), E.ink, { align: 'center' });
      const col = (cx, eq, tq, tu, lab, tl, seed) => {
        typed(g, eq, cx, 520, prog(t, tq - 0.1, tq + 0.5), A(72), E.ink, { align: 'center' });
        typed(g, 'UNDEFINED', cx, 600, prog(t, tu - 0.1, tu + 0.4), A(46), E.accent, { align: 'center' });
        typed(g, lab, cx, 655, prog(t, tl - 0.1, tl + 0.4), M(28), E.accent, { align: 'center' });
        ring(g, cx, 585, 160, 40, prog(t, T.kinds, T.kinds + 0.5), { seed });
        arrow(g, cx + (cx < HX ? 120 : -120), 690, HX + (cx < HX ? -150 : 150), 840, prog(t, T.rob, T.rob + 0.5), { color: E.dim, w: 3, bend: cx < HX ? 40 : -40, seed: seed + 1 });
      };
      col(470, '12 ÷ 0', T.twelve64, T.undef64, '— NO ANSWER', T.no64, 71);
      col(1450, '0 ÷ 0', T.zero65, T.undef65, '— TOO MANY', T.many65, 75);
      typed(g, 'a single answer', HX, 900, prog(t, T.single - 0.3, T.answer66 + 0.3), I(64), E.ink, { align: 'center' });
      hand(g, seg(HX - 210, 922, HX + 210, 918, 16), { w: 4, color: E.ink, seed: 79, k: prog(t, T.answer66, T.answer66 + 0.5) });
    }

    // ── cục bộ ──
    function equation(g, q, eq, t, tq0, tq1, tm, te0, te1, seed) {
      typed(g, q, 200, 290, prog(t, tq0, tq1), A(72), E.ink);
      typed(g, 'means: find x with', 200, 355, prog(t, tm - 0.2, tm + 0.6), I(44), E.dim);
      const ke = prog(t, te0, te1);
      box(g, 196, 385, 64, 72, clamp(ke * 3), E.ink, seed);
      typed(g, eq.slice(1), 260, 445, clamp(ke * 1.2 - 0.2), A(72), E.ink);
    }
    function xbox(g, t, t0, dur, s, ke) {
      const u = prog(t, t0, t0 + dur);
      if (u <= 0) { typed(g, s, 228, 445, ke, A(72), E.ink, { align: 'center' }); return; }
      // chỗ cũ: ô nét đứt trống
      g.save(); g.setLineDash([8, 8]); box(g, 196, 385, 64, 72, 1, E.dim, 43); g.restore();
      if (u >= 1) return;
      const e = ease(u), x = 228 + (HX - 228) * e, y = 421 + (HY - 421) * e, sc = 1 - 0.9 * outCubic(u);
      g.save(); g.translate(x, y - Math.sin(u * Math.PI) * 120); g.rotate(u * 2.2); g.scale(sc, sc);
      box(g, -32, -36, 64, 72, 1, E.ink, 41); typed(g, s, 0, 24, 1, A(72), E.ink, { align: 'center' }); g.restore();
    }
    // vào từ ngoài khung, dồn quanh miệng lỗ (chen chúc), rồi tụt vào trong
    function pour(g, s, ang, R, t, t0, dur, seed) {
      const u = prog(t, t0, t0 + dur);
      if (u <= 0 || u >= 1) return;
      const rr = HR + 30 + hash(seed * 2.9) * 70, a2 = ang + (hash(seed * 6.1) - 0.5) * 0.6;
      let x, y, sc;
      if (u < 0.65) { const e = outCubic(u / 0.65), r = R + (rr - R) * e, a = ang + (a2 - ang) * e;
        x = HX + Math.cos(a) * r; y = HY + Math.sin(a) * r * (r > rr + 1 ? 0.8 : 1); sc = 1 - 0.35 * e; }
      else { const e = ease((u - 0.65) / 0.35), r = rr * (1 - e); x = HX + Math.cos(a2) * r; y = HY + Math.sin(a2) * r; sc = 0.65 * (1 - 0.9 * e); }
      g.save(); g.translate(x, y); g.rotate((hash(seed * 4.1) - 0.5) * 1.6 * u); g.scale(sc, sc);
      typed(g, s, 0, 20, 1, A(56), E.ink, { align: 'center' }); g.restore();
    }
    function flyIn(g, s, x0, y0, t, t0, dur, seed) {
      const u = prog(t, t0, t0 + dur);
      if (u <= 0 || u >= 1) return;
      const e = ease(u), sw = Math.sin(u * Math.PI) * (hash(seed * 1.7) - 0.5) * 160;
      const x = x0 + (HX - x0) * e + sw, y = y0 + (HY - y0) * e, sc = 1 - 0.92 * Math.pow(u, 2.5);
      g.save(); g.translate(x, y); g.rotate((hash(seed * 4.1) - 0.5) * 3 * u); g.scale(sc, sc);
      typed(g, s, 0, 20, 1, A(56), E.ink, { align: 'center' }); g.restore();
    }
  }
}

function mw(g, font, s) { g.save(); g.font = font; const m = g.measureText(s).width; g.restore(); return m; }
function box(g, x, y, w, h, k, color, seed) {
  hand(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], { w: 4, color, seed, k });
}
function tick(g, x, y, k, seed) {
  hand(g, [[x - 14, y], [x - 2, y + 14], [x + 22, y - 18]], { w: 5, color: E.ink, seed, k });
}
