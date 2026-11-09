// Bàn thử (2026-10-26): làm lại 60 s đầu "Animation vs. Coding" (Alan Becker, 0:03–1:03) bằng người que khăn đỏ nét
// mềm (hero soft) — để đặt cạnh bản gốc mà so. Lab tất định, không vào video nào. Giờ cảnh = giờ Becker − 3 s.
// Nhịp: nằm → bật dậy → nhặt laptop → gõ hello → NameError, đánh rơi, bỏ đi, quay lại xoá → print() → print("hi") →
// chữ "hi" đập vào mặt, laptop văng → quỳ, copy → đứng dán 3 dòng, hi hi hi → a = 1 … a = 3*2.
import { P } from '../../engine/stick.js';
import { stick } from '../../engine/stick.js';
import { gait, keys, ease, fast, snap, NOOP, reach as reachLen } from '../../engine/stickmove.js';
import { SOFT_ARM, SOFT_TORSO } from '../../engine/hero.js';
import { DRAG } from '../../engine/stick-dict.js';
import { curlOf } from '../../engine/stick.js';
import { L } from '../../engine/stick.js';

export const H = 300, GY = 820, DUR = 60;
const D2R = Math.PI / 180, STAND = 0.394 * H;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const lerp2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const win = (t, a, b) => ease(clamp((t - a) / (b - a)));
const deg = o => { const r = { ...P.stand }; for (const k in o) r[k] = (k === 'bob' ? o[k] : o[k] * D2R); return r; };
const REACH = (L.upper + L.fore) * H * SOFT_ARM * 0.995;
const ground = () => GY;

