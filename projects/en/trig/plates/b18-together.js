// b18 · Putting it together (câu 103–105). Ba vé ①②③ của a0 (card() chép nguyên: vị trí 560/960/1360, hình trên mặt vé, màu kẹo)
// lật mặt theo từng câu, mỗi vé thêm CÂU TRẢ LỜI dưới câu hỏi cũ; nền = vòng đu quay mờ quay chậm.
import { W, H, C, AR, TAU, prog, lookup, clamp, outBack, outCubic, smooth, ground, wheel, heroDot, ticketMachine, brokenTriangle, waveOnTarp, bunting, secTag, dashed, text, fits, rr, shade, line, SIN1000, num, measure } from '../kit.js';
import { capLine, chase } from './_g4.js';

const CANDY_B = ['#F59AB5', '#8FD6C1', '#C7B3EE'];
const CAPQ = [['ONE NUMBER', 'FOR EVERY ANGLE?'], ['SINE WITHOUT', 'A TRIANGLE?'], ['THE CIRCLE IN', 'EVERY WAVE?']];
const CAPA = [['SIMILAR TRIANGLES', 'KEEP THEIR RATIOS'], ['SINE IS THE HEIGHT', 'OF A POINT', 'ON A CIRCLE'], ['A WAVE IS STEADY', 'TURNING, SEEN', 'FROM THE SIDE']];

export default class Together {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b18');
    this.START = L(103).start;
    this.FROM = Math.max(this.START - 1.2, L(102).end + 0.5);
    this.q = [L(103).start, L(104).start, L(105).start];
    this.a = [w(103, 'because'), w(104, 'because'), w(105, 'because')];
    this.T = { every: w(103, 'every'), calc: w(104, 'calculator'), wave: w(105, 'wave'), seen: w(105, 'seen'), side: w(105, 'side') };
    this.END = L(105).end;
  }
  sfx() {
    const q = this.q, a = this.a, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(q[0] + 0.3, 'flap'), c(q[1] + 0.4, 'flap'), c(a[1] + 0.2, 'pen'), c(q[2] + 0.3, 'flap'), c(this.T.seen, 'correct')];
  }
  card(g, i, cx, top, t) {
    const tq = this.q[i], u = prog(t, tq, tq + 0.5), sx = Math.abs(Math.cos(Math.PI * u)), front = u >= 0.5, w = 340, h = 400;
    const swing = 0.025 * Math.sin(t * 1.3 + i * 1.7);
    g.save(); g.translate(cx, top); g.rotate(swing);
    line(g, 0, -26, 0, 6, C.rope, 3); g.fillStyle = '#C49C68'; g.fill(rr(-9, -34, 18, 34, 4));
    g.scale(Math.max(0.02, sx), 1);
    shade(g, () => { g.fillStyle = front ? C.white : CANDY_B[i]; g.fill(rr(-w / 2, 0, w, h, 22)); }, { col: 'rgba(60,60,80,0.25)', blur: 24, oy: 12 });
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
    CAPQ[i].forEach((s, j) => capLine(g, s, cx, top + h + 56 + j * 38, { k: prog(t, tq + 0.35 + j * 0.3, tq + 0.8 + j * 0.3), color: C.dim, max: 30, weight: 700, tag: 'b18 Q' }));
    const ta = this.a[i];
    CAPA[i].forEach((s, j) => capLine(g, s, cx, top + h + 56 + 2 * 38 + 52 + j * 46, { k: prog(t, ta + j * 0.3, ta + 0.5 + j * 0.3), tag: 'b18 A' }));
    const kc = prog(t, ta + 0.2, ta + 0.5);
    if (kc > 0) { g.save(); g.translate(cx + 132, top + 44); g.scale(outBack(kc), outBack(kc)); g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 22, 0, TAU); g.fill(); g.strokeStyle = C.white; g.lineWidth = 5; g.lineCap = g.lineJoin = 'round'; g.beginPath(); g.moveTo(-9, 1); g.lineTo(-2, 8); g.lineTo(10, -8); g.stroke(); g.restore(); }
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'fair');
    wheel(g, 960, 520, 440, { theta: 0.5 + 0.105 * t, alpha: 0.26, groundY: 932, bulbs: chase(t) });
    secTag(g, 'Putting it together', { k: prog(t, this.START, this.START + 0.4), t });
    const kr = prog(t, this.FROM + 0.3, this.FROM + 1.1);
    const P = bunting(g, -20, 150, 1940, 160, 40, 30, 22, { k: kr, t, seed: 2 });
    [560, 960, 1360].forEach((x, i) => {
      const k = prog(t, this.FROM + 0.4 + i * 0.12, this.FROM + 1.2 + i * 0.12); if (k <= 0) return;
      const [, ry] = P((x + 20) / 1960), dy = -(1 - outBack(k, 1.4)) * 700;
      this.card(g, i, x, ry + 26 + dy, t);
    });
  }
}
