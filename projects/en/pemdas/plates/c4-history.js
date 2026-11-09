// ACT TWO · "When it was agreed" (p2, câu 37–41). Con đường thành DÒNG THỜI GIAN: mỗi thời kỳ một BẢNG QUẢNG CÁO ven
// đường (cỏ trên), năm sơn trên mặt đường, ghi chú trên cỏ dưới. Camera trượt từ đoạn này sang đoạn kia theo câu đọc.
// Toạ độ THẾ GIỚI: đường chính y = 540; đoạn n bắt đầu ở x = 2000·n.
//   đoạn 0  câu 37  "HISTORY" + cột mốc năm cắm xiêu vẹo (lịch sử "less tidy")
//   đoạn 1  câu 38  × before + · 1600s · bảng La Géométrie (Descartes · 1637)
//   đoạn 2  câu 39  THE FULL RULE · bảng SCHOOL ALGEBRA c. 1900 · late 1800s → early 1900s · sách in toả ra
//   đoạn 3  câu 40  1917 · bảng American Mathematical Monthly: × before ÷ ? hai mũi tên ngược chiều
//   đoạn 4  câu 41  biển PEMDAS + Please Excuse My Dear Aunt Sally · ONE WAY: mọi xe chạy cùng một chiều
// Ảnh (descartes-geometrie.jpg, lennes-1917.jpg) CHƯA có: bảng chữ thay thế; có ảnh thì bật PHOTOS.
import { clamp, prog, smooth, outCubic, outBack, hash, ROAD, ERA, verge, road, centerLine, paint, sign, car, card,
  typed, hand, lookup, billboard } from '../kit.js';

const PHOTOS = false;
const Y = 540, S = 2000;                              // đường chính; bề dài một đoạn
const MAIN = g => { g.moveTo(-2000, Y); g.lineTo(13000, Y); };
const BX = 900, BY = 70, BW = 860, BH = 270;          // bảng quảng cáo: x so với đầu đoạn, trên cỏ phía trên đường
const INK = ROAD.ink, GREY = '#5A5F66';
const DRIFT = [120, 160, 200, 160, 300];             // camera trôi trong từng đoạn (chữ cỏ đặt ở s + DRIFT + 110 → x ≥ 96)
const POSTS = [['1637', 330, 800, -0.09], ['c. 1900', 760, 905, 0.07], ['1917', 1190, 790, -0.13], ['PEMDAS', 1630, 895, 0.08]];

