// c4 · Multiplying zero times (p2, câu 30–36) — tim của bài. Một màn LCD cuộn hai trang:
//   trang 0  câu hỏi "MULTIPLY ZERO TIMES = NOTHING?" → "WHERE DOES A CALCULATION START?" → hai thanh ghi:
//            + [0] (EMPTY SUM = 0) rồi × [1] lam (×1 CHANGES NOTHING)
//   trang 1  (như lab khung 0) 2³ = 1 × 2 × 2 × 2 = 8, rút từng số 2 (đoạn tắt) → 2⁰ = 1 = 1 lam; cột ×REG nhuộm lam
//            "START"; dòng "MULTIPLYING ZERO TIMES = NOTHING" bị âm bản (ERR) → "= NOT STARTED YET = 1" (pose offer).
import { W, H, C, smooth, prog, ground, ink, card, annunciators, seg7, row, rowW, dm, dmW, dots, wrong, figure, lookup,
  must, SEG } from '../kit.js';

const PAGE = 1080, X = 132;

export default class Empty {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['offer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      q: w(30, 'what', 2), mult30: w(30, 'multiply'), times30: w(30, 'times'), e30: L(30).end,
      think: L(31).start, starts: w(31, 'starts'),
      add: w(32, 'add'), zero32: w(32, 'zero'), adding: w(32, 'adding'), nothing32: w(32, 'nothing'),
      add2: w(32, 'add', 2), zeroEnd: w(32, 'zero', 3), e32: L(32).end,
      mult33: w(33, 'multiply'), one33: w(33, 'one'), multiplying: w(33, 'multiplying'), nothing33: w(33, 'nothing'), e33: L(33).end,
      two34: w(34, 'two'), two34d: w(34, 'two', 4), e34: L(34).end,
      twos: w(35, 'twos'), time35: w(35, 'time'), left: w(35, 'left'), starting: w(35, 'starting'), one35: w(35, 'one'),
      m36: w(36, 'multiplying'), isnt: w(36, "isn't"), nothing36: w(36, 'nothing'), not36: w(36, 'not'),
      yet: w(36, 'yet'), is36: w(36, 'is'), one36: w(36, 'one'), e36: L(36).end,
    };
    this.START = L(30).start;
    this.FROM = this.START - 1.2;
    this.PAN = [L(34).start - 0.6];
    const T = this.T;
    // rút từng số 2: dòng r (r = 1..3) hiện lúc REM[r-1]
    this.REM = [T.twos, (T.twos + T.left) / 2, T.left];
    this.V = {
      vals: [must('2^3', 8), must('2^2', 4), must('2^1', 2), must('2^0', 1)],
      prods: [must('1 × 2 × 2 × 2', 8), must('1 × 2 × 2', 4), must('1 × 2', 2), must('1', 1)],
      sumE: must('[].reduce((a, b) => a + b, 0)', 0), prodE: must('[].reduce((a, b) => a * b, 1)', 1),
    };
    this.V.vals.forEach((v, i) => { if (v !== this.V.prods[i]) throw new Error('c4: 2^n ≠ tích'); });
    // đo trước: dòng dài nhất trang 1 không chạm nhân vật (mép trái ≈ 1360)
    const wRow = rowW(this.rowTok(0, 1), 96);
    if (X + wRow > 1300) throw new Error('c4: dòng 2³ quá rộng ' + wRow);
    if (X + dmW('MULTIPLYING ZERO TIMES = NOTHING', 6) > 1300) throw new Error('c4: dòng sai quá rộng');
    if (X + dmW('MULTIPLYING = NOT STARTED YET = 1', 6) > 1330) throw new Error('c4: dòng sửa quá rộng');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.zero32, kind: 'beep' },            // + [0] hiện
      { t: T.one33, kind: 'beep' },             // × [1] lam hiện
      { t: T.two34, kind: 'beep' },             // 2³ = 1 × … bấm vào
      { t: this.REM[0], kind: 'tick' },         // rút số 2 đầu tiên
      { t: T.nothing36 + 0.05, kind: 'error' }, // âm bản "= NOTHING"
      { t: T.one36, kind: 'correct' },          // = 1 chốt
    ];
  }
  cam(t) { return this.PAN.reduce((y, a) => y + PAGE * smooth(prog(t, a, a + 0.9)), 0); }
  rowTok(r, kk) {                                // dòng r: 2^(3−r) = 1 × [2|bóng] × … = giá trị
    const n = 3 - r, last = r === 3;
    const tk = [{ c: '2' }, { c: String(n), sup: true }, { c: '=' }, { c: '1', col: C.one }];
    for (let i = 0; i < 3; i++) {
      const gone = i >= n;
      tk.push({ c: '×', col: gone ? `rgba(${C.inkRGB},0.13)` : C.ink },
        gone ? { c: 'X', half: { segs: SEG[2], col: `rgba(${C.inkRGB},${0.15 + 0.6 * (1 - kk)})` } } : { c: '2' });
    }
    tk.push({ c: '=' }, { c: String(this.V.vals[r]), col: last ? C.one : C.ink });
    return tk;
  }
  render(g, t) {
    const T = this.T, cy = this.cam(t);
    ground(g);
    ink(g, d => {
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'ACT II', 'MULTIPLYING ZERO TIMES');
      annunciators(d, t >= T.nothing36 ? ['×', 'ERR'] : ['×']);
      d.save(); d.beginPath(); d.rect(0, 130, W, H); d.clip(); d.translate(0, -cy);   // nội dung cuộn không chạy qua thẻ mục
      if (t < this.PAN[0] + 1.2) this.page0(d, t);
      if (t > this.PAN[0] - 0.3) this.page1(d, t);
      d.restore();
    });
    // nhân vật (toạ độ màn hình): đưa tay mời về phía cột thanh ghi lúc "left with the starting point"
    const kIn = prog(t, T.time35 - 0.2, T.time35 + 0.2), out = smooth(prog(t, T.e36 - 0.2, T.e36 + 0.7));
    if (kIn > 0 && out < 1) figure(g, 'offer', 1640, 1080 + out * 820, 760, kIn, { flip: true });
  }

  // ── trang 0: câu hỏi + hai thanh ghi khởi động ──
  page0(d, t) {
    const T = this.T, V = this.V;
    // câu hỏi (a0 đã treo "= NOTHING?") — gõ từ FROM + 0.3, xong theo lời
    dm(d, 'MULTIPLY ZERO TIMES', X, 160, 7, C.ink, { k: prog(t, this.FROM + 0.3, this.START + 1.0) });
    if (t > T.times30) dm(d, '= NOTHING?', X + dmW('MULTIPLY ZERO TIMES ', 7), 160, 7, C.ink, { k: prog(t, T.times30 + 0.1, T.e30 + 0.2) });
    if (t > T.think - 0.1) dm(d, 'WHERE DOES A CALCULATION START?', X, 262, 5, C.dim, { k: prog(t, T.think - 0.1, T.starts + 0.4) });
    // hai ô thanh ghi: viền đứt chờ sẵn từ đầu, sáng lên theo lời
    const bw = 520, bh = 200, by = 400, xs = [X, X + 640];
    const reg = (x, op, v, col, rgb, kOn, showV, caps) => {
      if (kOn <= 0) {                                         // ô chờ
        for (const yy of [by - 20, by - 20 + bh]) dots(d, x, yy, x + bw, yy, `rgba(${C.inkRGB},0.25)`, { step: 12 });
        return;
      }
      d.fillStyle = `rgba(${rgb},${0.08 * kOn})`; d.fillRect(x, by - 20, bw * kOn, bh);
      d.fillStyle = col; d.fillRect(x, by - 20, bw * kOn, 5); d.fillRect(x, by - 25 + bh, bw * kOn, 5);
      dm(d, op, x + 40, by + 34, 14, C.ink, { ghost: false, k: kOn * 2 - 1 });
      seg7(d, showV ? String(v) : 'X', x + 360, by + 5, 150, col);
      caps.forEach(([s, at, vv], i) => { if (t > at) dm(d, vv === undefined ? s : [[s, C.ink], [String(vv), col]], x, by + bh + 40 + i * 62, 5, C.ink, { k: prog(t, at, at + 0.7) }); });
    };
    reg(xs[0], '+', V.sumE, C.zero, C.zeroRGB, prog(t, T.add - 0.1, T.add + 0.4), t >= T.zero32 - 0.05,
      [['START: ', T.zero32 + 0.1, V.sumE], ['+0 CHANGES NOTHING', T.adding], ['EMPTY SUM = ', T.add2, V.sumE]]);
    reg(xs[1], '×', V.prodE, C.one, C.oneRGB, prog(t, T.mult33 - 0.1, T.mult33 + 0.4), t >= T.one33 - 0.05,
      [['START: ', T.one33 + 0.1, V.prodE], ['×1 CHANGES NOTHING', T.multiplying], ['EMPTY PRODUCT = ?', T.multiplying + 0.75]]);
  }

  // ── trang 1: 2³ = 1 × 2 × 2 × 2, rút từng số 2 → còn 1 lam ──
  page1(d, t) {
    const T = this.T, y0 = PAGE, h = 96, DY = 138, Y0 = y0 + 205;
    let colOne = null;
    for (let r = 0; r < 4; r++) {
      const y = Y0 + r * DY;
      const at = r === 0 ? T.two34 - 0.15 : this.REM[r - 1];
      if (t < at) {                                              // ô chờ: đường chấm dưới dòng
        dots(d, X, y + h + 18, X + 1100, y + h + 18, `rgba(${C.inkRGB},0.2)`, { step: 12 });
        continue;
      }
      const kk = r === 0 ? 1 : prog(t, at, at + 0.5);            // nét "2" bị rút mờ dần
      const k = r === 0 ? prog(t, at, T.two34d + 0.35) : prog(t, at, at + 0.35);
      const B = row(d, this.rowTok(r, kk), X, y, h, { k });
      if (!colOne) colOne = B[3];
    }
    // cột thanh ghi ×: kính nhuộm lam chạy qua cả 4 dòng — cái 1 có sẵn trước mọi phép nhân
    if (colOne && t > T.starting - 0.2) {
      const kc = prog(t, T.starting - 0.2, T.starting + 0.4);
      const bx0 = colOne[0] - 26, bx1 = colOne[1] + 40, by0 = Y0 - 50, by1 = by0 + (3 * DY + h + 26 + 50) * kc;
      d.fillStyle = `rgba(${C.oneRGB},0.085)`; d.fillRect(bx0, by0, bx1 - bx0, by1 - by0);
      d.fillStyle = C.one; d.fillRect(bx0, by0, bx1 - bx0, 4); d.fillRect(bx0, by1 - 4, bx1 - bx0, 4);
      dm(d, 'START', (bx0 + bx1) / 2, by0 + 12, 3, C.one, { align: 'center', ghost: false, k: kc * 2 - 1 });
    }
    // hiểu lầm → âm bản → ý đúng ngay dưới
    const yw = y0 + 800, p = 6, pre = dmW('MULTIPLYING ZERO TIMES ', p);
    if (t > T.m36 - 0.1) {
      dm(d, 'MULTIPLYING ZERO TIMES', X, yw, p, C.ink, { k: prog(t, T.m36 - 0.1, T.isnt - 0.15) });
      if (t > T.isnt - 0.15) dm(d, '= NOTHING', X + pre, yw, p, C.ink, { k: prog(t, T.isnt - 0.15, T.nothing36) });
      wrong(d, X + pre, yw, X + pre + dmW('= NOTHING', p), yw + 7 * p, prog(t, T.nothing36, T.nothing36 + 0.35));
    }
    if (t > T.not36 - 0.1) {
      const xr = X + dmW('MULTIPLYING ', p);                     // ngay dưới, lùi trái để không chạm nhân vật
      dm(d, '= NOT STARTED YET', xr, yw + 96, p, C.ink, { k: prog(t, T.not36 - 0.1, T.yet + 0.3) });
      if (t > T.is36 - 0.05) dm(d, [['= ', C.ink], ['1', C.one]], xr + dmW('= NOT STARTED YET ', p), yw + 96, p, C.ink,
        { k: prog(t, T.is36 - 0.05, T.one36 + 0.02) });
    }
  }
}
