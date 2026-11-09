// f3 · 天井の値段 (p2 câu 124–129) — ERA studio, mascot calculator (nói câu 127–128).
//  124 thanh 1→90 dựng tới 「90回」 = viên vàng + tem 天井 (bạc hà) · 125 ghim 「平均 ≈62回」 (MEAN 62.3, must) · 126 viên đá 160石 ·
//  127 160石 × 90回 = 14,400石 (must) · 128 ≈3万円 (CONTENT: 14,400創世結晶 ≈ 約3万円) · 129 viên vàng mở → ★5 ≠ 欲しかったキャラ.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, stamp, capsule, gem, glint, figure,
  rr, comma, MEDIAN, MEAN, HARD, CRYSTAL, CROWD } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 22, oy = 8, col = 'rgba(70,50,40,0.20)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const RX0 = 170, RX1 = 1370, RY = 330;                                // thanh 1…90
const rx = n => RX0 + (RX1 - RX0) * (n - 1) / (HARD - 1);

export default class Ceiling {
  static ERA = 'studio';
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      l124: L(124).start, tenjou: w(124, '天井'), n90: w(124, '90回'), ichiban: w(124, 'いちばん'), warui: w(124, '悪い'),
      l125: L(125).start, heikin: w(125, '平均'), n62: w(125, '62回'), star5: w(125, '★5'),
      l126: L(126).start, ishi: w(126, '石'), n160: w(126, '160個'),
      l127: L(127).start, n90b: w(127, '90回'), n14400: w(127, '14400個'), end127: L(127).end,
      l128: L(128).start, pack: w(128, 'パック'), n3man: w(128, '3万円'), end128: L(128).end,
      l129: L(129).start, star5b: w(129, '★5'), chara: w(129, 'キャラクター'), kagiri: w(129, '限りません'), end: L(129).end,
    };
    this.START = L(124).start;
    this.FROM = Math.max(this.START - 1.2, L(123).end + 0.5);
    must(`${MEDIAN}`, 76); must(`Math.round(${MEAN})`, 62);                // 62 = trung bình (CONTENT), 76 = trung vị (không lên hình ở đây)
    this.TOTAL = must(`${HARD} * ${CRYSTAL}`, 14400);
    this.MASCOT = [this.START, this.START];
    this.M0 = this.T.l127 + 0.4; this.M1 = this.T.end128 - 0.2;           // ≤ 8 s
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'tick'), c(T.n90, 'pop'), c(T.tenjou + 0.05, 'hanko'), c(T.ichiban, 'pen'), c(T.heikin, 'pen'), c(T.n62, 'tick'),
      c(T.l126, 'coin'), c(T.n160, 'pen'), c(T.n90b, 'tick'), c(T.n14400, 'soroban'), c(T.n14400 + 0.5, 'soroban'), c(T.pack, 'pen'),
      c(T.n3man, 'coin'), c(T.l129 + 0.1, 'pop'), c(T.star5b, 'shimmer'), c(T.chara, 'pen')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, e90 = Math.round(MEAN);
    ground(g, t);
    heading(g, 5, '天井の値段', prog(t, this.START + 0.1, this.START + 0.9));
    // ── hàng 1: thanh 1…90 ──
    const kr = outCubic(prog(t, F + 0.3, T.n90 + 0.2));
    shade(g, () => { g.fillStyle = '#E9E2D6'; g.fill(rr(RX0 - 20, RY - 15, (RX1 - RX0 + 40) * kr, 30, 15)); }, 12, 4);
    for (let n = 1; n <= HARD; n += 1) if (n % 10 === 0 || n === 1) { if (rx(n) > RX0 + (RX1 - RX0) * kr) continue; g.fillStyle = C.mute; g.fillRect(rx(n) - 1.5, RY + 22, 3, 14); }
    write(g, '1', RX0, RY + 70, kr, { font: `700 32px ${JP}`, color: '@dim', align: 'center' });
    const kg = prog(t, T.n90 - 0.1, T.n90 + 0.45);
    if (kg > 0) { capsule(g, RX1, RY - 6, 46, kg, { gold: true, ground: false, glow: 1 }); glint(g, RX1 + 40, RY - 50, 24, kg * Math.exp(-Math.max(0, t - T.n90) * 1.4)); }
    write(g, '90回', RX1, RY + 70, kg, { font: `700 34px ${JP}`, color: '@dim', align: 'center' });
    stamp(g, '天井', RX1 - 20, RY - 150, prog(t, T.tenjou - 0.05, T.tenjou + 0.4), { size: 56, rot: -0.07 });
    telop(g, 'いちばん運が悪いとき', 500, 245, prog(t, T.ichiban - 0.1, T.warui + 0.5), { size: 42 });
    // 125: ghim 62
    const kp = prog(t, T.heikin - 0.1, T.heikin + 0.5);
    if (kp > 0) {
      const x = rx(e90);
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.beginPath(); g.moveTo(x, RY - 12); g.lineTo(x, RY - 12 - 70 * outCubic(kp)); g.stroke();
      g.fillStyle = C.ink; g.beginPath(); g.arc(x, RY, 11, 0, TAU); g.fill(); g.restore();
      telop(g, [['平均 ≈ '], [`${e90}回`, `700 44px ${JP}`]], x, RY - 118, prog(t, T.heikin, T.n62 + 0.3), { size: 42 });
      const kk = prog(t, T.star5, T.star5 + 0.5); if (kk > 0) glint(g, x, RY - 4, 28 * kk, kk * Math.exp(-(t - T.star5) * 1.2));
    }
    // ── hàng 2: 160石 × 90回 = 14,400石 ──
    const row = 580;
    if (t > T.l126 - 0.4) {
      const k = prog(t, T.ishi - 0.3, T.n160 + 0.3);
      gem(g, 230, row - 14, 44, k);
      telop(g, [['1回 '], [`${CRYSTAL}石`, `700 48px ${JP}`, '@gem']], 520, row, k, { size: 44 });
    }
    telop(g, [['× '], [`${HARD}回`, `700 48px ${JP}`]], 880, row, prog(t, T.n90b - 0.1, T.n90b + 0.4), { size: 44 });
    if (t > T.n14400 - 0.3) {
      const kn = prog(t, T.n14400 - 0.1, T.n14400 + 0.9), n = Math.round(this.TOTAL * outCubic(kn));
      telop(g, [['＝ '], [`${comma(kn >= 1 ? must(`${this.TOTAL}`, 14400) : n)}石`, `700 54px ${JP}`, '@gem']], 1180, row, prog(t, T.n14400 - 0.15, T.n14400 + 0.3), { size: 48 });
    }
    // 128: ≈ 3万円
    const k3 = prog(t, T.pack - 0.2, T.n3man + 0.5);
    if (t > T.pack - 0.3) {
      write(g, 'いちばんお得なパックで買っても', 170, 760, prog(t, T.pack - 0.2, T.pack + 0.9), { font: `500 38px ${JP}`, color: '@dim' });
      write(g, [['≈ ', `700 110px ${JP}`], ['3万円', `700 150px ${MIN}`]], 170, 920, prog(t, T.n3man - 0.1, T.n3man + 0.6), { ls: 2 });
    }
    // 129: viên vàng mở → ★5 ≠ nhân vật muốn
    if (t > T.l129 - 0.2) {
      const kc = prog(t, T.l129, T.l129 + 0.5), op = prog(t, T.star5b, T.star5b + 0.6);
      capsule(g, 940, 880, 70, kc, { gold: true, ground: false, glow: 1, open: op, content: (gg, r) => { glint(gg, 0, -r * 0.2, r * 0.7, op); } });
      const kn = prog(t, T.chara - 0.2, T.chara + 0.5);
      write(g, '≠', 1090, 905, kn, { font: `700 90px ${JP}`, align: 'center' });
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(1190, 780, 190, 190, 28)); });
      write(g, '？', 1285, 905, kn, { font: `700 120px ${MIN}`, color: '@dim', align: 'center' });
      write(g, '欲しかった', 1285, 760, kn, { font: `700 34px ${JP}`, color: '@dim', align: 'center' });
    }
    // mascot calculator (nói câu 127–128)
    if (t > this.M0 - 0.1 && t < this.M1 + 0.8) { g.save(); g.translate(0, 560 * out(t, this.M1, 0.6)); figure(g, 'calculator', 1690, H, 460, prog(t, this.M0, this.M0 + 0.6), { t }); g.restore(); }
  }
}
