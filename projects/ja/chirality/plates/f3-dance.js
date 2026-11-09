// f3 · ダンスフロア (p2, câu 72–82). DNA f3: sàn nhảy HAI PHÍA gương (đèn rọi xuống mặt bàn). Câu 73–74: ba "cặp xúc tác"
// lớn — kim loại bạc ôm 2 phân tử: 左＋左 (trái, nhảy), 右＋右 (phải, nhảy), 右＋左 kẹt ở gương (kim loại sau kính, đứng im).
// Câu 75–78: thanh dân số 左25 | 右75 (mọc từ gương) → 32 phân tử đơn trên sàn (24 azure phải / 8 hổ phách trái) ghép đôi ngẫu
// nhiên → 16 cặp: 9 右右 nhảy bên phải, 1 左左 nhảy bên trái, 6 右左 kẹt SÁT gương (9/16 = 56.25%, 6/16 = 37.5%, 1/16 = 6.25%
// — đúng 0.75², 2·0.75·0.25, 0.25²; must). Ba hàng: 右と右 0.75 × 0.75 ≈ 56% · 右と左 2通り 38% · 左と左 たったの 6%.
// Câu 79–81: 左 6 | 右 56 → 左 10 | 右 90 (gương làm dấu ":"), 「75：25 の材料が / 90：10 の働き」, 「ノーベル委員会のたとえ」.
// Câu 82: ba ô Frank trượt ra (① giữ ✓), ô ② viết lại theo lời, đánh dấu ở 2つ目 (suzu).
import { MX, FRANK, clamp, prog, lookup, must, outCubic, smooth, hash, ground, mirror, telop, title, panes, cue, C, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
const S100 = 640;                                       // thanh: 100% = 640 px
const pct = v => Math.round(v * 100);

// đèn sàn: hai quầng elip trên mặt bàn + chùm sáng mờ từ trên xuống (trung tính)
function floorLights(g, k, glow = 0) {
  if (k <= 0) return;
  g.save();
  for (const cx of [470, 1390]) {
    const a = 0.05 * k;
    g.fillStyle = `rgba(201,210,224,${a})`; g.beginPath(); g.moveTo(cx - 60, 64); g.lineTo(cx + 60, 64); g.lineTo(cx + 380, 930); g.lineTo(cx - 380, 930); g.closePath(); g.fill();
    const gr = g.createRadialGradient(cx, 930, 10, cx, 930, 400); gr.addColorStop(0, `rgba(201,210,224,${(0.16 + 0.08 * glow) * k})`); gr.addColorStop(1, 'rgba(201,210,224,0)');
    g.save(); g.translate(cx, 930); g.scale(1, 0.17); g.translate(-cx, -930); g.fillStyle = gr; g.fillRect(cx - 400, 530, 800, 800); g.restore();
  }
  g.restore();
}
function ball(g, x, y, r, col, k = 1) {
  if (k <= 0) return;
  const rr = r * outCubic(clamp(k));
  const gr = g.createRadialGradient(x - rr * 0.35, y - rr * 0.4, rr * 0.1, x, y, rr); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.25, col); gr.addColorStop(1, col);
  g.save(); g.fillStyle = gr; g.strokeStyle = C.bg; g.lineWidth = 2; g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill(); g.stroke(); g.restore();
}
function metal(g, x, y, r, k = 1) {
  if (k <= 0) return;
  const rr = r * outCubic(clamp(k)), gr = g.createRadialGradient(x - rr * 0.3, y - rr * 0.35, rr * 0.1, x, y, rr);
  gr.addColorStop(0, '#F4F7FB'); gr.addColorStop(0.5, '#9AA4B6'); gr.addColorStop(1, '#4E576A');
  g.save(); g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill(); g.restore();
}
function arm(g, x0, y0, x1, y1, w = 6) { g.save(); g.strokeStyle = C.bone; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
// cặp xúc tác lớn: kim loại ở (x, y), hai phân tử ở hai đầu cánh tay dài s, góc ang. kb: [phân tử 1, phân tử 2]
function pairGlyph(g, x, y, s, col, km, kb, ang = 0) {
  const c = Math.cos(ang) * s, d = Math.sin(ang) * s;
  if (kb[0] > 0) arm(g, x, y, x - c, y - d, 8); if (kb[1] > 0) arm(g, x, y, x + c, y + d, 8);
  metal(g, x, y, s * 0.4, km);
  ball(g, x - c, y - d, s * 0.42, col, kb[0]); ball(g, x + c, y + d, s * 0.42, col, kb[1]);
}

export default class Dance {
  static ERA = 'mirror';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      naze: w(72, 'なぜ'), dance: w(72, 'ダンス'),
      kinzoku: w(73, '金属'), katate: w(73, '片手'), futatsu: w(73, '2つ'), kakaete: w(73, '抱えて'), pair73: w(73, 'ペア'), e73: E(73),
      rr: w(74, '右', 1), ll: w(74, '左', 1), jozu: w(74, '上手'), rl: w(74, '右', 3), hotondo: w(74, 'ほとんど'), odorenai: w(74, '踊れません'),
      l75: S(75), p75: w(75, '75%'), p25: w(75, '25%'), detarame: w(75, 'でたらめ'), pair75: w(75, 'ペア'), tsukura: w(75, '作らせて'),
      rr76: w(76, '右', 1), a075: w(76, '0.75', 1), b075: w(76, '0.75', 2), p56: w(76, '56%'),
      rl77: w(77, '右'), tori: w(77, '2通り'), p38: w(77, '38%'), ll77: w(77, '左', 2), p6: w(77, '6%'),
      sukunai: w(78, '少ない'), odorenai78: w(78, '踊れない'), tojikome: w(78, '閉じこめられて'),
      l79: S(79), floor: w(79, 'フロア'), r56: w(79, '56対6'), wariai: w(79, '割合'), r90: w(79, '90対10'),
      r75: w(80, '75対25'), hataraki: w(80, '働き'),
      nobel: w(81, 'ノーベル'), tatoe: w(81, 'たとえ'),
      l82: S(82), ippo: w(82, '一方', 1), osaeru: w(82, 'おさえる'), futatsume: w(82, '2つ目'), end: E(82),
    };
    this.START = S(72);
    this.FROM = Math.max(this.START - 1.2, E(71) + 0.5);
    // ── số trên hình (§70, §94): ghép đôi ngẫu nhiên 75 : 25 (ví dụ của uỷ ban, CONTENT.md) ──
    must(`${pct(0.75 * 0.75)}`, 56); must(`${pct(2 * 0.75 * 0.25)}`, 38); must(`${pct(0.25 * 0.25)}`, 6); must('56 + 38 + 6', 100);
    must('0.75 * 0.75 / (0.75 * 0.75 + 0.25 * 0.25)', 0.9);                 // trên sàn chỉ RR và LL nhảy → 90 : 10
    must('24 / 32', 0.75); must('9 / 16', 0.75 * 0.75); must('6 / 16', 2 * 0.75 * 0.25); must('1 / 16', 0.25 * 0.25);   // sàn: 16 cặp
    this.N = { p56: `≈ ${pct(0.75 * 0.75)}%`, p38: `${pct(2 * 0.75 * 0.25)}%`, p6: `たったの ${pct(0.25 * 0.25)}%`, r90: pct(0.9), r10: pct(0.1) };
    must(`'${this.N.p56}|${this.N.p38}|${this.N.p6}|${this.N.r90}:${this.N.r10}'`, '≈ 56%|38%|たったの 6%|90:10');
    // ── sàn: 32 phân tử đơn → 16 cặp (vị trí cố định, tất định) ──
    const az = Array.from({ length: 24 }, (_, i) => ({ x: 1010 + 790 * hash(i * 1.31 + 5), y: 885 + 100 * hash(i * 2.71 + 1), ph: i * 0.7 }));
    const am = Array.from({ length: 8 }, (_, j) => ({ x: 130 + 700 * hash(j * 1.91 + 3), y: 885 + 100 * hash(j * 3.3 + 2), ph: j * 1.1 + 0.3 }));
    this.PAIRS = [];
    for (let p = 0; p < 9; p++) this.PAIRS.push({ kind: 'RR', a: az[2 * p], b: az[2 * p + 1], cx: 1060 + p * 84, cy: 905 + (p % 2) * 50, ph: p * 0.9 });
    this.PAIRS.push({ kind: 'LL', a: am[0], b: am[1], cx: 520, cy: 930, ph: 0.4 });
    for (let q = 0; q < 6; q++) { const row = q % 3, lay = Math.floor(q / 3), dx = 44 + lay * 58;     // hai lớp so le, sát gương
      this.PAIRS.push({ kind: 'RL', a: am[2 + q], b: az[18 + q], ax: MX - dx, bx: MX + dx, cy: 885 + row * 50 + lay * 25, ph: q }); }
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.95, 'telop', -4), cue(T.dance, 'snap', -4),
      cue(T.kinzoku, 'glass'), cue(T.futatsu, 'glass', -4), cue(T.pair73, 'telop', -4),
      cue(T.rr, 'pop', -4), cue(T.ll, 'pop', -4), cue(T.jozu, 'match'), cue(T.rl, 'glass', -6), cue(T.odorenai, 'telop', -4),
      cue(T.p75, 'telop', -4), cue(T.p25, 'telop', -4), cue(T.detarame, 'whoosh', -6), cue(T.tsukura, 'tick', -4),
      cue(T.a075, 'pop', -4), cue(T.p56, 'telop'),
      cue(T.tori, 'tick', -4), cue(T.p38, 'telop', -4), cue(T.p6, 'telop', -4),
      cue(T.sukunai, 'telop', -4), cue(T.tojikome, 'snap', -6),
      cue(T.r56, 'telop'), cue(T.r90, 'telop'), cue(T.r75, 'pop', -4), cue(T.hataraki, 'shimmer', -6),
      cue(T.nobel, 'page'), cue(T.l82, 'glass', -4), cue(T.futatsume, 'frank'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, N = this.N;
    ground(g, 'mirror', t);
    const kPair = smooth(prog(t, T.detarame, T.tsukura + 0.6));
    floorLights(g, prog(t, F + 0.3, F + 0.9), prog(t, T.floor, T.floor + 0.6) * (1 - prog(t, T.l82, T.l82 + 1)));
    title(g, 'ダンスフロア', t, F + 0.3);

    // ════ A (câu 72–74): ba cặp xúc tác lớn — rời lên trước câu 75 ════
    const oA = out(t, T.l75 - 0.7, 0.6), dyA = -900 * oA;
    const kRL = prog(t, T.rl - 0.1, T.rl + 0.5);
    if (t > T.kinzoku - 0.3 && oA < 1 && kRL > 0) {             // cặp lẫn: kim loại + cánh tay SAU gương
      g.save(); g.translate(0, dyA); arm(g, MX - 90, 560, MX + 90, 560, 8); metal(g, MX, 560, 32, kRL); g.restore();
    }
    // ════ B (câu 75–78): thanh dân số + ba hàng — vẽ trước gương (mọc ra từ gương) ════
    const oP = out(t, T.l82 - 0.4, 0.5), oR = out(t, T.l79 - 0.5, 0.5);
    if (t > T.l75 - 0.2 && oP < 1) {
      g.save(); g.translate(0, -700 * oP);
      const kR = outCubic(prog(t, T.p75 - 0.3, T.p75 + 0.4)), kL = outCubic(prog(t, T.p25 - 0.3, T.p25 + 0.4)), pulse = prog(t, T.r75, T.r75 + 0.8);
      if (pulse > 0 && pulse < 1) { g.fillStyle = `rgba(237,230,214,${0.25 * Math.sin(Math.PI * pulse)})`; g.fillRect(MX - 0.25 * S100 - 8, 304, S100 + 16, 52); }
      g.fillStyle = C.R; g.fillRect(MX, 312, 0.75 * S100 * kR, 36);
      g.fillStyle = C.L; g.fillRect(MX - 0.25 * S100 * kL, 312, 0.25 * S100 * kL, 36);
      g.restore();
    }
    if (t > T.rr76 - 0.3 && oR < 1) {
      g.save(); g.translate(1300 * oR, 0);
      const k1 = outCubic(prog(t, T.a075 - 0.2, T.a075 + 0.3)), k2 = smooth(prog(t, T.b075, T.b075 + 0.6));
      g.fillStyle = C.R; g.fillRect(MX, 452, S100 * k1 * (0.75 - (0.75 - 0.5625) * k2), 36);             // 0.75 → 0.75 × 0.75
      const kM = outCubic(prog(t, T.rl77 - 0.2, T.rl77 + 0.4)), hw = 0.1875 * S100 * kM;
      g.fillStyle = C.L; g.fillRect(MX - hw, 582, hw, 36); g.fillStyle = C.R; g.fillRect(MX, 582, hw, 36);
      const kl = outCubic(prog(t, T.ll77 - 0.2, T.ll77 + 0.4));
      g.fillStyle = C.L; g.fillRect(MX - 0.0625 * S100 * kl, 712, 0.0625 * S100 * kl, 36);
      g.restore();
    }

    // floor: cánh tay các cặp lẫn đi QUA gương (vẽ trước gương)
    const rlArms = t > T.detarame && kPair > 0.5;
    if (rlArms) for (const P of this.PAIRS) if (P.kind === 'RL') { g.save(); g.globalAlpha = clamp((kPair - 0.5) * 2); arm(g, P.ax, P.cy, P.bx, P.cy, 4); g.restore(); }

    mirror(g);

    // ════ A: chữ + cặp lớn ════
    if (oA < 1) {
      g.save(); g.translate(0, dyA);
      telop(g, 'なぜ？', 120, 340, prog(t, F + 0.3, F + 0.8), { size: 64, mincho: true });
      telop(g, 'ダンスにたとえると', 120, 420, prog(t, T.dance, T.dance + 0.8), { size: 40, mincho: true, color: '@dim' });
      telop(g, '金属が、片手の分子を2つずつ', 1000, 300, prog(t, T.kinzoku, T.kakaete + 0.3), { size: 40 });
      telop(g, 'ペアで働く', 1000, 372, prog(t, T.pair73, T.pair73 + 0.5), { size: 48, mincho: true });
      const km = prog(t, T.kinzoku - 0.1, T.kinzoku + 0.4), kb = [prog(t, T.katate - 0.1, T.katate + 0.4), prog(t, T.futatsu - 0.1, T.futatsu + 0.4)];
      const up = t - T.jozu, dance = up > 0 ? up : 0, ang = 1.7 * dance, bob = up > 0 ? -12 * Math.abs(Math.sin(up * 3.2)) : 0;
      if (t > T.kinzoku - 0.3) { pairGlyph(g, 450, 560 + bob, 80, C.L, km, kb, ang); pairGlyph(g, 1410, 560 + bob, 80, C.R, km, kb, -ang); }
      telop(g, [['左＋左', undefined, '@L'], ['　踊れる']], 450, 740, prog(t, T.ll, T.jozu + 0.6), { size: 44, align: 'center' });
      telop(g, [['右＋右', undefined, '@R'], ['　踊れる']], 1410, 740, prog(t, T.rr, T.jozu + 0.6), { size: 44, align: 'center' });
      if (kRL > 0) { ball(g, MX - 90, 560, 34, C.L, kRL); ball(g, MX + 90, 560, 34, C.R, kRL); }
      telop(g, '右＋左は、ほとんど踊れない', 990, 820, prog(t, T.hotondo - 0.2, T.odorenai + 0.5), { size: 40 });
      g.restore();
    }

    // ════ B: nhãn thanh + hàng ════
    if (t > T.l75 - 0.2 && oP < 1) {
      g.save(); g.translate(0, -700 * oP);
      telop(g, '右 75%', MX + 0.75 * S100 + 20, 346, prog(t, T.p75, T.p75 + 0.4), { size: 44, color: '@R' });
      telop(g, '左 25%', MX - 0.25 * S100 - 20, 346, prog(t, T.p25, T.p25 + 0.4), { size: 44, color: '@L', align: 'right' });
      telop(g, '材料', MX + 0.75 * S100 + 190, 346, prog(t, T.r75 + 0.3, T.r75 + 0.7), { size: 36, color: '@dim', mincho: true });
      g.restore();
    }
    if (t > T.rr76 - 0.3 && oR < 1) {
      g.save(); g.translate(1300 * oR, 0);
      telop(g, [['右と右：', undefined, '@R'], ['0.75 × 0.75', undefined, '@dim']], 950, 438, prog(t, T.rr76, T.b075 + 0.5), { size: 36 });
      telop(g, N.p56, MX + 0.5625 * S100 + 22, 490, prog(t, T.p56, T.p56 + 0.4), { size: 52, color: '@R' });
      telop(g, [['右と左：', undefined, '@ink'], ['2通り', undefined, '@dim']], 1000, 568, prog(t, T.rl77, T.tori + 0.5), { size: 36 });
      telop(g, N.p38, MX + 0.1875 * S100 + 22, 620, prog(t, T.p38, T.p38 + 0.4), { size: 52 });
      telop(g, '左と左', 870, 696, prog(t, T.ll77, T.ll77 + 0.4), { size: 36, color: '@L', align: 'right' });
      telop(g, N.p6, MX - 0.0625 * S100 - 22, 750, prog(t, T.p6 - 0.2, T.p6 + 0.5), { size: 52, color: '@L', align: 'right' });
      g.restore();
    }
    // câu 78: 少ない左は閉じこめられる (trái) — rời ở câu 79
    const o78 = out(t, T.l79 - 0.5, 0.5);
    if (t > T.sukunai - 0.2 && o78 < 1) { g.save(); g.translate(-900 * o78, 0);
      telop(g, '少ない左は、閉じこめられる', 120, 520, prog(t, T.sukunai, T.tojikome + 0.4), { size: 44, mincho: true }); g.restore(); }

    // ════ C (câu 79–81): 左 6 | 右 56 → 左 10 | 右 90; lời trái ════
    const oC = out(t, T.l82 - 0.4, 0.5);
    if (t > T.r56 - 0.3 && oC < 1) {
      g.save(); g.translate(0, -800 * oC);
      telop(g, '踊っているペア', MX + 160, 470, prog(t, T.r56 - 0.3, T.r56 + 0.4), { size: 32, color: '@dim', mincho: true });
      telop(g, '6', MX - 50, 570, prog(t, T.r56, T.r56 + 0.4), { size: 88, color: '@L', align: 'right' });
      telop(g, '56', MX + 50, 570, prog(t, T.r56, T.r56 + 0.4), { size: 88, color: '@R' });
      telop(g, '左', MX - 50, 612, prog(t, T.r56 + 0.2, T.r56 + 0.5), { size: 28, color: '@L', align: 'right' });
      telop(g, '右', MX + 50, 612, prog(t, T.r56 + 0.2, T.r56 + 0.5), { size: 28, color: '@R' });
      telop(g, '割合', MX + 160, 640, prog(t, T.wariai, T.wariai + 0.4), { size: 32, color: '@dim', mincho: true });
      telop(g, `${N.r10}`, MX - 50, 750, prog(t, T.r90, T.r90 + 0.5), { size: 104, color: '@L', align: 'right' });
      telop(g, `${N.r90}`, MX + 50, 750, prog(t, T.r90, T.r90 + 0.5), { size: 104, color: '@R' });
      telop(g, '左', MX - 50, 796, prog(t, T.r90 + 0.2, T.r90 + 0.5), { size: 28, color: '@L', align: 'right' });
      telop(g, '右', MX + 50, 796, prog(t, T.r90 + 0.2, T.r90 + 0.5), { size: 28, color: '@R' });
      g.restore();
    }
    telop(g, [['75', undefined, '@R'], ['：'], ['25', undefined, '@L'], [' の材料が']], 120, 450, prog(t, T.r75, T.r75 + 0.8), { size: 44, mincho: true });
    telop(g, [['90', undefined, '@R'], ['：'], ['10', undefined, '@L'], [' の働き']], 120, 525, prog(t, T.hataraki - 0.6, T.hataraki + 0.4), { size: 52, mincho: true });
    telop(g, 'ノーベル委員会のたとえ', 120, 610, prog(t, T.nobel, T.tatoe + 0.5), { size: 36, color: '@dim', mincho: true });

    // ════ sàn nhảy: 32 phân tử đơn → 16 cặp ════
    const kL = prog(t, T.p25 - 0.2, T.p25 + 0.4), kR = prog(t, T.p75 - 0.2, T.p75 + 0.4), hl = prog(t, T.sukunai, T.sukunai + 0.4) * (1 - prog(t, T.l79, T.l79 + 0.5));
    const tP = T.tsukura + 0.6, glow = prog(t, T.floor, T.floor + 0.5);
    if (t > T.p75 - 0.3) for (const P of this.PAIRS) {
      const kk = smooth(clamp(kPair * 1.6 - hash(P.ph * 3.1 + 1) * 0.6));
      const wob = m => 9 * Math.sin(t * 1.3 + m.ph) * (1 - kk);
      let ax, ay, bx, by;
      if (P.kind === 'RL') { ax = P.ax; bx = P.bx; ay = by = P.cy; }
      else { const d = t > tP ? t - tP : 0, ang = P.ph + 2.6 * d, bob = d > 0 ? -7 * Math.abs(Math.sin(d * 3.4 + P.ph)) : 0, s = P.kind === 'RR' ? 1 : -1;
        ax = P.cx - 19 * Math.cos(s * ang); ay = P.cy + bob - 9 * Math.sin(s * ang); bx = P.cx + 19 * Math.cos(s * ang); by = P.cy + bob + 9 * Math.sin(s * ang); }
      const A = { x: P.a.x + wob(P.a) + (ax - P.a.x) * kk, y: P.a.y + (ay - P.a.y) * kk }, B = { x: P.b.x + wob(P.b) + (bx - P.b.x) * kk, y: P.b.y + (by - P.b.y) * kk };
      if (P.kind !== 'RL' && kk > 0.5) { g.save(); g.globalAlpha = clamp((kk - 0.5) * 2); arm(g, A.x, A.y, B.x, B.y, 4); metal(g, (A.x + B.x) / 2, (A.y + B.y) / 2, 6); g.restore(); }
      const ca = P.kind === 'RR' ? C.R : C.L, cb = P.kind === 'LL' ? C.L : C.R, frozen = P.kind === 'RL' ? 0.55 * glow : 0;
      ball(g, A.x, A.y, 12, ca, P.kind === 'RR' ? kR : kL); ball(g, B.x, B.y, 12, cb, P.kind === 'LL' ? kL : kR);
      if (frozen > 0 && kk >= 1) { g.save(); g.fillStyle = `rgba(14,20,36,${frozen})`; for (const Q of [A, B]) { g.beginPath(); g.arc(Q.x, Q.y, 13, 0, TAU); g.fill(); } g.restore(); }
      if (P.kind === 'RL' && hl > 0) { g.save(); g.strokeStyle = C.L; g.globalAlpha = hl; g.lineWidth = 3; g.beginPath(); g.arc(A.x, A.y, 18 + 3 * Math.sin(t * 6), 0, TAU); g.stroke(); g.restore(); }
    }

    // ════ D (câu 82): ba ô Frank — ① giữ ✓, ② viết theo lời rồi đánh dấu ════
    if (t > T.l82 - 0.1) {
      panes(g, { texts: FRANK, k: [0, 1, 2].map(i => prog(t, T.l82 + i * 0.15, T.l82 + i * 0.15 + 0.6)),
        kText: [null, prog(t, T.ippo + 0.2, T.osaeru + 0.6), null], tick: [1, prog(t, T.futatsume, T.futatsume + 0.5), 0] });
    }
  }
}
