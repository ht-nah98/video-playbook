// a0 · Cold open (p1, câu 0–22). DNA a0 (盤上): bàn 榧 trống trên chiếu, nắng xiên — vật xuyên suốt đi qua tám chặng:
//  ⓪ (gói 2026-10-19, PACKAGING §4: khung 0.5 s = thumbnail) 「1時間」|「1000時間」 hai bàn chơi THẬT: trái bấm bừa thua 4 ván
//     (kit.play), phải chơi kiểu người giỏi (rắn về góc, data/opening.mjs) tới 2048 đúng chữ 「2048」 câu 2 · 指の速さ (gạch) →
//     並べ方 (朱) → 「並べ方の裏に、数学」
//  ① 「縦に4マス、横に4マス」 kẻ đường mực, hai luật bằng quân thật (vuốt ← trượt; 2 + 2 → 4; quân mới 浅葱 rơi)
//  ② 2014 · 19歳 · ガブリエレ・チルリ trên tờ 棋譜 (chỉ chữ, không ảnh) · 「1週間 / 400万人」 · bàn thu nhỏ bên trái
//  ③ (bỏ 2026-10-19 — スリーズ / 1024 chỉ còn ở mô tả: bối cảnh vừa đủ, PACKAGING §5)
//  ④ 12 bàn mini chạy bằng kit.play (bấm bừa thật, quân mới hash) · 「でたらめに 20万回」 · 1024 / 2048 bóng mờ 「0回」
//  ⑤ 「先を読んで考える機械」: cây 棋譜 (bàn → 4 hướng → nước sau) · 駒台 nhận 2048, 32768, 65536
//  ⑥ 131072 bóng mờ + nét 「壁」 · 4×4 の盤 · 答 131072 (朱) + 判子「最大」 · 「それより大きくは 決してならない」
//  ⑦ mục lục: ba 短冊 ①②③, mascot `point` nói · 運 = đồng xu 浅葱
//  ⑧ 「16マスの裏」: bàn trống giữa khung, mũi vàng rắn hiện trên đường kẻ → nắng tắt → đen (intro 漆と金 từ đen).
import { W, H, C, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, ground, dark, ban, board, boardMove, koma, komadai, kifu,
  tanzaku, coin, tree, chevrons, write, telop, answer, luck, stamp, brush, arrow, figure, slide, spawn, play, snake, strikeInk, LADDER, SNAKE } from '../kit.js';
