// a0 · Cold open (p1, câu 0–23). DNA a0: đêm chàm, vành đồng thau lơ lửng (vật xuyên suốt) đi qua bảy chặng:
//  ① 1+1=2 · hai viên đá (hai hạt đồng) → ② 「なぜ3.14？」 khắc giữa vành; 2·4·7 lướt qua, gạch thép → ③ mascot ponder +
//  máy tính bỏ túi đồng thau 3.14159265 (「電卓がそう表示するから」) → ④ định nghĩa SGK 円周率 = 円周 ÷ 直径 = 測り方 ≠ 何なのか
//  → ⑤ tin đồn 「3で教える？」 (lục giác thép trong vành: chu vi = 3) → phiếu đề 東大 2003, 「3.14だから」 gạch thép → 0点; thanh
//  "この動画" sáng nửa đầu → ⑥ mục lục ①②③ = ba chấm son trên vành + dây dẫn ra テロップ, mascot point → ⑦ 「多数決？」 gạch;
//  π son khắc giữa vành; chữ số π xoắn ốc chạy quanh vành không lặp; vành thu nhỏ, sao quay, π ở khắp trời; 「どこから」 →
//  vành quay ngược (về 2000 năm trước) → đen kín đúng hết câu cuối + tail (intro 漆と金 từ đen).
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, hash, sk, typeCues,
  ground, dark, ring360, ringGeom, circleLine, needle, pivot, bead, polyIn, drawPoly, engrave, telop, tag, leader,
  strikeSteel, exam, figure, rule, measure, PI_DIGITS } from '../kit.js';

// ── vành: chặng (giờ bắt đầu dời, [cx, cy, r]); dời trong 0.9 s ──
function track(t, keys) {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, nv] = keys[i], e = smooth(clamp((t - t0) / 0.9));
    if (e <= 0) break;
    v = v.map((a, j) => a + (nv[j] - a) * e);
  }
  return v;
}
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));         // 0 → 1 rời khung

// máy tính bỏ túi bằng đồng thau (riêng a0): thân đồng, màn hình chàm khắc số, phím khắc
function calculator(g, x, y, k, digits, kd) {
  if (k <= 0) return;
  const w = 300, h = 430, dy = (1 - outCubic(clamp(k))) * (H - y + 40);
  g.save(); g.translate(x, y + dy);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.beginPath(); g.roundRect(14, 18, w, h, 22); g.fill();
  const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#F0D894'); gr.addColorStop(0.3, '#B48A40'); gr.addColorStop(0.62, '#E2C178'); gr.addColorStop(1, '#6E5224');
  g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, w, h, 22); g.fill();
  g.strokeStyle = 'rgba(42,28,8,0.9)'; g.lineWidth = 1.5; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 16); g.stroke();
  g.fillStyle = '#0A1230'; g.fillRect(26, 34, w - 52, 86); g.strokeStyle = 'rgba(42,28,8,0.9)'; g.strokeRect(26, 34, w - 52, 86);
  const n = Math.round(digits.length * clamp(kd));
  g.font = `500 32px ${MONO}`; g.textAlign = 'right'; g.textBaseline = 'alphabetic'; g.fillStyle = C.ivory; g.fillText(digits.slice(0, n), w - 40, 90);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {                 // phím: lỗ khắc tròn
    const px = 52 + c * 66, py = 168 + r * 64;
    g.fillStyle = 'rgba(42,28,8,0.85)'; g.beginPath(); g.arc(px, py, 22, 0, TAU); g.fill();
    g.fillStyle = 'rgba(255,238,190,0.35)'; g.beginPath(); g.arc(px, py + 1.5, 22, 0.15 * Math.PI, 0.85 * Math.PI); g.lineWidth = 1.2; g.strokeStyle = 'rgba(255,238,190,0.45)'; g.stroke();
    g.fillStyle = C.brassHi; g.font = `500 20px ${MONO}`; g.textAlign = 'center'; g.fillText('789÷456×123−0.=+'[r * 4 + c], px, py + 7);
  }
  g.restore();
}

