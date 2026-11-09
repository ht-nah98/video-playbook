// b3 · The idea that wouldn't die (p2 câu 14–19) — PLATE I tiếp, một tờ dài hai vùng (camera đi xuống ở câu 17):
//   A · Trung Quốc: tượng Tổ Xung Chi (MODERN STATUE), vòng compa với các đa giác 6 → 96 bằng chì rồi 12 288 cạnh bằng
//       mực, DETAIL B (khe giữa trong / ngoài khép tới mức không thấy), 3.1415926 < π < 3.1415927, 355/113 (gạch dưới xanh
//       đúng 6 chữ số thập phân).
//   B · Châu Âu: trục thời gian "≈ 1 900 years" từ Archimedes tới 1610; van Ceulen (bản khắc); 2⁶² cạnh ≈ 4.6 quintillion;
//       35 chữ số khắc trong khung tên kiểu bia; "the Ludolphine number".
import { C, CG, MONO, ARC, PI, PI_DIGITS, clamp, smooth, prog, ground, card, typed, note, frac, line, poly,
  compassCircle, pivot, portrait, lookup, must, fix } from '../kit.js';
import { detailLens } from './b2-squeeze.js';

const tw = (g, s, font) => { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; };
const ZB = 1080;                                      // vùng B nằm dưới vùng A một khung

