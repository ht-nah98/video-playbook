// d3 · 近道はない (p2 câu 92–102). DNA d3: 「一言で？」→「ない」; Niven 1947「1ページ・微分積分」; 円積問題: hình tròn ↔ hình
// vuông thép cùng diện tích, thước + compa, hình vuông không khép → 「不可能」 (1882).
//  92 vành 360 (mờ) có sẵn từ FROM, chữ số π chạy chậm quanh vành; compa đồng thau vẽ đường tròn chỉ vàng · 「一言で言える理由？」
//  93 「ない」 khắc đồng — compa nhấc lên, đặt chỗ khác, 「？」 thép; 「証明はある。でも一筋縄ではいかない」
//  94 1947年 ニーベン · tờ giấy một trang (~300 px) trượt vào giữa vòng, ∫ d/dx khắc mờ · 「1ページの証明」
//  95 「ただし 微分積分が必要」 — ∫ d/dx đậm lên;   96 tờ giấy rơi ra; vành xoay một nấc nặng 「この事実の重み」
//  97 「古代ギリシャの問い」 — thước thẳng trượt vào, compa về đỉnh đường tròn
//  98 thước thẳng KHÔNG vạch (定規 của phép dựng), compa vạch lại vòng; đường tròn tô đồng rất nhạt (面積);
//     MỘT hình vuông THÉP cạnh r√π (tính trong code), nhãn 「一辺 ＝ r√π ？」; 「作図できるか？」→「円積問題」
//  99 thước + compa thử đo cạnh đáy nhiều lần (không lần nào trúng), cạnh nhấp nháy thép · 2000年以上の挑戦 · 決着 1882
// 100 判子 son 「不可能」 giữa hình (đáp án đã chứng minh)
// 101 hình vuông, thước, compa rời khung; vành 360 vạch mọc quanh đường tròn (vật xuyên suốt, hồi 3) · 「欠点ではない」
// 102 chữ số π khắc chạy quanh vành theo xoắn ốc ra ngoài · 「最も古い問題の一つに「不可能」という答え」
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, hash, sk, typeCues,
  ground, ring360, circleLine, pivot, engrave, telop, heading, stamp, PI_DIGITS } from '../kit.js';

const FX = 1250, FY = 590, FR = 220;                   // đường tròn của bài toán
const LEG = 200;                                        // chân compa
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const lerp = (a, b, e) => a.map((v, i) => v + (b[i] - v) * e);

/** Compa đồng thau: mũi kim A, mũi chì B, bản lề ở trên (chân dài LEG). */
function compass(g, A, B) {
  const dx = B[0] - A[0], dy = B[1] - A[1], d = Math.hypot(dx, dy) || 1, h = Math.sqrt(Math.max(0, LEG * LEG - d * d / 4));
  let nx = -dy / d, ny = dx / d; if (ny > 0) { nx = -nx; ny = -ny; }
  const Hx = (A[0] + B[0]) / 2 + nx * h, Hy = (A[1] + B[1]) / 2 + ny * h;
  g.save(); g.lineCap = 'round';
  for (const [P, tip] of [[A, C.steel], [B, C.ivory]]) {
    g.strokeStyle = 'rgba(0,0,0,0.45)'; g.lineWidth = 9; g.beginPath(); g.moveTo(Hx + 5, Hy + 7); g.lineTo(P[0] + 5, P[1] + 7); g.stroke();
    const gr = g.createLinearGradient(Hx, Hy, P[0], P[1]); gr.addColorStop(0, C.brassHi); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, C.brassLo);
    g.strokeStyle = gr; g.lineWidth = 7; g.beginPath(); g.moveTo(Hx, Hy); g.lineTo(P[0] + (Hx - P[0]) * 0.12, P[1] + (Hy - P[1]) * 0.12); g.stroke();
    g.strokeStyle = tip; g.lineWidth = 2.5; g.beginPath(); g.moveTo(P[0] + (Hx - P[0]) * 0.12, P[1] + (Hy - P[1]) * 0.12); g.lineTo(P[0], P[1]); g.stroke();
  }
  g.strokeStyle = C.brass; g.lineWidth = 3; g.beginPath(); g.moveTo(Hx, Hy); g.lineTo(Hx, Hy - 26); g.stroke();      // cán cầm
  g.restore(); pivot(g, Hx, Hy, 1.1);
}
/** Thước thẳng của phép dựng: thanh đồng KHÔNG vạch chia (作図の定規は目盛りを使わない). */
function straightedge(g, x0, x1, y) {
  g.save(); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(x0 + 8, y + 10, x1 - x0, 30);
  const gr = g.createLinearGradient(0, y, 0, y + 30); gr.addColorStop(0, C.brassHi); gr.addColorStop(0.45, C.brass); gr.addColorStop(1, C.brassLo);
  g.fillStyle = gr; g.fillRect(x0, y, x1 - x0, 30);
  g.strokeStyle = 'rgba(42,28,8,0.8)'; g.lineWidth = 1; g.strokeRect(x0 + 0.5, y + 0.5, x1 - x0 - 1, 29);
  g.strokeStyle = 'rgba(255,245,215,0.5)'; g.beginPath(); g.moveTo(x0 + 4, y + 3.5); g.lineTo(x1 - 4, y + 3.5); g.stroke();
  g.restore();
}
/**
 * Tờ giấy một trang (chứng minh của Niven), tâm (cx, cy), cao PG_H: ngà, dòng chữ giả bằng nét mực mảnh, ∫ và d/dx khắc
 * mờ giữa các dòng; ink 0→1 làm ∫ d/dx đậm lên (「微分積分が必要」). k: trượt lên + dòng chữ chạy.
 */
