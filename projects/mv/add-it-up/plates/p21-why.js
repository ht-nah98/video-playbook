// P21 why — "Why does it work?": mọi thứ dừng; tờ trắng; máy chữ gõ câu hỏi giữa khung; con trỏ nhấp.
import { R, sheet, drawLine } from '../kit.js';
export default class P21 {
  async init(s) { this.s = s; this.l = s.tl.line('Why does it work?'); }
  render(g, t) { sheet(g, t, this.s, () => {
    drawLine(R, this.l, t, { voice: 'spoken', x: 960, y: 560, px: 76, rot: 0, align: 'center' });
    if (t > this.l.end && Math.floor((t - this.l.end) * 3) % 2 === 0)   // gõ xong: con trỏ nhấp
      R.ink('key', c => { c.font = '500 76px "IBM Plex Mono"'; const w = c.measureText(this.l.text).width; c.fillRect(960 + w / 2 + 8, 560 - 60, 42, 72); });
  }, { amp: 0, pass: 4 }); }
}
