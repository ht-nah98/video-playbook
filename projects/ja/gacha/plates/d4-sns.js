// d4 · タイムラインのフィルター (p2, câu 73–79). DNA カプセル. Bảng tin TỰ VẼ (không bài thật / người thật / app thật).
//  ① câu 73   「もう1つの圧力」「ゲームの外、SNS」; khung bảng tin trồi lên (thẻ xám chờ)
//  ② câu 74   thẻ pastel cuộn vào bảng tin, MỖI thẻ một viên vàng (当たりの画面ばかり)
//  ③ câu 75–76 người trúng (viên vàng) → thẻ bay vào bảng tin; người trượt (viên trắng) → bong bóng 「…」 im lặng
//  ④ câu 77–78 khối 1000 viên: 6 vàng / 994 chuyển xám (viên trắng tay)
//  ⑤ câu 79   dải lọc quét ngang: 994 viên xám bị lấy đi, còn 6 viên vàng trong khối trống → 「外れがきれいに取り除かれた世界」
//  Mascot phone (nói) ở mép phải câu 77–79.
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, outBack, smooth, ground, capsule, capsuleGrid, glint, telop, write,
  heading, figure, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 24, oy = 8) => { g.save(); g.shadowColor = 'rgba(70,50,40,0.18)'; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const PASTEL = ['#FFE9F1', '#E7F3FF', '#E6F9EE', '#F1EAFF'];
const FX = 140, FY = 240, FW = 500, FH = 700;                           // khung bảng tin
const CARD_H = 150, GAP = 20, STEP = CARD_H + GAP;

function person(g, x, y, k, gold, tone) {                                // người tự vẽ (không mặt): đầu + vai, viên nang trên đầu
  if (k <= 0) return; const s = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = tone; g.beginPath(); g.arc(0, 0, 26, 0, TAU); g.fill();
  g.beginPath(); g.moveTo(-46, 74); g.quadraticCurveTo(-46, 36, 0, 34); g.quadraticCurveTo(46, 36, 46, 74); g.closePath(); g.fill();
  g.restore();
  capsule(g, x, y - 66 * s, 22, k, { gold, tone: 'blank', ground: false, glow: gold ? 1 : 0, rot: 0.4 });
}

export default class Sns {
  static ERA = 'studio';
  static POSES = ['phone'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd4');
    this.START = L(73).start;
    this.FROM = Math.max(this.START - 1.2, L(72).end + 0.5);
    this.T = {
      l73: L(73).start, ichi: w(73, '1つ'), soto: w(73, '外'), sns: w(73, 'sns'),
      l74: L(74).start, ataru: w(74, '当たり'), toukou74: w(74, '投稿'),
      l75: L(75).start, atatta: w(75, '当たった'), toukou75: w(75, '投稿'), hazureta: w(75, '外れた'), damatte: w(75, '黙って'),
      l76: L(76).start, sore: w(76, 'それ'),
      l77: L(77).start, n1000: w(77, '1000人'), kai: w(77, '1回'), mise: w(77, '見せられる'), n6: w(77, '6人'),
      l78: L(78).start, n994: w(78, '994人'), toukou78: w(78, '投稿'), arimasen: w(78, 'ありません'),
      l79: L(79).start, watashi: w(79, '私'), timeline: w(79, 'タイム'), hazure: w(79, '外れ'), kirei: w(79, 'きれい'), torinoz: w(79, '取り除かれた'), sekai: w(79, '世界'), end: L(79).end,
    };
    const T = this.T;
    this.N6 = must('1000 * 0.006', 6); this.N994 = must('1000 - 6', 994);
    this.DROP = T.l77 - 0.35;                                           // người + chữ câu 75–76 rơi, nhường khối 1000
    this.MASC = [T.l77 - 0.3, T.end + 0.4];
    this.BOX = { x: 800, y: 250, w: 700, h: 620 };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.damatte, 'pop'), c(T.n6 + 3.0, 'pen'), c(T.watashi, 'pen'), c(T.n994 + 2.4, 'tick'), c(T.l73 + 0.3, 'pen'), c(T.sns, 'pen'), c(T.ataru, 'shimmer'), c(T.atatta, 'pen'), c(T.toukou75, 'pop'),
      c(T.n1000, 'pen'), c(T.kai + 0.3, 'chip'), c(T.n6 + 0.1, 'suzu'), c(T.n994, 'pen'), c(T.hazure, 'pen'), c(T.torinoz, 'tick')];
  }
  feed(g, t) {
    const T = this.T, F = this.FROM, kf = prog(t, F + 0.3, F + 1.1), e = outBack(kf);
    if (kf <= 0) return;
    g.save(); g.translate(0, (1 - e) * 500);
    shade(g, () => { g.fillStyle = C.white; g.fill(rr(FX, FY, FW, FH, 36)); }, 34, 14);
    g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(FX, FY, FW, FH, 36));
    write(g, 'タイムライン', FX + 36, FY + 56, 1, { font: `700 34px ${JP}`, color: '@dim' });
    g.fillStyle = C.line; g.fillRect(FX + 24, FY + 78, FW - 48, 2);
    g.save(); g.beginPath(); g.rect(FX + 20, FY + 90, FW - 40, FH - 110); g.clip();
    const live = t >= T.l74 - 0.1, sc = live ? (t - T.l74) * 150 : 0;
    for (let i = -1; i < 7; i++) {
      const idx = i + Math.floor(sc / STEP), y = FY + 100 + i * STEP - (sc % STEP);
      const x = FX + 28, w = FW - 56, gold = t >= T.ataru - 0.1;
      const kc = clamp((t - T.ataru + 0.1) * 3);
      g.fillStyle = gold ? PASTEL[((idx % 4) + 4) % 4] : '#EFEAE2'; g.fill(rr(x, y, w, CARD_H, 24));
      g.fillStyle = gold ? 'rgba(255,255,255,0.85)' : '#E0DAD0'; g.beginPath(); g.arc(x + 48, y + 52, 26, 0, TAU); g.fill();       // avatar trống (không mặt)
      if (gold) {
        write(g, '当たり！', x + 96, y + 60, 1, { font: `700 32px ${JP}` });
        g.fillStyle = 'rgba(92,86,72,0.22)'; g.fill(rr(x + 96, y + 84, 150, 10, 5)); g.fill(rr(x + 96, y + 108, 96, 10, 5));
        capsule(g, x + w - 62, y + CARD_H / 2, 38, kc, { gold: true, ground: false, glow: 0.9, rot: 0.3 + idx * 0.5 });
      } else {
        g.fillStyle = 'rgba(92,86,72,0.16)'; g.fill(rr(x + 96, y + 40, 200, 12, 6)); g.fill(rr(x + 96, y + 70, 130, 12, 6)); g.fill(rr(x + 30, y + 112, w - 60, 12, 6));
      }
    }
    g.restore();
    g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 3, 'タイムラインのフィルター', prog(t, F + 0.3, F + 1.3));
    this.feed(g, t);
    // câu 73
    const d73 = out(t, T.l74 - 0.35, 0.6);
    if (d73 < 1) { g.save(); g.translate(0, 1000 * d73);
      telop(g, 'もう1つの圧力', 1130, 400, prog(t, F + 0.3, F + 1.0), { size: 62 });
      telop(g, 'ゲームの外、SNS', 1130, 560, prog(t, T.soto - 0.5, T.sns + 0.5), { size: 62 });
      g.restore(); }
    // câu 74
    const d74 = out(t, T.l75 - 0.3, 0.6);
    if (t > T.l74 - 0.2 && d74 < 1) { g.save(); g.translate(0, 1000 * d74); telop(g, '当たりの画面ばかり', 1130, 400, prog(t, T.l74 - 0.1, T.ataru + 0.8), { size: 56 }); g.restore(); }
    // câu 75–76: người trúng / người trượt
    const dr = out(t, this.DROP, 0.6);
    if (t > T.l75 - 0.2 && dr < 1) {
      g.save(); g.translate(0, 1000 * dr);
      [[900, 0], [1040, 1], [1180, 2]].forEach(([x, i]) => person(g, x, 470, prog(t, T.atatta - 0.1 + i * 0.12, T.atatta + 0.4 + i * 0.12), true, '#E4DDF4'));
      telop(g, '当たった人 → 投稿', 1090, 340, prog(t, T.atatta - 0.1, T.toukou75 + 0.4), { size: 44 });
      for (let i = 0; i < 3; i++) {                                     // thẻ bài đăng bay về bảng tin
        const f = prog(t, T.toukou75 + i * 0.28, T.toukou75 + 0.9 + i * 0.28); if (f <= 0 || f >= 1) continue;
        const x = 900 + i * 140 - (900 + i * 140 - 700) * outCubic(f), y = 440 - 4 * Math.sin(f * Math.PI) * 20;
        g.save(); g.globalAlpha = 1 - 0.6 * f * f; shade(g, () => { g.fillStyle = PASTEL[i]; g.fill(rr(x - 32, y - 22, 64, 44, 10)); }, 10, 4);
        capsule(g, x, y, 12, 1, { gold: true, ground: false }); g.restore();
      }
      [[870, 0], [1000, 1], [1130, 2], [1260, 3]].forEach(([x, i]) => person(g, x, 740, prog(t, T.hazureta - 0.1 + i * 0.1, T.hazureta + 0.4 + i * 0.1), false, '#E7E2D8'));
      telop(g, '外れた人 → 黙っている', 1090, 610, prog(t, T.hazureta - 0.1, T.damatte + 0.5), { size: 44 });
      const kb = prog(t, T.damatte, T.damatte + 0.5);
      if (kb > 0) [[870, 0], [1130, 2]].forEach(([x]) => { g.save(); g.globalAlpha = kb; shade(g, () => { g.fillStyle = C.white; g.fill(rr(x + 20, 640, 76, 48, 20)); }, 8, 3);
        g.fillStyle = C.mute; [0, 1, 2].forEach(j => { g.beginPath(); g.arc(x + 40 + j * 18, 664, 4.5, 0, TAU); g.fill(); }); g.restore(); });
      telop(g, 'ただ、それだけ', 1090, 900, prog(t, T.l76, T.sore + 0.6), { size: 48 });
      g.restore();
    }
    // câu 77–79: khối 1000 viên
    if (t > T.l77 - 0.3) {
      const box = this.BOX, kg = prog(t, T.n1000 - 0.1, T.kai + 0.9), kb = t >= T.n994 ? this.N994 : null;
      const sw = prog(t, T.hazure, T.torinoz + 1.0), xs = box.x + box.w * smooth(sw);
      g.save();
      if (sw < 1) { g.save(); g.beginPath(); g.rect(xs, box.y - 40, W, box.h + 100); g.clip(); capsuleGrid(g, box, 1000, this.N6, kg, { seed: 1, blank: kb }); g.restore(); }
      if (sw > 0) {                                                       // phần đã lọc: khối trống + 6 viên vàng
        g.save(); g.beginPath(); g.rect(0, box.y - 40, xs, box.h + 100); g.clip(); const G = capsuleGrid(g, box, 1000, this.N6, 0, { seed: 1 });
        for (const i of G.gold) { const [x, y] = G.pos(i), k = prog(t, T.hazure + 0.1, T.hazure + 0.6);
          const hg = g.createRadialGradient(x, y, 8, x, y, 54); hg.addColorStop(0, 'rgba(255,214,110,0.6)'); hg.addColorStop(1, 'rgba(255,214,110,0)'); g.fillStyle = hg; g.fillRect(x - 54, y - 54, 108, 108);
          capsule(g, x, y, 15, 1, { gold: true, ground: false, glow: 1 }); glint(g, x + 11, y - 11, 14, 1); }
        g.restore();
        g.save(); g.globalAlpha = 0.8 * Math.sin(Math.PI * Math.min(1, sw)); g.fillStyle = 'rgba(159,205,242,0.55)'; g.fillRect(xs - 6, box.y - 20, 12, box.h + 40); g.restore();   // dải lọc
      }
      g.restore();
      if (t < T.watashi - 0.3) telop(g, '1000人が、1回ずつ', 1150, 200, prog(t, T.n1000 - 0.2, T.kai + 0.6), { size: 48 });
      else telop(g, '私たちが見ているタイムライン', 1150, 200, prog(t, T.watashi - 0.1, T.timeline + 0.6), { size: 48 });
      if (t < T.n994 - 0.3) telop(g, [['見せられる画面があるのは '], [`${this.N6}人`, undefined, '@gold']], 1150, 930, prog(t, T.mise - 0.2, T.n6 + 0.5), { size: 44 });
      else if (t < T.l79 - 0.3) telop(g, [['残りの '], [`${this.N994}人`, undefined, '@wrong'], ['は、投稿なし']], 1150, 930, prog(t, T.n994 - 0.2, T.toukou78 + 0.6), { size: 44 });
      else telop(g, '外れが、きれいに取り除かれた', 1150, 930, prog(t, T.hazure - 0.1, T.kirei + 0.8), { size: 44 });
    }
    const [m0, m1] = this.MASC;
    if (t > m0) figure(g, 'phone', 1690, H, 450, prog(t, m0, m0 + 0.6), { t });
  }
}
