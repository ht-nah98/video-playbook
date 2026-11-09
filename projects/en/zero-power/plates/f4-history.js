// f4 · An old argument (Act V, p2 câu 94–97). Dòng thời gian 1821 → 1833 → TODAY cố định trên đầu, ô 0⁰ (contested)
// làm con trỏ trượt theo năm; vùng dưới cuộn NGANG theo năm:
//   trang 0 (1821): Cauchy (ảnh điểm) + bìa Cours d'analyse + "TABLE OF UNDEFINED FORMS" có dòng 0^0
//   trang 1 (1833): Libri "0^0 = 1" (1 lam) · Möbius "PROOF" → âm bản + ERR → "WRONG" · "STILL ARGUED TODAY"
// Glyph Ö: kit không có → hàm cục bộ dmUml (vẽ O + hai chấm).
import { W, C, smooth, prog, ground, ink, card, dm, dmW, row, annunciators, contested, checker, bracket, seg7, dots, portrait, wrong, lookup, must } from '../kit.js';

const PAGE = 1920, TOP = 330;                           // trang cuộn ngang; vùng nội dung y > TOP
const SK = 0.105;                                       // nghiêng của ma trận điểm (khớp kit)
/** dm cho chuỗi có 'Ö': thay bằng O rồi chấm hai điểm trên đúng ký tự đó (khi ký tự đã gõ tới). */
function dmUml(d, s, x, y, p, col, { k = 1 } = {}) {
  const plain = s.replace(/Ö/g, 'O'), n = Math.round(plain.length * Math.min(1, Math.max(0, k)));
  const w = dm(d, plain, x, y, p, col, { k });
  [...s].forEach((ch, i) => {
    if (ch !== 'Ö' || i >= n) return;
    const cx = x + i * p * 6, r = -2;                   // hàng −2 (trên đỉnh chữ)
    d.fillStyle = col;
    for (const c of [1, 3]) d.fillRect(cx + c * p + (6 - r) * p * SK * 0.5, y + r * p, p * 0.84, p * 0.84);
  });
  return w;
}

const slot = (d, x, y, w, h) => {
  const c = `rgba(${C.inkRGB},0.2)`;
  dots(d, x, y, x + w, y, c, { step: 12 }); dots(d, x, y + h, x + w, y + h, c, { step: 12 });
  dots(d, x, y, x, y + h, c, { step: 12 }); dots(d, x + w, y, x + w, y + h, c, { step: 12 });
};

/** Ô 0⁰ tranh chấp cỡ nhỏ (contested của kit tràn ngoặc khi ô < ~200 px): caro + ngoặc + 1 lam | 0 gỉ. */
function miniCell(d, x, y, w, h, k = 1) {
  if (k <= 0) return;
  checker(d, x + 6, y + 6, x + w - 6, y + h - 6, 5, 0.10 * Math.min(1, k * 2));
  if (k > 0.25) bracket(d, x + 4, y + 4, x + w - 4, y + h - 4, Math.min(22, w * 0.18), 5, C.ink);
  const s = h * 0.5, yy = y + (h - s) / 2;
  if (k > 0.5) seg7(d, '1', x + w / 2 - s * 0.5 - 10, yy, s, C.one);
  if (k > 0.5) seg7(d, '0', x + w / 2 + 10, yy, s, C.zero);
}

