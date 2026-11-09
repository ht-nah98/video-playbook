// b1 · One rule, three ways — MỞ HỒI I, cảnh ĐẦU p2: mở từ ĐEN sau intro, nắng lên sau ô cửa (DNA §6).
// Ô cửa chỉ còn khung chì ("nine by nine grid"); "row" → một hàng lắp kính trong, số 1–9 hiện theo "one to nine";
// "column", "boxes" → một cột, một khối; "clues" → kính không phải gợi ý nhấc ra, ô gợi ý lắp kính (đối xứng 180°);
// "one way" → "one answer" khắc, các ô trống hiện mờ lời giải duy nhất. Không đỏ/xanh (DNA §2: chỉ cho hai tập hợp).
import { W, H, C, prog, lookup, must, outCubic, clamp, hash, ground, dark, window9, it, label, num, sectionTag,
  actCard, actFlash, D, boxOf } from '../kit.js';

const X0 = 712, Y0 = 132, CS = 80;
const ROW = 1, COL = 6, BOX = 6;                                          // hàng 2, cột 7, khối 7 (trái dưới)
// gợi ý: đối xứng quay 180° (như báo in), chọn bằng hash — tất định
const CLUE = new Set(); for (let i = 0; i <= 40; i++) if (i === 40 || hash(i * 3.7 + 1) < 0.36) { CLUE.add(i); CLUE.add(80 - i); }
const isClue = (r, c) => CLUE.has(r * 9 + c);

