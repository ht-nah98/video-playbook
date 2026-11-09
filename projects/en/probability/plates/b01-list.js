// b01 · ACT ONE "Part of the whole" · câu p2 0–8. Mở từ khung cuối p1 (trang trắng + MỘT xúc xắc đỏ ở DIE_END), thẻ hồi ACT ONE.
//  câu 0  xúc xắc trượt sang trái; "one … six" → 6 ô mặt xúc xắc viết lần lượt thành HÀNG (danh sách).
//  câu 1  ngoặc nhọn dưới hàng + nhãn "sample space".
//  câu 2  "six" → ô 6 tô dạ vàng; "one item" → "1".  câu 3  phân số 1/6 viết ra ("part" / "whole" nhãn nhỏ).
//  câu 4  "even" → 2, 4, 6 tô vàng; "one half" → 3/6 = 1/2.   câu 5  "seven" → ô "7" vẽ ngoài hàng, gạch đỏ; "zero" → 0.
//  câu 6  "one to six" → cả hàng tô vàng; "one" → 1.   câu 7–8  đường xác suất 0–1 kẻ thước; các chấm 0, 1/6, 1/2, 1 rơi lên đúng chỗ;
//         người que đứng trên vạch 1/6, "bigger" → chạy tới đầu 1 dừng lại, "smaller" → chạy về 0.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, frac, hi, ring, strike, die, actCard, probLine,
  lineX, gambler, POSE, N, hand, seg, must } from '../kit.js';
import { DIE_END } from './a1-letter.js';
import { mascot, pose } from './g-common.js';

const ROW = { x0: 360, y: 400, s: 150, gap: 40 };            // hàng 6 mặt
const cellX = i => ROW.x0 + i * (ROW.s + ROW.gap) + ROW.s / 2;
const PL = { x0: 360, x1: 1560, y: 860 };                      // đường 0–1

