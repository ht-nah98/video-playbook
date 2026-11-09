// ACT FOUR · BASE RATES — "Count real people" (p2 câu 80–86). Không mascot. Dựng từ khung 1 của tools/lab/lantern.html
// (đã duyệt): 5,000 chấm (1 chấm = 20 người); báo động nhầm sáng hổ phách, người bệnh thật vàng có vòng; "≈ 2%" trong quầng.
// Lộ dần đúng chữ: 100,000 người → 100 bệnh (bắt 99) → 99,900 khoẻ → 4,995 sáng nhầm → 5,094 cầm kết quả dương →
// chỉ 99 bệnh thật → 99 / 5,094 ≈ 2% (impact — một trong hai impact cả video) → câu 86: "kết quả trong tay bạn" là một
// chấm hổ phách, mũi tên về ≈ 2%.
// Làm tròn: 99 và 4,995 người ở 20 người/chấm là ≈ 5 và ≈ 250 chấm → chú thích chấm ghi "≈".
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, mk, C, CG, MONO, sky, glow, typed, text, label, ring, arrow,
  fmt, must, card, lookup } from '../kit.js';

const COLS = 100, X0 = 110, Y0 = 300, DX = 11, DY = 13;          // lưới 100 × 50: x 110–1199, y 300–937 (chừa biển tên mục)
const X = 1300, R = 1824;                                          // cột số bên phải