export default class Rules {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      sudoku: w(0, 'sudoku'), nine: w(0, 'nine', 1), grid: w(0, 'grid'),
      row: w(1, 'row'), one: w(1, 'one'), nineR: w(1, 'nine'), once: w(1, 'once'),
      column: w(2, 'column'), boxes: w(2, 'boxes'), three: w(2, 'three', 1),
      start: w(3, 'start'), digits: w(3, 'digits'), filled: w(3, 'filled'), clues: w(3, 'clues'),
      fair: w(4, 'fair'), oneW: w(4, 'one'), finish: w(4, 'finish'), end: L(4).end,
    };
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                                          // mở hồi, cảnh đầu trang (không có câu trước)
    must('9*9', 81);
    must(`${CLUE.size} >= 17 && ${CLUE.size} <= 36`, true);
  }
  sfx() {
    const T = this.T, fl = [...CLUE].sort((a, b) => a - b).map((_, i) => ({ t: T.filled - 0.3 + i * 0.025, kind: 'flap', db: -8 })).filter((_, i) => i % 5 === 0);
    return [{ t: actFlash(this.FROM), kind: 'shimmer' }, { t: T.row, kind: 'chip' }, { t: T.boxes, kind: 'chip' }, ...fl,
      { t: T.oneW, kind: 'pen' }];
  }
  lit(r, c) { return r === ROW || c === COL || boxOf(r, c) === BOX; }
  // độ lắp kính trong của các ô hàng/cột/khối theo lời đọc (so le nhẹ theo ô)
  kRule(t, r, c) {
    const T = this.T; let k = 0;
    if (r === ROW) k = Math.max(k, prog(t, T.row - 0.15 + c * 0.05, T.row + 0.3 + c * 0.05));
    if (c === COL) k = Math.max(k, prog(t, T.column - 0.15 + r * 0.05, T.column + 0.3 + r * 0.05));
    if (boxOf(r, c) === BOX) k = Math.max(k, prog(t, T.boxes - 0.25 + ((r % 3) * 3 + (c % 3)) * 0.04, T.boxes + 0.2 + ((r % 3) * 3 + (c % 3)) * 0.04));
    return k;
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g);
    const light = prog(t, F, F + 1.1);
    // nắng lên sau ô cửa: quầng ấm trôi chậm
    const sx = X0 + 360 + 60 * Math.sin(t * 0.21), sy = Y0 + 300 + 30 * Math.cos(t * 0.17);
    const gr = g.createRadialGradient(sx, sy, 60, sx, sy, 980);
    gr.addColorStop(0, `rgba(255,232,180,${0.42 * light})`); gr.addColorStop(1, 'rgba(255,232,180,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);

    // ô cửa trượt lên khi thẻ hồi rời đi
    const rise = 1 - outCubic(prog(t, this.START - 0.3, this.START + 0.7));
    if (rise < 1) {
      g.save(); g.translate(0, rise * 900);
      const lift = prog(t, T.start, T.start + 0.5);                        // kính không phải gợi ý nhấc ra
      const kOf = (r, c) => {
        const clue = isClue(r, c), kr = this.kRule(t, r, c);
        const kc = clue ? prog(t, T.digits - 0.2 + ((r * 9 + c) % 17) * 0.06, T.digits + 0.25 + ((r * 9 + c) % 17) * 0.06) : 0;
        if (clue) return Math.max(kr, kc);
        return kr * (1 - lift);
      };
      const kindOf = (r, c) => (kOf(r, c) > 0 ? 'clear' : 'empty');
      const digitK = (r, c) => {
        const k = kOf(r, c); if (k < 1) return 0;
        if (this.lit(r, c) && t < T.start) return prog(t, T.one + (D(r, c) - 1) * 0.05, T.one + (D(r, c) - 1) * 0.05 + 0.01);
        return 1;
      };
      const P = window9(g, X0, Y0, CS, { kindOf, kOf, digitK, digits: (r, c) => (kOf(r, c) > 0 ? D(r, c) : null) });
      // vùng đang nói SÁNG lên (nắng xuyên kính trong — không đỏ/xanh); tắt khi kính nhấc ra
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const kl = this.lit(r, c) ? this.kRule(t, r, c) * (1 - prog(t, T.start, T.start + 0.4)) : 0;
        if (kl > 0) { g.fillStyle = `rgba(255,214,120,${0.42 * kl})`; g.fillRect(P.X + c * CS + 4, P.Y + r * CS + 4, CS - 8, CS - 8); }
      }
      // "one way to finish it": lời giải duy nhất hiện mờ trong các ô trống, từng ô một
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        if (isClue(r, c)) continue;
        const a = T.finish - 0.2 + ((r * 9 + c) * 0.618 % 1) * 0.9;
        if (t >= a) { const [cx, cy] = P.ctr(r, c); num(g, D(r, c), cx, cy + 16, 46, C.holeT, { align: 'center' }); }
      }
      g.restore();
    }

    // trái: luật, khắc theo lời
    sectionTag(g, 'ACT I · ONE RULE, THREE WAYS', prog(t, this.START + 0.2, this.START + 0.8));
    it(g, '9 × 9', 96, 250, 92, C.ink, { k: prog(t, T.nine, T.grid + 0.3) });
    label(g, '81 cells', 100, 296, { k: prog(t, T.grid, T.grid + 0.5) });
    it(g, 'every row', 96, 400, 52, C.ink, { k: prog(t, T.row - 0.1, T.row + 0.5) });
    label(g, '1–9, once each', 100, 440, { k: prog(t, T.one, T.once + 0.3) });
    it(g, 'every column', 96, 520, 52, C.ink, { k: prog(t, T.column - 0.1, T.column + 0.5) });
    it(g, 'every box', 96, 600, 52, C.ink, { k: prog(t, T.boxes - 0.1, T.boxes + 0.5) });
    label(g, '3 × 3', 100, 640, { k: prog(t, T.boxes, T.boxes + 0.4) });
    it(g, 'the clues', 96, 750, 52, C.ink, { k: prog(t, T.clues - 0.1, T.clues + 0.5) });
    label(g, 'given at the start', 100, 790, { k: prog(t, T.clues + 0.2, T.clues + 0.8) });
    it(g, 'one answer', 96, 900, 72, C.ink, { k: prog(t, T.oneW - 0.1, T.oneW + 0.6) });

    // thẻ hồi + ánh sáng từ đen
    const on = actCard(g, t, F, this.START, 'ACT ONE', 'The rules, and a very big number');
    dark(g, Math.min(on, light));
  }
}
