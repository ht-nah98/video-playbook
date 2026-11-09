// d2 · Zero times anything (p2 câu 53–59) — bước 1 của chứng minh, mở một tấm thảm dài ba khung (d2 → d3 → d4, CONTINUES).
//   Mỗi bước một khung thảm theo chiều ngang (OX); sang bước sau camera trượt sang phải, kết luận bước trước bay lên
//   "sổ bước" góc phải trên (SLOT). Cột trái: chứng minh bằng số 3 và 2; cột phải (LX): cùng dòng ấy bằng chữ a, b.
//   0 × 2 = (0 + 0) × 2 = 0 × 2 + 0 × 2 → cộng số đối hai vế (hai zero pair úp và biến) → 0 = 0 × 2 → "0 × 2 = 0".
// Các hàm dùng chung của nhóm (chain, run, ledger, fly…) export từ đây; d3/d4 nhập lại.
import { W, H, C, ARC, MONO, CG, clamp, smooth, prog, ground, card, typed, label, mono, quote, eq, mid, tile, zeroPair,
  line, ring, num, par, lookup, must, typeCues } from '../kit.js';

export const OX = 1920;                                     // mỗi bước một khung thảm
export const SLOT = [[1080, 146], [1380, 146]], LS = 40;      // sổ bước: kết luận bước 1, 2 (toạ độ MÀN HÌNH, cỡ chữ)
export const LX = 1420, DIV = 1370, RX = 820;                 // cột chữ a, b · vạch ngăn · cột kết luận
export const ACT = 'ACT III';

/** Như kit.eq nhưng font tuỳ ý (Cormorant nghiêng có số tô màu, Plex Mono có số tô màu). Trả về [[x0, x1], …]. */
export function run(g, parts, x, y, font, k = 1, ls = 0) {
  g.save(); g.font = font; g.letterSpacing = ls + 'px'; const ws = parts.map(([s]) => g.measureText(s).width); g.restore();
  let cx = x, left = Math.round(parts.reduce((a, [s]) => a + s.length, 0) * clamp(k)); const out = [];
  parts.forEach(([s, col], i) => {
    out.push([cx, cx + ws[i]]);
    if (left > 0) { typed(g, s, cx, y, Math.min(1, left / s.length), font, col || C.ink, { ls }); left -= s.length; }
    cx += ws[i];
  });
  return out;
}
/** Một dòng phương trình viết theo từng đoạn (mỗi đoạn một mốc lời): segs = [[parts, k], …] → ranges theo đoạn. */
export function chain(g, segs, x, y, size) {
  let cx = x; const out = [];
  for (const [parts, k] of segs) { const r = eq(g, parts, cx, y, size, k); out.push(r); cx = r.at(-1)[1]; }
  return out;
}
export const span = (r, i, j) => [r[i][0], r[j][1]];
export const flat = parts => parts.map(([s]) => s).join('');
/** Một mục sổ bước: "STEP n" + kết luận cỡ LS. Trả về ranges của kết luận. */
export function ledger(g, i, parts, kl = 1) {
  const [x, y] = SLOT[i];
  label(g, `step ${i + 1}`, x, y - 52, kl, { size: 18 });
  return eq(g, parts, x, y, LS, 1);
}
/** Vòng tay quanh một dải chữ [x0, x1] ở baseline y, cỡ s. */
export function ringAt(g, r, y, s, k, o = {}) {
  ring(g, (r[0] + r[1]) / 2, y - s * 0.34, (r[1] - r[0]) / 2 + s * 0.45, s * 0.72, k, o);
}
/** Vật bay từ (sx, sy, cỡ ss) → (dx, dy, cỡ ds) theo f; draw() vẽ ở gốc với cỡ gốc ss. */
export function fly(g, f, [sx, sy, ss], [dx, dy, ds], draw) {
  const e = smooth(clamp(f)), s = ss + (ds - ss) * e;
  g.save(); g.translate(sx + (dx - sx) * e, sy + (dy - sy) * e); g.scale(s / ss, s / ss); draw(); g.restore();
}
/** Chùm gõ cho một chuỗi parts viết trong [a, b]. */
export const typeOf = (parts, a, b) => typeCues(flat(parts), a, b);

