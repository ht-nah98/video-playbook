// b08 · Every angle has an answer (p2 câu 49–56) — DNA ferris, ERA fair. Vòng chính diện tâm (700,540) R 290; máy bán vé quay lại ở bên PHẢI
// (s 0.8, tại 1150,100 — a0 để máy bên trái vì vòng khi đó ở bên phải; ở đây vòng chiếm bên trái nên đổi chỗ, cùng ticketMachine).
//  49–50 cabin đi tiếp 40° → 120° (phím gõ sin 1 2 0 °, bóng đèn 0.866, dây nối từ thanh hồng sang máy)  51 "your calculator gave you"
//  52 quay NGƯỢC kim đồng hồ tới −30°: máy lật sin(−30°), thanh hồng xuống dưới trục, bóng đèn −0.5
//  53–54 quay hai vòng + 280° (cung chanh xoắn, vé "2 TURNS + 280°"), máy lật sin(1000°) → −0.985; mascot calculator
//  55 ba cái ghim: 1000°, −30°, 120° trên cùng một vòng; cabin quay nhiều vòng rồi đậu lại 120°; vé "JUST A POINT"
//  56 thẻ ② ("SINE WITHOUT A TRIANGLE?") lật mặt; tam giác nhỏ rơi khỏi khung; cabin sáng lên trên vòng
import { W, H, C, AR, TAU, D2R, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, heroDot, angleArc, ticketMachine, ticket,
  brokenTriangle, secTag, line, rr, shade, text, dashed, figure, num, SIN120, SINM30, SIN1000, TURNS1000, REST1000, CANDY } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const inC = u => u * u * u;
const CX = 700, CY = 540, R = 290, TH0 = 40 * D2R;
const bump = (t, a) => t < a ? 0 : t < a + 0.07 ? (t - a) / 0.07 : clamp(1 - (t - a - 0.07) / 0.2);
const easeSlow = u => 1 - Math.pow(1 - clamp(u), 2.2);

