// f1 · Putting it together (p2 câu 85–92) — mở HỒI V. Bốn tờ PLATE thu nhỏ (vẽ lại bằng hàm kit, không import cảnh khác)
// nằm trên bàn, vẽ chì; tờ nào đúng câu thì sáng lên (mực đậm, xanh hiện), tờ khác giữ chì. "π = C ÷ d" chì bị gạch
// → "chỉ là cách đo". Câu gộp: ngoặc mực ôm cả bốn tờ, "π is what flat geometry has to say about turning"; cuối: các
// ngành π hiện ra, viết thành ghi chú.
import { C, CG, MONO, ARC, PI, PI_DIGITS, clamp, outCubic, prog, ground, drift, card, actTitle, typed, note, line,
  poly, compassCircle, pivot, arc, strike, check, lookup, must, mono } from '../kit.js';

const SX = [170, 590, 1010, 1430], SY = 320, SW = 380, SH = 400;   // bốn tờ (thế giới); dải khung tên ở đáy mỗi tờ
const NAMES = [['I', 'A LIMIT'], ['II', 'TURNING'], ['III', 'NO REPEAT'], ['IV', 'FLAT SPACE']];
const hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
const mix = (a, b, k) => { const A = hex(a), B = hex(b), u = clamp(k); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; };

