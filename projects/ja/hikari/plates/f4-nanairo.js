// f4 · 虹は七色？ (p2 câu 102–104). ERA sky. Dải chuẩn 380–780 (x = 360 + 3·(nm−380)), vạch ranh trung tính: 7 → 6 → 5 → tan hết.
//  102 七色        dải liên tục + 6 vạch đều (7 ô)    103 ニュートン / ドレミファソラシ: 7 nhãn dưới 7 ô
//  104 6色 / 5色   vạch xếp lại, vạch thừa rơi; 境目 → mọi vạch rơi: 「光そのものには、境目がない」
import { C, W, H, WALL_X, clamp, prog, lookup, must, smooth, outCubic, aperture, ground, shaft, spectrumStrip, telop, title, cue } from '../kit.js';

const X0 = 360, SW = 1200, SY = 520, SH = 96, LO = 400, HI = 700, NAMES = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ'];
// vạch ranh đặt ở ranh TÊN MÀU (nm): 7 màu 赤橙黄緑青藍紫; Mỹ 6 (gộp 藍+青), Đức 5 (gộp thêm 橙+黄)
const CUT = [450, 480, 500, 570, 590, 620], EDGE = [LO, ...CUT, HI], XN = nm => X0 + SW * (nm - LO) / (HI - LO);
const DROP6 = 1, DROP5 = 4;                                     // chỉ số vạch rơi khi còn 6 / 5 màu (480; 590)
must(`${CUT.length + 1}`, 7);
const lerp = (a, b, u) => a + (b - a) * u;

export default class F4 {
  static ERA = 'sky';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f4-nanairo');
    this.START = L(102).start;
    this.FROM = Math.max(this.START - 1.2, L(101).end + 0.5);
    this.T = {
      title: this.FROM + 0.3, l102: L(102).start, nana: w(102, '七色'),
      l103: L(103).start, newton: w(103, 'ニュートン'), doremi: w(103, 'ドレミファソラシ'),
      l104: L(104).start, roku: w(104, '6色'), go: w(104, '5色'), sakai: w(104, '境目'),
    };
  }
  sfx() {
    const T = this.T;
    return [cue(T.nana, 'beam', -6), cue(T.newton - 0.3, 'telop'), cue(T.doremi, 'step'), cue(T.doremi + 1.4, 'step', -8),
      cue(T.roku + 0.2, 'step'), cue(T.go + 0.2, 'step'), cue(T.sakai, 'telop')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'sky');
    g.save(); g.fillStyle = '#0E0C09'; g.fillRect(0, 0, WALL_X, H); g.restore();
    aperture(g, 'window', { y: SY + SH / 2, open: prog(t, F + 0.3, F + 1.0) });
    const kS = prog(t, F + 0.5, F + 1.7);
    shaft(g, 92, SY + SH / 2, X0, SY - 6, X0, SY + SH + 6, { a: 0.08, k: kS, t, dust: 30, spot: false, seed: 4 });
    spectrumStrip(g, X0, SY, SW, SH, { k: kS, from: LO, to: HI });

    // vạch ranh (đứng yên tại ranh tên màu; vạch thừa rơi khi gộp màu)
    const dividers = [];
    CUT.forEach((nm, j) => {
      const k = prog(t, T.nana + j * 0.12, T.nana + j * 0.12 + 0.35); if (k <= 0) return;
      let fall = 0;
      if (j === DROP6) fall = prog(t, T.roku, T.roku + 0.8);
      if (j === DROP5) fall = prog(t, T.go, T.go + 0.8);
      if (t > T.sakai) fall = Math.max(fall, prog(t, T.sakai + j * 0.15, T.sakai + j * 0.15 + 0.8));
      if (fall >= 1) return;
      const x = XN(nm), dy = fall * fall * 520; dividers.push(x);
      g.save(); g.globalAlpha = 1 - fall; g.strokeStyle = '#0B0B0E'; g.lineWidth = 6; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, SY - 18 * k + dy); g.lineTo(x, SY + SH * k + 18 * k + dy); g.stroke();
      g.strokeStyle = 'rgba(237,232,223,0.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 4, SY - 18 * k + dy); g.lineTo(x - 4, SY + SH * k + 18 * k + dy); g.stroke(); g.restore();
    });
    if (t > T.nana + 0.9 && t < T.roku) must(`${dividers.length + 1}`, 7);        // 7 ô

    // chữ: hàng y 450
    const slot = (a, o, x, parts, op) => { if (t < a - 0.05) return; const f = o == null ? 0 : prog(t, o, o + 0.45); if (f >= 1) return;     // rút bằng mờ, không trượt qua tường
      g.save(); g.globalAlpha = 1 - f; telop(g, parts, x, 450, prog(t, a, a + 0.8), op); g.restore(); };
    slot(T.nana - 0.1, T.l103 - 0.1, X0, '虹は七色（日本）', { size: 52 });
    slot(T.newton - 0.4, T.l104 - 0.1, X0, '7つに分けたのはニュートン', { size: 52 });
    slot(T.roku - 0.1, null, X0, 'アメリカ：6色', { size: 52 });
    slot(T.go - 0.1, null, 860, 'ドイツ：5色', { size: 52 });
    // ド レ ミ …
    const dn = outCubic(prog(t, T.roku - 0.2, T.roku + 0.4)) * 260;
    if (dn < 259) for (let i = 0; i < 7; i++) {
      const k = prog(t, T.doremi + i * 0.13, T.doremi + i * 0.13 + 0.4); if (k <= 0) continue;
      g.save(); g.translate(0, dn); telop(g, NAMES[i], (XN(EDGE[i]) + XN(EDGE[i + 1])) / 2, 706, k, { size: 40, align: 'center' }); g.restore();
    }
    for (let i = 0; i < 7; i++) {                                                   // 「ド→シ」: ô sáng lần lượt như gảy từng nốt
      const u = (t - (T.doremi + 1.4 + i * 0.3)) / 0.35; if (u < 0 || u > 1 || t > T.roku - 0.2) continue;
      g.fillStyle = `rgba(255,253,248,${0.28 * (1 - u)})`; g.fillRect(XN(EDGE[i]), SY, XN(EDGE[i + 1]) - XN(EDGE[i]), SH);
    }
    telop(g, '光そのものには、境目がない', X0, 830, prog(t, T.sakai, T.sakai + 1.2), { size: 60, mincho: true });
    title(g, '虹は七色？', t, T.title);
  }
}
