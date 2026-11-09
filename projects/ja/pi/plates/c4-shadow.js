// c4 · 回転の影 (p2, câu 65–74) — đúng khung lab 1 (tools/lab/tenkyu.html): vành đồng thau (900, 610) r 196, điểm quay
// đều trên chỉ vàng, kim + góc θ; thước 壁 ở x 1270, bóng điểm chạy lên/xuống; vẽ theo thời gian → sóng sin (một chu
// kỳ = 2π, rồi con trỏ chạy lại trên sóng). Ô trái lần lượt: mascot spin (vệt quỹ đạo quanh ngón, không nói) →
// 振り子 (lệch = sin θ, cùng nhịp với vành) + T = 2π√(L/g) → 音 (âm thoa, hạt khí nén/giãn, đồ thị 圧力) → 発電機 (cuộn
// dây quay giữa N/S, 交流, ổ cắm) → ba nhãn 振り子·音·交流 dẫn vào vành (回転が隠れて) → cung son nửa vòng = π, gạch son
// nửa chu kỳ trên sóng (円周率が測りにやってくる) → 「円は回転の絵」, chỉ vàng của đường tròn mờ đi, 「π のふるさと ＝ 回転」.
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, sk,
  ground, ring360, circleLine, arcShu, pivot, bead, engrave, telop, heading, leader, rule, measure, figure, ringGeom, mk } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));            // 0 → 1 rời khung
const CX = 900, CY = 610, R = 196;                                        // vành (lab 1)
const WX0 = 1270, WX1 = 1790, PER = WX1 - WX0;                             // thước 壁 + trục thời gian (một chu kỳ = PER)
const X = a => WX0 + a / TAU * PER, Y = v => CY - R * v;
const OMEGA = TAU / 6;
const HY = CY - R - 70;                                                    // 「半回転 = π」 NGOÀI vành, trên đỉnh (không đè đường chiếu/kim/θ)
// công thức chu kỳ: T = 2π √(L / g) — dấu căn VẼ bằng nét liền (glyph √ Cormorant nhỏ hơn L/g); chỗ trống GAP giữa 2π và căn
const fT = `italic 500 60px ${CG}`, fEq = `400 52px ${CG}`, fPi = `600 60px ${CG}`, fL = `italic 500 52px ${CG}`;
const GAP = '\u2002\u2002', RAD = '\u2002\u2002', ORX = 50, ORY = 40, OX = 6;   // vòng ◯ quanh 2π: bán trục ngang / dọc, tâm lệch phải (xa dấu =)                                                    // một vòng / 6 s — 一定の速さ