// ── tư thế riêng của cảnh (độ) ── x = hông x, hy = hông cao trên đất, rot = xoay cả người (độ, âm = ngả đầu sang trái)
const POSE = {
  lie:     { ...deg({ lean: 0, head: -8, shL: 8, elL: 6, shR: 16, elR: 14, hipL: 38, knL: 70, hipR: 18, knR: 30 }), hy: 0.12 * H, rot: -90, fe: 0, fl: 0, fr: 0 },
  lieTwitch: { ...deg({ lean: 0, head: -16, shL: 10, elL: 8, shR: 34, elR: 36, hipL: 44, knL: 80, hipR: 26, knR: 44 }), hy: 0.12 * H, rot: -90, fe: 0, fl: 0, fr: 0 },
  sitUp:   { ...deg({ lean: 26, head: 14, shL: 30, elL: 30, shR: 40, elR: 40, hipL: 78, knL: 128, hipR: 70, knR: 112 }), hy: 0.05 * H, rot: 0, fe: 1, fl: 0.24 * H, fr: 0.32 * H },
  sitRub:  { ...deg({ lean: 18, head: 22, shL: 30, elL: 30, shR: 150, elR: 95, hipL: 78, knL: 128, hipR: 70, knR: 112 }), hy: 0.05 * H, rot: 0, fe: 1, fl: 0.24 * H, fr: 0.32 * H },
  squat:   { ...deg({ lean: 34, head: 0, shL: 30, elL: 40, shR: 45, elR: 40, hipL: 95, knL: 150, hipR: 100, knR: 155 }), hy: 0.1 * H, rot: 0, fe: 1, fl: -0.05 * H, fr: 0.09 * H },
  stand:   { ...deg({ shL: -6, elL: 12, shR: 6, elR: 14, hipL: -4, hipR: 4 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  standUp: { ...deg({ lean: -4, head: -10, shL: -10, elL: 8, shR: 10, elR: 10, hipL: -3, hipR: 3 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  chin:    { ...deg({ lean: 4, head: 14, shL: -4, elL: 15, shR: 24, elR: 150, hipL: -4, hipR: 5 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  scratch: { ...deg({ head: 12, shL: -6, elL: 10, shR: -118, elR: -82, hipL: -5, hipR: 5 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  lookL:   { ...deg({ lean: -3, head: -6, shL: -8, elL: 12, shR: -40, elR: 30, hipL: -4, hipR: 4 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  pick:    { ...deg({ lean: 62, head: -24, shL: 70, elL: 10, shR: 80, elR: 10, hipL: 40, knL: 60, hipR: 55, knR: 75 }), hy: 0.3 * H, rot: 0, fe: 1, fl: -0.06 * H, fr: 0.14 * H },
  hold:    { ...deg({ lean: 4, head: 20, shL: 20, elL: 70, shR: 30, elR: 70, hipL: -4, hipR: 5 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  holdUp:  { ...deg({ lean: -2, head: 10, shL: 20, elL: 70, shR: 30, elR: 70, hipL: -4, hipR: 5 }), hy: STAND, rot: 0, fe: 1, fl: -0.035 * H, fr: 0.035 * H },
  jolt:    { ...deg({ lean: -18, head: -18, shL: 60, elL: 50, shR: 80, elR: 40, hipL: -10, hipR: 10, knR: 10 }), hy: STAND - 0.01 * H, rot: 0, fe: 1, fl: -0.07 * H, fr: 0.05 * H },
  kneel:   { ...deg({ lean: 34, head: 26, shL: 50, elL: 30, shR: 60, elR: 30, hipL: 0, knL: 90, hipR: -6, knR: 100 }), hy: 0.2 * H, rot: 0, fe: 1, fb: 1, fl: 0, fr: 0.17 * H },
  kneelIn: { ...deg({ lean: 52, head: 30, shL: 60, elL: 20, shR: 70, elR: 20, hipL: 4, knL: 92, hipR: 4, knR: 108 }), hy: 0.19 * H, rot: 0, fe: 1, fb: 1, fl: 0, fr: 0.17 * H },
  recoil:  { ...deg({ lean: -34, head: -34, shL: 30, elL: 90, shR: 150, elR: 120, hipL: -18, knL: 10, hipR: 20, knR: 30 }), hy: STAND - 0.02 * H, rot: 0, fe: 1, fl: -0.09 * H, fr: 0.06 * H },
  daze:    { ...deg({ lean: 10, head: 22, shL: -4, elL: 15, shR: 40, elR: 140, hipL: -6, knL: 8, hipR: 8, knR: 12 }), hy: STAND - 0.01 * H, rot: 0, fe: 1, fl: -0.04 * H, fr: 0.04 * H },
};
const K = (name, over = {}) => ({ ...POSE[name], ...over });

// ── các đoạn đi (gait) ──
const W = {
  toLap:  { ground, h: H, dir: 1, x0: 800, x1: 880, t0: 9.5, t1: 10.1, step: 0.26 },
  back:   { ground, h: H, dir: 1, x0: 880, x1: 830, t0: 15.4, t1: 15.95, step: 0.2 },
  away:   { ground, h: H, dir: -1, x0: 830, x1: 620, t0: 16.15, t1: 17.35, step: 0.3 },
  ret:    { ground, h: H, dir: 1, x0: 620, x1: 900, t0: 17.95, t1: 19.0, step: 0.32, run: 0.25 },
  stag:   { ground, h: H, dir: 1, x0: 900, x1: 830, t0: 31.75, t1: 32.4, step: 0.2 },
  toLap2: { ground, h: H, dir: -1, x0: 830, x1: 720, t0: 33.2, t1: 34.0, step: 0.26 },
};
const inWalk = t => { for (const k in W) if (t > W[k].t0 && t < W[k].t1) return W[k]; return null; };

// ── hướng nhìn của thân theo giờ ──
const dirAt = t => (t >= 16.05 && t < 17.85) || t >= 33.1 ? -1 : 1;

// ── khoá tư thế (không đi) — mỗi khoá: [t, pose (có x), ease?] ──
const KEYS = [
  [0, K('lie', { x: 760 })], [2.2, K('lie', { x: 760 })], [2.35, K('lieTwitch', { x: 760 })], [2.55, K('lie', { x: 760 })],
  [2.75, K('sitUp', { x: 790, lean: 34 * D2R }), fast], [2.95, K('sitUp', { x: 790 })],
  [3.3, K('sitRub', { x: 790 })], [3.6, K('sitRub', { x: 790, head: 30 * D2R })], [3.9, K('sitRub', { x: 790 })],
  [4.15, K('sitUp', { x: 795 })], [4.35, K('squat', { x: 800 }), fast], [4.65, K('standUp', { x: 800 }), fast], [4.85, K('stand', { x: 800 })],
  [5.6, K('chin', { x: 800 })], [6.6, K('chin', { x: 800, head: 6 * D2R })], [7.0, K('scratch', { x: 800 })], [7.7, K('scratch', { x: 800, head: 18 * D2R })],
  [8.3, K('lookL', { x: 800 })], [9.1, K('stand', { x: 800, head: 16 * D2R })],
  // nhặt laptop (sau lượt đi toLap)
  [10.1, K('stand', { x: 880, head: 18 * D2R })], [10.4, K('pick', { x: 885 })], [10.7, K('pick', { x: 885, lean: 58 * D2R })],
  [11.0, K('holdUp', { x: 880 })], [11.3, K('hold', { x: 880 })],
  [11.6, K('hold', { x: 880, head: 24 * D2R })], [11.9, K('hold', { x: 880 })], [14.0, K('hold', { x: 880, head: 16 * D2R })],
  // NameError: giật mình → bỏ đi
  [15.25, K('hold', { x: 880 })], [15.33, K('jolt', { x: 880 }), snap], [15.4, K('jolt', { x: 880 })],
  [15.95, K('stand', { x: 830, head: -6 * D2R })], [16.15, K('stand', { x: 830 })],
  [17.35, K('stand', { x: 620 })], [17.6, K('stand', { x: 620, head: 12 * D2R })], [17.95, K('stand', { x: 620 })],
  // quay lại, quỳ trước laptop, xoá, gõ print()
  [19.0, K('stand', { x: 900, head: 14 * D2R })], [19.35, K('kneel', { x: 900 })], [20.6, K('kneel', { x: 900, head: 22 * D2R })],
  [22.2, K('kneelIn', { x: 900 })], [23.6, K('kneel', { x: 900 })],
  [24.45, K('kneel', { x: 900 })], [24.7, K('squat', { x: 900 })], [25.05, K('holdUp', { x: 900 }), fast], [25.4, K('hold', { x: 900 })],
  // nghĩ: tay chống cằm khi vẫn ôm laptop (laptop dồn một tay)
  [26.4, K('hold', { x: 900 })], [26.8, K('hold', { x: 900, head: 4 * D2R })], [28.6, K('hold', { x: 900, head: 6 * D2R })], [29.2, K('hold', { x: 900 })],
  [31.48, K('hold', { x: 900, head: 22 * D2R })],
  // "hi" đập vào mặt
  [31.52, K('recoil', { x: 900 }), snap], [31.75, K('recoil', { x: 900, lean: -26 * D2R })],
  [32.4, K('daze', { x: 830 })], [32.6, K('daze', { x: 830, head: 8 * D2R })], [32.8, K('daze', { x: 830, head: 26 * D2R })], [33.0, K('stand', { x: 830, head: 14 * D2R })],
  [34.0, K('stand', { x: 720, head: 18 * D2R })], [34.35, K('kneel', { x: 720 })],
  [36.4, K('kneel', { x: 720 })], [36.9, K('kneelIn', { x: 720 })], [37.9, K('kneelIn', { x: 720 })], [38.4, K('kneel', { x: 720 })],
  [40.0, K('kneel', { x: 720, head: 18 * D2R })], [41.0, K('kneel', { x: 720 })],
  [42.45, K('kneel', { x: 720 })], [42.7, K('squat', { x: 720 })], [43.05, K('holdUp', { x: 720 }), fast], [43.4, K('hold', { x: 720 })],
  // dán, chạy, hi hi hi; a = 1 …
  [45.1, K('hold', { x: 720 })], [45.3, K('holdUp', { x: 720, head: -6 * D2R })], [46.6, K('holdUp', { x: 720 })], [47.2, K('hold', { x: 720 })],
  [50.0, K('hold', { x: 720 })], [50.2, K('holdUp', { x: 720, head: -4 * D2R })], [50.7, K('hold', { x: 720 })],
  [55.0, K('hold', { x: 720 })], [55.15, K('holdUp', { x: 720, lean: -8 * D2R, head: -12 * D2R }), fast], [55.8, K('hold', { x: 720 })],
  [57.4, K('hold', { x: 720 })], [57.6, K('holdUp', { x: 720, head: -6 * D2R })], [58.2, K('hold', { x: 720 })],
  [59.6, K('hold', { x: 720 })], [59.8, K('holdUp', { x: 720, head: -8 * D2R })], [60, K('holdUp', { x: 720, head: -8 * D2R })],
];

// ── laptop: trên đất / trên tay / đang bay. Trả { c: [x, y] (giữa đáy), ang, held } ──
const LAP0 = [975, GY];
function heldAt(A) { const d = A.dir; return [A.hip[0] + d * 0.21 * H, A.hip[1] - 0.17 * H]; }
export function laptop(t, A) {
  const fly = (a, b, t0, t1, h, spin) => { const k = clamp((t - t0) / (t1 - t0)); return { c: [lerp(a[0], b[0], k), lerp(a[1], b[1], k) - h * Math.sin(Math.PI * k)], ang: spin * k }; };
  if (t < 10.6) return { c: LAP0, ang: 0 };
  if (t < 11.0) { const k = win(t, 10.6, 11.0); return { c: lerp2(LAP0, heldAt(A), k), ang: 0, held: k > 0.5 }; }
  if (t < 15.3) return { c: heldAt(A), ang: 0, held: true };
  const drop = [965, GY];
  if (t < 15.75) return fly([945, GY - 0.38 * H], drop, 15.3, 15.75, 20, 0.5);
  if (t < 15.9) return { c: [drop[0], GY - 12 * Math.sin(Math.PI * (t - 15.75) / 0.15)], ang: 0 };
  if (t < 24.85) return { c: drop, ang: 0 };
  if (t < 25.3) { const k = win(t, 24.85, 25.3); return { c: lerp2(drop, heldAt(A), k), ang: 0, held: k > 0.5 }; }
  if (t < 31.5) return { c: heldAt(A), ang: 0, held: true };
  const land = [640, GY];
  if (t < 32.1) return fly([963, GY - 0.38 * H], land, 31.5, 32.1, 160, -6.2);
  if (t < 32.35) return { c: [land[0] - 30 * fast((t - 32.1) / 0.25), GY], ang: 0 };
  const rest = [610, GY];
  if (t < 42.85) return { c: rest, ang: 0 };
  if (t < 43.3) { const k = win(t, 42.85, 43.3); return { c: lerp2(rest, heldAt(A), k), ang: 0, held: k > 0.5 }; }
  return { c: heldAt(A), ang: 0, held: true };
}

// ── diễn viên ──
export function actor(t) {
  let A;
  const Wk = inWalk(t), dir = dirAt(t);
  if (Wk) {
    const G = gait(Wk, t);
    A = { hip: G.hip, feet: G.feet, pose: { ...G.pose }, rot: 0, walk: true };
  } else {
    const k = keys(KEYS, t);
    // overlap: đầu trễ DRAG.head, tay trễ DRAG.arms sau thân (engine/stick-dict.js)
    const kh = keys(KEYS, t - DRAG.head), ka = keys(KEYS, t - DRAG.arms);
    k.head = kh.head; for (const f of ['shL', 'elL', 'shR', 'elR']) k[f] = ka[f];
    { const kc = keys(KEYS, t - DRAG.chest), d = Math.max(-0.52, Math.min(0.52, kc.lean - k.lean)); k.curl = (k.curl ?? curlOf(k.lean)) + d; }   // lưng uốn theo quán tính
    A = { hip: [k.x, GY - k.hy], pose: k, rot: k.rot * D2R };
    if (k.fe > 0.5) A.feet = [(k.fb ?? 0) > 0.5 ? null : [k.x + dir * k.fl, GY], [k.x + dir * k.fr, GY]];   // fb: chân sau quỳ theo góc (gối chạm đất)   // chân trụ khoá xuống đất (IK)
  }
  A.dir = dir;
  // hơi thở: đầu trôi rất nhẹ (không nhún hông — LESSONS §158)
  A.pose.head += Math.sin(t * 1.7) * 1.2 * D2R;
  // tay: đích theo việc đang làm, trộn với FK bằng hk
  const J = stick(NOOP, A.hip[0], 0, A.pose, { h: H, dir, hip: A.hip, feet: A.feet, rot: A.rot, arm: SOFT_ARM, torso: SOFT_TORSO, spine: true });
  const Lp = laptop(t, A);
  const tgt = (p, k) => [p, k];
  let hands = null;
  if (Lp.held) {
    const c = Lp.c, typing = (t > 11.9 && t < 14.2) || (t > 29.3 && t < 30.4) || (t > 43.6 && t < 45.0) || (t > 47.6 && t < 49.6) || (t > 52.2 && t < 59.4);
    const j = typing ? [Math.sin(t * 37) * 0.012 * H, -Math.abs(Math.sin(t * 23)) * 0.018 * H] : [0, 0];
    let R = [c[0] + dir * 0.05 * H + j[0], c[1] - 0.012 * H + j[1]];
    if (t > 26.6 && t < 29.0) R = lerp2(R, [J.head[0] + dir * 0.05 * H, J.head[1] + 0.13 * H], win(t, 26.6, 26.95) * (1 - win(t, 28.6, 29.0)));   // chống cằm
    hands = [tgt([c[0] - dir * 0.07 * H, c[1] + 0.012 * H], 1), tgt(R, 1)];
  } else if (t > 10.35 && t < 10.61) {                                    // với laptop dưới đất
    const k = win(t, 10.35, 10.57); hands = [tgt([LAP0[0] - 0.06 * H, GY - 0.03 * H], k), tgt([LAP0[0] + 0.03 * H, GY - 0.03 * H], k)];
  } else if ((t > 19.2 && t < 24.9) || (t > 34.2 && t < 42.9)) {          // quỳ gõ trên đất
    const c = laptop(t, A).c, typing = (t > 19.3 && t < 20.5) || (t > 20.9 && t < 22.7) || (t > 36.6 && t < 39.8);
    const j = typing ? [Math.sin(t * 37) * 0.012 * H, -Math.abs(Math.sin(t * 23)) * 0.02 * H] : [0, 0];
    const k = t < 34.2 + 3 ? win(t, (t < 30 ? 19.2 : 34.2), (t < 30 ? 19.5 : 34.5)) : 1;
    const out = t < 30 ? 1 - win(t, 24.45, 24.85) : 1 - win(t, 42.45, 42.85);
    hands = [tgt([c[0] - dir * 0.05 * H, GY - 0.035 * H], k * out), tgt([c[0] + dir * 0.04 * H + j[0], GY - 0.035 * H + j[1]], k * out)];
  } else if (t >= 31.52 && t < 33.0) {                                    // ôm mặt sau cú đập
    const k = Math.min(win(t, 31.52, 31.7), 1 - win(t, 32.75, 33.0));
    hands = [null, tgt([J.head[0] + dir * 0.06 * H, J.head[1] + 0.05 * H], k)];
  }
  if (hands) A.hands = hands.map((h, i) => { if (!h || !h[0] || h[1] <= 0) return null; const fk = i ? J.armR.e : J.armL.e; return reachLen(J.neck, lerp2(fk, h[0], h[1]), REACH); });
  // mắt
  A.eye = { look: [dir > 0 ? 0.6 : -0.6, 0.4] };
  if (t < 2.5) A.eye = { look: [0, 0], lid: 1 };
  else if (t < 2.7) A.eye = { look: [0, 0], lid: 1 - win(t, 2.5, 2.7) };
  else if (t < 4.2) A.eye = { look: [0.2, 0.2], lid: 0.45 + 0.35 * Math.max(0, Math.sin(t * 6)) };
  else if (t > 8.2 && t < 8.8) A.eye = { look: [-1, 0] };
  else if (t > 15.25 && t < 15.9) A.eye = { look: [0.8, 0.3], wide: 1 };
  else if (t > 17.35 && t < 17.85) A.eye = { look: [1, 0.2] };
  else if (t > 31.5 && t < 32.8) A.eye = { shape: 'x' };
  else if (t > 55.0 && t < 55.8) A.eye = { look: [0.6, 0.3], wide: 1 };
  else if ((t > 50.0 && t < 50.8) || (t > 57.6 && t < 58.3) || t > 59.7) A.eye = { shape: 'happy' };
  // chớp mắt định kỳ (tất định)
  for (const b of [9.2, 13.1, 21.4, 27.3, 38.6, 47.5, 52.9]) if (t > b && t < b + 0.16) A.eye = { ...A.eye, lid: Math.sin(Math.PI * (t - b) / 0.16) };
  A.wind = (t > 31.5 && t < 32.3) ? 0.8 : 0.15;
  A.squash = 1;
  if (t > 4.35 && t < 4.65) A.squash = 1 - 0.06 * Math.sin(Math.PI * (t - 4.35) / 0.3);
  return A;
}

// ── chữ trên màn: dòng code, con trỏ, vùng chọn, lỗi, kết quả ──
const SEQ = [
  [0, []], [11.0, ['']],
  [12.0, ['h']], [12.9, ['he']], [13.3, ['hel']], [13.6, ['hell']], [14.0, ['hello']],
  [19.4, ['hell']], [19.6, ['hel']], [19.8, ['he']], [20.0, ['h']], [20.2, ['']],
  [21.0, ['p']], [21.2, ['pr']], [21.4, ['pri']], [21.6, ['prin']], [21.8, ['print']], [22.5, ['print()']],
  [29.45, ['print(")']], [29.75, ['print("h)']], [30.0, ['print("hi)']], [30.3, ['print("hi")']],
  [44.0, ['print("hi")', 'print("hi")']], [44.6, ['print("hi")', 'print("hi")', 'print("hi")']],
  [47.6, ['']], [47.8, ['a']], [47.95, ['a =']], [48.15, ['a = 1']], [48.6, ['a = 1', 'pri']], [49.1, ['a = 1', 'print(a)']],
  [52.6, ['a = 2', 'print(a)']], [54.6, ['a = 9', 'print(a)']], [55.9, ['a = 3', 'print(a)']],
  [56.9, ['a = 3+2', 'print(a)']], [58.0, ['a = 3-2', 'print(a)']], [59.0, ['a = 3*2', 'print(a)']],
];
const OUT = [[0, ''], [50.0, '1'], [53.0, '2'], [55.0, '9'], [56.2, '3'], [57.4, '5'], [58.4, '1'], [59.4, '6']];
const RUN = [[23.0, 23.55], [31.0, 31.45], [40.0, 41.0], [44.9, 45.15], [49.6, 49.95]];
export function code(t) {
  let lines = []; for (const [a, l] of SEQ) if (t >= a) lines = l;
  let out = ''; for (const [a, o] of OUT) if (t >= a) out = o;
  const sel = RUN.some(([a, b]) => t >= a && t < b);
  const err = t >= 15.25 && t < 19.4 ? 1 : 0;
  return { lines, out, sel, err, cursor: lines.length > 0 && Math.floor(t * 2) % 2 === 0 };
}
// "hi" bay vào mặt (31.3 → 31.5) rồi rơi xuống đất; hi hi hi khi chạy 3 dòng
export function flyers(t, A) {
  const r = [];
  if (t > 31.25) {
    const s = [960, GY - 0.42 * H], face = [905, GY - 0.95 * H], gnd = [1010, GY - 6];
    if (t < 31.5) { const k = (t - 31.25) / 0.25; r.push({ txt: 'hi', p: lerp2(s, face, k * k), size: 30 + 30 * k, rot: 0 }); }
    else { const k = clamp((t - 31.5) / 0.55); r.push({ txt: 'hi', p: [lerp(face[0], gnd[0], k), lerp(face[1], gnd[1], k * k) - 90 * Math.sin(Math.PI * k)], size: 60 - 26 * k, rot: k * 3.6 * (k < 1 ? 1 : 0) }); }
  }
  for (let i = 0; i < 3; i++) {
    const t0 = 45.2 + 0.22 * i; if (t < t0) continue;
    const k = clamp((t - t0) / 0.7), s = [A ? 640 : 640, GY - 0.45 * H], e = [560 - 46 * i, GY - 6];
    r.push({ txt: 'hi', p: [lerp(s[0], e[0], k), lerp(s[1], e[1], k * k) - 70 * Math.sin(Math.PI * k)], size: 26, rot: 0 });
  }
  return r;
}
// camera: tâm + zoom, rung khi bị đập
export function camera(t) {
  const c = keys([[0, { x: 860, y: 700, z: 2.0 }], [6.0, { x: 870, y: 680, z: 1.9 }], [9.0, { x: 850, y: 620, z: 1.65 }],
    [15.0, { x: 850, y: 620, z: 1.65 }], [17.0, { x: 790, y: 620, z: 1.5 }], [20.0, { x: 850, y: 640, z: 1.65 }],
    [30.5, { x: 850, y: 620, z: 1.65 }], [33.0, { x: 790, y: 620, z: 1.5 }], [44.0, { x: 720, y: 600, z: 1.6 }], [60, { x: 720, y: 600, z: 1.6 }]], t);
  if (t > 31.5 && t < 31.9) { const k = 1 - (t - 31.5) / 0.4; c.x += Math.sin(t * 90) * 10 * k; c.y += Math.cos(t * 77) * 8 * k; }
  return c;
}
export { clamp, lerp, win };
