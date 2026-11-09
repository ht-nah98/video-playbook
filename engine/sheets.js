// engine/sheets.js — Show cho MV "in trên giấy": mỗi cảnh là MỘT TỜ; chuyển cảnh mặc định là NẠP GIẤY (tờ cũ trượt
// lên ra khỏi máy, tờ mới vào từ dưới). Không sửa engine/main.js (MV cũ phải render y hệt — golden.sh).
//
// Hợp đồng cảnh như docs/ENGINE.md, thêm:
//   feed       giây nạp giấy khi vào cảnh này (mặc định cfg.feed; 0 = cắt cứng)
//   camera(t)  như cũ; áp cho tờ của cảnh đó
// Cảnh tự vẽ giấy + mực và tự flush (R.begin(g) … R.flush()). Show không vẽ nền chung.
import { W, H, clamp } from './lib.js';
import { Show } from './main.js';

const ease = k => 1 - Math.pow(1 - k, 3);

export class SheetShow extends Show {
  render(g, t) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
    g.fillStyle = this.cfg.bg; g.fillRect(0, 0, W, H);
    let idx = -1;
    for (let i = 0; i < this.plates.length; i++) if (t >= this.plates[i][0]) idx = i;
    if (idx < 0) return;
    const [t0, cur] = this.plates[idx], prev = this.plates[idx - 1]?.[1];
    const feed = cur.feed ?? this.cfg.feed ?? 0.35;
    const k = feed > 0 && prev ? ease(clamp((t - t0) / feed)) : 1;
    if (k < 1) this.sheet(g, prev, t, -k * H);
    this.sheet(g, cur, t, (1 - k) * H);
  }
  sheet(g, pl, t, dy) {
    g.save(); g.translate(0, dy);
    pl.screen = g.getTransform();   // transform TRƯỚC camera: cảnh vẽ lời/nhãn cố định theo màn hình
    const cam = pl.camera ? pl.camera(t) : null;
    if (cam) {
      const { s = 1, x = 0, y = 0, r = 0, cx = W / 2, cy = H / 2 } = cam;
      g.translate(cx + x, cy + y); g.rotate(r); g.scale(s, s); g.translate(-cx, -cy);
    }
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    pl.render(g, t);
    g.restore();
  }
}
