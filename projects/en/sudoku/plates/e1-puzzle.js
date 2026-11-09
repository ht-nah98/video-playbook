// e1 · A puzzle built from algebra — MỞ HỒI IV (khung lab 1: câu đố cs 84 ở X 120, Y 168 — giữ suốt e1–e4).
// Thẻ hồi "ACT FOUR · Difference of Squares"; ô cửa trồi lên, lắp kính trong; luật hiện ĐÚNG lúc nói: lồng 15 ("cage …
// corner"), mũi tên ("arrow … circle"), renban ("purple line"); rồi lồng chữ x, y, y², x², x − y theo từng từ. Số ẩn.
// Cột phải: tên + credit, danh sách luật (biểu tượng nhỏ), các nhãn chữ, "almost nothing else is given". Cột phải trượt
// ra trước e2 (e2 CONTINUES: cắt thẳng cùng ô cửa).
import { W, H, C, MONO, prog, lookup, must, outCubic, ground, window9, lens, outline, cage, cageLabel, arrow, renban, pane, text,
  it, label, sectionTag, actCard, actFlash, dark, CAGES, ARROWS, RENBAN, X, Y } from '../kit.js';

const GX = 120, GY = 168, CS = 84, RX = 1000;                 // ô cửa (lab 1) · lề cột phải
const CREDIT = 'Difference of Squares · puzzle by MathGuy_12 · SudokuPad';
/** Bỏ tiếng sát nhau (≤ 1 tiếng / gap giây; giữ tiếng đến trước). */
const spaced = (cues, gap) => { const out = []; for (const c of cues.sort((a, b) => a.t - b.t)) if (!out.length || c.t - out.at(-1).t >= gap) out.push(c); return out; };

