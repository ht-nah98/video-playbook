// e1 · Putting it together (p2 câu 112–117) — MỞ HỒI IV. Tóm tắt = vẽ lại thu nhỏ hình của từng hồi, không hình mới.
// Bảng treo: số câu hứa (bóng đèn) + câu hỏi lật vào (đúng chữ của mục lục a0). Ba cửa = ba câu hỏi, mở theo câu:
//   (1) sau cửa: ba cửa nhỏ (cửa 3 ra dê) + lá bài đỏ–đỏ; trước cửa: thẻ "50/50" đã X; nhãn "INFORMATION YOU DIDN'T COUNT"
//   (2) sau cửa: bảng "0.999… = 1" (ô 9 lật mãi); trước: thẻ "STILL A LITTLE SHORT" + nhãn hệ số; nhãn "A DIFFERENT QUESTION"
//   (3) sau cửa: bảng hổ phách "BRAKES"; trước: thẻ hồng "ENGINE"; nhãn "ENGINE + BRAKES"
// 115–117: đèn rọi cột 1 rồi cột 2, bảng lật "MOST CERTAIN? STOP AND CHECK." / "A DEEPER QUESTION…" / "TELLING THEM APART…".
import { W, H, C, FLOOR, clamp, smooth, outBack, prog, ground, reflect, bulbs, flap, flapW, flapSpin, ctr, bulbText, door,
  playingCard, gutCard, tag, textW, card, actTitle, figure, lookup, must } from '../kit.js';

const BN = 35, BC = 36, BG = 5, BH = 59, BFX = 130, BFY = 140, BX0 = 300, BY0 = 186;
const COL = [320, 780, 1220], DW = 230, DH = 380, DY = FLOOR - DH, TY = 832, CY = 935;

