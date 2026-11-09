// h2 · 次回 (p2 câu 107–111, hết video). DNA h2 (盤上): bàn 榧 bên trái, quân lớn nhất (512) ở góc trên-trái suốt cảnh;
//  107 quân 2048 rơi + 「今度、負けたら」 · 108 「1枚作るたびに」 + 運 (đồng xu 浅葱) + 算盤 đếm tới 約1000 · 109 đồng xu lớn,
//  「運は消せない」 → 「運を味方に」 · 110 vòng vàng quanh góc, vuốt ← thật (kit.boardMove: 512 không rời góc, quân mới 浅葱 rơi),
//  「角から動かさずに」 · 111 mọi thứ rời khung; biển 和紙 GIỮA khung 「99の発見」+「チャンネル登録」 đứng yên tới hết;
//  mascot `wave` (nói) bên phải.
import { W, H, C, MIN, clamp, prog, lookup, must, outCubic, ground, board, boardMove, koma, kifu, coin, soroban, write, telop, luck,
  brush, figure, slide, spawn } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
// bàn dồn góc (rắn từ góc trên-trái): vuốt ← giữ 512 ở góc, gộp 2 + 2 ở hàng 3
const CORNER = [[512, 256, 128, 64], [4, 8, 16, 32], [2, 0, 2, 0], [0, 0, 0, 2]];
const MOVE = slide(CORNER, 'L');
const BX = 120, BY = 170, BS = 520;
const PL = { x: 590, y: 300, w: 740, h: 440 };                         // biển kênh 和紙 giữa khung

