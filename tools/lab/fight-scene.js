// Clip thử "đánh nhau" — người que khăn đỏ vs con số 49% (study 10 đề xuất A, C, D, E, F; người dùng 2026-10-23).
// Nhịp Becker: GIỮ → BẬT nhanh (3–6 khung-24, ease-out gắt) → GIỮ; cảm xúc BẬT dáng không khung đệm; khựng khi chạm.
// Dùng chung: trang vẽ (fight-page.js) + gác số (node tools/lab/stick2-qa.mjs tools/lab/fight-scene.js).
//   0.00–1.25  thủ thế, thở, chớp mắt                1.25  49% nhảy xổ tới → 1.30 BẬT giật mình
//   1.75–2.00  lấy đà (giữ)  2.00–2.13 đấm (5 khung)  2.13–2.25 khựng (hit-stop) + loé + rung → số bị đẩy lùi
//   2.80–3.15  số nhảy cao đè bẹp người que           3.15–3.27 khựng; dẹt, mắt ×, bụi → số nảy về
//   3.60–4.30  bật dậy, lắc đầu   4.30 BẬT giận: đỏ người, lông mày, run, bốc hơi
//   5.00–5.60  chạy lấy đà   5.70–5.95 bay đá   5.95–6.07 khựng + loé lớn → số văng khỏi khung, tách 4 · 9 · %
//   6.07–6.40  rơi, tiếp đất có bụi   6.60 BẬT chiến thắng, giữ có sống tới 8.5
import { P, stick } from '../../engine/stick.js';
import { gait, keys, ease, easeOut, easeIn, NOOP as noop, snap, fast } from '../../engine/stickmove.js';
import { headOf, ARM } from '../../engine/hero.js';

export const H = 230, DIR = 1, GY = 860, SCENE = { dur: 8.5 };
export const ground = () => GY;
export const CARD = { x0: -1, x1: -1, top: GY };
const D2R = Math.PI / 180, legLen = 0.4 * H, X0 = 560, GAP = 0.035 * H;
const deg = o => { const r = { ...P.stand }; for (const k in o) r[k] = k === 'bob' ? o[k] : o[k] * D2R; return r; };
const lerp = (a, b, k) => a + (b - a) * k, lerp2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), win = (t, a, b) => ease((t - a) / (b - a));
// nhịp Becker: snap / fast ở engine/stickmove.js; rơi = easeIn (trọng lực)

const STANCE = deg({ lean: 8, shL: 60, elL: 110, shR: 70, elR: 120, hipL: -14, knL: 12, hipR: 14, knR: 12 });   // thủ thế, nắm tay trước cằm
const SURPR = { ...P.surprised };
const WIND = deg({ lean: -12, shL: 60, elL: 100, shR: -50, elR: 100, hipL: -16, knL: 14, hipR: 16, knR: 18 });
const PUNCH = deg({ lean: 22, head: -4, shL: -40, elL: 80, shR: 95, elR: 0, hipL: -28, knL: 6, hipR: 30, knR: 28 });
export const FRONT = deg({ shL: -12, elL: -12, shR: 12, elR: 12, hipL: -7, hipR: 7 });
const LOOKUP = deg({ head: -22, shL: -30, elL: -40, shR: 30, elR: 40, hipL: -7, hipR: 7 });
const ANGRY = deg({ head: 8, shL: -26, elL: -70, shR: 26, elR: 70, hipL: -14, knL: 10, hipR: 14, knR: 10, bob: 0.03 });   // gồng: chính diện, nắm tay gập
const CROUCH = deg({ lean: 32, head: -10, shL: -40, elL: 20, shR: -30, elR: 20 });
const KICK = deg({ lean: -28, head: -6, shL: 70, elL: 60, shR: 100, elR: 40, hipL: 25, knL: 70, hipR: 92, knR: 0 });
const CHEER = deg({ head: -10, shL: -118, elL: -40, shR: 118, elR: 40, hipL: -12, hipR: 12 });   // chính diện, tay dang NGOÀI vòng đầu to (P.cheer bị đầu che một tay)

