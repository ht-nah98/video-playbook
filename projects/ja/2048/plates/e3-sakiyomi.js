// e3 · 先読みの効果 (p2 câu 67–72). DNA e3 (盤上):
//  ① câu 67–68: tờ 棋譜 cây nhỏ (この探索) + 駒台 「＋ シンプルな採点」 ba ký hiệu: 空きマス (bàn thưa) · となりの同じ数 (8 | 8)
//     · 順番どおり (64 32 16 mũi vàng) · 「〜ほど、点が高い」
//  ② câu 69–70: tấm gỗ khắc hai thanh: 1手先 71.5% · 2手先 約96% (số của CONTENT) · 「深さごとに 1000回ずつ」「2048に届いた割合」
//  ③ câu 71: tờ 和紙 kín khung: cây (kit.tree) nở từng tầng — gốc → 4 hướng → 運 → ×8 → ×3 · 「1手深く読むたびに」「木は 約100倍」
//  ④ câu 72: tờ cây trượt sang trái; 「別の方法が必要」「機械が」「自分で学ぶ」
import { C, MIN, JP, clamp, prog, lookup, must, outCubic, ground, board, koma, komadai, kifu, tree, chevrons, ban,
  write, telop } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const ROOT = [[256, 128, 64, 32], [4, 16, 16, 8], [2, 8, 4, 8], [4, 2, 8, 2]];       // cùng gốc cây e2
const SPARSE = [[32, 8, 0, 0], [4, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0]];
const DIRS = ['U', 'R', 'L', 'D'];
const DEPTH = [71.5, 96];                                                          // CONTENT: 1手 71.5%, 2手 ~96%

