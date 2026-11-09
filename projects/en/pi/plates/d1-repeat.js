// d1 · A fraction has to repeat (p2 câu 50–57) — MỞ HỒI III. Một tờ dài, camera đi xuống qua ba vùng:
//   0 "π ≠ a ÷ b" (IRRATIONAL) · "what fractions do": 1 ÷ 3 = 0.333…, rồi = 0.3 với gạch trên vẽ tay
//   1 1 ÷ 7 = 0.142857 142857…; phép chia viết tay từng bước (số dư TÍNH trong code), sáu số dư thành vòng lục giác
//     1 → 3 → 2 → 6 → 4 → 5 → quay lại 1 (chữ số trên cạnh đọc ra 142857)
//   2 "STOP OR LOOP"; chữ số π chạy ra mép, gạch STOP và LOOP → π không phải phân số.
import { C, CG, PI, PI_DIGITS, clamp, smooth, outCubic, prog, ground, card, actTitle, text, typed, note, line,
  arrowHead, hand, cross, ring, arrow, lookup, must, mono } from '../kit.js';

const ZONE = 1080;

// phép chia dài 1 ÷ 7: mỗi bước số dư r → (10r = 7·d + r'), tính bằng code
function longDivision(num, den, steps) {
  const out = []; let r = num;
  for (let i = 0; i < steps; i++) { const d = Math.floor(10 * r / den), r2 = 10 * r - den * d; out.push({ r, d, r2 }); r = r2; }
  return out;
}

