// g3 · Next time (p2, câu 135–139). DNA: lưới đã giải (cùng ô cửa X 712, Y 132, cs 80); "circle the ring … corners" →
// kính đỏ vòng + kính xanh góc, "ring = corners"; "add up" → kính nhấc, vuông 4×4 trái trên lắp đỏ, 5×5 phải dưới lắp
// xanh, tổng đếm lên (code); "forty-five" → 5×5 − 4×4 = 45; mascot `wave` (phải, NÓI); biển kênh "99% FROM SCRATCH" +
// "SUBSCRIBE" khắc xong trước hết câu 138 rồi ĐỨNG YÊN tới hết (tail p2 2.0 s → ≥ 4.7 s).
import { H, C, prog, lookup, must, outCubic, hash, ground, window9, outline, it, label, eq, num, figure, sectionTag,
  CELLS, RING, CORNERS, SQ_SMALL, SQ_BIG, D, sum } from '../kit.js';

const GX = 712, GY = 132, CS = 80;
const has = (cells, r, c) => cells.some(([a, b]) => a === r && b === c);
const idx = (cells, r, c) => cells.findIndex(([a, b]) => a === r && b === c);
/** Kính một ô theo chuỗi sự kiện [[t0, kind], …] (tăng dần): kính cũ nhấc ra 0.2 s rồi kính mới lắp vào 0.3 s. */
function glass(ev, t, k0 = 'clear') {
  let cur = k0, from = null, t0 = 0;
  for (const [te, kind] of ev) if (t >= te) { from = cur; cur = kind; t0 = te; }
  if (from === null || from === cur) return [cur, 1];
  return t - t0 < 0.2 ? [from, 1 - (t - t0) / 0.2] : [cur, Math.min(1, (t - t0 - 0.2) / 0.3)];
}
const S4 = sum(SQ_SMALL), S5 = sum(SQ_BIG);
// thứ tự cộng: theo hàng
const ORD4 = SQ_SMALL.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), ORD5 = SQ_BIG.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const partial = (ord, n) => ord.slice(0, n).reduce((s, [r, c]) => s + D(r, c), 0);

