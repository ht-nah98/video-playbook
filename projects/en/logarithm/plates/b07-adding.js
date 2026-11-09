// b07 · Adding up bricks (ACT THREE, câu 28–34) — DNA blocks. Thẻ hồi "ACT THREE · Multiplication becomes addition", rồi:
//  28 thẻ "the most famous property" → công thức thẻ tím "log (a × b)" ở "log" + "= log a + log b" ở "sum" (nằm trên cao, sống cả cảnh)
//  29 "bricks" → một viên gạch đỏ ×2 rơi giữa bàn, bay lên cuối câu
//  30 thẻ 8 · × · 4 dưới chân; "three twos" → tháp 3 khối ×2 (sticker 3) ở trái; "two twos" → tháp 2 khối (sticker 2) ở phải
//  31 NGƯỜI QUE (../actor.js) đi vào, ngồi xổm ôm nhóm 3 khối, nhấc lên (cao hơn nó), vác sang và đặt LÊN tháp 2 → một chồng
//     5 tầng; "five twos" → chỉ đỉnh chồng, sticker đếm 1…5, rồi đi ra trái. Nhóm A đi theo tay người que (LESSONS §175).
//  32 thẻ 32 · thẻ tím "log₂ 32 = 5" · ngoặc tím 3 (trên) + 2 (dưới) với dấu +
//  33 ngoặc phải ôm cả chồng (bricks of a product); "added" → công thức nhún
//  34 công thức chia "log (a ÷ b) = log a − log b"; thẻ 32 ÷ 8 = 4; "takes away" → 3 khối trên cùng gỡ bay lên, còn 2 tầng, thẻ 5 − 3 = 2
// Mascot pointer ~8 s bên trái.
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, block, sticker, tag, text, brace, figure, secTag, actTitle, BASE_Y, actorOn } from '../kit.js';
import { draw, F, HANDS, fast } from '../actor.js';

const lerp = (a, b, u) => a + (b - a) * u;
const S = 104, XA = 640, XB = 1060;
const nudge = (t, a) => 1 + 0.12 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const brick = (g, cx, base, k, i, o = {}) => block(g, cx, base, S, { label: '×2', k, v: i % 4, ...o });
const TAG = { size: 44, edge: C.log, color: C.logInk };

