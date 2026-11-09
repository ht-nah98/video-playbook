// g2 · 最後の1枚 (p2, câu 95–101). DNA g2 (盤上): bàn chật hai lỗ (B sáng mờ) → quân mới rơi vào A → 詰み (khung xích, mờ);
//  bàn cuối = bậc thang LADDER kín 15 quân + một lỗ (tính bằng code); 「枚数が増えるのは新しいタイルだけ」 (kiểm bằng slide/spawn);
//  lỗ cuối 浅葱 + đồng xu; 「2」 gạch → 「4」; quân 4 浅葱 rơi (spawn hash, v = 4) + taiko; 6万手近く · 10分の1 · 一発勝負 (mascot ok nói).
import { W, H, C, MIN, clamp, prog, lookup, must, outCubic, smooth, ground, board, boardMove, koma, coin, chevrons,
  telop, answer, luck, wrong, strikeInk, figure, slide, spawn, snake, copy, LADDER, SNAKE, MEAN } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const count = c => c.flat().filter(v => v).length;
const stuck = c => count(c) === 16 && [...'UDLR'].every(d => !slide(c, d).moved);
const put = (c, [r, q], v) => { const o = copy(c); o[r][q] = v; return o; };
const hole1 = c => c.flatMap((row, r) => row.map((v, q) => v ? null : [r, q])).filter(Boolean)[0];
// 詰み (nghĩa cờ: mọi nước đều thua): 15 quân, mọi nước còn đi được đều KHÔNG gộp, và quân mới (2 hay 4) rơi vào lỗ còn lại → kín, hết nước
const tsumi = c => count(c) === 15 && [...'UDLR'].every(d => { const s = slide(c, d); if (!s.moved) return true; if (s.merges.length) return false;
  return [2, 4].every(v => stuck(put(s.cells, hole1(s.cells), v))); });

