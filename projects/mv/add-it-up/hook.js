// Hook điệp khúc "Add it up, piece by piece." — dùng ở cả ba điệp khúc (P09, P13, P20).
// Toàn khổ phủ hồng (đục lỗ dưới mặt), mặt hát nhép bản riso, chữ ADD IT UP dựng từ dải dọc lệch nhau —
// mỗi từ hát xong thì các dải khớp thêm một nấc: cộng từng mảnh cho tới khi chữ liền.
import { W, H, clamp, smooth, hash, prog } from '../../../engine/lib.js';
import { R, singer, drawLine } from './kit.js';

const TXT = [['ADD IT', 110, 400], ['UP', 110, 720]], FONT = '900 290px "Archivo"', N = 46;
let OFF = null;
function textCanvas() {   // chữ trên canvas riêng một lần — cắt dải từ đây
  if (OFF) return OFF;
  OFF = document.createElement('canvas'); OFF.width = W; OFF.height = H;
  const o = OFF.getContext('2d'); o.font = FONT; o.fillStyle = '#000';
  for (const [s, x, y] of TXT) o.fillText(s, x, y);
  return OFF;
}
/**
 * nth: lần điệp khúc (1, 2, 3) · flood: mực phủ · passes: lần 3 mặt in đủ 4 lượt theo beat.
 */
export function hook(s, t, nth, { flood = 'pink', textInk = 'blue', passes = false } = {}) {
  const l1 = s.tl.line('Add it up,', nth), l2 = s.tl.lines[s.tl.lines.indexOf(l1) + 1];   // dòng ngay sau (tra theo chữ sẽ trùng 'Piece by piece—' của pre 2)
  const words = [...l1.words, ...l2.words], done = words.filter(w => t >= w.start).length;
  const e = 1 - smooth(clamp((done + clamp((t - (words[done]?.start ?? t)) / 0.2)) / words.length));
  R.ink(flood, c => { c.setTransform(R.g.getTransform()); c.fillRect(-200, -200, W + 400, H + 400); });
  const src = textCanvas(), sw = 1160 / N;
  const strips = (c, ox, oy) => {
    for (let i = 0; i < N; i++) {
      const dy = (hash(i * 1.37 + nth) - 0.5) * 220 * e;
      c.drawImage(src, 60 + i * sw, 0, sw - 5, H, 60 + i * sw + ox, dy + oy, sw - 5, H);
    }
    c.globalCompositeOperation = 'source-in'; c.setTransform(1, 0, 0, 1, 0, 0); c.fillRect(0, 0, W, H);
  };
  R.ink(textInk, c => strips(c, 12, 9));
  R.ink('key', c => strips(c, 0, 0));
  const k = passes ? clamp((t - l1.start + 0.05) / 1.2) : 1;   // lần 3: 4 lượt in trong 1.2s
  singer(s, t, 1580, H + 40, 1060, { k, kick: passes ? 40 : 26, shadow: 'blue', seed: nth });
  drawLine(R, l2, t, { voice: 'sung', x: 120, y: 990, px: 96, rot: 0, shadow: 'yellow' });
}