export default class Next {
  static ERA = 'banjo';
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2');
    this.T = {
      kondo: w(107, '今度'), k2048: w(107, '2048'), maketara: w(107, '負けたら'), omoi: w(107, '思い出して'),
      l108: L(108).start, ichimai: w(108, '1枚'), tabi: w(108, 'たび'), un2: w(108, '運'), kai1000: w(108, '1000回'), handan: w(108, '判断'), kasane: w(108, '重ねて'),
      l109: L(109).start, un3: w(109, '運'), kesu: w(109, '消す'), dekimasen: w(109, 'できません'), suugaku: w(109, '数学'), mikata: w(109, '味方'), oshiete: w(109, '教えて'),
      l110: L(110).start, tsugi: w(110, '次'), ichiban: w(110, 'いちばん'), ookina: w(110, '大きな'), kado: w(110, '角'), ugoka: w(110, '動かさず'), ason: w(110, '遊んで'),
      l111: L(111).start, arigatou: w(111, 'ありがとう'), ch: w(111, 'チャンネル'), touroku: w(111, '登録'),
    };
    this.START = L(107).start;
    this.FROM = Math.max(this.START - 1.2, L(106).end + 0.5);
    const T = this.T;
    // vuốt ← thật: 512 vẫn ở góc, tổng bảo toàn (must trong slide), quân mới bằng spawn(hash)
    this.SP = spawn(MOVE.cells, 31);
    must(`${MOVE.moved} && ${MOVE.cells[0][0]} === 512 && ${Math.max(...MOVE.cells.flat())} === 512`, true);
    must(`${MOVE.merges.length} === 1 && ${MOVE.merges[0].v} === 4`, true);
    must('Math.round(1018 / 100) * 100', 1000);                        // CONTENT: đo thật 1018 lượt → 約1000回
    this.MASCOT = [1640, 690];                                         // cx, h: tay vẫy (mép trái ảnh) ≈ x 1370 > biển (1330)
    must(`${this.MASCOT[0]} - 0.5 * 542 * ${this.MASCOT[1]} / (1440 * 0.45) + 13 * ${this.MASCOT[1]} / (1440 * 0.45) > ${PL.x + PL.w} + 20`, true);
    this.ON = T.l111 + 0.15;                                           // mascot trồi lên (≈ 8 s tới hết video)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.k2048, 'koma'), c(T.maketara, 'pen'), c(T.omoi, 'tick'), c(T.l108 + 0.1, 'koma'),   // koma: quân 2048 nhấc lên
      c(T.ichimai, 'pen'), c(T.un2, 'coin'), c(T.kai1000, 'soroban'),
      c(T.un3, 'coin'), c(T.suugaku, 'pen'), c(T.mikata, 'suzu'),
      c(T.tsugi, 'pen'), c(T.ugoka, 'koma'), c(T.ugoka + 0.7, 'coin'),
      c(T.l111, 'page'), c(T.arigatou, 'pen'), c(T.ch, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── bàn dồn góc (câu 107–110) → rời trái ở câu 111 ──
    const oB = out(t, T.l111 - 0.4, 0.7);
    if (oB < 1) {
      g.save(); g.translate(-900 * oB, 0);
      const mv = prog(t, T.ugoka, T.ugoka + 0.9);
      let G;
      if (t < T.ugoka) G = board(g, CORNER, BX, BY, BS, prog(t, this.FROM + 0.3, this.FROM + 1.0));
      else G = boardMove(g, CORNER, 'L', BX, BY, BS, mv, { spawn: { ...this.SP, k: prog(t, T.ugoka + 0.7, T.ugoka + 1.2) } }).G;
      // vòng vàng quanh quân lớn nhất ở góc (trung tính)
      const kr = prog(t, T.ookina, T.ookina + 0.7);
      if (kr > 0) {
        const [cx, cy] = G.ctr(0, 0), R = G.cs * 0.62;
        brush(g, Array.from({ length: 41 }, (_, i) => { const a = -2.2 + i / 40 * 2 * Math.PI * 1.04; return [cx + R * Math.cos(a), cy - 4 + R * Math.sin(a)]; }), kr, { w: 6, color: C.goldLt });
      }
      g.restore();
    }

    // ── 107–108: 2048 · 1枚作るたびに · 運 · 約1000回 → rời phải trước câu 109 ──
    const o1 = out(t, T.l109 - 0.5);
    if (o1 < 1) {
      g.save(); g.translate(1200 * o1, 0);
      koma(g, 2048, 880, 330, 180, prog(t, T.k2048, T.k2048 + 0.5), { seed: 8, lift: 0.6 * prog(t, T.l108, T.l108 + 0.5) });
      telop(g, '今度、負けたら', 1020, 300, prog(t, T.maketara, T.maketara + 0.7), { size: 56 });
      telop(g, '思い出してください', 1020, 380, prog(t, T.omoi, T.omoi + 0.7), { size: 40, color: '@dim' });
      telop(g, '1枚作るたびに', 1020, 490, prog(t, T.ichimai, T.tabi + 0.3), { size: 44 });
      coin(g, 1060, 572, 34, prog(t, T.un2, T.un2 + 0.4), { spin: (1 - prog(t, T.un2, T.un2 + 0.9)) * 6 });
      luck(g, '運を相手に', 1112, 588, prog(t, T.un2, T.un2 + 0.6), { size: 44 });
      const kc = prog(t, T.kai1000 - 0.1, T.kai1000 + 1.0), n = Math.round(1000 * outCubic(kc));
      soroban(g, 780, 660, n, prog(t, T.kai1000 - 0.4, T.kai1000), { cols: 4, rod: 56 });
      if (kc >= 1) must(`${n}`, 1000);
      telop(g, [['約1000回', `700 60px ${MIN}`], ['の判断', `700 44px ${MIN}`]], 1100, 780, prog(t, T.kai1000, T.handan + 0.4), { size: 60 });
      g.restore();
    }

    // ── 109: 運は消せない → 数学で 運を味方に → rời phải trước câu 110 ──
    const o2 = out(t, T.l110 - 0.5);
    if (t > T.l109 - 0.5 && o2 < 1) {
      g.save(); g.translate(1200 * o2, 0);
      coin(g, 900, 430, 96, prog(t, T.un3, T.un3 + 0.5), { spin: (1 - prog(t, T.un3, T.un3 + 1.0)) * 8 });
      telop(g, '運は消せない', 1060, 450, prog(t, T.kesu, T.dekimasen + 0.5), { size: 64 });
      telop(g, 'でも、数学は', 1060, 600, prog(t, T.suugaku - 0.2, T.suugaku + 0.5), { size: 44, color: '@dim' });
      telop(g, [['運', `700 72px ${MIN}`, '@luck'], ['を味方に', `700 72px ${MIN}`]], 1060, 720, prog(t, T.mikata - 0.3, T.mikata + 0.5), { size: 72 });
      brush(g, [[1060, 752], [1060 + 360, 756]], prog(t, T.oshiete, T.oshiete + 0.5), { w: 4, color: C.goldLt });
      g.restore();
    }

    // ── 110: 次の1回は · いちばん大きなタイルを · 角から動かさずに → rời phải ở câu 111 ──
    const o3 = out(t, T.l111 - 0.4);
    if (t > T.l110 - 0.5 && o3 < 1) {
      g.save(); g.translate(1200 * o3, 0);
      telop(g, '次の1回は', 760, 270, prog(t, T.tsugi, T.tsugi + 0.6), { size: 44, color: '@dim' });
      telop(g, 'いちばん大きなタイルを', 760, 370, prog(t, T.ichiban, T.ookina + 0.5), { size: 48 });
      telop(g, '角から動かさずに', 760, 500, prog(t, T.kado - 0.1, T.ugoka + 0.5), { size: 76 });
      telop(g, '遊んでみてください', 760, 610, prog(t, T.ason, T.ason + 0.7), { size: 44, color: '@dim' });
      g.restore();
    }

    // ── 111: biển kênh GIỮA khung (đứng yên tới hết) + mascot wave (nói) ──
    if (t > T.l111 - 0.2) {
      kifu(g, PL.x, PL.y, PL.w, PL.h, prog(t, T.l111, T.l111 + 0.6), { seed: 9, content: X => {
        const cx = W / 2, P = { on: 'paper', align: 'center' };
        write(g, '99の発見', cx, X.y + 220, prog(t, T.arigatou, T.arigatou + 0.8), { font: `700 120px ${MIN}`, ls: 6, ...P });
        brush(g, [[cx - 220, X.y + 272], [cx + 220, X.y + 272]], prog(t, T.arigatou + 0.6, T.ch), { w: 2.5, color: C.sumi, alpha: 0.6 });
        write(g, 'チャンネル登録', cx, X.y + 360, prog(t, T.ch, T.touroku + 0.4), { font: `700 60px ${MIN}`, ls: 4, ...P });
      } });
      figure(g, 'wave', this.MASCOT[0], H, this.MASCOT[1], prog(t, this.ON, this.ON + 0.5), { t });
    }
  }
}
