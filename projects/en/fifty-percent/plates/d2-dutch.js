// ACT THREE — "Belief with rules" (p2 câu 45–53): lập luận cá cược (Dutch book) bằng PHỈNH DƯỚI ĐÈN BÀN (DNA §1).
// Bố cục:
//   trái         đèn bão người xem + niềm tin trong quầng: A 70%, B 50% → 120% (đỏ: cái sai)
//   giữa         đèn bàn bật giữa đêm; hai vé (A, B) có phỉnh giá 70¢ / 50¢; 12 phỉnh (mỗi phỉnh 10¢) của bạn đẩy sang người
//                bán, 10 phỉnh quay về, 2 phỉnh ở lại hoá ĐỎ (mất 20¢ dù đội nào thắng)
//   câu 51       đèn bàn tắt, phỉnh chìm vào tối; câu 52–53: sao Hoả lên trong đêm, đồng hồ niềm tin KHÔNG số trong đèn
import { W, H, clamp, prog, smooth, outBack, outCubic, C, CG, MONO, sky, glow, lantern, fogBank, chip, deskLamp,
  typed, text, label, card, ring, must, lookup } from '../kit.js';

const LX = 200, LY = 950;                                 // đèn bão người xem
const TX = 1060, TY = 620, TR = 640;                      // vũng sáng đèn bàn
const TK = [[560, 430], [1100, 430]];                     // góc trái trên của hai vé (300×140)
const CENT = 10;                                          // mỗi phỉnh = 10¢
const NA = must('70 / 10', 7), NB = must('50 / 10', 5), NPAY = must('7 + 5', 12), NBACK = must('100 / 10', 10), NLOST = must('12 − 10', 2);
const PAY = must('0.70 + 0.50', 1.2), LOST = must('120 − 100', 20), SUM = must('70 + 50', 120);
const slot = (i, side) => [(side ? 1300 : 660) + (i % 6) * 54, 760 + Math.floor(i / 6) * 52];   // ô phỉnh: bạn (0) / người bán (1)

function ticket(g, x, y, s, k, lit, win) {                // vé cược giấy ngà; lit = đèn bàn; win: viền vàng (đội thắng)
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * -260;
  g.save(); g.translate(x, y + dy); g.globalAlpha = clamp(k * 2) * lit;
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(10, 12, 300, 140);
  g.fillStyle = '#E9E2D0'; g.fillRect(0, 0, 300, 140);
  g.strokeStyle = 'rgba(30,30,34,0.35)'; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(220, 8); g.lineTo(220, 132); g.stroke(); g.setLineDash([]);
  g.fillStyle = C.chip; g.font = `500 26px ${MONO}`; g.letterSpacing = '2px'; g.fillText(s, 22, 58);
  g.fillStyle = '#5A5A62'; g.font = `500 20px ${MONO}`; g.fillText('PAYS $1', 22, 104);
  if (win > 0) { g.globalAlpha = clamp(win) * lit; g.strokeStyle = C.gold; g.lineWidth = 6; g.strokeRect(-8, -8, 316, 156); }
  g.restore();
}
function mars(g, x, y, r, k, t) {                         // sao Hoả: đất son trầm (KHÔNG đỏ C.red — nó không "sai"), sáng từ phía đèn
  if (k <= 0) return;
  const rr = r * (0.6 + 0.4 * outBack(clamp(k)));
  glow(g, x, y, rr * 2.6, 'rgba(196,124,72,0.22)', k);
  g.save(); g.globalAlpha = clamp(k * 1.4);
  const gr = g.createRadialGradient(x - rr * 0.4, y - rr * 0.35, rr * 0.1, x, y, rr);
  gr.addColorStop(0, '#D9A070'); gr.addColorStop(0.55, '#A8653A'); gr.addColorStop(1, '#4A2A1A');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
  g.globalAlpha = clamp(k) * 0.35; g.fillStyle = '#5E3420';
  [[-0.3, 0.1, 0.22, 0.1], [0.25, -0.25, 0.16, 0.08], [0.1, 0.4, 0.3, 0.07]].forEach(([dx, dy, a, b]) => {
    g.beginPath(); g.ellipse(x + dx * rr, y + dy * rr, a * rr, b * rr, 0.3, 0, 7); g.fill(); });
  g.restore();
}
/** Đồng hồ niềm tin không số (cùng mặt với d1): nửa vòng, vạch chia trơn, kim v ∈ [0,1]. */
function dial(g, x, y, r, v, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k * 1.5); g.lineCap = 'round';
  g.strokeStyle = 'rgba(244,184,96,0.55)'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r * outCubic(clamp(k)), Math.PI, 2 * Math.PI); g.stroke();
  for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI, r0 = r * (i % 4 ? 0.9 : 0.84);
    g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); g.stroke(); }
  const a = Math.PI + v * Math.PI;
  g.strokeStyle = C.ivory; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * r * 0.86 * clamp(k), y + Math.sin(a) * r * 0.86 * clamp(k)); g.stroke();
  g.fillStyle = C.amber; g.beginPath(); g.arc(x, y, 10, 0, 7); g.fill(); g.restore();
}

