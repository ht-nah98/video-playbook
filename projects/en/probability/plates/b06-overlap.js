// b06 · "Where the extra comes from" · câu p2 29–33.
//  câu 29  bốn ô "roll 1…4" (một ván); "counts every roll" → mỗi ô có chip "+1/6" khi có 6.
//  câu 30  ván mẫu: 6 · 2 · 6 · 4; "first" và "third" → chip dạ vàng ở ô 1 và 3; "twice" → ngoặc chung "ONE game, counted TWICE".
//  câu 31  "together" → hai vòng tròn chồng nhau ("6 on roll 1" | "6 on roll 3"), phần chồng tô cam.
//  câu 32  "messy" → danh sách ca viết chồng chéo (first / second / both / three…) ngày càng rối.
//  câu 33  "opposite" → giấy note "FLIP" bật ra, lật ngược.
import { W, H, C, AR, MO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, strike, die, note, hand, seg, arrow } from '../kit.js';
import { mascot } from './g-common.js';

const GAME = [6, 2, 6, 4];
const BX = i => 220 + i * 230, BY = 330;

export default class Overlap {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b06');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l29: S(29), counts29: w(29, 'counts'), appears29: w(29, 'appears'),
      l30: S(30), first30: w(30, 'first'), third30: w(30, 'third'), twice30: w(30, 'twice'), e30: E(30),
      together31: w(31, 'together'), different31: w(31, 'different'), e31: E(31),
      messy32: w(32, 'messy'), first32: w(32, 'first'), second32: w(32, 'second'), both32: w(32, 'both'), three32: w(32, 'three'), e32: E(32),
      opposite33: w(33, 'opposite'), e33: E(33),
    };
    this.START = S(29);
    this.FROM = S(29) - 0.5;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l29, 'dice'), c(T.first30, 'pop'), c(T.third30, 'pop'), c(T.twice30, 'error'), c(T.together31, 'pen'), c(T.messy32, 'pen'), c(T.opposite33, 'flap')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    write(g, 'one game, four rolls', 220, 170, prog(t, T.l29, T.l29 + 0.8), { font: `800 52px ${AR}`, color: C.ink });
    for (let i = 0; i < 4; i++) {
      const x = BX(i), k = prog(t, T.l29 + 0.2 + i * 0.25, T.l29 + 0.5 + i * 0.25);
      hand(g, [[x - 90, BY - 90], [x + 90, BY - 90], [x + 90, BY + 90], [x - 90, BY + 90], [x - 90, BY - 90]], { w: 3, color: C.pencil, k, seed: i + 2 });
      write(g, `roll ${i + 1}`, x, BY + 136, k, { font: `600 32px ${AR}`, color: C.ink2, align: 'center' });
      die(g, x, BY, 120, GAME[i], C.dieA, { k: prog(t, T.counts29 - 0.4 + i * 0.12, T.counts29 + i * 0.12) });
      if (GAME[i] === 6) { const at = i === 0 ? T.first30 : T.third30;
        hi(g, x - 70, BY + 160, 140, 54, prog(t, at, at + 0.4)); calc(g, '+1/6', x, BY + 200, prog(t, T.appears29 - 0.2, T.appears29 + 0.3), { size: 40, color: C.ink, align: 'center' }); }
    }
    // ngoặc chung roll 1 + roll 3 → counted twice
    const kt = prog(t, T.twice30, T.twice30 + 0.6);
    if (kt > 0) { const y = BY + 240; hand(g, [[BX(0), y], [BX(0), y + 34], [BX(2), y + 34], [BX(2), y]], { w: 5, color: C.lose, k: kt, seed: 6 });
      write(g, 'one game, counted twice', (BX(0) + BX(2)) / 2, y + 96, kt, { font: `800 46px ${AR}`, color: C.lose, align: 'center' }); }
    // hai vòng chồng nhau
    const kv = prog(t, T.together31 - 0.3, T.together31 + 0.6);
    if (kv > 0) { const cx = 1440, cy = 380, r = 170;
      g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(226,112,30,0.35)'; g.beginPath(); g.arc(cx - 90, cy, r, 0, 7); g.clip(); g.beginPath(); g.arc(cx + 90, cy, r, 0, 7); g.fill(); g.restore();
      ring(g, cx - 90, cy, r, r, kv, { color: C.ink, w: 4, seed: 3 }); ring(g, cx + 90, cy, r, r, prog(t, T.together31, T.different31), { color: C.ink, w: 4, seed: 4 });
      write(g, '6 on roll 1', cx - 150, cy - r - 30, kv, { font: `700 34px ${AR}`, color: C.ink, align: 'center' });
      write(g, '6 on roll 3', cx + 150, cy - r - 30, prog(t, T.together31, T.different31), { font: `700 34px ${AR}`, color: C.ink, align: 'center' });
      write(g, 'both', cx, cy + 12, prog(t, T.different31, T.e31), { font: `800 40px ${AR}`, color: C.orangeInk, align: 'center' }); }
    // danh sách ca rối dần
    const CASES = [['six on roll 1', T.first32], ['or roll 2', T.second32], ['or both', T.both32], ['or three of them…', T.three32]];
    CASES.forEach(([s, at], i) => write(g, s, 980 + i * 22, 700 + i * 62, prog(t, at - 0.2, at + 0.4), { font: `600 40px ${MO}`, color: C.ink2, rot: (i % 2 ? 0.04 : -0.05) }));
    write(g, 'messy', 1400, 660, prog(t, T.messy32, T.messy32 + 0.4), { font: `800 46px ${AR}`, color: C.lose, rot: -0.1 });
    // FLIP
    note(g, 360, 760, 300, 200, prog(t, T.opposite33, T.opposite33 + 0.4), { col: C.note[1], rot: -0.05, num: 2, title: 'FLIP', body: ['count the opposite'] });
    mascot(g, t, 'pointer', -1, { x: 1780 });
  }
}
