// b4 · Ten thousand letters (p2 câu 21–24). Một bảng lật treo trên cao (logic) kể chuyện bằng chữ, sân khấu bên dưới:
//   21 "still feels wrong … good company": bảng lật "STILL FEELS WRONG?" / "GOOD COMPANY", nhân vật giật mình (startled).
//   22 vos Savant (KHÔNG có ảnh — chỉ chữ): "MARILYN VOS SAVANT / PARADE · 1990"; mẩu báo "ASK MARILYN" trượt lên ở
//      "magazine column", nhãn in "SWITCH." dán vào ở "Switch".
//   23 thư rơi đầy sàn, bộ đếm lật "≈ 10,000 LETTERS"; thẻ trực giác "YOU'RE WRONG!" bật lên từ đống thư (KHÔNG X — không
//      thuộc ba chỗ bị X của DNA); "NEARLY 1,000 PHDS", vài bao thư đóng dấu "PHD".
//   24 thư bị quét khỏi sân khấu; ảnh Erdős (duotone, khung đèn) + "PAUL ERDŐS"; "NOT CONVINCED" → "CONVINCED BY / A
//      COMPUTER"; màn hình máy tính lăn vào chơi ván ba cửa liên tục ("over and over") — mồi cho b6.
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, ctr, door,
  gutCard, tag, label, text, portrait, card, figure, lookup, must } from '../kit.js';

const N = 20, CELL = 44, GAP = 6, BW = flapW(N, CELL, GAP), BX = (W - BW) / 2, BY = 170, RH = 72;
const blank = ' '.repeat(N);
const fmt = n => n.toLocaleString('en-US');

export default class Letters {
  static ERA = 'stage';
  static IMAGES = { erdos: './assets/history/erdos.jpg' };
  static POSES = ['startled'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b4');
    this.T = {
      that: w(21, 'that'), feels: w(21, 'feels'), good: w(21, 'good'),
      marilyn: w(22, 'marilyn'), magazine: w(22, 'magazine'), column: w(22, 'column'), sw: w(22, 'switch'),
      ten: w(23, 'ten'), letters: w(23, 'letters'), arrived: w(23, 'arrived'), them: w(23, 'them'), wrong: w(23, 'wrong'),
      thousand2: w(23, 'thousand', 2), signed: w(23, 'signed'),
      even: w(24, 'even'), paul: w(24, 'paul'), maths: w(24, 'mathematicians'), twentieth: w(24, 'twentieth'),
      wasnt: w(24, "wasn't"), computer: w(24, 'computer'), play: w(24, 'play'), e24: L(24).end,
    };
    const T = this.T;
    this.START = L(21).start; this.FROM = this.START - 1.2;
    // số liệu CONTENT.md: ~10.000 thư, gần 1.000 tiến sĩ, 1990
    this.V = { letters: must('10 * 1000', 10000), phds: must('1000', 1000), year: must('1990', 1990) };
    const V = this.V;
    this.LET = n => ctr(`≈ ${fmt(n).padStart(6)} LETTERS`, N);           // chuỗi bộ đếm (bề rộng cố định, "LETTERS" đứng yên)
    this.CNT = [T.ten, T.arrived + 0.45];                                // bộ đếm chạy 0 → 10,000
    this.BOARD = [
      [T.that, ctr('STILL FEELS WRONG?', N), null],
      [T.good, null, ctr('GOOD COMPANY', N)],
      [T.marilyn, ctr('MARILYN VOS SAVANT', N), ctr(`PARADE · ${V.year}`, N)],
      [T.ten, null, 'COUNT'],
      [T.thousand2, ctr(`NEARLY ${fmt(V.phds)} PHDS`, N), null],
      [T.wasnt, ctr('NOT CONVINCED', N), blank],
      [T.computer, ctr('CONVINCED BY', N), ctr('A COMPUTER', N)],
    ];
    this.GAME0 = T.play - 0.25; this.GAMEP = 0.5;                       // máy chơi một ván mỗi 0.5 s
  }
  sfx() {
    const T = this.T, out = [];
    for (const [t] of this.BOARD) if (t !== T.ten) out.push({ t, kind: 'flap' });
    out.push({ t: T.sw, kind: 'chip' }, { t: T.them, kind: 'pen' }, { t: T.paul, kind: 'shimmer' });
    for (let i = 0; i < 6; i++) out.push({ t: +(this.CNT[0] + 0.05 + i * 0.25).toFixed(3), kind: 'tick' });   // bộ đếm thư
    for (let t = this.GAME0 + this.GAMEP; t < this.T.e24 + 0.1; t += this.GAMEP) out.push({ t: +t.toFixed(3), kind: 'tick' }); // ván máy
    return out;
  }

