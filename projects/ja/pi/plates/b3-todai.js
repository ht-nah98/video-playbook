// b3 · 東大の問題を解く (p2, câu 20–27) — phiếu đề 東大 2003 trở lại (CÙNG chữ, cùng cỡ như a0: exam 150,230,960,560);
// vành về giữa-trái (vật chính r 300): lục giác nội tiếp đường kính 1 → chu vi = 3 (「足りない」, thép) → nhân đôi thành
// 正12角形 (đỉnh mọc từ trung điểm cạnh như b2) → tam giác vuông nhỏ trên 1 cạnh + 「三平方の定理」 → chu vi ≈ 3.106 →
// chuỗi 「円周率 > 3.1058… > 3.05」 (cận dưới KHÔNG làm tròn lên: 12·sin15° = 3.10583 < 3.106), đúng (correct), 判子 son「証明終」, mascot ok NÓI 「これで証明できました」 → phiếu đề
// trượt lên lần nữa, lần này có lời giải + dấu 証明終: "ý tưởng 2000 năm giải đề 東大".
import { W, H, C, MIN, JP, CG, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, circleLine, needle, pivot, polyIn, drawPoly, engrave, telop, rule, stamp, exam, figure, measure, heading, leader, PERIM } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
function track(t, keys) {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [t0, nv] = keys[i], e = smooth(clamp((t - t0) / 0.9)); if (e <= 0) break; v = v.map((a, j) => a + (nv[j] - a) * e); }
  return v;
}
// lục giác → 12-giác nội tiếp: đỉnh mới đi từ trung điểm cạnh cũ (cùng tia) ra đường tròn (như b2-squeeze)
function poly12(cx, cy, r, e) {
  return Array.from({ length: 12 }, (_, i) => {
    const th = -Math.PI / 2 + i * TAU / 12, d0 = r * Math.cos(Math.PI / 6), dd = i % 2 ? d0 + (r - d0) * e : r;
    return [cx + dd * Math.cos(th), cy + dd * Math.sin(th)];
  });
}

