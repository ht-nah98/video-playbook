// f1 · 運が入る前に採点する (p2 câu 73–77). DNA f1 (盤上): thẻ hồi 第五幕 → cây nhỏ 「枝を1本ずつ」 rời đi → 12 bàn mini
// tự chơi (kit.play thật) 「何百万回も」 → 「どんな盤が良い盤か」 → dải ba bàn: 盤 → スワイプ直後 (ô trống 浅葱 = chỗ 運 sắp rơi,
// 判子「評価」 TRƯỚC khi quân mới rơi) → quân mới rơi (浅葱); 「落ちたあと」 gạch, 「スワイプ直後」 ngay dưới; vạch cắt
// 「自分で決めた | 運で決まる」.
import { W, H, C, MIN, clamp, prog, lookup, must, outCubic, smooth, ground, actCard, actCue, heading, ban, board, boardMove, koma,
  tree, coin, telop, luck, wrong, strikeInk, stamp, brush, arrow, slide, spawn, play } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
// dải ba bàn: B0 → (vuốt R) → B1 = afterstate → (運) → B2
const B0 = [[2, 0, 16, 64], [0, 4, 4, 8], [0, 0, 2, 2], [0, 0, 0, 0]];
const MV = slide(B0, 'R'), B1 = MV.cells, SP = spawn(B1, 5), B2 = SP.cells;
const E1 = []; B1.forEach((row, r) => row.forEach((v, c) => { if (!v) E1.push([r, c]); }));
const S = 360, XS = [140, 780, 1420], Y = 330;