export default class Zero {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  static NAME = 'ZERO TIMES ANYTHING';
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    this.T = {
      real: w(53, 'real'), numbers: w(53, 'numbers'), three: w(53, 'three'), two: w(53, 'two'), letters: w(53, 'letters'), alongside: w(53, 'alongside'),
      step: w(54, 'step'), small: w(54, 'small'), fact: w(54, 'fact'), zero1: w(54, 'zero', 1), e54: L(54).end,
      take: w(55, 'take'), two55: w(55, 'two', 1), since: w(55, 'since'), isZero: w(55, 'zero', 4), same: w(55, 'same'), two55c: w(55, 'two', 3), e55: L(55).end,
      distributive: w(56, 'distributive'), that: w(56, 'that'), two56: w(56, 'two', 2), e56: L(56).end,
      so57: w(57, 'so'), two57: w(57, 'two', 3), e57: L(57).end,
      add: w(58, 'add'), opposite: w(58, 'opposite'), sides: w(58, 'sides'), and58: w(58, 'and'), left: w(58, 'left'), zero58: w(58, 'zero', 2), two58: w(58, 'two', 2), e58: L(58).end,
      so59: w(59, 'so', 1), zero59: w(59, 'zero', 2), but: w(59, 'but'), rules: w(59, 'rules'), choice: w(59, 'choice'), e59: L(59).end,
    };
    this.START = L(53).start; this.FROM = this.START - 1.2;
    this.V = { a: 3, b: 2, zz: must('0 + 0', 0), p: must('0 * 2', 0), sum: must('0 * 2 + 0 * 2', 0), left: must('0 * 2 - 0 * 2', 0) };
    const P = this.P = {};                                  // các dòng (parts)
    const two = [num(2), C.posT], z = ['0'];
    P.l1a = [z, [' × '], two];
    P.l1b = [[' = ('], z, [' + '], z, [') × '], two];
    P.l2 = [['= '], z, [' × '], two, [' + '], z, [' × '], two];
    P.l3 = [z, [' × '], two, [' = '], z, [' × '], two, [' + '], z, [' × '], two];
    P.l4 = [[num(this.V.left)], [' = '], z, [' × '], two];
    P.res = [z, [' × '], two, [' = '], [num(this.V.p)]];
    this.RES = { x: 520, y: 900, size: 64 };               // kết luận — d3 cho nó bay lên sổ bước
  }
  sfx() {
    const T = this.T, P = this.P;
    return [
      { t: T.three, kind: 'chip' },
      ...typeOf(P.l1a, T.take, T.two55 + 0.25), ...typeOf(P.l1b, T.same, T.two55c + 0.2),
      { t: T.distributive, kind: 'tick' },
      ...typeOf(P.l2, T.that, T.two56 + 0.2), ...typeOf(P.l3, T.so57, T.e57),
      { t: T.and58 + 0.45, kind: 'pop' },
      ...typeOf(P.l4, T.zero58, T.two58 + 0.2), ...typeOf(P.res, T.zero59 - 0.95, T.zero59),
      { t: T.zero59 + 0.05, kind: 'correct' },
    ];
  }
  /** Kết luận "0 × 2 = 0" + vòng, gốc (x, y). */
  result(g, x, y, k = 1, kr = 1) {
    const r = eq(g, this.P.res, x, y, this.RES.size, k);
    ringAt(g, span(r, 0, 4), y, this.RES.size, kr, { color: C.ink, w: 3.5, seed: 21 });
    return r;
  }
  /** Thân bước 1 (toạ độ khung thảm của bước, gốc 0). noRes = kết luận đã bay đi (d3). */
  body(g, t, noRes = false) {
    const T = this.T, P = this.P;
    // 53 · số thật trước (3 và 2, bằng gạch), chữ đi kèm bên phải
    label(g, 'real numbers first', 96, 236, prog(t, T.real, T.three - 0.1));
    for (let i = 0; i < 3; i++) tile(g, 400 + i * 52, 198, 44, 'p', { k: prog(t, T.three + i * 0.07, T.three + 0.3 + i * 0.07) });
    typed(g, '3', 566, 240, prog(t, T.three + 0.2, T.three + 0.3), `600 52px ${ARC}`, C.posT);
    for (let i = 0; i < 2; i++) tile(g, 640 + i * 52, 198, 44, 'p', { k: prog(t, T.two + i * 0.07, T.two + 0.3 + i * 0.07) });
    typed(g, '2', 754, 240, prog(t, T.two + 0.2, T.two + 0.3), `600 52px ${ARC}`, C.posT);
    line(g, [[DIV, 196], [DIV, 1000]], `rgba(${C.grid},0.55)`, 2, { dash: [4, 10], k: prog(t, this.FROM + 0.3, T.letters + 0.6) });
    label(g, 'letters alongside', LX, 236, prog(t, T.letters, T.alongside + 0.3));
    typed(g, 'a, b', 1690, 238, prog(t, T.alongside, T.alongside + 0.4), `500 30px ${MONO}`, C.ink, { ls: 2 });
    // 54 · bước 1: một điều nhỏ
    // viết LỚN giữa khung (câu 54), thu về chỗ cũ khi dòng chứng minh đầu tiên bắt đầu (trạng thái cuối giữ nguyên)
    const sh = smooth(prog(t, T.take - 0.5, T.take + 0.4));
    const at = (x0, y0, s0, x1, y1, fn) => { const sc = s0 + (1 - s0) * sh; g.save(); g.translate(x0 + (x1 - x0) * sh, y0 + (y1 - y0) * sh); g.scale(sc, sc); fn(); g.restore(); };
    at(594, 520, 2.4, 96, 344, () => label(g, 'step 1 · a small fact', 0, 0, prog(t, T.step, T.fact + 0.3), { color: C.ink }));
    at(490, 680, 2, 430, 346, () => quote(g, 'Zero times anything is zero.', 0, 0, prog(t, T.zero1, T.e54 + 0.1), { size: 48 }));
    // 55 · 0 × 2 = (0 + 0) × 2, vì 0 + 0 = 0
    const S = 58, l1 = chain(g, [[P.l1a, prog(t, T.take, T.two55 + 0.25)], [P.l1b, prog(t, T.same, T.two55c + 0.2)]], 96, 460, S);
    mono(g, `since 0 + 0 = ${num(this.V.zz)}`, 860, 452, prog(t, T.since, T.isZero + 0.3), C.dim, 24);
    // 56 · luật phân phối
    const xEq = l1[1][0][0] + 14, l2 = eq(g, P.l2, xEq, 560, S, prog(t, T.that, T.two56 + 0.2));
    label(g, 'distributive law', l2.at(-1)[1] + 40, 552, prog(t, T.distributive, T.distributive + 0.8), { size: 18 });
    // 57 · ghép lại thành một dòng
    const l3 = eq(g, P.l3, 96, 680, S, prog(t, T.so57, T.e57));
    // 58 · cộng số đối của 0 × 2 vào hai vế: mỗi vế một zero pair úp và biến
    label(g, 'add the opposite of 0 × 2 to both sides', 96, 806, prog(t, T.add, T.sides + 0.3), { size: 18 });
    const zs = 40, kz = prog(t, T.and58, T.left + 0.1), show = prog(t, T.opposite, T.opposite + 0.4);
    for (const r of [span(l3, 0, 2), span(l3, 8, 10)]) zeroPair(g, mid(r) - zs / 2, 716, zs, kz, { show });
    eq(g, P.l4, 96, 900, 64, prog(t, T.zero58, T.two58 + 0.2));
    // 59 · vậy 0 × 2 = 0 — luật không cho lựa chọn khác
    quote(g, 'so', 440, 898, prog(t, T.so59, T.so59 + 0.2), { size: 44, color: C.dim });
    if (!noRes) this.result(g, this.RES.x, this.RES.y, prog(t, T.zero59 - 0.95, T.zero59), prog(t, T.zero59, T.zero59 + 0.55));
    label(g, 'the rules leave it no choice', this.RES.x, 985, prog(t, T.but, T.choice + 0.3), { color: C.ink, size: 20 });
    // cột chữ: cùng các dòng ấy với b
    const L = (s, y, a, b, col = C.dim, size = 24) => mono(g, s, LX, y, prog(t, a, b), col, size);
    L('0·b = (0 + 0)·b', 460, T.two55c, T.two55c + 0.7);
    L('    = 0·b + 0·b', 560, T.two56, T.two56 + 0.6);
    L('0·b = 0·b + 0·b', 680, T.two57, T.two57 + 0.6);
    L('0 = 0·b', 900, T.two58, T.two58 + 0.5);
    L('0·b = 0', 985, T.zero59 + 0.1, T.zero59 + 0.6, C.ink, 30);
    ring(g, LX + 64, 975, 100, 36, prog(t, T.zero59 + 0.5, T.zero59 + 1.0), { color: C.ink, w: 3, seed: 13 });
  }
  render(g, t) {
    ground(g, 'mat', 0, 0);
    this.body(g, t);
    card(g, prog(t, this.FROM + 0.4, this.FROM + 1.6), ACT, Zero.NAME);
  }
}
