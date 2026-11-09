// b08 · "The second bet" · câu p2 42–52.
//  câu 42–43  lưới 36 (thu nhỏ, trái): ô (6,6) khoanh đỏ; "thirty-five" → 35 ô còn lại tô xanh → "miss = 35/36".
//  câu 44  "(35/36)²⁴" viết ra, chỉ số 24 tô vàng ("twenty-four times").
//  câu 45  "= 50.9%" (không đôi 6).   câu 46  "49.1%" đỏ + thanh 0–1 phóng to quanh 1/2: kim đứng NGAY DƯỚI vạch 1/2.
//  câu 47  "twenty-five" → kim nhích qua vạch: 50.6%.
//  câu 48  tờ thư trượt vào: "… arithmetic contradicts itself" (lời than của de Méré qua thư Pascal); người que giận dữ (dậm chân).
//  câu 49  "not" → gạch "arithmetic"; "adding rule" → dòng "24 × 1/36 = 2/3" hiện lại và bị gạch đỏ.
//  câu 50–52  giấy note "honest note": ≈ 13,000 games (vạch đếm dày đặc); "Pascal wrote it down" → thư đóng dấu.
import { W, H, C, AR, MO, CO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, letter, wax, note, tally, grid36,
  gambler, POSE, hand, seg, N, must } from '../kit.js';
import { mascot, pose } from './g-common.js';

const G = { x: 200, y: 200, c: 64 };
const ZL = { x0: 900, x1: 1700, y: 760, lo: 0.47, hi: 0.53 };     // thanh phóng to quanh 1/2
const zx = p => ZL.x0 + (p - ZL.lo) / (ZL.hi - ZL.lo) * (ZL.x1 - ZL.x0);

