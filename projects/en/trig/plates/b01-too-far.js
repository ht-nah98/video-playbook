// b01 · Too far to touch (ACT ONE, p2 câu 0–7) — DNA ferris, ERA fair.
// Mối nối p1 → b01: FROM = −3.0, khung đầu = kit.zenith() (trời trơn); camera HẠ xuống cảnh nhìn từ ĐỈNH vòng đu quay
// (ống nhòm bỏ xu ở gốc tia ngắm 330,905; núi / thuyền / Mặt Trăng vẽ ĐÚNG như a0 s3); biển ACT ONE thả xuống khi camera dừng.
//  s0 câu 0  ba câu hỏi: tia ngắm nét đứt tới núi / thuyền / Mặt Trăng + vé "HOW TALL?" "HOW FAR?" "HOW FAR?" (mascot pose-sky nghe)
//  s1 câu 1  thước dây kéo ra khỏi ống nhòm, đứt hơi ở 38% đường tới thuyền → giật về, vé xám "TOO SHORT"
//  s2 câu 2  đứng trên đất: một đường đáy + hai góc (cung chanh vàng) tới đỉnh núi + đường cao "HEIGHT" tính ra
//  s3 câu 3  biển bảng lật TRIGONOMETRY
//  s4–s5     hai từ Hy Lạp: vé TRIGONON · TRIANGLE (tam giác nhỏ) + METRON · MEASURE (thước) → ghép thành tam giác có thước
//  s6 câu 6  một cạnh + hai góc (chanh vàng) → các cạnh còn lại sáng đèn: "DECIDED"
//  s7 câu 7  một mảnh đất cắt thành tam giác (đường chéo vẽ dần, tô kẹo) → "ALMOST ANYTHING"
import { W, H, C, AR, TAU, D2R, clamp, hash, prog, lookup, outCubic, outBack, smooth, ground, sky, zenith, brokenTriangle, mountain, ship, moon,
  dashed, line, rr, text, ticket, sign, secTag, actTitle, angleArc, strike, shade, figure, CANDY, SIN30, num } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const O = [330, 905];                                                   // ống nhòm = gốc tia ngắm (như a0 s3)
const PEAK = [436, 430], SHIP = [1080, 655], MOON = [1240, 210];         // đích tia ngắm (đỉnh núi, cột buồm, Mặt Trăng)