export default class List {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      lands0: w(0, 'lands'), nums: [w(0, 'one', 2), ...['two', 'three', 'four', 'five', 'six'].map(x => w(0, x))],
      space1: w(1, 'space'), e1: E(1),
      six2: w(2, 'six'), item2: w(2, 'item'), l3: S(3), part3: w(3, 'part'), whole3: w(3, 'whole'),
      even4: w(4, 'even'), half4: w(4, 'half'),
      seven5: w(5, 'seven'), none5: w(5, 'none'), zero5: w(5, 'zero'),
      one6: w(6, 'one'), six6: w(6, 'six'), whole6: w(6, 'whole'), one6b: w(6, 'one', 2),
      line7: w(7, 'line'), zero7: w(7, 'zero'), one7: w(7, 'one'), rule7: w(7, 'rule'),
      bigger8: w(8, 'bigger'), smaller8: w(8, 'smaller'), e8: E(8),
    };
    this.START = S(0);
    this.FROM = -3.0;
    must(`${N.sevens}`, 6);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 2.2, 'pen'), ...T.nums.map(t => c(t, 'tick')), c(T.space1, 'pen'), c(T.six2, 'pop'), c(T.l3, 'pen'),
      c(T.even4, 'pop'), c(T.seven5, 'error'), c(T.one6, 'pop'), c(T.line7, 'pen'), c(T.bigger8, 'whoosh')];
  }
  render(g, t) {
    const T = this.T, S0 = this.START;
    paper(g);
    actCard(g, prog(t, S0 - 2.6, S0 - 1.6) * (1 - prog(t, S0 - 0.5, S0 - 0.1)), 'ACT ONE', 'A probability is a count');
    // xúc xắc từ khung cuối p1 trượt lên trái, rồi thành ô đầu hàng
    const kd = prog(t, S0 - 3.0, S0 - 2.5);                     // dọn chỗ cho thẻ hồi ngay khi trang mở
    if (t >= S0 - 3) die(g, lerp(DIE_END.x, 200, outCubic(kd)), lerp(DIE_END.y, ROW.y, outCubic(kd)), lerp(DIE_END.s, 110, outCubic(kd)), 6, C.dieA);
    // hàng 6 mặt (danh sách)
    const evenK = prog(t, T.even4, T.even4 + 0.6) * (1 - prog(t, T.seven5 - 0.3, T.seven5));
    const allK = prog(t, T.one6, T.whole6) * (1 - prog(t, T.line7 - 0.3, T.line7));
    for (let i = 0; i < 6; i++) {                       // ô chờ nét chì: danh sách sắp viết (trang không trống trong lúc chờ "one … six")
      const x0 = cellX(i) - ROW.s / 2 + 6, y0 = ROW.y - ROW.s / 2 + 6, kb0 = prog(t, S0 + 0.2 + i * 0.12, S0 + 0.6 + i * 0.12);
      hand(g, [[x0, y0], [x0 + ROW.s - 12, y0], [x0 + ROW.s - 12, y0 + ROW.s - 12], [x0, y0 + ROW.s - 12], [x0, y0]], { w: 2.5, color: C.pencil, k: kb0, seed: 50 + i });
    }
    write(g, 'everything that could happen', cellX(0) - ROW.s / 2, ROW.y - 120, prog(t, S0 + 0.4, T.nums[0]), { font: `700 44px ${AR}`, color: C.ink2 });
    for (let i = 0; i < 6; i++) {
      const x = cellX(i), k = prog(t, T.nums[i] - 0.05, T.nums[i] + 0.3);
      if (i === 5) hi(g, x - ROW.s / 2 - 6, ROW.y - ROW.s / 2 - 6, ROW.s + 12, ROW.s + 12, prog(t, T.six2, T.six2 + 0.4) * (1 - prog(t, T.even4 - 0.3, T.even4)));
      if (i % 2 === 1) hi(g, x - ROW.s / 2 - 6, ROW.y - ROW.s / 2 - 6, ROW.s + 12, ROW.s + 12, evenK);
      hi(g, x - ROW.s / 2 - 6, ROW.y - ROW.s / 2 - 6, ROW.s + 12, ROW.s + 12, allK);
      die(g, x, ROW.y, ROW.s * 0.8, i + 1, C.dieA, { k });
    }
    // ngoặc + "sample space"
    const kb = prog(t, T.space1 - 0.4, T.space1 + 0.3);
    if (kb > 0) { const y = ROW.y + 110; hand(g, [[cellX(0) - 70, y], [cellX(0) - 70, y + 24], [(cellX(0) + cellX(5)) / 2, y + 24], [(cellX(0) + cellX(5)) / 2, y + 44], [(cellX(0) + cellX(5)) / 2, y + 24], [cellX(5) + 70, y + 24], [cellX(5) + 70, y]], { w: 5, k: kb, seed: 4 });
      write(g, 'sample space', (cellX(0) + cellX(5)) / 2, y + 100, kb, { font: `800 52px ${AR}`, color: C.ink, align: 'center' }); }
    // phân số bên phải hàng: 1/6 → 3/6 = 1/2 → 0 → 1 (mỗi cái thay cái trước)
    const FX = 1640, FY = 430;
    const stage = t < T.even4 ? 0 : t < T.seven5 ? 1 : t < T.one6 ? 2 : 3;
    const fk = prog(t, [T.l3, T.half4 - 0.4, T.zero5 - 0.2, T.one6b - 0.2][stage], [T.l3, T.half4 - 0.4, T.zero5 - 0.2, T.one6b - 0.2][stage] + 0.6);
    const fade = 1 - prog(t, T.line7 - 0.4, T.line7);
    if (fade > 0 && fk > 0) { g.save(); g.globalAlpha = fade;
      if (stage === 0) { frac(g, 1, 6, FX, FY, fk, { size: 110 });
        write(g, 'part', FX + 110, FY - 50, prog(t, T.part3, T.part3 + 0.3), { font: `600 32px ${AR}`, color: C.ink2 });
        write(g, 'whole', FX + 110, FY + 80, prog(t, T.whole3, T.whole3 + 0.3), { font: `600 32px ${AR}`, color: C.ink2 }); }
      if (stage === 1) { frac(g, 3, 6, FX - 70, FY, fk, { size: 90 }); write(g, '= 1/2', FX + 10, FY + 30, prog(t, T.half4, T.half4 + 0.4), { font: `800 70px ${AR}`, color: C.ink }); }
      if (stage === 2) big(g, '0', FX, FY + 40, fk, { size: 150 });
      if (stage === 3) big(g, '1', FX, FY + 40, fk, { size: 150 });
      g.restore(); }
    // "7" ngoài hàng — không có trong danh sách
    const k7 = prog(t, T.seven5, T.seven5 + 0.3) * fade;
    if (k7 > 0) { g.save(); g.globalAlpha = fade; big(g, '7', 1640, 700, k7, { size: 120, color: C.lose }); strike(g, 1590, 720, 1700, 620, prog(t, T.none5, T.none5 + 0.4)); g.restore(); }
    // đường xác suất 0–1
    const kl = prog(t, T.line7 - 0.3, T.zero7 + 0.6);
    if (kl > 0) {
      probLine(g, PL.x0, PL.x1, PL.y, kl);
      const marks = [[1 / 6, '1/6', T.zero7], [0.5, '', T.one7]];
      for (const [p, s, at] of marks) { const k = prog(t, at, at + 0.3); if (k > 0) { g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(lineX(PL.x0, PL.x1, p), PL.y, 12 * k, 0, 7); g.fill(); g.restore();
        if (s) write(g, s, lineX(PL.x0, PL.x1, p), PL.y + 66, k, { font: `800 40px ${AR}`, color: C.ink, align: 'center' }); } }
      // người que trên đường: đứng ở 1/6 → "bigger" chạy tới 1 → "smaller" chạy về 0, chạm vạch rồi dừng
      const ka = prog(t, T.bigger8, T.bigger8 + 0.7), kb2 = prog(t, T.smaller8, T.smaller8 + 0.9);
      const u = kb2 > 0 ? lerp(1, 0, outCubic(kb2)) : lerp(1 / 6, 1, outCubic(ka));
      const moving = (ka > 0 && ka < 1) || (kb2 > 0 && kb2 < 1);
      gambler(g, lineX(PL.x0, PL.x1, u), PL.y - 4, 170, moving ? pose('stand', 'push', 0.5 + 0.5 * Math.sin(t * 14)) : (ka >= 1 && kb2 <= 0 ? POSE.balance : POSE.stand), { dir: kb2 > 0 ? -1 : 1, a: prog(t, T.zero7, T.zero7 + 0.3) });
      write(g, 'not a rule — just counting', PL.x0, PL.y + 140, prog(t, T.rule7, T.rule7 + 0.6) * (1 - prog(t, T.e8, T.e8 + 0.3)), { font: `600 36px ${AR}`, color: C.ink2 });
    }
    mascot(g, t, 'pointer', S0 + 0.4, { x: 1780 });
  }
}
