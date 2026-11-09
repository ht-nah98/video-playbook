// g1 · 最強の機械 (p2, câu 89–94). DNA g1 (盤上): thẻ hồi「第六幕 勝ち続けることはできるのか」;
//  ① bàn 榧 bên trái (thế cờ mạnh, 15 quân rắn) · 「最強クラスの機械」
//  ② tờ 棋譜: cây 探索 (kit.tree) ＋ 「巨大な表」 (lưới bàn mini — trạng thái THẬT từ kit.play)
//  ③ 「開発者が公開した記録」 · 算盤 0 → 1200 「回分」 · ba thanh: 16384 ほぼ毎回 (99.9%) / 32768 86% / 65536 8.4%
//  ④ 12 bàn mini: 11 bàn 詰み (kín, không còn nước — kiểm bằng kit.slide), MỘT bàn có 65536 (≈ 1/12, must)
//  ⑤ 「なぜ毎回は勝てない？」
import { W, H, C, MIN, JP, clamp, hash, prog, lookup, must, outCubic, smooth, ground, ban, board, koma, kifu, tree, soroban,
  telop, write, actCard, actCue, slide, play, snake, empty } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));            // 0 → 1 rời khung
const stuck = cells => cells.flat().every(v => v) && [...'UDLR'].every(d => !slide(cells, d).moved);

// thế cờ mạnh (①): 15 quân rắn 32768 … 2, một ô trống ở cuối rắn
const STRONG = snake(Array.from({ length: 15 }, (_, i) => 2 ** (15 - i)));
// 12 ván của "máy mạnh nhất": 11 bàn 詰み (max 32768 / 16384), một bàn có 65536 (rắn vàng)
function lostBoard(i) {
  for (let j = 0; j < 400; j++) {
    const c = empty(), top = i % 3 === 2 ? 16384 : 32768;
    for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) c[r][q] = 2 ** (1 + Math.floor(hash(i * 131.7 + j * 17.3 + r * 4.1 + q * 0.77) * 11));
    c[0][0] = top; c[0][1] = top / 2;
    if (stuck(c)) return c;
  }
  throw new Error(`g1: không dựng được bàn 詰み ${i}`);
}
const WIN = 10;                                                          // vị trí bàn thắng trong lưới 3×4
const GAMES = Array.from({ length: 12 }, (_, i) => i === WIN ? snake([65536, 16384, 8192, 2048, 1024, 256, 128, 32, 16, 8, 4, 2]) : lostBoard(i));
// "巨大な表": 20 trạng thái thật lấy từ một ván bấm (kit.play)
const RUN = play([[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0]], 160, { seed: 6 });
const TABLE = Array.from({ length: 20 }, (_, i) => RUN[Math.min(RUN.length - 1, 4 + i * 7)].cells);
const ROOT = RUN[Math.min(RUN.length - 1, 60)].cells;

