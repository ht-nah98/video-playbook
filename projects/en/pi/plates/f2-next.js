// f2 · Next time (p2 câu 93–98) — hai công thức "không có hình tròn": đường chuông (diện tích = √π, tích phân kiểm bằng
// số trong init) và 1 + 1/4 + 1/9 + 1/16 + … = π²/6 (tổng riêng phần tính trong code tiến về 1.6449). Sau mỗi công
// thức có một vòng tròn chì "trốn"; "a circle hiding" → vòng chì thành vòng compa xanh. "Thank you" → camera xuống chỗ
// giấy trống: khung tên kênh "99% from scratch" + dấu SUBSCRIBE (toạ độ màn hình), đứng yên tới khung cuối; `peace-back`.
import { H, C, CG, ARC, PI, clamp, smooth, prog, ground, drift, card, typed, note, frac, line, arc, arrowHead,
  compassCircle, hatch, stamp, figure, lookup, must, fix } from '../kit.js';

const BX = 520, BY = 640, BU = 100, BH = 280;                 // đường chuông: tâm trục x, đáy, px / đơn vị, chiều cao đỉnh
const bell = x => Math.exp(-x * x);
const HID = [[BX, 500, 160], [1257, 400, 175]];             // vòng tròn chì "trốn" sau mỗi công thức (thế giới)
const SUMX = 1010, SUMY = 430;                              // hàng công thức tổng
const PX = 1010, PY0 = 770, PW = 640, PHt = 150, PN = 40;   // biểu đồ tổng riêng phần