// ── vị trí va chạm tính từ khớp thật (không đoán) ──
const at = (pose, hip, extra = {}) => stick(noop, hip[0], 0, pose, { h: H, dir: DIR, arm: ARM, hip, ...extra });
const FEET0 = [[X0 - GAP, GY], [X0 + GAP, GY]];
const PUNCH_FEET = [[X0 - GAP, GY], [X0 + 72, GY]];
const PUNCH_HIP = [X0 + 40, GY - legLen * 0.985 + 14];
export const FIST = at(PUNCH, PUNCH_HIP, { feet: PUNCH_FEET }).handR;          // nắm đấm lúc chạm
export const NX1 = FIST[0] + 4, NX2 = NX1 + 450, NX0 = 1150, NW = 600, NCAP = 0.72 * 300;   // mép trái số; rộng; cao chữ
const KICK_Y = GY - 150, KFOOT = (() => { const J = at(KICK, [0, 0]); return J.footR; })();
export const KICK_HIP = [NX2 - KFOOT[0] - 2, KICK_Y - KFOOT[1]];               // hông lúc chân chạm số
const XR = KICK_HIP[0] - 210, XL = KICK_HIP[0] - 60;                            // điểm bật nhảy, điểm tiếp đất
const RUN = { ground, h: H, dir: DIR, x0: X0, x1: XR, t0: 5.0, t1: 5.62, run: 1, lead: 'L' };

// bàn chân theo góc (FK) đâm xuống sàn → khoá lên mặt sàn (IK gập gối) — cất cánh / tiếp đất không lún
function floorFeet(A) {
  const J = at(A.pose, A.hip, { squash: A.squash ?? 1 });
  A.feet = [J.footL, J.footR].map(f => (f[1] > GY ? [f[0], GY] : null));
  return A;
}
function standAt(t, list, feet, hipX = X0) {
  const k = keys(list, t), sq = k.sq ?? 1;
  return { hip: [hipX + (k.dx ?? 0), GY - legLen * 0.985 * sq + (k.dy ?? 0)], feet, pose: k, squash: sq, planted: [true, true] };
}

