// Bàn thử người que zero-div — dùng đúng nguồn của video (projects/en/zero-div/plates/stick-patch.js), thông số mặc định =
// clip người dùng duyệt 2026-10-22. Gác: node tools/lab/stick2-qa.mjs tools/lab/stick-zd-scene.js
import { makeStick, H, DIR, NY, HX, HR, PATCH, ground } from '../../projects/en/zero-div/plates/stick-patch.js';
export { H, DIR, NY, HX, HR, PATCH, ground };
export const SCENE = { dur: 8 };
export const CARD = { x0: -1, x1: -1, top: -1 };
export const actor = makeStick();
