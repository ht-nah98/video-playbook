// h1 · まとめ (p2 câu 159–164) — MỞ ACT 7, ERA studio. Ba viên nang đứng thẳng hàng; mỗi viên mở ra HÌNH THU NHỎ của hồi trước (cùng hàm kit, không vẽ mới):
//  ① 159–160  100 viên (55 trắng tay: capsuleGrid như a0) + 90 cột pityBars như c1 (cột 74 dựng đúng chữ 「74回目」)
//  ② 161–162  bản đồ ベルギー + tem 賭博 (như e2) · 日本: bảng 確率表 nhỏ + 「禁止ではなく、表示」 (như e3)
//  ③ 163–164  tượng người 「キャラクター」 + viên đang lắc 「数秒間」 (như c2)
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, actCard, actCue, telop as telop0, write, stamp, capsule, capsuleGrid, pityBars,
  photoTag, photoImages, rr, atLeastOne, tone } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 24, oy = 10, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const PX = [120, 690, 1260], PW = 530, PY = 215, PH = 575, CY = 868;

export default class Summary {
  static ERA = 'studio';
  static IMAGES = photoImages('belgium');
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1');
    this.T = {
      l159: L(159).start, n100: w(159, '100回'), hanbun: w(159, '半分'), nani: w(159, '何'),
      l160: L(160).start, n74: w(160, '74回目'), agari: w(160, '上がり'), n76: w(160, '76回'),
      l161: L(161).start, belgium: w(161, 'ベルギー'), tobaku: w(161, '賭博'),
      l162: L(162).start, nihon: w(162, '日本'), kakuritsu: w(162, '確率'), erabi: w(162, '選びました'),
      l163: L(163).start, chara: w(163, 'キャラクター'), arimasen: w(163, 'ありません'),
      l164: L(164).start, suubyou: w(164, '数秒'), end: L(164).end,
    };
    this.START = L(159).start;
    this.FROM = Math.max(this.START - 2.6, L(158).end + 0.5);
    this.NONE = must(`Math.round((1 - ${atLeastOne(100)}) * 100)`, 55);        // 100 lần trắng tay ≈ 55% (CONTENT 54.78%)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START), c(this.FROM + 0.5, 'pop'), c(T.n100, 'pen'), c(T.hanbun, 'chip'), c(T.nani, 'pen'), c(T.n74, 'tick'), c(T.n74 + 0.6, 'pen'), c(T.n76, 'pen'),
      c(T.belgium, 'card'), c(T.tobaku, 'pen'), c(T.nihon, 'pen'), c(T.kakuritsu, 'pop'), c(T.erabi, 'tick'), c(T.chara, 'pen'), c(T.arimasen, 'tick'), c(T.suubyou, 'gacha'), c(T.suubyou + 1.2, 'tick')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, S = this.START;
    ground(g, t);
    heading(g, 7, 'まとめ', prog(t, S + 0.2, S + 1.0));
    // ba tấm + ba viên nang đứng hàng
    const OPEN = [T.l159, T.l161, T.l163];
    PX.forEach((px, i) => {
      const k = prog(t, F + 0.3 + i * 0.15, F + 0.9 + i * 0.15), cx = px + PW / 2;
      if (k > 0) { g.save(); g.translate(0, (1 - outCubic(k)) * 120);
        shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.94)'; g.fill(rr(px, PY, PW, PH, 34)); }, 28, 10); g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(px + 0.75, PY + 0.75, PW - 1.5, PH - 1.5, 33)); g.restore(); }
      const op = prog(t, OPEN[i] - 0.1, OPEN[i] + 0.6);
      capsule(g, cx, CY, 50, k, { tone: ['pink', 'mint', 'lav'][i], rot: -Math.PI / 2, open: op, ground: false });
    });
    // ── ① ──
    { const px = PX[0], kg = prog(t, T.n100 - 0.1, T.n100 + 0.9);
      write(g, '表どおり ＝ 0.6%', px + PW / 2, PY + 58, prog(t, T.l159, T.l159 + 0.5), { font: `700 32px ${JP}`, color: '@sky', align: 'center' });
      capsuleGrid(g, { x: px + 50, y: PY + 80, w: PW - 100, h: 195 }, 100, 0, kg, { blank: this.NONE, block: false, seed: 3, cols: 20 });
      write(g, `100回で ${this.NONE}%は 何もなし`, px + PW / 2, PY + 318, prog(t, T.hanbun - 0.1, T.nani + 0.5), { font: `700 32px ${JP}`, align: 'center' });
      g.save(); g.fillStyle = C.faint; g.fillRect(px + 40, PY + 340, PW - 80, 2); g.restore();
      const kp = clamp(0.74 + (t - T.n74) * 0.4);
      if (t > T.l160 - 0.2) pityBars(g, { x: px + 20, y: PY + 355, w: PW - 40, h: 190 }, kp, { labels: false, notes: false, ceil: false });
      const kl = prog(t, T.n74 - 0.1, T.n74 + 0.5);
      write(g, '74回目から ↑', px + PW / 2, PY + 530, kl, { font: `700 34px ${JP}`, color: '@coral', align: 'center' });
    }
    // ── ② ──
    { const px = PX[1];
      const kb = prog(t, T.belgium - 0.1, T.belgium + 0.6);
      photoTag(g, 'belgium', px + 45, PY + 50, 440, 170, kb, { rot: -0.02, caption: 'ベルギー', capSize: 32 });
      stamp(g, '賭博', px + 400, PY + 150, prog(t, T.tobaku - 0.05, T.tobaku + 0.4), { size: 46, rot: -0.1 });
      const kn = prog(t, T.nihon - 0.1, T.nihon + 0.6);
      if (kn > 0) { const y0 = PY + 335, e = outCubic(kn);
        shade(g, () => { g.fillStyle = '#FFFCF6'; g.fill(rr(px + 45, y0 + (1 - e) * 60, 440, 150, 24)); }, 14, 5);
        capsule(g, px + 88, y0 + 38 + (1 - e) * 60, 17, kn, { tone: 'sky', ground: false });
        write(g, '確率表', px + 118, y0 + 52 + (1 - e) * 60, kn, { font: `700 34px ${MIN}` });
        write(g, [['★5', `700 34px ${JP}`, '@gold'], ['  0.6%', `700 40px ${JP}`, '@sky']], px + 75, y0 + 118 + (1 - e) * 60, kn, {}); }
      write(g, '日本：禁止ではなく、表示', px + PW / 2, PY + 540, prog(t, T.kakuritsu - 0.2, T.erabi + 0.3), { font: `700 32px ${JP}`, align: 'center' }); }
    // ── ③ ──
    { const px = PX[2], cx = px + PW / 2;
      const kc = prog(t, T.chara - 0.1, T.chara + 0.5);
      if (kc > 0) { const e = outBack(clamp(kc)); g.save(); g.translate(cx - 130, PY + 190); g.scale(e, e);
        g.fillStyle = '#D9D3C8'; g.beginPath(); g.arc(0, -40, 34, 0, TAU); g.fill(); g.beginPath(); g.moveTo(-58, 70); g.quadraticCurveTo(-58, 0, 0, 0); g.quadraticCurveTo(58, 0, 58, 70); g.closePath(); g.fill(); g.restore();
        write(g, 'キャラクター', cx - 130, PY + 300, kc, { font: `700 32px ${JP}`, align: 'center' });
        write(g, 'だけではない', cx - 130, PY + 340, prog(t, T.arimasen - 0.2, T.arimasen + 0.4), { font: `500 30px ${JP}`, color: '@dim', align: 'center' }); }
      const ks = prog(t, T.suubyou - 0.2, T.suubyou + 0.5);
      capsule(g, cx + 130, PY + 190, 70, ks, { tone: 'lav', shake: 1, t, ground: false });
      write(g, '数秒間', cx + 130, PY + 340, prog(t, T.suubyou, T.suubyou + 0.5), { font: `700 52px ${MIN}`, align: 'center' });
      write(g, '結果がわかる前の', cx, PY + 440, prog(t, T.l164 + 0.1, T.suubyou), { font: `700 34px ${JP}`, color: '@dim', align: 'center' }); }
    // telop dưới
    const sl = (parts, a, b, size = 44) => { if (t < a - 0.1 || t > b + 0.6) return; g.save(); g.translate(0, 150 * outCubic(clamp((t - b) / 0.5))); telop(g, parts, 960, 985, prog(t, a, a + 0.55), { size }); g.restore(); };
    sl('表どおりでも、半分以上は手に入らない', T.l159, T.l160 - 0.2);
    sl('本当は、74回目から確率が上がり始める', T.l160, T.l161 - 0.2);
    sl([['ベルギー：'], ['賭博', undefined, '@lac']], T.l161, T.l162 - 0.2);
    sl('日本：禁止ではなく、確率を見せる', T.l162, T.l163 - 0.2);
    sl('売っているのは、キャラクターだけではない', T.l163, T.l164 - 0.2);
    sl([['売っているのは、結果がわかる前の '], ['数秒間', `700 50px ${MIN}`]], T.l164, T.end + 1);
    actCard(g, t, F, S, 7);
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Summary.prototype.sfx; Summary.prototype.sfx = function () { return [..._sfx.call(this), ...[840.7, 855.3, 869.0].map(t => ({ t, kind: 'tick' }))]; };
