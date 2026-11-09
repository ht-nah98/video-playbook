// c2 · Two quick proofs (p2, hồi hai) — hai bảng lật ghi chép cạnh nhau:
//   ARGUMENT 1 · A FRACTION:  1/3 = 0.333… · ×3 ×3 · 1 = 0.999… · 0.999… = 1
//   ARGUMENT 2 · ALGEBRA:     x = 0.999… · 10x = 9.999… · 10x − x → 9x = 9 · x = 1   ("đuôi triệt nhau" = phủ tối đuôi 999…)
//   "both … convincing" → khoanh mực hai dòng kết luận; "shortcut" → hai bảng trượt phải, mascot `pointer` trồi lên trái,
//   nhãn in "SHORTCUT" dán lên CẢ HAI bảng (mực, KHÔNG X); bảng dài "ARITHMETIC ON ENDLESS DECIMALS?" lật vào theo
//   "add, subtract, multiply, divide endless decimals"; "your gut doesn't trust" → thẻ "STILL A LITTLE SHORT" bật lên trái.
import { W, H, C, FLOOR, smooth, outCubic, outBack, prog, ground, reflect, bulbs, flap, flapW, flapSpin, ctr, gutCard, tag,
  label, textW, card, figure, lookup, must } from '../kit.js';

const N = 13, CELL = 40, GAP = 5, CH = 65, PITCH = CELL + GAP, RP = 80;   // bảng ghi: 13 ô × 4 hàng, chữ 48 px
const BW = flapW(N, CELL, GAP), PAD = 40, MW = BW + 2 * PAD, BGAP = 30;
const X0 = Math.round((W - 2 * MW - BGAP) / 2), SC = 0.86, SHIFT = 610 - X0;   // "but honestly": hai bảng lùi về 0.86 và trượt phải (chỗ cho nhân vật)
const MY = 140, HY = MY + 62, RY = MY + 86, MH = RY + 3 * RP + CH + PAD - MY;
const NB = 31, BC = 32, BG = 4, BH = 52, BBW = flapW(NB, BC, BG), BMW = BBW + 80, BMH = BH + 80, BY = 600;   // bảng dài: chữ 38 px

