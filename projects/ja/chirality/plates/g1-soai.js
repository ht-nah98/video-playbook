// g1 · 2%からの出発 (p2, câu 83–91) — mở hồi 6「自分をコピーする分子」. DNA §1 g1:
//  ① 残る条件 — ba ô Frank (①② đã ✓) trượt ra từ gương, ô ③ viền sáng ở 「自己触媒」; rút về gương ở câu 84
//  ② 硤合 (ảnh soai nhỏ, trên-phải); bên trái: 触媒 + できる分子 (CÙNG R-soai1995, cùng tay) → bản sản phẩm (nét đứt) trượt chồng
//     lên xúc tác: khớp (✓ correct) 「触媒 ≈ できる分子」; câu 85: mũi tên vòng sản phẩm → xúc tác 「次の触媒に、なれる？」;
//     câu 86: hàng ống nghiệm "đã thử" → 「自分で自分を作る分子」, vòng bạc ôm hai phân tử
//  ③ 1995年 · 科学誌「ネイチャー」 · 「硤合反応」 (phải)
//  ④ trái: năm ống nghiệm 実験 (SOAI_1995, hằng số nguồn): 最初 2% ≈ nửa hổ phách nửa azure → mỗi vòng đổ đầy ở đúng chữ số
//     10 / 57 / 81 / 88%; mũi tên nối từng vòng ở 「集めて…繰り返します」
//  ⑤ ô Frank trở lại, ③ đánh dấu ✓ ở 「そろった」 (suzu)
import { W, C, MX, JP, FRANK, SOAI_1995, PANES, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, write, telop, title,
  actCard, actCues, actTimes, measure, arrow, molecule, tube, photo, panes, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
// một ô chữ thay phiên: mục mới viết ra, mục cũ trượt lên khỏi dải (clip). items: [[mốc, chữ | null, opts?]] tăng dần.
function slot(g, t, items, x, y, o = {}) {
  let i = -1; for (let j = 0; j < items.length; j++) if (t >= items[j][0]) i = j;
  const size = o.size ?? 44;
  const draw = (it, dy, k) => { const [, s, oo = {}] = it; if (!s) return;
    g.save(); g.beginPath(); g.rect(0, y - size * 1.3, W, size * 1.75); g.clip(); g.translate(0, -dy);
    telop(g, s, x, y, k, { ...o, ...oo }); g.restore(); };
  if (i >= 1) { const e = out(t, items[i][0], 0.35); if (e < 1) draw(items[i - 1], size * 1.7 * e, 1); }
  if (i >= 0) draw(items[i], 0, prog(t, items[i][0], items[i][0] + 0.5));
}
// nhãn 「実験」: khung bạc mảnh (số thí nghiệm — DNA §9)
function tag(g, s, x, y, k) {
  if (k <= 0) return;
  const font = `700 30px ${JP}`, w = measure(g, s, font), e = outCubic(clamp(k * 2));
  g.save(); g.strokeStyle = C.silver; g.lineWidth = 2; g.beginPath(); g.roundRect(x - 12, y - 34, (w + 24) * e, 46, 6); g.stroke(); g.restore();
  write(g, s, x, y, clamp(k * 2 - 0.6), { font });
}

const TX = i => 170 + i * 150;                                           // năm ống nghiệm (trái gương)
const LABEL = ['最初', '1回目', '2回目', '3回目', '4回目'];

export default class Soai {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = { soai: './assets/history/soai.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'g1-soai');
    const S = i => L(i).start;
    this.T = {
      jiko: w(83, '自己'),
      l84: S(84), soai84: w(84, '硤合'), shoku84: w(84, '触媒'), dekiru: w(84, 'できる'), nite: w(84, '似て'),
      l85: S(85), tsugi85: w(85, '次'), shoku85: w(85, '触媒'),
      shita: w(86, '試した'), jibun: w(86, '自分'), tadori: w(86, 'たどり着きます'),
      l87: S(87), y1995: w(87, '1995年'), nature: w(87, 'ネイチャー'), soai87: w(87, '硤合'), hanno: w(87, '反応'),
      l88: S(88), p2: w(88, '2%'), hanhan: w(88, '半々'),
      atsume: w(89, '集めて'), kuri: w(89, '繰り返します'),
      nums: [w(88, '2%'), w(90, '10%'), w(90, '57%'), w(90, '81%'), w(90, '88%')], kai4: w(90, '4回目'),
      l91: S(91), frank: w(91, 'フランク'), soro: w(91, 'そろった'),
    };
    this.START = S(83);
    this.FROM = Math.max(this.START - 2.6, L(82).end + 0.5);             // mở hồi (lead 2.6)
    must(`'${SOAI_1995.join()}'`, '2,10,57,81,88');                       // số bài báo Nature 1995 (CONTENT.md) — 4 vòng
    must(`${SOAI_1995.length - 1}`, 4);
    // ống 最初: 2% → hạt hổ phách (1 + 0.02)/2 · 40 = 20.4 → 20 / 40 — "ほとんど半々"
    must(`Math.round(40 * (1 + 0.02) / 2)`, 20);
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.soai84, 'photo'), cue(T.shoku84, 'mol'), cue(T.nite, 'match'),
      cue(T.tsugi85, 'telop'), cue(T.shita, 'tube', -4), cue(T.jibun, 'telop'),
      cue(T.y1995, 'page'), cue(T.nature, 'telop', -6), cue(T.soai87, 'telop'),
      cue(T.l88, 'tube'), cue(T.hanhan, 'telop', -6), cue(T.atsume, 'telop'), cue(T.kuri, 'telop', -4),
      ...T.nums.slice(1).map((a, i) => cue(a, 'tube', -6 + i)),
      cue(T.frank, 'glass'), cue(T.soro, 'frank'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    mirror(g);

    // ── ① / ⑤ ba ô Frank: ra ở FROM, rút về gương ở câu 84, trở lại ở 「フランク」; ③ ✓ ở 「そろった」 ──
    const kA = prog(t, F + 0.1, F + 0.7) * (1 - prog(t, T.l84 - 0.4, T.l84 + 0.2)), kB = prog(t, T.frank - 0.3, T.frank + 0.3), kp = Math.max(kA, kB);
    if (kp > 0) {
      panes(g, { texts: FRANK, k: [kp, kp, kp], kText: [1, 1, 1], tick: [1, 1, kB > 0 ? prog(t, T.soro, T.soro + 0.6) : 0] });
      const hl = kA * prog(t, T.jiko - 0.1, T.jiko + 0.4);              // ô ③ viền sáng: điều kiện còn lại
      if (hl > 0) { const y = PANES.y0 + 2 * (PANES.h + PANES.gap); g.save(); g.strokeStyle = C.silver; g.lineWidth = 4; g.globalAlpha = hl;
        g.strokeRect(PANES.x - 6, y - 6, PANES.w + 12, PANES.h + 12); g.restore(); }
    }

    // ── ② hai phân tử (trái): xúc tác ≈ sản phẩm → rời xuống ở câu 88 ──
    const oM = out(t, T.l88 - 0.3, 0.6);
    if (t > T.shoku84 - 0.3 && oM < 1) {
      g.save(); g.translate(0, 700 * oM);
      const rot = 0.5 + 0.15 * (t - T.l84), y = 520;
      const ov = smooth(prog(t, T.nite - 0.2, T.nite + 0.6)) * (1 - smooth(prog(t, T.l85 - 0.2, T.l85 + 0.5)));
      const px = 660 + (300 - 660) * ov, kc = prog(t, T.shoku84 - 0.2, T.shoku84 + 0.4), kq = prog(t, T.dekiru - 0.2, T.dekiru + 0.4);
      floorShadow(g, 300, 160 * kc); floorShadow(g, px, 160 * kq);
      molecule(g, 'R-soai1995', { x: 300, y, scale: 52, rot, k: kc, hideH: true });
      molecule(g, 'R-soai1995', { x: px, y, scale: 52, rot, k: kq, hideH: true, ghost: ov > 0.02 });   // cùng tay: chồng khít
      telop(g, '触媒', 300, 780, prog(t, T.shoku84, T.shoku84 + 0.4), { size: 40, align: 'center' });
      telop(g, 'できる分子', 660, 780, prog(t, T.dekiru, T.dekiru + 0.5) * (1 - ov), { size: 40, align: 'center' });
      // câu 85: sản phẩm quay lại làm xúc tác
      arrow(g, [[640, 330], [480, 200], [320, 330]], prog(t, T.shoku85 - 0.3, T.shoku85 + 0.5), { color: C.L, w: 4 });
      // câu 86: vòng bạc ôm cả hai — 「自分で自分を作る」
      const kr = prog(t, T.tadori - 0.2, T.tadori + 0.8);
      if (kr > 0) { g.save(); g.strokeStyle = C.silver; g.lineWidth = 3; g.setLineDash([12, 9]); g.beginPath();
        g.ellipse(480, 540, 360, 250, 0, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * smooth(kr)); g.stroke(); g.restore(); }
      g.restore();
    }

    // ── phía phải (câu 84–90): ảnh 硤合, dòng chữ thay phiên, hàng ống đã thử, 1995 · Nature · 「硤合反応」 → rời ở câu 91 ──
    const oR = out(t, T.l91 - 0.7, 0.6);
    if (t > T.soai84 - 0.4 && oR < 1) {
      g.save(); g.translate(1000 * oR, 0);
      photo(g, 'soai', 1690, 250, 160, prog(t, T.soai84 - 0.3, T.soai84 + 0.5), { align: 'right' });
      slot(g, t, [[T.nite, '触媒 ≈ できる分子'], [T.tsugi85, 'できた分子が、次の触媒に？'], [T.jibun, '自分で自分を作る分子', { mincho: true }],
        [T.l87 - 0.2, null], [T.atsume, 'できた分子を、次の触媒に']], 1000, 720, { size: 48 });
      telop(g, 'それを、繰り返す', 1000, 810, prog(t, T.kuri, T.kuri + 0.6), { size: 44, color: '@dim' });
      // たくさんの分子を試した: ống nghiệm nhỏ lần lượt bật lên rồi rời xuống
      const oTr = out(t, T.jibun - 0.2, 0.5);
      if (t > T.shita - 0.3 && oTr < 1) { g.save(); g.translate(0, 400 * oTr);
        for (let i = 0; i < 8; i++) tube(g, 1030 + i * 95, 960, 150, prog(t, T.shita - 0.2 + i * 0.12, T.shita + 0.2 + i * 0.12), { fill: 0.5, n: 10, seed: 7 + i });
        g.restore(); }
      telop(g, '1995年', 1000, 330, prog(t, T.y1995, T.y1995 + 0.6), { size: 64 });
      telop(g, '科学誌「ネイチャー」', 1000, 400, prog(t, T.nature - 0.3, T.nature + 0.5), { size: 40, color: '@dim' });
      telop(g, '「硤合反応」', 1000, 600, prog(t, T.soai87, T.hanno + 0.5), { size: 72, mincho: true });
      g.restore();
    }

    // ── ④ năm ống 実験 (trái, câu 88–91): mỗi vòng đổ đầy ở đúng chữ số ──
    if (t > T.l88 - 0.4) {
      tag(g, '実験', 120, 400, prog(t, T.l88, T.l88 + 0.6));
      for (let i = 0; i < 5; i++) {
        const x = TX(i), kt = i === 0 ? prog(t, T.l88 - 0.2, T.l88 + 0.4) : prog(t, T.atsume - 0.2 + (i - 1) * 0.25, T.atsume + 0.3 + (i - 1) * 0.25);
        if (kt <= 0) continue;
        const kf = i === 0 ? 1 : smooth(prog(t, T.nums[i] - 0.3, T.nums[i] + 0.3)), mix = (1 + SOAI_1995[i] / 100) / 2;
        floorShadow(g, x, 70 * kt);
        tube(g, x, 800, 300, kt, { fill: 0.04 + 0.56 * kf, mix, n: Math.round(40 * kf), seed: 3 + i });
        telop(g, `${SOAI_1995[i]}%`, x, 470, prog(t, T.nums[i], T.nums[i] + 0.4), { size: 40, align: 'center' });
        telop(g, LABEL[i], x, 890, i === 4 ? prog(t, T.kai4, T.kai4 + 0.4) : kt, { size: 28, color: '@dim', align: 'center' });
        if (i < 4) arrow(g, [[x + 40, 640], [x + 75, 590], [x + 110, 640]], prog(t, T.atsume + i * 0.3, T.atsume + 0.5 + i * 0.3), { color: C.dim, w: 3, head: 12 });
      }
      telop(g, 'ほとんど半々', 110, 960, prog(t, T.hanhan, T.hanhan + 0.5), { size: 32 });
    }

    // ── tiêu đề + thẻ hồi (trên cùng) ──
    title(g, '2%からの出発', t, actTimes(F, this.START).o1 - 0.2, { act: 6 });   // sau thẻ hồi (như e1/f1)
    actCard(g, t, F, this.START, 6);
  }
}
