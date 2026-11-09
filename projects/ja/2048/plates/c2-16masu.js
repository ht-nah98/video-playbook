// c2 · 16マスにぴったりの階段 (p2 câu 22–27). DNA c2 = khung lab 0 (tools/lab/banjo.html): bàn 640 trái-trên, 16 quân rắn
// 4,4,8…65536 (65536 ở góc), mũi vàng dọc rắn; cột phải 「16マスにぴったりの階段」 + 「131072の壁」; 駒台 + quân 131072
// 「たたむと、1枚に」; dải 和紙 đáy: 4 + 8 + … + 65536 + 4 = 2¹⁷ = 131072 (must); mascot `phone` (không nói, bàn mini trên màn).
// Gộp dây chuyền: 15 lượt vuốt THẬT (kit.slide R R R U L L L U R R R U L L L) — không quân mới rơi giữa chừng: đây là phép
// "gấp" bậc thang để thấy tổng (保存則), như lời đọc 「たたまれて」.
import { H, C, MIN, JP, clamp, prog, lookup, must, outCubic, ground, ban, boardMove, koma, komadai, chevrons, kifu, telop, write,
  measure, figure, phoneBoard, slide, snake, empty, LADDER, SNAKE } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const BX = 120, BY = 112, BS = 640;
const STAIR = snake(LADDER);                                         // khung lab 0: 65536 ở [0,0], 4·4 ở đáy
const FOLD = 'RRRULLLURRRULLL';
const MOVE = 0.26;                                                   // một lượt gộp
const FIG = [1645, 750];                                             // mascot phone: cx, h (chân chạm đáy)

