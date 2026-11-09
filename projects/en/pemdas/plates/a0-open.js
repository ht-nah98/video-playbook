// Mở bài (p1, câu 0–11) — cảnh MẪU của DNA "Rules of the Road": một con đường dài nhìn từ trên xuống, camera trượt
// dọc đường theo lời. Toạ độ THẾ GIỚI: đường chính y = 540; camera = cửa sổ 1920 px bắt đầu ở camX(t).
//   đoạn 0  (x 0–1900)     bài viral sơn trên đường + bình luận cãi nhau bật lên ven đường
//   đoạn 1  (x 2000–4200)  NGÃ BA không biển: nhánh trên 9, nhánh dưới 1; mascot twoways; biển PEMDAS ở giữa
//   đoạn 2  (x 4400–6300)  cột biển 4 tầng: ( ) · ^ · × ÷ · + −  (đúng thứ tự lời đọc)
//   đoạn 3  (x 6500–8400)  sự thật (tảng đá khắc 1 + 1 = 2) hay luật chơi (biển do người cắm)?
//   đoạn 4  (x 8600–10500) lập trường: "CONVENTION" sơn trên đường, mascot point
//   đoạn 5  (x 10700–12900) ngã ba thứ hai (bằng chứng) → đêm xuống, đèn xe tắt → đen (sang intro)
import { W, H, clamp, prog, smooth, outCubic, hash, ERA, ROAD, verge, road, centerLine, paint, paintRow, sign, car,
  figure, typed, night, must, lookup } from '../kit.js';

const Y = 540;
const FORK = (x0) => [                                   // ngã ba: tách lên/xuống rồi nhập lại sau 1800 px
  g => { g.moveTo(x0, Y); g.bezierCurveTo(x0 + 300, Y, x0 + 320, Y - 250, x0 + 640, Y - 250); g.lineTo(x0 + 1160, Y - 250); g.bezierCurveTo(x0 + 1480, Y - 250, x0 + 1500, Y, x0 + 1800, Y); },
  g => { g.moveTo(x0, Y); g.bezierCurveTo(x0 + 300, Y, x0 + 320, Y + 250, x0 + 640, Y + 250); g.lineTo(x0 + 1160, Y + 250); g.bezierCurveTo(x0 + 1480, Y + 250, x0 + 1500, Y, x0 + 1800, Y); }];
const X2 = 11050;                                       // ngã ba thứ hai (bằng chứng)
const MAIN = [g => { g.moveTo(-600, Y); g.lineTo(2000, Y); }, g => { g.moveTo(3800, Y); g.lineTo(X2, Y); }, g => { g.moveTo(X2 + 1800, Y); g.lineTo(15000, Y); }];
const F1 = FORK(2000), F2 = FORK(X2);
const SUM = ['6', '÷', '2', '(', '1', '+', '2', ')', '=', '?'];
const COMMENTS = [['9. Obviously.', 0], ['It’s 1!!', 1], ['PEMDAS says 9', 0], ['Wrong. 1', 1], ['9', 0], ['1, read it again', 1], ['it’s 9 people', 0], ['ONE.', 1]];

