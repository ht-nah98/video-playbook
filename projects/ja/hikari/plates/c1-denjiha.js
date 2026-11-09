// c1 · 何が揺れているのか (p2 câu 18–22). ERA lab, mở hồi 2. Khe 'slit' ở y = 600; chùm bụi đi ngang qua giữa khung.
//  A (câu 18)  sóng trắng trôi trong chùm 「何が揺れている？」
//  B (câu 19–20) ảnh maxwell + 「1860年代」「電気と磁気の方程式」→「空間を伝わる波」 · 「その速さ ≈ 光の速さ」「ほぼ一致」
//  C (câu 21–22) sóng điện từ chiếu 3D: E dọc (ánh trắng), B ngang/sâu (nét xám, cùng pha), trục ⊥ · 「電磁波」 · 「真空の中でも進む」
import { C, TAU, clamp, prog, lookup, outCubic, smooth, ground, aperture, shaft, ray, wave, arrow, telop, title, actCard, actCues,
  actTimes, photo, imgs, plate, measure, cue, JP, MIN } from '../kit.js';

const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const Y0 = 600, XW0 = 620, XW1 = 1760, GX = 330;          // trục sóng, đầu/cuối sóng 3D, gốc "giàn trục" bên trái
const ZX = -0.75, ZY = 0.55;                                 // trục sâu (B) chiếu lên màn hình: xuống-trái

/** Dòng chữ có tấm tối sau (nằm trong chùm sáng). */
function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  telop(g, s, x, y, k, o);
}

/** Sóng điện từ chiếu xiên: E (đứng) = ánh trắng; B (sâu) = nét xám trung tính, cùng pha. */
function emWave(g, t, k) {
  if (k <= 0) return;
  const xe = XW0 + (XW1 - XW0) * clamp(k), A = 120, B = 140, lam = 285, step = 6;
  const arg = x => (x - XW0) / lam * TAU - t * 2.0, env = x => smooth(clamp((x - XW0) / 90));
  const Ep = x => [x, Y0 - A * env(x) * Math.sin(arg(x))], Bp = x => { const b = B * env(x) * Math.sin(arg(x)); return [x + ZX * b, Y0 + ZY * b]; };
  g.save();
  // mặt phẳng B (ngang) và E (đứng): tô rất nhạt để thấy ⊥
  g.fillStyle = 'rgba(154,149,140,0.07)'; g.beginPath(); g.moveTo(XW0, Y0);
  for (let x = XW0; x <= xe; x += step) g.lineTo(...Bp(x)); g.lineTo(xe, Y0); g.closePath(); g.fill();
  g.fillStyle = 'rgba(237,232,223,0.05)'; g.beginPath(); g.moveTo(XW0, Y0);
  for (let x = XW0; x <= xe; x += step) g.lineTo(...Ep(x)); g.lineTo(xe, Y0); g.closePath(); g.fill();
  g.lineWidth = 2;
  for (let x = XW0 + 24; x <= xe; x += 38) {                 // vector E (đứng) và B (sâu) tại mỗi x
    g.strokeStyle = 'rgba(237,232,223,0.28)'; g.beginPath(); g.moveTo(x, Y0); g.lineTo(...Ep(x)); g.stroke();
    g.strokeStyle = 'rgba(154,149,140,0.55)'; g.beginPath(); g.moveTo(x, Y0); g.lineTo(...Bp(x)); g.stroke();
  }
  g.strokeStyle = C.dim; g.lineWidth = 4; g.lineJoin = 'round'; g.lineCap = 'round'; g.beginPath();          // B
  for (let x = XW0; x <= xe; x += step) { const p = Bp(x); x === XW0 ? g.moveTo(...p) : g.lineTo(...p); } g.stroke();
  g.restore();
  const P = []; for (let x = XW0; x <= xe; x += step) P.push(Ep(x));
  if (P.length > 1) ray(g, P, { nm: 'white', w: 5, glow: 0.8 });
  g.save(); g.setLineDash([10, 10]); g.strokeStyle = 'rgba(154,149,140,0.7)'; g.lineWidth = 3; g.beginPath(); g.moveTo(XW0, Y0); g.lineTo(xe, Y0); g.stroke(); g.restore();   // trục đi
}

