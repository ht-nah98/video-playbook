// b05 · ACT THREE "Stuck below ninety" · Where the triangle runs out (p2 câu 32–39) — DNA ferris, ERA fair.
//  32 tam giác xám bật vào, mở rộng tới khi chạm mép khung ("a limit you hit very quickly")
//  33 cung đo 0° → 90° (hai vé 0°, 90°); tam giác quét hết khoảng đó
//  34 ba câu hỏi lên vé: sin 120°, sin(−30°), sin 1000° ("bigger than a full turn")
//  35 thanh xám gạch ba vé ("don't make sense") rồi vé trượt đi; tam giác mở tới 120° và GÃY; vé "NO RIGHT TRIANGLE…"
//  36 biển hội chợ TRIGONOMETRY thả xuống ("what trigonometry was made for")
//  37 tam giác rã rời rơi khỏi khung; vòng đu quay tiến lên, cabin chạy qua 90° KHÔNG dừng (vạch 90° nét đứt, vé góc đếm số);
//     con lắc + chong chóng ("swings or spins")
//  38 cung 0°–90° vàng, ba phần tư còn lại bị thanh xám phủ ("far too weak")
//  39 xám lui đi, cả vòng sáng chanh + đèn viền chạy ("every angle"); vé "A CIRCLE"
// Mascot ponder (ACT THREE) góc dưới trái, nói suốt cảnh.
import { W, H, C, AR, TAU, D2R, clamp, prog, lookup, outCubic, outBack, smooth, ground, wheel, heroDot, ticket, sign, secTag, actTitle,
  brokenTriangle, strike, angleArc, line, rr, shade, text, figure, CANDY } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const inC = u => u * u * u;

