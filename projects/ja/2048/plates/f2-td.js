// f2 · TD学習 (p2 câu 78–81). DNA f2 (盤上): 「TD学習 ＝ 時間差分学習」; bàn いま (afterstate của f1, 判子 評価) → quân 運 rơi →
// vuốt → bàn 次; hai số so bằng hai cột gỗ (không ghi số: 予想(いま) | 得点 ＋ 予想(次)); 「ずれ」 → mũi tên sửa nhỏ, cột いま
// nhích dần về đích qua nhiều lần (hội tụ).
import { C, clamp, prog, lookup, must, outCubic, smooth, ground, board, boardMove, koma, coin, telop, stamp, brush, arrow, slide, spawn } from '../kit.js';

// cùng dải bàn với f1: B0 —R→ A (afterstate, chấm ở đây) —運→ A' —R→ N (afterstate kế tiếp)
const B0 = [[2, 0, 16, 64], [0, 4, 4, 8], [0, 0, 2, 2], [0, 0, 0, 0]];
const A = slide(B0, 'R').cells, SP = spawn(A, 5), A2 = SP.cells, NX = slide(A2, 'R');
const EA = []; A.forEach((row, r) => row.forEach((v, c) => { if (!v) EA.push([r, c]); }));
const SA = 300, XA = 110, XN = 580, YB = 330;
// hai cột: đáy y BASE; cao (px) — chỉ là hình so sánh, không ghi số
const BASE = 800, X1 = 1180, X2 = 1520, BW = 130, V0 = 210, SC = 100, VN = 220, TGT = SC + VN;
const STEPS = 5;
const vAt = n => TGT - (TGT - V0) * 0.81 ** n;                         // cột いま sau n lần sửa: 5 lần khép ~65% ずれ (「少しずつ」 — vạch đích còn khe)

function bar(g, x, y0, h, k, col) {                                     // cột gỗ mọc lên từ đáy
  if (k <= 0 || h <= 0) return;
  const hh = h * outCubic(clamp(k));
  g.save(); g.fillStyle = 'rgba(8,5,2,0.45)'; g.fillRect(x + 8, y0 - hh + 10, BW, hh); g.fillStyle = col; g.fillRect(x, y0 - hh, BW, hh);
  g.fillStyle = 'rgba(255,244,214,0.25)'; g.fillRect(x, y0 - hh, BW, 3); g.strokeStyle = 'rgba(23,17,12,0.6)'; g.lineWidth = 1.5; g.strokeRect(x + 0.75, y0 - hh + 0.75, BW - 1.5, hh - 1.5);
  g.restore();
}