export default class Adding {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b07');
    this.START = L(28).start;
    this.FROM = Math.max(this.START - 2.6, L(27).end + 0.5);
    this.T = {
      famous: w(28, 'famous'), log: w(28, 'log'), sum: w(28, 'sum'),
      bricks: w(29, 'bricks'), obvious: w(29, 'obvious'),
      eight: w(30, 'eight'), times: w(30, 'times'), four: w(30, 'four'), three: w(30, 'three'), twos3: w(30, 'twos'), two: w(30, 'two'), twos2: w(30, 'twos', 2),
      multiply: w(31, 'multiply'), putting: w(31, 'putting'), pile: w(31, 'pile'), five: w(31, 'five'),
      ans: w(32, 'thirty-two'), log2: w(32, 'log'), three2: w(32, 'three'), plus: w(32, 'plus'), two2: w(32, 'two', 2),
      bricks3: w(33, 'bricks'), parts: w(33, 'parts'), added: w(33, 'added'),
      division: w(34, 'division'), subtraction: w(34, 'subtraction'), dividing: w(34, 'dividing'), takes: w(34, 'takes'), away: w(34, 'away'),
      end: L(34).end,
    };
    must('8 * 4', 32); must('2 ** 3', 8); must('2 ** 2', 4); must('2 ** 5', 32); must('3 + 2', 5); must('32 / 8', 4); must('5 - 3', 2);
    // ── người que HẤT nhóm A (3 khối) lên tháp B: đi vào → xổm ôm chân tháp (tháp nhấc 18 px — gồng) → nén → bật hất, tháp bay
    // vòng cung đáp lên B (thịch) → chỉ đỉnh chồng ở "five twos" → đi ra. Tay người que ngắn (SOFT_ARM) không đỡ được tháp cao hơn
    // đầu → không vác; hất = lấy đà → làm → đà theo, tay chỉ cần chạm chân tháp (bản vác đầu tiên: tháp lơ lửng xa tay).
    const T = this.T, B = BASE_Y, XS = XA - 140, FEET = { fl: -0.035, fr: 0.035 };
    const IN = [T.multiply - 2.1, T.multiply - 0.4], G = T.multiply + 0.35, REL = T.putting + 0.05, LAND = T.pile - 0.05, OUT = [T.five + 0.9, T.five + 2.5];
    this.M = [REL, LAND];                                                // gộp: rời tay → chạm tháp B (thịch)
    this.pos = t => {                                                    // nhóm A: [tâm x, đáy y]
      if (t < REL) return [XA, B - 18 * fast(prog(t, G, G + 0.25))];
      const m = prog(t, REL, LAND), e = outCubic(m);
      return [lerp(XA, XB, e), lerp(B - 18, B - 2 * S, e) - 200 * Math.sin(Math.PI * m)];
    };
    // mascot góc thẳng (bản 4): khuỵu ôm chân tháp → nén → bật hai tay lên hất, tháp bay vòng cung → nhìn theo → chỉ đỉnh chồng → đi ra
    this.ACT = ({
      keys: [
        [IN[1], F({ x: XS })],
        [IN[1] + 0.3, F({ x: XS, lookY: -1, look: 0.8 })],                                                  // ngước nhìn tháp cao hơn mình
        [G - 0.05, F({ x: XS, c: 0.6, ...HANDS.chest, look: 0.8, yaw: 0.3, mood: 'angry' }), fast],                    // khuỵu, ôm chân tháp
        [REL - 0.12, F({ x: XS, c: 0.9, ...HANDS.low, look: 0.8, mood: 'angry', mouth: 'wavy' })],           // nén sâu (lấy đà)
        [REL + 0.08, F({ x: XS + 10, y: 0.12, l0: 0.3, lean: 0.06, ax: -0.1, ay: 1.05, bx: 0.32, by: 1.1, lookY: -1, mood: 'happy', mouth: 'grin' }), fast],   // bật hất
        [REL + 0.5, F({ x: XS + 10, ...HANDS.shrug, look: 1, lookY: -0.6, yaw: 0.6, mood: 'happy', mouth: 'o' })],    // đà theo: mắt theo tháp
        [LAND + 0.05, F({ x: XS + 10, look: 1, yaw: 0.6 })],
        [LAND + 0.12, F({ x: XS + 10, c: 0.25, look: 1, yaw: 0.6, mood: 'shock', mouth: 'o' }), fast],                // giật nhẹ khi tháp đáp
        [T.five + 0.15, F({ x: XS + 10, bx: 0.45, by: 0.95, look: 1, lookY: -0.8, yaw: 0.45, mood: 'smug', mouth: 'smirk' }), fast],   // "five twos" → chỉ đỉnh chồng
        [OUT[0], F({ x: XS + 10, bx: 0.45, by: 0.95, look: 1, lookY: -0.8, yaw: 0.45, mood: 'smug', mouth: 'smirk' })],
        [OUT[0] + 0.15, F({ x: XS + 10, look: -0.8, yaw: -0.6 })],
        [OUT[1], F({ x: -120, look: -0.8, yaw: -0.6 })],
      ],
      walks: [[-120, XS, ...IN], [XS + 10, -120, OUT[0] + 0.15, OUT[1]]],
      grip: t => {                                                       // hai tay ôm mặt trái chân tháp tới lúc hất
        const k = clamp(prog(t, G - 0.2, G + 0.1) - prog(t, REL - 0.1, REL - 0.04));
        if (k <= 0) return null;
        const [ax, ab] = this.pos(t);
        return [[ax - S / 2 - 6, ab - 40], [ax - S / 2 + 4, ab - 95], k];
      },
    });
    this.WIN = [IN[0], OUT[1]]; actorOn(...this.WIN);
    this.PTR = [this.T.bricks - 0.2, this.T.bricks - 0.2 + 7.8];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(this.START - 1.3, 'card'), c(T.famous, 'card'), c(T.log, 'card'), c(T.sum, 'card'),
      c(T.bricks + 0.3, 'wood'), c(T.eight, 'card'), c(T.three + 0.1, 'wood'), c(T.three + 0.4, 'wood'), c(T.three + 0.7, 'wood'),
      c(T.two + 0.1, 'wood'), c(T.two + 0.4, 'wood'), c(this.M[1] + 0.1, 'wood'), c(T.five, 'pop'),
      c(T.ans, 'card'), c(T.log2 + 0.2, 'card'), c(T.three2, 'pop'), c(T.bricks3, 'pop'),
      c(T.division, 'card'), c(T.subtraction + 0.1, 'card'), c(T.dividing + 0.1, 'card'), c(T.takes + 0.1, 'chip'), c(T.away + 0.4, 'card'),
    ];
  }

  render(g, t) {
    const T = this.T, B = BASE_Y;
    ground(g, 'table');
    actTitle(g, t, this.START, 'ACT THREE', 'Multiplication becomes addition');
    secTag(g, 'Adding up bricks', { k: prog(t, this.START, this.START + 0.4), t });

    // ── công thức (trên cao) ──
    const f1 = 'log (a × b)', f2 = '= log a + log b', d1 = 'log (a ÷ b)', d2 = '= log a − log b', gap = 24;
    const wt = (s) => tag(g, s, 0, 0, { ...TAG, k: 0 }).w;                // bề rộng thẻ
    const row = (s1, s2, y, k1, k2, nd) => {
      const w1 = wt(s1), w2 = wt(s2), x0 = 880, c1 = x0 + w1 / 2, c2 = x0 + w1 + gap + w2 / 2;
      tag(g, s1, c1, y, { ...TAG, k: k1 });
      scaled(g, c2, y, nd, () => tag(g, s2, c2, y, { ...TAG, k: k2 }));
    };
    const kFam = prog(t, this.START + 0.1, this.START + 0.4), upFam = outCubic(prog(t, T.log - 0.25, T.log + 0.2));
    if (kFam > 0 && upFam < 1) { g.save(); g.translate(0, -upFam * 320); tag(g, 'THE MOST FAMOUS PROPERTY', 1340, 150, { size: 48, k: kFam }); g.restore(); }
    row(f1, f2, 150, prog(t, T.log, T.log + 0.3), prog(t, T.sum, T.sum + 0.3), nudge(t, T.added));
    row(d1, d2, 240, prog(t, T.division, T.division + 0.3), prog(t, T.subtraction, T.subtraction + 0.3), 1);

    // ── câu 29: viên gạch lẻ ──
    block(g, 850, B, S, { label: '×2', k: prog(t, T.bricks, T.bricks + 0.4), lift: prog(t, T.obvious + 0.1, T.obvious + 0.55), v: 0 });

    // ── câu 30: thẻ 8 × 4 ──
    const away = outCubic(prog(t, this.M[0] - 0.4, this.M[0] + 0.4)) * 1200, away4 = outCubic(prog(t, T.ans - 0.2, T.ans + 0.2)) * 1200;
    g.save(); g.translate(0, -away);
    tag(g, '8', XA, B + 72, { size: 44, k: prog(t, T.eight, T.eight + 0.3) });
    text(g, '×', 850, B + 100, { font: `900 80px ${AR}`, align: 'center', k: prog(t, T.times, T.times + 0.2) });
    g.restore();
    g.save(); g.translate(0, -Math.max(away, away4)); tag(g, '4', XB, B + 72, { size: 44, k: prog(t, T.four, T.four + 0.3) }); g.restore();
    tag(g, '32', XB, B + 72, { size: 44, k: prog(t, T.ans, T.ans + 0.3) });

    // ── tháp B (2 khối, nền) ──
    const kB = 2 * prog(t, T.two, T.two + 0.6);
    for (let i = 0; i < 2; i++) brick(g, XB, B - i * S, clamp(kB - i), i, { shadow: i === 0 });
    // ── nhóm A (3 khối): rơi ở "three twos", rồi nhấc lên đặt lên B ──
    const kA = 3 * prog(t, T.three, T.three + 0.9), m = prog(t, ...this.M);
    const on = t > this.WIN[0] && t < this.WIN[1], [ax, ab] = this.pos(t);
    for (let i = 0; i < 3; i++) {
      const lf = clamp(prog(t, T.takes, T.takes + 0.9) * 3 - (2 - i));
      brick(g, ax, ab - i * S, m > 0 ? 1 : clamp(kA - i), i + 2, { shadow: m <= 0 && i === 0, lift: lf });
    }
    if (on) draw(g, this.ACT, t);
    // sticker 3 / 2 khi còn rời; sticker đếm 1…5 sau khi gộp
    const sepOut = prog(t, this.M[0] - 0.3, this.M[0]);
    sticker(g, '3', XA + 100, B - 2.5 * S, { r: 34, k: clamp(prog(t, T.twos3, T.twos3 + 0.3) - sepOut) });
    sticker(g, '2', XB + 100, B - 1.5 * S, { r: 34, k: clamp(prog(t, T.twos2, T.twos2 + 0.3) - prog(t, T.five - 0.3, T.five)) });
    for (let i = 0; i < 5; i++) {
      const gone = i >= 2 ? prog(t, T.takes + (4 - i) * 0.3, T.takes + (4 - i) * 0.3 + 0.2) : 0;
      sticker(g, String(i + 1), XB + 100, B - (i + 0.5) * S, { r: 28, k: clamp(prog(t, T.five + i * 0.1, T.five + i * 0.1 + 0.25) - gone) });
    }

    // ── câu 32: log₂ 32 = 5 · ngoặc 3 + 2 ──
    tag(g, 'log₂ 32 = 5', 1500, 470, { size: 48, edge: C.log, color: C.logInk, k: prog(t, T.log2, T.log2 + 0.3) });
    const gone2 = 1 - prog(t, T.division, T.division + 0.4);
    const kb3 = prog(t, T.three2, T.three2 + 0.5) * gone2, kb2 = prog(t, T.two2, T.two2 + 0.5) * gone2, bx = XB - S / 2 - 44;
    brace(g, bx, B - 5 * S + 8, B - 2 * S - 8, kb3);
    brace(g, bx, B - 2 * S + 8, B - 8, kb2);
    sticker(g, '3', bx - 56, B - 3.5 * S, { r: 30, k: kb3 });
    sticker(g, '2', bx - 56, B - S, { r: 30, k: kb2 });
    text(g, '+', bx - 56, B - 2 * S + 14, { font: `900 72px ${AR}`, color: C.logInk, align: 'center', k: clamp(prog(t, T.plus, T.plus + 0.2) * gone2) });

    // ── câu 33: ngoặc phải ôm cả chồng ──
    const kr = clamp(prog(t, T.bricks3, T.bricks3 + 0.5) - prog(t, T.away, T.away + 0.5));
    if (kr > 0) { g.save(); g.translate(2 * (XB + S / 2 + 90), 0); g.scale(-1, 1); brace(g, XB + S / 2 + 90, B - 5 * S + 8, B - 8, kr); g.restore(); }

    // ── câu 34: chia = gỡ khối ──
    tag(g, '32 ÷ 8 = 4', 1500, 620, { size: 48, k: prog(t, T.dividing, T.dividing + 0.3) });
    tag(g, '5 − 3 = 2', 1500, 730, { size: 48, edge: C.log, color: C.logInk, k: prog(t, T.away, T.away + 0.3) });

    const kf = clamp(prog(t, this.PTR[0], this.PTR[0] + 0.45) - prog(t, this.PTR[1] - 0.4, this.PTR[1]));
    figure(g, 'pointer', 150, H, 262, kf, { t });
  }
}
