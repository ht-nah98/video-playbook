// b2 · Debts and fortunes (p2 câu 5–9). Hai vùng trên một tấm thảm, camera đi xuống một lần:
//   0 Trung Quốc: trang Cửu chương; que tính gỗ đỏ / đen tự vẽ đặt CẠNH một viên vàng và một viên đỏ — cùng vai:
//     "RED RODS = +", "BLACK RODS = −" (que là đồ vật của người xưa, không phải gạch)
//   1 Ấn Độ 628: Brahmagupta (không ảnh — chữ lớn), "fortunes and debts", câu "the product of two debts is a fortune"
//     + hai viên đỏ × = một viên vàng; "He did not prove it" → dấu "A RULE · NOT A PROOF" (ngà).
import { C, CG, ARC, clamp, smooth, outCubic, prog, ground, card, typed, label, quote, eq, tile, stamp, portrait, line,
  lookup, must, typeCues } from '../kit.js';

const ZONE = 1080;

/** Bó que tính gỗ nằm ngang (n que dài L), đặt xuống theo k (rơi + thẳng ra). color = gỗ đỏ | gỗ đen. */
function rods(g, x, y, n, L, wood, k) {
  if (k <= 0) return;
  for (let i = 0; i < n; i++) {
    const ki = outCubic(clamp(k * n - i * 0.6)); if (ki <= 0) continue;
    const yy = y + i * 20 - (1 - ki) * 40, a = (i - (n - 1) / 2) * 0.03 + (1 - ki) * 0.25;
    g.save(); g.translate(x + L / 2, yy); g.rotate(a); g.globalAlpha = clamp(ki * 3);
    g.save(); g.shadowColor = 'rgba(5,10,18,0.55)'; g.shadowBlur = 8; g.shadowOffsetY = 4;
    g.fillStyle = wood.face; g.beginPath(); g.roundRect(-L / 2, -6, L, 12, 6); g.fill(); g.restore();
    g.strokeStyle = wood.edge; g.lineWidth = 1.5; g.beginPath(); g.roundRect(-L / 2, -6, L, 12, 6); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(-L / 2 + 6, -4, L - 12, 2);
    g.restore();
  }
}
const RED = { face: '#B5402F', edge: '#E07A62' }, BLACK = { face: '#15171B', edge: '#7E8C9C' };

/** Lời dẫn Cormorant nghiêng nhiều màu, VIẾT vào theo k (trái → phải). parts = [[chuỗi, màu?], …]. */
function qparts(g, parts, x, y, k, size) {
  const font = `italic 600 ${size}px ${CG}`; g.save(); g.font = font;
  const ws = parts.map(([s]) => g.measureText(s).width); g.restore();
  let cx = x, left = Math.round(parts.reduce((a, [s]) => a + s.length, 0) * clamp(k));
  parts.forEach(([s, col], i) => { if (left > 0) { typed(g, s, cx, y, Math.min(1, left / s.length), font, col || C.ink); left -= s.length; } cx += ws[i]; });
}