export default class Second {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['calculator', 'pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b08');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l42: S(42), double42: w(42, 'double'), e42: E(42),
      l43: S(43), thirtyFive43: w(43, 'thirty-five'), e43: E(43),
      l44: S(44), twentyFour44: w(44, 'twenty-four'), multiplied44: w(44, 'multiplied'), e44: E(44),
      half45: w(45, 'half'), fifty45: w(45, 'fifty'), e45: E(45),
      forty46: w(46, 'forty-nine'), under46: w(46, 'under'), loses46: w(46, 'loses'), e46: E(46),
      twentyFive47: w(47, 'twenty-five'), fifty47: w(47, 'fifty'), e47: E(47),
      l48: S(48), upset48: w(48, 'upset'), arithmetic48: w(48, 'arithmetic'), e48: E(48),
      not49: w(49, 'not'), adding49: w(49, 'adding'), e49: E(49),
      l50: S(50), honest50: w(50, 'honest'), playing50: w(50, 'playing'), e50: E(50),
      thirteen51: w(51, 'thirteen'), games51: w(51, 'games'), e51: E(51),
      reasoning52: w(52, 'reasoning'), down52: w(52, 'down'), e52: E(52),
    };
    this.START = S(42);
    this.FROM = S(42) - 0.5;
    must(`${N.games}`, 13);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.double42, 'pop'), c(T.thirtyFive43, 'pen'), c(T.twentyFour44, 'pen'), c(T.fifty45, 'pen'), c(T.forty46, 'error'), c(T.twentyFive47, 'tick'),
      c(T.l48, 'page'), c(T.not49, 'pen'), c(T.honest50, 'pop'), c(T.thirteen51, 'pen'), c(T.down52, 'hanko')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    const partA = 1 - prog(t, T.l48 - 0.3, T.l48 + 0.3);         // lưới + phép tính → nhường chỗ cho thư / ghi chú
    if (partA > 0) { g.save(); g.globalAlpha = partA;
      grid36(g, G.x, G.y, G.c, { k: prog(t, T.l42 - 0.3, T.l42 + 0.6), heads: prog(t, T.l42, T.double42), sums: 0, miss66: prog(t, T.thirtyFive43, T.e43 + 0.4) });
      write(g, 'miss = 35/36', G.x - 40, G.y + 6 * G.c + 100, prog(t, T.thirtyFive43, T.e43), { font: `800 56px ${AR}`, color: C.ink });
      write(g, '(35/36)²⁴', 900, 300, prog(t, T.l44, T.twentyFour44 + 0.6), { font: `800 96px ${AR}`, color: C.ink });
      hi(g, 1290, 220, 90, 70, prog(t, T.multiplied44, T.e44));
      write(g, '= 50.9%  no double 6', 900, 400, prog(t, T.half45 - 0.3, T.fifty45 + 0.8), { font: `700 50px ${AR}`, color: C.ink2 });
      must(`'${N.no24}'`, '50.9');
      const k46 = prog(t, T.forty46, T.forty46 + 0.4);
      if (k46 > 0) { big(g, N.p24 + '%', 900, 560, k46, { size: 130, color: C.lose, align: 'left' }); write(g, 'just under even', 1420, 540, prog(t, T.under46, T.loses46), { font: `700 40px ${AR}`, color: C.lose }); }
      // thanh phóng to quanh 1/2
      const kz = prog(t, T.under46 - 0.3, T.under46 + 0.4);
      if (kz > 0) { hand(g, seg(ZL.x0, ZL.y, ZL.x1, ZL.y, 30), { w: 5, k: kz, seed: 4 });
        const mx = zx(0.5); hand(g, seg(mx, ZL.y - 50, mx, ZL.y + 50, 4), { w: 6, k: kz, seed: 5 }); write(g, '1/2', mx, ZL.y + 96, kz, { font: `800 40px ${AR}`, color: C.ink, align: 'center' });
        const p = lerp(+N.p24 / 100, +N.p25 / 100, outCubic(prog(t, T.twentyFive47, T.fifty47 + 0.4)));
        g.save(); g.fillStyle = p > 0.5 ? C.win : C.lose; g.beginPath(); g.arc(zx(p), ZL.y, 15, 0, 7); g.fill(); g.restore();
        write(g, p > 0.5 ? `25 rolls: ${N.p25}%` : `24 rolls: ${N.p24}%`, zx(p), ZL.y - 70, kz, { font: `700 36px ${AR}`, color: p > 0.5 ? C.win : C.lose, align: 'center' }); }
      g.restore(); }
    // câu 48–49: tờ thư + lời than
    const kl = prog(t, T.l48 - 0.2, T.l48 + 0.6), klo = prog(t, T.l50 - 0.3, T.l50 + 0.3);
    if (kl > 0 && klo < 1) { g.save(); g.globalAlpha = 1 - klo;
      const L_ = letter(g, 260, 140, 1100, 470, kl, { rot: -0.015 });
      if (L_) { write(g, 'de Méré says that', 60, 110, prog(t, T.l48 + 0.3, T.upset48), { font: `italic 600 48px ${CO}`, color: C.iron2 });
        write(g, '"arithmetic contradicts itself"', 60, 220, prog(t, T.upset48, T.arithmetic48 + 1.0), { font: `700 66px ${CO}`, color: C.iron });
        strike(g, 80, 200, 470, 192, prog(t, T.not49, T.not49 + 0.4), { color: C.wax, w: 6 });
        write(g, 'Pascal to Fermat · 29 July 1654', 60, 400, kl, { font: `italic 600 36px ${CO}`, color: C.iron2 });
        L_.done(); }
      calc(g, '24 × 1/36 = 2/3', 420, 760, prog(t, T.adding49 - 0.3, T.adding49 + 0.3), { size: 56, color: C.ink });
      strike(g, 410, 742, 990, 734, prog(t, T.adding49 + 0.3, T.e49), { w: 7 });
      gambler(g, 1560, 900, 220, t < T.not49 ? pose('stand', 'kick', 0.5 + 0.5 * Math.sin(t * 9)) : POSE.facepalm, { dir: -1 });
      g.restore(); }
    // câu 50–52: ghi chú trung thực
    if (klo > 0) {
      note(g, 220, 160, 520, 260, klo, { col: C.note[3], rot: -0.02, title: 'honest note', body: ['felt by playing? doubtful'] });
      write(g, `≈ ${N.games},000 games`, 900, 300, prog(t, T.thirteen51 - 0.2, T.games51 + 0.4), { font: `800 80px ${AR}`, color: C.ink });
      write(g, 'to tell 49.1% from 50%', 900, 370, prog(t, T.thirteen51, T.e51), { font: `700 40px ${AR}`, color: C.ink2 });
      tally(g, 220, 520, 400, Math.pow(prog(t, T.honest50 + 0.3, T.e51 + 0.6), 2), { h: 40, gap: 11, perRow: 50, rowH: 56, seed: 3 });
      const kr = prog(t, T.reasoning52, T.reasoning52 + 0.4);
      if (kr > 0) { const L2 = letter(g, 1340, 600, 420, 260, kr, { rot: 0.03 }); if (L2) { write(g, 'the reasoning', 40, 110, 1, { font: `700 44px ${CO}`, color: C.iron }); write(g, '— written down', 40, 170, 1, { font: `italic 600 40px ${CO}`, color: C.iron2 });
        wax(g, 330, 190, prog(t, T.down52, T.down52 + 0.3), { letter: 'P' }); L2.done(); } }
    }
    mascot(g, t, t >= T.l48 ? 'pointer' : 'calculator', -1, { x: 1780 });
  }
}
