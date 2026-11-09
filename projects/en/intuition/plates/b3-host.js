// b3 · What the host knows — kết ĐÚNG khung lab 0 (tools/lab/gameshow.html): bảng "STAY 1/3 · SWITCH 2/3", khối ngọc 1/3
// trên cửa 1, ngoặc cũ (đứt) bao cửa 2+3, khối 2/3 đã chảy sang cửa 2 (bóng ma + vệt tốc độ), cửa 3 mở ra dê, thẻ X "50/50",
// mascot `twoways`.
//   "first pick" → YOUR PICK dán lên cửa 1 · "knew nothing" → ba ô "?" (không có thông tin) · "one in three" → khối 1/3 rơi
//   lên cửa 1 · "taken together" → ngoặc ngọc bao cửa 2+3, khối 2/3 · "host" → bục người dẫn + đèn; "not at random" (nhãn);
//   "knows" → đèn bật, "KNOWS" · "deliberately opens a goat" → tia đèn chỉ cửa 3, cửa 3 mở ra dê (door) · "doesn't vanish" →
//   khối 2/3 nảy · "moves onto" → khối chảy sang cửa 2 (whoosh) · "your door / other door" → twoways, bảng chốt.
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, bulb, flap, flapW, ctr, door,
  gutCard, block, tag, label, card, figure, lookup, must } from '../kit.js';

const N = 21, CELL = 44, GAP = 6, RH = 75;
const DW = 270, DH = 450, DY = FLOOR - DH, XS = [155, 525, 895];
const U = 92, BH = 50, BY = 262;                               // khối: 1/3 = U, 2/3 = 2U (diện tích ∝ xác suất)
const frac = p => { for (let d = 1; d <= 12; d++) { const n = Math.round(p * d); if (Math.abs(n / d - p) < 1e-9) return `${n}/${d}`; } throw new Error('frac ' + p); };

