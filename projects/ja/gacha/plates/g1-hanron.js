// g1 · いちばん強い反論 (p2 câu 145–152) — MỞ ACT 6 「誰が、誰のために」, ERA studio, mascot ponder (nói câu 145–147).
//  145 thẻ trích dẫn phản đối (đúng — không gạch) · 146 ✓ 「これは、正しい」 · 147 「でも、足りない」, thẻ co lên thành dải trên ·
//  148 hai ô điều kiện: ① 何を買っているか知っている ② やめる力が残っている · 149 ① có 確率表 ✓ · 150 ② ba thứ (演出 / 時計 / タイムライン)
//  lần lượt bào mòn thanh 5 nấc còn 2 · 151 tem xám 「遊ぶ権利があるか」 bị bóc (câu hỏi SAI) · 152 「誰が、誰のために設計しているのか」.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, actCard, actCue, card, telop as telop0, write, wrong, capsule, figure, rr, tone } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 24, oy = 10, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
function check(g, x, y, s, k, col = tone('@mint').dk) {            // dấu ✓ vẽ tay
  if (k <= 0) return; const e = outCubic(clamp(k));
  g.save(); g.strokeStyle = col; g.lineWidth = 16 * s / 60; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  const P = [[-0.55, 0.05], [-0.15, 0.45], [0.6, -0.5]]; const L1 = 0.57, L2 = 1.1, d = (L1 + L2) * e;
  g.moveTo(x + P[0][0] * s, y + P[0][1] * s);
  if (d <= L1) g.lineTo(x + (P[0][0] + (P[1][0] - P[0][0]) * d / L1) * s, y + (P[0][1] + (P[1][1] - P[0][1]) * d / L1) * s);
  else { g.lineTo(x + P[1][0] * s, y + P[1][1] * s); const u = (d - L1) / L2; g.lineTo(x + (P[1][0] + (P[2][0] - P[1][0]) * u) * s, y + (P[1][1] + (P[2][1] - P[1][1]) * u) * s); }
  g.stroke(); g.restore();
}
function clock(g, x, y, r, k, t) {
  if (k <= 0) return; const e = outBack(clamp(k)); g.save(); g.translate(x, y); g.scale(e, e);
  shade(g, () => { g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); }, 12, 5); g.strokeStyle = C.mute; g.lineWidth = 4; g.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.beginPath(); g.moveTo(Math.sin(a) * r * 0.8, -Math.cos(a) * r * 0.8); g.lineTo(Math.sin(a) * r * 0.9, -Math.cos(a) * r * 0.9); g.stroke(); }
  g.lineCap = 'round'; g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(t * 1.5) * r * 0.5, -Math.cos(t * 1.5) * r * 0.5); g.stroke();
  g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(t * 18) * r * 0.72, -Math.cos(t * 18) * r * 0.72); g.stroke(); g.restore();
}
function feed(g, x, y, k) {                                         // ba thẻ chồng = タイムライン (pastel, không nội dung thật)
  if (k <= 0) return; const e = outBack(clamp(k)); g.save(); g.translate(x, y); g.scale(e, e);
  [[-34, 22, '#E6DDF7'], [0, 0, '#FFE4EE'], [34, -22, '#DDF1E8']].forEach(([dx, dy, col]) => { shade(g, () => { g.fillStyle = col; g.fill(rr(dx - 56, dy - 26, 112, 52, 12)); }, 8, 3); });
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(-28, 0, 12, 0, TAU); g.fill(); g.restore();
}

