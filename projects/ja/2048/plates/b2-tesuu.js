// b2 · 2048までの手数 (p2, câu 9–14). DNA b2 (盤上): tờ 棋譜 ghi tay bên phải — 意外な計算 · 盤の合計 ≥ 2048 ·
//  2048 ÷ 2.2 ≈ 930 (朱, must) · 少なくとも930手 · シミュレーション: 「第n手」 chạy → chốt 「平均 1018手」 · 1枚ごとに 約1000回の判断.
//  Bàn bên trái: bóng 2048 (đích) → ván chạy thật (kit.play) → bàn có quân 2048 + quân nhỏ còn sót (khoanh vàng).
import { W, H, C, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, ground, ban, board, koma, kifu, write, brush, heading,
  play, slide, TAU } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
// vòng khoanh nét bút (màu trung tính) quanh một quân — hàm cục bộ
function ring(g, cx, cy, r, k, w = 3.5) {
  if (k <= 0) return;
  const pts = Array.from({ length: 41 }, (_, i) => { const a = -2.2 + i / 40 * TAU * 1.06, rr = r * (1 + 0.04 * Math.sin(i * 1.3)); return [cx + rr * Math.cos(a), cy + rr * 0.95 * Math.sin(a)]; });
  brush(g, pts, k, { w, color: C.goldLt, alpha: 0.95 });
}

