// f1 · Putting it together (mở hồi V, câu 104–106) — ba ô khay 1–3 của mở bài (a0 vùng 2: số 1 vàng, 2 đỏ, 3 vàng,
// khung viền đứt); mỗi ô sáng ĐÚNG câu của nó và vẽ lại thu nhỏ hình của hồi đó:
//   1 viên đỏ bị đẩy ra mép thảm "nothing can be less than nothing" · 2 nhãn "A WAY TO REMEMBER · NOT A PROOF"
//   3 chữ nhật (−3) × (−2) lòng VÀNG = 6.
import { C, ARC, CG, clamp, prog, outCubic, ground, drift, card, actTitle, typed, label, quote, eq, tile, mulRect, line,
  arrow, arrowHead, PI, num, par, lookup, must } from '../kit.js';

const X0 = 140, TW = 1640, TH = 200, TY = [222, 452, 682];   // ba ô khay

export default class Together {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      refused: w(104, 'refused'), thousand: w(104, 'thousand'), years: w(104, 'years'), lengths: w(104, 'lengths'),
      amounts: w(104, 'amounts'), nothing: w(104, 'nothing'), nothing2: w(104, 'nothing', 2), e104: L(104).end,
      debts: w(105, 'debts'), patterns: w(105, 'patterns'), turning: w(105, 'turning'), around: w(105, 'around'),
      good: w(105, 'good'), remember: w(105, 'remember'), but: w(105, 'but'), prove: w(105, 'prove'), e105: L(105).end,
      not: w(106, 'not'), picked: w(106, 'picked'), keep: w(106, 'keep'), rules: w(106, 'rules'),
      neg: w(106, 'negative'), neg2: w(106, 'negative', 2), positive: w(106, 'positive'), e106: L(106).end,
    };
    this.S = [L(104).start, L(105).start, L(106).start];
    this.START = L(104).start; this.FROM = Math.max(this.START - 2.6, L(103).end + 0.5);   // e3 giữ kết luận
    this.V = { nn: must('(−3) × (−2)', 6), rows: must('3', 3), cols: must('2', 2) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: this.START - 0.45, kind: 'pop' },          // zero pair dưới thẻ hồi biến mất
      { t: T.thousand, kind: 'chip' },                 // viên đỏ rơi vào ô 1
      { t: this.S[1] - 0.2, kind: 'tick' },            // ô 2 sáng
      { t: T.remember, kind: 'snap' },                 // nhãn NOT A PROOF
      { t: this.S[2] - 0.2, kind: 'tick' },            // ô 3 sáng
      { t: T.positive, kind: 'correct' },              // lòng vàng = 6
    ];
  }
  render(g, t) {
    const cam = drift(t, this.START, { vx: 1.5, vy: 0.8, max: 30 });
    ground(g, 'mat', cam.x, cam.y);
    g.save(); g.translate(-cam.x, -cam.y);
    for (let i = 0; i < 3; i++) this.tray(g, t, i);
    this.one(g, t, TY[0]); this.two(g, t, TY[1]); this.three(g, t, TY[2]);
    g.restore();
    actTitle(g, t, this.START, 'V', 'Putting it together', 'summary');
    card(g, prog(t, this.START + 0.3, this.START + 1.7), 'ACT V', 'PUTTING IT TOGETHER');
  }
  tray(g, t, i) {                                      // khung ô: viền đứt mờ; ô của câu đang đọc viền ngà liền
    const at = i ? this.S[i] - 0.3 : this.START + 0.25, k = prog(t, at, at + 0.4), y = TY[i];
    if (k <= 0) return;
    const on = t < (this.S[i + 1] ?? Infinity) - 0.3;
    g.save(); g.globalAlpha = clamp(k * 2);
    if (on) { g.fillStyle = 'rgba(14,21,30,0.4)'; g.beginPath(); g.roundRect(X0, y, TW, TH, 14); g.fill(); }
    g.strokeStyle = on ? C.ink : C.dim; g.lineWidth = on ? 3 : 2; g.setLineDash(on ? [] : [10, 8]);
    g.beginPath(); g.roundRect(X0, y, TW, TH, 14); g.stroke(); g.restore();
    typed(g, String(i + 1), 200, y + 132, prog(t, at, at + 0.2), `800 96px ${ARC}`, C.posT, { align: 'center' });
  }
  one(g, t, y) {                                       // hồi I: viên đỏ bị đẩy ra mép thảm
    const T = this.T;
    quote(g, 'Refused for more than a thousand years —', 290, y + 84, prog(t, T.refused - 0.1, T.years + 0.3), { size: 44 });
    quote(g, 'nothing can be less than nothing.', 290, y + 146, prog(t, T.nothing - 0.15, T.nothing2 + 0.4), { size: 44 });
    label(g, 'lengths · amounts', 1300, y + 136, prog(t, T.lengths - 0.1, T.amounts + 0.4), { size: 18 });
    // thước độ dài in thảm: 0 ở trái, chỉ có chiều dương
    const kr = prog(t, T.lengths, T.amounts + 0.3);
    line(g, [[1300, y + 160], [1680, y + 160]], C.dim, 2, { k: kr });
    for (let j = 0; j <= 4; j++) if (kr * 4 >= j) line(g, [[1300 + j * 95, y + 151], [1300 + j * 95, y + 169]], C.dim, 2);
    if (kr > 0.2) typed(g, '0', 1300, y + 192, kr * 2, `600 22px ${ARC}`, C.ink, { align: 'center' });
    // viên đỏ rơi vào ô, rồi bị đẩy tới mép ô và nghiêng rơi ra (cắt theo khung ô)
    const s = 70, kp = outCubic(prog(t, T.nothing, T.nothing2 + 0.3)), tip = prog(t, T.nothing2 - 0.25, T.nothing2 + 0.45);
    const tx = 1460 + kp * 240 + tip * 40, ty = y + 42 + tip * 50;
    g.save(); g.beginPath(); g.roundRect(X0, y, TW, TH, 14); g.clip();
    tile(g, tx, ty, s, 'n', { k: prog(t, T.thousand, T.thousand + 0.35), rot: tip * 0.7 });
    g.restore();
    if (kp > 0) arrow(g, tx - 120, ty + 35, tx - 22, ty + 35, clamp(kp * 3), { color: C.ink, w: 3 });
  }
  two(g, t, y) {                                       // hồi II: ba cách nhớ, nhãn NOT A PROOF (ngà — không gạch, §58)
    const T = this.T;
    quote(g, 'Debts, patterns, turning around —', 290, y + 84, prog(t, T.debts - 0.2, T.around + 0.3), { size: 44 });
    quote(g, 'good ways to remember. They don’t prove it.', 290, y + 146, prog(t, T.good - 0.1, T.prove + 0.3), { size: 44 });
    // ba hình nhỏ: nợ (3 viên đỏ) · dãy (chữ nhật co dần) · quay đầu (nửa vòng)
    const kd = prog(t, T.debts - 0.1, T.debts + 0.4), kq = prog(t, T.patterns - 0.1, T.patterns + 0.5), kt = prog(t, T.turning - 0.1, T.around + 0.4);
    for (let j = 0; j < 3; j++) tile(g, 1330 + j * 34, y + 30, 28, 'n', { k: clamp(kd * 3 - j) });
    for (let j = 0; j < 3; j++) if (kq * 3 > j) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(1480 + j * 30, y + 30 + j * 8, 22, 46 - j * 16); g.restore();
    }
    if (kt > 0) {
      const cx = 1640, cy = y + 66, r = 34, a = Math.PI * kt;
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, 0, -a, true); g.stroke(); g.restore();
      if (kt >= 1) arrowHead(g, cx - r, cy - 2, PI / 2, C.ink, 12);
      line(g, [[cx - r - 12, cy], [cx + r + 12, cy]], C.dim, 2);
    }
    // nhãn: A WAY TO REMEMBER · NOT A PROOF (khung ngà)
    const kl = prog(t, T.remember - 0.15, T.remember + 0.25);
    if (kl > 0) {
      const sc = 1 + (1 - outCubic(kl)) * 0.4;
      g.save(); g.translate(1520, y + 150); g.rotate(-0.03); g.scale(sc, sc);
      g.strokeStyle = C.ink; g.lineWidth = 2.5; g.globalAlpha = clamp(kl * 2); g.strokeRect(-200, -34, 400, 64); g.restore();
      g.save(); g.translate(1520, y + 150); g.rotate(-0.03);
      label(g, 'a way to remember', 0, -8, prog(t, T.remember - 0.1, T.remember + 0.4), { color: C.ink, size: 18, align: 'center' });
      label(g, 'not a proof', 0, 20, prog(t, T.prove - 0.3, T.prove + 0.2), { color: C.ink, size: 18, align: 'center' });
      g.restore();
    }
  }
  three(g, t, y) {                                     // hồi III–IV: giữ luật cũ → chữ nhật (−3) × (−2) lòng vàng = 6
    const T = this.T, V = this.V;
    quote(g, 'Not a convention someone picked —', 290, y + 84, prog(t, T.not - 0.1, T.picked + 0.3), { size: 44 });
    quote(g, 'keep the old rules, and the answer is forced.', 290, y + 146, prog(t, T.keep - 0.15, T.rules + 1.4), { size: 44 });
    mulRect(g, 1330, y + 16, 26, V.rows, V.cols, 'n', 'n', 'p', prog(t, T.neg - 0.15, T.positive + 0.1));
    eq(g, [[par(-3), C.negT], [' × '], [par(-2), C.negT]], 1500, y + 82, 32, prog(t, T.neg - 0.1, T.neg2 + 0.3));
    eq(g, [['= '], [num(V.nn), C.posT]], 1500, y + 150, 56, prog(t, T.positive - 0.05, T.positive + 0.25));
  }
}
