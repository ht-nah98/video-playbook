// b2 · The squeeze (p2 câu 4–13) — PLATE I tiếp. Chân dung Archimedes (Fetti, IMAGINED) vào rồi trượt ra; vòng compa
// xanh (760, 540 trên màn khi camera đã trôi đủ) R 280; thước thẳng đặt lên đường cong; dựng lục giác bằng chì (bước bán
// kính), đa giác trong / ngoài bằng mực; "trapped" → vùng kẹp hatch chì; bảng n·sin(π/n) / n·tan(π/n); nhân đôi 6→96 đúng
// từng số đọc (đa giác cũ để lại bằng chì); DETAIL A phóng chỗ kẹp, khe thu hẹp; cận 223/71 < π < 22/7 (PROVED, đối với
// MEASURED ở b1); "22/7" chuyển xanh ở "the very fraction". `compass` đứng PHẢI quanh câu 6–7.
import { H, C, CG, MONO, PI, clamp, smooth, outCubic, prog, ground, drift, card, typed, note, frac, line, poly,
  compassCircle, pivot, leader, ring, figure, portrait, lookup, must, fix } from '../kit.js';

const tw = (g, s, font) => { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; };

/**
 * Ống kính DETAIL (dùng chung b2, b3): một cạnh đa giác n cạnh phóng to — cung tròn xanh, dây cung (đa giác trong) và
 * tiếp tuyến (đa giác ngoài) mực, khe giữa hatch chì. Chiều dọc phóng E lần (NOT TO SCALE). k = lộ (viền vẽ dần).
 */
export function detailLens(g, lx, ly, r, n, k, { E = 5, lift = 34 } = {}) {
  if (k <= 0) return;
  const kr = clamp(k * 1.4), Rv = 100 / Math.sin(PI / n), ay = ly - lift;
  const map = (rho, phi) => [lx + rho * Math.sin(phi), ay + E * (Rv - rho * Math.cos(phi))];
  const Ro = Rv / Math.cos(PI / n), m = Math.min(9, Math.ceil(n / 2));
  const inner = [], outer = [];
  for (let j = -m; j <= m; j += 2) { inner.push(map(Rv, j * PI / n)); outer.push(map(Ro, j * PI / n)); }
  g.save(); g.fillStyle = 'rgba(244,239,226,0.97)'; g.beginPath(); g.arc(lx, ly, r * kr, 0, 7); g.fill(); g.clip();
  g.save(); g.beginPath(); outer.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); inner.slice().reverse().forEach(p => g.lineTo(...p));
  g.closePath(); g.clip(); g.strokeStyle = 'rgba(91,95,99,0.55)'; g.lineWidth = 1;
  for (let x = -r - 200; x < r + 200; x += 9) { g.beginPath(); g.moveTo(lx + x, ly - r - 20); g.lineTo(lx + x + 2 * r, ly + r + 20); g.stroke(); }
  g.restore();
  line(g, inner, C.ink, 2.6); line(g, outer, C.ink, 2.6);
  const arcPts = []; const pm = Math.min(PI / 2, Math.asin(Math.min(1, (r + 20) / Rv)));
  for (let i = 0; i <= 80; i++) arcPts.push(map(Rv, -pm + 2 * pm * i / 80));
  line(g, arcPts, C.blue, 4.5);
  g.restore();
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(lx, ly, r, -PI / 2, -PI / 2 + 2 * PI * kr); g.stroke(); g.restore();
}

