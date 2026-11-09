// e2 · 私たちの宇宙 (p2, câu 121–129). DNA e2: 「円周＝直径×円周率」 (SGK lớp 5) + 「平らな空間だけ」; vũ trụ phẳng (sai số
// < 1%); 1915 アインシュタイン; hố đen: lưới không gian võng xuống, vòng giãn; 「変わったのは世界」.
//  ① câu 121–123: lưới không gian phẳng (đồng mảnh, nhìn xiên), vành 360 nằm trên lưới; công thức SGK; 「平らな空間だけ」;
//     lưới nới rộng (大きなスケール) · 「誤差 1% 未満」 · khoanh ◯ công thức (見事に成り立つ)
//  ② câu 124–125: アインシュタイン 1915 · 一般相対性理論; thiên thể nặng lún xuống, lưới võng; vành nhấc lên khỏi lưới
//     (vành = π, không bị bẻ), vòng chỉ trên lưới bị kéo giãn; hố đen; đường kính qua giếng dài ra; công thức NỨT ở 「＝」 (§62)
//  ③ câu 126–129: vành bay lên góc phải, đứng thẳng, π son giữa vành + 3.14159265…; 「変わったのは 世界」; 「平らな幾何学の定数」;
//     vòng trên lưới sáng, 「円周 ÷ 直径 ≠ π」
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, bead, engrave, telop, heading, leader, measure, PI_DIGITS } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const EL = 0.42;                                                   // góc nhìn xuống mặt lưới
const SX = 680, SY = 600, DEP = 330, RHO = 0.45;                    // tâm lưới, độ sâu giếng, bán kính vòng (đơn vị lưới)
const well = r => 1 / (1 + (r / 0.3) ** 2);
const samp = (n, f) => Array.from({ length: n + 1 }, (_, i) => f(i / n));
/** Điểm (u, v) ∈ [-1, 1]² của mặt không gian → màn hình. bend 0..1 = độ võng; S = nửa cạnh (px). */
const pt = (u, v, S, bend, wob = 0) => {
  const r = Math.hypot(u, v), Y = -DEP * bend * well(r) + wob;
  return [SX + u * S, SY - (Y * Math.cos(EL) - v * S * Math.sin(EL))];
};
function poly(g, P, k = 1, { color = C.brass, w = 1, a = 1 } = {}) {
  if (k <= 0) return;
  const n = P.length - 1, m = clamp(k) * n, i = Math.floor(m);
  g.save(); g.globalAlpha = a; g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(...P[0]); for (let j = 1; j <= Math.min(i, n); j++) g.lineTo(...P[j]);
  if (i < n) { const f = m - i; g.lineTo(P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f); }
  g.stroke(); g.restore();
}
const headOf = (P, k) => { const n = P.length - 1, m = clamp(k) * n, i = Math.min(n - 1, Math.floor(m)), f = m - i;
  return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f]; };

