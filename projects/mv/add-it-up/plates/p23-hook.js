// P23 hook — "Reverse · Add · Slice · See" · ✂ 218.02. Ba hình của bài (họ lệch khuôn, dải, đĩa) dập theo từ rồi ghép
// làm MỘT poster; ba chữ khổng lồ; cột dải cao dần, số lượt in nhảy; cỗ máy lần cuối; nhân vật quay lưng chào rồi đi.
import { W, H, clamp, smooth, prog, lerp, hash } from '../../../../engine/lib.js';
import { R, sheet, lyrics, figure, stamp } from '../kit.js';
import { press } from '../press.js';
import { CUE } from '../song.js';

const F = u => u * u * u / 3 - u;
const WORDS = [['DERIVATIVE', 'pink', 'Derivative.'], ['INTEGRAL', 'blue', 'Integral.'], ['GEOMETRY', 'yellow', 'Geometry.']];

export default class P23 {
  feed = 0;
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.tRev = L('Reverse it.'); this.tAdd = L('Add it.'); this.tSlice = L('Slice it.'); this.tSee = L('See.');
    WORDS.forEach(w => w.t = L(w[2])); this.tPiece = L('Piece by piece,', 5); this.tMach = L('Same machine—', 4); this.tKnow = L('now you know.', 2);   // câu lặp: phải ghi lần thứ mấy
    this.end = L('Ninety-nine percent...', 2);
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 3, pass: 4 }); }
  page(t) {
    const see = smooth(prog(t, this.tSee, this.tSee + 0.35)), gone = smooth(prog(t, WORDS[0].t, WORDS[0].t + 0.3));
    const cx = i => lerp(330 + i * 630, 960, see), sc = lerp(1, 1.25, see);
    if (gone < 1) {
      const dy = -gone * 1200;
      if (t >= this.tRev) for (let C = -6; C <= 6; C += 3) R.ink(C ? 'pink' : 'blue', c => { c.translate(cx(0), 520 + dy); c.scale(sc, sc); c.lineWidth = 8; c.beginPath();
        for (let u = -1.8; u <= 2.0; u += 0.04) { const px = u * 120, py = -(F(u) + C) * 22; u === -1.8 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke(); });
      if (t >= this.tAdd) R.ink('pink', c => { c.translate(cx(1), 700 + dy); c.scale(sc, sc); for (let i = 0; i < 12; i++) { const h = 30 + i * i * 2.6; c.fillRect(-240 + i * 40, -h, 34, h); } });
      if (t >= this.tSlice) for (let i = 9; i >= 0; i--) { const r = Math.sqrt((i + 0.5) / 10) * 190;
        R.ink(i % 2 ? 'blue' : 'pink', c => { c.translate(cx(2), 520 + dy); c.scale(sc, sc); c.beginPath(); c.ellipse(-200 + i * 40, 0, r * 0.3, r, 0, 0, 7); c.fill(); });
        R.ink('key', c => { c.translate(cx(2), 520 + dy); c.scale(sc, sc); c.lineWidth = 2; c.beginPath(); c.ellipse(-200 + i * 40, 0, r * 0.3, r, 0, 0, 7); c.stroke(); }); }
      if (t >= this.tSee) stamp('SEE.', 960, 940 + dy, '900 120px "Archivo"', { k: (t - this.tSee) / 0.12, align: 'center', shadow: 'yellow' });
    }
    // ba chữ khổng lồ
    const wout = smooth(prog(t, this.tPiece, this.tPiece + 0.35)) * -1200;   // ba chữ bay lên khỏi khung
    WORDS.forEach(([w, ink], i) => { if (t < WORDS[i].t || wout <= -1199) return;
      stamp(w, 960, 330 + i * 250 + wout, '900 250px "Archivo"', { k: (t - WORDS[i].t) / 0.1, align: 'center', ink: 'key', shadow: ink, off: [14, 10] }); });
    // cột dải cao dần + số lượt in
    if (t >= this.tPiece) {
      const n = Math.floor((t - this.tPiece) / 0.07), hits = CUE.hookPerc.filter(p => t >= p).length;
      R.ink('pink', c => { for (let i = 0; i < Math.min(n, 60); i++) c.fillRect(240, 940 - i * 14, 220, 10); });
      R.ink('blue', c => { for (let i = 0; i < Math.min(n, 60); i += 2) c.fillRect(240, 940 - i * 14, 220, 10); });
      R.ink('key', c => { c.font = '500 34px "IBM Plex Mono"'; c.fillText(`PRINT RUN ${String(1 + n * 7 + hits * 100).padStart(5, '0')}`, 220, 120); });
    }
    if (t >= this.tMach) press({ x: 1000, y: 200, h: 680 }, { card: 'ANY', out: 'TOTAL' });
    figure(this.s, 'peace-back', t, this.tKnow, this.end - 0.6, 1560, H + 20, 920, { shadow: 'blue' });
    lyrics(this.s, t, this.tRev, this.end);
  }
}
