// h1 — ACT SIX mở hồi, "A coin is a machine" (p2 câu 110–118). Camera trôi ngang qua 4 trạm trong đêm (thế giới rộng 4W):
//   S1 (x 0)      câu 110–112  đồng xu bay theo cung Newton; 5 điều kiện đầu thắp lần lượt (lực búng, góc, xoay, độ cao,
//                              cú bắt) → "calculate the result": sương tan ở chỗ rơi, mặt H sáng vàng
//   S2 (x W)      câu 113–114  chân dung Diaconis (trái) + máy tung xu dạng sơ đồ dưới đèn spot phòng lab: 5 lần cùng một mặt
//   S3 (x 2W)     câu 115–116  mascot coin-flip búng thật (phải, ~7 s) → "≈ 51%" trong quầng đèn; 2023: 350,757 lần → 50.8%
//   S4 (x 3W)     câu 117–118  móc về mở bài: đèn của người xem 50% → 51% (số lăn), đồng xu vẫn y nguyên trong sương
// Biển tên mục và mascot vẽ theo toạ độ màn hình (sau lớp camera).
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, lantern, beam, fogBank, dashes, coin, figure,
  typed, text, label, arrow, hand, seg, ring, portrait, card, actTitle, fmt, must, lookup } from '../kit.js';

const THUMB = [0.138, 0.228];                            // đầu ngón cái trong khung coin-flip (đo ở a0)
// S1: cung bay (toạ độ trạm). x(u) tuyến tính, y(u) parabol — tất định, đúng là chuyển động ném xiên.
const A0 = [640, 860], A1 = [1720, 860], AH = 440;
const arcAt = u => [A0[0] + (A1[0] - A0[0]) * u, A0[1] - 4 * AH * u * (1 - u)];
// S2: máy tung xu
const MX = 1250, MTOP = 330, MBASE = 720;
// S4: đèn của người xem (như a0)
const LX = 250, LY = 900, NX = 430, NY = 520, CX4 = 1420, CY4 = 660;


