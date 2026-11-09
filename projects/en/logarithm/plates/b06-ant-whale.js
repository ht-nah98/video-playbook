// b06 · An ant and a whale (câu 22–27) — DNA blocks. Ba khung nối bằng khối gỗ trượt:
//  1 (câu 22–23) hai ô ảnh nét đứt chờ sẵn; "compare … sizes" → khối ảnh kiến (nhỏ) và cá voi (lớn) trượt vào; nhãn bắt buộc bật
//       ở "ant" / "blue" và sống tới khi ảnh rời đi.
//  2 (câu 24)    ảnh trượt ra; THƯỚC THƯỜNG (khối bạch dương, vạch đều) rơi xuống: kiến thu nhỏ ở đầu trái, cá voi ở đầu phải;
//       "vanishes" → kiến co lại thành chấm rồi biến mất cùng thẻ 3 mg.
//  3 (câu 25–27) ván thước ×10 như a0 S3b (logBoard + thú gỗ + ngoặc tím + ≈ 11 STEPS OF ×10): tháp 1…11 dựng ở "steps",
//       "eleven" → sticker 11 to; "a hundred billion" → thẻ 100,000,000,000, "shrink" → thẻ co lại về số 11; "hold" → khối tím 11 rơi.
// Mascot pointer ~7 s quanh câu 25–26.
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, block, sticker, tag, text, rr, line, logBoard, brace, animal,
  photoBlock, photoImages, figure, slideSwap, secTag, ANT_MG, WHALE_T, STEPS, BOARD, BASE_Y } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const ANT = { x: 250, y: 330, w: 400, h: 330 }, WHALE = { x: 860, y: 130, w: 760, h: 540 };
const RULER = { cx: 1000, base: 860, w: 1300, h: 56, d: 22 };