export default class Repeat {
  static ERA = 'vellum';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      irr: w(50, 'irrational'), cannot: w(50, 'cannot'), one: w(50, 'one'), divided: w(50, 'divided'), another: w(50, 'another'),
      matters: w(51, 'matters'), look: w(51, 'look'), fractions: w(51, 'fractions'),
      div3: w(52, 'divide'), three1: w(52, 'three'), zero: w(52, 'zero'), t2: w(52, 'three', 2), t3: w(52, 'three', 3), t4: w(52, 'three', 4),
      repeating: w(52, 'repeating'), forever: w(52, 'forever'), bar: w(52, 'bar'), over: w(52, 'over'), writes: w(52, 'writes'), completely: w(52, 'completely'),
      div7: w(53, 'divide'), seven: w(53, 'seven'), get7: w(53, 'get'), then: w(53, 'then'), again: w(53, 'again'), again2: w(53, 'again', 2),
      luck: w(54, 'luck'), step: w(54, 'step'), remainder: w(54, 'remainder'), unless: w(54, 'unless'), exactly: w(54, 'exactly'),
      only: w(54, 'only'), six: w(54, 'six'), canBe: w(54, 'be'),
      within: w(55, 'within'), steps: w(55, 'steps'), some: w(55, 'some'), back: w(55, 'back'), moment: w(55, 'moment'), repeat: w(55, 'repeat'),
      every: w(56, 'every'), stop: w(56, 'stop'), or: w(56, 'or'), loop: w(56, 'loop'),
      digits: w(57, 'digits'), never1: w(57, 'never'), never2: w(57, 'never', 2), loop2: w(57, 'loop'), cannotF: w(57, 'cannot'), fraction: w(57, 'fraction'),
      end: L(57).end,
    };
    // giờ từng chữ số của 142857 đọc lần đầu / lần hai
    // "divide ONE by SEVEN" dùng trước một lần 'one' và 'seven' → chữ số lấy lần đọc sau đó
    const occ = (s, j) => w(53, s, (s === 'one' || s === 'seven' ? 2 : 1) + j);
    this.D1 = ['one', 'four', 'two', 'eight', 'five', 'seven'].map(s => occ(s, 0));
    this.D2 = ['one', 'four', 'two', 'eight', 'five', 'seven'].map(s => occ(s, 1));
    this.PAN = [0, L(53).start - 0.25, L(56).start - 0.55];
    this.START = L(50).start; this.FROM = this.START - 2.6;
    // toán trên hình
    this.DIV = longDivision(1, 7, 6);
    must(`'${this.DIV.map(s => s.r).join(',')}'`, '1,3,2,6,4,5');
    must(`'${this.DIV.map(s => s.d).join('')}'`, '142857');
    must(`${this.DIV.at(-1).r2}`, 1);                                    // bước thứ sáu trả về số dư đầu
    this.DIV.forEach(s => must(`10 * ${s.r} === 7 * ${s.d} + ${s.r2}`, true));
    must(`(1 / 7).toFixed(6)`, '0.142857'); must(`(1 / 3).toFixed(4)`, '0.3333');
    this.SEVEN = '0.' + this.DIV.map(s => s.d).join('');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.irr, kind: 'pen' }, { t: T.divided, kind: 'tick' }, { t: T.zero, kind: 'pen' },
      { t: T.bar, kind: 'pen' }, { t: T.seven, kind: 'pen' }, { t: T.step, kind: 'tick' },
      { t: T.six, kind: 'tick' }, { t: T.back, kind: 'snap' }, { t: T.stop, kind: 'pen' },
    ];
  }
  cam(t) {
    const P = this.PAN; let s = 0; for (let i = 0; i < P.length; i++) if (t >= P[i]) s = i;
    const e = s ? smooth(prog(t, P[s], P[s] + 1.0)) : 1, from = s ? (s - 1) * ZONE + Math.min(60, 3 * (P[s] - P[s - 1])) : 0;
    const y0 = s * ZONE + Math.min(60, 3 * Math.max(0, t - (s ? P[s] + 1.0 : this.FROM)));
    return { x: Math.min(70, 2.4 * Math.max(0, t - this.FROM)), y: from + (y0 - from) * e };
  }
  render(g, t) {
    const c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01 && c.y < ZONE * 1.99) this.zone1(g, t, ZONE);
    if (c.y > ZONE * 1.01) this.zone2(g, t, 2 * ZONE);
    g.restore();
    actTitle(g, t, this.START, 'III', 'Why pi never ends', 'answers note 2');
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'III', 'FRACTIONS LOOP', 'why pi never ends');
  }
  zone0(g, t) {
    const T = this.T, Y = 100;
    // π ≠ a ÷ b
    typed(g, 'π', 180, Y + 440, prog(t, T.irr - 0.15, T.irr + 0.1), `italic 700 140px ${CG}`, C.blue);
    note(g, 'irrational', 180, Y + 540, prog(t, T.irr, T.irr + 0.7), { color: C.blue, size: 28 });
    typed(g, '≠', 290, Y + 430, prog(t, T.cannot, T.cannot + 0.2), `600 96px ${CG}`, C.ink);
    const kf = prog(t, T.one, T.another + 0.2);
    if (kf > 0) {
      typed(g, 'a', 440, Y + 360, kf * 4, `italic 700 96px ${CG}`, C.ink, { align: 'center' });
      line(g, [[395, Y + 395], [485, Y + 395]], C.ink, 4, { k: prog(t, T.divided, T.divided + 0.3) });
      typed(g, 'b', 440, Y + 480, prog(t, T.another, T.another + 0.2), `italic 700 96px ${CG}`, C.ink, { align: 'center' });
    }
    mono(g, 'a, b: WHOLE NUMBERS', 180, Y + 590, prog(t, T.another, T.another + 0.9), C.leadT);
    // → what fractions do
    arrow(g, 560, Y + 400, 880, Y + 330, prog(t, T.matters - 0.2, T.look), { color: C.leadT, w: 2, bend: -30 });
    note(g, 'what fractions do:', 960, Y + 300, prog(t, T.look, T.fractions + 0.4), { color: C.ink, size: 28 });
    // 1 ÷ 3 = 0.333… : mỗi chữ 3 viết đúng lúc đọc, "repeating forever" chạy thêm
    const F = `600 96px ${CG}`, x0 = 960, y0 = Y + 460;
    typed(g, '1 ÷ 3', x0, y0, prog(t, T.div3, T.three1 + 0.15), F, C.ink);
    g.save(); g.font = F; const wHead = g.measureText('1 ÷ 3 ').width, wEq = g.measureText('= 0.').width, w3 = g.measureText('3').width; g.restore();
    typed(g, '= 0.', x0 + wHead, y0, prog(t, T.zero - 0.05, T.zero + 0.35), F, C.ink);
    const n3 = (t >= T.t2) + (t >= T.t3) + (t >= T.t4) + Math.floor(clamp((t - T.repeating) / (T.forever + 0.4 - T.repeating)) * 4);
    for (let i = 0; i < n3; i++) text(g, '3', x0 + wHead + wEq + i * w3, y0, F, C.ink);
    if (t > T.forever + 0.4) typed(g, '…', x0 + wHead + wEq + 7 * w3, y0, prog(t, T.forever + 0.4, T.forever + 0.6), F, C.ink);
    // = 0.3 với gạch trên vẽ tay
    const y1 = Y + 620;
    typed(g, '= 0.3', x0 + wHead, y1, prog(t, T.bar - 0.45, T.bar), F, C.ink);
    const bx = x0 + wHead + wEq;
    hand(g, [[bx - 2, y1 - 72], [bx + w3 * 0.5, y1 - 74], [bx + w3 + 2, y1 - 72]], { w: 4, color: C.blue, jit: 1, seed: 21, k: prog(t, T.bar, T.over + 0.15) });
    note(g, 'the bar = repeats forever', x0 + wHead, y1 + 70, prog(t, T.writes, T.completely + 0.4), { size: 22 });
    note(g, 'written down completely', x0 + wHead, y1 + 106, prog(t, T.completely - 0.2, T.completely + 0.35), { color: C.blue, size: 22 });
  }
  zone1(g, t, Y) {
    const T = this.T;
    // 1 ÷ 7 = 0.142857 142857 …
    const F = `600 72px ${CG}`, x0 = 180, y0 = Y + 230;
    typed(g, '1 ÷ 7 =', x0, y0, prog(t, T.div7, T.seven + 0.2), F, C.ink);
    g.save(); g.font = F; const wh = g.measureText('1 ÷ 7 = ').width, wz = g.measureText('0.').width; g.restore();
    typed(g, '0.', x0 + wh, y0, prog(t, T.get7, T.get7 + 0.25), F, C.ink);
    g.save(); g.font = F; const wd = g.measureText('142857').width; g.restore();
    const gx = [x0 + wh + wz, x0 + wh + wz + wd + 24];
    [this.D1, this.D2].forEach((times, j) => times.forEach((a, i) => {
      if (t >= a) text(g, '142857'[i], gx[j] + wd * i / 6, y0, F, C.ink);
    }));
    if (t > T.again) typed(g, '142857…', gx[1] + wd + 24, y0, prog(t, T.again, T.again2 + 0.3), F, C.leadT);
    // ngoặc chì dưới mỗi nhóm
    [[this.D1[5], gx[0]], [this.D2[5], gx[1]]].forEach(([a, x]) => line(g, [[x, y0 + 18], [x, y0 + 30], [x + wd, y0 + 30], [x + wd, y0 + 18]], C.lead, 1.6, { k: prog(t, a + 0.15, a + 0.5) }));
    // "that isn't luck" + phép chia viết tay
    note(g, 'not luck · each step leaves a remainder', x0, Y + 340, prog(t, T.luck - 0.1, T.remainder + 0.4), { color: C.ink, size: 24 });
    const R = `italic 600 54px ${CG}`, rx = 200, ry = Y + 430, dy = 66, a = T.step, b = T.unless;   // sáu dòng trong lúc đọc "each step … remainder"
    this.DIV.forEach((s, i) => {
      const k0 = a + (b - a) * i / 6, k1 = a + (b - a) * (i + 1) / 6, y = ry + i * dy;
      const left = `${10 * s.r} = 7 × ${s.d} +`;
      typed(g, left, rx, y, prog(t, k0, k1 - 0.1), R, C.ink);
      g.save(); g.font = R; const wl = g.measureText(left + ' ').width; g.restore();
      const last = i === 5;
      typed(g, String(s.r2), rx + wl + 8, y, prog(t, k1 - 0.15, k1), R, last ? C.blue : C.ink);
      ring(g, rx + wl + 21, y - 18, 28, 30, prog(t, T.remainder + i * 0.08, T.remainder + 0.4 + i * 0.08), { color: last ? C.blue : C.leadT, w: 2, seed: 30 + i });
      typed(g, String(s.d), 640, y, prog(t, k1 - 0.15, k1), R, C.leadT);
    });
    note(g, 'digit', 620, ry - 64, prog(t, T.step, T.step + 0.4), { size: 20 });
    note(g, 'remainder', rx + 210, ry - 64, prog(t, T.remainder, T.remainder + 0.5), { size: 20 });
    note(g, 'remainder 0 → it stops', rx, ry + 6 * dy + 10, prog(t, T.unless, T.exactly + 0.5), { size: 22 });
    // vòng lục giác các số dư
    const hx = 1360, hy = Y + 650, hr = 230, order = this.DIV.map(s => s.r);
    const V = i => { const ang = PI / 2 - i * PI / 3; return [hx + hr * Math.cos(ang), hy - hr * Math.sin(ang)]; };
    note(g, 'only six remainders it can be:', 980, Y + 300, prog(t, T.only, T.canBe + 0.3), { color: C.ink, size: 24 });
    note(g, '1 · 2 · 3 · 4 · 5 · 6', 980, Y + 340, prog(t, T.six, T.canBe + 0.4), { color: C.blue, size: 24 });
    const kNode = i => prog(t, T.six + i * 0.12, T.six + i * 0.12 + 0.3);
    // cạnh: bước i → i+1, chữ số d trên cạnh, vẽ theo "within six steps"
    const e0 = T.within, e1 = T.some;
    for (let i = 0; i < 6; i++) {
      const [ax, ay] = V(i), [bx, by] = V((i + 1) % 6), L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L;
      const p0 = [ax + ux * 46, ay + uy * 46], p1 = [bx - ux * 50, by - uy * 50];
      const last = i === 5, ka = last ? prog(t, T.some, T.back + 0.15) : prog(t, e0 + (e1 - e0) * i / 5, e0 + (e1 - e0) * (i + 1) / 5);
      line(g, [p0, p1], last ? C.blue : C.ink, last ? 4 : 2.4, { k: ka });
      if (ka >= 1) arrowHead(g, p1[0], p1[1], Math.atan2(uy, ux), last ? C.blue : C.ink, 16);
      const mx = (ax + bx) / 2, my = (ay + by) / 2, ox = mx - hx, oy = my - hy, ol = Math.hypot(ox, oy);
      typed(g, String(this.DIV[i].d), mx + ox / ol * 40, my + oy / ol * 40 + 16, prog(t, T.moment + i * 0.15, T.moment + i * 0.15 + 0.2),
        `600 46px ${CG}`, C.blue, { align: 'center' });
    }
    for (let i = 0; i < 6; i++) {
      const [x, y] = V(i), k = kNode(i);
      if (k <= 0) continue;
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.fillStyle = 'rgba(239,232,214,0.95)';
      g.beginPath(); g.arc(x, y, 38, -PI / 2, -PI / 2 + 2 * PI * outCubic(k)); g.fill(); g.stroke(); g.restore();
      const kv = prog(t, e0 + (e1 - e0) * (i - 1) / 5, e0 + (e1 - e0) * (i - 1) / 5 + 0.2);
      typed(g, String(order[i]), x, y + 16, i === 0 ? prog(t, e0 - 0.2, e0) : kv, `600 46px ${CG}`, C.ink, { align: 'center' });
    }
    ring(g, V(0)[0], V(0)[1], 56, 56, prog(t, T.back, T.back + 0.45), { color: C.blue, w: 4, seed: 41 });
    note(g, 'back to 1 → the digits repeat', hx, hy + hr + 96, prog(t, T.moment, T.repeat + 0.5), { color: C.blue, size: 24, align: 'center' });
    note(g, 'loop', hx, hy + 8, prog(t, T.back + 0.2, T.back + 0.6), { color: C.blue, size: 28, align: 'center' });
  }
  zone2(g, t, Y) {
    const T = this.T;
    note(g, 'every fraction:', 180, Y + 230, prog(t, T.every, T.every + 0.9), { color: C.ink, size: 28 });
    const F = `600 120px ${CG}`;
    typed(g, 'STOP', 260, Y + 430, prog(t, T.stop - 0.05, T.stop + 0.3), F, C.ink);
    typed(g, 'or', 690, Y + 420, prog(t, T.or, T.or + 0.15), `italic 600 72px ${CG}`, C.leadT);
    typed(g, 'LOOP', 860, Y + 430, prog(t, T.loop - 0.15, T.loop + 0.25), F, C.ink);
    // pictogram: dòng chữ số dừng (thanh chặn) · dòng chữ số vòng lại
    const ks = prog(t, T.stop, T.or + 0.1);
    line(g, [[270, Y + 530], [560, Y + 530]], C.ink, 2.4, { k: ks });
    if (ks >= 1) line(g, [[560, Y + 512], [560, Y + 548]], C.ink, 4);
    const kl = prog(t, T.loop, T.loop + 0.5);
    line(g, [[870, Y + 530], [1070, Y + 530]], C.ink, 2.4, { k: kl * 2 });
    if (kl > 0.5) {
      const ka = (kl - 0.5) * 2, cx = 1110, cy = Y + 530, r = 40;
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.beginPath(); g.arc(cx, cy - r, r, PI / 2, PI / 2 - 2 * PI * 0.92 * ka, true); g.stroke(); g.restore();
      if (ka >= 1) arrowHead(g, cx - 12, cy - 1, PI + 0.2, C.ink, 14);
    }
    // π: chữ số chạy ra mép — không dừng, không lặp
    typed(g, 'π', 180, Y + 760, prog(t, T.digits - 0.3, T.digits), `italic 700 96px ${CG}`, C.blue);
    const kd = t - T.digits;
    if (kd > 0) {
      const s = '= ' + PI_DIGITS.slice(0, Math.min(PI_DIGITS.length, 2 + Math.floor(kd * 14)));
      g.save(); g.beginPath(); g.rect(96, Y + 640, 1728, 160); g.clip(); text(g, s, 260, Y + 752, `600 72px ${CG}`, C.blue); g.restore();
    }
    // π hàng riêng: "stops?" / "loops?" viết chì rồi ✗ đỏ đúng từng "never" (STOP / LOOP phía trên vẫn đúng cho phân số)
    note(g, 'stops?', 260, Y + 830, prog(t, T.never1 - 0.3, T.never1), { size: 24 });
    cross(g, 388, Y + 822, 18, prog(t, T.never1 + 0.1, T.never1 + 0.45), { seed: 51, w: 5 });
    note(g, 'loops?', 460, Y + 830, prog(t, T.never2 - 0.25, T.never2), { size: 24 });
    cross(g, 588, Y + 822, 18, prog(t, T.never2 + 0.1, T.never2 + 0.45), { seed: 57, w: 5 });
    note(g, '→ π is not a fraction', 260, Y + 900, prog(t, T.cannotF, T.fraction + 0.5), { color: C.blue, size: 34 });
  }
}
