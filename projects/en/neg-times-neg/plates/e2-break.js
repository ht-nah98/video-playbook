// e2 · Try to break it (Hồi IV, câu 86–98). Hai vùng trên một tấm thảm:
//   0 đúng khung lab 1 (tools/lab/tiles.html): giấy nhớ "Suppose we decide… (−1) × (−1) = −1"; (−1) × (1 + (−1)) = 0 bằng
//     một zero pair; = (−1) × 1 + (−1) × (−1) bằng hai chữ nhật 1×1 (viên của luật mới viền băng); = −1 + (−1) = −2;
//     hai viên đỏ úp mà KHÔNG biến; "0 = −2" + vết nứt băng (`impact`, `startled`); "arithmetic collapses"
//   1 cái giá: phải vứt phân phối (thẻ trượt khỏi thảm) → tính nhẩm 23 × 7 và (a + b)² gạch băng (ở thế giới sai),
//     biểu thức tương đương nứt, "some strange other system · almost useless"
import { W, H, C, CG, ARC, MONO, clamp, smooth, outCubic, prog, ground, card, text, typed, label, mono, quote, eq, mid, tile,
  zeroPair, footprint, mulRect, crack, stickyNote, line, arrowHead, figure, num, par, lookup, must } from '../kit.js';

const ZONE = 1080;

/** Thẻ luật (như d5): viền ngà, tên Plex VIẾT HOA, công thức mono. lit < 0.5 = viền đứt nhạt (chưa được gọi); dx/rot để trượt khỏi thảm. */
function ruleCard(g, x, y, w, h, k, title, lines, { dx = 0, rot = 0, lit = 1 } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x + w / 2 + dx, y + h / 2 + (1 - e) * 50); g.rotate(rot); g.translate(-w / 2, -h / 2); g.globalAlpha = clamp(k * 3);
  g.save(); g.shadowColor = 'rgba(5,10,18,0.5)'; g.shadowBlur = 16; g.shadowOffsetY = 8;
  g.fillStyle = 'rgba(30,44,58,0.95)'; g.beginPath(); g.roundRect(0, 0, w, h, 14); g.fill(); g.restore();
  const ink = lit > 0.5 ? C.ink : C.dim;
  g.strokeStyle = ink; g.lineWidth = 2 + 0.6 * lit; g.setLineDash(lit > 0.5 ? [] : [9, 7]); g.stroke(); g.setLineDash([]);
  label(g, title, w / 2, 48, 1, { color: ink, align: 'center', size: 22 });
  lines.forEach((s, i) => mono(g, s, w / 2, 112 + (2 - lines.length) * 20 + i * 40, 1, ink, 24, 'center'));
  g.restore();
}

