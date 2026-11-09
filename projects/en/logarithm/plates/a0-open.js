// a0 · Cold open = TOÀN BỘ p1 (câu 0–4, bản 2 2026-10-26: hook ngắn ~25 s) — DNA blocks. Khung 0.5 s (trang) = THUMBNAIL đang
// chuyển động (PACKAGING §0b, §4): chồng xu $1,000 + thẻ 8% + khối ×2 + bóng chồng gấp đôi "?" + 「72」 gỗ cắt.
//  S1 (câu 0–1) 「72」 bay khỏi khung SAU chữ "seventy-two"; "divided by eight" → chồng B lớn đúng 5·1.08^năm, 9 khối năm rơi tới
//               "nine" → "9 YEARS"; câu 1: ba chồng nhỏ 6% / 12% / 3% lớn tới gấp đôi đúng chữ trả lời.
//  S2 (câu 2–4) khối gỗ trượt ở cuối câu 1 → "exact answer" 9 khối năm + 2 lát ngày ("9 YEARS + 2 DAYS"); "not" → khối bay
//               đi, thẻ xám BANKER'S TRICK gạch băng keo; "logarithm" → khối tím log + trang tên sách 1614; "seventy-two" →
//               「72」 rơi lại xuống bàn. Hết câu 4 mascot lặn; trang p2 mở từ kit.bare().
// KHÔNG có người que (người dùng 2026-10-27: bản đầu cho nó chỉ / gật theo từng câu → "xuất hiện cho có", bị tăng tốc theo nhịp
// hình nhanh; người que chỉ vào khi nó LÀM một việc với vật ở sự kiện quan trọng — LESSONS §175).
// Mascot pose-calculator nhỏ (262 px) góc dưới trái, NÓI suốt p1 (người dẫn); vẽ sau cùng ở toạ độ màn hình.
import { H, C, AR, clamp, prog, lookup, must, outCubic, outBack, ground, bare, block, tower, coinStack, ghostStack,
  sticker, tag, tape, big72, logBoard, brace, animal, icon, photoBlock, photoImages, promiseBlock, figure, slideSwap, text, line, rr,
  glow, money, grow8, RULE, R8, DAYS8, ANT_MG, WHALE_T, STEPS, BOARD, COIN_SM, PROMISE, BASE_Y, actorOn } from '../kit.js';
import { bindMascot, mascot } from '../../../../engine/mascot-line.js';

const lerp = (a, b, u) => a + (b - a) * u;
/** Nhún một lần quanh mốc a (tỉ lệ 1 → 1.18 → 1, 0.35 s). */
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };

