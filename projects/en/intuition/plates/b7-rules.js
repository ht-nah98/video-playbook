// b7 · The rules nobody said (p2 câu 39–47). Camera dolly ngang qua bốn khu (mỗi khu một khung):
//   A thẻ trực giác mới "2/3 ALWAYS" bật lên (halt: "khoan đã"); thẻ luật in "THE RULES": HOST KNOWS ✓ · ALWAYS OPENS A
//     GOAT ✓ · ALWAYS OFFERS SWITCH ✓ (in vào đúng chữ); "change the rules" → dấu ✓ rút đi.
//   B người dẫn NGẪU NHIÊN: đèn rọi nhảy giữa cửa 2/3, lỡ mở trúng XE; ván ra dê: khối ngọc STAY 1/2 · SWITCH 1/2;
//     "2/3 ALWAYS" bị X (buzzer) → bảng lật "2/3 HOLDS ONLY / UNDER THESE RULES".
//   C câu của Monty Hall (NYT 1991) NGUYÊN VĂN lật vào bảng 5 hàng, mỗi hàng đúng lúc lời đọc tới.
//   D CÙNG lớp học của b1 (bảng phấn, ba cửa, hai dãy ghế, "STAY OR SWITCH?", chú thích phim); bảng treo kéo lên. Chỗ ô
//     ANSWER của b1: "THE HOST / DECIDES (sáng đèn) / TO OPEN A DOOR" · "THE HOST MUST:" + ô viền đứt để trống; khoanh
//     SWITCH + ✓ (đáp án sinh viên); nhãn "NEVER SAID OUT LOUD", "THE HOST WORKS TO HIDE THE CAR", "THE DETAIL INTUITION SKIPS".
// Bảng lật treo (toạ độ màn hình, góc trên trái — chừa biển tên mục bên phải) và thẻ "2/3 ALWAYS" đi suốt cảnh.
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, bulb, flap, flapW, ctr,
  door, gutCard, tag, label, text, textW, check, block, card, figure, lookup, must, MONO } from '../kit.js';

const PAGE = W;
const N = 22, CELL = 40, GAP = 5, RH = 62, BX = 150, BY = 100;          // bảng treo: 2 hàng × 22 ô (chữ 46 px)
const QN = 37, QC = 38, QG = 4, QH = 62;                                // câu Monty Hall nguyên văn: 5 hàng × 37 ô (chữ 46)
const CHALK = 'rgba(243,230,207,0.88)';   // phấn như b1

