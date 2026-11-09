// b5 · A hundred doors (p2 câu 25–34). Bên trái: tường 100 cửa nhỏ (10 × 10, sơn số 1–100) trong khung bóng đèn
// ("a better picture"); bên phải: bảng lật 3 hàng + khối xác suất ngọc (diện tích ∝ xác suất).
//   25 ba cửa lớn, khung đèn bật ở "picture" · 26 ba cửa nhún ở "three doors" → thu về ô 1·2·3, 97 cửa đổ vào ("a hundred")
//   27 viền mực "YOUR PICK" (cửa 34) · bảng "YOUR PICK / 1/100", khối ngọc 1/100 bé tí, "TINY"
//   28 "HOST KNOWS" → 98 cửa mở lần lượt ra dê (door + goat + tick), bộ đếm "OPENED 98"
//   29 cửa 78 còn đóng: viền đứt + nhãn "LEFT CLOSED" · 30 nhân vật chỉ (point)
//   31 khối 99/100 chảy vào hàng "OTHER DOOR", đèn bật quanh cửa 78, bảng "OTHER DOOR / 99/100" sáng (correct)
//   32 "STILL A WILD GUESS", bảng "YOUR DOOR / STILL 1/100" · 33 mũi tên mực cửa 34 → cửa 78
//   34 bảng "THREE DOORS / SAME GAME / SMALLER NUMBERS", ba cửa nhỏ với khối 1/3 · 2/3 trượt vào thay khối 1/100 · 99/100.
import { W, H, C, clamp, hash, smooth, outBack, outCubic, prog, ground, bulbs, flap, flapW, ctr, door, block, tag, label,
  text, card, figure, mk, lookup, must } from '../kit.js';

const FL = 1010;                                     // sàn hạ thấp: tường cửa đứng từ trên xuống
const GX = 520, GY = 140, PX = 66, PY = 86, DW = 46, DH = 72;     // lưới 10 × 10
const NB = 15, BC = 30, BG = 4, BX = 1290, BY = 200, BRH = 49, BP = 58, BW = flapW(NB, BC, BG);   // bảng lật phải
const PICK = 34, OTHER = 78;                         // số sơn trên cửa (1-based)
const pos = n => [GX + ((n - 1) % 10) * PX, GY + Math.floor((n - 1) / 10) * PY];
const blank = ' '.repeat(NB);
const SPR = {};
function sprite(num, open) {                          // cửa nhỏ vẽ sẵn (100 khung có bóng đổ — vẽ live thì chậm)
  const key = open ? 'open' : num; if (SPR[key]) return SPR[key];
  const c = mk(DW + 40, DH + 40); door(c.getContext('2d'), 20, 20, DW, DH, num, open ? 1 : 0, { behind: 'goat' });
  return (SPR[key] = c);
}

