// f1 · 誰もが信じていた直線 (p2, câu 64–67) — mở hồi 5「非線形効果」. DNA f1: hai thanh mọc RA TỪ gương (右 75% azure sang
// phải, 左 25% hổ phách sang trái) → bản sao nét đứt của thanh trái lật qua gương, triệt phần đầu thanh phải → 「差 50%」;
// 「鏡像体過剰率」=「かたより」 (bên trái); hai thanh sập xuống trục → đồ thị đối xứng (kit.graph, gương = trục dọc), chấm ở
// 触媒 50%, gióng lên đường thẳng y = |x| 「一本の直線」. Khung CUỐI được f2-kagan vẽ lại y hệt (f2 CONTINUES) — xem finalState.
import { MX, clamp, prog, lookup, must, outCubic, smooth, ground, telop, title, actCard, actCues, actTimes, graph, cue, C, TAU } from '../kit.js';

const BY = 600, BH = 44, P = 400;                       // thanh: tâm y, dày; 100% = pw của graph (400)
// ── phần CHUNG với f2 (chép y hệt): thuật ngữ trái, đồ thị, đường gióng, chấm, 「一本の直線」 ──
function terms(g, k1, k2) {
  telop(g, '鏡像体過剰率', 120, 330, k1, { size: 52, mincho: true });
  telop(g, '＝「かたより」', 120, 410, k2, { size: 52, mincho: true });
}
function guides(g, G, kv, kh, ku, kd) {
  g.save(); g.setLineDash([8, 8]); g.strokeStyle = C.silver; g.lineWidth = 2;
  if (kv > 0) { g.beginPath(); g.moveTo(G.sx(0.5), G.sy(0)); g.lineTo(G.sx(0.5), G.sy(0.5 * kv)); g.stroke(); }
  if (kh > 0) { g.beginPath(); g.moveTo(G.sx(0.5), G.sy(0.5)); g.lineTo(G.sx(0.5) + (MX - G.sx(0.5)) * kh, G.sy(0.5)); g.stroke(); }
  g.restore();
  if (kd > 0) { const x = G.sx(0.5), y = G.sy(0.5 * ku), r = 10 * outCubic(kd);
    g.save(); g.fillStyle = C.text; g.strokeStyle = C.bg; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.stroke(); g.restore(); }
}

