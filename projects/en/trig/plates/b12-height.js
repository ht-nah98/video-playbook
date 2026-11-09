// b12 · ACT SIX — "Watching only the height" (câu 71–77, ERA fair). Vòng chính diện = đường tròn đơn vị (700, 540, 290) + bạt sóng bên phải.
//  71 geometry → physics  biển lật GEOMETRY → PHYSICS (hồi mới), vòng đu quay vào
//  72 steady speed        cabin hồng chạy đều quanh đường tròn đơn vị
//  73 only the height     vòng mờ đi, chỉ còn thanh hồng (độ cao = sin); bạt buông xuống, bút vẽ độ cao theo thời gian
//  74 axes                vé ANGLE = TIME (trục ngang), vé SINE (trục dọc)
//  75 rising and falling  sóng chạy; mốc 1 và −1 hiện đúng lời "one" / "minus one"
//  76 the sine wave       vé THE SINE WAVE, sóng sáng lên
//  77 cosine, quarter     sóng bạc hà (cos) cùng hình, lệch một phần tư vòng: thước chanh nối hai đỉnh gần nhất
// Mascot pointer (miệng đã đo → nói) ở mép trái, ~ câu 73–74.
import { W, H, C, AR, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, heroDot, ticket, sign, secTag, actTitle, tarp, waveOnTarp,
  dashed, line, text, figure, num } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const CX = 700, CY = 540, R = 290, OM = 1.1;                          // rad/s: cabin chạy đều
const TX = 1110, TY = 215, TW = 720, TH = 650;                         // bạt
const WV = { x0: 1260, L: 540, mid: CY, A: R, span: 1.5 * TAU };