export default class Rules {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b7');
    this.T = {
      before: w(39, 'before'), settled: w(39, 'settled'), detail: w(39, 'detail'), e39: L(39).end,
      depends: w(40, 'depends'), rules40: w(40, 'rules'), knows: w(40, 'knows'), opens40: w(40, 'opens'), goat40: w(40, 'goat'),
      offers: w(40, 'offers'), switch40: w(40, 'switch'),
      change: w(41, 'change'), changes: w(41, 'changes'),
      suppose: w(42, 'suppose'), random: w(42, 'random'), sometimes: w(42, 'sometimes'), accident: w(42, 'accident'), reveals: w(42, 'reveals'),
      games: w(43, 'games'), show: w(43, 'show'), switching: w(43, 'switching'), staying: w(43, 'staying'), even: w(43, 'even'),
      half: w(43, 'half'), e43: L(43).end,
      monty: w(44, 'monty'), required: w(44, 'required'), offer: w(44, 'offer'), take: w(44, 'take'), but44: w(44, 'but'), choice: w(44, 'choice'), beware: w(44, 'beware'),
      look: w(45, 'look'), professor: w(45, 'professor'), decides: w(45, 'decides'), door45: w(45, 'door'), never: w(45, 'never'), has: w(45, 'has'),
      student: w(46, "student's"), right: w(46, 'right'), only: w(46, 'only'), says46: w(46, 'says'),
      good: w(47, 'good'), working: w(47, 'working'), hide: w(47, 'hide'), intuition: w(47, 'intuition'), end: L(47).end,
    };
    const T = this.T;
    this.START = L(39).start; this.FROM = this.START - 1.2;
    this.PAN = [L(42).start - 0.5, L(44).start - 0.55, T.look + 0.1];
    // số trên hình: 2/3 (luật chuẩn), 1/2 (người dẫn ngẫu nhiên, điều kiện ra dê) — CONTENT "Đúng — giữ nguyên"
    const pStay = must('(1/3) / (1/3 + 2/3 * 1/2)', 1 / 2), pSwitch = must('(2/3 * 1/2) / (1/3 + 2/3 * 1/2)', 1 / 2);
    this.V = { std: `${must('2', 2)}/${must('3', 3)}`, stay: pStay, sw: pSwitch, half: '1/2' };
    const V = this.V;
    this.BOARD = [
      [T.before, ctr('BEFORE WE SETTLE IT', N), ' '.repeat(N)],
      [T.detail, null, ctr('ONE DETAIL MATTERS', N)],
      [T.depends, ctr(`${V.std} DEPENDS ON`, N), ctr('THE RULES', N)],
      [T.change, ctr('CHANGE THE RULES', N), ' '.repeat(N)],
      [T.changes, null, ctr('→ THE ANSWER CHANGES', N)],
      [T.suppose, ctr('HOST OPENS AT RANDOM', N), ' '.repeat(N)],
      [T.sometimes, null, ctr('SOMETIMES: THE CAR', N)],
      [T.games, ctr('IF A GOAT SHOWS UP', N), ' '.repeat(N)],
      [T.e43 + 0.15, ctr(`${V.std} HOLDS ONLY`, N), ctr('UNDER THESE RULES', N)],
    ];
    this.QUOTE = [
      // NYT 1991 (CONTENT.md mục 4), nguyên văn, cắt đầu bằng "…"
      [T.required, 0, '…REQUIRED TO OPEN A DOOR ALL THE TIME'],
      [T.offer, 1, 'AND OFFER YOU A SWITCH, THEN YOU'],
      [T.take, 2, 'SHOULD TAKE THE SWITCH.'],
      [T.but44, 3, 'BUT IF HE HAS THE CHOICE WHETHER TO'],
      [T.choice, 4, 'ALLOW A SWITCH OR NOT, BEWARE.'],
    ];
    if (this.QUOTE.some(([, , s]) => [...s].length > QN)) throw new Error('b7: câu Monty Hall quá dài');
  }
  sfx() {
    const T = this.T;
    return [
      ...this.BOARD.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.settled, kind: 'pen' }, { t: T.rules40, kind: 'chip' },
      { t: T.reveals, kind: 'door' }, { t: T.half, kind: 'buzzer' },
      ...this.QUOTE.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.says46, kind: 'chip' }, { t: T.working, kind: 'chip' }, { t: T.intuition, kind: 'chip' },
    ];
  }
  cam(t) { return this.PAN.reduce((x, a) => x + PAGE * smooth(prog(t, a, a + 0.9)), 0); }

  render(g, t) {
    const T = this.T, cx = this.cam(t);
    ground(g);
    g.save(); g.translate(-cx, 0);
    if (cx < PAGE) this.zoneA(g, t);
    if (cx > 0 && cx < 2 * PAGE) this.zoneB(g, t);
    if (cx > PAGE && cx < 3 * PAGE) this.zoneC(g, t);
    if (cx > 2 * PAGE) this.zoneD(g, t);
    g.restore();
    this.board(g, t);
    // thẻ trực giác "2/3 ALWAYS" (toạ độ màn hình): bật lên ở "before", viết ở "settled", X ở "one half"
    gutCard(g, `${this.V.std} ALWAYS`, 300, 890, 400, 190, prog(t, T.settled, T.settled + 0.9), {
      state: 'x', kx: prog(t, T.half, T.half + 0.3), rise: prog(t, T.before - 0.1, T.before + 0.4), rot: -0.05, seed: 53 });
    if (t > T.intuition - 0.1) tag(g, 'the detail intuition skips', 740, 900, prog(t, T.intuition - 0.1, T.intuition + 0.25), { rot: -0.03, size: 22 });
    // halt: "khoan đã — trước khi coi như xong"
    const kh = Math.min(prog(t, T.before - 0.1, T.before + 0.3), 1 - prog(t, T.offers - 0.2, T.offers + 0.25));
    if (kh > 0) figure(g, 'halt', 1690, 1080, 760, kh);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.2), 'ACT ONE', 'The rules nobody said');
  }

  // bảng lật treo, toạ độ màn hình (như a0)
  board(g, t) {
    let r1 = ' '.repeat(N), r2 = r1, p1 = r1, p2 = r1, k1 = 1, k2 = 1;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      if (a != null) { p1 = r1; r1 = a; k1 = prog(t, at, at + 1.1); }
      if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    const bw = flapW(N, CELL, GAP), up = smooth(prog(t, this.PAN[2], this.PAN[2] + 0.7)) * 360;   // kéo lên khi tới lớp học
    if (up >= 360) return;
    g.save(); g.translate(0, -up);
    bulbs(g, BX - 40, BY - 40, bw + 80, 2 * RH + 10 + 80, t);
    flap(g, r1, BX, BY, CELL, k1, { from: p1, gap: GAP, h: RH });
    flap(g, r2, BX, BY + RH + 10, CELL, k2, { from: p2, gap: GAP, h: RH });
    g.restore();
  }

  // ── A: thẻ luật in ──
  zoneA(g, t) {
    const T = this.T, x = 470, y = 340, w = 860, h = 360;
    const kin = prog(t, T.rules40 - 0.35, T.rules40 + 0.1);
    if (kin <= 0) return;
    const dy = (1 - outBack(kin)) * -700, sw = Math.sin(Math.max(0, t - T.rules40) * 2.1) * 0.006 * Math.exp(-Math.max(0, t - T.rules40) * 0.6);
    g.save(); g.translate(x + w / 2, y + dy); g.rotate(sw - 0.012); g.translate(-w / 2, 0);
    g.strokeStyle = 'rgba(234,220,192,0.55)'; g.lineWidth = 2;                      // dây treo
    g.beginPath(); g.moveTo(90, -400); g.lineTo(90, 0); g.moveTo(w - 90, -400); g.lineTo(w - 90, 0); g.stroke();
    g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 24; g.shadowOffsetY = 10; g.fillStyle = '#FBF6EA'; g.fillRect(0, 0, w, h); g.restore();
    g.fillStyle = C.amber; g.fillRect(0, 0, 22, h); g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(22, 0, 2, h);
    label(g, 'the rules', 70, 66, C.label, 'left', 26);
    g.fillStyle = 'rgba(42,26,20,0.35)'; g.fillRect(70, 86, w - 140, 2);
    const rows = [['HOST KNOWS', T.knows], ['ALWAYS OPENS A GOAT', T.opens40], ['ALWAYS OFFERS SWITCH', T.offers]];
    rows.forEach(([s, at], i) => {
      const ry = 160 + i * 74;
      label(g, `${i + 1}`, 70, ry, C.label, 'left', 34, prog(t, at - 0.05, at + 0.05));
      label(g, s, 130, ry, C.label, 'left', 34, prog(t, at, at + 0.5));
      check(g, w - 90, ry - 12, 44, Math.min(prog(t, at + 0.45, at + 0.75), 1 - prog(t, T.change + i * 0.12, T.change + 0.4 + i * 0.12)));
    });
    g.restore();
  }

  // ── B: người dẫn ngẫu nhiên ──
  zoneB(g, t) {
    const T = this.T, X = PAGE, dw = 200, dh = 330, xs = [560, 860, 1160].map(v => X + v), dy = FLOOR - dh;
    // cửa 3: mở ra XE (lỡ tay) → đóng → ván khác mở ra dê
    const o3 = Math.min(outCubic(prog(t, T.reveals, T.reveals + 0.45)), 1 - smooth(prog(t, T.games, T.games + 0.35))) +
      outCubic(prog(t, T.show - 0.1, T.show + 0.35));
    const behind3 = t < T.games + 0.35 ? 'car' : 'goat';
    reflect(g, FLOOR, d => {
      xs.forEach((x, i) => door(d, x, dy, dw, dh, i + 1, i === 2 ? o3 : 0, { behind: i === 2 ? behind3 : 'empty' }));
    });
    // đèn rọi của người dẫn: nhảy ngẫu nhiên (hash) giữa cửa 2 và 3, dừng ở cửa 3 khi "accident"
    if (t > T.random - 0.1 && t < T.games + 0.4) {
      const n = Math.floor((t - T.random) / 0.2), pick = t >= T.accident ? 2 : (hash(n * 3.17 + 5) > 0.5 ? 2 : 1);
      const a = Math.min(prog(t, T.random - 0.1, T.random + 0.1), 1 - prog(t, T.games, T.games + 0.4)), sx = xs[pick] + dw / 2;
      const sg = g.createRadialGradient(sx, FLOOR, 10, sx, FLOOR, 200); sg.addColorStop(0, `rgba(255,214,150,${0.28 * a})`); sg.addColorStop(1, 'rgba(255,214,150,0)');
      g.fillStyle = sg; g.fillRect(sx - 220, dy - 80, 440, dh + 200);
      bulb(g, sx, dy - 52, 11 * a + 0.01, true);
    }
    label(g, 'your pick', xs[0] + dw / 2, FLOOR + 48, C.ink, 'center', 22, prog(t, this.PAN[0] + 0.6, this.PAN[0] + 1.2));
    label(g, 'host, at random', xs[2] + dw / 2, dy - 100, C.dim, 'center', 22, prog(t, T.random, T.random + 0.5));
    // ván ra dê: khối ngọc (diện tích ∝ xác suất) trên cửa 1 (STAY) và cửa 2 (SWITCH)
    const BW = 300, by = dy - 70, bh = 50;
    [[0, T.staying, 'stay', this.V.stay], [1, T.switching, 'switch', this.V.sw]].forEach(([i, at, nm, p]) => {
      const k = outCubic(prog(t, at, at + 0.5)); if (k <= 0) return;
      const bw = BW * p * k, bx = xs[i] + dw / 2 - bw / 2;
      block(g, bx, by, bw, bh, k > 0.9 ? this.V.half : '');
      label(g, nm, xs[i] + dw / 2, by - 18, C.ink, 'center', 22, prog(t, at + 0.1, at + 0.5));
    });
  }

  // ── C: câu của Monty Hall ──
  zoneC(g, t) {
    const T = this.T, X = 2 * PAGE, n = this.QUOTE.length, bw = flapW(QN, QC, QG), bx = X + (W - bw) / 2, by = 384, st = QH + 8;
    const rows = Array(n).fill(' '.repeat(QN)), ks = Array(n).fill(1);
    for (const [at, r, s] of this.QUOTE) { if (t < at) break; rows[r] = s; ks[r] = prog(t, at, at + 1.2); }
    reflect(g, FLOOR, d => {
      bulbs(d, bx - 40, by - 40, bw + 80, n * st - 8 + 80, t);
      rows.forEach((r, i) => flap(d, r, bx, by + i * st, QC, ks[i], { gap: QG, h: QH }));
    });
    label(g, 'monty hall · new york times · 1991', X + W / 2, by - 56, C.ink, 'center', 26, prog(t, T.monty, T.monty + 0.9));
  }

  // ── D: lớp học phim 21, vẽ lại bằng phấn (không người, không ảnh phim) ──
  zoneD(g, t) {
    // CÙNG lớp học của b1 (b1-game.js zoneB): bảng 1120 × 440 ở (660, 150), ba cửa phấn, hai dãy ghế, "STAY OR SWITCH?",
    // chú thích phim; ô ANSWER (1480, 270) của b1 nay là chỗ các dòng DECIDES / MUST.
    const T = this.T, X = 3 * PAGE, bx = X + 660, by = 150, bw = 1120, bh = 440;
    reflect(g, FLOOR, d => {
      d.fillStyle = '#4A3020'; d.fillRect(bx - 24, by - 24, bw + 48, bh + 48);
      d.fillStyle = 'rgba(255,220,170,0.18)'; d.fillRect(bx - 24, by - 24, bw + 48, 3);
      const sg = d.createLinearGradient(0, by, 0, by + bh); sg.addColorStop(0, '#22201F'); sg.addColorStop(1, C.cell); d.fillStyle = sg; d.fillRect(bx, by, bw, bh);
      d.save(); d.beginPath(); d.rect(bx, by, bw, bh); d.clip();
      for (let i = 0; i < 26; i++) { d.fillStyle = `rgba(243,230,207,${0.025 + hash(i * 2.7) * 0.03})`;
        d.fillRect(bx + hash(i * 1.3) * (bw - 200), by + hash(i * 4.1) * (bh - 30), 120 + hash(i * 5.9) * 260, 10 + hash(i) * 22); }
      d.restore();
      d.fillStyle = '#3A2418'; d.fillRect(bx - 30, by + bh + 24, bw + 60, 16);
      d.fillStyle = '#4A3020'; d.fillRect(bx + 80, by + bh + 40, 18, FLOOR - by - bh - 40); d.fillRect(bx + bw - 98, by + bh + 40, 18, FLOOR - by - bh - 40);
    });
    // ba cửa phấn + "STAY OR SWITCH?" (đã có từ b1 — nhìn lại, vẽ sẵn)
    const cw = 170, ch = 250, cy = by + 50;
    [bx + 110, bx + 340, bx + 570].forEach((x, i) => { chalkRect(g, x, cy, cw, ch, 1, 31 + i); label(g, String(i + 1), x + cw / 2, cy + ch * 0.55, C.ink, 'center', 34); });
    const qx = bx + 425, qy = cy + ch + 74, qs = 'STAY OR SWITCH?', qo = { f: MONO, w: 500, ls: 2.5 };
    label(g, qs, qx, qy, C.ink, 'center', 34);
    // cột phải (chỗ ô ANSWER của b1): THE HOST / DECIDES (sáng đèn) / TO OPEN A DOOR · THE HOST MUST: [ ô trống ]
    const x0 = bx + 830, k1 = prog(t, T.professor, T.door45 + 0.3);
    text(g, 'THE HOST', x0, by + 80, 40, CHALK, { k: prog(k1, 0, 0.3) });
    const lit = prog(t, T.decides, T.decides + 0.25), kd = prog(k1, 0.3, 0.55), wd = textW('DECIDES', 56);
    if (kd > 0) {
      if (lit > 0) { g.save(); g.globalAlpha = lit; g.fillStyle = 'rgba(255,192,74,0.14)'; g.fillRect(x0 - 10, by + 88, wd + 20, 70); g.restore(); }
      text(g, 'DECIDES', x0, by + 146, 56, lit > 0.5 ? C.amber : CHALK, { k: kd, glow: lit > 0.5 ? 'rgba(255,170,40,0.8)' : null, blur: 20 });
    }
    text(g, 'TO OPEN A DOOR', x0, by + 200, 40, CHALK, { k: prog(k1, 0.55, 1) });
    text(g, 'THE HOST MUST:', x0, by + 272, 40, CHALK, { k: prog(t, T.never, T.never + 0.6) });
    this.mustBox = [x0, by + 290, 260, 74];
    const kb = prog(t, T.has - 0.1, T.has + 0.5);
    if (kb > 0) dashRect(g, ...this.mustBox, kb, CHALK);
    const kc = prog(t, T.good, T.good + 0.6);
    if (kc > 0) { const [mx, my, ww, hh] = this.mustBox; g.save(); g.strokeStyle = CHALK; g.lineWidth = 3.5;
      g.beginPath(); g.ellipse(mx + ww / 2, my + hh / 2, ww / 2 + 22, hh / 2 + 14, -0.04, -1.8, -1.8 + PI(2.1) * kc); g.stroke(); g.restore(); }
    // đáp án của sinh viên: khoanh phấn quanh SWITCH trong "STAY OR SWITCH?" + ✓
    const wq = textW(qs, 34, qo), sx0 = qx - wq / 2 + textW('STAY OR ', 34, qo), ws = textW('SWITCH', 34, qo);
    const ks = prog(t, T.student, T.student + 0.5);
    if (ks > 0) { g.save(); g.strokeStyle = CHALK; g.lineWidth = 3.5; g.beginPath();
      g.ellipse(sx0 + ws / 2, qy - 12, ws / 2 + 20, 30, -0.03, -1.8, -1.8 + PI(2.1) * ks); g.stroke(); g.restore(); }
    check(g, qx + wq / 2 + 40, qy - 14, 46, prog(t, T.right, T.right + 0.3));
    label(g, "student's answer", sx0 + ws / 2, qy + 50, C.dim, 'center', 22, prog(t, T.student + 0.2, T.student + 0.7));
    if (t > T.says46 - 0.1) tag(g, 'never said out loud', bx + 930, by + 6, prog(t, T.says46 - 0.1, T.says46 + 0.25), { rot: 0.04, size: 26 });
    // giảng đường: hai dãy bàn ghế (như b1)
    [860, 960].forEach((y, r) => {
      g.fillStyle = r ? '#24140F' : C.label; g.fillRect(X + 560, y - 26, 1300, 22);
      g.fillStyle = 'rgba(255,205,160,0.22)'; g.fillRect(X + 560, y - 26, 1300, 3);
      g.fillStyle = r ? '#180D0A' : '#1E120D'; g.fillRect(X + 560, y - 4, 1300, 70);
      for (let i = 0; i < 9; i++) { const sx = X + 640 + i * 140 + r * 70;
        g.fillStyle = r ? '#1A0F0B' : '#2E1D15'; g.beginPath(); g.roundRect(sx, y - 70, 70, 46, 8); g.fill(); }
    });
    label(g, `as seen in the movie ${must('21', 21)} (${must('2008', 2008)})`, bx + bw / 2, by + bh + 104, C.dim, 'center', 24);
    if (t > T.working - 0.1) tag(g, 'the host works to hide the car', X + 1220, 760, prog(t, T.working - 0.1, T.working + 0.25), { rot: -0.02, size: 26 });
  }
}