export default class Next {
  static ERA = 'vellum';
  static POSES = ['peace-back'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      next: w(93, 'next'), pi93: w(93, 'pi'), formula: w(93, 'formula'), try: w(93, 'try'), e93: L(93).end,
      no: w(94, 'no'), circle94: w(94, 'circle'), problem: w(94, 'problem'),
      bell: w(95, 'bell'), curve: w(95, 'curve'), root: w(95, 'root'), stats: w(95, 'statistics'), square: w(95, 'square'), pi95: w(95, 'pi'), inside: w(95, 'inside'),
      one: w(95, 'one'), quarter: w(95, 'quarter'), ninth: w(95, 'ninth'), sixteenth: w(95, 'sixteenth'), forever: w(95, 'forever'),
      get: w(95, 'get'), squared: w(95, 'squared'), six: w(95, 'six'),
      dig: w(96, 'dig'), turn: w(96, 'turn'), wave: w(96, 'wave'), circle96: w(96, 'circle'), hiding: w(96, 'hiding'), calc: w(96, 'calculation'),
      thank: w(97, 'thank'), watching: w(97, 'watching'), e97: L(97).end,
      never: w(98, 'never'), subscribe: w(98, 'subscribe'), nn: w(98, 'ninety-nine'), scratch: w(98, 'scratch'), end: L(98).end,
    };
    this.START = L(93).start; this.FROM = this.START - 1.2;
    // ∫ e^(−x²) dx trên [−10, 10] bằng Simpson: phải ra √π
    const n = 4000, a = -10, h = 20 / n; let s = bell(a) + bell(10);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * bell(a + i * h);
    const I = s * h / 3;
    if (Math.abs(I - Math.sqrt(PI)) > 1e-9) throw new Error(`f2: ∫e^(−x²) = ${I} ≠ √π`);
    this.SQ = fix('Math.sqrt(Math.PI)', 4);                    // "1.7725"
    // tổng riêng phần 1 + 1/4 + … + 1/N
    this.S = [0]; for (let k = 1; k <= 1000; k++) this.S.push(this.S[k - 1] + 1 / (k * k));
    this.BASEL = fix('Math.PI ** 2 / 6', 4);                   // "1.6449"
    must(`${Math.abs(this.S[1000] - PI * PI / 6) < 1e-3}`, true); must(`${this.S[1000] < PI * PI / 6}`, true);
    must('1 + 1/4 + 1/9 + 1/16', this.S[4]);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.try, kind: 'tick' }, { t: T.bell, kind: 'pen' }, { t: T.one, kind: 'tick' },
      { t: T.squared, kind: 'correct' }, { t: T.circle96, kind: 'pen' },
      { t: T.thank + 0.1, kind: 'tick' }, { t: T.subscribe + 0.15, kind: 'tick' },
    ];
  }
  render(g, t) {
    const T = this.T, d = drift(Math.min(t, T.thank - 0.3), this.FROM, { vx: 2.5, vy: 1, max: 40 });
    const pan = smooth(prog(t, T.thank - 0.3, T.thank + 0.7)), cam = { x: d.x, y: d.y + 1080 * pan };
    ground(g, 'vellum', cam.x, cam.y);
    if (pan < 1) { g.save(); g.translate(-cam.x, -cam.y); this.formulas(g, t); g.restore(); }
    // biển kênh (MÀN HÌNH): trượt vào cùng tờ giấy khi camera xuống, rồi đứng yên tới khung cuối
    this.board(g, t, (1 - pan) * 1080 - d.y * (1 - pan));
    figure(g, 'peace-back', 1620, H, 740, prog(t, T.never, T.never + 0.35));
    card(g, prog(t, this.FROM + 0.9, this.FROM + 2.2) * (1 - prog(t, T.thank - 0.3, T.thank + 0.4)), 'V', 'NEXT TIME', 'look for the turn');
  }
  formulas(g, t) {
    const T = this.T;
    // câu dẫn
    typed(g, 'Next time you see', 170, 200, prog(t, T.next - 0.1, T.pi93), `italic 600 54px ${CG}`, C.ink);
    g.save(); g.font = `italic 600 54px ${CG}`; const w1 = g.measureText('Next time you see ').width; g.restore();
    typed(g, 'π', 170 + w1, 200, prog(t, T.pi93, T.pi93 + 0.1), `italic 700 72px ${CG}`, C.blue);
    typed(g, 'in a formula, try this.', 170 + w1 + 44, 200, prog(t, T.pi93 + 0.15, T.e93 + 0.1), `italic 600 54px ${CG}`, C.ink);
    note(g, 'no circle anywhere in the problem?', 170, 258, prog(t, T.no - 0.1, T.problem + 0.4), { size: 22 });
    // vòng tròn chì "trốn" (đứt nét), vẽ ở "circle" của câu 94; câu 96 "circle" → vòng compa xanh
    HID.forEach(([x, y, r], i) => {
      arc(g, x, y, r, PI / 2, PI / 2 + 2 * PI, C.lead, 1.4, prog(t, T.circle94 + i * 0.15, T.problem + 0.5 + i * 0.15), { dash: [7, 7] });
      compassCircle(g, x, y, r, { w: 3.5, k: prog(t, T.circle96 - 0.1 + i * 0.2, T.hiding + 0.3 + i * 0.2), a0: PI / 2 });
    });
    // đường chuông: trục, đường cong, diện tích = √π
    line(g, [[BX - 3.3 * BU, BY], [BX + 3.3 * BU, BY]], C.leadT, 1.6, { k: prog(t, T.bell - 0.5, T.bell) });
    const P = Array.from({ length: 121 }, (_, i) => { const x = -3 + i / 20; return [BX + x * BU, BY - BH * bell(x)]; });
    const ka = prog(t, T.square - 0.1, T.pi95 + 0.3);
    if (ka > 0) {
      g.save(); g.beginPath(); g.moveTo(BX - 3 * BU, BY); P.forEach(p => g.lineTo(...p)); g.lineTo(BX + 3 * BU, BY); g.closePath(); g.clip();
      hatch(g, gg => gg.rect(BX - 3 * BU, BY - BH - 4, 6 * BU * ka, BH + 4), 'rgba(35,72,166,0.55)', 10); g.restore();
    }
    line(g, P, C.ink, 3, { k: prog(t, T.bell, T.stats + 0.4) });
    note(g, 'the bell curve · statistics', BX - 3 * BU, BY + 46, prog(t, T.curve, T.stats + 0.6), { size: 20 });
    note(g, 'area', 720, 420, prog(t, T.square - 0.2, T.square + 0.2), { color: C.ink, size: 22 });
    typed(g, '= √π', 720, 492, prog(t, T.root, T.pi95 + 0.15), `italic 700 72px ${CG}`, C.blue);
    note(g, `≈ ${this.SQ}`, 722, 534, prog(t, T.inside, T.inside + 0.5), { size: 20 });
    // 1 + 1/4 + 1/9 + 1/16 + … = π²/6
    const F = `600 54px ${CG}`, items = [['1', T.one], ['+', T.one + 0.2], ['1/4', T.quarter], ['+', T.quarter + 0.3], ['1/9', T.ninth],
      ['+', T.ninth + 0.3], ['1/16', T.sixteenth], ['+ …', T.forever], ['=', T.get], ['π²/6', T.squared]];
    let x = SUMX;
    g.save(); g.font = F; const sp = g.measureText(' ').width; g.restore();
    for (const [s, a] of items) {
      const k = prog(t, a, a + 0.25), blue = s === 'π²/6';
      if (s.includes('/')) {
        x += sp; const [n, dd] = s.split('/'), fw = 34 + 22 * Math.max(n.length, dd.length);
        if (k > 0) { g.save(); g.beginPath(); g.rect(x - 4, SUMY - 80, fw * (blue ? 1.2 : 1) * clamp(k * 1.5) + 8, 140); g.clip();
          frac(g, n, dd, x + fw / 2, SUMY, 54, blue ? C.blue : C.ink); g.restore(); }
        x += fw + 2 * sp;
      } else {
        typed(g, s, x, SUMY + 18, k, F, C.ink); g.save(); g.font = F; x += g.measureText(s).width + sp; g.restore();
      }
    }
    // tổng riêng phần: chấm bậc thang tiến tới đường đứt π²/6
    const kp = prog(t, T.forever - 0.2, T.get + 0.2), yv = v => PY0 - (v - 1) / (PI * PI / 6 - 1) * PHt;
    line(g, [[PX, PY0 + 10], [PX, PY0 - PHt - 20]], C.leadT, 1.4, { k: kp * 3 });
    line(g, [[PX, PY0 + 10], [PX + PW, PY0 + 10]], C.leadT, 1.4, { k: kp * 3 });
    line(g, [[PX, yv(PI * PI / 6)], [PX + PW, yv(PI * PI / 6)]], C.blue, 1.6, { dash: [8, 6], k: prog(t, T.squared - 0.3, T.six + 0.2) });
    note(g, `π²/6 ≈ ${this.BASEL}`, PX + PW - 230, yv(PI * PI / 6) - 16, prog(t, T.squared, T.six + 0.4), { color: C.blue, size: 20 });
    const nd = Math.floor(PN * kp);
    g.save(); g.fillStyle = C.ink;
    for (let k = 1; k <= nd; k++) { g.beginPath(); g.arc(PX + (k - 0.5) * PW / PN, yv(this.S[k]), 4, 0, 7); g.fill(); }
    g.restore();
    note(g, 'partial sums', PX + 12, PY0 + 44, prog(t, T.forever, T.forever + 0.5), { size: 18 });
    // bộ đếm: N tăng theo cấp số (1 → 1000), tổng tính sẵn trong init
    const kn = prog(t, T.forever, T.six + 0.3);
    if (kn > 0) {
      const N = Math.max(1, Math.min(1000, Math.round(Math.pow(1000, kn)))), sN = this.S[N].toFixed(4);
      note(g, `first ${N} terms: ${sN}`, PX + 300, PY0 + 44, 1, { color: C.ink, size: 18 });
    }
    // "a turn, a wave, or a circle — hiding inside the calculation"
    const ry = 920, ink = C.blue;
    note(g, 'dig:', 170, ry, prog(t, T.dig - 0.1, T.dig + 0.3), { color: C.ink, size: 24 });
    note(g, 'a turn', 270, ry, prog(t, T.turn - 0.1, T.turn + 0.3), { color: ink, size: 24 });
    const kt = prog(t, T.turn + 0.1, T.turn + 0.5);
    arc(g, 420, ry - 9, 18, -PI * 0.3, PI * 1.25, ink, 3, kt); if (kt >= 1) arrowHead(g, 420 + 18 * Math.cos(PI * 1.25), ry - 9 - 18 * Math.sin(PI * 1.25), PI * 0.25 + PI / 2 + 0.3, ink, 12);
    note(g, '· a wave', 470, ry, prog(t, T.wave - 0.2, T.wave + 0.3), { color: ink, size: 24 });
    line(g, Array.from({ length: 31 }, (_, j) => [640 + j * 2.2, ry - 9 - 12 * Math.sin(j / 30 * 2 * PI)]), ink, 3, { k: prog(t, T.wave + 0.1, T.wave + 0.5) });
    note(g, '· a circle', 730, ry, prog(t, T.circle96 - 0.25, T.circle96 + 0.3), { color: ink, size: 24 });
    arc(g, 920, ry - 9, 15, PI / 2, PI / 2 + 2 * PI, ink, 3, prog(t, T.circle96 + 0.2, T.circle96 + 0.6));
    note(g, '— hiding inside the calculation', 960, ry, prog(t, T.hiding, T.calc + 0.5), { size: 24 });
  }
  board(g, t, dy) {                                        // khung tên KÊNH kiểu bản vẽ: tên to + dấu SUBSCRIBE xanh (không logo)
    const T = this.T, x0 = 250, y0 = 300 + dy, w = 1060, h = 410, kb = prog(t, T.thank - 0.1, T.thank + 0.6);
    if (kb <= 0 || y0 > H) return;
    const R = (x, y, ww, hh) => [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]];
    g.save(); g.fillStyle = 'rgba(243,237,222,0.9)'; g.fillRect(x0, y0, w * clamp(kb * 3), h); g.restore();
    line(g, R(x0, y0, w, h), C.ink, 2.6, { k: kb });
    line(g, R(x0 + 10, y0 + 10, w - 20, h - 20), C.ink, 1.2, { k: kb });
    line(g, [[x0 + 10, y0 + 70], [x0 + w - 10, y0 + 70]], C.ink, 1.2, { k: kb * 2 - 1 });
    line(g, [[x0 + 10, y0 + 280], [x0 + w - 10, y0 + 280]], C.ink, 1.2, { k: kb * 2 - 1 });
    typed(g, 'CHANNEL', x0 + 34, y0 + 48, prog(t, T.thank + 0.2, T.thank + 0.5), `600 18px ${ARC}`, C.leadT, { ls: 3 });
    typed(g, 'SHEET V · END', x0 + w - 34, y0 + 48, prog(t, T.thank + 0.3, T.thank + 0.6), `600 18px ${ARC}`, C.leadT, { align: 'right', ls: 3 });
    typed(g, '99% from scratch', x0 + w / 2, y0 + 215, prog(t, T.thank + 0.3, T.watching + 0.5), `600 120px ${CG}`, C.ink, { align: 'center' });
    // gạch chân xanh (hai nét thước) ở "ninety-nine percent from scratch"
    const ku = prog(t, T.nn, T.scratch + 0.2);
    line(g, [[x0 + 150, y0 + 240], [x0 + w - 150, y0 + 240]], C.blue, 3, { k: ku });
    line(g, [[x0 + 180, y0 + 252], [x0 + w - 180, y0 + 252]], C.blue, 1.5, { k: ku * 1.2 - 0.2 });
    note(g, 'thank you for watching', x0 + 34, y0 + 356, prog(t, T.thank, T.e97), { color: C.ink, size: 24 });
    stamp(g, 'SUBSCRIBE', x0 + w - 250, y0 + 345, prog(t, T.subscribe - 0.1, T.subscribe + 0.25), `700 64px ${ARC}`, C.blue, { rot: -0.05 });
  }
}