export default class Sakiyomi {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      tan: w(67, '探索'), simple: w(67, 'シンプル'), saiten: w(67, '採点'), kumi: w(67, '組み合わせます'),
      aki: w(68, '空きマス'), onaji: w(68, '同じ'), tonari: w(68, 'となり合って'), jun: w(68, '順番'), ten: w(68, '点'), e68: E(68),
      l69: S(69), fuka: w(69, '深さごと'), k1000: w(69, '1000回'), te1: w(69, '1手'), p715: w(69, '71.5%'), todo: w(69, '届きました'),
      te2: w(70, '2手'), p96: w(70, '96%'), agari: w(70, '上がります'),
      l71: S(71), te71: w(71, '1手'), ki: w(71, '木'), x100: w(71, '100倍'), fuku: w(71, 'ふくれあがります'),
      l72: S(72), betsu: w(72, '別'), kikai: w(72, '機械'), jibun: w(72, '自分'), end: E(72),
    };
    this.START = S(67);
    this.FROM = Math.max(this.START - 1.2, E(66) + 0.5);
    must('71.5', DEPTH[0]); must('96', DEPTH[1]); must('1000', 1000);
    // cây nhỏ (①): gốc → 4 hướng → 運 → 3 bàn
    this.SMALL = { type: 'board', cells: ROOT, children: DIRS.map((d, i) => ({ type: 'me', dir: d, best: i === 0,
      children: [{ type: 'luck', children: [0, 1, 2].map(() => ({ type: 'dot' })) }] })) };
    // cây lớn (③): mỗi tầng nhân lên — 4 hướng × 運 × 8 × 3 = 96 lá
    this.BIG = { type: 'board', cells: ROOT, children: DIRS.map((d, i) => ({ type: 'me', dir: d, best: i === 0,
      children: [{ type: 'luck', children: Array.from({ length: 8 }, () => ({ type: 'dot', children: [0, 1, 2].map(() => ({ type: 'dot' })) })) }] })) };
    must('4 * 8 * 3', 96);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.simple, 'pen'),
      c(T.aki, 'koma'), c(T.onaji + 0.2, 'chip'), c(T.jun, 'koma'), c(T.ten, 'pen'),
      c(T.te1, 'soroban'), c(T.p715, 'pen'), c(T.todo - 0.2, 'tick'),
      c(T.te2, 'soroban'), c(T.p96, 'correct'),
      c(T.l71 - 0.4, 'page'), c(T.ki, 'whoosh'),
      c(T.l72 - 0.3, 'whoosh'), c(T.betsu, 'pen'), c(T.jibun, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── ① cây nhỏ (trái) → rời trái ở câu 69 ──
    const o1 = out(t, T.l69 - 0.5, 0.7);
    if (o1 < 1) {
      g.save(); g.translate(-1100 * o1, 0);
      kifu(g, 96, 220, 820, 600, prog(t, this.FROM + 0.2, this.FROM + 0.9), { seed: 11, content: X => {
        write(g, 'この探索', X.ix + 10, X.iy + 40, prog(t, T.tan, T.tan + 0.5), { font: `700 40px ${MIN}`, on: 'paper' });
        tree(g, this.SMALL, X.ix + 110, X.iy + 290, prog(t, this.FROM + 0.6, this.FROM + 2.2), { dx: 200, dy: 38, size: 150, meSize: 76 });
      } });
      g.restore();
    }
    // ② tấm gỗ hai thanh (câu 69–70) → rời trái ở câu 71
    const o2 = out(t, T.l71 - 0.5, 0.7);
    if (t > T.l69 - 0.5 && o2 < 1) {
      g.save(); g.translate(-1100 * o2, 0);
      telop(g, '深さごとに', 96, 270, prog(t, T.fuka, T.fuka + 0.6), { size: 44, color: '@dim' });
      telop(g, '1000回ずつ', 340, 270, prog(t, T.k1000, T.k1000 + 0.6), { size: 52 });
      const P = komadai(g, 96, 330, 820, 380, prog(t, T.l69 - 0.4, T.l69 + 0.3));
      const X0 = P.x + 210, BW = 430;
      [[T.te1, T.p715, '1手先', '71.5%'], [T.te2, T.p96, '2手先', '約96%']].forEach(([a, b, lab, pct], i) => {
        const y = P.y + 120 + i * 150, k = prog(t, a, a + 0.3);
        if (k <= 0) return;
        write(g, lab, P.x + 40, y + 16, k, { font: `700 44px ${MIN}`, on: 'wood' });
        g.save(); g.globalAlpha = k;
        g.fillStyle = 'rgba(40,22,6,0.55)'; g.fillRect(X0, y - 26, BW, 52);                          // rãnh khắc
        g.strokeStyle = 'rgba(255,240,200,0.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(X0, y + 26); g.lineTo(X0 + BW, y + 26); g.stroke();
        const f = outCubic(prog(t, a, b + 0.2)) * DEPTH[i] / 100, gr = g.createLinearGradient(0, y - 22, 0, y + 22);
        gr.addColorStop(0, C.goldLt); gr.addColorStop(0.5, C.gold); gr.addColorStop(1, C.goldDk);
        g.fillStyle = gr; g.fillRect(X0 + 4, y - 22, (BW - 8) * f, 44);
        g.restore();
        write(g, pct, X0 + BW + 16, y + 15, prog(t, b, b + 0.5), { font: `700 40px ${JP}`, on: 'wood' });
      });
      telop(g, '2048に届いた割合', 96, 820, prog(t, T.todo, T.todo + 0.7), { size: 40, color: '@dim' });
      g.restore();
    }
    // ①② 駒台 採点 (phải) → rời phải ở câu 71
    const o3 = out(t, T.l71 - 0.5, 0.7);
    if (o3 < 1) {
      g.save(); g.translate(1000 * o3, 0);
      telop(g, '＋ シンプルな採点', 1000, 300, prog(t, T.simple, T.saiten + 0.5), { size: 60 });
      const D = komadai(g, 1000, 380, 800, 320, prog(t, T.saiten, T.kumi + 0.3)), cy = D.y + 160, xs = [1135, 1400, 1665];
      // 空きマス: bàn thưa
      board(g, SPARSE, xs[0] - 85, cy - 85, 170, prog(t, T.aki, T.aki + 0.7), { numbers: false, legs: false, thick: 10 });
      // となりの同じ数: 8 | 8
      koma(g, 8, xs[1] - 52, cy, 100, prog(t, T.onaji, T.onaji + 0.4), { seed: 51 });
      koma(g, 8, xs[1] + 52, cy, 100, prog(t, T.onaji + 0.2, T.onaji + 0.6), { seed: 52 });
      // 順番どおり: 64 32 16 + mũi vàng chảy về đầu
      [64, 32, 16].forEach((v, i) => koma(g, v, xs[2] - 82 + i * 82, cy, 80, prog(t, T.jun + i * 0.12, T.jun + 0.4 + i * 0.12), { seed: 60 + i }));
      const G = { cs: 82, ctr: (r, c) => [xs[2] - 82 + c * 82, cy - 4] };
      chevrons(g, G, [[[0, 2], [0, 1]], [[0, 1], [0, 0]]], prog(t, T.jun + 0.6, T.jun + 1.1));
      const lab = (s, x, a) => telop(g, s, x, 820, prog(t, a, a + 0.5), { size: 36, align: 'center' });
      lab('空きマス', xs[0], T.aki); lab('となりの同じ数', xs[1], T.tonari - 0.2); lab('順番どおり', xs[2], T.jun);
      telop(g, '…ほど、点が高い', 1400, 940, prog(t, T.ten, T.ten + 0.7), { size: 48, align: 'center' });
      g.restore();
    }

    // ── ③④ cây lớn kín khung (câu 71–72) ──
    if (t > T.l71 - 0.5) {
      const sh = -820 * outCubic(prog(t, T.l72 - 0.3, T.l72 + 0.6));
      g.save(); g.translate(sh, 0);
      kifu(g, 96, 150, 1728, 860, prog(t, T.l71 - 0.4, T.l71 + 0.3), { seed: 12, content: X => {
        // gốc + 4 hướng vào cùng tờ giấy (k 0.4 = hai tầng đầu), các tầng sau nở theo lời
        const kT = 0.4 * prog(t, T.l71 - 0.2, T.l71 + 0.5) + 0.6 * prog(t, T.te71, T.fuku + 0.8);
        tree(g, this.BIG, X.ix + 110, X.iy + X.ih / 2, kT, { dx: 375, dy: 8, size: 120, meSize: 70 });
      } });
      telop(g, '1手深く読むたびに', 96, 110, prog(t, T.l71, T.l71 + 0.9), { size: 44, color: '@dim' });
      telop(g, '木は 約100倍', 1300, 116, prog(t, T.x100, T.x100 + 0.7), { size: 60 });
      g.restore();
      telop(g, '別の方法が必要', 1100, 380, prog(t, T.betsu, T.betsu + 0.9), { size: 56 });
      telop(g, '機械が', 1100, 520, prog(t, T.kikai, T.kikai + 0.4), { size: 44, color: '@dim' });
      telop(g, '自分で学ぶ', 1100, 700, prog(t, T.jibun, T.jibun + 0.7), { size: 110 });
    }
  }
}
