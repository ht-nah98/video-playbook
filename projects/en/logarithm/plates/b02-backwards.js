// b02 · Backwards — câu p2 4–8. Mở bằng đúng hình cuối b01 (tháp ×2, thẻ 8, khối "1"); tháp được GỠ khi câu hỏi đảo chiều, dựng lại để ĐẾM.
//  câu 4  "A logarithm asks the same question backwards": khối tím "log" rơi bên phải; mũi tên tím vòng ngược quanh tháp
//  câu 5  "already know where you want to end up, at eight": tháp gỡ từ đỉnh bay lên, thẻ 8 ở lại (nhún ở "eight");
//         "how many times … multiply by two": ô chờ nét đứt + sticker "?" ; mỗi "multiply / two / get" một khối ×2 rơi vào ô
//  câu 6  "Three times": sticker đếm 1 2 3 trên tháp (cùng nhịp "three times"); "the log, base two, of eight, equals three" gõ dần trên thẻ
//  câu 7  "base is the brick": thẻ BASE = THE BRICK (đỏ) + khoanh navy "₂"; "number inside is where you want to go": thẻ + khoanh "8"
//  MASCOT góc thẳng (../actor.js bản 4, LESSONS §175 §219): vào khi câu hỏi đảo chiều; "end up at eight" → nhảy với thẻ 8 không tới; "how many" →
//         nhún vai; "three times" → LEO tháp từng khối (sticker 1 2 3 hiện theo chỗ nó leo qua), lên đỉnh giơ thẻ 8 ("tới nơi");
//         "equals" thẻ bay đi; "the brick" → dậm khối dưới chân; nhảy xuống, đi ra phải.
//  câu 8  "the logarithm itself is how many bricks it takes": thẻ LOG = HOW MANY BRICKS, khoanh "3", ngoặc tím + sticker 3 bên tháp. Mascot pointer.
import { C, BASE_Y, ground, block, tower, sticker, tag, secTag, prog, lookup, must, clamp, brace, actorOn } from '../kit.js';
import { nudge, scaled, slots, eqCard, ring, backArrow, mascot } from './g1-util.js';
import { draw, F, HANDS, MH, fast } from '../actor.js';