export default class Proofs {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      couple: w(63, 'couple'), arguments: w(63, 'arguments'), equal63: w(63, 'equal'),
      first: w(64, 'first'), fraction: w(64, 'fraction'), third: w(64, 'third'), zero64: w(64, 'zero'), threes: w(64, 'threes'), forever64: w(64, 'forever'),
      multiply: w(65, 'multiply'), three65: w(65, 'three'), one65: w(65, 'one'), zero65: w(65, 'zero'), forever65: w(65, 'forever'),
      so66: w(66, 'so'), one66: w(66, 'one'),
      second: w(67, 'second'), algebra: w(67, 'algebra'),
      call: w(68, 'call'), x68: w(68, 'x'), ten68: w(68, 'ten'), repeating68: w(68, 'repeating', 2),
      subtract: w(69, 'subtract'), endless: w(69, 'endless'), cancel: w(69, 'cancel'), nine69: w(69, 'nine'), equals69: w(69, 'equals'),
      so69: w(69, 'so'), one69: w(69, 'one'),
      both1: w(70, 'both'), both2: w(70, 'both', 2),
      but: w(71, 'but'), shortcut: w(71, 'shortcut'),
      assume: w(72, 'assume'), add: w(72, 'add'), decimals: w(72, 'decimals'), just: w(72, 'just'), numbers72: w(72, 'numbers'),
      part: w(72, 'part'), gut: w(72, 'gut'), doesnt: w(72, "doesn't"),
    };
    this.START = L(63).start; this.FROM = this.START - 1.2; this.END = L(72).end;
    // toán trên bảng (CONTENT: 1/3 = 0,333…; 3 × 0,333… = 0,999…; 10x − x = 9x = 9 → x = 1)
    must('3 * (1 / 3)', 1); must('10 * 1 - 1', 9); must('9 / 9', 1);
    this.V = { k: must('1 + 2', 3), ten: must('5 * 2', 10), nine: must('10 - 1', 9) };
    const V = this.V, T = this.T;
    const row = s => { if ([...s].length > N) throw new Error(`c2: "${s}" quá ${N} ô`); return s.padEnd(N); };
    // mỗi mục: [bảng 0/1, hàng, chữ, a, b] — chữ lật vào trong [a, b]; mục sau cùng hàng lật đè (from = chữ trước)
    this.CELLS = [
      [0, 0, row(' 1/3 ='), T.third, T.third + 0.7],
      [0, 0, row('       0.333…'), T.zero64, T.threes],
      [0, 1, row(`  ×${V.k}`), T.multiply, T.multiply + 0.6],
      [0, 1, row(`       ×${V.k}`), T.three65, T.three65 + 0.6],
      [0, 2, row('   1 ='), T.one65, T.one65 + 0.6],
      [0, 2, row('       0.999…'), T.zero65, T.forever65],
      [0, 3, row('   0.999… = 1'), T.so66, T.one66 + 0.2],
      [1, 0, row('   x = 0.999…'), T.call, T.x68 + 0.3],
      [1, 1, row(` ${V.ten}x = 9.999…`), T.ten68, T.repeating68 + 0.3],
      [1, 2, row(` ${V.ten}x − x`), T.subtract, T.subtract + 1.1],
      [1, 2, row(`  ${V.nine}x = ${V.nine}`), T.nine69, T.equals69 + 0.6],
      [1, 3, row('   x = 1'), T.so69, T.one69 + 0.2],
    ];
    this.BANNER = 'ARITHMETIC ON ENDLESS DECIMALS?';
    if (this.BANNER.length !== NB) throw new Error('c2: bảng dài đổi số ô');
    // ô lật mãi (đuôi vô tận): [bảng, hàng, cột, ký tự, từ lúc]
    this.SPIN = [[0, 0, 11, '3', T.forever64], [0, 2, 11, '9', T.forever65], [1, 0, 11, '9', T.x68 + 0.4], [1, 1, 11, '9', T.repeating68 + 0.4]];
  }
  sfx() {
    const T = this.T;
    return [
      ...this.CELLS.map(([, , , a]) => ({ t: a, kind: 'flap' })),
      { t: T.shortcut, kind: 'chip' },
      { t: T.add, kind: 'flap' },
    ];
  }
  bx(t, i) { return X0 + i * (MW + BGAP); }                 // toạ độ TRONG nhóm bảng (trước phép lùi/trượt)
  mv(t) { return smooth(prog(t, this.T.but - 0.6, this.T.but + 0.2)); }
  // nhóm hai bảng: neo mép trên trái (X0, MY), co về SC và trượt sang phải
  xf(g, t) { const m = this.mv(t), s = 1 + (SC - 1) * m; g.translate(X0 + SHIFT * m, MY); g.scale(s, s); g.translate(-X0, -MY); }

  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g);
    const lit = [prog(t, T.first, T.first + 0.1) > 0, prog(t, T.second, T.second + 0.1) > 0];
    const drop = (1 - outCubic(prog(t, F + 0.3, F + 0.9))) * -560;
    g.save(); this.xf(g, t);
    const m0 = g.getTransform();
    reflect(g, (FLOOR - m0.f) / m0.d, d => {
      d.save(); d.translate(0, drop);
      for (let b = 0; b < 2; b++) {
        const x = this.bx(t, b), fx = x + PAD;
        bulbs(d, x, MY, MW, MH, t + b * 0.37, { pad: 18, r: 6, step: 30, lit: lit[b] });
        for (let r = 0; r < 4; r++) {
          let cur = ' '.repeat(N), prev = cur, k = 1;
          for (const [bb, rr, s, a, z] of this.CELLS) { if (bb !== b || rr !== r || t < a) continue; prev = cur; cur = this.merge(prev, s); k = prog(t, a, z); }
          flap(d, cur, fx, RY + r * RP, CELL, k, { from: prev, gap: GAP, h: CH });
        }
        for (const [bb, r, c, ch, at] of this.SPIN) if (bb === b && t > at) flapSpin(d, ch, fx + c * PITCH, RY + r * RP, CELL, t - at, { h: CH, per: 0.6 });
        // "the endless tails cancel": đuôi .999… của hai hàng đầu bảng 2 tối đi, khung mực viền đứt bao quanh
        if (b === 1) {
          const kc = prog(t, T.endless, T.cancel + 0.3);
          if (kc > 0) {
            const tx = fx + 8 * PITCH - 6, tw = 5 * PITCH + 8, ty = RY - 6, th = RP + CH + 12;
            d.save(); d.fillStyle = `rgba(14,11,11,${0.62 * kc})`; d.fillRect(tx + 6, ty + 6, tw - 12, th - 12);
            d.strokeStyle = C.ink; d.globalAlpha = kc; d.lineWidth = 3; d.setLineDash([9, 7]); d.strokeRect(tx, ty, tw, th); d.restore();
          }
        }
      }
      d.restore();
    });
    this.overlays(g, t, drop);
    g.restore();
    reflect(g, FLOOR, d => {
      // bảng dài: trồi lên ở "assume", lật vào ở "add … decimals"
      const kb = outBack(prog(t, T.assume - 0.2, T.assume + 0.35));
      if (kb > 0) {
        const cx = 610 + (2 * MW + BGAP) * SC / 2, bx = cx - BMW / 2, by = BY + (1 - kb) * 420;
        bulbs(d, bx, by, BMW, BMH, t + 0.2, { pad: 18, r: 6, step: 30 });
        flap(d, this.BANNER, bx + 40, by + 40, BC, prog(t, T.add, T.decimals + 0.35), { gap: BG, h: BH });
      }
    });
    // "just like ordinary numbers"
    const cx = 610 + (2 * MW + BGAP) * SC / 2;
    label(g, 'just like ordinary numbers', cx, BY + BMH + 50, C.ink, 'center', 22, prog(t, T.just, T.numbers72 + 0.3));
    // nhân vật cầm que chỉ: trồi lên ở "but honestly", lặn xuống sau "ordinary numbers"
    const km = Math.min(prog(t, T.but, T.but + 0.4), 1 - prog(t, T.part - 0.7, T.part - 0.3));
    if (km > 0) figure(g, 'pointer', 270, 1080, 760, km);
    // trực giác vẫn không tin: thẻ (từ c1) đứng góc phải dưới suốt cảnh; nhảy ở "your gut", lắc ở "doesn't trust"
    const sh = t > T.doesnt ? Math.sin((t - T.doesnt) * 20) * 0.05 * (1 - prog(t, T.doesnt, T.doesnt + 0.9)) : 0;
    const hop = Math.sin(Math.PI * prog(t, T.gut - 0.1, T.gut + 0.35)) * 30;
    gutCard(g, 'STILL A\nLITTLE SHORT', 1620, 910 - hop, 380, 180, 1, { rise: prog(t, F + 0.4, F + 0.9), rot: 0.04 + sh, seed: 47 });
    card(g, prog(t, F + 0.4, F + 1.2), 'ACT TWO', 'TWO QUICK PROOFS');
  }
  overlays(g, t, drop) {
    const T = this.T;
    // tiêu đề hai bảng (Plex mực ngà, trong khung) — viết vào
    for (let b = 0; b < 2; b++) {
      const x = this.bx(t, b) + PAD, y = HY + drop;
      const [a1, a2, s2] = b ? [T.arguments + 0.3, T.algebra, ' · algebra'] : [T.couple, T.fraction, ' · a fraction'];
      const w1 = label(g, `argument ${b + 1}`, x, y, C.ink, 'left', 20, prog(t, a1, a1 + 0.5));
      label(g, s2, x + w1, y, C.dim, 'left', 20, prog(t, a2, a2 + 0.5));
    }
    // "both … convincing": gạch chân mực dòng kết luận mỗi bảng
    for (let b = 0; b < 2; b++) {
      const k = prog(t, b ? T.both2 : T.both1, (b ? T.both2 : T.both1) + 0.5);
      if (k <= 0) continue;
      const x = this.bx(t, b) + PAD + 3 * PITCH, w = (b ? 5 : 10) * PITCH - GAP, y = RY + 3 * RP + CH + 9;   // gạch chân mực
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * k, y - 2 * k); g.stroke(); g.restore();
    }
    // "SHORTCUT" (nhãn in mực, KHÔNG X) dán lên cả hai bảng
    for (let b = 0; b < 2; b++) {
      const k = prog(t, T.shortcut + b * 0.3, T.shortcut + b * 0.3 + 0.3);
      tag(g, 'shortcut', this.bx(t, b) + MW - 130, MY + 4, k, { rot: b ? 0.05 : -0.06, size: 23 });
    }
  }
  // chữ mới đè lên hàng cũ: ô trắng của chữ mới giữ ký tự cũ (ghi thêm vào hàng, không xoá)
  merge(prev, s) {
    const A = [...prev], B = [...s];
    const allBlankOver = B.every((ch, i) => ch === ' ' || A[i] === ' ' || A[i] === ch);
    return allBlankOver ? B.map((ch, i) => ch === ' ' ? A[i] : ch).join('') : s;
  }
}
