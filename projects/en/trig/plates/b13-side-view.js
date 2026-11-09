// b13 · "A circle seen from the side" (câu 78–82, ERA fair). Hình học của a0 s1 Ⓔ: vòng (430, 540, R 300, side 0.1), bạt (620, 150, 1200, 780), sóng x0 660 · L 1100 · A 300.
//  78 what to keep       vòng chính diện + vé THE IDEA TO KEEP
//  79 seen from the side vòng dời sang trái và quay NGHIÊNG (side 1 → 0.1), bạt buông, độ cao cabin nối dây đứt sang bạt = sóng
//  80 edge-on            vé EDGE-ON: A SINE WAVE; cabin lên xuống nhìn từ cạnh
//  81 examples           con lắc (dao động nhỏ) · dây đàn rung · ổ điện cưỡi sóng; vé 50 OR 60 TIMES A SECOND
//  82 third answer       vé ③ (màu vé ③ của p1); bạt cuộn lên, ảnh vòng đu quay thật trượt vào ("steady turning turns up everywhere")
import { W, H, C, AR, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, heroDot, ticket, secTag, tarp, waveOnTarp, mirrorFrame,
  photoImages, dashed, line, text, icon, shade } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const OM = 1.6;                                                       // rad/s khi vẽ sóng
const TP = { x0: 660, L: 1100, span: 2 * TAU };
const A = 300, MID = 540;