export default class Dutch {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      betting: w(45, 'betting'), willing: w(46, 'willing'), believe46: w(46, 'believe'),
      break: w(47, 'break'), two47: w(47, 'two'), seventy: w(47, 'seventy'), fifty: w(47, 'fifty'), e47: L(47).end,
      tickets: w(48, 'tickets'), one48: w(48, 'one'), aWins: w(48, 'wins'), c70: w(48, 'seventy'), other: w(48, 'other'), bWins: w(48, 'wins', 2), c50: w(48, 'fifty'),
      fair: w(49, 'fair'), buy: w(49, 'buy'), twenty49: w(49, 'twenty'), e49: L(49).end,
      one: w(50, 'one'), so50: w(50, 'so'), collect: w(50, 'collect'), whatever: w(50, 'whatever'), lose: w(50, 'lose'), twenty: w(50, 'twenty'),
      rules: w(51, 'rules'), sky: w(51, 'sky'), conditions: w(51, 'conditions'), contradict: w(51, 'contradict'), e51: L(51).end,
      handles: w(52, 'handles'), only: w(52, 'only'), once: w(52, 'once'),
      talk: w(53, 'talk'), believe53: w(53, 'believe'), mars: w(53, 'mars'), life: w(53, 'life'), true: w(53, 'true'), false: w(53, 'false'),
      never: w(53, 'never'), end: L(53).end,
    };
    this.START = L(45).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.betting - 0.9, kind: 'shimmer' }, { t: T.c70, kind: 'chip' }, { t: T.c50, kind: 'chip' }, { t: T.buy, kind: 'chip' },
      { t: T.so50, kind: 'chip' }, { t: T.twenty, kind: 'error' }, { t: T.life, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T;
    const push = 1 + 0.04 * smooth(prog(t, T.handles, T.end + 1.5));         // câu 52–53: camera đẩy chậm về sao Hoả
    g.save(); g.translate(1320, 470); g.scale(push, push); g.translate(-1320, -470);
    sky(g, t, { fog: 1 });

    // ── đèn bàn: bật ở câu 45, tắt từ "conditions" (câu 51) ──
    const on = outCubic(prog(t, T.betting - 1.0, T.betting - 0.3)) * (1 - smooth(prog(t, T.conditions, T.e51 + 0.6)));
    deskLamp(g, TX, TY, TR, on, t, { top: 150 });
    const lit = clamp(on * 1.15);

    // phỉnh: 12 cái của bạn → đẩy sang người bán ("buy") → 10 cái quay về ("collect") → 2 cái ở lại hoá đỏ ("twenty")
    if (lit > 0) {
      g.save(); g.globalAlpha = lit;
      for (let i = 0; i < NPAY; i++) {
        const go = smooth(prog(t, T.buy + i * 0.07, T.buy + 0.55 + i * 0.07));
        const back = i < NBACK ? smooth(prog(t, T.so50 + i * 0.06, T.so50 + 0.6 + i * 0.06)) : 0;
        const a = slot(i, 0), b = slot(i, 1), u = go - back;
        const x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u - 40 * Math.sin(u * Math.PI);
        const kIn = outBack(prog(t, T.willing - 0.2 + i * 0.05, T.willing + 0.2 + i * 0.05));
        if (kIn <= 0) continue;
        const red = i >= NBACK ? prog(t, T.twenty - 0.1, T.twenty + 0.3) : 0;
        chip(g, x, y, 22 * kIn, red > 0.5 ? C.red : C.chip, { spots: C.chipRim });
      }
      g.restore();
      if (t > T.willing) { label(g, 'you', 660 - 22, 900, C.amber, 'left', 22); label(g, `each chip = ${CENT}¢`, 660 - 22, 712, C.fog, 'left', 20); }
      if (t > T.tickets) label(g, 'seller', 1300 - 22, 900, C.fog, 'left', 22);
      if (t > T.twenty49 - 0.1 && t < T.so50 + 0.5) typed(g, `$${PAY.toFixed(2)}`, 1440, 700, prog(t, T.twenty49 - 0.1, T.twenty49 + 0.3) - prog(t, T.so50, T.so50 + 0.4), `500 28px ${MONO}`, C.ivory, { align: 'center' });
      if (t > T.collect) typed(g, '$1 back', 880, 900, prog(t, T.collect, T.collect + 0.3), `500 28px ${MONO}`, C.ivory, { align: 'center' });
      if (t > T.twenty - 0.1) { g.save(); g.globalAlpha = lit;
        typed(g, `−${LOST}¢`, 1590, 800, prog(t, T.twenty - 0.1, T.twenty + 0.3), `600 72px ${CG}`, C.red); g.restore(); }
    }
    // hai vé + phỉnh giá
    const win = (i) => i === 0 ? prog(t, T.one, T.one + 0.4) - prog(t, T.whatever, T.whatever + 0.4) : prog(t, T.whatever, T.whatever + 0.4);
    const lose = (i) => (1 - win(i)) * 0.6 * prog(t, T.one, T.one + 0.4);
    [['A WINS → $1', T.one48 - 0.3, T.c70, NA], ['B WINS → $1', T.other - 0.3, T.c50, NB]].forEach(([s, a, pc, n], i) => {
      const k = prog(t, a, a + 0.6); if (k <= 0 || lit <= 0) return;
      const [x, y] = TK[i];
      ticket(g, x, y, s, k, lit * (1 - lose(i)), win(i));
      const kc = outBack(prog(t, pc - 0.1, pc + 0.3));
      if (kc > 0) { g.save(); g.globalAlpha = lit * (1 - lose(i)); chip(g, x + 350, y + 70, 54 * kc, C.chip, { label: `${n * CENT}¢`, size: 30 }); g.restore(); }
      if (t > T.fair - 0.1) { g.save(); g.globalAlpha = lit; typed(g, 'FAIR TO YOU', x, y + 184, prog(t, T.fair - 0.1 + i * 0.2, T.fair + 0.4 + i * 0.2), `500 22px ${MONO}`, C.amber); g.restore(); }
    });

    // ── niềm tin trong quầng đèn người xem (trái): A 70%, B 50% → 120% (sai) ──
    const lamp = 0.55 + 0.45 * outCubic(prog(t, T.believe53 - 0.3, T.believe53 + 0.6));
    glow(g, 230, 560, 330, 'rgba(244,184,96,0.16)', lamp);
    const gone = prog(t, T.handles - 0.6, T.handles + 0.4);               // câu 52: xoá niềm tin cá cược (chữ rút ngược)
    const kTwo = prog(t, T.two47 - 0.1, T.two47 + 0.7) - gone;
    if (kTwo > 0) typed(g, 'ONLY TWO OUTCOMES', 110, 340, kTwo, `500 20px ${MONO}`, C.fog);
    if (t > T.seventy - 0.3) { typed(g, 'A WINS', 110, 400, prog(t, T.seventy - 0.4, T.seventy) - gone, `500 22px ${MONO}`, C.amber);
      typed(g, `${NA * CENT}%`, 110, 470, prog(t, T.seventy, T.seventy + 0.3) - gone, `600 72px ${CG}`, C.amber); }
    if (t > T.fifty - 0.3) { typed(g, 'B WINS', 110, 540, prog(t, T.fifty - 0.4, T.fifty) - gone, `500 22px ${MONO}`, C.amber);
      typed(g, `${NB * CENT}%`, 110, 610, prog(t, T.fifty, T.fifty + 0.3) - gone, `600 72px ${CG}`, C.amber); }
    const kSum = prog(t, T.fifty + 0.4, T.e47 + 0.3) - gone;
    if (kSum > 0) {
      g.save(); g.fillStyle = C.fog; g.fillRect(110, 638, 220 * clamp(kSum * 2), 3); g.restore();
      typed(g, `${SUM}%`, 110, 712, kSum * 1.5 - 0.5, `600 72px ${CG}`, C.red);
      if (t > T.contradict - 0.2 && gone < 1) ring(g, 190, 690, 120, 56, prog(t, T.contradict - 0.2, T.contradict + 0.5), { color: C.red, w: 4 });
    }

    // ── câu 52–53: sao Hoả trong đêm, đồng hồ niềm tin không số trong đèn người xem ──
    const kM = prog(t, T.only - 0.2, T.once + 0.6);
    mars(g, 1320, 470, 100, kM, t);
    fogBank(g, 1320, 640, 300, 90, t, { a: 0.8 * kM, seed: 17 });
    if (t > T.mars - 0.2) label(g, 'Mars', 1320, 330, C.ivory, 'center');
    if (t > T.life - 0.4) typed(g, 'once had life?', 1320, 650, prog(t, T.life - 0.4, T.life + 0.4), `italic 600 54px ${CG}`, C.ivory, { align: 'center' });
    if (t > T.true - 0.1) label(g, 'true', 1140, 480, C.fog, 'right');
    if (t > T.false - 0.1) label(g, 'false', 1500, 480, C.fog, 'left');
    const kD = prog(t, T.talk - 0.2, T.believe53 + 0.2);
    const v = 0.5 + 0.18 * outCubic(prog(t, T.believe53, T.believe53 + 1.2)) + 0.03 * Math.sin(t * 1.3);
    dial(g, 300, 640, 150, v, kD);
    if (kD > 0) label(g, 'how strongly you believe', 300, 700, C.amber, 'center', 20);
    lantern(g, LX, LY, 0.8, t, lamp);
    g.restore();

    // ── chữ (toạ độ màn hình) ──
    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.3), 'ACT THREE · BELIEF', 'Belief with rules');
    const cap = (s, a, b, out, color = C.ivory) => { if (t > a - 0.1 && t < out) typed(g, s, TX, 1012, prog(t, a, b) - prog(t, out - 0.4, out), `italic 500 46px ${CG}`, color, { align: 'center' }); };
    cap('bet exactly as strongly as you believe', T.willing, T.believe46 + 0.4, T.break - 0.1);
    cap('now suppose your numbers break the rules', T.break + 0.05, T.two47, T.tickets - 0.2);
    cap('each ticket looks fair, so you buy both', T.fair - 0.4, T.buy + 0.4, T.one - 0.2);
    cap('one team wins: you collect $1, whatever happens', T.one - 0.15, T.whatever + 0.4, T.rules - 0.2);
    cap('the rules don’t fall from the sky', T.rules - 0.1, T.sky + 0.3, T.conditions - 0.2);
    cap('they keep your beliefs from contradicting themselves', T.conditions - 0.15, T.contradict + 0.6, T.handles - 0.2);
    cap('events that happen only once', T.handles, T.once + 0.4, T.never - 0.2, C.fog);
    cap('simply true or false, never repeated', T.never - 0.15, T.end, T.end + 3, C.fog);
  }
}
