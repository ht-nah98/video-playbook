// Điều phối cảnh — KHÔNG biết gì về một bài hát cụ thể.
// Project truyền vào danh sách cảnh; engine lo thứ tự, lớp nền và render.
import { W, H, C } from './lib.js';
import { Mascot } from './mascot.js';
import { backdrop } from './backdrop.js';

export class Show {
  /**
   * @param {object} cfg
   * @param {Array<[number, class]>} cfg.order  [mốc bắt đầu, lớp cảnh]
   * @param {object} cfg.beat   từ makeBeat() — lớp nền bám nhịp này
   * @param {number} cfg.end    thời lượng bài (giây)
   * @param {string} cfg.assets đường dẫn tới assets/character/cut
   * @param {string[]} [cfg.poses] danh sách pose (mặc định POSES_V1)
   * @param {string} [cfg.bg] màu nền
   * @param {Function} [cfg.backdrop] thay nền mặc định
   * @param {object} [cfg.extra] trộn vào đối số plate.init
   * @param {Function} [cfg.camera] (t, {idx, t0, t1}) → {s, x, y, r, cx, cy, bg}: camera mặc định (cảnh có camera(t) thì dùng của cảnh)
   */
  constructor(cfg) {
    this.cfg = cfg;
    this.order = [...cfg.order].sort((a, b) => a[0] - b[0]);  // luôn theo thời gian
  }

  async init() {
    this.mascot = await new Mascot().load(this.cfg.assets, this.cfg.poses);
    this.plates = [];
    for (const [t0, Cls] of this.order) {
      const pl = new Cls();
      pl.t0 = t0;                                   // mốc vào cảnh — footerLine({ from: t0 }) dùng để không lôi dòng của cảnh trước về
      await pl.init({ mascot: this.mascot, beat: this.cfg.beat, ...(this.cfg.extra || {}) });
      this.plates.push([t0, pl]);
    }
  }

  render(g, t) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
    g.fillStyle = this.cfg.bg || C.navy;
    g.fillRect(0, 0, W, H);

    // cảnh đang hoạt động = cảnh có mốc LỚN NHẤT mà ≤ t
    let cur = null, best = -Infinity, idx = 0;
    for (let i = 0; i < this.plates.length; i++) {
      const [t0, pl] = this.plates[i];
      if (t >= t0 && t0 > best) { best = t0; cur = pl; idx = i; }
    }

    // Lớp nền dùng chung, bám BEAT (không bám lời — giọng rap chạy tự do).
    // Cảnh nào cần nền riêng thì đặt `backdrop = false` trên class.
    // LƯU Ý: cảnh KHÔNG được tô nền toàn khung, nếu không lớp này bị xoá sạch.
    // Camera: cảnh tự khai báo `camera(t) → {s, x, y, r, cx, cy, bg}` (ưu tiên), không thì cfg.camera của project.
    // bg ∈ [0,1] = phần camera áp lên lớp nền (0: nền đứng yên, 1: nền đi cùng cảnh).
    const cam = cur?.camera ? cur.camera(t)
      : this.cfg.camera ? this.cfg.camera(t, { idx, t0: best, t1: this.plates[idx + 1]?.[0] ?? this.cfg.end }) : null;
    const applyCam = (f) => {
      if (!cam || f <= 0) return;
      const { s = 1, x = 0, y = 0, r = 0, cx = W / 2, cy = H / 2 } = cam;
      const ss = 1 + (s - 1) * f;
      g.translate(cx + x * f, cy + y * f); g.rotate(r * f); g.scale(ss, ss); g.translate(-cx, -cy);
    };

    // Lớp nền dùng chung, bám BEAT (không bám lời — giọng rap chạy tự do).
    // Cảnh cần nền riêng: `backdrop = false`; tham số nền đổi theo t: khai báo backdropAt(t).
    // LƯU Ý: cảnh KHÔNG được tô nền toàn khung, nếu không lớp này bị xoá sạch.
    const bd = cur?.backdropAt ? cur.backdropAt(t) : cur?.backdrop;
    if (bd !== false) {
      g.save(); applyCam(cam?.bg ?? 0);
      (this.cfg.backdrop || backdrop)(g, t, {
        scene: idx + 1, total: this.plates.length, beat: this.cfg.beat, ...(bd || {}),
      });
      g.restore();
    }

    if (cur) {
      g.save(); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.globalAlpha = 1;
      applyCam(1);
      cur.render(g, t);
      g.restore();
    }
  }
}