export default class Hundred {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b5');
    this.T = {
      picture: w(25, 'picture'), three: w(26, 'three'), hundred: w(26, 'hundred'),
      pick: w(27, 'pick'), one27: w(27, 'one', 2), tiny: w(27, 'tiny'),
      knows: w(28, 'knows'), n98: w(28, 'ninety-eight'), goat: w(28, 'goat'), along: w(28, 'along'),
      one29: w(29, 'one'), obvious: w(30, 'now'), n99: w(31, 'ninety-nine'), skipped: w(31, 'skipped'), almost: w(31, 'almost'),
      wild: w(32, 'wild'), one32: w(32, 'one'), sw: w(33, 'switch'), threeDoor: w(34, 'three-door'), small: w(34, 'small'),
    };
    const T = this.T;
    this.START = L(25).start; this.FROM = this.START - 1.2;
    // toán: 100 cửa, giữ 1/100, đổi 99/100, mở 98 (CONTENT "Đúng — giữ nguyên"); ba cửa 1/3 · 2/3
    const n = must('10 * 10', 100), opened = must(`${n} - 2`, 98);
    this.V = { n, opened, pick: must('1 / 100', 0.01), other: must('99 / 100', 0.99), p3: must('1 / 3', 1 / 3), s3: must('2 / 3', 2 / 3) };
    this.ORDER = []; for (let i = 1; i <= n; i++) if (i !== PICK && i !== OTHER) this.ORDER.push(i);
    if (this.ORDER.length !== opened) throw new Error('b5: số cửa mở sai');
    const a = T.n98 + 0.05, b = T.along + 0.35;
    this.OPEN = {}; this.ORDER.forEach((d, j) => { this.OPEN[d] = a + j * (b - a) / opened; });
    this.OPEN_END = b;
    this.BOARD = [
      [T.hundred, ctr(`${n} DOORS`, NB), null, null],
      [T.one27, null, ctr('YOUR PICK', NB), ctr(`1/${n}`, NB)],
      [T.knows, ctr('HOST KNOWS', NB), null, null],
      [T.n98, 'COUNT', null, null],
      [T.almost, null, ctr('OTHER DOOR', NB), ctr(`${n - 1}/${n}`, NB)],
      [T.one32, null, ctr('YOUR DOOR', NB), ctr(`STILL 1/${n}`, NB)],
      [T.threeDoor, ctr('THREE DOORS', NB), ctr('SAME GAME', NB), blank],
      [T.small, null, null, ctr('SMALLER NUMBERS', NB)],
    ];
  }
  sfx() {
    const T = this.T, out = this.BOARD.filter(([t]) => t !== T.n98 && t !== T.almost).map(([t]) => ({ t, kind: 'flap' }));
    out.push({ t: T.n98, kind: 'door' }, { t: T.goat, kind: 'goat' }, { t: T.one29, kind: 'chip' },
      { t: T.n99, kind: 'whoosh' }, { t: T.almost, kind: 'correct' });
    for (let t = T.n98 + 0.3; t < this.OPEN_END; t += 0.2) if (Math.abs(t - T.goat) > 0.3) out.push({ t: +t.toFixed(3), kind: 'tick' });
    return out;
  }
  openK(d, t) { const a = this.OPEN[d]; return a == null ? 0 : outCubic(prog(t, a, a + 0.3)); }

  render(g, t) {
    const T = this.T;
    ground(g, 'stage', { floor: FL });
    this.wall(g, t);
    this.panel(g, t);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.1), 'ACT ONE', 'A HUNDRED DOORS');
    // nhân vật chỉ vào tường cửa: "Now it's obvious" → "your door is still the wild guess"
    const kf = Math.min(prog(t, T.obvious - 0.15, T.obvious + 0.25), 1 - prog(t, T.wild + 0.4, T.wild + 0.8));
    if (kf > 0) figure(g, 'point', 255, 1080, 740, kf, { crop: 1 });
  }

  // ── tường cửa trái ──
  wall(g, t) {
    const T = this.T, u = smooth(prog(t, T.hundred - 0.15, T.hundred + 0.5));
    // khung đèn: quanh ba cửa lớn (bật ở "picture") → nở ra bao cả lưới ("a hundred")
    const A = [516, 650, 640, 364], B = [GX - 44, GY - 44, 9 * PX + DW + 88, 9 * PY + DH + 88];
    const R = A.map((v, i) => v + (B[i] - v) * u), kf = prog(t, T.picture - 0.2, T.picture + 0.3);
    if (kf > 0) bulbs(g, R[0], R[1] + (1 - outBack(kf)) * 500, R[2], R[3], t, { pad: 16, r: 6, step: 30 });
    // ba cửa lớn → ô 1·2·3
    for (let i = 0; i < 3; i++) {
      const hop = Math.sin(Math.PI * prog(t, T.three + i * 0.12, T.three + 0.3 + i * 0.12)) * 26;
      const bx = 556 + i * 200, by = 700, bw = 150, bh = 270, [gx, gy] = pos(i + 1);
      const rise = (1 - outBack(prog(t, this.FROM + 0.3 + i * 0.1, this.FROM + 0.8 + i * 0.1))) * 600;
      door(g, bx + (gx - bx) * u, by + (gy - by) * u - hop + rise * (1 - u), bw + (DW - bw) * u, bh + (DH - bh) * u, i + 1, u >= 1 ? this.openK(i + 1, t) : 0, { behind: 'goat' });
    }
    if (u <= 0) return;
    // ô chờ viền đứt cho 97 cửa, rồi cửa đổ vào theo hàng
    for (let d = 4; d <= this.V.n; d++) {
      const [x, y] = pos(d), a = T.hundred + 0.1 + (d - 4) * 0.006, k = outBack(prog(t, a, a + 0.25));
      if (k <= 0) { g.save(); g.strokeStyle = 'rgba(234,220,192,0.3)'; g.setLineDash([5, 5]); g.strokeRect(x, y, DW, DH); g.restore(); continue; }
      const o = this.openK(d, t);
      g.save(); g.translate(x + DW / 2, y + DH); g.scale(k, k); g.translate(-x - DW / 2, -y - DH);
      if (o <= 0) g.drawImage(sprite(d, false), x - 20, y - 20);
      else if (o >= 1) g.drawImage(sprite(d, true), x - 20, y - 20);
      else door(g, x, y, DW, DH, d, o, { behind: 'goat' });
      g.restore();
    }
    const [ox, oy] = pos(OTHER);                                        // đèn quanh cửa 78 vẽ đè hàng xóm, rồi cửa lên trên
    if (this.otherLights(g, t, ox, oy)) g.drawImage(sprite(OTHER, false), ox - 20, oy - 20);
    this.marks(g, t);
  }
  otherLights(g, t, x, y) {                                             // "carefully skipped that one" — đèn bật quanh cửa 78
    const k = prog(t, this.T.skipped, this.T.skipped + 0.4); if (k <= 0) return false;
    bulbs(g, x - 22, y - 22 + (1 - outBack(k)) * 30, DW + 44, DH + 40, t, { pad: 8, r: 4, step: 15 }); return true;
  }
  marks(g, t) {
    const T = this.T, [px, py] = pos(PICK), [ox, oy] = pos(OTHER);
    // viền mực quanh cửa chọn (§61: màu mực, không màu nghĩa)
    const kp = prog(t, T.pick, T.pick + 0.4);
    if (kp > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.beginPath(); g.roundRect(px - 10, py - 10, DW + 20, DH + 16, 6);
      g.setLineDash([(2 * (DW + DH) + 72) * kp, 2000]); g.stroke(); g.restore(); }
    if (t > T.pick + 0.1) tag(g, 'your pick', px + DW / 2, py - 26, prog(t, T.pick + 0.1, T.pick + 0.45), { size: 20, rot: -0.04 });
    // cửa còn đóng: viền đứt + nhãn
    const ko = prog(t, T.one29 - 0.1, T.one29 + 0.4);
    if (ko > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.setLineDash([10, 7]); g.lineDashOffset = -t * 20;
      g.beginPath(); g.roundRect(ox - 10, oy - 10, DW + 20, DH + 16, 6); g.globalAlpha = Math.min(1, ko * 2); g.stroke(); g.restore(); }
    if (t > T.one29) tag(g, 'left closed', ox + DW / 2, oy - 26, prog(t, T.one29, T.one29 + 0.35), { size: 20, rot: 0.03 });
    // "Of course you switch": mũi tên mực từ cửa chọn sang cửa còn lại
    const ka = outCubic(prog(t, T.sw - 0.3, T.sw + 0.4));
    if (ka > 0) {
      const P0 = [px + DW + 14, py + DH / 2], P1 = [ox + DW / 2 - 140, py + 40], P2 = [ox - 16, oy + DH / 2 - 6];
      const q = u => [(1 - u) ** 2 * P0[0] + 2 * u * (1 - u) * P1[0] + u * u * P2[0], (1 - u) ** 2 * P0[1] + 2 * u * (1 - u) * P1[1] + u * u * P2[1]];
      g.save(); g.lineCap = g.lineJoin = 'round'; g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 10;
      g.strokeStyle = C.ink; g.lineWidth = 7; g.beginPath(); g.moveTo(...P0);
      for (let i = 1; i <= 40; i++) { const u = ka * i / 40; g.lineTo(...q(u)); } g.stroke();
      if (ka > 0.97) { const [ex, ey] = q(1), [bx, by] = q(0.94), a = Math.atan2(ey - by, ex - bx);
        g.fillStyle = C.ink; g.beginPath(); g.moveTo(ex + 6 * Math.cos(a), ey + 6 * Math.sin(a));
        g.lineTo(ex - 24 * Math.cos(a - 0.5), ey - 24 * Math.sin(a - 0.5)); g.lineTo(ex - 24 * Math.cos(a + 0.5), ey - 24 * Math.sin(a + 0.5)); g.fill(); }
      g.restore();
    }
  }

  // ── bảng lật + khối xác suất bên phải ──
  panel(g, t) {
    const T = this.T, drop = (1 - outBack(prog(t, this.FROM + 0.3, this.FROM + 0.8))) * -500;
    g.save(); g.translate(0, drop);
    bulbs(g, BX - 46, BY - 46, BW + 92, 2 * BP + BRH + 92, t);
    const r = [blank, blank, blank], p = [blank, blank, blank], k = [1, 1, 1];
    let count = false;
    for (const [at, ...rows] of this.BOARD) {
      if (t < at) break;
      let lag = 0;
      rows.forEach((s, i) => { if (s == null) return;
        if (s === 'COUNT') { count = true; p[i] = r[i]; return; }
        if (i === 0) count = false;
        p[i] = r[i]; r[i] = s; k[i] = prog(t, at + lag, at + lag + 1.1); lag += 0.25; });
    }
    if (count) {                                                          // bộ đếm cửa đã mở
      const nOpen = this.ORDER.filter(d => this.openK(d, t) >= 0.5).length;
      r[0] = ctr(`OPENED ${String(nOpen).padStart(2)}`, NB); k[0] = 1;
      if (nOpen === 0) { r[0] = ctr('OPENED  0', NB); k[0] = prog(t, T.n98, T.n98 + 0.3); }
      if (t >= this.OPEN_END + 0.3) must(String(nOpen), this.V.opened);
    }
    r.forEach((s, i) => flap(g, s, BX, BY + i * BP, BC, k[i], { from: p[i], gap: BG, h: BRH }));
    g.restore();

    // khối xác suất: hàng "YOUR PICK" (1/100) + hàng "OTHER DOOR" (99/100) — trượt ra phải khi về ba cửa
    const sl = smooth(prog(t, T.threeDoor - 0.2, T.threeDoor + 0.5)) * 700;
    if (sl < 700) {
      g.save(); g.translate(sl, 0);
      const k1 = prog(t, T.one27, T.one27 + 0.5);
      if (k1 > 0) {
        label(g, 'your pick', BX, 476, C.dim, 'left', 20, k1 * 1.5);
        block(g, BX, 490, Math.max(4, BW * this.V.pick * outCubic(k1)), 46);
        text(g, `1/${this.V.n}`, BX + 22, 528, 34, C.ink, { k: k1 * 1.5 });
        label(g, 'tiny', BX + 120, 524, C.dim, 'left', 20, prog(t, T.tiny, T.tiny + 0.3));
        label(g, 'still a wild guess', BX + 120, 524 + 34, C.dim, 'left', 20, prog(t, T.wild, T.wild + 0.6));
      } else { g.save(); g.strokeStyle = 'rgba(234,220,192,0.3)'; g.setLineDash([6, 6]); g.strokeRect(BX, 490, BW, 46); g.restore(); }
      const k2 = prog(t, T.n99, T.n99 + 0.9);
      if (k2 > 0) {
        label(g, 'other door', BX, 626, C.dim, 'left', 20, k2 * 2);
        block(g, BX, 640, BW * this.V.other * outCubic(k2), 50, k2 >= 1 ? `${this.V.n - 1}/${this.V.n}` : '');
      } else if (t > T.one29) { g.save(); g.strokeStyle = 'rgba(234,220,192,0.3)'; g.setLineDash([6, 6]); g.strokeRect(BX, 640, BW, 50); g.restore(); }
      g.restore();
    }
    // ba cửa: cùng trò chơi, số nhỏ hơn — cửa 1 chọn, cửa 3 mở ra dê, khối 1/3 · 2/3
    const ki = outCubic(prog(t, T.threeDoor, T.threeDoor + 0.6));
    if (ki > 0) {
      g.save(); g.translate((1 - ki) * 700, 0);
      const w1 = BW * this.V.p3, w2 = BW * this.V.s3, xs = [BX + w1 / 2 - 50, BX + w1 + w2 / 4 - 50, BX + w1 + 3 * w2 / 4 - 50];
      xs.forEach((x, i) => door(g, x, 470, 100, 180, i + 1, i === 2 ? outCubic(prog(t, T.threeDoor + 0.9, T.threeDoor + 1.4)) : 0, { behind: 'goat' }));
      g.strokeStyle = C.ink; g.lineWidth = 4; g.beginPath(); g.roundRect(xs[0] - 12, 458, 124, 202, 6); g.stroke();
      block(g, BX, 690, w1 - 4, 46, '1/3'); block(g, BX + w1 + 4, 690, w2 - 4, 46, '2/3');
      g.restore();
    }
  }
}
