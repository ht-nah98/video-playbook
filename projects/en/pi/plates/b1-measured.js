// b1 · Measured, not explained (p2 câu 0–3) — MỞ HỒI I và mở cả trang p2: đen (p1 kết bằng vòng mực khép về đen) →
// iris mở một vòng giấy từ tâm → thẻ hồi "PLATE I · Trapping the circle" → tờ bản vẽ: thước đo chì dưới tiêu đề
// ("they measured it"), Babylon = bảng đất sét vẽ chì + "3" / "3⅛" chì, Ai Cập = ảnh sách cói Rhind (bản khắc) + ruộng
// tròn + 256/81 ≈ 3.16 mực; "these numbers" → ngoặc chì ôm cả ba số, nhãn chì MEASURED (đối với PROVED ở b2),
// "REASON: ____" bỏ trống, "Why this number?".
import { W, H, C, CG, PI, hash, clamp, prog, ground, drift, card, actTitle, iris, typed, note, frac, line, portrait,
  lookup, must, fix } from '../kit.js';

const tw = (g, s, font) => { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; };
/** Phân số chồng VIẾT vào: lộ dần trái → phải theo k (không fade). */
function fracK(g, num, den, x, y, size, color, k) {
  if (k <= 0) return;
  const w = tw(g, num.length > den.length ? num : den, `600 ${size}px ${CG}`) + size * 0.2;
  g.save(); g.beginPath(); g.rect(x - w / 2 - 4, y - size * 1.6, (w + 8) * clamp(k), size * 2.4); g.clip();
  frac(g, num, den, x, y, size, color); g.restore();
}