export default class Chokusen {
  static ERA = 'mirror';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      migi: w(64, '右'), p75: w(64, '75%'), hidari: w(64, '左'), p25: w(64, '25%'), sa: w(64, '差'), p50: w(64, '50%'),
      sa65: w(65, '差'), kyozo: w(65, '鏡像'), ritsu: w(65, '率'), katayori: w(65, 'かたより'),
      l66: S(66),
      shokubai: w(67, '触媒'), bunshi: w(67, '分子'), ippon: w(67, '一本'), chokusen: w(67, '直線'), tsunagaru: w(67, 'つながる'), hazu: w(67, 'はず'), end: E(67),
    };
    this.START = S(64);
    this.FROM = Math.max(this.START - 2.6, E(63) + 0.5);          // mở hồi 5
    this.TA = actTimes(this.FROM, this.START).o1 - 0.2;
    must('75 - 25', 50); must('0.75 * 400', 300); must('0.25 * 400', 100);
  }
  sfx() {
    const T = this.T;
    return [                                                       // ≤ 10.7 cả cảnh (gồm actCues + whoosh/shimmer trang tự thêm)
      ...actCues(this.FROM, this.START),
      cue(T.p25, 'telop', -4), cue(T.p50, 'telop'), cue(T.kyozo, 'telop', -4), cue(T.katayori, 'telop'),
      cue(T.shokubai, 'tick', -6), cue(T.bunshi, 'pen', -8), cue(T.ippon, 'pen'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    title(g, '誰もが信じていた直線', t, this.TA);
    terms(g, prog(t, T.kyozo, T.ritsu + 0.4), prog(t, T.katayori, T.katayori + 0.5));

    // ── hai thanh 75 / 25 → 差 50% (câu 64), sập xuống trục ở câu 66 ──
    const kc = smooth(prog(t, T.l66 - 0.3, T.l66 + 0.4));
    if (t > this.FROM + 0.3 && kc < 1) {
      g.save(); g.translate(0, BY + (800 - BY) * kc); g.scale(1, 1 - 0.98 * kc); g.translate(0, -BY);
      const kt = outCubic(prog(t, this.FROM + 0.3, this.FROM + 0.9));       // máng rỗng ±100% mọc từ gương (khung mở không trống)
      if (kt > 0) { g.save(); g.strokeStyle = 'rgba(201,210,224,0.45)'; g.lineWidth = 2; g.strokeRect(MX - P * kt, BY - BH / 2, 2 * P * kt, BH);
        g.fillStyle = 'rgba(42,50,70,0.5)'; g.fillRect(MX - P * kt, BY - BH / 2, 2 * P * kt, BH); g.restore(); }
      const kR = outCubic(prog(t, T.migi - 0.1, T.p75 + 0.4)), kL = outCubic(prog(t, T.hidari - 0.1, T.p25 + 0.4));
      g.fillStyle = C.R; g.fillRect(MX, BY - BH / 2, 0.75 * P * kR, BH);
      g.fillStyle = C.L; g.fillRect(MX - 0.25 * P * kL, BY - BH / 2, 0.25 * P * kL, BH);
      telop(g, '右 75%', MX + 0.75 * P + 24, BY + 16, prog(t, T.p75, T.p75 + 0.4), { size: 44, color: '@R' });
      telop(g, '左 25%', MX - 0.25 * P - 24, BY + 16, prog(t, T.p25, T.p25 + 0.4), { size: 44, color: '@L', align: 'right' });
      // 差: bản sao nét đứt (bạc, trung tính) của thanh trái lật qua gương, phủ tối 25% đầu thanh phải
      const kg = smooth(prog(t, T.sa - 0.1, T.sa + 0.6));
      if (kg > 0) {
        const kd = prog(t, T.sa + 0.4, T.sa + 0.8);
        if (kd > 0) { g.fillStyle = `rgba(14,20,36,${0.62 * kd})`; g.fillRect(MX, BY - BH / 2, 0.25 * P, BH); }
        const x1 = MX + (-1 + 2 * kg) * 0.25 * P;
        g.save(); g.setLineDash([10, 7]); g.strokeStyle = C.silver; g.lineWidth = 3; g.strokeRect(Math.min(MX, x1), BY - BH / 2 - 6, Math.abs(x1 - MX), BH + 12); g.restore();
      }
      const kb = outCubic(prog(t, T.p50 - 0.2, T.p50 + 0.3));
      if (kb > 0) { const a = MX + 0.25 * P, b = MX + 0.75 * P, y = BY - 46;
        const pu = Math.sin(Math.PI * prog(t, T.sa65 - 0.1, T.sa65 + 0.7));   // 「この右と左の差」: ngoặc nháy dày lên
        g.save(); g.strokeStyle = C.text; g.lineWidth = 3 + 4 * pu; g.lineCap = 'round'; g.beginPath(); g.moveTo(a, y + 12); g.lineTo(a, y); g.lineTo(a + (b - a) * kb, y);
        if (kb >= 1) g.lineTo(b, y + 12); g.stroke(); g.restore(); }
      telop(g, '差 50%', MX + 0.5 * P, BY - 66, prog(t, T.p50, T.p50 + 0.5), { size: 48, align: 'center' });
      g.restore();
    }

    // ── đồ thị (câu 66–67): trục → chấm ở 触媒 50% → gióng → 一本の直線 ──
    const G = graph(g, { axes: prog(t, T.l66, T.l66 + 0.8), line: prog(t, T.ippon - 0.1, T.chokusen + 0.6) });
    const ku = smooth(prog(t, T.tsunagaru - 0.2, T.tsunagaru + 0.6));
    guides(g, G, prog(t, T.bunshi, T.ippon), prog(t, T.hazu - 0.1, T.hazu + 0.5), ku, prog(t, T.l66 + 0.2, T.l66 + 0.5));
    const pr = prog(t, T.shokubai, T.shokubai + 0.7);                        // nháy vòng ở 触媒
    if (pr > 0 && pr < 1) { g.save(); g.strokeStyle = `rgba(237,230,214,${1 - pr})`; g.lineWidth = 3; g.beginPath(); g.arc(G.sx(0.5), G.sy(0), 12 + 26 * pr, 0, TAU); g.stroke(); g.restore(); }
    telop(g, '一本の直線', 1400, 330, prog(t, T.chokusen, T.chokusen + 0.5), { size: 52, mincho: true });

    actCard(g, t, this.FROM, this.START, 5);
  }
}
