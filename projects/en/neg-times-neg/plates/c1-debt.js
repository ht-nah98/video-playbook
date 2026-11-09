// c1 · The debt story (p2 câu 16–23) — MỞ HỒI II. Thẻ hồi giữa khung → khay ba ô "1 DEBT · 2 PATTERN · 3 TURN" góc phải
// trên (dùng chung c2, c3: ô đang nói sáng lên). Tấm thảm dài, camera đi xuống qua hai vùng:
//   0 nợ 3 triệu = ba viên đỏ "DEBT"; xoá nợ = ba viên vàng úp → ba zero pair biến → "+3 MILLION RICHER";
//     "− (−3) = + 3", ✓ cho phép trừ.
//   1 (−3) × (−2) = ? kẽo kẹt; "take away a debt of two, three times over" = ba cặp viên đỏ nhấc lên thành bóng mờ,
//     "= 6 ?" (chấp nhận, không nhìn thấy); nhãn "A WAY TO REMEMBER · NOT A PROOF" (ngà — không gạch, §58); ponder.
import { W, H, C, CG, clamp, smooth, prog, ground, card, actTitle, typed, label, quote, eq, tile, zeroPair, footprint,
  check, stamp, figure, lookup, must, num, par } from '../kit.js';

const ZONE = 1080;

/**
 * Khay ba cách giải thích. m = 1: góc phải trên (toạ độ MÀN HÌNH, x 1100–1824, y 76–144); m = 0: ba ô lớn giữa khung
 * (c1 mở bằng ba ô lớn rồi thu về góc). k = viết vào; on = ô đang nói (1..3), kOn = sáng lên.
 */
export function tray(g, k, on, kOn = 1, m = 1) {
  if (k <= 0) return;
  const e = smooth(clamp(m)), L = (a, b) => a + (b - a) * e;
  ['1 · DEBT', '2 · PATTERN', '3 · TURN'].forEach((s, i) => {
    const bw = L(500, 228), bh = L(150, 68), x = L(W / 2 - 790 + i * 540, 1100 + i * 248), y = L(440, 76);
    const ki = clamp(k * 3 - i), lit = i + 1 === on ? clamp(kOn) : 0;
    if (ki <= 0) return;
    g.save(); g.globalAlpha = clamp(ki * 2); g.lineWidth = 2 + lit; g.strokeStyle = lit ? C.ink : C.dim; g.setLineDash(lit >= 1 ? [] : [8, 7]);
    g.beginPath(); g.roundRect(x, y, bw, bh, 10); g.stroke(); g.restore();
    label(g, s, x + bw / 2, y + bh / 2 + L(14, 7), ki, { align: 'center', size: L(40, 20), color: lit > 0.5 ? C.ink : C.dim });
  });
}

