// d2 · 4つのステップ (p2, câu 61–67). DNA カプセル: 4 viên mở nắp theo thứ tự きっかけ→行動→報酬→投資, mũi tên quay vòng về ①.
//  ① câu 61   điện thoại (kit phone s 0.7, viên lắc) — 「その箱は、スマホの中」
//  ② câu 62   ảnh bìa Hooked (thẻ acrylic) + 「ニール・イヤール」「習慣をつくる製品」; điện thoại rơi khỏi khung ở câu 63
//  ③ câu 63–66 4 viên nang ①②③④ trên hàng, mỗi viên mở nắp ở chữ của nó; mũi tên nối ①→②→③→④
//  ④ câu 67   đường quay vòng ④→①: viên đá (払ったお金) chạy dọc đường, 「また①へ」
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, outCubic, outBack, smooth, ground, capsule, phone, gem, telop, write, heading,
  photoTag, photoImages, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const XN = [800, 1090, 1380, 1670], YN = 470, RN = 62;
const NAMES = ['きっかけ', '行動', '報酬', '投資'];
const SUBS = [['期間限定イベント', 'まもなく終了'], ['ガチャの', 'ボタンを押す'], ['ばらばらの報酬', '当たりも外れも'], ['もう少し', '課金する']];
const TONES = ['sky', 'pink', 'mint', 'lav'];
const RY = 830, RX = 700;                                              // đường quay vòng: ④ xuống RY, sang trái tới RX, lên tới YN, vào ①

function arrow(g, pts, k, { w = 6, dash = null, col = C.mute } = {}) {  // đường gấp khúc vẽ dần theo k, đầu mũi tên ở cuối
  if (k <= 0) return;
  const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let need = tot * clamp(k), x = pts[0][0], y = pts[0][1], ang = 0;
  g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(x, y);
  for (let i = 1; i < pts.length && need > 0; i++) { const d = seg[i - 1], f = Math.min(1, need / d); x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f; y = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f; g.lineTo(x, y); need -= d; ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]); }
  g.stroke(); g.setLineDash([]);
  if (k >= 0.98) { g.fillStyle = col; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 22 * Math.cos(ang - 0.45), y - 22 * Math.sin(ang - 0.45)); g.lineTo(x - 22 * Math.cos(ang + 0.45), y - 22 * Math.sin(ang + 0.45)); g.closePath(); g.fill(); }
  g.restore();
}
function along(pts, f) {                                               // điểm tại phần f của đường gấp khúc
  const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let need = tot * clamp(f); for (let i = 1; i < pts.length; i++) { if (need <= seg[i - 1] || i === pts.length - 1) { const u = Math.min(1, need / seg[i - 1]); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u]; } need -= seg[i - 1]; }
}
const BACK = [[XN[3], 740], [XN[3], RY], [RX, RY], [RX, YN], [XN[0] - RN - 14, YN]];

