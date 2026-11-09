// b07 · The old sine is still inside (p2 câu 45–48) — DNA ferris, ERA fair. Cùng hình học vòng b06 (tâm 700,540, R 290), cabin giữ 40°.
//  45 vé "NOTHING BROKE?"  46 cabin quét trong góc phần tư 0–90° (cung chanh), rồi thả thanh hồng thẳng xuống trục
//  47 tam giác xám lồng trong vòng: cạnh huyền = nan = 1 (vé in dần "HYPOTENUSE = RADIUS = 1")
//  48 phân số opposite/hypotenuse = height/1; vé "OLD SINE = NEW SINE"
import { W, H, C, AR, CG, TAU, D2R, clamp, prog, lookup, outCubic, outBack, smooth, ground, wheel, heroDot, angleArc, ticket, secTag,
  line, rr, shade, text, measure, SPIN } from '../kit.js';

const inC = u => u * u * u;
const CX = 700, CY = 540, R = 290, TH = 40 * D2R;

function plate(g, runs, cx, cy, { size = 44, k = 1, edge = C.ink, h: hh = 0 } = {}) {
  const f = r => r.font || `800 ${size}px ${AR}`;
  const tw = runs.reduce((a, r) => a + measure(g, r.s, f(r)), 0), w = tw + 60, h = hh || Math.round(size * 1.6);
  if (k <= 0) return;
  const e = outBack(clamp(k), 2.2);
  g.save(); g.translate(cx, cy); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.fill(rr(-w / 2, -h / 2, w, h, 14)); });
  g.fillStyle = edge; g.fillRect(-w / 2 + 12, -h / 2 + 8, 5, h - 16); g.fillRect(w / 2 - 17, -h / 2 + 8, 5, h - 16);
  let x = -tw / 2; for (const r of runs) x += text(g, r.s, x, 1, { font: f(r), color: r.col || C.ink, base: 'middle', k: r.k ?? 1 });
  g.restore();
}
function frac(g, a, b, cx, cy, ca, cb, ka, kb, size = 36) {
  const f = `800 ${size}px ${AR}`, w = Math.max(measure(g, a, f), measure(g, b, f)) + 16;
  text(g, a, cx, cy - 12, { font: f, color: ca, align: 'center', k: ka });
  if (ka > 0 || kb > 0) line(g, cx - w / 2, cy, cx + w / 2, cy, C.ink, 4);
  text(g, b, cx, cy + size + 10, { font: f, color: cb, align: 'center', k: kb });
}

