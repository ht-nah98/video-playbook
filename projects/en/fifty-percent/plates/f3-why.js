// ACT FOUR · "Why it catches us out" (p2 câu 87–95). Không mascot. Đèn của người xem góc dưới trái giữ "≈ 2%" cả cảnh.
// Năm đoạn nối nhau trên nửa phải (x 700–1800), mỗi đoạn ra bằng cách chìm vào sương:
//   A (87–88)  Harvard 1978: 60 hình người trồi khỏi sương; 27 sáng nhãn "95%" (đỏ = câu trả lời sai), "≈ 2%" là đáp án
//   B (89–90)  đèn chiếu vào "phép thử 99% / 5%"; "1 in 1,000" (tỉ lệ ban đầu) loé vàng rồi trôi vào sương, KHÔNG tiếng
//   C (91)     1 000 chấm: người khoẻ đông nghịt, 5% báo nhầm sáng hổ phách, một người bệnh thật vàng có vòng
//   D (92–94)  "99 of 5,094" — đếm người; phần trăm tung hứng trong sương rồi rơi; hai ngọn đèn (tần suất, niềm tin) gặp nhau
//   E (95)     câu bài học viết vào dưới khung
import { W, H, C, CG, MONO, clamp, prog, smooth, outCubic, outBack, hash, sky, glow, lantern, beam, fogBank, typed, text,
  label, ring, hand, seg, card, must, fmt, lookup } from '../kit.js';

const LX = 190, LY = 930;                                 // đèn bão người xem
const N60 = must('20 * 3', 60), N27 = 27;                 // CONTENT: 60 người (20 × 3), 27 trả lời 95%
const CASES = must('99 + 4995', 5094), PCT = must('99 / 5094 * 100', 99 / CASES * 100);
const DOTS = 1000, FALSE = must('1000 * 5 / 100', 50);     // minh hoạ tỉ lệ: 1/1000 bệnh, 5% báo nhầm (không hiện số)
const LIT = Array.from({ length: N60 }, (_, i) => i).sort((a, b) => hash(a * 7.13 + 2) - hash(b * 7.13 + 2)).slice(0, N27);
const ALARM = new Set(Array.from({ length: DOTS }, (_, i) => i).sort((a, b) => hash(a * 3.71 + 9) - hash(b * 3.71 + 9)).slice(0, FALSE));
const SICK = 612;                                          // một chấm, giữa khung chấm, không trùng báo nhầm
if (ALARM.has(SICK)) throw new Error('f3: chấm bệnh trùng báo nhầm');

function person(g, x, y, s, color) {                      // hình người tối giản: đầu + vai
  g.fillStyle = color; g.beginPath(); g.arc(x, y - 30 * s, 10 * s, 0, 7); g.fill();
  g.beginPath(); g.roundRect(x - 15 * s, y - 16 * s, 30 * s, 34 * s, [12 * s, 12 * s, 3 * s, 3 * s]); g.fill();
}
function orb(g, x, y, on, t) {                             // một "ngọn đèn" của một trường phái (khác đèn bão người xem)
  if (on <= 0) return;
  const fl = 1 + 0.05 * Math.sin(t * 6.1 + x);
  glow(g, x, y, 240 * fl, 'rgba(244,184,96,0.32)', on); glow(g, x, y, 60, 'rgba(255,226,160,0.9)', on);
  g.save(); g.globalAlpha = clamp(on); g.fillStyle = '#FFF3D0'; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.restore();
}