const PG_W = 230, PG_H = 300;
function page1(g, cx, cy, k, ink) {
  if (k <= 0) return;
  const w = PG_W, h = PG_H, dy = (1 - outCubic(clamp(k * 1.6))) * 260;
  g.save(); g.translate(cx, cy + dy); g.rotate(0.035); g.translate(-w / 2, -h / 2);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(10, 14, w, h);
  g.fillStyle = C.paper; g.fillRect(0, 0, w, h); g.strokeStyle = C.brass; g.lineWidth = 1.5; g.strokeRect(0.5, 0.5, w - 1, h - 1);
  g.strokeStyle = 'rgba(30,25,20,0.55)'; g.lineWidth = 1.5;
  const rows = 17, skip = new Set([5, 6, 11, 12]);                        // hàng 5–6, 11–12 nhường chỗ ∫ và d/dx
  for (let i = 0; i < rows; i++) {
    if (skip.has(i)) continue;
    const l = 0.4 + 0.55 * hash(i * 3.7 + 1), y = 22 + i * 15.5;
    g.beginPath(); g.moveTo(18, y); g.lineTo(18 + (w - 36) * l * clamp(k * 2.2 - i * 0.07), y); g.stroke();
  }
  const a = clamp(k * 2 - 0.9) * (0.28 + 0.62 * clamp(ink));
  g.globalAlpha = a; g.fillStyle = C.sumi; g.textBaseline = 'alphabetic';
  g.font = `italic 500 52px ${CG}`; g.textAlign = 'left'; g.fillText('∫', 30, 128);
  g.font = `italic 500 30px ${CG}`; g.fillText('f(x) dx', 62, 118);
  g.font = `italic 500 30px ${CG}`; g.fillText('d', 118, 196); g.fillText('dx', 108, 224);
  g.fillRect(106, 204, 34, 1.6);
  g.restore();
}

