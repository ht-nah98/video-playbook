// d1 · スキナーの箱 (p2, câu 56–60) — mở ACT 3. DNA カプセル: ảnh thật trong thẻ acrylic, push chậm.
//  ① FROM…START  thẻ hồi 「第三幕 ループ」 (actCard); vài viên nang nằm sàn góc phải
//  ② câu 56      「新しいものではない」 — ảnh hộp Skinner chưa vào
//  ③ câu 57      ảnh hộp Skinner + sơ đồ (cần gạt, thức ăn) cạnh nhau; cột phải: 心理学者 / レバー / 動物
//  ④ câu 58      1957年 + ハト (tự vẽ) → 一冊の本
//  ⑤ câu 59–60   hai ảnh rơi xuống; bảng nhịp bấm (イメージ図): hàng trên đều, hàng dưới dồn khi thưởng ngẫu nhiên; えさ ストップ
//                → hàng dưới vẫn bấm lâu nhất
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, outCubic, smooth, ground, capsule, telop, write, card, heading,
  actCard, actCue, actTimes, photoTag, photoImages, strike, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 26, oy = 10) => { g.save(); g.shadowColor = 'rgba(70,50,40,0.18)'; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const PELLET = '#C79B52';                                             // hạt thức ăn: màu trung tính (không phải màu nghĩa)

function pigeon(g, x, y, s, peck) {                                   // chim bồ câu tự vẽ (nhỏ, trung tính), peck 0..1 = mổ
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#B9B3AB'; g.strokeStyle = '#8E887F'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-34, 0); g.lineTo(-74, -12); g.lineTo(-70, 14); g.closePath(); g.fill(); g.stroke();         // đuôi
  g.beginPath(); g.ellipse(0, 0, 46, 32, -0.12, 0, TAU); g.fill(); g.stroke();                                         // thân
  g.fillStyle = '#9E9890'; g.beginPath(); g.ellipse(-8, 2, 26, 16, -0.2, 0, TAU); g.fill();                             // cánh
  g.save(); g.translate(34, -20 + 16 * peck); g.rotate(0.5 * peck);
  g.fillStyle = '#B9B3AB'; g.beginPath(); g.arc(0, 0, 18, 0, TAU); g.fill(); g.stroke();
  g.fillStyle = '#C79B52'; g.beginPath(); g.moveTo(16, -3); g.lineTo(36, 3); g.lineTo(16, 9); g.closePath(); g.fill();   // mỏ
  g.fillStyle = C.ink; g.beginPath(); g.arc(6, -5, 3, 0, TAU); g.fill(); g.restore();
  g.strokeStyle = '#C79B52'; g.lineWidth = 4; g.beginPath(); g.moveTo(-8, 30); g.lineTo(-8, 46); g.moveTo(12, 30); g.lineTo(12, 46); g.stroke();
  g.restore();
}
function book(g, x, y, k) {                                           // quyển sách (一冊の本) — trang bìa số 1957
  if (k <= 0) return; const e = outCubic(clamp(k)); g.save(); g.translate(x, y); g.scale(e, e);
  shade(g, () => { g.fillStyle = '#EFE6D6'; g.fill(rr(-52, -66, 104, 132, 8)); }, 18, 8);
  g.fillStyle = '#C9B99B'; g.fill(rr(-52, -66, 16, 132, [8, 0, 0, 8]));
  g.strokeStyle = C.mute; g.lineWidth = 2; g.strokeRect(-26, -44, 62, 52);
  write(g, '1957', 5, 42, 1, { font: `700 30px ${JP}`, align: 'center' });
  g.restore();
}

export default class Skinner {
  static ERA = 'studio';
  static IMAGES = photoImages('skinner', 'skinnerScheme');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.START = L(56).start;
    this.FROM = Math.max(this.START - 2.6, L(55).end + 0.5);
    this.H0 = actTimes(this.FROM, this.START).o1 + 0.05;               // biển mục hiện sau khi thẻ hồi rút
    this.T = {
      l56: L(56).start, shin: w(56, '新しい'),
      l57: L(57).start, psy: w(57, '心理学者'), sk: w(57, 'スキナー'), lever: w(57, 'レバー'), doubutsu: w(57, '動物'), jikken: w(57, '実験'), e57: L(57).end,
      y1957: w(58, '1957年'), hato: w(58, 'ハト'), jikken58: w(58, '実験'), issatsu: w(58, '一冊'), matomete: w(58, 'まとめて'),
      l59: L(59).start, esa: w(59, 'えさ'), wakaranai: w(59, 'わからない'), hayaku: w(59, '速く'), yasumazu: w(59, '休まず'),
      stop: w(60, '止まって'), nagaku: w(60, '長く'), kono: w(60, 'この'), yarikata: w(60, 'やり方'), end: L(60).end,
    };
    const T = this.T;
    this.DROP1 = T.y1957 - 0.35;                                       // cột phải câu 57 rơi
    this.DROP2 = T.l59 - 0.3;                                          // hai ảnh rơi xuống nhường bảng nhịp
    // bảng nhịp: x = X0 + (tt − t0) × 100
    this.t0 = T.l59 + 0.5; this.X0 = 560;
    this.tickA = []; for (let tt = this.t0 + 0.2, i = 0; tt < T.stop + 0.1; tt += 0.55, i++) this.tickA.push([tt, i % 5 === 4]);
    this.tickA.push([T.stop + 0.7, false], [T.stop + 1.6, false]);   // đuôi: vài lần bấm rồi thôi
    this.tickB = []; let tb = this.t0 + 0.15, n = 0;
    while (tb < T.end - 0.15) { this.tickB.push([tb, tb < T.stop && hash(n * 5.7 + 1) > 0.76]); tb += 0.2 + 0.07 * hash(n * 2.9 + 3); n++; }
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const A = actTimes(this.FROM, this.START);
    return [actCue(this.FROM, this.START), c(this.H0 + 0.1, 'pen'), c(T.l57 + 0.15, 'card'), c(T.sk, 'pen'), c(T.lever, 'tick'), c(T.lever + 0.7, 'card'),
      c(T.doubutsu, 'pop'), c(T.y1957, 'pen'), c(T.hato, 'pop'), c(T.issatsu, 'pop'), c(this.DROP2 + 0.6, 'card'), c(this.t0 + 1.7, 'tick'),
      c(this.t0 + 3.4, 'tick'), c(T.wakaranai, 'pen'), c(T.hayaku, 'tick'), c(T.stop, 'pop'), c(T.nagaku, 'pen'), c(this.t0 + 5.5, 'tick')];
  }
  chart(g, t) {
    const T = this.T, kc = out(t, this.DROP2 + 0.5, 0.7), X0 = this.X0, Y = [400, 630];
    if (kc <= 0) return;
    const bx = 120, by = 250, bw = 1680, bh = 640;
    g.save(); g.translate(0, (1 - kc) * 900);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(bx, by, bw, bh, 34)); }, 34, 14);
    g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(bx, by, bw, bh, 34));
    write(g, '※イメージ図', bx + bw - 40, by + bh - 28, 1, { font: `500 28px ${JP}`, color: '@dim', align: 'right' });
    // 2 hàng: nhãn bên trái, đường nền, tick
    [['回数が決まっている', 0], ['何回目に出るか、わからない', 1]].forEach(([s, r]) => {
      const y = Y[r];
      write(g, s, bx + 40, y - 70, 1, { font: `700 30px ${JP}`, color: r ? '@ink' : '@dim' });
      g.strokeStyle = C.line; g.lineWidth = 2; g.beginPath(); g.moveTo(X0 - 20, y + 30); g.lineTo(X0 + 1200, y + 30); g.stroke();
      capsule(g, bx + 70, y + 10, 26, 1, { tone: r ? 'pink' : 'blank', ground: false, rot: 0.5 });
    });
    const draw = (arr, y, rr_) => arr.forEach(([tt, rw]) => { if (t < tt) return; const x = X0 + (tt - this.t0) * 100, a = clamp((t - tt) / 0.12);
      g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.globalAlpha = a; g.beginPath(); g.moveTo(x, y + 30); g.lineTo(x, y + 30 - 64 * a); g.stroke();
      if (rw) { g.fillStyle = PELLET; g.beginPath(); g.arc(x, y - 36 - 6 * (1 - a), 11, 0, TAU); g.fill(); g.strokeStyle = 'rgba(92,86,72,0.5)'; g.lineWidth = 2; g.stroke(); }
      g.globalAlpha = 1; });
    draw(this.tickA, Y[0], 0); draw(this.tickB, Y[1], 1);
    // えさ、ストップ
    const ks = prog(t, T.stop - 0.1, T.stop + 0.4);
    if (ks > 0) { const x = X0 + (T.stop - this.t0) * 100; g.save(); g.setLineDash([8, 9]); g.strokeStyle = C.mute; g.lineWidth = 3; g.beginPath(); g.moveTo(x, by + 4); g.lineTo(x, by + 4 + 560 * outCubic(ks)); g.stroke(); g.restore();
      telop(g, 'えさ、ストップ', x, by - 40, ks, { size: 40 }); }
    if (t > T.wakaranai - 0.1) telop(g, '速く、休まず', X0 + 300, 790, prog(t, T.hayaku - 0.1, T.hayaku + 0.5), { size: 40 });
    const kl = prog(t, T.nagaku - 0.1, T.nagaku + 0.6);
    if (kl > 0) telop(g, '最後まで押し続けた', 1420, 790, kl, { size: 44 });
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    // viên nang nằm sàn (có ngay từ FROM + 0.3)
    [[1660, 862, 40, 0.4, 'pink'], [1738, 880, 28, -0.5, 'mint'], [1584, 884, 24, 0.9, 'lav']].forEach(([x, y, r, a, tn], i) =>
      capsule(g, x, y, r, prog(t, F + 0.3 + i * 0.1, F + 0.8 + i * 0.1), { tone: tn, rot: a }));
    heading(g, 3, 'スキナーの箱', prog(t, this.H0, this.H0 + 1.0));
    actCard(g, t, F, this.START, 3);
    // câu 56
    if (t > this.H0 && t < T.l57 + 0.2) { const o = out(t, T.l57 - 0.2, 0.5); g.save(); g.translate(0, 700 * o);
      telop(g, 'この設計は、新しいものではない', 1260, 235, prog(t, this.H0 + 0.2, this.H0 + 0.9), { size: 48 }); g.restore(); }
    // câu 57–58: hai ảnh (rơi xuống ở câu 59)
    const dr2 = out(t, this.DROP2, 0.6);
    if (t > F + 0.2 && dr2 < 1) {
      g.save(); g.translate(0, 1000 * dr2);
      photoTag(g, 'skinner', 150, 270, 600, 420, prog(t, F + 0.3, F + 1.0), { zoom: 1 + 0.07 * prog(t, F + 0.3, T.e57 + 4), focus: [0.5, 0.5], rot: -0.03 });
      photoTag(g, 'skinnerScheme', 830, 270, 480, 420, prog(t, T.lever + 0.3, T.lever + 1.0), { rot: 0.025 });
      // cột phải câu 57
      g.save(); g.translate(0, 1000 * out(t, this.DROP1, 0.6));
      telop(g, '心理学者 スキナー', 1585, 330, prog(t, T.sk - 0.2, T.sk + 0.5), { size: 40 });
      telop(g, 'レバーのついた箱', 1585, 450, prog(t, T.lever - 0.1, T.lever + 0.5), { size: 40 });
      telop(g, '動物で実験', 1585, 570, prog(t, T.doubutsu - 0.1, T.doubutsu + 0.5), { size: 40 });
      g.restore();
      // cột phải câu 58
      if (t > T.y1957 - 0.4) {
        write(g, '1957年', 1585, 400, prog(t, T.y1957 - 0.1, T.y1957 + 0.4), { font: `700 110px ${MIN}`, align: 'center' });
        telop(g, 'ハトの実験', 1585, 520, prog(t, T.hato - 0.1, T.hato + 0.5), { size: 44 });
        pigeon(g, 1490, 700, 1.15 * outCubic(prog(t, T.hato - 0.1, T.hato + 0.4)), 0.5 + 0.5 * Math.sin(t * 9));
        const kb = prog(t, T.issatsu - 0.05, T.issatsu + 0.5);
        if (kb > 0) { g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 5; g.beginPath(); g.moveTo(1550, 700); g.lineTo(1550 + 60 * outCubic(kb), 700); g.stroke(); g.restore(); }
        book(g, 1690, 700, kb);
        telop(g, '一冊の本に', 1590, 850, prog(t, T.matomete - 0.1, T.matomete + 0.5), { size: 40 });
      }
      g.restore();
    }
    this.chart(g, t);
  }
}
