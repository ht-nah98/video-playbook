// d2 · 予想ではなく、証明 (p2 câu 86–91). DNA d2: ảnh Lambert 1761「無理数」, Lindemann 1882「超越数」 (khung đồng, nhãn năm
// sinh–mất); định nghĩa 超越数 khắc.
//  86 vành nhỏ giữa khung, chữ số π chạy qua ô kính trong vành (「くり返しません」 → bắt đầu chạy, không lặp);
//     dòng đáy 「予想」(thép mờ) ではなく、「証明された事実」(đồng) — đối chiếu, KHÔNG gạch (DNA: chỉ gạch ở a0, c1)
//  87 khung đồng Lambert trượt lên (trái) · 1761年 · スイス出身 · 「無理数」の証明
//  88 thước đồng thời gian 1761 → 1882 kéo qua 「100年以上」 · khung Lindemann (phải) · 1882年 · ドイツ · さらに強い証明
//  89 「超越数」 khắc; ô số trong vành rút xuống, π son hiện giữa vành (đáp án đã chứng minh)
//  90 定義: a xⁿ + … + b x + c = 0 (hệ số nguyên) → mọi x thành π son, "=" lật thành "≠": 解にならない
//  91 ba テロップ 足し算・かけ算・累乗 trượt vào quanh vành (hai bên, không vào dải tiêu đề), chạm không tới π → 「とらえきれない数」
import { W, H, C, MIN, JP, CG, MONO, clamp, prog, lookup, must, outCubic, outBack, sk, typeCues,
  ground, ring360, ringGeom, engrave, telop, heading, rule, bead, plate, measure, PI_DIGITS } from '../kit.js';

const RX = 960, RY = 400, RR = 120;                    // vành nhỏ giữa hai chân dung
const PY = 250, PH = 320;                              // khung ảnh: đỉnh, cao
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));

