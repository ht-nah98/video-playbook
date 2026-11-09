// ACT FOUR mở hồi — "A positive test" (p2 câu 75–79). Không mascot.
// Bố cục:
//   trái         ba dòng dữ kiện: 1 in 1,000 · có bệnh → dương 99% · khoẻ → dương 5% (nhầm) — viết vào đúng chữ đọc.
//   phải trên    1,000 chấm người, một chấm vàng có vòng (người bệnh thật, "one person in every thousand").
//   phải giữa    que thử trồi lên từ sương ("from medicine"), chùm đèn người xem với tới; câu 79 vạch T sáng = dương tính.
//   trái dưới    đèn bão của NGƯỜI XEM; câu hỏi cuối → "?" treo trong quầng đèn.
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, C, CG, MONO, sky, glow, lantern, beam, fogBank, typed, text, label,
  ring, fmt, must, card, actTitle, lookup } from '../kit.js';

const LX = 180, LY = 960;
const GRID = { x: 1090, y: 268, cols: 50, dx: 13.6, dy: 13.4 };   // 1,000 chấm (50 × 20)
const CAS = { x: 1100, y: 600, w: 640, h: 170 };                  // que thử

export default class Test {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      medicine: w(75, 'medicine'),
      disease: w(76, 'disease'), affects: w(76, 'affects'), one: w(76, 'one'), every: w(76, 'every'), thousand: w(76, 'thousand'), test: w(76, 'test'),
      really: w(77, 'really'), positive: w(77, 'positive'), percent: w(77, 'percent'),
      healthy: w(78, 'healthy'), five: w(78, 'five'), mistake: w(78, 'mistake'),
      take: w(79, 'take'), pos: w(79, 'positive'), what: w(79, 'what'), chance: w(79, 'chance'), have: w(79, 'have'), dis: w(79, 'disease'),
      end: L(79).end,
    };
    this.START = L(75).start;
    this.FROM = this.START - 2.6;                                // mở hồi
    this.N = { n: must('1000', 1000), sens: must('99', 99), fp: must('5', 5) };
    this.SICK = 50 * 9 + 37;                                     // chấm người bệnh: chọn tay một chỗ không sát mép
  }
  sfx() {
    const T = this.T;
    return [{ t: T.thousand, kind: 'pop' }, { t: T.positive + 0.6, kind: 'tick' }, { t: T.five, kind: 'tick' },
      { t: T.pos, kind: 'pop' }, { t: T.dis + 0.06, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T, N = this.N;
    sky(g, t, { fog: 1 });
    const lamp = 0.35 + 0.5 * outCubic(prog(t, T.medicine - 0.4, T.medicine + 0.6));

    // ── 1,000 người, một người bệnh ──
    const sweep = prog(t, T.affects - 0.2, T.every + 0.2);
    if (sweep > 0) {
      const n = Math.round(N.n * sweep);
      g.save(); g.fillStyle = 'rgba(142,162,184,0.42)';
      for (let i = 0; i < n; i++) { if (i === this.SICK) continue; const [x, y] = this.dot(i); g.beginPath(); g.arc(x, y, 2.6, 0, 7); g.fill(); }
      g.restore();
      label(g, `${fmt(N.n)} people`, GRID.x, GRID.y - 34, C.fog, 'left', 22);
      const kS = outBack(prog(t, T.thousand - 0.1, T.thousand + 0.4));
      if (kS > 0) { const [x, y] = this.dot(this.SICK);
        glow(g, x, y, 60 * kS, 'rgba(255,216,102,0.85)'); g.fillStyle = '#FFF4C8'; g.beginPath(); g.arc(x, y, 5.5 * kS, 0, 7); g.fill();
        ring(g, x, y, 17, 17, prog(t, T.thousand, T.thousand + 0.5), { color: C.gold, w: 3 });
        typed(g, '1 has the disease', GRID.x + GRID.cols * GRID.dx, GRID.y - 34, prog(t, T.thousand + 0.2, T.test), `500 22px ${MONO}`, C.gold, { align: 'right' });
      }
    }

    // ── que thử: trồi lên từ sương ở "medicine"; chùm đèn với tới ở "test" ──
    const kC = outCubic(prog(t, T.medicine - 0.3, T.medicine + 0.7));
    beam(g, LX + 40, LY - 50, CAS.x + 260, CAS.y + CAS.h / 2, 110, 360, 0.30 * lamp, { reach: 0.25 + 0.75 * outCubic(prog(t, T.test - 0.3, T.test + 0.8)) });
    if (kC > 0) this.cassette(g, t, 260 * (1 - kC));
    fogBank(g, CAS.x + CAS.w / 2, CAS.y + CAS.h + 120, 420, 90, t, { a: 0.9, seed: 4 });

    // ── dữ kiện bên trái ──
    const big = `600 72px ${CG}`;
    typed(g, 'A DISEASE', 96, 300, prog(t, T.disease, T.disease + 0.4), `500 22px ${MONO}`, C.fog);
    typed(g, `1 in ${fmt(N.n)}`, 96, 372, prog(t, T.one - 0.05, T.thousand + 0.2), big, C.ivory);
    typed(g, 'IF YOU HAVE IT', 96, 460, prog(t, T.really, T.really + 0.5), `500 22px ${MONO}`, C.fog);
    typed(g, `positive ${N.sens}%`, 96, 532, prog(t, T.positive, T.percent + 0.2), big, C.gold);
    typed(g, 'IF YOU ARE HEALTHY', 96, 620, prog(t, T.healthy, T.healthy + 0.5), `500 22px ${MONO}`, C.fog);
    const w5 = typedW(g, `positive ${N.fp}%`, 96, 692, prog(t, T.five - 0.6, T.five + 0.4), big, C.amber);
    typed(g, 'by mistake', 96 + w5 + 22, 692, prog(t, T.mistake, T.mistake + 0.5), `italic 500 46px ${CG}`, C.fog);

    // ── đèn người xem + câu hỏi treo ──
    lantern(g, LX, LY, 0.62, t, lamp);
    const kQ = outBack(prog(t, T.chance, T.chance + 0.5));
    if (kQ > 0) {
      glow(g, LX, 790, 240, 'rgba(244,184,96,0.22)', kQ);
      g.save(); g.translate(LX, 790); g.scale(kQ, kQ); text(g, '?', 0, 50, `600 140px ${CG}`, C.amber, 'center'); g.restore();
    }
    typed(g, 'What is the chance that you', 1290, 892, prog(t, T.what, T.chance + 0.4), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
    typed(g, 'really have the disease?', 1290, 966, prog(t, T.chance + 0.3, T.dis + 0.4), `italic 600 64px ${CG}`, C.ivory, { align: 'center' });

    card(g, 'night', prog(t, this.START + 0.2, this.START + 1.4), 'ACT FOUR · BASE RATES', 'A positive test');
    actTitle(g, 'night', t, this.START, 'ACT FOUR', 'The number that surprises experts');
  }
  dot(i) {
    return [GRID.x + (i % GRID.cols) * GRID.dx + (hash(i * 1.7) - 0.5) * 3, GRID.y + ((i / GRID.cols) | 0) * GRID.dy + (hash(i * 2.9) - 0.5) * 3];
  }
  cassette(g, t, dy) {
    const T = this.T, { x, w, h } = CAS, y = CAS.y + dy;
    g.save();
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.roundRect(x + 10, y + 14, w, h, 40); g.fill();
    const gr = g.createLinearGradient(x, y, x + w, y); gr.addColorStop(0, '#CFC6B2'); gr.addColorStop(1, '#8E8878');
    g.fillStyle = gr; g.beginPath(); g.roundRect(x, y, w, h, 40); g.fill();
    g.fillStyle = '#5E5A50'; g.beginPath(); g.arc(x + 110, y + h / 2, 34, 0, 7); g.fill();                    // giếng nhỏ mẫu
    g.fillStyle = '#E9E3D4'; g.beginPath(); g.roundRect(x + 260, y + 50, 300, h - 100, 10); g.fill();          // cửa sổ kết quả
    g.fillStyle = '#4A4438'; g.font = `500 22px ${MONO}`; g.textAlign = 'center'; g.fillText('C', x + 470, y + 38); g.fillText('T', x + 350, y + 38);
    g.fillStyle = '#7A6E86'; g.fillRect(x + 462, y + 54, 16, h - 108);                                         // vạch C (luôn có)
    const kT = prog(t, T.pos - 0.1, T.pos + 0.4);
    if (kT > 0) { glow(g, x + 350, y + h / 2, 120 * kT, 'rgba(244,184,96,0.7)'); g.fillStyle = C.amber; g.globalAlpha = kT; g.fillRect(x + 342, y + 54, 16, h - 108); }
    g.restore();
    if (kT > 0) typed(g, 'POSITIVE', x + w / 2, y + h + 44, prog(t, T.pos, T.pos + 0.5), `500 26px ${MONO}`, C.amber, { align: 'center' });
  }
}
// typed + trả bề rộng toàn chuỗi (để đặt chữ nối sau nó)
function typedW(g, s, x, y, k, font, color) {
  typed(g, s, x, y, k, font, color);
  g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w;
}
