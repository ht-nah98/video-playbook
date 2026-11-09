// ACT FIVE · "The answer" + lời chào (p2, câu 90–97) — cảnh CUỐI. Toạ độ THẾ GIỚI: đường chính y = 540; camera = cửa sổ camX(t).
//   đoạn A (x 0–1920)    "LAW or CONVENTION ?" sơn trên đường; biển PEMDAS cắm ven đường; LAW bị gạch, CONVENTION vàng
//   đoạn B (x 2200–4560) ngã ba mơ hồ 6 ÷ 2(1 + 2): RÀO NGOẶC đập xuống → (6 ÷ 2)(1 + 2), nhánh 1 bị chặn, hết "?"
//                        "Just add the brackets": xe chạy một đường tới 9, ✓
//   đoạn C (x 4560–)     xe chạy đi; mascot peace-back (phải), biển SUBSCRIBE, SEE YOU SOON → đêm xuống, đen ~1 s cuối
// Nền đường loang từ dòng "Parenthesis must be used" của f1-minus.
import { W, H, clamp, prog, smooth, outCubic, outBack, ROAD, verge, road, centerLine, paint, paintRow, sign, car,
  barrier, figure, card, typed, strike, hand, night, must, lookup } from '../kit.js';

const Y = 540, FX = 3120;
const fork = (x0) => [-1, 1].map(s => g => { const y = Y + s * 250;
  g.moveTo(x0, Y); g.bezierCurveTo(x0 + 150, Y, x0 + 150, y, x0 + 300, y); g.lineTo(x0 + 1240, y);
  g.bezierCurveTo(x0 + 1390, y, x0 + 1390, Y, x0 + 1540, Y); });
const PATHS = [g => { g.moveTo(-600, Y); g.lineTo(FX, Y); }, ...fork(FX), g => { g.moveTo(FX + 1540, Y); g.lineTo(9000, Y); }];

