// ACT TWO — "Back to the coin under my hand" (p2 câu 32–38). Bố cục giữ đúng a0-open (người xem nhận ra cảnh mở bài):
//   trái dưới  đèn bão của NGƯỜI XEM, "50%" trong quầng đèn hổ phách (DNA §9: không bao giờ trên đồng xu)
//   phải       câu 32–34 coin-cover (úp tay; ánh vàng rỉ dưới tay = kết quả đã cố định, chưa ai thấy)
//              câu 35–36 coin-peek: ĐÈN NHỎ CỦA MASCOT (vàng) chạm đồng xu → "100% or 0%" trong ánh vàng của mascot
//   câu 37     mascot đặt đồng xu xuống sương rồi chìm; đồng xu đứng yên (không đổi), chỉ hai đường thông tin đổi
//   câu 38     đèn người xem sáng thêm, chùm với xa hơn → dẫn sang cách hiểu thứ hai (ACT THREE)
//   giữa trên  câu 32: hàng ô trống đứt nét "no collection" (vọng hàng 10 ngày của c2) chìm vào sương
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, lantern, beam, fogBank, dashes, coin, figure,
  card, typed, text, label, ring, must, lookup } from '../kit.js';

const LX = 250, LY = 900;                                // đèn bão của người xem (như a0)
const COVER = [0.51, 0.485], PEEK = [0.258, 0.337];      // tay úp (coin-cover), đồng xu giữa ngón (coin-peek) — tỉ lệ khung ảnh
const GROUND = [1470, 800];                              // chỗ đồng xu nằm sau khi mascot đặt xuống (câu 37)