export default class Todai {
  static ERA = 'tenkyu';
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l20: S(20), toudai: w(20, '東大'),
      l21: S(21), n305: w(21, '3.05'), ookii21: w(21, '大きい'), shimese: w(21, '示せ'),
      l22: S(22), chokkei: w(22, '直径'), roku: w(22, '正六角形'), choudo: w(22, 'ちょうど'), n3: w(22, '3'), tarimasen: w(22, '足りません'),
      l23: S(23), bai: w(23, '倍'), s12: w(23, '正12角形'), n3106: w(23, '3.106'),
      l24: S(24), ippen: w(24, '1辺'), sanpei: w(24, '三'), teiri: w(24, '定理'),
      l25: S(25), uchi: w(25, '内側'), nagai: w(25, '長い'), en25b: w(25, '円周', 2), n3106b: w(25, '3.106'), ookii25: w(25, '大きい'),
      l26: S(26), tsumari: w(26, 'つまり'), n305b: w(26, '3.05'), ookii26: w(26, '大きい'), shoumei: w(26, '証明'),
      l27: S(27), y2000: w(27, '2000'), toudai27: w(27, '東大'), toite: w(27, '解いて'), e27: E(27),
    };
    this.START = S(20);
    this.FROM = Math.max(this.START - 1.2, E(19) + 0.5);
    const T = this.T;
    this.KEYS = [[this.FROM, [1450, 560, 220]], [T.l22 - 0.6, [500, 610, 300]], [T.l27 - 0.3, [1450, 560, 220]]];
    this.P6 = must(`${PERIM(6).inn.toFixed(4)}`, 3);                         // 6·sin30° (đường kính 1) = 3
    this.P12 = must(`${PERIM(12).inn.toFixed(3)}`, 3.106);                   // 12·sin15° ≈ 3.106
    must('Math.round(12 * Math.sin(Math.PI / 12) * 1e5) / 1e5', 3.10583);
    this.P12LO = must(`Math.floor(${PERIM(12).inn} * 1e4) / 1e4`, 3.1058);     // cận dưới cắt (không làm tròn lên) → 「3.1058…」
    must('12 * Math.sin(Math.PI / 12) > 3.105', true);
    must(`${this.P6} < 3.05 && 3.05 < ${this.P12LO} && ${this.P12LO} < ${PERIM(12).inn} && ${PERIM(12).inn} < Math.PI`, true);
    this.LB = `${this.P12LO.toFixed(4)}…`;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.toudai - 0.4, 'page'), c(T.n305, 'tick'), c(T.shimese, 'tick'),
      c(T.chokkei, 'pen'), c(T.roku + 0.2, 'pen'), c(T.n3, 'type'), c(T.tarimasen, 'tick'),
      c(T.bai, 'pen'), c(T.s12, 'tick'), c(T.n3106, 'type'),
      c(T.ippen, 'pen'), c(T.sanpei, 'tick'), c(T.teiri + 0.4, 'tick'),
      c(T.nagai, 'tick'), c(T.n3106b, 'type'),
      c(T.n305b, 'tick'), c(T.ookii26, 'correct'), c(T.shoumei, 'hanko'),
      c(T.y2000, 'tick'), c(T.l27 + 0.5, 'page'), c(T.toudai27 + 0.7, 'hanko'), c(T.toite, 'shimmer'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t);
    heading(g, '第一幕　円をはさみうちにする', '東大の問題を解く', prog(t, this.FROM + 0.3, this.START + 1.4));

    // ── vành: phải (đề) → giữa-trái (chứng minh) → phải (đề có lời giải) ──
    const [cx, cy, r] = track(t, this.KEYS), s = r / 300;
    ring360(g, cx, cy, r, prog(t, this.FROM + 0.3, this.START + 1.0), { rot: t * 0.02, numerals: r >= 200, thread: false });
    circleLine(g, cx, cy, r, prog(t, this.FROM + 0.6, this.START + 1.2), { w: 1.8 + 1.8 * (prog(t, T.uchi - 0.3, T.uchi + 0.3) - prog(t, T.ookii25, T.ookii25 + 0.6)) });
    const kN = Math.min(prog(t, this.FROM + 0.6, this.START + 1.2), 1 - prog(t, T.l22 - 0.8, T.l22 - 0.3));
    if (kN > 0) needle(g, cx, cy, r * 0.8, 1.2 + t * 0.25, kN);
    // đường kính 1
    const kd = prog(t, T.chokkei, T.chokkei + 0.5);
    if (kd > 0) {
      g.save(); g.strokeStyle = 'rgba(142,156,192,0.75)'; g.lineWidth = 1.2; g.setLineDash([3, 6]);
      g.beginPath(); g.moveTo(cx - r, cy); g.lineTo(cx - r + 2 * r * outCubic(kd), cy); g.stroke(); g.restore();
      engrave(g, [['直径 ', `500 ${Math.round(24 * s)}px ${JP}`, C.dim], ['1', `600 ${Math.round(34 * s)}px ${CG}`, C.ivory]], cx + r * 0.5, cy + 40 * s, prog(t, T.chokkei + 0.2, T.chokkei + 0.6), undefined, C.ivory, { align: 'center', spark: false });
    }
    // lục giác → 正12角形 (nội tiếp, đồng)
    const kH = prog(t, T.roku, T.roku + 0.8);
    if (kH > 0) {
      const e = smooth(prog(t, T.bai, T.bai + 0.7)), P = e > 0 ? poly12(cx, cy, r, e) : polyIn(cx, cy, r, 6);
      const hi = prog(t, T.uchi, T.uchi + 0.4) - prog(t, T.ookii25, T.ookii25 + 0.6) + prog(t, T.choudo, T.choudo + 0.3) - prog(t, T.tarimasen, T.tarimasen + 0.5);
      drawPoly(g, P, kH, { color: hi > 0 ? C.brassHi : C.brass, w: (1.8 + 1.4 * hi) * Math.max(0.7, s), dots: kH >= 1 });
      engrave(g, e > 0.5 ? '正12角形' : '正六角形', cx, cy - 150 * s, prog(t, T.roku + 0.3, T.roku + 0.9), `700 ${Math.round(36 * s)}px ${MIN}`, C.ivory, { align: 'center', ls: 4, spark: false });
    }
    // 1辺 + tam giác vuông (câu 24–25)
    const kT = prog(t, T.ippen, T.ippen + 0.6) * (1 - out(t, T.l26 - 0.3));
    if (kT > 0) {
      const v0 = [cx, cy - r], v1 = [cx + r * Math.sin(Math.PI / 6), cy - r * Math.cos(Math.PI / 6)], F = [cx, v1[1]];
      g.save(); g.globalAlpha = kT;
      g.fillStyle = 'rgba(217,164,65,0.35)'; g.beginPath(); g.moveTo(...v0); g.lineTo(...F); g.lineTo(...v1); g.closePath(); g.fill();
      g.strokeStyle = C.brassHi; g.lineWidth = 1.5; g.stroke();
      g.strokeStyle = C.brassHi; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(...v0); g.lineTo(...v1); g.stroke();
      g.lineWidth = 1.2; g.strokeRect(F[0], F[1] - 10, 10, 10);
      g.restore();
      engrave(g, '1辺', cx + 70, cy - r + 96, kT, `700 30px ${MIN}`, C.brassHi, { spark: false });
      // dây dẫn: cạnh sáng trong vành → cạnh c của tam giác 三平方 (bảng phải, câu 24)
      const kl = prog(t, T.teiri, T.teiri + 0.7) * (1 - out(t, T.l25 - 0.4));
      if (kl > 0) {
        const mx = (v0[0] + v1[0]) / 2, my = (v0[1] + v1[1]) / 2, ex = 1030 + 150 * 1.8 * 0.5 + 6, ey = 728;
        leader(g, mx, my, 950, ey, Math.min(1, kl * 2), { color: C.brassHi, a: 0.85 });
        if (kl > 0.5) leader(g, 950, ey, ex, ey, (kl - 0.5) * 2, { color: C.brassHi, a: 0.85 });
      }
    }

    // ── phiếu đề 東大 (câu 20–21) và trở lại có lời giải (câu 27) ──
    const ink = { spark: false, shadow: false };
    const Q = X => {
      engrave(g, [['円周率が ', `700 44px ${MIN}`], ['3.05', `600 56px ${CG}`], [' より大きいことを', `700 44px ${MIN}`]], X.ix, X.iy + 40, 1, undefined, C.sumi, ink);
      engrave(g, '証明せよ。', X.ix, X.iy + 112, 1, `700 44px ${MIN}`, C.sumi, ink);
    };
    const oA = out(t, T.l22 - 0.7, 0.7);
    if (t > T.toudai - 0.5 && oA < 1) {
      g.save(); g.translate(0, 900 * oA);
      exam(g, 150, 230, 960, 560, prog(t, T.toudai - 0.4, T.toudai + 0.4), { content: X => {
        Q(X);
        const x0 = X.ix + measure(g, '円周率が ', `700 44px ${MIN}`), w5 = measure(g, '3.05', `600 56px ${CG}`);
        const xe = x0 + w5 + measure(g, ' より大きい', `700 44px ${MIN}`);
        const ku = prog(t, T.n305, T.n305 + 0.4), ku2 = prog(t, T.ookii21, T.ookii21 + 0.4);
        g.save(); g.strokeStyle = C.brassLo; g.lineWidth = 3; g.lineCap = 'round';
        if (ku > 0) { g.beginPath(); g.moveTo(x0, X.iy + 54); g.lineTo(x0 + w5 * outCubic(ku), X.iy + 54); g.stroke(); }
        if (ku2 > 0) { g.beginPath(); g.moveTo(x0 + w5 + 6, X.iy + 54); g.lineTo(x0 + w5 + 6 + (xe - x0 - w5 - 6) * outCubic(ku2), X.iy + 54); g.stroke(); }
        g.restore();
        engrave(g, '答', X.ix, X.iy + 260, 1, `500 36px ${JP}`, C.sumi, ink);
      } });
      g.restore();
    }
    const kC = prog(t, T.l27 + 0.3, T.l27 + 1.1);
    if (kC > 0) {
      exam(g, 150, 230, 960, 560, kC, { content: X => {
        Q(X);
        const A = `600 50px ${CG}`, M = `500 46px ${CG}`;
        engrave(g, [['答　', `500 36px ${JP}`], ['円周率', `700 40px ${MIN}`], [' > ', M], [this.LB, A], [' > ', M], ['3.05', A]], X.ix, X.iy + 260, prog(t, T.toudai27 - 0.2, T.toudai27 + 0.6), undefined, C.sumi, ink);
        stamp(g, '証明終', X.x + X.w - 130, X.iy + 250, prog(t, T.toudai27 + 0.7, T.toudai27 + 1.3), { size: 40 });
      } });
    }
    telop(g, [['2000年以上前の', `700 40px ${MIN}`], ['アイデア', `700 40px ${MIN}`, C.brassHi]], 150, 940, prog(t, T.y2000, T.y2000 + 1.0), { size: 40 });

    // ── mục tiêu: 円周率 > 3.05 (dưới phiếu → góc phải trên khi chứng minh) ──
    const kg = prog(t, T.shimese - 0.2, T.shimese + 0.7);
    if (kg > 0) {
      const e = smooth(prog(t, T.l22 - 0.6, T.l22 + 0.3)), x = 150 + (1000 - 150) * e + 1100 * out(t, T.l27 - 0.5), y = 900 + (300 - 900) * e;
      telop(g, [['示すこと　', `700 32px ${MIN}`, C.dim], ['円周率', `700 44px ${MIN}`], [' > ', `500 52px ${CG}`, C.dim], ['3.05', `600 56px ${CG}`, C.brassHi]], x, y, kg, { size: 44 });
    }

    // ── bảng lời giải bên phải (câu 22–26) ──
    const oP = out(t, T.l27 - 0.5);
    if (t > T.l22 && oP < 1) {
      g.save(); g.translate(1100 * oP, 0);
      const X = 1000, F36 = `700 36px ${MIN}`, OPF = `500 44px ${CG}`;
      const r6 = engrave(g, [['正六角形の周', F36], [' = ', OPF, C.dim], ['3', `600 54px ${CG}`, C.ivory]], X, 440, prog(t, T.n3 - 0.3, T.n3 + 0.3), F36, C.ivory);
      engrave(g, [['  <  ', OPF, C.steelDim], ['3.05', `600 48px ${CG}`, C.steelDim]], X + r6.w, 440, prog(t, T.tarimasen, T.tarimasen + 0.4), OPF, C.steelDim, { spark: false });
      engrave(g, '足りない', X + 4, 490, prog(t, T.tarimasen + 0.2, T.tarimasen + 0.7), `500 28px ${JP}`, C.steel, { ls: 4, spark: false });
      engrave(g, [['正12角形の周', F36], [' ≈ ', OPF, C.dim], [this.P12.toFixed(3), `600 54px ${CG}`, C.brassHi]], X, 580, prog(t, T.n3106 - 0.4, T.n3106 + 0.4), F36, C.ivory);
      // 三平方の定理 (câu 24) — trượt xuống ra khi sang câu 25
      const o24 = out(t, T.l25 - 0.4);
      if (t > T.sanpei - 0.3 && o24 < 1) {
        g.save(); g.translate(0, 500 * o24);
        telop(g, '三平方の定理', X, 690, prog(t, T.sanpei, T.teiri + 0.4), { size: 36 });
        const ki = prog(t, T.teiri, T.teiri + 0.6), Fx = X + 30, Fy = 820, sc = 1.8, a = 300 * (1 - Math.cos(Math.PI / 6)), b = 300 * Math.sin(Math.PI / 6);
        if (ki > 0) {
          const V0 = [Fx, Fy - a * sc], V1 = [Fx + b * sc, Fy];
          g.save(); g.globalAlpha = ki; g.fillStyle = 'rgba(217,164,65,0.25)'; g.strokeStyle = C.brassHi; g.lineWidth = 1.6;
          g.beginPath(); g.moveTo(...V0); g.lineTo(Fx, Fy); g.lineTo(...V1); g.closePath(); g.fill(); g.stroke(); g.strokeRect(Fx, Fy - 12, 12, 12); g.restore();
          const IT = `italic 600 34px ${CG}`;
          engrave(g, 'a', Fx - 26, Fy - 16, ki, IT, C.ivory, { spark: false });
          engrave(g, 'b', Fx + b * sc / 2, Fy + 34, ki, IT, C.ivory, { align: 'center', spark: false });
          engrave(g, 'c', Fx + b * sc / 2 + 6, Fy - a * sc / 2 - 16, ki, IT, C.brassHi, { align: 'center', spark: false });
          // a² + b² = c²: số mũ 24px nâng −14
          const SUP = `500 24px ${CG}`, OPF2 = `500 34px ${CG}`, kq = prog(t, T.teiri + 0.3, T.teiri + 0.9);
          let qx = X + 340;
          [['a', IT, C.ivory, 0], ['2', SUP, C.ivory, -14], [' + ', OPF2, C.ivory, 0], ['b', IT, C.ivory, 0], ['2', SUP, C.ivory, -14], [' = ', OPF2, C.ivory, 0], ['c', IT, C.brassHi, 0], ['2', SUP, C.brassHi, -14]]
            .forEach(([s, f, col, dy]) => { engrave(g, s, qx, Fy - 8 + dy, kq, f, col, { spark: false }); qx += measure(g, s, f); });
        }
        g.restore();
      }
      // câu 25–26: chuỗi bất đẳng thức
      engrave(g, [['円周', `500 28px ${JP}`, C.ivory], ['  >  ', `500 32px ${CG}`, C.dim], ['内側の多角形の周', `500 28px ${JP}`, C.brass]], X + 4, 690, prog(t, T.uchi, T.nagai + 0.4), undefined, C.ivory, { ls: 2, spark: false });
      const EN = `700 50px ${MIN}`, GT = `500 58px ${CG}`, NUM = `600 64px ${CG}`;
      const c1 = engrave(g, [['円周率', EN], [' > ', GT, C.dim], [this.LB, NUM, C.brassHi]], X, 790, prog(t, T.en25b, T.ookii25 + 0.3), EN, C.ivory);
      const w0 = measure(g, '円周率', EN);
      const c2 = engrave(g, [[' > ', GT, C.dim], ['3.05', NUM, C.brassHi]], X + w0, 890, prog(t, T.n305b - 0.3, T.ookii26 + 0.2), GT, C.ivory);
      // 判子 ngay sau「> 3.05」(không lấn sang mascot ok bên phải: c1 dài thêm vì「3.1058…」)
      const sx = c2.x0 + c2.w + 52;
      if (c1.w > 0) rule(g, X, sx - 14, 916, prog(t, T.ookii26, T.ookii26 + 0.6));
      stamp(g, '証明終', sx, 896, prog(t, T.shoumei, T.shoumei + 0.6), { size: 40, hole: C.ivory });
      g.restore();
    }
    // mascot ok — NÓI 「これで証明できました」 (câu 26)
    const km = prog(t, T.l26 - 0.5, T.l26 + 0.2), om = out(t, T.l27 + 0.2, 0.5);
    if (km > 0 && om < 1) { g.save(); g.translate(0, 800 * om); figure(g, 'ok', 1720, H, 720, km, { t }); g.restore(); }
  }
}
