// Hồi 2 · "About 300 BC — Euclid" (SCRIPT.md). Câu 11–23 của p2. Nền cát: mọi nét là RÃNH KHẮC (bóng + mép sáng).
//   L11 Alexandria · chân dung (tưởng tượng) · cuốn Elements · L12 trước: luật → đáp số / nay: tiên đề → chứng minh
//   L13 năm tiên đề, cái thứ năm dài, màu nhấn · L14 A, B → đoạn AB · L15 Mệnh đề I.1 (C tính từ A, B)
//   L16 tổng góc 180° · 3-4-5: 9 + 16 = 25 · góc nội tiếp nửa đường tròn · L17 chuỗi AXIOMS → I.1 → … → I.47
//   L18–L20 TRƯỚC / SAU · L21 dấu PROVED + forever/anyone/anywhere/any age · L22 gáy sách + bộ đếm > 2,000 năm
//   L23 tiên đề 5 phóng to + hình hai đường gặp nhau; mascot chỉ vào; "shake everything" → rung
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, stamp, actTitle, lookup } from '../kit.js';

const E = ERA.sand;
const AXIOMS = ['two points → a line', 'a line extends', 'a centre, a circle', 'right angles are equal',
  'if a line falling on two lines makes the interior angles on one side less than two right angles, the two lines, if produced indefinitely, meet on that side'];
const circ = (cx, cy, r, a0 = 0, a1 = Math.PI * 2, n = 72) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(a0 + (a1 - a0) * i / n), cy + r * Math.sin(a0 + (a1 - a0) * i / n)]);
const poly = (pts, n = 10) => pts.slice(1).flatMap((q, i) => { const s = seg(...pts[i], ...q, n); return i ? s.slice(1) : s; });
const rect = (x, y, w, h, n = 10) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], n);
/** rãnh trên cát: bóng tối + mép sáng lệch (như khung phong cách frameSand) */
function carve(g, pts, { w = 6, seed = 1, k = 1 } = {}) {
  if (k <= 0) return;
  hand(g, pts, { w: w + 2, color: 'rgba(80,55,30,0.55)', jit: 1.2, seed, k });
  g.save(); g.translate(-2, -2); hand(g, pts, { w: 2, color: 'rgba(255,240,210,0.6)', jit: 1.2, seed, k }); g.restore();
}
function dot(g, [x, y], k, color = E.ink) { if (k <= 0) return; g.save(); g.fillStyle = color; g.beginPath(); g.arc(x, y, 8 * outBack(clamp(k)), 0, 7); g.fill(); g.restore(); }
const deg = (P, Q, R) => { const a = [Q[0] - P[0], Q[1] - P[1]], b = [R[0] - P[0], R[1] - P[1]];
  return Math.acos((a[0] * b[0] + a[1] * b[1]) / Math.hypot(...a) / Math.hypot(...b)) * 180 / Math.PI; };
/** tách chữ thành dòng theo bề rộng */
function wrap(g, s, font, width, indent = '') {
  g.save(); g.font = font; const out = []; let line = '';
  for (const w of s.split(' ')) { const tryL = line ? line + ' ' + w : w; if (line && g.measureText(tryL).width > width) { out.push(line); line = indent + w; } else line = tryL; }
  out.push(line); g.restore(); return out;
}
/** nhiều dòng viết vào nối tiếp theo một k */
function typedLines(g, lines, x, y, lh, k, font, color) {
  const tot = lines.reduce((a, l) => a + l.length, 0); let n = Math.round(tot * clamp(k));
  lines.forEach((l, i) => { const m = Math.min(n, l.length); n -= m; if (m) typed(g, l.slice(0, m), x, y + i * lh, 1, font, color); });
}

// ── I.1: A, B cho trước; C = giao điểm trên của hai đường tròn bán kính |AB| ──
const A = [300, 800], B = [520, 800], R1 = Math.hypot(B[0] - A[0], B[1] - A[1]);
const C = (() => { const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, d = R1, h = Math.sqrt(R1 * R1 - (d / 2) ** 2), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d;
  return [mx + uy * h, my - ux * h]; })();
