// ACT FIVE mở hồi · "Three rules" (p2 câu 96–101).
//   96   hai ngọn đèn hai bên, bức sương ngăn giữa ("two rival schools") → sương tan ở "they are not"
//   97   trang tên Grundbegriffe 1933 dựng bằng chữ in (KHÔNG dùng ảnh bản in lại) + chân dung Kolmogorov; nét nền móng;
//        ba cột đèn đường trồi lên bên phải (chưa sáng) ở "three axioms"
//   98–100  chân dung + trang tên chìm xuống; "every event gets a number"; mascot `three` bên trái (≈ 6 s);
//        ba đèn đường bật lần lượt ở first / second / third, mỗi đèn soi một tiên đề
//   101  "That is all." viết vào dưới khung
import { W, H, C, CG, MONO, clamp, prog, smooth, outCubic, outBack, sky, glow, fogBank, typed, text, label, ring, hand, seg,
  card, actTitle, figure, portrait, must, lookup } from '../kit.js';

export const LAMPS = [900, 1260, 1640];                     // x ba đèn đường (g2 dùng lại hình đèn)
/** Đèn đường: cột từ chân (foot) lên đầu đèn (head); on ∈ [0,1] bật đèn — quầng, nón sáng xuống đất, vũng sáng. */
export function streetLamp(g, x, head, foot, on, t, { s = 1, seed = 0 } = {}) {
  const fl = 1 + 0.03 * Math.sin(t * 6.3 + seed * 2.1);
  if (on > 0) {
    g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = clamp(on) * 0.13;
    const cone = g.createLinearGradient(x, head, x, foot); cone.addColorStop(0, 'rgba(255,214,140,1)'); cone.addColorStop(1, 'rgba(255,214,140,0)');
    g.fillStyle = cone; g.beginPath(); g.moveTo(x - 26 * s, head + 14 * s); g.lineTo(x + 26 * s, head + 14 * s); g.lineTo(x + 190 * s, foot); g.lineTo(x - 190 * s, foot); g.closePath(); g.fill(); g.restore();
    glow(g, x, foot, 210 * s, 'rgba(244,184,96,0.22)', on);
    glow(g, x, head, 230 * s * fl, 'rgba(244,184,96,0.38)', on); glow(g, x, head, 60 * s, 'rgba(255,230,170,0.95)', on);
  }
  g.save(); g.lineCap = 'round';
  g.strokeStyle = '#2A3448'; g.lineWidth = 9 * s; g.beginPath(); g.moveTo(x, foot); g.lineTo(x, head - 30 * s); g.stroke();     // cột
  g.fillStyle = '#2A3448'; g.fillRect(x - 22 * s, foot - 14 * s, 44 * s, 14 * s);                                              // đế
  g.beginPath(); g.moveTo(x - 32 * s, head - 8 * s); g.lineTo(x + 32 * s, head - 8 * s); g.lineTo(x + 14 * s, head - 34 * s); g.lineTo(x - 14 * s, head - 34 * s); g.closePath(); g.fill();   // chao
  g.fillStyle = on > 0.05 ? '#FFF1C8' : '#1C2333'; g.beginPath(); g.roundRect(x - 20 * s, head - 8 * s, 40 * s, 26 * s, 5 * s); g.fill();   // kính
  g.restore();
}
// Trang tên 1933 dựng lại bằng chữ in (Cormorant thu nhỏ bằng scale — chỉ dùng cỡ đã nạp).
function titlePage(g, x, y, k) {
  if (k <= 0) return;
  const w = 300, h = 430, dy = (1 - outCubic(clamp(k))) * 300;
  g.save(); g.translate(x, y + dy);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(12, 14, w, h);
  const p = g.createRadialGradient(w * 0.4, h * 0.35, 40, w * 0.5, h * 0.5, h * 0.75); p.addColorStop(0, '#EFE7D3'); p.addColorStop(1, '#C9BEA4');
  g.fillStyle = p; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(40,34,26,0.5)'; g.lineWidth = 1.5; g.strokeRect(14, 14, w - 28, h - 28);
  const ink = '#1E1A16', line = (s, yy, font, sc) => { g.save(); g.translate(w / 2, yy); g.scale(sc, sc); text(g, s, 0, 0, font, ink, 'center'); g.restore(); };
  line('GRUNDBEGRIFFE', 110, `600 60px ${CG}`, 0.5);
  line('DER', 140, `600 60px ${CG}`, 0.32);
  line('WAHRSCHEINLICHKEITS-', 178, `600 60px ${CG}`, 0.34);
  line('RECHNUNG', 212, `600 60px ${CG}`, 0.36);
  line('VON', 262, `italic 600 40px ${CG}`, 0.5);
  line('A. KOLMOGOROFF', 296, `600 60px ${CG}`, 0.36);
  g.fillStyle = ink; g.fillRect(w / 2 - 30, 324, 60, 1.5);
  line('BERLIN', 372, `600 60px ${CG}`, 0.3);
  line('SPRINGER', 396, `600 60px ${CG}`, 0.3);
  line('1933', 418, `600 60px ${CG}`, 0.3);
  g.restore();
}
export const AX = [
  { f: ['P(A) ≥ 0'], note: 'NEVER NEGATIVE' },
  { f: ['P(certain) = 1'], note: 'THE CERTAIN EVENT' },
  { f: ['P(A or B)', '= P(A) + P(B)'], note: "CAN'T HAPPEN TOGETHER" },
];

