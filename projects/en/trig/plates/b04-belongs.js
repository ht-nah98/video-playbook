// b04 · A number that belongs to the angle (p2 câu 19–31) — DNA ferris, ERA fair (nền vòng đu quay mờ quay chậm).
//  19 ba tam giác ½ rơi đi, còn lại MỘT góc 30° + ½   20 vé "30° → ½" + hai vé chờ "?° → ?"   21 máy bán vé: sin(30°) → 0.5 (SINE)
//  22 tam giác 30°: cạnh kề bạc hà (COSINE), cạnh đối hồng (TANGENT = đối / kề)   23 ba vé SINE / COSINE / TANGENT gắn vào góc
//  24 "A STRANGE HISTORY"   25–27 chuỗi bảng JYA → JIBA → JAYB → SINUS → SINE (cây cung + dây cung trên đường tròn; nếp gấp)
//  28 "NOT a side of a right triangle, BUT a chord inside a circle"   29 Hipparchus + quạt dây cung "A TABLE OF CHORDS"
//  30 tam giác đồng dạng giữ tỉ lệ → "ONE ANGLE, ONE SINE"   31 máy: ANGLE → máy → ONE NUMBER; "A RULE ABOUT TRIANGLES" bị gạch, "A FUNCTION"
import { W, H, C, AR, CG, TAU, D2R, SPIN, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, secTag, ticket, brokenTriangle, ticketMachine, strike, mirrorFrame, photoImages, angleArc, dashed, line, rr, text, shade, SIN30, num } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const TAN30 = Math.tan(30 * D2R);
const TRIS = [[100, 1.9], [950, 1.1], [1500, 0.55]];                              // ba tam giác đồng dạng: to dần xuống nhỏ, lấp khung

