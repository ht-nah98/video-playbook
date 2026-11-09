// Cảnh cỗ máy của điệp khúc 1 và 2 (P09b, P13b). Dải hồng (thay đổi) chạy dọc chữ S, đáp xuống khay thành cột xanh
// (tích luỹ) — các cột dựng thành hình vùng dưới đường cong. C vàng dưới khay PHAI đúng câu "let the constant fade
// away" (ngoại lệ alpha duy nhất — DNA §8). Rồi: tốc độ→lượng, chiều cao→diện tích, hai máy đồng bộ, chập làm một,
// thẻ nạp đổi theo beat. Lần 2: camera CƯỠI một dải xuống đường ∫ (ride), khay là 3t² của Verse 2.
import { W, H, clamp, smooth, prog, lerp } from '../../../engine/lib.js';
import { R, sheet, lyrics } from './kit.js';
import { press, flow, pathAt } from './press.js';

const TRAY = { x0: 170, x1: 900, y: 880, n: 24, hmax: 430 };
const SHAPES = [u => 0.35 + 0.65 * Math.sin(Math.PI * (0.15 + 0.8 * u)) ** 2,   // lần 1: "the changing" bất kỳ
                u => 0.04 + 0.96 * u * u];                                       // lần 2: 3t² trên [0, 2] (chuẩn hoá)
const CARDS = ['RATE', 'HEIGHT', 'SLICE', 'WATER'];

