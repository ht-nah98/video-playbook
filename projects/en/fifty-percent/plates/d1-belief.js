// ACT THREE mở hồi — "A property of you, not of the coin" (p2 câu 39–44). DNA §1: chân dung trong khung đèn.
// Bố cục:
//   trái dưới   đèn bão NGƯỜI XEM; "%" treo trong quầng đèn (vào từ ba vật), rồi thành mặt đồng hồ niềm tin (không số)
//   phải        ba vật của ACT TWO (đồng xu, mây, lá phiếu) trong sương — "%" rời từng vật bay về đèn, vật chìm vào sương
//   phải        câu 42: mascot `shrug` (3–5 s) — chữ ở giữa trái, không đè
//   giữa        câu 44: Ramsey (Anh) và de Finetti (Ý), mỗi người một quầng đèn riêng, sương ngăn giữa ("independently")
import { W, H, clamp, hash, prog, smooth, outBack, outCubic, C, CG, MONO, sky, glow, lantern, fogBank, dashes, coin, figure,
  typed, text, label, card, actTitle, portrait, hand, arrow, lookup } from '../kit.js';

const LX = 250, LY = 900;                                // đèn bão của người xem
const PX = 430, PY = 600;                                // "%" / mặt đồng hồ trong quầng đèn
const OBJ = [[1200, 640], [1440, 600], [1680, 650]];     // đồng xu, mây, lá phiếu

function cloud(g, x, y, s, a) {                          // mây mưa (ACT TWO) — búi ngà xám, vài vệt mưa
  g.save(); g.globalAlpha = a; g.fillStyle = '#9FB0C4';
  [[-42, 8, 34], [-8, -14, 44], [34, 2, 36], [0, 14, 40]].forEach(([dx, dy, r]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, r * s, 0, 7); g.fill(); });
  g.strokeStyle = '#8EA2B8'; g.lineWidth = 3 * s; g.lineCap = 'round';
  for (let i = 0; i < 4; i++) { const rx = x + (-36 + i * 24) * s; g.beginPath(); g.moveTo(rx, y + 52 * s); g.lineTo(rx - 8 * s, y + 80 * s); g.stroke(); }
  g.restore();
}
function ballot(g, x, y, s, a) {                         // lá phiếu: giấy ngà, hai ô, một ô đã đánh (nét tay)
  g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(-0.08); g.scale(s, s);
  g.fillStyle = '#D9D2C2'; g.fillRect(-46, -60, 92, 120);
  g.strokeStyle = '#3A4252'; g.lineWidth = 3; g.strokeRect(-30, -36, 20, 20); g.strokeRect(-30, 6, 20, 20);
  g.fillStyle = '#6B7484'; g.fillRect(0, -30, 34, 6); g.fillRect(0, 12, 28, 6); g.restore();
  g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(-0.08); g.scale(s, s);
  hand(g, [[-28, -26], [-21, -19], [-8, -40]], { w: 4, color: '#3A4252', jit: 0.5, seed: 4 }); g.restore();
}
/** Mặt đồng hồ niềm tin trong quầng đèn: nửa vòng, vạch chia KHÔNG số; v ∈ [0,1] vị trí kim. */
function dial(g, x, y, r, v, k, clampK = 0) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k * 1.5); g.lineCap = 'round';
  g.strokeStyle = 'rgba(244,184,96,0.55)'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r * outCubic(clamp(k)), Math.PI, 2 * Math.PI); g.stroke();
  for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI, r0 = r * (i % 4 ? 0.9 : 0.84);
    g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); g.stroke(); }
  if (clampK > 0) {                                       // hai thanh chặn khép lại quanh kim ("tightly constrained")
    const gap = 0.4 - 0.31 * outCubic(clampK);
    [-1, 1].forEach(sd => { const a = Math.PI + (v + sd * gap) * Math.PI;
      g.strokeStyle = C.amber; g.lineWidth = 7; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55); g.lineTo(x + Math.cos(a) * r * 1.08, y + Math.sin(a) * r * 1.08); g.stroke(); });
  }
  const a = Math.PI + v * Math.PI;
  g.strokeStyle = C.ivory; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * r * 0.86 * clamp(k), y + Math.sin(a) * r * 0.86 * clamp(k)); g.stroke();
  g.fillStyle = C.amber; g.beginPath(); g.arc(x, y, 10, 0, 7); g.fill(); g.restore();
}

