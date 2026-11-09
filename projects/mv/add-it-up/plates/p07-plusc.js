// P07 plusc — "+C: ký ức đã mất". Nối liền P06 (cùng đồ thị, không nạp giấy). Nhân vật cầm mặt dây chuyền +C:
// câu trả lời đeo sẵn trên cổ. Cùng độ dốc (tiếp tuyến song song), khác lịch sử (vệt vàng), lên/xuống, d/dx không biết.
import { W, H, clamp, smooth, prog, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, axes, plot, roller, stamp, figure } from '../kit.js';

const FAM = { ox: 260, oy: 600, sx: 150, sy: 34, a: -1.6, b: 2.6, Cs: [-9, -6, -3, 0, 3, 6, 9] };   // = P06
const F = x => x * x * x / 3 - x, f = x => x * x - 1, U = 1.8;      // F′(1.8) = 2.24
const X = u => FAM.ox + u * FAM.sx, Y = v => FAM.oy - v * FAM.sy;
const FIG = { cx: 1560, foot: H + 20, h: 980, pend: [405, 560], img: [1037, 1448] };   // mặt dây chuyền trên ảnh pose-plusc

export default class P07 {
  feed = 0;   // cùng bố cục với P06 — tờ không đổi
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.t0 = L('F of x plus C,'); this.tMem = L("that's the missing memory."); this.tSlope = L('Same slope,');
    this.tHist = L('different history.'); this.tUp = L('Move it higher,'); this.tLow = L('move it low.');
    this.tD = L('The derivative'); this.end = L('If the rate forgot');
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 2.4 - smooth(prog(t, this.t0, this.t0 + 0.3)), pass: 3 }); }   // P06 kết ở 2.4
  shift(t) { return 3 * smooth(prog(t, this.tUp, this.tUp + 0.35)) - 6 * smooth(prog(t, this.tLow, this.tLow + 0.35)); }
  page(t) {
    const sh = this.shift(t), Yc = v => Y(v + sh);
    axes(FAM.ox - 240, FAM.oy, 900 + 240, 0, { lx: 'x' });
    R.ink('key', c => { c.lineWidth = 3; c.beginPath(); c.moveTo(X(0), 1000); c.lineTo(X(0), 90); c.stroke(); });
    R.ink('pink', c => { c.lineWidth = 8; plot(c, u => f(u) * 0.6 + 10.5, FAM.a, FAM.b, X, Y); c.stroke(); });
    R.ink('key', c => { c.font = '500 26px "IBM Plex Mono"'; c.fillText("rate  f(x) = x² − 1", X(FAM.b) + 20, Y(f(FAM.b) * 0.6 + 10.5) + 8); });
    R.ink('key', c => { c.font = '500 30px "IBM Plex Mono"'; c.fillText('F(x) + C', X(FAM.b) + 20, Yc(F(FAM.b)) + 10); });
    // khác lịch sử: phần bên trái (quá khứ) của mỗi bản phủ vệt vàng
    const hk = smooth(prog(t, this.tHist, this.tHist + 0.5));
    if (hk > 0) R.ink('yellow', c => { c.lineWidth = 30; c.lineCap = 'round';
      for (const C of FAM.Cs) { plot(c, x => F(x) + C, FAM.a, FAM.a + (0 - FAM.a) * hk, X, Yc); c.stroke(); } });
    FAM.Cs.forEach((C, i) => {
      const ink = C === 0 ? 'blue' : i % 2 ? 'pink' : 'blue';
      R.ink(ink, c => { c.translate((hash(C) - 0.5) * 10 * (C !== 0), 0); c.lineWidth = C === 0 ? 14 : 9; plot(c, x => F(x) + C, FAM.a, FAM.b, X, Yc); c.stroke(); });
    });
    // cùng độ dốc: 7 tiếp tuyến song song tại x = 1.8, in lần lượt
    FAM.Cs.forEach((C, i) => {
      if (t < this.tSlope + i * 0.09) return;
      R.ink('key', c => { const px = X(U), py = Yc(F(U) + C), m = f(U), dx = 80, dy = -m * dx * FAM.sy / FAM.sx;
        c.lineWidth = 5; c.beginPath(); c.moveTo(px - dx, py - dy); c.lineTo(px + dx, py + dy); c.stroke(); c.beginPath(); c.arc(px, py, 8, 0, 7); c.fill(); });
    });
    if (t >= this.tSlope + 0.7) R.ink('key', c => { c.font = '500 28px "IBM Plex Mono"'; c.fillText('same slope: 2.24', X(U) + 95, Y(F(U) + 9 + this.shift(t)) - 18); });
    // d/dx đi qua: bảy bản → MỘT đường hồng
    const rk = prog(t, this.tD, this.tD + 1.8), rx = X(FAM.a - 0.2 + 13.5 * smooth(rk));   // đi hẳn ra mép phải
    if (rk > 0) R.ink('pink', c => { c.beginPath(); c.rect(0, 0, rx, H); c.clip(); c.lineWidth = 16; plot(c, f, FAM.a, FAM.b, X, Yc); c.stroke(); });   // bảy bản → MỘT đường hồng f = F′
    if (rk > 0 && rk < 1) roller(rx, 110, 920);
    if (rk >= 1) R.ink('key', c => { c.font = '800 36px "Archivo"'; c.fillText('7 curves → 1 rate', X(0.3), Y(11.6) - 40); });
    // +C khổng lồ: vàng (ký ức mờ) + viền key mảnh
    const kc = clamp((t - this.t0) / 0.15);
    if (kc > 0) {
      R.ink('yellow', c => { c.font = '900 430px "Archivo"'; c.fillText('+C', 660, 720 + (1 - kc) * 60); });
      R.ink('key', c => { c.lineWidth = 3; c.font = '900 430px "Archivo"'; c.strokeText('+C', 654, 725 + (1 - kc) * 60); });
    }
    figure(this.s, 'plusc', t, this.t0 + 0.12, this.end - 0.6, FIG.cx, FIG.foot, FIG.h, { shadow: 'pink' });
    // quầng vàng quanh mặt dây chuyền khi "missing memory" (chi tiết vàng bị nuốt ở cỡ thường)
    if (t >= this.tMem && t < this.end - 0.4) {
      const s = FIG.h / FIG.img[1], px = FIG.cx - FIG.img[0] * s / 2 + FIG.pend[0] * s, py = FIG.foot - FIG.h + FIG.pend[1] * s;
      const r = 54 + 8 * (this.s.drums ? this.s.drums(t) : 0), k = smooth(prog(t, this.tMem, this.tMem + 0.25)) * (1 - smooth(prog(t, this.end - 0.8, this.end - 0.4)));
      R.ink('yellow', c => { c.fillStyle = R.tint('yellow', 0.6, 7); c.beginPath(); c.arc(px, py, r * k, 0, 7); c.fill(); });
      R.ink('key', c => { c.lineWidth = 4; c.beginPath(); c.arc(px, py, r * k, 0, 7); c.stroke();
        c.lineWidth = 2; c.beginPath(); c.moveTo(px - r * k, py); c.lineTo(px - 230, py - 120); c.stroke();
        c.font = '500 26px "IBM Plex Mono"'; c.textAlign = 'right'; if (k > 0.5) c.fillText('+C', px - 236, py - 128); });
    }
    lyrics(this.s, t, this.s.tl.at('a family of you.'), this.end, (l, i) => i === 0 ? { x: 1150, y: 990 } : { x: 120, y: 990 });   // dòng cuối của P06 ở đúng chỗ cũ, bị xén ra
  }
}
