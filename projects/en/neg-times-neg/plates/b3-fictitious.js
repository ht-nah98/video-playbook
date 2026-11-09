// b3 · Fictitious, absurd, meaningless (p2 câu 10–15). Một khung, không pan:
//   dòng thời gian in thảm dưới đáy 628 ≈ 1545 → 1759 → 1796 (đoạn 628–1545 bị cắt — vạch gãy, không tỉ lệ);
//   một viên đỏ giữa vùng trái bị đẩy dần ra mép trái thảm theo từng người: Cardano + Ars Magna "FICTITIOUS",
//   Maseres "KEEP IT OUT", Frend "REFUSED" (lời người xưa — dấu ngà, không gạch băng);
//   ngoặc 628 → 1796 "MORE THAN 1,000 YEARS" (1796 − 628 tính bằng must); câu cuối: (−) × (−) "so obvious?".
import { C, ARC, smooth, prog, ground, card, typed, label, quote, eq, tile, line, stamp, portrait, ring,
  lookup, must, drift } from '../kit.js';

export default class Fictitious {
  static ERA = 'mat';
  static IMAGES = { cardano: './assets/history/cardano.jpg', arsmagna: './assets/history/ArsMagna.jpg',
    maseres: './assets/history/maseres.jpg', frend: './assets/history/frend.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      europe: w(10, 'europe'), suspicious: w(10, 'suspicious'), e10: L(10).end,
      fifteen: w(11, 'fifteen'), f45: w(11, 'forty-five'), gerolamo: w(11, 'gerolamo'), called: w(11, 'called'), fict: w(11, 'fictitious'), e11: L(11).end,
      seventeen12: w(12, 'seventeen'), francis: w(12, 'francis'), diss: w(12, 'dissertation'), kept: w(12, 'kept'), algebra12: w(12, 'algebra'),
      seventeen13: w(13, 'seventeen'), william: w(13, 'william'), textbook: w(13, 'textbook'), refused: w(13, 'refused'), use: w(13, 'use'), all: w(13, 'all'),
      more: w(14, 'more'), thousand: w(14, 'thousand'), years: w(14, 'years'), brahma: w(14, 'brahmagupta'), down: w(14, 'down'),
      neg1: w(15, 'negative'), times: w(15, 'times'), neg2: w(15, 'negative', 2), obvious: w(15, 'obvious'), proof: w(15, 'proof'),
      taken: w(15, 'taken'), long: w(15, 'long'), end: L(15).end,
    };
    this.START = L(10).start; this.FROM = this.START - 1.2;
    const Y = { b: must('628', 628), c: must('1545', 1545), m: must('1759', 1759), f: must('1796', 1796) };
    this.V = { ...Y, gap: must('1796 - 628', 1168), over: must('1796 - 628 > 1000', true) };
    // dòng thời gian: 628 ở trái, vạch gãy, 1545…1796 theo tỉ lệ
    this.X = y => (y === Y.b ? 230 : 820 + (y - Y.c) * 3.0);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.f45, kind: 'snap' }, { t: T.fict + 0.15, kind: 'tick' },
      { t: T.francis, kind: 'snap' }, { t: T.kept, kind: 'tick' }, { t: T.william, kind: 'snap' }, { t: T.use + 0.08, kind: 'tick' },
      { t: T.neg1, kind: 'chip' }, { t: T.proof + 0.3, kind: 'question' },
    ];
  }
  render(g, t) {
    const T = this.T, V = this.V, X = this.X, c = drift(t, this.START, { vx: 3, vy: 1.5, max: 40 });
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    // ── dòng thời gian in thảm (y 930) ──
    const TY = 930, kt = prog(t, this.FROM + 0.3, this.START + 0.4);
    line(g, [[X(V.b) - 60, TY], [560, TY]], C.dim, 2.4, { k: kt });
    line(g, [[600, TY], [X(V.f) + 120, TY]], C.dim, 2.4, { k: prog(t, T.suspicious, T.e10 + 0.3) });
    if (kt > 0.9) { line(g, [[552, TY + 14], [568, TY - 14]], C.dim, 2.4); line(g, [[592, TY + 14], [608, TY - 14]], C.dim, 2.4); }
    const tick = (yr, k, who) => {
      if (k <= 0) return;
      line(g, [[X(yr), TY - 14], [X(yr), TY + 14]], C.ink, 3, { k });
      label(g, String(yr), X(yr), TY + 48, k * 1.5, { color: C.ink, size: 24, align: 'center' });
      if (who) label(g, who, X(yr), TY + 76, k * 1.5 - 0.5, { size: 16, align: 'center' });
    };
    tick(V.b, prog(t, this.FROM + 0.6, this.START + 0.2), 'brahmagupta');
    tick(V.c, prog(t, T.fifteen, T.f45 + 0.3), 'cardano');
    tick(V.m, prog(t, T.seventeen12, T.seventeen12 + 0.6), 'maseres');
    tick(V.f, prog(t, T.seventeen13, T.seventeen13 + 0.6), 'frend');
    // ── Europe ──
    label(g, 'europe', 160, 250, prog(t, T.europe - 0.1, T.europe + 0.3), { color: C.ink, size: 26 });
    quote(g, 'even more suspicious', 160, 310, prog(t, T.suspicious - 0.3, T.e10 + 0.2), { size: 48 });
    // ── viên đỏ bị đẩy dần ra mép trái thảm: mỗi lời chê một nấc ──
    const p1 = smooth(prog(t, T.fict, T.fict + 0.6)), p2 = smooth(prog(t, T.kept, T.kept + 0.6)), p3 = smooth(prog(t, T.refused, T.refused + 0.7));
    const tx = 330 - 90 * p1 - 90 * p2 - 175 * p3;
    tile(g, tx, 470, 120, 'n', { k: prog(t, T.europe, T.europe + 0.35), rot: -0.05 * p1 + 0.04 * p2 - 0.09 * p3 });
    // ── người xưa: ảnh nhỏ + lời chê (ngà) ──
    const kc = prog(t, T.f45, T.f45 + 0.6);
    portrait(g, 'arsmagna', 620, 220, 260, kc, { rot: -0.04 });
    portrait(g, 'cardano', 740, 270, 250, prog(t, T.gerolamo - 0.2, T.gerolamo + 0.4),
      { rot: 0.02, label: { name: 'Gerolamo Cardano', life: `Ars Magna · ${V.c}` } });
    portrait(g, 'maseres', 1090, 230, 290, prog(t, T.francis, T.francis + 0.6),
      { rot: -0.02, label: { name: 'Francis Maseres', life: `dissertation · ${V.m}` } });
    portrait(g, 'frend', 1430, 230, 290, prog(t, T.william, T.william + 0.6),
      { rot: 0.025, label: { name: 'William Frend', life: `principles of algebra · ${V.f}` } });
    stamp(g, 'FICTITIOUS', 880, 700, prog(t, T.fict + 0.1, T.fict + 0.35), { size: 30, color: C.ink, rot: -0.06 });
    stamp(g, 'KEEP IT OUT', 1210, 700, prog(t, T.kept, T.kept + 0.25), { size: 30, color: C.ink, rot: 0.04 });
    stamp(g, 'REFUSED', 1530, 700, prog(t, T.use + 0.03, T.use + 0.28), { size: 30, color: C.ink, rot: -0.05 });
    // ── 628 → 1796: hơn một nghìn năm ──
    const kb = prog(t, T.thousand - 0.2, T.years + 0.4);
    if (kb > 0) {
      const a = X(V.b), b = X(V.f), y = TY - 40;
      line(g, [[a, y + 16], [a, y], [b, y], [b, y + 16]], C.posT, 3, { k: kb });
    }
    eq(g, [[String(V.f), C.posT], [' − '], [String(V.b), C.posT], [' = '], [String(V.gap), C.posT]], 1040, 840, 34,
      prog(t, T.brahma, T.down + 0.4), { align: 'center' });
    label(g, 'more than 1,000 years', 430, 852, prog(t, T.more, T.years + 0.3), { color: C.ink, size: 26 });
    ring(g, 622, 842, 236, 30, prog(t, T.long - 0.2, T.end + 0.2), { color: C.posT });
    // ── câu 15: nếu hiển nhiên thì đã không mất ngần ấy năm ──
    const s = 70, x0 = 160, y0 = 650;
    tile(g, x0, y0, s, 'n', { k: prog(t, T.neg1, T.neg1 + 0.3) });
    typed(g, '×', x0 + s + 30, y0 + s * 0.7, prog(t, T.times, T.times + 0.15), `600 48px ${ARC}`, C.ink, { align: 'center' });
    tile(g, x0 + s + 60, y0, s, 'n', { k: prog(t, T.neg2, T.neg2 + 0.3) });
    quote(g, 'so obvious it needed no proof?', x0, y0 + 140, prog(t, T.obvious - 0.2, T.proof + 0.4), { size: 44 });
    g.restore();
    card(g, prog(t, this.START - 0.6, this.START + 0.9), 'act I', 'FICTITIOUS, ABSURD, MEANINGLESS');
  }
}
