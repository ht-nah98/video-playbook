// b16 · ACT EIGHT — The key is rhythm (câu 94–98). Vòng nhìn nghiêng + bạt sóng (hình học chung §71).
//  94 "tool for solving triangles … underneath modern science": tam giác xám thép đỡ tấm biển MODERN SCIENCE; vòng mờ quay phía sau
//  95 tam giác rút đi, vòng nghiêng vào, bạt buông, sóng chạy; dây đứt cabin → đầu sóng; "rhythm": hai chu kỳ, "again and again"
//  96 loa (SOUND) · đèn (LIGHT) · radio (RADIO) cưỡi sóng   97 ba vật trước bay lên; ổ điện · thủy triều · mùa cưỡi sóng
//  98 vẽ thêm sóng bạc hà "COSINE", vé "SINE" trên sóng hồng — mọi thứ lặp đều mô tả bằng sin và cos.
import { W, H, C, AR, TAU, prog, lookup, clamp, outCubic, smooth, ground, wheel, heroDot, rimAt, ticket, secTag, actTitle, tarp, waveOnTarp, brokenTriangle, icon, line, dashed, text, rr, shade } from '../kit.js';
import { lerp, inC, chase, disc } from './_g4.js';

const TP = { x0: 660, L: 1100, span: 2 * TAU }, MID = 540, A = 300, OMEGA = 3.2;
const WX = 430, WR = 300;

