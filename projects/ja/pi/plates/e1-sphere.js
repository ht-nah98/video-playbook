// e1 · 球の上の円 (p2, câu 108–120) — mở HỒI 4. DNA e1: thẻ hồi「第四幕 円周率にならない円」; vành thành xích đạo của
// 天球 (quả cầu); đo đường kính dọc mặt cầu → 円周 ÷ 直径 < π; cực Bắc + xích đạo → = 2 (mascot startled, không nói);
// 馬の鞍 → > π.
//  ① câu 108–110: vành đồng thau nhìn thẳng, π son + 3.14159… giữa vành; 「円周 ÷ 直径 ＝ π」「平らな面の上だけ」
//  ② câu 111–115: vành NẰM XUỐNG thành xích đạo, quả cầu mọc trong vành; cực = tâm, 6 bán kính dọc kinh tuyến, vòng vĩ 30°;
//     đường kính theo mặt cầu (cung qua cực); 「＜ π」; vòng phẳng cùng bán kính (thép, mặt tiếp xúc ở cực) to hơn → 「短い」
//  ③ câu 116–119: vòng trượt xuống thành xích đạo; hạt chạy 1 vòng xích đạo; đường kính = nửa vòng lớn qua cực;
//     hai thước 円周 / 直径 (= nửa); 「＝ 2」 + mascot startled
//  ④ câu 120: quả cầu thu nhỏ sang trái; mặt yên ngựa (lưới đồng) + vòng trên mặt; 「＞ π」
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, circleLine, bead, engrave, telop, heading, actCard, tag, rule, measure, figure, PI_DIGITS } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const DEG = Math.PI / 180;
const EL = 30 * DEG;                                                    // góc nhìn xuống quả cầu
function track(t, keys) {                                               // chặng [giờ, [cx, cy, R]], dời trong 0.9 s
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, nv] = keys[i], e = smooth(clamp((t - t0) / 0.9));
    if (e <= 0) break;
    v = v.map((a, j) => a + (nv[j] - a) * e);
  }
  return v;
}
// chiếu trực giao: Y lên, Z về phía người xem; camera ngẩng xuống EL → [x, y, độ sâu (> 0 = mặt trước)]
const P3 = (S, X, Y, Z, e = EL) => [S.cx + X, S.cy - (Y * Math.cos(e) - Z * Math.sin(e)), Y * Math.sin(e) + Z * Math.cos(e)];
const sph = (S, lat, lon) => P3(S, S.R * Math.cos(lat) * Math.sin(lon), S.R * Math.sin(lat), S.R * Math.cos(lat) * Math.cos(lon));
const samp = (n, f) => Array.from({ length: n + 1 }, (_, i) => f(i / n));
/** Đường 3D đã chiếu, vẽ dần theo k; mặt sau mờ + đứt. */
function curve(g, P, k = 1, { color = C.brass, w = 2, back = 0.28, a = 1, dash = true } = {}) {
  if (k <= 0) return;
  const n = P.length - 1, m = clamp(k) * n;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round';
  for (let i = 0; i < Math.ceil(m); i++) {
    const [x0, y0, d0] = P[i], [x1, y1, d1] = P[i + 1], f = Math.min(1, m - i), front = d0 + d1 >= 0;
    g.globalAlpha = a * (front ? 1 : back); g.setLineDash(front || !dash ? [] : [5, 6]);
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f); g.stroke();
  }
  g.restore();
}
const headOf = (P, k) => { const n = P.length - 1, m = clamp(k) * n, i = Math.min(n - 1, Math.floor(m)), f = m - i;
  return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f]; };
