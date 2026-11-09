// b1 · A length can't be negative (p2 câu 0–4) — MỞ HỒI I. Trang mở iris từ đen (sau intro), thẻ hồi giữa khung.
// Hai vùng trên một tấm thảm, camera đi xuống một lần:
//   0 một viên đỏ "feels natural · taught as a child"; người Hy Lạp: số = độ dài / diện tích / lượng (vàng) trên thước
//     in thảm; "a length cannot be less than nothing" → thanh độ dài co về 0, phía trái số 0 trống "LENGTH ≥ 0"
//   1 Diophantus: trang bìa Arithmetica (1621), 4x + 20 = 4, dấu "ABSURD" (lời phán của ông — ngà, không phải nét sai),
//     giải ra x = −4 bằng code → bốn viên đỏ, "not an answer" → bốn viên bị gạt ra mép thảm.
import { W, H, C, ARC, clamp, smooth, prog, ground, card, actTitle, text, label, quote, eq, tile, line,
  stamp, portrait, iris, lookup, must, num, typeCues } from '../kit.js';

const ZONE = 1080;

export default class Length {
  static ERA = 'mat';
  static IMAGES = { arithmetica: './assets/history/arithmetica-1621-title.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      neg0: w(0, 'negative'), feels: w(0, 'feels'), natural: w(0, 'natural'), taught: w(0, 'taught'), child: w(0, 'child'),
      not0: w(0, 'not'), obvious: w(0, 'obvious'),
      greeks: w(1, 'greeks'), geometry: w(1, 'geometry'), length1: w(1, 'length'), area: w(1, 'area'), quantity: w(1, 'quantity'),
      something: w(1, 'something'),
      length2: w(2, 'length'), cannot: w(2, 'cannot'), less: w(2, 'less'), nothing: w(2, 'nothing'), e2: L(2).end,
      dioph: w(3, 'diophantus'), around: w(3, 'around'), fifty: w(3, 'fifty'), four1: w(3, 'four'), equals: w(3, 'equals'),
      four2: w(3, 'four', 2), absurd: w(3, 'absurd'),
      only: w(4, 'only'), neg4: w(4, 'negative'), him: w(4, 'him'), neg4b: w(4, 'negative', 2), not4: w(4, 'not'), end: L(4).end,
    };
    this.START = L(0).start; this.FROM = this.START - 2.6;
    this.PAN = this.T.e2 + 0.1;
    // Diophantus: 4x + 20 = 4 → 4x = 4 − 20 = −16 → x = −4
    this.V = { a: must('4', 4), b: must('20', 20), c: must('4', 4), r: must('4 - 20', -16), x: must('(4 - 20) / 4', -4), year: must('250', 250) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.neg0, kind: 'chip' }, { t: T.length1, kind: 'tick' }, { t: T.dioph, kind: 'snap' },
      ...typeCues('4x + 20 = 4', T.four1, T.four2 + 0.3), { t: T.absurd, kind: 'tick' }, { t: T.neg4b, kind: 'chip' },
    ];
  }
  cam(t) {                                            // vùng 0 → vùng 1 lúc PAN (0.9 s), trôi 3 px/s trong vùng
    const e = smooth(prog(t, this.PAN, this.PAN + 0.9));
    const y0 = Math.min(40, 3 * Math.max(0, t - this.START)), y1 = ZONE + Math.min(40, 3 * Math.max(0, t - this.PAN - 0.9));
    return { x: 0, y: y0 + (y1 - y0) * e };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01) this.zone1(g, t, ZONE);
    g.restore();
    card(g, prog(t, this.START + 0.35, this.START + 1.7), 'act I', 'A LENGTH CAN’T BE NEGATIVE');
    actTitle(g, t, this.START, 'I', 'A number nobody wanted', 'answers question 1');
    iris(g, W / 2, H / 2, prog(t, this.FROM, this.FROM + 1.0));
  }
  zone0(g, t) {
    const T = this.T, U = 120, x0 = 600, y = 840;                  // thước: số 0 ở x0, 1 đơn vị = 120 px
    // câu 0: một viên đỏ — quen thuộc vì được dạy, không vì hiển nhiên
    const ks = smooth(prog(t, T.cannot, T.nothing + 0.2));          // câu 2: viên đỏ trượt xuống, thử đứng trái số 0
    const tx = 160 + (x0 - U - 30 - 160) * ks, ty = 250 + (y - U - 34 - 250) * ks;
    tile(g, tx, ty, U, 'n', { k: prog(t, T.neg0, T.neg0 + 0.35) });
    quote(g, 'feels completely natural', 330, 300, prog(t, T.feels, T.natural + 0.4), { size: 54 });
    label(g, 'because you were taught it as a child', 330, 352, prog(t, T.taught - 0.3, T.child + 0.4), { color: C.ink, size: 22 });
    label(g, 'not because it is obvious', 330, 392, prog(t, T.not0, T.obvious + 0.3), { size: 22 });
    // câu 1: Hy Lạp — số là một độ dài, một diện tích, một lượng
    label(g, 'ancient greece · numbers through geometry', 160, 500, prog(t, T.greeks - 0.2, T.geometry + 0.4));
    const kr = prog(t, T.geometry - 0.3, T.geometry + 0.7);
    line(g, [[x0, y], [x0 + 9 * U + 30, y]], C.dim, 2.4, { k: kr });
    for (let v = 0; v <= 9; v++) {
      const kv = clamp(kr * 10 - v); if (kv <= 0) break;
      line(g, [[x0 + v * U, y - 14], [x0 + v * U, y + 14]], C.dim, v ? 2 : 3);
      text(g, num(v), x0 + v * U, y + 48, `600 24px ${ARC}`, v > 0 ? C.posT : C.ink, 'center');
      for (let q = 1; q < 4 && v < 9; q++) line(g, [[x0 + v * U + q * U / 4, y - 7], [x0 + v * U + q * U / 4, y + 7]], C.dim, 1.2);
    }
    // độ dài: thanh vàng 0 → 4 (vào ở "length"), co về 0 ở câu 2
    const len = 4 * smooth(prog(t, T.length1, T.length1 + 0.6)) * (1 - smooth(prog(t, T.less, T.nothing + 0.25)));
    if (len > 0.01) { g.save(); g.fillStyle = C.pos; g.strokeStyle = C.posS; g.lineWidth = 2; g.beginPath(); g.roundRect(x0, y - 44, len * U, 26, 5); g.fill(); g.stroke(); g.restore(); }
    label(g, 'a length', x0, y - 66, prog(t, T.length1, T.length1 + 0.4), { color: C.posT });
    // diện tích: ô vuông vàng 2 × 2 đơn vị nhỏ; lượng: ba viên +1
    const ka = prog(t, T.area - 0.1, T.area + 0.4);
    if (ka > 0) { g.save(); g.globalAlpha = clamp(ka * 2); g.fillStyle = 'rgba(244,196,48,0.85)'; g.strokeStyle = C.posS; g.lineWidth = 3;
      const s = 150 * smooth(ka); g.beginPath(); g.rect(1040, 690 - s, s, s); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(120,90,10,0.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(1040 + s / 2, 690 - s); g.lineTo(1040 + s / 2, 690); g.moveTo(1040, 690 - s / 2); g.lineTo(1040 + s, 690 - s / 2); g.stroke(); g.restore(); }
    label(g, 'an area', 1040, 520, prog(t, T.area, T.area + 0.4), { color: C.posT });
    for (let i = 0; i < 3; i++) tile(g, 1290 + i * 96, 600, 82, 'p', { k: prog(t, T.quantity + i * 0.12, T.quantity + 0.35 + i * 0.12) });
    label(g, 'a quantity', 1290, 520, prog(t, T.quantity, T.quantity + 0.4), { color: C.posT });
    // câu 2: trái số 0 không có gì — độ dài ≥ 0
    const kz = prog(t, T.length2 - 0.1, T.cannot + 0.3);
    if (kz > 0) {
      g.save(); g.globalAlpha = clamp(kz * 2); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([8, 8]);
      g.beginPath(); g.moveTo(x0 - 20, y); g.lineTo(160, y); g.stroke(); g.restore();
    }
    label(g, 'length ≥ 0', x0, y + 100, prog(t, T.length2, T.cannot + 0.4), { color: C.ink, size: 24 });
    label(g, 'less than nothing?', 160, y + 100, prog(t, T.less, T.nothing + 0.3), { size: 22 });
  }
  zone1(g, t, Y) {
    const T = this.T, V = this.V;
    // Diophantus: trang bìa Arithmetica (không chân dung)
    portrait(g, 'arithmetica', 1330, Y + 170, 420, prog(t, T.dioph, T.dioph + 0.6),
      { rot: 0.02, label: { name: 'Diophantus of Alexandria', life: `Arithmetica · c. ${V.year}`, note: 'title page, 1621 edition' } });
    label(g, 'alexandria · around the year ' + V.year, 160, Y + 240, prog(t, T.around - 0.2, T.fifty + 0.4));
    // 4x + 20 = 4 viết theo lời đọc
    eq(g, [[String(V.a), C.posT], ['x'], [' + '], [String(V.b), C.posT], [' = '], [String(V.c), C.posT]], 160, Y + 380, 104,
      prog(t, T.four1, T.four2 + 0.3));
    stamp(g, 'ABSURD', 880, Y + 340, prog(t, T.absurd, T.absurd + 0.25), { size: 54, color: C.ink, rot: -0.1 });
    label(g, 'Diophantus’ verdict', 760, Y + 440, prog(t, T.absurd + 0.2, T.absurd + 0.9), { size: 18 });
    // câu 4: lời giải duy nhất là số âm
    eq(g, [[String(V.a), C.posT], ['x = '], [String(V.c), C.posT], [' − '], [String(V.b), C.posT], [' = '], [num(V.r), C.negT]], 160, Y + 540, 64,
      prog(t, T.only - 0.1, T.neg4));
    eq(g, [['x = '], [num(V.x), C.negT]], 160, Y + 650, 84, prog(t, T.neg4, T.neg4 + 0.4));
    // bốn viên đỏ = −4; "not an answer" → bị gạt xuống mép dưới thảm, nửa ra khỏi khung
    const push = smooth(prog(t, T.not4, T.end + 0.4));
    for (let i = 0; i < -V.x; i++)
      tile(g, 520 + i * 104 + push * (560 + 30 * i), Y + 580 + push * (440 + 14 * (i % 2)), 88, 'n',
        { k: prog(t, T.neg4b + i * 0.08, T.neg4b + 0.35 + i * 0.08), rot: push * 0.1 * (i - 1.5) });
    quote(g, 'to him, a negative answer was not an answer', 160, Y + 800, prog(t, T.him - 0.1, T.end), { size: 46 });
  }
}