export class PressScene {
  constructor(nth) { this.nth = nth; }
  async init(s) {
    this.s = s; const n0 = this.nth, L = (x, n = n0) => s.tl.at(x, n);
    this.t0 = L('Let the changing'); this.tEnd = L('Start to end,'); this.tDiff = L('take the difference,');
    this.tFade = L('let the constant fade away.'); this.tRate = L('Rate to amount.'); this.tHeight = L('Height to area.');
    this.tDuo = L('Different things,'); this.tSame = L('Same machine.'); this.tInput = L('Different input.');
    this.tAdd = L('Add up'); this.end = n0 === 1 ? L('Now the tank fills up,', 1) : L('Take an antiderivative.', 1);
    this.fshape = SHAPES[n0 - 1];
  }
  render(g, t) { this.g = g; sheet(g, t, this.s, () => this.page(t), { amp: this.nth === 1 ? 2.2 : 3 }); }
  /** Lần 2: camera cưỡi dải đầu tiên xuống đường giấy rồi lùi ra (ride). */
  camera(t) {
    if (this.nth !== 2) return null;
    const k = smooth(prog(t, this.t0 - 0.35, this.t0)) * (1 - smooth(prog(t, this.tEnd - 0.6, this.tEnd)));
    if (k <= 0) return null;
    const M = { x: 1340, y: 230, h: 760 }, s = clamp((t - (this.t0 - 0.9)) / 2.6);
    const [u, v] = pathAt(s), px = M.x + u * M.h, py = M.y + v * M.h;
    return { s: 1 + 1.6 * k, cx: px, cy: py, x: (960 - px) * k, y: (540 - py) * k };
  }
  page(t) {
    const beat = this.s.beat, duo = smooth(prog(t, this.tDuo, this.tDuo + 0.4)) * (1 - smooth(prog(t, this.tSame, this.tSame + 0.5)));
    const st = flow(t, this.t0 - 0.9);
    const n = TRAY.n, sw = (TRAY.x1 - TRAY.x0) / n;
    // khay: dải thứ j đáp xuống ô j (từ trái sang phải), đứng thành cột cao fshape
        const arrivals = j => this.t0 - 0.9 + j * 0.155 + 1.1;
    const lift = 40 * (1 - smooth(prog(t, this.tFade, this.tFade + 1.8)));     // cột đứng trên lớp C, C phai thì cột hạ xuống
    const trayOn = 1 - duo;
    if (trayOn > 0.01) {
      R.ink('key', c => { c.globalAlpha = 1; c.lineWidth = 4; c.beginPath(); c.moveTo(TRAY.x0 - 20, TRAY.y); c.lineTo(TRAY.x1 + 160, TRAY.y); c.stroke(); });
      if (lift > 0.5) R.ink('yellow', c => { c.globalAlpha = lift / 40; c.fillRect(TRAY.x0, TRAY.y - lift, TRAY.x1 - TRAY.x0, lift);
        c.globalAlpha = 1; });
      if (lift > 0.5) R.ink('key', c => { c.fillStyle = R.tint('key', lift / 40, 5); c.font = '800 30px "Archivo"'; c.fillText('+C', TRAY.x0 - 70, TRAY.y - 8); });   // nhãn thưa tram dần — alpha chỉ dành cho lớp vàng
      R.ink('blue', c => {
        for (let j = 0; j < n; j++) {
          const ta = arrivals(j), p = clamp((t - ta) / 0.25); if (p <= 0) continue;
          const x = lerp(TRAY.x1 + 180, TRAY.x0 + j * sw, smooth(p)), h = TRAY.hmax * this.fshape((j + 0.5) / n) * trayOn;
          c.fillRect(x + 2, TRAY.y - lift - h, sw - 4, h);
        }
      });
      // đường cong hiện ra khi khay đầy: "find its shape"
      if (t >= arrivals(n - 1) + 0.25) R.ink('pink', c => { c.lineWidth = 7; c.beginPath();
        for (let u = 0; u <= 1.001; u += 0.01) { const x = TRAY.x0 + u * (TRAY.x1 - TRAY.x0), y = TRAY.y - lift - TRAY.hmax * this.fshape(u); u === 0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); });
      if (t >= this.tEnd) R.ink('key', c => { c.font = '900 64px "Archivo"'; c.fillText('a', TRAY.x0 - 10, TRAY.y + 66); c.fillText('b', TRAY.x1 - 20, TRAY.y + 66);
        c.lineWidth = 4; for (const x of [TRAY.x0, TRAY.x1]) { c.beginPath(); c.moveTo(x, TRAY.y - 470); c.lineTo(x, TRAY.y + 10); c.stroke(); } });
      if (t >= this.tDiff) R.ink('key', c => { c.font = '800 46px "Archivo"'; c.fillText('F(b) − F(a)', TRAY.x0 + 160, TRAY.y - 470); });
    }
    // thẻ nạp / nhãn ra theo câu
    let card = 'CHANGE', out = 'TOTAL';
    if (t >= this.tRate) { card = 'RATE'; out = 'AMOUNT'; }
    if (t >= this.tHeight) { card = 'HEIGHT'; out = 'AREA'; }
    if (t >= this.tInput) { const i = Math.max(0, beat.beatIndex(t) - beat.beatIndex(this.tInput)); card = CARDS[i % 4]; out = 'TOTAL'; }
    const flowS = st.map(x => ({ ...x, ink: 'pink' }));
    const mainX = lerp(1340, 1460, duo), h = lerp(760, 600, duo);
    if (duo > 0.01) press({ x: lerp(1340, 560, duo), y: 230, h }, { card: 'RATE', out: 'AMOUNT', strips: flowS });
    press({ x: mainX, y: 230, h }, { card: duo > 0.5 ? 'HEIGHT' : card, out: duo > 0.5 ? 'AREA' : out, strips: flowS });
    if (t >= this.tAdd) {
      const k = clamp((t - this.tAdd) / 0.15);
      R.ink('key', c => { c.font = '900 110px "Archivo"'; c.fillText('= TOTAL', TRAY.x0 + 20, 330 - (1 - k) * 40); });
    }
    this.g.save(); this.g.setTransform(this.screen);   // lời cố định theo màn hình kể cả khi camera cưỡi dải
    lyrics(this.s, t, this.t0, this.end, () => ({ x: 130, y: 160, px: 76 }));
    this.g.restore();
  }
}