// nền tối mềm sau nhãn nằm trên sương (tương phản ≥ 4.5:1 đo ở khung thật); k = tiến độ viết của nhãn
function backing(g, s, x, y, px, align, k) {
  s = s.slice(0, Math.round(s.length * clamp(k))); if (!s) return;                 // bám phần chữ đã viết
  g.save(); g.font = `500 ${px}px ${MONO}`; const w = g.measureText(s).width * 1.02, x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.fillStyle = 'rgba(7,11,20,0.62)'; g.shadowColor = 'rgba(7,11,20,0.62)'; g.shadowBlur = 22;
  g.beginPath(); g.roundRect(x0 - 16, y - px - 8, w + 32, px + 22, 12); g.fill(); g.restore();
}
export default class Machine {
  static ERA = 'night';
  static POSES = ['coin-flip'];
  static IMAGES = { diaconis: './assets/history/S_Holmes-P_Diaconis_(cropped).jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1');
    this.T = {
      question: w(110, 'question'), fasc: w(110, 'fascinating'), coin111: w(111, 'coin'), end110: L(110).end,
      flying: w(111, 'flying'), physical: w(111, 'physical'), newton: w(111, "newton's"), end111: L(111).end,
      force: w(112, 'force'), angle: w(112, 'angle'), spin: w(112, 'spin'), height: w(112, 'height'), hand: w(112, 'hand'),
      calc: w(112, 'calculate'), result: w(112, 'result'), nothing: w(112, 'nothing'), end112: L(112).end,
      persi: w(113, 'persi'), diaconis: w(113, 'diaconis'), math: w(113, 'mathematician'), once: w(113, 'once'), magician: w(113, 'magician'),
      showed: w(113, 'showed'), built: w(114, 'built'), machine: w(114, 'machine'), fixed: w(114, 'fixed'), gave: w(114, 'gave'),
      same: w(114, 'same'), every: w(114, 'every'), time: w(114, 'time'), end114: L(114).end,
      team: w(115, 'team'), showed2: w(115, 'showed'), flipped: w(115, 'flipped'), palm: w(115, 'palm'), face: w(115, 'face'),
      top: w(115, 'top'), f51: w(115, 'fifty-one'), end115: L(115).end,
      y2023: w(116, 'twenty-three'), three: w(116, 'three'), flips: w(116, 'flips'), found: w(116, 'found'), p8: w(116, 'fifty', 2),
      percent: w(116, 'percent'), almost: w(116, 'almost'), predicted: w(116, 'predicted'), end116: L(116).end,
      seen: w(117, 'seen'), which: w(117, 'which'), up: w(117, 'up'), not: w(117, 'not'), f51b: w(117, 'fifty-one'), end117: L(117).end,
      same2: w(118, 'same'), only: w(118, 'only'), changed: w(118, 'changed'), end: L(118).end,
    };
    const T = this.T;
    this.PAN = [T.end112 + 0.1, T.end114 + 0.1, T.end116 + 0.15];         // camera trôi sang trạm kế (1.1 s)
    this.FLIPS = [0, 1, 2, 3, 4].map(i => T.fixed + 0.25 + i * 0.6);       // 5 lần máy tung, cùng một mặt
    this.N = { flips: must('350757', 350757), p23: must('50.8', 50.8) };   // CONTENT: Bartoš và cs. 2023
    this.START = L(110).start;
    this.FROM = this.START - 2.6;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.question, kind: 'question' }, { t: T.flying, kind: 'coin' }, { t: T.force, kind: 'tick' }, { t: T.result, kind: 'pop' },
      { t: T.diaconis, kind: 'pop' }, { t: T.machine, kind: 'shimmer' }, { t: T.every, kind: 'pop' }, { t: T.flipped, kind: 'coin' },
      { t: T.f51, kind: 'tick' }, { t: T.three, kind: 'tick' }, { t: T.p8 + 0.25, kind: 'pop' }, { t: T.f51b, kind: 'tick' }];
  }
  camX(t) { return this.PAN.reduce((x, a) => x + W * smooth(prog(t, a, a + 1.1)), 0); }

  // ── S1: cung Newton ──
  s1(g, t) {
    const T = this.T;
    const push = 1 + 0.05 * smooth(prog(t, this.START, T.flying)) * (1 - smooth(prog(t, T.flying, T.flying + 1.2)));   // đẩy rồi lùi
    g.translate(96, 600); g.scale(push, push); g.translate(-96, -600);       // tâm ở mép chữ: chữ không lọt khỏi vùng an toàn
    const u = prog(t, T.flying, T.end111 - 0.4);                           // bay hết cung trong câu 111
    const known = [T.force, T.angle, T.spin, T.height, T.hand].map(a => prog(t, a - 0.05, a + 0.45));
    const solved = prog(t, T.result - 0.1, T.result + 0.9);
    // vệt bay đứt nét (vẽ dần theo đồng xu)
    if (u > 0) { g.save(); g.strokeStyle = 'rgba(237,230,214,0.45)'; g.lineWidth = 3; g.setLineDash([10, 14]); g.beginPath();
      for (let i = 0; i <= 60 * u; i++) { const [x, y] = arcAt(i / 60); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); }
    // sương ở chỗ rơi: kết quả chưa biết → tan khi đủ 5 điều kiện ("calculate the result")
    fogBank(g, A1[0] - 40, A1[1] - 40, 260, 200, t, { a: 1.25 * (1 - 0.85 * solved), seed: 4 });
    fogBank(g, 1180, 560, 520, 260, t, { a: 0.55, seed: 9 });
    // 5 điều kiện đầu, mỗi cái một chấm hổ phách (đã biết = sáng)
    const dot = (x, y, k) => { if (k <= 0) return; glow(g, x, y, 46, 'rgba(244,184,96,0.7)', k); g.save(); g.fillStyle = C.amber; g.globalAlpha = clamp(k * 2);
      g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); g.restore(); };
    if (known[0] > 0) { arrow(g, A0[0] - 40, A0[1] + 70, A0[0] + 30, A0[1] - 50, known[0], { color: C.amber, w: 4 });
      typed(g, 'FORCE OF THE FLICK', A0[0], 995, known[0] * 1.4, `500 22px ${MONO}`, C.amber, { align: 'center' }); dot(A0[0] - 40, A0[1] + 70, known[0]); }
    if (known[1] > 0) { const an = Math.atan2(arcAt(0.02)[1] - A0[1], arcAt(0.02)[0] - A0[0]);
      hand(g, seg(A0[0], A0[1], A0[0] + 170, A0[1], 10), { w: 3, color: 'rgba(244,184,96,0.8)', k: known[1] });
      g.save(); g.strokeStyle = C.amber; g.lineWidth = 3; g.beginPath(); g.arc(A0[0], A0[1], 90, an * known[1], 0); g.stroke(); g.restore();
      typed(g, 'ANGLE', A0[0] + 190, A0[1] - 20, known[1] * 1.4, `500 22px ${MONO}`, C.amber); }
    if (known[2] > 0) { const [sx, sy] = arcAt(0.3);
      g.save(); g.strokeStyle = C.amber; g.lineWidth = 3; g.beginPath(); g.arc(sx, sy, 58, -2.6, -2.6 + 4.6 * known[2]); g.stroke(); g.restore();
      typed(g, 'SPIN', sx - 70, sy - 40, known[2] * 1.4, `500 22px ${MONO}`, C.amber, { align: 'right' }); }
    if (known[3] > 0) { dashes(g, 1180, A0[1], 1180, A0[1] - AH, 'rgba(244,184,96,0.8)', { k: known[3] });
      typed(g, 'HEIGHT', 1200, 700, known[3] * 1.4, `500 22px ${MONO}`, C.amber); dot(1180, A0[1] - AH, known[3]); }
    if (known[4] > 0) { const P = Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * i / 12); return [A1[0] + Math.cos(a) * 70, A1[1] + 26 + Math.sin(a) * 26]; });
      hand(g, P, { w: 4, color: C.amber, k: known[4] });
      typed(g, 'THE CATCH', A1[0], 965, known[4] * 1.4, `500 22px ${MONO}`, C.amber, { align: 'center' }); }
    // đồng xu: nằm ở điểm búng → bay → rơi vào sương (mờ) → lộ mặt H vàng khi tính được
    if (u <= 0) {                                                          // câu 110: xu nhấc lên, xoay dần, sáng hơn ở "fascinating"
      const lift = outBack(prog(t, T.fasc - 0.1, T.fasc + 0.7)), dy = -60 * lift + 6 * Math.sin(t * 2.1) * lift;
      glow(g, A0[0], A0[1] + dy, 70 + 50 * lift, 'rgba(255,216,102,0.3)', 0.6 + 0.4 * lift);
      coin(g, A0[0], A0[1] - 4 + dy, 30 + 10 * lift, { spin: 1.2 + 0.15 * Math.sin(t * 1.3) + lift * (t - T.fasc) * 2.2, lit: 0.8 + 0.2 * lift }); }
    else if (u < 1) { const [x, y] = arcAt(u); glow(g, x, y, 70, 'rgba(255,216,102,0.3)'); coin(g, x, y, 30, { spin: u * 31 }); }
    else {
      if (solved > 0) glow(g, A1[0], A1[1], 140, 'rgba(255,216,102,0.5)', solved);
      coin(g, A1[0], A1[1] - 6, 30 + 14 * outBack(solved), { spin: (1 - solved) * 1.3, face: solved > 0.5 ? 'H' : null, lit: 0.35 + 0.65 * solved });
    }
    // chữ (dưới biển tên mục, trái)
    typed(g, 'A COIN', A0[0], 760, prog(t, T.coin111 - 0.1, T.coin111 + 0.3) * (1 - prog(t, T.flying, T.flying + 0.3)), `500 22px ${MONO}`, C.ivory, { align: 'center' });
    typed(g, 'Is the coin itself random?', 96, 300, prog(t, T.question - 0.2, T.question + 0.7), `italic 600 64px ${CG}`, C.ivory);
    typed(g, 'a physical object, obeying', 96, 372, prog(t, T.physical - 0.1, T.newton), `italic 500 46px ${CG}`, C.ivory);
    typed(g, "Newton's mechanics", 96, 428, prog(t, T.newton - 0.05, T.newton + 0.6), `italic 600 54px ${CG}`, C.ivory);
    typed(g, 'Know the start, and you can', 96, 520, prog(t, T.calc - 0.3, T.calc + 0.5), `italic 500 46px ${CG}`, C.ivory);
    typed(g, 'calculate the result.', 96, 576, prog(t, T.calc + 0.3, T.result + 0.5), `italic 600 54px ${CG}`, C.gold);
    typed(g, 'Nothing mysterious.', 96, 660, prog(t, T.nothing - 0.1, T.nothing + 0.8), `italic 600 54px ${CG}`, C.ivory);
  }

  // ── S2: Diaconis + máy tung xu dưới đèn spot ──
  s2(g, t) {
    const T = this.T;
    const kP = prog(t, T.persi - 0.2, T.persi + 0.7);
    portrait(g, 'diaconis', 'night', 130, 250, 420, kP, { label: { name: 'Persi Diaconis' } });
    typed(g, 'MATHEMATICIAN', 130, 782, prog(t, T.math, T.math + 0.6), `500 22px ${MONO}`, C.ivory);
    typed(g, 'once a professional magician', 130, 846, prog(t, T.once - 0.1, T.magician + 0.5), `italic 500 46px ${CG}`, C.ivory);
    // máy: khung vẽ dần từ "showed", đèn spot bật ở "machine" → sương quanh máy tan
    const kM = prog(t, T.showed, T.built + 0.6), spot = outCubic(prog(t, T.machine - 0.1, T.machine + 0.5));
    fogBank(g, MX, 620, 380, 300, t, { a: 1.15 * (1 - 0.85 * spot), seed: 21 });
    if (spot > 0) {
      beam(g, MX, 120, MX, 900, 34, 640, 0.34 * spot, { color: '236,228,210' });
      glow(g, MX, 840, 380, 'rgba(236,228,210,0.18)', spot);
    }
    // chao đèn spot (luôn có khi máy đã vẽ)
    if (kM > 0) { g.save(); g.globalAlpha = clamp(kM * 2); g.strokeStyle = '#2A2A30'; g.lineWidth = 4; g.beginPath(); g.moveTo(MX, 0); g.lineTo(MX, 70); g.stroke();
      g.fillStyle = '#26262C'; g.beginPath(); g.moveTo(MX - 60, 124); g.lineTo(MX + 60, 124); g.lineTo(MX + 28, 70); g.lineTo(MX - 28, 70); g.closePath(); g.fill();
      g.fillStyle = spot > 0.05 ? '#F4EEDF' : '#2A2A2A'; g.beginPath(); g.ellipse(MX, 124, 50, 7, 0, 0, 7); g.fill(); g.restore(); }
    const ink = 'rgba(237,230,214,0.9)', glass = 'rgba(142,162,184,0.7)';
    const box = (x0, y0, x1, y1, k, color, seed, w = 4) => { const P = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]].flatMap((p, i, a) => i ? seg(...a[i - 1], ...p, 8).slice(1) : [p]);
      hand(g, P, { w, color, k, seed }); };
    if (kM > 0) {
      g.save(); g.globalAlpha = clamp(kM * 3) * 0.85; g.fillStyle = '#141A26'; g.fillRect(MX - 200, MBASE, 400 * clamp(kM * 2), 150); g.restore();
      box(MX - 200, MBASE, MX + 200, MBASE + 150, clamp(kM * 1.6), ink, 31);                              // đế
      box(MX - 120, MTOP, MX + 120, MBASE, clamp(kM * 1.6 - 0.4), glass, 33, 3);                            // buồng kính
      const sp = clamp(kM * 2 - 0.8);                                                                     // lò xo + bệ phóng
      if (sp > 0) { const P = Array.from({ length: 11 }, (_, i) => [MX + (i % 2 ? 26 : -26) * (i && i < 10 ? 1 : 0), MBASE + 120 - i * 10]);
        hand(g, P, { w: 3, color: ink, k: sp, seed: 41 }); hand(g, seg(MX - 50, MBASE - 4, MX + 50, MBASE - 4, 6), { w: 5, color: ink, k: sp, seed: 43 }); }
      // hai núm chỉnh, kim khoá cứng ("fixed settings")
      const kd = clamp(kM * 2 - 1);
      [[MX - 140, MBASE + 64], [MX - 80, MBASE + 64]].forEach(([x, y], i) => { if (kd <= 0) return;
        ring(g, x, y, 20, 20, kd, { color: ink, w: 3, seed: 51 + i });
        const fx = prog(t, T.fixed - 0.1, T.fixed + 0.3); g.save(); g.strokeStyle = fx > 0 ? C.amber : ink; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y);
        const an = -1.1 + i * 0.7; g.lineTo(x + Math.cos(an) * 16, y + Math.sin(an) * 16); g.stroke(); g.restore(); });
      typed(g, 'FIXED SETTINGS', MX, MBASE + 192, prog(t, T.fixed, T.fixed + 0.5), `500 20px ${MONO}`, C.amber, { align: 'center' });
    }
    // 5 lần tung: xu bật lên trong buồng, rơi đúng mặt H; mỗi lần thêm một xu vào hàng kết quả
    if (kM > 0.5) {
      let y = MBASE - 18, sp = 1.35, done = 0;
      for (const f of this.FLIPS) { const u = prog(t, f, f + 0.5); if (u >= 1) done++; else if (u > 0) { y = MBASE - 18 - 330 * Math.sin(u * Math.PI); sp = 1.35 + u * Math.PI * 6 - 1.35 * u; } }
      if (y > MBASE - 30) sp = done ? 0.9 : 1.35;
      coin(g, MX, y, 26, { spin: sp, face: 'H', lit: 0.6 + 0.4 * spot });
      for (let i = 0; i < done; i++) { const k = outBack(prog(t, this.FLIPS[i] + 0.5, this.FLIPS[i] + 0.8)), x = MX - 160 + i * 80;
        glow(g, x, 970, 60, 'rgba(255,216,102,0.35)', k); coin(g, x, 970, 28 * k, { face: 'H' }); }
    }
    typed(g, 'same face, every single time', MX, 290, prog(t, T.same - 0.1, T.time + 0.4), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
  }

  // ── S3: tung tay (mascot ở toạ độ màn hình) → ≈ 51%; 2023 → 50.8% ──
  s3(g, t) {
    const T = this.T;
    typed(g, 'Flipped by hand, caught in the palm:', 96, 300, prog(t, T.flipped - 0.2, T.palm + 0.4), `italic 500 46px ${CG}`, C.ivory);
    const kc = [prog(t, T.face - 0.1, T.face + 0.4), prog(t, T.top - 0.1, T.top + 0.4)];
    if (kc[0] > 0) { coin(g, 170, 430, 44 * outBack(kc[0]), { face: 'H' }); label(g, 'STARTED', 170, 520, C.ivory, 'center', 20); }
    if (kc[1] > 0) { arrow(g, 236, 430, 380, 430, kc[1], { color: C.ivory, w: 3 }); coin(g, 450, 430, 44 * outBack(kc[1]), { face: 'H' }); label(g, 'LANDED', 450, 520, C.ivory, 'center', 20); }
    const k51 = prog(t, T.f51 - 0.05, T.f51 + 0.45);
    if (k51 > 0) {
      glow(g, 400, 760, 420, 'rgba(244,184,96,0.2)', k51);
      g.save(); const s = 0.7 + 0.3 * outBack(k51); g.translate(96, 830); g.scale(s, s); g.globalAlpha = clamp(k51 * 1.6);
      text(g, '≈ 51%', 0, 0, `600 300px ${CG}`, C.amber); g.restore();
      typed(g, 'SAME FACE AS IT STARTED', 106, 896, prog(t, T.f51 + 0.3, T.f51 + 1.1), `500 22px ${MONO}`, C.amber);
    }
    // 2023 (bên phải, sau khi mascot lặn)
    const RX = 1120;
    typed(g, '2023 · REAL FLIPS', RX, 300, prog(t, T.y2023 - 0.3, T.y2023 + 0.4), `500 26px ${MONO}`, C.ivory);
    const kn = prog(t, T.three - 0.05, T.flips + 0.2);
    if (kn > 0) { const n = Math.round(this.N.flips * outCubic(kn));
      text(g, fmt(n), RX, 410, `600 72px ${CG}`, C.ivory); typed(g, 'FLIPS', RX + 236, 410, prog(t, T.flips, T.flips + 0.3), `500 26px ${MONO}`, C.ivory); }
    typed(g, '50.8%', RX, 600, prog(t, T.p8, T.percent + 0.2), `600 140px ${CG}`, C.ivory);
    typed(g, 'SAME FACE AS IT STARTED', RX + 6, 650, prog(t, T.percent, T.percent + 0.8), `500 22px ${MONO}`, C.ivory);
    const ka = prog(t, T.almost - 0.1, T.almost + 0.8);
    if (ka > 0) { arrow(g, 820, 760, RX - 30, 560, ka, { color: C.gold, w: 4, bend: -60 });
      typed(g, 'almost exactly as predicted', RX, 760, prog(t, T.almost, T.predicted + 0.4), `italic 600 44px ${CG}`, C.gold); }
  }

  // ── S4: móc về mở bài — đèn người xem 50% → 51%, đồng xu y nguyên ──
  s4(g, t) {
    const T = this.T;
    const push = 1 + 0.03 * smooth(prog(t, T.end116, T.end));
    g.save(); g.translate(W * 0.5, H * 0.6); g.scale(push, push); g.translate(-W * 0.5, -H * 0.6);
    const reach = 0.35 + 0.3 * outCubic(prog(t, T.seen - 0.2, T.up + 0.4));
    beam(g, LX, LY - 40, CX4 - 40, CY4, 130, 520, 0.4, { reach });
    fogBank(g, CX4, CY4, 300, 220, t, { a: 1.2, seed: 61 });
    coin(g, CX4, CY4, 46, { spin: 1.2 + 0.1 * Math.sin(t * 0.9), lit: 0.45 });                       // kết quả vẫn trong sương
    lantern(g, LX, LY, 1.05, t, 1);
    backing(g, 'STARTED HEADS-UP', CX4, CY4 - 120, 24, 'center', prog(t, T.which - 0.1, T.up + 0.3));
    typed(g, 'STARTED HEADS-UP', CX4, CY4 - 120, prog(t, T.which - 0.1, T.up + 0.3), `500 24px ${MONO}`, C.amber, { align: 'center' });
    backing(g, 'THE SAME COIN', CX4, CY4 + 130, 24, 'center', prog(t, T.same2 - 0.1, T.same2 + 0.5));
    typed(g, 'THE SAME COIN', CX4, CY4 + 130, prog(t, T.same2 - 0.1, T.same2 + 0.5), `500 24px ${MONO}`, C.ivory, { align: 'center' });
    // số trong quầng đèn: 50% → 51% (chữ số hàng đơn vị lăn lên, như máy đếm)
    glow(g, NX, NY, 420, 'rgba(244,184,96,0.18)');
    const roll = outCubic(prog(t, T.f51b - 0.15, T.f51b + 0.35)), shake = Math.sin(t * 40) * 4 * prog(t, T.not, T.not + 0.2) * (1 - prog(t, T.not + 0.5, T.not + 0.8));
    g.save(); g.font = `600 300px ${CG}`; g.fillStyle = C.amber; g.textBaseline = 'alphabetic';
    const w5 = g.measureText('5').width, wd = Math.max(g.measureText('0').width, g.measureText('1').width), wp = g.measureText('%').width, x0 = NX - (w5 + wd + wp) / 2 + shake, y0 = NY + 80;
    g.fillText('5', x0, y0); g.fillText('%', x0 + w5 + wd, y0);
    g.beginPath(); g.rect(x0 + w5 - 4, y0 - 240, wd + 8, 300); g.clip();
    g.textAlign = 'center'; g.fillText('0', x0 + w5 + wd / 2, y0 - 260 * roll); g.fillText('1', x0 + w5 + wd / 2, y0 + 260 * (1 - roll)); g.restore();
    label(g, 'your lamp · what you know', NX, 680, C.amber, 'center');
    g.restore();
    typed(g, 'If you had seen the starting face…', 96, 300, prog(t, T.seen - 0.2, T.up + 0.3), `italic 500 46px ${CG}`, C.ivory);
    typed(g, 'Only the information changed.', CX4, 920, prog(t, T.only - 0.1, T.changed + 0.4), `italic 600 54px ${CG}`, C.amber, { align: 'center' });
  }

  render(g, t) {
    const T = this.T;
    sky(g, t, { fog: 1 });
    const cx = this.camX(t);
    const st = [this.s1, this.s2, this.s3, this.s4];
    st.forEach((f, i) => { const ox = i * W - cx; if (ox > -W && ox < W) { g.save(); g.translate(ox, 0); f.call(this, g, t); g.restore(); } });
    // mascot coin-flip (màn hình, trạm S3): trồi lên ở "showed", búng ở "flipped", bắt ở "palm", lặn sau "percent"
    const kF = prog(t, T.showed2 - 0.2, T.showed2 + 0.25) * (1 - prog(t, T.end115 - 0.3, T.end115 + 0.1));
    if (kF > 0) {
      const F = figure(g, 'coin-flip', 1650, H, 760, 'night', kF, { rim: 'left' });
      const th = [F.x + F.w * THUMB[0] + 6, F.y + F.h * THUMB[1] - 8], u = prog(t, T.flipped - 0.05, T.palm);
      if (u <= 0 || u >= 1) coin(g, th[0], th[1], 17, { spin: 1.25, face: 'H' });
      else { const y = th[1] - 400 * Math.sin(u * Math.PI); glow(g, th[0], y, 60, 'rgba(255,216,102,0.28)'); coin(g, th[0], y, 17, { spin: u * 31 }); }
    }
    card(g, 'night', prog(t, this.START, this.START + 1.5), 'ACT SIX · INFORMATION', 'A coin is a machine');
    actTitle(g, 'night', t, this.START, 'ACT SIX', 'Is the world random?');
  }
}