function actor0(t) {
  if (t < 1.75) {                                                              // thủ thế (giữ có sống: thở) → BẬT giật mình
    const A = standAt(t, [[0, { ...STANCE, sq: 1 }], [1.3, { ...STANCE, sq: 1 }], [1.3, { ...SURPR, sq: 1, dy: 0 }, snap], [1.75, { ...SURPR, sq: 1, dy: 0 }]], FEET0);
    A.hip[1] += 2.5 * Math.sin(t * 2 * Math.PI / 1.6) * (t < 1.3 ? 1 : 0.4); A.phase = 'idle'; A.fast = t > 1.28 && t < 1.36; return A;
  }
  if (t < 2.6) {                                                               // lấy đà → đấm (chân trước bước) → khựng → thu về
    const k = keys([[1.75, { ...SURPR, dx: 0, dy: 0 }], [1.87, { ...WIND, dx: -14, dy: 6 }, fast], [2.0, { ...WIND, dx: -14, dy: 6 }],
      [2.13, { ...PUNCH, dx: 40, dy: 14 }, fast], [2.25, { ...PUNCH, dx: 40, dy: 14 }], [2.6, { ...STANCE, dx: 0, dy: 0 }, ease]], t);
    const step = t < 2.0 ? 0 : t < 2.13 ? fast((t - 2.0) / 0.13) : t < 2.3 ? 1 : 1 - ease((t - 2.3) / 0.28);
    const front = [lerp(X0 + GAP, X0 + 72, step), GY - (t > 2.0 && t < 2.13 ? 10 * Math.sin(Math.PI * (t - 2.0) / 0.13) : t > 2.3 && t < 2.58 ? 8 * Math.sin(Math.PI * (t - 2.3) / 0.28) : 0)];
    const moving = (t > 2.0 && t < 2.13) || (t > 2.3 && t < 2.58);
    return { hip: [X0 + k.dx, GY - legLen * 0.985 + k.dy], feet: [FEET0[0], front], pose: k, planted: [true, !moving], phase: 'punch', fast: t > 1.99 && t < 2.15 };
  }
  if (t < 3.15) {                                                              // tự mãn → ngẩng nhìn số bay lên → BẬT giật mình
    const A = standAt(t, [[2.6, { ...STANCE, sq: 1 }], [2.9, { ...LOOKUP, sq: 1 }, fast], [3.02, { ...LOOKUP, sq: 1 }], [3.02, { ...SURPR, sq: 1 }, snap], [3.15, { ...SURPR, sq: 1 }]], FEET0);
    A.phase = 'look'; return A;
  }
  if (t < 4.3) {                                                               // bị đè: dẹt → khựng → bật dậy vượt → lắc đầu
    const flat = deg({ head: 10, shL: -80, elL: -10, shR: 80, elR: 10, hipL: -16, knL: 30, hipR: 16, knR: 30 });
    const A = standAt(t, [[3.15, { ...SURPR, sq: 1 }], [3.2, { ...flat, sq: 0.42 }, fast], [3.6, { ...flat, sq: 0.42 }],
      [3.72, { ...FRONT, sq: 1.12 }, fast], [3.85, { ...FRONT, sq: 0.97 }], [3.95, { ...FRONT, sq: 1 }]], FEET0);
    if (t > 3.95) A.pose.head += 12 * D2R * Math.sin((t - 3.95) * 34) * (1 - clamp((t - 3.95) / 0.35));
    A.phase = 'flat'; A.fast = (t > 3.14 && t < 3.22) || (t > 3.59 && t < 3.74); return A;
  }
  if (t < 5.0) {                                                               // BẬT giận, gồng, run
    const A = standAt(t, [[4.3, { ...ANGRY, sq: 1, dy: 4 }], [5.0, { ...ANGRY, sq: 1, dy: 4 }]], FEET0);
    A.hip[0] += 1.6 * Math.sin(t * 97); A.hip[1] += 1.2 * Math.sin(t * 71 + 1);   // run (tất định)
    A.phase = 'angry'; return A;
  }
  if (t < 5.62) { const G = gait(RUN, t); return { hip: G.hip, feet: G.feet, pose: { ...G.pose, head: G.pose.head + 6 * D2R }, planted: G.planted, phase: 'run' }; }
  const e = gait(RUN, 99);
  if (t < 5.72) {                                                              // khuỵu lấy đà (2 khung-24) rồi bật
    const k = keys([[5.62, { ...e.pose, dy: 0 }], [5.68, { ...CROUCH, dy: 0.3 * legLen }, fast], [5.72, { ...CROUCH, dy: 0.3 * legLen }]], t);
    return { hip: [XR, e.hip[1] + k.dy], feet: e.feet, pose: k, planted: [true, true], phase: 'prep' };
  }
  const UP = GY - legLen * 0.97;
  if (t < 5.77) {                                                              // đẩy đất: chân còn khoá, hông bật lên
    const k = fast((t - 5.72) / 0.05);
    return { hip: [XR + 12 * k, lerp(e.hip[1] + 0.3 * legLen, UP, k)], feet: e.feet, pose: keys([[5.72, CROUCH], [5.77, deg({ lean: 10, shL: 140, elL: 20, shR: 130, elR: 20 })]], t), planted: [true, true], phase: 'prep', fast: true };
  }
  if (t < 6.07) {                                                              // bay theo cung → đá → khựng giữa không
    const k = clamp((t - 5.77) / 0.18), y0 = UP, y1 = KICK_HIP[1], apex = Math.min(y0, y1) - 70;
    const x = t < 5.95 ? lerp(XR + 12, KICK_HIP[0], k) : KICK_HIP[0];
    const y = t < 5.95 ? (1 - k) ** 2 * y0 + 2 * (1 - k) * k * apex + k * k * y1 : y1;
    const p = keys([[5.77, deg({ lean: 10, shL: 140, elL: 20, shR: 130, elR: 20 })], [5.84, deg({ lean: -8, shL: 120, elL: 30, shR: 110, elR: 30, hipL: 60, knL: 110, hipR: 70, knR: 120 }), fast], [5.95, KICK, fast], [6.07, KICK]], t);
    return { hip: [x, y], feet: [null, null], pose: p, phase: 'air', fast: t < 5.97 };
  }
  if (t < 6.4) {                                                               // rơi (ease-in) → chạm đất
    const k = easeIn((t - 6.07) / 0.28), lh = GY - legLen * 0.985;
    const p = keys([[6.07, KICK], [6.25, deg({ lean: 6, shL: 110, elL: 20, shR: 100, elR: 20, hipL: 30, knL: 40, hipR: 20, knR: 30 }), fast]], t);
    return { hip: [lerp(KICK_HIP[0], XL, k), lerp(KICK_HIP[1], lh + 0.25 * legLen, k)], feet: [null, null], pose: p, phase: 'air' };
  }
  const LF = LAND_FEET;                                  // tiếp đất dồn → đứng → BẬT chiến thắng
  const A = standAt(t, [[6.4, { ...CROUCH, sq: 1, dy: 0.25 * legLen }], [6.47, { ...CROUCH, sq: 0.93, dy: 0.36 * legLen }, fast],
    [6.6, { ...STANCE, sq: 1.02, dy: 0 }, fast], [6.66, { ...STANCE, sq: 1, dy: 0 }]], LF, XL);
  if (t < 6.66) { A.phase = 'land'; A.fast = t < 6.5; return A; }
  const base = GY - legLen * 0.985;
  if (t < 6.94) {                                                              // BẬT chiến thắng + nhảy mừng (chân rời đất)
    const k = (t - 6.66) / 0.28;
    return { hip: [XL, base - 46 * Math.sin(Math.PI * k)], feet: [null, null], pose: { ...CHEER }, phase: 'air', fast: t < 6.7 };
  }
  const B = { hip: [XL, base + 4 + 2.5 * Math.sin((t - 6.94) * 2 * Math.PI / 1.4)], feet: CHEER_FEET, pose: { ...CHEER }, squash: 1, planted: [true, true], phase: 'cheer' };
  return B;
}

