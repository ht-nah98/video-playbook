// c3 · 誰も選ばなかった単位 (p2 câu 55–64). DNA c3: vành đứng yên (đọc số độ). Bán kính đồng 「1」 → một sợi dây đồng dài
// đúng 1 bán kính nhấc lên thành tiếp tuyến rồi UỐN theo chỉ vàng → góc ở tâm = 1ラジアン, vạch 57.3° sáng trên thang độ;
// chỉ vàng tô trọn vòng = 2π; hạt chạy 1回転; cung son nửa vòng = π (son: π); 直角 = π/2 (góc vuông); 「たまたま」 thép mờ
// → 「ではない」; hạt đi nửa vòng = 「いちばん自然なものさし」 → π; 「τ = 2π」 nhỏ; kim quay: 「回転の物語」.
import { C, MIN, JP, CG, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, circleLine, arcShu, needle, pivot, bead, engrave, telop, heading, rule } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const KICK = '第二幕　円周率は「回転」の数';
const RING2 = [760, 620, 300];                                         // = c2 (vành không dời giữa hai cảnh)
const DEG1 = 180 / Math.PI;
const PI_ = (size, col = C.shu) => ['π', `600 ${size}px ${CG}`, col];

// dây đồng chiều dài len (px) bắt đầu ở góc 0 trên đường tròn: u (0..1) phần đã uốn theo cung, phần còn lại thẳng theo tiếp tuyến
function wire(g, cx, cy, r, len, u, { w = 5, color = C.brassHi } = {}) {
  const th = (len * u) / r;                                            // góc đã uốn (rad)
  const ex = cx + r * Math.cos(th), ey = cy - r * Math.sin(th), rest = len * (1 - u);
  const tx = ex - rest * Math.sin(th), ty = ey - rest * Math.cos(th);   // tiếp tuyến hướng ngược chiều kim
  g.save(); g.lineCap = 'round';
  for (const [sw, col] of [[w + 3, 'rgba(0,0,0,0.5)'], [w, color]]) {
    g.strokeStyle = col; g.lineWidth = sw; g.beginPath();
    if (th > 0) g.arc(cx, cy, r, 0, -th, true); else g.moveTo(cx + r, cy);
    g.lineTo(tx, ty); g.stroke();
  }
  g.restore();
  return [tx, ty];
}

