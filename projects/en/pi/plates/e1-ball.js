// e1 · A circle on a ball (p2 câu 69–78) — mở HỒI IV. Một tờ dài, camera đi xuống qua bốn vùng:
//   0 "π = 3.14159…" không đổi; vòng compa phẳng C ÷ d = π "ONLY ON A FLAT SURFACE"
//   1 quả cầu thạch cao (chì + viền mực + đổ bóng gạch): đi cùng khoảng cách từ tâm → vòng xanh; dây đo đường kính men
//     theo mặt cầu; mặt cắt "dọc mặt cong dài hơn sàn phẳng"; C ÷ d < π, bảng a = 0.5 / a = 1 (π·sin a / a)
//   2 cùng quả cầu nhìn lại: tâm ở cực Bắc, vòng = xích đạo, dây qua cực = nửa xích đạo → C ÷ d = 2 (impact, startled)
//   3 tờ giấy uốn yên ngựa (lưới in cong theo), vòng xanh trên đó → C ÷ d > π (π·sinh a / a)
import { H, C, CG, PI, PI_DIGITS, clamp, smooth, outCubic, prog, ground, card, actTitle, typed, note, line,
  compassCircle, pivot, leader, ring, figure, lookup, must, fix, mono } from '../kit.js';

const ZONE = 1080, BETA = 0.42;                    // mỗi vùng cách một khung; góc nhìn quả cầu (nhìn từ vĩ độ 0.42 rad)

// ── hình cầu: vectơ thế giới (x phải, y lên = trục Bắc, z về phía người xem trước khi nghiêng) ──
const sph = (lat, lon) => [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
const add = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const geo = (c, u, s) => add(mul(c, Math.cos(s)), u, Math.sin(s));          // đi quãng s (rad) từ c theo hướng u
function globe(cx, cy, R) {
  const cb = Math.cos(BETA), sb = Math.sin(BETA);
  const P = v => [cx + R * v[0], cy - R * (v[1] * cb - v[2] * sb), v[1] * sb + v[2] * cb >= -1e-6];
  // đường cong trên mặt cầu, vẽ dần theo k: phần trước nét liền, phần sau mặt cầu nét đứt mảnh
  const curve = (g, vs, k, color, w, { hidden = true, hw = w * 0.5 } = {}) => {
    if (k <= 0) return;
    const pts = vs.map(P), n = Math.max(1, Math.round((pts.length - 1) * clamp(k)));
    let run = [pts[0]], vis = pts[0][2];
    const flush = () => {
      if (run.length < 2) return;
      if (vis) line(g, run.map(p => [p[0], p[1]]), color, w);
      else if (hidden) line(g, run.map(p => [p[0], p[1]]), color, hw, { dash: [5, 7] });
    };
    for (let i = 1; i <= n; i++) {
      if (pts[i][2] !== vis) { run.push(pts[i]); flush(); run = [pts[i]]; vis = pts[i][2]; } else run.push(pts[i]);
    }
    flush();
  };
  return { cx, cy, R, P, curve };
}
const basis = c => {                                  // hướng Đông / Bắc tại điểm c (c không ở cực)
  const lon = Math.atan2(c[0], c[2]), lat = Math.asin(c[1]);
  return [[Math.cos(lon), 0, -Math.sin(lon)], [-Math.sin(lat) * Math.sin(lon), Math.cos(lat), -Math.sin(lat) * Math.cos(lon)]];
};
const dirAt = (E, N, th) => add(mul(E, Math.cos(th)), N, Math.sin(th));
const smallCircle = (c, E, N, a, th0 = 0, sweep = 2 * PI, n = 160) =>
  Array.from({ length: n + 1 }, (_, i) => geo(c, dirAt(E, N, th0 + sweep * i / n), a));
const range = (a, b, n = 80) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);

