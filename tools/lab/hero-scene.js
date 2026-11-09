// Cảnh clip thử nhân vật xuyên suốt (người que khăn đỏ, 2026-10-23) — dùng chung cho trang vẽ (hero-clip.html) và
// gác số (node tools/lab/stick2-qa.mjs tools/lab/hero-scene.js). actor(t) trả hông, chân / tay khoá, tư thế, ép giãn,
// mắt, gió khăn và vị trí thẻ "1/6". Đạo diễn tư thế (study 08): mọi đoạn đứng là khoá đặt tay + ease; đi theo bản đồ bước.
//   0.2–2.4   đi vào từ trái, khăn bay
//   2.4–3.0   quay ra nhìn người xem, chớp mắt
//   3.0–3.5   nghe tiếng rơi → ngẩng lên, mắt mở to; thẻ 1/6 rơi trúng đầu ở 3.5
//   3.5–4.4   dẹt người (squash) mắt ×, sao quay; thẻ nảy ra rơi xuống ô A; bật lại có vượt
//   4.4–5.0   lắc đầu tỉnh lại, nhìn thẻ
//   5.0–5.9   bước tới ô A           5.9–7.0  khom nhặt thẻ (tay khoá vào thẻ), đứng dậy giơ thẻ lên đầu
//   7.0–8.9   vác thẻ đi tới ô B     8.9–9.9  khom đặt thẻ vào ô B, đứng dậy
//   9.9–11.5  phân thân: hai bản sao bật ra hai bên, kéo tay nhau, mắt cười, nhún một nhịp
import { P, stick } from '../../engine/stick.js';
import { gait, keys, ease, easeOut, easeIn, NOOP as noop, reach as reachLen, leadOf } from '../../engine/stickmove.js';
import { headOf, ARM } from '../../engine/hero.js';

export const H = 230, DIR = 1, GY = 860, SCENE = { dur: 11.5 };
export const ground = () => GY;
export const CARD = { x0: -1, x1: -1, top: GY };                  // gác số: không có bục
export const BOX = { A: 1010, B: 1560 }, CS = 70;                 // ô A / B trên sàn, cỡ thẻ
const D2R = Math.PI / 180, legLen = 0.4 * H, standY = GY - legLen * 0.985;
const deg = o => { const r = { ...P.stand }; for (const k in o) r[k] = k === 'bob' ? o[k] : o[k] * D2R; return r; };
const lerp = (a, b, k) => a + (b - a) * k, lerp2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), win = (t, a, b) => ease((t - a) / (b - a));

export const FRONT = deg({ shL: -12, elL: -12, shR: 12, elR: 12, hipL: -7, hipR: 7 });       // chính diện, nhìn người xem
const SIDE = { ...P.stand };
const W1 = { ground, h: H, dir: DIR, x0: 300, x1: 820, t0: 0.2, t1: 2.4 };
const W2 = { ground, h: H, dir: DIR, x0: 820, x1: 950, t0: 5.0, t1: 5.9, step: 0.26 };
const W3 = { ground, h: H, dir: DIR, x0: 950, x1: 1500, t0: 7.0, t1: 8.9 };
const CARD_FLOOR = y => [y, GY - CS * 0.4];                       // thẻ nằm trên sàn (tâm)
// ôm thẻ trước ngực (đầu to hơn tầm với của tay → không giơ qua đầu được): hai tay kẹp hai mép thẻ, theo hông
const over = hip => [[hip[0] + 0.12 * H - CS * 0.6, hip[1] - 0.16 * H], [hip[0] + 0.12 * H + CS * 0.6, hip[1] - 0.16 * H]];   // kẹp hai MÉP thẻ
const grabAt = cx => [[cx - CS * 0.3, GY - CS * 0.75], [cx + CS * 0.3, GY - CS * 0.75]];   // nắm hai góc trên của thẻ đang nằm sàn
const GRAB = CS * 0.35;                                           // tâm thẻ thấp hơn điểm nắm khi nhặt / đặt
export const CLONE = { dx: 0.56 * H };                            // khoảng cách bản sao

