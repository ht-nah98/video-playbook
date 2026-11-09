// a0 · Cold open = TOÀN BỘ p1 (câu 0–10) — DNA ferris. Khung 0.5 s = THUMBNAIL đang chuyển động (PACKAGING §0b, §4).
// Ba nhóm khung, nối bằng DÂY CỜ QUÉT nội bộ (kit.buntingSweep, như trang làm giữa hai cảnh cùng ERA):
//  S1 (câu 0–5) hội chợ: máy bán vé (trái) + tam giác xám (phải) + vòng mờ phía sau
//   Ⓐ câu 0  thumbnail (sin(120°) · 0.866 · tam giác gãy) → tam giác tua ngược về 60° nguyên vẹn; phím gõ sin 1 2 0 °,
//            bảng lật theo phím, bóng đèn tắt rồi sáng lại 0.866 đúng "zero point eight six six".
//   Ⓑ câu 1  tam giác mở 60° → 90° (cạnh đứng + huyền vượt khỏi khung) → ở "one-hundred-and-twenty-degree" gãy ở góc
//            vuông; vé xám "NO RIGHT TRIANGLE HAS A 120° ANGLE".
//   Ⓒ câu 2  tam giác gãy thu về ô 1; máy lật sin(−30°) → −0.5, tam giác 2 lật úp rồi nứt; sin(1000°) → −0.985, tam giác 3
//            xoay 1000° rồi rã.
//   Ⓓ câu 3  biển hội chợ SOH-CAH-TOA thả xuống, bị gạch xám; tam giác rơi khỏi khung; vòng đu quay tiến lên, cabin hồng chạy
//            một vòng, dừng ở 120°: trục x/y, thanh hồng + bảng bóng đèn 0.866; máy lật lại sin(120°) · 0.866 (cùng số).
//   Ⓔ câu 4  máy rời trái, vòng sang trái rồi quay NGHIÊNG (side 1 → 0.1); bạt sọc buông; cabin quay đều, độ cao nối dây
//            đứt sang bạt = sóng sin chạy; loa / tia sáng / ổ điện cưỡi sóng (cảnh đẹp nhất, ~3 s).
//   Ⓕ câu 5  sóng dẹt thành đường chân trời; Hipparchus trong khung gương (IMAGINED); vé "MORE THAN 2,000 YEARS"; trời
//            ngả hoàng hôn, sao bật ở "sky"; tờ bài tập bị gạch xám ở "homework".
//  S2 (câu 6–9) lộ trình sao → vòng → sóng (chấm hồng đi theo lời); dây cờ thả 3 vé ①②③ úp; mỗi câu lật một vé:
//            ① họ tam giác 30° · ② máy bán vé sin(1000°) · ③ vòng + sóng; chú thích hai dòng dưới vé.
//  S3 (câu 10) núi · thuyền · Mặt Trăng; tia ngắm nét đứt từ bờ, "?"; camera NGỬA lên trời → khung cuối = kit.zenith()
//            (= khung đầu p2, DNA §6).
// Mascot pose-ponder nhỏ (262 px) góc dưới trái, NÓI suốt p1; vẽ sau cùng ở toạ độ màn hình (đi xuống cùng thế giới khi ngửa).
import { W, H, C, AR, TAU, D2R, clamp, hash, prog, lookup, must, outCubic, outBack, smooth, ground, sky, zenith, bunting, wheel, heroDot,
  ticketMachine, ticket, brokenTriangle, tarp, waveOnTarp, mirrorFrame, photoImages, strike, sign, star, icon, mountain, ship, moon,
  dashed, line, rr, text, fits, bulbDigits, bulbWidth, figure, buntingSweep, shade, SIN120, SINM30, SIN1000, SPIN, num } from '../kit.js';

const inC = u => u * u * u;
const bump = (t, a) => t < a ? 0 : t < a + 0.07 ? (t - a) / 0.07 : clamp(1 - (t - a - 0.07) / 0.2);
const lerp = (a, b, u) => a + (b - a) * u;

