// Mascot vẽ nét DIỄN trong cảnh (kênh Anh, 2026-10-29) — khoá tư thế + nội suy trên rig `engine/mascot-line.js` `mascot()`.
// Chỉ góc thẳng + xoay 3/4 `yaw` (LESSONS §219 §220). Bài thí điểm: projects/en/logarithm (actor.js + plates b02 b07 b08 b12).
//
//   import { actor, F, HANDS, fast } from '…/engine/mascot-actor.js';
//   const A = actor({ base: BASE_Y, mh: 250 });            // mặt sàn của kit, chiều cao mascot (px)
//   this.ACT = { keys: [[t, F({ x, y, c, l0, l1, lean, yaw, ...HANDS.rest, look, lookY, mood, mouth }), ease?], …],
//                walks: [[x0, x1, t0, t1]], hold: t => 0..1, grip: (t, P) => [[x, y] | null, [x, y] | null, k] };
//   const J = A.draw(g, this.ACT, t);   // J.C = tâm đầu, J.r = tới đỉnh tóc, J.armL.e / J.armR.e = hai bàn tay, J.P = khoá đã nội suy
// Đơn vị mh: y = độ cao bàn chân trên sàn, c = khuỵu 0..1, l0 / l1 = nhấc chân trái / phải 0..1, yaw = quay 3/4 (rad, > 0 sang
// phải khung), ax ay / bx by = bàn tay trái / phải so với (x, bàn chân) — ay, by dương là LÊN. Mọi trường số nội suy
// (engine/stickmove.js keys); trường chữ (mood, mouth) lấy theo khoá kế. Đích tay phải trong tầm với (§176).
import { bindMascot, mascot, blinkAt } from './mascot-line.js';
import { keys } from './stickmove.js';
export { fast, snap } from './stickmove.js';

const R = 0.19;                                          // bán kính đầu / chiều cao (mascot-line.js)
/** đích tay hay dùng (đã đo trên bảng dáng projects/en/_lab/mascot-poses.html): vai ≈ 0.52 mh trên bàn chân */
export const HANDS = {
  rest: { ax: -0.2, ay: 0.31, bx: 0.2, by: 0.31 }, chest: { ax: -0.23, ay: 0.42, bx: 0.23, by: 0.42 },
  shrug: { ax: -0.42, ay: 0.56, bx: 0.42, by: 0.56 }, up: { ax: -0.3, ay: 1.08, bx: 0.3, by: 1.08 },
  low: { ax: -0.24, ay: 0.24, bx: 0.24, by: 0.24 }, face: { ax: -0.2, ay: 0.31, bx: 0.03, by: 0.72 },
};
/** một khoá: mặc định đứng thẳng, tay buông, nhìn hơi phải */
export const F = (o = {}) => ({ y: 0, c: 0, l0: 0, l1: 0, lean: 0, look: 0.5, lookY: 0, yaw: 0, ...HANDS.rest, mood: 'deadpan', mouth: 'flat', sweat: 0, ...o });

const lerp2 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
/** diễn viên trên sàn `base` (y px), cao `mh` px; `seed` tách nhịp chớp mắt */
export function actor({ base, mh, seed = 3 }) {
  function draw(g, a, t) {
    const P = keys(a.keys, t);
    for (const [x0, x1, t0, t1] of a.walks || []) if (t > t0 && t < t1) {                  // đi ngang: trượt + nhún, hai chân nhấc so le
      const u = (t - t0) / (t1 - t0), ph = (t - t0) * Math.PI * 2 * 2.2;
      P.x = x0 + (x1 - x0) * u; P.l0 = Math.max(0, Math.sin(ph)) * 0.55; P.l1 = Math.max(0, -Math.sin(ph)) * 0.55; P.y += Math.abs(Math.sin(ph)) * 0.025;
      P.ay += Math.sin(ph) * 0.03; P.by -= Math.sin(ph) * 0.03;
      P.yaw += Math.sign(x1 - x0) * 0.6 * Math.min(1, (t - t0) / 0.2, (t1 - t) / 0.2);      // đi thì quay 3/4 về hướng đi
    }
    const gy = base - P.y * mh, hy = gy - mh + R * mh * 1.38 + P.c * mh * 0.15, top = hy - R * mh * 1.22;
    let hands = [[P.x + P.ax * mh, gy - P.ay * mh], [P.x + P.bx * mh, gy - P.by * mh]];
    const kh = a.hold ? a.hold(t, P) : 0;                                                  // đỡ vật trên đỉnh tóc
    if (kh > 0) hands = hands.map((p, i) => lerp2(p, [P.x + (i ? 1 : -1) * mh * 0.25, top + 6], kh));
    const gr = a.grip ? a.grip(t, P) : null;                                               // tay bám vật trong cảnh
    if (gr && gr[2] > 0) hands = hands.map((p, i) => gr[i] ? lerp2(p, gr[i], gr[2]) : p);
    bindMascot(g);
    const m = mascot(P.x, gy, mh, { crouch: P.c, lift: [P.l0, P.l1], lean: P.lean, hands, mood: P.mood, mouth: P.mouth, look: P.look, lookY: P.lookY, yaw: P.yaw,
      sweat: P.sweat > 0.5, blink: blinkAt(t, seed) });
    return { C: [P.x, m.hy], r: m.hy - top, armL: { e: m.hands[0] }, armR: { e: m.hands[1] }, P };
  }
  return { draw };
}