export default class Debt {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      explanations: w(16, 'explanations'), lets: w(16, "let's"), honestly: w(16, 'honestly'),
      first: w(17, 'first'), debt0: w(17, 'debt'),
      three: w(18, 'three'), million: w(18, 'million'), minus: w(18, 'minus'), million2: w(18, 'million', 2), accounts: w(18, 'accounts'),
      takes: w(19, 'takes'), subtracted: w(19, 'subtracted'), minus19: w(19, 'minus'), million19: w(19, 'million'),
      and19: w(19, 'and'), richer: w(19, 'richer'), e19: L(19).end,
      subtracting: w(20, 'subtracting'), negative20: w(20, 'negative'), adding: w(20, 'adding'), positive20: w(20, 'positive'),
      subtraction: w(20, 'subtraction'), works: w(20, 'works'), beautifully: w(20, 'beautifully'),
      multiplication: w(21, 'multiplication'), creak: w(21, 'creak'),
      neg1: w(22, 'negative'), neg2: w(22, 'negative', 2), like: w(22, 'like'), take: w(22, 'take'),
      debt22: w(22, 'debt'), three2: w(22, 'three', 2), times2: w(22, 'times', 2), over: w(22, 'over'), e22: L(22).end,
      accept: w(23, 'accept'), longer: w(23, 'longer'), seeing: w(23, 'seeing'), leaning: w(23, 'leaning'), feeling: w(23, 'feeling'),
      end: L(23).end,
    };
    this.START = L(16).start; this.FROM = this.START - 2.6;
    this.PAN = L(21).start - 0.45;
    this.V = {
      debt: must('-3', -3), left: must('-3 - (-3)', 0), richer: must('0 - (-3)', 3), sub: must('-(-3)', 3),
      a: must('-3', -3), b: must('-2', -2), ab: must('(-3) * (-2)', 6), groups: must('3', 3), each: must('2', 2),
    };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.explanations, kind: 'tick' }, { t: T.three, kind: 'chip' }, { t: T.takes + 0.1, kind: 'chip' },
      { t: T.million19 + 0.35, kind: 'pop' }, { t: T.works, kind: 'correct' }, { t: T.creak, kind: 'question' },
      { t: T.debt22, kind: 'chip' }, { t: T.feeling, kind: 'tick' },
    ];
  }
  cam(t) {
    const e = smooth(prog(t, this.PAN, this.PAN + 1.0));
    const d0 = Math.min(40, 2 * Math.max(0, t - this.START)), d1 = Math.min(20, 2 * Math.max(0, t - this.PAN - 1.0));
    return { x: 0, y: (1 - e) * d0 + e * (ZONE + d1) };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    // đang trượt: không cho nội dung đi xuyên thẻ mục / khay (y < 170)
    const sliding = t > this.PAN && t < this.PAN + 1.0;
    g.save(); if (sliding) { g.beginPath(); g.rect(0, 170, W, H - 170); g.clip(); }
    g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01) this.zone1(g, t, ZONE);
    g.restore();
    actTitle(g, t, this.START, 'II', 'Explanations that feel right', 'answers question 2');
    card(g, prog(t, this.START + 0.35, this.START + 1.6), 'ACT II', 'THE DEBT STORY');
    tray(g, prog(t, T.explanations - 0.2, T.honestly), 1, prog(t, T.first, T.first + 0.4), prog(t, T.first + 0.3, T.debt0 + 0.5));
    label(g, 'honestly: proof, or a way to remember?', W / 2, 680, prog(t, T.lets, T.honestly + 0.5) - prog(t, T.first - 0.1, T.first + 0.4),
      { align: 'center', size: 24, color: C.ink });
    figure(g, 'ponder', 1640, H, 740, prog(t, T.accept - 0.35, T.accept) - prog(t, T.end + 0.8, T.end + 1.15));
  }
  zone0(g, t) {
    const T = this.T, V = this.V, s = 100, y = 330, xs = [200, 450, 700];
    quote(g, 'Explanation one: a debt', 200, 262, prog(t, T.first, T.debt0 + 0.4), { size: 46, color: C.dim });
    // ba viên đỏ = nợ 3 triệu; ba viên vàng rơi cạnh (xoá nợ) rồi úp xuống → ba zero pair biến
    const kGold = prog(t, T.takes, T.takes + 0.4), kz = i => prog(t, T.minus19 + i * 0.2, T.million19 + 0.35 + i * 0.2);
    xs.forEach((x, i) => {
      if (kGold < 1) {
        tile(g, x, y, s, 'n', { k: prog(t, T.three + i * 0.12, T.three + 0.35 + i * 0.12) });
        tile(g, x + s * 1.25, y, s, 'p', { k: kGold });
      } else zeroPair(g, x, y, s, kz(i));
      // nhãn DEBT dưới mỗi viên: viết vào khi viên rơi, xoá ngược khi cặp biến
      label(g, 'debt', x + s / 2, y + s + 44, prog(t, T.million - 0.1, T.million + 0.4) - prog(t, T.minus19, T.million19 + 0.3),
        { align: 'center', color: C.negT, size: 20 });
    });
    label(g, '× 1 million', 200, y + s + 96, prog(t, T.million, T.million + 0.6) - prog(t, T.minus19 + 0.4, T.million19 + 0.8), { size: 22 });
    label(g, 'debt paid off', 200, y + s + 96, prog(t, T.and19 + 0.2, T.richer), { size: 22 });
    // tài khoản
    const ax = 1100;
    label(g, 'your account · millions', ax, 280, prog(t, T.accounts - 0.4, T.accounts + 0.4));
    eq(g, [[num(V.debt), C.negT], [' million']], ax, 370, 64, prog(t, T.minus, T.million2 + 0.3));
    eq(g, [[num(V.debt), C.negT], [' − '], [par(V.debt), C.negT], [' = '], [num(V.left)]], ax, 470, 64, prog(t, T.subtracted, T.and19 + 0.2));
    label(g, '+' + num(V.richer) + ' million richer', ax, 550, prog(t, T.richer - 0.3, T.richer + 0.4), { color: C.posT, size: 26 });
    // trừ số âm = cộng số dương; với phép trừ câu chuyện chạy tốt
    label(g, 'subtracting a negative = adding a positive', 200, 700, prog(t, T.subtracting, T.positive20 + 0.3), { color: C.ink, size: 24 });
    eq(g, [['− '], [par(V.debt), C.negT], ['   =   '], ['+ '], [num(V.sub), C.posT]], 200, 830, 88, prog(t, T.negative20, T.positive20 + 0.4));
    label(g, 'for subtraction', 820, 812, prog(t, T.subtraction - 0.1, T.subtraction + 0.5), { color: C.ink, size: 24 });
    check(g, 1110, 800, 26, prog(t, T.works, T.works + 0.4), { color: C.ink });
    label(g, 'works', 820, 852, prog(t, T.works, T.beautifully + 0.4), { size: 22 });
  }
  zone1(g, t, Y) {
    const T = this.T, V = this.V, s = 76;
    // (−3) × (−2) = ? — kẽo kẹt: phương trình rung nhẹ quanh "creak" (không phải sai: không băng)
    label(g, 'now try multiplication', 200, Y + 200, prog(t, this.PAN + 0.5, T.multiplication + 0.3), { color: C.ink, size: 24 });
    const wob = Math.sin(prog(t, T.creak - 0.1, T.creak + 0.7) * Math.PI * 4) * 0.012 * (1 - prog(t, T.creak + 0.3, T.creak + 0.7));
    g.save(); g.translate(200, Y + 300); g.rotate(wob); g.translate(-200, -(Y + 300));
    const r = eq(g, [[par(V.a), C.negT], [' × '], [par(V.b), C.negT], [' = ']], 200, Y + 300, 96, prog(t, T.multiplication - 0.3, T.multiplication + 0.8));
    g.restore();
    const xr = r[3][1] + 8;
    eq(g, [[num(V.ab), C.posT]], xr, Y + 300, 96, prog(t, T.accept, T.accept + 0.4));
    typed(g, '?', xr + (t >= T.accept ? 78 : 0), Y + 304, prog(t, T.creak - 0.2, T.creak + 0.1), `italic 600 120px ${CG}`, C.ink);
    // gạch chân hai thừa số khi đọc
    [[0, T.neg1], [2, T.neg2]].forEach(([i, at]) => {
      const k = prog(t, at, at + 0.4); if (k <= 0) return;
      g.save(); g.fillStyle = C.negT; g.fillRect(r[i][0] + 6, Y + 324, (r[i][1] - r[i][0] - 12) * k, 4); g.restore();
    });
    quote(g, '“take away a debt of two, three times over”', 200, Y + 440, prog(t, T.take - 0.1, T.over + 0.3), { size: 44 });
    // ba món nợ hai viên; mỗi món nhấc lên thành bóng mờ đúng lúc "three · times · over"; khi "no longer seeing" chỉ còn viền
    const lift = [T.three2, T.times2, T.over], gone = prog(t, T.longer, T.seeing + 0.3);
    for (let i = 0; i < V.groups; i++) {
      const gx = 200 + i * 300, gy = Y + 596, kl = smooth(prog(t, lift[i], lift[i] + 0.5));
      for (let j = 0; j < V.each; j++) {
        const x = gx + j * (s + 12);
        footprint(g, x, gy, s, kl, { zero: false });
        if (gone < 1) tile(g, x, gy - 112 * kl, s, 'n', { k: prog(t, T.debt22 + i * 0.1, T.debt22 + 0.35 + i * 0.1), alpha: (1 - 0.6 * kl) * (1 - gone) });
      }
      label(g, 'debt of ' + num(V.each), gx + s + 6, gy + s + 46, prog(t, T.debt22 + 0.2, T.debt22 + 0.8), { align: 'center', color: C.negT, size: 18 });
    }
    typed(g, '?', 1110, Y + 720, prog(t, T.over + 0.2, T.over + 0.4), `italic 600 160px ${CG}`, C.ink, { align: 'center' });
    label(g, 'no longer seeing it', 200, Y + 800, prog(t, T.longer - 0.2, T.seeing + 0.4), { size: 22 });
    label(g, 'leaning on a feeling', 200, Y + 840, prog(t, T.leaning - 0.1, T.feeling + 0.3), { size: 22, color: C.ink });
    stamp(g, 'A WAY TO REMEMBER · NOT A PROOF', 200, Y + 930, prog(t, T.feeling, T.feeling + 0.35), { size: 30, color: C.ink, rot: -0.03, align: 'left' });
  }
}