export default class History {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = PHOTOS ? { geometrie: 'assets/history/descartes-geometrie.jpg', lennes: 'assets/history/lennes-1917.jpg' } : {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      history: w(37, 'history'), tidy: w(37, 'tidy'), expect: w(37, 'expect'),
      l38: L(38).start, mul: w(38, 'multiplication'), before: w(38, 'before'), add: w(38, 'addition'), algebra: w(38, 'algebra'),
      sixteen: w(38, 'sixteen'), writing: w(38, 'writing'), symbols: w(38, 'symbols'),
      l39: L(39).start, full: w(39, 'full'), rule: w(39, 'rule'), spelled: w(39, 'spelled'), schoolbooks: w(39, 'schoolbooks'),
      eighteen: w(39, 'eighteen'), nineteen: w(39, 'nineteen'), printed: w(39, 'printed'), spread: w(39, 'spread'),
      l40: L(40).start, quietly: w(40, 'quietly'), n17: w(40, 'nineteen'), journal: w(40, 'journal'), debating: w(40, 'debating'),
      whether: w(40, 'whether'), mul2: w(40, 'multiplication'), division: w(40, 'division'),
      l41: L(41).start, catchy: w(41, 'catchy'), pemdas: w(41, 'pemdas'), later: w(41, 'later'), briefly: w(41, 'briefly'),
      all: w(41, 'all'), same: w(41, 'same'), end: L(41).end,
    };
    this.START = L(37).start; this.FROM = this.START - 1.2;
    const T = this.T, A = [this.FROM, T.l38, T.l39, T.l40, T.l41];
    // camera: đứng ở đầu đoạn, trôi chậm suốt câu, lướt 0.9 s sang đoạn sau ngay trước câu kế
    this.CAM = [[this.FROM - 1, 0]];
    DRIFT.forEach((drift, n) => {
      const next = A[n + 1];
      if (next) this.CAM.push([next - 0.55, S * n + drift], [next + 0.35, S * (n + 1)]);
      else this.CAM.push([T.end + 3, S * n + drift]);
    });
    // xe đọc: chạy đều trong đoạn, lướt sang đoạn sau cùng camera (luôn tiến, không lùi)
    this.CAR = [[this.FROM, 150]];
    A.forEach((a, n) => { const next = A[n + 1]; this.CAR.push([next ? next - 0.55 : T.end + 3, S * n + (next ? 1700 : 2300)]); if (next) this.CAR.push([next + 0.35, S * (n + 1) + 150]); });
  }
  camX(t) { return keys(this.CAM, t, smooth); }
  carX(t) { return keys(this.CAR, t, x => x); }
  sfx() {
    const T = this.T;
    return [
      { t: T.tidy, kind: 'pop' }, { t: T.sixteen, kind: 'pop' }, { t: T.full, kind: 'pop' }, { t: T.printed, kind: 'pop' },
      { t: T.journal, kind: 'pop' }, { t: T.debating, kind: 'question' }, { t: T.pemdas, kind: 'pop' }, { t: T.all, kind: 'whoosh' },
      ...[T.l38, T.l39, T.l40, T.l41].map(a => ({ t: a - 0.55, kind: 'whoosh' })),
    ];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, [MAIN]);
    centerLine(g, MAIN);

    // ── đoạn 0: HISTORY + cột mốc năm cắm xiêu vẹo, nối bằng một nét ngoằn ngoèo ──
    paint(g, 'HISTORY', 1000, Y, 120, { k: prog(t, T.history - 0.1, T.history + 0.5) });
    const kl = prog(t, T.tidy, T.expect + 0.6);
    if (kl > 0) {
      const P = []; POSTS.forEach(([, x, y], i) => { if (i) { const [, x0, y0] = POSTS[i - 1];
        for (let j = 0; j <= 16; j++) { const u = j / 16; P.push([x0 + (x - x0) * u, y0 + (y - y0) * u + Math.sin(u * Math.PI * 3 + i) * 34]); } } });
      hand(g, P, { w: 4, color: ROAD.edge, jit: 9, seed: 4, k: kl });
    }
    POSTS.forEach(([s, x, y, rot], i) => post(g, s, x, y, rot, prog(t, T.tidy + i * 0.22, T.tidy + i * 0.22 + 0.4)));

    // ── đoạn 1: nhân trước cộng lớn lên cùng đại số, thế kỷ 17 ──
    const s1 = S, A = [T.l38, T.l39, T.l40, T.l41];
    // bảng gập xuống ngay trước khi camera lướt đi: không trượt qua dưới biển tên mục (x ≥ 620 khi còn hiện)
    const fold = n => outCubic(prog(t, A[n] - 0.8, A[n] - 0.4));
    row(g, ['×', 'before', '+'], s1 + 160, Y, 92, [prog(t, T.mul, T.mul + 0.3), prog(t, T.before, T.before + 0.3), prog(t, T.add, T.add + 0.3)]);
    typed(g, 'grew up with algebra itself', s1 + DRIFT[1] + 110, 830, prog(t, T.algebra - 0.1, T.algebra + 0.9), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    paint(g, '1600s', s1 + 1320, Y, 120, { k: prog(t, T.sixteen - 0.05, T.sixteen + 0.45) });
    const kA = prog(t, T.sixteen - 0.1, T.sixteen + 0.45);
    if (PHOTOS) { billboard(g, 'geometrie', s1 + BX, BY, BH, kA); typed(g, 'La Géométrie · Descartes · 1637', s1 + DRIFT[1] + 110, 920, kA * 1.5 - 0.5, 'italic 600 54px "Cormorant Garamond"', ROAD.edge); }
    else board(g, s1 + BX, BY, BW, BH, kA, fold(1), (x, y) => {
      typed(g, 'La Géométrie', x + 48, y + 82, kA * 2 - 0.6, 'italic 600 72px "Cormorant Garamond"', INK);
      typed(g, 'DESCARTES · 1637', x + 52, y + 124, kA * 2 - 0.9, '500 24px "IBM Plex Mono"', GREY);
      typed(g, 'equations in symbols', x + 52, y + 222, prog(t, T.writing, T.symbols + 0.2), '800 56px "Archivo"', INK);
      underline(g, x + 52, y + 240, 600, prog(t, T.symbols, T.symbols + 0.4));
    });

    // ── đoạn 2: quy tắc đầy đủ trong sách giáo khoa, cuối 1800s – đầu 1900s ──
    const s2 = 2 * S;
    paint(g, 'THE FULL RULE', s2 + 420, Y, 72, { k: prog(t, T.full - 0.1, T.rule + 0.4) });
    row(g, ['late 1800s', '→', 'early 1900s'], s2 + 870, Y, 72, [prog(t, T.eighteen - 0.2, T.eighteen + 0.5), prog(t, T.nineteen - 0.6, T.nineteen - 0.3), prog(t, T.nineteen - 0.1, T.nineteen + 0.5)]);
    const kB = prog(t, T.full - 0.1, T.full + 0.45);
    board(g, s2 + BX, BY, BW, BH, kB, fold(2), (x, y) => {
      g.fillStyle = ROAD.P; g.fillRect(x, y, 26, BH);                           // gáy sách
      typed(g, 'SCHOOLBOOKS', x + 70, y + 76, kB * 2 - 0.6, '800 46px "Archivo"', INK);
      const R = [['P', '( )', 'brackets'], ['E', '^', 'powers'], ['MD', '× ÷', '× and ÷'], ['AS', '+ −', '+ and −']];
      R.forEach(([kd, s, name], i) => {
        const k = prog(t, T.spelled + i * 0.22, T.spelled + i * 0.22 + 0.35), sx = x + 140 + i * 196;
        sign(g, kd, s, sx, y + 168, kd === 'E' ? 34 : 30, k);
        typed(g, name, sx, y + 240, k * 1.5 - 0.3, '500 20px "IBM Plex Mono"', INK, { align: 'center' });
        if (i < 3 && k >= 1) { g.save(); g.fillStyle = GREY; g.font = '800 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('›', sx + 98, y + 168); g.restore(); }
      });
    });
    for (let i = 0; i < 9; i++) {                       // sách in toả ra khắp ven đường
      const bx = s2 + 260 + i * 175 + (hash(i * 3.7) - 0.5) * 60, by = 790 + hash(i * 5.1) * 150;
      book(g, bx, by, (hash(i * 9.3) - 0.5) * 0.7, prog(t, T.printed + i * 0.1, T.printed + i * 0.1 + 0.35), i);
    }

    // ── đoạn 3: 1917, tạp chí Mỹ còn đang tranh luận × trước ÷ ──
    const s3 = 3 * S;
    paint(g, '1917', s3 + 1320, Y, 120, { k: prog(t, T.n17 - 0.05, T.n17 + 0.6) });
    typed(g, 'it did not settle quietly', s3 + DRIFT[3] + 110, 830, prog(t, T.quietly - 0.3, T.quietly + 0.6), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    if (!PHOTOS) sign(g, 'MD', '×', s3 + 1000, 830, 46, prog(t, T.mul2 - 0.1, T.mul2 + 0.3));
    if (!PHOTOS) sign(g, null, '?', s3 + 1150, 830, 40, prog(t, T.whether + 0.4, T.whether + 0.8));
    if (!PHOTOS) sign(g, 'MD', '÷', s3 + 1300, 830, 46, prog(t, T.division - 0.1, T.division + 0.3));
    // cuộc tranh luận: viết trên bảng (gập theo bảng); có ảnh thì xuống cỏ dưới, bên phải
    const debate = (ox, oy, col) => {
      typed(g, '× before ÷ ?', ox, oy, prog(t, T.debating, T.debating + 0.5), '800 56px "Archivo"', col, { align: 'center' });
      dart(g, ox - 40, oy + 44, ox - 330, prog(t, T.whether, T.whether + 0.4), ROAD.MD);
      dart(g, ox + 40, oy + 44, ox + 330, prog(t, T.mul2 + 0.3, T.mul2 + 0.7), ROAD.MD);
      typed(g, '× first', ox - 190, oy + 80, prog(t, T.whether + 0.2, T.whether + 0.7), '500 22px "IBM Plex Mono"', col, { align: 'center' });
      typed(g, 'left to right', ox + 190, oy + 80, prog(t, T.mul2 + 0.5, T.mul2 + 1.0), '500 22px "IBM Plex Mono"', col, { align: 'center' });
    };
    const kC = prog(t, T.journal - 0.1, T.journal + 0.45);
    if (PHOTOS) { billboard(g, 'lennes', s3 + BX, BY, BH, kC); typed(g, 'American Mathematical Monthly · 1917', s3 + DRIFT[3] + 110, 920, kC * 1.5 - 0.5, 'italic 600 54px "Cormorant Garamond"', ROAD.edge); }
    else board(g, s3 + BX, BY, BW, BH, kC, fold(3), (x, y) => {
      typed(g, 'AMERICAN MATHEMATICAL MONTHLY', x + BW / 2, y + 60, kC * 2 - 0.6, '800 38px "Archivo"', INK, { align: 'center' });
      typed(g, '1917', x + BW / 2, y + 96, kC * 2 - 0.9, '500 24px "IBM Plex Mono"', GREY, { align: 'center' });
      debate(x + BW / 2, y + 168, INK);
    });
    if (PHOTOS) debate(s3 + 1400, 790, ROAD.edge);

    // ── đoạn 4: tên dễ nhớ đến sau; viết gọn và cùng một cách = mọi xe một chiều ──
    const s4 = 4 * S;
    plaque(g, s4 + 1180, 210, prog(t, T.pemdas - 0.1, T.pemdas + 0.35));
    typed(g, 'Please Excuse My Dear Aunt Sally', s4 + DRIFT[4] + 110, 810, prog(t, T.pemdas + 0.3, T.later + 0.3), 'italic 600 54px "Cormorant Garamond"', ROAD.edge);
    typed(g, 'CATCHY NAMES · LATER STILL', s4 + DRIFT[4] + 114, 870, prog(t, T.later, T.later + 0.6), '500 24px "IBM Plex Mono"', ROAD.edge);
    paint(g, 'BRIEFLY', s4 + 1300, Y, 92, { k: prog(t, T.briefly - 0.1, T.briefly + 0.4) });
    oneWay(g, s4 + 1560, 880, prog(t, T.same - 0.2, T.same + 0.2));
    if (t > T.all - 0.4) for (let i = 0; i < 3; i++) {   // đoàn xe cùng chiều, làn trên
      const x = s4 - 300 + (t - T.all + 0.4) * 900 - i * 230; car(g, x, Y - 100, 0, { s: 0.8, color: ['#C9C6BD', '#9FB3C8', '#C9C6BD'][i] });
    }
    car(g, this.carX(t), Y + 105, 0, { s: 0.8 });
    g.restore();

    card(g, 'road', prog(t, this.FROM + 0.4, this.FROM + 1.4), 'ACT TWO · A CHOICE', 'When it was agreed');
  }
}

function keys(K, t, ease) { let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, a] = K[i], [t1, b] = K[i + 1]; return a + (b - a) * ease(clamp((t - t0) / (t1 - t0))); }
/** hàng chữ sơn, mỗi token có k riêng (lộ đúng lúc từ đó được đọc) */
function row(g, tokens, x, y, size, ks) {
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = tokens.map(s => g.measureText(s).width); g.restore();
  let cx = x; tokens.forEach((s, i) => { paint(g, s, cx + ws[i] / 2, y, size, { k: ks[i] }); cx += ws[i] + size * 0.4; });
}
/** bảng quảng cáo chữ (thay ảnh): tấm trắng, viền, hai chân, bật lên từ chân; draw(x, y) vẽ nội dung */
function board(g, x, y, w, h, k, out, draw) {
  if (k <= 0 || out >= 1) return;
  const p = outBack(clamp(k)) * (1 - out);
  g.save(); g.translate(x + w / 2, y + h); g.scale(1, p); g.translate(-(x + w / 2), -(y + h));
  g.fillStyle = '#2A2C30'; g.fillRect(x + w * 0.2 - 8, y + h, 16, 44); g.fillRect(x + w * 0.8 - 8, y + h, 16, 44);
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = '#F4F1EA'; g.fillRect(x - 10, y - 10, w + 20, h + 20);
  g.shadowColor = 'transparent'; g.strokeStyle = '#C9C4B6'; g.lineWidth = 3; g.strokeRect(x + 4, y + 4, w - 8, h - 8);
  draw(x, y); g.restore();
}
function underline(g, x, y, w, k) { if (k > 0) hand(g, [[x, y], [x + w * 0.5, y + 3], [x + w, y]], { w: 5, color: ROAD.gold, k }); }
/** cột mốc năm: tấm trắng nhỏ cắm hơi xiêu */
function post(g, s, x, y, rot, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(p, p); g.font = '500 28px "IBM Plex Mono"'; const w = g.measureText(s).width + 40;
  g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#F4F1EA'; g.beginPath(); g.roundRect(-w / 2, -30, w, 60, 10); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, 2); g.restore();
}
/** sách in nhỏ (nhìn từ trên): bìa than / kem, gáy, dòng chữ giả */
function book(g, x, y, rot, k, i) {
  if (k <= 0) return; const p = outBack(clamp(k)), dark = i % 3 !== 1;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 12; g.shadowOffsetY = 6;
  g.fillStyle = dark ? '#2B2E36' : '#E9E4D6'; g.fillRect(-42, -56, 84, 112); g.shadowColor = 'transparent';
  g.fillStyle = dark ? '#E9E4D6' : '#2B2E36'; g.fillRect(-42, -56, 10, 112);
  g.fillStyle = dark ? 'rgba(233,228,214,.8)' : 'rgba(43,46,54,.8)'; g.fillRect(-20, -34, 48, 7); g.fillRect(-20, -20, 34, 5); g.restore();
}
/** mũi tên thẳng ngang từ (x0,y) tới x1 (k vẽ dần) */
function dart(g, x0, y, x1, k, color) {
  if (k <= 0) return; const x = x0 + (x1 - x0) * outCubic(clamp(k)), d = Math.sign(x1 - x0);
  g.save(); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x, y); g.stroke();
  g.beginPath(); g.moveTo(x + d * 18, y); g.lineTo(x - d * 8, y - 16); g.lineTo(x - d * 8, y + 16); g.fill(); g.restore();
}
/** biển tên PEMDAS: bảng chỉ đường tối viền trắng (như biển luật ở mở bài) */
function plaque(g, x, y, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(1, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-260, -82, 520, 164, 16); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 5; g.beginPath(); g.roundRect(-248, -70, 496, 140, 10); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 92px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 6); g.restore();
}
/** biển ONE WAY: chữ nhật đen, mũi tên trắng */
function oneWay(g, x, y, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 16; g.shadowOffsetY = 8;
  g.fillStyle = '#ECECEC'; g.beginPath(); g.roundRect(-150, -48, 300, 96, 10); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = '#1F2228'; g.beginPath(); g.roundRect(-140, -38, 280, 76, 6); g.fill();
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(-120, -14); g.lineTo(70, -14); g.lineTo(70, -30); g.lineTo(124, 0); g.lineTo(70, 30); g.lineTo(70, 14); g.lineTo(-120, 14); g.fill();
  g.fillStyle = '#1F2228'; g.font = '800 30px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ONE WAY', -18, 2); g.restore();
}
