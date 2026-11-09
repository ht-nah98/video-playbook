// h1 · 何も入れなかったら (p2 câu 109–112, mở hồi 7). DNA: 「đồng xu … 37 lần rơi về hai phía gương (19 / 18)」.
//  109 thẻ hồi 第七幕 → hai ống nghiệm TRỐNG hai phía gương; găng tay một tay (bóng nét đứt, phía 左) bay đi: 「何も入れない → どうなる？」
//  110 ống rời xuống; 「硤合さんたち」「37回」 — mỗi lần chạy = một hạt bắn ra từ đỉnh gương, rơi về MỘT phía (thứ tự cố định bằng hash)
//  111 「毎回、どちらかが多い」 — hạt tiếp tục chất thành hai đống
//  112 「19回」 (左) / 「18回」 (右) trên đống, 「19 + 18 = 37」; まるでコイン → mascot `coin-flip` (không nói) bên phải búng đồng xu.
import { W, H, C, MX, clamp, prog, lookup, must, outCubic, smooth, hash, ground, mirror, telop, title, actCard, actCues,
  tube, hand, coin, figure, floorShadow, cue, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// 37 lần chạy: 19 về 左, 18 về 右 (CONTENT: S 19 / R 18 — chỉ giữ số đếm, phía là vị trí). Thứ tự xen kẽ cố định bằng hash.
const N = 37, NL = 19, NR = 18;
const SEQ = Array.from({ length: N }, (_, i) => ({ side: i < NL ? 'L' : 'R', key: hash(i * 7.31 + 2.2) })).sort((a, b) => a.key - b.key).map(o => o.side);
// ô trong đống: 5 cột, chồng lên từ mặt bàn; đống 左 tâm x 710, 右 = ảnh gương 1150
const COLS = 5, GAP = 38, R0 = 15, PX = 710, PY = 812;
const slot = (side, j) => { const c = j % COLS, r = Math.floor(j / COLS), x = PX + (c - 2) * GAP; return { x: side === 'L' ? x : 2 * MX - x, y: PY - r * GAP }; };

export default class Coin {
  static ERA = 'mirror';
  static POSES = ['coin-flip'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l109: S(109), kata: w(109, '片手'), nani: w(109, '何'), ire: w(109, '入れなかったら'), dou: w(109, 'どう'),
      l110: S(110), soai: w(110, '硤合'), n37: w(110, '37回'),
      l111: S(111), maikai: w(111, '毎回'), ooku: w(111, '多く'),
      l112: S(112), n19: w(112, '19回'), n18: w(112, '18回'), marude: w(112, 'まるで'), koin: w(112, 'コイン'), end: E(112),
    };
    this.START = S(109);
    this.FROM = Math.max(this.START - 2.6, E(108) + 0.5);
    const T = this.T;
    // mỗi lần chạy rơi trong [37回 + 0.4, đầu câu 112]; j = vị trí trong đống phía đó
    const a0 = T.n37 + 0.4, dt = (T.l112 - 0.2 - a0) / N, cnt = { L: 0, R: 0 };
    this.RUNS = SEQ.map((side, i) => ({ side, t0: a0 + i * dt, j: cnt[side]++ }));
    must(`${cnt.L} + ${cnt.R}`, 37); must(`${cnt.L}`, 19); must(`${cnt.R}`, 18);
    must(`${NL} + ${NR}`, 37);
    this.FIG = { cx: 1640, h: 760 };
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.nani, 'telop'), cue(T.n37, 'telop'), cue(T.maikai, 'telop', -4),
      cue(T.n19, 'telop'), cue(T.n18, 'telop'),
      ...this.RUNS.filter((r, i) => (i % 11 === 0 || i % 11 === 8) && Math.abs(r.t0 + 0.6 - T.n19) > 0.4 && Math.abs(r.t0 + 0.6 - T.maikai) > 0.4).map(r => cue(r.t0 + 0.6, 'tick', -12)),
      cue(T.koin, 'coin'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    title(g, '何も入れなかったら', t, T.nani - 0.3);

    // ── 109: hai ống nghiệm trống hai phía gương; găng tay một tay bay đi ──
    const oT = out(t, T.l110 - 0.3, 0.6);
    if (oT < 1) {
      g.save(); g.translate(0, 720 * oT);
      const kt = prog(t, this.FROM, this.FROM + 0.5);
      for (const x of [600, 2 * MX - 600]) { floorShadow(g, x, 90 * kt); tube(g, x, 800, 360, kt, { fill: 0.55, n: 0 }); }
      const kg = prog(t, T.kata - 0.2, T.kata + 0.4), up = smooth(prog(t, T.ire, T.ire + 0.8));
      if (up < 1) hand(g, 600 + 60 * up, 330 - 520 * up, 58, kg, { side: 'L', glove: true, ghost: true });
      telop(g, '何も入れない', 600, 900, prog(t, T.nani, T.nani + 0.6), { size: 48, mincho: true, align: 'center' });
      telop(g, 'どうなる？', 2 * MX - 600, 900, prog(t, T.dou, T.dou + 0.5), { size: 48, mincho: true, align: 'center' });
      g.restore();
    }

    // ── 110–111: chữ bên trái ──
    if (t > T.l110 - 0.4) {
      telop(g, '硤合さんたち', 120, 320, prog(t, T.soai, T.soai + 0.5), { size: 40, color: '@dim' });
      telop(g, '37回', 120, 440, prog(t, T.n37, T.n37 + 0.4), { size: 96 });
      telop(g, '毎回、どちらかが多い', 120, 540, prog(t, T.maikai, T.ooku + 0.4), { size: 40, mincho: true });
      telop(g, '19 + 18 = 37', 120, 640, prog(t, T.n18 + 1.0, T.n18 + 1.6), { size: 52 });
    }

    // ── 37 lần chạy: hạt bắn từ đỉnh gương rơi về một phía ──
    for (const r of this.RUNS) {
      const u = prog(t, r.t0, r.t0 + 0.6);
      if (u <= 0) continue;
      const s = slot(r.side, r.j), x0 = MX, y0 = 150, e = smooth(u);
      const x = x0 + (s.x - x0) * e, y = y0 + (s.y - y0) * u * u - 160 * Math.sin(Math.PI * u) * (1 - u);
      const col = r.side === 'L' ? C.L : C.R;
      g.save(); g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.arc(x + 3, y + 5, R0, 0, TAU); g.fill();
      g.fillStyle = col; g.beginPath(); g.arc(x, y, R0, 0, TAU); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.45)'; g.beginPath(); g.arc(x - R0 * 0.35, y - R0 * 0.4, R0 * 0.3, 0, TAU); g.fill();
      g.restore();
    }
    telop(g, '19回', PX, PY - 4 * GAP - 34, prog(t, T.n19, T.n19 + 0.4), { size: 56, color: '@L', align: 'center' });
    telop(g, '18回', 2 * MX - PX, PY - 4 * GAP - 34, prog(t, T.n18, T.n18 + 0.4), { size: 56, color: '@R', align: 'center' });

    // ── 112: まるでコイン — mascot coin-flip bên phải, đồng xu bay (vẽ bằng code) ──
    if (t > T.marude - 0.5) {
      const { cx, h } = this.FIG, kf = prog(t, T.marude - 0.4, T.marude + 0.3);
      const f = figure(g, 'coin-flip', cx, H, h, kf, { t, talk: false });
      if (f && kf >= 0.95) {
        const bx = f.x + 0.15 * f.w, by = f.y + 0.2 * f.h, u = Math.max(0, t - T.koin + 0.2) / 1.3 % 1, up = 4 * u * (1 - u);
        coin(g, bx - 6 * up, by - 250 * up, 26, 1, { spin: (t - T.koin) * 11 });
      }
      telop(g, 'コイン投げのように', 1000, 420, prog(t, T.koin, T.koin + 0.6), { size: 44, mincho: true });
    }

    mirror(g);
    actCard(g, t, this.FROM, this.START, 7);
  }
}
