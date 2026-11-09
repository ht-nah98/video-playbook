// e2 · 運を平均で読む (p2 câu 59–66). DNA e2 (盤上) = khung lab 1 của tools/lab/banjo.html, dựng lại bằng hàm kit:
//  ① câu 59: bàn 将棋 9×9 (shogiban) · 「将棋のAI」「相手はいつも最善の手を指す」「ミニマックス法」
//  ② câu 60: mascot coin-flip (KHÔNG nói, 7–8 s) búng đồng xu 浅葱 · bàn 2048 = gốc cây lab: vuốt ↑ (slide thật) → quân 浅葱 rơi
//     vào ô trống duy nhất (spawn hash) đúng 「ふる」 · 「2048の相手は」「最善の手など選ばない」「サイコロをふるだけ」
//  ③ câu 61: tờ 棋譜 bên trái: 1966年 · イギリス · 人工知能研究者 · ドナルド・ミッキー (chỉ chữ, không ảnh) · 「運が絡むゲームの 読み方」
//  ④ câu 62–66: tờ cây 和紙 (khung lab 1): いまの局面 → 自分の番 (bốn quân mũi tên, 評価値, nhánh vàng = 最大) →
//     運の番 (đồng xu, 期待値) → hai bàn con 2 (9/10) / 4 (1/10) → 期待値 = 0.9 × v2 + 0.1 × v4 (朱) + 判子「答」 (must) ·
//     bàn mini 「1人用」 · 「エクスペクティマックス法」
// 評価値 = tổng quân × trọng số rắn (góc trên-trái nặng nhất) — CHÉP từ lab (hàm cục bộ evalB / spawns / expect).
import { W, H, C, MIN, JP, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, ban, board, boardMove, koma, kifu, shogiban, coin,
  figure, write, telop, luck, stamp, brush, curvePts, ink, measure, slide, comma, ARROW } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const ROOT = [[256, 128, 64, 32], [4, 16, 16, 8], [2, 8, 4, 8], [4, 2, 8, 2]];      // = lab khung 1
const WS = [[16, 15, 14, 13], [9, 10, 11, 12], [8, 7, 6, 5], [1, 2, 3, 4]];
const evalB = b => b.flat().reduce((s, v, i) => s + v * WS[i >> 2][i & 3], 0);
const spawns = a => { const o = []; a.flat().forEach((v, i) => { if (!v) for (const [tv, p] of [[2, 0.9], [4, 0.1]]) { const c = a.map(x => x.slice()); c[i >> 2][i & 3] = tv; o.push({ cell: i, tv, p, c }); } }); return o; };
const expect = a => { const s = spawns(a), n = s.length / 2; return s.reduce((acc, o) => acc + o.p / n * evalB(o.c), 0); };
const r1 = x => Math.round(x * 10) / 10;
const MINI = [[64, 16, 4, 0], [8, 4, 0, 0], [2, 0, 0, 0], [0, 0, 2, 0]];            // bàn mini 「1人用」

