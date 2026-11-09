// P09 hook1 — "Add it up, piece by piece." (điệp khúc 1) · ✂ 53.50 cắt cứng vào điệp khúc.
import { R, sheet } from '../kit.js';
import { hook } from '../hook.js';

export default class P09 {
  feed = 0;
  async init(s) { this.s = s; }
  render(g, t) { sheet(g, t, this.s, () => hook(this.s, t, 1), { amp: 3 }); }
}