/** Quả cầu 天球: thân chàm trong mờ + lưới kinh vĩ đồng; k = mọc ra; yaw = quay chậm. */
function globe(g, S, k, yaw) {
  if (k <= 0) return;
  const R = S.R * outCubic(clamp(k));
  g.save();
  const gr = g.createRadialGradient(S.cx - R * 0.35, S.cy - R * 0.4, R * 0.05, S.cx, S.cy, R);
  gr.addColorStop(0, 'rgba(70,92,160,0.42)'); gr.addColorStop(0.7, 'rgba(18,30,72,0.55)'); gr.addColorStop(1, 'rgba(8,14,40,0.75)');
  g.fillStyle = gr; g.beginPath(); g.arc(S.cx, S.cy, R, 0, TAU); g.fill();
  g.strokeStyle = C.brass; g.globalAlpha = 0.7; g.lineWidth = 1.4; g.stroke(); g.restore();
  const s = { ...S, R }, kg = clamp((k - 0.3) / 0.7);
  for (const lat of [-60, -30, 30, 60]) curve(g, samp(72, u => sph(s, lat * DEG, u * TAU)), kg, { w: 1, a: 0.42, back: 0.3 });
  for (let i = 0; i < 6; i++) curve(g, samp(72, u => sph(s, -Math.PI / 2 + u * Math.PI, yaw + i * 30 * DEG)), kg, { w: 1, a: 0.32, back: 0.35 });
  for (let i = 0; i < 6; i++) curve(g, samp(72, u => sph(s, -Math.PI / 2 + u * Math.PI, yaw + i * 30 * DEG + Math.PI)), kg, { w: 1, a: 0.32, back: 0.35 });
}
/** Mặt yên ngựa Y = A(u² − v²) (lưới cực, đồng mảnh) + vòng ρ0 trên mặt; trả về điểm vòng. */
function saddle(g, cx, cy, Sz, k, kc, yaw) {
  const S = { cx, cy }, A = 0.55, e = 0.5;                             // e thấp: thấy rõ hai hông lên, đầu/đuôi xuống
  const pt = (rho, a) => { const u = rho * Math.cos(a), v = rho * Math.sin(a), ru = u * Math.cos(yaw) - v * Math.sin(yaw), rv = u * Math.sin(yaw) + v * Math.cos(yaw);
    return P3(S, ru * Sz, A * (u * u - v * v) * Sz, rv * Sz, e); };
  const kg = clamp(k);
  for (const rho of [0.25, 0.5, 0.75, 1]) curve(g, samp(96, q => pt(rho, q * TAU)), kg, { w: 1, a: rho === 1 ? 0.7 : 0.42, back: 1, dash: false });
  for (let i = 0; i < 12; i++) curve(g, samp(24, q => pt(q, i * TAU / 12)), kg, { w: 1, a: 0.32, back: 1, dash: false });
  // hai đường chính: u = 0 (parabol úp, hai bên hông) và v = 0 (parabol ngửa, đầu/đuôi yên) — lộ hình yên
  curve(g, samp(48, q => pt(-1 + 2 * q, 0)), kg, { color: C.brassHi, w: 2.6, a: 0.9, back: 1, dash: false });
  curve(g, samp(48, q => pt(-1 + 2 * q, Math.PI / 2)), kg, { color: C.brassHi, w: 2.6, a: 0.9, back: 1, dash: false });
  const ring = samp(120, q => pt(0.62, q * TAU));
  curve(g, ring, kc, { color: C.brassHi, w: 3.4, back: 1, dash: false });
  if (kc > 0) bead(g, ...pt(0, 0).slice(0, 2), 6, clamp(kc * 3));
  return ring;
}