export default class Saikyo {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      ima: w(89, 'いま'), kou: w(89, '公開'), saikyo: w(89, '最強'), kikai: w(89, '機械'),
      l90: S(90), tansaku: w(90, '探索'), keisan: w(90, '計算'), kyodai: w(90, '巨大'), hyou: w(90, '表'), kumi: w(90, '組み合わせた'), prog: w(90, 'プログラム'),
      l91: S(91), kai: w(91, '開発者'), n1200: w(91, '1200回'), kiroku: w(91, '記録'), v16: w(91, '16384'), hobo: w(91, 'ほぼ'), todo: w(91, '届いて'),
      v32: w(92, '32768'), p86: w(92, '86%'), v65: w(92, '65536'), p84: w(92, '8.4%'), e92: E(92),
      l93: S(93), tsumari: w(93, 'つまり'), saikyo93: w(93, '最強'), v65b: w(93, '65536'), oyoso: w(93, 'およそ'), k12: w(93, '12回'), k1: w(93, '1回'),
      l94: S(94), naze: w(94, 'なぜ'), katenai: w(94, '勝てない'), end: E(94),
    };
    this.START = S(89);
    this.FROM = Math.max(this.START - 2.6, E(88) + 0.5);                // KẾT f3 = câu 88
    // số trên hình (must ở trạng thái đã xong)
    must('1200', 1200);
    must('Math.round(0.999 * 1000) / 10', 99.9); must('Math.round(0.861 * 100)', 86); must('8.4', 8.4);
    must('Math.round(1 / 0.084)', 12);                                   // ≈ 12 回に 1 回
    must(`${GAMES.filter(c => Math.max(...c.flat()) === 65536).length}`, 1); must(`${GAMES.length}`, 12);
    GAMES.forEach((c, i) => { if (i !== WIN && !(stuck(c) && Math.max(...c.flat()) < 65536)) throw new Error(`g1: bàn ${i} chưa 詰み`); });
    this.TREE = { type: 'board', cells: ROOT, children: ['D', 'L', 'R', 'U'].map((d, i) => ({ type: 'me', dir: d, best: i === 0,
      children: [0, 1].map(() => ({ type: 'dot' })) })) };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      actCue(this.FROM, this.START),
      c(T.saikyo, 'pen'), c(T.tansaku + 0.3, 'dice'), c(T.kyodai, 'pen'), c(T.kumi + 0.2, 'tick'),
      c(T.n1200, 'soroban'), c(T.v16, 'koma'), c((T.v16 + T.hobo) / 2 + 0.25, 'soroban'), c(T.hobo, 'pen'),   // soroban giữa lúc thanh 16384 chạy
      c(T.v32, 'koma'), c(T.p86, 'pen'), c(T.v65, 'koma'), c(T.p84, 'pen'),
      c(T.tsumari, 'koma'), c(T.v65b + 0.1, 'koma'), c(T.k12, 'tick'), c(T.k1, 'shimmer'),   // koma: quân 65536 nổi lên trên bàn vàng
      c(T.naze, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── ① bàn mạnh + 「最強クラスの機械」, ② 棋譜: 探索 ＋ 巨大な表 (câu 89–90) → rời ở câu 91 ──
    const oA = out(t, T.kai - 0.6, 0.7);
    if (oA < 1) {
      g.save(); g.translate(-900 * oA, 0);
      board(g, STRONG, 120, 300, 560, prog(t, this.FROM + 0.3, this.FROM + 1.4), { seed: 3 });
      g.restore();
      g.save(); g.translate(0, -600 * oA);
      telop(g, 'いま公開されている中で', 760, 140, prog(t, T.ima, T.kou + 0.8), { size: 36, color: '@dim' });
      telop(g, '最強クラスの機械', 760, 240, prog(t, T.saikyo, T.kikai + 0.5), { size: 64 });
      g.restore();
      g.save(); g.translate(1200 * oA, 0);
      kifu(g, 740, 320, 1084, 660, prog(t, T.l90 - 0.4, T.l90 + 0.3), { rules: true, seed: 9, content: X => {
        const on = { on: 'paper' };
        write(g, '探索', X.ix + 10, X.iy + 40, prog(t, T.tansaku, T.tansaku + 0.5), { font: `700 44px ${MIN}`, ...on });
        tree(g, this.TREE, X.ix + 80, X.iy + 330, prog(t, T.tansaku + 0.2, T.keisan), { dx: 180, dy: 58, size: 130, meSize: 80 });
        write(g, '＋', X.ix + 470, X.iy + 345, prog(t, T.kumi, T.kumi + 0.4), { font: `700 64px ${MIN}`, ...on, align: 'center' });
        write(g, '巨大な表', X.ix + 540, X.iy + 40, prog(t, T.kyodai, T.hyou + 0.5), { font: `700 44px ${MIN}`, ...on });
        write(g, 'あらかじめ計算', X.ix + 740, X.iy + 40, prog(t, T.keisan - 0.2, T.keisan + 0.6), { font: `700 32px ${MIN}`, color: '@dim', ...on });
        TABLE.forEach((cells, i) => {
          const r = Math.floor(i / 5), q = i % 5, kk = prog(t, T.kyodai - 0.3 + i * 0.05, T.kyodai + 0.3 + i * 0.05);
          board(g, cells, X.ix + 540 + q * 92, X.iy + 85 + r * 100, 78, kk, { numbers: false, legs: false, thick: 5, shadow: false, seed: i + 2 });
        });
      } });
      g.restore();
    }

    // ── ③ 記録 1200回分 + ba thanh (câu 91–93) → rời trái ở câu 94 ──
    const oB = out(t, T.l94 - 0.3, 0.6);
    if (t > T.kai - 0.6 && oB < 1) {
      g.save(); g.translate(-1400 * oB, 0);
      telop(g, '開発者が公開した記録', 96, 170, prog(t, T.kai - 0.2, T.kiroku + 0.4), { size: 40, color: '@dim' });
      const kv = smooth(prog(t, T.n1200, T.n1200 + 1.2)), n = Math.round(1200 * kv);
      soroban(g, 96, 210, 1200, prog(t, T.kai, T.kai + 0.6), { cols: 4, rod: 56, from: 0, kv });
      if (kv > 0) telop(g, [[`${n}`, `700 72px ${MIN}`], ['回分', `700 48px ${MIN}`]], 400, 340, 1, { size: 72 });
      if (kv >= 1) must(`${n}`, 1200);
      const rows = [[16384, 0.999, T.v16, T.hobo, [['ほぼ毎回', `700 52px ${MIN}`], ['（99.9', `500 32px ${JP}`], ['%）', `500 32px ${JP}`]]],
        [32768, 0.861, T.v32, T.p86, [['86', `700 60px ${MIN}`], ['%', `500 44px ${JP}`]]],
        [65536, 0.084, T.v65, T.p84, [['8.4', `700 60px ${MIN}`], ['%', `500 44px ${JP}`]]]];
      rows.forEach(([v, p, a, b, lab], i) => {
        const y = 560 + i * 150, x0 = 270, L = 620;
        koma(g, v, 170, y, 130, prog(t, a, a + 0.45), { seed: i + 30 });
        const kb = smooth(prog(t, a + 0.3, b + 0.2)), bw = L * p * kb;
        if (kb > 0) {
          g.save(); g.fillStyle = 'rgba(10,8,4,0.45)'; g.fillRect(x0, y - 20, L, 40);
          const gr = g.createLinearGradient(0, y - 20, 0, y + 20); gr.addColorStop(0, C.goldLt); gr.addColorStop(0.5, C.gold); gr.addColorStop(1, C.goldDk);
          g.fillStyle = gr; g.fillRect(x0, y - 20, Math.max(2, bw), 40); g.restore();
        }
        telop(g, lab, x0 + L * p + 24, y + 20, prog(t, b, b + 0.6), { size: 60 });
      });
      g.restore();
    }
    // 結論 (câu 93) — đứng lại khi thanh rời đi
    if (t > T.oyoso - 0.2) telop(g, [['およそ ', `700 44px ${MIN}`], ['12回に1回', `700 64px ${MIN}`]], 96, 1000,
      Math.max(prog(t, T.oyoso, T.oyoso + 0.5) * 0.35, prog(t, T.k12 - 0.2, T.k1 + 0.3)), { size: 64 });

    // ── ④ 12 ván: 11 詰み, MỘT bàn 65536 (câu 93) — đứng tới hết cảnh ──
    if (t > T.tsumari - 0.4) {
      const k12 = prog(t, T.k12, T.k12 + 0.6), k1 = prog(t, T.k1, T.k1 + 0.5);
      let WG = null;
      GAMES.forEach((cells, i) => {
        const r = Math.floor(i / 3), q = i % 3, x = 1330 + q * 168, y = 174 + r * 200;                 // lưới nâng 16 px
        const kk = prog(t, T.tsumari - 0.3 + i * 0.06, T.tsumari + 0.4 + i * 0.06);
        const all = cells.flatMap((row, rr) => row.map((_, cc) => [rr, cc]));
        const G = board(g, cells, x, y, 150, kk, { numbers: false, legs: false, thick: 10, seed: i + 1, dim: i !== WIN && k12 > 0.5 ? all : [] });
        if (i === WIN && k1 > 0) { g.save(); g.strokeStyle = C.goldLt; g.lineWidth = 4; g.globalAlpha = k1; g.strokeRect(x - 9, y - 9, 168, 180); g.restore(); }
        if (i === WIN) WG = G;
      });
      // quân 65536 của bàn thắng nổi lên (đủ to cho số ≥ 28 px) ở 「65536」 câu 93, đứng tới hết cảnh
      if (WG) { const [px, py] = WG.ctr(0, 0); koma(g, 65536, px + 34, py + 30, 116, prog(t, T.v65b + 0.1, T.v65b + 0.6), { seed: 41, lift: 0.5 }); }
      telop(g, '最強の機械でも', 1330, 134, prog(t, T.saikyo93, T.saikyo93 + 0.7), { size: 40, color: '@dim' });
      telop(g, '65536', 1330 + 168 + 75, 984, prog(t, T.k1 + 0.1, T.k1 + 0.6), { size: 40, align: 'center' });
    }

    // ── ⑤ なぜ毎回は勝てない？ (câu 94) ──
    if (t > T.naze - 0.3) {
      telop(g, 'なぜ', 120, 470, prog(t, T.naze, T.naze + 0.4), { size: 56, color: '@dim' });
      telop(g, '毎回は勝てない？', 120, 590, prog(t, T.naze + 0.2, T.katenai + 0.5), { size: 84 });
    }

    actCard(g, t, this.FROM, this.START, 6);
  }
}