export default class Proof {
  static ERA = 'tenkyu';
  static IMAGES = { lambert: './assets/history/JHLambert.jpg', lindemann: './assets/history/Carl_Louis_Ferdinand_von_Lindemann.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      kuri: w(86, 'くり返しません'), yosou: w(86, '予想'), nai86: w(86, 'なく'), shou86: w(86, '証明'), jijitsu: w(86, '事実'),
      l87: L(87).start, y1761: w(87, '1761'), swiss: w(87, 'スイス'), lam: w(87, 'ラン'), muri: w(87, '無理'), shou87: w(87, '証明'),
      sore: w(88, 'それ'), y100: w(88, '100'), ijou: w(88, '以上'), y1882: w(88, '1882'), doitsu: w(88, 'ドイツ'), lind: w(88, 'リンデ'),
      saraNi: w(88, 'さらに'), tsuyoi: w(88, '強い'),
      chou: w(89, '超越'), e89: L(89).end,
      l90: L(90).start, seisu: w(90, '整数'), keisu: w(90, '係数'), takou: w(90, '多項'), kai: w(90, '解'), naranai: w(90, 'ならない'),
      tashi: w(91, '足し算'), kake: w(91, 'かけ算'), rui: w(91, '累乗'), torae: w(91, 'とらえ'), end: L(91).end,
    };
    this.START = L(86).start;
    this.FROM = Math.max(this.START - 1.2, L(85).end + 0.5);
    this.Y = [String(must('1761', 1761)), String(must('1882', 1882))];
    must('1882 - 1761 >= 100', true);                                     // 「100年以上たった」
    this.GAP = String(must('100', 100));
    this.LIFE = ['1728–1777', '1852–1939'];                                // assets/history/INDEX.md (nhãn bắt buộc)
    // 91: ba phép toán quanh vành — góc (độ) + lắc ±AMP; đỉnh khung テロップ không vào dải tiêu đề (y < 240)
    this.AMP = 5;
    this.OPS = [['足し算', 'tashi', 150], ['かけ算', 'kake', 25], ['累乗', 'rui', 180]];
    const r1 = ringGeom(RR).r1;
    for (const [, , deg] of this.OPS) {
      const sMax = Math.max(...[-this.AMP, this.AMP].map(d => Math.sin((deg + d) * Math.PI / 180)));
      must(`${Math.round(RY - (r1 + 72) * sMax + 12 - 30 * 1.08)} >= 240`, true);
    }
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.kuri, 'soroban'), c(T.yosou, 'tick'),
      c(T.y1761 - 0.35, 'page'), ...typeCues(this.Y[0], T.y1761, T.y1761 + 0.5), c(T.swiss, 'tick'), c(T.muri, 'tick'), c(T.shou87, 'correct'),
      c(T.y100, 'pen'), c(T.y1882 - 0.35, 'page'), ...typeCues(this.Y[1], T.y1882, T.y1882 + 0.5), c(T.saraNi, 'tick'),
      c(T.chou, 'suzu'),
      c(T.l90, 'pen'), c(T.kai, 'snap'),
      c(T.tashi, 'pop'), c(T.kake, 'pop'), c(T.rui, 'pop'), c(T.torae, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T, F0 = this.FROM + 0.3;
    ground(g, Proof.ERA, t);
    heading(g, '第三幕　円周率は、なぜ終わらないのか', '予想ではなく、証明', prog(t, F0, F0 + 1.4));

    // ── vành nhỏ + ô số π chạy (86) → π son (89) ──
    const rot = t * 0.03, G = ring360(g, RX, RY, RR, prog(t, F0, F0 + 1.2), { rot, numerals: false });
    this.ticker(g, t);
    const kpi = prog(t, T.chou + 0.15, T.chou + 0.6);
    if (kpi > 0) {
      const s = outBack(kpi);
      g.save(); g.translate(RX, RY + 50); g.scale(s, s);
      engrave(g, 'π', 0, 0, 1, `600 150px ${CG}`, C.shu, { align: 'center', spark: false });
      g.restore();
    }

    // ── 86: 予想 ではなく、証明された事実 (dòng đáy, rút xuống khi vào định nghĩa) ──
    const o86 = out(t, T.l90 - 0.7);
    if (o86 < 1) {
      g.save(); g.translate(0, 300 * o86);
      engrave(g, [['予想', `700 52px ${MIN}`, C.steelDim], ['ではなく、', `700 40px ${MIN}`, C.dim]], 930, 905, prog(t, T.yosou, T.nai86 + 0.4), undefined, C.ivory, { align: 'right', ls: 3 });
      telop(g, [['証明された事実', `700 52px ${MIN}`, C.brassHi]], 960, 905, prog(t, T.shou86 - 0.1, T.jijitsu + 0.5), { size: 52, ls: 3 });
      g.restore();
    }

    // ── 87: Lambert ──
    const lw = plate(g, 'lambert', 140, PY, PH, prog(t, T.y1761 - 0.35, T.lam + 0.6), { label: { name: 'ランベルト', life: this.LIFE[0] } }).w;
    const xL = 140 + lw + 50;
    engrave(g, [[this.Y[0], `600 84px ${CG}`, C.brassHi], ['年', `700 40px ${MIN}`, C.ivory]], xL, 350, prog(t, T.y1761, T.y1761 + 0.5));
    engrave(g, 'スイス出身', xL + 4, 400, prog(t, T.swiss, T.swiss + 0.5), `500 28px ${JP}`, C.dim, { ls: 4, spark: false });
    telop(g, [['無理数', `700 46px ${MIN}`, C.brassHi], ['の証明', `700 32px ${MIN}`, C.ivory]], xL + 22, 500, prog(t, T.muri, T.shou87 + 0.4), { size: 46 });

    // ── 88: thước thời gian 1761 → 1882 + Lindemann ──
    const ry = 742, ax = 140 + lw / 2, kr = prog(t, T.sore, T.y1882);
    const lnW = plate(g, 'lindemann', 0, 0, PH, 0).w, lnX = 1780 - lnW, bx = lnX + lnW / 2;
    if (kr > 0) {
      bead(g, ax, ry, 6, prog(t, T.sore, T.sore + 0.3));
      rule(g, ax, bx, ry, kr, { a: 0.9 });
      engrave(g, [[this.GAP, `600 40px ${CG}`, C.brassHi], ['年以上', `700 30px ${MIN}`, C.ivory]], (ax + bx) / 2, ry - 18, prog(t, T.y100, T.ijou + 0.5), undefined, C.ivory, { align: 'center', spark: false });
      bead(g, bx, ry, 6, prog(t, T.y1882 - 0.1, T.y1882 + 0.2));
    }
    plate(g, 'lindemann', lnX, PY, PH, prog(t, T.y1882 - 0.35, T.lind + 0.6), { label: { name: 'リンデマン', life: this.LIFE[1] } });
    const xR = lnX - 50;
    engrave(g, [[this.Y[1], `600 84px ${CG}`, C.brassHi], ['年', `700 40px ${MIN}`, C.ivory]], xR, 350, prog(t, T.y1882, T.y1882 + 0.5), undefined, C.ivory, { align: 'right' });
    engrave(g, 'ドイツ', xR - 4, 400, prog(t, T.doitsu, T.doitsu + 0.4), `500 28px ${JP}`, C.dim, { align: 'right', ls: 4, spark: false });
    engrave(g, 'さらに強い証明', xR - 4, 458, prog(t, T.saraNi, T.tsuyoi + 0.5), `700 30px ${MIN}`, C.ivory, { align: 'right', ls: 3 });
    // 89: 超越数
    telop(g, [['超越数', `700 50px ${MIN}`, C.brassHi]], xR - 22, 548, prog(t, T.chou - 0.1, T.chou + 0.6), { size: 50, align: 'right', ls: 4 });

    // ── 90: định nghĩa — a xⁿ + … + b x + c = 0 → π, = → ≠ ──
    const kd = prog(t, T.l90, T.takou + 0.4);
    if (kd > 0) {
      engrave(g, '超越数とは', 150, 885, prog(t, T.l90 - 0.3, T.l90 + 0.3), `700 40px ${MIN}`, C.brass, { ls: 3 });
      this.formula(g, 440, 885, kd, prog(t, T.kai - 0.1, T.kai + 0.45));
      engrave(g, [['係数 ', `500 28px ${JP}`, C.dim], ['a, b, …, c', `italic 500 34px ${CG}`, C.ivory], [' は整数', `500 28px ${JP}`, C.dim]], 444, 960,
        prog(t, T.seisu, T.keisu + 0.5), undefined, C.dim, { spark: false });
      telop(g, [['どんな方程式でも ', `700 32px ${MIN}`, C.ivory], ['解にならない', `700 40px ${MIN}`, C.brassHi]], 1180, 885, prog(t, T.naranai - 0.2, T.naranai + 0.7), { size: 40 });
      engrave(g, '（0でない多項式）', 1180, 960, prog(t, T.naranai, T.naranai + 0.6), `500 26px ${JP}`, C.dim, { ls: 2, spark: false });
    }

    // ── 91: 足し算・かけ算・累乗 quanh vành, không chạm tới π ──
    this.OPS.forEach(([s, key, deg], i) => {
      const a = T[key];
      const k = prog(t, a - 0.1, a + 0.6);
      if (k <= 0) return;
      const tt = t - a, rr = G.r1 + 72 + (1 - outCubic(k)) * 70 - 26 * Math.max(0, Math.sin(tt * 2.4 + i)) ** 3;
      const ang = (deg + this.AMP * Math.sin(tt * 0.7 + i * 2)) * Math.PI / 180;
      telop(g, s, RX + rr * Math.cos(ang), RY - rr * Math.sin(ang) + 12, 1, { size: 30, align: 'center', ls: 2 });
    });
    telop(g, [['とらえきれない数', `700 36px ${MIN}`, C.brassHi]], RX, 652, prog(t, T.torae - 0.1, T.end - 0.6), { size: 36, align: 'center', ls: 3 });
  }
  /** Ô số trong vành: chữ số π chạy sang trái (bắt đầu ở 「くり返しません」), rút xuống trước khi π son hiện. */
  ticker(g, t) {
    const T = this.T, k = prog(t, this.FROM + 0.5, this.FROM + 1.3), down = out(t, T.chou - 0.2, 0.5);
    if (k <= 0 || down >= 1) return;
    const run = Math.max(0, t - T.kuri), off = 70 * run + 18 * run * run / (run + 4);     // tăng tốc nhẹ rồi đều
    g.save(); g.beginPath(); g.arc(RX, RY, RR - 6, 0, 7); g.clip();
    g.translate(0, 180 * down);
    g.fillStyle = 'rgba(5,10,28,0.6)'; g.fillRect(RX - RR, RY - 34, 2 * RR, 60);
    g.strokeStyle = 'rgba(217,164,65,0.55)'; g.lineWidth = 1; g.strokeRect(RX - RR - 1, RY - 34, 2 * RR + 2, 60);
    g.font = `500 32px ${MONO}`; g.textBaseline = 'middle'; g.textAlign = 'left';
    const cw = measure(g, '0', `500 32px ${MONO}`), n = Math.round(PI_DIGITS.length * k), x0 = RX - 2.5 * cw - off;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * cw; if (x < RX - RR - cw || x > RX + RR) continue;
      g.fillStyle = x > RX + RR - 3 * cw ? C.brassHi : C.ivory; g.fillText(PI_DIGITS[i], x, RY - 3);
    }
    g.restore();
  }
  /** Công thức đa thức hệ số nguyên; sw 0→1 lật mọi x thành π (son) và "=" thành "≠" (lật dọc như tấm khắc xoay). */
  formula(g, x, y, k, sw) {
    const I = `italic 500 64px ${CG}`, R = `500 64px ${CG}`, P = `600 66px ${CG}`;
    const toks = [['a', I], ['x', I, 'x'], ['ⁿ', R], [' + … + ', R], ['b', I], ['x', I, 'x'], [' + ', R], ['c', I], [' = ', R, '='], ['0', R]];
    const alt = { x: ['π', P, C.shu], '=': [' ≠ ', R, C.brassHi] };
    const wid = toks.map(([s, f, sw2]) => Math.max(measure(g, s, f), sw2 ? measure(g, alt[sw2][0], alt[sw2][1]) : 0));
    const N = toks.reduce((a, [s]) => a + [...s].length, 0);
    let seen = 0, cx = x;
    toks.forEach(([s, f, swap], i) => {
      const n = [...s].length, kk = clamp((k * N - seen) / n); seen += n;
      if (kk > 0) {
        const flip = swap ? Math.abs(Math.cos(Math.PI * sw)) : 1, use = swap && sw >= 0.5 ? alt[swap] : [s, f, swap === 'x' ? C.brassHi : C.ivory];
        g.save(); g.translate(cx + wid[i] / 2, y - 22); g.scale(1, Math.max(0.02, flip)); g.translate(-(cx + wid[i] / 2), -(y - 22));
        engrave(g, use[0], cx + wid[i] / 2, y, kk, use[1], use[2], { align: 'center', spark: kk < 1 });
        g.restore();
      }
      cx += wid[i];
    });
    return cx - x;
  }
}