export default class Count {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      count: w(80, 'count'),
      hk: w(81, 'one'), people: w(81, 'people'), test: w(81, 'test'),
      sick: w(82, 'one'), disease: w(82, 'disease'), catches: w(82, 'catches'), n99: w(82, 'ninety-nine'),
      healthyN: w(83, 'ninety-nine'), healthy: w(83, 'healthy'), five: w(83, 'five'), rate: w(83, 'rate'),
      four: w(83, 'four'), n995: w(83, 'ninety-five'), positive: w(83, 'positive'),
      total: w(84, 'total'), five2: w(84, 'five'), n094: w(84, 'ninety-four'), holding: w(84, 'holding'), only: w(84, 'only'), sick2: w(84, 'sick'),
      r99: w(85, 'ninety-nine'), r5094: w(85, 'ninety-four'), two: w(85, 'two'),
      even: w(86, 'even'), pos86: w(86, 'positive'), hand: w(86, 'hand'), chance86: w(86, 'chance'), really86: w(86, 'really'), ill: w(86, 'ill'), two2: w(86, 'two'), end: L(86).end,
    };
    this.START = L(80).start;
    this.FROM = this.START - 1.2;
    // ── chuỗi số (CONTENT: 99 / 5094 ≈ 2%; 4 995 = 5% × 99 900) ──
    const N = this.N = {
      n: must('100000', 100000), per: 20, sick: must('100000 / 1000', 100), caught: must('100 * 99 / 100', 99),
      healthy: must('100000 - 100', 99900), rate: must('5', 5), fp: must('99900 * 5 / 100', 4995), lit: must('99 + 4995', 5094),
      pct: must('Math.round(1000 * 99 / 5094) / 10', 1.9), round: must('Math.round(100 * 99 / 5094)', 2),
      dots: must('100000 / 20', 5000), goldDots: must('Math.round(99 / 20)', 5), amberDots: must('Math.round(4995 / 20)', 250),
    };
    if (N.n / N.per !== N.dots || N.healthy * 5 / 100 !== N.fp || N.caught + N.fp !== N.lit) throw new Error('f2: sai chuỗi số');
    this.P = Array.from({ length: N.dots }, (_, i) => [X0 + (i % COLS) * DX + (hash(i * 1.7) - 0.5) * 5, Y0 + ((i / COLS) | 0) * DY + (hash(i * 2.9) - 0.5) * 5]);
    const order = this.P.map((_, i) => i).sort((a, b) => hash(a * 0.913 + 5) - hash(b * 0.913 + 5));
    this.GOLD = order.slice(0, N.goldDots);
    this.AMB = order.slice(N.goldDots, N.goldDots + N.amberDots);
    this.ISGOLD = new Set(this.GOLD); this.ISAMB = new Set(this.AMB);
    // thứ tự sáng của 250 chấm nhầm: quét từ trái sang (có nhiễu) để thấy "lan"
    this.AMBT = new Map(this.AMB.map(i => [i, clamp(this.P[i][0] - X0) / (COLS * DX) * 0.75 + hash(i * 4.1) * 0.25]));
    // "kết quả trong tay bạn": chấm hổ phách gần góc phải dưới của lưới (mũi tên tới ≈ 2% ngắn)
    this.YOU = this.AMB.reduce((b, i) => (this.P[i][0] + this.P[i][1] > this.P[b][0] + this.P[b][1] ? i : b), this.AMB[0]);
    this.BASE = null;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.hk, kind: 'tick' }, { t: T.sick + 0.15, kind: 'pop' }, { t: T.n99, kind: 'pop' }, { t: T.four, kind: 'tick' },
      { t: T.five2, kind: 'tick' }, { t: T.only, kind: 'pop' }, { t: T.two, kind: 'impact' }, { t: T.hand, kind: 'pop' }];
  }
  base(a) {                                                        // lớp chấm mờ vẽ sẵn (5,000 chấm, trừ chấm sẽ sáng)
    return (this.BASE ??= (() => { const c = mk(), x = c.getContext('2d'); x.fillStyle = 'rgba(142,162,184,1)';
      this.P.forEach(([px, py], i) => { if (!this.ISGOLD.has(i) && !this.ISAMB.has(i)) { x.beginPath(); x.arc(px, py, 2.1, 0, 7); x.fill(); } }); return c; })());
  }
  render(g, t) {
    const T = this.T, N = this.N;
    sky(g, t, { fog: 1 });

    // ── 5,000 chấm hiện theo cột ("count real people" → "taking the test") ──
    const sweep = smooth(prog(t, T.count - 0.3, T.test + 0.2));
    const dimA = 0.30 - 0.13 * smooth(prog(t, T.holding - 0.3, T.holding + 0.8));       // cầm kết quả dương: phần âm tính lùi vào đêm
    const edge = X0 - 10 + (COLS * DX + 20) * sweep;
    if (sweep > 0) {
      g.save(); g.beginPath(); g.rect(0, 0, edge, H); g.clip(); g.globalAlpha = dimA; g.drawImage(this.base(), 0, 0); g.restore();
      // chấm sẽ sáng: trước khi sáng vẫn là chấm mờ như mọi người
      g.save(); g.fillStyle = `rgba(142,162,184,${dimA})`;
      for (const i of this.AMB.concat(this.GOLD)) { const [x, y] = this.P[i]; if (x < edge && !this.isLit(i, t)) { g.beginPath(); g.arc(x, y, 2.1, 0, 7); g.fill(); } }
      g.restore();
    }
    // 4,995 báo động nhầm sáng hổ phách (câu 83 "about four thousand…")
    const ambK = i => prog(t, T.four - 0.1 + this.AMBT.get(i) * (T.positive - T.four), T.four + this.AMBT.get(i) * (T.positive - T.four) + 0.25);
    // câu 86 "really ill": báo động nhầm lùi vào đêm (trừ chấm của BẠN) — chỉ còn vàng và câu hỏi của bạn sáng
    const fade = 1 - 0.55 * smooth(prog(t, T.really86 - 0.2, T.really86 + 0.6));
    g.save(); g.globalAlpha = fade;
    for (const i of this.AMB) { const k = ambK(i); if (k > 0 && i !== this.YOU) { const [x, y] = this.P[i]; glow(g, x, y, 16 * k, 'rgba(244,184,96,0.55)'); } }
    g.fillStyle = C.amber;
    for (const i of this.AMB) { const k = ambK(i); if (k > 0 && i !== this.YOU) { const [x, y] = this.P[i]; g.beginPath(); g.arc(x, y, 1.6 + 1.7 * outBack(k), 0, 7); g.fill(); } }
    g.restore();
    { const k = ambK(this.YOU); if (k > 0) { const [x, y] = this.P[this.YOU]; glow(g, x, y, 16 * k, 'rgba(244,184,96,0.55)'); g.fillStyle = C.amber; g.beginPath(); g.arc(x, y, 1.6 + 1.7 * outBack(k), 0, 7); g.fill(); } }
    // 100 người bệnh (≈ 5 chấm) sáng ở "one hundred"; vòng vàng ở "catches ninety-nine"; câu 84 "only 99" bừng thêm
    const kS = outBack(prog(t, T.sick - 0.1, T.sick + 0.4)), kR = prog(t, T.n99 - 0.1, T.n99 + 0.5);
    const boost = 1 + 0.5 * outCubic(prog(t, T.only - 0.1, T.only + 0.6));
    if (kS > 0) for (const i of this.GOLD) { const [x, y] = this.P[i];
      glow(g, x, y, 46 * kS * boost, 'rgba(255,216,102,0.85)'); g.fillStyle = '#FFF4C8'; g.beginPath(); g.arc(x, y, 5.5 * kS, 0, 7); g.fill();
      if (kR > 0) ring(g, x, y, 14 * boost, 14 * boost, kR, { color: C.gold, w: 2.5, seed: i }); }

    // ── nhãn lưới + chú thích (≈ vì làm tròn 20 người/chấm) ──
    typed(g, `${fmt(N.n)} PEOPLE TAKE THE TEST`, 110, 262, prog(t, T.hk - 0.1, T.people + 0.4), `500 22px ${MONO}`, C.ivory);
    typed(g, `1 DOT = ${N.per} PEOPLE`, 1199, 262, prog(t, T.people, T.test), `500 22px ${MONO}`, C.fog, { align: 'right' });
    const ly = 1000, dot = (x, c, r) => { g.fillStyle = c; g.beginPath(); g.arc(x, ly - 8, r, 0, 7); g.fill(); };
    if (t > T.test) { dot(118, 'rgba(142,162,184,0.6)', 4); typed(g, 'NEGATIVE', 134, ly, prog(t, T.test, T.test + 0.5), `500 20px ${MONO}`, C.fog); }
    if (t > T.n99) { glow(g, 330, ly - 8, 28, 'rgba(255,216,102,0.8)'); dot(330, '#FFF4C8', 5.5);
      typed(g, `TRULY SICK · ≈ ${N.goldDots} DOTS`, 348, ly, prog(t, T.n99, T.n99 + 0.7), `500 20px ${MONO}`, C.gold); }
    if (t > T.four) { glow(g, 760, ly - 8, 16, 'rgba(244,184,96,0.55)'); dot(760, C.amber, 4.5);
      typed(g, `FALSE ALARM · ≈ ${N.amberDots} DOTS`, 776, ly, prog(t, T.four, T.four + 0.8), `500 20px ${MONO}`, C.amber); }

    // ── cột số bên phải ──
    const kRule = prog(t, T.sick - 0.4, T.sick + 0.4);
    if (kRule > 0) { g.save(); g.fillStyle = 'rgba(142,162,184,0.35)'; g.fillRect(X - 40, 240, 2, 760 * outCubic(kRule)); g.restore(); }
    typed(g, `SICK · 1 IN ${fmt(1000)}`, X, 262, prog(t, T.sick, T.disease), `500 22px ${MONO}`, C.fog);
    typed(g, fmt(N.sick), X, 334, prog(t, T.sick, T.sick + 0.4), `600 72px ${CG}`, C.ivory);
    typed(g, `test catches ${fmt(N.caught)}`, R, 334, prog(t, T.catches, T.n99 + 0.5), `italic 600 44px ${CG}`, C.gold, { align: 'right' });
    typed(g, `HEALTHY · ${N.rate}% FALSE ALARM`, X, 404, prog(t, T.healthy, T.rate), `500 22px ${MONO}`, C.fog);
    typed(g, fmt(N.healthy), X, 476, prog(t, T.healthyN, T.healthy), `600 72px ${CG}`, C.ivory);
    typed(g, `${fmt(N.fp)} lit by mistake`, R, 476, prog(t, T.four, T.n995 + 0.4), `italic 600 44px ${CG}`, C.amber, { align: 'right' });
    const kL = prog(t, T.total - 0.2, T.total + 0.5);
    if (kL > 0) { g.save(); g.fillStyle = 'rgba(142,162,184,0.35)'; g.fillRect(X, 512, (R - X) * outCubic(kL), 2); g.restore(); }
    typed(g, 'HOLDING A POSITIVE RESULT', X, 566, prog(t, T.total, T.holding + 0.4), `500 22px ${MONO}`, C.fog);
    typed(g, `${fmt(N.caught)} + ${fmt(N.fp)} = ${fmt(N.lit)}`, X, 636, prog(t, T.five2 - 0.2, T.n094 + 0.4), `600 60px ${CG}`, C.ivory);
    typed(g, 'TRULY SICK, AMONG THE LIT', X, 706, prog(t, T.only, T.sick2 + 0.3), `500 22px ${MONO}`, C.gold);
    typed(g, `${fmt(N.caught)} / ${fmt(N.lit)} ≈ ${N.pct}%`, X, 776, prog(t, T.r99, T.r5094 + 0.5), `600 60px ${CG}`, C.ivory);
    // ≈ 2% (cỡ 300 nạp sẵn, thu 0.77 — khối như bàn thử 230 px) trong quầng đèn người xem
    const k2 = outBack(prog(t, T.two - 0.1, T.two + 0.45));
    if (k2 > 0) {
      const pulse = 1 + 0.25 * Math.sin(clamp(prog(t, T.two2 - 0.1, T.two2 + 0.7)) * Math.PI);
      glow(g, 1560, 880, 280 * pulse, 'rgba(255,216,102,0.18)', clamp(k2));
      g.save(); g.translate(X, 960); g.scale(0.77 * k2, 0.77 * k2); text(g, `≈ ${N.round}%`, 0, 0, `600 300px ${CG}`, C.gold); g.restore();
    }

    // ── câu 86: kết quả dương trong tay BẠN là một chấm hổ phách — đi về ≈ 2% ──
    // "positive result" → vòng quanh một chấm; "in your hand" → YOUR RESULT; "the chance" → mũi tên về ≈ 2%
    const kY = prog(t, T.pos86 - 0.1, T.pos86 + 0.5);
    if (kY > 0) {
      const [x, y] = this.P[this.YOU];
      glow(g, x, y, 60 * kY, 'rgba(237,230,214,0.35)');
      ring(g, x, y, 22, 22, kY, { color: C.ivory, w: 3, seed: 21 });
      typed(g, 'YOUR RESULT', x - 30, y - 26, prog(t, T.hand - 0.2, T.hand + 0.4), `500 22px ${MONO}`, C.ivory, { align: 'right' });
      arrow(g, x + 28, y + 6, X - 16, 900, prog(t, T.chance86 - 0.1, T.chance86 + 0.6), { color: 'rgba(237,230,214,0.8)', w: 3, bend: 30 });
    }

    card(g, 'night', prog(t, this.FROM + 0.3, this.FROM + 1.5), 'ACT FOUR · BASE RATES', 'Count real people');
  }
  isLit(i, t) {
    const T = this.T;
    if (this.ISGOLD.has(i)) return t >= T.sick - 0.1;
    return t >= T.four - 0.1 + this.AMBT.get(i) * (T.positive - T.four);
  }
}
