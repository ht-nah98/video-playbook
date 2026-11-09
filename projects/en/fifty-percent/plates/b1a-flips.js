// ACT ONE mở hồi (p2, câu 0–4) — "Flip it again, and again". DNA §1: đồng xu tung = đốm lửa nhỏ; tỉ lệ ngửa là vệt
// sáng lượn quanh đường ½ (vàng = sự thật) rồi hội tụ khi số lần tung đi 10 → 100 → 1 000 000.
// Bố cục:
//   trái dưới   đèn bão của NGƯỜI XEM (như a0) — bật lại từ đen sau intro; tỉ lệ đang đo treo trong quầng đèn
//   phải        đồ thị: trục ngang log(số lần tung) 1 → 1 000 000, trục dọc tỉ lệ ngửa 0–1; phễu sương ±1/(2√n)
// Mô phỏng tất định: ngửa ⇔ hash(i·0.7713 + 44·3.17) < 0.5 — hạt 44 cho đúng 7/10 như lời đọc (must kiểm lúc init).
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, C, CG, MONO, sky, glow, lantern, fogBank, coin, hand, seg,
  typed, text, label, card, actTitle, must, fmt, lookup } from '../kit.js';

const LX = 250, LY = 900;                                  // đèn bão người xem
const RX = 430, RY = 560;                                  // con số trong quầng đèn
const X0 = 800, X1 = 1740, Y0 = 880, Y1 = 300;            // khung đồ thị: log10(n) 0..6 → X0..X1; tỉ lệ 0..1 → Y0..Y1
const SEED = 44 * 3.17, N = 1000000;
const px = n => X0 + (X1 - X0) * Math.log10(Math.max(1, n)) / 6;
const py = s => Y0 + (Y1 - Y0) * s;

