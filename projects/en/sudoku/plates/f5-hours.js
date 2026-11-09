// f5 · Seven million hours — câu 119–123 (đóng hồi V).
// Trái: thẻ tên khắc "Gary McGuire" (+ "Bastian Tugemann · Gilles Civario" lúc gọi tên), "2011 · ≈ 7 MILLION CPU HOURS ·
// IRELAND" khắc theo lời; phải: ô cửa (X 1190, Y 210, cs 62) chạy TÌM — mỗi bước một cách chọn 16 gợi ý (đúng 16, hash)
// — dưới là thanh 12 tháng của năm 2011 lấp dần ("running for the whole year"). "found nothing" → nhấc hết kính,
// "16: none"; "seventeen-clue puzzles do exist" → 17 gợi ý lắp vào (cùng tập 17 của f1), "17 = minimum"; "January 2012".
import { C, clamp, hash, prog, lookup, outCubic, ground, window9, nameplate, it, label, sectionTag, must } from '../kit.js';

const X0 = 1190, Y0 = 210, CS = 62;                  // chữ số 36 px (= round(62 × 0.58), có trong FONTS)
/** 17 gợi ý = 25 gợi ý của f1 bớt 8 kính (cùng tập "17" ở f1). */
const CLUE17 = [[0, 0], [0, 2], [0, 3], [1, 2], [1, 6], [2, 0], [3, 2], [3, 7], [3, 8], [4, 7], [5, 0], [5, 2], [6, 8], [7, 0], [7, 1], [7, 3], [7, 6]];
const MONTHS = 'JFMAMJJASOND';
/** Bước tìm thứ n: đúng 16 ô (thứ tự hash, tất định). */
const pickAt = n => new Set([...Array(81).keys()].sort((a, b) => hash(n * 131 + a * 1.37) - hash(n * 131 + b * 1.37)).slice(0, 16));