let LAND_FEET = null;
const CHEER_FEET = (() => { const J = at(CHEER, [0, 0]); return [J.footL, J.footR].map(f => [XL + f[0], GY]); })();
LAND_FEET = (() => { const A = floorFeet(actor0(6.3999)); return A.feet.map((f, i) => f ?? [XL + (i ? GAP : -GAP), GY]); })();

export function actor(t) {
  const A = actor0(t);
  A.arm = ARM;
  if (A.phase === 'air') floorFeet(A);
  // mắt / màu / khăn — tất cả theo t
  A.eye = { look: [1, 0.1], lid: t > 0.7 && t < 0.82 ? Math.sin((t - 0.7) / 0.12 * Math.PI) : 0 };
  if (t >= 1.3 && t < 1.75) A.eye = { look: [1, 0], wide: 1 };
  else if (t >= 1.75 && t < 2.3) A.eye = { look: [1, 0], shape: 'angry', lid: 0.25 };
  else if (t >= 2.3 && t < 2.8) A.eye = { shape: 'happy' };
  else if (t >= 2.8 && t < 3.15) A.eye = { look: [0.4, -1], wide: t > 3.02 ? 1 : 0 };
  else if (t >= 3.15 && t < 3.95) A.eye = { shape: 'x' };
  else if (t >= 3.95 && t < 4.3) A.eye = { look: [0, 0.2], lid: 0.55 };
  else if (t >= 4.3 && t < 6.66) A.eye = { look: [1, 0], shape: 'angry', lid: 0.2 };
  else if (t >= 6.66) A.eye = { shape: 'happy' };
  A.anger = t < 4.3 ? 0 : t < 6.66 ? clamp((t - 4.3) / 0.12) : 1 - clamp((t - 6.66) / 0.5);
  A.wind = A.phase === 'run' || A.phase === 'air' ? 1 : A.phase === 'angry' ? 0.6 : 0.15;
  A.front = ['flat', 'angry', 'cheer'].includes(A.phase) || t >= 6.66 || (t >= 2.9 && t < 3.02);
  return A;
}

