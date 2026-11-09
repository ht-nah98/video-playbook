// d1 · 上手な人の共通点 (p2, câu 34–41). DNA d1 (盤上): thẻ hồi「第三幕 なぜ角に集めるのか」; MỘT bàn 榧 bên trái, chữ bên phải.
//  ① câu 34: bàn rắn snake(LADDER) (bậc thang của hồi 2) — 「限界」 → 「勝つための秘訣」
//  ② câu 35–36: quân bậc thang trượt xuống rời bàn; 「上手な人は みな同じ」; quân 128 đặt vào góc, phần còn lại theo hình rắn
//  ③ câu 37: mũi vàng chạy dọc rắn từ đuôi về góc (= bậc thang; lại hiện ở 「並んで」 câu 39); câu 38: quân 4 浅葱 rơi ngay cạnh 4 (spawn hash)
//  ④ câu 39: 6 lượt vuốt THẬT (kit.slide) R R U L L L — một lần gộp ở đuôi chạy dây chuyền về góc: 128 → 256
//  ⑤ câu 40–41: bàn kín, quân 256 ở giữa = 通せんぼ (vạch mực quanh nó); hai cặp quân nhỏ bị nhốt mờ đi, khung xích
import { W, H, C, MIN, clamp, prog, lookup, must, outCubic, smooth, ground, ban, board, boardMove, koma, chevrons, telop, luck,
  heading, actCard, actCue, brush, slide, spawn, snake, LADDER, SNAKE } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const BX = 150, BY = 230, BS = 680;                                   // bàn chính (vật xuyên suốt của cảnh)
const LAD = snake(LADDER);                                            // khung lab 0: bậc thang 16 quân
// bàn rắn giữa ván: 128 ở góc, 64 · 32 · 16 | 8 · 4 (đuôi) — quân mới 4 sẽ rơi cạnh đuôi
const GOOD = [[128, 64, 32, 16], [0, 0, 4, 8], [0, 0, 0, 0], [0, 0, 0, 0]];
const CHAIN = ['R', 'R', 'U', 'L', 'L', 'L'];
// bàn có quân lớn ở giữa: không ô kề nào bằng nhau; hai cặp nhỏ (2·2 ngang, 4·4 dọc) bị 256 chắn
const BAD = [[8, 4, 16, 2], [2, 256, 2, 8], [16, 4, 32, 4], [2, 8, 0, 0]];
const TRAP = [[1, 0], [1, 2], [0, 1], [2, 1]];
const seedOf = (r, c) => r * 4 + c + 17;                              // = pieceSeed(r, c, 1) của kit (quân giữ vân khi đổi cách vẽ)

