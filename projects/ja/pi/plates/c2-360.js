// c2 · 360という数 (p2 câu 51–54). DNA c2: vành 360 vạch sáng lần lượt khi kim quay trọn một vòng (số chạy 0 → 360);
// 「数学的な理由」は ない · 「人が選んだ数」; 60 ひとまとまり: vạch tắt rồi sáng lại từng cụm 60 theo sáu nan đồng
// (60 × 6 = 360 — 古代バビロニアの天文学); lưới ước số khắc (code đếm: 24 ô) → 「24通り」, 「1年の日数にも近い」,
// 「とても便利」 → 「約束ごと」 khắc giữa vành. Vành đứng yên (đọc số độ trên vành).
import { C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, needle, pivot, engrave, telop, heading, rule } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
export const RING2 = [760, 620, 300];
const KICK = '第二幕　円周率は「回転」の数';
const DIV = Array.from({ length: 360 }, (_, i) => i + 1).filter(d => 360 % d === 0);
must(`${DIV.length}`, 24);
must('60 * 6', 360);

// vạch sáng (đồng sáng) đè lên vạch khắc của ring360 cho các độ d < n (cùng hình học, rot = 0)
function litTicks(g, cx, cy, G, n, a = 1) {
  if (n <= 0 || a <= 0) return;
  const { r1 } = G, big = r1 - G.r0 >= 34, L = big ? [15, 10, 6] : [10, 7, 4];
  g.save(); g.globalAlpha = a; g.shadowColor = 'rgba(243,223,162,0.8)'; g.shadowBlur = 8;
  g.strokeStyle = C.brassHi; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r1 + 9, 0, -Math.min(360, n) * Math.PI / 180, true); g.stroke();
  g.strokeStyle = C.ivory;
  for (let d = 0; d < Math.min(360, n); d++) {
    const ang = -d * Math.PI / 180, c = Math.cos(ang), s = Math.sin(ang), l = d % 10 === 0 ? L[0] : d % 5 === 0 ? L[1] : L[2];
    g.lineWidth = d % 10 === 0 ? 2.4 : 1.6; g.beginPath(); g.moveTo(cx + (r1 - 3) * c, cy + (r1 - 3) * s); g.lineTo(cx + (r1 - 3 - l) * c, cy + (r1 - 3 - l) * s); g.stroke();
  }
  g.restore();
}