export default class Axioms {
  static ERA = 'night';
  static POSES = ['three'];
  static IMAGES = { kolmogorov: './assets/history/Andrej_Nikolajewitsch_Kolmogorov.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1');
    this.T = {
      views: w(96, 'views'), rival: w(96, 'rival'), fact: w(96, 'fact'), not: w(96, 'not'),
      y1933: w(97, 'nineteen'), andrey: w(97, 'andrey'), rigorous: w(97, 'rigorous'), foundation: w(97, 'foundation'), three: w(97, 'three'),
      axioms: w(97, 'axioms'), simple: w(97, 'surprisingly'),
      he: L(98).start, rule: w(98, 'rule'), event: w(98, 'event'), number: w(98, 'number'), first: w(98, 'first'), no: w(98, 'no'), negative: w(98, 'negative'),
      second: w(99, 'second'), certain: w(99, 'certain'), one: w(99, 'one'),
      third: w(100, 'third'), events: w(100, 'events'), exclusive: w(100, 'exclusive'), cant: w(100, "can't"), together: w(100, 'together'),
      sum: w(100, 'sum'), probs: w(100, 'probabilities'), end100: L(100).end,
      all: L(101).start, end: L(101).end,
    };
    this.START = L(96).start; this.FROM = this.START - 2.6;
    must('1 + 1 + 1', AX.length);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.y1933, kind: 'pop' }, { t: T.three, kind: 'tick' }, { t: T.first, kind: 'tick' }, { t: T.third, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    const push = 1 + 0.025 * Math.sin(Math.PI * smooth(prog(t, T.y1933, T.end)));   // đẩy vào rồi lùi về 1 ở cuối: g2 nối tiếp (CONTINUES) không có camera
    g.save(); g.translate(W * 0.66, H * 0.6); g.scale(push, push); g.translate(-W * 0.66, -H * 0.6);
    sky(g, t, { fog: 1 });

    // ── 96: hai trường phái — hai ngọn đèn, sương ngăn giữa; "they are not" → sương tan, hai đèn lùi ra hai bên ──
    const kV = outCubic(prog(t, T.views - 0.2, T.rival + 0.4)), part = smooth(prog(t, T.fact, T.not + 0.6)), away = smooth(prog(t, T.y1933 - 0.2, T.andrey));
    if (kV > 0 && away < 1) {
      for (const [x, s] of [[620, 'FREQUENCY'], [1300, 'BELIEF']]) {
        const xx = x + (x < 960 ? -1 : 1) * 700 * away, on = kV * (1 - away);
        glow(g, xx, 560, 260, 'rgba(244,184,96,0.32)', on); glow(g, xx, 560, 60, 'rgba(255,226,160,0.9)', on);
        g.save(); g.globalAlpha = clamp(on); g.fillStyle = '#FFF3D0'; g.beginPath(); g.arc(xx, 560, 9, 0, 7); g.fill(); g.restore();
      }
      fogBank(g, 960, 560, 160, 360, t, { a: 2.4 * kV * (1 - part) * (1 - away), seed: 41, n: 11, drift: 10 });
      for (const [x, s] of [[620, 'FREQUENCY'], [1300, 'BELIEF']]) {             // tên vẽ SAU sương, trên nền tối riêng (tương phản)
        const xx = x + (x < 960 ? -1 : 1) * 700 * away;
        g.save(); g.globalAlpha = clamp(kV * (1 - away)); g.fillStyle = 'rgba(8,12,22,0.78)'; g.beginPath(); g.roundRect(xx - 105, 630, 210, 42, 8); g.fill();
        text(g, s, xx, 660, `500 26px ${MONO}`, C.amber, 'center', 3); g.restore();
      }
    }

    // ── 97: trang tên 1933 + chân dung; nét nền móng; ba cột đèn trồi lên ──
    const sink = smooth(prog(t, T.he, T.he + 1.2));
    g.save(); g.translate(0, 1000 * sink);
    titlePage(g, 470, 250, prog(t, T.y1933 - 0.1, T.y1933 + 0.7));
    if (t > T.andrey - 0.2) portrait(g, 'kolmogorov', 'night', 120, 250, 360, prog(t, T.andrey - 0.1, T.andrey + 0.7),
      { label: { name: 'Andrey Kolmogorov', life: '1903–1987' } });
    hand(g, seg(110, 760, 800, 760, 30), { w: 3, color: C.amber, seed: 13, k: prog(t, T.foundation - 0.1, T.foundation + 0.6) });
    if (t > T.foundation) typed(g, 'A RIGOROUS FOUNDATION', 110, 800, prog(t, T.foundation, T.foundation + 0.6), `500 22px ${MONO}`, C.amber);
    g.restore();
    if (sink > 0 && sink < 1) fogBank(g, 450, 980, 420, 160, t, { a: 2 * Math.sin(sink * Math.PI), seed: 17 });

    const rise = LAMPS.map((x, i) => outBack(prog(t, T.three - 0.1 + i * 0.12, T.three + 0.5 + i * 0.12)));
    const on = [prog(t, T.first - 0.1, T.first + 0.3), prog(t, T.second - 0.1, T.second + 0.3), prog(t, T.third - 0.1, T.third + 0.3)];
    const flick = i => 1 - 0.25 * Math.max(0, Math.sin(prog(t, T.all + i * 0.12, T.all + 0.5 + i * 0.12) * Math.PI));   // "That is all": nháy một nhịp
    LAMPS.forEach((x, i) => { if (rise[i] > 0) streetLamp(g, x, 960 - 640 * rise[i], 960, on[i] * flick(i), t, { seed: i }); });
    if (t > T.axioms) typed(g, 'THREE AXIOMS', 1260, 250, prog(t, T.axioms, T.axioms + 0.5) * (1 - prog(t, T.first - 0.5, T.first)), `500 26px ${MONO}`, C.fog, { align: 'center' });

    // tiên đề viết vào trong vũng sáng của từng đèn
    const kF = [
      [prog(t, T.no - 0.1, T.negative + 0.4)],
      [prog(t, T.certain - 0.1, T.one + 0.3)],
      [prog(t, T.events - 0.1, T.exclusive + 0.5), prog(t, T.sum - 0.2, T.probs + 0.4)],
    ];
    const kN = [prog(t, T.negative, T.negative + 0.5), prog(t, T.certain, T.certain + 0.8), prog(t, T.cant, T.together + 0.4)];
    AX.forEach((a, i) => {
      const x = LAMPS[i];
      a.f.forEach((s, j) => typed(g, s, x, 600 + j * 62, kF[i][j], `italic 600 64px ${CG}`, C.ivory, { align: 'center' }));
      typed(g, a.note, x, a.f.length > 1 ? 740 : 680, kN[i], `500 20px ${MONO}`, C.amber, { align: 'center' });
    });
    // xung khắc: hai vùng A, B không chạm nhau dưới đèn thứ ba
    const kAB = prog(t, T.cant - 0.1, T.together + 0.5);
    if (kAB > 0) {
      ring(g, 1590, 820, 36, 30, kAB, { color: C.fog, w: 3, seed: 2 }); ring(g, 1700, 820, 36, 30, prog(t, T.cant + 0.2, T.together + 0.8), { color: C.fog, w: 3, seed: 9 });
      text(g, 'A', 1590, 836, `italic 600 44px ${CG}`, C.ivory, 'center'); if (t > T.cant + 0.3) text(g, 'B', 1700, 836, `italic 600 44px ${CG}`, C.ivory, 'center');
    }
    g.restore();

    // ── chữ trên cùng (toạ độ màn hình) ──
    const kRule = prog(t, T.rule - 0.1, T.number + 0.4);
    if (kRule > 0) typed(g, 'every event gets a number', 96, 290, kRule, `italic 600 54px ${CG}`, C.ivory);
    if (t > T.all - 0.1) typed(g, 'That is all.', 1300, 1000, prog(t, T.all, T.end + 0.2), `italic 600 54px ${CG}`, C.gold, { align: 'center' });

    // mascot `three` — đếm ba tiên đề (≈ 6 s), bên trái, đèn ở bên phải
    const kM = prog(t, T.first - 0.4, T.first) * (1 - prog(t, T.third + 0.4, T.third + 0.8));
    if (kM > 0) figure(g, 'three', 330, H, 740, 'night', kM, { rim: 'right' });

    actTitle(g, 'night', t, S, 'ACT FIVE', "Mathematics doesn't take sides");
    card(g, 'night', prog(t, S + 0.1, S + 1.4), 'ACT FIVE · AXIOMS', 'Three rules');
  }
}