export default class Rhythm {
  static ERA = 'fair';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b16');
    this.START = L(94).start;
    this.FROM = Math.max(this.START - 2.6, L(93).end + 0.5);
    this.T = {
      how: w(94, 'how'), tool: w(94, 'tool'), tri: w(94, 'triangles'), under: w(94, 'underneath'), science: w(94, 'science'),
      key: w(95, 'key'), rep: w(95, 'repetition'), repeats: w(95, 'repeats'), rhythm: w(95, 'rhythm'),
      sound: w(96, 'sound'), light: w(96, 'light'), radio: w(96, 'radio'), fields: w(96, 'fields'),
      alt: w(97, 'alternating'), tides: w(97, 'tides'), seasons: w(97, 'seasons'), year: w(97, 'year'),
      anything: w(98, 'anything'), steadily: w(98, 'steadily'), sine: w(98, 'sine'), cosine: w(98, 'cosine'),
    };
    this.END = L(98).end;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.under, 'card'), c(T.rep + 0.2, 'whoosh-long'), c(T.sound, 'card'), c(T.alt, 'card'), c(T.anything, 'tick'), c(T.sine, 'pen')];
  }
  q(g, s, x, y, size, k, edge) { if (k > 0) ticket(g, s, x, y, { size, edge, k }); }
  /** vị trí / cỡ icon cưỡi sóng tại x */
  rideY(th, x) { return MID - A * Math.sin(th - (x - TP.x0) / TP.L * TP.span) - 84; }
  render(g, t) {
    const T = this.T, START = this.START, th = OMEGA * t;
    ground(g, 'fair');
    actTitle(g, t, START, 'ACT EIGHT', 'Everything that repeats');
    secTag(g, 'The key is rhythm', { k: prog(t, START, START + 0.4), t });
    // ── 94: vòng mờ phía sau (rút đi sang phải ở câu 95), tam giác đỡ tấm biển ──
    const gout = inC(prog(t, T.key - 0.2, T.key + 0.6));
    if (gout < 1) wheel(g, 1400 + 800 * gout, 470, 400, { theta: 0.5 + 0.105 * t, alpha: 0.26, groundY: 932, bulbs: chase(t) });
    const tout = inC(prog(t, T.key - 0.1, T.key + 0.6));
    if (tout < 1) {
      g.save(); g.translate(-900 * tout, 0);
      const kt = prog(t, START + 0.05, START + 0.6);
      brokenTriangle(g, 330, 900, { deg: 37, s: 0.75, k: kt });
      this.q(g, 'HOW?', 540, 330, 64, prog(t, START + 0.1, START + 0.5), C.ang);
      this.q(g, 'A TOOL FOR TRIANGLES', 540, 450, 38, prog(t, T.tool - 0.1, T.tool + 0.35), C.ink);
      const ks = prog(t, T.under - 0.2, T.under + 0.35), drop = (1 - outCubic(ks)) * -380;
      if (ks > 0) ticket(g, 'MODERN SCIENCE', 540, 645 + drop, { size: 52, edge: C.ang, k: Math.max(ks, 0.01) });
      g.restore();
    }
    // ── 95: tấm bạt buông, vòng nghiêng vào, sóng ──
    const kw = outCubic(prog(t, T.key, T.key + 0.9)), kt2 = prog(t, T.rep - 0.2, T.rep + 0.6);
    const cx = lerp(-300, WX, kw);
    if (kw > 0) {
      const Wh = wheel(g, cx, MID, WR, { theta: th, hero: true, side: 0.1, groundY: 932, bulbs: chase(t) });
      if (kt2 > 0) {
        tarp(g, 620, 150, 1200, 780, { k: kt2 });
        if (kt2 > 0.9) line(g, 640, MID, 1800, MID, 'rgba(35,50,74,0.6)', 3);
        const kk = prog(t, T.rep + 0.2, T.rep + 1.0);
        // sóng hồng (sin) + dây đứt từ cabin
        waveOnTarp(g, u => Math.sin(th - u), kk, { ...TP, mid: MID, A, w: 9 });
        if (kk >= 1) { const [px, py] = Wh.P; dashed(g, px + 14, py, TP.x0 - 8, MID - A * Math.sin(th), 1, { color: 'rgba(224,69,123,0.75)', w: 3.5 }); heroDot(g, TP.x0, MID - A * Math.sin(th), 9); }
        // 98: sóng bạc hà
        const kc = prog(t, T.cosine - 0.1, T.cosine + 0.9);
        if (kc > 0) waveOnTarp(g, u => Math.cos(th - u), kc, { ...TP, mid: MID, A, color: C.cos, w: 9 });
        // 95: ranh giới chu kỳ + "again and again"
        const kr = prog(t, T.repeats, T.rhythm + 0.3);
        if (kr > 0 && kk >= 1) {
          [0, 1, 2].forEach(i => { const x = TP.x0 + i * TP.L / 2; dashed(g, x, 190, x, 890, clamp(kr * 3 - i), { color: 'rgba(35,50,74,0.55)', w: 3, dash: [8, 10] }); });
          ticket(g, 'AGAIN AND AGAIN', 1210, 975, { size: 40, edge: C.ang, k: prog(t, T.rhythm, T.rhythm + 0.3) });
        }
        // 96–97: vật cưỡi sóng
        const ride = (kind, x, at, label, out) => {
          const k = prog(t, at - 0.1, at + 0.35) * (1 - out); if (k <= 0) return;
          const y = this.rideY(th, x) - 6 - out * 0;
          const yy = y - 900 * 0, dy = -900 * inC(out);
          g.save(); g.translate(0, dy);
          if (kind === 'speaker' || kind === 'light' || kind === 'socket') icon(g, kind, x, y, 50, k); else disc(g, kind, x, y, 50, k, t);
          ticket(g, label, x, y + 92, { size: 32, color: C.ink, edge: C.sin, k });
          g.restore();
        };
        const o96 = prog(t, T.alt - 0.8, T.alt - 0.2);
        ride('speaker', 880, T.sound, 'SOUND', o96); ride('light', 1130, T.light, 'LIGHT', o96); ride('radio', 1380, T.radio, 'RADIO', o96);
        const kar = prog(t, T.sound, T.sound + 0.2) * (1 - o96);
        if (kar > 0) for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1), y = this.rideY(th, 880) - 6; g.save(); g.strokeStyle = `rgba(35,50,74,${0.7 * (1 - u)})`; g.lineWidth = 4; g.beginPath(); g.arc(880 + 30, y, 40 + 50 * u, -0.7, 0.7); g.stroke(); g.restore(); }
        ride('socket', 880, T.alt, 'ALTERNATING CURRENT', 0); ride('tides', 1330, T.tides, 'TIDES', 0); ride('seasons', 1700, T.seasons, 'SEASONS', 0);
        // 98: nhãn SINE / COSINE
        ticket(g, 'SINE', 1000, 205, { size: 36, color: C.sinInk, edge: C.sin, k: prog(t, T.sine, T.sine + 0.3) });
        ticket(g, 'COSINE', 1500, 885, { size: 36, color: C.cosInk, edge: C.cos, k: prog(t, T.cosine, T.cosine + 0.3) });
      }
    }
  }
}
