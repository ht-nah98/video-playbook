// e2 · ベルギーの結論 (p2, câu 98–103) — ERA 'casino'. Ảnh thật trong thẻ acrylic (bản đồ ベルギー + bìa báo cáo), tem 賭博 (son — đúng nghĩa luật cấm).
//  ① câu 98   bản đồ ベルギー + báo cáo (2018年4月); 「お金で買う / ランダムな箱」; tem 賭博 đóng lên báo cáo
//  ② câu 99   chữ FIFA / オーバーウォッチ — 「世界的なゲーム」
//  ③ câu 100  ảnh rơi xuống; 「違反すれば、最大」 80万ユーロ (số lớn)
//  ④ câu 101  tem xám 「当たっても、お金にならないか？」 bị bóc ở 「ではありません」 (câu hỏi KHÔNG được đặt ra)
//  ⑤ câu 102–103 [お金を払う] ＋ [運で中身が決まる] ＝ 賭博
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, telop, write, wrong, stamp, capsule, photoTag, photoImages, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
function headingDark(g, title, k) {
  if (k <= 0) return;
  capsule(g, 122, 130, 24, clamp(k * 2), { tone: 'pink', ground: false });
  write(g, title, 162, 150, clamp(k * 1.6 - 0.3), { font: `700 60px ${MIN}`, ls: 2, on: 'dark' });
}