export default class Squeeze {
  static ERA = 'vellum';
  static POSES = ['compass'];
  static IMAGES = { archimedes: './assets/history/Domenico-Fetti_Archimedes_1620.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      first: w(4, 'first'), systematically: w(4, 'systematically'), archimedes: w(4, 'archimedes'), syracuse: w(4, 'syracuse'),
      bc: w(4, 'bc'),
      problem: w(5, 'problem'), state: w(5, 'state'), lay: w(5, 'lay'), ruler: w(5, 'ruler'), curve: w(5, 'curve'),
      read: w(5, 'read'), length: w(5, 'length'),
      this6: w(6, 'this'), draw6: w(6, 'draw'), poly6: w(6, 'polygon'), circle6: w(6, 'circle'), shorter: w(6, 'shorter'),
      poly7: w(7, 'polygon'), circle7: w(7, 'circle'), longer: w(7, 'longer'), end7: L(7).end,
      directly: w(8, 'directly'), trapped: w(8, 'trapped'), numbers8: w(8, 'numbers'),
      arch9: w(9, 'archimedes'), hexagons: w(9, 'hexagons'), six: w(9, 'six'), three9: w(9, 'three'), three9b: w(9, 'three', 2),
      six9b: w(9, 'six', 2),
      twelve: w(10, 'twelve'), n24: w(10, 'twenty-four'), n48: w(10, 'forty-eight'), n96: w(10, 'ninety-six'),
      every: w(11, 'every'), doubling: w(11, 'doubling'), polygons: w(11, 'polygons'), tighter: w(11, 'tighter'), gap: w(11, 'gap'),
      shrinks: w(11, 'shrinks'),
      at96: w(12, 'ninety-six'), sides12: w(12, 'sides'), proved: w(12, 'proved'), pi12: w(12, 'pi'), lo: w(12, 'three'),
      eight: w(12, 'eight'), hi: w(12, 'three', 2), nine: w(12, 'nine'),
      upper: w(13, 'upper'), tt: w(13, 'twenty-two'), seven: w(13, 'seven'), very: w(13, 'very'), still: w(13, 'still'),
      today: w(13, 'today'), end: L(13).end,
    };
    this.START = L(4).start; this.FROM = this.START - 1.2;
    const T = this.T;
    // nhân đôi đúng từng số đọc
    this.STEPS = [[6, -1e9], [12, T.twelve], [24, T.n24], [48, T.n48], [96, T.n96]];
    this.LENS = [[6, -1e9], [12, T.doubling], [24, T.polygons], [48, T.tighter], [96, T.gap]];
    this.ROWS = this.STEPS.map(([n]) => [String(n), fix(`${n} * Math.sin(Math.PI / ${n})`, 4), fix(`${n} * Math.tan(Math.PI / ${n})`, 4)]);
    const want = [['3.0000', '3.4641'], ['3.1058', '3.2154'], ['3.1326', '3.1597'], ['3.1394', '3.1461'], ['3.1410', '3.1427']];
    this.ROWS.forEach((r, i) => { if (r[1] !== want[i][0] || r[2] !== want[i][1]) throw new Error(`b2: bảng sai ở ${r[0]} cạnh`); });
    must('6 * 2 * 2 * 2 * 2', 96);
    must('223 / 71 < 96 * Math.sin(Math.PI / 96) && 96 * Math.sin(Math.PI / 96) < Math.PI && Math.PI < 96 * Math.tan(Math.PI / 96) && 96 * Math.tan(Math.PI / 96) < 22 / 7', true);
    this.LO = fix('223 / 71', 4); this.HI = fix('22 / 7', 4);
    if (this.LO !== '3.1408' || this.HI !== '3.1429') throw new Error('b2: cận sai');
    // tâm vòng tròn trên tờ: khi camera trôi đủ (110, 110) thì ở (760, 480) trên màn
    this.CX = 870; this.CY = 590; this.R = 280;
    const order = [T.first, T.archimedes, T.problem, T.state, T.lay, T.curve, T.read, T.this6, T.draw6, T.poly6, T.poly7,
      T.trapped, T.hexagons, T.six, T.twelve, T.n24, T.n48, T.n96, T.every, T.gap, T.at96, T.proved, T.lo, T.hi, T.tt, T.very, T.end];
    order.forEach((v, i) => { if (i && !(order[i - 1] < v)) throw new Error(`b2: mốc ngược ở ${i}`); });
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.archimedes - 0.3, kind: 'pop' }, { t: T.state, kind: 'pen' }, { t: T.ruler, kind: 'tick' },
      { t: T.poly6, kind: 'pen' }, { t: T.poly7, kind: 'pen' }, { t: T.trapped, kind: 'snap' },
      { t: T.six, kind: 'tick' }, { t: T.three9b, kind: 'tick' },
      { t: T.twelve, kind: 'snap' }, { t: T.n24, kind: 'tick' }, { t: T.n48, kind: 'tick' }, { t: T.n96, kind: 'snap' },  // chùm nhân đôi
      { t: T.every, kind: 'pen' }, { t: T.gap, kind: 'snap' },
      { t: T.eight, kind: 'snap' }, { t: T.nine, kind: 'snap' }, { t: T.very, kind: 'shimmer' },
    ];
  }
  nAt(t, steps) { let n = steps[0][0], i0 = 0; steps.forEach(([m, a], i) => { if (t >= a) { n = m; i0 = i; } }); return { n, i: i0, a: steps[i0][1] }; }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.intro(g, t); this.figureSheet(g, t); this.table(g, t); this.bound(g, t);
    g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'I', 'THE SQUEEZE', 'syracuse · 3rd c. bc');
    const kf = prog(t, T.poly6 - 0.35, T.poly6) - prog(t, T.end7 - 0.85, T.end7 - 0.5);
    const P = figure(g, 'compass', 1610, H, 760, kf);
    if (kf >= 1) { const [x, y] = P(8, 578); g.save(); g.fillStyle = C.blue; g.beginPath(); g.arc(x - 2, y + 6, 3.2, 0, 7); g.fill(); g.restore(); }
  }
  intro(g, t) {                                       // câu 4: chân dung vào; đầu câu 5 trượt ra trái
    const T = this.T, out = smooth(prog(t, T.problem - 0.2, T.problem + 0.6));
    if (out >= 1) return;
    g.save(); g.translate(-1300 * out, 0);
    typed(g, 'The first to go after the question', 230, 228, prog(t, T.first, T.systematically + 0.5), `italic 600 54px ${CG}`, C.ink);
    const ka = prog(t, T.archimedes - 0.3, T.archimedes + 0.3);
    portrait(g, 'archimedes', 300, 300, 330, ka);
    typed(g, 'Archimedes', 300, 686, prog(t, T.archimedes, T.archimedes + 0.6), `italic 600 44px ${CG}`, C.ink);
    note(g, '≈ 287–212 bc', 300, 720, prog(t, T.archimedes + 0.4, T.syracuse), { size: 20 });
    note(g, 'imagined · no likeness survives', 300, 748, prog(t, T.syracuse, T.bc + 0.4), { size: 18 });
    note(g, 'syracuse · 3rd century bc', 640, 470, prog(t, T.syracuse, T.bc + 0.3), { color: C.ink, size: 24 });
    g.restore();
  }
  figureSheet(g, t) {
    const T = this.T, cx = this.CX, cy = this.CY, R = this.R;
    // câu 5: vòng compa + thước thẳng đặt lên đường cong
    const rin = outCubic(prog(t, T.lay - 0.1, T.ruler + 0.1)), rout = smooth(prog(t, T.this6 - 0.4, T.draw6));
    if (rin > 0 && rout < 1) {
      g.save(); g.translate(1300 * rout, -(1 - rin) * 260);
      const x0 = 600, x1 = 1140, y0 = cy - R - 40, y1 = cy - R;
      g.fillStyle = 'rgba(239,232,214,0.9)'; g.fillRect(x0, y0, x1 - x0, 40);
      line(g, [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], C.ink, 2);
      for (let x = x0 + 10, i = 0; x < x1; x += 18, i++) line(g, [[x, y1], [x, y1 - (i % 5 ? 9 : 18)]], C.ink, 1.2);
      leader(g, [[cx, y1], [cx + 330, y1 + 60], [x1 + 30, y1 + 60]], prog(t, T.curve, T.read));
      note(g, 'touches at one point', x1 + 40, y1 + 52, prog(t, T.curve + 0.2, T.read), { color: C.ink });
      note(g, 'no length to read off', x1 + 40, y1 + 86, prog(t, T.read, T.length + 0.5));
      g.restore();
    }
    // câu 6: dựng lục giác bằng chì — tia tới đỉnh và cung bước bán kính ở mỗi đỉnh (không tẩy)
    const kc = prog(t, T.this6, T.poly6 + 0.2), a0 = PI / 2;
    if (kc > 0) {
      for (let j = 0; j < 6; j++) {
        const a = a0 + 2 * PI * j / 6, kk = clamp(kc * 6 - j);
        line(g, [[cx, cy], [cx + (R / Math.cos(PI / 6) + 40) * Math.cos(a), cy - (R / Math.cos(PI / 6) + 40) * Math.sin(a)]], 'rgba(138,142,144,0.6)', 1, { k: kk });
        if (kk >= 1) { const vx = cx + R * Math.cos(a), vy = cy - R * Math.sin(a), b = Math.atan2(cy - vy, vx - cx);
          g.save(); g.strokeStyle = C.lead; g.lineWidth = 1.2; g.beginPath(); g.arc(vx, vy, R, -b + PI - 0.12 + PI / 3, -b + PI + 0.12 + PI / 3); g.stroke(); g.restore(); }
      }
    }
    // khe kẹp: hatch chì giữa đa giác ngoài và trong, lộ dần ở "trapped"
    const cur = this.nAt(t, this.STEPS), n = cur.n, kn = prog(t, cur.a, cur.a + 0.45);
    const kh = prog(t, T.trapped - 0.1, T.trapped + 0.8);
    if (kh > 0) {
      const outer = poly(cx, cy, R / Math.cos(PI / n), n, a0), inner = poly(cx, cy, R, n, a0);
      g.save(); g.beginPath(); g.rect(cx - 400, cy - 400, 800 * kh, 800); g.clip();
      g.beginPath(); outer.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath();
      inner.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.clip('evenodd');
      g.strokeStyle = 'rgba(91,95,99,0.5)'; g.lineWidth = 1;
      for (let x = -900; x < 900; x += 9) { g.beginPath(); g.moveTo(cx + x, cy - 420); g.lineTo(cx + x + 840, cy + 420); g.stroke(); }
      g.restore();
    }
    // đa giác: bước trước để lại bằng chì, bước hiện tại vẽ dần bằng mực
    this.STEPS.forEach(([m], i) => { if (i < cur.i) { line(g, poly(cx, cy, R, m, a0), C.lead, 1.1); line(g, poly(cx, cy, R / Math.cos(PI / m), m, a0), C.lead, 1.1); } });
    const kIn = cur.i ? kn : prog(t, T.poly6, T.circle6 + 0.3), kOut = cur.i ? kn : prog(t, T.poly7, T.circle7 + 0.3);
    if (cur.i) { const p = this.STEPS[cur.i - 1][0]; if (kn < 1) { line(g, poly(cx, cy, R, p, a0), C.ink, 2.4); line(g, poly(cx, cy, R / Math.cos(PI / p), p, a0), C.ink, 2.4); } }
    line(g, poly(cx, cy, R, n, a0), C.ink, 2.4, { k: kIn });
    line(g, poly(cx, cy, R / Math.cos(PI / n), n, a0), C.ink, 2.4, { k: kOut });
    if (n <= 12 && kOut >= 1) poly(cx, cy, R / Math.cos(PI / n), n, a0).slice(0, n).forEach(([x, y]) => { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 3.6, 0, 7); g.fill(); g.restore(); });
    // vòng compa vẽ lại lên trên (vật chính, xanh) + chốt
    compassCircle(g, cx, cy, R, { k: prog(t, T.state, T.ruler), a0: PI / 2 + 0.3 });
    pivot(g, cx, cy, prog(t, T.problem, T.state));
    // ghi chú trong / ngoài
    const mi = [cx + R * Math.cos(PI / 6) * Math.cos(4 * PI / 3), cy - R * Math.cos(PI / 6) * Math.sin(4 * PI / 3)];
    leader(g, [mi, [540, 900], [230, 900]], prog(t, T.circle6, T.circle6 + 0.6));
    note(g, `inside · ${n} sides`, 230, 890, prog(t, T.circle6 + 0.3, T.circle6 + 1.0), { color: C.ink });
    note(g, 'perimeter: shorter', 230, 932, prog(t, T.shorter, T.shorter + 0.6), { size: 20 });
    const vo = poly(cx, cy, R / Math.cos(PI / 6), 6, a0)[1];
    leader(g, [vo, [400, 340], [230, 340]], prog(t, T.circle7, T.circle7 + 0.6));
    note(g, `outside · ${n} sides`, 230, 298, prog(t, T.circle7 + 0.3, T.circle7 + 1.0), { color: C.ink });
    note(g, 'perimeter: longer', 230, 330, prog(t, T.longer, T.longer + 0.6), { size: 20 });
    // "which you cannot measure directly": dấu hỏi chì cạnh vòng tròn
    typed(g, '?', cx - R - 110, cy - 10, prog(t, T.directly - 0.1, T.directly + 0.2), `italic 600 96px ${CG}`, C.leadT);
    note(g, 'no ruler fits', cx - R - 190, cy + 40, prog(t, T.directly + 0.1, T.trapped - 0.1), { size: 20 });
    typed(g, 'Trap the curve between straight lines.', 230, 228, prog(t, T.trapped - 0.2, T.numbers8 + 0.4), `italic 600 54px ${CG}`, C.ink);
    // DETAIL A: chỗ kẹp phóng to, khe thu hẹp theo từng lần nhân đôi
    const sa = -PI / 12, sx = cx + R * Math.cos(sa), sy = cy - R * Math.sin(sa), lx = 1710, ly = 760, lr = 140;
    const kd = prog(t, T.every - 0.1, T.every + 0.5);
    if (kd > 0) {
      g.save(); g.strokeStyle = C.leadT; g.lineWidth = 1.3; g.setLineDash([10, 5, 2, 5]); g.beginPath(); g.arc(sx, sy, 40, 0, 2 * PI * kd); g.stroke(); g.restore();
      line(g, [[sx + 40, sy + 6], [lx - lr, ly - 10]], C.leadT, 1.2, { dash: [10, 5, 2, 5], k: kd });
      const L = this.LENS; let ln = 6;
      L.forEach(([m, a], i) => { if (i && t >= a) { const pm = L[i - 1][0], e = smooth(prog(t, a, a + 0.35)); ln = pm * Math.pow(m / pm, e); } });
      detailLens(g, lx, ly, lr, ln, prog(t, T.every, T.every + 0.6));
      const shown = this.nAt(t, L).n;
      note(g, `detail a · ${shown} sides`, lx, ly + lr + 40, prog(t, T.every + 0.3, T.every + 1.0), { color: C.ink, align: 'center' });
      note(g, 'not to scale', lx, ly + lr + 68, prog(t, T.every + 0.6, T.every + 1.2), { size: 18, align: 'center' });
    }
  }
  table(g, t) {                                       // bảng chu vi (đường kính 1): n·sin(π/n) trong, n·tan(π/n) ngoài
    const T = this.T, tx = 1260, ty = 370;
    const kh = prog(t, T.arch9, T.arch9 + 0.8);
    if (kh <= 0) return;
    note(g, 'sides', tx, ty, kh * 3, { size: 18 }); note(g, 'inside', tx + 120, ty, kh * 3 - 1, { size: 18 }); note(g, 'outside', tx + 250, ty, kh * 3 - 2, { size: 18 });
    typed(g, 'n·sin(π/n)', tx + 120, ty + 28, prog(t, T.hexagons, T.hexagons + 0.6), `500 18px ${MONO}`, C.leadT);
    typed(g, 'n·tan(π/n)', tx + 250, ty + 28, prog(t, T.hexagons + 0.3, T.hexagons + 0.9), `500 18px ${MONO}`, C.leadT);
    line(g, [[tx, ty + 42], [tx + 360, ty + 42]], C.ink, 1.2, { k: kh });
    const f = `500 26px ${MONO}`, at96 = t >= T.sides12;
    this.ROWS.forEach(([n, a, b], i) => {
      const y = ty + 82 + i * 40, col = i === 4 && at96 ? C.ink : C.leadT;
      if (i === 0) {
        typed(g, n, tx, y, prog(t, T.six, T.six + 0.15), f, col);
        typed(g, a, tx + 120, y, prog(t, T.three9, T.three9 + 0.4), f, col);
        typed(g, b, tx + 250, y, prog(t, T.three9b, T.six9b + 0.3), f, col);
      } else {
        const a0 = this.STEPS[i][1];
        typed(g, n, tx, y, prog(t, a0, a0 + 0.12), f, col);
        typed(g, a, tx + 120, y, prog(t, a0 + 0.05, a0 + 0.4), f, col);
        typed(g, b, tx + 250, y, prog(t, a0 + 0.1, a0 + 0.45), f, col);
      }
    });
    const y4 = ty + 82 + 4 * 40;
    line(g, [[tx - 10, y4 - 30], [tx + 370, y4 - 30], [tx + 370, y4 + 12], [tx - 10, y4 + 12], [tx - 10, y4 - 30]], C.ink, 1.6, { k: prog(t, T.at96, T.sides12 + 0.3) });
  }
  bound(g, t) {                                       // câu 12–13: 223/71 ≈ 3.1408 < π < 22/7 ≈ 3.1429
    const T = this.T, by = 1075, big = `600 62px ${CG}`;
    const kn = prog(t, T.proved - 0.5, T.proved + 0.3);
    note(g, 'at 96 sides, archimedes', 230, 985, kn);
    const pw = tw(g, 'AT 96 SIDES, ARCHIMEDES', `500 22px ${MONO}`) + 23 * 2 + 18;
    const kp = prog(t, T.proved, T.proved + 0.4);
    note(g, 'proved', 230 + pw + 14, 985, kp, { color: C.blue, size: 28 });
    const bw = tw(g, 'PROVED', `500 28px ${MONO}`) + 14;
    line(g, [[230 + pw, 950], [230 + pw + bw + 26, 950], [230 + pw + bw + 26, 997], [230 + pw, 997], [230 + pw, 950]], C.blue, 2, { k: prog(t, T.proved + 0.2, T.proved + 0.8) });
    let x = 230;
    const wl = tw(g, '223', `600 54px ${CG}`) + 54 * 0.2, wr = tw(g, '22', `600 54px ${CG}`) + 54 * 0.2;
    const xs = {}; xs.f1 = x + wl / 2; x += wl + 24; xs.v1 = x; x += tw(g, `≈ ${this.LO}`, big) + 34;
    xs.lt1 = x; x += tw(g, '<', big) + 34; xs.pi = x; x += tw(g, 'π', `italic 700 96px ${CG}`) + 34;
    xs.lt2 = x; x += tw(g, '<', big) + 60; xs.f2 = x + wr / 2; x += wr + 58; xs.v2 = x; x += tw(g, `≈ ${this.HI}`, big);
    typed(g, 'π', xs.pi, by + 4, prog(t, T.pi12, T.pi12 + 0.15), `italic 700 96px ${CG}`, C.blue);
    typed(g, '<', xs.lt1, by, prog(t, T.pi12 + 0.2, T.pi12 + 0.3), big, C.ink);
    typed(g, '<', xs.lt2, by, prog(t, T.pi12 + 0.25, T.pi12 + 0.35), big, C.ink);
    const kl = prog(t, T.lo, T.eight + 0.2);
    if (kl > 0) { g.save(); g.beginPath(); g.rect(xs.f1 - wl / 2 - 4, by - 100, (wl + 8) * clamp(kl * 3), 140); g.clip(); frac(g, '223', '71', xs.f1, by - 18, 54, C.ink); g.restore(); }
    typed(g, `≈ ${this.LO}`, xs.v1, by, kl * 1.4 - 0.3, big, C.ink);
    const kr = prog(t, T.hi, T.nine + 0.2), blue = t >= T.very;
    if (kr > 0) { g.save(); g.beginPath(); g.rect(xs.f2 - wr / 2 - 4, by - 100, (wr + 8) * clamp(kr * 3), 140); g.clip(); frac(g, '22', '7', xs.f2, by - 18, 54, blue ? C.blue : C.ink); g.restore(); }
    typed(g, `≈ ${this.HI}`, xs.v2, by, kr * 1.4 - 0.3, big, C.ink);
    note(g, 'upper bound', xs.f2 - 20, by - 96, prog(t, T.upper, T.upper + 0.5), { size: 20 });
    ring(g, xs.f2, by - 22, 64, 64, prog(t, T.tt, T.seven + 0.2));
    note(g, 'still in use today', x + 36, by - 10, prog(t, T.still - 0.1, T.today + 0.3), { color: C.blue, size: 24 });
  }
}