const PI = m => Math.PI * m;
// ô viền đứt vẽ dần theo chu vi (k)
function dashRect(g, x, y, w, h, k, color) {
  g.save(); g.strokeStyle = color; g.lineWidth = 3; g.setLineDash([12, 9]);
  const per = 2 * (w + h); let L = per * clamp(k);
  const pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
  g.beginPath(); g.moveTo(x, y);
  for (let i = 1; i < pts.length && L > 0; i++) {
    const [ax, ay] = pts[i - 1], [bx2, by2] = pts[i], l = Math.hypot(bx2 - ax, by2 - ay), u = Math.min(1, L / l);
    g.lineTo(ax + (bx2 - ax) * u, ay + (by2 - ay) * u); L -= l;
  }
  g.stroke(); g.restore();
}

// cửa phấn (chép từ b1-game.js để vẽ đúng cùng lớp học)
function chalkRect(g, x, y, w, h, k, seed) {
  const P = [[x, y + h], [x, y], [x + w, y], [x + w, y + h]], seg = [h, w, h], tot = h * 2 + w;
  let left = tot * clamp(k);
  g.save(); g.strokeStyle = CHALK; g.lineWidth = 5; g.lineCap = 'round';
  for (let i = 0; i < 3 && left > 0; i++) {
    const u = Math.min(1, left / seg[i]); left -= seg[i];
    const [x0, y0] = P[i], [x1, y1] = P[i + 1], j = (hash(seed + i) - 0.5) * 4;
    g.beginPath(); g.moveTo(x0 + j, y0); g.lineTo(x0 + (x1 - x0) * u - j, y0 + (y1 - y0) * u + j); g.stroke();
  }
  if (k >= 1) { g.beginPath(); g.arc(x + w * 0.8, y + h * 0.55, 6, 0, Math.PI * 2); g.stroke(); }
  g.restore();
}