export default class Masu16 {
  static ERA = 'banjo';
  static POSES = ['phone'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      m16: w(22, '16'), arimasen: w(22, 'ありません'),
      l23: S(23), pittari: w(23, 'ぴったり'), takai: w(23, '高い'), katachi: w(23, '形'),
      l24: S(24), baibai: w(24, '倍々'), v65536: w(24, '65536'),
      l25: S(25), gattai: w(25, '合体'), tatamare: w(25, 'たたまれて'), v131072: w(25, '131072'), e25: E(25),
      l26: S(26), touhi: w(26, '等比'),
      l27: S(27), wa: w(27, '和'), plus4: w(27, '4'), tasu: w(27, 'たす'), choudo: w(27, 'ちょうど'), p17: w(27, '2¹⁷'), end: E(27),
    };
    const T = this.T;
    this.START = S(22);
    this.FROM = Math.max(this.START - 1.2, E(21) + 0.5);
    // câu 24: quân rơi theo bậc tăng dần (4 ở [3,0] trước) — 4, 4, 8, 16 đúng từng chữ, rồi 倍々 nhanh tới 65536
    const w4 = [w(24, '4'), w(24, '4', 2), w(24, '8'), w(24, '16')];
    this.DROP = Array.from({ length: 16 }, (_, j) => j < 4 ? w4[j] : T.baibai + (j - 4) * (T.v65536 - T.baibai) / 11);
    must(`${this.DROP[15]}`, T.v65536);
    // gộp dây chuyền: lượt i bắt đầu FA[i]; quân 131072 bật ra đúng chữ 「131072」
    this.FA = Array.from({ length: 15 }, (_, i) => T.v131072 - 0.6 * MOVE - (14 - i) * MOVE);
    must(`${this.FA[0]} >= ${T.gattai}`, true);
    this.STATES = [STAIR]; for (const d of FOLD) { const r = slide(this.STATES.at(-1), d); must(`${r.moved}`, true); this.STATES.push(r.cells); }
    must(`JSON.stringify(${JSON.stringify(this.STATES.at(-1))})`, JSON.stringify([[131072, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]));
    // bay lên 駒台, rồi bậc thang đặt lại (câu 26)
    this.FLY = [T.e25 - 0.4, T.e25 + 0.3];
    this.REDROP = Array.from({ length: 16 }, (_, j) => T.l26 - 0.3 + j * 0.09);
    // số trên hình
    must(`${LADDER.length}`, 16);
    must(`[${LADDER.slice(1)}].reduce((a, b) => a + b, 0) + 4`, 131072);
    must('2 ^ 17', 131072);
    for (let i = 0; i + 1 < 16; i++) { const [a, b] = [SNAKE[i], SNAKE[i + 1]]; must(`${Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])}`, 1); }
    this.FIGT = [T.l23 - 0.4, T.v65536 - 2.2];                        // mascot ≈ 7.8 s quanh câu 23–24
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const base = [
      c(T.m16, 'pen'), c(T.m16 + 0.6, 'soroban'),
      c(T.pittari, 'pen'), c(T.takai, 'pen'),
      c(this.DROP[0], 'koma'), c(T.baibai, 'soroban'), c(T.v65536, 'shimmer'),
      c(T.l25, 'wood'), c(T.v131072, 'taiko'),
      c(T.l26, 'koma'), c(T.touhi, 'pen'),
      c(T.l27 - 0.1, 'page'), c(T.p17, 'correct'),
    ];
    this.FA.forEach((a, i) => { const t = a + 0.6 * MOVE; if (i % 6 === 0 && base.every(q => Math.abs(q.t - t) >= 1.0)) base.push(c(t, 'chip')); });
    return base;
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── bàn chính ──
    const kBan = prog(t, this.FROM + 0.3, this.FROM + 0.9);
    let cur = null;                                                    // trạng thái cho màn điện thoại
    const fi = this.FA.findIndex((a, i) => t >= a && t < (this.FA[i + 1] ?? this.FA[i] + MOVE));
    if (t >= this.FA[0] && fi >= 0 && t < this.FA[14] + MOVE) {
      boardMove(g, this.STATES[fi], FOLD[fi], BX, BY, BS, clamp((t - this.FA[fi]) / MOVE), { seed: 2 });
    } else {
      const G = ban(g, BX, BY, BS, kBan, { seed: 2 });
      if (t < T.l26 - 0.5 && t < this.FA[0]) {
        // đếm 16 ô (câu 22) — số mờ trên mặt gỗ, quân rơi đè lên
        for (let i = 0; i < 16; i++) { const r = i >> 2, cc = i & 3, [x, y] = G.ctr(r, cc), a = T.m16 + i * 0.09;
          telop(g, String(i + 1), x, y + 14, prog(t, a, a + 0.12), { size: 40, color: '@dim', on: 'wood', align: 'center' }); }
        cur = this.stair(g, G, t, this.DROP);
      } else if (t < T.l26 - 0.5) {
        // đã gấp xong: quân 131072 ở góc, rồi bay lên 駒台
        if (t < this.FLY[0]) koma(g, 131072, ...G.ctr(0, 0), G.cs, 1, { seed: 2 });
      } else cur = this.stair(g, G, t, this.REDROP);
      if (t > T.l26 + 0.6) chevrons(g, G, SNAKE.slice(0, 15).map((_, i) => [SNAKE[15 - i], SNAKE[14 - i]]), prog(t, T.l26 + 0.6, T.l26 + 1.8));
    }

    // ── cột phải ──
    telop(g, '16マスにぴったりの階段', 860, 168, prog(t, T.pittari, T.pittari + 1.0), { size: 40, color: '@dim' });
    const o16 = out(t, T.l25 - 0.3);
    if (o16 < 1) {
      g.save(); g.translate(0, -500 * o16);
      telop(g, [['16', `700 104px ${MIN}`], ['マスしかない', `700 56px ${MIN}`]], 856, 300, prog(t, T.m16, T.arimasen + 0.3), { size: 104 });
      g.restore();
    }
    const oQ = out(t, T.l24 - 0.4);
    if (t > T.takai - 0.1 && oQ < 1) {
      g.save(); g.translate(0, -700 * oQ);
      telop(g, 'いちばん高い階段は？', 856, 430, prog(t, T.takai, T.katachi + 0.4), { size: 52 });
      g.restore();
    }
    const o24 = out(t, T.l25 - 0.3);
    if (t > T.l24 - 0.1 && o24 < 1) {
      g.save(); g.translate(1100 * o24, 0);
      const seq = ['4', '、4', '、8', '、16', '…'], fonts = [MIN, MIN, MIN, MIN, JP];
      let x = 856; seq.forEach((s, i) => { const f = `700 56px ${fonts[i]}`, a = i < 4 ? this.DROP[i] : T.baibai - 0.3;
        telop(g, [[s, f]], x, 430, prog(t, a, a + 0.3), { size: 56 }); x += measure(g, s, f); });
      telop(g, '倍々に', 856, 520, prog(t, T.baibai, T.baibai + 0.6), { size: 44, color: '@dim' });
      telop(g, '65536まで', 856, 620, prog(t, T.v65536, T.v65536 + 0.7), { size: 64 });
      g.restore();
    }
    // 131072の壁 (câu 25 →)
    telop(g, [['131072', `700 104px ${MIN}`], ['の壁', `700 104px ${MIN}`]], 856, 300, prog(t, T.v131072, T.v131072 + 0.9), { size: 104, ls: 4 });
    // 駒台 + quân 131072 (bóng → quân thật khi bay tới)
    if (t > T.l25 - 0.1) {
      const D = komadai(g, 880, 520, 290, 300, prog(t, T.l25, T.l25 + 0.6)), cx = D.x + 145, cy = D.y + 160;
      telop(g, 'たたむと、1枚に', cx, 480, prog(t, T.tatamare, T.tatamare + 0.8), { size: 36, align: 'center' });
      if (t < this.FLY[1]) koma(g, 131072, cx, cy, 230, prog(t, T.l25 + 0.3, T.l25 + 0.8), { ghost: true });
      if (t > this.FLY[0]) {
        const e = outCubic(prog(t, this.FLY[0], this.FLY[1])), G0 = BS * 0.045 + (BS - 2 * BS * 0.045) / 8;
        const x0 = BX + G0, y0 = BY + G0, s0 = (BS - 2 * BS * 0.045) / 4;
        koma(g, 131072, x0 + (cx - x0) * e, y0 + (cy - y0) * e - 80 * Math.sin(Math.PI * e), s0 + (230 - s0) * e, 1, { seed: 2, lift: Math.sin(Math.PI * e) });
      }
    }
    // 等比数列 (câu 26)
    telop(g, '等比数列', 1230, 640, prog(t, T.touhi, T.touhi + 0.8), { size: 72 });
    telop(g, [['となりは ', `700 40px ${MIN}`], ['×2', `700 40px ${JP}`]], 1232, 730, prog(t, T.touhi + 0.6, T.touhi + 1.2), { size: 40, color: '@dim' });
    // dải 和紙: (4 + 8 + 16 + … + 65536) + 4 = 2¹⁷ = 131072 (câu 27)
    if (t > T.l27 - 0.2) kifu(g, 110, 880, 1240, 112, prog(t, T.l27 - 0.15, T.l27 + 0.45), { seed: 3, content: X => this.eq(g, t, X) });

    // ── mascot phone (không nói): bàn mini trên màn = bàn chính ──
    const [f0, f1] = this.FIGT, of = out(t, f1, 0.7);
    if (t > f0 && of < 1) {
      g.save(); g.translate(0, 900 * of);
      const F = figure(g, 'phone', FIG[0], H, FIG[1], prog(t, f0, f0 + 0.6), { talk: false });
      if (F) { phoneBoard(g, F, cur ?? empty()); if (F.x < 1400) throw new Error(`c2: mascot x ${Math.round(F.x)} lấn cột chữ (≤ 1400)`); }
      g.restore();
    }
  }
  // bậc thang rơi theo thứ tự tăng dần (đáy trước) — trả về trạng thái đã đặt
  stair(g, G, t, times) {
    const cells = empty();
    for (let j = 0; j < 16; j++) {
      const [r, c] = SNAKE[15 - j], k = prog(t, times[j], times[j] + 0.4);
      if (k <= 0) continue;
      koma(g, STAIR[r][c], ...G.ctr(r, c), G.cs, k, { seed: r * 4 + c + 34 });
      if (k >= 1) cells[r][c] = STAIR[r][c];
    }
    return cells;
  }
  eq(g, t, X) {
    const T = this.T, big = `700 50px ${MIN}`, sym = `700 50px ${JP}`, sup = `700 30px ${JP}`, y = X.y + 74;
    const segs = [
      [[['(4 + 8 + 16 + ', big], ['…', sym], [' + 65536)', big]], T.wa, T.tasu - 0.3],
      [[[' + 4', big]], T.plus4, T.plus4 + 0.4],
      [[['  =  2', big], ['17', sup, '@ink', { rise: 26, sup: true }]], T.p17, T.p17 + 0.6],
      [[['  =  ', big], ['131072', big, '@ans']], T.p17 + 0.9, T.p17 + 1.5],
    ];
    const wOf = parts => parts.reduce((a, p) => a + measure(g, p[0], p[1]), 0), tot = segs.reduce((a, s) => a + wOf(s[0]), 0);
    if (tot > X.w - 60) throw new Error(`c2: phương trình rộng ${Math.round(tot)} > dải ${X.w - 60}`);
    let x = X.x + (X.w - tot) / 2;
    for (const [parts, a, b] of segs) { write(g, parts, x, y, prog(t, a, b), { on: 'paper' }); x += wOf(parts); }
  }
}
