// b03 · The same ratio, every time (ACT TWO, p2 câu 12–18) — DNA ferris, ERA fair. Thẻ hồi "ACT TWO · One number for every angle".
//  câu 12  bậc thang thiếu một bậc (ô nét đứt), mũi tên nhảy qua → "THE STEP WE SKIPPED"
//  câu 13  tam giác 30° (xám) : ngoặc navy ở cạnh đối + cạnh huyền; phân số OPPOSITE / HYPOTENUSE
//  câu 14  "= ½" (cùng số máy sẽ trả: sin 30° = 0.5)
//  câu 15  hai tam giác nữa: gấp đôi + nhỏ hơn mười lần (kính lúp) — cùng góc 30° ở đáy trái
//  câu 16  ba vé ½ lần lượt trên ba tam giác ("every single time")
//  câu 17  "SIMILAR": SAME ANGLES / SAME SHAPE / DIFFERENT SIZE
//  câu 18  tam giác giữa co giãn liên tục, vé ½ đứng yên → "EVERY RATIO STAYS THE SAME"
import { W, H, C, AR, TAU, D2R, SPIN, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, secTag, actTitle, ticket, brokenTriangle, dashed, line, rr, text, shade, SIN30, num } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const TAN30 = Math.tan(30 * D2R);

export default class SameRatio {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b03');
    this.START = L(12).start;
    this.FROM = Math.max(this.START - 2.6, L(11).end + 0.5);
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      s: [12, 13, 14, 15, 16, 17, 18].map(S), e: [12, 13, 14, 15, 16, 17, 18].map(E),
      step: w(12, 'step'), skipped: w(12, 'skipped'),
      thirty: w(13, 'thirty'), right: w(13, 'right'), divide: w(13, 'divide'), opposite: w(13, 'opposite'), longest: w(13, 'longest'), hyp: w(13, 'hypotenuse'),
      half14: w(14, 'half'), get14: w(14, 'get'),
      another: w(15, 'another'), twice: w(15, 'twice'), smaller: w(15, 'smaller'),
      divb: w(16, 'divide'), half16: w(16, 'half'), every16: w(16, 'every'), single: w(16, 'single'), time16: w(16, 'time'),
      similar: w(17, 'similar'), angles17: w(17, 'angles'), shape17: w(17, 'shape'), size17: w(17, 'size'), diff17: w(17, 'different'),
      scale18: w(18, 'scale'), up18: w(18, 'up'), down18: w(18, 'down'), ratio18: w(18, 'ratio'), same18: w(18, 'same'),
    };
    if (num(SIN30) !== '0.5') throw new Error('b03: SIN30');
    this.HALF = must(`Math.round(Math.sin(30 * Math.PI / 180) * 2) / 2`, 0.5);     // "½" = đối / huyền của 30°
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.step, 'card'), c(T.skipped + 0.2, 'tick'), c(T.thirty, 'card'), c(T.divide, 'pen'), c(T.opposite, 'pen'), c(T.hyp, 'pen'), c(T.half14, 'zap'), c(T.another, 'card'), c(T.smaller, 'card'), c(T.time16 + 0.1, 'correct'),
      c(T.similar, 'card'), c(T.same18, 'pen'), c(T.up18, 'tick'), c(T.s[6] + 3.2, 'tick')];
  }
  /** Tam giác vuông xám 30° với góc nhọn ở A. Trả về {B, C} (toạ độ màn hình). */
  tri(g, Ax, Ay, s, k = 1, label = null) {
    brokenTriangle(g, Ax, Ay, { deg: 30, s, k, label });
    const Bx = Ax + 380 * s;
    return { B: [Bx, Ay], C: [Bx, Ay - 380 * s * TAN30] };
  }
  stairs(g, k, out, t) {
    if (k <= 0) return;
    g.save(); g.translate(0, 700 * out);
    const X = [560, 710, 860], base = 905, hs = [105, 195, 285];
    [0, 2].forEach(i => { const e = outBack(clamp(k * 1.6 - i * 0.3), 1.1); const x = X[i], h = hs[i] * e; shade(g, () => { g.fillStyle = '#E8DCC2'; g.fillRect(x, base - h, 150, h); }); g.fillStyle = '#E8DCC2'; g.fillRect(x, base - h, 150, h); g.strokeStyle = C.steelDk; g.lineWidth = 4; g.strokeRect(x, base - h, 150, h); g.fillStyle = C.steel; g.fillRect(x, base - h, 150, 16); });
    g.save(); g.setLineDash([12, 10]); g.strokeStyle = C.ink; g.lineWidth = 4; g.globalAlpha = 0.5 + 0.5 * Math.sin(t * 5) * 0.5 + 0.25; g.strokeRect(X[1], base - hs[1], 150, hs[1]); g.restore();
    g.restore();
  }
  render(g, t) {
    const T = this.T, S = this.START, F = this.FROM;
    ground(g, 'fair');
    wheel(g, 1600, 470, 330, { theta: 0.5 + SPIN * t, alpha: 0.2, groundY: 932 });
    actTitle(g, t, S, 'ACT TWO', 'One number for every angle');
    secTag(g, 'The same ratio, every time', { k: prog(t, S, S + 0.4), t });

    // ── s12: bậc thang bị bỏ qua ──
    const out12 = inC(prog(t, T.s[1] - 0.4, T.s[1] + 0.1));
    const kst = prog(t, S + 0.35, S + 0.9);
    if (out12 < 1) {
      this.stairs(g, kst, out12, t);
      g.save(); g.translate(0, 700 * out12);
      const ka = prog(t, T.skipped - 0.1, T.skipped + 0.6);
      if (ka > 0) { g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.setLineDash([2, 12]); g.beginPath(); g.moveTo(640, 770); g.quadraticCurveTo(785, 520, 930, 600 + 0 * ka);
        g.stroke(); g.setLineDash([]); }
      const kt = prog(t, T.step - 0.1, T.step + 0.35);
      if (kt > 0) ticket(g, 'THE STEP WE SKIPPED', 1180, 520, { size: 44, k: kt });
      g.restore();
    }
    // ── s13–s14: tam giác 30° + phân số ──
    const k13 = prog(t, T.s[1] - 0.1, T.s[1] + 0.5), mv = outCubic(prog(t, T.s[3] - 0.3, T.s[3] + 0.35));
    const m18 = outCubic(prog(t, T.scale18 - 0.5, T.scale18 - 0.1));
    const Ax = lerp(lerp(560, 1000, mv), 560, m18), Ay = lerp(lerp(880, 905, mv), 900, m18), sc = lerp(1.25, 1, mv) + 0.48 * Math.sin(Math.max(0, t - T.scale18) * 2.2);
    let M = null;
    if (k13 > 0) {
      const lab = prog(t, T.thirty, T.thirty + 0.4) > 0 ? '30°' : null;
      M = this.tri(g, Ax, Ay, sc, k13, lab);
      const [Bx, By] = M.B, [Cx, Cy] = M.C;
      // cạnh đối (ngoặc navy) + vé
      const ko = prog(t, T.opposite - 0.1, T.opposite + 0.4), kh = prog(t, T.hyp - 0.5, T.hyp + 0.4);
      if (ko > 0 && t < T.s[3] - 0.1) { const x = Bx + 46 * sc; line(g, x, By, x, lerp(By, Cy, outCubic(ko)), C.ink, 6);
        if (t < T.s[3] + 0.2) ticket(g, 'OPPOSITE', x + 160, (By + Cy) / 2, { size: 36, k: ko }); }
      if (kh > 0 && t < T.s[3] - 0.1) { const ox = -50 * sc * 0.5 * 2 * 0.5, nx = -Math.sin(30 * D2R) * 54 * sc, ny = -Math.cos(30 * D2R) * 54 * sc;
        line(g, Ax + nx, Ay + ny, lerp(Ax + nx, Cx + nx, outCubic(kh)), lerp(Ay + ny, Cy + ny, outCubic(kh)), C.ink, 6);
        if (t < T.s[3] + 0.2) ticket(g, 'LONGEST SIDE: HYPOTENUSE', (Ax + Cx) / 2 + nx * 2.6 - 40, (Ay + Cy) / 2 + ny * 2.6, { size: 34, k: kh }); }
      // phân số
      const kd = prog(t, T.divide - 0.1, T.divide + 0.4), outFr = inC(prog(t, T.s[3] - 0.4, T.s[3] + 0.1));
      if (kd > 0 && outFr < 1) {
        g.save(); g.translate(0, -700 * outFr);
        ticket(g, 'OPPOSITE', 1500, 330, { size: 40, k: kd }); line(g, 1360, 395, 1360 + 280 * outCubic(kd), 395, C.ink, 8); ticket(g, 'HYPOTENUSE', 1500, 460, { size: 40, k: kd });
        const kh2 = prog(t, T.half14 - 0.1, T.half14 + 0.35);
        if (kh2 > 0) ticket(g, `= ½`, 1500, 600, { size: 90, edge: C.bulb, k: kh2 });
        g.restore();
      }
    }
    // ── s15–s18: ba tam giác đồng dạng ──
    const kb = prog(t, T.twice - 0.1, T.twice + 0.5), ks = prog(t, T.smaller - 0.1, T.smaller + 0.4);
    const out18 = inC(prog(t, T.scale18 - 0.4, T.scale18 + 0.2));
    if (t >= T.s[3]) {
      const ka2 = prog(t, T.another - 0.1, T.another + 0.4) * (1 - out18) * (1 - prog(t, T.similar - 0.4, T.similar - 0.1));
      if (ka2 > 0) ticket(g, 'ANOTHER TRIANGLE, SAME 30°', 960, 370, { size: 40, k: ka2 });
      const half = (x, y, k) => k > 0 ? ticket(g, '½', x, y, { size: 64, edge: C.bulb, k }) : null;
      let Bg = null;
      if (kb > 0) { g.save(); g.translate(-1400 * out18, 0); Bg = this.tri(g, 130, 905, 2.0, kb); g.restore(); }
      if (ks > 0) {
        g.save(); g.translate(1400 * out18, 0);
        this.tri(g, 1500, 905, 0.1, ks);
        const lc = [1700, 620], kl = clamp(ks * 1.6 - 0.2);
        if (kl > 0) { dashed(g, 1510, 890, lc[0] - 70, lc[1] + 80, kl, { w: 3, dash: [6, 8] });
          g.save(); g.translate(lc[0], lc[1]); g.scale(outBack(kl), outBack(kl)); shade(g, () => { g.fillStyle = '#FFFDF7'; g.beginPath(); g.arc(0, 0, 112, 0, TAU); g.fill(); });
          g.strokeStyle = C.steelDk; g.lineWidth = 10; g.stroke(); g.save(); g.beginPath(); g.arc(0, 0, 104, 0, TAU); g.clip(); brokenTriangle(g, -80, 60, { deg: 30, s: 0.42 }); g.restore(); g.restore(); }
        g.restore();
      }
      // ½ lần lượt: to, vừa, nhỏ
      const hb = prog(t, T.divb, T.divb + 0.3), hh = prog(t, T.half16 - 0.1, T.half16 + 0.3), ht = prog(t, T.single - 0.1, T.single + 0.3);
      if (Bg || out18 < 1) {
        g.save(); g.translate(0, -1000 * out18);
        half(1000, 540, hb); half(1480, 780, hh); half(1560, 840, 0); g.restore();
        g.save(); g.translate(1400 * out18, 0); if (ht > 0) ticket(g, '½', 1700, 790, { size: 64, edge: C.bulb, k: ht }); g.restore();
      }
      // s17: đồng dạng
      const k1 = prog(t, T.similar - 0.1, T.similar + 0.4) * (1 - out18);
      if (k1 > 0) ticket(g, 'THESE TRIANGLES ARE SIMILAR', 1000, 235, { size: 46, k: k1 });
      [['SAME ANGLES', 560, T.angles17, C.angInk, C.ang], ['SAME SHAPE', 960, T.shape17, C.ink, C.ink], ['DIFFERENT SIZE', 1360, T.diff17, C.ink, C.ink]].forEach(([s, x, at, col, edge]) => {
        const k = prog(t, at - 0.1, at + 0.35) * (1 - out18); if (k > 0) ticket(g, s, x, 335, { size: 36, color: col, edge, k }); });
      // s18: tam giác giữa co giãn, vé ½ đứng yên
      if (t >= T.scale18 - 0.4) {
        const kr = prog(t, T.ratio18 - 0.1, T.ratio18 + 0.4);
        ticket(g, '½', 1480, 640, { size: 110, edge: C.bulb, k: prog(t, T.scale18, T.scale18 + 0.4) });
        if (kr > 0) ticket(g, 'EVERY RATIO STAYS THE SAME', 1100, 300, { size: 44, k: kr });
        if (prog(t, T.up18 - 0.1, T.up18 + 0.35) > 0) ticket(g, 'SCALE UP', 1480, 440, { size: 34, k: prog(t, T.up18 - 0.1, T.up18 + 0.35) * (1 - prog(t, T.down18, T.down18 + 0.2)) });
        if (prog(t, T.down18 - 0.1, T.down18 + 0.35) > 0) ticket(g, 'SCALE DOWN', 1480, 440, { size: 34, k: prog(t, T.down18 - 0.1, T.down18 + 0.35) });
      }
    }
  }
}
