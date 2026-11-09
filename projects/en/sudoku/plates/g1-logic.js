// g1 · A computer can do it (p2, câu 124–130) — MỞ HỒI VI "Just logic?". DNA: khung chì tự điền số trong tích tắc
// nhưng KHÔNG có kính màu (máy giải xong); rồi kính đỏ/xanh lắp vào: máy không hề thấy vòng; vuông 5×5 hơn 4×4 đúng 45;
// bằng chứng 17 nhờ hiểu "families" + "unavoidable sets" (hình chữ nhật 7/9 trên chính lưới, code chọn). Mascot
// `calculator` (phải, nhìn sang ô cửa, NÓI) quanh "a computer can solve…". Kết: computing / mathematics.
import { H, C, prog, lookup, must, outCubic, hash, ground, dark, window9, it, label, eq, figure, sectionTag,
  actCard, actFlash, D, CELLS, boxOf, RING, CORNERS, SQ_SMALL, SQ_BIG, sum } from '../kit.js';

const GX = 712, GY = 132, CS = 80;
const has = (cells, r, c) => cells.some(([a, b]) => a === r && b === c);
/** Kính một ô theo chuỗi sự kiện [[t0, kind], …] (tăng dần): kính cũ nhấc ra 0.2 s rồi kính mới lắp vào 0.3 s. */
function glass(ev, t, k0 = 'clear') {
  let cur = k0, from = null, t0 = 0;
  for (const [te, kind] of ev) if (t >= te) { from = cur; cur = kind; t0 = te; }
  if (from === null || from === cur) return [cur, 1];
  return t - t0 < 0.2 ? [from, 1 - (t - t0) / 0.2] : [cur, Math.min(1, (t - t0 - 0.2) / 0.3)];
}
// gợi ý kiểu báo in: ~25 ô (chọn tất định bằng hash) — hình minh hoạ, không tuyên bố gì về câu đố
const CLUE = new Set(CELLS.map(([r, c]) => r * 9 + c).sort((a, b) => hash(a * 3.7) - hash(b * 3.7)).slice(0, 25));
const FILL = CELLS.map(([r, c]) => r * 9 + c).filter(i => !CLUE.has(i)).sort((a, b) => hash(a * 9.1) - hash(b * 9.1));
const fillIdx = new Map(FILL.map((i, n) => [i, n]));
// hình chữ nhật không tránh được: 2 hàng, 2 cột, ĐÚNG 2 khối, hai số a/b chéo nhau — đổi a↔b vẫn hợp lệ (CONTENT sửa 2).
// Lưới này KHÔNG có hình chữ nhật 7/9 nào trong đúng 2 khối (đã quét) → lấy hình đầu tiên (r1/r2, c4/c8: 9/8).
const RECT = (() => {
  for (let r1 = 0; r1 < 9; r1++) for (let r2 = r1 + 1; r2 < 9; r2++) for (let c1 = 0; c1 < 9; c1++) for (let c2 = c1 + 1; c2 < 9; c2++) {
    const a = D(r1, c1), b = D(r1, c2);
    if (a === b || D(r2, c2) !== a || D(r2, c1) !== b) continue;
    const ce = [[r1, c1], [r1, c2], [r2, c1], [r2, c2]];
    if (new Set(ce.map(([r, c]) => boxOf(r, c))).size === 2) return ce;
  }
  return null;
})();

