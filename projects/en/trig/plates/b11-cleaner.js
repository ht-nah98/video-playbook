// b11 · "Cleaner formulas" (câu 67–70, ERA tent: bảng công thức). DNA ferris, nhóm G3.
//  67 cleaner formulas   bảng đồ thị rơi vào (sin vẽ dần, hồng) + vòng nhỏ quay, vé IN RADIANS
//  68 rate of change     tiếp tuyến trượt trên sóng sin; ĐỘ DỐC của nó vẽ thành sóng bạc hà (độ dốc đo bằng số, đúng là cos); vé → thẻ d/dθ sin θ = cos θ
//  69 only true in radians  bảng rời trái, thẻ lên trên (nhãn RADIANS); thẻ dưới "IN DEGREES": dấu "=" nứt, rồi hệ số π/180 trượt vào ô chờ
//  70 switch to radians   công tắc DEGREES → RADIANS trượt sang rồi khoá (thẻ độ rời đi)
import { W, H, C, AR, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, heroDot, ticket, secTag, line, text, measure, rr, shade,
  waveOnTarp, SPIN } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const GX = 160, KK = 128, Y1 = 345, Y2 = 735;                   // đồ thị: 1 rad = 128 px, biên độ 128 px (tỉ lệ 1 : 1 nên độ dốc nhìn ra đúng cos)
const BOARD = { x: 110, y: 190, w: 900, h: 725 };