export default class Belgium {
  static ERA = 'casino';
  static IMAGES = photoImages('belgium', 'beReport');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.START = L(98).start;
    this.FROM = Math.max(this.START - 1.2, L(97).end + 0.5);
    this.T = {
      l98: L(98).start, belg: w(98, 'ベルギー'), tobaku: w(98, '賭博'), iinkai: w(98, '委員'), y2018: w(98, '2018年'), kau: w(98, '買う'), random: w(98, 'ランダム'), tobaku2: w(98, '賭博', 2), ketsuron: w(98, '結論'),
      l99: L(99).start, fifa: w(99, 'fifa'), over: w(99, 'オーバー'), sekai: w(99, '世界的'),
      l100: L(100).start, saidai: w(100, '最大'), n80: w(100, '80万'), batsu: w(100, '罰金'),
      l101: L(101).start, ataru: w(101, '当たって'), narani: w(101, 'ならない'), arimasen: w(101, 'ありませんでした'),
      l102: L(102).start, okane: w(102, 'お金'), un: w(102, '運'), kimaru: w(102, '決まる'),
      l103: L(103).start, tobaku3: w(103, '賭博'), handan: w(103, '判断'), end: L(103).end,
    };
    this.N80 = must('80 * 10000', 800000) / 10000;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.over - 1.0, 'tick'), c(T.ataru + 2.0, 'tick'), c(T.iinkai - 0.2, 'card'), c(T.y2018, 'pen'), c(T.kau, 'pen'), c(T.tobaku2, 'hanko'), c(T.sekai - 1.0, 'pen'), c(T.sekai + 0.3, 'pen'),
      c(T.n80, 'pen'), c(T.batsu + 0.4, 'soroban'), c(T.l101 + 0.5, 'pen'), c(T.arimasen, 'tear'), c(T.okane, 'pen'), c(T.un, 'pen'), c(T.tobaku3, 'hanko')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t, { era: 'casino' });
    headingDark(g, 'ベルギーの結論', prog(t, F + 0.3, F + 1.3));
    // P1–P2: ảnh + cột phải
    const dP = out(t, T.l100 - 0.3, 0.6);
    if (dP < 1) {
      g.save(); g.translate(0, 1150 * dP);
      photoTag(g, 'belgium', 130, 320, 600, 420, prog(t, F + 0.3, F + 1.0), { zoom: 1 + 0.07 * prog(t, F + 0.3, T.l100), rot: -0.03 });
      photoTag(g, 'beReport', 800, 300, 640, 520, prog(t, T.iinkai - 0.3, T.iinkai + 0.5), { zoom: 1 + 0.05 * prog(t, T.iinkai, T.l100), focus: [0.5, 0], rot: 0.025, credit: '出典：ベルギー賭博委員会（2018年）' });
      stamp(g, '賭博', 1120, 600, prog(t, T.tobaku2 - 0.05, T.tobaku2 + 0.45), { size: 96, rot: -0.1 });
      const dC = out(t, T.l99 - 0.3, 0.5);                                // cột phải câu 98 rơi, câu 99 vào
      g.save(); g.translate(0, 1150 * dC);
      telop(g, '2018年4月', 1640, 340, prog(t, T.y2018 - 0.1, T.y2018 + 0.6), { size: 38 });
      telop(g, 'お金で買う', 1640, 480, prog(t, T.kau - 0.1, T.kau + 0.5), { size: 40 });
      telop(g, 'ランダムな箱', 1640, 580, prog(t, T.random - 0.1, T.random + 0.6), { size: 40 });
      g.restore();
      if (t > T.l99 - 0.3) {
        telop(g, 'FIFA', 1640, 340, prog(t, T.fifa - 0.1, T.fifa + 0.5), { size: 44 });
        telop(g, 'オーバーウォッチ', 1630, 460, prog(t, T.over - 0.1, T.over + 0.7), { size: 36 });
        telop(g, '世界的なゲーム', 1640, 600, prog(t, T.sekai - 0.1, T.sekai + 0.6), { size: 40 });
      }
      g.restore();
    }
    // P3: 80万ユーロ
    const dQ = out(t, T.l101 + 1.3, 0.6);
    if (t > T.l100 - 0.2 && dQ < 1) {
      g.save(); g.translate(0, 1150 * dQ);
      telop(g, '違反すれば、最大', 960, 330, prog(t, T.l100, T.saidai + 0.7), { size: 54 });
      write(g, [[String(this.N80), `700 260px ${MIN}`], ['万ユーロ', `700 100px ${MIN}`]], 960, 640, prog(t, T.n80 - 0.1, T.n80 + 0.6), { align: 'center', on: 'dark' });
      telop(g, 'の罰金', 960, 780, prog(t, T.batsu - 0.1, T.batsu + 0.6), { size: 54 });
      g.restore();
    }
    // P4: câu hỏi KHÔNG được đặt ra
    const dR = out(t, T.okane - 0.1, 0.6);
    if (t > T.l101 - 0.2 && dR < 1) {
      g.save(); g.translate(0, 1150 * dR);
      telop(g, 'ベルギーで問われたのは、', 960, 215, prog(t, T.l101 + 0.4, T.l101 + 0.9), { size: 50 });
      wrong(g, '当たっても、お金にならないか？', 960, 520, prog(t, T.ataru - 0.1, T.narani + 0.5), { size: 56, peel: prog(t, T.arimasen - 0.2, T.arimasen + 0.9) });
      telop(g, 'そこではなかった', 960, 740, prog(t, T.arimasen, T.arimasen + 0.8), { size: 54 });
      g.restore();
    }
    // P5: 払う ＋ 運 ＝ 賭博
    if (t > T.okane - 0.2) {
      telop(g, 'お金を払う', 420, 540, prog(t, T.okane - 0.1, T.okane + 0.6), { size: 52 });
      write(g, '＋', 745, 560, prog(t, T.un - 0.3, T.un), { font: `700 80px ${MIN}`, align: 'center', on: 'dark' });
      telop(g, '運で中身が決まる', 1080, 540, prog(t, T.un - 0.1, T.kimaru + 0.4), { size: 52 });
      write(g, '＝', 1440, 560, prog(t, T.tobaku3 - 1.1, T.tobaku3 - 0.8), { font: `700 80px ${MIN}`, align: 'center', on: 'dark' });
      const k = prog(t, T.tobaku3 - 0.7, T.tobaku3 - 0.1);
      write(g, '賭博', 1640, 590, k, { font: `700 140px ${MIN}`, color: '@lac', align: 'center', on: 'dark' });
      telop(g, 'それだけで、賭博と判断', 960, 800, prog(t, T.handan - 0.1, T.handan + 0.8), { size: 50 });
    }
  }
}