export default class History {
  static ERA = 'lcd';
  static IMAGES = { cauchy: './assets/history/cauchy.jpg', cours: './assets/history/cours-danalyse-1821.jpg',
    libri: './assets/history/libri.jpg', mobius: './assets/history/mobius.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f4');
    this.T = {
      s94: L(94).start, old: w(94, 'old'),
      y1821: w(95, 'eighteen'), cauchy: w(95, 'augustin-louis'), table: w(95, 'table'), zz: w(95, 'zero', 2),
      undef: w(95, 'undefined'), course: w(95, 'course'), e95: L(95).end,
      y1833: w(96, 'eighteen'), libri: w(96, 'guglielmo'), argued: w(96, 'argued'), one: w(96, 'one'),
      mobius: w(96, 'august'), proof: w(96, 'proof'),
      wrong: w(97, 'wrong'), still: w(97, 'still'), classrooms: w(97, 'classrooms'), today: w(97, 'today'),
    };
    this.START = L(94).start; this.FROM = this.START - 1.2;
    this.PAN = this.T.y1833 - 0.5;
    this.Y = { a: must('1821', 1821), b: must('1833', 1833) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.y1821, kind: 'beep' }, { t: T.cauchy + 2.2, kind: 'chip' }, { t: T.y1833 + 0.1, kind: 'beep' },
      { t: T.one, kind: 'beep' }, { t: T.wrong, kind: 'error' },
    ];
  }
  render(g, t) {
    const T = this.T, cx = PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9));
    ground(g);
    ink(g, d => {
      annunciators(d, t >= T.wrong - 0.05 ? ['×', 'ERR'] : ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.2), 'ACT V', 'AN OLD ARGUMENT');
      this.timeline(d, t);
      d.save(); d.beginPath(); d.rect(0, TOP, W, 1080 - TOP); d.clip(); d.translate(-cx, 0);
      this.page0(d, t); this.page1(d, t);
      d.restore();
    });
  }

  // ── dòng thời gian cố định (toạ độ màn hình) + ô 0⁰ trượt theo năm ──
  timeline(d, t) {
    const T = this.T, y = 236, X = [300, 820, 1600];
    dots(d, 132, y, 1788, y, `rgba(${C.inkRGB},0.42)`, { step: 10, size: 5, k: prog(t, this.FROM + 0.3, T.old) });
    const lit = [t >= T.y1821, t >= T.y1833, t >= T.still];
    [String(this.Y.a), String(this.Y.b)].forEach((s, i) => {
      d.fillStyle = lit[i] ? C.ink : `rgba(${C.inkRGB},0.4)`; d.fillRect(X[i] - 3, y - 14, 6, 28);
      row(d, s, X[i] - 52, y + 24, 40, { color: lit[i] ? C.ink : `rgba(${C.inkRGB},0.25)` });
    });
    d.fillStyle = lit[2] ? C.ink : `rgba(${C.inkRGB},0.4)`; d.fillRect(X[2] - 3, y - 14, 6, 28);
    dm(d, 'TODAY', X[2], y + 30, 4, lit[2] ? C.ink : `rgba(${C.inkRGB},0.3)`, { align: 'center' });
    // con trỏ = ô 0⁰ tranh chấp: hiện ở 1821, trượt sang 1833 rồi tới TODAY
    const m1 = smooth(prog(t, this.PAN, this.PAN + 0.9)), m2 = smooth(prog(t, T.still - 0.1, T.still + 0.8));
    const mx = X[0] + (X[1] - X[0]) * m1 + (X[2] - X[1]) * m2;
    miniCell(d, mx - 70, y - 104, 140, 84, prog(t, this.FROM + 0.5, T.old + 0.4));
  }

  // ── trang 0: 1821 · Cauchy ──
  page0(d, t) {
    const T = this.T;
    if (t > this.PAN + 1.2) return;
    // ô chờ (viền đứt) cho ba món của trang
    const slots = [[132, 380, 330, 380], [610, 380, 225, 380], [1120, 380, 680, 380]];
    for (const [x, y, w, h] of slots) {
      const k = prog(t, this.FROM + 0.4, this.START + 1.0), c = `rgba(${C.inkRGB},0.2)`;
      dots(d, x, y, x + w, y, c, { step: 12, k }); dots(d, x, y + h, x + w, y + h, c, { step: 12, k });
      dots(d, x, y, x, y + h, c, { step: 12, k }); dots(d, x + w, y, x + w, y + h, c, { step: 12, k });
    }
    // Cauchy
    if (t > T.cauchy - 0.1) {
      const k = prog(t, T.cauchy - 0.1, T.cauchy + 1.4); portrait(d, 'cauchy', 142, 390, 360, k);
      const kl = prog(t, T.cauchy + 0.3, T.table);
      dm(d, 'AUGUSTIN-LOUIS CAUCHY', 132, 790, 4, C.ink, { k: kl });
      dm(d, '1789-1857', 132, 834, 3, C.dim, { k: kl * 2 - 0.5 });
    }
    // bìa Cours d'analyse (hiện vật)
    if (t > T.course - 0.15) {
      const k = prog(t, T.course - 0.15, T.course + 1.0);
      portrait(d, 'cours', 618, 390, 360, k);
      dm(d, "COURS D'ANALYSE", 610, 880, 3, C.dim, { k: k * 2 });
      dm(d, String(this.Y.a), 610, 910, 3, C.dim, { k: k * 2 - 0.6 });
    }
    // bảng dạng vô định: các dòng khác để mờ (không bịa nội dung), dòng 0^0 sáng
    if (t > T.table - 0.15) {
      const x = 1150, k = prog(t, T.table - 0.15, T.table + 0.8);
      dm(d, 'TABLE OF', x, 410, 5, C.ink, { k: k * 2 });
      dm(d, 'UNDEFINED FORMS', x, 470, 5, C.ink, { k: prog(t, T.undef - 0.1, T.undef + 0.5) });
      for (let i = 0; i < 4; i++) {
        const yy = 560 + i * 48;
        dots(d, x, yy + 34, x + 620, yy + 34, `rgba(${C.inkRGB},0.18)`, { step: 10, k });
        if (i !== 2) dm(d, '· · ·', x + 10, yy + 6, 3, `rgba(${C.inkRGB},0.25)`, { k });
      }
      const kz = prog(t, T.undef, T.undef + 0.6);
      if (kz > 0) {
        row(d, '0^0^', x + 10, 650, 40, { k: kz * 2 });
        dm(d, 'UNDEFINED', x + 110, 664, 4, C.ink, { k: kz });
      }
    }
  }

  // ── trang 1: 1833 · Libri và Möbius ──
  page1(d, t) {
    const T = this.T, o = PAGE;
    if (t < this.PAN - 0.1) return;
    // Libri
    const kl = prog(t, T.libri - 0.2, T.libri + 1.2);
    if (kl <= 0) slot(d, o + 132, 380, 380, 370);
    portrait(d, 'libri', o + 142, 390, 350, kl);
    dm(d, 'GUGLIELMO LIBRI', o + 132, 790, 4, C.ink, { k: prog(t, T.libri + 0.2, T.argued + 0.2) });
    dm(d, '1803-1869', o + 132, 834, 3, C.dim, { k: prog(t, T.libri + 0.5, T.argued + 0.6) });
    if (t > T.argued - 0.1) {
      const k = prog(t, T.argued - 0.1, T.one);
      dm(d, 'ARGUED', o + 600, 430, 4, C.dim, { k: k * 2 });
      row(d, [{ c: '0' }, { c: '0', sup: true }, { c: '=' }, { c: t >= T.one - 0.05 ? '1' : 'X', col: C.one }], o + 600, 480, 110, { k });
    }
    // Möbius
    const km = prog(t, T.mobius - 0.2, T.mobius + 1.2);
    if (km <= 0) slot(d, o + 1000, 380, 310, 370);
    if (t < T.argued - 0.1) slot(d, o + 590, 460, 330, 150);
    if (t < T.proof - 0.1) slot(d, o + 1340, 420, 300, 100);
    portrait(d, 'mobius', o + 1010, 390, 350, km);
    dmUml(d, 'AUGUST FERDINAND MÖBIUS', o + 1000, 790, 4, C.ink, { k: prog(t, T.mobius + 0.2, T.proof + 0.3) });
    dm(d, '1790-1868', o + 1000, 834, 3, C.dim, { k: prog(t, T.mobius + 0.5, T.proof + 0.6) });
    if (t > T.proof - 0.1) {
      const x = o + 1340, y = 440, p = 8, s = 'PROOF';
      dm(d, s, x + 10, y, p, C.ink, { k: prog(t, T.proof - 0.1, T.proof + 0.3) });
      wrong(d, x + 10, y, x + 10 + dmW(s, p), y + 7 * p, prog(t, T.wrong - 0.1, T.wrong + 0.35));
      if (t > T.wrong + 0.2) dm(d, 'WRONG', x + 10, y + 100, 6, C.ink, { k: prog(t, T.wrong + 0.2, T.wrong + 0.7) });
    }
    // still argued today
    if (t > T.still - 0.1) dm(d, 'STILL ARGUED TODAY · IN CLASSROOMS', o + 132, 930, 5, C.ink, { k: prog(t, T.still - 0.1, T.today + 0.2) });
  }
}
