// d3 · 残り23時間 (p2, câu 68–72). DNA カプセル: máy ガシャポン có MẶT ĐỒNG HỒ thay bảng giá (kit machine { clock }), camera đẩy vào mặt đồng hồ.
//  ① câu 68   máy trồi lên; 「ステップ1 きっかけ」; push vào mặt đồng hồ ở 「近く」
//  ② câu 69   「残り 23 時間」 (cung bạc hà = 23/24)
//  ③ câu 70   số đếm 23 → 0, kim quay nhanh; hết giờ: 「イベント終了」
//  ④ câu 71   dải sự kiện: thanh sự kiện cũ kết thúc → 「数週間後」 (tua) → thanh sự kiện mới mọc, đồng hồ đầy lại
//  ⑤ câu 72   dải rơi xuống; 時間 (nhỏ) → 「見逃したくない」という気持ち
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, outCubic, outBack, smooth, ground, push, capsule, machine, telop, write, card, heading, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const MX = 700, FOOT = 960, MH = 720, CLK = [557, 688];                // máy + vị trí mặt đồng hồ (kit machine: px = x − bw·0.32, py = by + bh·0.3)
const shade = (g, fn, blur = 26, oy = 10) => { g.save(); g.shadowColor = 'rgba(70,50,40,0.18)'; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };

