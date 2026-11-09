// b1 · パスツールのピンセット (p2 câu 0–11). Mở hồi 1 từ ĐEN sau intro: ERA `note` (1848, đèn dầu), quầng đèn hiện dần,
// gương sáng lên (DNA §6). Đống tinh thể ラセミ酸 nằm NGAY TRƯỚC chân gương (chưa thuộc phía nào) cho tới khi ピンセット chia:
//  A (câu 0–2)  1848年、パリ · ảnh pasteur-21 · 「ラセミ酸の結晶」 + kính lúp (顕微鏡) · 「酒石酸の仲間」 + ly rượu / chùm nho
//  B (câu 3–5)  phía 右: sóng ánh sáng nhiều hướng → tấm lọc khe → 偏光 (một hướng) → ống 酒石酸 (azure) → mặt số xoay 右;
//               đổi ống ラセミ酸 (50 : 50) → không xoay. Phía 左: ảnh polarimeter, 「成分は同じなのに」「なぜ？」
//  C (câu 6–8)  tinh thể lớn hai phía gương: 右 = mặt nhỏ bên PHẢI (azure) · 左 = ảnh gương, mặt nhỏ bên trái (hổ phách)
//               → đường chấm qua gương 「鏡うつしの形」 → ピンセット gắp từng hạt từ đống giữa về hai đống 左 / 右
//               Chuỗi nghĩa (Pasteur): mặt bên phải → quay偏光 sang phải (酒石酸 tự nhiên) = đống 右 = ống azure 「右へ」.
//  D (câu 9–11) hai đống tan vào hai ống (左 hổ phách / 右 azure); mặt số xoay trái / phải CÙNG góc (must ±α); 「半分ずつ」;
//               ảnh pasteur-crystals (hiện vật thật) + kết luận 「分子にも、右と左がある」.
import { C, MX, clamp, prog, lookup, must, outCubic, outBack, smooth, hash, ground, dark, mirror, telop, title,
  actCard, actCues, arrow, crystal, tube, photo, floorShadow, badge, rotX, rotY, TAU, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const lerp = (a, b, u) => a + (b - a) * u;
const mv = (M, p) => M.map(r => r[0] * p[0] + r[1] * p[1] + r[2] * p[2]);
// mặt nhỏ của kit.crystal (đỉnh top[0] bị cắt, c = 0.45) — để tô lại màu theo PHÍA và lấy tâm mặt
const FACET = (() => { const V1 = [Math.cos(Math.PI / 6), 0.9, 0.31], to = (b, c = 0.45) => V1.map((v, i) => v + (b[i] - v) * c);
  return [to([0, 1.75, 0]), to([0, 0.9, 0.62]), to([V1[0], -0.9, 0.31]), to([V1[0], 0.9, -0.31])]; })();
/**
 * Tinh thể theo PHÍA mặt nhỏ: right = true → mặt nhỏ bên phải, azure (右); false → ảnh gương, mặt bên trái, hổ phách (左).
 * kit.crystal gắn màu hổ phách cho bản mặt-phải → vẽ bằng kit rồi tô lại mặt nhỏ (mặt trước của khối lồi, không bị che).
 * Trả về tâm mặt nhỏ trên màn hình [x, y] (hoặc null khi k ≤ 0).
 */
function xtal(g, x, y, s, k, { right = true, rot = -0.35, tilt = 0.25 } = {}) {
  if (k <= 0) return null;
  crystal(g, x, y, s, k, { mirror: !right, rot, tilt });
  const sc = s * outBack(clamp(k)) / 1.75, P = FACET.map(p => { const q = mv(rotX(tilt), mv(rotY(rot), p)); if (!right) q[0] = -q[0]; return [x + q[0] * sc, y - q[1] * sc]; });
  g.save(); g.beginPath(); P.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath();
  g.fillStyle = right ? C.R : C.L; g.fill(); g.strokeStyle = '#FFFFFF'; g.lineWidth = 2; g.lineJoin = 'round'; g.stroke(); g.restore();
  return [P.reduce((a, p) => a + p[0], 0) / 4, P.reduce((a, p) => a + p[1], 0) / 4];
}

// sóng ánh sáng dọc trục x; ang = hướng rung (0 = dọc, dương = nghiêng phải, như mặt số); vẽ dần theo k
function wave(g, x0, x1, y, amp, ang, ph, k, { col = C.silver, lw = 3, alpha = 1 } = {}) {
  if (k <= 0) return;
  const xe = x0 + (x1 - x0) * clamp(k), N = Math.max(2, Math.round((xe - x0) / 4));
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= N; i++) { const x = x0 + (xe - x0) * i / N, s = amp * Math.sin((x - x0) / 26 - ph) * Math.min(1, (x - x0) / 30);
    const px = x + Math.sin(ang) * s * 0.45, py = y - Math.cos(ang) * s + Math.sin(ang) * s * 0.2;
    i ? g.lineTo(px, py) : g.moveTo(px, py); }
  g.stroke(); g.restore();
}
// mặt số (nhìn dọc chùm sáng): vòng, vạch tham chiếu dọc nét đứt, các vạch rung angs; rot: cung mũi tên từ 0 → rot
function dial(g, x, y, r, k, { angs = [0], col = C.text, ref = true, rot = 0, arcCol = C.dim } = {}) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y); g.scale(e, e); g.translate(-x, -y);
  badge(g, x, y, r, { stroke: C.bone });
  if (ref) { g.save(); g.setLineDash([6, 7]); g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - r * 0.92); g.lineTo(x, y + r * 0.92); g.stroke(); g.restore(); }
  g.strokeStyle = col; g.lineWidth = 5; g.lineCap = 'round';
  for (const a of angs) { const dx = Math.sin(a) * r * 0.78, dy = -Math.cos(a) * r * 0.78; g.beginPath(); g.moveTo(x - dx, y - dy); g.lineTo(x + dx, y + dy); g.stroke(); }
  g.restore();
  if (Math.abs(rot) > 0.05 && k >= 1) {
    const R = r + 16, P = a => [x + Math.sin(a) * R, y - Math.cos(a) * R], c = 1 / Math.cos(rot / 2);
    arrow(g, [P(0), [x + Math.sin(rot / 2) * R * c, y - Math.cos(rot / 2) * R * c], P(rot)], 1, { color: arcCol, w: 3.5, head: 13 });
  }
}
// tấm lọc khe (偏光板): kính tối đứng, một khe dọc sáng; trượt xuống từ trên
function slit(g, x, y, h, k) {
  if (k <= 0) return;
  const dy = Math.round((1 - outCubic(clamp(k))) * -320);
  g.save(); g.translate(0, dy);
  g.fillStyle = 'rgba(16,22,38,0.92)'; g.fillRect(x - 12, y - h / 2, 24, h);
  g.strokeStyle = C.silver; g.lineWidth = 2; g.strokeRect(x - 12, y - h / 2, 24, h);
  g.fillStyle = 'rgba(244,247,251,0.85)'; g.fillRect(x - 1.5, y - h * 0.36, 3, h * 0.72);
  g.restore();
}
// kính lúp (顕微鏡でのぞく): vòng bạc + cán; trong kính: vài tinh thể phóng to (đống giữa, chưa chia)
function lens(g, x, y, r, k, t) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), dy = Math.round((1 - e) * 260);
  g.save(); g.translate(0, dy);
  g.strokeStyle = '#5A6378'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + r * 0.72, y + r * 0.72); g.lineTo(x + r * 1.35, y + r * 1.35); g.stroke();
  g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip();
  g.fillStyle = 'rgba(14,20,36,0.92)'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  xtal(g, x - r * 0.42, y + r * 0.08, r * 0.5, 1, { right: false, rot: -0.45 + 0.1 * Math.sin(t * 0.6) });
  xtal(g, x + r * 0.42, y - r * 0.06, r * 0.5, 1, { right: true, rot: -0.45 + 0.1 * Math.sin(t * 0.6) });
  const gl = g.createLinearGradient(x - r, y - r, x + r, y + r); gl.addColorStop(0, 'rgba(255,255,255,0.16)'); gl.addColorStop(0.4, 'rgba(255,255,255,0)'); gl.addColorStop(1, 'rgba(201,210,224,0.06)');
  g.fillStyle = gl; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  g.restore();
  g.strokeStyle = C.silver; g.lineWidth = 7; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
  g.restore();
}
// ly rượu + chùm nho (ワイン造り) — nét đơn giản, màu trung tính / tím nho (không đỏ ✗)
function wine(g, x, y, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(0, Math.round((1 - e) * 240));
  floorShadow(g, x, 80, { y: y + 6 });
  g.fillStyle = 'rgba(92,40,64,0.75)'; g.beginPath(); g.moveTo(x - 62, y - 250); g.quadraticCurveTo(x - 66, y - 160, x, y - 150); g.quadraticCurveTo(x + 66, y - 160, x + 62, y - 250); g.closePath(); g.fill();
  g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 70, y - 320); g.quadraticCurveTo(x - 78, y - 150, x, y - 140); g.quadraticCurveTo(x + 78, y - 150, x + 70, y - 320); g.stroke();
  g.beginPath(); g.moveTo(x, y - 140); g.lineTo(x, y - 12); g.moveTo(x - 56, y); g.quadraticCurveTo(x, y - 20, x + 56, y); g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.3)'; g.fillRect(x - 52, y - 300, 4, 90);
  const gx = x + 230, gy = y - 170;                                     // chùm nho
  g.strokeStyle = '#7FB069'; g.lineWidth = 6; g.beginPath(); g.moveTo(gx, gy - 70); g.quadraticCurveTo(gx + 10, gy - 110, gx + 40, gy - 120); g.stroke();
  g.fillStyle = '#7FB069'; g.beginPath(); g.ellipse(gx + 46, gy - 112, 34, 18, -0.4, 0, TAU); g.fill();
  const rows = [5, 4, 4, 3, 2, 1];
  rows.forEach((n, r) => { for (let i = 0; i < n; i++) { const px = gx + (i - (n - 1) / 2) * 30, py = gy - 50 + r * 26;
    const gr = g.createRadialGradient(px - 5, py - 6, 2, px, py, 16); gr.addColorStop(0, '#B596D6'); gr.addColorStop(1, '#5A3C7A');
    g.fillStyle = gr; g.beginPath(); g.arc(px, py, 15, 0, TAU); g.fill(); } });
  g.restore();
}
// ピンセット: hai càng bạc chụm ở đầu (x, y)
function tweezers(g, x, y) {
  g.save(); g.lineCap = 'round';
  for (const [dx, col] of [[-1, '#7E889B'], [1, C.silver]]) { g.strokeStyle = col; g.lineWidth = 6; g.beginPath(); g.moveTo(x + dx * 3, y - 4); g.lineTo(x + 70 + dx * 14, y - 200); g.stroke(); }
  g.restore();
}