export default class Open {
  static ERA = 'road';
  static POSES = ['twoways', 'point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      social: w(0, 'social'), sooner: w(0, 'sooner'), sum: w(0, 'sum'), comments: w(0, 'thousands'), comes: w(6, 'comes'), six: w(1, 'six'), what: w(1, 'what'), half: w(2, 'half'),
      nine: w(2, 'nine'), one: w(2, 'one'), both: w(3, 'both'), pemdas: w(3, 'pemdas'), learned: L(4).start,
      br: w(5, 'brackets'), pw: w(5, 'powers'), mul: w(5, 'multiplication'), div: w(5, 'division'), add: w(5, 'addition'),
      sub: w(5, 'subtraction'), today: L(6).start, truth: w(7, 'truth'), onep: w(7, 'one'), two: w(7, 'two'),
      rule: w(8, 'rule'), agreed: w(8, 'agreed'), stand: w(9, 'stand'), conv: w(9, 'convention'), arb: w(9, 'arbitrary'),
      evidence: L(10).start, sums: w(10, 'sums'), arguing: w(10, 'arguing'), see: L(11).start, wrong: w(11, 'wrong'), end: L(11).end,
    };
    // token đọc trong câu 1 (xe chạy qua đúng chữ đang đọc): six divided two times(bracket) one plus two
    const W1 = tl.lines[1].words, at = (word, n = 1) => { let c = 0; for (const x of W1) if (x.w === word && ++c === n) return x.start; throw new Error(word); };
    this.READ = [at('six'), at('divided'), at('two'), at('bracket'), at('one', 2), at('plus'), at('two', 2), at('two', 2) + 0.3, at('what'), at('what') + 0.2];
    this.nine = must('6 ÷ 2 × (1 + 2)', 9); this.oneAns = must('6 ÷ (2 × (1 + 2))', 1); must('1 + 1', 2);
    this.START = L(0).start; this.FROM = -0.6;
    const T = this.T;
    this.CAM = [[-1, 0], [T.half - 0.5, 0], [T.half + 0.4, 2050], [T.learned - 0.4, 2050], [T.learned + 0.6, 4400],
      [T.today - 0.3, 4400], [T.today + 0.7, 6500], [T.stand - 0.7, 6500], [T.stand + 0.2, 8600], [T.evidence - 0.4, 8600],
      [T.evidence + 0.6, 10400], [T.end + 2, 10560]];
    for (let i = 0; i + 1 < this.CAM.length; i++)       // đoạn đứng vẫn trôi 9 px/s (DNA §4; review M6)
      if (this.CAM[i][1] === this.CAM[i + 1][1]) this.CAM[i + 1][1] += 9 * (this.CAM[i + 1][0] - this.CAM[i][0]);
  }
  carX(t) { return 10380 + 600 * outCubic(prog(t, this.T.see, this.T.end)); }   // xe tới sát ngã ba thì tắt đèn: chưa chọn nhánh
  camX(t) { const K = this.CAM; let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1]; return x0 + (x1 - x0) * smooth(clamp((t - t0) / (t1 - t0))); }
  sfx() {
    const T = this.T, c = [{ t: T.sum, kind: 'type' }, { t: T.social, kind: 'pop' }, { t: T.sooner, kind: 'pop' }, { t: T.comes, kind: 'question' }];
    COMMENTS.forEach((_, i) => c.push({ t: T.comments + i * 0.28, kind: 'pop' }));
    this.READ.slice(0, 7).forEach(t => c.push({ t, kind: 'tick' }));
    c.push({ t: T.what, kind: 'question' }, { t: T.nine, kind: 'snap' }, { t: T.one, kind: 'snap' }, { t: T.pemdas, kind: 'pop' },
      { t: T.br, kind: 'pop' }, { t: T.pw, kind: 'pop' }, { t: T.mul, kind: 'pop' }, { t: T.add, kind: 'pop' },
      { t: T.onep, kind: 'type' }, { t: T.agreed, kind: 'pop' }, { t: T.conv, kind: 'snap' }, { t: T.sums, kind: 'question' },
      { t: T.see, kind: 'whoosh-long' });
    for (const k of [[T.half - 0.5], [T.learned - 0.4], [T.today - 0.3], [T.stand - 0.7], [T.evidence - 0.4]]) c.push({ t: k[0], kind: 'whoosh' });
    return c;
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, [...MAIN, ...F1, ...F2]);
    for (const p of [...MAIN, ...F1, ...F2]) centerLine(g, p);

    // ── đoạn 0: bài viral sơn trên đường; xe chạy qua từng chữ lúc đọc ──
    const ks = prog(t, T.sum - 0.2, T.sum + 1.2);
    const toks = paintRow(g, SUM, 380, Y, 120, { k: ks, color: (s) => s === '?' ? ROAD.yellow : ROAD.paint });
    let ri = -1; this.READ.forEach((rt, i) => { if (t >= rt) ri = i; });
    if (t <= this.READ[0] - 0.8)                        // xe chạy vào từ giây đầu (review H2): "người đọc" lướt mạng
      car(g, -160 + (toks[0].x - 100) * smooth(prog(t, this.FROM, this.T.sum)), Y + 92, 0, { s: 0.8 });
    if (t > this.READ[0] - 0.8 && t < T.half + 0.6) {
      const a = ri < 0 ? toks[0].x - 260 + 160 : toks[Math.min(ri, toks.length - 1)].x, b = toks[Math.min(ri + 1, toks.length - 1)].x;
      const nt = this.READ[ri + 1] ?? T.half, pt = this.READ[ri] ?? this.READ[0] - 0.8;
      car(g, a + (b - a) * outCubic(prog(t, pt, Math.min(nt, pt + 0.35))) , Y + 92, 0, { s: 0.8 });
    }
    if (ri >= 0 && ri < 8 && t < T.half) { const x = toks[ri].x; g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 52, Y - 74, 104, 148, 14); g.stroke(); g.restore(); }
    if (t > T.what) { const p = 1 + 0.12 * Math.sin(clamp((t - T.what) / 0.5) * Math.PI); paint(g, '?', toks[9].x, Y, Math.round(120 * p) > 130 ? 150 : 120, { color: ROAD.yellow }); }
    COMMENTS.forEach(([s, side], i) => {                // bình luận bật lên ven đường (trên = phe 9, dưới = phe 1)
      const x = 330 + i * 205 + hash(i * 7) * 50, y = side ? 880 + hash(i * 3) * 80 : 120 + hash(i * 5) * 80;
      const k = prog(t, T.comments + i * 0.28, T.comments + i * 0.28 + 0.3);
      const kd = i < 4 ? prog(t, (i < 2 ? T.social : T.sooner) + (i % 2) * 0.35, (i < 2 ? T.social : T.sooner) + (i % 2) * 0.35 + 0.3) : 0;
      if (k <= 0 && kd > 0) bubble(g, '· · ·', x, y, kd, side ? ROAD.AS : ROAD.MD);   // "đang gõ…": mạng xã hội từ giây đầu (review H2)
      if (k > 0) bubble(g, s, x, y, k, side ? ROAD.AS : ROAD.MD);
    });

    // ── đoạn 1: ngã ba không biển ──
    paint(g, String(this.nine), 2000 + 900, Y - 250, 150, { k: prog(t, T.nine - 0.1, T.nine + 0.2), color: ROAD.gold });
    paint(g, String(this.oneAns), 2000 + 900, Y + 250, 150, { k: prog(t, T.one - 0.1, T.one + 0.2), color: ROAD.gold });
    typed(g, 'left to right', 2000 + 760, Y - 420, prog(t, T.nine, T.nine + 0.6), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
    typed(g, 'glued-on × first', 2000 + 720, Y + 440, prog(t, T.one, T.one + 0.6), 'italic 600 44px "Cormorant Garamond"', ROAD.edge);
    sign(g, null, '?', 2000 + 560, Y, 50, prog(t, T.half, T.half + 0.4));
    if (t > T.pemdas - 0.1) rulebook(g, 2000 + 1180, Y, prog(t, T.pemdas - 0.1, T.pemdas + 0.3));
    if (t > T.both) { const k = prog(t, T.both, T.both + 0.6);
      for (const s of [-1, 1]) { g.save(); g.globalAlpha = 1; arrowTo(g, 2000 + 1040, Y + s * 200, 2000 + 1150, Y + s * 60, k); g.restore(); } }

    // ── đoạn 2: cột biển 4 tầng theo thứ tự đọc ──
    const S = [['P', '( )', T.br, 'Brackets'], ['E', 'x²', T.pw, 'Powers'], ['MD', '× ÷', T.mul, 'Multiply · Divide'], ['AS', '+ −', T.add, 'Add · Subtract']];
    S.forEach(([kd, s, tt, name], i) => {               // dãy biển ven đường, trái → phải đúng thứ tự ưu tiên
      const x = 4400 + 300 + i * 440, k = prog(t, tt - 0.1, tt + 0.3);
      sign(g, kd, s, x, 190, 66, k);
      typed(g, name, x, 330, k * 1.6, 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    });
    paintRow(g, ['ORDER', 'OF', 'OPERATIONS'], 4400 + 420, Y, 92, { k: prog(t, T.learned + 0.3, T.learned + 1.6) });
    if (t > T.div) { const k = prog(t, T.div, T.div + 0.4);              // × và ÷ CÙNG một biển: khoanh vàng
      g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 5; g.beginPath(); g.arc(4400 + 300 + 2 * 440, 190, 90 * outCubic(k), 0, 7); g.stroke(); g.restore(); }

    // ── đoạn 3: chân lý (đá khắc) hay luật chơi (biển người cắm)? ──
    stone(g, 6500 + 470, 250, prog(t, T.truth - 0.2, T.truth + 0.4), prog(t, T.onep, T.two + 0.3));
    typed(g, 'a law of nature?', 6500 + 470, 96, prog(t, T.truth, T.truth + 0.8), 'italic 600 54px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    sign(g, 'P', 'P', 6500 + 1300, 230, 50, prog(t, T.rule - 0.1, T.rule + 0.3)); sign(g, 'MD', '×', 6500 + 1430, 230, 50, prog(t, T.rule + 0.1, T.rule + 0.5));
    sign(g, 'AS', '+', 6500 + 1560, 230, 50, prog(t, T.rule + 0.3, T.rule + 0.7));
    typed(g, 'or a rule people agreed on?', 6500 + 1430, 96, prog(t, T.agreed - 0.3, T.agreed + 0.8), 'italic 600 54px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    paint(g, 'OR', 6500 + 1100, Y, 120, { k: prog(t, T.rule - 0.4, T.rule) });
    paint(g, 'WHERE FROM?', 6500 + 620, Y, 92, { k: prog(t, T.comes - 0.2, T.comes + 0.5) });   // review M5

    // ── đoạn 4: lập trường ──
    paint(g, 'CONVENTION', 8600 + 1200, Y, 150, { k: prog(t, T.conv - 0.05, T.conv + 0.6), color: ROAD.gold });
    typed(g, 'made by people', 8600 + 900, 780, prog(t, T.conv + 0.6, T.conv + 1.4), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    typed(g, '…but not arbitrary', 8600 + 900, 870, prog(t, T.arb - 0.3, T.arb + 0.6), 'italic 600 54px "Cormorant Garamond"', ROAD.gold);

    // ── đoạn 5: ngã ba thứ hai = bằng chứng ──
    paintRow(g, SUM, 10430, Y, 72, { k: prog(t, T.evidence + 0.2, T.evidence + 1.0), color: (s) => s === '?' ? ROAD.yellow : ROAD.paint });
    paint(g, String(this.nine), X2 + 900, Y - 250, 120, { k: prog(t, T.sums, T.sums + 0.3), color: ROAD.gold });
    paint(g, String(this.oneAns), X2 + 900, Y + 250, 120, { k: prog(t, T.sums + 0.2, T.sums + 0.5), color: ROAD.gold });
    typed(g, 'the evidence', 10440, 330, prog(t, T.evidence + 0.6, T.evidence + 1.4), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    if (t > T.see - 0.5) car(g, this.carX(t), Y + 60, 0, { light: clamp((t - T.see) / 0.8) });
    g.restore();

    // mascot (toạ độ màn hình) — chỉ quanh đúng câu được giao
    const kTwo = Math.min(prog(t, T.half + 0.2, T.half + 0.6), 1 - prog(t, T.one + 0.7, T.one + 1.1));   // chỉ câu 2 (review M10)
    figure(g, 'twoways', 1790, H, 620, 'road', kTwo, { crop: 0.82 });
    const kPt = Math.min(prog(t, T.stand - 0.3, T.stand + 0.1), 1 - prog(t, T.arb + 0.8, T.arb + 1.2));
    figure(g, 'point', 260, H, 700, 'road', kPt);
    // đêm xuống: quầng đèn xe thu lại rồi tắt — đen kín đúng lúc hết lời (+ đuôi 1.0 s của build.json)
    const kn = prog(t, T.see + 0.4, T.end + 0.6);
    night(g, kn, this.carX(t) + 260 - this.camX(t), Y + 60, 520);
    if (t > T.end + 0.6) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); }
  }
}

function bubble(g, s, x, y, k, color) {                // bình luận: bong bóng trắng viền màu phe, bật vào
  const p = Math.min(1.12, 1 + (1 - k) * -1 + Math.sin(k * Math.PI) * 0.12); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(p, p); g.font = '500 26px "IBM Plex Mono"'; const w = g.measureText(s).width + 40;
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(-w / 2, -32, w, 64, 14); g.fill(); g.beginPath(); g.moveTo(-14, 30); g.lineTo(0, 50); g.lineTo(10, 30); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = color; g.fillRect(-w / 2, -32, 8, 64);
  g.fillStyle = ROAD.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 4, 1); g.restore();
}
function rulebook(g, x, y, k) {                        // biển luật PEMDAS giữa hai nhánh (ô cỏ giữa ngã ba)
  const p = clamp(k); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.3 + 0.7 * p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-180, -62, 360, 124, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(-170, -52, 340, 104, 9); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 4); g.restore();
}
function arrowTo(g, x0, y0, x1, y1, k) {               // mũi tên vàng mảnh: hai phe cùng chỉ vào một luật
  if (k <= 0) return; const x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k, a = Math.atan2(y1 - y0, x1 - x0);
  g.strokeStyle = ROAD.gold; g.fillStyle = ROAD.gold; g.lineWidth = 5; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke();
  g.beginPath(); g.moveTo(x + Math.cos(a) * 14, y + Math.sin(a) * 14); g.lineTo(x + Math.cos(a + 2.5) * 16, y + Math.sin(a + 2.5) * 16); g.lineTo(x + Math.cos(a - 2.5) * 16, y + Math.sin(a - 2.5) * 16); g.fill();
}
function stone(g, x, y, k, kc) {                       // tảng đá ven đường, chữ khắc 1 + 1 = 2 hiện dần lúc đọc
  if (k <= 0) return; const p = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - p) * 60); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 24; g.shadowOffsetY = 14;
  g.fillStyle = '#8D8A82'; g.beginPath();
  for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2, r = (1 + (hash(i * 3.3) - 0.5) * 0.12); g.lineTo(Math.cos(a) * 230 * r, Math.sin(a) * 110 * r); }
  g.fill(); g.shadowColor = 'transparent';
  const s = '1 + 1 = 2', n = Math.round(s.length * clamp(kc));
  g.font = '800 92px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillText(s.slice(0, n).padEnd(s.length, ' '), 2, 4);
  g.fillStyle = '#3B3934'; g.fillText(s.slice(0, n).padEnd(s.length, ' '), 0, 0); g.restore();
}
