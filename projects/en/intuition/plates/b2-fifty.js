// b2 · Fifty-fifty? — phản xạ 50/50 của trực giác bị X; bảng hổ phách tính ra STAY 1/3 · SWITCH 2/3, ×2.
//   Sân khấu nối b1: cửa 1 (YOUR PICK), cửa 2 đóng, cửa 3 mở ra dê. Mascot `shrug` ở "same reflex".
//   "two doors left": cửa 3 + dê trượt khỏi khung, hai cửa còn đóng được rọi, nhãn "CAR?" / "GOAT?"; "fifty-fifty" → thẻ
//   trực giác bật lên viết "50/50" (pen). "in one study": 100 bóng đèn (1 bóng = 1%), 13 bóng sáng ở "thirteen" + bảng
//   "ONLY 13% SWITCHED". "you should switch" → X đỏ lên thẻ (buzzer). Bảng: STAY 1/3 · SWITCH 2/3, khối ngọc ∝ xác suất,
//   "×2" bằng bóng đèn ở "doubles" (correct).
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, bulb, flap, flapW, ctr, door,
  gutCard, block, bulbText, text, tag, label, card, figure, lookup, must } from '../kit.js';

const N = 21, CELL = 44, GAP = 6, RH = 75;
const frac = p => { for (let d = 1; d <= 12; d++) { const n = Math.round(p * d); if (Math.abs(n / d - p) < 1e-9) return `${n}/${d}`; } throw new Error('frac ' + p); };
const DW = 240, DH = 357, DY = FLOOR - DH, XS = [150, 440, 730];