export default class Radian {
  static ERA = 'tenkyu';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.START = L(55).start;
    this.FROM = Math.max(this.START - 1.2, L(54).end + 0.5);
    this.NEXT = Math.max(L(65).start - 1.2, L(64).end + 0.5);             // FROM của c4 (vệt sao tắt trước chuyển cảnh)
    this.T = {
      chigai: w(55, '違います'), donna: w(55, 'どんな'), erabu: w(55, '選ぶ'), nai: w(55, 'ない'),
      hankei: w(56, '半径'), one: w(56, '1'), en56: w(56, '円'), enshu: w(56, '円周'), hankei2: w(56, '半径', 2), nagasa: w(56, '長さ'), one2: w(56, '1', 2), susumi: w(56, '進みます'),
      chuushin: w(57, '中心'), kakudo: w(57, '角度'), rad1: w(57, '1ラジアン'), n573: w(57, '57.3'), do: w(57, '度'), teigi: w(57, '定義'),
      l58: L(58).start, arawa: w(58, '現れます'), enshu58: w(58, '円周', 2), pi2: w(58, '2π'),
      kai59: w(59, '1回転'), pi2b: w(59, '2π'), han: w(59, '半'), pi: w(59, 'π'),
      chokkaku: w(60, '直角'), pi_2: w(60, 'π/2'), e60: L(60).end,
      l61: L(61).start, hakatta: w(61, '測ったら'), tamatama: w(61, 'たまたま'), arimasen: w(61, 'ありません'),
      l62: L(62).start, hanshuu: w(62, '半周'), kyori: w(62, '距離'), han62: w(62, '半'), hakaru: w(62, '測る'), monosashi: w(62, 'ものさし'), sore: w(62, 'それ'), e62: L(62).end,
      l63: L(63).start, pi2c: w(63, '2π'), hontou: w(63, '本当'), shuchou: w(63, '主張'), e63: L(63).end,
      l64: L(64).start, kaiten64: w(64, '回転'), monogatari: w(64, '物語'), e64: L(64).end,
    };
    this.R573 = must('Math.round(180 / Math.PI * 10) / 10', 57.3);
    must('2 * Math.PI * 1 / 1', 2 * Math.PI);                              // 1回転 = 円周 / 半径 = 2π
    must('Math.PI / 2 * 180 / Math.PI', 90);                               // 直角 = π/2
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.START + 0.05, 'tick'), c(T.donna, 'tick'), c(T.nai, 'tick'),
      c(T.hankei, 'pen'), c(T.enshu, 'pop'), c(T.hankei2 + 0.4, 'pen'), c(T.one2, 'tick'), c(T.susumi, 'pen'),
      c(T.chuushin, 'pen'), c(T.rad1, 'tick'), c(T.n573 + 0.3, 'correct'), c(T.teigi, 'tick'),
      c(T.arawa, 'tick'), c(T.enshu58, 'pen'), c(T.pi2, 'tick'),
      c(T.pi2b, 'tick'), c(T.han, 'pen'), c(T.pi, 'suzu'),
      c(T.chokkaku, 'pen'), c(T.pi_2, 'tick'),
      c(T.tamatama, 'tick'), c(T.arimasen, 'tick'),
      c(T.hanshuu, 'pen'), c(T.hakaru, 'tick'), c(T.monosashi, 'pen'), c(T.sore, 'tick'),
      c(T.l63 + 0.1, 'tick'), c(T.hontou, 'tick'), c(T.shuchou, 'tick'),
      c(T.kaiten64, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    const trails = 0.4 * smooth(prog(t, this.FROM + 0.9, this.FROM + 2.2)) * (1 - smooth(prog(t, T.e64, this.NEXT - 0.05)));
    ground(g, 'tenkyu', t, { trails });
    const [cx, cy, r] = RING2;
    // chấm men trên vành: 90 (đồng) ở 直角, 180 (son) ở π
    const marks = [];
    if (t > T.pi) marks.push([180, C.shu]);
    if (t > T.pi_2) marks.push([90, C.brassHi]);
    const G = ring360(g, cx, cy, r, 1, { marks });
    heading(g, KICK, '誰も選ばなかった単位', prog(t, S, S + 1.4));

    // ── câu 55: số "360" thép mờ giữa vành, trôi đi — ラジアン không chọn số nào ──
    const k360 = prog(t, T.donna, T.donna + 0.4), o360 = out(t, T.nai - 0.2, 0.7);
    if (k360 > 0 && o360 < 1) {
      // trôi xuống-phải (không cắt tiêu đề / dải vành phía trên), cắt ở dưới thước tiêu đề
      g.save(); g.beginPath(); g.rect(0, 232, 1920, 848); g.clip(); g.translate(260 * o360, 480 * o360);
      engrave(g, '360 ?', cx, cy + 40, k360, `500 120px ${CG}`, C.steelDim, { align: 'center', spark: false });
      g.restore();
    }

    // ── bán kính 1 (từ câu 56 tới hết) ──
    const kRad = prog(t, T.hankei, T.hankei + 0.5);
    if (kRad > 0) {
      g.save(); g.strokeStyle = C.brass; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + r * outCubic(kRad), cy); g.stroke(); g.restore();
      pivot(g, cx, cy);
      engrave(g, '1', cx + r / 2, cy + 46, prog(t, T.one, T.one + 0.3), `600 44px ${CG}`, C.ivory, { align: 'center', spark: false });
    }
    const kThread = prog(t, T.en56, T.en56 + 0.8) * (1 - prog(t, T.enshu, T.enshu + 0.5));
    if (kThread > 0) circleLine(g, cx, cy, r, kThread, { w: 3.2 });

    // ── câu 56–57: dây đồng dài 1 bán kính: nhấc lên thành tiếp tuyến → uốn theo chỉ vàng ──
    const oW = prog(t, T.l58 - 0.2, T.l58 + 0.4);                         // câu 58: dây + nêm thu về (rút theo cung)
    const kLift = smooth(prog(t, T.hankei2, T.nagasa + 0.3));
    const u = smooth(prog(t, T.one2, T.susumi + 0.7));
    if (t > T.enshu - 0.1 && oW < 1) {
      bead(g, cx + r, cy, 8, prog(t, T.enshu, T.enshu + 0.3) * (1 - oW));
      if (kLift > 0) {
        let tip;
        if (u <= 0) {                                                   // nhấc: từ trùng bán kính → tiếp tuyến tại (cx + r, cy)
          const x0 = cx + r * kLift, ang = kLift * Math.PI / 2, x1 = x0 + r * Math.cos(ang), ey = cy - r * Math.sin(ang), ex = x1;
          g.save(); g.lineCap = 'round';
          for (const [sw, col] of [[8, 'rgba(0,0,0,0.5)'], [5, C.brassHi]]) { g.strokeStyle = col; g.lineWidth = sw; g.beginPath(); g.moveTo(x0, cy - 6 * Math.sin(Math.PI * kLift)); g.lineTo(x1, ey); g.stroke(); }
          g.restore(); tip = [ex, ey];
        } else {
          const len = r * (1 - oW);
          tip = wire(g, cx, cy, r, len, u);
        }
        bead(g, tip[0], tip[1], 7, 1 - oW);
        engrave(g, '1', cx + r + 40, cy - r / 2, prog(t, T.nagasa, T.nagasa + 0.3) * (1 - prog(t, T.one2 + 0.1, T.one2 + 0.4)), `600 44px ${CG}`, C.brassHi, { spark: false });
      }
      // câu 57: bán kính thứ hai tới đầu dây, nêm góc, nhãn 1ラジアン, vạch 57.3° sáng trên thang độ
      const kC = prog(t, T.chuushin, T.chuushin + 0.5) * (1 - oW);
      if (kC > 0) {
        const ex = cx + r * Math.cos(1), ey = cy - r * Math.sin(1);
        g.save(); g.strokeStyle = C.brass; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + (ex - cx) * outCubic(kC), cy + (ey - cy) * outCubic(kC)); g.stroke();
        const kw = prog(t, T.kakudo, T.kakudo + 0.4) * (1 - oW);
        if (kw > 0) { g.fillStyle = `rgba(217,164,65,${0.18 * kw})`; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r, 0, -1, true); g.closePath(); g.fill();
          g.strokeStyle = C.brassHi; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 70, 0, -kw, true); g.stroke(); }
        g.restore();
        engrave(g, [['1', `600 44px ${CG}`, C.brassHi], ['ラジアン', `700 30px ${MIN}`, C.brassHi]], cx + 175 * Math.cos(0.5), cy - 175 * Math.sin(0.5) + 14, prog(t, T.rad1, T.rad1 + 0.4) * (1 - oW), undefined, C.brassHi, { align: 'center', spark: false });
        // vạch 57.3° trên thang
        const kd = prog(t, T.n573, T.n573 + 0.4) * (1 - oW);
        if (kd > 0) {
          const a = -1, c = Math.cos(a), s = Math.sin(a);
          g.save(); g.strokeStyle = C.ivory; g.shadowColor = 'rgba(243,223,162,0.9)'; g.shadowBlur = 10; g.lineWidth = 3;
          g.beginPath(); g.moveTo(cx + (G.r0 - 4) * c, cy + (G.r0 - 4) * s); g.lineTo(cx + (G.r1 + 14 * kd) * c, cy + (G.r1 + 14 * kd) * s); g.stroke(); g.restore();
          engrave(g, [[String(this.R573), `600 40px ${CG}`, C.brassHi], ['°', `500 32px ${JP}`, C.brassHi]], cx + (G.r1 + 60) * Math.cos(1), cy - (G.r1 + 60) * Math.sin(1), kd, undefined, C.brassHi, { align: 'center', spark: false });
        }
      }
    }

    // ── câu 58–60: chỉ vàng trọn vòng = 2π; hạt chạy 1回転; cung son nửa vòng = π; góc vuông = π/2 ──
    const oI = prog(t, T.l64, T.l64 + 0.5);           // câu 64: nhãn trong vành thu lại, kim quay
    const kT = prog(t, T.enshu58, T.pi2) * (1 - oI);
    if (kT > 0) {
      g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 3.5; g.shadowColor = 'rgba(243,223,162,0.6)'; g.shadowBlur = 10; g.lineCap = 'round';
      g.beginPath(); g.arc(cx, cy, r, 0, -TAU * smooth(kT), true); g.stroke(); g.restore();
      engrave(g, [['2', `600 48px ${CG}`, C.ivory], PI_(52)], cx, cy + r - 70, prog(t, T.pi2, T.pi2 + 0.3) * (1 - oI), undefined, C.ivory, { align: 'center', spark: false });
    }
    // hạt chạy trọn vòng (1回転, câu 59 và 63) — vệt đồng
    const orbit = (a, d) => {
      const p = smooth(prog(t, a, a + d)), tp = smooth(prog(t, a + d * 0.35, a + d * 1.35));
      if (p <= 0 || tp >= 1) return;
      const head = TAU * p, tail = TAU * tp;
      g.save(); g.strokeStyle = 'rgba(243,223,162,0.85)'; g.lineWidth = 5; g.lineCap = 'round'; g.shadowColor = 'rgba(243,223,162,0.5)'; g.shadowBlur = 10;
      g.beginPath(); g.arc(cx, cy, r, -tail, -head, true); g.stroke(); g.restore();
      bead(g, cx + r * Math.cos(head), cy - r * Math.sin(head), 9, 1 - prog(t, a + d * 1.2, a + d * 1.35));
    };
    orbit(T.kai59, 0.8);
    orbit(T.l63, 0.9);
    // cung son nửa vòng = π (đến hết cảnh)
    const kHalf = prog(t, T.han, T.pi);
    if (kHalf > 0) arcShu(g, cx, cy, r, 0, Math.PI, kHalf, { w: 6 });
    engrave(g, 'π', cx - 80, cy - r + 100, prog(t, T.pi, T.pi + 0.3) * (1 - oI), `600 84px ${CG}`, C.shu, { align: 'center', spark: false });
    // câu 62: hạt đi nửa vòng trên cung son (ものさし)
    const ph = smooth(prog(t, T.hanshuu, T.kyori + 0.3));
    if (ph > 0 && t < T.han62 + 0.8) {
      const a = Math.PI * ph;
      g.save(); g.strokeStyle = C.ivory; g.lineWidth = 2; g.globalAlpha = 0.9; g.beginPath(); g.arc(cx, cy, r + 9, 0, -a, true); g.stroke(); g.restore();
      bead(g, cx + r * Math.cos(a), cy - r * Math.sin(a), 9, 1 - prog(t, T.han62 + 0.4, T.han62 + 0.8));
    }
    // 直角 = π/2: nêm phần tư + dấu góc vuông
    const kQ = prog(t, T.chokkaku, T.chokkaku + 0.5) * (1 - oI);
    if (kQ > 0) {
      g.save(); g.fillStyle = `rgba(217,164,65,${0.14 * kQ})`; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r, 0, -Math.PI / 2 * outCubic(kQ), true); g.closePath(); g.fill();
      g.strokeStyle = C.brass; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy - r * outCubic(kQ)); g.stroke();
      g.strokeStyle = C.brassHi; g.lineWidth = 2; g.beginPath(); g.moveTo(cx + 38, cy); g.lineTo(cx + 38, cy - 38); g.lineTo(cx, cy - 38); g.stroke(); g.restore();
      pivot(g, cx, cy);
      engrave(g, [PI_(52), ['/2', `600 46px ${CG}`, C.ivory]], cx + 150, cy - 110, prog(t, T.pi_2, T.pi_2 + 0.3) * (1 - oI), undefined, C.ivory, { align: 'center', spark: false });
    }
    // câu 64: kim mọc, quay — 回転の物語
    const kN = prog(t, T.l64 + 0.5, T.l64 + 1.1);
    if (kN > 0) needle(g, cx, cy, r * 0.88, Math.PI / 2 + 1.6 * Math.max(0, t - T.l64 - 0.5) ** 1.3, kN);

    // ── cột phải ──
    const X = 1240;
    const block = (a, b, f) => { const o = out(t, b); if (t > a - 0.2 && o < 1) { g.save(); g.translate(700 * o, 0); f(); g.restore(); } };
    block(S, T.l58 - 0.3, () => {
      telop(g, 'ラジアン', X, 380, prog(t, S - 0.1, S + 0.6), { size: 52, color: C.brassHi });
      engrave(g, 'どんな数も 選ばない', X + 4, 470, prog(t, T.donna, T.nai + 0.3), `700 36px ${MIN}`, C.ivory, { ls: 2 });
      telop(g, [['半径 ', `700 40px ${MIN}`], ['1', `600 54px ${CG}`, C.brassHi], [' の円', `700 40px ${MIN}`]], X, 600, prog(t, T.hankei, T.en56 + 0.4), { size: 44 });
      engrave(g, [['1', `600 52px ${CG}`, C.brassHi], [' だけ進む', `700 38px ${MIN}`]], X + 4, 690, prog(t, T.one2, T.susumi + 0.3), undefined, C.ivory);
      telop(g, [['1', `600 52px ${CG}`, C.brassHi], ['ラジアン', `700 40px ${MIN}`], [' ≈ ', `500 40px ${JP}`, C.dim], [String(this.R573), `600 52px ${CG}`, C.brassHi], ['°', `500 40px ${JP}`, C.brassHi]],
        X, 820, prog(t, T.rad1 - 0.1, T.do + 0.3), { size: 44 });
      engrave(g, '定義は これだけ', X + 4, 910, prog(t, T.teigi, T.teigi + 0.6), `500 30px ${JP}`, C.dim, { ls: 4, spark: false });
    });
    block(T.l58, T.l61 - 0.3, () => {
      telop(g, '円周率が現れる', X, 380, prog(t, T.arawa - 0.2, T.arawa + 0.6), { size: 44 });
      engrave(g, [['円周 = 2', `700 44px ${MIN}`], PI_(56)], X + 4, 490, prog(t, T.pi2 - 0.3, T.pi2 + 0.3), undefined, C.ivory);
      telop(g, [['1回転 = 2', `700 40px ${MIN}`], PI_(52), [' ラジアン', `700 40px ${MIN}`]], X, 620, prog(t, T.kai59, T.pi2b + 0.6), { size: 44 });
      telop(g, [['半回転 = ', `700 40px ${MIN}`], PI_(56)], X, 740, prog(t, T.han, T.pi + 0.2), { size: 44 });
      telop(g, [['直角 = ', `700 40px ${MIN}`], PI_(56), ['/2', `600 52px ${CG}`]], X, 860, prog(t, T.chokkaku, T.pi_2 + 0.4), { size: 44 });
    });
    block(T.l61, T.l62 - 0.3, () => {
      engrave(g, '円を測ったら', X + 4, 460, prog(t, T.hakatta - 0.5, T.hakatta + 0.4), `700 40px ${MIN}`, C.steelDim, { spark: false });
      engrave(g, 'たまたま出てきた数', X + 4, 540, prog(t, T.tamatama, T.tamatama + 0.8), `700 44px ${MIN}`, C.steelDim, { spark: false });
      engrave(g, 'ではない', X + 4, 650, prog(t, T.arimasen, T.arimasen + 0.4), `700 56px ${MIN}`, C.brassHi, { ls: 4 });
    });
    block(T.l62, T.l63 - 0.3, () => {
      telop(g, '半周の距離', X, 400, prog(t, T.hanshuu - 0.1, T.kyori + 0.4), { size: 44 });
      engrave(g, '半回転を測る', X + 4, 500, prog(t, T.han62, T.hakaru + 0.4), `700 38px ${MIN}`, C.ivory, { ls: 2 });
      telop(g, 'いちばん自然なものさし', X, 630, prog(t, T.monosashi - 0.6, T.monosashi + 0.6), { size: 40 });
      rule(g, X, X + 520, 680, prog(t, T.monosashi, T.monosashi + 0.8));
      engrave(g, [PI_(110), [' = 円周率', `700 48px ${MIN}`]], X + 4, 830, prog(t, T.sore, T.sore + 0.6), undefined, C.ivory);
    });
    block(T.l63, T.l64 - 0.3, () => {
      telop(g, [['1回転の ', `700 40px ${MIN}`], ['2', `600 54px ${CG}`], PI_(56)], X, 420, prog(t, T.l63, T.pi2c + 0.4), { size: 44 });
      engrave(g, [['τ', `500 56px ${JP}`, C.brassHi], [' = 2', `600 52px ${CG}`], PI_(52)], X + 4, 560, prog(t, T.hontou, T.hontou + 0.5), undefined, C.ivory);
      engrave(g, '本当の定数？', X + 4, 640, prog(t, T.hontou + 0.3, T.hontou + 0.9), `700 34px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, 'と主張する数学者も', X + 4, 710, prog(t, T.shuchou, T.shuchou + 0.8), `500 30px ${JP}`, C.dim, { ls: 3, spark: false });
    });
    telop(g, '回転の物語', X, 560, prog(t, T.kaiten64 - 0.2, T.monogatari + 0.4), { size: 64 });
  }
}