export default class Cleaner {
  static ERA = 'tent';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b11');
    this.T = {
      formulas: w(67, 'formulas'), cleaner: w(67, 'cleaner'),
      rate: w(68, 'rate'), changes: w(68, 'changes'), cosine: w(68, 'cosine'), derivative: w(68, 'derivative'),
      but: w(69, 'but'), radians: w(69, 'radians'), degrees: w(69, 'degrees'), factor: w(69, 'factor'), pi: w(69, 'pi'), sneaks: w(69, 'sneaks'), formula: w(69, 'formula'),
      why: w(70, 'why'), math: w(70, 'mathematicians'), switch: w(70, 'switch'), stay: w(70, 'stay'), there: w(70, 'there'),
    };
    this.START = L(67).start;
    this.FROM = Math.max(this.START - 1.2, L(66).end + 0.5);
    this.END = L(70).end;
    this.SW0 = this.T.changes - 0.28;
    this.SWSPEED = 1.5;                                           // rad / s
    must('Math.round(Math.PI / 180 * 1e5) / 1e5', 0.01745);        // hệ số π/180 ≈ 0,01745 (chỉ viết dạng π/180 trên hình)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.85, 'card'), c(T.changes, 'tick'), c(T.derivative + 0.05, 'flap'), c(T.degrees + 0.1, 'snap'),
      c(T.pi + 0.15, 'card'), c(T.switch + 0.05, 'flap'), c(T.stay + 0.05, 'correct')];
  }
  // thẻ công thức: segs [[chữ, màu]] ; slot: chỗ chờ hệ số (px, 0 = không có). Trả về { x, y, w, h, slotX }
  card(g, segs, cx, cy, size, { k = 1, slot = 0 } = {}) {
    const font = `800 ${size}px ${AR}`, ws = segs.map(([s]) => measure(g, s, font));
    const tw = ws.reduce((a, b) => a + b, 0) + slot, w = tw + 70, h = Math.round(size * 1.75), x0 = cx - tw / 2;
    if (k <= 0) return { x: cx - w / 2, y: cy - h / 2, w, h, slotX: 0 };
    const e = outBack(clamp(k), 1.6);
    g.save(); g.translate(cx, cy); g.scale(e, e); g.translate(-cx, -cy);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(cx - w / 2, cy - h / 2, w, h, 16)); });
    g.fillStyle = C.ink; g.fillRect(cx - w / 2 + 12, cy - h / 2 + 10, 5, h - 20); g.fillRect(cx + w / 2 - 17, cy - h / 2 + 10, 5, h - 20);
    let x = x0, slotX = 0;
    segs.forEach(([s, col, mark], i) => {
      if (mark === 'slot') { slotX = x; x += slot; }
      text(g, s, x, cy + size * 0.34, { font, color: col }); x += ws[i];
    });
    g.restore();
    return { x: cx - w / 2, y: cy - h / 2, w, h, slotX, x0 };
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'tent');
    secTag(g, 'Cleaner formulas', { k: prog(t, S, S + 0.4), t });
    const bk = prog(t, this.FROM + 0.3, this.FROM + 0.95), bx = -1100 * inC(prog(t, T.but - 0.05, T.but + 0.45));
    if (bk > 0 && bx > -1090) this.board(g, t, bk, bx);

    // ── bên phải: vòng nhỏ (67) → vé rate / cosine (68) → thẻ d/dθ sin θ = cos θ ──
    const wk = outCubic(prog(t, this.FROM + 0.4, this.FROM + 1.0)), wOut = inC(prog(t, T.rate - 0.5, T.rate));
    if (wOut < 1) {
      g.save(); g.translate(900 * wOut, 0); wheel(g, 1450, 540 + (1 - wk) * 500, 200, { theta: 0.5 + SPIN * t * 6, hero: true, legs: false }); g.restore();
      ticket(g, 'IN RADIANS', 1450 + 900 * wOut, 300, { size: 52, color: C.angInk, edge: C.ang, k: prog(t, T.cleaner, T.cleaner + 0.35) });
    }
    const exitR = inC(prog(t, T.derivative - 0.15, T.derivative + 0.3));
    if (exitR < 1) {
      g.save(); g.translate(900 * exitR, 0);
      ticket(g, 'THE RATE OF CHANGE', 1450, 380, { size: 46, color: C.ink, edge: C.ink, k: prog(t, T.rate + 0.1, T.rate + 0.45) });
      ticket(g, 'IS COSINE', 1450, 520, { size: 52, color: C.cosInk, edge: C.cos, k: prog(t, T.cosine - 0.15, T.cosine + 0.2) });
      g.restore();
    }
    // thẻ radian: từ phải (68) lên giữa (69)
    const mv = smooth(prog(t, T.but + 0.1, T.but + 0.7)), kd = prog(t, T.derivative, T.derivative + 0.4);
    const seg1 = [['d/dθ ', C.ink], ['sin θ', C.sinInk], [' = ', C.ink], ['cos θ', C.cosInk]];
    const c1 = this.card(g, seg1, lerp(1450, 960, mv), lerp(540, 330, mv), 58, { k: kd });
    const kr = prog(t, T.radians - 0.1, T.radians + 0.3);
    if (kr > 0) ticket(g, 'ONLY IN RADIANS', 960, 215, { size: 44, color: C.angInk, edge: C.ang, k: kr * (1 - prog(t, T.math, T.math + 0.3)) });

    // 69 (khoảng giữa bảng rời đi và thẻ độ): vòng đu quay quay lại giữa khung dưới thẻ radian — nửa khung không bỏ trống
    const wk2 = prog(t, T.but + 0.35, T.but + 0.9) * (1 - prog(t, T.degrees - 0.15, T.degrees + 0.2));
    if (wk2 > 0) {
      g.save(); g.globalAlpha *= wk2; g.translate(0, (1 - outCubic(wk2)) * 220);
      wheel(g, 960, 660, 200, { theta: 0.5 + SPIN * t * 6, hero: true, legs: false });
      g.restore();
    }
    // ── thẻ độ (69) ──
    const kdeg = prog(t, T.degrees - 0.1, T.degrees + 0.4), degOut = inC(prog(t, T.switch - 0.05, T.switch + 0.45));
    if (kdeg > 0 && degOut < 1) {
      g.save(); g.translate(-1300 * degOut, 0);
      const fw = measure(g, 'π/180', `800 58px ${AR}`) + 36;
      const seg2 = [['d/dθ ', C.ink], ['sin θ°', C.sinInk], [' = ', C.ink], ['', C.ink, 'slot'], [' cos θ°', C.cosInk]];
      const c2 = this.card(g, seg2, 960, 600, 58, { k: kdeg, slot: fw });
      ticket(g, 'IN DEGREES', 960, 490, { size: 44, color: C.angInk, edge: C.ang, k: kdeg });
      const fk = outBack(clamp(prog(t, T.pi, T.pi + 0.5)), 1.5), sx = c2.slotX;
      // ô chờ nét đứt rồi hệ số trượt vào
      if (sx) {
        if (fk < 1) { g.save(); g.setLineDash([10, 8]); g.strokeStyle = C.dim; g.lineWidth = 3; g.stroke(rr(sx + 2, 600 - 40, fw - 4, 80, 12)); g.restore(); }
        const fx = lerp(sx + 900, sx, outCubic(clamp(prog(t, T.pi, T.pi + 0.5)))), alpha = prog(t, T.pi - 0.05, T.pi + 0.1);
        if (alpha > 0) { g.save(); g.globalAlpha = alpha; g.fillStyle = '#FFF3C4'; g.fill(rr(fx + 2, 600 - 40, fw - 4, 80, 12)); g.strokeStyle = C.ink; g.lineWidth = 5; g.stroke(rr(fx + 2, 600 - 40, fw - 4, 80, 12)); g.restore();
          text(g, 'π/180', fx + 18, 600 + 20, { font: `800 58px ${AR}`, color: C.ink }); }
        // dấu "=" nứt (nhãn điều kiện ở trên): zigzag xám cho tới khi hệ số vào
        const crk = prog(t, T.degrees, T.degrees + 0.3) * (1 - prog(t, T.pi + 0.3, T.pi + 0.6));
        if (crk > 0) { const ex = sx - measure(g, ' = ', `800 58px ${AR}`) / 2;
          g.save(); g.globalAlpha = crk; g.strokeStyle = C.badInk; g.lineWidth = 7; g.lineJoin = 'round'; g.lineCap = 'round'; g.beginPath();
          [[0, -62], [-10, -34], [12, -14], [-12, 8], [10, 30], [0, 62]].forEach(([dx, dy], i) => i ? g.lineTo(ex + dx, 600 + dy) : g.moveTo(ex + dx, 600 + dy)); g.stroke(); g.restore(); }
      }
      g.restore();
    }
    // ── công tắc (70) ──
    const sk = prog(t, T.math - 0.15, T.math + 0.3);
    if (sk > 0) this.toggle(g, 960, 830, sk, smooth(prog(t, T.switch, T.switch + 0.55)), prog(t, T.stay, T.stay + 0.3), t);
  }
  board(g, t, bk, bx) {
    const T = this.T, B = BOARD, dy = -(1 - outBack(clamp(bk), 1.2)) * 1000;
    g.save(); g.translate(bx, dy);
    // dây treo
    for (const sx of [B.x + 140, B.x + B.w - 140]) line(g, sx, -400, sx, B.y, C.rope, 3);
    shade(g, () => { g.fillStyle = '#FFFDF7'; g.fill(rr(B.x, B.y, B.w, B.h, 18)); }, { col: 'rgba(60,60,80,0.25)', blur: 28, oy: 12 });
    g.strokeStyle = C.steelDk; g.lineWidth = 5; g.stroke(rr(B.x + 8, B.y + 8, B.w - 16, B.h - 16, 14));
    const X = u => GX + KK * u;
    for (const my of [Y1, Y2]) {
      line(g, GX - 24, my, GX + KK * TAU + 30, my, 'rgba(35,50,74,0.45)', 3);
      for (const q of [0.5, 1, 1.5, 2]) line(g, X(q * Math.PI), my - 8, X(q * Math.PI), my + 8, 'rgba(35,50,74,0.55)', 3);
    }
    line(g, GX, Y1 - KK - 20, GX, Y1 + KK + 20, 'rgba(35,50,74,0.45)', 3); line(g, GX, Y2 - KK - 20, GX, Y2 + KK + 20, 'rgba(35,50,74,0.45)', 3);
    text(g, 'sin θ', B.x + 40, B.y + 62, { font: `800 40px ${AR}`, color: C.sinInk });
    // sin vẽ dần
    waveOnTarp(g, Math.sin, prog(t, T.formulas - 0.1, T.formulas + 0.9), { x0: GX, L: KK * TAU, mid: Y1, A: KK, span: TAU, w: 8 });
    // tiếp tuyến trượt
    const u = clamp((t - this.SW0) * this.SWSPEED, 0, TAU), ks = prog(t, this.SW0 - 0.1, this.SW0 + 0.2);
    if (ks > 0) {
      const px = X(u), py = Y1 - KK * Math.sin(u), h = 1e-4, slope = (Math.sin(u + h) - Math.sin(u - h)) / (2 * h);   // độ dốc đo số, không viết cos
      const len = 110, nx = 1 / Math.hypot(1, slope), ny = -slope / Math.hypot(1, slope);
      line(g, px - len * nx, py - len * ny, px + len * nx, py + len * ny, C.ink, 5);
      const qy = Y2 - KK * slope;
      g.save(); g.setLineDash([6, 9]); g.strokeStyle = 'rgba(35,50,74,0.4)'; g.lineWidth = 3; g.beginPath(); g.moveTo(px, py); g.lineTo(px, qy); g.stroke(); g.restore();
      waveOnTarp(g, Math.cos, u / TAU, { x0: GX, L: KK * TAU, mid: Y2, A: KK, span: TAU, color: C.cos, w: 8 });
      heroDot(g, px, py, 10);
      g.fillStyle = C.white; g.beginPath(); g.arc(px, qy, 12, 0, TAU); g.fill(); g.fillStyle = C.cos; g.beginPath(); g.arc(px, qy, 7, 0, TAU); g.fill();
      text(g, t < T.cosine ? 'THE SLOPE' : 'cos θ', B.x + 40, B.y + B.h - 28, { font: `800 38px ${AR}`, color: t < T.cosine ? C.dim : C.cosInk });
    }
    g.restore();
  }
  toggle(g, cx, cy, k, pos, lock, t) {
    const e = outBack(clamp(k), 1.5), w = 580, h = 92;
    g.save(); g.translate(cx, cy); g.scale(e, e);
    shade(g, () => { g.fillStyle = '#FFF7EA'; g.fill(rr(-w / 2, -h / 2, w, h, h / 2)); });
    g.strokeStyle = C.steelDk; g.lineWidth = 4; g.stroke(rr(-w / 2, -h / 2, w, h, h / 2));
    text(g, 'DEGREES', -w / 4, 2, { font: `800 38px ${AR}`, color: C.dim, align: 'center', base: 'middle' });
    text(g, 'RADIANS', w / 4, 2, { font: `800 38px ${AR}`, color: C.dim, align: 'center', base: 'middle' });
    const kx = lerp(-w / 4, w / 4, pos);
    g.fillStyle = C.ang; g.fill(rr(kx - 130, -h / 2 + 7, 260, h - 14, (h - 14) / 2));
    g.strokeStyle = lock > 0 ? C.ink : C.angInk; g.lineWidth = 3 + 3 * lock; g.stroke(rr(kx - 130, -h / 2 + 7, 260, h - 14, (h - 14) / 2));
    text(g, pos < 0.5 ? 'DEGREES' : 'RADIANS', kx, 2, { font: `900 38px ${AR}`, color: C.ink, align: 'center', base: 'middle' });
    if (lock > 0) for (const sx of [-1, 1]) { g.fillStyle = C.badDk; g.beginPath(); g.arc(kx + sx * 108, 0, 7 * lock, 0, TAU); g.fill(); }
    g.restore();
  }
}