// ba câu hỏi (mục lục) — thẻ hồi về sau gọi lại "問①…" bằng đúng chữ này
const QS = [
  [['なぜ ', `700 38px ${MIN}`], ['3.14', `600 50px ${CG}`], [' なのか', `700 38px ${MIN}`]],
  [['なぜ 終わらないのか', `700 38px ${MIN}`]],
  [['曲がった空間では', `700 38px ${MIN}`]],
];
const Q3B = [['なぜ ', `700 38px ${MIN}`], ['π', `600 54px ${CG}`, C.shu], [' にならないのか', `700 38px ${MIN}`]];
const QANG = [38, 0, -38];                                                // chấm son trên vành (độ, góc toán)
const SKYPI = [[250, 230], [1660, 210], [330, 870], [1610, 880], [150, 540], [1780, 560]];

export default class Open {
  static ERA = 'tenkyu';
  static POSES = ['ponder', 'point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      eq: w(0, '1+1'), naze0: w(0, 'なぜ'), two0: w(0, '2'), sugu: w(0, 'すぐ'),
      st1: w(1, '1つ'), st2: w(1, '1つ', 2), st3: w(1, '2つ'),
      l2: S(2), en2: w(2, '円周'), pi2: w(2, '3.14'), dou: w(2, 'どう'),
      n2: w(3, '2'), n4: w(3, '4'), n7: w(3, '7'), naku: w(3, 'なく'), naze3: w(3, 'なぜ'),
      l4: S(4), damatte: w(4, '黙って'), shoujiki: w(4, '正直'), dentaku: w(4, '電卓'), hyouji: w(4, '表示'), e4: E(4),
      l5: S(5), shou: w(5, '小学'), en5: w(5, '円周', 2), chokkei: w(5, '直径'), watta: w(5, '割った'), kyoka: w(5, '教科書'),
      machi: w(6, '間違い'), hakari: w(7, '測り方'), nani: w(7, '何'),
      l8: S(8), y2000: w(8, '2000'), kore8: w(8, 'これ'), three: w(8, '3'), wadai: w(8, '話題'),
      l9: S(9), toudai: w(9, '東京'), en10: w(10, '円周'), koto10: w(10, 'こと'), shoumei: w(10, '証明'), seyo: w(10, 'せよ'),
      pi11: w(11, '3.14'), kaite: w(11, '書いて'), ten: w(11, '点'), moraenai: w(11, 'もらえません'),
      zenhan: w(12, '前半'), tokeru: w(12, '解ける'), e12: E(12),
      l13: S(13), mittsu: w(13, '3つ'), q: [w(14, '1つ目'), w(15, '2つ目'), w(16, '3つ目')], q3b: w(16, 'なぜ'), e16: E(16),
      l17: S(17), fushigi: w(17, '不思議'), kono17: w(17, 'この'), kimeta: w(17, '決めた'),
      tasuu: w(18, '多数'), pi18: w(18, '3.14'), nai18: w(18, 'ない'),
      heimen: w(19, '平面'), kono19: w(19, 'この'), enaku: w(19, 'えなく'),
      l20: S(20), bunsuu: w(20, '分数'), shousuu: w(20, '小数'), kurikaesa: w(20, 'くり返しません'),
      uchuu21: w(21, '宇宙'), atsukai: w(21, '扱いにくい'), e21: E(21),
      l22: S(22), itaru: w(22, 'いたる'), arawa: w(22, '現れます'),
      doko: w(23, 'どこ'), y2000b: w(23, '2000'), end: E(23),
    };
    this.START = S(0);
    this.FROM = -0.5;                                  // lead p1 0.6: trang mở trong bóng tối, sao hiện dần
    this.TAIL = 1.0;                                   // build.json p1 tail — đen kín đúng hết câu cuối + tail
    const T = this.T;
    this.KEYS = [[this.FROM, [1360, 560, 230]], [T.l2 - 0.4, [960, 600, 250]], [T.l4 - 0.2, [560, 580, 220]], [T.l5, [620, 580, 230]],
      [T.l8 - 0.3, [1420, 560, 200]], [T.l13 - 0.3, [1040, 560, 150]], [T.l17 - 0.2, [960, 610, 220]], [T.l22, [960, 520, 110]]];
    must('1 + 1', 2);
    must(`${PI_DIGITS.slice(0, 10)}`, 3.14159265);
    must('6 * Math.sin(Math.PI / 6)', 3);                                   // lục giác nội tiếp đường kính 1: chu vi đúng 3
    must('3.14 > 3.05', true);
    this.CALC = PI_DIGITS.slice(0, 10);
    // mascot point (mục lục): một bên khung, đầu ngón dừng trước mép ngoài vành (vành [1040,560,150] → r1 197)
    this.POINT = [330, 700];
    must('330 <= 380', true); must('700 >= 680 && 700 <= 760', true);
    must('(1040 - 197) - (330 + 0.683 * 700) >= 20', true);                  // đầu ngón (≈ cx + 0.683h, đo ảnh) cách vành ≥ 20px
    this.RUMOR_Y = 540;                                                     // tin đồn 「3で教える」 xuống giữa khung
    must('540 - 56 * 1.08 > 400', true);                                     // không chạm 「2000年前後」
  }
  sfx() {
    const T = this.T, c = (t, kind, db) => ({ t: +t.toFixed(3), kind: sk(kind), ...(db != null ? { db } : {}) });
    return [
      c(T.eq, 'tick'), c(T.naze0, 'tick'),
      c(T.st1, 'pop'), c(T.st2, 'pop'), c(T.st3, 'chip'),
      c(T.l2 - 0.4, 'whoosh-long'), c(T.pi2, 'tick'), c(T.dou, 'question'),
      c(T.n2, 'tick'), c(T.n7, 'tick'), c(T.naku, 'snap'), c(T.naze3, 'suzu'),
      c(T.damatte - 0.3, 'pop'), c(T.shoujiki, 'tick'), c(T.dentaku, 'snap'), ...typeCues(this.CALC, T.dentaku + 0.2, T.hyouji + 0.6, 'beep').filter((_, i) => i === 4),
      c(T.l5, 'whoosh'), c(T.en5, 'pen'), c(T.chokkei, 'pen'), c(T.watta, 'tick'), c(T.machi, 'correct'),
      c(T.nani, 'question'),
      c(T.y2000, 'tick'), c(T.three, 'pen'),
      c(T.toudai - 0.2, 'page'), c(T.en10, 'pen'), c(T.shoumei, 'pen'), c(T.pi11, 'pen'), c(T.ten, 'error'),
      c(T.zenhan, 'tick'), c(T.tokeru, 'suzu'),
      c(T.l13 - 0.3, 'whoosh-long'), ...T.q.map(t => c(t, 'pop')),
      c(T.kono17, 'tick'), c(T.tasuu, 'tick'), c(T.nai18, 'error'),
      c(T.heimen, 'tick'), c(T.kono19, 'suzu'),
      c(T.bunsuu, 'tick'), c(T.shousuu, 'soroban'), c(T.shousuu + 2.6, 'soroban'),
      c(T.atsukai, 'tick'), c(T.atsukai + 2.4, 'soroban'),
      c(T.l22, 'whoosh-long'), c(T.itaru, 'shimmer'), c(T.doko, 'tick'), c(T.y2000b, 'whoosh-long'), c(T.end - 0.2, 'hyoshigi'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t, { trails: 0.85 * smooth(prog(t, T.l22, T.arawa + 0.5)) });

    // ── vành (vật xuyên suốt) ──
    const [cx, cy, r] = track(t, this.KEYS);
    const back = t > T.y2000b ? -1.6 * (t - T.y2000b) ** 1.5 : 0;            // quay ngược về 2000 năm trước
    const rot = t * 0.03 + back;
    const kRing = prog(t, this.FROM + 0.3, T.eq + 0.4);
    const G = ring360(g, cx, cy, r, kRing, { rot, numerals: r >= 200 });
    // kim quay chậm khi tâm vành trống (mở bài, mục lục, cuối)
    const kN = Math.min(prog(t, T.eq, T.eq + 0.6), 1 - out(t, T.l2 - 0.4, 0.4)) + Math.min(prog(t, T.l13, T.l13 + 0.6), 1 - out(t, T.fushigi - 0.2, 0.4));   // kim ở lại trong vành tới 「不思議」
    if (kN > 0) needle(g, cx, cy, r * 0.82, t * 0.35 + back * 3, kN);

    // ── ① 1 + 1 = 2, hai viên đá (câu 0–1) → trượt trái ra ──
    const o1 = out(t, T.l2 - 0.5);
    if (o1 < 1) {
      g.save(); g.translate(-900 * o1, 0);
      engrave(g, [['1 + 1 = ', `500 132px ${CG}`], ['2', `600 132px ${CG}`, C.brassHi]], 170, 470, prog(t, T.eq, T.two0 + 0.25), undefined, C.ivory);
      telop(g, [['なぜ？', `700 44px ${MIN}`]], 650, 330, prog(t, T.naze0, T.naze0 + 0.6));
      engrave(g, 'すぐに答えられる', 176, 560, prog(t, T.sugu, T.sugu + 0.8), `500 32px ${JP}`, C.dim, { ls: 3 });
      // hai viên đá → nhập lại "2つ"
      const join = outCubic(prog(t, T.st3 - 0.1, T.st3 + 0.45)), y = 770;
      bead(g, 300 + 40 * join, y, 16, prog(t, T.st1, T.st1 + 0.35));
      bead(g, 470 - 40 * join, y, 16, prog(t, T.st2, T.st2 + 0.35));
      engrave(g, '1つ', 300, y + 76, prog(t, T.st1, T.st1 + 0.3), `500 30px ${JP}`, C.dim, { align: 'center', spark: false });
      engrave(g, '1つ', 470, y + 76, prog(t, T.st2, T.st2 + 0.3), `500 30px ${JP}`, C.dim, { align: 'center', spark: false });
      if (join > 0) { rule(g, 300, 470, y + 108, join); engrave(g, [['2', `600 52px ${CG}`, C.brassHi], ['つ', `500 30px ${JP}`, C.ivory]], 385, y + 172, prog(t, T.st3 + 0.2, T.st3 + 0.6), undefined, C.ivory, { align: 'center' }); }
      g.restore();
    }

    // ── ② 「円周率は、なぜ」 + 3.14 khắc giữa vành; 2·4·7 lướt qua, gạch thép (câu 2–3) ──
    const o2 = out(t, T.l4 - 0.3);
    if (t > T.l2 - 0.5 && o2 < 1) {
      g.save(); g.translate(0, -700 * o2);
      telop(g, [['円周率は、なぜ', `700 48px ${MIN}`]], 960, 190, prog(t, T.en2 - 0.1, T.pi2), { align: 'center' });
      engrave(g, '3.14', cx, cy + 50, prog(t, T.pi2, T.pi2 + 0.5), `500 150px ${CG}`, C.brassHi, { align: 'center' });
      engrave(g, '？', cx + 190, cy + 40, prog(t, T.dou, T.dou + 0.2), `700 72px ${MIN}`, C.ivory, { align: 'center' });
      g.restore();
      const o3 = out(t, T.l4 - 0.3);
      [[T.n2, '2', 450, 640], [T.n4, '4', 1470, 640], [T.n7, '7', 960, 1000]].forEach(([a, s, x, y], i) => {
        if (t < a) return;
        g.save(); g.translate(0, 600 * o3);
        const k = prog(t, a, a + 0.25), m = measure(g, s, `500 110px ${CG}`);
        engrave(g, s, x, y, k, `500 110px ${CG}`, C.steelDim, { align: 'center', spark: false });
        strikeSteel(g, x - m / 2 - 16, y - 36, x + m / 2 + 16, y - 30, prog(t, T.naku + i * 0.1, T.naku + i * 0.1 + 0.3));
        g.restore();
      });
    }

    // ── ③ mascot ponder + máy tính đồng thau (câu 4) ──
    const o4 = out(t, T.l5 - 0.2);
    if (t > T.l4 - 0.5 && o4 < 1) {
      g.save(); g.translate(0, 900 * o4);
      calculator(g, 930, 300, prog(t, T.dentaku - 0.35, T.dentaku + 0.25), this.CALC, prog(t, T.dentaku + 0.2, T.hyouji + 0.6));
      engrave(g, '正直な答え', 1080, 810, prog(t, T.shoujiki, T.shoujiki + 0.6), `500 30px ${JP}`, C.dim, { align: 'center', ls: 6, spark: false });
      telop(g, [['「電卓がそう表示するから」', `700 38px ${MIN}`]], 1080, 900, prog(t, T.dentaku - 0.2, T.e4 - 0.3), { align: 'center' });
      g.restore();
      const km = prog(t, T.damatte - 0.5, T.damatte + 0.1);
      g.save(); g.translate(0, 760 * o4); figure(g, 'ponder', 1640, H, 700, km, { t }); g.restore();
    }

    // ── ④ định nghĩa SGK: đường kính + chu vi sáng, 円周率 = 円周 ÷ 直径 = 測り方 ≠ 何なのか (câu 5–7) ──
    const o5 = out(t, T.l8 - 0.4);
    if (t > T.l5 - 0.2 && o5 < 1) {
      g.save(); g.translate(0, -800 * o5);
      circleLine(g, cx, cy, r, prog(t, T.en5, T.en5 + 0.8), { w: 3.2 });
      const kd = outCubic(prog(t, T.chokkei, T.chokkei + 0.5));
      if (kd > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.2; g.beginPath(); g.moveTo(cx - r, cy); g.lineTo(cx - r + 2 * r * kd, cy); g.stroke(); g.restore();
        engrave(g, '直径', cx, cy + 50, prog(t, T.chokkei + 0.2, T.chokkei + 0.6), `500 30px ${JP}`, C.ivory, { align: 'center', ls: 4, spark: false }); }
      engrave(g, '円周', cx, cy - r + 56, prog(t, T.en5 + 0.3, T.en5 + 0.7), `500 30px ${JP}`, C.brassHi, { align: 'center', ls: 4, spark: false });
      engrave(g, '小学5年 ・ 教科書の定義', 1000, 300, prog(t, T.shou, T.kyoka + 0.6), `500 28px ${JP}`, C.brass, { ls: 4 });
      const F = telop(g, [['円周率', `700 52px ${MIN}`], [' = ', `500 56px ${CG}`, C.dim], ['円周', `700 52px ${MIN}`], [' ÷ ', `500 52px ${JP}`, C.dim], ['直径', `700 52px ${MIN}`]],
        1000, 440, prog(t, T.watta - 0.3, T.watta + 0.6), { size: 52, frame: false });
      const kc = prog(t, T.machi, T.machi + 0.5);                         // 「間違いはない」: khoanh ◯ đồng (Nhật: ◯ = đúng)
      if (kc > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.5; g.lineCap = 'round'; g.beginPath();
        g.ellipse(F.x + F.w / 2, F.y + F.h / 2, F.w / 2 + 30, F.h / 2 + 18, -0.03, -Math.PI / 2, -Math.PI / 2 + TAU * 1.04 * outCubic(kc)); g.stroke(); g.restore(); }
      engrave(g, [['= ', `500 48px ${CG}`, C.dim], ['測り方', `700 46px ${MIN}`, C.brassHi]], 1000, 610, prog(t, T.hakari, T.hakari + 0.5));
      engrave(g, [['≠ ', `500 46px ${JP}`, C.dim], ['何なのか？', `700 46px ${MIN}`, C.ivory]], 1000, 700, prog(t, T.nani, T.nani + 0.6));
      g.restore();
    }

    // ── ⑤ tin đồn 「3で教える？」 + lục giác thép (chu vi = 3) (câu 8) ──
    const o6 = out(t, T.toudai - 0.5);
    if (t > T.l8 - 0.5 && o6 < 1) {
      g.save(); g.translate(0, -700 * o6);
      engrave(g, '2000年前後', 140, 400, prog(t, T.y2000, T.y2000 + 0.6), `500 32px ${JP}`, C.brass, { ls: 6 });
      telop(g, [['「円周率を ', `700 56px ${MIN}`], ['3', `600 84px ${CG}`, C.steel], [' で教える」？', `700 56px ${MIN}`]], 140, this.RUMOR_Y, prog(t, T.kore8, T.three + 0.8), { size: 56 });
      engrave(g, '日本中で話題に', 160, 670, prog(t, T.wadai - 0.3, T.wadai + 0.4), `500 36px ${JP}`, C.dim, { ls: 4 });
      g.restore();
    }
    const kHex = prog(t, T.three, T.three + 0.8) - prog(t, T.l13 - 0.6, T.l13 - 0.2);
    if (kHex > 0) {
      drawPoly(g, polyIn(cx, cy, r, 6), kHex, { color: C.steel, w: 2, dots: kHex >= 1 });
      engrave(g, [['周 = ', `500 40px ${JP}`, C.steel], ['3', `600 60px ${CG}`, C.steel]], cx, cy + 20, prog(t, T.three + 0.5, T.three + 0.9), undefined, C.steel, { align: 'center', spark: false });
    }

    // ── 東大 2003: phiếu đề, 「3.14だから」 → gạch thép → 0点; thanh "この動画" sáng nửa đầu (câu 9–12) ──
    const o7 = outCubic(prog(t, T.l13 - 0.6, T.l13 + 0.1));
    if (t > T.toudai - 0.6 && o7 < 1) {
      g.save(); g.translate(0, 900 * o7);
      const ink = { spark: false, shadow: false };
      exam(g, 150, 230, 960, 560, prog(t, T.toudai - 0.4, T.toudai + 0.4), { content: X => {
        engrave(g, [['円周率が ', `700 44px ${MIN}`], ['3.05', `600 56px ${CG}`], [' より大きいことを', `700 44px ${MIN}`]], X.ix, X.iy + 40, prog(t, T.en10, T.koto10 + 0.3), undefined, C.sumi, ink);
        engrave(g, '証明せよ。', X.ix, X.iy + 112, prog(t, T.shoumei, T.seyo + 0.3), `700 44px ${MIN}`, C.sumi, ink);
        const A = engrave(g, [['答　', `500 36px ${JP}`], ['3.14', `600 50px ${CG}`], [' だから', `500 36px ${JP}`]], X.ix, X.iy + 260, prog(t, T.pi11, T.kaite), undefined, C.sumi, ink);
        strikeSteel(g, A.x0 - 10, X.iy + 246, A.x0 + A.w + 12, X.iy + 240, prog(t, T.ten, T.ten + 0.35), { color: C.steelInk });
        engrave(g, '0点', X.x + X.w - 90, X.iy + 290, prog(t, T.ten + 0.2, T.moraenai), `700 92px ${MIN}`, C.steelInk, { align: 'right', ...ink });
      } });
      // thanh "この動画": nửa đầu sáng đồng
      const kb = prog(t, T.zenhan - 0.2, T.zenhan + 0.6), bx0 = 150, bx1 = 1110, by = 900;
      if (kb > 0) {
        engrave(g, 'この動画', bx0, by - 26, clamp(kb * 2), `500 28px ${JP}`, C.dim, { ls: 4, spark: false });
        g.save(); g.strokeStyle = 'rgba(142,156,192,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(bx0, by); g.lineTo(bx0 + (bx1 - bx0) * outCubic(kb), by); g.stroke();
        const kh = prog(t, T.zenhan + 0.2, T.zenhan + 0.9); g.strokeStyle = C.brassHi; g.lineWidth = 5; g.lineCap = 'round';
        g.beginPath(); g.moveTo(bx0, by); g.lineTo(bx0 + (bx1 - bx0) / 2 * outCubic(kh), by); g.stroke(); g.restore();
        engrave(g, '前半', (bx0 + bx1) / 4 + bx0 / 2, by + 52, prog(t, T.zenhan + 0.4, T.zenhan + 0.8), `700 34px ${MIN}`, C.brassHi, { align: 'center', spark: false });
      }
      g.restore();
      g.save(); g.translate(0, 900 * o7);
      telop(g, [['前半を見れば、', `700 36px ${MIN}`], ['解ける', `700 36px ${MIN}`, C.brassHi]], cx, 930, prog(t, T.tokeru - 0.2, T.tokeru + 0.6), { size: 36, align: 'center' });
      g.restore();
    }

    // ── ⑥ mục lục: ba chấm son trên vành → dây dẫn → ①②③ (câu 13–16); mascot point chỉ vào vành ──
    const o8 = out(t, T.l17 - 0.4);
    if (t > T.l13 - 0.6 && o8 < 1) {
      g.save(); g.translate(1100 * o8, 0);
      const rr = G.r1 - 8, ys = [400, 560, 720];
      QANG.forEach((d, i) => {
        const a = d * Math.PI / 180, mx = cx + rr * Math.cos(a), my = cy - rr * Math.sin(a), kd = prog(t, T.mittsu + i * 0.12, T.mittsu + i * 0.12 + 0.3);
        if (kd > 0) { g.fillStyle = C.shu; g.beginPath(); g.arc(mx, my, 5 * outBack(kd), 0, TAU); g.fill(); }
        const kq = prog(t, T.q[i], T.q[i] + 0.4);
        leader(g, mx, my, 1300, ys[i], kq);
        tag(g, i + 1, 1300, ys[i], prog(t, T.q[i] + 0.2, T.q[i] + 0.5));
        telop(g, QS[i], 1350, ys[i] + 14, prog(t, T.q[i] + 0.3, T.q[i] + 1.4), { size: 38 });
      });
      telop(g, Q3B, 1350, ys[2] + 92, prog(t, T.q3b, T.q3b + 1.2), { size: 38 });
      g.restore();
      const kp = prog(t, T.l13 - 0.2, T.l13 + 0.4);
      g.save(); g.translate(-900 * o8, 0); figure(g, 'point', this.POINT[0], H, this.POINT[1], kp, { t }); g.restore();
    }

    // ── ⑦ 誰かが決めた数ではない · 多数決？(gạch) · π son giữa vành · chữ số π xoắn (câu 17–21) ──
    const o9 = out(t, T.l20 - 0.2);
    if (t > T.l17 - 0.4 && o9 < 1) {
      g.save(); g.translate(0, -400 * o9);
      telop(g, '誰かが決めた数ではない', 960, 190, prog(t, T.kono17, T.kimeta + 0.4), { size: 46, align: 'center' });
      const D = engrave(g, [['多数決で ', `700 42px ${MIN}`, C.steelDim], ['3.14', `600 54px ${CG}`, C.steelDim], [' に決めた？', `700 42px ${MIN}`, C.steelDim]], 960, 285, prog(t, T.tasuu, T.pi18 + 0.6), undefined, C.steelDim, { align: 'center', spark: false });
      strikeSteel(g, D.x0 - 14, 270, D.x0 + D.w + 14, 264, prog(t, T.nai18, T.nai18 + 0.35));
      g.restore();
    }
    // 「ひとつの不思議」: telop giữa vành từ 不思議 tới trước khi π son khắc vào (câu 17–19)
    const kf = prog(t, T.fushigi, T.fushigi + 0.6), af = 1 - out(t, T.kono19 - 0.5, 0.4);
    if (kf > 0 && af > 0) {
      g.save(); g.globalAlpha = af;
      telop(g, [['ひとつの', `700 46px ${MIN}`], ['不思議', `700 46px ${MIN}`, C.brassHi]], cx, cy + 16, kf, { size: 46, align: 'center' });
      g.restore();
    }
    const o10 = out(t, T.l22 - 0.2);
    if (t > T.heimen - 0.4 && o10 < 1) {
      g.save(); g.translate(-700 * Math.max(o10, out(t, T.bunsuu - 0.6)), 0);
      telop(g, '平面の図形のきまり', 120, 610, prog(t, T.heimen, T.heimen + 0.8), { size: 36 });
      leader(g, 520, 590, cx - G.r1 - 10, cy - 10, prog(t, T.heimen + 0.6, T.kono19));
      g.restore();
    }
    // π son giữa vành (từ câu 19 tới hết; vành thu nhỏ thì π thu theo)
    const s = r / 220, kpi = prog(t, T.kono19, T.kono19 + 0.4);
    if (kpi > 0) {
      engrave(g, 'π', cx, cy + 58 * s, kpi, `600 ${Math.round(190 * s)}px ${CG}`, C.shu, { align: 'center' });
      const ok = 1 - out(t, T.l22 - 0.2, 0.4);
      if (ok > 0) engrave(g, 'ほかの値にはならない', cx, cy + 132 * s, prog(t, T.enaku - 0.2, T.enaku + 0.6), `700 ${Math.round(30 * s)}px ${MIN}`, C.ivory, { align: 'center' });
    }
    // chữ số π chạy quanh vành theo xoắn ốc ra ngoài, không lặp
    const kdg = prog(t, T.shousuu, T.e21);
    if (kdg > 0) {
      const n = Math.round((PI_DIGITS.length - 2) * kdg), size = Math.max(10, Math.round(22 * s));
      g.save(); g.font = `500 ${size}px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let i = 0; i < n; i++) {
        const a = Math.PI / 2 - i * 0.052 + rot * 0.5, rad = (G.r1 + 30 * s) + i * 0.3 * s, fresh = i > n - 4;
        g.save(); g.translate(cx + rad * Math.cos(a), cy - rad * Math.sin(a)); g.rotate(Math.PI / 2 - a);
        g.fillStyle = fresh ? C.brassHi : (i % 10 === 9 ? C.brass : C.ivory); g.fillText(PI_DIGITS[i + 2], 0, 0); g.restore();
      }
      g.restore();
      const tail = 1 - out(t, T.l22 - 0.2);
      if (tail > 0) { const a = Math.PI / 2 + rot * 0.5 + 0.075, rad = G.r1 + 30 * s;            // "3." đứng ngay trước chữ số đầu, quay cùng chuỗi
        g.save(); g.translate(cx + rad * Math.cos(a), cy - rad * Math.sin(a)); g.rotate(Math.PI / 2 - a); g.font = `500 ${size}px ${MONO}`;
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = C.ivory; g.fillText('3.', 0, 0); g.restore(); }
    }
    const o11 = out(t, T.l22 - 0.2);
    if (t > T.bunsuu - 0.4 && o11 < 1) {
      g.save(); g.translate(-760 * o11, 0);
      telop(g, '分数で書けない', 120, 520, prog(t, T.bunsuu, T.bunsuu + 0.7), { size: 38 });
      telop(g, '決してくり返さない', 120, 640, prog(t, T.kurikaesa - 0.3, T.kurikaesa + 0.7), { size: 38 });
      g.restore();
      g.save(); g.translate(760 * o11, 0);
      telop(g, '宇宙を設計するなら', 1400, 520, prog(t, T.uchuu21, T.uchuu21 + 0.8), { size: 34, color: C.dim });
      telop(g, '扱いにくい数', 1400, 640, prog(t, T.atsukai, T.atsukai + 0.6), { size: 44 });
      g.restore();
    }

    // ── 宇宙のいたるところ: π ở khắp trời (câu 22–23) ──
    SKYPI.forEach(([x, y], i) => {
      const k = prog(t, T.itaru + i * 0.28, T.itaru + i * 0.28 + 0.4);
      if (k <= 0) return;
      ring360(g, x, y, 34, k, { numerals: false, thread: false, rot: rot + i });
      engrave(g, 'π', x, y + 16, prog(t, T.itaru + i * 0.28 + 0.2, T.itaru + i * 0.28 + 0.4), `600 46px ${CG}`, C.shu, { align: 'center', spark: false });
    });
    telop(g, [['この数は、', `700 46px ${MIN}`], ['どこから来たのか', `700 46px ${MIN}`, C.brassHi]], 960, 830, prog(t, T.doko - 0.4, T.doko + 0.8), { size: 46, align: 'center' });
    engrave(g, '2000年以上前の、ある人物へ', 960, 930, prog(t, T.y2000b, T.y2000b + 1.2), `500 32px ${JP}`, C.brass, { align: 'center', ls: 6 });

    // ── sao hiện từ bóng tối; tắt về đen kín đúng hết câu cuối + tail ──
    const up = 0.1 + 0.9 * outCubic(prog(t, this.FROM, this.FROM + 1.2));
    const down = 1 - prog(t, T.end - 0.25, T.end + this.TAIL - 0.15);
    dark(g, Math.min(up, down));
  }
}