export default class Belongs {
  static ERA = 'fair';
  static IMAGES = photoImages('hipparchus');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b04');
    this.START = L(19).start;
    this.FROM = Math.max(this.START - 1.2, L(18).end + 0.5);
    const S = i => L(i).start;
    this.T = {
      s: Array.from({ length: 13 }, (_, i) => S(19 + i)),                       // s[0]=câu 19 … s[12]=câu 31
      angle19: w(19, 'angle'), only19: w(19, 'only'), depends: w(19, 'depends'),
      every20: w(20, 'every'), thirty20: w(20, 'thirty'), half20: w(20, 'half'),
      sine21: w(21, 'sine'),
      cosine: w(22, 'cosine'), adj1: w(22, 'adjacent'), tangent: w(22, 'tangent'), opp: w(22, 'opposite'), adj2: w(22, 'adjacent', 2),
      three: w(23, 'three'), attached: w(23, 'attached'),
      strange: w(24, 'strange'), history: w(24, 'history'),
      jya: w(25, 'jya'), bowstring: w(25, 'bowstring'), bent: w(25, 'bent'), chord25: w(25, 'chord'), arc25: w(25, 'arc'), circle25: w(25, 'circle'),
      jiba: w(26, 'jiba'), vowels: w(26, 'vowels'), jayb: w(26, 'jayb'), fold: w(26, 'fold'),
      sinus: w(27, 'sinus'), sine27: w(27, 'sine'),
      side28: w(28, 'side'), but28: w(28, 'but'), chord28: w(28, 'chord'),
      table29: w(29, 'table'), chords29: w(29, 'chords'),
      answer30: w(30, 'answer'), similar30: w(30, 'similar'), ratios30: w(30, 'ratios'), sine30: w(30, 'sine'),
      sine31: w(31, 'sine'), rule31: w(31, 'rule'), function31: w(31, 'function'), angle31: w(31, 'angle'), back31: w(31, 'back'), number31: w(31, 'number'), one31: w(31, 'one'),
    };
    if (num(SIN30) !== '0.5') throw new Error('b04: SIN30');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.angle19, 'card'), c(T.thirty20, 'card'), c(T.sine21, 'flap'), c(T.sine21 + 0.7, 'zap'), c(T.cosine, 'pen'), c(T.tangent, 'pen'), c(T.three, 'card'),
      c(T.strange, 'card'), c(T.jya, 'flap'), c(T.bowstring, 'pen'), c(T.chord25, 'card'), c(T.circle25, 'tick'), c(T.jiba, 'flap'), c(T.jayb, 'flap'), c(T.fold + 0.1, 'card'), c(T.sinus, 'flap'), c(T.sine27, 'flap'),
      c(T.side28, 'card'), c(T.but28 + 0.1, 'snap'), c(T.table29, 'card'), c(T.chords29, 'pen'), c(T.similar30, 'card'), c(T.sine30, 'card'), c(T.rule31, 'card'),
      c(T.function31, 'pen'), c(T.back31, 'zap')];
  }
  tri(g, Ax, Ay, s, k = 1, label = null) { brokenTriangle(g, Ax, Ay, { deg: 30, s, k, label }); const Bx = Ax + 380 * s; return { B: [Bx, Ay], C: [Bx, Ay - 380 * s * TAN30] }; }
  arrow(g, x0, y0, x1, y1, k, col = C.ink) {
    if (k <= 0) return; const xe = lerp(x0, x1, outCubic(clamp(k))), ye = lerp(y0, y1, outCubic(clamp(k))), a = Math.atan2(y1 - y0, x1 - x0);
    line(g, x0, y0, xe, ye, col, 6); g.save(); g.translate(xe, ye); g.rotate(a); g.fillStyle = col; g.beginPath(); g.moveTo(10, 0); g.lineTo(-14, -12); g.lineTo(-14, 12); g.closePath(); g.fill(); g.restore();
  }
  tag(g, s, x, y, k, o = {}) { return k > 0 ? ticket(g, s, x, y, { size: 36, k, ...o }) : null; }
  render(g, t) {
    const T = this.T, S = this.START, F = this.FROM;
    ground(g, 'fair');
    wheel(g, 1600, 470, 330, { theta: 1.2 + SPIN * t, alpha: 0.18, groundY: 932 });
    secTag(g, 'A number that belongs to the angle', { k: prog(t, F + 0.3, F + 0.7), t });
    const s = T.s;

    // ── s19–s20: từ ba tam giác ½ về MỘT góc ──
    const f19 = inC(prog(t, T.angle19 - 0.2, T.angle19 + 0.5));
    if (f19 < 1 && t < s[1]) {
      g.save(); g.translate(0, 1000 * f19);
      TRIS.forEach(([x, sc], i) => { const k = prog(t, F + 0.2 + i * 0.15, F + 0.6 + i * 0.15); this.tri(g, x, 900, sc, k);
        this.tag(g, '½', x + 380 * sc + 60, 900 - 380 * sc * TAN30 * 0.5 - 50, k, { size: 56, edge: C.bulb }); });
      this.tag(g, 'IT ONLY DEPENDS ON THE ANGLE', 1000, 250, prog(t, T.only19 - 0.1, T.only19 + 0.35), { size: 42 });
      g.restore();
    }
    // góc đơn lẻ
    const kg = prog(t, T.angle19, T.angle19 + 0.7), V = [760, 860], RL = 560;
    if (kg > 0 && t < s[3] - 0.4 + 0.4) {
      const o = inC(prog(t, s[3] - 0.5, s[3] - 0.05));
      g.save(); g.translate(0, 900 * o);
      line(g, V[0], V[1], V[0] + RL * outCubic(kg), V[1], C.ink, 7);
      line(g, V[0], V[1], V[0] + RL * outCubic(kg) * Math.cos(30 * D2R), V[1] - RL * outCubic(kg) * Math.sin(30 * D2R), C.ink, 7);
      angleArc(g, V[0], V[1], 150, 30 * D2R * kg);
      this.tag(g, '30°', V[0] + 215, V[1] - 52, prog(t, T.angle19 + 0.3, T.angle19 + 0.7), { size: 44, color: C.angInk, edge: C.ang });
      g.restore();
    }
    // vé "30° → ½" và hai vé chờ
    const kt = prog(t, T.thirty20 - 0.1, T.thirty20 + 0.4), kw = prog(t, T.every20 - 0.1, T.every20 + 0.4), o2 = inC(prog(t, s[3] - 0.5, s[3] - 0.05));
    if (o2 < 1) {
      g.save(); g.translate(0, 900 * o2);
      if (kw > 0) [440, 660].forEach(y => { const k = outBack(kw); g.save(); g.translate(1500, y); g.scale(k, k); g.setLineDash([12, 10]); g.strokeStyle = C.dim; g.lineWidth = 4; g.stroke(rr(-150, -36, 300, 72, 14)); g.setLineDash([]);
        text(g, '?° → ?', 0, 2, { font: `800 38px ${AR}`, color: C.dim, align: 'center', base: 'middle' }); g.restore(); });
      this.tag(g, '30° → ½', 1500, 550, kt, { size: 56, edge: C.bulb });
      g.restore();
    }
    // ── s21–s23: máy bán vé: sin(30°) = 0.5 ──
    const mOut = inC(prog(t, s[6] - 0.5, s[6] - 0.05)), mk = prog(t, T.sine21 - 0.5, T.sine21 + 0.3);
    if (mk > 0 && mOut < 1) {
      g.save(); g.translate(-700 * mOut, 0);
      ticketMachine(g, 110, 170, 0.7, { line: 'sin(30°)', value: num(SIN30), flapK: prog(t, T.sine21, T.sine21 + 0.5), flapFrom: '', bulbK: prog(t, T.sine21 + 0.55, T.sine21 + 0.95), k: mk, cells: 10 });
      g.restore();
    }
    this.tag(g, 'THE SINE OF THE ANGLE', 1330, 250, prog(t, T.sine21 + 0.2, T.sine21 + 0.65) * (1 - inC(prog(t, s[3] - 0.4, s[3] - 0.05))), { size: 42, edge: C.sin, color: C.sinInk });
    // tam giác 30° (s22–s23)
    const tk = prog(t, s[3] - 0.1, s[3] + 0.5), tf = inC(prog(t, s[6] - 0.5, s[6] - 0.05)), A = [950, 900];
    if (tk > 0 && tf < 1) {
      g.save(); g.translate(0, 1000 * tf);
      const M = this.tri(g, A[0], A[1], 1, tk), [Bx, By] = M.B, [Cx, Cy] = M.C;
      const kc = prog(t, T.adj1 - 0.1, T.adj1 + 0.4), ko = prog(t, T.opp - 0.1, T.opp + 0.4);
      if (kc > 0) line(g, A[0], A[1] + 36, lerp(A[0], Bx, outCubic(kc)), A[1] + 36, C.cos, 10);
      if (ko > 0) line(g, Bx + 46, By, Bx + 46, lerp(By, Cy, outCubic(ko)), C.sin, 10);
      this.tag(g, 'COSINE = ADJACENT / HYPOTENUSE', 1340, 360, prog(t, T.cosine - 0.1, T.cosine + 0.4), { size: 34, edge: C.cos, color: C.cosInk });
      this.tag(g, 'TANGENT = OPPOSITE / ADJACENT', 1340, 450, prog(t, T.tangent - 0.1, T.tangent + 0.4), { size: 34 });
      const k3 = prog(t, T.three - 0.1, T.three + 0.5);
      [['SINE', 735, 700, C.sin, C.sinInk], ['COSINE', 700, 790, C.cos, C.cosInk], ['TANGENT', 690, 880, C.ink, C.ink]].forEach(([n, x, y, e, c2], i) => { const k = clamp(k3 * 1.6 - i * 0.35);
        if (k > 0) { dashed(g, x + 70, y, A[0] + 62, A[1] - 22, k, { w: 3, dash: [6, 8] }); this.tag(g, n, x, y, k, { size: 34, edge: e, color: c2 }); } });
      g.restore();
    }
    // ── s24: lịch sử lạ ──
    const ks = prog(t, T.strange - 0.1, T.strange + 0.4) * (1 - inC(prog(t, s[5] - 0.2, s[5] + 0.3)));
    if (ks > 0) this.tag(g, 'THE NAME HAS A STRANGE HISTORY', 960, 540, ks, { size: 60 });
    // ── s25–s27: chuỗi tên + cây cung ──
    const chainOut = inC(prog(t, s[10] + 0.1, s[10] + 0.5));
    if (chainOut < 1 && t >= T.jya - 0.2) {
      g.save(); g.translate(0, -500 * chainOut);
      const items = [['JYA', 230, T.jya, 'INDIAN', 80], ['JIBA', 520, T.jiba, 'ARABIC', 90], ['JAYB', 830, T.jayb, 'MISREAD', 100], ['SINUS', 1160, T.sinus, 'LATIN', 120], ['SINE', 1470, T.sine27, 'ENGLISH', 95]];
      items.forEach(([n, x, at, lang], i) => {
        const k = prog(t, at - 0.1, at + 0.4);
        if (i > 0) this.arrow(g, items[i - 1][1] + items[i - 1][4] + 12, 230, x - items[i][4] - 12, 230, prog(t, at - 0.1, at + 0.35));
        this.tag(g, n, x, 230, k, { size: 40, edge: i === 4 ? C.sin : C.ink, color: i === 4 ? C.sinInk : C.ink });
        if (k > 0) text(g, lang, x, 300, { font: `800 28px ${AR}`, color: C.dim, align: 'center', k: clamp(k * 1.5 - 0.3) });
      });
      g.restore();
    }
    const bowOut = inC(prog(t, s[11] - 0.4, s[11] + 0.1)), CC = [640, 760], R = 250;
    const kb = prog(t, T.jya, T.jya + 0.8);
    if (kb > 0 && bowOut < 1 && t < s[12] + 20) {
      g.save(); g.translate(0, 900 * bowOut);
      const a0 = 15 * D2R, a1 = 165 * D2R, P = a => [CC[0] + R * Math.cos(a), CC[1] - R * Math.sin(a)];
      const kcirc = prog(t, T.circle25 - 0.1, T.circle25 + 0.8) * (1 - 0);
      if (kcirc > 0) { g.save(); g.setLineDash([10, 12]); g.strokeStyle = 'rgba(35,50,74,0.55)'; g.lineWidth = 4; g.beginPath(); g.arc(CC[0], CC[1], R, 0, TAU * kcirc); g.stroke(); g.restore(); }
      const hiArc = prog(t, T.bent - 0.1, T.bent + 0.3) * (1 - prog(t, T.arc25 + 1.0, T.arc25 + 1.2));
      g.save(); g.lineCap = 'round'; g.strokeStyle = '#8C6B3E'; g.lineWidth = 18; g.beginPath();
      for (let i = 0; i <= 40; i++) { const a = lerp(a0, a0 + (a1 - a0) * outCubic(kb), i / 40), [x, y] = P(a); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
      const [x0, y0] = P(a0), [x1, y1] = P(a1), sw = (t >= T.side28 ? prog(t, T.chord28 - 0.2, T.chord28 + 0.3) : 0);
      line(g, x0, y0, lerp(x0, x1, outCubic(kb)), lerp(y0, y1, outCubic(kb)), C.ink, 5 + 6 * sw * Math.sin(Math.min(1, (t - T.chord28) / 1.5) * Math.PI + 0.001));
      for (const [x, y] of [[x0, y0], [x1, y1]]) if (kb > 0.9) { g.fillStyle = C.steelDk; g.beginPath(); g.arc(x, y, 10, 0, TAU); g.fill(); }
      // vé nhãn
      const kbs = prog(t, T.bowstring - 0.1, T.bowstring + 0.4) * (1 - prog(t, T.chord25 - 0.15, T.chord25 + 0.05));
      this.tag(g, 'BOWSTRING', 640, 800, kbs, { size: 36 });
      this.tag(g, 'CHORD', 640, 800, prog(t, T.chord25 - 0.1, T.chord25 + 0.35), { size: 36 });
      this.tag(g, 'ARC', 640, 470, prog(t, T.arc25 - 0.1, T.arc25 + 0.35), { size: 36 });
      g.restore();
    }
    // s26: không nguyên âm, nếp gấp
    const o26 = inC(prog(t, s[9] - 0.4, s[9] + 0.05));
    if (o26 < 1) {
      g.save(); g.translate(0, 900 * o26);
      this.tag(g, 'ARABIC WRITES NO VOWELS', 1420, 470, prog(t, T.vowels - 0.1, T.vowels + 0.4), { size: 36 });
      const kf = prog(t, T.jayb - 0.1, T.jayb + 0.5);
      if (kf > 0) { g.save(); g.translate(1420, 690); g.scale(outBack(kf), outBack(kf));
        shade(g, () => { g.fillStyle = '#FFFDF7'; g.beginPath(); g.moveTo(-110, -70); g.lineTo(110, -70); g.lineTo(110, 70); g.lineTo(-110, 70); g.closePath(); g.fill(); });
        g.strokeStyle = C.steelDk; g.lineWidth = 4; g.strokeRect(-110, -70, 220, 140); g.fillStyle = '#E8DCC2'; g.beginPath(); g.moveTo(30, 70); g.lineTo(110, 70); g.lineTo(110, -10); g.closePath(); g.fill(); g.strokeStyle = C.steelDk; g.lineWidth = 4; g.beginPath(); g.moveTo(30, 70); g.lineTo(110, -10); g.stroke();
        g.restore(); }
      this.tag(g, 'JAYB = A FOLD', 1420, 820, prog(t, T.fold - 0.1, T.fold + 0.35), { size: 36 });
      g.restore();
    }
    // ── s28: không phải cạnh tam giác — mà là dây cung ──
    const o28 = inC(prog(t, s[10] - 0.4, s[10] + 0.05));
    if (o28 < 1 && t >= T.side28 - 0.2) {
      g.save(); g.translate(0, 900 * o28);
      const k1 = prog(t, T.side28 - 0.1, T.side28 + 0.4);
      this.tag(g, 'SIDE OF A RIGHT TRIANGLE', 1420, 470, k1, { size: 38 });
      if (k1 > 0) strike(g, 1130, 500, 1710, 450, prog(t, T.but28, T.but28 + 0.4), { w: 8 });
      this.tag(g, 'A CHORD INSIDE A CIRCLE', 1420, 600, prog(t, T.chord28 - 0.1, T.chord28 + 0.4), { size: 38 });
      g.restore();
    }
    // ── s29: Hipparchus + quạt dây cung ──
    const o29 = inC(prog(t, s[11] - 0.4, s[11] + 0.1)), kH = prog(t, s[10] + 0.5, s[10] + 1.3) * (1 - o29);
    if (kH > 0) mirrorFrame(g, 'hipparchus', 1250, 200, 380, 440, { k: kH, rot: 0.03, label: 'HIPPARCHUS · c. 190–120 BC', note: 'IMAGINED · NO LIKENESS SURVIVES', zoom: 1 + 0.04 * prog(t, s[10], s[11]), focus: [0.45, 0.25], t });
    const kq = prog(t, T.chords29 - 0.1, T.chords29 + 1.0);
    if (kq > 0 && bowOut < 1) {
      g.save(); g.translate(0, 900 * bowOut);
      const P0 = [CC[0] + R * Math.cos(200 * D2R), CC[1] - R * Math.sin(200 * D2R)];
      [30, 60, 90, 120, 150].forEach((d, i) => { const u = clamp(kq * 5 - i); if (u > 0) { const Q = [CC[0] + R * Math.cos(d * D2R), CC[1] - R * Math.sin(d * D2R)]; dashed(g, P0[0], P0[1], Q[0], Q[1], u, { w: 4, color: C.ink, dash: [4, 0] }); } });
      g.restore();
      this.tag(g, 'A TABLE OF CHORDS', 1150, 930, prog(t, T.table29 - 0.1, T.table29 + 0.4) * (1 - o29), { size: 38 });
    }
    // ── s30: đồng dạng giữ tỉ lệ → một góc, một sin ──
    const k30 = prog(t, s[11] + 0.2, s[11] + 0.8) * (1 - inC(prog(t, s[12] - 0.4, s[12] + 0.1)));
    if (k30 > 0) {
      TRIS.forEach(([x, sc], i) => { this.tri(g, x, 900, sc, clamp(k30 * 1.5 - i * 0.2));
        this.tag(g, '½', x + 380 * sc + 60, 900 - 380 * sc * TAN30 * 0.5 - 50, clamp(k30 * 1.5 - i * 0.2), { size: 56, edge: C.bulb }); });
      this.tag(g, 'SIMILAR TRIANGLES KEEP THEIR RATIOS', 1050, 250, prog(t, T.similar30 - 0.1, T.similar30 + 0.4) * (1 - inC(prog(t, s[12] - 0.4, s[12] + 0.1))), { size: 42 });
      this.tag(g, 'ONE ANGLE, ONE SINE', 1050, 380, prog(t, T.sine30 - 0.1, T.sine30 + 0.4), { size: 52, edge: C.sin, color: C.sinInk });
    }
    // ── s31: ANGLE → máy → ONE NUMBER ──
    if (t >= s[12] - 0.3) {
      const km = prog(t, s[12] - 0.2, s[12] + 0.6);
      ticketMachine(g, 720, 170, 0.7, { line: 'sin(30°)', value: num(SIN30), flapK: prog(t, T.sine31 + 0.1, T.sine31 + 0.8), flapFrom: '', bulbK: prog(t, T.back31, T.back31 + 0.4), k: km, cells: 10 });
      this.tag(g, 'A RULE ABOUT TRIANGLES', 1500, 250, prog(t, T.rule31 - 0.1, T.rule31 + 0.35), { size: 38 });
      strike(g, 1180, 280, 1820, 225, prog(t, T.function31 - 0.4, T.function31 - 0.05));
      this.tag(g, 'A FUNCTION', 1500, 380, prog(t, T.function31 - 0.1, T.function31 + 0.35), { size: 50, edge: C.ink });
      const ka = prog(t, T.angle31 - 0.1, T.angle31 + 0.4);
      this.tag(g, 'AN ANGLE', 330, 600, ka, { size: 44, color: C.angInk, edge: C.ang });
      this.arrow(g, 480, 600, 700, 600, prog(t, T.angle31 + 0.1, T.angle31 + 0.6));
      this.arrow(g, 1150, 600, 1330, 600, prog(t, T.back31 - 0.1, T.back31 + 0.4));
      this.tag(g, 'ONE NUMBER', 1560, 600, prog(t, T.one31 - 0.15, T.one31 + 0.3), { size: 44, edge: C.bulb });
    }
  }
}
