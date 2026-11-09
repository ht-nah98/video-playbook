// c1 · 階段をつくる (p2 câu 15–21). DNA c1: thẻ hồi「第二幕 131072の壁」; 「いくらでも大きく？」→ gạch 墨 →「いいえ」;
// đệ quy trên bàn: 2048 (bóng trên 駒台) cần hai 1024 「出会える位置」; giữ quân thứ nhất trong lúc dựng quân thứ hai → nửa
// của nó hai quân … xuống tận 4, 4 → bậc thang 10 quân dọc hình rắn; 「どこかの瞬間に 少なくとも階段まるごと1つ分が
// 同時に盤の上に」 (lập luận CHẶT: không phải "17 bậc", mà ở một lúc nào đó ít nhất ngần ấy quân cùng lúc trên bàn).
import { C, MIN, clamp, prog, lookup, must, outCubic, ground, ban, board, boardMove, koma, komadai, chevrons, telop, wrong,
  strikeInk, brush, arrow, heading, actCard, actCue, play, SNAKE } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const BX = 120, BY = 200, BS = 600;                                   // bàn chính (trái)
const START0 = [[64, 32, 16, 4], [8, 16, 4, 2], [2, 4, 0, 0], [0, 2, 0, 0]];   // giữa ván — bấm bừa tiếp (kit.play, quân mới hash)
const STEP = 0.4;                                                     // một lượt vuốt mỗi 0.4 s (câu 15)