import OPEN from '../data/opening.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
function track(t, keys) {                                             // [[giờ bắt đầu dời, [x, y, S]] …], dời trong 0.9 s
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, nv] = keys[i], e = smooth(clamp((t - t0) / 0.9));
    if (e <= 0) break;
    v = v.map((a, j) => a + (nv[j] - a) * e);
  }
  return v;
}
// vệt sáng lướt qua một quân (kỷ lục của máy) — ánh nắng, màu trung tính
function glint(g, cx, cy, s, k) {
  if (k <= 0 || k >= 1) return;
  const x = cx - s + 2 * s * k;
  g.save(); g.globalCompositeOperation = 'screen'; g.beginPath(); g.rect(cx - s * 0.45, cy - s * 0.5, s * 0.9, s * 0.95); g.clip();
  const gr = g.createLinearGradient(x - s * 0.25, 0, x + s * 0.25, 0); gr.addColorStop(0, 'rgba(255,240,200,0)'); gr.addColorStop(0.5, 'rgba(255,240,200,0.55)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
  g.fillStyle = gr; g.fillRect(x - s * 0.25, cy - s * 0.6, s * 0.5, s * 1.2); g.restore();
}

// ⓪ bố cục: hai bàn 560, nhãn trên, chữ dưới (y 960); s0 trái = s0 của data/opening.mjs
const BS = 560, LX = 250, RX = 1110, BY = 260, S0L = [[0, 0, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]], RATE = 12;
const ALL16 = Array.from({ length: 16 }, (_, i) => [i >> 2, i & 3]);
// bàn luật (①): A —← → B —↑ → C (2 + 2 = 4), quân mới hash(8) rơi vào [2, 2]
const A = [[0, 0, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 8, 0]];   // 8 (không phải 4): 4 mới gộp không nằm ngay trên một 4 khác
const B = slide(A, 'L').cells, CC = slide(B, 'U').cells, SP = spawn(CC, 8), D = SP.cells;
const B1024 = [[1024, 512, 64, 8], [2, 32, 16, 4], [0, 4, 2, 0], [0, 0, 0, 2]];
const QS = ['何が違うのか', 'どこまで大きくできるのか', 'どうやって運と戦うのか'];

export default class Open {
  static ERA = 'banjo';
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      h1: w(0, '1時間'), h1000: w(0, '1000時間'), chigau: w(0, '違います'), l1: S(1), umatte: w(1, '埋まって'),
      l2: S(2), kado: w(2, '角'), r2048: w(2, '2048'), l3: S(3), yubi: w(3, '指'), arimasen: w(3, 'ありません'), narabe: w(3, '並べ方です'),
      l4: S(4), sugaku: w(4, '数学'), e4: E(4),
      l5: S(5), tate: w(5, '縦'), yoko: w(5, '横'), rule: w(5, 'ルール'), futa: w(5, '2つ'),
      swipe: w(6, 'スワイプ'), subete: w(6, 'すべて'), subette: w(6, 'すべって'), e6: E(6),
      onaji: w(7, '同じ'), butsu: w(7, 'ぶつかる'), gattai: w(7, '合体'), goukei: w(7, '合計'),
      aite: w(8, '空いて'), atara: w(8, '新しい'), araware: w(8, 'あらわれます'), e8: E(8),
      l9: S(9), y2014: w(9, '2014年'), age: w(9, '19歳'), name: w(9, 'ガブリエレ・チルリ'), shuu: w(9, '週末'), tsuku: w(9, '作り'),
      week: w(9, '1週間'), man: w(9, '400万人'), koe5: w(9, '超える'), otozu: w(9, '訪れました'),
      l10: S(10), detara: w(10, 'でたらめ'), man20: w(10, '20万回'), play: w(10, 'プレイ'), jikken: w(10, '実験'),
      t1024: w(11, '1024'), tadori: w(11, 'たどり着いた'), ikkai: w(11, '1回'),
      t2048: w(12, '2048'), iu: w(12, '言う'),
      l13: S(13), saki: w(13, '先'), yonde: w(13, '読んで'), kangae: w(13, '考える'),
      kikai11: w(14, '機械'), tokku: w(14, 'とっく'), k2048: w(14, '2048'),
      k32768: w(15, '32768'), k65536: w(15, '65536'), tsukutte: w(15, '作って'),
      l16: S(16), saki13: w(16, '先'), koerare: w(16, '越えられない'), kabe: w(16, '壁'),
      b44: w(17, '4×4'), ban: w(17, '盤'), ichiban: w(17, 'いちばん'), max: w(17, '131072'), sore: w(17, 'それ'), kesshite: w(17, '決して'),
      l18: S(18), mittsu: w(18, '3つ'), toi: w(18, '問い'),
      q: [w(19, '1つ目'), w(20, '2つ目'), w(21, '3つ目')], ookiku: w(20, '大きく'), un: w(21, '運'),
      l22: S(22), m16: w(22, '16'), ura: w(22, '裏'), kakure: w(22, '隠れた'), issho: w(22, '一緒'), end: E(22),
    };
    this.START = S(0);
    this.FROM = -0.5;                                  // lead p1 0.6: trang mở trong bóng tối, nắng hiện dần
    this.TAIL = 1.0;                                   // build.json p1 tail — đen kín đúng hết câu cuối + tail
    const T = this.T;
    this.KEYS = [[this.FROM, [150, 190, 620]], [T.l9 - 0.4, [96, 380, 420]]];
    // ⓪ phải: đọc lại ván người giỏi bằng luật của kit — mọi bước phải là nước đi hợp lệ, kết thúc đúng lúc 2048 thành hình
    let c = OPEN.start; this.R = [c];
    [...OPEN.dirs].forEach((d, s) => { const r = slide(c, d); if (!r.moved) throw new Error(`opening: bước ${s} (${d}) không đi được`); c = spawn(r.cells, OPEN.seed * 100000 + s).cells; this.R.push(c); });
    must(`${Math.max(...c.flat())}`, 2048); must(`${Math.max(...this.R.at(-2).flat())} < 2048`, true);
    this.TOP = [0, 0]; must(`${c[0][0]}`, 2048);                                       // 2048 nằm ở góc trên-trái (角)
    must(`${this.R.length - 1 - Math.ceil((T.r2048 - this.FROM) * RATE)} >= 0`, true);  // đủ nước cho cả đoạn tua
    // ⓪ trái: 4 ván bấm bừa thua — kit.play với seed đã chọn ở data/opening.mjs
    this.LEFT = OPEN.left.map(seed => play(S0L, 400, { seed }));
    for (const r of this.LEFT) { must(`${!!r.at(-1).over}`, true); must(`${Math.max(...r.at(-1).cells.flat())} <= 256`, true); }
    // số trên hình (must ở trạng thái đã xong)
    must(`JSON.stringify(${JSON.stringify(CC)})`, '[[4,0,0,0],[8,0,0,0],[0,0,0,0],[0,0,0,0]]');   // 2 + 2 = 4 gộp ở góc
    must('2 + 2', 4); must(`${SP.v}`, 2); must(`'${SP.at}'`, '2,2');
    must('400 * 10000', 4000000); must('20 * 10000', 200000);
    must(`[${LADDER}].reduce((a, b) => a + b, 0)`, 131072);
    // 12 bàn bấm bừa THẬT (kit.play, quân mới hash) — không bàn nào tới 1024 (đúng như lời đọc: 1024 「0回」)
    this.RUNS = Array.from({ length: 12 }, (_, i) => { const s0 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      s0[Math.floor(((i * 5) % 16) / 4)][(i * 5) % 4] = 2; const j = (i * 7 + 3) % 16; s0[j >> 2][j & 3] = 2; return play(s0, 400, { seed: i + 1 }); });
    for (const r of this.RUNS) must(`${Math.max(...r.at(-1).cells.flat())} < 1024`, true);
    this.TREE = { type: 'board', cells: B1024.map(r => r.slice()), children: ['U', 'L', 'R', 'D'].map((d, i) => ({ type: 'me', dir: d, best: i === 0,
      children: [0, 1, 2].map(() => ({ type: 'dot' })) })) };
    this.POINT = [330, 700];                           // mascot point: đầu ngón ≈ cx + 0.683h = 808 < 短冊 đầu tiên (x 920)
    must('330 + 0.683 * 700 < 920 - 20', true);
  }
  sfx() {
    const T = this.T, c = (t, kind, db) => ({ t: +t.toFixed(3), kind, ...(db != null ? { db } : {}) });
    return [
      c(this.FROM + 0.2, 'wood'), c(T.h1, 'pen'), c(T.h1000, 'pen'),
      ...this.lostAt().map(a => c(a, 'snap')), c(T.r2048, 'shimmer'),
      c(T.yubi, 'pen'), c(T.arimasen, 'pen', -3), c(T.narabe, 'hanko'), c(T.sugaku, 'suzu'),
      c(T.l5 - 0.5, 'whoosh'), c(T.tate, 'pen'), c(T.rule, 'koma'),
      c(T.swipe, 'whoosh'), c(T.subete, 'koma'),
      c(T.onaji, 'pen'), c(T.butsu, 'koma'), c(T.goukei, 'pen'),
      c(T.aite, 'tick'), c(T.araware, 'coin'),
      c(T.y2014, 'pen'), c(T.name, 'pen'),
      c(T.week, 'pen'), c(T.man, 'soroban'), c(T.koe5, 'shimmer'),
      c(T.l10 - 0.1, 'koma'), c(T.detara, 'dice'), c(T.play, 'koma'),
      c(T.t1024, 'pop'), c(T.ikkai, 'snap'), c(T.t2048, 'pop'),
      c(T.l13 - 0.3, 'page'), c(T.kangae, 'suzu'),
      c(T.kikai11, 'wood'), c(T.k2048, 'koma'), c(T.k32768, 'koma'), c(T.k65536, 'koma'), c(T.tsukutte, 'shimmer'),
      c(T.saki13, 'pop'),
      c(T.b44, 'wood'), c(T.max, 'pen'), c(T.max + 1.7, 'hanko'), c(T.kesshite, 'snap'),
      c(T.l18 - 0.1, 'whoosh'), c(T.mittsu, 'page'), ...T.q.map(t => c(t, 'pen')), c(T.un, 'coin'),
      c(T.kakure, 'pen'),
    ];
  }
  // ⓪ trái: ván j chiếm [t0 + j·span, t0 + (j+1)·span]; tua RATE nước/s rồi 0.9 s 詰み (tối)
  leftClock() { const t0 = this.FROM + 0.2; return { t0, span: (this.T.r2048 + 0.3 - t0) / 4 }; }
  lostAt() { const { t0, span } = this.leftClock(); return [1, 2, 3, 4].map(j => t0 + j * span - 0.9); }
  opening(g, t) {
    const T = this.T, kIn = prog(t, this.FROM, this.FROM + 0.4);
    telop(g, '1時間', LX + BS / 2, 175, kIn, { size: 64, align: 'center' });
    telop(g, '1000時間', RX + BS / 2, 175, kIn, { size: 64, align: 'center' });
    // trái: 4 ván thua
    const { t0, span } = this.leftClock(), j = clamp(Math.floor((t - t0) / span), 0, 3), run = this.LEFT[j];
    const tg = t - t0 - j * span, N = Math.round((span - 0.9) * RATE), i0 = Math.max(0, run.length - N);
    const step = Math.min(run.length - 1, i0 + Math.max(0, Math.floor(tg * RATE))), over = step === run.length - 1;
    board(g, run[step].cells, LX, BY, BS, kIn, { seed: 3, dim: over ? ALL16 : [] });
    telop(g, `${j + 1}回目`, LX + BS / 2, 905, kIn * (1 - prog(t, T.l3 - 0.4, T.l3)), { size: 40, color: '@dim', align: 'center' });
    // phải: ván người giỏi, nước cuối (2048 thành hình) rơi đúng chữ 「2048」 câu 2
    const n = this.R.length - 1, idx = clamp(n - Math.ceil((T.r2048 - t) * RATE), 0, n);
    const G = board(g, this.R[idx], RX, BY, BS, kIn, { seed: 9 });
    if (idx === n) glint(g, ...G.ctr(...this.TOP), G.cs, prog(t, T.r2048 + 0.1, T.r2048 + 1.0));
    // chữ dưới: 指の速さ (gạch 墨) → 並べ方 (朱) → 並べ方の裏に、数学
    const o3 = 1 - prog(t, T.l4 - 0.3, T.l4);
    if (o3 > 0) {
      const b = telop(g, '指の速さ', 560, 990, prog(t, T.yubi, T.yubi + 0.6) * o3, { size: 52, color: '@dim', align: 'center' });
      if (t > T.arimasen) strikeInk(g, b.x - 10, b.y + b.h * 0.55, b.x + b.w + 10, b.y + b.h * 0.5, prog(t, T.arimasen, T.arimasen + 0.5) * o3);
      answer(g, '並べ方', 1390, 990, prog(t, T.narabe, T.narabe + 0.6) * o3, { size: 64, align: 'center' });
    }
    telop(g, '並べ方の裏に、数学', 960, 990, prog(t, T.sugaku - 0.2, T.sugaku + 0.6), { size: 56, align: 'center' });
  }
  render(g, t) {
    const T = this.T;
    ground(g, t, { sun: 1 - prog(t, T.issho, T.end + 0.3) });

    // ── ⓪ 1時間 | 1000時間 (câu 0–4) → rời lên ──
    const o0 = out(t, T.l5 - 0.6, 0.7);
    if (o0 < 1) { g.save(); g.translate(0, -1100 * o0); this.opening(g, t); g.restore(); }

    // ── bàn chính (vật xuyên suốt) — câu 5–9, rời xuống ở câu 10 ──
    const [bx, by, bS] = track(t, this.KEYS), oB = out(t, T.l10 - 0.4, 0.7);
    if (t > T.l5 - 0.3 && oB < 1) {
      g.save(); g.translate(0, 900 * oB);
      const kBan = prog(t, T.l5 - 0.2, T.l5 + 0.4);
      const gv = prog(t, T.tate, T.tate + 0.9), gh = prog(t, T.yoko, T.yoko + 0.9);
      const sl1 = T.subete, sl2 = T.butsu, hlK = prog(t, T.aite, T.aite + 0.3) * (1 - prog(t, T.araware + 0.6, T.araware + 0.9));
      if (t < sl1) {
        const G = ban(g, bx, by, bS, kBan, { gridV: gv, gridH: gh });
        [[0, 2], [1, 1], [3, 2]].forEach(([r, c], i) => koma(g, A[r][c], ...G.ctr(r, c), G.cs, prog(t, T.rule + i * 0.3, T.rule + i * 0.3 + 0.45), { seed: r * 4 + c + 17 }));
      } else if (t < sl2 + 1.2) {
        const [from, dir, a] = t < sl2 ? [A, 'L', sl1] : [B, 'U', sl2];
        boardMove(g, from, dir, bx, by, bS, prog(t, a, a + 0.9));
      } else {
        const empties = []; CC.forEach((row, r) => row.forEach((v, c) => { if (!v) empties.push([r, c]); }));
        const hl = hlK > 0.5 ? (t < T.araware ? empties : [SP.at]) : null;
        const G = board(g, CC, bx, by, bS, 1, { hl });
        koma(g, SP.v, ...G.ctr(...SP.at), G.cs, prog(t, T.araware, T.araware + 0.5), { luck: t < T.l10, seed: 99 });
      }
      // vuốt: mũi tên nét trên mặt bàn (← rồi ↑), rút lại từ đuôi khi quân trượt xong
      const cx = bx + bS / 2, cy = by + bS / 2, r1 = prog(t, sl1 + 0.6, sl1 + 1.1), r2 = prog(t, sl2 + 0.6, sl2 + 1.1);
      if (t > T.swipe && r1 < 1) { const x0 = cx + bS * 0.32, x1 = cx - bS * 0.32; arrow(g, x0 + (x1 - x0) * r1, cy, x1, cy, prog(t, T.swipe, T.swipe + 0.6), { w: 9, head: 34 }); }
      if (t > sl2 - 0.6 && r2 < 1) { const y0 = cy + bS * 0.32, y1 = cy - bS * 0.32; arrow(g, cx + bS * 0.22, y0 + (y1 - y0) * r2, cx + bS * 0.22, y1, prog(t, sl2 - 0.6, sl2), { w: 9, head: 34 }); }
      g.restore();
    }

    // ── ① cột chữ luật (câu 5–8) → rời phải ──
    const o1 = out(t, T.l9 - 0.5);
    if (t > T.l5 - 0.3 && o1 < 1) {
      g.save(); g.translate(1100 * o1, 0);
      const X = 880;
      telop(g, [['縦に4マス、', `700 52px ${MIN}`], ['横に4マス', `700 52px ${MIN}`]], X, 270, Math.min(prog(t, T.tate, T.tate + 1.0) * 0.5, 0.5) + prog(t, T.yoko, T.yoko + 0.9) * 0.5, { size: 52 });
      telop(g, 'ルールは、たった2つ', X, 370, prog(t, T.rule, T.futa + 0.3), { size: 48, color: '@dim' });
      telop(g, '①　スワイプすると、すべる', X, 500, prog(t, T.swipe, T.subette + 0.2), { size: 44 });
      telop(g, '②　同じ数がぶつかると、合体', X, 600, prog(t, T.onaji, T.gattai + 0.3), { size: 44 });
      telop(g, '2 + 2 = 4', X + 64, 700, prog(t, T.goukei - 0.1, T.goukei + 0.5), { size: 56 });
      luck(g, '新しいタイルが1枚', X, 830, prog(t, T.atara, T.araware), { size: 44 });
      g.restore();
    }

    // ── ② 棋譜: 2014 · 19歳 · チルリ · 1週間 · 400万人 (câu 9) → rời trái ──
    const o2 = out(t, T.l10 - 0.4, 0.7);
    if (t > T.l9 - 0.5 && o2 < 1) {
      g.save(); g.translate(-1900 * o2, 0);
      const ink = { on: 'paper' };
      kifu(g, 640, 130, 1180, 830, prog(t, T.l9 - 0.4, T.l9 + 0.3), { rules: true, seed: 4, content: X => {
        const x = X.ix + 20, y = X.iy;
        write(g, '2014年', x, y + 80, prog(t, T.y2014, T.y2014 + 0.6), { font: `700 64px ${MIN}`, ...ink });
        write(g, '19歳', x, y + 175, prog(t, T.age, T.age + 0.5), { font: `700 52px ${MIN}`, ...ink });
        write(g, 'ガブリエレ・チルリ', x, y + 300, prog(t, T.name, T.name + 1.2), { font: `700 76px ${MIN}`, ...ink });
        write(g, '週末のあいだに作った', x, y + 390, prog(t, T.shuu, T.tsuku + 0.4), { font: `700 44px ${MIN}`, ...ink });
        brush(g, [[x, y + 440], [x + X.iw - 60, y + 444]], prog(t, T.week - 0.4, T.week + 0.2), { w: 2.5, color: C.sumi, alpha: 0.6 });
        write(g, '1週間で', x, y + 530, prog(t, T.week, T.week + 0.6), { font: `700 48px ${MIN}`, ...ink });
        write(g, '訪れた人', x, y + 660, prog(t, T.man - 0.2, T.man + 0.3), { font: `700 40px ${MIN}`, color: '@dim', ...ink });
        const kn = smooth(prog(t, T.man, T.man + 1.2)), n = Math.round(400 * kn);
        if (kn > 0) write(g, [[`${n}万人`, `700 96px ${MIN}`], [kn >= 1 && t > T.koe5 ? '　超え' : '', `700 44px ${MIN}`]], x + 200, y + 670, 1, ink);
        if (kn >= 1) must(`${n} * 10000`, 4000000);
      } });
      g.restore();
    }

    // ── ④ でたらめに 20万回: 12 bàn mini bấm bừa thật; 1024 / 2048 「0回」 (câu 10–12) → rời trái ──
    const o4 = out(t, T.l13 - 0.4, 0.7);
    if (t > T.l10 - 0.5 && o4 < 1) {
      g.save(); g.translate(-1900 * o4, 0);
      const t0 = T.l10 + 0.2;
      this.RUNS.forEach((run, i) => {
        const r = Math.floor(i / 4), c = i % 4, x = 96 + c * 190, y = 300 + r * 230, kk = prog(t, T.l10 - 0.2 + i * 0.05, T.l10 + 0.4 + i * 0.05);
        const step = Math.max(0, Math.min(run.length - 1, Math.floor((t - t0) * 12))), st = run[step], over = step === run.length - 1 && st.over;
        board(g, t < t0 ? run[0].prev : st.cells, x, y, 160, kk, { numbers: false, legs: false, thick: 11, seed: i + 1, dim: over ? st.cells.flatMap((row, rr) => row.map((_, cc2) => [rr, cc2])) : [] });
      });
      telop(g, 'コンピュータに', 1000, 200, prog(t, T.l10, T.l10 + 0.7), { size: 44, color: '@dim' });
      telop(g, 'でたらめに', 1000, 300, prog(t, T.detara, T.detara + 0.5), { size: 52 });
      const kc = smooth(prog(t, T.man20, T.man20 + 1.3)), n = Math.round(20 * kc);     // đếm theo 万 như lời đọc 「20万回」
      if (kc > 0) telop(g, [[`${n}万`, `700 64px ${MIN}`], ['回', `700 52px ${MIN}`]], 1280, 300, 1, { size: 64 });
      if (kc >= 1) must(`${n}`, 20);
      telop(g, 'プレイさせた実験', 1000, 390, prog(t, T.play, T.jikken + 0.4), { size: 40, color: '@dim' });
      // tally: 1024 / 2048 bóng mờ — 0回
      koma(g, 1024, 1180, 640, 210, prog(t, T.t1024, T.t1024 + 0.5), { ghost: true });
      telop(g, '到達', 1180, 820, prog(t, T.tadori, T.tadori + 0.5), { size: 40, color: '@dim', align: 'center' });
      telop(g, '0回', 1180, 930, prog(t, T.ikkai, T.ikkai + 0.4), { size: 84, align: 'center' });
      koma(g, 2048, 1580, 640, 210, prog(t, T.t2048, T.t2048 + 0.5), { ghost: true });
      telop(g, '到達', 1580, 820, prog(t, T.t2048 + 0.6, T.t2048 + 1.1), { size: 40, color: '@dim', align: 'center' });
      telop(g, '0回', 1580, 930, prog(t, T.iu, T.iu + 0.4), { size: 84, align: 'center' });
      g.restore();
    }

    // ── ⑤ 先を読んで考える機械: cây 棋譜 + 駒台 (câu 13–15); câu 16: cây rời trái, 駒台 dời sang trái ──
    const o5 = out(t, T.l16 - 0.2, 0.7);
    if (t > T.l13 - 0.5 && o5 < 1) {
      g.save(); g.translate(-1300 * o5, 0);
      kifu(g, 96, 160, 960, 800, prog(t, T.l13 - 0.4, T.l13 + 0.3), { seed: 7, content: X => {
        const k = Math.max(prog(t, T.l13 + 0.2, T.l13 + 0.8) / 3, prog(t, T.saki, T.kangae + 0.4));
        tree(g, this.TREE, X.ix + 150, X.iy + X.ih / 2, k, { dx: 300, dy: 56, size: 210, meSize: 140 });
      } });
      g.restore();
      g.save(); g.translate(0, -700 * o5);
      telop(g, '先を読んで', 1150, 250, prog(t, T.saki, T.yonde + 0.5), { size: 48 });
      telop(g, '「考える」機械', 1150, 345, prog(t, T.kangae - 0.1, T.kangae + 0.7), { size: 56 });
      telop(g, 'とっくに 2048 を超えた', 1150, 470, prog(t, T.tokku, T.k2048 + 0.6), { size: 40, color: '@dim' });
      g.restore();
    }
    const o6 = out(t, T.l18 - 0.4, 0.7);
    if (t > T.kikai11 - 0.5 && o6 < 1) {
      g.save(); g.translate(-1900 * o6, 0);
      const dx = (160 - 1150) * smooth(prog(t, T.l16, T.l16 + 0.9));
      const D0 = komadai(g, 1150 + dx, 560, 660, 240, prog(t, T.kikai11, T.kikai11 + 0.6));
      [[2048, T.k2048], [32768, T.k32768], [65536, T.k65536]].forEach(([v, a], i) => {
        const x = D0.x + 110 + i * 220, y = D0.y + 120; koma(g, v, x, y, 175, prog(t, a, a + 0.45), { seed: i + 40 });
        if (i > 0) glint(g, x, y - 8, 175, prog(t, a + 1.3, a + 2.1));
      });
      glint(g, D0.x + 550, D0.y + 112, 175, prog(t, T.tsukutte, T.tsukutte + 0.8));
      telop(g, '機械の記録', D0.x + 330, 960, prog(t, T.k65536 + 1.5, T.k65536 + 2.3) * (1 - prog(t, T.l16 - 0.2, T.l16)), { size: 40, color: '@dim', align: 'center' });
      g.restore();
    }

    // ── ⑥ 131072 の壁 (câu 16–17) → rời trái ──
    if (t > T.saki13 - 0.3 && o6 < 1) {
      g.save(); g.translate(-1900 * o6, 0);
      koma(g, 131072, 1360, 660, 240, prog(t, T.saki13, T.saki13 + 0.6), { ghost: true });
      telop(g, '越えられない', 1180, 250, prog(t, T.koerare, T.kabe), { size: 40, color: '@dim' });
      telop(g, '壁', 1180, 390, prog(t, T.kabe, T.kabe + 0.4), { size: 120 });
      brush(g, [[1090, 480], [1086, 700], [1092, 930]], prog(t, T.kabe, T.kabe + 0.5), { w: 12, color: C.gofunDim, alpha: 0.9 });
      ban(g, 160, 130, 230, prog(t, T.b44 - 0.1, T.b44 + 0.7));
      telop(g, '4×4の盤で', 440, 230, prog(t, T.ban - 0.3, T.ban + 0.4), { size: 48 });
      telop(g, 'いちばん大きなタイル', 440, 310, prog(t, T.ichiban, T.max), { size: 40, color: '@dim' });
      answer(g, '131072', 1360, 950, prog(t, T.max, T.max + 0.9), { size: 72, align: 'center' });
      stamp(g, '最大', 1600, 905, prog(t, T.max + 1.7, T.max + 2.2), { size: 40 });
      telop(g, 'それより大きくは', 440, 420, prog(t, T.sore, T.sore + 0.9), { size: 44 });
      telop(g, '決してならない', 440, 500, prog(t, T.kesshite, T.kesshite + 0.6), { size: 52 });
      g.restore();
    }

    // ── ⑦ mục lục: ba 短冊 ①②③ + mascot point (nói) (câu 18–21) → rời ──
    const o7 = out(t, T.l22 - 0.3, 0.7);
    if (t > T.l18 - 0.3 && o7 < 1) {
      g.save(); g.translate(1100 * o7, 0);
      QS.forEach((s, i) => tanzaku(g, 980 + i * 270, 150, 124, 700, prog(t, T.mittsu + i * 0.22, T.mittsu + i * 0.22 + 0.9),
        { n: i + 1, text: s, kText: prog(t, T.q[i], T.q[i] + 1.3), size: 44, seed: i + 2 }));
      telop(g, '3つの問い', 1250, 990, prog(t, T.toi, T.toi + 0.6), { size: 48, align: 'center' });
      coin(g, 1700, 900, 46, prog(t, T.un, T.un + 0.4), { spin: Math.max(0, 1 - prog(t, T.un, T.un + 0.9)) * 6 });
      g.restore();
      g.save(); g.translate(-900 * o7, 0);
      figure(g, 'point', this.POINT[0], H, this.POINT[1], prog(t, T.l18 - 0.1, T.l18 + 0.5), { t });
      g.restore();
    }

    // ── ⑧ 16マスの裏: bàn trống giữa khung, mũi vàng rắn trên đường kẻ (câu 22) ──
    if (t > T.l22 - 0.3) {
      const G = ban(g, 660, 140, 600, prog(t, T.m16 - 0.1, T.m16 + 0.7));
      chevrons(g, G, SNAKE.slice(0, 15).map((_, i) => [SNAKE[15 - i], SNAKE[14 - i]]), prog(t, T.ura, T.kakure + 0.9));
      telop(g, '16マスの裏に隠れた数学', 960, 960, prog(t, T.kakure, T.kakure + 1.0), { size: 56, align: 'center' });
    }

    // ── nắng hiện từ bóng tối; tắt về đen kín đúng hết câu cuối + tail ──
    const up = 0.1 + 0.9 * outCubic(prog(t, this.FROM, this.FROM + 1.2));
    const down = 1 - prog(t, T.end - 0.25, T.end + this.TAIL - 0.15);
    dark(g, Math.min(up, down));
  }
}
