// ACT THREE · BELIEF — "Evidence shifts the scales", nửa sau (p2 câu 66–74). NỐI THẲNG e1-sms: cùng cán cân (trụ PX, PY;
// góc = tilt() của e1), cùng điện thoại (trái), cùng đèn người xem + "your belief" trong quầng, cùng chỗ hai câu hỏi dưới đĩa.
// Hình theo lời:
//   66  tin thứ hai trong điện thoại: đang gõ… → đòi OTP (bong bóng ĐỎ = báo động)
//   67  dưới hai đĩa (đúng chỗ e1 đặt 0.90 / 0.85): if scam · makes perfect sense 0.80 — if genuine · almost never 0.001
//   68  0.80 ÷ 0.001 = 800 → "× 800" bay vào đĩa scam (1.06 → ≈ 847) → cán cân lệch hẳn; belief ≈ 90% (≈ 8.6 : 1)
//   69  dạng tỉ lệ: posterior odds = prior odds × likelihood ratio
//   70  gạch dưới 0.80 (hợp giả thuyết), khoanh vàng 0.001 (khó xảy ra nếu sai)
//   71  khoanh lời chào trên điện thoại: 0.90 ÷ 0.85 ≈ 1.06 — tells you almost nothing
//   72  điện thoại chìm; vạch "giữa" ma + ✗ đỏ "start over?" — chỉ dịch, không làm lại
//   73  giả thuyết cực khó: 1 : 1,000,000 → đòn chìm sâu nhất; "× 800" vào đĩa → nảy rồi gần như về chỗ cũ (≈ 1 : 1,250)
//   74  sương phủ lại ("forgotten") — nối sang ACT FOUR
// Số (CONTENT "Ví dụ minh hoạ"): 1 : 99, chào 0.90/0.85, OTP 0.80/0.001 = ×800 → ≈ 8.6 : 1 (≈ 90%); 1 : 1,000,000 × 800.
import { clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, lantern, fogBank, dashes, typed, text,
  ring, strike, cross, fmt, must, card, lookup } from '../kit.js';
import { tilt } from './e1-sms.js';

const LX = 250, LY = 960;                                  // đèn bão người xem (như e1)
const PX = 1260, PY = 420, ARM = 330, STR = 190;           // cán cân (như e1)
const PHONE = { x: 120, y: 250, w: 320, h: 530 };          // điện thoại (như e1)
const GREET = must('0.90 ÷ 0.85', 18 / 17);                // lừa sau lời chào (thật 99) — e1 hiện 1.06
const TH0 = tilt(GREET, 99);
// đĩa cân (chép kiểu e1): số trong đĩa, tên dưới đĩa
function pan(g, x, y, num, color, name, nameK = 1, numFont = `600 60px ${CG}`) {
  const by = y + STR;
  g.save(); g.strokeStyle = 'rgba(142,162,184,0.8)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x - 100, by); g.moveTo(x, y); g.lineTo(x + 100, by); g.stroke();
  const gr = g.createLinearGradient(x - 110, by, x + 110, by + 30); gr.addColorStop(0, '#8A6A30'); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, '#7A5A22');
  g.fillStyle = gr; g.beginPath(); g.moveTo(x - 115, by); g.quadraticCurveTo(x, by + 60, x + 115, by); g.closePath(); g.fill();
  g.restore();
  if (num) text(g, num, x, by - 8, numFont, color, 'center');
  const n = Math.round(name.length * clamp(nameK));                             // giãn chữ 3 px như label() của e1
  if (n) text(g, name.toUpperCase().slice(0, n), x, by + 72, `500 22px ${MONO}`, color, 'center', 3);
}
// lắc tắt dần khi đổi tỉ lệ; kick = cú nảy khi quả cân rơi vào (cho cả khi góc cuối gần như không đổi)
const swing = (t, t0, a0, a1, dur = 1.4, kick = 0) => {
  const u = clamp((t - t0) / dur); if (u <= 0) return a0; if (u >= 1) return a1;
  return a1 + (a0 - a1 - kick) * Math.cos(u * Math.PI * 2.5) * Math.pow(1 - u, 2.2);
};

