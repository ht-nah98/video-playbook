// ACT THREE — "Evidence shifts the scales" (p2 câu 54–65): Bayes bằng CÁN CÂN HAI ĐĨA (DNA §1). Cảnh dừng ngay sau câu 65;
// e2-otp nối tiếp (đòi OTP, cán cân lệch hẳn).
// Bố cục:
//   trái         điện thoại vẽ bằng code (không logo ngân hàng); dưới nó đèn bão người xem + niềm tin "scam ≈ …%" trong quầng
//   phải         câu 56–57: mascot `phone` (≈ 7.5 s)
//   giữa-phải    câu 58: 100 tin nhắn cũ (1 lừa : 99 thật) bay vào hai đĩa → cán cân nghiêng sâu về "genuine";
//                câu 61–64: 0.90 / 0.85 → trọng lượng ≈ 1.06 → nhân vào đĩa, cán cân gần như đứng yên
// Góc nghiêng = hàm của log tỉ lệ (tilt()), tính trong code — CONTENT.md "Ví dụ minh hoạ": 1 : 99, 0.90, 0.85.
import { W, H, clamp, hash, prog, smooth, outBack, outCubic, C, CG, MONO, sky, glow, lantern, fogBank, dashes, figure,
  typed, text, label, card, ring, must, lookup } from '../kit.js';

const LX = 250, LY = 960;                                  // đèn bão người xem
const PX = 1260, PY = 420, ARM = 330, STR = 190;           // trụ cán cân, nửa đòn, dây treo đĩa
const PHONE = { x: 120, y: 250, w: 320, h: 530 };          // điện thoại vẽ tay
const SCAM = must('1', 1), GEN = must('100 − 1', 99);      // tỉ lệ trước lừa : thật (1 : 99)
const P_S = 0.90, P_G = 0.85;                              // P(chào | lừa), P(chào | thật)
const LR = must('0.90 ÷ 0.85', 18 / 17);                   // trọng lượng bằng chứng ≈ 1.06
const POST = must('1 × 0.90 ÷ 0.85', 18 / 17);             // lừa sau khi đọc câu chào (thật vẫn 99)
const PRIOR_PCT = must('1 ÷ (1 + 99) × 100', 1);
const POST_PCT = POST / (POST + GEN) * 100;                // ≈ 1.06 %
must(`${POST_PCT.toFixed(1)}`, 1.1);                       // hiện "≈ 1.1%"
/** Góc đòn cân (rad, dương = đĩa phải "genuine" xuống) theo log tỉ lệ thật : lừa. 1 : 99 → ≈ 22°, ≈ 8.6 : 1 → lệch hẳn sang trái. */
export const tilt = (scam, gen) => 0.42 * Math.tanh(Math.log(gen / scam) / 3);
const TH0 = tilt(SCAM, GEN), TH1 = tilt(POST, GEN);

