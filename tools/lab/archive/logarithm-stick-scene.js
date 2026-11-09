// Throwaway lab for logarithm red-scarf actor: money -> forward powers -> backward log.
// Keep this separate from logarithm plates until the user approves the clip.
import { P, stick } from '../../engine/stick.js';
import { NOOP as noop } from '../../engine/stickmove.js';
import { gait, keys, ease, reach as reachLen, leadOf } from '../../engine/stickmove.js';
import { headOf, ARM } from '../../engine/hero.js';

export const H = 230, DIR = 1, GY = 900, SCENE = { dur: 12 };
export const CARD = { x0: -1, x1: -1, top: GY };
export const ground = () => GY;
const D2R = Math.PI / 180;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const win = (t, a, b) => ease(clamp((t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;
const lerp2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const deg = o => { const r = { ...P.stand }; for (const k in o) r[k] = k === 'bob' ? o[k] : o[k] * D2R; return r; };
const SIDE = { ...P.stand };
const REACH = (0.155 + 0.15) * ARM * H * 0.995;
const reach = (neck, p) => reachLen(neck, p, REACH);
const W1 = { ground: () => GY, h: H, dir: DIR, x0: 300, x1: 690, t0: 0.2, t1: 2.3, step: 0.26 };
const W2 = { ground: () => GY, h: H, dir: DIR, x0: 690, x1: 900, t0: 5.0, t1: 6.0, step: 0.26 };
const W3 = { ground: () => GY, h: H, dir: DIR, x0: 900, x1: 1180, t0: 8.0, t1: 8.8, step: 0.26 };
W2.lead = leadOf(W1); W3.lead = leadOf(W2);
const stand = (t, x, feet, list) => {
  const k = keys(list, t), sq = k.sq ?? 1;
  return { hip: [x + (k.dx ?? 0), GY - 0.4 * H * 0.985 * sq + (k.dy ?? 0)], pose: k, squash: sq };
};
const handPose = (A, target, amount) => {
  if (!target || amount <= 0) return;
  const J = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, squash: A.squash ?? 1, arm: ARM });
  A.hands = [reach(J.neck, lerp2([A.hip[0] - 0.1 * H, A.hip[1] - 0.12 * H], target[0], amount)), reach(J.neck, lerp2([A.hip[0] + 0.1 * H, A.hip[1] - 0.12 * H], target[1], amount))];
};

export function actor(t) {
  let A;
  if (t < 2.8) {
    const G = gait(W1, t);
    A = { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: 'money-pull', wind: 0.35 };
  } else if (t < 4.3) {
    A = stand(t, 690, [[690 - 0.16 * H, GY], [690 + 0.16 * H, GY]], [
      [2.8, { ...SIDE }], [3.1, { ...P.pull }], [3.55, { ...P.push }], [3.9, { ...P.surprised }], [4.3, { ...P.point }],
    ]);
    A.phase = 'money-result';
  } else if (t < 6.3) {
    const G = gait(W2, t);
    A = { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: 'forward-walk', wind: 0.3 };
  } else if (t < 8.0) {
    A = stand(t, 900, [[900 - 0.16 * H, GY], [900 + 0.16 * H, GY]], [
      [6.3, { ...P.pull }], [6.55, { ...P.push }], [6.85, { ...P.pull }], [7.1, { ...P.push }], [7.45, { ...P.aha }], [8.0, { ...P.point }],
    ]);
    A.phase = 'forward-place';
  } else if (t < 8.8) {
    const G = gait(W3, t);
    A = { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: 'backward-walk', wind: 0.25 };
  } else {
    A = stand(t, 1180, [[1250 - 0.16 * H, GY], [1250 + 0.16 * H, GY]], [
      [8.0, { ...P.point }], [8.35, { ...P.pull }], [8.7, { ...P.pull }], [9.05, { ...P.pull }], [9.4, { ...P.aha }], [12, { ...P.aha }],
    ]);
    A.phase = 'backward-count';
  }
  const J = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, squash: A.squash ?? 1, arm: ARM });
  if (A.phase === 'money-pull') handPose(A, [[535, GY - 105], [600, GY - 105]], win(t, 0.7, 1.5));
  if (A.phase === 'money-result') handPose(A, [[815, GY - 205], [875, GY - 205]], win(t, 3.0, 3.5));
  if (A.phase === 'forward-place') {
    const n = Math.min(3, Math.floor((t - 6.3) / 0.35));
    const x = 900 + (n - 1) * 90;
    handPose(A, [[x - 35, GY - 90], [x + 35, GY - 90]], clamp((t - 6.3 - n * 0.35) / 0.2));
  }
  if (A.phase === 'backward-count') {
    const n = Math.min(3, Math.floor((t - 8.8) / 0.38));
    const x = 1250 + (n - 1) * 90;
    handPose(A, [[x - 35, GY - 90], [x + 35, GY - 90]], clamp((t - 8.0 - n * 0.38) / 0.2));
  }
  A.eye = A.phase === 'money-result' ? { look: [1, -0.8], wide: win(t, 3.5, 3.9) } : { look: [1, 0.1] };
  A.arm = ARM;
  return A;
}

export function block(g, x, y, s, label, fill = '#C83A26', k = 1) {
  g.save(); g.globalAlpha = clamp(k); g.fillStyle = fill; g.strokeStyle = '#22303C'; g.lineWidth = 5;
  g.beginPath(); g.roundRect(x - s / 2, y - s, s, s, 12); g.fill(); g.stroke();
  g.fillStyle = '#FFFFFF'; g.font = '800 36px Archivo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, x, y - s / 2); g.restore();
}

export function drawActor(g, t) {
  const A = actor(t);
  const J = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, squash: A.squash ?? 1, arm: ARM });
  return { A, J, phase: A.phase };
}