export default class Otp {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      equal64: w(64, 'equal'), end65: L(65).end, learned: w(65, 'learned'), nothing65: w(65, 'nothing'), readOn: w(66, 'on'), otp: w(66, 'one-time'),
      scam: w(67, 'scam'), perfect: w(67, 'perfect'), bank: w(67, 'bank'), never: w(67, 'never'),
      apart: w(68, 'apart'), weight: w(68, 'weight'), large: w(68, 'large'), swing: w(68, 'swing'),
      heart: w(69, 'heart'), bayes: w(69, "bayes'"),
      fits: w(70, 'fits'), unlikely: w(70, 'unlikely'), wrong: w(70, 'wrong'),
      equally: w(71, 'equally'), false: w(71, 'false'), nothing: w(71, 'nothing'),
      shift: w(72, 'shift'), reset: w(72, 'reset'),
      start: w(73, 'start'), extremely: w(73, 'extremely'), unl73: w(73, 'unlikely'), deep: w(73, 'deep'), single: w(73, 'single'), middle: w(73, 'middle'),
      obvious: w(74, 'obvious'), forgotten: w(74, 'forgotten'), end: L(74).end,
    };
    this.START = L(66).start;
    this.FROM = this.START - 1.2;
    this.CONTINUES = true; this.TRANSITION = null;           // cảnh nối tiếp e1-sms: không trượt camera, không whoosh
    this.N = {
      lr: must('0.80 ÷ 0.001', 800), greet: must('Math.round(100 × 0.90 ÷ 0.85) / 100', 1.06),
      scam2: must('Math.round(0.90 ÷ 0.85 × 800)', 847),                                // đĩa scam sau OTP (thật vẫn 99)
      pct1: must('Math.round(1000 × (0.90 ÷ 0.85) ÷ (0.90 ÷ 0.85 + 99)) / 10', 1.1),
      odds2: must('Math.round(10 × (0.90 ÷ 0.85) × 800 ÷ 99) / 10', 8.6),
      pct2: must('Math.round(100 × (0.90 ÷ 0.85 × 800) ÷ (0.90 ÷ 0.85 × 800 + 99))', 90),
      deep: must('1000000', 1000000), deep2: must('1000000 ÷ 800', 1250),
      pct4: must('Math.round(10000 × 800 ÷ (800 + 1000000)) / 100', 0.08),
    };
    this.TH1 = tilt(GREET * 800, 99); this.TH2 = tilt(1, this.N.deep); this.TH3 = tilt(800, this.N.deep);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.otp, kind: 'error' }, { t: T.never, kind: 'tick' }, { t: T.swing, kind: 'snap' }, { t: T.unlikely, kind: 'pop' },
      { t: T.reset, kind: 'tick' }, { t: T.deep, kind: 'snap' }];
  }
  rot(t) {
    const T = this.T;
    if (t < T.start) return swing(t, T.swing - 0.1, TH0, this.TH1, 1.6);
    if (t < T.single + 0.3) return swing(t, T.deep - 0.25, this.TH1, this.TH2, 1.5);
    return swing(t, T.single + 0.3, this.TH2, this.TH3, 1.3, 0.16);                       // nảy lên rồi chìm lại gần chỗ cũ
  }
  render(g, t) {
    const T = this.T, N = this.N;
    const fogIn = smooth(prog(t, T.obvious, T.forgotten + 0.4));                         // câu 74: sương phủ lại — "bị quên"
    const pushE1 = 1 + 0.025 * smooth(prog(t, T.equal64, T.end65 + 1));                  // ĐÚNG công thức đẩy của e1 (còn chạy ở FROM)
    const push = pushE1 + 0.03 * smooth(prog(t, T.heart - 0.5, T.end));
    g.save(); g.translate(PX, PY + 200); g.scale(push, push); g.translate(-PX, -PY - 200);
    sky(g, t, { fog: 1 + 0.6 * fogIn });
    fogBank(g, 1700, 460, 260, 160, t, { a: 0.9, seed: 31 });
    const deep = t >= T.start;

    // ── vạch "giữa" ma (câu 72 không làm lại từ đầu; câu 73 không kéo về được giữa) ──
    const kMid = clamp(prog(t, T.reset - 0.3, T.reset + 0.4) * (1 - prog(t, T.start - 0.2, T.start + 0.4)) + prog(t, T.middle - 0.6, T.middle + 0.3));
    if (kMid > 0) dashes(g, PX - ARM - 40, PY, PX + ARM + 40, PY, 'rgba(142,162,184,0.7)', { k: kMid, w: 2, on: 8, off: 10 });
    if (t < T.start && t > T.reset - 0.3) {
      cross(g, PX + 200, PY, 24, prog(t, T.reset, T.reset + 0.35) - prog(t, T.extremely - 1, T.extremely - 0.4), { color: C.red });
      typed(g, 'START OVER?', PX + ARM + 56, PY + 8, prog(t, T.reset, T.reset + 0.4) - prog(t, T.extremely - 1, T.extremely - 0.4), `500 22px ${MONO}`, C.fog);
    }

    // ── cán cân (như e1) ──
    const th = this.rot(t), c = Math.cos(th) * ARM, s = Math.sin(th) * ARM, L0 = [PX - c, PY - s], R0 = [PX + c, PY + s];
    glow(g, PX, PY, 260, 'rgba(244,184,96,0.14)');
    glow(g, PX, 300, 200, 'rgba(244,184,96,0.25)', 1 - prog(t, T.readOn, T.readOn + 0.8));        // quầng "weight of the evidence" e1 để lại
    g.fillStyle = '#2A2418'; g.fillRect(PX - 9, PY, 18, 470); g.fillStyle = '#3A3020'; g.beginPath(); g.ellipse(PX, PY + 470, 130, 22, 0, 0, 7); g.fill();
    g.save(); g.strokeStyle = C.brass; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(L0[0], L0[1]); g.lineTo(R0[0], R0[1]); g.stroke(); g.restore();
    g.fillStyle = C.amber; g.beginPath(); g.arc(PX, PY, 14, 0, 7); g.fill();
    const flyIn = prog(t, T.large - 0.1, T.swing - 0.1), fly2 = prog(t, T.single - 0.3, T.single + 0.3);
    const relabel = prog(t, T.start, T.start + 0.6);
    const nL = deep ? (t < T.extremely ? '' : fly2 >= 1 ? fmt(N.lr) : '1') : flyIn >= 1 ? `≈ ${N.scam2}` : N.greet.toFixed(2);
    const nR = deep ? (t < T.extremely ? '' : fmt(N.deep)) : '99';
    const small = `600 44px ${CG}`;
    pan(g, L0[0], L0[1], nL, C.amber, deep ? 'true' : 'scam', deep ? relabel : 1, deep ? small : undefined);
    pan(g, R0[0], R0[1], nR, C.ivory, deep ? 'false' : 'genuine', deep ? relabel : 1, deep ? small : undefined);
    // "× 800" bay vào đĩa giả thuyết (kiểu "× 1.06" của e1, nhưng LỚN — trọng lượng lớn)
    const flyTo = (m, x0, y0) => { if (m <= 0 || m >= 1) return; const e = smooth(m), x = x0 + (L0[0] - x0) * e, y = y0 + (L0[1] + STR - 60 - y0) * e;
      glow(g, x, y - 20, 120, 'rgba(244,184,96,0.45)'); text(g, `× ${fmt(N.lr)}`, x, y, `600 60px ${CG}`, C.amber, 'center'); };
    flyTo(flyIn, PX + 200, 214); flyTo(fly2, PX, 214);
    // câu 73: khoảng còn thiếu tới giữa
    if (t > T.middle - 0.3) {
      const k = prog(t, T.middle - 0.3, T.middle + 0.5), ex = R0[0] + 70;
      g.save(); g.strokeStyle = C.fog; g.lineWidth = 3; g.beginPath(); g.moveTo(ex, PY); g.lineTo(ex, PY + (R0[1] - PY) * k); g.stroke(); g.restore();
      typed(g, 'not back to the middle', ex - 8, PY - 44, prog(t, T.middle, T.middle + 0.8), `italic 500 46px ${CG}`, C.fog, { align: 'right' });
    }

    // ── câu 67: hai câu hỏi dưới hai đĩa (đúng chỗ e1); câu 70 gạch / khoanh; câu 72 trôi xuống sương ──
    const qOut = outCubic(prog(t, T.shift - 0.3, T.shift + 0.7)), qy = 260 * qOut;
    if (qOut < 1) {
      const xl = PX - Math.cos(TH0) * ARM, xr = PX + Math.cos(TH0) * ARM;
      const q = (x, head, sTxt, v, a, b, color) => { if (t < a - 0.2) return;
        typed(g, head.toUpperCase(), x, 880 + qy, prog(t, a - 0.2, a + 0.2), `500 20px ${MONO}`, color, { align: 'center' });   // như e1: in hoa, không giãn
        typed(g, sTxt, x, 934 + qy, prog(t, a, a + 0.6), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
        typed(g, v, x, 996 + qy, prog(t, b, b + 0.3), `600 60px ${CG}`, color, { align: 'center' }); };
      // khung cuối của e1 (0.90 / 0.85 dưới đĩa) còn lại, gõ ngược ngay trước câu hỏi OTP
      const old = 1 - prog(t, T.scam - 0.7, T.scam - 0.25);
      if (old > 0) for (const [x, head, sTxt, v, color] of [[xl, 'if scam', 'Quite likely', '0.90', C.amber], [xr, 'if genuine', 'Also quite likely', '0.85', C.ivory]]) {
        typed(g, head.toUpperCase(), x, 880, old, `500 20px ${MONO}`, color, { align: 'center' });
        typed(g, sTxt, x, 934, old, `italic 500 46px ${CG}`, C.ivory, { align: 'center' }); typed(g, v, x, 996, old, `600 60px ${CG}`, color, { align: 'center' }); }
      q(xl, 'if scam', 'Makes perfect sense', '0.80', T.scam, T.perfect, C.amber);
      q(xr, 'if genuine', 'Almost never', '0.001', T.bank, T.never, C.ivory);
      strike(g, xl - 60, 1012 + qy, xl + 60, 1012 + qy, prog(t, T.fits, T.fits + 0.4), { color: C.fog, w: 4 });
      ring(g, xr, 976 + qy, 100, 40, prog(t, T.unlikely, T.unlikely + 0.5), { color: C.gold });
      typed(g, 'RARE IF NOT A SCAM', xr, 836 + qy, prog(t, T.unlikely + 0.3, T.unlikely + 1.1), `500 20px ${MONO}`, C.gold, { align: 'center' });
    }

    // ── đèn người xem + niềm tin trong quầng (như e1) ──
    const lamp = 1 - 0.4 * fogIn;
    glow(g, LX + 230, LY - 20, 300, 'rgba(244,184,96,0.14)', lamp);
    lantern(g, LX, LY, 0.7, t, lamp);
    g.restore();

    // ── niềm tin trong quầng (toạ độ MÀN HÌNH): bắt đầu đúng chỗ e1 để lại (e1 vẽ ở 360,1004 dưới camera đẩy của e1), trượt lên
    //    baseline 975 khi đọc tiếp — chữ không trôi xuống mép dưới theo camera đẩy ──
    const lift = smooth(prog(t, T.readOn, T.readOn + 0.6));
    // vẽ dưới đúng phép phóng của e1 (pushE1) → khung nối trùng khít; trượt lên 38 px (≈ baseline màn hình 975)
    g.save(); g.translate(PX, PY + 200); g.scale(pushE1, pushE1); g.translate(-PX, -PY - 200);
    const BX = 360, BY = 1004 - 38 * lift;
    const ph = (a, b) => clamp(prog(t, a, a + 0.4) - prog(t, b - 0.3, b));               // viết vào ở a, gõ ngược trước b
    { const sb = deep ? 'YOUR BELIEF · TRUE : FALSE' : 'YOUR BELIEF · SCAM', n = Math.round(sb.length * (deep ? prog(t, T.start, T.start + 0.6) : 1));
      if (n) text(g, sb.slice(0, n), BX, BY - 69, `500 20px ${MONO}`, C.amber, 'left', 3); }                  // giãn 3 px như e1
    const big = `600 60px ${CG}`, side = `italic 500 46px ${CG}`;
    typed(g, `≈ ${N.pct1}%`, BX, BY, ph(-1e9, T.swing + 0.1), big, C.amber);
    const w90 = typedW(g, `≈ ${N.pct2}%`, BX, BY, ph(T.swing + 0.2, T.start + 0.2), big, C.amber);
    typed(g, `(≈ ${N.odds2} : 1)`, BX + w90 + 20, BY, ph(T.swing + 0.5, T.start + 0.2), side, C.ivory);
    typed(g, `1 : ${fmt(N.deep)}`, BX, BY, ph(T.extremely, T.single + 0.35), big, C.amber);
    const w1250 = typedW(g, `≈ 1 : ${fmt(N.deep2)}`, BX, BY, ph(T.single + 0.45, 1e9), big, C.amber);
    typed(g, `(≈ ${N.pct4}%)`, BX + w1250 + 20, BY, ph(T.single + 0.8, 1e9), side, C.ivory);
    g.restore();
    // ═════ ngoài camera đẩy: điện thoại, chữ trên ═════
    const sink = outCubic(prog(t, T.shift - 0.6, T.shift + 0.6));
    if (sink < 1) { g.save(); g.translate(-700 * sink, 0); phone(g, t, T, 0); g.restore(); }   // trượt ra trái (rơi xuống sẽ đè chữ dưới)
    if (t > T.equally - 0.1 && sink < 1) {                                               // câu 71: lời chào ≈ ×1.06
      const dy = 0, x = PHONE.x + PHONE.w + 40; g.save(); g.translate(-900 * sink, 0);
      ring(g, PHONE.x + PHONE.w / 2 - 20, PHONE.y + 216 + dy, 170, 64, prog(t, T.equally, T.equally + 0.6), { color: C.gold });
      typed(g, `0.90 ÷ 0.85 ≈ ${N.greet}`, x, PHONE.y + 200 + dy, prog(t, T.equally + 0.4, T.false), `500 22px ${MONO}`, C.fog);
      typed(g, 'tells you almost nothing', x, PHONE.y + 254 + dy, prog(t, T.nothing - 0.4, T.nothing + 0.6), side, C.ivory); g.restore();
    }
    // khung cuối của e1: "You have learned nothing." + "barely moves" — gõ ngược khi đọc tiếp ("read on")
    const kOld = Math.min(prog(t, T.learned - 0.5, T.nothing65 + 0.4), 1 - prog(t, T.readOn, T.readOn + 0.6));   // e1 còn đang gõ ở FROM
    if (kOld > 0) { g.save(); g.translate(PX, PY + 200); g.scale(pushE1, pushE1); g.translate(-PX, -PY - 200);
      typed(g, 'barely moves', PX + 50, PY - 20, 1 - prog(t, T.readOn, T.readOn + 0.6), `italic 500 46px ${CG}`, C.fog); g.restore();
      typed(g, 'You have learned nothing.', PX, 250, kOld, `italic 600 64px ${CG}`, C.ivory, { align: 'center' }); }
    // hàng trên: trọng lượng bằng chứng (câu 68) → dạng tỉ lệ (câu 69) → giả thuyết cực khó (câu 73)
    const top1 = prog(t, T.heart - 0.4, T.heart);
    if (t > T.apart - 0.2 && top1 < 1) {
      g.save(); g.translate(0, -90 * smooth(top1));
      typed(g, 'WEIGHT OF THE EVIDENCE', PX, 140, prog(t, T.apart - 0.2, T.apart + 0.3) - top1, `500 22px ${MONO}`, C.amber, { align: 'center' });
      typed(g, `0.80 ÷ 0.001 = ${fmt(N.lr)}`, PX, 214, prog(t, T.apart, T.weight + 0.3) - top1, `600 60px ${CG}`, C.ivory, { align: 'center' });
      g.restore();
    }
    const top2 = prog(t, T.start - 0.6, T.start);
    if (t > T.heart - 0.1 && top2 < 1) {
      typed(g, 'THE HEART OF BAYES', PX, 140, prog(t, T.heart, T.bayes) - top2, `500 22px ${MONO}`, C.amber, { align: 'center' });
      typed(g, 'posterior odds = prior odds × likelihood ratio', PX, 214, prog(t, T.heart + 0.2, T.bayes + 0.9) - top2, `italic 600 54px ${CG}`, C.ivory, { align: 'center' });
    }
    typed(g, 'an extremely unlikely hypothesis', PX, 214, prog(t, T.extremely, T.unl73 + 0.5) - prog(t, T.obvious + 1.5, T.forgotten), `italic 600 54px ${CG}`, C.ivory, { align: 'center' });

    card(g, 'night', 1, 'ACT THREE · BELIEF', 'Evidence shifts the scales');
  }
}

