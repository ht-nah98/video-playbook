// c1 · 円の数ではない (p2 câu 46–50, MỞ HỒI 2). DNA c1: thẻ hồi「第二幕 円周率は「回転」の数」 (+ ① gọi lại câu hỏi
// mục lục); vành đồng thau bên phải, cột chữ bên trái. 「円の数？」 khắc THÉP MỜ giữa vành → gạch thép đúng chữ sai
// (「そうではありません」) → 「回転の数」 khắc đồng ngay dưới, một hạt chạy trọn một vòng trên chỉ vàng (回転), vệt sao
// quay hiện (hồi 2). 「角度の単位」: kim mọc từ tâm, quét một góc (đúng 1 rad — gieo trước c3, không ghi số);
// 「高校・数学II」 → 「弧度法」 → 「ラジアン」, cung của góc trên chỉ vàng sáng lên.
import { C, MIN, JP, CG, TAU, clamp, prog, lookup, outCubic, smooth, sk,
  ground, ring360, circleLine, needle, bead, engrave, telop, heading, strikeSteel, actCard, tag, measure } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const RING = [1180, 600, 300];
const KICK = '第二幕　円周率は「回転」の数';

export default class Turn {
  static ERA = 'tenkyu';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.START = L(46).start;
    this.FROM = Math.max(this.START - 2.6, L(45).end + 0.5);           // mở HỒI: lead 2.6
    this.NEXT = Math.max(L(51).start - 1.2, L(50).end + 0.5);         // FROM của c2 (vệt sao tắt trước chuyển cảnh)
    this.T = {
      ichi: w(46, 'いちばん'),
      gakkou: w(47, '学校'), en1: w(47, '円'), hanashi: w(47, '話'), en2: w(47, '円', 2), kazu: w(47, '数'), shizen: w(47, '自然'),
      l48: L(48).start, arimasen: w(48, 'ありません'), kaiten: w(48, '回転'), kazu48: w(48, '数'),
      l49: L(49).start, miru: w(49, '見る'), kakudo: w(49, '角度'), tani: w(49, '単位'), hitsuyou: w(49, '必要'),
      koukou: w(50, '高校'), wasure: w(50, '忘れて'), kodo: w(50, '弧度'), rad: w(50, 'ラジアン'), e50: L(50).end,
    };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.FROM + 0.35, 'hyoshigi'),                                 // thẻ hồi (actCard khắc từ START − 2.3, trước FROM: tiếng khi thẻ vào khung)
      c(this.START + 0.15, 'tick'),
      c(T.ichi, 'tick'), c(T.gakkou, 'tick'), c(T.en1, 'pen'), c(T.en2, 'tick'), c(T.shizen, 'tick'),
      c(T.arimasen, 'error'), c(T.kaiten, 'whoosh-long'),
      c(T.miru + 0.3, 'tick'), c(T.kakudo, 'pen'), c(T.tani, 'tick'),
      c(T.koukou, 'tick'), c(T.wasure, 'tick'), c(T.kodo, 'tick'), c(T.rad, 'pop'),
    ];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    const trails = 0.45 * smooth(prog(t, T.kaiten, T.kaiten + 1.6)) * (1 - smooth(prog(t, T.e50, this.NEXT - 0.05)));
    ground(g, 'tenkyu', t, { trails });

    // ── thẻ hồi + ① (câu hỏi mục lục được trả lời trọn ở hồi này) ──
    actCard(g, t, S, '第二幕', '円周率は「回転」の数');
    const up = outCubic(prog(t, S - 0.35, S + 0.25));
    if (t > S - 2.4 && up < 1) {
      g.save(); g.translate(0, -up * 760);
      const f = `700 34px ${MIN}`, wq = measure(g, 'なぜ ', f) + measure(g, '3.14', `600 44px ${CG}`) + measure(g, ' なのか', f), x0 = 960 - (wq + 52) / 2;
      tag(g, 1, x0 + 18, 694, prog(t, S - 1.0, S - 0.6), { r: 20 });
      engrave(g, [['なぜ ', f], ['3.14', `600 44px ${CG}`], [' なのか', f]], x0 + 52, 706, prog(t, S - 0.85, S - 0.4), f, C.dim, { spark: false });
      g.restore();
    }

    // ── vành (vật xuyên suốt) ──
    const [cx, cy, r] = RING, rot = t * 0.03;
    const kR = prog(t, S - 0.5, S + 0.9);
    if (kR <= 0) return;
    ring360(g, cx, cy, r, kR, { rot });
    heading(g, KICK, '円の数ではない', prog(t, S + 0.1, S + 1.4));

    // kim quay chậm (câu 46–47), rút về tâm trước khi 「円の数？」 khắc vào giữa vành
    const kN1 = Math.min(prog(t, T.ichi, T.ichi + 0.6), 1 - prog(t, T.en2 - 0.6, T.en2 - 0.1));
    if (kN1 > 0) needle(g, cx, cy, r * 0.82, Math.PI / 2 - (t - T.ichi) * 0.35, kN1);
    // 「円」: chỉ vàng được tô lại một vòng
    const kC = prog(t, T.en1, T.en1 + 0.9) * (1 - prog(t, T.arimasen, T.arimasen + 0.4));
    if (kC > 0) circleLine(g, cx, cy, r, kC, { w: 3.4 });

    // ── cột trái A (câu 46–47) — trượt trái ra lúc 「ありません」 ──
    const oA = out(t, T.arimasen + 0.2);
    if (oA < 1) {
      g.save(); g.translate(-900 * oA, 0);
      telop(g, 'いちばん大事なところ', 120, 400, prog(t, T.ichi - 0.1, T.ichi + 0.9), { size: 44 });
      engrave(g, '学校では', 124, 540, prog(t, T.gakkou, T.gakkou + 0.4), `500 30px ${JP}`, C.brass, { ls: 6, spark: false });
      telop(g, '円の話', 120, 640, prog(t, T.en1, T.hanashi + 0.5), { size: 48 });
      engrave(g, '自然な考え', 124, 770, prog(t, T.shizen - 0.1, T.shizen + 0.5), `500 32px ${JP}`, C.dim, { ls: 4 });
      g.restore();
    }

    // ── giữa vành: 「円の数？」 thép mờ → gạch thép → 「回転の数」 đồng (câu 47–48); trượt phải ra ở câu 49 ──
    const oB = out(t, T.l49 - 0.1, 0.7);
    if (t > T.en2 - 0.3 && oB < 1) {
      g.save(); g.translate(1000 * oB, 0);
      const fq = `700 84px ${MIN}`, yq = cy - 30;
      const Q = engrave(g, '円の数？', cx, yq, prog(t, T.en2 - 0.1, T.kazu + 0.5), fq, C.steelDim, { align: 'center' });
      strikeSteel(g, Q.x0 - 16, yq - 26, Q.x0 + Q.w + 16, yq - 34, prog(t, T.arimasen, T.arimasen + 0.35));
      engrave(g, '回転の数', cx, cy + 110, prog(t, T.kaiten, T.kazu48 + 0.4), `700 84px ${MIN}`, C.brassHi, { align: 'center' });
      g.restore();
    }
    // 回転: một hạt chạy trọn một vòng trên chỉ vàng (ngược chiều kim, từ đỉnh), để lại vệt rồi vệt rút
    const p = smooth(prog(t, T.kaiten, T.kaiten + 1.4)), tailP = smooth(prog(t, T.kaiten + 0.45, T.kaiten + 1.9));
    const kb = prog(t, T.kaiten - 0.2, T.kaiten) * (1 - prog(t, T.miru, T.miru + 0.3));
    if (kb > 0) {
      const a0 = Math.PI / 2, head = a0 + TAU * p, tail = a0 + TAU * tailP;
      if (head - tail > 0.01) { g.save(); g.strokeStyle = 'rgba(243,223,162,0.85)'; g.lineWidth = 4; g.lineCap = 'round';
        g.shadowColor = 'rgba(243,223,162,0.5)'; g.shadowBlur = 10; g.beginPath(); g.arc(cx, cy, r, -tail, -head, true); g.stroke(); g.restore(); }
      bead(g, cx + r * Math.cos(head), cy - r * Math.sin(head), 9, kb);
    }

    // ── câu 49–50: kim mọc lại từ tâm, quét một góc (= 1 rad) → 「角度の単位」; 弧度法 · ラジアン ──
    const kN2 = prog(t, T.l49 + 0.3, T.l49 + 0.9);                       // không khung trống (§63): kim mọc từ đầu câu 49
    if (kN2 > 0) {
      const ang = smooth(prog(t, T.kakudo, T.kakudo + 0.7));               // 0 → 1 rad
      const kw = prog(t, T.kakudo, T.kakudo + 0.3);
      if (kw > 0 && ang > 0) {
        g.save(); g.fillStyle = `rgba(217,164,65,${0.16 * kw})`; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r, 0, -ang, true); g.closePath(); g.fill();
        g.strokeStyle = C.brassHi; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 80, 0, -ang, true); g.stroke(); g.restore();
      }
      // radian: cung của góc trên chỉ vàng sáng lên
      const kr = prog(t, T.rad, T.rad + 0.6);
      if (kr > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 5; g.lineCap = 'round'; g.shadowColor = 'rgba(243,223,162,0.6)'; g.shadowBlur = 12;
        g.beginPath(); g.arc(cx, cy, r, 0, -ang * smooth(kr), true); g.stroke(); g.restore(); }
      g.save(); g.strokeStyle = 'rgba(217,164,65,0.7)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + r * outCubic(kN2), cy); g.stroke(); g.restore();
      needle(g, cx, cy, r * 0.9, ang, kN2);
      engrave(g, '？', cx + 120, cy - 40, prog(t, T.kakudo + 0.6, T.kakudo + 0.8) * (1 - prog(t, T.rad - 0.3, T.rad)), `700 40px ${MIN}`, C.ivory, { spark: false });
    }
    engrave(g, 'それを見るために', 124, 300, prog(t, T.l49 + 0.3, T.miru + 0.7), `500 30px ${JP}`, C.dim, { ls: 4, spark: false });
    telop(g, '角度の単位', 120, 420, prog(t, T.kakudo - 0.25, T.tani + 0.3), { size: 48 });
    engrave(g, '高校 ・ 数学II', 124, 560, prog(t, T.koukou, T.koukou + 0.5), `500 30px ${JP}`, C.brass, { ls: 6, spark: false });
    engrave(g, '多くの人が忘れる', 124, 616, prog(t, T.wasure - 0.1, T.wasure + 0.6), `500 30px ${JP}`, C.dim, { ls: 3, spark: false });
    telop(g, '弧度法', 120, 750, prog(t, T.kodo - 0.1, T.kodo + 0.6), { size: 56 });
    engrave(g, 'ラジアン', 124, 880, prog(t, T.rad, T.rad + 0.5), `700 64px ${MIN}`, C.brassHi, { ls: 6 });
  }
}
