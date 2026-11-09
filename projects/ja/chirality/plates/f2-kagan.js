// f2 · カガンの曲線 (p2, câu 68–71). CONTINUES: khung đầu = khung CUỐI của f1-chokusen (đồ thị + đường thẳng + chấm 50% +
// 「一本の直線」 + thuật ngữ trái + tiêu đề f1) — terms()/guides() chép Y HỆT từ f1. Rồi: tiêu đề cũ trượt lên, 「カガンの曲線」
// lật gương; 1986年・カガンさんたち (trái); vạch tỉ lệ xúc tác trên trục (いろいろに変えて) → điểm thí nghiệm (minh hoạ)
// trồi lên NẰM TRÊN đường thẳng → gạch 「一本の直線」 (error) + 「上にふくらむ曲線」 ngay dưới; đường cong f (nhãn モデル);
// x = 50%: chấm thẳng 50% → mũi tên lên 80% (f(0.5), must); 「非線形効果」.
import { MX, clamp, prog, lookup, must, outCubic, smooth, hash, ground, telop, wrong, strike, title, graph, arrow,
  f, cue, C, TAU, measure, write, JP } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// ── phần CHUNG với f1 (chép y hệt) ──
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
// nhãn 「モデル」: thẻ nền xương, chữ tối (DNA §9 — số mô hình không trộn với số thí nghiệm)
function tag(g, s, x, y, k) {
  if (k <= 0) return;
  const w = measure(g, s, `700 28px ${JP}`) + 28, e = outCubic(clamp(k));
  g.save(); g.globalAlpha = e; g.fillStyle = C.bone; g.beginPath(); g.roundRect(x, y - 30, w, 40, 8); g.fill(); g.restore();
  write(g, s, x + 14, y, k, { font: `700 28px ${JP}`, color: C.bg, shadow: false });
}
// điểm thí nghiệm MINH HOẠ (không số): tỉ lệ xúc tác 10…100% hai phía, nằm quanh đường cong mô hình (lệch nhỏ theo hash)
const XS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const YS = XS.map((x, i) => x === 0.5 || x === 1 ? f(x) : Math.min(0.99, f(x) + (hash(i * 7.1 + 3) - 0.5) * 0.05));