// bước tiếp nối: chân đang ở phía sau (x nhỏ) là chân 'lead' của lượt đi sau → không đổi chỗ hai chân (trượt 2·gap)
W2.lead = leadOf(W1); W3.lead = leadOf(W2);
// đích tay ngoài tầm với (đang nội suy giữa FK và vật) → kéo về mép tầm với: tay luôn CHẠM đích đã cho
const REACH = (0.155 + 0.15) * ARM * H * 0.995;
const reach = (neck, p) => reachLen(neck, p, REACH);

function stand(t, hipX, feet, list) {                             // đứng tại chỗ: chân khoá, hông x cố định, hy / sq theo khoá
  const k = keys(list, t), sq = k.sq ?? 1, hy = GY - legLen * 0.985 * sq + (k.dy ?? 0);
  return { hip: [hipX + (k.dx ?? 0), hy], feet, pose: k, squash: sq, planted: [true, true] };
}

export function actor(t) {
  const e1 = gait(W1, 99), e2 = gait(W2, 99), e3 = gait(W3, 99);
  let A;
  if (t < 2.4) { const G = gait(W1, t); A = { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: 'walk', wind: clamp(Math.min(t - 0.2, 2.4 - t) / 0.4) }; }
  else if (t < 5.0) {                                             // quay ra người xem, bị thẻ rơi trúng, tỉnh lại
    A = stand(t, e1.hip[0], e1.feet, [
      [2.4, { ...SIDE, sq: 1 }], [2.75, { ...FRONT, sq: 1 }],
      [3.05, { ...FRONT, sq: 1 }], [3.3, { ...deg({ head: -16, shL: -16, elL: -20, shR: 16, elR: 20, hipL: -7, hipR: 7 }), sq: 1 }],   // ngẩng lên
      [3.5, { ...deg({ head: -16, shL: -16, elL: -20, shR: 16, elR: 20, hipL: -7, hipR: 7 }), sq: 1 }],
      [3.62, { ...deg({ head: 10, shL: -40, elL: -30, shR: 40, elR: 30, hipL: -9, hipR: 9 }), sq: 0.78 }, easeOut],               // dẹt
      [3.95, { ...deg({ head: 4, shL: -30, elL: -24, shR: 30, elR: 24, hipL: -8, hipR: 8 }), sq: 0.8 }],
      [4.15, { ...deg({ head: -6, shL: -20, elL: -16, shR: 20, elR: 16, hipL: -7, hipR: 7 }), sq: 1.05 }],                       // bật lại, vượt
      [4.35, { ...FRONT, sq: 1 }],
      [5.0, { ...FRONT, sq: 1 }],
    ]);
    if (t > 4.4 && t < 4.9) A.pose.head += 9 * D2R * Math.sin((t - 4.4) * 30) * (1 - (t - 4.4) / 0.5);   // lắc đầu
    A.phase = 'bonk';
  }
  else if (t < 5.9) { const G = gait(W2, t); A = { hip: G.hip, feet: G.feet, pose: G.pose, planted: G.planted, phase: 'walk2', wind: 0.3 }; }
  else if (t < 7.0) {                                             // khom nhặt, đứng dậy giơ lên đầu
    A = stand(t, e2.hip[0], e2.feet, [
      [5.9, { ...SIDE, sq: 1, dy: 0 }],
      [6.25, { ...deg({ lean: 40, head: 14, shL: 60, elL: 10, shR: 60, elR: 10 }), sq: 1, dy: 0.45 * legLen }],
      [6.45, { ...deg({ lean: 40, head: 14, shL: 60, elL: 10, shR: 60, elR: 10 }), sq: 1, dy: 0.45 * legLen }],
      [6.85, { ...deg({ lean: 2, head: -6 }), sq: 1, dy: 0 }],
      [7.0, { ...deg({ lean: 2, head: -6 }), sq: 1, dy: 0 }],
    ]);
    A.phase = 'pick';
  }
  else if (t < 8.9) { const G = gait(W3, t); A = { hip: G.hip, feet: G.feet, pose: { ...G.pose, head: -6 * D2R }, planted: G.planted, phase: 'carry', wind: clamp(Math.min(t - 7.0, 8.9 - t) / 0.4) }; }
  else if (t < 9.9) {                                             // khom đặt thẻ vào ô B
    A = stand(t, e3.hip[0], e3.feet, [
      [8.9, { ...deg({ lean: 2, head: -6 }), sq: 1, dy: 0 }],
      [9.3, { ...deg({ lean: 40, head: 14, shL: 60, elL: 10, shR: 60, elR: 10 }), sq: 1, dy: 0.45 * legLen }],
      [9.45, { ...deg({ lean: 40, head: 14, shL: 60, elL: 10, shR: 60, elR: 10 }), sq: 1, dy: 0.45 * legLen }],
      [9.85, { ...SIDE, sq: 1, dy: 0 }],
    ]);
    A.phase = 'place';
  }
  else {                                                          // phân thân, kéo tay, nhún
    const bal = deg({ shL: -70, elL: -10, shR: 70, elR: 10, hipL: -7, hipR: 7 });
    A = stand(t, e3.hip[0], e3.feet, [
      [9.9, { ...SIDE, sq: 1 }], [10.25, { ...FRONT, sq: 1 }], [10.6, { ...bal, sq: 1 }],
      [10.85, { ...bal, sq: 1 }], [10.97, { ...bal, sq: 0.94 }], [11.15, { ...bal, sq: 1.03 }], [11.3, { ...bal, sq: 1 }],
    ]);
    A.phase = 'clone';
  }
  // ── tay: khoá vào thẻ khi nhặt / vác / đặt (nối FK ↔ khoá bằng nội suy điểm, không bật công tắc — §137) ──
  const J0 = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, arm: ARM, hip: A.hip, feet: A.feet, squash: A.squash ?? 1 });
  const fkH = [J0.handL, J0.handR];
  const blendH = (target, w) => [0, 1].map(i => w <= 0 ? null : lerp2(fkH[i], target[i], w));
  if (A.phase === 'pick') {
    const ga = grabAt(BOX.A), up = win(t, 6.45, 6.85), tgt = [0, 1].map(i => lerp2(ga[i], over(A.hip)[i], up));
    A.hands = blendH(tgt, win(t, 5.95, 6.25));
  } else if (A.phase === 'carry') A.hands = over(A.hip);
  else if (A.phase === 'place') {
    const gb = grabAt(BOX.B), dn = win(t, 8.9, 9.3), tgt = [0, 1].map(i => lerp2(over(A.hip)[i], gb[i], dn));
    A.hands = t < 9.45 ? tgt : blendH(gb, 1 - win(t, 9.45, 9.8));
  } else if (A.phase === 'clone') {                              // tay trái nắm bản sao kề bên; tay phải tự do (dang)
    const w = win(t, 10.35, 10.6), y = A.hip[1] - 0.2 * H;
    A.hands = [lerp2(fkH[0], [A.hip[0] - CLONE.dx / 2, y], w), null];
  }
  if (A.hands) A.hands = A.hands.map(p => reach(J0.neck, p));
  if (A.hands && A.hands.every(h => h === null)) delete A.hands;
  // ── mắt ──
  A.eye = { look: [0, 0.15] };
  if (t < 2.4) A.eye = { look: [1, 0] };
  else if (t < 3.05) A.eye = { look: [lerp(1, 0, win(t, 2.4, 2.7)), 0.15], lid: t > 2.82 && t < 2.94 ? Math.sin((t - 2.82) / 0.12 * Math.PI) : 0 };
  else if (t < 3.5) A.eye = { look: [0, -1], wide: win(t, 3.05, 3.25) };
  else if (t < 4.4) A.eye = { shape: 'x' };
  else if (t < 5.0) A.eye = { look: [lerp(0, 1, win(t, 4.7, 4.9)), lerp(0, 0.8, win(t, 4.7, 4.9))], lid: t > 4.45 && t < 4.6 ? 0.6 : 0 };
  else if (t < 7.0) A.eye = { look: [1, t > 5.9 && t < 6.6 ? 1 : 0.2] };
  else if (t < 8.9) A.eye = { look: [1, 0.3] };
  else if (t < 9.9) A.eye = { look: [1, 0.9] };
  else A.eye = t > 10.4 ? { shape: 'happy' } : { look: [lerp(1, 0, win(t, 9.9, 10.2)), 0.15] };
  // ── thẻ 1/6 ──
  const Jh = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, arm: ARM, hip: A.hip, feet: A.feet, hands: A.hands, squash: A.squash ?? 1 });
  const hd = headOf(Jh, H, 'C'), top = hd.C[1] - hd.r - CS * 0.4;
  const restA = CARD_FLOOR(BOX.A), restB = CARD_FLOOR(BOX.B);
  if (t < 2.9) A.card = null;
  else if (t < 3.5) { const k = easeIn((t - 2.9) / 0.6); A.card = { x: hd.C[0] + 4, y: lerp(-80, top, k), rot: -0.1 }; }
  else if (t < 3.62) A.card = { x: hd.C[0] + 4, y: top, rot: -0.1 };
  else if (t < 4.25) { const k = (t - 3.62) / 0.63, y0 = top, y1 = restA[1], apex = top - 150;   // nảy theo cung tới ô A
    A.card = { x: lerp(hd.C[0] + 4, restA[0], k), y: (1 - k) * (1 - k) * y0 + 2 * (1 - k) * k * apex + k * k * y1, rot: -0.1 + 6.4 * k }; }
  else if (t < 6.25) A.card = { x: restA[0], y: restA[1], rot: 0.02 * Math.sin(Math.min(1, (t - 4.25) / 0.2) * Math.PI) };
  else if (t < 9.45 && A.hands) { const m = lerp2(A.hands[0], A.hands[1], 0.5); A.card = { x: m[0], y: m[1] + GRAB * (1 - win(t, 6.45, 6.7) * (1 - win(t, 9.1, 9.3))), rot: 0 }; }
  else A.card = { x: restB[0], y: restB[1], rot: 0 };
  A.arm = ARM;
  return A;
}

