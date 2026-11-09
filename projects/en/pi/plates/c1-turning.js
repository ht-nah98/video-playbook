// c1 · Not about circles (p2 câu 24–27) — MỞ HỒI II. Hiểu lầm viết chì "PI IS ABOUT CIRCLES" (vòng tròn sách giáo khoa
// bằng chì bên phải) → gạch đỏ đúng "isn't" → "PI IS ABOUT TURNING" xanh ngay dưới, mũi tên quay xanh ôm vòng chì;
// `spin` đứng TRÁI, vệt quay xanh quanh đầu ngón. Câu 27: góc ở tâm + "the radian" được báo trước.
import { H, C, CG, PI, clamp, outCubic, prog, ground, drift, card, actTitle, typed, note, line, arc, arrowHead,
  strike, ring, figure, lookup, must } from '../kit.js';

const SX = 1500, SY = 500, SR = 150;                   // vòng tròn "sách giáo khoa" (chì) — toạ độ tờ giấy
const X = 740;                                          // cột chữ (tờ giấy) — chừa nhân vật bên trái (mép phải ≈ 620 màn hình)

export default class Turning {
  static ERA = 'vellum';
  static POSES = ['spin'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      most: w(24, 'most'), part: w(24, 'part'),
      school: w(25, 'school'), fact: w(25, 'fact'), circles: w(25, 'circles'), think: w(25, 'think'), circles2: w(25, 'circles', 2),
      isnt: w(26, "isn't"), really: w(26, 'really'), pi: w(26, 'pi'), turning: w(26, 'turning'),
      unit: w(27, 'unit'), angle: w(27, 'angle'), met: w(27, 'met'), forgot: w(27, 'forgot'), radian: w(27, 'radian'), end: L(27).end,
    };
    this.START = L(24).start; this.FROM = this.START - 2.6;
    must('2 * Math.PI > 6', true);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.circles, kind: 'pen' }, { t: T.isnt + 0.05, kind: 'error' }, { t: T.angle, kind: 'tick' }, { t: T.radian, kind: 'shimmer' }];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 3, vy: 1.5 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.page(g, t);
    g.restore();
    actTitle(g, t, this.START, 'II', 'Pi is about turning', 'answers note 1');
    card(g, prog(t, this.START + 0.1, this.START + 1.5), 'II', 'NOT CIRCLES', 'a common misreading');
    // nhân vật: trồi lên khi hiểu lầm được nói ra, rời trước "the radian"
    const kf = prog(t, T.think - 0.35, T.think) - prog(t, T.forgot - 0.2, T.forgot + 0.15);
    const P = figure(g, 'spin', 330, H, 700, kf);
    this.swirl(g, t, P, kf);
  }
  page(g, t) {
    const T = this.T;
    typed(g, 'The most important part.', X, 230, prog(t, T.most - 0.1, T.part + 0.3), `italic 600 54px ${CG}`, C.ink);
    line(g, [[X, 252], [X + 520, 252]], C.ink, 2, { k: prog(t, T.part, T.part + 0.5) });
    // vòng tròn sách giáo khoa (chì) + C = π · d
    note(g, 'in school:', SX - SR, SY - SR - 48, prog(t, T.school - 0.1, T.school + 0.4), { size: 20 });
    arc(g, SX, SY, SR, PI / 2, PI / 2 + 2 * PI, C.lead, 2.2, prog(t, T.circles - 0.3, T.circles + 0.5));
    line(g, [[SX - SR, SY], [SX + SR, SY]], C.lead, 1.4, { k: prog(t, T.circles + 0.2, T.circles + 0.6) });
    const kc = prog(t, T.fact - 0.1, T.fact + 0.6), fy = SY + SR + 84;
    typed(g, 'C =', SX - 40, fy, kc * 2, `italic 600 54px ${CG}`, C.ink, { align: 'right' });
    typed(g, 'π', SX - 10, fy, kc * 2 - 0.6, `italic 700 72px ${CG}`, C.blue, { align: 'center' });
    typed(g, 'd', SX + 16, fy, kc * 3 - 2, `italic 600 54px ${CG}`, C.ink);
    // hiểu lầm (chì) → gạch đỏ đúng "isn't" → ý đúng (xanh) ngay dưới
    note(g, 'pi is about circles', X, 440, prog(t, T.think - 0.1, T.circles2 + 0.3), { size: 34 });
    strike(g, X - 14, 428, X + 470, 426, prog(t, T.isnt, T.isnt + 0.35));
    note(g, 'pi is about turning', X, 530, prog(t, T.pi - 0.05, T.turning + 0.4), { color: C.blue, size: 34 });
    // mũi tên quay xanh ôm vòng chì: π đo sự QUAY
    const kt = prog(t, T.turning - 0.1, T.turning + 0.9), a0 = PI * 0.25, a1 = a0 + 2 * PI * 0.86, RR = SR + 30;
    arc(g, SX, SY, RR, a0, a1, C.blue, 4, kt);
    if (kt >= 1) arrowHead(g, SX + RR * Math.cos(a1), SY - RR * Math.sin(a1), -a1 - PI / 2, C.blue, 16);
    // câu 27: góc ở tâm vòng chì, "a unit of angle", "met once … forgot", "the radian"
    const ka = prog(t, T.angle - 0.1, T.angle + 0.5), b = 1.0;
    line(g, [[SX + SR, SY], [SX, SY], [SX + SR * Math.cos(b), SY - SR * Math.sin(b)]], C.ink, 2.6, { k: ka });
    arc(g, SX, SY, 46, 0, b, C.ink, 2, prog(t, T.angle + 0.3, T.angle + 0.7));
    typed(g, '?', SX + 70, SY - 24, prog(t, T.angle + 0.5, T.angle + 0.7), `italic 700 46px ${CG}`, C.ink, { align: 'center' });
    note(g, 'a unit of angle', X, 660, prog(t, T.unit, T.angle + 0.6), { color: C.ink, size: 24 });
    note(g, 'met once · briefly · forgot', X, 702, prog(t, T.met, T.forgot + 0.3), { size: 20 });
    typed(g, 'the radian', X, 820, prog(t, T.radian - 0.05, T.radian + 0.5), `italic 600 72px ${CG}`, C.blue);
    ring(g, X + 140, 800, 190, 58, prog(t, T.radian + 0.4, T.radian + 1.1), { w: 3 });
  }
  swirl(g, t, P, kf) {                                  // vệt quay xanh quanh đầu ngón (lab drafting khung 1: P(120, 132))
    const T = this.T, k = Math.min(kf, prog(t, T.turning - 0.6, T.turning + 0.3));
    if (k <= 0) return;
    const [fx, fy] = P(120, 132), cx = fx, cy = fy - 40, rr = 62, sweep = 2 * PI * 0.82 * outCubic(k), ph = (t - T.turning) * 2.2;
    g.save(); g.strokeStyle = C.blue; g.lineWidth = 3.5; g.lineCap = 'round'; g.beginPath();
    g.ellipse(cx, cy, rr, rr * 0.36, 0, ph, ph + sweep); g.stroke(); g.restore();
    if (k >= 0.6) { const ea = ph + sweep; arrowHead(g, cx + rr * Math.cos(ea), cy + rr * 0.36 * Math.sin(ea), ea + PI / 2 - 0.25, C.blue, 13); }
    g.save(); g.strokeStyle = C.lead; g.lineWidth = 1.2; g.setLineDash([3, 6]); g.lineDashOffset = -t * 18; g.beginPath();
    g.ellipse(cx, cy, rr + 16, (rr + 16) * 0.36, 0, 0, 2 * PI * clamp(k * 1.5)); g.stroke(); g.restore();
  }
}