export default class Idea {
  static ERA = 'vellum';
  static POSES = [];
  static IMAGES = { zu: './assets/history/zu-chongzhi.jpg', vanceulen: './assets/history/van-ceulen.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      same: w(14, 'same'), again: w(14, 'again'), indep: w(14, 'independently'), china: w(14, 'china'),
      fifth: w(15, 'fifth'), zu: w(15, 'zu'), went: w(15, 'went'), polygon: w(15, 'polygon'), twelve: w(15, 'twelve'),
      eightyeight: w(15, 'eighty-eight'), sides: w(15, 'sides'), pinned: w(15, 'pinned'), seven: w(15, 'seven'),
      places15: w(15, 'places'),
      fraction: w(16, 'fraction'), three16: w(16, 'three'), thirteen: w(16, 'thirteen'), right: w(16, 'right'),
      places16: w(16, 'places'),
      europe: w(17, 'europe'), squeeze: w(17, 'squeeze'), choice: w(17, 'choice'), nineteen: w(17, 'nineteen'), years: w(17, 'years'),
      sixteen: w(18, 'sixteen'), ludolph: w(18, 'ludolph'), ceulen: w(18, 'ceulen'), doubling: w(18, 'doubling'),
      four: w(18, 'four'), quintillion: w(18, 'quintillion'), thirtyfive: w(18, 'thirty-five'), digits: w(18, 'digits'),
      carved: w(19, 'carved'), tombstone: w(19, 'tombstone'), german: w(19, 'german'), ludolphine: w(19, 'ludolphine'),
      end: L(19).end,
    };
    this.START = L(14).start; this.FROM = this.START - 1.2;
    this.PAN = L(17).start - 0.45;
    const T = this.T;
    const order = [T.same, T.indep, T.zu, T.went, T.polygon, T.twelve, T.sides, T.pinned, T.fraction, T.right, this.PAN,
      T.europe, T.squeeze, T.nineteen, T.sixteen, T.ludolph, T.doubling, T.four, T.thirtyfive, T.carved, T.german, T.ludolphine, T.end];
    order.forEach((v, i) => { if (i && !(order[i - 1] < v)) throw new Error(`b3: mốc ngược ở ${i}`); });
    // số trên hình
    this.N12 = must('6 * 2 ** 11', 12288);
    this.LO = fix('Math.floor(12288 * Math.sin(Math.PI / 12288) * 1e7) / 1e7', 7);
    this.HI = fix('Math.floor(12288 * Math.tan(Math.PI / 12288) * 1e7) / 1e7', 7);
    if (this.LO !== '3.1415926' || this.HI !== '3.1415927') throw new Error('b3: cận 12 288 cạnh sai');
    must('3.1415926 < Math.PI && Math.PI < 3.1415927', true);
    this.ZU = fix('355 / 113', 7);                     // 3.1415929
    must('Math.floor(355 / 113 * 1e6) === Math.floor(Math.PI * 1e6) && Math.floor(355 / 113 * 1e7) !== Math.floor(Math.PI * 1e7)', true);
    this.Q = fix('2 ** 62 / 1e18', 1);                 // 4.6 (quintillion = 10^18)
    must('2 ** 62 > 4e18 && 2 ** 62 < 5e18', true);
    this.DIG = PI_DIGITS.slice(0, 37); must(`'${this.DIG}'.length - 2`, 35);
    if (this.DIG !== '3.14159265358979323846264338327950288') throw new Error('b3: chữ số bia sai');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.zu - 0.3, kind: 'pop' }, { t: T.went, kind: 'pen' }, { t: T.sides, kind: 'tick' }, { t: T.pinned, kind: 'snap' },
      { t: T.three16, kind: 'tick' }, { t: T.right, kind: 'pen' },
      { t: T.squeeze, kind: 'pen' }, { t: T.ludolph - 0.3, kind: 'pop' },
      { t: T.doubling, kind: 'tick' }, { t: T.carved, kind: 'pen' },
    ];
  }
  cam(t) {
    const x = Math.min(60, 6 * Math.max(0, t - this.FROM)), yA = Math.min(60, 3 * Math.max(0, t - this.FROM));
    if (t < this.PAN) return { x, y: yA };
    const e = smooth(prog(t, this.PAN, this.PAN + 1.0)), yP = Math.min(60, 3 * (this.PAN - this.FROM));
    return { x, y: yP + (ZB + Math.min(60, 3 * Math.max(0, t - this.PAN - 1.0)) - yP) * e };
  }
  render(g, t) {
    const c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZB - 200) this.china(g, t);
    if (c.y > 200) this.europe(g, t, ZB);
    g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'I', 'WOULDN’T DIE', 'china · europe');
  }
  china(g, t) {
    const T = this.T;
    typed(g, 'The same idea, found again — in China.', 170, 190, prog(t, T.same - 0.1, T.again + 0.4), `italic 600 54px ${CG}`, C.ink);
    note(g, 'independently', 170, 240, prog(t, T.indep, T.indep + 0.6), { color: C.ink, size: 24 });
    portrait(g, 'zu', 170, 300, 360, prog(t, T.zu - 0.3, T.zu + 0.3));
    typed(g, 'Zu Chongzhi', 170, 716, prog(t, T.zu, T.went), `italic 600 44px ${CG}`, C.ink);
    note(g, '429–500 · 5th century', 170, 750, prog(t, T.fifth + 0.4, T.went + 0.3), { size: 20 });
    note(g, 'modern statue · no likeness survives', 170, 778, prog(t, T.went, T.polygon + 0.6), { size: 18 });
    // vòng compa: các đa giác nhân đôi bằng chì (để lại), rồi 12 288 cạnh bằng mực
    const cx = 760, cy = 470, R = 170, a0 = PI / 2;
    pivot(g, cx, cy, prog(t, T.zu, T.went));
    compassCircle(g, cx, cy, R, { k: prog(t, T.zu + 0.1, T.went + 0.3), a0: PI / 2 + 0.3 });
    const ks = prog(t, T.went, T.polygon);
    [6, 12, 24, 48, 96].forEach((n, i) => { const k = clamp(ks * 5 - i); if (k > 0) { line(g, poly(cx, cy, R, n, a0), C.lead, 1.1, { k }); line(g, poly(cx, cy, R / Math.cos(PI / n), n, a0), C.lead, 1.1, { k }); } });
    line(g, poly(cx, cy, R, this.N12, a0), C.ink, 1.6, { k: prog(t, T.polygon, T.sides) });
    typed(g, '6 → 12 → 24 → 48 → 96 → … → 12 288', cx, 700, prog(t, T.went, T.sides + 0.2), `500 22px ${MONO}`, C.ink, { align: 'center', ls: 1 });
    // DETAIL B: khe khép từ 96 tới 12 288 cạnh
    const lx = 1220, ly = 470, lr = 160, kd = prog(t, T.polygon - 0.3, T.polygon + 0.3);
    if (kd > 0) {
      g.save(); g.strokeStyle = C.leadT; g.lineWidth = 1.3; g.setLineDash([10, 5, 2, 5]); g.beginPath(); g.arc(cx + R, cy, 34, 0, 2 * PI * kd); g.stroke(); g.restore();
      line(g, [[cx + R + 34, cy], [lx - lr, ly]], C.leadT, 1.2, { dash: [10, 5, 2, 5], k: kd });
      const n = 96 * Math.pow(this.N12 / 96, smooth(prog(t, T.polygon, T.sides)));
      detailLens(g, lx, ly, lr, n, prog(t, T.polygon, T.polygon + 0.6), { lift: 34 * (1 - smooth(prog(t, T.polygon, T.sides))) });
      note(g, 'detail b · 12 288 sides', lx, ly + lr + 44, prog(t, T.sides, T.sides + 0.6), { color: C.ink, align: 'center' });
      note(g, 'gap too thin to draw', lx, ly + lr + 72, prog(t, T.sides + 0.4, T.pinned + 0.3), { size: 18, align: 'center' });
    }
    // 3.1415926 < π < 3.1415927
    const by = 830, big = `600 62px ${CG}`, kb = prog(t, T.pinned, T.places15 + 0.2);
    let x = 700;
    typed(g, this.LO, x, by, kb * 2, big, C.ink); x += tw(g, this.LO, big) + 30;
    typed(g, '<', x, by, kb * 4 - 1.2, big, C.ink); x += tw(g, '<', big) + 30;
    typed(g, 'π', x, by + 4, prog(t, T.pinned + 0.25, T.pinned + 0.4), `italic 700 96px ${CG}`, C.blue); x += tw(g, 'π', `italic 700 96px ${CG}`) + 30;
    typed(g, '<', x, by, kb * 4 - 1.6, big, C.ink); x += tw(g, '<', big) + 30;
    typed(g, this.HI, x, by, kb * 2 - 0.6, big, C.ink);
    note(g, 'pinned to 7 decimal places', 700, 880, prog(t, T.seven, T.places15 + 0.5), { color: C.blue });
    // 355/113 ≈ 3.1415929 — 6 chữ số thập phân đúng, gạch dưới xanh
    const fy = 975, kf = prog(t, T.three16, T.thirteen + 0.3);
    if (kf > 0) { g.save(); g.beginPath(); g.rect(690, fy - 100, 110 * clamp(kf * 1.5), 150); g.clip(); frac(g, '355', '113', 740, fy - 18, 54, C.ink); g.restore(); }
    typed(g, `≈ ${this.ZU}`, 810, fy, prog(t, T.thirteen, T.thirteen + 0.6), big, C.ink);
    const x0 = 810 + tw(g, '≈ ', big), wm = tw(g, this.ZU.slice(0, 8), big);
    line(g, [[x0, fy + 12], [x0 + wm, fy + 12]], C.blue, 3, { k: prog(t, T.right, T.places16) });
    note(g, 'right to 6 decimal places', x0 + tw(g, this.ZU, big) + 34, fy - 8, prog(t, T.right + 0.2, T.places16 + 0.4), { color: C.blue });
  }
  europe(g, t, Y) {
    const T = this.T;
    typed(g, 'In Europe, the squeeze held on.', 170, Y + 190, prog(t, T.europe, T.choice), `italic 600 54px ${CG}`, C.ink);
    // trục thời gian: Archimedes → 1610
    const ki = prog(t, T.squeeze - 0.4, T.squeeze + 0.3), ix = 260, iy = Y + 360;
    if (ki > 0) {
      line(g, poly(ix, iy, 46 / Math.cos(PI / 6), 6, PI / 2), C.ink, 1.6, { k: ki });
      line(g, poly(ix, iy, 46, 6, PI / 2), C.ink, 1.6, { k: ki });
      compassCircle(g, ix, iy, 46, { k: ki, w: 3 });
    }
    const bx0 = 220, bx1 = 1150, byy = Y + 470, kb = prog(t, T.squeeze, T.years + 0.2);
    line(g, [[bx0, byy - 12], [bx0, byy + 12]], C.ink, 2, { k: kb * 8 });
    line(g, [[bx0, byy], [bx1, byy]], C.ink, 2, { k: kb });
    for (let i = 1; i < 19; i++) { const x = bx0 + (bx1 - bx0) * i / 19; if ((x - bx0) / (bx1 - bx0) < kb) line(g, [[x, byy], [x, byy + 8]], C.lead, 1.2); }
    if (kb >= 1) line(g, [[bx1, byy - 12], [bx1, byy + 12]], C.ink, 2);
    note(g, 'archimedes · 3rd c. bc', bx0, byy + 44, prog(t, T.squeeze, T.choice), { size: 20 });
    note(g, '≈ 1 900 years', (bx0 + bx1) / 2, byy - 22, prog(t, T.nineteen, T.years + 0.4), { color: C.ink, size: 24, align: 'center' });
    typed(g, '1610', bx1, byy + 62, prog(t, T.sixteen, T.sixteen + 0.5), `600 54px ${CG}`, C.ink, { align: 'center' });
    // van Ceulen
    portrait(g, 'vanceulen', 1450, Y + 270, 360, prog(t, T.ludolph - 0.3, T.ludolph + 0.3));
    typed(g, 'Ludolph van Ceulen', 1450, Y + 686, prog(t, T.ludolph, T.ceulen + 0.4), `italic 600 44px ${CG}`, C.ink);
    note(g, '1540–1610', 1450, Y + 720, prog(t, T.ceulen, T.ceulen + 0.4), { size: 20 });
    // 2⁶² cạnh ≈ 4.6 quintillion → 35 chữ số
    note(g, 'still doubling polygons', 220, Y + 600, prog(t, T.doubling - 0.1, T.doubling + 0.7));
    const r2 = `600 96px ${CG}`, s2 = '2⁶² sides';
    typed(g, s2, 220, Y + 700, prog(t, T.doubling, T.doubling + 0.6), r2, C.ink);
    const xq = 220 + tw(g, s2, r2) + 30;
    typed(g, `≈ ${this.Q} quintillion`, xq, Y + 700, prog(t, T.four - 0.1, T.quintillion + 0.5), `600 54px ${CG}`, C.ink);
    const xd = xq + tw(g, `≈ ${this.Q} quintillion`, `600 54px ${CG}`) + 30;
    note(g, '→ 35 digits', xd, Y + 696, prog(t, T.thirtyfive, T.digits + 0.4), { color: C.blue, size: 24 });
    // bia = khung tên bản vẽ khắc 35 chữ số
    const sx = 220, sy = Y + 760, sw = 1020, sh = 150, ks = prog(t, T.carved - 0.2, T.carved + 0.5);
    if (ks > 0) {
      g.save(); g.fillStyle = 'rgba(31,42,54,0.10)'; g.fillRect(sx + 10, sy + 10, sw * ks, sh); g.restore();
      line(g, [[sx, sy], [sx + sw, sy], [sx + sw, sy + sh], [sx, sy + sh], [sx, sy]], C.ink, 2.4, { k: ks });
      line(g, [[sx + 8, sy + 8], [sx + sw - 8, sy + 8], [sx + sw - 8, sy + sh - 8], [sx + 8, sy + sh - 8], [sx + 8, sy + 8]], C.ink, 1, { k: ks });
      line(g, [[sx + 130, sy + 8], [sx + 130, sy + sh - 8]], C.ink, 1, { k: ks * 2 - 1 });
      line(g, [[sx + 130, sy + 58], [sx + sw - 8, sy + 58]], C.ink, 1, { k: ks * 2 - 1 });
    }
    typed(g, 'π', sx + 65, sy + 108, prog(t, T.carved + 0.3, T.carved + 0.5), `italic 700 96px ${CG}`, C.blue, { align: 'center' });
    typed(g, 'LUDOLPH VAN CEULEN · 1540–1610', sx + 150, sy + 42, prog(t, T.carved + 0.3, T.tombstone + 0.3), `600 18px ${ARC}`, C.ink, { ls: 3 });
    typed(g, '35 DECIMALS', sx + sw - 24, sy + 42, prog(t, T.tombstone, T.tombstone + 0.4), `600 18px ${ARC}`, C.leadT, { ls: 3, align: 'right' });
    typed(g, this.DIG, sx + 150, sy + 116, prog(t, T.carved + 0.4, T.german), `500 34px ${MONO}`, C.ink, { ls: 1 });
    // "the Ludolphine number"
    note(g, 'german speakers:', 220, Y + 1000, prog(t, T.german, T.german + 0.6), { size: 20 });
    typed(g, '“the Ludolphine number”', 480, Y + 1004, prog(t, T.ludolphine - 0.2, T.ludolphine + 0.7), `italic 600 54px ${CG}`, C.blue);
  }
}