/** Bản sao (phân thân): i = 0 kề người chính, 1 ngoài cùng — xếp thành hàng về bên TRÁI (ô B bên phải đứng riêng).
 *  Bật ra từ người chính (scale 0 → 1), hai bên kéo tay nhau. */
export function clone(t, i) {
  if (t < 9.95 + 0.12 * i) return null;
  const e3 = gait(W3, 99), x = e3.hip[0] - (i + 1) * CLONE.dx, pop = clamp((t - 9.95 - 0.12 * i) / 0.3);
  const bal = deg({ shL: -70, elL: -10, shR: 70, elR: 10, hipL: -7, hipR: 7 });
  const k = keys([[9.95, { ...FRONT, sq: 1 }], [10.6, { ...bal, sq: 1 }], [10.85, { ...bal, sq: 1 }], [10.97, { ...bal, sq: 0.94 }], [11.15, { ...bal, sq: 1.03 }], [11.3, { ...bal, sq: 1 }]], t);
  const hip = [x, GY - legLen * 0.985 * k.sq], y = hip[1] - 0.2 * H, w = win(t, 10.35, 10.6);
  const J0 = stick(noop, x, 0, k, { h: H, dir: DIR, arm: ARM, hip, squash: k.sq });
  const R = reach(J0.neck, lerp2(J0.handR, [x + CLONE.dx / 2, y], w));
  const Lh = i === 0 ? reach(J0.neck, lerp2(J0.handL, [x - CLONE.dx / 2, y], w)) : null;
  return { hip, pose: k, squash: k.sq, hands: [Lh, R], pop: 0.3 + 0.7 * easeOut(pop) + 0.12 * Math.sin(Math.PI * pop), eye: t > 10.4 ? { shape: 'happy' } : { look: [1, 0.15] } };
}
