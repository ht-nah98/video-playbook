// c4 · Even Euler (câu 36–39). Ảnh Euler dán thảm bên trái; lập luận của sách đại số 1770 bên phải:
//   (−a) × (−b) = ? → hai ô "ab" | "−ab" (twoways) → ô "−ab" có giấy nhớ "TAKEN BY (−a) × b" → "?" thành "ab"
//   → hai câu Euler bỏ ngỏ: ô thứ ba trống "?" (sao chỉ hai?) + giấy nhớ thứ hai "(−a) × (−b)" dưới ô "−ab" (hai tích trùng?).
//   KHÔNG gạch băng (§58): nhãn ngà "SOUNDS LIKE A PROOF" viết ở câu 36, thêm "· ISN'T" lúc "Euler doesn't say".
import { H, C, CG, clamp, prog, ground, drift, card, typed, label, quote, eq, tile, stickyNote,
  figure, portrait, lookup } from '../kit.js';

// ô lựa chọn: khung viền đứt (hoặc liền khi được chọn) — k vẽ vào, solid = viền ngà liền
function box(g, x, y, w, h, k, { color = C.dim, solid = 0 } = {}) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k * 2); g.lineWidth = 2.4;
  g.strokeStyle = color; g.setLineDash([10, 8]); g.beginPath(); g.roundRect(x, y, w, h, 14); g.stroke();
  if (solid > 0) { g.globalAlpha = clamp(solid); g.strokeStyle = C.ink; g.lineWidth = 4; g.setLineDash([]); g.stroke(); }
  g.restore();
}

