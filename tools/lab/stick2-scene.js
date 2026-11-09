// Cảnh bàn thử người que bản 2 (docs/study/08-stick-animation.md) — dùng chung cho trang vẽ (stick2.html) và kiểm
// số (stick2-qa.mjs). actor(t) trả mọi thứ cần vẽ: hông, bàn chân / tay khoá (hoặc null = theo góc), tư thế, ép giãn.
import { P } from '../../engine/stick.js';
import { gait, keys, ease, easeOut, easeIn } from '../../engine/stickmove.js';

export const H = 230, DIR = 1;
const D2R = Math.PI / 180, TAN = Math.tan(22 * D2R);
const soft = (z, w = 70) => z > w ? z : z < -w ? 0 : (z + w) * (z + w) / (4 * w);
export const BASE = 900;
export const ground = X => BASE - TAN * (soft(X - 820) - soft(X - 1260));
export const PLATEAU = ground(2000);
export const CARD = { x0: 1420, x1: 1700, top: PLATEAU - 120 };
const onCard = X => CARD.top;
const legLen = 0.4 * H;

const W1 = { ground, h: H, dir: DIR, x0: 260, x1: 1330, t0: 0.5, t1: 6.6 };
const W2 = { ground: onCard, h: H, dir: DIR, x0: 1580, x1: 1650, t0: 8.9, t1: 9.7, step: 0.18 };
const deg = o => { const r = { ...P.stand, ...o }; for (const k of ['lean', 'head', 'shL', 'elL', 'shR', 'elR', 'hipL', 'knL', 'hipR', 'knR']) if (k in o) r[k] = o[k] * D2R; return r; };   // đủ mọi trường (thiếu → NaN khi nội suy)

export const SCENE = { dur: 12 };
// vị trí bàn chân / tay khi đi theo GÓC (FK) — cùng công thức engine/stick.js — để nối mượt FK ↔ khoá (IK), không giật
const fk = (hip, a1, a2, l1, l2, sq = 1) => { const sx = 1 / Math.sqrt(sq);
  const m = [hip[0] + Math.sin(a1) * l1 * H * DIR * sx, hip[1] + Math.cos(a1) * l1 * H * sq];
  return [m[0] + Math.sin(a2) * l2 * H * DIR * sx, m[1] + Math.cos(a2) * l2 * H * sq]; };
const footFK = (A, i) => fk(A.hip, i ? A.pose.hipR : A.pose.hipL, i ? A.pose.hipR - A.pose.knR : A.pose.hipL - A.pose.knL, 0.2, 0.2, A.squash ?? 1);
const handFK = (hip, p, i) => { const neck = [hip[0] + Math.sin(p.lean) * 0.27 * H * DIR, hip[1] - Math.cos(p.lean) * 0.27 * H];
  const sh = i ? p.shR : p.shL, el = i ? p.elR : p.elL; return fk(neck, sh, sh + el, 0.155, 0.15); };
const lerp2 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
const win = (t, a, b) => ease((t - a) / (b - a));

export function actor(t) {
  const A = actor0(t);
  // nối: bật nhảy (khoá → FK), tiếp đất (FK → khoá), ngồi (khoá → FK)
  const blend = (lock, w) => [0, 1].map(i => w <= 0 ? lock[i] : w >= 1 ? null : lerp2(lock[i], footFK(A, i), w));
  if (A.phase === 'air') {
    const up = win(t, 7.45, 7.6), down = 1 - win(t, 7.92, 8.05);
    const end = gait(W1, 99), lf = [[1572, CARD.top], [1588, CARD.top]];
    if (up < 1) A.feet = blend(end.feet, up);
    else if (down < 1) A.feet = blend(lf, down);
  }
  if (A.phase === 'sit' && t < 10.45) {                    // chân rời mặt thẻ: tiến ra trước TRƯỚC, rồi mới buông xuống (đi theo cung)
    const wx = win(t, 10.1, 10.32), wy = win(t, 10.24, 10.45);
    A.feet = [0, 1].map(i => { const L0 = A.lockFeet[i], F = footFK(A, i), lift = 0.05 * H * Math.sin(Math.PI * wx) * (1 - wy);
      return [L0[0] + (F[0] - L0[0]) * wx, Math.min(L0[1] + (F[1] - L0[1]) * wy, F[0] > CARD.x1 ? 1e9 : CARD.top) - lift]; });
  }
  return A;
}

