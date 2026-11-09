// P20 hook3 — điệp khúc cuối · ✂ 191.92. Phủ vàng ấm; mặt in ĐỦ 4 lượt theo beat (vàng → hồng → xanh → key):
// chỉ khi đủ 4 lượt mới thấy đủ màu — cộng dồn ngay trên chân dung.
import { sheet } from '../kit.js';
import { hook } from '../hook.js';
export default class P20 {
  feed = 0;
  async init(s) { this.s = s; }
  render(g, t) { sheet(g, t, this.s, () => hook(this.s, t, 3, { flood: 'yellow', textInk: 'pink', passes: true }), { amp: 3.2 }); }
}
