// P20b final — "In đủ bốn lượt" (điệp khúc cuối, ĐỈNH). Thẻ công thức bay đi, hình ở lại; điểm xuất phát rơi; họ in lại;
// hàng trăm dải hồng bung ra quét ngang khung ("set it free"); ba con dấu; lật tờ lộ ∫ in sẵn BÊN DƯỚI; cỗ máy chạy hết
// cỡ; khay ra in ba kết quả của bài: 8 · 16/3 · 8π.
import { W, H, clamp, smooth, prog, lerp, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, stamp } from '../kit.js';
import { press, flow } from '../press.js';

const CARDS = ['∫ 3t² dt = t³ + C', 'd/dx (t³) = 3t²', 'V = ∫ A(x) dx', 'F(b) − F(a)'];
const STAMPS = [['RATE → AMOUNT', 'pink', 'Rate to amount.'], ['HEIGHT → AREA', 'blue', 'Height to area.'], ['AREA → VOLUME', 'yellow', 'Area to volume.']];
const INPUTS = ['RATE', 'HEIGHT', 'SLICE', 'WATER', 'MASS', 'ENERGY'];
const F = u => u * u * u / 3 - u, Cs = [-9, -6, -3, 0, 3, 6, 9];

export default class P20b {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L("Don't memorise"); this.tSee = L('what you can see.'); this.tLose = L('Lose the start,'); this.tFam = L('recover the family,');
    this.tFree = L('take the change'); this.tSet = L('and set it free.'); STAMPS.forEach(st => st.t = L(st[2], st[2] === 'Area to volume.' ? 1 : 3));
    this.tUnder = L('Same idea underneath.'); this.tMach = L('Same machine.', 3); this.tInput = L('Different input.', 3);
    this.tKnow = L('Now you know'); this.end = L('Why does it work?');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 3 }); }
  page(t) {
    const peel = smooth(prog(t, this.tUnder, this.tUnder + 0.9)), lift = peel * -1300;
    // ∫ in sẵn bên dưới — lộ ra khi các tờ lật lên
    if (peel > 0) R.ink('key', c => { c.font = 'italic 300 820px "Cormorant Garamond"'; c.textAlign = 'center'; c.fillText('∫', 560, 800); });
    if (peel > 0) R.ink('yellow', c => { c.font = 'italic 300 820px "Cormorant Garamond"'; c.textAlign = 'center'; c.fillText('∫', 578, 810); });
    const up = c => c.translate(0, lift);
    if (peel < 1 && t < this.tFam) {        // hình ở lại khi thẻ công thức bay đi: vùng 3t² = 8
      const X = u => 720 + u * 300, Y = v => 860 - v * 50;
      R.ink('blue', c => { up(c); c.beginPath(); c.moveTo(X(0), Y(0)); for (let u = 0; u <= 2.0001; u += 0.02) c.lineTo(X(u), Y(3 * u * u)); c.lineTo(X(2), Y(0)); c.closePath(); c.fill(); });
      R.ink('key', c => { up(c); c.lineWidth = 4; c.beginPath(); c.moveTo(X(-0.1), Y(0)); c.lineTo(X(2.2), Y(0)); c.stroke(); c.font = '900 110px "Archivo"'; c.fillText('8', X(0.35), Y(5)); });
    }
    if (peel < 1) {
      // thẻ công thức: dập vào rồi bay đi ("đừng học thuộc")
      CARDS.forEach((txt, i) => {
        const tin = this.t0 + i * 0.12, fly = smooth(prog(t, this.tSee + i * 0.06, this.tSee + 0.5 + i * 0.06));
        if (t < tin || fly >= 1) return;
        const x = 200 + (i % 2) * 760 + fly * (i % 2 ? 1400 : -1400), y = 260 + Math.floor(i / 2) * 240 - fly * 300;
        R.ink('yellow', c => { up(c); c.translate(x, y); c.rotate((hash(i) - 0.5) * 0.12 + fly); c.fillRect(0, 0, 620, 150); });
        R.ink('key', c => { up(c); c.translate(x, y); c.rotate((hash(i) - 0.5) * 0.12 + fly); c.lineWidth = 3; c.strokeRect(0, 0, 620, 150); c.font = '500 44px "IBM Plex Mono"'; c.fillText(txt, 30, 92); });
      });
      // điểm xuất phát vàng rơi khỏi khung
      if (t >= this.tSee && t < this.tFam + 0.6) { const d = prog(t, this.tLose, this.tLose + 0.8);
        R.ink('yellow', c => { up(c); c.beginPath(); c.arc(260, 540 + d * d * 900, 70, 0, 7); c.fill(); });
        R.ink('key', c => { up(c); c.lineWidth = 4; c.beginPath(); c.arc(260, 540 + d * d * 900, 70, 0, 7); c.stroke(); c.font = '500 26px "IBM Plex Mono"'; c.fillText('start', 222, 640 + d * d * 900); }); }
      // họ: in lại ngang khung
      if (t >= this.tFam) Cs.forEach((C, i) => { const p = clamp((t - this.tFam - i * 0.06) / 0.1); if (p <= 0) return;
        R.ink(C === 0 ? 'blue' : i % 2 ? 'pink' : 'blue', c => { up(c); c.lineWidth = C === 0 ? 16 : 10; c.beginPath();
          for (let u = -2.2; u <= 2.5; u += 0.02) { const px = 960 + u * 380, py = 560 - (F(u) + C) * 38 + (1 - p) * 40; u === -2.2 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke(); }); });
      // giải phóng phần thay đổi: dải hồng bung ra quét ngang
      if (t >= this.tFree) R.ink('pink', c => { up(c);
        for (let i = 0; i < 160; i++) { const st = this.tFree + hash(i * 1.3) * 1.8, p = (t - st) / 1.4; if (p < 0 || p > 1) continue;
          const y = hash(i * 7.1) * H, x = lerp(-300, W + 300, p * p * (3 - 2 * p)) + (hash(i * 2.2) - 0.5) * 300;
          c.save(); c.translate(x, y); c.rotate((hash(i * 3.3) - 0.5) * 0.5); c.fillRect(-90, -14, 180 + hash(i) * 200, 28); c.restore(); } });
      // ba con dấu
      STAMPS.forEach(([txt, ink, , ], i) => { const st = STAMPS[i].t, k = (t - st) / 0.12; if (k <= 0) return;
        R.ink(ink, c => { up(c); c.translate(960, 300 + i * 220); c.rotate((i - 1) * 0.06); c.fillRect(-640, -90, 1280, 170); });
        R.ink('key', c => { up(c); c.translate(960, 300 + i * 220); c.rotate((i - 1) * 0.06); c.font = '900 120px "Archivo"'; c.textAlign = 'center'; c.fillText(txt, (1 - clamp(k)) * 30, 42); }); });
    }
    // cỗ máy hết cỡ + khay ra ba kết quả
    const mk = smooth(prog(t, this.tMach - 0.3, this.tMach + 0.2));
    if (mk > 0) {
      const i = Math.floor((t - this.tInput) / (this.s.beat.BEAT / 2));
      press({ x: lerp(2400, 1420, mk), y: 190, h: 760 }, { card: t >= this.tInput ? INPUTS[((i % 6) + 6) % 6] : 'RATE', out: null,
        strips: flow(t, this.tMach - 0.3, 0.08, 0.8).map(x => ({ ...x, ink: 'pink' })) });
    }
    if (t >= this.tKnow) [['8', 760], ['16/3', 900], ['8π', 1200]].forEach(([v, x], i) => stamp(v, x, 200, '900 110px "Archivo"', { k: (t - this.tKnow - i * 0.25) / 0.12, shadow: ['pink', 'blue', 'yellow'][i], ink: 'key' }));
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 130, y: 160, px: 80 }));
  }
}
