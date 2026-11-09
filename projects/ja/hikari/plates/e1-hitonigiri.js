// e1 · ほんの一握り (p2 câu 60–61) — mở hồi 4 「見えない光」, ERA darkroom. Trạng thái cuối = sf2 (kit-test.html) trừ hai dòng chữ dưới.
//  câu 60: chùm từ lỗ tới dải 380–780 nm (quét trái → phải), 可視光 · およそ380〜780 nm · 紫から赤まで; mascot pointer (im) chỉ vào dải
//  câu 61: mascot lặn xuống; thước phổ log vươn HAI PHÍA từ khe thấy được, quạt sáng nối khe ↔ dải, 「その外側にも、電磁波は続く」
import { RULER4, VIS, VIS_FRAC, lookup, must, clamp, prog, smooth, outCubic, ground, aperture, ray, spot, spectrumStrip, specRuler, rulerX,
  telop, title, actCard, actCues, actTimes, figure, cue, H } from '../kit.js';

const IX = 560, IW = 800, IY = 330, IH = 60;              // dải 380–780 nở ra phía trên (như sf2)
const RY = 600, RH = 64;                                   // thước (sf2)

export default class Hitonigiri {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1-hitonigiri');
    this.START = L(60).start;
    this.FROM = Math.max(this.START - 2.6, L(59).end + 0.5);   // mở hồi: lead 2.6
    this.T = {
      nami: w(60, '波長'), n380: w(60, '380'), n780: w(60, '780'), mu: w(60, '紫'),
      soto: w(61, '外側'), denji: w(61, '電磁波'), zutto: w(61, 'ずっと'), end: L(61).end,
    };
    must(`'${VIS.join('〜')}'`, '380〜780');
    must(`'${(VIS_FRAC * 100).toFixed(0)}'`, '2');
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.n380 - 0.2, 'beam', -4),             // 「およそ380〜780 nm」
      cue(T.mu - 0.1, 'tick', -2),               // 「紫から赤まで」
      cue(T.soto, 'beam', -3),                // thước vươn hai phía
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START;
    ground(g, 'darkroom');
    aperture(g, 'slit', { y: 360, open: smooth(prog(t, F, F + 0.5)) });
    title(g, 'ほんの一握り', t, actTimes(F, S).o1 - 0.2, { act: 4 });

    // ── chùm từ lỗ tới dải ──
    const kb = outCubic(prog(t, F + 0.3, F + 1.6));
    ray(g, [[92, 360], [IX - 6, 360]], { nm: 'white', w: 5, k: kb, a: 0.9 });

    actCard(g, t, F, S, 4);

    // ── dải 380–780 (quét trái → phải) ──
    const tS = Math.max(T.nami, actTimes(F, S).o1 - 0.3), ks = prog(t, tS, tS + 1.1);
    if (ks > 0) {
      spectrumStrip(g, IX, IY, IW, IH, { k: ks, ticks: [400, 500, 600, 700] });
      telop(g, '可視光', IX, IY - 26, prog(t, tS, tS + 0.6), { size: 40 });
    }
    telop(g, `およそ${VIS[0]}〜${VIS[1]} nm`, IX + IW, IY - 26, prog(t, T.n380, T.n380 + 0.9), { size: 36, align: 'right', color: '@dim' });
    telop(g, '紫から赤まで', 140, 470, prog(t, T.mu, T.mu + 0.7), { size: 44 });

    // ── thước phổ log vươn HAI PHÍA từ khe thấy được ──
    const e = outCubic(prog(t, T.soto - 0.1, T.soto + 1.5));
    if (e > 0) {
      const va = rulerX(VIS[0] * 1e-9, RULER4), vb = rulerX(VIS[1] * 1e-9, RULER4), cx = (va + vb) / 2;
      // quạt sáng khe → dải (như sf2)
      g.save(); g.globalCompositeOperation = 'lighter';
      const gr = g.createLinearGradient(0, RY, 0, IY + IH); gr.addColorStop(0, `rgba(246,242,234,${0.16 * e})`); gr.addColorStop(1, `rgba(246,242,234,${0.04 * e})`);
      g.fillStyle = gr; g.beginPath(); g.moveTo(va, RY - 10); g.lineTo(vb, RY - 10); g.lineTo(IX + IW, IY + IH + 4); g.lineTo(IX, IY + IH + 4); g.closePath(); g.fill(); g.restore();
      if (e < 1) {
        g.save(); const ext = 1040 * e; g.beginPath(); g.rect(cx - ext, 0, 2 * ext, H); g.clip();
        specRuler(g, { y: RY, h: RH, window: 1, dim: 0.15, labels: 0, pows: 0, top: 4 });
        g.restore();
      } else {
        const lp = prog(t, T.soto + 1.5, T.soto + 2.2);
        specRuler(g, { y: RY, h: RH, window: 1, dim: 0.15, labels: lp, pows: lp, top: 4 });
      }
    }
    telop(g, 'その外側にも、電磁波は続く', 960, 850, prog(t, T.denji - 0.2, T.denji + 1.1), { size: 48, align: 'center' });
    telop(g, '目盛り1つで10倍（対数目盛り）', 960, 920, prog(t, T.zutto, T.zutto + 0.8), { size: 32, weight: 500, align: 'center', color: '@dim' });

    // ── mascot pointer (im): vào quanh 780, lặn xuống trước khi thước phủ ngang ──
    const kIn = prog(t, T.n380 - 0.3, T.n380 + 0.5), sink = smooth(prog(t, T.soto - 0.6, T.soto + 0.1));
    if (kIn > 0 && sink < 1) figure(g, 'pointer', 1640, H + sink * 560, 520, sink > 0 ? 1 : kIn, { talk: false, flip: true });
  }
}
