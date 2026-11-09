// HỒI BA · "What your computer does" (SCRIPT.md, p2 câu 103–118) — camera đã lao vào LỖ: trong lỗ là terminal.
//   103     viền giấy của lỗ lướt ra ngoài khung · "$ python3" · "÷ 0" lớn bên phải
//   104–105 số nguyên: ">>> 7 // 0" → traceback thật của Python (ZeroDivisionError) · dấu STOP · "I can't compute this."
//   106     "$ node" · nhãn IEEE 754 · DECIMAL NUMBERS (hổ phách) · IEEE 754 / 1985
//   107–108 1/0 → Infinity · -1/0 → -Infinity · 0/0 → NaN = Not a Number
//   109–111 mẩu giấy có lỗ ("echoes") tách đôi: −0 và +0, mũi tên từ trái / từ phải · 1/+0 → Infinity · 1/-0 → -Infinity
//   112–114 NaN ≠ NaN · NaN === NaN → false · Infinity * 0 → NaN · Infinity - Infinity → NaN
//   115     mẩu giấy "BY HAND" (0 × ∞, ∞ − ∞ của d1) nối với các NaN
//   116–118 "÷ 0 SOLVED" bị gạch · thanh tiến trình không sập · lỗ vẫn còn; NaN bị đóng hộp và đặt sang bên
// Kết quả máy: JS TÍNH lại ngay trong trang (ném lỗi nếu bảng sai). Python không chạy được trong trình duyệt —
// đã kiểm bằng `printf '7 // 0\n' | python3 -i` (3.12): Traceback / File "<stdin>", line 1, in <module> /
// ZeroDivisionError: integer division or modulo by zero.
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, lookup, hole, strike, ring, arrow, stamp, typeCues, lens } from '../kit.js';

const E = ERA.void, P = ERA.page;
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;
const RED = P.accent;
const TX0 = 140, TX1 = 1220, TY0 = 200, TY1 = 1000, RY0 = 318, RH = 48, ROWS = 14;   // khung terminal
const PX = 1540;                                                                     // tâm cột phải

// node REPL: biểu thức → kết quả in ra (CONTENT.md). Tính lại thật; sai → ném lỗi.
const JS = [['1/0', 'Infinity'], ['-1/0', '-Infinity'], ['0/0', 'NaN'], ['1/+0', 'Infinity'], ['1/-0', '-Infinity'],
  ['NaN === NaN', 'false'], ['Infinity * 0', 'NaN'], ['Infinity - Infinity', 'NaN']];
for (const [e, want] of JS) { const got = String(Function(`return (${e});`)()); if (got !== want) throw new Error(`d2: ${e} → ${got}, bảng ghi ${want}`); }
const out = e => JS.find(r => r[0] === e)[1];

/** Mẩu giấy kẻ ô có lỗ (vọng lại trang giấy): tâm (x, y), cạnh s. */
function scrap(g, x, y, s, rot, hr, seed) {
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(-s / 2 + 8, -s / 2 + 10, s, s);
  g.fillStyle = P.bg; g.beginPath();
  for (let i = 0; i < 24; i++) { const side = Math.floor(i / 6), u = (i % 6) / 6, j = (hash(i * 3.7 + seed) - 0.5) * 8;
    const pt = [[-s / 2 + u * s, -s / 2 + j], [s / 2 + j, -s / 2 + u * s], [s / 2 - u * s, s / 2 + j], [-s / 2 + j, s / 2 - u * s]][side];
    i ? g.lineTo(...pt) : g.moveTo(...pt); }
  g.closePath(); g.fill(); g.save(); g.clip(); g.strokeStyle = P.grid; g.lineWidth = 1.4;
  for (let v = -s / 2 + 12; v < s / 2; v += 48) { g.beginPath(); g.moveTo(v, -s); g.lineTo(v, s); g.stroke(); g.beginPath(); g.moveTo(-s, v); g.lineTo(s, v); g.stroke(); }
  g.restore();
  if (hr > 0) hole(g, 0, 0, hr, null, { seed });
  g.restore();
}