export default class Puzzle {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      puzzle: w(50, 'puzzle'), diff: w(50, 'difference'), mg: w(50, 'mathguy'),
      normal: w(51, 'normal'), rules: w(51, 'rules'),
      cage: w(52, 'cage'), corner: w(52, 'corner'),
      arrow: w(53, 'arrow'), circle: w(53, 'circle'),
      purple: w(54, 'purple'), consec: w(54, 'consecutive'), numbers: w(54, 'numbers'),
      letters: w(55, 'letters'),
      x: w(56, 'x'), y: w(56, 'y'), y2: w(57, 'y'), x2: w(57, 'x'), single: w(58, 'single'), xmy: w(58, 'x'),
      positive: w(59, 'positive'), bigger: w(59, 'bigger'),
      nothing: w(60, 'nothing'), where: w(60, 'where'), end: L(60).end,
    };
    this.START = L(50).start;
    this.FROM = Math.max(this.START - 2.6, L(49).end + 0.5);          // mục MỞ HỒI
    this.NEXT = Math.max(L(61).start - 1.2, L(60).end + 0.5);          // FROM của e2 — cột phải trượt ra trước đó
    must(`${X} > ${Y} && ${Y} > 0`, true);                              // "x bigger than y", số nguyên dương (kit: x = 8, y = 7)
    must(`${CAGES[6].v}`, 15);                                          // lồng số duy nhất của câu đố
  }
  sfx() {
    const T = this.T;
    return spaced([{ t: actFlash(this.FROM), kind: 'shimmer' }, { t: T.mg, kind: 'pen' }, { t: T.rules, kind: 'pen' },
      { t: T.corner, kind: 'tick' }, { t: T.circle, kind: 'tick' }, { t: T.numbers, kind: 'chip' }, { t: T.letters, kind: 'pen' },
      { t: T.y2 + 0.1, kind: 'tick' }, { t: T.xmy, kind: 'tick' }, { t: T.bigger, kind: 'pen' }, { t: T.where, kind: 'pen' }], 2.9);
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'ACT IV · A PUZZLE BUILT FROM ALGEBRA', prog(t, this.FROM + 0.3, this.FROM + 0.9));

    // ô cửa trồi lên khi thẻ hồi rời khung, rồi lắp kính trong từ góc trái trên (so le theo đường chéo)
    const rise = outCubic(prog(t, this.START - 0.2, this.START + 0.5));
    // camera: theo luật đang đọc (lồng 15, mũi tên, rồi từng lồng chữ), lùi về toàn ô cửa trước "nothing" (e2 nối cùng khung)
    const cam = [[T.cage - 0.4, 6, 1, 1.7], [T.arrow - 0.4, 1, 5, 1.6], [T.purple - 0.4, 4, 4, 1], [T.x - 0.4, 0.5, 8, 1.7],
      [T.y - 0.3, 8, 0.5, 1.7], [T.y2 - 0.4, 2, 1.5, 1.5], [T.x2 - 0.4, 5.5, 5.5, 1.45], [T.single - 0.4, 4, 4, 1]];
    if (rise > 0) lens(g, t, { X: GX, Y: GY, cs: CS }, cam, [0, 120, 950, 860], () => {
      g.save(); g.translate(0, (1 - rise) * 820);
      const kOf = (r, c) => prog(t, T.puzzle + (r + c) * 0.07, T.puzzle + (r + c) * 0.07 + 0.45);
      // lòng ô trống ('empty') rồi kính trong lắp đè (pane k < 1 không tô nền — chì sẽ lộ thành ô đen)
      const P = window9(g, GX, GY, CS, { kindOf: (r, c) => (kOf(r, c) >= 1 ? 'clear' : 'empty'), digits: () => null });
      const thin = Math.max(4, CS * 0.07), thick = thin * 2.1;
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) { const k = kOf(r, c); if (k <= 0 || k >= 1) continue;
        const l = c % 3 ? thin / 2 : thick / 2, tp = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2;
        pane(g, GX + c * CS + l, GY + r * CS + tp, CS - l - rg, 'clear', r * 9 + c + 1, k); }
      // luật hiện đúng lúc nói (cùng thứ tự vẽ như kit.puzzle: renban → mũi tên → lồng + nhãn)
      RENBAN.forEach((l, i) => renban(g, P, l, prog(t, T.purple + i * 0.1, T.purple + i * 0.1 + 0.35)));
      ARROWS.forEach((a, i) => arrow(g, P, a, { k: prog(t, T.arrow + i * 0.1, T.arrow + i * 0.1 + 0.35) }));
      const at = [[T.x, T.x], [T.y, T.y], [T.y2, T.y2 + 0.1], [T.x2, T.x2 + 0.1], [T.single, T.xmy], [T.single + 0.15, T.xmy + 0.15], [T.cage, T.corner]];
      CAGES.forEach((cg, i) => { const [a, b] = at[i];
        cage(g, P, cg.ce, { k: prog(t, a - 0.1, a + 0.3) }); cageLabel(g, P, cg.ce, cg.v, C.clear, prog(t, b, b + 0.3)); });
      // vùng đang nói: viền sáng mực rồi tắt
      const hi = (cells, a, b = a) => outline(g, P, cells, C.ink, prog(t, a - 0.1, a + 0.25) * (1 - prog(t, b + 1.2, b + 1.6)), 5);
      hi(CAGES[6].ce, T.cage, T.corner);
      hi(ARROWS[3], T.arrow, T.circle);
      hi(CAGES[0].ce, T.x); hi(CAGES[1].ce, T.y); hi(CAGES[2].ce, T.y2); hi(CAGES[3].ce, T.x2);
      hi([...CAGES[4].ce, ...CAGES[5].ce], T.single, T.xmy);
      // vòng mũi tên được nói tới ("the digit in its circle")
      if (t > T.circle - 0.1) arrow(g, P, ARROWS[3], { color: C.ink, w: 5, k: prog(t, T.circle - 0.1, T.circle + 0.2) * (1 - prog(t, T.circle + 1.2, T.circle + 1.6)) });
      g.restore();
    });
    if (rise > 0) text(g, CREDIT, GX, 1008 + (1 - rise) * 820, `500 18px ${MONO}`, C.dim, 'left', 0, prog(t, T.mg, T.mg + 0.8));

    // cột phải: tên, luật, nhãn chữ — trượt ra phải trước e2
    const out = outCubic(prog(t, this.NEXT - 0.5, this.NEXT));
    g.save(); g.translate(out * 1000, 0);
    it(g, 'Difference of Squares', RX, 250, 72, C.ink, { k: prog(t, T.diff, T.diff + 0.8) });
    label(g, 'set by MathGuy_12', RX + 4, 298, { k: prog(t, T.mg, T.mg + 0.6) });
    const rows = [['normal sudoku rules, plus a few extra', T.normal, 'grid'], ['cage — digits add to its corner number', T.cage, 'cage'],
      ['arrow — digits add to the circle', T.arrow, 'arrow'], ['purple line — a run, in any order', T.purple, 'ren']];
    rows.forEach(([s, a, ic], i) => { const y = 386 + i * 58, k = prog(t, a, a + 0.7); icon(g, ic, RX + 22, y - 12, k); it(g, s, RX + 64, y, 36, C.ink, { k }); });
    it(g, 'some cages show letters:', RX, 642, 36, C.dim, { k: prog(t, T.letters - 0.3, T.letters + 0.4) });
    [['x', T.x, 0], ['y', T.y, 80], ['y²', T.y2, 160], ['x²', T.x2, 260], ['x − y', T.xmy, 360]]
      .forEach(([s, a, dx]) => it(g, s, RX + dx, 720, 60, C.ink, { k: prog(t, a, a + 0.3) }));
    it(g, 'x and y positive whole numbers,', RX, 800, 36, C.ink, { k: prog(t, T.positive - 0.4, T.positive + 0.5) });
    it(g, 'x > y', RX + 436, 800, 36, C.ink, { k: prog(t, T.bigger, T.bigger + 0.3) });
    it(g, 'almost nothing else is given.', RX, 886, 44, C.ink, { k: prog(t, T.nothing - 0.2, T.nothing + 0.6) });
    it(g, 'so where do you even start?', RX, 950, 44, C.dim, { k: prog(t, T.where, T.where + 0.6) });
    g.restore();

    const on = actCard(g, t, this.FROM, this.START, 'ACT FOUR', 'Difference of Squares');
    dark(g, on);
  }
}