export default class Debts {
  static ERA = 'mat';
  static IMAGES = { ninechapters: './assets/history/nine-chapters.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      places: w(5, 'places'), neg5: w(5, 'negative'), put: w(5, 'put'), work: w(5, 'work'),
      china: w(6, 'china'), book: w(6, 'book'), nine: w(6, 'nine'), art: w(6, 'art'), red: w(6, 'red'), counting: w(6, 'counting'), rods1: w(6, 'rods'),
      positive: w(6, 'positive'), amounts: w(6, 'amounts'), black: w(6, 'black'), rods2: w(6, 'rods', 2), neg6: w(6, 'negative'),
      ones: w(6, 'ones'), rules6: w(6, 'rules'), them: w(6, 'them'), e6: L(6).end,
      year: w(7, 'year'), y628: w(7, 'twenty-eight'), india: w(7, 'india'), brahma: w(7, 'brahmagupta'), rules7: w(7, 'rules'),
      calc: w(7, 'calculating'), fortunes: w(7, 'fortunes'), debts7: w(7, 'debts'), e7: L(7).end,
      oldest: w(8, 'oldest'), survives: w(8, 'survives'), product: w(8, 'product'), two: w(8, 'two'), debts8: w(8, 'debts'),
      fortune: w(8, 'fortune'), e8: L(8).end,
      rule9: w(9, 'rule'), explained: w(9, 'explained'), fortunes9: w(9, 'fortunes'), not9: w(9, 'not'), prove: w(9, 'prove'),
      today: w(9, 'today'), end: L(9).end,
    };
    this.START = L(5).start; this.FROM = this.START - 1.2;
    this.PAN = this.T.e6 - 0.05;
    this.V = { year: must('628', 628), p: must('(-1) * (-1)', 1) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.neg5, kind: 'chip' }, { t: T.book, kind: 'snap' }, { t: T.rods1, kind: 'tick' }, { t: T.y628, kind: 'tick' },
      ...typeCues('the product of two debts is a fortune', T.product - 0.1, T.e8), { t: T.not9, kind: 'snap' },
    ];
  }
  cam(t) {
    const e = smooth(prog(t, this.PAN, this.PAN + 0.9));
    const y0 = Math.min(40, 3 * Math.max(0, t - this.START)), y1 = ZONE + Math.min(40, 3 * Math.max(0, t - this.PAN - 0.9));
    return { x: 0, y: y0 + (y1 - y0) * e };
  }
  render(g, t) {
    const c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01) this.zone1(g, t, ZONE);
    g.restore();
    card(g, prog(t, this.START - 0.6, this.START + 0.8), 'act I', 'DEBTS AND FORTUNES');
  }
  zone0(g, t) {
    const T = this.T, X = 700, R1 = 520, R2 = 700, S = 104, TX = 1420;
    label(g, 'in other places', X, 240, prog(t, T.places - 0.3, T.places + 0.4));
    quote(g, 'negative numbers, already at work', X, 310, prog(t, T.neg5, T.work + 0.3), { size: 54 });
    // trang Cửu chương — ảnh in dán thảm
    portrait(g, 'ninechapters', 160, 240, 520, prog(t, T.book, T.book + 0.6),
      { rot: -0.02, label: { name: 'The Nine Chapters', life: 'on the mathematical art', note: 'china' } });
    label(g, 'china', X, 400, prog(t, T.china - 0.1, T.china + 0.3), { color: C.ink, size: 24 });
    // một viên vàng, một viên đỏ đặt xuống trước — que tính của người xưa đến xếp cạnh, cùng vai
    tile(g, TX, R1 - S / 2, S, 'p', { k: prog(t, T.neg5, T.neg5 + 0.35) });
    tile(g, TX, R2 - S / 2, S, 'n', { k: prog(t, T.neg5 + 0.15, T.neg5 + 0.5) });
    rods(g, X, R1 - 20, 3, 180, RED, prog(t, T.red, T.rods1 + 0.3));
    label(g, 'red rods', X + 210, R1 + 9, prog(t, T.counting, T.rods1 + 0.4), { color: C.ink, size: 24 });
    eq(g, [['= '], ['+', C.posT]], X + 410, R1 + 20, 64, prog(t, T.positive, T.positive + 0.3));
    rods(g, X, R2 - 20, 3, 180, BLACK, prog(t, T.black, T.rods2 + 0.3));
    label(g, 'black rods', X + 210, R2 + 9, prog(t, T.black + 0.1, T.rods2 + 0.5), { color: C.ink, size: 24 });
    eq(g, [['= '], ['−', C.negT]], X + 410, R2 + 20, 64, prog(t, T.neg6, T.neg6 + 0.3));
    // cùng vai: mũi tên chấm từ "= +" sang viên vàng, "= −" sang viên đỏ
    line(g, [[X + 520, R1], [TX - 24, R1]], C.dim, 2, { dash: [5, 8], k: prog(t, T.amounts, T.amounts + 0.5) });
    line(g, [[X + 520, R2], [TX - 24, R2]], C.dim, 2, { dash: [5, 8], k: prog(t, T.ones, T.ones + 0.5) });
    label(g, 'same job as our tiles', TX + S / 2, R2 + 112, prog(t, T.ones, T.ones + 0.6), { align: 'center', size: 18 });
    label(g, 'with rules for adding and subtracting', X, 880, prog(t, T.rules6 - 0.2, T.them + 0.2), { color: C.ink, size: 22 });
  }
  zone1(g, t, Y) {
    const T = this.T, V = this.V, S = 110, x0 = 1180;
    label(g, `india · ${V.year}`, 160, Y + 240, prog(t, T.year, T.india + 0.4), { color: C.ink, size: 26 });
    typed(g, 'Brahmagupta', 160, Y + 350, prog(t, T.brahma - 0.1, T.brahma + 0.7), `italic 600 120px ${CG}`, C.ink);
    label(g, 'rules for calculating with', 160, Y + 440, prog(t, T.rules7 - 0.1, T.calc + 0.5));
    eq(g, [['fortunes', C.posT], [' and '], ['debts', C.negT]], 160, Y + 510, 54, prog(t, T.fortunes - 0.1, T.debts7 + 0.4));
    // câu luật xưa nhất còn lại
    label(g, 'the oldest written version that survives', 160, Y + 640, prog(t, T.oldest - 0.2, T.survives + 0.5));
    qparts(g, [['“the product of two '], ['debts', C.negT], [' is a '], ['fortune', C.posT], ['”']], 160, Y + 740,
      prog(t, T.product - 0.1, T.e8), 76);
    // hai khoản nợ × → một tài sản, bằng gạch
    tile(g, x0, Y + 250, S, 'n', { k: prog(t, T.two, T.two + 0.35) });
    typed(g, '×', x0 + S + 46, Y + 250 + S * 0.66, prog(t, T.debts8 - 0.1, T.debts8), `600 64px ${ARC}`, C.ink, { align: 'center' });
    tile(g, x0 + S + 92, Y + 250, S, 'n', { k: prog(t, T.debts8, T.debts8 + 0.35) });
    typed(g, '=', x0 + 2 * S + 138, Y + 250 + S * 0.66, prog(t, T.fortune - 0.2, T.fortune), `600 64px ${ARC}`, C.ink, { align: 'center' });
    tile(g, x0 + 2 * S + 184, Y + 250, S, V.p > 0 ? 'p' : 'n', { k: prog(t, T.fortune, T.fortune + 0.35) });
    // câu 9: một luật, giải thích bằng nợ / tài sản — không chứng minh
    label(g, 'given as a rule', x0, Y + 430, prog(t, T.rule9 - 0.2, T.rule9 + 0.4), { color: C.ink, size: 22 });
    label(g, 'explained through debts and fortunes', x0, Y + 466, prog(t, T.explained, T.fortunes9 + 0.4), { size: 18 });
    stamp(g, 'A RULE · NOT A PROOF', x0 + 290, Y + 560, prog(t, T.not9, T.not9 + 0.25), { size: 32, color: C.ink, rot: -0.05 });
    label(g, 'not the way a mathematician would today', x0, Y + 660, prog(t, T.prove + 0.3, T.today + 0.4), { size: 16 });
  }
}