export default class Computer {
  static ERA = 'void';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      computer: w(103, 'computer'), divide: w(103, 'divide'), zero103: w(103, 'zero'),
      whole: w(104, 'whole'), most: w(104, 'most'), stop: w(104, 'stop'), error: w(104, 'error'),
      honest: w(105, 'honest'), machine: w(105, 'machine'), i105: w(105, 'i'), this105: w(105, 'this'),
      but: w(106, 'but'), decimal: w(106, 'decimal'), standard: w(106, 'standard'), triple: w(106, 'i'), four: w(106, 'four'), differently: w(106, 'differently'),
      positive: w(107, 'positive'), inf107: w(107, 'infinity'), negative: w(107, 'negative'), minus107: w(107, 'minus'), e107: L(107).end,
      zero108: w(108, 'zero'), nan108: w(108, 'nan'), notnum: w(108, 'not'), e108: L(108).end,
      echoes: w(109, 'echoes'),
      two110: w(110, 'two'), plus110: w(110, 'plus'), minus110: w(110, 'minus'), remember: w(110, 'remember'), side: w(110, 'side'),
      one111: w(111, 'one'), plus111: w(111, 'plus'), inf111: w(111, 'infinity'), one111b: w(111, 'one', 2), minus111: w(111, 'minus'), minus111b: w(111, 'minus', 2),
      nan112: w(112, 'nan'), equal112: w(112, 'equal'), itself: w(112, 'itself'), and112: w(112, 'and'),
      compare: w(113, 'compare'), nan113b: w(113, 'nan', 2), false113: w(113, 'false'),
      inf114: w(114, 'infinity'), zero114: w(114, 'zero'), inf114b: w(114, 'infinity', 2), inf114c: w(114, 'infinity', 3), nan114: w(114, 'nan'),
      the115: w(115, 'the'), exactly: w(115, 'exactly'), lesson: w(115, 'lesson'), hand115: w(115, 'hand'),
      none: w(116, 'none'), solved: w(116, 'solved'), zero116: w(116, 'zero'),
      it117: w(117, 'it'), agreement: w(117, 'agreement'), program: w(117, 'program'), crash: w(117, 'crash'), calculation: w(117, 'calculation'), e117: L(117).end,
      problem: w(118, 'problem'), still: w(118, 'still'), wrapped: w(118, 'wrapped'), special: w(118, 'special'), set: w(118, 'set'), aside: w(118, 'aside'),
    };
    const T = this.T;
    // các dòng terminal: [tiền tố, chữ, lúc bắt đầu gõ, lúc gõ xong, màu]
    const cmd = (p, s, a, b) => [p, s, a, b, E.ink], res = (s, a, c = E.ink) => [s, '', a, a + 0.12, c, true];
    this.ROWS = [
      cmd('$ ', 'python3', T.computer, T.computer + 0.45),
      cmd('>>> ', '7 // 0', T.whole, T.most - 0.1),
      res('Traceback (most recent call last):', T.stop, E.dim),
      res('  File "<stdin>", line 1, in <module>', T.stop + 0.08, E.dim),
      res('ZeroDivisionError: integer division or modulo by zero', T.stop + 0.16, '#E25A48'),
      cmd('>>> ', 'exit()', T.but - 0.05, T.but + 0.3),
      cmd('$ ', 'node', T.decimal - 0.05, T.decimal + 0.3),
      cmd('> ', '1/0', T.positive, w(107, 'zero') + 0.1), res(out('1/0'), T.inf107),
      cmd('> ', '-1/0', T.negative, w(107, 'zero', 2) + 0.1), res(out('-1/0'), T.minus107),
      cmd('> ', '0/0', T.zero108, w(108, 'zero', 2) + 0.1), res(out('0/0'), T.nan108, E.accent),
      cmd('> ', '1/+0', T.one111, w(111, 'zero') + 0.1), res(out('1/+0'), T.inf111),
      cmd('> ', '1/-0', T.one111b, w(111, 'zero', 2) + 0.1), res(out('1/-0'), T.minus111b),
      cmd('> ', 'NaN === NaN', T.compare, T.nan113b + 0.25), res(out('NaN === NaN'), T.false113),
      cmd('> ', 'Infinity * 0', T.inf114, T.zero114 + 0.2), res(out('Infinity * 0'), T.zero114 + 0.35, E.accent),
      cmd('> ', 'Infinity - Infinity', T.inf114b, T.inf114c + 0.3), res(out('Infinity - Infinity'), T.nan114, E.accent),
    ];
    this.WRAP = this.ROWS.length - 1;                                  // dòng NaN cuối được đóng hộp và đặt sang bên
    this.START = L(103).start;
    this.FROM = Math.max(this.START - 1.2, L(102).end + 1.45);
    this.LENS = ((T, F) => [[F, 960, 540, 1], [T.computer, 960, 540, 1], [T.whole + 0.3, 760, 380, 1.5], [T.honest - 0.2, 760, 380, 1.5], [T.honest + 0.6, 1100, 420, 1.3], [T.decimal - 0.3, 1100, 420, 1.3], [T.standard + 0.3, 1150, 560, 1.15], [T.positive - 0.2, 1150, 560, 1.15], [T.inf107 + 0.2, 720, 640, 1.5], [T.e107, 720, 640, 1.5], [T.nan108 + 0.3, 1200, 660, 1.35], [T.echoes, 1200, 660, 1.35], [T.two110 + 0.5, 960, 540, 1]])(this.T, this.FROM);        // sau khi d1 đã lao hết vào lỗ (đen kín)
    this.WIPE = [960, 640];                                             // = lỗ ở khung cuối của d1
  }
  rowY(i, t) {                                                         // terminal cuộn khi quá ROWS dòng
    let sc = 0; for (let j = ROWS; j < this.ROWS.length; j++) sc += outCubic(prog(t, this.ROWS[j][2], this.ROWS[j][2] + 0.3));
    return RY0 + (i - sc) * RH;
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T, out = [];
    // terminal: lệnh gõ = typeCues khớp typed(…, prog(t, a + 0.05, b)); dòng kết quả = beep (traceback: một tiếng error)
    this.ROWS.forEach(([p, s, a, b, c, isOut]) => {
      if (!isOut) { out.push(...typeCues(s, a + 0.05, b)); return; }
      while (out.at(-1)?.kind === 'type' && a - out.at(-1).t < 0.25) out.pop();   // phím cuối sát kết quả: nhường beep
      if (a === T.stop) out.push({ t: T.stop, kind: 'error' });   // ZeroDivisionError + dấu STOP
      else if (a > T.stop + 0.2) out.push({ t: a, kind: 'beep' });
    });
    out.push(
      { t: T.divide, kind: 'pen' },              // "÷ 0" lớn bên phải
      { t: T.triple, kind: 'pen' },              // IEEE 754
      { t: T.echoes, kind: 'pop' },              // mẩu giấy có lỗ
      { t: T.two110 - 0.1, kind: 'snap' },       // tách đôi: −0 · +0
      { t: T.nan112, kind: 'pen' },              // NaN ≠ NaN
      { t: T.exactly - 0.2, kind: 'pop' },       // mẩu giấy "BY HAND"
      { t: T.zero116, kind: 'error' },           // "SOLVED" bị gạch
      { t: T.still - 0.1, kind: 'pop' },         // lỗ vẫn còn đó
      { t: T.wrapped - 0.1, kind: 'snap' },      // NaN đóng hộp
    );
    return out;
  }
  render(g, t) {
    const T = this.T;
    g.save(); lens(g, this.LENS, t);                         // camera đẩy vào chỗ đang đọc (bản 2)
    ground(g, 'void');
    card(g, 'void', prog(t, this.FROM + 1.0, this.FROM + 2.4), 'ACT THREE · THE PRICE', 'What your computer does');
    // viền giấy của lỗ: ta vừa chui qua, nó nở ra ngoài khung
    const rim = 115 * Math.pow(18, prog(t, this.FROM, this.FROM + 1.8));      // = lỗ của d1 lúc wipe, nở theo cấp số nhân như diveInto
    void rim;                                                          // (đã bỏ viền giấy: d1 kết thúc đen kín trong lỗ — review §1)


    // ── khung terminal ──
    const kf = prog(t, this.FROM + 1.1, this.START + 0.7);
    hand(g, [[TX0, TY0], [TX1, TY0], [TX1, TY1], [TX0, TY1], [TX0, TY0]], { w: 2, color: '#3A404C', jit: 0.4, seed: 3, k: kf });
    if (kf >= 1) { g.fillStyle = '#0F1015'; g.fillRect(TX0 + 2, TY0 + 2, TX1 - TX0 - 4, TY1 - TY0 - 4);
      hand(g, seg(TX0, TY0 + 64, TX1, TY0 + 64, 20), { w: 1.5, color: '#2A2F38', jit: 0.3, seed: 4 });
      [0, 1, 2].forEach(i => { g.fillStyle = '#2A2F38'; g.beginPath(); g.arc(TX1 - 36 - i * 28, TY0 + 32, 7, 0, 7); g.fill(); }); }
    const swap = prog(t, T.triple - 0.1, T.four + 0.3);
    if (swap <= 0) typed(g, 'WHOLE NUMBERS · PYTHON', TX0 + 30, TY0 + 42, prog(t, T.whole - 0.2, T.whole + 0.5), M(22), E.dim);
    else typed(g, 'IEEE 754 · DECIMAL NUMBERS', TX0 + 30, TY0 + 42, swap, M(22), E.accent);

    // ── các dòng ──
    g.save(); g.beginPath(); g.rect(TX0, TY0 + 80, TX1 - TX0, TY1 - TY0 - 86); g.clip();
    const wrap = prog(t, T.wrapped - 0.1, T.wrapped + 0.4), aside = outCubic(prog(t, T.set - 0.05, T.aside + 0.6));
    let last = null;
    this.ROWS.forEach(([p, s, a, b, c, isOut], i) => {
      if (t < a) return;
      const y = this.rowY(i, t); last = { i, y, p, s, a, b, isOut };
      if (i === this.WRAP && aside > 0) return;                            // đã rời đi trong hộp
      if (isOut) { typed(g, p, TX0 + 32, y, prog(t, a, b), M(28), c); return; }
      g.save(); g.font = M(28); const pw = g.measureText(p).width; g.restore();
      typed(g, p, TX0 + 32, y, 1, M(28), E.dim);
      typed(g, s, TX0 + 32 + pw, y, prog(t, a + 0.05, b), M(28), c);
    });
    // con trỏ nhấp nháy ở dòng đang gõ / dòng kế tiếp
    if (last && t >= this.FROM + 0.8) {
      g.save(); g.font = M(28);
      const busy = t < last.b, txt = last.isOut ? '' : last.p + last.s.slice(0, Math.round(last.s.length * prog(t, last.a + 0.05, last.b)));
      const cy = busy ? last.y : last.y + RH, cx = TX0 + 32 + (busy ? g.measureText(txt).width : 0);
      if (busy || Math.floor(t * 2.2) % 2 === 0) { g.fillStyle = E.ink; g.fillRect(cx + 2, cy - 24, 15, 30); }
      g.restore();
    } else if (t >= this.FROM + 0.8 && Math.floor(t * 2.2) % 2 === 0) { g.fillStyle = E.ink; g.fillRect(TX0 + 34, RY0 - 24, 15, 30); }
    g.restore();

    // hộp NaN: đóng hộp ("wrapped up in a special value") rồi trượt sang bên ("set aside"), đậu cạnh lỗ
    if (t >= T.wrapped - 0.1) {
      const y0 = this.rowY(this.WRAP, t), bx0 = TX0 + 18, by0 = y0 - 38, bx1 = 1430, by1 = 820;
      const bx = bx0 + (bx1 - bx0) * aside, by = by0 + (by1 - by0) * aside;
      g.save(); g.translate(bx + 60, by + 26); g.rotate(-0.06 * aside); g.translate(-60, -26);
      if (aside > 0) typed(g, 'NaN', 14, 36, 1, M(28), E.accent);
      hand(g, [[0, 0], [120, 0], [120, 52], [0, 52], [0, 0]], { w: 3, color: E.accent, jit: 0.8, seed: 7, k: wrap });
      typed(g, 'SPECIAL VALUE', 132, 36, prog(t, T.special, T.special + 0.5), M(20), E.accent);
      g.restore();
    }

    // ── cột phải ──
    // 103: ÷ 0 · 104: STOP · 105: honest / "I can't compute this."
    const d1 = outCubic(prog(t, T.stop - 0.5, T.stop));
    if (d1 < 1) typed(g, '÷ 0', PX, 600 + d1 * 700, prog(t, T.divide, T.zero103 + 0.2), A(150), E.ink, { align: 'center' });
    const o1 = outCubic(prog(t, T.but, T.but + 0.6));
    if (o1 < 1) {
      g.save(); g.translate(0, o1 * 900);
      stamp(g, 'STOP', PX, 470, prog(t, T.stop, T.stop + 0.3), A(92), '#E25A48', { rot: -0.08 });
      typed(g, 'THE MOST HONEST ANSWER', PX, 600, prog(t, T.honest - 0.2, T.honest + 0.5), M(22), E.dim, { align: 'center' });
      typed(g, '“I can’t compute this.”', PX, 720, prog(t, T.i105 - 0.05, T.this105 + 0.25), I(54), E.ink, { align: 'center' });
      g.restore();
    }
    // 106: IEEE 754 · 1985
    const o2 = outCubic(prog(t, T.nan108 - 0.5, T.nan108));
    if (t > T.standard - 0.2 && o2 < 1) {
      g.save(); g.translate(0, -o2 * 900);
      typed(g, 'IEEE 754', PX, 540, prog(t, T.triple, T.four + 0.2), A(92), E.accent, { align: 'center' });
      typed(g, 'A STANDARD · 1985', PX, 600, prog(t, T.standard, T.standard + 0.6), M(22), E.dim, { align: 'center' });
      typed(g, 'DECIMAL NUMBERS', PX, 640, prog(t, T.differently - 0.2, T.differently + 0.4), M(22), E.dim, { align: 'center' });
      // 107: ± ÷ 0 → ±∞ (ẩn dụ hai đầu)
      typed(g, '+n ÷ 0 → Infinity', PX, 740, prog(t, T.inf107, T.inf107 + 0.4), M(26), E.ink, { align: 'center' });
      typed(g, '−n ÷ 0 → −Infinity', PX, 790, prog(t, T.minus107, T.minus107 + 0.4), M(26), E.ink, { align: 'center' });
      g.restore();
    }
    // 108: NaN = Not a Number
    const o3 = outCubic(prog(t, T.echoes - 0.4, T.echoes + 0.1));
    if (t > T.nan108 && o3 < 1) {
      g.save(); g.translate(0, o3 * 900);
      typed(g, 'NaN', PX, 560, prog(t, T.nan108, T.nan108 + 0.25), A(120), E.accent, { align: 'center' });
      typed(g, 'NOT A NUMBER', PX, 630, prog(t, T.notnum - 0.05, T.notnum + 0.5), M(26), E.ink, { align: 'center' });
      g.restore();
    }
    // 109–111: mẩu giấy có lỗ tách đôi thành −0 và +0
    const kin = outBack(prog(t, T.echoes, T.echoes + 0.45)), split = outCubic(prog(t, T.two110 - 0.1, T.two110 + 0.6));
    const o4 = outCubic(prog(t, T.nan112 - 0.4, T.nan112 + 0.2));
    if (kin > 0 && o4 < 1) {
      g.save(); g.translate(0, o4 * 900);
      const L0 = PX - 120 * split, R0 = PX + 120 * split, Y = 560, S = 170 * clamp(kin + 0.0001);
      typed(g, 'TWO ZEROS', PX, 400, prog(t, T.two110, T.two110 + 0.5), M(24), E.dim, { align: 'center' });
      scrap(g, L0, Y, S, -0.05, 46 * kin, 11);
      if (split > 0) scrap(g, R0, Y, S, 0.04, 46 * kin, 12);
      typed(g, '−0', L0, Y + 150, prog(t, T.minus110, T.minus110 + 0.3), A(56), E.ink, { align: 'center' });
      typed(g, '+0', R0, Y + 150, prog(t, T.plus110, T.plus110 + 0.3), A(56), E.ink, { align: 'center' });
      // "which side you came from": −0 từ trái, +0 từ phải
      arrow(g, L0 - 160, Y - 120, L0 - 52, Y - 10, prog(t, T.remember, T.remember + 0.4), { color: E.accent, bend: -40, seed: 21 });
      arrow(g, R0 + 160, Y - 120, R0 + 52, Y - 10, prog(t, T.side - 0.2, T.side + 0.2), { color: E.accent, bend: 40, seed: 22 });
      typed(g, 'FROM THE LEFT', L0 - 170, Y - 140, prog(t, T.remember + 0.1, T.remember + 0.6), M(20), E.accent, { align: 'left' });
      typed(g, 'FROM THE RIGHT', R0 + 160, Y - 140, prog(t, T.side, T.side + 0.5), M(20), E.accent, { align: 'right' });
      // 111: khoanh mẩu đang được chia
      ring(g, R0, Y, 110, 110, prog(t, T.plus111, T.plus111 + 0.4), { color: E.accent, seed: 23 });
      ring(g, L0, Y, 110, 110, prog(t, T.minus111, T.minus111 + 0.4), { color: E.accent, seed: 24 });
      g.restore();
    }
    // 112: NaN ≠ NaN
    const o5 = outCubic(prog(t, T.the115 - 0.3, T.the115 + 0.3));
    if (t > T.nan112 && o5 < 1) {
      g.save(); g.translate(0, o5 * 900); g.font = A(72);
      const wN = g.measureText('NaN').width, wq = g.measureText(' ≠ ').width, x0 = PX - (wN * 2 + wq) / 2;
      typed(g, 'NaN', x0, 580, prog(t, T.nan112, T.nan112 + 0.25), A(72), E.accent);
      typed(g, ' ≠ ', x0 + wN, 580, prog(t, T.equal112 - 0.1, T.equal112 + 0.2), A(72), RED);
      typed(g, 'NaN', x0 + wN + wq, 580, prog(t, T.itself - 0.05, T.itself + 0.25), A(72), E.accent);
      typed(g, 'NOT EQUAL TO ITSELF', PX, 660, prog(t, T.itself, T.itself + 0.6), M(22), E.dim, { align: 'center' });
      g.restore();
    }
    // 115: bài học viết tay ở d1 — mẩu giấy "BY HAND"
    const kh = outCubic(prog(t, T.exactly - 0.2, T.lesson + 0.2)), o6 = outCubic(prog(t, T.none - 0.3, T.none + 0.3));
    if (kh > 0 && o6 < 1) {
      g.save(); g.translate(0, (1 - kh) * 700 + o6 * 900);
      g.save(); g.translate(PX, 560); g.rotate(-0.03);
      g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(-222, -122, 460, 260); g.fillStyle = P.bg; g.fillRect(-230, -130, 460, 260);
      g.strokeStyle = P.grid; g.lineWidth = 1.4; for (let v = -206; v < 230; v += 48) { g.beginPath(); g.moveTo(v, -130); g.lineTo(v, 130); g.stroke(); }
      for (let v = -106; v < 130; v += 48) { g.beginPath(); g.moveTo(-230, v); g.lineTo(230, v); g.stroke(); }
      typed(g, '0 × ∞', -190, -30, 1, A(56), RED); typed(g, '∞ − ∞', -190, 60, 1, A(56), RED);
      typed(g, 'NO ANSWER', 50, 18, 1, M(24), RED);
      g.restore();
      typed(g, 'BY HAND', PX - 230, 400, prog(t, T.hand115 - 0.3, T.hand115 + 0.2), M(24), E.ink);
      g.restore();
      // các NaN của máy → bài học viết tay
      const back = 1 - prog(t, T.none - 0.6, T.none - 0.3);
      [this.ROWS.length - 3, this.ROWS.length - 1].forEach((r, i) => { const y = this.rowY(r, t) - 10;
        ring(g, TX0 + 92, y, 80, 28, prog(t, T.exactly - 0.3 + i * 0.2, T.exactly + i * 0.2) * back, { color: E.accent, w: 3, seed: 33 + i });
        arrow(g, TX0 + 178, y, PX - 250, 520 + i * 90, prog(t, T.exactly + i * 0.2, T.exactly + 0.4 + i * 0.2) * back, { color: E.accent, bend: i ? 150 : 30, seed: 31 + i }); });
    }
    // 116: "÷ 0 SOLVED" bị gạch
    const o7 = outCubic(prog(t, T.it117 - 0.2, T.it117 + 0.4));
    if (t > T.none && o7 < 1) {
      g.save(); g.translate(0, o7 * 900);
      typed(g, '÷ 0', PX, 520, prog(t, T.none, T.none + 0.4), A(92), E.ink, { align: 'center' });
      typed(g, 'SOLVED', PX, 610, prog(t, T.solved - 0.1, T.solved + 0.4), A(72), E.ink, { align: 'center' });
      strike(g, PX - 170, 600, PX + 170, 570, prog(t, T.zero116, T.zero116 + 0.35), { color: RED, seed: 41 });
      g.restore();
    }
    // 117: thoả thuận thực dụng — phép tính chạy hết, không sập
    const o8 = outCubic(prog(t, T.problem - 0.3, T.problem + 0.3));
    if (t > T.it117 && o8 < 1) {
      g.save(); g.translate(0, o8 * 900);
      typed(g, 'A PRACTICAL AGREEMENT', PX, 440, prog(t, T.agreement - 0.2, T.agreement + 0.5), M(26), E.accent, { align: 'center' });
      const kb = prog(t, T.program, T.e117), bx = PX - 240, by = 520;
      if (t > T.program - 0.2) { g.strokeStyle = E.dim; g.lineWidth = 2; g.strokeRect(bx, by, 480, 40);
        g.fillStyle = E.accent; g.fillRect(bx + 6, by + 6, 468 * kb, 28);
        typed(g, `calculation … ${Math.round(kb * 100)}%`, bx, by + 84, 1, M(22), E.ink); }
      typed(g, 'NO CRASH', PX, 680, prog(t, T.crash - 0.1, T.crash + 0.4), A(56), E.ink, { align: 'center' });
      g.restore();
    }
    // 118: lỗ vẫn còn đó
    const kp = outBack(prog(t, T.still - 0.1, T.still + 0.45));
    if (kp > 0) {
      scrap(g, PX, 560, 300 * kp, -0.04, 74 * kp, 13);
      typed(g, 'STILL THERE', PX, 400, prog(t, T.still, T.still + 0.5), M(24), E.dim, { align: 'center' });
    }
    g.restore();
  }
}
