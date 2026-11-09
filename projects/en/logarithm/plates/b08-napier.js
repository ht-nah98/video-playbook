// b08 · 1614 (câu 35–42, ERA 'photo' — cảnh duy nhất; domino vào từ b07, domino ra sang b09) — DNA blocks, ảnh thật trên khối gỗ.
//  P0 (35)    chồng xu vàng lớn dần + thẻ công thức "that one property" + thẻ A FORTUNE; trượt ra phải khi tới 1614
//  P1 (36)    khối "1614" rơi; "John Napier" → khối ảnh chân dung trượt vào (nhãn NAPIER · 1550–1617); "first work" → trang tên sách 1614
//  P2 (37)    ảnh trượt ra; NO CALCULATORS · ASTRONOMERS · NAVIGATORS; tờ giấy ô vuông trượt vào ĐÃ KÍN 3 hàng (giờ làm việc đã qua);
//             NGƯỜI QUE (../actor.js, LESSONS §175) cầm bút chì vừa bước ngang vừa viết hàng cuối ("multiplied … by hand"), đồng hồ cát
//             ("for hours"); "slip" → bút trượt, chữ số cuối thành X đỏ; "ruined" → buông bút, che mặt; thẻ RESULT bị băng keo
//             xám gạch; "shortcut" → cả trang (cả người que) bị hất bay lên.
//  P3 (38)    SHORTCUT; hai khối tím log a / log b, ảnh trang bảng (nhãn A PAGE OF NAPIER'S TABLES), dấu + → thẻ tổng, mũi tên tra ngược
//  P4 (39)    khối × xám (HARD) xoay thành + tím (EASY)
//  P5 (40)    Briggs (chữ trên thẻ), bảng cơ số 10; 3 khối 100 năm + nửa khối = ≈ 350 YEARS; SCIENTISTS / ENGINEERS; thước trượt (ảnh)
//  P6 (41)    LAPLACE · OFTEN QUOTED; thanh "working life" 4 khối được nối dài gấp đôi bằng 4 khối nữa
//  P7 (42)    máy tính gỗ ("calculators now"), khối × → + ("multiplication into addition"), ba biểu tượng hiện ra ("still everywhere")
// Mascot pose-notebook (talk: false) bên trái ~7 s quanh câu 36–37.
import { H, C, AR, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, block, coinStack, sticker, tag, tape, text, rr, line, icon,
  shadowRR, photoBlock, photoImages, figure, secTag, BASE_Y, actorOn } from '../kit.js';
import { draw, F, HANDS, fast } from '../actor.js';

const lerp = (a, b, u) => a + (b - a) * u;
const B = BASE_Y;
const SHEET = { x: 600, y: 470, w: 680, h: 280 }, ROW3 = SHEET.y + 52 + 3 * 64, DX = c => SHEET.x + 44 + c * 50;   // ô chữ số (sheet)
const QUOTE = 'log (a × b) = log a + log b';
const LAB = { napier: 'JOHN NAPIER · 1550–1617', descriptio: ['MIRIFICI LOGARITHMORUM', 'CANONIS DESCRIPTIO · 1614'], logtable: "A PAGE OF NAPIER'S TABLES · 1614", sliderule: 'A SLIDE RULE' };
const DIG = '1614271828459045235360287471352662497757247093699';   // chữ số viết tay trên tờ giấy tính (48 ô)
const cap = k => Math.min(0.999, k);                              // nhãn trên khối ảnh đang trượt không được ném lỗi vùng an toàn