export default class Shadow {
  static ERA = 'tenkyu';
  static POSES = ['spin'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      kou: w(65, 'こう'), basho: w(65, '場所'), en65: w(65, '円周'), kao: w(65, '顔'),
      l66: S(66), en66: w(66, '円'), ittei: w(66, '一定'), mawaru: w(66, '回る'), omoi: w(66, '思い浮かべて'), kabe: w(66, '壁'), kage: w(66, '影'), miru: w(66, '見ます'),
      l67: S(67), up1: w(67, '上'), dn1: w(67, '下'), up2: w(67, '上', 2), dn2: w(67, '下', 2), ugoku: w(67, '動く'), e67: E(67),
      l68: S(68), jikan: w(68, '時間'), egaku: w(68, '描く'), nami: w(68, '波'), sain: w(68, 'サイン波'),
      l69: S(69), furiko: w(69, '振り子'), mono: w(69, 'もの'),
      yure: w(70, '揺れ'), chiisai: w(70, '小さい'), shuuki: w(70, '周期'), shiki: w(70, '式'), twopi: w(70, '2π'), e70: E(70),
      l71: S(71), oto: w(71, '音'), kuuki: w(71, '空気'), atsu: w(71, '圧力'), agat: w(71, '上がっ'), sagat: w(71, '下がっ'), nami71: w(71, '波'),
      l72: S(72), konsento: w(72, 'コンセント'), kouryuu: w(72, '交流'), hatsu: w(72, '発電'), mawaru72: w(72, '回る'), koiru: w(72, 'コイル'),
      l73: S(73), kuri: w(73, 'くり返す'), oku: w(73, '奥'), kaiten: w(73, '回転'), en73: w(73, '円周'), hakari: w(73, '測り'),
      l74: S(74), en74: w(74, '円'), e_: w(74, '絵'), en74b: w(74, '円周'), furusato: w(74, 'ふるさと'), en74c: w(74, '円', 2), nai: w(74, 'ない'), end: E(74),
    };
    this.START = S(65);
    this.FROM = Math.max(this.START - 1.2, L(64).end + 0.5);
    must('Math.sin(Math.PI / 2)', 1); must('Math.sin(3 * Math.PI / 2)', -1);   // thước 壁: vạch 1 / −1 = bán kính
    must(`${X(Math.PI)} - ${WX0}`, PER / 2);                               // nửa vòng = nửa chu kỳ sóng
    must(`${X(TAU)}`, WX1);
    must(`${HY} + 8 < ${CY - ringGeom(R).r1}`, true);                         // nhãn 半回転 không chạm mép vành
    const g0 = mk(4, 4).getContext('2d'), w2 = measure(g0, '2π', fPi), wG = measure(g0, GAP, fEq), wE = measure(g0, '  =  ', fEq);
    must(`${OX} + ${ORX} + 4 <= ${w2} / 2 + ${wG}`, true);                              // ◯ không chạm dấu căn
    must(`${ORX} - ${OX} - ${w2} / 2 <= ${wE} - 16`, true);                        // ◯ không chạm dấu =
  }
  // góc điểm quay (toán, rad): đứng yên tới 回る, rồi quay đều; θ = 0 đúng lúc sóng bắt đầu vẽ (描く)
  th(t) { return OMEGA * (Math.max(t, this.T.mawaru) - this.T.egaku); }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.basho, 'tick'), c(T.kao, 'pop'),
      c(this.FROM + 0.9, 'pop'), c(T.ittei, 'tick'), c(T.mawaru, 'whoosh-long'), 
      c(T.kabe, 'pen'), 
      c(T.up1, 'tick'), 
      c(T.jikan, 'tick'), c(T.egaku, 'pen'), c(T.sain, 'tick'),
      c(T.furiko, 'pop'), c(T.chiisai, 'tick'), c(T.shiki, 'tick'), c(T.twopi, 'pen'),
      c(T.oto, 'pop'), c(T.atsu, 'pen'), 
      c(T.konsento, 'snap'), c(T.kouryuu, 'pen'), c(T.hatsu, 'pop'), 
      c(T.kuri, 'tick'), c(T.kaiten, 'pen'), c(T.en73, 'suzu'), 
      c(T.e_, 'tick'), c(T.furusato, 'pen'), 
    ];
  }
  render(g, t) {
    const T = this.T, F0 = this.FROM;
    const trails = 0.7 * smooth(prog(t, F0 + 0.9, F0 + 2.6)) * (1 - smooth(prog(t, T.end - 0.6, T.end + 0.5)));
    ground(g, 'tenkyu', t, { trails });
    heading(g, '第二幕　円周率は「回転」の数', '回転の影', prog(t, F0 + 0.3, F0 + 1.6));

    // ── vành + điểm quay (lab 1) ──
    const kR = prog(t, F0 + 0.3, F0 + 1.3);
    const kPi = prog(t, T.en73, T.en73 + 0.8);                              // π đo nửa vòng (câu 73)
    ring360(g, CX, CY, R, kR, { thread: false, marks: kPi > 0.3 ? [[0, C.shu], [180, C.shu]] : [] });
    // chỉ vàng: rõ ở 「絵」, mờ đi ở 「ふるさと」 (đường tròn chỉ là bức tranh của sự quay)
    const pic = prog(t, T.e_ - 0.2, T.e_ + 0.4) * (1 - prog(t, T.furusato, T.furusato + 0.8));
    const dimC = prog(t, T.furusato, T.furusato + 0.8);
    if (kR > 0.5) {
      const kc = clamp((kR - 0.5) / 0.5);
      g.save(); g.globalAlpha = 1 - 0.62 * dimC;
      circleLine(g, CX, CY, R, kc, { w: 1.8 + 1.6 * pic });
      g.restore();
    }
    const kAx = prog(t, F0 + 0.5, F0 + 1.3);
    if (kAx > 0) {                                                        // lưới trục mảnh
      g.save(); g.globalAlpha = kAx; g.strokeStyle = 'rgba(142,156,192,0.35)'; g.lineWidth = 1; g.beginPath();
      g.moveTo(CX - R, CY + 0.5); g.lineTo(CX + R, CY + 0.5); g.moveTo(CX + 0.5, CY - R); g.lineTo(CX + 0.5, CY + R); g.stroke(); g.restore();
    }
    // cung son nửa vòng = π + 「半回転 = π」 (câu 73)
    arcShu(g, CX, CY, R, 0, Math.PI, kPi);
    if (kPi > 0) engrave(g, [['半回転', `700 34px ${MIN}`, C.ivory, 3], [' = ', `400 40px ${CG}`, C.dim], ['π', `600 64px ${CG}`, C.shu]], CX, HY,
      prog(t, T.en73 + 0.3, T.en73 + 0.9), undefined, C.ivory, { align: 'center' });

    const th = this.th(t), s = Math.sin(th);
    const px = CX + R * Math.cos(th), py = CY - R * s;
    const kP = prog(t, F0 + 0.9, F0 + 1.4);                                // điểm + bán kính + θ hiện ngay từ đầu cảnh (đứng yên tới 回る)
    if (kP > 0) {
      const ta = ((th % TAU) + TAU) % TAU;                               // góc θ nhỏ ở tâm (0 → θ)
      g.save(); g.globalAlpha = clamp(kP * 1.5);
      g.strokeStyle = 'rgba(243,223,162,0.7)'; g.lineWidth = 1; g.beginPath(); g.arc(CX, CY, 38, 0, -ta, true); g.stroke();
      g.strokeStyle = 'rgba(243,223,162,0.8)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(CX, CY); g.lineTo(CX + R, CY); g.stroke();
      g.strokeStyle = C.brass; g.lineWidth = 2.2; g.beginPath(); g.moveTo(CX, CY); g.lineTo(CX + (px - CX) * outCubic(kP), CY + (py - CY) * outCubic(kP)); g.stroke();
      g.restore();
      const ma = -Math.max(ta, 1.0) / 2;                                                // θ đặt giữa cung góc
      engrave(g, 'θ', CX + 62 * Math.cos(ma), CY + 62 * Math.sin(ma) + 9, kP, `400 28px ${JP}`, C.brassHi, { align: 'center', spark: false });
      engrave(g, '1', CX + R / 2, CY + 34, kP, `600 30px ${CG}`, C.ivory, { align: 'center', spark: false });
    }
    pivot(g, CX, CY);

    // ── thước 壁 + sóng theo thời gian ──
    const kW = prog(t, T.kabe, T.kabe + 0.6);
    if (kW > 0) {
      const e = outCubic(kW), y0 = Y(1) - 12, y1 = y0 + (Y(-1) + 12 - y0) * e;
      g.save();
      g.globalAlpha = e; g.strokeStyle = 'rgba(142,156,192,0.18)'; g.lineWidth = 1;
      [1, 0.5, -0.5, -1].forEach(v => { g.beginPath(); g.moveTo(WX0, Y(v) + 0.5); g.lineTo(WX0 + (WX1 - WX0) * e, Y(v) + 0.5); g.stroke(); });
      g.globalAlpha = 1; g.fillStyle = 'rgba(42,28,8,0.6)'; g.fillRect(WX0 - 6, y0, 6, y1 - y0);
      g.strokeStyle = C.brass; g.lineWidth = 1.4; g.beginPath(); g.moveTo(WX0 + 0.5, y0); g.lineTo(WX0 + 0.5, y1); g.stroke();
      for (let q = -10; q <= 10; q++) { const yy = Y(q / 10) + 0.5; if (yy > y1) continue; g.lineWidth = 1; g.beginPath(); g.moveTo(WX0, yy); g.lineTo(WX0 - (q % 5 === 0 ? 14 : 7), yy); g.stroke(); }
      g.restore();
      engrave(g, '1', WX0 - 20, Y(1) + 8, kW, `500 24px ${MONO}`, C.dim, { align: 'right', spark: false });
      engrave(g, '−1', WX0 - 20, Y(-1) + 8, prog(t, T.kabe + 0.4, T.kabe + 0.6), `500 24px ${MONO}`, C.dim, { align: 'right', spark: false });
      engrave(g, '壁', WX0, Y(1) - 28, kW, `500 28px ${JP}`, C.brass, { align: 'center', spark: false });
    }
    const kX = prog(t, T.jikan, T.jikan + 0.6);                            // trục thời gian
    if (kX > 0) {
      g.save(); g.strokeStyle = 'rgba(142,156,192,0.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(WX0, CY + 0.5); g.lineTo(WX0 + (WX1 + 10 - WX0) * outCubic(kX), CY + 0.5); g.stroke(); g.restore();
      engrave(g, '時間 →', WX1 + 10, CY - 18, kX, `500 28px ${JP}`, C.dim, { align: 'right', ls: 2, spark: false });
    }
    const drawn = t >= T.egaku ? Math.min(th, TAU) : 0;                   // phần sóng đã vẽ (rad)
    if (kX > 0 && drawn < TAU) {                                          // phần chưa vẽ: chấm mờ
      g.save(); g.globalAlpha = kX;
      for (let a = drawn + 0.12; a <= TAU + 1e-9; a += 0.12) { g.fillStyle = 'rgba(243,223,162,0.45)'; g.beginPath(); g.arc(X(a), Y(Math.sin(a)), 1.7, 0, TAU); g.fill(); }
      g.restore();
    }
    if (drawn > 0) {
      g.save(); g.shadowColor = 'rgba(243,223,162,0.5)'; g.shadowBlur = 6; g.strokeStyle = C.brassHi; g.lineWidth = 2.4; g.lineJoin = 'round';
      g.beginPath(); for (let a = 0; a <= drawn + 1e-9; a += 0.01) { const x = X(a), y = Y(Math.sin(a)); a ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
    }
    // nửa chu kỳ đầu gạch son: sóng cũng "đi hết nửa vòng ở π" (câu 73)
    const kU = prog(t, T.hakari - 0.2, T.hakari + 0.4);
    if (kU > 0) {
      g.save(); g.strokeStyle = C.brass; g.lineWidth = 2; g.beginPath(); g.moveTo(X(0), CY + 22.5); g.lineTo(X(0) + (X(Math.PI) - X(0)) * outCubic(kU), CY + 22.5); g.stroke();
      g.beginPath(); g.moveTo(X(0) + 0.5, CY + 16); g.lineTo(X(0) + 0.5, CY + 29); if (kU >= 1) { g.moveTo(X(Math.PI) + 0.5, CY + 16); g.lineTo(X(Math.PI) + 0.5, CY + 29); } g.stroke(); g.restore();
      engrave(g, 'π', X(Math.PI), CY + 74, prog(t, T.hakari + 0.2, T.hakari + 0.5), `600 44px ${CG}`, C.shu, { align: 'center', spark: false });
      engrave(g, [['2', `600 40px ${CG}`, C.ivory], ['π', `600 44px ${CG}`, C.shu]], X(TAU), CY + 74, prog(t, T.hakari + 0.4, T.hakari + 0.7), undefined, C.ivory, { align: 'center', spark: false });
    }

    // ── chiếu: điểm → bóng trên 壁 → đầu sóng ──
    const kS = prog(t, T.kage, T.kage + 0.4), wy = Y(s);
    const hx = t >= T.egaku ? X(th >= TAU ? th % TAU : Math.max(0, th)) : WX0;
    if (kS > 0) {
      g.save(); g.globalAlpha = kS; g.strokeStyle = 'rgba(239,231,210,0.55)'; g.lineWidth = 1; g.setLineDash([2, 6]);
      g.beginPath(); g.moveTo(px + 12, wy + 0.5); g.lineTo(Math.max(WX0, hx) - 10, wy + 0.5); g.stroke(); g.restore();
      bead(g, WX0, wy, 5, kS);
      engrave(g, '影', WX0 + 16, wy + 36, kS, `500 28px ${JP}`, C.ivory, { spark: false });
      if (t >= T.egaku) bead(g, hx, wy, 6, prog(t, T.egaku, T.egaku + 0.3));
    }
    if (kP > 0) bead(g, px, py, 7 + 2 * dimC, kP);
    // 上へ・下へ: mũi tên đồng ở hai đầu thước, sáng đúng lúc đọc
    [[T.up1, 1], [T.dn1, -1], [T.up2, 1], [T.dn2, -1]].forEach(([a, dir], i) => {
      const k = prog(t, a, a + 0.25) * (1 - out(t, T.l68, 0.5));
      if (k <= 0) return;
      const x = WX0 - 64 - i * 0, y = dir > 0 ? Y(0.62) : Y(-0.62), lit = t < a + 0.6 ? 1 : 0.45;
      g.save(); g.globalAlpha = k * lit; g.fillStyle = C.brassHi; g.beginPath();
      g.moveTo(x, y - dir * 22); g.lineTo(x - 12, y - dir * 4); g.lineTo(x + 12, y - dir * 4); g.closePath(); g.fill();
      g.fillRect(x - 3, y - dir * 4 + (dir > 0 ? 0 : -18), 6, 18); g.restore();
    });
    // 説明 (lab 1): 右上
    engrave(g, [['一定の速さで回る点の、', `700 30px ${MIN}`, C.ivory, 2], ['影', `700 30px ${MIN}`, C.brassHi, 2], ['だけを見る', `700 30px ${MIN}`, C.ivory, 2]],
      WX1, 250, prog(t, T.ittei, T.miru + 0.4), undefined, C.ivory, { align: 'right' });
    engrave(g, [['→ ', `500 28px ${JP}`, C.dim], ['サイン波', `700 34px ${MIN}`, C.brassHi, 3]], WX1, 304, prog(t, T.sain - 0.1, T.sain + 0.5), undefined, C.ivory, { align: 'right' });

    // ── câu 65: 「円のない場所にも」 + π (trong vùng 壁, ra phải trước khi thước tới) ──
    const o65 = out(t, T.kabe - 0.5);
    if (t > T.basho - 0.2 && o65 < 1) {
      g.save(); g.translate(560 * o65, 0);
      telop(g, '円のない場所にも', 1530, 520, prog(t, T.basho, T.basho + 0.8), { size: 42, align: 'center' });
      const kp = prog(t, T.kao, T.kao + 0.4);
      engrave(g, 'π', 1530, 700 + 30 * (1 - outBack(kp)), kp, `600 120px ${CG}`, C.shu, { align: 'center', spark: false });
      g.restore();
    }

    // ── mascot spin (câu 66–67, không nói): ngón trỏ chỉ lên, vệt quỹ đạo quanh đầu ngón ──
    const km = prog(t, T.omoi - 0.3, T.omoi + 0.3), om = out(t, T.dn2, 0.6);
    if (km > 0 && om < 1) {
      g.save(); g.translate(0, 760 * om);
      const Fg = figure(g, 'spin', 300, H, 700, km, { talk: false });
      const tip = [Fg.x + Fg.w * 0.205, Fg.y + Fg.h * 0.211], oc = [tip[0] + 4, tip[1] - 46], rx = 70, ry = 22, tilt = -0.18;
      const P = a => [oc[0] + rx * Math.cos(a) * Math.cos(tilt) - ry * Math.sin(a) * Math.sin(tilt), oc[1] + rx * Math.cos(a) * Math.sin(tilt) + ry * Math.sin(a) * Math.cos(tilt)];
      const ko = prog(t, T.omoi + 0.2, T.omoi + 0.6);
      if (ko > 0) {
        g.globalAlpha = ko; g.strokeStyle = 'rgba(217,164,65,0.35)'; g.lineWidth = 1; g.beginPath();
        for (let a = 0; a <= TAU + 0.01; a += 0.05) { const [x, y] = P(a); a ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
        const head0 = 2.4 * t;                                              // vệt sao chổi quay quanh ngón
        for (let i = 0; i < 70; i++) { const [x0, y0] = P(head0 - (i + 1) * 0.06), [x1, y1] = P(head0 - i * 0.06);
          g.strokeStyle = `rgba(243,223,162,${0.9 * (1 - i / 70) ** 1.6})`; g.lineWidth = 2.4 * (1 - i / 70) + 0.4; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
        g.globalAlpha = 1; const [bx, by] = P(head0); bead(g, bx, by, 3.5, ko);
      }
      g.restore();
    }

    // ── 振り子 (câu 69–70): lệch = sin θ, cùng nhịp với vành; T = 2π√(L/g) ──
    const o1 = out(t, T.l71 - 0.35);
    if (t > T.furiko - 0.3 && o1 < 1) {
      g.save(); g.translate(-720 * o1, 0);
      const kb = prog(t, T.furiko - 0.2, T.furiko + 0.4), ox = 330, oy = 350, Lr = 340;
      telop(g, '振り子', 120, 296, prog(t, T.furiko, T.furiko + 0.6), { size: 36 });
      if (kb > 0) {
        const e = outCubic(kb);
        const gr = g.createLinearGradient(0, oy - 6, 0, oy + 6); gr.addColorStop(0, C.brassHi); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, C.brassLo);
        g.fillStyle = gr; g.fillRect(ox - 130 * e, oy - 5, 260 * e, 10);
        const ph = 0.3 * s * prog(t, T.furiko + 0.2, T.furiko + 0.9), bx = ox + Lr * Math.sin(ph) * e, by = oy + Lr * Math.cos(ph) * e;
        g.save(); g.globalAlpha = 0.4 * e; g.strokeStyle = C.dim; g.setLineDash([2, 6]); g.lineWidth = 1; g.beginPath(); g.arc(ox, oy, Lr, Math.PI / 2 - 0.34, Math.PI / 2 + 0.34); g.stroke(); g.restore();
        g.strokeStyle = C.brassHi; g.lineWidth = 2; g.beginPath(); g.moveTo(ox, oy); g.lineTo(bx, by); g.stroke();
        pivot(g, ox, oy, 0.8);
        const bg = g.createRadialGradient(bx - 6, by - 6, 2, bx, by, 22); bg.addColorStop(0, C.brassHi); bg.addColorStop(0.6, C.brass); bg.addColorStop(1, C.brassLo);
        g.fillStyle = bg; g.beginPath(); g.arc(bx, by, 22 * e, 0, TAU); g.fill();
        engrave(g, 'L', ox + 14, oy + Lr * 0.55, prog(t, T.shiki, T.shiki + 0.3), `italic 500 34px ${CG}`, C.ivory, { spark: false });
      }
      engrave(g, '揺れが小さいとき', 120, 806, prog(t, T.yure, T.chiisai + 0.6), `500 28px ${JP}`, C.dim, { ls: 3, spark: false });
      // T = 2π √(L / g): căn vẽ bằng nét (gạch trên dài theo L / g)
      const parts = [['T', fT, C.ivory], ['  =  ', fEq, C.dim], ['2π', fPi, C.shu], [GAP, fEq, C.ivory], [RAD, fL, C.ivory], ['L / g', fL, C.ivory]];
      const kf = prog(t, T.shiki - 0.1, T.twopi + 0.4), fx = 120, fy = 900;
      const r = engrave(g, parts, fx, fy, kf, undefined, C.ivory);
      const x2 = fx + measure(g, 'T', fT) + measure(g, '  =  ', fEq) + measure(g, '2π', fPi) / 2;
      const xr = fx + measure(g, 'T', fT) + measure(g, '  =  ', fEq) + measure(g, '2π', fPi) + measure(g, GAP, fEq), wr = measure(g, RAD, fL);
      const kr = clamp((kf - 10 / 17) / (2 / 17) * 1.2);                  // căn hiện đúng lúc khắc tới chỗ của nó (17 ký tự)
      if (kr > 0) {                                                       // √ nét liền: móc nhỏ → xuống → lên tới gạch trên → gạch trên phủ L / g
        const top = fy - 50, P = [[xr + 2, fy - 20], [xr + 9, fy - 25], [xr + wr * 0.45, fy + 10], [xr + wr - 2, top], [fx + r.w + 4, top]];
        const seg = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])), tot = seg.reduce((a, b) => a + b, 0);
        let left = tot * outCubic(kr);
        g.save(); g.strokeStyle = C.ivory; g.lineWidth = 2.4; g.lineJoin = 'round'; g.lineCap = 'round'; g.beginPath(); g.moveTo(...P[0]);
        for (let i = 0; i < seg.length && left > 0; i++) { const f = Math.min(1, left / seg[i]); g.lineTo(P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f); left -= seg[i]; }
        g.stroke(); g.restore();
      }
      const kc = prog(t, T.twopi, T.twopi + 0.5);                           // ◯ đồng quanh 2π
      if (kc > 0) {
        g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.2; g.lineCap = 'round'; g.beginPath();
        g.ellipse(x2 + OX, fy - 20, ORX, ORY, -0.05, -Math.PI / 2, -Math.PI / 2 + TAU * 1.04 * outCubic(kc)); g.stroke(); g.restore();
      }
      engrave(g, '周期', fx + 4, fy + 52, prog(t, T.shuuki, T.shuuki + 0.4), `500 28px ${JP}`, C.brass, { ls: 3, spark: false });
      g.restore();
    }

    // ── 音 (câu 71): âm thoa + hạt khí nén/giãn cùng nhịp, đồ thị 圧力 ──
    const o2 = out(t, T.l72 - 0.35);
    if (t > T.l71 - 0.4 && o2 < 1) {
      g.save(); g.translate(-720 * o2, 0);
      const ki = prog(t, T.l71 - 0.35, T.l71 + 0.25);
      g.translate(-520 * (1 - outCubic(ki)), 0);
      telop(g, [['音', `700 40px ${MIN}`], ['  ＝ 空気の', `700 34px ${MIN}`], ['圧力', `700 34px ${MIN}`, C.brassHi], ['の波', `700 34px ${MIN}`]], 120, 296,
        prog(t, T.oto, T.atsu + 0.6), { size: 36 });
      // âm thoa đồng thau
      const fx = 165, vib = 2.2 * Math.sin(t * 40) * prog(t, T.oto, T.oto + 0.3);
      g.save(); g.lineCap = 'round'; g.strokeStyle = C.brass; g.lineWidth = 11;
      g.beginPath(); g.moveTo(fx - 20 - vib, 420); g.lineTo(fx - 20 - vib, 560); g.arc(fx, 560, 20, Math.PI, 0, true); g.lineTo(fx + 20 + vib, 420); g.stroke();
      g.beginPath(); g.moveTo(fx, 580); g.lineTo(fx, 660); g.stroke();
      g.strokeStyle = 'rgba(255,240,200,0.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(fx - 24 - vib, 424); g.lineTo(fx - 24 - vib, 556); g.stroke(); g.restore();
      // hạt khí: dời ngang theo sóng dọc; nén = dày
      const kq = prog(t, T.kuuki, T.kuuki + 0.6), lam = 120, phase = th * 2;
      if (kq > 0) {
        g.save();
        for (let row = 0; row < 7; row++) for (let col = 0; col < 22; col++) {
          const x0 = 240 + col * 16, y = 420 + row * 30 + (row % 2) * 4;
          if ((x0 - 240) / 352 > outCubic(kq)) continue;
          const dx = 7 * Math.sin(TAU * (x0 - 240) / lam - phase);
          g.fillStyle = 'rgba(239,231,210,0.75)'; g.beginPath(); g.arc(x0 + dx, y, 2.4, 0, TAU); g.fill();
        }
        g.restore();
      }
      // đồ thị 圧力 (nén ↔ giãn)
      const ka = prog(t, T.atsu, T.atsu + 0.6);
      if (ka > 0) {
        const gy = 740, ex = 240 + 352 * outCubic(ka);
        g.save(); g.strokeStyle = 'rgba(142,156,192,0.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(240, gy + 0.5); g.lineTo(ex, gy + 0.5); g.stroke();
        g.strokeStyle = C.brassHi; g.lineWidth = 2.2; g.beginPath();
        for (let x = 240; x <= ex; x += 2) { const y = gy - 48 * -Math.cos(TAU * (x - 240) / lam - phase); x === 240 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); g.restore();
        engrave(g, '圧力', 120, gy + 10, ka, `500 28px ${JP}`, C.brass, { ls: 2, spark: false });
      }
      engrave(g, '↑ 上がる', 250, 860, prog(t, T.agat, T.agat + 0.3), `500 28px ${JP}`, C.ivory, { spark: false });
      engrave(g, '↓ 下がる', 430, 860, prog(t, T.sagat, T.sagat + 0.3), `500 28px ${JP}`, C.ivory, { spark: false });
      engrave(g, '同じリズム', 250, 930, prog(t, T.agat - 1.0, T.agat - 0.4), `500 28px ${JP}`, C.dim, { ls: 3, spark: false });
      g.restore();
    }

    // ── 交流 (câu 72): ổ cắm ← sóng 交流 ← cuộn dây quay giữa N/S trong 発電機 ──
    const o3 = out(t, T.l73 - 0.35);
    if (t > T.l72 - 0.4 && o3 < 1) {
      g.save(); g.translate(-720 * o3, 0);
      const ki = prog(t, T.l72 - 0.35, T.l72 + 0.25);
      g.translate(-520 * (1 - outCubic(ki)), 0);
      telop(g, [['発電機', `700 36px ${MIN}`], ['の中で回るコイル', `700 30px ${MIN}`, C.dim]], 120, 296, prog(t, T.hatsu - 0.1, T.koiru + 0.5), { size: 36 });
      // ổ cắm (コンセント) kiểu Nhật: tấm ngà, hai khe dọc
      const kk = prog(t, T.konsento, T.konsento + 0.4);
      if (kk > 0) {
        const s0 = outBack(kk), ox = 520, oy = 800;
        g.save(); g.translate(ox, oy); g.scale(s0, s0);
        g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.roundRect(-36, -48, 76, 100, 10); g.fill();
        g.fillStyle = '#D9D2BF'; g.beginPath(); g.roundRect(-38, -50, 76, 100, 10); g.fill();
        g.strokeStyle = 'rgba(42,28,8,0.6)'; g.lineWidth = 1.2; g.stroke();
        g.fillStyle = '#2A2620'; g.fillRect(-16, -22, 7, 26); g.fillRect(9, -22, 7, 26); g.beginPath(); g.arc(0, 26, 6, 0, TAU); g.fill();
        g.restore();
      }
      // sóng 交流 (điện áp = sin θ, cùng nhịp với vành), chạy về ổ cắm
      const kac = prog(t, T.kouryuu, T.kouryuu + 0.6);
      if (kac > 0) {
        const gy = 800, x0 = 140, x1 = 440, ex = x0 + (x1 - x0) * outCubic(kac);
        g.save(); g.strokeStyle = 'rgba(142,156,192,0.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, gy + 0.5); g.lineTo(ex, gy + 0.5); g.stroke();
        g.strokeStyle = C.brassHi; g.lineWidth = 2.2; g.beginPath();
        for (let x = x0; x <= ex; x += 2) { const y = gy - 44 * Math.sin(th - TAU * (x - x0) / 150); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke();
        if (kac >= 1) { g.strokeStyle = 'rgba(217,164,65,0.7)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(x1, gy + 0.5); g.lineTo(482, gy + 0.5); g.stroke(); }
        g.restore();
        engrave(g, '交流', x0, gy + 88, kac, `700 34px ${MIN}`, C.brass, { ls: 4 });
      }
      // 発電機: nam châm N (thép) / S (đồng), cuộn dây quay quanh trục dọc
      const kg = prog(t, T.hatsu, T.hatsu + 0.5);
      if (kg > 0) {
        const e = outCubic(kg), ax = 330;
        g.save(); g.globalAlpha = e;
        const mag = (x, col, lab) => { g.fillStyle = col; g.fillRect(x, 410, 56, 200); g.strokeStyle = 'rgba(0,0,0,0.5)'; g.lineWidth = 1; g.strokeRect(x + 0.5, 410.5, 55, 199); };
        mag(150 - 40 * (1 - e), C.steelDim); mag(454 + 40 * (1 - e), C.brassLo);
        g.restore();
        engrave(g, 'N', 178 - 40 * (1 - e), 528, kg, `600 40px ${CG}`, C.ai0, { align: 'center', spark: false, shadow: false });
        engrave(g, 'S', 482 + 40 * (1 - e), 528, kg, `600 40px ${CG}`, C.brassHi, { align: 'center', spark: false });
        g.save(); g.globalAlpha = e;
        g.strokeStyle = C.brass; g.lineWidth = 2; g.beginPath(); g.moveTo(ax, 380); g.lineTo(ax, 660); g.stroke();
        const hw = 92 * Math.cos(th * 1.0);                                  // bề rộng chiếu của cuộn dây quay
        for (let j = 0; j < 3; j++) {
          const ww = hw * (1 - j * 0.12), hh = 84 - j * 9;
          g.strokeStyle = j === 0 ? C.brassHi : C.brass; g.lineWidth = j === 0 ? 3 : 1.6;
          g.strokeRect(ax - ww, 510 - hh, 2 * ww, 2 * hh);
        }
        g.restore();
        engrave(g, 'コイル', ax, 712, prog(t, T.koiru, T.koiru + 0.4), `500 28px ${JP}`, C.ivory, { align: 'center', ls: 3, spark: false });
      }
      g.restore();
    }

    // ── câu 73: ba nhãn 振り子 · 音 · 交流 → dây dẫn vào vành (回転が隠れて) ──
    const o4 = out(t, T.l74 - 0.35);
    if (t > T.kuri - 0.3 && o4 < 1) {
      g.save(); g.translate(-720 * o4, 0);
      engrave(g, 'くり返すところ', 120, 330, prog(t, T.kuri - 0.2, T.kuri + 0.4), `500 28px ${JP}`, C.brass, { ls: 6, spark: false });
      const items = ['振り子', '音', '交流の電気'], ys = [440, 560, 680], ends = [[CX - R - 58, CY - 150], [CX - R - 66, CY - 30], [CX - R - 58, CY + 90]];
      items.forEach((s0, i) => {
        const b = telop(g, s0, 120, ys[i], prog(t, T.kuri + i * 0.33, T.kuri + i * 0.33 + 0.5), { size: 38 });
        const kl = prog(t, T.kaiten + i * 0.12, T.kaiten + i * 0.12 + 0.5);
        leader(g, b.x + b.w + 8, ys[i] - 14, ends[i][0], ends[i][1], kl);
      });
      engrave(g, [['奥に ', `700 34px ${MIN}`, C.dim], ['回転', `700 40px ${MIN}`, C.brassHi]], 120, 820, prog(t, T.oku, T.kaiten + 0.5), undefined, C.ivory, { ls: 2 });
      g.restore();
    }

    // ── câu 74: 「円は 回転の絵」 → 「π のふるさと ＝ 回転」 ──
    if (t > T.en74 - 0.3) {
      telop(g, [['円', `700 42px ${MIN}`], [' は回転の ', `700 34px ${MIN}`, C.dim], ['絵', `700 42px ${MIN}`, C.brassHi]], 120, 470,
        prog(t, T.en74, T.e_ + 0.4), { size: 42 });
      engrave(g, 'いちばん見えやすい', 140, 560, prog(t, T.e_ - 0.8, T.e_ - 0.1), `500 28px ${JP}`, C.dim, { ls: 3, spark: false });
      engrave(g, [['π', `600 76px ${CG}`, C.shu], [' のふるさと', `700 42px ${MIN}`, C.ivory, 3]], 120, 720, prog(t, T.en74b, T.furusato + 0.5), undefined, C.ivory);
      engrave(g, [['＝ ', `500 52px ${CG}`, C.dim], ['回転', `700 64px ${MIN}`, C.brassHi, 4]], 150, 830, prog(t, T.furusato + 0.4, T.en74c + 0.3), undefined, C.ivory);
      rule(g, 150, 420, 862, prog(t, T.en74c, T.nai + 0.2));
    }
  }
}
