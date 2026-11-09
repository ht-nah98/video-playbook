// h1 · まとめ (p2 câu 102–106). DNA h1 (盤上): thẻ hồi「第七幕 まとめ」; 投了図 = bàn cuối (rắn 16 quân 4,4,8…65536,
// đúng khung lab 0) bên trái; 「縦に4マス、横に4マス · ルールは2つ」 dưới bàn;
//  câu 103: ba tờ 棋譜 thu nhỏ — 保存則 (2 + 2 = 4) · 等比数列 (bậc thang quân) · 確率の木 (bàn → nút 運 → chấm);
//  câu 104–106: ba 短冊 ①②③ của a0 (vẽ đúng như a0: x 980 + 270i, y 150, 124 × 700, chữ 44) hạ xuống, lần lượt lật ra
//  câu trả lời 「約1000手、運を相手に」 · 「131072が限界」 (+ mũi vàng rắn trên bàn, 判子「限界」) · 「平均で読み、自分で学ぶ」.
import { C, MIN, clamp, prog, lookup, must, outCubic, ground, board, koma, kifu, tanzaku, tree, coin, write, telop, brush, stamp,
  actCard, actCue, snake, LADDER, SNAKE } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const QS = ['なぜ負けるのか', 'どこまで大きくできるのか', 'どうやって運と戦うのか'];          // đúng chữ a0
const AS = ['約1000手、運を相手に', '131072が限界', '平均で読み、自分で学ぶ'];
const FINAL = snake(LADDER);                                          // 投了図: rắn 16 quân, khung lab 0
const CHEV = SNAKE.slice(0, 15).map((_, i) => [SNAKE[15 - i], SNAKE[14 - i]]);   // như a0 ⑧: gộp chảy về góc
const MINI = [[64, 32, 16, 8], [2, 4, 8, 4], [0, 2, 0, 0], [0, 0, 0, 0]];          // bàn gốc của cây (mini, không số)
const TZ = i => 980 + i * 270;                                        // tâm 短冊 (a0)