export default class EveryAngle {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b08');
    this.T = {
      keep: w(49, 'keep'),
      one50: w(50, 'one'), twenty50: w(50, 'twenty'), deg50: w(50, 'degrees'), its50: w(50, 'its'), zero50: w(50, 'zero'), six50: w(50, 'six', 2),
      number51: w(51, 'number'),
      l52: L(52).start, minus52: w(52, 'minus'), thirty52: w(52, 'thirty'), deg52: w(52, 'degrees'), clockwise: w(52, 'clockwise'), at52: w(52, 'at', 2), minusb52: w(52, 'minus', 2), half: w(52, 'half'),
      l53: L(53).start, thousand: w(53, 'thousand'), degrees53: w(53, 'degrees'), two53: w(53, 'two'), eighty: w(53, 'eighty'), more: w(53, 'more'),
      l54: L(54).start, lands: w(54, 'lands'), minus54: w(54, 'minus'), five: w(54, 'five'),
      l55: L(55).start, big: w(55, 'big'), negative: w(55, 'negative'), wind: w(55, 'wind'), every: w(55, 'every'), point55: w(55, 'point'), circle55: w(55, 'circle'),
      l56: L(56).start, second: w(56, 'second'), triangle: w(56, 'triangle'), finding: w(56, 'finding'), point56: w(56, 'point'), circle56: w(56, 'circle'),
      end: L(56).end,
    };
    const T = this.T;
    this.START = L(49).start;
    this.FROM = Math.max(this.START - 1.2, L(48).end + 0.5);
    for (const [v, s] of [[SIN120, '0.866'], [SINM30, '−0.5'], [SIN1000, '−0.985']]) if (num(v) !== s) throw new Error(`b08: số trên máy ${num(v)} ≠ ${s}`);
    this.TURNS = TURNS1000; this.REST = REST1000;
    must('2 * 360 + 280', 1000);
    this.FLAPS = [[-9, ''], [T.one50 - 0.11, 'sin('], [T.one50, 'sin(1'], [T.twenty50, 'sin(12'], [T.twenty50 + 0.14, 'sin(120'], [T.deg50, 'sin(120°)'],
      [T.minus52 - 0.09, 'sin('], [T.minus52, 'sin(−'], [T.thirty52, 'sin(−3'], [T.thirty52 + 0.14, 'sin(−30'], [T.deg52, 'sin(−30°)'],
      [T.thousand - 0.18, 'sin('], [T.thousand, 'sin(1'], [T.thousand + 0.1, 'sin(10'], [T.thousand + 0.2, 'sin(100'], [T.thousand + 0.3, 'sin(1000'], [T.degrees53, 'sin(1000°)']];
    this.KEYS = [[T.one50 - 0.11, 'sin'], [T.one50, '1'], [T.twenty50, '2'], [T.twenty50 + 0.14, '0'], [T.deg50, '°'], [T.its50, '='],
      [T.minus52 - 0.09, 'sin'], [T.minus52, '−'], [T.thirty52, '3'], [T.thirty52 + 0.14, '0'], [T.deg52, '°'], [T.at52, '='],
      [T.thousand - 0.18, 'sin'], [T.thousand, '1'], [T.thousand + 0.1, '0'], [T.thousand + 0.2, '0'], [T.thousand + 0.3, '0'], [T.degrees53, '°'], [T.minus54 - 0.3, '=']];
    this.BULBS = [[T.zero50 - 0.05, T.six50 + 0.25, num(SIN120), T.minus52 - 0.1], [T.minusb52, T.half + 0.25, num(SINM30), T.thousand - 0.2],
      [T.minus54, T.five + 0.25, num(SIN1000), 1e9]];
    this.A0 = [T.keep, T.deg50 + 0.02];            // 40° → 120°
    this.A1 = [T.minus52, T.clockwise + 0.4];      // 120° → −30°
    this.A2 = [T.thousand, T.more + 0.05];         // −30° → 1000°
    this.A3 = [T.wind, T.wind + 2.9];              // 1000° → 1560° (= 4 vòng + 120°)
    this.MX = 1150; this.MS = 0.8;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const keys = this.KEYS.filter(([, k]) => k !== '=').map(([t]) => c(t, 'chip'));
    return [c(this.FROM + 0.65, 'card'), ...keys, c(T.zero50, 'zap'), c(T.six50 + 0.15, 'shimmer'), c(T.minusb52 + 0.05, 'zap'), c(T.two53 + 0.1, 'tick'),
      c(T.minus54 + 0.05, 'zap'), c(T.wind + 0.1, 'tick'), c(T.point55 + 0.05, 'card'), c(T.second + 0.1, 'correct'), c(T.finding + 0.05, 'snap')];
  }
  A(t) {
    const T = this.T, [a0, a1] = this.A0, [b0, b1] = this.A1, [c0, c1] = this.A2, [d0, d1] = this.A3;
    if (t < a0) return TH0;
    if (t < b0) return lerp(TH0, 120 * D2R, smooth(prog(t, a0, a1)));
    if (t < c0) return lerp(120 * D2R, -30 * D2R, smooth(prog(t, b0, b1)));
    if (t < d0) return lerp(-30 * D2R, 1000 * D2R, easeSlow(prog(t, c0, c1)));
    return lerp(1000 * D2R, 1560 * D2R, smooth(prog(t, d0, d1)));
  }
  machineState(t) {
    let i = 0; for (let j = 0; j < this.FLAPS.length; j++) if (t >= this.FLAPS[j][0]) i = j;
    const [ft, fs] = this.FLAPS[i], from = i ? this.FLAPS[i - 1][1] : fs;
    let b = this.BULBS[0]; for (const q of this.BULBS) if (t >= q[0]) b = q;
    const bulbK = Math.min(prog(t, b[0], b[1]), 1 - prog(t, b[3], b[3] + 0.25));
    let press = null; for (const [kt, key] of this.KEYS) { const v = bump(t, kt); if (v > 0) press = { key, k: v }; }
    return { line: fs, flapFrom: from, flapK: prog(t, ft, ft + 0.32), value: b[2], bulbK, press };
  }
  card(g, t) {
    const T = this.T, cx = 250, top = 765, w = 280, h = 250, u = prog(t, T.second - 0.1, T.second + 0.5), sx = Math.abs(Math.cos(Math.PI * u)), front = u >= 0.5;
    const k = prog(t, this.T.l56 - 0.1, this.T.l56 + 0.4); if (k <= 0) return;
    g.save(); g.translate(cx, top + (1 - outCubic(k)) * 400); g.rotate(-0.02);
    g.translate(0, h / 2); g.scale(Math.max(0.02, sx), 1); g.translate(0, -h / 2);
    shade(g, () => { g.fillStyle = front ? C.white : '#8FD6C1'; g.fill(rr(-w / 2, 0, w, h, 22)); }, { col: 'rgba(60,60,80,0.25)', blur: 24, oy: 12 });
    if (!front) { g.fillStyle = C.white; g.beginPath(); g.arc(0, h / 2, 72, 0, TAU); g.fill(); text(g, '②', 0, h / 2 + 4, { font: `900 96px ${AR}`, align: 'center', base: 'middle' }); }
    else {
      g.strokeStyle = '#8FD6C1'; g.lineWidth = 8; g.stroke(rr(-w / 2 + 10, 10, w - 20, h - 20, 16));
      g.fillStyle = '#8FD6C1'; g.beginPath(); g.arc(-w / 2 + 44, 44, 26, 0, TAU); g.fill(); text(g, '②', -w / 2 + 44, 46, { font: `900 34px ${AR}`, align: 'center', base: 'middle' });
      text(g, 'SINE WITHOUT', 0, 130, { font: `800 32px ${AR}`, align: 'center' }); text(g, 'A TRIANGLE?', 0, 176, { font: `800 32px ${AR}`, align: 'center' });
      text(g, 'ANSWERED', 0, 222, { font: `800 28px ${AR}`, color: C.cosInk, align: 'center', k: prog(t, T.second + 0.4, T.second + 1.0) });
    }
    g.restore();
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'fair', { ground: false });
    secTag(g, 'Every angle has an answer', { k: prog(t, this.START, this.START + 0.4), t });
    const A = this.A(t), P = [CX + R * Math.cos(A), CY - R * Math.sin(A)];
    const chaseK = prog(t, T.finding, T.finding + 0.4);
    const Wh = wheel(g, CX, CY, R, { theta: A, hero: true, axes: true, groundY: 1000, bulbs: a => Math.max(0.5 + 0.5 * Math.sin(a * 4 - 3 * t) * (1 - chaseK), chaseK * (0.5 + 0.5 * Math.sin(a * 6 - 7 * t))) });
    const [px, py] = Wh.P;
    g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.arc(CX, CY, R + 2, 0, TAU); g.stroke(); g.restore();
    // cung góc (chanh, xoắn khi > 1 vòng) ẩn khi cabin quay nhiều vòng ở câu 55
    const kArc = 1 - prog(t, T.wind - 0.3, T.wind + 0.2) + prog(t, this.A3[1], this.A3[1] + 0.3);
    if (kArc > 0) { g.save(); g.globalAlpha *= clamp(kArc); angleArc(g, CX, CY, 74, t >= this.A3[1] ? A - 4 * TAU : A); g.restore(); }
    // ghim (55): 1000°, −30°, 120°
    const pin = (deg, k, lab, lx, ly, kl) => {
      if (k <= 0) return; const a = deg * D2R, x = CX + R * Math.cos(a), y = CY - R * Math.sin(a), e = outBack(clamp(k), 2.2);
      g.save(); g.translate(x, y); g.scale(e, e); g.fillStyle = C.white; g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 16, 0, TAU); g.fill(); g.stroke(); g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 6, 0, TAU); g.fill(); g.restore();
      ticket(g, lab, lx, ly, { size: 38, color: C.ink, edge: C.ang, k: kl });
    };
    const kb = prog(t, T.big, T.big + 0.3), kn = prog(t, T.negative, T.negative + 0.3), kr = prog(t, this.A3[1] - 0.4, this.A3[1]);
    pin(280, kb, '1000°', 860, 945, kb); pin(-30, kn, '−30°', 1030, 760, kn); pin(120, kr, '120°', 430, 250, kr);
    const kring = prog(t, T.every, T.every + 0.6) * (1 - prog(t, T.point55 + 0.6, T.point55 + 1.2));
    if (kring > 0) for (const d of [280, -30, 120]) { g.save(); g.strokeStyle = C.ink; g.globalAlpha = 0.6 * (1 - kring); g.lineWidth = 5; g.beginPath(); g.arc(CX + R * Math.cos(d * D2R), CY - R * Math.sin(d * D2R), 22 + 40 * kring, 0, TAU); g.stroke(); g.restore(); }
    // thanh cos (bạc hà) và sin (hồng)
    line(g, CX, CY, px, CY, C.cos, 12); line(g, px, CY, px, py, C.sin, 12);
    heroDot(g, px, py);
    if (t >= this.A3[1] && t < T.second + 1) { const f = Math.exp(-Math.max(0, t - this.A3[1]) * 3); g.save(); g.strokeStyle = `rgba(224,69,123,${0.8 * f})`; g.lineWidth = 6; g.beginPath(); g.arc(px, py, 20 + 40 * (1 - f), 0, TAU); g.stroke(); g.restore(); }
    // máy bán vé
    const kM = prog(t, this.FROM + 0.6, this.FROM + 1.2);
    const M = ticketMachine(g, this.MX, 100, this.MS, { ...this.machineState(t), cells: 10, k: kM });
    if (M.bulbs) {
      const link = (a, b) => { const k = prog(t, a, a + 0.4) * (1 - prog(t, b, b + 0.3)); if (k > 0) dashed(g, px + 16, py, M.bulbs[0] - 12, M.bulbs[1] + M.bulbs[3] / 2, k, { color: '#E59A2A', w: 4, dash: [6, 10] }); };
      link(T.number51 - 0.2, T.minus52 - 0.1); link(T.half + 0.1, T.thousand - 0.2); link(T.five + 0.1, 1e9);
    }
    // vé góc đang đếm (trái) + vé "2 TURNS + 280°"
    const lk = prog(t, T.deg50 - 0.2, T.deg50 + 0.2) * (1 - inC(prog(t, T.big - 0.3, T.big + 0.1)));
    if (lk > 0) ticket(g, `${num(Math.round(A / D2R))}°`, 215, 330, { size: 52, color: C.angInk, edge: C.ang, k: lk });
    const kt = prog(t, T.two53 - 0.1, T.two53 + 0.3), ot = inC(prog(t, T.lands, T.lands + 0.4)) * 700;
    if (kt > 0 && ot < 700) { g.save(); g.translate(ot, 0);
      const f = `800 46px ${AR}`, w0 = 0; void w0;
      ticket(g, `${this.TURNS} TURNS + ${this.REST}°`, 1390, 880, { size: 46, color: C.angInk, edge: C.ang, k: kt }); g.restore(); }
    // 55: JUST A POINT; 56: thẻ ②, tam giác nhỏ rơi
    const ep = inC(prog(t, T.l56 - 0.3, T.l56 + 0.2)) * 400;
    g.save(); g.translate(0, ep); ticket(g, 'JUST A POINT', 1390, 900, { size: 50, k: prog(t, T.point55 - 0.1, T.point55 + 0.3) }); g.restore();
    this.card(g, t);
    const tk = prog(t, T.triangle - 0.1, T.triangle + 0.3), fall = inC(prog(t, T.finding, T.finding + 0.6)) * 600;
    if (tk > 0 && fall < 600) brokenTriangle(g, 1290, 960 + fall, { deg: 37, s: 0.3, k: tk });
    // mascot calculator: 1000°
    const mk = Math.min(prog(t, T.l53 - 0.1, T.l53 + 0.5), 1 - prog(t, T.l55 - 0.6, T.l55 - 0.1));
    figure(g, 'calculator', 200, H, 270, mk, { t });
  }
}