/** Con số 49% — nhân vật: mép trái x, đáy y, xoay, co giãn, độ tách các ký tự. */
export function num(t, A) {
  const s = { x: NX0, y: GY, rot: 0, sx: 1, sy: 1, split: 0, a: 1 };
  const land = (t0, d = 0.16) => { const k = (t - t0) / d; if (k > 0 && k < 1) { const q = Math.sin(Math.PI * k); s.sx = 1 + 0.12 * q; s.sy = 1 - 0.14 * q; } };
  if (t < 1.25) { s.sy = 1 + 0.015 * Math.sin(t * 2 * Math.PI / 1.1); return s; }
  if (t < 1.58) { const k = clamp((t - 1.25) / 0.33); s.x = lerp(NX0, NX1, fast(k)); s.y = GY - 120 * Math.sin(Math.PI * k); s.rot = -0.08 * Math.sin(Math.PI * k); if (k < 0.15) { s.sy = 0.86; s.sx = 1.08; } return s; }
  s.x = NX1; land(1.58);
  if (t < 2.25) return s;                                                       // chờ (khựng cùng lúc chạm 2.13–2.25)
  if (t < 2.8) { const k = clamp((t - 2.25) / 0.4); s.x = lerp(NX1, NX2, fast(k)); s.rot = 0.16 * Math.sin(Math.PI * clamp((t - 2.25) / 0.5)); s.sx = 1 - 0.15 * (1 - k) * (k < 1 ? 1 : 0); return s; }
  if (t < 3.15) {                                                               // nhảy cao, rơi đè (ease-in)
    const k = clamp((t - 2.8) / 0.35), cx = A.hip[0] - NW / 2, top = GY - 560;
    s.x = lerp(NX2, cx, k); s.y = k < 0.5 ? lerp(GY, top, fast(k * 2)) : lerp(top, GY - 0.6 * H, easeIn((k - 0.5) * 2)); s.rot = -0.3 * Math.sin(Math.PI * k); return s;
  }
  if (t < 3.3) { s.x = A.hip[0] - NW / 2; const hd = headOf(stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, arm: ARM, hip: A.hip, feet: A.feet, squash: A.squash }), H); s.y = hd.C[1] - hd.r; s.sx = 1.06; s.sy = 0.9; return s; }
  if (t < 3.65) { const k = clamp((t - 3.3) / 0.35), x0 = A.hip[0] - NW / 2, y0 = GY - 0.3 * H; s.x = lerp(x0, NX2, k); s.y = (1 - k) ** 2 * y0 + 2 * (1 - k) * k * (GY - 380) + k * k * GY; s.rot = 0.2 * Math.sin(Math.PI * k); return s; }
  s.x = NX2; land(3.65);
  if (t > 4.6 && t < 4.9) { const k = (t - 4.6) / 0.3; s.y = GY - 50 * Math.sin(Math.PI * k); }   // nhún chọc tức
  if (t < 5.95) { s.sy *= 1 + 0.015 * Math.sin(t * 2 * Math.PI / 1.1); return s; }
  if (t < 6.07) { s.sx = 0.9; s.sy = 1.04; return s; }                         // khựng lúc trúng đá
  const k = clamp((t - 6.07) / 0.6);                                            // văng khỏi khung, xoay, tách
  s.x = lerp(NX2, 2800, fast(k)); s.y = GY - 420 * Math.sin(Math.PI * Math.min(1, k * 1.2)); s.rot = 7 * k; s.split = fast(k);
  if (k >= 1) s.a = 0;
  return s;
}

/** Các sự kiện va chạm (hit-stop đi kèm): giờ, điểm, cỡ — trang vẽ loé, rung camera, bụi. */
export const HITS = [
  { t: 2.13, p: () => [FIST[0] + 46, FIST[1]], size: 0.7, shake: 14 },
  { t: 3.15, p: () => [X0, GY - 0.6 * H], size: 1.1, shake: 18 },
  { t: 5.95, p: () => [NX2 + 60, KICK_Y], size: 1.15, shake: 26 },
];
export const DUST = [{ t: 1.58, x: NX1 + NW / 2, w: 300 }, { t: 3.2, x: X0, w: 160 }, { t: 3.65, x: NX2 + NW / 2, w: 300 }, { t: 6.4, x: XL, w: 140 }];