export default class Backwards {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b02');
    this.START = L(4).start;
    this.FROM = Math.max(this.START - 1.2, L(3).end + 0.5);
    this.T = {
      log4: w(4, 'logarithm'), same4: w(4, 'same'), back4: w(4, 'backwards'),
      already5: w(5, 'already'), end5: w(5, 'end'), eight5: w(5, 'eight'), how5: w(5, 'how'), mult5: w(5, 'multiply'), two5: w(5, 'two'), get5: w(5, 'get'),
      three6: w(6, 'three'), times6: w(6, 'times'), log6: w(6, 'log'), two6: w(6, 'two'), eight6: w(6, 'eight'), equals6: w(6, 'equals'), three6b: w(6, 'three', 2),
      base7: w(7, 'base'), brick7: w(7, 'brick'), number7: w(7, 'number'),
      log8: w(8, 'logarithm'), how8: w(8, 'how'), bricks8: w(8, 'bricks'), end8: L(8).end,
    };
    // ── mascot (góc thẳng, bản 4): trèo cạnh tháp 3 khối tới thẻ 8 (đáp án = số khối phải trèo) ──
    const T = this.T, X = 960, XL = 815, XC = 842, XR = 1110, U = 120 / MH, TOP = 3 * U;
    const CL = [T.three6 - 0.05, T.log6 - 0.1], R = (CL[1] - CL[0]) / 3, J0 = T.number7 + 0.1, OUT = [J0 + 0.8, J0 + 2.2];
    this.CL = CL; this.R = R;
    this.cardY = t => BASE_Y - 3 * 120 - 17 - 100 - 160 * fast(prog(t, CL[1], CL[1] + 0.4));    // thẻ 8 được giơ lên khi lên đỉnh
    const climb = (y, alt) => F({ x: XC, y, l0: alt ? 0.8 : 0, l1: alt ? 0 : 0.8, ax: -0.14, ay: alt ? 1.0 : 0.82, bx: 0.2, by: alt ? 0.8 : 1.0, lookY: -0.8, look: 0.4, yaw: 0.35, mood: 'angry', mouth: 'flat' });   // quay 3/4 vào tháp
    const top = (o = {}) => F({ x: X, y: TOP, ...o });
    const K = [
      [T.already5 - 0.15, F({ x: XL })],
      [T.already5 + 0.3, F({ x: XL, lookY: -1, mood: 'shock', mouth: 'o' })],                         // tháp bay đi: ngước nhìn theo
      [T.end5, F({ x: XL, lookY: -1 })],
      [T.end5 + 0.3, F({ x: XL, c: 0.7, ...HANDS.low, lookY: -1, mood: 'angry' }), fast],             // khuỵu lấy đà
      [T.end5 + 0.55, F({ x: XL, y: 0.35, l0: 0.5, l1: 0.5, ...HANDS.up, lookY: -1, mood: 'angry', mouth: 'o' }), fast],   // bật với thẻ 8 — không tới
      [T.end5 + 0.85, F({ x: XL, c: 0.5, lookY: -0.5, mood: 'sad', mouth: 'wavy' })],                 // rơi xuống, khuỵu
      [T.end5 + 1.15, F({ x: XL, mood: 'sad', mouth: 'wavy' })],
      [T.how5 + 0.2, F({ x: XL, ...HANDS.shrug, mood: 'confused', mouth: 'wavy' }), fast],            // "how many times?"
      [T.mult5 - 0.2, F({ x: XL, look: 1, lookY: 0.3, yaw: 0.55 })],                                              // nhìn khối rơi vào ô
      [T.get5 + 0.3, F({ x: XL, look: 1, yaw: 0.5 })],
      [CL[0], climb(0, false)],
    ];
    for (let i = 1; i <= 3; i++) K.push([CL[0] + (i - 0.5) * R, climb((i - 0.6) * U, i % 2 === 1)], [CL[0] + i * R, climb(i * U - 0.08, i % 2 === 0)]);
    K.push(
      [CL[1] + 0.12, F({ x: X - 70, y: TOP + 0.06, l1: 0.9, ax: -0.1, ay: 0.7, bx: 0.3, by: 0.35, lookY: 0.3, mood: 'angry' }), fast],   // trườn qua mép tháp
      [CL[1] + 0.3, top({ ...HANDS.up, lookY: -0.6, mood: 'happy', mouth: 'grin' }), fast],           // đứng lên đỉnh, giơ thẻ 8
      [T.equals6, top({ ...HANDS.up, lookY: -0.6, mood: 'happy', mouth: 'grin' })],
      [T.equals6 + 0.3, top({ lookY: -1, mood: 'shock', mouth: 'o' }), fast],                         // thẻ bay đi, ngước nhìn
      [T.equals6 + 1.2, top({ mood: 'smug', mouth: 'smirk' })],
      [T.brick7 - 0.25, top({ l1: 0.9, lookY: 0.8, mood: 'smug', mouth: 'smirk' })],                  // nhấc chân …
      [T.brick7 + 0.02, top({ c: 0.3, lookY: 0.8, mood: 'smug', mouth: 'smirk' }), fast],             // … dậm xuống khối gạch
      [T.brick7 + 0.4, top({ mood: 'smug', mouth: 'smirk' })],
      [J0, top({ c: 0.6, ...HANDS.low, mood: 'happy' })],
      [J0 + 0.25, F({ x: 1040, y: TOP + 0.3, l0: 0.5, l1: 0.5, ...HANDS.up, yaw: 0.5, mood: 'happy', mouth: 'grin' })],
      [J0 + 0.5, F({ x: XR, c: 0.6, ...HANDS.shrug, mood: 'happy', mouth: 'grin' }), fast],           // đáp đất, khuỵu
      [J0 + 0.75, F({ x: XR, mood: 'happy' })],
      [OUT[1], F({ x: 2050 })],
    );
    for (let i = 1; i < K.length; i++) if (K[i][0] <= K[i - 1][0]) throw new Error(`b02: khoá mascot ${i} lùi giờ`);
    this.ACT = ({
      keys: K,
      walks: [[-120, XL, T.back4 - 0.85, T.already5 - 0.15], [XR, 2050, ...OUT]],
      grip: (t, P) => {                                                                                // giơ thẻ: hai tay đỡ đáy thẻ
        const kh = clamp(prog(t, CL[1] + 0.1, CL[1] + 0.3) - prog(t, T.equals6 + 0.02, T.equals6 + 0.15));
        if (kh > 0) { const y = this.cardY(t) + 36; return [[X - 40, y], [X + 40, y], kh]; }
        const kc = clamp(prog(t, CL[0] - 0.1, CL[0]) - prog(t, CL[1], CL[1] + 0.15));                 // trèo: tay phải bám mép trái tháp
        if (kc > 0) return [null, [X - 62, BASE_Y - P.y * MH - P.by * MH], kc];
        return null;
      },
    });
    this.WIN = [T.back4 - 0.85, OUT[1]]; actorOn(...this.WIN);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.log4, 'wood'), c(T.back4, 'pen'), c(T.already5 + 0.1, 'snap'), c(T.how5 + 0.1, 'pop'), c(T.mult5, 'wood'), c(T.two5, 'wood'), c(T.get5, 'wood'),
      ...[1, 2, 3].map(i => c(this.CL[0] + i * this.R - 0.1, 'tick')), c(T.log6, 'card'), c(T.three6b, 'shimmer'), c(T.base7, 'card'), c(T.number7, 'card'),
      c(T.log8, 'card'), c(T.how8, 'pop')];
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y, X = 960;
    ground(g, 'table');
    secTag(g, 'Backwards', { k: prog(t, this.FROM + 0.3, this.FROM + 0.7), t });
    block(g, 700, base, 100, { color: C.birch, label: '1' });
    // khối tím "log" (nhân vật mới của câu 4) rơi ở "logarithm", bay lên khi công thức xuất hiện
    block(g, 1450, base, 120, { color: C.log, label: 'log', k: prog(t, T.log4 - 0.3, T.log4 + 0.1), lift: prog(t, T.log6 - 0.2, T.log6 + 0.5) });
    // tháp: hình cuối b01 → gỡ ở "already" → dựng lại ở "multiply / two / get" → đếm ở "three times"
    const D = [T.mult5, T.two5, T.get5], kk = D.map(a => prog(t, a - 0.3, a + 0.1));
    const rebuilt = t >= D[0] - 0.35, n = kk[0] + kk[1] + kk[2];
    const count = 3 * prog(t, this.CL[0], this.CL[1]);          // sticker đếm theo chỗ người que leo qua
    if (!rebuilt) tower(g, X, base, 3, { s: 120, label: '×2', lift: 3 * prog(t, T.already5, T.already5 + 1.0) });
    else tower(g, X, base, 3, { s: 120, label: '×2', k: n, count });
    const kslot = prog(t, T.how5, T.how5 + 0.3);
    slots(g, X, base, 3, { s: 120, k: [kslot, kslot, kslot], placed: kk[0] >= 1 ? (kk[1] >= 1 ? (kk[2] >= 1 ? 3 : 2) : 1) : 0 });
    sticker(g, '?', X + 130, base - 190, { r: 44, k: prog(t, T.how5, T.how5 + 0.3) - prog(t, T.three6 - 0.1, T.three6 + 0.2) });
    // mũi tên tím hỏi ngược quanh tháp (cùng a0 S5)
    backArrow(g, X - 150, base - 200, 150, prog(t, T.same4, T.back4 + 0.3) - prog(t, T.already5, T.already5 + 0.4));
    // thẻ 8: cùng thẻ với b01, ở lại tới khi công thức nói xong; người que lên đỉnh thì giơ nó lên (cardY)
    const top = base - 3 * 120 - 17, ke = prog(t, T.eight6, T.eight6 + 0.3), cy8 = this.cardY(t);
    scaled(g, X, cy8, nudge(t, T.eight5), () => eqCard(g, t, X, cy8, [{ s: '8', at: -9, color: C.ink }], { size: 64, string: [X - 36, -20], lift: prog(t, T.equals6, T.equals6 + 0.5) }));
    if (t > this.WIN[0] && t < this.WIN[1]) draw(g, this.ACT, t);   // SAU thẻ 8: tay đỡ thẻ nằm trước thẻ, thẻ không che người
    // công thức log₂ 8 = 3 gõ dần
    const eq = eqCard(g, t, 1440, 520, [{ s: 'log', at: T.log6, color: C.logInk }, { s: '₂', at: T.two6, color: C.baseInk }, { s: ' 8', at: T.eight6, color: C.ink }, { s: ' = ', at: T.equals6, color: C.ink }, { s: '3', at: T.three6b, color: C.logInk }],
      { size: 64, edge: C.log, k: prog(t, T.log6 - 0.1, T.log6 + 0.25), string: [1300, -20] });
    // câu 7: hai nhân vật của logarit
    const lift7 = prog(t, T.log8 - 0.1, T.log8 + 0.4);
    eqCard(g, t, 570, 330, [{ s: 'BASE = THE BRICK', at: T.base7, color: C.baseInk }], { size: 40, edge: C.base, k: prog(t, T.base7 - 0.05, T.base7 + 0.3), lift: lift7, string: [X - 60, top + 10] });
    eqCard(g, t, 1450, 340, [{ s: 'NUMBER = WHERE TO GO', at: T.number7, color: C.ink }], { size: 40, edge: C.ink, k: prog(t, T.number7 - 0.05, T.number7 + 0.3), lift: lift7 });
    if (eq) {
      const [, p2, p8, , p3] = eq.parts;
      ring(g, p2.x + 2, eq.cy + 8, p2.w - 4, 36, prog(t, T.base7, T.base7 + 0.4) - prog(t, T.number7 - 0.1, T.number7 + 0.2), { pad: 7 });
      ring(g, p8.x + 18, eq.cy - 34, p8.w - 22, 64, prog(t, T.number7, T.number7 + 0.4) - prog(t, T.log8 - 0.1, T.log8 + 0.2), { pad: 7 });
      ring(g, p3.x, eq.cy - 34, p3.w, 64, prog(t, T.log8 + 0.1, T.log8 + 0.5));
    }
    // câu 8: log = số viên gạch
    eqCard(g, t, 1450, 340, [{ s: 'LOG', at: T.log8, color: C.logInk }, { s: ' = HOW MANY BRICKS', at: T.how8, color: C.ink }], { size: 40, edge: C.log, k: prog(t, T.log8 - 0.05, T.log8 + 0.3), string: [1560, -20] });
    const kb = prog(t, T.how8, T.bricks8 + 0.3);
    brace(g, 852, top, base, kb);
    sticker(g, '3', 772, (top + base) / 2, { r: 44, k: prog(t, T.bricks8, T.bricks8 + 0.3) });
    if (t >= T.three6b + 0.6) must('Math.log2(8)', 3);
    mascot(g, t, 'pointer', T.how5 - 0.2, T.base7 + 0.5);
  }
}
