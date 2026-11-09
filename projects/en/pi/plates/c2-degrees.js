// c2 · Three hundred and sixty (p2 câu 28–32). Thước đo độ IN SẴN (xám chì = quy ước), 360 vạch in vào theo vòng;
// kim mực quay đủ một vòng → "360°"; "Babylonian astronomy … sixties" → sáu vạch 60° đậm + BASE 60; 24 ước của 360 tính
// trong code, liệt kê; "≈ days in a year"; dấu chì "CONVENTION" đóng lên thước.
import { C, CG, MONO, PI, clamp, outCubic, prog, ground, drift, card, typed, note, line, arc, arrowHead, stamp,
  lookup, must } from '../kit.js';

const CX = 680, CY = 560, R = 320;                      // thước đo độ (tờ giấy)
const DIV = Array.from({ length: 360 }, (_, i) => i + 1).filter(d => 360 % d === 0);

export default class Degrees {
  static ERA = 'vellum';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      measure: w(28, 'measure'), degrees: w(28, 'degrees'), full: w(28, 'full'), sixty: w(28, 'sixty'), them: w(28, 'them'),
      nothing: w(29, 'nothing'), mathematical: w(29, 'mathematical'), somebody: w(29, 'somebody'), chose: w(29, 'chose'),
      likely: w(30, 'likely'), babylonian: w(30, 'babylonian'), astronomy: w(30, 'astronomy'), sixties: w(30, 'sixties'),
      divided: w(31, 'divided'), evenly: w(31, 'evenly'), tf: w(31, 'twenty-four'), ways: w(31, 'ways'), close: w(31, 'close'),
      days: w(31, 'days'), year: w(31, 'year'),
      handy: w(32, 'handy'), still: w(32, 'still'), convention: w(32, 'convention'), end: L(32).end,
    };
    this.START = L(28).start; this.FROM = this.START - 1.2;
    must('[...Array(360).keys()].filter(i => 360 % (i + 1) === 0).length', 24);
    if (DIV.length !== 24) throw new Error('c2: 360 phải có 24 ước');
    must('6 × 60', 360);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.degrees, kind: 'pen' }, { t: T.nothing, kind: 'tick' }, { t: T.chose, kind: 'tick' }, { t: T.sixties, kind: 'pen' },
      { t: T.divided, kind: 'tick' }, { t: T.convention, kind: 'tick' }];
  }
  render(g, t) {
    const c = drift(t, this.FROM, { vx: 3, vy: 1.5 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.dial(g, t); this.right(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.9, this.FROM + 2.3), 'II', 'THREE-SIXTY', 'degrees · convention');
  }
  dial(g, t) {
    const T = this.T, kp = prog(t, T.measure - 0.2, T.degrees + 0.9);   // máy in lăn quanh vòng: vạch hiện theo góc
    if (kp <= 0) return;
    const P = (a, r) => [CX + r * Math.cos(a * PI / 180), CY - r * Math.sin(a * PI / 180)];
    arc(g, CX, CY, R, 0, 360 * kp * PI / 180, C.leadT, 2);
    arc(g, CX, CY, R - 56, 0, 360 * kp * PI / 180, C.lead, 1.2);
    g.save(); g.strokeStyle = C.leadT; g.lineCap = 'butt';
    const n = Math.floor(360 * kp);
    for (let d = 0; d < n; d++) {
      const len = d % 10 === 0 ? 30 : d % 5 === 0 ? 20 : 11, [x0, y0] = P(d, R), [x1, y1] = P(d, R - len);
      g.lineWidth = d % 10 === 0 ? 1.8 : 1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    }
    g.restore();
    for (let d = 0; d < n; d += 30) {
      const [x, y] = P(d, R + 34);
      g.save(); g.font = `500 20px ${MONO}`; g.fillStyle = C.leadT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(d + '°', x, y); g.restore();
    }
    // kim mực quay đủ một vòng ở "a full turn"
    const kn = prog(t, T.full - 0.1, T.sixty + 0.2), an = 360 * outCubic(kn);
    if (kn > 0) {
      const [nx, ny] = P(an, R - 70);
      line(g, [[CX, CY], [nx, ny]], C.ink, 3);
      arc(g, CX, CY, 92, 0, an * PI / 180, C.ink, 2.4);
      if (kn < 1) arrowHead(g, CX + 92 * Math.cos(an * PI / 180), CY - 92 * Math.sin(an * PI / 180), -an * PI / 180 - PI / 2, C.ink, 14);
      g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(CX, CY, 6, 0, 7); g.fill(); g.restore();
    }
    typed(g, '360°', CX, CY + 170, prog(t, T.sixty, T.them + 0.3), `600 72px ${CG}`, C.leadT, { align: 'center' });
    note(g, 'nothing mathematical', CX, CY - 150, prog(t, T.nothing, T.mathematical + 0.6), { align: 'center', size: 20 });
    note(g, 'somebody chose it', CX, CY - 116, prog(t, T.somebody, T.chose + 0.5), { align: 'center', size: 20, color: C.ink });
    // sáu vạch 60° đậm (cơ số 60 của thiên văn Babylon)
    const k6 = prog(t, T.sixties - 0.1, T.sixties + 0.9);
    for (let i = 0; i < 6; i++) {
      const kk = clamp(k6 * 6 - i); if (kk <= 0) break;
      const [x0, y0] = P(i * 60, R + 8), [x1, y1] = P(i * 60, R - 56 - 26 * kk);
      line(g, [[x0, y0], [x1, y1]], C.ink, 4);
    }
    // dấu chì đóng lên thước
    stamp(g, 'CONVENTION', CX + 320, CY + 345, prog(t, T.convention - 0.05, T.convention + 0.3), `500 34px ${MONO}`, C.leadT, { rot: -0.12 });
  }
  right(g, t) {                                          // cột phải: nguồn gốc + 24 ước
    const T = this.T, x = 1170;
    note(g, 'babylonian astronomy', x, 260, prog(t, T.babylonian, T.astronomy + 0.5), { size: 24, color: C.ink });
    typed(g, 'base 60', x, 336, prog(t, T.sixties, T.sixties + 0.4), `italic 600 54px ${CG}`, C.ink);
    note(g, `6 × 60 = ${must('6 * 60', 360)}`, x + 230, 330, prog(t, T.sixties + 0.5, T.sixties + 1.2), { size: 22 });
    note(g, 'most likely', x, 220, prog(t, T.likely - 0.1, T.likely + 0.3), { size: 20 });
    // 24 ước: 6 cột × 4 hàng, viết vào lần lượt từ "divided" tới "ways"
    const y0 = 470;
    typed(g, '360 ÷', x, y0, prog(t, T.divided - 0.1, T.divided + 0.2), `600 46px ${CG}`, C.ink);
    DIV.forEach((d, i) => {
      const a = T.divided + 0.2 + (T.ways - T.divided) * i / DIV.length, k = prog(t, a, a + 0.12);
      typed(g, String(d), x + 40 + (i % 6) * 96, y0 + 66 + Math.floor(i / 6) * 56, k * 3, `600 46px ${CG}`, C.ink, { align: 'center' });
    });
    const yb = y0 + 66 + 3 * 56 + 64;
    line(g, [[x, yb - 36], [x + 560, yb - 36]], C.lead, 1.2, { k: prog(t, T.tf, T.tf + 0.4) });
    note(g, `= ${DIV.length} even ways`, x, yb, prog(t, T.tf, T.ways + 0.4), { color: C.ink, size: 24 });
    note(g, '≈ days in a year', x, yb + 46, prog(t, T.days - 0.2, T.year + 0.3), { size: 24 });
    note(g, 'very handy', x, yb + 92, prog(t, T.handy - 0.1, T.handy + 0.4), { size: 20 });
  }
}
