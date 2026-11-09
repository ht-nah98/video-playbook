// c3 · あと少しだった (p2, câu 46–51) — DNA ACT 2 b: near-miss = viên lăn sát khe vàng rồi trượt. Ảnh: slot (Jeff Kubina, CC BY-SA 2.0).
//  máy slot (kit slot, s 0.85, trái): cuộn 1·2 dừng ở 7, cuộn 3 dừng LỆCH một ô (7 nằm ngay trên đường thắng) = 「あと少し」; câu 49 kéo cần lần nữa
//  câu 46 ảnh slot thật · câu 47 2009年 イギリスの研究: hai não, cùng một vùng sáng (当たり ＝ あと少し) · câu 48 mặt xám 「気持ちよくない」
//  câu 49 「もう一度」 vòng mũi tên · câu 50 ネバダ州 1989年 (nhãn; KHÔNG nói "cấm") · câu 51 偶然 ＋ 作る (bánh răng)
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, telop, write, capsule, slot, slotStop, photoTag, photoImages, heading, rr } from '../kit.js';
import { out, shade, ring, underline, bump, fillGaps } from './g2-util.js';

const ST7 = slotStop('seven'), SX = 170, ST = 235, SS = 0.85;
function brain(g, cx, cy, s, k, lit) {
  const e = outCubic(clamp(k)); if (e <= 0) return;
  g.save(); g.translate(cx, cy); g.scale(s * e, s * e);
  g.fillStyle = '#F7CFDC'; g.strokeStyle = '#A8687E'; g.lineWidth = 5 / s;
  const q = new Path2D();
  q.moveTo(-6, -62); q.bezierCurveTo(-40, -86, -90, -60, -84, -16); q.bezierCurveTo(-104, 10, -78, 52, -44, 50);
  q.bezierCurveTo(-30, 70, 0, 66, 6, 50); q.bezierCurveTo(30, 66, 66, 56, 70, 30); q.bezierCurveTo(98, 14, 92, -30, 66, -40);
  q.bezierCurveTo(62, -74, 20, -82, -6, -62); q.closePath();
  shade(g, () => g.fill(q), 20 / s, 8 / s); g.stroke(q);
  g.lineCap = 'round'; g.lineWidth = 4 / s;
  [[[-6, -62], [-14, -20], [4, 10], [6, 50]], [[-60, -30], [-36, -36], [-30, -10]], [[-62, 20], [-40, 10], [-28, 28]], [[40, -52], [30, -26], [48, -10]], [[34, 14], [56, 8], [64, 28]]].forEach(P => {
    g.beginPath(); g.moveTo(...P[0]); for (let i = 1; i < P.length; i++) g.lineTo(...P[i]); g.stroke(); });
  if (lit > 0) { const gr = g.createRadialGradient(14, 2, 2, 14, 2, 34); gr.addColorStop(0, `rgba(240,90,140,${0.95 * lit})`); gr.addColorStop(1, 'rgba(240,90,140,0)'); g.fillStyle = gr; g.beginPath(); g.arc(14, 2, 34, 0, TAU); g.fill(); }
  g.restore();
}
function gear(g, cx, cy, r, rot, k) {
  if (k <= 0) return; g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(outCubic(k), outCubic(k));
  const q = new Path2D(); for (let i = 0; i < 16; i++) { const a = i * TAU / 16, a2 = a + TAU / 32, R = i % 2 ? r * 0.8 : r; q.lineTo(R * Math.cos(a), R * Math.sin(a)); q.lineTo(R * Math.cos(a2), R * Math.sin(a2)); } q.closePath();
  shade(g, () => { g.fillStyle = '#D9D3C8'; g.fill(q); }, 16, 6); g.strokeStyle = '#8F8A80'; g.lineWidth = 4; g.stroke(q);
  g.fillStyle = C.paper; g.beginPath(); g.arc(0, 0, r * 0.28, 0, TAU); g.fill(); g.stroke(); g.restore();
}
function die(g, cx, cy, s, k) {
  if (k <= 0) return; const e = outCubic(k);
  g.save(); g.translate(cx, cy); g.rotate(0.12); g.scale(e, e);
  shade(g, () => { g.fillStyle = C.white; g.fill(rr(-s, -s, 2 * s, 2 * s, s * 0.28)); }, 20, 8); g.strokeStyle = C.faint; g.lineWidth = 2; g.stroke(rr(-s, -s, 2 * s, 2 * s, s * 0.28));
  g.fillStyle = C.ink; [[-0.5, -0.5], [0.5, -0.5], [0, 0], [-0.5, 0.5], [0.5, 0.5]].forEach(([a, b]) => { g.beginPath(); g.arc(a * s, b * s, s * 0.14, 0, TAU); g.fill(); }); g.restore();
}
export default class Atosukoshi {
  static ERA = 'studio';
  static IMAGES = photoImages('slot');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l46: S(46), suro: w(46, 'スロット'), ato: w(46, 'あと'), tomaru: w(46, '止まる'),
      l47: S(47), y2009: w(47, '2009年'), igirisu: w(47, 'イギリス'), kenkyu: w(47, '研究'), okane: w(47, 'お金'), nou: w(47, '脳'), onaji: w(47, '同じ'),
      l48: S(48), kimochi: w(48, '気持ち'), arimasen: w(48, 'ありません'),
      l49: S(49), mou: w(49, 'もう'), yaritaku: w(49, 'やりたく'),
      l50: S(50), nevada: w(50, 'ネバダ'), y1989: w(50, '1989年'), kaisha: w(50, '会社'), mitomerarenai: w(50, '認められない'),
      l51: S(51), gusen: w(51, '偶然'), tsukuru: w(51, '作る'), dekiru: w(51, 'できる'), end: E(51),
    };
    this.START = S(46);
    this.FROM = Math.max(this.START - 1.2, E(45) + 0.5);
    this.Y2009 = must('2009', 2009); this.Y1989 = must('1989', 1989);
    const T = this.T, F = this.FROM;
    // hai lượt kéo cần: [kéo, dừng cuộn 1, 2, 3]
    this.PULL = [[F + 0.5, T.l46 + 0.7, T.l46 + 1.6, T.tomaru + 0.35], [T.mou - 0.1, T.mou + 0.9, T.mou + 1.4, T.mou + 1.95]];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind }), [a, b] = this.PULL;
    return fillGaps([c(Math.max(a[0], this.FROM + 0.8), 'reel'), c(a[1], 'tick'), c(a[2], 'tick'), c(a[3], 'pop'), c(T.suro, 'card'), c(T.y2009, 'pen'), c(T.nou, 'pop'), c(T.onaji, 'tick'),
      c(T.kimochi, 'pen'), c(b[0], 'reel'), c(T.yaritaku, 'pen'), c(T.nevada, 'pen'), c(T.y1989, 'tick'), c(T.mitomerarenai, 'pen'), c(T.gusen, 'pop'), c(T.tsukuru, 'pen')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  /** trạng thái slot: cuộn i quay tới lúc dừng; cuộn 3 dừng LỆCH một ô (7 ngay trên đường thắng). */
  slotState(t) {
    const fin = [ST7, ST7, ST7 + 1], last = [...this.PULL].reverse().find(p => t >= p[0]) ?? this.PULL[0];
    const reels = [], blur = [];
    for (let i = 0; i < 3; i++) { const r = t < last[0] ? 0 : 1 - outCubic(prog(t, last[0] + 0.1, last[1 + i])); reels.push(fin[i] + r * (8 + 2 * i)); blur.push(Math.min(1, r * (1.5 + 0.3 * i))); }
    const done = t >= last[3];
    return { reels, blur, lever: t >= last[0] && t < last[0] + 0.5 ? 1 - Math.abs(prog(t, last[0], last[0] + 0.5) * 2 - 1) : 0, done };
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 2, 'あと少しだった', prog(t, F + 0.3, F + 1.3));
    const sp = this.slotState(t);
    slot(g, SX, ST, prog(t, F + 0.05, F + 0.6), { s: SS, reels: sp.reels, blur: sp.blur, lever: sp.lever, lit: false });
    // nhãn 「あと少し」 khi cuộn 3 dừng lệch
    const kn = prog(t, this.PULL[0][3] + 0.1, this.PULL[0][3] + 0.6);
    if (kn > 0) { telop(g, 'あと少し！', SX + 238 * 1, ST - 36 + 4, kn, { size: 40 }); }
    // ── bảng phải ──
    const px = SX + 560 * SS + 60;                                // ≈ 706
    const win = (a, b, fn) => { if (t < a - 0.3 || t > b + 0.9) return; const e = out(t, a - 0.3, 0.7), x = out(t, b, 0.7); g.save(); g.translate((1 - e) * 1200 - x * 1500, 0); fn(); g.restore(); };
    win(T.l46, T.l47, () => photoTag(g, 'slot', 800, 270, 900, 560, 1, { zoom: 1 + 0.08 * prog(t, T.l46, T.l47), focus: [0.5, 0.45], rot: 0.02 }));
    win(T.y2009, T.l48, () => {
      write(g, `${this.Y2009}年`, 1260, 340, prog(t, T.y2009, T.y2009 + 0.5), { font: `700 110px ${MIN}`, align: 'center' });
      write(g, 'イギリスの研究', 1260, 420, prog(t, T.igirisu, T.igirisu + 0.5), { font: `700 52px ${MIN}`, align: 'center' });
      brain(g, 1040, 610, 2.1, prog(t, T.nou - 0.1, T.nou + 0.4), prog(t, T.okane, T.okane + 0.5));
      brain(g, 1480, 610, 2.1, prog(t, T.nou + 0.2, T.nou + 0.7), prog(t, T.onaji, T.onaji + 0.5));
      write(g, '＝', 1260, 640, prog(t, T.onaji, T.onaji + 0.4), { font: `700 96px ${MIN}`, align: 'center' });
      write(g, 'お金が当たった', 1040, 780, prog(t, T.okane, T.okane + 0.4), { font: `700 40px ${MIN}`, align: 'center' });
      write(g, 'あと少し', 1480, 780, prog(t, T.onaji, T.onaji + 0.4), { font: `700 40px ${MIN}`, align: 'center' });
    });
    win(T.l48, T.l49, () => {
      const k = prog(t, T.kimochi - 0.1, T.kimochi + 0.5), e = outCubic(k), cx = 1260, cy = 520;
      if (k > 0) { g.save(); g.translate(cx, cy); g.scale(e, e); shade(g, () => { g.fillStyle = '#E7E3DC'; g.beginPath(); g.arc(0, 0, 130, 0, TAU); g.fill(); }, 20, 8);
        g.strokeStyle = '#8F8A80'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -30); g.lineTo(-30, -44); g.moveTo(60, -30); g.lineTo(30, -44); g.stroke();
        g.fillStyle = '#6B665D'; g.beginPath(); g.arc(-42, -10, 10, 0, TAU); g.arc(42, -10, 10, 0, TAU); g.fill();
        g.beginPath(); g.arc(0, 78, 46, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.restore(); }
      write(g, '気持ちよくない', cx, 740, prog(t, T.kimochi, T.kimochi + 0.5), { font: `700 56px ${MIN}`, align: 'center' });
    });
    win(T.l49, T.l50, () => {
      const k = prog(t, T.mou - 0.1, T.mou + 0.5);
      write(g, 'もう一度', 1260, 560, k, { font: `700 130px ${MIN}`, align: 'center' });
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 8; g.lineCap = 'round'; const a0 = -1.2 + t * 1.4; g.beginPath(); g.arc(1260, 520, 250, a0, a0 + TAU * 0.78 * outCubic(prog(t, T.mou, T.yaritaku + 0.6))); g.stroke(); g.restore();
    });
    win(T.l50, T.l51, () => {
      const x = 1260; shade(g, () => { g.fillStyle = C.white; g.fill(rr(x - 400, 300, 800, 460, 36)); }, 34, 14); g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(x - 400, 300, 800, 460, 36));
      write(g, 'ネバダ州', x - 340, 410, prog(t, T.nevada, T.nevada + 0.5), { font: `700 84px ${MIN}` });
      write(g, `${this.Y1989}年`, x + 360, 410, prog(t, T.y1989 - 0.1, T.y1989 + 0.5), { font: `700 84px ${MIN}`, align: 'right' });
      write(g, 'ある会社の仕組み', x - 340, 520, prog(t, T.kaisha, T.kaisha + 0.5), { font: `700 48px ${MIN}`, color: '@dim' });
      write(g, '当たりのすぐそばで止まる', x - 340, 600, prog(t, T.kaisha + 0.6, T.kaisha + 1.4), { font: `700 48px ${MIN}` });
      write(g, '認められない', x - 340, 700, prog(t, T.mitomerarenai - 0.1, T.mitomerarenai + 0.6), { font: `700 64px ${MIN}` });
      underline(g, x - 340, x - 340 + 330, 716, prog(t, T.mitomerarenai + 0.5, T.mitomerarenai + 1.0));
    });
    win(T.l51, T.end + 6, () => {
      die(g, 1060, 520, 90, prog(t, T.gusen - 0.1, T.gusen + 0.4));
      write(g, '偶然', 1060, 700, prog(t, T.gusen, T.gusen + 0.4), { font: `700 60px ${MIN}`, align: 'center' });
      write(g, '＋', 1260, 548, prog(t, T.tsukuru - 0.4, T.tsukuru), { font: `700 100px ${MIN}`, align: 'center' });
      gear(g, 1470, 520, 100, t * 0.6, prog(t, T.tsukuru - 0.1, T.tsukuru + 0.5));
      write(g, '作る', 1470, 700, prog(t, T.tsukuru, T.tsukuru + 0.4), { font: `700 60px ${MIN}`, align: 'center' });
      underline(g, 1390, 1550, 722, prog(t, T.dekiru, T.dekiru + 0.5));
    });
    this.cap(g, t, T.l46 - 0.1, T.l47 - 0.1, [['スロットの「あと少し」で止まる場面']], 52);
    this.cap(g, t, T.l47 - 0.1, T.l48 - 0.1, [['当たりのときと 同じ脳の場所が働いた']], 52);
    this.cap(g, t, T.l48 - 0.1, T.l49 - 0.1, [['「あと少し」は、気持ちよくない']]);
    this.cap(g, t, T.l49 - 0.1, T.l50 - 0.1, [['それなのに、もう一度やりたくなる']]);
    this.cap(g, t, T.l50 - 0.1, T.l51 - 0.1, [['当たりのそばで止まる仕組みは「認められない」']], 50);
    this.cap(g, t, T.l51 - 0.1, T.end + 4, [['「あと少し」は 作ることもできる']]);
  }
}