export default class Sphere {
  static ERA = 'tenkyu';
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      kyoka: w(108, '教科書'), fure: w(108, '触れない'),
      en109: w(109, '円周'), kawa: w(109, '変わりません'), pi109: w(109, '3.14159'), eien: w(109, '永遠'),
      en110: w(110, '円周'), watta: w(110, '割った'), taira110: w(110, '平ら'), dake: w(110, 'だけ'),
      l111: S(111), chikyu: w(111, '地球'), kyu: w(111, '球'),
      ten: w(112, '点'), onaji: w(112, '同じ'), aruite: w(112, '歩いて'), en112: w(112, '円'), egaki: w(112, '描きます'),
      en113: w(113, '円周'), chokkei113: w(113, '直径'), watte: w(113, '割って'), e113: E(113),
      kotae: w(114, '答え'), chiisaku: w(114, '小さく'),
      marumi: w(115, '丸み'), taira115: w(115, '平ら'), mijika: w(115, '短く'),
      l116: S(116), kyokutan: w(116, '極端'), hokkyoku: w(116, '北極'), sekido: w(116, '赤道'),
      isshu: w(117, '1周'), chokkei117: w(117, '直径'), sek2: w(117, '赤道', 2), made: w(117, 'まで'),
      hanbun: w(118, '半分'),
      l119: S(119), hi119: w(119, '比'), two: w(119, '2'),
      l120: S(120), kura: w(120, '馬の鞍'), hi120: w(120, '比'), ooki: w(120, '大きく'), end: E(120),
    };
    this.START = S(108);
    this.FROM = Math.max(this.START - 2.6, E(107) + 0.5);                 // mở HỒI
    const T = this.T;
    this.KEYS = [[this.FROM, [760, 600, 290]], [T.l116 - 0.3, [660, 600, 290]], [T.l120 - 0.1, [300, 770, 130]]];
    this.PI7 = PI_DIGITS.slice(0, 7);
    must(`${this.PI7}`, 3.14159);
    must('Math.cos(Math.PI / 6) < Math.PI / 3', true);                    // vòng vĩ 30° (cách cực 60°) ngắn hơn vòng phẳng bán kính R·π/3
    must('2 * Math.PI * Math.cos(Math.PI / 6) / (2 * Math.PI / 3) < Math.PI', true);   // 円周 ÷ 直径 < π
    must('(2 * Math.PI * 1) / (Math.PI * 1)', 2);                         // xích đạo 2πR ÷ nửa vòng lớn πR
    must('(2 * Math.PI * 1) / 2', Math.PI);                                // 平らな面: 円周 ÷ 直径 ＝ π (bộ ba ＜ ＝ ＞)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.START - 2.3, 'hyoshigi'), c(this.START + 0.35, 'tick'),
      c(T.kawa, 'tick'), c(T.pi109, 'soroban'), c(T.watta, 'tick'), c(T.taira110, 'tick'),
      c(T.chikyu - 0.1, 'whoosh-long'), c(T.kyu + 0.3, 'tick'),
      c(T.ten, 'pop'), c(T.aruite, 'pen'), c(T.en112, 'pen'),
      c(T.en113, 'tick'), c(T.chokkei113, 'pen'), c(T.watte, 'tick'),
      c(T.chiisaku, 'tick'), c(T.taira115 - 0.2, 'pen'), c(T.mijika - 0.3, 'tick'),
      c(T.kyokutan, 'tick'), c(T.hokkyoku, 'pop'), c(T.sekido, 'pen'),
      c(T.isshu - 0.2, 'pen'), c(T.sek2, 'pen'), c(T.hanbun, 'tick'),
      c(T.l119 - 0.4, 'pop'), c(T.two, 'correct'),
      c(T.l120 - 0.1, 'whoosh'), c(T.kura, 'pen'), c(T.ooki, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t);
    actCard(g, t, this.START, '第四幕', '円周率にならない円');
    // ③ (câu hỏi thứ ba của mục lục a0) đóng cạnh 「第四幕」, đi cùng thẻ
    if (t > this.START - 2.4 && t < this.START + 0.3) {
      const o = outCubic(prog(t, this.START - 0.35, this.START + 0.25));
      const wa = measure(g, '第四幕', `500 30px ${JP}`, 14);
      g.save(); g.translate(0, -o * 760); tag(g, 3, W / 2 - wa / 2 - 44, 420, prog(t, this.START - 2.1, this.START - 1.6), { r: 22 }); g.restore();
    }
    heading(g, '第四幕', '球の上の円', prog(t, this.START + 0.2, this.START + 1.3));

    // ── quả cầu / vành ──
    const [cx, cy, R] = track(t, this.KEYS), Sp = { cx, cy, R };
    const kTilt = smooth(prog(t, T.chikyu - 0.2, T.chikyu + 0.9));
    const sy = 1 + (Math.sin(EL) - 1) * kTilt;
    const rot = t * 0.03, kRing = prog(t, this.START - 0.3, this.START + 0.9);
    const ringHalf = top => {                                            // vành = xích đạo; nửa sau vẽ trước quả cầu
      g.save(); g.beginPath(); top ? g.rect(0, 0, W, cy) : g.rect(0, cy, W, H - cy); g.clip();
      g.translate(cx, cy); g.scale(1, sy); ring360(g, 0, 0, R, kRing, { rot, numerals: R >= 200 }); g.restore();
    };
    ringHalf(true);
    globe(g, Sp, prog(t, T.chikyu, T.chikyu + 1.1), 0.12 * t);
    ringHalf(false);

    // ① π son + 3.14159… giữa vành nhìn thẳng (câu 109) → lướt lên ra khi vành nằm xuống
    const o1 = out(t, T.chikyu - 0.3, 0.7);
    if (t > T.en109 - 0.3 && o1 < 1) {
      g.save(); g.translate(0, -620 * o1);
      engrave(g, 'π', cx, cy + 30, prog(t, T.en109, T.en109 + 0.4), `600 190px ${CG}`, C.shu, { align: 'center' });
      engrave(g, this.PI7 + '…', cx, cy + 120, prog(t, T.pi109, T.eien + 0.4), `500 50px ${CG}`, C.ivory, { align: 'center', ls: 2 });
      g.restore();
    }
    // câu 108: テロップ 「教科書が触れないこと」 (cột phải, nhường chỗ trước 「円周率は 変わらない」)
    const o0 = out(t, T.kawa - 0.9, 0.5);
    if (t > T.kyoka - 0.2 && o0 < 1) {
      g.save(); g.translate(800 * o0, 0);
      telop(g, [['教科書', `700 40px ${MIN}`], ['が', `700 40px ${MIN}`, C.dim], ['触れない', `700 40px ${MIN}`, C.brassHi], ['こと', `700 40px ${MIN}`]],
        1230, 380, prog(t, T.kyoka - 0.1, T.fure + 0.6), { size: 40 });
      g.restore();
    }
    // cột phải câu 109–110
    const o2 = out(t, T.l111 - 0.2);
    if (t > T.kawa - 0.3 && o2 < 1) {
      g.save(); g.translate(800 * o2, 0);
      telop(g, '円周率は 変わらない', 1230, 380, prog(t, T.kawa - 0.2, T.kawa + 0.7), { size: 40 });
      telop(g, [['円周', `700 44px ${MIN}`], [' ÷ ', `500 44px ${JP}`, C.dim], ['直径', `700 44px ${MIN}`], [' ＝ ', `500 44px ${JP}`, C.dim], ['π', `600 60px ${CG}`, C.shu]],
        1230, 520, prog(t, T.watta - 0.3, T.watta + 0.6), { size: 44 });
      telop(g, [['平らな面', `700 40px ${MIN}`, C.brassHi], ['の上だけ', `700 40px ${MIN}`]], 1230, 650, prog(t, T.taira110, T.dake + 0.4), { size: 40 });
      g.restore();
    }

    // ── ② trên quả cầu ──
    const lat = (30 - 30 * smooth(prog(t, T.sekido - 0.1, T.sekido + 0.9))) * DEG;     // vòng: vĩ 30° → xích đạo
    const pole = sph(Sp, Math.PI / 2, 0), shrink = smooth(prog(t, T.l120 - 0.1, T.l120 + 0.8));
    const kPole = prog(t, T.ten - 0.2, T.ten + 0.2);
    // 6 bán kính dọc kinh tuyến (cùng khoảng cách), rút về cực khi đo đường kính
    const kRad = prog(t, T.aruite - 0.3, T.aruite + 0.7) - prog(t, T.chokkei113 - 0.4, T.chokkei113 + 0.1);
    if (kRad > 0) for (let i = 0; i < 6; i++) {
      const P = samp(30, u => sph(Sp, Math.PI / 2 - u * (Math.PI / 2 - lat), (30 + i * 60) * DEG));
      curve(g, P, kRad, { color: C.brass, w: 1.8, back: 0.35 });
      bead(g, ...headOf(P, kRad), 4, 1);
    }
    // vòng trên cầu (vĩ lat), vẽ dần
    const kCirc = prog(t, T.en112, T.egaki + 0.6);
    const circ = samp(144, u => sph(Sp, lat, u * TAU));
    curve(g, circ, kCirc, { color: C.brass, w: 3, back: 0.35 });
    // 円周 sáng (câu 113)
    curve(g, circ, prog(t, T.en113 - 0.1, T.en113 + 0.8) - prog(t, T.l116 - 0.4, T.l116), { color: C.brassHi, w: 3.2, back: 0.4 });
    // đường kính dọc mặt cầu: cung lớn qua cực theo kinh tuyến 70° / 250° (phân biệt rõ với vòng; nửa khuất đứt)
    const kDia = prog(t, T.chokkei113 - 0.2, T.chokkei113 + 0.8) - prog(t, T.l116 - 0.4, T.l116) + prog(t, T.sek2 - 0.1, T.made + 0.3);
    const L0 = 70 * DEG, dia = samp(90, u => { const a = lat + u * (Math.PI - 2 * lat); return P3(Sp, R * Math.cos(a) * Math.sin(L0), R * Math.sin(a), R * Math.cos(a) * Math.cos(L0)); });
    if (kDia > 0) { curve(g, dia, kDia, { color: C.ivory, w: 2.6 }); if (kDia < 1) bead(g, ...headOf(dia, kDia), 5, 1); }
    // vòng phẳng cùng bán kính (thép, đứt) trên mặt tiếp xúc ở cực (câu 115)
    const kFlat = prog(t, T.taira115 - 0.2, T.taira115 + 0.8) - prog(t, T.l116 - 0.4, T.l116);
    if (kFlat > 0) {
      const rho = R * (Math.PI / 2 - lat), F = samp(120, u => P3(Sp, rho * Math.sin(u * TAU), R, rho * Math.cos(u * TAU)));
      g.save(); g.setLineDash([9, 7]); curve(g, F, kFlat, { color: C.steel, w: 2.2, back: 1 }); g.restore();
      const kl = prog(t, T.taira115 + 0.4, T.taira115 + 0.9) - prog(t, T.l116 - 0.4, T.l116);
      engrave(g, '平らな円（同じ半径）', cx - rho - 16, pole[1] + 8, kl, `500 28px ${JP}`, C.steel, { align: 'right', spark: false, ls: 1 });
    }
    // xích đạo: hạt chạy một vòng (câu 117)
    const kEq = prog(t, T.isshu - 0.2, T.isshu + 1.3);
    if (kEq > 0) { const Q = samp(144, u => sph(Sp, 0, u * TAU)); curve(g, Q, kEq, { color: C.brassHi, w: 3.4, back: 0.45 }); if (kEq < 1) bead(g, ...headOf(Q, kEq), 6, 1); }
    bead(g, pole[0], pole[1], 6 * (1 - 0.5 * shrink), kPole);
    // nhãn trên cầu (cỡ theo quả cầu)
    const s = R / 290, lk = 1 - shrink;
    if (lk > 0) {
      engrave(g, '中心', pole[0] + 14, pole[1] - 14, prog(t, T.ten, T.ten + 0.3) - prog(t, T.hokkyoku - 0.3, T.hokkyoku), `500 28px ${JP}`, C.ivory, { spark: false });
      engrave(g, '北極', pole[0] + 14, pole[1] - 14, prog(t, T.hokkyoku, T.hokkyoku + 0.3) * lk, `500 28px ${JP}`, C.ivory, { spark: false });
      engrave(g, '赤道', cx + R * 0.72, cy + R * Math.sin(EL) * 0.7 + 44, prog(t, T.sekido + 0.4, T.sekido + 0.8) * lk, `500 28px ${JP}`, C.brassHi, { spark: false });
      const kc = prog(t, T.en113 + 0.2, T.en113 + 0.6) - prog(t, T.l116 - 0.4, T.l116);
      if (kc > 0) { const p = sph(Sp, lat, 0); engrave(g, '円周', p[0], p[1] + 40, kc, `500 28px ${JP}`, C.brassHi, { align: 'center', spark: false }); }
      const kd = prog(t, T.chokkei113 + 0.4, T.chokkei113 + 0.8) - prog(t, T.l116 - 0.4, T.l116) + prog(t, T.made, T.made + 0.4) * lk;
      if (kd > 0) { const [dx, dy] = headOf(dia, 0.24); engrave(g, '直径', dx + 16, dy - 10, clamp(kd), `500 28px ${JP}`, C.ivory, { spark: false }); }
    }

    // cột phải câu 111–115
    const o3 = out(t, T.l116 - 0.3);
    if (t > T.kyu - 0.3 && o3 < 1) {
      g.save(); g.translate(800 * o3, 0);
      telop(g, '巨大な球の上', 1230, 330, prog(t, T.kyu, T.kyu + 0.7), { size: 40 });
      engrave(g, '同じ距離だけ歩いて 円を描く', 1232, 420, prog(t, T.onaji, T.egaki), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      const A = telop(g, [['円周', `700 44px ${MIN}`], [' ÷ ', `500 44px ${JP}`, C.dim], ['直径', `700 44px ${MIN}`]], 1230, 560, prog(t, T.watte - 0.2, T.watte + 0.6), { size: 44 });
      engrave(g, [['＜ ', `500 60px ${JP}`, C.ivory], ['π', `600 76px ${CG}`, C.shu]], A.x + A.w + 26, 572, prog(t, T.chiisaku - 0.1, T.chiisaku + 0.3));
      telop(g, [['丸みのせいで ', `700 36px ${MIN}`], ['円周が短い', `700 36px ${MIN}`, C.brassHi]], 1230, 720, prog(t, T.mijika - 0.4, T.mijika + 0.5), { size: 36 });
      g.restore();
    }

    // ── ③ cực Bắc + xích đạo (câu 116–119): cột x 1100–1480 (mascot đứng 1500–1800) ──
    const o4 = out(t, T.l120 - 0.2);
    if (t > T.kyokutan - 0.3 && o4 < 1) {
      g.save(); g.translate(900 * o4, 0);
      engrave(g, '極端な例', 1110, 280, prog(t, T.kyokutan, T.kyokutan + 0.4), `500 28px ${JP}`, C.brass, { ls: 8, spark: false });
      // hai thước: 円周 = cả vòng xích đạo, 直径 = nửa
      const x0 = 1210, Lb = 240, kb1 = prog(t, T.isshu, T.isshu + 0.9), kb2 = prog(t, T.chokkei117, T.chokkei117 + 0.7);
      engrave(g, '円周', 1110, 404, prog(t, T.isshu - 0.1, T.isshu + 0.3), `700 34px ${MIN}`, C.brassHi, { spark: false });
      rule(g, x0, x0 + Lb, 392, kb1, { color: C.brassHi, a: 1 });
      if (kb1 > 0) engrave(g, '赤道1周', x0, 372, prog(t, T.isshu + 0.3, T.isshu + 0.8), `500 28px ${JP}`, C.dim, { spark: false });
      engrave(g, '直径', 1110, 494, prog(t, T.chokkei117 - 0.1, T.chokkei117 + 0.3), `700 34px ${MIN}`, C.ivory, { spark: false });
      rule(g, x0, x0 + Lb / 2, 482, kb2, { color: C.ivory, a: 1 });
      if (kb2 > 0) engrave(g, '北極を越えて', x0, 462, prog(t, T.made - 0.3, T.made + 0.3), `500 28px ${JP}`, C.dim, { spark: false });
      // 半分: thước 直径 gấp đôi khít thước 円周 (bóng mờ nửa sau)
      const kh = prog(t, T.hanbun - 0.1, T.hanbun + 0.5);
      if (kh > 0) {
        g.save(); g.setLineDash([4, 5]); g.strokeStyle = C.dim; g.lineWidth = 1.2; g.globalAlpha = 0.8;
        g.beginPath(); g.moveTo(x0 + Lb / 2, 482.5); g.lineTo(x0 + Lb / 2 + Lb / 2 * outCubic(kh), 482.5); g.stroke(); g.restore();
        engrave(g, [['＝ 円周の ', `500 30px ${JP}`, C.ivory], ['½', `600 40px ${CG}`, C.brassHi]], x0 + Lb / 2 + 14, 540, prog(t, T.hanbun, T.hanbun + 0.5), undefined, C.ivory, { spark: false });
      }
      // 比 = 2
      const k2 = prog(t, T.hi119 - 0.2, T.two + 0.3);
      if (k2 > 0) {
        telop(g, [['円周', `700 44px ${MIN}`], [' ÷ ', `500 44px ${JP}`, C.dim], ['直径', `700 44px ${MIN}`]], 1120, 680, k2, { size: 44 });
        engrave(g, [['＝ ', `500 72px ${JP}`, C.ivory], ['2', `600 128px ${CG}`, C.brassHi]], 1140, 850, prog(t, T.two - 0.05, T.two + 0.25));
      }
      g.restore();
    }
    // mascot startled (không nói) — 「ちょうど2」
    const km = prog(t, T.l119 - 0.4, T.l119 + 0.2), om = out(t, T.kura - 0.3, 0.6);
    if (km > 0 && om < 1) { g.save(); g.translate(0, 900 * om); figure(g, 'startled', 1650, H, 720, km, { t, talk: false }); g.restore(); }

    // ── ④ 馬の鞍 (câu 120) ──
    if (t > T.l120 - 0.2) {
      const ks = prog(t, T.l120, T.kura + 0.4), kc = prog(t, T.hi120 - 0.4, T.hi120 + 0.6);
      saddle(g, 960, 610, 330, ks, kc, 0.4 + 0.012 * (t - T.l120));   // yaw cố định quanh 0.4 (yaw → 0 thành cái bát)
      engrave(g, '馬の鞍のような面', 1010, 960, prog(t, T.kura, T.kura + 0.6), `500 30px ${JP}`, C.dim, { align: 'center', ls: 3, spark: false });
      telop(g, [['円周', `700 44px ${MIN}`], [' ÷ ', `500 44px ${JP}`, C.dim], ['直径', `700 44px ${MIN}`], [' ＞ ', `500 52px ${JP}`], ['π', `600 64px ${CG}`, C.shu]],
        1390, 560, prog(t, T.ooki - 0.4, T.ooki + 0.5), { size: 44 });
      // bộ ba ＜ ＝ ＞: mặt phẳng ＝ π trên telop ＞ π
      engrave(g, [['平らな面 ', `700 34px ${MIN}`], ['＝ ', `500 36px ${JP}`], ['π', `600 46px ${CG}`, C.shu]], 1392, 440, prog(t, T.hi120 - 0.6, T.hi120), undefined, C.dim, { spark: false });
      // quả cầu nhỏ bên trái: ＜ π
      engrave(g, [['球の上 ', `700 34px ${MIN}`], ['＜ ', `500 36px ${JP}`], ['π', `600 46px ${CG}`, C.shu]], cx, 990, prog(t, T.l120 + 0.4, T.l120 + 1.0) * shrink, undefined, C.ivory, { align: 'center', spark: false });
    }
  }
}
