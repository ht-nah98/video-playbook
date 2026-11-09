// Mở bài (p1, câu 0–9) — cảnh MẪU của DNA "Đèn trong đêm" (DNA.md, bàn thử tools/lab/lantern.html).
// Bố cục cố định (không camera trượt; sống nhờ sương trôi, lửa rung, đồng xu bay và camera đẩy rất chậm):
//   phải  x ≥ 1460  mascot: coin-flip (búng) → coin-cover (úp tay) — đồng xu VẼ BẰNG CODE (ảnh gốc đã mất xu khi tách nền)
//   trái dưới       đèn bão của NGƯỜI XEM; "50%" treo trong quầng đèn của người xem, KHÔNG trên đồng xu (DNA §9)
//   giữa            chùm đèn với về tay nhưng tắt vào bức sương; đường đứt "the distance between you and the coin"
//   trái trên       câu hỏi / câu dẫn (vùng chữ x 96–1180, y 64–300)
// Kết: câu treo → đèn bão tắt dần → đêm nuốt khung → đen kín (sang intro, mối nối đen–đen — DNA §6).
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, sky, glow, lantern, beam, fogBank, dashes, coin, figure,
  typed, text, label, cross, arrow, lookup } from '../kit.js';

const LX = 250, LY = 900;                                // đèn bão của người xem
const FIG = { cx: 1660, h: 760 };                        // mascot nửa thân, chân chạm đáy
const COVER = [0.51, 0.485], THUMB = [0.138, 0.228];     // tay úp (coin-cover), đầu ngón cái (coin-flip) — tỉ lệ khung ảnh

