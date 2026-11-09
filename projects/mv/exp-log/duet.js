// Mặt cận và ẢNH CỦA NÓ trong gương đứng (bridge P21, hook P25). Ảnh mặt viseme có trục mũi ở x = 222/418
// (không phải giữa ô) và sẵn ánh viền vàng bên trái, xanh bên phải — đúng hai nửa thế giới của bài.
// Ảnh phản chiếu = lật ngang quanh trục ĐỨNG của chính nó, nhuộm xanh; khi hai trục trùng nhau tại
// đường gương mà mỗi bên chỉ vẽ nửa phía mình, ta được một gương mặt đối xứng tuyệt đối: "become the same".
import { drawTransit } from '../../../engine/transit.js';
import { tinted } from '../../../engine/mirror.js';

export const AXIS = 222 / 418;                        // trục mũi trong ô viseme (đo trên viseme-b-1)
const AX = (A, h) => A - (AXIS - 0.5) * h;            // x tâm ảnh để trục mũi nằm ở A

/**
 * Mặt có trục mũi ở A (y = cằm, h = cao). side: −1 chỉ vẽ phần x < seam, +1 phần x > seam, 0 cả mặt.
 * mirror: lật ngang quanh A và nhuộm xanh. tr = { kind, dir, k, seed } → đang vào/ra bằng ký hiệu.
 */
export function duetFace(g, s, A, y, h, mouth, { mirror = false, side = 0, seam = 960, tr = null, t = 0 } = {}) {
  const paint = (c) => {
    c.save();
    if (side) { c.beginPath(); side < 0 ? c.rect(-4000, -4000, seam + 4000, 9000) : c.rect(seam, -4000, 9000, 9000); c.clip(); }
    if (mirror) { c.translate(2 * A, 0); c.scale(-1, 1); }
    if (tr) drawTransit(c, s.mascot, 'face', AX(A, h), y, h, tr.kind, tr.dir, tr.k, { t, cell: 7, seed: tr.seed });
    else s.face.draw(c, AX(A, h), y, h, mouth);
    c.restore();
  };
  if (mirror) tinted(g, paint); else paint(g);
}