export default class Kaidan {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      asobi: w(15, '遊び'), ikura: w(15, 'いくら'), ookiku: w(15, '大きく'), e15: E(15),
      iie: w(16, 'いいえ'),
      l17: S(17), ookina: w(17, '大きな'), kumi: w(17, '組み立てて'),
      l18: S(18), hanbun: w(18, '半分'), nimai: w(18, '2枚'), deae: w(18, '出会える'), ichi: w(18, '位置'),
      l19: S(19), m1: w(19, '1枚目'), aida: w(19, '間'), m2: w(19, '2枚目'), sarani: w(19, 'さらに'), hanbun19: w(19, '半分'), nimai19: w(19, '2枚'),
      l20: S(20), shita: w(20, '下'), shunkan: w(20, '瞬間'), sukunaku: w(20, '少なく'), kaidan: w(20, '階段'), marugoto: w(20, 'まるごと'),
      douji: w(20, '同時'), ban: w(20, '盤'),
      l21: S(21), beki: w(21, 'べき乗'), zutsu: w(21, 'ずつ'), shita21: w(21, '下'), onaji: w(21, '同じ'), nimai21: w(21, '2枚'), end: E(21),
    };
    const T = this.T;
    this.START = S(15);
    this.FROM = Math.max(this.START - 2.6, E(14) + 0.5);              // KẾT b2 = cuối câu 14
    // câu 15: bấm bừa thật trên bàn chính, một lượt mỗi STEP từ 遊び tới いいえ
    this.T0 = T.asobi;
    const n = Math.floor((T.iie - this.T0) / STEP);
    this.RUN = play(START0, n, { seed: 7 });
    must(`${this.RUN.length}`, n);                                   // không hết nước giữa chừng
    // đệ quy: chuyển n (1..9) — lift quân ở chỗ n−1, đặt hai quân nửa giá trị ở n−1 và n (dọc SNAKE)
    this.TR = [null, { lift: null, d1: T.hanbun, d2: T.nimai }, { lift: T.m2, d1: T.hanbun19, d2: T.nimai19 }];
    for (let k = 3; k <= 9; k++) { const b = T.shita + 0.05 + (k - 3) * 0.36; this.TR.push({ lift: b, d1: b + 0.12, d2: b + 0.22 }); }
    must(`${this.TR[9].d2 + 0.45} < ${T.shunkan + 0.3}`, true);
    // giá trị cuối: 1024, 512, …, 8, 4, 4 — 10 quân, hai quân 4 ở đáy, tổng = 2048 (đúng quân cần làm)
    this.FINAL = Array.from({ length: 10 }, (_, i) => i === 9 ? 4 : 1024 / 2 ** i);
    must(`[${this.FINAL}].reduce((a, b) => a + b, 0)`, 2048);
    must(`${this.FINAL[8]} === 4 && ${this.FINAL[9]} === 4`, true);
    for (let i = 0; i < 8; i++) must(`${this.FINAL[i]} === 2 * ${this.FINAL[i + 1]}`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const must1 = [
      actCue(this.FROM, this.START),
      c(T.asobi, 'pen'), c(T.ikura, 'pen'),
      c(T.iie, 'error'),
      c(T.l17 + 0.05, 'koma'), c(T.kumi, 'pen'),
      c(T.l18, 'wood'), c(T.hanbun, 'koma'), c(T.nimai, 'koma'), c(T.ichi, 'tick'),
      c(T.m1, 'tick'), c(T.m2, 'pop'), c(T.hanbun19, 'koma'),
      c(this.TR[3].d1, 'koma'),
      c(T.shunkan, 'pen'), c(T.kaidan, 'tick'), c(T.douji, 'suzu'),
      c(T.beki, 'pen'), c(T.shita21, 'tick'),
    ];
    // tiếng quân trượt (câu 15) chỉ khi cách mọi tiếng khác ≥ 1.5 s (COMMON: mật độ)
    const kept = must1.slice();
    this.RUN.forEach((_, s) => { const t = this.T0 + s * STEP; if (s % 6 === 3 && kept.every(q => Math.abs(q.t - t) >= 1.5)) kept.push(c(t, 'koma')); });
    return kept;
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    heading(g, 2, '階段をつくる', prog(t, this.START + 1.0, this.START + 2.0));

    // ── bàn chính ──
    const kBan = prog(t, this.FROM + 0.3, this.FROM + 0.9);
    const s = Math.floor((t - this.T0) / STEP);
    if (t < this.T0) board(g, START0, BX, BY, BS, kBan, { seed: 3 });
    else if (s < this.RUN.length) {
      const st = this.RUN[s], k = (t - this.T0 - s * STEP) / STEP;
      boardMove(g, st.prev, st.dir, BX, BY, BS, clamp(k / 0.8), { seed: 3, spawn: { at: st.spawn.at, v: st.spawn.v, k: prog(k, 0.7, 1) } });
    } else {
      // dừng ở「いいえ」; câu 17: quân nhấc khỏi bàn lần lượt → bàn trống chờ dựng
      const last = this.RUN.at(-1).cells, G = ban(g, BX, BY, BS, 1, { seed: 3 });
      let j = 0;
      last.forEach((row, r) => row.forEach((v, c) => { if (!v) return; const a = T.l17 + j++ * 0.05;
        koma(g, v, ...G.ctr(r, c), G.cs, 1 - prog(t, a, a + 0.3), { seed: r * 4 + c + 51 }); }));
      if (t > T.l17) this.chain(g, t, G);
    }

    // ── A: いくらでも大きく？ → gạch → いいえ (câu 15–16) → rời phải ──
    const oA = out(t, T.l17 - 0.3);
    if (t > T.asobi - 0.1 && oA < 1) {
      g.save(); g.translate(1100 * oA, 0);
      telop(g, 'ずっと遊び続ければ', 860, 300, prog(t, T.asobi, T.asobi + 0.9), { size: 44, color: '@dim' });
      const q = 'タイルはいくらでも大きく？', kq = prog(t, T.ikura, T.ookiku + 0.9);
      const box = t < T.iie ? telop(g, q, 860, 410, kq, { size: 56 }) : wrong(g, q, 860, 410, 1, { size: 56 });
      strikeInk(g, box.x - 8, box.y + box.h * 0.48, box.x + box.w + 8, box.y + box.h * 0.44, prog(t, T.iie, T.iie + 0.4));
      telop(g, 'いいえ', 860, 540, prog(t, T.iie + 0.4, T.iie + 0.9), { size: 96 });
      g.restore();
    }

    // ── B: いちばん大きなタイルを 組み立ててみる (câu 17) → rời lên ──
    const oB = out(t, T.l18 - 0.4);
    if (t > T.l17 && oB < 1) {
      g.save(); g.translate(0, -700 * oB);
      telop(g, 'いちばん大きなタイルを', 860, 300, prog(t, T.ookina, T.ookina + 1.0), { size: 48 });
      telop(g, '組み立ててみる', 860, 400, prog(t, T.kumi, T.kumi + 0.8), { size: 64 });
      g.restore();
    }

    // ── 駒台: quân muốn làm (bóng 2048) — từ câu 18 tới hết ──
    if (t > T.l18 - 0.1) {
      const D = komadai(g, 1540, 640, 300, 270, prog(t, T.l18, T.l18 + 0.6));
      koma(g, 2048, D.x + 150, D.y + 128, 200, prog(t, T.l18 + 0.3, T.l18 + 0.8), { ghost: true });
      telop(g, 'あるタイル', D.x + 150, 1000, prog(t, T.l18 + 0.6, T.l18 + 1.2), { size: 40, color: '@dim', align: 'center' });
    }

    // ── C: 半分が2枚 · 出会える位置に · 1枚目を置いたまま · 2枚目には さらに半分が2枚 (câu 18–19) → rời phải ──
    const oC = out(t, T.l20 - 0.3);
    if (t > T.hanbun - 0.1 && oC < 1) {
      g.save(); g.translate(1100 * oC, 0);
      telop(g, 'その半分が2枚', 860, 300, prog(t, T.hanbun, T.nimai + 0.5), { size: 52 });
      telop(g, '出会える位置に', 860, 390, prog(t, T.deae, T.ichi + 0.4), { size: 52 });
      telop(g, '1枚目を置いたまま', 860, 500, prog(t, T.m1 + 0.2, T.aida + 0.3), { size: 40, color: '@dim' });
      telop(g, '2枚目には、さらに半分が2枚', 860, 580, prog(t, T.m2 + 0.3, T.nimai19 + 0.4), { size: 40 });
      g.restore();
    }

    // ── D: どこかの瞬間に 少なくとも 階段まるごと1つ分が 同時に盤の上に (câu 20, kết luận — ở tới hết) ──
    if (t > T.shunkan - 0.1) {
      telop(g, 'どこかの瞬間に', 860, 300, prog(t, T.shunkan, T.shunkan + 0.7), { size: 48 });
      telop(g, '少なくとも', 860, 390, prog(t, T.sukunaku, T.sukunaku + 0.5), { size: 40, color: '@dim' });
      telop(g, '階段まるごと1つ分が', 860, 480, prog(t, T.kaidan, T.marugoto + 1.2), { size: 52 });
      telop(g, '同時に盤の上に', 860, 580, prog(t, T.douji, T.ban + 0.6), { size: 60 });
    }
    // ── E: 2のべき乗が1枚ずつ · いちばん下だけ 同じタイルが2枚 (câu 21) ──
    if (t > T.beki - 0.3) {
      telop(g, [['2', `700 44px ${MIN}`], ['のべき乗が1枚ずつ', `700 44px ${MIN}`]], 860, 720, prog(t, T.beki - 0.2, T.zutsu + 0.3), { size: 44 });
      telop(g, 'いちばん下だけ、同じタイルが2枚', 860, 810, prog(t, T.shita21, T.nimai21 + 0.3), { size: 40 });
      arrow(g, 840, 790, 420, 567, prog(t, T.onaji, T.onaji + 0.6), { color: C.gofunDim, w: 5 });
    }
    actCard(g, t, this.FROM, this.START, 2);
  }
  // bậc thang dựng dần trên bàn (sau câu 17)
  chain(g, t, G) {
    const T = this.T, TR = this.TR;
    for (let i = 0; i < 10; i++) {
      const first = i === 0 ? { at: TR[1].d1, v: 1024 } : { at: TR[i].d2, v: 1024 / 2 ** (i - 1) };
      const nx = i >= 1 && i <= 8 ? TR[i + 1] : null, ctr = G.ctr(...SNAKE[i]);
      if (t < first.at) continue;
      if (!nx || t < nx.lift) koma(g, first.v, ...ctr, G.cs, prog(t, first.at, first.at + 0.45), { seed: i + 61 });
      else {
        const kl = 1 - prog(t, nx.lift, nx.lift + 0.25);
        if (kl > 0) koma(g, first.v, ...ctr, G.cs, kl, { seed: i + 61 });
        if (i === 1 && t < nx.d1) koma(g, first.v, ...ctr, G.cs, prog(t, nx.lift + 0.2, nx.lift + 0.6), { ghost: true });   // 2枚目: まだない
        if (t >= nx.d1) koma(g, first.v / 2, ...ctr, G.cs, prog(t, nx.d1, nx.d1 + 0.45), { seed: i + 81 });
      }
    }
    // 1枚目: khung chọn trung tính quanh quân thứ nhất (câu 19)
    const [x0, y0] = [G.ox, G.oy], cs = G.cs;
    brush(g, [[x0 + 9, y0 + 9], [x0 + cs - 9, y0 + 9], [x0 + cs - 9, y0 + cs - 9], [x0 + 9, y0 + cs - 9], [x0 + 9, y0 + 9]], prog(t, T.m1, T.m1 + 0.5), { w: 6, color: C.sumi });
    // 出会える位置: mũi vàng giữa hai 1024 (câu 18, ở chữ 位置)
    if (t > T.ichi && t < TR[2].lift) chevrons(g, G, [[SNAKE[1], SNAKE[0]]], prog(t, T.ichi, T.ichi + 0.4));
    // 階段: mũi vàng chảy từ đáy về góc (câu 20)
    if (t > T.kaidan) chevrons(g, G, Array.from({ length: 9 }, (_, j) => [SNAKE[9 - j], SNAKE[8 - j]]), prog(t, T.kaidan, T.marugoto + 0.8));
    // 同時に盤に: viền quanh cả 10 quân
    const kd = prog(t, T.douji, T.douji + 1.0);
    if (kd > 0) brush(g, [[x0 + 5, y0 + 5], [x0 + 4 * cs - 5, y0 + 5], [x0 + 4 * cs - 5, y0 + 2 * cs - 5], [x0 + 2 * cs - 5, y0 + 2 * cs - 5],
      [x0 + 2 * cs - 5, y0 + 3 * cs - 5], [x0 + 5, y0 + 3 * cs - 5], [x0 + 5, y0 + 5]], kd, { w: 5, color: C.sumi, alpha: 0.9 });
  }
}
