// P27 outro — "Khải hoàn, rồi 99.999…" · 221.22 → 239.65 ✂ 227.3 ✂ 238.6 (TREATMENT P27)
// Không phải đoạn lặng: đủ band + kèn đồng. 221.49 FX loé — MÀN CHÀO: mọi vật của bài diễu hành dọc gương theo
// beat (to hơn, nhanh hơn P23), nhân vật toàn thân nhảy giữa khung, tên kênh "99% from scratch".
// 227.3 nhạc ngắt → khung ĐÔNG CỨNG (cắt cứng thứ 7): màn tối, đường quét CRT; nhân vật cầm tách trà bước ra trước
// khung đông — người duy nhất còn sống. 229.48 lead vọng "loading": thanh loading hiện lại, con trỏ nhấp một lần.
// 230.02 band vào lại: 99.9 → 99.99 → 99.999… chữ số 9 mọc mãi, xuống dòng (vọng P03: số vô tỉ không bao giờ
// đủ); kèn gỗ dâng từ 234 → mọc nhanh dần. 236.4 trống, bass tắt: mọi thứ đứng im, chỉ chữ số còn mọc.
// 238.6 hợp âm cắt — hard stop: CRT tắt (ép dẹt → vạch → chấm → đen), ngay trước khi thanh chạm 100%.
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { drawMirrorLine } from '../../../../engine/mirror.js';
import { fillWord } from '../../../../engine/fill.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure } from '../kit.js';
import { backdrop } from '../backdrop.js';
import { parade, EQUATIONS } from '../finale.js';
import { scanlines, loadBar, caret, nines, crtOff, BAR } from '../loading.js';

// data/stems.json (TREATMENT § Bản đồ năng lượng, § Mốc nhạc cụ)
export const FX_A = 221.49, STOP = 227.3, ECHO = 229.48, FX_B = 230.02, WOOD = 234.0, CUT = 238.6;
// 236.4 trống + bass tắt: không cần mốc riêng — mọi thứ đã đông từ STOP, chỉ chữ số còn mọc.
const F = '500 34px "IBM Plex Mono"';

export default class P27 {
  async init(s) { this.m = s.mascot; }
  bd() { return { glow: 1, horizon: 780, floor: 0.85, mirror: true, bokeh: 0.9 }; }
  backdropAt(t) {
    if (t >= STOP) return false;                       // đông cứng: cảnh tự vẽ nền ở mốc STOP
    const e = smooth(prog(t, this.t0, FX_A + 0.1));
    return { ...this.bd(), glow: lerp(0.6, 1, e), floor: 0.85 * e, bokeh: 0.9 * e, haloX: lerp(1240, 960, e), haloY: lerp(520, 600, e) };   // quầng từ chỗ chân dung P26
  }
  camera(t) {
    const tf = Math.min(t, STOP), p = beat.beatPulse(tf, 0.16), punch = 1 - smooth(prog(tf, FX_A, FX_A + 0.5));
    return { s: 1.02 + 0.025 * p + 0.1 * punch * (tf >= FX_A ? 1 : 0), r: 0.02 * Math.sin((tf - this.t0) * 0.6), bg: 0 };
  }
  /** "Hard stop" ép dẹt cả khung; vẽ cả nền ở đây nên CRT tắt nuốt trọn màn hình. */
  render(g, t) {
    if (t >= CUT) return crtOff(g, (c) => this.paint(c, t), prog(t, CUT, CUT + 0.32));
    this.paint(g, t);
  }
  paint(g, t) {
    const tf = Math.min(t, STOP);
    if (t >= STOP) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = PAL.bg; g.fillRect(0, 0, 1920, 1080); g.restore();
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); backdrop(g, STOP, { beat, ...this.bd() }); g.restore(); }
    this.parade(g, tf);
    if (t >= STOP) {                                     // đông cứng: màn tối + quét CRT
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(11,15,30,0.66)'; g.fillRect(0, 0, 1920, 1080); g.restore();
      scanlines(g, 1);
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
      figure(g, this.m, 'tea', 1640, 1230, 900, 'burn', presence(t, STOP + 0.12, 1e9, { inDur: 0.35 }), { t, seed: 75 });
      this.loading(g, t);
      g.restore();
    }
  }
  /** Màn chào: đoàn diễu hành lớn, gương sáng, nhân vật nhảy, tên kênh. */
  parade(g, t) {
    const k = prog(t, this.t0, FX_A + 0.6);
    drawMirrorLine(g, MIRROR, smooth(prog(t, this.t0, FX_A)), { width: 6, glow: 30 });
    parade(g, t, { k, d: 300, speed: 0.05, scale: 1.3, pulse: beat.beatPulse(t, 0.16) });
    figure(g, this.m, 'jump', 960, 1090, 720, 'burn', presence(t, this.t0 + 0.05, 1e9, { inDur: 0.3 }), { t, seed: 76 });
    if (t >= FX_A) {                                      // tên kênh: con dấu ruột lấp đẳng thức
      const s = 1 + 0.5 * (1 - outBack(clamp((t - FX_A) / 0.2)));
      g.save(); g.translate(380, 120); g.scale(s, s);           // góc trên-trái: ngoài dải diễu hành dọc gương
      g.textAlign = 'left'; g.font = '900 120px "Archivo"';
      const w = g.measureText('99%').width;
      fillWord(g, '99%', -w - 16, 0, { font: '900 120px "Archivo"', color: PAL.fwd, innerColor: PAL.fwdCore, inner: EQUATIONS, drift: t * 60 });
      g.font = 'italic 600 78px "Cormorant Garamond"'; g.fillStyle = PAL.truth; g.textBaseline = 'middle'; g.fillText('from scratch', 8, 4);
      g.restore();
    }
  }
  /** Sau khung đông: "loading" vọng (229.48) → thanh 99%; band vào lại (230.02) → 99.9…9 mọc mãi. */
  loading(g, t) {
    if (t < ECHO) return;
    const open = smooth(prog(t, ECHO, ECHO + 0.25));
    decodeLine(g, [{ w: 'LOADING', start: ECHO, end: ECHO + 0.4 }], t, 140, 640, { font: F, colBase: PAL.truth, colKey: PAL.fwd });
    const n = t < FX_B ? 0 : Math.floor((Math.min(t, CUT) - FX_B) * 2.2 + Math.max(0, Math.min(t, CUT) - WOOD) ** 2 * 9);
    loadBar(g, 0.99 + 0.01 * (1 - 0.6 ** n), { open });
    const end = nines(g, n, BAR.x + BAR.w + 24, BAR.y + 24, { right: 1180 });   // không tràn vào nhân vật cầm trà
    caret(g, end.x + 6, end.y - 10, t < FX_B ? (t - ECHO) % 0.6 < 0.3 : true);   // nhấp một lần, rồi đứng sáng sau chữ số
  }
}