export default class Together {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.T = {
      wrong: w(112, 'wrong'), information: w(112, 'information'), count: w(112, 'count'), host: w(112, 'host'), card: w(112, 'card'),
      what2: L(113).start, gut1: w(113, 'gut'), ask: w(113, 'ask'), different: w(113, 'different'),
      q3: L(114).start, yes: w(114, 'yes'), engine: w(114, 'engine'), brakes: w(114, 'brakes'),
      monty: w(115, 'monty'), certain: w(115, 'certain'), stop: w(115, 'stop'),
      zero: w(116, 'zero'), pointing: w(116, 'pointing'), deeper: w(116, 'deeper'),
      telling: w(117, 'telling'), those: w(117, 'those'), interesting: w(117, 'interesting'), end: L(117).end,
    };
    this.START = L(112).start;
    this.FROM = Math.max(this.START - 2.6, L(111).end + 0.5);
    const T = this.T, q1 = this.START + 0.25;
    // [lúc, chuỗi, số đèn (0 = tắt)] — ba câu đầu đúng chữ mục lục lời hứa ở a0
    this.BOARD = [
      [q1, 'WHEN DOES INTUITION LEAD YOU WRONG?', must('0 + 1', 1)],
      [T.what2, 'PROOF RIGHT, GUT SAYS NO. NOW WHAT?', must('1 + 1', 2)],
      [T.q3, 'DOES MATH NEED INTUITION AT ALL?', must('2 + 1', 3)],
      [T.certain, 'MOST CERTAIN? STOP AND CHECK.', 1],
      [T.pointing, 'A DEEPER QUESTION, WORTH DIGGING', 2],
      [T.those, 'TELLING THEM APART IS THE HARD PART', 0],
    ];
    for (const [, s] of this.BOARD) if ([...s].length > BN) throw new Error('e1: hàng quá ' + BN + ' ô: ' + s);
    this.TAGS = [['information you didn\'t count', T.count], ['a different question', T.different], ['engine + brakes', T.brakes]];
    const tw = this.TAGS.map(([s]) => textW(s.toUpperCase(), 18, { f: '"IBM Plex Mono"', w: 500, ls: 2.5 }) + 2 * 18 * 1.1 + 16);
    if (COL[0] - tw[0] / 2 < 96 || COL[0] + tw[0] / 2 > COL[1] - tw[1] / 2 - 20) throw new Error('e1: nhãn cột chạm mép / chạm nhau ' + tw);
    this.V = { gut: must('1 / 2 * 100', 50) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: this.BOARD[0][0], kind: 'flap' }, { t: T.count, kind: 'door' }, { t: T.what2, kind: 'flap' }, { t: T.ask, kind: 'door' },
      { t: T.q3, kind: 'flap' }, { t: T.brakes, kind: 'correct' },
      { t: T.certain, kind: 'flap' }, { t: T.pointing, kind: 'flap' }, { t: T.those, kind: 'flap' },
    ];
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    const opens = [T.count, T.ask, T.yes];
    reflect(g, FLOOR, d => {
      COL.forEach((c, i) => door(d, c - DW / 2, DY, DW, DH, i + 1, smooth(prog(t, opens[i], opens[i] + 0.55)), { behind: (b, x, y) => this.behind(b, i, x, y, t) }));
    });
    // nhãn dán dưới chân mỗi cửa
    this.TAGS.forEach(([s, at], i) => tag(g, s, COL[i], TY, prog(t, at, at + 0.3), { rot: i === 1 ? 0.03 : -0.03, size: 18 }));
    // thẻ trực giác đứng trước cửa — đúng trạng thái đã có (X ở 50/50, nhãn ở STILL A LITTLE SHORT, hồng ở ENGINE)
    gutCard(g, `${V.gut}/${V.gut}`, COL[0], CY, 250, 125, 1, { state: 'x', kx: 1, rise: prog(t, T.wrong - 0.3, T.wrong + 0.2), rot: -0.05, seed: 31 });
    gutCard(g, 'STILL A\nLITTLE SHORT', COL[1], CY, 340, 160, 1, { state: 'label', label: 'a different number system', kx: 1,
      rise: prog(t, T.gut1 - 0.3, T.gut1 + 0.2), rot: 0.04, seed: 47 });
    gutCard(g, 'ENGINE', COL[2], CY, 250, 125, prog(t, T.engine, T.engine + 0.6), { rise: prog(t, T.engine - 0.35, T.engine + 0.1), rot: -0.03, seed: 61 });
    // đèn rọi: cột 1 ở "like Monty Hall", cột 2 ở "like zero point nine", cả hai ở "telling those two apart"
    const a1 = prog(t, T.monty - 0.3, T.monty + 0.2) * (1 - prog(t, T.zero - 0.3, T.zero + 0.2));
    const a2 = prog(t, T.zero - 0.3, T.zero + 0.2) * (1 - prog(t, T.telling - 0.3, T.telling + 0.2));
    const a3 = prog(t, T.telling - 0.3, T.telling + 0.2);
    const dim = [a2, a1, a1 + a2 + a3].map(v => 0.2 * clamp(v));    // tối vừa đủ để cột kia lùi, chữ sau cửa vẫn đọc được
    if (dim.some(v => v > 0)) {
      const gr = g.createLinearGradient(0, 0, W, 0), st = (x, a) => gr.addColorStop(clamp(x / W), `rgba(10,5,6,${a})`);
      st(0, dim[0]); st(490, dim[0]); st(600, dim[1]); st(960, dim[1]); st(1060, dim[2]); st(W, dim[2]);
      g.fillStyle = gr; g.fillRect(0, 370, W, H - 370);
    }
    this.board(g, t);
    tag(g, 'and the interesting part', 960, 336, prog(t, T.interesting, T.interesting + 0.3), { rot: -0.02, size: 20 });
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'act four', 'putting it together');
    const ko = prog(t, T.telling - 0.1, T.telling + 0.3);
    if (ko > 0) figure(g, 'ok', 1700, 1080, 720, ko);
    actTitle(g, t, this.START, 'four', 'PUTTING IT TOGETHER');
  }

  behind(b, i, x, y, t) {
    const T = this.T;
    if (i === 0) {                                          // ba cửa nhỏ (cửa 3 ra dê) + lá bài đỏ–đỏ ở "a card with two red sides"
      [0, 1, 2].forEach(j => door(b, x + 22 + j * 66, y + DH - 104, 50, 92, j + 1, j === 2 ? 1 : 0, { behind: 'goat' }));
      const kc = outBack(prog(t, T.card - 0.1, T.card + 0.35));
      if (kc > 0) { b.save(); b.translate(x + DW / 2, y + 120); b.scale(kc, kc);
        playingCard(b, -30, 0, 52, 78, 'RR', 0, 0, { rot: -0.06 }); playingCard(b, 30, 0, 52, 78, 'RR', 1, 0, { rot: 0.06 }); b.restore(); }
    } else if (i === 1) {                                   // bảng 0.999… = 1, ô 9 lật mãi
      this.glow(b, x, y);
      const s = '0.999…=1', c = 25, gp = 3, fx = x + (DW - flapW(s, c, gp)) / 2, fy = y + 140;
      flap(b, s, fx, fy, c, 1, { gap: gp });
      flapSpin(b, '9', fx + 4 * (c + gp), fy, c, t);
    } else {                                                // bảng hổ phách BRAKES
      this.glow(b, x, y);
      const s = 'BRAKES', c = 33, gp = 4, fx = x + (DW - flapW(s, c, gp)) / 2;
      flap(b, s, fx, y + 140, c, prog(t, T.yes + 0.3, T.brakes + 0.1), { gap: gp });
    }
  }

  glow(b, x, y) {                                          // đèn rọi ấm trong ô cửa để bảng nhỏ đọc được
    const rg = b.createRadialGradient(x + DW / 2, y + 165, 10, x + DW / 2, y + 165, 170);
    rg.addColorStop(0, 'rgba(255,200,140,0.35)'); rg.addColorStop(1, 'rgba(255,200,140,0)'); b.fillStyle = rg; b.fillRect(x, y, DW, DH);
  }

  board(g, t) {
    const fw = BX0 - BFX + flapW(BN, BC, BG) + 46, fh = BH + 92;
    bulbs(g, BFX, BFY, fw, fh, t);
    let s = ' '.repeat(BN), p = s, k = 1, n = 0, pn = 0, kn = 1;
    for (const [at, str, num] of this.BOARD) { if (t < at) break; p = s; s = ctr(str, BN); k = prog(t, at, at + 1.5); pn = n; n = num; kn = prog(t, at - 0.05, at + 0.3); }
    const nx = BFX + 88, ny = BFY + 42;
    if (n) bulbText(g, String(n), nx, ny, 70, kn, { align: 'center', pitch: 7, r: 2.8 });
    else if (pn) bulbText(g, String(pn), nx, ny, 70, 0, { align: 'center', pitch: 7, r: 2.8 });
    flap(g, s, BX0, BY0, BC, k, { from: p, gap: BG, h: BH });
  }
}
