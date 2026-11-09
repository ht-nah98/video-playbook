// b09 · Earthquakes (ACT FOUR ★) — DNA blocks. Thẻ hồi "ACT FOUR" → "tiny … enormous" (khối nhỏ xíu ↔ khối khổng lồ, thẻ LOGARITHMIC
// SCALE) → khối ảnh băng địa chấn + tên hai thang → tháp 2 tầng: tầng dưới M6, tầng trên M7 "×32" (một bước = ×32 năng lượng),
// "SHAKING ×10" / "ENERGY ×32" → "A LITTLE STRONGER" bị băng keo xám gạch, sửa ngay dưới. Mascot pointer (trái) nói ở câu 44–46.
import { H, C, AR, prog, lookup, must, outCubic, ground, block, tower, sticker, tag, tape, icon, photoBlock, photoImages,
  figure, secTag, actTitle, QUAKE } from '../kit.js';

const sway = (t, ph = 0) => 0.018 * Math.sin(t * 2.1 + ph);
const nudge = (t, a) => 1 + 0.16 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };

export default class Quakes {
  static ERA = 'table';
  static IMAGES = photoImages('seismogram');
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b09');
    const T = this.T = {
      tiny: w(43, 'tiny'), enormous: w(43, 'enormous'), logs: w(43, 'logarithmic'),
      quakes: w(44, 'earthquakes'), richter: w(44, "richter's"), moment: w(44, 'moment'), log1: w(44, "they're"), logy: w(44, 'logarithmic'),
      step: w(45, 'step'), up: w(45, 'up'), mag: w(45, 'magnitude'), ten: w(45, 'ten'), harder: w(45, 'harder'), thirty: w(45, 'thirty-two'),
      seven: w(46, 'seven'), little: w(46, 'little'), stronger: w(46, 'stronger'), six: w(46, 'six'), thirty2: w(46, 'thirty-two'),
    };
    this.START = L(43).start;
    T.tiny = this.START + 0.15; T.enormous = T.tiny + 0.45;      // vật đầu tiên vào ngay từ đầu câu (không khung trống)
    this.FROM = Math.max(this.START - 2.6, L(42).end + 0.5);       // sau câu cuối của b08
    this.CLEAR = T.quakes - 0.45;                                   // khối tiny/enormous bay đi
    this.TOWER = T.step - 0.2;                                      // tháp 2 tầng rơi
    this.LEAVE = T.step - 0.35;                                     // thẻ tên hai thang bay đi
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.tiny + 0.1, 'wood'), c(T.enormous + 0.15, 'wood'), c(T.quakes + 0.05, 'impact'), c(T.richter + 1.1, 'page'),
      c(T.log1 + 0.15, 'wood'), c(this.TOWER + 0.35, 'wood'), c(this.TOWER + 0.75, 'wood'), c(T.ten, 'card'), c(T.thirty, 'pop'), c(T.little + 0.45, 'tear'), c(T.thirty2 + 0.1, 'pop')];
  }
  render(g, t) {
    const T = this.T, X = 640, S = 170;
    ground(g, 'table');
    // ô chờ trên bàn (không khung trống ngay từ FROM)
    const ks = prog(t, this.FROM + 0.3, this.FROM + 0.7), kd = prog(t, T.tiny, T.tiny + 0.4);
    if (ks > 0 && kd < 1) { g.save(); g.globalAlpha = ks; g.setLineDash([10, 9]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3;
      g.strokeRect(560 - 24, 860 - 6, 48, 10); g.strokeRect(1100 - 120, 860 - 6, 240, 10); g.restore(); }
    // tiny ↔ enormous
    const clear = prog(t, this.CLEAR, this.CLEAR + 0.6);
    block(g, 560, 860, 48, { color: C.birch, k: prog(t, T.tiny, T.tiny + 0.4), lift: clear, d: 8, from: 360 });
    block(g, 1100, 860, 0, { w: 240, h: 420, d: 40, color: C.birch, k: prog(t, T.enormous, T.enormous + 0.5), lift: clear, from: 520 });
    if (clear < 1) {
      const up = outCubic(clear) ** 1.5 * 900;
      tag(g, 'TINY', 560, 740 - up, { size: 38, k: prog(t, T.tiny + 0.05, T.tiny + 0.4), rot: sway(t, 1) });
      tag(g, 'ENORMOUS', 1100, 330 - up, { size: 40, k: prog(t, T.enormous + 0.05, T.enormous + 0.45), rot: sway(t, 2) });
      tag(g, 'LOGARITHMIC SCALE', 830, 200 - up * 0.6, { size: 44, edge: C.log, color: C.logInk, k: prog(t, T.logs, T.logs + 0.4), rot: sway(t, 3), string: [830 - 200, 0 - up] });
    }
    // Earthquakes are one: biểu tượng rung + khối ảnh băng địa chấn + tên hai thang
    const ki = prog(t, T.quakes, T.quakes + 0.45), sh = 7 * Math.sin(t * 47) * Math.exp(-1.6 * Math.max(0, t - T.quakes - 0.3));
    const leave = prog(t, this.LEAVE, this.LEAVE + 0.6), up = outCubic(leave) ** 1.5 * 800;
    if (ki > 0 && leave < 1) icon(g, 'quake', 700 + sh, 520 - up, 70, ki);
    const kp = prog(t, T.moment - 0.3, T.moment + 0.5);
    photoBlock(g, 'seismogram', 1290, 110, 420, 500, { k: kp, label: 'A SEISMOGRAPH DRUM', rot: -0.015, zoom: 1.02 + 0.03 * prog(t, T.moment, T.moment + 6) });
    if (leave < 1) {
      tag(g, "RICHTER'S SCALE", 700, 290 - up, { size: 40, k: prog(t, T.richter, T.richter + 0.4), rot: sway(t, 4), string: [560, -up] });
      tag(g, 'MOMENT MAGNITUDE', 700, 390 - up, { size: 40, k: prog(t, T.moment, T.moment + 0.4), rot: sway(t, 5), string: [520, 330 - up] });
    }
    // log + tháp M6 / M7
    block(g, 400, 860, 120, { color: C.log, label: 'log', k: prog(t, T.log1 - 0.1, T.log1 + 0.35) });
    const k2 = 2 * prog(t, this.TOWER, this.TOWER + 0.9);
    const shake = prog(t, T.ten, T.ten + 1.6) < 1 ? 5 * Math.sin(t * 40) * (prog(t, T.ten, T.ten + 1.6) > 0 ? 1 - prog(t, T.ten, T.ten + 1.6) : 0) : 0;
    tower(g, X + shake, 860, 2, { s: S, k: k2, label: i => i === 1 ? '×32' : null });
    const km6 = prog(t, this.TOWER + 0.35, this.TOWER + 0.65), km7 = prog(t, this.TOWER + 0.75, this.TOWER + 1.05);
    scaled(g, X + S / 2 + 52, 860 - S / 2, nudge(t, T.six), () => sticker(g, 'M6', X + S / 2 + 52, 860 - S / 2, { r: 38, k: km6 }));
    scaled(g, X + S / 2 + 52, 860 - S * 1.5, nudge(t, T.seven), () => sticker(g, 'M7', X + S / 2 + 52, 860 - S * 1.5, { r: 38, k: km7 }));
    // lời: thẻ bên phải tháp (cột x 1080)
    const dy = 0;
    tag(g, 'SHAKING ×10', 1050, 330 + dy, { size: 40, edge: C.base, color: C.baseInk, k: prog(t, T.ten, T.ten + 0.35), rot: sway(t, 6) });
    const kl = prog(t, T.little, T.little + 0.3), kt = prog(t, T.little + 0.3, T.stronger + 0.4);
    if (kl > 0) {
      const tb = tag(g, 'A LITTLE STRONGER', 1050, 470, { size: 36, edge: C.bad, color: C.badInk, k: kl, string: [930, 400] });
      tape(g, tb.x - 12, 492, tb.x + tb.w + 12, 484, kt, { w: 14 });
    }
    const ES = `ENERGY ×${Math.round(QUAKE)}`;
    if (t >= this.TOWER + 1.6) must(`Math.round(${QUAKE})`, 32);
    scaled(g, 1050, 580, nudge(t, T.thirty2), () => tag(g, ES, 1050, 580, { size: 44, edge: C.base, color: C.baseInk, k: prog(t, T.thirty, T.thirty + 0.35), rot: sway(t, 7) }));
    secTag(g, 'Earthquakes', { k: prog(t, this.START, this.START + 0.4), t });
    actTitle(g, t, this.START, 'ACT FOUR', 'Rulers that count powers');
    // mascot: pointer ở câu 44–46
    const a = T.quakes + 0.2, b = T.thirty2 + 2.6, mk = prog(t, a, a + 0.5), out = outCubic(prog(t, b, b + 0.5));
    if (mk > 0 && out < 1) { g.save(); g.translate(0, out * 300); figure(g, 'pointer', 150, H, 262, mk, { t }); g.restore(); }
  }
}