export default class Jikan {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.START = L(68).start;
    this.FROM = Math.max(this.START - 1.2, L(67).end + 0.5);
    this.T = {
      l68: L(68).start, step: w(68, 'ステップ'), chikaku: w(68, '近く'),
      gamen: w(69, '画面'), nokori: w(69, '残り'), n23: w(69, '23時間'),
      l70: L(70).start, hontou: w(70, '本当'), owari: w(70, '終わります'), e70: L(70).end,
      l71: L(71).start, suushuu: w(71, '週間後'), tsugi: w(71, '次'), hajima: w(71, '始まります'), e71: L(71).end,
      l72: L(72).start, tokei: w(72, '時計'), jikan: w(72, '時間'), watashi: w(72, '私'), minoga: w(72, '見逃したく'), kimochi: w(72, '気持ち'), end: L(72).end,
    };
    const T = this.T;
    this.ZERO = T.owari + 0.75;                                          // đếm về 0
    this.DROP = T.l72 - 0.25;                                            // dải sự kiện rơi xuống
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.chikaku + 0.8, 'tick'), c(T.step, 'pen'), c(T.n23, 'pen'), c(T.hontou + 0.1, 'tick'), c(this.ZERO, 'buzzer'), c(T.suushuu, 'pen'), c(T.hajima, 'pop'),
      c(T.jikan, 'pen'), c(T.minoga, 'pen')];
  }
  /** Giờ còn lại trên đồng hồ: 23 → đếm về 0 ở 「終わります」 → đầy lại 23 ở 「始まります」. */
  hours(t) {
    const T = this.T, dn = prog(t, T.hontou, this.ZERO), up = prog(t, T.hajima, T.hajima + 0.9);
    return 23 * (1 - smooth(dn)) + 23 * smooth(up);
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    const hv = this.hours(t), hh = Math.floor(hv + 1e-6), mm = (hv - hh) * 60;
    // máy + camera đẩy vào mặt đồng hồ
    const z = 1 + 0.24 * smooth(prog(t, T.chikaku - 0.2, T.chikaku + 1.0));
    g.save(); push(g, z, CLK[0], CLK[1]);
    machine(g, MX, FOOT, MH, prog(t, F + 0.3, F + 1.1), { clock: { h: hv, m: 0 }, label: null });
    g.restore();
    heading(g, 3, '残り23時間', prog(t, F + 0.3, F + 1.3));
    // cột phải
    const cx = 1420, dr = out(t, this.DROP, 0.6);
    g.save(); g.translate(0, 1100 * dr);
    // câu 68
    telop(g, 'ステップ1　きっかけ', cx, 290, prog(t, T.step - 0.1, T.step + 0.7), { size: 50 });
    // câu 69–70: 「残り 23 時間」 đếm ngược
    const kn = prog(t, T.nokori - 0.1, T.n23 + 0.5);
    const disp = Math.round(hv);
    if (kn > 0) {
      const card0 = card(g, [[['残り', `700 60px ${MIN}`, '@dim'], [String(disp), `700 150px ${MIN}`], ['時間', `700 60px ${MIN}`, '@dim']]], cx - 300, 380, clamp(kn * 1.2), { size: 150, lead: 1.0, w: 600, align: 'left', pad: 50 });
    }
    // 「イベント終了」
    const ke = prog(t, T.owari, T.owari + 0.6);
    if (ke > 0 && t < T.hajima + 0.3) telop(g, 'イベント終了', cx, 700, ke, { size: 56 });
    g.restore();
    // câu 71: dải sự kiện (thanh cũ — tua — thanh mới)
    if (t > T.l71 - 0.2 && dr < 1) {
      g.save(); g.translate(0, 700 * dr);
      const y = 850, xa = 1100, xb = 1370, xc = 1590, xd = 1800;
      shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.7)'; g.fill(rr(xa - 40, y - 100, xd - xa + 80, 200, 28)); }, 22, 8);
      g.strokeStyle = C.line; g.lineWidth = 2; g.beginPath(); g.moveTo(xa - 20, y + 60); g.lineTo(xd + 20, y + 60); g.stroke();
      const ka = out(t, T.l71, 0.6); g.fillStyle = C.paper2; g.strokeStyle = C.mute; g.lineWidth = 3;
      g.fill(rr(xa, y - 30, (xb - xa) * ka, 70, 14)); g.stroke(rr(xa, y - 30, (xb - xa) * ka, 70, 14));
      if (ka > 0.7) write(g, 'イベント', xa + 22, y + 18, 1, { font: `600 30px ${JP}`, color: '@dim' });
      const kg = prog(t, T.suushuu - 0.15, T.suushuu + 0.6);
      if (kg > 0) { g.save(); g.setLineDash([4, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 5; g.beginPath(); g.moveTo(xb + 10, y + 6); g.lineTo(xb + 10 + (xc - xb - 20) * outCubic(kg), y + 6); g.stroke(); g.restore();
        telop(g, '数週間後', (xb + xc) / 2 + 10, y - 66, kg, { size: 34, font: `700 34px ${JP}`, pad: 26 }); }
      const kb = out(t, T.hajima - 0.1, 0.7), kp = prog(t, T.hajima - 0.2, T.hajima + 0.5);
      g.fillStyle = C.white; g.fill(rr(xc, y - 30, (xd - xc) * kb, 70, 14)); g.stroke(rr(xc, y - 30, (xd - xc) * kb, 70, 14));
      if (kb > 0.8) write(g, '次のイベント', xc + 20, y + 18, 1, { font: `600 30px ${JP}`, color: '@ink' });
      capsule(g, xc - 4, y - 70, 30, kp, { tone: 'pink', ground: false, rot: 0.4 + t });
      g.restore();
    }
    // câu 72: 時間 → 見逃したくない気持ち
    if (t > T.tokei - 0.3) {
      telop(g, 'あの時計が測っているのは', cx, 290, prog(t, T.tokei - 0.1, T.tokei + 0.7), { size: 50 });
      g.save();
      const kj = prog(t, T.jikan - 0.1, T.jikan + 0.5);
      write(g, '時間', 1130, 470, kj, { font: `700 84px ${MIN}`, color: '@dim', align: 'left' });
      const ka = prog(t, T.jikan + 0.8, T.minoga - 0.1);
      if (ka > 0) { g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 5; g.beginPath(); g.moveTo(1190, 505); g.lineTo(1190, 505 + 80 * outCubic(ka)); g.stroke(); g.restore(); }
      card(g, [[['見逃したくない', `700 64px ${MIN}`]], [['という気持ち', `700 44px ${MIN}`, '@dim']]], 1090, 610, prog(t, T.minoga - 0.1, T.kimochi + 0.6), { size: 64, lead: 1.25, pad: 36 });
      g.restore();
    }
  }
}
