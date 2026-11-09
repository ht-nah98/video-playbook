// d2 · Squares appear — nối thẳng từ d1 (CONTINUES): cùng ô cửa X 712, Y 132, cs 80, đỏ 4 hàng trên + xanh 5 cột phải.
// "remove … both colours" → nhấc 20 ô kính đôi (khối 4×5) bay lên, lòng ô lộ tường; "four by four" → viền vuông đỏ,
// "five by five" → viền vuông xanh; "holds everything … plus one more of each digit" → hai dãy chip sắp xếp (16 đỏ khớp
// 16 trong 25 xanh, 9 chip thừa = đúng một bộ 1–9); "25 − 16 = 9", "5² − 4² = one full set"; tổng hai vuông đếm lên →
// chênh 45; thẻ tên Aad van de Wetering; "one corner … opposite corner" → hai vuông đập nhịp + góc thước.
import { C, prog, lookup, must, outCubic, ground, window9, pane, outline, chip, text, ARC, it, label, eq,
  sectionTag, nameplate, D, SQ, SQ_SMALL, SQ_BIG, SQ_DBL, sortedDigits, sum } from '../kit.js';

const GX = 712, GY = 132, CS = 80;
function cellBox(r, c) {
  const thin = Math.max(4, CS * 0.07), thick = thin * 2.1;
  const l = c % 3 ? thin / 2 : thick / 2, t = r % 3 ? thin / 2 : thick / 2, rg = (c + 1) % 3 ? thin / 2 : thick / 2;
  return [GX + c * CS + l, GY + r * CS + t, CS - l - rg];
}
function digitAt(g, r, c, v, color = C.digit) {
  text(g, String(v), GX + c * CS + CS / 2, GY + r * CS + CS / 2 + CS * 0.58 * 0.36, `600 ${Math.round(CS * 0.58)}px ${ARC}`, color, 'center');
}
const kindAll = (r, c) => (SQ.red(r, c) && SQ.blue(r, c) ? 'dbl' : SQ.red(r, c) ? 'red' : SQ.blue(r, c) ? 'blue' : 'clear');

// hai dãy đã sắp: 25 chip xanh (vuông lớn); 16 chip đỏ khớp từng số; 9 chip xanh thừa = một bộ 1–9
const BIG = sortedDigits(SQ_BIG), SMALL = sortedDigits(SQ_SMALL);
const PAIR = (() => { let j = 0; return BIG.map(v => (SMALL[j] === v ? (j++, true) : false)); })();
const EXTRA = BIG.filter((_, i) => !PAIR[i]);
const SB = sum(SQ_BIG), SS = sum(SQ_SMALL);

