// d3 · No shortcut (p2 câu 62–68). Tờ cuối PLATE III — vòng compa xanh chuẩn (760, 540) R 280 là vật chính:
//   cột ghi chú bên phải: "A ONE-LINE REASON?" gạch đỏ ở "isn't" → "NO SHORTCUT" xanh; Niven 1947 · one page · calculus
//   cầu phương hình tròn: chỉ compa + thước; hình vuông cùng diện tích (cạnh r√π, TÍNH trong code) dựng bằng chì hết lần
//   này tới lần khác — nét cuối không bao giờ khép; "IMPOSSIBLE · 1882" đóng dấu (impact) → chữ số π khắc quanh vành:
//   chúng là lý do bài toán không bao giờ giải được.
import { C, CG, MONO, PI, PI_DIGITS, clamp, hash, outCubic, prog, ground, drift, card, note, line, compassCircle,
  pivot, strike, stamp, hatch, lookup, must } from '../kit.js';

const CX = 760, CY = 540, R = 280;

export default class Shortcut {
  static ERA = 'vellum';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      simple: w(62, 'simple'), number: w(62, 'number'), circle: w(62, 'circle'), behave: w(62, 'behave'),
      isnt: w(63, "isn't"), oneLine: w(63, 'one-line'), one: w(63, 'one'), proofs: w(63, 'proofs'), subtle: w(63, 'subtle'),
      niven: w(64, 'niven'), y1947: w(64, 'nineteen'), y47: w(64, 'forty-seven'), page: w(64, 'page'), needs: w(64, 'needs'), calculus: w(64, 'calculus'),
      what: w(65, 'what'), costs: w(65, 'costs'),
      greeks: w(66, 'greeks'), question: w(66, 'question'), compass: w(66, 'compass'), straight: w(66, 'straight'), edge: w(66, 'edge'),
      square: w(66, 'square'), exactly: w(66, 'exactly'), area: w(66, 'area'), circle2: w(66, 'circle'),
      years: w(67, 'years'), people: w(67, 'people'), result: w(67, 'result'), tried: w(67, 'tried'), lind: w(67, "lindemann's"), settled: w(67, 'settled'), impossible: w(67, 'impossible'),
      because: w(67, 'because'), trans: w(67, 'transcendental'),
      endless: w(68, 'endless'), arent: w(68, "aren't"), flaw: w(68, 'flaw'), reason: w(68, 'reason'), oldest: w(68, 'oldest'), never: w(68, 'never'), solved: w(68, 'solved'),
      end: L(68).end,
    };
    this.START = L(62).start; this.FROM = this.START - 1.2;
    // hình vuông cùng diện tích với hình tròn: cạnh s = R·√π
    this.S = R * Math.sqrt(PI);
    must(`Math.abs(${this.S} ** 2 - Math.PI * ${R} ** 2) < 1e-6`, true);
    this.YEAR = String(must('1882', 1882)); this.NIVEN = String(must('1947', 1947));
    // các lần thử: thời điểm bắt đầu, lệch cạnh / góc / khe hở (tất định)
    const T = this.T, a = T.square, tries = [a, T.years - 0.2, T.people, T.tried + 0.1, T.lind - 0.05, T.result];
    this.TRY = tries.map((t0, i) => ({ t0, dur: i ? 0.62 : 1.3, s: this.S * (1 + (hash(i * 3.7 + 1) - 0.5) * (i ? 0.07 : 0)),
      rot: i ? (hash(i * 5.3 + 2) - 0.5) * 0.08 : 0, gap: 26 + hash(i * 1.9 + 4) * 30 }));
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.circle - 0.2, kind: 'pen' }, { t: T.one, kind: 'tick' }, { t: T.niven, kind: 'tick' }, { t: T.costs, kind: 'tick' },
      { t: T.square, kind: 'pen' }, { t: T.years, kind: 'pen' }, { t: T.impossible + 0.05, kind: 'impact' },
      { t: T.endless + 0.12, kind: 'pen' },
    ];
  }
  render(g, t) {
    const T = this.T, c = drift(t, this.FROM, { vx: 7, vy: 1 });
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.figure(g, t);
    this.notes(g, t);
    g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'III', 'NO SHORTCUT', 'squaring the circle');
  }
  figure(g, t) {
    const T = this.T;
    // vùng diện tích: hatch chì trong hình tròn ở "same area"
    const ka = prog(t, T.area, T.circle2 + 0.4);
    if (ka > 0) hatch(g, x => x.arc(CX, CY, R * outCubic(ka), 0, 7), 'rgba(35,72,166,0.28)', 12);
    pivot(g, CX, CY, prog(t, T.number - 0.4, T.circle - 0.2));
    compassCircle(g, CX, CY, R, { k: prog(t, T.circle - 0.2, T.behave + 0.4), a0: PI / 2 });
    // compa: cánh từ tâm ra vành, quét theo "compass"; thước: dải có vạch dưới hình
    const kc = prog(t, T.compass - 0.1, T.compass + 0.5);
    if (kc > 0) { const a = -0.5 - 0.9 * outCubic(kc); line(g, [[CX, CY], [CX + R * Math.cos(a), CY - R * Math.sin(a)]], C.leadT, 2, { k: clamp(kc * 2) }); }
    const kr = prog(t, T.straight - 0.1, T.edge + 0.4), ry = 955;
    if (kr > 0) {
      line(g, [[460, ry], [1060, ry], [1060, ry + 30], [460, ry + 30], [460, ry]], C.ink, 2, { k: kr });
      for (let i = 1; i < 30; i++) line(g, [[460 + i * 20, ry], [460 + i * 20, ry + (i % 5 ? 9 : 16)]], C.leadT, 1.2, { k: kr * 2 - 1 - i / 60 });
    }
    // hình vuông dựng hết lần này tới lần khác, nét thứ tư không khép
    this.TRY.forEach((p, i) => {
      const k = prog(t, p.t0, p.t0 + p.dur);
      if (k <= 0) return;
      const h = p.s / 2, cs = Math.cos(p.rot), sn = Math.sin(p.rot), P = (x, y) => [CX + x * cs - y * sn, CY + x * sn + y * cs];
      const pts = [P(-h, h), P(h, h), P(h, -h), P(-h, -h), P(-h, h - p.gap)];
      const last = i === this.TRY.length - 1;
      line(g, pts, last ? C.ink : C.lead, last ? 2.6 : 1.6, { k });
      // khe hở: hai vạch chì nhỏ đánh dấu chỗ không khép
      if (k >= 1) { const [gx, gy] = P(-h, h - p.gap / 2); line(g, [[gx - 10, gy], [gx + 10, gy]], C.leadT, 1.2); }
    });
    if (t > this.TRY[0].t0 + 1.3) note(g, '?', CX - this.S / 2 + 24, CY + this.S / 2 - 34, prog(t, this.TRY[0].t0 + 1.3, this.TRY[0].t0 + 1.5), { color: C.ink, size: 34 });
    // dấu IMPOSSIBLE · 1882 giữa hình, nền giấy đặc sau chữ cho đọc được qua nét chì
    const ks = prog(t, T.impossible - 0.05, T.impossible + 0.3);
    if (ks > 0) {
      const sc = 1 + (1 - outCubic(ks)) * 0.8;
      g.save(); g.translate(CX, CY); g.rotate(-0.08); g.scale(sc, sc); g.fillStyle = 'rgba(239,232,214,0.94)'; g.font = `600 54px ${CG}`; const bw = g.measureText('IMPOSSIBLE · ' + this.YEAR).width + 40; g.fillRect(-bw / 2, -36, bw, 72); g.restore();
      stamp(g, 'IMPOSSIBLE · ' + this.YEAR, CX, CY, ks, `600 54px ${CG}`, C.ink, { rot: -0.08 });
    }
    // chữ số π khắc quanh vành như thước đo: chạy mãi, không dừng
    const kd = t - T.endless;
    if (kd > 0) {
      const n = Math.min(PI_DIGITS.length, Math.floor(kd * 16)), rr = R + 96, step = 0.052;
      g.save(); g.font = `500 22px ${MONO}`; g.fillStyle = C.blue; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let i = 0; i < n && i * step < 2 * PI - 0.05; i++) {
        const a = PI / 2 - i * step; g.save(); g.translate(CX + rr * Math.cos(a), CY - rr * Math.sin(a)); g.rotate(PI / 2 - a); g.fillText(PI_DIGITS[i], 0, 0); g.restore();
      }
      g.restore();
    }
  }
  notes(g, t) {
    const T = this.T, x = 1180;
    note(g, 'a one-line reason?', x, 260, prog(t, T.simple, T.behave + 0.3), { size: 28 });
    strike(g, x - 10, 250, x + 350, 250, prog(t, T.isnt, T.oneLine + 0.3), { seed: 17 });
    note(g, 'no shortcut', x, 316, prog(t, T.one - 0.1, T.one + 0.4), { color: C.blue, size: 34 });
    note(g, 'the proofs: real, but subtle', x, 360, prog(t, T.proofs, T.subtle + 0.4), { size: 22 });
    note(g, 'ivan niven · ' + this.NIVEN, x, 430, prog(t, T.niven - 0.1, T.y47 + 0.4), { color: C.ink, size: 28 });
    note(g, 'one page · needs calculus', x, 474, prog(t, T.page - 0.3, T.calculus + 0.4), { color: C.ink, size: 28 });
    // trang giấy nhỏ: một trang chứng minh
    const kp = prog(t, T.page - 0.2, T.page + 0.4), px = 1720, py = 400;
    if (kp > 0) {
      line(g, [[px, py], [px + 64, py], [px + 64, py + 84], [px, py + 84], [px, py]], C.ink, 1.8, { k: kp });
      for (let i = 0; i < 6; i++) line(g, [[px + 10, py + 14 + i * 12], [px + 10 + 44 * (0.6 + 0.4 * hash(i * 2.3)), py + 14 + i * 12]], C.lead, 1.2, { k: kp * 2 - 1 - i * 0.1 });
    }
    note(g, 'what it costs:', x, 560, prog(t, T.what, T.costs + 0.3), { color: C.blue, size: 28 });
    note(g, 'compass + straight edge only', x, 610, prog(t, T.compass - 0.2, T.edge + 0.4), { size: 22 });
    note(g, 'a square with the same area?', x, 650, prog(t, T.square - 0.2, T.circle2 + 0.4), { color: C.ink, size: 22 });
    note(g, '2,000+ years of trying', x, 720, prog(t, T.years - 0.3, T.tried + 0.4), { size: 22 });
    must('2000', 2000);
    note(g, 'settled: lindemann · ' + this.YEAR, x, 760, prog(t, T.settled - 0.2, T.settled + 0.6), { color: C.ink, size: 22 });
    note(g, 'because π is transcendental', x, 800, prog(t, T.because, T.trans + 0.5), { color: C.blue, size: 22 });
    note(g, 'endless digits: a flaw?', x, 880, prog(t, T.endless, T.arent), { size: 22 });
    strike(g, x + 236, 872, x + 354, 872, prog(t, T.arent, T.flaw + 0.2), { seed: 29, w: 5 });
    note(g, '→ the reason it can never be done', x, 920, prog(t, T.reason - 0.1, T.solved + 0.3), { color: C.blue, size: 22 });
  }
}
