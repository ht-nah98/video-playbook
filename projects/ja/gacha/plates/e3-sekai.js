// e3 · 世界の答えはばらばら (p2, câu 104–113) — ERA 'casino' (rời casino ở f1: f1 đặt WIPE). Mỗi nước một thẻ / ảnh thật.
//  ① câu 104–105  オランダ: bản đồ + báo cáo (Kansspelautoriteit) — 2018年 賭博と判断 → 2022年 最高行政裁判所 → 罰金を取り消し
//  ② câu 106–107  中国 (2017年〜 確率の公開) / イギリス (2022年 自主ルール) — hai thẻ
//  ③ câu 108–110  日本: ảnh ITmedia 2012 (コンプガチャ → 景品表示法違反) + ảnh gamebiz 2016 (CESA 確率の表示)
//  ④ câu 111–112  「禁止」(xám, gạch) ではなく 「表示」 — 確率は隠されていない
//  ⑤ câu 113      điện thoại + 0.6% (khoanh) — 「ルールのおかげで見えている」
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, telop, write, card, strike, capsule, phone, photoTag, photoImages, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
function headingDark(g, title, k) {
  if (k <= 0) return;
  capsule(g, 122, 130, 24, clamp(k * 2), { tone: 'pink', ground: false });
  write(g, title, 162, 150, clamp(k * 1.6 - 0.3), { font: `700 60px ${MIN}`, ls: 2, on: 'dark' });
}