/** Biểu tượng nhỏ cạnh mỗi luật (tâm cx, cy; cạnh ~44). */
function icon(g, kind, cx, cy, k) {
  if (k <= 0) return; const s = 44, x = cx - s / 2, y = cy - s / 2;
  g.save(); g.globalAlpha = Math.min(1, k * 2);
  g.fillStyle = C.lead; g.fillRect(x - 4, y - 4, s + 8, s + 8); g.restore();
  pane(g, x, y, s, 'clear', 7 + s, k);
  if (k < 0.5) return;
  const P = { X: x, Y: y, cs: s, ctr: () => [cx, cy] };
  if (kind === 'cage') cage(g, { ...P, cs: s }, [[0, 0]], { d: 5 });
  if (kind === 'arrow') { g.save(); g.strokeStyle = '#3A3B42'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.arc(x + 13, y + 13, 9, 0, 7); g.stroke(); g.beginPath(); g.moveTo(x + 20, y + 20); g.lineTo(x + 36, y + 36);
    g.moveTo(x + 36, y + 27); g.lineTo(x + 36, y + 36); g.lineTo(x + 27, y + 36); g.stroke(); g.restore(); }
  if (kind === 'ren') { g.save(); g.lineCap = 'round'; g.strokeStyle = C.lead; g.lineWidth = 12; g.beginPath(); g.moveTo(x + 9, y + 35); g.lineTo(x + 35, y + 9); g.stroke();
    g.strokeStyle = C.ren; g.lineWidth = 8; g.stroke(); g.restore(); }
  if (kind === 'grid') { g.save(); g.strokeStyle = C.lead; g.lineWidth = 2; g.beginPath();
    for (let i = 1; i < 3; i++) { g.moveTo(x + i * s / 3, y); g.lineTo(x + i * s / 3, y + s); g.moveTo(x, y + i * s / 3); g.lineTo(x + s, y + i * s / 3); } g.stroke(); g.restore(); }
}