export default class Universe {
  static ERA = 'tenkyu';
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      shou: w(121, '小学校'), en121: w(121, '円周'), ritsu: w(121, '直径'), taira121: w(121, '平ら'), naritatsu: w(121, '成り立つ'),
      kansoku: w(122, '観測'), uchuu: w(122, '宇宙'), scale: w(122, 'スケール'), gosa: w(122, '誤差'), pct: w(122, '1パーセント'), taira122: w(122, '平ら'),
      gakkou: w(123, '学校'), mi: w(123, '身の回り'), migoto: w(123, '見事'),
      l124: S(124), ein: w(124, 'アインシュタイン'), y1915: w(124, '1915'), ippan: w(124, '一般'), omoi: w(124, '重い'), tentai: w(124, '天体'), magari: w(124, '曲がります'),
      bh: w(125, 'ブラック'), en125: w(125, '円'), chok125: w(125, '直径'), narimasen: w(125, 'なりません'),
      l126: S(126), kawatta: w(126, '変わった'), sekai: w(126, '世界'),
      heigeo: w(127, '幾何学'), teisu: w(127, '定数'),
      magatte: w(128, '曲がって'), kazu: w(128, '数'), chanto: w(128, 'ちゃんと'),
      egaita: w(129, '描いた'), en129: w(129, '円'), hi: w(129, '比'), nakunaru: w(129, 'なくなる'), end: E(129),
    };
    this.START = S(121);
    this.FROM = Math.max(this.START - 1.2, E(120) + 0.5);
    this.PI10 = PI_DIGITS.slice(0, 10);
    must(`${this.PI10}`, 3.14159265);
    must('1915', 1915);
    must('1', 1);                                                   // 誤差 1% 未満 (CONTENT.md)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.FROM + 0.9, 'tick'), c(T.shou, 'tick'), c(T.taira121, 'pen'),
      c(T.kansoku, 'tick'), c(T.scale, 'whoosh'), c(T.pct, 'tick'),
      c(T.mi, 'pen'), c(T.migoto, 'pen'),
      c(T.ein, 'tick'), c(T.ippan, 'tick'), c(T.omoi, 'pop'), c(T.magari - 0.3, 'whoosh'),
      c(T.bh, 'impact'), c(T.en125, 'pen'), c(T.chok125 + 0.1, 'pen'), c(T.narimasen, 'snap'),
      c(T.l126 - 0.2, 'whoosh'), c(T.sekai, 'suzu'),
      c(T.teisu, 'tick'), c(T.magatte, 'whoosh'), c(T.kazu, 'soroban'), c(T.chanto, 'tick'),
      c(T.egaita - 0.2, 'tick'), c(T.en129 + 0.3, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    const trails = 0.55 * smooth(prog(t, T.bh, T.bh + 1.5));
    ground(g, 'tenkyu', t, { trails });
    heading(g, '第四幕', '私たちの宇宙', prog(t, this.FROM + 0.5, this.FROM + 1.6));

    // ── lưới không gian ──
    const Sz = 500 + 60 * smooth(prog(t, T.scale - 0.2, T.scale + 1.0));          // 大きなスケール: lưới nới rộng
    const bend = smooth(prog(t, T.tentai, T.magari + 0.9));
    const wobA = 10 * smooth(prog(t, T.magatte - 0.2, T.magatte + 0.6)) * (1 - smooth(prog(t, T.kazu + 0.6, T.kazu + 2.0)));
    const wob = (u, v) => wobA * Math.sin(5 * Math.hypot(u, v) - 3 * t);
    const P = (u, v) => pt(u, v, Sz, bend, wob(u, v));
    const kG = prog(t, this.FROM + 0.3, this.START + 0.5), N = 10;
    for (let i = -N; i <= N; i++) {
      const q = i / N, a = 0.34 + 0.26 * (1 - Math.abs(q));
      poly(g, samp(60, s => P(-1 + 2 * s, q)), kG, { a, w: 1 });
      poly(g, samp(60, s => P(q, -1 + 2 * s)), kG, { a, w: 1 });
    }
    // thiên thể nặng → hố đen (đáy giếng)
    const kB = prog(t, T.omoi - 0.2, T.omoi + 0.5), [bx, byBase] = P(0, 0);
    if (kB > 0) {
      const r = 46 * outCubic(kB), by = byBase - r * 0.9 - (1 - outCubic(kB)) * 220, kh = smooth(prog(t, T.bh, T.bh + 0.8));
      g.save();
      const gr = g.createRadialGradient(bx - r * 0.35, by - r * 0.4, r * 0.1, bx, by, r);
      gr.addColorStop(0, kh < 1 ? `rgba(${Math.round(90 * (1 - kh))},${Math.round(100 * (1 - kh))},${Math.round(150 * (1 - kh))},1)` : '#000');
      gr.addColorStop(1, '#02030A'); g.fillStyle = gr; g.beginPath(); g.arc(bx, by, r, 0, TAU); g.fill();
      if (kh > 0) {                                                    // vòng photon đồng mảnh quanh hố đen
        g.shadowColor = 'rgba(243,223,162,0.6)'; g.shadowBlur = 14; g.strokeStyle = C.brassHi; g.lineWidth = 2; g.globalAlpha = kh;
        g.beginPath(); g.ellipse(bx, by, r + 10, (r + 10) * 0.42, 0, 0, TAU); g.stroke();
        g.beginPath(); g.arc(bx, by, r + 3, 0, TAU); g.lineWidth = 1.2; g.stroke();
      }
      g.restore();
    }
    // vòng chỉ trên lưới (bám mặt cong) + đường kính qua giếng
    const circ = samp(144, s => P(RHO * Math.sin(s * TAU), RHO * Math.cos(s * TAU)));
    const kCirc = prog(t, this.FROM + 0.6, this.START + 0.8);
    poly(g, circ, kCirc, { color: C.brassHi, w: 2.2, a: 0.9 });
    const kHi = prog(t, T.en125, T.en125 + 1.0) + prog(t, T.en129 - 0.1, T.en129 + 1.0) - prog(t, T.l126 - 0.3, T.l126 + 0.1);
    if (kHi > 0) { poly(g, circ, kHi, { color: C.brassHi, w: 4 }); if (kHi < 1) bead(g, ...headOf(circ, kHi), 6, 1); }
    const kMi = prog(t, T.mi, T.mi + 1.4);                               // 身の回りの円: hạt chạy một vòng
    if (kMi > 0 && kMi < 1) bead(g, ...headOf(circ, kMi), 6, 1);
    const dia = samp(80, s => P(-RHO + 2 * RHO * s, 0));
    const kD = prog(t, T.chok125 - 0.1, T.chok125 + 0.8) - prog(t, T.l126 - 0.3, T.l126 + 0.1);
    poly(g, dia, kD, { color: C.ivory, w: 2.4 });
    if (kD > 0 && kD < 1) bead(g, ...headOf(dia, kD), 5, 1);

    // ── vành 360: nằm trên lưới → nhấc lên (曲がります) → bay lên góc phải, đứng thẳng (câu 126) ──
    const lift = smooth(prog(t, T.omoi, T.magari + 0.6)), fly = smooth(prog(t, T.l126 - 0.2, T.kawatta + 0.6));
    const r0 = RHO * Sz, rx = 1530, ry = 350, rr = 128;
    const rcx = SX + (rx - SX) * fly, rcy = SY - 170 * lift + (ry - (SY - 170)) * fly, rad = r0 + (rr - r0) * fly;
    const sy = Math.sin(EL) + (1 - Math.sin(EL)) * fly;
    const kRing = prog(t, this.FROM + 0.3, this.START + 0.6);
    const marks = t > T.chanto ? [[180, C.shu]] : [];
    g.save(); g.translate(rcx, rcy); g.scale(1, sy); ring360(g, 0, 0, rad, kRing, { rot: t * 0.03, numerals: rad >= 200 || fly > 0.9, marks }); g.restore();
    if (fly > 0) {
      engrave(g, 'π', rcx, rcy + 30, prog(t, T.kawatta, T.kawatta + 0.4), `600 120px ${CG}`, C.shu, { align: 'center' });
      engrave(g, this.PI10 + '…', rcx, rcy + 78, prog(t, T.kazu, T.chanto + 0.3), `500 28px ${MONO}`, C.ivory, { align: 'center', spark: false });
      engrave(g, '変わらない', rcx, rcy + rr + 96, prog(t, T.kawatta + 0.3, T.kawatta + 0.9), `500 28px ${JP}`, C.dim, { align: 'center', ls: 4, spark: false });
    }

    // ── cột phải câu 121–125 ──
    const oA = out(t, T.l126 - 0.4), X = 1250;
    if (oA < 1) {
      g.save(); g.translate(760 * oA, 0);
      engrave(g, '小学5年の式', X + 2, 236, prog(t, T.shou, T.shou + 0.5), `500 28px ${JP}`, C.brass, { ls: 6, spark: false });
      const F = [['円周', `700 44px ${MIN}`], [' ＝ ', `500 44px ${JP}`, C.dim], ['直径', `700 44px ${MIN}`], [' × ', `500 44px ${JP}`, C.dim], ['円周率', `700 44px ${MIN}`]];
      const B = telop(g, F, X, 320, prog(t, T.en121 - 0.2, T.naritatsu), { size: 44 });
      const kc = prog(t, T.migoto - 0.1, T.migoto + 0.5);               // 見事に成り立つ: khoanh ◯ đồng
      if (kc > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.5; g.lineCap = 'round'; g.beginPath();
        g.ellipse(B.x + B.w / 2, B.y + B.h / 2, B.w / 2 + 22, B.h / 2 + 14, -0.03, -Math.PI / 2, -Math.PI / 2 + TAU * 1.04 * outCubic(kc) * (1 - prog(t, T.ippan, T.ippan + 0.4))); g.stroke(); g.restore(); }
      // 「＝」 nứt (đúng trong không gian phẳng, hỏng khi cong — §62) + nhãn điều kiện
      const kk = prog(t, T.narimasen - 0.1, T.narimasen + 0.3);
      if (kk > 0) {
        const ex = B.x + 22 + measure(g, '円周', `700 44px ${MIN}`, 2) + measure(g, ' ＝ ', `500 44px ${JP}`, 2) / 2, ey = 305;
        const Z = [[0, -34], [-7, -14], [6, -2], [-6, 12], [5, 24], [-2, 36]];
        g.save(); g.strokeStyle = C.steel; g.lineWidth = 3; g.lineJoin = 'miter'; g.beginPath();
        const n = Math.max(1, Math.round((Z.length - 1) * kk)); Z.slice(0, n + 1).forEach(([dx, dy], i) => i ? g.lineTo(ex + dx, ey + dy) : g.moveTo(ex + dx, ey + dy)); g.stroke(); g.restore();
        engrave(g, [['曲がった空間では ', `500 28px ${JP}`, C.steel], ['×', `500 30px ${JP}`, C.steel]], X + 2, 386, prog(t, T.narimasen + 0.1, T.narimasen + 0.7), undefined, C.steel, { spark: false });
      }
      const oB = out(t, T.l124 - 0.3);
      g.save(); g.translate(760 * oB, 0);
      telop(g, [['平らな空間', `700 40px ${MIN}`, C.brassHi], ['でだけ', `700 40px ${MIN}`]], X, 470, prog(t, T.taira121, T.naritatsu + 0.3), { size: 40 });
      telop(g, [['宇宙は 誤差 ', `700 40px ${MIN}`], ['1%', `600 56px ${CG}`, C.brassHi], [' 未満で平ら', `700 40px ${MIN}`]], X, 600, prog(t, T.gosa - 0.2, T.taira122 + 0.3), { size: 40 });
      g.restore();
      if (t > T.l124 - 0.3) {
        telop(g, [['アインシュタイン　', `700 40px ${MIN}`], ['1915', `600 52px ${CG}`, C.brassHi], ['年', `700 40px ${MIN}`]], X, 520, prog(t, T.ein - 0.1, T.y1915 + 0.5), { size: 40 });
        engrave(g, '一般相対性理論', X + 2, 610, prog(t, T.ippan, T.ippan + 0.8), `700 34px ${MIN}`, C.ivory, { ls: 4 });
        engrave(g, '重い天体 → 空間が曲がる', X + 2, 680, prog(t, T.tentai - 0.2, T.magari + 0.4), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
        engrave(g, 'ブラックホール', X + 2, 750, prog(t, T.bh, T.bh + 0.6), `700 34px ${MIN}`, C.brassHi, { ls: 4 });
      }
      g.restore();
    }

    // ── cột phải câu 126–127 (dưới vành) ──
    telop(g, [['変わったのは ', `700 44px ${MIN}`], ['世界', `700 52px ${MIN}`, C.brassHi]], 1530, 700, prog(t, T.kawatta + 1.2, T.sekai + 0.4), { size: 44, align: 'center' });
    telop(g, [['π', `600 54px ${CG}`, C.shu], [' ＝ 平らな幾何学の定数', `700 38px ${MIN}`]], 1530, 830, prog(t, T.heigeo - 0.3, T.teisu + 0.4), { size: 40, align: 'center' });

    // ── câu 129: vòng trên lưới không còn là π ──
    const kl = prog(t, T.egaita - 0.2, T.en129 + 0.6);
    if (kl > 0) {
      telop(g, [['円周 ÷ 直径', `700 38px ${MIN}`], [' ≠ ', `500 40px ${JP}`], ['π', `600 52px ${CG}`, C.shu]], 140, 330, kl, { size: 38 });
      const c0 = circ[Math.round(circ.length * 0.62)];
      leader(g, 300, 362, c0[0], c0[1], prog(t, T.en129 + 0.2, T.hi));
    }
  }
}