export default class OldSine {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b07');
    this.T = {
      nothing: w(45, 'nothing'),
      l46: L(46).start, between: w(46, 'between'), ninety: w(46, 'ninety'), drop: w(46, 'drop'), straight: w(46, 'straight'),
      l47: L(47).start, right: w(47, 'right'), hyp47: w(47, 'hypotenuse'), radius: w(47, 'radius'), one47: w(47, 'one'),
      l48: L(48).start, opposite: w(48, 'opposite'), hyp48: w(48, 'hypotenuse'), height: w(48, 'height'), one48: w(48, 'one'), old: w(48, 'old'), neu: w(48, 'new'), same: w(48, 'same'),
      end: L(48).end,
    };
    this.START = L(45).start;
    this.FROM = Math.max(this.START - 1.2, L(44).end + 0.5);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.nothing + 0.05, 'card'), c(T.drop + 0.06, 'tick'), c(T.right + 0.2, 'tick'), c(T.opposite + 0.05, 'card'), c(T.one48 + 0.2, 'tick'), c(T.same + 0.15, 'correct')];
  }
  theta(t) {
    const T = this.T;
    return TH + 45 * D2R * Math.sin(Math.PI * prog(t, T.between, T.drop - 0.05));
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'fair', { ground: false });
    secTag(g, 'The old sine is still inside', { k: prog(t, this.START, this.START + 0.4), t });
    const th = this.theta(t);
    const Wh = wheel(g, CX, CY, R, { theta: th, hero: true, axes: true, groundY: 1000, bulbs: a => 0.5 + 0.5 * Math.sin(a * 4 - 3 * t) });
    const [px, py] = Wh.P;
    g.save(); g.strokeStyle = C.ink; g.lineWidth = 6; g.beginPath(); g.arc(CX, CY, R + 2, 0, TAU); g.stroke(); g.restore();
    // 46: góc phần tư 0–90° (cung chanh) + cung góc
    const kq = prog(t, T.between - 0.1, T.between + 0.3) * (1 - prog(t, T.drop + 0.2, T.drop + 0.6));
    if (kq > 0) { g.save(); g.globalAlpha *= kq; g.lineCap = 'round'; g.lineWidth = 16; g.strokeStyle = C.ang; g.beginPath(); g.arc(CX, CY, R, 0, -Math.PI / 2, true); g.stroke(); g.restore(); }
    angleArc(g, CX, CY, 74, th);
    // 47: tam giác xám lồng trong vòng
    const kt = prog(t, T.right - 0.1, T.right + 0.5), pulse = a => t > a ? Math.exp(-(t - a) * 3.5) : 0;
    if (kt > 0) {
      g.save(); g.globalAlpha = 0.38 * kt; g.fillStyle = C.bad; g.beginPath(); g.moveTo(CX, CY); g.lineTo(px, CY); g.lineTo(px, py); g.closePath(); g.fill(); g.restore();
      g.save(); g.globalAlpha = kt; g.strokeStyle = C.badInk; g.lineWidth = 3; g.strokeRect(px - 30, CY - 30, 30, 30); g.restore();
    }
    const kh = prog(t, T.hyp47 - 0.05, T.hyp47 + 0.4);
    if (kh > 0) {                                                       // cạnh huyền = nan bán kính (xám thép)
      const w = 12 + 8 * (pulse(T.hyp47) + pulse(T.radius) + pulse(T.hyp48) + pulse(T.one48));
      line(g, CX, CY, CX + (px - CX) * kh, CY + (py - CY) * kh, C.badDk, w + 4, 'butt'); line(g, CX, CY, CX + (px - CX) * kh, CY + (py - CY) * kh, C.bad, w, 'butt');
    }
    // thanh bạc hà (cos) luôn có; thanh hồng thả xuống ở "drop"
    line(g, CX, CY, px, CY, C.cos, 12);
    const kd = outCubic(prog(t, T.drop, T.straight + 0.5));
    if (kd > 0) {
      g.save(); g.setLineDash([10, 10]); g.strokeStyle = C.ink; g.lineWidth = 3; g.globalAlpha = 0.7 * (1 - kd); g.beginPath(); g.moveTo(px, py); g.lineTo(px, CY); g.stroke(); g.restore();
      line(g, px, py, px, py + (CY - py) * kd, C.sin, 12 + 8 * (pulse(T.opposite) + pulse(T.height)));
    }
    heroDot(g, px, py);
    // vé
    const out = inC(prog(t, T.l46 - 0.2, T.l46 + 0.2)) * 400;
    g.save(); g.translate(0, -out); ticket(g, 'NOTHING BROKE?', 1390, 330, { size: 52, k: prog(t, T.nothing - 0.05, T.nothing + 0.3) }); g.restore();
    const ex = inC(prog(t, T.hyp48 - 0.2, T.hyp48 + 0.3)) * 700;
    if (ex < 700) { g.save(); g.translate(ex, 0);
    plate(g, [{ s: 'HYPOTENUSE', col: C.badInk, k: prog(t, T.hyp47, T.hyp47 + 0.6) }, { s: ' = RADIUS', k: prog(t, T.radius, T.radius + 0.5) }, { s: ' = 1', k: prog(t, T.one47, T.one47 + 0.2) }],
      1390, 330, { size: 38, edge: C.bad, k: prog(t, T.hyp47 - 0.1, T.hyp47 + 0.2) });
    g.restore(); }
    const kp = prog(t, T.opposite - 0.1, T.opposite + 0.25);
    if (kp > 0) {
      const e = outBack(clamp(kp), 2.2);
      g.save(); g.translate(1390, 520); g.scale(e, e);
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(-320, -90, 640, 190, 16)); });
      frac(g, 'opposite', 'hypotenuse', -200, -4, C.sinInk, C.badInk, prog(t, T.opposite, T.opposite + 0.6), prog(t, T.hyp48, T.hyp48 + 0.6));
      text(g, '=', -30, 28, { font: `800 56px ${AR}`, align: 'center', base: 'middle', k: prog(t, T.height - 0.2, T.height) });
      frac(g, 'height', '1', 160, -4, C.sinInk, C.ink, prog(t, T.height, T.height + 0.4), prog(t, T.one48, T.one48 + 0.2));
      g.restore();
    }
    plate(g, [{ s: 'OLD SINE', col: C.sinInk, k: prog(t, T.old, T.old + 0.4) }, { s: ' = ', k: prog(t, T.neu - 0.15, T.neu) }, { s: 'NEW SINE', col: C.sinInk, k: prog(t, T.neu, T.neu + 0.4) }],
      1390, 790, { size: 48, edge: C.sin, k: prog(t, T.old - 0.1, T.old + 0.2) });
  }
}