// đống tinh thể: 10 hạt (5 / 5), ở giữa trước chân gương; cờ m = 1: mặt nhỏ bên PHẢI (azure) → đống 右, 0 → đống 左
const N = 10, MIRF = [0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
const PILE = Array.from({ length: N }, (_, i) => [MX + (i - 4.5) * 22 + (hash(i * 2.3) - 0.5) * 10, 958 + (i % 3) * 14 - 8 * hash(i * 5.1)]);
const SLOT = [[-44, 905], [0, 905], [44, 905], [-22, 872], [22, 872]];
const PL = 470, PR = 2 * MX - 470, TL = 650, TR = 2 * MX - 650;      // đống / ống hai phía (đối xứng qua gương)
const ANG = 0.6;                                                       // góc quay mặt số (rad) — CÙNG cho hai dung dịch

export default class Pasteur {
  static ERA = 'note';
  static IMAGES = { 'pasteur-21': './assets/history/pasteur-21.jpg', 'pasteur-crystals': './assets/history/pasteur-crystals.jpg', polarimeter: './assets/history/polarimeter.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1-pasteur');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l0: S(0), y1848: w(0, '1848年'), paris: w(0, 'パリ'),
      l1: S(1), age: w(1, '25歳'), kagaku: w(1, '化学者'), rasemi1: w(1, 'ラセミ酸'), kessho1: w(1, '結晶'), kenbi: w(1, '顕微鏡'),
      l2: S(2), wine: w(2, 'ワイン造り'), shuseki2: w(2, '酒石酸'),
      l3: S(3), nami: w(3, '波'), muki: w(3, '向き', 1), soroeta: w(3, 'そろえた'), henko3: w(3, '偏光'),
      l4: S(4), shuseki4: w(4, '酒石酸'), yoeki4: w(4, '溶液'), henko4: w(4, '偏光'), migi4: w(4, '右'),
      l5: S(5), rasemi5: w(5, 'ラセミ酸'), mawasan: w(5, '回しません'), seibun: w(5, '成分'), naze: w(5, 'なぜ'),
      l6: S(6), kessho6: w(6, '結晶'), kado: w(6, '角'), men6: w(6, '面'),
      l7: S(7), migi7: w(7, '右'), hidari7: w(7, '左'), kagami7: w(7, '鏡'),
      l8: S(8), pinset: w(8, 'ピンセット'), hitotsubu: w(8, '1粒'), yama: w(8, '山'), wake: w(8, '分けました'),
      l9: S(9), mizu: w(9, '水'), tokasu: w(9, '溶かす'), henko9: w(9, '偏光'), migi9: w(9, '右'), hidari9: w(9, '左'), onaji: w(9, '同じ'),
      l10: S(10), migi10: w(10, '右'), hidari10: w(10, '左'), hanbun: w(10, '半分'),
      l11: S(11), hajimete: w(11, 'はじめて'), bunshi11: w(11, '分子'), migi11: w(11, '右'), kizuita: w(11, '気づいた'), end: E(11),
    };
    this.START = S(0);
    this.FROM = this.START - 2.6;                       // mở hồi 1, cảnh đầu p2 (lead 3.0 — trước FROM là đen kín)
    const T = this.T;
    T.title = T.l0 + 1.2;                               // tiêu đề cảnh lật gương khi thẻ hồi vừa rút
    // ピンセット: hạt i rời đống giữa ở pick[i], tới đống của nó sau 0.38 s; xong trước 分けました + 0.6
    T.pick = Array.from({ length: N }, (_, i) => T.pinset + 0.2 + i * (T.wake + 0.2 - T.pinset - 0.2) / N);
    must(`${T.pick[N - 1] + 0.38 < T.wake + 0.7}`, true);
    must(`${MIRF.filter(m => m).length} + ${MIRF.filter(m => !m).length}`, 10);             // 5 + 5 hạt: ラセミ = nửa / nửa
    must(`${-ANG} + ${ANG}`, 0);                                                              // quay trái / phải CÙNG góc
    must('50 + 50', 100);
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.title + 0.6, 'telop', -4), cue(T.age, 'photo'), cue(T.rasemi1, 'telop'), cue(T.kessho1, 'crystal'), 
      cue(T.wine, 'pop', -4), cue(T.shuseki2, 'telop'),
      cue(T.muki, 'telop', -4), cue(T.soroeta, 'tick'), cue(T.henko3, 'telop'),
      cue(T.shuseki4, 'tube'), cue(T.migi4, 'telop'), cue(T.rasemi5, 'tube'), cue(T.mawasan, 'telop'), cue(T.naze, 'telop'),
      cue(T.kessho6, 'crystal'), cue(T.migi7, 'telop', -4), cue(T.hidari7, 'crystal'), cue(T.kagami7, 'flip', -4),
      cue(T.pick[0], 'tweezers'), cue(T.pick[6], 'tweezers', -4),
      cue(T.l9, 'tube'), cue(T.migi9, 'telop'), cue(T.onaji, 'pop', -4), cue(T.migi10, 'telop', -4),
      cue(T.hanbun, 'telop'), cue(T.l11 + 0.1, 'photo'), cue(T.bunshi11, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'note', t, { lamp: smooth(prog(t, F, F + 2.5)) });

    // ── tiêu đề (lật gương) + 1848年、パリ ──
    title(g, 'パスツールのピンセット', t, T.title, { act: 1 });

    // ═════ A (câu 0–2): Pasteur, ラセミ酸の結晶, 酒石酸 ═════
    const oA = out(t, T.l3 - 0.2, 0.6);
    if (oA < 1) {
      g.save(); g.translate(-1000 * oA, 0);
      telop(g, '1848年、パリ', 150, 290, prog(t, T.title - 0.1, T.paris + 0.3), { size: 56, mincho: true });
      photo(g, 'pasteur-21', 150, 340, 330, prog(t, T.age - 0.3, T.age + 0.5));
      telop(g, '25歳の化学者', 430, 430, prog(t, T.kagaku - 0.2, T.kagaku + 0.6), { size: 44 });
      g.restore();
      g.save(); g.translate(1000 * oA, 0);
      telop(g, 'ラセミ酸の結晶', 1010, 330, prog(t, T.rasemi1, T.kessho1 + 0.4), { size: 52, mincho: true });
      lens(g, 1250, 620, 140, prog(t, T.kenbi - 0.2, T.kenbi + 0.4) * (1 - out(t, T.l2 - 0.2, 0.5)), t);
      telop(g, '＝ 酒石酸の仲間', 1010, 410, prog(t, T.shuseki2, T.shuseki2 + 0.8), { size: 44 });
      wine(g, 1250, 860, prog(t, T.wine - 0.2, T.wine + 0.5));
      telop(g, 'ワイン造り', 1360, 990, prog(t, T.wine, T.wine + 0.6), { size: 36, color: '@dim', align: 'center' });
      g.restore();
    }

    // ═════ B (câu 3–5): 偏光 ═════
    const oB = out(t, T.l6 - 0.45, 0.6);
    if (t > T.l3 - 0.4 && oB < 1) {
      const BY = 600, ph = t * 7;
      g.save(); g.translate(-1000 * oB, 0);
      photo(g, 'polarimeter', 150, 300, 240, prog(t, T.l3 + 0.3, T.nami + 0.8));
      telop(g, '成分は同じなのに', 150, 770, prog(t, T.seibun, T.seibun + 0.8), { size: 44 });
      telop(g, 'なぜ？', 150, 870, prog(t, T.naze, T.naze + 0.4), { size: 64, mincho: true });
      g.restore();
      g.save(); g.translate(1000 * oB, 0);
      // nguồn sáng + sóng nhiều hướng → tấm lọc → một hướng
      const kw = prog(t, T.l3, T.nami + 0.6);
      if (kw > 0) { const gl = g.createRadialGradient(1000, BY, 2, 1000, BY, 46); gl.addColorStop(0, `rgba(244,247,251,${0.9 * kw})`); gl.addColorStop(1, 'rgba(244,247,251,0)'); g.fillStyle = gl; g.fillRect(950, BY - 50, 100, 100); }
      [0, 0.9, 1.8, 2.6].forEach((a, i) => wave(g, 1000, 1236, BY, 38, a, ph + i * 1.3, kw, { alpha: i ? 0.5 : 0.9, lw: 2.5 }));
      const ks = prog(t, T.soroeta - 0.3, T.soroeta + 0.3);
      slit(g, 1244, BY, 220, ks);
      wave(g, 1256, 1468, BY, 38, 0, ph, prog(t, T.soroeta, T.soroeta + 0.5));
      dial(g, 1115, 420, 52, prog(t, T.muki - 0.1, T.muki + 0.4), { angs: [0, 0.8, 1.6, 2.4], col: C.dim, ref: false });
      dial(g, 1350, 420, 52, prog(t, T.soroeta + 0.2, T.soroeta + 0.6), { angs: [0], ref: false });
      telop(g, 'ゆれる向き', 1115, 830, prog(t, T.muki, T.muki + 0.6), { size: 36, align: 'center', color: '@dim' });
      telop(g, '偏光', 1350, 836, prog(t, T.henko3, T.henko3 + 0.4), { size: 52, align: 'center', mincho: true });
      // ống dung dịch: 酒石酸 (azure — một tay) → đổi sang ラセミ酸 (nửa / nửa)
      const sw = smooth(prog(t, T.rasemi5 - 0.3, T.rasemi5 + 0.4));
      const kT1 = prog(t, T.shuseki4 - 0.2, T.shuseki4 + 0.4), fill = 0.15 + 0.55 * smooth(prog(t, T.yoeki4, T.yoeki4 + 0.8));
      if (sw < 1) { g.save(); g.translate(0, -760 * sw); tube(g, 1500, 780, 330, kT1, { fill, mix: 0, n: 22, seed: 3 });
        telop(g, '酒石酸', 1500, 428, prog(t, T.shuseki4, T.shuseki4 + 0.5), { size: 36, align: 'center' }); g.restore(); }
      if (sw > 0) { tube(g, 1500, 780, 330, sw, { fill: 0.7, mix: 0.5, n: 22, seed: 5 });
        telop(g, 'ラセミ酸', 1500, 428, prog(t, T.rasemi5, T.rasemi5 + 0.5), { size: 36, align: 'center' }); }
      // ra khỏi ống: hướng rung quay sang phải (酒石酸) rồi về thẳng (ラセミ酸)
      const rot = ANG * smooth(prog(t, T.migi4 - 0.3, T.migi4 + 0.5)) * (1 - smooth(prog(t, T.mawasan - 0.4, T.mawasan + 0.3)));
      const kOut = prog(t, T.henko4, T.henko4 + 0.6);
      wave(g, 1534, 1664, BY, 34, rot, ph, kOut);
      dial(g, 1735, BY, 64, kOut, { angs: [rot], rot, arcCol: C.R });
      const oR = out(t, T.rasemi5 - 0.2, 0.4);
      if (oR < 1) { g.save(); g.translate(0, 300 * oR); telop(g, '右へ回す', 1720, 722, prog(t, T.migi4, T.migi4 + 0.5), { size: 40, align: 'center', color: '@R' }); g.restore(); }
      telop(g, '回さない', 1720, 722, prog(t, T.mawasan, T.mawasan + 0.5), { size: 40, align: 'center' });
      g.restore();
    }

    // ═════ C (câu 6–8): mặt nhỏ ở góc — 右: mặt bên phải (azure), 左: ảnh gương; ピンセット ═════
    const oC = out(t, T.pinset - 0.1, 0.6);
    if (t > T.l6 - 0.2 && oC < 1) {
      const CY = 520, CS = 180, rot = -0.4 + 0.12 * Math.sin((t - T.l6) * 0.5), tilt = 0.25, XL = 600, XR = 2 * MX - 600;
      const kR = prog(t, T.l6, T.l6 + 0.6), kL = prog(t, T.hidari7 - 0.2, T.hidari7 + 0.4), dx = Math.round(1000 * oC);   // rời ngang, mỗi bên về phía mình
      g.save(); g.translate(dx, 0);
      floorShadow(g, XR, 160 * Math.min(1, kR));
      const fR = xtal(g, XR, CY, CS, kR, { right: true, rot, tilt });
      telop(g, '小さな面', 1010, 330, prog(t, T.men6, T.men6 + 0.5), { size: 48, mincho: true });
      if (fR) arrow(g, [[1110, 350], [fR[0] + 90, 360], [fR[0] + 40, fR[1] - 4]], prog(t, T.men6 + 0.2, T.men6 + 0.7), { color: C.dim, w: 3 });
      telop(g, '面が右', XR, 800, prog(t, T.migi7, T.migi7 + 0.4), { size: 44, align: 'center' });
      g.restore();
      g.save(); g.translate(-dx, 0);
      floorShadow(g, XL, 160 * Math.min(1, kL));
      const fL = xtal(g, XL, CY, CS, kL, { right: false, rot, tilt });
      telop(g, '面が左', XL, 800, prog(t, T.hidari7 + 0.2, T.hidari7 + 0.6), { size: 44, align: 'center' });
      telop(g, '鏡うつしの形', 150, 330, prog(t, T.kagami7, T.kagami7 + 0.6), { size: 52, mincho: true });
      g.restore();
      const ring = (p, k) => { if (k <= 0 || !p) return; g.save(); g.strokeStyle = C.text; g.lineWidth = 3; g.beginPath(); g.arc(p[0], p[1], 34 * outCubic(clamp(k)) + 4, 0, TAU); g.stroke(); g.restore(); };
      if (fR) ring([fR[0] + dx, fR[1]], prog(t, T.men6 - 0.2, T.men6 + 0.3) * (1 - oC));
      if (fL) ring([fL[0] - dx, fL[1]], prog(t, T.hidari7 + 0.2, T.hidari7 + 0.6) * (1 - oC));
      // 鏡うつし: đường chấm nối hai mặt nhỏ qua gương
      const kd = prog(t, T.kagami7 - 0.2, T.kagami7 + 0.6) * (1 - oC);
      if (kd > 0 && fL && fR) { const x0 = fL[0] - dx - 40, x1 = fR[0] + dx + 40; g.save(); g.setLineDash([6, 10]); g.strokeStyle = C.silver; g.lineWidth = 2.5; g.beginPath();
        g.moveTo(x0, fL[1]); g.lineTo(x0 + (x1 - x0) * outCubic(kd), lerp(fL[1], fR[1], outCubic(kd))); g.stroke(); g.restore(); }
    }
    // 1粒ずつ / 二つの山 (câu 8) — rời khi câu 9 vào
    const o8 = out(t, T.l9 - 0.3, 0.5);
    if (t > T.pinset && o8 < 1) {
      g.save(); g.translate(0, -400 * o8);
      telop(g, '1粒ずつ', 150, 330, prog(t, T.hitotsubu, T.hitotsubu + 0.5), { size: 52, mincho: true });
      telop(g, '二つの山', 1010, 330, prog(t, T.yama, T.yama + 0.5), { size: 52, mincho: true });
      g.restore();
    }

    // ═════ D (câu 9–11): hai dung dịch, quay trái / phải bằng nhau ═════
    const oD = out(t, T.l11 - 0.3, 0.6);
    if (t > T.l9 - 0.2 && oD < 1) {
      g.save(); g.translate(0, 700 * oD);
      const fill = 0.1 + 0.55 * smooth(prog(t, T.mizu, T.tokasu + 1.4));
      for (const [x, mix, seed] of [[TL, 1, 7], [TR, 0, 8]]) { floorShadow(g, x, 80); tube(g, x, 860, 300, prog(t, T.l9 - 0.1, T.l9 + 0.5), { fill, mix, n: 20, seed }); }
      // mặt số trên mỗi ống: 右 quay phải, 左 quay trái, cùng góc
      const oDial = out(t, T.l10 - 0.2, 0.5), kd = prog(t, T.henko9 - 0.2, T.henko9 + 0.3);
      const aR = ANG * smooth(prog(t, T.migi9 - 0.1, T.migi9 + 0.5)), aL = -ANG * smooth(prog(t, T.hidari9 - 0.1, T.hidari9 + 0.5));
      if (oDial < 1) {
      g.save(); g.translate(0, -600 * oDial);
      dial(g, TL, 380, 72, kd, { angs: [aL], rot: aL, col: C.L, arcCol: C.L });
      dial(g, TR, 380, 72, kd, { angs: [aR], rot: aR, col: C.R, arcCol: C.R });
      telop(g, '左へ', TL - 110, 395, prog(t, T.hidari9, T.hidari9 + 0.4), { size: 44, align: 'right', color: '@L' });
      telop(g, '右へ', TR + 110, 395, prog(t, T.migi9, T.migi9 + 0.4), { size: 44, color: '@R' });
      g.restore(); }
      const o9 = out(t, T.hanbun - 0.3, 0.4);
      if (o9 < 1) { g.save(); g.translate(0, 140 * o9); telop(g, '同じ角度', MX, 990, prog(t, T.onaji, T.onaji + 0.6), { size: 48, align: 'center', mincho: true }); g.restore(); }
      telop(g, '50%', TL - 60, 720, prog(t, T.hanbun, T.hanbun + 0.4), { size: 48, align: 'right', color: '@L' });
      telop(g, '50%', TR + 60, 720, prog(t, T.hanbun, T.hanbun + 0.4), { size: 48, color: '@R' });
      telop(g, '半分ずつ', MX, 990, prog(t, T.hanbun, T.hanbun + 0.5), { size: 52, align: 'center', mincho: true });
      g.restore();
      g.save(); g.translate(0, -500 * oD);                                       // nhãn trên rời lên, không quét qua khung
      telop(g, '左の分子', MX - 70, 330, prog(t, T.hidari10, T.hidari10 + 0.5), { size: 48, align: 'right', color: '@L' });
      telop(g, '右の分子', MX + 70, 330, prog(t, T.migi10, T.migi10 + 0.5), { size: 48, color: '@R' });
      g.restore();
    }
    if (t > T.l11 - 0.4) {
      photo(g, 'pasteur-crystals', 200, 270, 380, prog(t, T.l11 - 0.1, T.l11 + 0.6));
      telop(g, '分子にも、', 1010, 440, prog(t, T.bunshi11 - 0.2, T.bunshi11 + 0.4), { size: 72, mincho: true });
      telop(g, '右と左がある', 1010, 545, prog(t, T.migi11 - 0.2, T.migi11 + 0.6), { size: 72, mincho: true });
      telop(g, '人類がはじめて気づいた', 1012, 640, prog(t, T.hajimete, T.kizuita + 0.4), { size: 36, color: '@dim' });
    }

    // ── gương (sáng lên khi mở) ──
    mirror(g, { dim: 1 - smooth(prog(t, F + 0.4, F + 2.6)) });

    // ── đống tinh thể trước chân gương → ピンセット chia hai đống → tan vào hai ống ──
    const kP = prog(t, T.kessho1 - 0.2, T.kessho1 + 0.4);
    if (kP > 0) {
      const cnt = [0, 0], items = [];
      for (let i = 0; i < N; i++) {
        const m = MIRF[i], j = cnt[m]++, [sx, sy] = SLOT[j], tx = (m ? PR : PL) + sx, ty = sy;
        const u = smooth(prog(t, T.pick[i], T.pick[i] + 0.38));
        let x = lerp(PILE[i][0], tx, u), y = lerp(PILE[i][1], ty, u) - 150 * Math.sin(Math.PI * u), s = 24, k = kP;
        const ud = prog(t, T.tokasu + i * 0.09, T.tokasu + i * 0.09 + 0.6);           // tan: bay vào miệng ống, chìm, nhỏ dần
        if (ud > 0) { const xt = m ? TR : TL, a = smooth(clamp(ud * 1.6)), b = smooth(clamp(ud * 1.6 - 0.6));
          x = lerp(x, xt, a); y = lerp(y, 520, a) - 90 * Math.sin(Math.PI * a) + 260 * b; s = 24 * (1 - b); if (ud >= 1) continue; }
        items.push({ x, y, s, k, m, rot: -0.75 + 0.6 * hash(i * 4.7), moving: u > 0 && u < 1 });
      }
      items.sort((a, b) => a.y - b.y);
      for (const c of items) if (c.s > 0.5) xtal(g, c.x, c.y, c.s, c.k, { right: !!c.m, rot: c.rot });
      const mov = items.find(c => c.moving); if (mov) tweezers(g, mov.x + 4, mov.y - mov.s * 0.9);
    }

    actCard(g, t, F, this.START, 1);
    dark(g, outCubic(prog(t, F, F + 1.4)));
  }
}