export default class Sekai {
  static ERA = 'casino';
  static IMAGES = photoImages('netherlands', 'nlReport', 'itmedia', 'cesa');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e3');
    this.START = L(104).start;
    this.FROM = Math.max(this.START - 1.2, L(103).end + 0.5);
    this.T = {
      l104: L(104).start, y2018: w(104, '2018年'), nl: w(104, 'オランダ'), tobaku: w(104, '賭博'),
      l105: L(105).start, y2022: w(105, '2022年'), saibansho: w(105, '裁判所'), batsu: w(105, '罰金'), torikeshi: w(105, '取り消しました'),
      l106: L(106).start, china: w(106, '中国'), kakuritsu: w(106, '確率'),
      l107: L(107).start, uk: w(107, 'イギリス'), houritsu: w(107, '法律'), rule: w(107, 'ルール'),
      l108: L(108).start, nihon: w(108, '日本'),
      l109: L(109).start, y2012: w(109, '2012年'), kompu: w(109, 'コンプガチャ'), ihan: w(109, '違反'),
      l110: L(110).start, y2016: w(110, '2016年'), cesa: w(110, 'cesa'), kakuritsu110: w(110, '確率'), hyouji: w(110, '表示'),
      l111: L(111).start, kinshi: w(111, '禁止'), nakuu: w(111, 'なく'), hyouji111: w(111, '表示'),
      l112: L(112).start, kakuritsu112: w(112, '確率'), kakusarete: w(112, '隠されて'),
      l113: L(113).start, p06: w(113, '0.6%'), rule113: w(113, 'ルール'), mieteiru: w(113, '見えて'), end: L(113).end,
    };
    this.P06 = must('0.006 * 100', 0.6);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.nihon + 4.0, 'pen'), c(T.cesa, 'pen'), c(T.hyouji + 2.6, 'tick'), c(T.kakuritsu110, 'tick'), c(T.nl - 0.3, 'card'), c(T.y2018, 'pen'), c(T.tobaku, 'pen'), c(T.y2022, 'pen'), c(T.saibansho, 'pen'), c(T.china - 0.2, 'card'), c(T.kakuritsu, 'pen'),
      c(T.uk - 0.2, 'card'), c(T.houritsu, 'pen'), c(T.rule, 'pen'), c(T.nihon, 'pen'), c(T.l109 + 0.1, 'card'), c(T.kompu, 'pen'), c(T.ihan, 'pen'), c(T.l110 + 0.1, 'card'), c(T.y2016 + 0.45, 'pen'),
      c(T.hyouji, 'pen'), c(T.kinshi, 'pen'), c(T.nakuu, 'tear'), c(T.hyouji111, 'pen'), c(T.kakuritsu112, 'pen'), c(T.l113 - 0.2, 'pop'), c(T.p06, 'pen'), c(T.mieteiru, 'pen')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t, { era: 'casino' });
    headingDark(g, '世界の答えはばらばら', prog(t, F + 0.3, F + 1.3));
    // ① オランダ
    const d1 = out(t, T.l106 - 0.3, 0.6);
    if (d1 < 1) {
      g.save(); g.translate(0, 1150 * d1);
      photoTag(g, 'netherlands', 130, 320, 600, 420, prog(t, F + 0.3, F + 1.0), { zoom: 1 + 0.07 * prog(t, F + 0.3, T.l106), rot: -0.03 });
      photoTag(g, 'nlReport', 800, 300, 640, 520, prog(t, T.nl - 0.4, T.nl + 0.4), { zoom: 1 + 0.05 * prog(t, T.nl, T.l106), focus: [0.5, 0], rot: 0.025, credit: '出典：オランダ賭博庁（2018年）' });
      telop(g, '2018年', 1640, 340, prog(t, T.y2018 - 0.1, T.y2018 + 0.6), { size: 44 });
      telop(g, '賭博と判断', 1640, 440, prog(t, T.tobaku - 0.1, T.tobaku + 0.6), { size: 44 });
      telop(g, '2022年', 1640, 600, prog(t, T.y2022 - 0.1, T.y2022 + 0.6), { size: 44 });
      telop(g, '最高行政裁判所', 1640, 700, prog(t, T.saibansho - 0.2, T.saibansho + 0.6), { size: 36 });
      const bx = telop(g, '罰金', 1560, 810, prog(t, T.batsu - 0.1, T.batsu + 0.5), { size: 44 });
      strike(g, bx.x + 8, 810, bx.x + bx.w - 8, 806, prog(t, T.torikeshi, T.torikeshi + 0.5), { w: 8 });
      telop(g, '取り消し', 1740, 810, prog(t, T.torikeshi, T.torikeshi + 0.6), { size: 36, pad: 30 });
      g.restore();
    }
    // ② 中国 / イギリス
    const d2 = out(t, T.l109 - 0.25, 0.6);
    if (t > T.l106 - 0.4 && d2 < 1) {
      g.save(); g.translate(0, 1150 * d2);
      const F1 = `700 48px ${MIN}`;
      card(g, [[['中国', `700 76px ${MIN}`]], [['2017年から', F1, '@dim']], [['確率の公開を', F1]], [['義務づけ', F1]]], 150, 300, prog(t, T.china - 0.2, T.kakuritsu + 1.4), { size: 52, lead: 1.55, w: 700, pad: 50 });
      card(g, [[['イギリス', `700 76px ${MIN}`]], [['2022年', F1, '@dim']], [['法律は変えず', F1]], [['業界の自主ルール', F1]]], 1000, 300, prog(t, T.uk - 0.2, T.rule + 1.6), { size: 52, lead: 1.55, w: 760, pad: 50 });
      g.restore();
    }
    // ③ 日本 2012 / 2016
    const d3 = out(t, T.l111 - 0.3, 0.6);
    if (t > T.l108 - 0.3 && d3 < 1) {
      g.save(); g.translate(0, 1150 * d3);
      telop(g, '日本', 960, 215, prog(t, T.l108 - 0.4, T.nihon + 0.4), { size: 56 });
      photoTag(g, 'itmedia', 130, 300, 700, 400, prog(t, T.l109 - 0.1, T.l109 + 0.6), { zoom: 1 + 0.08 * prog(t, T.l109, T.l111), focus: [0.5, 0], rot: -0.025, credit: '出典：ITmedia ビジネスオンライン（2012年）' });
      photoTag(g, 'cesa', 900, 300, 700, 400, prog(t, T.l110 - 0.1, T.l110 + 0.6), { zoom: 1 + 0.08 * prog(t, T.l110, T.l111), focus: [0.5, 0], rot: 0.025, credit: '出典：gamebiz（2016年）' });
      telop(g, '2012年　コンプガチャ', 480, 880, prog(t, T.y2012 - 0.1, T.kompu + 0.8), { size: 40 });
      telop(g, '景品表示法に違反', 480, 975, prog(t, T.ihan - 0.3, T.ihan + 0.6), { size: 40 });
      telop(g, '2016年　CESA', 1250, 880, prog(t, T.y2016 - 0.1, T.cesa + 0.6), { size: 40 });
      telop(g, '確率の表示が原則', 1250, 975, prog(t, T.kakuritsu110 - 0.1, T.hyouji + 0.6), { size: 40 });
      g.restore();
    }
    // ④ 禁止ではなく、表示
    const d4 = out(t, T.l113 - 0.3, 0.6);
    if (t > T.l111 - 0.3 && d4 < 1) {
      g.save(); g.translate(0, 1150 * d4);
      write(g, '禁止', 560, 460, prog(t, T.kinshi - 0.1, T.kinshi + 0.4), { font: `700 150px ${MIN}`, color: '@wrong', align: 'center', on: 'dark' });
      { const ks = prog(t, T.nakuu - 0.1, T.nakuu + 0.4); if (ks > 0) { g.save(); g.strokeStyle = C.white; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(400, 430); g.lineTo(400 + 320 * outCubic(ks), 412); g.stroke(); g.restore(); } }
      write(g, 'ではなく', 960, 450, prog(t, T.nakuu - 0.2, T.nakuu + 0.4), { font: `700 52px ${MIN}`, color: '@dim', align: 'center', on: 'dark' });
      write(g, '表示', 1360, 460, prog(t, T.hyouji111 - 0.1, T.hyouji111 + 0.5), { font: `700 190px ${MIN}`, align: 'center', on: 'dark' });
      const ku = prog(t, T.hyouji111 + 0.4, T.hyouji111 + 1.0);
      if (ku > 0) { g.save(); g.strokeStyle = C.cream; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(1180, 500); g.lineTo(1180 + 360 * outCubic(ku), 504); g.stroke(); g.restore(); }
      telop(g, '確率は、隠されていない', 960, 700, prog(t, T.kakuritsu112 - 0.1, T.kakusarete + 0.8), { size: 56 });
      g.restore();
    }
    // ⑤ 0.6% が見えている
    if (t > T.l113 - 0.3) {
      phone(g, 560, 220, prog(t, T.l113 - 0.2, T.l113 + 0.5), { state: 'idle', t });
      write(g, `${this.P06}%`, 1300, 560, prog(t, T.p06 - 0.15, T.p06 + 0.5), { font: `700 260px ${MIN}`, color: '@sky', align: 'center', on: 'dark' });
      const kr = prog(t, T.p06 + 0.5, T.p06 + 1.1);
      if (kr > 0) { g.save(); g.strokeStyle = C.cream; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.ellipse(1300, 480, 340, 170, -0.04, -2.3, -2.3 + TAU * 1.04 * outCubic(kr)); g.stroke(); g.restore(); }
      telop(g, 'ルールのおかげで、見えている', 1300, 800, prog(t, T.rule113 - 0.1, T.mieteiru + 0.8), { size: 50 });
    }
  }
}