function pan(g, x, y, k, num, color, name) {               // đĩa cân treo ở (x, y) = đầu đòn; số cân nằm trong đĩa
  const by = y + STR;
  g.save(); g.globalAlpha = clamp(k * 1.5); g.strokeStyle = 'rgba(142,162,184,0.8)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x - 100, by); g.moveTo(x, y); g.lineTo(x + 100, by); g.stroke();
  const gr = g.createLinearGradient(x - 110, by, x + 110, by + 30); gr.addColorStop(0, '#8A6A30'); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, '#7A5A22');
  g.fillStyle = gr; g.beginPath(); g.moveTo(x - 115, by); g.quadraticCurveTo(x, by + 60, x + 115, by); g.closePath(); g.fill();
  if (num) text(g, num, x, by - 8, `600 60px ${CG}`, color, 'center');
  label(g, name, x, by + 72, color, 'center', 22);
  g.restore();
}
function scales(g, th, k, ghost, nums) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * 300;
  g.save(); g.translate(0, dy);
  glow(g, PX, PY, 260, 'rgba(244,184,96,0.14)', k);
  g.globalAlpha = clamp(k * 1.5);
  g.fillStyle = '#2A2418'; g.fillRect(PX - 9, PY, 18, 470); g.fillStyle = '#3A3020'; g.beginPath(); g.ellipse(PX, PY + 470, 130, 22, 0, 0, 7); g.fill();
  if (ghost > 0) { const c = Math.cos(TH0) * ARM, s = Math.sin(TH0) * ARM;
    dashes(g, PX - c, PY - s, PX + c, PY + s, 'rgba(142,162,184,0.7)', { k: ghost, w: 2, on: 8, off: 10 }); }
  const c = Math.cos(th) * ARM, s = Math.sin(th) * ARM;
  g.strokeStyle = C.brass; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(PX - c, PY - s); g.lineTo(PX + c, PY + s); g.stroke();
  g.fillStyle = C.amber; g.beginPath(); g.arc(PX, PY, 14, 0, 7); g.fill();
  pan(g, PX - c, PY - s, k, nums[0], C.amber, 'scam');
  pan(g, PX + c, PY + s, k, nums[1], C.ivory, 'genuine');
  g.restore();
  return [[PX - c, PY - s + STR + dy], [PX + c, PY + s + STR + dy]];
}
function phone(g, k, t, T) {                                // điện thoại: thân tối, màn sáng, tin nhắn (không logo thật)
  if (k <= 0) return;
  const { x, y, w, h } = PHONE, dy = (1 - outBack(clamp(k))) * 700;
  g.save(); g.translate(x, y + dy);
  glow(g, w / 2, h / 2, 380, 'rgba(160,190,230,0.10)', k);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.roundRect(12, 16, w, h, 40); g.fill();
  g.fillStyle = '#151B26'; g.beginPath(); g.roundRect(0, 0, w, h, 40); g.fill();
  g.strokeStyle = '#3A4558'; g.lineWidth = 3; g.stroke();
  g.fillStyle = '#E4E8EF'; g.beginPath(); g.roundRect(14, 14, w - 28, h - 28, 30); g.fill();
  g.fillStyle = '#151B26'; g.beginPath(); g.roundRect(w / 2 - 50, 22, 100, 22, 11); g.fill();
  g.fillStyle = '#2B3442'; g.font = `500 20px ${MONO}`; g.letterSpacing = '2px'; g.textAlign = 'center'; g.fillText('“YOUR BANK”', w / 2, 92);
  g.fillStyle = '#3E4A5C'; g.font = `500 20px ${MONO}`; g.fillText('TEXT MESSAGE', w / 2, 122); g.textAlign = 'left'; g.letterSpacing = '0px';
  // bong bóng: chưa đọc = vạch xám; câu 60 "dear valued customer" gõ vào
  g.fillStyle = '#C9D1DC'; g.beginPath(); g.roundRect(30, 150, w - 74, 200, 22); g.fill();
  const kd = prog(t, T.dear - 0.05, T.customer + 0.4);
  typed(g, 'Dear valued', 52, 200, kd * 2, `500 24px ${MONO}`, '#151B26');
  typed(g, 'customer, …', 52, 236, kd * 2 - 1, `500 24px ${MONO}`, '#151B26');
  const hl = (a, b) => prog(t, a - 0.1, a + 0.4) - prog(t, b, b + 0.4);   // câu 61/62: "so politely" / "exactly like that" — khoanh câu chào
  const k1 = hl(T.politely, T.second), k2 = hl(T.exactly, T.ratio);
  if (k1 > 0) ring(g, 150, 214, 124, 48, k1, { color: C.amber, w: 4 });
  if (k2 > 0) ring(g, 150, 214, 130, 54, k2, { color: '#2B3442', w: 4, seed: 9 });
  g.fillStyle = '#9AA5B4'; [270, 302].forEach((yy, i) => g.fillRect(52, yy - 12, (i ? 140 : 200), 12));
  g.restore();
}