export default class Together {
  static ERA = 'vellum';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      so: w(85, 'so'), really: w(85, 'really'),
      circ: w(86, 'circumference'), diam: w(86, 'diameter'), measure: w(86, 'measure'), what: w(86, 'what'), e86: L(86).end,
      limit: w(87, 'limit'), polygons: w(87, 'polygons'), sides: w(87, 'sides'), multiply: w(87, 'multiply'), without: w(87, 'without'),
      end2: w(87, 'end', 2), straight: w(87, 'straight'), curved: w(87, 'curved'),
      natural: w(88, 'natural'), turning: w(88, 'turning'), half: w(88, 'half'), turn: w(88, 'turn'), radius: w(88, 'radius'), one: w(88, 'one'),
      irr: w(89, 'irrational'), lambert: w(89, 'lambert'), y1761: w(89, 'sixty-one'), lindemann: w(89, 'lindemann'), y1882: w(89, 'eighty-two'),
      compass: w(89, 'compass'), square: w(89, 'square'), circle89: w(89, 'circle'),
      constant: w(90, 'constant'), flat: w(90, 'flat'), space: w(90, 'space'), bend: w(90, 'bend'), circles: w(90, 'circles'), obeying: w(90, 'obeying'),
      together: w(91, 'together'), pi91: w(91, 'pi'), turning91: w(91, 'turning'), e91: L(91).end,
      nearly: w(92, 'nearly'), flat92: w(92, 'flat'), works: w(92, 'works'), turns: w(92, 'turns'), fields: w(92, 'fields'),
      stats: w(92, 'statistics'), quantum: w(92, 'quantum'), prob: w(92, 'probability'), number: w(92, 'number'), theory: w(92, 'theory'),
    };
    // câu của từng tờ: [bắt đầu, câu sau bắt đầu]
    this.SPAN = [[L(87).start, L(88).start], [L(88).start, L(89).start], [L(89).start, L(90).start], [L(90).start, L(91).start]];
    this.START = L(85).start; this.FROM = this.START - 2.6;
    // toán trên hình
    this.CD2 = must('Math.PI * Math.sin(Math.PI / 2) / (Math.PI / 2)', 2);   // xích đạo quanh cực: C/d = π·sin(a)/a, a = π/2
    must('1761 < 1882', true);
  }
  sfx() {
    const T = this.T;
    return [
      { t: this.START + 0.55, kind: 'tick' },              // bốn tờ đặt xuống bàn
      { t: T.diam + 0.45, kind: 'error' },                 // gạch chữ "just"
      { t: T.limit - 0.3, kind: 'pen' },                   // tờ I sáng, vòng xanh quét
      { t: T.multiply + 0.3, kind: 'snap' },               // đa giác nhân đôi cạnh
      { t: T.half, kind: 'pen' },                          // nửa vòng xanh
      { t: T.irr + 0.4, kind: 'tick' },                    // chữ số chạy quanh vành
      { t: T.y1761 + 0.2, kind: 'tick' },
      { t: T.bend, kind: 'pen' },                          // vòng tròn trên quả cầu
      { t: T.turning91, kind: 'shimmer' },                 // câu gộp
      { t: T.works, kind: 'tick' }, { t: T.stats, kind: 'tick' },
    ];
  }
  lv(i, t) {                                               // độ "sáng" của tờ i: lên đúng câu, lùi về nửa chì khi sang câu sau, cả bốn lên ở câu gộp
    const [a, b] = this.SPAN[i], up = prog(t, a - 0.15, a + 0.35), down = 1 - 0.55 * prog(t, b - 0.1, b + 0.4);
    return Math.max(Math.min(up, down), prog(t, this.T.together - 0.2, this.T.together + 0.5));
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 2.5, vy: 1, max: 60 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    // câu hỏi + định nghĩa sách giáo khoa bị gạch
    typed(g, 'So what is π, really?', 170, 210, prog(t, T.so, T.really + 0.3), `italic 600 72px ${CG}`, C.ink);
    // "not JUST C ÷ d": công thức giữ mực (nó đúng), chỉ chữ "just" bị gạch đỏ
    const kd = prog(t, T.circ - 0.1, T.diam + 0.3), fq = `italic 600 72px ${CG}`, qx = 880;
    g.save(); g.font = fq; const wA = g.measureText('π is ').width, wJ = g.measureText('just').width; g.restore();
    typed(g, 'π is just C ÷ d', qx, 210, kd, fq, C.ink);
    strike(g, qx + wA - 8, 188, qx + wA + wJ + 8, 182, prog(t, T.diam + 0.4, T.diam + 0.75));
    note(g, 'only how to measure it', qx, 262, prog(t, T.measure - 0.2, T.measure + 0.6), { color: C.blue, size: 20 });
    note(g, '≠ what it is', qx, 292, prog(t, T.what - 0.1, T.e86 + 0.1), { color: C.blue, size: 20 });
    // bốn tờ trượt lên bàn (lệch nhau), rồi sáng theo câu
    for (let i = 0; i < 4; i++) {
      const kin = outCubic(prog(t, this.START + 0.2 + i * 0.12, this.START + 0.9 + i * 0.12));
      if (kin <= 0) continue;
      const lv = this.lv(i, t), [a, b] = this.SPAN[i], lift = 10 * prog(t, a - 0.15, a + 0.35) * (1 - prog(t, b - 0.1, b + 0.4));
      this.sheet(g, i, SX[i], SY + (1 - kin) * 520 - lift, lv, lift, t);
    }
    this.notesUnder(g, t);
    // câu gộp: ngoặc mực ôm bốn tờ, π xanh + câu
    const kb = prog(t, T.together - 0.2, T.together + 0.6), by = 850;
    line(g, [[SX[0], by - 14], [SX[0], by], [SX[3] + SW, by], [SX[3] + SW, by - 14]], C.ink, 2.2, { k: kb });
    line(g, [[990, by], [990, by + 16]], C.ink, 2.2, { k: kb * 3 - 2 });
    const rest = 'is what flat geometry has to say about turning', f = `italic 600 54px ${CG}`;
    g.save(); g.font = f; const wr = g.measureText(rest).width; g.restore();
    const x0 = 990 - (wr + 56) / 2;
    typed(g, 'π', x0, 922, prog(t, T.pi91 - 0.1, T.pi91 + 0.1), `italic 700 72px ${CG}`, C.blue);
    typed(g, rest, x0 + 56, 922, prog(t, T.pi91 + 0.2, T.turning91 + 0.4), f, C.ink);
    // π hiện ở các ngành không dính đến hình tròn
    note(g, 'π also turns up in:', 170, 985, prog(t, T.turns, T.fields + 0.5), { size: 22 });
    const F = [[T.stats, 'statistics'], [T.quantum, 'quantum physics'], [T.prob, 'probability'], [T.number, 'number theory']];
    let fx = 610;
    g.save(); g.font = `500 22px ${MONO}`; g.letterSpacing = '2px';
    const fw = F.map(([, s]) => g.measureText(s.toUpperCase()).width); const dot = g.measureText(' · ').width; g.restore();
    F.forEach(([a, s], i) => {
      if (i) note(g, '·', fx - dot / 2 - 6, 985, prog(t, a - 0.1, a), { color: C.leadT, size: 22 });
      note(g, s, fx, 985, prog(t, a, a + 0.45), { color: C.ink, size: 22 }); fx += fw[i] + dot;
    });
    g.restore();
    card(g, prog(t, this.START - 0.1, this.START + 1.3), 'V', 'SUMMARY', 'putting it together');
    actTitle(g, t, this.START, 'V', 'Putting it together');
  }
  sheet(g, i, x, y, lv, lift, t) {
    const ink = mix(C.lead, C.ink, lv);
    g.save();
    g.fillStyle = `rgba(31,42,54,${0.10 + 0.08 * lift / 10})`; g.fillRect(x + 8, y + 10 + lift * 0.6, SW, SH);
    g.fillStyle = '#F3EDDE'; g.fillRect(x, y, SW, SH);
    g.strokeStyle = ink; g.lineWidth = 1.6; g.strokeRect(x, y, SW, SH); g.strokeRect(x + 8, y + 8, SW - 16, SH - 16);
    g.lineWidth = 1.2; g.beginPath(); g.moveTo(x + 8, y + 316); g.lineTo(x + SW - 8, y + 316); g.moveTo(x + 104, y + 316); g.lineTo(x + 104, y + SH - 8); g.stroke();
    g.restore();
    const tc = mix(C.leadT, C.ink, lv);
    typed(g, 'PLATE', x + 56, y + 344, 1, `600 18px ${ARC}`, C.leadT, { align: 'center', ls: 3 });
    typed(g, NAMES[i][0], x + 56, y + 382, 1, `600 40px ${CG}`, tc, { align: 'center' });
    typed(g, NAMES[i][1], x + 122, y + 368, 1, `700 26px ${ARC}`, tc, { ls: 2 });
    this['art' + i](g, x + SW / 2, y + 160, lv, t);
  }
  art0(g, cx, cy, lv, t) {                                  // I · kẹp hình tròn giữa đa giác trong/ngoài, nhân đôi cạnh theo lời
    const T = this.T, R = 96, ink = mix(C.lead, C.ink, lv);
    const n = t < T.multiply ? 6 : t < T.without ? 12 : t < T.end2 ? 24 : 48;
    line(g, poly(cx, cy, R, n), ink, 1.6);
    line(g, poly(cx, cy, R / Math.cos(PI / n), n), ink, 1.6);
    compassCircle(g, cx, cy, R, { w: 1.6, color: C.lead });
    compassCircle(g, cx, cy, R, { w: 3.2, color: C.blue, k: prog(t, T.limit - 0.3, T.limit + 0.6) * (lv > 0.05 ? 1 : 0) });
    pivot(g, cx, cy, 0.6);
  }
  art1(g, cx, cy, lv, t) {                                  // II · nửa vòng xanh = π trên vòng bán kính 1, cạnh là bóng sóng sin
    const T = this.T, ox = cx - 70, R = 78, ink = mix(C.lead, C.ink, lv);
    arc(g, ox, cy, R, 0, 2 * PI, C.lead, 1.6);
    line(g, [[ox, cy], [ox + R, cy]], ink, 1.6);
    typed(g, '1', ox + R / 2 - 4, cy + 30, prog(t, T.radius, T.one + 0.2), `italic 600 40px ${CG}`, C.ink);
    arc(g, ox, cy, R, 0, PI, C.blue, 7, prog(t, T.half - 0.1, T.turn + 0.3));
    typed(g, 'π', ox - 12, cy - R - 16, prog(t, T.turn, T.turn + 0.15), `italic 700 46px ${CG}`, C.blue);
    pivot(g, ox, cy, 0.6);
    const wv = Array.from({ length: 41 }, (_, j) => [ox + R + 22 + j * 2.9, cy - 46 * Math.sin(j / 40 * 2 * PI)]);
    line(g, wv, C.lead, 1.4);
    line(g, wv, ink, 2.2, { k: prog(t, T.natural, T.turning + 0.4) });
  }
  art2(g, cx, cy, lv, t) {                                  // III · chữ số π chạy quanh vành; giữa: "stop or loop"; cầu phương không khép
    const T = this.T, R = 80, ink = mix(C.lead, C.ink, lv);
    compassCircle(g, cx, cy, R, { w: 1.6, color: C.lead });
    compassCircle(g, cx, cy, R, { w: 3, color: C.blue, k: prog(t, T.irr - 0.4, T.irr + 0.4) * (lv > 0.05 ? 1 : 0) });
    const N = 47, s = PI_DIGITS.replace('.', ''), shown = 10 + Math.floor((N - 13) * prog(t, T.irr, T.lambert));   // 44 chữ số trên 47 ô: khe 3 ô = chỗ bắt đầu
    g.save(); g.font = `500 18px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let j = 0; j < shown; j++) {
      const a = PI / 2 - j / N * 2 * PI;
      g.save(); g.translate(cx + 104 * Math.cos(a), cy - 104 * Math.sin(a)); g.rotate(PI / 2 - a);
      g.fillStyle = j < 10 ? mix(C.leadT, C.ink, lv) : C.ink; g.fillText(s[j], 0, 0); g.restore();
    }
    g.restore();
    note(g, 'stop', cx, cy - 6, 1, { align: 'center', size: 18, color: mix(C.leadT, C.ink, lv) });
    note(g, 'or loop?', cx, cy + 20, 1, { align: 'center', size: 18, color: mix(C.leadT, C.ink, lv) });
    // hình vuông cùng diện tích (cạnh R·√π), dựng bằng chì, không bao giờ khép
    const h = R * Math.sqrt(PI) / 2;
    line(g, [[cx - h + 16, cy - h], [cx + h, cy - h], [cx + h, cy + h], [cx - h, cy + h], [cx - h, cy - h + 14]], ink, 1.4,
      { dash: [5, 5], k: prog(t, T.compass - 0.2, T.circle89 + 0.3) });
  }
  art3(g, cx, cy, lv, t) {                                  // IV · vòng tròn trên quả cầu: xích đạo quanh cực Bắc, C/d = 2
    const T = this.T, R = 100, ink = mix(C.lead, C.ink, lv);
    arc(g, cx, cy, R, 0, 2 * PI, ink, 1.8);
    g.save(); g.strokeStyle = C.lead; g.lineWidth = 1.2;
    g.beginPath(); g.ellipse(cx, cy, 40, R, 0, 0, 2 * PI); g.stroke();
    g.beginPath(); g.ellipse(cx, cy - 50, R * 0.866, 18, 0, 0, 2 * PI); g.stroke();
    g.beginPath(); g.ellipse(cx, cy, R, 26, 0, 0, 2 * PI); g.stroke(); g.restore();
    // xích đạo xanh, quét theo "bend"
    const ke = prog(t, T.bend - 0.1, T.circles + 0.4);
    if (ke > 0) { g.save(); g.strokeStyle = C.blue; g.lineWidth = 4; g.beginPath(); g.ellipse(cx, cy, R, 26, 0, 0.2, 0.2 + 2 * PI * ke); g.stroke(); g.restore(); }
    if (ke > 0) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(cx, cy - R, 4.5, 0, 7); g.fill(); g.restore();
      line(g, [[cx, cy - R], [cx + R, cy]], C.blue, 1.4, { dash: [4, 4], k: ke }); }
    typed(g, `C/d = ${this.CD2}`, cx + 40, cy + R + 36, prog(t, T.obeying - 0.1, T.obeying + 0.4), `italic 600 40px ${CG}`, C.blue);
  }
  notesUnder(g, t) {                                       // ghi chú chì dưới từng tờ (thế giới)
    const T = this.T, y = SY + SH + 42, nt = (s, i, r, a, b, color = C.ink) => note(g, s, SX[i] + 8, y + r * 28, prog(t, a, b), { size: 18, color });
    mono(g, 'n → ∞', SX[0] + 8, y, prog(t, T.multiply, T.multiply + 0.4), C.ink, 18);
    nt('straight → curved', 0, 1, T.straight - 0.1, T.curved + 0.3);
    nt('half a turn = π', 1, 0, T.half, T.turn + 0.4);
    nt('on a circle of radius 1', 1, 1, T.radius - 0.3, T.one + 0.4);
    nt('1761 · irrational', 2, 0, T.lambert, T.y1761 + 0.3);
    nt('1882 · transcendental', 2, 1, T.lindemann, T.y1882 + 0.4);
    nt('no squaring the circle', 2, 2, T.square - 0.2, T.circle89 + 0.4, C.leadT);
    nt('constant of flat space', 3, 0, T.constant, T.space + 0.3);
    nt('bend it: ratio changes', 3, 1, T.bend + 0.1, T.obeying + 0.4, C.leadT);
    nt('our universe: nearly flat', 3, 2, T.nearly - 0.2, T.flat92 + 0.5, C.blue);
    if (t > T.works) check(g, SX[3] + SW - 34, SY + 36, 16, prog(t, T.works, T.works + 0.35), { w: 4 });
  }
}