export default class NoShortcut {
  static ERA = 'tenkyu';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      en92: w(92, '円'), naze: w(92, 'なぜ'), hito: w(92, '一言'), riyuu: w(92, '理由'), e92: L(92).end,
      arimasen: w(93, 'ありません'), shou93: w(93, '証明'), hitosuji: w(93, '一筋'), ikimasen: w(93, 'いきません'),
      y1947: w(94, '1947'), ni: w(94, 'ニ'), page: w(94, '1ページ'), osamaru: w(94, '収まる'),
      bibun: w(95, '微分'), hitsuyou: w(95, '必要'),
      l96: L(96).start, jijitsu: w(96, '事実'), omomi: w(96, '重み'),
      kodai: w(97, '古代'), toi: w(97, '問い'),
      l98: L(98).start, jougi: w(98, '定規'), konpasu: w(98, 'コンパス'), en98: w(98, '円'), menseki: w(98, '面積'), sei: w(98, '正'),
      sakuzu: w(98, '作図'), enseki: w(98, '円', 2), mondai: w(98, '問題'),
      y2000: w(99, '2000'), ooku: w(99, '多く'), idomi: w(99, '挑みました'), ketchaku: w(99, '決着'), lind: w(99, 'リンデ'), shou99: w(99, '証明'),
      l100: L(100).start, chou100: w(100, '超越'), fukanou: w(100, '不可能'),
      l101: L(101).start, owaranai: w(101, '終わらない'), ketten: w(101, '欠点'),
      suugaku: w(102, '数学'), furui: w(102, '古い'), fuka2: w(102, '不可能'), kotae: w(102, '答え'), end: L(102).end,
    };
    this.START = L(92).start;
    this.FROM = Math.max(this.START - 1.2, L(91).end + 0.5);
    const T = this.T;
    // hình vuông cùng diện tích với hình tròn bán kính FR: cạnh FR·√π
    this.S = FR * Math.sqrt(Math.PI);
    must(`Math.abs(${this.S} ** 2 - Math.PI * ${FR} ** 2) < 1e-6`, true);
    this.Y = { niven: String(must('1947', 1947)), lind: String(must('1882', 1882)), greek: String(must('2000', 2000)) };
    // cạnh đáy của hình vuông (cạnh được đo ở 99): mũi kim ở góc trái, mũi chì thử các độ mở — không lần nào trúng góc phải
    this.EY = FY + this.S / 2; this.EX = [FX - this.S / 2, FX + this.S / 2];
    const F = [0.84, 1.02, 0.91, 0.97];
    must(`${JSON.stringify(F)}.every(f => Math.abs(f - 1) > 0.015 && ${this.S} * f <= 2 * ${LEG})`, true);
    this.TRY = [T.y2000, T.ooku, T.idomi, T.ketchaku].map((t0, i) => ({ t0, f: F[i] }));
    // compa: vẽ vòng (92) → nghỉ bên phải → 93 nhấc lên đặt chỗ khác (？) → 97 về đỉnh đường tròn → vạch lại (98)
    //        → đo cạnh đáy (99) → nghỉ (100) → rời khung (101)
    this.C1 = [T.en92, T.en92 + 2.4];
    this.C2 = [T.konpasu, T.konpasu + 1.6];
    this.REST = [1690, 880, 1762, 880];
    this.HOP = [1600, 462, 1690, 474];
    this.SE = { x0: FX - 210, x1: FX + 250, y0: 912, y1: this.EY + 11 };   // thước: chỗ nghỉ → sát dưới cạnh đáy (đo)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.en92, 'pen'), c(T.hito, 'tick'), c(T.arimasen, 'snap'), c(T.shou93, 'tick'),
      ...typeCues(this.Y.niven, T.y1947, T.y1947 + 0.5), c(T.page, 'page'), c(T.bibun, 'tick'),
      c(T.l96 - 0.1, 'whoosh'), c(T.jijitsu, 'tick'), c(T.kodai, 'tick'),
      c(T.jougi, 'tick'), c(T.konpasu, 'pen'), c(T.sei, 'pen'), c(T.enseki, 'tick'),
      c(T.y2000, 'pen'), c(T.idomi, 'pen'), c(T.lind, 'pen'),
      c(T.chou100, 'tick'), c(T.fukanou, 'hanko'),
      c(T.l101 - 0.3, 'whoosh'), c(T.ketten, 'tick'),
      c(T.suugaku, 'soroban'), c(T.furui + 0.6, 'soroban'), c(T.kotae, 'tick'), c(T.kotae + 2.4, 'soroban'),
    ];
  }
  render(g, t) {
    const F0 = this.FROM + 0.3;
    ground(g, NoShortcut.ERA, t);
    heading(g, '第三幕　円周率は、なぜ終わらないのか', '近道はない', prog(t, F0, F0 + 1.4));
    this.figure(g, t);
    this.notes(g, t);
  }
  pose(t) {
    const T = this.T, center = a => [FX, FY, FX + FR * Math.cos(a), FY + FR * Math.sin(a)], top = -Math.PI / 2;
    const p1 = center(top + TAU * smooth(prog(t, ...this.C1))), p2 = center(top + TAU * smooth(prog(t, ...this.C2)));
    // chuỗi đoạn [đích, bắt đầu, dài, nhấc]: mỗi đoạn lerp từ tư thế hiện tại, nhấc lên theo cung sin
    const seg = [[this.REST, this.C1[1], 0.9, 0], [this.HOP, T.arimasen - 0.1, 0.9, 90], [p2, T.kodai, 1.0, 60]];
    this.TRY.forEach(p => seg.push([[this.EX[0], this.EY, this.EX[0] + this.S * p.f, this.EY], p.t0, 0.55, 30]));
    seg.push([this.REST, T.l100 - 0.5, 0.9, 40]);
    let P = p1;
    for (const [Q, a, d, lift] of seg) {
      const e = smooth(prog(t, a, a + d)), up = lift * Math.sin(Math.PI * e);
      P = lerp(P, Q, e); P = [P[0], P[1] - up, P[2], P[3] - up];
    }
    return P;
  }
  figure(g, t) {
    const T = this.T, F0 = this.FROM + 0.3;
    const rot = t * 0.03 + 0.35 * outCubic(prog(t, T.omomi - 0.1, T.omomi + 1.4));   // 96「重み」: vành xoay một nấc nặng
    // vành 360 (vật xuyên suốt): có sẵn, MỜ, từ FROM (mối nối d2→d3); sáng hẳn ở 101
    const lit = prog(t, T.l101 - 0.3, T.l101 + 1.0);
    g.save(); g.globalAlpha = 0.38 + 0.62 * lit; ring360(g, FX, FY, FR, prog(t, F0, F0 + 1.2), { rot, thread: false }); g.restore();
    // chữ số π quanh vành: bắt đầu ở đỉnh (92), chạy chậm (mờ), xoắn ốc ra ngoài nhanh ở 102
    const n = Math.round((PI_DIGITS.length - 2) * (0.24 * prog(t, T.en92, T.l101) + 0.76 * prog(t, T.suugaku - 0.2, T.end - 0.4)));
    if (n > 0) {
      const r1 = FR + 24 + 35;
      g.save(); g.globalAlpha = 0.55 + 0.45 * lit; g.font = `500 21px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let i = 0; i < n; i++) {
        const a = Math.PI / 2 - i * 0.052 + (rot - T.en92 * 0.03) * 0.5, rad = r1 + 26 + i * 0.32, fresh = i > n - 4;
        g.save(); g.translate(FX + rad * Math.cos(a), FY - rad * Math.sin(a)); g.rotate(Math.PI / 2 - a);
        g.fillStyle = fresh ? C.brassHi : (i % 10 === 9 ? C.brass : C.ivory); g.fillText(PI_DIGITS[i + 2], 0, 0); g.restore();
      }
      g.restore();
    }
    // 98: diện tích hình tròn (đồng rất nhạt, lan từ tâm)
    const ka = prog(t, T.menseki - 0.1, T.menseki + 0.7);
    if (ka > 0) { g.save(); g.fillStyle = 'rgba(243,223,162,0.08)'; g.beginPath(); g.arc(FX, FY, FR * outCubic(ka), 0, TAU); g.fill(); g.restore(); }
    // đường tròn chỉ vàng: vẽ bởi compa (92); vệt sáng theo compa lần hai (98)
    circleLine(g, FX, FY, FR, smooth(prog(t, ...this.C1)), { w: 2.4 });
    const k2 = smooth(prog(t, ...this.C2));
    if (k2 > 0 && k2 < 1) { g.save(); g.strokeStyle = 'rgba(255,240,200,0.8)'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath();
      g.arc(FX, FY, FR, -Math.PI / 2 + TAU * k2 - 0.5, -Math.PI / 2 + TAU * k2); g.stroke(); g.restore(); }
    // 98: MỘT hình vuông thép cạnh r√π (khép kín) + nhãn cạnh; 99: cạnh đáy bị đo hụt, nhấp nháy thép; rời khung ở 101
    const oSq = out(t, T.l101 - 0.4, 0.8), h = this.S / 2, [ex0, ex1] = this.EX, ey = this.EY;
    if (oSq < 1) {
      g.save(); g.translate(0, 760 * oSq);
      polyline(g, [[ex0, ey], [ex1, ey], [ex1, FY - h], [ex0, FY - h], [ex0, ey]], prog(t, T.sei, T.sei + 1.3), C.steel, 2.6);
      let fl = 0;
      this.TRY.forEach(p => { const u = t - (p.t0 + 0.55); if (u >= 0 && u < 0.5) fl = Math.max(fl, 1 - u / 0.5); });
      const kb = prog(t, T.ketchaku + 0.6, T.ketchaku + 2.1);
      if (kb > 0 && kb < 1) fl = Math.max(fl, Math.abs(Math.sin(kb * 3 * Math.PI)));
      if (fl > 0) {
        g.save(); g.shadowColor = 'rgba(200,215,245,0.9)'; g.shadowBlur = 14 * fl; g.strokeStyle = `rgba(225,233,250,${0.35 + 0.65 * fl})`;
        g.lineWidth = 2.6 + 3 * fl; g.lineCap = 'round'; g.beginPath(); g.moveTo(ex0, ey); g.lineTo(ex1, ey); g.stroke(); g.restore();
      }
      this.TRY.forEach(p => {                                                   // vạch thép nhỏ chỗ mũi chì chạm (hụt góc)
        if (t < p.t0 + 0.55) return;
        const x = ex0 + this.S * p.f;
        g.save(); g.strokeStyle = C.steel; g.lineWidth = 1.6; g.beginPath(); g.moveTo(x, ey - 12); g.lineTo(x, ey + 8); g.stroke(); g.restore();
      });
      engrave(g, [['一辺 ＝ ', `500 30px ${JP}`, C.ivory], ['r', `italic 500 38px ${CG}`, C.ivory], ['√π', `500 38px ${CG}`, C.brassHi], [' ？', `700 32px ${JP}`, C.steel]],
        ex0 - 30, ey + 50, prog(t, T.sakuzu, T.sakuzu + 0.7), undefined, C.ivory, { align: 'right', spark: false });
      g.restore();
    }
    // thước thẳng: trượt vào ở 97, lên sát dưới cạnh đáy để đo (99), rời xuống ở 101
    const kr = outCubic(prog(t, T.kodai - 0.1, T.kodai + 0.6)) - out(t, T.l101 - 0.3, 0.7);
    const sy = this.SE.y0 + (this.SE.y1 - this.SE.y0) * smooth(prog(t, T.y2000 - 0.6, T.y2000));
    if (kr > 0) straightedge(g, this.SE.x0, this.SE.x1, sy + (1 - kr) * 220);
    // compa
    const kc = outCubic(prog(t, F0, F0 + 0.8)), oc = out(t, T.l101 - 0.2, 0.8);
    if (kc > 0 && oc < 1) {
      const [ax, ay, bx, by] = this.pose(t);
      g.save(); g.translate(560 * oc, -(1 - kc) * 500); compass(g, [ax, ay], [bx, by]); g.restore();
    }
    // 93: 「？」 thép cạnh compa vừa đặt chỗ khác; tắt khi compa về (97)
    const kq = prog(t, T.arimasen + 0.6, T.arimasen + 1.0), oq = prog(t, T.kodai - 0.3, T.kodai);
    if (kq > 0 && oq < 1) {
      const s = outBack(kq) * (1 - oq);
      g.save(); g.translate(1762, 300); g.scale(s, s);
      engrave(g, '？', 0, 28, 1, `700 80px ${MIN}`, C.steel, { align: 'center', spark: false }); g.restore();
    }
    // 100: 「超越数だから」 trong hình vuông (rời cùng hình vuông) → 判子「不可能」
    const ob = out(t, T.l101 - 0.4, 0.8);
    if (ob < 1) { g.save(); g.translate(0, -500 * ob);
      engrave(g, [['超越数', `700 40px ${MIN}`, C.brassHi], ['だから', `700 32px ${MIN}`, C.ivory]], FX, FY - h + 62, prog(t, T.chou100 - 0.1, T.chou100 + 0.7), undefined, C.ivory, { align: 'center', ls: 3 });
      g.restore(); }
    const ks = prog(t, T.fukanou - 0.1, T.fukanou + 0.5);
    if (ks > 0) stamp(g, '不可能', FX, FY + 10, ks, { size: 60, rot: -0.06 });
    // 94–95: tờ chứng minh một trang của Niven giữa vòng (∫ d/dx đậm lên ở 「微分積分」); rơi xuống ở 96
    const op = out(t, T.l96 - 0.25, 0.6);
    if (op < 1) { g.save(); g.translate(0, 800 * op); page1(g, FX, FY, prog(t, T.ni - 0.2, T.page + 0.6), prog(t, T.bibun - 0.1, T.bibun + 0.5)); g.restore(); }
  }
  notes(g, t) {
    const T = this.T, x = 110;
    // 92–95 (rời trái ở 96)
    const o1 = out(t, T.l96 - 0.2);
    if (o1 < 1) {
      g.save(); g.translate(-900 * o1, 0);
      engrave(g, [['一言で言える理由', `700 44px ${MIN}`], ['？', `700 44px ${MIN}`, C.dim]], x, 330, prog(t, T.hito, T.riyuu + 0.6));
      telop(g, [['ない', `700 64px ${MIN}`, C.brassHi]], x + 22, 452, prog(t, T.arimasen - 0.1, T.arimasen + 0.5), { size: 64, ls: 8 });
      engrave(g, '証明はある。でも、一筋縄ではいかない', x, 540, prog(t, T.shou93, T.ikimasen + 0.3), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      engrave(g, [[this.Y.niven, `600 64px ${CG}`, C.brassHi], ['年　ニーベン', `700 36px ${MIN}`, C.ivory]], x, 650, prog(t, T.y1947, T.ni + 0.6));
      telop(g, [['1ページ', `700 40px ${MIN}`, C.brassHi], ['の証明', `700 32px ${MIN}`, C.ivory]], x + 22, 760, prog(t, T.page, T.osamaru + 0.5), { size: 40 });
      telop(g, [['ただし ', `700 30px ${MIN}`, C.dim], ['微分積分', `700 40px ${MIN}`, C.brassHi], ['が必要', `700 30px ${MIN}`, C.ivory]], x + 22, 870,
        prog(t, T.bibun - 0.2, T.hitsuyou + 0.4), { size: 40 });
      g.restore();
    }
    // 96–99 (rời trái ở 101)
    const o2 = out(t, T.l101 - 0.4);
    if (t > T.l96 - 0.3 && o2 < 1) {
      g.save(); g.translate(-900 * o2, 0);
      telop(g, [['この事実の', `700 36px ${MIN}`, C.ivory], ['重み', `700 50px ${MIN}`, C.brassHi]], x + 22, 330, prog(t, T.l96, T.omomi + 0.4), { size: 50 });
      engrave(g, '古代ギリシャの問い', x, 430, prog(t, T.kodai, T.toi + 0.3), `500 30px ${JP}`, C.brass, { ls: 6, spark: false });
      telop(g, '定規とコンパスだけで', x + 22, 520, prog(t, T.jougi - 0.1, T.konpasu + 0.6), { size: 38 });
      engrave(g, '円と同じ面積の正方形を', x, 600, prog(t, T.en98, T.sei + 0.4), `700 36px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, '作図できるか？', x, 660, prog(t, T.sakuzu, T.sakuzu + 0.6), `700 36px ${MIN}`, C.ivory, { ls: 2 });
      telop(g, [['円積問題', `700 60px ${MIN}`, C.brassHi]], x + 22, 790, prog(t, T.enseki - 0.1, T.mondai + 0.4), { size: 60, ls: 8 });
      engrave(g, [[this.Y.greek, `600 50px ${CG}`, C.brassHi], ['年以上の挑戦', `700 34px ${MIN}`, C.ivory]], x, 900, prog(t, T.y2000, T.idomi + 0.3));
      engrave(g, [['決着：リンデマンの証明 ', `700 30px ${MIN}`, C.ivory], [this.Y.lind, `600 40px ${CG}`, C.brassHi]], x, 966, prog(t, T.ketchaku, T.shou99 + 0.4));
      g.restore();
    }
    // 101–102
    engrave(g, '終わらない数字は', x, 400, prog(t, T.owaranai, T.owaranai + 0.7), `700 36px ${MIN}`, C.dim, { ls: 3 });
    telop(g, [['欠点', `700 56px ${MIN}`, C.brassHi], ['ではない', `700 40px ${MIN}`, C.ivory]], x + 22, 500, prog(t, T.ketten - 0.1, T.ketten + 0.7), { size: 56, ls: 4 });
    engrave(g, '数学で最も古い問題の一つに', x, 650, prog(t, T.suugaku, T.furui + 0.8), `700 36px ${MIN}`, C.ivory, { ls: 3 });
    telop(g, [['「不可能」', `700 52px ${MIN}`, C.brassHi], ['という答え', `700 38px ${MIN}`, C.ivory]], x + 22, 760, prog(t, T.fuka2 - 0.1, T.kotae + 0.5), { size: 52, ls: 3 });
  }
}

/** Đường gấp khúc vẽ dần theo k (chiều dài các đoạn bằng nhau đủ dùng cho hình vuông). */
function polyline(g, P, k, color, w) {
  const n = P.length - 1, m = clamp(k) * n, full = Math.floor(m);
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'miter'; g.beginPath(); g.moveTo(...P[0]);
  for (let i = 1; i <= Math.min(full, n); i++) g.lineTo(...P[i]);
  if (full < n) { const [ax, ay] = P[full], [bx, by] = P[full + 1], f = m - full; g.lineTo(ax + (bx - ax) * f, ay + (by - ay) * f); }
  g.stroke(); g.restore();
}