export default class RunsOut {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b05');
    this.T = {
      limit: w(32, 'limit'), quickly: w(32, 'quickly'),
      l33: L(33).start, between: w(33, 'between'), zero: w(33, 'zero'), ninety: w(33, 'ninety'),
      l34: L(34).start, one34: w(34, 'one'), minus34: w(34, 'minus'), bigger34: w(34, 'bigger'),
      l35: L(35).start, dont: w(35, "don't"), there: w(35, 'there'), no35: w(35, 'no'), d120: w(35, 'one-hundred-and-twenty-degree'),
      l36: L(36).start, triangles: w(36, 'triangles'), trig: w(36, 'trigonometry'),
      l37: L(37).start, world: w(37, 'world'), wheel: w(37, 'wheel'), ninety37: w(37, 'ninety'), swings: w(37, 'swings'), spins: w(37, 'spins'),
      l38: L(38).start, zero38: w(38, 'zero'), weak: w(38, 'weak'),
      l39: L(39).start, every39: w(39, 'every'), all39: w(39, 'all'), circle39: w(39, 'circle'),
    };
    this.START = L(32).start;
    this.FROM = Math.max(this.START - 2.6, L(31).end + 0.5);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 1.5, 'flap'), c(T.limit + 0.05, 'tick'), c(T.zero + 0.05, 'card'), c(T.one34 + 0.1, 'card'), c(T.bigger34 + 0.1, 'card'),
      c(T.dont + 0.05, 'snap'), c(T.d120 + 0.12, 'crack'), c(T.trig + 0.05, 'flap'), c(T.wheel + 0.05, 'tick'), c(T.swings + 0.1, 'tick'),
      c(T.weak, 'snap'), c(T.every39 + 0.15, 'shimmer')];
  }
  // góc tam giác (độ) theo lời
  deg(t) {
    const T = this.T;
    if (t < T.limit) return 37 + 2 * Math.sin(t * 2);
    if (t < T.l33) return lerp(37, 85, smooth(prog(t, T.limit, T.quickly + 0.4)));
    if (t < T.between) return lerp(85, 37, smooth(prog(t, T.l33, T.l33 + 0.8)));
    if (t < T.zero) return lerp(37, 8, smooth(prog(t, T.between, T.zero)));
    if (t < T.l34) return lerp(8, 88, smooth(prog(t, T.zero, T.ninety + 0.1)));
    if (t < T.no35) return lerp(88, 37, smooth(prog(t, T.l34, T.l34 + 0.8)));
    return lerp(37, 89.6, smooth(prog(t, T.no35, T.d120 - 0.05)));
  }
  // góc vòng đu quay (rad): chạy qua 90° đúng lúc đọc "ninety"
  theta(t) {
    const T = this.T, om = 1.2, th = Math.PI / 2 + om * (t - T.ninety37);
    return t < T.wheel ? Math.PI / 2 - om * (T.ninety37 - T.wheel) + SPIN_BG * (t - T.wheel) : th;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'fair');
    actTitle(g, t, this.START, 'ACT THREE', 'Stuck below ninety');
    secTag(g, 'Where the triangle runs out', { k: prog(t, this.START, this.START + 0.4), t });

    // ── vòng đu quay: nền mờ → tiến lên ──
    const come = outCubic(prog(t, T.world, T.world + 2.2));
    const wx = lerp(1500, 1250, come), wy = lerp(470, 540, come), WR = lerp(400, 300, come), th = this.theta(t);
    const chase = prog(t, T.every39, T.every39 + 0.3);
    const Wh = wheel(g, wx, wy, WR, { theta: th, hero: t >= T.world, alpha: lerp(0.26, 1, come), groundY: 932,
      bulbs: chase > 0 ? (a => chase * (0.5 + 0.5 * Math.sin(a * 6 - 5 * t))) : null });
    const sc = WR / 300;
    if (t >= T.wheel + 0.1 && t < T.l38) {                                 // góc (chanh) + vạch 90° nét đứt: cabin chạy QUA 90°
      const kk = prog(t, T.wheel + 0.1, T.wheel + 0.4) * (1 - prog(t, T.l38 - 0.3, T.l38));
      g.save(); g.globalAlpha *= kk; angleArc(g, wx, wy, 64 * sc, th); g.restore();
      const k90 = prog(t, T.ninety37 - 0.4, T.ninety37) * (1 - prog(t, T.ninety37 + 1.2, T.ninety37 + 1.8));
      if (k90 > 0) { g.save(); g.setLineDash([12, 12]); g.strokeStyle = C.ang; g.lineWidth = 5; g.globalAlpha *= k90; g.beginPath(); g.moveTo(wx, wy); g.lineTo(wx, wy - WR - 30); g.stroke(); g.restore(); }
    }
    if (t >= T.world) { heroDot(g, Wh.P[0], Wh.P[1]); }
    // 38: cung 0°–90° vàng, ba phần tư còn lại xám phủ
    const kq = prog(t, T.zero38, T.zero38 + 0.5), kgrow = outCubic(prog(t, T.weak - 0.2, T.weak + 0.5)), kret = prog(t, T.every39 - 0.05, T.every39 + 0.4);
    if (kq > 0 && t < T.every39 + 0.6) {
      g.save(); g.lineCap = 'round'; g.lineWidth = 16; g.strokeStyle = C.ang; g.beginPath(); g.arc(wx, wy, WR, 0, -Math.PI / 2 * kq, true); g.stroke();
      const len = 1.5 * Math.PI * kgrow * (1 - kret);
      if (len > 0.01) { g.strokeStyle = C.bad; g.globalAlpha = 0.9; g.beginPath(); g.arc(wx, wy, WR, -Math.PI / 2, -Math.PI / 2 - len, true); g.stroke(); }
      g.restore();
    }
    const kf = prog(t, T.every39, T.all39 + 0.6);                         // 39: cả vòng sáng chanh
    if (kf > 0) { g.save(); g.lineCap = 'round'; g.lineWidth = 12; g.strokeStyle = C.ang; g.beginPath(); g.arc(wx, wy, WR, 0, -TAU * kf, true); g.stroke(); g.restore(); }

    // ── vé trên vòng (một ô, ba lần đổi) ──
    const slot = (s, a, b, col, edge) => {
      const k = prog(t, a, a + 0.35), out = inC(prog(t, b - 0.4, b));
      if (k <= 0 || out >= 1) return;
      g.save(); g.translate(0, -out * 260); ticket(g, s, 1250, 150, { size: 44, color: col, edge, k }); g.restore();
    };
    slot(`ANGLE ${Math.max(0, Math.floor(th / D2R))}°`, T.wheel + 0.2, T.l38, C.angInk, C.ang);
    slot('0° – 90° ONLY', T.zero38, T.every39, C.badInk, C.bad);
    slot('EVERY ANGLE', T.every39, 1e9, C.angInk, C.ang);
    ticket(g, 'A CIRCLE', 1250, 980, { size: 44, color: C.ink, edge: C.ink, k: prog(t, T.circle39 - 0.1, T.circle39 + 0.3), h: 64 });

    // ── tam giác xám bên trái (32–36) → rã rời, rơi (37) ──
    const fall = 1100 * inC(prog(t, T.world - 0.2, T.world + 0.6));
    const A = [650, 800], tk = prog(t, this.FROM + 0.3, this.FROM + 0.9);
    if (fall < 1100) {
      const snp = prog(t, T.d120, T.d120 + 0.55), broke = t >= T.d120;
      const apart = prog(t, T.trig, T.trig + 1.2) * 0.15;
      brokenTriangle(g, A[0], A[1] + fall, { deg: broke ? 60 : this.deg(t), snap: broke ? snp : 0, apart, s: 0.75, k: tk, label: broke ? '120°' : null });
      // 33: cung đo 0° → 90° + hai vé
      const kg2 = prog(t, T.l33, T.l33 + 0.4) * (1 - prog(t, T.l34 - 0.1, T.l34 + 0.3));
      if (kg2 > 0) {
        g.save(); g.globalAlpha *= kg2; g.setLineDash([10, 12]); g.lineWidth = 6; g.strokeStyle = C.ang; g.lineCap = 'round'; g.beginPath(); g.arc(A[0], A[1], 200, 0, -Math.PI / 2, true); g.stroke(); g.restore();
        const dn = 400 * inC(prog(t, T.l34 - 0.1, T.l34 + 0.3));
        g.save(); g.translate(0, dn);
        ticket(g, '0°', A[0] + 210, A[1] + 86, { size: 44, color: C.angInk, edge: C.ang, k: prog(t, T.zero, T.zero + 0.3) });
        ticket(g, '90°', A[0], A[1] - 232, { size: 44, color: C.angInk, edge: C.ang, k: prog(t, T.ninety, T.ninety + 0.3) });
        g.restore();
      }
    }
    // 34–35: ba câu hỏi, bị gạch rồi trượt đi
    const qs = [['sin(120°) = ?', T.one34], ['sin(−30°) = ?', T.minus34], ['sin(1000°) = ?', T.bigger34]];
    const slideQ = inC(prog(t, T.there, T.there + 0.6)) * 900;
    if (t >= T.one34 - 0.2 && slideQ < 900) {
      g.save(); g.translate(slideQ, 0);
      qs.forEach(([s, a], i) => {
        const b = ticket(g, s, 1290, 330 + i * 130, { size: 48, k: prog(t, a - 0.05, a + 0.3) });
        const ks = prog(t, T.dont + i * 0.2, T.dont + 0.35 + i * 0.2);
        if (ks > 0 && b.w) strike(g, b.x - 16, b.y + b.h * 0.62, b.x + b.w + 16, b.y + b.h * 0.4, ks, { w: 5 });
      });
      g.restore();
    }
    const dn2 = 260 * inC(prog(t, T.world - 0.3, T.world + 0.2));
    g.save(); g.translate(0, dn2); ticket(g, 'NO RIGHT TRIANGLE HAS A 120° ANGLE', 1000, 985, { size: 36, color: C.badInk, edge: C.bad, k: prog(t, T.no35, T.no35 + 0.35), h: 58 }); g.restore();
    // 36: biển TRIGONOMETRY
    sign(g, 'TRIGONOMETRY', 1330, 80, { k: prog(t, T.triangles - 0.2, T.triangles + 0.4), flapK: prog(t, T.trig - 0.1, T.trig + 0.7), lift: prog(t, T.world - 0.2, T.world + 0.4), tw: 60, th: 92, t });
    // 37: con lắc + chong chóng (swings or spins)
    const lift = prog(t, T.l38, T.l38 + 0.7);
    if (lift < 1) {
      const kp = prog(t, T.swings - 0.1, T.swings + 0.3), ks2 = prog(t, T.spins - 0.1, T.spins + 0.3);
      if (kp > 0) {
        g.save(); g.translate(0, -inC(lift) * 700);
        const px = 640, py = 170, a = 0.6 * Math.sin(2.4 * (t - T.swings)) * outBack(clamp(kp)), bx = px + 380 * Math.sin(a), by = py + 380 * Math.cos(a);
        line(g, px - 120, py, px + 120, py, C.steelDk, 14); line(g, px - 120, py, px + 120, py, C.steel, 9);
        line(g, px, py, bx, by, C.rope, 4);
        shade(g, () => { g.fillStyle = CANDY[2]; g.beginPath(); g.arc(bx, by, 40, 0, TAU); g.fill(); });
        g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.arc(bx - 12, by - 12, 11, 0, TAU); g.fill();
        g.restore();
      }
      if (ks2 > 0) {
        g.save(); g.translate(760, 800 - inC(lift) * 900); const e = outBack(clamp(ks2), 2); g.scale(e, e);
        line(g, 0, 0, 0, 200, C.rope, 6);
        for (let i = 0; i < 6; i++) { g.save(); g.rotate(4.0 * (t - T.spins) + i * TAU / 6); g.fillStyle = CANDY[i % CANDY.length]; g.beginPath(); g.moveTo(0, 0); g.lineTo(110, -22); g.lineTo(110, 22); g.closePath(); g.fill(); g.restore(); }
        g.fillStyle = C.steelDk; g.beginPath(); g.arc(0, 0, 12, 0, TAU); g.fill(); g.restore();
      }
    }
    // mascot ponder: nói suốt cảnh, vào sau thẻ hồi, ra khi sang cảnh sau
    const mk = Math.min(prog(t, this.START + 0.4, this.START + 1.0), 1 - prog(t, T.circle39 + 1.0, T.circle39 + 1.6));
    figure(g, 'ponder', 170, H, 262, mk, { t });
  }
}
const SPIN_BG = TAU / 60;
