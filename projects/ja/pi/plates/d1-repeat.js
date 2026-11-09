// d1 · 分数は必ずくり返す (p2, câu 75–85) — mở HỒI 3. Thẻ hồi「第三幕 なぜ終わらないのか」; vành đồng thau bên phải
// (1400, 600) r 230 là MẶT SỐ DƯ: sáu ô 1–6 khắc quanh vành, kim nhảy theo số dư của 1÷7 (1→3→2→6→4→5→1), dây đồng
// nối các ô thành vòng khép kín ở lần thứ 7 rồi kim chạy mãi theo vòng. Cột trái: π ＝ 無理数, π ≠ 整数/整数 → 1÷3 =
// 0.333… (số 3 chạy dài rồi thu về 0.3 + dấu chấm Nhật) → 1÷7 = 0.142857 142857… (hai nhóm gạch chân 同じ並び) → hàng
// đầu dời lên, bảng 筆算 từng bước 「10 ÷ 7 = 1 余り 3」… lần 7 lặp → 「どこかで終わる → 有限小数」「必ずくり返す → 循環小数」
// (判子「必ず」) → π son giữa vành, chữ số π chạy quanh vành không lặp; 「終わらない・くり返さない → 分数ではありえない」.
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, sk,
  ground, ring360, circleLine, needle, pivot, bead, engrave, telop, heading, leader, rule, measure, actCard, PI_DIGITS, REM7 } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const CX = 1400, CY = 600, R = 230;
const SLOT = v => Math.PI / 2 - (v - 1) * Math.PI / 3;                       // góc toán của ô số dư v (như mặt đồng hồ)
const sp = (v, r) => [CX + r * Math.cos(SLOT(v)), CY - r * Math.sin(SLOT(v))];
const NUM = `500 60px ${CG}`;
const MAXD = 18;
const WR = 146;                                                            // bán kính dây số dư: ngoài kim (118), ngoài vòng sáng ô số (r 30 quanh số ở r 178)                                                           // số chữ số tối đa ở hàng đầu (đo: không chạm vành)

// bước 筆算 của 1 ÷ 7: [số bị chia, thương, số dư] — tính bằng code, kiểm bằng must
const STEPS = Array.from({ length: 7 }, (_, i) => { const r = REM7[i % 6]; return [10 * r, Math.floor(10 * r / 7), 10 * r % 7]; });
const D7 = STEPS.slice(0, 6).map(s => s[1]).join('');
// bảng 筆算 có thêm dòng 0 「1 ÷ 7 = 0 余り 1」 (số dư ĐẦU) → dòng thứ 7 của bảng = lần thứ 7 số dư hiện ra
const ROWS = [[1, Math.floor(1 / 7), 1 % 7], ...STEPS];
const RY0 = 456, RDY = 60, RY = j => RY0 + j * RDY;