export default class Host {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['twoways'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      reason: w(14, 'reason'), hiding: w(14, 'hiding'), first: w(14, 'first'), pick14: w(14, 'pick'),
      knew: w(15, 'knew'), nothing: w(15, 'nothing'), door15: w(15, 'door'), one15: w(15, 'one'), three15: w(15, 'three'), car15: w(15, 'car'),
      other16: w(16, 'other'), doors16: w(16, 'doors'), together: w(16, 'together'), hold: w(16, 'hold'), two16: w(16, 'two'), e16: L(16).end,
      key: w(17, 'key'), host17: w(17, 'host'), open17: w(17, 'open'), random: w(17, 'random'),
      knows: w(18, 'knows'), car18: w(18, 'car'), deliberately: w(18, 'deliberately'), opens18: w(18, 'opens'), goat18: w(18, 'goat'),
      opens19: w(19, 'opens'), two19: w(19, 'two', 2), vanish: w(19, 'vanish'), moves: w(19, 'moves'), onto: w(19, 'onto'), one19: w(19, 'one', 2), left19: w(19, 'left'), closed19: w(19, 'closed'),
      your20: w(20, 'your'), still20: w(20, 'still'), one20: w(20, 'one'), other20: w(20, 'other'), holds: w(20, 'holds'), two20: w(20, 'two'), e20: L(20).end,
    };
    const T = this.T;
    this.START = L(14).start; this.FROM = this.START - 1.2;
    const V = this.V = { pick: must('1 / 3', 1 / 3), other: must('2 / 3', 2 / 3), sum: must('1 / 3 + 2 / 3', 1), gut: must('1 / 2 * 100', 50) };
    this.BOARD = [
      [T.hiding, ctr('YOUR FIRST PICK', N)],
      [T.knew, ctr('YOU KNEW NOTHING', N)],
      [T.three15, ctr(`YOUR DOOR: ${frac(V.pick)}`, N)],
      [T.two16, ctr(`OTHER TWO: ${frac(V.other)}`, N)],
      [T.knows, ctr('THE HOST KNOWS ·', N)],
      [T.vanish, ctr(`${frac(V.other)} DOESN'T VANISH`, N)],
      [T.still20, `STAY ${frac(V.pick)} · SWITCH ${frac(V.other)}`],
    ];
    for (const [, s] of this.BOARD) if (s.length !== N) throw new Error(`b3: hàng bảng "${s}" ≠ ${N} ô`);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.hiding, kind: 'flap' }, { t: T.knew, kind: 'flap' }, { t: T.two16, kind: 'flap' },
      { t: T.opens18, kind: 'door' }, { t: T.moves, kind: 'whoosh' }, { t: T.still20, kind: 'flap' },
    ];
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    // bảng
    let r = ' '.repeat(N), p = r, k = 1;
    for (const [at, s] of this.BOARD) { if (t < at) break; p = r; r = s; k = prog(t, at, at + 1.1); }
    const bw = flapW(N, CELL, GAP), bx = (XS[0] + XS[2] + DW) / 2 - bw / 2, by = 110;
    // vệt đèn rọi cửa 1 (cửa của bạn)
    const sg = g.createLinearGradient(0, 0, 0, FLOOR); sg.addColorStop(0, 'rgba(255,214,150,0)'); sg.addColorStop(1, `rgba(255,214,150,${0.12 * prog(t, T.first, T.first + 0.5)})`);
    g.fillStyle = sg; g.beginPath(); g.moveTo(XS[0] + DW * 0.3, 210); g.lineTo(XS[0] + DW * 0.7, 210); g.lineTo(XS[0] + DW + 50, FLOOR); g.lineTo(XS[0] - 50, FLOOR); g.fill();
    const open3 = outCubic(prog(t, T.opens18, T.opens18 + 0.5));
    reflect(g, FLOOR, d => {
      bulbs(d, bx - 46, by - 46, bw + 92, RH + 92, t);
      flap(d, r, bx, by, CELL, k, { from: p, gap: GAP, h: RH });
      if (t > T.knows + 0.6 && t < T.vanish) {                                   // biểu tượng bóng đèn của người dẫn trên bảng (ô "·" sáng to dần)
        const kb = outBack(prog(t, T.knows + 0.6, T.knows + 0.9)), cx = bx + 17 * (CELL + GAP) + CELL / 2, cy = by + RH / 2;
        bulb(d, cx, cy - 4, 20 * kb, true); d.fillStyle = '#8A8070'; d.fillRect(cx - 9 * kb, cy + 14 * kb, 18 * kb, 12 * kb);
      }
      XS.forEach((x, i) => door(d, x, DY, DW, DH, i + 1, i === 2 ? open3 : 0, { behind: 'goat' }));
      this.podium(d, t);
    });
    // YOUR PICK dán lên cửa 1 ở "first pick"
    const kt = prog(t, T.first - 0.1, T.first + 0.25);
    if (kt > 0) {
      const sc = 1 + 0.25 * (1 - outCubic(kt));
      g.save(); g.translate(XS[0] + DW / 2, DY + DH * 0.78); g.rotate(-0.06); g.scale(sc, sc);
      g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 10; g.shadowOffsetY = 4; g.fillStyle = C.ink; g.fillRect(-112, -26, 224, 52); g.restore();
      g.fillStyle = 'rgba(230,220,195,0.7)'; g.fillRect(-126, -18, 26, 36); g.fillRect(100, -18, 26, 36);
      label(g, 'your pick', 0, 9, C.label, 'center', 24); g.restore();
    }
    this.blocks(g, t);
    this.tiles(g, t);
    this.hostSide(g, t);
    // thẻ trực giác "50/50" đã X từ b2 (vật xuyên suốt, vẽ nguyên trạng — không buzzer)
    gutCard(g, `${V.gut}/${V.gut}`, 470, 910, 440, 210, 1, { state: 'x', kx: 1, rot: -0.06, seed: 31 });
    // twoways: "your door … the other door"
    const kf = prog(t, T.your20 - 0.3, T.your20 + 0.1);
    if (kf > 0) { const P = figure(g, 'twoways', 1610, 1080, 760, kf); if (P(0, 0)[0] < XS[2] + DW * 1.36 + 10) throw new Error('b3: nhân vật đè cánh cửa'); }
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT ONE', 'WHAT THE HOST KNOWS');
  }

  // khối xác suất (ngọc)
  blocks(g, t) {
    const T = this.T, V = this.V;
    const k1 = outBack(prog(t, T.one15, T.one15 + 0.4));
    if (k1 > 0) block(g, XS[0] + DW / 2 - U / 2, BY - (1 - k1) * 160, U, BH, frac(V.pick));
    // vòng mực quanh khối 1/3 ở "your door is still one in three"
    const kc = prog(t, T.one20 - 0.1, T.one20 + 0.4);
    if (kc > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath();
      g.ellipse(XS[0] + DW / 2, BY + BH / 2, U * 0.85, BH * 0.95, -0.05, -1.6, -1.6 + Math.PI * 2 * kc); g.stroke(); g.restore(); }
    // ngoặc bao cửa 2+3: vẽ ở "taken together", mờ thành nét đứt khi 2/3 đã chảy đi
    const L = XS[1] - 6, R = XS[2] + DW + 6, ky = 236, kb = prog(t, T.together, T.together + 0.6), flow = smooth(prog(t, T.moves, T.moves + 0.9));
    if (kb > 0) {
      g.save(); g.globalAlpha = 1 - 0.5 * flow; g.strokeStyle = C.teal; g.lineWidth = 3; if (flow > 0) g.setLineDash([10, 8]);
      const m = (L + R) / 2, hw = (R - L) / 2 * kb;
      g.beginPath(); g.moveTo(m - hw, ky + 14); g.lineTo(m - hw, ky); g.lineTo(m + hw, ky); g.lineTo(m + hw, ky + 14); g.stroke(); g.restore();
    }
    // khối 2/3: trên ngoặc → "doesn't vanish" nảy → "moves onto" chảy về cửa 2
    const k2 = outBack(prog(t, T.two16, T.two16 + 0.4));
    if (k2 <= 0) return;
    const x0 = (L + R) / 2 - U, tx = XS[1] + DW / 2 - U, x = x0 + (tx - x0) * flow;
    if (flow > 0) {                                             // ô đứt ở chỗ cửa 3 + bóng ma + vệt tốc độ
      const fromX = XS[2] + DW / 2 - U / 2;
      g.save(); g.strokeStyle = 'rgba(46,196,182,0.55)'; g.lineWidth = 2.5; g.setLineDash([7, 6]); g.beginPath(); g.roundRect(fromX, BY, U, BH, 8); g.stroke(); g.restore();
      for (let j = 3; j >= 1; j--) block(g, x + j * (x0 + U * 0.6 - x) / 3.2, BY, 2 * U, BH, '', { alpha: (0.10 + 0.05 * (3 - j)) * Math.min(1, flow * 3) });
      for (let j = 0; j < 7; j++) { const yy = BY + 6 + j * (BH - 12) / 6, sx = x + 2 * U + 8, len = (120 + hash(j * 4.1) * 190) * Math.min(1, flow * 2);
        const lg = g.createLinearGradient(sx, 0, sx + len + 1, 0); lg.addColorStop(0, 'rgba(95,220,207,0.85)'); lg.addColorStop(1, 'rgba(95,220,207,0)');
        g.strokeStyle = lg; g.lineWidth = 2 + hash(j * 2.2) * 2.5; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx + hash(j * 7.3) * 30, yy); g.lineTo(sx + len, yy); g.stroke(); }
    }
    const pulse = 1 + 0.12 * Math.sin(prog(t, T.vanish - 0.1, T.vanish + 0.5) * Math.PI) + 0.08 * Math.sin(prog(t, T.two20, T.two20 + 0.5) * Math.PI);
    g.save(); g.translate(x + U, BY - (1 - k2) * 160 + BH / 2); g.scale(pulse, pulse);
    block(g, -U, -BH / 2, 2 * U, BH, frac(V.other)); g.restore();
  }

  // "you knew nothing": ba ô "?" như nhau (không có thông tin) — bên phải, trượt ra khi người dẫn vào
  tiles(g, t) {
    const T = this.T, out = smooth(prog(t, T.key - 0.4, T.key + 0.3)) * 700;
    if (out >= 700) return;
    for (let i = 0; i < 3; i++) {
      const k = outBack(prog(t, T.knew + i * 0.12, T.knew + 0.4 + i * 0.12)); if (k <= 0) continue;
      g.save(); g.translate(1420 + i * 170 + out, 470); g.scale(k, k);
      g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 16; g.shadowOffsetY = 8; g.fillStyle = C.velvet; g.beginPath(); g.roundRect(-70, -52, 140, 104, 10); g.fill(); g.restore();
      g.strokeStyle = C.amberD; g.lineWidth = 3; g.beginPath(); g.roundRect(-64, -46, 128, 92, 7); g.stroke();
      label(g, '?', 0, 12, C.ink, 'center', 34); g.restore();
    }
    label(g, 'no information', 1590 + out, 570, C.ink, 'center', 24, prog(t, T.nothing, T.nothing + 0.6));
  }

  // bục người dẫn (đứng trên sàn — vẽ trong reflect): vào ở "the host", đèn bật ở "knows", rời khung trước twoways
  podium(d, t) {
    const T = this.T, inK = outCubic(prog(t, T.host17 - 0.3, T.host17 + 0.4)), outK = smooth(prog(t, T.your20 - 0.9, T.your20 - 0.3));
    if (inK <= 0 || outK >= 1) return;
    const x = 1590 + (1 - inK) * 600 + outK * 700, top = 600;
    d.fillStyle = C.doorD; d.beginPath(); d.moveTo(x - 150, FLOOR); d.lineTo(x - 125, top); d.lineTo(x + 125, top); d.lineTo(x + 150, FLOOR); d.fill();
    d.fillStyle = C.door; d.beginPath(); d.moveTo(x - 128, FLOOR - 10); d.lineTo(x - 108, top + 26); d.lineTo(x + 108, top + 26); d.lineTo(x + 128, FLOOR - 10); d.fill();
    d.fillStyle = C.frame; d.fillRect(x - 145, top - 14, 290, 16); d.fillStyle = 'rgba(255,255,255,0.4)'; d.fillRect(x - 145, top - 14, 290, 3);
    // đèn trên cần: tắt → sáng ở "knows"
    d.fillStyle = '#8A8070'; d.fillRect(x - 4, top - 150, 8, 136);
    const on = t >= T.knows;
    bulb(d, x, top - 180, 34, on); d.fillStyle = '#8A8070'; d.fillRect(x - 16, top - 152, 32, 18);
  }
  hostSide(g, t) {
    const T = this.T, inK = outCubic(prog(t, T.host17 - 0.3, T.host17 + 0.4)), outK = smooth(prog(t, T.your20 - 0.9, T.your20 - 0.3));
    if (inK <= 0 || outK >= 1) return;
    const x = 1590 + (1 - inK) * 600 + outK * 700, top = 600;
    label(g, 'host', x, top + 150, C.ink, 'center', 28);
    if (t > T.random - 0.1) tag(g, 'not at random', x, top + 75, prog(t, T.random - 0.1, T.random + 0.25), { rot: 0.04, size: 22 });
    label(g, 'knows', x, top - 240, C.ink, 'center', 34, prog(t, T.knows + 0.1, T.knows + 0.5));
    // tia đèn (mực, nét đứt) chỉ thẳng cửa 3 ở "deliberately"
    const kr = prog(t, T.deliberately, T.opens18);
    if (kr > 0) {
      const ax = x - 40, ay = top - 175, bx2 = XS[2] + DW / 2 + 40, by2 = DY + 90;
      g.save(); g.strokeStyle = C.ink; g.globalAlpha = 0.8; g.lineWidth = 3; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(ax, ay); g.lineTo(ax + (bx2 - ax) * kr, ay + (by2 - ay) * kr); g.stroke();
      if (kr >= 1) { g.setLineDash([]); const a = Math.atan2(by2 - ay, bx2 - ax); g.beginPath(); g.moveTo(bx2 - 20 * Math.cos(a - 0.5), by2 - 20 * Math.sin(a - 0.5)); g.lineTo(bx2, by2); g.lineTo(bx2 - 20 * Math.cos(a + 0.5), by2 - 20 * Math.sin(a + 0.5)); g.stroke(); }
      g.restore();
      label(g, 'a goat', (ax + bx2) / 2 + 30, (ay + by2) / 2 - 24, C.ink, 'center', 24, prog(t, T.goat18, T.goat18 + 0.4));
    }
  }
}