export default class TD {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      manabi: w(78, '学び方'), td: w(78, 'td学習'), jikan: w(78, '時間'), yobu: w(78, '呼びます'),
      maite: w(79, '毎手'), futatsu: w(79, '2つ'), kuraberu: w(79, '比べます'),
      ima: w(80, 'いま'), yosou1: w(80, '予想'), tsugi1: w(80, '次'), te: w(80, '手'), tokuten: w(80, '得点'), tsugi2: w(80, '次', 2),
      yosou2: w(80, '予想', 2), tashita: w(80, 'たした'),
      e78: L(78).end, zure: w(81, 'ずれ'), yosou3: w(81, '予想'), sukoshi: w(81, '少し'), naoshite: w(81, '直して'), end: L(81).end,
    };
    this.START = L(78).start;
    this.FROM = Math.max(this.START - 1.2, 507.48 + 0.5);              // kết f1 = 507.48
    const T = this.T;
    this.STEP_T = Array.from({ length: STEPS }, (_, i) => T.yosou3 + 0.1 + i * 0.5);
    must(`${NX.moved} && ${NX.merges.length >= 1}`, true);              // lượt kế tiếp có gộp → có 得点
    must(`${A2[SP.at[0]][SP.at[1]]}`, SP.v);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.td, 'pen'), c(T.jikan, 'pen'),
      c(T.maite, 'tick'),
      c(T.yosou1, 'pen'), c(T.tsugi1, 'coin'), c(T.yosou2, 'pen'),
      c(this.STEP_T[0], 'koma'), c(this.STEP_T.at(-1), 'koma')];        // sửa nhỏ: chỉ lần đầu và lần cuối kêu
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    // ── tên: この学び方 → TD学習 ＝ 時間差分学習 ──
    telop(g, 'この学び方を', 96, 110, prog(t, T.manabi - 0.2, T.manabi + 0.5), { size: 40, color: '@dim' });
    const r = telop(g, 'TD学習', 96, 215, prog(t, T.td, T.td + 0.6), { size: 80 });
    telop(g, '＝ 時間差分学習', 96 + r.w + 30, 215, prog(t, T.jikan - 0.2, T.yobu), { size: 56 });

    // ── bàn いま (afterstate của f1, đã chấm 評価) ──
    board(g, A, XA, YB, SA, prog(t, this.FROM + 0.3, this.FROM + 0.9), { seed: 22, hl: EA });
    g.save(); g.globalAlpha = 1 - prog(t, T.e78, T.e78 + 0.8);          // 判子 son mờ dần sau câu 78 (không nằm suốt cảnh)
    stamp(g, '評価', XA + SA + 10, YB - 6, prog(t, this.FROM + 0.6, this.FROM + 1.0), { size: 36 });
    g.restore();
    telop(g, 'いまの盤', XA + SA / 2, 720, prog(t, T.ima - 0.1, T.ima + 0.5), { size: 40, align: 'center' });
    // ── 次の手: 運 rơi rồi vuốt → bàn 次 ──
    arrow(g, XA + SA + 20, YB + SA / 2, XN - 20, YB + SA / 2, prog(t, T.tsugi1 - 0.2, T.tsugi1 + 0.3), { w: 5, color: C.gofunDim, head: 20 });
    coin(g, (XA + SA + XN) / 2, YB + SA / 2 - 56, 26, prog(t, T.tsugi1 - 0.1, T.tsugi1 + 0.3));
    if (t > T.tsugi1 - 0.3) {
      if (t < T.te) {
        const G = board(g, A, XN, YB, SA, prog(t, T.tsugi1 - 0.3, T.tsugi1 + 0.1), { seed: 24 });
        koma(g, SP.v, ...G.ctr(...SP.at), G.cs, prog(t, T.tsugi1 + 0.05, T.tsugi1 + 0.4), { luck: true, seed: 99 });
      } else boardMove(g, A2, 'R', XN, YB, SA, prog(t, T.te, T.te + 0.9), { seed: 24 });
    }
    telop(g, '次の盤', XN + SA / 2, 720, prog(t, T.tsugi2, T.tsugi2 + 0.5), { size: 40, align: 'center' });

    // ── hai số: 予想(いま) | 得点 ＋ 予想(次) ──
    telop(g, '毎手、2つの数をくらべる', 1080, 330, prog(t, T.maite, T.kuraberu + 0.3), { size: 44 });
    brush(g, [[1100, BASE + 2], [1740, BASE + 2]], prog(t, T.futatsu - 0.2, T.futatsu + 0.4), { w: 3, color: C.goldLt });
    // cột いま: mọc ở 予想, rồi nhích dần (STEPS lần) về đích
    let n = 0; for (const s of this.STEP_T) n += smooth(prog(t, s, s + 0.3));
    const v1 = vAt(Math.floor(n)) + (vAt(Math.floor(n) + 1) - vAt(Math.floor(n))) * (n - Math.floor(n));
    bar(g, X1, BASE, v1, prog(t, T.yosou1, T.yosou1 + 0.6), C.kaya);
    telop(g, 'いまの予想', X1 + BW / 2, 870, prog(t, T.yosou1, T.yosou1 + 0.6), { size: 36, align: 'center' });
    // cột 次: 得点 (đáy) + 次の予想 (trên)
    bar(g, X2, BASE, SC, prog(t, T.tokuten, T.tokuten + 0.5), C.gold);
    telop(g, '得点', X2 + BW + 24, BASE - SC / 2 + 14, prog(t, T.tokuten, T.tokuten + 0.4), { size: 36 });
    bar(g, X2, BASE - SC, VN, prog(t, T.yosou2, T.yosou2 + 0.6), C.kaya);
    telop(g, '次の予想', X2 + BW + 24, BASE - SC - VN / 2 + 14, prog(t, T.yosou2, T.yosou2 + 0.5), { size: 36 });
    telop(g, '得点＋次の予想', X2 + BW / 2, 870, prog(t, T.tashita, T.tashita + 0.6), { size: 36, align: 'center' });

    // ── ずれ → sửa nhỏ, lặp ──
    const kz = prog(t, T.zure - 0.1, T.zure + 0.5);
    if (kz > 0) {
      const yT = BASE - TGT, y1 = BASE - v1;
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = C.goldLt; g.lineWidth = 2; g.globalAlpha = 0.85;
      g.beginPath(); g.moveTo(X2 + BW, yT); g.lineTo(X2 + BW - (X2 + BW - X1 + 20) * outCubic(kz), yT); g.stroke(); g.restore();
      brush(g, [[X1 - 26, yT], [X1 - 26, y1]], kz, { w: 3, color: C.goldLt });
      if (y1 - yT > 12) telop(g, 'ずれ', X1 - 44, (yT + y1) / 2 + 14, kz, { size: 36, align: 'right', color: C.goldLt });
    }
    this.STEP_T.forEach((s, i) => {                                      // mũi tên sửa nhỏ mỗi lần
      const ka = prog(t, s - 0.05, s + 0.2), ko = prog(t, s + 0.3, s + 0.45);
      if (ka > 0 && ko < 1) { const y = BASE - vAt(i); arrow(g, X1 + BW / 2, y - 6, X1 + BW / 2, y - 6 - Math.max(18, (vAt(i + 1) - vAt(i)) + 18), ka * (1 - ko), { w: 4, color: C.goldLt, head: 14 }); }
    });
    telop(g, '予想を少しずつ直す', 1080, 990, prog(t, T.sukoshi - 0.2, T.naoshite + 0.4), { size: 44 });
  }
}