export default class Deg360 {
  static ERA = 'tenkyu';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.START = L(51).start;
    this.FROM = Math.max(this.START - 1.2, L(50).end + 0.5);
    this.NEXT = Math.max(L(55).start - 1.2, L(54).end + 0.5);
    this.T = {
      do: w(51, '度'), kai: w(51, '1回転'), n360: w(51, '360'), do2: w(51, '度', 2),
      l52: L(52).start, n360b: w(52, '360'), suugaku: w(52, '数学的'), riyuu: w(52, '理由'), arimasen: w(52, 'ありません'), hito: w(52, '人'), eranda: w(52, '選んだ'),
      l53: L(53).start, n60: w(53, '60'), matomari: w(53, 'ひとまとまり'), kazoeta: w(53, '数えた'), kodai: w(53, '古代'), tenmon: w(53, '天文学'), yurai: w(53, '由来'), kangae: w(53, '考えられて'),
      l54: L(54).start, tori: w(54, '24通り'), warikire: w(54, '割り切れて'), nen: w(54, '年'), chikai: w(54, '近い'), benri: w(54, '便利'), akumade: w(54, 'あくまで'), yakusoku: w(54, '約束ごと'), e54: L(54).end,
    };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.START + 0.1, 'tick'), c(T.do, 'tick'),
      c(T.kai + 0.05, 'soroban'), c(T.kai + 0.75, 'soroban'), c(T.do2, 'tick'),
      c(T.suugaku, 'tick'), c(T.arimasen, 'tick'), c(T.eranda, 'tick'),
      c(T.n60 + 0.1, 'pen'), c(T.matomari, 'soroban'), c(T.matomari + 1.0, 'tick'),
      c(T.kodai + 0.4, 'tick'), c(T.kangae, 'tick'),
      c(T.tori, 'tick'), c(T.tori + 0.3, 'soroban'), c(T.tori + 1.0, 'soroban'),
      c(T.nen, 'tick'), c(T.benri, 'tick'), c(T.yakusoku, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    const trails = 0.4 * smooth(prog(t, this.FROM + 0.9, this.FROM + 2.2)) * (1 - smooth(prog(t, T.e54, this.NEXT - 0.05)));
    ground(g, 'tenkyu', t, { trails });
    const [cx, cy, r] = RING2;
    const G = ring360(g, cx, cy, r, 1);
    heading(g, KICK, '360という数', prog(t, S, S + 1.2));

    // ── vạch sáng: kim quay trọn một vòng (câu 51) → tắt ở 「60」 → sáng lại từng cụm 60 (câu 53) ──
    const sweep = smooth(prog(t, T.kai, T.n360 + 0.75));
    const spokes = i => prog(t, T.n60 + 0.1 + i * 0.2, T.n60 + 0.4 + i * 0.2);
    const grp = Array.from({ length: 6 }, (_, i) => prog(t, T.matomari + i * 0.17, T.matomari + i * 0.17 + 0.05)).reduce((a, b) => a + (b >= 1 ? 1 : 0), 0);
    const off = prog(t, T.n60 - 0.3, T.n60);
    litTicks(g, cx, cy, G, off < 1 ? 360 * sweep : 60 * grp, off < 1 ? 1 - off : 1);
    const kNeedle = prog(t, this.FROM + 0.3, this.FROM + 0.9) * (1 - prog(t, T.n60 - 0.4, T.n60));
    if (kNeedle > 0) needle(g, cx, cy, r * 0.9, TAU * sweep, kNeedle);

    // số chạy 0 → 360 giữa vành → 「360°」; trượt lên ra ở 「60」
    const o1 = out(t, T.n60 - 0.5, 0.5);
    if (t > T.kai - 0.1 && o1 < 1) {
      g.save(); g.translate(0, -560 * o1);
      const done = sweep >= 1, v = done ? 360 : Math.round(360 * sweep);
      if (done) must(`${DIV.at(-1)}`, 360);
      engrave(g, [[String(v), `600 150px ${CG}`, C.brassHi], ['°', `500 96px ${JP}`, C.brassHi]], cx, cy + 200, 1, undefined, C.brassHi, { align: 'center', spark: false });
      rule(g, cx - 130, cx + 130, cy + 232, prog(t, T.n360b, T.n360b + 0.6));
      g.restore();
    }

    // ── 60 ずつ: sáu nan đồng + nhãn 60 mỗi múi (câu 53) — rút về tâm ở câu 54 cuối ──
    const kOut6 = prog(t, T.akumade - 0.5, T.akumade);
    for (let i = 0; i < 6; i++) {
      const k = spokes(i) * (1 - kOut6); if (k <= 0) continue;
      const a = -i * Math.PI / 3, e = outCubic(k);
      g.save(); g.strokeStyle = C.brass; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + r * e * Math.cos(a), cy + r * e * Math.sin(a)); g.stroke(); g.restore();
      const am = a - Math.PI / 6, kf = prog(t, T.matomari + i * 0.17, T.matomari + i * 0.17 + 0.3) * (1 - kOut6);
      if (kf > 0) { g.save(); g.fillStyle = `rgba(217,164,65,${0.07 + 0.06 * (i % 2)})`; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r * e, a - Math.PI / 3, a); g.closePath(); g.fill(); g.restore(); }
      engrave(g, '60', cx + 195 * Math.cos(am), cy + 195 * Math.sin(am) + 15, prog(t, T.n60 + 0.3 + i * 0.2, T.n60 + 0.5 + i * 0.2) * (1 - kOut6), `600 44px ${CG}`, C.brassHi, { align: 'center', spark: false });
    }
    if (spokes(0) > 0) pivot(g, cx, cy);

    // 「約束ごと」 khắc giữa vành (kết luận, xong trước hết câu cuối)
    telop(g, [['約束ごと', `700 72px ${MIN}`]], cx, cy + 26, prog(t, T.yakusoku - 0.15, T.yakusoku + 0.5), { size: 72, align: 'center' });

    // ── cột phải ──
    const X = 1220;
    const oA = out(t, T.n60 - 0.5);
    if (oA < 1) {
      g.save(); g.translate(720 * oA, 0);
      telop(g, [['角度の単位 ', `700 36px ${MIN}`, C.dim], ['度', `700 52px ${MIN}`], [' °', `600 56px ${CG}`, C.brassHi]], X, 400, prog(t, T.do - 0.1, T.do + 0.5), { size: 52 });
      engrave(g, [['1回転 = ', `700 40px ${MIN}`], ['360', `600 56px ${CG}`, C.brassHi], ['°', `600 56px ${CG}`, C.brassHi]], X + 4, 520, prog(t, T.kai, T.do2 + 0.2), undefined, C.ivory);
      const R = telop(g, '数学的な理由', X, 660, prog(t, T.suugaku - 0.1, T.riyuu + 0.4), { size: 40 });
      engrave(g, 'は、ない', R.x + R.w + 18, 660, prog(t, T.arimasen, T.arimasen + 0.4), `700 40px ${MIN}`, C.ivory);
      telop(g, '人が選んだ数', X, 790, prog(t, T.hito - 0.1, T.eranda + 0.5), { size: 48, color: C.brassHi });
      g.restore();
    }
    const oB = out(t, T.l54 - 0.4);
    if (t > T.n60 && oB < 1) {
      g.save(); g.translate(720 * oB, 0);
      engrave(g, [['60', `600 60px ${CG}`, C.brassHi], [' × ', `500 52px ${CG}`, C.dim], ['6', `600 60px ${CG}`], [' = ', `500 52px ${CG}`, C.dim], ['360', `600 60px ${CG}`, C.brassHi]], X + 4, 420, prog(t, T.matomari + 0.9, T.matomari + 1.4), undefined, C.ivory);
      engrave(g, '60 ずつ数えた', X + 4, 510, prog(t, T.kazoeta, T.kazoeta + 0.5), `500 30px ${JP}`, C.brass, { ls: 4, spark: false });
      telop(g, '古代バビロニアの天文学', X, 640, prog(t, T.kodai - 0.1, T.tenmon + 0.5), { size: 40 });
      engrave(g, 'に由来すると考えられている', X + 4, 730, prog(t, T.yurai, T.kangae + 0.6), `500 30px ${JP}`, C.dim, { ls: 2, spark: false });
      g.restore();
    }
    // ── câu 54: 360 の約数 (lưới khắc, code đếm) ──
    if (t > T.l54 - 0.3) {
      engrave(g, '360 を割り切る数', X + 4, 330, prog(t, T.l54, T.l54 + 0.6), `500 28px ${JP}`, C.brass, { ls: 4, spark: false });
      const cw = 92, ch = 54, gx = 8, gy = 10, y0 = 360;
      DIV.forEach((d, i) => {
        const k = prog(t, T.tori + 0.05 + i * 0.055, T.tori + 0.25 + i * 0.055); if (k <= 0) return;
        const x = X + (i % 6) * (cw + gx), y = y0 + Math.floor(i / 6) * (ch + gy);
        g.save(); g.globalAlpha = 0.9; g.strokeStyle = C.brass; g.lineWidth = 1.2; g.fillStyle = 'rgba(5,10,28,0.55)';
        g.beginPath(); g.rect(x, y, cw, ch * outCubic(k)); g.fill(); g.stroke(); g.restore();
        engrave(g, String(d), x + cw / 2, y + 37, clamp((k - 0.4) / 0.6), `500 28px ${MONO}`, C.ivory, { align: 'center', spark: false });
      });
      telop(g, [['24', `600 64px ${CG}`, C.brassHi], ['通り', `700 44px ${MIN}`]], X, 700, prog(t, T.tori - 0.1, T.tori + 0.5), { size: 48 });
      engrave(g, '1年の日数にも近い', X + 4, 820, prog(t, T.nen - 0.3, T.chikai + 0.3), `700 38px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, 'とても便利', X + 4, 900, prog(t, T.benri - 0.2, T.benri + 0.4), `500 34px ${JP}`, C.brass, { ls: 6, spark: false });
    }
  }
}