export default class TooFar {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['sky'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');
    this.START = L(0).start;
    this.FROM = -3.0;                                                   // trang p2 có LEAD 3.0: khung 0 của p2 = cảnh này
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      s: [0, 1, 2, 3, 4, 5, 6, 7].map(S), e: [0, 1, 2, 3, 4, 5, 6, 7].map(E),
      mountain: w(0, 'mountain'), ship: w(0, 'ship'), moon: w(0, 'moon'),
      stretch: w(1, 'stretch'), tape: w(1, 'tape'), any: w(1, 'any'),
      stand: w(2, 'stand'), measure2: w(2, 'measure'), couple: w(2, 'couple'), one2: w(2, 'one'), work: w(2, 'work'), rest: w(2, 'rest'),
      trig3: w(3, 'trigonometry'),
      trigonon: w(4, 'trigonon'), metron: w(4, 'metron'), measure4: w(4, 'measure'),
      lit5: w(5, 'literally'), measuring5: w(5, 'measuring'), triangles5: w(5, 'triangles'),
      side6: w(6, 'side'), angles6: w(6, 'angles'), every6: w(6, 'every'), decided6: w(6, 'decided'),
      shape7: w(7, 'shape'), cut7: w(7, 'cut'), measuring7: w(7, 'measuring'), anything7: w(7, 'anything'),
    };
    // hình học đường đáy (s2): hai góc đo từ đáy lên đỉnh núi
    this.A = [300, 930]; this.B = [790, 930];
    this.aA = Math.atan2(this.A[1] - PEAK[1], PEAK[0] - this.A[0]);        // rad, hướng lên (toán học)
    this.aB = Math.atan2(this.B[1] - PEAK[1], PEAK[0] - this.B[0]);        // < 0 vế cos: hướng tới đỉnh ở bên trái B
    // tam giác s6
    this.TRI = { Ax: 1350, Ay: 830, s: 0.85, deg: 40 };
    this.tan40 = Math.tan(40 * D2R);
    // mảnh đất s7
    this.POLY = [[1240, 600], [1370, 430], [1610, 470], [1730, 660], [1510, 830], [1290, 790]];
    this.HALF = SIN30;
    if (num(SIN30) !== '0.5') throw new Error('b01: SIN30');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.mountain + 0.05, 'card'), c(T.moon + 0.05, 'card'), c(T.stretch, 'tick'), c(T.any + 0.1, 'snap'), c(T.stand, 'pen'), c(T.couple + 0.1, 'card'),
      c(T.rest + 0.25, 'zap'), c(T.trig3, 'flap'), c(T.trig3 + 0.6, 'shimmer'), c(T.trigonon, 'card'), c(T.metron, 'card'), c(T.measuring5, 'pen'), c(T.angles6, 'card'), c(T.side6, 'pen'), c(T.decided6, 'zap'),
      c(T.cut7, 'pen'), c(T.anything7, 'card')];
  }

  // ── cảnh xa nhìn từ đỉnh vòng (đúng a0 s3) ──
  far(g, t) {
    const pan = 1 - smooth(prog(t, -2.7, -1.75));
    if (pan >= 1) { zenith(g); return pan; }
    sky(g, { pan });
    g.save(); g.translate(0, Math.round(H * pan));
    g.fillStyle = '#A9D3E3'; g.fillRect(0, 760, W, 170);
    for (let i = 0; i < 30; i++) { const sx = (hash(i * 3.7) * W + t * 12 * (hash(i) + 0.5)) % W, sy = 772 + hash(i * 5.3) * 150; line(g, sx, sy, sx + 40 + hash(i) * 50, sy, 'rgba(255,255,255,0.55)', 2); }
    line(g, 0, 760, W, 760, 'rgba(35,50,74,0.5)', 2);
    mountain(g, 480, 760, 1.1); ship(g, 1080, 800, 0.9, 1, t); moon(g, MOON[0], MOON[1], 70);
    this.viewer(g, t);
    g.restore();
    return pan;
  }
  /** Ống nhòm bỏ xu trên cột; thấu kính ở O (gốc tia ngắm). */
  viewer(g, t) {
    line(g, O[0] - 4, 1030, O[0] - 4, 935, C.steelDk, 22); line(g, O[0] - 4, 1030, O[0] - 4, 935, C.steel, 14);
    g.save(); g.fillStyle = C.steelDk; g.beginPath(); g.arc(O[0] - 4, 975, 17, 0, TAU); g.fill(); g.fillStyle = C.bulb; g.beginPath(); g.arc(O[0] - 4, 975, 11, 0, TAU); g.fill(); g.restore();
    g.save(); g.translate(O[0] - 20, O[1] + 10); g.rotate(-0.42);
    for (const dy of [-20, 20]) { shade(g, () => { g.fillStyle = C.steel; g.fill(rr(-10, dy - 24, 120, 48, 22)); }); g.strokeStyle = C.steelDk; g.lineWidth = 4; g.stroke(rr(-10, dy - 24, 120, 48, 22));
      g.fillStyle = C.ink; g.beginPath(); g.arc(110, dy, 16, 0, TAU); g.fill(); g.fillStyle = '#BFE2F4'; g.beginPath(); g.arc(110, dy, 9, 0, TAU); g.fill(); }
    g.restore();
    g.fillStyle = C.ink; g.beginPath(); g.arc(O[0], O[1], 8, 0, TAU); g.fill();
  }
  tape(g, len, k) {                                                     // thước dây: từ O về phía thuyền, dài len (px)
    if (k <= 0 || len <= 2) return;
    const dx = SHIP[0] - O[0], dy = SHIP[1] - O[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    g.save(); g.translate(O[0], O[1]); g.rotate(Math.atan2(uy, ux));
    shade(g, () => { g.fillStyle = '#F2B632'; g.fillRect(0, -12, len, 24); });
    g.fillStyle = '#FFF0C2'; g.fillRect(0, -12, len, 24); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(0, -12, len, 24);
    for (let x = 12; x < len; x += 12) { g.beginPath(); g.moveTo(x, -12); g.lineTo(x, x % 60 === 12 ? 2 : -3); g.stroke(); }
    g.fillStyle = C.ink; g.fillRect(len - 5, -17, 5, 34);
    g.restore();
  }
  eye(g, x, y, k, col = C.ink) { if (k > 0) { g.save(); g.globalAlpha *= clamp(k); g.strokeStyle = col; g.lineWidth = 6; g.beginPath(); g.arc(x, y, 30 + 20 * (1 - clamp(k)), 0, TAU); g.stroke(); g.restore(); } }

  render(g, t) {
    const T = this.T, S = this.START;
    this.far(g, t);
    actTitle(g, t, S, 'ACT ONE', 'Measuring the unreachable');
    secTag(g, 'Too far to touch', { k: prog(t, S, S + 0.4), t });

    // ── s0: ba câu hỏi — tia ngắm + vé ──
    const q = [[PEAK, T.mountain, 'HOW TALL?', 600, 350], [SHIP, T.ship, 'HOW FAR?', 1290, 590], [MOON, T.moon, 'HOW FAR?', 1560, 250]];
    const gone = prog(t, T.stand, T.stand + 0.6);                          // tia + vé rút đi khi "stand on the ground"
    q.forEach(([p, at, s, lx, ly], i) => {
      const k = prog(t, at - 0.1, at + 0.45) * (1 - gone);
      if (k > 0) { dashed(g, O[0], O[1], p[0], p[1], k, { w: 4 }); this.eye(g, p[0], p[1], prog(t, at, at + 0.35) * (1 - prog(t, at + 0.35, at + 0.8)), C.ink); }
      const kt = prog(t, at, at + 0.4) * (1 - gone);
      if (kt > 0) ticket(g, s, lx, ly - 70 * inC(prog(t, T.stand + 0.1, T.stand + 0.6)), { size: 40, k: kt });
    });
    // ── s1: thước dây không với tới ──
    const kt1 = prog(t, T.tape - 0.1, T.tape + 0.2), ext = outCubic(prog(t, T.stretch, T.stretch + 0.9)), back = inC(prog(t, T.any + 0.1, T.any + 0.6));
    const d1 = Math.hypot(SHIP[0] - O[0], SHIP[1] - O[1]), tl = 0.38 * d1 * ext * (1 - back);
    if (t < T.stand + 0.1) {
      this.tape(g, tl, kt1);
      const tk = prog(t, T.any + 0.15, T.any + 0.5) * (1 - gone);
      if (tk > 0) ticket(g, 'TOO SHORT', O[0] + 0.38 * (SHIP[0] - O[0]) + 30, O[1] + 0.38 * (SHIP[1] - O[1]) - 90, { size: 36, color: C.badInk, edge: C.bad, k: tk });
    }
    // ── s2: đường đáy + hai góc + đường cao ──
    const A = this.A, B = this.B, out2 = inC(prog(t, T.s[4] - 0.35, T.s[4] + 0.25));
    if (out2 < 1) {
      g.save(); g.translate(0, 900 * out2);
      const kb = prog(t, T.stand, T.stand + 0.5), ka = prog(t, T.couple - 0.1, T.couple + 0.5), kd = prog(t, T.one2 - 0.1, T.one2 + 0.4), kh = prog(t, T.work, T.rest + 0.5);
      if (kb > 0) {                                                       // đường đáy
        const xe = lerp(A[0], B[0], outCubic(kb)); line(g, A[0], A[1], xe, A[1], C.ink, 6);
        for (const p of [A, B]) if (kb > 0.9 || p === A) { g.fillStyle = C.ink; g.beginPath(); g.arc(p[0], p[1], 11, 0, TAU); g.fill(); g.fillStyle = C.white; g.beginPath(); g.arc(p[0], p[1], 5, 0, TAU); g.fill(); }
      }
      if (ka > 0) {                                                       // hai tia ngắm tới đỉnh núi + hai cung góc (chanh vàng)
        dashed(g, A[0], A[1], PEAK[0], PEAK[1], ka, { w: 4 }); dashed(g, B[0], B[1], PEAK[0], PEAK[1], ka, { w: 4 });
        const kk = clamp(ka * 1.4 - 0.4);
        angleArc(g, A[0], A[1], 86, this.aA * kk);
        if (kk > 0) {                                                     // góc ở B: từ hướng trái (π) tới hướng đỉnh núi
          const a1 = Math.PI - this.aB, a0 = Math.PI; g.save(); g.fillStyle = 'rgba(242,182,50,0.28)'; g.beginPath(); g.moveTo(B[0], B[1]);
          for (let i = 0; i <= 24; i++) { const a = a0 + (a1 - a0) * kk * i / 24; g.lineTo(B[0] + 86 * Math.cos(a), B[1] - 86 * Math.sin(a)); } g.closePath(); g.fill();
          g.strokeStyle = C.ang; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
          for (let i = 0; i <= 24; i++) { const a = a0 + (a1 - a0) * kk * i / 24; const x = B[0] + 86 * Math.cos(a), y = B[1] - 86 * Math.sin(a); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
        }
        ticket(g, 'ANGLE', 205, 840, { size: 34, color: C.angInk, edge: C.ang, k: ka });
        ticket(g, 'ANGLE', 990, 840, { size: 34, color: C.angInk, edge: C.ang, k: prog(t, T.couple + 0.25, T.couple + 0.65) });
      }
      if (kd > 0) ticket(g, 'ONE DISTANCE', (A[0] + B[0]) / 2, 985, { size: 34, k: kd });
      if (kh > 0) {                                                       // phần còn lại: đường cao tính ra
        dashed(g, PEAK[0], PEAK[1], PEAK[0], A[1], kh, { w: 5, color: C.ink, dash: [4, 10] });
        ticket(g, 'HEIGHT', PEAK[0] + 140, 640, { size: 36, k: prog(t, T.rest, T.rest + 0.4) });
      }
      g.restore();
    }
    // ── s3–s5: TRIGONOMETRY, hai từ Hy Lạp ──
    const lv6 = prog(t, T.s[6] - 0.45, T.s[6] - 0.05), fall6 = 1000 * inC(lv6);
    if (lv6 < 1) {
      g.save(); g.translate(0, fall6);
      sign(g, 'TRIGONOMETRY', 1340, 400, { k: prog(t, T.trig3 - 0.55, T.trig3 - 0.05), flapK: prog(t, T.trig3 - 0.1, T.trig3 + 0.95), cells: 12, tw: 60, th: 92, t });
      const k1 = prog(t, T.trigonon - 0.1, T.trigonon + 0.35), k2 = prog(t, T.metron - 0.1, T.metron + 0.35);
      if (k1 > 0) { ticket(g, 'TRIGONON · TRIANGLE', 1470, 620, { size: 36, k: k1 }); this.miniTri(g, 1180, 620, k1); }
      if (k2 > 0) { ticket(g, 'METRON · MEASURE', 1440, 715, { size: 36, k: k2 }); this.miniTape(g, 1190, 715, k2); }
      const kc = prog(t, T.measuring5 - 0.1, T.triangles5 + 0.5);            // ghép: tam giác nhỏ + thước dán dọc đáy
      if (kc > 0) {
        const bx = 1330, by = 890, s = 0.5;
        brokenTriangle(g, bx, by, { deg: 40, s, k: kc });
        const L0 = 380 * s * outCubic(prog(t, T.measuring5, T.triangles5)), ox = bx, oy = by + 24;
        g.save(); g.translate(ox, oy); shade(g, () => { g.fillStyle = '#FFF0C2'; g.fillRect(0, 0, L0, 20); }); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(0, 0, L0, 20);
        for (let x = 10; x < L0; x += 10) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, x % 50 === 10 ? 12 : 6); g.stroke(); } g.restore();
      }
      g.restore();
    }
    // ── s6: một cạnh + hai góc → còn lại đã được quyết định ──
    const fall7 = 1100 * inC(prog(t, T.s[7] - 0.35, T.s[7] + 0.3)), tr = this.TRI;
    const k6 = prog(t, T.s[6] - 0.1, T.s[6] + 0.45);
    if (k6 > 0 && fall7 < 1100) {
      g.save(); g.translate(0, fall7);
      const b = 380 * tr.s, leg = b * this.tan40, Bx = tr.Ax + b, Cy = tr.Ay - leg;
      brokenTriangle(g, tr.Ax, tr.Ay, { deg: tr.deg, s: tr.s, k: k6 });
      // góc thứ hai (đỉnh trên): cung chanh vàng
      const ka = prog(t, T.angles6 - 0.05, T.angles6 + 0.5);
      if (ka > 0) { const a1 = Math.PI / 2 + (Math.PI / 2 - tr.deg * D2R) * ka; g.save(); g.fillStyle = 'rgba(242,182,50,0.28)'; g.beginPath(); g.moveTo(Bx, Cy); g.arc(Bx, Cy, 70, Math.PI / 2, a1); g.closePath(); g.fill();
        g.strokeStyle = C.ang; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(Bx, Cy, 70, Math.PI / 2, a1); g.stroke(); g.restore(); }
      // một cạnh: đáy được nhấn bằng ngoặc navy
      const kside = prog(t, T.side6 - 0.05, T.side6 + 0.4);
      if (kside > 0) { line(g, tr.Ax, tr.Ay + 34, lerp(tr.Ax, Bx, outCubic(kside)), tr.Ay + 34, C.ink, 5); ticket(g, 'ONE SIDE', (tr.Ax + Bx) / 2, tr.Ay + 100, { size: 34, k: kside }); }
      if (ka > 0) ticket(g, 'TWO ANGLES', Bx - 130, Cy - 80, { size: 34, color: C.angInk, edge: C.ang, k: ka });
      // còn lại: bóng đèn ấm dọc hai cạnh còn lại
      const kd = prog(t, T.decided6 - 0.1, T.decided6 + 0.6);
      if (kd > 0) {
        const hyp = [[tr.Ax, tr.Ay, Bx, Cy], [Bx, tr.Ay, Bx, Cy]];
        hyp.forEach(([x0, y0, x1, y1], j) => { for (let i = 1; i <= 7; i++) { const u = i / 8; if (u > kd + 0.05) continue; const on = 0.7 + 0.3 * Math.sin(t * 6 + i + j * 2);
          g.save(); g.shadowColor = 'rgba(255,190,70,0.95)'; g.shadowBlur = 16 * on; g.fillStyle = C.bulb; g.beginPath(); g.arc(lerp(x0, x1, u), lerp(y0, y1, u), 8, 0, TAU); g.fill(); g.restore(); } });
        ticket(g, 'THE REST: DECIDED', tr.Ax + b / 2 + 40, tr.Ay + 185, { size: 34, edge: C.bulb, k: kd });
      }
      g.restore();
    }
    // ── s7: mảnh đất cắt thành tam giác ──
    const k7 = prog(t, T.s[7] - 0.1, T.shape7 + 0.4);
    if (k7 > 0) {
      const P = this.POLY, kc = prog(t, T.cut7 - 0.1, T.cut7 + 1.2), kf = prog(t, T.cut7 + 0.8, T.measuring7);
      g.save(); g.translate((1 - outBack(k7, 1.2)) * 800, 0);
      g.beginPath(); P.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
      shade(g, () => { g.fillStyle = '#FFFDF7'; g.fill(); }); g.fillStyle = '#FFFDF7'; g.fill();
      for (let i = 1; i <= 4; i++) {
        if (kf > 0) { g.save(); g.globalAlpha = 0.55 * clamp(kf * 1.6 - (i - 1) * 0.25); g.fillStyle = CANDY[(i + 1) % CANDY.length]; g.beginPath(); g.moveTo(...P[0]); g.lineTo(...P[i]); g.lineTo(...P[i + 1]); g.closePath(); g.fill(); g.restore(); }
      }
      for (let i = 2; i <= 4; i++) { const u = clamp(kc * 3 - (i - 2)); if (u > 0) dashed(g, P[0][0], P[0][1], P[i][0], P[i][1], u, { w: 5, color: C.ink, dash: [10, 8] }); }
      g.strokeStyle = C.ink; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath(); P.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.stroke();
      g.restore();
      const ka = prog(t, T.anything7 - 0.1, T.anything7 + 0.4);
      if (ka > 0) ticket(g, 'ALMOST ANYTHING', 1500, 920, { size: 44, edge: C.ink, k: ka });
    }
    // ── mascot (pose-sky chưa đo miệng → chỉ nghe) quanh câu Mặt Trăng ──
    const kf = Math.min(prog(t, T.moon - 0.2, T.moon + 0.5), 1 - prog(t, T.measure2 + 0.2, T.measure2 + 0.7));
    if (kf > 0) figure(g, 'sky', 1700, H, 262, kf, { talk: false });
  }

  miniTri(g, x, y, k) { g.save(); g.translate(x, y); g.scale(clamp(k), clamp(k)); g.fillStyle = C.bad; g.beginPath(); g.moveTo(-34, 24); g.lineTo(34, 24); g.lineTo(34, -26); g.closePath(); g.fill(); g.strokeStyle = C.badDk; g.lineWidth = 4; g.stroke(); g.restore(); }
  miniTape(g, x, y, k) { g.save(); g.translate(x, y); g.scale(clamp(k), clamp(k)); g.fillStyle = '#FFF0C2'; g.fillRect(-36, -12, 72, 24); g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(-36, -12, 72, 24);
    for (let i = -30; i < 36; i += 10) { g.beginPath(); g.moveTo(i, -12); g.lineTo(i, i % 20 ? -4 : 2); g.stroke(); } g.restore(); }
}
