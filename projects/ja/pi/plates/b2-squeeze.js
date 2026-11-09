// b2 · アルキメデスのはさみうち (p2, câu 7–19) — khung lab tenkyu 0: vành (vật chính, r 300) bên trái; đa giác NỘI tiếp
// đồng / NGOẠI tiếp thép; bảng 6 → 96 bên phải; 3.1408 < π < 3.1429 (223/71, 22/7). Mạch: Archimedes (ảnh Fetti,
// 想像図) → thước thẳng không đo được đường cong → vẽ nội tiếp (mascot compass, không nói) → ngoại tiếp → kẹp (khe
// đồng) → bảng: lục giác, rồi nhân đôi cạnh — đỉnh mới mọc từ trung điểm cạnh cũ ra đường tròn (đúng phép dựng) →
// kính lúp: khe nhỏ dần → bất đẳng thức của Archimedes, π son.
import { C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, smooth, sk,
  ground, ring360, circleLine, needle, pivot, polyIn, drawPoly, gap, engrave, telop, rule, heading,
  plate, figure, measure, leader, PERIM, PERIM_TABLE, ARCH, f4 } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
// khoảng cách từ tâm tới đa giác đều (đỉnh ở bán kính Rv, đỉnh đầu ở góc a0) theo tia góc th (góc canvas)
const polyDist = (n, Rv, a0, th) => { const s = TAU / n, d = (((th - a0 - s / 2) % s) + s) % s - s / 2; return Rv * Math.cos(Math.PI / n) / Math.cos(d); };
/** Đa giác nNew (= 2·nOld) đang mọc từ nOld: mỗi đỉnh mới đi từ đa giác cũ (cùng tia) ra vị trí thật, e 0→1. */
export function polyGrow(cx, cy, r, nOld, nNew, e, outer) {
  const Rv = n => outer ? r / Math.cos(Math.PI / n) : r, A0 = n => -Math.PI / 2 + (outer ? Math.PI / n : 0);
  return Array.from({ length: nNew }, (_, i) => {
    const th = A0(nNew) + i * TAU / nNew, d0 = polyDist(nOld, Rv(nOld), A0(nOld), th), d = d0 + (Rv(nNew) - d0) * e;
    return [cx + d * Math.cos(th), cy + d * Math.sin(th)];
  });
}
const NS = [6, 12, 24, 48, 96];
// trạng thái đa giác ở t theo mốc nhân đôi ts (ts[j] = lúc 6·2^j → 6·2^(j+1)): { nOld, nNew, e }
function stage(t, ts, dur = 0.5) {
  let j = 0; while (j < ts.length && t >= ts[j]) j++;
  if (j === 0) return { nOld: 6, nNew: 6, e: 1, n: 6 };
  return { nOld: NS[j - 1], nNew: NS[j], e: smooth(prog(t, ts[j - 1], ts[j - 1] + dur)), n: NS[j] };
}