export default class Hooked {
  static ERA = 'studio';
  static IMAGES = photoImages('hooked');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.START = L(61).start;
    this.FROM = Math.max(this.START - 1.2, L(60).end + 0.5);
    this.T = {
      l61: L(61).start, sumaho: w(61, 'スマホ'),
      neal: w(62, 'ニール'), shuukan: w(62, '習慣'), yottsu62: w(62, '4つ'), e62: L(62).end,
      n: [w(63, '1つ目'), w(64, '2つ目'), w(65, '3つ目'), w(66, '4つ目')],
      open: [w(63, 'きっかけ'), w(64, '行動'), w(65, '報酬'), w(66, '投資')],
      sub: [w(63, '期間'), w(64, 'ガチャ'), w(65, '当たる'), w(66, 'もう')],
      sude: w(67, 'すでに'), harai: w(67, '払った'), okane: w(67, 'お金'), mata: w(67, 'また'), hito: w(67, '1つ目'), tsure: w(67, '連れ戻します'), end: L(67).end,
    };
    this.DROPA = L(62).end + 0.2;                                      // điện thoại + ảnh bìa rời bớt khi vòng lặp bắt đầu
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.neal + 3.5, 'tick'), c(T.open[1] + 0.2, 'tick'), c(T.open[3] + 0.3, 'tick'), c(T.open[1] - 4.0, 'tick'), c(T.sumaho, 'pen'), c(T.neal - 0.25, 'card'), c(T.shuukan, 'pen'), c(T.n[0] + 0.1, 'pop'), c(T.open[0], 'tick'),
      c(T.n[1] + 0.1, 'pop'), c(T.n[2] + 0.1, 'pop'), c(T.open[2], 'tick'), c(T.n[3] + 0.1, 'pop'), c(T.harai, 'coin'), c(T.mata, 'soroban'), c(T.tsure + 0.15, 'tick')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 3, '4つのステップ', prog(t, F + 0.3, F + 1.3));
    // ảnh bìa Hooked (ở lại cả cảnh)
    photoTag(g, 'hooked', 150, 290, 460, 480, prog(t, F + 0.6, F + 1.3), { zoom: 1 + 0.06 * prog(t, F + 0.6, T.end), focus: [0.5, 0.2], rot: -0.03 });
    telop(g, 'ニール・イヤール', 380, 940, prog(t, T.neal, T.neal + 0.7), { size: 40 });
    // điện thoại + telop (rơi khỏi khung ở câu 63)
    const dA = out(t, this.DROPA, 0.7);
    if (dA < 1) {
      g.save(); g.translate(0, 1100 * dA);
      phone(g, 1100, 290, prog(t, F + 0.3, F + 1.0), { s: 0.7, state: 'spin', t });
      telop(g, 'その箱は、スマホの中', 1100, 232, prog(t, T.l61 - 0.1, T.sumaho + 0.6), { size: 44 });
      g.restore();
    }
    if (t > T.shuukan - 0.1 && dA < 1) { g.save(); g.translate(0, 1100 * dA); telop(g, '習慣をつくる製品', 1100, 876, prog(t, T.shuukan - 0.1, T.shuukan + 0.6), { size: 44 }); g.restore(); }
    // 4 viên + mũi tên
    NAMES.forEach((nm, i) => {
      const x = XN[i], kc = prog(t, T.n[i], T.n[i] + 0.5), o = prog(t, T.open[i] - 0.05, T.open[i] + 0.5);
      if (kc <= 0) return;
      if (i) arrow(g, [[XN[i - 1] + RN + 12, YN], [x - RN - 14, YN]], prog(t, T.n[i] - 0.2, T.n[i] + 0.35), { w: 6 });
      capsule(g, x, YN, RN, kc, { tone: TONES[i], rot: -0.45 + 0.08 * Math.sin(t * 1.3 + i), open: o, ground: false });
      g.fillStyle = C.white; g.beginPath(); g.arc(x - 56, YN - 66, 30 * outCubic(kc), 0, TAU); g.fill(); g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke();
      write(g, String(i + 1), x - 56, YN - 53, kc, { font: `700 36px ${JP}`, align: 'center' });
      telop(g, nm, x, 596, prog(t, T.open[i] - 0.05, T.open[i] + 0.6), { size: 44 });
      const ks = prog(t, T.sub[i], T.sub[i] + 0.5);
      SUBS[i].forEach((s, j) => write(g, s, x, 690 + j * 40, clamp(ks * 2 - j * 0.6), { font: `600 30px ${JP}`, color: '@dim', align: 'center' }));
    });
    // đường quay vòng: ④ → ①, viên đá (お金) chạy theo
    const kb = prog(t, T.mata - 0.4, T.hito + 0.5);
    if (kb > 0) {
      arrow(g, BACK, kb, { w: 7, dash: [2, 14] });
      for (let j = 0; j < 4; j++) { const f = clamp((kb * 1.3 - j * 0.14)); if (f > 0 && f < 1) { const [px, py] = along(BACK, f); gem(g, px, py - 2, 17, 1); } }
    }
    if (t < T.hito - 0.05) telop(g, 'すでに払ったお金', 1230, 910, prog(t, T.harai - 0.1, T.okane + 0.5), { size: 44 });
    else telop(g, 'また 1つ目 へ', 1230, 910, prog(t, T.hito - 0.05, T.hito + 0.6), { size: 44 });
    const kt = prog(t, T.tsure - 0.3, T.tsure + 0.5);
    if (kt > 0) { const f = 1 + 0.06 * Math.sin(kt * Math.PI); g.save(); g.translate(XN[0], YN); g.scale(f, f); g.globalAlpha = 0.9 * (1 - kt) + 0.1; g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, RN + 18, 0, TAU * clamp(kt * 1.2)); g.stroke(); g.restore(); }
  }
}