export default class Repeat {
  static ERA = 'tenkyu';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      en75: w(75, '円周'), muri: w(75, '無理'), sei1: w(75, '整数'), sei2: w(75, '整数', 2), watta: w(75, '割った'), bun75: w(75, '分数'), kakenai: w(75, '書けない'),
      naze: w(76, 'なぜ'), bun76: w(76, '分数'), furumai: w(76, 'ふるまい'),
      l77: S(77), one3: w(77, '1'), waru3: w(77, '割る'), d3: w(77, '0.333…'), eien: w(77, '永遠'), e77: E(77),
      three78: w(78, '3'), ten: w(78, '点'), kaki: w(78, '書き表せます'),
      l79: S(79), one7: w(79, '1'), waru7: w(79, '割る'), d7a: w(79, '0.142857'), d7b: w(79, '142857'), to79: w(79, 'と'), onaji79: w(79, '同じ'), narabi: w(79, '並び'),
      l80: S(80), guuzen: w(80, '偶然'),
      l81: S(81), hissan: w(81, '筆算'), keta: w(81, '1けた'), amari1: w(81, '余り'), amari2: w(81, '余り', 2), from1: w(81, '1'), to6: w(81, '6'), tsuu: w(81, '通り'),
      nana: w(82, '7回目'), onaji82: w(82, '同じ'), arawa: w(82, '現れます'),
      l83: S(83), suuji83: w(83, '数字'), kuri83: w(83, 'くり返し'), hajime: w(83, '始める'),
      l84: S(84), donna: w(84, 'どんな'), owaru: w(84, '終わる'), kanarazu: w(84, '必ず'), kuri84: w(84, 'くり返す'), gakkou: w(84, '学校'), yuugen: w(84, '有限'), junkan: w(84, '循環'),
      l85: S(85), en85: w(85, '円周'), suuji85: w(85, '数字'), sezu: w(85, 'せず'), shinai: w(85, 'しないなら'), bun85: w(85, '分数'), end: E(85),
    };
    this.START = S(75);
    this.FROM = Math.max(this.START - 2.6, L(74).end + 0.5);
    const T = this.T;
    // giờ dòng 筆算 (5 dòng đầu rải đều trong câu 81; dòng 6 = lần thứ 7, dòng 7 = lặp lại)
    const a = T.keta, b = T.amari2;
    this.ROW = [0, 1, 2, 3, 4].map(i => a + i * (b - a) / 4).concat([T.nana, T.suuji83]);
    // kim: ô thứ i của chuỗi số dư (1, 3, 2, 6, 4, 5, 1, 3, …) tới lúc HOP[i]; từ lần 8 chạy đều 0.6 s / ô
    this.HOP = [T.hissan + 0.3];
    for (let i = 1; i <= 7; i++) this.HOP.push(this.ROW[i - 1] + 0.25);
    for (let i = 8; i < 60; i++) this.HOP.push(this.HOP[7] + (i - 7) * 0.6);
    must('Math.floor(1 / 3 * 1e3) / 1e3', 0.333);
    must(`JSON.stringify(${JSON.stringify(D7)})`, JSON.stringify((1 / 7).toFixed(12).slice(2, 8)));
    must(`${JSON.stringify(D7)} === "142857"`, true);
    STEPS.forEach(([n, q, r]) => { must(`Math.floor(${n} / 7)`, q); must(`${n} % 7`, r); });
    must(`${STEPS[5][2]} === ${REM7[0]}`, true);                           // lần chia thứ 6 cho lại số dư đầu (1) — lần thứ 7
    must('7 - 1', 6);
    must('Math.floor(1 / 7)', 0); must('1 % 7', REM7[0]);                    // dòng 0: số dư đầu = 1
    must(`JSON.stringify(${JSON.stringify(ROWS.slice(0, 7).map(r => r[2]))})`, JSON.stringify([1, 3, 2, 6, 4, 5, 1]));   // 7 số dư, cái thứ 7 = cái đầu
    must(`${RY(7)} + 14 < 1016`, true);                                   // dòng cuối (lặp) trong vùng an toàn
    must(`${WR} - 118 > 20 && 178 - ${WR} >= 32`, true);                  // dây: không chạm kim, ngoài vòng sáng r 30
    this.R0 = T.hissan + 0.1;
    // hàng đầu 1÷7 không chạm vành ở MAXD chữ số (Cormorant 60 px: ~27 px / chữ số) — kiểm lại bằng measure lúc vẽ
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.START - 2.3, 'hyoshigi'),
      c(T.muri, 'tick'), c(T.sei1, 'tick'), c(T.bun75, 'tick'), c(T.kakenai, 'snap'),
      c(T.bun76, 'tick'),
      c(T.d3, 'soroban'), c(T.eien, 'soroban'), c(T.ten, 'pop'), 
      c(T.d7a, 'soroban'), c(T.d7b, 'soroban'), c(T.onaji79, 'pen'),
      c(T.guuzen, 'tick'),
      c(T.hissan, 'tick'), ...this.ROW.slice(0, 5).map(t => c(t + 0.02, 'tick')).filter((_, i) => i % 2 === 0), c(T.from1, 'soroban'), c(T.tsuu, 'tick'),
      c(T.nana, 'tick'), c(T.onaji82, 'correct'),
      c(T.kuri83, 'soroban'),
      c(T.donna, 'tick'), c(T.owaru, 'tick'), c(T.kanarazu, 'hanko'), c(T.yuugen, 'tick'), c(T.junkan, 'tick'),
      c(T.suuji85, 'soroban'), c(T.sezu, 'tick'), c(T.shinai, 'tick'), c(T.bun85, 'snap'),
    ];
  }
  // số chữ số 1/7 đã hiện ở hàng 1÷7 / hàng đầu
  digits(t) {
    const T = this.T;
    let n = Math.round(6 * prog(t, T.d7a, T.d7a + 1.2)) + Math.round(6 * prog(t, T.d7b, T.d7b + 1.1));
    if (t >= this.HOP[7]) n += 1 + this.HOP.slice(8).filter(h => t >= h).length;
    return Math.min(n, MAXD);
  }
  render(g, t) {
    const T = this.T, F0 = this.FROM, st = this.START;
    ground(g, 'tenkyu', t);
    actCard(g, t, st, '第三幕', 'なぜ終わらないのか');
    heading(g, '第三幕　円周率は、なぜ終わらないのか', '分数は必ずくり返す', prog(t, st + 0.1, st + 1.4));

    // ── vành: mặt số dư ──
    const kR = prog(t, st - 0.1, st + 1.2);
    ring360(g, CX, CY, R, kR, { rot: 0.02 * (t - st) });
    const piOn = prog(t, T.en85, T.en85 + 0.6);                           // câu 85: π giữa vành, mặt số mờ đi
    const dialA = 1 - 0.65 * piOn;
    // ô số dư: hiện khi kim ghé lần đầu
    const firstVisit = v => this.HOP[REM7.indexOf(v)];
    const cur = this.HOP.filter(h => t >= h).length - 1;                  // chỉ số chặng hiện tại (−1 = chưa bắt đầu)
    for (let v = 1; v <= 6; v++) {
      const a0 = firstVisit(v), k = prog(t, a0 - 0.1, a0 + 0.3);
      if (k <= 0) continue;
      const [x, y] = sp(v, 178), sweep = prog(t, T.from1 + (v - 1) * 0.12, T.from1 + (v - 1) * 0.12 + 0.3) * (1 - prog(t, T.to6 + 0.5, T.to6 + 1.0));
      const on = cur >= 0 && REM7[cur % 6] === v && t < T.en85;
      g.save(); g.globalAlpha = dialA;
      if (sweep > 0 || on) { g.strokeStyle = C.brassHi; g.lineWidth = 1.6; g.globalAlpha = dialA * Math.max(sweep, on ? 0.9 : 0);
        g.beginPath(); g.arc(x, y - 2, 30, 0, TAU); g.stroke(); g.globalAlpha = dialA; }
      engrave(g, String(v), x, y + 18, k, `600 50px ${CG}`, on ? C.brassHi : C.ivory, { align: 'center', spark: false });
      g.restore();
    }
    // dây nối số dư (vòng khép ở lần 7), chặng đang đi sáng hơn
    if (cur >= 1 || t > this.HOP[1] - 0.1) {
      g.save(); g.lineCap = 'round';
      for (let i = 1; i <= 6; i++) {
        const k = prog(t, this.HOP[i] - 0.05, this.HOP[i] + 0.35); if (k <= 0) continue;
        const [x0, y0] = sp(REM7[(i - 1) % 6], WR), [x1, y1] = sp(REM7[i % 6], WR), e = outCubic(k);
        g.globalAlpha = dialA * 0.85; g.strokeStyle = C.brass; g.lineWidth = 1.8;
        g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e); g.stroke();
      }
      if (cur >= 7 && t < T.en85 + 0.6) {                                  // vòng chạy mãi: chặng vừa đi sáng
        const k = prog(t, this.HOP[cur], this.HOP[cur] + 0.4), [x0, y0] = sp(REM7[(cur - 1) % 6], WR), [x1, y1] = sp(REM7[cur % 6], WR);
        g.globalAlpha = dialA * (1 - k * 0.6); g.strokeStyle = C.brassHi; g.lineWidth = 3.2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      }
      g.restore();
    }
    // kim: quay chậm trước 筆算 → về ô 1 → nhảy theo số dư (theo chiều kim đồng hồ)
    let ang;
    const free = Math.PI / 2 - 0.5 * (t - st);
    if (t < this.HOP[0]) ang = free;
    else if (t < this.HOP[1]) {
      const e = smooth(prog(t, this.HOP[0] - 0.5, this.HOP[0] + 0.1)), d = ((SLOT(1) - free) % TAU + TAU + Math.PI) % TAU - Math.PI;
      ang = free + d * e;
    } else {
      const i = cur, a0 = SLOT(REM7[(i - 1) % 6]), d = ((a0 - SLOT(REM7[i % 6])) % TAU + TAU) % TAU;
      ang = a0 - d * smooth(prog(t, this.HOP[i], this.HOP[i] + 0.3));
    }
    const kN = prog(t, st + 0.4, st + 1.2) * (1 - prog(t, T.en85 - 0.3, T.en85 + 0.2));
    needle(g, CX, CY, 118, ang, kN);
    if (kN <= 0 && kR > 0 && piOn <= 0) pivot(g, CX, CY);
    // 「偶然ではない」 giữa vành (câu 80) → rơi xuống trước 筆算
    const og = out(t, T.hissan - 0.4, 0.5);
    if (t > T.guuzen - 0.2 && og < 1) {
      g.save(); g.translate(0, 520 * og);
      telop(g, '偶然ではない', CX, CY + 14, prog(t, T.guuzen, T.guuzen + 0.6), { size: 40, align: 'center' });
      g.restore();
    }
    // 「余りは 6通り」 dưới vành
    const o6 = out(t, T.l84 - 0.3);
    if (t > T.tsuu - 0.6 && o6 < 1) {
      g.save(); g.translate(0, 300 * o6);
      telop(g, [['余りは ', `700 36px ${MIN}`], ['6', `600 50px ${CG}`, C.brassHi], [' 通りだけ', `700 36px ${MIN}`]], CX, 1000, prog(t, T.tsuu - 0.6, T.tsuu + 0.3), { size: 36, align: 'center' });
      g.restore();
    }
    // câu 85: π son giữa vành + chữ số π chạy quanh vành, ra xa dần, không lặp
    if (piOn > 0) engrave(g, 'π', CX, CY + 52, piOn, `600 170px ${CG}`, C.shu, { align: 'center' });
    const kdg = prog(t, T.suuji85, T.end - 0.3);
    if (kdg > 0) {
      const n = Math.round((PI_DIGITS.length - 2) * kdg), r1 = R + 62 + 34;
      g.save(); g.font = `500 22px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let i = 0; i < n; i++) {
        const a = Math.PI / 2 - i * 0.05 - 0.07, rad = r1 + i * 0.28, fresh = i > n - 4;
        g.save(); g.translate(CX + rad * Math.cos(a), CY - rad * Math.sin(a)); g.rotate(Math.PI / 2 - a);
        g.fillStyle = fresh ? C.brassHi : (i % 10 === 9 ? C.brass : C.ivory); g.fillText(PI_DIGITS[i + 2], 0, 0); g.restore();
      }
      const a = Math.PI / 2; g.save(); g.translate(CX + r1 * Math.cos(a), CY - r1 * Math.sin(a)); g.fillStyle = C.ivory; g.fillText('3.', 0, 0); g.restore();
      g.restore();
    }

    // ── khối 1 (câu 75–76): π は 無理数 · π ≠ 整数/整数 · 分数のふるまい ──
    const o1 = out(t, T.l77 - 0.6);
    if (t > st - 0.3 && o1 < 1) {
      g.save(); g.translate(-1100 * o1, 0);
      telop(g, [['π', `600 60px ${CG}`, C.shu], [' は ', `700 40px ${MIN}`], ['無理数', `700 44px ${MIN}`, C.brassHi]], 140, 360, prog(t, T.muri - 0.4, T.muri + 0.6), { size: 44 });
      // 分数の形: 整数 / 整数
      const fx = 330, fy = 520, f = `700 40px ${MIN}`;
      engrave(g, '整数', fx, fy - 26, prog(t, T.sei1, T.sei1 + 0.4), f, C.ivory, { align: 'center' });
      rule(g, fx - 56, fx + 56, fy - 6, prog(t, T.watta - 0.2, T.watta + 0.3), { color: C.ivory, a: 0.9 });
      engrave(g, '整数', fx, fy + 48, prog(t, T.sei2, T.sei2 + 0.4), f, C.ivory, { align: 'center' });
      engrave(g, [['= ', `500 48px ${CG}`, C.dim], ['分数', `700 44px ${MIN}`, C.ivory]], fx + 92, fy + 22, prog(t, T.bun75 - 0.2, T.bun75 + 0.3), undefined, C.ivory);
      engrave(g, [['π', `600 64px ${CG}`, C.shu], [' ≠', `500 60px ${CG}`, C.steel]], 140, fy + 24, prog(t, T.kakenai, T.kakenai + 0.4), undefined, C.ivory);
      engrave(g, '分数では書けない', 142, fy + 120, prog(t, T.kakenai, T.kakenai + 0.8), `500 30px ${JP}`, C.dim, { ls: 3, spark: false });
      engrave(g, 'なぜ大事？', 142, 760, prog(t, T.naze, T.naze + 0.4), `500 30px ${JP}`, C.dim, { ls: 3, spark: false });
      telop(g, '分数のふるまい', 140, 860, prog(t, T.bun76, T.furumai + 0.5), { size: 42 });
      g.restore();
    }

    // ── khối 2 (câu 77–78): 1 ÷ 3 = 0.333… → 0.3̇ ──
    const o2 = out(t, T.l80 - 0.3);
    if (t > T.l77 - 0.6 && o2 < 1) {
      g.save(); g.translate(-1100 * o2, 0);
      const y = 420, f = `500 64px ${CG}`, pre = '1 ÷ 3 = ';
      engrave(g, pre, 140, y, prog(t, T.one3, T.waru3 + 0.2), f, C.ivory);
      const grow = prog(t, T.eien, T.e77), shrink = prog(t, T.ten, T.ten + 0.5);
      const nThree = t < T.d3 ? 0 : Math.max(1, Math.round(3 + 9 * grow - 11 * shrink));
      const x1 = 140 + measure(g, pre, f);
      if (t >= T.d3) {
        const kd = prog(t, T.d3, T.d3 + 0.5);
        engrave(g, [['0.', f, C.ivory], ['3'.repeat(nThree), f, C.brassHi], [shrink < 1 ? '…' : '', f, C.dim]], x1, y, kd, f, C.ivory);
        // dấu chấm trên số lặp (ký hiệu SGK Nhật)
        const kp = prog(t, T.ten, T.ten + 0.35);
        if (kp > 0 && shrink >= 1) {
          const cx3 = x1 + measure(g, '0.', f) + measure(g, '3', f) / 2;
          bead(g, cx3, y - 56 - 26 * (1 - outCubic(kp)), 4.5, kp, { core: C.brassHi });
        }
      }
      engrave(g, '永遠に続く', 142, y + 70, prog(t, T.eien, T.eien + 0.6) * (1 - prog(t, T.ten, T.ten + 0.3)) > 0 ? 1 : 0, `500 30px ${JP}`, C.dim, { ls: 3, spark: false });
      engrave(g, [['・', `700 30px ${JP}`, C.brassHi], [' ＝ くり返しの印', `500 30px ${JP}`, C.dim]], 142, y + 70, prog(t, T.kaki - 0.2, T.kaki + 0.6), undefined, C.dim, { ls: 2, spark: false });
      g.restore();
    }

    // ── hàng 1 ÷ 7 (câu 79) → dời lên làm hàng đầu (câu 80) → chữ số chạy tiếp theo kim (câu 83) ──
    if (t > T.one7 - 0.3) {
      const up = smooth(prog(t, T.l80 - 0.3, T.l80 + 0.4)), y = 600 - 300 * up;
      const pre = '1 ÷ 7 = 0.', x0 = 140;
      engrave(g, pre, x0, y, prog(t, T.one7, T.d7a + 0.1), NUM, C.ivory);
      const n = this.digits(t), xs = x0 + measure(g, pre, NUM), gap = 14;
      const parts = [];
      for (let gI = 0; gI * 6 < n; gI++) parts.push([(D7.repeat(5)).slice(gI * 6, Math.min(n, gI * 6 + 6)), NUM, gI === 0 ? C.ivory : C.brassHi, 0]);
      let x = xs;
      parts.forEach((p, i) => { engrave(g, p[0], x, y, 1, NUM, p[2], { spark: false }); x += measure(g, p[0], NUM) + gap; });
      const kE = prog(t, T.to79, T.to79 + 0.3);
      if (kE > 0) engrave(g, '…', x - gap + 6, y, kE, NUM, C.dim, { spark: false });
      // 同じ並び: gạch chân hai nhóm
      const ku = prog(t, T.onaji79, T.onaji79 + 0.5), wg = measure(g, D7, NUM);
      if (ku > 0) {
        rule(g, xs, xs + wg, y + 18, ku, { color: C.brassHi, a: 0.9 });
        rule(g, xs + wg + gap, xs + 2 * wg + gap, y + 18, prog(t, T.onaji79 + 0.2, T.onaji79 + 0.7), { color: C.brassHi, a: 0.9 });
      }
      const on = 1 - out(t, T.l80 - 0.4, 0.4);
      if (on > 0) { g.save(); g.globalAlpha = on; engrave(g, '同じ並びがくり返す', xs, y + 70, prog(t, T.narabi, T.narabi + 0.6), `500 30px ${JP}`, C.brass, { ls: 3, spark: false }); g.restore(); }
    }

    // ── khối 3 (câu 81–83): bảng 筆算 từng bước ──
    const o3 = out(t, T.l84 - 0.3);
    if (t > T.hissan - 0.3 && o3 < 1) {
      g.save(); g.translate(-1100 * o3, 0);
      engrave(g, '筆算', 142, 384, prog(t, T.hissan, T.hissan + 0.4), `700 30px ${MIN}`, C.brass, { ls: 8, spark: false });
      rule(g, 142, 640, 400, prog(t, T.hissan + 0.1, T.hissan + 0.7));
      ROWS.forEach(([n, q, r], j) => {
        const a = j === 0 ? this.R0 : this.ROW[j - 1], k = prog(t, a, a + 0.35); if (k <= 0) return;
        const y = RY(j), rep = j === 7, back = j === 6;
        const f = `500 44px ${CG}`, fj = `500 30px ${JP}`;
        const P = [[`${n} ÷ 7 = `, f, rep ? C.dim : C.ivory], [String(q), `600 46px ${CG}`, C.brassHi], ['　余り ', fj, C.dim], [String(r), `600 46px ${CG}`, j === 0 || back || rep ? C.brassHi : C.ivory]];
        const B = engrave(g, P, 150, y, k, undefined, C.ivory, { spark: false });
        if (j === 0) engrave(g, '最初の余り', B.x0 + B.w + 46, y - 2, prog(t, this.R0 + 0.2, this.R0 + 0.7), `500 28px ${JP}`, C.brass, { ls: 2, spark: false });
        if (back) {                                                       // lần thứ 7: số dư 1 trở lại
          const kc = prog(t, T.nana + 0.2, T.nana + 0.7), xr = B.x0 + B.w - measure(g, String(r), `600 46px ${CG}`) / 2 + 8;
          if (kc > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2; g.beginPath(); g.arc(xr, y - 15, 22, -Math.PI / 2, -Math.PI / 2 + TAU * outCubic(kc)); g.stroke(); g.restore(); }
          engrave(g, '7回目', B.x0 + B.w + 46, y - 2, prog(t, T.nana, T.nana + 0.4), `700 32px ${MIN}`, C.brassHi, { ls: 2 });
          engrave(g, [['＝ 最初の余り', `500 28px ${JP}`, C.brass]], B.x0 + B.w + 160, y - 2, prog(t, T.onaji82, T.onaji82 + 0.6), undefined, C.brass, { ls: 2, spark: false });
        }
        if (rep) engrave(g, '← くり返し', B.x0 + B.w + 46, y - 2, prog(t, T.kuri83, T.kuri83 + 0.5), `700 32px ${MIN}`, C.brassHi, { ls: 2 });
      });
      // dây nối dòng 8 ↔ dòng 2 (cùng phép chia 10 ÷ 7)
      const kl = prog(t, T.kuri83 + 0.2, T.hajime);
      if (kl > 0) { g.save(); g.globalAlpha = 0.8 * kl; g.strokeStyle = C.brass; g.lineWidth = 1.2; g.beginPath();
        g.moveTo(132, RY(1) - 14); g.lineTo(118, RY(1) - 14); g.lineTo(118, RY(1) + (RY(7) - RY(1)) * outCubic(kl) - 14); g.lineTo(132, RY(7) - 14); g.stroke(); g.restore(); }
      g.restore();
    }

    // ── khối 4 (câu 84): どんな分数も → 終わる / 必ずくり返す → 有限小数 / 循環小数 ──
    const k4 = prog(t, T.l84 - 0.3, T.l84 + 0.3);
    if (k4 > 0) {
      g.save(); g.translate(-500 * (1 - outCubic(k4)), 0);
      telop(g, 'どんな分数も', 140, 400, prog(t, T.donna, T.donna + 0.8), { size: 38 });
      engrave(g, 'どこかで終わる', 142, 500, prog(t, T.owaru - 0.4, T.owaru + 0.3), `700 38px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, '必ずくり返す', 600, 500, prog(t, T.kanarazu - 0.1, T.kuri84 + 0.4), `700 38px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, '学校で習う', 142, 568, prog(t, T.gakkou, T.gakkou + 0.5), `500 28px ${JP}`, C.dim, { ls: 4, spark: false });
      engrave(g, '有限小数', 142, 650, prog(t, T.yuugen, T.yuugen + 0.6), `700 56px ${MIN}`, C.brassHi, { ls: 4 });
      engrave(g, '循環小数', 600, 650, prog(t, T.junkan, T.junkan + 0.6), `700 56px ${MIN}`, C.brassHi, { ls: 4 });
      // ví dụ 循環小数 có dấu chấm: 0.3̇ ・ 0.1̇42857̇
      const ke = prog(t, T.junkan + 0.3, T.junkan + 0.9);
      if (ke > 0) {
        const f = `500 44px ${CG}`, y = 730, xa = 604, xb = 724;
        engrave(g, '0.3', xa, y, ke, f, C.ivory, { spark: false });
        engrave(g, '0.142857', xb, y, ke, f, C.ivory, { spark: false });
        if (ke >= 1) {
          const dot = (x) => { g.fillStyle = C.brassHi; g.beginPath(); g.arc(x, y - 40, 3.6, 0, TAU); g.fill(); };
          dot(xa + measure(g, '0.', f) + measure(g, '3', f) / 2);
          dot(xb + measure(g, '0.', f) + measure(g, '1', f) / 2);
          dot(xb + measure(g, '0.14285', f) + measure(g, '7', f) / 2);
        }
      }
      // 「必ず」: gạch chân đồng sáng (son chỉ dành cho π / đáp án đã chứng minh — DNA §2); tiếng hanko giữ ở sfx
      const wk = measure(g, '必ず', `700 38px ${MIN}`, 2);
      g.save(); g.globalAlpha = 0.95; g.fillStyle = C.brassHi; g.fillRect(600, 514, wk * outCubic(prog(t, T.kanarazu, T.kanarazu + 0.4)), 3); g.restore();
      g.restore();
    }

    // ── khối 5 (câu 85): π の数字は 終わらない · くり返さない → 分数ではありえない ──
    if (t > T.en85 - 0.3) {
      engrave(g, [['π', `600 64px ${CG}`, C.shu], [' の数字は', `700 38px ${MIN}`, C.ivory, 2]], 140, 846, prog(t, T.en85, T.suuji85 + 0.4), undefined, C.ivory);
      telop(g, '終わらない', 440, 846, prog(t, T.sezu - 0.3, T.sezu + 0.4), { size: 38 });
      telop(g, 'くり返さない', 700, 846, prog(t, T.shinai - 0.3, T.shinai + 0.4), { size: 38 });
      engrave(g, [['→ ', `500 40px ${JP}`, C.dim], ['分数ではありえない', `700 50px ${MIN}`, C.brassHi, 3]], 140, 960, prog(t, T.bun85 - 0.2, T.bun85 + 0.8), undefined, C.ivory);
    }
  }
}