export default class Saiten {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      eda: w(73, '枝'), ippon: w(73, '1本'), keisan: w(73, '計算'), kawari: w(73, 'かわり'), kikai: w(73, '機械'), man: w(73, '何百万回'),
      jibun: w(73, '自分'), asobu: w(73, '遊ばせます'),
      donna: w(74, 'どんな'), ban2: w(74, '盤', 2), mitsuke: w(74, '見つけさせる'),
      l75: L(75).start, kagi: w(75, '鍵'), saiten: w(75, '採点'), timing: w(75, 'タイミング'),
      atara: w(76, '新しい'), ochita: w(76, '落ちた'), naku: w(76, 'なく'), swipe: w(76, 'スワイプ'), chokugo: w(76, '直後'),
      un: w(76, '運'), mae: w(76, '前'), saiten2: w(76, '採点'),
      l77: L(77).start, kimeta: w(77, '決めた'), un2: w(77, '運'), kimaru: w(77, '決まる'), kiri: w(77, '切り分ける'), end: L(77).end,
    };
    this.START = L(73).start;
    this.FROM = Math.max(this.START - 2.6, 475.09 + 0.5);        // mở hồi; kết e3 = 475.09 (bảng nhóm)
    // 12 bàn tự chơi THẬT (kit.play, quân mới hash) — mỗi bàn một seed
    this.RUNS = Array.from({ length: 12 }, (_, i) => { const s0 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      s0[(i * 5 % 16) >> 2][i * 5 % 4] = 2; const j = (i * 7 + 3) % 16; s0[j >> 2][j & 3] = 2; return play(s0, 300, { seed: 40 + i }); });
    this.TREE = { type: 'board', cells: B0.map(r => r.slice()), children: ['U', 'L', 'R', 'D'].map(d => ({ type: 'me', dir: d, children: [0, 1].map(() => ({ type: 'dot' })) })) };
    // số trên hình: dải bàn hợp lệ (tổng bảo toàn trong slide), quân mới là 2 hoặc 4 vào ô trống của B1
    must(`${MV.moved} && ${MV.merges.length}`, 2);
    must(`${B1[SP.at[0]][SP.at[1]]}`, 0);
    must(`[${B2.flat()}].reduce((a, b) => a + b, 0) - [${B1.flat()}].reduce((a, b) => a + b, 0)`, SP.v);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START),
      c(T.eda, 'pen'), c(T.man, 'soroban'),
      c(T.donna, 'pen'), c(T.mitsuke, 'tick'),
      c(T.kagi, 'pen'),
      c(T.atara, 'koma'), c(T.ochita, 'coin'), c(T.swipe, 'koma'),
      c(T.saiten2, 'hanko'),
      c(T.kimeta, 'pen'), c(T.un2, 'dice'), c(T.kiri, 'pen')];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    heading(g, 5, '運が入る前に採点する', prog(t, this.START, this.START + 0.8));   // sau thẻ hồi: tên + kicker không trùng lúc với thẻ

    // ── câu 73: cây 「枝を1本ずつ」 → rời phải; 12 bàn mini tự chơi ──
    const oT = out(t, T.kawari, 0.7);
    if (oT < 1) {
      g.save(); g.translate(1000 * oT, 0);
      const kt = prog(t, this.START + 0.3, T.keisan + 0.4);                 // cây vào SAU thẻ hồi — không hiện trước rồi bị thẻ che
      tree(g, this.TREE, 1090, 560, kt, { dx: 260, dy: 58, size: 200, meSize: 96 });
      telop(g, '枝を1本ずつ計算', 1090, 990, prog(t, T.ippon, T.keisan + 0.4), { size: 44 });
      g.restore();
    }
    const oM = out(t, T.l75 - 0.5, 0.7);
    if (t > T.kawari && oM < 1) {
      g.save(); g.translate(-1300 * oM, 0);
      const t0 = T.kikai + 0.3;
      this.RUNS.forEach((run, i) => {
        const r = Math.floor(i / 4), c = i % 4, kk = prog(t, T.kikai - 0.4 + i * 0.05, T.kikai + 0.2 + i * 0.05);
        const step = Math.max(0, Math.min(run.length - 1, Math.floor((t - t0) * 10))), st = run[step];
        board(g, t < t0 ? run[0].prev : st.cells, 96 + c * 200, 270 + r * 230, 170, kk, { numbers: false, legs: false, thick: 11, seed: i + 3 });
      });
      telop(g, '機械が', 1000, 340, prog(t, T.kikai, T.kikai + 0.4), { size: 44, color: '@dim' });
      telop(g, '何百万回も', 1000, 440, prog(t, T.man, T.man + 0.7), { size: 72 });
      telop(g, '自分で遊ぶ', 1000, 540, prog(t, T.jibun, T.asobu + 0.4), { size: 56 });
      telop(g, 'どんな盤が「良い盤」か', 1000, 720, prog(t, T.donna, T.ban2 + 0.5), { size: 52 });
      telop(g, '自分で見つける', 1000, 820, prog(t, T.mitsuke - 0.2, T.mitsuke + 0.6), { size: 52 });
      g.restore();
    }

    // ── câu 75–77: dải ba bàn ──
    if (t > T.l75 - 0.6) {
      telop(g, '鍵は　採点するタイミング', 1824, 150, prog(t, T.kagi, T.timing + 0.4), { size: 48, align: 'right' });
      // B0: bàn trước khi vuốt
      board(g, B0, XS[0], Y, S, prog(t, T.l75 - 0.4, T.l75 + 0.6), { seed: 21 });
      telop(g, '盤', XS[0] + S / 2, 790, prog(t, T.l75 + 0.2, T.l75 + 0.6), { size: 40, align: 'center', color: '@dim' });
      // B2: quân mới đã rơi (cái SAI để chấm)
      board(g, B1, XS[2], Y, S, prog(t, T.atara - 0.2, T.atara + 0.5), { seed: 23 });
      if (t > T.ochita - 0.1) { const G2 = ban(g, XS[2], Y, S, 0, {}); koma(g, SP.v, ...G2.ctr(...SP.at), G2.cs, prog(t, T.ochita, T.ochita + 0.45), { luck: true, seed: 99 }); }
      luck(g, '新しいタイル', XS[2] + S / 2, 790, prog(t, T.atara, T.ochita + 0.3), { size: 40, align: 'center' });
      // B1: スワイプ直後 = afterstate; ô trống 浅葱 = chỗ 運 sắp rơi
      const kIn = prog(t, T.swipe - 0.5, T.swipe), hl = t > T.un ? E1 : null;
      if (t < T.swipe + 0.1) board(g, B0, XS[1], Y, S, kIn, { seed: 22 });
      else boardMove(g, B0, 'R', XS[1], Y, S, prog(t, T.swipe + 0.1, T.swipe + 1.0), { seed: 22, hl });
      arrow(g, XS[0] + S + 30, Y + S / 2, XS[1] - 30, Y + S / 2, prog(t, T.swipe - 0.3, T.swipe + 0.3), { w: 6, color: C.gofunDim });
      // B1 → B2: 運 (đồng xu)
      arrow(g, XS[1] + S + 30, Y + S / 2, XS[2] - 30, Y + S / 2, prog(t, T.ochita - 0.3, T.ochita + 0.3), { w: 6, color: C.gofunDim });
      coin(g, (XS[1] + S + XS[2]) / 2, Y + S / 2 - 70, 34, prog(t, T.ochita - 0.2, T.ochita + 0.3), { spin: Math.max(0, 1 - prog(t, T.ochita, T.ochita + 0.9)) * 6 });
      // 「ここで採点」 + 判子 評価 trên B1, TRƯỚC khi quân mới rơi
      telop(g, 'ここで採点', XS[1] + S / 2, 290, prog(t, T.mae, T.saiten2 + 0.2), { size: 44, align: 'center' });
      stamp(g, '評価', XS[1] + S + 12, Y - 4, prog(t, T.saiten2, T.saiten2 + 0.6), { size: 40 });
      // chú thích dưới B1: 「落ちたあと」 gạch, 「スワイプ直後」 ngay dưới → trượt xuống ở câu 77
      const oC = out(t, T.l77 - 0.1, 0.6);
      if (oC < 1) {
        g.save(); g.translate(0, 300 * oC);
        const bx = wrong(g, 'タイルが落ちたあと', XS[1] + S / 2, 830, prog(t, T.ochita, T.ochita + 0.6), { size: 40, align: 'center' });
        strikeInk(g, bx.x - 8, bx.y + bx.h * 0.45, bx.x + bx.w + 8, bx.y + bx.h * 0.42, prog(t, T.naku, T.naku + 0.4));
        telop(g, 'スワイプした直後', XS[1] + S / 2, 910, prog(t, T.chokugo - 0.3, T.chokugo + 0.5), { size: 48, align: 'center' });
        luck(g, '運が入る前', XS[1] + S / 2, 980, prog(t, T.un, T.mae + 0.3), { size: 40, align: 'center' });
        g.restore();
      }
      // câu 77: 自分で決めた | 運で決まる — vạch cắt sau B1
      const kL = prog(t, T.l77 + 0.2, T.kimeta + 0.4), kR = prog(t, T.un2 - 0.1, T.kimaru + 0.4);
      brush(g, [[XS[0], 850], [XS[1] + S, 850]], kL, { w: 3, color: C.goldLt });
      telop(g, '自分で決めた', (XS[0] + XS[1] + S) / 2, 940, prog(t, T.l77 + 0.6, T.kimeta + 0.5), { size: 52, align: 'center' });
      brush(g, [[XS[2], 850], [XS[2] + S, 850]], kR, { w: 3, color: C.goldLt });
      luck(g, '運で決まる', XS[2] + S / 2, 940, prog(t, T.un2, T.kimaru + 0.5), { size: 52, align: 'center' });
      brush(g, [[1280, 600], [1276, 790], [1282, 1000]], prog(t, T.kiri, T.kiri + 0.5), { w: 8, color: C.gofun });
    }
    actCard(g, t, this.FROM, this.START, 5);
  }
}
