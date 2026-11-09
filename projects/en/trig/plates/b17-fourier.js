// b17 · Fourier (câu 99–102), ERA tent. Chân dung Fourier trong khung gương; vòng tách trà nối tiếp (chuỗi vòng nhỏ) cộng thành sóng
// răng cưa "lộn xộn"; ba vật cưỡi sóng (nhạc / MRI / dữ liệu di động); khép bằng tam giác (đo thế giới) → vòng + sóng (quay và rung).
import { W, H, C, AR, TAU, prog, lookup, clamp, outCubic, outBack, smooth, ground, heroDot, rimAt, ticket, secTag, tarp, waveOnTarp, mirrorFrame, photoImages, brokenTriangle, wheel, line, dashed, text, rr, shade, SPIN } from '../kit.js';
import { lerp, inC, chase, disc, arrow } from './_g4.js';

const TP = { x0: 1070, L: 740, span: 2 * TAU }, MID = 520, AMP = 200, OM = 1.6;
const CX0 = 790, CY0 = MID, NT = 4;
const saw = x => { const m = ((x + Math.PI) % TAU + TAU) % TAU; return m / Math.PI - 1; };   // [-1, 1)
const rN = n => (AMP * 2 / Math.PI) / n * (n % 2 ? 1 : -1);                                    // hệ số chuỗi Fourier của răng cưa
const sumTo = (x, m) => { let s = 0; for (let n = 1; n <= m; n++) s += rN(n) * Math.sin(n * x); return s; };