// ① bàn chật: rắn gần xong, HAI ô trống — rơi vào A [3,1] (cạnh 16) thì 詰み, rơi vào B [3,0] vẫn còn nước (kiểm trong init)
const X0 = [[32768, 16384, 8192, 4096], [256, 512, 1024, 2048], [128, 64, 32, 16], [0, 0, 16, 8]];
const HA = [3, 1], HB = [3, 0];
const SP0 = (() => { for (let i = 1; i < 200; i++) { const s = spawn(X0, 5000 + i); if (`${s.at}` === `${HA}`) return s; } throw new Error('g2: không có quân rơi vào ô A'); })();
// ② bàn cuối: bậc thang 16 ô (4,4,8…65536) bỏ một quân 4 ở cuối rắn → 15 quân + lỗ SNAKE[15]
const FULL = snake(LADDER), HOLE = SNAKE[15], LAD15 = copy(FULL); LAD15[HOLE[0]][HOLE[1]] = 0;
const SP4 = (() => { for (let i = 1; i < 400; i++) { const s = spawn(LAD15, 7000 + i); if (s.v === 4) return s; } throw new Error('g2: không có quân 4'); })();
// ví dụ đếm quân: gộp −1, trượt ±0, quân mới +1 (luật thật)
const EXM = [[2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], EXS = [[0, 2, 0, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const BX = 1040, BY = 110, BS = 740;
// khung xích 詰み: mắt xích bầu dục dọc chu vi, lộ dần theo k
function chain(g, x, y, w, h, k) {
  if (k <= 0) return;
  const per = 2 * (w + h), n = Math.floor(per / 34), m = Math.round(n * clamp(k));
  g.save(); g.strokeStyle = C.gofunDim; g.lineWidth = 5; g.globalAlpha = 0.85;
  for (let i = 0; i < m; i++) {
    let d = i * per / n, px, py, an;
    if (d < w) { px = x + d; py = y; an = 0; } else if ((d -= w) < h) { px = x + w; py = y + d; an = Math.PI / 2; }
    else if ((d -= h) < w) { px = x + w - d; py = y + h; an = 0; } else { d -= w; px = x; py = y + h - d; an = Math.PI / 2; }
    g.save(); g.translate(px, py); g.rotate(an + (i % 2 ? Math.PI / 2 : 0)); g.beginPath(); g.ellipse(0, 0, i % 2 ? 9 : 22, i % 2 ? 22 : 9, 0, 0, 2 * Math.PI); g.stroke(); g.restore();
  }
  g.restore();
}

export default class Saigo {
  static ERA = 'banjo';
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      shuban: w(95, '終盤'), kaidan: w(95, '階段'), shimete: w(95, '占めて'), aki: w(95, '空きマス'), futa: w(95, '2つ'), nokori: w(95, '残りません'),
      mazui: w(96, 'まずい'), ichi: w(96, '1枚'), ochiru: w(96, '落ちる'), ugoka: w(96, '動かなく'), e96: E(96),
      l97: S(97), ano: w(97, 'あの'), kabe: w(97, '壁'), m16: w(97, '16'), choudo: w(97, 'ちょうど'), tsuku: w(97, 'つくします'),
      maisuu: w(98, '枚数'), fueru: w(98, '増える'), atara: w(98, '新しい'), dake: w(98, 'だけ'),
      m16b: w(99, '16枚目'), kanara: w(99, '必ず'), ochite: w(99, '落ちて'), bakari: w(99, 'ばかり'),
      l100: S(100), kaidan100: w(100, '階段'), two: w(100, '2'), arimasen: w(100, 'ありません'), sono: w(100, 'その'), four: w(100, '4'), nara: w(100, 'なりません'),
      l101: S(101), tsumari: w(101, 'つまり'), v131: w(101, '131072'), mezasu: w(101, '目指すなら'), man6: w(101, '6万手'), misu: w(101, 'ミス'), saigo: w(101, '最後'),
      j1: w(101, '10分の1'), ippatsu: w(101, '一発'), katsu: w(101, '勝つ'), end: E(101),
    };
    this.START = S(95);
    this.FROM = Math.max(this.START - 1.2, E(94) + 0.5);
    // số / luật trên hình (must ở trạng thái đã xong)
    must(`${count(X0)}`, 14); must(`'${SP0.at}'`, '3,1'); must(`${tsumi(SP0.cells)}`, true);
    must(`${[2, 4].every(v => tsumi(put(X0, HA, v)))}`, true); must(`${[2, 4].some(v => tsumi(put(X0, HB, v)))}`, false);   // A: 詰み · B: còn nước
    must(`${count(LAD15)}`, 15); must(`'${HOLE}'`, '3,0'); must(`'${SP4.at}'`, '3,0'); must(`${SP4.v}`, 4);
    must(`${LAD15.flat().reduce((a, b) => a + b, 0)} + ${SP4.v}`, 131072);
    must(`${LAD15.flat().filter(v => v === 2).length}`, 0);                                  // 階段の中に 2 は 0 枚
    must(`${count(slide(EXM, 'L').cells)} - ${count(EXM)}`, -1);                               // 合体 → 1枚へる
    must(`${count(slide(EXS, 'L').cells)} - ${count(EXS)}`, 0);                                // すべる → 変わらない
    must(`${count(spawn(EXS, 3).cells)} - ${count(EXS)}`, 1);                                  // 新しいタイル → 1枚ふえる
    must(`Math.round(131072 / ${MEAN} / 10000)`, 6); must(`131072 / ${MEAN} < 60000`, true);  // 6万手近く
    must('Math.round((1 - 0.9) * 10) / 10', 0.1);                                              // 10分の1
    this.CHEV = SNAKE.slice(0, 15).map((_, i) => [SNAKE[15 - i], SNAKE[14 - i]]);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.shuban, 'pen'), c(T.kaidan, 'koma'), c(T.aki, 'tick'), c(T.nokori, 'pen'), c(T.mazui, 'pen'), c(T.ochiru - 0.15, 'coin'), c(T.ugoka, 'error'),
      c(T.l97 + 0.9, 'koma'), c(T.m16, 'pen'), c(T.choudo, 'tick'),
      c(T.maisuu, 'pen'), c(T.atara, 'pen'),
      c(T.m16b, 'pen'), c(T.ochite, 'coin'),
      c(T.kaidan100, 'pen'), c(T.arimasen + 0.3, 'pen'), c(T.sono, 'error'), c(T.four, 'taiko'),
      c(T.v131, 'pen'), c(T.man6, 'pen'), c(T.j1, 'pen'), c(T.katsu, 'snap'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── ① bàn chật → quân rơi → 詰み (câu 95–96) → bàn rời xuống ở câu 97 ──
    const oA = out(t, T.l97, 0.6);
    if (oA < 1) {
      g.save(); g.translate(0, 1000 * oA);
      const kSp = prog(t, T.ochiru - 0.15, T.ochiru + 0.35), kD = prog(t, T.ugoka, T.ugoka + 0.6);
      const hl = prog(t, T.aki, T.aki + 0.2) > 0 && kSp <= 0 ? [HA, HB] : null;
      const all = SP0.cells.flatMap((row, r) => row.map((_, c) => [r, c]));
      const G = board(g, X0, BX, BY, BS, prog(t, this.FROM + 0.3, this.FROM + 1.3), { seed: 4, hl, dim: kD > 0.5 ? all : [] });
      // ô B (chỗ còn nước) sáng mờ một nhịp ngay trước khi quân rơi vào A
      const kGl = Math.min(prog(t, T.ochiru - 1.0, T.ochiru - 0.7), 1 - prog(t, T.ochiru - 0.3, T.ochiru + 0.2));
      if (kGl > 0) { const [bx, by] = G.ctr(...HB); g.save(); g.globalAlpha = 0.95 * kGl; g.strokeStyle = C.goldLt; g.lineWidth = 7;
        g.strokeRect(bx - G.cs * 0.42, by - G.cs * 0.42, G.cs * 0.84, G.cs * 0.84); g.globalAlpha = 0.32 * kGl; g.fillStyle = C.goldLt;
        g.fillRect(bx - G.cs * 0.42, by - G.cs * 0.42, G.cs * 0.84, G.cs * 0.84); g.restore(); }
      koma(g, SP0.v, ...G.ctr(...SP0.at), G.cs, kSp, { luck: kD < 0.5, dim: kD > 0.5 ? 1 : 0, seed: 99 });
      chain(g, BX - 14, BY - 14, BS + 28, BS + 28, kD);
      g.restore();
    }
    const oL1 = out(t, T.l97 - 0.1, 0.6);
    if (oL1 < 1) {
      g.save(); g.translate(-1100 * oL1, 0);
      telop(g, '終盤', 96, 230, prog(t, T.shuban, T.shuban + 0.5), { size: 72 });
      telop(g, '階段が16マスを占める', 96, 330, prog(t, T.kaidan, T.shimete + 0.4), { size: 44, color: '@dim' });
      telop(g, '空きマスは 1つか2つ', 96, 440, prog(t, T.aki, T.futa + 0.4), { size: 52 });
      luck(g, 'まずい場所に1枚', 96, 600, prog(t, T.mazui, T.ichi + 0.4), { size: 48 });
      telop(g, '詰み', 96, 790, prog(t, T.ugoka + 0.6, T.ugoka + 1.0), { size: 120 });
      telop(g, '盤は動かない', 96, 880, prog(t, T.ugoka + 0.9, T.e96 + 0.3), { size: 40, color: '@dim' });
      g.restore();
    }

    // ── ② bàn cuối: bậc thang 15 quân + lỗ (câu 97–101) ──
    if (t > T.l97 + 0.2) {
      const kB = prog(t, T.l97 + 0.3, T.l97 + 1.9), kHl = prog(t, T.m16b, T.m16b + 0.3), k4 = prog(t, T.four, T.four + 0.5);
      const G = board(g, LAD15, BX, BY, BS, kB, { seed: 6, hl: kHl > 0 && k4 <= 0 ? HOLE : null, chev: this.CHEV, kChev: prog(t, T.katsu - 0.3, T.katsu + 1.2) });
      koma(g, SP4.v, ...G.ctr(...SP4.at), G.cs, k4, { luck: true, seed: 99 });
      const kc = prog(t, T.ochite, T.ochite + 0.5) * (1 - prog(t, T.four - 0.4, T.four));
      if (kc > 0) { const [hx, hy] = G.ctr(...HOLE); coin(g, BX - 60, hy, 40, kc, { spin: Math.max(0, 1 - prog(t, T.ochite, T.ochite + 1.0)) * 6 }); }
    }
    const oL2 = out(t, T.l101 - 0.3, 0.6);
    if (t > T.l97 - 0.3 && oL2 < 1) {
      g.save(); g.translate(-1100 * oL2, 0);
      telop(g, 'もう一度、あの壁', 96, 200, prog(t, T.ano - 0.1, T.kabe + 0.6), { size: 40, color: '@dim' });
      telop(g, '16マスを ちょうど埋めつくす', 96, 300, prog(t, T.m16, T.tsuku + 0.3), { size: 52 });
      const oR = out(t, T.l100 - 0.6, 0.6);
      g.save(); g.translate(-1100 * oR, 0);
      telop(g, '枚数が増えるのは？', 96, 430, prog(t, T.maisuu, T.fueru + 0.3), { size: 44 });
      telop(g, '合体すると　1枚へる', 136, 520, prog(t, T.fueru + 0.3, T.fueru + 0.9), { size: 40, color: '@dim' });
      telop(g, 'すべっても　変わらない', 136, 600, prog(t, T.fueru + 1.0, T.fueru + 1.6), { size: 40, color: '@dim' });
      luck(g, '新しいタイルで　1枚ふえる', 136, 680, prog(t, T.atara, T.dake + 0.3), { size: 44 });
      g.restore();
      luck(g, [['16枚目', `700 56px ${MIN}`], ['　＝　いま落ちてきた1枚', `700 40px ${MIN}`]], 96, 820, prog(t, T.m16b, T.bakari + 0.4), { size: 56 });
      // câu 100: 「2」 gạch → 「4」 ngay dưới, cạnh lỗ cuối
      telop(g, [['階段の中に ', `700 44px ${MIN}`], ['2', `700 56px ${MIN}`], [' は1枚もない', `700 44px ${MIN}`]], 96, 470, prog(t, T.kaidan100, T.arimasen + 0.3), { size: 56 });
      const r2 = wrong(g, '2 ？', 136, 600, prog(t, T.arimasen + 0.3, T.arimasen + 0.6), { size: 84 });
      strikeInk(g, r2.x - 10, r2.y + r2.h * 0.48, r2.x + r2.w + 10, r2.y + r2.h * 0.48, prog(t, T.sono, T.sono + 0.4));
      answer(g, [['4', `700 96px ${MIN}`], [' でなければならない', `700 40px ${MIN}`]], 136, 730, prog(t, T.four, T.nara + 0.4), { size: 96 });
      g.restore();
    }

    // ── ③ つまり: 6万手近く · 10分の1 · 一発勝負, mascot ok (câu 101) ──
    if (t > T.tsumari - 0.3) {
      const X = 620;
      telop(g, '131072を目指すなら', X, 250, prog(t, T.tsumari, T.mezasu + 0.4), { size: 40, color: '@dim' });
      telop(g, '6万手近く', X, 360, prog(t, T.man6, T.man6 + 0.6), { size: 64 });
      telop(g, 'ミスなく進めても', X, 440, prog(t, T.misu, T.misu + 0.7), { size: 40, color: '@dim' });
      telop(g, '最後は', X, 580, prog(t, T.saigo, T.saigo + 0.4), { size: 44 });
      answer(g, '10分の1', X, 720, prog(t, T.j1, T.j1 + 0.6), { size: 96 });
      telop(g, 'の一発勝負', X, 840, prog(t, T.ippatsu - 0.3, T.ippatsu + 0.6), { size: 72 });
      figure(g, 'ok', 290, H, 720, prog(t, T.saigo - 0.3, T.saigo + 0.3), { t });
    }
  }
}