export default class Fifty {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      almost: w(8, 'almost'), everyone: w(8, 'everyone'), reflex: w(8, 'reflex'),
      two9: w(9, 'two'), left: w(9, 'left'), car9: w(9, 'car'), goat9: w(9, 'goat'), fifty: w(9, 'fifty-fifty'), switching9: w(9, 'switching'), diff: w(9, 'difference'), e9: L(9).end,
      study: w(10, 'study'), two10: w(10, 'two'), people: w(10, 'people'), only: w(10, 'only'), thirteen: w(10, 'thirteen'), switched: w(10, 'switched'),
      sounds: w(11, 'sounds'), reasonable: w(11, 'reasonable'), but: w(11, 'but'), right: w(11, 'right'), should: w(11, 'should'), sw11: w(11, 'switch'),
      stay12: w(12, 'stay'), three12: w(12, 'three'), sw12: w(12, 'switch'), two12: w(12, 'two'), three12b: w(12, 'three', 2),
      doubles: w(13, 'doubles'), chances: w(13, 'chances'), e13: L(13).end,
    };
    const T = this.T;
    this.START = L(8).start; this.FROM = this.START - 1.2;
    // số liệu (CONTENT): 228 người, 13% đổi; Monty Hall: giữ 1/3, đổi 2/3 → gấp đôi
    const V = this.V = {
      gut: must('1 / 2 * 100', 50), n: must('228', 228), pct: must('13', 13), stay: must('1 / 3', 1 / 3), sw: must('2 / 3', 2 / 3),
      x: must('(2 / 3) / (1 / 3)', 2), left: must('3 - 1', 2), grid: must('10 * 10', 100),
    };
    this.BOARD = [
      [T.everyone, ctr('ALMOST EVERYONE:', N), ' '.repeat(N)],
      [T.left, ctr(`${V.left} DOORS LEFT`, N), null],
      [T.study, ctr(`1 STUDY · ${V.n} PEOPLE`, N), ' '.repeat(N)],
      [T.only, null, ctr(`ONLY ${V.pct}% SWITCHED`, N)],
      [T.right, ctr('THE RIGHT ANSWER:', N), ' '.repeat(N)],
      [T.should, null, ctr('YOU SHOULD SWITCH', N)],
      [T.three12 + 0.25, `STAY ${frac(V.stay)}`.padEnd(N), null],
      [T.three12b, `STAY ${frac(V.stay)} · SWITCH ${frac(V.sw)}`, null],
    ];
    for (const [, a, b] of this.BOARD) for (const s of [a, b]) if (s && s.length !== N) throw new Error(`b2: hàng bảng "${s}" ≠ ${N} ô`);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.fifty, kind: 'pen' },
      { t: T.only, kind: 'flap' },
      { t: T.sw11, kind: 'buzzer' },
      { t: T.three12 + 0.25, kind: 'flap' },
      { t: T.doubles, kind: 'correct' },
    ];
  }

  board(g, t) {
    const bw = flapW(N, CELL, GAP), bx = 150, by = 110;
    let r1 = ' '.repeat(N), r2 = r1, p1 = r1, p2 = r2, k1 = 1, k2 = 1;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      if (a != null) { p1 = r1; r1 = a; k1 = prog(t, at, at + 1.1); }
      if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    return d => {
      bulbs(d, bx - 46, by - 46, bw + 92, 2 * RH + 12 + 92, t);
      flap(d, r1, bx, by, CELL, k1, { from: p1, gap: GAP, h: RH });
      flap(d, r2, bx, by + RH + 12, CELL, k2, { from: p2, gap: GAP, h: RH });
    };
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    const board = this.board(g, t);
    // cửa 3 (đã mở, dê) trượt khỏi khung sang phải ở "two doors left"
    const out3 = smooth(prog(t, T.two9, T.left + 0.5)) * 1400;
    const spot = (x, a) => { if (a <= 0) return; const sg = g.createLinearGradient(0, 330, 0, FLOOR); sg.addColorStop(0, 'rgba(255,214,150,0)'); sg.addColorStop(1, `rgba(255,214,150,${0.15 * a})`);
      g.fillStyle = sg; g.beginPath(); g.moveTo(x + DW * 0.3, 340); g.lineTo(x + DW * 0.7, 340); g.lineTo(x + DW + 50, FLOOR); g.lineTo(x - 50, FLOOR); g.fill(); };
    const ks = prog(t, T.left, T.left + 0.5);
    spot(XS[0], ks); spot(XS[1], ks);
    reflect(g, FLOOR, d => {
      board(d);
      door(d, XS[0], DY, DW, DH, 1, 0); door(d, XS[1], DY, DW, DH, 2, 0);
      if (out3 < 1400) door(d, XS[2] + out3, DY, DW, DH, 3, 1, { behind: 'goat' });
    });
    // YOUR PICK trên cửa 1 (nối b1)
    g.save(); g.translate(XS[0] + DW / 2, DY + DH * 0.8); g.rotate(-0.06);
    g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 10; g.shadowOffsetY = 4; g.fillStyle = C.ink; g.fillRect(-100, -24, 200, 48); g.restore();
    label(g, 'your pick', 0, 8, C.label, 'center', 22); g.restore();
    // "one car, one goat" — hai dấu hỏi trên hai cửa còn đóng
    const q = (x, at, s) => { const k = prog(t, at, at + 0.3); if (k > 0) tag(g, s, x + DW / 2, DY - 40, k, { rot: x === XS[0] ? -0.04 : 0.04, size: 22, strip: false }); };
    q(XS[0], T.car9, 'car?'); q(XS[1], T.goat9, 'goat?');
    // thẻ trực giác "50/50": bật lên ở "fifty-fifty", X đỏ ở "you should switch"
    const gx = 600, gy = 905;
    if (t > T.fifty - 0.35) {
      gutCard(g, `${V.gut}/${V.gut}`, gx, gy, 400, 190, prog(t, T.fifty, T.fifty + 0.8), {
        state: 'x', kx: prog(t, T.sw11, T.sw11 + 0.3), rise: prog(t, T.fifty - 0.35, T.fifty + 0.15), rot: -0.05, seed: 31 });
    }
    // lời trực giác bên cạnh thẻ (nhãn in mực): "switching can't matter" → "sounds reasonable"
    if (t > T.switching9) {
      const s = t < T.sounds ? "switching can't matter" : 'sounds reasonable', at = t < T.sounds ? T.switching9 : T.sounds;
      label(g, s, gx + 240, gy + 20, C.ink, 'left', 24, prog(t, at, at + 0.7) * (1 - prog(t, T.stay12 - 0.4, T.stay12 - 0.1)));
    }
    // mascot shrug ở "same reflex" … "difference"
    const kf = Math.min(prog(t, T.reflex - 0.25, T.reflex + 0.15), 1 - prog(t, T.diff + 0.2, T.diff + 0.6));
    if (kf > 0) figure(g, 'shrug', 1640, 1080, 760, kf);
    // nghiên cứu: 100 bóng đèn = 228 người (1 bóng = 1%), 13 bóng sáng ở "thirteen"; lùi khỏi khung khi bảng tính ra 1/3 · 2/3
    const gIn = outCubic(prog(t, T.study, T.study + 0.6)), gOut = smooth(prog(t, T.stay12 - 0.3, T.stay12 + 0.4));
    if (gIn > 0 && gOut < 1) {
      const pitch = 44, ox = 1290 + (1 - gIn) * 700 + gOut * 800, oy = 360, lit = Math.round(V.pct * prog(t, T.thirteen, T.thirteen + 0.6));
      label(g, `${V.n} people · 1 bulb = 1%`, ox + 4.5 * pitch, oy - 40, C.dim, 'center', 22, prog(t, T.people - 0.2, T.people + 0.5));
      for (let i = 0; i < V.grid; i++) bulb(g, ox + (i % 10) * pitch, oy + Math.floor(i / 10) * pitch, 13, i < lit);
      label(g, `${V.pct}% switched`, ox + 4.5 * pitch, oy + 10 * pitch + 20, C.ink, 'center', 28, prog(t, T.switched, T.switched + 0.6));
    }
    // khối xác suất (ngọc, rộng ∝ xác suất) cạnh bảng — STAY 1/3, SWITCH 2/3; "×2" bằng bóng đèn ở "doubles"
    const u = 900, bh = 90, bx0 = 1080;                      // bề rộng = u × xác suất
    const k1 = outCubic(prog(t, T.three12, T.three12 + 0.6)), k2 = outCubic(prog(t, T.three12b, T.three12b + 0.6));
    if (k1 > 0) { label(g, 'stay', bx0, 440, C.ink, 'left', 24, k1 * 2); block(g, bx0, 458, u * V.stay * k1, bh, k1 >= 1 ? frac(V.stay) : ''); }
    if (k2 > 0) { label(g, 'switch', bx0, 610, C.ink, 'left', 24, k2 * 2); block(g, bx0, 628, u * V.sw * k2, bh, k2 >= 1 ? frac(V.sw) : ''); }
    if (t > T.doubles - 0.1) {
      const kd = prog(t, T.doubles, T.doubles + 0.5);
      text(g, `×${V.x}`, 1560, 550, 150, C.amber, { w: 900, align: 'center', glow: 'rgba(255,170,40,0.75)', blur: 22, k: kd * 1.05 });
      label(g, 'your chances', 1560, 592, C.ink, 'center', 22, prog(t, T.chances - 0.2, T.chances + 0.4));
    }
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT ONE', 'FIFTY-FIFTY?');
  }
}