export default class Break {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      happens: w(86, 'happens'), suppose: w(86, 'suppose'), fun: w(86, 'fun'), m1: w(86, 'minus', 1), m3: w(86, 'minus', 3), one3: w(86, 'one', 3),
      keep: w(86, 'keep'), e86: L(86).end,
      take: w(87, 'take'), plus87: w(87, 'plus'), e87: L(87).end,
      brackets: w(88, 'brackets'), zero88: w(88, 'zero', 1), answer88: w(88, 'answer'), times88: w(88, 'times'), which: w(88, 'which'), e88: L(88).end,
      distributive89: w(89, 'distributive'), also: w(89, 'also'), times1: w(89, 'times', 1), times2: w(89, 'times', 2), e89: L(89).end,
      thats: w(90, "that's"), plus90: w(90, 'plus'), new90: w(90, 'new'), minus3: w(90, 'minus', 3), two90: w(90, 'two'), e90: L(90).end,
      zero91: w(91, 'zero'), equals91: w(91, 'equals'), two91: w(91, 'two'), e91: L(91).end,
      change: w(92, 'change'), arithmetic: w(92, 'arithmetic'), e92: L(92).end,
      make: w(93, 'make'), out93: w(93, 'out'), enough: w(93, 'enough'), convention: w(93, 'convention'), e93: L(93).end,
      throw: w(94, 'throw'), distributive94: w(94, 'distributive'), law94: w(94, 'law'), or94: w(94, 'or'), opposite: w(94, 'opposite'), e94: L(94).end,
      without: w(95, 'without'), lot: w(95, 'lot'), doing: w(95, 'doing'), head: w(95, 'head'), stops95: w(95, 'stops'), e95: L(95).end,
      formula: w(96, 'formula'), squared: w(96, 'squared'), being: w(96, 'being'), e96: L(96).end,
      idea: w(97, 'idea'), expression: w(97, 'expression'), equivalent: w(97, 'equivalent'), falls: w(97, 'falls'), e97: L(97).end,
      longer: w(98, 'longer'), know: w(98, 'know'), strange: w(98, 'strange'), system: w(98, 'system'), perhaps: w(98, 'perhaps'),
      useless: w(98, 'useless'), e98: L(98).end,
    };
    this.START = L(86).start; this.FROM = this.START - 1.2;
    this.PAN = [this.FROM, L(93).start - 0.6];
    const rule = -1;
    this.V = { rule, z: must('1 + (-1)', 0), p0: must('(-1) * 0', 0), t1: must('(-1) * 1', -1), sum: must('(-1) * 1 + (-1)', -2),
      a: must('20 * 7', 140), b: must('3 * 7', 21), ab: must('23 * 7', 161) };
    if (must('(-1) * (-1)', 1) === rule) throw new Error('e2: giả định phải khác luật thật');
    must(`${this.V.a} + ${this.V.b}`, this.V.ab);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.suppose - 0.1, kind: 'snap' }, { t: T.zero88 - 0.2, kind: 'pop' }, { t: T.times1, kind: 'chip' },
      { t: T.two91, kind: 'impact' },
      { t: T.throw, kind: 'snap' }, { t: T.stops95, kind: 'error' }, { t: T.being, kind: 'error' }, { t: T.strange, kind: 'tick' },
    ];
  }
  cam(t) {                                            // như a0: vùng hiện tại + trôi chậm 3 px/s xuống trong vùng
    const P = this.PAN; let s = 0; for (let i = 0; i < P.length; i++) if (t >= P[i]) s = i;
    const e = s ? smooth(prog(t, P[s], P[s] + 1.0)) : 1, from = s ? (s - 1) * ZONE + Math.min(40, 2 * (P[s] - P[s - 1])) : 0;
    const y0 = s * ZONE + Math.min(60, 3 * Math.max(0, t - P[s] - (s ? 1.0 : 0)));
    return { x: 0, y: s ? from + (y0 - from) * e : Math.min(40, 2 * Math.max(0, t - P[0])) };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01) this.zone1(g, t, ZONE);
    g.restore();
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.7) - prog(t, this.PAN[1] - 0.6, this.PAN[1]), 'act IV', 'TRY TO BREAK IT');
    // "So zero equals minus two." — toàn thân, giật mình, bên trái (như khung lab)
    figure(g, 'startled', 262, H, 760, prog(t, T.zero91 - 0.6, T.zero91 - 0.25) - prog(t, T.e92 + 0.4, T.e92 + 0.75));
  }
  zone0(g, t) {
    const T = this.T, V = this.V;
    // giấy nhớ: giả định (chừa góc trái trên cho thẻ mục)
    const inNote = stickyNote(g, 1000, 62, 560, 176, prog(t, T.suppose - 0.3, T.suppose + 0.15), { rot: -0.025 });
    inNote(() => {
      typed(g, 'Suppose we decide…', 32, 58, prog(t, T.suppose, T.fun + 0.2), `italic 600 36px ${CG}`, C.noteDim);
      const kn = prog(t, T.m1, T.one3 + 0.2);
      eq(g, [[par(-1), C.noteNeg], [' × ', C.noteInk], [par(-1), C.noteNeg], [' = ', C.noteInk], [num(V.rule), C.noteNeg]], 32, 138, 56, kn);
      typed(g, '?', 500, 138, prog(t, T.one3 + 0.2, T.one3 + 0.4), `600 56px ${ARC}`, C.noteDim, { align: 'center' });
    });
    label(g, 'keep every other rule', 1824, 290, prog(t, T.keep - 0.1, T.e86 + 0.3), { size: 20, align: 'right' });
    // "what happens if you don't" — tiêu đề của vùng, viết từ FROM + 0.3 và giữ nguyên
    quote(g, 'What happens if we don’t?', 140, 262, prog(t, this.FROM + 0.3, T.suppose), { size: 54, color: C.dim });
    // "and we keep everything else": ba thẻ luật nhỏ dán dưới đáy — các luật cũ vẫn giữ
    ['distributive', 'opposites', 'zero'].forEach((s, i) => {
      const k = prog(t, T.keep + i * 0.25 - 0.1, T.keep + i * 0.25 + 0.3); if (k <= 0) return;
      const x = [500, 720, 920][i], wd = [196, 176, 96][i], y = 944 + (1 - outCubic(k)) * 30;
      g.save(); g.globalAlpha = clamp(k * 3); g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.roundRect(x, y, wd, 46, 8); g.stroke(); g.restore();
      label(g, s, x + wd / 2, y + 30, 1, { align: 'center', size: 16, color: C.ink });
    });
    // dòng A: (−1) × (1 + (−1)) = (−1) × 0 = 0 — 1 và −1 trong ngoặc là một zero pair thật
    const S1 = 58, X0 = 500;
    const kA1 = prog(t, T.take, T.e87), kA2 = prog(t, T.answer88, T.e88);
    const PA = [[par(-1), C.negT], [' × ('], ['1', C.posT], [' + '], [par(-1), C.negT], [')']], QA = [[' = '], [par(-1), C.negT], [' × '], [num(V.z)], [' = '], [num(V.p0)]];
    const LA = eq(g, PA, X0, 338, S1, kA1);
    const endA = LA.at(-1)[1], LQ = eq(g, QA, endA, 338, S1, kA2);
    const zs = 50, zx = mid(LA[2]) - zs / 2;
    zeroPair(g, zx, 384, zs, prog(t, T.brackets, T.zero88 + 0.1), { top: 'n', bot: 'p', show: prog(t, T.plus87, T.e87) });
    const ka = prog(t, T.times88, T.which);
    if (ka > 0) {
      line(g, [[zx + zs + 26, 410], [mid(LQ[3]) - 44, 410]], C.dim, 2, { dash: [2, 8], k: ka });
      if (ka >= 1) arrowHead(g, mid(LQ[3]) - 34, 410, 0, C.dim, 14);
      footprint(g, mid(LQ[3]) - 25, 384, 50, ka, { zero: false });
    }
    // dòng B: = (−1) × 1 + (−1) × (−1) → hai chữ nhật 1×1; viên tích thứ hai theo luật mới: đỏ, viền băng
    const LB = eq(g, [['= '], [par(-1), C.negT], [' × '], ['1', C.posT], [' + '], [par(-1), C.negT], [' × '], [par(-1), C.negT]], X0, 568, S1, prog(t, T.also, T.e89));
    const B1 = [LB[1][0], LB[3][1]], B2 = [LB[5][0], LB[7][1]];
    const s = 60, wR = 2 * (s + 7) + 18 - 7;
    const R1 = mulRect(g, mid(B1) - wR / 2, 606, s, 1, 1, 'n', 'p', 'n', prog(t, T.times1 - 0.1, T.times1 + 0.7));
    const k2 = prog(t, T.times2 - 0.1, T.times2 + 0.7);
    const R2 = mulRect(g, mid(B2) - wR / 2, 606, s, 1, 1, 'n', 'n', 'n', k2, { wrong: true });
    label(g, `= ${num(V.t1)}`, R1.x1 + 24, R1.Y + s / 2 + 8, prog(t, T.times1 + 0.5, T.times1 + 0.9), { color: C.negT, size: 24 });
    label(g, `= ${num(V.rule)}`, R2.x1 + 30, R2.Y + s / 2 + 8, prog(t, T.times2 + 0.5, T.e89 + 0.3), { color: C.negT, size: 24 });
    label(g, 'new rule', R2.x1 + 30, R2.Y + s / 2 - 30, prog(t, T.times2 + 0.3, T.e89 + 0.4), { color: C.ice, size: 18 });
    // dòng C: = −1 + (−1) = −2
    eq(g, [['= '], [num(V.t1), C.negT], [' + '], [par(V.rule), C.negT], [' = '], [num(V.sum), C.negT]], X0, 860, S1, prog(t, T.thats, T.two90 + 0.3));
    // phải: −1 và −1 úp vào nhau nhưng KHÔNG biến — chỗ zero pair lẽ ra để lại dấu chân
    const px = 1460, py = 330, ts = 116, kp = prog(t, T.plus90 - 0.4, T.plus90);
    if (kp > 0) {
      footprint(g, px - 40, py - 10, ts, prog(t, T.new90, T.minus3), { zero: false });
      label(g, 'a zero pair', px - 40 + ts / 2, py + ts + 34, prog(t, T.new90, T.minus3 + 0.2), { align: 'center', size: 18 });
      label(g, 'should leave this', px - 40 + ts / 2, py + ts + 60, prog(t, T.new90 + 0.2, T.minus3 + 0.4), { align: 'center', size: 18 });
      zeroPair(g, px + 180, py + 26, ts, prog(t, T.plus90, T.new90 + 0.3), { top: 'n', bot: 'n', cancel: false, show: kp });
      label(g, `${num(V.rule)} and ${num(V.rule)}`, px + 180 + ts * 0.6, py + ts + 60, prog(t, T.minus3, T.two90 + 0.2), { color: C.negT, align: 'center', size: 18 });
      label(g, 'do not cancel', px + 180 + ts * 0.6, py + ts + 86, prog(t, T.two90, T.e90 + 0.3), { color: C.ice, align: 'center', size: 18 });
    }
    // 0 = −2: vế phải rơi lệch khỏi vế trái, vết nứt băng chạy qua thảm
    const LZ = eq(g, [[num(V.z) + ' = ']], 1290, 760, 168, prog(t, T.zero91, T.equals91 + 0.2));
    const ex = LZ[0][1] + 10, kz = prog(t, T.two91 - 0.05, T.two91 + 0.2);
    crack(g, [[ex + 36, 606], [ex + 44, 640], [ex + 4, 700], [ex + 18, 770], [ex - 60, 806], [1340, 820], [1292, 890],
      [1210, 960], [1150, 952], [1080, 1030]], prog(t, T.two91, T.e91 + 0.6), 3);
    if (kz > 0) {
      g.save(); g.translate(ex + 40, 772 - (1 - outCubic(kz)) * 80); g.rotate(0.045 * outCubic(kz));
      typed(g, num(V.sum), 0, 0, 1, `600 168px ${ARC}`, C.negT); g.restore();
    }
    label(g, 'arithmetic collapses', 1570, 912, prog(t, T.arithmetic, T.e92 + 0.2), { color: C.ice, align: 'center', size: 24 });
  }
  zone1(g, t, Y) {
    const T = this.T, V = this.V;
    // muốn âm × âm ra âm: không chỉ là đổi một quy ước
    eq(g, [['negative', C.negT], [' × '], ['negative', C.negT], [' = '], ['negative', C.negT], [' ?']], 140, Y + 250, 54, prog(t, T.make, T.out93 + 0.5));
    label(g, 'not just a different convention', 140, Y + 316, prog(t, T.enough - 0.2, T.e93), { color: C.ink, size: 24 });
    // phải vứt một luật: thẻ PHÂN PHỐI trượt khỏi thảm, để lại dấu chân; "hoặc" thẻ SỐ ĐỐI
    const CW = 360, CH = 200, cy = Y + 380, kc = prog(t, this.PAN[1] + 0.5, this.PAN[1] + 1.0), kl = prog(t, T.throw - 0.2, T.throw + 0.2);
    const go = smooth(prog(t, T.distributive94, T.law94 + 0.4));
    if (kc > 0) {
      g.save(); g.strokeStyle = C.dim; g.lineWidth = 2.4; g.setLineDash([10, 8]); g.globalAlpha = clamp(go * 2);
      g.beginPath(); g.roundRect(140, cy, CW, CH, 14); g.stroke(); g.restore();
      label(g, 'thrown away', 140 + CW / 2, cy + CH / 2 + 8, prog(t, T.distributive94 + 0.5, T.or94), { align: 'center', size: 20 });
      label(g, 'without it…', 140 + CW / 2, cy + CH + 44, prog(t, T.without, T.lot), { align: 'center', size: 20, color: C.ink });
      label(g, 'or', 140 + CW + 46, cy + CH / 2 + 8, prog(t, T.or94, T.or94 + 0.3), { align: 'center', size: 24, color: C.ink });
      const wob = Math.sin(prog(t, T.opposite, T.e94 + 0.2) * Math.PI * 3) * 0.04 * (1 - prog(t, T.e94, T.e94 + 0.4));
      ruleCard(g, 140 + CW + 92, cy, CW, CH, kc, 'opposites', ['x + (−x) = 0'], { rot: wob, lit: kl });
      ruleCard(g, 140, cy, CW, CH, kc, 'distributive', ['a × (b + c)', '= a × b + a × c'], { dx: -go * 900, rot: -go * 0.5, lit: kl });
    }
    // "a lot more goes with it": cột phải — mỗi đẳng thức viết vào, rồi dấu "=" của nó nứt
    const RX = 1100;
    label(g, 'a lot more goes with it', RX, Y + 380, prog(t, T.lot - 0.1, T.e95 - 2.2), { size: 22, color: C.ink });
    label(g, 'sums in your head', RX, Y + 450, prog(t, T.doing, T.head + 0.2), { size: 18 });
    // đẳng thức vẫn ĐÚNG (ngà/vàng); cái gãy là cây cầu "=" — nứt băng đúng ở dấu bằng (không gạch ý đúng, §58)
    const L1 = eq(g, [['23', C.posT], [' × '], ['7', C.posT], [' = '], ['20', C.posT], [' × '], ['7', C.posT], [' + '], ['3', C.posT], [' × '], ['7', C.posT]],
      RX, Y + 512, 50, prog(t, T.doing, T.stops95));
    const eqCrack = (r, yb, k) => { const x = mid(r); crack(g, [[x + 4, yb - 50], [x - 8, yb - 30], [x + 8, yb - 14], [x - 6, yb + 6], [x + 6, yb + 24]], k, 3); };
    eqCrack(L1[3], Y + 512, prog(t, T.stops95, T.e95 + 0.2));
    label(g, 'without the distributive law · no longer guaranteed', RX, Y + 414, prog(t, T.stops95, T.e95 + 0.6), { size: 16 });
    label(g, 'the formula', RX, Y + 600, prog(t, T.formula - 0.1, T.formula + 0.4), { size: 18 });
    const L2 = eq(g, [['(a + b)²'], [' = '], ['a² + 2ab + b²']], RX, Y + 662, 50, prog(t, T.formula, T.being - 0.1));
    eqCrack(L2[1], Y + 662, prog(t, T.being, T.e96 + 0.2));
    // biểu thức ↔ dạng tương đương: cầu "=" giữa hai ô nứt
    const ke = prog(t, T.expression - 0.2, T.expression + 0.4);
    if (ke > 0) {
      const by = Y + 740, bw = 290, bh = 92;
      [[RX, 'one expression', T.expression], [RX + bw + 120, 'equivalent form', T.equivalent]].forEach(([x, s, at]) => {
        const k = prog(t, at - 0.2, at + 0.4); if (k <= 0) return;
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.globalAlpha = clamp(k * 2); g.beginPath(); g.roundRect(x, by, bw, bh, 12); g.stroke(); g.restore();
        label(g, s, x + bw / 2, by + bh / 2 + 8, k, { align: 'center', size: 20, color: C.ink });
      });
      const kq = prog(t, T.equivalent, T.equivalent + 0.3), mx = RX + bw + 60;
      typed(g, '=', mx, by + bh / 2 + 18, kq, `600 60px ${ARC}`, C.ink, { align: 'center' });
      crack(g, [[mx + 6, by - 20], [mx - 8, by + 24], [mx + 10, by + 52], [mx - 6, by + 80], [mx + 8, by + bh + 22]], prog(t, T.falls, T.e97 + 0.2), 3);
    }
    // không còn là các số ta biết
    quote(g, 'You would no longer be in the numbers you know.', 140, Y + 760, prog(t, T.longer - 0.2, T.know + 0.4), { size: 40, color: C.dim });
    quote(g, 'some strange other system', 140, Y + 860, prog(t, T.strange - 0.1, T.system + 0.4), { size: 64, color: C.ice });
    label(g, 'perhaps consistent · almost useless', 144, Y + 930, prog(t, T.perhaps, T.useless + 0.4), { color: C.ice, size: 24 });
  }
}