export default class Logic {
  static ERA = 'glass';
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    this.T = {
      maths: w(124, 'mathematicians'), dull: w(124, 'dull'),
      logic: w(125, 'logic'), computer: w(125, 'computer'), solve: w(125, 'solve'), fraction: w(125, 'fraction'), end125: L(125).end,
      true: w(126, 'true'), notice: w(126, 'notice'), cant: w(126, "can't"),
      start127: L(127).start, noticing: w(127, 'noticing'), ring: w(127, 'ring'),
      ring2: w(128, 'ring'), square: w(128, 'square', 1), tf: w(128, 'twenty-five'), sixteen: w(128, 'sixteen'), ff: w(128, 'forty-five'),
      start129: L(129).start, proof: w(129, 'seventeen-clue'), year: w(129, 'year'), understood: w(129, 'understood'),
      families: w(129, 'families'), unav: w(129, 'unavoidable'),
      computing: w(130, 'computing'), knowing: w(130, 'knowing'), maths2: w(130, 'mathematics'), end: L(130).end,
    };
    this.START = L(124).start;
    this.FROM = Math.max(this.START - 2.6, L(123).end + 0.5);
    must(`${RECT !== null}`, true);
    must(`${new Set(RECT.map(([r, c]) => boxOf(r, c))).size}`, 2);
    must(`${sum(SQ_BIG)} − ${sum(SQ_SMALL)}`, 45);
    const T = this.T, ev = new Map();
    // kính: vòng đỏ (lúc "noticing … ring"), góc xanh ("why the ring is there"), đổi sang hai vuông ("square of twenty-five
    // … sixteen"), nhấc hết về kính trong ("families")
    for (const [r, c] of CELLS) {
      const e = [], i = r * 9 + c;
      if (has(RING, r, c)) e.push([T.noticing + RING.findIndex(([a, b]) => a === r && b === c) * 0.04, 'red']);
      if (has(CORNERS, r, c)) e.push([T.ring2 - 0.1 + CORNERS.findIndex(([a, b]) => a === r && b === c) * 0.03, 'blue']);
      if (has(RING, r, c) || has(CORNERS, r, c)) e.push([T.square + (hash(i) * 0.25), 'clear']);
      if (has(SQ_BIG, r, c)) e.push([T.tf + SQ_BIG.findIndex(([a, b]) => a === r && b === c) * 0.03, 'blue']);
      if (has(SQ_SMALL, r, c)) e.push([T.sixteen - 0.1 + SQ_SMALL.findIndex(([a, b]) => a === r && b === c) * 0.03, 'red']);
      if (has(SQ_BIG, r, c) || has(SQ_SMALL, r, c)) e.push([T.families + hash(i + 5) * 0.3, 'clear']);
      ev.set(i, e.sort((a, b) => a[0] - b[0]));
    }
    this.EV = ev;
  }
  sfx() {
    const T = this.T;
    return [{ t: actFlash(this.FROM), kind: 'shimmer' },
      ...[0, 1, 2, 3, 4, 5, 6].map(i => ({ t: T.solve + i * 0.12, kind: 'flap', db: -4 })),
      { t: T.notice, kind: 'pen' }, { t: T.ring, kind: 'chip' }, { t: T.tf, kind: 'chip' }, { t: T.ff + 0.15, kind: 'pen' },
      { t: T.year, kind: 'tick' }, { t: T.unav + 0.2, kind: 'tick' }, { t: T.maths2, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'ACT VI · A COMPUTER CAN DO IT', prog(t, this.START - 0.2, this.START + 0.4));

    // ô cửa trồi lên từ dưới khi thẻ hồi rời đi; gợi ý sẵn, "solve" → số còn lại điền trong tích tắc
    const gin = outCubic(prog(t, this.START - 0.3, this.START + 0.5));
    if (gin > 0) {
      g.save(); g.translate(0, (1 - gin) * 1000);
      const st = (r, c) => glass(this.EV.get(r * 9 + c), t);
      const P = window9(g, GX, GY, CS, { kindOf: (r, c) => st(r, c)[0], kOf: (r, c) => st(r, c)[1],
        digitK: (r, c) => { const i = r * 9 + c; return CLUE.has(i) || t >= T.solve + fillIdx.get(i) * 0.016 ? 1 : 0; } });
      // hình chữ nhật không tránh được: khoanh 4 ô (nét mực trung tính)
      const kr = prog(t, T.unav, T.unav + 0.5);
      if (kr > 0) {
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.globalAlpha = kr;
        RECT.forEach((ce, i) => { const [x, y] = P.ctr(...ce), a = Math.PI * 2 * prog(t, T.unav + 0.08 * i, T.unav + 0.3 + 0.08 * i);
          if (a > 0) { g.beginPath(); g.arc(x, y, CS * 0.4, -Math.PI / 2, -Math.PI / 2 + a); g.stroke(); } });
        g.restore();
      }
      g.restore();
    }

    // trái, nhóm A (124–126) → trượt ra trái ở câu 127
    const oA = outCubic(prog(t, T.start127 - 0.2, T.start127 + 0.4));
    if (oA < 1) {
      g.save(); g.translate(-760 * oA, 0);
      label(g, 'some people · some mathematicians', 96, 200, { k: prog(t, T.maths - 0.6, T.maths + 0.5) });
      it(g, '“a little dull”', 96, 280, 60, C.ink, { k: prog(t, T.dull - 0.2, T.dull + 0.4) });
      label(g, 'pure logic', 96, 340, { k: prog(t, T.logic, T.logic + 0.4) });
      it(g, 'solved in a fraction', 96, 430, 44, C.ink, { k: prog(t, T.fraction - 0.3, T.fraction + 0.3) });
      it(g, 'of a second', 96, 478, 44, C.ink, { k: prog(t, T.fraction + 0.3, T.end125) });
      label(g, 'true.', 96, 560, { k: prog(t, T.true, T.true + 0.3) });
      it(g, 'but what can’t it do?', 96, 620, 44, C.ink, { k: prog(t, T.notice, T.cant + 0.4) });
      g.restore();
    }
    // trái, nhóm B (127–128): vòng, ring = corners, 5×5 − 4×4 = 45 → trượt ra ở câu 129
    const oB = outCubic(prog(t, T.start129 - 0.2, T.start129 + 0.4));
    if (oB < 1) {
      g.save(); g.translate(-760 * oB, 0);
      eq(g, [['it never noticed the '], ['ring', C.redT]], 96, 250, 44, { k: prog(t, T.noticing - 0.3, T.ring + 0.3) });
      eq(g, [['ring', C.redT], [' = '], ['corners', C.blueT]], 96, 340, 60, { k: prog(t, T.ring2, T.ring2 + 0.5) });
      label(g, 'sum of digits', 96, 430, { k: prog(t, T.tf, T.tf + 0.5) });
      eq(g, [['5×5', C.blueT], [' − '], ['4×4', C.redT], [' = 45']], 96, 500, 60, { k: prog(t, T.sixteen, T.ff + 0.3) });
      g.restore();
    }
    // trái, nhóm C (129–130): kết luận
    it(g, 'the 17-clue proof', 96, 250, 52, C.ink, { k: prog(t, T.proof, T.proof + 0.6) });
    label(g, 'about one year of search', 96, 296, { k: prog(t, T.year - 0.2, T.year + 0.5) });
    label(g, 'because people understood', 96, 380, { k: prog(t, T.understood - 0.2, T.understood + 0.4) });
    it(g, 'the families', 96, 436, 44, C.ink, { k: prog(t, T.families, T.families + 0.5) });
    it(g, 'the unavoidable sets', 96, 490, 44, C.ink, { k: prog(t, T.unav, T.unav + 0.6) });
    it(g, 'searching: computing.', 96, 620, 44, C.dim, { k: prog(t, T.computing - 0.3, T.computing + 0.5) });
    it(g, 'knowing what to search:', 96, 700, 44, C.ink, { k: prog(t, T.knowing, T.maths2) });
    it(g, 'mathematics.', 96, 770, 60, C.ink, { k: prog(t, T.maths2, T.maths2 + 0.45) });

    // mascot calculator (phải, nhìn sang ô cửa), NÓI: trồi lên trước "computer", trượt xuống ở câu 127
    const kin = outCubic(prog(t, T.computer - 0.6, T.computer)), kout = outCubic(prog(t, T.start127 - 0.2, T.start127 + 0.5));
    if (kin > 0 && kout < 1) {
      g.save(); g.translate(0, (1 - kin) * 700 + kout * 700);
      figure(g, 'calculator', 1688, H, 660, 1, { t });
      g.restore();
    }

    dark(g, actCard(g, t, this.FROM, this.START, 'ACT SIX', 'Just logic?'));
  }
}
