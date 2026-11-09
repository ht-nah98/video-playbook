// b9 · Intuition, rebuilt (p2 câu 53–56) — cảnh cuối Hồi I. Ba cửa nhỏ (cửa 3 ra dê) ở giữa; thẻ X "50/50" (đã X ở b2,
// vẽ nguyên trạng) bật lên bên trái ở "first intuition"; "a hundred doors" → ba cửa trượt đi, bảng 100 cửa thu nhỏ rơi
// vào (98 cửa đã mở, cửa YOUR PICK 34 + cửa 78 còn đóng sáng đèn — đúng b5); "intuition switched sides" → thẻ mới "SWITCH!" hồng
// bật lên bên phải, "agreed" → ✓ hổ phách (trực giác đồng ý với phép tính); "a small change in how you look" → mũi tên
// ngà 50/50 → 100 cửa → SWITCH!; bảng treo chốt "INTUITION, REBUILT / RIGHT DIRECTION AGAIN".
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, bulb, flap, flapW, ctr,
  door, gutCard, label, card, figure, lookup, must } from '../kit.js';

const N = 22, CELL = 40, GAP = 5, RH = 62, BX = 150, BY = 100;
const GX = 640, GY = 330, DW = 30, DH = 40, SX = 36, SYY = 46;   // lưới 10 × 10 cửa nhỏ
const PICK = 34, OTHER = 78;                                    // như b5-hundred.js (số cửa 1-based trong lưới 10 × 10)