if (Math.abs(Math.hypot(C[0] - A[0], C[1] - A[1]) - R1) > 1e-9 || Math.abs(Math.hypot(C[0] - B[0], C[1] - B[1]) - R1) > 1e-9) throw new Error('b2: I.1 sai');
const ANG = [deg(A, B, C), deg(B, C, A), deg(C, A, B)].map(Math.round);
const ANG_S = `${ANG.map(a => a + '°').join(' + ')} = ${ANG.reduce((a, b) => a + b, 0)}°`;
// ── Pythagoras 3-4-5 (I.47) ──
const PA = 3, PB = 4, PC = Math.hypot(PA, PB), PU = 30, PP = [900, 800];
const PY_S = `${PA * PA} + ${PB * PB} = ${PC * PC}`;
// ── góc nội tiếp nửa đường tròn (III.31) ──
const TH = { cx: 720, cy: 470, r: 85 }, TR = [TH.cx + TH.r * Math.cos(-2.2), TH.cy + TH.r * Math.sin(-2.2)];
const TP = [TH.cx - TH.r, TH.cy], TQ = [TH.cx + TH.r, TH.cy], TANG = Math.round(deg(TR, TP, TQ));
// ── tiên đề 5: hai đường bị một cát tuyến cắt, tổng hai góc trong < 180° → gặp nhau ở phía đó ──
const PL = { x0: 330, y1: 770, y2: 960, sl: 0.15, tx: 480 };
const MEET = [PL.x0 + (PL.y2 - PL.y1) / (2 * PL.sl), (PL.y1 + PL.y2) / 2];
const TD = [-20, 310];                          // hướng cát tuyến (xuống)
const vang = (u, v) => Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI;
const ISUM = Math.round(vang([1, PL.sl], TD) + vang([1, -PL.sl], [-TD[0], -TD[1]]));
if (ISUM >= 180) throw new Error('b2: tiên đề 5 — tổng góc trong phải < 180°');
// chuỗi mệnh đề
const CHAIN = ['AXIOMS', 'I.1', 'I.2', 'I.3', '…', 'I.47'];
const CX = i => 112 + i * 172, CY = 520, CW = 130, CH = 80;