export default class Flips {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1a');
    this.T = {
      understand: w(0, 'understand'), frequency: w(0, 'frequency'),
      heads1: w(1, 'heads'), half1: w(1, 'half'), many: w(1, 'many'), settle: w(1, 'settle'), half2: w(1, 'half', 2),
      ten: w(2, 'ten'), seven: w(2, 'seven'), heads2: w(2, 'heads'),
      hundred: w(3, 'hundred'), closer: w(3, 'closer'),
      million: w(4, 'million'), glued: w(4, 'glued'), fifty: w(4, 'fifty'), end: L(4).end,
    };
    this.START = L(0).start; this.FROM = this.START - 2.6;
    // tung một triệu lần (tất định), giữ số ngửa cộng dồn tại các mốc vẽ
    const heads = new Uint8Array(N); let c = 0; const cum = new Int32Array(N + 1);
    for (let i = 0; i < N; i++) { heads[i] = hash(i * 0.7713 + SEED) < 0.5 ? 1 : 0; c += heads[i]; cum[i + 1] = c; }
    this.heads = heads;
    this.k10 = must(`${cum[10]}`, 7);                                     // lời đọc: "you might well get seven heads"
    this.k100 = cum[100]; this.kM = cum[N];
    this.pct10 = must(`${this.k10} / 10 * 100`, 70);
    this.pct100 = must(`${this.k100} / 100 * 100`, this.k100);           // 100 lần: số ngửa = phần trăm, đúng
    this.pctM = (this.kM / N * 100).toFixed(2);
    must(`Math.abs(${this.kM} / ${N} - 0.5) < 0.0005`, true);              // "practically glued": lệch < 0,05% (CONTENT: ±0,05%)
    // các điểm vẽ vệt: 1..100 từng lần, rồi 400 mốc log tới 1 000 000
    this.pts = [];
    for (let n = 1; n <= 100; n++) this.pts.push([n, cum[n] / n]);
    for (let j = 1; j <= 400; j++) { const n = Math.round(Math.pow(10, 2 + 4 * j / 400)); if (n > this.pts.at(-1)[0]) this.pts.push([n, cum[n] / n]); }
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FROM + 0.3, kind: 'shimmer' }, { t: T.ten, kind: 'coin' }, { t: T.hundred, kind: 'tick' }];
  }
  // số lần tung đã hiện tại t: 1→10 từng nấc (câu 2), 10→100 rồi 100→1 000 000 trượt theo log (câu 3, 4)
  nAt(t) {
    const T = this.T;
    if (t < T.hundred) { let n = 0; for (let i = 1; i <= 10; i++) if (t >= this.toss(i) + 0.5) n = i; return n; }
    if (t < T.million) return Math.round(Math.pow(10, 1 + smooth(prog(t, T.hundred, T.hundred + 1.4))));
    return Math.round(Math.pow(10, 2 + 4 * smooth(prog(t, T.million, T.glued + 0.2))));
  }
  toss(i) { return this.T.ten + (this.T.seven - 0.15 - this.T.ten) * (i - 1) / 9; }   // lúc đốm thứ i bật lên (đáp vào vệt sau 0.5 s)
  render(g, t) {
    const T = this.T;
    const wake = smooth(prog(t, this.FROM, this.FROM + 0.9));              // từ đen sau intro: đêm hiện dần, đèn bật lại
    const lamp = outCubic(prog(t, this.FROM + 0.2, this.FROM + 1.2));
    const push = 1 + 0.03 * smooth(prog(t, this.START, T.end));            // camera đẩy rất chậm suốt cảnh
    g.save(); g.translate(W * 0.6, H * 0.55); g.scale(push, push); g.translate(-W * 0.6, -H * 0.55);
    sky(g, t, { fog: 0.8, y: 0.7 });

    // ── trục (câu 0) ──
    const kAx = prog(t, T.understand - 0.2, T.understand + 1.6);
    hand(g, seg(X0, Y0, X0, Y1 - 30, 20), { w: 3, color: 'rgba(142,162,184,0.8)', k: kAx, seed: 2 });
    hand(g, seg(X0, Y0, X1 + 40, Y0, 30), { w: 3, color: 'rgba(142,162,184,0.8)', k: kAx, seed: 5 });
    const kTk = prog(t, T.understand + 0.6, T.frequency);
    ['1', '10', '100', '1,000', '10,000', '100,000', '1,000,000'].forEach((s, i) => {
      if (kTk * 7 < i + 0.2) return;
      const x = X0 + (X1 - X0) * i / 6;
      g.fillStyle = 'rgba(142,162,184,0.8)'; g.fillRect(x - 1, Y0, 2, 12);
      text(g, s, i === 6 ? x + 30 : x, Y0 + 44, `500 20px ${MONO}`, C.fog, i === 6 ? 'right' : 'center');
    });
    typed(g, 'NUMBER OF FLIPS', X1 + 40, Y0 + 84, prog(t, T.frequency - 0.6, T.frequency), `500 20px ${MONO}`, C.fog, { align: 'right' });
    typed(g, 'SHARE OF HEADS', X0, Y1 - 50, prog(t, T.frequency, T.frequency + 0.6), `500 20px ${MONO}`, C.fog);
    const kY = prog(t, T.frequency + 0.2, T.frequency + 0.8);
    if (kY > 0) { text(g, '1', X0 - 18, Y1 + 8, `500 20px ${MONO}`, C.fog, 'right'); text(g, '0', X0 - 18, Y0 + 8, `500 20px ${MONO}`, C.fog, 'right'); }

    // đồng xu nhỏ cạnh trục dọc ("the chance of heads"): lật về mặt H
    const kC = prog(t, T.heads1 - 0.3, T.heads1 + 0.5);
    if (kC > 0) coin(g, X0 - 60, Y1 - 58, 22 * outBack(clamp(kC * 2)), { spin: (1 - kC) * 9.4, face: 'H' });

    // ── đường ½ vàng (sự thật, "is one half") + phễu sương ±1/(2√n) ("closer and closer") ──
    const kHalf = prog(t, T.half1 - 0.25, T.half1 + 0.8);
    const glue = smooth(prog(t, T.glued - 0.2, T.glued + 0.6));
    if (kHalf > 0) {
      g.save(); g.setLineDash([16, 12]); g.strokeStyle = C.gold; g.lineWidth = 3 + 2 * glue; g.globalAlpha = 0.85;
      g.beginPath(); g.moveTo(X0, py(0.5)); g.lineTo(X0 + (X1 + 40 - X0) * outCubic(kHalf), py(0.5)); g.stroke(); g.restore();
      if (glue > 0) for (let i = 0; i < 6; i++) glow(g, X0 + 120 + i * 170, py(0.5), 120, 'rgba(255,216,102,0.16)', glue);
      typed(g, '½', X0 - 18, py(0.5) + 22, kHalf * 2 - 0.5, `600 72px ${CG}`, C.gold, { align: 'right' });
    }
    const kF = prog(t, T.settle - 0.2, T.half2 + 0.4);
    if (kF > 0) {
      const xm = X0 + (X1 - X0) * outCubic(kF);
      g.save(); g.fillStyle = 'rgba(142,162,184,0.13)'; g.beginPath();
      for (let x = X0; x <= xm; x += 8) { const n = Math.pow(10, 6 * (x - X0) / (X1 - X0)); g.lineTo(x, py(0.5 + Math.min(0.5, 0.5 / Math.sqrt(n)))); }
      for (let x = xm; x >= X0; x -= 8) { const n = Math.pow(10, 6 * (x - X0) / (X1 - X0)); g.lineTo(x, py(0.5 - Math.min(0.5, 0.5 / Math.sqrt(n)))); }
      g.closePath(); g.fill(); g.restore();
    }

    // ── vệt tỉ lệ ngửa + đốm lửa mỗi lần tung ──
    const n = this.nAt(t);
    if (n > 0) {
      g.save(); g.strokeStyle = C.amber; g.lineWidth = 4; g.lineJoin = 'round'; g.shadowColor = 'rgba(244,184,96,0.7)'; g.shadowBlur = 10;
      g.beginPath(); let last = null;
      for (const [m, s] of this.pts) { if (m > n) break; const x = px(m), y = py(s); last ? g.lineTo(x, y) : g.moveTo(x, y); last = [x, y]; }
      g.stroke(); g.restore();
      if (last) { glow(g, last[0], last[1], 70, 'rgba(255,214,140,0.7)'); g.fillStyle = '#FFF3D0'; g.beginPath(); g.arc(last[0], last[1], 6, 0, 7); g.fill(); }
      this.sparks(g, t, n);
    }

    // ── đèn người xem + con số trong quầng đèn ──
    glow(g, RX, RY, 380, 'rgba(244,184,96,0.16)', lamp * prog(t, T.ten, T.ten + 0.8));
    lantern(g, LX, LY, 1.05, t, lamp);
    if (n > 0) {
      const share = n <= 100 ? this.pts[n - 1][1] : this.pts.find(p => p[0] >= n)[1];
      const shown = n === 10 ? `${this.pct10}%` : n === 100 ? `${this.pct100}%` : n >= N ? `≈ ${this.pctM}%` : `${(share * 100).toFixed(n > 100 ? 1 : 0)}%`;
      const kN = outBack(prog(t, this.toss(1) + 0.5, this.toss(1) + 0.9));
      g.save(); g.translate(RX, RY); g.scale(0.7 + 0.3 * kN, 0.7 + 0.3 * kN); text(g, shown, 0, 40, `600 140px ${CG}`, C.amber, 'center'); g.restore();
      const line = n <= 100 ? `${Math.round(share * n)} OF ${n} HEADS` : n >= N ? `${fmt(this.kM)} OF ${fmt(N)} HEADS` : `${fmt(n)} FLIPS`;
      label(g, line, RX, RY + 110, C.amber, 'center', 24);
    }
    g.restore();

    // ── thẻ hồi + biển tên mục (toạ độ màn hình) ──
    actTitle(g, 'night', t, this.START, 'ACT ONE', 'Probability as frequency');
    card(g, 'night', prog(t, this.START - 0.2, this.START + 1.4), 'ACT ONE · FREQUENCY', 'Flip it again, and again');
    if (wake < 1) { g.save(); g.globalAlpha = 1 - wake; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore();
      if (lamp > 0) lantern(g, LX, LY, 1.05, t, lamp); }              // đèn bật lại TRƯỚC khi đêm hiện ra
  }
  // mỗi lần tung (1..10) = một đốm lửa bật lên từ trục đáy rồi rơi vào vệt; 10→100 thành mưa đốm; lên triệu: chùm đuôi sao
  sparks(g, t, n) {
    const T = this.T;
    if (t < T.hundred) {
      for (let i = 1; i <= 10; i++) {
        const ti = this.toss(i), u = (t - ti) / 0.5;
        if (u < 0 || u > 1.6) continue;
        const x = px(i), y = py(this.pts[i - 1][1]), hy = Y0 - (Y0 - y) * Math.min(1, u) - 60 * Math.sin(Math.min(1, u) * Math.PI);
        const col = this.heads[i - 1] ? 'rgba(255,216,102,0.9)' : 'rgba(142,162,184,0.9)';
        const a = u <= 1 ? 1 : 1 - (u - 1) / 0.6;
        glow(g, x, hy, 34, col, a); g.save(); g.globalAlpha = a; g.fillStyle = this.heads[i - 1] ? '#FFF3D0' : '#C9D4E0';
        g.beginPath(); g.arc(x, hy, 4, 0, 7); g.fill(); g.restore();
      }
      return;
    }
    // mưa đốm: 26 đốm bay từ đáy vào đầu vệt, liên tục khi n còn tăng
    const live = (t < T.hundred + 1.6) || (t > T.million - 0.1 && t < T.glued + 0.5);
    if (!live) return;
    const head = this.pts.find(p => p[0] >= n) || this.pts.at(-1), hx = px(head[0]), hy = py(head[1]);
    for (let j = 0; j < 26; j++) {
      const ph = (t * 2.2 + hash(j * 3.7)) % 1, sx = hx - 40 - hash(j * 1.3) * 160;
      const x = sx + (hx - sx) * ph, y = Y0 - (Y0 - hy) * ph - 50 * Math.sin(ph * Math.PI);
      const col = hash(j * 5.1) < 0.5 ? 'rgba(255,216,102,0.8)' : 'rgba(142,162,184,0.8)';
      glow(g, x, y, 18, col, 1 - ph * 0.6);
    }
  }
}
