// b10 · Decibels — DNA blocks. Loa phát sóng → tháp 12 tầng "×10" dựng từ "faintest" tới "hurt" (cùng một tháp với địa chấn,
// đổi sticker) → sticker tím 0, 10 … 120 đếm lên ("zero … twenty") → ngoặc tím hai tầng: "+10 dB" = "×10 INTENSITY".
// Mascot pointer (phải) nói ở câu 50.
import { H, C, AR, prog, lookup, must, outCubic, ground, tower, sticker, tag, brace, icon, figure, secTag, DB, line, text, clamp, smooth, rr } from '../kit.js';

const sway = (t, ph = 0) => 0.018 * Math.sin(t * 2.1 + ph);
const TAU = Math.PI * 2;

export default class Decibels {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b10');
    this.T = {
      sound: w(47, 'sound'), dec: w(47, 'decibels'), faint: w(48, 'faintest'), hurt: w(48, 'hurt'), tril: w(48, 'trillion'),
      squeeze: w(49, 'squeeze'), zero: w(49, 'zero'), twenty: w(49, 'twenty'), ten: w(50, 'ten'), ten2: w(50, 'ten', 2),
    };
    this.START = L(47).start;
    this.FROM = Math.max(this.START - 1.2, L(46).end + 0.5);
    this.TOP = L(50).end;
    must(`10 ** (120 / 10)`, DB);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.sound + 0.1, 'beep'), c(T.faint + 0.1, 'wood'), c(T.faint + 0.85, 'wood'), c(T.hurt, 'wood'), c(T.zero, 'tick'), c(T.zero + 0.5, 'tick'),
      c(T.twenty, 'pop'), c(T.ten + 0.05, 'card'), c(T.ten2, 'card')];
  }
  render(g, t) {
    const T = this.T, X = 640, hh = 60, ww = 80, base = 860;
    ground(g, 'table');
    // ô chờ của tháp ngay từ FROM
    const ks = prog(t, this.FROM + 0.3, this.FROM + 0.7), kb = prog(t, T.faint, T.faint + 0.3);
    if (ks > 0 && kb < 1) { g.save(); g.globalAlpha = ks; g.setLineDash([10, 9]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3; g.strokeRect(X - ww / 2, base - hh, ww, hh); g.restore(); }
    // loa + sóng âm lan ra
    const ki = prog(t, T.sound, T.sound + 0.4), sx = 1500, sy = 420;
    if (ki > 0) {
      for (let j = 0; j < 3; j++) { const u = (t * 0.7 + j / 3) % 1, a = (1 - u) * 0.5 * ki;
        g.save(); g.globalAlpha = a; g.strokeStyle = C.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(sx, sy, 90 + u * 150, -0.7, 0.7); g.stroke(); g.restore(); }
      icon(g, 'speaker', sx - 40, sy, 80, ki);
    }
    // đồng hồ dB lớn: kim quét 0 → 120 từ "sound" tới khi tháp bắt đầu dựng, rồi bay lên
    const kg = prog(t, T.sound, T.sound + 0.5), gy = outCubic(prog(t, T.faint - 0.2, T.faint + 0.5)) * 700;
    if (kg > 0 && gy < 700) {
      const cx = 1000, cy = 520, R = 250, a0 = Math.PI * 0.82, a1 = Math.PI * 2.18, sw = smooth(prog(t, T.sound + 0.2, T.dec + 0.9));
      g.save(); g.translate(0, -gy); g.translate(cx, cy); g.scale(outCubic(kg), outCubic(kg));
      g.fillStyle = 'rgba(40,60,80,0.2)'; g.beginPath(); g.arc(8, 12, R + 24, 0, Math.PI * 2); g.fill();
      g.fillStyle = C.card; g.beginPath(); g.arc(0, 0, R + 24, 0, Math.PI * 2); g.fill();
      g.strokeStyle = C.ink; g.lineWidth = 8; g.stroke();
      g.lineCap = 'round'; g.lineWidth = 22; g.strokeStyle = C.log; g.beginPath(); g.arc(0, 0, R - 36, a0, a0 + (a1 - a0) * sw); g.stroke();
      for (let i = 0; i <= 12; i++) {
        const a = a0 + (a1 - a0) * i / 12, big = i % 2 === 0;
        line(g, Math.cos(a) * (R - 6), Math.sin(a) * (R - 6), Math.cos(a) * (R - (big ? 32 : 20)), Math.sin(a) * (R - (big ? 32 : 20)), C.ink, big ? 6 : 4);
        if (big) text(g, String(i * 10), Math.cos(a) * (R - 74), Math.sin(a) * (R - 74), { font: `700 28px ${AR}`, align: 'center', base: 'middle' });
      }
      text(g, 'dB', 0, 90, { font: `900 84px ${AR}`, color: C.logInk, align: 'center', base: 'middle' });
      const na = a0 + (a1 - a0) * sw + 0.015 * Math.sin(t * 9) * (1 - sw);
      line(g, 0, 0, Math.cos(na) * (R - 60), Math.sin(na) * (R - 60), C.base, 12);
      g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 20, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    // tháp 12 tầng
    const k12 = 12 * prog(t, T.faint, T.hurt);
    tower(g, X, base, 12, { s: ww, h: hh, k: k12, label: null });
    tag(g, '×10 EACH', 960, 700, { size: 36, edge: C.base, color: C.baseInk, k: prog(t, T.faint + 0.4, T.faint + 0.8), rot: sway(t, 6) });
    const placed = Math.min(12, Math.floor(k12 + 1e-6));
    const topY = base - placed * hh;
    // nhãn hai đầu
    tag(g, 'FAINTEST SOUND', X + 330, base - 30, { size: 36, k: prog(t, T.faint + 0.1, T.faint + 0.45), rot: sway(t, 1), string: [X + ww / 2 + 20, base - 30] });
    const kh = prog(t, T.hurt, T.hurt + 0.4);
    tag(g, 'LOUD ENOUGH TO HURT', X + 400, 250, { size: 36, k: kh, rot: sway(t, 2), string: [X + ww / 2 + 20, 215] });
    const lt = outCubic(prog(t, T.squeeze - 0.1, T.squeeze + 0.6)) ** 1.5 * 800;
    if (lt < 800 && t >= T.tril - 0.2) { line(g, 1335, -10, 1335, 446 - lt, C.string, 2.5);
      tag(g, '≈ A TRILLION TIMES', 1100, 480 - lt, { size: 44, edge: C.base, color: C.baseInk, k: prog(t, T.tril - 0.2, T.tril + 0.3), rot: sway(t, 3) }); }
    // sticker dB: 0 ở mặt bàn, 10 … 120 trên từng tầng, đếm từ "zero" tới "twenty"
    const a = T.zero, b = T.twenty;
    const k0 = prog(t, a, a + 0.25);
    sticker(g, '0', X - 90, base - 6, { r: 30, k: k0 });
    for (let i = 0; i < 12; i++) { const ti = a + (i + 1) / 13 * (b - a); sticker(g, String((i + 1) * 10), X + 86, base - i * hh - hh / 2, { r: (i + 1) * 10 >= 100 ? 37 : 32, k: prog(t, ti, ti + 0.2) }); }
    if (t >= T.twenty + 0.3) must('12 * 10', 120);
    // +10 dB = ×10: ngoặc tím hai tầng (tầng 8–9)
    const kb2 = prog(t, T.ten, T.ten + 0.5);
    brace(g, X + 146, base - 8 * hh, base - 6 * hh, kb2);
    tag(g, '+10 dB', 1000, 560, { size: 44, edge: C.log, color: C.logInk, k: prog(t, T.ten, T.ten + 0.35), rot: sway(t, 4) });
    tag(g, '= ×10 INTENSITY', 1000, 650, { size: 44, edge: C.base, color: C.baseInk, k: prog(t, T.ten2, T.ten2 + 0.35), rot: sway(t, 5) });
    secTag(g, 'Decibels', { k: prog(t, this.START, this.START + 0.4), t });
    // mascot ở câu 50
    const mk = prog(t, T.ten - 0.5, T.ten), out = outCubic(prog(t, this.TOP + 0.1, this.TOP + 0.6));
    if (mk > 0 && out < 1) { g.save(); g.translate(0, out * 300); figure(g, 'pointer', 1700, H, 262, mk, { t, flip: true }); g.restore(); }
  }
}