export default class AntWhale {
  static ERA = 'table';
  static IMAGES = photoImages('ant', 'bluewhale');
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b06');
    this.START = L(22).start;
    this.FROM = Math.max(this.START - 1.2, L(21).end + 0.5);
    this.T = {
      compare: w(22, 'compare'), diff: w(22, 'different'),
      ant: w(23, 'ant'), blue: w(23, 'blue'),
      draw: w(24, 'draw'), ruler: w(24, 'ruler'), van: w(24, 'vanishes'),
      count: w(25, 'count'), gap: w(25, 'gap'), between: w(25, 'between'), about: w(25, 'about'), eleven: w(25, 'eleven'), steps: w(25, 'steps', 2),
      el2: w(26, 'eleven'), hundred: w(26, 'hundred'), shrink: w(27, 'shrink'), enormous: w(27, 'enormous'), tiny: w(27, 'tiny'), hold: w(27, 'hold'),
      end: L(27).end,
    };
    const T = this.T;
    this.SW = T.count - 0.17;                                            // khối trượt: thước thường → ván thước ×10
    this.MIDDLE = [T.gap + 0.15, T.gap + 0.4];                           // chuột, voi bật giữa kiến và cá voi
    this.PTR = [T.count + 0.3, T.count + 0.3 + 7.2];
    this.BIG = must('(1e11).toLocaleString("en-US")', '100,000,000,000');
    must('Math.log10(1e11)', 11); must(`Math.round(${STEPS})`, 11);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.compare, 'page'), c(T.diff, 'page'), c(T.ant, 'pop'), c(T.blue, 'pop'),
      c(T.ruler, 'wood'), c(T.van, 'pop'), c(this.SW, 'whoosh'), c(T.count + 0.5, 'tick'), c(T.count + 1.2, 'tick'),
      c(T.gap, 'pop'), c(T.between + 0.15, 'pop'), c(T.eleven, 'pen'), c(T.el2, 'pop'), c(T.hundred, 'card'), c(T.shrink, 'tick'), c(T.hold + 0.25, 'wood'),
    ];
  }

  stage1(g, t) {
    const T = this.T;
    ground(g, 'table');
    const ka = prog(t, T.compare, T.compare + 0.7), kw = prog(t, T.diff, T.diff + 0.7);
    const out = prog(t, T.draw, T.draw + 0.6);
    // ô ảnh chờ: hiện ngay khi vào cảnh, nhường chỗ khi khối ảnh tới
    for (const [B, k0] of [[ANT, ka], [WHALE, kw]]) {
      const kg = prog(t, this.FROM + 0.3, this.FROM + 0.7); if (kg <= 0 || k0 > 0) continue;
      g.save(); g.globalAlpha = kg; g.setLineDash([14, 12]); g.strokeStyle = 'rgba(34,48,60,0.45)'; g.lineWidth = 4; g.stroke(rr(B.x, B.y, B.w, B.h, 10)); g.restore();
    }
    photoBlock(g, 'ant', ANT.x, ANT.y, ANT.w, ANT.h, { k: clamp(ka - out), rot: -0.025, zoom: 1 + 0.04 * prog(t, T.compare, T.compare + 6), focus: [0.5, 0.5],
      label: 'ANT · A FEW MILLIGRAMS', labelK: Math.min(0.999, prog(t, T.ant, T.ant + 0.3)) });
    photoBlock(g, 'bluewhale', WHALE.x, WHALE.y, WHALE.w, WHALE.h, { k: clamp(kw - out), rot: 0.015, zoom: 1 + 0.04 * prog(t, T.diff, T.diff + 6),
      label: 'BLUE WHALE · OVER 100 TONNES', labelK: Math.min(0.999, prog(t, T.blue, T.blue + 0.3)) });
  }
  stage2(g, t) {
    const T = this.T, R = RULER;
    ground(g, 'table');
    const kr = prog(t, T.draw + 0.7, T.draw + 1.2);
    if (kr <= 0) return;
    block(g, R.cx, R.base, 0, { w: R.w, h: R.h, d: R.d, color: C.birch, k: kr, from: 500, v: 2 });
    if (kr >= 1) for (let i = 0; i <= 36; i++) { const x = R.cx - R.w / 2 + 14 + i * 35; line(g, x, R.base - R.h + 4, x, R.base - R.h + (i % 5 ? 14 : 26), C.ink, i % 5 ? 2 : 3, 'butt'); }
    const top = R.base - R.h - 8, ax = R.cx - R.w / 2 + 40, wx = R.cx + R.w / 2 - 210;
    const kp = prog(t, T.ruler, T.ruler + 0.3), kv = prog(t, T.van, T.van + 0.45);
    animal(g, 'whale', wx, top, 0.5, { k: kp });
    animal(g, 'ant', ax, top, 1.8 * (1 - outCubic(kv)), { k: kp });
    tag(g, `${WHALE_T} t`, wx - 30, top - 230, { size: 34, k: kp, string: [wx, top - 110] });
    tag(g, `${ANT_MG} mg`, ax + 60, top - 120, { size: 34, k: kp * (1 - kv), string: [ax + 10, top - 40] });
  }
  stage3(g, t) {
    const T = this.T, sw = this.SW;
    ground(g, 'table');
    const { X, Y, PT } = logBoard(g, { towers: 11 * prog(t, sw + 0.5, T.between - 0.1) });
    const ax = X(0) + Math.log10(ANT_MG) * BOARD.step;
    animal(g, 'ant', ax, PT - 10, 1 * nudge(t, T.tiny), { k: prog(t, T.gap - 0.1, T.gap + 0.2) });
    animal(g, 'mouse', X(4) + 4, Y(4) - 10, 0.95, { k: prog(t, this.MIDDLE[0], this.MIDDLE[0] + 0.3) });
    animal(g, 'elephant', X(9) - 24, Y(9) - 10, 0.72, { k: prog(t, this.MIDDLE[1], this.MIDDLE[1] + 0.3) });
    animal(g, 'whale', X(11) - 34, Y(11) - 12, 0.58 * nudge(t, T.enormous), { k: prog(t, T.between, T.between + 0.25) });
    tag(g, `${ANT_MG} mg`, ax + 20, PT - 120, { size: 34, k: prog(t, T.gap, T.gap + 0.3), string: [ax + 40, PT - 30] });
    tag(g, `${WHALE_T} t`, X(11) - 300, Y(11) - 150, { size: 34, k: prog(t, T.between, T.between + 0.3), string: [X(11) - 150, Y(11) - 80] });
    const kb = prog(t, T.eleven, T.eleven + 0.5);
    brace(g, 300, Y(11), PT, kb);
    if (kb > 0) { g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = 'rgba(81,50,176,0.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(X(11) - BOARD.bw / 2 - 8, Y(11)); g.lineTo(lerp(X(11) - BOARD.bw / 2 - 8, 320, outCubic(kb)), Y(11)); g.stroke(); g.restore(); }
    text(g, `≈ ${Math.round(STEPS)} STEPS`, 340, 236, { font: `900 64px ${AR}`, color: C.logInk, k: prog(t, T.about, T.about + 0.5) });
    text(g, 'OF ×10', 340, 300, { font: `900 64px ${AR}`, color: C.baseInk, k: prog(t, T.steps, T.steps + 0.35) });
    // câu 26: sticker 11 to, thẻ "a hundred billion"; câu 27: thẻ co về 11
    sticker(g, '11', 860, 262, { r: 62, k: prog(t, T.el2, T.el2 + 0.35) });
    const kt = prog(t, T.hundred, T.hundred + 0.3), ks = prog(t, T.shrink, T.shrink + 0.7);
    if (kt > 0 && ks < 1) {
      const e = outCubic(ks), sc = 1 - e, cx = lerp(1230, 860, e);
      g.save(); g.translate(cx, 262); g.scale(sc, sc); g.translate(-cx, -262); tag(g, this.BIG, cx, 262, { size: 44, k: kt }); g.restore();
    }
    block(g, 1000, 1050, 84, { color: C.log, label: '11', k: prog(t, T.hold, T.hold + 0.5), from: 500, v: 1 });
  }

  render(g, t) {
    const T = this.T, sw = this.SW, k = prog(t, sw, sw + 0.9);
    if (t < sw) { if (t < T.draw + 0.65) this.stage1(g, t); else this.stage2(g, t); }
    else if (k < 1) slideSwap(g, k, () => this.stage2(g, t), () => this.stage3(g, t));
    else this.stage3(g, t);
    // chuyển 1 → 2: ảnh trượt ra trước khi thước rơi nên không cần khối trượt
    secTag(g, 'An ant and a whale', { k: prog(t, this.FROM + 0.35, this.FROM + 0.75), t });
    const kf = clamp(prog(t, this.PTR[0], this.PTR[0] + 0.45) - prog(t, this.PTR[1] - 0.4, this.PTR[1]));
    figure(g, 'pointer', 150, H, 262, kf, { t });
  }
}
