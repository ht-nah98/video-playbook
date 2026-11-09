// a0 · Cold open (p1) — cảnh MẪU của đạo diễn. Một tờ giấy dài, camera đi xuống qua bốn vùng:
//   0 "1 + 1 = 2" / "π = 3.14 ?" / máy tính (shrug) · 1 vòng compa + C ÷ d + khối NOTES 1–3 (three)
//   2 "chosen by: —" bị gạch / hình học phẳng ép ra π / chuỗi chữ số chạy mãi · 3 câu treo: compa quay, mực xanh loang kín
//   vòng tròn, đen khép từ ngoài vào vòng rồi vòng thu về 0 → đen kín → intro (DNA §6).
import { W, H, C, CG, MONO, ARC, PI, PI_DIGITS, clamp, smooth, outCubic, prog, ground, card, text, typed, note, line,
  compassCircle, pivot, arrowHead, strike, cross, check, ring, figure, lookup, must } from '../kit.js';

const ZONE = 1080;                                    // mỗi vùng cách nhau một khung theo chiều dọc tờ giấy

export default class Open {
  static ERA = 'vellum';
  static POSES = ['shrug', 'three'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      onePlus: w(0, 'one'), isTwo: w(0, 'two'), stone1: w(0, 'stone'), stone2: w(0, 'stone', 2), stones: w(0, 'stones'),
      pi: w(1, 'pi'), four: w(1, 'four'), c2: w(1, 'two'), c4: w(1, 'four', 2), c7: w(1, 'seven'),
      quiet: w(2, 'quiet'), because: w(2, 'because'), calc: w(2, 'calculator'), says: w(2, 'says'),
      around: w(3, 'around'), circle: w(3, 'circle'), divided: w(3, 'divided'), across: w(3, 'across'),
      tru: w(4, 'true'), measure: w(4, 'measure'), what: w(4, 'what'), isEnd: w(4, 'is', 2),
      three: w(5, 'three'), questions: w(5, 'questions'), q1: L(6).start, q2: L(7).start, q3: L(8).start, q3why: w(8, 'why'), geom: w(8, 'geometry'), q3circle: w(8, 'circle'), diff2: w(8, 'different', 2),
      nobody: w(9, 'nobody'), committee: w(9, 'committee'), voted: w(9, 'voted'),
      flat: w(10, 'flat'), forced: w(10, 'forced'), anything: w(10, 'anything'),
      ugly: w(11, 'ugly'), fraction: w(11, 'fraction'), digits: w(11, 'digits'),
      messy: w(12, 'messy'), picked: w(12, 'picked'),
      where: w(13, 'where'), back: w(13, 'back'), years: w(13, 'years'), first: w(13, 'first'), caught: w(13, 'caught'), end: L(13).end,
    };
    // camera xuống vùng mới ngay trước câu mở vùng (1.0 s)
    this.PAN = [0, L(3).start - 0.75, L(9).start - 0.6, L(13).start - 0.4];
    this.START = L(0).start; this.FROM = -0.6;
    must('1 + 1', 2); must('Math.round(Math.PI * 100) / 100', 3.14);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.onePlus, kind: 'pen' }, { t: T.stone1, kind: 'tick' }, { t: T.pi, kind: 'pen' }, { t: T.quiet, kind: 'question' },
      { t: T.calc, kind: 'beep' }, { t: T.around, kind: 'pen' }, { t: T.tru, kind: 'tick' },
      { t: T.q1, kind: 'tick' }, { t: T.q2, kind: 'tick' }, { t: T.q3, kind: 'tick' },
      { t: T.voted + 0.1, kind: 'error' }, { t: T.forced, kind: 'snap' }, { t: T.fraction + 0.3, kind: 'error' },
      { t: T.picked, kind: 'tick' }, { t: T.where + 0.2, kind: 'question' }, { t: T.back - 0.3, kind: 'pen' },
    ];
  }
  cam(t) {                                            // → {x, y}: vùng hiện tại + trôi chậm (3 px/s xuống) trong vùng
    const P = this.PAN; let s = 0; for (let i = 0; i < P.length; i++) if (t >= P[i]) s = i;
    const e = s ? smooth(prog(t, P[s], P[s] + 1.0)) : 1, from = s ? (s - 1) * ZONE + Math.min(60, 3 * (P[s] - P[s - 1])) : 0;
    const y0 = s * ZONE + Math.min(60, 3 * Math.max(0, t - P[s] - 1.0));
    return { x: 0, y: from + (y0 - from) * e };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01 && c.y < ZONE * 1.99) this.zone1(g, t, ZONE);
    if (c.y > ZONE * 1.01 && c.y < ZONE * 2.99) this.zone2(g, t, 2 * ZONE);
    if (c.y > ZONE * 2.01) this.zone3(g, t, 3 * ZONE);
    g.restore();
    // toạ độ MÀN HÌNH: khung tên, nhân vật, màn đen cuối
    card(g, prog(t, 0.2, 1.6), '0', 'THE QUESTION', 'what is pi, really?');
    const shrug = prog(t, T.because - 0.35, T.because) - prog(t, T.across, T.across + 0.35);
    figure(g, 'shrug', 1600, H, 700, shrug);
    const three = prog(t, T.three - 0.5, T.three - 0.15) - prog(t, T.q3why + 0.6, T.q3why + 0.95);
    figure(g, 'three', 1660, H, 760, three);
    this.blackout(g, t);
  }
  zone0(g, t) {
    const T = this.T;
    typed(g, '1 + 1 = 2', 180, 300, prog(t, T.onePlus, T.isTwo + 0.25), `600 120px ${CG}`, C.ink);
    // hai hòn đá: chấm mực + chấm mực → cặp chấm
    const dot = (x, y, k) => { if (k <= 0) return; g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 15 * outCubic(clamp(k)), 0, 7); g.fill(); g.restore(); };
    dot(200, 410, prog(t, T.stone1, T.stone1 + 0.25)); typed(g, '+', 250, 425, prog(t, T.stone2 - 0.2, T.stone2), `600 54px ${CG}`, C.ink);
    dot(320, 410, prog(t, T.stone2, T.stone2 + 0.25));
    line(g, [[370, 410], [450, 410]], C.leadT, 2, { k: prog(t, T.stones - 0.3, T.stones) });
    if (t > T.stones) arrowHead(g, 460, 410, 0, C.leadT, 14);
    dot(500, 410, prog(t, T.stones, T.stones + 0.25)); dot(540, 410, prog(t, T.stones + 0.1, T.stones + 0.35));
    // π = 3.14 ?
    const kp = prog(t, T.pi, T.four + 0.3);
    typed(g, 'π', 180, 690, kp * 6, `italic 700 140px ${CG}`, C.blue);
    typed(g, '= 3.14', 280, 690, kp * 1.3 - 0.2, `600 120px ${CG}`, C.ink);
    typed(g, '?', 640, 690, prog(t, T.four + 0.2, T.four + 0.4), `600 120px ${CG}`, C.blue);
    // ứng viên khác: chì
    [[T.c2, '2', 790], [T.c4, '4', 900], [T.c7, '7', 1010]].forEach(([a, s, x]) => typed(g, s, x, 670, prog(t, a, a + 0.15), `600 96px ${CG}`, C.leadT));
    note(g, 'why not?', 790, 730, prog(t, T.c7 + 0.2, T.c7 + 0.7));
    // im lặng: dấu "…" dưới câu hỏi; máy tính
    note(g, 'most people: …', 180, 800, prog(t, T.quiet - 0.2, T.quiet + 0.4), { size: 24 });
    const kc = prog(t, T.calc - 0.8, T.calc);
    if (kc > 0) {
      const x = 800, y = 220, w = 430, h = 260;
      line(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], C.ink, 2.4, { k: kc });
      line(g, [[x + 24, y + 24], [x + w - 24, y + 24], [x + w - 24, y + 104], [x + 24, y + 104], [x + 24, y + 24]], C.ink, 1.6, { k: kc });
      for (let r = 0; r < 2; r++) for (let q = 0; q < 6; q++) {
        const bx = x + 24 + q * 66, by = y + 130 + r * 56;
        line(g, [[bx, by], [bx + 50, by], [bx + 50, by + 40], [bx, by + 40], [bx, by]], C.lead, 1.2, { k: kc * 2 - 1 });
      }
      const digits = PI_DIGITS.slice(0, 10);
      typed(g, digits, x + w - 40, y + 86, prog(t, T.calc + 0.1, T.says + 0.3), `500 48px ${MONO}`, C.ink, { align: 'right' });
      note(g, 'that\'s what it says', x, y + h + 40, prog(t, T.says, T.says + 0.6));
    }
  }
  zone1(g, t, Y) {
    const T = this.T, cx = 470, cy = Y + 470, R = 230;
    pivot(g, cx, cy, prog(t, T.around - 0.4, T.around));
    compassCircle(g, cx, cy, R, { k: prog(t, T.around, T.divided) });
    typed(g, 'C', cx - 22, cy - R - 26, prog(t, T.circle, T.circle + 0.2), `italic 700 72px ${CG}`, C.ink);
    const kd = prog(t, T.across - 0.2, T.across + 0.4);
    line(g, [[cx - R, cy], [cx + R, cy]], C.ink, 2.4, { k: kd });
    typed(g, 'd', cx + 60, cy - 18, prog(t, T.across + 0.2, T.across + 0.4), `italic 700 72px ${CG}`, C.ink);
    // C ÷ d = π
    const kf = prog(t, T.divided, T.across + 0.6), fy = Y + 860;
    typed(g, 'C ÷ d =', 260, fy, kf * 1.2, `italic 600 96px ${CG}`, C.ink);
    typed(g, 'π', 560, fy, kf * 4 - 3, `italic 700 140px ${CG}`, C.blue);
    if (t > T.tru) check(g, 680, fy - 40, 26, prog(t, T.tru, T.tru + 0.3));
    note(g, 'how to measure π', 260, fy + 70, prog(t, T.measure - 0.6, T.measure + 0.3), { color: C.ink, size: 24 });
    note(g, '≠ what π is', 260, fy + 110, prog(t, T.what, T.isEnd + 0.2), { color: C.blue, size: 24 });
    // khối NOTES của bản vẽ = mục lục lời hứa (DNA §1)
    const nx = 780, ny = Y + 300;
    typed(g, 'NOTES:', nx, ny, prog(t, T.questions, T.questions + 0.4), `700 26px ${ARC}`, C.ink, { ls: 3 });
    const items = [[T.q1, '1', 'why 3.14 — and not another number?'], [T.q2, '2', 'why do the digits never end?'], [T.q3, '3', 'why does curved space change it?']];
    items.forEach(([a, n, s], i) => {
      const y = ny + 80 + i * 92, k = prog(t, a, a + 0.25);
      if (k <= 0) return;
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(nx + 20, y - 8, 20, 0, 2 * PI * outCubic(k)); g.stroke(); g.restore();
      typed(g, n, nx + 20, y + 2, k * 2, `600 30px ${CG}`, C.ink, { align: 'center' });
      note(g, s, nx + 60, y, prog(t, a + 0.1, a + 1.6), { color: C.ink, size: 24 });
    });
    const y3 = ny + 80 + 2 * 92;
    line(g, [[nx + 60, y3 + 14], [nx + 560, y3 + 14]], C.blue, 2.4, { k: prog(t, T.geom, T.geom + 0.6) });
    const bx = nx + 760, by = y3 + 80, kb = prog(t, T.q3circle - 0.3, T.q3circle + 0.2);
    if (kb > 0) {                                   // mặt cong (cung chì) + vòng tròn xanh nằm trên nó
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(bx, by + 260, 300, -PI / 2 - 0.55 * kb, -PI / 2 + 0.55 * kb); g.stroke(); g.restore();
      g.save(); g.strokeStyle = C.blue; g.lineWidth = 3; g.beginPath(); g.ellipse(bx, by - 46, 70 * kb, 18 * kb, 0, 0, 2 * PI); g.stroke(); g.restore();
      note(g, 'c ÷ d = ?', bx, by + 40, prog(t, T.diff2, T.diff2 + 0.5), { color: C.blue, align: 'center' });
    }
  }
  zone2(g, t, Y) {
    const T = this.T;
    // "không ai chọn": ô duyệt bản vẽ, trống, gạch đỏ ở "voted"
    const bx = 140, by = Y + 180, bw = 640, bh = 150, kb = prog(t, T.nobody - 0.3, T.nobody + 0.3);
    line(g, [[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh], [bx, by]], C.ink, 2, { k: kb });
    line(g, [[bx, by + bh / 2], [bx + bw, by + bh / 2]], C.ink, 1, { k: kb * 2 - 1 });
    note(g, 'chosen by:', bx + 20, by + 48, prog(t, T.nobody, T.nobody + 0.5), { size: 24 });
    note(g, 'approved by committee:', bx + 20, by + 123, prog(t, T.committee, T.committee + 0.8), { size: 24 });
    line(g, [[bx + 260, by + 50], [bx + 600, by + 50]], C.lead, 1.2, { dash: [6, 6], k: prog(t, T.nobody + 0.5, T.nobody + 0.9) });
    cross(g, bx + 520, by + bh / 2, 46, prog(t, T.voted, T.voted + 0.5));
    // hình học phẳng → π bắt buộc
    const gx = 1000, gy = Y + 160, kg = prog(t, T.flat - 0.3, T.flat + 0.3);
    if (kg > 0) {
      g.save(); g.beginPath(); g.rect(gx, gy, 360 * outCubic(kg), 220); g.clip();
      g.strokeStyle = 'rgba(31,42,54,0.45)'; g.lineWidth = 1;
      for (let i = 0; i <= 12; i++) { g.beginPath(); g.moveTo(gx + i * 30, gy); g.lineTo(gx + i * 30, gy + 220); g.stroke(); }
      for (let j = 0; j <= 7; j++) { g.beginPath(); g.moveTo(gx, gy + j * 31.4); g.lineTo(gx + 360, gy + j * 31.4); g.stroke(); }
      g.restore();
      line(g, [[gx, gy], [gx + 360, gy], [gx + 360, gy + 220], [gx, gy + 220], [gx, gy]], C.ink, 2.4, { k: kg });
      note(g, 'flat geometry', gx, gy + 262, prog(t, T.flat, T.flat + 0.6), { color: C.ink });
    }
    const ka = prog(t, T.forced - 0.4, T.forced);
    line(g, [[gx + 380, gy + 110], [gx + 500, gy + 110]], C.ink, 2.4, { k: ka });
    if (ka >= 1) arrowHead(g, gx + 512, gy + 110, 0, C.ink, 18);
    typed(g, 'π', gx + 560, gy + 160, prog(t, T.forced, T.forced + 0.2), `italic 700 140px ${CG}`, C.blue);
    ring(g, gx + 600, gy + 115, 90, 90, prog(t, T.picked, T.picked + 0.5));
    note(g, 'could not be anything else', gx + 380, gy + 262, prog(t, T.anything - 0.4, T.anything + 0.6), { color: C.blue });
    // "không phải phân số": π = a ÷ b viết chì, gạch đỏ
    const fy = Y + 560;
    typed(g, 'π  =  a ÷ b', 140, fy, prog(t, T.ugly, T.fraction), `italic 600 96px ${CG}`, C.leadT);
    strike(g, 120, fy - 30, 600, fy - 30, prog(t, T.fraction + 0.25, T.fraction + 0.6));
    note(g, 'not a fraction', 140, fy + 64, prog(t, T.fraction + 0.4, T.fraction + 1.0), { color: C.blue });   // ý ĐÚNG → xanh (đỏ chỉ là nét gạch)
    // chuỗi chữ số chạy mãi: mép phải vượt khung thì cả dòng trượt sang trái, chữ mới vẫn hiện
    const kdg = t - T.digits;
    if (kdg > 0) {
      const n = Math.min(PI_DIGITS.length, Math.floor(kdg * 21)), s = PI_DIGITS.slice(0, n), font = `500 44px ${MONO}`;
      g.save(); g.font = font; const wd = g.measureText(s).width; g.restore();
      const x0 = Math.min(140, 1780 - wd), dy = Y + 760;
      g.save(); g.beginPath(); g.rect(96, dy - 60, 1728, 90); g.clip(); text(g, s, x0, dy, font, C.ink); g.restore();
      note(g, 'never ends · never repeats', 140, dy + 70, prog(t, T.digits + 1.2, T.digits + 2.0));
      note(g, 'messy', 1500, dy + 70, prog(t, T.messy, T.messy + 0.4), { color: C.ink });
    }
  }
  zone3(g, t, Y) {
    const T = this.T, cx = W / 2, cy = Y + 520, R = 300;
    typed(g, 'Where does it come from?', W / 2, Y + 150, prog(t, T.where, T.where + 0.7), `italic 600 72px ${CG}`, C.ink, { align: 'center' });
    pivot(g, cx, cy, prog(t, T.where + 0.6, T.back - 0.3));
    compassCircle(g, cx, cy, R, { k: prog(t, T.back - 0.3, T.years + 0.2), a0: PI / 2 });
    note(g, 'more than 2,000 years ago', cx, cy + R + 90, prog(t, T.years - 0.3, T.years + 0.5), { align: 'center' });
    // mực xanh loang từ tâm kín vòng tròn
    const kf = smooth(prog(t, T.first, T.caught + 0.1));
    if (kf > 0) { g.save(); g.fillStyle = C.blue; g.beginPath(); g.arc(cx, cy, (R + 4) * kf, 0, 7); g.fill(); g.restore(); }
  }
  blackout(g, t) {                                    // đen khép từ ngoài vào đúng vòng tròn, rồi vòng thu về 0 (đen kín)
    const T = this.T, a = T.caught + 0.15, b = a + 0.55, c = this.T.end + 0.75;
    if (t < a) return;
    const R = 300, cx = W / 2, cy = 3 * ZONE + 520 - this.cam(t).y;
    const r = t < b ? 2300 + (R + 2 - 2300) * smooth(prog(t, a, b)) : (R + 2) * (1 - smooth(prog(t, b, c)));
    g.save(); g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, Math.max(0, r), 0, PI * 2, true); g.fill('evenodd'); g.restore();
    if (r <= 0.5) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); }
  }
}