export default class Sms {
  static ERA = 'night';
  static POSES = ['phone'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      belief: w(54, 'belief'), question: w(54, 'question'), info: w(54, 'information'), arrives: w(54, 'arrives'), how: w(54, 'how'), mind: w(54, 'mind'),
      bayes: w(55, "bayes'"), theorem: w(55, 'theorem'), concrete: w(55, 'concrete'), picture: w(55, 'picture'),
      a56: L(56).start, pops: w(56, 'pops'), bank: w(56, 'bank'),
      hyp: w(57, 'hypothesis'), scam57: w(57, 'scam'),
      until: L(58).start, messages: w(58, 'messages'), always: w(58, 'always'), genuine: w(58, 'genuine'), leans: w(58, 'leans'), genuine2: w(58, 'genuine', 2),
      pic59: L(59).start, scales: w(59, 'scales'), tipped: w(59, 'tipped'), side: w(59, 'side'),
      dear: w(60, 'dear'), customer: w(60, 'customer'), questions: w(60, 'questions'),
      first: w(61, 'first'), scam61: w(61, 'scam'), politely: w(61, 'politely'), quite: w(61, 'quite'),
      second: w(62, 'second'), genuine62: w(62, 'genuine'), exactly: w(62, 'exactly'), also: w(62, 'also'),
      ratio: w(63, 'ratio'), answers: w(63, 'answers'), weight: w(63, 'weight'), evidence: w(63, 'evidence'),
      almost: w(64, 'almost'), equal: w(64, 'equal'), one: w(64, 'one'), multiply: w(64, 'multiply'), barely: w(64, 'barely'), move: w(64, 'move'),
      greeting: w(65, 'greeting'), learned: w(65, 'learned'), nothing: w(65, 'nothing'), end: L(65).end,
    };
    this.START = L(54).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.how, kind: 'question' }, { t: T.pops, kind: 'pop' }, { t: T.scam57, kind: 'pop' }, { t: T.genuine, kind: 'tick' },
      { t: T.tipped, kind: 'snap' }, { t: T.dear, kind: 'pop' }, { t: T.quite, kind: 'tick' }, { t: T.also, kind: 'tick' },
      { t: T.evidence, kind: 'tick' }, { t: T.multiply + 0.3, kind: 'snap' }];
  }
  render(g, t) {
    const T = this.T;
    const push = 1 + 0.025 * smooth(prog(t, T.equal, T.end + 1));        // câu 64–65: camera đẩy chậm vào cán cân
    g.save(); g.translate(PX, PY + 200); g.scale(push, push); g.translate(-PX, -PY - 200);
    sky(g, t, { fog: 1 });

    // ── câu 54: thông tin mới = một đốm sáng trôi từ sương về đèn người xem ──
    const lamp = 0.5 + 0.3 * outCubic(prog(t, T.arrives, T.arrives + 0.6)) + 0.2 * prog(t, T.tipped, T.side);
    const u = prog(t, T.info - 0.4, T.arrives + 0.4);
    if (u > 0 && u < 1) { const e = smooth(u), x = 1750 + (LX - 1750) * e, y = 420 + (LY - 120 - 420) * e - 120 * Math.sin(e * Math.PI);
      glow(g, x, y, 70, 'rgba(244,184,96,0.7)'); glow(g, x, y, 16, 'rgba(255,240,200,1)'); }
    fogBank(g, 1700, 460, 260, 160, t, { a: 0.9, seed: 31 });

    // ── câu 58: 100 tin nhắn cũ (1 lừa : 99 thật) → câu 59 bay vào hai đĩa ──
    const kGrid = prog(t, T.messages - 0.2, T.genuine + 0.2), fly = prog(t, T.scales - 0.6, T.tipped);
    const kSc = outCubic(prog(t, T.pic59 - 0.2, T.scales));
    const th = TH0 + (TH1 - TH0) * smooth(prog(t, T.multiply + 0.3, T.barely + 0.3));
    const pos = [[PX - Math.cos(th) * ARM, PY - Math.sin(th) * ARM + STR], [PX + Math.cos(th) * ARM, PY + Math.sin(th) * ARM + STR]];
    const nums = [fly >= 1 ? (t > T.multiply + 0.6 ? `${POST.toFixed(2)}` : `${SCAM}`) : '', fly >= 1 ? `${GEN}` : ''];
    scales(g, th, kSc, prog(t, T.multiply, T.multiply + 0.4), nums);
    if (kGrid > 0 && fly < 1) {
      for (let i = 0; i < SCAM + GEN; i++) {
        const shown = clamp(kGrid * 110 - i); if (shown <= 0) continue;
        const gx = 610 + (i % 10) * 28, gy = 440 + Math.floor(i / 10) * 28, isScam = i === 37;
        const [tx, ty] = isScam ? pos[0] : pos[1];
        const e = smooth(clamp(fly * 1.4 - hash(i * 1.3) * 0.4));
        const x = gx + (tx + (hash(i) - 0.5) * 80 - gx) * e, y = gy + (ty - 30 - gy) * e - 80 * Math.sin(e * Math.PI), s = 20 * (1 - 0.5 * e);
        g.fillStyle = isScam ? C.amber : 'rgba(237,230,214,0.75)'; g.fillRect(x - s / 2, y - s / 2, s, s * 0.75);
      }
      if (fly <= 0) { label(g, 'past messages from this number', 600, 412, C.fog, 'left', 20);
        typed(g, `${SCAM} scam : ${GEN} genuine`, 610, 760, prog(t, T.always, T.genuine + 0.4), `500 24px ${MONO}`, C.ivory); }
    }
    // ── câu 60–62: hai câu hỏi dưới hai đĩa ──
    const q = (x, head, ask, s, v, h, a, b, color) => { if (t < h - 0.2) return;   // h = tên đĩa được đọc, a = câu trả lời, b = số
      typed(g, head, x, 880, prog(t, h - 0.1, h + 0.4), `500 20px ${MONO}`, color, { align: 'center' });
      const kAsk = prog(t, h + 0.3, h + 1.2) - prog(t, a - 0.4, a - 0.1);                // câu hỏi treo → nhường chỗ câu trả lời
      if (kAsk > 0) typed(g, ask, x, 934, kAsk, `italic 500 46px ${CG}`, C.fog, { align: 'center' });
      typed(g, s, x, 934, prog(t, a - 0.1, a + 0.4), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
      typed(g, v, x, 996, prog(t, b, b + 0.3), `600 60px ${CG}`, color, { align: 'center' }); };
    if (kSc > 0) {
      const xs = PX - Math.cos(TH0) * ARM, xg = PX + Math.cos(TH0) * ARM;
      glow(g, pos[0][0], pos[0][1], 170, 'rgba(244,184,96,0.30)', prog(t, T.first - 0.2, T.first + 0.4) - prog(t, T.second - 0.2, T.second + 0.4));
      glow(g, pos[1][0], pos[1][1], 170, 'rgba(237,230,214,0.22)', prog(t, T.second - 0.2, T.second + 0.4) - prog(t, T.ratio - 0.2, T.ratio + 0.4));
      q(xs, 'IF SCAM', 'how likely?', 'Quite likely', P_S.toFixed(2), T.scam61, T.quite, T.quite + 0.2, C.amber);
      q(xg, 'IF GENUINE', 'how likely?', 'Also quite likely', P_G.toFixed(2), T.genuine62, T.also, T.also + 0.2, C.ivory);
      const kEq = prog(t, T.almost - 0.1, T.equal + 0.4) - prog(t, T.multiply - 0.2, T.multiply + 0.3);   // "almost equal": khoanh hai số
      if (kEq > 0) { ring(g, xs, 982, 78, 36, kEq, { color: C.amber, w: 4 }); ring(g, xg, 982, 78, 36, kEq, { color: C.amber, w: 4, seed: 8 }); }
    }
    // ── câu 63–64: trọng lượng bằng chứng = 0.90 ÷ 0.85 ≈ 1.06, nhân vào đĩa "scam" ──
    if (t > T.ratio - 0.2) {
      glow(g, PX, 300, 200, 'rgba(244,184,96,0.25)', prog(t, T.weight, T.evidence + 0.4));
      const gone = prog(t, T.greeting, T.greeting + 0.5);                  // câu 65: công thức nhường chỗ cho kết luận
      typed(g, 'WEIGHT OF THE EVIDENCE', PX, 212, prog(t, T.weight - 0.1, T.evidence + 0.3) - gone, `500 22px ${MONO}`, C.amber, { align: 'center' });
      typed(g, `${P_S.toFixed(2)} ÷ ${P_G.toFixed(2)} ≈ ${LR.toFixed(2)}`, PX, 296, prog(t, T.ratio - 0.1, T.answers + 0.4) - gone, `600 60px ${CG}`, C.ivory, { align: 'center' });
      if (t > T.one - 0.3) ring(g, PX + 150, 272, 90, 38, prog(t, T.one - 0.3, T.one + 0.4) - gone, { color: C.amber, w: 4 });
      const m = prog(t, T.multiply - 0.1, T.multiply + 0.6);               // "× 1.06" bay xuống đĩa scam
      if (m > 0 && m < 1) { const e = smooth(m), x = PX + 150 + (pos[0][0] - PX - 150) * e, y = 350 + (pos[0][1] - 60 - 350) * e;
        text(g, `× ${LR.toFixed(2)}`, x, y, `500 28px ${MONO}`, C.amber, 'center'); }
      if (t > T.barely - 0.1) typed(g, 'barely moves', PX + 50, PY - 20, prog(t, T.barely - 0.1, T.move + 0.4), `italic 500 46px ${CG}`, C.fog, { align: 'left' });
    }

    // ── đèn người xem + niềm tin "scam" trong quầng ──
    glow(g, LX + 230, LY - 20, 300, 'rgba(244,184,96,0.14)', lamp);
    lantern(g, LX, LY, 0.7, t, lamp);
    if (t > T.tipped - 0.2) {
      label(g, 'your belief · scam', 360, 935, C.amber, 'left', 20);
      const after = t > T.greeting - 0.1;
      typed(g, after ? `≈ ${POST_PCT.toFixed(1)}%` : `${PRIOR_PCT}%`, 360, 1004, after ? prog(t, T.greeting - 0.1, T.greeting + 0.3) : prog(t, T.tipped - 0.2, T.tipped + 0.2), `600 60px ${CG}`, C.amber);
    }
    g.restore();

    // ── điện thoại (từ "pops"), mascot `phone` (câu 56–57) ──
    phone(g, prog(t, T.pops - 0.2, T.pops + 0.35), t, T);
    const kM = prog(t, T.a56 - 0.3, T.a56 + 0.1) - prog(t, T.until, T.until + 0.4);
    if (kM > 0) figure(g, 'phone', 1660, H, 760, 'night', kM, { rim: 'left' });

    // ── chữ ──
    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.3), 'ACT THREE · BELIEF', 'Evidence shifts the scales');
    const out1 = prog(t, T.picture - 0.2, T.picture + 0.5);
    const kQ = outBack(prog(t, T.question - 0.1, T.question + 0.3)) * (1 - prog(t, T.pops - 0.3, T.pops + 0.2));   // "a new question" — ? trong quầng đèn
    if (kQ > 0) { g.save(); g.translate(LX + 220, LY - 60); g.scale(kQ, kQ); text(g, '?', 0, 0, `600 140px ${CG}`, C.amber, 'center'); g.restore(); }
    if (t < T.picture + 0.6) {
      typed(g, 'New information arrives.', 640, 420, prog(t, T.info - 0.3, T.arrives + 0.4) - out1, `italic 600 64px ${CG}`, C.ivory);
      typed(g, 'How much should you change your mind?', 640, 490, prog(t, T.how - 0.1, T.mind + 0.5) - out1, `italic 500 46px ${CG}`, C.amber);
      typed(g, 'Bayes’ theorem', 640, 640, prog(t, T.bayes - 0.1, T.theorem + 0.5) - out1, `italic 600 96px ${CG}`, C.ivory);
    }
    const kH = prog(t, T.hyp - 0.1, T.hyp + 0.5) - prog(t, T.scales - 0.6, T.scales);
    if (kH > 0) { typed(g, 'THE HYPOTHESIS', 560, 290, kH * 2, `500 22px ${MONO}`, C.amber);
      typed(g, 'The message is a scam.', 560, 356, prog(t, T.scam57 - 0.6, T.scam57 + 0.3) - prog(t, T.scales - 0.6, T.scales), `italic 600 64px ${CG}`, C.ivory); }
    if (t > T.learned - 0.6) typed(g, 'You have learned nothing.', PX, 250, prog(t, T.learned - 0.5, T.nothing + 0.4), `italic 600 64px ${CG}`, C.ivory, { align: 'center' });
  }
}
