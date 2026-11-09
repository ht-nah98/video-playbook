// ACT ONE (p2, câu 5–11) — "People have done this". DNA §1: Buffon / Pearson / Kerrich = ba ngọn đèn ghi số;
// Bernoulli 1713 = ảnh Ars Conjectandi. Bố cục:
//   câu 5–8   ba đèn bão buông xuống từ trên (x 470 / 960 / 1450), mỗi đèn thắp lên đúng lúc đọc tên; biển dưới đèn:
//             tên, số lần tung, số ngửa, tỉ lệ (must)
//   câu 9     dải phóng to 49%–51% (1% = 300 px): ba hàng, mỗi người một đốm rơi xuống cạnh vạch ½ vàng — "a hair"
//   câu 10–11 camera trôi phải 1500 px (đèn ra trái bằng chuyển động); trái: "the law of large numbers" + vệt hội tụ nhỏ;
//             phải: trang tên Ars Conjectandi (1713)
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, C, CG, MONO, sky, glow, lantern, hand, seg, typed, text, label,
  card, portrait, must, fmt, lookup } from '../kit.js';

const LAMP_Y = 300, S = 0.62;                              // đèn bão của ba người (toạ độ thế giới)
const STRIP = { x50: 960, per: 300, y: 820, dy: 46 };      // dải 49–51%: x = x50 + (p − 50)·per
const PAN = 1950;                                          // camera trôi phải ở câu 10

