// Mascot vẽ nét DIỄN trong cảnh logarithm (bản 5, 2026-10-29): góc thẳng + xoay 3/4 — engine/mascot-actor.js trên sàn của kit.
// Bản 3 bọc mascot lên khung người que bị bỏ (LESSONS §219); xoay 3/4 §220. Cách dùng: đầu engine/mascot-actor.js.
import { actor } from '../../../engine/mascot-actor.js';
import { BASE_Y } from './kit.js';
export { F, HANDS, fast, snap } from '../../../engine/mascot-actor.js';

export const MH = 250;                                   // ≈ 2 khối gạch (S 120) — vai phụ, không lấn vật toán
export const { draw } = actor({ base: BASE_Y, mh: MH });