  render(g, t) {
    const T = this.T;
    ground(g);
    // ── bảng lật treo: rơi vào từ trên ở FROM + 0.3 ──
    this.clipping(g, t);
    this.letters(g, t);                                                 // thư rơi SAU bảng treo (không che chữ bảng)
    const drop = (1 - outBack(prog(t, this.FROM + 0.3, this.FROM + 0.8))) * -460;
    g.save(); g.translate(0, drop);
    bulbs(g, BX - 46, BY - 46, BW + 92, 2 * RH + 12 + 92, t);
    this.board(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.1), 'ACT ONE', 'TEN THOUSAND LETTERS');
    this.erdos(g, t);
    this.computer(g, t);
    // nhân vật giật mình: "still feels wrong" → hết câu vos Savant (≈ 7.6 s), bên phải
    const kf = Math.min(prog(t, T.feels - 0.1, T.feels + 0.3), 1 - prog(t, T.sw + 0.4, T.sw + 0.8));
    if (kf > 0) figure(g, 'startled', 1660, 1080, 740, kf, { crop: 1 });
  }

  board(g, t) {
    const fin = this.LET(this.V.letters);
    let r = [blank, blank], p = [blank, blank], k = [1, 1], counting = false;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      if (a != null) { p[0] = r[0]; r[0] = a; k[0] = prog(t, at, at + 1.1); }
      if (b === 'COUNT') { counting = true; p[1] = r[1]; r[1] = fin; }
      else if (b != null) { counting = false; p[1] = r[1]; r[1] = b; k[1] = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    if (counting) {                                                     // bộ đếm: 24 bước, mỗi bước lật các ô số đổi
      const [a, b] = this.CNT, u = prog(t, a, b), S = 24, j = Math.min(S, Math.floor(u * S)), f = u * S - j;
      const val = i => Math.round(this.V.letters * smooth(i / S) / 100) * 100;
      if (j === 0) { k[1] = clamp(f * 1.6); r[1] = this.LET(0); }          // hàng "GOOD COMPANY" lật thành "≈ 0 LETTERS"
      else { r[1] = this.LET(val(j)); p[1] = this.LET(val(j - 1)); k[1] = j >= S ? 1 : clamp(f * 1.6); }
    }
    flap(g, r[0], BX, BY, CELL, k[0], { from: p[0], gap: GAP, h: RH });
    flap(g, r[1], BX, BY + RH + 12, CELL, k[1], { from: p[1], gap: GAP, h: RH });
  }

  // ── mẩu báo "ASK MARILYN": trượt lên ở "magazine", nhãn SWITCH. dán ở "Switch", rơi khỏi khung ở "ten" ──
  clipping(g, t) {
    const T = this.T, kin = outCubic(prog(t, T.magazine - 0.2, T.magazine + 0.35)), kout = Math.pow(prog(t, T.ten, T.ten + 0.6), 2);
    if (kin <= 0 || kout >= 1) return;
    const cx = 900, cy = 600 + (1 - kin) * 600 + kout * 700, w = 560, h = 300;
    g.save(); g.translate(cx, cy); g.rotate(-0.025 + kout * 0.3);
    g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 24; g.shadowOffsetY = 10; g.fillStyle = '#EFE7D6';
    g.fillRect(-w / 2, -h / 2, w, h); g.restore();
    g.fillStyle = 'rgba(120,95,60,0.08)'; for (let i = 0; i < 40; i++) g.fillRect(-w / 2 + hash(i * 2.1) * w, -h / 2 + hash(i * 3.3) * h, 3 + hash(i) * 8, 1);
    label(g, 'ASK MARILYN', -w / 2 + 34, -h / 2 + 56, C.label, 'left', 28, prog(t, T.magazine, T.magazine + 0.5));
    label(g, `PARADE · ${this.V.year}`, w / 2 - 34, -h / 2 + 54, C.label, 'right', 18, prog(t, T.magazine + 0.2, T.magazine + 0.6));
    g.fillStyle = C.label; g.fillRect(-w / 2 + 34, -h / 2 + 76, (w - 68) * prog(t, T.magazine, T.column), 3);
    // cột chữ: vạch xám thay chữ (không bịa lời trích)
    for (let i = 0; i < 6; i++) {
      const lw = (w - 68) * (i === 5 ? 0.55 : 0.9 + hash(i * 4.4) * 0.1) * prog(t, T.column + i * 0.1, T.column + 0.3 + i * 0.1);
      g.fillStyle = 'rgba(42,26,20,0.28)'; g.fillRect(-w / 2 + 34, -h / 2 + 104 + i * 26, lw, 10);
    }
    g.restore();
    if (t > T.sw - 0.1) tag(g, 'switch.', cx + 140, cy + 108, prog(t, T.sw - 0.1, T.sw + 0.25), { rot: -0.08 + kout * 0.3, size: 34 });
  }

  // ── thư rơi đầy sàn (bao thư kem như a0), bị quét sang trái ở "even" ──
  letters(g, t) {
    const T = this.T; if (t < T.letters - 0.3) return;
    const sweep = smooth(prog(t, T.even - 0.2, T.even + 0.6)) * 2300; if (sweep >= 2300) return;
    const stamp = prog(t, T.signed, T.signed + 0.8);
    g.save(); g.translate(-sweep, 0);
    for (let i = 0; i < 72; i++) {
      const t0 = T.letters - 0.3 + hash(i * 1.37) * 2.0, k = prog(t, t0, t0 + 0.7); if (k <= 0) continue;
      const ex = 170 + hash(i * 3.7) * 1580, ey = FLOOR + 22 + hash(i * 5.1) * 150;
      const y = -120 + (ey + 120) * k * k, x = ex + Math.sin(k * 6 + i) * 40 * (1 - k), r = (hash(i * 7.9) - 0.5) * 0.9 + (1 - k) * 2.2 * (hash(i) - 0.5);
      g.save(); g.translate(x, y); g.rotate(r * (k < 1 ? 1 : 0.35)); g.scale(1, k < 1 ? 1 : 0.7);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-42, -24, 90, 56);
      g.fillStyle = i % 4 ? C.frame : '#F4EEE2'; g.fillRect(-45, -28, 90, 56);
      g.strokeStyle = 'rgba(42,26,20,0.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-45, -28); g.lineTo(0, 4); g.lineTo(45, -28); g.stroke();
      g.fillStyle = 'rgba(194,122,16,0.75)'; g.fillRect(28, -22, 11, 13);
      if (i % 9 === 0 && k >= 1 && stamp > 0) {                        // "signed by people with doctorates"
        g.strokeStyle = C.label; g.lineWidth = 2; g.strokeRect(-36, 2, 46 * Math.min(1, stamp * 1.5), 22);
        label(g, 'phd', -13, 20, C.label, 'center', 18, stamp);
      }
      g.restore();
    }
    // thẻ trực giác của người viết thư bật lên từ đống thư
    if (t > T.them - 0.4) gutCard(g, "YOU'RE\nWRONG!", 860, 600, 400, 220, prog(t, T.them, T.wrong + 0.3),
      { rise: prog(t, T.them - 0.4, T.them + 0.1), rot: 0.05, seed: 23 });
    g.restore();
  }

  // ── Paul Erdős: chân dung bật ở "Paul", chú thích ở "mathematicians" ──
  erdos(g, t) {
    const T = this.T, k = 1.1 * prog(t, T.paul, T.paul + 1.0); if (k <= 0) return;   // kit.portrait: note cần k ≥ 1.1 mới hiện đủ
    const out = Math.pow(prog(t, T.e24 + 1.0, T.e24 + 1.6), 2) * -1000;   // (không tới trước khi cảnh sau phủ — an toàn)
    g.save(); g.translate(out, 0);
    portrait(g, 'erdos', 470, 430, 330, k, { name: 'Paul Erdős', note: 'PHOTO: KMHKMH · CC BY 3.0', t });
    label(g, 'mathematician', 860, 470, C.ink, 'left', 24, prog(t, T.maths, T.maths + 0.6));
    label(g, '20th century', 860, 508, C.dim, 'left', 22, prog(t, T.twentieth, T.twentieth + 0.5));
    g.restore();
  }

  // ── máy tính: lăn vào từ phải ở "computer", chơi ván ba cửa liên tục ──
  computer(g, t) {
    const T = this.T, kin = outCubic(prog(t, T.computer - 0.35, T.computer + 0.25)); if (kin <= 0) return;
    const X = 1130 + (1 - kin) * 1000, Y = 440, w = 520, h = 300;
    reflect(g, FLOOR, d => {
      d.fillStyle = '#2A2224'; d.fillRect(X + w / 2 - 40, Y + h, 80, FLOOR - Y - h);                  // chân đế
      d.fillStyle = '#1E1819'; d.fillRect(X + w / 2 - 110, FLOOR - 14, 220, 14);
      d.save(); d.shadowColor = 'rgba(0,0,0,0.6)'; d.shadowBlur = 26; d.shadowOffsetY = 10;
      d.fillStyle = '#3A3133'; d.beginPath(); d.roundRect(X, Y, w, h, 18); d.fill(); d.restore();
      d.strokeStyle = 'rgba(255,220,180,0.18)'; d.lineWidth = 2; d.beginPath(); d.roundRect(X + 3, Y + 3, w - 6, h - 6, 16); d.stroke();
      const sx = X + 26, sy = Y + 24, sw = w - 52, sh = h - 48;
      d.fillStyle = '#0E0B0B'; d.beginPath(); d.roundRect(sx, sy, sw, sh, 10); d.fill();
      const on = prog(t, T.computer, T.computer + 0.35);                          // bật màn: vạch sáng nở dọc
      if (on <= 0) return;
      d.save(); d.beginPath(); d.rect(sx, sy + sh / 2 - sh / 2 * on, sw, sh * on); d.clip();
      const n = Math.max(0, Math.floor((t - this.GAME0) / this.GAMEP)), u = t < this.GAME0 ? 0 : (t - this.GAME0) / this.GAMEP - n;
      const car = Math.floor(hash(n * 3 + 1) * 3), pick = Math.floor(hash(n * 3 + 2) * 3);
      const opens = [0, 1, 2].find(i => i !== car && i !== pick);
      const dw = 70, dh = 128, gx = sx + 70, gy = sy + 60;
      for (let i = 0; i < 3; i++) {
        const x = gx + i * 120;
        door(d, x, gy, dw, dh, i + 1, t < this.GAME0 ? 0 : i === opens ? outCubic(clamp((u - 0.25) / 0.3)) : 0, { behind: 'goat' });
        if (i === pick && t >= this.GAME0) { d.fillStyle = C.ink; d.beginPath(); d.moveTo(x + dw / 2 - 10, gy - 22); d.lineTo(x + dw / 2 + 10, gy - 22); d.lineTo(x + dw / 2, gy - 10); d.fill(); }
      }
      if (t >= this.GAME0) label(d, `game ${n + 1}`, sx + sw - 22, sy + 40, C.amber, 'right', 20);
      d.fillStyle = 'rgba(255,255,255,0.04)'; for (let y = sy; y < sy + sh; y += 4) d.fillRect(sx, y, sw, 1);   // vạch quét
      d.restore();
    });
  }
}