export default class Answer {
  static ERA = 'road';
  static POSES = ['thumb', 'peace-back'];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      answer: w(90, 'answer'), question: w(90, 'question'), pemdas: w(91, 'pemdas'), agreed: w(91, 'agreed'), shortcut: w(92, 'shortcut'),
      brackets: w(92, 'brackets'), tool: w(92, 'tool'), lesson: w(93, 'lesson'), someone: w(94, 'someone'),
      everybody: w(94, 'everybody'), same: w(94, 'same'), just: w(94, 'just'), add: w(94, 'add'), good: w(95, 'good'),
      argue: w(95, 'argue'), thank: w(96, 'thank'), subscribe: w(97, 'subscribe'), see: w(97, 'see'), end: L(97).end,
    };
    this.ans = must('(6 ÷ 2) × (1 + 2)', 9); this.other = must('6 ÷ (2 × (1 + 2))', 1);
    this.START = L(90).start; this.FROM = this.START - 1.2;
    this.WIPE = [1100, 846];                               // dòng "Parenthesis must be used" của f1-minus
    const T = this.T;
    this.CAM = [[this.FROM, 0], [T.shortcut - 0.3, 150], [T.brackets - 0.15, 1700], [T.just, 1760], [T.argue, 2800],
      [T.argue + 4.0, 4840], [T.end + 3, 4840]];
    this.CAR = [[T.someone - 0.4, 1450], [T.someone + 1.0, 2000], [T.just, 2000], [T.argue, FX + 420], [T.argue + 4.0, 5340], [T.end, 6090], [T.end + 3, 6400]];
  }
  static key(K, t, ease = smooth) { let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
    const [t0, x0] = K[i], [t1, x1] = K[i + 1]; return x0 + (x1 - x0) * ease(clamp((t - t0) / (t1 - t0))); }
  camX(t) { return Answer.key(this.CAM, t); }
  carX(t) { return Answer.key(this.CAR, t, t > this.T.argue ? (x => x) : smooth); }
  carY(x) { return Y + 80 - 260 * smooth(clamp((x - FX) / 300)) + 260 * smooth(clamp((x - FX - 1240) / 300)); }
  sfx() {
    const T = this.T;
    return [{ t: T.question, kind: 'question' }, { t: T.pemdas, kind: 'pop' }, { t: T.agreed, kind: 'snap' },
      { t: T.shortcut - 0.3, kind: 'whoosh' }, { t: T.brackets, kind: 'impact' }, { t: T.everybody, kind: 'pop' },
      { t: T.just, kind: 'whoosh' }, { t: T.argue, kind: 'correct' }, { t: T.thank + 0.4, kind: 'pop' }, { t: T.subscribe, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, PATHS);
    for (const p of PATHS) centerLine(g, p);

    // ── đoạn A: câu hỏi ở tựa bài → câu trả lời ──
    const q = paintRow(g, ['LAW', 'or', 'CONVENTION', '?'], 330, Y, 92, { k: prog(t, T.answer - 0.1, T.question + 0.4),
      color: (s, i) => (i === 2 && t > T.agreed) ? ROAD.gold : i === 3 ? ROAD.yellow : ROAD.paint });
    strike(g, q[0].x - 110, Y + 10, q[0].x + 110, Y - 10, prog(t, T.agreed, T.agreed + 0.3), { color: ROAD.red, w: 9 });
    rulebook(g, 1050, 860, prog(t, T.pemdas - 0.1, T.pemdas + 0.3));
    typed(g, 'how we agreed to read and write', 1050, 965, prog(t, T.agreed, T.agreed + 1.2), 'italic 600 44px "Cormorant Garamond"', ROAD.edge, { align: 'center' });

    // ── đoạn B: ngã ba mơ hồ → rào ngoặc ──
    const T1 = ['6', '÷', '2'], T2 = ['(', '1', '+', '2', ')'];
    const p1 = paintRow(g, T1, 2370, Y, 92, { k: 0 }), e1 = p1.at(-1).x + 28, p2 = paintRow(g, T2, e1 + 140, Y, 92, { k: 0 });  // k 0: chỉ đo
    gapLine(g, p1[0].x - 70, p2.at(-1).x + 40);          // vạch giữa nhường cả đoạn biểu thức: không vạch nào đọc thành dấu trừ
    const r1 = paintRow(g, T1, 2370, Y, 92), end1 = r1.at(-1).x + 28;
    const r2 = paintRow(g, T2, end1 + 140, Y, 92);
    const kf = prog(t, T.brackets - 0.05, T.brackets + 0.17);
    fence(g, r1[0].x - 62, Y, -1, kf); fence(g, end1 + 55, Y, 1, kf);
    const kq = 1 - prog(t, T.tool - 0.1, T.tool + 0.15);
    if (kq > 0) sign(g, null, '?', FX + 330, Y, 61, kq);
    sign(g, 'P', '( )', FX + 330, Y, 61, prog(t, T.tool + 0.1, T.tool + 0.45));
    barrier(g, FX + 255, Y + 90, FX + 255, Y + 390, prog(t, T.tool, T.tool + 0.4));
    paint(g, String(this.ans), FX + 640, Y - 250, 120, { color: ROAD.gold });
    paint(g, String(this.other), FX + 640, Y + 250, 120);
    const kt = prog(t, T.argue - 0.1, T.argue + 0.35);
    if (kt > 0) hand(g, [[FX + 772, Y - 250], [FX + 808, Y - 210], [FX + 880, Y - 300]], { w: 12, color: ROAD.gold, k: kt, seed: 2, jit: 1 });
    COMMENTS.forEach(([s, x, y], i) => bubble(g, s, x, y, prog(t, T.everybody + i * 0.3, T.everybody + i * 0.3 + 0.3)));
    typed(g, 'the lesson:', 1700 + 600, 800, prog(t, T.lesson, T.lesson + 0.6), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    typed(g, 'just add the brackets.', 1700 + 600, 870, prog(t, T.just, T.add + 0.5), 'italic 600 54px "Cormorant Garamond"', ROAD.gold);

    // ── đoạn C: lời chào ──
    const x = this.carX(t), y = this.carY(x);
    if (t > T.someone - 0.6) car(g, x, y, Math.atan2(this.carY(x + 6) - this.carY(x - 6), 12), { s: 0.8, light: prog(t, T.see - 1.5, T.see - 0.5) });
    g.restore();

    // biển kênh + lời chào: TOẠ ĐỘ MÀN HÌNH (camera còn trôi — đặt theo thế giới thì trượt vào dưới biển tên mục)
    board(g, 820, 250, prog(t, T.thank + 0.4, T.thank + 0.9));   // hiện từ lời cảm ơn: ~4 s để đọc tên kênh
    paint(g, 'SEE YOU SOON', 820, Y, 72, { k: prog(t, T.see - 0.2, T.see + 0.4), color: ROAD.gold });
    // mascot (toạ độ màn hình)
    const kTh = Math.min(prog(t, T.brackets - 0.25, T.brackets + 0.1), 1 - prog(t, T.lesson + 0.9, T.lesson + 1.3));
    figure(g, 'thumb', 250, H, 680, 'road', kTh);
    figure(g, 'peace-back', 1670, H, 720, 'road', prog(t, T.thank + 0.8, T.thank + 1.2));   // phải: camera đã gần dừng, không vật nào trượt qua sau lưng
    card(g, 'road', prog(t, this.FROM + 0.4, this.FROM + 1.6), 'ACT FIVE · AGREED', 'The answer');
    // đêm xuống quanh đèn xe → đen kín ~1 s cuối (đuôi 2.0 s của build.json)
    night(g, prog(t, T.see - 0.1, T.end + 1.0), (x + 208 + 5720) / 2 - cx, Y, 620);   // quầng ôm đèn xe + lời chào
    if (t > T.end + 1.0) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); }
  }
}

