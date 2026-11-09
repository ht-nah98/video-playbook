// Hồi 1 · "The two jobs of zero" (SCRIPT.md) — p2 câu 23–33. Trang chia đôi, LỖ ở nhà (960, 640) nằm trên đường chia.
//   23     "two very different things": đường chia dọc kẻ xuống (đứt quanh lỗ) · JOB 1 / JOB 2
//   24–27  JOB 1 · HOLDS A PLACE: cột TH H T O · 305 viết vào, số 0 khoanh → thành LỖ NHỎ · 35 / 305 / 3050 thẳng cột
//          (chữ số 0 nào cũng là một lỗ) · "Nothing more."
//   28–30  JOB 2 · A NUMBER: trục số −3 … 3, số 0 nằm TRÊN trục giữa âm và dương · 5 − 5 = 0 · rổ rỗng (0 táo) ·
//          trục toạ độ nhỏ với gốc
//   31     nửa JOB 1 trượt xuống khỏi trang · mascot `ok` trồi lên bên trái (vòng ngón tay = số 0, khoanh mực) ·
//          "— BRAHMAGUPTA · 628" cạnh JOB 2 · "calculation": khoanh 5 − 5 = 0
//   32     mascot lặn · nửa JOB 2 trượt sang phải · đường chia bị hút vào lỗ
//   33     "Division." — DIVISION đỏ, to; lỗ mở rộng ngay dưới chữ (dẫn sang Hồi 2)
import { ERA, W, H, clamp, smooth, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, ring, arrow, card, figure, lens } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640;
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

// ── cột giá trị: chữ số TÍNH từ số, căn theo hàng đơn vị (DNA §9) ──
const COLX = { 3: 470, 2: 560, 1: 650, 0: 740 };              // TH, H, T, O (tâm cột)
const ROWS = [{ n: 35, y: 470 }, { n: 305, y: 590 }, { n: 3050, y: 710 }];
const digits = n => String(n).split('').reverse().map((d, p) => ({ d, p }));   // p = luỹ thừa của 10
for (const { n } of ROWS) if (digits(n).reduce((a, { d, p }) => a + Number(d) * 10 ** p, 0) !== n) throw new Error('b2: cột giá trị sai ' + n);
if (3 * 100 + 0 * 10 + 5 !== 305 || 3 * 1000 + 0 * 100 + 5 * 10 + 0 !== 3050 || 3 * 10 + 5 !== 35) throw new Error('b2: 35/305/3050 sai');
if (5 - 5 !== 0) throw new Error('b2: 5 − 5');
const NL = { x0: 1120, du: 100, y: 400 };                      // trục số −3 … 3, số 0 ở x0 + 3·du
const ZX = NL.x0 + 3 * NL.du;

/** Rổ nét tay (hình thang, nan đan, quai); k vẽ dần. */
function basket(g, x, y, w, h, k, seed) {
  if (k <= 0) return;
  const b = w * 0.78, P = [[x - w / 2, y], [x - b / 2, y + h], [x + b / 2, y + h], [x + w / 2, y], [x - w / 2, y]];
  hand(g, P, { w: 4, color: E.ink, seed, k: clamp(k * 2) });
  for (let i = 1; i < 3; i++) { const v = i / 3, hw = (w + (b - w) * v) / 2;
    hand(g, seg(x - hw, y + h * v, x + hw, y + h * v, 8), { w: 2, color: E.ink, seed: seed + i, k: clamp(k * 3 - 1 - i * 0.3) }); }
  for (let i = 1; i < 5; i++) { const u = i / 5 - 0.5;
    hand(g, seg(x + u * w, y, x + u * b, y + h, 4), { w: 2, color: E.ink, seed: seed + 9 + i, k: clamp(k * 3 - 1.4 - i * 0.1) }); }
  const H2 = Array.from({ length: 21 }, (_, i) => { const a = Math.PI + i / 20 * Math.PI; return [x + Math.cos(a) * w * 0.4, y + Math.sin(a) * h * 0.9]; });
  hand(g, H2, { w: 4, color: E.ink, seed: seed + 20, k: clamp(k * 2 - 1) });
}