export default class Open {
  static ERA = 'night';
  static POSES = ['coin-flip', 'coin-cover'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      flipped: w(0, 'flipped'), caught: w(0, 'caught'), slapped: w(0, 'slapped'), hand: w(0, 'hand'),
      looked: w(1, 'looked'), prob: w(1, 'probability'), heads1: w(1, 'heads'),
      fifty: w(2, 'fifty'), wait: w(2, 'wait'), strange: w(2, 'strange'),
      landed: w(3, 'landed'), still: w(3, 'still'), face: w(3, 'face'), nothing: w(3, 'nothing'),
      hes: w(4, 'hesitating'), heads: w(4, 'heads'), tails: w(4, 'tails'),
      fifty2: w(5, 'fifty'), describing: w(5, 'describing'), only: w(5, 'only'), you: w(5, 'you'),
      mean: w(6, 'mean'), what: L(6).start, harder: w(7, 'harder'), dig: w(7, 'dig'), fasc: w(8, 'fascinating'), skips: w(8, 'skips'),
      answer: L(9).start, first: w(9, 'first'), end: L(9).end,
    };
    this.START = L(0).start; this.FROM = -0.6;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.flipped, kind: 'coin' }, { t: T.slapped + 0.15, kind: 'coin' }, { t: T.prob, kind: 'question' },
      { t: T.fifty, kind: 'shimmer' }, { t: T.heads, kind: 'pop' }, { t: T.tails, kind: 'pop' }, { t: T.describing + 0.2, kind: 'error' },
      { t: T.you, kind: 'snap' }, { t: T.mean, kind: 'question' }, { t: T.first, kind: 'whoosh-long' }];
  }
  render(g, t) {
    const T = this.T;
    const dark = smooth(prog(t, T.first - 0.4, T.end + 0.5));            // câu treo: đèn tắt, đêm nuốt khung
    const lamp = (0.22 + 0.78 * outCubic(prog(t, T.fifty - 0.15, T.fifty + 0.5))) * (1 - dark);   // âm ỉ từ đầu, bùng lên ở "fifty"
    const push = 1 + 0.035 * smooth(prog(t, T.harder - 0.5, T.answer));    // camera đẩy rất chậm khi chỉ có lời (câu 7–8)
    g.save(); g.translate(W * 0.62, H * 0.62); g.scale(push, push); g.translate(-W * 0.62, -H * 0.62);
    sky(g, t, { fog: 1 });

    // ── mascot: búng (câu 0) → úp tay từ "slapped" ──
    const covered = t >= T.slapped;
    const kIn = prog(t, this.FROM + 0.1, this.FROM + 0.5);
    const bump = covered ? 1 - 0.03 * Math.sin(clamp((t - T.slapped) / 0.25) * Math.PI) : 1;   // khựng nhẹ lúc đập tay
    const pose = covered ? 'coin-cover' : 'coin-flip';
    const F = figure(g, pose, FIG.cx, H, FIG.h * bump, 'night', kIn, { rim: 'left' });
    const hand = [F.x + F.w * COVER[0], F.y + F.h * COVER[1]];

    // ── đồng xu bay (code): rời ngón cái lúc "flipped", lên cao, xoay, rơi về tay lúc "slapped" ──
    if (!covered && F) {
      const th = [F.x + F.w * THUMB[0], F.y + F.h * THUMB[1] - 8];
      const u = prog(t, T.flipped - 0.1, T.slapped);
      if (u <= 0) coin(g, th[0] + 6, th[1], 17, { spin: 1.25 });                  // nằm trên ngón cái, nghiêng
      else {
        const x = th[0] + (hand[0] - th[0]) * smooth(u), y = th[1] + (hand[1] - th[1]) * u - 430 * Math.sin(u * Math.PI);
        glow(g, x, y, 60, 'rgba(255,216,102,0.25)');
        coin(g, x, y, 17, { spin: u * 34 });
      }
    }

    // ── chùm đèn người xem → về tay, nhưng tắt vào sương trước khi chạm (câu 3 trở đi với dần) ──
    const reach = 0.25 + 0.6 * outCubic(prog(t, T.landed - 0.2, T.still + 0.6));
    beam(g, LX, LY - 40, hand[0] - 30, hand[1] - 10, 130, 560, 0.42 * lamp, { reach });
    fogBank(g, 1300, 760, 300, 240, t, { a: 1.1 + 0.3 * prog(t, T.landed, T.nothing) });   // bức sương chắn giữa đèn và tay
    lantern(g, LX, LY, 1.05, t, lamp);

    // ── hai khả năng mờ trong sương trên tay: H rồi T (câu 4) — một trong hai là thật, chưa ai biết ──
    const kH = outBack(prog(t, T.heads - 0.1, T.heads + 0.35)), kT = outBack(prog(t, T.tails - 0.1, T.tails + 0.35));
    const gone = prog(t, T.describing - 0.2, T.describing + 0.4);
    const GX = 1250, GY = 730;                                              // trong sương, trái mascot (không đè mặt)
    if (kH > 0 && gone < 1) { g.save(); g.globalAlpha = 0.85 * (1 - gone); coin(g, GX - 80, GY - 20 * kH, 40 * kH, { face: 'H', lit: 0.5 }); g.restore(); }
    if (kT > 0 && gone < 1) { g.save(); g.globalAlpha = 0.85 * (1 - gone); coin(g, GX + 80, GY - 20 * kT, 40 * kT, { face: 'T', lit: 0.5 }); g.restore(); }
    if (kT > 0 && gone < 1) text(g, 'or', GX, GY, `italic 500 40px ${CG}`, C.fog, 'center');

    // nhãn đồng xu (câu 3–5): đặt TRÁI mascot, không đè
    const kFix = outCubic(prog(t, T.face - 0.1, T.face + 0.8)) * (1 - dark);          // "one face pointing up": sự thật vàng rỉ dưới tay
    if (kFix > 0) { glow(g, hand[0] - 6, hand[1] + 18, 70 * kFix, 'rgba(255,216,102,0.55)', kFix); glow(g, hand[0] - 6, hand[1] + 18, 22, 'rgba(255,240,200,0.9)', kFix); }
    if (t > T.nothing - 0.1) label(g, 'fixed · already decided', 1400, 520, C.gold, 'right', 22);
    const kCoin = prog(t, T.landed, T.landed + 0.9);
    if (kCoin > 0) {
      label(g, 'the coin', 1400, 420, C.fog, 'right');
      typed(g, 'already heads, or already tails', 1400, 472, prog(t, T.hes, T.tails + 0.3), `italic 500 40px ${CG}`, C.ivory, { align: 'right' });
    }

    // ── 50% trong quầng đèn của người xem (câu 2) ──
    if (t > T.fifty - 0.2) {
      glow(g, 430, 520, 420, 'rgba(244,184,96,0.18)', lamp);
      const k50 = outBack(prog(t, T.fifty, T.fifty + 0.45)), s = 0.7 + 0.3 * k50;
      const wob = 0.05 * Math.sin(clamp((t - T.wait) / 1.2) * Math.PI * 3) * (1 - prog(t, T.strange + 0.6, T.strange + 1.2)) * (t > T.wait ? 1 : 0);
      g.save(); g.globalAlpha = clamp(k50 * 1.5) * (1 - dark); g.translate(430, 520); g.rotate(wob); g.scale(s, s);
      text(g, '50%', 0, 80, `600 300px ${CG}`, C.amber, 'center'); g.restore();
      if (t > T.you - 0.2) label(g, 'your lamp · what you know', 430, 680, C.amber, 'center');
      const kq = outBack(prog(t, T.strange - 0.1, T.strange + 0.35)) * (1 - prog(t, T.landed - 0.3, T.landed + 0.1));   // "…a little strange?"
      if (kq > 0) text(g, '?', 700 + 0 * kq, 420 - 20 * kq, `italic 600 120px ${CG}`, `rgba(237,230,214,${0.85 * clamp(kq)})`, 'center');
    }
    // "not describing the coin": mũi tên 50% → đồng xu bị gạch đỏ (cái sai — DNA §9)
    const kArr = prog(t, T.fifty2 - 0.1, T.describing);
    if (kArr > 0 && t < T.you + 0.6) {
      arrow(g, 700, 600, 1180, 760, kArr, { color: 'rgba(237,230,214,0.75)', w: 4, bend: -40 });
      cross(g, 945, 660, 34, prog(t, T.describing + 0.1, T.describing + 0.5), { color: C.red });
    }
    // khoảng cách (từ "you")
    dashes(g, 400, 905, F.x - 30, hand[1] + 30, 'rgba(142,162,184,0.6)', { k: prog(t, T.you - 0.1, T.you + 0.8) });
    if (t > T.you + 0.4) { g.fillStyle = C.fog; g.beginPath(); g.arc(F.x - 30, hand[1] + 30, 6, 0, 7); g.fill();
      typed(g, 'the distance between you and the coin', 900, 975, prog(t, T.you + 0.4, T.you + 1.6), `italic 500 44px ${CG}`, C.fog, { align: 'center' }); }
    g.restore();

    // ── chữ trái trên (toạ độ màn hình, không đẩy theo camera) ──
    const q1 = t < T.only - 0.2;                                             // câu hỏi (câu 1–4)
    if (q1) {
      typed(g, 'What is the probability', 96, 150, prog(t, T.looked + 0.4, T.prob + 0.3), `italic 500 64px ${CG}`, C.ivory);
      typed(g, 'that it landed heads?', 96, 226, prog(t, T.prob + 0.2, T.heads1 + 0.4), `italic 600 64px ${CG}`, C.ivory);
    } else if (t < T.what - 0.1) {                                           // câu 5: chỉ người xem là chưa quyết
      typed(g, 'The only thing still undecided', 96, 150, prog(t, T.only - 0.1, T.only + 1.0), `italic 500 64px ${CG}`, C.ivory);
      typed(g, 'is you.', 96, 226, prog(t, T.you - 0.1, T.you + 0.3), `italic 600 64px ${CG}`, C.amber);
    } else {                                                                 // câu 6–9: câu hỏi của cả video
      typed(g, 'So what does', 96, 150, prog(t, T.what, T.what + 0.6), `italic 500 64px ${CG}`, C.ivory);
      typed(g, '50% actually mean?', 96, 226, prog(t, T.what + 0.4, T.mean + 0.3), `italic 600 64px ${CG}`, C.amber);
    }

    // ── đêm nuốt khung (câu treo) → đen kín trước khi hết đuôi 1.0 s ──
    if (dark > 0) { g.save(); g.globalAlpha = dark; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  }
}