function actor0(t) {
  // 1) đi bộ: phẳng → dốc 22° → bằng
  if (t < 6.7) { const G = gait(W1, t); return { hip: G.hip, feet: G.feet, pose: G.pose, phase: 'walk', planted: G.planted, slope: G.slope }; }
  const end = gait(W1, 99), fL = end.feet[0], fR = end.feet[1], standY = end.hip[1];
  // 2) nhìn lên thẻ → lấy đà (hông hạ, tay vung ra sau) → bật
  if (t < 7.45) {
    const k = keys([
      [6.7, { ...P.stand, hy: standY }],
      [7.0, { ...P.stand, head: -22 * D2R, hy: standY }],
      [7.32, { ...deg({ lean: 28, head: -18, shL: -55, elL: 6, shR: -45, elR: 5 }), hy: standY + 0.36 * legLen }],
      [7.45, { ...deg({ lean: 14, head: -14, shL: 40, elL: 20, shR: 55, elR: 15 }), hy: standY - 0.02 * legLen }, easeIn],
    ], t);
    return { hip: [end.hip[0] + (k.lean ? Math.sin(k.lean) * 6 : 0), k.hy], feet: [fL, fR], pose: k, phase: 'jump-prep' };
  }
  // 3) bay theo CUNG (x đều, y parabol), co chân, tay đưa lên
  const land = [1580, CARD.top], landHipY = CARD.top - legLen * 0.985;
  if (t < 8.05) {
    const k = (t - 7.45) / 0.6, x = end.hip[0] + (land[0] - end.hip[0]) * k;
    const y0 = standY - 0.02 * legLen, y1 = landHipY + 0.25 * legLen, apex = Math.min(y0, y1) - 60;
    const y = (1 - k) * (1 - k) * y0 + 2 * (1 - k) * k * (2 * apex - (y0 + y1) / 2) + k * k * y1;
    const p = keys([
      [7.45, deg({ lean: 14, head: -14, shL: 40, elL: 20, shR: 55, elR: 15, hipL: -15, knL: 10, hipR: -5, knR: 5 })],
      [7.7, deg({ lean: 8, head: -6, shL: 118, elL: 35, shR: 108, elR: 40, hipL: 70, knL: 110, hipR: 45, knR: 95 })],
      [8.05, deg({ lean: 6, head: 6, shL: 110, elL: 15, shR: 100, elR: 20, hipL: 20, knL: 25, hipR: 35, knR: 40 })],
    ], t);
    return { hip: [x, y], feet: [null, null], pose: p, phase: 'air', squash: 1 + 0.06 * Math.sin(Math.PI * k) };
  }
  // 4) tiếp đất: chân khoá, hông dồn xuống (squash) → vượt lên → đứng
  const lf = [[land[0] - 8, CARD.top], [land[0] + 8, CARD.top]];   // khớp lf trong actor()
  if (t < 8.9) {
    const k = keys([
      [8.05, { ...deg({ lean: 6, head: 6, shL: 110, elL: 15, shR: 100, elR: 20 }), hy: landHipY + 0.25 * legLen, sq: 1.0 }],
      [8.17, { ...deg({ lean: 24, head: 14, shL: 70, elL: 30, shR: 60, elR: 30 }), hy: landHipY + 0.42 * legLen, sq: 0.93 }, easeOut],
      [8.5, { ...deg({ lean: -3, head: -4, shL: -12, elL: 12, shR: 14, elR: 12 }), hy: landHipY - 0.01 * legLen, sq: 1.02 }],
      [8.8, { ...P.stand, hy: landHipY, sq: 1 }],
    ], t);
    return { hip: [land[0], k.hy], feet: lf, pose: k, phase: 'land', squash: k.sq };
  }
  // 5) vài bước nhỏ tới mép phải của thẻ
  if (t < 9.8) { const G = gait(W2, t); return { hip: G.hip, feet: G.feet, pose: G.pose, phase: 'walk2', planted: G.planted }; }
  // 6) ngồi xuống mép thẻ, chân buông ra ngoài mép, tay chống mặt thẻ; rồi đung đưa chân (hành động phụ)
  const e2 = gait(W2, 99), sitX = CARD.x1 - 0.06 * H, sitY = CARD.top - 0.02 * H;
  const k = keys([
    [9.8, { ...P.stand, hx: e2.hip[0], hy: e2.hip[1] }],
    [10.1, { ...deg({ lean: 30, head: 6, shL: 25, elL: 15, shR: 35, elR: 15 }), hx: e2.hip[0] + 10, hy: e2.hip[1] + 0.34 * legLen }],
    [10.45, { ...deg({ lean: 2, head: -4, shL: -24, elL: 15, shR: -20, elR: 12, hipL: 84, knL: 72, hipR: 90, knR: 80 }), hx: sitX, hy: sitY + 3 }],
    [10.65, { ...deg({ lean: 6, head: -2, shL: -26, elL: 14, shR: -22, elR: 12, hipL: 85, knL: 80, hipR: 90, knR: 85 }), hx: sitX, hy: sitY }],
  ], t);
  if (t > 10.65) {                                         // đung đưa chân lệch pha, đầu quay nhẹ — đều theo t
    const s = Math.sin((t - 10.65) * 4.2), c = Math.sin((t - 10.65) * 4.2 + 1.3), fade = Math.min(1, (t - 10.65) / 0.4);
    k.knL += 18 * D2R * s * fade; k.knR += 18 * D2R * c * fade; k.head += 5 * D2R * Math.sin((t - 10.65) * 1.3) * fade;
  }
  // gối không được gập ngược khi chân rời: FK theo góc; tay chống mặt thẻ (IK khoá) sau khi ngồi
  const wh = win(t, 10.25, 10.6), plant = [[k.hx - 0.105 * H, CARD.top], [k.hx - 0.065 * H, CARD.top]];
  const hands = wh <= 0 ? [null, null] : [0, 1].map(i => wh >= 1 ? plant[i] : lerp2(handFK([k.hx, k.hy], k, i), plant[i], wh));
  return { hip: [k.hx, k.hy], feet: [null, null], lockFeet: e2.feet, hands, pose: k, phase: 'sit' };
}