function hourglass(g, cx, cy, s, f, k) {
  if (k <= 0) return;
  const w = s * 0.7, e = outBack(clamp(k), 2);
  g.save(); g.translate(cx, cy); g.scale(e, e);
  g.fillStyle = C.birchDk; g.fill(rr(-w - 14, -s - 18, 2 * w + 28, 18, 6)); g.fill(rr(-w - 14, s, 2 * w + 28, 18, 6));
  const p = new Path2D(); p.moveTo(-w, -s); p.lineTo(w, -s); p.lineTo(6, 0); p.lineTo(w, s); p.lineTo(-w, s); p.lineTo(-6, 0); p.closePath();
  g.fillStyle = 'rgba(255,255,255,0.55)'; g.fill(p);
  g.save(); g.clip(p); g.fillStyle = C.birchDk; g.fillRect(-w, -s + f * s, 2 * w, s - f * s); g.fillRect(-w, s - f * s, 2 * w, f * s);
  if (f > 0 && f < 1) { g.fillRect(-2, 0, 4, s - f * s); } g.restore();
  g.strokeStyle = C.ink; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke(p);
  g.restore();
}
function sheet(g, x, y, w, h, k, n, slip, t) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(0, (1 - e) * 500);
  shadowRR(g, x, y, w, h, 10, { blur: 14, oy: 8 }); g.fillStyle = C.card; g.fill(rr(x, y, w, h, 10));
  for (let i = 0; i < 48; i++) {
    const r = Math.floor(i / 12), c = i % 12; if (i >= n) break;
    const bad = i === 47 && slip > 0;                 // chữ số người que đang viết lúc trượt tay
    const d = DIG[i];                         // chữ số thật viết tay: 1, 6, 1, 4 … (ô đầu là "1614")
    text(g, bad ? 'X' : d, x + 44 + c * 50 + (bad ? 3 * Math.sin(t * 40) * (1 - slip) : 0), y + 52 + r * 64, { font: `800 46px ${AR}`, color: bad ? C.bad : C.ink, align: 'center', base: 'middle' });
  }
  g.restore();
}
function calc(g, cx, base, k) {
  if (k <= 0) return;
  const w = 170, h = 240;
  block(g, cx, base, 0, { w, h, d: 20, color: C.birch, k, from: 500, v: 1 });
  if (k < 1) return;
  const x0 = cx - w / 2, y0 = base - h;
  g.fillStyle = C.ink; g.fill(rr(x0 + 16, y0 + 16, w - 32, 56, 6));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { g.fillStyle = r === 0 && c === 2 ? C.log : C.birchDk; g.fill(rr(x0 + 18 + c * 50, y0 + 90 + r * 36, 42, 28, 6)); }
}
/** Khối × xám (khó) xoay thành + tím (dễ) — chép cách vẽ promiseBlock ②. */
function xplus(g, cx, base, w, h, k, turn) {
  if (k <= 0) return;
  block(g, cx, base, 0, { w, h, d: 30, color: C.birch, k, from: 500, v: 2 });
  if (k < 1) return;
  const sc = w / 340;
  g.save(); g.translate(cx, base - h / 2 + 4); g.rotate(-Math.PI / 4 * smooth(clamp(turn)));
  g.fillStyle = turn >= 0.5 ? C.log : C.bad;
  for (const a of [Math.PI / 4, -Math.PI / 4]) { g.save(); g.rotate(a); g.fill(rr(-90 * sc, -20 * sc, 180 * sc, 40 * sc, 12)); g.restore(); }
  g.restore();
}

