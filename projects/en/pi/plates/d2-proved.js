// d2 · Proved, not guessed (p2 câu 58–61). Tờ mới của PLATE III:
//   "A HUNCH" viết chì → gạch đỏ ở "isn't" → "A THEOREM" xanh ngay dưới
//   Lambert (bản khắc) 1761 · IRRATIONAL · dấu Q.E.D. → mũi tên "more than a century" → Lindemann 1882 · TRANSCENDENTAL · Q.E.D.
//   dòng đa thức "a·xⁿ + … + c = 0" với x = π và ✗ đỏ vẽ tay → "no finite piece of algebra pins π down".
import { C, CG, prog, ground, drift, card, typed, note, strike, cross, arrow, stamp, portrait, leader, lookup, must,
  mono } from '../kit.js';

export default class Proved {
  static ERA = 'vellum';
  static POSES = [];
  static IMAGES = { lambert: './assets/history/JHLambert.jpg', lindemann: './assets/history/Carl_Louis_Ferdinand_von_Lindemann.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      dont: w(58, "don't"), thisW: w(58, 'this'), isnt: w(58, "isn't"), hunch: w(58, 'hunch'), theorem: w(58, 'theorem'),
      y1761: w(59, 'seventeen'), y61: w(59, 'sixty-one'), swiss: w(59, 'swiss'), johann: w(59, 'johann'), lambert: w(59, 'lambert'),
      proved1: w(59, 'proved'), irr: w(59, 'irrational'),
      more: w(60, 'more'), century: w(60, 'century'), later: w(60, 'later'), y1882: w(60, 'eighteen'), y82: w(60, 'eighty-two'),
      german: w(60, 'german'), ferdinand: w(60, 'ferdinand'), lindemann: w(60, 'lindemann'), stronger: w(60, 'stronger'), trans: w(60, 'transcendental'),
      means: w(61, 'means'), not: w(61, 'not'), solution: w(61, 'solution'), polynomial: w(61, 'polynomial'), equation: w(61, 'equation'),
      whole: w(61, 'whole-number'), coeff: w(61, 'coefficients'), finite: w(61, 'finite'), down: w(61, 'down'), end: L(61).end,
    };
    this.START = L(58).start; this.FROM = this.START - 1.2;
    must('1882 - 1761 > 100', true);                                   // "more than a century later"
    this.Y = { lambert: String(must('1761', 1761)), lindemann: String(must('1882', 1882)) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.isnt + 0.05, kind: 'error' }, { t: T.swiss + 0.4, kind: 'pop' }, { t: T.irr + 0.35, kind: 'correct' },
      { t: T.german + 0.2, kind: 'pop' }, { t: T.trans + 0.45, kind: 'correct' }, { t: T.equation, kind: 'pen' },
    ];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 8, vy: 2.5, max: 60 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    // hunch → theorem
    note(g, 'a hunch', 180, 190, prog(t, T.thisW - 0.25, T.isnt), { size: 34 });
    strike(g, 166, 178, 370, 178, prog(t, T.isnt, T.hunch + 0.1), { seed: 13 });
    note(g, 'a theorem', 180, 240, prog(t, T.theorem - 0.1, T.theorem + 0.35), { color: C.blue, size: 34 });
    // Lambert
    const ph = 320, ly = 330, lx = 180;
    const lw = portrait(g, 'lambert', lx, ly, ph, prog(t, T.swiss, T.swiss + 0.6)).w;
    typed(g, 'Johann Heinrich Lambert', lx, ly + ph + 56, prog(t, T.johann, T.lambert + 0.3), `italic 600 44px ${CG}`, C.ink);
    note(g, '1728–1777 · swiss', lx, ly + ph + 92, prog(t, T.lambert, T.proved1 + 0.3), { size: 20 });
    const tx = lx + lw + 50;
    typed(g, this.Y.lambert, tx, ly + 90, prog(t, T.y1761, T.y61 + 0.3), `600 96px ${CG}`, C.ink);
    note(g, 'proved: π is', tx, ly + 150, prog(t, T.proved1, T.irr), { color: C.ink, size: 24 });
    note(g, 'irrational', tx, ly + 196, prog(t, T.irr, T.irr + 0.5), { color: C.blue, size: 34 });
    stamp(g, 'Q.E.D.', tx + 120, ly + 280, prog(t, T.irr + 0.35, T.irr + 0.7), `600 54px ${CG}`, C.blue, { rot: -0.1 });
    // → hơn một thế kỷ
    arrow(g, tx + 260, ly + 60, 960, ly + 60, prog(t, T.more, T.later + 0.2), { color: C.leadT, w: 2, bend: -40 });
    note(g, 'more than a century', tx + 270, ly - 24, prog(t, T.century - 0.2, T.later + 0.3), { size: 20 });
    // Lindemann
    const rx = 1000;
    const rw = portrait(g, 'lindemann', rx, ly, ph, prog(t, T.german, T.german + 0.6), { rot: 0.02 }).w;
    typed(g, 'Ferdinand von Lindemann', rx, ly + ph + 56, prog(t, T.ferdinand, T.lindemann + 0.4), `italic 600 44px ${CG}`, C.ink);
    note(g, '1852–1939 · german', rx, ly + ph + 92, prog(t, T.lindemann, T.stronger), { size: 20 });
    const ux = rx + rw + 50;
    typed(g, this.Y.lindemann, ux, ly + 90, prog(t, T.y1882, T.y82 + 0.3), `600 96px ${CG}`, C.ink);
    note(g, 'even stronger:', ux, ly + 150, prog(t, T.stronger - 0.3, T.stronger + 0.4), { color: C.ink, size: 24 });
    note(g, 'transcendental', ux, ly + 196, prog(t, T.trans, T.trans + 0.6), { color: C.blue, size: 28 });
    stamp(g, 'Q.E.D.', ux + 120, ly + 280, prog(t, T.trans + 0.45, T.trans + 0.8), `600 54px ${CG}`, C.blue, { rot: 0.07 });
    // dòng đa thức: π không là nghiệm
    const py = 900, F = `600 72px ${CG}`;
    typed(g, 'a·xⁿ + … + c = 0', 180, py, prog(t, T.solution, T.equation + 0.3), F, C.ink);
    typed(g, 'x =', 820, py, prog(t, T.equation + 0.2, T.equation + 0.4), `italic 600 72px ${CG}`, C.leadT);
    typed(g, 'π', 940, py, prog(t, T.equation + 0.4, T.equation + 0.5), `italic 700 96px ${CG}`, C.blue);
    cross(g, 1040, py - 28, 30, prog(t, T.coeff + 0.2, T.coeff + 0.6), { seed: 23, w: 5 });
    leader(g, [[206, py + 14], [206, py + 46], [260, py + 46]], prog(t, T.whole, T.whole + 0.3));
    mono(g, 'a … c: WHOLE NUMBERS', 272, py + 54, prog(t, T.whole, T.coeff + 0.4), C.leadT);
    note(g, 'no finite algebra pins π down', 1120, py - 10, prog(t, T.finite, T.down + 0.2), { color: C.blue, size: 24 });
    g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'III', 'PROVED', 'lambert · lindemann');
  }
}