export default class SideView {
  static ERA = 'fair';
  static IMAGES = photoImages('ferris-photo');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b13');
    this.T = {
      most: w(78, 'most'), keep: w(78, 'keep'),
      wave: w(79, 'wave'), circular: w(79, 'circular'), seen: w(79, 'seen'), side: w(79, 'side'),
      steadily: w(80, 'steadily'), viewed: w(80, 'viewed'), edgeon: w(80, 'edge-on'),
      pendulum: w(81, 'pendulum'), guitar: w(81, 'guitar'), wall: w(81, 'wall'), fifty: w(81, 'fifty'), second: w(81, 'second'),
      third: w(82, 'third'), answer: w(82, 'answer'), everywhere: w(82, 'everywhere'), steady: w(82, 'steady'), everywhere2: w(82, 'everywhere', 2),
    };
    this.START = L(78).start;
    this.FROM = Math.max(this.START - 1.2, L(77).end + 0.5);
    this.END = L(82).end;
    this.WAVE0 = this.T.side + 0.45;
    this.THW = 0.6 + 1.1 * (this.WAVE0 - this.FROM);                  // θ lúc bắt đầu quay đều
    this.RETRACT = this.T.everywhere - 0.6;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.most + 0.1, 'card'), c(T.side, 'whoosh-long'), c(T.edgeon + 0.2, 'tick'), c(T.pendulum + 0.05, 'card'), c(T.guitar + 0.1, 'snap'),
      c(T.wall + 0.1, 'zap'), c(T.third, 'card'), c(T.everywhere + 0.1, 'card')];
  }
  theta(t) {
    if (t < this.WAVE0) return 0.6 + 1.1 * (t - this.FROM);
    return this.THW + OM * (t - this.WAVE0);
  }
  // biểu tượng con lắc / dây đàn trong đĩa vé trắng (cùng kiểu icon() của kit)
  disk(g, kind, x, y, r, k, t) {
    if (k <= 0) return;
    const e = outBack(clamp(k), 2.2);
    g.save(); g.translate(x, y); g.scale(e, e);
    shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); });
    g.scale(r / 54, r / 54); g.strokeStyle = C.ink; g.fillStyle = C.ink; g.lineWidth = 5; g.lineCap = g.lineJoin = 'round';
    if (kind === 'pendulum') {
      const ph = 0.42 * Math.sin(t * 3.2), bx = 52 * Math.sin(ph), by = -30 + 52 * Math.cos(ph);
      line(g, -20, -34, 20, -34, C.ink, 6); g.beginPath(); g.moveTo(0, -32); g.lineTo(bx, by); g.stroke();
      g.beginPath(); g.arc(bx, by, 10, 0, TAU); g.fill();
    } else {
      line(g, -36, -14, -36, 14, C.ink, 6); line(g, 36, -14, 36, 14, C.ink, 6);
      for (const [a, al] of [[1, 1], [-1, 0.3]]) { g.save(); g.globalAlpha = al; g.beginPath();
        for (let i = 0; i <= 24; i++) { const u = i / 24, yy = a * 15 * Math.sin(Math.PI * u) * Math.sin(t * 22); i ? g.lineTo(-36 + 72 * u, yy) : g.moveTo(-36 + 72 * u, yy); } g.stroke(); g.restore(); }
    }
    g.restore();
  }
  render(g, t) {
    const T = this.T, th = this.theta(t);
    ground(g, 'fair', { ground: false });
    secTag(g, 'A circle seen from the side', { k: prog(t, this.START, this.START + 0.4), t });

    // ── vòng: chính diện → dời trái + nghiêng ──
    const mvK = smooth(prog(t, T.wave, T.side)), side = lerp(1, 0.1, mvK);
    const cx = lerp(700, 430, mvK), R = lerp(290, 300, mvK);
    const Wh = wheel(g, cx, MID, R, { theta: th, hero: true, side, groundY: 940, axes: clamp(1 - prog(t, T.wave, T.wave + 0.7)) || false, bulbs: a => 0.5 + 0.5 * Math.sin(a * 6 - t * 4) });
    const [px, py] = Wh.P;
    const kb = 1 - prog(t, T.wave, T.wave + 0.5);
    if (kb > 0) line(g, px, MID, px, py, C.sin, 12);
    heroDot(g, px, py);

    // ── bạt + sóng ──
    const kt = Math.min(prog(t, T.seen + 0.15, T.seen + 0.75), 1 - prog(t, this.RETRACT, this.RETRACT + 0.8));
    if (kt > 0) {
      tarp(g, 620, 150, 1200, 780, { k: kt });
      if (kt > 0.9) line(g, 640, MID, 1800, MID, 'rgba(35,50,74,0.6)', 3);
      if (t >= this.WAVE0) {
        const rev = clamp((th - this.THW) / TP.span), Ae = A * Math.min(1, kt);
        const fn = u => Math.sin(th - u);
        waveOnTarp(g, fn, rev, { ...TP, mid: MID, A: Ae, w: 9 });
        if (kt > 0.95) { dashed(g, px + 14, py, TP.x0 - 8, MID - A * Math.sin(th), 1, { color: 'rgba(224,69,123,0.75)', w: 3.5 }); heroDot(g, TP.x0, MID - A * Math.sin(th), 9); }
        // ba ví dụ cưỡi sóng
        const ride = (x, at, word, kind) => {
          const k = Math.min(prog(t, at - 0.1, at + 0.35), 1 - prog(t, T.third - 0.25, T.third + 0.05)) * Math.min(1, kt); if (k <= 0) return;
          const y = MID - Ae * Math.sin(th - (x - TP.x0) / TP.L * TP.span) - 78;
          if (kind === 'socket') icon(g, 'socket', x, y, 50, k); else this.disk(g, kind, x, y, 50, k, t);
          ticket(g, word, x, 972, { size: 32, color: C.ink, edge: C.sin, k });
        };
        ride(870, T.pendulum, 'PENDULUM', 'pendulum');
        ride(1190, T.guitar, 'GUITAR STRING', 'string');
        ride(1540, T.wall, 'WALL SOCKET', 'socket');
      }
    }

    // ── vé tiêu đề ──
    const tk = (s, cx2, cy2, a, b, o) => { const k = Math.min(prog(t, a, a + 0.35), 1 - prog(t, b - 0.3, b)); if (k > 0) ticket(g, s, cx2, cy2, { k, ...o }); };
    tk('THE IDEA TO KEEP', 1250, 300, T.most, T.side - 0.3, { size: 56, color: C.ink, edge: C.ang });
    tk('SEEN FROM THE SIDE', 1330, 100, T.seen + 0.1, T.viewed, { size: 42, color: C.ink, edge: C.ink });
    tk('EDGE-ON: A SINE WAVE', 1330, 100, T.viewed, T.pendulum - 0.1, { size: 42, color: C.sinInk, edge: C.sin });
    tk('50 OR 60 TIMES A SECOND', 1470, 893, T.fifty - 0.1, T.third - 0.25, { size: 38, color: C.ink, edge: C.ink });
    tk('③ THE CIRCLE IN EVERY WAVE', 1250, 100, T.third, 1e9, { size: 44, color: C.ink, edge: '#C7B3EE' });

    // ── ảnh vòng đu quay thật (steady turning turns up everywhere) ──
    const pk = prog(t, T.everywhere + 0.05, T.everywhere + 0.8);
    if (pk > 0) mirrorFrame(g, 'ferris-photo', 940, 230, 620, 410, { k: pk, rot: -0.03, label: 'A REAL FERRIS WHEEL', zoom: 1 + 0.06 * prog(t, T.everywhere, T.everywhere + 4.2), t });
  }
}