export default class Ball {
  static ERA = 'vellum';
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      textbooks: w(69, 'textbooks'), mention: w(69, 'mention'),
      pi70: w(70, 'pi'), number: w(70, 'number'), changes: w(70, 'changes'), three: w(70, 'three'), nine: w(70, 'nine'), forever: w(70, 'forever'),
      ratio71: w(71, 'ratio'), circles: w(71, "circle's"), circum71: w(71, 'circumference'), diam71: w(71, 'diameter'),
      only: w(71, 'only'), equals: w(71, 'equals'), flat71: w(71, 'flat'), surface: w(71, 'surface'),
      imagine: w(72, 'imagine'), huge: w(72, 'huge'), earth: w(72, 'earth'), draw: w(72, 'draw'), honest: w(72, 'honest'), walking: w(72, 'walking'),
      centre: w(72, 'centre'), every: w(72, 'every'), end72: L(72).end,
      around: w(73, 'around'), circle73: w(73, 'circle'), diam73: w(73, 'diameter'), ground: w(73, 'ground'), measured73: w(73, 'measured'),
      less: w(74, 'less'), pi74: w(74, 'pi'), diam74: w(74, 'diameter'), follow: w(74, 'follow'), curve: w(74, 'curve'),
      longer: w(74, 'longer'), flat74: w(74, 'flat'), floor: w(74, 'floor'), ratio74: w(74, 'ratio'), shrinks: w(74, 'shrinks'),
      push: w(75, 'push'), extreme: w(75, 'extreme'), north: w(75, 'north'), pole: w(75, 'pole'), let: w(75, 'let'), equator75: w(75, 'equator'),
      circum76: w(76, 'circumference'), whole: w(76, 'whole'), diam76: w(76, 'diameter'), runs: w(76, 'runs'), over: w(76, 'over'),
      side: w(76, 'side'), half: w(76, 'half'), equator76: w(76, 'equator', 3),
      so77: w(77, 'so'), ratio77: w(77, 'ratio'), exactly: w(77, 'exactly'), two: w(77, 'two'),
      saddle: w(78, 'saddle'), curves: w(78, 'curves'), ratio78: w(78, 'ratio'), bigger: w(78, 'bigger'), pi78: w(78, 'pi'), end78: L(78).end,
    };
    this.START = L(69).start; this.FROM = this.START - 2.6;
    const T = this.T;
    this.PAN = [this.FROM, L(72).start - 0.4, L(75).start - 0.5, T.curves];
    // toán trên hình (CONTENT.md: C/d = π·sin a / a trên mặt cầu bán kính 1; yên ngựa π·sinh a / a; xích đạo = 2)
    this.N = {
      s05: fix('Math.PI * Math.sin(0.5) / 0.5', 3), s1: fix('Math.PI * Math.sin(1) / 1', 3),
      h05: fix('Math.PI * Math.sinh(0.5) / 0.5', 3), pi: PI_DIGITS.slice(0, 7),
    };
    must(`'${this.N.s05}' === '3.012' && '${this.N.s1}' === '2.644' && '${this.N.h05}' === '3.274'`, true);
    must('Math.PI * Math.sin(Math.PI / 2) / (Math.PI / 2)', 2);
    must('Math.PI * Math.sin(0.5) / 0.5 < Math.PI && Math.PI * Math.sinh(0.5) / 0.5 > Math.PI', true);
    for (const [a, b] of [[T.textbooks, T.mention], [T.three, T.nine], [T.circles, T.diam71], [T.huge, T.earth], [T.walking, T.every],
      [T.follow, T.curve], [T.circum76, T.whole], [T.runs, T.side], [T.so77, T.two], [T.saddle, T.bigger]]) if (!(a < b)) throw new Error('e1: mốc ngược');
    // quả cầu vùng 1 và vùng 2 (toạ độ trong vùng)
    this.G1 = globe(680, 560, 320); this.G2 = globe(600, 580, 310);
    this.c1 = sph(0.5, -0.25); [this.E1, this.N1] = basis(this.c1);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.pi70, kind: 'pen' }, { t: T.circles, kind: 'pen' }, { t: T.imagine, kind: 'pen' }, { t: T.every, kind: 'pen' },
      { t: T.diam73, kind: 'pen' }, { t: T.follow, kind: 'pen' }, { t: T.ratio74, kind: 'tick' }, { t: T.equator75, kind: 'pen' },
      { t: T.runs, kind: 'pen' }, { t: T.two, kind: 'impact' },
    ];
  }
  cam(t) {                                            // vùng hiện tại + trôi chậm (3 px/s ngang, 2 px/s dọc) trong vùng
    const P = this.PAN; let s = 0; for (let i = 1; i < P.length; i++) if (t >= P[i]) s = i;
    const at = (z, u) => ({ x: Math.min(40, 3 * Math.max(0, u - P[z])), y: z * ZONE + Math.min(40, 2 * Math.max(0, u - P[z])) });
    const now = at(s, t - (s ? 1.0 : 0));
    if (!s || t >= P[s] + 1.0) return now;
    const was = at(s - 1, P[s]), e = smooth(prog(t, P[s], P[s] + 1.0)), to = at(s, P[s]);
    return { x: was.x + (to.x - was.x) * e, y: was.y + (to.y - was.y) * e };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    for (let z = 0; z < 4; z++) if (Math.abs(c.y - z * ZONE) < ZONE) this['zone' + z](g, t, z * ZONE);
    g.restore();
    actTitle(g, t, this.START, 'IV', "When the ratio isn't pi", 'answers note 3');
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'IV', 'ON A BALL', 'sphere · saddle');
    const ks = prog(t, T.so77 - 0.3, T.so77 + 0.05) - prog(t, T.curves + 0.15, T.curves + 0.5);
    figure(g, 'startled', 1690, H, 740, ks);
  }
  // ── vùng 0: số π không đổi; tỉ số C ÷ d = π chỉ trên mặt phẳng ──
  zone0(g, t, Y) {
    const T = this.T;
    note(g, '* rarely in textbooks', 140, Y + 230, prog(t, T.textbooks, T.mention + 0.3), { color: C.ink, size: 24 });
    typed(g, 'π', 140, Y + 420, prog(t, T.pi70, T.pi70 + 0.15), `italic 700 140px ${CG}`, C.blue);
    typed(g, '= ' + this.N.pi, 250, Y + 420, prog(t, T.three - 0.15, T.nine + 0.25), `600 120px ${CG}`, C.ink);
    typed(g, '…', 668, Y + 420, prog(t, T.forever, T.forever + 0.2), `600 120px ${CG}`, C.ink);
    note(g, 'the number · never changes', 140, Y + 490, prog(t, T.number, T.changes + 0.5), { color: C.ink, size: 24 });
    // vòng compa trên giấy phẳng
    const cx = 1240, cy = Y + 560, R = 200;
    pivot(g, cx, cy, prog(t, T.ratio71 - 0.3, T.ratio71 + 0.1));
    compassCircle(g, cx, cy, R, { k: prog(t, T.circles, T.diam71 - 0.05), a0: PI / 2 });
    typed(g, 'C', cx - 18, cy - R - 24, prog(t, T.circum71, T.circum71 + 0.2), `italic 700 72px ${CG}`, C.ink);
    line(g, [[cx - R, cy], [cx + R, cy]], C.ink, 2.4, { k: prog(t, T.diam71 - 0.1, T.diam71 + 0.4) });
    typed(g, 'd', cx + 60, cy - 16, prog(t, T.diam71 + 0.2, T.diam71 + 0.4), `italic 700 72px ${CG}`, C.ink);
    const kf = prog(t, T.diam71 + 0.3, T.equals + 0.3), fy = Y + 760;
    typed(g, 'C ÷ d =', 140, fy, kf * 1.2, `italic 600 96px ${CG}`, C.ink);
    typed(g, 'π', 440, fy, prog(t, T.equals + 0.2, T.equals + 0.35), `italic 700 96px ${CG}`, C.blue);
    note(g, 'only on a flat surface', 140, fy + 70, prog(t, T.only, T.surface + 0.4), { color: C.ink, size: 24 });
    line(g, [[140, fy + 82], [218, fy + 82]], C.blue, 2.5, { k: prog(t, T.only + 0.1, T.only + 0.4) });
    line(g, [[cx - 260, cy + R + 60], [cx + 260, cy + R + 60]], C.lead, 1.4, { k: prog(t, T.flat71, T.surface + 0.3) });
    note(g, 'flat paper', cx + 260, cy + R + 96, prog(t, T.flat71 + 0.1, T.surface + 0.4), { align: 'right', size: 20 });
  }
  // ── vùng 1: quả cầu, vòng đi bộ, dây đo, mặt cắt, C ÷ d < π ──
  ball(g, t, G, Y, kOut, kHatch, kCons) {           // quả cầu thạch cao: viền mực, đổ bóng gạch chì, chân đế, dựng hình chì
    const cx = G.cx, cy = Y + G.cy, R = G.R;
    if (kHatch > 0) {
      g.save(); g.beginPath(); g.arc(cx, cy, R - 2, 0, 7); g.clip();
      g.beginPath(); g.rect(cx + R - 2 * R * clamp(kHatch), cy - R, 2 * R * clamp(kHatch) + 2, 2 * R); g.clip();
      g.beginPath(); g.rect(cx - R - 10, cy - R - 10, 2 * R + 20, 2 * R + 20); g.moveTo(cx - 0.32 * R + 1.08 * R, cy - 0.36 * R); g.arc(cx - 0.32 * R, cy - 0.36 * R, 1.08 * R, 0, 7, true); g.clip('evenodd');
      g.strokeStyle = 'rgba(91,95,99,0.42)'; g.lineWidth = 1.1;
      for (let k = -2 * R; k < 2 * R; k += 9) { g.beginPath(); g.moveTo(cx + k - R, cy - R); g.lineTo(cx + k + R, cy + R); g.stroke(); }
      g.restore();
    }
    const outline = range(PI / 2, PI / 2 + 2 * PI, 200).map(a => [cx + R * Math.cos(a), cy - R * Math.sin(a)]);
    line(g, outline, C.ink, 3, { k: kOut });
    const kb = kOut * 2 - 1;                          // chân đế
    line(g, [[cx - 34, cy + R - 2], [cx - 52, cy + R + 52]], C.ink, 2.2, { k: kb });
    line(g, [[cx + 34, cy + R - 2], [cx + 52, cy + R + 52]], C.ink, 2.2, { k: kb });
    const base = range(0, 2 * PI, 60).map(a => [cx + 150 * Math.cos(a), cy + R + 64 + 16 * Math.sin(a)]);
    line(g, base, C.ink, 2.2, { k: kb });
    if (kCons > 0) {                                  // dựng hình chì: xích đạo, kinh tuyến gốc, trục
      g.save(); g.translate(0, Y);
      G.curve(g, range(0, 2 * PI, 120).map(l => sph(0, l)), kCons, C.lead, 1.4);
      G.curve(g, range(-PI / 2, PI / 2 + 0.001, 80).map(l => sph(l, 0)), kCons, C.lead, 1.4);
      g.restore();
      const [nx, ny] = G.P(sph(PI / 2, 0));
      line(g, [[nx, Y + ny], [nx, Y + ny - 46]], C.lead, 1.4, { k: kCons });
      note(g, 'n', nx + 12, Y + ny - 40, kCons * 2 - 1, { size: 22 });
    }
  }
  zone1(g, t, Y) {
    const T = this.T, G = this.G1, c = this.c1, E = this.E1, N = this.N1, a = 0.5;
    this.ball(g, t, G, Y, prog(t, T.imagine, T.earth + 0.3), prog(t, T.earth, T.draw + 0.3), prog(t, T.huge, T.honest));
    g.save(); g.translate(0, Y);
    // tâm + đi cùng quãng a theo 8 hướng (chì), rồi nối thành vòng xanh
    const [px, py] = G.P(c);
    for (let i = 0; i < 8; i++) {
      const th = 0.3 + i * PI / 4, k = prog(t, T.walking + i * 0.22, T.walking + i * 0.22 + 0.6);
      G.curve(g, range(0, a, 30).map(s => geo(c, dirAt(E, N, th), s)), k, C.leadT, 1.4);
      if (k >= 1) { const [qx, qy] = G.P(geo(c, dirAt(E, N, th), a)); g.fillStyle = C.ink; g.beginPath(); g.arc(qx, qy, 3.2, 0, 7); g.fill(); }
    }
    pivot(g, px, py, prog(t, T.walking - 0.35, T.walking));
    const [ax, ay] = G.P(geo(c, dirAt(E, N, 0.3 + 2 * PI / 4), a * 0.55));
    typed(g, 'a', ax - 30, ay + 6, prog(t, T.centre, T.centre + 0.2), `italic 700 46px ${CG}`, C.ink);
    const kc = prog(t, T.every, T.end72 + 0.7);
    G.curve(g, smallCircle(c, E, N, a, 0.3, 2 * PI + 0.16), kc, C.blue, 4.5);
    // "measure around": vạch chì quanh vòng; C
    for (let i = 0; i < 24; i++) {
      const k = prog(t, T.around + i * 0.04, T.around + i * 0.04 + 0.1); if (k <= 0) continue;
      const d = dirAt(E, N, i * PI / 12), [x0, y0] = G.P(geo(c, d, a - 0.035)), [x1, y1] = G.P(geo(c, d, a + 0.035));
      line(g, [[x0, y0], [x1, y1]], C.ink, 1.4, { k });
    }
    const [lx, ly] = G.P(geo(c, dirAt(E, N, 2.2), a + 0.1));
    typed(g, 'C', lx - 34, ly, prog(t, T.circle73, T.circle73 + 0.2), `italic 700 46px ${CG}`, C.blue);
    // dây đo đường kính men theo mặt cầu (mực đậm, nút ở hai đầu)
    const kd = prog(t, T.diam73, T.measured73);
    G.curve(g, range(-a, a, 60).map(s => geo(c, E, s)), kd, C.ink, 4.5);
    if (kd >= 1) for (const s of [-a, a]) { const [qx, qy] = G.P(geo(c, E, s)); g.fillStyle = C.ink; g.beginPath(); g.arc(qx, qy, 6, 0, 7); g.fill(); }
    const [dx, dy] = G.P(geo(c, E, a * 0.6));
    typed(g, 'd', dx - 8, dy - 16, prog(t, T.diam73 + 0.4, T.diam73 + 0.6), `italic 700 46px ${CG}`, C.ink);
    // a = 1: vòng lớn hơn (chì) khi "ratio shrinks"
    G.curve(g, smallCircle(c, E, N, 1, 0.3, 2 * PI + 0.05), prog(t, T.shrinks - 0.3, T.shrinks + 0.8), C.leadT, 2);
    const [bx, by] = G.P(geo(c, dirAt(E, N, -0.9), 1.0));
    mono(g, 'a = 1', bx + 14, by + 34, prog(t, T.shrinks + 0.4, T.shrinks + 0.9), C.leadT, 20);
    g.restore();
    const [ex, ey] = G.P(geo(c, E, a));
    leader(g, [[ex, Y + ey], [ex + 120, Y + 250], [1110, Y + 250]], prog(t, T.ground - 0.4, T.ground));
    mono(g, 'd · measured along the ground', 1130, Y + 258, prog(t, T.ground - 0.2, T.ground + 0.9));
    // C ÷ d < π, bảng
    const kl = prog(t, T.less - 0.1, T.pi74 + 0.1);
    typed(g, 'C ÷ d <', 1110, Y + 390, kl * 1.25, `italic 600 96px ${CG}`, C.ink);
    typed(g, 'π', 1372, Y + 390, prog(t, T.pi74, T.pi74 + 0.15), `italic 700 96px ${CG}`, C.blue);
    mono(g, 'BALL OF RADIUS 1 · a = DISTANCE WALKED', 1110, Y + 450, prog(t, T.ratio74 - 0.4, T.ratio74 + 0.6), C.leadT, 18);
    mono(g, `a = 0.5   C ÷ d ≈ ${this.N.s05}`, 1110, Y + 494, prog(t, T.ratio74, T.ratio74 + 0.5));
    mono(g, `a = 1     C ÷ d ≈ ${this.N.s1}`, 1110, Y + 534, prog(t, T.shrinks, T.shrinks + 0.5));
    // mặt cắt: dây men theo cung dài hơn sàn phẳng
    const fx = 1110, fy = Y + 590, fw = 690, fh = 300, kfr = prog(t, T.diam74 - 0.2, T.diam74 + 0.4);
    line(g, [[fx, fy], [fx + fw, fy], [fx + fw, fy + fh], [fx, fy + fh], [fx, fy]], C.leadT, 1.2, { k: kfr });
    note(g, 'section through the ball', fx + 18, fy + 32, kfr * 1.5 - 0.3, { size: 18 });
    const scx = fx + 300, scy = fy + 390, sR = 270, sa = 0.75;
    const sec = (a0, a1, n = 60) => range(a0, a1, n).map(u => [scx + sR * Math.sin(u), scy - sR * Math.cos(u)]);
    line(g, sec(-1.0, 1.0), C.lead, 1.6, { k: prog(t, T.diam74, T.follow) });
    line(g, sec(-sa, sa), C.ink, 4.5, { k: prog(t, T.follow, T.curve + 0.4) });
    const [sx0, sy0] = [scx - sR * Math.sin(sa), scy - sR * Math.cos(sa)], [sx1, sy1] = [scx + sR * Math.sin(sa), sy0];
    if (t > T.curve + 0.4) for (const x of [sx0, sx1]) { g.fillStyle = C.ink; g.beginPath(); g.arc(x, sy0, 6, 0, 7); g.fill(); }
    note(g, 'along the curve: longer', scx, scy - sR - 22, prog(t, T.longer - 0.2, T.longer + 0.6), { color: C.ink, size: 18, align: 'center' });
    line(g, [[sx0, sy0], [sx1, sy1]], C.leadT, 2, { dash: [8, 7], k: prog(t, T.flat74 - 0.1, T.floor + 0.2) });
    note(g, 'flat floor', sx1 + 22, sy0 + 8, prog(t, T.flat74, T.floor + 0.4), { size: 18 });
  }
  // ── vùng 2: tâm ở cực Bắc, vòng = xích đạo, dây qua cực = nửa xích đạo → 2 ──
  zone2(g, t, Y) {
    const T = this.T, G = this.G2, pole = sph(PI / 2, 0);
    this.ball(g, t, G, Y, prog(t, T.push, T.extreme + 0.5), prog(t, T.extreme, T.extreme + 0.8), prog(t, T.extreme + 0.3, T.north));
    g.save(); g.translate(0, Y);
    const dir = th => [Math.cos(th), 0, Math.sin(th)];
    for (let i = 0; i < 8; i++) {                     // đi từ cực xuống xích đạo theo 8 kinh tuyến
      const th = PI / 2 + 0.2 + i * PI / 4, k = prog(t, T.let + i * 0.12, T.let + i * 0.12 + 0.6);
      G.curve(g, range(0, PI / 2, 40).map(s => geo(pole, dir(th), s)), k, C.leadT, 1.3);
    }
    const [px, py] = G.P(pole);
    pivot(g, px, py, prog(t, T.north, T.pole + 0.1));
    // xích đạo xanh (quét từ điểm trước mặt)
    G.curve(g, range(PI / 2, PI / 2 + 2 * PI + 0.16, 200).map(dir), prog(t, T.equator75, T.whole + 0.3), C.blue, 4.5, { hw: 2.5 });
    // dây đường kính: từ xích đạo bên trái, qua cực, xuống bên phải (đi đúng mép nhìn thấy)
    const kd = prog(t, T.runs, T.side + 0.2);
    G.curve(g, range(-PI / 2, PI / 2, 90).map(s => [Math.sin(s), Math.cos(s), 0]), kd, C.ink, 4.5);
    if (kd > 0) { const [qx, qy] = G.P([-1, 0, 0]); g.fillStyle = C.ink; g.beginPath(); g.arc(qx, qy, 6, 0, 7); g.fill(); }
    if (kd >= 1) { const [qx, qy] = G.P([1, 0, 0]); g.fillStyle = C.ink; g.beginPath(); g.arc(qx, qy, 6, 0, 7); g.fill(); }
    const [dx, dy] = G.P([Math.sin(0.55), Math.cos(0.55), 0]);
    typed(g, 'd', dx + 14, dy - 10, prog(t, T.over, T.over + 0.2), `italic 700 46px ${CG}`, C.ink);
    // đường kích thước dưới nửa xích đạo phía trước: = d
    const kh = prog(t, T.half - 0.1, T.equator76 + 0.4);
    if (kh > 0) {
      const front = range(PI, 0, 80).map(th => { const [x, y] = G.P(dir(th)); return [x, y + 30]; });
      const [l0, r0] = [G.P([-1, 0, 0]), G.P([1, 0, 0])];
      line(g, [[l0[0], l0[1] + 8], [l0[0], l0[1] + 44]], C.ink, 1.4, { k: kh * 3 });
      line(g, front, C.ink, 1.6, { k: kh, dash: [10, 6] });
      line(g, [[r0[0], r0[1] + 8], [r0[0], r0[1] + 44]], C.ink, 1.4, { k: kh * 3 - 2 });
      typed(g, '= d', r0[0] + 18, r0[1] + 44, kh * 3 - 2, `italic 700 46px ${CG}`, C.ink);
    }
    g.restore();
    const x = 1010;
    mono(g, 'C = the whole equator', x, Y + 330, prog(t, T.circum76, T.whole + 0.6));
    mono(g, 'd = equator → pole → equator', x, Y + 378, prog(t, T.runs, T.side + 0.3));
    mono(g, '  = half the equator', x, Y + 426, prog(t, T.half - 0.1, T.equator76 + 0.4), C.blue);
    // C ÷ d = 2 — một tiếng impact, startled
    typed(g, 'C ÷ d =', x, Y + 780, prog(t, T.ratio77 - 0.1, T.exactly) * 1.2, `italic 600 96px ${CG}`, C.ink);
    const k2 = prog(t, T.two - 0.08, T.two + 0.15);
    if (k2 > 0) {
      const sc = 1 + (1 - outCubic(k2)) * 0.9;
      g.save(); g.translate(x + 322, Y + 780); g.scale(sc, sc);
      typed(g, '2', 0, 0, 1, `600 120px ${CG}`, C.ink, { align: 'center' }); g.restore();
    }
    ring(g, x + 322, Y + 742, 58, 70, prog(t, T.two, T.two + 0.25));
  }
  // ── vùng 3: yên ngựa — tờ giấy uốn ngược, lưới in cong theo, vòng xanh → C ÷ d > π ──
  zone3(g, t, Y) {
    const T = this.T, cx = 720, cy = Y + 560, S = 330, h = 0.42, yaw = 0.55, el = 0.5;
    const P = (u, v) => {
      const z = h * (u * u - v * v), X = u * Math.cos(yaw) - v * Math.sin(yaw), D = u * Math.sin(yaw) + v * Math.cos(yaw);
      return [cx + S * X, cy - S * (z * Math.cos(el) + D * Math.sin(el))];
    };
    const kg = prog(t, T.curves + 0.5, T.curves + 1.6);
    for (let i = 1; i < 12; i++) {                    // lưới in (xanh xám), cong theo tờ giấy
      const q = -1 + i / 6, k = prog(kg, i / 24, i / 24 + 0.5);
      line(g, range(-1, 1, 40).map(v => P(q, v)), 'rgb(84,126,150)', 1.3, { k });
      line(g, range(-1, 1, 40).map(u => P(u, q)), 'rgb(84,126,150)', 1.3, { k });
    }
    const ke = prog(t, T.curves + 0.2, T.curves + 0.9);   // mép tờ giấy (mực)
    const edge = [...range(-1, 1, 40).map(v => P(-1, v)), ...range(-1, 1, 40).map(u => P(u, 1)),
      ...range(1, -1, 40).map(v => P(1, v)), ...range(1, -1, 40).map(u => P(u, -1))];
    line(g, edge, C.ink, 2.6, { k: ke });
    const [ox, oy] = P(0, 0);
    pivot(g, ox, oy, prog(t, T.ratio78 - 0.4, T.ratio78));
    const kc = prog(t, T.ratio78, T.bigger + 0.3), sw = (2 * PI + 0.16) * kc, r = 0.42;
    if (kc > 0) line(g, range(-0.5, -0.5 + sw, 160).map(a => P(r * Math.cos(a), r * Math.sin(a))), C.blue, 4.5);
    note(g, 'curves the other way', 1180, Y + 300, prog(t, T.curves + 0.4, T.curves + 1.2), { size: 22 });
    const kl = prog(t, T.bigger - 0.1, T.pi78 + 0.1);
    typed(g, 'C ÷ d >', 1180, Y + 430, kl * 1.25, `italic 600 96px ${CG}`, C.ink);
    typed(g, 'π', 1442, Y + 430, prog(t, T.pi78, T.pi78 + 0.15), `italic 700 96px ${CG}`, C.blue);
    mono(g, `a = 0.5   C ÷ d ≈ ${this.N.h05}`, 1180, Y + 494, prog(t, T.bigger, T.bigger + 0.6));
  }
}