export default class Euler {
  static ERA = 'mat';
  static IMAGES = { euler: './assets/history/euler.jpg' };
  static POSES = ['twoways'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      euler: w(36, 'euler'), algebra: w(36, 'algebra'), seventeen: w(36, 'seventeen'), sounds: w(36, 'sounds'), e36: L(36).end,
      minus1: w(37, 'minus', 1), b1: w(37, 'b', 1), said: w(37, 'said'), either: w(37, 'either'), ab1: w(37, 'a', 2),
      or: w(37, 'or'), minus3: w(37, 'minus', 3), e37: L(37).end,
      taken: w(38, 'taken'), by: w(38, 'by'), times: w(38, 'times'), b38: w(38, 'b', 2), so: w(38, 'so'), left: w(38, 'left'),
      ab38: w(38, 'a', 3), e38: L(38).end,
      only: w(39, 'only'), choices: w(39, 'choices'), why2: w(39, 'why', 2), products: w(39, 'products'), answer: w(39, 'answer'),
      doesnt: w(39, "doesn't"), e39: L(39).end,
    };
    this.START = L(36).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.said, kind: 'snap' },                      // hai ô lựa chọn
      { t: T.taken, kind: 'snap' },                     // giấy nhớ "taken"
      { t: T.only, kind: 'question' },                  // ô thứ ba "?"
      { t: T.doesnt, kind: 'tick' },                    // "· ISN'T"
    ];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 2, vy: 1, max: 40 });
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.mat(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.4, this.FROM + 1.8), 'ACT II', 'EVEN EULER');
    figure(g, 'twoways', 1650, H, 740, prog(t, T.minus1 - 0.5, T.minus1 - 0.15) - prog(t, T.so, T.so + 0.35));
  }
  mat(g, t) {
    const T = this.T;
    portrait(g, 'euler', 160, 236, 500, prog(t, this.FROM + 0.3, this.FROM + 1.0),
      { label: { name: 'Leonhard Euler', life: '1707–1783', note: 'algebra textbook · 1770' } });
    quote(g, 'Vollständige Anleitung zur Algebra', 640, 270, prog(t, T.algebra, T.seventeen + 0.6), { size: 44, color: C.dim });

    // (−a) × (−b) = ?  →  "?" thay bằng "ab" khi "the only thing left is a b"
    const X0 = 640, EY = 380;
    const r = eq(g, [['(−a)', C.negT], [' × '], ['(−b)', C.negT], [' = ']], X0, EY, 80, prog(t, T.minus1, T.b1 + 0.4));
    const qx = r[3][1] + 8, kab = prog(t, T.ab38 - 0.05, T.ab38 + 0.3);
    if (kab <= 0) typed(g, '?', qx, EY, prog(t, T.b1 + 0.3, T.b1 + 0.5), `italic 600 96px ${CG}`, C.ink);
    else eq(g, [['ab', C.posT]], qx, EY, 80, kab);

    // hai ô: "ab" | "−ab"
    const BY = 440, BW = 300, BH = 250, B1 = 640, B2 = 990, B3 = 1340, s = 84;
    const kb1 = prog(t, T.said - 0.1, T.said + 0.3), kb2 = prog(t, T.or - 0.1, T.or + 0.3);
    box(g, B1, BY, BW, BH, kb1, { solid: prog(t, T.left, T.left + 0.4) });
    box(g, B2, BY, BW, BH, kb2);
    tile(g, B1 + BW / 2 - s / 2, BY + 30, s, 'p', { k: prog(t, T.ab1 - 0.1, T.ab1 + 0.3) });
    eq(g, [['ab', C.posT]], B1 + BW / 2, BY + 184, 64, prog(t, T.ab1, T.ab1 + 0.3), { align: 'center' });
    tile(g, B2 + BW / 2 - s / 2, BY + 30, s, 'n', { k: prog(t, T.minus3 - 0.1, T.minus3 + 0.3) });
    eq(g, [['−ab', C.negT]], B2 + BW / 2, BY + 184, 64, prog(t, T.minus3, T.e37 + 0.1), { align: 'center' });
    label(g, 'choice 1', B1 + 18, BY - 14, kb1, { size: 16 });
    label(g, 'choice 2', B2 + 18, BY - 14, kb2, { size: 16 });

    // "−ab is already taken, by (−a) × b": giấy nhớ dán lên mép dưới ô 2
    const inNote = stickyNote(g, B2 + 20, BY + BH - 30, BW - 40, 96, prog(t, T.taken - 0.3, T.taken + 0.1), { rot: 0.03 });
    inNote(() => {
      typed(g, 'TAKEN BY', 20, 34, prog(t, T.taken, T.by + 0.2), `500 18px "IBM Plex Mono"`, C.noteDim, { ls: 2.5 });
      eq(g, [['(−a)', C.noteNeg], [' × b', C.noteInk]], 20, 78, 38, prog(t, T.by + 0.1, T.b38 + 0.3));
    });

    // câu hỏi 1: sao chỉ hai lựa chọn? → ô thứ ba trống, "?"
    const kq1 = prog(t, T.only - 0.2, T.only + 0.3);
    box(g, B3, BY, BW, BH, kq1, { color: C.ink });
    typed(g, '?', B3 + BW / 2, BY + 170, prog(t, T.only, T.choices), `italic 600 150px ${CG}`, C.ink, { align: 'center' });
    label(g, 'choice 3?', B3 + 18, BY - 14, kq1, { size: 16, color: C.ink });
    quote(g, 'why only two choices?', B3 + BW / 2, BY + BH + 66, prog(t, T.only, T.choices + 0.6), { size: 44, align: 'center' });

    // câu hỏi 2: hai tích khác nhau cho cùng đáp án? → giấy nhớ thứ hai "(−a) × (−b)?" dán ngay dưới tờ "taken by"
    const inNote2 = stickyNote(g, B2 + 30, BY + BH + 78, BW - 60, 92, prog(t, T.why2 - 0.2, T.why2 + 0.2), { rot: -0.035 });
    inNote2(() => {
      typed(g, 'SAME ANSWER?', 18, 32, prog(t, T.why2, T.products), `500 18px "IBM Plex Mono"`, C.noteDim, { ls: 2.5 });
      eq(g, [['(−a)', C.noteNeg], [' × ', C.noteInk], ['(−b)', C.noteNeg]], 18, 74, 36, prog(t, T.products - 0.2, T.products + 0.4));
    });
    quote(g, 'why can’t two different products give the same answer?', 640, BY + BH + 230,
      prog(t, T.why2, T.answer + 0.4), { size: 44 });

    // nhãn chốt (ngà, KHÔNG gạch): viết ở câu 36, thêm "· ISN'T" lúc "Euler doesn't say"
    const LY = 984;
    label(g, 'sounds like a proof', 640, LY, prog(t, T.sounds - 0.1, T.e36 + 0.3), { color: C.ink, size: 24 });
    g.save(); g.font = `500 24px "IBM Plex Mono"`; g.letterSpacing = '2.5px'; const lw = g.measureText('SOUNDS LIKE A PROOF ').width; g.restore();
    label(g, '· isn’t', 640 + lw, LY, prog(t, T.doesnt, T.e39), { color: C.ink, size: 24 });
  }
}