export default class Kagan {
  static ERA = 'mirror';
  static POSES = [];
  CONTINUES = true;
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      y1986: w(68, '1986年'), kagan: w(68, 'カガンさんたち'), wariai: w(68, '割合'), iroiro: w(68, 'いろいろ'), kaete: w(68, '変えて'), jikken: w(68, '実験'),
      ten: w(69, '点'), hazure: w(69, '外れて'), ue: w(69, '上'), fukuran: w(69, 'ふくらんだ'), kyokusen: w(69, '曲線'), egaki: w(69, '描きました'),
      chiisai: w(70, '小さい'), sore: w(70, 'それ'), ookii: w(70, '大きかった'),
      hisenkei: w(71, '非線形'), koka: w(71, '効果'), end: E(71),
    };
    this.START = S(68);
    this.FROM = Math.max(this.START - 1.2, E(67) + 0.5);
    must(`${Math.round(f(0.5) * 100)}`, 80);                         // mô hình: xúc tác 50% → phân tử 80%
    must(`${YS.every((y, i) => XS[i] === 1 || y > XS[i])}`, true);                  // mọi điểm (trừ 100%) nằm TRÊN đường thẳng
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.8, 'flip', -6), cue(T.y1986, 'telop'), cue(T.kagan, 'pop', -6), cue(T.iroiro, 'tick', -4), cue(T.jikken, 'glass'),
      cue(T.hazure, 'mismatch'), cue(T.kyokusen, 'pen'), cue(T.chiisai, 'telop', -4), cue(T.ookii, 'telop'), cue(T.hisenkei, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    // tiêu đề: cũ (f1, đã xong) trượt lên khỏi khung, mới lật gương
    const oT = out(t, F + 0.3, 0.4);
    if (oT < 1) { g.save(); g.beginPath(); g.rect(0, 64, 1920, 1016); g.clip(); g.translate(0, -170 * oT); title(g, '誰もが信じていた直線', t, F - 100); g.restore(); }
    if (t >= F + 0.5) title(g, 'カガンの曲線', t, F + 0.5);
    g.save(); g.translate(-760 * out(t, F + 0.3, 0.5), 0); terms(g, 1, 1); g.restore();

    // ── trái: 1986年 · カガンさんたち → 非線形効果 ──
    telop(g, '1986年', 120, 340, prog(t, T.y1986, T.y1986 + 0.5), { size: 60 });
    telop(g, 'カガンさんたち', 120, 412, prog(t, T.kagan, T.kagan + 0.6), { size: 44, mincho: true });

    // ── đồ thị: đường cong (モデル) vẽ ở ふくらんだ曲線 ──
    const G = graph(g, { axes: 1, line: 1, curve: prog(t, T.fukuran - 0.1, T.egaki + 0.3) });
    // vạch tỉ lệ xúc tác trên trục (いろいろに変えて), hai phía
    for (let i = 0; i < XS.length; i++) {
      const kk = outCubic(prog(t, T.wariai + i * 0.12, T.wariai + i * 0.12 + 0.3));
      if (kk <= 0) continue;
      for (const s of [-1, 1]) { g.fillStyle = s < 0 ? C.L : C.R; g.fillRect(G.sx(s * XS[i]) - 2, G.sy(0) - 14 * kk, 4, 14 * kk); }
    }
    // khe giữa đường thẳng và điểm (外れて)
    const kg = prog(t, T.hazure, T.hazure + 0.6);
    if (kg > 0) { g.save(); g.setLineDash([4, 6]); g.strokeStyle = 'rgba(201,210,224,0.8)'; g.lineWidth = 2;
      for (let i = 0; i < XS.length - 1; i++) for (const s of [-1, 1]) { const x = G.sx(s * XS[i]); g.beginPath(); g.moveTo(x, G.sy(XS[i])); g.lineTo(x, G.sy(XS[i]) + (G.sy(YS[i]) - G.sy(XS[i])) * kg); g.stroke(); }
      g.restore(); }
    // điểm thí nghiệm trồi từ trục lên (実験しました)
    for (let i = 0; i < XS.length; i++) {
      const kk = smooth(prog(t, T.jikken + i * 0.1, T.jikken + i * 0.1 + 0.6));
      if (kk <= 0) continue;
      const fl = prog(t, T.ten, T.ten + 0.5), r = 8 + 4 * Math.sin(Math.PI * fl);
      for (const s of [-1, 1]) { g.save(); g.fillStyle = s < 0 ? C.L : C.R; g.strokeStyle = C.bg; g.lineWidth = 2.5;
        g.beginPath(); g.arc(G.sx(s * XS[i]), G.sy(YS[i] * kk), r, 0, TAU); g.fill(); g.stroke(); g.restore(); }
    }
    arrow(g, [[G.sx(0.3) + 22, G.sy(0.3) - 4], [G.sx(0.3) + 22, G.sy(YS[2]) + 10]], prog(t, T.ue - 0.1, T.ue + 0.5), { color: C.silver, w: 3, head: 12 });
    // chấm 50% trên đường thẳng (từ f1) + mũi tên lên 80% (câu 70)
    guides(g, G, 1, 1, 1, 1);
    arrow(g, [[G.sx(0.5) + 18, G.sy(0.5) - 6], [G.sx(0.5) + 18, G.sy(f(0.5)) + 6]], prog(t, T.sore - 0.1, T.ookii + 0.3), { color: C.R, w: 4, head: 14 });

    // ── phải: 「一本の直線」 bị gạch → 「上にふくらむ曲線」 ngay dưới; 50% → 80% ──
    const ks = prog(t, T.hazure, T.hazure + 0.5);
    const box = (ks > 0 ? wrong : telop)(g, '一本の直線', 1400, 330, 1, { size: 52, mincho: true });
    strike(g, box, ks);
    telop(g, '上にふくらむ曲線', 1400, 420, prog(t, T.kyokusen, T.kyokusen + 0.6), { size: 48, mincho: true });
    telop(g, '（曲線：モデル）', 1400, 472, prog(t, T.egaki, T.egaki + 0.5), { size: 28, color: '@dim' });
    telop(g, '触媒　50%', 1400, 600, prog(t, T.chiisai - 0.2, T.chiisai + 0.4), { size: 44 });
    telop(g, '分子　80%', 1400, 670, prog(t, T.ookii - 0.2, T.ookii + 0.4), { size: 44, color: '@R' });
    tag(g, 'モデル', 1400, 728, prog(t, T.ookii + 0.2, T.ookii + 0.6));
    telop(g, '（点：イメージ）', 1400, 512, prog(t, T.ten, T.ten + 0.5), { size: 28, color: '@dim' });

    // ── 非線形効果 (câu 71) ──
    telop(g, '非線形効果', 120, 640, prog(t, T.hisenkei, T.koka + 0.4), { size: 72, mincho: true });
  }
}