export default class Why {
  static ERA = 'night';
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      number: w(87, 'number'), people0: w(87, 'people'),
      y1978: w(88, 'nineteen'), harvard: w(88, 'harvard'), sixty: w(88, 'sixty'), doctors: w(88, 'doctors'), residents: w(88, 'residents'),
      students: w(88, 'students'), nearly: w(88, 'nearly'), answered: w(88, 'answered'), ninety5: w(88, 'ninety-five'), end88: L(88).end,
      reason: L(89).start, focus: w(89, 'focus'), accurate: w(89, 'accurate'), forget: w(89, 'forget'), rare: w(89, 'rare'),
      starting: w(90, 'starting'), enorm: w(90, 'enormously'), slips: w(90, 'slips'), sound: w(90, 'sound'),
      when: L(91).start, healthy: w(91, 'healthy'), numerous: w(91, 'numerous'), alarms: w(91, 'false'), swamp: w(91, 'swamp'), sick: w(91, 'truly'),
      notice: L(92).start, counting: w(92, 'counting'), juggling: w(92, 'juggling'), natural: w(93, 'natural'), far: w(93, 'far'), right: w(93, 'right'),
      count2: L(94).start, freq: w(94, 'frequency'), best: w(94, 'best'), belief: w(94, 'belief'),
      lesson: L(95).start, same: w(95, 'same'), mean: w(95, 'mean'), things: w(95, 'things'), depending: w(95, 'depending'), from: w(95, 'from'), end: L(95).end,
    };
    this.START = L(87).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.sixty, kind: 'tick' }, { t: T.ninety5, kind: 'pop' }, { t: T.alarms, kind: 'tick' },
      { t: T.counting, kind: 'tick' }, { t: T.best, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    const push = 1 + 0.03 * smooth(prog(t, F, T.end + 1));            // camera đẩy rất chậm cả cảnh
    g.save(); g.translate(W * 0.6, H * 0.55); g.scale(push, push); g.translate(-W * 0.6, -H * 0.55);
    sky(g, t, { fog: 1 });

    // ── đèn người xem + "≈ 2%" (đáp án đúng nằm trong quầng của người xem) ──
    const lamp = 0.35 + 0.65 * outCubic(prog(t, T.number - 0.2, T.number + 0.5));
    glow(g, 330, 540, 360, 'rgba(244,184,96,0.16)', lamp);
    lantern(g, LX, LY, 0.85, t, lamp);
    const k2 = outBack(prog(t, T.number, T.number + 0.45));
    if (k2 > 0) { g.save(); g.translate(330, 560); g.scale(0.7 + 0.3 * k2, 0.7 + 0.3 * k2); g.globalAlpha = clamp(k2 * 1.5);
      text(g, `≈ ${Math.round(PCT)}%`, 0, 40, `600 140px ${CG}`, C.amber, 'center'); g.restore(); }
    const kOk = prog(t, T.ninety5 + 0.5, T.ninety5 + 1.2);
    if (kOk > 0) { typed(g, 'THE RIGHT ANSWER', 330, 430, kOk, `500 22px ${MONO}`, C.gold, { align: 'center' });
      hand(g, seg(210, 625, 450, 625, 12), { w: 3, color: C.gold, seed: 4, k: kOk }); }

    // ── A: Harvard 1978, 60 hình người ──
    const outA = smooth(prog(t, T.reason, T.reason + 1.3));
    if (outA < 1) {
      g.save(); g.translate(0, 320 * outA); g.globalAlpha = 1 - outA;
      typed(g, '1978 · HARVARD', 720, 300, prog(t, T.y1978, T.harvard + 0.4), `500 26px ${MONO}`, C.amber);
      if (t > T.sixty) typed(g, ` · ${N60} PEOPLE`, 720 + 14 * 15.6 + 6, 300, prog(t, T.sixty, T.sixty + 0.5), `500 26px ${MONO}`, C.ivory);
      const emerge = prog(t, T.people0 - 0.2, T.people0 + 1.2), full = prog(t, T.sixty - 0.1, T.sixty + 0.8);
      for (let i = 0; i < N60; i++) {
        const c = i % 12, r = (i / 12) | 0, x = 760 + c * 88, y = 420 + r * 100;
        const lit = LIT.includes(i), kL = lit ? prog(t, T.ninety5 - 0.3 + LIT.indexOf(i) * 0.03, T.ninety5 + 0.3 + LIT.indexOf(i) * 0.03) : 0;
        const kp = outBack(prog(t, T.sixty - 0.1 + c * 0.05, T.sixty + 0.35 + c * 0.05));
        const a = 0.18 * emerge + 0.62 * full;
        if (a <= 0) continue;
        if (kL > 0) glow(g, x, y - 14, 70, 'rgba(244,184,96,0.45)', kL);
        g.save(); g.globalAlpha *= a; person(g, x, y + (1 - kp) * 14, 1, kL > 0.5 ? C.ivory : '#7D8DA3'); g.restore();
        if (kL > 0) { g.save(); g.globalAlpha *= clamp(kL * 2); const ty = y - 50 - 6 * outBack(kL); g.fillStyle = 'rgba(8,12,22,0.82)'; g.beginPath(); g.roundRect(x - 27, ty - 19, 54, 26, 6); g.fill();
          text(g, '95%', x, ty, `500 20px ${MONO}`, C.red, 'center'); g.restore(); }
      }
      const cap = [['20 DOCTORS', T.doctors], [' · 20 RESIDENTS', T.residents], [' · 20 STUDENTS', T.students]];
      let cx = 720; for (const [s, at] of cap) { typed(g, s, cx, 900, prog(t, at - 0.1, at + 0.45), `500 24px ${MONO}`, C.ivory); cx += s.length * 14.4; }
      typed(g, `${N27} OF ${N60} ANSWERED 95%`, 720, 950, prog(t, T.answered, T.ninety5 + 0.6), `500 24px ${MONO}`, C.red);
      g.restore();
      if (outA > 0) fogBank(g, 1250, 900, 600, 200, t, { a: 2 * Math.sin(outA * Math.PI), seed: 5 });
    }

    // ── B: phép thử trong chùm đèn; tỉ lệ ban đầu trôi vào sương ──
    const inB = prog(t, T.focus - 0.3, T.accurate + 0.3), outB = smooth(prog(t, T.when, T.when + 1.2));
    if (inB > 0 && outB < 1) {
      beam(g, LX + 40, LY - 90, 980, 470, 110, 360, 0.36 * outCubic(inB) * (1 - outB), { reach: outCubic(inB) });
      g.save(); g.translate(0, 260 * outB); g.globalAlpha = 1 - outB;
      typed(g, 'THE TEST', 760, 400, prog(t, T.focus, T.focus + 0.4), `500 26px ${MONO}`, C.amber);
      typed(g, 'catches 99% of the sick', 760, 462, prog(t, T.accurate - 0.1, T.accurate + 0.7), `italic 600 44px ${CG}`, C.ivory);
      typed(g, 'false alarm 5% of the healthy', 760, 516, prog(t, T.accurate + 0.4, T.accurate + 1.1), `italic 600 44px ${CG}`, C.ivory);
      g.restore();
      // tỉ lệ ban đầu: hiện ở "rare", vàng ở "starting rate", phình ở "enormously", trôi vào sương ở "slips" (không tiếng)
      const kR = outBack(prog(t, T.rare - 0.1, T.rare + 0.4)), gold = prog(t, T.starting, T.starting + 0.5) * (1 - prog(t, T.slips, T.sound + 0.4));
      const big = 1 + 0.12 * Math.sin(prog(t, T.enorm, T.enorm + 0.9) * Math.PI), slip = smooth(prog(t, T.slips - 0.1, T.sound + 0.6));
      if (kR > 0) {
        const x = 1500 + 170 * slip, y = 680 + 60 * slip;
        if (gold > 0) glow(g, x, y - 24, 220, 'rgba(255,216,102,0.35)', gold);
        g.save(); g.globalAlpha = clamp(kR * 1.5) * (1 - outB) * (1 - 0.82 * slip);
        g.save(); g.globalAlpha *= clamp(prog(t, T.rare, T.rare + 0.2) * 3); g.fillStyle = 'rgba(8,12,22,0.7)'; g.beginPath(); g.roundRect(x - 125, y - 116, 250, 36, 8); g.fill(); g.restore();
        typed(g, 'HOW RARE IT WAS', x, y - 90, prog(t, T.rare, T.rare + 0.5), `500 22px ${MONO}`, C.ivory, { align: 'center' });
        g.translate(x, y); g.scale(kR * big, kR * big); text(g, '1 in 1,000', 0, 0, `600 72px ${CG}`, gold > 0.5 ? C.gold : C.ivory, 'center'); g.restore();
        if (t > T.starting) { g.save(); g.globalAlpha = (1 - outB) * (1 - 0.82 * slip); typed(g, 'THE STARTING RATE', x, y + 56, prog(t, T.starting, T.starting + 0.5), `500 22px ${MONO}`, C.gold, { align: 'center' }); g.restore(); }
        fogBank(g, 1640, 720, 340, 180, t, { a: 0.4 + 2.4 * slip, seed: 21 });
      }
    }

    // ── C: 1 000 chấm — người khoẻ đông, báo nhầm lấn át người bệnh thật ──
    const inC = prog(t, T.healthy - 0.2, T.numerous + 0.4), outC = smooth(prog(t, T.notice, T.notice + 1.2));
    if (inC > 0 && outC < 1) {
      g.save(); g.translate(0, 260 * outC); g.globalAlpha = 1 - outC;
      const x0 = 720, y0 = 320, dx = 27, dy = 21, kA = prog(t, T.alarms, T.alarms + 0.8), kS = prog(t, T.sick - 0.2, T.sick + 0.3);
      for (let i = 0; i < DOTS; i++) {
        const c = i % 40, r = (i / 40) | 0, x = x0 + c * dx + (hash(i * 1.7) - 0.5) * 6, y = y0 + r * dy + (hash(i * 2.9) - 0.5) * 6;
        if (prog(t, T.healthy - 0.2 + c * 0.02, T.healthy + 0.2 + c * 0.02) <= 0) continue;
        if (i === SICK && kS > 0) { glow(g, x, y, 40, 'rgba(255,216,102,0.8)', kS); g.fillStyle = '#FFF4C8'; g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); continue; }
        if (ALARM.has(i) && kA > hash(i * 5.1)) { glow(g, x, y, 22, 'rgba(244,184,96,0.6)', 1); g.fillStyle = C.amber; g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); continue; }
        g.fillStyle = 'rgba(142,162,184,0.5)'; g.beginPath(); g.arc(x, y, 3.6, 0, 7); g.fill();
      }
      const sx = x0 + (SICK % 40) * dx + (hash(SICK * 1.7) - 0.5) * 6, sy = y0 + ((SICK / 40) | 0) * dy + (hash(SICK * 2.9) - 0.5) * 6;
      ring(g, sx, sy, 24, 22, prog(t, T.sick, T.sick + 0.5), { color: C.gold, w: 3 });
      typed(g, 'HEALTHY · SO NUMEROUS', 720, 900, prog(t, T.healthy, T.numerous + 0.4), `500 24px ${MONO}`, C.fog);
      typed(g, 'FALSE ALARMS', 1120, 900, prog(t, T.alarms, T.alarms + 0.5), `500 24px ${MONO}`, C.amber);
      typed(g, 'TRULY SICK', 1360, 900, prog(t, T.sick, T.sick + 0.4), `500 24px ${MONO}`, C.gold);
      g.restore();
    }

    // ── D: đếm người thay vì tung hứng phần trăm; hai ngọn đèn gặp nhau ──
    const inD = prog(t, T.counting - 0.1, T.counting + 0.4), outD = smooth(prog(t, T.lesson, T.lesson + 1.2));
    if (inD > 0) {
      const lift = 150 * smooth(prog(t, T.lesson, T.lesson + 1.2));     // E: số đếm lùi lên nhường chỗ câu bài học
      // hai ngọn đèn (câu 94) chiếu vào con số đếm
      const kO = outCubic(prog(t, T.count2 - 0.2, T.freq + 0.6)), meet = outCubic(prog(t, T.freq, T.best + 0.3));
      const ox = [760 - 120 * outD, 1640 + 120 * outD], oy = 860 + 200 * outD;
      for (const x of ox) { orb(g, x, oy, kO * (1 - outD), t); beam(g, x, oy, 1180, 560 - lift, 40, 300, 0.3 * meet * (1 - outD), { reach: meet }); }
      if (meet > 0.6) glow(g, 1180, 560 - lift, 300, 'rgba(255,216,102,0.22)', (meet - 0.6) * 2.5 * (1 - outD));
      g.save(); g.globalAlpha = 1 - outD;
      typed(g, 'COUNTING · THE FREQUENCY VIEW', 760, 960, prog(t, T.count2, T.freq + 0.5), `500 22px ${MONO}`, C.amber, { align: 'center' });
      typed(g, 'UPDATING A BELIEF', 1640, 960, prog(t, T.best, T.belief + 0.4), `500 22px ${MONO}`, C.amber, { align: 'center' });
      g.restore();
      const kN = outBack(inD);
      g.save(); g.translate(1180, 600 - lift); g.scale(0.8 + 0.2 * kN, 0.8 + 0.2 * kN); g.globalAlpha = clamp(inD * 1.5);
      text(g, `99 of ${fmt(CASES)}`, 0, 0, `600 120px ${CG}`, C.ivory, 'center'); g.restore();
      typed(g, 'COUNT PEOPLE', 1180, 690 - lift, prog(t, T.counting, T.counting + 0.5), `500 26px ${MONO}`, C.ivory, { align: 'center' });
      typed(g, 'NATURAL FREQUENCIES', 1180, 740 - lift, prog(t, T.natural, T.natural + 0.7), `500 26px ${MONO}`, C.amber, { align: 'center' });
      hand(g, seg(930, 625 - lift, 1430, 625 - lift, 20), { w: 4, color: C.amber, seed: 8, k: prog(t, T.far, T.right) * (1 - outD) });
      // phần trăm tung hứng trên cao, trong sương; rơi xuống sương ở "natural"
      const jug = prog(t, T.juggling - 0.2, T.juggling + 0.4), drop = smooth(prog(t, T.natural, T.natural + 1.1));
      if (jug > 0 && drop < 1) {
        fogBank(g, 1180, 360, 300, 100, t, { a: 1.2, seed: 31 });
        ['0.1%', '99%', '5%'].forEach((s, i) => {
          if (i === 0) must('1 / 1000 * 100', 0.1);
          const a = (t - T.juggling) * 2.6 + i * 2.09, x = 1180 + Math.cos(a) * 220, y = 360 - Math.abs(Math.sin(a)) * 90 + drop * (380 + i * 60);
          g.save(); g.globalAlpha = jug * (1 - drop); text(g, s, x, y, `italic 500 46px ${CG}`, C.fog, 'center'); g.restore();
        });
      }
    }

    // ── E: câu bài học ──
    if (t > T.lesson) {
      typed(g, 'The same test result can mean very different things,', 1080, 860, prog(t, T.lesson + 0.3, T.things + 0.2), `italic 600 54px ${CG}`, C.ivory, { align: 'center' });
      typed(g, 'depending on the background information you start from.', 1080, 940, prog(t, T.depending, T.depending + 1.6), `italic 600 54px ${CG}`, C.amber, { align: 'center' });
    }
    g.restore();
    card(g, 'night', prog(t, F + 0.9, F + 2.2), 'ACT FOUR · BASE RATES', 'Why it catches us out');
  }
}
