// e1 · 新しいタイルという相手 (p2 câu 48–58). DNA e1 (盤上), mở 第四幕「相手の名は「運」」:
//  ① câu 48–50: bàn rắn ở góc; 「相手は 新しく出てくるタイル」 (quân 浅葱 rơi); 「わざと邪魔？」 gạch → 「ただ、ランダムなだけ」 + đồng xu;
//     「守っていた角に」: vuốt → (slide thật) góc trống → quân 2 浅葱 rơi đúng góc (spawn hash) → 「階段は崩れる」
//  ② câu 51–53: 駒台 bốn quân mũi tên 「上下左右の4方向」; ô trống sáng 浅葱 「空きマスのどこかに」「2か4」;
//     bàn mới: hai quân 2 gộp → còn MỘT quân, 15 ô trống sáng → 「空き15 × 2 ＝ 30通り」 (must)
//  ③ câu 54–58: 「盤全体の局面の数は けた違い」; một ô → 18 khả năng (空き + 17 quân 2…131072) 「＝ 18通り」;
//     18¹⁶ ≈ 1.2垓通り; số đủ 21 chữ số so với 1億×1億×1万 (cột chữ số thẳng hàng) 「を超える」; 「すべては調べられない」
import { W, H, C, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, ground, ban, board, boardMove, koma, komadai, coin, chevrons,
  telop, luck, wrong, strikeInk, arrow, measure, heading, actCard, actCue, slide, spawn, comma, STATES } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung

