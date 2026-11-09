// g3 · 光が化学に変わる瞬間 (p2 câu 123–128) — ERA eye. Mắt nhỏ bên trái (ánh táo 650 nm tới võng mạc) + khung zoom tròn (tế bào võng mạc).
//  123 レチナール: phân tử chuỗi gấp khúc có MỘT chỗ gập · 124 photon tới chỗ gập → DUỖI THẲNG 「折れ曲がった形 → まっすぐ」「光が、化学に変わる瞬間」
//  125 桿体: retinal + vòng protein = ロドプシン (CHỈ ở que) · 126 ba tế bào NÓN, vòng protein ba dáng khác + chip 420/534/564
//  127 xung trung tính chạy qua các lớp tế bào → 視神経 → 脳 · 128 chùm dừng ở võng mạc 「光の旅は、網膜で終わる」「脳の中に、光はない」「あるのは、電気と化学の信号だけ」
// Chữ chỉ qua telop; màu có sắc chỉ qua ray / photon / chip (wl2rgb). Giờ lấy từ chữ (w / L).
import { CONES, lookup, must, clamp, prog, smooth, outCubic, outBack, ground, aperture, eye, ray, photon, spot, chip, ink, telop, title, arrow, cue, TAU } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const SMALL = { cx: 360, cy: 560, R: 200 }, WALL = 92;
const ZC = { x: 1260, y: 590, r: 300 };                           // khung zoom tròn
const CELL = { x0: 1000, x1: 1520, y0: 460, y1: 720 };            // tế bào que trong khung
const KINK = 4, NSEG = 8, SEG = 66, BEND = 0.95;
const PHOTON_NM = 650;                                            // ánh của táo (dài, 600–700)

/** Đầu người trung tính (nét xám): skull + cổ + vai. */
function head(g, cx, cy, r, k = 1) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = ink('@dim'); g.lineWidth = Math.max(4, r * 0.07); g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(cx - r * 0.38, cy + r * 0.93); g.lineTo(cx - r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx - r * 1.1, cy + r * 1.4, cx - r * 1.5, cy + r * 1.8);
  g.moveTo(cx + r * 0.38, cy + r * 0.93); g.lineTo(cx + r * 0.38, cy + r * 1.3); g.quadraticCurveTo(cx + r * 1.1, cy + r * 1.4, cx + r * 1.5, cy + r * 1.8); g.stroke();
  g.restore();
}
/** Chùm 3 tia từ lỗ qua giác mạc → thuỷ tinh thể → võng mạc (đã hội tụ đúng, thick 0.5) — cùng hình g2. */
function eyeRays(g, c, { nm = 'white', a = 0.8 } = {}) {
  const { cx, cy, R } = c;
  for (const o of [-0.2, 0, 0.2]) {
    const dy = o * R, ex = cx - 0.62 * R - Math.sqrt((0.46 * R) ** 2 - dy * dy), lx = cx - 0.66 * R, ly = cy + dy * 0.55, rx = cx + 0.97 * R;
    ray(g, [[WALL, cy], [ex, cy + dy], [lx, ly], [rx, cy]], { nm, w: 4, a, glow: 0.6 });
  }
}
/** Nhóm trượt ra (rời khung bằng chuyển động) — vẽ khi t ∈ [a, b + 0.5]. */
function slide(g, t, a, b, draw, dx = -1200) {
  if (t < a) return;
  const o = outCubic(clamp((t - b) / 0.5)); if (o >= 1) return;
  g.save(); g.globalAlpha = 1 - o; draw(); g.restore();
}
/** Chuỗi retinal: zigzag, từ đỉnh KINK trở đi quay lên theo bend (1 = gập, 0 = thẳng). Trả về các đỉnh. */
function retinalPts(x0, y0, bend, seg = SEG, kink = KINK) {
  const P = [[x0, y0]]; let x = x0, y = y0;
  for (let i = 0; i < NSEG; i++) { const a = (i % 2 ? 0.5 : -0.5) - (i >= kink ? bend * BEND : 0); x += Math.cos(a) * seg; y += Math.sin(a) * seg; P.push([x, y]); }
  return P;
}
function drawRetinal(g, P, k = 1, { w = 8, glow = 0 } = {}) {
  if (k <= 0) return;
  const n = Math.max(2, Math.ceil(P.length * clamp(k)));
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = ink('@ink'); g.lineWidth = w; g.beginPath(); P.slice(0, n).forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.stroke();
  g.fillStyle = ink('@dim'); for (const p of P.slice(0, n)) { g.beginPath(); g.arc(p[0], p[1], w * 0.85, 0, TAU); g.fill(); }
  const [hx, hy] = P[0], hr = 28;                                              // vòng 6 cạnh ở đầu chuỗi
  g.strokeStyle = ink('@ink'); g.lineWidth = w * 0.7; g.beginPath();
  for (let i = 0; i < 6; i++) { const a = TAU * i / 6 + 0.52; const px = hx - hr * 1.15 + Math.cos(a) * hr, py = hy + 10 + Math.sin(a) * hr; i ? g.lineTo(px, py) : g.moveTo(px, py); }
  g.closePath(); g.stroke();
  g.restore();
  if (glow > 0) spot(g, P[KINK][0], P[KINK][1], 70, { nm: 'white', a: 0.5 * glow });
}
/** Vòng protein quanh chuỗi: đường khép kín nhấp nhô (wob, ph khác nhau → ba dáng nón), vẽ dần theo k. */
function protein(g, cx, cy, rx, ry, wob, ph, k) {
  if (k <= 0) return;
  const N = 90, n = Math.max(2, Math.round(N * clamp(k)) + 1);
  const pt = i => { const th = TAU * i / N, r = 1 + wob * (0.6 * Math.sin(3 * th + ph) + 0.4 * Math.sin(5 * th + 2 * ph)); return [cx + rx * r * Math.cos(th), cy + ry * r * Math.sin(th)]; };
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = ink('@dim'); g.lineWidth = 6;
  g.beginPath(); for (let i = 0; i < n; i++) { const p = pt(i); i ? g.lineTo(...p) : g.moveTo(...p); }
  if (k >= 1) { g.closePath(); g.fillStyle = 'rgba(237,232,223,0.07)'; g.fill(); }
  g.stroke(); g.restore();
}

