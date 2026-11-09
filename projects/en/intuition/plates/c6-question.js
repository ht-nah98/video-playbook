// c6 · A different question (p2, cuối Hồi II). Hai cột như hai thí sinh, mỗi cột một bảng điểm lật + thẻ trực giác:
//   trái  "MONTY HALL": thẻ "50/50" thu nhỏ đã X từ b2 (vẽ nguyên trạng, KHÔNG buzzer) → "WRONG ANSWER" · "SWITCH: 2/3";
//   phải  "0.999…": thẻ "STILL A LITTLE SHORT" KHÔNG X → "NOT EXACTLY WRONG" → "DIFFERENT QUESTION"; "a world with
//     infinitely small distances" → dán nhãn in "A DIFFERENT NUMBER SYSTEM" (đúng lab khung 1); "FEELS: TINY GAPS" ·
//     "REALS: NO GAPS"; "which number system" → khoanh mực quanh nhãn; "about the symbol" → tiêu đề lật "0.999… = 1".
//   Nhân vật `shrug` (phải) ở "isn't exactly wrong … a slightly different question".
import { C, FLOOR, clamp, outCubic, prog, ground, bulbs, flap, flapW, ctr, gutCard, textW, MONO, card, figure, lookup, must } from '../kit.js';

const N = 18, CELL = 32, GAP = 4, RH = 52, RG = 58, BY = 168;    // hai bảng điểm 3 hàng × 18 ô
const LX = 166, RX = 926;                                        // mép trái ô đầu (bảng = ô − 46)
const BW = flapW(N, CELL, GAP);
const LCARD = [470, 650, 420, 200, -0.05], RCARD = [1110, 660, 580, 280, 0.035];   // x, y, w, h, rot

function rowsAt(t, S, n, n0) {
  const cur = Array(n).fill(' '.repeat(n0)), prev = cur.slice(), k = Array(n).fill(1);
  for (const [at, rows, lag = 0.25] of S) {
    if (t < at) break;
    let j = 0;
    rows.forEach((s, i) => { if (s == null) return; prev[i] = cur[i]; cur[i] = s; const a = at + j * lag; k[i] = prog(t, a, a + 1.1); j++; });
  }
  return { cur, prev, k };
}

export default class Question {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c6');
    this.T = {
      difference: w(94, 'difference'), monty: w(94, 'monty'), wrong95: w(95, 'wrong'), simple: w(95, 'simple'),
      here: w(96, 'here'), isnt: w(96, "isn't"), different: w(96, 'different'), asked: w(96, 'asked'),
      world: w(97, 'world'), small: w(97, 'small'), defined: w(97, 'defined'),
      which: w(98, 'which'), symbol: w(98, 'symbol'), end: L(98).end,
    };
    const T = this.T;
    this.START = L(94).start; this.FROM = this.START - 1.2;
    const gut = must('1 / 2 * 100', 50); this.GUT = `${gut}/${gut}`;
    must('1 - 1 / 3', 2 / 3); this.SW = 'SWITCH: 2/3';
    this.LS = [[T.monty, ['MONTY HALL', ' ', ' ']], [T.wrong95, [null, 'WRONG ANSWER', this.SW], T.simple - T.wrong95 - 0.2]]
      .map(([at, r, lag]) => [at, r.map(s => s == null ? null : ctr(s, N)), lag]);
    this.RS = [
      [T.difference, ['0.999…', ' ', ' ']],
      [T.isnt, [null, 'NOT EXACTLY WRONG', null]],
      [T.different, [null, 'DIFFERENT QUESTION', null]],
      [T.small, [null, null, 'FEELS: TINY GAPS']],
      [T.defined, [null, null, 'REALS: NO GAPS']],
      [T.symbol, ['0.999… = 1', null, null]],
    ].map(([at, r]) => [at, r.map(s => s == null ? null : ctr(s, N))]);
  }
  sfx() {
    return [...this.LS.map(([t]) => ({ t, kind: 'flap' })), ...this.RS.map(([t]) => ({ t, kind: 'flap' })),
      { t: this.T.world, kind: 'chip' }];
  }

  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g);
    this.board(g, t, LX, this.LS);
    this.board(g, t, RX, this.RS);
    // trái: thẻ "50/50" đã X (nguyên trạng b2), bật lên ở "Monty Hall"
    const [lx, ly, lw, lh, lr] = LCARD;
    gutCard(g, this.GUT, lx, ly, lw, lh, 1, { state: 'x', kx: 1, rise: prog(t, T.monty - 0.3, T.monty + 0.2), rot: lr, seed: 31 });
    // phải: "STILL A LITTLE SHORT" — KHÔNG X; nhãn in dán ở "a world with infinitely small distances"
    const [rx, ry, rw, rh, rrot] = RCARD;
    gutCard(g, 'STILL A\nLITTLE SHORT', rx, ry, rw, rh, 1, { state: 'label', label: 'a different number system', kx: prog(t, T.world, T.world + 0.3),
      rise: prog(t, F + 0.3, F + 0.75), rot: rrot, seed: 47 });
    this.ring(g, t);
    const ks = Math.min(prog(t, T.here - 0.2, T.here + 0.15), 1 - prog(t, T.asked + 0.6, T.asked + 1.0));
    if (ks > 0) figure(g, 'shrug', 1668, 1080, 700, ks);
    card(g, prog(t, F + 0.3, F + 1.0), 'ACT TWO', 'A DIFFERENT QUESTION');
  }

  board(g, t, x, S) {
    const { cur, prev, k } = rowsAt(t, S, 3, N);
    bulbs(g, x - 46, BY - 46, BW + 92, 3 * RG - 6 + 92, t + (x === RX ? 0.37 : 0));
    cur.forEach((s, i) => flap(g, s, x, BY + i * RG, CELL, k[i], { from: prev[i], gap: GAP, h: RH }));
  }

  // khoanh mực (màu mực nhãn, không phải màu nghĩa) quanh nhãn "A DIFFERENT NUMBER SYSTEM" ở "which number system"
  ring(g, t) {
    const k = outCubic(prog(t, this.T.which, this.T.which + 0.7)); if (k <= 0) return;
    const [rx, ry, rw, rh, rot] = RCARD, size = Math.round(clamp(rh / 270, 0.6, 1.2) * 23);
    const tw = textW('A DIFFERENT NUMBER SYSTEM', size, { f: MONO, w: 500, ls: 2.5 }) + 2 * size * 1.1 + 16;
    g.save(); g.translate(rx, ry); g.rotate(rot); g.translate(rw * 0.08, rh * 0.33);
    g.strokeStyle = C.label; g.lineWidth = 5; g.lineCap = 'round';
    const a0 = -2.6, a1 = a0 + Math.PI * 2.12 * k;
    g.beginPath(); for (let a = a0; a <= a1; a += 0.04) { const r = 1 + 0.03 * Math.sin(a * 3); const px = Math.cos(a) * (tw / 2 + 26) * r, py = Math.sin(a) * (size * 1.2 + 12) * r - 2;
      a === a0 ? g.moveTo(px, py) : g.lineTo(px, py); } g.stroke();
    g.restore();
  }
}