export default class Hours {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f5');
    this.T = {
      eleven: w(119, 'eleven'), gary: w(119, 'gary'), univ: w(119, 'university'), dublin: w(119, 'dublin'), search: w(119, 'search'),
      bastian: w(119, 'bastian'), civario: w(119, 'civario'), took: w(120, 'took'), seven: w(120, 'seven'), hours: w(120, 'hours'),
      running: w(120, 'running'), ireland: w(120, 'ireland'), nothing: w(121, 'nothing'), no: w(121, 'no'), unique: w(121, 'unique'),
      exists: w(121, 'exists'), s17: w(122, 'seventeen-clue'), exist: w(122, 'exist'), minimum: w(122, 'minimum'), jan: w(123, 'january'),
      twelve: w(123, 'twelve'), end: L(123).end,
    };
    this.START = L(119).start;
    this.FROM = Math.max(this.START - 1.2, L(118).end + 0.5);
    must(`${new Set(CLUE17.map(([r, c]) => r * 9 + c)).size}`, 17);
    must(`${MONTHS.length}`, 12);
    this.lastPick = pickAt(Math.floor((this.T.nothing - this.T.search) / 0.14));
    this.in17 = new Map(CLUE17.map(([r, c], i) => [r * 9 + c, i]));
  }
  sfx() {
    const T = this.T, m = i => T.took + (T.ireland - T.took) * i / 12;
    return [{ t: T.gary, kind: 'pen' }, { t: T.bastian, kind: 'pen' }, ...[...Array(12).keys()].map(i => ({ t: m(i) + 0.1, kind: 'tick', db: -6 })),
      { t: T.no, kind: 'pen' }, { t: T.s17, kind: 'flap' }, { t: T.minimum, kind: 'shimmer' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ô cửa: lưới đầy → tìm (16 gợi ý mỗi bước) → nhấc hết → 17 gợi ý lắp vào
    const searching = t >= T.search && t < T.nothing, pick = searching ? pickAt(Math.floor((t - T.search) / 0.14)) : null;
    const kOf = (r, c) => {
      const i = r * 9 + c;
      if (t < T.search) return 1;
      if (searching) return pick.has(i) ? 1 : 0;
      const out = 1 - prog(t, T.nothing + 0.03 * (i % 17), T.nothing + 0.03 * (i % 17) + 0.25);   // nhấc nốt bộ cuối
      const before = this.lastPick.has(i) ? out : 0;
      const j = this.in17.get(i), fit = j == null ? 0 : outCubic(prog(t, T.s17 + (T.exist - T.s17) * j / 17, T.s17 + (T.exist - T.s17) * j / 17 + 0.3));
      return Math.max(before, fit);
    };
    window9(g, X0, Y0, CS, { kindOf: (r, c) => (kOf(r, c) > 0 ? 'clear' : 'empty'), kOf, digitK: (r, c) => (kOf(r, c) >= 0.9 ? 1 : 0) });
    // thanh 12 tháng của 2011
    const bx = X0, by = 806, bw = 9 * CS, sw = bw / 12;
    label(g, '2011', bx - 18, by + 22, { align: 'right', size: 18, k: prog(t, T.took - 0.3, T.took) });
    if (t >= T.took - 0.3) { g.save(); g.globalAlpha = clamp(prog(t, T.took - 0.3, T.took) * 2); g.fillStyle = C.lead; g.fillRect(bx - 5, by - 5, bw + 10, 38); g.restore(); }
    [...MONTHS].forEach((ch, i) => {
      const t0 = T.took + (T.ireland - T.took) * i / 12, k = prog(t, t0, t0 + 0.3);
      if (t >= T.took - 0.3) { g.fillStyle = '#BDB5A7'; g.fillRect(bx + i * sw + 2, by, sw - 4, 28); }
      if (k > 0) { g.fillStyle = C.clear; g.fillRect(bx + i * sw + 2, by, (sw - 4) * k, 28); }
      label(g, ch, bx + i * sw + sw / 2 + 1, by + 62, { align: 'center', size: 18, k: prog(t, T.took - 0.3, T.took) });
    });

    // trái
    sectionTag(g, 'ACT V · SEVEN MILLION HOURS', prog(t, this.FROM + 0.3, this.FROM + 0.9));
    const pk = prog(t, T.gary - 0.2, T.gary + 0.6);
    nameplate(g, 96, 170, 'Gary McGuire', ' ', pk);
    label(g, 'Bastian Tugemann · Gilles Civario', 120, 266, { size: 20, k: prog(t, T.bastian - 0.1, T.civario + 0.4) });
    label(g, 'University College Dublin', 96, 340, { size: 20, k: prog(t, T.univ, T.dublin + 0.4) });
    // "2011 · ≈ 7 MILLION CPU HOURS · IRELAND" khắc theo ba chỗ trong lời
    const y = 440, w1 = label(g, '2011 · ', 96, y, { size: 22, color: C.ink, k: prog(t, T.eleven - 0.2, T.eleven + 0.3) });
    const w2 = label(g, '≈ 7 million CPU hours · ', 96 + w1, y, { size: 22, color: C.ink, k: prog(t, T.seven - 0.1, T.hours + 0.4) });
    label(g, 'Ireland', 96 + w1 + w2, y, { size: 22, color: C.ink, k: prog(t, T.ireland - 0.1, T.ireland + 0.4) });
    it(g, '16: none', 96, 610, 92, C.ink, { k: prog(t, T.no - 0.1, T.no + 0.5) });
    label(g, 'no 16-clue sudoku has one answer', 96, 660, { k: prog(t, T.unique - 0.3, T.exists + 0.4) });
    it(g, '17 = minimum', 96, 810, 92, C.ink, { k: prog(t, T.minimum - 0.5, T.minimum + 0.3) });
    label(g, 'announced · January 2012', 96, 900, { size: 26, color: C.ink, k: prog(t, T.jan - 0.1, T.twelve + 0.3) });
    label(g, '"There is no 16-clue sudoku" · arXiv 1201.0749', 96, 940, { size: 18, k: prog(t, T.twelve, T.twelve + 0.8) });
  }
}