export default class Rebuilt {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['thumb'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b9');
    this.T = {
      heres: w(53, "here's"), most: w(53, 'most'), monty: w(53, 'monty'),
      first: w(54, 'first'), wrong: w(54, 'wrong'), useless: w(54, 'useless'),
      hundred: w(55, 'hundred'), intuition55: w(55, 'intuition'), switched: w(55, 'switched'), agreed: w(55, 'agreed'), calc: w(55, 'calculation'),
      small: w(56, 'small'), change: w(56, 'change'), look: w(56, 'look'), walking: w(56, 'walking'), right: w(56, 'right'), end: L(56).end,
    };
    const T = this.T;
    this.START = L(53).start; this.FROM = this.START - 1.2;
    this.V = { n: must('10 * 10', 100), opened: must('100 - 2', 98), keep: '1/100', sw: `${must('100 - 1', 99)}/100`, gut: must('1 / 2 * 100', 50) };
    this.BOARD = [
      [T.most, ctr('MOST INTERESTING', N), ' '.repeat(N)],
      [T.monty, null, ctr('ABOUT MONTY HALL', N)],
      [T.wrong, ctr('FIRST GUT: WRONG', N), ' '.repeat(N)],
      [T.useless, null, ctr('BUT NOT USELESS', N)],
      [T.hundred, ctr(`PICTURE ${this.V.n} DOORS`, N), ' '.repeat(N)],
      [T.calc, ctr('GUT AGREES WITH', N), ctr('THE CALCULATION', N)],
      [T.right, ctr('INTUITION, REBUILT', N), ctr('RIGHT DIRECTION AGAIN', N)],
    ];
  }
  sfx() {
    const T = this.T;
    return [...this.BOARD.map(([t]) => ({ t, kind: 'flap' })), { t: T.switched, kind: 'pen' }, { t: T.agreed, kind: 'correct' }];
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    const out3 = smooth(prog(t, T.hundred - 0.3, T.hundred + 0.35));          // ba cửa trượt ra phải, khỏi khung
    const kg = prog(t, T.hundred - 0.1, T.hundred + 0.45);                     // bảng 100 cửa rơi vào
    reflect(g, FLOOR, d => {
      if (out3 < 1) [0, 1, 2].forEach(i => door(d, 640 + i * 150 + out3 * 1500, FLOOR - 220, 120, 220, i + 1,
        i === 2 ? 1 : 0, { behind: 'goat' }));
    });
    if (kg > 0) this.grid(g, t, (1 - outBack(kg)) * -800);
    // mũi tên ngà: 50/50 → 100 cửa → SWITCH!  ("a small change in how you look")
    arrow(g, [[470, 520], [540, 450], [600, 470]], prog(t, T.small, T.small + 0.5));
    arrow(g, [[1040, 470], [1085, 420], [1105, 520]], prog(t, T.change + 0.2, T.change + 0.7));
    label(g, 'a small change in how you look', 820, 890, C.ink, 'center', 22, prog(t, T.change, T.look + 0.3));
    this.board(g, t);
    // thẻ trực giác cũ "50/50" (X từ b2) — bên trái
    gutCard(g, `${V.gut}/${V.gut}`, 330, 640, 380, 180, 1, { state: 'x', kx: 1, rise: prog(t, T.first - 0.15, T.first + 0.35), rot: -0.05, seed: 31 });
    label(g, 'first intuition', 330, 520, C.ink, 'center', 22, prog(t, T.first + 0.1, T.first + 0.6));
    // thẻ mới "SWITCH!" hồng + ✓ hổ phách
    gutCard(g, 'SWITCH!', 1270, 620, 360, 180, prog(t, T.switched, T.switched + 0.7), {
      state: 'check', kx: prog(t, T.agreed, T.agreed + 0.35), rise: prog(t, T.intuition55 - 0.1, T.intuition55 + 0.4), rot: 0.04, seed: 61 });
    label(g, 'rebuilt intuition', 1270, 500, C.ink, 'center', 22, prog(t, T.switched + 0.3, T.switched + 0.8));
    // thumb: trực giác đồng ý
    const kt = prog(t, T.switched + 0.3, T.switched + 0.7);
    if (kt > 0) figure(g, 'thumb', 1720, 1080, 700, kt);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.2), 'ACT ONE', 'Intuition, rebuilt');
  }

  // bảng 100 cửa thu nhỏ (trạng thái sau b5): cửa 34 = YOUR PICK, 98 cửa mở, cửa 78 còn đóng sáng đèn
  grid(g, t, dy) {
    const V = this.V, gw = 10 * SX - (SX - DW), gh = 10 * SYY - (SYY - DH);
    g.save(); g.translate(0, dy);
    bulbs(g, GX - 34, GY - 34, gw + 68, gh + 68, t, { pad: 14, r: 5, step: 28 });
    for (let i = 0; i < V.n; i++) {
      const x = GX + (i % 10) * SX, y = GY + Math.floor(i / 10) * SYY;
      if (i === PICK - 1 || i === OTHER - 1) {
        door(g, x, y, DW, DH, '', 0, { frame: true });
        if (i === OTHER - 1) { const gl = g.createRadialGradient(x + DW / 2, y + DH / 2, 2, x + DW / 2, y + DH / 2, 40);
          gl.addColorStop(0, 'rgba(255,192,74,0.45)'); gl.addColorStop(1, 'rgba(255,192,74,0)'); g.fillStyle = gl; g.fillRect(x - 30, y - 30, DW + 60, DH + 60);
          bulb(g, x + DW / 2, y - 7, 4, true); }
        else { g.strokeStyle = C.ink; g.lineWidth = 2.5; g.strokeRect(x - 5, y - 5, DW + 10, DH + 7); }
      } else {
        g.fillStyle = C.frame; g.fillRect(x - 2, y - 2, DW + 4, DH + 2);
        g.fillStyle = '#3A2418'; g.fillRect(x, y, DW, DH);
        g.fillStyle = 'rgba(239,230,214,0.55)'; g.fillRect(x + 7, y + DH - 12, 16, 8);   // bóng dê bìa
      }
    }
    g.restore();
    label(g, `your pick ${V.keep} · other door ${V.sw}`, GX + gw / 2, GY + gh + 70 + dy, C.ink, 'center', 22, prog(t, this.T.hundred + 0.4, this.T.hundred + 1.2));
  }

  board(g, t) {
    let r1 = ' '.repeat(N), r2 = r1, p1 = r1, p2 = r1, k1 = 1, k2 = 1;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      if (a != null) { p1 = r1; r1 = a; k1 = prog(t, at, at + 1.1); }
      if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    const bw = flapW(N, CELL, GAP);
    bulbs(g, BX - 40, BY - 40, bw + 80, 2 * RH + 10 + 80, t);
    flap(g, r1, BX, BY, CELL, k1, { from: p1, gap: GAP, h: RH });
    flap(g, r2, BX, BY + RH + 10, CELL, k2, { from: p2, gap: GAP, h: RH });
  }
}

// mũi tên ngà (màu mực — §61), vẽ dần theo k qua các điểm (đường cong bậc hai)
function arrow(g, [a, b, c], k) {
  if (k <= 0) return;
  const P = u => [(1 - u) ** 2 * a[0] + 2 * u * (1 - u) * b[0] + u * u * c[0], (1 - u) ** 2 * a[1] + 2 * u * (1 - u) * b[1] + u * u * c[1]];
  const u1 = clamp(k);
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = g.lineJoin = 'round';
  g.beginPath(); for (let i = 0; i <= 24; i++) { const [x, y] = P(u1 * i / 24); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  if (u1 >= 1) { const [x0, y0] = P(0.9), ang = Math.atan2(c[1] - y0, c[0] - x0);
    g.beginPath(); g.moveTo(c[0] - 18 * Math.cos(ang - 0.5), c[1] - 18 * Math.sin(ang - 0.5)); g.lineTo(c[0], c[1]);
    g.lineTo(c[0] - 18 * Math.cos(ang + 0.5), c[1] - 18 * Math.sin(ang + 0.5)); g.stroke(); }
  g.restore();
}