/** che vạch giữa (dải nhựa cao 18 px) từ x0 tới x1: paint() một chuỗi khoảng trắng, dùng đúng hạt nhựa của kit */
function gapLine(g, x0, x1) {
  g.save(); g.font = '800 92px "Archivo"'; const sw = g.measureText(' ').width; g.restore();
  paint(g, ' '.repeat(Math.ceil((x1 - x0 - 28) / sw)), (x0 + x1) / 2, Y, 92);
}
const COMMENTS = [['PEMDAS says 9', 2700, 262], ['PEMDAS says 1', 2985, 272]];   // thế giới (camera ≈ 1735 lúc hiện)
// rào ngoặc: vạch ngoặc to ôm đoạn đường, cột rào than viền trắng; k đập xuống (to → đúng cỡ)
function fence(g, x, y, dir, k) {
  if (k <= 0) return;
  const sc = 1 + (1 - outCubic(clamp(k))) * 1.4, hh = 175, cxc = dir * 92;   // "(" dir −1 phình trái, ")" dir +1 phình phải
  g.save(); g.translate(x, y); g.scale(sc, sc);
  const path = () => { g.beginPath(); g.moveTo(0, -hh); g.quadraticCurveTo(cxc, 0, 0, hh); };
  g.lineCap = 'round'; g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 16; g.shadowOffsetY = 10;
  g.strokeStyle = '#F4F1EA'; g.lineWidth = 34; path(); g.stroke(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.P; g.lineWidth = 22; path(); g.stroke();
  g.fillStyle = '#F4F1EA';
  for (let i = 0; i <= 4; i++) { const u = i / 4; g.fillRect(2 * u * (1 - u) * cxc - 5, hh * (2 * u - 1) - 5, 10, 10); }
  g.restore();
}
function rulebook(g, x, y, k) {                          // biển luật PEMDAS (như a0)
  const p = clamp(k); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.3 + 0.7 * outBack(p)); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-180, -62, 360, 124, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(-170, -52, 340, 104, 9); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 72px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 4); g.restore();
}
function board(g, x, y, k) {                             // biển kênh ven đường: TÊN KÊNH to + SUBSCRIBE (không logo) — người dùng 2026-10-06
  const p = clamp(k); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.3 + 0.7 * outBack(p)); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 22; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-330, -110, 660, 220, 18); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 5; g.beginPath(); g.roundRect(-318, -98, 636, 196, 12); g.stroke();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = ROAD.edge; g.font = '800 64px "Archivo"'; g.fillText('99% from scratch', 0, -26);
  g.fillStyle = ROAD.gold; g.beginPath(); g.roundRect(-130, 26, 260, 50, 25); g.fill();
  g.fillStyle = ROAD.ink; g.font = '500 26px "IBM Plex Mono"'; g.fillText('SUBSCRIBE', 0, 52); g.restore();
}
function bubble(g, s, x, y, k) {                         // bong bóng bình luận (như a0)
  if (k <= 0) return; const p = Math.min(1.12, k + Math.sin(k * Math.PI) * 0.12);
  g.save(); g.translate(x, y); g.scale(p, p); g.font = '500 26px "IBM Plex Mono"'; const w = g.measureText(s).width + 40;
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(-w / 2, -32, w, 64, 14); g.fill(); g.beginPath(); g.moveTo(-14, 30); g.lineTo(0, 50); g.lineTo(10, 30); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = ROAD.MD; g.fillRect(-w / 2, -32, 8, 64);
  g.fillStyle = ROAD.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 4, 1); g.restore();
}
