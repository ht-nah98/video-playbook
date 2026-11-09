// b02 · Tables for the sky (p2 câu 8–11) — DNA ferris, ERA tent (lều triển lãm: ảnh lịch sử). Cảnh trước b01 là 'fair' → rèm lều.
//  câu 8  "astronomers": đĩa bản đồ sao (navy, sao, chòm sao dây đứt) quay chậm + vé ASTRONOMERS
//  câu 9  Hipparchus (khung gương, IMAGINED) + tờ bảng kẻ ô "FIRST TABLE WE KNOW OF" + vé "MORE THAN 2,000 YEARS AGO"
//  câu 10 "lost": tờ bảng bay đi, vé xám "ORIGINAL: LOST"; "centuries later … Ptolemy": khung Almagest trượt vào
//  câu 11 hai khung trượt đi; đĩa sao quay lại giữa khung, vé THE SKY + ENORMOUS DISTANCES (đường nét đứt giữa các sao); tờ bài tập bị gạch xám
import { W, H, C, AR, TAU, clamp, hash, prog, lookup, must, outCubic, outBack, smooth, ground, photoImages, mirrorFrame, secTag, ticket, strike, star, line, dashed, rr, text, shade, brokenTriangle } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;

export default class SkyTables {
  static ERA = 'tent';
  static IMAGES = photoImages('hipparchus', 'almagest');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b02');
    const prevEnd = L(7).end;
    this.START = L(8).start;
    this.FROM = Math.max(this.START - 1.2, prevEnd + 0.5);
    this.T = {
      s: [8, 9, 10, 11].map(i => L(i).start), e: [8, 9, 10, 11].map(i => L(i).end),
      astro: w(8, 'astronomers'),
      hip: w(9, 'hipparchus'), astr9: w(9, 'astronomer'), first: w(9, 'first'), table: w(9, 'table'), years: w(9, 'years'),
      original: w(10, 'original'), lost: w(10, 'lost'), centuries: w(10, 'centuries'), ptolemy: w(10, 'ptolemy'),
      trig11: w(11, 'trigonometry'), sky: w(11, 'sky'), enormous: w(11, 'enormous'), distances: w(11, 'distances'), little: w(11, 'little'), worksheet: w(11, 'worksheet'),
    };
    this.Y2000 = must('2 * 1000', 2000).toLocaleString('en-US');
    // sao của đĩa: toạ độ trong đĩa bán kính 1 (hash — tất định)
    this.STARS = Array.from({ length: 34 }, (_, i) => { const a = hash(i * 12.9) * TAU, r = Math.sqrt(hash(i * 7.3 + 1)) * 0.9; return [r * Math.cos(a), r * Math.sin(a), 5 + hash(i * 3.1) * 9]; });
    this.CON = [3, 9, 14, 21, 27];                                          // chỉ số sao nối thành chòm
    this.FAR = [[3, 27], [9, 21]];                                          // cặp sao rất xa nhau (s11)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.astro, 'card'), c(T.hip + 0.1, 'card'), c(T.astr9 + 0.1, 'tick'), c(T.years, 'card'), c(T.table, 'pen'), c(T.lost + 0.05, 'snap'), c(T.centuries, 'tick'), c(T.ptolemy, 'card'), c(T.sky, 'card'), c(T.distances, 'pen'), c(T.worksheet + 0.5, 'pen')];
  }
  /** Đĩa bản đồ sao: viền đồng + bóng đèn, nền navy, sao quay chậm. k: bật vào; far: 0..1 vẽ đường nét đứt giữa các sao xa. */
  disc(g, cx, cy, R, t, k, far = 0) {
    if (k <= 0) return;
    const e = outBack(clamp(k), 1.2), spin = t * 0.05;
    g.save(); g.translate(cx, cy); g.scale(e, e);
    shade(g, () => { g.fillStyle = '#E9C97A'; g.beginPath(); g.arc(0, 0, R + 30, 0, TAU); g.fill(); }, { col: 'rgba(60,50,30,0.3)', blur: 30, oy: 14 });
    const gr = g.createLinearGradient(0, -R - 30, 0, R + 30); gr.addColorStop(0, '#FFF0C2'); gr.addColorStop(0.5, '#F2CF7A'); gr.addColorStop(1, '#D9A94A');
    g.fillStyle = gr; g.beginPath(); g.arc(0, 0, R + 30, 0, TAU); g.fill();
    g.fillStyle = '#FBF5E8'; g.beginPath(); g.arc(0, 0, R + 8, 0, TAU); g.fill();
    const sg = g.createRadialGradient(0, -R * 0.3, R * 0.1, 0, 0, R); sg.addColorStop(0, '#3E4F7E'); sg.addColorStop(1, '#1E2A47');
    g.fillStyle = sg; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fill();
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, on = 0.65 + 0.35 * Math.sin(t * 3 + i * 0.9); g.save(); g.shadowColor = 'rgba(255,190,70,0.9)'; g.shadowBlur = 10 * on; g.fillStyle = `rgba(255,${200 + 30 * on | 0},${120 + 60 * on | 0},1)`; g.beginPath(); g.arc((R + 20) * Math.cos(a), (R + 20) * Math.sin(a), 6, 0, TAU); g.fill(); g.restore(); }
    g.save(); g.beginPath(); g.arc(0, 0, R - 2, 0, TAU); g.clip(); g.rotate(spin);
    const P = this.STARS.map(([x, y, r]) => [x * R, y * R, r]);
    this.STARS.forEach((_, i) => star(g, P[i][0], P[i][1], P[i][2] * R / 250, clamp(k * 3 - hash(i) * 2)));
    g.setLineDash([4, 8]); g.strokeStyle = 'rgba(255,244,200,0.75)'; g.lineWidth = 2.5; g.beginPath(); this.CON.forEach((i, j) => j ? g.lineTo(P[i][0], P[i][1]) : g.moveTo(P[i][0], P[i][1])); g.stroke(); g.setLineDash([]);
    if (far > 0) for (const [a, b] of this.FAR) dashed(g, P[a][0], P[a][1], P[b][0], P[b][1], far, { color: '#FFD36B', w: 4, dash: [14, 10] });
    g.restore();
    g.restore();
  }
  sheet(g, cx, cy, k, rot) {                                             // tờ bảng kẻ ô (chưa có số — không bịa nội dung)
    if (k <= 0) return;
    const w = 360, h = 480, e = outBack(clamp(k), 1.1);
    g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(e, e);
    shade(g, () => { g.fillStyle = '#FFFDF7'; g.fill(rr(-w / 2, -h / 2, w, h, 12)); });
    g.strokeStyle = 'rgba(120,160,210,0.55)'; g.lineWidth = 2;
    for (let i = 1; i < 10; i++) { const u = clamp(k * 1.4 - i * 0.04); g.beginPath(); g.moveTo(-w / 2 + 22, -h / 2 + 24 + i * 44); g.lineTo(-w / 2 + 22 + (w - 44) * u, -h / 2 + 24 + i * 44); g.stroke(); }
    g.strokeStyle = 'rgba(224,69,123,0.0)'; g.strokeStyle = C.steelDk; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -h / 2 + 24); g.lineTo(0, h / 2 - 22); g.stroke();
    g.restore();
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'tent');
    secTag(g, 'Tables for the sky', { k: prog(t, S, S + 0.4), t });
    // ── đĩa sao: s8 (giữa) rồi lại s11 ──
    const d1 = prog(t, this.FROM + 0.3, this.FROM + 0.9), out1 = inC(prog(t, T.hip - 0.45, T.hip + 0.15));
    if (t < T.s[3] - 0.5 && out1 < 1) { g.save(); g.translate(0, 900 * out1); this.disc(g, 960, 520, 250, t, d1); g.restore(); }
    if (t >= T.s[3] - 0.5) this.disc(g, 1000, 500, 250, t, prog(t, T.s[3] + 1.1, Math.max(T.s[3] + 1.5, T.trig11 + 0.3)), prog(t, T.distances - 0.1, T.distances + 0.9));
    const ka = prog(t, T.astro - 0.1, T.astro + 0.35) * (1 - out1);
    if (ka > 0) ticket(g, 'ASTRONOMERS', 960, 850 + 400 * out1, { size: 46, k: ka });
    // ── s9: Hipparchus + tờ bảng + 2,000 năm ──
    const outF = inC(prog(t, T.s[3] + 0.4, T.s[3] + 1.0));
    const kH = prog(t, T.hip - 0.15, T.hip + 0.7) * (1 - outF);
    if (kH > 0) mirrorFrame(g, 'hipparchus', 215, 190, 420, 500, { k: kH, rot: -0.03, label: 'HIPPARCHUS · c. 190–120 BC', note: 'IMAGINED · NO LIKENESS SURVIVES', zoom: 1 + 0.05 * prog(t, T.hip, T.s[2] + 4), focus: [0.45, 0.25], t });
    const kg = prog(t, T.astr9 - 0.1, T.astr9 + 0.35) * (1 - prog(t, T.table - 0.3, T.table - 0.05));
    if (kg > 0) ticket(g, 'A GREEK ASTRONOMER', 940, 215, { size: 38, k: kg });
    const tab = prog(t, T.table - 0.15, T.table + 0.6), fly = prog(t, T.lost, T.lost + 0.8);
    if (tab > 0 && fly < 1) {
      this.sheet(g, 940 + 700 * inC(fly) * 0.6, 540 + 900 * inC(fly), tab, 0.03 + 1.2 * inC(fly));
      ticket(g, 'FIRST TABLE WE KNOW OF', 940 + 700 * inC(fly) * 0.6, 215 - 500 * inC(fly), { size: 38, k: tab });
    }
    const ky = prog(t, T.years - 0.2, T.years + 0.3) * (1 - prog(t, T.lost - 0.1, T.lost + 0.4));
    if (ky > 0) ticket(g, `MORE THAN ${this.Y2000} YEARS AGO`, 960, 965, { size: 40, color: C.angInk, edge: C.ang, k: ky });
    // ── s10: gốc đã mất, Ptolemy ──
    const kl = prog(t, T.lost + 0.1, T.lost + 0.5) * (1 - outF);
    if (kl > 0) ticket(g, 'ORIGINAL: LOST', 900, 380, { size: 44, color: C.badInk, edge: C.bad, k: kl });
    const kc = prog(t, T.centuries - 0.1, T.centuries + 0.35) * (1 - outF);
    if (kc > 0) ticket(g, 'CENTURIES LATER', 900, 560, { size: 40, k: kc });
    const kA = prog(t, T.ptolemy - 0.2, T.ptolemy + 0.7) * (1 - outF);
    if (kA > 0) mirrorFrame(g, 'almagest', 1170, 190, 420, 500, { k: kA, rot: 0.03, zoom: 1 + 0.04 * prog(t, T.ptolemy, T.s[3]), focus: [0.5, 0.2], t });
    if (kA > 0) ticket(g, "PTOLEMY'S ALMAGEST · LATIN MANUSCRIPT", 1380, 880, { size: 30, k: clamp(kA * 1.5 - 0.5) });      // vé nằm DƯỚI khung nghiêng, không đè credit
    // ── s11: bầu trời và khoảng cách khổng lồ, không phải tam giác nhỏ trên tờ bài tập ──
    const ks = prog(t, T.sky - 0.1, T.sky + 0.35);
    if (ks > 0) ticket(g, 'THE SKY', 1000, 175, { size: 44, k: ks });
    const ke = prog(t, T.enormous - 0.1, T.enormous + 0.4);
    if (ke > 0) ticket(g, 'ENORMOUS DISTANCES', 1000, 870, { size: 44, k: ke });
    const kw = prog(t, T.little - 0.15, T.worksheet + 0.2);
    if (kw > 0) {
      g.save(); g.translate(330, 740); g.rotate(-0.04); g.scale(outBack(kw), outBack(kw));
      shade(g, () => { g.fillStyle = C.white; g.fillRect(-180, -110, 360, 220); });
      for (let i = 0; i < 5; i++) line(g, -160, -50 + i * 30, 160, -50 + i * 30, 'rgba(120,160,210,0.35)', 2);
      text(g, 'WORKSHEET', -150, -66, { font: `800 30px ${AR}`, color: C.dim });
      g.save(); g.translate(30, 50); g.scale(0.22, 0.22); g.restore();
      g.fillStyle = C.bad; g.beginPath(); g.moveTo(-40, 90); g.lineTo(60, 90); g.lineTo(60, 20); g.closePath(); g.fill(); g.strokeStyle = C.badDk; g.lineWidth = 3; g.stroke();
      g.restore();
      strike(g, 150, 780, 520, 700, prog(t, T.worksheet + 0.25, T.worksheet + 0.7));
    }
  }
}