export default class Denjiha {
  static ERA = 'lab';
  static IMAGES = imgs('maxwell');
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1-denjiha');
    this.START = L(18).start;
    this.FROM = Math.max(this.START - 2.6, L(17).end + 0.5);          // mở hồi 2
    this.T = {
      nani: w(18, '何'), y1860: w(19, '1860年代'), denki: w(19, '電気'), kuukan: w(19, '空間'), l20: L(20).start, hayasa: w(20, '速さ', 1), icchi: w(20, '一致'),
      l21: L(21).start, denba: w(21, '電場'), jiba: w(21, '磁場'), nami21: w(21, '波'), denjiha: w(21, '電磁波'),
      tagai: w(22, 'たがい'), shinku: w(22, '真空'), end: L(22).end,
    };
    this.T.titleAt = actTimes(this.FROM, this.START).o1 - 0.2; this.T.cardEnd = actTimes(this.FROM, this.START).o1;
  }
  sfx() {
    const T = this.T;
    return [...actCues(this.FROM, this.START), cue(T.y1860 - 0.3, 'photo'), cue(T.denki, 'pen', -4), cue(T.kuukan, 'tick', -4), cue(T.hayasa, 'telop'),
      cue(T.icchi, 'correct', -6), cue(T.denba, 'beam'), cue(T.denjiha + 0.6, 'telop'), cue(T.shinku, 'whoosh', -8)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0 });
    // chùm bụi từ khe — luôn có từ FROM (khung đầu không trống); sang B mờ đi, sang C đậm lại; chân không → bụi tan
    const kB = prog(t, F + 0.1, F + 1.8), inB = out(t, T.y1860 - 0.4, 0.6) * (1 - out(t, T.l21 + 0.1, 0.8));
    const vac = prog(t, T.shinku, T.shinku + 1.6);
    shaft(g, 92, Y0, 1800, Y0 - 105, 1800, Y0 + 105, { a: 0.10 * (1 - 0.6 * inB), k: kB, t, dust: Math.round(70 * (1 - vac)), seed: 3, spot: false });

    title(g, '何が揺れているのか', t, T.titleAt, { act: 2 });
    actCard(g, t, F, this.START, 2);

    // ── A: sóng trắng + câu hỏi ──
    const oA = out(t, T.y1860 - 0.5, 0.8);
    if (oA < 1) {
      g.save(); g.translate(1400 * oA, 0);
      wave(g, 330, Y0, 1750, 'white', { lamPx: 150, amp: 42, k: prog(t, Math.max(T.nani - 0.5, T.cardEnd - 0.1), Math.max(T.nani + 1.0, T.cardEnd + 1.1)), phase: t * 2.4, w: 5 });
      telop(g, '何が揺れている？', 1040, 830, prog(t, T.nani, T.nani + 0.7), { size: 56, mincho: true, align: 'center' });
      g.restore();
    }

    // ── B: Maxwell ──
    const oB = out(t, T.l21 + 0.15, 0.8);
    if (oB < 1) {
      g.save(); g.translate(-1500 * oB, 0);
      photo(g, 'maxwell', 140, 260, 480, prog(t, T.y1860 - 0.3, T.y1860 + 0.9));
      row(g, '1860年代', 1010, 400, prog(t, T.y1860, T.y1860 + 0.7), { size: 64, mincho: true });
      row(g, '電気と磁気の方程式', 1010, 520, prog(t, T.denki - 0.2, T.denki + 0.8));
      arrow(g, [[1120, 548], [1120, 612]], prog(t, T.kuukan - 0.6, T.kuukan - 0.2), { color: '@ink', w: 4 });
      row(g, '空間を伝わる波', 1010, 690, prog(t, T.kuukan - 0.2, T.kuukan + 0.8));
      row(g, 'その速さ ≈ 光の速さ', 1010, 800, prog(t, T.hayasa - 0.1, T.hayasa + 0.9));
      row(g, 'ほぼ一致', 1010, 905, prog(t, T.icchi - 0.1, T.icchi + 0.7), { size: 56, mincho: true });
      g.restore();
    }

    // ── C: sóng điện từ 3D ──
    const kW = prog(t, T.l21 + 0.3, T.l21 + 2.2);
    emWave(g, t, kW);
    // giàn trục bên trái (trung tính): E đứng, B sâu, hướng đi
    const ke = prog(t, T.denba - 0.1, T.denba + 0.5), kb = prog(t, T.jiba - 0.1, T.jiba + 0.5), kd = prog(t, T.nami21 - 0.2, T.nami21 + 0.5);
    arrow(g, [[GX, Y0], [GX, Y0 - 125]], ke, { color: '@ink', w: 5 });
    telop(g, '電場', GX, Y0 - 150, ke, { align: 'center' });
    arrow(g, [[GX, Y0], [GX + ZX * 150, Y0 + ZY * 150]], kb, { color: '@dim', w: 5 });
    telop(g, '磁場', GX + ZX * 150 - 24, Y0 + ZY * 150 + 52, kb, { align: 'right', color: '@dim' });
    arrow(g, [[GX, Y0], [GX + 220, Y0]], kd, { color: '@ink', w: 5 });
    telop(g, '進む向き', GX + 20, Y0 + 62, kd);
    telop(g, '電磁波', 1210, 925, prog(t, T.denjiha, T.denjiha + 0.8), { size: 72, mincho: true, align: 'center' });
    // câu 22: lẫn nhau sinh ra nhau (hai mũi tên cong giữa 電場 và 磁場), chân không
    const kt = prog(t, T.tagai - 0.1, T.tagai + 0.8);
    arrow(g, [[215, Y0 - 110], [130, Y0 - 40], [150, Y0 + 30]], kt, { color: '@ink', w: 4 });
    arrow(g, [[290, Y0 + 15], [215, Y0 - 50], [240, Y0 - 95]], kt, { color: '@ink', w: 4 });
    row(g, 'たがいを生み合いながら', 960, 290, prog(t, T.tagai, T.tagai + 1.0));
    row(g, '真空の中でも進む', 960, 385, prog(t, T.shinku, T.shinku + 0.9), { size: 56, mincho: true });
  }
}