export default class Retinal {
  static ERA = 'eye';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g3-retinal');
    this.START = L(123).start;
    this.FROM = Math.max(this.START - 1.2, L(122).end + 0.5);
    this.T = {
      l123: L(123).start, rechi: w(123, 'レチナール'), chiisa: w(123, '小さな'),
      l124: L(124).start, oreta: w(124, '折れ曲がった'), photon: w(124, '光子'), ataru: w(124, '当たる'), massugu: w(124, 'まっすぐ'), kagaku: w(124, '化学'),
      l125: L(125).start, kantai: w(125, '桿体'), tanpaku125: w(125, 'タンパク質'), rodo: w(125, 'ロドプシン'),
      l126: L(126).start, suitai: w(126, '錐体'), tanpaku: w(126, 'タンパク質'),
      l127: L(127).start, rensa: w(127, '連鎖'), shingo: w(127, '信号'), shinkei: w(127, '視神経'), nou: w(127, '脳'),
      l128: L(128).start, moumaku: w(128, '網膜'), nou128: w(128, '脳'), denki: w(128, '電気'), end: L(128).end,
    };
    must(`'${CONES.S},${CONES.M},${CONES.L}'`, '420,534,564');
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.rechi, 'telop'),                         // 「レチナール」
      cue(T.ataru, 'step', -3),                      // photon chạm chỗ gập
      cue(T.ataru + 0.7, 'step', -3),                // duỗi thẳng
      cue(T.oreta, 'beam', -8),                     // 「折れ曲がった形 → まっすぐ」
      cue(T.kagaku, 'telop'),                        // 「光が、化学に変わる瞬間」
      cue(T.kantai, 'step', -4),                    // 「桿体：…＝ロドプシン」
      cue(T.rodo, 'telop'),                          // 「ロドプシン」
      cue(T.l126 + 0.3, 'step', -4),                    // 「組むタンパク質のちがい」
      cue(T.tanpaku + 1.0, 'step', -6), cue(T.tanpaku + 1.9, 'step', -6),   // chip 420 / 534 / 564 sáng lên
      cue(T.rensa, 'beam', -6),                         // 「連鎖反応」
      cue(T.shingo + 0.9, 'arrive', -6),             // xung 1
      cue(T.shinkei, 'wave', -10),                   // 「視神経」
      cue(T.nou + 0.2, 'arrive', -6),                // xung 2 tới đầu
      cue(T.moumaku, 'beam', -6),                       // 「光の旅は、網膜で終わる」
      cue(T.nou128, 'telop'),                        // 「脳の中に、光はない」
      cue(T.denki, 'step', -3),                         // 「あるのは、電気と化学の信号だけ」
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, c = SMALL;
    ground(g, 'eye');
    aperture(g, 'pupil', { y: c.cy, open: smooth(prog(t, F, F + 0.5)), glow: 0.8 });
    title(g, '光が化学に変わる瞬間', t, F + 0.3);

    // ── mắt nhỏ: ánh táo tới võng mạc; sang 128 chùm dừng ở võng mạc (tắt dần, võng mạc sáng) ──
    const ke = smooth(prog(t, F + 0.1, F + 0.9)), stop = smooth(prog(t, T.moumaku, T.moumaku + 1.4));
    const E = eye(g, c.cx, c.cy, c.R, { k: ke, thick: 0.5, lit: 0.6 + 0.4 * stop });
    eyeRays(g, c, { nm: PHOTON_NM, a: 0.85 * (1 - 0.7 * stop) * smooth(prog(t, F + 0.5, F + 1.4)) });
    const zk = outCubic(prog(t, F + 0.8, F + 1.8));                           // khung zoom nở ra từ điểm võng mạc
    const rp = [c.cx + 0.97 * c.R * Math.cos(-0.3), c.cy + 0.97 * c.R * Math.sin(-0.3)];
    const zr = ZC.r * zk;
    if (zk > 0) {
      g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 3;
      g.beginPath(); g.moveTo(rp[0], rp[1]); g.lineTo(lerp(rp[0], 1051, zk), lerp(rp[1], 375, zk)); g.moveTo(rp[0], rp[1]); g.lineTo(lerp(rp[0], 1051, zk), lerp(rp[1], 805, zk)); g.stroke();
      g.strokeStyle = ink('@ink'); g.lineWidth = 4; g.beginPath(); g.arc(rp[0], rp[1], 13, 0, TAU); g.stroke(); g.restore();
    }

    // ── bên trong khung zoom (cắt theo vòng tròn) ──
    const rodOut = outCubic(prog(t, T.l126 - 0.1, T.l126 + 0.6)), netIn = outCubic(prog(t, T.l127 - 0.1, T.l127 + 0.6));
    if (zk > 0) {
      g.save(); g.beginPath(); g.arc(ZC.x, ZC.y, zr, 0, TAU); g.fillStyle = 'rgba(20,19,23,0.94)'; g.fill(); g.clip();
      if (rodOut < 1) {                                           // ── tế bào que + retinal (123–125)
        g.save(); g.translate(-760 * rodOut, 0);
        const kc = outCubic(prog(t, T.l123, T.l123 + 0.8));
        g.strokeStyle = ink('@dim'); g.lineWidth = 5; g.beginPath(); g.roundRect(CELL.x0, CELL.y0, (CELL.x1 - CELL.x0) * kc, CELL.y1 - CELL.y0, 50); g.stroke();
        const bend = 1 - smooth(prog(t, T.ataru + 0.45, T.ataru + 1.75));
        const P = retinalPts(1050, 660, bend);
        drawRetinal(g, P, prog(t, T.rechi, T.rechi + 0.9), { glow: smooth(prog(t, T.ataru, T.ataru + 0.15)) * (1 - smooth(prog(t, T.ataru + 0.2, T.ataru + 1.0))) });
        const t0 = Math.max(T.photon - 0.2, T.ataru - 1.0), kp = prog(t, t0, T.ataru), kv = P[KINK];
        const kinkB = retinalPts(1050, 660, 1)[KINK];                           // chỗ gập ban đầu (photon nhắm vào đây)
        if (kp > 0 && kp < 1) photon(g, lerp(990, kinkB[0] - 30, outCubic(kp)), kinkB[1] - 6, PHOTON_NM, { size: 60, amp: 17, w: 5, phase: -t * 14, a: 1 - 0.3 * kp });
        protein(g, 1250, 590, 215, 118, 0.09, 0.6, prog(t, T.tanpaku125 - 0.1, T.tanpaku125 + 1.3));
        g.restore();
      }
      if (t >= T.l126 - 0.2 && netIn < 1) {                      // ── ba tế bào nón (126)
        g.save(); g.translate(760 * (1 - outCubic(prog(t, T.l126 - 0.1, T.l126 + 0.6))) - 760 * netIn, 0);
        [[CONES.S, 440, 0.0, 0.05], [CONES.M, 590, 1.7, 0.13], [CONES.L, 740, 3.4, 0.09]].forEach(([nm, y, ph, wob], i) => {
          const k0 = T.tanpaku + i * 0.5, kc = outCubic(prog(t, T.l126 + 0.2 + i * 0.25, T.l126 + 1.0 + i * 0.25));
          g.strokeStyle = ink('@dim'); g.lineWidth = 5; g.fillStyle = 'rgba(237,232,223,0.05)'; g.beginPath();
          g.moveTo(1010, y - 52 * kc); g.lineTo(1250, y - 18 * kc); g.lineTo(1330, y - 12 * kc); g.lineTo(1330, y + 12 * kc); g.lineTo(1250, y + 18 * kc); g.lineTo(1010, y + 52 * kc); g.closePath(); g.fill(); g.stroke();
          drawRetinal(g, retinalPts(1060, y, 0.5, 36, 3), kc, { w: 6 });
          protein(g, 1175, y, 140 + 12 * i, 40 + 3 * i, wob, ph, prog(t, k0, k0 + 1.0));
          arrow(g, [[1345, y], [1425, y]], prog(t, k0 + 0.6, k0 + 1.1), { color: '@dim', w: 4, head: 14 });
          chip(g, 1470, y, nm, 14, prog(t, k0 + 0.9, k0 + 1.4));
        });
        g.restore();
      }
      if (netIn > 0) this.network(g, t, 760 * (1 - netIn));
      g.restore();
      g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 4; g.beginPath(); g.arc(ZC.x, ZC.y, zr, 0, TAU); g.stroke(); g.restore();
    }

    // ── 視神経 → 脳 (ngoài khung) ──
    const kn = prog(t, T.shinkei - 0.1, T.shinkei + 0.7), kh = prog(t, T.nou - 0.2, T.nou + 0.7);
    if (kn > 0) arrow(g, [[1562, 590], [1654, 590]], kn, { color: '@dim', w: 6, head: 18 });
    head(g, 1715, 600, 55, kh);
    if (kh > 0) telop(g, '脳', 1715, 765, prog(t, T.nou, T.nou + 0.6), { size: 40, align: 'center' });
    telop(g, '視神経', 1610, 545, prog(t, T.shinkei, T.shinkei + 0.8), { size: 32, weight: 500, align: 'center' });

    // ═════ chữ: vùng A (trên trái, y 280) và B (dưới trái, y 870 / 945) ═════
    const A = (a, b, fn) => slide(g, t, a - 0.1, b, fn), out125 = T.l125 - 0.1, out126 = T.l126 - 0.1, out127 = T.l127 - 0.1, out128 = T.l128 - 0.1;
    A(T.rechi, out125, () => {
      telop(g, 'レチナール', 140, 292, prog(t, T.rechi, T.rechi + 0.8), { size: 60, mincho: true });
      telop(g, '小さな分子', 480, 292, prog(t, T.chiisa, T.chiisa + 0.8), { size: 40, color: '@dim' });
    });
    A(T.oreta, out125, () => {
      telop(g, '折れ曲がった形 → まっすぐ', 140, 872, prog(t, T.oreta, T.oreta + 1.2), { size: 44 });
      telop(g, '光が、化学に変わる瞬間', 140, 950, prog(t, T.kagaku - 0.2, T.kagaku + 1.0), { size: 52, mincho: true });
    });
    A(T.kantai, out126, () => {
      telop(g, 'ロドプシン', 140, 292, prog(t, T.rodo, T.rodo + 0.9), { size: 64, mincho: true });
      telop(g, '桿体：レチナール＋タンパク質＝ロドプシン', 140, 872, prog(t, T.kantai, T.kantai + 1.6), { size: 40 });
    });
    A(T.l126, out127, () => {
      telop(g, '組むタンパク質のちがいで、', 140, 872, prog(t, T.l126 + 0.2, T.l126 + 1.4), { size: 44 });
      telop(g, '反応する波長が決まる', 140, 950, prog(t, T.tanpaku + 0.8, T.tanpaku + 1.8), { size: 52, mincho: true });
    });
    A(T.rensa, out128, () => {
      telop(g, '連鎖反応', 140, 292, prog(t, T.rensa, T.rensa + 0.8), { size: 60, mincho: true });
    });
    telop(g, '光の旅は、網膜で終わる', 140, 292, prog(t, T.moumaku, T.moumaku + 1.2), { size: 56, mincho: true });
    telop(g, '脳の中に、光はない', 140, 872, prog(t, T.nou128, T.nou128 + 1.0), { size: 52, mincho: true });
    telop(g, 'あるのは、電気と化学の信号だけ', 140, 950, prog(t, T.denki, T.denki + 1.4), { size: 44 });
  }
  /** Lớp tế bào võng mạc: ba cột nút, xung trung tính chạy 視細胞 → 双極 → 神経節 → 視神経 → 脳. dx: độ lệch trượt vào. */
  network(g, t, dx) {
    const T = this.T;
    g.save(); g.translate(dx, 0);
    const cols = [[1100, [470, 550, 630, 710]], [1250, [510, 590, 670]], [1400, [500, 590, 680]]];
    g.strokeStyle = ink('@faint'); g.lineWidth = 3;
    for (let i = 0; i < 2; i++) for (const y0 of cols[i][1]) for (const y1 of cols[i + 1][1]) { g.beginPath(); g.moveTo(cols[i][0], y0); g.lineTo(cols[i + 1][0], y1); g.stroke(); }
    for (const y of cols[2][1]) { g.beginPath(); g.moveTo(1400, y); g.lineTo(1562, 590); g.stroke(); }
    const path = [[1100, 550], [1250, 590], [1400, 590], [1562, 590], [1654, 590]];
    const seglen = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1])), tot = seglen.reduce((a, b) => a + b, 0), cell = tot - seglen[3];
    const at = d => { let r = d; for (let i = 0; i < seglen.length; i++) { if (r <= seglen[i]) { const u = r / seglen[i]; return [lerp(path[i][0], path[i + 1][0], u), lerp(path[i][1], path[i + 1][1], u)]; } r -= seglen[i]; } return path[4]; };
    const pulses = [];
    if (t >= T.shingo) for (let i = 0; i < 2; i++) { const s = (((t - T.shingo) / 2.6 + i * 0.5) % 1) * tot; if (!(s > cell && prog(t, T.shinkei - 0.1, T.shinkei + 0.7) < 1)) pulses.push(s); }
    for (const [x, ys] of cols) for (const y of ys) {
      const hit = pulses.some(s => { const p = at(s); return Math.hypot(p[0] - x, p[1] - y) < 26; });
      g.fillStyle = hit ? ink('@ink') : '#141317'; g.strokeStyle = ink('@dim'); g.lineWidth = 4; g.beginPath(); g.arc(x, y, 19, 0, TAU); g.fill(); g.stroke();
    }
    for (const s of pulses) { const p = at(s); g.fillStyle = ink('@light'); g.beginPath(); g.arc(p[0], p[1], 11, 0, TAU); g.fill(); }
    g.restore();
    const kl = prog(t, T.l127 + 0.7, T.l127 + 1.5);
    if (kl > 0) telop(g, '網膜の細胞', ZC.x, 948, kl, { size: 36, align: 'center' });
  }
}