export default class Hand {
  static ERA = 'night';
  static POSES = [];
  static IMAGES = { ars: './assets/history/ars-conjectandi-1713.gif' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1b');
    this.T = {
      people: w(5, 'people'), hand: w(5, 'hand'),
      buffon: w(6, 'buffon'), four: w(6, 'four'), two: w(6, 'two'), h6: w(6, 'heads'), century: w(6, 'eighteenth'),
      karl: w(7, 'karl'), stat: w(7, 'statistician'), tf: w(7, 'twenty-four'), twelve: w(7, 'twelve'), twelve2: w(7, 'twelve', 2),
      war: w(8, 'second'), kerrich: w(8, 'kerrich'), intern: w(8, 'internment'), ten: w(8, 'ten'), five: w(8, 'five'), h8: w(8, 'heads'),
      every: w(9, 'every'), hair: w(9, 'hair'), half: w(9, 'half'),
      law: w(10, 'law'), large: w(10, 'large'), numbers: w(10, 'numbers'), bern: w(10, 'bernoulli'), book: w(10, 'book'), year: w(10, 'seventeen'),
      observe: w(11, 'observe'), converge: w(11, 'converge'), theor: w(11, 'theoretical'), trials: w(11, 'trials'), grows: w(11, 'grows'),
    };
    this.START = L(5).start; this.FROM = this.START - 1.2;
    const T = this.T;
    // ba người tung tay (CONTENT "Lấp thông tin" 1) — tỉ lệ làm tròn 2 chữ số, kiểm bằng must
    this.P = [
      { x: 470, name: 'Buffon', sub: '18TH CENTURY · NATURALIST', n: must('4040', 4040), k: must('2048', 2048),
        pct: must('Math.round(2048 / 4040 * 10000) / 100', 50.69), approx: true,
        t: { lit: T.buffon, sub: T.century, n: T.four, k: T.two, p: T.h6 } },
      { x: 960, name: 'Karl Pearson', sub: 'STATISTICIAN', n: must('24000', 24000), k: must('12012', 12012),
        pct: must('12012 / 24000 * 100', 50.05), approx: false,
        t: { lit: T.karl, sub: T.stat, n: T.tf, k: T.twelve, p: T.twelve2 } },
      { x: 1450, name: 'John Kerrich', sub: 'WWII · INTERNED IN DENMARK', n: must('10000', 10000), k: must('5067', 5067),
        pct: must('5067 / 10000 * 100', 50.67), approx: false,
        t: { lit: T.kerrich, sub: T.intern, n: T.ten, k: T.five, p: T.h8 } },
    ];
    // vệt hội tụ nhỏ (câu 11): tung tất định, vẽ theo log n tới 10 000
    let c = 0; this.mini = [];
    for (let i = 1; i <= 10000; i++) { c += hash(i * 0.9137 + 71.3) < 0.5 ? 1 : 0; if (i <= 20 || i % 25 === 0) this.mini.push([i, c / i]); }
  }
  sfx() {
    const T = this.T;
    return [{ t: T.buffon, kind: 'pop' }, { t: T.karl, kind: 'pop' }, { t: T.kerrich, kind: 'pop' }, { t: T.hair, kind: 'tick' },
      { t: T.bern + 0.1, kind: 'pop' }, { t: T.converge, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    sky(g, t, { fog: 0.8, y: 0.72 });
    const pan = PAN * smooth(prog(t, T.law - 0.5, T.law + 1.3));
    const drift = 14 * Math.sin(t * 0.21);                              // trôi rất nhẹ khi chưa pan (khung không đứng)
    g.save(); g.translate(-pan + drift * (1 - pan / PAN), 0);

    // ── ba ngọn đèn buông xuống ("people have actually done this, by hand"), thắp lên lúc đọc tên ──
    this.P.forEach((p, i) => {
      const drop = outBack(prog(t, T.people + i * 0.35 - 0.2, T.people + i * 0.35 + 0.8));
      const y = -260 + (LAMP_Y + 260) * drop + 6 * Math.sin(t * 1.3 + i * 2);      // đung đưa nhẹ trên dây
      g.save(); g.strokeStyle = '#2A2016'; g.lineWidth = 3; g.beginPath(); g.moveTo(p.x, -10); g.lineTo(p.x, y - 118 * S - 14); g.stroke(); g.restore();
      const on = outCubic(prog(t, p.t.lit - 0.15, p.t.lit + 0.5)) * (1 - 0.35 * prog(t, T.law, T.law + 1));
      lantern(g, p.x, y, S, t + i, on);
      // biển ghi số dưới đèn
      const ty = LAMP_Y + 140;
      typed(g, p.name, p.x, ty, prog(t, p.t.lit, p.t.lit + 0.5), `italic 600 54px ${CG}`, C.ivory, { align: 'center' });
      typed(g, p.sub, p.x, ty + 40, prog(t, p.t.sub, p.t.sub + 0.8), `500 20px ${MONO}`, C.fog, { align: 'center' });
      typed(g, `${fmt(p.n)} FLIPS`, p.x, ty + 102, prog(t, p.t.n, p.t.n + 0.5), `500 26px ${MONO}`, C.ivory, { align: 'center' });
      typed(g, `${fmt(p.k)} HEADS`, p.x, ty + 142, prog(t, p.t.k, p.t.k + 0.5), `500 26px ${MONO}`, C.ivory, { align: 'center' });
      const kp = outBack(prog(t, p.t.p - 0.1, p.t.p + 0.35));
      if (kp > 0) { g.save(); g.translate(p.x, ty + 236); g.scale(0.6 + 0.4 * kp, 0.6 + 0.4 * kp);
        text(g, `${p.approx ? '≈ ' : ''}${p.pct.toFixed(2)}%`, 0, 0, `600 72px ${CG}`, C.amber, 'center'); g.restore(); }
    });

    // ── dải 49–51% ("a hair away from one half"): vạch ½ vàng, ba hàng, đốm rơi từ biển xuống ──
    const kS = prog(t, T.every - 0.2, T.every + 0.7);
    if (kS > 0) {
      const { x50, per, y, dy } = STRIP, xa = x50 - per * 1.2, xb = x50 + per * 1.2;
      [-1, 0, 1].forEach(d => { g.fillStyle = 'rgba(142,162,184,0.7)'; g.fillRect(x50 + d * per - 1, y - dy - 20, 2, dy * 2 + 40 * kS);
        if (d) typed(g, `${50 + d}%`, x50 + d * per, y + dy + 62, kS * 2 - 1, `500 20px ${MONO}`, C.fog, { align: 'center' }); });
      this.P.forEach((p, i) => {
        const ry = y + (i - 1) * dy;
        hand(g, seg(xa, ry, xb, ry, 30), { w: 2, color: 'rgba(142,162,184,0.55)', k: outCubic(kS), seed: 3 + i });
        typed(g, p.name.split(' ').at(-1).toUpperCase(), xa - 20, ry + 7, kS * 1.5 - 0.3, `500 20px ${MONO}`, C.fog, { align: 'right' });
        // đốm: rời con số trên biển, rơi xuống hàng của mình
        const u = smooth(prog(t, T.every + 0.1 + i * 0.22, T.every + 0.9 + i * 0.22));
        if (u > 0) { const tx = x50 + (p.pct - 50) * per, sx = p.x, sy = LAMP_Y + 360;
          const x = sx + (tx - sx) * u, yy = sy + (ry - sy) * u;
          glow(g, x, yy, 34, 'rgba(244,184,96,0.7)'); g.fillStyle = '#FFE3A8'; g.beginPath(); g.arc(x, yy, 7, 0, 7); g.fill(); }
      });
      const kH = outCubic(prog(t, T.every, T.every + 0.6));
      g.save(); g.strokeStyle = C.gold; g.lineWidth = 3; g.beginPath(); g.moveTo(x50, y - dy - 26); g.lineTo(x50, y - dy - 26 + (dy * 2 + 52) * kH); g.stroke(); g.restore();
      typed(g, '½', x50, y + dy + 72, kH * 2 - 0.6, `600 60px ${CG}`, C.gold, { align: 'center' });
      // "a hair": khe nhỏ giữa ½ và Buffon, có ngoặc đo
      const kHair = prog(t, T.hair - 0.1, T.hair + 0.5);
      if (kHair > 0) { const xB = x50 + (this.P[0].pct - 50) * per, yB = y - dy - 22;
        hand(g, [[x50, yB + 8], [x50, yB], [xB, yB], [xB, yB + 8]], { w: 2, color: C.amber, k: kHair, jit: 0.6, seed: 9 });
        typed(g, 'a hair away from ½', xb + 40, y + 12, prog(t, T.hair, T.half + 0.3), `italic 600 44px ${CG}`, C.ivory); }
    }

    // ── câu 10–11 (thế giới bên phải, x + PAN): luật số lớn + Ars Conjectandi ──
    const ox = PAN;
    typed(g, 'The law of large numbers', ox + 96, 330, prog(t, T.law, T.numbers + 0.4), `italic 600 72px ${CG}`, C.ivory);
    // vệt hội tụ nhỏ: "the frequency you observe will converge to the theoretical value"
    const MX0 = ox + 130, MX1 = ox + 1060, MY = 640, MA = 300;           // ½ ở MY; tỉ lệ 0..1 ↔ MY ± MA
    const kAx = prog(t, T.observe - 0.6, T.observe + 0.4);
    if (kAx > 0) {
      hand(g, seg(MX0, MY + MA * 0.5, MX0, MY - MA * 0.5, 12), { w: 2, color: 'rgba(142,162,184,0.7)', k: kAx, seed: 4 });
      hand(g, seg(MX0, MY + MA * 0.5, MX1, MY + MA * 0.5, 24), { w: 2, color: 'rgba(142,162,184,0.7)', k: kAx, seed: 6 });
      const kT = prog(t, T.theor - 0.2, T.theor + 0.6);
      if (kT > 0) { g.save(); g.setLineDash([14, 10]); g.strokeStyle = C.gold; g.lineWidth = 3; g.beginPath(); g.moveTo(MX0, MY); g.lineTo(MX0 + (MX1 - MX0) * kT, MY); g.stroke(); g.restore();
        typed(g, 'THEORETICAL VALUE', MX1 - 50, MY - 22, kT * 1.5 - 0.3, `500 20px ${MONO}`, C.gold, { align: 'right' });
        typed(g, '½', MX1 + 20, MY + 18, kT * 2 - 1, `600 60px ${CG}`, C.gold); }
      typed(g, 'OBSERVED FREQUENCY', MX0 + 20, MY - MA * 0.5 - 18, prog(t, T.observe, T.observe + 0.6), `500 20px ${MONO}`, C.amber);
      typed(g, 'NUMBER OF TRIALS →', MX1, MY + MA * 0.5 + 40, prog(t, T.trials, T.grows + 0.3), `500 20px ${MONO}`, C.fog, { align: 'right' });
      const kV = prog(t, T.converge - 0.3, T.grows + 0.2);
      if (kV > 0) {
        const last = Math.max(1, Math.floor(this.mini.length * kV)); let end = null;
        g.save(); g.strokeStyle = C.amber; g.lineWidth = 3.5; g.lineJoin = 'round'; g.beginPath();
        for (let j = 0; j < last; j++) { const [n, s] = this.mini[j], x = MX0 + (MX1 - MX0) * Math.log10(n) / 4, y = MY - (s - 0.5) * MA;
          j ? g.lineTo(x, y) : g.moveTo(x, y); end = [x, y]; }
        g.stroke(); g.restore();
        glow(g, end[0], end[1], 50, 'rgba(255,214,140,0.7)'); g.fillStyle = '#FFF3D0'; g.beginPath(); g.arc(end[0], end[1], 5, 0, 7); g.fill();
      }
    }
    // trang tên Ars Conjectandi (1713) trong khung đèn
    const kB = prog(t, T.bern - 0.2, T.bern + 0.9), BX = ox + 1240, BY = 236, BH = 500;
    if (kB > 0) {
      glow(g, BX + 255, BY + 250, 520, 'rgba(244,184,96,0.14)', kB);
      portrait(g, 'ars', 'night', BX, BY, BH, kB, { label: { name: 'Jacob Bernoulli', life: 'ARS CONJECTANDI' } });
      typed(g, '1713', BX + 510, BY + BH + 66, prog(t, T.year - 0.1, T.year + 0.5), `600 72px ${CG}`, C.ivory, { align: 'right' });
    }
    g.restore();

    card(g, 'night', 1, 'ACT ONE · FREQUENCY', 'Flip it again, and again');   // cùng mục ## với b1a: biển đứng sẵn, không gõ lại
  }
}