export default class Jobs {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      zero23: w(23, 'zero'), two: w(23, 'two'), different: w(23, 'different'),
      first: w(24, 'first'), holding: w(24, 'holding'), easy: w(24, 'easy'),
      three25: w(25, 'three'), five25: w(25, 'five'), zero25: w(25, 'zero'), tens: w(25, 'tens'), empty: w(25, 'empty'),
      notation: w(26, 'notation'), thirty: w(26, 'thirty-five'), three26: w(26, 'three'), thousand: w(26, 'thousand'), fifty: w(26, 'fifty'),
      nothing: w(27, 'nothing'),
      second: w(28, 'second'), hard: w(28, 'hard'), real: w(28, 'real'),
      sits: w(29, 'sits'), line: w(29, 'line'), right: w(29, 'right'), positive: w(29, 'positive'), negative: w(29, 'negative'),
      five30: w(30, 'five'), minus: w(30, 'minus'), five30b: w(30, 'five', 2), apples: w(30, 'apples'), basket: w(30, 'basket'),
      origin: w(30, 'origin'), graph: w(30, 'graph'),
      brahma: w(31, 'brahmagupta'), say: w(31, 'say'), zero31: w(31, 'zero'), placeholder: w(31, 'placeholder'), number31: w(31, 'number'),
      calculation: w(31, 'calculation'),
      moment: w(32, 'moment'), problem: w(32, 'problem'), video: w(32, 'video'),
      division: w(33, 'division'),
    };
    this.START = L(23).start;
    this.FROM = this.START - 1.2;
    this.LENS = ((T, F) => [[F, 960, 540, 1], [T.first - 0.3, 960, 540, 1], [T.first + 0.6, 662, 560, 1.45], [T.second - 0.4, 662, 560, 1.45], [T.second + 0.6, 1340, 560, 1.25], [T.brahma - 0.4, 1340, 560, 1.25], [T.brahma + 0.6, 960, 540, 1]])(this.T, this.FROM);
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.zero23 - 0.1, kind: 'pen' },        // "ZERO" viết trên lỗ
      { t: T.two - 0.3, kind: 'whoosh' },        // "ZERO" bị hút vào lỗ
      { t: T.three25, kind: 'pen' },             // 305 viết vào cột
      { t: T.empty, kind: 'pop' },               // số 0 thủng thành lỗ nhỏ
      { t: T.thirty, kind: 'pen' },              // 35
      { t: T.thousand - 0.3, kind: 'pen' },      // 3050
      { t: T.sits, kind: 'pen' },                // trục số −3 … 3
      { t: T.right - 0.1, kind: 'pop' },         // 0 trên trục: lỗ nhỏ
      { t: T.five30, kind: 'pen' },              // 5 − 5 = 0
      { t: T.apples - 0.2, kind: 'pop' },        // rổ rỗng
      { t: T.problem + 0.3, kind: 'whoosh' },    // đường chia bị hút vào lỗ
      { t: T.division - 0.1, kind: 'impact' },   // DIVISION đỏ, lỗ mở rộng — chốt Hồi 1
    ];
  }
  render(g, t) {
    const T = this.T;
    g.save(); lens(g, this.LENS, t);                         // camera đẩy vào chỗ đang đọc (bản 2)
    ground(g, 'page');
    card(g, 'page', prog(t, this.FROM, this.FROM + 1.0), 'ACT ONE · NOTHING', 'The two jobs of zero');

    // ── 32: nửa trái đi trước (31), nửa phải sau (32); đường chia bị hút vào lỗ ──
    const outL = outCubic(prog(t, T.brahma - 0.1, T.brahma + 0.6)), outR = outCubic(prog(t, T.problem, T.problem + 0.7));
    const suck = outCubic(prog(t, T.problem + 0.3, T.video + 0.5));
    const dk = prog(t, T.two - 0.2, T.different + 0.3);
    if (suck < 1) {                                             // đường chia: trên 230 → lỗ, lỗ → 1000; co về lỗ khi bị hút
      const top = 230 + (HY - 75 - 230) * suck, bot = 1000 - (1000 - HY - 75) * suck;
      hand(g, seg(HX, top, HX, HY - 75, 12), { w: 3, color: E.ink, seed: 12, k: clamp(dk * 2) });
      hand(g, seg(HX, HY + 75, HX, bot, 12), { w: 3, color: E.ink, seed: 13, k: clamp(dk * 2 - 1) });
    }

    // ── JOB 1 (nửa trái) ──
    if (outL < 1) {
      g.save(); g.translate(0, outL * 760);
      typed(g, 'JOB 1', 200, 260, prog(t, T.two, T.two + 0.3), M(28), E.ink);
      typed(g, '· HOLDS A PLACE', 300, 260, prog(t, T.holding, T.holding + 0.6), M(28), E.ink);
      typed(g, 'EASY', 200, 296, prog(t, T.easy, T.easy + 0.3), M(20), E.dim);
      // nhãn cột TH H T O; T gạch chân lúc "tens"
      const kc = prog(t, T.three25 - 0.4, T.three25);
      ['TH', 'H', 'T', 'O'].forEach((s, i) => typed(g, s, COLX[3 - i], 362, kc, M(22), E.dim, { align: 'center' }));
      hand(g, seg(COLX[1] - 22, 372, COLX[1] + 22, 372, 4), { w: 3, color: E.ink, seed: 31, k: prog(t, T.tens, T.tens + 0.3) });
      hand(g, seg(COLX[3] - 50, 380, COLX[0] + 50, 380, 16), { w: 2, color: E.dim, seed: 32, k: kc });
      // ba hàng số: viết đúng lúc đọc; mỗi số 0 khoanh rồi thủng thành lỗ nhỏ
      const when = [
        { w0: T.thirty, w1: T.thirty + 0.6, ring: T.thirty + 0.6 },
        { w0: T.three25, w1: T.five25 + 0.2, ring: T.zero25, open: T.empty },
        { w0: T.thousand - 0.3, w1: T.fifty + 0.2, ring: T.fifty + 0.3 },
      ];
      ROWS.forEach(({ n, y }, r) => {
        const D = digits(n), m = D.length, wn = when[r];
        D.forEach(({ d, p }) => {
          const i = m - 1 - p, k = prog(t, wn.w0 + (wn.w1 - wn.w0) * i / m, wn.w0 + (wn.w1 - wn.w0) * (i + 1) / m);
          if (d !== '0') { typed(g, d, COLX[p], y, k, A(92), E.ink, { align: 'center' }); return; }
          const kr = prog(t, wn.ring, wn.ring + 0.4), ko = outBack(prog(t, wn.open ?? wn.ring + 0.3, (wn.open ?? wn.ring + 0.3) + 0.4));
          if (ko < 0.6) typed(g, d, COLX[p], y, k, A(92), E.ink, { align: 'center' });
          if (ko > 0) hole(g, COLX[p], y - 33, 26 * ko, null, { seed: 40 + r * 4 + p });
          ring(g, COLX[p], y - 33, 44, 46, kr, { color: E.ink, w: 3, seed: 50 + r * 4 + p });
        });
      });
      // "from three hundred and five": ngoặc mực nối 35 ↔ 305
      arrow(g, 820, 450, 820, 560, prog(t, T.three26 - 0.1, T.three26 + 0.4), { bend: -40, seed: 61 });
      typed(g, 'Nothing more.', 260, 850, prog(t, T.nothing - 0.05, T.nothing + 0.5), I(64), E.ink);
      g.restore();
    }

    // ── JOB 2 (nửa phải) ──
    if (outR < 1) {
      g.save(); g.translate(outR * 980, 0);
      const x2 = 1040;
      typed(g, 'JOB 2', x2, 260, prog(t, T.two + 0.3, T.two + 0.6), M(28), E.ink);
      typed(g, '· A NUMBER', x2 + 100, 260, prog(t, T.real, T.real + 0.5), M(28), E.ink);
      typed(g, 'HARD', x2, 296, prog(t, T.hard, T.hard + 0.3), M(20), E.dim);
      typed(g, '— BRAHMAGUPTA · 628', x2 + 350, 260, prog(t, T.brahma, T.brahma + 0.8), M(22), E.dim);
      ring(g, x2 + 138, 248, 156, 28, prog(t, T.number31, T.number31 + 0.5), { color: E.ink, w: 3, seed: 71 });
      // trục số −3 … 3
      const kl = prog(t, T.sits, T.line + 0.4);
      hand(g, seg(NL.x0 - 50, NL.y, NL.x0 + 6 * NL.du + 50, NL.y, 30), { w: 4, color: E.ink, seed: 72, k: kl });
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue;
        const x = ZX + i * NL.du, k = prog(t, T.line + (i + 3) * 0.08, T.line + (i + 3) * 0.08 + 0.25);
        hand(g, seg(x, NL.y - 12, x, NL.y + 12, 3), { w: 3, color: E.ink, seed: 80 + i, k });
        typed(g, i < 0 ? '−' + -i : String(i), x, NL.y + 56, k, A(38), E.ink, { align: 'center' });
      }
      const kz = outBack(prog(t, T.right - 0.1, T.right + 0.3));        // 0 nằm TRÊN trục: một lỗ nhỏ + nhãn to
      if (kz > 0) hole(g, ZX, NL.y, 14 * kz, null, { seed: 88 });
      typed(g, '0', ZX, NL.y + 64, prog(t, T.right, T.right + 0.2), A(56), E.ink, { align: 'center' });
      const brace = (x0, x1, k, s, seed) => {
        hand(g, [[x0, NL.y - 30], [x0, NL.y - 44], [x1, NL.y - 44], [x1, NL.y - 30]], { w: 2, color: E.dim, seed, k });
        typed(g, s, (x0 + x1) / 2, NL.y - 58, k * 2 - 1, M(20), E.dim, { align: 'center' });
      };
      brace(ZX + 40, ZX + 3 * NL.du + 20, prog(t, T.positive, T.positive + 0.4), 'POSITIVE', 91);
      brace(ZX - 3 * NL.du - 20, ZX - 40, prog(t, T.negative, T.negative + 0.4), 'NEGATIVE', 92);
      // 5 − 5 = 0
      const eq = `5 − 5 = ${5 - 5}`;
      typed(g, eq, x2 + 20, 590, prog(t, T.five30, T.five30b + 0.5), A(72), E.ink);
      ring(g, x2 + 165, 566, 175, 52, prog(t, T.calculation, T.calculation + 0.5), { color: E.ink, w: 3, seed: 93 });
      // rổ rỗng: 0 táo
      basket(g, x2 + 130, 745, 190, 110, prog(t, T.apples - 0.2, T.basket + 0.3), 100);
      typed(g, `APPLES: ${0}`, x2 + 130, 912, prog(t, T.basket, T.basket + 0.4), M(22), E.ink, { align: 'center' });
      // trục toạ độ nhỏ, gốc là một lỗ nhỏ
      const ox = 1540, oy = 820, ka = prog(t, T.origin - 0.3, T.origin + 0.4);
      arrow(g, ox - 40, oy, ox + 240, oy, ka, { seed: 110 });
      arrow(g, ox, oy + 40, ox, oy - 250, ka, { seed: 111 });
      const ko = outBack(prog(t, T.origin + 0.2, T.origin + 0.6));
      if (ko > 0) hole(g, ox, oy, 12 * ko, null, { seed: 112 });
      typed(g, 'ORIGIN', ox + 18, oy + 40, prog(t, T.graph, T.graph + 0.4), M(20), E.dim);
      // một đường vẽ qua gốc (y = x/2, tính bằng hàm)
      const P = Array.from({ length: 21 }, (_, i) => { const x = 16 + i * 10; return [ox + x, oy - x * 0.5]; });
      hand(g, P, { w: 3, color: E.ink, seed: 113, k: prog(t, T.graph, T.graph + 0.6) });
      g.restore();
    }

    // ── 33: lỗ mở dưới chữ DIVISION ──
    const open = outBack(prog(t, T.division, T.division + 0.5));
    hole(g, HX, HY, 60 + 14 * smooth(prog(t, T.problem, T.division)) + 36 * open, null, { seed: 3 });
    // "when we talk about zero": chữ ZERO viết trên lỗ, rồi bị hút vào lỗ ở "two" (review §4 — mở mục không đứng yên)
    const zk = prog(t, T.zero23 - 0.1, T.zero23 + 0.4), zin = outCubic(prog(t, T.two - 0.3, T.two + 0.3));
    if (zk > 0 && zin < 1) { g.save(); g.translate(HX, HY - 110 * (1 - zin)); g.scale(1 - zin, 1 - zin);
      typed(g, 'ZERO', 0, 0, zk, '800 56px "Archivo"', E.ink, { align: 'center' }); g.restore(); }
    typed(g, 'DIVISION', HX, 480, prog(t, T.division - 0.1, T.division + 0.3), A(120), E.accent, { align: 'center' });

    // ── 31: mascot `ok` bên trái; vòng ngón tay = số 0, khoanh mực ──
    const fk = prog(t, T.say - 0.3, T.say + 0.05) - prog(t, T.moment, T.moment + 0.4);
    if (fk > 0) {
      figure(g, 'ok', 300, H, 700, 'page', fk);
      const rise = (1 - outBack(clamp(fk))) * 700 * 0.5;            // cùng độ trồi của figure (kit)
      ring(g, 200, 612 + rise, 44, 44, prog(t, T.zero31, T.zero31 + 0.4), { color: E.ink, w: 3, seed: 121 });
    }
    g.restore();
  }
}
