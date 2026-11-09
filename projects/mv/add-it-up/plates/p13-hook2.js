// P13 hook2 — "Add it up, piece by piece." (điệp khúc 2) · ✂ 112.86. Lần hai phủ XANH, chữ hồng.
import { sheet } from '../kit.js';
import { hook } from '../hook.js';
export default class P13 {
  feed = 0;
  async init(s) { this.s = s; }
  render(g, t) { sheet(g, t, this.s, () => hook(this.s, t, 2, { flood: 'blue', textInk: 'pink' }), { amp: 3 }); }
}