export default class Next {
  static ERA = 'glass';
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g3');
    this.T = {
      next: w(135, 'next'), finish: w(135, 'finish'), throw: w(135, 'throw'),
      circle: w(136, 'circle'), ring: w(136, 'ring'), corners: w(136, 'corners'), compare: w(136, 'compare'),
      start137: L(137).start, add: w(137, 'add'), four: w(137, 'four', 1), left: w(137, 'left'), five: w(137, 'five', 1), right: w(137, 'right'),
      start138: L(138).start, ff: w(138, 'forty-five'), every: w(138, 'every'), end138: L(138).end,
      thanks: w(139, 'thanks'), end: L(139).end,
    };
    this.START = L(135).start;
    this.FROM = Math.max(this.START - 1.2, L(134).end + 0.5);
    must(`${S5} − ${S4}`, 45);
    must(`${SQ_SMALL.length} + 9`, SQ_BIG.length);
    const T = this.T, ev = new Map();
    this.c4 = T.four;   // 4×4 lắp từ "four by four", đếm 16 ô trong ~1.3 s
    this.c5 = T.five;   // 5×5 từ "five by five", 25 ô trong ~1.6 s
    for (const [r, c] of CELLS) {
      const e = [], i = r * 9 + c;
      if (has(RING, r, c)) e.push([T.circle + idx(RING, r, c) * 0.03, 'red']);
      if (has(CORNERS, r, c)) e.push([T.corners - 0.15 + idx(CORNERS, r, c) * 0.03, 'blue']);
      if (has(RING, r, c) || has(CORNERS, r, c)) e.push([T.add + hash(i) * 0.25, 'clear']);
      if (has(SQ_SMALL, r, c)) e.push([this.c4 + idx(ORD4, r, c) * 0.08, 'red']);
      if (has(SQ_BIG, r, c)) e.push([this.c5 + idx(ORD5, r, c) * 0.065, 'blue']);
      ev.set(i, e.sort((a, b) => a[0] - b[0]));
    }
    this.EV = ev;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ring, kind: 'chip' }, { t: T.compare + 0.3, kind: 'pen' },
      ...ORD4.map((_, i) => ({ t: this.c4 + i * 0.08 + 0.2, kind: 'tick', db: -6 })).filter((_, i) => i % 3 === 0),
      ...ORD5.map((_, i) => ({ t: this.c5 + i * 0.065 + 0.2, kind: 'tick', db: -6 })).filter((_, i) => i % 4 === 0),
      { t: T.ff, kind: 'shimmer' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'ACT VI · NEXT TIME', prog(t, this.FROM + 0.3, this.FROM + 0.9));

    // ô cửa: lưới đã giải (vật xuyên suốt)
    const st = (r, c) => glass(this.EV.get(r * 9 + c), t);
    const P = window9(g, GX, GY, CS, { kindOf: (r, c) => st(r, c)[0], kOf: (r, c) => st(r, c)[1] });
    const off = 1 - prog(t, T.add, T.add + 0.4);
    outline(g, P, RING, C.redT, Math.min(prog(t, T.ring, T.ring + 0.5), off), 6);
    outline(g, P, CORNERS, C.blueT, Math.min(prog(t, T.corners + 0.2, T.corners + 0.7), off), 6);
    outline(g, P, SQ_SMALL, C.redT, prog(t, T.left - 0.2, T.left + 0.3), 6);
    outline(g, P, SQ_BIG, C.blueT, prog(t, T.right - 0.2, T.right + 0.3), 6);

    // trái, nhóm 1 (135–136) → trượt ra ở câu 137
    const o1 = outCubic(prog(t, T.start137 - 0.2, T.start137 + 0.4));
    if (o1 < 1) {
      g.save(); g.translate(-760 * o1, 0);
      it(g, 'next time you finish one,', 96, 250, 44, C.ink, { k: prog(t, T.next, T.finish + 0.5) });
      label(g, 'don’t throw it away', 96, 300, { k: prog(t, T.throw - 0.2, T.throw + 0.5) });
      label(g, 'circle and compare', 96, 380, { k: prog(t, T.circle, T.circle + 0.5) });
      eq(g, [['ring', C.redT], [' = '], ['corners', C.blueT]], 96, 450, 60, { k: Math.max(prog(t, T.ring, T.ring + 0.4) * 0.34, prog(t, T.corners, T.compare + 0.4)) });
      g.restore();
    }
    // trái, nhóm 2 (137–138): hai tổng đếm lên → hiệu 45 (đứng tới hết)
    label(g, 'add them up', 96, 220, { k: prog(t, T.add, T.add + 0.5) });
    const n4 = Math.floor(16 * prog(t, this.c4 + 0.2, this.c4 + 0.2 + 15 * 0.08 + 0.01)), n5 = Math.floor(25 * prog(t, this.c5 + 0.2, this.c5 + 0.2 + 24 * 0.065 + 0.01));
    const k4 = prog(t, this.c4 - 0.2, this.c4 + 0.2), k5 = prog(t, this.c5 - 0.2, this.c5 + 0.2);
    eq(g, [['4×4', C.redT], [' top left']], 96, 300, 44, { k: k4 });
    if (k4 >= 1) num(g, partial(ORD4, n4), 520, 300, 46, C.ink, { align: 'right' });
    eq(g, [['5×5', C.blueT], [' bottom right']], 96, 370, 44, { k: k5 });
    if (k5 >= 1) num(g, partial(ORD5, n5), 520, 370, 46, C.ink, { align: 'right' });
    eq(g, [['5×5', C.blueT], [' − '], ['4×4', C.redT], [' = 45']], 96, 470, 60, { k: prog(t, T.start138, T.ff + 0.3) });
    label(g, 'every time', 96, 514, { k: prog(t, T.every, T.every + 0.4) });

    // biển kênh: một tấm kính trong khung chì, khắc xong TRƯỚC hết câu 138, rồi đứng yên tới hết trang
    const a = T.end138 - 0.9, kb = prog(t, a, a + 0.3);
    if (kb > 0) {
      g.save(); g.globalAlpha = kb; g.fillStyle = C.lead; g.beginPath(); g.roundRect(86, 620, 560, 250, 12); g.fill(); g.restore();
      g.save(); g.globalAlpha = kb; g.fillStyle = C.clear; g.beginPath(); g.roundRect(98, 632, 536, 226, 6); g.fill();
      const gr = g.createLinearGradient(98, 632, 400, 858); gr.addColorStop(0, 'rgba(255,255,255,0.5)'); gr.addColorStop(0.35, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fill(); g.restore();
    }
    if (kb > 0) {
      num(g, '99% FROM SCRATCH', 366, 730, 46, C.ink, { align: 'center', k: prog(t, a + 0.15, a + 0.6) });
      g.save(); g.globalAlpha = prog(t, a + 0.5, a + 0.7); g.fillStyle = C.lead; g.beginPath(); g.roundRect(216, 768, 300, 70, 8); g.fill(); g.restore();
      label(g, 'subscribe', 366, 814, { size: 30, align: 'center', color: C.clear, k: prog(t, a + 0.55, a + 0.85) });
    }

    // mascot wave (phải, chân chạm đáy), NÓI: trồi lên ở câu 138, ở lại tới hết
    const kin = outCubic(prog(t, T.start138 - 0.4, T.start138 + 0.3));
    if (kin > 0) { g.save(); g.translate(0, (1 - kin) * 600); figure(g, 'wave', 1688, H, 540, 1, { t }); g.restore(); }
  }
}