export default class Open {
  static ERA = 'fair';
  static IMAGES = photoImages('hipparchus');
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      type: w(0, 'type'), sine0: w(0, 'sine'), one0: w(0, 'one'), twenty0: w(0, 'twenty'), deg0: w(0, 'degrees'), answers0: w(0, 'answers'),
      zero0: w(0, 'zero'), six0: w(0, 'six', 2),
      l1: S(1), right1: w(1, 'right'), has1: w(1, 'has'), d120: w(1, 'one-hundred-and-twenty-degree'), not1: w(1, 'not'),
      l2: S(2), sine2: w(2, 'sine'), minus2: w(2, 'minus'), thirty2: w(2, 'thirty'), deg2: w(2, 'degrees'), minusb2: w(2, 'minus', 2), half2: w(2, 'half'),
      sineb2: w(2, 'sine', 2), thousand2: w(2, 'thousand'), degb2: w(2, 'degrees', 2), answers2: w(2, 'answers'), too2: w(2, 'too'),
      l3: S(3), soh3: w(3, 'soh'), toa3: w(3, 'toa'), they3: w(3, 'they'), single3: w(3, 'single'), point3: w(3, 'point'), running3: w(3, 'running'), circle3: w(3, 'circle'),
      l4: S(4), seen4: w(4, 'seen'), side4: w(4, 'side'), hiding4: w(4, 'hiding'), wave4: w(4, 'wave'), sound4: w(4, 'sound'), light4: w(4, 'light'), power4: w(4, 'power'),
      l5: S(5), two5: w(5, 'two'), thousand5: w(5, 'thousand'), tool5: w(5, 'tool'), sky5: w(5, 'sky'), homework5: w(5, 'homework'),
      l6: S(6), video6: w(6, 'video'), follow6: w(6, 'follow'), stars6: w(6, 'stars'), circle6: w(6, 'circle'), waves6: w(6, 'waves'), answer6: w(6, 'answer'), three6: w(6, 'three'), questions6: w(6, 'questions'),
      q: [w(7, 'one'), w(8, 'two'), w(9, 'three')], e: [E(7), E(8), E(9)],
      l10: S(10), begins10: w(10, 'begins'), problem10: w(10, 'problem'), older10: w(10, 'older'), measuring10: w(10, 'measuring'), something10: w(10, 'something'), you10: w(10, 'you'), reach10: w(10, 'reach'), end: E(10),
    };
    const T = this.T;
    this.START = S(0);
    this.FROM = -0.6;                                       // trang p1 có LEAD 0.6: khung 0 của video = cảnh này
    // dây cờ quét nội bộ: S1 → S2 (trước câu 6), S2 → S3 (sau câu 9)
    this.SW = [Math.max(E(5) + 0.15, S(6) - 0.55), Math.max(E(9) + 0.25, S(10) - 0.75)];
    this.TILT = [T.end - 0.05, T.end + 0.8];                // camera ngửa: khung cuối p1 = đỉnh trời (tail 1.0)
    // bảng lật: [lúc, chữ] — chữ theo phím được gõ
    this.FLAPS = [[-9, 'sin(120°)'], [T.type + 0.03, ''], [T.sine0, 'sin('], [T.one0, 'sin(1'], [T.twenty0, 'sin(12'], [T.twenty0 + 0.14, 'sin(120'], [T.deg0, 'sin(120°)'],
      [T.sine2, 'sin('], [T.minus2, 'sin(−'], [T.thirty2, 'sin(−3'], [T.thirty2 + 0.14, 'sin(−30'], [T.deg2, 'sin(−30°)'],
      [T.sineb2, 'sin('], [T.thousand2, 'sin(1'], [T.thousand2 + 0.1, 'sin(10'], [T.thousand2 + 0.2, 'sin(100'], [T.thousand2 + 0.3, 'sin(1000'], [T.degb2, 'sin(1000°)'],
      [T.circle3, 'sin(120°)']];
    this.KEYS = [[T.sine0, 'sin'], [T.one0, '1'], [T.twenty0, '2'], [T.twenty0 + 0.14, '0'], [T.deg0, '°'], [T.answers0, '='],
      [T.sine2, 'sin'], [T.minus2, '−'], [T.thirty2, '3'], [T.thirty2 + 0.14, '0'], [T.deg2, '°'], [T.minusb2 - 0.1, '='],
      [T.sineb2, 'sin'], [T.thousand2, '1'], [T.thousand2 + 0.1, '0'], [T.thousand2 + 0.2, '0'], [T.thousand2 + 0.3, '0'], [T.degb2, '°'], [T.answers2, '=']];
    // bóng đèn: [sáng từ, sáng xong, giá trị, tắt lúc] — giá trị chỉ đổi khi bóng đã tắt
    this.BULBS = [[-9, -8.9, num(SIN120), T.type], [T.zero0 - 0.05, T.six0 + 0.25, num(SIN120), T.sine2],
      [T.minusb2, T.half2 + 0.25, num(SINM30), T.sineb2], [T.answers2, T.too2 + 0.3, num(SIN1000), T.circle3 - 0.3], [T.circle3, T.circle3 + 0.45, num(SIN120), 1e9]];
    for (const [v, s] of [[SIN120, '0.866'], [SINM30, '\u22120.5'], [SIN1000, '\u22120.985']]) if (num(v) !== s) throw new Error(`a0: số trên máy ${num(v)} ≠ ${s}`);
    // vòng đu quay: quay nền SPIN → chạy một vòng tới 120° (+2π) ở "running…circle" → đứng → quay đều khi thành sóng
    this.RUN = [T.running3, T.circle3 + 0.35];
    this.THR = 0.5 + SPIN * this.RUN[0];
    this.THT = must(`${TAU} + 2 * Math.PI / 3`, TAU + 2 * Math.PI / 3);
    this.WAVE0 = T.side4 + 0.45;                            // bắt đầu quay đều (bạt đã buông)
    this.OMEGA = 3.2;                                       // rad/s khi vẽ sóng
    this.Y2000 = must('2 * 1000', 2000).toLocaleString('en-US');
    this.HORIZON = 780;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      ...[T.sine0, T.one0, T.twenty0, T.twenty0 + 0.14, T.deg0].map(t => c(t, 'chip')),   // chùm phím
      c(T.zero0, 'zap'), c(T.six0 + 0.1, 'shimmer'),
      c(T.d120 + 0.1, 'crack'),
      c(T.minus2, 'flap'), c(T.half2 + 0.15, 'snap'), c(T.too2 + 0.15, 'snap'),
      c(T.soh3, 'flap'), c(T.running3, 'tick'), c(T.circle3 + 0.05, 'shimmer'),
      c(T.side4, 'whoosh-long'), c(T.power4, 'zap'),
      c(T.two5 - 0.1, 'card'), c(T.homework5 + 0.25, 'pen'),
      c(this.SW[0], 'whoosh'), c(T.three6, 'card'),
      ...T.q.map(t => c(t, 'flap')),
      c(this.SW[1], 'whoosh'), c(this.TILT[0], 'whoosh-long'),
    ];
  }
  theta(t) {
    const [r0, r1] = this.RUN;
    if (t < r0) return 0.5 + SPIN * t;
    if (t < r1) return lerp(this.THR, this.THT, outCubic(prog(t, r0, r1)));
    if (t < this.WAVE0) return this.THT;
    return this.THT + this.OMEGA * (t - this.WAVE0);
  }
  machineState(t) {
    let i = 0; for (let j = 0; j < this.FLAPS.length; j++) if (t >= this.FLAPS[j][0]) i = j;
    const [ft, fs] = this.FLAPS[i], from = i ? this.FLAPS[i - 1][1] : fs;
    let b = this.BULBS[0]; for (const q of this.BULBS) if (t >= q[0]) b = q;
    const bulbK = Math.min(prog(t, b[0], b[1]), 1 - prog(t, b[3], b[3] + 0.25));
    let press = null; for (const [kt, key] of this.KEYS) { const v = bump(t, kt); if (v > 0) press = { key, k: v }; }
    return { line: fs, flapFrom: from, flapK: prog(t, ft, ft + 0.32), value: b[2], bulbK, press };
  }

  // ═══ S1: hội chợ (câu 0–5) ═══
  s1(g, t) {
    const T = this.T;
    const flat = smooth(prog(t, T.l5 - 0.75, T.l5 + 0.1)), dusk = 0.5 * smooth(prog(t, T.tool5 - 0.3, T.sky5 + 0.2));
    ground(g, 'fair');
    if (dusk > 0) { const gr = g.createLinearGradient(0, 0, 0, this.HORIZON); gr.addColorStop(0, `rgba(70,74,130,${dusk})`); gr.addColorStop(1, `rgba(240,170,170,${dusk * 0.5})`); g.fillStyle = gr; g.fillRect(0, 0, W, this.HORIZON); }
    // Ⓕ biển / đất dưới chân trời (sóng dẹt xuống thành chân trời)
    const kh = prog(t, T.l5 - 0.3, T.l5 + 0.4);
    if (kh > 0) {
      const hw = W / 2 * outCubic(kh) + 20;
      g.fillStyle = `rgba(169,211,227,${0.8 * kh})`; g.fillRect(0, this.HORIZON, W, 930 - this.HORIZON);
      line(g, W / 2 - hw, this.HORIZON, W / 2 + hw, this.HORIZON, C.ink, 3);
      for (let i = 0; i < 26; i++) { const sx = (hash(i * 3.7) * W), sy = this.HORIZON + 20 + hash(i * 5.3) * 130; line(g, sx, sy, sx + 40 + hash(i) * 50, sy, `rgba(255,255,255,${0.5 * kh})`, 2); }
      [[900, 150, 9], [1060, 210, 12], [1220, 170, 8], [1380, 240, 10], [1540, 160, 13], [1700, 220, 9], [1800, 130, 7], [760, 230, 7]]
        .forEach(([x, y, r], i) => star(g, x, y, r, prog(t, T.sky5 - 0.1 + i * 0.06, T.sky5 + 0.4 + i * 0.06)));
      const kc = prog(t, T.sky5 + 0.3, T.sky5 + 1.0);                  // chòm sao: nối dần
      if (kc > 0) { g.save(); g.strokeStyle = 'rgba(255,244,200,0.7)'; g.lineWidth = 2; g.setLineDash([4, 6]); g.beginPath();
        const P = [[1060, 210], [1220, 170], [1380, 240], [1540, 160]], m = (P.length - 1) * kc;
        g.moveTo(...P[0]); for (let i = 1; i <= Math.ceil(m); i++) { const f = Math.min(1, m - (i - 1)); g.lineTo(lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)); } g.stroke(); g.restore(); }
    }
    bunting(g, -20, 40, 1940, 50, 70, 26, 30, { t });
    // ── vòng đu quay ──
    const come = outCubic(prog(t, T.they3 + 0.15, T.single3 + 0.3)), left = smooth(prog(t, T.l4, T.seen4 + 0.1)), out = inC(prog(t, T.l5 - 0.75, T.l5 - 0.05));
    const side = 1 - 0.9 * smooth(prog(t, T.seen4, T.side4 + 0.4));
    const cx = lerp(lerp(1500, 1330, come), 430, left) - 900 * out, cy = lerp(470, 540, come), R = lerp(400, 300, come);
    const th = this.theta(t), hero = t >= T.point3;
    const Wh = wheel(g, cx, cy, R, { theta: th, hero, alpha: lerp(0.26, 1, come), side, groundY: 932, axes: clamp(prog(t, T.circle3, T.circle3 + 0.4) - prog(t, T.l4, T.l4 + 0.35)) || false });
    if (hero) {
      const fl = Math.exp(-Math.max(0, t - T.point3) * 3);
      g.save(); g.strokeStyle = `rgba(224,69,123,${0.8 * fl})`; g.lineWidth = 6; g.beginPath(); g.arc(Wh.P[0], Wh.P[1], 20 + 40 * (1 - fl), 0, TAU); g.stroke(); g.restore();
      heroDot(g, Wh.P[0], Wh.P[1]);
    }
    // Ⓓ thanh hồng (sin) + bảng bóng đèn 0.866 — cùng số của máy
    const kb = Math.min(prog(t, T.circle3 + 0.05, T.circle3 + 0.45), 1 - prog(t, T.l4 - 0.05, T.l4 + 0.3));
    if (kb > 0) {
      const [px, py] = Wh.P; line(g, px, cy, px, cy - (cy - py) * outCubic(kb), C.sin, 12);
      const p = 10, bw = bulbWidth(num(SIN120), p), x0 = px + 34, y0 = (py + cy) / 2 - 45;                  // bảng đèn bên phải thanh (trong vòng, nền navy)
      g.save(); g.globalAlpha = kb; g.fillStyle = '#1F2A44'; g.fill(rr(x0, y0, bw + 24, 7 * p + 24, 12)); g.restore();
      bulbDigits(g, num(SIN120), x0 + 12, y0 + 12, p, { k: kb });
      this.plate = [x0, y0 + 12 + 3.5 * p];
    } else this.plate = null;
    // ── bạt + sóng (Ⓔ) ──
    const kt = Math.min(prog(t, T.side4, T.side4 + 0.5), 1 - prog(t, T.l5 - 0.75, T.l5 - 0.2));
    const TP = { x0: 660, L: 1100, span: 2 * TAU }, A = 300 * (1 - flat), mid = lerp(cy, this.HORIZON, flat);
    if (kt > 0) { tarp(g, 620, 150, 1200, 780, { k: kt }); if (kt > 0.9) line(g, 640, cy, 1800, cy, 'rgba(35,50,74,0.6)', 3); }
    if (t >= this.WAVE0) {
      const rev = clamp((th - this.THT) / TP.span), fn = u => Math.sin(th - u);
      if ((kt > 0.95 || flat > 0) && flat < 1) {
        waveOnTarp(g, fn, rev, { ...TP, mid, A, w: 2 + 7 * (1 - flat) });
        if (out < 1) { const [px, py] = Wh.P; dashed(g, px + 14, py, TP.x0 - 8, mid - A * Math.sin(th), 1, { color: 'rgba(224,69,123,0.75)', w: 3.5 }); heroDot(g, TP.x0, mid - A * Math.sin(th), 9); }
        // loa / tia sáng / ổ điện cưỡi sóng
        [['speaker', 880, T.sound4, 'sound'], ['light', 1130, T.light4, 'light'], ['socket', 1380, T.power4, 'power']].forEach(([kind, x, at, word]) => {
          const k = Math.min(prog(t, at - 0.1, at + 0.35), 1 - prog(t, T.l5 - 0.8, T.l5 - 0.45));
          if (k <= 0) return;
          const y = mid - A * Math.sin(th - (x - TP.x0) / TP.L * TP.span) - 78;
          icon(g, kind, x, y, 50, k);
          ticket(g, word, x, y + 92, { size: 32, color: C.ink, edge: C.sin, k });
        });
      }
    }
    // ── máy bán vé ──
    const mx = 330 - 1100 * inC(prog(t, T.l4, T.seen4 + 0.2));
    const M = ticketMachine(g, mx, 92, 1, { ...this.machineState(t), cells: 10 });
    if (this.plate && M.bulbs) dashed(g, M.bulbs[0] + M.bulbs[2] + 30, M.bulbs[1] + M.bulbs[3] / 2, this.plate[0] - 8, this.plate[1], prog(t, T.circle3 + 0.15, T.circle3 + 0.55), { color: '#E59A2A', w: 4, dash: [6, 10] });
    // ── tam giác (Ⓐ–Ⓓ) ──
    const fall = 1100 * inC(prog(t, T.soh3, T.soh3 + 0.7));
    if (fall < 1100) {
      const mv = outCubic(prog(t, T.l2 - 0.35, T.l2 + 0.3));
      const rew = 1 - outCubic(prog(t, T.type + 0.2, T.type + 1.2));             // tua ngược thumbnail → 60°
      const open = smooth(prog(t, T.type + 1.2, T.has1 + 0.25)), snp = prog(t, T.d120, T.d120 + 0.55);
      const deg = lerp(60, 89.6, open), broke = t >= T.d120;
      const label = broke ? '120°' : t < T.type + 0.2 ? '120°' : `${Math.round(deg)}°`;
      brokenTriangle(g, lerp(1250, 1000, mv), lerp(800, 640, mv) + fall, { deg: broke || rew > 0 ? 60 : deg, snap: broke ? snp : rew, s: lerp(1, 0.5, mv), label });
      if (broke && snp < 1) { const f = 1 - snp; g.save(); g.fillStyle = `rgba(255,255,255,${0.7 * f})`; g.beginPath(); g.arc(lerp(1250 + 380, 1000 + 190, mv), lerp(800, 640, mv), 40 + 60 * snp, 0, TAU); g.fill(); g.restore(); }
      // tam giác 2 (−30°): lật úp ở "minus one half", nứt
      const k2 = prog(t, T.minus2 - 0.1, T.minus2 + 0.3);
      if (k2 > 0) brokenTriangle(g, 1290, 560 + fall, { deg: 30, flip: smooth(prog(t, T.minusb2, T.half2 + 0.05)), apart: 0.12 * prog(t, T.half2 + 0.1, T.half2 + 0.4), s: 0.5, k: k2, label: t >= T.half2 ? '−30°' : null });
      // tam giác 3 (1000°): xoay 1000° rồi rã
      const k3 = prog(t, T.thousand2 - 0.1, T.thousand2 + 0.3), sp = outCubic(prog(t, T.thousand2, T.answers2 + 0.3));
      if (k3 > 0) brokenTriangle(g, 1560, 640 + fall, { deg: 30, spin: -1000 * D2R * sp, apart: prog(t, T.too2 + 0.1, T.too2 + 0.7), s: 0.5, k: k3, label: t >= T.answers2 ? '1000°' : null });
    }
    // Ⓑ vé chú thích câu 1
    const kc = prog(t, T.not1 - 0.1, T.not1 + 0.3), dn = 260 * inC(prog(t, T.l2 - 0.4, T.l2));
    if (kc > 0 && dn < 260) { g.save(); g.translate(0, dn); ticket(g, 'NO RIGHT TRIANGLE HAS A 120° ANGLE', 1390, 978, { size: 36, color: C.badInk, edge: C.bad, k: kc }); g.restore(); }
    // Ⓓ biển SOH-CAH-TOA, gạch xám
    const sg = sign(g, 'SOH-CAH-TOA', 1380, 80, { k: prog(t, T.soh3 - 0.35, T.soh3 + 0.05), flapK: prog(t, T.soh3 - 0.15, T.toa3 + 0.1), lift: prog(t, T.single3, T.point3 + 0.3), tw: 60, th: 92, t });
    if (sg) strike(g, sg.flapX - 24, sg.y + 34 + 56, sg.flapX + sg.flapW + 24, sg.y + 34 + 36, prog(t, T.toa3 + 0.12, T.they3 + 0.2));
    // Ⓕ Hipparchus + 2,000 năm + bài tập bị gạch
    const kf = prog(t, T.two5 - 0.2, T.two5 + 0.6);
    if (kf > 0) mirrorFrame(g, 'hipparchus', 330, 100, 390, 440, { k: kf, rot: -0.03, label: 'HIPPARCHUS · c. 190–120 BC', note: 'IMAGINED · NO LIKENESS SURVIVES', zoom: 1 + 0.05 * prog(t, T.two5, T.l5 + 6), focus: [0.45, 0.25], t });
    ticket(g, `MORE THAN ${this.Y2000} YEARS`, 1300, 400, { size: 56, color: C.angInk, edge: C.ang, k: prog(t, T.thousand5 - 0.1, T.thousand5 + 0.3) });
    const khw = prog(t, T.homework5 - 0.25, T.homework5 + 0.15);
    if (khw > 0) {
      g.save(); g.translate(1460, 620); g.rotate(0.04); g.scale(outBack(khw), outBack(khw));
      shade(g, () => { g.fillStyle = C.white; g.fillRect(-180, -100, 360, 200); }, { box: [-180, -100, 360, 200, 0] });
      for (let i = 0; i < 6; i++) line(g, -160, -50 + i * 26, 160, -50 + i * 26, 'rgba(120,160,210,0.35)', 2);
      line(g, -130, -100, -130, 100, 'rgba(224,69,123,0.25)', 2);
      text(g, 'HOMEWORK', -110, -62, { font: `800 30px ${AR}`, color: C.dim });
      text(g, 'sin 30° = ?', -110, 30, { font: `700 48px ${AR}`, color: C.ink });
      g.restore();
      strike(g, 1270, 650, 1650, 590, prog(t, T.homework5 + 0.25, T.homework5 + 0.6));
    }
  }

  // ═══ S2: lộ trình + 3 vé (câu 6–9) ═══
  card(g, i, cx, top, t) {
    const T = this.T, tq = T.q[i], u = prog(t, tq, tq + 0.5), sx = Math.abs(Math.cos(Math.PI * u)), front = u >= 0.5, w = 340, h = 400;
    const swing = 0.025 * Math.sin(t * 1.3 + i * 1.7);
    g.save(); g.translate(cx, top); g.rotate(swing);
    line(g, 0, -26, 0, 6, C.rope, 3); g.fillStyle = '#C49C68'; g.fill(rr(-9, -34, 18, 34, 4));     // kẹp gỗ
    g.scale(Math.max(0.02, sx), 1);
    shade(g, () => { g.fillStyle = front ? C.white : CANDY_B[i]; g.fill(rr(-w / 2, 0, w, h, 22)); }, { col: 'rgba(60,60,80,0.25)', blur: 24, oy: 12, box: [-w / 2, 0, w, h, 22] });
    if (!front) {
      g.save(); g.clip(rr(-w / 2, 0, w, h, 22)); for (let j = -6; j < 10; j++) { g.fillStyle = 'rgba(255,255,255,0.25)'; g.beginPath(); g.moveTo(-w / 2 + j * 50, 0); g.lineTo(-w / 2 + j * 50 + 24, 0); g.lineTo(-w / 2 + j * 50 + 24 - h * 0.5, h); g.lineTo(-w / 2 + j * 50 - h * 0.5, h); g.closePath(); g.fill(); } g.restore();
      g.fillStyle = C.white; g.beginPath(); g.arc(0, h / 2, 82, 0, TAU); g.fill();
      text(g, String(i + 1), 0, h / 2 + 4, { font: `900 110px ${AR}`, color: C.ink, align: 'center', base: 'middle' });
    } else {
      g.strokeStyle = CANDY_B[i]; g.lineWidth = 8; g.stroke(rr(-w / 2 + 10, 10, w - 20, h - 20, 16));
      g.fillStyle = CANDY_B[i]; g.beginPath(); g.arc(-w / 2 + 44, 44, 26, 0, TAU); g.fill();
      text(g, String(i + 1), -w / 2 + 44, 46, { font: `900 34px ${AR}`, color: C.ink, align: 'center', base: 'middle' });
      const kp = prog(t, tq + 0.45, tq + 1.4);
      if (i === 0) [0.3, 0.45, 0.6].forEach((s, j) => brokenTriangle(g, -w / 2 + 34, h - 70, { deg: 30, s, k: prog(t, tq + 0.45 + j * 0.25, tq + 0.85 + j * 0.25), label: j === 2 ? '30°' : null }));
      else if (i === 1) ticketMachine(g, -90, 70, 0.3, { line: 'sin(1000°)', value: num(SIN1000), flapK: kp, flapFrom: '', bulbK: prog(t, tq + 1.0, tq + 1.5), cells: 10, k: 1, stub: false });
      else {
        const wc = -w / 2 + 100, wy = h / 2 + 10, th = t * 2.2;
        const Wh = wheel(g, wc, wy, 64, { theta: th, hero: true, legs: false, n: 8 });
        waveOnTarp(g, u2 => Math.sin(th - u2), kp, { x0: wc + 88, L: 130, mid: wy, A: 64, span: TAU });
        dashed(g, Wh.P[0] + 8, Wh.P[1], wc + 86, wy - 64 * Math.sin(th), 1, { color: 'rgba(224,69,123,0.75)', w: 3, dash: [6, 6] });
      }
    }
    g.restore();
    const CAP = [['ONE NUMBER', 'FOR EVERY ANGLE?'], ['SINE WITHOUT', 'A TRIANGLE?'], ['THE CIRCLE IN', 'EVERY WAVE?']][i], f = `800 36px ${AR}`;
    CAP.forEach((s, j) => { fits(g, s, f, 380, 'a0 caption'); text(g, s, cx, top + h + 64 + j * 46, { font: f, align: 'center', k: prog(t, tq + 0.35 + j * 0.5, tq + 0.95 + j * 0.6) }); });
  }
  s2(g, t) {
    const T = this.T;
    ground(g, 'fair');
    const up = 900 * inC(prog(t, T.answer6 - 0.1, T.three6 + 0.1));
    if (up < 900) {
      g.save(); g.translate(0, -up);
      // ba trạm (sao → vòng → sóng): đĩa trắng có sẵn từ đầu nhóm (ô chờ, §63), LẤP đúng chữ được đọc; chấm hồng nhảy dọc
      // đường nối, đậu trên đỉnh từng đĩa.
      const X = [480, 960, 1440], Y = 440, RD = 120, at = [T.stars6, T.circle6, T.waves6], s0 = this.SW[0] + 0.25;
      const kl = prog(t, T.follow6 - 0.2, T.waves6 + 0.2);                     // đường nối vẽ dần theo "follow … waves"
      if (kl > 0) { g.save(); g.setLineDash([3, 16]); g.lineCap = 'round'; g.strokeStyle = 'rgba(35,50,74,0.5)'; g.lineWidth = 6; g.beginPath(); g.moveTo(300, Y); g.lineTo(300 + 1320 * kl, Y); g.stroke(); g.restore(); }
      X.forEach((x, i) => {
        const kd = prog(t, s0 + i * 0.15, s0 + 0.45 + i * 0.15); if (kd <= 0) return;
        const e = outBack(kd, 1.6), full = prog(t, at[i] - 0.1, at[i] + 0.25);
        g.save(); g.translate(x, Y); g.scale(e, e);
        shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(0, 0, RD, 0, TAU); g.fill(); }, { box: [-RD, -RD, 2 * RD, 2 * RD, RD] });
        g.save(); g.setLineDash([10, 10]); g.strokeStyle = full > 0 ? C.ang : 'rgba(35,50,74,0.4)'; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, RD - 8, 0, TAU); g.stroke(); g.restore();
        g.save(); g.beginPath(); g.arc(0, 0, RD - 12, 0, TAU); g.clip();
        if (i === 0 && full > 0) {                                             // chòm sao nhỏ trên nền trời đêm
          g.fillStyle = `rgba(52,62,110,${0.9 * full})`; g.fillRect(-RD, -RD, 2 * RD, 2 * RD);
          const S = [[-62, 30], [-24, -34], [18, 6], [58, -42], [40, 52]];
          const kc = prog(t, at[0] + 0.15, at[0] + 0.9);
          if (kc > 0) { g.save(); g.setLineDash([4, 6]); g.strokeStyle = 'rgba(255,244,200,0.8)'; g.lineWidth = 2.5; g.beginPath(); const m = (S.length - 1) * kc;
            g.moveTo(...S[0]); for (let j = 1; j <= Math.ceil(m); j++) { const f = Math.min(1, m - (j - 1)); g.lineTo(lerp(S[j - 1][0], S[j][0], f), lerp(S[j - 1][1], S[j][1], f)); } g.stroke(); g.restore(); }
          S.forEach(([sx, sy], j) => star(g, sx, sy, j === 3 ? 15 : 10, prog(t, at[0] + j * 0.08, at[0] + 0.3 + j * 0.08)));
        }
        if (i === 1 && full > 0) { g.save(); g.scale(outBack(full), outBack(full)); wheel(g, 0, 0, 86, { theta: 0.5 + t * 0.9, legs: false, hero: true, n: 8 }); g.restore(); }
        if (i === 2 && full > 0) { line(g, -RD, 0, RD, 0, 'rgba(35,50,74,0.35)', 3); waveOnTarp(g, u => Math.sin(t * 3 - u), full, { x0: -RD + 14, L: 2 * RD - 28, mid: 0, A: 62, span: 2 * TAU, w: 8 }); }
        g.restore(); g.restore();
      });
      ['THE STARS', 'THE CIRCLE', 'THE WAVES'].forEach((s2, i) => ticket(g, s2, X[i], Y + RD + 70, { size: 40, k: prog(t, at[i], at[i] + 0.35) }));
      // chấm hồng: hiện ở "video", từ đầu đường nhảy tới đỉnh đĩa 1 ở "stars", rồi đĩa 2, đĩa 3
      const kd = prog(t, T.video6 - 0.2, T.video6 + 0.2);
      if (kd > 0) {
        const top = i => [X[i], Y - RD - 26], legs = [[[300, Y], top(0), T.follow6, at[0]], [top(0), top(1), at[0] + 0.15, at[1]], [top(1), top(2), at[1] + 0.15, at[2]]];
        let [px, py] = [300, Y];
        for (const [A, B, ta, tb] of legs) if (t >= ta) { const u = outCubic(prog(t, ta, tb)); px = lerp(A[0], B[0], u); py = lerp(A[1], B[1], u) - 70 * Math.sin(Math.PI * u); }
        g.save(); g.translate(px, py); g.scale(outBack(kd), outBack(kd)); heroDot(g, 0, 0, 16); g.restore();
      }
      g.restore();
    }
    // dây cờ + 3 vé
    const kr = prog(t, T.answer6, T.three6 + 0.2);
    if (kr > 0) {
      const P = bunting(g, -20, 150, 1940, 160, 40, 30, 22, { k: kr, t, seed: 2 });
      [560, 960, 1360].forEach((x, i) => {
        const k = prog(t, T.three6 + i * 0.12, T.questions6 + 0.3 + i * 0.12); if (k <= 0) return;
        const [, ry] = P((x + 20) / 1960), dy = -(1 - outBack(k, 1.4)) * 700;
        this.card(g, i, x, ry + 26 + dy, t);
      });
    }
  }

  // ═══ S3: cái không chạm được (câu 10) → ngửa lên trời ═══
  s3(g, t) {
    const T = this.T, pan = smooth(prog(t, ...this.TILT));
    if (pan >= 1) { zenith(g); return; }
    sky(g, { pan });
    g.save(); g.translate(0, Math.round(H * pan));
    g.fillStyle = '#A9D3E3'; g.fillRect(0, 760, W, 170);
    for (let i = 0; i < 30; i++) { const sx = (hash(i * 3.7) * W + t * 12 * (hash(i) + 0.5)) % W, sy = 772 + hash(i * 5.3) * 150; line(g, sx, sy, sx + 40 + hash(i) * 50, sy, 'rgba(255,255,255,0.55)', 2); }
    line(g, 0, 760, W, 760, 'rgba(35,50,74,0.5)', 2);
    mountain(g, 480, 760, 1.1, prog(t, T.begins10 - 0.1, T.begins10 + 0.4));
    ship(g, 1080, 800, 0.9, prog(t, T.problem10 - 0.1, T.problem10 + 0.4), t);
    moon(g, 1240, 210, 70, prog(t, T.older10 - 0.1, T.older10 + 0.4));
    const O = [330, 905], tg = [[436, 438, T.measuring10, 560, 400], [1080, 655, T.something10, 1170, 600], [1190, 262, T.you10, 1370, 250]];
    g.fillStyle = C.ink; g.beginPath(); g.arc(O[0], O[1], 8, 0, TAU); g.fill();
    tg.forEach(([x, y, at, lx, ly]) => { dashed(g, O[0], O[1], x, y, prog(t, at - 0.1, at + 0.4), { w: 4 });
      ticket(g, '?', lx, ly, { size: 46, k: prog(t, T.reach10 - 0.1, T.reach10 + 0.3) }); });
    g.restore();
  }

  render(g, t) {
    const [a, b] = this.SW, k1 = prog(t, a, a + 0.9), k2 = prog(t, b, b + 0.9);
    if (t < a) this.s1(g, t);
    else if (k1 < 1) buntingSweep(g, k1, () => this.s1(g, t), () => this.s2(g, t));
    else if (t < b) this.s2(g, t);
    else if (k2 < 1) buntingSweep(g, k2, () => this.s2(g, t), () => this.s3(g, t));
    else this.s3(g, t);
    // mascot: góc dưới trái, nói suốt p1; xuống cùng thế giới khi camera ngửa
    const pan = smooth(prog(t, ...this.TILT));
    if (pan < 1) { g.save(); g.translate(0, Math.round(H * pan)); figure(g, 'ponder', 170, H, 262, 1, { t }); g.restore(); }
  }
}
const CANDY_B = ['#F59AB5', '#8FD6C1', '#C7B3EE'];