export default class Heikin {
  static ERA = 'banjo';
  static POSES = ['coin-flip'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      shogi: w(59, '将棋'), ai: w(59, 'ai'), aite: w(59, '相手'), sasu: w(59, '指す'), saki: w(59, '先'), mini: w(59, 'ミニマックス'),
      l60: S(60), g2048: w(60, '2048'), saizen: w(60, '最善'), erab: w(60, '選びません'), sai: w(60, 'サイコロ'), furu: w(60, 'ふる'),
      l61: S(61), y1966: w(61, '1966年'), uk: w(61, 'イギリス'), jinko: w(61, '人工'), don: w(61, 'ドナルド'), mic: w(61, 'ミッキー'),
      un61: w(61, '運'), yomi: w(61, '読み方'),
      l62: S(62), ki: w(62, '木'), nishu: w(62, '2種類'), wakare: w(62, '分かれ道'),
      jibun: w(63, '自分'), ichi: w(63, 'いちばん'), erabu: w(63, '選びます'),
      un64: w(64, '運'), kaku: w(64, '確率'), heikin: w(64, '平均'), kitai: w(64, '期待値'),
      p9: w(65, '10分の9'), p1: w(65, '10分の1'), e65: E(65),
      g66: w(66, '2048'), hitori: w(66, '1人'), atehame: w(66, '当てはめた'), expm: w(66, 'エクスペクティマックス'),
    };
    this.START = S(59);
    this.FROM = Math.max(this.START - 1.2, E(58) + 0.5);
    this.tS = this.T.l62 - 0.6;                                         // tờ cây vào
    // ── toán của cây (lab khung 1) ──
    must('Math.round((0.9 * 2 + 0.1 * 4) * 10) / 10', 2.2);
    const sum = b => b.flat().reduce((a, v) => a + v, 0);
    this.OPTS = ['U', 'R', 'L', 'D'].map(d => { const r = slide(ROOT, d); if (!r.moved) return { d, ok: false };
      must(`${sum(r.cells)}`, sum(ROOT)); return { d, ok: true, a: r.cells, E: r1(expect(r.cells)) }; });
    this.BEST = this.OPTS.filter(o => o.ok).reduce((p, q) => q.E > p.E ? q : p);
    must(`'${this.BEST.d}'`, 'U');
    const kids = spawns(this.BEST.a); must(`${kids.length}`, 2);                 // một ô trống → 2 (0.9) / 4 (0.1)
    this.K = kids.map(k => ({ ...k, v: evalB(k.c), at: [k.cell >> 2, k.cell & 3] }));
    this.EV = r1(0.9 * this.K[0].v + 0.1 * this.K[1].v);
    must(`${this.EV}`, this.BEST.E);
    must(`Math.round((0.9 * ${this.K[0].v} + 0.1 * ${this.K[1].v}) * 10) / 10`, this.EV);
    this.ROWS = this.OPTS.slice().sort((p, q) => (q.E ?? -1) - (p.E ?? -1));
    must(`${this.ROWS.every(o => o.ok)}`, true);
    // ② bàn 2048 ở câu 60: vuốt ↑ rồi quân 2 浅葱 rơi vào ô trống duy nhất (= nhánh tốt nhất của cây)
    this.UP = slide(ROOT, 'U');
    this.SP = { at: this.K[0].at, v: 2 };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.ai, 'pen'), c(T.aite + 0.9, 'pen'), c(T.mini, 'pen'),
      c(T.l60 - 0.3, 'whoosh'), c(T.erab, 'koma'), c(T.sai, 'dice'), c(T.furu + 0.1, 'coin'),
      c(T.l61 - 0.3, 'page'), c(T.uk, 'pen'), c(T.don, 'pen'), c(T.yomi, 'pen'),
      c(this.tS, 'page'), c(T.nishu, 'koma'),
      c(T.ichi, 'soroban'),
      c(T.un64, 'tick'), c(T.kaku, 'koma'), c(T.kitai, 'pen'),
      c(T.p9, 'pen'), c(T.p1 + 0.8, 'soroban'),
      c(T.g66, 'koma'), c(T.atehame, 'hanko'), c(T.expm, 'shimmer'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── ① 将棋のAI (câu 59) → rời trái ──
    const o1 = out(t, T.l60 - 0.6, 0.7);
    if (o1 < 1) {
      g.save(); g.translate(-1300 * o1, 0);
      shogiban(g, 140, 210, 560, prog(t, this.FROM + 0.3, this.FROM + 1.5));
      telop(g, '将棋のAI', 820, 300, prog(t, T.shogi, T.ai + 0.6), { size: 64 });
      telop(g, '相手はいつも 最善の手を指す', 820, 420, prog(t, T.aite, T.sasu + 0.4), { size: 44 });
      telop(g, 'と考えて、先を読む', 820, 500, prog(t, T.saki - 0.6, T.saki + 0.6), { size: 40, color: '@dim' });
      telop(g, 'ミニマックス法', 820, 680, prog(t, T.mini, T.mini + 0.8), { size: 76 });
      g.restore();
    }

    // ── ② 2048の相手 = 運 (câu 60): mascot búng xu + bàn gốc ──
    const o2 = out(t, T.l61 - 0.5, 0.6);
    if (t > T.l60 - 0.6 && o2 < 1) {
      g.save(); g.translate(1100 * o2, 0);
      telop(g, '2048の相手は', 700, 260, prog(t, T.g2048, T.g2048 + 0.6), { size: 52 });
      telop(g, '最善の手など選ばない', 700, 350, prog(t, T.saizen, T.erab + 0.4), { size: 44, color: '@dim' });
      luck(g, 'サイコロをふるだけ', 700, 920, prog(t, T.sai, T.furu + 0.5), { size: 60 });
      g.restore();
      // mascot coin-flip: trồi lên ở câu 60, chìm xuống trước câu 61 (≈ 7.9 s)
      const kF = prog(t, T.l60 - 0.4, T.l60 + 0.3), sink = out(t, T.l61 - 1.0, 0.6);
      g.save(); g.translate(0, 900 * sink);
      const F = figure(g, 'coin-flip', 300, H, 740, kF, { talk: false });
      if (F && kF >= 1) {
        const tx = F.x + 125 * F.s, ty = F.y + 322 * F.s, up = outBack(prog(t, T.sai, T.sai + 0.5));
        const cx = tx + 62 * up, cy = ty - 10 - 140 * up + Math.sin((t - T.sai) * 3) * 8 * up;
        if (up > 0.2) {                                                  // vệt búng + vòng quay (màu trung tính)
          g.save(); g.strokeStyle = C.gofunDim; g.globalAlpha = 0.6 * clamp(up); g.lineWidth = 2.5; g.setLineDash([2, 9]); g.lineCap = 'round';
          g.beginPath(); g.moveTo(tx + 4, ty - 16); g.quadraticCurveTo(tx + 20, ty - 70, cx - 18, cy + 46); g.stroke(); g.setLineDash([]);
          for (const k of [0, 1]) { g.globalAlpha = (0.55 - k * 0.25) * clamp(up); g.beginPath(); g.ellipse(cx, cy, 72 + k * 16, 40 + k * 10, -0.35, 3.5, 5.6); g.stroke(); }
          g.restore();
        }
        coin(g, cx, cy, 30 + 24 * clamp(up), 1, { spin: t > T.sai ? (t - T.sai) * 9 : 1.2, tilt: 0.75 + 0.25 * clamp(up) });
      }
      g.restore();
    }

    // bàn gốc (câu 60) ở lại bên phải suốt câu 61, rời phải khi tờ cây vào
    const oBd = out(t, this.tS - 0.5, 0.6);
    if (t > T.l60 - 0.6 && oBd < 1) {
      g.save(); g.translate(1100 * oBd, 0);
      const BX = 1250, BY = 330, BS = 460, mv = T.erab;
      if (t < mv) board(g, ROOT, BX, BY, BS, prog(t, T.l60 - 0.5, T.l60 + 0.4));
      else boardMove(g, ROOT, 'U', BX, BY, BS, prog(t, mv, mv + 0.8), { spawn: { ...this.SP, k: prog(t, T.furu, T.furu + 0.5) } });
      g.restore();
    }

    // ── ③ ミッキー 1966 (câu 61 → hết): tờ 棋譜 bên trái ──
    if (t > T.l61 - 0.5) {
      kifu(g, 96, 220, 440, 500, prog(t, T.l61 - 0.4, T.l61 + 0.3), { rules: true, seed: 6, content: X => {
        const x = X.ix, o = { on: 'paper' };
        write(g, '1966年', x, X.y + 110, prog(t, T.y1966, T.y1966 + 0.6), { font: `700 60px ${MIN}`, ...o });
        write(g, 'イギリス', x, X.y + 180, prog(t, T.uk, T.uk + 0.5), { font: `700 40px ${MIN}`, ...o });
        write(g, '人工知能研究者', x, X.y + 260, prog(t, T.jinko, T.jinko + 0.8), { font: `700 40px ${MIN}`, color: '@dim', ...o });
        // tên một dòng, cỡ vừa khung trong của tờ (≥ 28)
        const nm = 'ドナルド・ミッキー', fs = Math.max(28, Math.min(48, Math.floor(40 * X.iw / measure(g, nm, `700 40px ${MIN}`))));
        write(g, nm, x, X.y + 380, prog(t, T.don, T.mic + 0.5), { font: `700 ${fs}px ${MIN}`, ...o });
      } });
      const o3 = out(t, this.tS - 0.4, 0.6);
      if (o3 < 1) {
        g.save(); g.translate(0, -800 * o3);
        telop(g, '運が絡むゲームの', 680, 480, prog(t, T.un61, T.un61 + 1.0), { size: 60 });
        telop(g, '読み方', 680, 640, prog(t, T.yomi, T.yomi + 0.5), { size: 110 });
        g.restore();
      }
      // câu 66: bàn mini (「2048」) + 「1人用」 dưới tờ 1966
      board(g, MINI, 110, 790, 180, prog(t, T.g66, T.g66 + 0.8), { numbers: false, legs: false, thick: 12 });
      telop(g, '1人用', 320, 870, prog(t, T.hitori, T.hitori + 0.4), { size: 56 });
      telop(g, 'のゲーム', 320, 945, prog(t, T.hitori + 0.3, T.hitori + 0.9), { size: 40, color: '@dim' });
    }

    // ── ④ cây エクスペクティマックス (câu 62–66) = khung lab 1 ──
    if (t > this.tS - 0.1) {
      telop(g, 'エクスペクティマックス法', 600, 142, prog(t, T.expm, T.expm + 1.2), { size: 70 });
      kifu(g, 568, 186, 1256, 840, prog(t, this.tS, this.tS + 0.7), { seed: 9, content: () => this.tree(g, t) });
    }
  }
  tree(g, t) {
    const T = this.T, P = { on: 'paper', align: 'center' }, grey = C.greyInk, goldDk = C.goldDk, asagi = ink('@luck', 'paper');
    const RX = 612, RS = 292, RY = 412, MX = 1010, my0 = 300, mdy = 150, CX = 1268, CY = my0 + 56 + 210, KX = 1384, KS = 292, ky = [262, 262 + KS + 72];
    const curve = (a, b, k, w, col, alpha) => brush(g, curvePts(a, b), k, { w, color: col, alpha });
    // gốc
    const kR = prog(t, this.tS + 0.3, this.tS + 1.0);
    write(g, 'いまの局面', RX + RS / 2, RY - 22, kR, { font: `700 32px ${MIN}`, ...P });
    board(g, ROOT, RX, RY, RS, kR, { thick: 22, legs: false, seed: 2 });
    // nút TA: bốn quân mũi tên + 評価値
    write(g, '自分の番', MX, 250, prog(t, T.nishu, T.nishu + 0.5), { font: `700 32px ${MIN}`, ...P });
    write(g, '最大をえらぶ', MX + 4, 290, prog(t, T.erabu, T.erabu + 0.6), { font: `400 28px ${MIN}`, color: '@dim', ...P });
    write(g, '評価値', MX + 108, 328, prog(t, T.ichi, T.ichi + 0.4), { font: `400 28px ${MIN}`, color: '@dim', ...P });
    const kBr = prog(t, T.jibun, T.jibun + 0.8), kBest = prog(t, T.erabu, T.erabu + 0.6);
    this.ROWS.forEach((o, i) => {
      const y = my0 + 56 + i * mdy, on = o.d === this.BEST.d;
      curve([RX + RS + 6, RY + RS / 2], [MX - 46, y], kBr, 2.2, grey, 0.55);
      if (on && kBest > 0) { curve([RX + RS + 6, RY + RS / 2], [MX - 46, y], kBest, 5, goldDk, 0.95); curve([RX + RS + 6, RY + RS / 2], [MX - 46, y], kBest, 2.2, C.goldLt, 0.9); }
      const kk = prog(t, T.nishu + i * 0.12, T.nishu + 0.45 + i * 0.12);
      koma(g, on && kBest > 0.3 ? 2048 : 2, MX, y, 92, kk, { label: ARROW[o.d], seed: i + 30, lift: on ? Math.sin(Math.PI * kBest) : 0 });
      write(g, comma(o.E.toFixed(1)), MX + 56, y + 12, prog(t, T.ichi + i * 0.15, T.ichi + 0.5 + i * 0.15), { font: `700 32px ${MIN}`, on: 'paper', color: on && kBest > 0 ? '@ink' : '@dim' });
    });
    // nút 運: đồng xu
    const by = my0 + 56, kU = prog(t, T.un64, T.un64 + 0.8);
    if (kU > 0) { curve([MX + 184, by - 4], [CX - 40, CY], kU, 5, goldDk, 0.95); curve([MX + 184, by - 4], [CX - 40, CY], kU, 2.2, C.goldLt, 0.9); }
    coin(g, CX, CY, 46, prog(t, T.wakare, T.wakare + 0.5));
    write(g, '運の番', CX, CY + 92, prog(t, T.wakare + 0.2, T.wakare + 0.7), { font: `700 32px ${MIN}`, color: '@luck', ...P });
    write(g, '期待値', CX, CY + 130, prog(t, T.kitai, T.kitai + 0.5), { font: `400 30px ${MIN}`, color: '@luck', ...P });
    // con: quân mới rơi vào ô trống duy nhất
    const kK = prog(t, T.kaku, T.kaku + 0.8);
    this.K.forEach((k, i) => {
      const y0 = ky[i], kc = clamp(kK * 1.6 - i * 0.6);
      if (kc > 0) curve([CX + 40, CY], [KX - 8, y0 + KS / 2], kc, 3, asagi, 0.9);
      board(g, k.c, KX, y0, KS, kc, { thick: 20, legs: false, hl: k.at, seed: 3 + i });
      const pt = i ? T.p1 : T.p9;
      write(g, [[String(k.tv), `700 36px ${MIN}`, '@luck', { gap: 6 }], ['が出る', `700 28px ${MIN}`, '@luck', { gap: 16 }], ['確率', `400 28px ${MIN}`, '@luck', { gap: 8 }],
        [i ? '1/10' : '9/10', `700 32px ${JP}`, '@luck']], KX + 4, y0 - 14, prog(t, pt, pt + 0.7), { on: 'paper' });
      write(g, comma(k.v.toFixed(0)), KX + KS + 18, y0 + KS - 24, prog(t, T.kitai + 0.3 + i * 0.3, T.kitai + 0.8 + i * 0.3), { font: `700 32px ${MIN}`, on: 'paper' });
    });
    // 期待値 = 0.9 × v2 + 0.1 × v4 = E (朱) + 判子「答」
    const f = `700 40px ${MIN}`, fy = 990, kf = prog(t, T.p1 + 0.8, T.e65 + 0.4);
    write(g, [['期待値', `700 36px ${MIN}`, '@luck', { gap: 22 }], ['= 0.9 × ', f], [comma(String(this.K[0].v)), f], ['  + 0.1 × ', f], [comma(String(this.K[1].v)), f],
      ['  = ', f], [comma(this.EV.toFixed(1)), `700 44px ${MIN}`, '@ans']], 1700, fy, kf, { on: 'paper', align: 'right' });
    stamp(g, '答', 1745, fy - 18, prog(t, T.atehame, T.atehame + 0.5), { size: 32 });
  }
}