function glint(g, cx, cy, s, k) {                                     // vệt nắng lướt qua quân (màu trung tính)
  if (k <= 0 || k >= 1) return;
  const x = cx - s + 2 * s * k;
  g.save(); g.globalCompositeOperation = 'screen'; g.beginPath(); g.rect(cx - s * 0.45, cy - s * 0.5, s * 0.9, s * 0.95); g.clip();
  const gr = g.createLinearGradient(x - s * 0.25, 0, x + s * 0.25, 0); gr.addColorStop(0, 'rgba(255,240,200,0)'); gr.addColorStop(0.5, 'rgba(255,240,200,0.55)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
  g.fillStyle = gr; g.fillRect(x - s * 0.25, cy - s * 0.6, s * 0.5, s * 1.2); g.restore();
}
// khung xích (quân bị nhốt): mắt xích mực dọc bốn cạnh ô, lộ dần theo k
function chainFrame(g, G, r, c, k) {
  if (k <= 0) return;
  const x0 = G.ox + c * G.cs + 7, y0 = G.oy + r * G.cs + 7, s = G.cs - 14, n = 7, per = 4 * n, m = Math.round(per * clamp(k));
  g.save(); g.strokeStyle = C.sumi; g.lineWidth = 3; g.globalAlpha = 0.85;
  for (let i = 0; i < m; i++) {
    const side = Math.floor(i / n), f = (i % n + 0.5) / n;
    const [px, py] = side === 0 ? [x0 + f * s, y0] : side === 1 ? [x0 + s, y0 + f * s] : side === 2 ? [x0 + s - f * s, y0 + s] : [x0, y0 + s - f * s];
    g.beginPath(); g.ellipse(px, py, side % 2 ? 5 : 9, side % 2 ? 9 : 5, 0, 0, 2 * Math.PI); g.stroke();
  }
  g.restore();
}

export default class Jouzu {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l34: S(34), kaidan: w(34, '階段'), genkai: w(34, '限界'), dake: w(34, 'だけ'), katsu: w(34, '勝つ'), hiketsu: w(34, '秘訣'),
      l35: S(35), jouzu: w(35, '上手'), mina: w(35, 'みな'), e35: E(35),
      ichiban: w(36, 'いちばん'), kado: w(36, '角'), nokori: w(36, '残り'), hebi: w(36, 'ヘビ'), ori: w(36, '折り返し'), ookii: w(36, '大きい'), naraberu: w(36, '並べる'), e36: E(36),
      l37: S(37), riyuu: w(37, '理由'), kaidan37: w(37, '階段'), naka: w(37, '中'),
      ookiku: w(38, '大きく'), onaji: w(38, '同じ'), tonari: w(38, 'となり'), dake38: w(38, 'だけ'),
      narande: w(39, '並んで'), shippo: w(39, 'しっぽ'), gattai: w(39, '合体'), rensa: w(39, '連鎖'), kakeno: w(39, '駆けのぼって'), e39: E(39),
      l40: S(40), ookina: w(40, '大きな'), mannaka: w(40, 'まん中'), toosen: w(40, '通せんぼ'),
      ushiro: w(41, '後ろ'), tojiko: w(41, '閉じこめられた'), dooshi: w(41, 'タイルどうし'), nido: w(41, '二'), deae: w(41, '出会えません'), end: E(41),
    };
    const T = this.T;
    this.START = S(34);
    this.FROM = Math.max(this.START - 2.6, E(33) + 0.5);              // mở hồi; KẾT c3 = hết câu 33
    // quân mới cạnh đuôi: spawn(GOOD, i) THẬT — i đầu tiên cho ô [1,1] giá trị 4
    let i = 0; while (!(() => { const s = spawn(GOOD, i); return s.at[0] === 1 && s.at[1] === 1 && s.v === 4; })()) if (++i > 20000) throw new Error('d1: không tìm được spawn');
    this.SP = spawn(GOOD, i);
    // dây chuyền: 6 lượt vuốt thật, mỗi lượt đúng một lần gộp, góc 128 → 256; sau MỖI lượt một quân mới rơi (spawn hash THẬT,
    // DNA §9) — tìm tất định bộ chỉ số i sao cho mọi quân mới không chặn / không gộp lạc vào dây chuyền
    const ok = (cells, j) => { if (j === CHAIN.length) return []; const r = slide(cells, CHAIN[j]);
      if (!r.moved || r.merges.length !== 1 || r.merges[0].v !== 8 * 2 ** j) return null;
      for (const pass of [0, 1, 2]) for (let i = 1; i < 400; i++) { const sp = spawn(r.cells, i); if ((pass < 2 && sp.v !== 2) || (pass < 1 && sp.at[0] < 2)) continue; const rest = ok(sp.cells, j + 1); if (rest) return [{ from: cells, dir: CHAIN[j], res: r, sp }, ...rest]; }
      return null; };
    this.STEPS = ok(this.SP.cells, 0); if (!this.STEPS) throw new Error('d1: không tìm được dãy spawn cho dây chuyền');
    const cur = this.STEPS.at(-1).sp.cells;
    this.FINAL = cur;
    must(`JSON.stringify(${JSON.stringify(this.STEPS.map(s => s.res.merges[0].v))})`, '[8,16,32,64,128,256]');
    must(`JSON.stringify(${JSON.stringify(cur)})`, '[[256,0,0,0],[2,4,2,0],[2,2,0,0],[2,0,0,0]]');
    must(`[${GOOD.flat()}].reduce((a, b) => a + b, 0) + ${this.SP.v}`, 256);
    // BAD: không có hai ô kề bằng nhau (bàn không gộp được), hai cặp nhỏ bị 256 chắn
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const v = BAD[r][c]; if (!v) continue;
      if ((c < 3 && BAD[r][c + 1] === v) || (r < 3 && BAD[r + 1][c] === v)) throw new Error(`d1: BAD có cặp kề ${r},${c}`); }
    must(`${BAD[1][0]} === ${BAD[1][2]} && ${BAD[0][1]} === ${BAD[2][1]} && ${BAD[1][1]} === 256`, true);
    // nhịp dây chuyền: 6 lượt, 0.55 s mỗi lượt + quân mới rơi tới hết 0.62 s, xong trước hết câu 39
    this.M0 = T.gattai - 0.1; this.DT = 0.62; this.DUR = 0.55;
    must(`${this.M0 + 6 * this.DT} < ${E(39)}`, true);              // quân mới cuối rơi xong ở M0 + 6·DT
    // thứ tự đặt quân rắn (câu 36): góc trước, rồi dọc SNAKE
    this.PLACE = SNAKE.filter(([r, c]) => GOOD[r][c]).map(([r, c], j) => [r, c, j === 0 ? T.kado - 0.1 : T.hebi + (j - 1) * ((T.naraberu - T.hebi) / 4)]);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const merge = ['chip', null, 'chip', null, null, 'suzu'];             // dây chuyền: 3 tiếng (đầu · giữa · 256), không mỗi lượt
    return [
      actCue(this.FROM, this.START),
      c(T.genkai, 'pen'), c(T.katsu, 'pen'),
      c(T.l35 + 0.1, 'whoosh'), c(T.mina, 'pen'),
      c(T.kado - 0.1, 'koma'), c(T.hebi, 'pen'), c(T.ookii, 'pen'),
      c(T.riyuu, 'pen'),
      c(T.ookiku, 'pen'), c(T.tonari, 'coin'), c(T.tonari + 0.6, 'correct'),
      c(T.narande, 'tick'), ...merge.flatMap((k, i) => k ? [c(this.M0 + i * this.DT + this.DUR * 0.6, k)] : []),
      c(T.mannaka, 'koma'), c(T.toosen, 'pen'),
      c(T.dooshi - 0.4, 'tick'), c(T.nido, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    heading(g, 3, '上手な人の共通点', prog(t, T.l34 + 1.2, T.l34 + 2.2));

    // ── bàn chính ──
    const oGood = out(t, T.l40 - 0.3, 0.7);
    if (oGood < 1) {
      g.save(); g.translate(-(BX + BS + 120) * oGood, 0);
      if (t < T.l35) board(g, LAD, BX, BY, BS, prog(t, this.FROM + 0.3, this.FROM + 1.6));
      else if (t < this.M0) {
        const G = ban(g, BX, BY, BS, 1);
        // bậc thang rời bàn: quân trượt xuống khỏi khung, lệch nhau theo SNAKE ngược (đuôi trước)
        SNAKE.forEach(([r, c], j) => {
          const e = smooth(prog(t, T.l35 + (15 - j) * 0.06, T.l35 + (15 - j) * 0.06 + 0.7)); if (e >= 1) return;
          const [x, y] = G.ctr(r, c); koma(g, LAD[r][c], x, y + e * (H + 200 - y), G.cs, 1, { seed: seedOf(r, c) });
        });
        // rắn giữa ván: góc trước, rồi dọc hình rắn
        for (const [r, c, a] of this.PLACE) koma(g, GOOD[r][c], ...G.ctr(r, c), G.cs, prog(t, a, a + 0.45), { seed: seedOf(r, c) });
        // mũi vàng từ đuôi về góc (= bậc thang) — câu 37, tắt khi dây chuyền bắt đầu
        const chev = SNAKE.slice(0, 5).map((_, i) => [SNAKE[5 - i], SNAKE[4 - i]]);
        chevrons(g, G, chev, t < T.narande ? prog(t, T.kaidan37, T.naka + 0.4) * (1 - prog(t, T.onaji, T.onaji + 0.4)) : prog(t, T.narande, T.narande + 0.8));
        // quân mới 4 (浅葱) rơi ngay cạnh 4 ở đuôi
        const kSp = prog(t, T.tonari, T.tonari + 0.5);
        if (kSp > 0) koma(g, this.SP.v, ...G.ctr(...this.SP.at), G.cs, kSp, { luck: true, seed: 99 });
        // khoanh cặp kề (trung tính)
        const kRing = prog(t, T.tonari + 0.5, T.tonari + 1.1) * (1 - prog(t, T.shippo, T.shippo + 0.4));
        if (kRing > 0) { const [ax, ay] = G.ctr(1, 1), [bx2] = G.ctr(1, 2), x0 = ax - G.cs * 0.5, w = bx2 - ax + G.cs;
          g.save(); g.globalAlpha = clamp(kRing * 1.5); g.strokeStyle = C.goldLt; g.lineWidth = 4; g.setLineDash([14, 9]);
          g.beginPath(); g.roundRect(x0 - 4, ay - G.cs * 0.55, (w + 8) * outCubic(kRing), G.cs * 1.1, 18); g.stroke(); g.restore(); }
      } else {
        // mỗi lượt: vuốt (DUR) rồi quân mới 浅葱 rơi (spawn thật) trước lượt sau; viền 浅葱 theo quân vừa rơi
        const i = Math.min(5, Math.floor((t - this.M0) / this.DT)), st = this.STEPS[i], s0 = this.M0 + i * this.DT;
        const k = prog(t, s0, s0 + this.DUR), kS = prog(t, s0 + this.DUR * 0.75, s0 + this.DT);
        const pa = i === 0 ? this.SP.at : this.STEPS[i - 1].sp.at, pm = st.res.moves.find(m => m.from[0] === pa[0] && m.from[1] === pa[1]);
        const { G } = kS < 1 ? boardMove(g, st.from, st.dir, BX, BY, BS, k, { luck: pm ? [pm.to] : [], spawn: { at: st.sp.at, v: st.sp.v, k: kS } })
          : { G: board(g, st.sp.cells, BX, BY, BS, 1, { luck: [st.sp.at] }) };
        if (i === 5) glint(g, ...G.ctr(0, 0), G.cs, prog(t, this.M0 + 5 * this.DT + this.DUR + 0.1, this.M0 + 5 * this.DT + this.DUR + 0.9));
      }
      g.restore();
    }

    // ── bàn 通せんぼ (câu 40–41): vào từ phải ──
    if (t > T.l40 - 0.3) {
      const e = outCubic(prog(t, T.l40 - 0.2, T.l40 + 0.6));
      g.save(); g.translate((1 - e) * (W - BX + 80), 0);
      const G = ban(g, BX, BY, BS, 1);
      const list = []; BAD.forEach((row, r) => row.forEach((v, c) => { if (v && !(r === 1 && c === 1)) list.push([r, c, v]); }));
      const kDim = prog(t, T.tojiko, T.dooshi + 0.4);
      list.forEach(([r, c, v], j) => {
        const a = T.ookina + j * 0.07, trapped = TRAP.some(([a2, b2]) => a2 === r && b2 === c);
        koma(g, v, ...G.ctr(r, c), G.cs, prog(t, a, a + 0.4), { seed: seedOf(r, c), dim: trapped ? kDim * 0.9 : 0 });
      });
      koma(g, 256, ...G.ctr(1, 1), G.cs, prog(t, T.mannaka - 0.1, T.mannaka + 0.45), { seed: seedOf(1, 1) });
      // 通せんぼ: vạch mực dày trên bốn cạnh ô giữa
      const k5 = prog(t, T.toosen, T.toosen + 0.8), x0 = G.ox + G.cs, y0 = G.oy + G.cs, s = G.cs;
      [[[x0, y0 - 6], [x0, y0 + s + 6]], [[x0 + s, y0 - 6], [x0 + s, y0 + s + 6]], [[x0 - 6, y0], [x0 + s + 6, y0]], [[x0 - 6, y0 + s], [x0 + s + 6, y0 + s]]]
        .forEach((p, j) => brush(g, p, clamp(k5 * 4 - j), { w: 9, color: C.sumi, alpha: 0.9 }));
      TRAP.forEach(([r, c], j) => chainFrame(g, G, r, c, prog(t, T.tojiko + 0.2 + j * 0.15, T.tojiko + 0.9 + j * 0.15)));
      g.restore();
    }

    // ── chữ bên phải: bốn nhóm, mỗi nhóm rời sang phải ──
    const X = 1000, grp = (a, b, f) => { const o = out(t, b, 0.6); if (t < a || o >= 1) return; g.save(); g.translate(900 * o, 0); f(); g.restore(); };
    grp(T.l34 - 0.5, T.l35 - 0.3, () => {
      telop(g, 'この階段は', X, 330, prog(t, T.kaidan, T.kaidan + 0.5), { size: 44, color: '@dim' });
      telop(g, '限界', X, 450, prog(t, T.genkai, T.genkai + 0.5), { size: 80 });
      telop(g, 'であるだけでなく', X + 180, 450, prog(t, T.dake - 0.3, T.dake + 0.6), { size: 40, color: '@dim' });
      telop(g, '勝つための秘訣', X, 620, prog(t, T.katsu, T.hiketsu + 0.4), { size: 80 });
    });
    grp(T.l35 - 0.3, T.l37 - 0.4, () => {
      telop(g, '上手な人は　みな同じ', X, 330, prog(t, T.jouzu, T.mina + 0.6), { size: 56 });
      telop(g, 'いちばん大きなタイルを　角に', X, 470, prog(t, T.ichiban, T.kado + 0.3), { size: 44 });
      telop(g, 'ヘビのように　折り返し', X, 580, prog(t, T.hebi, T.ori + 0.5), { size: 44 });
      telop(g, '大きい順に並べる', X, 690, prog(t, T.ookii, T.naraberu + 0.4), { size: 56 });
    });
    grp(T.l37 - 0.4, T.l40 - 0.4, () => {
      telop(g, '理由は　階段の中に', X, 330, prog(t, T.riyuu, T.naka + 0.3), { size: 56 });
      telop(g, '大きくなるのは', X, 470, prog(t, T.ookiku, T.ookiku + 0.6), { size: 40, color: '@dim' });
      telop(g, [['同じ数', `700 48px ${MIN}`], ['が　', `700 40px ${MIN}`], ['となり', `700 48px ${MIN}`], ['に来たときだけ', `700 40px ${MIN}`]], X, 560, prog(t, T.onaji, T.dake38 + 0.3), { size: 48 });
      luck(g, '新しいタイル', X + 40, 640, prog(t, T.tonari + 0.2, T.tonari + 0.8), { size: 32 });
      telop(g, 'しっぽの1回の合体が', X, 770, prog(t, T.shippo, T.gattai + 0.4), { size: 44 });
      telop(g, '連鎖して　角まで', X, 880, prog(t, T.rensa, T.kakeno + 0.4), { size: 64 });
    });
    grp(T.l40 - 0.4, 1e9, () => {
      telop(g, '大きなタイルが　まん中に', X, 330, prog(t, T.ookina, T.mannaka + 0.4), { size: 48 });
      telop(g, '通せんぼ', X, 490, prog(t, T.toosen, T.toosen + 0.6), { size: 96 });
      telop(g, '後ろの小さなタイルどうしは', X, 650, prog(t, T.ushiro, T.dooshi + 0.4), { size: 40, color: '@dim' });
      telop(g, '二度と出会えない', X, 770, prog(t, T.nido, T.deae + 0.5), { size: 72 });
    });

    actCard(g, t, this.FROM, this.START, 3);
  }
}