export default class Squares {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      remove: w(40, 'remove'), both: w(40, 'both'), block: w(40, 'block'),
      sq41: w(41, 'square'), sq42: w(42, 'square'), removed: w(43, 'removed'), still: w(43, 'still'),
      so: w(44, 'so'), big: w(44, 'big'), small: w(44, 'small'), one44: w(44, 'one'), nine44: w(44, 'nine'),
      t25: w(45, 'twenty-five'), minus45: w(45, 'minus'), t16: w(45, 'sixteen'), is45: w(45, 'is'), nine: w(45, 'nine'),
      five46: w(46, 'five'), minus46: w(46, 'minus'), four46: w(46, 'four'), is46: w(46, 'is'), set46: w(46, 'set'),
      digits: w(47, 'digits'), beats: w(47, 'beats'), ff: w(47, 'forty-five'),
      aad: w(48, 'aad'), wetering: w(48, 'wetering'), corner: w(48, 'corner'), opposite: w(48, 'opposite'), corner2: w(48, 'corner', 2),
      much: w(49, 'much'), further: w(49, 'further'), end: L(49).end,
    };
    this.START = L(40).start;
    this.FROM = Math.max(this.START - 1.2, L(39).end + 0.5);
    this.CONTINUES = true;                                   // d1 kết đúng khung này (cùng ô cửa, cùng chữ)
    must(`${SQ_DBL.length}`, 20); must('4 × 5', 20);
    must(`${SQ_SMALL.length}`, 16); must('4 × 4', 16); must(`${SQ_BIG.length}`, 25); must('5 × 5', 25);
    must('25 − 16', 9); must('5^2 − 4^2', 9);
    must(`'${EXTRA.join('')}'`, '123456789');                // 9 chip thừa = đúng một bộ
    must(`${SB} − ${SS}`, 45); must('1+2+3+4+5+6+7+8+9', 45);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.both, kind: 'snap' }, { t: T.sq41, kind: 'pen' }, { t: T.sq42, kind: 'pen' }, { t: T.still, kind: 'pen' },
      ...BIG.map((_, i) => ({ t: T.big + i * 0.05, kind: 'tick', db: -6 })).filter((_, i) => i % 5 === 0),
      ...SMALL.map((_, i) => ({ t: T.small + i * 0.05, kind: 'tick', db: -6 })).filter((_, i) => i % 5 === 0),
      { t: T.one44, kind: 'pen' }, { t: T.t25, kind: 'pen' }, { t: T.set46, kind: 'pen' },
      ...[0, 1, 2, 3, 4].map(i => ({ t: T.digits + i * 0.3, kind: 'tick', db: -6 })),
      { t: T.ff, kind: 'correct' }, { t: T.wetering, kind: 'pen' }, { t: T.opposite, kind: 'pen' }];
  }
  /** Nhấc ô kính đôi (0 → 1), so le theo cột rồi hàng. */
  lift(t, r, c) { const a = this.T.both + (c - 4) * 0.09 + (3 - r) * 0.05; return SQ.red(r, c) && SQ.blue(r, c) ? prog(t, a, a + 0.45) : 0; }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ── ô cửa: kính đôi nhấc ra (bay lên, nhỏ lại), lòng ô lộ tường ──
    const P = window9(g, GX, GY, CS, { kindOf: (r, c) => (kindAll(r, c) === 'dbl' && this.lift(t, r, c) > 0 ? 'hole' : kindAll(r, c)) });
    for (const [r, c] of SQ_DBL) {
      const lf = this.lift(t, r, c);
      if (lf > 0 && lf < 1) { const [x, y, s] = cellBox(r, c); pane(g, x, y, s, 'dbl', r * 9 + c + 1, 1 - lf); digitAt(g, r, c, D(r, c), lf < 0.5 ? C.digit : C.holeT); }
    }
    outline(g, P, SQ_DBL, C.ink, prog(t, T.remove, T.remove + 0.4) * (1 - prog(t, T.block + 0.6, T.block + 1.0)), 5);
    outline(g, P, SQ_SMALL, C.redT, prog(t, T.sq41 - 0.1, T.sq41 + 0.4), 7);
    outline(g, P, SQ_BIG, C.blueT, prog(t, T.sq42 - 0.1, T.sq42 + 0.4), 7);
    // câu 48: "a square in one corner" → vuông đỏ đập nhịp + góc thước đỏ ở góc trái trên; "opposite corner" → vuông xanh + góc thước xanh
    const pulse = (a) => { const u = prog(t, a, a + 0.6); return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; };
    const p1 = pulse(T.corner), p2 = pulse(T.corner2);
    if (p1 > 0) outline(g, P, SQ_SMALL, C.redT, 1, 7 + 7 * p1);
    if (p2 > 0) outline(g, P, SQ_BIG, C.blueT, 1, 7 + 7 * p2);
    const bracket = (x, y, dx, dy, col, k) => { if (k <= 0) return; const L = 70 * outCubic(k);
      g.save(); g.strokeStyle = col; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath();
      g.moveTo(x + dx * L, y); g.lineTo(x, y); g.lineTo(x, y + dy * L); g.stroke(); g.restore(); };
    bracket(GX - 30, GY - 30, 1, 1, C.redT, prog(t, T.corner - 0.1, T.corner + 0.4));
    bracket(GX + 9 * CS + 30, GY + 9 * CS + 30, -1, -1, C.blueT, prog(t, T.corner2 - 0.1, T.corner2 + 0.4));

    // ── nhãn bên phải ô cửa: 4/5 SETS (từ d1) khắc ngược khi nhấc; "4 × 5 BLOCK" ──
    const unc = 1 - prog(t, T.remove, T.remove + 0.5);
    label(g, '4 sets', GX + 9 * CS + 36, GY + 2 * CS + 10, { size: 26, color: C.redT, k: unc });
    label(g, '5 sets', GX + 6.5 * CS, GY + 9 * CS + 62, { size: 26, color: C.blueT, align: 'center', k: unc });
    const kb = prog(t, T.block, T.block + 0.5) * (1 - prog(t, T.so, T.so + 0.4));
    label(g, '4 × 5 block', GX + 9 * CS + 36, GY + 2 * CS - 14, { size: 22, color: C.ink, k: kb });
    label(g, '20 cells lifted', GX + 9 * CS + 36, GY + 2 * CS + 20, { size: 18, color: C.dim, k: kb });

    // ── hai dãy chip đã sắp (câu 44): xanh 25 = đỏ 16 + một bộ 1–9 ──
    const xr = 1480, xb = 1550, s = 26, pitch = 34, top = 152;
    label(g, 'small', xr + s / 2, top - 14, { size: 18, color: C.redT, align: 'center', k: prog(t, T.small - 0.2, T.small + 0.2) });
    label(g, 'big', xb + s / 2, top - 14, { size: 18, color: C.blueT, align: 'center', k: prog(t, T.big - 0.2, T.big + 0.2) });
    let j = 0; const kx = outCubic(prog(t, T.one44, T.one44 + 0.6)), xe = xb + 56 * kx;   // 9 chip thừa trượt sang phải
    BIG.forEach((v, i) => {
      const y = top + i * pitch;
      chip(g, PAIR[i] ? xb : xe, y, s, 'blue', v, outCubic(prog(t, T.big + i * 0.05, T.big + i * 0.05 + 0.3)));
      if (PAIR[i]) { const kk = outCubic(prog(t, T.small + j * 0.05, T.small + j * 0.05 + 0.3)); chip(g, xr, y, s, 'red', SMALL[j], kk); j++; }
    });
    it(g, '+1 of each', xb + 104, top + 12 * pitch + 10, 36, C.ink, { k: prog(t, T.one44 + 0.2, T.nine44 + 0.2) });
    label(g, 'digit 1–9', xb + 104, top + 12 * pitch + 46, { size: 18, k: prog(t, T.nine44 - 0.3, T.nine44 + 0.3) });

    // ── trái ──
    sectionTag(g, 'ACT III · OTHER SHAPES');
    const up = outCubic(prog(t, T.remove, T.remove + 0.6));
    if (up < 1) {                                              // câu hỏi của d1 trượt lên khỏi khung
      g.save(); g.translate(0, -up * 420);
      it(g, 'other shapes?', 96, 230, 72, C.ink); it(g, 'it can.', 96, 300, 44, C.dim); g.restore();
    }
    const ey = 400 - 170 * up;
    eq(g, [['5 sets', C.blueT], [' = '], ['4 sets', C.redT], [' + 1 set']], 96, ey, 52);
    label(g, 'still true', 96, 276, { k: prog(t, T.still, T.still + 0.5) });
    eq(g, [['4 × 4', C.redT], [' = 16 cells']], 96, 360, 44, { k: prog(t, T.sq41 - 0.2, T.sq41 + 0.6) });
    eq(g, [['5 × 5', C.blueT], [' = 25 cells']], 96, 420, 44, { k: prog(t, T.sq42 - 0.2, T.sq42 + 0.6) });
    const kw = ts => ts.reduce((a, x) => a + prog(t, x - 0.1, x + 0.2), 0) / ts.length;
    eq(g, [['25', C.blueT], [' − '], ['16', C.redT], [' = '], ['9']], 96, 530, 60, { k: kw([T.t25, T.minus45, T.t16, T.is45, T.nine]) });
    eq(g, [['5²', C.blueT], [' − '], ['4²', C.redT], [' = '], ['one full set']], 96, 610, 52,
      { k: kw([T.five46, T.minus46, T.four46, T.is46, T.set46 - 0.3]) });
    // tổng chữ số hai vuông đếm lên → chênh 45
    const kc = prog(t, T.digits, T.beats), kd = kc >= 1 ? 1 : 0;
    label(g, 'sum of the digits', 96, 690, { k: prog(t, T.digits - 0.3, T.digits + 0.2) });
    if (kc > 0) {
      const b = kd ? SB : Math.round(SB * outCubic(kc)), sm = kd ? SS : Math.round(SS * outCubic(kc));
      eq(g, [[String(b), C.blueT], [' − '], [String(sm), C.redT], [' = '], ['45', C.ink]], 96, 770, 72,
        { k: 0.6 + 0.4 * prog(t, T.ff - 0.3, T.ff + 0.2) });
    }
    it(g, '…and setters took it much further', 96, 870, 36, C.dim, { k: prog(t, T.much - 0.3, T.further + 0.4) });
    // thẻ tên dưới ô cửa (người soạn Hà Lan)
    nameplate(g, 752, 884, 'Aad van de Wetering', 'Dutch puzzle setter', prog(t, T.aad - 0.2, T.wetering + 0.4));
  }
}
