// h4 — "The distance between you and the coin" (p2 câu 128–132, hết video). Vọng lại khung mở bài (a0-open):
//   trái dưới   đèn bão của NGƯỜI XEM; "50%" được VIẾT vào quầng đèn ở "writing down" (câu 129)
//   phải        đồng xu trong sương (câu 128) → mascot coin-cover trồi lên úp xu (câu 130, ~7.5 s)
//   giữa        chùm đèn với dần về tay, chạm vừa tới ở "coin"; đường đứt + "the distance between you and the coin" (impact)
//   câu 131+    mọi chữ tự xoá (viết ngược), 50% thu về đèn, đường đứt rút lại; biển kênh "99% from scratch" + SUBSCRIBE
//               thắp giữa khung, ĐỨNG YÊN tới hết; mascot peace-back bên phải. ~1 s cuối đêm sẫm lại, đèn lụi.
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, sky, glow, lantern, beam, fogBank, dashes, coin, figure, typed,
  label, strike, card, channelBoard, lookup } from '../kit.js';

const LX = 250, LY = 900, NX = 430, NY = 560;           // đèn + số của người xem (như a0; số hạ 40 px nhường ba dòng chữ)
const FIG = { cx: 1660, h: 760 }, COVER = [0.51, 0.485];
const BX = 840, BY = 470;                                // biển kênh

export default class End {
  static ERA = 'night';
  static POSES = ['coin-cover', 'peace-back'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h4');
    this.T = {
      prob: w(128, 'probability'), tool: w(128, 'tool'), random: w(128, 'random'), world: w(128, 'world'), end128: L(128).end,
      look: w(129, 'look'), closely: w(129, 'closely'), disciplined: w(129, 'disciplined'), writing: w(129, 'writing'), down: w(129, 'down'),
      what: w(129, 'what'), know: w(129, 'know'),
      fifty: w(130, 'fifty'), says: w(130, 'says'), nothing: w(130, 'nothing'), describes: w(130, 'describes'), distance: w(130, 'distance'),
      between: w(130, 'between'), coin: w(130, 'coin', 2), end130: L(130).end,
      thank: w(131, 'thank'), subscribe: w(132, 'subscribe'), end: L(132).end,
    };
    this.OUT = this.T.thank - 0.25;                                          // mọi thứ rút đi, biển kênh thắp
    this.START = L(128).start;
    this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.random, kind: 'question' }, { t: T.writing, kind: 'pop' }, { t: T.distance, kind: 'impact' }, { t: this.OUT + 0.6, kind: 'shimmer' }];
  }
  render(g, t) {
    const T = this.T, O = this.OUT;
    const out = smooth(prog(t, O, O + 0.6));                                  // 0 → 1: dọn khung cho biển kênh
    const fin = prog(t, T.end + 1.0, T.end + 2.0);                            // giây cuối: đêm sẫm, đèn lụi
    sky(g, t, { fog: 1 });

    // ── đồng xu trong sương → rơi vào tay mascot ──
    const F0 = figure(g, 'coin-cover', FIG.cx, H, FIG.h, 'night', 0);
    const hand = [F0.x + F0.w * COVER[0], F0.y + F0.h * COVER[1]];
    const kIn = prog(t, T.fifty - 0.15, T.fifty + 0.3), kOut = prog(t, O - 0.1, O + 0.3);
    const drop = smooth(prog(t, T.fifty - 0.35, T.fifty + 0.15));
    const reach = 0.3 + 0.45 * outCubic(prog(t, T.nothing - 0.3, T.describes)) + 0.25 * outCubic(prog(t, T.between, T.coin + 0.2));
    beam(g, LX, LY - 40, hand[0] - 30, hand[1] - 10, 130, 560, 0.4 * (1 - 0.5 * out) * (1 - fin), { reach: reach * (1 - 0.6 * out) });
    fogBank(g, 1420, 640, 320, 260, t, { a: 1.1 * (1 - 0.25 * reach), seed: 113 });
    if (kIn < 0.7) {
      const cx = 1450 + (hand[0] - 1450) * drop, cy = 560 + (hand[1] - 560) * drop, kc = outBack(prog(t, this.FROM + 0.9, this.FROM + 1.4));
      glow(g, cx, cy, 70, 'rgba(255,216,102,0.25)', kc);
      coin(g, cx, cy, 30 * kc, { spin: t * 3.1, lit: 0.55 });                // thế giới "ngẫu nhiên": xu xoay mãi trong sương
    }
    lantern(g, LX, LY, 1.05, t, 1 - 0.75 * fin);

    // ── 50% được viết vào quầng đèn; ra: thu về đèn ──
    const k50 = prog(t, T.writing - 0.05, T.down + 0.2);
    if (k50 > 0) {
      glow(g, NX, NY, 420, 'rgba(244,184,96,0.18)', 1 - out);
      const s = 1 - 0.9 * out, x = NX + (LX - NX) * out, y = NY + (LY - 60 - NY) * out;
      if (out < 1) { g.save(); g.translate(x, y); g.scale(s, s); typed(g, '50%', 0, 80, k50, `600 300px ${CG}`, C.amber, { align: 'center' }); g.restore(); }
      if (t > T.know - 0.3 && out <= 0) label(g, 'your lamp · what you know', NX, NY + 160, C.amber, 'center');
    }
    // khoảng cách (impact ở "distance"), rút lại khi ra
    const keep = T.end130 + 2.2, kd = prog(t, T.distance - 0.15, T.between + 0.5) * (1 - prog(t, keep, keep + 0.5));   // câu chốt đứng ≥ 2 s sau lời
    dashes(g, 400, 905, F0.x - 30, hand[1] + 30, 'rgba(142,162,184,0.7)', { k: kd });
    typed(g, 'the distance between you and the coin', 900, 975, prog(t, T.between - 0.1, T.coin + 0.1) * (1 - prog(t, keep, keep + 0.5)),
      `italic 600 44px ${CG}`, C.ivory, { align: 'center' });

    // ── mascot: coin-cover (câu 130) → peace-back (cảm ơn) ──
    figure(g, 'coin-cover', FIG.cx, H, FIG.h, 'night', kIn * (1 - kOut), { rim: 'left' });
    figure(g, 'peace-back', 1640, H, 740, 'night', prog(t, O + 0.45, O + 0.85), { rim: 'left' });

    // ── chữ trái trên ──
    const wipe = 1 - prog(t, O, O + 0.5);
    typed(g, 'a tool for how random the world is', 96, 280, prog(t, T.tool - 0.3, T.world + 0.3) * wipe, `italic 500 46px ${CG}`, C.fog);
    if (t > T.look && wipe > 0) strike(g, 90, 266, 90 + 640 * wipe, 266, prog(t, T.look, T.closely + 0.3), { color: C.fog, w: 4 });
    typed(g, 'a disciplined way of writing down', 96, 346, prog(t, T.disciplined - 0.1, T.down + 0.2) * wipe, `italic 600 54px ${CG}`, C.ivory);
    typed(g, "what you don't yet know.", 96, 404, prog(t, T.what - 0.1, T.know + 0.3) * wipe, `italic 600 54px ${CG}`, C.amber);
    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4) * wipe, 'ACT SIX · INFORMATION', 'In the end');

    // ── biển kênh: thắp ở "thank you", đứng yên tới hết ──
    channelBoard(g, BX, BY, outCubic(prog(t, O + 0.4, O + 1.0)));
    if (fin > 0) { g.save(); g.globalAlpha = 0.55 * fin; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  }
}