export default class Tesuu {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.START = L(9).start;
    this.FROM = Math.max(this.START - 1.2, tl.lines[8].end + 0.5);        // KẾT b1 = câu 8
    this.T = {
      igai: w(9, '意外'), keisan9: w(9, '計算'),
      t2048: w(10, '2048'), tsukuru: w(10, '作る'), gokei: w(10, '合計'), sukunaku10: w(10, '少なく'), b2048: w(10, '2048', 2), e10: L(10).end,
      sore: w(11, 'それ'), waru: w(11, '割る'), n930: w(11, '930'), heikin11: w(11, '平均'), sukunaku11: w(11, '少なく'), te930: w(11, '930手'), keisan11: w(11, '計算'),
      sim: w(12, 'シミュレーション'), hakaru: w(12, '測る'), jissai: w(12, '実際'), heikin12: w(12, '平均'), te1018: w(12, '1018手'),
      l13: L(13).start, mada: w(13, 'まだ'), chiisa: w(13, '小さな'), nokotte: w(13, '残って'),
      t14: w(14, '2048'), ichimai: w(14, '1枚'), sen: w(14, '1000回'), handan: w(14, '判断'), end: L(14).end,
    };
    must('2048 / 2.2 > 930 && 2048 / 2.2 < 931', true); must('Math.floor(2048 / 2.2)', 930);
    must('Math.round(1018 / 100) * 100', 1000);                           // 1018手 → 「約1000回」
    this.RUN = play([[0, 0, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]], 320, { order: 'ULRD', seed: 2 });
    must(`${this.step(this.T.te1018 + 1)} < ${this.RUN.length - 1}`, true);         // ván chưa hết nước trong cảnh
    // bàn có 2048 + quân nhỏ chưa gộp (trạng thái hợp lệ: còn nước đi)
    this.END = [[2048, 256, 64, 8], [2, 16, 32, 4], [4, 2, 8, 2], [2, 0, 0, 0]];
    must(`${['L', 'R', 'U', 'D'].some(d => slide(this.END, d).moved)}`, true);
    this.SMALL = []; this.END.forEach((row, r) => row.forEach((v, c) => { if (v && v <= 16) this.SMALL.push([r, c]); }));
    this.BX = [110, 270, 520];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.keisan9, 'pen'), c(T.t2048, 'wood'), c(T.gokei, 'pen'), c(T.b2048, 'tick'),
      c(T.sore, 'koma'), c(T.n930, 'tick'), c(T.te930, 'pen'), c(T.keisan11 - 0.3, 'tick'),
      c(T.hakaru, 'soroban'), c(T.te1018, 'snap'),
      c(T.l13, 'koma'), c(T.chiisa, 'tick'),
      c(T.t14, 'tick'), c(T.ichimai, 'pen'), c(T.sen, 'pen'),
    ];
  }
  // bước ván chạy ở giờ t: ~4 nước/s từ câu 11, tua nhanh trong lúc 「第n手」 chạy (câu 12)
  step(t) {
    const T = this.T, slow = Math.max(0, t - (T.sore + 0.3)) * 4, fast = Math.max(0, Math.min(t, T.te1018) - (T.hakaru)) * 45;
    return Math.min(this.RUN.length - 1, Math.floor(slow + fast));
  }
  render(g, t) {
    const T = this.T, [bx, by, bS] = this.BX;
    ground(g, t);
    heading(g, 1, '2048までの手数', prog(t, this.FROM + 0.3, this.FROM + 1.2), { y: 168 });

    // ── bàn trái ──
    const oRun = out(t, T.l13 - 0.4, 0.7);
    if (oRun < 1) {
      g.save(); g.translate(-(bx + bS + 100) * oRun, 0);
      if (t < T.sore + 0.3) {
        const G = ban(g, bx, by, bS, prog(t, this.FROM + 0.3, this.FROM + 1.0));
        const oG = out(t, T.sore - 0.4, 0.6);                             // bóng 2048 (đích) bay lên rời khung
        if (oG < 1) { g.save(); g.translate(0, -900 * oG);
          koma(g, 2048, G.x + bS / 2, G.y + bS / 2, 300, prog(t, T.t2048, T.t2048 + 0.6), { ghost: true }); g.restore(); }
        const s0 = this.RUN[0].prev; let i = 0;
        s0.forEach((row, r) => row.forEach((v, c) => { if (v) { koma(g, v, ...G.ctr(r, c), G.cs, prog(t, T.sore + i * 0.12, T.sore + 0.3 + i * 0.12), { seed: r * 4 + c }); i++; } }));
      } else board(g, this.RUN[this.step(t)].cells, bx, by, bS, 1);
      g.restore();
    }
    if (t > T.l13 + 0.15) {                                            // bàn cũ đã gần ra hẳn (out 0.7 s từ l13 − 0.4)
      const G = board(g, this.END, bx, by, bS, prog(t, T.l13 + 0.15, T.l13 + 1.3));
      this.SMALL.forEach(([r, c], i) => ring(g, ...G.ctr(r, c), G.cs * 0.5, prog(t, T.chiisa + i * 0.12, T.chiisa + 0.4 + i * 0.12)));
      const kl = smooth(prog(t, T.t14, T.t14 + 0.6));                    // câu 14: quân 2048 nhấc lên, to ra (đọc rõ số)
      if (kl > 0) koma(g, 2048, ...G.ctr(0, 0), G.cs * (1 + 0.32 * kl), 1, { lift: kl, seed: 3 });
      write(g, 'まだ合体していない、小さなタイル', bx, 940, prog(t, T.mada, T.nokotte), { font: `700 40px ${MIN}` });
    }

    // ── 棋譜 bên phải ──
    kifu(g, 800, 110, 1024, 850, prog(t, this.FROM + 0.3, this.FROM + 0.9), { rules: true, seed: 5, content: X => {
      const x = X.ix + 24, y = X.iy, p = { on: 'paper' };
      write(g, '意外な計算', x, y + 70, prog(t, this.FROM + 0.3, T.keisan9 + 0.5), { font: `700 52px ${MIN}`, ...p });
      const a = write(g, '2048を作るには', x, y + 170, prog(t, T.t2048, T.tsukuru + 0.5), { font: `700 40px ${MIN}`, color: '@dim', ...p });
      write(g, '盤の合計', a.x0 + a.w + 30, y + 170, prog(t, T.gokei - 0.4, T.gokei + 0.4), { font: `700 52px ${MIN}`, ...p });
      write(g, [['≥', `700 52px ${JP}`], [' 2048', `700 52px ${MIN}`]], a.x0 + a.w + 250, y + 170, prog(t, T.b2048 - 0.3, T.b2048 + 0.4), p);
      const d = write(g, [['2048 ÷ 2.2 ', `700 56px ${MIN}`], ['≈', `700 56px ${JP}`]], x, y + 275, prog(t, T.sore, T.n930 - 0.1), p);
      write(g, ' 930', d.x0 + d.w, y + 275, prog(t, T.n930, T.n930 + 0.5), { font: `700 64px ${MIN}`, color: '@ans', ...p });
      const e = write(g, '平均で、少なくとも', x, y + 365, prog(t, T.heikin11, T.sukunaku11 + 0.6), { font: `700 40px ${MIN}`, color: '@dim', ...p });
      write(g, '930手', e.x0 + e.w + 20, y + 365, prog(t, T.te930, T.te930 + 0.5), { font: `700 56px ${MIN}`, ...p });
      brush(g, [[e.x0 + e.w + 18, y + 382], [e.x0 + e.w + 170, y + 384]], prog(t, T.keisan11 - 0.3, T.keisan11 + 0.3), { w: 3, color: C.sumi, alpha: 0.7 });
      brush(g, [[x, y + 420], [x + X.iw - 70, y + 424]], prog(t, T.sim - 0.5, T.sim), { w: 2.5, color: C.sumi, alpha: 0.5 });
      write(g, 'シミュレーションで測ると', x, y + 495, prog(t, T.sim, T.hakaru + 0.4), { font: `700 40px ${MIN}`, color: '@dim', ...p });
      // 棋譜 tay: bộ đếm 「第n手」 (không dấu phẩy) chạy tới mốc 1018手 → chốt 「平均 1018手」 (trung bình nhiều ván, không phải ván bên trái)
      const kn = smooth(prog(t, T.hakaru, T.te1018)), n = Math.max(1, Math.round(1018 * kn));
      if (t >= T.hakaru && t < T.te1018) write(g, [['第', `700 44px ${MIN}`], [`${n}`, `700 64px ${MIN}`], ['手', `700 44px ${MIN}`]], x + 110, y + 590, 1, p);
      if (t >= T.te1018) {
        must(`${n}`, 1018);
        write(g, '平均', x, y + 590, prog(t, T.te1018, T.te1018 + 0.3), { font: `700 40px ${MIN}`, color: '@dim', ...p });
        write(g, [[`${n}`, `700 64px ${MIN}`], ['手', `700 44px ${MIN}`]], x + 110, y + 590, 1, p);
      }
      const f = write(g, '2048を1枚作るたびに', x, y + 700, prog(t, T.ichimai - 0.3, T.ichimai + 0.8), { font: `700 40px ${MIN}`, color: '@dim', ...p });
      write(g, '約1000回の判断', f.x0 + f.w + 24, y + 700, prog(t, T.sen, T.handan + 0.5), { font: `700 60px ${MIN}`, ...p });
    } });
  }
}