export default class Euclid {
  static ERA = 'sand';
  static IMAGES = { euclid: './assets/history/euclid.jpeg' };
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      alexandria: w(11, 'alexandria'), named: w(11, 'named'), euclid: w(11, 'euclid'), books: w(11, 'books'), elements: w(11, 'elements'),
      set: w(12, 'set'), new: w(12, 'new'), way: w(12, 'way'), mathematics: w(12, 'mathematics'),
      l13: L(13).start, five: w(13, 'five'), assumptions: w(13, 'assumptions'), axioms: w(13, 'axioms'),
      example: w(14, 'example'), two: w(14, 'two'), points: w(14, 'points'), draw: w(14, 'draw'), line: w(14, 'line'),
      five2: w(15, 'five'), built: w(15, 'built'), whole: w(15, 'whole'), plane: w(15, 'plane'), geometry: w(15, 'geometry'),
      angles: w(16, 'angles'), triangle: w(16, 'triangle'), pyth: w(16, "pythagoras'"), theorem: w(16, 'theorem'), circles: w(16, 'circles'), all: w(16, 'all'),
      every: w(17, 'every'), derived: w(17, 'derived'), from: w(17, 'from'), ones: w(17, 'ones'), already: w(17, 'already'), proved: w(17, 'proved'),
      changed: w(18, 'changed'), nature: w(18, 'nature'),
      longer: w(19, 'longer'), rule: w(19, 'rule'), number: w(19, 'number'),
      derived2: w(20, 'derived'), axioms2: w(20, 'axioms'), steps: w(20, 'steps'), logic: w(20, 'logic'),
      proved2: w(21, 'proved'), forever: w(21, 'forever'), anyone: w(21, 'anyone'), anywhere: w(21, 'anywhere'), any: w(21, 'any'),
      elements2: w(22, 'elements'), teach: w(22, 'teach'), for: w(22, 'for'), years: w(22, 'years'),
      remember: w(23, 'remember'), fifth: w(23, 'fifth'), axiom: w(23, 'axiom'), come: w(23, 'come'), later: w(23, 'later'), shake: w(23, 'shake'), end: L(23).end,
    };
    this.START = L(11).start;
    this.FROM = this.START - 2.3;
    this.WIPE = [W, 560];                        // cát đã bò vào từ mép phải ở cảnh trước
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'sand');
    actTitle(g, 'sand', t, S, 'ACT TWO', 'Proof');
    card(g, 'sand', prog(t, S - 0.3, S + 1.5), 'ACT TWO · PROOF', '≈ 300 BC', 'Euclid, the Elements');
    ruler(g, 'sand', -300, prog(t, S + 0.5, S + 1.5));
    const exitL = outCubic(prog(t, T.remember - 0.15, T.remember + 0.35));     // L23: dọn khung, chừa tiên đề 5

    // ── L11–L12: Alexandria · cuốn Elements · trước / nay ──
    const o12 = outCubic(prog(t, T.l13 - 0.1, T.l13 + 0.4));
    if (t >= T.alexandria - 0.1 && o12 < 1) {
      g.save(); g.translate(0, o12 * 900);
      typed(g, 'ALEXANDRIA', 112, 400, prog(t, T.alexandria, T.alexandria + 0.5), '500 26px "IBM Plex Mono"', E.ink);
      const kb = prog(t, T.books - 0.1, T.books + 0.5);
      carve(g, rect(200, 470, 300, 400, 12), { w: 5, seed: 3, k: kb });
      carve(g, seg(236, 470, 236, 870, 14), { w: 4, seed: 4, k: kb });
      typed(g, 'Elements', 368, 660, prog(t, T.elements, T.elements + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink, { align: 'center' });
      typed(g, 'EUCLID', 368, 712, prog(t, T.elements + 0.2, T.elements + 0.5), '500 20px "IBM Plex Mono"', E.ink, { align: 'center' });
      typed(g, 'before:   rule  →  answer', 590, 610, prog(t, T.set, T.set + 0.6), 'italic 500 40px "Cormorant Garamond"', E.dim);
      typed(g, 'now:   axioms  →  proof', 590, 690, prog(t, T.new, T.way + 0.5), 'italic 600 54px "Cormorant Garamond"', E.ink);
      carve(g, seg(590, 712, 1040, 712, 20), { w: 4, seed: 6, k: prog(t, T.mathematics, T.mathematics + 0.4) });
      g.restore();
    }
    // chân dung tưởng tượng: vào ở "named Euclid", trượt phải ra ở "way"
    const oP = outCubic(prog(t, T.way + 0.2, T.way + 0.7));
    if (t >= T.named - 0.2 && oP < 1) {
      g.save(); g.translate(oP * 700, 0);
      portrait(g, 'euclid', 'sand', 1400, 110, 440, prog(t, T.named - 0.15, T.euclid + 0.4), { style: 'print', rot: 0.012,
        label: { name: 'Euclid', life: 'FL. c. 300 BC', note: 'IMAGINED · NO LIKENESS SURVIVES' } });
      g.restore();
    }

    // ── L13+: năm tiên đề (bên phải); cái thứ năm dài, màu nhấn ──
    const AF = '500 22px "IBM Plex Mono"', ax = 1180, axW = 590;
    const outR = outCubic(prog(t, T.remember - 0.15, T.remember + 0.35));
    let yBottom = 0;
    if (t >= T.five - 0.1 && outR < 1) {
      g.save(); g.translate(outR * 800, 0);
      typed(g, 'THE FIVE AXIOMS', ax, 400, prog(t, T.axioms - 0.1, T.axioms + 0.3), '800 38px "Archivo"', E.ink);
      let y = 456;
      AXIOMS.forEach((s, i) => {
        const lines = wrap(g, `${i + 1}. ${s}`, AF, axW, '   ');
        const a = i < 4 ? T.five + i * 0.32 : T.five + 1.3, b = i < 4 ? a + 0.3 : T.axioms + 0.2;
        typedLines(g, lines, ax, y, 30, prog(t, a, b), AF, i === 4 ? E.accent : E.ink);
        if (i === 0) { g.save(); g.font = AF; const wd = g.measureText(lines[0]).width; g.restore();
          carve(g, seg(ax, y + 10, ax + wd, y + 10, 12), { w: 3, seed: 7, k: prog(t, T.example, T.example + 0.4) }); }
        y += lines.length * 30 + 14;
      });
      yBottom = y;
      // L15 "from those five alone": hoa ngoặc ôm cả năm
      carve(g, [[ax - 14, 432], [ax - 30, 432], [ax - 30, y - 24], [ax - 14, y - 24]], { w: 4, seed: 8, k: prog(t, T.five2 - 0.1, T.five2 + 0.4) });
      // L22: gáy sách xếp dần + bộ đếm năm
      const ns = Math.floor(15 * prog(t, T.elements2, T.years + 0.2));
      for (let i = 0; i < ns; i++) { const h = 80 + hash(i * 1.7) * 40, x = ax + i * 38;
        carve(g, rect(x, 1000 - h, 30, h, 6), { w: 3, seed: 200 + i });
        carve(g, seg(x + 4, 1000 - h + 18, x + 26, 1000 - h + 18, 3), { w: 2, seed: 220 + i }); }
      const yr = Math.round(2000 * outCubic(prog(t, T.for, T.years)));
      if (t >= T.teach) typed(g, `${yr.toLocaleString('en-US')}${yr >= 2000 ? '+' : ''} YEARS`, ax, 820, 1, '800 46px "Archivo"', E.ink);
      typed(g, 'TAUGHT FROM THE ELEMENTS', ax + 4, 852, prog(t, T.teach, T.teach + 0.6), '500 20px "IBM Plex Mono"', E.ink);
      g.restore();
    }

    // ── L14–L16: A, B, AB · I.1 · tổng góc · 3-4-5 · góc nội tiếp — rời khung ở "Every new statement…" ──
    const o16 = outCubic(prog(t, T.every - 0.2, T.every + 0.3));
    if (t >= T.two - 0.1 && o16 < 1) {
      g.save(); g.translate(0, o16 * 900);
      dot(g, A, prog(t, T.two, T.two + 0.2)); dot(g, B, prog(t, T.points, T.points + 0.2));
      typed(g, 'A', A[0] - 52, A[1] + 44, prog(t, T.two, T.two + 0.2), 'italic 600 52px "Cormorant Garamond"', E.ink);
      typed(g, 'B', B[0] + 22, B[1] + 44, prog(t, T.points, T.points + 0.2), 'italic 600 52px "Cormorant Garamond"', E.ink);
      carve(g, seg(...A, ...B, 20), { w: 7, seed: 11, k: prog(t, T.draw, T.line + 0.3) });
      carve(g, circ(A[0], A[1], R1, 0, Math.PI * 2, 90), { w: 4, seed: 12, k: prog(t, T.built, T.built + 0.7) });
      carve(g, circ(B[0], B[1], R1, Math.PI, Math.PI * 3, 90), { w: 4, seed: 13, k: prog(t, T.built + 0.35, T.whole + 0.5) });
      const kC = prog(t, T.whole + 0.4, T.plane + 0.1);
      dot(g, C, kC); typed(g, 'C', C[0] - 12, C[1] - 26, kC, 'italic 600 52px "Cormorant Garamond"', E.ink);
      carve(g, seg(...A, ...C, 16), { w: 7, seed: 14, k: prog(t, T.plane, T.geometry + 0.2) });
      carve(g, seg(...B, ...C, 16), { w: 7, seed: 15, k: prog(t, T.plane + 0.15, T.geometry + 0.35) });
      typed(g, 'PROPOSITION I.1 · EQUILATERAL TRIANGLE', 112, 400, prog(t, T.geometry, T.geometry + 0.7), '500 20px "IBM Plex Mono"', E.ink);
      // tổng góc
      [[A, B, C], [B, C, A], [C, A, B]].forEach(([P, Q, R], j) => {
        const a1 = Math.atan2(Q[1] - P[1], Q[0] - P[0]), a2 = Math.atan2(R[1] - P[1], R[0] - P[0]);
        let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
        const b = T.angles + j * 0.15; hand(g, circ(P[0], P[1], 42, a1, a1 + d, 16), { w: 4, color: E.ink, jit: 0.5, seed: 30 + j, k: prog(t, b, b + 0.3) });
      });
      typed(g, ANG_S, 112, 470, prog(t, T.triangle, T.triangle + 0.5), 'italic 600 44px "Cormorant Garamond"', E.ink);
      // Pythagoras 3-4-5, ba hình vuông
      const [px, py] = PP, a = PA * PU, b = PB * PU, Q1 = [px, py - a], Q2 = [px + b, py];
      const kT = prog(t, T.pyth, T.pyth + 0.4);
      carve(g, poly([Q1, PP, Q2, Q1], 10), { w: 5, seed: 40, k: kT });
      const hx = Q2[0] - Q1[0], hy = Q2[1] - Q1[1], Q3 = [Q2[0] + hy, Q2[1] - hx], Q4 = [Q1[0] + hy, Q1[1] - hx];
      const sqs = [[[px - a, py - a], [px, py - a], [px, py], [px - a, py]], [[px, py], [px + b, py], [px + b, py + b], [px, py + b]], [Q1, Q2, Q3, Q4]];
      sqs.forEach((q, j) => { const s0 = T.pyth + 0.3 + j * 0.15, k = prog(t, s0, s0 + 0.3);
        hand(g, poly([...q, q[0]], 6), { w: 3, color: E.ink, jit: 0.8, seed: 50 + j, k });
        const c = [q.reduce((m, p) => m + p[0], 0) / 4, q.reduce((m, p) => m + p[1], 0) / 4];
        typed(g, String([PA * PA, PB * PB, PC * PC][j]), c[0], c[1] + 14, prog(t, T.theorem + j * 0.12, T.theorem + j * 0.12 + 0.2), 'italic 600 40px "Cormorant Garamond"', E.ink, { align: 'center' }); });
      typed(g, PY_S, 800, 985, prog(t, T.theorem + 0.4, T.theorem + 0.8), 'italic 600 44px "Cormorant Garamond"', E.ink);
      // góc nội tiếp nửa đường tròn = 90°
      const kc = prog(t, T.circles - 0.1, T.circles + 0.3);
      carve(g, circ(TH.cx, TH.cy, TH.r, 0, Math.PI * 2, 60), { w: 4, seed: 60, k: kc });
      carve(g, poly([TP, TQ, TR, TP], 10), { w: 4, seed: 61, k: prog(t, T.circles + 0.25, T.all) });
      const u = (P, Q, l) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [(Q[0] - P[0]) / d * l, (Q[1] - P[1]) / d * l]; };
      const v1 = u(TR, TP, 16), v2 = u(TR, TQ, 16);
      hand(g, [[TR[0] + v1[0], TR[1] + v1[1]], [TR[0] + v1[0] + v2[0], TR[1] + v1[1] + v2[1]], [TR[0] + v2[0], TR[1] + v2[1]]], { w: 3, color: E.ink, jit: 0, seed: 62, k: prog(t, T.all, T.all + 0.2) });
      typed(g, `${TANG}°`, TR[0] - 26, TR[1] - 18, prog(t, T.all, T.all + 0.3), '500 20px "IBM Plex Mono"', E.ink, { align: 'right' });
      g.restore();
    }

    // ── L17–L22: chuỗi AXIOMS → I.1 → … → I.47; TRƯỚC / SAU; PROVED ──
    if (t >= T.every && exitL < 1) {
      g.save(); g.translate(0, exitL * 900);
      const times = [T.every + 0.3, T.derived, T.from, T.ones, T.already, T.proved];
      CHAIN.forEach((s, i) => {
        const k = prog(t, times[i] - 0.1, times[i] + 0.3), x = CX(i);
        if (i) carve(g, seg(CX(i - 1) + CW + 6, CY + CH / 2, x - 8, CY + CH / 2, 6), { w: 3, seed: 300 + i, k });
        if (i && k >= 1) { g.save(); g.fillStyle = E.ink; g.beginPath(); g.moveTo(x - 6, CY + CH / 2); g.lineTo(x - 20, CY + CH / 2 - 8); g.lineTo(x - 20, CY + CH / 2 + 8); g.fill(); g.restore(); }
        carve(g, rect(x, CY, CW, CH, 6), { w: 4, seed: 320 + i, k });
        typed(g, s, x + CW / 2, CY + CH / 2 + 8, k * 2 - 1, '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
      });
      // dưới I.1 tam giác đều nhỏ; dưới I.47 tam giác 3-4-5
      const k1 = prog(t, T.derived + 0.2, T.derived + 0.5), m = 34;
      hand(g, poly([[CX(1) + 65 - m, 690], [CX(1) + 65 + m, 690], [CX(1) + 65, 690 - m * Math.sqrt(3)], [CX(1) + 65 - m, 690]], 6), { w: 3, color: E.ink, jit: 0.5, seed: 340, k: k1 });
      const k47 = prog(t, T.proved + 0.1, T.proved + 0.5), px = CX(5) + 35, s = 16;
      hand(g, poly([[px, 690 - PA * s], [px, 690], [px + PB * s, 690], [px, 690 - PA * s]], 6), { w: 3, color: E.ink, jit: 0.5, seed: 341, k: k47 });
      typed(g, 'PYTHAGORAS', CX(5) + CW / 2, 730, k47, '500 18px "IBM Plex Mono"', E.ink, { align: 'center' });
      // L20 "strict steps of logic": một vết khắc chạy dọc chuỗi
      const run = prog(t, T.steps - 0.1, T.logic + 0.4);
      if (run > 0 && run < 1) { const x = CX(0) + CW / 2 + (CX(5) - CX(0)) * run; g.save(); g.fillStyle = E.accent; g.beginPath(); g.arc(x, CY + CH + 18, 9, 0, 7); g.fill(); g.restore(); }
      // L18–L20: TRƯỚC / SAU
      carve(g, seg(580, 790, 580, 925, 10), { w: 4, seed: 400, k: prog(t, T.changed, T.changed + 0.4) });
      typed(g, 'BEFORE', 112, 820, prog(t, T.changed, T.changed + 0.3), '500 22px "IBM Plex Mono"', E.dim);
      typed(g, 'AFTER EUCLID', 620, 820, prog(t, T.nature, T.nature + 0.4), '500 22px "IBM Plex Mono"', E.ink);
      typed(g, 'a rule → the right number', 112, 884, prog(t, T.rule - 0.3, T.number + 0.2), 'italic 500 40px "Cormorant Garamond"', E.dim);
      carve(g, seg(112, 900, 520, 900, 14), { w: 3, seed: 401, k: prog(t, T.number + 0.2, T.number + 0.6) });
      typed(g, 'axioms → logic → theorem', 620, 884, prog(t, T.derived2, T.logic + 0.2), 'italic 600 44px "Cormorant Garamond"', E.ink);
      // L21: PROVED + bốn chữ
      g.save(); g.translate(CX(4) + CW / 2, 445); g.scale(1.1, 1.1);
      stamp(g, 'PROVED', 0, 0, prog(t, T.proved2, T.proved2 + 0.3), '800 64px "Archivo"', E.accent);
      g.restore();
      [['FOREVER', T.forever], ['ANYONE', T.anyone], ['ANYWHERE', T.anywhere], ['ANY AGE', T.any]].forEach(([s, a], i) =>
        typed(g, (i ? '·  ' : '') + s, 112 + [0, 150, 300, 490][i] + (i ? -10 : 0), 975, prog(t, a, a + 0.3), '500 24px "IBM Plex Mono"', E.ink));
      g.restore();
    }

    // ── L23: tiên đề 5 lên giữa khung; hình hai đường gặp nhau; "shake everything" → rung ──
    if (t >= T.remember) {
      const sh = t >= T.shake ? Math.sin((t - T.shake) * 38) * 0.014 * Math.max(0, 1 - (t - T.shake) / 1.4) : 0;
      g.save(); g.translate(820, 760); g.rotate(sh); g.translate(-820, -760);
      typed(g, 'AXIOM 5', 300, 450, prog(t, T.fifth - 0.1, T.fifth + 0.3), '800 46px "Archivo"', E.accent);
      const F5 = 'italic 600 40px "Cormorant Garamond"', lines = wrap(g, AXIOMS[4], F5, 1050);
      typedLines(g, lines, 300, 510, 48, prog(t, T.axiom, T.come), F5, E.accent);
      // hai đường + cát tuyến; gặp nhau ở MEET
      const x1 = PL.x0, k = prog(t, T.come - 0.1, T.later + 0.3), kd = prog(t, T.later, T.later + 0.6);
      const yA = x => PL.y1 + PL.sl * (x - x1), yB = x => PL.y2 - PL.sl * (x - x1);
      carve(g, seg(x1, yA(x1), 760, yA(760), 12), { w: 5, seed: 500, k }); carve(g, seg(x1, yB(x1), 760, yB(760), 12), { w: 5, seed: 501, k });
      g.save(); g.setLineDash([10, 10]);
      hand(g, seg(760, yA(760), ...MEET, 10), { w: 3, color: E.ink, jit: 0, seed: 502, k: kd }); hand(g, seg(760, yB(760), ...MEET, 10), { w: 3, color: E.ink, jit: 0, seed: 503, k: kd });
      g.restore();
      carve(g, seg(PL.tx + 10, 700, PL.tx - 10, 1010, 12), { w: 5, seed: 504, k });
      const ta = [PL.tx + 10 - 20 / 310 * (yA(PL.tx) - 700), yA(PL.tx)], tb = [PL.tx + 10 - 20 / 310 * (yB(PL.tx) - 700), yB(PL.tx)];
      const angA = Math.atan(PL.sl), dn = Math.atan2(310, -20);
      hand(g, circ(ta[0], ta[1], 34, angA, dn, 12), { w: 4, color: E.accent, jit: 0, seed: 505, k: prog(t, T.later, T.later + 0.3) });
      hand(g, circ(tb[0], tb[1], 34, -angA, dn - Math.PI, 12), { w: 4, color: E.accent, jit: 0, seed: 506, k: prog(t, T.later + 0.1, T.later + 0.4) });
      dot(g, MEET, prog(t, T.later + 0.5, T.later + 0.8), E.accent);
      typed(g, `the two angles: ${ISUM}° < 180°`, 1010, MEET[1] + 14, prog(t, T.later + 0.6, T.shake), 'italic 600 40px "Cormorant Garamond"', E.accent);
      g.restore();
      figure(g, 'point', 1660, 1080, 640, 'sand', prog(t, T.remember - 0.1, T.remember + 0.25), { flip: true });
    }
  }
}