export default class Rebuttal {
  static ERA = 'studio';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    this.T = {
      l145: L(145).start, dare: w(145, '誰'), kyousei: w(145, '強制'), jibun: w(145, '自分'), harau: w(145, '払って'),
      l146: L(146).start, tadashii: w(146, '正しい'), l147: L(147).start, tarimasen: w(147, '足りません'),
      l148: L(148).start, nani: w(148, '何'), shitte: w(148, '知って'), yameru: w(148, 'やめる'), nokotte: w(148, '残って'),
      l149: L(149).start, kakuritsu: w(149, '確率'), hitotsume: w(149, '1つ目'),
      l150: L(150).start, matsu: w(150, '待つ'), kigen: w(150, '期限'), timeline: w(150, 'タイム'), futatsume: w(150, '2つ目'), yowameru: w(150, '弱めます'),
      l151: L(151).start, kenri: w(151, '権利'), arimasen: w(151, 'ありません'),
      l152: L(152).start, dare2: w(152, '誰'), sekkei: w(152, '設計'), end: L(152).end,
    };
    this.START = L(145).start;
    this.FROM = Math.max(this.START - 2.6, L(144).end + 0.5);
    this.M = [this.T.l145 + 0.7, L(147).end - 0.3];                  // mascot ponder ≈ 7.9 s (câu 145–147)
    must(`${this.M[1] - this.M[0] <= 8}`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START), c(T.kyousei, 'card'), c(T.jibun, 'pen'), c(T.tadashii, 'pop'), c(T.tarimasen, 'pen'),
      c(T.nani, 'card'), c(T.shitte, 'pen'), c(T.yameru, 'pen'), c(T.kakuritsu, 'pop'), c(T.hitotsume, 'tick'),
      c(T.matsu, 'tick'), c(T.kigen, 'tick'), c(T.timeline, 'tick'), c(T.futatsume + 0.2, 'pen'), c(T.kenri, 'pen'), c(T.arimasen, 'tear'), c(T.dare2, 'pen'), c(T.sekkei, 'pop')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START;
    ground(g, t);
    heading(g, 6, 'いちばん強い反論', prog(t, S + 0.2, S + 1.0));
    // ── thẻ trích dẫn: lớn (145) → dải trên (148) ──
    const sh = outCubic(prog(t, T.l148 - 0.2, T.l148 + 0.6));
    if (t > S - 0.3) {
      if (sh < 1) { g.save(); g.globalAlpha = 1 - sh; card(g, [[['「誰も強制していない。']], [['みんな、自分の意思でお金を払っている」']]], 140, 290 - 90 * sh, prog(t, T.dare - 0.1, T.harau + 0.5), { size: 50 }); g.restore(); }
      if (sh > 0) card(g, [[['「誰も強制していない。みんな、自分の意思でお金を払っている」']]], 96, 205, 1, { size: 34, pad: 32 });
    }
    // 146: ✓ + 正しい
    if (t > T.tadashii - 0.3) {
      const o = 1 - sh;
      if (o > 0) { g.save(); g.globalAlpha = o; check(g, 1230, 470, 90, prog(t, T.tadashii - 0.1, T.tadashii + 0.5)); telop(g, 'これは、正しい', 700, 560, prog(t, T.tadashii - 0.2, T.tadashii + 0.5), { size: 56 }); g.restore(); }
    }
    if (t > T.l147 - 0.1 && t < T.l148 + 0.5) { g.save(); g.translate(0, 300 * out(t, T.l148 - 0.1, 0.5)); telop(g, [['でも、'], ['それだけでは足りない']], 700, 760, prog(t, T.l147 + 0.1, T.tarimasen + 0.5), { size: 56 }); g.restore(); }
    // ── hai ô điều kiện (148–150) ──
    const oPan = out(t, T.kenri - 0.3, 0.6);
    if (t > T.l148 - 0.1 && oPan < 1) {
      g.save(); g.translate(0, 900 * oPan);
      const kA = prog(t, T.nani - 0.1, T.shitte + 0.3), kB = prog(t, T.yameru - 0.3, T.nokotte + 0.4);
      // ① 知っている
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(120, 350, 790, 560, 34)); }, 28, 10);
      write(g, [['①', `700 44px ${JP}`], [' 何を買っているか', `700 44px ${MIN}`]], 170, 430, kA, { });
      write(g, '知っている', 170, 490, prog(t, T.shitte - 0.1, T.shitte + 0.4), { font: `700 52px ${MIN}` });
      // bảng 確率表 nhỏ (tự vẽ) + ✓
      const kt = outCubic(prog(t, T.kakuritsu - 0.2, T.kakuritsu + 0.5));
      if (kt > 0) {
        shade(g, () => { g.fillStyle = '#FFFCF6'; g.fill(rr(220, 560, 360, 250, 26)); }, 16, 6); g.strokeStyle = C.faint; g.lineWidth = 2; g.stroke(rr(220, 560, 360, 250, 26));
        capsule(g, 262, 612, 18, kt, { tone: 'sky', ground: false });
        write(g, '確率表', 296, 628, kt, { font: `700 40px ${MIN}` });
        g.fillStyle = C.line; g.fillRect(246, 656, 308, 2);
        write(g, [['★5', `700 38px ${JP}`, '@gold'], ['  0.6%', `700 44px ${JP}`, '@sky']], 246, 730, kt, {});
        check(g, 700, 690, 80, prog(t, T.hitotsume - 0.1, T.hitotsume + 0.5));
      }
      // ② やめる力
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(1010, 350, 790, 560, 34)); }, 28, 10);
      write(g, [['②', `700 44px ${JP}`], [' やめる力が', `700 44px ${MIN}`]], 1060, 430, kB, {});
      write(g, '残っている', 1060, 490, prog(t, T.nokotte - 0.2, T.nokotte + 0.4), { font: `700 52px ${MIN}` });
      const IC = [[1140, T.matsu, '待つ時間の', '演出'], [1405, T.kigen, '期限の', '時計'], [1670, T.timeline, '選ばれた', 'タイムライン']];
      IC.forEach(([x, ta, l1, l2], i) => {
        const k = prog(t, ta - 0.1, ta + 0.4), y = 610;
        if (i === 0) capsule(g, x, y, 42, k, { tone: 'pink', shake: 1, t, ground: false }); else if (i === 1) clock(g, x, y, 46, k, t); else feed(g, x, y, k);
        write(g, l1, x, y + 92, prog(t, ta, ta + 0.4), { font: `600 28px ${JP}`, color: '@dim', align: 'center' }); write(g, l2, x, y + 128, prog(t, ta + 0.1, ta + 0.5), { font: `600 28px ${JP}`, color: '@dim', align: 'center' });
      });
      // thanh 5 nấc bị bào mòn
      const gone = [T.matsu + 0.5, T.kigen + 0.5, T.timeline + 0.5];
      for (let i = 0; i < 5; i++) {
        const x = 1085 + i * 114, d = i >= 2 ? prog(t, gone[4 - i], gone[4 - i] + 0.4) : 0;
        if (d > 0) { g.save(); g.setLineDash([8, 7]); g.strokeStyle = 'rgba(92,86,72,0.5)'; g.lineWidth = 3; g.stroke(rr(x, 790, 100, 40, 12)); g.restore(); }
        if (d < 1) { g.save(); g.globalAlpha = 1 - d; g.fillStyle = C.ink; g.fill(rr(x, 790 + 14 * d, 100, 40, 12)); g.restore(); }
      }
      g.restore();
    }
    // 151: câu hỏi SAI trên tem xám; 152: câu hỏi đúng
    if (t > T.l151 - 0.2) {
      write(g, '問うべきなのは', 960, 350, prog(t, T.l151, T.l151 + 0.5), { font: `700 44px ${MIN}`, color: '@dim', align: 'center' });
      wrong(g, '遊ぶ権利があるか', 960, 470, prog(t, T.kenri - 0.1, T.kenri + 0.5), { size: 64, peel: prog(t, T.arimasen, T.arimasen + 0.9) });
    }
    if (t > T.l152 - 0.2) {
      telop(g, '誰が、誰のために', 960, 690, prog(t, T.dare2 - 0.1, T.dare2 + 0.7), { size: 78 });
      telop(g, '設計しているのか', 960, 830, prog(t, T.sekkei - 0.3, T.sekkei + 0.6), { size: 78 });
    }
    // mascot ponder (nói 145–147)
    if (t > this.M[0] - 0.1 && t < this.M[1] + 0.8) { g.save(); g.translate(0, 560 * out(t, this.M[1], 0.6)); figure(g, 'ponder', 1700, H, 450, prog(t, this.M[0], this.M[0] + 0.6), { t }); g.restore(); }
    actCard(g, t, F, S, 6);
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Rebuttal.prototype.sfx; Rebuttal.prototype.sfx = function () { return [..._sfx.call(this), ...[799.2].map(t => ({ t, kind: 'tick' }))]; };