// bàn rắn ở góc (trước khi 運 rơi): 256 ở góc trên-trái, bậc thang chảy theo rắn
const S0 = [[256, 128, 64, 0], [8, 16, 32, 0], [2, 4, 0, 0], [0, 0, 0, 0]];
const STAIR = [[[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]]];
// tìm chỉ số hash TẤT ĐỊNH cho quân mới (kit.spawn) thoả điều kiện cảnh
const find = (cells, ok) => { for (let i = 1; i < 5000; i++) { const s = spawn(cells, i); if (ok(s)) return s; } throw new Error('e1: không tìm được spawn'); };
const B15 = [[2, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];   // hai quân đầu ván: gộp ← → còn MỘT quân, 15 ô trống
const OPTS = [0, ...Array.from({ length: 17 }, (_, i) => 2 ** (i + 1))];   // một ô: trống + 2 … 131072

export default class Aite {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      aite: w(48, '相手'), atara: w(48, '新しく'), tile: w(48, 'タイル'),
      waza: w(49, 'わざと'), arima: w(49, 'ありません'), rand: w(49, 'ランダム'),
      l50: S(50), mamo: w(50, '守って'), kado: w(50, '角'), ni: w(50, '2'), ochi: w(50, '落ちて'), kai: w(50, '階段'), kuzu: w(50, '崩れて'),
      l51: S(51), mai: w(51, '毎手'), erab: w(51, '選べる'), joge: w(51, '上下'), sayu: w(51, '左右'), yottsu: w(51, '4つ'),
      aite52: w(52, '空いて'), masu52: w(52, 'マス'), n2: w(52, '2'), n4: w(52, '4'), araw: w(52, 'あらわれます'), e52: E(52),
      l53: S(53), m15: w(53, '15'), t30: w(53, '30通り'),
      l54: S(54), ban: w(54, '盤'), kyoku: w(54, '局面'), keta: w(54, 'けた違い'),
      hito: w(55, '1つ'), aki: w(55, '空き'), beki: w(55, 'べき乗'), shu17: w(55, '17種類'), t18: w(55, '18通り'),
      l56: S(56), m16: w(56, '16'), p18: w(56, '18¹⁶'), gai: w(56, '1.2垓'),
      oku1: w(57, '1億'), oku2: w(57, '1億', 2), man: w(57, '1万'), koe: w(57, '超える'),
      l58: S(58), comp: w(58, 'コンピュータ'), subete: w(58, 'すべて'), dekin: w(58, 'できません'),
    };
    this.START = S(48);
    this.FROM = Math.max(this.START - 2.6, E(47) + 0.5);              // KẾT d2 (câu 47) + 0.5
    // ① quân mới đầu tiên rơi ở hàng dưới (không lấp góc / hàng rắn); vuốt → ; quân 2 rơi ĐÚNG góc trống
    this.SP0 = find(S0, s => s.at[0] === 3);
    this.S1 = this.SP0.cells;
    this.MV = slide(this.S1, 'R');
    must(`${this.MV.cells[0][0]}`, 0); must(`${this.MV.merges.length}`, 0);
    this.SP1 = find(this.MV.cells, s => s.at[0] === 0 && s.at[1] === 0 && s.v === 2);
    this.S2 = this.SP1.cells;
    this.EMPTY2 = []; this.S2.forEach((row, r) => row.forEach((v, c) => { if (!v) this.EMPTY2.push([r, c]); }));
    // ② hai quân 2 gộp ← : còn một quân 4, 15 ô trống → 15 × 2 = 30
    this.M15 = slide(B15, 'L');
    this.EMPTY15 = []; this.M15.cells.forEach((row, r) => row.forEach((v, c) => { if (!v) this.EMPTY15.push([r, c]); }));
    must(`${this.EMPTY15.length}`, 15); must(`${this.EMPTY15.length} * 2`, 30);
    // ③ 18 khả năng một ô; 18¹⁶ (BigInt, đủ chữ số); ≈ 1.2垓; > 1億 × 1億 × 1万
    must(`${OPTS.length}`, 18); must('1 + 17', 18); must(`${OPTS.at(-1)}`, 131072);
    this.BIG = comma((18n ** 16n).toString());
    must(`'${this.BIG}'`, '121,439,531,096,594,251,776');
    this.TEN = comma((10n ** 8n * 10n ** 8n * 10n ** 4n).toString());
    must(`'${this.TEN}'`, '100,000,000,000,000,000,000');
    must(`(Math.round(${STATES} / 1e19) / 10).toFixed(1)`, '1.2');
    must(`${18n ** 16n > 10n ** 20n}`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      actCue(this.FROM, this.START),
      c(this.FROM + 0.4, 'koma'), c(T.tile, 'coin'),
      c(T.waza + 0.1, 'pen'), c(T.rand, 'coin'),
      c(T.kado, 'koma'), c(T.ochi, 'coin'), c(T.kai, 'wood'),
      c(T.mai, 'wood'), c(T.joge, 'koma'),
      c(T.aite52, 'pen'), c(T.n2, 'coin'),
      c(T.l53 - 0.5, 'koma'), c(T.t30, 'dice'),
      c(T.ban, 'koma'), c(T.hito, 'tick'), c(T.beki, 'koma'), c(T.t18, 'pen'),
      c(T.p18, 'soroban'), c(T.gai, 'pen'),
      c(T.oku1, 'pen'), c(T.man + 0.6, 'soroban'),
      c(T.subete, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    const BX = 150, BY = 210, BS = 600;
    // tên mục (sau thẻ hồi) → rời trái cùng bàn 15 ô, trước dòng 「盤全体の局面の数は」
    const oH = out(t, T.l54 - 0.6, 0.7);
    if (oH < 1) { g.save(); g.translate(-1000 * oH, 0); heading(g, 4, '新しいタイルという相手', prog(t, this.START + 0.4, this.START + 1.4)); g.restore(); }

    // ── ①② bàn chính (câu 48–52) → rời xuống trước câu 53 ──
    const oA = out(t, T.e52 + 0.05, 0.6);
    if (oA < 1) {
      g.save(); g.translate(0, 1000 * oA);
      const kB = prog(t, this.FROM + 0.3, this.FROM + 1.2), sw = T.kado - 0.15;
      if (t < sw) {
        const G = board(g, S0, BX, BY, BS, kB, { chev: STAIR, kChev: prog(t, T.mamo, T.mamo + 0.7) * (1 - prog(t, sw - 0.2, sw)) });
        koma(g, this.SP0.v, ...G.ctr(...this.SP0.at), G.cs, prog(t, T.tile, T.tile + 0.5), { luck: true, seed: 99 });
      } else if (t < T.l51) {
        boardMove(g, this.S1, 'R', BX, BY, BS, prog(t, sw, sw + 0.8), { spawn: { ...this.SP1, k: prog(t, T.ochi, T.ochi + 0.5) } });
      } else {
        const hl = t > T.aite52 ? this.EMPTY2 : null;
        board(g, this.S2, BX, BY, BS, 1, { luck: t < T.aite52 ? [this.SP1.at] : [], hl });
      }
      // vuốt →: mũi tên nét trên mặt bàn, rút lại khi quân trượt xong
      const r1 = prog(t, sw + 0.6, sw + 1.1);
      if (t > sw - 0.5 && r1 < 1) { const cy = BY + BS / 2, x0 = BX + BS * 0.18, x1 = BX + BS * 0.82;
        arrow(g, x0 + (x1 - x0) * r1, cy, x1, cy, prog(t, sw - 0.5, sw), { w: 9, head: 34 }); }
      g.restore();
    }
    // ② bàn 15 ô trống (câu 53): rơi vào chỗ cũ, ← gộp hai quân 2
    const oB = out(t, T.l54 - 0.6, 0.7);
    if (t > T.e52 + 0.3 && oB < 1) {
      g.save(); g.translate(-1000 * oB, 0);
      const a = T.l53 - 0.5;
      if (t < a) board(g, B15, BX, BY, BS, prog(t, T.e52 + 0.3, a));
      else if (t < a + 0.9) boardMove(g, B15, 'L', BX, BY, BS, prog(t, a, a + 0.85));
      else {
        const n = Math.ceil(15 * prog(t, T.m15 - 0.1, T.m15 + 0.6));
        board(g, this.M15.cells, BX, BY, BS, 1, { hl: n > 0 ? this.EMPTY15.slice(0, n) : null });
      }
      g.restore();
    }

    // ── ① cột phải (câu 48–49) → rời phải ──
    const X = 900, o1 = out(t, T.l50 - 0.5);
    if (o1 < 1) {
      g.save(); g.translate(1100 * o1, 0);
      telop(g, '相手は', X, 290, prog(t, T.aite, T.aite + 0.5), { size: 48, color: '@dim' });
      luck(g, '新しく出てくるタイル', X, 390, prog(t, T.atara, T.tile + 0.4), { size: 56 });
      const b = wrong(g, 'わざと邪魔をしている？', X, 560, prog(t, T.waza, T.waza + 1.1), { size: 48 });
      strikeInk(g, b.x - 6, b.y + b.h * 0.45, b.x + b.w + 6, b.y + b.h * 0.42, prog(t, T.arima, T.arima + 0.5));
      luck(g, 'ただ、ランダムなだけ', X, 660, prog(t, T.rand - 0.3, T.rand + 0.6), { size: 56 });
      g.restore();
    }
    // ① câu 50 → rời phải ở câu 51
    const o2 = out(t, T.l51 - 0.5);
    if (t > T.l50 - 0.3 && o2 < 1) {
      g.save(); g.translate(1100 * o2, 0);
      telop(g, '守っていた角に', X, 300, prog(t, T.mamo, T.kado + 0.3), { size: 56 });
      luck(g, '2が1枚', X, 410, prog(t, T.ni, T.ni + 0.5), { size: 64 });
      telop(g, '落ちてくるだけで', X + 240, 410, prog(t, T.ochi, T.ochi + 0.7), { size: 40, color: '@dim' });
      telop(g, '階段は崩れる', X, 560, prog(t, T.kai, T.kuzu + 0.5), { size: 72 });
      g.restore();
    }
    // đồng xu 運 (góc trên-phải) từ 「ランダム」 tới hết ②
    const oc = out(t, T.l54 - 0.6, 0.7);
    if (t > T.rand && oc < 1) coin(g, 1730 + 300 * oc, 150, 50, prog(t, T.rand, T.rand + 0.5), { spin: Math.max(0, 1 - prog(t, T.rand, T.rand + 1.0)) * 6 });

    // ── ② cột phải (câu 51–53) ──
    const o3 = out(t, T.l54 - 0.6, 0.7);
    if (t > T.l51 - 0.4 && o3 < 1) {
      g.save(); g.translate(1100 * o3, 0);
      telop(g, '選べるのは', X, 240, prog(t, T.erab, T.erab + 0.5), { size: 40, color: '@dim' });
      telop(g, '上下左右の4方向', X + 220, 240, prog(t, T.joge, T.yottsu + 0.5), { size: 52 });
      const D = komadai(g, X, 300, 760, 200, prog(t, T.l51 - 0.4, T.l51 + 0.3));
      [['U', T.joge], ['D', T.joge + 0.25], ['L', T.sayu], ['R', T.sayu + 0.25]].forEach(([d, a], i) =>
        koma(g, 2, D.x + 110 + i * 180, D.y + 100, 140, prog(t, a, a + 0.45), { label: { U: '↑', D: '↓', L: '←', R: '→' }[d], seed: i + 20 }));
      telop(g, '空きマスのどこかに', X, 680, prog(t, T.aite52, T.masu52 + 0.4), { size: 48 });
      luck(g, '2', X, 780, prog(t, T.n2, T.n2 + 0.3), { size: 64 });
      telop(g, 'か', X + 60, 780, prog(t, T.n2 + 0.15, T.n4), { size: 48 });
      luck(g, '4', X + 130, 780, prog(t, T.n4, T.n4 + 0.3), { size: 64 });
      telop(g, 'があらわれる', X + 200, 780, prog(t, T.araw, T.araw + 0.6), { size: 44, color: '@dim' });
      telop(g, [['空き15', `700 52px ${MIN}`], [' × ', `700 52px ${JP}`], ['2 ＝ ', `700 52px ${MIN}`]], X, 920, prog(t, T.m15, T.m15 + 0.8), { size: 52 });
      luck(g, '30通り', X + 360, 920, prog(t, T.t30, T.t30 + 0.5), { size: 72 });
      g.restore();
    }

    // ── ③ 局面の数 (câu 54–58) ──
    if (t > T.l54 - 0.4) {
      telop(g, '盤全体の局面の数は', 96, 170, prog(t, T.l54 - 0.35, T.kyoku + 0.6), { size: 52 });   // vào ngay khi ② rời (khung giữa ②→③ không trống)
      telop(g, 'けた違い', 620, 170, prog(t, T.keta, T.keta + 0.5), { size: 72 });
      // câu 54–55: bàn nhỏ + một ô → 18 khả năng; rời lên ở câu 56
      const o4 = out(t, T.l56 - 0.5, 0.7);
      if (o4 < 1) {
        g.save(); g.translate(0, -900 * o4);
        const G = board(g, this.S2, 120, 300, 320, prog(t, T.ban - 0.2, T.ban + 0.8), { numbers: false, legs: false, thick: 20 });
        const kc = prog(t, T.hito, T.hito + 0.4), [r, c] = [2, 1];
        if (kc > 0) { g.save(); g.strokeStyle = C.goldLt; g.lineWidth = 5; g.globalAlpha = kc; g.strokeRect(G.ox + c * G.cs + 2, G.oy + r * G.cs + 2, G.cs - 4, G.cs - 4); g.restore(); }
        const X0 = 540, STEP = 150, SZ = 136;
        OPTS.forEach((v, i) => {
          const x = X0 + (i % 9) * STEP, y = 410 + Math.floor(i / 9) * 170, a = i === 0 ? T.aki : T.beki + (i - 1) * ((T.shu17 + 0.4 - T.beki) / 16);
          if (v === 0) {
            const k = prog(t, a, a + 0.4); if (k <= 0) return;
            g.save(); g.globalAlpha = k; g.setLineDash([10, 8]); g.strokeStyle = C.goldLt; g.lineWidth = 3; g.strokeRect(x - SZ * 0.42, y - SZ * 0.45, SZ * 0.84, SZ * 0.9); g.restore();
            telop(g, '空き', x, y + 12, k, { size: 32, align: 'center', color: '@dim' });
          } else koma(g, v, x, y, SZ, prog(t, a, a + 0.4), { seed: i + 3 });
        });
        if (kc > 0) brush2(g, G.ox + 4 * G.cs + 14, G.oy + r * G.cs + G.cs / 2, X0 - 70, 410, kc);
        const f = `700 52px ${MIN}`, y3 = 720;
        let x = X0 - 60;
        telop(g, '空き', x, y3, prog(t, T.aki, T.aki + 0.4), { size: 52 }); x += measure(g, '空き', f) + 20;
        telop(g, '＋ 2のべき乗 17種類', x, y3, prog(t, T.beki - 0.2, T.shu17 + 0.4), { size: 52 }); x += measure(g, '＋ 2のべき乗 17種類', f) + 20;
        telop(g, '＝', x, y3, prog(t, T.t18 - 0.2, T.t18), { size: 52 }); x += measure(g, '＝', f) + 20;
        telop(g, '18通り', x, y3 + 6, prog(t, T.t18, T.t18 + 0.5), { size: 72 });
        g.restore();
      }
      // câu 56–58: 18¹⁶ ≈ 1.2垓; hai dãy chữ số thẳng hàng
      if (t > T.l56 - 0.3) {
        telop(g, '16マスで', 300, 340, prog(t, T.m16, T.m16 + 0.5), { size: 44, color: '@dim' });
        telop(g, [['18', `700 130px ${MIN}`], ['16', `700 64px ${JP}`, '@ink', { rise: 60, gap: 0 }]], 300, 500, prog(t, T.p18 - 0.2, T.p18 + 0.5), { size: 130 });
        telop(g, [['≈ ', `700 96px ${JP}`], ['1.2垓', `700 130px ${MIN}`], [' 通り', `700 64px ${MIN}`]], 640, 500, prog(t, T.gai - 0.1, T.gai + 0.8), { size: 130 });
        const NF = `600 60px ${JP}`, xr = 1800, nw = measure(g, this.BIG, NF);
        telop(g, [['18', `700 48px ${MIN}`], ['16', `700 28px ${JP}`, '@ink', { rise: 22, sup: true }]], 300, 650, prog(t, T.p18 + 0.4, T.p18 + 0.8), { size: 48 });
        telop(g, this.BIG, xr - nw, 650, prog(t, T.p18 + 0.4, T.gai + 0.2), { font: NF, size: 60 });
        telop(g, [['1億', `700 48px ${MIN}`], [' × ', `700 48px ${JP}`]], 300, 790, prog(t, T.oku1, T.oku1 + 0.4), { size: 48 });
        telop(g, [['1億', `700 48px ${MIN}`], [' × ', `700 48px ${JP}`]], 300 + 150, 790, prog(t, T.oku2, T.oku2 + 0.4), { size: 48 });
        telop(g, '1万', 300 + 300, 790, prog(t, T.man, T.man + 0.3), { size: 48 });
        telop(g, this.TEN, xr - nw, 790, prog(t, T.man, T.man + 1.2), { font: NF, size: 60, color: '@dim' });
        // 「を超える」: khoanh ba chữ số đầu của hai dãy (121 > 100), màu trung tính
        const kk = prog(t, T.koe, T.koe + 0.5);
        if (kk > 0) { const w3 = measure(g, '121,', NF); g.save(); g.strokeStyle = C.goldLt; g.lineWidth = 3.5; g.globalAlpha = kk;
          g.beginPath(); g.roundRect(xr - nw - 14, 590, (w3 + 28) * outCubic(kk), 222, 16); g.stroke(); g.restore(); }
        telop(g, 'を超える', 300, 880, prog(t, T.koe, T.koe + 0.5), { size: 48 });
        telop(g, 'どんなコンピュータでも', 960, 900, prog(t, T.comp - 0.2, T.comp + 0.6), { size: 40, color: '@dim', align: 'center' });
        telop(g, 'すべては調べられない', 960, 990, prog(t, T.subete, T.dekin + 0.3), { size: 64, align: 'center' });
      }
    }
    actCard(g, t, this.FROM, this.START, 4);
  }
}
// đường mực nhạt từ ô được chọn tới hàng 18 khả năng (màu trung tính)
function brush2(g, x0, y0, x1, y1, k) {
  g.save(); g.strokeStyle = C.gofunDim; g.globalAlpha = 0.6 * k; g.lineWidth = 2; g.setLineDash([6, 8]);
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * smooth(k), y0 + (y1 - y0) * smooth(k)); g.stroke(); g.restore();
}