export default class Belief {
  static ERA = 'night';
  static POSES = ['shrug'];
  static IMAGES = { ramsey: './assets/history/Frank_Plumpton_Ramsey.jpeg', definetti: './assets/history/Bruno_de_Finetti_portrait.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      believe: w(39, 'believe'), given: w(39, 'given'), info: w(39, 'information'),
      rel: w(40, 'relationship'), you: w(40, 'you'), event: w(40, 'event'), live: w(40, 'live'),
      coin: w(40, 'coin'), cloud: w(40, 'cloud'), ballot: w(40, 'ballot'),
      describes: w(41, 'describes'), state: w(41, 'state'), knowledge: w(41, 'knowledge'),
      first: w(42, 'first'), loose: w(42, 'loose'), anyone: w(42, 'anyone'), like: w(42, 'like'),
      fact: w(43, 'fact'), tightly: w(43, 'tightly'), constrained: w(43, 'constrained'), c43end: L(43).end,
      nineteen: w(44, 'nineteen'), thirties: w(44, 'thirties'), frank: w(44, 'frank'), england: w(44, 'england'),
      bruno: w(44, 'bruno'), italy: w(44, 'italy'), indep: w(44, 'independently'), consistent: w(44, 'consistent'),
      forced: w(44, 'forced'), rules: w(44, 'rules'), end: L(44).end,
    };
    this.START = L(39).start; this.FROM = this.START - 2.6;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.believe, kind: 'tick' }, { t: T.coin, kind: 'pop' }, { t: T.state + 0.1, kind: 'tick' }, { t: T.anyone, kind: 'question' },
      { t: T.constrained, kind: 'snap' }, { t: T.frank + 0.15, kind: 'pop' }, { t: T.consistent, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    const push = 1 + 0.03 * smooth(prog(t, T.nineteen, T.end + 1));          // câu 44 dài: camera đẩy chậm
    g.save(); g.translate(W * 0.55, H * 0.55); g.scale(push, push); g.translate(-W * 0.55, -H * 0.55);
    sky(g, t, { fog: 1 });

    // ── đèn người xem: âm ỉ khi thẻ hồi, bật ở "believe", sáng thêm ở "information" và "knowledge" ──
    const lamp = 0.25 + 0.45 * outCubic(prog(t, T.believe - 0.1, T.believe + 0.5)) + 0.15 * prog(t, T.info, T.info + 0.6)
      + 0.15 * prog(t, T.knowledge, T.knowledge + 0.6);
    glow(g, PX, PY - 80, 400, 'rgba(244,184,96,0.16)', lamp);

    // ── ba vật của ACT TWO trong sương (câu 40): vào ở "relationship", chìm dần khi "%" rời từng vật ──
    const kObj = outBack(prog(t, T.rel - 0.6, T.rel + 0.2));
    const leave = [T.coin, T.cloud, T.ballot].map(x => prog(t, x - 0.05, x + 0.75));
    const sink = [T.coin, T.cloud, T.ballot].map(x => smooth(prog(t, x + 0.3, x + 2.4)));
    if (kObj > 0) {
      OBJ.forEach(([x, y], i) => {
        if (sink[i] >= 1) return;
        const yy = y + 40 * sink[i] + (1 - kObj) * 120, s = (1 - 0.35 * sink[i]) * Math.max(0.01, kObj), a = 1 - 0.85 * sink[i];
        glow(g, x, yy, 150, 'rgba(142,162,184,0.16)', a);
        if (i === 0) { g.save(); g.globalAlpha = a; coin(g, x, yy, 46 * s, { spin: 0.5, face: 'H', lit: 0.55 }); g.restore(); }
        if (i === 1) cloud(g, x, yy - 10, 1.05 * s, 0.85 * a);
        if (i === 2) ballot(g, x, yy, 0.95 * s, 0.85 * a);
        // "%" nhỏ treo trên vật — chưa rời thì mờ sương; rời thì bay về đèn người xem
        const u = outCubic(leave[i]);
        if (u < 1) { const sx = x + (PX - x) * u, sy = yy - 130 + (PY - 120 - (yy - 130)) * u + 40 * Math.sin(u * Math.PI);
          text(g, '%', sx, sy, `600 72px ${CG}`, u > 0 ? C.amber : C.fog, 'center'); }
      });
      fogBank(g, 1440, 700, 380, 160, t, { a: 0.5 + 0.9 * sink[2], seed: 5 });              // sương nuốt các vật
    }
    // "you —— the event": đường đứt từ đèn tới các vật
    const kRel = prog(t, T.you - 0.1, T.event + 0.3), relOut = prog(t, T.live, T.ballot + 0.6);
    if (kRel > 0 && relOut < 1) {
      dashes(g, LX + 90, LY - 70, 1090 - 700 * relOut, 690 - 6 * relOut, 'rgba(142,162,184,0.7)', { k: kRel });
      if (t > T.you) label(g, 'you', LX + 110, LY - 110, C.amber);
      if (t > T.event - 0.1 && relOut < 0.5) label(g, 'the event', 1440, 790, C.ivory, 'center');
    }

    // ── "%" lớn trong quầng đèn: lớn dần theo từng "%" bay về (câu 40), rồi co lại nhường mặt đồng hồ (câu 42) ──
    const got = leave.reduce((a, x) => a + (x >= 1 ? 1 : 0), 0) + leave.reduce((a, x) => a + (x > 0 && x < 1 ? x : 0), 0);
    const kDial = outCubic(prog(t, T.first - 0.2, T.loose + 0.2));
    const pct = clamp(got / 3) * (1 - kDial);
    if (pct > 0) { g.save(); g.translate(PX, PY); const s = 0.45 + 0.55 * outBack(clamp(pct)); g.scale(s, s);
      text(g, '%', 0, 0, `600 300px ${CG}`, C.amber, 'center'); g.restore(); }
    if (t > T.state - 0.2 && t < T.first + 0.5)
      typed(g, 'the state of your knowledge', PX, PY + 70, prog(t, T.state - 0.1, T.knowledge + 0.5) - prog(t, T.first - 0.3, T.first + 0.3), `italic 500 46px ${CG}`, C.amber, { align: 'center' });

    // mặt đồng hồ (câu 42–44): kim lắc tự do ("loose") → hai thanh chặn khép lại ("tightly constrained"), kim đứng
    if (kDial > 0) {
      const lock = outCubic(prog(t, T.tightly - 0.1, T.constrained + 0.3));
      const wild = 0.5 + 0.42 * Math.sin(t * 3.1) * Math.cos(t * 1.7 + 0.6) * (1 - lock) * prog(t, T.loose - 0.2, T.loose + 0.4);
      dial(g, PX, PY - 20, 170, wild + (0.62 - wild) * lock, kDial, lock);
    }
    lantern(g, LX, LY, 1.0, t, lamp);

    // ── câu 44: Ramsey (Anh), de Finetti (Ý), mỗi người một quầng đèn; sương ngăn giữa ở "independently" ──
    const kR = prog(t, T.frank - 0.2, T.frank + 0.7), kF = prog(t, T.bruno - 0.2, T.bruno + 0.7);
    const RX = 760, FX = 1260, PYt = 300, PH = 300;
    if (t > T.nineteen - 0.2) typed(g, 'THE 1920s AND 1930s', 1130, 250, prog(t, T.nineteen - 0.1, T.thirties + 0.4), `500 28px ${MONO}`, C.amber, { align: 'center' });
    glow(g, RX + 117, PYt + 150, 340, 'rgba(244,184,96,0.20)', kR);
    glow(g, FX + 122, PYt + 150, 340, 'rgba(244,184,96,0.20)', kF);
    // năm sinh–mất và nước tự vẽ bằng ngà (nhãn mặc định của portrait là sương — chỉ 3.3:1 trên sương)
    const life = (s, x, k) => typed(g, s, x, PYt + PH + 94, k, `500 20px ${MONO}`, C.ivory);
    if (kR > 0) { portrait(g, 'ramsey', 'night', RX, PYt, PH, kR, { label: { name: 'Frank Ramsey' } }); life('1903–1930', RX, kR * 2.8 - 1.2);
      if (t > T.england - 0.1) typed(g, 'ENGLAND', RX, PYt + PH + 130, prog(t, T.england - 0.1, T.england + 0.3), `500 22px ${MONO}`, C.amber); }
    if (kF > 0) { portrait(g, 'definetti', 'night', FX, PYt, PH, kF, { label: { name: 'Bruno de Finetti' } }); life('1906–1985', FX, kF * 2.8 - 1.2);
      if (t > T.italy - 0.1) typed(g, 'ITALY', FX, PYt + PH + 130, prog(t, T.italy - 0.1, T.italy + 0.3), `500 22px ${MONO}`, C.amber); }
    const kInd = smooth(prog(t, T.indep - 0.3, T.indep + 0.9));
    if (kInd > 0) { fogBank(g, 1130, 470, 60, 260, t, { a: 1.3 * kInd, seed: 21, n: 7, drift: 8 });
      label(g, 'independently', 1130, 880 - 30 * kInd, C.fog, 'center', 22); }
    // kết luận: niềm tin nhất quán → luật xác suất
    if (t > T.consistent - 0.2) {
      typed(g, 'consistent beliefs', 760, 960, prog(t, T.consistent - 0.1, T.consistent + 0.7), `italic 600 54px ${CG}`, C.ivory);
      arrow(g, 1150, 945, 1270, 945, prog(t, T.forced - 0.1, T.forced + 0.5), { color: C.amber, w: 4 });
      typed(g, 'the rules of probability', 1300, 960, prog(t, T.rules - 0.4, T.rules + 0.35), `italic 600 54px ${CG}`, C.gold);
    }
    g.restore();

    // ── mascot `shrug` (câu 42–43): trồi lên ở "far", hạ xuống sau "constrained" (≈ 4.6 s) ──
    const kM = prog(t, T.loose - 1.0, T.loose - 0.5) - prog(t, T.c43end + 0.1, T.c43end + 0.5);
    if (kM > 0) figure(g, 'shrug', 1640, H, 740, 'night', kM, { rim: 'left' });

    // ── chữ (toạ độ màn hình) ──
    actTitle(g, 'night', t, this.START, 'ACT THREE', 'Probability as degree of belief');
    card(g, 'night', prog(t, this.START, this.START + 1.4), 'ACT THREE · BELIEF', 'A property of you, not of the coin');
    const k39 = prog(t, T.believe - 0.9, T.believe + 0.4) - prog(t, T.first - 0.5, T.first);
    if (k39 > 0) {
      typed(g, 'how strongly you believe', 640, 330, k39, `italic 600 64px ${CG}`, C.ivory);
      typed(g, 'given the information you have', 640, 396, prog(t, T.given - 0.1, T.info + 0.5) - prog(t, T.first - 0.5, T.first), `italic 500 46px ${CG}`, C.amber);
    }
    const k42 = prog(t, T.anyone - 0.3, T.like + 0.3) - prog(t, T.nineteen - 0.4, T.nineteen);
    if (k42 > 0) {
      typed(g, 'Believe whatever you like?', 640, 330, k42, `italic 600 64px ${CG}`, C.ivory);
      typed(g, 'But tightly constrained.', 640, 400, prog(t, T.tightly - 0.2, T.constrained + 0.4) - prog(t, T.nineteen - 0.4, T.nineteen), `italic 500 46px ${CG}`, C.amber);
    }
  }
}
