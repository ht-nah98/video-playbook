// e1 · The real choice (MỞ HỒI IV, câu 79–85). Một tấm thảm dài, camera đi xuống qua ba vùng:
//   0 câu phản biện trên giấy nhớ, khoanh "distributive law"; "exactly right" → dấu "THE ONE REAL CHOICE"
//   1 bậc thang mở rộng số: counting numbers → negatives → fractions, mỗi bậc cùng một câu hỏi; "the new territory"
//   2 Peacock 1830, Hankel 1867 (ảnh ≤ 300 px), "the principle of permanence" → "KEEP THE OLD RULES WORKING"
import { W, H, C, CG, ARC, MONO, clamp, smooth, prog, ground, card, actTitle, typed, label, mono, quote, eq, tile, stickyNote,
  line, ring, check, stamp, arrow, portrait, num, lookup, must } from '../kit.js';

const ZONE = 1080;

export default class Choice {
  static ERA = 'mat';
  static IMAGES = { peacock: './assets/history/peacock.jpg', hankel: './assets/history/hankel.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      push: w(79, 'push'), question0: w(79, 'question'), e79: L(79).end,
      used: w(80, 'used'), law: w(80, 'law'), how: w(80, 'how'), know: w(80, 'know'), numbers: w(80, 'numbers'), maybe: w(80, 'maybe'),
      convention: w(80, 'convention'), hiding: w(80, 'hiding'), e80: L(80).end,
      exactly: w(81, 'exactly'), right: w(81, 'right'), one: w(81, 'one'), choice: w(81, 'choice'), e81: L(81).end,
      widened: w(82, 'widened'), counting: w(82, 'counting'), negatives: w(82, 'negatives'), whole: w(82, 'whole'), fractions: w(82, 'fractions'),
      faced: w(82, 'faced'), question: w(82, 'question'), e82: L(82).end,
      how83: w(83, 'how'), multiplying: w(83, 'multiplying'), here: w(83, 'here'), newT: w(83, 'new'), territory: w(83, 'territory'), e83: L(83).end,
      thirty: w(84, 'thirty'), english: w(84, 'english'), peacock: w(84, 'peacock'), answer: w(84, 'answer'), sixtyseven: w(84, 'sixty-seven'),
      hankel: w(84, 'hankel'), germany: w(84, 'germany'), sharply: w(84, 'sharply'), e84: L(84).end,
      principle: w(85, 'principle'), permanence: w(85, 'permanence'), extend: w(85, 'extend'), numbers85: w(85, 'numbers'), keep: w(85, 'keep'), working: w(85, 'working'),
      far: w(85, 'far'), can: w(85, 'can'), e85: L(85).end,
    };
    this.START = L(79).start; this.FROM = this.START - 2.6;
    this.PAN = [this.FROM, L(82).start - 0.6, L(84).start + 0.4];
    this.V = { half: must('1 / 2', 0.5), neg34: must('-3 / 4', -0.75) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.push - 0.1, kind: 'snap' }, { t: T.know, kind: 'question' }, { t: T.one, kind: 'tick' },
      { t: T.negatives + 0.1, kind: 'chip' }, { t: T.how83, kind: 'question' },
      { t: this.PAN[2] + 0.6, kind: 'snap' }, { t: T.sixtyseven - 0.1, kind: 'snap' }, { t: T.principle - 0.1, kind: 'tick' }, { t: T.keep, kind: 'correct' },
    ];
  }
  cam(t) {                                            // như a0: vùng hiện tại + trôi chậm 3 px/s xuống trong vùng
    const P = this.PAN; let s = 0; for (let i = 0; i < P.length; i++) if (t >= P[i]) s = i;
    const e = s ? smooth(prog(t, P[s], P[s] + 1.0)) : 1, from = s ? (s - 1) * ZONE + Math.min(60, 3 * (P[s] - P[s - 1])) : 0;
    const y0 = s * ZONE + Math.min(60, 3 * Math.max(0, t - P[s] - (s ? 1.0 : 0)));
    return { x: 0, y: from + (y0 - from) * e };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01 && c.y < ZONE * 1.99) this.zone1(g, t, ZONE);
    if (c.y > ZONE * 1.01) this.zone2(g, t, 2 * ZONE);
    g.restore();
    actTitle(g, t, this.START, 'IV', 'Convention, or forced?', 'answers question 3');
    card(g, prog(t, this.START + 0.3, this.START + 1.7) - prog(t, this.PAN[1] - 0.6, this.PAN[1]), 'act IV', 'THE REAL CHOICE');
  }
  zone0(g, t) {
    const T = this.T, x = 360, y = 250, w = 860, h = 320;
    // câu phản biện: giấy nhớ dán vào lúc "push back", chữ viết theo lời
    const inNote = stickyNote(g, x, y, w, h, prog(t, T.push - 0.3, T.push + 0.2), { rot: -0.02 });
    inNote(() => {
      typed(g, 'But…', 48, 76, prog(t, T.push, T.e79), `italic 600 44px ${CG}`, C.noteDim);
      typed(g, 'You used the distributive law.', 48, 146, prog(t, T.used, T.law + 0.4), `italic 600 48px ${CG}`, C.noteInk);
      typed(g, 'How do you know it works', 48, 222, prog(t, T.how, T.know + 0.3), `800 46px ${ARC}`, C.noteInk, { ls: 0.5 });
      typed(g, 'for negative numbers?', 48, 278, prog(t, T.know + 0.3, T.numbers + 0.3), `800 46px ${ARC}`, C.noteInk, { ls: 0.5 });
      // "maybe that is where the convention is hiding" → khoanh đúng cụm "distributive law" trên giấy
      g.save(); g.font = `italic 600 48px ${CG}`; const a = g.measureText('You used the ').width, b = g.measureText('distributive law').width; g.restore();
      ring(g, 48 + a + b / 2 + 8, 132, b / 2 + 14, 38, prog(t, T.maybe, T.convention), { color: C.noteInk, w: 3.5 });
    });
    label(g, 'is the convention hiding here?', x + 40, y + h + 64, prog(t, T.convention - 0.2, T.hiding + 0.5), { color: C.ink, size: 24 });
    // "exactly right": ✓ cạnh giấy; "the one place … a choice" → dấu THE ONE REAL CHOICE
    check(g, x + w + 90, y + 150, 40, prog(t, T.exactly, T.right + 0.2), { color: C.ink, w: 7 });
    stamp(g, 'THE ONE REAL CHOICE', W / 2, 820, prog(t, T.one - 0.1, T.one + 0.25), { size: 56, color: C.ink, rot: -0.04 });
    label(g, 'people really did make a choice here', W / 2, 920, prog(t, T.one + 0.4, T.e81 + 0.3), { align: 'center', size: 22 });
  }
  zone1(g, t, Y) {
    const T = this.T;
    // câu hỏi chung của mọi lần mở rộng
    quote(g, 'How should adding and multiplying work out here?', 140, Y + 250, prog(t, T.how83, T.here + 0.3), { size: 56 });
    // bậc thang: ba bậc đi lên, mỗi bậc một thế giới số
    const S = [
      { at: this.PAN[1] + 0.9, name: 'counting numbers', kind: 'p', vals: [['1, 2, 3, …', C.posT]] },
      { at: T.negatives, name: 'negatives', kind: 'n', vals: [[`${num(-1)}, ${num(-2)}, ${num(-3)}, …`, C.negT]] },
      { at: T.fractions, name: 'fractions', kind: 'f', vals: [['1/2', C.posT], [' · '], [`${num(-3)}/4`, C.negT]] },
    ];
    const kw = prog(t, this.PAN[1] + 0.5, T.widened + 0.6);
    if (kw > 0) label(g, 'widening the world of numbers', 140, Y + 340, kw, { size: 22 });
    S.forEach((st, i) => {
      const x0 = 160 + i * 560, yT = Y + 900 - i * 170, k = prog(t, this.PAN[1] + 0.6 + i * 0.4, this.PAN[1] + 1.2 + i * 0.4);
      if (k <= 0) return;
      // riser + tread (thước kẻ trên thảm)
      line(g, [[x0, yT + 170 * (i ? 1 : 0.6)], [x0, yT], [x0 + 500, yT]], C.ink, 3, { k });
      const ts = 60;
      for (let j = 0; j < 3; j++) {
        const kt = prog(t, st.at + j * 0.1, st.at + 0.35 + j * 0.1), tx = x0 + 30 + j * (ts + 14), ty = yT - ts - 14;
        if (st.kind === 'f') {               // phân số: nửa viên (vàng) và ba phần tư viên (đỏ), cắt bằng clip
          const f = j === 0 ? this.V.half : -this.V.neg34; if (j > 1) continue;
          g.save(); g.beginPath(); g.rect(tx - 10, ty - 60, ts * f + 10, ts + 80); g.clip();
          tile(g, tx, ty, ts, j === 0 ? 'p' : 'n', { k: kt }); g.restore();
        } else tile(g, tx, ty, ts, st.kind, { k: kt });
      }
      label(g, st.name, x0 + 30, yT + 44, prog(t, st.at - 0.1, st.at + 0.5), { color: C.ink, size: 22 });
      eq(g, st.vals, x0 + 30, yT + 92, 34, prog(t, st.at + 0.1, st.at + 0.7));
      // mỗi lần mở rộng: cùng một câu hỏi
      if (i) typed(g, '?', x0 - 50, yT + 120, prog(t, T.faced + (i - 1) * 0.25, T.question + (i - 1) * 0.25), `italic 600 96px ${CG}`, C.ink, { align: 'center' });
      if (i) arrow(g, x0 - 300, yT + 110, x0 + 10, yT + 30, prog(t, st.at - 0.5, st.at), { color: C.dim, w: 2.4, bend: -40, seed: 20 + i });
    });
    label(g, 'from whole numbers', 160 + 2 * 560 + 30, Y + 900 - 340 - 110, prog(t, T.whole - 0.1, T.fractions), { size: 18 });
    // "in the new territory": viền đứt quanh bậc trên cùng
    const kn = prog(t, T.newT - 0.1, T.territory + 0.3);
    if (kn > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.setLineDash([10, 8]); g.globalAlpha = clamp(kn * 2);
      g.beginPath(); g.roundRect(1296, Y + 372, 520 * kn, 320, 16); g.stroke(); g.restore();
      label(g, 'the new territory', 1310, Y + 352, kn, { color: C.ink, size: 20 });
    }
  }
  zone2(g, t, Y) {
    const T = this.T, h = 300;
    portrait(g, 'peacock', 200, Y + 250, h, prog(t, this.PAN[2] + 0.5, this.PAN[2] + 1.2),
      { rot: -0.03, label: { name: 'George Peacock', life: '1830 · England', note: 'permanence of equivalent forms' } });
    portrait(g, 'hankel', 700, Y + 250, h, prog(t, T.sixtyseven - 0.3, T.sixtyseven + 0.5),
      { rot: 0.025, label: { name: 'Hermann Hankel', life: '1867 · Germany', note: 'permanence of formal laws' } });
    label(g, 'even more sharply', 700, Y + 250 + h + 150, prog(t, T.sharply - 0.3, T.e84 + 0.3), { color: C.dim, size: 18 });
    // nguyên lý bền vững
    label(g, 'the principle of permanence', 1180, Y + 330, prog(t, T.sixtyseven + 0.5, T.sixtyseven + 1.6), { color: C.ink, size: 26 });
    line(g, [[1180, Y + 346], [1670, Y + 346]], C.ink, 2.4, { k: prog(t, T.principle, T.permanence + 0.3) });   // gạch chân khi tên được đọc
    quote(g, 'When you extend the numbers,', 1180, Y + 420, prog(t, T.extend - 0.3, T.numbers85 + 0.4), { size: 46 });
    // bậc thang thu nhỏ: luật cũ đi theo lên bậc mới
    const km = prog(t, T.extend - 0.2, T.extend + 0.5);
    if (km > 0) {
      line(g, [[1180, Y + 740], [1180, Y + 680], [1360, Y + 680], [1360, Y + 620], [1540, Y + 620], [1540, Y + 560], [1720, Y + 560]], C.dim, 2.4, { k: km });
      const kk = prog(t, T.keep, T.working + 0.4);
      ['+', '×'].forEach((s, i) => {
        const p = smooth(kk), x = 1220 + i * 70 + p * 360, y = Y + 664 - p * 120;
        typed(g, s, x, y, clamp(km * 2), `600 48px ${ARC}`, C.ink, { align: 'center' });
      });
    }
    typed(g, 'KEEP THE OLD RULES WORKING', W / 2, Y + 850, prog(t, T.keep, T.working + 0.4), `800 76px ${ARC}`, C.ink, { align: 'center', ls: 2 });
    label(g, 'as far as you possibly can', W / 2, Y + 920, prog(t, T.far - 0.1, T.can + 0.4), { align: 'center', size: 24 });
  }
}