export default class Measured {
  static ERA = 'vellum';
  static POSES = [];
  static IMAGES = { rhind: './assets/history/rhind-papyrus.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      knew: w(0, 'knew'), explain: w(0, 'explain'), measured: w(0, 'measured'),
      babylonian: w(1, 'babylonian'), usually: w(1, 'usually'), three1: w(1, 'three'), tablet: w(1, 'tablet'),
      three2: w(1, 'three', 2), eighth: w(1, 'eighth'),
      egypt: w(2, 'egypt'), rhind: w(2, 'rhind'), papyrus: w(2, 'papyrus'), sixteen: w(2, 'sixteen'), bc: w(2, 'bc'), round: w(2, 'round'),
      field: w(2, 'field'), three: w(2, 'three'), six: w(2, 'six'),
      these: w(3, 'these'), numbers: w(3, 'numbers'), good: w(3, 'good'), granaries: w(3, 'granaries'),
      measurements: w(3, 'measurements'), reasons: w(3, 'reasons'), nobody: w(3, 'nobody'), why: w(3, 'why'), end: L(3).end,
    };
    this.START = L(0).start; this.FROM = this.START - 2.6;
    this.N = {
      bab: String(must('3', 3)), babT: '3⅛', babV: fix('25 / 8', 3), egypt: fix('256 / 81', 2),
    };
    must('25 / 8', 3.125); must('Math.round(256 / 81 * 100) / 100', 3.16); must('3 + 1 / 8', 3.125);
    const T = this.T; if (!(T.knew < T.explain && T.round < T.field && T.these < T.numbers)) throw new Error('b1: mốc ngược');
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.measured, kind: 'tick' }, { t: T.babylonian, kind: 'pen' }, { t: T.three2, kind: 'tick' },
      { t: T.rhind - 0.2, kind: 'pop' }, { t: T.round, kind: 'pen' }, { t: T.three, kind: 'tick' },
      { t: T.these, kind: 'pen' }, { t: T.measurements, kind: 'tick' },
    ];
  }
  render(g, t) {
    if (t < this.FROM) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); return; }
    const T = this.T, c = drift(t, this.FROM);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y); this.sheet(g, t); g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'I', 'MEASURED', 'babylon · egypt');
    actTitle(g, t, this.START, 'I', 'Trapping the circle', 'answers note 1');
    iris(g, W / 2, 460, prog(t, this.FROM, this.FROM + 1.3));   // khớp đĩa cuối p1 (960, 460)
  }
  sheet(g, t) {
    const T = this.T, N = this.N;
    // câu 0: tiêu đề + thước đo chì ("because they measured it")
    typed(g, 'Known long before it was explained.', 230, 215, prog(t, T.knew + 0.2, T.explain + 0.5), `italic 600 54px ${CG}`, C.ink);
    const kr = prog(t, T.measured - 0.15, T.measured + 0.8);
    line(g, [[230, 250], [930, 250]], C.lead, 1.4, { k: kr });
    for (let i = 0; i <= 30; i++) {
      const x = 230 + i * 700 / 30; if ((x - 230) / 700 > kr) break;
      line(g, [[x, 250], [x, 250 + (i % 5 ? 8 : 16)]], C.lead, 1.2);
    }
    // câu 1: Babylon — bảng đất sét vẽ chì, "3" và "3⅛" chì
    note(g, 'babylon', 250, 360, prog(t, T.babylonian, T.babylonian + 0.5), { color: C.ink, size: 24 });
    this.tablet(g, 250, 390, 380, 230, prog(t, T.babylonian, T.usually + 0.4));
    typed(g, N.bab, 270, 770, prog(t, T.three1, T.three1 + 0.15), `600 120px ${CG}`, C.leadT);
    note(g, 'usually', 270, 815, prog(t, T.three1 + 0.2, T.three1 + 0.7), { size: 20 });
    typed(g, N.babT, 440, 770, prog(t, T.three2, T.eighth + 0.2), `600 120px ${CG}`, C.leadT);
    note(g, `one tablet · ${N.babV}`, 440, 815, prog(t, T.eighth + 0.1, T.eighth + 0.9), { size: 20 });
    // câu 2: Ai Cập — sách cói Rhind (bản khắc), ruộng tròn, 256/81 ≈ 3.16
    note(g, 'egypt', 760, 360, prog(t, T.egypt, T.egypt + 0.4), { color: C.ink, size: 24 });
    portrait(g, 'rhind', 760, 395, 240, prog(t, T.rhind - 0.2, T.papyrus + 0.3));
    typed(g, 'Rhind papyrus', 760, 692, prog(t, T.rhind + 0.1, T.rhind + 0.8), `italic 600 44px ${CG}`, C.ink);
    note(g, 'copied c. 1650 bc', 760, 728, prog(t, T.sixteen, T.bc + 0.3), { size: 20 });
    const fx = 1440, fy = 490, fr = 105, kf = prog(t, T.round - 0.1, T.field + 0.5);
    if (kf > 0) {
      g.save(); g.beginPath(); g.arc(fx, fy, fr, 0, 7); g.clip();          // luống cày chì, kéo dần từ trái
      g.strokeStyle = 'rgba(91,95,99,0.5)'; g.lineWidth = 1;
      for (let x = fx - fr; x < fx - fr + 2 * fr * kf; x += 11) { g.beginPath(); g.moveTo(x, fy - fr); g.lineTo(x + 18, fy + fr); g.stroke(); }
      g.restore();
      g.save(); g.strokeStyle = C.lead; g.lineWidth = 1.8; g.beginPath(); g.arc(fx, fy, fr, -PI / 2, -PI / 2 + 2 * PI * clamp(kf * 1.4)); g.stroke(); g.restore();
    }
    note(g, 'round field · area', 1335, 640, prog(t, T.field, T.field + 0.7), { size: 20 });
    fracK(g, '256', '81', 1385, 770, 54, C.ink, prog(t, T.three - 0.6, T.three - 0.1));
    typed(g, `≈ ${N.egypt}`, 1450, 790, prog(t, T.three, T.six + 0.3), `600 96px ${CG}`, C.ink);
    // câu 3: ngoặc chì ôm cả ba số → MEASURED (chì) · REASON: bỏ trống · Why this number?
    const kb = prog(t, T.these, T.numbers + 0.4);
    line(g, [[250, 835], [250, 850], [1700, 850], [1700, 835]], C.lead, 1.6, { k: kb });
    line(g, [[975, 850], [975, 866]], C.lead, 1.6, { k: kb * 2 - 1 });
    note(g, 'good enough for fields · granaries', 250, 905, prog(t, T.good, T.granaries + 0.5), { size: 22 });
    const km = prog(t, T.measurements, T.measurements + 0.5), mw = tw(g, 'MEASURED', `500 34px "IBM Plex Mono"`) + 8 * 2;
    note(g, 'measured', 250, 985, km, { size: 34 });
    line(g, [[236, 943], [250 + mw + 12, 943], [250 + mw + 12, 1001], [236, 1001], [236, 943]], C.lead, 1.4, { dash: [8, 6], k: prog(t, T.measurements + 0.2, T.measurements + 0.9) });
    note(g, 'reason:', 760, 985, prog(t, T.reasons, T.reasons + 0.4), { size: 28, color: C.ink });
    line(g, [[920, 990], [1200, 990]], C.lead, 1.4, { dash: [8, 6], k: prog(t, T.reasons + 0.4, T.nobody + 0.3) });
    typed(g, 'Why this number?', 1330, 990, prog(t, T.why - 0.1, T.end - 0.2), `italic 600 54px ${CG}`, C.ink);
  }
  tablet(g, x, y, w, h, k) {                          // bảng đất sét vẽ chì: viền bo, mặt hatch nhạt, hàng nêm chữ hình nêm
    if (k <= 0) return;
    const r = 26, P = [];
    const corner = (cx, cy, a) => { for (let i = 0; i <= 6; i++) { const b = a + i / 6 * PI / 2; P.push([cx + r * Math.cos(b), cy + r * Math.sin(b)]); } };
    corner(x + w - r, y + r, -PI / 2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, PI / 2); corner(x + r, y + r, PI); P.push(P[0]);
    line(g, P, C.lead, 1.8, { k: clamp(k * 1.6) });
    const n = 4 * 7, m = Math.floor(n * clamp(k * 1.6 - 0.5));
    g.save(); g.fillStyle = C.leadT; g.strokeStyle = C.leadT; g.lineWidth = 1.4;
    for (let i = 0; i < m; i++) {
      const row = Math.floor(i / 7), col = i % 7, wx = x + 40 + col * 46 + (hash(i * 1.7) - 0.5) * 10, wy = y + 48 + row * 46;
      g.beginPath(); g.moveTo(wx, wy - 7); g.lineTo(wx + 12, wy); g.lineTo(wx, wy + 7); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(wx + 10, wy); g.lineTo(wx + 22 + hash(i * 3.3) * 10, wy); g.stroke();
      if (hash(i * 5.1) > 0.55) { g.beginPath(); g.moveTo(wx + 2, wy + 12); g.lineTo(wx + 8, wy + 22); g.stroke(); }
    }
    g.restore();
  }
}