export default class Open {
  static ERA = 'table';
  static IMAGES = photoImages('descriptio');
  static POSES = ['calculator'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      eight0: w(0, 'eight'), s72: w(0, 'seventy-two'), one0: w(0, 'one'), money0: w(0, 'money'), doubles0: w(0, 'doubles'),
      divided0: w(0, 'divided'), about0: w(0, 'about'), nine0: w(0, 'nine'), years0: w(0, 'years'),
      six1: w(1, 'six'), twelve1: w(1, 'twelve'), twelveb1: w(1, 'twelve', 2), sixb1: w(1, 'six', 2), three1: w(1, 'three'), tf1: w(1, 'twenty-four'),
      exact2: w(2, 'exact'), answer2: w(2, 'answer'), eight2: w(2, 'eight'), nine2: w(2, 'nine'), two2: w(2, 'two'), days2: w(2, 'days'),
      not3: w(3, 'not'), sup3: w(3, 'superstition'), log3: w(3, 'logarithm'), why3: w(3, 'why'), seventy3: w(3, 'seventy-two'), work3: w(3, 'work'), what3: w(3, 'what'),
      lets4: w(4, "let's"), back4: w(4, 'backwards'),
      end: E(4),
    };
    const T = this.T;
    this.START = S(0);
    this.CLOSE = [T.days2 + 0.35, T.not3 - 0.05]; actorOn(T.days2 + 0.5, T.not3 - 0.25);
    this.FROM = -0.6;                                       // trang p1 có LEAD 0.6: khung 0 của video = cảnh này
    // Hai nhóm khung: tiền / ba lãi suất (câu 0–1) → kiểm chứng + câu hỏi logarithm (câu 2–4). Khối trượt ngay sau câu 1 để
    // "9 YEARS + 2 DAYS" của S2 hiện trong lúc đọc câu 2 (bản đầu trượt ở "not" → câu 2 đọc trên khung S1, đáp án ngày không hiện).
    this.SW = [E(1) + 0.05];
    if (this.SW[0] + 0.9 > T.exact2 + 0.1) throw new Error('a0: khối trượt chưa xong khi khối năm bắt đầu rơi');
    this.LIFT72 = T.s72 + 0.45;                             // 「72」 bay đi SAU khi đọc xong "seventy-two" (bản đầu bay ở "money")
    this.Y0 = T.divided0; this.Y1 = T.nine0;                // 72 ÷ 8 ≈ 9: chồng B lớn suốt "divided by eight — about nine"
    this.RACE = [[6, 1330, T.six1, T.twelve1], [12, 1530, T.twelveb1, T.sixb1], [3, 1730, T.three1, T.tf1]];
    for (const [r, , a, b] of this.RACE) if (b < a + 0.2) throw new Error(`a0: chồng ${r}% lớn quá nhanh`);
    this.YS = [T.exact2 + 0.1, T.nine2];
    this.ROWS = [8, 6, 12, 3].map(r => `72 ÷ ${r} = ${RULE[r]}`);
    must(`72 / 8`, RULE[8]);
    this.SINK = [T.end + 0.05, T.end + 0.55];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const yb = i => this.Y0 + (i + 1) / 9 * (this.Y1 - this.Y0);
    return [c(T.eight0, 'pop'), c(T.doubles0, 'question'), c(T.nine0, 'card'),
      ...this.RACE.flatMap(([, , a, b]) => [c(a, 'coin'), c(b, 'wood')]),
      c(T.seventy3, 'wood'), c(T.not3, 'tear'), c(T.log3, 'wood'), c(T.why3, 'card'),
      c(this.YS[0] + 0.2, 'tick'), c(T.nine2, 'card'), c(T.days2, 'correct'),
      ...Array.from({ length: 9 }, (_, i) => c(yb(i), 'wood')), ...this.SW.map(t => c(t, 'whoosh'))];
  }

  // ═══ S1: tiền gấp đôi (câu 0–2) ═══
  s1(g, t) {
    const T = this.T, base = BASE_Y, A = 540, B = 990;
    ground(g, 'table');
    // ô chờ năm + khối năm (Ⓑ)
    const ks = prog(t, this.Y0 - 0.4, this.Y0);
    for (let i = 0; i < 9; i++) {
      const x = 360 + i * 70, a = this.Y0 + i / 9 * (this.Y1 - this.Y0), kb = prog(t, a, a + (this.Y1 - this.Y0) / 9);
      if (ks > 0 && kb < 1) { g.save(); g.globalAlpha = clamp(ks * 9 - i); g.setLineDash([6, 6]); g.strokeStyle = 'rgba(34,48,60,0.45)'; g.lineWidth = 3; g.stroke(rr(x - 29, 948, 58, 58, 6)); g.restore(); }
      block(g, x, 1006, 58, { color: C.birch, label: String(i + 1), k: kb, d: 10, from: 300 });
    }
    const k9 = prog(t, T.nine0, T.nine0 + 0.3);
    if (k9 > 0) scaled(g, 1060, 978, outBack(k9, 2), () => text(g, '9 YEARS', 980, 978, { font: `900 40px ${AR}`, base: 'middle' }));
    // chồng A $1,000 + khối ×2 + chồng B
    const topA = coinStack(g, A, base, 5);
    block(g, 770, base, 116, { label: '×2' });
    const y = 9 * prog(t, this.Y0, this.Y1), nB = t < T.money0 ? 0 : t < this.Y0 ? 5 * prog(t, T.money0, T.money0 + 0.6) : t >= this.Y1 ? 10 : 5 * 1.08 ** y;
    const topG = ghostStack(g, B, base, 10, { a: 1 - prog(t, this.Y1 - 0.2, this.Y1 + 0.2) });
    if (nB > 0) coinStack(g, B, base, nB, { seed: 3 });
    scaled(g, A, topA - 70, nudge(t, T.one0), () => tag(g, money(1000), A, topA - 70, { size: 44, color: C.goldInk, edge: C.gold, string: [A - 40, topA + 8] }));
    scaled(g, A - 230, base - 160, nudge(t, T.eight0), () => tag(g, '8%', A - 230, base - 160, { size: 44, color: C.goldInk, edge: C.gold, string: [A - 124, base - 110] }));
    const bt = t < this.Y0 ? '?' : money(grow8(Math.floor(y + 1e-9)));
    scaled(g, B, topG - 70, nudge(t, T.doubles0), () => tag(g, bt, B, topG - 70, bt === '?' ? { size: 52, string: [B - 20, topG + 8] } : { size: 44, color: C.goldInk, edge: C.gold, string: [B - 40, topG + 8] }));
    if (t >= this.Y1) must(`Math.round(1000 * 1.08 ** 9)`, 1999);
    // 「72」 của thumbnail: bay lên khỏi khung sau khi đọc "seventy-two"
    big72(g, 1150, 800, 1, { lift: prog(t, this.LIFT72, this.LIFT72 + 0.7) });
    // Ⓒ ba chồng nhỏ đua
    for (const [r, x, a, b] of this.RACE) {
      const k = prog(t, a - 0.05, a + 0.3); if (k <= 0) continue;
      const n = t < a + 0.3 ? 3 * k : 3 * 2 ** prog(t, a + 0.3, b);
      const top = ghostStack(g, x, base, 6, { ...COIN_SM, k });
      coinStack(g, x, base, n, { ...COIN_SM, seed: r });
      tag(g, `${r}%`, x, top - 56, { size: 38, color: C.goldInk, edge: C.gold, k });
      block(g, x, 1000, 0, { w: 156, h: 66, color: C.birch, label: `${RULE[r]} YRS`, k: prog(t, b - 0.3, b + 0.1), from: 400 });
    }
  }

  // ═══ S2: 72 ÷ lãi; đường dài; không phải mẹo (câu 3–5) ═══
  s2(g, t) {
    const T = this.T, base = BASE_Y;
    ground(g, 'table');
    const k72 = prog(t, T.seventy3 - 0.35, T.seventy3 + 0.15);
    big72(g, 330, base, 0.82, { k: k72 });
    // thẻ 72 ÷ r: hiện ở "divided", 3 thẻ dưới rời ở "check"; thẻ 8 rời ở "that"
    this.ROWS.forEach((s, i) => {
      const a = T.seventy3 + i * 0.22, k = prog(t, a, a + 0.3), out = i ? prog(t, T.exact2 + (i - 1) * 0.1, T.exact2 + 0.45 + (i - 1) * 0.1) : prog(t, T.not3, T.not3 + 0.45);
      if (k <= 0 || out >= 1) return;
      // thẻ i ≥ 1 thu nhỏ biến mất tại chỗ (không bay xuyên các thẻ khác); thẻ 72 ÷ 8 nhấc lên ở "that". Dây treo xuống lỗ xỏ trái, nối từ đáy thẻ trên.
      const yy = 190 + i * 126 - (i ? 0 : outCubic(out) ** 1.5 * 400), prevB = i === 0 ? -10 : i === 1 ? 190 - outCubic(prog(t, T.not3, T.not3 + 0.45)) ** 1.5 * 400 + 36 : 190 + (i - 1) * 126 + 36;
      tag(g, s, 1360, yy, { size: 46, color: C.goldInk, edge: C.gold, k: i && out > 0 ? 1 - outCubic(out) : k, minW: 420, string: i && out > 0 ? null : [1360 - 210 + 18, prevB] });
    });
    // Ⓔ năm: 9 khối, ngày: 2 lát
    const [y0, y1] = this.YS, lift = prog(t, T.not3, T.not3 + 0.8) * 11;
    for (let i = 0; i < 9; i++) { const a = y0 + i / 9 * (y1 - y0);
      block(g, 1000 + i * 76, base, 64, { color: C.birch, label: String(i + 1), d: 10, k: prog(t, a, a + (y1 - y0) / 9), lift: clamp(lift - (8 - i) * 0.25), from: 130 }); }
    for (let j = 0; j < DAYS8; j++) block(g, 1000 + 8 * 76 + 52 + j * 22, base, 0, { w: 14, h: 64, d: 6, color: C.birch, k: prog(t, T.two2 + j * 0.12, T.days2 + j * 0.12), lift: clamp(lift - 0.2 + j * 0.1), from: 130 });
    const kt = prog(t, T.exact2 + 0.3, T.exact2 + 0.6), lt = prog(t, T.not3, T.not3 + 0.5);
    if (kt > 0 && lt < 1) {
      const s = t >= T.days2 ? `${Math.floor(R8)} YEARS + ${DAYS8} DAYS` : t >= T.nine2 ? `${Math.floor(R8)} YEARS` : 'THE LONG WAY: YEAR BY YEAR';
      if (t >= T.days2) must(`Math.floor(${R8})`, RULE[8]);
      const yy = 640 - outCubic(lt) * 800;                                                    // treo dưới thẻ 72 ÷ 8 = 9
      line(g, 1360, yy - 414, 1360, yy - 34, C.string, 2.5);                                 // từ đáy thẻ 72 ÷ 8 xuống mép trên thẻ
      tag(g, s, 1360, yy, { size: 44, k: kt });
    }
    // Ⓕ không phải mẹo: thẻ xám + băng keo; khối tím "log"; khối ảnh 1614
    const kb = prog(t, T.not3, T.not3 + 0.35);
    if (kb > 0) {
      line(g, 600, -10, 600, 370, C.string, 2.5);
      const tb = tag(g, "BANKER'S TRICK", 600, 400, { size: 46, color: C.badInk, edge: C.bad, k: kb });
      tape(g, tb.x - 14, 432, tb.x + tb.w + 14, 412, prog(t, T.not3 + 0.3, T.not3 + 0.7), { w: 16 });
    }
    block(g, 960, base, 132, { color: C.log, label: 'log', k: prog(t, T.log3 - 0.3, T.log3 + 0.15) });
    photoBlock(g, 'descriptio', 1260, 110, 380, 480, { k: prog(t, T.log3, T.log3 + 0.6), rot: 0.02, zoom: 1.02 + 0.03 * prog(t, T.log3, T.log3 + 4), focus: [0.5, 0.3],
      label: ['MIRIFICI LOGARITHMORUM', 'CANONIS DESCRIPTIO · 1614'] });
    tag(g, `MORE THAN 400 YEARS`, 1450, 850, { size: 40, k: prog(t, T.log3 - 0.1, T.log3 + 0.3) });
  }

  // ═══ S3: xem trước ACT FOUR + ván thước kiến ↔ cá voi (câu 6) ═══
  s3a(g, t) {
    const T = this.T, base = BASE_Y;
    ground(g, 'table');
    block(g, 400, base, 120, { color: C.log, label: 'log', k: prog(t, this.SW[1] + 0.5, this.SW[1] + 0.9) });
    [['quake', 700, T.measures6, 'EARTHQUAKES'], ['speaker', 1080, T.sound6, 'SOUND'], ['lemon', 1460, T.sour6, 'SOURNESS']].forEach(([kind, x, a, word], i) => {
      const k = prog(t, a, a + 0.45); if (k <= 0) return;
      const shake = kind === 'quake' ? 6 * Math.sin(t * 46) * Math.exp(-2 * Math.max(0, t - a - 0.3)) : 0;
      const { top } = tower(g, x + shake, base, 3, { s: 96, k: 3 * k, label: '×10' });
      const ki = prog(t, a + 0.3, a + 0.6), pulse = kind === 'speaker' ? 1 + 0.08 * Math.sin(t * 18) * (ki >= 1 ? 1 : 0) : 1;
      if (ki > 0) scaled(g, x + shake, top - 64, pulse, () => icon(g, kind, x + shake, top - 64, 56, ki));
      tag(g, word, x, base + 72, { size: 38, k: ki });
    });
  }
  s3b(g, t) {
    const T = this.T, sw = this.SW[2];
    ground(g, 'table');
    const { X, Y, PT } = logBoard(g, { towers: 11 * prog(t, sw + 0.15, T.whale6 - 0.1) });
    const ax = X(0) + Math.log10(ANT_MG) * BOARD.step;
    animal(g, 'ant', ax, PT - 10, 1, { k: prog(t, T.ant6 - 0.1, T.ant6 + 0.2) });
    animal(g, 'mouse', X(4) + 4, Y(4) - 10, 0.95, { k: prog(t, this.MIDDLE[0], this.MIDDLE[0] + 0.3) });
    animal(g, 'elephant', X(9) - 24, Y(9) - 10, 0.72, { k: prog(t, this.MIDDLE[1], this.MIDDLE[1] + 0.3) });
    animal(g, 'whale', X(11) - 34, Y(11) - 12, 0.58, { k: prog(t, T.whale6 - 0.1, T.whale6 + 0.25) });
    tag(g, `${ANT_MG} mg`, ax + 20, PT - 120, { size: 34, k: prog(t, T.ant6, T.ant6 + 0.3), string: [ax + 40, PT - 30] });
    tag(g, `${WHALE_T} t`, X(11) - 300, Y(11) - 150, { size: 34, k: prog(t, T.whale6, T.whale6 + 0.3), string: [X(11) - 150, Y(11) - 80] });
    const kb = prog(t, T.sit6, T.sit6 + 0.5);
    brace(g, 300, Y(11), PT, kb);
    if (kb > 0) { g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = 'rgba(81,50,176,0.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(X(11) - BOARD.bw / 2 - 8, Y(11)); g.lineTo(lerp(X(11) - BOARD.bw / 2 - 8, 320, outCubic(kb)), Y(11)); g.stroke(); g.restore(); }
    text(g, `≈ ${Math.round(STEPS)} STEPS`, 340, 236, { font: `900 64px ${AR}`, color: C.logInk, k: prog(t, T.sit6, T.sit6 + 0.35) });
    text(g, 'OF ×10', 340, 300, { font: `900 64px ${AR}`, color: C.baseInk, k: prog(t, T.sit6 + 0.25, T.sit6 + 0.5) });
  }
  s3(g, t) {
    const a = this.SW[2], k = prog(t, a, a + 0.9);
    if (t < a) this.s3a(g, t); else if (k < 1) slideSwap(g, k, () => this.s3a(g, t), () => this.s3b(g, t)); else this.s3b(g, t);
  }

  // ═══ S4: ba câu hỏi (câu 7–10) ═══
  s4(g, t) {
    const T = this.T, { xs, base, w, h } = PROMISE;
    ground(g, 'table');
    xs.forEach((x, i) => {
      const sw3 = this.SW[3], ks = prog(t, sw3 + 0.15 + i * 0.15, sw3 + 0.55 + i * 0.15), kd = prog(t, T.q[i] - 0.35, T.q[i] + 0.15);
      if (ks > 0 && kd < 0.7) { g.save(); g.setLineDash([12, 10]); g.strokeStyle = 'rgba(34,48,60,0.45)'; g.lineWidth = 4; g.stroke(rr(x - w / 2, base - h, w, h, 8)); g.restore();
        sticker(g, String(i + 1), x - w / 2 + 6, base - h - 8, { r: 34, k: ks }); }
      if (i === 2 && t > T.magic10) glow(g, x, base - h / 2, 260, '246,166,35', 0.55 * Math.sin(Math.PI * prog(t, T.magic10, T.magic10 + 1.2)));
      promiseBlock(g, i, { k: kd, kp: prog(t, T.q[i] + 0.1, T.q[i] + 0.8), turn: i === 1 ? prog(t, T.addition9 - 0.05, T.addition9 + 0.45) : 0, cap: prog(t, T.q[i] + 0.25, T.q[i] + 0.6) });
    });
  }

  // ═══ S5: câu hỏi hỏi ngược (câu 11) → bàn trơn ═══
  s5(g, t) {
    const T = this.T, base = BASE_Y, x = 960;
    bare(g);
    const k = 3 * prog(t, T.all11, T.all11 + 0.9), lift = 3 * prog(t, T.back11 + 0.05, T.back11 + 0.75);
    const { top } = tower(g, x, base, 3, { s: 120, label: '×2', k, lift });
    const kt = prog(t, T.you11, T.you11 + 0.3), lt = prog(t, T.back11 + 0.4, T.back11 + 0.9);
    if (kt > 0 && lt < 1) { const dy = -(outCubic(lt) ** 1.5) * 900; tag(g, '2 × 2 × 2 = 8', 1370, 560 + dy, { size: 52, k: kt, string: [x + 80, 520 + dy] }); }
    // mũi tên tím vòng ngược quanh tháp: vẽ ở "just asked", thu lại khi khối bay đi
    const ka = prog(t, T.just11, T.back11) - prog(t, T.back11 + 0.4, T.back11 + 0.8);
    if (ka > 0) {
      const cx = x - 150, cy = base - 200, R = 150, a0 = -Math.PI * 0.45, a1 = a0 + Math.PI * 1.1 * ka;
      g.save(); g.strokeStyle = C.log; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, R, -a0, -a1, true); g.stroke();
      const ex = cx + R * Math.cos(-a1), ey = cy + R * Math.sin(-a1), dir = -a1 - Math.PI / 2;
      g.translate(ex, ey); g.rotate(dir); g.fillStyle = C.log; g.beginPath(); g.moveTo(16, 0); g.lineTo(-14, -18); g.lineTo(-14, 18); g.closePath(); g.fill(); g.restore();
    }
    if (t >= T.all11 + 0.9 && t < T.back11) must('2 * 2 * 2', 8);
  }

  render(g, t) {
    const sw = this.SW[0];
    if (t < sw) this.s1(g, t); else { const k = prog(t, sw, sw + 0.9); if (k < 1) slideSwap(g, k, () => this.s1(g, t), () => this.s2(g, t)); else this.s2(g, t); }
    const sink = outCubic(prog(t, ...this.SINK));
    if (sink < 1) { g.save(); g.translate(0, sink * 300); figure(g, 'calculator', 150, H, 262, 1, { t }); g.restore(); }
    // CẬN MẶT PHẢN ỨNG (bản 3, người dùng chọn 10-29): "nine years and two days" — quy tắc 72 khớp tới từng ngày → mặt sốc,
    // mặt ≈ 40% cao khung (LESSONS §216) ở nửa trái trống; mascot góc lặn xuống trong lúc này (actorOn ở init)
    const [ca, cb] = this.CLOSE, kc = prog(t, ca, ca + 0.3) - prog(t, cb - 0.3, cb);
    if (kc > 0) { const r = 210, hy = 590 + (1 - outBack(clamp(kc))) * 760; bindMascot(g);
      mascot(420, hy + r / 0.19 - r * 1.38, r / 0.19, { mood: 'shock', mouth: 'wide', arms: 'rest', sweat: t > ca + 0.5, look: 1 }); }
  }
}