export default class Peek {
  static ERA = 'night';
  static POSES = ['coin-cover', 'coin-peek'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      coin: w(32, 'coin'), under: w(32, 'under'), hand: w(32, 'hand'), already: w(32, 'already'), landed: w(32, 'landed'),
      no: w(32, 'no'), collection: w(32, 'collection'), put: w(32, 'put'), in: w(32, 'in'),
      happened: w(33, 'happened'), fixed: w(33, 'fixed'),
      point: w(34, 'point'), feel: w(34, 'feel'), stop: w(34, 'stop'), think: w(34, 'think'), harder: w(34, 'harder'),
      suppose: w(35, 'suppose'), sneak: w(35, 'sneak'), look: w(35, 'look'), coin2: w(35, 'coin'), you: w(35, 'you'),
      me: w(36, 'me'), one: w(36, 'one'), percent: w(36, 'percent'), or: w(36, 'or'), zero: w(36, 'zero'), you2: w(36, 'you'), fifty: w(36, 'fifty'),
      coin3: w(37, 'coin'), did: w(37, 'did'), all: w(37, 'all'), instant: w(37, 'instant'), looked: w(37, 'looked'), only: w(37, 'only'), information: w(37, 'information'), changed: w(37, 'changed'),
      small: w(38, 'small'), leads: w(38, 'leads'), straight: w(38, 'straight'), second: w(38, 'second'), probability: w(38, 'probability'), end: L(38).end,
    };
    this.START = L(32).start; this.FROM = this.START - 1.2;
    this.N = [must('100', 100), must('100 - 100', 0), must('100 / 2', 50)];    // với mascot 100% hoặc 0%; với bạn 50%
  }
  sfx() {
    const T = this.T;
    return [{ t: T.coin, kind: 'pop' }, { t: T.collection, kind: 'tick' }, { t: T.fixed, kind: 'pop' }, { t: T.think, kind: 'question' },
      { t: T.coin2, kind: 'tick' }, { t: T.percent, kind: 'pop' }, { t: T.coin3 + 0.4, kind: 'coin' }, { t: T.changed, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, [P100, P0, P50] = this.N;
    const lamp = (0.3 + 0.7 * outCubic(prog(t, T.coin - 0.2, T.coin + 0.5))) * (1 + 0.25 * smooth(prog(t, T.small, T.straight)));
    const push = 1 + 0.04 * smooth(prog(t, T.point - 0.4, T.suppose));       // câu 34: camera đẩy chậm khi chỉ có lời
    g.save(); g.translate(W * 0.62, H * 0.6); g.scale(push, push); g.translate(-W * 0.62, -H * 0.6);
    sky(g, t, { fog: 1 });

    // ── mascot: coin-cover (câu 32–34) → coin-peek (câu 35–37) ──
    const kCover = Math.min(prog(t, T.under - 0.1, T.under + 0.3), 1 - prog(t, T.feel, T.feel + 0.4));
    const kPeek = Math.min(prog(t, T.suppose - 0.15, T.suppose + 0.25), 1 - prog(t, T.did + 0.1, T.did + 0.5));
    const peekPhase = t >= T.suppose - 0.6;
    const pose = peekPhase ? 'coin-peek' : 'coin-cover', cx = peekPhase ? 1640 : 1660, kF = peekPhase ? kPeek : kCover;
    const A = figure(g, pose, cx, H, 760, 'night', 0);                           // khung khi đứng hẳn (đồng xu bám theo khi đặt xuống)
    const anchor = peekPhase ? PEEK : COVER;
    const restXY = [A.x + A.w * anchor[0], A.y + A.h * anchor[1]];

    // chùm đèn người xem → về phía tay/đồng xu, tắt vào sương (câu 38: với xa hơn)
    const reach = 0.55 + 0.3 * outCubic(prog(t, T.leads, T.second + 0.4));
    beam(g, LX, LY - 40, restXY[0] - 40, restXY[1] + 40, 130, 520, 0.4 * Math.min(1, lamp), { reach });
    fogBank(g, 1180, 720, 300, 240, t, { a: 1.0 + 0.3 * prog(t, T.you, T.you + 0.8) - 0.35 * prog(t, T.leads, T.second + 0.4), seed: 3 });

    // ánh sáng của MASCOT (vàng): câu 35 "sneak a look" → chạm đồng xu
    const mine = outCubic(prog(t, T.sneak, T.look + 0.5));
    const drop = prog(t, T.coin3, T.coin3 + 0.45);                              // câu 37: đặt đồng xu xuống sương
    const F = figure(g, pose, cx, H, 760, 'night', kF, { rim: 'left' });
    const handXY = [F.x + F.w * anchor[0], F.y + F.h * anchor[1]];
    if (!peekPhase && kCover > 0) glow(g, handXY[0], handXY[1], 70, 'rgba(255,216,102,0.5)', 0.6 * prog(t, T.already, T.landed + 0.5) + 0.4 * prog(t, T.happened, T.fixed + 0.3));
    if (peekPhase && t >= T.suppose - 0.15) {
      let x = handXY[0], y = handXY[1];
      if (drop > 0) { const u = smooth(drop); x = restXY[0] + (GROUND[0] - restXY[0]) * u; y = restXY[1] + (GROUND[1] - restXY[1]) * u - 60 * Math.sin(u * Math.PI); }
      glow(g, x, y, 150, 'rgba(255,216,102,0.55)', mine);
      coin(g, x, y, 15, { spin: drop >= 1 ? 1.35 : 1.15, lit: 0.25 + 0.75 * mine });  // mặt đồng xu không quay về người xem
      // câu 37: đồng xu KHÔNG đổi — vòng đứt nét quanh nó, nhãn
      const kU = prog(t, T.did, T.all + 0.3);
      if (kU > 0 && drop >= 1) {
        ring(g, x, y, 46, 30, kU, { color: 'rgba(142,162,184,0.85)', w: 3 });
        typed(g, 'THE COIN · UNCHANGED', x, y + 74, prog(t, T.all, T.instant), `500 22px ${MONO}`, C.ivory, { align: 'center' });
      }
      // hai đường thông tin: vàng (mascot đã thấy) chạm tới; hổ phách (bạn) tắt vào sương — câu 37 "only the information changed"
      const kInfo = prog(t, T.information - 0.2, T.changed + 0.3);
      if (kInfo > 0) dashes(g, x - 20, y - 24, 1300, 494, 'rgba(255,216,102,0.8)', { k: kInfo, w: 3 });
    }

    // ── câu 32: "no collection to put it in" — hàng ô trống đứt nét, chìm vào sương ở "put it in" ──
    const kS = outCubic(prog(t, T.no - 0.1, T.collection + 0.4)), sink = smooth(prog(t, T.put, T.in + 0.7));
    if (kS > 0 && sink < 1) {
      g.save(); g.translate(0, sink * 140);
      g.strokeStyle = C.fog; g.lineWidth = 2.5; g.setLineDash([7, 8]); g.globalAlpha = 0.85 * (1 - sink);
      for (let i = 0; i < 10; i++) { if (i / 10 > kS) break; g.beginPath(); g.roundRect(760 + i * 56, 262, 40, 56, 8); g.stroke(); }
      g.setLineDash([]); g.restore();
      g.save(); g.globalAlpha = 1 - sink; typed(g, 'NO COLLECTION', 760, 244 + sink * 140, prog(t, T.no, T.collection + 0.5), `500 22px ${MONO}`, C.ivory); g.restore();
      fogBank(g, 1040, 330 + 60 * (1 - sink), 380, 90, t, { a: 1.3 * sink, seed: 17, n: 7 });
    }

    // ── nhãn đồng xu dưới tay (câu 32–33): theo mascot cover ra (trôi xuống) ──
    if (!peekPhase && t > T.already - 0.1) {
      const out = prog(t, T.feel, T.feel + 0.4);
      g.save(); g.translate(0, out * 160); g.globalAlpha = 1 - out;
      label(g, 'the coin', 1400, 420, C.fog, 'right', 26);
      typed(g, 'already landed', 1400, 474, prog(t, T.already, T.landed + 0.4), `italic 600 44px ${CG}`, C.ivory, { align: 'right' });
      typed(g, 'the result is fixed', 1400, 526, prog(t, T.fixed - 0.3, T.fixed + 0.4), `italic 600 44px ${CG}`, C.gold, { align: 'right' });
      g.restore();
    }
    // câu 34: dấu hỏi trồi khỏi sương chỗ tay vừa rời; chìm lại khi mascot coin-peek trồi lên
    const kQ = outBack(prog(t, T.stop, T.think + 0.3)), qOut = smooth(prog(t, T.suppose - 0.8, T.suppose - 0.25));
    if (kQ > 0 && qOut < 1) {
      g.save(); g.globalAlpha = clamp(kQ) * (1 - qOut);
      text(g, '?', 1560, 700 - 60 * kQ + 200 * qOut, `600 140px ${CG}`, C.fog, 'center'); g.restore();
    }
    g.restore();

    // ── toạ độ màn hình: đèn + 50% của NGƯỜI XEM ──
    lantern(g, LX, LY, 1.05, t, Math.min(1, lamp));
    if (lamp > 1) glow(g, LX, LY, 600, 'rgba(244,184,96,0.25)', lamp - 1);
    const k50 = outBack(prog(t, T.coin - 0.1, T.coin + 0.4));
    if (k50 > 0) {
      glow(g, 430, 520, 420, 'rgba(244,184,96,0.18)', Math.min(1, lamp));
      const bump = 1 + 0.06 * Math.sin(Math.PI * prog(t, T.you2, T.fifty + 0.4)), s = (0.7 + 0.3 * k50) * bump;
      g.save(); g.globalAlpha = clamp(k50 * 1.5); g.translate(430, 520); g.scale(s, s);
      text(g, P50 + '%', 0, 80, `600 300px ${CG}`, C.amber, 'center'); g.restore();
      typed(g, 'YOUR LAMP · WHAT YOU KNOW', 430, 680, prog(t, T.you - 0.1, T.you + 0.6), `500 24px ${MONO}`, C.amber, { align: 'center' });
      // câu 37: đường thông tin của bạn — từ 50% về phía đồng xu, tắt trong sương
      const kInfo = prog(t, T.information - 0.2, T.changed + 0.3);
      if (kInfo > 0) dashes(g, 650, 560, 1080, 700, 'rgba(244,184,96,0.7)', { k: kInfo, w: 3 });
    }

    // ── "100% or 0%" trong ánh vàng của MASCOT (câu 36), mép phải x 1380, không đè mascot ──
    if (peekPhase && t > T.one - 0.2) {
      glow(g, 1140, 380, 380, 'rgba(255,216,102,0.12)', mine);
      const R = 1380, f1 = `600 120px ${CG}`, f2 = `italic 600 72px ${CG}`;
      g.save(); g.font = f1; const w0 = g.measureText(P0 + '%').width, w100 = g.measureText(P100 + '%').width; g.font = f2; const wor = g.measureText(' or ').width; g.restore();
      const x0 = R - w0 - wor - w100;
      typed(g, P100 + '%', x0, 420, prog(t, T.one - 0.1, T.percent + 0.2), f1, C.gold);
      typed(g, ' or ', x0 + w100, 420, prog(t, T.or - 0.05, T.or + 0.2), f2, C.ivory);
      typed(g, P0 + '%', x0 + w100 + wor, 420, prog(t, T.zero - 0.1, T.zero + 0.3), f1, C.gold);
      typed(g, 'MY LIGHT · WHAT I KNOW', R, 470, prog(t, T.me, T.one), `500 24px ${MONO}`, C.gold, { align: 'right' });
    }

    // ── câu dẫn dưới giữa ──
    // mỗi câu dẫn VIẾT vào rồi XOÁ ngược (gõ lùi) trước khi câu sau viết — không đổi cụt trong một khung
    const cap = (s, a, b, o, c = C.ivory) => typed(g, s, 860, 1000, Math.min(prog(t, a, b), 1 - prog(t, o - 0.4, o)), `italic 600 44px ${CG}`, c, { align: 'center' });
    cap('stop, and think a little harder', T.stop - 0.1, T.harder + 0.3, T.suppose - 0.1);
    cap('only the information changed', T.only - 0.1, T.changed + 0.3, T.leads - 0.05);
    cap('→ a second way of understanding probability', T.leads, T.probability + 0.3, Infinity, C.amber);

    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4), 'ACT TWO · ONE-OFFS', 'Back to the coin under my hand');
  }
}