export default class Fourier {
  static ERA = 'tent';
  static IMAGES = photoImages('fourier');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b17');
    this.START = L(99).start;
    this.FROM = Math.max(this.START - 1.2, L(98).end + 0.5);
    this.T = {
      early: w(99, 'early'), hundreds: w(99, 'hundreds'), joseph: w(99, 'joseph'), further: w(99, 'further'),
      showed: w(100, 'showed'), repeating: w(100, 'repeating'), messy: w(100, 'messy'), built: w(100, 'built'), adding: w(100, 'adding'), simple: w(100, 'simple'), waves: w(100, 'waves'),
      idea: w(101, 'idea'), phone: w(101, 'phone'), music: w(101, 'music'), mri: w(101, 'mri'), signals: w(101, 'signals'), data: w(101, 'data'),
      trig: w(102, 'trigonometry'), started: w(102, 'started'), measuring: w(102, 'measuring'), ended: w(102, 'ended'), language: w(102, 'language'), turns: w(102, 'turns'), vibrates: w(102, 'vibrates'),
      s101: L(101).start, s102: L(102).start,
    };
    this.END = L(102).end;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.joseph, 'card'), c(T.repeating, 'pen'), c(T.adding, 'tick'), c(T.phone, 'card'), c(T.mri, 'card'), c(T.signals, 'card'), c(T.language, 'shimmer')];
  }
  render(g, t) {
    const T = this.T, START = this.START, th = OM * t;
    ground(g, 'tent');
    secTag(g, 'Fourier', { k: prog(t, START, START + 0.4), t });
    const out2 = inC(prog(t, T.trig - 0.1, T.trig + 0.6));           // 102: cả cụm Fourier rời (trượt phải)
    // ── 99: chân dung + "early 1800s" ──
    const outP = inC(prog(t, T.s101 - 0.3, T.s101 + 0.4));
    if (outP < 1) {
      g.save(); g.translate(-700 * outP, 0);
      mirrorFrame(g, 'fourier', 170, 190, 400, 500, { k: prog(t, this.FROM + 0.3, this.FROM + 1.1), rot: -0.03, label: 'JOSEPH FOURIER · 1768–1830', zoom: 1 + 0.04 * prog(t, START, START + 8), focus: [0.5, 0.2], t });
      g.restore();
      ticket(g, 'EARLY 1800s', 1250, 230, { size: 56, k: prog(t, T.early - 0.1, T.early + 0.3) * (1 - prog(t, T.showed - 0.2, T.showed + 0.3)), edge: C.ink });
      const kf = prog(t, T.further - 0.1, T.further + 0.3) * (1 - prog(t, T.showed - 0.2, T.showed + 0.3));
      if (kf > 0) { ticket(g, 'MUCH FURTHER', 1000, 560, { size: 52, k: kf }); arrow(g, 1210, 560, 1470, 560, kf, { color: C.ink }); }
    }
    g.save(); g.translate(2400 * out2, 0);
    // ── 100: bạt + sóng răng cưa + chuỗi vòng ──
    const kt = prog(t, T.showed - 0.2, T.showed + 0.5);
    if (kt > 0) {
      tarp(g, 1030, 190, 840, 640, { k: kt });
      if (kt > 0.9) line(g, 1050, MID, 1850, MID, 'rgba(35,50,74,0.5)', 3);
      // mục tiêu: răng cưa (nét đứt xám-navy) vẽ ở "repeating pattern … messy"
      const kp = prog(t, T.showed + 0.1, T.messy + 0.3);
      if (kp > 0) { g.save(); g.strokeStyle = 'rgba(35,50,74,0.75)'; g.lineWidth = 5; g.setLineDash([12, 10]); g.beginPath();
        const N = 360, ue = TP.span * kp; let pen = false;
        for (let i = 0; i <= N; i++) { const u = ue * i / N, y0 = saw(th - u), x = TP.x0 + TP.L * u / TP.span, y = MID - AMP * y0;
          if (i && Math.abs(y0 - saw(th - ue * (i - 1) / N)) > 1) { pen = false; } if (!pen) { g.moveTo(x, y); pen = true; } else g.lineTo(x, y); }
        g.stroke(); g.restore(); }
      // chuỗi vòng: số vòng tăng ở "built / adding … simple … sine"
      const times = [T.built, T.adding, T.simple, T.waves];
      const nk = times.map(a => prog(t, a, a + 0.35)), cnt = nk.reduce((a, b) => a + (b > 0 ? 1 : 0), 0);
      if (cnt > 0) {
        let x = CX0, y = CY0;
        for (let n = 1; n <= cnt; n++) {
          const r = Math.abs(rN(n)) * nk[n - 1], ph = n * th + (n % 2 ? 0 : Math.PI), sx = r * Math.cos(ph), sy = -r * Math.sin(ph);   // rN âm = pha lệch π
          g.save(); g.strokeStyle = n === 1 ? C.ink : 'rgba(35,50,74,0.65)'; g.lineWidth = n === 1 ? 4 : 3; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke(); g.restore();
          line(g, x, y, x + sx, y + sy, C.ink, 4); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 5, 0, TAU); g.fill();
          x += sx; y += sy;
        }
        const ks = prog(t, T.waves - 0.1, T.waves + 0.6) , m = cnt;
        // đầu bút → sóng tổng (navy, đậm) — vẽ dần ở "waves"
        dashed(g, x + 8, y, TP.x0 - 6, y, 1, { color: 'rgba(35,50,74,0.7)', w: 3, dash: [6, 8] });
        heroDot(g, TP.x0, y, 9);
        waveOnTarp(g, u => sumTo(th - u, m) / AMP, Math.max(ks, cnt >= 2 ? 0.4 * prog(t, T.adding, T.adding + 0.8) : 0), { ...TP, mid: MID, A: AMP, color: C.ink, w: 9 });
      }
    }
    // ── 101: ba vật cưỡi sóng + "one idea" ──
    const rideY = x => { const u = (x - TP.x0) / TP.L * TP.span; return MID - sumTo(th - u, NT) - 92; };
    if (t > T.idea - 0.3) {
      ticket(g, 'ONE IDEA', 330, 480, { size: 70, k: prog(t, T.idea - 0.1, T.idea + 0.3), edge: C.ang });
      [['phone', 1200, T.phone, 'MUSIC', T.music], ['mri', 1440, T.mri, 'MRI SCANNER', T.mri], ['radio', 1670, T.signals, 'MOBILE DATA', T.data]].forEach(([kind, x, at, lab]) => {
        const k = prog(t, at - 0.15, at + 0.35); if (k <= 0) return; const y = rideY(x);
        disc(g, kind, x, y, 50, k, t); ticket(g, lab, x, y + 90, { size: 32, k });
      });
    }
    g.restore();
    // ── 102: tam giác (đo thế giới) → vòng + sóng (quay và rung) ──
    const k2 = prog(t, T.trig + 0.1, T.trig + 0.6);
    if (k2 > 0) {
      const kt2 = k2, km = prog(t, T.measuring - 0.1, T.measuring + 0.4);
      brokenTriangle(g, 180, 800, { deg: 37, s: 0.8, k: kt2 });
      ticket(g, 'MEASURING THE WORLD', 480, 905, { size: 44, k: km, edge: C.ang });
      const ke = prog(t, T.ended - 0.1, T.ended + 0.5);
      if (ke > 0) {
        arrow(g, 640, 600, 840, 600, ke, { color: C.ink });
        wheel(g, 1130, 560, 200, { theta: 0.5 + 0.9 * t, hero: true, legs: false, n: 10, bulbs: chase(t), alpha: 1 });
        const P = rimAt(1130, 560, 200, 0.5 + 0.9 * t); heroDot(g, P[0], P[1]);
        const kv = prog(t, T.language - 0.2, T.vibrates + 0.3);
        waveOnTarp(g, u => Math.sin(0.9 * t * 1 - u), kv, { x0: 1380, L: 460, mid: 560, A: 130, span: 2 * TAU, w: 9 });
        ticket(g, 'TURNS', 1130, 820, { size: 44, k: prog(t, T.turns - 0.1, T.turns + 0.3), edge: C.ang });
        ticket(g, 'VIBRATES', 1610, 820, { size: 44, k: prog(t, T.vibrates - 0.1, T.vibrates + 0.3) });
      }
    }
  }
}
