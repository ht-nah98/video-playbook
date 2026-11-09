// d2 · Prove and discover (p2 câu 108–111).
// Chân dung Poincaré (duotone trong khung bóng đèn) + nhãn "HENRI POINCARÉ · 1908" ở tên ông, chú thích nguồn ở "nineteen oh
// eight"; câu trích lật vào bảng dài bốn hàng đúng nhịp đọc; "still true" → nhãn in "STILL TRUE"; câu 111: chân dung trượt ra
// trái, nhân vật `chalk` vào; "THE GOAL ≠ TRUST / ≠ DISTRUST IT COMPLETELY" viết vào rồi rơi đi, bảng nhỏ lật "WHICH SITUATION?"
// → "WHEN TO TRUST" / "WHEN TO CHECK".
import { W, H, C, FLOOR, clamp, smooth, outCubic, prog, ground, reflect, bulbs, flap, flapW, ctr, portrait, tag, label, card,
  figure, lookup } from '../kit.js';

const QN = 17, QC = 48, QG = 6, QH = 79, QX = 812, QY = 222, QS = 92;   // bảng trích: 4 hàng × 17 ô
const CROP = [308, 566, 1389, 1696];                                    // đầu + vai (px ảnh gốc 2057 × 3005)

export default class Poincare {
  static ERA = 'stage';
  static IMAGES = { poincare: './assets/history/poincare.jpg' };
  static POSES = ['chalk'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      henri: w(108, 'henri'), poincare: w(108, 'poincaré'), line: w(108, 'line'), nineteen: w(108, 'nineteen'),
      it: w(109, 'it'), logic: w(109, 'logic'), that1: w(109, 'that'), prove: w(109, 'prove'), but: w(109, 'but'),
      that2: w(109, 'that', 2), discover: w(109, 'discover'), e109: L(109).end,
      still: w(110, 'still'), true: w(110, 'true'),
      goal: w(111, 'goal'), trust1: w(111, 'trust'), distrust: w(111, 'distrust'), completely2: w(111, 'completely', 2),
      recognize: w(111, 'recognize'), situation: w(111, 'situation'), trust2: w(111, 'trust', 2), check: w(111, 'check'), end: L(111).end,
    };
    this.START = L(108).start;
    this.FROM = this.START - 1.2;
    if (this.FROM < L(107).end + 0.5 - 1e-9) throw new Error('d2: FROM đè câu cuối cảnh trước');
    const T = this.T;
    this.ROWS = [                                              // [bắt đầu, xong, chuỗi] — rơi đúng chữ đang đọc
      [T.it, T.prove - 0.05, 'IT IS BY LOGIC'],
      [T.that1, T.prove + 0.45, 'THAT WE PROVE,'],
      [T.but, T.that2 + 0.1, 'BUT BY INTUITION'],
      [T.that2, T.discover + 0.55, 'THAT WE DISCOVER.'],
    ];
    if (this.ROWS.map(r => r[2]).join(' ') !== 'IT IS BY LOGIC THAT WE PROVE, BUT BY INTUITION THAT WE DISCOVER.') throw new Error('d2: câu trích sai');
    for (const [, , s] of this.ROWS) if (s.length > QN) throw new Error('d2: hàng quá dài ' + s);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.poincare + 0.1, kind: 'chip' }, { t: T.it, kind: 'flap' }, { t: T.still, kind: 'chip' },
      { t: T.recognize - 0.06, kind: 'flap' }, { t: T.trust2, kind: 'flap' },
    ];
  }

  render(g, t) {
    const T = this.T;
    ground(g);
    // chân dung: đèn khung bật ở "henri", ảnh chạy xuống, nhãn dán ở "poincaré"; trượt ra trái ở câu 111
    const out = smooth(prog(t, T.goal - 0.2, T.goal + 0.6)) * -760;
    if (out > -760) {
      g.save(); g.translate(out, 0);
      const k = prog(t, T.henri - 0.35, T.poincare + 0.25);
      const { w: pw } = portrait(g, 'poincare', 170, 190, 470, k, { name: 'HENRI POINCARÉ · 1908', t, crop: CROP });
      label(g, 'science et méthode', 170 + pw / 2, 190 + 470 + 136, C.dim, 'center', 20, prog(t, T.nineteen, T.nineteen + 0.8));
      g.restore();
    }
    // bảng trích dài (treo, có bóng sàn)
    reflect(g, FLOOR, d => {
      const fw = flapW(QN, QC, QG) + 2 * 64, fh = 3 * QS + QH + 2 * 64;
      bulbs(d, QX - 64, QY - 64, fw, fh, t, { lit: t >= T.line });   // "in one line" → khung bảng bật đèn
      this.ROWS.forEach(([a, b, s], i) => flap(d, ctr(s, QN), QX, QY + i * QS, QC, prog(t, a, b), { gap: QG, h: QH }));
    });
    const qmid = QX + flapW(QN, QC, QG) / 2;
    // "I think that's still true"
    tag(g, 'still true', qmid + 300, 690, prog(t, T.still - 0.05, T.still + 0.3), { rot: -0.05, size: 23 });
    // câu 111: mục tiêu — hai cực viết vào, rồi rơi xuống nhường chỗ cho bảng nhỏ
    const drop = Math.pow(prog(t, T.recognize - 0.3, T.recognize + 0.25), 2) * 520;
    if (drop < 520) {
      label(g, 'the goal', qmid, 790 + drop, C.dim, 'center', 22, prog(t, T.goal, T.goal + 0.4));
      label(g, '≠ trust it completely', qmid, 850 + drop, C.ink, 'center', 28, prog(t, T.trust1 - 0.1, T.trust1 + 0.9));
      label(g, '≠ distrust it completely', qmid, 905 + drop, C.ink, 'center', 28, prog(t, T.distrust - 0.1, T.completely2 + 0.4));
    }
    const sc = 40, sg = 5, sn = 16, sw = flapW(sn, sc, sg), sh = Math.round(sc * 1.64), sx = qmid - sw / 2, sy = 790;
    const ks = prog(t, T.recognize - 0.4, T.recognize - 0.05);
    if (ks > 0) {
      g.save(); g.translate(0, (1 - outCubic(ks)) * 400);
      bulbs(g, sx - 40, sy - 40, sw + 80, 2 * sh + 12 + 80, t, { pad: 14, r: 5, step: 28 });
      const r1 = t < T.trust2 ? [ctr('WHICH SITUATION?', sn), ' '.repeat(sn), prog(t, T.recognize, T.situation + 0.5)]
        : [ctr('WHEN TO TRUST', sn), ctr('WHICH SITUATION?', sn), prog(t, T.trust2, T.trust2 + 0.75)];
      flap(g, r1[0], sx, sy, sc, r1[2], { from: r1[1], gap: sg, h: sh });
      flap(g, ctr('WHEN TO CHECK', sn), sx, sy + sh + 12, sc, prog(t, T.check - 0.25, T.check + 0.45), { gap: sg, h: sh });
      g.restore();
    }
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'act three', 'prove and discover');
    // chalk: vào khi chân dung đã ra (câu 111), ở lại tới hết cảnh (~8 s)
    const kc = prog(t, T.completely2 - 1.4, T.completely2 - 1.0);
    if (kc > 0) figure(g, 'chalk', 330, 1080, 720, kc);
  }
}