export default class Squeeze {
  static ERA = 'tenkyu';
  static IMAGES = { archimedes: './assets/history/Domenico-Fetti_Archimedes_1620.jpg' };
  static POSES = ['compass'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l7: S(7), sujimichi: w(7, '筋道'), kigen: w(7, '紀元'), shira: w(7, 'シラクサ'), arch: w(7, 'アルキメデス'),
      l8: S(8), kotoba: w(8, '言葉'), magatta: w(8, '曲がった'), massugu: w(8, 'まっすぐ'), dekimasen: w(8, 'できません'),
      l9: S(9), uchigawa: w(9, '内側'), tak9: w(9, '多角形'), kaki9: w(9, '描きます'),
      l10: S(10), shuu10: w(10, '周'), mijika: w(10, '短く'),
      l11: S(11), sotogawa: w(11, '外側'), tak11: w(11, '多角形'), kaki11: w(11, '描きます'),
      l12: S(12), nagaku: w(12, '長く'),
      l13: S(13), chokusetsu: w(13, '直接'), futatsu: w(13, '2つ'), hasama: w(13, 'はさまれて'),
      l14: S(14), roku: w(14, '正六角形'), hajime: w(14, '始めました'),
      l15: S(15), chokkei: w(15, '直径'), n3: w(15, '3'), n346: w(15, '3.46'), oozappa: w(15, '大ざっぱ'),
      l16: S(16), dbl: [w(16, '12'), w(16, '24'), w(16, '48'), w(16, '96')],
      l17: S(17), sukima: w(17, 'すきま'), chiisaku: w(17, '小さく'),
      l18: S(18), s96: w(18, '正96角形'), a1408: w(18, '3.1408'), a1429: w(18, '3.1429'), aida: w(18, 'あいだ'), shoumei: w(18, '証明'),
      l19: S(19), f227: w(19, '22/7'), najimi: w(19, 'おなじみ'), e19: E(19),
    };
    this.START = S(7);
    this.FROM = Math.max(this.START - 1.2, E(6) + 0.5);
    const T = this.T;
    // kính lúp (câu 17): phát lại 6 → 96 trong lúc "2倍にするたびに…すきまは小さく"
    this.LOUPE = [1, 2, 3, 4].map(j => T.l17 + 0.3 + j * ((T.chiisaku - T.l17) / 4.2));
    this.LO = must(`${f4(ARCH[0])}`, 3.1408); this.HI = must(`${f4(ARCH[1])}`, 3.1429);
    must(`${f4(PERIM(6).inn)}`, 3); must(`${f4(PERIM(6).out)}`, 3.4641);
    must('Math.round(Math.sqrt(12) * 100) / 100', 3.46);                // 3.46 (lời đọc) = 6·tan30° = 2√3
    // bảng ghi giá trị THẬT 96-giác (3.1410 / 3.1427); Archimedes làm tròn RA NGOÀI bằng phân số → 3.1408 / 3.1429
    this.IN96 = must(`${f4(PERIM(96).inn)}`, 3.141); this.OUT96 = must(`${f4(PERIM(96).out)}`, 3.1427);
    must(`${PERIM(96).inn} > 223 / 71 && ${PERIM(96).out} < 22 / 7`, true);
    must(`${this.LO} < ${this.IN96} && ${this.OUT96} < ${this.HI}`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.l7 + 0.2, 'page'), c(T.sujimichi, 'tick'), c(T.kigen, 'tick'), c(T.shira, 'tick'),
      c(T.kotoba, 'tick'), c(T.magatta, 'tick'), c(T.massugu + 0.3, 'snap'), c(T.dekimasen, 'tick'),
      c(T.uchigawa, 'tick'), c(T.tak9 + 0.3, 'pen'), c(T.mijika, 'tick'),
      c(T.sotogawa, 'tick'), c(T.tak11 + 0.3, 'pen'), c(T.nagaku, 'tick'),
      c(T.chokusetsu, 'tick'), c(T.futatsu, 'tick'), c(T.hasama, 'snap'),
      c(T.roku, 'tick'), c(T.chokkei, 'pen'), c(T.n3, 'type'), c(T.n346, 'type'), c(T.oozappa, 'tick'),
      ...T.dbl.map(t => c(t, 'soroban')),
      c(T.l17 + 0.1, 'tick'), c(T.sukima, 'tick'),
      c(T.s96, 'tick'), c(T.a1408, 'type'), c(T.a1429, 'type'), c(T.aida, 'suzu'), c(T.shoumei + 0.2, 'pen'),
      c(T.f227, 'tick'), c(T.najimi, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T, CX = 540, CY = 620, R = 300;
    ground(g, 'tenkyu', t);
    heading(g, '第一幕　円をはさみうちにする', 'アルキメデスのはさみうち', prog(t, this.FROM + 0.3, this.START + 1.4));

    // ── vành (vật chính) + đa giác ──
    const rot = t * 0.02;
    ring360(g, CX, CY, R, prog(t, this.FROM + 0.3, this.START + 1.0), { rot, thread: false });
    const glow = prog(t, T.chokusetsu, T.chokusetsu + 0.6) - prog(t, T.hasama + 0.8, T.hasama + 1.6);
    circleLine(g, CX, CY, R, prog(t, this.FROM + 0.8, this.START + 1.4), { w: 1.8 + 2 * glow });
    const st = stage(t, T.dbl);
    const kIn = prog(t, T.tak9, T.kaki9 + 0.6), kOut = prog(t, T.tak11, T.kaki11 + 0.6);
    const Pin = st.nNew === 6 ? polyIn(CX, CY, R, 6) : polyGrow(CX, CY, R, st.nOld, st.nNew, st.e, false);
    const Pout = st.nNew === 6 ? polyIn(CX, CY, R / Math.cos(Math.PI / 6), 6, -Math.PI / 2 + Math.PI / 6) : polyGrow(CX, CY, R, st.nOld, st.nNew, st.e, true);
    if (kIn >= 1 && kOut >= 1) gap(g, Pin, Pout, 0.16 * prog(t, T.hasama, T.hasama + 0.6));
    drawPoly(g, Pout, kOut, { color: C.steel, w: 1.6 });
    const hiIn = prog(t, T.shuu10, T.shuu10 + 0.4) - prog(t, T.mijika + 0.6, T.mijika + 1.2);
    drawPoly(g, Pin, kIn, { color: hiIn > 0 ? C.brassHi : C.brass, w: 1.6 + 1.6 * hiIn, dots: st.n <= 24 && kIn >= 1 });
    // đường kính 1 (câu 15)
    const kd = prog(t, T.chokkei, T.chokkei + 0.6);
    if (kd > 0) {
      g.save(); g.strokeStyle = 'rgba(142,156,192,0.75)'; g.lineWidth = 1.2; g.setLineDash([3, 6]);
      g.beginPath(); g.moveTo(CX - R, CY); g.lineTo(CX - R + 2 * R * outCubic(kd), CY); g.stroke(); g.restore();
      engrave(g, [['直径 ', `500 28px ${JP}`, C.dim], ['1', `600 34px ${CG}`, C.ivory]], CX + R * 0.5, CY + 40, prog(t, T.chokkei + 0.3, T.chokkei + 0.7), undefined, C.ivory, { align: 'center', spark: false });
    }
    // nhãn trong mặt số: 正n角形 (từ câu 14; chu vi đã ở bảng bên phải)
    const kL = prog(t, T.roku, T.roku + 0.6);
    if (kL > 0) {
      const n = st.n, name = n === 6 ? '正六角形' : `正${n}角形`;
      engrave(g, name, CX, CY - 150, kL, `700 36px ${MIN}`, C.ivory, { align: 'center', ls: 4 });
    }
    // kim (câu 7–8, tâm vành còn trống) rút vào khi vẽ đa giác
    const kN = Math.min(prog(t, this.FROM + 0.6, this.START + 1.2), 1 - prog(t, T.l9 - 0.6, T.l9));
    if (kN > 0) needle(g, CX, CY, R * 0.8, -0.6 + t * 0.3, kN); else pivot(g, CX, CY);

    // ── câu 7: Archimedes (想像図) ──
    const o7 = out(t, T.l8 - 0.4);
    if (o7 < 1) {
      g.save(); g.translate(1000 * o7, 0);
      const kp = prog(t, T.l7, T.l7 + 0.7);
      plate(g, 'archimedes', 1060, 270, 380, kp);
      engrave(g, 'アルキメデス', 1060, 714, prog(t, T.arch, T.arch + 0.6), `700 34px ${MIN}`, C.ivory, { ls: 3 });
      engrave(g, '想像図・フェッティ画 1620年', 1060, 760, prog(t, T.arch + 0.3, T.arch + 1.1), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      telop(g, '筋道を立てて挑んだ', 1460, 360, prog(t, T.sujimichi, T.sujimichi + 0.9), { size: 36 });
      telop(g, '紀元前3世紀', 1460, 460, prog(t, T.kigen, T.kigen + 0.7), { size: 36 });
      telop(g, 'シラクサ', 1460, 560, prog(t, T.shira, T.shira + 0.6), { size: 36 });
      g.restore();
    }

    // ── câu 8: đường cong vs thước thẳng ──
    const o8 = out(t, T.l9 - 0.4);
    if (t > T.l8 - 0.5 && o8 < 1) {
      const km = prog(t, T.magatta, T.magatta + 0.7);
      if (km > 0) { g.save(); g.globalAlpha = 1 - o8; g.strokeStyle = C.brassHi; g.lineWidth = 4.5; g.lineCap = 'round'; g.shadowColor = 'rgba(243,223,162,0.5)'; g.shadowBlur = 8;
        g.beginPath(); g.arc(CX, CY, R, -Math.PI * 0.72, -Math.PI * 0.72 + Math.PI * 0.44 * outCubic(km)); g.stroke(); g.restore(); }
      const kr = outCubic(prog(t, T.massugu, T.massugu + 0.6));
      if (kr > 0) {                                                         // 定規: chạm vòng tròn ở MỘT điểm (tiếp tuyến trên đỉnh)
        const y = CY - R - 16 - (1 - kr) * 140 - o8 * 700, x0 = CX - 136, x1 = CX + 136;
        g.save(); g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(x0 + 4, y + 5, x1 - x0, 16);
        const gr = g.createLinearGradient(0, y, 0, y + 16); gr.addColorStop(0, C.brassHi); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, C.brassLo);
        g.fillStyle = gr; g.fillRect(x0, y, x1 - x0, 16); g.strokeStyle = C.engrave; g.lineWidth = 1;
        for (let x = x0 + 8; x < x1; x += 8) { g.beginPath(); g.moveTo(x + 0.5, y + 16); g.lineTo(x + 0.5, y + 16 - ((x - x0) % 40 === 8 ? 9 : 5)); g.stroke(); }
        g.restore();
      }
      g.save(); g.translate(1000 * o8, 0);
      telop(g, '言葉にすると、簡単', 1080, 330, prog(t, T.kotoba, T.kotoba + 0.8), { size: 36, color: C.dim });
      telop(g, '曲がった線', 1080, 450, prog(t, T.magatta, T.magatta + 0.6), { size: 40 });
      telop(g, 'まっすぐな定規', 1080, 570, prog(t, T.massugu, T.massugu + 0.7), { size: 40 });
      telop(g, '長さは読めない', 1080, 690, prog(t, T.dekimasen - 0.3, T.dekimasen + 0.5), { size: 40, frameColor: C.steel });
      g.restore();
    }

    // ── câu 9–13: nội tiếp < 円周 < ngoại tiếp ──
    const o9 = out(t, T.l14 - 0.5);
    if (t > T.l9 - 0.5 && o9 < 1) {
      g.save(); g.translate(1000 * o9, 0);
      const oA = out(t, T.chokusetsu - 0.3);
      if (oA < 1) {
        g.save(); g.translate(1000 * oA, 0);
        telop(g, '円に内接する多角形', 960, 330, prog(t, T.uchigawa, T.tak9 + 0.4), { size: 36 });
        telop(g, [['内接の周', `700 40px ${MIN}`, C.brassHi], ['  <  ', `500 48px ${CG}`, C.dim], ['円周', `700 40px ${MIN}`]], 960, 450, prog(t, T.mijika - 0.4, T.mijika + 0.4), { size: 40 });
        telop(g, '円に外接する多角形', 960, 600, prog(t, T.sotogawa, T.tak11 + 0.4), { size: 36, frameColor: C.steel });
        telop(g, [['外接の周', `700 40px ${MIN}`, C.steel], ['  >  ', `500 48px ${CG}`, C.dim], ['円周', `700 40px ${MIN}`]], 960, 720, prog(t, T.nagaku - 0.4, T.nagaku + 0.4), { size: 40, frameColor: C.steel });
        g.restore();
      }
      engrave(g, '直接は測れない円周', 964, 400, prog(t, T.chokusetsu, T.chokusetsu + 0.9), `500 32px ${JP}`, C.dim, { ls: 4, spark: false });
      const F = `700 44px ${MIN}`, OP = `500 52px ${CG}`;
      engrave(g, [['内接の周', F, C.brassHi], ['  <  ', OP, C.dim], ['円周', F, C.ivory], ['  <  ', OP, C.dim], ['外接の周', F, C.steel]], 960, 530, prog(t, T.futatsu, T.futatsu + 1.0), F, C.ivory);
      engrave(g, 'はさみうち', 964, 630, prog(t, T.hasama, T.hasama + 0.6), `700 40px ${MIN}`, C.brass, { ls: 10 });
      g.restore();
      const kf = Math.min(prog(t, T.l9 - 0.4, T.l9 + 0.3), 1 - out(t, T.l10 + 1.5, 0.5));
      if (kf > 0) { g.save(); g.translate(0, 900 * out(t, T.l10 + 1.5, 0.5)); figure(g, 'compass', 1660, 1080, 760, kf, { talk: false }); g.restore(); }
    }

    // ── câu 14–19: bảng 6 → 96, bất đẳng thức ──
    const X0 = 1010, XI = 1240, XO = 1400;
    engrave(g, '辺の数を2倍に', X0, 312, prog(t, T.roku + 0.2, T.hajime + 0.4), `700 32px ${MIN}`, C.ivory, { ls: 3 });
    const kh = prog(t, T.hajime, T.hajime + 0.5);
    if (kh > 0) {
      engrave(g, '内接', XI, 356, kh, `500 28px ${JP}`, C.brass, { align: 'right', ls: 2, spark: false });
      engrave(g, '外接', XO, 356, kh, `500 28px ${JP}`, C.steel, { align: 'right', ls: 2, spark: false });
      rule(g, X0, XO, 372, kh, { a: 0.5 });
    }
    const rowT = [[T.n3, T.n346], ...T.dbl.map(a => [a, a])];
    PERIM_TABLE.forEach(([n, a, b], i) => {
      const [ta, tb] = rowT[i]; if (t < ta) return;
      const y = 418 + i * 50, last = n === 96, hl = last ? prog(t, T.s96, T.s96 + 0.4) : 0;
      if (hl > 0) { g.save(); g.fillStyle = `rgba(217,164,65,${0.12 * hl})`; g.fillRect(X0 - 14, y - 34, XO - X0 + 28, 48); g.strokeStyle = `rgba(217,164,65,${0.6 * hl})`; g.lineWidth = 1; g.strokeRect(X0 - 14.5, y - 34.5, XO - X0 + 29, 49); g.restore(); }
      const k = prog(t, ta, ta + 0.35), col = last && hl > 0 ? C.ivory : C.dim;
      const nm = n === 6 ? [['正六角形', `500 28px ${JP}`, col]] : [['正', `500 28px ${JP}`, col], [String(n), `600 30px ${CG}`, col], ['角形', `500 28px ${JP}`, col]];
      engrave(g, nm, X0, y, k, undefined, col, { spark: false });
      engrave(g, f4(a), XI, y, k, `500 28px ${MONO}`, last && hl > 0 ? C.brassHi : C.brass, { align: 'right', spark: false });
      engrave(g, f4(b), XO, y, prog(t, tb, tb + 0.35), `500 28px ${MONO}`, last && hl > 0 ? C.ivory : C.steel, { align: 'right', spark: false });
    });
    if (t < T.dbl[0] + 0.6) engrave(g, 'まだ大ざっぱ', XO + 34 + 600 * out(t, T.dbl[0] - 0.1), 418, prog(t, T.oozappa, T.oozappa + 0.6), `500 26px ${JP}`, C.dim, { ls: 3, spark: false });

    // kính lúp (câu 17): khe giữa nội / ngoại tiếp nhỏ dần
    const kl = prog(t, T.l17 - 0.2, T.l17 + 0.6), ol = out(t, T.l18 - 0.4);
    if (kl > 0 && ol < 1) {
      const LX = 1640 + 700 * ol, LY = 560, LR = 150, M = 3.4, th = -Math.PI * 5 / 12, PX = CX + R * Math.cos(th), PY = CY + R * Math.sin(th);
      const G = ring360(g, LX, LY, LR, kl, { numerals: false, thread: false, rot: t * 0.05 });
      const ls = stage(t, this.LOUPE, 0.35);
      if (kl >= 0.5) {
        g.save(); g.beginPath(); g.arc(LX, LY, G.r0 - 2, 0, TAU); g.clip();
        g.fillStyle = 'rgba(5,10,28,0.55)'; g.fillRect(LX - LR - 40, LY - LR - 40, 2 * LR + 80, 2 * LR + 80);
        g.translate(LX, LY); g.scale(M, M); g.translate(-PX, -PY);
        const Li = ls.nNew === 6 ? polyIn(CX, CY, R, 6) : polyGrow(CX, CY, R, ls.nOld, ls.nNew, ls.e, false);
        const Lo = ls.nNew === 6 ? polyIn(CX, CY, R / Math.cos(Math.PI / 6), 6, -Math.PI / 2 + Math.PI / 6) : polyGrow(CX, CY, R, ls.nOld, ls.nNew, ls.e, true);
        gap(g, Li, Lo, 0.3);
        drawPoly(g, Lo, 1, { color: C.steel, w: 2 / M }); drawPoly(g, Li, 1, { color: C.brass, w: 2 / M });
        circleLine(g, CX, CY, R, 1, { w: 2.4 / M });
        g.restore();
        engrave(g, ls.n === 6 ? '正六角形' : `正${ls.n}角形`, LX, LY + LR - 26, 1, `700 28px ${MIN}`, C.ivory, { align: 'center', ls: 2, spark: false });
      }
      telop(g, [['すきまは ', `700 36px ${MIN}`], ['小さく', `700 36px ${MIN}`, C.brassHi]], 1460 + 700 * ol, 850, prog(t, T.sukima, T.chiisaku + 0.4), { size: 36 });
    }

    // câu 18–19: kết luận của Archimedes (π son = đáp án đã chứng minh)
    const kq = prog(t, T.a1408, T.aida + 0.3);
    if (kq > 0) {
      const NUM = `500 70px ${CG}`, OP = `400 52px ${CG}`;
      const r = engrave(g, [[this.LO.toFixed(4), NUM, C.ivory], ['  <  ', OP, C.dim], ['π', `600 80px ${CG}`, C.shu], ['  <  ', OP, C.dim], [this.HI.toFixed(4), NUM, C.ivory]], X0, 820, kq, NUM, C.ivory);
      engrave(g, 'アルキメデスの証明', r.x0 + r.w, 730, prog(t, T.shoumei, T.shoumei + 0.6), `500 28px ${JP}`, C.brass, { align: 'right', ls: 4, spark: false });
      rule(g, X0, r.x0 + r.w, 892, prog(t, T.shoumei + 0.2, T.shoumei + 0.9), { color: C.brass, a: 0.85 });
      const wl = measure(g, this.LO.toFixed(4), NUM), wr = measure(g, this.HI.toFixed(4), NUM), k7 = prog(t, T.f227, T.f227 + 0.5);
      // bảng (giá trị thật) → bất đẳng thức (phân số của Archimedes): dây dẫn 3.1410 → 3.1408 + vì sao lệch
      const xIn = XI - measure(g, f4(this.IN96), `500 28px ${MONO}`) / 2, kr = prog(t, T.a1408, T.a1408 + 0.6);
      leader(g, xIn, 418 + 4 * 50 + 16, Math.min(xIn, X0 + wl - 12), 762, kr, { color: C.brassHi, a: 0.9 });
      const NX = 1460, kn = prog(t, T.a1408 + 0.3, T.a1429 + 0.6), NF = `500 30px ${MONO}`, FF = `italic 600 34px ${CG}`;
      telop(g, '分数で安全側に丸めた', NX, 462, kn, { size: 28 });
      engrave(g, [[`${f4(this.IN96)}…`, NF, C.brass], ['  >  ', `500 34px ${CG}`, C.dim], ['223/71', FF, C.ivory]], NX, 560, prog(t, T.a1408 + 0.5, T.a1408 + 1.1), NF, C.ivory, { spark: false });
      engrave(g, [[`${f4(this.OUT96)}…`, NF, C.steel], ['  <  ', `500 34px ${CG}`, C.dim], ['22/7', FF, C.ivory]], NX, 616, prog(t, T.a1429, T.a1429 + 0.6), NF, C.ivory, { spark: false });
      engrave(g, '223 / 71', X0 + wl / 2, 940, k7, `italic 500 32px ${CG}`, C.dim, { align: 'center', spark: false });
      engrave(g, '22 / 7', r.x0 + r.w - wr / 2, 940, k7, `italic 600 40px ${CG}`, C.brassHi, { align: 'center', spark: false });
      telop(g, '西洋でおなじみの分数', r.x0 + r.w - wr / 2 - 120, 985, prog(t, T.najimi - 0.3, T.najimi + 0.6), { size: 30, align: 'center' });
    }
  }
}