export default class Matome {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1');
    this.T = {
      tate: w(102, '縦'), yoko: w(102, '横'), rule: w(102, 'ルール'), futa: w(102, '2つ'),
      kazu: w(103, '数'), kienai: w(103, '消えない'), hozon: w(103, '保存則'), kabe: w(103, '壁'), touhi: w(103, '等比'), suuretsu: w(103, '数列'),
      comp: w(103, 'コンピュータ'), shirabe: w(103, '調べ'), kakuritsu: w(103, '確率'), ki: w(103, '木'), kakure: w(103, '隠れて'),
      l104: L(104).start, naze: w(104, 'なぜ'), n2048: w(104, '2048'), un1: w(104, '運'), te1000: w(104, '1000手'), handan: w(104, '判断'),
      l105: L(105).start, m16: w(105, '16'), kaidan: w(105, '階段'), max: w(105, '131072'), genkai: w(105, '限界'),
      l106: L(106).start, un3: w(106, '運'), heikin: w(106, '平均'), saiten: w(106, '採点'), manabu: w(106, '学びます'), end: L(106).end,
    };
    this.START = L(102).start;
    this.FROM = Math.max(this.START - 2.6, L(101).end + 0.5);         // mở hồi 7, sau g2 (kết câu 101)
    const T = this.T;
    // lật: bắt đầu → xong; chữ mặt sau viết từ khi lật xong tới hết ý
    this.FLIP = [[T.n2048, T.handan + 0.3], [T.max, T.genkai + 0.3], [T.heikin - 0.2, T.manabu + 0.3]];
    this.ACT = [T.naze, T.l105, T.l106];                              // câu hỏi đang đọc (vạch vàng dưới 短冊)
    // số trên hình (trạng thái đã xong)
    must(`[${LADDER}].reduce((a, b) => a + b, 0)`, 131072);
    must(`JSON.stringify(${JSON.stringify(FINAL[0])})`, '[65536,32768,16384,8192]');
    must('2 + 2', 4);
    must('Math.round(1018 / 100) * 100', 1000);                        // 2048 ≈ 1018 lượt đo được → 約1000手 (CONTENT)
    must('2 * 4 === 8 && 2 * 8 === 16 && 2 * 16 === 32', true);        // bậc thang thu nhỏ 4·8·16·32 là 等比数列
    this.TREE = { type: 'board', cells: MINI, children: [0, 1].map(() => ({ type: 'luck', children: [0, 1, 2].map(() => ({ type: 'dot' })) })) };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      actCue(this.FROM, this.START),
      c(T.tate, 'pen'), c(T.rule, 'pen'),
      c(T.kienai, 'chip'), c(T.touhi, 'pen'), c(T.kakuritsu, 'coin'),          // 3 tờ 棋譜 nhỏ: tiếng ở vật/chữ chính, không page
      c(T.naze - 0.1, 'tick'), c(T.n2048, 'page'), c(T.un1, 'coin'), c(T.handan, 'pen'),   // page = lật 短冊 (một mỗi tờ)
      c(T.l105, 'tick'), c(T.m16, 'tick'), c(T.max, 'page'), c(T.genkai + 0.3, 'hanko'),
      c(T.un3, 'coin'), c(T.heikin - 0.2, 'page'), c(T.saiten, 'pen'), c(T.manabu, 'correct'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── 投了図: bàn cuối (vật xuyên suốt) — mũi vàng rắn ở 「16マスの階段」 ──
    const G = board(g, FINAL, 96, 150, 560, prog(t, this.FROM + 0.3, this.FROM + 1.0), { chev: CHEV, kChev: prog(t, T.m16, T.kaidan + 0.6) });
    telop(g, '投了図', 96, 112, prog(t, this.FROM + 0.5, this.FROM + 1.0), { size: 32, color: '@dim' });
    telop(g, '縦に4マス、横に4マス', 96, 870, prog(t, T.tate, T.yoko + 0.6), { size: 44 });
    telop(g, 'ルールは2つ', 96, 950, prog(t, T.rule, T.futa + 0.35), { size: 44, color: '@dim' });

    // ── câu 103: ba tờ 棋譜 thu nhỏ → rời sang phải trước khi 短冊 hạ ──
    const oC = out(t, T.l104 - 0.9, 0.6);
    if (t > T.kazu - 0.4 && oC < 1) {
      g.save(); g.translate(1300 * oC, 0);
      const P = { on: 'paper', align: 'center' }, lab = (s, x, y, k, size, col = '@ink') => write(g, s, x, y, k, { font: `700 ${size}px ${MIN}`, color: col, ...P });
      kifu(g, 720, 190, 348, 560, prog(t, T.kazu - 0.2, T.kazu + 0.4), { seed: 11, content: X => {
        const cx = X.x + X.w / 2;
        koma(g, 2, cx - 84, X.y + 140, 90, prog(t, T.kazu + 0.2, T.kazu + 0.6), { seed: 3 });
        lab('+', cx, X.y + 158, prog(t, T.kazu + 0.4, T.kazu + 0.6), 44);
        koma(g, 2, cx + 84, X.y + 140, 90, prog(t, T.kazu + 0.4, T.kazu + 0.8), { seed: 5 });
        lab('=', cx - 70, X.y + 300, prog(t, T.kienai - 0.2, T.kienai), 44);
        koma(g, 4, cx + 30, X.y + 284, 104, prog(t, T.kienai, T.kienai + 0.45), { seed: 7 });
        lab('数が消えない', cx, X.y + 430, prog(t, T.kienai, T.hozon), 36, '@dim');
        lab('保存則', cx, X.y + 510, prog(t, T.hozon, T.hozon + 0.5), 52);
      } });
      kifu(g, 1098, 190, 348, 560, prog(t, T.kabe - 0.2, T.kabe + 0.4), { seed: 12, content: X => {
        [4, 8, 16, 32].forEach((v, i) => koma(g, v, X.x + 70 + i * 70, X.y + 330 - i * 52, 66, prog(t, T.kabe + 0.2 + i * 0.15, T.kabe + 0.6 + i * 0.15), { seed: 20 + i }));
        lab('壁をつくる', X.x + X.w / 2, X.y + 430, prog(t, T.kabe, T.touhi), 36, '@dim');
        lab('等比数列', X.x + X.w / 2, X.y + 510, prog(t, T.touhi, T.suuretsu + 0.4), 52);
      } });
      kifu(g, 1476, 190, 348, 560, prog(t, T.comp - 0.2, T.comp + 0.4), { seed: 13, content: X => {
        tree(g, this.TREE, X.x + 74, X.y + 220, Math.max(prog(t, T.comp + 0.2, T.comp + 0.6) / 3, prog(t, T.kakuritsu - 0.3, T.ki + 0.3)), { dx: 112, dy: 40, size: 96 });
        lab('調べきれない', X.x + X.w / 2, X.y + 430, prog(t, T.shirabe, T.kakuritsu), 36, '@dim');
        lab('確率の木', X.x + X.w / 2, X.y + 510, prog(t, T.kakuritsu, T.ki + 0.4), 52);
      } });
      g.restore();
    }

    // ── câu 104–106: ba 短冊 của a0 hạ xuống, lật ra câu trả lời ──
    if (t > T.l104 - 0.9) {
      QS.forEach((s, i) => {
        const [f0, f1] = this.FLIP[i];
        // hạ nhanh, so le ngắn: ③ nằm yên từ l104 + 0.2 (đung đưa không kéo 短冊 lên sát mép trên lúc đang đọc)
        tanzaku(g, TZ(i), 150, 124, 700, prog(t, T.l104 - 0.8 + i * 0.15, T.l104 - 0.1 + i * 0.15),
          { n: i + 1, text: s, kText: 1, back: AS[i], flip: prog(t, f0, f0 + 0.6), kBack: prog(t, f0 + 0.45, f1), size: 44, seed: i + 2 });
        // vạch vàng dưới 短冊 đang được đọc; rút lại khi sang câu sau
        const a = this.ACT[i], b = i < 2 ? this.ACT[i + 1] : Infinity, kin = prog(t, a, a + 0.5), kout = b === Infinity ? 0 : prog(t, b - 0.3, b);
        if (kin > 0 && kout < 1) brush(g, [[TZ(i) - 56 + 112 * kout, 892], [TZ(i) + 56, 892]], kin, { w: 5, color: C.goldLt });
      });
      stamp(g, '限界', TZ(1), 760, prog(t, T.genkai + 0.3, T.genkai + 0.8), { size: 40 });
      // 運 = đồng xu 浅葱 (câu 104 lần đầu, câu 106 quay lại)
      coin(g, 800, 640, 44, prog(t, T.un1, T.un1 + 0.4), { spin: Math.max(0, 1 - prog(t, T.un1, T.un1 + 0.9)) * 6 + Math.max(0, 1 - prog(t, T.un3, T.un3 + 0.9)) * 6 * (t > T.un3 ? 1 : 0) });
    }
    actCard(g, t, this.FROM, this.START, 7);
  }
}
