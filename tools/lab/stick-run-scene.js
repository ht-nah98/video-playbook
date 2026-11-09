// Bàn thử chế độ CHẠY của gait (run 0 → 1): đi phẳng rồi chạy. Gác: node tools/lab/stick2-qa.mjs tools/lab/stick-run-scene.js
import { gait } from '../../engine/stickmove.js';
export const H = 230, DIR = 1, SCENE = { dur: 6 }, CARD = { x0: -1, x1: -1, top: -1 };
export const ground = X => 880;
const WALK = { ground, h: H, dir: DIR, x0: 200, x1: 700, t0: 0.3, t1: 2.6 };
const RUN = { ground, h: H, dir: DIR, x0: 700, x1: 1750, t0: 2.8, t1: 5.4, run: 1, step: 0.55 };
export function actor(t) {
  const G = t < 2.7 ? gait(WALK, t) : gait(RUN, t);
  return { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: t < 2.7 ? 'walk' : 'run' };
}