export default class Napier {
  static ERA = 'photo';
  static IMAGES = photoImages('napier', 'descriptio', 'logtable', 'sliderule');
  static POSES = ['notebook'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b08');
    this.START = L(35).start;
    this.FROM = Math.max(this.START - 1.2, L(34).end + 0.5);
    this.T = {
      property: w(35, 'property'), worth: w(35, 'worth'), fortune: w(35, 'fortune'),
      inn: w(36, 'in'), sixteen: w(36, 'sixteen'), john: w(36, 'john'), first: w(36, 'first'),
      were: w(37, 'were'), calc: w(37, 'calculators'), astro: w(37, 'astronomers'), navig: w(37, 'navigators'), mult: w(37, 'multiplied'), hand: w(37, 'hand'),
      hours: w(37, 'hours'), every: w(37, 'every'), slip: w(37, 'slip'), ruined: w(37, 'ruined'),
      short: w(38, 'shortcut'), log: w(38, 'log'), number: w(38, 'number'), printed: w(38, 'printed'), table: w(38, 'table'), add: w(38, 'add'), them: w(38, 'them'), look2: w(38, 'look', 2), back: w(38, 'backwards'),
      hard: w(39, 'hard'), mult2: w(39, 'multiplication'), became: w(39, 'became'), easy: w(39, 'easy'), addition: w(39, 'addition'),
      henry: w(40, 'henry'), base: w(40, 'base'), three: w(40, 'three'), half: w(40, 'half'), cent: w(40, 'centuries'), sci: w(40, 'scientists'), eng: w(40, 'engineers'), slide: w(40, 'slide'),
      the41: w(41, 'the'), laplace: w(41, 'laplace'), often: w(41, 'often'), saying: w(41, 'saying'), logs: w(41, 'logarithms'), doubled: w(41, 'doubled'), working: w(41, 'working'),
      the42: w(42, 'we'), calc2: w(42, 'calculators'), turning: w(42, 'turning'), into: w(42, 'into'), still: w(42, 'still'), every2: w(42, 'everywhere'),
      end: L(42).end,
    };
    const T = this.T;
    this.X = { j: T.john, d: T.first, off1: T.were + 0.2, lt: T.printed, off2: T.the41 - 0.8 };   // mốc vào / ra các khối ảnh
    must('3 * 100 + 50', 350); must('1614 - 1550', 64);
    this.PTR = [this.FROM + 3.2, this.FROM + 3.2 + 7.3];
    // ── người que viết hàng cuối (12 chữ số, mult → slip ≈ 0.27 s / chữ) ──
    const IN = [T.were + 0.35, T.mult - 0.15], WR = [T.mult, T.slip - 0.1];
    this.WR = WR; this.WIN = [IN[0], T.short + 0.8]; actorOn(...this.WIN);
    this.digit = t => Math.min(11, Math.floor(12 * prog(t, WR[0], WR[1] + 0.15)));           // cột đang viết
    this.tip = t => {                                                                          // đầu bút: chữ số đang viết, rung nhỏ khi viết
      const c = this.digit(t), w = t > WR[0] && t < T.slip ? 1 : 0, sl = prog(t, T.slip, T.slip + 0.12);
      return [DX(c) - 10 + 8 * Math.sin(t * 47) * w + 26 * sl, ROW3 + 8 + 5 * Math.cos(t * 61) * w + 40 * sl];
    };
    const X0 = DX(0) + 118, X1 = DX(11) + 118;                                   // đứng lùi trái: đầu không che hàng vừa viết
    // mascot góc thẳng (bản 4): vừa viết vừa nhích sang theo hàng chữ số; trượt tay → giật lùi, sốc; "ruined" → tay che mặt
    this.ACT = ({
      keys: [
        [IN[1], F({ x: X0, look: -1, lookY: 0.4, yaw: -0.5 })],
        [WR[0], F({ x: X0, lean: -0.04, ax: -0.4, ay: 0.55, look: -1, lookY: 0.6, yaw: -0.5, mood: 'think', mouth: 'flat' })],
        [T.slip, F({ x: X1, lean: -0.04, ax: -0.4, ay: 0.55, look: -1, lookY: 0.6, yaw: -0.5, mood: 'think', mouth: 'flat' })],
        [T.slip + 0.1, F({ x: X1 + 14, lean: -0.08, ...HANDS.shrug, look: -1, lookY: 0.4, yaw: -0.3, mood: 'shock', mouth: 'wide', sweat: 1 }), fast],   // trượt tay: giật lùi
        [T.ruined + 0.1, F({ x: X1 + 14, ...HANDS.rest, look: -1, lookY: 0.5, mood: 'sad', mouth: 'wavy', sweat: 1 })],
        [T.ruined + 0.4, F({ x: X1 + 14, ...HANDS.face, mood: 'sad', mouth: 'wavy', sweat: 1 }), fast],                                    // "ruined" → che mặt
        [T.short + 0.8, F({ x: X1 + 14, ...HANDS.face, mood: 'sad', mouth: 'wavy', sweat: 1 })],
      ],
      walks: [[2040, X0, ...IN]],
      grip: t => {                                                                             // tay phải cầm bút: bám đầu bút − thân bút
        const k = clamp(prog(t, WR[0] - 0.3, WR[0] + 0.15) - prog(t, T.slip, T.slip + 0.06));   // trượt tay = buông bút ngay
        if (k <= 0) return null;
        const [x, y] = this.tip(t); return [[x + 16, y + 26], null, k];   // tay TRÁI cầm bút: đứng bên phải ngòi, đầu không che hàng vừa viết
      },
    });
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(this.FROM + 0.4, 'coin'), c(T.property, 'card'), c(T.fortune, 'coin'),
      c(T.sixteen, 'wood'), c(T.john, 'page'), c(T.first, 'page'),
      c(T.calc, 'card'), c(T.astro, 'card'), c(T.navig, 'card'), c(T.mult + 0.1, 'tick'), c(T.hours, 'pop'), c(T.every, 'card'), c(T.ruined, 'tear'),
      c(T.short, 'card'), c(T.short + 0.5, 'wood'), c(T.short + 1.0, 'wood'), c(T.printed, 'page'), c(T.add, 'pop'), c(T.look2, 'pen'),
      c(T.hard, 'wood'), c(T.easy, 'pop'), c(T.addition + 0.3, 'correct'),
      c(T.henry, 'card'), c(T.base, 'card'), c(T.three, 'wood'), c(T.three + 0.3, 'wood'), c(T.cent + 0.2, 'card'), c(T.sci, 'card'), c(T.slide, 'page'),
      c(T.laplace, 'card'), c(T.often + 0.1, 'card'), c(T.saying + 0.2, 'wood'), c(T.doubled, 'wood'), c(T.working, 'pop'),
      c(T.calc2, 'wood'), c(T.turning, 'wood'), c(T.into + 0.15, 'pop'), c(T.still, 'pop'), c(T.every2 + 0.1, 'pop'),
    ];
  }

  render(g, t) {
    const T = this.T, X = this.X, fly = a => outCubic(prog(t, a, a + 0.7)) * 1300;
    ground(g, 'photo');
    secTag(g, '1614', { k: prog(t, this.FROM + 0.35, this.FROM + 0.75), t });

    // ── P0: tiền ──
    const sl = outCubic(prog(t, T.inn, T.inn + 0.8)) * 1400;
    if (sl < 1400) {
      g.save(); g.translate(sl, 0);
      const n = lerp(3, 12, prog(t, this.FROM + 0.3, T.fortune + 0.6));
      coinStack(g, 960, B, n);
      tag(g, QUOTE, 960, 230, { size: 44, edge: C.log, color: C.logInk, k: prog(t, T.property, T.property + 0.3) });
      tag(g, 'A FORTUNE', 960, 310, { size: 44, edge: C.gold, color: C.goldInk, k: prog(t, T.fortune, T.fortune + 0.3) });
      g.restore();
    }

    // ── P1: 1614, Napier, trang tên sách ──
    const lf = prog(t, T.john, T.john + 0.6);
    block(g, 560, B, 0, { w: 300, h: 170, label: '1614', k: prog(t, T.sixteen, T.sixteen + 0.4), lift: lf, from: 400, v: 3 });
    const out1 = prog(t, X.off1, X.off1 + 0.6);
    photoBlock(g, 'napier', 700, 120, 380, 540, { k: clamp(prog(t, X.j, X.j + 0.7) - out1), rot: -0.02, zoom: 1 + 0.03 * prog(t, X.j, X.j + 5), focus: [0.5, 0.3],
      label: LAB.napier, labelK: cap(prog(t, X.j + 0.25, X.j + 0.5)) });
    photoBlock(g, 'descriptio', 1300, 120, 340, 480, { k: clamp(prog(t, X.d, X.d + 0.7) - out1), rot: 0.02, zoom: 1.02 + 0.03 * prog(t, X.d, X.d + 5), focus: [0.5, 0.3],
      label: LAB.descriptio, labelK: cap(prog(t, X.d + 0.1, X.d + 0.35)) });

    // ── P2: không có máy tính, tính tay ──
    if (t >= T.were - 0.1 && t < T.short + 0.8) {
      g.save(); g.translate(0, -fly(T.short));
      tag(g, 'NO CALCULATORS', 960, 300, { size: 44, k: prog(t, T.calc, T.calc + 0.3) });
      tag(g, 'ASTRONOMERS', 700, 400, { size: 40, k: prog(t, T.astro, T.astro + 0.3) });
      tag(g, 'NAVIGATORS', 1220, 400, { size: 40, k: prog(t, T.navig, T.navig + 0.3) });
      sheet(g, SHEET.x, SHEET.y, SHEET.w, SHEET.h, prog(t, T.navig + 0.2, T.navig + 0.8), 36 + this.digit(t) + (t > this.WR[0] ? 1 : 0), prog(t, T.slip, T.slip + 0.3), t);
      hourglass(g, 1500, 610, 90, prog(t, T.hours, T.hours + 2.2), prog(t, T.hours, T.hours + 0.3));
      const tb = tag(g, 'RESULT', 920, 850, { size: 44, color: C.badInk, edge: C.bad, k: prog(t, T.every, T.every + 0.3) });
      tape(g, tb.x - 14, 872, tb.x + tb.w + 14, 832, prog(t, T.ruined, T.ruined + 0.4), { w: 16 });
      if (t > this.WIN[0] && t < this.WIN[1]) {
        const J = draw(g, this.ACT, t), h = J.armL.e;
        // bút chì: trong tay tới khi trượt; rồi rơi xuống mặt bàn, nằm ngang
        const f = prog(t, T.ruined + 0.05, T.ruined + 0.45), held = t < T.slip + 0.2, on = held && t > this.WR[0] - 0.05;
        const [tx, ty] = on ? this.tip(t) : [h[0] - 24, h[1] - 36];                  // ngoài lúc viết: bút ngắn chĩa lên trong tay
        const p0 = held ? [h[0] + 8, h[1] + 10] : [h[0] + 8 + 40 * f, h[1] + 10 + (B - 6 - h[1] - 10) * (f * f)];
        const p1 = held ? [tx, ty] : [p0[0] + 64 * f + (tx - h[0] - 8) * (1 - f), p0[1] + (ty - h[1] - 10) * (1 - f)];
        line(g, p0[0], p0[1], p1[0], p1[1], C.gold, 9); line(g, p1[0] + (p0[0] - p1[0]) * 0.18, p1[1] + (p0[1] - p1[1]) * 0.18, p1[0], p1[1], C.ink, 9);
      }
      g.restore();
    }

    // ── P3: tra bảng log, cộng, tra ngược ──
    if (t >= T.short - 0.1 && t < T.hard + 0.8) {
      const fl = fly(T.hard - 0.1), kph = clamp(prog(t, T.short, T.short + 0.7) - prog(t, T.hard - 0.1, T.hard + 0.5));
      g.save(); g.translate(0, -fl);
      tag(g, 'SHORTCUT', 700, 250, { size: 44, k: prog(t, T.short, T.short + 0.3) });
      block(g, 520, B, 120, { color: C.log, label: 'log a', k: prog(t, T.short + 0.4, T.short + 0.8), from: 420, v: 0 });
      block(g, 820, B, 120, { color: C.log, label: 'log b', k: prog(t, T.short + 0.9, T.short + 1.3), from: 420, v: 1 });
      text(g, '+', 670, B - 22, { font: `900 96px ${AR}`, color: C.logInk, align: 'center', base: 'middle', k: prog(t, T.add, T.add + 0.2) });
      tag(g, 'log a + log b', 670, 500, { size: 44, edge: C.log, color: C.logInk, k: prog(t, T.them, T.them + 0.3) });
      const ka = prog(t, T.look2, T.back + 0.2);
      if (ka > 0) {
        const x0 = 900, y0 = 500, x1 = 1190, y1 = 380, e = outCubic(ka), x = lerp(x0, x1, e), y = lerp(y0, y1, e), a = Math.atan2(y1 - y0, x1 - x0);
        line(g, x0, y0, x, y, C.log, 10);
        g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = C.log; g.beginPath(); g.moveTo(18, 0); g.lineTo(-14, -18); g.lineTo(-14, 18); g.closePath(); g.fill(); g.restore();
      }
      g.restore();
      photoBlock(g, 'logtable', 1250, 120, 380, 510, { k: kph, rot: 0.015, zoom: 1.02 + 0.05 * prog(t, T.short, T.hard), focus: [0.5, 0.2 + 0.4 * prog(t, T.printed, T.back)], label: LAB.logtable, labelK: cap(prog(t, T.printed, T.printed + 0.3)) });
    }

    // ── P4: nhân khó → cộng dễ ──
    if (t >= T.hard - 0.1 && t < T.henry + 0.8) {
      g.save(); g.translate(0, -fly(T.henry - 0.1));
      xplus(g, 960, B, 340, 300, prog(t, T.hard, T.hard + 0.5), prog(t, T.easy, T.easy + 0.55));
      const kh = prog(t, T.hard, T.hard + 0.3) - prog(t, T.easy - 0.1, T.easy + 0.1);
      tag(g, 'HARD', 960, 450, { size: 48, color: C.badInk, edge: C.bad, k: clamp(kh) });
      tag(g, 'EASY', 960, 450, { size: 48, color: C.logInk, edge: C.log, k: prog(t, T.easy, T.easy + 0.3) });
      g.restore();
    }

    // ── P5: Briggs, ba thế kỷ rưỡi, thước trượt ──
    if (t >= T.henry - 0.1 && t < T.the41 + 0.8) {
      const gone = fly(T.slide - 0.4), fl = fly(T.the41 - 0.1);
      g.save(); g.translate(0, -fl);
      photoBlock(g, 'logtable', 1020, 130, 380, 510, { k: clamp(prog(t, T.henry, T.henry + 0.7) - prog(t, T.slide - 0.1, T.slide + 0.5)), rot: 0.015, zoom: 1.02 + 0.05 * prog(t, T.henry, T.slide),
        focus: [0.5, 0.2 + 0.4 * prog(t, T.henry, T.slide)], label: LAB.logtable, labelK: cap(prog(t, T.henry + 0.4, T.henry + 0.7)) });
      g.save(); g.translate(0, -gone);
      tag(g, 'HENRY BRIGGS · 1561–1630', 700, 260, { size: 40, k: prog(t, T.henry, T.henry + 0.3) });
      tag(g, 'TABLES IN BASE 10', 700, 350, { size: 40, edge: C.base, k: prog(t, T.base, T.base + 0.3) });
      tag(g, 'SCIENTISTS', 1620, 270, { size: 40, k: prog(t, T.sci, T.sci + 0.3) });
      tag(g, 'ENGINEERS', 1620, 350, { size: 40, k: prog(t, T.eng, T.eng + 0.3) });
      g.restore();
      for (let i = 0; i < 3; i++) block(g, 520 + i * 200, B, 170, { w: 170, h: 110, color: C.birch, label: '100 YRS', k: prog(t, T.three + i * 0.14, T.three + i * 0.14 + 0.35), from: 420, v: i });
      block(g, 1090, B, 85, { w: 85, h: 110, color: C.birch, label: '50', k: prog(t, T.half, T.half + 0.35), from: 420, v: 3 });
      tag(g, '≈ 350 YEARS', 700, 650, { size: 48, k: prog(t, T.cent, T.cent + 0.3) });
      g.restore();
      photoBlock(g, 'sliderule', 1150, 150, 520, 330, { k: clamp(prog(t, T.slide, T.slide + 0.7) - prog(t, T.the41 - 0.1, T.the41 + 0.5)), rot: -0.015, zoom: 1.02, label: LAB.sliderule, labelK: cap(prog(t, T.slide + 0.3, T.slide + 0.55)) });
    }

    // ── P6: Laplace, đời làm việc gấp đôi ──
    if (t >= T.the41 - 0.1 && t < T.the42 + 0.8) {
      g.save(); g.translate(0, -fly(T.the42 - 0.1));
      tag(g, 'LAPLACE', 700, 280, { size: 48, k: prog(t, T.the41 + 0.2, T.the41 + 0.5) });
      tag(g, 'OFTEN QUOTED', 700, 370, { size: 40, k: prog(t, T.often, T.often + 0.3) });
      for (let i = 0; i < 4; i++) block(g, 620 + i * 150, B, 140, { w: 140, h: 100, color: C.birch, k: prog(t, T.the41 + 0.5 + i * 0.15, T.the41 + 0.85 + i * 0.15), from: 400, v: i });
      for (let i = 0; i < 4; i++) {
        const x = 1220 + i * 150, a = T.doubled + i * 0.12, kg = prog(t, T.logs, T.logs + 0.4);
        if (kg > 0 && t < a + 0.2) { g.save(); g.globalAlpha = kg; g.setLineDash([12, 10]); g.strokeStyle = 'rgba(34,48,60,0.45)'; g.lineWidth = 4; g.stroke(rr(x - 70, B - 100, 140, 100, 8)); g.restore(); }
        block(g, x, B, 140, { w: 140, h: 100, color: C.birch, k: prog(t, a, a + 0.35), from: 400, v: i + 1 });
      }
      block(g, 440, B, 110, { color: C.log, label: 'log', k: prog(t, T.logs, T.logs + 0.4), from: 400, v: 2 });
      tag(g, 'WORKING LIFE', 1000, 700, { size: 44, k: prog(t, T.working, T.working + 0.3) });
      g.restore();
    }

    // ── P7: máy tính nay còn, nhân → cộng vẫn ở khắp nơi ──
    if (t >= T.the42 - 0.1) {
      calc(g, 520, B, prog(t, T.calc2, T.calc2 + 0.5));
      xplus(g, 960, B, 240, 220, prog(t, T.turning, T.turning + 0.4), prog(t, T.into, T.into + 0.5));
      [['quake', 1400, T.still], ['speaker', 1560, T.still + 0.2], ['lemon', 1720, T.every2]].forEach(([kind, x, a]) => icon(g, kind, x, 640, 54, prog(t, a, a + 0.3)));
    }

    const kf = clamp(prog(t, this.PTR[0], this.PTR[0] + 0.45) - prog(t, this.PTR[1] - 0.4, this.PTR[1]));
    figure(g, 'notebook', 200, H, 262, kf, { t, talk: false });
  }
}