function typedW(g, s, x, y, k, font, color) {
  typed(g, s, x, y, k, font, color);
  g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w;
}
// điện thoại (chép kiểu e1): lời chào của e1 + tin thứ hai — đang gõ… → đòi OTP (bong bóng đỏ, dấu "!")
function phone(g, t, T, dy) {
  const { x, y, w, h } = PHONE, ink = '#151B26';
  g.save(); g.translate(x, y + dy);
  glow(g, w / 2, h / 2, 380, 'rgba(160,190,230,0.10)');
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.roundRect(12, 16, w, h, 40); g.fill();
  g.fillStyle = '#151B26'; g.beginPath(); g.roundRect(0, 0, w, h, 40); g.fill();
  g.strokeStyle = '#3A4558'; g.lineWidth = 3; g.stroke();
  g.fillStyle = '#E4E8EF'; g.beginPath(); g.roundRect(14, 14, w - 28, h - 28, 30); g.fill();
  g.fillStyle = '#151B26'; g.beginPath(); g.roundRect(w / 2 - 50, 22, 100, 22, 11); g.fill();
  g.fillStyle = '#2B3442'; g.font = `500 20px ${MONO}`; g.letterSpacing = '2px'; g.textAlign = 'center'; g.fillText('“YOUR BANK”', w / 2, 92);
  g.fillStyle = '#3E4A5C'; g.font = `500 20px ${MONO}`; g.fillText('TEXT MESSAGE', w / 2, 122); g.textAlign = 'left'; g.letterSpacing = '0px';
  g.fillStyle = '#C9D1DC'; g.beginPath(); g.roundRect(30, 150, w - 74, 200, 22); g.fill();
  g.fillStyle = ink; g.font = `500 24px ${MONO}`; g.fillText('Dear valued', 52, 200); g.fillText('customer, …', 52, 236);
  g.fillStyle = '#9AA5B4'; [270, 302].forEach((yy, i) => g.fillRect(52, yy - 12, (i ? 140 : 200), 12));
  const b2 = 372, kOtp = outBack(prog(t, T.otp - 0.15, T.otp + 0.25));
  if (t > T.readOn + 0.2 && kOtp <= 0) {                                                  // "đang gõ…"
    g.fillStyle = '#C9D1DC'; g.beginPath(); g.roundRect(30, b2, 110, 50, 22); g.fill();
    for (let i = 0; i < 3; i++) { g.fillStyle = '#5C6B80'; g.globalAlpha = 0.4 + 0.6 * clamp(Math.sin(t * 6 - i * 0.9)); g.beginPath(); g.arc(60 + i * 25, b2 + 25, 6, 0, 7); g.fill(); }
    g.globalAlpha = 1;
  }
  if (kOtp > 0) {
    g.save(); g.translate(30, b2 + 70); g.scale(kOtp, kOtp); g.translate(0, -70);
    g.fillStyle = C.red; g.beginPath(); g.roundRect(0, 0, w - 74, 128, 22); g.fill();
    g.fillStyle = ink; g.font = `500 24px ${MONO}`;
    if (kOtp >= 0.9) { g.fillText('Reply with your', 20, 40); g.fillText('one-time', 20, 76); g.fillText('password.', 20, 112); }
    g.restore();
    if (kOtp >= 0.9) { g.fillStyle = C.red; g.beginPath(); g.arc(w - 44, b2 + 4, 22, 0, 7); g.fill();
      g.fillStyle = ink; g.font = `500 28px ${MONO}`; g.textAlign = 'center'; g.fillText('!', w - 44, b2 + 14); g.textAlign = 'left'; }
  }
  g.restore();
}