export default class Height {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b12');
    this.T = {
      geometry: w(71, 'geometry'), physics: w(71, 'physics'),
      running: w(72, 'running'), steady: w(72, 'steady'),
      ignore: w(73, 'ignore'), height: w(73, 'height'), plot: w(73, 'plot'), time73: w(73, 'time'),
      horizontal: w(74, 'horizontal'), angle: w(74, 'angle'), vertical: w(74, 'vertical'), sine74: w(74, 'sine'),
      up: w(75, 'up'), one: w(75, 'one'), minus: w(75, 'minus'), one2: w(75, 'one', 2), forever: w(75, 'forever'),
      sine76: w(76, 'sine'), wave76: w(76, 'wave'),
      cosine: w(77, 'cosine'), quarter: w(77, 'quarter'), turn: w(77, 'turn'),
    };
    this.START = L(71).start;
    this.FROM = Math.max(this.START - 2.6, L(70).end + 0.5);
    this.END = L(77).end;
    this.MARK = String(must('Math.sin(Math.PI / 2)', 1));
    this.MINUS1 = num(must('Math.sin(-Math.PI / 2)', -1));
    this.TH0 = 0.6 + OM * (this.T.plot - this.FROM);                   // θ lúc bắt đầu vẽ sóng
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 1.45, 'flap'), c(T.physics + 0.1, 'flap'), c(T.steady + 0.1, 'tick'), c(T.plot + 0.05, 'whoosh-long'), c(T.horizontal + 0.15, 'card'),
      c(T.vertical + 0.15, 'pen'), c(T.one + 0.1, 'card'), c(T.wave76 + 0.05, 'shimmer'), c(T.quarter, 'card')];
  }
  theta(t) { return 0.6 + OM * (t - this.FROM); }
  render(g, t) {
    const T = this.T, S = this.START, th = this.theta(t);
    ground(g, 'fair', { ground: false });
    actTitle(g, t, S, 'ACT SIX', 'The circle becomes a wave');
    secTag(g, 'Watching only the height', { k: prog(t, S, S + 0.4), t });

    // ── bạt + sóng ──
    const kt = prog(t, T.plot - 0.35, T.plot + 0.25);
    if (kt > 0) tarp(g, TX, TY, TW, TH, { k: kt });
    if (kt > 0.98) line(g, TX + 14, CY, TX + TW - 14, CY, 'rgba(35,50,74,0.55)', 3);
    const rev = clamp((th - this.TH0) / WV.span);
    const kc = prog(t, T.cosine, T.cosine + 1.2);
    const glow = Math.exp(-Math.max(0, t - T.sine76) * 2.2) * prog(t, T.sine76 - 0.05, T.sine76 + 0.05);
    // mốc ±1 (câu 75)
    if (kt > 0.98) [[this.MARK, WV.mid - WV.A, T.one], [this.MINUS1, WV.mid + WV.A, T.minus]].forEach(([s, y, at]) => {
      const k = prog(t, at, at + 0.3); if (k <= 0) return;
      g.save(); g.setLineDash([8, 10]); g.strokeStyle = 'rgba(35,50,74,0.45)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(TX + 150, y); g.lineTo(TX + TW - 20, y); g.stroke(); g.restore();
      ticket(g, s, TX + 82, y, { size: 36, color: C.sinInk, edge: C.sin, k });
    });
    if (kt > 0.98 && rev > 0) {
      if (glow > 0.02) waveOnTarp(g, u => Math.sin(th - u), rev, { ...WV, w: 9 + 14 * glow, color: `rgba(224,69,123,${0.35 * glow})` });
      waveOnTarp(g, u => Math.sin(th - u), rev, { ...WV, w: 9 });
      if (kc > 0) waveOnTarp(g, u => Math.cos(th - u), kc * rev, { ...WV, w: 9, color: C.cos });
    }
    // ── vòng đu quay chính diện ──
    const come = outCubic(prog(t, S - 0.8, S + 0.1)), dim = lerp(1, 0.32, smooth(prog(t, T.ignore, T.ignore + 0.7)));
    const Wh = wheel(g, CX, CY + (1 - come) * 560, R, { theta: th, hero: true, axes: true, groundY: 1000, alpha: dim, bulbs: a => 0.5 + 0.5 * Math.sin(a * 6 - t * 4) });
    const [px, py] = Wh.P, kb = prog(t, T.height - 0.05, T.height + 0.3);
    if (kb > 0) line(g, px, CY, px, CY - (CY - py) * outCubic(kb), C.sin, 12);
    const kcos = prog(t, T.cosine, T.cosine + 0.4);
    if (kcos > 0) line(g, CX, CY, CX + (px - CX) * outCubic(kcos), CY, C.cos, 12);
    heroDot(g, px, py);
    if (kt > 0.98 && rev > 0) {
      const penX = WV.x0, penY = WV.mid - WV.A * Math.sin(th);
      dashed(g, px + 14, py, penX - 8, penY, prog(t, T.plot + 0.2, T.plot + 0.6), { color: 'rgba(224,69,123,0.75)', w: 3.5 });
      heroDot(g, penX, penY, 9);
    }
    // ── thước chanh: lệch một phần tư vòng giữa hai đỉnh gần nhất (câu 77) ──
    const kq = prog(t, T.quarter, T.quarter + 0.4);
    if (kq > 0 && kc > 0.98) {
      const up = ((th - Math.PI / 2) % TAU + TAU) % TAU, um = up + Math.PI / 2, X = u => WV.x0 + WV.L * u / WV.span, y = WV.mid - WV.A - 16;
      const xa = X(up), xb = X(up) + (X(um) - X(up)) * outCubic(kq);
      line(g, xa, y, xb, y, C.ang, 7); for (const xx of [xa, xb]) line(g, xx, y - 12, xx, y + 12, C.ang, 7);
    }
    // ── biển lật GEOMETRY → PHYSICS (71) ──
    sign(g, 'PHYSICS', 1460, 80, { k: prog(t, T.geometry - 0.2, T.geometry + 0.4), flapK: prog(t, T.physics, T.physics + 0.8), from: 'GEOMETRY', cells: 8, tw: 62, th: 92,
      lift: prog(t, T.running - 0.2, T.running + 0.45), t });
    // ── vé tiêu đề chạy dọc câu ──
    const H0 = 160, HX = 1470;
    const tk = (s, a, b, o) => { const k = Math.min(prog(t, a, a + 0.35), 1 - prog(t, b - 0.3, b)); if (k > 0) ticket(g, s, HX, H0, { size: 46, k, ...o }); };
    tk('ONLY THE HEIGHT', T.ignore + 0.5, T.horizontal, { color: C.sinInk, edge: C.sin });
    ticket(g, 'ANGLE = TIME', HX - 40, 915, { size: 46, color: C.angInk, edge: C.ang, k: prog(t, T.horizontal, T.horizontal + 0.35) });
    tk('SINE', T.vertical, T.sine76, { color: C.sinInk, edge: C.sin });
    tk('THE SINE WAVE', T.sine76, T.cosine, { color: C.sinInk, edge: C.sin });
    tk('A QUARTER TURN APART', T.quarter, 1e9, { color: C.angInk, edge: C.ang });
    // mascot pointer (nói) bên trái
    const fk = Math.min(prog(t, T.ignore - 0.5, T.ignore + 0.2), 1 - prog(t, T.horizontal + 2.0, T.horizontal + 2.7));
    if (fk > 0) figure(g, 'pointer', 170, H, 262, fk, { t });
  }
}
